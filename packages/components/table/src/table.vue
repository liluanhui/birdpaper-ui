<template>
  <div :class="cls">
    <bp-spin :spinning="props.loading" :spin-icon="props.spinIcon" :description="props.description">
      <div :class="`${clsBlockName}-body-area`" :style="tableAreaStyle">
        <!-- 头部（不滚动） -->
        <div :class="`${clsBlockName}-header-wrap`" ref="headerWrapRef" :style="headerWrapStyle">
          <table :class="`${clsBlockName}-header bp-table-fixed`" :style="tableStyle">
            <colGroup :columns="displayColumns" :gutter-width="gutterWidth" />
            <tableHeader
              ref="tableHeaderRef"
              :list="columns"
              :cols="displayColumns"
              :select-all="isAllSelected"
              :indeterminate="isIndeterminate"
              @select-all="onSelectAll"
            />
          </table>
        </div>

        <!-- 内容（滚动） -->
        <div :class="`${clsBlockName}-body-wrap`" ref="bodyWrapRef" @scroll="onBodyScroll" :style="bodyWrapStyle">
          <table :class="`${clsBlockName}-body bp-table-fixed`" :style="tableStyle">
            <colGroup :columns="displayColumns" :gutter-width="gutterWidth" />

            <tbody :class="`${clsBlockName}-body-tbody`" v-if="isEmpty">
              <tr>
                <td :colspan="displayColumns.length + (gutterWidth > 0 ? 1 : 0)">
                  <slot name="empty"></slot>
                  <div :class="`${clsBlockName}-body-tbody-empty`" v-if="!slots.empty?.({})">
                    <bp-empty :content="props.emptyText || undefined"></bp-empty>
                  </div>
                </td>
              </tr>
            </tbody>

            <tableBody v-else :data="props.data" :row-key="props.rowKey" :cols="displayColumns" :height="props.height">
              <tableColumn align="center" v-if="!!props.rowSelection">
                <template #cell="{ record }">
                  <bp-checkbox
                    v-if="props.rowSelection?.type === 'checkbox'"
                    v-model="selectedKeys"
                    :value="record[props.rowKey]"
                    @change="onCkbChange(record[props.rowKey], record)"
                  />
                  <bp-radio
                    v-else
                    v-model="selectedKey"
                    :value="record[props.rowKey]"
                    @change="onRadioChange(record[props.rowKey], record)"
                  />
                </template>
              </tableColumn>
              <slot name="columns" />
            </tableBody>
          </table>
        </div>
      </div>
    </bp-spin>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from "@birdpaper-ui/hooks";
import { TableProps, tableProps } from "./props";
import BpEmpty from "@birdpaper-ui/components/empty/index";
import BpCheckbox, { CheckboxValueForArray } from "@birdpaper-ui/components/checkbox/index";
import BpRadio, { RadioValue } from "@birdpaper-ui/components/radio/index";
import BpSpin from "@birdpaper-ui/components/spin/index";
import tableHeader from "./components/table-header.vue";
import tableColumn from "./components/table-column.vue";
import tableBody from "./components/table-body.jsx";
import { useTableCore } from "./core";
import { computed, nextTick, onMounted, onBeforeUnmount, useSlots, ref, watch, watchPostEffect } from "vue";
import colGroup from "./components/col-group.vue";
import { computeColumnWidths, computeScrollYAndGutter, type NormalizedColumn } from "./core";

defineOptions({ name: "Table" });
const { clsBlockName } = useNamespace("table");

const selectedKey = defineModel<RadioValue>("selectedKey", { default: "" });
const selectedKeys = defineModel<CheckboxValueForArray[]>("selectedKeys", { default: [] });
const props: TableProps = defineProps(tableProps);
const emits = defineEmits<{
  (e: "select-all", val: boolean): void;
  (e: "select", val: CheckboxValueForArray[], rowKey: RadioValue, record: any): void;
  (e: "selection-change", val: CheckboxValueForArray[]): void;
}>();
const slots: ReturnType<typeof useSlots> = useSlots();

// 从核心逻辑中获取列
const { columns, getColumnsBySlot, resetColumns, initColumnsWidth } = useTableCore();

// DOM 引用
const headerWrapRef = ref<HTMLElement | null>(null);
const bodyWrapRef = ref<HTMLElement | null>(null);
let resizeObserver: ResizeObserver | null = null;

// 计算列宽（header/body 共享）
const layoutColumns = ref<NormalizedColumn[]>([]);
const gutterWidth = ref(0);

const parseNumber = (value: unknown): number | undefined => {
  if (typeof value === "number" && isFinite(value)) return Number(value);
  if (typeof value === "string") {
    const parsed = Number(value);
    if (isFinite(parsed)) return parsed;
  }
  return undefined;
};

function isFiniteNumber(v: any): v is number {
  return typeof v === "number" && isFinite(v);
}

const buildRawColumns = () => {
  // 从 useTableCore 的 columns 中提取宽度配置：key/prop/width/minWidth/maxWidth/align
  return (columns.value || []).map((c: any, i: number) => ({
    key: c.key ?? c.prop ?? String(i),
    prop: c.prop,
    width: parseNumber(c.width),
    minWidth: parseNumber(c.minWidth),
    maxWidth: parseNumber(c.maxWidth),
    fixed: c.fixed,
    align: c.align,
  }));
};

const normalizedColumns = computed<NormalizedColumn[]>(() => {
  return (layoutColumns.value || []).map((col: any) => {
    if (col.fixed && col.width === undefined) {
      if (typeof window !== "undefined") {
        console.warn("[bp-table] fixed column requires width, fixed has been ignored:", col);
      }
      return { ...col, fixed: undefined };
    }
    return col;
  });
});

const displayColumns = computed<NormalizedColumn[]>(() => {
  const list = normalizedColumns.value.map((item) => ({ ...item, fixedOffset: 0 }));

  let leftOffset = 0;
  for (const col of list) {
    if (col.fixed === "left") {
      col.fixedOffset = leftOffset;
      leftOffset += col.realWidth || 0;
    }
  }

  let rightOffset = 0;
  for (let i = list.length - 1; i >= 0; i--) {
    const col = list[i];
    if (col?.fixed === "right") {
      col.fixedOffset = rightOffset;
      rightOffset += col.realWidth || 0;
    }
  }

  return list;
});

const fixedShadowVars = computed<Record<string, string>>(() => {
  const leftWidth = displayColumns.value
    .filter((col) => col.fixed === "left")
    .reduce((sum, col) => sum + (col.realWidth || 0), 0);
  const rightWidth = displayColumns.value
    .filter((col) => col.fixed === "right")
    .reduce((sum, col) => sum + (col.realWidth || 0), 0);

  return {
    "--bp-table-fixed-left": `${leftWidth}px`,
    "--bp-table-fixed-right": `${rightWidth}px`,
    "--bp-table-fixed-left-shadow": leftWidth > 0 ? "1" : "0",
    "--bp-table-fixed-right-shadow": rightWidth > 0 ? "1" : "0",
  };
});

const recalcLayout = () => {
  const bodyEl = bodyWrapRef.value;
  const wrapWidth = bodyEl ? bodyEl.clientWidth : 0;
  const raws = buildRawColumns();
  layoutColumns.value = computeColumnWidths(raws as any[], wrapWidth);
  const { gutter } = computeScrollYAndGutter(bodyEl);
  gutterWidth.value = gutter;
};

const isEmpty = computed<boolean>(() => props.data.length === 0);
const selectedDataCount = computed<number>(() => {
  if (props.rowSelection?.type !== "checkbox") return 0;
  if (props.data.length === 0) return 0;

  const keySet = new Set(selectedKeys.value as CheckboxValueForArray[]);
  let count = 0;
  for (const item of props.data as any[]) {
    if (keySet.has(item[props.rowKey])) count += 1;
  }
  return count;
});

const isAllSelected = computed<boolean>(() => {
  if (props.rowSelection?.type !== "checkbox") return false;
  return props.data.length > 0 && selectedDataCount.value === props.data.length;
});

const isIndeterminate = computed<boolean>(() => {
  if (props.rowSelection?.type !== "checkbox") return false;
  return selectedDataCount.value > 0 && selectedDataCount.value < props.data.length;
});

// 计算表格区域样式
const tableAreaStyle = computed(() => {
  const style: Record<string, string> = {};
  // 不在这里设置 overflow，让子元素控制
  return style;
});

const headerWrapStyle = computed(() => ({
  ...fixedShadowVars.value,
}));

// 计算表格样式 - 确保表头和内容使用相同的宽度
const tableStyle = computed(() => {
  const style: Record<string, string> = {};

  // 计算总的列宽（包括gutter）
  const totalColWidth = layoutColumns.value.reduce((sum, col) => sum + (col.realWidth || 0), 0);
  const totalWidth = totalColWidth + gutterWidth.value;

  if (props.scroll?.x) {
    // 如果设置了横向滚动宽度，使用设置的值和计算值的较大者
    const scrollX = typeof props.scroll.x === "number" ? props.scroll.x : parseInt(props.scroll.x);
    const finalWidth = Math.max(scrollX, totalWidth);
    style.width = `${finalWidth}px`;
    style.minWidth = `${finalWidth}px`;
  } else if (totalWidth > 0) {
    // 否则使用计算的列宽总和，确保表头和内容一致
    style.width = `${totalWidth}px`;
    style.minWidth = `${totalWidth}px`;
  }

  // 确保表格布局固定
  style.tableLayout = "fixed";

  return style;
});

// 计算表格主体包装器样式
const bodyWrapStyle = computed(() => {
  const style: Record<string, string> = { ...fixedShadowVars.value };
  if (props.scroll?.y) {
    const scrollY = typeof props.scroll.y === "number" ? `${props.scroll.y}px` : props.scroll.y;
    style.maxHeight = scrollY;
    style.overflowY = "auto";
  }
  return style;
});

const onSelectAll = (val: boolean) => {
  selectedKeys.value = [];
  if (val) {
    selectedKeys.value = props.data.map((item: any) => item[props.rowKey]);
  }
  emits("select-all", val);
  emits("selection-change", selectedKeys.value);
};

const onCkbChange = (rowKey: string | number, record: any) => {
  emits("select", selectedKeys.value, rowKey, record);
  emits("selection-change", selectedKeys.value);
};

const onRadioChange = (rowKey: RadioValue, record: any) => {
  const value = [selectedKey.value as CheckboxValueForArray];
  emits("select", value, rowKey, record);
  emits("selection-change", value);
};

const init = () => {
  getColumnsBySlot(props.rowSelection);
  resetColumns();
  initColumnsWidth();
  nextTick(() => {
    recalcLayout();
    ensureTableWidthSync(); // 确保表头和内容宽度同步
  });
};

onMounted(() => {
  nextTick(() => init());

  // 容器尺寸变化重算布局
  if (typeof window !== "undefined" && "ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(() => {
      nextTick(() => {
        recalcLayout();
        ensureTableWidthSync(); // 重新计算时也要同步宽度
      });
    });
    bodyWrapRef.value && resizeObserver.observe(bodyWrapRef.value);
  }

  // 数据渲染后，修正滚动条出现带来的头体错位
  watchPostEffect(() => {
    nextTick(() => {
      recalcLayout();
      ensureTableWidthSync(); // 数据变化时也要同步宽度
    });
  });
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
});

// 同步横向滚动 - 增强版
const onBodyScroll = () => {
  const headerWrap = headerWrapRef.value;
  const bodyWrap = bodyWrapRef.value;
  if (!headerWrap || !bodyWrap) return;

  // 同步横向滚动位置
  if (headerWrap.scrollLeft !== bodyWrap.scrollLeft) {
    headerWrap.scrollLeft = bodyWrap.scrollLeft;
  }
};

// 确保初始化时表头和内容宽度一致
const ensureTableWidthSync = () => {
  nextTick(() => {
    const headerWrap = headerWrapRef.value;
    const bodyWrap = bodyWrapRef.value;

    if (headerWrap && bodyWrap) {
      const headerTable = headerWrap.querySelector("table");
      const bodyTable = bodyWrap.querySelector("table");

      if (headerTable && bodyTable) {
        // 确保两个表格有相同的宽度
        const tableWidth = tableStyle.value.width || tableStyle.value.minWidth;
        if (tableWidth) {
          headerTable.style.width = tableWidth;
          bodyTable.style.width = tableWidth;
        }
      }
    }
  });
};

// 数据或列变化时重算
watch(
  () => props.data,
  () => {
    nextTick(() => {
      recalcLayout();
      ensureTableWidthSync();
    });
  },
  { deep: true }
);

watch(
  columns,
  () => {
    nextTick(() => {
      recalcLayout();
      ensureTableWidthSync();
    });
  },
  { deep: true }
);

// 监听scroll配置变化
watch(
  () => props.scroll,
  () => {
    nextTick(() => {
      recalcLayout();
      ensureTableWidthSync();
    });
  },
  { deep: true }
);

const cls = computed(() => [
  clsBlockName.value,
  `${clsBlockName.value}-${props.size}`,
  props.border && `${clsBlockName.value}-border`,
  props.stripe && `${clsBlockName.value}-stripe`,
]);
</script>

<style scoped>
.bp-table-fixed {
  table-layout: fixed;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

/* 确保表头和内容列宽一致 */
:deep(.bp-table__thead th),
:deep(.bp-table__tbody td) {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.bp-table__thead th.bp-table__gutter),
:deep(.bp-table__tbody td.bp-table__gutter) {
  padding: 0;
  border: none;
  width: var(--gutter-width, 0px);
}
</style>

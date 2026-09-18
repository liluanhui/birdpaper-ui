<template>
  <div :class="[clsBlockName, { 'border-none': onlySelector }]">
    <div :class="`${clsBlockName}-body`">
      <template v-for="(items, index) in [hourList, minuteList, secondList]">
        <VirtualScroller
          list-class="time-col-scroller-list"
          list-tag="ul"
          :ref="(el: unknown) => (columnRefs[index] = el)"
          :class="`${clsBlockName}-time-col`"
          :items
          :item-size="32"
          key-field="value"
          v-slot="{ item }"
        >
          <li
            :class="[`${clsBlockName}-col-cell`, { active: item === globalValue[index] }]"
            @click="handleClick(index, item)"
          >
            <span :class="`${clsBlockName}-col-cell-inner`">{{ item }}</span>
          </li>
        </VirtualScroller>
      </template>
    </div>

    <div v-if="!onlySelector" :class="`${clsBlockName}-footer`">
      <bp-button size="mini" status="gray" type="secondary" @click="setNow">{{ messages.timePicker.now }}</bp-button>
      <bp-button :disabled="confirmDisabled" size="mini" type="normal" status="primary" @click="handleSelect">
        {{ messages.timePicker.ok }}
      </bp-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNamespace, useLocale } from "@birdpaper-ui/hooks";
import BpButton from "@birdpaper-ui/components/button/index";
import { computed, inject, ref, watch, nextTick } from "vue";
import type { Ref } from "vue";
import dayjs from "dayjs";
import { timeInjectionKey, TimePickerContext } from "../types";
import { timeTableProps, TimeTableProps } from "../props";

import VirtualScroller from "@birdpaper-ui/components/utils/virtual-scroller.vue";

defineOptions({ name: "TimeTable" });
const { clsBlockName } = useNamespace("time-table");
const { messages } = useLocale();
const ctx = ref<TimePickerContext>();

const props: TimeTableProps = defineProps(timeTableProps);
const emits = defineEmits(["select"]);

function generateArray(len: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < len; i++) {
    result.push(i.toString().padStart(2, "0"));
  }
  return result;
}

const defaultValue = "00";
const hourList = generateArray(24);
const minuteList = generateArray(60);
const secondList = generateArray(60);

const columnRefs = ref([]) as Ref<any>;
ctx.value = inject(timeInjectionKey, undefined);

const globalValue = ref<string[]>(["", "", ""]);

const confirmDisabled = computed<boolean>(() => globalValue.value.filter((item) => item === "").length > 0);

const handleClick = (index: number, item: string) => {
  globalValue.value[index] = item;
  scrollTo(index, item);
  setDefault();
  emits("select", globalValue.value.join(":"));
};

const setDefault = () => {
  for (let i = 0; i < globalValue.value.length; i++) {
    const element = globalValue.value[i];

    if (!element) {
      globalValue.value[i] = defaultValue;
      scrollTo(i);
    }
  }
};

const setTime = (val: string) => {
  const parts = val.split(":").map((part) => String(part ?? "00").padStart(2, "0"));
  while (parts.length < 3) parts.push("00");
  globalValue.value = parts.slice(0, 3);

  const scrollAll = () => {
    for (let i = 0; i < globalValue.value.length; i++) {
      scrollTo(i, globalValue.value[i]);
    }
  };

  // Wait for VirtualScroller columns to mount/layout before scrolling.
  nextTick(() => {
    scrollAll();
    requestAnimationFrame(scrollAll);
  });
};

const setNow = () => {
  const now = dayjs().format("HH:mm:ss");
  setTime(now);

  if (!props.onlySelector) {
    ctx.value?.onSelect(now);
  }

  return now;
};

const scrollTo = (i: number, item: string = defaultValue) => columnRefs.value[i]?.scrollToItem(item);

const handleSelect = () => {
  if (!globalValue.value) return;

  const val = globalValue.value.join(":");
  ctx.value?.onSelect(val);
};

const getTime = (defaultNow: boolean = false) => {
  if (defaultNow && !globalValue.value[0]) {
    const now = dayjs().format("HH:mm:ss");
    setTime(now);
    return now;
  }

  return globalValue.value.join(":");
};

watch(
  () => ctx.value?.modelValue,
  (val) => {
    if (!val) {
      globalValue.value = ["", "", ""];
      return;
    }
    setTime(val);
  },
  { immediate: true }
);

defineExpose({
  globalValue,
  getTime,
  setTime,
  setNow,
});
</script>

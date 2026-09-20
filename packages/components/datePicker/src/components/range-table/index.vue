<template>
  <div
    :class="[
      clsBlockName,
      'select-none',
      {
        'is-show-time': showTime,
        'has-shortcuts': showShortcutsPanel,
        'is-shortcuts-right': showShortcutsPanel && shortcutsPosition === 'right',
      },
    ]"
  >
    <div
      v-if="showShortcutsPanel && shortcutsPosition === 'left'"
      :class="`${clsBlockName}-shortcuts`"
    >
      <div
        v-for="(item, index) in shortcutList"
        :key="`${item.label}-${index}`"
        :class="[`${clsBlockName}-shortcuts-item`, { 'is-active': isShortcutActive(item) }]"
        @click="onShortcutClick(item)"
      >
        {{ item.label }}
      </div>
    </div>

    <div :class="`${clsBlockName}-main`">
      <div :class="`${clsBlockName}-calendars`">
        <!-- Begin panel: calendar or time -->
        <div :class="`${clsBlockName}-area`">
          <begin-selector
            v-if="panelMode === 'date'"
            ref="beginSelectorRef"
            v-model:begin="beginDate"
            v-model:end="endDate"
            :clsBlockName
            :option-slice="beginOptionSlice"
            :langs="ctx!.langs"
            :disabled-date="ctx?.disableDate"
            @on-step="onStep"
            @on-select="onCalendarSelect"
          />
          <div v-else :class="`${clsBlockName}-time-view`">
            <div :class="`${clsBlockName}-time-view-header`">{{ messages.datePicker.selectTime }}</div>
            <TimeTable ref="beginTimeRef" only-selector @select="onBeginTimeSelect" />
          </div>
        </div>

        <!-- End panel: calendar or time -->
        <div :class="`${clsBlockName}-area`">
          <end-selector
            v-if="panelMode === 'date'"
            ref="endSelectorRef"
            v-model:begin="beginDate"
            v-model:end="endDate"
            :clsBlockName
            :option-slice="endOptionSlice"
            :langs="ctx!.langs"
            :disabled-date="ctx?.disableDate"
            @on-step="onStep"
            @on-hover="onEndHover"
            @on-select="onCalendarSelect"
          />
          <div v-else :class="`${clsBlockName}-time-view`">
            <div :class="`${clsBlockName}-time-view-header`">{{ messages.datePicker.selectTime }}</div>
            <TimeTable ref="endTimeRef" only-selector @select="onEndTimeSelect" />
          </div>
        </div>
      </div>

      <template v-if="showTime">
        <div :class="`${clsBlockName}-datetime`">
          <div
            :class="[`${clsBlockName}-datetime-cell`, { 'is-active': panelMode === 'date' }]"
            @click="switchPanelMode('date')"
          >
            <IconCalendarLine size="16" />
            <span>{{ displayBeginDate }}</span>
          </div>
          <div
            :class="[`${clsBlockName}-datetime-cell`, { 'is-active': panelMode === 'time' }]"
            @click="switchPanelMode('time')"
          >
            <IconTimeLine size="16" />
            <span>{{ beginTime }}</span>
          </div>
          <div
            :class="[`${clsBlockName}-datetime-cell`, { 'is-active': panelMode === 'date' }]"
            @click="switchPanelMode('date')"
          >
            <IconCalendarLine size="16" />
            <span>{{ displayEndDate }}</span>
          </div>
          <div
            :class="[`${clsBlockName}-datetime-cell`, { 'is-active': panelMode === 'time' }]"
            @click="switchPanelMode('time')"
          >
            <IconTimeLine size="16" />
            <span>{{ endTime }}</span>
          </div>
        </div>

        <div :class="`${clsBlockName}-footer`">
          <bp-button
            v-if="canConfirm"
            size="small"
            status="gray"
            type="secondary"
            @click="onClear"
          >
            {{ messages.datePicker.clear }}
          </bp-button>
          <bp-button size="small" status="primary" type="normal" :disabled="!canConfirm" @click="onConfirm">
            {{ messages.datePicker.ok }}
          </bp-button>
        </div>
      </template>
    </div>

    <div
      v-if="showShortcutsPanel && shortcutsPosition === 'right'"
      :class="`${clsBlockName}-shortcuts`"
    >
      <div
        v-for="(item, index) in shortcutList"
        :key="`${item.label}-${index}`"
        :class="[`${clsBlockName}-shortcuts-item`, { 'is-active': isShortcutActive(item) }]"
        @click="onShortcutClick(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace, useLocale } from "@birdpaper-ui/hooks";
import { ref, inject, computed, watch, nextTick } from "vue";
import beginSelector from "./components/begin-selector.vue";
import endSelector from "./components/end-selector.vue";
import {
  DayCell,
  RangePickerContext,
  RangeShortcut,
  RangeShortcutDate,
  rangeInjectionKey,
} from "../../types";
import { TimeTable } from "@birdpaper-ui/components/timePicker/index";
import BpButton from "@birdpaper-ui/components/button/index";
import { IconCalendarLine, IconTimeLine } from "birdpaper-icon";
import dayjs, { type Dayjs } from "dayjs";

defineOptions({ name: "RangeTable" });
const { clsBlockName } = useNamespace("range-table");
const { messages } = useLocale();

const ctx = ref<RangePickerContext>();
ctx.value = inject(rangeInjectionKey, undefined);

const showTime = computed(() => !!ctx.value?.showTime);
const defaultTimes = computed<[string, string]>(() => ctx.value?.defaultTime ?? ["00:00:00", "23:59:59"]);
const todayStr = computed(() => dayjs().format("YYYY-MM-DD"));
const shortcutsPosition = computed(() => ctx.value?.shortcutsPosition ?? "left");

const toDayjs = (value: RangeShortcutDate): Dayjs | null => {
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed : null;
};

const resolveShortcutRange = (item: RangeShortcut): [Dayjs, Dayjs] | null => {
  const raw = typeof item.value === "function" ? item.value() : item.value;
  if (!Array.isArray(raw) || raw.length < 2) return null;
  const start = toDayjs(raw[0]);
  const end = toDayjs(raw[1]);
  if (!start || !end) return null;
  return start.isAfter(end) ? [end, start] : [start, end];
};

const defaultShortcutList = computed<RangeShortcut[]>(() => [
  {
    label: messages.value.datePicker.last7Days,
    value: () => [dayjs().subtract(6, "day"), dayjs()],
  },
  {
    label: messages.value.datePicker.last30Days,
    value: () => [dayjs().subtract(29, "day"), dayjs()],
  },
  {
    label: messages.value.datePicker.lastYear,
    value: () => [dayjs().subtract(1, "year"), dayjs()],
  },
]);

const shortcutList = computed<RangeShortcut[]>(() => {
  const shortcuts = ctx.value?.rangeShortcuts;
  if (shortcuts === false) return [];
  if (Array.isArray(shortcuts)) return shortcuts;
  return defaultShortcutList.value;
});

const showShortcutsPanel = computed(() => shortcutList.value.length > 0);

const beginDate = ref("");
const endDate = ref("");
const beginTime = ref(defaultTimes.value[0]);
const endTime = ref(defaultTimes.value[1]);
/** Switch main panels between calendar grid and dual time selectors. */
const panelMode = ref<"date" | "time">("date");

const beginTimeRef = ref<InstanceType<typeof TimeTable>>();
const endTimeRef = ref<InstanceType<typeof TimeTable>>();

const displayBeginDate = computed(() => beginDate.value || todayStr.value);
const displayEndDate = computed(() => endDate.value || todayStr.value);

const hasTimeToken = (value: string) => /\d{1,2}:\d{1,2}/.test(value);

const syncFromModel = () => {
  const [begin, end] = ctx.value?.model || [];
  const today = todayStr.value;

  if (begin && dayjs(begin).isValid()) {
    beginDate.value = dayjs(begin).format("YYYY-MM-DD");
    beginTime.value = hasTimeToken(begin) ? dayjs(begin).format("HH:mm:ss") : defaultTimes.value[0];
  } else if (showTime.value) {
    beginDate.value = today;
    beginTime.value = defaultTimes.value[0];
  } else {
    beginDate.value = "";
    beginTime.value = defaultTimes.value[0];
  }

  if (end && dayjs(end).isValid()) {
    endDate.value = dayjs(end).format("YYYY-MM-DD");
    endTime.value = hasTimeToken(end) ? dayjs(end).format("HH:mm:ss") : defaultTimes.value[1];
  } else if (showTime.value) {
    endDate.value = today;
    endTime.value = defaultTimes.value[1];
  } else {
    endDate.value = "";
    endTime.value = defaultTimes.value[1];
  }
};

watch(
  () => [ctx.value?.model?.[0], ctx.value?.model?.[1], ctx.value?.defaultTime, showTime.value] as const,
  () => syncFromModel(),
  { immediate: true }
);

const beginSelectorRef = ref<InstanceType<typeof beginSelector>>();
const endSelectorRef = ref<InstanceType<typeof endSelector>>();

const calculateMonthDifference = (
  [beginYear, beginMonth]: [number, number],
  [endYear, endMonth]: [number, number]
): number | null => {
  if (beginYear < 0 || beginMonth < 1 || beginMonth > 12 || endYear < 0 || endMonth < 1 || endMonth > 12) return null;
  return (endYear - beginYear) * 12 + (endMonth - beginMonth);
};
const beginOptionSlice = ref(2);
const endOptionSlice = ref(-2);
const onStep = () => {
  const begin = beginSelectorRef.value;
  const end = endSelectorRef.value;
  if (!begin || !end) return;

  const monthDifference = calculateMonthDifference(
    [begin.year, begin.month + 1],
    [end.year, end.month + 1]
  );
  if (monthDifference === null) return;

  beginOptionSlice.value = 2;
  endOptionSlice.value = -2;

  if (monthDifference > 1) {
    beginOptionSlice.value = monthDifference <= 12 ? 3 : 4;
    endOptionSlice.value = monthDifference <= 12 ? -3 : -4;
  }
};

const onEndHover = (date?: DayCell) => {
  if (beginSelectorRef.value) {
    beginSelectorRef.value.hoverDate = date ?? null;
  }
};

const formatValue = (date: string, time: string) => {
  const format = ctx.value!.valueFormat;
  if (showTime.value) {
    return dayjs(`${date} ${time}`).format(format);
  }
  return dayjs(date).format(format);
};

const onCalendarSelect = () => {
  if (!ctx.value) return;
  if (showTime.value) {
    return;
  }
  if (!beginDate.value || !endDate.value) return;
  ctx.value.onSelect([formatValue(beginDate.value, beginTime.value), formatValue(endDate.value, endTime.value)], {}, true);
};

const canConfirm = computed(() => !!(beginDate.value && endDate.value));

const syncTimeTables = async () => {
  await nextTick();
  await nextTick();
  beginTimeRef.value?.setTime?.(beginTime.value || "00:00:00");
  endTimeRef.value?.setTime?.(endTime.value || "00:00:00");
};

const switchPanelMode = (mode: "date" | "time") => {
  panelMode.value = mode;
};

watch(panelMode, (mode) => {
  if (mode === "time") syncTimeTables();
});

const onBeginTimeSelect = (time: string) => {
  beginTime.value = time;
};

const onEndTimeSelect = (time: string) => {
  endTime.value = time;
};

const onClear = () => {
  const today = todayStr.value;
  beginDate.value = today;
  endDate.value = today;
  beginTime.value = defaultTimes.value[0];
  endTime.value = defaultTimes.value[1];
  panelMode.value = "date";
  ctx.value?.onSelect(["", ""], {}, false);
};

const onConfirm = () => {
  if (!ctx.value || !canConfirm.value) return;
  let begin = beginDate.value;
  let end = endDate.value;
  let bTime = beginTime.value;
  let eTime = endTime.value;

  const beginTs = dayjs(`${begin} ${bTime}`).valueOf();
  const endTs = dayjs(`${end} ${eTime}`).valueOf();
  if (beginTs > endTs) {
    [begin, end] = [end, begin];
    [bTime, eTime] = [eTime, bTime];
  }

  ctx.value.onSelect([formatValue(begin, bTime), formatValue(end, eTime)], {}, true);
  panelMode.value = "date";
};

const isShortcutActive = (item: RangeShortcut) => {
  if (!beginDate.value || !endDate.value) return false;
  const range = resolveShortcutRange(item);
  if (!range) return false;
  return (
    range[0].format("YYYY-MM-DD") === beginDate.value &&
    range[1].format("YYYY-MM-DD") === endDate.value
  );
};

const onShortcutClick = (item: RangeShortcut) => {
  if (!ctx.value) return;
  const range = resolveShortcutRange(item);
  if (!range) return;

  const [start, end] = range;
  beginDate.value = start.format("YYYY-MM-DD");
  endDate.value = end.format("YYYY-MM-DD");
  beginTime.value = defaultTimes.value[0];
  endTime.value = defaultTimes.value[1];
  panelMode.value = "date";

  nextTick(() => onStep());

  if (showTime.value) {
    ctx.value.onSelect(
      [formatValue(beginDate.value, beginTime.value), formatValue(endDate.value, endTime.value)],
      {},
      false
    );
    return;
  }

  ctx.value.onSelect(
    [formatValue(beginDate.value, beginTime.value), formatValue(endDate.value, endTime.value)],
    {},
    true
  );
};
</script>

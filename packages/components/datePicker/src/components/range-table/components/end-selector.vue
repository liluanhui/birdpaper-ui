<template>
  <table-header :inner-allow-click="false">
    <template #inner>
      <span v-text="currentYear" />
      <span v-text="months[currentMonth]" />
    </template>
    <template #option="{ optionList }">
      <component
        v-for="(v, index) in optionList.slice(optionSlice)"
        :key="index"
        :is="v.icon"
        size="22"
        @click="handleStep(v.step, v.type)"
      />
    </template>
  </table-header>
  <div :class="`${clsBlockName}-week`">
    <span v-for="v in weeks" :class="`${clsBlockName}-week-inner`">{{ v }}</span>
  </div>
  <div :class="`${clsBlockName}-body`" @mouseleave="handleHover()">
    <div v-for="row in dates" :class="`${clsBlockName}-body-row`">
      <div v-for="col in row" :class="cellCls(col)" @click="handleSelect(col)" @mouseenter="handleHover(col)">
        <span :class="`${clsBlockName}-body-inner`">
          {{ col.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import tableHeader from "../../table-header.vue";
import { ref, type PropType, watch } from "vue";
import { useDayJs } from "../../../core";
import { DayCell, LangsType } from "../../../types";
import dayjs from "dayjs";

const beginModel = defineModel<string>("begin", { default: "" });
const endModel = defineModel<string>("end", { default: "" });
const props = defineProps({
  clsBlockName: { type: String, required: true },
  optionSlice: { type: Number, default: -2 },
  langs: { type: String as PropType<LangsType>, required: true },
  disabledDate: { type: Function as PropType<(value: string) => boolean> },
});
const emits = defineEmits<{
  (e: "on-step"): void;
  (e: "on-hover", date?: DayCell): void;
  (e: "on-select"): void;
}>();

const isInRange = (start: string, end: string, value: string) => start <= value && value <= end;

const { toDay, current, setDates, dates, weeks, currentYear, currentMonth, months, changeMonth, changeYear } = useDayJs(
  props.langs,
  endModel.value
);

if (!endModel.value) {
  current.value = dayjs(current.value).add(1, "month");
}
const isSameMonth = dayjs(beginModel.value).month() === dayjs(endModel.value).month();

if (isSameMonth) {
  current.value = dayjs(endModel.value).add(1, "month");
}

setDates(endModel.value ? (isSameMonth ? dayjs(endModel.value).add(1, "month") : dayjs(endModel.value)) : undefined);

const syncEndPanel = () => {
  const begin = beginModel.value;
  const end = endModel.value;
  if (end && dayjs(end).isValid()) {
    const sameMonth =
      !!begin &&
      dayjs(begin).isValid() &&
      dayjs(begin).year() === dayjs(end).year() &&
      dayjs(begin).month() === dayjs(end).month();
    setDates(sameMonth ? dayjs(end).add(1, "month") : dayjs(end));
    return;
  }
  if (begin && dayjs(begin).isValid()) {
    setDates(dayjs(begin).add(1, "month"));
  }
};

watch([beginModel, endModel], () => syncEndPanel());

const cellCls = (cell: DayCell) => {
  const rangeDate = endModel.value || hoverDate.value?.value;
  const hasMultiDayRange = !!(beginModel.value && rangeDate && beginModel.value !== rangeDate);
  const isRange =
    cell.type === "normal" &&
    hasMultiDayRange &&
    isInRange(beginModel.value, rangeDate!, cell.value);
  const isRangeStart = beginModel.value === cell.value && hasMultiDayRange && cell.type === "normal";
  const isRangeEnd = rangeDate === cell.value && hasMultiDayRange && rangeDate! > beginModel.value && cell.type === "normal";
  const isDisabled = props.disabledDate && props.disabledDate(cell.value);
  // 仅选一天 / 起止同一天：用圆形 active，不用 range-start 半圆
  const isSingleActive =
    cell.type === "normal" &&
    !hasMultiDayRange &&
    (beginModel.value === cell.value || endModel.value === cell.value);

  return [
    `${props.clsBlockName}-body-cell`,
    `day-cell-${cell.type}`,
    { active: isSingleActive },
    { "to-day": toDay.value === cell.value },
    { "range-start": isRangeStart },
    { "range-end": isRangeEnd },
    { range: isRange && !isRangeStart && !isRangeEnd },
    { "cell-disabled": isDisabled },
  ];
};

/**
 * 月份/年份切换
 * @param mode 切换模式
 * @param type 类型
 * @param step 跨度
 */
const handleStep = (mode: "month" | "year", type: "prev" | "next", step: number = 1) => {
  const value = mode === "month" ? currentMonth.value : currentYear.value;
  const newValue = type === "next" ? value + step : value - step;
  (mode === "month" ? changeMonth : changeYear)(newValue);
  setDates();
  emits("on-step");
};

const handleSelect = (date: DayCell) => {
  if (props.disabledDate && props.disabledDate(date.value)) return;
  if (beginModel.value && endModel.value) {
    beginModel.value = date.value;
    endModel.value = "";
    return;
  }
  if (beginModel.value) {
    endModel.value = date.value;
    emits("on-select");
    return;
  }
  beginModel.value = date.value;
};

const hoverDate = ref<DayCell | null>(null);
const handleHover = (date?: DayCell) => {
  if (!date || !beginModel.value) {
    hoverDate.value = null;
    emits("on-hover");
    return;
  }
  if (props.disabledDate && props.disabledDate(date.value)) return;
  hoverDate.value = date;
  emits("on-hover", date);
};

defineExpose({
  year: currentYear,
  month: currentMonth,
});
</script>

<template>
  <div style="display: flex; gap: 40px; flex-wrap: wrap">
    <div>
      <div class="label">Default shortcuts</div>
      <bp-date-range-picker v-model="val" style="width: 320px" :placeholder="['Start date', 'End date']" />
      <div class="value">Value: {{ val }}</div>
    </div>
    <div>
      <div class="label">Custom shortcuts (right)</div>
      <bp-date-range-picker
        v-model="valCustom"
        style="width: 320px"
        shortcuts-position="right"
        :range-shortcuts="customShortcuts"
        :placeholder="['Start date', 'End date']"
      />
      <div class="value">Value: {{ valCustom }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
import type { RangeShortcut } from "birdpaper-ui";

const val = ref<string[]>([]);
const valCustom = ref<string[]>([]);

const customShortcuts: RangeShortcut[] = [
  {
    label: "Next 2 days",
    value: () => [dayjs(), dayjs().add(2, "day")],
  },
  {
    label: "Next 7 days",
    value: () => [dayjs(), dayjs().add(1, "week")],
  },
  {
    label: "Next 30 days",
    value: () => [dayjs(), dayjs().add(1, "month")],
  },
  {
    label: "Next 6 months",
    value: () => [dayjs(), dayjs().add(6, "month")],
  },
  {
    label: "Next 12 months",
    value: () => [dayjs(), dayjs().add(1, "year")],
  },
];
</script>

<style scoped>
.label {
  font-size: 13px;
  color: #86909c;
  margin-bottom: 6px;
}
.value {
  font-size: 13px;
  color: #4e5969;
  margin-top: 8px;
}
</style>

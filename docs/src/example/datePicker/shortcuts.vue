<template>
  <div style="display: flex; gap: 40px; flex-wrap: wrap">
    <div>
      <div class="label">默认快捷选项</div>
      <bp-date-range-picker v-model="val" style="width: 320px" :placeholder="['开始日期', '结束日期']" />
      <div class="value">当前值：{{ val }}</div>
    </div>
    <div>
      <div class="label">自定义快捷选项（右侧）</div>
      <bp-date-range-picker
        v-model="valCustom"
        style="width: 320px"
        shortcuts-position="right"
        :range-shortcuts="customShortcuts"
        :placeholder="['开始日期', '结束日期']"
      />
      <div class="value">当前值：{{ valCustom }}</div>
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
    label: "未来 2 天",
    value: () => [dayjs(), dayjs().add(2, "day")],
  },
  {
    label: "未来 7 天",
    value: () => [dayjs(), dayjs().add(1, "week")],
  },
  {
    label: "未来 30 天",
    value: () => [dayjs(), dayjs().add(1, "month")],
  },
  {
    label: "未来 6 个月",
    value: () => [dayjs(), dayjs().add(6, "month")],
  },
  {
    label: "未来一年",
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

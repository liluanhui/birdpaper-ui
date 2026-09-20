<template>
  <div style="display: flex; gap: 40px; flex-wrap: wrap; align-items: flex-start">
    <div>
      <div class="label">日期选择</div>
      <bp-date-picker v-model="date">
        <template #trigger>
          <bp-button type="secondary">选择日期</bp-button>
        </template>
      </bp-date-picker>
      <div class="value">当前值：{{ date }}</div>
    </div>
    <div>
      <div class="label">日期范围</div>
      <bp-date-range-picker v-model="range">
        <template #trigger>
          <bp-button type="secondary">选择日期范围</bp-button>
        </template>
      </bp-date-range-picker>
      <div class="value">当前值：{{ range }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const date = ref("");
const range = ref<string[]>([]);
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

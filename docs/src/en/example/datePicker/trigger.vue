<template>
  <div style="display: flex; gap: 40px; flex-wrap: wrap; align-items: flex-start">
    <div>
      <div class="label">Date</div>
      <bp-date-picker v-model="date">
        <template #trigger>
          <bp-button type="secondary">Pick a date</bp-button>
        </template>
      </bp-date-picker>
      <div class="value">Value: {{ date }}</div>
    </div>
    <div>
      <div class="label">Date range</div>
      <bp-date-range-picker v-model="range">
        <template #trigger>
          <bp-button type="secondary">Pick a date range</bp-button>
        </template>
      </bp-date-range-picker>
      <div class="value">Value: {{ range }}</div>
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

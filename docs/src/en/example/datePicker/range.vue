<template>
  <div style="display: flex; gap: 40px; flex-wrap: wrap">
    <div>
      <div class="label">Date range</div>
      <bp-date-range-picker v-model="val" style="width: 320px" :placeholder="['Start date', 'End date']" />
      <div class="value">Value: {{ val }}</div>
    </div>
    <div>
      <div class="label">Date-time range</div>
      <bp-date-range-picker
        v-model="valTime"
        show-time
        :default-time="['00:00:00', '23:59:59']"
        value-format="YYYY-MM-DD HH:mm:ss"
        style="width: 400px"
        :placeholder="['Start time', 'End time']"
      />
      <div class="value">Value: {{ valTime }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const val = ref<string[]>([]);
const valTime = ref<string[]>([]);
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

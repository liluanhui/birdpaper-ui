<template>
  <div style="display: flex; gap: 40px; align-items: flex-end; flex-wrap: wrap">
    <div>
      <div class="label">Square + value</div>
      <bp-color-picker v-model="val" show-value />
    </div>
    <div>
      <div class="label">Circle + value</div>
      <bp-color-picker v-model="val" shape="circle" show-value />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const val = ref("#165dff");
</script>

<style scoped>
.label {
  font-size: 13px;
  color: #86909c;
  margin-bottom: 6px;
}
</style>

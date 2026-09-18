<template>
  <div style="display: flex; gap: 40px; align-items: flex-end">
    <div>
      <div class="label">圆角矩形</div>
      <bp-color-picker v-model="val" shape="square" />
    </div>
    <div>
      <div class="label">圆形</div>
      <bp-color-picker v-model="val" shape="circle" />
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

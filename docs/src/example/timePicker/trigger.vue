<template>
  <bp-time-picker v-model="val">
    <template #trigger>
      <bp-button type="secondary">选择时间</bp-button>
    </template>
  </bp-time-picker>
</template>

<script setup lang="ts">
import { ref } from "vue";

const val = ref("");
</script>

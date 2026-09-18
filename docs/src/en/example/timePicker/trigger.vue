<template>
  <bp-time-picker v-model="val">
    <template #trigger>
      <bp-button type="secondary">Pick a time</bp-button>
    </template>
  </bp-time-picker>
</template>

<script setup lang="ts">
import { ref } from "vue";

const val = ref("");
</script>

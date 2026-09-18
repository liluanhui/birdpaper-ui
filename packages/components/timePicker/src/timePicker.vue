<template>
  <bp-trigger
    v-model="showPopup"
    :class="clsBlockName"
    transition="fade-dropdown"
    :hideTrigger
    :disabled
    :popup-offset="10"
    position="bottom-left"
    update-at-scroll
  >
    <bp-input
      ref="inpRef"
      readonly
      v-model="model"
      :name
      :class="cls"
      :placeholder
      :disabled
      :size
      @input="onInput"
      @blur="onBlur"
    >
      <template #suffix>
        <IconCloseLine v-if="clearable && model" class="action-icon" @click.stop="handleClear" />
        <IconTimeLine v-else />
      </template>
    </bp-input>
    <template #content>
      <div :class="`${clsBlockName}-panel select-none`">
        <div :class="`${clsBlockName}-panel-wrapper`">
          <time-table ref="tableRef" />
        </div>
      </div>
    </template>
  </bp-trigger>
</template>

<script setup lang="ts">
import { useNamespace } from "@birdpaper-ui/hooks";
import BpInput from "@birdpaper-ui/components/input/index";
import BpTrigger from "@birdpaper-ui/components/trigger/index";
import { IconTimeLine, IconCloseLine } from "birdpaper-icon";
import { timePickerProps, TimePickerProps } from "./props";
import { computed, nextTick, provide, reactive, ref, watch } from "vue";
import timeTable from "./components/time-table.vue";
import { timeInjectionKey } from "./types";

defineOptions({ name: "TimePicker" });
const { clsBlockName } = useNamespace("timePicker");

const model = defineModel<string>({ default: "" });
const props: TimePickerProps = defineProps(timePickerProps);
const emits = defineEmits(["input", "blur"]);

const cls = computed<string[] | {}[]>(() => [clsBlockName.value, `${clsBlockName.value}-${props.size}`]);

const showPopup = ref<boolean>(false);
const tableRef = ref<InstanceType<typeof timeTable>>();

provide(
  timeInjectionKey,
  reactive({
    modelValue: model,
    onSelect: (v: string) => {
      model.value = v;
      showPopup.value = false;
    },
  })
);

/** Popup uses display:none while closed — re-scroll after it becomes visible. */
watch(showPopup, async (visible) => {
  if (!visible || !model.value) return;
  await nextTick();
  requestAnimationFrame(() => {
    tableRef.value?.setTime?.(model.value);
  });
});

const handleClear = () => {
  model.value = "";
};

const onInput = () => emits("input");
const onBlur = () => emits("blur");
</script>

<template>
  <bp-trigger
    v-model="showPopup"
    transition="fade-dropdown"
    :hideTrigger
    :disabled
    :popup-offset="10"
    position="bottom-left"
    update-at-scroll
  >
    <slot v-if="$slots.trigger" name="trigger" :value="model" :visible="showPopup" />
    <bp-input
      v-else
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
        <IconCalendarLine v-else />
      </template>
    </bp-input>
    <template #content>
      <picker-panel type="year" />
    </template>
  </bp-trigger>
</template>

<script lang="ts" setup>
import { useNamespace } from "@birdpaper-ui/hooks";
import BpInput from "@birdpaper-ui/components/input/index";
import BpTrigger from "@birdpaper-ui/components/trigger/index";
import { computed, provide, reactive, ref, toRefs, watch } from "vue";
import { commonPickerProps, YearPickerProps, yearPickerProps } from "./props";
import { IconCalendarLine, IconCloseLine } from "birdpaper-icon";
import pickerPanel from "./components/picker-panel.vue";
import { dateInjectionKey, type DatePickerContext } from "./types";

defineOptions({ name: "YearPicker" });
const { clsBlockName } = useNamespace("date-picker");

const model = defineModel<string>({ default: "" });
const props: YearPickerProps = defineProps({ ...commonPickerProps, ...yearPickerProps });
const emits = defineEmits(["input", "blur"]);

const cls = computed<string[] | {}[]>(() => [clsBlockName.value, `${clsBlockName.value}-${props.size}`]);

const showPopup = ref<boolean>(false);
const panelValue = ref(model.value || "");
watch(model, (v) => {
  panelValue.value = v || "";
});

const { langs, valueFormat } = toRefs(props);
const pickerContext = reactive({
  type: "year" as const,
  model,
  panelValue,
  setPanelValue: (v: string) => {
    panelValue.value = v;
  },
  langs,
  valueFormat,
  onSelect: (v: string) => {
    model.value = v;
    panelValue.value = v;
    showPopup.value = false;
  },
});
provide(dateInjectionKey, pickerContext as unknown as DatePickerContext);

const handleClear = () => {
  model.value = "";
  panelValue.value = "";
};

const onInput = () => emits("input");
const onBlur = () => emits("blur");
</script>

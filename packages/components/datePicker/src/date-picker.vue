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
    <bp-input v-else ref="inpRef" readonly v-model="model" :name :class="cls" :placeholder :disabled :size>
      <template #suffix>
        <IconCloseLine v-if="clearable && model" class="action-icon" @click.stop="handleClear" />
        <IconCalendarLine v-else />
      </template>
    </bp-input>
    <template #content>
      <picker-panel />
    </template>
  </bp-trigger>
</template>

<script lang="ts" setup>
import { useNamespace } from "@birdpaper-ui/hooks";
import BpInput from "@birdpaper-ui/components/input/index";
import BpTrigger from "@birdpaper-ui/components/trigger/index";
import { computed, provide, reactive, ref, toRefs, watch } from "vue";
import { commonPickerProps, datePickerProps, DatePickerProps } from "./props";
import { IconCalendarLine, IconCloseLine } from "birdpaper-icon";
import pickerPanel from "./components/picker-panel.vue";
import { dateInjectionKey, type DatePickerContext } from "./types";

defineOptions({ name: "DatePicker" });
const { clsBlockName } = useNamespace("date-picker");

const model = defineModel<string>({ default: "" });
const props: DatePickerProps = defineProps({ ...commonPickerProps, ...datePickerProps });

const cls = computed<string[] | {}[]>(() => [clsBlockName.value, `${clsBlockName.value}-${props.size}`]);

const showPopup = ref<boolean>(false);
const panelValue = ref(model.value || "");
watch(model, (v) => {
  panelValue.value = v || "";
});

const { langs, valueFormat, showTime, disabledDate } = toRefs(props);
const pickerContext = reactive({
  type: "date" as const,
  model,
  panelValue,
  setPanelValue: (v: string) => {
    panelValue.value = v;
  },
  langs,
  valueFormat,
  showTime,
  disableDate: disabledDate,
  onSelect: (v: string, _payload: any, closePopup = true) => {
    model.value = v;
    panelValue.value = v;
    if (closePopup) showPopup.value = false;
  },
});
provide(dateInjectionKey, pickerContext as unknown as DatePickerContext);

const handleClear = () => {
  model.value = "";
  panelValue.value = "";
};
</script>

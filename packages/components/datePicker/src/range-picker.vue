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
    <div :class="cls">
      <div :class="`${clsBlockName}-input`">
        <input
          v-model="inputBegin"
          :disabled
          :placeholder="placeholder[0]"
          @blur="handleInputCommit('begin')"
          @keydown.enter.prevent="handleInputCommit('begin')"
        />
        <div class="split">-</div>
        <input
          v-model="inputEnd"
          :disabled
          :placeholder="placeholder[1]"
          @blur="handleInputCommit('end')"
          @keydown.enter.prevent="handleInputCommit('end')"
        />
      </div>

      <div :class="`${clsBlockName}-suffix`">
        <IconCalendarLine />
      </div>
    </div>
    <template #content>
      <picker-panel type="range" />
    </template>
  </bp-trigger>
</template>

<script setup lang="ts">
import { useNamespace } from "@birdpaper-ui/hooks";
import BpTrigger from "@birdpaper-ui/components/trigger/index";
import pickerPanel from "./components/picker-panel.vue";
import { ref, provide, computed, watch, reactive, toRefs } from "vue";
import { rangeInjectionKey, type RangePickerContext } from "./types";
import { RangePickerProps, rangePickerProps } from "./props";
import { IconCalendarLine } from "birdpaper-icon";
import dayjs from "dayjs";

defineOptions({ name: "DateRangePicker" });
const { clsBlockName } = useNamespace("date-range-picker");

const model = defineModel<string[]>({ default: [] });
const props: RangePickerProps = defineProps({ ...rangePickerProps });

const inputValues = ref<[string, string]>([model.value[0] || "", model.value[1] || ""]);
const inputBegin = computed({
  get: () => inputValues.value[0],
  set: (val: string) => {
    inputValues.value[0] = val;
  },
});
const inputEnd = computed({
  get: () => inputValues.value[1],
  set: (val: string) => {
    inputValues.value[1] = val;
  },
});

watch(
  () => [model.value?.[0], model.value?.[1]] as const,
  (val) => {
    inputValues.value = [val?.[0] || "", val?.[1] || ""];
  }
);

const cls = computed<string[] | {}[]>(() => [
  clsBlockName.value,
  `${clsBlockName.value}-${props.size}`,
  props.disabled ? `${clsBlockName.value}-disabled` : "",
]);

/** When showTime is on and format has no time tokens, append HH:mm:ss. */
const effectiveFormat = computed(() => {
  const format = props.valueFormat;
  if (!props.showTime) return format;
  if (/H|m|s|A|a/.test(format)) return format;
  return `${format} HH:mm:ss`;
});

const showPopup = ref<boolean>(false);
const { langs, disabledDate, showTime, defaultTime } = toRefs(props);
const pickerContext = reactive({
  type: "range" as const,
  model,
  langs,
  valueFormat: effectiveFormat,
  showTime,
  defaultTime,
  disableDate: disabledDate,
  onSelect: (v: string[], _payload: any, closePopup = true) => {
    model.value = [v?.[0] || "", v?.[1] || ""];
    if (closePopup) showPopup.value = false;
  },
});
provide(rangeInjectionKey, pickerContext as unknown as RangePickerContext);

const normalizeInput = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (!dayjs(trimmed).isValid()) return "";
  const normalized = dayjs(trimmed).format(effectiveFormat.value);
  if (props.disabledDate && props.disabledDate(normalized)) return "";
  return normalized;
};

const handleInputCommit = (source: "begin" | "end") => {
  let begin = normalizeInput(inputValues.value[0]);
  let end = normalizeInput(inputValues.value[1]);

  if (begin && end && begin > end) {
    if (source === "begin") {
      end = "";
    } else {
      begin = "";
    }
  }

  inputValues.value = [begin, end];
  model.value = [begin, end];
};
</script>

import { PropItem } from "../../../.vitepress/components/api-block/src/types";

export const commonPickerProps: PropItem[] = [
  { name: "v-model", remark: "Bound value", type: ["String"] },
  { name: "name", remark: "Picker name", type: ["String"] },
  {
    name: "size",
    remark: "Input size",
    type: ["InputSize"],
    optional: ["mini", "small", "default", "large"],
    default: "default",
  },
  { name: "placeholder", remark: "Placeholder", type: ["String"] },
  { name: "disabled", remark: "Whether disabled", type: ["Boolean"], default: "false" },
  { name: "disabled-date", remark: "Disabled dates", type: ["(value: string) => boolean"] },
  { name: "clearable", remark: "Whether clearable", type: ["Boolean"], default: "false" },
  { name: "hide-trigger", remark: "Whether to show panel only", type: ["Boolean"], default: "false" },
  { name: "langs", remark: "Locale", type: ["LangsType"], optional: ["en", "zh-cn"], default: "zh-cn" },
];

export const datePickerProps: PropItem[] = [
  {
    name: "value-format",
    remark: "Value format",
    type: ["String"],
    default: "YYYY-MM-DD",
  },
  { name: "show-time", remark: "Whether to allow time selection", type: ["Boolean"], default: false },
];


export const monthPickerProps: PropItem[] = [
  {
    name: "value-format",
    remark: "Value format",
    type: ["String"],
    default: "YYYY-MM",
  },
];

export const yearPickerProps: PropItem[] = [
  {
    name: "value-format",
    remark: "Value format",
    type: ["String"],
    default: "YYYY",
  },
];

export const rangePickerProps: PropItem[] = [
  { name: "v-model", remark: "Bound value", type: ["String[]"] },
  { name: "placeholder", remark: "Placeholder", type: ["String[]"], default: "['', '']" },
  {
    name: "size",
    remark: "Input size",
    type: ["InputSize"],
    optional: ["mini", "small", "default", "large"],
    default: "default",
  },
  { name: "disabled", remark: "Whether disabled", type: ["Boolean"], default: "false" },
  { name: "disabled-date", remark: "Disabled dates", type: ["(value: string) => boolean"] },
  { name: "hide-trigger", remark: "Whether to show panel only", type: ["Boolean"], default: "false" },
  { name: "langs", remark: "Locale", type: ["LangsType"], optional: ["en", "zh-cn"], default: "zh-cn" },
  { name: "value-format", remark: "Value format", type: ["String"], default: "YYYY-MM-DD" },
  { name: "show-time", remark: "Whether to show time selection", type: ["Boolean"], default: "false" },
  {
    name: "default-time",
    remark: "Default start/end time when show-time is enabled",
    type: ["[string, string]"],
    default: "['00:00:00', '23:59:59']",
  },
];

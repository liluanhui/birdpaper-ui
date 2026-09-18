import { PropItem, SlotItem } from "../../.vitepress/components/api-block/src/types";

export const commonPickerProps: PropItem[] = [
  { name: "v-model", remark: "绑定值",
    remarkEn: "Bound value", type: ["String"] },
  { name: "name", remark: "选择器名称",
    remarkEn: "Picker name", type: ["String"] },
  {
    name: "size",
    remark: "输入框尺寸",
    remarkEn: "Input size",
    type: ["InputSize"],
    optional: ["mini", "small", "default", "large"],
    default: "default",
  },
  { name: "placeholder", remark: "占位文本",
    remarkEn: "Placeholder", type: ["String"] },
  { name: "disabled", remark: "是否禁用",
    remarkEn: "Whether disabled", type: ["Boolean"], default: "false" },
  { name: "disabled-date", remark: "不可选日期",
    remarkEn: "Disabled dates", type: ["(value: string) => boolean"] },
  { name: "clearable", remark: "是否允许清空",
    remarkEn: "Whether clearable", type: ["Boolean"], default: "false" },
  { name: "hide-trigger", remark: "是否仅展示面板",
    remarkEn: "Whether to show panel only", type: ["Boolean"], default: "false" },
  { name: "langs", remark: "语言",
    remarkEn: "Locale", type: ["LangsType"], optional: ["en", "zh-cn"], default: "zh-cn" },
];

export const datePickerProps: PropItem[] = [
  {
    name: "value-format",
    remark: "值的格式",
    remarkEn: "Value format",
    type: ["String"],
    default: "YYYY-MM-DD",
  },
  { name: "show-time", remark: "允许选择时间",
    remarkEn: "Whether to allow time selection", type: ["Boolean"], default: false },
];


export const monthPickerProps: PropItem[] = [
  {
    name: "value-format",
    remark: "值的格式",
    remarkEn: "Value format",
    type: ["String"],
    default: "YYYY-MM",
  },
];

export const yearPickerProps: PropItem[] = [
  {
    name: "value-format",
    remark: "值的格式",
    remarkEn: "Value format",
    type: ["String"],
    default: "YYYY",
  },
];

export const rangePickerProps: PropItem[] = [
  { name: "v-model", remark: "绑定值",
    remarkEn: "Bound value", type: ["String[]"] },
  { name: "placeholder", remark: "占位文本",
    remarkEn: "Placeholder", type: ["String[]"], default: "['', '']" },
  {
    name: "size",
    remark: "输入框尺寸",
    remarkEn: "Input size",
    type: ["InputSize"],
    optional: ["mini", "small", "default", "large"],
    default: "default",
  },
  { name: "disabled", remark: "是否禁用",
    remarkEn: "Whether disabled", type: ["Boolean"], default: "false" },
  { name: "disabled-date", remark: "不可选日期",
    remarkEn: "Disabled dates", type: ["(value: string) => boolean"] },
  { name: "hide-trigger", remark: "是否仅展示面板",
    remarkEn: "Whether to show panel only", type: ["Boolean"], default: "false" },
  { name: "langs", remark: "语言",
    remarkEn: "Locale", type: ["LangsType"], optional: ["en", "zh-cn"], default: "zh-cn" },
  { name: "value-format", remark: "值的格式",
    remarkEn: "Value format", type: ["String"], default: "YYYY-MM-DD" },
  { name: "show-time", remark: "是否显示时间选择",
    remarkEn: "Whether to show time selection", type: ["Boolean"], default: "false" },
  {
    name: "default-time",
    remark: "show-time 时的默认起止时间",
    remarkEn: "Default start/end time when show-time is enabled",
    type: ["[string, string]"],
    default: "['00:00:00', '23:59:59']",
  },
  {
    name: "range-shortcuts",
    remark: "快捷选项。true 使用内置预设，false 关闭，传入数组可自定义",
    remarkEn: "Range shortcuts. true for built-in presets, false to hide, or pass an array to customize",
    type: ["RangeShortcut[]", "boolean"],
    default: "true",
  },
  {
    name: "shortcuts-position",
    remark: "快捷选项面板位置",
    remarkEn: "Side of the shortcuts panel",
    type: ["RangeShortcutsPosition"],
    optional: ["left", "right"],
    default: "left",
  },
];

export const pickerSlots: SlotItem[] = [
  {
    name: "trigger",
    remark: "自定义触发元素，未传入时使用默认输入框",
    remarkEn: "Custom trigger element; falls back to the default input when omitted",
    params: "{ value, visible }",
  },
];

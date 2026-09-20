import { EventItem, PropItem, SlotItem } from "../../.vitepress/components/api-block/src/types";

export const timePickerProps: PropItem[] = [
  { name: "v-model", remark: "绑定值",
    remarkEn: "Bound value", type: ["String"], default: "" },
  { name: "name", remark: "输入框名称",
    remarkEn: "Input name", type: ["String"] },
  { name: "placeholder", remark: "占位文本",
    remarkEn: "Placeholder", type: ["String"], default: "" },
  {
    name: "size",
    remark: "尺寸",
    remarkEn: "Size",
    type: ["InputSize"],
    optional: ["mini", "small", "default", "large"],
    default: "default",
  },
  { name: "disabled", remark: "是否禁用",
    remarkEn: "Whether disabled", type: ["Boolean"], default: false },
  { name: "clearable", remark: "是否可清空",
    remarkEn: "Whether clearable", type: ["Boolean"], default: false },
  { name: "value-format", remark: "值格式",
    remarkEn: "Value format", type: ["String"], default: "YYYY-MM-DD" },
  { name: "hide-trigger", remark: "是否隐藏触发器",
    remarkEn: "Whether to hide the trigger", type: ["Boolean"], default: false },
];

export const timePickerEvents: EventItem[] = [
  { name: "input", remark: "输入触发",
    remarkEn: "Triggered on input" },
  { name: "blur", remark: "失焦触发",
    remarkEn: "Triggered on blur" },
];

export const timePickerSlots: SlotItem[] = [
  {
    name: "trigger",
    remark: "自定义触发元素，未传入时使用默认输入框",
    remarkEn: "Custom trigger element; falls back to the default input when omitted",
    params: "{ value, visible }",
  },
];

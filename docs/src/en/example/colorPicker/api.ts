import { PropItem } from "../../../.vitepress/components/api-block/src/types";

export const colorPickerProps: PropItem[] = [
  { name: "v-model", remark: "Bound value", type: ["String"], default: "#165dff" },
  { name: "hide-trigger", remark: "Whether to hide the trigger", type: ["Boolean"], default: false },
  {
    name: "value-type",
    remark: "Color value type",
    type: ["String"],
    optional: ["hex", "rgb"],
    default: "hex",
  },
  {
    name: "size",
    remark: "Size",
    type: ["String"],
    optional: ["mini", "small", "default", "large"],
    default: "default",
  },
  {
    name: "shape",
    remark: "Trigger shape",
    type: ["ColorPickerShape"],
    optional: ["square", "circle"],
    default: "square",
  },
  {
    name: "show-value",
    remark: "Whether to show the color value beside the trigger",
    type: ["Boolean"],
    default: false,
  },
  { name: "disabled", remark: "Whether disabled", type: ["Boolean"], default: false },
];

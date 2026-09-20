import { EventItem, PropItem, SlotItem } from "../../../.vitepress/components/api-block/src/types";

export const tableProps: PropItem[] = [
  { name: "v-model:selected-key", remark: "Selected key (radio)", type: ["String", "Number"] },
  { name: "v-model:selected-keys", remark: "Selected keys (checkbox)", type: ["Array"] },
  { name: "data", remark: "Data source", type: ["Array"], default: "[]" },
  {
    name: "size",
    remark: "Table size",
    type: ["TableSize"],
    optional: ["mini", "normal", "large"],
    default: "normal",
  },
  { name: "height", remark: "Fixed height", type: ["String"] },
  { name: "border", remark: "Whether bordered", type: ["Boolean"], default: false },
  { name: "stripe", remark: "Whether striped", type: ["Boolean"], default: false },
  { name: "row-key", remark: "Row key", type: ["String"], default: "id" },
  { name: "loading", remark: "Whether loading", type: ["Boolean"], default: false },
  {
    name: "spin-icon",
    remark: "Loading icon",
    type: ["Number", "Component"],
    optional: ["1", "2", "3", "4", "5", "Component"],
    default: 1,
  },
  { name: "description", remark: "Loading description", type: ["String"], default: "" },
  { name: "empty-text", remark: "Empty data text", type: ["String"], default: "No data" },
  { name: "row-selection", remark: "Row selection config", type: ["TableRowSelection"], default: "null" },
  { name: "scroll", remark: "Scroll config", type: ["TableScroll"], default: "{}" },
];

export const tableColumnProps: PropItem[] = [
  { name: "title", remark: "Column title", type: ["String"] },
  { name: "data-index", remark: "Field name", type: ["String"] },
  { name: "width", remark: "Column width", type: ["Number", "String"] },
  { name: "min-width", remark: "Min column width", type: ["Number", "String"] },
  { name: "fixed", remark: "Fixed column", type: ["String"], optional: ["left", "right"] },
  { name: "align", remark: "Alignment", type: ["String"], optional: ["left", "center", "right"], default: "left" },
  { name: "ellipsis", remark: "Whether to ellipsis overflow", type: ["Boolean"], default: false },
  { name: "tooltip", remark: "Whether to show tooltip", type: ["Boolean"], default: false },
];

export const tableEvents: EventItem[] = [
  { name: "select-all", remark: "Triggered on select-all toggle", params: "val: boolean" },
  { name: "select", remark: "Triggered when selected rows change", params: "vals: CheckboxValue[], rowKey: RadioValue, record: any" },
  { name: "selection-change", remark: "Triggered when checkbox selection changes", params: "vals: CheckboxValue[]" },
];

export const tableSlots: SlotItem[] = [
  { name: "columns", remark: "Column definitions" },
  { name: "empty", remark: "Empty-state content" },
];

export const tableColumnSlots: SlotItem[] = [
  { name: "cell", remark: "Cell content", params: "{ record, rowIndex }" },
];

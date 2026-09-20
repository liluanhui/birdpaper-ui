import { EventItem, PropItem, SlotItem } from "../../.vitepress/components/api-block/src/types";

export const tableProps: PropItem[] = [
  { name: "v-model:selected-key", remark: "单选选中值",
    remarkEn: "Selected key (radio)", type: ["String", "Number"] },
  { name: "v-model:selected-keys", remark: "多选选中值",
    remarkEn: "Selected keys (checkbox)", type: ["Array"] },
  { name: "data", remark: "数据源",
    remarkEn: "Data source", type: ["Array"], default: "[]" },
  {
    name: "size",
    remark: "表格尺寸",
    remarkEn: "Table size",
    type: ["TableSize"],
    optional: ["mini", "normal", "large"],
    default: "normal",
  },
  { name: "height", remark: "固定高度",
    remarkEn: "Fixed height", type: ["String"] },
  { name: "border", remark: "是否显示边框",
    remarkEn: "Whether bordered", type: ["Boolean"], default: false },
  { name: "stripe", remark: "是否斑马纹",
    remarkEn: "Whether striped", type: ["Boolean"], default: false },
  { name: "row-key", remark: "行唯一键",
    remarkEn: "Row key", type: ["String"], default: "id" },
  { name: "loading", remark: "是否加载中",
    remarkEn: "Whether loading", type: ["Boolean"], default: false },
  {
    name: "spin-icon",
    remark: "加载图标",
    remarkEn: "Loading icon",
    type: ["Number", "Component"],
    optional: ["1", "2", "3", "4", "5", "Component"],
    default: 1,
  },
  { name: "description", remark: "加载描述",
    remarkEn: "Loading description", type: ["String"], default: "" },
  { name: "empty-text", remark: "空数据文本",
    remarkEn: "Empty data text", type: ["String"], default: "暂无数据" },
  { name: "row-selection", remark: "选择配置",
    remarkEn: "Row selection config", type: ["TableRowSelection"], default: "null" },
  { name: "scroll", remark: "滚动配置",
    remarkEn: "Scroll config", type: ["TableScroll"], default: "{}" },
];

export const tableColumnProps: PropItem[] = [
  { name: "title", remark: "列标题",
    remarkEn: "Column title", type: ["String"] },
  { name: "data-index", remark: "字段名",
    remarkEn: "Field name", type: ["String"] },
  { name: "width", remark: "列宽",
    remarkEn: "Column width", type: ["Number", "String"] },
  { name: "min-width", remark: "最小列宽",
    remarkEn: "Min column width", type: ["Number", "String"] },
  { name: "fixed", remark: "固定列",
    remarkEn: "Fixed column", type: ["String"], optional: ["left", "right"] },
  { name: "align", remark: "对齐方式",
    remarkEn: "Alignment", type: ["String"], optional: ["left", "center", "right"], default: "left" },
  { name: "ellipsis", remark: "是否省略",
    remarkEn: "Whether to ellipsis overflow", type: ["Boolean"], default: false },
  { name: "tooltip", remark: "是否显示提示",
    remarkEn: "Whether to show tooltip", type: ["Boolean"], default: false },
];

export const tableEvents: EventItem[] = [
  { name: "select-all", remark: "全选切换",
    remarkEn: "Triggered on select-all toggle", params: "val: boolean" },
  { name: "select", remark: "选中行变化",
    remarkEn: "Triggered when selected rows change", params: "vals: CheckboxValue[], rowKey: RadioValue, record: any" },
  { name: "selection-change", remark: "多选变化",
    remarkEn: "Triggered when checkbox selection changes", params: "vals: CheckboxValue[]" },
];

export const tableSlots: SlotItem[] = [
  { name: "columns", remark: "列定义",
    remarkEn: "Column definitions" },
  { name: "empty", remark: "空状态内容",
    remarkEn: "Empty-state content" },
];

export const tableColumnSlots: SlotItem[] = [
  { name: "cell", remark: "单元格内容",
    remarkEn: "Cell content", params: "{ record, rowIndex }" },
];

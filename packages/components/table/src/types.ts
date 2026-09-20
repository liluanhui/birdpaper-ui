export interface ColumnsItem {
  title?: string;
  type: "inner" | "radio" | "checkbox";
  dataIndex?: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  fixed?: "left" | "right";
  fixedOffset?: number;
  align: "left" | "center" | "right";
}

export interface TableRowSelection {
  type: "checkbox" | "radio";
}

export interface TableScroll {
  x?: number | string; // 横向滚动宽度
  y?: number | string; // 纵向滚动高度
  scrollToFirstRowOnChange?: boolean; // 分页、排序、筛选变化后是否滚动到表格顶部
}

/** Table density size. */
export type TableSize = "mini" | "normal" | "large";

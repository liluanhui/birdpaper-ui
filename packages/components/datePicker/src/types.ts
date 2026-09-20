import { InjectionKey } from "vue";
import type { Dayjs } from "dayjs";

/** 语言类型 */
export type LangsType = "en" | "zh-cn";

/** 日历中日期类型 */
export type DayType = "prev" | "normal" | "next";

/** 日历中日期单元格 */
export interface DayCell {
  type: DayType;
  value: string;
  label?: string;
}

/** 日历中月份单元格 */
export interface MonthCell {
  value: string;
  label?: string;
}

/** 日历中的年份单元格 */
export interface YearCell {
  value: number;
  label?: string;
}

/** 日历面板类型 */
export type PanelType = "date" | "month" | "year" | "range";

/** 范围快捷选项的日期值（支持 dayjs / Date / 字符串） */
export type RangeShortcutDate = Dayjs | Date | string;

/** 范围快捷选项返回值或工厂函数 */
export type RangeShortcutValue =
  | [RangeShortcutDate, RangeShortcutDate]
  | (() => [RangeShortcutDate, RangeShortcutDate]);

/** 范围选择快捷选项 */
export interface RangeShortcut {
  label: string;
  value: RangeShortcutValue;
}

/** 快捷选项面板位置 */
export type RangeShortcutsPosition = "left" | "right";

export interface DatePickerContext {
  type: PanelType;
  /** 绑定值 */
  model: string;
  /** 面板展示用值（中间态导航，不写入 v-model） */
  panelValue?: string;
  /** 更新面板展示值 */
  setPanelValue?: (value: string) => void;
  /** 语言类型 */
  langs: LangsType;
  /** 值格式 */
  valueFormat: string;
  /** 是否显示时间选择器 */
  showTime?: boolean;
  /** 是否禁用日期 */
  disableDate?: Function;
  /** 选择后触发 */
  onSelect: (value: string, payload: object, closePopup: boolean) => void;
}
export const dateInjectionKey: InjectionKey<DatePickerContext> = Symbol("DatePickerCtxKey");

export interface RangePickerContext {
  type: PanelType;
  /** 绑定值 */
  model: string[];
  /** 语言类型 */
  langs: LangsType;
  /** 值格式 */
  valueFormat: string;
  /** 是否显示时间选择器 */
  showTime?: boolean;
  /** 默认起止时间（showTime 时） */
  defaultTime?: [string, string];
  /** 快捷选项，false 关闭；true / 未传使用内置默认；数组为自定义 */
  rangeShortcuts?: RangeShortcut[] | boolean;
  /** 快捷选项面板位置 */
  shortcutsPosition?: RangeShortcutsPosition;
  /** 是否禁用日期 */
  disableDate?: (value: string) => boolean;
  /** 选择后触发 */
  onSelect: (value: string[], payload: object, closePopup: boolean) => void;
}
export const rangeInjectionKey: InjectionKey<RangePickerContext> = Symbol("RangePickerCtxKey");

import { InputSize } from "@birdpaper-ui/components/input/src/types";
import { ExtractPropTypes, PropType } from "vue";
import { LangsType, RangeShortcut, RangeShortcutsPosition } from "./types";

export const commonPickerProps = {
  /**
   * @type string
   * @description The input name.
   * @default ""
   */
  name: {
    type: String,
  },
  /**
   * @type string
   * @description Placeholder text content.
   * @default ""
   */
  placeholder: {
    type: String,
    default: "",
  },
  /**
   * @type InputSize
   * @description Input sizes.
   * @default default
   */
  size: {
    type: String as PropType<InputSize>,
    default: "default",
  },
  /**
   * @type boolean
   * @description Input is disabled or not.
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  disabledDate: {
    type: Function as PropType<(value: string) => boolean>,
  },
  /**
   * @type boolean
   * @description Clearable or not.
   * @default false
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * @type string
   * @description Hide trigger or not.
   * @default false
   */
  hideTrigger: {
    type: Boolean,
    default: false,
  },
  /**
   * @type string
   * @description Language.
   * @default "zh-cn"
   */
  langs: {
    type: String as PropType<LangsType>,
    default: "zh-cn",
  },
};

export const datePickerProps = {
  /**
   * @type string
   * @description Value format.
   * @default "YYYY-MM-DD"
   */
  valueFormat: {
    type: String,
    default: "YYYY-MM-DD",
  },
  /**
   * @type boolean
   * @description Show time or not.
   * @default false
   */
  showTime: {
    type: Boolean,
    default: false,
  },
} as const;

export const yearPickerProps = {
  /**
   * @type string
   * @description Value format.
   * @default "YYYY"
   */
  valueFormat: {
    type: String,
    default: "YYYY",
  },
} as const;

export const monthPickerProps = {
  /**
   * @type string
   * @description Value format.
   * @default "YYYY-MM"
   */
  valueFormat: {
    type: String,
    default: "YYYY-MM",
  },
} as const;

export const rangePickerProps = {
  /**
   * @type string[]
   * @description Placeholder text content.
   * @default ["",""]
   */
  placeholder: {
    type: Array as PropType<string[]>,
    default: ["", ""],
  },
  /**
   * @type InputSize
   * @description Input sizes.
   * @default default
   */
  size: {
    type: String as PropType<InputSize>,
    default: "default",
  },
  /**
   * @type boolean
   * @description Input is disabled or not.
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  disabledDate: {
    type: Function as PropType<(value: string) => boolean>,
  },
  /**
   * @type string
   * @description Hide trigger or not.
   * @default false
   */
  hideTrigger: {
    type: Boolean,
    default: false,
  },
  /**
   * @type string
   * @description Language.
   * @default "zh-cn"
   */
  langs: {
    type: String as PropType<LangsType>,
    default: "zh-cn",
  },
  /**
   * @type string
   * @description Value format.
   * @default "YYYY-MM-DD"
   */
  valueFormat: {
    type: String,
    default: "YYYY-MM-DD",
  },
  /**
   * @type boolean
   * @description Show time selectors or not.
   * @default false
   */
  showTime: {
    type: Boolean,
    default: false,
  },
  /**
   * @type [string, string]
   * @description Default start/end time when `showTime` is enabled.
   * @default ["00:00:00", "23:59:59"]
   */
  defaultTime: {
    type: Array as PropType<[string, string]>,
    default: () => ["00:00:00", "23:59:59"],
  },
  /**
   * @type RangeShortcut[] | boolean
   * @description Range shortcuts. `true` uses built-in presets; `false` hides the panel; pass an array to customize.
   * @default true
   */
  rangeShortcuts: {
    type: [Array, Boolean] as PropType<RangeShortcut[] | boolean>,
    default: true,
  },
  /**
   * @type RangeShortcutsPosition
   * @description Side of the shortcuts panel.
   * @default left
   */
  shortcutsPosition: {
    type: String as PropType<RangeShortcutsPosition>,
    default: "left",
  },
};

export type DatePickerProps = ExtractPropTypes<typeof commonPickerProps & typeof datePickerProps>;
export type YearPickerProps = ExtractPropTypes<typeof commonPickerProps & typeof yearPickerProps>;
export type MonthPickerProps = ExtractPropTypes<typeof commonPickerProps & typeof monthPickerProps>;
export type RangePickerProps = ExtractPropTypes<typeof rangePickerProps>;

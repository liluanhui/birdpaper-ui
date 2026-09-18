import { ExtractPropTypes, PropType } from "vue";
import { ColorPickerShape, ColorPickerValueType } from "./types";
import { InputSize } from "@birdpaper-ui/components/input/src/types";

export const colorPickerProps = {
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
   * @description Color Type.
   * @default 'hex'
   */
  valueType: {
    type: String as PropType<ColorPickerValueType>,
    default: "hex",
  },
  /**
   * @type InputSize
   * @description Picker sizes.
   * @default default
   */
  size: {
    type: String as PropType<InputSize>,
    default: "default",
  },
  /**
   * @type ColorPickerShape
   * @description Trigger shape: rounded square or circle.
   * @default square
   */
  shape: {
    type: String as PropType<ColorPickerShape>,
    default: "square",
  },
  /**
   * @type boolean
   * @description Show selected color value beside the trigger.
   * @default false
   */
  showValue: {
    type: Boolean,
    default: false,
  },
  /**
   * @type boolean
   * @description Picker is disabled or not.
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>;

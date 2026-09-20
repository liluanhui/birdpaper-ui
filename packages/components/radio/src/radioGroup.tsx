import { PropType, Fragment, cloneVNode, h, computed, VNode, ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import { DirectionType, RadioType, RadioValue } from "./types";
import { useNamespace } from "@birdpaper-ui/hooks";
import { defineComponent } from "vue";
import { getAllElements } from "@birdpaper-ui/components/utils/dom";
import { ButtonSize } from "@birdpaper-ui/components/button/src/types";
import { get } from "radash";

export default defineComponent({
  name: "RadioGroup",
  props: {
    /**
     * @type RadioValue
     * @description Model value.
     */
    modelValue: {
      type: [String, Number] as PropType<RadioValue>,
    },
    /**
     * @type RadioType
     * @description Radio type.
     * @default "radio"
     */
    type: {
      type: String as PropType<RadioType>,
      default: "radio",
    },
    /**
     * @type ButtonSize
     * @description Radio sizes when the type is button.
     * @default default
     */
    size: {
      type: String as PropType<ButtonSize>,
      default: "default",
    },
    /**
     * @type boolean
     * @description Disabled or not.
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @type DirectionType
     * @description Direction of radio group.
     * @default "horizontal"
     */
    direction: {
      type: String as PropType<DirectionType>,
      default: "horizontal",
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit, slots }) {
    const { clsBlockName } = useNamespace("radio-group");
    const { clsBlockName: radioCls } = useNamespace("radio");
    const rootRef = ref<HTMLElement>();
    const sliderReady = ref(false);
    const sliderStyle = ref<Record<string, string>>({});
    let resizeObserver: ResizeObserver | null = null;

    const updateValue = (v: RadioValue) => {
      emit("update:modelValue", v);
    };

    const updateSlider = () => {
      if (props.type !== "button") return;
      const root = rootRef.value;
      if (!root) return;

      const active = root.querySelector<HTMLElement>(`.${radioCls.value}-check .${radioCls.value}-label`);
      if (!active) {
        sliderReady.value = false;
        return;
      }

      const rootRect = root.getBoundingClientRect();
      const rect = active.getBoundingClientRect();
      sliderStyle.value = {
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        transform: `translate3d(${rect.left - rootRect.left}px, ${rect.top - rootRect.top}px, 0)`,
      };

      if (!sliderReady.value) {
        requestAnimationFrame(() => {
          sliderReady.value = true;
        });
      }
    };

    onMounted(() => {
      nextTick(updateSlider);
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => updateSlider());
        rootRef.value && resizeObserver.observe(rootRef.value);
      }
    });

    onBeforeUnmount(() => {
      resizeObserver?.disconnect();
      resizeObserver = null;
    });

    watch(
      () => [props.modelValue, props.size, props.type] as const,
      () => nextTick(updateSlider)
    );

    const cls = computed(() => {
      let clsName = [clsBlockName.value];
      clsName.push(
        props.type === "button"
          ? `${clsBlockName.value}-button ${clsBlockName.value}-${props.size}`
          : `${clsBlockName.value}-${props.direction}`
      );

      return clsName;
    });

    const render = () => {
      const children = getAllElements(slots.default?.(), true).filter((item) => get(item, "type.name") === "Radio");

      return (
        <div class={cls.value} ref={rootRef}>
          {props.type === "button" ? (
            <div
              class={[`${clsBlockName.value}-button-slider`, sliderReady.value && "is-ready"]}
              style={sliderStyle.value}
            />
          ) : null}
          {children.map((child: VNode, index: number) => {
            const radio = cloneVNode(child, {
              // Merge disabled: group or child disabled=true wins
              disabled: !!(props.disabled || child.props?.disabled),
              size: props.size,
              type: props.type,
              modelValue: props.modelValue,
              onChange(e: RadioValue) {
                emit("change", e);
              },
              "onUpdate:modelValue"(e: RadioValue) {
                updateValue(e);
              },
            });

            return h(Fragment, { key: child.key ?? `item-${index}` }, [radio]);
          })}
        </div>
      );
    };

    return render;
  },
});

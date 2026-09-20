<template>
  <bp-trigger
    v-model="isOpen"
    :hideTrigger
    position="bottom-left"
    update-at-scroll
    transition="fade-dropdown"
    :popup-offset="10"
    :disabled
    :class="`${clsBlockName}-trigger`"
  >
    <div :class="cls">
      <div :class="`${clsBlockName}-input-box`">
        <div :class="`${clsBlockName}-input-inner`" :style="_previewStyle"></div>
      </div>
      <span v-if="showValue" :class="`${clsBlockName}-input-value`">{{ model }}</span>
    </div>
    <template #content>
      <div :class="clsBlockName">
        <color-picker ref="colorPickerRef" :hue v-model:saturation="sv.s" v-model:value="sv.v" />

        <div class="option-area">
          <div class="slider">
            <hue-slider ref="hueSliderRef" v-model="hue" :point-color="_color" />
            <alpha-slider ref="alphaSliderRef" v-model="alpha" :point-color="_color" />
          </div>
          <div class="preview-box">
            <div class="preview" :style="_previewStyle"></div>
          </div>
        </div>
        <input-area
          v-model:alpha="alpha"
          :type="valueType"
          :color="_color"
          :hue
          :sv
          :sl
          @update-by-hex="updateByHex"
          @update-by-rgb="updateByRgb"
          @update-alpha="updateAlpha"
        />
      </div>
    </template>
  </bp-trigger>
</template>

<script setup lang="ts">
import { useNamespace } from "@birdpaper-ui/hooks";
import BpTrigger from "@birdpaper-ui/components/trigger/index";
import { colorPickerProps, ColorPickerProps } from "./props";
import colorPicker from "./components/color-picker.vue";
import hueSlider from "./components/hue-slider.vue";
import alphaSlider from "./components/alpha-slider.vue";
import inputArea from "./components/input-area.vue";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { hexToHsla, hslaToHex, hslaToHsv, hslToRgb, hsvToHsla, rgbToHsla } from "./useColor";

defineOptions({ name: "ColorPicker" });
const { clsBlockName } = useNamespace("color-picker");

const model = defineModel<string>({ default: "#165dff" });
const props: ColorPickerProps = defineProps(colorPickerProps);

const isOpen = ref<boolean>(false);
const colorPickerRef = ref();
const hueSliderRef = ref();
const alphaSliderRef = ref();

// Hue (range: 0 to 360)
const hue = ref(0);
// sv (saturation and value in HSV)
const sv = ref({ s: 0, v: 0 });
// sl (saturation and lightness in HSL)
const sl = ref({ s: 0, l: 0 });
// Alpha (range: 0 to 1)
const alpha = ref(1);

const _typeToHslaFun = {
  hex: hexToHsla,
  rgb: rgbToHsla,
};

// Current color value (excluding transparency)
const _color = computed(() => `hsl(${hue.value}, ${sl.value.s}%, ${sl.value.l}%)`);
// Preview color value
const _previewStyle = computed(() => `background: ${_color.value}; opacity:${alpha.value}`);

const cls = computed(() => {
  return {
    [`${clsBlockName.value}-input`]: true,
    [`${clsBlockName.value}-input-${props.size}`]: true,
    [`${clsBlockName.value}-input-${props.shape}`]: true,
    [`${clsBlockName.value}-input-show-value`]: props.showValue,
    [`${clsBlockName.value}-input-disabled`]: props.disabled,
  };
});

const initHsla = (type = props.valueType || "hex", value = model.value) => {
  if (!type || !_typeToHslaFun[type]) return;

  const hsla = _typeToHslaFun[type](value);
  if (!hsla) return;

  const { h, s, l, a } = hsla;
  sl.value = { s, l };
  hue.value = h;
  alpha.value = a;

  initHsv();
};

const initHsv = () => {
  const { s, v } = hslaToHsv(hue.value, sl.value.s, sl.value.l);
  sv.value = { s, v };
};

onMounted(() => {
  nextTick(() => initHsla());
});

const calculateColor = () => {
  const { s, l } = hsvToHsla(hue.value, sv.value.s, sv.value.v, alpha.value);
  sl.value = { s, l };

  if (props.valueType === "hex") {
    model.value = "#" + hslaToHex(`hsla(${hue.value}, ${s}%, ${l}%, ${alpha.value})`);
  } else {
    const [r, g, b] = hslToRgb(hue.value, s, l);
    model.value = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha.value})`;
  }
};

const updateByHex = (val: string) => {
  initHsla("hex", `#${val}`);
  model.value = `#${val}`;
};

const updateByRgb = (rgb: { r: number; g: number; b: number }) => {
  const rgbStr = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha.value})`;

  initHsla("rgb", rgbStr);
  model.value = rgbStr;
};

const updateAlpha = (val: number) => {
  alpha.value = val;
  alphaSliderRef.value.setPosition(alpha.value);
};

watch(
  () => isOpen.value,
  (v) => {
    if (v) {
      nextTick(() => {
        initHsla(props.valueType, model.value);
        colorPickerRef.value.setPosition(sv.value.s, sv.value.v);
        hueSliderRef.value.setPosition(hue.value);
        alphaSliderRef.value.setPosition(alpha.value);
      });
    }
  }
);

watch(
  () => sv.value.s + sv.value.v,
  () => calculateColor()
);
watch(
  () => hue.value,
  () => calculateColor()
);
watch(
  () => alpha.value,
  () => calculateColor()
);

watch(
  () => model.value,
  (v) => {
    if (v) {
      initHsla(props.valueType, v);
    }
  }
);
</script>

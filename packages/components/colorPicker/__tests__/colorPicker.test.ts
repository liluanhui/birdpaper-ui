import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ColorPicker from "../src/color-picker.vue";

describe("ColorPicker", () => {
  it("create", () => {
    const wrapper = mount(ColorPicker);
    expect(wrapper.exists()).toBe(true);
  });

  it("v-model", () => {
    const wrapper = mount(ColorPicker, { props: { modelValue: "#ff0000" } });
    expect(wrapper.props("modelValue")).toBe("#ff0000");
  });

  it("disabled", () => {
    const wrapper = mount(ColorPicker, { props: { disabled: true } });
    expect(wrapper.props("disabled")).toBe(true);
  });

  it("size", () => {
    const wrapper = mount(ColorPicker, { props: { size: "large" } });
    expect(wrapper.props("size")).toBe("large");
  });

  it("shape", () => {
    const wrapper = mount(ColorPicker, { props: { shape: "circle" } });
    expect(wrapper.props("shape")).toBe("circle");
  });

  it("showValue", () => {
    const wrapper = mount(ColorPicker, { props: { showValue: true, modelValue: "#165dff" } });
    expect(wrapper.props("showValue")).toBe(true);
    expect(wrapper.find(".bp-color-picker-input-value").text()).toBe("#165dff");
  });
});

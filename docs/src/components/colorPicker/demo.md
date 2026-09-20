## 基础用法

通过 `v-model` 绑定颜色值，默认为 HEX 格式。

<demo-block src="colorPicker/basic">

<<< @/example/colorPicker/basic.vue

</demo-block>

## 颜色格式

通过 `value-type` 属性设置颜色值格式，支持 `hex`（默认）和 `rgb`。

<demo-block src="colorPicker/type">

<<< @/example/colorPicker/type.vue

</demo-block>

## 尺寸

通过 `size` 属性设置尺寸，支持 `mini`、`small`、`default`、`large`。

<demo-block src="colorPicker/size">

<<< @/example/colorPicker/size.vue

</demo-block>

## 形状

通过 `shape` 控制触发器形状：`square`（圆角矩形，默认）、`circle`（圆形）。

<demo-block src="colorPicker/shape">

<<< @/example/colorPicker/shape.vue

</demo-block>

## 显示色值

开启 `show-value` 后，在触发器旁展示当前颜色值。

<demo-block src="colorPicker/showValue">

<<< @/example/colorPicker/showValue.vue

</demo-block>

## 禁用

通过 `disabled` 属性禁用颜色选择器。

<demo-block src="colorPicker/disabled">

<<< @/example/colorPicker/disabled.vue

</demo-block>

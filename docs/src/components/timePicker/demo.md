## 基础用法

时间选择器的基础用法，通过 `v-model` 绑定时间值，`clearable` 属性可清空。

<demo-block src="timePicker/basic">

<<< @/example/timePicker/basic.vue

</demo-block>

## 尺寸

通过 `size` 属性设置尺寸，支持 `mini`、`small`、`default`、`large`。

<demo-block src="timePicker/size">

<<< @/example/timePicker/size.vue

</demo-block>

## 可清空与禁用

`clearable` 允许清空，`disabled` 禁用选择器。

<demo-block src="timePicker/status">

<<< @/example/timePicker/status.vue

</demo-block>

## 自定义触发器

通过 `#trigger` 插槽自定义触发元素，作用域参数提供 `value` 与 `visible`。

<demo-block src="timePicker/trigger">

<<< @/example/timePicker/trigger.vue

</demo-block>

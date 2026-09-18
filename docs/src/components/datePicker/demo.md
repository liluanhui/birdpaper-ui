## 基础用法

日期选择器的基础用法，通过 `v-model` 绑定日期值。

<demo-block src="datePicker/basic">

<<< @/example/datePicker/basic.vue

</demo-block>

## 日期范围

通过 `date-range-picker` 选择日期范围，绑定值为字符串数组。开启 `show-time` 后可同时选择时间，面板下方展示起止日期/时间，确认后写入；`default-time` 可指定默认起止时刻（默认 `['00:00:00', '23:59:59']`）。

<demo-block src="datePicker/range">

<<< @/example/datePicker/range.vue

</demo-block>

## 选择时间

通过开启 `show-time` 属性以支持时间选择，`value-format` 自定义输出格式。

<demo-block src="datePicker/time">

<<< @/example/datePicker/time.vue

</demo-block>

## 月份与年份

`month-picker` 月份选择器，`year-picker` 年份选择器。

<demo-block src="datePicker/month">

<<< @/example/datePicker/month.vue

</demo-block>

## 仅面板

通过开启 `hide-trigger` 属性直接展示选择面板。

<demo-block src="datePicker/panel">

<<< @/example/datePicker/panel.vue

</demo-block>

## 可清空与禁用

`clearable` 允许清空，`disabled` 禁用选择器，`disabled-date` 禁用指定日期。

<demo-block src="datePicker/status">

<<< @/example/datePicker/status.vue

</demo-block>

## 多语言

通过 `langs` 属性切换语言，支持 `zh-cn`（默认）和 `en`。

<demo-block src="datePicker/langs">

<<< @/example/datePicker/langs.vue

</demo-block>

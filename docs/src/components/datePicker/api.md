<script setup lang="ts">
import { commonPickerProps, datePickerProps, monthPickerProps, yearPickerProps, rangePickerProps, pickerSlots } from "../../example/datePicker/api.ts"
</script>

## 公共属性

<api-block type="prop" :data="commonPickerProps" />

## DatePicker 属性

<api-block type="prop" :data="datePickerProps" />

## MonthPicker 属性

<api-block type="prop" :data="monthPickerProps" />

## YearPicker 属性

<api-block type="prop" :data="yearPickerProps" />

## RangePicker 属性

<api-block type="prop" :data="rangePickerProps" />

## 插槽

DatePicker / DateRangePicker / MonthPicker / YearPicker 共用。

<api-block type="slot" :data="pickerSlots" />

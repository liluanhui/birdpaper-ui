<script setup lang="ts">
import { commonPickerProps, datePickerProps, monthPickerProps, yearPickerProps, rangePickerProps, pickerSlots } from "../../example/datePicker/api.ts"
</script>

## Common Props

<api-block type="prop" :data="commonPickerProps" />

## DatePicker Props

<api-block type="prop" :data="datePickerProps" />

## MonthPicker Props

<api-block type="prop" :data="monthPickerProps" />

## YearPicker Props

<api-block type="prop" :data="yearPickerProps" />

## RangePicker Props

<api-block type="prop" :data="rangePickerProps" />

## Slots

Shared by DatePicker / DateRangePicker / MonthPicker / YearPicker.

<api-block type="slot" :data="pickerSlots" />

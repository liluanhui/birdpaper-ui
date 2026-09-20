# Style Guide

This guide defines Birdpaper UI’s style tokens—typography, size, radius, shadow, spacing, motion, and more—so components stay visually consistent. Every token is exposed as a CSS variable and works with theme customization and dark mode.

---

## Typography

### Font Family

```css
font-family: var(--bp-font-family);
/* Default: */
/* Inter, -apple-system, BlinkMacSystemFont, "PingFang SC",
   "Hiragino Sans GB", "Noto Sans", "Microsoft YaHei",
   "Helvetica Neue", Helvetica, Arial, sans-serif; */
```

Prefer the system font stack for the best rendering and load performance on each platform. Latin text prefers Inter; Chinese falls back to native platform fonts (PingFang SC / Noto Sans / Microsoft YaHei). Component roots always use `--bp-font-family`, so they do not inherit fonts from the host app or docs site.

Override the CSS variable or set `fontFamily` on [ConfigProvider](/components/config/):

```css
:root {
  --bp-font-family: "Helvetica Neue", Arial, sans-serif;
}
```

```ts
app.use(BirdpaperUI, {
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
});
```

### Font Size

The type scale has four levels, from helper text to page titles.

<script setup>
const fontSizeData = [
  { scene: 'Helper text', size: '12px', lineHeight: '1.4', usage: 'Notes, timestamps, tags' },
  { scene: 'Body / form', size: '14px', lineHeight: '1.6', usage: 'Paragraphs, forms, table content' },
  { scene: 'Subtitle', size: '16px', lineHeight: '1.5', usage: 'Card titles, section headings' },
  { scene: 'Title', size: '20px', lineHeight: '1.4', usage: 'Page titles, modal titles' },
]

const fontWeightData = [
  { token: 'Regular', value: '400', usage: 'Body and descriptive text' },
  { token: 'Medium', value: '500', usage: 'Headings and emphasis' },
  { token: 'Semibold', value: '600', usage: 'Page titles and critical information' },
]

const sizeData = [
  { size: 'Mini', variable: '--bp-size-height-mini', height: '22px', fontSize: '12px', padding: '10px', radius: '3px' },
  { size: 'Small', variable: '--bp-size-height-small', height: '28px', fontSize: '13px', padding: '14px', radius: '4px' },
  { size: 'Default', variable: '--bp-size-height-default', height: '32px', fontSize: '14px', padding: '20px', radius: '6px' },
  { size: 'Large', variable: '--bp-size-height-large', height: '36px', fontSize: '14px', padding: '26px', radius: '8px' },
]

const radiusData = [
  { type: 'Small', value: '3px', usage: 'Mini-sized components' },
  { type: 'Default', value: '6px', usage: 'Default-sized components' },
  { type: 'Large', value: '8px', usage: 'Large components, cards, overlays' },
  { type: 'Full', value: '40px', usage: 'Pill buttons, capsule tags' },
]

const shadowData = [
  { level: 'Light', value: '0 2px 8px rgba(0, 0, 0, 0.06)', usage: 'Card hover state' },
  { level: 'Default', value: '0 4px 12px rgba(0, 0, 0, 0.1)', usage: 'Popovers, tooltips' },
  { level: 'Deep', value: '0 4px 16px rgba(0, 0, 0, 0.15)', usage: 'Floating layers, dropdowns' },
]

const spacingData = [
  { token: 'Tight', value: '4px', usage: 'Gap between icon and text' },
  { token: 'Small', value: '8px', usage: 'Inside form fields' },
  { token: 'Medium', value: '12px', usage: 'List item spacing' },
  { token: 'Default', value: '16px', usage: 'Section spacing' },
  { token: 'Large', value: '24px', usage: 'Page region spacing' },
]

const borderData = [
  { scene: 'Inputs, dividers', value: '1px solid var(--bp-gray-2)' },
  { scene: 'Focus', value: '1px solid var(--bp-primary-6)' },
  { scene: 'Error', value: '1px solid var(--bp-danger-6)' },
  { scene: 'Disabled', value: '1px solid var(--bp-gray-3)' },
]

const zIndexData = [
  { variable: '--z-index-base', value: '2000', usage: 'Trigger, Tooltip' },
  { variable: '--z-index-modal', value: '2000', usage: 'Modal dialogs' },
  { variable: '--z-index-drawer', value: '2001', usage: 'Drawer panels' },
  { variable: '--z-index-message', value: '2003', usage: 'Message toasts' },
]

const motionData = [
  { scene: 'Color / opacity', duration: '0.2s', easing: 'ease' },
  { scene: 'Open / close', duration: '0.25s', easing: 'ease-in-out' },
  { scene: 'Layout change', duration: '0.3s', easing: 'ease' },
  { scene: 'Loading spin', duration: '1.2s', easing: 'linear (infinite)' },
]
</script>

<bp-table :data="fontSizeData" row-key="scene">
  <template #columns>
    <bp-table-column title="Context" data-index="scene" />
    <bp-table-column title="Size" data-index="size" />
    <bp-table-column title="Line height" data-index="lineHeight" />
    <bp-table-column title="Typical use" data-index="usage" />
  </template>
</bp-table>

> **Tip**: Keep body text at 14px. Avoid mixing too many size levels on the same page.

### Font Weight

<bp-table :data="fontWeightData" row-key="token">
  <template #columns>
    <bp-table-column title="Token" data-index="token" />
    <bp-table-column title="Value" data-index="value" />
    <bp-table-column title="Usage" data-index="usage" />
  </template>
</bp-table>

> **Tip**: Regular (400) is the default. Use Medium (500) for subtitles and emphasis, and Semibold (600) only for page-level titles and critical information—avoid overusing it.

---

## Size

Components use a four-level size system that controls height, font size, horizontal padding, and radius. Form controls such as Button, Input, and Select all follow this scale.

<bp-table :data="sizeData" row-key="size">
  <template #columns>
    <bp-table-column title="Size" data-index="size" />
    <bp-table-column title="Variable" data-index="variable" />
    <bp-table-column title="Height" data-index="height" />
    <bp-table-column title="Font size" data-index="fontSize" />
    <bp-table-column title="Horizontal padding" data-index="padding" />
    <bp-table-column title="Radius" data-index="radius" />
  </template>
</bp-table>

> **Guideline**: Use one size within a form region. Mini works well for compact table action columns; Large suits standalone primary actions.

---

## Radius

Radius tokens track the size system so components of different sizes keep a consistent visual rhythm.

<bp-table :data="radiusData" row-key="type">
  <template #columns>
    <bp-table-column title="Type" data-index="type" />
    <bp-table-column title="Value" data-index="value" />
    <bp-table-column title="Usage" data-index="usage" />
  </template>
</bp-table>

> **Guideline**: Use 8px for cards and overlays; use 40px for pill-shaped elements such as capsule tags. Don’t mix many radius values on the same page.

---

## Shadow

A layered shadow scale expresses spatial elevation.

<bp-table :data="shadowData" row-key="level">
  <template #columns>
    <bp-table-column title="Level" data-index="level" />
    <bp-table-column title="Value" data-index="value" />
    <bp-table-column title="Usage" data-index="usage" />
  </template>
</bp-table>

> **Guideline**: Use light shadows for hover, default for popovers, and deep for floating layers. Shadow depth should track z-index—higher layers get deeper shadows.

---

## Spacing

Spacing follows a 4px grid so gaps stay predictable and reusable.

<bp-table :data="spacingData" row-key="token">
  <template #columns>
    <bp-table-column title="Token" data-index="token" />
    <bp-table-column title="Value" data-index="value" />
    <bp-table-column title="Typical use" data-index="usage" />
  </template>
</bp-table>

> **Guideline**: Prefer preset spacing tokens over ad-hoc values. Tight (4px) is only for adjacent elements such as icon and text; use Large (24px) between page regions.

---

## Border

Shared border rules keep inputs, dividers, and state feedback visually consistent.

<bp-table :data="borderData" row-key="scene">
  <template #columns>
    <bp-table-column title="Context" data-index="scene" />
    <bp-table-column title="Value" data-index="value" />
  </template>
</bp-table>

> **Guideline**: Use semantic CSS variables for border color so dark mode adapts automatically. Focus borders match the brand color; use the danger border only when form validation fails.

---

## Layering (z-index)

Manage stacking with CSS variables instead of hard-coded values to avoid z-index conflicts.

<bp-table :data="zIndexData" row-key="variable">
  <template #columns>
    <bp-table-column title="Variable" data-index="variable" />
    <bp-table-column title="Value" data-index="value" />
    <bp-table-column title="Usage" data-index="usage" />
  </template>
</bp-table>

> **Guideline**: If your app needs a custom layer, offset from `--z-index-base` (for example `calc(var(--z-index-base) + 10)`) instead of using magic numbers.

---

## Motion

Shared durations and easing curves keep interaction feedback feeling consistent.

<bp-table :data="motionData" row-key="scene">
  <template #columns>
    <bp-table-column title="Context" data-index="scene" />
    <bp-table-column title="Duration" data-index="duration" />
    <bp-table-column title="Easing" data-index="easing" />
  </template>
</bp-table>

> **Guideline**: Use ease-in-out for open/close motions and ease for fade-outs. Keep transitions at or under 0.3s so the UI stays responsive.

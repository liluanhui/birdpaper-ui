# Global Config — ConfigProvider

Birdpaper UI exposes global configuration through `ConfigProvider`. You can customize component prefix, namespace, locale, size, z-index, and more. Child components inherit these settings automatically.

## Basic Usage

### Configure at Install Time

Pass a config object to `app.use()` so components register and receive global config:

```ts
import { createApp } from "vue";
import BirdpaperUI from "birdpaper-ui";
import "birdpaper-ui/theme/index.css";

const app = createApp(App);

app.use(BirdpaperUI, {
  prefix: "Bp", // Component register prefix
  namespace: "bp", // CSS namespace
  locale: "zh-CN", // Locale
  size: "default", // Global size
  zIndex: 3000, // Overlay base z-index
  emptyText: "No data", // Empty-state copy
  fontFamily: undefined, // Optional override for --bp-font-family
});
```

### Configure at Runtime

Call `provideGlobalConfig` in setup to update global config dynamically:

```vue
<script setup>
import { provideGlobalConfig } from "birdpaper-ui";

provideGlobalConfig({
  locale: "en",
  size: "small",
});
</script>
```

## Options

<script setup>
const optionData = [
  { prop: 'prefix', type: 'string', default: '"Bp"', desc: 'Global register name prefix. With "My", Button registers as <MyButton>' },
  { prop: 'namespace', type: 'string', default: '"bp"', desc: 'CSS class namespace; prefixes all BEM class names (e.g. bp-button)' },
  { prop: 'locale', type: 'string', default: '"zh-CN"', desc: 'Global locale code; affects built-in copy in DatePicker, TimePicker, Pagination, and similar components' },
  { prop: 'size', type: 'ComponentSize', default: '"default"', desc: 'Default size for form controls such as Input, Select, and Button. Values: mini / small / default / large' },
  { prop: 'zIndex', type: 'number', default: '3000', desc: 'Base z-index for overlays (Modal, Drawer, Tooltip, Message)' },
  { prop: 'emptyText', type: 'string', default: '"No data"', desc: 'Default empty-state text for Table, Select, and similar components' },
  { prop: 'fontFamily', type: 'string', default: '—', desc: 'Global font-family; writes --bp-font-family on :root. Omit to use the built-in system font stack' },
]

const sizeData = [
  { value: 'mini', height: '22px', fontSize: '12px', use: 'Compact table cells, tag bars' },
  { value: 'small', height: '28px', fontSize: '13px', use: 'Dense forms, dialogs' },
  { value: 'default', height: '32px', fontSize: '14px', use: 'General use (default)' },
  { value: 'large', height: '36px', fontSize: '14px', use: 'Emphasis, standalone form pages' },
]

const zIndexData = [
  { component: 'Modal', zIndex: 'zIndex' },
  { component: 'Drawer', zIndex: 'zIndex + 1' },
  { component: 'Tooltip', zIndex: 'zIndex' },
  { component: 'Message', zIndex: 'zIndex + 3' },
]
</script>

<bp-table :data="optionData" row-key="prop">
  <template #columns>
    <bp-table-column title="Property" data-index="prop" />
    <bp-table-column title="Type" data-index="type" />
    <bp-table-column title="Default" data-index="default" />
    <bp-table-column title="Description" data-index="desc" />
  </template>
</bp-table>

### ComponentSize Type

```ts
type ComponentSize = "mini" | "small" | "default" | "large";
```

<bp-table :data="sizeData" row-key="value">
  <template #columns>
    <bp-table-column title="Value" data-index="value" />
    <bp-table-column title="Height" data-index="height" />
    <bp-table-column title="Font size" data-index="fontSize" />
    <bp-table-column title="Typical use" data-index="use" />
  </template>
</bp-table>

## Priority

Component props always win over global config:

```
Component prop > ConfigProvider global config > Component default
```

```vue
<template>
  <!-- Global size is small -->
  <bp-config-provider :config="{ size: 'small' }">
    <!-- ✅ Uses small (inherits global) -->
    <bp-input placeholder="Inherits global size" />

    <!-- ✅ Uses large (prop wins) -->
    <bp-input size="large" placeholder="Local override" />
  </bp-config-provider>
</template>
```

## Namespace

Change `namespace` to customize the CSS class prefix for every component—useful when multiple libraries share a page:

```ts
app.use(BirdpaperUI, { namespace: "my-ui" });
```

```html
<!-- Default -->
<button class="bp-button">...</button>

<!-- Custom -->
<button class="my-ui-button">...</button>
```

## Component Register Prefix

Change `prefix` to customize globally registered component names:

```ts
app.use(BirdpaperUI, { prefix: "My" });
```

```html
<!-- Default -->
<BpButton>Click</BpButton>

<!-- Custom -->
<MyButton>Click</MyButton>
```

## z-index Management

When several overlays share a page, set `zIndex` to control stacking from one base value:

```ts
app.use(BirdpaperUI, { zIndex: 3000 });
```

Offsets from the base:

<bp-table :data="zIndexData" row-key="component">
  <template #columns>
    <bp-table-column title="Component" data-index="component" />
    <bp-table-column title="z-index" data-index="zIndex" />
  </template>
</bp-table>

## Font Family

Components use the CSS variable `--bp-font-family` (built-in system font stack) and do not inherit fonts from the host app or docs site. Override via config or CSS:

```ts
app.use(BirdpaperUI, {
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
});
```

```vue
<bp-config-provider font-family='"Helvetica Neue", Arial, sans-serif'>
  <App />
</bp-config-provider>
```

```css
:root {
  --bp-font-family: "Helvetica Neue", Arial, sans-serif;
}
```

## Consuming Global Config in Components

Component authors can read global config with `useGlobalConfig`:

```vue
<script setup>
import { useGlobalConfig } from "@birdpaper-ui/hooks";

const { size, locale, zIndex, emptyText, fontFamily } = useGlobalConfig();

// Prefer component prop, fall back to global
const finalSize = computed(() => props.size || size.value);
</script>
```

## TypeScript

```ts
import type { ConfigProviderContext, ComponentSize } from "birdpaper-ui";

const config: ConfigProviderContext = {
  prefix: "Bp",
  namespace: "bp",
  locale: "zh-CN",
  size: "default",
  zIndex: 3000,
  emptyText: "No data",
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
};
```

All options are optional; unset fields use their defaults.

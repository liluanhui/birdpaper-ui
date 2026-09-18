# Theming

Birdpaper UI themes are driven by **CSS variables**. After importing styles, override variables in your app to change brand colors, sizes, radii, and overlay stacking. Dark mode is toggled with the `.dark` class on the root node.

> **Note**: `ConfigProvider` / `app.use` handle runtime options such as prefix, default size, locale, and `zIndex`. They do **not** change colors. Override visual tokens with the approaches in this guide.

## Import Styles

Full import (recommended to start):

```ts
import "birdpaper-ui/theme/index.css";
```

On-demand component styles:

```ts
import "birdpaper-ui/theme/button.css";
import "birdpaper-ui/theme/input.css";
```

See [Installation](/develop/install/) for install and on-demand options.

## Override Brand Colors

Semantic scales use `--bp-{primary|success|warning|danger}-{1..10}`. The main brand color is usually step **6**. When changing the brand color, override at least the main step and nearby steps so hover and light backgrounds stay coherent:

```css
:root {
  --bp-primary-4: #6aa1ff;
  --bp-primary-5: #4080ff;
  --bp-primary-6: #165dff; /* Primary */
  --bp-primary-7: #0e42d2;

  /* If you use rgba(var(--bp-*-rgb), a), override the RGB channels too */
  --bp-primary-6-rgb: 22, 93, 255;
}
```

Transparency example:

```css
.my-tag {
  color: var(--bp-primary-6);
  background: rgba(var(--bp-primary-6-rgb), 0.1);
}
```

See [Colors](/design/color/) for the full palette and scale usage.

## Size and Radius

Component sizes rely on `--bp-size-*` tokens (`mini` / `small` / `default` / `large`):

<script setup>
const sizeTokenData = [
  { token: '--bp-size-height-*', mini: '22px', small: '28px', default: '32px', large: '36px' },
  { token: '--bp-size-font-size-*', mini: '12px', small: '13px', default: '14px', large: '14px' },
  { token: '--bp-size-padding-*', mini: '10px', small: '14px', default: '20px', large: '26px' },
  { token: '--bp-size-border-radius-*', mini: '3px', small: '4px', default: '6px', large: '8px' },
]

const configRelationData = [
  { capability: 'Brand / neutral colors, radius, height, and other visual tokens', method: 'Override CSS variables (this guide)' },
  { capability: 'Dark mode', method: 'Root .dark class' },
  { capability: 'Default size, locale, register prefix, zIndex, empty-state copy, font family', method: 'app.use / ConfigProvider' },
]
</script>

<bp-table :data="sizeTokenData" row-key="token">
  <template #columns>
    <bp-table-column title="Token" data-index="token" />
    <bp-table-column title="mini" data-index="mini" />
    <bp-table-column title="small" data-index="small" />
    <bp-table-column title="default" data-index="default" />
    <bp-table-column title="large" data-index="large" />
  </template>
</bp-table>

Example: bump default height and radius everywhere:

```css
:root {
  --bp-size-height-default: 36px;
  --bp-size-border-radius-default: 8px;
  --bp-size-padding-default: 24px;
}
```

You can also inject a global default size (affects components that do not pass `size` themselves):

```ts
import BirdpaperUI from "birdpaper-ui";

app.use(BirdpaperUI, { size: "small" });
```

```vue
<template>
  <bp-config-provider size="small">
    <App />
  </bp-config-provider>
</template>
```

## Overlay z-index

Overlay components (Modal, Drawer, Tooltip, Message, and similar) derive from `--z-index-base` (default **3000**):

```css
:root {
  --z-index-base: 4000; /* Raising this lifts derived layers too */
}
```

You can also set runtime `zIndex` on install or `ConfigProvider` (works with the variable; default is also `3000`):

```ts
app.use(BirdpaperUI, { zIndex: 4000 });
```

## Dark Mode

Add or remove **`.dark`** on the root node (usually `html`) to toggle. Under `.dark`, semantic variables such as `--bp-primary-6` map to the dark palette, so app code can keep using `var(--bp-primary-6)`.

```js
// Enable dark mode
document.documentElement.classList.add("dark");

// Disable dark mode
document.documentElement.classList.remove("dark");

// Or toggle
document.documentElement.classList.toggle("dark");
```

Persist preference and follow the system:

```js
const KEY = "bp-color-scheme";

export const setDark = (enabled) => {
  document.documentElement.classList.toggle("dark", enabled);
  localStorage.setItem(KEY, enabled ? "dark" : "light");
};

export const initColorScheme = () => {
  const saved = localStorage.getItem(KEY);
  if (saved === "dark" || saved === "light") {
    setDark(saved === "dark");
    return;
  }
  setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
};
```

To change the brand color only in dark mode, override the dark palette or the mapped variables:

```css
.dark {
  --bp-primary-dark-6: #689fff;
  /* or directly */
  --bp-primary-6: #689fff;
  --bp-primary-6-rgb: 104, 159, 255;
}
```

See [Dark Mode](/design/dark/) for scale direction, neutral mapping, and adaptation guidelines.

## Relation to ConfigProvider

<bp-table :data="configRelationData" row-key="capability">
  <template #columns>
    <bp-table-column title="Capability" data-index="capability" />
    <bp-table-column title="Approach" data-index="method" />
  </template>
</bp-table>

Do not expect to pass a full theme object through ConfigProvider—that API is not available in the current version. See [Global Config](/components/config/).

## Advanced: Recompile SCSS

To change the BEM namespace (default `bp`) or customize SCSS variables from source, recompile theme sources from the package and import the rebuilt CSS. Changing only `ConfigProvider`'s `namespace` does **not** rewrite published CSS selectors or `--bp-*` variable names, which easily breaks styles.

For a token and style overview, see [Design Resources](/design/resource/). For spacing, type scale, and related conventions, see the [Style Guide](/design/guide/).

## References

- [Colors](/design/color/) — Functional and neutral palettes
- [Dark Mode](/design/dark/) — Dark mapping and adaptation rules
- [Style Guide](/design/guide/) — Design-side conventions
- [Global Config](/components/config/) — ConfigProvider API
- [Installation](/develop/install/) — How to import styles

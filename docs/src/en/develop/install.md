# Installation

## Requirements

- **Node.js** >= 18
- **Vue** >= 3.5.0
- **pnpm** is recommended as the package manager

## Install with a Package Manager

::: code-group

```sh [pnpm]
pnpm add birdpaper-ui
```

```sh [npm]
npm install birdpaper-ui
```

```sh [yarn]
yarn add birdpaper-ui
```

:::

## Full Import

If bundle size is not a concern, import all components and styles at once.

```ts
// main.ts
import { createApp } from "vue";
import BirdpaperUI from "birdpaper-ui";
import "birdpaper-ui/theme/index.css";

import App from "./App.vue";

const app = createApp(App);
app.use(BirdpaperUI);
app.mount("#app");
```

After installation, you can use every component in your templates:

```vue
<template>
  <bp-button type="primary">Hello Birdpaper</bp-button>
</template>
```

### Full Import with Global Config

```ts
app.use(BirdpaperUI, {
  prefix: "Bp",        // Component prefix, default "Bp"
  namespace: "bp",     // CSS namespace, default "bp"
  locale: "zh-CN",     // Locale, default "zh-CN"
  size: "default",     // Global size, default "default"
  zIndex: 3000,        // Overlay base z-index, default 3000
  emptyText: "No data", // Empty-state copy
  // fontFamily: "..." // Optional override for component font
});
```

See [Global Config](/components/config/).

## On-demand Import

When bundle size matters, import individual components and rely on your bundler's tree-shaking.

### Basic Usage

```vue
<script setup lang="ts">
import { Button, Input, Select } from "birdpaper-ui";
import "birdpaper-ui/theme/button.css";
import "birdpaper-ui/theme/input.css";
import "birdpaper-ui/theme/select.css";
</script>

<template>
  <bp-button>Button</bp-button>
  <bp-input placeholder="Please enter" />
</template>
```

### Import from Subpackages (Finer Tree-shaking)

```ts
// Import from the components subpackage (recommended)
import Button from "@birdpaper-ui/components/button";
import Input from "@birdpaper-ui/components/input";
import Select from "@birdpaper-ui/components/select";
```

## Styles

### Full Stylesheet

```ts
import "birdpaper-ui/theme/index.css";
```

### Per-component Styles

```ts
import "birdpaper-ui/theme/button.css";
import "birdpaper-ui/theme/input.css";
```

### Via UnoCSS (Recommended)

The package ships with an UnoCSS preset, so you can use atomic utility classes after install:

```ts
// uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  // birdpaper-ui includes an UnoCSS reset
});
```

## TypeScript and IDE

After a full `app.use(BirdpaperUI)`, the Vue language service needs global component types so `bp-*` tags get completions, highlighting, and go-to-definition.

### 1. Reference Global Types (Required)

Add this to your existing `env.d.ts` / `src/vite-env.d.ts`:

```ts
/// <reference types="birdpaper-ui/global" />
```

Make sure that file is covered by `tsconfig.json` `include`, for example:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve"
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue"]
}
```

Do not set `compilerOptions.types` to only `["vite/client"]` and omit the global declarations—once `types` is set, only listed packages are loaded. If you already use `types`, prefer:

```json
{
  "compilerOptions": {
    "types": ["vite/client", "birdpaper-ui/global"]
  }
}
```

### 2. Use the Official Vue Language Service

In VS Code / Cursor, install and enable **Vue - Official** (Volar) and disable Vetur. Restart the editor or run “Vue: Restart Vue Server”.

JetBrains IDEs read the package `web-types.json` and can jump to the matching docs page.

### 3. Go-to-definition with On-demand Import

After an explicit import in `<script setup>`, the tag binds to that component's types, and **Go to Definition** opens the `birdpaper-ui` `.d.ts`:

```vue
<script setup lang="ts">
import { Button } from "birdpaper-ui";
</script>

<template>
  <Button type="primary">Button</Button>
</template>
```

Globally registered `<bp-button>` depends on the `global` reference in step 1. Without it, the tag is treated as an unknown custom element—no highlighting, incomplete prop hints, and no navigation.

### 4. Custom Prefix

`global.d.ts` declares the default `Bp` / `bp-` prefix. If you change `prefix` in `app.use`, extend `GlobalComponents` yourself, or keep the default prefix.

## Compatibility

<script setup>
const compatData = [
  { env: 'Modern browsers (Chrome 87+, Firefox 78+, Safari 14+, Edge 88+)', support: '✅' },
  { env: 'Node.js >= 18', support: '✅' },
  { env: 'Vue 3.5+', support: '✅' },
  { env: 'TypeScript 4.7+', support: '✅' },
  { env: 'SSR (Nuxt 3)', support: '✅' },
]
</script>

<bp-table :data="compatData" row-key="env">
  <template #columns>
    <bp-table-column title="Environment" data-index="env" />
    <bp-table-column title="Supported" data-index="support" />
  </template>
</bp-table>

## Next Steps

- [Quick Start](/develop/start/) — Learn the basics
- [Global Config](/components/config/) — Customize prefix, size, locale, and more
- [Component Catalog](/components/catalog/) — Browse all available components

# 安装

## 环境要求

- **Node.js** >= 18
- **Vue** >= 3.5.0
- 推荐使用 **pnpm** 作为包管理器

## 使用包管理器安装

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

## 完整引入

如果你不在乎打包体积，可以一次性引入所有组件和样式。

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

安装后可以直接在模板中使用所有组件：

```vue
<template>
  <bp-button type="primary">Hello Birdpaper</bp-button>
</template>
```

### 带全局配置引入

```ts
app.use(BirdpaperUI, {
  prefix: "Bp",        // 组件前缀，默认 "Bp"
  namespace: "bp",     // CSS 命名空间，默认 "bp"
  locale: "zh-CN",     // 语言，默认 "zh-CN"
  size: "default",     // 全局尺寸，默认 "default"
  zIndex: 3000,        // 弹出层基准层级，默认 3000
  emptyText: "暂无数据", // 空状态文案
  // fontFamily: "..." // 可选，覆盖组件字体
});
```

详见 [全局配置](/components/config/)。

## 按需引入

如果对打包体积有要求，可以按需引入单个组件。需要配合构建工具的 tree-shaking 使用。

### 基本用法

```vue
<script setup lang="ts">
import { Button, Input, Select } from "birdpaper-ui";
import "birdpaper-ui/theme/button.css";
import "birdpaper-ui/theme/input.css";
import "birdpaper-ui/theme/select.css";
</script>

<template>
  <bp-button>按钮</bp-button>
  <bp-input placeholder="请输入" />
</template>
```

### 从子包直接引入（更精确的 tree-shaking）

```ts
// 从 components 子包引入（推荐）
import Button from "@birdpaper-ui/components/button";
import Input from "@birdpaper-ui/components/input";
import Select from "@birdpaper-ui/components/select";
```

## 引入样式

### 全量引入

```ts
import "birdpaper-ui/theme/index.css";
```

### 按组件引入

```ts
import "birdpaper-ui/theme/button.css";
import "birdpaper-ui/theme/input.css";
```

### 通过 UnoCSS 引入（推荐）

项目已内置 UnoCSS 预设，安装后可直接使用原子化 CSS 工具类：

```ts
// uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  // birdpaper-ui 已内置 UnoCSS reset
});
```

## TypeScript 与 IDE

全量 `app.use(BirdpaperUI)` 后，模板里的 `bp-*` 标签要获得类型提示、高亮和跳转到组件定义，需要让 Vue 语言服务加载全局组件类型。

### 1. 引用全局类型（必做）

在项目已有的 `env.d.ts` / `src/vite-env.d.ts` 中加入：

```ts
/// <reference types="birdpaper-ui/global" />
```

并确认该文件被 `tsconfig.json` 的 `include` 覆盖，例如：

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

不要把 `compilerOptions.types` 只写成 `["vite/client"]` 却漏掉全局声明文件——一旦设置了 `types`，只有列表内的包会生效。若你已经在用 `types`，请改成：

```json
{
  "compilerOptions": {
    "types": ["vite/client", "birdpaper-ui/global"]
  }
}
```

### 2. 使用 Vue 官方语言服务

VS Code / Cursor 请安装并启用 **Vue - Official**（Volar），禁用 Vetur。重启编辑器或执行 “Vue: Restart Vue Server”。

JetBrains IDE 会读取包内的 `web-types.json`，组件可跳转到对应文档页。

### 3. 按需引入时的跳转

在 `<script setup>` 中显式导入后，标签会绑定到该组件的类型，`Go to Definition` 会进入 `birdpaper-ui` 的 `.d.ts`：

```vue
<script setup lang="ts">
import { Button } from "birdpaper-ui";
</script>

<template>
  <Button type="primary">按钮</Button>
</template>
```

全局注册的 `<bp-button>` 依赖第 1 步的 `global` 引用；未引用时会被当成未知自定义标签，因此无高亮、无完整 props 提示、也无法跳转。

### 4. 自定义前缀

`global.d.ts` 按默认前缀 `Bp` / `bp-` 声明。若 `app.use` 改了 `prefix`，需要自行补充 `GlobalComponents`，或继续用默认前缀。

## 兼容性

<script setup>
const compatData = [
  { env: '现代浏览器（Chrome 87+, Firefox 78+, Safari 14+, Edge 88+）', support: '✅' },
  { env: 'Node.js >= 18', support: '✅' },
  { env: 'Vue 3.5+', support: '✅' },
  { env: 'TypeScript 4.7+', support: '✅' },
  { env: 'SSR (Nuxt 3)', support: '✅' },
]
</script>

<bp-table :data="compatData" row-key="env">
  <template #columns>
    <bp-table-column title="环境" data-index="env" />
    <bp-table-column title="支持" data-index="support" />
  </template>
</bp-table>

## 下一步

- [快速上手](/develop/start/) — 了解基本使用方式
- [全局配置](/components/config/) — 自定义组件前缀、尺寸、语言等
- [组件目录](/components/catalog/) — 浏览所有可用组件

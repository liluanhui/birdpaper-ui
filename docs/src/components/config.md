# 全局配置 ConfigProvider

Birdpaper UI 通过 `ConfigProvider` 提供全局配置能力，支持自定义组件前缀、命名空间、国际化、尺寸、层级等参数，所有子组件会自动继承全局配置。

## 基本用法

### 安装时配置

在 `app.use()` 时传入配置对象，所有组件会自动注册并注入全局配置：

```ts
import { createApp } from "vue";
import BirdpaperUI from "birdpaper-ui";
import "birdpaper-ui/theme/index.css";

const app = createApp(App);

app.use(BirdpaperUI, {
  prefix: "Bp", // 组件注册前缀
  namespace: "bp", // CSS 命名空间
  locale: "zh-CN", // 语言
  size: "default", // 全局尺寸
  zIndex: 3000, // 层级基准值
  emptyText: "暂无数据", // 空状态文案
  fontFamily: undefined, // 可选，覆盖 --bp-font-family
});
```

### 运行时配置

在 setup 中调用 `provideGlobalConfig`，可动态修改全局配置：

```vue
<script setup>
import { provideGlobalConfig } from "birdpaper-ui";

provideGlobalConfig({
  locale: "en",
  size: "small",
});
</script>
```

## 配置项

<script setup>
const optionData = [
  { prop: 'prefix', type: 'string', default: '"Bp"', desc: '组件全局注册名称前缀。设为 "My" 后，Button 注册为 <MyButton>' },
  { prop: 'namespace', type: 'string', default: '"bp"', desc: 'CSS 类名命名空间，影响所有组件的 BEM 类名前缀（如 bp-button）' },
  { prop: 'locale', type: 'string', default: '"zh-CN"', desc: '全局语言代码，影响 DatePicker、TimePicker、Pagination 等组件的内部文案' },
  { prop: 'size', type: 'ComponentSize', default: '"default"', desc: '全局默认尺寸，影响 Input、Select、Button 等表单类组件。可选值：mini / small / default / large' },
  { prop: 'zIndex', type: 'number', default: '3000', desc: '弹出层组件（Modal、Drawer、Tooltip、Message）的 z-index 基准值' },
  { prop: 'emptyText', type: 'string', default: '"暂无数据"', desc: 'Table、Select 等组件的空状态默认文案' },
  { prop: 'fontFamily', type: 'string', default: '—', desc: '全局字体，写入 :root 的 --bp-font-family；未设置时使用主题内置系统字体栈' },
]

const sizeData = [
  { value: 'mini', height: '22px', fontSize: '12px', use: '紧凑型表格内嵌、标签栏' },
  { value: 'small', height: '28px', fontSize: '13px', use: '密度较高的表单、弹窗内' },
  { value: 'default', height: '32px', fontSize: '14px', use: '通用场景（默认）' },
  { value: 'large', height: '36px', fontSize: '14px', use: '突出展示、独立表单页' },
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
    <bp-table-column title="属性" data-index="prop" />
    <bp-table-column title="类型" data-index="type" />
    <bp-table-column title="默认值" data-index="default" />
    <bp-table-column title="说明" data-index="desc" />
  </template>
</bp-table>

### ComponentSize 类型

```ts
type ComponentSize = "mini" | "small" | "default" | "large";
```

<bp-table :data="sizeData" row-key="value">
  <template #columns>
    <bp-table-column title="值" data-index="value" />
    <bp-table-column title="高度" data-index="height" />
    <bp-table-column title="字号" data-index="fontSize" />
    <bp-table-column title="适用场景" data-index="use" />
  </template>
</bp-table>

## 配置优先级

组件自身 prop 始终优先于全局配置：

```
组件 prop > ConfigProvider 全局配置 > 组件默认值
```

```vue
<template>
  <!-- 全局设为 small -->
  <bp-config-provider :config="{ size: 'small' }">
    <!-- ✅ 使用 small（继承全局） -->
    <bp-input placeholder="继承全局尺寸" />

    <!-- ✅ 使用 large（prop 优先） -->
    <bp-input size="large" placeholder="局部覆盖" />
  </bp-config-provider>
</template>
```

## 命名空间

修改 `namespace` 可自定义所有组件的 CSS 类名前缀，适用于多组件库共存避免样式冲突：

```ts
app.use(BirdpaperUI, { namespace: "my-ui" });
```

```html
<!-- 默认输出 -->
<button class="bp-button">...</button>

<!-- 自定义后 -->
<button class="my-ui-button">...</button>
```

## 组件注册前缀

修改 `prefix` 可自定义全局注册的组件名称：

```ts
app.use(BirdpaperUI, { prefix: "My" });
```

```html
<!-- 默认 -->
<BpButton>Click</BpButton>

<!-- 自定义后 -->
<MyButton>Click</MyButton>
```

## z-index 管理

当页面中同时存在多个弹出层组件时，可通过 `zIndex` 统一管理层级关系：

```ts
app.use(BirdpaperUI, { zIndex: 3000 });
```

各组件基于基准值的偏移：

<bp-table :data="zIndexData" row-key="component">
  <template #columns>
    <bp-table-column title="组件" data-index="component" />
    <bp-table-column title="z-index 计算" data-index="zIndex" />
  </template>
</bp-table>

## 字体

组件统一使用 CSS 变量 `--bp-font-family`（默认系统字体栈），不会继承业务页或文档站字体。可通过配置项或变量覆盖：

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

## 在组件中消费全局配置

组件开发者可通过 `useGlobalConfig` 获取全局配置：

```vue
<script setup>
import { useGlobalConfig } from "@birdpaper-ui/hooks";

const { size, locale, zIndex, emptyText, fontFamily } = useGlobalConfig();

// 组件 prop 优先，回退到全局值
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
  emptyText: "暂无数据",
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
};
```

所有配置项均为可选，未设置的项使用默认值。

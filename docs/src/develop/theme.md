# 定制主题

Birdpaper UI 的主题基于 **CSS 变量**。引入样式后，在应用侧覆盖变量即可改品牌色、尺寸、圆角与弹出层级；深色模式通过根节点的 `.dark` 类切换。

> **说明**：`ConfigProvider` / `app.use` 负责前缀、默认尺寸、语言、`zIndex` 等运行时配置，**不能**直接改颜色。颜色与视觉令牌请用本文方式覆盖。

## 引入样式

全量引入（推荐起步）：

```ts
import "birdpaper-ui/theme/index.css";
```

按需引入组件样式：

```ts
import "birdpaper-ui/theme/button.css";
import "birdpaper-ui/theme/input.css";
```

安装与按需方案详见 [安装](/develop/install/)。

## 覆盖品牌色

语义色阶为 `--bp-{primary|success|warning|danger}-{1..10}`，主色一般为第 **6** 阶。改品牌色时至少覆盖主色及相邻阶，保证 hover / 浅底等仍协调：

```css
:root {
  --bp-primary-4: #6aa1ff;
  --bp-primary-5: #4080ff;
  --bp-primary-6: #165dff; /* 主色 */
  --bp-primary-7: #0e42d2;

  /* 若使用 rgba(var(--bp-*-rgb), a)，请同步覆盖 RGB 通道 */
  --bp-primary-6-rgb: 22, 93, 255;
}
```

透明度场景：

```css
.my-tag {
  color: var(--bp-primary-6);
  background: rgba(var(--bp-primary-6-rgb), 0.1);
}
```

完整色板与色阶用途见 [色彩](/design/color/)。

## 尺寸与圆角

组件尺寸依赖 `--bp-size-*` 变量（`mini` / `small` / `default` / `large`）：

<script setup>
const sizeTokenData = [
  { token: '--bp-size-height-*', mini: '22px', small: '28px', default: '32px', large: '36px' },
  { token: '--bp-size-font-size-*', mini: '12px', small: '13px', default: '14px', large: '14px' },
  { token: '--bp-size-padding-*', mini: '10px', small: '14px', default: '20px', large: '26px' },
  { token: '--bp-size-border-radius-*', mini: '3px', small: '4px', default: '6px', large: '8px' },
]

const configRelationData = [
  { capability: '品牌色 / 中性色 / 圆角高度等视觉令牌', method: '覆盖 CSS 变量（本文）' },
  { capability: '深色模式', method: '根节点 .dark 类' },
  { capability: '默认组件尺寸、语言、注册前缀、zIndex、空状态文案、字体', method: 'app.use / ConfigProvider' },
]
</script>

<bp-table :data="sizeTokenData" row-key="token">
  <template #columns>
    <bp-table-column title="变量" data-index="token" />
    <bp-table-column title="mini" data-index="mini" />
    <bp-table-column title="small" data-index="small" />
    <bp-table-column title="default" data-index="default" />
    <bp-table-column title="large" data-index="large" />
  </template>
</bp-table>

示例：统一加大默认高度与圆角：

```css
:root {
  --bp-size-height-default: 36px;
  --bp-size-border-radius-default: 8px;
  --bp-size-padding-default: 24px;
}
```

全局默认尺寸还可通过配置注入（影响未单独传 `size` 的组件）：

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

## 弹出层层级

弹出类组件（Modal、Drawer、Tooltip、Message 等）基于 `--z-index-base`（默认 **3000**）派生：

```css
:root {
  --z-index-base: 4000; /* 提高后，派生层级一并上移 */
}
```

也可在安装或 `ConfigProvider` 上设置运行时 `zIndex`（与变量配合使用，默认同样为 `3000`）：

```ts
app.use(BirdpaperUI, { zIndex: 4000 });
```

## 深色模式

在根节点（通常是 `html`）添加 / 移除 **`.dark`** 即可切换。`.dark` 下会将 `--bp-primary-6` 等语义变量映射到深色色板，业务继续写 `var(--bp-primary-6)` 即可。

```js
// 开启深色
document.documentElement.classList.add("dark");

// 关闭深色
document.documentElement.classList.remove("dark");

// 或切换
document.documentElement.classList.toggle("dark");
```

持久化与跟随系统偏好：

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

深色下单独改品牌色，可覆盖 dark 色板或直接覆盖映射后的变量：

```css
.dark {
  --bp-primary-dark-6: #689fff;
  /* 或直接 */
  --bp-primary-6: #689fff;
  --bp-primary-6-rgb: 104, 159, 255;
}
```

色阶方向、中性色映射与适配规范见 [深色模式](/design/dark/)。

## 与 ConfigProvider 的关系

<bp-table :data="configRelationData" row-key="capability">
  <template #columns>
    <bp-table-column title="能力" data-index="capability" />
    <bp-table-column title="方式" data-index="method" />
  </template>
</bp-table>

不要期望通过 ConfigProvider 传入一整套 theme 对象来换肤——当前版本未提供该 API。详见 [全局配置](/components/config/)。

## 进阶：SCSS 重编译

若需要改写 BEM 命名空间（默认 `bp`）或从源码定制 SCSS 变量，需基于包内主题源码重新编译后再引入。仅改 `ConfigProvider` 的 `namespace` **不会**自动改已发布的 CSS 选择器与 `--bp-*` 变量名，容易导致样式错位。

设计令牌与样式资源总览见 [设计资源](/design/resource/)；间距、字号等设计约定见 [样式指南](/design/guide/)。

## 参考

- [色彩](/design/color/) — 功能色 / 中性色色板
- [深色模式](/design/dark/) — 深色映射与适配规范
- [样式指南](/design/guide/) — 设计侧规范
- [全局配置](/components/config/) — ConfigProvider API
- [安装](/develop/install/) — 样式引入方式

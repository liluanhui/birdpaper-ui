# 样式指南

本文档定义了 Birdpaper UI 的样式规范，涵盖字体、尺寸、圆角、阴影、间距、动效等基础 Token，确保组件间的视觉一致性。所有 Token 均以 CSS 变量形式提供，支持主题定制和深色模式适配。

---

## 字体

### 字体族

```css
font-family: var(--bp-font-family);
/* 默认值： */
/* Inter, -apple-system, BlinkMacSystemFont, "PingFang SC",
   "Hiragino Sans GB", "Noto Sans", "Microsoft YaHei",
   "Helvetica Neue", Helvetica, Arial, sans-serif; */
```

优先使用系统字体栈（System Font Stack），保证各平台最佳的渲染效果和加载性能。西文优先使用 Inter，中文回退到各平台原生字体（PingFang SC / Noto Sans / Microsoft YaHei）。组件根节点统一使用 `--bp-font-family`，避免继承业务页或文档站字体。

可通过覆盖 CSS 变量或 [ConfigProvider](/components/config/) 的 `fontFamily` 自定义：

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

### 字号

字号体系提供 4 个层级，覆盖从辅助文本到大标题的完整场景。

<script setup>
const fontSizeData = [
  { scene: '辅助文本', size: '12px', lineHeight: '1.4', usage: '注释、时间戳、标签' },
  { scene: '正文 / 表单', size: '14px', lineHeight: '1.6', usage: '段落、表单、表格内容' },
  { scene: '小标题', size: '16px', lineHeight: '1.5', usage: '卡片标题、区块标题' },
  { scene: '大标题', size: '20px', lineHeight: '1.4', usage: '页面标题、弹窗标题' },
]

const fontWeightData = [
  { token: 'Regular', value: '400', usage: '正文、描述文本' },
  { token: 'Medium', value: '500', usage: '标题、强调文本' },
  { token: 'Semibold', value: '600', usage: '大标题、关键信息' },
]

const sizeData = [
  { size: 'Mini', variable: '--bp-size-height-mini', height: '22px', fontSize: '12px', padding: '10px', radius: '3px' },
  { size: 'Small', variable: '--bp-size-height-small', height: '28px', fontSize: '13px', padding: '14px', radius: '4px' },
  { size: 'Default', variable: '--bp-size-height-default', height: '32px', fontSize: '14px', padding: '20px', radius: '6px' },
  { size: 'Large', variable: '--bp-size-height-large', height: '36px', fontSize: '14px', padding: '26px', radius: '8px' },
]

const radiusData = [
  { type: '小圆角', value: '3px', usage: 'Mini 尺寸组件' },
  { type: '默认圆角', value: '6px', usage: 'Default 尺寸组件' },
  { type: '大圆角', value: '8px', usage: 'Large 尺寸组件、卡片、弹层' },
  { type: '全圆角', value: '40px', usage: 'Pill 形按钮、胶囊标签' },
]

const shadowData = [
  { level: '浅阴影', value: '0 2px 8px rgba(0, 0, 0, 0.06)', usage: '卡片 hover 态' },
  { level: '默认阴影', value: '0 4px 12px rgba(0, 0, 0, 0.1)', usage: '弹出层、气泡' },
  { level: '深阴影', value: '0 4px 16px rgba(0, 0, 0, 0.15)', usage: '浮层、下拉菜单' },
]

const spacingData = [
  { token: '紧凑', value: '4px', usage: '图标与文字间距' },
  { token: '小间距', value: '8px', usage: '表单项内部' },
  { token: '中间距', value: '12px', usage: '列表项间距' },
  { token: '默认间距', value: '16px', usage: '区块间距' },
  { token: '大间距', value: '24px', usage: '页面区域间距' },
]

const borderData = [
  { scene: '输入框、分割线', value: '1px solid var(--bp-gray-2)' },
  { scene: '聚焦态', value: '1px solid var(--bp-primary-6)' },
  { scene: '错误态', value: '1px solid var(--bp-danger-6)' },
  { scene: '禁用态', value: '1px solid var(--bp-gray-3)' },
]

const zIndexData = [
  { variable: '--z-index-base', value: '2000', usage: 'Trigger、Tooltip' },
  { variable: '--z-index-modal', value: '2000', usage: 'Modal 对话框' },
  { variable: '--z-index-drawer', value: '2001', usage: 'Drawer 抽屉' },
  { variable: '--z-index-message', value: '2003', usage: 'Message 消息提示' },
]

const motionData = [
  { scene: '颜色 / 透明度变化', duration: '0.2s', easing: 'ease' },
  { scene: '弹出 / 收起', duration: '0.25s', easing: 'ease-in-out' },
  { scene: '布局变化', duration: '0.3s', easing: 'ease' },
  { scene: '加载旋转', duration: '1.2s', easing: 'linear (infinite)' },
]
</script>

<bp-table :data="fontSizeData" row-key="scene">
  <template #columns>
    <bp-table-column title="场景" data-index="scene" />
    <bp-table-column title="字号" data-index="size" />
    <bp-table-column title="行高" data-index="lineHeight" />
    <bp-table-column title="典型用途" data-index="usage" />
  </template>
</bp-table>

> **提示**：正文统一使用 14px，避免在同一页面混用过多字号层级。

### 字重

<bp-table :data="fontWeightData" row-key="token">
  <template #columns>
    <bp-table-column title="Token" data-index="token" />
    <bp-table-column title="值" data-index="value" />
    <bp-table-column title="用途" data-index="usage" />
  </template>
</bp-table>

> **提示**：Regular（400）为默认字重，Medium（500）用于小标题和强调，Semibold（600）仅用于页面级标题和关键信息，避免过度使用。

---

## 尺寸

组件提供 4 级尺寸体系，影响高度、字号、水平内边距和圆角。Button、Input、Select 等表单类组件均遵循此规范。

<bp-table :data="sizeData" row-key="size">
  <template #columns>
    <bp-table-column title="尺寸" data-index="size" />
    <bp-table-column title="变量名" data-index="variable" />
    <bp-table-column title="高度" data-index="height" />
    <bp-table-column title="字号" data-index="fontSize" />
    <bp-table-column title="水平内边距" data-index="padding" />
    <bp-table-column title="圆角" data-index="radius" />
  </template>
</bp-table>

> **指南**：同一表单区域内统一使用同一尺寸；Mini 适用于紧凑型表格操作列，Large 适用于独立的主操作按钮。

---

## 圆角

圆角与尺寸体系联动，不同尺寸的组件使用对应的圆角值，保持视觉节奏一致。

<bp-table :data="radiusData" row-key="type">
  <template #columns>
    <bp-table-column title="类型" data-index="type" />
    <bp-table-column title="值" data-index="value" />
    <bp-table-column title="用途" data-index="usage" />
  </template>
</bp-table>

> **指南**：卡片和弹层统一使用 8px 大圆角；Pill 形元素（如胶囊标签）使用 40px 全圆角；不要在同一页面混用多种圆角值。

---

## 阴影

分层级的阴影体系，用于表达元素的空间层级关系。

<bp-table :data="shadowData" row-key="level">
  <template #columns>
    <bp-table-column title="层级" data-index="level" />
    <bp-table-column title="值" data-index="value" />
    <bp-table-column title="用途" data-index="usage" />
  </template>
</bp-table>

> **指南**：hover 态使用浅阴影，弹出层使用默认阴影，浮层使用深阴影；阴影层级应与 z-index 层级对应，越高层级使用越深的阴影。

---

## 间距

基于 4px 网格的间距体系，确保元素间的空间关系可预测、可复用。

<bp-table :data="spacingData" row-key="token">
  <template #columns>
    <bp-table-column title="Token" data-index="token" />
    <bp-table-column title="值" data-index="value" />
    <bp-table-column title="典型场景" data-index="usage" />
  </template>
</bp-table>

> **指南**：优先使用预设间距 Token，避免随意使用非标值；紧凑（4px）仅用于图标与文字等紧邻元素；页面区域间使用大间距（24px）分隔。

---

## 边框

统一的边框规范，确保输入框、分割线、状态反馈的视觉一致性。

<bp-table :data="borderData" row-key="scene">
  <template #columns>
    <bp-table-column title="场景" data-index="scene" />
    <bp-table-column title="值" data-index="value" />
  </template>
</bp-table>

> **指南**：边框颜色使用语义化 CSS 变量，深色模式下自动适配；聚焦态边框颜色与品牌色一致；仅在表单校验失败时使用危险色边框。

---

## 层级 (z-index)

使用 CSS 变量统一管理 z-index，避免硬编码数值导致的层叠冲突。

<bp-table :data="zIndexData" row-key="variable">
  <template #columns>
    <bp-table-column title="变量名" data-index="variable" />
    <bp-table-column title="值" data-index="value" />
    <bp-table-column title="用途" data-index="usage" />
  </template>
</bp-table>

> **指南**：业务侧如需自定义层级，建议基于 `--z-index-base` 做偏移（如 `calc(var(--z-index-base) + 10)`），避免直接使用魔数。

---

## 动效

统一的过渡时间和缓动函数，确保交互反馈的节奏感一致。

<bp-table :data="motionData" row-key="scene">
  <template #columns>
    <bp-table-column title="场景" data-index="scene" />
    <bp-table-column title="时长" data-index="duration" />
    <bp-table-column title="缓动" data-index="easing" />
  </template>
</bp-table>

> **指南**：弹出类动效使用 ease-in-out（先慢后快再慢），消隐类动效使用 ease（自然减速）；避免使用超过 0.3s 的过渡时长，保持界面响应感。

<template>
  <div ref="containerRef" :class="['bp-virtual-scroller', containerClass]" @scroll="onScroll">
    <div :style="{ height: totalHeight + 'px', position: 'relative' }">
      <div :style="{ position: 'absolute', top: 0, left: 0, right: 0, transform: `translateY(${offsetY}px)` }">
        <component :is="listTag" :class="listClass">
          <template v-for="item in visibleItems" :key="item[keyField]">
            <slot :item="item" />
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onActivated } from "vue";

interface Props {
  items: any[];
  itemSize?: number;
  keyField?: string;
  listTag?: string;
  listClass?: string;
  containerClass?: string;
  buffer?: number;
}

const props = withDefaults(defineProps<Props>(), {
  itemSize: 32,
  keyField: "id",
  listTag: "div",
  listClass: "",
  containerClass: "",
  buffer: 5,
});

defineExpose({ scrollToItem });

const containerRef = ref<HTMLElement | null>(null);
const containerHeight = ref(300);
const scrollTop = ref(0);

const totalHeight = computed(() => props.items.length * props.itemSize);

const visibleRange = computed(() => {
  const start = Math.max(0, Math.floor(scrollTop.value / props.itemSize) - props.buffer);
  const visibleCount = Math.ceil(containerHeight.value / props.itemSize);
  const end = Math.min(props.items.length, start + visibleCount + props.buffer * 2);
  return { start, end };
});

const visibleItems = computed(() => props.items.slice(visibleRange.value.start, visibleRange.value.end));

const offsetY = computed(() => visibleRange.value.start * props.itemSize);

let rafId = 0;
function onScroll(e: Event) {
  const el = e.target as HTMLElement;
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    scrollTop.value = el.scrollTop;
  });
}

function updateContainerHeight() {
  if (containerRef.value) {
    containerHeight.value = containerRef.value.clientHeight;
  }
}

onMounted(() => {
  updateContainerHeight();
});

onActivated(() => {
  updateContainerHeight();
});

function scrollToItem(itemOrValue: any, smooth = false) {
  const key = props.keyField;
  const idx =
    typeof itemOrValue === "object" && itemOrValue !== null
      ? props.items.indexOf(itemOrValue)
      : props.items.findIndex((it) =>
          typeof it === "object" && it !== null ? it[key] === itemOrValue : it === itemOrValue
        );

  if (idx < 0 || !containerRef.value) return;

  updateContainerHeight();
  const targetTop = idx * props.itemSize;
  const centerOffset = Math.max(0, (containerHeight.value - props.itemSize) / 2);
  containerRef.value.scrollTo({
    top: Math.max(0, targetTop - centerOffset),
    behavior: (smooth ? "smooth" : "auto") as ScrollBehavior,
  });
  scrollTop.value = Math.max(0, targetTop - centerOffset);
}
</script>

<style scoped>
.bp-virtual-scroller {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>

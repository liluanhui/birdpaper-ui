<template>
  <TransitionGroup
    ref="listRef"
    :class="[clsBlockName, `${clsBlockName}--${position}`]"
    :name="transitionName"
    tag="ul"
    role="status"
    aria-live="polite"
    aria-atomic="false"
    :style="{ height: `${listHeight}px` }"
  >
    <message
      v-for="v in filteredList"
      :key="`${v.id}`"
      :id="v.id"
      :style="getItemStyle(v.id)"
      :type="v.type"
      :content="v.content"
      :duration="v.duration"
      :closeable="v.closeable || v.closable"
      :plain="v.plain"
      :on-close="v.onClose"
      @remove="onRemove"
      @size-change="onSizeChange"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useNamespace } from "@birdpaper-ui/hooks";
import { computed, nextTick, onBeforeUnmount, PropType, ref, watch } from "vue";
import { MessageItem, MessagePosition } from "./type";
import message from "./message.vue";

defineOptions({ name: "MessageList" });
const { clsBlockName } = useNamespace("message-list");

const GAP = 14;
const FALLBACK_HEIGHT = 48;

const props = defineProps({
  list: { type: Array as PropType<MessageItem[]>, default: () => [] },
  position: { type: String as PropType<MessagePosition>, default: "top" },
});
const emits = defineEmits<{
  (e: "remove", id?: string): void;
}>();

const listRef = ref();
const heightMap = ref<Record<string, number>>({});
const offsetMap = ref<Record<string, number>>({});
const listHeight = ref(0);
let measureRaf = 0;

const filteredList = computed(() => {
  return props.list.filter((item) => (item.position || "top") === props.position);
});

const transitionName = computed(() => (props.position === "bottom" ? "message-bottom" : "message-top"));

const getItemStyle = (id?: string) => {
  if (!id) return {};
  const offset = offsetMap.value[id] ?? 0;
  if (props.position === "bottom") {
    return { bottom: `${offset}px` };
  }
  return { top: `${offset}px` };
};

const recalcOffsets = () => {
  const list = filteredList.value;
  const nextOffsets: Record<string, number> = {};
  let acc = 0;

  if (props.position === "bottom") {
    for (let i = list.length - 1; i >= 0; i--) {
      const id = list[i].id!;
      nextOffsets[id] = acc;
      acc += (heightMap.value[id] || FALLBACK_HEIGHT) + GAP;
    }
  } else {
    for (let i = 0; i < list.length; i++) {
      const id = list[i].id!;
      nextOffsets[id] = acc;
      acc += (heightMap.value[id] || FALLBACK_HEIGHT) + GAP;
    }
  }

  offsetMap.value = nextOffsets;
  listHeight.value = list.length ? Math.max(acc - GAP, 0) : 0;
};

const measureAndRecalc = () => {
  cancelAnimationFrame(measureRaf);
  measureRaf = requestAnimationFrame(() => {
    const root = listRef.value?.$el as HTMLElement | undefined;
    if (root) {
      const nodes = root.querySelectorAll<HTMLElement>("[data-message-id]");
      nodes.forEach((node) => {
        const id = node.dataset.messageId;
        if (!id) return;
        heightMap.value[id] = node.offsetHeight || FALLBACK_HEIGHT;
      });
    }
    recalcOffsets();
  });
};

const onSizeChange = (id: string, height: number) => {
  if (!id) return;
  heightMap.value[id] = height || FALLBACK_HEIGHT;
  recalcOffsets();
};

watch(
  filteredList,
  async () => {
    await nextTick();
    measureAndRecalc();
  },
  { immediate: true, flush: "post" }
);

onBeforeUnmount(() => {
  cancelAnimationFrame(measureRaf);
});

const onRemove = (id?: string) => {
  if (id) {
    delete heightMap.value[id];
    delete offsetMap.value[id];
  }
  emits("remove", id);
  nextTick(measureAndRecalc);
};
</script>

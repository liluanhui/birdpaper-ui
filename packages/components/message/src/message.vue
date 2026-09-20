<template>
  <li ref="rootRef" :class="[clsName, 'select-none']" :data-message-id="id">
    <span v-if="type !== 'text'" :class="[`${clsBlockName}-icon`, `icon-${type}`]">
      <component :is="iconType[type]" size="18px"></component>
    </span>
    <span :class="`${clsBlockName}-content`">{{ content }}</span>

    <span v-if="isCloseable" :class="`${clsBlockName}-close`" @click="handleClose">
      <IconCloseLine size="14" />
    </span>
  </li>
</template>

<script setup lang="ts">
import { useNamespace } from "@birdpaper-ui/hooks";
import { MessageProps, messageProps } from "./props";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import {
  IconCloseLine,
  IconCheckboxCircleFill,
  IconCloseCircleFill,
  IconErrorWarningFill,
  IconLoader5Line,
} from "birdpaper-icon";

defineOptions({ name: "Message" });
const { clsBlockName } = useNamespace("message");

const props: MessageProps = defineProps(messageProps);
const emits = defineEmits<{
  remove: [id?: string];
  sizeChange: [id: string, height: number];
}>();

const rootRef = ref<HTMLElement>();
let resizeObserver: ResizeObserver | null = null;

const iconType = {
  success: IconCheckboxCircleFill,
  error: IconCloseCircleFill,
  warning: IconErrorWarningFill,
  loading: IconLoader5Line,
};

const statusMap = { text: "gray", loading: "gray", success: "success", warning: "warning", error: "danger" };
const clsName = computed(() => {
  let cls = [clsBlockName.value];
  cls.push(
    props.plain
      ? `${clsBlockName.value}-plain-${statusMap[props.type]}`
      : `${clsBlockName.value}-${statusMap[props.type]}`
  );

  return cls;
});

const isCloseable = computed(() => !!(props.closeable || props.closable));

const emitSize = () => {
  if (!props.id || !rootRef.value) return;
  emits("sizeChange", props.id, rootRef.value.offsetHeight);
};

const timer = ref(0);
const init = () => {
  clearTimer();

  if (props.duration > 0 && props.type !== "loading") {
    timer.value = window.setTimeout(handleClose, props.duration);
  }
};
const clearTimer = () => {
  if (timer.value) {
    window.clearTimeout(timer.value);
    timer.value = 0;
  }
};

const handleClose = () => {
  emits("remove", props.id);
  props.onClose && props.onClose(props.id);
};

onMounted(() => {
  nextTick(() => {
    init();
    emitSize();
    if (typeof ResizeObserver !== "undefined" && rootRef.value) {
      resizeObserver = new ResizeObserver(() => emitSize());
      resizeObserver.observe(rootRef.value);
    }
  });
});

onUnmounted(() => {
  clearTimer();
  resizeObserver?.disconnect();
  resizeObserver = null;
});

watch(
  () => props.content,
  () => {
    init();
    nextTick(emitSize);
  }
);

watch(
  () => props.duration,
  () => init()
);
</script>

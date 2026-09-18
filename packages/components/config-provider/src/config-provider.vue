<template>
  <slot />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { provideGlobalConfig } from "./use-config-provider";
import type { ConfigProviderContext } from "./types";
import type { PartialLocaleMessages } from "@birdpaper-ui/hooks";

defineOptions({ name: "ConfigProvider" });

const props = withDefaults(
  defineProps<{
    prefix?: string;
    namespace?: string;
    locale?: string;
    localeMessages?: PartialLocaleMessages;
    size?: ConfigProviderContext["size"];
    zIndex?: number;
    emptyText?: string;
    fontFamily?: string;
  }>(),
  {}
);

const config = computed<ConfigProviderContext>(() => {
  const next: ConfigProviderContext = {};
  if (props.prefix !== undefined) next.prefix = props.prefix;
  if (props.namespace !== undefined) next.namespace = props.namespace;
  if (props.locale !== undefined) next.locale = props.locale;
  if (props.localeMessages !== undefined) next.localeMessages = props.localeMessages;
  if (props.size !== undefined) next.size = props.size;
  if (props.zIndex !== undefined) next.zIndex = props.zIndex;
  if (props.emptyText !== undefined) next.emptyText = props.emptyText;
  if (props.fontFamily !== undefined) next.fontFamily = props.fontFamily;
  return next;
});

provideGlobalConfig(config);
</script>

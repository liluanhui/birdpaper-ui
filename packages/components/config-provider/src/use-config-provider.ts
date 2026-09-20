import { App, computed, getCurrentInstance, MaybeRef, provide, unref, watch } from "vue";
import { ConfigProviderContext } from "./types";
import {
  namespaceKey,
  prefixKey,
  localeKey,
  sizeKey,
  zIndexKey,
  emptyTextKey,
  fontFamilyKey,
  localeMessagesKey,
  mergeLocale,
  resolveLocale,
} from "@birdpaper-ui/hooks";

const FONT_FAMILY_CSS_VAR = "--bp-font-family";

const defaultConfig: Required<Omit<ConfigProviderContext, "emptyText" | "localeMessages" | "fontFamily">> = {
  prefix: "Bp",
  namespace: "bp",
  locale: "zh-CN",
  size: "default",
  zIndex: 3000,
};

function applyFontFamily(value?: string) {
  if (typeof document === "undefined") return;
  if (value) {
    document.documentElement.style.setProperty(FONT_FAMILY_CSS_VAR, value);
  } else {
    document.documentElement.style.removeProperty(FONT_FAMILY_CSS_VAR);
  }
}

export const provideGlobalConfig = (config: MaybeRef<ConfigProviderContext>, app?: App) => {
  const isSetup = !!getCurrentInstance();
  const provideFunction = app?.provide ?? (isSetup ? provide : undefined);

  if (!provideFunction) return;

  const getConfig = () => ({ ...defaultConfig, ...unref(config) });

  const messages = computed(() => {
    const { locale, localeMessages } = getConfig();
    return mergeLocale(resolveLocale(locale), localeMessages);
  });

  provideFunction(localeMessagesKey, messages);

  provideFunction(
    namespaceKey,
    computed(() => getConfig().namespace)
  );
  provideFunction(
    prefixKey,
    computed(() => getConfig().prefix)
  );
  provideFunction(
    localeKey,
    computed(() => getConfig().locale)
  );
  provideFunction(
    sizeKey,
    computed(() => getConfig().size)
  );
  provideFunction(
    zIndexKey,
    computed(() => getConfig().zIndex)
  );
  provideFunction(
    emptyTextKey,
    computed(() => getConfig().emptyText ?? messages.value.empty.description)
  );
  provideFunction(
    fontFamilyKey,
    computed(() => getConfig().fontFamily)
  );

  // Sync `--bp-font-family` so teleported overlays (Modal / Drawer / Message) also pick it up.
  // Only write :root when fontFamily is explicitly provided, so a nested ConfigProvider
  // without the prop does not clear an app.use / parent setting.
  watch(
    () => unref(config).fontFamily,
    (value, oldValue) => {
      if (value) {
        applyFontFamily(value);
      } else if (oldValue) {
        applyFontFamily(undefined);
      }
    },
    { immediate: true }
  );
};

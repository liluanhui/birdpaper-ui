import { computed, inject, InjectionKey, ref, Ref, unref } from "vue";
import { localeKey, sizeKey, zIndexKey, emptyTextKey, fontFamilyKey } from "./config-keys";
import { defaultLocale, localeMessagesKey, resolveLocale, type LocaleMessages } from "./locale";

export const defaultNamespace: string = "bp";
export const defaultSize = "default";

export const namespaceKey: InjectionKey<Ref<string | undefined>> = Symbol("namespaceKey");

export const useGetNamespace = (namespaceOverrides?: Ref<string | undefined>) => {
  const namespace = computed(() => {
    return unref(namespaceOverrides || inject(namespaceKey, ref(defaultNamespace))) || defaultNamespace;
  });
  return namespace;
};

export const useNamespace = (componentName: string, namespaceOverrides?: Ref<string | undefined>) => {
  const namespace = useGetNamespace(namespaceOverrides);
  const clsBlockName = computed(() => `${namespace.value}-${componentName}`);
  return { namespace, clsBlockName };
};

/**
 * Consume the resolved locale message catalog.
 *
 * Falls back to resolving the raw `locale` string when no catalog was provided
 * (e.g. a component mounted without a ConfigProvider), so components never have
 * to hardcode display strings.
 */
export const useLocale = (): { messages: Ref<LocaleMessages> } => {
  const injected = inject(localeMessagesKey, undefined);
  if (injected) return { messages: injected };

  const locale = inject(localeKey, undefined);
  const messages = computed(() => (locale ? resolveLocale(unref(locale)) : defaultLocale));
  return { messages };
};

/**
 * Consume global config injected by ConfigProvider.
 * Components use this to get global size, locale, zIndex, emptyText, fontFamily.
 * Each value can be overridden by component-level props.
 */
export const useGlobalConfig = () => {
  const locale = inject(localeKey, ref("zh-CN"));
  const size = inject(sizeKey, ref(defaultSize));
  const zIndex = inject(zIndexKey, ref(3000));
  const fontFamily = inject(fontFamilyKey, ref(undefined));
  const { messages } = useLocale();

  const injectedEmptyText = inject(emptyTextKey, undefined);
  const emptyText = computed(() => unref(injectedEmptyText) ?? messages.value.empty.description);

  return { locale, size, zIndex, emptyText, messages, fontFamily };
};

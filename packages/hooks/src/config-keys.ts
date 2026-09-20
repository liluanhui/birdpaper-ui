import { InjectionKey, Ref } from "vue";

/** All ConfigProvider injection keys live here to avoid circular deps between hooks ↔ config-provider. */

export const prefixKey: InjectionKey<Ref<string | undefined>> = Symbol("prefixKey");
export const localeKey: InjectionKey<Ref<string>> = Symbol("localeKey");
export const sizeKey: InjectionKey<Ref<string>> = Symbol("sizeKey");
export const zIndexKey: InjectionKey<Ref<number>> = Symbol("zIndexKey");
export const emptyTextKey: InjectionKey<Ref<string>> = Symbol("emptyTextKey");
export const popupZIndexKey: InjectionKey<Ref<number>> = Symbol("popupZIndexKey");
export const fontFamilyKey: InjectionKey<Ref<string | undefined>> = Symbol("fontFamilyKey");

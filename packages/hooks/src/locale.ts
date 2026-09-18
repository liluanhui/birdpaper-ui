import type { InjectionKey, Ref } from "vue";

/**
 * Message catalog shape shared by every component.
 * Keys are grouped by component so a partial override only has to
 * restate the strings it actually changes.
 */
export interface LocaleMessages {
  name: string;
  common: {
    ok: string;
    cancel: string;
    confirm: string;
  };
  empty: {
    description: string;
  };
  modal: {
    title: string;
    ok: string;
    cancel: string;
  };
  drawer: {
    title: string;
    ok: string;
    cancel: string;
  };
  popconfirm: {
    ok: string;
    cancel: string;
  };
  table: {
    emptyText: string;
  };
  pagination: {
    /** Supports the `{total}` placeholder. */
    total: string;
    /** Supports the `{jumper}` placeholder. */
    jumper: string;
    /** Supports the `{value}` placeholder. */
    pageSize: string;
  };
  datePicker: {
    today: string;
    now: string;
    ok: string;
    clear: string;
    selectTime: string;
  };
  timePicker: {
    now: string;
    ok: string;
  };
}

/** A locale pack may override any subset of the catalog. */
export type PartialLocaleMessages = {
  [K in keyof LocaleMessages]?: LocaleMessages[K] extends string
    ? LocaleMessages[K]
    : Partial<LocaleMessages[K]>;
};

export const zhCN: LocaleMessages = {
  name: "zh-CN",
  common: {
    ok: "确认",
    cancel: "取消",
    confirm: "确定",
  },
  empty: {
    description: "暂无数据",
  },
  modal: {
    title: "标题",
    ok: "确认",
    cancel: "取消",
  },
  drawer: {
    title: "标题",
    ok: "确认",
    cancel: "取消",
  },
  popconfirm: {
    ok: "确认",
    cancel: "取消",
  },
  table: {
    emptyText: "暂无数据",
  },
  pagination: {
    total: "共 {total} 条",
    jumper: "前往{jumper}",
    pageSize: "{value} 条/页",
  },
  datePicker: {
    today: "今天",
    now: "此刻",
    ok: "确定",
    clear: "清空",
    selectTime: "选择时间",
  },
  timePicker: {
    now: "现在",
    ok: "确认",
  },
};

export const enUS: LocaleMessages = {
  name: "en-US",
  common: {
    ok: "OK",
    cancel: "Cancel",
    confirm: "Confirm",
  },
  empty: {
    description: "No data",
  },
  modal: {
    title: "Title",
    ok: "OK",
    cancel: "Cancel",
  },
  drawer: {
    title: "Title",
    ok: "OK",
    cancel: "Cancel",
  },
  popconfirm: {
    ok: "OK",
    cancel: "Cancel",
  },
  table: {
    emptyText: "No data",
  },
  pagination: {
    total: "Total {total}",
    jumper: "Go to {jumper}",
    pageSize: "{value} / page",
  },
  datePicker: {
    today: "Today",
    now: "Now",
    ok: "OK",
    clear: "Clear",
    selectTime: "Select time",
  },
  timePicker: {
    now: "Now",
    ok: "OK",
  },
};

/** Built-in locale packs, resolvable by the ConfigProvider `locale` string. */
export const builtInLocales: Record<string, LocaleMessages> = {
  "zh-CN": zhCN,
  zh: zhCN,
  "en-US": enUS,
  en: enUS,
};

export const defaultLocale = zhCN;

/**
 * Resolve a locale name (e.g. "zh-CN", "en") to a message catalog.
 * Falls back to the base language tag, then to the default locale.
 */
export const resolveLocale = (locale?: string): LocaleMessages => {
  if (!locale) return defaultLocale;
  return builtInLocales[locale] ?? builtInLocales[locale.split("-")[0] ?? ""] ?? defaultLocale;
};

/** Deep-merge a partial override on top of a base catalog. */
export const mergeLocale = (base: LocaleMessages, override?: PartialLocaleMessages): LocaleMessages => {
  if (!override) return base;

  const result: LocaleMessages = { ...base };

  for (const key of Object.keys(override) as Array<keyof LocaleMessages>) {
    const value = override[key];
    if (value === undefined) continue;

    if (key === "name") {
      result.name = value as string;
    } else {
      const group = key as Exclude<keyof LocaleMessages, "name">;
      Object.assign(result, { [group]: { ...base[group], ...(value as object) } });
    }
  }

  return result;
};

/** Injection key carrying the resolved message catalog. */
export const localeMessagesKey: InjectionKey<Ref<LocaleMessages>> = Symbol("localeMessagesKey");

/** Interpolate `{name}` placeholders in a template string. */
export const interpolate = (template: string, values: Record<string, string | number>): string => {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
};

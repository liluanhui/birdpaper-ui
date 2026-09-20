import type { PartialLocaleMessages } from "@birdpaper-ui/hooks";

export type ComponentSize = "mini" | "small" | "default" | "large";

export interface ConfigProviderProps {
  /** Component name prefix when registering globally (e.g. "Bp" → <BpButton>). */
  prefix: string;
  /** Custom CSS namespace for BEM class names (default: "bp"). */
  namespace: string;
  /** Global locale language code (e.g. "zh-CN", "en"). */
  locale: string;
  /** Partial overrides applied on top of the resolved locale pack. */
  localeMessages: PartialLocaleMessages;
  /** Global default size for all form-related components. */
  size: ComponentSize;
  /** Base z-index value for popup components (Modal, Drawer, Tooltip, Message). */
  zIndex: number;
  /** Default empty-state text for Table, Select, Empty, etc. Overrides the locale pack. */
  emptyText: string;
  /**
   * Global font-family for all components. Writes to `--bp-font-family` on `:root`.
   * Omit to use the built-in system font stack from the theme CSS.
   */
  fontFamily: string;
}

export type ConfigProviderContext = Partial<ConfigProviderProps>;

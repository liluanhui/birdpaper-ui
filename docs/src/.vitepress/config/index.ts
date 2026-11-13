import { head } from "./head";
import { locales } from "./locales/index";

const config: import("vitepress").UserConfig = {
  lastUpdated: false,
  ignoreDeadLinks: true,
  cleanUrls: true,
  appearance: true,
  metaChunk: true,
  /** Output to `docs/dist` (used by GitHub Pages / COS deploy). */
  outDir: "../dist",
  cacheDir: ".vitepress/cache-local",
  locales,
  head,
  themeConfig: {
    logo: {
      dark: "https://cos.birdpaper.design/birdpaper-ui/v3/logo/logo-white.svg",
      light: "https://cos.birdpaper.design/birdpaper-ui/v3/logo/logo-black.svg",
    },
    siteTitle: false,
    outline: "deep",
    socialLinks: [
      { icon: "npm", link: "https://www.npmjs.com/package/birdpaper-ui" },
      {
        icon: "github",
        link: "https://github.com/liluanhui/birdpaper-ui",
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright:
        'Copyright © 2024-present Birdpaper Team · <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">粤ICP备17015354号</a>',
    },
    search: {
      provider: "local",
      options: {
        /**
         * Keep search index lean: skip demo source fences and large code blocks
         * that dominate page weight without helping keyword discovery.
         */
        _render(src, env, md) {
          const withoutHeavyCode = src.replace(/```[\s\S]*?```/g, " ");
          return md.render(withoutHeavyCode, env);
        },
      },
    },
  },
  markdown: {
    theme: {
      light: "min-light",
      dark: "min-dark",
    },
    lineNumbers: false,
  },
};

export default config;

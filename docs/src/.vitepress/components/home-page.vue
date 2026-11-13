<template>
  <div class="bp-home" :class="{ 'is-en': lang === 'en' }">
    <!-- Atmosphere -->
    <div class="bp-home__atmosphere" aria-hidden="true">
      <div class="orb orb--a"></div>
      <div class="orb orb--b"></div>
      <div class="orb orb--c"></div>
      <div class="grid-mask"></div>
    </div>

    <!-- Hero -->
    <section class="bp-home__hero">
      <div class="bp-home__hero-copy">
        <p class="bp-home__eyebrow">
          <span class="pulse"></span>
          Vue 3 · TypeScript · Design System
        </p>
        <h1 class="bp-home__brand">Birdpaper UI</h1>
        <p class="bp-home__headline">{{ t.headline }}</p>
        <p class="bp-home__lead">{{ t.lead }}</p>
        <div class="bp-home__actions">
          <a class="btn btn--primary" :href="localePath('/develop/install')">
            <span>{{ t.ctaStart }}</span>
            <IconArrowRightLongLine size="16" fill="#fff" />
          </a>
          <a class="btn btn--ghost" :href="localePath('/components/catalog')">{{ t.ctaBrowse }}</a>
        </div>
        <ul class="bp-home__meta">
          <li v-if="version">v{{ version }}</li>
          <li>MIT License</li>
          <li>
            <a href="https://moya.plus" target="_blank" rel="noopener noreferrer">{{ t.author }}</a>
          </li>
        </ul>
      </div>

      <div class="bp-home__stage" :aria-label="t.stageAria">
        <div class="stage-scaler">
          <div class="stage-cluster">
          <div class="stage-panel stage-panel--main glass">
            <div class="stage-panel__bar">
              <span></span><span></span><span></span>
            </div>
            <div class="stage-panel__body">
              <div class="stage-row stage-row--between">
                <div class="stage-identity">
                  <div class="mock-avatar">
                    BP
                    <i class="mock-badge">3</i>
                  </div>
                  <strong class="stage-user">Birdpaper</strong>
                </div>
                <div class="stage-row">
                  <span class="mock-tag mock-tag--primary">Vue 3</span>
                  <span class="mock-tag mock-tag--success">Ready</span>
                </div>
              </div>

              <div class="stage-row">
                <span class="mock-btn mock-btn--primary">{{ t.create }}</span>
                <span class="mock-btn mock-btn--secondary">{{ t.cancel }}</span>
                <div class="mock-switch mock-switch--on" aria-hidden="true">
                  <i></i>
                </div>
              </div>

              <div class="mock-input">
                <IconSearchLine size="14" />
                <span>{{ t.searchPlaceholder }}</span>
              </div>

              <div class="mock-slider" aria-hidden="true">
                <i></i>
              </div>
            </div>
          </div>

          <div class="stage-float stage-float--picker glass">
            <div class="mock-picker">
              <div class="mock-picker__header">
                <strong>{{ calendarMonth }}</strong>
                <div class="mock-picker__navs">
                  <IconArrowLeftDoubleFill size="16" />
                  <IconArrowLeftSLine size="16" />
                  <IconArrowRightSLine size="16" />
                  <IconArrowRightDoubleFill size="16" />
                </div>
              </div>
              <div class="mock-picker__weeks">
                <span v-for="w in t.weekdays" :key="w">{{ w }}</span>
              </div>
              <div class="mock-picker__days">
                <span
                  v-for="(cell, i) in calendarDays"
                  :key="i"
                  :class="{ 'is-muted': cell.muted, 'is-today': cell.today }"
                >{{ cell.day }}</span>
              </div>
            </div>
          </div>

          <div class="stage-float stage-float--rate glass">
            <div class="mock-rate" aria-hidden="true">
              <IconStarFill
                v-for="n in 5"
                :key="n"
                size="14"
                :fill="n <= 4 ? '#ffb400' : '#e5e6eb'"
              />
            </div>
          </div>

          <div class="stage-float stage-float--alert glass">
            <div class="mock-alert">
              <IconErrorWarningFill size="16" fill="#ff7d00" />
              <span>{{ t.alertHint }}</span>
            </div>
          </div>

          <div class="stage-float stage-float--message glass">
            <div class="mock-message">
              <IconCheckboxCircleFill size="18" fill="#00b42a" />
              <span>{{ t.messageSuccess }}</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Principles -->
    <section class="bp-home__section bp-home__principles">
      <div class="section-head">
        <h2>{{ t.principlesTitle }}</h2>
      </div>
      <div class="principle-grid">
        <a
          v-for="(item, i) in t.principles"
          :key="item.en"
          class="principle glass"
          :href="localePath('/design/principle')"
          :style="{ '--delay': `${i * 80}ms` }"
        >
          <div class="principle__icon" :class="`principle__icon--${i}`">
            <component :is="principleIcons[i]" size="22" fill="#ffffff" />
          </div>
          <span class="principle__index">{{ item.en }}</span>
          <h3>{{ item.title }}</h3>
          <p class="principle__slogan">{{ item.slogan }}</p>
          <IconArrowRightLine class="principle__arrow" size="18" />
        </a>
      </div>
    </section>

    <!-- Capabilities -->
    <section class="bp-home__section bp-home__caps">
      <div class="section-head">
        <h2>{{ t.capsTitle }}</h2>
        <p>{{ t.capsLead }}</p>
      </div>
      <div class="cap-rail">
        <a
          v-for="(cap, i) in t.capabilities"
          :key="cap.key"
          class="cap-item glass"
          :href="localePath(cap.link)"
        >
          <div class="cap-item__icon" :class="`cap-item__icon--${i}`">
            <component :is="capabilityIcons[cap.key]" size="22" fill="#ffffff" />
          </div>
          <div>
            <h3>{{ cap.title }}</h3>
            <p>{{ cap.desc }}</p>
          </div>
          <IconArrowRightLine class="cap-item__arrow" size="18" />
        </a>
      </div>
    </section>

    <!-- Code -->
    <section class="bp-home__section bp-home__code">
      <div class="code-layout">
        <div class="code-copy">
          <h2>{{ t.codeTitle }}</h2>
          <p>{{ t.codeLead }}</p>
          <a class="btn btn--primary" :href="localePath('/develop/start')">
            <span>{{ t.codeCta }}</span>
            <IconArrowRightLine size="16" fill="#fff" />
          </a>
        </div>
        <div class="code-window glass">
          <div class="code-window__bar">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <em>App.vue</em>
          </div>
          <pre><code><span class="tok-tag">&lt;template&gt;</span>
  <span class="tok-tag">&lt;bp-button</span> <span class="tok-attr">status</span>=<span class="tok-str">"primary"</span> <span class="tok-attr">@click</span>=<span class="tok-str">"open = true"</span><span class="tok-tag">&gt;</span>
    {{ t.codeOpenDialog }}
  <span class="tok-tag">&lt;/bp-button&gt;</span>

  <span class="tok-tag">&lt;bp-modal</span> <span class="tok-attr">v-model</span>=<span class="tok-str">"open"</span> <span class="tok-attr">title</span>=<span class="tok-str">"{{ t.codeConfirmTitle }}"</span><span class="tok-tag">&gt;</span>
    <span class="tok-tag">&lt;p&gt;</span>{{ t.codeContent }}<span class="tok-tag">&lt;/p&gt;</span>
  <span class="tok-tag">&lt;/bp-modal&gt;</span>
<span class="tok-tag">&lt;/template&gt;</span>

<span class="tok-tag">&lt;script</span> <span class="tok-attr">setup</span> <span class="tok-attr">lang</span>=<span class="tok-str">"ts"</span><span class="tok-tag">&gt;</span>
<span class="tok-kw">import</span> { ref } <span class="tok-kw">from</span> <span class="tok-str">'vue'</span>
<span class="tok-kw">const</span> open = ref(<span class="tok-bool">false</span>)
<span class="tok-tag">&lt;/script&gt;</span></code></pre>
        </div>
      </div>
    </section>

    <!-- Explore -->
    <section class="bp-home__section bp-home__explore">
      <div class="section-head">
        <h2>{{ t.exploreTitle }}</h2>
        <p>{{ t.exploreLead }}</p>
      </div>
      <div class="explore-grid">
        <a
          v-for="item in t.explores"
          :key="item.link"
          class="explore-card glass"
          :href="localePath(item.link)"
        >
          <span class="explore-card__label">{{ item.label }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <IconArrowRightLine class="explore-card__cta" size="18" />
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bp-home__footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo">Birdpaper UI</div>
          <p>{{ t.footerTagline }}</p>
        </div>
        <div class="footer-links">
          <div class="footer-col">
            <h4>{{ t.footerResources }}</h4>
            <a :href="localePath('/design/introduction')">{{ t.footerDesign }}</a>
            <a :href="localePath('/develop/install')">{{ t.footerDevelop }}</a>
            <a :href="localePath('/components/button')">{{ t.footerComponents }}</a>
          </div>
          <div class="footer-col">
            <h4>{{ t.footerCommunity }}</h4>
            <a href="https://github.com/liluanhui/birdpaper-ui" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.npmjs.com/package/birdpaper-ui" target="_blank" rel="noreferrer">npm</a>
          </div>
          <div class="footer-col">
            <h4>{{ t.footerHelp }}</h4>
            <a :href="localePath('/develop/install')">{{ t.footerQuickStart }}</a>
            <a :href="localePath('/design/guide')">{{ t.footerGuide }}</a>
            <a :href="localePath('/develop/changelog')">{{ t.footerChangelog }}</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>Released under the MIT License.</span>
        <span>Copyright © 2024-present Birdpaper Team</span>
        <a
          class="footer-beian"
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          粤ICP备17015354号
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  IconArrowLeftDoubleFill,
  IconArrowLeftSLine,
  IconArrowRightDoubleFill,
  IconArrowRightLongLine,
  IconArrowRightLine,
  IconArrowRightSLine,
  IconBrushLine,
  IconCheckDoubleLine,
  IconCheckboxCircleFill,
  IconCodeSSlashLine,
  IconErrorWarningFill,
  IconLeafLine,
  IconMoonLine,
  IconPaletteLine,
  IconSearchLine,
  IconSeedlingLine,
  IconStarFill,
  IconSubtractLine,
} from "birdpaper-icon";
import { useData } from "vitepress";
import { computed, markRaw, onMounted, ref, type Component } from "vue";
import { homeLocales, type HomeLocale } from "./home-locales";

const principleIcons: Component[] = [
  markRaw(IconSubtractLine),
  markRaw(IconCheckDoubleLine),
  markRaw(IconLeafLine),
  markRaw(IconSeedlingLine),
];

const capabilityIcons: Record<string, Component> = {
  "design-system": markRaw(IconPaletteLine),
  dark: markRaw(IconMoonLine),
  typescript: markRaw(IconCodeSSlashLine),
  theme: markRaw(IconBrushLine),
};

const { lang } = useData();
const version = ref("");

onMounted(async () => {
  try {
    const res = await fetch("https://registry.npmjs.org/birdpaper-ui/latest");
    if (!res.ok) return;
    const data = (await res.json()) as { version?: string };
    if (data.version) version.value = data.version;
  } catch {
    // keep empty when npm registry is unreachable
  }
});

const t = computed<HomeLocale>(() =>
  lang.value === "en" ? homeLocales.en : homeLocales["zh-CN"],
);

const localePath = (path: string) => {
  const prefix = lang.value === "en" ? "/en" : "";
  return `${prefix}${path}`;
};

const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Build Sun-first month grid for the current system date */
const buildCalendarDays = (now = new Date()) => {
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells: Array<{ day: number; muted?: boolean; today?: boolean }> = [];

  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, muted: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, today: d === today });
  }
  const total = cells.length <= 35 ? 35 : 42;
  let next = 1;
  while (cells.length < total) {
    cells.push({ day: next++, muted: true });
  }
  return cells;
};

const calendarDays = buildCalendarDays();

const calendarMonth = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  return lang.value === "en" ? `${year} ${EN_MONTHS[month]}` : `${year} ${month + 1}月`;
});
</script>

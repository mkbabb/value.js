claude-opus-5[1m]

# Lane · fourier-analysis FRONTEND census

**Target** `/Users/mkbabb/Programming/fourier-analysis` — the web/demo tree is `web/`.
**Mode** static, read-only (file reads · grep · wc · `git log`/`git diff` read-only). No dev server, no install, no browser tooling.
**Census date** 2026-08-03.

> **Working-tree caveat, load-bearing.** The repo sits on branch `m/w1-bump-migration` with **28 uncommitted paths** (`git status --porcelain | wc -l` → `28`). `web/package.json` on disk is the *in-flight bump*; HEAD still pins `@mkbabb/glass-ui: ^3.1.0`. Every version claim below is tagged **[WT]** (working tree) or **[HEAD]**. Last committed `web/src` commit is `9d7c387 feat(J.W3+W4): scheduler.yield floor + content-visibility on the gallery`; last commit touching `web/` at all is `57624fa 2026-06-04`.

---

## §0 · Frontier facts

| Fact | Value | Probe |
|---|---|---|
| Web tree root | `/Users/mkbabb/Programming/fourier-analysis/web` | `ls -la` |
| `.vue` files under `src/` | **66** | `find src -name '*.vue' \| wc -l` |
| `.ts` files under `src/` | **65** | `find src -name '*.ts' \| wc -l` |
| Total `src/` LOC (`.vue`+`.ts`+`.css`) | **20 615** | `find … \| xargs wc -l \| tail -1` → `20615 total` |
| `.vue` LOC | **13 363** | `find src -name '*.vue' \| xargs wc -l \| tail -1` |
| Files importing glass-ui | **51** | node AST-ish regex over `grep -rl` set |
| glass-ui named-import statements | **95** | loop + regex count (below) |
| Distinct glass-ui subpaths imported | **21** | `grep -rhoE 'from "@mkbabb/glass-ui[a-zA-Z/-]*"' \| sort -u \| wc -l` |
| Distinct glass-ui symbols imported | **49** | dedup of `{…}` members |
| Canvas 2D contexts | **4** | `grep -rn "getContext(" src/` |
| WebGL/WebGPU contexts | **0 — ABSENT** | `grep -rn "webgl\|WebGL\|WEBGL" src/` → *(empty)* |
| `<canvas>` elements | **3** | `grep -rn "<canvas" src/` (4th hit is a comment) |
| Files containing `<svg` | **12** | `grep -rl "<svg" src/ \| wc -l` |
| `requestAnimationFrame` sites / files | **20 / 8** | `grep -rn … \| wc -l`; `grep -rl …` |
| e2e specs / `test(` blocks | **8 / 29** | `grep -c "test(" e2e/*.spec.ts` |
| Playwright projects | **1** (`chromium`) | `grep -n "name:" playwright.config.ts` → line 48 |

---

## §1 · Framework + build shape

**Vue 3.5 SPA · Vite · Pinia · vue-router · Tailwind v4 (PostCSS) · TypeScript.** No SSR, no Nuxt. `appType: "spa"`.

- Entry `web/src/main.ts:1-11` — `createApp(App)` + `createPinia()` + `router`, mounted behind `router.isReady()`; imports `katex/dist/katex.min.css` then `./style.css`.
- Shell `web/src/App.vue:1-32` — `<SvgFilters/>` + `<TooltipProvider :delay-duration="400">` wrapping `AppHeader` + `<RouterView/>`, with `<Toaster/>` outside. A `MutationObserver` on `documentElement.class` re-runs `resolveVizColors()` on dark-mode flip (`App.vue:11-17`).
- Router `web/src/router/index.ts` (191 lines) — **8 named routes**, every view lazily `import()`-ed: `/paper`, `/v/:visualizationSlug`, `/w/:imageSlug?`, `/gallery`, `/equation`, `/morph`, `/demo/shape-extractor`, `/s/:slug` (`router/index.ts:40-117`).
- Stores (Pinia, 4): `stores/animation.ts` (146), `stores/auth.ts` (143), `stores/gallery.ts` (293), `stores/workspace.ts` (471).
- Build `web/vite.config.ts` — `base: process.env.VITE_BASE_URL || "/"`; single alias `@ → ./src`; Tailwind via `css.postcss.plugins:[@tailwindcss/postcss]`; **`@mkbabb/latex-paper/vite` plugin compiles `../paper/fourier_paper.tex` at build time** (`vite.config.ts:7-19`).
- **`resolve.alias` deliberately carries NO `@mkbabb/*` dist paths** — `vite.config.ts:22-25` cites `docs/precepts/cross-repo-dev-resolution.md §2.2/§2.4`: the `development` condition is STRUCK, siblings resolve through their own `exports` map. Same for `server.fs.allow` (`vite.config.ts:66-69`). This is contract-v2-clean and matches value.js's own posture.
- Manual chunk split `vite.config.ts:40-56`: `vendor-vue` / `vendor-ui` (glass-ui + reka-ui + lucide) / `vendor-math` (value.js + katex) / `vendor-paper` / `vendor-keyframes`. Comment records the pre-split index chunk at 854 kB.
- Dev proxy `/api → http://localhost:8000` (`vite.config.ts:70-76`).
- Scripts: `dev`, `build` (`vue-tsc -b && vite build`), `preview`, `test:e2e`, `test:e2e:ui`. **No unit-test runner — vitest is ABSENT** (`grep vitest web/package.json` → no match; only `@playwright/test`).
- `index.html:22-32` — pre-paint dark-mode bootstrap script reading both `theme` (legacy) and `vueuse-color-scheme`. Font preloads for 3 CM Serif `.woff` faces; `/fonts.css` self-hosted; **zero third-party origins** (comment at `index.html:16-18`).

### Dependency pins — [WT] vs [HEAD] vs producer

`git diff web/package.json` is the whole bump. Installed tree (`node_modules/@mkbabb/*/package.json`) matches **[WT]**.

| Package | [HEAD] pin | [WT] pin | Installed | Producer latest | Gap |
|---|---|---|---|---|---|
| `@mkbabb/glass-ui` | `^3.1.0` | `^4.0.0` | **4.0.0** | **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json`) | **3 majors** |
| `@mkbabb/keyframes.js` | `^2.2.0` | `^4.3.0` | 4.3.0 | **6.0.0** | 2 majors |
| `@mkbabb/value.js` | `^0.10.0` | `^0.13.0` | 0.13.0 | **4.0.0** (published; memory ledger) | pre-1.0 → 4.x |
| `@mkbabb/pencil-boil` | `latest` | `^0.4.1` | 0.4.1 | glass-ui 7 peers `^0.11.2` | 7 minors |
| `@mkbabb/latex-paper` | `^0.2.1` | `^0.2.1` | 0.2.1 | — | — |
| `vue-router` | `^4.5` | `^5.1.0` | — | — | major, in-flight |
| `pinia` | `^2.3` | `^3.0.4` | — | — | major, in-flight |
| `vite` | `^7.0` | `^8.0.16` | 8.0.16 | — | major, in-flight |
| `typescript` | `^5.8` | `^6.0.3` | 6.0.3 | — | major, in-flight |
| `vue-tsc` | `^2.0` | `^3.3.5` | — | — | major, in-flight |
| `reka-ui` | `^2.0` | `^2.9.10` | 2.9.10 | — | — |
| `lucide-vue-next` | `latest` | `^1.0.0` | 1.0.0 | glass-ui 7 peers **`@lucide/vue ^1.16.0`** | **package rename** |

**Dead devDeps (measured, not estimated):** `class-variance-authority`, `clsx`, `tailwind-merge` all have **0 import sites** in `src/` (`grep -rn "from \"<pkg>\"" src/ | wc -l` → `0` each). `reka-ui` also has **0 direct imports** — its 6 mentions are all prose comments (`src/components/paper/PaperSidebar.vue:256`, `ExportModal.vue:28,48`, `GlassTimeline.vue:32`, `ui/SliderControl.vue:51`, `equation/convergence/ConvergenceTimeline.vue:16`). `components.json` declares `aliases.utils: "@/lib/utils"` but **`src/lib/utils.ts` does not exist** (`ls src/lib/utils.ts` → `No such file or directory`) — the shadcn scaffold is vestigial. `DESIGN.md:32` already books "Remove unused CVA dependency".

---

## §2 · Component roster

66 SFCs + 65 TS modules. Grouped by feature domain; LOC from `wc -l`.

### `components/visualization/` — the epicycle product (26 SFC + 9 composables + 10 lib)

| Path (rel. `web/src/`) | LOC | Purpose |
|---|---|---|
| `components/visualization/VisualizationView.vue` | 486 | Route shell for `/v/:slug` + `/w/:slug?`; tab host (`SegmentedTabs`), `Configurator` panel, canvas stage |
| `components/visualization/BasisCanvas.vue` | **547** | **The primary Fourier renderer.** Canvas2D epicycle/multi-basis draw loop |
| `components/visualization/ContourSettings.vue` | 470 | Contour-extraction parameter panel (collapsible + select + configurator rows) |
| `components/visualization/GalleryView.vue` | 442 | `/gallery` route shell; tabs + dialogs |
| `components/visualization/ContourEditorCanvas.vue` | 340 | SVG contour point editor (drag/insert/delete) |
| `components/visualization/BasisSelector.vue` | 324 | Basis toggles + per-basis term sliders |
| `components/visualization/FullscreenViewer.vue` | 245 | Fullscreen canvas layer |
| `components/visualization/EditorControlsDock.vue` | 230 | `GlassDock` + `DockIconButton` + `HoverPopover` editor rail |
| `components/visualization/AnimationControls.vue` | 224 | `GlassDock` + `DockDropdownTrigger` transport (play/speed/easing) |
| `components/visualization/ImageUpload.vue` | 207 | Image drop/upload + preview |
| `components/visualization/EquationPanel.vue` | 134 | KaTeX-rendered partial-sum equation overlay |
| `components/visualization/CanvasControlsDock.vue` | 132 | `GlassDock` + `DockIconButton` view controls |
| `components/visualization/GlassTimeline.vue` | **127** | Scrub bar over `t∈[0,1]` — **SHADOW, see §4** |
| `components/visualization/ExportModal.vue` | 114 | Export dialog (`Dialog` + `Switch`) |
| `components/visualization/EasingPicker.vue` | **98** | Easing chip grid — **SHADOW, see §4** |
| `components/visualization/SpeedSelect.vue` | 70 | `Select` wrapper for playback speed |
| `components/visualization/ContourPreview.vue` | 62 | Small SVG contour thumb |
| `components/visualization/EasingCurvePreview.vue` | **41** | Inline SVG easing curve — **SHADOW, see §4** |
| `components/visualization/CoefficientsPanel.vue` | 26 | `ConfiguratorLayer` host for the spectrum |
| `components/visualization/CanvasOverlayButton.vue` | 25 | `Button` wrapper for canvas-corner affordances |
| `components/visualization/gallery/AdminUserList.vue` | 529 | Admin user table + role dialogs |
| `components/visualization/gallery/GalleryCard.vue` | 309 | Gallery tile (`Badge` + `Checkbox` + `Button`) |
| `components/visualization/gallery/AdminFlaggedPanel.vue` | 285 | Moderation queue |
| `components/visualization/gallery/GalleryCardModal.vue` | 261 | Card detail `Dialog` |
| `components/visualization/gallery/GallerySearchBar.vue` | 223 | Search + filter `Select`s |
| `components/visualization/gallery/AdminAuditLog.vue` | 190 | Audit-log list |
| `components/visualization/gallery/UserSlugBar.vue` | 168 | Slug edit + `useClipboard` |
| `components/visualization/gallery/GalleryMarquee.vue` | 134 | Horizontal auto-scroll strip — **SHADOW candidate, §4** |
| `components/visualization/gallery/GalleryDraftsSection.vue` | 108 | Draft list |
| `components/visualization/gallery/GalleryAdminBanner.vue` | 107 | Admin stats banner (6× `MetricBadge`) |
| `components/visualization/gallery/GalleryFeaturedCarousel.vue` | 91 | Featured carousel — **SHADOW candidate, §4** |
| `components/visualization/gallery/GalleryInfiniteGrid.vue` | 54 | `InfiniteScroll` wrapper |
| `components/visualization/composables/useCanvasHover.ts` | 202 | Pointer hover FSM + hit-region dispatch |
| `components/visualization/composables/useWorkspaceLoader.ts` | 136 | Workspace fetch/hydrate |
| `components/visualization/composables/useImageUpload.ts` | 106 | Upload lifecycle |
| `components/visualization/composables/useImageOverlay.ts` | 93 | Underlay image draw |
| `components/visualization/composables/useViewTransform.ts` | 77 | pan/zoom → screen transform |
| `components/visualization/composables/usePointDrag.ts` | 67 | Contour point drag |
| `components/visualization/composables/useViewState.ts` | 52 | View state persistence |
| `components/visualization/composables/useCanvasSetup.ts` | **49** | **DPR-aware canvas init + ResizeObserver** |
| `components/visualization/composables/useContourHistory.ts` | 36 | undo/redo ring |
| `components/visualization/lib/canvas-drawing/*` (9 files) | **764 total** | epicycles 297 · grid 106 · labels 103 · trail 96 · placeholder 61 · transforms 39 · ghost-path 29 · index 20 · types 13 |
| `components/visualization/lib/basis-display.ts` | 7 | display-name map |

### `components/equation/` — the equation explorer (9 SFC + 3 composables + 3 lib)

| Path | LOC | Purpose |
|---|---|---|
| `components/equation/EquationView.vue` | 469 | `/equation` route shell; tabs + hover-card coefficient popovers |
| `components/equation/ConvergencePlot.vue` | **410** | **Canvas2D partial-sum convergence plot** with own rAF loop |
| `components/equation/FunctionInput.vue` | 261 | Expression entry + presets |
| `components/equation/FrequencyGraph.vue` | **247** | **Canvas2D spectrum bar graph** |
| `components/equation/convergence/ConvergenceTimeline.vue` | 146 | `Slider`-driven harmonic timeline |
| `components/equation/EquationResult.vue` | 101 | KaTeX result + copy |
| `components/equation/convergence/ConvergenceLegend.vue` | 97 | Harmonic legend overlay |
| `components/equation/EquationModeToggle.vue` | 80 | Mode toggle (`Button` group) |
| `components/equation/NotationPills.vue` | 47 | Notation chips (`Button`) — **SHADOW candidate, §4** |
| `components/equation/InfoCard.vue` | 43 | Metric card (`MetricBadge`) |
| `components/equation/EqCoefficientsPanel.vue` | 17 | Thin spectrum host |
| `components/equation/composables/useCoeffHover.ts` | 106 | KaTeX-rendered coefficient hover |
| `components/equation/composables/useCurveTransition.ts` | 87 | rAF curve tween (`easeInOutSine` from value.js) |
| `components/equation/composables/useEquationCache.ts` | 49 | Result memo |
| `components/equation/lib/harmonics.ts` | 88 | Harmonic sampling |
| `components/equation/lib/grid.ts` | 75 | Plot grid geometry |
| `components/equation/lib/hit-test.ts` | 36 | Plot hit-testing |

### `components/paper/` — the typeset treatise (9 SFC + 6 TS)

| Path | LOC | Purpose |
|---|---|---|
| `components/paper/PaperView.vue` | **685** | `/paper` route shell; `@mkbabb/latex-paper/vue` render + ToC + scroll sync |
| `components/paper/search/paperSearchIndex.ts` | 401 | Section index build |
| `components/paper/PaperSearch.vue` | 397 | Search host — **SHADOW candidate, §4** |
| `components/paper/MobileFloatingToc.vue` | 397 | Mobile floating ToC bar |
| `components/paper/PaperSidebar.vue` | 283 | Desktop ToC sidebar (`useSidebarState` + `Collapsible`) |
| `components/paper/useScrollNavigation.ts` | 246 | Scroll-spy + smooth nav |
| `components/paper/PaperArticleWindow.vue` | 212 | Article viewport |
| `components/paper/search/PaperSearchModal.vue` | 124 | Modal search |
| `components/paper/search/usePaperSearch.ts` | 108 | Query/rank |
| `components/paper/search/searchHelpers.ts` | 74 | Highlight/normalize |
| `components/paper/search/PaperSearchDropdown.vue` | 70 | Results dropdown |
| `components/paper/search/PaperSearchInput.vue` | 69 | Input + `Button` |
| `components/paper/paperTree.ts` | 21 | ToC tree adapt |
| `components/paper/search/index.ts` | 4 | barrel |

### `components/morph/` · `components/layout/` · `components/decorative/` · `components/shared/` · `components/ui/`

| Path | LOC | Purpose |
|---|---|---|
| `components/morph/FourierMorphDemo.vue` | 330 | `/morph` route — SVG path morph via Fourier coefficients |
| `components/morph/HarmonicLevelGrid.vue` | 286 | Per-level harmonic sliders |
| `components/morph/MorphPhaseConfig.vue` | 212 | Phase/duration `Select` + `Slider` |
| `components/morph/FourierShapeExtractor.vue` | 191 | `/demo/shape-extractor`; uses `pencil-boil` generators |
| `components/morph/MorphShapePreview.vue` | 175 | SVG shape preview |
| `components/layout/AppHeader.vue` | 354 | Global header — nav `DropdownMenu` + `HoverCard` + `Button` |
| `components/layout/DarkModeToggle.vue` | **109** | Sun↔moon Fourier morph toggle — **SHADOW, see §4** |
| `components/decorative/SvgFilters.vue` | 178 | Global `<defs>` filters; `pencil-boil` `useLineBoil`; reduced-motion gated |
| `components/decorative/FourierMorphSvg.vue` | 41 | Path-only SVG renderer |
| `components/shared/CoefficientsSpectrum.vue` | **168** | Coefficient spectrum bars (`AnimatedDigit`) — **SHADOW candidate, §4** |
| `components/ui/SliderControl.vue` | 150 | Labeled slider chassis — **thin wrapper over glass-ui `Slider`** |
| `components/ui/CollapsibleSection.vue` | 72 | Titled collapsible — **thin wrapper over glass-ui `Collapsible`** |
| `components/ui/PathPreview.vue` | 69 | Bespoke SVG path thumb (no glass-ui analogue) |
| `components/ui/tooltip/Tooltip.vue` | 38 | Single-component tooltip shim — **thin wrapper over glass-ui `Tooltip*`** |
| `components/ui/tooltip/index.ts` | 1 | barrel |

### Shared `src/composables/` (5) and `src/lib/` (20)

`useFourierMorph.ts` 230 · `useMorphConfig.ts` 97 · `useOffsetPagination.ts` 83 · `useToast.ts` 38 · `useSafeStorage.ts` 27.
`lib/api.ts` **672** · `lib/types.ts` 391 · `lib/contourEditing.ts` 222 · `lib/svg-fourier.ts` 154 · `lib/easings.ts` 127 · `lib/colors.ts` 117 · `lib/draftStorage.ts` 114 · `lib/evaluators.ts` 91 · `lib/golden-shimmer.ts` 68 · `lib/api-problem.ts` 61 · `lib/svg-contours.ts` 58 · `lib/figureDimensions.ts` 57 · `lib/equation/{api 57, types 53, presets 52, notation 48, index 4}` · `lib/scheduler.ts` 54 · `lib/bases.ts` 46 · `lib/defaults.ts` 33 · `lib/paperContent.ts` 7.

---

## §3 · glass-ui usage census

### Headline

**Adoption is deep and idiomatic, not superficial.** 51 of 66 SFCs + 4 TS modules import glass-ui; **95 named-import statements** across **21 distinct subpaths** pulling **49 distinct symbols**. There are **zero direct `reka-ui` imports** and **zero local shadcn component copies** — the shadcn scaffold (`components.json`) is vestigial and its `@/lib/utils` target does not exist. This is the cleanest glass-ui consumer posture in the constellation.

Probes:
```
$ grep -rn "@mkbabb/glass-ui" web/src/ | wc -l
100                       # incl. 4 non-import lines (3 prose comments + 1 CSS @import)
$ grep -rl "@mkbabb/glass-ui" web/src/ | wc -l
54                        # 51 with a real `from` specifier + 3 comment-only
$ grep -rhoE 'from "@mkbabb/glass-ui[a-zA-Z/-]*"' web/src/ | sort -u | wc -l
21
```

### Subpath usage counts (occurrence census, `grep -rhoE '@mkbabb/glass-ui[a-zA-Z/-]*' src/ | sort | uniq -c | sort -rn`)

```
  35 @mkbabb/glass-ui/button              7 @mkbabb/glass-ui/metric-badge   ← REMOVED at 7.0.0
   7 @mkbabb/glass-ui/slider              7 @mkbabb/glass-ui                (root barrel)
   5 @mkbabb/glass-ui/select              5 @mkbabb/glass-ui/dialog
   4 @mkbabb/glass-ui/configurator        3 @mkbabb/glass-ui/tabs
   3 @mkbabb/glass-ui/dock                2 @mkbabb/glass-ui/tooltip
   2 @mkbabb/glass-ui/toast               2 @mkbabb/glass-ui/sidebar
   2 @mkbabb/glass-ui/hover-popover  ← REMOVED at 5.0.0
   2 @mkbabb/glass-ui/hover-card     ← REMOVED at 5.0.0
   2 @mkbabb/glass-ui/dropdown-menu       2 @mkbabb/glass-ui/collapsible
   2 @mkbabb/glass-ui/badge               1 @mkbabb/glass-ui/switch
   1 @mkbabb/glass-ui/infinite-scroll     1 @mkbabb/glass-ui/dark
   1 @mkbabb/glass-ui/animated-digit      1 @mkbabb/glass-ui/styles      (CSS @import)
   2 @mkbabb/glass-ui/styles/animations   (both PROSE COMMENTS, not imports)
   1 @mkbabb/glass-ui/pagination          (PROSE COMMENT — subpath retired upstream)
```

### The 49 symbols, by subpath

| Subpath | Symbols |
|---|---|
| *(root)* | `Checkbox`, `useClipboard`, `supportsViewTransitions`, `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` |
| `/animated-digit` | `AnimatedDigit` |
| `/badge` | `Badge` |
| `/button` | `Button` |
| `/collapsible` | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` |
| `/configurator` | `Configurator`, `ConfiguratorLayer`, `ConfiguratorRow` |
| `/dark` | `useGlobalDark` |
| `/dialog` | `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` |
| `/dock` | `GlassDock`, `DockIconButton`, `DockDropdownTrigger` |
| `/dropdown-menu` | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` |
| `/hover-card` | `HoverCard`, `HoverCardTrigger`, `HoverCardContent` |
| `/hover-popover` | `HoverPopover` |
| `/infinite-scroll` | `InfiniteScroll` |
| `/metric-badge` | `MetricBadge` |
| `/select` | `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue` |
| `/sidebar` | `useSidebarState` |
| `/slider` | `Slider` |
| `/switch` | `Switch` |
| `/tabs` | `SegmentedTabs` |
| `/toast` | `Toaster`, `toast`, `useToast`, `type ToastVariant` |
| `/tooltip` | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` |

### Full import lines (`grep -rn "@mkbabb/glass-ui" web/src/ | sort`)

```
src/App.vue:4:import { TooltipProvider } from "@mkbabb/glass-ui/tooltip";
src/App.vue:5:import { Toaster } from "@mkbabb/glass-ui/toast";
src/components/equation/EquationModeToggle.vue:2:import { Button } from "@mkbabb/glass-ui/button";
src/components/equation/EquationResult.vue:3:import { Button } from "@mkbabb/glass-ui/button";
src/components/equation/EquationResult.vue:4:import { useClipboard } from "@mkbabb/glass-ui";
src/components/equation/EquationView.vue:8:import { Button } from "@mkbabb/glass-ui/button";
src/components/equation/EquationView.vue:9:import { HoverCard, HoverCardTrigger, HoverCardContent } from "@mkbabb/glass-ui/hover-card";
src/components/equation/EquationView.vue:10:import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";
src/components/equation/EquationView.vue:13:import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
src/components/equation/FunctionInput.vue:3:import { Button } from "@mkbabb/glass-ui/button";
src/components/equation/InfoCard.vue:4:import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";
src/components/equation/NotationPills.vue:2:import { Button } from "@mkbabb/glass-ui/button";
src/components/equation/convergence/ConvergenceTimeline.vue:19:import { Button } from "@mkbabb/glass-ui/button";
src/components/equation/convergence/ConvergenceTimeline.vue:20:import { Slider } from "@mkbabb/glass-ui/slider";
src/components/layout/AppHeader.vue:9:import { Button } from "@mkbabb/glass-ui/button";
src/components/layout/AppHeader.vue:15:} from "@mkbabb/glass-ui/dropdown-menu";
src/components/layout/AppHeader.vue:20:} from "@mkbabb/glass-ui/hover-card";
src/components/layout/DarkModeToggle.vue:18:import { useGlobalDark } from "@mkbabb/glass-ui/dark";
src/components/morph/FourierMorphDemo.vue:86:import { Button } from "@mkbabb/glass-ui/button";
src/components/morph/FourierShapeExtractor.vue:143:import { Button } from "@mkbabb/glass-ui/button";
src/components/morph/HarmonicLevelGrid.vue:89:import { Button } from "@mkbabb/glass-ui/button";
src/components/morph/HarmonicLevelGrid.vue:90:import { Slider } from "@mkbabb/glass-ui/slider";
src/components/morph/MorphPhaseConfig.vue:72:} from "@mkbabb/glass-ui/select";
src/components/morph/MorphPhaseConfig.vue:73:import { Slider } from "@mkbabb/glass-ui/slider";
src/components/paper/MobileFloatingToc.vue:3:import { Button } from "@mkbabb/glass-ui/button";
src/components/paper/MobileFloatingToc.vue:4:import { useSidebarState } from "@mkbabb/glass-ui/sidebar";
src/components/paper/PaperSidebar.vue:6:import { Button } from "@mkbabb/glass-ui/button";
src/components/paper/PaperSidebar.vue:7:import { Collapsible, CollapsibleContent } from "@mkbabb/glass-ui/collapsible";
src/components/paper/PaperSidebar.vue:8:import { useSidebarState } from "@mkbabb/glass-ui/sidebar";
src/components/paper/PaperView.vue:22:import { Button } from "@mkbabb/glass-ui/button";
src/components/paper/search/PaperSearchDropdown.vue:3:import { Button } from "@mkbabb/glass-ui/button";
src/components/paper/search/PaperSearchInput.vue:3:import { Button } from "@mkbabb/glass-ui/button";
src/components/paper/search/PaperSearchModal.vue:3:import { Button } from "@mkbabb/glass-ui/button";
src/components/shared/CoefficientsSpectrum.vue:18:import { Button } from "@mkbabb/glass-ui/button";
src/components/shared/CoefficientsSpectrum.vue:19:import { AnimatedDigit } from "@mkbabb/glass-ui/animated-digit";
src/components/ui/CollapsibleSection.vue:2:import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@mkbabb/glass-ui'
src/components/ui/SliderControl.vue:23:import { Slider } from "@mkbabb/glass-ui/slider";
src/components/ui/tooltip/Tooltip.vue:17:} from "@mkbabb/glass-ui/tooltip";
src/components/visualization/AnimationControls.vue:8:import { GlassDock, DockDropdownTrigger } from "@mkbabb/glass-ui/dock";
src/components/visualization/AnimationControls.vue:9:import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@mkbabb/glass-ui/dropdown-menu";
src/components/visualization/AnimationControls.vue:10:import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";
src/components/visualization/BasisSelector.vue:3:import { Slider } from "@mkbabb/glass-ui/slider";
src/components/visualization/BasisSelector.vue:4:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/BasisSelector.vue:5:import { ConfiguratorLayer, ConfiguratorRow } from "@mkbabb/glass-ui/configurator";
src/components/visualization/CanvasControlsDock.vue:6:import { HoverPopover } from "@mkbabb/glass-ui/hover-popover";
src/components/visualization/CanvasControlsDock.vue:7:import { GlassDock, DockIconButton } from "@mkbabb/glass-ui/dock";
src/components/visualization/CanvasOverlayButton.vue:9:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/CoefficientsPanel.vue:4:import { ConfiguratorLayer } from "@mkbabb/glass-ui/configurator";
src/components/visualization/ContourSettings.vue:7:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/ContourSettings.vue:12:} from "@mkbabb/glass-ui/collapsible";
src/components/visualization/ContourSettings.vue:18:} from "@mkbabb/glass-ui/select";
src/components/visualization/ContourSettings.vue:19:import { ConfiguratorLayer, ConfiguratorRow } from "@mkbabb/glass-ui/configurator";
src/components/visualization/EasingPicker.vue:2:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/EditorControlsDock.vue:3:import { Slider } from "@mkbabb/glass-ui/slider";
src/components/visualization/EditorControlsDock.vue:4:import { HoverPopover } from "@mkbabb/glass-ui/hover-popover";
src/components/visualization/EditorControlsDock.vue:5:import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";
src/components/visualization/EditorControlsDock.vue:6:import { GlassDock, DockIconButton } from "@mkbabb/glass-ui/dock";
src/components/visualization/EquationPanel.vue:11:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/EquationPanel.vue:12:import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";
src/components/visualization/ExportModal.vue:3:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/ExportModal.vue:4:import { Switch } from "@mkbabb/glass-ui/switch";
src/components/visualization/ExportModal.vue:11:} from "@mkbabb/glass-ui/dialog";
src/components/visualization/FullscreenViewer.vue:3:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/GalleryView.vue:13:import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
src/components/visualization/GalleryView.vue:14:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/GalleryView.vue:22:} from "@mkbabb/glass-ui/dialog";
src/components/visualization/GlassTimeline.vue:21:import { Slider } from "@mkbabb/glass-ui/slider";
src/components/visualization/SpeedSelect.vue:9:} from "@mkbabb/glass-ui/select";
src/components/visualization/VisualizationView.vue:27:import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
src/components/visualization/VisualizationView.vue:28:import { Configurator } from "@mkbabb/glass-ui/configurator";
src/components/visualization/VisualizationView.vue:29:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/gallery/AdminAuditLog.vue:3:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/gallery/AdminFlaggedPanel.vue:3:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/gallery/AdminFlaggedPanel.vue:11:} from "@mkbabb/glass-ui/dialog";
src/components/visualization/gallery/AdminUserList.vue:3:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/gallery/AdminUserList.vue:4:import { Checkbox } from "@mkbabb/glass-ui";
src/components/visualization/gallery/AdminUserList.vue:12:} from "@mkbabb/glass-ui/dialog";
src/components/visualization/gallery/AdminUserList.vue:19:} from "@mkbabb/glass-ui/select";
src/components/visualization/gallery/GalleryAdminBanner.vue:4:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/gallery/GalleryAdminBanner.vue:5:import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";
src/components/visualization/gallery/GalleryCard.vue:3:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/gallery/GalleryCard.vue:4:import { Badge } from "@mkbabb/glass-ui/badge";
src/components/visualization/gallery/GalleryCard.vue:5:import { Checkbox } from "@mkbabb/glass-ui";
src/components/visualization/gallery/GalleryCardModal.vue:3:import { Badge } from "@mkbabb/glass-ui/badge";
src/components/visualization/gallery/GalleryCardModal.vue:4:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/gallery/GalleryCardModal.vue:5:import { Dialog, DialogContent } from "@mkbabb/glass-ui/dialog";
src/components/visualization/gallery/GalleryDraftsSection.vue:7:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/gallery/GalleryDraftsSection.vue:8:import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";
src/components/visualization/gallery/GalleryInfiniteGrid.vue:3:import { InfiniteScroll } from "@mkbabb/glass-ui/infinite-scroll";
src/components/visualization/gallery/GallerySearchBar.vue:5:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/gallery/GallerySearchBar.vue:12:} from "@mkbabb/glass-ui/select";
src/components/visualization/gallery/UserSlugBar.vue:4:import { Button } from "@mkbabb/glass-ui/button";
src/components/visualization/gallery/UserSlugBar.vue:5:import { useClipboard } from "@mkbabb/glass-ui";
src/composables/useMorphConfig.ts:9:import { useClipboard } from "@mkbabb/glass-ui";
src/composables/useToast.ts:5:} from "@mkbabb/glass-ui/toast";
src/router/index.ts:2:import { supportsViewTransitions } from "@mkbabb/glass-ui";
src/style.css:3:@import "@mkbabb/glass-ui/styles";
# — non-import prose lines —
src/components/ui/CollapsibleSection.vue:58   (comment: `@mkbabb/glass-ui/styles/animations.css`)
src/components/visualization/ContourSettings.vue:357 (comment: same)
src/composables/useOffsetPagination.ts:11     (comment: `@mkbabb/glass-ui/pagination` retired at v1.0)
```

### Bespoke vs shadcn-local vs glass-ui

| Category | Count | Evidence |
|---|---|---|
| glass-ui-backed (imports ≥1 glass-ui symbol) | **51 files** | above |
| Local shadcn-style component copies | **0 — ABSENT** | `find src/components/ui -type f` → 5 files, none a shadcn copy; 3 are glass-ui wrappers, `PathPreview.vue` is bespoke SVG, `tooltip/index.ts` is a barrel. `ls src/lib/utils.ts` → `No such file or directory` (no `cn()`), `grep -rn "cva(" src/` → 0 |
| Direct `reka-ui` component imports | **0 — ABSENT** | `grep -rn 'from "reka-ui"' src/` → *(empty)*; all 6 mentions are comments |
| Bespoke local `components/ui/` wrappers over glass-ui | **3** | `CollapsibleSection.vue` (→ `Collapsible`), `SliderControl.vue` (→ `Slider variant="standard"`), `tooltip/Tooltip.vue` (→ `Tooltip*`) |
| Bespoke with no glass-ui analogue | `PathPreview.vue` (69), `FourierMorphSvg.vue` (41), `SvgFilters.vue` (178) | inline SVG primitives |

**Verdict:** these three `components/ui/` files are **thin API-shape adapters, not shadows.** `SliderControl.vue:3-20` and `Tooltip.vue:2-12` document the adaptation explicitly (scalar↔array model, single-component tooltip API). They are the correct posture — keep.

### glass-* / cartoon-* class-surface census

```
$ grep -rhoE 'glass-[a-z]+' web/src/ | sort | uniq -c | sort -rn
 146 glass-ui   11 glass-scrubber   4 glass-wash   3 glass-track
   3 glass-thumb   3 glass-resting   3 glass-floating   3 glass-fill   1 glass-slider
$ grep -rhoE 'cartoon-[a-z]+' web/src/ | sort | uniq -c
  25 cartoon-card    3 cartoon-surface    1 cartoon-hover
```
All 11 `glass-scrubber` and all `glass-track`/`glass-fill`/`glass-thumb` occurrences are **prose comments only** (verified site-by-site: `BasisSelector.vue:315`, `EditorControlsDock.vue:48,222`, `GlassTimeline.vue:120`, `SliderControl.vue:3,16,140`, `HarmonicLevelGrid.vue:119,207`, `MorphPhaseConfig.vue:98,204`; `GlassTimeline.vue:6`, `SliderControl.vue:6`, `ConvergenceTimeline.vue:6`). The one live selector is `GlassTimeline.vue:103` `.timeline-row:has(.glass-slider[data-held])`. The live tier classes are `glass-wash` (4), `glass-resting` (3), `glass-floating` (3) — the post-4.0.0 names.

**`cartoon-card` is a local resurrection shim.** `style.css:106-117` re-declares `@utility cartoon-card` because glass-ui removed the recipe at C.W5; **25 application sites** consume it. This is an outstanding upstream carry.

---

## §4 · Bespoke components shadowing glass-ui primitives — FLAGGED

Producer inventory probe:
```
$ ls /Users/mkbabb/Programming/glass-ui/src/components/ | wc -l    # 65 entries
$ node -e '…Object.keys(exports)…'   # producer 7.0.0 export subpaths: 73
                                     # installed  4.0.0 export subpaths: 79
```

### 🔴 HARD SHADOW — exact name collision, primitive already available at the PINNED version

| Local | LOC | Producer primitive | Available at 4.0.0? |
|---|---|---|---|
| `web/src/components/visualization/GlassTimeline.vue` | **127** | `glass-ui/src/components/timeline/GlassTimeline.vue` (`export { default as GlassTimeline }`, `timeline/index.ts:1`) | **YES** — `grep -o "GlassTimeline" node_modules/@mkbabb/glass-ui/dist/timeline.js` → 2 hits. The `./timeline` subpath exists at 4.0.0 and 7.0.0 and fourier **never imports it** (`grep 'glass-ui/timeline' src/` → 0). |

The local file is a `Slider` + caret-label composition (`GlassTimeline.vue:21` imports `Slider`), so it is a *partial* re-fork — but the upstream `GlassTimeline` plus `ContinuousTimeline`/`ScrubberTimeline`/`SegmentedTimeline` already covers the surface. **Name-identical, zero-import: the strongest shadow signal in the tree.**

### 🔴 HARD SHADOW — producer folded the exact family upstream (7.0.0)

| Local | LOC | Producer primitive |
|---|---|---|
| `web/src/components/visualization/EasingPicker.vue` | **98** | `glass-ui/src/components/easing/EasingPicker.vue` — `easing/index.ts:1-3` exports `EasingPicker` + `EasingConfigurator` |
| `web/src/components/visualization/EasingCurvePreview.vue` | **41** | same family (`easing/composables/useEasingPicker`) |
| `web/src/lib/easings.ts` | 127 | producer README: the picker "authors … over the REAL value.js twin" (`glass-ui/src/components/easing/README.md:3-6`) |

`./easing` is **ABSENT at 4.0.0** (`grep -rl "EasingPicker" node_modules/@mkbabb/glass-ui/dist/` → *(empty)*) and **ADDED at 7.0.0**. The producer README states "The two demo curve editors … re-home onto it — **no fourth fork**" — fourier's `EasingPicker` + `EasingCurvePreview` are that fourth fork, un-re-homed.

### 🟠 CHARACTERFUL SHADOW — name collision, genuinely divergent design

| Local | LOC | Producer primitive |
|---|---|---|
| `web/src/components/layout/DarkModeToggle.vue` | **109** | `glass-ui/src/components/dark-mode-toggle/DarkModeToggle.vue` (7.0.0); at 4.0.0 it lived at `dist/components/custom/controls/DarkModeToggle.vue.d.ts` |

The local one is a **sun↔moon Fourier-path morph** (`DarkModeToggle.vue:19-27` loads `sun.json`/`moon.json` and drives `useFourierMorph`) — a product-signature affordance, not a generic toggle. It *does* correctly consume `useGlobalDark` from `@mkbabb/glass-ui/dark` (`:18`). **Recommend: keep, but reconcile against the 7.0.0 `DarkModeToggle` props/tokens rather than let it drift.**

### 🟠 SOFT SHADOW — the fourier viz itself is bespoke while glass-ui ships a Fourier renderer

| Local | LOC | Producer primitive |
|---|---|---|
| `web/src/components/visualization/BasisCanvas.vue` + `lib/canvas-drawing/*` | **547 + 764 = 1 311** | `glass-ui/src/components/fourier-field/` — `FourierField.vue`, `math.ts`, `shaders/`; exported at BOTH 4.0.0 (`./fourier-field`, `./fourier-math`) and 7.0.0 |
| `web/src/components/shared/CoefficientsSpectrum.vue` | 168 | same family (spectrum/`BasisComponent`) |

Producer README (`glass-ui/src/components/fourier-field/README.md:3-6`): *"FourierField renders a seeded epicycle chain and luminous reconstruction ribbon. Its pure coefficient math is CPU-owned; **WebGPU performs the primary compute and render work**, with a supported WebGL2 implementation."* Its prop table takes `spectrum: readonly BasisComponent[]` — **the same type name fourier-analysis declares locally** (`web/src/lib/types.ts`, consumed at `BasisCanvas.vue:26`).

**Nuance (do not over-flag):** `FourierField` is a *decorative* seeded field with a `getPalette` hook, whereas `BasisCanvas` is an *interactive, hoverable, hit-tested, multi-basis* instrument (Chebyshev/Legendre + ghost path + image overlay + trail + label hit-regions). They are not drop-in equivalents. But the **coefficient math** (`web/src/lib/evaluators.ts` 91 · `web/src/lib/bases.ts` 46 · `canvas-drawing/epicycles.ts` 297) is duplicated substrate, and glass-ui's version is GPU-backed while fourier's is Canvas2D. **This is the highest-value convergence target in the lane.** `./fourier-field` + `./fourier-math` are imported **0 times** (`grep 'fourier-field\|fourier-math' web/src/` → *(empty)*).

### 🟡 CANDIDATE SHADOWS — a producer subpath exists and is unimported

| Local | LOC | Unimported producer subpath | Note |
|---|---|---|---|
| `components/paper/PaperSearch.vue` + `search/` (6 files) | 397 + 435 | `./search` (`SearchBar.vue`, `composables/`, `searchVariants.ts`) — present at 4.0.0 AND 7.0.0 | 7.0.0 `dock/index.ts` further ships `useDockSearch` composing `useFuzzySearch` ("the VSCode subsequence scorer — NO re-fork") |
| `gallery/GalleryFeaturedCarousel.vue` | 91 | `./carousel` (present at 4.0.0) | 0 imports |
| `gallery/GalleryMarquee.vue` | 134 | `./scrolling-text` (4.0.0) — **RETIRED at 5.0.0** ("render accessible text") | uplift makes this permanently local; keep + book |
| `equation/NotationPills.vue` | 47 | `./toggle-chip` (4.0.0) → **`./chip`** (5.0.0+) | currently 6× `Button` |
| `equation/InfoCard.vue` | 43 | `./card` | uses `MetricBadge` inside a bespoke div |
| `visualization/CoefficientsPanel.vue` / `EqCoefficientsPanel.vue` | 26 / 17 | `./metric-stack` (4.0.0) → `./metric` (7.0.0) | |
| `components/ui/PathPreview.vue` | 69 | *(none)* | genuinely bespoke — no flag |

**Aggregate shadow surface: 9 components / ~1 990 LOC** (127 + 98 + 41 + 109 + 547 + 764 + 168 + 91 + 134 ≈ 2 079 counting the canvas-drawing lib; **1 315 excluding it**).

---

## §5 · The 4.0.0 → 7.0.0 uplift break surface

This is what the mega-tranche must budget. Every row is quoted from `/Users/mkbabb/Programming/glass-ui/CHANGELOG.md` (read-only).

### Export-map diff (measured)

```
$ node -e 'diff Object.keys(exports) of producer 7.0.0 vs installed 4.0.0'
ADDED in 7.0.0  (14): ./axes ./blob-config ./blob ./chip ./completion-seal
                      ./dark-mode-toggle ./deck ./drawer ./easing ./metric
                      ./music-staff ./scroll-progress-rim ./surface ./styles/theme
REMOVED (in 4.0.0, gone at 7.0.0) (21):
   ./controls ./color-swatch ./confirm-dialog ./stacked-icons ./icon-chip
   ./goo-blob ./metric-badge ./metric-cell ./metric-stack ./pulse ./toggle-chip
   ./icon-tooltip ./hover-popover ./scrolling-text ./glass-panel ./api
   ./motion-curves ./sheet ./hover-card ./notification ./context-menu
```

### Rows that hit fourier-analysis TODAY

| Break | Sites | Disposition (CHANGELOG citation) |
|---|---|---|
| `./metric-badge` removed | **7 imports / 6 files** — `EquationView.vue:10`, `InfoCard.vue:4`, `AnimationControls.vue:10`, `EditorControlsDock.vue:5`, `EquationPanel.vue:12`, `GalleryAdminBanner.vue:5`, `GalleryDraftsSection.vue:8` | → `./metric` (`Metric`). `CHANGELOG.md` §7.0.0 table. Note the WT diff already did `amount=` → `value=` for the 3.1→4.0 hop (9 lines); another prop pass is due. |
| `./hover-card` removed | **2 imports** — `EquationView.vue:9`, `AppHeader.vue:20` | → `<Popover>`. `CHANGELOG.md:216` — folds at **5.0.0** `BI.W-OVERLAY-UNION` |
| `./hover-popover` removed | **2 imports** — `CanvasControlsDock.vue:6`, `EditorControlsDock.vue:4` | → `<Popover>`. `CHANGELOG.md:217`, **5.0.0** |
| `DockIconButton` removed (member-level) | **2 imports** — `CanvasControlsDock.vue:7`, `EditorControlsDock.vue:6` | → `<DockControl>` (`shape="icon"` default). `CHANGELOG.md` §5.0.0 CORRECTION + `glass-ui/src/components/dock/index.ts` ("The five legacy SFCs are DEFINITION-ABSENT — clean break, no alias") |
| `DockDropdownTrigger` removed (member-level) | **1 import** — `AnimationControls.vue:8` | → `<DockTrigger>` (`dock/index.ts`: folds `DockSelectTrigger`/`DockDropdownTrigger`/`DockPopoverTrigger`) |
| `type ToastVariant` removed | **1 import** — `useToast.ts:3`, used at `useToast.ts:9` as `Record<ToastType, ToastVariant>` | **ABSENT** — `grep -rn "ToastVariant" /Users/mkbabb/Programming/glass-ui/src/` → *(empty)*. `toast/index.ts` now exports `ToastHandle`/`ToastOptions`/`ToastProps`. **This is a typecheck-breaking removal.** |
| `lucide-vue-next` → `@lucide/vue` | **35 import sites** (`grep -rn "lucide-vue-next" src/ \| wc -l` → 35) | glass-ui 7 `peerDependencies: {"@lucide/vue":"^1.16.0"}` |
| `keyframes.js` peer floor | `useFourierMorph.ts:14` (`loadAnimationEngine`, `type Animation`) | 7.0 peers `@mkbabb/keyframes.js@^6.0.0`; installed 4.3.0 |
| `value.js` peer floor | 5 sites (`easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5` — all `easeInOutSine`/`timingFunctions`) | 7.0 peers `@mkbabb/value.js@^4.0.0`; installed **0.13.0** |
| `pencil-boil` peer floor | 4 sites (`SvgFilters.vue:3`, `FourierShapeExtractor.vue:144`, `svg-fourier.ts:11`) | 7.0 optional-peers `^0.11.2`; installed 0.4.1 |

### 🔴 THE RESOLUTION DEADLOCK

```
$ grep -n 'optionalDependencies' -A3 web/node_modules/@mkbabb/keyframes.js/package.json
# and web/package-lock.json:387
                "@mkbabb/glass-ui": "~4.0.0"
```
**`@mkbabb/keyframes.js@4.3.0` optional-depends on `@mkbabb/glass-ui: ~4.0.0`** — a tilde pin that hard-locks glass-ui to the 4.0.x line for as long as keyframes 4.3.0 is installed. Meanwhile glass-ui 7.0.0 peers `keyframes.js@^6.0.0`, and producer `keyframes.js@6.0.0` depends on `@mkbabb/value.js@4.0.0` **exactly** (`node -e … deps` → `{"@mkbabb/value.js":"4.0.0"}`).

**⇒ The three bumps are ONE atomic transaction: `glass-ui 4→7` ∧ `keyframes 4.3→6` ∧ `value.js 0.13→4.0`. None can land alone.** This is the single most consequential finding in the lane.

### Prior-art: what the 3.1.0 → 4.0.0 hop actually cost

The uncommitted WT diff is the empirical rate. `git diff --stat web/src/` → **24 files, 46 insertions, 46 deletions** — a pure rename sweep, no logic:
```
$ git diff -U0 web/src/ | grep -E '^[+-][^+-]' | sort | uniq -c | sort -rn | head
  9 - variant="glass-scrubber"        9 + variant="standard"
  3 - import { UnderlineTabs } …      3 + import { SegmentedTabs } …
  3 - <UnderlineTabs                  3 + <SegmentedTabs variant="underline"
  3 - <DialogContent variant="opaque" 3 + <DialogContent surface="opaque"
  2 - :amount="…"                     2 + :value="…"
  1 - class="… glass-elevated"        1 + class="… glass-floating"
  1 - class="… glass-medium"          1 + class="… glass-resting"
  1 - class="… glass-subtle"          1 + class="… glass-wash"
```
The 4→7 hop is **materially larger**: 3 removed subpaths in live use, 3 removed dock members, a removed type, a peer-package rename (35 sites), and the tri-package deadlock. Budget an order of magnitude above 46 lines.

---

## §6 · Visualization architecture — the render path

**Canvas2D throughout. WebGL/WebGPU: ABSENT** (`grep -rn "webgl\|WebGL\|WEBGL" web/src/` → *(empty)*). Three independent canvases + a 12-file SVG surface.

### Path A — the primary Fourier epicycle instrument

```
stores/animation.ts:56  startLoop()                    ← THE clock
  └─ :62  function tick(now)                            rAF, ping-pong, t ∈ [0,1]
  └─ :70  rafId = requestAnimationFrame(tick)
  └─ :48-53 GATED: `if (!playing || !anyCanvasVisible) return`   ← I.γ off-screen gate
  └─ :95  setCanvasVisible(v)  — reference-counted across inline + fullscreen canvases

components/visualization/BasisCanvas.vue:435  onMounted → new IntersectionObserver
  └─ :447  anim.setCanvasVisible(visible)               ← registers into the gate
  └─ :55   useCanvasSetup(canvasRef, containerRef, onResize)
        └─ composables/useCanvasSetup.ts:24-33  DPR scale:
              canvas.width  = round(rect.width  * devicePixelRatio)
              ctx.setTransform(dpr,0,0,dpr,0,0)
              → CanvasSurface { ctx, width, height, dpr }
        └─ :40  ResizeObserver(setupCanvas) on the container
  └─ :378/402/418  watch(...)  → drawFrame()            ← reactive redraw, NOT per-rAF
  └─ :90   function drawFrame(s)
        :96  s.ctx.clearRect(0,0,width,height)
        :97  view = getViewTransform(s)      (composables/useViewTransform.ts:1-77)
        :100 drawGrid(s, view)               (lib/canvas-drawing/grid.ts, 106)
        :104 drawImageOverlay(s, view)       (composables/useImageOverlay.ts, 93)
        :110 → drawEpicycleFrame  |  :112 → drawMultiBasesFrame
  └─ :119  function drawEpicycleFrame(s, data, view)
        :127 drawGhostPath(...)              (canvas-drawing/ghost-path.ts, 29)
        :137 allPositions = fourierPositionsAt(components, anim.t, n)   ← lib/bases.ts
             # comment :134-136: "Single pass over the full chain … Prior
             #   implementation traversed N components twice per frame."
        :141 trail.update(...) / :142 trail.draw(...)   (canvas-drawing/trail.ts, 96)
        :157 computeStableEpicycleBbox / :161 computeEpicycleFit
        :168 s.ctx.globalAlpha = goldenShimmerAlpha()   (lib/golden-shimmer.ts, 68)
        :170 drawEpicycleCircles(...)        (canvas-drawing/epicycles.ts, 297)
        :184 drawConnectingLine(...)
        :188 drawTipDot(...)
        :192 drawBasisLabels(...) → hitRegions          (canvas-drawing/labels.ts, 103)
        :193 hover.setLabelHitRegions(hitRegions)       (composables/useCanvasHover.ts, 202)
```
Math substrate: `lib/bases.ts:11-24` dispatches `evaluateFourier` / `evaluateChebyshev` / `evaluateLegendre` from `lib/evaluators.ts` (91). Palette resolved once at app boot from CSS custom properties (`App.vue:11` `resolveVizColors()`, `lib/colors.ts` 117), re-resolved on `.dark` toggle via `MutationObserver`.

**Notable:** the epicycle loop is *not* draw-on-rAF — the store's rAF only mutates `anim.t`, and Vue's reactivity (`BasisCanvas.vue:378-428`) schedules `drawFrame()`. Redraws therefore coalesce on Vue's scheduler, not the raw frame clock.

### Path B — convergence plot (own rAF, independent)
`components/equation/ConvergencePlot.vue:93` `getContext("2d")`; own loop at `:67-69` `requestAnimationFrame(tick)`; redraw watchers at `:308` and `:319`. **Not** gated by `stores/animation.ts` — a second, ungated clock.

### Path C — frequency/spectrum graph (pure watch-driven)
`components/equation/FrequencyGraph.vue:63` `getContext("2d")`; single deep watcher `:157` `watch(() => [props.components, props.logScale, props.maxBars, props.activeIndices], () => draw(), { deep: true })`. No rAF.

### SVG surfaces (12 files)
`decorative/SvgFilters.vue` (global `<defs>`, `pencil-boil` `useLineBoil`) · `decorative/FourierMorphSvg.vue` · `ui/PathPreview.vue` · `visualization/ContourEditorCanvas.vue` (SVG point editor despite the name) · `ContourPreview.vue` · `EasingCurvePreview.vue` · `morph/{FourierShapeExtractor, HarmonicLevelGrid, MorphPhaseConfig}.vue` · `equation/{EquationView, convergence/ConvergenceTimeline}.vue` · `visualization/AnimationControls.vue`.

### INP / long-task discipline
`lib/scheduler.ts` (54) implements a 3-rung `yieldToMain()` floor — `scheduler.yield()` → `scheduler.postTask()` → `setTimeout(0)` — plus `processInChunks(items, onItem, {chunkSize:32})`. Its header (`scheduler.ts:14-19`) explicitly excludes the render loop: *"NOT applied to the epicycle/morph RENDER loop: that is already rAF-paced AND off-screen-gated (I.γ) … the genuine unbounded consumer is the gallery infinite-scroll accumulation."* Good hygiene, correctly scoped.

---

## §7 · Containerization state

**Fully containerized.** Multi-stage build + hardened prod overlay.

| Artifact | Path | Shape |
|---|---|---|
| Frontend image | `web/Dockerfile` (43 lines) | `node:22-slim` → `base` → `deps` (`npm ci`) → `development` (`npm run dev -- --host --port 3000`) \| `builder` (`npm run build`) → **`nginx:alpine AS production`** |
| Dev compose | `docker-compose.yml` | 3 services: `backend` (`api/Dockerfile:development`, :8000), `frontend` (`web/Dockerfile:development`, `${WEB_PORT:-3000}:3000`, bind-mounts `./web/src:/app/src`, `VITE_PROXY_API=http://backend:8000`), `mongo:8.0` (health-gated). Bridge net `app-network`. Volumes `mongo_data`, `image_blobs`. |
| Prod overlay | `docker-compose.prod.yml` (7 818 B) | `frontend` → `target: production`, `ports: !reset []`, build args `VITE_API_URL`/`VITE_BASE_URL`, `read_only: true`, tmpfs `/var/cache/nginx:noexec,nosuid,size=16m` + `/var/run:1m` + `/tmp:16m`, `cap_drop: ALL` + `cap_add: NET_BIND_SERVICE`, `no-new-privileges:true`, memory limit **256M**, json-file logging (`docker-compose.prod.yml:53-79`) |
| nginx conf | inlined via `printf` at `web/Dockerfile:31-42` | SPA fallback `try_files $uri $uri/ /index.html`; `expires 1y; Cache-Control public, immutable` for `js\|css\|woff2\|png\|jpg\|svg`. There is ALSO a repo-level `nginx/fourier.conf`. |
| dockerignore | `web/.dockerignore` | `node_modules`, `dist`, `.DS_Store` |

**Build-time coupling (fragile):** `web/Dockerfile:20-25` copies `assets/ → public/assets/` **and** six `paper/fourier_paper.{tex,bib,aux,log,toc,bbl}` files into `/paper/` because `vite-plugin-latex-paper` compiles the TeX at build. The frontend image therefore cannot build from `web/` alone — build context must be the repo root. Both compose files set `context: .`, `dockerfile: web/Dockerfile`.

**A prior deploy break is documented in-file** (`web/Dockerfile:5-9`): the `163ca47` deps migration retired `file:./vendor/*.tgz` seams but left a stale `COPY web/vendor ./vendor` that "broke every Docker build".

**CI** — `.github/workflows/ci.yml` (3 jobs: `api-tests` w/ live Mongo service, `web-build` = `vue-tsc + vite build`, `e2e-tests` = Playwright vs local Vite dev server) + `.github/workflows/deploy-pages.yml`. Checkout deliberately omits submodules (`docs/precepts` is private and "was the chronic that kept every CI run red").

---

## §8 · Styling / motion surfaces

### Cascade entry — `web/src/style.css` (143 lines)
```
:1  @import "tailwindcss";
:2  @import "tw-animate-css";
:3  @import "@mkbabb/glass-ui/styles";     ← the ONLY glass-ui CSS entry
```
`web/src/styles/` **no longer exists** — `DESIGN.md:13-16` records the A.W2 abrogation wave that discharged `fourier-overrides.css`, `ios-fixes.css`, `buttons.css` in full. Everything now lives at the entry or in scoped SFC blocks.

Entry contents: `@theme { --font-sans: "Computer Modern Serif", … }` (:14-16) · `@layer base` html/body + `env(safe-area-inset-bottom)` + `::selection` (:18-37) · mobile-first root sizing `1.125rem → 1rem @ 768px` (:41-51) · KaTeX sizing + a documented phantom-`@font-face` excision (:53-77) · tab-panel entry animation (:79-97) · **`@utility cartoon-card` shim** (:99-117) · **light-mode `--viz-amber` WCAG darken** `hsl(35 70% 42%)` → `hsl(35 76% 35%)` ≈ 4.6:1 (:119-131) · global `:focus-visible` rings for 4 scoped-styled classes (:133-143).

Both the `cartoon-card` shim and the `--viz-amber` darken are annotated as **held upstream coordination asks** — live glass-ui carries.

### Fonts
Self-hosted, zero third-party origins. `index.html:10-13` preloads `cmunrm.woff` / `cmunbx.woff` / `cmunti.woff`; `index.html:19` links `/fonts.css` (CM Serif + Fraunces + Fira Code); KaTeX CSS is bundler-imported at `main.ts:5` so it is fingerprinted + same-origin.

### Dark mode
Pre-paint bootstrap at `index.html:22-32` reading `theme` ∥ `vueuse-color-scheme`. Runtime owner is glass-ui `useGlobalDark` (`DarkModeToggle.vue:18`). Palette re-resolution on class flip via `App.vue:11-17` `MutationObserver`.

### `prefers-reduced-motion` — 18 references / 12 files (`grep -rn "prefers-reduced-motion\|reducedMotion" src/ | wc -l` → 18)

| Kind | Site | Coverage |
|---|---|---|
| JS gate | `decorative/SvgFilters.vue:7-9,24,36` | `matchMedia("(prefers-reduced-motion: reduce)").matches` — early-returns from both boil animators |
| JS gate | `paper/PaperView.vue:176` | `window.matchMedia?.(…)` — smooth-scroll opt-out |
| JS gate | `router/index.ts:15-17, 138` | `prefersReducedMotion()` short-circuits the view-transition path (`supportsViewTransitions` from glass-ui root) |
| CSS `reduce` | `equation/ConvergencePlot.vue:405` · `layout/DarkModeToggle.vue:104` · `ui/CollapsibleSection.vue:66` · `visualization/AnimationControls.vue:178` · `visualization/ContourSettings.vue:370` · `gallery/GalleryCard.vue:304` · `gallery/GalleryMarquee.vue:126-129` · `style.css:92` | 8 `@media (prefers-reduced-motion: reduce)` blocks |
| CSS `no-preference` (inverted) | `visualization/VisualizationView.vue:306-310` | the only `no-preference` gate — comment cites the glass-ui Transitions engine |

`GalleryMarquee.vue:126-128` names the provenance: *"D.W4.c — prefers-reduced-motion guard. WCAG 2.3.3 / A3 #9 finding."*

**⚠️ COVERAGE GAP (flag):** the two ungated animation clocks are `stores/animation.ts` (the epicycle rAF — `grep -n "reducedMotion\|prefers-reduced" src/stores/animation.ts` → *no match*) and `equation/ConvergencePlot.vue`'s own rAF (`:67-69`; the file's `reduce` block at `:405` is CSS-only and does not stop `tick`). The autoplay epicycle animation runs at full rate under `prefers-reduced-motion: reduce`. WCAG 2.2.2 is arguably satisfied by the visible play/pause transport (`AnimationControls.vue`), and glass-ui 7 ships `DockBackgroundToggle` — "WCAG 2.2.2 pause/play toggle for animated backgrounds" (`glass-ui/src/components/dock/index.ts`) — as the canonical seat. **Book it.**

### Motion / a11y hygiene already banked
- Off-screen rAF gating with reference counting (`stores/animation.ts:41-53, 95-103`).
- `scheduler.yield()` INP floor (`lib/scheduler.ts`).
- ARIA-correct radio-in-menu roles with a written rationale (`EasingPicker.vue:9-15`: `role="menuitemradio"` + `aria-checked`, "`aria-pressed` would mislabel a radio as a toggle").
- `@axe-core/playwright ^4.11.3` in devDeps; `e2e/` carries `visual-baseline.spec.ts` + `paper-performance.spec.ts`.

---

## §9 · Carries for the mega-tranche

1. **[P0] The tri-package atomic bump.** `glass-ui 4→7` ∧ `keyframes 4.3→6` ∧ `value.js 0.13→4.0` cannot be decomposed — `keyframes@4.3.0` optional-deps `glass-ui ~4.0.0` and `glass-ui@7` peers `keyframes ^6` + `value.js ^4`. Plus `lucide-vue-next → @lucide/vue` (35 sites) and `pencil-boil 0.4.1 → ^0.11.2`.
2. **[P0] Land or abandon the WT bump first.** 28 uncommitted paths on `m/w1-bump-migration` (3.1→4.0, vue-router 4→5, pinia 2→3, vite 7→8, ts 5.8→6). The 4→7 work cannot be sequenced on top of an unlanded 3→4.
3. **[P1] `ToastVariant` is a hard typecheck break** — `useToast.ts:3,9`; the symbol is definition-absent in producer 7.0.0.
4. **[P1] 11 removed-subpath import sites** — `metric-badge` ×7, `hover-card` ×2, `hover-popover` ×2 — plus 3 removed dock members (`DockIconButton` ×2, `DockDropdownTrigger` ×1).
5. **[P1] `value.js 0.13 → 4.0` consumer surface is tiny (5 sites, `easeInOutSine` + `timingFunctions`)** — this is the cheapest leg of the deadlock and is the value.js-side interest.
6. **[P2] Retire the two hard shadows**: `GlassTimeline.vue` (127) → `glass-ui/timeline`; `EasingPicker.vue` + `EasingCurvePreview.vue` (139) → `glass-ui/easing` (the README explicitly forbids a "fourth fork").
7. **[P2] `fourier-field` convergence study.** glass-ui ships a WebGPU/WebGL2 `FourierField` with the same `BasisComponent` prop type; fourier-analysis renders 1 311 LOC of Canvas2D. Not a drop-in (interactivity/multi-basis), but the coefficient math is duplicated substrate. **Highest-value, highest-risk.**
8. **[P2] Two upstream carries are held in `style.css`**: `@utility cartoon-card` (25 sites, resurrecting a C.W5 removal) and the `--viz-amber` light-mode WCAG darken. Both want glass-ui-side resolution.
9. **[P3] Reduced-motion gap** — `stores/animation.ts` + `ConvergencePlot.vue` rAF clocks are ungated; glass-ui 7 `DockBackgroundToggle` is the canonical seat.
10. **[P3] Dead deps** — `class-variance-authority`, `clsx`, `tailwind-merge`, and direct `reka-ui` all have 0 src imports; `components.json` points at a nonexistent `@/lib/utils`. `DESIGN.md:32` already books the CVA row.
11. **[P3] No unit-test runner.** vitest is ABSENT; the only automated frontend gate is 8 Playwright specs / 29 tests on a single chromium project + `vue-tsc -b` in CI.

claude-opus-5[1m]

# Challenge C · **PaperView** · CONSUMPTION axis

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/PaperView.vue` (685 lines)
**Axis** how this component consumes value.js (0.13 pinned) · keyframes (4.3) · glass-ui (^4.0.0) · `@mkbabb/latex-paper` (0.2.1) · the fourier API (45 ops) · props/emits contract quality · integration seams
**Mode** static, read-only. fourier-analysis was READ ONLY; this file is the sole write. No browser tooling — livability claims are tagged **UNPROVEN-NEEDS-LIVE** for SS-13.
**Date** 2026-08-06.

**Read whole**: `PaperView.vue`; every file it imports — `PaperSidebar.vue` (283), `MobileFloatingToc.vue` (397), `PaperArticleWindow.vue` (212), `paperTree.ts` (21), `useScrollNavigation.ts` (246), `search/usePaperSearch.ts` (108), `lib/paperContent.ts` (7); the transitive search leaves (`PaperSearch.vue`, `PaperSearchInput/Dropdown/Modal.vue`, `paperSearchIndex.ts`); and the producer surfaces actually consumed — `@mkbabb/latex-paper@0.2.1` (`dist/vue/**.d.ts`, `dist/vue.js`, `dist/chunk-A7GY23HR.js`, `src/vue/theme.css`), `@mkbabb/glass-ui@4.0.0` (`package.json` exports, `dist/button*.js`, `dist/styles/**`), plus `web/vite.config.ts`, `web/src/style.css`, `web/src/lib/colors.ts`, `paper/fourier_paper.tex`, `web/e2e/*.spec.ts`.

**Verdict — headline.** PaperView's *call-site* consumption is the cleanest in the fourier tree: it delegates 100% of the paper substrate to `@mkbabb/latex-paper` (8 imported symbols, zero re-fork), imports glass-ui only through subpaths, touches **zero** of the 45 API operations, and imports **zero** value.js. But cleanliness at the call site is not cleanliness at the seam. The component is **outside the F.W2 value.js blast radius by import and inside it twice over** — once by *chunk* (D-1: `vendor-math` welds 142 KB of value.js onto a route with no value.js reachability) and once by *token* (D-9: an undocumented `:root` override rebinds a glass-ui oklch ramp stop to an hsl viz colour app-wide). Nineteen defects, zero blockers, seven superlatives.

**Counts: 19 defects · 0 blockers · 7 superlatives.**

---

## §0 · Consumption census — what this component actually consumes

| Producer | Pinned | Consumed **by PaperView directly** | Consumed **by the paper subtree** |
|---|---|---|---|
| `@mkbabb/latex-paper` | 0.2.1 | 8 symbols from `/vue` (`useKatex`, `PAPER_CONTEXT`, `PaperContext`, `flattenPaperSections`, `useClickDelegate`, `useSidebarFollow`, `useTreeIndex`, `useVirtualSectionWindow`) + `/theme` CSS side-effect (`:2-12`) | + `PaperSection`, `PaperSectionBlocks`, `FlatPaperSection`, `TreeNode`, 5 `PaperSectionData`-family types |
| `@mkbabb/glass-ui` | ^4.0.0 (installed 4.0.0) | `Button` from `/button` (`:22`) — **1 symbol, 1 subpath** | + `/collapsible` (2), `/sidebar` (`useSidebarState`) |
| `@mkbabb/value.js` | ^0.13.0 (installed 0.13.0) | **ZERO** | **ZERO** — `grep -rn "@mkbabb/value.js" web/src/components/paper/` → *(empty)*; the 5 repo-wide sites are `equation/ConvergencePlot.vue:5`, `equation/composables/useCurveTransition.ts:8`, `equation/lib/harmonics.ts:5`, `lib/easings.ts:9,16` |
| `@mkbabb/keyframes.js` | ^4.3.0 | **ZERO** | **ZERO** — no import anywhere under `components/paper/` |
| fourier API (45 ops) | — | **ZERO** | **ZERO** — `grep -rn "lib/api\|fetch(\|/api/" web/src/components/paper/` → *(empty)*. All content is build-time via `virtual:paper-content` (`lib/paperContent.ts:7`) |
| `lucide-vue-next` | ^1.0.0 | `Undo2` (`:23`) | + `ChevronDown/Right/Up`, `Search`, `X`, `ArrowRight`, `Maximize2`, `Minimize2` |
| `katex` | ^0.17.0 | transitively, via `useKatex` (`:3, :38`) | same |

**R6-8 is structurally unreachable here.** The adjudicated intake row R6-8 (`intakes/lane-fourier-r3-r6.md`, ADOPT-AS-FACT + CARRY→F.W5) establishes that fourier's operation record embeds a derived `clients: [...]` back-reference so an API defect cannot be attributed to one side of the client↔operation seam. PaperView has **no** client leaf: zero `lib/api.ts` imports, zero `fetch`, zero router-param-driven load. The operation↔client coupling therefore has no PaperView surface to entangle. This is a clean negative and I record it as such rather than manufacture a finding.

**R5-7 / R6-5 corroborated live.** The intake's native-`li v-for` rows at `PaperSidebar.vue:65, 87, 105` reproduce exactly on this read (see the file above). PaperView is the component that *supplies* the `sections` array those loops iterate (`:120` → `:337`), so the derivation blind spot the intake cured lands directly on PaperView's prop contract. No contradiction; adopting.

---

## §1 · DEFECTS

### D-1 · **MAJOR** — `vendor-math` welds value.js to KaTeX; `/paper` ships ~142 KB of value.js it cannot reach

**Provenance** `web/vite.config.ts:53` `"vendor-math": ["@mkbabb/value.js", "katex"]` · `PaperView.vue:3,38` (`useKatex`) · `web/src/components/paper/` value.js imports = 0.

PaperView requires KaTeX. Object-form `manualChunks` is a flat name→package mapping: every module of both listed packages that is reachable anywhere in the app lands in **one** chunk, and that chunk is fetched the moment any member is needed. Loading `/paper` therefore fetches `@mkbabb/value.js` in full.

Reachability was checked, not assumed. glass-ui 4.0.0's value.js references are confined to three dist modules — `motion-curves.js`, `color-DweYl7pE.js`, `aurora.js` (`grep -rlo "@mkbabb/value.js" node_modules/@mkbabb/glass-ui/dist/` → 5 hits, 2 of them `.d.ts`). None is reachable from `button.js` / `collapsible.js` / `sidebar.js`, the only glass-ui subpaths the paper subtree imports. So value.js is genuinely unreachable from `/paper` by module graph, and genuinely present by chunk.

Measured: `node_modules/@mkbabb/value.js/dist/value.js` = **145 809 B** raw ESM.

**Falsifier** — a single reachable `@mkbabb/value.js` import from anything the `/paper` route loads. Searched `components/paper/**`, `lib/paperContent.ts`, and the three glass-ui subpath entry chains: none. Post-minify/gzip delta is **UNPROVEN-NEEDS-LIVE** (no build permitted under the read-only law); the *grouping* is proven statically from the config.

**Why the mega-tranche cares.** `formation/fourier/lane-frontend.md §9 item 5` calls the value.js consumer surface "tiny (5 sites, `easeInOutSine` + `timingFunctions`) — the cheapest leg of the deadlock". That is true of call sites and **false of shipped bytes**: the chunk config makes value.js a fixed cost on every route that renders math, including the one route that never calls it. I do not contradict the row; I extend it — cheapness of migration ≠ cheapness of presence.

---

### D-2 · **MAJOR** — `vendor-paper` sits in the entry graph, contradicting its own comment; latex-paper ships on every route

**Provenance** `vite.config.ts:45` (comment) vs `vite.config.ts:54` (config) vs `App.vue:7,22` + `SvgFilters.vue:3`.

The config states, in prose: *"vendor-paper: paper compile/render path; **only loaded on /paper routes**."* The declaration is `"vendor-paper": ["@mkbabb/latex-paper", "@mkbabb/pencil-boil"]`. But `App.vue:22` mounts `<SvgFilters/>` unconditionally in the shell, and `SvgFilters.vue:3` imports `useLineBoil` from `@mkbabb/pencil-boil`. Both packages therefore share a chunk that is in the **entry** graph — so `@mkbabb/latex-paper` is fetched on first paint of `/gallery`, `/v/:slug`, `/equation`, `/morph` and every other route.

Measured: `du -ch node_modules/@mkbabb/latex-paper/dist/*.js` = **176 KB** (`dist/vue.js` alone = 68 009 B).

**Falsifier** — if Rollup's object-form `manualChunks` split by reachability, the paper half would emit separately and the comment would hold. It does not: object form produces one chunk per name. A function-form `manualChunks(id)` returning `"vendor-paper"` only for latex-paper ids would fix it. Exact emitted bytes: **UNPROVEN-NEEDS-LIVE**.

PaperView is the sole legitimate consumer of the chunk and the only route that should pay for it. It is the beneficiary of a mis-grouping every other route funds.

---

### D-3 · **MAJOR** — `variant="glass"` on the back button is inert; PaperView re-implements the glass material by hand

**Provenance** `PaperView.vue:400` (`variant="glass"`) vs `PaperView.vue:582-605` (`.overlay-btn`).

`.overlay-btn` sets `border: 1.5px solid var(--border)`, `background: color-mix(in srgb, var(--background) 92%, transparent)`, `backdrop-filter: blur(8px)`, `-webkit-backdrop-filter: blur(8px)`, `color`, and `box-shadow` — i.e. the entire glass material, hand-rolled, on the very element that requested the design system's `glass` variant.

The variant is real: glass-ui 4.0.0's Button CVA carries `default | solid | primary-audacious | gold-audacious | destructive | outline | secondary | accent | ghost | glass | glass-wash | ai | link` (`dist/button-BNDWhAZb.js`). It resolves to Tailwind utilities plus the `.btn-glass` / `.glass-*` recipes, and those recipes are declared **inside `@layer components`** (`dist/styles/glass/material.css:6` `@layer components {`; `.btn-glass` at `dist/styles/glass/surfaces.css:182`). Vue `<style scoped>` output is **unlayered**. Unlayered author declarations beat every `@layer` in the same origin regardless of specificity — so `.overlay-btn[data-v-…]`'s background / border / backdrop-filter win outright and the variant contributes nothing visible.

The inconsistency is internal, not just against the producer: **the sibling element gets it right.** `PaperView.vue:393` puts `glass-wash` — the post-4.0.0 tier class — on `.overlay-page` and lets the system own the material. Two children of the same `.paper-bottom-overlay` take opposite postures.

**Falsifier** — if glass-ui emitted the variant classes unlayered, they would still lose on specificity ((0,1,0) vs (0,2,0)). The variant loses either way. Only removing the `.overlay-btn` material declarations falsifies this.

Direct hit on the standing precepts `feedback_glass_ui_first_class.md` ("glass-ui is the design system; add variants there, not per-instance") and `feedback_root_styling.md` ("style at root component level, not per-instance overrides").

---

### D-4 · **MAJOR** — the reading-progress feature-detect tests the *engine*, not the *recipe*; the sole fallback is disarmed by a check that cannot see the producer CSS

**Provenance** `PaperView.vue:157-158, 173-182` · `glass-ui/dist/styles/scroll-driven.css:37-48` · `glass-ui/dist/styles/index.css:163`.

```js
const NATIVE_SCROLL_TIMELINE =
    typeof CSS !== "undefined" && CSS.supports("animation-timeline", "scroll()");
…
if (NATIVE_SCROLL_TIMELINE || prm) return;    // :177 — never arms the JS floor
```

The bar has exactly two possible writers: glass-ui's `.scroll-progress` recipe, and `writeProgress()` (`:160-168`). The gate disarms the second whenever the **engine** supports `scroll()` timelines — a fact entirely independent of whether the **recipe** is in the cascade. If `@mkbabb/glass-ui/styles` is dropped, fails, or the recipe is renamed upstream, then on any modern browser both writers are off and the bar sits at the scoped resting `transform: scaleX(0)` (`:494`) for the whole read, silently, with no console signal.

This is not hypothetical risk-mongering: the producer already telegraphs the rename. `lane-frontend.md §5`'s measured export-map diff shows glass-ui 7.0.0 **ADDS `./scroll-progress-rim`** — a new subpath name for this family — while the mega-tranche's declared P0 is the 4→7 uplift. The detector is armed to fail silently at exactly the moment the tranche does its P0 work.

The correct probe is recipe presence — `getComputedStyle(bar).animationName !== "none"` — which subsumes both the engine check *and* the PRM `@media` gate that actually guards the recipe (`scroll-driven.css:37` wraps the `@supports` block in `@media (prefers-reduced-motion: no-preference)`), replacing two hand-maintained proxies with one direct measurement.

**Falsifier** — if glass-ui guaranteed `.scroll-progress` for every `scroll()`-capable engine in perpetuity, engine-detection would be a sound proxy. The 7.0.0 export-map refutes the perpetuity. **Today the break is latent, not live**: at 4.0.0 with `style.css:3` `@import "@mkbabb/glass-ui/styles"`, the recipe is present (`scroll-driven.css:42-46`, reached via `index.css:163`) and `--scroll-progress-scroller: nearest` (`:499`) correctly binds it to `.paper-scroll`. MAJOR for being uplift-armed and invisible to every existing gate (see D-14).

---

### D-5 · **MAJOR** — the producer's `ComputedRef<any>` is threaded unchecked through five consumer seams; `vue-tsc -b` is the only CI type gate and cannot see any of them

**Provenance** producer: `latex-paper/dist/vue/composables/useVirtualSectionWindow.d.ts` →
```ts
activeId: import("vue").ComputedRef<any>;
activeRootId: import("vue").ComputedRef<any>;
```

PaperView destructures both at `:67-85` and threads them into five declared contracts, every one of which is satisfied **vacuously** because `any` is bidirectionally assignable:

| # | Seam | Declared type | Site |
|---|---|---|---|
| 1 | `useScrollNavigation({ activeId })` | `Ref<string \| null>` | `PaperView.vue:99-106` / `useScrollNavigation.ts:7` |
| 2 | `useSidebarFollow({ activeId, activeRootId })` | `Ref<string \| null>` | `PaperView.vue:233-238` / `useSidebarFollow.d.ts:4-5` |
| 3 | `watch(activeId, (id) => { pageMap[id]; sessionStorage.setItem(KEY, id) })` | — | `PaperView.vue:129-142` |
| 4 | `treeIndex.get(activeRootId.value)` | `Map<string, TreeIndexEntry<T>>` | `PaperView.vue:240-245` |
| 5 | `:active-id` / `:active-root-id` props | `string \| null` | `PaperView.vue:322-323, 341-342` → `PaperSidebar.vue:15-16`, `MobileFloatingToc.vue:12` |

A producer change from `string | null` to, say, `{ id: string }` typechecks clean and fails at runtime in seam 3 (`sessionStorage.setItem` stringifies to `"[object Object]"`, poisoning the restore path at `:266-269`) and seam 5 (identity comparisons `activeRootId === section.id` go permanently false, killing the active highlight in both TOCs).

The repo has **no unit runner** — vitest is ABSENT (`lane-frontend.md §0/§1`) — so `vue-tsc -b` is the only automated check on all five, and `any` makes it blind to all five.

**Falsifier** — if `@mkbabb/latex-paper` shipped a narrowed type, the hole would be the producer's alone and not a consumption defect. It ships `any`; verified in the installed `.d.ts`. The consumer-side cure needs no producer change: one `as ComputedRef<string | null>` at the destructure re-arms all five.

---

### D-6 · **MAJOR** — synchronous `sessionStorage` writes in the scroll/teleport hot path, unthrottled, bypassing the repo's own `useSafeStorage`

**Provenance** `PaperView.vue:129-142, 264-270` · `useScrollNavigation.ts:16, 133-160` · `src/composables/useSafeStorage.ts` · `src/lib/scheduler.ts`.

`watch(activeId, …, { immediate: true })` calls `sessionStorage.setItem` / `removeItem` on **every** active-section change. `activeId` is per-flat-section: `useVirtualSectionWindow({ items: flatSections })` (`:77-79`) over `flattenPaperSections(paperSections)` (`:46`) — 13 roots + 51 sections + 35 subsections. It is fine-grained, not root-coarse.

Worst case is concrete and bounded, not speculative. The teleport correction loop calls `opts.recalculate()` once per rAF for up to `MAX_CORRECTIONS = 10` consecutive frames (`useScrollNavigation.ts:16, 133-160`), and each `recalculate()` can flip `activeId` → **up to 10 synchronous, disk-backed storage writes across 10 consecutive animation frames, on the main thread, inside rAF**, precisely during the far-jump the overlay exists to make feel fast.

Two compounding misses:
- `src/lib/scheduler.ts` is this repo's own 3-rung `yieldToMain()` INP floor, written for exactly this class of main-thread work. Not applied.
- `src/composables/useSafeStorage.ts` exports `safeGetItem` / `safeSetItem` / `safeRemoveItem` — the *identical* try/catch PaperView re-inlines as two bare `catch {}` blocks at `:136-139` and `:265-270`. A shipped helper, re-implemented worse (the bare catches also swallow the Safari-private-mode and quota cases without the helper's documented intent).

**Falsifier** — if `sessionStorage.setItem` were asynchronous, or if `activeId` only changed at root boundaries, the hazard shrinks to noise. Neither holds: the Web Storage API is specified synchronous, and `items` is the flat list. Measured long-task cost is **UNPROVEN-NEEDS-LIVE** (SS-13).

---

### D-7 · **MAJOR** — the only global keyboard affordance is inert below 1024 px, and `open()` has two callers with contradictory contracts

**Provenance** `PaperView.vue:113-118, 273` · `usePaperSearch.ts:55-57` · `PaperSearchInput.vue:19-24` · `PaperSidebar.vue:132-136` · `MobileFloatingToc.vue:86-91` · `PaperView.vue:319-320`.

`handleGlobalKeydown` maps ⌘/Ctrl+K to `search.open()`, which sets `isOpen = true` and nothing else. On **desktop** this works: `PaperSearchInput.vue:19-24` watches `isOpen` and focuses the input — a claim I set out to make and then falsified against the tree.

The narrow-viewport half survives. Below 1024 px, `PaperSidebar` (the host of the sidebar `PaperSearch`) is `display: none` (`PaperSidebar.vue:132-136`), and **`HTMLElement.focus()` on an element inside a `display: none` subtree is a no-op** — no focus moves, no `focus` event fires, so `PaperSearchInput`'s `@focus="search.isOpen.value = true"` self-heal never runs either. The mobile alternative is unavailable at that moment: `MobileFloatingToc` renders only when `!mobileTocVisible` (`PaperView.vue:319-320`), i.e. after the inline nav has scrolled out of view, and even then its `PaperSearch` is behind `v-if="searchActive"` which only `openMobileSearch()` sets. And `PaperSearchDropdown` is `v-if="isOpen && !isExpanded && results.length > 0"` (`PaperSearchDropdown.vue:36`) with `results = []` for an empty query (`paperSearchIndex.ts:203-207`) — so nothing renders.

Net: on a <1024 px viewport with a physical keyboard (iPad + keyboard; any narrowed desktop window), ⌘/Ctrl+K flips a global state flag, moves no focus, shows nothing, and leaves `isOpen === true` orphaned.

The contract ambiguity is visible in the two call sites. `MobileFloatingToc.vue:86-91` calls `open()` **and** `mobileSearchRef.value?.focus()` — belt and braces, because its author did not trust `open()` to focus. `PaperView.vue:116` calls only `open()`. PaperView structurally *cannot* do what MobileFloatingToc does: its only child ref is `sidebarRef`, and `PaperSidebar.vue:27-28` exposes `{ sidebarNav }` only — no path to the search input.

**Falsifier** — if `PaperSearchInput` autofocused via a mechanism that survives `display:none` (it does not; `focus()` on a non-rendered element is spec'd a no-op), or if `MobileFloatingToc` rendered unconditionally, or if the modal were teleported to `body`, the claim dies. None holds. Visual confirmation on a real 900 px viewport: **UNPROVEN-NEEDS-LIVE**.

---

### D-8 · **MAJOR** — PaperView's *own* surface is untested; all five e2e tests exercise the producer's virtualizer

**Provenance** `web/e2e/paper-performance.spec.ts:143, 150, 158, 176, 235, 270` · `web/e2e/visual-baseline.spec.ts:32` · no vitest (`lane-frontend.md §0/§1`).

The five tests: *initial paper render stays windowed* · *forward scrolling never regresses the page indicator* · *far TOC jumps land on DFT… without over-mounting* · *long scroll keeps mounted sections bounded* · *appendix proofs, code listings and bibliography render canonically*. The first four test `useVirtualSectionWindow` + `useScrollNavigation`; the fifth tests latex-paper's renderer.

Zero coverage of what PaperView itself contributes: the I.δ progress bar (`:149-187`, ~35 LOC of dual-path logic), the `navStack` back button (`:397-409` + `useScrollNavigation.ts:202-222`), the ⌘/Ctrl+K handler (`:113-118`), the sessionStorage restore (`:264-270`), the mobile-TOC IntersectionObserver (`:247-257`). Probe: `grep -rn "progress|Undo2|overlay-back|navStack|paper-active-section|sessionStorage" web/e2e/*.spec.ts` → only `visualization-crud.spec.ts` auth-token rows.

**Falsifier** — `visual-baseline.spec.ts:32` snapshots `/paper`, so a *visible* regression could in principle be caught. It cannot catch D-4: the bar's correct resting state at the top of the page is `scaleX(0)`, which is byte-identical to the broken state. The visual baseline is blind to the progress bar **by construction**, at the exact viewport it screenshots.

---

### D-9 · **MINOR** — `style.css:121/126` silently rebinds glass-ui's `--section-color-5` ramp stop to the fourier viz amber, in hsl, at `:root`

**Provenance** `web/src/style.css:113-127` · `glass-ui/dist/styles/tokens/color-radius.css:246` · `tokens/dark-arm.css:100` · `tokens/light-dark.css:131` · `glass-ui/dist/styles/theme/bridges.css:168-180`.

The comment block at `style.css:113-119` documents the `--viz-amber` WCAG darken and *only* that. The block that follows declares two properties:

```css
:root  { --viz-amber: hsl(35 76% 35%); --section-color-5: hsl(35 76% 35%); }
.dark  { --viz-amber: hsl(37 73% 67%); --section-color-5: hsl(37 73% 67%); }
```

`--section-color-5` is an **undocumented second override** with no rationale anywhere in the file. Three problems, in ascending order of interest to value.js:

1. **Blast radius is `:root`, not the paper.** glass-ui bridges the ramp app-wide (`theme/bridges.css:168-180`, `--color-section-N`), and `IconChip` consumes `var(--section-color-${section}, …)` (`dist/IconChip-BDw1j5mu.js:28`). Any glass-ui surface that asks for section 5 now gets the fourier amber.
2. **Colour-space downgrade of one stop in a perceptually-authored ramp.** glass-ui authors all 13 stops in oklch (`color-radius.css:241-253`); this patch rewrites stop 5 in hsl and leaves the other twelve oklch. Ramp uniformity is an oklch property; the patch is applied in a space that does not preserve it. **This is the value.js interest** — the ramp's contract is exactly the kind of colour-space invariant value.js exists to hold, and the repair here was made by hand in the wrong space.
3. **It is load-bearing for the hand-rolled parser, which is the F.W2 target.** `lib/colors.ts:22-54` (`cssVarToHex`) recognises `#hex`, `hsl(...)`, bare `h s% l%`, and `rgb(...)` — and **nothing else**, falling through to `#888888`. It cannot parse oklch. `resolveVizColors()` (`colors.ts:87-93`) reads `--viz-amber` through it. So the hsl override is not merely a WCAG patch: it is what keeps `cssVarToHex` from returning grey. The comment does not say so, and a future editor restoring the token to oklch would silently grey out the amber viz channel.

**Falsifier** — had the override been scoped to `.paper-sidebar` / `.floating-toc`, claim 1 dies. It is at `:root` / `.dark`. Had `cssVarToHex` an oklch arm, claim 3 dies. It has none (read whole, 117 lines).

---

### D-10 · **MINOR** — the `--section-color-N` ramp is consumed with no fallback arm at exactly zero headroom

**Provenance** `PaperSidebar.vue:77, 96, 112` · `MobileFloatingToc.vue:154` · glass-ui `tokens/color-radius.css:241-253` (13 stops, 0–12) · `paper/fourier_paper.tex` · latex-paper `dist/chunk-A7GY23HR.js` (`buildSections`).

The root count is **exactly 13**, derived from the TeX plus the shipped transform:
- `fourier_paper.tex:93` `\section{Introduction}` precedes the first `\chapter` (`:118`). latex-paper promotes it: `if (!parent || range.level === 1 && !levelParents.has(0)) topLevel.push(section)`. → 1 root.
- 11 `\chapter`s (`:118, 558, 1725, 1895, 2272, 2346, 2803, 3000, 3123, 3147, 3239`), `LEVEL_MAP.chapter = 0`. → 11 roots.
- `buildBibliographySection(…) { sourceLevel: 0 }` is pushed onto `topLevel`. → 1 root.
- `cleanEmpty` only deletes empty `subsections` arrays; it never removes a node.

13 roots ⇒ `si ∈ [0, 12]`. The ramp is `--section-color-0` … `--section-color-12`. **Exactly consumed; zero headroom.** One added `\chapter` — a content edit to a `.tex` file, no code change, no review by anyone reading TypeScript — produces `var(--section-color-13)`.

The consequence is silent because fourier omits the fallback that **both** producers supply at the identical token:
- latex-paper: `src/vue/theme.css:476, 481, 493, 498, 511, 512` — always `var(--_section-color, hsl(var(--section-heading)))`.
- glass-ui `IconChip`: `var(--section-color-${section}, var(--muted-foreground))`.
- fourier, four sites: bare `var(--section-color-${si})`.

So on the 14th chapter the *article headings* degrade gracefully (latex-paper's fallback fires) while the *TOC* declarations go invalid-at-computed-value-time → `unset` → `inherit`, quietly reverting the active entry to ambient foreground. Two halves of the same UI diverge, and only the half fourier wrote breaks.

**Falsifier** — ≤ 12 roots means headroom; ≥ 14 means it is already live. It is exactly 13, and the arithmetic is reproducible from the two sources cited. Runtime `paperSections.length` (from a built `virtual:paper-content`) is **UNPROVEN-NEEDS-LIVE**; the derivation is proven from the TeX + the shipped transform.

---

### D-11 · **MINOR** — two dead props in the contract PaperView owns, one of them a gratuitous type widening

**Provenance** `PaperView.vue:343` → `PaperSidebar.vue:20` · `PaperView.vue:326` → `MobileFloatingToc.vue:16`.

- `PaperSidebar` declares `treeIndex: Map<string, any>` as a **required** prop. `grep -n "treeIndex" PaperSidebar.vue` → line 20 only. Zero uses in script or template.
- `MobileFloatingToc` declares `renderTitle: (title: string) => string` as a **required** prop. `grep -n "renderTitle" MobileFloatingToc.vue` → line 16 only. It interpolates `{{ section.title }}` raw at `:120, :163, :174`.

The `treeIndex` row compounds: `useTreeIndex(treeNodes)` returns `Map<string, TreeIndexEntry<TreeNode>>`, and `TreeIndexEntry` is **exported** from `@mkbabb/latex-paper/vue` (`dist/vue/index.d.ts:4`). The `any` is unforced — the consumer widened a precisely-typed producer surface for a prop it does not read.

The `renderTitle` row carries a latent divergence: `PaperSidebar` typesets titles through `v-html="renderTitle(...)"` (`:80, :100, :116`); `MobileFloatingToc` does not. **Today the impact is nil** — the paper's only four math-bearing titles (`fourier_paper.tex:1201, 1440, 1603, 2560`) are all `\subsection`s, a depth `MobileFloatingToc` never renders (it goes root → `section.subsections` = chapters → `\section`s). The first `$…$` in a `\chapter` or `\section` title makes mobile show raw TeX where desktop typesets.

**Falsifier** — a use of either symbol anywhere in the two files. Full reads confirm none. The divergence half is falsified for the *current* corpus by the depth check above, and stated as latent accordingly.

---

### D-12 · **MINOR** — `class="mobile-toc-link"` is dangling

**Provenance** `PaperView.vue:367`.

`grep -rn "mobile-toc-link" web/src/ node_modules/@mkbabb/glass-ui/dist/styles/ node_modules/@mkbabb/latex-paper/src/` → **one** hit: the usage itself. No rule in PaperView's own `<style scoped>` (which declares `.paper-root`, `.paper-scroll`, `.paper-progress-*`, `.teleport-overlay`, `.paper-article`, `.paper-grid`, `.paper-bottom-overlay`, `.overlay-*`, `.slide-down-*`, `.fade-scale-*` — and not this), none in `style.css`, none in glass-ui's styles, none in latex-paper's theme.

The mobile inline TOC's 13 root links therefore render with `Button variant="link"` defaults and no local styling, while the desktop sidebar's equivalents get the full `.sidebar-link` treatment (`PaperSidebar.vue:216-233`) *and* a global `:focus-visible` ring (`style.css:135-142` lists `.sidebar-link`, `.floating-toc-item`, `.callout-btn`, `.gallery-card` — **not** `.mobile-toc-link`). So the mobile inline TOC is the one navigation surface in the paper with no focus ring.

**Falsifier** — a Tailwind `@utility mobile-toc-link` or a global rule outside the searched set. Searched `src/`, glass-ui styles, latex-paper theme.

---

### D-13 · **MINOR** — one component owns the app's KaTeX vocabulary and does not export it; four of five KaTeX consumers bypass `useKatex`

**Provenance** `PaperView.vue:26-38` · `latex-paper/dist/vue.js` (`useKatex`) · `EquationPanel.vue:13`, `EquationResult.vue:6`, `ConvergencePlot.vue:6`, `useCoeffHover.ts:7`.

PaperView builds the app's TeX macro dictionary — `...extractedMacros` plus `\deriv \ihat \jhat \khat \ehat \dott \leftrightarrow \Leftrightarrow` — and hands it to `useKatex`. It is the **only** `useKatex` caller (`grep -rn "useKatex" web/src/` → PaperView only). The other four KaTeX render sites `import katex from "katex"` directly and get neither the macros nor the cache, so `\dott` in an equation-panel string renders as an error where the same string in the paper renders correctly.

Two producer hazards PaperView is the sole payer for, both confirmed in the shipped source:
- **The module cache is not keyed by macros.** `var cache = new Map()` at module scope; keys are `` `i:${tex}` `` / `` `d:${tex}` `` only. A second `useKatex(otherMacros)` consumer rendering the same string first poisons PaperView's output. Latent while PaperView is the only caller — but that is a one-line change away.
- **The cache is unbounded and outlives the route.** Module scope means every math string rendered on `/paper` is retained for the tab's lifetime, surviving both the virtual window's unmounting of sections and navigation away from `/paper`. The `content-visibility` discipline shrinks the DOM; the cache does not shrink with it.

**Falsifier** — a macros-keyed cache, or the other four consumers routing through `useKatex`, dissolves both. Neither holds. Retained-bytes magnitude: **UNPROVEN-NEEDS-LIVE** (SS-13).

---

### D-14 · **MINOR** — peer ranges are already violated at the pinned versions, before any 4→7 work *(extends `lane-frontend.md §5`)*

Measured from installed `package.json` files:

| Consumer | Declared peer | Installed | State |
|---|---|---|---|
| `@mkbabb/glass-ui@4.0.0` | `"@mkbabb/value.js": "^0.10.0 \|\| ^0.11.0"` | **0.13.0** | **VIOLATED** — and the WT bump *created* it (`lane-frontend.md §1`: `^0.10.0 → ^0.13.0`) |
| `@mkbabb/glass-ui@4.0.0` | `"@lucide/vue": "^1.16.0"` | `@lucide/vue@1.20.0` present **and** `lucide-vue-next@1.0.0` present | forked icon substrate **at the pinned version**; `PaperView.vue:23` imports from the non-peer package |
| `@mkbabb/latex-paper@0.2.1` | `"katex": "^0.16"` | **0.17.0** | major-version violation |
| `@mkbabb/latex-paper@0.2.1` | `"vite": "^6.0 \|\| ^7.0"` | **8.0.16**, and its `./vite` plugin is used at `vite.config.ts:7-19` | major-version violation on a build-time plugin |

**Two explicit corrections to the corpus.** `lane-frontend.md §5` records the value.js floor only as *"7.0 peers value.js ^4.0.0; installed 0.13.0"* and files `lucide-vue-next → @lucide/vue` as a **7.0.0** break. The tree says both are live **at 4.0.0**: the installed glass-ui already declares an unsatisfied value.js peer, and already peers the renamed icon package. Neither latex-paper peer row appears anywhere in the corpus.

**Falsifier** — latex-paper marks its katex/vite/vue peers `optional: true` in `peerDependenciesMeta`, so npm does not fail the install; the ranges remain the producer's declared compatibility statement and katex 0.16→0.17 is a major. glass-ui's value.js and `@lucide/vue` peers are **not** optional. Whether katex 0.17 changes any `renderToString` behaviour latex-paper 0.2.1 relies on: **UNPROVEN-NEEDS-LIVE**. Bundle impact of the dual icon packages is nil (both tree-shake per-icon); the cost is dev-tree weight and type identity, and I do not inflate it.

---

### D-15 · **MINOR** — the PRM gate switches off an information display, not a motion

**Provenance** `PaperView.vue:174-177, 313-315, 494` · `glass-ui/dist/styles/scroll-driven.css:37`.

Both writers stand down under `prefers-reduced-motion: reduce`: the JS floor by explicit gate (`:177`), the native recipe because glass-ui wraps its `@supports` block in `@media (prefers-reduced-motion: no-preference)`. The bar therefore rests at `scaleX(0)` (`:494`) for the entire read.

A progress bar's *transition* is motion; its *fill* is a state readout. The PRM-correct posture is to write the value without animating it — `writeProgress()` already does exactly that (a direct `style.transform` assignment with no transition, `:167`), so the compliant behaviour is *strictly cheaper* than the current one: arm the listener under PRM and skip only the CSS animation.

Compounding: the track carries no `role="progressbar"`, no `aria-valuenow`, no label (`:313-315`), so assistive tech gets nothing either. Reading position is conveyed only to sighted non-PRM users.

**Falsifier** — if the bar is decorative by design, PRM-off is correct. The component ships a *separate* textual readout (`pg {{ currentPage }}/{{ totalPages }}`, `:392-395`) which is the genuinely accessible channel, so the information is not lost outright. That is why this is MINOR and not MAJOR.

---

### D-16 · **MINOR** — the same `scrollContainer` ref is handed to two consumers with contradictory lifetime assumptions

**Provenance** `PaperView.vue:276-289` vs `PaperView.vue:87-97` + `latex-paper/dist/vue.js` (`useClickDelegate`).

PaperView's own code treats `scrollContainer` as **re-bindable**: `watch([scrollContainer, sectionWindowRoot], …)` disconnects and rebuilds the ResizeObserver on change (`:220-230, 276-289`). The producer composable it hands the *same* ref to treats it as **mount-stable**:

```js
onMounted3(() => { const el = options.container.value; if (el) el.addEventListener("click", handleClick); });
onUnmounted3(() => { const el = options.container.value; if (el) el.removeEventListener("click", handleClick); });
```
— no watcher, no rebind.

Exactly one belief is right. If the ref can change, every `.paper-ref` cross-reference click stops working silently after the change while scroll measurement keeps working (a maximally confusing partial failure). If it cannot, PaperView's watcher is dead weight and its `if (!scroller || !root)` branch (`:278-282`) is unreachable.

**Falsifier** — `.paper-scroll` carries no `v-if` / `v-show` / `:key`, so today the ref only transitions `null → el → null`. Latent, and the trigger is a one-line template edit.

---

### D-17 · **MINOR** — `_scrollTo` is a mutable module-`let` used as a load-bearing wire, and the reorder that breaks it is invisible

**Provenance** `PaperView.vue:51, 60, 96, 109`.

```js
let _scrollTo: (id: string) => void = () => {};     // :51
…  scrollToId: (id) => _scrollTo(id),               // :60  (PAPER_CONTEXT)
…  scrollTo:   (id) => _scrollTo(id),               // :96  (useClickDelegate)
_scrollTo = navigateTo;                             // :109
```

Nothing between `:51` and `:109` requires the late binding. `useKatex` (`:38`), `useVirtualSectionWindow` (`:77`) and `useScrollNavigation` (`:99`) all take explicit options, and none injects `PAPER_CONTEXT` — verified against `dist/vue/index.d.ts` and the compiled bodies: **only `usePaperReader` injects it**, and PaperView does not use `usePaperReader`. Moving `provide(PAPER_CONTEXT, …)` (`:63`) and `useClickDelegate` (`:87`) below `:109` lets both take `navigateTo` directly and deletes the `let`.

Failure mode if the order is ever disturbed: every TOC click and every cross-reference degrades to the silent no-op `() => {}`. No throw, no console, and no test would catch it (D-8).

**Falsifier** — if any of the three composables injected `PAPER_CONTEXT`, the early `provide` would be mandatory and the `let` would be the correct workaround for a genuine cycle. None does.

---

### D-18 · **MINOR** — `MobileFloatingToc` mutates a DOM node it does not own, handed down by PaperView as a prop

**Provenance** `PaperView.vue:327` · `MobileFloatingToc.vue:45-59` · `PaperView.vue:458-465`.

PaperView passes `:scroll-container="scrollContainer"` and the leaf writes to it: `props.scrollContainer.style.overflow = open ? 'hidden' : ''`, restoring on unmount (`:55-59`). `.paper-scroll`'s stylesheet sets `overflow-y: auto; overflow-x: hidden` (`:461-462`); the child writes the *shorthand* and clears the *shorthand*, which happens to restore correctly.

The defect is contract shape, not a live break. The scroll lock belongs to the scroller's owner — PaperView — not to a leaf that receives the element by prop. There is no lock counter: if a second consumer ever locks the same node, the first `''` restore releases it for both. Vue's own idiom here is `provide`/`inject` of a lock *function*, or an `expose`d method on the owner, not raw element hand-down.

**Falsifier** — it works today and it cleans up on unmount. This is an ownership-inversion finding, filed as MINOR precisely because it is currently correct.

---

### D-19 · **MINOR** — `sections = computed(() => paperSections)` wraps a frozen build-time constant in a reactive effect

**Provenance** `PaperView.vue:120` · `lib/paperContent.ts:7`.

`paperSections` is a static named export of `virtual:paper-content`, generated at build by the latex-paper vite plugin, never reassigned (`grep` → one export site, no writer). The computed creates an effect and a dependency edge for a value that cannot change, and is then passed as `:sections` to two children (`:321, :337`) — one of which (`MobileFloatingToc`) captures `props.sections` non-reactively anyway (`:68`, into `useSidebarState`'s options), so the reactivity is discarded at the far end.

**Falsifier** — if `paperSections` were ever swapped (locale variant, HMR of the TeX), the computed would be load-bearing. The virtual module is regenerated by a full plugin reload, not by reassignment.

---

## §2 · SUPERLATIVES *(L-18 runs both ways — each carries its own falsifier)*

### S-1 · **Zero shadow.** The one paper-substrate consumer in the tree that re-forks nothing

`lane-frontend.md §4` flags nine shadow components / ~1 990 LOC across fourier, including 🟡 `PaperSearch.vue` + `search/` (832 LOC vs an unimported `glass-ui/search`). **PaperView carries no shadow flag and earns it.** It imports 8 symbols from `@mkbabb/latex-paper/vue` — `useKatex`, `PAPER_CONTEXT`, `flattenPaperSections`, `useClickDelegate`, `useSidebarFollow`, `useTreeIndex`, `useVirtualSectionWindow`, `PaperContext` — and re-implements none of them. Virtualization, KaTeX, tree indexing, sidebar-follow and click delegation are all producer-owned. Its own 685 lines are route shell, layout, and four small app-specific behaviours.

*Falsifier* — a local reimplementation of any producer composable. `grep` over `components/paper/` finds one local composable, `useScrollNavigation.ts`, and it is genuinely app-specific (teleport-overlay far-jump policy with a correction loop) with no producer counterpart at 4.0.0 or 7.0.0.

### S-2 · **Textbook token-first consumption of `.deferred-section`, with a written proof of the load-bearing part**

`PaperArticleWindow.vue:74` applies glass-ui's canonical `.deferred-section` class and `:167` retunes **only** the token — `--deferred-section-size: 1200px` against the utility's `30rem` default. The producer rule is `content-visibility: auto; contain-intrinsic-size: auto var(--deferred-section-size, 30rem)` (`glass-ui/dist/styles/utilities/base.css:477-479`).

The comment at `:144-166` then does the thing almost no consumer does: it states *why* the `auto` prefix is load-bearing — the browser remembers each section's real painted size and reports **that** for `offsetHeight`, which is exactly what `useVirtualSectionWindow`'s `measureSection` reads to build its spacer math; a plain estimate would corrupt scroll positioning. It also names the ordering guarantee that makes it safe (sections measured on a post-mount rAF, i.e. after first paint). That is a correct, verified, non-obvious interaction between a producer CSS recipe and a producer JS composable, documented at the seam.

*Falsifier* — I re-read the producer rule to check the `auto` prefix is actually there. It is (`base.css:479`). The claim in the comment is true, not aspirational.

### S-3 · **The `--scroll-progress-scroller: nearest` binding is the exact override the producer documents**

`glass-ui/dist/styles/scroll-driven.css:33-35`: *"the scroller is the nearest ancestor block scroller (`root` by default; override via `--scroll-progress-scroller`)"*, implemented as `animation-timeline: scroll(var(--scroll-progress-scroller, root) block)` (`:45`). `PaperView.vue:499` sets `nearest` on the bar, whose only scrollable ancestor is `.paper-scroll` (`:458-465`), and `:474-483` sticks the track at `top: 0` with `margin-bottom: -2px` so a 2 px overlay costs zero layout. The bar lives *inside* the scroller it tracks — which is the whole reason the override exists.

The dual-path-single-writer structure is right even where D-4 faults its detector: two writers, explicitly never both armed, with the discipline named in prose at `:149-155` and `:303-312`. Most consumers of a scroll-progress recipe ship the JS listener unconditionally and double-drive the same property.

*Falsifier* — if `.paper-scroll` were not a scroll container, `nearest` would resolve past it to the root and the bar would track the wrong axis. It sets `overflow-y: auto` (`:461`).

### S-4 · **Every `z-index` and every timing function is a producer token; zero magic numbers**

`PaperView.vue` uses `var(--z-content)` (`:432`), `var(--z-overlay)` (`:477, :505`), `var(--z-controls)` (`:573`) and `var(--ease-out-expo)` / `var(--ease-standard)` at `:512, :600-604, :655-656, :673`. All six resolve at the pinned version: `glass-ui/dist/styles/tokens/scheme-motion.css:335-341` (`--z-content: 10`, `--z-controls: 20`, `--z-overlay: 50`) and `:216, :219` (the ease aliases over `--motion-ease-*`). The `A.W3.d` annotations record the migration from raw beziers and from `transition: all` to named properties — `:598-604` names five properties explicitly rather than paying the `all` tax.

*Falsifier* — one undefined token would make the declaration invalid at computed-value time. `grep -rn -- "--z-content:|--z-overlay:|--z-controls:|--ease-out-expo:|--ease-standard:"` over `glass-ui/dist/styles/` returns all five; over `web/src/` returns none, so there are no local shims masking a producer gap.

### S-5 · **Contract-v2-clean specifier hygiene**

Every producer import is a bare specifier resolved through the package's own `exports` map — `@mkbabb/latex-paper/vue`, `@mkbabb/latex-paper/theme`, `@mkbabb/glass-ui/button`, `lucide-vue-next`. No `dist/` path reaches into a sibling, no `development` condition, no vendored copy. `vite.config.ts:22-25` deliberately carries **no** `@mkbabb/*` aliases, citing `docs/precepts/cross-repo-dev-resolution.md §2.2/§2.4`. glass-ui is consumed by subpath (`/button`) rather than the root barrel, which is what makes the `vendor-ui` split effective at all. Zero direct `reka-ui`, zero local shadcn copies.

*Falsifier* — a single dist-path import or alias. `grep` over the paper subtree and `vite.config.ts:22-25` and `:66-69`: none.

### S-6 · **Upstream pressure instead of a fork, at the one place the producer had to change**

`PaperSidebar.vue:30-45` delegates expand/collapse state to glass-ui's `useSidebarState` and supplies a `getChildren: (n) => n.subsections` override, because `PaperSectionData` nests under `subsections` rather than the canonical `children`. The comment records that the producer composable **was augmented in the same commit** to accept the override, "symmetric with `useTreeIndex` / `useScrollTracker`". The installed producer confirms the surface exists (`glass-ui/dist/sidebar.js`: `let u = l?.getChildren ?? ((e) => e.children)`), and latex-paper's `useTreeIndex` carries the identical option shape (`dist/vue/tracking/useTreeIndex.d.ts`). Two producers, one option name, no fork — the correct direction of pressure, applied twice.

*Falsifier* — if `getChildren` had been unavailable and the state duplicated locally, this would be a shadow. It is available in both producers, at the pinned versions.

### S-7 · **Zero API coupling — R6-8's ambiguity is structurally unreachable here**

`/paper` reads no operation. All content is build-time (`lib/paperContent.ts:7` re-exports from `virtual:paper-content`; `vite.config.ts:7-19` compiles `../paper/fourier_paper.tex` at build). There is no `lib/api.ts` import, no `fetch`, no store, no route-param load anywhere under `components/paper/`.

The consequence is worth stating positively for F.W5: the adjudicated defect at intake row **R6-8** — an operation record embedding derived client back-references, so a mutation cannot be attributed to one side of the seam — has **no PaperView surface**. When F.W5 designs the shared-provenance contract that keeps operation identity independent of client identity, `/paper` is the control: a route whose entire content contract is compile-time and therefore attributable by construction.

*Falsifier* — one network call from the paper subtree. Probed and absent.

---

## §3 · Corpus reconciliation — where this read contradicts the hitherto record

| # | Corpus claim | This read | Disposition |
|---|---|---|---|
| C-1 | `lane-frontend.md §8`: *"JS gate — `paper/PaperView.vue:176` — `window.matchMedia?.(…)` — **smooth-scroll opt-out**"* | `:173-182` is `armProgressFallback` — the **reading-progress-bar** gate (D-4, D-15). The actual smooth scrolls are `useScrollNavigation.ts:191` and `:242` (`behavior: "smooth"`), and **neither is PRM-gated**. | **CONTRADICT.** The census both miscites the mechanism and, in doing so, credits the paper route with PRM coverage it does not have. The §8 coverage gap is wider than recorded: add `useScrollNavigation.ts:191,242` to the two ungated rAF clocks already booked (`stores/animation.ts`, `ConvergencePlot.vue`). |
| C-2 | `lane-frontend.md §5`: value.js floor recorded only as *"7.0 peers `^4.0.0`; installed 0.13.0"* | `@mkbabb/glass-ui@4.0.0` peers `"@mkbabb/value.js": "^0.10.0 \|\| ^0.11.0"`; installed **0.13.0**. The peer is violated **at the pinned version**, and the WT bump created it. | **EXTEND** (D-14). The value.js leg is not merely a future 4→7 obligation; it is a live unsatisfied peer today. |
| C-3 | `lane-frontend.md §5`: `lucide-vue-next → @lucide/vue` filed as a **7.0.0** break (35 sites) | glass-ui **4.0.0** already peers `"@lucide/vue": "^1.16.0"`; `@lucide/vue@1.20.0` and `lucide-vue-next@1.0.0` are **both** installed. `PaperView.vue:23` imports from the non-peer one. | **EXTEND** (D-14). Present at the pin, not deferred. Bundle cost nil (tree-shaken); dev-tree and type-identity cost real. |
| C-4 | Corpus is silent on `@mkbabb/latex-paper` peers | 0.2.1 peers `katex ^0.16` (installed **0.17.0**) and `vite ^6.0 \|\| ^7.0` (installed **8.0.16**, and its `./vite` plugin is used at build). | **NEW** (D-14). Two major-version peer violations on the package that owns the entire paper route, unrecorded anywhere. |
| C-5 | `lane-frontend.md §9 item 5`: value.js consumer surface *"tiny (5 sites) — the cheapest leg of the deadlock"* | True by call site; false by shipped bytes. `vendor-math` welds 142 KB of value.js onto `/paper`, which has zero value.js call sites. | **EXTEND** (D-1). Migration cost ≠ presence cost; the chunk config decouples them. |
| C-6 | `CENSUS-2026-08-03.md` / `lane-frontend.md §4`: `PaperSearch.vue` + `search/` flagged 🟡 CANDIDATE SHADOW vs unimported `glass-ui/search` | Not PaperView-owned. PaperView consumes only `usePaperSearch` (`:111`) and passes the state object down. | **AGREE, out of scope.** Noted so the F.W4 per-component ledger does not double-book the shadow against PaperView. |
| C-7 | intake `R5-7` / `R6-5`: native `li v-for` at `PaperSidebar.vue:65, 87, 105`; component-callsite-keyed loop evidence is blind to native element loops | Reproduced line-for-line on this read. PaperView is the supplier of the `sections` array those three loops iterate (`:120 → :337`). | **ADOPT.** F.W4's D/L/C audit must count native element loops for this component pair or it inherits the blind spot the intake cured. |
| C-8 | intake `R6-8`: operation↔client leaf non-isolability, CARRY → F.W5 | Structurally unreachable from `/paper` — zero API surface (S-7). | **ADOPT with a positive note.** `/paper` is the clean control case for the F.W5 shared-provenance contract. |

---

## §4 · Ledger

**Defects 19** — MAJOR 8 (D-1 … D-8) · MINOR 11 (D-9 … D-19).
**Blockers 0.** Nothing here crashes a shipping path or blocks the tri-package transaction. D-4 is the closest: a silent failure *armed* to fire during the tranche's declared P0 uplift, invisible to the visual baseline by construction — MAJOR, not BLOCKER, because at the pinned versions the recipe is present and the bar works.
**Superlatives 7** (S-1 … S-7).

**Cheapest high-value repairs, in order.** (1) D-5 — one `as ComputedRef<string | null>` at `:67-85` re-arms five type seams at zero producer cost. (2) D-11 — delete two dead required props. (3) D-1/D-2 — swap object-form `manualChunks` for the function form; both bundle defects fall to one change. (4) D-4 — replace the engine probe with `getComputedStyle(bar).animationName !== "none"`, which subsumes the PRM gate too and de-arms the uplift trap. (5) D-6 — route the two storage calls through the repo's existing `useSafeStorage` and throttle the watcher.

**UNPROVEN-NEEDS-LIVE, for SS-13** — post-minify chunk deltas (D-1, D-2); long-task cost of the storage writes under a teleport (D-6); the narrow-viewport ⌘K dead-end at a real 900 px viewport (D-7); runtime `paperSections.length` from a built `virtual:paper-content` (D-10); KaTeX cache retention magnitude (D-13); katex 0.16→0.17 behavioural delta inside latex-paper 0.2.1 (D-14).

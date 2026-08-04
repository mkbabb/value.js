claude-opus-5[1m]

# CHALLENGE · `DarkModeToggle.vue` · axis C — CONSUMPTION

**Target** `fourier-analysis/web/src/components/layout/DarkModeToggle.vue` (109 lines)
**Axis** how this component consumes value.js `0.13.0` · keyframes.js `4.3.0` · glass-ui `^4.0.0` · the 45-operation fourier API; props/emits contract; integration seams.
**Method** static + source-derived + **shipped-build-derived** (`web/dist/`, built 2026-06-12, present in the read-only tree) + installed-package `.d.ts`/dist reads + one `node` evaluation of the installed value.js. No browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Law** `/Users/mkbabb/Programming/fourier-analysis` read-only; the single write is this file.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every row below — defect and superlative alike (L-18 runs both ways) — carries severity, `file:line` provenance, and its own falsifier.

**Verdict: 18 defects (3 BLOCKER · 5 MAJOR · 8 MINOR · 2 INFO) · 6 superlatives.** The component's consumption of the constellation is *inverted*: it eagerly ships **439 KB of Fourier JSON and a 349 KB value.js+KaTeX chunk on the critical path of every route** in order to realize, at runtime, **the identity function** — while the one library affordance it genuinely needs (a reduced-motion carve) is left at its default.

---

## §0 — Read set (whole-file reads, read-only)

| File | Why |
|---|---|
| `web/src/components/layout/DarkModeToggle.vue` (109) | target |
| `web/src/components/decorative/FourierMorphSvg.vue` (41) | direct import `:19` |
| `web/src/composables/useFourierMorph.ts` (230) | direct import `:20` |
| `web/src/lib/svg-fourier.ts` (154) | direct import `:21` |
| `web/src/lib/easings.ts` (127) | transitive — the value.js edge |
| `web/src/assets/fourier-paths/{sun,moon}.json` (225 687 + 224 944 B) | direct imports `:23-24` |
| `node_modules/@mkbabb/glass-ui/dist/composables/dark/useGlobalDark.d.ts` + `dist/useGlobalDark-C28t0VWJ.js` | the `:18` contract, source-of-truth |
| `node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts` (2 028+) | the 4.3 `Animation` contract |
| `node_modules/@mkbabb/value.js/dist/index.d.ts` (51) | the 0.13 export surface |
| `web/{package.json, vite.config.ts, index.html, src/main.ts, src/App.vue, src/router/index.ts}` · `AppHeader.vue` · `lib/colors.ts` | the seams |
| `web/dist/index.html` + `web/dist/assets/*.js` | the shipped-build evidence |

**API axis, stated as an absence:** this component imports **zero** of `lib/api.ts` and adds **zero** client edges to the 45-operation surface (adopted denominator: *45 total / 30 public-non-admin / 13 admin*, intake row **X-3**; client edges 36 with 9 gaps, **R3-7c**). No operation↔client leaf coupling of the **R6-8** kind is reachable from here. That is **correct** — a theme toggle has no business on the API — and it is recorded so the axis is closed by evidence, not by silence.

**Hitherto corpus folded (not re-invented):** `lane-frontend.md:177` (census row, "SHADOW, see §4"), `:419-421` (the CHARACTERFUL-SHADOW ruling — *"keep, but reconcile against the 7.0.0 props/tokens rather than let it drift"*), `:59-60` + `:479-481` + `:490` (peer floors + the tri-package deadlock), `:610` (the dark-mode seam), `:619` (the 8-block PRM census), `CENSUS-2026-08-03.md:38` (value.js = 5 imports / 4 files / 6 symbols, easing-only), `:95` (CHARACTERFUL — `DarkModeToggle`), `:105-108` (THE RESOLUTION DEADLOCK). Contradictions with the corpus are marked **↯** and argued explicitly.

---

## §1 — Defect register

### 🔴 C-1 · BLOCKER · 89.4 % of the eager entry chunk is this component's two JSON imports

**Provenance** `DarkModeToggle.vue:23-24` (`import sunData from "@/assets/fourier-paths/sun.json"`, same for moon) → `AppHeader.vue:6,141` → `App.vue:6,25` → `main.ts:3` — **entirely static, entirely eager**. All 7 component routes are lazy (`router/index.ts:45,62,72,…` all `() => import(...)`), so this chain is the *entry* graph.

**Measurement (shipped build, `web/dist/assets/index-dWFIqpKn.js`)** — six `JSON.parse('…')` literals, byte-measured:

| offset | bytes | payload |
|---|---|---|
| 25 901 | 18 859 | sun `original` |
| 44 778 | 12 896 | sun `decomposition` |
| 57 692 | 188 150 | sun `partial_sums` |
| 251 149 | 18 704 | moon `original` |
| 269 871 | 13 485 | moon `decomposition` |
| 283 374 | 187 006 | moon `partial_sums` |

**439 100 B of 491 280 B = 89.4 % of the eager entry chunk**, fetched on every route including `/paper`.

**Worse — most of it is provably never read.** `prepareFourierShape` (`svg-fourier.ts:76-88`) touches only `data.levels` and `data.partial_sums`; `interpolateAtHarmonicLevel` (`:125-154`) only `data.levels` + `pointsByLevel`. `original`, `decomposition.components` (101 entries of `{index,coefficient,amplitude,phase}`), `eval_points`, `n_samples`, `n_eval` are dead. And the morph never descends below `lowLevel: 5` (`useFourierMorph.ts:63`, `:175` `Math.max(lowLevel, level)`), so `partial_sums["1"|"2"|"3"]` is dead too:

```
per shape:  original 18 859 + decomposition 12 896 + eval_points 5 633 + levels 1-3 ≈ 56 281  ≈  93 669 B dead
both shapes:                                                                          ≈ 187 338 B dead  (38 % of the entry chunk)
```

**Falsifier** — any of these kills the row: (a) a `web/dist` rebuild whose entry chunk does *not* contain the sun/moon literals; (b) a code path in the read set that dereferences `original` / `decomposition` / `eval_points` from these two files (grep of `svg-fourier.ts` + `useFourierMorph.ts` + the component: none); (c) a morph config passed to `useFourierMorph()` with `lowLevel < 5` — `DarkModeToggle.vue:37` calls `useFourierMorph()` with **no options**, so `DEFAULT_MORPH_CONFIG` binds.

**Note on the shipped build's age** — `dist/` is dated 2026-06-12 and HEAD is `cd26c653` (2026-07-03, intake **X-4**). The *source* imports at `:23-24` and the JSON byte sizes are live-current; the chunk figures are therefore corroborating rather than sole evidence. Re-run `npm run build` to refresh. **UNPROVEN-NEEDS-LIVE** only for "the current build still measures 89.4 %"; the import topology is proven from source.

---

### 🔴 C-2 · BLOCKER · this component alone drags value.js (+ all of KaTeX) onto the critical path — to obtain `t => t`

**The chain** `DarkModeToggle.vue:20` → `useFourierMorph.ts:21-27` (a **static, value-bearing** import of `getEasingFn`/`EASING_PRESETS`) → `easings.ts:9,16` `import { timingFunctions, … } from "@mkbabb/value.js"` → `easings.ts:55-60`, where `EASING_PRESETS` is built **at module evaluation** from `timingFunctions` (unremovable by tree-shaking).

**The cost** `vite.config.ts:47` bins `["@mkbabb/value.js", "katex"]` into one `vendor-math` chunk. Shipped: `dist/assets/vendor-math-gh38gzwU.js` = **348 707 B**, statically imported by the entry (`from"./vendor-math-gh38gzwU.js"` among the entry's five static specifiers) and `<link rel="modulepreload">`-ed from `dist/index.html`. `main.ts:5` imports only `katex/dist/katex.min.css` — **no eager module needs KaTeX's JS**; it rides in solely because value.js was pulled into the same bin.

**The benefit** `DarkModeToggle.vue:37` passes no config ⇒ `DEFAULT_MORPH_CONFIG.{settleOut,morph,settleIn}Easing = "linear"` (`useFourierMorph.ts:65-67`) ⇒ `getEasingFn("linear")` (`easings.ts:66`) ⇒ `timingFunctions.linear`. Verified against the installed 0.13.0:

```
$ node --input-type=module -e "import {timingFunctions,linear} from '@mkbabb/value.js'; …"
linear(0.37) = 0.37
timingFunctions.linear === linear ? true
```

**349 KB of eagerly preloaded JavaScript, on the critical path of every route, resolves to the identity function.**

**Sole-cause attribution** the four value.js importers in `web/src` are `easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5` (CENSUS `:38` — "5 import statements / 4 files / 6 symbols, easing-only" — **AGREE, re-derived here**). The latter three live under `components/equation/`, reachable only through the lazy `EquationView` route. `easings.ts`'s other two consumers are `useMorphConfig.ts:18` (→ `FourierMorphDemo.vue`, `/morph` route, lazy) and `stores/animation.ts:7` (→ visualization surfaces, lazy). **`DarkModeToggle` is the only eager root.**

**↯ Contradiction with the tree's own documentation.** `useFourierMorph.ts:33-36` asserts: *"keyframes 2.2.0 moves the value.js-bearing `Animation` engine behind the `loadAnimationEngine()` dynamic boundary, so value.js no longer rides the eager bundle — it loads on first morph."* The shipped build refutes it on both clauses: (i) value.js rides `vendor-math`, statically imported **and modulepreloaded**, before any morph; (ii) the deferral buys only `engine-DuAFoqZF-470OO0Cc.js` = **19 685 B**. The comment also cites **keyframes 2.2.0** while `package.json:14` pins `^4.3.0` and 4.3.0 is installed — a stale provenance claim on the exact library the file is about. Second stale claim, same seam: `vite.config.ts:34` — *"`vendor-paper`: … only loaded on /paper routes"* — but `vendor-paper` is modulepreloaded from `index.html` too (co-caused: `App.vue:7`→`SvgFilters.vue:3` imports pencil-boil eagerly, and `svg-fourier.ts:11` adds a second edge from this component — see C-14).

**Falsifier** (a) name one eager-graph module other than `lib/easings` importing value.js — grep enumerates all four importers above; (b) show `getEasingFn` receiving a non-`"linear"` name on this component's path — `DarkModeToggle.vue:37` passes nothing and never calls `updateConfig`; (c) show KaTeX JS needed eagerly — `main.ts` imports the CSS only, and the four `katex` importers are all lazily routed.

---

### 🔴 C-3 · BLOCKER · the installed dependency graph is *invalid today* at the glass-ui ↔ value.js seam

```
$ npm ls @mkbabb/value.js
├─┬ @mkbabb/glass-ui@4.0.0
│ └── @mkbabb/value.js@0.13.0 deduped invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
├─┬ @mkbabb/keyframes.js@4.3.0
│ └── @mkbabb/value.js@0.13.0 deduped invalid: …
└── @mkbabb/value.js@0.13.0 invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
npm error code ELSPROBLEMS
```

glass-ui 4.0.0 peers `@mkbabb/value.js: "^0.10.0 || ^0.11.0"`; the app pins `^0.13.0` (`package.json:15`) and keyframes 4.3.0 **depends** on `^0.13.0` — so 0.13.0 is forced and glass-ui runs **two minors outside its declared compat window**. This is not metadata-only: glass-ui's dist imports value.js from three modules (`dist/aurora.js`, `dist/color-DweYl7pE.js`, `dist/motion-curves.js`).

**Honest attribution** the break is repo-level and not authored by this file. It belongs on this axis because **this component is the sole `@mkbabb/glass-ui/dark` consumer in the repo** (`grep -rn "useGlobalDark\|glass-ui/dark" src` → `DarkModeToggle.vue:18,33` only) **and** the sole eager root of the value.js edge (C-2) — it is the one file sitting on both sides of the invalid edge. Its own subpath is clean: `dark.js` → `useGlobalDark-C28t0VWJ.js` imports only `vue` + `@vueuse/core`, no value.js. The exposure is graph-level, not call-level.

**Folds** `lane-frontend.md:59` (`value.js ^0.10.0 → ^0.13.0 → 4.0.0`), `:490` and CENSUS `:105-108` **THE RESOLUTION DEADLOCK** (`keyframes@4.3.0` optional-deps `glass-ui ~4.0.0`; `glass-ui@7` peers `keyframes ^6` + `value.js ^4`; `keyframes@6` deps `value.js 4.0.0` exactly ⇒ one atomic transaction). **This challenge adds the missing fact: the deadlock is not merely a *future* uplift hazard — the graph is already `ELSPROBLEMS`-invalid at rest, today, in the installed tree.**

**Falsifier** `npm ls @mkbabb/value.js` exiting 0, or a glass-ui 4.0.0 `package.json` whose peer range admits 0.13.0.

---

### 🟠 C-4 · MAJOR · keyframes 4.3 is consumed as a bare rAF ticker, with its own engine bypassed

`useFourierMorph.ts:122-143` constructs `new AnimationCtor({duration, iterationCount:1, timingFunction:"linear", fillMode:"forwards", useWAAPI:false})`, then:

```ts
a.addFrame("0%", { v: "0px" }, (_vars: any, time: number) => {   // :135
    const t = Math.min(time / a.options.duration, 1);
    onTick(t);
});
a.addFrame("100%", { v: "1px" });                                 // :139
```

The `{v:"0px"} → {v:"1px"}` vars exist **only** to make the engine run; the interpolated value arrives as `_vars` and is **discarded**. So the consumer pays for: keyframes' CSS-value parse of `"0px"`/`"1px"` into value.js `ValueUnit`s, the frame compiler (`a.parse()`, `:141`), and the whole engine chunk — to obtain `requestAnimationFrame` with a normalized `t`. It then recomputes `t` itself from `time / a.options.duration` and applies its **own** easing (`easeOut`/`easeMorph`/`easeIn`, `:162-164`) imported from a **second** value.js path, while the engine's own `timingFunction` is hardcoded `"linear"` and `useWAAPI:false` forcibly disables the compositor path the library exists to provide.

Every option used is API-valid at 4.3.0 (`keyframes.d.ts:1977-1990` `InputAnimationOptions`; `:273` `addFrame(start, vars, transform?, …)`; `:514` `play(): Promise<void>`; `:529` `stop(): void`; `:139` public `options`) — so this is not a break. It is **double consumption of one library for one job with the library's own path switched off**, and it is what makes C-2's 349 KB unavoidable.

**Falsifier** show `_vars` read anywhere (`grep "_vars"` → declared at `:135`, never referenced), or a config on this component's path where the engine's `timingFunction` is not `"linear"`.

---

### 🟠 C-5 · MAJOR · reduced-motion carve is cosmetic; the actual motion is ungated — and keyframes 4.3 ships the switch

`DarkModeToggle.vue:104-108` gates exactly one property:

```css
@media (prefers-reduced-motion: reduce) { .sun-moon-toggle { transition: none; } }
```

That kills the 200 ms **hover scale** (`:85`). The 350 ms, rAF-driven, 512-point Fourier morph (`useFourierMorph.ts:166-208`, `settleOut 150 + morph 50 + settleIn 150`) runs at full amplitude under PRM. keyframes 4.3 ships the exact affordance: `InputAnimationOptions.respectReducedMotion` — *"When true, snap `play()` to the final frame under `prefers-reduced-motion: reduce`. Default false"* (`keyframes.d.ts:1986-1987`), plus `setRespectReducedMotion` (`:332`). It is never passed (`useFourierMorph.ts:127-133`). glass-ui's own `DarkModeToggle` documents the opposite posture — *"Under `prefers-reduced-motion: reduce` the long-press flips INSTANTLY (no eclipse)"* (`dist/components/custom/controls/DarkModeToggle.vue.d.ts`, `eclipse` prop doc). The repo already reasons this way elsewhere: `router/index.ts:17-19` gates View Transitions on PRM.

**↯ Contradiction with the corpus.** `lane-frontend.md:619` lists `layout/DarkModeToggle.vue:104` among "8 `@media (prefers-reduced-motion: reduce)` blocks" — a presence census that reads as coverage. Presence here is **not** coverage: the block gates the decoration and misses the animation. The census row is factually correct and its implicature is wrong; this challenge narrows it.

**Falsifier** a PRM branch anywhere on the morph path — `grep -rn "reduced-motion\|matchMedia" src/composables/useFourierMorph.ts src/components/layout/DarkModeToggle.vue src/lib/svg-fourier.ts` → the single CSS block at `:104`.

---

### 🟠 C-6 · MAJOR · the re-entrancy guard cannot hold across the lazy-engine boundary

```ts
// DarkModeToggle.vue:63
if (morph.phase.value !== "idle") return;
```

`phase` is first written to `"settle-out"` at `useFourierMorph.ts:169` — **after** `await getAnimationCtor()` at `:149`, i.e. after a dynamic `import()` of the engine chunk. On the first toggle that await is a real network+parse window (`engine-…js` 19 685 B, plus `vendor-math` if not yet warm). Two clicks inside that window both observe `phase === "idle"`, both pass, and both proceed:

* `toggleDark()` runs twice (`:69`) — the theme returns to where it started;
* `morphingToDark` is computed from an already-flipped `isDark` on the second pass (`:68`) → the second chain lerps the wrong direction;
* both chains share one composable instance and one `currentAnim` closure (`useFourierMorph.ts:87`), so chain B's `stopAnim()` (`:146`) cancels **chain A's** in-flight animation — whose `play()` promise then resolves *like a forwards completion* (`keyframes.d.ts:493-495`), so chain A does **not** abort: it advances to phase 2, overwrites `currentAnim` with its own, and the two chains interleave writes to `currentPoints`/`phase`/`morphProgress`.

**Falsifier** a synchronous guard — set `phase` (or a `busy` flag) in `handleToggle` before the await, or move the engine resolve above the guard. Neither exists: `:62-72` has no synchronous state write before `await morph.morphTo(...)` other than `morphingToDark` (which is not read by the guard). Rapid double-click *after* the engine is cached is safe: the remaining `await` is a microtask and two clicks cannot occur inside one. **UNPROVEN-NEEDS-LIVE** for the visual outcome; the ordering is proven from source.

---

### 🟠 C-7 · MAJOR · the stroke colour snaps to the destination, then back, before the morph starts

`handleToggle` flips `isDark` synchronously at `:69` (glass-ui's `toggleDark` → `useToggle` → immediate write; `useGlobalDark-C28t0VWJ.js`), then awaits. Until `phase` becomes `"settle-out"` (`useFourierMorph.ts:169`, post-await) the `strokeColor` computed takes its **idle** branch:

```ts
// DarkModeToggle.vue:46-51
if (morph.phase.value === "idle")
    return isDark.value ? lerpColor(SUN, MOON, 1) : lerpColor(SUN, MOON, 0);
```

`isDark` has already flipped ⇒ the stroke jumps **instantly to the destination colour while the path still draws the source glyph**. When the morph then begins, the first tick writes `morphProgress ≈ 0` (`:176`) and the animating branch (`:52-55`) returns the **source** colour — snapping back — before lerping forward. Observed sequence: `from → to → from → lerp(from,to)`. On the first toggle the middle state persists for the whole engine-load window.

**Falsifier** make the idle branch read `morphingToDark` instead of `isDark`, or set `phase` synchronously (same cure as C-6) — and the pop disappears. There is no third state variable that could absorb it: `morphProgress` is left at `1` by the previous morph (`:211`) and the idle branch never reads it.

---

### 🟠 C-8 · MAJOR · a 57 029-character path string is rebuilt every frame for a ~40 px icon

`currentPath` is `computed(() => pointsToSvgPath(currentPoints.value))` (`useFourierMorph.ts:81`) and `currentPoints` is written on **every** tick of all three phases (`:175, :189, :204`). Each write triggers, per frame:

* `interpolateAtHarmonicLevel` → `lerpPoints` → **512 freshly allocated 2-element arrays** (`svg-fourier.ts:94-106`);
* `pointsToSvgPath` → a 512-segment closed cubic `d` string. Measured on the real asset at level 50: **512 points → 57 029 characters**;
* re-parse of that `d` by the SVG engine (`FourierMorphSvg.vue:9`).

Over a 350 ms morph at 60 fps that is ≈ 21 frames × (1 024 array allocations + a 57 KB string) ≈ **1.2 MB of string churn per toggle**, to render a glyph rendered at `--toggle-size: 2.5rem` (mobile) / `2.75rem` (≥640 px) — `AppHeader.vue:242,256`. `highLevel: 50` (`useFourierMorph.ts:64`) requests the asset's **maximum** harmonic level (`n_harmonics 50`); the asset also ships levels 25/35, and the 512-sample eval grid is ~13× the device-pixel budget of a 44 px icon.

**Falsifier** show `currentPath` memoized or throttled (it is a bare `computed` with a non-memoized dependency written every tick), or show the icon rendered large enough to resolve 512 segments. Frame-time impact is **UNPROVEN-NEEDS-LIVE (SS-13)**; the allocation counts and the 57 029-char figure are computed from the shipped asset.

---

### 🟡 C-9 · MINOR · the `MOON_COLOR` provenance comment is false

```ts
// DarkModeToggle.vue:30-31
const SUN_COLOR  = [232, 136,  69] as const;   // #E88845
const MOON_COLOR = [192, 132, 252] as const;   // #c084fc — matches VIZ_COLORS.legendre
```

`#c084fc` is **not** `VIZ_COLORS.legendre`. It is `STATIC.rainbow[4]` (`lib/colors.ts:15`). `VIZ_COLORS.legendre` is `#9545b8` as a static default (`lib/colors.ts:81`) and, after `resolveVizColors()` (`:93`), whatever `--viz-legendre` computes to — glass-ui `dist/styles/tokens/light-dark.css:147`: `light-dark(oklch(0.532 0.180 317.5), oklch(0.739 0.134 318.1))`, i.e.

| | hex | rgb | Euclidean rgb distance from `#c084fc` |
|---|---|---|---|
| `--viz-legendre` light | `#9541af` | 149, 65, 175 | **110.8** |
| `--viz-legendre` dark | `#ce8ee1` | 206, 142, 225 | **32.0** |
| `VIZ_COLORS.legendre` static default | `#9545b8` | 149, 69, 184 | 108.9 |

**Falsifier** any definition of `--viz-legendre` equal to `#c084fc` — `grep -rn "viz-legendre" src node_modules/@mkbabb/glass-ui/dist/styles` returns only the oklch pair above; `src` defines it nowhere (only `lib/colors.ts:93` *reads* it).

---

### 🟡 C-10 · MINOR · the one component that *causes* the theme flip is the one component that cannot follow it

The tree's palette contract is: read `--viz-*` at runtime through `VIZ_COLORS` / `var(--viz-*)`. Fifteen-plus consumers obey — `BasisCanvas.vue:6,127,172,257,261,326`, `BasisSelector.vue:7,176,203`, `ContourSettings.vue:5,236…`, `EditorControlsDock.vue:8,123`, `lib/basis-display.ts:1,4-6`, `GalleryCard.vue:9`, `GalleryCardModal.vue:9,150`, `canvas-drawing/{epicycles,labels}.ts`, `useCoeffHover.ts:9,65`, `HarmonicLevelGrid.vue:25,91`. `DarkModeToggle.vue:30-31` is the **only** surface that freezes viz-palette channels into literals — and it is precisely the component whose click drives `App.vue:13-17`'s `MutationObserver` → `resolveVizColors()`. Its own two colours are the only ones in the app that cannot participate in the re-resolution it triggers. Note also `lib/colors.ts:101-116` already exports `hexToRgb`/`hexToRgba`, so the token-backed form is a one-line change with no new machinery.

**Falsifier** a second component hardcoding viz-palette RGB — `grep -rn "c084fc\|E88845\|e88845" src` returns `ImageUpload.vue:154` (a decorative gradient literal), `lib/colors.ts:15` (the palette definition itself), and this file. Or: show that the sun/moon colours are deliberately theme-invariant — refuted by the comment at `:31`, which asserts the opposite intent.

---

### 🟡 C-11 · MINOR · value.js ships colour interpolation; the component hand-rolls gamma-space RGB lerp

`DarkModeToggle.vue:39-44` implements a per-channel sRGB lerp. The pinned 0.13.0 exports, in the very package already on the critical path (C-2): `mixColors(col1, col2, p1, p2, space?, hueMethod?)` (`dist/index.d.ts:16`), `mixColorsN` / `sampleColorRamp` (`:19`, default space **oklab**, `mix.d.ts:19-20`), `lerpColorValue` (`:9`), `interpolateHue` (`:16`), `lerp`/`lerpArray` (`:23`), plus the whole `Color`/`OKLABColor` family (`:10`). Interpolating in gamma-encoded sRGB between `#E88845` and `#c084fc` traverses a desaturated mid-band that neither endpoint suggests; oklab is what the constellation uses everywhere else (`--viz-*`, `--accent-*` are all oklch; `color-mix(in srgb, …)` appears in app CSS but the *token* layer is oklch).

**Falsifier** a value.js version on the pinned line lacking a mixing export (0.13.0's `index.d.ts:16,19` has three), or evidence that gamma-space is intended here (no comment says so). Perceptual quality of the midpoint is **UNPROVEN-NEEDS-LIVE**; the API-availability half is proven.

---

### 🟡 C-12 · MINOR · `useGlobalDark` is consumed 2-of-5; the app hand-rolls the other three

`UseGlobalDarkReturn` (`useGlobalDark.d.ts:14-39`) is `{isDark, toggleDark, disableTransitions, setDisableTransitions, onFlipSettled}`. `DarkModeToggle.vue:33` destructures **`isDark` and `toggleDark` only**, and it is the repo's sole caller. Consequences:

* **`setDisableTransitions` unused** — glass-ui's own toggle exposes this as a prop (`DarkModeToggle.vue.d.ts`, `disableTransitions`, default false) and `useGlobalDark`'s implementation adds/removes `.no-transition` on `<html>` around the flip. Here every CSS transition in the document fires concurrently with the 350 ms morph.
* **`onFlipSettled` unused** — its docblock (`:23-37`) describes exactly the app's problem: *"consumers BATCH N expensive re-theme operations … into a single beat instead of N watchers firing in N sequential storms on the critical frame"*. Instead `App.vue:13-17` hand-rolls a `MutationObserver` on `documentElement` `class`, which re-runs `resolveVizColors()` (5 × `getComputedStyle` + regex, `lib/colors.ts:91-96`) on **every** class mutation — Tailwind state classes, `.no-transition`, anything — not just dark flips.

**Falsifier** another `useGlobalDark` caller consuming the remaining members (`grep -rn "useGlobalDark" src` → `DarkModeToggle.vue:18,33` only), or a `.no-transition`/`onFlipSettled` reference in `src` (none).

---

### 🟡 C-13 · MINOR · the pre-paint theme script is hand-rolled beside the exported one

`index.html:22-32` inlines a bootstrap reading `localStorage["theme"] ?? localStorage["vueuse-color-scheme"]` and adding `.dark`. `@mkbabb/glass-ui/dark` — the **same subpath** imported at `DarkModeToggle.vue:18` — exports `installDarkModeSync`, `darkModeSyncScript`, and `DARK_MODE_STORAGE_KEY` (`dist/dark.d.ts:1`), and `UseGlobalDarkOptions.initialValue` documents the pairing: *"Pair with `darkModeSyncScript()` so the parse-time `<head>` script and this runtime seed agree"* (`useGlobalDark.d.ts:47-48`). The hand-roll hardcodes vueuse's storage key as a string literal and **omits `document.documentElement.style.colorScheme`**, which `useGlobalDark` sets only from its mounted watcher (`useGlobalDark-C28t0VWJ.js`, `watch(n, e => documentElement.style.colorScheme = …, {immediate:true})`) — so UA-painted chrome (scrollbars, form controls, `<meta>`-less canvas) uses the wrong scheme between first paint and hydration. `useGlobalDark()` is also called with **no** `initialValue` (`:33`), leaving the documented seed pairing unmade.

**Folds** `lane-frontend.md:610` (which records the bootstrap and the runtime owner as facts). **This challenge adds:** the two are redundant, the literal key is a drift hazard, and the `colorScheme` half is missing.

**Falsifier** a `darkModeSyncScript`/`installDarkModeSync` call anywhere in `src` or `index.html` (`grep` → none), or a glass-ui 4.0.0 `dark.d.ts` lacking those exports (line 1 has all three).

---

### 🟡 C-14 · MINOR · `as any` erases the contract at the one seam where the asset can drift

```ts
// DarkModeToggle.vue:26-27
const sunShape  = prepareFourierShape(sunData as any);
const moonShape = prepareFourierShape(moonData as any);
```

`prepareFourierShape(data: FourierPathData)` (`svg-fourier.ts:76`) declares a precise shape — `decomposition.domain: [number, number]`, `partial_sums: Record<string, {x:number[];y:number[]}>`, `levels: number[]`, `components: BasisComponent[]`. A JSON-module widening (`domain` inferring `number[]`) makes *some* assertion necessary, but `as any` also disables checking of `partial_sums`, `levels`, and every field — at the exact seam where a regenerated Python asset can silently change shape (`svg-fourier.ts:1-9` documents the assets as pre-computed in Python and shipped as static JSON). `as unknown as FourierPathData` — or a typed loader — preserves the shape check and costs the same line.

**Falsifier** show the cast is not narrowing anything (i.e. the JSON's inferred type is assignable) — then the cast should simply be deleted, which is the same finding; or show a runtime validation of the asset shape (`grep` of the read set: none).

---

### 🟡 C-15 · MINOR · a dead pencil-boil edge on the eager path

`svg-fourier.ts:11` statically imports `catmullRomToBezier` from `@mkbabb/pencil-boil`, used only in the `!closed` branch of `pointsToSvgPath` (`:52`). Every call reachable from this component uses the default `closed = true` (`useFourierMorph.ts:81` → `pointsToSvgPath(currentPoints.value)`), so the symbol is never invoked here, yet the module edge lands in the eager graph and helps keep `vendor-paper` on the modulepreload list against `vite.config.ts:34`'s stated intent (co-caused with `App.vue:7`→`SvgFilters.vue:3`, so this row is contributory, not sole-cause). Also relevant to the uplift: `lane-frontend.md:481` books pencil-boil `0.4.1` installed vs `^0.11.2` peered by glass-ui 7 — this component holds one of the four sites.

**Falsifier** any `pointsToSvgPath(pts, false)` on this component's path (`grep -rn "pointsToSvgPath" src` → `useFourierMorph.ts:81` and `HarmonicLevelGrid.vue:93`, neither passing `false`).

---

### 🟡 C-16 · MINOR · empty props/emits contract, and token-name drift from the primitive it shadows

The component declares **no props and no emits** — every axis is fixed: `stroke-width="14"`, `view-box="0 0 200 200"` (`:9,11`), the two colour literals, the morph config. Sizing arrives only through `--toggle-size` (`:78`, defaulted `5rem`), set by `AppHeader.vue:242,256`. glass-ui 4.0.0 — the *installed* version — exports a `DarkModeToggle` from `@mkbabb/glass-ui/controls` (`dist/controls.d.ts:1` → `components/custom/controls/index.d.ts:1` → `export { default as DarkModeToggle }`) with a real contract: `size: "sm"|"md"|"lg"|"control"|"dock"`, `passive`, `disableTransitions`, `eclipse`, sized through `--dark-mode-toggle-size` / `[data-size]` (`dist/styles/dock-controls/dark-mode-toggle.css:10-63`).

**Folds and sharpens** `lane-frontend.md:419-421` (CHARACTERFUL SHADOW; *"keep, but reconcile against the 7.0.0 props/tokens rather than let it drift"*) and CENSUS `:95`. **AGREE on the ruling — keep it; the sun↔moon Fourier morph is a product signature.** **This challenge adds two facts the lane did not carry:** (i) the shadowed primitive exists at the **installed 4.0.0**, not only at 7.0.0 — so "reconcile" is actionable *now*, not gated on the tri-package transaction; (ii) the drift is already concrete and measurable — `--toggle-size` vs `--dark-mode-toggle-size`, a CSS-var contract vs a `size` prop, and no `disableTransitions`/`passive` equivalent (see C-12).

**Falsifier** a props block in the SFC (`:16-73` has none), or a glass-ui 4.0.0 tree without the controls export (verified present).

---

### 🟡 C-17 · MINOR · a11y contract thin, and wholly untested

`<button>` at `:2-13` carries a state-reflective `aria-label` (`:5`) but: no `type="button"` (a bare `<button>` defaults to `submit`; harmless in today's non-form header, a latent hazard if ever nested); no `aria-pressed` / `role="switch"` for a binary toggle; and the label flips synchronously with `isDark` at `:69` — ~350 ms before the glyph agrees, so assistive tech and the visual disagree for the whole morph (the same desync as C-7, on the a11y channel). Test surface: **zero** coverage — 8 Playwright specs under `web/e2e/`, none referencing the toggle, its aria-label, or `.dark-mode-toggle`; `@axe-core/playwright` is a devDependency (`package.json:22`) with no a11y spec in the tree.

**Falsifier** `grep -rn -i "dark" web/e2e/*.ts` → matches only unrelated `toggle` words (`gallery.spec.ts:43,56-59`, `paper-performance.spec.ts:88-118`). Any spec asserting the toggle's label/state kills the coverage half.

---

### ⚪ C-18 · INFO · token-layer inconsistency: `--color-ring` vs `--ring`

`DarkModeToggle.vue:99` focuses with `var(--color-ring)` (the Tailwind-v4 bridge alias, glass-ui `dist/styles/theme/bridges.css:80` `--color-ring: var(--ring)`), while its own parent uses `var(--ring)` (`AppHeader.vue:189`). Both resolve; the mixed layer is a readability/consistency nit only. **Falsifier** — if `bridges.css` were not imported, `--color-ring` would be undefined and the focus ring would vanish; `src/style.css:3` imports `@mkbabb/glass-ui/styles`, so it resolves. No defect beyond inconsistency.

---

## §2 — Superlatives (L-18 runs both ways; each with its falsifier)

**S-1 · Granular subpath consumption, single ownership of the flip.** `:18` imports `useGlobalDark` from `@mkbabb/glass-ui/dark` — the dedicated subpath (`package.json` exports map, `"./dark"`), not the root barrel — and it is the **only** `useGlobalDark` caller in 66 SFCs. One owner for global theme state is exactly right. *Falsifier:* a root-barrel import would drag `dist/glass-ui.js` into the eager graph; a second caller would fork the singleton's `initialValue` seed and can **throw** by design (`useGlobalDark.d.ts:41-49`). Neither obtains. Corroborates CENSUS `:89-91` ("deepest, cleanest consumer in the constellation").

**S-2 · Correct once-only engine memoization.** `useFourierMorph.ts:38-44` assigns `enginePromise` **synchronously** before any await, so concurrent first callers share one `loadAnimationEngine()`. *Falsifier:* an `await` between the null-check and the assignment would allow a double resolve; there is none. (Note the sharp contrast with C-6, where the same file's *phase* flag is written after an await — the pattern is understood here and dropped there.)

**S-3 · Seam-correct closed-path Catmull-Rom.** `svg-fourier.ts:54-72` uses modular indexing (`(i-1+n)%n`, `(i+2)%n`) so tangents wrap at index 0, then closes with `Z`. For a closed glyph morph this is the right construction. *Falsifier:* feeding these points to the open-path `catmullRomToBezier` branch (`:52`) would leave a visible tangent cusp at the seam on every frame.

**S-4 · Correct nested-ref discipline in the template.** `:8` passes `morph.currentPath.value`. `morph` is a **plain object** of refs returned by the composable (`useFourierMorph.ts:217-229`), and Vue auto-unwraps only top-level setup bindings and refs inside `reactive` objects — the explicit `.value` is required, and the common "cleanup" of dropping it would render `[object Object]`. *Falsifier:* wrap the return in `reactive()` and `.value` becomes wrong; it is not wrapped.

**S-5 · The hand-authored easing catalogue maps exactly onto the pinned value.js surface.** All 22 keys of `EASING_LABELS` (`easings.ts:29-52`) resolve to real functions in 0.13.0's `timingFunctions` — verified live against the installed package: the set of keys with no corresponding function is **empty**. No silent `undefined` easing can reach `getEasingFn`'s consumers, and `:66`'s `?? EASING_PRESETS.linear.fn` is a real floor rather than a mask. *Falsifier:* one missing key would surface as `EASING_PRESETS[name].fn === undefined` and throw at call time; the check returns `[]`.

**S-6 · The shared child defaults into the design system.** `FourierMorphSvg.vue:30` defaults `strokeColor` to `var(--accent-red)` — a genuine glass-ui token (`dist/styles/tokens/color-radius.css:258` light, `dark-arm.css:111` dark, `light-dark.css:142` paired), not an invented name — and it renders through `currentColor` (`:6,11`) so the SVG stroke inherits one authoritative source. *Falsifier:* an undefined token would collapse the stroke to `currentColor`'s inherited value; `--accent-red` is defined in both arms. (Counterpoint retained: **this** consumer overrides that good default with frozen literals — C-9/C-10.)

---

## §3 — What this challenge contradicts in the hitherto corpus (↯)

| # | Corpus row | Contradiction |
|---|---|---|
| ↯1 | `lane-frontend.md:619` — DarkModeToggle counted among "8 PRM blocks" | Presence ≠ coverage. The block gates a 200 ms hover transform; the 350 ms rAF morph is ungated (**C-5**). |
| ↯2 | `lane-frontend.md:421` — *"reconcile against the **7.0.0** `DarkModeToggle` props/tokens"* | The primitive ships at the **installed 4.0.0** (`dist/controls.d.ts:1`), so reconciliation is available today and is **not** gated on the tri-package transaction (**C-16**). |
| ↯3 | CENSUS `:105-108` — the deadlock framed as an **uplift** hazard | The graph is **already invalid at rest**: `npm ls @mkbabb/value.js` → `ELSPROBLEMS`, glass-ui 4.0.0 peers `^0.10.0 || ^0.11.0` vs installed 0.13.0 (**C-3**). |
| ↯4 | CENSUS `:38` — value.js *"latent, not live"* / easing-only | Live **and load-bearing on the critical path**: the entry chunk statically imports and modulepreloads `vendor-math` (348 707 B incl. all of KaTeX) solely through this component's easing edge, to realize the identity function (**C-2**). "Easing-only by symbol count" and "349 KB eager by cost" are both true; only the second predicts the uplift's blast radius. |
| — | `lane-frontend.md:419-421` — keep the component, it is a product signature | **AGREE, unreservedly.** Nothing here argues for deletion; C-1/C-2/C-5 argue that the *cost* of keeping it must be paid deliberately. |

---

## §4 — Cheapest cures (non-binding; the challenge is the deliverable)

1. **C-1** — `import()` the two JSONs inside `onMounted`, or ship a slimmed asset containing only `levels ≥ 5` `partial_sums` (≈ 262 KB → and out of the entry chunk entirely). Entry drops from 491 KB to ≈ 52 KB.
2. **C-2** — import `getEasingFn` dynamically alongside the engine (`useFourierMorph.ts:149`), or, since this component's easing is provably `linear`, let the morph default to identity and drop the eager `lib/easings` edge. `vendor-math` (and KaTeX) leave the critical path.
3. **C-5** — pass `respectReducedMotion: true` at `useFourierMorph.ts:127-133`, and branch `handleToggle` to `setShape(to)` under PRM.
4. **C-6/C-7** — one line: set `morph.phase.value = "settle-out"` (or a synchronous `busy` flag) in `handleToggle` before the await; the double-entry and the colour pop both die.
5. **C-9/C-10** — `hexToRgb(VIZ_COLORS.legendre)` / a `--viz-*` read; the comment becomes true and the colours follow the theme they trigger.
6. **C-13** — replace `index.html:22-32` with `darkModeSyncScript()` from the subpath already imported at `:18`; seed `useGlobalDark({ initialValue })` to match.

---

## §5 — Evidence appendix (re-runnable, read-only)

```bash
# C-1 — entry-chunk composition
cd fourier-analysis/web/dist/assets && node -e '…measure JSON.parse literals…'
  # → 6 literals, 439 100 B of 491 280 B = 89.4 %
ls -la ../../src/assets/fourier-paths/{sun,moon}.json      # 225 687 / 224 944 B
node -e 'const d=require(".../sun.json"); d.levels'        # [1,2,3,5,8,12,18,25,35,50]; n_harmonics 50; n_eval 512

# C-2 — eager value.js edge
grep -o 'from"\./[^"]*"' dist/assets/index-dWFIqpKn.js | sort -u
  # → vendor-vue, vendor-ui, vendor-keyframes, vendor-paper, vendor-math   (all five STATIC)
grep -o 'modulepreload[^>]*href="[^"]*"' dist/index.html   # vendor-math preloaded
ls -la dist/assets/vendor-math-*.js dist/assets/engine-*.js   # 348 707 B vs 19 685 B
grep -rn "@mkbabb/value.js" src                            # 4 files; 3 behind lazy routes
node --input-type=module -e 'import {timingFunctions,linear} from "@mkbabb/value.js"; …'
  # linear(0.37) === 0.37 ; timingFunctions.linear === linear ; 0 unmapped EASING_LABELS keys  (also S-5)

# C-3 — invalid graph
npm ls @mkbabb/value.js                                     # ELSPROBLEMS, peer ^0.10.0||^0.11.0 vs 0.13.0
grep -rl "@mkbabb/value.js" node_modules/@mkbabb/glass-ui/dist/*.js   # aurora, color-*, motion-curves

# C-5 / C-16 — the shadowed primitive + the PRM affordance
grep -n "respectReducedMotion" node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts    # :1986-1987, :332
cat node_modules/@mkbabb/glass-ui/dist/components/custom/controls/{DarkModeToggle.vue.d.ts,index.d.ts}

# C-8 — path-string size at level 50
node -e '…rebuild pointsToSvgPath over partial_sums["50"]…'   # 512 points → 57 029 chars

# C-9 — the colour claim
grep -rn "viz-legendre" node_modules/@mkbabb/glass-ui/dist/styles   # light-dark(oklch .532 .180 317.5, oklch .739 .134 318.1)
node -e '…oklch→srgb…'   # #9541af / #ce8ee1 ; rgb distance from #c084fc = 110.8 / 32.0

# C-12 / C-13 / C-17 — seams and coverage
grep -rn "useGlobalDark\|glass-ui/dark" src                 # DarkModeToggle.vue:18,33 only
grep -rn "darkModeSyncScript\|installDarkModeSync\|no-transition\|onFlipSettled" src index.html   # none
grep -rn -i "dark" web/e2e/*.ts                             # no toggle coverage
```

**Served model:** `claude-opus-5[1m]`. **Repo state:** fourier HEAD `cd26c653` (intake **X-4**); `web/dist/` built 2026-06-12 (used as corroboration only, never as sole evidence — see the C-1 note).

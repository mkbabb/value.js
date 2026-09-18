claude-opus-5[1m]

# CHALLENGE — `App` · axis **L (LIBRARY)**

**Target**: `/Users/mkbabb/Programming/fourier-analysis/web/src/App.vue` (32 lines)
**Date**: 2026-08-04 · **Posture**: component assumed DEFECTIVE until the tree proves otherwise
**Method**: static + source-derived only (no browser tooling, per lane law). Live-only claims are marked
`UNPROVEN-NEEDS-LIVE` and routed to SS-13. Every row carries severity + `file:line` + its falsifier.

**Verdict**: **DEFECTIVE — 1 BLOCKER**. App.vue is 32 lines and reads clean, but its single `onMounted`
body is the sole scheduler of a colour-resolution routine that **actively destroys the visualization
basis palette** on every boot. Three of the five section-derived viz colours collapse to `#888888`; a
fourth is a dead write. The component is small, well-placed, and producer-clean — and it is the trigger.

**Findings**: 11 rows — **9 defects** (1 BLOCKER · 4 MAJOR · 4 MINOR) + 2 INFO notes.
**Superlatives**: 3 (L-18 runs both ways; S-1 is recorded PARTIALLY FALSIFIED by its own falsifier).

**Read whole (read-only)**: `App.vue`; `lib/colors.ts`; `components/decorative/SvgFilters.vue`;
`components/layout/AppHeader.vue`; `components/layout/DarkModeToggle.vue`; `main.ts`; `router/index.ts`;
`style.css`; and the consumed producer surfaces `@mkbabb/glass-ui@4.0.0` (`dist/dark.js`,
`dist/styles/tokens/{color-radius,dark-arm,light-dark,property-regs}.css`) +
`@mkbabb/pencil-boil@0.4.1` (`src/vue.ts`).

---

## §0 — Corpus fold (cite, don't re-invent)

| Prior row | What it already established | This challenge's relation |
|---|---|---|
| **CENSUS-2026-08-03 §3f (line 174)** — "fourier's parsing today is a 117-line hand-rolled regex file (`web/src/lib/colors.ts`, **no `oklch()` arm**) — the exact deletion target of W.L5 item 2 and the I-9 re-trigger sentinel" | The *absence* of the oklch arm, framed as a **PLAW-BIND / deletion-target** concern | **EXTENDS, does not repeat.** The census reads the missing arm as a *tidiness / value.js-consumption* item. It is not. Every `--viz-*` token glass-ui 4.0.0 ships **is** oklch → the missing arm is a **live shipping BLOCKER** (L-1), and `App.vue:11` is its sole trigger. Severity is re-graded upward with proof. |
| **CENSUS-2026-08-03 §3a (lines 85-86)** — "Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven) + 12 SVG surfaces" | The viz render-path architecture rows | **CONSUMED as the mechanism of L-1/L-2.** No WebGL means no shader-side colour path — every viz colour is a JS string handed to `ctx.strokeStyle`/`fillStyle`, so a poisoned `VIZ_COLORS` reaches the pixels with zero intermediation. The "reactive-redraw off a store rAF clock" is precisely what makes the poisoning *stick* frame after frame. The "12 SVG surfaces" count is contradicted below (L-5): **4 of them are dead**. |
| **CENSUS-2026-08-03 §3a (lines 96-97)** — SOFT shadow: `BasisCanvas` + `canvas-drawing/` (1 311 LOC Canvas2D) vs glass-ui's GPU-backed `FourierField` | The convergence study target | **CONTEXT for L-2.** The convergence study inherits the split-brain palette unless L-1/L-2 land first; `basisDisplay` is part of the "duplicated coefficient substrate" the census names. |
| **Intake `lane-fourier-r3-r6.md` row R3-7a** — "35 Tooltip callsites over nine consumers … (`App.vue` +1 and the local adapter `ui/tooltip/Tooltip.vue` +3 sit outside R3's consumer set)" | App.vue's 1 tooltip callsite, excluded from R3's set | **CONSUMED as the falsifier base for S-2/S-3.** Re-derived live: App.vue is the **only** file in the tree importing from the producer subpath `@mkbabb/glass-ui/tooltip`; the other **9** go through the local shadow adapter. App.vue is on the canonical path — a genuine superlative, and the F.W3 migration budget is unchanged by it. |
| **Intake `lane-fourier-r3-r6.md` row R5-7** (ADOPT-AS-FACT + CARRY→F.W4) — "template-loop evidence keyed to *component* callsites is blind to native HTML element loops"; `PaperSidebar.vue` renders the whole ToC through three nested native `<li v-for>` (lines 65, 87, 105) | The derivation-model defect class | **APPLIED, with a scope correction (L-10).** App.vue contains **zero** `v-for`, so R5-7 does not fire *in* it. But App.vue is the **apex of the blindness cone**, and it adds a *second*, independent blind edge the intake did not name: `<RouterView/>`. Detailed below. |
| **Intake row X-1** — "no authority, no admission, no slot — and the structural census + the two model defects enter the substrate by adjudication" | Measurement is live even where authority is dead | **HONOURED.** R5-7 is used as a live measurement (L-10), never as authority. |

---

## §1 — BLOCKER

### L-1 · `resolveVizColors()` poisons the entire viz basis palette to `#888888` on every boot. App.vue is the sole caller.

**Severity: BLOCKER**
**Provenance**:
- `web/src/App.vue:11` — `resolveVizColors();`
- `web/src/App.vue:13` — `new MutationObserver(() => resolveVizColors())` (re-fires it on every theme flip)
- `web/src/lib/colors.ts:90-96` — the routine; five `cssVarToHex()` calls
- `web/src/lib/colors.ts:22-54` — `cssVarToHex`: branches are **hex-passthrough** (`:29`), **`hsl(...)`** (`:33-38`), **bare HSL triplet** (`:41-44`), **`rgb(...)`** (`:47-51`), else `return "#888888"` (`:53`)
- `web/node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css:263-267` —
  `--viz-fourier: oklch(0.579 0.201 30.4); --viz-chebyshev: oklch(0.484 0.163 265.5);`
  `--viz-legendre: oklch(0.532 0.180 317.5); --viz-amber: var(--section-color-5); --viz-green: var(--section-color-4);`
- `.../tokens/color-radius.css:245-246` — `--section-color-4: oklch(0.551 0.088 171.1); --section-color-5: oklch(0.623 0.124 69.6);`
- `.../tokens/dark-arm.css:99-100,113-115` — the `.dark` arm: **also oklch**, all five
- `.../tokens/light-dark.css:130-131,145-147` — the `@supports` arm: `light-dark(oklch(…), oklch(…))`, all five
- `.../tokens/property-regs.css:38,44,76,82,88,111,126` — the **complete** `@property` registry:
  `--progress-crescendo`, `--phase-tint-amount`, `--specular-x/-y/-intensity`, `--glass-level`, `--ui-scale`.
  **No `--viz-*` and no `--section-color-*` is registered.** (`grep -rn "@property" … | grep -i viz` → ∅;
  `grep -rn "@property" web/src/` → ∅.)
- `web/src/style.css:120-121,124-126` — fourier's **only** local token overrides:
  `:root { --viz-amber: hsl(35 76% 35%); --section-color-5: hsl(35 76% 35%); }` /
  `.dark { --viz-amber: hsl(37 73% 67%); --section-color-5: hsl(37 73% 67%); }`

**The defect.** For an **unregistered** custom property, the computed value is the specified token sequence
with `var()`s substituted — no type coercion, no colour-space conversion (CSS Custom Properties L1 §3;
`light-dark()` likewise resolves at *used*-value time and is therefore returned verbatim). So
`getComputedStyle(document.documentElement).getPropertyValue("--viz-fourier")` yields the literal string
`"oklch(0.579 0.201 30.4)"` (or `"light-dark(oklch(…), oklch(…))"` under the `@supports` arm). That string
matches **none** of `cssVarToHex`'s four branches — not `#`, not `hsl(`, not the bare `^h s% l%$` triplet,
not `rgb(`. It falls through to `colors.ts:53` → `"#888888"`.

Traced per key, exhaustively:

| key | authored default (`colors.ts:78-82`) | resolved token | `cssVarToHex` branch | value **after** `App.vue:11` |
|---|---|---|---|---|
| `fourier` | `#bf4040` (brick red) | `oklch(0.579 0.201 30.4)` | none → `:53` | **`#888888`** |
| `chebyshev` | `#3d72b8` (blue) | `oklch(0.484 0.163 265.5)` | none → `:53` | **`#888888`** |
| `legendre` | `#9545b8` (purple) | `oklch(0.532 0.180 317.5)` | none → `:53` | **`#888888`** |
| `amber` | `#b37a2d` | `hsl(35 76% 35%)` *(fourier's own override, `style.css:120`)* | `:33-38` ✔ | ≈`#a3702f` — **the sole survivor** |
| `green` | `#4d8f66` | `var(--section-color-4)` → `oklch(0.551 0.088 171.1)` | none → `:53` | **`#888888`** (and never read — L-7) |

**The three orthogonal bases the entire application exists to distinguish — Fourier, Chebyshev, Legendre —
become the same grey.** The authored fallbacks at `colors.ts:78-82` are *correct*; `App.vue:11` overwrites
them with grey. The component's one imperative statement is a net-negative operation.

`--viz-amber` survives only by accident: it is the one token fourier locally re-authors in `hsl()`
(`style.css:120`, the D.W4.d WCAG darken — census §3a "the `--viz-amber` WCAG darken" carry). Cascade check:
`style.css` `@import`s glass-ui at line 3 and declares `:root` at line 119, so fourier's unlayered `:root`
is both later and unlayered vs. the producer's — it wins under either resolution order. The bug is therefore
**masked in exactly the one place a developer eyeballing the header would look** (`AppHeader.vue:174,180`
paint `--viz-amber` in CSS, which never touches this parser at all).

**Falsifier — and why it fails.**
1. *"Some other stylesheet re-authors `--viz-*` in hsl/rgb/hex."* — Falsified by exhaustive grep:
   `grep -rnE "^\s*--viz-(fourier|chebyshev|legendre|green|amber)\s*:" glass-ui/dist/styles/` returns exactly
   the 11 lines cited (all oklch or `var()`→oklch); `grep -rn -- "--viz-green" web/src/` returns **only**
   `colors.ts:95` (a *write*, not a CSS declaration); `web/src/style.css` declares only `--viz-amber` and
   `--section-color-5`.
2. *"`@property` registration coerces these to `rgb()` at computed-value time."* — Falsified: the registry
   is enumerated above and contains no viz/section token; `web/src/` declares no `@property` at all.
3. *"The stylesheet hasn't applied yet at `onMounted`, so `getPropertyValue` returns `''` and `colors.ts:26`
   returns the same `#888888` — so nothing changed."* — This does not save it; it produces the identical
   grey by a different route. (It is also false in both modes: production `<link>` CSS is render-blocking
   before deferred module scripts, dev-mode Vite injects `<style>` as an import side-effect of
   `main.ts:6` before `createApp`.)
4. *"Grey is the intended aesthetic."* — Falsified by `colors.ts:2-5` ("Primary viz colors are derived
   from CSS custom properties (--viz-*) **so they automatically adapt to light/dark mode**") and by the
   three distinct authored defaults it overwrites. Grey is not adaptation; it is loss.

**Epistemic status.** The parse failure is **CONFIRMED-STATIC** — the grammar is closed and the token
inventory is exhaustive; there is no input in this tree that reaches a matching branch. The *pixel*
consequence inherits that certainty through `colors.ts` → `epicycles.ts:258,283` → `ctx.strokeStyle`, with
no intervening transform. Recorded for SS-13 as a 10-second live confirmation, not as a dependency:
`getComputedStyle(document.documentElement).getPropertyValue('--viz-fourier')` in the console — expect a
string beginning `oklch(` or `light-dark(`; then read `VIZ_COLORS.fourier` — expect `"#888888"`.

**Concrete failure scenario.** Load `/visualize`. `main.ts:11` awaits `router.isReady()`, resolves the
`VisualizationView` chunk, mounts. Child `onMounted`s run; then App's `onMounted` fires
`resolveVizColors()`. The store rAF clock (census §3a) drives `BasisCanvas` redraw; `BasisCanvas.vue:127`
computes `trailColor = VIZ_COLORS.fourier` → `"#888888"`; `epicycles.ts:258` sets
`ctx.strokeStyle = hexToRgba("#888888", 0.25)`. **The epicycle chain and its trail render grey on every
frame, in both themes, forever.** Toggling dark mode re-fires the observer (`App.vue:13`) and re-poisons.
`hexToRgba` does not even raise — `#888888` is a well-formed hex, so `colors.ts:104-106` parses it happily.
The failure is **silent**: no throw, no warn, no NaN, no test signal.

**Fix locus is 3 lines and does not belong in App.vue** — add an `oklch()`/`light-dark()`/`color()` arm, or
(better, and the census §4 F.W2 direction) delete the hand-rolled parser and hand the string to value.js.
Recorded here because App.vue is the trigger and the whole failure is invisible without it.

---

## §2 — MAJOR

### L-2 · Split-brain palette *inside a single canvas frame*: `basisDisplay` snapshots `VIZ_COLORS` at module scope, so half the viz reads pre-poison values and half reads post-poison ones.

**Severity: MAJOR** (independent of L-1: it survives the L-1 fix as a broken reactivity contract, and it is
what makes L-1's symptom *incoherent* rather than merely wrong)
**Provenance**:
- `web/src/components/visualization/lib/basis-display.ts:1-7` — module-scope eager read:
  ```ts
  import { VIZ_COLORS } from "@/lib/colors";
  export const basisDisplay: Record<string, {icon: string; label: string; color: string}> = {
      fourier:   { icon: "ℱ", label: "Fourier",   color: VIZ_COLORS.fourier },
      chebyshev: { icon: "Tₙ", label: "Chebyshev", color: VIZ_COLORS.chebyshev },
      legendre:  { icon: "Pₙ", label: "Legendre",  color: VIZ_COLORS.legendre },
  };
  ```
- `web/src/lib/colors.ts:77` — `export const VIZ_COLORS = reactive({...})`
- `web/src/App.vue:10-11` — the mutation, scheduled **after** all module evaluation
- `web/src/main.ts:11` — `router.isReady().then(() => app.mount("#app"))`

**The defect.** `VIZ_COLORS` is a Vue `reactive()` object — its contract is *read at use time, inside an
effect*. `basis-display.ts` violates that contract at module scope: it reads the three properties **once**,
during chunk evaluation, and freezes plain strings into a plain object. Because `main.ts:11` awaits
`router.isReady()` before mounting, the route chunk — and therefore `basis-display.ts` — is **always**
evaluated strictly before `App.vue`'s `onMounted`. The snapshot is therefore *guaranteed* to hold the
authored defaults `#bf4040 / #3d72b8 / #9545b8`. This ordering needs no appeal to Vue's child-before-parent
hook order; it is fixed by `main.ts:11` alone.

Combine with L-1 and the same `BasisCanvas` draw pass paints two different Fouriers:

| draw site | source | value under L-1 |
|---|---|---|
| `labels.ts:39` — `ctx.fillStyle = isHovered ? VIZ_COLORS.golden : cfg.color` (`cfg` = `basisDisplay[…]`) | frozen snapshot | **`#bf4040` — red** |
| `BasisCanvas.vue:257` — `ctx.strokeStyle = isHovered ? VIZ_COLORS.golden : cfg.color` | frozen snapshot | **`#bf4040` — red** |
| `BasisCanvas.vue:127,326` — `VIZ_COLORS.fourier` | live reactive | **`#888888` — grey** |
| `labels.ts:89` — `ctx.fillStyle = VIZ_COLORS.fourier` | live reactive | **`#888888` — grey** |
| `epicycles.ts:258,283` — `hexToRgba(VIZ_COLORS.fourier, …)` | live reactive | **`#888888` — grey** |

**In one frame, the "Fourier" legend label is brick red and the Fourier epicycle chain it labels is grey.**
The label is not merely wrong — it *contradicts* the mark it names. Same for the Chebyshev/Legendre
`--track-color` swatches (`BasisSelector.vue:203`, `HarmonicLevelGrid.vue:25,48` read live → grey) against
their own labels (frozen → coloured).

**Falsifier.**
- *"`basisDisplay` inherits reactivity because `VIZ_COLORS` is a proxy."* — Falsified: the property access
  `VIZ_COLORS.fourier` evaluates to a **primitive string** at module scope; the object literal stores that
  primitive. There is no ref, no getter, no effect scope. A subsequent `VIZ_COLORS.fourier = "#888888"`
  cannot reach `basisDisplay.fourier.color`. (Also: `basis-display.ts` is at module top level — outside any
  `effectScope` — so even a computed read would have no subscriber.)
- *"The snapshot is the intended design — a stable label palette."* — Falsified by the type annotation
  `Record<string, {…; color: string}>` deriving from `VIZ_COLORS` rather than from `STATIC`
  (`colors.ts:11-19`), which is where the file's *deliberately* non-reactive constants live. If a stable
  palette were intended, `STATIC` was right there.
- *"After the L-1 fix both sides agree, so this is moot."* — Falsified: after the fix, the live side tracks
  dark-mode flips (`App.vue:13`) and the frozen side does not, so the divergence **inverts** rather than
  closes — labels keep the light-mode hex while every mark re-tints.

---

### L-3 · `MutationObserver` created without teardown, hand-rolled where the producer ships `installDarkModeSync` for exactly this.

**Severity: MAJOR** (leak/teardown + duplication + wrong-mechanism, one row)
**Provenance**:
- `web/src/App.vue:13-17` — `const observer = new MutationObserver(…); observer.observe(document.documentElement, {attributes:true, attributeFilter:["class"]});` — **`observer` is never referenced again; there is no `onUnmounted`, no `onScopeDispose`, no `disconnect()`.** The binding is dead the instant the arrow returns.
- `web/node_modules/@mkbabb/glass-ui/dist/dark.d.ts:1` — `export { useGlobalDark, installDarkModeSync, darkModeSyncScript, DARK_MODE_STORAGE_KEY } from "./composables/dark";`
- `web/node_modules/@mkbabb/glass-ui/dist/dark.js:3-11` — the producer implementation:
  ```js
  function installDarkModeSync(cb) { let { isDark } = useGlobalDark();
      watch(isDark, () => { nextTick(() => { requestAnimationFrame(cb); }); }); }
  ```
- `web/node_modules/@mkbabb/glass-ui/package.json` — `"./dark": { "types": "./dist/dark.d.ts", "import": "./dist/dark.js" }` (subpath **present** at the installed 4.0.0)
- `web/src/components/layout/DarkModeToggle.vue:19,33` — the app **already** imports `useGlobalDark` from `@mkbabb/glass-ui/dark`, so the dependency edge exists and costs nothing.

**The defect, three ways.**
1. **Teardown absent.** The observer outlives the component unconditionally. In production the root
   component is never unmounted (`main.ts` never calls `app.unmount()`), which bounds the blast radius —
   but it makes the leak *structural*: (a) Vite HMR replaces `App.vue`'s setup on edit and each replacement
   adds another permanently-live observer on `<html>`, so a dev session accumulates N observers all
   re-running `resolveVizColors()` (5 × N synchronous `getComputedStyle` style-flushes) per class mutation
   on the most-mutated element in the document; (b) any future unit test that mounts `App` leaks one
   observer per test and cross-contaminates. **The census (§3a) records no vitest floor and §4 F.W4 lists
   "a unit-test floor (vitest) decision" as open — so the second path is exactly what the formation is
   about to walk into.**
2. **Duplication of a producer facility.** `installDarkModeSync(resolveVizColors)` is a one-line drop-in
   that does strictly more: it keys off the *semantic* `isDark` ref rather than a raw `class` attribute
   string, and it defers to `nextTick` + `requestAnimationFrame` so the read happens **after** the browser
   has committed the new cascade. Per standing constellation law (glass-ui is the design system; producer
   facilities are consumed, not re-implemented), the hand-roll is a defect on its own terms.
3. **Over-broad + under-broad filter.** `attributeFilter: ["class"]` fires on **every** class mutation on
   `<html>` — not just theme flips — and each one triggers 5 forced style recalculations. Meanwhile
   `dark.js:19` shows the producer's own sync script sets **both** `classList.toggle("dark", d)` **and**
   `e.style.colorScheme = d ? "dark" : "light"`. The `class` filter catches the first and is blind to the
   second, which is the arm `light-dark.css:145-147` actually resolves against.

**Falsifier.**
- *"The root component never unmounts, so there is no leak."* — Partially true and already conceded above;
  it is why this is MAJOR and not BLOCKER. It does **not** falsify the HMR-accumulation path (each hot
  update installs a new observer while the old one keeps firing) nor the test path. And "correct only
  because it happens to be the root" is a fragile invariant nothing in the file records.
- *"`installDarkModeSync` doesn't exist / isn't reachable at this version."* — Falsified: exported at
  `dist/dark.d.ts:1`, implemented at `dist/dark.js:3-11`, subpath `./dark` present in the exports map at
  the installed `4.0.0`, and already imported by `DarkModeToggle.vue:19`.
- *"The `class` filter is sufficient because `useGlobalDark` toggles the class."* — True that it toggles the
  class (`dark.js:19`), so the observer does fire today. Does **not** falsify the wasted-recalc or the
  missing-`colorScheme` arm; and it makes the correctness dependent on an undocumented producer
  implementation detail rather than on the exported `isDark` contract.

---

### L-4 · No app-level error boundary anywhere, against 8 lazy route chunks and a mount gated on `router.isReady()`. App.vue is the only place it could live, and it is 5 lines from a mounted `<Toaster/>`.

**Severity: MAJOR**
**Provenance**:
- `web/src/App.vue:21-32` — the whole template: no `<Suspense>`, no `onErrorCaptured`, no fallback slot
- `web/src/App.vue:31` — `<Toaster />` — a user-facing error channel, mounted and unused for this purpose
- `web/src/main.ts:8-11` — `const app = createApp(App); app.use(createPinia()); app.use(router); router.isReady().then(() => app.mount("#app"));` — **no `.catch()`**, no `app.config.errorHandler`
- `web/src/router/index.ts:46-146` — 8 routes, **every** `component` a dynamic `() => import(…)`
- `web/src/router/index.ts` (whole) — no `router.onError(…)`
- Exhaustive: `grep -rn "errorHandler\|router.onError\|onErrorCaptured\|<Suspense\|ErrorBoundary" web/src/ web/index.html` → **∅**

**The defect.** Two distinct blank-page failure modes, neither handled:
1. **Initial chunk fails.** `router.isReady()` rejects (stale `index.html` pointing at hashed chunks purged
   by a redeploy — census §3f: "the host is 44 commits behind with months of silent rollback", i.e. this
   deploy topology *demonstrably* produces version skew). `main.ts:11` has no `.catch`, so `app.mount()` is
   **never called**. The user gets `<div id="app">` empty, an unhandled promise rejection in the console,
   and nothing else. No retry, no message, no reload prompt.
2. **Subsequent chunk fails.** In-app navigation to a route whose chunk 404s: vue-router aborts the
   navigation; with no `router.onError`, `<RouterView/>` (`App.vue:27`) renders nothing. The user sits in a
   correctly-rendered shell — header intact (`App.vue:25`), `<main>` blank — with **zero** signal that
   anything failed. The nav dropdown (`AppHeader.vue:130-141`) still shows the *previous* section as active,
   so the UI actively asserts a state that is false.
3. **Render error in any descendant.** Nothing captures it; Vue logs to console and the subtree unmounts.

**The aggravating detail**: `<Toaster />` at `App.vue:31` is a fully-wired global notification surface,
sitting in the same 32-line file, and the error paths never reach it. The plumbing for a decent posture is
already mounted and simply not connected.

**Falsifier.**
- *"Route components are `@/…` local imports, so they cannot fail."* — Falsified: `router/index.ts` uses
  `() => import(…)` for all 8, which Vite emits as separate hashed chunks fetched at runtime over the
  network. §3f's documented rollback/skew is a live producer of exactly this failure.
- *"A blank page is acceptable for an unrecoverable boot failure."* — Falsified by the existence of a
  cheaper posture the file already carries: `main.ts:11` could mount unconditionally and let a boundary in
  `App.vue` render a message; and `router.onError` + `toast` is a two-line addition against an
  already-mounted `<Toaster/>`.
- *"This belongs to `main.ts`/`router`, not to App.vue."* — Half true for path 1; **false for paths 2 and 3**,
  which are `onErrorCaptured`/fallback-slot concerns that can only be hosted by the component wrapping
  `<RouterView/>`. That component is App.vue, and it is the sole such component in the tree.

---

### L-5 · `SvgFilters` is **178 lines of dead DOM** with two live animation clocks — mounted unconditionally at the app root by `App.vue:22`. All four filter ids are referenced nowhere in the repository.

**Severity: MAJOR** (dead code at the largest possible scope + wasted permanent clocks; contradicts a census count)
**Provenance**:
- `web/src/App.vue:7,22` — the sole import and the sole mount site (`grep -rn "SvgFilters" web/src/` → exactly these two lines), **outside** any route guard, `v-if`, or lazy boundary
- `web/src/components/decorative/SvgFilters.vue:69,96,122,150` — `id="title-boil"`, `id="wobble-celestial"`, `id="paper-grain"`, `id="canvas-grain"`
- `web/src/components/decorative/SvgFilters.vue:20-21` — `useLineBoil(boilOffsets.length /*8*/, 150)` and `useLineBoil(wobbleOffsets.length /*8*/, 160)` — two subscribers on pencil-boil's singleton scheduler, ~6.7 fps and ~6.25 fps
- `web/src/components/decorative/SvgFilters.vue:24-45` — `applyBoilFrame`/`applyWobbleFrame`, each doing a fresh `svgRef.value.querySelector("#… feTurbulence")` then `turbEl.setAttribute("baseFrequency", …)`
- `web/src/components/decorative/SvgFilters.vue:47-48` — `watch(boilFrame, applyBoilFrame); watch(wobbleFrame, applyWobbleFrame);`

**The defect.** Repo-wide exhaustive search for any consumer of these filters:
- `grep -rn "url(#" web/src/` → **∅** (not one SVG-filter reference anywhere in the source tree)
- `grep -rn "title-boil\|wobble-celestial\|paper-grain\|canvas-grain" --exclude-dir={node_modules,.git,dist,.venv} .` → **6 hits, all inside `SvgFilters.vue` itself** (4 `id=` attributes + the 2 `querySelector` strings), plus unrelated prose in `docs/audits/**` and `docs/tranches/**`
- `grep -rn "filter=" web/src/` → only Vue props named `tier-filter`/`basis-filter` (`GalleryView.vue:232-237`)
- `web/index.html` + `web/public/` → **∅**

So: **nothing consumes any of the four filters.** `<svg width="0" height="0">` at `App.vue:22` injects four
`<filter>` definitions with 9 filter primitives into every page of the app, and two clocks mutate
`baseFrequency` on two `feTurbulence` nodes that no element references — a `setAttribute` on an unreferenced
filter primitive is pure waste: it invalidates the filter's cached state and produces no pixel.

Runtime cost, for the entire lifetime of the SPA, on every route including `/paper`: ~13 `setAttribute`
calls/sec, ~13 uncached `querySelector` descendant scans/sec, and 2 permanent subscribers holding
pencil-boil's shared rAF scheduler armed (`pencil-boil/src/vue.ts:135` `ensureScheduler()`) — meaning the
browser never idles the boil loop even on routes with no hand-drawn marks at all.

**Census correction.** CENSUS-2026-08-03 §3a (line 86) counts "**12 SVG surfaces**". Four of them are these.
The live figure for *consumed* SVG filter surfaces is **8**; the four here are inert.

**Falsifier.**
- *"The `paper-grain` filter backs the `paper-texture` class on `App.vue:24`."* — **Falsified, and this is
  the trap.** `paper-texture` is a glass-ui *CSS utility* (`glass-ui/dist/styles/cards.css:10-17`) driving
  `background-image`/`background-size` from `--paper-texture-*` tokens. It never references an SVG filter.
  The near-miss name `paper-grain-overlay` in `glass-ui/dist/styles/paper.css:29` is likewise a CSS
  `@utility` with an `::after` overlay — a *different artefact* that merely shares a substring. The
  similarity is why this survived.
- *"A filter is applied dynamically from JS."* — Falsified: no `style.filter =`, no `setAttribute("filter"…)`,
  no template-literal `url(#${…})` anywhere in `web/src/` (checked `url(#`, `filter=`, `filterId`, `.filter =`).
- *"They're referenced with quotes — `url(\"#title-boil\")` — which the `url(#` grep would miss."* —
  Falsified by the id-name grep, which is quoting-agnostic and returned only self-references.
- *"Dead but harmless — it's a `width=0` SVG."* — Falsified by the two live clocks (`:20-21`), which are
  work, not markup.
- *"It's staged for an imminent consumer."* — UNPROVEN either way from the tree; recorded as such. It does
  not change the disposition: today it is dead, and it is dead at the **root**, which is the most expensive
  possible place to be dead.

---

## §3 — MINOR

### L-6 · Theme-sync logic colocated in the root SFC instead of `lib/colors.ts` or a composable.
**Severity: MINOR** · **Provenance**: `web/src/App.vue:10-18` (the whole `onMounted` body) vs
`web/src/lib/colors.ts:90-96` (`resolveVizColors`, the module that owns the concern).
The *policy* ("re-resolve on theme change") lives in the root SFC while the *mechanism* lives in `lib/`.
Consequences: (a) the observer has no teardown surface a caller could hold (L-3); (b) the behaviour is
untestable without mounting the whole app; (c) `lib/colors.ts` exports a routine whose scheduling contract
is documented only as a docstring at `colors.ts:89` ("Call on mount + theme toggle") — a comment where a
`useVizColorSync()` composable returning a stop handle would be a type. `colors.ts` already imports from
`vue` (`:8`), so a composable there costs no new dependency edge.
**Falsifier**: *"32 lines is small; extraction is over-engineering (KISS)."* — Partially valid, and it is why
this is MINOR not MAJOR. It does not falsify the teardown-surface point (L-3), which is a correctness
consequence of the colocation, not a style preference.

### L-7 · `VIZ_COLORS.green` is written by `resolveVizColors()` and read by nobody. Dead field, dead write, dead token dependency.
**Severity: MINOR** · **Provenance**: `web/src/lib/colors.ts:82` (`green: "#4d8f66"`), `:95`
(`VIZ_COLORS.green = cssVarToHex("--viz-green")`), triggered by `App.vue:11`.
`grep -rn "VIZ_COLORS\.green" web/src/` → **∅** outside `colors.ts` itself. One of the five forced style
reads App.vue schedules on every boot *and every theme flip* (L-3) computes a value nothing consumes.
**Falsifier**: *"It's read via destructuring or dynamic key."* — Falsified: `grep -rn "VIZ_COLORS" web/src/`
enumerates 14 files; every access is a literal static property read (`.fourier`/`.chebyshev`/`.legendre`/
`.amber`/`.golden`/`.rainbow`/`.pink`/`.emerald`); there is no `VIZ_COLORS[` computed access and no
destructuring of `green` anywhere.

### L-8 · `SvgFilters` re-implements a reduced-motion gate the producer composable already owns, and re-queries the DOM every frame.
**Severity: MINOR** · **Provenance**:
`SvgFilters.vue:7-9` — `const reducedMotion = … matchMedia("(prefers-reduced-motion: reduce)").matches` (a
**non-reactive** one-shot read at setup); `:25` and `:37` — `if (reducedMotion || !svgRef.value) return;`
vs. `pencil-boil/src/vue.ts:129` — `if (prefersReducedMotion()) return;` **inside `start()`**, so a
PRM-preferring user's subscriber never enrols and `currentFrame` never advances, so the two `watch`es at
`SvgFilters.vue:47-48` never fire and the local guards are unreachable.
Also `:26-28` / `:38-40`: `querySelector("#… feTurbulence")` is re-run on **every** frame instead of being
resolved once in `onMounted` (`:51-56` already has the mount hook where the handle would be cached).
Compounding: because the local `reducedMotion` is a plain `const`, a user who *changes* the OS preference
mid-session gets no update — whereas the producer's gate is consulted per `start()`.
**Falsifier**: *"Defence in depth — the double gate is deliberate."* — Weakened by the non-reactivity (a
stale one-shot snapshot is not defence) and by the fact that `useLineBoil`'s PRM gate is documented in the
producer source at `vue.ts:125-130`, i.e. it is a stated contract, not an accident. Also note this row is
**subordinate to L-5**: if the dead filters go, the whole file goes and this dissolves with them.

### L-9 · `cssVarToHex`'s hex fast-path is unreachable in this tree, and would forward unvalidated 3-/4-/8-digit hex into fixed-slice parsers.
**Severity: MINOR** · **Provenance**: `web/src/lib/colors.ts:29` — `if (raw.startsWith("#")) return raw;`
against `colors.ts:100-113` (`hexToRgba`/`hexToRgb`, both doing `hex.slice(1,3)`, `slice(3,5)`, `slice(5,7)`
with no length check).
Every `--viz-*` token in the live cascade is `oklch()` / `light-dark()` / `hsl()` (L-1), so `:29` is dead
today. Were the L-1 fix delivered by re-authoring tokens as hex (a plausible cheap patch), a `#f0b` or
`#f0b632ff` token would sail through `:29` and reach `hexToRgb`, which would slice `"0b"`/`""`/`""` →
`[11, NaN, NaN]` → `rgba(11, NaN, NaN, 0.25)` → an invalid `strokeStyle` that Canvas2D **silently ignores**,
leaving the previous stroke colour in place. A latent trap sitting directly on the L-1 repair path.
**Falsifier**: *"Unreachable code is not a defect."* — Accepted for the reachability half (hence MINOR, and
hence recorded as a *repair-path hazard* rather than a live bug). The missing length validation at
`:100-113` is unconditional and independent of reachability.

---

## §4 — INFO

### L-10 · R5-7 scope: App.vue does not trigger the class, but it is the apex of the blindness cone — and it adds a *second* blind edge the intake did not name.
**Severity: INFO** (a derivation-scoping caveat, not a defect in App.vue)
**Provenance**: `web/src/App.vue:21-32` — **zero `v-for`**, native or component; `App.vue:27` — `<RouterView />`;
intake `lane-fourier-r3-r6.md` R5-7 (ADOPT-AS-FACT, CARRY→F.W4) and R6-5/R6-6 (the `NATIVE_TEMPLATE_LOOP`
cure, `nativeTemplateLoops: 16`).

R5-7's class — *template-loop evidence keyed to component callsites is blind to native element loops* —
cannot fire inside App.vue: the template has no loop at all. But App.vue is where any instance derivation
**starts**, and from that root the blindness is **double**:
1. **R5-7's edge (inherited).** `PaperSidebar.vue`'s three nested native `<li v-for>` (intake-verified live
   at lines 65, 87, 105) sit under `App.vue:26` `<main>` → `App.vue:27` `<RouterView/>` → the `/paper` chunk.
   A deriver walking from App.vue registers component callsites only and drops the entire ToC subtree —
   exactly R5-7's `instance.loop.paper-sidebar = []`.
2. **A second edge, unnamed by the intake: `<RouterView/>` is a dynamic-component boundary.** All 8 routes
   are `() => import(…)` (`router/index.ts:46-146`), so **no static callsite for any route component exists
   in any template**. A callsite-keyed deriver rooted at App.vue sees `RouterView` as *one* leaf and
   terminates. The subtree it drops is the census's ~20.6k LOC / 66 SFC (§3a) — i.e. **the application**.

Practical consequence for F.W4's per-component D/L/C audit: R6-5's `NATIVE_TEMPLATE_LOOP` family cures edge
(1) but **not** edge (2). A denominator built from App.vue must seed from the route table
(`router/index.ts:46-146`), not from template traversal, or it will report a tree of depth ~4.
**Falsifier**: *"`RouterView` resolves at runtime, so a runtime-instrumented deriver sees through it."* —
True, and it is the cure; it falsifies the claim only for *runtime* derivations. R5's derivation was
source-keyed (`"callsiteId": "callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0"`),
and a source-keyed walk cannot resolve a dynamic import to a component. Recorded as a scoping constraint on
the derivation method, not as a claim about App.vue's code.

### L-11 · Three-root fragment template — benign here, recorded so it is not re-litigated.
**Severity: INFO** · **Provenance**: `App.vue:22` `<SvgFilters/>`, `:23-30` `<TooltipProvider>`, `:31` `<Toaster/>`.
A multi-root component disables attribute fallthrough and makes `#app > *` selectors ambiguous. Checked and
clean: `grep -rn "#app" web/src/style.css web/index.html` → **∅** (no such selector exists), and the root
component receives no attrs from `app.mount()`, so no `Extraneous non-props attributes` warning can fire.
Also checked: `<Toaster/>` sits **outside** `<TooltipProvider>`, which is correct — toast content is
portaled and carries no tooltip descendants (`grep -rn "Toaster" web/src/` → App.vue only).
**Falsifier**: *"A future `#app > div` style rule or a root-level `<Transition>` breaks."* — Speculative;
recorded as INFO precisely because nothing in the tree depends on it today.

---

## §5 — Superlatives (L-18 runs both ways; each carries its own falsifier)

### S-1 · Goldilocks size — 32 lines, and the root does not accrete. **PARTIALLY FALSIFIED by its own falsifier.**
**Provenance**: `App.vue` = 32 lines total; 8 imports, one hook, 11 template lines. No Pinia store wiring
(deferred to `main.ts:9` and to the consumers — `AppHeader.vue:49-50`), no auth bootstrap, no i18n, no
analytics, no layout god-logic. Against the census's 66 SFC / ~20.6k LOC tree (§3a) this is a genuinely
disciplined root; the "app root as junk drawer" failure mode is absent.
**Falsifier — and it partly lands**: a root is only correctly small if nothing that *belongs* there is
missing. **L-4 falsifies exactly one item**: the app-level error boundary belongs here and is absent, so
part of the smallness is omission rather than discipline. The remainder holds — no *misplaced* concern was
found in the file. Recorded as a superlative with a named debit rather than withdrawn.

### S-2 · Producer-first imports: App.vue is the **only** file in the tree on the canonical glass-ui tooltip path, and its two producer subpaths are uplift-clean.
**Provenance**: `App.vue:4` — `import { TooltipProvider } from "@mkbabb/glass-ui/tooltip";` and `:5` —
`import { Toaster } from "@mkbabb/glass-ui/toast";`. Meanwhile **9** files
(`PaperSidebar`, `BasisSelector`, `ContourSettings`, `CanvasControlsDock`, `VisualizationView`,
`AnimationControls`, `EditorControlsDock`, `FunctionInput`, `CoefficientsSpectrum`) route through the local
shadow adapter `web/src/components/ui/tooltip/{Tooltip.vue,index.ts}` — the surface intake row **R3-7a**
budgets for F.W3 (35 callsites / 9 consumers). App.vue is already where that migration is going.
Both subpaths verified live in the installed exports map:
`"./tooltip": {"types":"./dist/tooltip.d.ts","import":"./dist/tooltip.js"}`,
`"./toast": {"types":"./dist/toast.d.ts","import":"./dist/toast.js"}`.
**Falsifier — checked, does not land**: *"These subpaths are removed at glass-ui 7.0.0, so App.vue is a
break site in the F.W1 tri-package uplift."* — The census §3a break surface enumerates the removals in live
use: `metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2, dock members (`DockIconButton` ×2,
`DockDropdownTrigger` ×1), `ToastVariant` **definition-absent** (`useToast.ts:3,9`), plus the
`lucide-vue-next → @lucide/vue` rename ×35. **Neither `./tooltip` nor `./toast` appears**, and App.vue
imports the `Toaster` *component*, not the removed `ToastVariant` *type*. App.vue is expected to survive the
F.W1 atomic uplift **untouched**. (Note the contrast: `AppHeader.vue:8` — `lucide-vue-next` — is one of the
35 rename sites; App.vue imports no icons and is clean there too.)
**Second falsifier — checked, does not land**: *"App.vue should use the local adapter for consistency."* —
Inverted by standing constellation law (glass-ui is the design system; the adapter is the shadow to retire,
not the target to converge on).

### S-3 · Correct singleton placement of both global providers, with explicit non-default timings.
**Provenance**: `App.vue:23` — `<TooltipProvider :delay-duration="400" :skip-delay-duration="200">` wrapping
the entire shell; `App.vue:31` — a single `<Toaster />`.
`grep -rn "TooltipProvider" web/src/` → **3 hits, all in App.vue**. `grep -rn "Toaster" web/src/` → **2 hits,
both in App.vue**. There is exactly one of each, at the true root, above `<RouterView/>` — so all 35+
tooltip callsites (intake R3-7a: 35 over 9 consumers, +1 here) share one provider and one skip-delay group,
which is what makes the hover-to-hover skip behaviour coherent across the app. The timings are *stated*
(400/200) rather than inherited from library defaults — the contract is legible at the one place it is set.
**Falsifier — checked, does not land**: *"A second provider is mounted in a view or a portaled surface,
splitting the skip-delay group."* — Falsified by the greps above (zero other mounts). *"Portaled content
(`DropdownMenuContent` at `AppHeader.vue:133`, `HoverCardContent` at `:74`) escapes the provider's DOM
subtree and loses the injection."* — Falsified: Vue's `provide`/`inject` follows the **component** tree, and
`<Teleport>` preserves component-tree parentage regardless of DOM destination.

---

## §6 — Disposition

**App.vue is 32 lines of otherwise-exemplary root shell wrapped around one line that breaks the product.**
The uncomfortable shape of this challenge is that every LIBRARY-axis *structural* metric comes back green —
size, colocation of the shell itself, provider placement, producer-first imports, uplift-cleanliness — while
the component's sole imperative act (`App.vue:11`) silently greys out the visualization the application is
named for, and its second act (`App.vue:13`) re-commits that damage on every theme toggle without ever
being torn down.

Ordered:

| # | Row | Severity | Locus of repair | Lands in |
|---|---|---|---|---|
| 1 | **L-1** oklch/light-dark parse failure → `#888888` viz basis | **BLOCKER** | `lib/colors.ts:22-54` (add the arm, or delete the parser per census §4 F.W2 and hand the string to value.js) | **F.W2** — but the BLOCKER should not wait for a wave |
| 2 | **L-2** `basisDisplay` module-scope snapshot breaks the `reactive()` contract | MAJOR | `visualization/lib/basis-display.ts:1-7` → getters or `computed` | F.W4 |
| 3 | **L-4** no error boundary; blank-page ×3 | MAJOR | `App.vue` (`onErrorCaptured` + fallback) + `main.ts:11` `.catch` + `router.onError` → the already-mounted `<Toaster/>` | F.W4 |
| 4 | **L-5** `SvgFilters` — 178 lines dead at the root + 2 permanent clocks | MAJOR | delete `App.vue:7,22` + the file; **correct census §3a's "12 SVG surfaces" → 8** | F.W4 (dead-code scrub) |
| 5 | **L-3** observer leak + producer-facility duplication | MAJOR | `App.vue:13-17` → `installDarkModeSync(resolveVizColors)` from `@mkbabb/glass-ui/dark` | F.W3 (glass suffusion) |
| 6 | L-6 · L-7 · L-8 · L-9 | MINOR | `lib/colors.ts` + `SvgFilters.vue` (L-8 dissolves with L-5) | F.W4 |
| 7 | L-10 · L-11 | INFO | derivation-method constraint for F.W4's denominator; no code change | F.W4 (method) |

**Two corpus amendments this challenge asks for:**
1. **CENSUS §3f line 174** — "no `oklch()` arm" is filed as a PLAW-BIND deletion-target. Re-file it as a
   **live BLOCKER**: every `--viz-*` token in the consumed producer is oklch, so the missing arm is not
   latent. It should not ride the F.W2 value.js-consumption wave.
2. **CENSUS §3a line 86** — "12 SVG surfaces" over-counts by 4; `SvgFilters.vue`'s `title-boil`,
   `wobble-celestial`, `paper-grain`, `canvas-grain` have zero consumers repo-wide (L-5).

**Routed to SS-13** (live confirmation only — neither claim depends on it):
- `getComputedStyle(document.documentElement).getPropertyValue('--viz-fourier')` → expect a string opening
  `oklch(` or `light-dark(`; then `VIZ_COLORS.fourier` → expect `"#888888"`. Confirms L-1 in ~10 seconds.
- Screenshot `/visualize`: expect the "Fourier" legend label **red** and the epicycle trail **grey** in the
  same frame. Confirms L-2's split-brain visually.

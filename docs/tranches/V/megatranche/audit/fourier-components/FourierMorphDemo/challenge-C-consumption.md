claude-opus-5[1m]

# Challenge · FourierMorphDemo · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/morph/FourierMorphDemo.vue` (330 lines)
**Axis** how this component consumes value.js `0.13.0`, keyframes.js `4.3.0`, glass-ui `^4.0.0` (installed 4.0.0), pencil-boil `0.4.1`, and the fourier API; props/emits contract quality; integration seams.
**Mode** static + source-derived, read-only. No dev server, no browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every row below carries severity · `file:line` provenance · its own falsifier.

## Read set (whole, read-only)

Component: `FourierMorphDemo.vue`.
Direct imports: `MorphShapePreview.vue` (175) · `MorphPhaseConfig.vue` (212) · `HarmonicLevelGrid.vue` (286) · `composables/useFourierMorph.ts` (230) · `composables/useMorphConfig.ts` (97) · `lib/svg-fourier.ts` (154) · `assets/fourier-paths/sun.json` (225 687 B) · `assets/fourier-paths/moon.json` (224 944 B) · `@mkbabb/glass-ui/button` · `lucide-vue-next`.
Transitive: `lib/easings.ts` (127) · `lib/colors.ts` (117) · `lib/types.ts` · `decorative/FourierMorphSvg.vue` (41) · `@mkbabb/value.js` dist · `@mkbabb/keyframes.js` dist + `keyframes.d.ts` · `@mkbabb/pencil-boil` (`catmullRomToBezier`) · glass-ui `4.0.0` dist (`slider.d.ts`, `components/ui/slider/*`, `components/ui/button/index.d.ts`, `styles/**`).
Context for the seam: `App.vue` · `main.ts` · `AppHeader.vue` · `layout/DarkModeToggle.vue` · `morph/FourierShapeExtractor.vue` · `lib/api.ts` · `vite.config.ts` · `web/package.json`.

**Tally — 21 defects (2 BLOCKER · 10 MAJOR · 7 MINOR · 2 INFO) · 3 superlatives · 1 explicit contradiction of the hitherto corpus.**

---

## §1 · BLOCKERS

### C-1 — BLOCKER · the `slider-color` prop is inert: glass-ui 4.0.0 has no `--slider-scrub-*` surface

`FourierMorphDemo.vue:31,41,51` is the component's entire visual grammar for the three phase cards — Settle-Out red, Morph pink, Settle-In red:

```
:31  slider-color="var(--accent-red)"
:41  slider-color="var(--accent-pink)"
:51  slider-color="var(--accent-red)"
```

The prop lands at `MorphPhaseConfig.vue:29` (`:style="{ '--track-color': sliderColor ?? 'var(--accent-red)' }"`) and is spent at `MorphPhaseConfig.vue:205-211`:

```css
--slider-scrub-range-bg:        color-mix(in srgb, var(--track-color) 30%, transparent);
--slider-scrub-range-bg-hover:  color-mix(in srgb, var(--track-color) 45%, transparent);
--slider-scrub-thumb-bg:        var(--track-color);
--slider-scrub-thumb-bg-hover:  var(--track-color);
```

**None of those four custom properties exists in the pinned producer.** Measured:

```
$ grep -rn "slider-scrub" web/node_modules/@mkbabb/glass-ui/dist/ | wc -l
0
$ grep -rhoE '\-\-slider-[a-z0-9-]+' .../dist/glass-ui.css .../dist/styles/*.css | sort -u
--slider-range-bg  --slider-range-blur  --slider-range-shadow
--slider-thumb-bg  --slider-thumb-border-color  --slider-thumb-shadow
--slider-thumb-size  --slider-thumb-spring
--slider-track-bg  --slider-track-height
```

The real 4.0.0 channel is `--slider-range-bg` / `--slider-track-bg` / `--slider-thumb-bg`. The `scrub` infix is a **`glass-scrubber`-era name that died with the variant**: lane-frontend §5's prior-art diff records the WT bump renaming `variant="glass-scrubber"` → `variant="standard"` on 9 lines and nothing else — the companion custom properties were never renamed with it. `MorphPhaseConfig.vue:98,204` still says *"glass-scrubber's array model" / "glass-scrubber per-instance retint hook"* — the comments are the fossil that dates the break.

Worse at the second order: `glass-ui/dist/components/ui/slider/index.d.ts` documents `standard` as *"the CONTINUOUS GLASS CYLINDER with **NO VISIBLE THUMB AT ALL** … the reka `<SliderThumb>` STAYS MOUNTED … but paints INVISIBLE: width 0, opacity 0, transparent"*, and the fill *"tinted to `--primary`"*. So two of the four written properties address an element that is invisible by construction at the chosen variant, and the fill the user actually sees is tinted from `--primary` — which the demo never sets.

**Consequence.** All three phase sliders, plus both harmonic-bound sliders (`HarmonicLevelGrid.vue:25,48,208-214`, identical dead block), paint the identical default `--primary` tint. The demo's color-coded phase legend — which `MorphShapePreview.vue:165-174` mirrors on the status chips with the *same* `--accent-red`/`--accent-pink` pair and which *does* work there because it is plain scoped CSS — is broken on exactly the half that goes through the producer component.

**Falsifier.** Any of `--slider-scrub-range-bg`, `--slider-scrub-range-bg-hover`, `--slider-scrub-thumb-bg`, `--slider-scrub-thumb-bg-hover` appearing in `@mkbabb/glass-ui@4.0.0` dist CSS/SFC payload, or a Slider `standard` recipe that reads a `--track-color`-derived var. Zero hits across the whole `dist/` tree. **Falsifier not met — CONFIRMED static.** (The *rendered* pixel is SS-13, but the property-name absence is byte-exact.)

**Carry.** The fix is a rename, not a redesign: `--slider-scrub-range-bg → --slider-range-bg`, `--slider-scrub-thumb-bg → --slider-thumb-bg`, drop the two `-hover` rows (no producer analogue), and re-verify against 7.0.0 during the tri-package bump (lane-frontend §9 carry 1) rather than after.

---

### C-2 — BLOCKER · `VIZ_COLORS` resolves to `#888888`: the hand-rolled `colors.ts` parser has no `oklch()` / `light-dark()` arm

`HarmonicLevelGrid.vue:25,48` — reachable from this component at `FourierMorphDemo.vue:58-67` — tints both harmonic-bound sliders from the JS palette:

```
:25  :style="{ '--track-color': VIZ_COLORS.chebyshev }"
:48  :style="{ '--track-color': VIZ_COLORS.chebyshev }"
```

`VIZ_COLORS` is `reactive` at `lib/colors.ts:77-87` with literal seeds (`chebyshev: "#3d72b8"`), overwritten at app mount by `resolveVizColors()` (`colors.ts:89-95`, invoked `App.vue:11` + on every `.dark` class flip via the `MutationObserver` at `App.vue:12-17`). `resolveVizColors` funnels every token through `cssVarToHex` (`colors.ts:21-57`), which has exactly four arms:

| arm | `colors.ts` line | matches |
|---|---|---|
| `#hex` passthrough | :27 | `#rrggbb` |
| `hsl(…)` | :30-37 | `hsl(h s% l%)` |
| bare HSL triplet | :40-44 | `6 72% 49%` |
| `rgb(…)` | :47-53 | `rgb(r,g,b)` |
| **fallback** | :26, :55 | **`return "#888888"`** |

The pinned producer ships every viz token in **oklch, wrapped in `light-dark()`**:

```
glass-ui/dist/styles/tokens/color-radius.css:263  --viz-fourier:   oklch(0.579 0.201 30.4);
                                            :264  --viz-chebyshev: oklch(0.484 0.163 265.5);
                                            :265  --viz-legendre:  oklch(0.532 0.180 317.5);
glass-ui/dist/styles/tokens/light-dark.css:146    --viz-chebyshev: light-dark(oklch(0.484 0.163 265.5), oklch(0.718 0.107 268.4));
glass-ui/dist/styles/tokens/dark-arm.css:114      --viz-chebyshev: oklch(0.718 0.107 268.4);
```

and the producer explicitly declines to register them as typed `<color>` properties — `light-dark.css:52-56`: *"`@property … syntax:"<color>"` … glass-ui's only `@property` registrations (§18) …"* (confirmed: `tokens/property-regs.css` registers `--progress-crescendo`, `--phase-tint-amount`, ripple/specular/glass-level/ui-scale — **no color registration**). An unregistered custom property's computed value is the substituted token stream, so `getComputedStyle(document.documentElement).getPropertyValue("--viz-chebyshev")` yields a string beginning `oklch(` or `light-dark(`. Neither matches any arm. **`VIZ_COLORS.chebyshev === "#888888"` after mount.**

Both harmonic sliders therefore start blue (`#3d72b8` seed, first paint) and turn **grey** the moment `App.vue`'s `onMounted` runs — and stay grey through every dark-mode flip. `--viz-amber` is the *only* survivor, and only by accident: `web/src/style.css:120,125` locally re-declares it as `hsl(35 76% 35%)` / `hsl(37 73% 67%)` for an unrelated WCAG contrast carry (lane-frontend §8), which happens to land in the `hsl(…)` arm.

The consumption indictment is the point: **`@mkbabb/value.js` is already a hard dependency of this component's graph and already in its chunk** (see C-3), and parsing `oklch()`/`light-dark()` into RGB is precisely what it exists to do. A 117-line hand-rolled parser was written alongside a pinned CSS-color library and does not handle the producer's own token format.

**Falsifier.** A stylesheet in the demo's cascade re-declaring `--viz-chebyshev` (or `--viz-fourier`/`--viz-legendre`/`--viz-green`) in hex/hsl/rgb before `resolveVizColors()` runs. `grep -rn 'viz-' web/src/style.css` returns only the four `--viz-amber` lines (:113,114,120,125); `find web/src/styles` → the directory does not exist (lane-frontend §8, A.W2 abrogation). **Falsifier not met — CONFIRMED static.** The rendered grey is SS-13; the parser's arm-set and the token's oklch form are byte-exact.

**Carry, with a caveat the megatranche must honour.** The natural repair is value.js `parseCssColor`. Memory records the parser-proof gate's **R1 = live `parseCssColor("oklch()")` shipping crash** at value.js 4.0.0 (`apotheosis/parser-proof/GATE-VERDICT.md`). So this row is a *bidirectional* carry: fourier needs an oklch arm; value.js must land R1 before fourier can take the clean one. Do not repair `colors.ts` by bolting on a fifth regex — that manufactures a sixth fork of a parser the constellation is mid-way through consolidating.

---

## §2 · MAJOR

### C-3 — MAJOR · the documented value.js lazy boundary is FALSE; `vendor-math` (value.js + KaTeX) is eager on every route

`useFourierMorph.ts:33-36` states the consumption contract in prose:

> *"keyframes 2.2.0 moves the value.js-bearing `Animation` engine behind the `loadAnimationEngine()` dynamic boundary, **so value.js no longer rides the eager bundle — it loads on first morph.**"*

The tree contradicts it on two independent paths.

1. **Static import chain, unbroken to the app entry.** `main.ts:3` → `App.vue:6` `import AppHeader` → `AppHeader.vue:6` `import DarkModeToggle from "./DarkModeToggle.vue"` → `DarkModeToggle.vue:20` `import { useFourierMorph } from "@/composables/useFourierMorph"` → `useFourierMorph.ts:21-27` `import { … } from "@/lib/easings"` → `easings.ts:9,16` `import { timingFunctions } from "@mkbabb/value.js"`. Every edge is a static ESM import. `vite.config.ts:52` assigns `"vendor-math": ["@mkbabb/value.js", "katex"]`, so the KaTeX+value.js chunk is a static dependency of the entry chunk — on `/gallery`, on `/paper`, on every route, whether or not a morph ever runs.
2. **keyframes cannot lazy-load value.js anyway.** `node_modules/@mkbabb/keyframes.js/package.json` → `dependencies: {"@mkbabb/parse-that":"^0.9.0","@mkbabb/value.js":"^0.13.0"}` — value.js is a hard runtime dep of the engine the dynamic boundary defers, so the boundary can at best defer *when* it loads, never *whether*.

The dynamic boundary is not useless — it does keep the `Animation` engine out of the entry chunk — but the sentence that justifies it is wrong about its subject, and a migration planner reading `useFourierMorph.ts:33-36` will mis-budget the value.js leg of the tri-package bump (lane-frontend §9 carry 5 sizes the value.js consumer surface at "5 sites, `easeInOutSine` + `timingFunctions`" — correct as a *site* count, materially understated as a *load* cost).

**Falsifier.** Any `import()` / `defineAsyncComponent` on the `App → AppHeader → DarkModeToggle → useFourierMorph → easings` path, or a `vendor-math` chunk not reachable from the entry. `grep -n "DarkModeToggle" AppHeader.vue` → `:6` static, `:141` template use; `App.vue:6` static; all four intermediate imports are top-level. **Falsifier not met — CONFIRMED static.** Exact transferred bytes are SS-13 (needs a real `vite build` chunk graph).

### C-4 — MAJOR · `handleReset` is the only handler without the `isAnimating` guard → Reset resurrects the morph it interrupted

`FourierMorphDemo.vue` guards two of three handlers and forgets the third:

```
:128  async function handleToggle()      → if (isAnimating.value) return;   ✓
:138  function handlePreviewClick(level) → if (isAnimating.value) return;   ✓
:175  function handleReset()             → (no guard)                        ✗
```

The Reset `<Button>` at `:75-78` also carries no `:disabled`, unlike the preview button (`:18 :disabled="isAnimating"` → `MorphShapePreview.vue:4`). So Reset is live for the whole ~350 ms morph.

Pressing it mid-morph calls `morph.setShape()` (`useFourierMorph.ts:89`) → `stopAnim()` → `currentAnim.stop()`. The producer's contract for that call, `keyframes.d.ts:524-529`: *"Halt playback where it stands: cancel the loop AND the WAAPI compositor animations, settle state, and **resolve any pending `play()` promise**."* So the `await new Promise(...)` the in-flight `morphTo` is parked on (`useFourierMorph.ts:170-179` / `:186-193`) **resolves**, and `morphTo` marches straight into the next phase — `phase.value = "morph"`, a fresh `createTweenAnimation`, then settle-in, then `activeShape = to` at `:197`. The reset is silently overwritten by the animation it was meant to cancel, and the shape ends on the destination the user never re-confirmed.

Compounding: `morphTo` destructures its durations and easings once at `:151-160`, *before* the awaits. `morphConfig.reset()` therefore changes nothing about phases 2–3 — they finish on the pre-reset timings while `morphConfig.config` already reads the defaults. Config and behaviour split for the remainder of the run.

This does not permanently lock the UI (the run terminates, `phase` returns to `"idle"` at `:210`), which is why it is MAJOR and not BLOCKER.

**Falsifier.** (a) a `stop()` that leaves the play promise pending — the d.ts says the opposite, twice (`:524-529` for `Animation`, `:887-891` for the sibling class); or (b) a guard reaching `handleReset` — there is none, and no `:disabled` on `FourierMorphDemo.vue:75`. **Falsifier not met.** The resulting pixel sequence is SS-13.

### C-5 — MAJOR · the morph composable holds a *copy* of the config, so Reset renders the value the user just discarded

`FourierMorphDemo.vue:107-111` establishes two sources of truth and a lossy bridge:

```
:107  const morphConfig = useMorphConfig();                                 // reactive<MorphConfig>
:108  const morph = useFourierMorph({ config: { ...morphConfig.config } }); // SPREAD → snapshot
:111  morphConfig.syncWith(morph);                                          // watch → updateConfig
```

`useFourierMorph.ts:77` re-wraps the snapshot (`ref({ ...(options.config ?? DEFAULT) })`), so the morph composable owns a detached copy. `syncWith` (`useMorphConfig.ts:78-84`) is a default-`flush: 'pre'` watcher — it runs in the pre-render job queue, i.e. **after** the current synchronous call stack.

Trace the Reset path with a user who dragged High from 50 to 30:

| step | `morphConfig.config.highLevel` | `morph.config.value.highLevel` | `morph.harmonicLevel` |
|---|---|---|---|
| mount | 50 | 50 (snapshot) | 50 |
| drag High → 30 | 30 | 30 (watcher flushed) | **50** — nothing recomputes it |
| `handleReset()` `:176` `morphConfig.reset()` | 50 | 30 *(watcher not yet flushed)* | 50 |
| `handleReset()` `:177` `morph.setShape(currentShape.value)` | 50 | 30 | **30** — `setShape` reads its own stale copy (`useFourierMorph.ts:92-93`) |
| watcher flushes | 50 | 50 | **30 — never revisited** |

`updateConfig` (`useFourierMorph.ts:106-108`) is a pure `Object.assign` on the config ref; it recomputes neither `harmonicLevel` nor `currentPoints`. So **Reset drives the preview to the discarded value and leaves it there**: the chip reads `n=30` (`MorphShapePreview.vue:19`) while `HarmonicLevelGrid` highlights 50 as the bound (`FourierMorphDemo.vue:63`). Two views of one number, disagreeing, immediately after the control whose whole job is to make them agree.

The same detachment explains a quieter symptom: dragging High at any time changes the grid's `is-bound` ring but never the preview shape, because nothing re-invokes `setShape`/`setLevel`.

**Falsifier.** `flush: 'sync'` on the `syncWith` watcher (`useMorphConfig.ts:82` passes only `{ deep: true }`), or `setShape` reading `morphConfig.config` directly (it reads `config.value`, `useFourierMorph.ts:92-93`), or an `updateConfig` that re-derives `currentPoints` (it does not, `:106-108`). **Falsifier not met.** The visible chip mismatch is SS-13; the ordering is deterministic from Vue's documented pre-flush.

The structural repair is to stop copying: hand the `reactive` object itself to `useFourierMorph` and delete `syncWith` (and with it C-16). The spread at `:108` is the entire cause.

### C-6 — MAJOR · `previewLevels` runs to 100 while the shape data stops at 50 — three grid cells render the identical path under three different labels

`FourierMorphDemo.vue:60` feeds the grid a level ladder derived with no reference to the shape:

```
:60  :levels="morphConfig.previewLevels.value"
:59  :shape="currentShape"
```

`computePreviewLevels` (`useMorphConfig.ts:27-39`) hard-codes `[1,2,3,5,8,12,18,25,35,50,75,100]`. The shipped shapes stop at 50 — measured:

```
$ node -e '…sun.json…'   levels: [1,2,3,5,8,12,18,25,35,50]  n_harmonics 50  partial_sums keys: 10
$ node -e '…moon.json…'  levels: [1,2,3,5,8,12,18,25,35,50]  n_harmonics 50  partial_sums keys: 10
```

`HarmonicLevelGrid.vue:129-132` calls `interpolateAtHarmonicLevel(shape, 75)` and `(shape, 100)`; `svg-fourier.ts:130-131` clamps to `maxLevel = 50`. So cells `n=50`, `n=75`, `n=100` render **byte-identical paths** while claiming three different harmonic counts — on a page whose entire subject is what harmonic truncation looks like.

The same ladder poisons the controls. `HarmonicLevelGrid.vue:44` gives the High slider `max="100"`; `:34-39` gives the number input `max="100"`. Setting High to 80 is accepted, echoed by the chip (`MorphShapePreview.vue:19` via `FourierMorphDemo.vue:15`), and silently clamped to 50 by every consumer. And `handlePreviewClick` (`FourierMorphDemo.vue:143-146`) will happily write `highLevel = 100` when the user clicks the phantom cell.

The fix is one line and is *already available at the seam*: `currentShape.value.data.levels` is right there (the component already reads it at `:117` for `nearestActiveLevel`). `computePreviewLevels` should intersect its candidate ladder with the shape's real `levels`, and the sliders' `max` should be `data.levels.at(-1)`.

**Falsifier.** A shape JSON with levels above 50, or an `interpolateAtHarmonicLevel` that extrapolates past `maxLevel`. Both shapes cap at 50 (measured above); `svg-fourier.ts:131` `Math.min(maxLevel, harmonicLevel)` clamps. **Falsifier not met — CONFIRMED static.**

### C-7 — MAJOR · `getPath()` is an uncached function call inside a `v-for`, re-run 12× per level crossing during every morph

`HarmonicLevelGrid.vue:66-75` calls `getPath(level)` in the render function for each of ~12 cells. `getPath` (`:129-132`) is a plain function — no `computed`, no memo — doing, per call:

- `interpolateAtHarmonicLevel` → `lerpPoints` over **512 points** (`svg-fourier.ts:94-106`; measured: `partial_sums[k].x.length === 512` for every level of both shapes);
- `pointsToSvgPath` → a **512-iteration** loop building a 512-cubic-segment `d` string with modular wrap (`svg-fourier.ts:56-72`).

The grid re-renders whenever any bound prop changes. `:active-level="nearestActiveLevel"` (`FourierMorphDemo.vue:61`) is a computed over `morph.harmonicLevel` (`:115-120`), which the morph mutates **every rAF tick** (`useFourierMorph.ts:174,203`). `nearestLevel` snaps to the ladder, so it changes on each crossing — settle-out walks 50→5 (crossings at 35,25,18,12,8,5) and settle-in walks back, ≈ **12 re-renders per toggle**. Each is `12 cells × (512-point lerp + 512-segment string build)` ≈ **6 100 point-lerps and 6 100 string concatenations per re-render, ~74 000 per morph** — synchronous, on the main thread, during the one animation the page exists to show.

`lib/scheduler.ts:14-19` even *documents* the exemption this violates: *"NOT applied to the epicycle/morph RENDER loop: that is already rAF-paced AND off-screen-gated"* — true of the preview SVG, false of the grid, which is neither rAF-paced nor gated and re-derives from scratch.

The repair is a level→path `Map` keyed by `(shape, level)`, computed once per shape: the source data is immutable and there are only 10 distinct levels per shape.

**Falsifier.** (a) Vue caching plain function calls across renders — it does not; template render functions invoke them fresh. (b) `nearestActiveLevel` staying constant through a morph — `nearestLevel` (`svg-fourier.ts:112-119`) returns the largest ladder entry ≤ target, and the target sweeps 50→5→50. (c) `HarmonicLevelGrid` being `v-once`/memoized — it is not (`FourierMorphDemo.vue:58-67`, no `v-memo`). **Falsifier not met — CONFIRMED static.** Actual frame cost is SS-13.

### C-8 — MAJOR · keyframes.js `Animation` is consumed as a bare rAF ticker; its native `timingFunction` is bypassed and re-implemented

`useFourierMorph.ts:122-143` builds a full keyframes `Animation` — construction, two `addFrame` calls, `parse()` — for the sole purpose of getting a `time` value into a callback:

```
:130  timingFunction: "linear",
:135  a.addFrame("0%", { v: "0px" }, (_vars: any, time: number) => {
:136      const t = Math.min(time / a.options.duration, 1);
:137      onTick(t);
:139  a.addFrame("100%", { v: "1px" });
```

The animated variable `v: "0px" → "1px"` is never read. The engine is pinned to `"linear"` and the *actual* easing is applied by hand afterwards at three call sites (`:172 easeOut(tRaw)`, `:188 easeMorph(tRaw)`, `:201 easeIn(tRaw)`) from `getEasingFn` (`easings.ts:65-67`) — which resolves out of value.js's `timingFunctions`.

But `addFrame`'s own signature takes a timing function per frame — `keyframes.d.ts:273`:

```ts
addFrame<K extends V>(start, vars, transform?,
                      timingFunction?: InputAnimationOptions["timingFunction"], …)
```

and value.js `0.13.0` already exposes all 22 names the demo offers, in the exact kebab spelling the config stores. Verified by evaluation against the installed dist — every one of `linear · ease-in · ease-out · ease-in-out · ease-in-back · ease-out-back · ease-in-out-back · ease-{in,out,in-out}-{quad,cubic,sine,expo,circ}` is a live `arity=1` unary function returning the expected `f(0)=0, f(1)=1` profile (the three `back` variants correctly overshoot: `ease-out-back(0.5) = 1.0676`).

So the consumer pays for the whole engine — options object, template frames, `parse()`, the `RAFPlayback` owner (`keyframes.d.ts:157-161`), the WAAPI eligibility path, the `_playingPromise` machinery — and uses one number from it, while re-implementing the feature the engine's own frame API provides. Two libraries are loaded to do one library's job, and the seam between them (`t = time / a.options.duration`, reaching into a public-but-internal options object at `:136`) is exactly the kind of coupling a version bump breaks.

There is a second-order hazard the hand-rolled path creates and the native path would not: the `back` easings return values **outside `[0,1]`** (measured `ease-in-back(0.5) = -0.0636`, `ease-out-back(0.5) = 1.0676`). At `:189` that `t` goes straight into `lerpPoints(fromLowPoints, toLowPoints, t)` (`svg-fourier.ts:94-106`), which does **not** clamp — so a `back` morph easing linearly *extrapolates* the point cloud past both shapes. Phases 1 and 3 are safe (`Math.max`/`Math.min` at `:175`/`:204`); phase 2 is not. Whether the overshoot reads as designed spring or as a torn shape is SS-13, but the asymmetry — two phases clamp, one does not — is unambiguous and undocumented.

**Falsifier.** (a) keyframes `4.3.0` not accepting a per-frame `timingFunction` — `keyframes.d.ts:273` accepts one; (b) value.js `0.13.0` lacking the kebab names — all 22 resolve (measured); (c) `lerpPoints` clamping `t` — `svg-fourier.ts:102-104` does not. **Falsifier not met — CONFIRMED static.**

### C-9 — MAJOR · glass-ui `Button` is imported and then overridden out of existence

`FourierMorphDemo.vue:86` imports the producer primitive and `:71,:75` instantiate it with valid variants (`default`, `outline` — both present in `glass-ui/dist/components/ui/button/index.d.ts:4`). The scoped block then re-declares essentially the entire visual contract:

```
:286-300  .btn-export  → padding · border-radius · border:0 · background · color
                         · font-family · font-weight · @apply text-base · cursor · transition
:310-324  .btn-reset   → padding · border-radius · border: 2px solid color-mix(…)
                         · background:none · color · font-family · font-weight · cursor · transition
```

`variant="outline"` exists precisely to supply `.btn-reset`'s border treatment; `variant="default"` supplies `.btn-export`'s filled treatment. Both are then re-authored by hand. And the overrides **win**: Tailwind v4 emits utilities into `@layer utilities` while the SFC's scoped rules are unlayered, and unlayered declarations outrank any layered one regardless of specificity — so the producer's CVA output is dead weight in the bundle for these two nodes. The same pattern repeats at `HarmonicLevelGrid.vue:228-259` (`.grid-cell` re-declares border/background/padding/radius over `variant="outline"`).

This is the `feedback_root_styling` / `feedback_glass_ui_first_class` edicts inverted: instead of adding a variant upstream, the consumer imports a variant and paints over it per instance. The cost is not cosmetic — at the 4→7 bump every one of these overrides must be re-adjudicated against a producer surface that has itself moved, and there is no way to tell from the file which declarations are *deliberate* divergence and which are stale copies of a 3.x default.

**Falsifier.** A cascade where glass-ui's Button classes outrank the scoped rules (would require the SFC styles to be layered — they are not; `<style scoped>` output is unlayered), or overrides that add rather than replace (they replace: `border: 0`, `background:`, `border-radius:`, `padding:`, `font-family:` are all wholesale). **Falsifier not met static;** the resolved computed style is SS-13.

### C-10 — MAJOR · the demo's primary control has no accessible name

`MorphShapePreview.vue:4-10` — the button that triggers the entire demo:

```html
<button class="morph-button cartoon-card" @click="$emit('toggle')" :disabled="disabled">
    <FourierMorphSvg :path="currentPath" :stroke-width="4.5" view-box="0 0 200 200" />
</button>
```

Its only child is `FourierMorphSvg` (read whole, 41 lines): an `<svg>` with **no `<title>`, no `role`, no `aria-label`, no `aria-hidden`** (`FourierMorphSvg.vue:2-16`). The button has no text node, no `aria-label`, no `aria-labelledby`. Accessible name: **empty**. The four descriptive chips (`phase`, `n=…`, `shapeName`, `totalMs`) live in a *sibling* div outside the button (`:13-26`, `:30-43`), so they contribute nothing to its name.

The parent already owns the string that would fix it — `currentShapeName` (`FourierMorphDemo.vue:103`) is passed down as `:shape-name` (`:16`) and spent only on a decorative chip. And the tree's own sibling proves the idiom is known here: `DarkModeToggle.vue:5` sets `:aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"` on a structurally identical SVG-only button.

I file this on the consumption axis because it is a *props-contract* failure, not merely an a11y oversight: `shapeName` crosses the seam and is spent on the least valuable of its two possible uses.

**Falsifier.** A `<title>` or `aria-*` on `FourierMorphSvg.vue` (none, lines 2-16), or a text node inside the `<button>` (none, `MorphShapePreview.vue:4-10`), or a `TooltipProvider`-supplied name — `App.vue:5` mounts a `TooltipProvider` but no `Tooltip` wraps this button. **Falsifier not met — CONFIRMED static.** An axe run is SS-13 but the DOM is fully determined.

### C-11 — MAJOR · `isMoon` flips before the `await`, so the name and the whole preview grid lie for the entire settle-out phase

`FourierMorphDemo.vue:127-135`:

```
:130  const from = isMoon.value ? moonShape : sunShape;
:131  const to   = isMoon.value ? sunShape  : moonShape;
:132  isMoon.value = !isMoon.value;       // ← flipped BEFORE the animation
:134  await morph.morphTo(from, to);
```

`currentShapeName` (`:103`) and `currentShape` (`:104`) both derive from `isMoon`, so at the instant of click:

- `MorphShapePreview` chip reads "Moon" while the preview is still rendering a *Sun* degrading through its harmonics — for the full `settleOutMs` (150 ms of the 350 ms default, **43 % of the animation**);
- `HarmonicLevelGrid :shape="currentShape"` (`:59`) swaps to the moon and **re-renders all ~12 preview paths synchronously inside the click handler** — 12 × (512-point lerp + 512-segment string), a click-time long task stacked directly in front of the animation's first frame (compounding C-7);
- `nearestActiveLevel` (`:115-120`) starts reading `moonShape.data.levels` while `morph.harmonicLevel` is still describing the sun. (Benign here only because both shapes ship identical ladders — measured `[1,2,3,5,8,12,18,25,35,50]` for both. That is a coincidence of the current assets, not a contract.)

The correct seam is to advance `isMoon` after the await, or to derive the displayed name from `morph.phase` + the `from`/`to` pair the composable already holds.

**Falsifier.** `isMoon` assigned after `morphTo` resolves (it is assigned at `:132`, before `:134`), or `currentShapeName` derived from something other than `isMoon` (`:103` derives from it directly). **Falsifier not met — CONFIRMED static.**

### C-12 — MAJOR · a FIFTH easing-curve-preview fork lives in this component's graph — an ADDITION to lane-frontend §4

lane-frontend §4 flags `visualization/EasingPicker.vue` (98) + `visualization/EasingCurvePreview.vue` (41) as a HARD SHADOW of producer `glass-ui/src/components/easing/`, quoting the producer README's *"The two demo curve editors … re-home onto it — **no fourth fork**"*. It does **not** flag the morph subsystem.

But `MorphPhaseConfig.vue:47-54` — instantiated three times by `FourierMorphDemo.vue:26,36,46` — renders exactly the same artifact:

```html
<svg class="easing-preview" viewBox="0 0 40 20">
    <path :d="easingCurvePath(name)" fill="none" stroke="currentColor" stroke-width="1.5" />
</svg>
```

`easingCurvePath` (`easings.ts:115-127`) samples an easing at 24 steps into a 40×20 box. And `easings.ts` carries a **second, near-identical sampler nine lines above it** — `generateCurveSVGPath` (`:89-97`, 32 steps, normalized 0–1 coords) with its own `_svgCache` (`:99-109`). Two curve samplers in one 127-line file, plus `EasingCurvePreview.vue`, plus the producer's `easing/composables/useEasingPicker` — the fork count is five, and the census recorded three.

The demo also re-implements the picker's *selection* surface: `MorphPhaseConfig.vue:36-59` is a `Select` of 22 easings with inline curve thumbnails, which is materially `EasingConfigurator` (`glass-ui/src/components/easing/index.ts:1-3`, present at 7.0.0, absent at 4.0.0).

**Falsifier.** `easingCurvePath` and `generateCurveSVGPath` being materially different algorithms — both sample `fn(i/n)` into an SVG polyline; they differ only in step count and viewbox scaling (`easings.ts:89-97` vs `:115-127`). Or producer `./easing` covering none of this — `glass-ui/src/components/easing/README.md:3-6` states the picker "authors … over the REAL value.js twin", the same `timingFunctions` source `easings.ts:9` uses. **Falsifier not met.**

**Corpus effect.** lane-frontend §9 carry 6 should read *"`EasingPicker.vue` + `EasingCurvePreview.vue` + `lib/easings.ts`'s two samplers + `MorphPhaseConfig.vue`'s inline preview"*, and the §4 aggregate ("9 components / ~1 990 LOC") is understated by the morph subsystem's share.

---

## §3 · MINOR

### C-13 — MINOR · `as any` at the JSON boundary, where a one-word fix exists

`FourierMorphDemo.vue:99-100`:

```ts
const sunShape  = prepareFourierShape(sunData as any);
const moonShape = prepareFourierShape(moonData as any);
```

`prepareFourierShape` takes `FourierPathData` (`svg-fourier.ts:76`). The *only* structural obstacle is `decomposition.domain: [number, number]` (`svg-fourier.ts:19`) — TypeScript infers a JSON literal array as `number[]`, which is not assignable to a tuple. Everything else is assignable: `partial_sums` (object literal → `Record<string, …>`), `levels` (`number[]`), the scalar counts. Measured: both files carry `domain: [0,1]`, `basis: "fourier"`, 101 components, 10 `partial_sums` keys — schema-conformant.

`as any` therefore disables the *whole* contract to work around one tuple. `as unknown as FourierPathData` would preserve the shape check on every other field; widening `domain` to `number[]` (or `readonly number[]`) removes the cast entirely. As written, a future regeneration that drops `partial_sums`, renames `levels`, or changes `n_harmonics` to a string typechecks clean and fails at runtime inside `prepareFourierShape`'s loop (`svg-fourier.ts:79-85`) — which silently produces an empty `pointsByLevel`, which makes `interpolateAtHarmonicLevel` return `[]` (`:147`), which makes `pointsToSvgPath` return `""` (`:51`), which renders a blank button. Four layers of silent degradation behind one cast.

The same pair of casts appears at `DarkModeToggle.vue:26-27` — copy-propagated, not reasoned.

**Falsifier.** The JSON being genuinely non-conformant beyond `domain` — measured conformant on every declared field. Or `as unknown as T` being equally unsafe — it is not; it preserves excess/missing-property structural checking at the target.

### C-14 — MINOR · `phase: string` at the child seam discards the exported `MorphPhase` union

`MorphShapePreview.vue:50-57` types `phase: string` and `shapeName: string`. `useFourierMorph.ts:31` exports `export type MorphPhase = "idle" | "settle-out" | "morph" | "settle-in"` and the parent passes exactly that (`FourierMorphDemo.vue:14`). The child then **keys CSS off the value** — `MorphShapePreview.vue:14,31` `:class="phase"`, styled at `:165-174` for `.settle-out`, `.settle-in`, `.morph`. A renamed phase in the composable typechecks clean and silently drops the phase tinting; the union is right there, unimported.

Same for `shapeName: string` where `"Sun" | "Moon"` is derivable from `FourierMorphDemo.vue:103`.

**Falsifier.** `MorphPhase` not being exported (it is, `useFourierMorph.ts:31`), or the child not depending on the value's identity (it does, via `:class`).

### C-15 — MINOR · bare root-barrel imports where subpaths exist

`useMorphConfig.ts:9` imports `useClipboard` from the glass-ui **root barrel** (`"@mkbabb/glass-ui"`), and `easings.ts:9,16` imports from the value.js root (`"@mkbabb/value.js"` — the only entry `0.13.0` publishes: `exports` is a single `"."`, verified). The glass-ui root pull is avoidable — lane-frontend §3 shows this repo otherwise using 21 distinct subpaths and importing `Button`/`Slider`/`Select` correctly by subpath, including in this very subtree (`FourierMorphDemo.vue:86`, `MorphPhaseConfig.vue:72-73`, `HarmonicLevelGrid.vue:89-90`). glass-ui declares `sideEffects: ["*.css"]`, so JS is tree-shakeable in principle, but the barrel widens the module graph the bundler must traverse and is the one glass-ui import in this component's graph that does not name what it wants.

value.js has no subpath to prefer at `0.13.0`; note it as a **bump-surface row**: if 4.0.0 publishes a granular export map, `easings.ts:9,16` is the single edit that keeps the parser/color/transform trunk out of `vendor-math`.

**Falsifier.** glass-ui `4.0.0` lacking a subpath for `useClipboard` — lane-frontend §3 records root-barrel-only symbols (`Checkbox`, `useClipboard`, `supportsViewTransitions`), so this may be forced. **Falsifier partially met** — downgraded to MINOR and flagged as an upstream ask rather than a consumer defect.

### C-16 — MINOR · `syncWith`'s watcher allocates a fresh object per evaluation and carries a redundant `deep: true`

`useMorphConfig.ts:79-83`:

```ts
watch(() => ({ ...config }), (cfg) => morph.updateConfig(cfg), { deep: true });
```

The getter already touches every key of `config` (the spread reads them all), so the watcher is fully tracked without `deep`. Adding `deep: true` makes Vue traverse the freshly-allocated snapshot on every run for no additional dependency. And because the getter returns a new object identity each time, the source is never reference-equal — the watcher fires on every tracked mutation and allocates a `MorphConfig` per fire. Small, but this runs on every slider drag frame (`MorphPhaseConfig.vue:22`, `HarmonicLevelGrid.vue:18,41`), and it exists only to service C-5's copy. Deleting the copy deletes this.

**Falsifier.** A `deep: true` that adds tracking here — the getter's spread already reads all 8 scalar fields (`MorphConfig`, `useFourierMorph.ts:48-57`), none nested. **Falsifier not met.**

### C-17 — MINOR · `<component :is>` for a two-state icon; and the one `lucide-vue-next` rename site

`FourierMorphDemo.vue:72`:

```html
<component :is="morphConfig.copied.value ? Check : ClipboardCopy" class="btn-icon" />
```

A dynamic-component resolution and a runtime component-type switch where `<Check v-if="…" /><ClipboardCopy v-else />` is cheaper and statically analysable. Trivial on its own — but it is also one of the **35 `lucide-vue-next` import sites** (`FourierMorphDemo.vue:87`) that lane-frontend §5 books for the `@lucide/vue ^1.16.0` peer rename at glass-ui 7.0.0, and dynamic `:is` bindings are exactly what a codemod misses.

**Falsifier.** A third icon state — there are two (`:72-73`). Or `lucide-vue-next` surviving at glass-ui 7 — `glass-ui@7.0.0` `peerDependencies: {"@lucide/vue":"^1.16.0"}` (lane-frontend §1 dependency table).

### C-18 — MINOR · the writable computed is typed `number[]` but the producer emits `number[] | undefined`

`glass-ui/dist/components/ui/slider/Slider.vue.d.ts:20` declares `"update:modelValue": (payload: number[] | undefined) => any`. The three adapters type their setter as `number[]`:

- `MorphPhaseConfig.vue:99-102` — `computed<number[]>({ …, set: (arr) => emitDuration(String(arr[0] ?? 50)) })`
- `HarmonicLevelGrid.vue:120-127` — two identical adapters

The `?? ` guards a missing *element*, not a missing *array*: if the producer ever emits `undefined`, `arr[0]` throws `TypeError: Cannot read properties of undefined`. `vue-tsc` does not catch it because `v-model` on a component writes through the emit payload type while the computed's declared setter parameter is narrower.

**Falsifier.** reka-ui's `SliderRoot` never emitting `undefined` in practice — plausible, hence MINOR. But the *declared* producer contract admits it (`Slider.vue.d.ts:20`), and the consumer's declared type denies it. **UNPROVEN-NEEDS-LIVE (SS-13)** for reachability; the type divergence is byte-exact.

### C-19 — MINOR · `onMounted` for a DOM-free call; the first render paints an empty path

`FourierMorphDemo.vue:123-125` defers the initial seed:

```ts
onMounted(() => { morph.setShape(sunShape); });
```

`setShape` (`useFourierMorph.ts:89-95`) touches no DOM — it assigns `activeShape`, `harmonicLevel`, and `currentPoints`. Until it runs, `currentPoints` is `[]` (`:80`) → `currentPath` is `""` (`:81` → `svg-fourier.ts:51`) → the first render emits `<path d="">` and the chip reads `n=50 / idle` over an empty button. Calling it at setup top level removes a whole wasted render pass and the empty-path frame. (`onMounted` runs before paint in the same task, so a *visible* flash is unlikely — **SS-13** — but the wasted render and the empty-`d` DOM write are certain.)

**Falsifier.** `setShape` needing mounted DOM (it does not, `useFourierMorph.ts:89-95`), or `prepareFourierShape` needing the document (it does not — pure array/Map work, `svg-fourier.ts:76-88`).

---

## §4 · INFO

### C-20 — INFO · zero API coupling: `/morph` runs an offline twin of three of the 45 operations

Measured: `grep -rn "lib/api\|apiFetch\|computeEpicycles\|extractContour" web/src/components/morph/ web/src/composables/useFourierMorph.ts web/src/composables/useMorphConfig.ts web/src/lib/svg-fourier.ts` → **the only hit is `FourierShapeExtractor.vue:145` importing the local `lib/svg-contours`, not the API.** FourierMorphDemo consumes **zero** of the operation surface (`lib/api.ts`, 39 exported functions; the census's 45-operation figure per intake row **R3-3**).

Its shapes come from a wholly parallel pipeline: `FourierShapeExtractor.vue:167-181` extracts contours in the browser and parks them on `window.__fourierShapeData` for Playwright; a Python script (`svg-fourier.ts:3-4`: *"All Fourier decompositions are pre-computed in Python and shipped as static JSON"*) produces the 450 KB of `sun.json`+`moon.json` the demo imports at `FourierMorphDemo.vue:95-96`.

Meanwhile `lib/api.ts` ships the exact three server operations that pipeline duplicates: `extractContour` (`:300`), `computeEpicycles` (`:330`), `computeBases` (`:345`). So three of the 45 operations have a live server implementation *and* a divergent offline twin, and the morph route is bound only to the twin.

This cuts both ways and I decline to score it as a defect. **In favour:** the route is fully offline — no loading states, no error paths, no `api-problem` handling, no auth coupling, and it cannot break when the backend does. That is a legitimate architecture for a tuning demo. **Against:** the shape set is frozen at two, the extractor route that could feed it has no handoff, and any change to the server's decomposition semantics silently diverges from what `/morph` displays with no fixture tying them.

**Relation to R6-8.** The adjudicated intake's substantive row (`lane-fourier-r3-r6.md:142`, TRUE) establishes that *"an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam"* — the `client.method.visualization-update` ↔ `operation.method.visualization-update` non-isolability. FourierMorphDemo is the **complementary pathology**: not a client leaf welded to an operation leaf, but an operation surface with **no client leaf at all** and a third, unmodelled offline producer standing in for it. R6-8's carry-to-F.W5 asks the conformance model to keep operation identity independent of client identity; this component argues the model must additionally represent *operations with zero clients* and *client behaviour with zero operations*, or the census's 45-operation count will keep reading as coverage it does not have.

### C-21 — INFO · explicit defaults as noise

`FourierMorphDemo.vue:71,75` pass `size="default"` and (`:71`) `variant="default"` — both the producer's defaults (`glass-ui/dist/components/ui/button/index.d.ts:4-5`). Harmless, but it makes a future default change invisible at this call site (the props pin the old default rather than tracking the new one), and it obscures which of the two buttons is deliberately non-default (`:75` `variant="outline"`, the only meaningful one).

---

## §5 · SUPERLATIVES (L-18 runs both ways)

### S-1 — SUPERLATIVE · complete design-token discipline in the component's own surface

`FourierMorphDemo.vue`'s 149-line style block contains **zero** hard-coded colors. Measured across the subtree:

```
FourierMorphDemo.vue        0     ← literal #hex / rgba() count
MorphShapePreview.vue       0
MorphPhaseConfig.vue        0
HarmonicLevelGrid.vue       4     ← #60a5fa ×2, rgba(96,165,250,…) ×2  (:203,204,257,258)
```

Every value routes through a producer token: `--accent-red`, `--accent-pink`, `--foreground`, `--background`, `--muted`, `--muted-foreground`, `--card`, `--font-serif`, `--font-mono` — and `--accent-red`/`--accent-pink` are confirmed real glass-ui tokens, not local inventions (`glass-ui/dist/styles/tokens/color-radius.css:258`, `dark-arm.css:111`, `light-dark.css:142`, bridged to Tailwind at `theme/bridges.css:184`). Derived shades use `color-mix(in srgb, var(--token) N%, transparent)` (`:316,327` and throughout the children) rather than a second hard-coded value, so light/dark inversion is automatic and the 4→7 token re-theme reaches this component for free. `FourierMorphSvg.vue:30` even defaults `strokeColor` to `var(--accent-red)` rather than a literal.

This is materially better than the tree around it (`HarmonicLevelGrid.vue`'s four literals; `DarkModeToggle.vue:31-32`'s `[232,136,69]` / `[192,132,252]` hard-coded RGB triples) and better than the constellation average.

**Falsifier (the superlative's own).** Any literal color, `px` font size, or raw font stack in `FourierMorphDemo.vue` — grep count is 0; typography is `@apply text-2xl/text-base/text-lg` plus `var(--font-serif)`/`var(--font-mono)`. **Falsifier not met.** Note the irony that C-1 and C-2 defeat this discipline downstream: the tokens are correct and the channel carrying them is broken.

### S-2 — SUPERLATIVE · a genuinely clean props-down / events-up seam with clamping at the emitter

Measured: `grep -rnE 'props\.[a-zA-Z]+\s*=[^=]' web/src/components/morph/` → **NONE**. No child mutates a prop; no child reaches into the parent; no `provide`/`inject` back-channel; no two-way object binding. All three children are pure presentational — `defineProps` + `defineEmits`, nothing else (`MorphShapePreview.vue:50-61`, `MorphPhaseConfig.vue:80-91`, `HarmonicLevelGrid.vue:95-107`). Config state lives in exactly one place (`useMorphConfig`'s `reactive`) and every write goes through an explicit parent-side assignment (`FourierMorphDemo.vue:32-33,42-43,52-53,64-65`).

Better still, **each child re-clamps its own emitted range** rather than trusting the parent: `MorphPhaseConfig.vue:93-96` `emitDuration` clamps to `[50,800]` and rounds; `HarmonicLevelGrid.vue:109-117` `emitLow`/`emitHigh` clamp against the *sibling* bound (`Math.min(props.highLevel - 1, …)`, `Math.max(props.lowLevel + 1, …)`) and coerce `NaN` via `Number(raw) || 1`. So an out-of-range or non-numeric value cannot cross the seam in either direction, and the invariant `lowLevel < highLevel` is enforced at both emitters — the parent's `handlePreviewClick` (`:137-173`) never has to defend it.

The three `<MorphPhaseConfig>` instances at `:26-54` are the payoff: one component, three identical contracts, zero special-casing.

**Falsifier (the superlative's own).** A prop mutation, a `v-model` bound to a prop, or an unclamped emit path. `grep v-model` returns three hits, all bound to *local* writable computeds (`durationModel`, `lowModel`, `highModel`), never to a prop. **Falsifier not met.** (The clamps do not save C-6: they enforce `low < high` faithfully against a `max` that is itself wrong.)

### S-3 — SUPERLATIVE · bespoke code retired in favour of the producer primitive, with the receipt written at the seam

`useMorphConfig.ts:55-58`:

```
/* P.W5 Lane B.2 — replaced manual `copied` ref + 2s timeout + onUnmounted
   cleanup with glass-ui's `useClipboard` composable (auto-resets `copied`
   and owns timer-cleanup discipline). */
const { copied, copy } = useClipboard({ resetMs: 2000 });
```

Verified complete, not partial: `grep -c setTimeout web/src/composables/useMorphConfig.ts` → **0**. The hand-rolled timer is gone, not wrapped; `FourierMorphDemo.vue:71-73` consumes `copied`/`copyToClipboard` directly. The same discipline appears at the Slider adapters, which document *why* an adapter exists rather than leaving a mystery wrapper — `MorphPhaseConfig.vue:98` and `HarmonicLevelGrid.vue:119`: *"A.W2.c — adapt the scalar `duration` to glass-scrubber's array model."* lane-frontend §3 reaches the same verdict about this repo's three `components/ui/` wrappers (*"thin API-shape adapters, not shadows … the correct posture — keep"*); the morph subtree independently exhibits it.

This is exactly the `feedback_glass_ui_first_class` / `feedback_no_god_modules` posture: consume the primitive, adapt only the impedance, and leave a dated provenance tag so the next auditor can date the decision.

**Falsifier (the superlative's own).** A retained shadow of the replaced code, or an adapter with no stated reason. `setTimeout` count is 0; all three adapters carry a wave-tagged rationale. **Falsifier not met.** The cruel corollary is C-1: the very tag that proves the adapter was reasoned (`A.W2.c — glass-scrubber…`) is also the fossil proving its CSS half was never migrated with the variant rename.

---

## §6 · Explicit contradiction of the hitherto corpus

**lane-frontend §1 + §9 carry 10 — `class-variance-authority` is NOT a dead devDep.**

The census states: *"Dead devDeps (measured, not estimated): `class-variance-authority`, `clsx`, `tailwind-merge` all have **0 import sites** in `src/`"* and books carry 10 *"Dead deps — … 0 src imports; … `DESIGN.md:32` already books the CVA row."*

The **measurement is true and the disposition is false.** CVA is a **type-level hard requirement** of the pinned producer, reachable from this very component:

```
$ grep -rln "class-variance-authority" web/node_modules/@mkbabb/glass-ui/dist/ | wc -l
18
$ head -1 web/node_modules/@mkbabb/glass-ui/dist/components/ui/slider/index.d.ts
import { type VariantProps } from 'class-variance-authority';
```

Import path from the target: `FourierMorphDemo.vue:26` → `MorphPhaseConfig.vue:73` `import { Slider } from "@mkbabb/glass-ui/slider"` → `dist/slider.d.ts` (`export * from "./components/ui/slider"`) → `dist/components/ui/slider/index.d.ts:1`. Removing `class-variance-authority` from `web/package.json:devDependencies` breaks `vue-tsc -b` — which is the `web-build` CI job (lane-frontend §7) and the `build` script.

`clsx` and `tailwind-merge` are not implicated by this probe and the census's disposition may hold for them; **only the CVA row is contradicted.** Recommended amendment to carry 10: *"`clsx` + `tailwind-merge` + direct `reka-ui` have 0 src imports and 0 producer d.ts references — removable. **`class-variance-authority` has 0 src imports but 18 producer d.ts references and MUST stay while glass-ui ships CVA-typed variant props.** `DESIGN.md:32`'s CVA row is unsafe as written."*

---

## §7 · Carry summary, ranked for the megatranche

| # | Row | Severity | Cost | Sequencing |
|---|---|---|---|---|
| 1 | **C-1** slider retint channel dead (`--slider-scrub-*` → `--slider-range-bg`/`--slider-thumb-bg`) | BLOCKER | ~8 lines × 2 files | **Do at the 4→7 bump, not before** — verify against 7.0.0's Slider recipe in one pass |
| 2 | **C-2** `cssVarToHex` has no oklch/`light-dark()` arm → 4 of 5 viz tokens grey | BLOCKER | bidirectional | **Blocked on value.js R1** (`parseCssColor("oklch()")` crash). Do not add a 5th regex |
| 3 | **C-5** stale config copy (delete the spread at `:108`, delete `syncWith`) | MAJOR | ~6 lines, net negative | Independent — do first; kills C-16 too |
| 4 | **C-4** `handleReset` unguarded | MAJOR | 2 lines | Independent |
| 5 | **C-6** `previewLevels` ladder overruns `data.levels` | MAJOR | ~5 lines | Independent |
| 6 | **C-7** memoize `getPath` per (shape, level) | MAJOR | ~10 lines | Independent; pairs with C-11 |
| 7 | **C-8** use keyframes' native per-frame `timingFunction`; clamp phase-2 `t` | MAJOR | ~15 lines | **Re-verify at keyframes 6.0** — the bump may move `addFrame` |
| 8 | **C-10** accessible name on the primary control | MAJOR | 1 line | Independent |
| 9 | **C-12** fifth easing-curve fork → producer `./easing` | MAJOR | ~60 LOC deleted | **Only reachable at 7.0.0** (`./easing` absent at 4.0.0) — fold into lane-frontend §9 carry 6 |
| 10 | **C-9** stop overriding glass-ui `Button` | MAJOR | audit-heavy | Do during the 4→7 override re-adjudication |
| 11 | **C-3** the false lazy-boundary comment | MAJOR | 4 lines of prose + a chunk decision | Fix the comment now; the chunk split is a bump-time call |
| 12 | C-13..C-19 | MINOR | small | Sweep alongside the above |
| 13 | **§6** CVA contradiction | corpus | 1 line | **Amend lane-frontend §9 carry 10 before anyone acts on it** |

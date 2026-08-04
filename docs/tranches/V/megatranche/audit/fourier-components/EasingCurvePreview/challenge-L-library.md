claude-opus-5[1m]

# CHALLENGE — `EasingCurvePreview.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/EasingCurvePreview.vue` (41 lines, confirmed `wc -l`)
**Posture** assumed DEFECTIVE until the tree proved otherwise; each claim below carries its own falsifier and was run against it.
**Method** static + source-derived only. No browser. Geometry and sampling claims are *computed*, not eyeballed — arithmetic reproduced inline. Nothing here needs a live page; no claim is marked UNPROVEN-NEEDS-LIVE except the one flagged in §R5-7.

**Read whole (read-only)**: the component; `web/src/stores/animation.ts` (146); `web/src/lib/easings.ts` (127); `web/src/components/visualization/EasingPicker.vue` (98, sole consumer); `web/src/components/visualization/composables/useWorkspaceLoader.ts`; `web/src/lib/types.ts`; `web/src/components/morph/MorphPhaseConfig.vue`; `web/src/components/visualization/AnimationControls.vue`; producer `glass-ui/src/components/easing/{index.ts,README.md,composables/useEasingPicker.ts}` @7.0.0; `value.js/src/easing.ts`.

**Corpus folded, not re-invented** — the "fourth fork" shadow is *already adjudicated*: CENSUS-2026-08-03 §3a Shadows/HARD (`EasingPicker.vue`+`EasingCurvePreview.vue`+`lib/easings.ts`), CENSUS:191 (F.W3 action), lane-frontend.md:96, 99, 409–413, 641. I do not re-file it. §L-1 **refines it with a migration hazard the corpus does not state**, and §L-6 shows the fork count is understated.

---

## Verdict

| | count |
|---|---|
| Defects (L-1 … L-9) | **9** |
| of which BLOCKER | **1** |
| Superlatives (S-1 … S-3) | **3** |

The component is small and well-shaped (S-1) and has **no teardown surface whatsoever** — zero rAF, zero listeners, zero observers, zero lifecycle hooks. The leak/teardown sub-axis is **clean, and provably so**. The defects are concentrated in *geometry*, *token duplication*, and *error posture inherited across an import barrel* — plus one planning-level blocker against the corpus's own F.W3 action.

---

## §L-1 — [**BLOCKER**] The corpus's F.W3 re-home to `glass-ui/easing` is not drop-in and would break a **persisted** contract

**Provenance**
- Planned action: `CENSUS-2026-08-03.md:191` — "EasingPicker/EasingCurvePreview → `glass-ui/easing` (no fourth fork)"; restated `lane-frontend.md:641` as "[P2] Retire the two hard shadows".
- Producer contract: `glass-ui/src/components/easing/composables/useEasingPicker.ts:45` — `export type EasingPickerMode = "bezier" | "steps";` **those two modes only**. Its preset catalogue is value.js `bezierPresets` (`useEasingPicker.ts:10`, `:145–147`, default `"ease-out-back"`), i.e. *cubic-bezier control-point* presets.
- Producer payload: `glass-ui/src/components/easing/README.md:20–29` — `v-model` is `EasingPickerValue { mode, css, fn, points, steps, term }`.
- Consumer contract: `web/src/lib/easings.ts:71` — `AnimationEasingName = "linear"|"sine"|"quad"|"cubic"|"circ"|"expo"`, a catalog of **named transcendental/algebraic functions**, not beziers.
- **Persisted**: `web/src/lib/types.ts:44–51` — `AnimationSettings { … easing: string … }`, round-tripped server-side and re-seeded at `useWorkspaceLoader.ts:56` (`anim.easing = as.easing as EasingName`).

**Claim.** Re-homing onto the producer primitive changes the persisted `animation_settings.easing` from a **name in a closed 6-member catalog** to an **authored-curve payload** (or a `cubic-bezier(...)`/`steps(...)` CSS literal). Every stored workspace's easing would have to be migrated, and the migration is **necessarily lossy**: the producer can only express cubic-bezier and step curves, and the fourier catalog contains functions that no cubic-bezier reproduces.

**The lossiness is provable, not asserted.** A cubic-bezier's `y(x)` is an *algebraic* function (both coordinates are cubic polynomials in the parameter). Two of the six catalog members are **transcendental**:
- `easeInOutSine` = `-(Math.cos(Math.PI * p) - 1) / 2` — `value.js/src/easing.ts:22` (cosine)
- `easeInOutExpo` = `2 ** (20 * p - 10) / 2` / `(2 - 2 ** (-20 * p + 10)) / 2` — `value.js/src/easing.ts:25–27` (base-2 exponential)

No algebraic curve equals a transcendental function on an interval. `easeInOutCirc` (`easing.ts:28–30`, `sqrt`) is algebraic but of the wrong degree. Best case is *approximation*, and since `easedT` (`animation.ts:26–29`) applies the chosen function directly to the clock, an approximation silently **changes the playback timing of every saved animation**.

**Falsifier (ran; failed to overturn).** Two ways to kill this finding: (a) exhibit a producer mode that accepts a named-function catalog — `EasingPickerMode` is exactly `"bezier" | "steps"` (`useEasingPicker.ts:45`), and `index.ts` exports no catalog type; (b) exhibit a cubic-bezier equal to `easeInOutSine` or `easeInOutExpo` — impossible by the algebraic/transcendental argument above. Both fail. **Finding stands.**

**Consequence for the wave.** F.W3 cannot execute "EasingCurvePreview → `glass-ui/easing`" as written. It needs a prior decision: either (i) the producer gains a named-preset mode (a glass-BH-inbox relay per standing law), or (ii) fourier keeps the 6-name catalog and re-homes only the *rendering* primitive, or (iii) an explicit, owner-ruled lossy migration of `animation_settings.easing`. **This does not contradict the corpus — it supplies the precondition the corpus row omits.**

---

## §L-2 — [MAJOR] viewBox/viewport aspect inversion letterboxes **51.9 % of the declared width**

**Provenance** `EasingCurvePreview.vue:18` `viewBox="-0.05 -0.3 1.1 1.6"`; `:19` `preserveAspectRatio="xMidYMid meet"`; `:21–22` `:width="size"` `:height="size * 0.7"`; defaults `size: 28` (`:11`).

**Computed.** viewport `28 × 19.6` (aspect **1.42857**); viewBox `1.1 × 1.6` (aspect **0.68750**) — very nearly the *reciprocal*. Under `meet` the scale is `min(28/1.1, 19.6/1.6) = min(25.4545, 12.25)` = **12.25**.

| quantity | value |
|---|---|
| painted viewBox box | **13.475 × 19.600** px inside a `28 × 19.6` element |
| horizontal dead space | **14.525 px = 51.9 %** of declared width (7.263 px per side, `xMid`) |
| curve proper (the unit square `x,y ∈ [0,1]`) | **12.25 px** wide = **43.7 %** of the element's width |
| rendered stroke | `0.15 × 12.25` = **1.837 px** |

So `size=28` yields a **12.25 px** curve. The `size` prop's contract is off by ~2.3×, and the chip reserves more than double the layout width it paints.

**Root cause.** The viewBox allocates `0.3` of vertical padding above *and* below — **37.5 % of its height** — as overshoot headroom. Measured over all six catalog functions at 2001 samples, the ranges are **exactly `[0.0000, 1.0000]`; overshoot = false for all six**. The headroom is provably unreachable. It is vestigial, inherited from the *morph* catalog (`EASING_PRESETS`, `easings.ts:33–50`), which *does* contain `ease-in-out-back` and friends. The horizontal padding, by contrast, is `0.05` — a 6× asymmetry that is the tell.

**Falsifier (ran; failed to overturn).** The finding dies if any catalog member exits `[0,1]` (then the headroom is load-bearing) or if the aspects matched (then `meet` letterboxes nothing). Neither holds: measured overshoot false ×6; aspects 1.42857 vs 0.68750. **Finding stands.** A filling viewBox height is `1.1 / 1.42857 = 0.77`.

---

## §L-3 — [MAJOR] The `color` default hardcodes a design token by value, duplicating it — and the sibling comment asserting sole-consumership is **false**

**Provenance** `EasingCurvePreview.vue:12` — `color: "hsl(248 88% 71%)"`. `EasingPicker.vue:49` — `--easing-accent: hsl(248 88% 71%);`.

`grep -rn "248 88% 71%" web/src` returns **exactly two** sites: those two. A raw colour literal is duplicated byte-for-byte across two files, one of them a scoped-CSS custom property that exists precisely to be the single source.

**And the tree contradicts its own documentation.** `EasingPicker.vue:44–47` reads: *"the carry lives here because EasingPicker is the sole in-tree consumer."* It is not — `EasingCurvePreview.vue:12` is a second consumer of the same value, hardcoded. Any future retune of `--easing-accent` (or the landing of the filed upstream `--viz-easing` token) silently desynchronises the two.

**The whole prop is unnecessary, and the tree proves it.** The sibling `MorphPhaseConfig.vue:47–54` renders the same artefact — an inline `<svg class="easing-preview">` around an easing `<path>` — with `stroke="currentColor"`. That inherits the chip's colour for free, needs no prop, no default, no token duplication, and no `var(...)` string threaded through a prop at `EasingPicker.vue:33`. An in-tree existence proof, five files away, that the `color` prop is contrivance.

**Falsifier (ran; failed to overturn).** The finding dies if the literal appears once, or if `currentColor` could not work here. The grep says two; and `EasingPicker.vue:33` passes `var(--easing-accent)` / `var(--muted-foreground)` purely as a function of `is-active` — a state already expressed as a CSS class (`:26 .is-active`), so `currentColor` driven by `.easing-chip.is-active { color: … }` reproduces it exactly. **Finding stands.**

**Dead-code corollary.** Because `EasingPicker.vue:33` always passes `:color`, the hardcoded default is **never evaluated in-tree** — a dead default whose only effect is to duplicate a token.

---

## §L-4 — [MAJOR] The component is the sole caller of the tree's **only unguarded** easing resolver, and calls it from a template expression with no error boundary anywhere

**Provenance** `EasingCurvePreview.vue:26` — `:d="getEasingSVGPath(easing)"`; `easings.ts:102–108`:

```ts
export function getEasingSVGPath(name: AnimationEasingName): string {
    let p = _svgCache.get(name);
    if (!p) {
        p = generateCurveSVGPath(ANIMATION_EASINGS[name].fn);   // :105 — unguarded
```

**Inconsistent error posture, within one file and its own store.** Every sibling resolver guards:
- `animation.ts:27` — `ANIMATION_EASINGS[easing.value]?.fn ?? ((x: number) => x)`
- `easings.ts:66` — `EASING_PRESETS[name]?.fn ?? EASING_PRESETS.linear.fn`
- `easings.ts:116` — `EASING_PRESETS[name]?.fn ?? ((t: number) => t)`

`getEasingSVGPath` alone indexes bare. On a miss it throws `TypeError: Cannot read properties of undefined (reading 'fn')`. The `?.` at `animation.ts:27` is the authors' own admission that this domain is not runtime-safe.

**The domain is demonstrably not runtime-enforced.** `types.ts:48` types the persisted field as `easing: string` — unconstrained. `useWorkspaceLoader.ts:56` launders a server payload straight into the union with an unchecked assertion:

```ts
if (as?.easing) anim.easing = as.easing as EasingName;
```

So a stored/returned `"ease-in-back"`, `"Sine"`, or any typo enters the domain unvalidated. The store then degrades gracefully (`?.fn ?? identity`); `getEasingSVGPath` would not.

**Blast radius.** The call sits in a *template expression*, so the throw occurs inside the render function, unwinding `EasingCurvePreview` → `EasingPicker` → `AnimationControls.vue:119`. `grep -rn "errorCaptured\|onErrorCaptured" web/src` → **empty**; `grep -n "errorHandler\|warnHandler" main.ts App.vue` → **empty**. There is no boundary and no app-level handler: the subtree fails to render, uncaught.

**Falsifier (ran; partially overturns severity — recorded honestly).** Is there a *live* path from the laundered value to this call? No. `EasingPicker.vue:31` passes `key` from `v-for … in EASING_OPTIONS` (`:20`) — always a real catalog key — and `grep -rn "getEasingSVGPath" web/src` shows `EasingCurvePreview.vue:26` as the **sole** call site. So this is **latent, not live**: the crash requires a second consumer that renders the *active* easing (e.g. a status readout binding `anim.easing`), which is the obvious next call site. I therefore file it as a contract/error-posture defect, **not** as a live crash. The unguarded index and the missing boundary both stand on their own file:line evidence.

---

## §L-5 — [MINOR] Layering: a presentational leaf reaches through a **Pinia store barrel** for a pure function; the compat shim has become the primary API

**Provenance** `EasingCurvePreview.vue:2` — `import { getEasingSVGPath, type EasingName } from "@/stores/animation";`. The real home is `@/lib/easings` (`easings.ts:102`, `:71`). The store merely forwards, and says so at `animation.ts:9–11`:

```ts
// Re-export for consumers that import from this module
export { ANIMATION_EASINGS as EASING_OPTIONS, getEasingSVGPath };
export type { AnimationEasingName as EasingName };
```

A self-described compat re-export — the shim pattern the constellation's standing precept forbids (`feedback_no_backwards_compat.md`: migrate the consumer at the root, never shim). A stateless SVG leaf now declares a module-graph edge to the rAF clock, `defineStore`, and `pinia`.

**The shim won.** Counting the tree: the aliased `EasingName` is used by **three** consumers (`EasingCurvePreview.vue:2,6`; `EasingPicker.vue:3,28,31`; `useWorkspaceLoader.ts:6,56`); the true name `AnimationEasingName` survives in only **two** files (`easings.ts`, `animation.ts`). The "compat" alias is now the dominant public name for the type — a naming fork that F.W3's re-home must reconcile (the producer exports `EasingFn`/`EasingPickerValue`, no `EasingName` — `glass-ui/.../easing/index.ts:5–14`).

**Falsifier (ran; overturns the *bundle* claim — recorded).** I checked whether this drags the store into a bundle that would not otherwise contain it. It does not: the sole consumer `EasingPicker.vue:3` imports `useAnimationStore` from the same module anyway, so there is **no net bundle delta**. The defect is layering, colocation and precept — **not** payload. Filed at MINOR accordingly; I decline the inflated version of this finding.

---

## §L-6 — [MINOR] The "fourth fork" is understated: there is an in-tree **second** fork of curve→SVG-path, in the same file

**Provenance** `easings.ts:89` `generateCurveSVGPath(fn, n = 32)` (unit coords, `M … L …`) vs `easings.ts:115` `easingCurvePath(name)` (24 steps, `40×20` box, its own inline loop). Two near-identical samplers, **one file apart**, neither calling the other.

Their consumers are the two easing previews: `EasingCurvePreview.vue:26` (via `getEasingSVGPath`) and `MorphPhaseConfig.vue:49`. `MorphPhaseConfig.vue:47–54` hand-inlines an `<svg>`+`<path>` that is functionally the component under audit — **and gives it the same class name**, `easing-preview` (`EasingCurvePreview.vue:23,37` and `MorphPhaseConfig.vue:47,198`; scoped, so no cascade collision, but the duplication is exact).

They disagree on every parameter: 32 vs 24 samples · unit vs `40×20` coords · `0.15` vs `1.5` stroke · prop-`color` vs `currentColor`. So before the producer fork counted by the corpus, fourier already carries **two internal forks** of the same primitive, and `EasingCurvePreview` is the extracted half of a pair whose other half was never migrated onto it.

**Corpus link.** Intake row **R3-12** (`lane-fourier-r3-r6.md:86`, TRUE / ADOPT-AS-FACT) already names `MorphPhaseConfig` `easingNames` among the 7 duplicated open-family rows that make instance denominators over-count by 20 %. This finding is the *structural* cause behind that row.

**Falsifier.** Dies if `easingCurvePath` were a thin wrapper over `generateCurveSVGPath`. Read whole: `easings.ts:115–126` re-implements the loop with its own `steps`, its own affine mapping (`x = 2 + t*36`, `y = 18 - v*16`) and its own fallback. Not a wrapper. **Finding stands.**

---

## §L-7 — [MINOR] 32-segment uniform-`t` sampling visibly flattens `circ` at its vertical tangent

**Provenance** `easings.ts:105` calls `generateCurveSVGPath(fn)` with `n` defaulted to **32** (`:89`); the path is pure `L` segments (`:95`), no curve commands.

Computed max chord deviation (polyline vs true curve), converted at the §L-2 render scale of 12.25:

| easing | max dev (user units) | at render scale | at `t` |
|---|---|---|---|
| linear | 0.00000 | 0.000 px | — |
| quad | 0.00049 | 0.006 px | 0.016 |
| sine | 0.00060 | 0.007 px | 0.984 |
| cubic | 0.00142 | 0.017 px | 0.515 |
| expo | 0.00949 | 0.116 px | 0.515 |
| **circ** | **0.04454** | **0.546 px** | **0.492** |

`easeInOutCirc` has an infinite derivative at `t = 0.5` (`easing.ts:28–30`), which uniform-`t` sampling cannot resolve; the midpoint is visibly clipped. 0.546 px is **4.5 % of the 12.25 px curve height**.

**Falsifier (ran; tempers severity — recorded).** Is it actually visible? The deviation is ~30 % of the 1.837 px stroke width (§L-2), so it is substantially masked by the stroke's own thickness and `stroke-linejoin="round"` (`:31`). Real, measurable, marginal — **MINOR, and only `circ` exceeds 0.2 px**. Note it worsens if §L-2 is fixed (a filling viewBox raises the scale to ~25.45, taking the deviation to ~1.13 px).

---

## §L-8 — [INFO] Redundant prop + fractional height

`EasingPicker.vue:32` passes `:size="28"`, restating the default at `EasingCurvePreview.vue:11` verbatim — a second value duplicated between the same two files as §L-3. Separately, `size * 0.7` (`:22`) yields **19.6 px**, a fractional CSS pixel height; at 28 the height is never integral. Falsifier: neither is a correctness bug and both are cosmetic — filed INFO, not inflated.

## §L-9 — [INFO · cross-axis referral] Unlabelled inline SVG

`EasingCurvePreview.vue:17–33` carries no `aria-hidden="true"` and no `role="img"`/`<title>`. It renders inside a `role="menuitemradio"` whose accessible name already comes from the adjacent `.easing-chip-label` (`EasingPicker.vue:35`), so the decorative-hiding posture is the correct one. **Referred to the D/a11y axis — I do not count it toward this axis's severity and do not claim the a11y lane's ground.** Noted only because the corpus praises this file's ARIA rationale (`lane-frontend.md:629`) and the praise stops at the parent.

---

## §R5-7 — applicability adjudication: **NOT APPLICABLE** (stated, per instruction, with its falsifier)

**The class** (`lane-fourier-r3-r6.md:125`, R5-7, TRUE / ADOPT-AS-FACT + CARRY→F.W4): *template-loop evidence keyed to **component** callsites is blind to **native HTML element** loops* — `PaperSidebar.vue`'s three nested native `<li v-for>` produce `leafValues["instance.loop.paper-sidebar"] = []`, while the sibling `instance.loop.presets` is populated and keyed `"callsite:…FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0"`.

**Adjudication for this component.**
1. `EasingCurvePreview.vue` contains **zero** `v-for` — its template is a single `<svg>` wrapping one `<path>` (`:17–33`). It cannot host the defect.
2. Its only loop context is the parent's `EasingPicker.vue:20` — `<Button v-for="(opt, key) in EASING_OPTIONS">`. `Button` is a **component** (imported `@mkbabb/glass-ui/button`, `EasingPicker.vue:2`), so this is exactly the *registered* case R5-7 contrasts against, not the blind one.

**Falsifier for the negative.** This adjudication dies if any native element in the render path carries `v-for`. `EasingPicker.vue` and `EasingCurvePreview.vue` contain exactly one `v-for` between them, and it is on `<Button>`. **NOT-APPLICABLE stands.**

**Adjacent open question — UNPROVEN-NEEDS-LIVE (SS-13).** Callsite-keyed leaves appear to carry **one row per template callsite**, not per iteration. If so, `EasingCurvePreview`'s single callsite (`EasingPicker.vue:30`) represents **6** runtime instances (one per `EASING_OPTIONS` key, `easings.ts:73–80`) and any instance denominator under-counts it 6:1. I did not read the deriver, so I do not assert this. Falsifier: read the deriver's loop-expansion path — if it expands per-iteration, the question dissolves. Flagged for F.W4, **not counted as a defect**.

---

## Viz render path — where this component touches it

Census rows: `lane-frontend.md:514` — *"**Canvas2D throughout. WebGL/WebGPU: ABSENT** (`grep -rn "webgl\|WebGL\|WEBGL" web/src/` → empty). Three independent canvases + a 12-file SVG surface."* `lane-frontend.md:565` lists `EasingCurvePreview.vue` explicitly among those **12 SVG surfaces**. CENSUS §3a corroborates: *"Canvas2D throughout, WebGL/WebGPU ABSENT; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven) + 12 SVG surfaces."*

**Finding: the component is entirely off the hot path, and correctly so.** It is SVG, not canvas; it holds no `requestAnimationFrame`, no `IntersectionObserver`, no event listener, no `watch`, no lifecycle hook. Its coupling to the render path is **indirect and one-way**: it is the visual affordance for `anim.easing`, which feeds `easedT` (`animation.ts:26–29`), which the three canvases consume off the shared rAF clock (`animation.ts:52–75`). It neither drives nor is driven by the clock.

This is why §L-2's letterboxing and §L-7's faceting are *cosmetic* rather than performance findings, and why the leak/teardown sub-axis is clean: **there is nothing to tear down.**

---

## Superlatives (L-18 runs both ways — each with its falsifier)

**S-1 — Goldilocks, exactly.** 41 lines; one responsibility (name → curve glyph); no state, no lifecycle, no side effects; props-in/SVG-out. Contrast the tree's god-modules in the same census (`lib/api.ts` **672**, `stores/workspace.ts` 17.7 kB, `canvas-drawing/` 1 315 LOC — `lane-frontend.md:190`, CENSUS §3a). Extracting this from `MorphPhaseConfig`'s inline pattern (§L-6) was the right call, even though the migration stopped half-done. *Falsifier:* would die if the component hid state or lifecycle — `grep` for `ref|computed|watch|onMounted|onUnmounted` in the file returns nothing outside `defineProps`.

**S-2 — The module-level cache is correctly sited and bounded; it is NOT a leak.** `easings.ts:99` `const _svgCache = new Map<AnimationEasingName, string>()` is module-global and never cleared — the shape that normally reads as a leak. It is not: the key type is a **closed 6-member string union** (`easings.ts:71`), so the map is provably bounded at 6 entries of ~500 bytes. Module-level (not per-instance) is the *correct* siting, since the 6 paths are instance-invariant. **Recorded explicitly so another lane does not re-file it as an unbounded-cache defect.** *Falsifier:* would die if any caller passed a non-union key — the sole caller is `EasingCurvePreview.vue:26` with a typed prop, and §L-4's laundering path does not reach it.

**S-3 — Zero per-frame cost under a 60 fps clock.** The curve is computed once per easing and is a `Map` hit thereafter (`easings.ts:103–107`). Even though the path is produced by a *template expression* (which re-evaluates on every parent render), the work per render is one `Map.get`. A component sitting inside an animation control panel that costs nothing per frame is the right outcome. *Falsifier:* would die if `generateCurveSVGPath` ran per render — the cache read at `:103` precedes the generate at `:105`, and generation is guarded by `if (!p)`.

---

## Ledger

| id | severity | one-line | anchor |
|---|---|---|---|
| L-1 | **BLOCKER** | F.W3 re-home to `glass-ui/easing` breaks the persisted `easing: string` contract; lossy for transcendental members | `useEasingPicker.ts:45` · `types.ts:48` · CENSUS:191 |
| L-2 | MAJOR | viewBox aspect inverted vs viewport → `meet` blanks **51.9 %** of declared width; curve paints 12.25 px in a 28 px box | `EasingCurvePreview.vue:18,21,22` |
| L-3 | MAJOR | `color` default hardcodes `hsl(248 88% 71%)`, duplicating `--easing-accent`; sibling's "sole consumer" comment is false; `currentColor` obviates the prop | `:12` · `EasingPicker.vue:44–49` · `MorphPhaseConfig.vue:50` |
| L-4 | MAJOR | sole caller of the only unguarded resolver, from a template expression, with no boundary anywhere (latent, not live) | `:26` · `easings.ts:105` · `useWorkspaceLoader.ts:56` |
| L-5 | MINOR | pure function imported through a Pinia store's self-described compat shim; the alias has become the primary name (3 vs 2) | `:2` · `animation.ts:9–11` |
| L-6 | MINOR | second in-tree fork of curve→SVG-path in the same file; `MorphPhaseConfig` re-inlines this component, same class name | `easings.ts:89,115` · `MorphPhaseConfig.vue:47–54` |
| L-7 | MINOR | 32 uniform samples flatten `circ`'s vertical tangent by 0.546 px (4.5 % of curve height); worsens if L-2 is fixed | `easings.ts:89,105` |
| L-8 | INFO | `:size="28"` restates the default; `size*0.7` = fractional 19.6 px | `:11,22` · `EasingPicker.vue:32` |
| L-9 | INFO | unlabelled decorative SVG — **referred to the D/a11y axis, not counted here** | `:17–33` |
| S-1 | SUPERLATIVE | 41 lines, one job, zero teardown surface | whole file |
| S-2 | SUPERLATIVE | bounded module cache, correctly sited — pre-empts a false leak filing | `easings.ts:99` |
| S-3 | SUPERLATIVE | zero per-frame cost beside a 60 fps rAF clock | `easings.ts:103–107` |
| R5-7 | N/A | zero `v-for`; parent loops a **component** callsite — the registered case, not the blind one | `EasingPicker.vue:20` |

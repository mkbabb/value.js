claude-opus-5[1m]

# CHALLENGE — `FourierMorphDemo` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/morph/FourierMorphDemo.vue` (330 LOC)
**Posture** DEFECTIVE-until-proven. Static + source-derived only; no browser tooling. Every row carries severity · `file:line` · falsifier. Superlatives carry falsifiers too (L-18 runs both ways).
**Law** fourier-analysis is READ-ONLY evidence; this file is the only write.

> **Supersession note.** An earlier L-axis pass existed at this path (22 defects / 2 BLOCKER / 5 superlatives). This pass replaces it and **folds its one non-overlapping finding forward** — its `M-1` (the unguarded, un-disabled Reset) survives here as **L-14**, credited. Everything else in it is subsumed; three of its MAJORs are consolidated into BLOCKER **L-03** because they share one root cause (the phantom harmonic ceiling), and two new classes are added (§6 R5-7 analysis; L-05 wrong-primitive).

## §0 — Import closure actually read (whole)

| File | LOC | Read |
|---|---|---|
| `web/src/components/morph/FourierMorphDemo.vue` | 330 | whole |
| `web/src/components/morph/MorphShapePreview.vue` | 175 | whole |
| `web/src/components/morph/MorphPhaseConfig.vue` | 212 | whole |
| `web/src/components/morph/HarmonicLevelGrid.vue` | 286 | whole |
| `web/src/components/decorative/FourierMorphSvg.vue` | 41 | whole (via MorphShapePreview) |
| `web/src/composables/useFourierMorph.ts` | 230 | whole |
| `web/src/composables/useMorphConfig.ts` | 97 | whole |
| `web/src/lib/svg-fourier.ts` | 154 | whole |
| `web/src/lib/easings.ts` | 127 | whole (transitive) |
| `web/src/lib/colors.ts` (`VIZ_COLORS`) · `web/src/lib/types.ts` (`BasisComponent`) | 117 / 391 | relevant decls |
| `web/src/assets/fourier-paths/{sun,moon}.json` | 225 687 B / 224 944 B | parsed + measured |
| `@mkbabb/keyframes.js@4.3.0` `dist/keyframes.d.ts` · `@mkbabb/glass-ui` `useClipboard.d.ts` · `@mkbabb/value.js@0.13` `dist/easing.d.ts` | — | contract surfaces |
| `web/src/lib/scheduler.ts` · `web/src/router/index.ts` · `web/src/components/layout/DarkModeToggle.vue` · `web/src/components/ui/PathPreview.vue` · `web/src/components/visualization/EasingCurvePreview.vue` · `web/e2e/visual-baseline.spec.ts` · `tsconfig.json` · `package.json` | — | corroboration |

### Measured substrate

Derived by transcribing the tree's own algorithms (`xyToPoints` → `interpolateAtHarmonicLevel` → `pointsToSvgPath`, verbatim from `lib/svg-fourier.ts:38-153`) and running them over the shipped JSON in Node. No browser.

| Fact | Value | Source |
|---|---|---|
| `sun.json` / `moon.json` on disk | 225 687 B / 224 944 B | `assets/fourier-paths/` |
| `levels` (both files, identical) | `[1,2,3,5,8,12,18,25,35,50]` | JSON `levels` |
| `n_harmonics` / `n_samples` / `n_eval` | **50** / 512 / 512 | JSON |
| `partial_sums` keys | `{1,2,3,5,8,12,18,25,35,50}` — 10 entries | JSON |
| points per level | **512** | `partial_sums["<n>"].x.length` |
| one `pointsToSvgPath` output | **57 029 chars** exact-level / **57 051** interpolated (512 `C` segments, unrounded doubles) | measured |
| same, rounded to 2 dp | **19 965 chars (−65 %)** | measured |
| default `previewLevels` | `[1,2,3,5,8,12,18,25,35,50,75,100]` — **12** cells | `useMorphConfig.ts:30-38` at `(5,50)` |
| total `d` text, one 12-cell grid render | **683 574 chars = 667.6 KiB** | measured |
| `d(n=50)` vs `d(n=75)` vs `d(n=100)` | **byte-identical** (`===` true, both pairs) | measured |
| single interp+path build | 0.218 ms (Node, warm, 200 iters) | measured |
| full 12-cell grid rebuild | **3.65 ms** (Node, warm, 20 iters; a browser adds reactivity + 667.6 KiB of `d` attribute parsing) | measured |

**These three numbers — 50, 10, 512 — drive half the findings below.**

## §1 — Verdict

**31 defects · 3 BLOCKER · 11 MAJOR · 13 MINOR · 4 INFO · 5 superlatives.**

The component is not "a 330-line demo page with some sliders." It is a **thin, largely correct shell over a defective animation composable**, and the two worst faults are not in the `.vue` file at all — they are in the `useFourierMorph` teardown/re-entrancy contract, of which this component is the only interactive consumer.

One wrong primitive choice is the root of **L-01, L-02, L-06 and L-14**: `createTweenAnimation` hand-rolls a numeric tween out of `Animation` plus a dummy CSS `{v:"0px"}` frame, routed through the **async** `loadAnimationEngine()` boundary — while the *pinned* `keyframes@4.3.0` already root-exports `NumericAnimation`, a synchronous, value.js-free, rAF-driven numeric tween built for exactly this ("*Designed for canvas/WebGL render loops where CSS value parsing and DOM targets are unnecessary overhead*", `keyframes.d.ts:2150-2160`). Delete the unnecessary `await` and one blocker plus two majors evaporate.

The third blocker is a data-contract lie: the UI offers harmonic levels 75 and 100 that **do not exist in the shipped decomposition**, and the readout reports them as though they do.

---

## §2 — BLOCKERS

### L-01 · BLOCKER · leaks/teardown — `onUnmounted` *resumes* the animation it is trying to kill

`useFourierMorph.ts:215` `onUnmounted(() => stopAnim())` → `:115-120` `currentAnim.stop()`.

The keyframes contract for `stop()` (`node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts:524-529`):

> *"Halt playback where it stands: cancel the loop AND the WAAPI compositor animations, settle state, **and resolve any pending `play()` promise**."*

`morphTo` (`useFourierMorph.ts:145-213`) is a three-phase coroutine whose phases are three separate `await new Promise(resolve => { currentAnim = …; currentAnim.play().then(resolve) })` blocks (`:170-179`, `:186-193`, `:199-208`). Unmounting during phase 1 therefore **resolves phase 1's promise**, and `morphTo` proceeds — *after the component is destroyed* — to `:182` set `phase = "morph"`, `:187` construct a **new** `Animation`, `:192` `.play()` it (a fresh rAF loop), then `:196-208` construct and play a **third**. `onUnmounted` has already fired and cannot fire again; the `currentAnim` assignments at `:187`/`:200` are unreachable by any teardown.

**Failure scenario.** User is on `/morph` (`router/index.ts:104`), clicks the shape, navigates away 40 ms into a 350 ms default morph. Two further `Animation` instances are constructed and rAF-driven to completion on a dead scope, writing `currentPoints`/`phase`/`morphProgress` for `morphMs + settleInMs` — default 200 ms, **user-settable to 1600 ms** via the two 800 ms-max sliders (`MorphPhaseConfig.vue:24-25`). Every tick also runs `interpolateAtHarmonicLevel` over 512 points (`:204`) for a subtree that no longer exists.

**Falsifier.** (a) If `stop()` left the `play()` promise *pending* or *rejected*, `morphTo` would halt at `:179` and the finding dies — it does not; the d.ts states resolution explicitly, and the sibling `NumericAnimation.stop()` documents the identical semantics at `:2195` ("*The play promise resolves immediately*"). (b) If the file carried a disposal flag checked after each `await`, the finding dies — `grep -n "disposed\|cancelled\|aborted\|generation\|token" useFourierMorph.ts` → **zero matches** across 230 lines.

### L-02 · BLOCKER · correctness — the `isAnimating` guard has a hole exactly the width of a dynamic `import()`

`FourierMorphDemo.vue:113` `isAnimating = computed(() => morph.phase.value !== "idle")`, consumed as the guard at `:128` and as `:disabled` at `:18` → `MorphShapePreview.vue:4`.

But `morphTo` **awaits before it sets `phase`**:

```
useFourierMorph.ts:146   stopAnim();
useFourierMorph.ts:149   const Animation = await getAnimationCtor();   ← async gap; phase is still "idle"
   …:151-166  destructure config, resolve easings
useFourierMorph.ts:169   phase.value = "settle-out";                   ← the guard only closes HERE
```

`getAnimationCtor()` (`:39-44`) is a **network-bound dynamic import** on first use (`loadAnimationEngine()`, `:41`) — that is the entire point of the boundary, per the comment at `:33-36`. Throughout that window `phase === "idle"`, so both the `if (isAnimating.value) return` guard and the `disabled` attribute are open.

**Failure scenario.** Double-click the morph button on a cold cache. Two `morphTo` calls enter. `isMoon` (`:132`) flips **twice** — back to its original value — so `currentShapeName`/`currentShape` (`:103-104`) end up naming the *source* shape. Call B's `stopAnim()` (`:146`) resolves call A's phase-1 promise (same contract as L-01), so A continues into phases 2–3 concurrently with B: both write `phase` and `currentPoints` through a single `currentAnim` slot, and whichever finishes first runs `:210` `phase.value = "idle"` — **re-opening the guard and re-enabling the button while the other morph is still running**, which admits a third click, and so on.

**Falsifier.** (a) Move `:169` above `:149` and the window closes — finding dies. (b) If the engine resolved synchronously the window would be one microtask — it does not; it is a real `import()`. (c) If `morphTo` carried a re-entrancy guard, dies — `grep -n "if (.*running\|_playing\|inFlight" useFourierMorph.ts` → zero. (d) The sibling consumer `DarkModeToggle.vue:63` has the **identical** hole before the same await — this is a composable-contract defect, not a one-site slip.

### L-03 · BLOCKER · correctness / data contract — the level grid renders two harmonic levels that do not exist

`useMorphConfig.ts:30` hardcodes `const candidates = [1, 2, 3, 5, 8, 12, 18, 25, 35, 50, 75, 100]` and adds all twelve unconditionally. The shipped decomposition stops at 50 — measured, both files: `levels = [1,2,3,5,8,12,18,25,35,50]`, `n_harmonics = 50`, 10 `partial_sums` keys. `prepareFourierShape` (`svg-fourier.ts:79-85`) therefore builds a **10-entry** `pointsByLevel`, and `interpolateAtHarmonicLevel` clamps at `maxLevel = 50` (`:130-131`).

Four consequences, every one statically derivable:

1. **Three byte-identical thumbnails.** `HarmonicLevelGrid.vue:129-132` `getPath(75)` and `getPath(100)` both clamp to 50 and return the *same* 57 029-char `d` string as `getPath(50)`. Verified by execution: `d(50) === d(75)` → **true**; `d(50) === d(100)` → **true**. The grid renders `n=50`, `n=75`, `n=100` as the same curve, and pays 114 KiB of duplicate `d` text to do it.
2. **Two permanently un-highlightable cells.** `nearestActiveLevel` (`FourierMorphDemo.vue:115-120`) is computed from `currentShape.value.data.levels` — max 50 — so `activeLevel` can never equal 75 or 100, and `HarmonicLevelGrid.vue:61` `active: level === activeLevel` can never fire on those two cells.
3. **Clicking `n=100` highlights `n=50` and makes the readout lie.** `handlePreviewClick(100)` (`FourierMorphDemo.vue:143-145`) takes the `level > highLevel` branch → `highLevel = 100`; then `:172` `morph.setLevel(shape, 100)` sets `harmonicLevel.value = 100` (`useFourierMorph.ts:101`) while `currentPoints` clamps to 50. The chip reads **`n=100`** (`FourierMorphDemo.vue:15` → `MorphShapePreview.vue:19`) over a level-50 shape, and the `n=50` cell lights instead of the one clicked.
4. **A frozen tail on every subsequent morph.** With `highLevel = 100`, settle-in interpolates `level` 5 → 100 (`useFourierMorph.ts:202`) while the render clamps at 50, so the shape stops changing at `t = (50−5)/(100−5) = 47.4 %` — **52.6 % of the settle-in duration renders a frozen frame.** Symmetrically for settle-out.

The High control actively advertises the phantom range: `HarmonicLevelGrid.vue:35` `max="100"` and `:44` `:max="100"`.

**Falsifier.** (a) Produce shipped path data with levels above 50 — both consumed files cap at `n_harmonics: 50`. (b) If `computePreviewLevels` filtered candidates against the shape's `levels`, dies — it takes **no shape argument at all** (`useMorphConfig.ts:27`); it structurally cannot filter. (c) If clamping were loud, the user would learn — `svg-fourier.ts:131` clamps silently. **Severity rationale:** the component's own subtitle is *"Tune the morph transition between sun and moon shapes"* (`:6-8`); a tuning surface whose top 2 of 12 controls are inert, whose readout reports a level the renderer refused, and whose animation silently freezes for half a phase is not livable.

---

## §3 — MAJOR

### L-04 · MAJOR · composable contracts / duplication — two configs, one async bridge, and a stale read on Reset

Three copies of one struct, hand-bridged:

```
FourierMorphDemo.vue:107  const morphConfig = useMorphConfig();                                   ← copy #1, reactive (the UI reads this)
FourierMorphDemo.vue:108  const morph = useFourierMorph({ config: { ...morphConfig.config } });    ← copy #2, a setup-time snapshot
useFourierMorph.ts:77     const config = ref<MorphConfig>({ ...(options.config ?? DEFAULT…) });    ← copy #3 (the animation reads this)
FourierMorphDemo.vue:111  morphConfig.syncWith(morph);                                             ← the bridge
```

Every template read (`:29,30,39,40,49,50,62,63`) hits copy #1; every animation read (`useFourierMorph.ts:92`, `:112`, `:160`) hits copy #3. The bridge is `useMorphConfig.ts:78-84` `watch(() => ({...config}), cb, {deep:true})` — **no `flush` specified, therefore `'pre'`, therefore asynchronous**.

**Failure scenario (concrete).** Drag High to 100 → copy #1 = 100; watcher queues; copy #3 becomes 100. Click **Reset** (`FourierMorphDemo.vue:75` → `:175-178`): `morphConfig.reset()` sets copy #1 back to 50 *synchronously*, then `morph.setShape(currentShape.value)` runs **in the same tick**, reading copy #3 which is **still 100** (`useFourierMorph.ts:92-93`). Result: `harmonicLevel.value = 100`, shape clamped to 50, chip reads `n=100`. The watcher then fires and sets copy #3 to 50 — but `updateConfig` (`:106-108`) is a bare `Object.assign`; **nothing re-derives `harmonicLevel` or `currentPoints`**. The `n=100` chip persists over a level-50 shape until the next toggle or grid click.

**Falsifier.** (a) Show the watcher flushes synchronously — no `flush` option is passed, so Vue's `'pre'` default applies. (b) If `updateConfig` reconciled derived state the chip would self-heal — `:106-108` does not. (c) If the component read `morph.config` there would be one truth — `grep -n "morph\.config" FourierMorphDemo.vue` → **zero**: the composable returns `config` at `:219` and this component never reads it, so the returned handle is a second, unreconciled write path.

### L-05 · MAJOR · duplication / wrong primitive — `createTweenAnimation` reimplements `NumericAnimation`, and drags value.js across the dynamic boundary to do it

`useFourierMorph.ts:122-143` constructs a full CSS `Animation`, adds a **dummy** frame pair `{ v: "0px" }` → `{ v: "1px" }` whose interpolated `ValueUnit` **nothing ever reads**, calls `parse()`, then hijacks the frame *transform callback* to recover a normalized `t` by dividing the callback's `time` argument by `a.options.duration` (`:135-138`). It is an animation engine used as a bare stopwatch.

The pinned `keyframes@4.3.0` already ships the right primitive as a **root runtime export** — verified in `dist/keyframes.js`'s export map: `C as NumericAnimation`, alongside `i as resolveEasing` and `z as loadAnimationEngine`.

```
keyframes.d.ts:2150-2160   class NumericAnimation<T extends Record<string, number>>
   "Zero-allocation numeric keyframe interpolator … Designed for canvas/WebGL render
    loops where CSS value parsing and DOM targets are unnecessary overhead."
keyframes.d.ts:2186-2194   play(onFrame?: NumericFrameCallback<T>, duration?): Promise<void>   ← rAF-driven
keyframes.d.ts:2205-2213   timingFunction: "both synchronous and value.js-free, so this
                            engine NEVER TOUCHES THE DYNAMIC BOUNDARY"
keyframes.d.ts:2222-2231   respectReducedMotion  ← the option L-09 needs, on the same class
```

So the `await getAnimationCtor()` at `:149` — the async gap that **is** L-02, the memoized-rejection hazard that **is** L-06, and the reason the phase promises are hand-wired at all — is **not required**. `NumericAnimation` is synchronous, value.js-free, and is a strictly better answer to the very question the comment at `:33-36` was written to address.

**Falsifier.** (a) If `NumericAnimation` were behind `loadAnimationEngine()`, dies — it is a top-level `export declare class` and appears in the root bundle's export map. (b) If it lacked a per-frame callback, dies — `:2186-2194`. (c) If it lacked easing, dies — `:2201-2213`, with root-exported `resolveEasing` for names.

### L-06 · MAJOR · error postures — one transient chunk-load failure disables morphing for the page's lifetime, reports it as an unhandled rejection, and leaves the UI lying

```
useFourierMorph.ts:38-44
  let enginePromise: Promise<AnimationCtor> | null = null;
  function getAnimationCtor() {
      if (!enginePromise) enginePromise = loadAnimationEngine().then(e => e.Animation);
      return enginePromise;      ← a REJECTED promise is truthy; it is cached forever
  }
```

No `.catch`, no reset-on-failure, and **no `try`/`catch`/`finally` anywhere** in `morphTo` (`:145-213`) or in the caller (`FourierMorphDemo.vue:127-135`).

**Failure scenario.** A deploy rolls while a tab is open (stale-hash chunk 404), or one flaky network moment. First click: `loadAnimationEngine()` rejects → `enginePromise` is permanently poisoned → `morphTo` rejects → `handleToggle` is `async` with a bare `await` (`:134`) → **unhandled promise rejection**, no user-visible error, no toast (`src/composables/useToast.ts` exists in-repo and is not wired here). Worse: `isMoon.value = !isMoon.value` already executed at `:132`, **before** the await — so the chip permanently reads **"Moon"** over a sun (`:103` → `:16`) and all 12 grid thumbnails switch to moon (`:104` → `:59`). Every later click hits the cached rejection. The demo is dead until a hard reload, and it *looks* like it half-worked.

**Falsifier.** (a) Find a `.catch` that nulls `enginePromise` — there is none. (b) Find a rollback of `isMoon` — `:127-135` has no catch. (c) Flip `:132` to after `:134` and the visual lie dies. (d) Adopting `NumericAnimation` (L-05) removes the failure mode entirely.

### L-07 · MAJOR · viz render path — the level grid recomputes 12 × 512-point paths on every animation quantum

`HarmonicLevelGrid.vue:129-132`:

```ts
function getPath(level: number): string {
    const points = interpolateAtHarmonicLevel(props.shape, level);   // 512-point lerp, fresh arrays
    return pointsToSvgPath(points);                                  // 512-segment cubic string
}
```

A **plain function invoked from the template** (`:68` `:d="getPath(level)"`) inside a `v-for` over 12 cells (`:55`) — not a `computed`, not a cached map. It re-executes in full, for all 12 cells, on every re-render of the grid; and the grid re-renders whenever any prop changes — including `:active-level="nearestActiveLevel"` (`FourierMorphDemo.vue:61`), which derives from `morph.harmonicLevel` (`:115-120`) and therefore changes **during the animation**.

| Quantity | Measured |
|---|---|
| points per level | 512 |
| `d` string per cell | 57 029 (exact) / 57 051 (interpolated) chars |
| total `d` text, one grid render | **683 574 chars = 667.6 KiB** |
| single interp+path build | 0.218 ms (Node, warm) |
| full 12-cell rebuild | **3.65 ms** (Node, warm — a browser adds Vue reactivity plus 667.6 KiB of `d` attribute re-parse) |
| grid re-renders per single toggle | **≥ 12** |
| transient path-string churn per toggle | **≈ 8.0 MiB** |

The re-render count is derivable, not guessed: `nearestLevel` quantizes `harmonicLevel` onto `data.levels`, so settle-out 50→5 steps through `50,35,25,18,12,8,5` (6 transitions) and settle-in reverses (6 more) = **12 minimum**, plus one more for the shape-prop flip at t=0 (L-11).

This lands on the census's own accounting: `HarmonicLevelGrid.vue` is one of the **12 SVG surfaces** enumerated at `lane-frontend.md §6`, and that lane correctly records **"Canvas2D throughout. WebGL/WebGPU: ABSENT"** — so this cost is paid in DOM path parsing, with no GPU path to absorb it.

**Falsifier.** (a) Find the memoization — there is none; `interpolateAtHarmonicLevel` allocates a fresh array via `lerpPoints` (`svg-fourier.ts:96-105`) on every call. (b) Show `activeLevel` is constant during a morph — it is not; `nearestActiveLevel` reads `morph.harmonicLevel.value` (`FourierMorphDemo.vue:118`), written every tick at `useFourierMorph.ts:174` and `:203`. (c) **UNPROVEN-NEEDS-LIVE (SS-13):** the browser *frame-time* impact is not claimed — only allocation volume and string volume, both computed from the shipped data and the shipped algorithm; the Node timing is a floor, not a browser measurement.

### L-08 · MAJOR · viz render path — full IEEE-754 coordinate precision into a 48–64 px thumbnail, while the repo's own prior art rounds

`svg-fourier.ts:56-70` interpolates control points and concatenates them raw:

```ts
let d = `M${points[0][0]},${points[0][1]}`;
…
d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
```

Post-`lerpPoints` values are full-precision doubles. Measured sample: `M132.1399888677597,26.397092584591277 C128.5392353131407,24.98825215529153 …` — **17 significant digits per coordinate**.

Consumers render into `viewBox="0 0 200 200"` at **48–64 CSS px** (`HarmonicLevelGrid.vue:262-272`) and 120–180 px (`MorphShapePreview.vue:92-105`). At 64 px that is 0.32 px per user unit: everything past ~1 decimal is **sub-pixel by three orders of magnitude**.

**Measured:** rounding to 2 dp takes the same interpolated path from **57 051 → 19 965 chars (−65 %)** with zero visible change at any of the three render sizes.

The repo already knows this — `components/ui/PathPreview.vue:39` `` `${sx.toFixed(4)},${sy.toFixed(4)}` `` — a bespoke SVG path thumb (census `lane-frontend.md §2`: *"`ui/PathPreview.vue` | 69 | Bespoke SVG path thumb"*) that rounds. `svg-fourier.ts` does not. Two path emitters, one repo, opposite disciplines.

**Falsifier.** (a) Show the paths render above ~20 000 px — the three call sites cap at 180 px. (b) Show 2 dp alters geometry — the measurement regenerates the identical curve. (c) If `pointsToSvgPath` had a precision parameter this would be a call-site defect instead — `:47-50` has none.

### L-09 · MAJOR · correctness / a11y contract — the morph clock ignores `prefers-reduced-motion`, **and the census under-counts the ungated clocks** ⚠ CONTRADICTION

`createTweenAnimation` sets five options and omits the sixth (`useFourierMorph.ts:127-133`):

```ts
new AnimationCtor({ duration: durationMs, iterationCount: 1, timingFunction: "linear",
                    fillMode: "forwards", useWAAPI: false });
```

`keyframes.d.ts:1054-1061` documents `respectReducedMotion` with **"Default false (consumers opt in)"**. It is not opted into. The morph therefore runs a full rAF loop under `prefers-reduced-motion: reduce`. `grep -n "prefers-reduced\|reducedMotion\|matchMedia"` across `useFourierMorph.ts`, `svg-fourier.ts`, `FourierMorphDemo.vue`, `MorphShapePreview.vue`, `HarmonicLevelGrid.vue` → **zero matches**. The one CSS `reduce` block in the sibling (`DarkModeToggle.vue:104`, per census §8) is CSS-only and cannot stop a JS rAF loop.

**Two corpus rows contradicted, both in the tree's favour:**

1. **`lane-frontend.md §8 ⚠ COVERAGE GAP` + `§9 carry 9`** — *"the **two** ungated animation clocks are `stores/animation.ts` … and `ConvergencePlot.vue`'s own rAF"*. **There are three.** The morph clock is a third, independent, ungated rAF loop — and it is reachable from the *always-mounted global header* via `DarkModeToggle.vue:37`, not just from `/morph`. The enumeration is incomplete.
2. **`lib/scheduler.ts:13-15`**, folded approvingly by census §6 as *"Good hygiene, correctly scoped"*, asserts: *"NOT applied to the epicycle/**morph** RENDER loop: that is already rAF-paced AND **off-screen-gated (I.γ, `stores/animation.ts`)**."* **False for the morph loop.** The I.γ gate is `stores/animation.ts:48-53` plus the `BasisCanvas.vue:435-447` `IntersectionObserver` (census §6 Path A). `useFourierMorph` touches neither: `grep -n "stores/animation\|IntersectionObserver\|visibilitychange\|document.hidden" useFourierMorph.ts` → **zero**. The morph clock is rAF-paced but gated by **nothing**. The comment claims a protection this path does not have.

**Falsifier.** (a) Find any visibility or reduced-motion gate reachable from the morph loop — there is none. (b) If `respectReducedMotion` defaulted true, the a11y row dies — the d.ts says false. (c) The census's other two clocks are not disputed; only the completeness claim and the scheduler comment.

### L-10 · MAJOR · error postures — the Export button swallows a failure the producer went out of its way to report

`useMorphConfig.ts:58, 73-75`:

```ts
const { copied, copy } = useClipboard({ resetMs: 2000 });   // no onCopyError
function copyToClipboard() { copy(toJSON()); }              // result discarded, promise floated
```

The glass-ui contract is emphatic (`dist/composables/dom/useClipboard.d.ts:27-35`): `copy` returns `Promise<CopyResult>` = `{ ok, reason? }` with `reason: "clipboard-api" | "exec-command" | "no-api"`, and the options carry `onCopyError`, documented as *"Surfaces the failure instead of swallowing it"*; the return doc says the failure is **"REPORTED, never silently swallowed."** Both channels are discarded.

**Failure scenario.** Non-secure context / denied permission / locked-down environment (`reason: "no-api"`): `copy` resolves `{ok:false}`, `copied` stays `false`, so `FourierMorphDemo.vue:72-73` keeps rendering the `ClipboardCopy` icon and the label `Export`. The user clicks; nothing happens; nothing is said. The template also calls it bare (`:71 @click="morphConfig.copyToClipboard()"`) — no `await`, no catch, a floating promise.

**Falsifier.** (a) Show `useClipboard` swallows internally — the d.ts proves it exposes both a named reason and a callback hook. (b) Find a fallback surface — `grep -n "useToast\|toast" FourierMorphDemo.vue useMorphConfig.ts` → zero, though `src/composables/useToast.ts` exists.

### L-11 · MAJOR · correctness — `isMoon` flips *before* the await, so the label and the whole grid snap to the destination at t=0

```
FourierMorphDemo.vue:130   const from = isMoon.value ? moonShape : sunShape;
FourierMorphDemo.vue:131   const to   = isMoon.value ? sunShape : moonShape;
FourierMorphDemo.vue:132   isMoon.value = !isMoon.value;      ← flips NOW
FourierMorphDemo.vue:134   await morph.morphTo(from, to);     ← 350 ms of animation AFTER
```

`currentShapeName` (`:103`) and `currentShape` (`:104`) both derive from `isMoon`. So at the instant of the click — before one frame of settle-out — the info chip flips to **"Moon"** (`:16` → `MorphShapePreview.vue:37`) and all 12 grid thumbnails re-render as moon shapes (`:59` → `HarmonicLevelGrid.vue:130`), while the 180 px preview still shows a *sun* degrading to n=5. The readout describes the destination; the picture shows the source. For a tuning surface whose entire value is watching phase timing, chip and grid actively mislead for the whole settle-out phase.

Compounds L-07 (an extra 12-cell rebuild at t=0) and L-06 (the flip is never rolled back on rejection).

**Falsifier.** (a) Move `:132` after `:134` — dies. (b) Show `currentShape`/`currentShapeName` are not pure functions of `isMoon` — `:103-104` say otherwise. (c) The `from`/`to` derivation at `:130-131` is itself a re-derivation of `currentShape` (L-20), which is *why* the flip had to be hoisted.

### L-12 · MAJOR · wrong types — the two `as any` casts mask genuine tuple mismatches, and they are the file's only type escapes

`FourierMorphDemo.vue:99-100`:

```ts
const sunShape  = prepareFourierShape(sunData as any);
const moonShape = prepareFourierShape(moonData as any);
```

`tsconfig.json` has `"strict": true` (`:8`) and `"resolveJsonModule": true` (`:12`). Under `resolveJsonModule`, JSON array literals widen to `number[]`. The target interface requires **tuples**:

- `svg-fourier.ts:20` `domain: [number, number]` ← JSON infers `number[]` (present and verified: `sun.json` `decomposition.domain = [0.0, 1.0]`)
- `lib/types.ts:3` `BasisComponent.coefficient: [number, number]` ← JSON infers `number[]`, **×101 components per file**

So the cast is not decorative: it suppresses a real assignability failure, and in doing so it disables the *only* structural check that would catch a regenerated or renamed JSON. `prepareFourierShape` then fails **silently** on such input: `svg-fourier.ts:81-84` `if (ps)` skips missing keys without warning, yielding an empty `pointsByLevel`; `interpolateAtHarmonicLevel` returns `[]` (`:146-148`); `pointsToSvgPath` returns `""` (`:51`); the demo renders **a blank stage with no error**.

The same two lines appear verbatim at `DarkModeToggle.vue:26-27` — the escape hatch is a pattern, not a slip.

**Falsifier.** Delete both `as any` and run `vue-tsc --noEmit`; if it passes, the finding dies. It cannot — `number[]` is not assignable to `[number, number]` under `strict`, on two declared fields. The right fix is a narrowing loader or a `satisfies`-checked shape, not a whole-object `any`.

### L-13 · MAJOR · module size / colocation — `FourierShape` drags a 225 KB decomposition to serve one `number[]`, un-memoized, twice

`svg-fourier.ts:31-35`:

```ts
export interface FourierShape {
    data: FourierPathData;                            // the ENTIRE parsed JSON
    pointsByLevel: Map<number, [number, number][]>;    // the only thing anyone renders
}
```

Repo-wide, `FourierShape.data` is read at **exactly two sites, both `.data.levels`**: `svg-fourier.ts:129` and `FourierMorphDemo.vue:117` (verified by `grep -rn "\.data\b"` over `src/`). Everything else in `FourierPathData` — `original` (512 pts), `eval_points` (512), `decomposition.components` (**101** objects), `n_harmonics`, `n_samples`, `n_eval` — is carried for nothing. A `levels: number[]` field discharges both readers.

Separately, `prepareFourierShape` is **not memoized** and is called at `<script setup>` scope — i.e. **per component instance**, not per module — in *two* components: `FourierMorphDemo.vue:99-100` and `DarkModeToggle.vue:26-27` (the latter in the always-mounted header). With `/morph` open the app holds **two independent Map pairs**: 2 components × 2 shapes × 10 levels × 512 points = **20 480 two-element arrays** (~1.1 MB by V8 array-header estimate — *flagged as an estimate*), rebuilt from scratch on every route mount, synchronously, on the first-paint path.

**Falsifier.** (a) Find a third reader of `FourierShape.data` — none. (b) Find a memo — `:76-88` allocates unconditionally. (c) Scope check: the JSON *object graph* is single-copy (both files import the same specifier; Vite dedupes the module), so the duplication claim is confined to the Maps — stated precisely to survive that objection.

### L-14 · MAJOR · correctness — Reset is the one unguarded mutator, it is never disabled, and mid-morph it is *clobbered by the coroutine it interrupts*

*(Folded forward from the superseded L-axis pass, finding `M-1` — credited, and now joined to the L-01 mechanism.)*

`handleReset` (`FourierMorphDemo.vue:175-178`) has **no `isAnimating` check**, unlike its two siblings (`:128` in `handleToggle`, `:138` in `handlePreviewClick`), and its button carries **no `:disabled`** (`:75`) unlike the morph button (`:18`).

Clicking Reset mid-morph calls `morph.setShape(currentShape.value)` → `stopAnim()` (`useFourierMorph.ts:90`) → per the `stop()` contract (L-01) **the in-flight phase promise resolves**, so `morphTo` immediately advances: `:182` `phase = "morph"`, `:189` overwrites `currentPoints` with `lerpPoints(fromLowPoints, toLowPoints, t)` computed from the *pre-reset* `from`/`to`, then settles in to `to` and ends at `:210` `phase = "idle"`. **Everything `setShape` just wrote is discarded**, and the shape the user reset *away from* is what finishes rendering — while the config panel shows defaults. The reset silently does not happen.

**Falsifier.** (a) Add `if (isAnimating.value) return` to `handleReset`, or `:disabled="isAnimating"` to `:75` — either kills it. (b) If `stop()` truly terminated `morphTo`, `setShape`'s write would stand — the d.ts says it resolves the pending play (L-01). (c) Note the same mechanism makes `setLevel` (`:98-104`) unsafe mid-morph; it is protected only by the caller's guard at `FourierMorphDemo.vue:138`, i.e. by convention, not by the composable.

---

## §4 — MINOR

### L-15 · MINOR · correctness — clamped number inputs desync from their own DOM when the clamp is a no-op
`MorphPhaseConfig.vue:10-18` and `HarmonicLevelGrid.vue:8-16, 31-39` bind `:value` + `@change` and clamp in the handler (`MorphPhaseConfig.vue:93-96`, `HarmonicLevelGrid.vue:109-117`). When the clamp maps the typed value onto the value the prop **already holds** (duration is 800, user types `900`), the emitted value is identical, no prop change occurs, Vue patches nothing, and the input keeps displaying the rejected `900` over a state of `800`. **Falsifier:** force-write `$event.target.value` in the handler, or key the input; neither is done.

### L-16 · MINOR · correctness / duplication — two of three numeric emitters lost their `Math.round`
`MorphPhaseConfig.vue:94` rounds (`Math.round(Number(raw) || 50)`); `HarmonicLevelGrid.vue:110` and `:115` do **not**. Typing `3.7` into Low yields `lowLevel = 3.7`, which `computePreviewLevels` (`useMorphConfig.ts:35`) inserts verbatim, producing a grid cell labelled **`n=3.7`** (`HarmonicLevelGrid.vue:80`). `step="1"` (`:14`) does not constrain typed input. **Falsifier:** add `Math.round` to both; three sibling emitters should not disagree about integrality.

### L-17 · MINOR · dead code — `getIdlePoints` has zero call sites
`useFourierMorph.ts:110-113`, returned at `:227`. Repo-wide grep: definition + return only. Dead public surface on a shared composable.

### L-18 · MINOR · dead code — `updateField` has zero call sites
`useMorphConfig.ts:64-67`, returned at `:92`. Same grep result. It also contains the module's only `as any` (`:66`) — deleting it removes a type escape for free.

### L-19 · MINOR · dead code — the `closed: false` branch and its `pencil-boil` import are unreachable in-repo
`svg-fourier.ts:52` `if (!closed) return catmullRomToBezier(points);`. No caller passes a second argument — all four call sites verified (`useFourierMorph.ts:81`, `HarmonicLevelGrid.vue:131`, and the two internal). The `@mkbabb/pencil-boil` import at `:11` exists solely for that branch, and `pencil-boil` is a live uplift row in the census (`lane-frontend.md §5`: *"pencil-boil 0.4.1 → ^0.11.2"*) — a dead branch holding a real migration cost.

### L-20 · MINOR · duplication — the current shape is derived three different ways in 80 lines
`:104` `currentShape` computed · `:124` `morph.setShape(sunShape)` (hardcoded literal, silently assuming `isMoon === false` at mount) · `:130-131` `from`/`to` re-derived from `isMoon` by hand · `:177` `currentShape.value`. Four call sites, three idioms. The `:124` literal is a latent bug the moment initial state becomes route- or storage-driven. **Falsifier:** `onMounted(() => morph.setShape(currentShape.value))` collapses two of three; nothing prevents it.

### L-21 · MINOR · duplication — three hand-unrolled `MorphPhaseConfig` blocks and six manual write-back handlers
`FourierMorphDemo.vue:26-54`: three sibling blocks identical modulo four tokens (`title`, `description`, the config field triple, `slider-color`), each with two inline `@update:* = "morphConfig.config.X = $event"` assignments. 29 template lines a `v-for` over a 3-row phase descriptor would render in ~10, with the six write-backs collapsing to one keyed assignment. **This is the R5-7 class inverted** — see §6.

### L-22 · MINOR · duplication / R5-7 — the four info chips are duplicated verbatim, and both copies are always in the DOM
`MorphShapePreview.vue:13-26` (`.desktop-info`) and `:30-43` (`.mobile-info`) are byte-identical four-chip blocks; neither is `v-if`'d — the switch is pure CSS (`:124-145`, `display:none`/`display:flex` under a 640 px media query). **Eight chip nodes exist for four visible ones, at every viewport.** See §6.

### L-23 · MINOR · module boundaries / colocation — one easing catalog, three import paths, and a layering inversion
`lib/easings.ts` is the home. It is re-exported by `useFourierMorph.ts:29` **and** by `useMorphConfig.ts:20`. `MorphPhaseConfig.vue:74-78` then imports `EASING_PRESETS`/`EASING_PRESET_NAMES`/`easingCurvePath` from **`@/composables/useMorphConfig`** — a state composable acting as a lib barrel. Compounding it, `useMorphConfig.ts:10-13` imports `DEFAULT_MORPH_CONFIG` and the `MorphConfig` type from `useFourierMorph`: the config-state composable depends on the animation composable, when both should depend on a shared config module. **Falsifier:** import from `@/lib/easings` at the leaf and move `MorphConfig`/`DEFAULT_MORPH_CONFIG` to `lib/`; nothing structural prevents either.

### L-24 · MINOR · duplication — `MorphPhaseConfig` is the *fifth* easing-curve-preview surface in this repo
`MorphPhaseConfig.vue:47-54` inlines its own `<svg class="easing-preview" viewBox="0 0 40 20">` + `easingCurvePath(name)` (`lib/easings.ts:115-127`, a 24-sample polyline). In the same tree: `EasingCurvePreview.vue` (its own `<svg viewBox="-0.05 -0.3 1.1 1.6">` + `getEasingSVGPath` from `stores/animation.ts`), `EasingPicker.vue`, and `ui/PathPreview.vue`. The census books this family as a **🔴 HARD SHADOW** (`lane-frontend.md §4`: *"`EasingPicker.vue`+`EasingCurvePreview.vue`+`lib/easings.ts` (the producer README's forbidden 'fourth fork'; `./easing` ships at 7.0.0)"*). **I extend that row:** `MorphPhaseConfig.vue` is an unnamed fourth in-repo curve renderer, making the producer-relative count five — and it sits inside this component.

### L-25 · MINOR · composable contracts — `updateConfig` accepts unvalidated input while every UI path clamps
`useFourierMorph.ts:106-108` is a bare `Object.assign(config.value, newConfig)` over a `Partial<MorphConfig>`. Both UI entry points clamp (`MorphPhaseConfig.vue:94` to [50,800]; `HarmonicLevelGrid.vue:110,115` to [1,100]) — but the composable is public with a second consumer (`DarkModeToggle.vue:37`). A `0` duration reaches `useFourierMorph.ts:137` `Math.min(time / a.options.duration, 1)` → at `time === 0`, `0/0 = NaN` → `Math.min(NaN,1) = NaN` → `easeOut(NaN)` → NaN coordinates → a `d` string of `"C NaN,NaN …"` → an **unparseable path and an invisible shape, with no error**. `lowLevel < highLevel` is likewise enforceable only by the UI, not by the type or the setter. **Falsifier:** clamp inside `updateConfig`, or brand the duration; neither is done.

### L-26 · MINOR · test posture — 384 LOC of pure, trivially-testable logic with zero unit coverage; `/morph`'s only gate is a screenshot
`package.json` has no `vitest` dependency and no `test` script (corroborating `lane-frontend.md §0/§9`: *"**vitest ABSENT**"*). `svg-fourier.ts` (154 LOC of pure functions — `lerpPoints`, `nearestLevel`, `interpolateAtHarmonicLevel`, `pointsToSvgPath`) and `useFourierMorph.ts` (230) are as unit-testable as code gets. The **only** automated coverage touching `/morph` is `e2e/visual-baseline.spec.ts:35` `{ slug: "morph", path: "/morph" }` — a static screenshot at three viewports, with **no click on the morph button, no slider interaction, no export**. None of L-01 … L-14 is reachable by any existing gate. **Falsifier:** point at one test that toggles the morph — `grep -rln "morph" e2e/` returns that one file, that one route row.

### L-27 · MINOR · error postures — three interactive controls, three different mid-morph postures
The morph button is **disabled** (`FourierMorphDemo.vue:18` → `MorphShapePreview.vue:4`, with a `cursor: wait` affordance at `:118-120`). The 12 grid cells stay **enabled** while `handlePreviewClick` silently returns (`:138`; `HarmonicLevelGrid.vue:54-65` has no `:disabled`) — a click that looks live and does nothing. Reset is **enabled and destructive** (L-14). One component, three postures for the same "busy" state. **Falsifier:** show a deliberate reason for the divergence — the guard at `:138` proves the intent was to block, so the missing `:disabled` is an omission, not a design.

---

## §5 — INFO

### L-28 · INFO · `pointsToSvgPath` double-specifies the seam
`svg-fourier.ts:58-72`: the loop emits `n` cubics, the last already terminating at `points[0]`; `" Z"` is then appended. Harmless (a coincident-point `Z` is a no-op closepath), but the seam is specified twice and any future open-path refactor has two things to change.

### L-29 · INFO · sortedness of `levels` is assumed, never asserted
`nearestLevel` (`svg-fourier.ts:112-119`) `break`s on the first `l > target`; `interpolateAtHarmonicLevel` (`:136-142`) scans for a bracketing pair — both silently wrong on an unsorted `levels`. The array comes from external Python-generated JSON with no schema check (see L-12). One `[...levels].sort((a,b)=>a-b)` makes both unconditionally safe.

### L-30 · INFO · `xyToPoints` is exported but consumed only internally
`svg-fourier.ts:38`; sole caller `:83`. Over-exported surface on a 154-line module.

### L-31 · INFO · the morph button has no accessible name; its sibling does
`MorphShapePreview.vue:4-10`: `<button class="morph-button" @click :disabled>` containing only `<FourierMorphSvg>` — a bare `<svg><path/></svg>` with no `<title>` (`FourierMorphSvg.vue:1-17`). No `aria-label`. Contrast the near-identical `DarkModeToggle.vue:2-6`, which **does** bind `:aria-label`. Primarily a D/A-axis row; logged here because a divergence between two sibling consumers of the same SVG component is a library-consistency signal, and the repo ships `@axe-core/playwright` (census §8) that is not pointed at `/morph`.

---

## §6 — The R5-7 class, applied

`lane-fourier-r3-r6.md` row **R5-7** (ADOPT-AS-FACT, CARRY → F.W4) states the class: *"template-loop evidence keyed to **component** callsites is blind to native HTML element loops"* — in fourier it dropped the entire `PaperSidebar.vue` TOC subtree (3 nested native `<li v-for>` at lines 65/87/105, live-verified by R6-5, cured by R6's `NATIVE_TEMPLATE_LOOP` family).

**Applied to this subtree, the literal class does NOT fire — and that is itself the finding.**

- The only `v-for` in the whole closure is `HarmonicLevelGrid.vue:55` `v-for="level in levels"` on a **glass-ui `<Button>`** — a *component* callsite, so a component-keyed deriver counts it correctly. Same for `MorphPhaseConfig.vue:41` `v-for="name in easingNames"` on `<SelectItem>`. Grepping all five files for `v-for` on native elements (`li`, `div`, `span`, `path`) → **zero**. A component-callsite deriver reports this subtree with full fidelity.

**But two sibling classes fire, and they invert R5-7's failure mode — over-counting and phantom-counting instead of under-counting:**

1. **Hand-unrolled loops (L-21, L-22).** `FourierMorphDemo.vue:26-54` renders three `MorphPhaseConfig` instances as three literal blocks; `MorphShapePreview.vue:13-43` renders **eight** literal info-chip `<div>`s for four visible ones. A callsite-keyed deriver sees 3 and 8 *independent* callsites with **no loop leaf at all** — the exact opposite of R5-7, which had a loop with an empty leaf. Any "instances per loop" or "distinct component surface" metric built on loop leaves is blind to unrolled repetition in precisely the way R5-7 was blind to native loops. **Both are the same underlying defect: the derivation model assumes repetition ⟺ a registered component `v-for`.**
2. **CSS-invisible duplication (L-22).** The desktop/mobile chip blocks are toggled by a media query (`MorphShapePreview.vue:124-145`), not by `v-if`. A DOM-derived count sees 8 at every viewport; a *rendered* count sees 4; a source count sees 8 literals. **All three disagree and none is wrong** — exactly the ambiguity F.W4's per-component D/L/C audit must resolve before it can trust any instance denominator.

**Recommendation for F.W4** (extending R5-7's carry): specify the per-component instance denominator against **three** families, not one — `COMPONENT_TEMPLATE_LOOP` (already handled), `NATIVE_TEMPLATE_LOOP` (R6-5's cure), and **`UNROLLED_REPETITION`** (structurally identical sibling callsites differing only in literal props) — plus a stated rule for CSS-toggled duplicates. `FourierMorphDemo.vue:26-54` and `MorphShapePreview.vue:13-43` are the reference specimens.

---

## §7 — Corpus reconciliation (fold, don't re-invent)

| Corpus row | This challenge |
|---|---|
| `lane-frontend.md §2` — *"`components/morph/FourierMorphDemo.vue` \| 330 \| `/morph` route — SVG path morph via Fourier coefficients"* | **CONFIRMED** — 330 LOC exact; sibling LOC (286 / 212 / 191 / 175 / 41) all exact against the tree. |
| `lane-frontend.md §6` — *"Canvas2D throughout. WebGL/WebGPU: ABSENT"* | **CONFIRMED for this subtree** — no canvas, no WebGL anywhere in the closure; the morph render path is **pure SVG DOM**, which is precisely why L-07 / L-08 cost what they cost: there is no GPU path to absorb 667.6 KiB of `d` text. |
| `lane-frontend.md §6` — SVG surfaces (12 files) includes `morph/{HarmonicLevelGrid, MorphPhaseConfig}` and `decorative/FourierMorphSvg`, and **excludes** `FourierMorphDemo` / `MorphShapePreview` | **CONFIRMED, correctly** — neither contains an `<svg>`; both delegate to `FourierMorphSvg`. The census's surface list is exact for the morph subtree. |
| `lane-frontend.md §6` (`lib/scheduler.ts:13-15`) — *"NOT applied to the epicycle/**morph** RENDER loop: that is already rAF-paced AND off-screen-gated (I.γ)"*, folded as *"Good hygiene, correctly scoped"* | ⚠ **CONTRADICTED (L-09).** True of the epicycle loop; **false of the morph loop**, which imports neither `stores/animation` nor any `IntersectionObserver` / `visibilitychange` gate. |
| `lane-frontend.md §8 ⚠ COVERAGE GAP` + `§9 carry 9` — *"the **two** ungated animation clocks"* | ⚠ **CONTRADICTED / EXTENDED (L-09).** There are **three**; the morph clock is the third, and it reaches the always-mounted header via `DarkModeToggle`, not just `/morph`. |
| `lane-frontend.md §4` 🔴 HARD SHADOW — *"`EasingPicker.vue`+`EasingCurvePreview.vue`+`lib/easings.ts` … the producer README's forbidden 'fourth fork'"* | **EXTENDED (L-24).** `MorphPhaseConfig.vue:47-54` is an unnamed fourth in-repo curve renderer; the producer-relative count is five, and it lives inside this component. |
| `lane-frontend.md §9 carry 5` — *"`value.js 0.13 → 4.0` consumer surface is tiny (5 sites, `easeInOutSine` + `timingFunctions`) — the cheapest leg of the deadlock and **the value.js-side interest**"* | **CONFIRMED + LOCATED.** `lib/easings.ts:9, 11-17` is one of those sites and sits in this component's transitive closure. All 22 preset names in `EASING_LABELS` (`:28-51`) resolve against `value.js@0.13`'s `timingFunctions` — verified key-by-key against `dist/easing.d.ts:105-161`, including `ease-in-back` / `ease-out-back` / `ease-in-out-back` at `:155-157`. **No dropped easing; `getEasingFn`'s fallback (`:65-67`) is never exercised.** |
| `lane-frontend.md §0/§9` — *"**vitest ABSENT**"* | **CONFIRMED (L-26)** — no `vitest` dep, no `test` script; `/morph`'s only gate is `e2e/visual-baseline.spec.ts:35`, a screenshot. |
| `lane-fourier-r3-r6.md` **R5-7 / R6-5** (ADOPT-AS-FACT, CARRY → F.W4) | **FOLDED + EXTENDED** — see §6. The literal class does not fire here; two inverted siblings do, and F.W4's denominator needs a third family (`UNROLLED_REPETITION`). |
| `lane-fourier-r3-r6.md` **X-2** (route count: *"9 route records = 7 lazy component + 2 redirect, + 1 alias"*, Codex correct / census wrong) | **CONFIRMED at this component's row** — `router/index.ts:104` is one of the 7 lazy component routes (`/morph`), matching the adjudicated denominator, not the census's "8, all lazy". |
| `CENSUS-2026-08-03.md §3a` — *"three independent canvases … + 12 SVG surfaces"* | **CONFIRMED**; this component contributes 2 of the 12 and 0 of the 3. |
| Superseded L-axis pass at this path, finding `M-1` | **FOLDED FORWARD as L-14** — the unguarded, un-disabled Reset, now joined to the L-01 `stop()`-resolves mechanism that makes it actively destructive rather than merely unguarded. |

---

## §8 — Superlatives (L-18 runs both ways)

Five things this subtree gets **right**, each with its own falsifier — a challenge that only accuses is not a measurement.

### S-1 · The frame-adjacency snap is correct, and provably cannot collapse the range
`FourierMorphDemo.vue:148-169`. The comment (*"Snap based on grid frame adjacency, not pure number distance"*) names a genuinely non-obvious choice: with a non-uniform ladder (`1,2,3,5,8,12,18,25,35,50`), Euclidean distance would snap `n=35` toward `high=50` when the user visually means "one frame left." **I checked the invariant `lowLevel < highLevel` by case analysis on both branches and it holds:** the `else` branch can set `lowLevel = level` only when `framesToLow ≤ framesToHigh`; collapsing requires `level === highLevel`, i.e. `framesToHigh = 0`, i.e. `idx − lowIdx ≤ 0`, i.e. the range was already degenerate. The `indexOf === -1` fallback (`:161-169`) is collapse-safe by the identical argument on raw distances. **Falsifier:** exhibit `(level, lowLevel, highLevel)` drawn from `previewLevels` with `low < high` that yields `low === high` — the case analysis says none exists, and I could not construct one.

### S-2 · `pointsToSvgPath` gets the closed-curve seam right
`svg-fourier.ts:54-67`. The default bug in every hand-rolled Catmull-Rom→Bézier converter is a tangent discontinuity at index 0, because `p0` for the first segment is undefined. This code uses modular indexing on all four control points (`(i-1+n)%n`, `(i+1)%n`, `(i+2)%n`) so tangents wrap continuously across the seam, and the comment at `:54` says exactly why. On a 512-point closed contour at 180 px that artifact would be visible; it is not there.

### S-3 · The dynamic-boundary discipline is right even though the primitive is wrong
`useFourierMorph.ts:33-44`. Keeping value.js off the eager bundle, memoizing the engine promise, and **writing down the caching invariant** ("*this promise is constructed at most once*") is exactly the discipline a shared composable owes its consumers. L-05 does not fault the reasoning — it faults the choice of `Animation` over `NumericAnimation`, which is a *better* answer to the same question the comment was written to address. The instinct was right; the catalogue was not read to the end.

### S-4 · The hand-rolled clipboard timer was correctly retired to the producer
`useMorphConfig.ts:55-58` carries its own provenance: *"P.W5 Lane B.2 — replaced manual `copied` ref + 2s timeout + onUnmounted cleanup with glass-ui's `useClipboard` (auto-resets `copied` and owns timer-cleanup discipline)."* The `setTimeout`-survives-unmount leak class is genuinely gone from this subtree, and the migration is dated and attributed. L-10 faults only the *error* half of the adopted contract, never the adoption.

### S-5 · `lerpPoints` pre-empts the length-mismatch crash
`svg-fourier.ts:99` `const n = Math.min(a.length, b.length)`. Cross-shape morphing (`useFourierMorph.ts:189`, sun-low → moon-low) is exactly where an index-out-of-bounds would live; the guard makes it structurally impossible. Both shapes measure 512 points, so it never truncates in practice. *Honest caveat:* silent truncation is a weaker posture than a loud invariant — but the crash class is closed, which is the harder half.

---

## §9 — Falsifier index

| ID | Sev | Anchor | One-line falsifier |
|---|---|---|---|
| L-01 | BLOCKER | `useFourierMorph.ts:215, 170-208` | Show `stop()` leaves `play()` pending, or find a disposal flag. |
| L-02 | BLOCKER | `useFourierMorph.ts:149 vs 169` | Move `phase.value="settle-out"` above the `await`, or find a re-entrancy guard. |
| L-03 | BLOCKER | `useMorphConfig.ts:30` vs shipped `levels` | Produce shipped path data with levels > 50. |
| L-04 | MAJOR | `FourierMorphDemo.vue:107-111, 175-178` | Show the `syncWith` watcher flushes synchronously. |
| L-05 | MAJOR | `useFourierMorph.ts:122-143` vs `keyframes.d.ts:2150-2213` | Show `NumericAnimation` is not a root export, or lacks `onFrame`/easing. |
| L-06 | MAJOR | `useFourierMorph.ts:38-44`; `FourierMorphDemo.vue:132-134` | Find a `.catch` nulling `enginePromise`, or a rollback of `isMoon`. |
| L-07 | MAJOR | `HarmonicLevelGrid.vue:129-132, 55, 68` | Find the memoization, or show `activeLevel` is constant during a morph. |
| L-08 | MAJOR | `svg-fourier.ts:56-70` | Show the paths render above ~20 000 px, or that 2 dp changes geometry. |
| L-09 | MAJOR | `useFourierMorph.ts:127-133`; `scheduler.ts:13-15` | Find any visibility / reduced-motion gate reachable from the morph loop. |
| L-10 | MAJOR | `useMorphConfig.ts:58, 73-75` | Show `useClipboard` swallows failures internally. |
| L-11 | MAJOR | `FourierMorphDemo.vue:130-134` | Show `currentShape` / `currentShapeName` do not derive from `isMoon`. |
| L-12 | MAJOR | `FourierMorphDemo.vue:99-100` | Delete both `as any`; a passing `vue-tsc --noEmit` kills it. |
| L-13 | MAJOR | `svg-fourier.ts:31-35, 76-88` | Find a third reader of `FourierShape.data`, or an existing memo. |
| L-14 | MAJOR | `FourierMorphDemo.vue:75, 175-178` | Add the `isAnimating` guard or `:disabled`; either kills it. |
| L-15 | MINOR | `MorphPhaseConfig.vue:10-18` | Show Vue re-patches `:value` when the emitted value is unchanged. |
| L-16 | MINOR | `HarmonicLevelGrid.vue:110, 115` | Show fractional harmonic bounds are intended. |
| L-17 / L-18 / L-19 | MINOR | `useFourierMorph.ts:110`; `useMorphConfig.ts:64`; `svg-fourier.ts:52` | Produce one call site for any of the three. |
| L-20 / L-21 / L-22 | MINOR | `FourierMorphDemo.vue:124, 130-131, 26-54`; `MorphShapePreview.vue:13-43` | Show the repetition is not structurally identical. |
| L-23 / L-24 | MINOR | `useMorphConfig.ts:20`; `MorphPhaseConfig.vue:47-54, 74-78` | Show one import path / one curve renderer. |
| L-25 | MINOR | `useFourierMorph.ts:106-108, 137` | Find validation on `updateConfig`, or show `0/0` is unreachable from any consumer. |
| L-26 | MINOR | `package.json`; `e2e/visual-baseline.spec.ts:35` | Point at one test that clicks the morph button. |
| L-27 | MINOR | `HarmonicLevelGrid.vue:54-65` vs `FourierMorphDemo.vue:18, 75` | Give a deliberate reason for three different busy-state postures. |
| L-28 … L-31 | INFO | `svg-fourier.ts:69-72, 112-119, 38`; `MorphShapePreview.vue:4-10` | As stated inline. |
| S-1 … S-5 | SUPERLATIVE | §8 | Each carries its own falsifier inline. |

**Livable-only claims requiring live verification (SS-13, UNPROVEN-NEEDS-LIVE):** the *browser* frame-time / INP consequence of L-07 and L-08 (allocation volumes, string lengths and Node build times are measured from the shipped data and the shipped algorithm; the resulting jank is not claimed); the *rendered* identity of the three phantom-level thumbnails in L-03 (the `d`-string identity is proven by `===`, the pixels are not observed); and the human-achievable width of the double-click window in L-02 (the code path is proven; the timing depends on network latency for the engine chunk).

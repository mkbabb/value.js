claude-opus-5[1m]

# CHALLENGE — `ConvergencePlot.vue` · axis **L** (LIBRARY)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/ConvergencePlot.vue` — **410 LOC**
(333 script · 40 template · 33 style), census row `formation/fourier/lane-frontend.md:131`
("Canvas2D partial-sum convergence plot **with own rAF loop**").
**Repo posture** `/Users/mkbabb/Programming/fourier-analysis` is READ-ONLY evidence. Branch `m/w1-bump-migration`,
HEAD `cd26c65`. **The subject file and all four of its first-party library modules are CLEAN** at read time
(`git status --porcelain ConvergencePlot.vue lib/ composables/` → empty). Three files I cite as collaborators
**are** dirty — `EquationView.vue`, `convergence/ConvergenceTimeline.vue`, `convergence/ConvergenceLegend.vue` —
see §0.1 for the exact diff and why no finding turns on it.
**Method** static + source-derived only. No browser, no devtools, no Playwright. Where a claim would need a live
browser to close, it is marked **UNPROVEN-NEEDS-LIVE (SS-13)** and excluded from the BLOCKER count.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim carries its own
falsifier. §7 records the **five hypotheses the tree falsified** — I was wrong five times and the record says so,
because L-18 runs both ways and so does the burden of proof.

**Tally — defects 28 (BLOCKER 3 · MAJOR 8 · MINOR 13 · INFO 4) · superlatives 3.**

---

## §0 — Read set

Whole-file reads of the component and **every module it imports**, plus the modules required to close each
falsifier. All read-only.

| File | LOC | Why in the set |
|---|---|---|
| `web/src/components/equation/ConvergencePlot.vue` | 410 | subject |
| `web/src/components/equation/lib/grid.ts` | 75 | `drawPlotGrid`, `PlotPadding`, `niceStep` |
| `web/src/components/equation/lib/hit-test.ts` | 36 | `hitTestCurves`, `CurveHitRegion` |
| `web/src/components/equation/lib/harmonics.ts` | 88 | `groupTrigHarmonics`, `harmonicProgress`, `spectrumColor`, `TrigHarmonic` |
| `web/src/components/equation/composables/useCurveTransition.ts` | 87 | `createTransitionState`, `startTransition`, `snapshotForTransition`, `lerp` |
| `web/src/components/equation/convergence/ConvergenceLegend.vue` | 97 | child; the subtree's only `v-for` |
| `web/src/components/equation/convergence/ConvergenceTimeline.vue` | 146 | child; the scrub transport |
| `web/src/lib/golden-shimmer.ts` | 68 | `applyGoldenShimmer`, `clearShimmer` |
| `web/src/lib/equation/types.ts` | 53 | `FourierTermDTO` |
| `web/src/components/equation/EquationView.vue` | 470 | the **sole** callsite (`:309-315`) |
| `web/src/components/equation/FunctionInput.vue` §43-75, §178-192 | — | domain parser + the harmonics slider ceiling |
| `web/src/lib/equation/api.ts` | 56 | the wire |
| `web/src/stores/animation.ts` §35-80 | — | the in-tree rAF cure this file does not use |
| `web/src/lib/easings.ts` §1-25 | — | the sibling bare-root `value.js` import sites |
| `api/routers/equations.py` §1-120 | — | the sampling + reconstruction convention (falsifies F-1, F-2, F-5) |
| `api/models/equations.py` §16-24 | — | `n_harmonics` / `n_eval_points` bounds (falsifies F-3) |
| `node_modules/reka-ui/dist/Slider/SliderRoot.js` §100-170 | — | **`valueCommit` emission condition — closes L-B1** |
| `node_modules/reka-ui/dist/Slider/SliderImpl.js` (whole) | — | the pointer state machine — closes L-B1 |
| `node_modules/@mkbabb/glass-ui/dist/components/ui/slider/{index,Slider.vue}.d.ts` | — | producer emit surface + variant contract |
| `node_modules/@mkbabb/glass-ui/dist/slider-DQ95MET2.js` | — | the compiled render tree (thumb `touch-hit-area`, aria forwarding) |
| `/Users/mkbabb/Programming/value.js/package.json` (4.0.0) | — | the exports map — closes L-M6 |
| `web/node_modules/@mkbabb/value.js/package.json` (0.13.0) | — | the installed exports map |

**Hitherto corpus folded** — `formation/fourier/{lane-frontend,lane-crud,CENSUS-2026-08-03}.md` and the adjudicated
intake `audit/codex-provenance/intakes/lane-fourier-r3-r6.md`. Rows cited inline and reconciled in §6:
**FE `:131`** (the component row), **FE `:558-559`** (Path B — own rAF), **FE `:480`** + **CENSUS `:38`**
(the 5-site value.js surface), **FE `:619`, `:624`, `:644`** (the reduced-motion COVERAGE GAP and carry #9),
**FE `:642`**/CENSUS §3a (the `FourierField` convergence study), **CENSUS `:87`** (three independent canvases),
**FE §9 #11** (vitest ABSENT), **R5-7 / R6-5** (native-template-loop invisibility), **X-5** (66 SFC).
Two census statements are **extended** and one is **corrected**; see §6.

### §0.1 — the dirty-collaborator disclosure

`git diff --stat web/src/components/equation/` → 5 files, **9 insertions / 9 deletions**, all of it the WT bump's
`glass-scrubber` → `standard` variant rename (`ConvergenceTimeline.vue` doc-comment `:7` + template `:71`;
`EquationView.vue` ×4; two other files not in my read set). The pointer/commit wiring I attack in **L-B1**
(`ConvergenceTimeline.vue:46-56, 80-81`) is **byte-identical to HEAD**. No finding turns on the dirty delta;
where I quote a dirty file I quote the working tree and say so.

---

## §1 — BLOCKERS

### L-B1 — the scrub latch is opened by a raw DOM event and closed only by a *conditional* semantic event; one zero-delta press kills playback permanently while the transport still reports "playing" · **BLOCKER**

**Provenance — the consumer half.** `ConvergenceTimeline.vue:36, 46-56, 80-81`:

```ts
const scrubbing = ref(false);
function onPointerDown() { if (scrubbing.value) return; scrubbing.value = true;  emit("scrub-start"); }
function onValueCommit() { if (!scrubbing.value) return; scrubbing.value = false; emit("scrub-end");  }
```
```html
<Slider v-model="tArr" … @pointerdown="onPointerDown" @value-commit="onValueCommit" />
```

and the parent half, `ConvergencePlot.vue:282-291`:

```ts
function onScrubStart() { stopLoop(); }
function onScrubEnd()   { if (playing.value) startLoop(); }
```

**Provenance — the producer half.** `@pointerdown` is a fallthrough attr; glass-ui's `Slider` has a single root
(`slider-DQ95MET2.js` — `SliderRoot` is the only root VNode, `inheritAttrs` untouched) so it lands on reka's
`SliderRoot`, whose render merges `_ctx.$attrs` onto `SliderHorizontal` → `SliderImpl`
(`SliderRoot.js:149-160`). The consumer handler therefore fires on **every `pointerdown` of every pointer type
and every button** anywhere in the slider subtree — unconditionally.

`valueCommit`, by contrast, is emitted from exactly one place, and it is **conditional**
(`reka-ui/dist/Slider/SliderRoot.js:114-119`):

```js
function handleSlideEnd() {
    const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value];
    const nextValue = currentModelValue.value[valueIndexToChangeRef.value];
    const hasChanged = nextValue !== prevValue;
    if (hasChanged) emits("valueCommit", toRaw(currentModelValue.value));   // ← ONLY IF CHANGED
}
```

with `prevValue` snapshotted on pointerdown (`SliderRoot.js:158-160`) and `handleSlideEnd` reached only from
`SliderImpl`'s `pointerup` (`SliderImpl.js` — `onPointerup` → `if (target.hasPointerCapture(…)) emits("slideEnd")`).

**The defect.** `scrub-start` and `scrub-end` are not in bijection. Three deterministic, statically-derivable
non-commit paths:

| # | Gesture | Why no `valueCommit` |
|---|---|---|
| **(a)** | press+release on the track at the value the slider already holds | `handleSlideStart` → `updateValues` snaps to the same step ⇒ `hasChanged` false at `SliderRoot.js:117` |
| **(b)** | press+release on the **thumb** without moving | `SliderImpl.js` `onPointerdown`: `if (thumbElements.includes(target)) target.focus(); else emits("slideStart")` — the thumb branch never starts a slide; `pointerup` still reaches `handleSlideEnd`, `hasChanged` false. glass-ui gives the thumb an enlarged hit region — `class="slider-thumb glass-specular-track touch-hit-area"` (`slider-DQ95MET2.js`) — so this target is *larger* than the invisible thumb it paints |
| **(c)** | `pointercancel` (OS/system gesture interruption on touch) | `SliderImpl.js` binds `pointerdown`/`pointermove`/`pointerup` only. No `pointercancel` handler exists ⇒ `slideEnd` never fires |

Path (a) is not an edge case — it is **the affordance the variant advertises**. glass-ui's own contract
(`slider/index.d.ts`, `standard` recipe): *"you pull the TRACK itself … the filled `.slider-range` glass cylinder
… its leading EDGE IS the handle — the only affordance is the fill edge."* The documented grab point is the fill
edge, and the fill edge is **exactly the zero-delta position**. The step is 1 on a `0..100` range
(`ConvergenceTimeline.vue:73-75`) across a `flex-1` track ≈ 250-350 px, i.e. ~3 px per step: a press landing
within ~1.5 px of the fill edge commits nothing.

**Consequences, in order:**

1. `scrub-start` fired ⇒ `stopLoop()` ran (`ConvergencePlot.vue:283`) — `cancelAnimationFrame`, `rafId = null`.
2. `scrub-end` never fires ⇒ `startLoop()` never runs. **The animation is dead.**
3. `playing.value` was never touched by either handler, so it is still `true`: `ConvergenceTimeline.vue:61-64`
   keeps rendering the **pause** glyph and `.is-playing`. The transport lies about the state of the world.
4. Recovery costs two clicks: the first `togglePlay` (`:274-278`) sets `playing = false` and calls `stopLoop()`
   (already stopped), the second restarts.
5. **The latch never reopens.** `scrubbing` is stuck `true`, so `onPointerDown`'s guard swallows every subsequent
   press ⇒ `scrub-start` is never emitted again ⇒ `stopLoop()` is never called on scrub again. Every later drag
   writes `t.value` from `onScrubMove` (`:285-288`) while the rAF loop overwrites `t.value` every frame
   (`:65`) — **the scrubber becomes inert while playing**.
6. Item 5 is also the ignition for **L-B2** (see below): the next *successful* commit emits `scrub-end` with no
   preceding `scrub-start`, producing an unmatched `startLoop()`.

**Falsifier.** Show that `valueCommit` fires unconditionally, or that `pointerdown` on the glass-ui Slider cannot
reach the consumer handler without also starting a reka slide. Both are refuted above by producer source
(`SliderRoot.js:114-119` for the condition; `SliderImpl.js` `onPointerdown` thumb branch and the absent
`pointercancel` handler for the non-slide paths). A second falsifier: show the consumer independently resets
`scrubbing` on `pointerup`/`pointercancel` — `grep -n "pointerup\|pointercancel" ConvergenceTimeline.vue` → **zero
matches**.

**The cure is structural, not a patch.** The latch must be closed by the same event class that opens it: bind
`pointerup`+`pointercancel` on `window` for the duration of the gesture (the pattern glass-ui itself uses one file
over, `slider-DQ95MET2.js` `useDockHold`: `window.addEventListener("pointerup", c); window.addEventListener("pointercancel", c)`),
or drop `scrubbing` entirely and derive pause-during-scrub from `@update:model-value`. The producer already
demonstrates the correct shape inside the same bundle.

---

### L-B2 — `startLoop()` has no re-entrancy guard and `tick` never nulls `rafId`; the resulting orphan rAF survives `onUnmounted` and is uncancellable for the life of the page · **BLOCKER**

**Provenance.** `ConvergencePlot.vue:57-75`:

```ts
function startLoop() {
    loopStartTime = null;                                  // ← no `if (rafId !== null) return`
    function tick(now: number) {
        if (!playing.value) return;                        // ← does NOT set rafId = null
        …
        rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
}
function stopLoop() { if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } }
```

**The in-tree counter-example is 8 lines long and was written on purpose.** `web/src/stores/animation.ts:50-62`:

```ts
function startLoop() {
    if (!playing.value || !anyCanvasVisible.value || rafId !== null) return;   // ← (i) re-entrancy guard
    …
    function tick(now: number) {
        if (!playing.value || !anyCanvasVisible.value) { rafId = null; return; }  // ← (ii) invariant restored
```

The two loops are structurally the same animal — identical ping-pong (`const cycle = Math.floor(elapsed/dur);
const frac = (elapsed % dur)/dur; t.value = cycle % 2 === 0 ? frac : 1 - frac;` appears verbatim in both,
`animation.ts:66-69` ≡ `ConvergencePlot.vue:63-65`), identical resume-from-`t` rebasing
(`startTime = now - t.value * dur`, `animation.ts:62` ≡ `ConvergencePlot.vue:61`). ConvergencePlot is a copy of
the store loop with **all three of its safety properties removed**: (i) the re-entrancy guard, (ii) the
`rafId !== null ⟺ a frame is scheduled` invariant, (iii) the visibility gate (→ **L-M3**).

**Reachability of the double start — a concrete five-step trace, ignited by L-B1:**

| step | action | state after |
|---|---|---|
| 1 | zero-delta press on the scrubber (L-B1 path (a)) | `scrubbing=true` (latched), `playing=true`, **no loop** |
| 2 | click ▶ | `togglePlay` → `playing=false`, `stopLoop()` no-op |
| 3 | click ▶ | `playing=true`, `startLoop()` → **loop L1 live**; `scrubbing` still `true` |
| 4 | drag the scrubber (real value change) | `onPointerDown` **returns early** (`scrubbing` true) ⇒ **no `stopLoop`**; L1 still live |
| 5 | release | `valueCommit` fires (value changed) → `onValueCommit` → `scrub-end` → `onScrubEnd` → **`startLoop()` → loop L2 live alongside L1** |

Both loops now assign `rafId` every frame. `stopLoop()` can cancel **at most one**; the other re-arms on its next
tick. From step 5 onward the component holds an rAF loop it cannot stop.

**Teardown consequence.** `onUnmounted` (`:329-333`) calls `stopLoop()` once. The orphan's next `tick` reads
`playing.value` — the `ref` object is still alive via the closure and still `true` — so it calls `draw()` and
re-registers. `draw()` returns at `:82` (template refs are nulled on unmount), so it is cheap, but the loop
**never terminates**, and it retains the entire `<script setup>` closure: `props`, `transition`, and
`cachedScreenCurves` — which at the shipped harmonics ceiling holds ~50 000 two-element arrays (see **L-B3**).
Every visit to `/equation` that reaches step 5 adds another permanent orphan. This is a leak in the strict sense:
unbounded retention plus unbounded scheduled work, both surviving component death.

**Falsifier.** (1) Show the trace is unreachable — it requires L-B1, so refuting L-B1 refutes step 4; both stand
or fall together, and L-B1 is closed against producer source. (2) Show `stopLoop` can cancel both — it holds one
`number`. (3) Show `playing.value` is reset on unmount — `grep -n "playing.value = false" ConvergencePlot.vue`
→ one site, `togglePlay:275`, never `onUnmounted`. (4) Independent of the trace: the *invariant* is broken
regardless — after any `playing → false` transition that does not route through `stopLoop`, `rafId` holds a
stale, already-fired handle, so `stopLoop`'s `if (rafId !== null)` test is not a truthful predicate. That is a
defect on its own terms, and it is exactly what `animation.ts:60` fixes by writing `rafId = null` before its
early return.

---

### L-B3 — the whole curve matrix is recomputed and reallocated on every animation frame although it does not depend on `t`; at the shipped ceiling that is ~200 000 transcendental calls and ~51 000 array allocations per frame · **BLOCKER**

**Provenance.** Inside `draw()` (`ConvergencePlot.vue:79-236`), called once per rAF tick from `:66`:

- `:114-115` `xGrid` — 500 numbers, new array each frame. Depends on `props.domain` only.
- `:144` `curves` — `lerpH.map(h => xGrid.map(x => h.a_n*Math.cos(h.k*omega*x) + h.b_n*Math.sin(h.k*omega*x)))`.
  **`N` arrays × 500 numbers, 2 trig calls each.** Depends on `lerpH` (i.e. on `transition.progress`) and
  `xGrid` — **not on `t`**.
- `:159-163` `fullSum` — a second full `O(500·N)` double loop over the *unlerped* `harmonics`, 2 trig calls per
  inner step, used solely to derive `tMinY`/`tMaxY`. Depends on **nothing that changes between frames**.
- `:203-219` `harmPts` — up to `N` × up to 500 freshly allocated `[number, number]` tuples, rebuilt every frame
  and handed to `cachedScreenCurves` (`:235`).
- plus per frame: `oyLerped` (`:118`), `oxClosed`/`oyClosed` (`:128-129`), `lerpH` (`:132`), `cursors` (`:141`),
  `sumY` (`:148`), `origPts` (`:192`), `sumPts` (`:224`), `cachedScreenCurves` (`:235`).

**The ceiling is UI-reachable, not theoretical.** `FunctionInput.vue:184` — `:min="1" :max="100"` on the Harmonics
slider; `EquationView.vue:53-55` `vizHarmonics = autoHarmonics ? min(effectiveN, nHarmonics) : nHarmonics`; the
API permits more still (`api/models/equations.py:20` `n_harmonics … le=200`). `nPts` is the literal `500`
(`:108`). At `N = 100`:

| quantity | per frame | per second @60 fps |
|---|---|---|
| `Math.cos`/`Math.sin` calls (`curves` 100 000 + `fullSum` 100 000) | **200 000** | **12 000 000** |
| array objects (`curves` 100 + `harmPts` ≤50 000 + `origPts` 501 + `sumPts` 500 + `lerpH` 100 + 7 more) | **≈51 200** | **≈3 070 000** |
| numbers written into fresh backing stores | ≈110 000 | ≈6 600 000 |

`fullSum` is the purest waste: it is a *complete second evaluation of the entire series* whose only consumers are
the two `Math.min`/`Math.max` on `:164`, and its inputs (`harmonics`, `dc`, `xGrid`) are frame-invariant. `curves`
is frame-invariant except during the 500 ms transition window (`useCurveTransition.ts:26 DURATION = 500`), i.e.
it is genuinely recomputed-per-frame for < 1 % of the component's lifetime.

Only `cursors` (`:141`) actually depends on `t`. The animation is a **reveal**: `:211` `const end = Math.min(cursors[hi] + 1, nPts)`
draws a growing prefix of an otherwise fixed polyline. A prefix reveal of a static curve requires recomputing
nothing.

**Falsifier.** Show a per-frame dependency I missed. `curves` reads `lerpH` (← `harmonics`, `transition.progress`)
and `xGrid`/`omega` (← `props.domain`); `fullSum` reads `harmonics`, `dc`, `xGrid`, `omega`. Neither closure
mentions `t`, `easedT`, or `cursors` — `grep -n "easedT\|cursors" ConvergencePlot.vue` → `:140, :141, :151`
(`sumY` only), `:300` (`activeCount`). Confirmed. Second falsifier: show `N` cannot exceed ~10 in practice — the
shipped slider says 100 and the default is 20 (`EquationView.vue:28`), which already costs 40 000 trig calls and
~10 000 allocations per frame at rest, on autoplay, from mount (`:324`).

**Why BLOCKER and not MAJOR.** This is not a micro-optimisation note. It compounds with **L-M3** (no
off-screen gate) and **L-M4** (a full Vue render per frame) into a component that, on a phone with the panel
`display:none`, still burns 12 M trig calls/s and 3 M allocations/s — the exact failure `stores/animation.ts:35-42`
was written to prevent, in prose, in this repo. The lane already names Path B's Canvas2D substrate as the
"highest-value, highest-risk convergence target" (FE `:432`, `:642`); this is the measurement that says the
convergence is not optional.

---

## §2 — MAJOR

### L-M1 — `snapshotForTransition` is handed the **new** harmonics as the "previous" state; the harmonic and DC lerp is a no-op and two-thirds of `TransitionState` is dead · **MAJOR**

`ConvergencePlot.vue:308-317`:

```ts
watch(() => [props.originalPoints, props.coefficients], (_, old) => {
    if (old?.[0]) {
        const oldOy = (old[0] as { x: number[]; y: number[] }).y;              // ← correctly OLD
        snapshotForTransition(transition, oldOy,
            trigHarmonics.value,                       // ← NEW (computed, re-evaluated on read)
            dcTerm.value?.coefficient_re ?? 0,         // ← NEW
            props.originalPoints.x,                    // ← NEW
            props.domain);                             // ← NEW
```

`trigHarmonics` (`:35`) and `dcTerm` (`:36`) are `computed` over `props.coefficients`. The watcher's default
`flush: 'pre'` runs *after* the source mutated, so reading `.value` inside the callback lazily re-evaluates
against the **new** props. Only `oldOy` — recovered from the watcher's `old` tuple — is genuinely previous.

Downstream in `draw()`:

- `:132-136` `lerp(o.a_n, h.a_n, tp)` with `o ≡ h` ⇒ **identity for all `tp`**. The harmonic curves snap.
- `:137` `lerp(transition.prevDcRe, dc.coefficient_re, tp)` with both sides equal ⇒ **identity**. The DC snaps.
- `useCurveTransition.ts:70-81` computes `prevMinY`/`prevMaxY` from a **hybrid**: old `origY` against a `fullSum`
  built from the *new* harmonics on the *new* `origX`. The bounds lerp from a state that never existed.
- `useCurveTransition.ts:71-75` indexes `origX[i] ?? domain[0]` where `origY` is old and `origX` is new; if the
  lengths ever differ the fallback silently substitutes `domain[0]` for the missing abscissae rather than failing.

So of the six `TransitionState` fields (`useCurveTransition.ts:17-24`), **`prevHarmonics` and `prevDcRe` are
provably dead**, `prevMinY`/`prevMaxY` are half-dead, and only `prevOrigY` works. The composable's own docblock
(`:2-6`) advertises *"snapshots the old state (Y-values, harmonics, DC, Y-bounds)"* — three of the four are not
snapshotted.

**Falsifier.** Show Vue serves a stale computed inside a `pre`-flush watcher callback. It does not: computeds are
lazy and dirty-checked on read, and the watcher fires because the dependency already changed. Second falsifier:
show the parent mutates `result.original_points` **in place** so that `old[0] === props.originalPoints` — then
`oldOy` would also be new and the transition would be *entirely* inert. `EquationView.vue:104` assigns
`result.value = await computeEquation(…)`, a fresh object per response, so `old[0]` is a distinct object and
`prevOrigY` really is the old array. (That branch of the falsifier confirms the finding rather than refuting it —
under in-place mutation the defect would be strictly worse.)

**Corollary — dead branch.** `:314-316`'s `else { draw(); }` is unreachable: the watcher is not `immediate`, so
`old` is always the previous tuple and `old[0]` is always the previous `originalPoints` **object** — truthy.
`grep`-checkable: nothing assigns `originalPoints` to a falsy value; the prop is non-optional
(`ConvergencePlot.vue:17`).

---

### L-M2 — `props.domain` feeds every equation in `draw()` and has **no watcher**; the parent supplies it from a different source than the data it must agree with · **MAJOR**

**Half one — the missing watcher.** The component declares five props (`:16-22`). Redraw watchers exist for
exactly two of them: `:308` (`originalPoints`, `coefficients`) and `:319` (`nHarmonics`). `props.domain` — which
determines `omega` (`:104`), `xGrid` (`:114-115`), `oxClosed`'s closing sample (`:128`), and `maxX` (`:176`) —
has **none**, and `props.expression` has none either (it survives only because `tooltipHtml:260` is a `computed`).
`grep -n "props.domain" ConvergencePlot.vue` → `:103, :176` — both inside the imperative `draw()`, which
reactivity never re-triggers.

Consequence: with the transport **paused**, a domain change repaints nothing. The canvas keeps showing the old
projection until some unrelated event (a resize, a hover, a new response) happens to call `draw()`.

**Half two — the source split at the callsite.** `EquationView.vue:309-315` (working tree):

```html
<ConvergencePlot class="flex-1"
    :original-points="result.original_points"   <!-- last SUCCESSFUL response -->
    :coefficients="result.coefficients"         <!-- last SUCCESSFUL response -->
    :n-harmonics="vizHarmonics"
    :domain="[domainStart, domainEnd]"          <!-- LIVE input refs -->
    :expression="expression" />                 <!-- LIVE input ref -->
```

`domain` and `expression` come from the live `ref`s (`EquationView.vue:26-27, 25`); the points and coefficients
come from `result` (`:37`), written only on a successful `doCompute` (`:104`). The plot stays **mounted**
throughout a recompute — `:237` `<template v-else-if="result">` with the in-flight banner at `:239` — so the
divergence window is the full compute latency, and the compute is a **SymPy symbolic integration**
(`api/routers/equations.py:60-84`, three tiers with `symbolic_fourier_coefficients` first), i.e. seconds, not
milliseconds. Autoplay is on from mount (`:324`), so `draw()` is running 60×/s through the whole window.

What is rendered during it:

- `omega = 2π/(domB − domA)` (`:104`) uses the **new** period against **old** coefficients ⇒ every harmonic
  curve and the sum curve are drawn at the **wrong frequency**.
- `oxClosed = [...ox, domB]` (`:128`) appends the **new** `domB` to the **old** abscissae. If the domain
  shrank, `domB < ox[ox.length-1]` and the closing segment runs **backwards** across the plot.
- `minX = ox[0]` (old) vs `maxX = domB` (new) (`:176`). If the new `domB < ox[0]`, `maxX − minX < 0` and
  `toScreen` (`:178-181`) **mirrors the entire plot** horizontally.
- `tooltipHtml` (`:263-264`) asserts `f(x) = ⟨new expression⟩` over a curve computed from the old one.

**Falsifier.** Show `draw()` is re-triggered on a domain change through some other path. The only redraw sites are
`:66` (rAF, which only helps while playing), `:184`-adjacent none, `:246`/`:252` (mouse), `:277`/`:287`/`:295`/`:296`
(transport/legend), `:313` (transition), `:319` (nHarmonics), `:324-325` (mount + ResizeObserver). None observes
`props.domain`. Show instead that the parent cannot change the domain without also changing `result` — refuted by
`EquationView.vue:121, 133` (`@change="onDomainInput($event, v => domainStart = v)"`), which writes the ref
synchronously while `result` waits on the network.

---

### L-M3 — the loop is neither off-screen- nor reduced-motion-gated, and the repo's own gate is deliberate, documented, and eight lines away · **MAJOR** (extends the census's reduced-motion-only booking)

FE `:624` books this file's rAF as "ungated" **with respect to `prefers-reduced-motion`** and FE `:644` carries it
as P3. That booking is correct but **incomplete**: the more expensive omission is the *visibility* gate, which the
census does not name for this file.

`stores/animation.ts:35-53` (comment, verbatim):

> *"…burns CPU/GPU/battery while scrolled off-screen or hidden behind the fullscreen layer. Each mounted
> `BasisCanvas` registers its on-screen status (via IntersectionObserver) through `setCanvasVisible`; the rAF clock
> advances only while at least one canvas is visible AND `playing` is set … Reference-counted because two canvases
> … can mount at once."*

ConvergencePlot has **no `IntersectionObserver`** (`grep -n "IntersectionObserver" ConvergencePlot.vue` → zero;
repo-wide the only consumers are the visualization path) and **no `matchMedia`** (`grep -n "matchMedia" …` → zero;
the `@media (prefers-reduced-motion: reduce)` block at `:405-409` governs the *tooltip* animation only, exactly as
FE `:624` says).

The concrete off-screen case is in the sole callsite. `EquationView.vue:219` puts the plot's panel under
`:class="{ 'panel-inactive': mobileView !== 'canvas' && !isDesktop }"`, and `:436-441`:

```css
@media (max-width: 1023px) { .panel-inactive { display: none; } }
```

Under 1024 px with the Controls tab selected, the plot is `display: none` **and still mounted** — no `v-if`
guards it (`:237` gates on `result`, not on `mobileView`). The loop keeps running: `t.value` is written 60×/s,
`ConvergenceTimeline` re-renders 60×/s (**L-M4**), and `draw()` performs a
`container.getBoundingClientRect()` every frame before bailing at `:85` on the zero rect. Honest concession: the
zero-rect early return **does** spare the expensive half of `draw()` (§7 F-4 records that I expected otherwise) —
but the frame scheduling, the layout read, and the whole reactive render cascade are unspared.

**Falsifier.** Show an `IntersectionObserver`, a `document.visibilityState` check, or a `matchMedia` gate anywhere
in the subtree — `grep -rn "IntersectionObserver\|visibilityState\|matchMedia" ConvergencePlot.vue convergence/ lib/ composables/`
→ **zero matches**. Show `display:none` unmounts the component — it does not; `panel-inactive` is a class, not a
`v-if`.

---

### L-M4 — the frame clock is a Vue `ref`, so every rAF tick forces a full render of `ConvergenceTimeline` + four reka-ui slider components; the file's *other* clock proves the author knew the correct pattern · **MAJOR**

`ConvergencePlot.vue:28` `const t = ref(0)`, written on `:65` **every frame**. Consumers:

- `:34` `easedT` computed → `:141` `cursors`, `:300` `activeCount` (an `O(N)` loop over `harmonicProgress`,
  recomputed per frame).
- `:367` `:t="t"` → `ConvergenceTimeline.vue:38-44` `tArr` computed → the `v-model` on reka's `Slider`.

Because `ConvergenceTimeline`'s render function reads `tArr` (which depends on `props.t`), **the child's render
effect is invalidated every frame**. Each frame therefore re-renders `ConvergenceTimeline` and, through it,
`SliderRoot` → `SliderHorizontal` → `SliderImpl` → `SliderTrack` → `SliderRange` → `SliderThumb`
(`slider-DQ95MET2.js` render tree), plus a `v-for` over `modelValue` for the thumbs. The `tArr` getter's
`Math.round(props.t * 100)` limits how often the *emitted value* changes, but not how often the render runs.

**The same file gets this right elsewhere.** `transition` (`:44`) is a deliberate **non-reactive POJO**
(`useCurveTransition.ts:28-30` returns an object literal, never `ref`/`reactive`), mutated by its own rAF at
`:46` and read imperatively by `draw()` at `:109`. Zero reactive churn at frame rate. The transition clock and
the playback clock live in the same component and take opposite positions on the same question.

Note the contrast the census draws for Path A (FE `:552-556`): *"the epicycle loop is not draw-on-rAF — the
store's rAF only mutates `anim.t`, and Vue's reactivity schedules `drawFrame()`. Redraws therefore coalesce on
Vue's scheduler."* Path B has the inverse arrangement — the draw is imperative (good) **and** the clock is
reactive (bad), so it pays the VDOM cost without buying the coalescing.

**Falsifier.** Show `ConvergenceTimeline`'s render does not depend on `props.t` — it does, transitively via
`tArr` at `:39` inside the `v-model` binding at `:70`. Show Vue skips the render because the rendered output is
unchanged — Vue 3 has no such render-level memo; the effect runs and re-diffs. **UNPROVEN-NEEDS-LIVE (SS-13)**
only for the *magnitude* (a devtools flamechart would quantify the per-frame render cost); the *existence* of the
per-frame render is closed statically.

---

### L-M5 — `draw()` reassigns the canvas bitmap and reads layout on every frame; `clearRect` is consequently dead · **MAJOR**

`ConvergencePlot.vue:84-101`, inside the per-frame path:

```ts
const rect = container.getBoundingClientRect();        // :84  ← forced layout read
…
canvas.width  = Math.round(rect.width  * dpr);         // :88  ← bitmap realloc + full context reset
canvas.height = Math.round(rect.height * dpr);         // :89
canvas.style.width  = `${rect.width}px`;               // :90  ← layout-invalidating write
canvas.style.height = `${rect.height}px`;              // :91
…
ctx.clearRect(0, 0, w, h);                             // :101
```

Two defects, one shape:

1. **Read-write-read layout thrash.** `:84` reads geometry; `:90-91` write geometry-affecting inline styles. The
   write invalidates layout, so the next frame's `:84` forces a synchronous recalculation. One forced layout per
   animation frame, forever, plus one per `ResizeObserver` callback (`:325`) — and writing layout-affecting styles
   *from inside* a `ResizeObserver` callback is the canonical `"ResizeObserver loop completed with undelivered
   notifications"` trigger. (The loop itself is **UNPROVEN-NEEDS-LIVE (SS-13)** — whether the canvas's explicit px
   size can feed back into the `flex-1 w-full min-height:200px` container depends on live layout — but the
   ordering violation is static.)
2. **`ctx.clearRect(:101)` is dead code.** Per the HTML canvas specification, setting `width`/`height` runs the
   *set bitmap dimensions* steps — reset the rendering context to its defaults and clear the bitmap to transparent
   black — with no equality shortcut. That is precisely why `:94-96` must re-apply `setTransform`/`lineCap`/
   `lineJoin` every frame: the code *depends on* the reset having happened. Given the reset, the `clearRect` two
   lines later clears an already-transparent bitmap. Note the internal inconsistency this exposes: `:101` sits
   **after** the `if (!ox.length) return` at `:100`, i.e. it was written as if it were the load-bearing clear —
   yet the early-return path is the one case where a clear would matter.

The correct shape is the one the file's own `ResizeObserver` already implies: size the canvas in the resize
handler, draw in the draw path.

**Falsifier.** Show that assigning an unchanged `canvas.width` is specified or universally implemented as a no-op
— then `:101` becomes load-bearing and `:94-96`'s per-frame state re-application becomes the redundancy instead.
Either way one of the two is dead; the finding survives its own falsifier with its severity intact. Show the
layout thrash is absent — refuted by the literal read at `:84` and writes at `:90-91` in the same function body,
plus the two additional `getBoundingClientRect()` calls per render in the template (`:350`, `:351`) and one per
mousemove (`:243`).

---

### L-M6 — three of the five booked bare-root `@mkbabb/value.js` imports are in this read set, and value.js 4.0.0 has **no root export at all** · **MAJOR** (confirms FE `:480` / CENSUS `:38`; adds the cure)

Sites in this read set (`ConvergencePlot.vue:5`, `lib/harmonics.ts:5`, `composables/useCurveTransition.ts:8`), all
`import { easeInOutSine } from "@mkbabb/value.js"`. The other two booked sites are `lib/easings.ts:9, 11-16`
(`timingFunctions` plus five `easeInOut*`), read to confirm the count.

Installed: `web/node_modules/@mkbabb/value.js/package.json` → **0.13.0**, `exports` = `{ ".": { … } }` — a root
entry exists, so the imports resolve today.

Target: `/Users/mkbabb/Programming/value.js/package.json` → **4.0.0**, `exports` = **seven subpaths only**
(`./color`, `./value`, `./css`, `./easing`, `./math`, `./transform`, `./quantize`) — **no `"."` key**. Under Node
ESM / Vite resolution a bare-root specifier against a package whose exports map lacks `"."` is a hard resolution
failure (`ERR_PACKAGE_PATH_NOT_EXPORTED`), not a runtime `undefined`. `easeInOutSine` itself is alive and
unchanged (`value.js src/easing.ts:22`) — only the specifier dies.

**The cure is `@mkbabb/value.js/easing`** on all five sites. This makes L-M6 the cheapest leg of the tri-package
deadlock (FE §9 #5 — *"this is the cheapest leg … and is the value.js-side interest"*) fully specified: five
one-line specifier edits, three of them inside this component's subtree, no symbol renames.

**Falsifier.** Show a `"."` key, a `main`/`module` fallback that Node honours when `exports` is present (it does
not — `exports` is exhaustive once declared), or a Vite alias overriding resolution — `grep -n "value.js" web/vite.config.ts`
would have to show one; the census records the tree as "contract-v2-clean resolution (no dist aliases)"
(CENSUS §3a).

---

### L-M7 — the "sum" and "original" tooltips render **identical** text whenever `expression` is supplied, and the sum tooltip states a mathematical falsehood · **MAJOR**

`ConvergencePlot.vue:260-270`:

```ts
if (h === "sum")      return renderKatexInline(`f(x) = ${props.expression ?? "\\text{sum}"}`);
if (h === "original") return renderKatexInline(`f(x) = ${props.expression ?? "f(x)"}`);
```

`EquationView.vue:314` always passes `:expression="expression"` (a `ref` seeded to `"x*(pi - x)"` at `:25`, never
undefined). So both branches evaluate to the same string, for every hover, in the shipped configuration. The
component draws two visually distinct curves — a golden partial sum and a grey dashed original — and labels them
identically.

Worse, the label is wrong for the golden curve. That curve is `sumY` (`:148-156`): the DC term plus the first
`N` harmonics with a per-harmonic reveal window — the **N-term partial sum** `S_N(x)`, and during the reveal not
even that (the `BLEND` ramp at `:147, :152` deliberately fades harmonics in). Calling it `f(x)` asserts
convergence the plot exists to *demonstrate is only approximate*. The `?? "\\text{sum}"` fallback shows the author
intended a distinct label; the fallback is simply unreachable at the only callsite.

**Falsifier.** Find a callsite that omits `expression` — `grep -rn "ConvergencePlot" web/src/` → one import and
one mount (`EquationView.vue:17, 309`), and the mount binds it. Show the two branches differ when `expression` is
defined — they are character-identical after substitution.

---

### L-M8 — `renderKatexInline`'s catch arm feeds **unescaped** input into a `v-html` sink · **MAJOR** (error posture)

```ts
function renderKatexInline(latex: string): string {
    try { return katex.renderToString(latex, { throwOnError: false, displayMode: false }); }
    catch { return latex; }                                  // :257 — raw, unescaped
}
```
→ `:353` `v-html="tooltipHtml"`.

The happy path is safe: KaTeX escapes text nodes and, with `trust` at its default `false`, will not emit raw HTML
for `\href`/`\htmlData`. The **catch** path is not. `throwOnError: false` suppresses `ParseError` only;
non-`ParseError` exceptions (internal failures, a non-string argument, `\newcommand` recursion limits) propagate,
and the handler then returns the raw interpolated string — which contains `props.expression`, a user-typed value
(`EquationView.vue:25`, `FunctionInput.vue` free-text input, persisted to `localStorage` via
`saveCachedInputState` at `:161-170` and re-hydrated on load at `EquationView.vue:24`) — straight into `v-html`.

Two honest qualifiers, stated because the falsifier demands them: (1) I cannot exhibit an input that *provably*
drives KaTeX into a non-`ParseError` throw from static reading alone — that arm is **UNPROVEN-NEEDS-LIVE
(SS-13)** and this is why the finding is MAJOR, not BLOCKER; (2) the `localStorage` rehydration means the payload
need not be typed in the same session. The defect that is *fully* proven statically is the **posture**: a `catch`
that converts "the sanitiser failed" into "bypass the sanitiser" is inverted. The correct fallback is a
text-escaped render or an empty string, and it costs one line.

**Falsifier.** Show `v-html` is not reached from this value — `:346-354` binds it directly. Show KaTeX cannot
throw under `throwOnError: false` — it can, for any non-`ParseError`; `throwOnError` is documented as governing
`ParseError` handling specifically.

---

## §3 — MINOR

| id | finding | provenance | falsifier |
|---|---|---|---|
| **L-m1** | **`TrigHarmonic` is declared twice**, byte-identical (`k`/`a_n`/`b_n`/`amplitude`), in two modules the subject imports **simultaneously**. `ConvergencePlot.vue:10` imports the type from `harmonics`, then passes those values into `snapshotForTransition`, typed against the *other* declaration. Structural typing keeps `vue-tsc` silent, so the fork is invisible to the gate — the two can silently diverge. | `lib/harmonics.ts:10-15` · `composables/useCurveTransition.ts:10-15` · consumed together at `ConvergencePlot.vue:10-11, 311` | `diff <(sed -n '10,15p' lib/harmonics.ts) <(sed -n '10,15p' composables/useCurveTransition.ts)` → empty. Neither re-exports the other (`grep -n "export type { TrigHarmonic }\|from \"./harmonics\"" composables/useCurveTransition.ts` → zero) |
| **L-m2** | **`class="flex-1"` at the callsite is silently discarded.** ConvergencePlot's template has **two roots** (`:337` the container div, `:366` `ConvergenceTimeline`). Vue disables attribute fallthrough for fragment roots and warns in dev. The layout survives only because `.convergence-container` re-declares `flex-1` in its own scoped CSS (`:383`) — the parent's intent is coincidentally satisfied, which is why it has gone unnoticed. | `EquationView.vue:310` · `ConvergencePlot.vue:336-376, 382-385` | Give the component a single root or set `inheritAttrs:false` + explicit binding; or observe the dev-console warning. Refuted only by showing a single root node — there are two |
| **L-m3** | **Three ARIA attributes land on a role-less element.** `:aria-valuenow="activeCount"`, `aria-valuemin`, `:aria-valuemax="totalHarmonics"` are set on the glass-ui `<Slider>` root. reka puts `role="slider"` and the real `aria-valuenow` on the **thumb**, not the root; glass-ui forwards **only** `aria-label` (`slider-DQ95MET2.js`: `"aria-label": n.$attrs["aria-label"] ?? void 0` on each `SliderThumb`). So the three value attributes sit on a bare `<span>` — inert — while simultaneously asserting a *false* range: the slider's value is `t∈[0,100]`, not the harmonic count. | `ConvergenceTimeline.vue:75-77` · `slider-DQ95MET2.js` (thumb render) | Show reka assigns `role="slider"` to the root — it does not; `SliderImpl.js` renders a bare `Primitive` span and the role lives on `SliderThumb` |
| **L-m4** | **Vacuous clamp.** `Math.max(2_000, Math.min(12_000, 3_000 + Math.max(0, n-3)*200))` — the inner expression is `≥ 3000` for every `n`, so the outer `max(2_000, …)` can never bind. Dead arithmetic that reads as a real floor. | `ConvergencePlot.vue:37-41` | Exhibit `n` making the inner term `< 2000`: impossible, `Math.max(0, n-3) ≥ 0` |
| **L-m5** | **`animDuration` change mid-flight jumps `t`.** `loopStartTime` is rebased against `animDuration` once, at `:61`; `tick` then divides by the *current* `animDuration` every frame (`:63-64`). Changing `nHarmonics` while playing changes the denominator without rebasing the origin ⇒ a discontinuous jump in `t` (and in the reveal). The store's loop avoids this by capturing `const dur` once per loop (`animation.ts:53`). | `ConvergencePlot.vue:37-41, 61-65` vs `stores/animation.ts:53, 62-67` | Show `animDuration` cannot change while `playing` — `:319`'s watcher explicitly tolerates the playing case (`if (!playing.value) draw()`), and `EquationView.vue:186` writes `nHarmonics` from a live slider |
| **L-m6** | **`clearShimmer(ctx)` at `:232` is a no-op**: it sits between `ctx.save()` (`:222`) and `ctx.restore()` (`:233`), and `restore()` already reverts `shadowColor`, `shadowBlur`, `globalAlpha`, `strokeStyle` and `lineWidth` — every field `clearShimmer` touches (`golden-shimmer.ts:64-68`). | `ConvergencePlot.vue:222, 232-233` · `lib/golden-shimmer.ts:64-68` | Name a field `clearShimmer` sets that `save`/`restore` does not cover — there is none |
| **L-m7** | **Dead ternary + a silenced length mismatch.** `:128` `ox.length ? [...ox, domB] : ox` — `ox.length` is guaranteed truthy by the early return at `:100`. `:129`'s twin (`oyLerped.length ? … : oyLerped`) is *not* dead but papers over the `ox.length ≠ oy.length` case: `:194` iterates `oxClosed.length` and indexes `oyClosed[i]`, so a short `y` yields `undefined` → `NaN` screen coordinates → a silently truncated path rather than a loud failure. | `ConvergencePlot.vue:100, 128-129, 194-198` | For the dead branch: reach `:128` with `ox.length === 0` — `:100` returns first |
| **L-m8** | **Legend rows that cannot highlight.** `:205` `if (cursors[hi] < 3) continue` skips a harmonic entirely — including its `isHov` styling (`:206-207`) and its hit region (`:218`). `ConvergenceLegend` nonetheless lists **every** harmonic (`ConvergenceLegend.vue:30`) and emits `h-${i}` for it (`:33`). Hovering an early-timeline row sets `hoveredCurve` and repaints, and nothing changes on canvas. | `ConvergencePlot.vue:205-219, 295` · `ConvergenceLegend.vue:29-38` | Show the legend filters by cursor state — it receives only `:harmonics="trigHarmonics"` (`ConvergencePlot.vue:358`), never the cursors |
| **L-m9** | **`getContext("2d")!` inside the frame loop, with no context-lost posture.** The non-null assertion (`:93`) is re-evaluated every frame. A null return (context already claimed under a different type; GPU context loss) throws a `TypeError` **inside the rAF callback**, which terminates the loop with no `rafId` reset (compounding **L-B2**), no user-visible state change, and no error surface. The repo has no `webglcontextlost`/`contextlost` handling anywhere in this path. | `ConvergencePlot.vue:93` | Show `getContext("2d")` cannot return null — it can, per spec, when the canvas already has a context of another type; and canvas contexts can be lost |
| **L-m10** | **Per-mousemove reactive write with no consumer, and a doubled layout read in the template.** `:244` writes `mousePos.value` on **every** mousemove regardless of hover state, scheduling a component render each time even when `v-if="hoveredCurve && …"` (`:347`) renders nothing. When the tooltip *is* shown, `:350` and `:351` each call `containerRef.getBoundingClientRect()` — two forced layouts per render, for one rect. | `ConvergencePlot.vue:240-247, 346-354` | Show the write is guarded by `hoveredCurve` — `:244` precedes the hit test at `:245` unconditionally |
| **L-m11** | **`hitTestCurves` costs a `Math.sqrt` per sample and has no early exit.** `sqrt` is computed before the threshold comparison (`hit-test.ts:28-29`); comparing squared distances against `threshold²` is exact and removes it. At the shipped ceiling `cachedScreenCurves` holds ~50 000 points; the `i += 3` stride leaves ~17 000 sqrt+compare per mousemove. There is also no spatial index and no per-curve bounding-box reject. | `lib/hit-test.ts:14-36` · fed by `ConvergencePlot.vue:235` | Show `sqrt` is needed — only `dist < threshold` and `dist < bestDist` are consumed, both order-preserving under squaring for non-negative values |
| **L-m12** | **`groupTrigHarmonics` is `O(n²)`**: two `coefficients.find(…)` scans (`harmonics.ts:34-35`) inside a loop over `coefficients` (`:28`). At `n_harmonics = 100` the payload carries ~201 terms ⇒ ~40 000 comparisons per recompute. A single index pass (`Map<number, FourierTermDTO>`) makes it linear. It is memoised in a `computed`, so this is cost-per-response, not per-frame — hence MINOR. | `lib/harmonics.ts:21-49` | Show the `find`s are hoisted — they are inside the `for…of` body |
| **L-m13** | **`nHarmonics` means something different here than on the wire.** `groupTrigHarmonics` filters `amp > 1e-14` **before** `slice(0, maxK)` (`harmonics.ts:44, 48`), so the prop caps the number of *surviving* harmonics, not the maximum \|n\|. For a square wave (even coefficients ≈ 0), `nHarmonics = 5` yields `k = 1,3,5,7,9`. The backend's `n_harmonics` is the index bound (`api/models/equations.py:20`, consumed as the term-count bound by `symbolic_fourier_coefficients`), and the UI labels the control "Harmonics — terms in the Fourier sum" (`FunctionInput.vue:181-182`). Two denominators wearing one name; the legend (`n={{ h.k }}`) is the only place the difference becomes visible. | `lib/harmonics.ts:21-49` · `api/models/equations.py:20` · `FunctionInput.vue:181-184` | Show the filter runs after the slice — `:44` pushes only surviving entries, `:48` slices the survivor list |

---

## §4 — INFO

- **L-i1 — R5-7, second witness.** See §5.
- **L-i2 — the easing is applied twice.** `easedT = easeInOutSine(t)` (`:34`) is passed as `globalEasedT` into
  `harmonicProgress`, which applies `easeInOutSine` **again** to the local fraction (`harmonics.ts:75`). The
  composition is presumably intentional (per-harmonic ease-in-out inside a globally eased sweep), but nothing says
  so, and the docblock at `harmonics.ts:53-58` documents only the inner one. Recording it because a future
  reader "simplifying" one of the two will change the motion without any test noticing (**L-i3**).
- **L-i3 — Goldilocks: the file is right-sized; `draw()` is not, and the math is unliftable where it sits.**
  410 LOC is unremarkable against the 66-SFC field (X-5). The extraction discipline is genuinely good (§8 S-3).
  The outlier is `draw()` at **157 lines** (`:79-236`) doing eight jobs: canvas sizing, DPR, grid construction,
  transition lerping, series evaluation, bounds derivation, projection, and three stroke passes. The parts that
  are *pure* — `curves`, the `BLEND`ed `sumY` (`:147-156`), `fullSum`, the bounds (`:164-172`) — are exactly the
  parts that carry the numerical risk, exactly the parts that would be testable as functions in
  `lib/harmonics.ts`, and exactly the parts welded to a `CanvasRenderingContext2D`. With **vitest ABSENT**
  (FE §9 #11 — the only frontend gates are `vue-tsc` and 29 Playwright tests), that weld is what makes L-M1's
  identity-lerp and L-B3's frame-invariance survivable in the first place: there is no seam at which either
  could have been observed.
- **L-i4 — `tArr` narrows a producer-declared nullable emit.** `computed<number[]>` (`ConvergenceTimeline.vue:38`)
  is bound with `v-model` to a `Slider` whose declared payload is `(payload: number[] | undefined)`
  (`Slider.vue.d.ts`). The setter's `arr[0] ?? 0` (`:41`) handles a missing element but not a missing array — an
  `undefined` payload throws. I could not exhibit a reka path that emits `undefined` (`SliderRoot.js:106`'s
  `currentModelValue` always yields an array), so this is a **type-soundness** note, not a live crash.
  **UNPROVEN-NEEDS-LIVE (SS-13)** for whether `vue-tsc -b` currently flags it; CI is green at HEAD per FE §7, so
  presumably not.

---

## §5 — the viz render path, and R5-7

### 5.1 — Path B, re-measured: the census says one ungated clock; there are **two**

FE `:558-559` (Path B) reads: *"`ConvergencePlot.vue:93` `getContext("2d")`; own loop at `:67-69`
`requestAnimationFrame(tick)`; redraw watchers at `:308` and `:319`. **Not** gated by `stores/animation.ts` — a
second, ungated clock."* CENSUS `:87` folds the same as *"ConvergencePlot with its own ungated rAF"* (singular).

Every coordinate in that row is exact. The count is not. `grep -rn "requestAnimationFrame" web/src/` returns
**20 sites**, of which **four** are in the ConvergencePlot subtree:

| clock | sites | gated by |
|---|---|---|
| **B1 · playback** | `ConvergencePlot.vue:67, 69` | `playing` only — no visibility, no reduced-motion (**L-M3**), no re-entrancy guard (**L-B2**) |
| **B2 · transition** | `composables/useCurveTransition.ts:48, 51` | self-terminating at `progress ≥ 1`; **no visibility, no reduced-motion**; runs *concurrently* with B1 |

B2 is a genuinely independent clock: `startTransition` (`useCurveTransition.ts:36-54`) schedules its own rAF and
calls `draw` as `onFrame` (`ConvergencePlot.vue:313`). While a transition overlaps playback — the normal case,
since a new response arrives while autoplay is running — **`draw()` executes twice per frame**, doubling every
cost in **L-B3** and **L-M5** for the 500 ms window.

**Census amendment (extension, not contradiction):** Path B is *two* ungated rAF clocks, not one; the repo total
is 4 animation clocks (`stores/animation.ts` ×1 gated + B1 + B2 ungated), plus 16 one-shot/scroll-correction rAF
sites outside the animation class. FE §6's per-canvas model is right in kind and low by one in this cell.

### 5.2 — the second Canvas2D thing the census already booked

FE `:432`/`:642` and CENSUS §3a name the `BasisCanvas` ↔ glass-ui `FourierField` study as *"the highest-value,
highest-risk convergence target"* and note that fourier renders 1 311 LOC of Canvas2D against a GPU-backed
producer component. ConvergencePlot is not in that comparison — it is not a basis renderer — but **L-B3** is the
same argument in a second cell: 200 000 trig evaluations per frame on the CPU main thread is the workload the
GPU-backed path exists to absorb. If the study proceeds, this component's `curves` matrix is the second-best
evidence for it, and the *cheap* fix (memoise the frame-invariant matrices) must be measured first — otherwise
the study will attribute to Canvas2D a cost that is actually attributable to recomputation.

### 5.3 — R5-7 · the native-template-loop invisibility class: **this subtree is a clean second witness**

Intake `lane-fourier-r3-r6.md` **R5-7** (ADOPT-AS-FACT + CARRY→F.W4): *"template-loop evidence keyed to
**component** callsites is blind to native HTML element loops"* — evidenced by `PaperSidebar.vue`'s three native
`<li v-for>` loops producing an empty `instance.loop.paper-sidebar` leaf, while the sibling
`instance.loop.presets` leaf is populated and keyed by a **component** callsite
(`callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0`). **R6-5** cured it with a
`NATIVE_TEMPLATE_LOOP` family (`nativeTemplateLoops: 16`).

**The class applies here, exactly, and the subtree makes the defect legible in a way `PaperSidebar` does not.**

`grep -rn "v-for" ConvergencePlot.vue convergence/ lib/ composables/` returns **exactly one match**:

```
convergence/ConvergenceLegend.vue:30:            v-for="(h, i) in harmonics" :key="h.k"
```

It is on a **native `<div>`** (`ConvergenceLegend.vue:29`). So under the R5-deriver the entire ConvergencePlot
subtree registers **zero** loop evidence — and the loop it misses is not decorative: it is the legend, whose row
count is data-driven up to **100** rows (`FunctionInput.vue:184` `:max="100"`; each row is 2 spans plus a
`spectrumColor` call at `:36`). An instance denominator built on component callsites drops all of it.

**What makes this witness sharper than `PaperSidebar`.** Within the *same rendered strip*, two loops sit inches
apart and differ **only** in the tag kind of the looped node:

| loop | node | R5 deriver |
|---|---|---|
| `ConvergenceLegend.vue:30` `v-for="(h,i) in harmonics"` | native `<div>` | **invisible** |
| glass-ui `Slider` internal `v-for` over `modelValue` (`slider-DQ95MET2.js`) rendering `SliderThumb` | **component** | **visible** (registers a callsite) |

Same screen, same frame, same data-driven cardinality; one is counted and one is not, for a reason that has
nothing to do with either loop's significance. That is R5-7 stated as a controlled experiment, and it is why
**R6-5's `NATIVE_TEMPLATE_LOOP` family is load-bearing for F.W4's per-component denominator**: without it,
ConvergencePlot's per-component D/L/C audit records "0 loops" for a subtree whose most cardinality-sensitive
surface is a loop.

**A carry F.W4 should take, beyond R6-5's cure.** R6-5 counts native loops. It does not record **loop-source
cardinality provenance**. `ConvergenceLegend`'s row count is bounded by a *live UI control* (1..100) whose ceiling
lives in a third file (`FunctionInput.vue:184`) and whose true bound lives in a fourth (`api/models/equations.py:20`,
`le=200`). A denominator that counts the loop but not its bound will size this component as if it renders a
handful of rows. **L-B3**'s severity is precisely a cardinality argument; the same ceiling drives both. Book:
*native-loop counting must carry the loop's bound, not merely its existence.*

---

## §6 — reconciliation with the hitherto corpus

| corpus row | this challenge |
|---|---|
| **FE `:131`** — "ConvergencePlot.vue \| **410** \| Canvas2D partial-sum convergence plot with own rAF loop" | **AGREE, exact.** `wc -l` → 410. |
| **FE `:558-559`** — Path B: `:93` getContext, loop `:67-69`, watchers `:308`/`:319`, ungated | **AGREE on every coordinate; EXTEND the count** — Path B is **two** rAF clocks (B1 `:67,69` + B2 `useCurveTransition.ts:48,51`), which overlap for 500 ms after every response and double `draw()`. §5.1. |
| **CENSUS `:87`** — "three independent canvases (… ConvergencePlot with its own ungated rAF …)" | **AGREE on the canvas count; EXTEND the clock count** as above. |
| **FE `:619`, `:624`, `:644`** — the `:405` `reduce` block is CSS-only; the rAF is ungated; carry P3 | **CONFIRM and EXTEND.** The reduced-motion gap is exactly as booked (`:405-409` governs the tooltip only). The **off-screen** gap is not booked for this file and is the costlier one — `EquationView.vue:436-441` `display:none` on mobile leaves both clocks live. **L-M3.** |
| **FE `:480`** + **CENSUS `:38`** — 5 value.js import sites, easing-only, bare-root, latent-not-live at 0.13.0 | **CONFIRM, exact.** 3 of the 5 are in this read set (`ConvergencePlot.vue:5`, `harmonics.ts:5`, `useCurveTransition.ts:8`). **ADD the mechanism and the cure**: value.js 4.0.0's exports map has **no `"."` key** at all (7 subpaths), so this is a hard resolution failure, and the fix is `@mkbabb/value.js/easing`. **L-M6.** |
| **FE `:432`, `:642`** / CENSUS §3a — the `BasisCanvas`↔`FourierField` study is highest-value/highest-risk | **AGREE; do not extend the study to this file, but note the adjacent measurement.** ConvergencePlot is not a basis renderer. Its 200 k trig calls/frame (**L-B3**) belong to the same cost class, and the recomputation must be removed *before* the study measures Canvas2D, or the study will misattribute. §5.2. |
| **FE §9 #11** — vitest ABSENT; gates are `vue-tsc` + 29 Playwright tests | **CONFIRM** (`ls web/vitest.config.*` → none; `grep -n vitest web/package.json` → none). Load-bearing for **L-i3**: L-M1's identity-lerp is exactly the class of defect a 6-line unit test on `snapshotForTransition` would have caught, and there is no seam for one. |
| **X-5** — 66 SFC / 65 TS | **AGREE**; the subtree contributes 3 SFC + 4 TS. |
| **Intake R5-7 / R6-5** — native-loop invisibility, cured by `NATIVE_TEMPLATE_LOOP` | **DIRECTLY CORROBORATED — second independent witness.** The subtree's only `v-for` is on a native `<div>` (`ConvergenceLegend.vue:30`), so the whole subtree derives `[]`. Sharper than the intake's `PaperSidebar` example because a **component** loop (glass-ui's thumb `v-for`) sits in the same strip and *is* visible — the two differ only by tag kind. **New carry for F.W4: count the loop's bound, not just the loop.** §5.3. |
| **Intake X-2** (9 route records) · **X-3** (45/30/13 API ops) | Not touched by this file. `/equation` is one of the 7 lazy component routes; `/api/equations/compute` + `/simplify` are 2 of the 30 public non-admin operations. No contradiction. |

**No corpus row is contradicted.** Two are extended (clock count; the off-screen dimension of the rAF gap), one is
confirmed with an added mechanism (the value.js root export), and one is corroborated with a second witness plus
a new carry (R5-7).

---

## §7 — hypotheses the tree FALSIFIED

I opened five lines of attack that the source refuted. Recording them because a challenge that only reports its
wins is not evidence.

**F-1 · "the harmonic basis has a phase-origin error for domains not starting at 0." — FALSE.**
I expected `cos(k·ω·x)` (`ConvergencePlot.vue:144, 161`) to need `cos(k·ω·(x − domA))`, since the standard
expansion on `[a,b]` is usually written about `a`. The backend settles it: `api/routers/equations.py:100-103`
reconstructs as `y_recon += t.coefficient * np.exp(1j * t.n * 2*np.pi/period * x_eval)` — **no domain offset**,
phase origin at `x = 0`, `period = domain[1] − domain[0]` (`:53`). The frontend's `omega = (2*Math.PI)/(domB − domA)`
(`:104`) and un-shifted `x` match the producer exactly. The frontend is right and my prior was wrong.

**F-2 · "the appended closing sample duplicates the last point or fabricates a wrap." — FALSE, and it is the
best thing in the file.** See §8 S-1.

**F-3 · "`Math.min(...oy, ...fullSum)` (`:164`) will `RangeError` on a large payload." — FALSE.**
The spread's argument count is bounded: `EquationView.vue:108` hard-codes `n_eval_points: 500` and the API caps it
at 5 000 (`api/models/equations.py:21`, `le=5000`), so the worst case is ~5 500 arguments — an order of magnitude
under any engine's argument limit. Same conclusion for `useCurveTransition.ts:78`'s `[...origY, ...fullSum]`
(≤ 10 000). **However**: the safety rests entirely on a hard-coded literal in a *different file* that the
component neither receives nor validates. If `n_eval_points` ever becomes user-controlled at its own API ceiling,
`:164` and `useCurveTransition.ts:78` are where it lands. Recorded as a latent coupling, not a defect.

**F-4 · "`draw()` runs its full body while the mobile panel is `display:none`." — FALSE.**
`:84-85` reads the container rect and returns on a zero dimension, which is exactly what `display:none` yields.
The expensive body is correctly skipped. **L-M3** survives on the residue — the frame scheduling, the per-frame
layout read, the per-frame reactive cascade (**L-M4**) — but the draw itself is guarded, and my initial claim was
too strong.

**F-5 · "`niceStep` can hang the tab on a degenerate range." — FALSE (by accident, and worth recording).**
`grid.ts:13-20` on `range = 0`: `raw = 0` → `Math.log10(0) = −Infinity` → `Math.pow(10, −Infinity) = 0` → `mag = 0`
→ `norm = 0/0 = NaN` → all three comparisons false → returns `10 * 0 = **0**`, a zero step. The loop at
`grid.ts:43` would then never advance. It does not hang **only because its initialiser is also NaN**:
`Math.ceil(minX/0) * 0` = `Math.ceil(±Infinity) * 0` = `NaN`, and `NaN <= maxX` is false, so the loop body never
executes. A degenerate domain is reachable — `FunctionInput.vue:44-60` accepts any finite number for both bounds
with **no `start < end` validation**, and `EquationView.vue:314` forwards the refs directly (see **L-M2**) — so
this path *is* entered; it is saved by NaN propagation rather than by design. INFO-grade fragility: any future
guard that makes the loop initialiser finite while leaving `xStep = 0` turns this into an infinite loop.

---

## §8 — superlatives (L-18 both ways)

### S-1 · the two-grid endpoint convention — correct, load-bearing, and documented against the exact producer line

`ConvergencePlot.vue:111-115` and `:123-129` maintain **two deliberately different x-grids**:

```ts
// X-grid for the partial-sum curve (endpoint=false matches backend convention:
// the canonical equispaced Fourier sampling drops x = domB since the periodic wrap
// identifies it with x = domA — see api/routers/equations.py:61).
for (let i = 0; i < nPts; i++) xGrid.push(domA + (i / nPts) * (domB - domA));
…
// Closed grid for the ORIGINAL curve only (endpoint=true) — visual closure over [a, b].
const oxClosed = ox.length ? [...ox, domB] : ox;
const oyClosed = oyLerped.length ? [...oyLerped, oyLerped[0]] : oyLerped;
```

I tried to break this three ways and failed each time. The cited producer line is real and says exactly what the
comment says it says — `api/routers/equations.py:60`:
`x_eval = np.linspace(domain[0], domain[1], req.n_eval_points, endpoint=False)`. Under `endpoint=False`,
`ox[0] === domA` exactly and `ox` stops one sample short of `domB`; appending `domB` with `y = oy[0]` is therefore
the **unique correct** closure (the periodic wrap identifies `f(b)` with `f(a)`), it duplicates nothing, and it
fabricates nothing. Applying the same closure to the partial-sum grid would have been the naive symmetry and
would have been **wrong** — the sum curve must keep the numerical convention. The file resists that symmetry
deliberately and says why, in prose, with a file:line citation and a paper-section reference
(`§ch:interpreting`, `f(x) = Σ cₙ e^(πinx/L)`).

This is the best-documented numerical decision in the read set, and against a 66-SFC field in a repo with **no
unit tests**, a comment that cites the producer line number is doing the work a test would otherwise do. It also
falsified my F-2 in one read. **Keep verbatim; use as the house pattern for cross-repo numerical conventions.**

### S-2 · the transition clock is a non-reactive POJO — the correct pattern, in the same file as its opposite

`createTransitionState()` (`useCurveTransition.ts:28-30`) returns a plain object — never `ref`, never `reactive`
— mutated by rAF at `:46` and read imperatively by `draw()` at `ConvergencePlot.vue:109`. Frame-rate mutation
with **zero** reactive invalidation, zero VDOM work, zero scheduler pressure. This is exactly right, and it is
rare: the reflex is to reach for `ref` and then fight the churn.

The superlative is also the sharpest available criticism, which is why it is worth stating as praise first: the
component contains **two frame clocks** and takes **opposite** positions on the same question. `t` is a `ref`
written 60×/s (**L-M4**), forcing a full render of `ConvergenceTimeline` and four reka-ui components every frame;
`transition.progress` is a bare number written 60×/s and costs nothing. The right answer is already in the file,
in a module the file imports. L-M4 is not an oversight the author could not have seen — it is an inconsistency
with their own better instinct, which makes it cheap to fix and hard to excuse.

### S-3 · the extraction discipline — four real modules lifted, no barrel ceremony, children with clean contracts

For a 410-LOC canvas component this is above the lane's median by a clear margin:

- `lib/grid.ts` (75) — `niceStep` + `drawPlotGrid`, pure, `ctx`-in, nothing else; genuinely reusable.
- `lib/hit-test.ts` (36) — one function, one exported interface, no canvas dependency at all (it takes screen
  points); the *only* file in the read set that is trivially unit-testable as written.
- `lib/harmonics.ts` (88) — the ±n → trig regrouping with the algebra spelled out in the docblock (`:17-19`),
  the animation window math, and the spectrum palette.
- `composables/useCurveTransition.ts` (87) — a state factory + a cancellable rAF driver returning its own
  canceller (`:53`), which the consumer actually stores and calls on both re-entry (`:312`) and unmount (`:331`).

No `index.ts` barrel, no re-export pyramid, no premature `use*` wrapper around a pure function — the pure math
lives in `lib/`, the stateful driver lives in `composables/`, and the split is drawn on the right line. The two
children are prop-in/event-out with **zero shared mutable state** (`ConvergenceLegend` takes 2 props / emits 2;
`ConvergenceTimeline` takes 4 / emits 4), and `ConvergenceTimeline.vue:2-17` carries a 16-line provenance
docblock explaining the P.W5 migration off a 166-LOC shadow recipe onto the producer `Slider` — including an
explicit note on why `dockKeepOpen` is a no-op at this site. That is the "retire the shadow, record why"
behaviour the lane asks for (FE §9 #6), executed and documented.

The honest limit: the extraction stopped one file short. The *math* that carries the numerical risk —
`curves`, `sumY`'s `BLEND` ramp, `fullSum`, the bounds — stayed inline in `draw()` (**L-i3**), which is why
**L-M1** and **L-B3** could live undetected in a file that otherwise reads as carefully built.

---

## §9 — disposition

**Blockers, in fix order** (L-B1 first — it is the ignition for L-B2's trace):

1. **L-B1** — close the scrub latch with the event class that opens it (`pointerup`+`pointercancel` on `window`,
   the pattern glass-ui's own `useDockHold` uses in the same bundle), or delete `scrubbing` and derive
   pause-during-scrub from `@update:model-value`. **Relay to the glass-ui BH inbox** per standing law: the
   producer's `standard` variant documents the fill edge as *the* affordance while reka emits `valueCommit` only
   on change, so **every** consumer that pairs `@pointerdown` with `@value-commit` inherits this. This is a
   producer-contract gap, not only a consumer bug.
2. **L-B2** — port the store's two guards verbatim: `if (rafId !== null) return;` at the head of `startLoop`, and
   `rafId = null` before `tick`'s early return. Eight characters and one line, from `stores/animation.ts:50, 60`.
3. **L-B3** — hoist `curves` and `fullSum` out of the frame path (memoise on `[coefficients, nHarmonics, domain,
   transition.progress]`); reuse the point buffers rather than reallocating `harmPts`/`origPts`/`sumPts` per
   frame. Measure **before** any `FourierField` convergence study (§5.2).

**Then** L-M1 (pass the *old* harmonics — the watcher already has `old[1]`), L-M2 (watch `props.domain`; and at
the callsite, source `domain` from `result` rather than the live refs), L-M3 (`IntersectionObserver` +
`matchMedia`, the store's shape), L-M6 (five specifier edits — the cheapest leg of the tri-package deadlock).

**Do not touch** S-1's two-grid convention or S-2's non-reactive transition state. Fix L-M4 *toward* S-2, not away
from it.

**Carries for F.W4** — (i) native-loop counting must carry the loop's **bound**, not merely its existence (§5.3);
(ii) Path B is **two** ungated clocks, not one (§5.1); (iii) the off-screen dimension of the rAF gap for this
file, alongside the already-booked reduced-motion dimension (**L-M3**).

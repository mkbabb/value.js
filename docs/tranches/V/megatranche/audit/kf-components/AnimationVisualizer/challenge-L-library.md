claude-opus-5[1m]

# CHALLENGE · `AnimationVisualizer.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/playback/AnimationVisualizer.vue` (256 L)
**Mode** static, read-only. No installs, no dev server, no browser tooling (per lane law). Every claim below is derived from the tree; nothing is marked livable-only except where explicitly tagged `UNPROVEN-NEEDS-LIVE`.
**Substrate** keyframes.js `master`; the demo tree as-installed (`node_modules/@mkbabb/glass-ui` 7.0.0, `node_modules/@mkbabb/value.js` 4.0.0).
**Date** 2026-08-04.

**Posture**: the component was assumed DEFECTIVE until the tree proved otherwise. It is a *good* component — six genuine superlatives below — carrying two shipping-behaviour blockers, six majors, five minors and three infos. Every claim carries its falsifier; a false defect is worse than a missed one, so three candidate findings were **killed by the tree** and are recorded in §5 so the next reader does not re-raise them.

**Hitherto corpus folded**: `formation/keyframes/lane-frontend.md` (F-1 phantom glass-ui dep; S-1..S-8 shadow census; §7.2 colocation idiom; §6.3 token namespace), `formation/keyframes/lane-library.md` (§2 build modes / two-entry LIGHT-HEAVY split, §3.3 the `load-engine.ts` value.js firewall, §6 physics roster). Overlaps are cited by id. **No lane finding is contradicted**; three findings below are *new surface* the two lanes did not reach (they censused the tree, not this component's semantics).

---

## 0. Headline

| id | severity | claim | anchor |
|---|---|---|---|
| **B-1** | **BLOCKER** | `dragStart` can fire twice with no intervening `dragEnd` (re-grab mid-coast) → the consumer's `wasPlayingBeforeScrub` latch is overwritten → **playback never resumes after the scrub**. | `:172-191`, `:195-227` |
| **B-2** | **BLOCKER** | The ball has **no wake seam and no initial paint**: a paused scrub of its own twin `<Slider>`, or a restored playhead at mount, leaves it stale. The `aria-hidden` redundancy argument (`:2-6`) is falsified by its own sync guard. | `:237-250` |
| M-1 | MAJOR | The "exponentially-smoothed" velocity estimator is a **raw passthrough** across the entire fling-decision band — `SmoothProgress`'s default `snapThreshold` (1e-3) is ~50× the component's own `FLING_THRESHOLD` (2e-5). The docblock's contract is false. | `:130-136`, `:164` |
| M-2 | MAJOR | Velocity is never invalidated by a sample gap: press → flick → **hold still 1 s** → release flings at the pre-hold speed. | `:151-161` |
| M-3 | MAJOR | Every fling above threshold is retargeted to a rail **boundary** regardless of magnitude — the engine ships `decay()` for exactly this case and the demo's sibling harness already migrated onto it. | `:172-191` |
| M-4 | MAJOR | `touch-gate-target` / `touch-gate-active` are **phantom classes** — 4 usages across the demo, **0 rules** in the demo cascade or in installed glass-ui 7.0.0. The mobile gate has no affordance. (The F-1 phantom-dep bite, at this component.) | `:21`, `:23` |
| M-5 | MAJOR | `import { bumpLayoutEpoch } from "@src/animation/resolve/browser"` breaches the demo's **own written law** (`demo/kf-engine.ts:4-8`) and reaches a symbol that is **absent from both published bundles** — the dogfood claim is void at this seam. | `:45` |
| M-6 | MAJOR | The app-global C1 epoch-eviction wire is hosted by a **conditionally-mounted decorative twin** that never reads the epoch; `PlaybackRibbon.vue:73`'s `v-if="animation"` deletes the wire wholesale in `source` mode. | `:70-79` |
| m-1 | MINOR | Contradictory null posture: dead `!anim` guard at `:113`, unguarded `anim.options.duration` at `:243`, non-optional prop type at `:56`. | `:112-120`, `:241-250` |
| m-2 | MINOR | Two different width oracles (`clientWidth` vs `getBoundingClientRect().width`) + a hard-coded `48` duplicating the `w-12` class. | `:86-110` |
| m-3 | MINOR | Unmount mid-coast swallows the pending `dragEnd` (B-1's second trigger). | `:252-255` |
| m-4 | MINOR | 6 concerns in one SFC; the 70-line DOM-free inertia block is an un-extracted composable in a tree with 71 colocated `use*.ts`. | `:122-191` |
| m-5 | MINOR | The `:70-78` comment misattributes the layoutEpoch/C1 cache to value.js four times. value.js contains **zero** occurrences of `layoutEpoch`. | `:70-78` |
| I-1 | INFO | `KeyframesAnimation<any>` defeats the generic. | `:56` |
| I-2 | INFO | `useTemplateRef<HTMLElement>('ball')` — lone single-quote, and the only ref whose variable name (`ballEl`) differs from its template key (`ball`). | `:66-68` |
| I-3 | INFO | Permanent `will-change-transform` on an element idle most of the session. | `:21` |

**Superlatives (L-18 runs both ways): 6** — §4.

**Counts** — defects **16**, blockers **2**, superlatives **6**.

---

## 1. BLOCKERS

### B-1 · The emit contract is non-reentrant — a re-grab mid-coast strands playback paused · **BLOCKER**

**Provenance.**

`AnimationVisualizer.vue:195-213` (`onStart`) emits `dragStart` unconditionally and stops any in-flight coast:

```ts
onStart: (e) => {
    …
    velocityEstimator.reset(0);
    lastMoveTime = performance.now();
    coastPlayback.stop();          // :206  — kills the pending settle frame
    emit("dragStart");             // :208
```

`:185-190` — `dragEnd` is emitted **only** from inside the coast's per-frame callback, on the settling frame:

```ts
coastPlayback.drive(coastSpring, () => {
    …
    if (coastSpring.settled) emit("dragEnd");
});
```

`RAFPlayback.stop()` (`src/animation/physics/playback.ts:234-249`) bumps `_gen`, cancels the rAF and `_cleanup()`s — it does **not** run a final step. So `:206` destroys the only path that could emit the pending `dragEnd`.

The consumer latch, `demo/components/instrument/transport/AnimationControlsGroup/useAnimationGroupPlayback.ts:115-131`:

```ts
const onScrubStart = () => {
    wasPlayingBeforeScrub = isPlaying.value;   // :119 — overwritten, not counted
    if (wasPlayingBeforeScrub) syncPlayState(false);
};
const onScrubEnd = () => {
    if (wasPlayingBeforeScrub) { syncPlayState(true); wasPlayingBeforeScrub = false; }
};
```

Wiring: `AnimationVisualizer @drag-start` → `PlaybackRibbon.vue:78` `emit('scrubStart')` → `ChannelOptions.vue:386-390` → `ChannelControls.vue:112` → `AnimationControlsGroup.vue:35` `onScrubStart`.

**Failure scenario (concrete).** Animation playing. User grabs the ball → `dragStart` #1 → `wasPlayingBeforeScrub = true`, group pauses. User flicks and releases → `startCoast()` arms the coast; **no `dragEnd` yet**. Within the coast (a ~0.45 s `response` spring, `:145`) the user grabs the ball again — the single most natural gesture on a fling control. `onStart` fires: `coastPlayback.stop()` (`:206`) discards the pending `dragEnd`, then `dragStart` #2 (`:208`) re-runs `:119` with `isPlaying.value === false` (we paused it at grab #1) → `wasPlayingBeforeScrub = false`. Release #2 → coast settles → the single `dragEnd` reaches `onScrubEnd`, which now believes nothing was playing. **The animation stays paused forever.**

**Falsifier.** Show any of: (a) `RAFPlayback.stop()` running the tickable's final step before cleanup (it does not — `playback.ts:234-249` cancels then `_cleanup`s); (b) `useAnimationGroupPlayback` ref-counting rather than latching `wasPlayingBeforeScrub` (`:119` is a plain assignment); (c) a guard in `AnimationVisualizer` suppressing `dragStart` while `coastPlayback.running` (grep `coastPlayback.running` → one site, `:243`, in the sync loop only). Any one of those kills this finding.

**Note on blame.** The parent latch is not reentrant either, but `AnimationVisualizer` is the **only** emitter in the tree that can produce two `dragStart`s without an intervening `dragEnd`: `PlaybackRibbon`'s slider seam (`PlaybackRibbon.vue:148-151`) emits both from `useDragCapture`'s strictly-paired `onStart`/`onEnd`. The asymmetry is authored here.

### B-2 · No wake seam, no initial paint — the "same scrub value" twin goes stale · **BLOCKER**

**Provenance.** The component's own header (`:2-6`) grounds its entire a11y disposition on redundancy:

> "this big ball is a decorative VISUAL twin of the real reka `<Slider>` in PlaybackRibbon (**same scrub value, same range**) … so it is hidden from the accessibility tree".

The sync loop (`:237-250`):

```ts
// Always poll — the animation's effectiveT changes during playback, slider scrub,
// and visualizer drag.                                                    // :237-239
useRafLoop(() => {
    if (!isDragging.value && !coastPlayback.running && anim.options.duration > 0) { … }
}, { guard: computed(() => props.isPlaying || isDragging.value) });        // :250
```

The comment says *always*; the guard says `isPlaying || isDragging`. A **paused** scrub is neither.

The tree names this exact hazard and cures it — **for the sibling only**. `demo/components/instrument/transport/channel-controls/composables/useAnimationSync.ts:87-91`:

> "`wake` is exported so SCRUB entry points can re-arm the loop: scrubbing a SETTLED (non-playing) animation mutates `effectiveT` via `setChildTime()` **without touching `isPlaying`**, so without this the idled loop would never observe the scrub and the slider binding (`currentT`) would go stale."

`PlaybackRibbon.vue:126-128` even declares a wake-only `scrubbed` event — "fires on EVERY scrub (pointer, keyboard, or visualizer) so a settled sync loop re-arms even on a keyboard-arrow nudge" — and routes it **upward** (`ChannelOptions.vue:391` `@scrubbed="wake"`). It is never routed **downward**: `AnimationVisualizer` exposes no wake prop, no `defineExpose`, no watcher on `props.animation`.

`isAnimPlaying` is not a proxy for scrub activity: `useAnimationSync` returns the *passed-in* play ref unchanged (`:92` `return { currentT, isPlaying, isStarted, isReversed, wake }`), and `ChannelOptions.vue:498-504` feeds it `props.isPlaying` from the group.

**Failure scenario A (paused scrub).** Animation paused. User drags the reka `<Slider>` (or presses `→`). `sliderUpdate` → `setChildTime(...).render()` (`useAnimationGroupPlayback.ts:138`) advances `effectiveT`; `wake()` re-arms `useAnimationSync` so the *thumb* tracks. `props.isPlaying` stays false, `isDragging` stays false → the visualizer's `useRafLoop` guard is false → `setBallProgress` never runs → **the ball sits at its old position while its twin thumb moves**. It jumps only on the next play.

**Failure scenario B (mount).** `setBallProgress` is reachable from exactly two places — `applyProgress` (`:116`) and the guarded loop (`:248`). There is no `onMounted` paint and no watcher. So on mount the ball has **no `transform` at all** (translateX 0), while `PlaybackRibbon`'s `<Slider>` binds `:model-value="[currentT]"` immediately. The machine persists a scrubbed playhead across reload by design (`useAnimationGroupPlayback.ts:139-146`, "SCRUB records `t` … closes the group-scene scrub-persistence gap") — so a restored non-zero `t` paints thumb-right / ball-left until the user presses play.

**Falsifier.** Show a path that (a) sets `props.isPlaying` true during a paused scrub — `ChannelOptions.vue:381` binds it from `useAnimationSync`'s pass-through ref, so no; or (b) repaints the ball outside the guarded loop — grep `setBallProgress` → `:94` (def), `:116`, `:248` only; or (c) an `onMounted`/`watch` initial paint in this file — there is none.

**Consequence for the a11y disposition.** The `aria-hidden="true"` at `:7` is *correct as a technique* (nothing focusable inside — no `tabindex`, no native control; §4 S-1), but its *justification* is redundancy with the `<Slider>`. When the two disagree, a sighted mouse-free user gets a visibly wrong ball with no AT path to the truth. Fixing B-2 restores the premise; the technique needs no change.

---

## 2. MAJORS

### M-1 · The velocity smoother is a raw passthrough over the whole decision band · **MAJOR**

**Provenance.** `:130-136`:

```ts
/**
 * Exponentially-smoothed drag velocity, in progress units per ms.
 * SmoothProgress IS the `v = v*α + instantV*(1-α)` recurrence — fed the
 * raw per-sample velocity, its `.current` is the filtered estimate. No
 * clamp (velocity is signed, unbounded), no settle snap during sampling.
 */
const velocityEstimator = new SmoothProgress({ damping: 0.4, clamp: false });
```

"**no settle snap during sampling**" is false. `src/animation/physics/smooth.ts:134-140` runs the snap **unconditionally**, independent of `clamp`:

```ts
if (Math.abs(this.targetValue - this.currentValue) < this.options.snapThreshold) {
    this.currentValue = this.targetValue;
    this.isSettled = true;
}
```

`snapThreshold` defaults to **0.001** (`smooth.ts:38`) and is not overridden here. `clamp:false` suppresses only the `[0,1]` clamps at `:88-90` and `:142-144`.

**Failure scenario (arithmetic, no browser needed).** After `velocityEstimator.reset(0)` (`:204`) both `current` and `target` are 0. First sample: `setTarget(v)` → `target = v`, `settled = false`; `tickDt(dt)` with `dt ≈ 16.7 ms` and `damping 0.4` gives `factor = 1 − e^(−0.4) ≈ 0.33`, so `current = 0.33·v`; the snap test is `|v − 0.33v| = 0.67|v| < 0.001` → true for **|v| < ≈0.0015 progress/ms**, and `current` is set to `v` **exactly** — the raw last sample.

Scale check against this file's own constants: `FLING_THRESHOLD = 0.00002` (`:164`); a full-rail sweep in 200 ms is `1/200 = 0.005` progress/ms; a deliberate slow drag is ~1e-4. So the *entire* tap-vs-fling decision band `[2e-5, 1.5e-3]` is passed through **unfiltered on the very first sample**, and above it the estimator converges in 1–3 samples and then snap-locks to each raw sample. The filter the docblock advertises does not exist at this scale.

**Consequence.** The tap-vs-fling verdict at `:174` is taken on a single un-smoothed pointer delta — the noisiest possible statistic, and precisely what an EMA is for. Combined with M-3, one jittery final sample sends the playhead to a rail end.

**Falsifier.** Show `snapThreshold` gated on `clamp` (it is not — `smooth.ts:134` is unconditional); or show typical release velocities ≫ 1e-3 progress/ms sustained over ≥3 samples (a 200 ms full-rail fling is 5e-3, only 3.3× the threshold, and dies into the band as the finger decelerates); or show `SmoothProgressOptions.snapThreshold` overridden anywhere in this file (grep → absent).

**Fix shape** (not prescriptive): `new SmoothProgress({ damping: 0.4, clamp: false, snapThreshold: 0 })` restores the advertised contract in one option, and makes the docblock true.

### M-2 · Stale velocity survives an arbitrary pause — a hold-then-release flings · **MAJOR**

**Provenance.** `:151-161`:

```ts
const trackVelocity = (progress: number) => {
    const now = performance.now();
    const dt = now - lastMoveTime;
    if (dt > 0 && dt < 200) {                 // :155 — gap REJECTED, state NOT invalidated
        velocityEstimator.setTarget((progress - lastProgress) / dt);
        velocityEstimator.tickDt(dt);
    }
    lastProgress = progress;
    lastMoveTime = now;
};
```

The `dt < 200` window correctly refuses to *compute* a velocity across a long gap, but nothing **zeroes** the estimator when the gap is observed. `onEnd` (`:219-226`) reads `velocityEstimator.current` (`:173`) with no freshness test — no comparison of `performance.now() - lastMoveTime` against any staleness bound.

**Failure scenario.** Press the ball, flick it quickly (estimator now holds ≈5e-3 progress/ms), then **hold the finger still for 1 s** — `pointermove` does not fire for a stationary pointer, so no sample invalidates the estimate — then lift. `startCoast()` reads the 1-second-old 5e-3, passes `:174`, and the playhead flies to a rail boundary. The user's release gesture was a deliberate *placement*; the result is a fling.

**Falsifier.** Show a `pointermove` stream that fires while the pointer is stationary (coalesced-move delivery is movement-driven; a truly static pointer emits none — `UNPROVEN-NEEDS-LIVE` for exotic digitizers, but the code has no staleness test either way, which is the claim); or show `onEnd`/`startCoast` consulting `lastMoveTime` (grep `lastMoveTime` → `:128`, `:153`, `:157`(w), `:160`, `:205` — never read in the release path).

### M-3 · Fling magnitude is discarded — spring-to-boundary where the engine ships `decay()` · **MAJOR**

**Provenance.** `:172-191`:

```ts
const velocity = velocityEstimator.current;
if (Math.abs(velocity) < FLING_THRESHOLD) { emit("dragEnd"); return; }
coastSpring.reset(lastProgress, velocity * 1000);
coastSpring.target = velocity > 0 ? 1 : 0;      // :183 — ALWAYS a rail end
```

The spring's *target* is binary; only the **arrival curve** varies with velocity. A 2.1e-5 progress/ms nudge (barely over `FLING_THRESHOLD`) and a 1e-2 whip both terminate at the same boundary. With `dampingFraction: 1` (`:146`, critically damped) there is no overshoot to bleed off — the spring will *reach* the boundary from any seed.

The engine ships the correct primitive on the **LIGHT** barrel. `src/animation/physics/decay.ts:1-19`:

> "Frictional decay (inertial glide) — the one-line closed-form sibling of the spring solver, **for the fling/flick case where there is no target to settle to, only an initial velocity bleeding off under friction** … the glide asymptotes to a finite resting point `x0 + v0/k` (the projected endpoint a release would coast to)."

`decay`/`decayRest` are exported from `src/animation/index.ts:136-137` — the same value.js-free barrel this file already imports `SmoothProgress`/`SpringProgress`/`RAFPlayback` from (`:48-50`). No new dependency, no heavy edge.

**The demo already established this idiom, and this component diverges from it.** `demo/scenes/cube/orbital-drag/composables/useOrbitalInertia.ts:7-9` records the migration explicitly — "the engine's SHIPPED analytic `decay()` closed form — it no longer hand-rolls the `Math.pow(inertiaFactor, dt/TARGET_DT)` discrete Euler decay the engine now owns" — with an isomorphism argument at `inertiaDecay.ts:19-31` and the sampler seeded at `useOrbitalInertia.ts:71`. Two fling harnesses, two different models, one of them documented as canonical.

**Failure scenario.** User nudges the ball 5 px to the right to fine-position the playhead near 40 %. The release velocity clears `FLING_THRESHOLD` (which M-1 measured on an unfiltered sample). `:183` sets `target = 1`. The playhead coasts to **100 %** and `emit("scrub", duration)` walks the animation to its end. Precision positioning is impossible for any release the threshold admits.

**Falsifier.** Show the boundary-snap is an intended magnetic/paging affordance (nothing in the file, `PlaybackRibbon.vue`, or the two lane censuses says so — `:166-171`'s docblock describes it as carrying "the momentum **there**", i.e. asserts it as physics, not policy); or show `decay` unavailable to the demo's static graph (`index.ts:136`, LIGHT barrel — it is available); or show `decayRest`'s projected endpoint clamped to the rail would produce the same landing for both magnitudes (it cannot — `x0 + v0/k` is linear in `v0`).

### M-4 · `touch-gate-target` / `touch-gate-active` are phantom classes · **MAJOR** *(the F-1 bite)*

**Provenance.** Applied at `:21` (`touch-gate-target`, always) and `:23` (`touch-gate-active`, bound to `gate.isActive.value`). Exhaustive probe over the demo tree **and** the installed glass-ui:

```
$ grep -rn "touch-gate" demo/ node_modules/@mkbabb/glass-ui/ | grep -v "useTouchGate\|useDockTouchGate\|touchGate"
demo/components/playback/PlaybackRibbon.vue:7    'touch-gate-target timeline-green',
demo/components/playback/PlaybackRibbon.vue:8    gate.isActive.value ? 'touch-gate-active' : '',
demo/components/playback/AnimationVisualizer.vue:21  … touch-gate-target',
demo/components/playback/AnimationVisualizer.vue:23  gate.isActive.value ? 'touch-gate-active' : '',
$ grep -rln "gate" node_modules/@mkbabb/glass-ui/dist/styles/     → (no output)
```

**4 call sites, 0 rule definitions.** Neither name is a Tailwind utility pattern, and `AnimationVisualizer.vue` carries no `<style>` block at all (the file ends at `:256` with `</script>`). The glass-ui composable that drives the flag ships types and behaviour only — `node_modules/@mkbabb/glass-ui/dist/composables/dom/useTouchGate.d.ts` declares `isActive: Ref<boolean>` with no accompanying stylesheet, and no `/styles` entry defines a companion class.

**Failure scenario.** On a touch device the gate's contract is *tap-to-activate*: the first tap arms the control, the second drags it (`PlaybackRibbon.vue:158-166` documents the same contract). `isActive` flips true, Vue writes `class="… touch-gate-active"`, **the computed style is unchanged**. The user receives zero feedback that the control is now armed; the only observable difference is `touchAction` flipping to `none` (`:11`), which is invisible. On a control whose entire mobile ergonomics rest on "you must tap first", the missing affordance is the feature.

**Relation to lane-frontend F-1.** F-1 established that glass-ui is installed-but-undeclared (absent from `package.json` **and** `package-lock.json`). This is the consumer-side symptom class F-1 predicts: a component consumes an unpinned, unlockable design-system contract *by class-name convention*, and the convention is unhonoured by the artifact on disk. Whether the classes exist in some other glass-ui version is unknowable **because there is no pin** — that is F-1's whole point. This lane does not contradict F-1; it supplies its first concrete bite.

**Falsifier.** Produce a rule for either selector reachable from `demo/styles/style.css`'s import chain (`style.css:1-16` → tailwindcss, tw-animate-css, `@mkbabb/glass-ui/styles`, `/styles/fonts`, `./design-idioms.css`, `./layout.css` — all four local sheets and the two glass entries were grepped); or show a Tailwind `@utility`/safelist generating them (grep for `touch-gate` in the demo returned only the 4 usages).

### M-5 · Deep `@src` import breaches the demo's own written boundary law and reaches an unpublished symbol · **MAJOR**

**Provenance.** `:45`:

```ts
import { bumpLayoutEpoch } from "@src/animation/resolve/browser";
```

The demo's law is written down, in the demo, as a doctrinal header — `demo/kf-engine.ts:4-11`:

> "THE DEMO'S HEAVY-ENGINE ACCESSOR (L.W8 S1 — the ED-3 dogfood inversion). **The demo consumes the PUBLISHED kf barrel (`@mkbabb/keyframes.js`), not the deep `@src/animation/*` source paths.** The LIGHT surface … is statically imported from the barrel; the HEAVY surface … **is value.js-bearing and is reached ONLY through** the barrel's `loadAnimationEngine()` dynamic accessor — the one place value.js enters the graph."

and `:22-25`: "This is the dogfood: the demo boots on the same `loadAnimationEngine()` chunk a `npm i` consumer reaches."

`:45` violates three clauses at once, and the same file at `:47-50` imports the *other* four kf symbols correctly from `@mkbabb/keyframes.js` — two specifiers for one library, in one component.

**The symbol is not published.** Hard evidence, not inference:

```
$ grep -c "bumpLayoutEpoch" dist/keyframes.js dist/engine/index.js
dist/keyframes.js:0
dist/engine/index.js:0
$ grep -rn "browser\|convertToPixels" src/animation/public.ts src/animation/index.ts src/animation/engine/index.ts
   → (no output)
```

`package.json`'s exports map has exactly two entries (`.` → `dist/keyframes.js`, `./engine` → `dist/engine/index.js`; lane-library §1) and `src/animation/resolve/index.ts` does not re-export `./browser`. **An `npm i` consumer cannot perform this wire at all.** The dogfood claim is therefore void at precisely the seam that most needs it — the C1 container-resize cure a real consumer would want to replicate.

**The target module is value.js-bearing and side-effectful.** `src/animation/resolve/browser.ts:1-4`:

```ts
import { isLayoutTrackingUnit } from "@mkbabb/value.js/value";
import type { CssValue } from "@mkbabb/value.js/value";
import { parseCssScalar } from "@mkbabb/value.js/css";
import { serializeCssValue } from "../compile/emit/css-text";
```

`compile/emit/css-text.ts:1-9` in turn pulls `@mkbabb/value.js/css` (`serializeCssColor`) — the in-degree-12 module lane-library §4.4 names as the serializer hub. And `browser.ts:22-24` runs a **top-level side effect** at import time:

```ts
if (typeof window !== "undefined") {
    window.addEventListener("resize", bumpLayoutEpoch, { passive: true });
}
```

so mounting a playback ribbon silently installs a never-removed global resize listener (module-scoped, so one listener, not a per-instance leak — but an unowned global the component neither declares nor tears down).

**Failure scenario.** Any consumer following the demo as reference implementation writes `import { bumpLayoutEpoch } from "@mkbabb/keyframes.js"` → module has no such export → build error, with no documented alternative because the epoch surface is unpublished.

**Bundle-weight risk (stated as risk, with its falsifier).** `AnimationVisualizer` is statically imported by `PlaybackRibbon.vue:96`, which is statically imported by `EasingScene.vue:11`, `SpringScene.vue:21`, `ChannelOptions.vue:428`. The static edge at `:45` therefore places `resolve/browser.ts` + `compile/emit/css-text.ts` + two value.js subpaths in the module graph of those chunks. **Falsifier:** `package.json:18` declares `"sideEffects": false`, so rolldown may tree-shake `convertToPixels`/`convertPixelsToCh` (and with them the value.js edges) down to the epoch counter alone — the `window.addEventListener` at `browser.ts:22-24` pins the *module* but not its unused exports. A `KF_ANALYZE=1 vite build --mode gh-pages` dump of `dist/gh-pages/_chunks.json` (absent from the tree today) settles it. **The encapsulation half of this finding stands regardless of that outcome; the weight half is explicitly unproven.**

**Not unique to this component** (honesty clause): `demo/components/instrument/keyframes/CSSCodeEditor.vue:40` and `.../composables/useKeyframesState.ts:1` reach the same module for `convertPixelsToCh`. Three sites, one law, zero enforcement — `scripts/gates/` holds only `surface/` and `visual/`, so no gate reds on it. Neither lane census reached this; it is new surface, not a contradiction.

### M-6 · A global cache-eviction policy hosted by a conditionally-mounted decorative twin · **MAJOR**

**Provenance.** `:79`, under a 9-line rationale (`:70-78`):

```ts
useResizeObserver(containerEl, () => bumpLayoutEpoch());
```

`bumpLayoutEpoch` (`src/animation/resolve/browser.ts:17-20`) resets the **app-global** `browserScalarCache` — a `WeakMap<CssValue, WeakMap<HTMLElement, Map<string, {epoch, result}>>>` (`:7-13`) read by the engine's interpolation hot path (`compile/interp-slot.ts:280`).

Three structural problems:

1. **This component reads the epoch for nothing.** Nothing here is engine-animated. The ball is positioned by a direct JS write (`:98` `ball.style.transform = …`); the dashed twin's `calc(100cqw - 100%)` (`:35`) is a **static Tailwind class**, resolved by the browser's own container-query engine, never by `convertToPixels`. Grep `getLayoutEpoch` in `demo/` → zero. The wire is pure altruism for *other* components' animations.
2. **It is the only wire, and it is conditional.** `grep -rn "bumpLayoutEpoch" demo/` → one site, this one. `PlaybackRibbon.vue:72-73` mounts the visualizer under `v-if="animation"` — the ribbon's documented `source` mode ("a progress-scalar `source` … no visualizer twin", `PlaybackRibbon.vue:100-103`). **In `source` mode the app loses container-resize cache eviction entirely.** So does every route that mounts no ribbon.
3. **The proxy is arbitrary.** The observed box is *this component's* `container-inline-size` div (`:13`). A dock toggle or split-pane drag that resizes some other animated container while leaving the ribbon's width unchanged bumps nothing; the C1 staleness `:70-78` exists to cure survives.

**Failure scenario.** A `cqw`-valued animation on a panel that re-lays-out without a viewport resize, in a scene whose ribbon is in `source` mode (or on a route with no ribbon): the epoch never advances, `interp-slot.ts:280` serves the cached pre-resize endpoint — exactly the bug `:70-78` was written to close, unclosed, with the cure's own test (`test/demo/instrument/resize-tracks.test.ts`) still green because it asserts only that *this* component carries *a* wire (`:132-140` is a `fs.readFileSync` + two regexes over the SFC source).

**Falsifier.** Show a second `bumpLayoutEpoch` wire (grep → none); show `AnimationVisualizer` mounts unconditionally (`PlaybackRibbon.vue:73` `v-if="animation"`); show the epoch consumed inside this component (grep `getLayoutEpoch` in `demo/` → none); or show the ribbon's container is provably the app's only container-resize source (nothing asserts that, and `layout.css`'s `--work-*` dock/rail geometry contradicts it).

---

## 3. MINORS AND INFOS

**m-1 · Contradictory null posture.** `:56` types the prop non-optional (`animation: KeyframesAnimation<any>`), so `:113`'s `if (!anim || …)` is **dead** under the declared type — while `:243` dereferences `anim.options.duration` with **no** guard. Exactly one of the two is right. *Failure scenario:* if a parent ever passes a nullish animation (`PlaybackRibbon.vue:104` types it `animation?:` and gates the mount with `v-if`, so it is currently impossible), `:243` throws inside a shared rAF loop — `useDemoTicker`'s module-level `playback.loop` iterates **all** subscribers (`useDemoTicker.ts:18-23`), so one throw kills every demo ticker on the page. *Falsifier:* a code path passing `undefined` through `PlaybackRibbon.vue:73`'s `v-if`, or a `strictNullChecks`-off tsconfig (`tsconfig.json` is strict per the migration record).

**m-2 · Two width oracles + a magic 48.** `getMaxX` (`:86-91`) uses `container.clientWidth − ball.clientWidth` (CSS-pixel **integers**, borders excluded); `progressFromPointerX` (`:101-110`) uses `trackEl.getBoundingClientRect().width` (**fractional**, transform-inclusive) minus `ballEl.value?.clientWidth ?? 48`. *Failure scenario:* at a fractional device-pixel-ratio layout the two `maxX` values differ by up to 1 px, so the pointer→progress map and the progress→pixel paint disagree and the ball lags the finger by a sub-pixel constant that accumulates into a visible offset at the rail ends. The `?? 48` additionally hard-codes the `w-12` class from `:21` (3 rem at a 16 px root); a root-font-size change or a class edit silently desyncs the fallback. *Falsifier:* show `clientWidth` and `getBoundingClientRect().width` provably equal for these two nested `w-full` boxes at every DPR (they are not — one is rounded, the other is not).

**m-3 · Unmount mid-coast swallows `dragEnd`.** `:252-255` stops the coast on scope dispose; `RAFPlayback.stop()` runs no final step, so the pending `dragEnd` is lost. Same corruption class as B-1, second trigger: a scene switch during a fling leaves `wasPlayingBeforeScrub` latched true with no `onScrubEnd` to consume it. *Falsifier:* show the consumer resetting the latch on scene change (`useAnimationGroupPlayback.ts:115-131` does not), or `stop()` emitting a terminal frame (`playback.ts:234-249` does not). Note the teardown itself is **correct and well-reasoned** (§4 S-3) — the gap is the unemitted event, not the stop.

**m-4 · Goldilocks / colocation.** One SFC carries six concerns: layout-epoch wiring (`:70-79`), touch gating (`:81`, `:229-235`), geometry (`:83-110`), velocity estimation + fling coast (`:122-191`), drag capture (`:193-227`), playback sync (`:237-250`) — plus 3 module-level mutable `let`s and 3 physics instances at module scope. The `:122-191` inertia block is **DOM-free and self-contained** (a velocity estimator, a threshold, a spring, a playback, two emits) — a textbook `useFlingCoast()` sitting in a tree with **71** colocated `use*.ts` (lane-frontend §7.2), including `transport/composables/` two directories away, which already houses the two composables this file imports (`:51-52`). Extracting it would also make M-1/M-2/M-3 unit-testable without a DOM — today the only test touching this component (`test/demo/instrument/resize-tracks.test.ts:132-140`) is a **source-text regex**, and `grep -rln "SmoothProgress\|SpringProgress" test/demo/` returns one unrelated file. *Falsifier:* show a repo idiom preferring in-SFC physics (the tree says the opposite — `useOrbitalInertia.ts`, `useDragScrub.ts`, `inertiaDecay.ts` are all extracted).

**m-5 · The comment misattributes the cache to value.js, four times.** `:70-78` says "value.js's C1 endpoint cache", "value.js caches the resolved px keyed by a monotonic layoutEpoch", "the genuine signal **value.js exports**", "the eviction policy stays ONCE in value.js — DRY". The tree: `layoutEpoch`, `browserScalarCache`, `bumpLayoutEpoch`/`getLayoutEpoch` and the `window.resize` listener **all** live in keyframes.js (`src/animation/resolve/browser.ts:6-24`); value.js is consulted only for `isLayoutTrackingUnit`/`parseCssScalar`/`serializeCssColor`. Probe: `grep -rln "layoutEpoch\|LayoutEpoch" node_modules/@mkbabb/value.js/` → **no output**. The same misattribution is copied into `test/demo/instrument/resize-tracks.test.ts:5,13` — which then imports the symbols from `../../../src/animation/resolve/browser`, contradicting its own prose one line later. *Falsifier:* any `@mkbabb/value.js` subpath exporting a layout epoch (7 subpaths checked, zero hits).

**I-1 · `KeyframesAnimation<any>`** (`:56`) — the generic is discarded, so `anim.effectiveT`/`anim.options.duration` are unchecked against the real target type. Repo-wide idiom (`PlaybackRibbon.vue:104`, `ChannelOptions.vue`, `useAnimationSync.ts:30`), so this is a tree-level observation logged at this site, not an accusation against the component. *Falsifier:* a concrete target type that would type-check here (the ribbon is target-agnostic by design, so `unknown` — not `any` — may be the honest ceiling).

**I-2 · `useTemplateRef<HTMLElement>('ball')`** (`:66`) — the file's lone single-quoted string, and the only ref whose variable (`ballEl`) diverges from its template key (`ball`), while `:67-68` keep `trackEl`/`containerEl` aligned and double-quoted. Grep-by-name for the ball's ref site fails on the obvious query. *Falsifier:* a lint rule permitting mixed quotes (the surrounding file is uniformly double-quoted).

**I-3 · Permanent `will-change-transform`** (`:21`) — held for the component's whole life, not just while transforming. Defensible (the ball transforms every frame during playback, and toggling `will-change` per gesture is its own known anti-pattern), so this is logged as a compositor-memory observation, not a defect. *Falsifier:* a measured compositor-layer budget showing this ribbon over it — `UNPROVEN-NEEDS-LIVE`, for the SS-13 visual audit.

---

## 4. SUPERLATIVES · L-18 runs both ways

**S-1 · The `aria-hidden` disposition is exemplary and technically airtight** (`:2-7`). It names the redundancy, names the surviving AT affordance (the reka `<Slider>` in the parent), names the spec disposition, and — critically — the hidden subtree contains **nothing focusable**: no `tabindex`, no native control, pointer handlers only (`:25-27`). The common failure of this pattern (focusable content inside `aria-hidden`, an AT dead zone) is avoided. *Falsifier (runs both ways):* a `tabindex` or native control inside `:7`'s subtree, or a keyboard path that lands on the ball — neither exists. **Note B-2 attacks the premise (redundancy), not the technique; when B-2 is fixed the technique needs no change.**

**S-2 · The two-driver interlock is exactly right** (`:243`). `if (!isDragging.value && !coastPlayback.running && …)` means the sync loop *yields* the ball to whichever driver currently owns it — drag, coast, or playback — so `style.transform` has exactly one writer at every instant. The `isPlaying`-true-during-coast case (where both loops are live) is the one that would otherwise fight, and it is handled. This is the correct shape; only the guard's *arming* condition (B-2) is wrong.

**S-3 · The teardown is precise and correctly scoped** (`:252-255`). The docblock distinguishes the two playbacks by ownership — `useRafLoop` self-cleans via `useDemoTicker`'s `onScopeDispose` (`useDemoTicker.ts:45-48`), `coastPlayback` is a second **raw** driver with no owner — and names the exact consequence of omitting the stop ("unmounting mid-fling would otherwise leave it running until the spring settles (a bounded micro-leak)"), including its bound. Most teardown comments assert; this one reasons, and the reasoning is correct.

**S-4 · The dogfood is real, and the `drive` contract is consumed correctly** (`:122-125`, `:185-190`). Replacing two hand-rolled physics loops with `SmoothProgress` + `SpringProgress` + `RAFPlayback` is the inv-ζ seam the demo exists for (lane-frontend S-8). More than that, the consumption is *idiomatic*: `drive` is called without a paired manual stop because its contract auto-stops on `settled` (`playback.ts:208-219`) and is idempotent under re-arm (`:209` `if (this._rafId !== null) return`) — the component relies on both, correctly, and `:206`'s explicit `stop()` before a new gesture is the one place a manual stop **is** required. The `_gen` restart guard (`playback.ts:113-123`) makes the stop-then-restart at `:206`→`:185` safe by construction. Reading the engine's contract this closely is the behaviour this demo is for.

**S-5 · The clock frame is single-authority and un-duplicated** (`:118`, `:245-247`). The component emits `effectiveT` (`progress * duration`) and reads `effectiveT` back for the ball, so both directions live in one frame; the reversed→raw conversion is left **entirely** to `PlaybackRibbon.vue:183-185` (`animation.reversed ? duration - effectiveT : effectiveT`). A twin that re-derived the reversal locally is the classic drift bug, and it is conspicuously absent — the ribbon owns the transform, the twin owns the geometry.

**S-6 · The `touchAction` computation is more careful than the primitive it sits beside** (`:11`). `gate.isActive.value || !gate.isTouchDevice ? 'none' : 'pan-y'` preserves page scroll on touch until the gate arms, rather than statically claiming the gesture. `PlaybackRibbon.vue:158-166` records that glass-ui's own `Slider` "does NOT provide [tap-to-activate] — it sets `touch-action:none`, hijacking scroll". The demo's bespoke twin has the better mobile posture than the design-system primitive it mirrors. (Type-checked: `useTouchGate.d.ts` declares `isTouchDevice: boolean` — a plain boolean, so the un-`.value`'d read at `:11` is correct, while the sibling `isActive: Ref<boolean>` correctly carries `.value`. Both reads are right, which in a template is easy to get wrong.) **M-4 removes this affordance's *visual* half; the *behavioural* half authored here is correct.**

---

## 5. KILLED CANDIDATES — do not re-raise

Recorded so the next reader does not spend the budget twice. A false defect is worse than a missed one.

| candidate | why it died |
|---|---|
| "`gate.isTouchDevice` is a `Ref`, so `!gate.isTouchDevice` is always false" (`:11`) | **Killed.** `node_modules/@mkbabb/glass-ui/dist/composables/dom/useTouchGate.d.ts` declares `isTouchDevice: boolean` (plain) and `isActive: Ref<boolean>`. Both template reads at `:11`/`:23` are correct. Promoted to superlative S-6. |
| "`--visualizer-track-gutter` is undefined → invalid `calc()` → the rail loses its width" (`:15`) | **Killed.** Defined at `demo/styles/layout.css:23` — `--visualizer-track-gutter: 3rem;` with a comment naming this exact call site. The `left-6` (1.5 rem) inset is its correct half. |
| "The ball is draggable while the animation is un-started" | **Killed.** `PlaybackRibbon.vue:74` applies `is-disabled` to the visualizer root when `!isAnimStarted`, and `demo/styles/style.css:249-252` defines `.is-disabled { opacity: .5; pointer-events: none; }`. The gate is real. |
| "The dashed twin's `calc(100cqw − 100%)` desyncs from `getMaxX`" (`:35` vs `:86-91`) | **Killed.** `100cqw` = the `container-inline-size` box's width (`:13`); `100%` on an `aspect-square h-full` child = its own 48 px width. That is exactly `container.clientWidth − ball.clientWidth`. The two agree by construction — which is the *point* of the resize wire (M-6 attacks its hosting, not its arithmetic). |

---

## 6. Provenance & law compliance

Files read (all read-only, no writes outside this document): `demo/components/playback/AnimationVisualizer.vue`, `demo/components/playback/PlaybackRibbon.vue`, `demo/components/instrument/transport/composables/{useRafLoop,useDragCapture,useDemoTicker}.ts`, `demo/components/instrument/transport/channel-controls/composables/useAnimationSync.ts`, `demo/components/instrument/transport/AnimationControlsGroup/useAnimationGroupPlayback.ts`, `demo/components/instrument/transport/channel-controls/ChannelOptions.vue` (excerpts), `demo/kf-engine.ts`, `demo/styles/{style,layout}.css` (excerpts), `src/animation/physics/{smooth,playback,decay}.ts`, `src/animation/physics/spring/progress.ts`, `src/animation/resolve/{browser.ts,index.ts}`, `src/animation/compile/emit/css-text.ts` (head), `src/animation/{index,public}.ts` (export scans), `vite.config.ts`, `package.json`, `test/demo/instrument/resize-tracks.test.ts`, `node_modules/@mkbabb/glass-ui/dist/composables/dom/useTouchGate.d.ts`, `node_modules/@mkbabb/value.js/dist/subpaths/math.d.ts`. Plus `grep`/`ls`/`sed` probes quoted inline.

No file in `/Users/mkbabb/Programming/keyframes.js` (or any other repo) was written, mutated, or executed. No installs, no dev server, no browser tooling. The sole write is this document.

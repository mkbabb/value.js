claude-opus-5[1m]

# CHALLENGE · `AnimationVisualizer.vue` · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/playback/AnimationVisualizer.vue` (256 L)
**Substrate** keyframes.js `master` HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group`
**Mode** static, read-only. No installs, no dev server, no browser tooling. Every claim below is source-derived; the two claims that would want a live browser to *confirm* are marked **UNPROVEN-NEEDS-LIVE** and carry their static chain in full.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Each claim carries its own falsifier; a claim whose falsifier I could not close is downgraded, not shipped.
**Hitherto corpus folded** `formation/keyframes/lane-frontend.md` (F-1, F-5, S-1…S-8, §3.1 subpath census, §8 build wiring) and `formation/keyframes/lane-library.md` (§1 exports map, §3.3 the LIGHT/HEAVY firewall, §4.1 A8, §4.6 the R1 blast radius). Where this file **contradicts** or **extends** those lanes it says so explicitly.

**Tally — 17 defects (1 BLOCKER · 7 MAJOR · 7 MINOR · 2 INFO) · 6 superlatives.**

---

## 0. What this component consumes

| edge | specifier | tier | line |
|---|---|---|---|
| keyframes.js — types | `import type { KeyframesAnimation }` | root barrel (LIGHT) | `:47` |
| keyframes.js — physics | `SmoothProgress` | root barrel (LIGHT) | `:48` |
| keyframes.js — physics | `SpringProgress` | root barrel (LIGHT) | `:49` |
| keyframes.js — physics | `RAFPlayback` | root barrel (LIGHT) | `:50` |
| **keyframes.js — INTERNAL** | **`bumpLayoutEpoch` from `@src/animation/resolve/browser`** | **outside the exports map; HEAVY** | **`:45`** |
| value.js | `clamp` from `@mkbabb/value.js/math` | declared dep, parser-free leaf | `:46` |
| glass-ui | `useTouchGate` from the root barrel | phantom dep (lane F-1) | `:53` |
| vueuse | `useResizeObserver` | declared | `:44` |
| demo-local | `useRafLoop`, `useDragCapture` | colocated | `:51–52` |

The published surface is two entries and no wildcard (`keyframes.js/package.json`: `"."` → `dist/keyframes.js`, `"./engine"` → `dist/engine/index.js`; lane-library §1). **Five of the six library edges are clean; the sixth is the whole story of this axis.**

---

## 1 · BLOCKER

### C-1 — mouse pointers are routed through the **touch-only** gate; the first desktop-Chromium press on the ball is swallowed, and re-swallowed after every 3 s of idleness — the exact bug the sibling file 100 lines away documents and cures

**Severity BLOCKER.** `AnimationVisualizer.vue:230–235`

```ts
const gatedPointerDown = (e: PointerEvent) => {
    const ball = ballEl.value;
    if (!ball) return;
    if (!gate.handleTouchStart(ball, e.clientY)) return;   // ← no pointerType branch
    onPointerDown(e);
};
```

No `e.pointerType` test. Every pointer — mouse, pen, touch — must clear the gate before the drag seam arms.

The installed glass-ui 7.0.0 implementation (`node_modules/@mkbabb/glass-ui/dist/useTouchGate-B4mzQcHJ.js`, symbols `l` = factory, `S` = `handleTouchStart`):

```js
let o = r(!1),                                    // isActive
    l = typeof window < "u" && "ontouchstart" in window;   // isTouchDevice
function S(e, t) {
    return l ? (u = e, o.value ? (v(), !0)        // already active → pass
                              : (_(), f = !0, d = t, h.start(150), !1))  // ← FALSE
             : !0;                                 // non-touch device → always pass
}
```

and the type confirms it is a **plain boolean captured once**, not a reactive probe of the *current* pointer: `dist/composables/dom/useTouchGate.d.ts:4` — `isTouchDevice: boolean`.

The demo's own audited measurement of `"ontouchstart" in window` is recorded in the sibling, `PlaybackRibbon.vue:158–162`:

> *"its first-tap-activates contract returns `false` on the first press whenever `"ontouchstart" in window` — **which is TRUE in Chromium (desktop + Playwright) even for a MOUSE**. Routing a mouse/pen press through it therefore SWALLOWED the shared drag seam's arming (`acquireSelectSuppression` → `body.is-dragging` never set)… (proof:drag-gesture clause (a) RED on this one surface)."*

`PlaybackRibbon.vue:167–178` cures it with a three-word guard:

```ts
const gatedSliderDown = (e: PointerEvent) => {
    if (e.pointerType === "touch") { … gate … }
    onScrubPointerDown(e);
};
```

`AnimationVisualizer` never received the fix. The failure chain, each link source-verified:

1. `:233` calls `gate.handleTouchStart(ball, e.clientY)` for **all** pointer types.
2. glass-ui returns `false` when `isTouchDevice && !isActive`.
3. `isTouchDevice = "ontouchstart" in window`.
4. That is TRUE in desktop Chromium (the demo's own recorded probe, `PlaybackRibbon.vue:160`).
5. → `onPointerDown(e)` is never reached → `useDragCapture` never calls `setPointerCapture`, never registers `pointermove`/`pointerup`, never calls `acquireSelectSuppression` (`useDragCapture.ts:52–67`). **The first mouse press does nothing at all.**

Worse, it does not stay fixed. The `false` branch arms a 150 ms timer `h` that fires `y(u)` → `isActive = true`; so a *second* press works. But the factory also holds a 3 000 ms inactivity timer `m` (`l(a = 3e3)`) that calls `x()` → `isActive = false`. `onEnd` (`:221`) calls `gate.suppressDeactivate(false)` → `b(!1)` → `v()` → restarts that 3 s countdown. **Three seconds after any drag ends, the next mouse press is swallowed again.** The component's sole interaction is a click-twice-and-wait ritual on the demo's primary browser and inside its Playwright harness.

`suppressDeactivate(true)` at `:202` is the tell that the author *knew* the gate's lifecycle mattered here — the arm side was simply never pointer-typed.

**Falsifier.** Any of: (a) `"ontouchstart" in window` is FALSE in the runtime under test — then `isTouchDevice` is false, `S` returns `true` unconditionally, and no press is ever swallowed (this is why desktop Firefox/Safari are exempt; the defect is Chromium-shaped, which is precisely the audited target); (b) some ancestor pre-activates this gate — impossible: `useTouchGate()` at `:81` constructs a fresh per-instance closure whose `isActive` starts `ref(!1)`; (c) a first-press drag succeeds in a live desktop-Chromium session. **UNPROVEN-NEEDS-LIVE** for the observation itself; the static chain is closed and link 4 is the demo's own prior measurement, not my inference.

---

## 2 · MAJOR

### C-2 — `touch-gate-target` / `touch-gate-active` are **undefined classes**: the gate's armed state is bound to a styling contract that exists nowhere

**Severity MAJOR.** `AnimationVisualizer.vue:21` (`… will-change-transform touch-gate-target`), `:23` (`gate.isActive.value ? 'touch-gate-active' : ''`).

Zero rules define either name:

```
$ grep -rn "\.touch-gate" demo/ node_modules/@mkbabb/glass-ui/dist/   → (no output)
$ grep -rn "touch-gate" node_modules/@mkbabb/glass-ui/               → 2 hits, both PROSE in useDockTouchGate.d.ts
```

Neither is a Tailwind utility, and `useTouchGate`'s implementation never reads or writes a class — it mutates `el.style.touchAction` directly (`y(e)` → `e.style.touchAction = "none"`; `x()` → `= ""`) and exposes `isActive` as a ref. The classes are inert markers.

The consequence composes with C-1: on a genuine touch device the first tap is *correctly* consumed to arm the control, and **nothing on screen changes**. The user taps a 48 px ball, gets no motion, no ring, no tint, and no reason. `:23`'s conditional class is the one affordance the design intended for that state, and it paints nothing.

This is a half-consumed contract: the component takes glass-ui's `useTouchGate` **behaviour** and wires its state to a **presentation** contract glass-ui does not ship and the demo never authored. `PlaybackRibbon.vue:7–8` carries the identical dead pair, so the gap is the seam's, not this file's alone.

**Falsifier.** A `.touch-gate-target` / `.touch-gate-active` rule reachable in the built cascade — a glass-ui stylesheet the `dist/` grep missed, a Tailwind `@utility` in a file outside `demo/`, or a runtime-injected sheet. Grep covered `demo/` whole and the installed glass-ui package whole; a hit anywhere kills this claim.

### C-3 — the one deep import bypasses the exports map **and** drags value.js's `/css` parser into a chunk that is otherwise LIGHT, for a three-line integer counter

**Severity MAJOR.** `AnimationVisualizer.vue:45` — `import { bumpLayoutEpoch } from "@src/animation/resolve/browser";`

`keyframes.js/package.json` publishes exactly two specifiers (lane-library §1). `bumpLayoutEpoch` is exported from neither:

```
$ grep -n "bumpLayoutEpoch\|resolve/browser" src/animation/index.ts src/animation/public.ts   → (no output)
```

It is reachable only through the demo's `@src` vite alias (lane-frontend §8) — a path no installed consumer of `@mkbabb/keyframes.js` can take. On a repo whose demo *is* the library's proving ground (68 engine-consuming files, lane-frontend §1), a component proving an API that ships to nobody is proving nothing.

The cost is not stylistic. `src/animation/resolve/browser.ts:1–3`:

```ts
import { isLayoutTrackingUnit } from "@mkbabb/value.js/value";
import type { CssValue } from "@mkbabb/value.js/value";
import { parseCssScalar } from "@mkbabb/value.js/css";
```

`resolve/browser.ts` is a **HEAVY, value.js-bearing, parser-touching** module — it is lane-library's own seam **A8** (`browser.ts:165 parseCssScalar(source)`). It is absent from `.dependency-cruiser.cjs`'s LIGHT allowlist (`grep -n "resolve/" .dependency-cruiser.cjs` → no output), i.e. not even lint-guarded.

The rest of this component's kf surface — `SmoothProgress`, `SpringProgress`, `RAFPlayback` — is LIGHT and value.js-free by construction, which is the entire point of the two-entry split (`vite.config.ts:153–174`; the firewall at `load-engine.ts:124`, lane-library §3.3). **One import of a monotonic counter breaches it.** And the counter has no value.js content whatsoever:

```ts
// src/animation/resolve/browser.ts:15–20
export const getLayoutEpoch = (): number => layoutEpoch;
export const bumpLayoutEpoch = (): number => {
    browserScalarCache = new WeakMap();
    return ++layoutEpoch;
};
```

**Contradiction with the hitherto corpus.** lane-frontend §3.4 concludes *"reka is reached only transitively through glass-ui — the correct topology… not an import-boundary breach."* That verdict is about the **glass-ui** boundary and it holds. It does not cover the **keyframes.js** boundary, which the same tree breaches at 11 sites (`grep -rn 'from "@src/' demo | wc -l` → 11), of which this is one. The frontend lane's clean-boundary headline (F-6) should be read as scoped to glass-ui only.

**Falsifier.** `bumpLayoutEpoch` turning out to be reachable from `.` or `./engine` (it is not — grep above), or `resolve/browser.ts` turning out to carry no static value.js edge (it carries two, at `:1` and `:3`), or the bundler proving it splits `parseCssScalar` away from the rest of `/css` such that no parser code lands in the playback chunk — a build-output measurement I did not run and which would downgrade this to MINOR, not kill it.

### C-4 — the load-bearing comment attributes `bumpLayoutEpoch` to **value.js**. It is keyframes.js's own. The error is replicated into the regression net.

**Severity MAJOR.** `AnimationVisualizer.vue:70–79`:

> *"bust **value.js's** C1 endpoint cache… **value.js** caches the resolved px keyed by a monotonic layoutEpoch… Feed the genuine signal **value.js exports** for exactly this (the demo OWNS its container; **the eviction policy stays ONCE in value.js** — DRY)."*

Four attributions, all false. `bumpLayoutEpoch`, `getLayoutEpoch`, `browserScalarCache` and `resolveBrowserScalar` are declared in `keyframes.js/src/animation/resolve/browser.ts:6–20, 233–254`. value.js 4.0.0 exports seven subpaths (`./color ./value ./css ./easing ./math ./transform ./quantize`) and none carries the symbol:

```
$ grep -rn "layoutEpoch" node_modules/@mkbabb/value.js/dist/subpaths/*.d.ts   → (no output)
```

The DRY argument inverts on inspection: the eviction policy stays once in **keyframes.js**, which is correct — but the sentence names the wrong repo, so a reader following it to fix the cache goes to the wrong tree.

The mistake has already propagated into the regression net — `test/demo/instrument/resize-tracks.test.ts:13` repeats *"vueuse's `useResizeObserver` + **value.js's** `bumpLayoutEpoch`/`getLayoutEpoch`"* while importing it from `"../../../src/animation/resolve/browser"` on `:31`. The test's own import statement falsifies its own comment.

On the CONSUMPTION axis this matters more than an ordinary doc slip: the comment is the *only* record of which package owns the cache the component is reaching into, and it is the record a future value.js parser wave would read when deciding blast radius.

**Falsifier.** Any value.js 4.0.0 export named `bumpLayoutEpoch`/`getLayoutEpoch`, or a re-export chain from `resolve/browser.ts` back into value.js. `browser.ts:15–20` is a self-contained module-local closure over `let layoutEpoch = 0` at `:6`.

### C-5 — `SmoothProgress` is configured for the wrong numeric domain: `snapThreshold` is left at its `[0,1]` default, ~50× the fling threshold, so the documented exponential filter **never runs**

**Severity MAJOR.** `AnimationVisualizer.vue:130–136`:

```ts
/** Exponentially-smoothed drag velocity, in progress units per ms.
 *  SmoothProgress IS the `v = v*α + instantV*(1-α)` recurrence — fed the
 *  raw per-sample velocity, its `.current` is the filtered estimate. */
const velocityEstimator = new SmoothProgress({ damping: 0.4, clamp: false });
```

Two of `SmoothProgressOptions`' six fields are overridden. The relevant third is not (`src/animation/physics/smooth.ts:37–44`):

```ts
const defaultSmoothOptions: SmoothProgressOptions = {
    damping: 0.1, snapThreshold: 0.001, targetEpsilon: 0,
    initial: 0, clamp: true, respectReducedMotion: false,
};
```

`snapThreshold: 0.001` is calibrated for the class's documented `[0,1]` **progress** domain. This instance holds **progress-per-millisecond** — a domain three orders of magnitude smaller, whose own fling threshold is `0.00002` (`:164`), i.e. **50× below the snap threshold**. `tickDt` snaps whenever the residual falls under it (`smooth.ts:134–140`):

```ts
this.currentValue += (this.targetValue - this.currentValue) * factor;
if (Math.abs(this.targetValue - this.currentValue) < this.options.snapThreshold) {
    this.currentValue = this.targetValue;   // ← snap
    this.isSettled = true;
}
```

Worked example, one 60 Hz frame, `damping: 0.4` → `factor = 1 − e^(−0.4) ≈ 0.33`. A drag at 20 % of the track per second is `v ≈ 0.0002` progress/ms. First sample: `current = 0 + 0.0002·0.33 = 0.000066`; residual `0.000134 < 0.001` → **snap on tick one**. `.current` is now the raw last sample, unfiltered, and `isSettled` is `true`, so `tickDt` early-returns (`smooth.ts:129`) until the next `setTarget`. Every velocity below ≈ `0.0015` progress/ms — i.e. every drag slower than 150 % of the track per second, which is essentially all of them — converges in a single tick.

**The "exponentially-smoothed velocity" is a pass-through of the last raw pointer sample.** The one job the filter was added to do — reject a jittery final `pointermove` at pointer-up — it does not do. Composed with C-6's boundary-target coast, a single 1 px tremor on the release frame is sufficient to teleport the playhead.

That `clamp: false` *was* overridden with a domain-aware rationale in the docblock (`:134` — *"no clamp (velocity is signed, unbounded)"*) while `snapThreshold` was not is the evidence this is an oversight rather than a tuning choice: the author reasoned about the domain change for one option and stopped.

**Falsifier.** Instrument `velocityEstimator.current` against the raw instant velocity across a real drag: if `.current` materially lags the last raw sample for velocities under ~`0.0015` progress/ms, the claim dies. Equivalently, set `snapThreshold: 0` and observe a behavioural change — no change kills the claim.

### C-6 — velocity goes stale across a still-hold, and the coast is built on the wrong primitive: `decay` / `probeVelocity` / `reseatToSpring` ship in the same barrel and are unconsumed

**Severity MAJOR.** `AnimationVisualizer.vue:151–161, 172–191`.

`trackVelocity` runs **only** from `onMove` (`:216`), and discards any sample whose gap exceeds 200 ms (`:155` — `if (dt > 0 && dt < 200)`). A stationary pointer fires no `pointermove`; `useDragCapture.onPointerUp` calls `handlers.onEnd` directly with no terminal move sample (`useDragCapture.ts:43–50`). Therefore:

> drag quickly → hold still to position precisely → release ⇒ `velocityEstimator.current` still reads the **pre-hold** velocity, because nothing decays it in wall-clock time.

`startCoast` (`:172–191`) then reads that stale value, clears `FLING_THRESHOLD`, and seats a spring **whose target is a track boundary**:

```ts
coastSpring.reset(lastProgress, velocity * 1000);
coastSpring.target = velocity > 0 ? 1 : 0;
```

`SpringProgress` settles *at its target*. So the "inertial coast" is not velocity-proportional at all — **any** release above `0.00002` progress/ms sends the playhead to `t = 0` or `t = duration`, and velocity governs only the travel time. A user who carefully parks the playhead at 50 % and lifts loses the position to an endpoint. `:163`'s promise (*"Below this release speed a tap positions without coasting"*) holds only for a true dead stop that also happens to have fired a recent move sample.

The library ships the right primitive, in the **same LIGHT barrel this file already imports from** — `src/animation/physics/decay.ts:1–4`:

> *"Frictional decay (inertial glide) — the one-line closed-form sibling of the spring solver, **for the fling/flick case where there is no target to settle to, only an initial velocity bleeding off under friction**."*

`x(t) = x0 + (v0/k)(1 − e^(−kt))` — a finite, velocity-proportional resting point. Exported at `src/animation/index.ts:136` (`export { decay, decayRest } from "./physics/decay";`). Two more unconsumed neighbours:

- `probeVelocity` / `VelocityProbe` (`index.ts:39–41`; `physics/spring/solver/reseat.ts:1–15`) — the library's finite-differenced velocity measurement, returning **units/second**. The component's hand-rolled `velocity * 1000` at `:182` exists only because it measured in ms itself.
- `reseatToSpring` (`index.ts:40`) — *"seed a fresh SpringProgress at the CURRENT position with that MEASURED velocity"*, verbatim the two lines above.

Net: ~35 lines (`:127–191`) re-derive three shipped primitives and land on the one shape (`spring → boundary`) that discards the gesture's magnitude.

**Falsifier.** A `pointermove` reliably firing between a still-hold and `pointerup` (it does not — a stationary pointer emits none); or `velocityEstimator.current` measuring below `FLING_THRESHOLD` after a ≥ 300 ms still-hold (instrument `onEnd`); or a design ruling that "flick → jump to the endpoint" is the intended semantic, which would demote the primitive half to MINOR but leave the stale-velocity half standing.

### C-7 — the rAF guard excludes the sibling scrub, so the "visual twin" freezes exactly when the user drives the primary control

**Severity MAJOR.** `AnimationVisualizer.vue:237–250`:

```ts
// ── Playback sync ───────────
// Always poll — the animation's effectiveT changes during playback, slider scrub,
// and visualizer drag. …
useRafLoop(() => { … }, { guard: computed(() => props.isPlaying || isDragging.value) });
```

The comment names three motion sources; the guard covers two. `isDragging` is **this component's own** drag flag (`useDragCapture`, `:195`). The sibling reka `<Slider>` scrub has no term.

The seam closes against it. `PlaybackRibbon.vue:72–80` mounts the visualizer with `:is-playing="isAnimPlaying"`; the scenes bind that to real playback state and **pause on scrub start** — `SpringScene.vue:98–105`:

```ts
let wasPlayingBeforeScrub = false;
const onScrubStart = () => {
    wasPlayingBeforeScrub = demo.isPlaying.value;
    if (wasPlayingBeforeScrub) demo.pause();
};
const onScrubEnd = () => { if (wasPlayingBeforeScrub) demo.play(); … };
```

with `isAnimPlaying: demo.isPlaying.value` at `SpringScene.vue:120`. So during a `<Slider>` scrub: `isPlaying === false`, `isDragging === false` → guard `false` → `useDemoTicker`'s per-subscriber gate `enabled()` returns false and this component's tick is skipped for the whole gesture (`useDemoTicker.ts:20` — `if (entry.enabled()) entry.tick(time)`; the shared module-level `playback` keeps running for other subscribers, so the loop's liveness is no rescue).

**The ball does not move while the slider moves.** And when the scrub started from a paused state, `wasPlayingBeforeScrub` is `false`, so `demo.play()` never runs and the ball stays at its pre-scrub position **indefinitely**.

This falsifies the component's own charter, `:2–6`: *"this big ball is a decorative VISUAL twin of the real reka `<Slider>` in PlaybackRibbon (**same scrub value, same range**)."* The twin invariant holds during playback and during its own drag, and breaks under the primary control.

`@scrubbed → wake` (`PlaybackRibbon.vue:128`, `ChannelOptions.vue:396`) re-arms the *parent's* loop, not this one — each `useDemoTicker` subscriber is gated independently.

**Falsifier.** A consumer that keeps `isAnimPlaying` true through a scrub — `ChannelOptions.vue:501` sources it from `useAnimationSync`, which I did not read to the bottom, so that one path is open. `SpringScene.vue:98–105` + `:120` closes the falsifier for the spring scene by itself, which is sufficient to establish the class.

### C-8 — `dragStart` / `dragEnd` are unbalanced: dispose stops the coast without emitting the terminator, latching the consumer's pause flag

**Severity MAJOR.** `AnimationVisualizer.vue:252–255`:

```ts
onScopeDispose(() => coastPlayback.stop());
```

`dragStart` fires unconditionally on gesture start (`:208`). `dragEnd` fires from exactly two places: the no-fling early return (`:177`) and the settle frame (`:189`). Dispose is neither. Unmount inside the coast window — up to ~1 s of spring travel after a fling — stops the loop and **emits nothing**.

`PlaybackRibbon.vue:78–79` maps the pair straight through:

```html
@drag-start="emit('scrubStart')"
@drag-end="emit('scrubEnd')"
```

and `SpringScene.vue:98–105` latches on it. A `scrubStart` without its `scrubEnd` leaves `wasPlayingBeforeScrub = true` with `demo.play()` never called: **the scene is stuck paused and the flag can never clear**, because the next `onScrubStart` overwrites it from an already-paused state.

The unmount is not hypothetical. `PlaybackRibbon.vue:73` mounts the visualizer under `v-if="animation"`, and `ChannelOptions.vue:377` teleports the entire ribbon under `<Teleport v-if="active">` — **switching the active channel mid-coast unmounts the visualizer while the scene survives**, which is exactly the shape that strands the latch.

The same hole exists on the `useDragCapture` side: vueuse cleans the listeners on scope dispose (`useDragCapture.ts:19–21`) but never invokes `handlers.onEnd`, so a gesture interrupted by unmount is silent there too.

The fix is one line inside the existing dispose hook. That `onScopeDispose` was added at all — with a careful docblock about the "bounded micro-leak" (`:252–254`) — shows the disposal path was reasoned about for the *rAF handle* and not for the *emit contract*.

**Falsifier.** A consumer whose `scrubEnd` handler is idempotent-on-absence, or a `PlaybackRibbon`-level dispose that re-emits `scrubEnd` — the ribbon has no `onScopeDispose` (read whole, 244 L). Or proof that no unmount can occur while `coastPlayback.running` — refuted by `ChannelOptions.vue:377`.

---

## 3 · MINOR

### C-9 — `KeyframesAnimation<any>` defeats the library's generic at the props boundary
`:56` `animation: KeyframesAnimation<any>;`. The library parameterises the class; `any` erases it, and the erasure then flows outward through `PlaybackRibbon.vue:104` and its `sliderUpdate` payload (`:129`). This is the house idiom, so it is a seam-level finding rather than a file-level one — but a demo whose purpose is to exercise the published types is the last place the published types should be widened away. **Falsifier:** the type parameter having no meaningful instantiation in demo code (I did not enumerate call sites), which would make `any` honest.

### C-10 — the nullability contract is split against itself
`:113` guards `if (!anim || anim.options.duration <= 0) return;`. `:242–243` does not: `const anim = props.animation; if (!isDragging.value && !coastPlayback.running && anim.options.duration > 0)`. Either the prop is non-null (declared required at `:56`, parent-guarded at `PlaybackRibbon.vue:73`) and `:113`'s `!anim` is dead, or it is not and `:243` throws on the same tick. Both cannot be right. **Falsifier:** a route by which `props.animation` is observably `undefined` on a mounted instance — which would promote this to MAJOR, not clear it.

### C-11 — three import statements for one specifier
`:48`, `:49`, `:50` each `import { X } from "@mkbabb/keyframes.js";`. Three module records where one suffices; it also visually splits what is a single tier (LIGHT physics) into what reads as three unrelated edges. **Falsifier:** a lint rule or codegen step that requires the split — none found in `.dependency-cruiser.cjs` or the eslint config surface.

### C-12 — `useRafLoop` is a pass-through whose docblock describes a different mechanism
`useRafLoop.ts:14–19` is five lines delegating verbatim to `useDemoTicker(callback, options?.guard)`, wrapped in a 10-line docblock describing *"a thin reactive skin over the engine's `RAFPlayback.loop` driver"*. The real driver is `useDemoTicker`'s **shared module-level singleton** (`useDemoTicker.ts:8–9`) with a subscriber set and a document-visibility reconcile — a materially different contract (a shared loop, per-subscriber gating, visibility pause) that the wrapper's prose hides from its reader. That hiding is what let C-7's guard look sufficient. Contra `feedback_kiss_no_contrivance`; also the same shim smell lane-frontend **F-5** flagged (though that finding named two *other* files — this one is a wrapper, not a re-export, so it is an extension of F-5's class, not a duplicate). **Falsifier:** a second consumer of `useRafLoop` needing a different backing driver — `grep -rn useRafLoop demo` would settle it; I did not run the census.

### C-13 — **S-9 (new): the shadow census missed this component.** `AnimationVisualizer` is a 256-line re-derivation of glass-ui's `ScrubberTimeline`
Extending lane-frontend §5, which enumerates S-1…S-8 and lists `AnimationVisualizer` only in §4's roster as *"visualizer — `useTouchGate`"*. It never entered the shadow table, yet the installed 7.0.0 ships its counterpart on the `/timeline` subpath the demo **never imports** (lane-frontend §3.1). `node_modules/@mkbabb/glass-ui/dist/components/timeline/ScrubberTimeline.vue.d.ts:1–26`:

> *"single-track normalized 0..1 scrubber… Owns the pre-Z.W2 single-track contract: **pointer-capture drag**, keyboard a11y (role=slider + arrow-key step + shift-step)… travel rides a `useSpring`/**SpringProgress** position written to `transform: translateX()` (NEVER `style.left` — Safari composites transform, not left)… **the velocity term is the head spring's own derivative (the self-extinguishing per-frame velocity SpringProgress already computes — the GOLDEN §0 "drive off the spring derivative" path, no free-running rAF)**… release settles ζ<1… the 44px touch target is an invisible `::before` halo."*

Line-for-line against the bespoke: pointer-capture drag = `useDragCapture` (`:195`); `transform: translateX()` = `:98`; SpringProgress release settle = `:144–149`; rail geometry = `:86–110`, which re-derives what `dist/components/timeline/geometry.d.ts` exists to own. And the velocity term: glass-ui explicitly prescribes the spring's own derivative and **"no free-running rAF"** — the bespoke runs a second `RAFPlayback` (`:149`) fed by a `SmoothProgress` estimator (C-5), while `SpringProgress` already exposes `get velocity()` (`physics/spring/progress.ts:191`).

Verdict **evaluate, not swap** — the `aria-hidden` decorative-twin charter (`:2–6`) and the fling semantics may genuinely exceed the primitive, and glass-ui's `role=slider` keyboard contract would *conflict* with the deliberate a11y disposition (see S-d). Severity MINOR on that basis. The census gap itself is the finding: the biggest single unlisted shadow in the tree ranks alongside S-4's 162-line `SequenceScrubber`, which was listed. **Falsifier:** `ScrubberTimeline` proving unable to express a fling coast or an aria-hidden mode — which would confirm "keep bespoke" but not un-miss the census row.

### C-14 — the resize wire's *local* causal story is false; nothing in this component is engine-resolved
`:70–79` justifies `useResizeObserver(containerEl, () => bumpLayoutEpoch())` with: *"The dashed twin animates to `calc(100cqw - 100%)` resolved against this `container-inline-size` box… the ball serves the stale pre-resize target."*

The dashed twin (`:34–36`) is positioned by a **static Tailwind class** — `translate-x-[calc(100cqw_-_100%)]`. It has no `ref`, no engine binding, and nothing in the file animates it; `container-inline-size` is real (`demo/styles/style.css:238`), so the CSS resolves natively and re-resolves on resize **by the container-query mechanism itself**, with no cache in the path. Separately, the ball's position is recomputed live every frame from `getMaxX()` (`:86–99`) — never cached, never engine-resolved. The epoch cache is consumed at exactly one site in the library, `compile/interp-slot.ts:280–284`, which this component does not reach.

The wire is nonetheless globally *defensible* — a panel re-layout that resizes this box plausibly co-occurs with one that resizes an engine-animated `cq`-unit subject elsewhere, and `resolve/browser.ts:22–24` only auto-bumps on `window.resize`. So: **keep the wire, retire the rationale.** The rationale is currently pinned by a source-text grep — `test/demo/instrument/resize-tracks.test.ts:132–139` asserts `expect(src).toMatch(/bumpLayoutEpoch\s*\(\s*\)/)` against the component file — which cements a mechanism the file cannot exercise.

**Falsifier.** Any engine-driven animation targeting an element inside `containerEl`; or a `cq`-unit endpoint flowing through `resolveBrowserScalar` from this subtree. Neither exists in the 256 lines.

### C-15 — `z-bar` is the wrong semantic rung under the demo's own z-contract
`:21` places the ball at `z-bar`. `demo/styles/style.css:29–31` documents the scale as `--z-content: 10` (scene subject), `--z-controls: 20` (**"in-scene controls layered over content"**), `--z-bar: 30` (**"the editor bars (header / menubar chrome)"**). A draggable in-scene control on the chrome rung, two steps above the `z-content` markers it needs to clear (`:31`, `:35`), contradicts `:37`'s own instruction — *"Use the SEMANTIC z-* utility for the rung."* `z-controls` is the named rung and still clears both markers.

Confirmed *not* a resolution failure: glass-ui bridges the scale into Tailwind v4's namespace at `dist/styles/theme/bridges.css` (`--z-index-bar: var(--z-bar)`, `--z-index-content: var(--z-content)`), so both utilities generate. **Falsifier:** a stacking context that makes the rung unobservable — `ChannelControls.vue:4` carries `isolate`, so the practical paint may well be contained; the contract violation stands regardless of whether it is currently visible.

---

## 4 · INFO

### C-16 — the deep import installs a permanent global listener, in a package declaring `sideEffects: false`
`src/animation/resolve/browser.ts:22–24` registers `window.addEventListener("resize", bumpLayoutEpoch)` at **module evaluation**, while `keyframes.js/package.json` declares `"sideEffects": false` (lane-library §1). Importing `bumpLayoutEpoch` for its value therefore also installs a process-lifetime listener the consumer never asked for and cannot remove. A library defect surfaced by this component's consumption choice; noted for the parser/boundary wave, not chargeable here. **Falsifier:** a `sideEffects` array carve-out for `resolve/**` — the field is the bare `false`.

### C-17 — a single-consumer token in the shared layout sheet, with a hand-synced literal beside it
`--visualizer-track-gutter: 3rem` lives in `demo/styles/layout.css:23` with exactly one consumer, `:15` of this file. Its own comment (*"1.5rem each side"*) encodes an invariant that `:15`'s sibling literal `left-6` (= 1.5rem) must satisfy by hand — change the token and the left inset silently desyncs. Also relevant to lane-frontend §6.3's flat-namespace concern: 98 unprefixed demo custom properties, zero `--kf-*`.

---

## 5 · SUPERLATIVES (L-18 runs both ways)

### S-a — the value.js edge is exactly right on every dimension
`:46` `import { clamp } from "@mkbabb/value.js/math";`. Correct **subpath**: `/math` is the parser-free leaf, so the component takes no `/css` edge of its own and the **R1 crash class is not in its call graph** (see S-e). Correct **arity**: `dist/subpaths/math.d.ts:1` declares `clamp(value, min, max)`, matching both call sites (`:108`, `:186`). Correct **necessity**: keyframes.js's light barrel does *not* re-export `clamp` (`grep -n "export.*clamp" src/animation/index.ts` → no output), so the direct edge is required, not redundant — and `@mkbabb/value.js: 4.0.0` is the one `@mkbabb` entry that *is* declared and locked (lane-frontend F-1). Correct **consistency**: it is the house idiom across 20+ demo sites. Four independent ways to get this wrong, none taken.
**Falsifier (runs both ways):** an undeclared value.js dep, an arg-order slip, a kf re-export making the edge redundant, or `/math` transitively pulling `/css`. None hold.

### S-b — the second raw playback is disposed, and the reasoning for *why it needs separate treatment* is recorded
`:252–255`. `useRafLoop` self-cleans via `useDemoTicker`'s `onScopeDispose` (`useDemoTicker.ts:45–48`); `coastPlayback` is a second, unmanaged `RAFPlayback` that would otherwise outlive the scope until the spring settled. The docblock names it precisely — *"a bounded micro-leak"* — rather than gesturing. The class of bug that survives review by looking like nothing.
**Falsifier:** a third rAF owner left undisposed — there is none; `velocityEstimator` and `coastSpring` are pure steppers whose `_playback` is never armed (no `.play()` call in the file).

### S-c — the terminal emit is exactly-once **by the driver's contract**, not by a flag
`:185–190` emits `dragEnd` inside the `drive` callback under `if (coastSpring.settled)`. `physics/playback.ts:208–219` invokes `onFrame` once per frame and returns `!tickable.settled`, so the settle frame is the last frame: exactly one emit, no guard variable, no de-dup. And `drive`'s idempotence (`:209` — `if (this._rafId !== null) return`) makes the re-arm at `:185` safe against a re-entrant call. A correct read of a non-obvious library contract.
**Falsifier:** `drive` invoking `onFrame` after the terminal step, or `SpringProgress.settled` oscillating — `_stepSeconds` early-returns once settled (`spring/progress.ts:275–277`), so it latches.

### S-d — the `aria-hidden` disposition is genuinely reasoned, and the tree supports it
`:2–7`. One AT-visible slider per scrub value, the reka `<Slider>` is it, this is the redundant sighted twin. The disposition survives its usual failure mode: `aria-hidden` over a focusable descendant is an ARIA violation, and there is none here — no `tabindex`, no native control, no `role` in the whole subtree. The comment states the rule it is applying rather than asserting a conclusion.
**Falsifier:** any focusable node inside `:7`'s subtree, or a second AT slider bound to the same value. Neither exists.

### S-e — no parser surface is reachable from this component's call graph
Extending lane-library §4.6, which lists the demo's five direct parse consumers and names `demo/scenes/square/useSquareTumble.ts:22 parseCssColor(css)` as *the* R1 crash surface. **`AnimationVisualizer` is not among them and cannot be**: no color string, no CSS text, and no scalar string ever enters it — the only values crossing its boundary are `number` (`:61` `scrub(t: number)`) and the animation handle. C-3's deep import drags the parser's **code** into the graph; it does not put a **call** in the path. Stated precisely because the imprecise version ("the R1 class is exposed here") would be a false defect.
**Falsifier:** any string-valued path into a value.js `/css` entry point from this file — there is none across 256 lines.

### S-f — the coast clamp guards a real analytic edge case
`:186` `clamp(coastSpring.value, 0, 1)`. With `dampingFraction: 1` (`:146`) the spring is critically damped, which forbids oscillation but **not** a single overshoot when seeded with velocity *toward* the target — `x(t) = (A + Bt)e^(−ωt)` genuinely exceeds the target for `v₀ > 0`. The clamp is not defensive noise; it is the one guard the seeded-velocity configuration actually requires, and the ball's px mapping (`:96–98`) would otherwise run past the rail.
**Falsifier:** a critically-damped seeded spring that provably cannot overshoot — the closed form at `spring/progress.ts:303–309` says otherwise.

---

## 6 · Verdict

The component's **taste** is high — the value.js edge is textbook (S-a), the disposal reasoning is real (S-b), the `RAFPlayback.drive` contract is read correctly (S-c), and the a11y ruling is one of the better ones in the tree (S-d).

Its **consumption** is not. The single defining move — reaching past a deliberately two-entry exports map into a HEAVY, parser-bearing internal (C-3) for a three-line counter, then narrating that internal as belonging to a different package (C-4) — is the axis in miniature: the boundaries the library spent a whole `vite.config.ts` and a `dependency-cruiser` ruleset erecting are crossed by one import line that no lint rule watches. The glass-ui edge is worse: a behaviour contract consumed without its (nonexistent) styling contract (C-2), and a touch-only gate wired to mouse pointers (C-1) in a file whose sibling — same directory, same composable, same author-voice — carries a nine-line comment explaining precisely why that breaks and precisely how to fix it.

The physics tell the same story from the other side: three shipped light-barrel primitives (`decay`, `probeVelocity`, `reseatToSpring`) sit unconsumed while ~35 lines re-derive them into a shape that discards the gesture's magnitude (C-6), with a filter that never runs because one default was never re-domained (C-5).

**Wave order** if this becomes work: **C-1** (three words, restores the component's only interaction) → **C-2** (a styling contract, or drop the dead classes) → **C-8** (one line in the existing dispose hook) → **C-7** (widen the guard, or expose the ribbon's scrub state) → **C-3/C-4** (publish `bumpLayoutEpoch` from a LIGHT path, or accept the HEAVY edge and *say so correctly*) → **C-5/C-6** (the physics re-seat onto `decay` + `probeVelocity`) → **C-13** (the `ScrubberTimeline` evaluation, its own spec).

Nothing was written, mutated, or executed in `/Users/mkbabb/Programming/keyframes.js` or `/Users/mkbabb/Programming/glass-ui`. No installs, no dev server, no browser. This file is the session's only write.

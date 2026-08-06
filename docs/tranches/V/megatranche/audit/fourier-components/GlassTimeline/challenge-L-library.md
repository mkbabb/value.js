claude-opus-5[1m]

# CHALLENGE — `GlassTimeline` · axis L (LIBRARY)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/GlassTimeline.vue` (127 LOC)
**Posture** DEFECTIVE-until-proven. Static + source-derived only; no browser tooling. Livable-only claims carry `UNPROVEN-NEEDS-LIVE` for SS-13.
**Verdict** 16 defects · **2 BLOCKERS** · 5 superlatives. The component is a partial re-fork of a component the producer already ships, and the fork dropped the upstream's `pointercancel` teardown. That single omission latches a global store flag for the remainder of the session and poisons the Canvas2D trail render path.

## Read set (whole, read-only)

| File | Why |
|---|---|
| `web/src/components/visualization/GlassTimeline.vue` | subject |
| `web/src/stores/animation.ts` (146) | the sole import besides `vue` + `Slider`; owns `t`/`scrubbing`/rAF |
| `web/src/components/visualization/AnimationControls.vue` (225) | sole consumer (`:11`, `:91`); supplies `label` |
| `web/src/components/visualization/BasisCanvas.vue` (`:140,144,196,231,239,322,329,419`) | the viz render path this component writes into |
| `web/src/components/visualization/lib/canvas-drawing/trail.ts` (96) | the `scrubbing` sink |
| `web/src/components/equation/convergence/ConvergenceTimeline.vue` (146) | the duplicate adapter |
| `web/src/components/visualization/{VisualizationView,FullscreenViewer}.vue` | the dual-mount sites |
| `@mkbabb/glass-ui@4.0.0` `dist/{slider.d.ts, components/ui/slider/*.d.ts, slider-DQ95MET2.js, timeline.js, dock.js, glass-ui.css, styles/tokens/*}` | the `<Slider>` + `ScrubberTimeline` + dock contracts |
| `reka-ui@2.9.10` `dist/Slider/{SliderRoot,SliderImpl,SliderHorizontal}.js` | where `valueCommit` is actually emitted |

## Hitherto corpus — folded, not re-invented

- **CENSUS-2026-08-03 §3a "Shadows" (line 93)** — *"HARD — local `GlassTimeline.vue` (127, name-identical, producer subpath never imported)"*. **CONFIRMED and sharpened**: the producer subpath is `@mkbabb/glass-ui/timeline`, and the specific upstream twin is `ScrubberTimeline` (`dist/timeline.js`, `__scopeId "data-v-a206e2d2"`), whose scoped CSS in `dist/glass-ui.css` carries the *same three class names* `.timeline-row` / `.timeline-caret` / `.caret-value fira-code`, the *same* `left: modelValue*100 + '%'` caret binding, and the *same* `label` prop. This is not a name collision — it is a byte-traceable fork.
- **CENSUS §3a Frontend shape (line 85-87)** — *"Canvas2D throughout, WebGL/WebGPU ABSENT; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; …)"*. **CONFIRMED**; the "store rAF clock" is `animation.ts:51-75`, and `GlassTimeline` is its only user-facing seek surface (`grep -rn "\.seek(" web/src` → exactly one hit, `GlassTimeline.vue:39`). Every defect below that touches `anim.scrubbing` or `anim.t` lands in that render path.
- **lane-frontend.md:401-403** — *"the upstream `GlassTimeline` plus `ContinuousTimeline`/`ScrubberTimeline`/`SegmentedTimeline` already covers the surface… Name-identical, zero-import: the strongest shadow signal in the tree."* **CONFIRMED** (`dist/components/custom/timeline/` lists all four `.vue.d.ts`). **CONTRADICTED in one particular**: the row calls the local file a *"partial re-fork"* because it composes `Slider`. The truer statement is that the fork is *behaviourally regressive*: `ScrubberTimeline` binds `onPointerup` **and `onPointercancel`** to one unconditional `scrubEnd`, and the local file has neither (§L-B1).
- **lane-frontend.md:382** — *"The one live selector is `GlassTimeline.vue:103` `.timeline-row:has(.glass-slider[data-held])`."* **CONFIRMED live**, and adjudicated at §L-M4: `data-held` is a **dock-wide** flag, not this slider's drag state.
- **lane-frontend.md:70** — books `GlassTimeline.vue:32` among the six prose-only `reka-ui` mentions. **CONFIRMED** (line 32 comment; zero direct reka imports). Noted because §L-B1's root cause lives in exactly the reka internals that comment paraphrases — and paraphrases *incompletely*.
- **intake lane `lane-fourier-r3-r6.md`** — **no row adjudicates `GlassTimeline`**. The nearest is **R3-7a** (TRUE, CARRY-TO-WAVE → F.W3), which counts *"AnimationControls 4"* Tooltip callsites — i.e. it touches this component's sole parent but never descends into it. Nothing in the 38/52 TRUE set contradicts anything below; nothing below re-litigates a row already adjudicated there.

---

# BLOCKERS

## L-B1 · BLOCKER · The scrub lifecycle is unbalanced: `startScrub()` can be armed with no reachable `endScrub()`

`GlassTimeline.vue:43-57` pairs an **unconditional** arm with a **conditional** disarm:

```
:49  function onPointerDown() { onValueCommitStart(); }        // fires on EVERY pointerdown
:43  function onValueCommitStart() { … scrubbing.value = true; anim.startScrub(); }
:53  function onValueCommit()      { if (!scrubbing.value) return; … anim.endScrub(); }
:73  @pointerdown="onPointerDown"  @value-commit="onValueCommit"
```

`valueCommit` is **not** a pointer-release event. `reka-ui/dist/Slider/SliderRoot.js:114-119`:

```js
function handleSlideEnd() {
  const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value];
  const nextValue = currentModelValue.value[valueIndexToChangeRef.value];
  const hasChanged = nextValue !== prevValue;
  if (hasChanged) emits("valueCommit", toRaw(currentModelValue.value));   // ← guarded
}
```

and `SliderImpl.js:57-63` binds slide-end to `pointerup` **only** — there is no `onPointercancel` anywhere in `SliderImpl.js`, `SliderHorizontal.js`, or `SliderRoot.js`. Three reachable doors leave the arm set with no disarm:

1. **Null-delta press.** `:step="1"` over `[0,100]`, and the getter (`:36`) already reports `Math.round(anim.t * 100)`. A press within half a percent of the live position snaps to the value already held → `updateValues` finds `hasChanged === false` (`SliderRoot.js:127-132`) → the model never moves → `handleSlideEnd` finds `nextValue === prevValue` → **no `valueCommit`**.
2. **`pointercancel`.** Any OS/browser interruption of the gesture. This is not hypothetical on touch: the producer's own `useTouchGate` (`slider-DQ95MET2.js`, `touchstart` bound `{passive:false}`) *deliberately allows* vertical touch-scroll to escape the slider, and an escaping touch is precisely a `pointercancel`. reka emits nothing; the component hears nothing.
3. **Unmount mid-drag** — see §L-B2.

**Consequence — both halves latch.**
*Local half*: `scrubbing.value` stays `true` → `onValueCommitStart` early-returns (`:44`) for the rest of the instance's life. The scrub axis is dead: every subsequent drag seeks the value but never re-parks the clock, so the rAF loop fights the user's drag frame-by-frame.
*Store half*: `anim.scrubbing` stays `true` **forever**. `grep -rn "scrubbing" web/src` returns exactly three writers — `animation.ts:114` (init), `:117` (`startScrub`), `:121` (`endScrub`) — and `endScrub` has exactly one caller, `GlassTimeline.vue:56`. Neither `reset()` (`animation.ts:132-135`) nor `pause()` clears it.

**Consequence in the viz render path** (the census "epicycle instrument reactive-redraw off a store rAF clock" row). `BasisCanvas.vue:144` and `:329` pass the latched flag straight into `trail.update(anim.t, tip[0], tip[1], anim.scrubbing, components)`. `trail.ts:48-72`:

```ts
if (scrubbing || t < this.lastT - 0.01) {        // ← now permanently true
    this.x.length = 0; this.y.length = 0;
    …  for (let i = 0; i <= endIdx; i++) { this.x.push(this.preX[i]); … }   // up to 1201 pushes
} else { this.x.push(tipX); this.y.push(tipY); }                            // the O(1) path, now unreachable
```

The trail stops *tracing* and starts being *rebuilt from index 0 on every frame* — up to 1201 array pushes per frame in the precomputed path (`TRAIL_RESOLUTION = 1200`, `trail.ts:5`), or up to 601 `evaluateFourier(components, …)` evaluations per frame in the `preX === null` fallback (`trail.ts:60-67`). An O(1)-per-frame path becomes O(N·|components|) per frame, permanently, for a control the user tapped once.

The clock is separately parked: `startScrub` calls `stopRAF()` (`animation.ts:118`) while `playing` stays `true`, and `startLoop()` (`:51-55`) gates on `playing && anyCanvasVisible && rafId === null` — it never consults `scrubbing`. So playback is recoverable by double-toggling play, but `anim.scrubbing` is not recoverable by anything.

**Falsifiers, run:**
- *"`@pointerdown` never reaches the DOM, so nothing arms."* Refuted: `Slider` (`slider-DQ95MET2.js`) declares no `inheritAttrs: false` and has a single root vnode; `SliderRoot.js:17` sets `inheritAttrs: false` but explicitly re-emits with `mergeProps(_ctx.$attrs, {…})` (`:149`); `SliderHorizontal` and `SliderImpl` both default-inherit onto a single root down to `Primitive`. The handler lands on the DOM span, arrayed ahead of reka's own (`mergeProps` puts the `$attrs` handler first). If it did *not* land, scrubbing would never start at all and the component would be trivially broken — which no lane reports.
- *"reka emits `valueCommit` unconditionally."* Refuted verbatim at `SliderRoot.js:117-118`.
- *"Something else clears `anim.scrubbing`."* Refuted by exhaustive grep (three writers, one `endScrub` caller).
- *"The null-delta press is unreachable because the thumb absorbs it."* Refuted, and in the *strengthening* direction: `glass-ui.css` `.slider-thumb[data-v-534634a7]{width:0;…opacity:0}` and `.touch-hit-area[data-v-534634a7]:before{pointer-events:none}` — the thumb is a zero-width, non-hit-expanding element. Every press is a **track** press, i.e. exactly the `handleSlideStart` path that can no-op.
- *Live frequency* of door 1 vs door 2 is `UNPROVEN-NEEDS-LIVE`; the reachability of each is CONFIRMED from source.

**The producer already shipped the cure.** `dist/timeline.js` `ScrubberTimeline`:

```js
function f() { c.value = !1, r("scrubEnd"); }          // unconditional
… onPointerup: f, onPointercancel: f, …
```

The fork's own header comment (`:5-18`) claims it *migrated away from* "the 175 LOC shadow recipe (manual pointer-state-machine + `glass-track`/`glass-fill`/`glass-thumb` paints)". Those three class names are `ScrubberTimeline`'s (`glass-ui.css`, `data-v-a206e2d2`). The "shadow recipe" it retired **is the producer's shipping component**, and the hand-rolled pointer state machine it replaced was the thing that got `pointercancel` right.

**Second site.** `ConvergenceTimeline.vue:46-56` carries the identical arm/disarm asymmetry with `emit("scrub-start")`/`emit("scrub-end")` as the sink. Same defect, same cure, two files.

---

## L-B2 · BLOCKER · No teardown: an unmount mid-scrub latches the store flag with no local state left to recover from

The component registers no `onUnmounted` / `onScopeDispose` / `onBeforeUnmount` (grep over `GlassTimeline.vue` → zero lifecycle hooks; the only imports at `:20` are `computed, ref`). If the instance disappears between `anim.startScrub()` (`:46`) and `anim.endScrub()` (`:56`), the store's `scrubbing` is stranded `true` and the local guard that would have released it is garbage.

This is live, not theoretical:

- `VisualizationView.vue:282` mounts `<FullscreenViewer :visible="showFullscreen" …>` unconditionally; `FullscreenViewer.vue:105-107` teleports to body behind `<div v-if="show">`, and `:130-131` mounts `<AnimationControls>` behind a second `v-if="!isEditing"`. Closing fullscreen (Esc, backdrop click at `:107` `@click.self="emit('close')"`) or flipping into edit mode **unmounts** the timeline. Doing so with a finger still down on the scrubber is an ordinary user action.
- `dock.js` renders both dock layers unconditionally (`[U(t.$slots,"default")]` and `[U(t.$slots,"collapsed")]`, gated only by `is-active` + `inert`), so dock collapse is *not* an unmount door — noted so the finding is not over-claimed. The `v-if` doors above are the real ones.

**Aggravator — the dual mount.** When fullscreen is open, `AnimationControls` (and therefore `GlassTimeline`) exists **twice**: `VisualizationView.vue:236` and `FullscreenViewer.vue:131`. Two instances hold two private `scrubbing` refs (`:30`) over **one** shared `anim.scrubbing`. Instance B's `endScrub()` clears the flag instance A believes it owns; instance A's later `endScrub()` clears a flag no one set. Store-side the lifecycle is a bare boolean with no ownership token and no reference count — contrast `animation.ts:43,99-106`, where the *canvas*-visibility axis was correctly built as a reference count (`visibleCanvases`) for exactly this dual-mount reason. The scrub axis did not get the same treatment.

**Falsifier:** if the store used a counter (or the component used `onScopeDispose(() => scrubbing.value && anim.endScrub())`), both halves die. Neither exists — `animation.ts:114-126` is a plain `ref(false)` with a plain set/clear pair.

---

# MAJOR

## L-M1 · MAJOR · The `v-model` getter mints a fresh array every rAF tick, re-rendering the whole slider subtree ~60×/s for ≤5 value changes/s — including while the dock is collapsed and `inert`

`GlassTimeline.vue:35-37`:

```ts
const tArr = computed<number[]>({ get: () => [Math.round(anim.t * 100)], … });
```

Vue's `computed` invalidates on `!Object.is(new, old)`. A newly allocated array is never `Object.is` to the previous one, so **every** `anim.t` write re-notifies — and `anim.t` is written once per `requestAnimationFrame` (`animation.ts:69`, inside `tick`). Downstream, `SliderRoot`'s `currentModelValue` (`SliderRoot.js:104`) spreads it into yet another new array, and `Slider`'s thumb loop `renderList(t.modelValue, …)` (`slider-DQ95MET2.js`) re-runs. Five component render effects per frame — `GlassTimeline`, `Slider`, `SliderRoot`, `SliderHorizontal`/`SliderImpl`, `SliderThumb`.

The *observable* value changes far more slowly: default `duration = 20000` ms at `speed = 1` (`animation.ts:22-23`) means the rounded percentage advances **5 times per second**. At 60 fps that is a **12:1 waste ratio**, and the ratio worsens as `duration` grows.

Worse, it runs when nothing is visible. `AnimationControls.vue:58-63` mounts the dock with `:start-collapsed="true"`, and `dock.js` keeps *both* slot layers permanently in the tree (`dock-layer--full` receives `inert` when not active; there is no `v-if`). So on a freshly loaded, autoplaying visualization with the dock collapsed, `GlassTimeline` and its five-deep slider subtree re-render 60×/s behind an `inert`, visually-hidden layer. The caret's `:style="{ left: (anim.t * 100) + '%' }"` (`:62`) writes an inline style 60×/s onto an element that is `opacity: 0` (`:95`) and inside that same inert layer.

**Falsifiers:**
- *"Vue bails on structurally-equal arrays."* Refuted — `computed` uses reference identity; only `props` diffing on *primitive* values short-circuits, and `modelValue` is an array.
- *"The dock unmounts the slot when collapsed."* Refuted at `dock.js` (both `renderSlot` calls are unconditional, differentiated only by `is-active` class + `inert` attribute).
- *"The producer's own version has the same shape."* Refuted — `ScrubberTimeline` takes `modelValue: Number` (a primitive, `dist/timeline.js`), so its prop diff *does* short-circuit. The array-boxing is the fork's own invention, forced by `<Slider>`'s reka array model.
- The *frame-cost* in ms is `UNPROVEN-NEEDS-LIVE`; the invalidation count is arithmetic.

**Cure shape** (not a patch — a shape): memoise on the integer, e.g. hold a `shallowRef<number[]>` updated only when `Math.round(anim.t*100)` actually changes, or bind `:model-value` to a cached array. One line, no behavioural surface change.

## L-M2 · MAJOR · Keyboard seeking is outside the scrub lifecycle → inoperative during playback, and it corrupts the trail

`onValueCommitStart` is reachable **only** from `@pointerdown` (`:49-51,73`). reka's keyboard path never goes near it: `SliderImpl.js:34-45` emits `stepKeyDown`/`homeKeyDown`/`endKeyDown`, and `SliderRoot.js:165-177` routes all three into `updateValues(…, { commit: true })`, which emits `update:modelValue` → the setter (`:37-40`) → `anim.seek(next)`.

Two consequences:

1. **Inoperative while playing.** `anim.startScrub()` never runs, so `stopRAF()` never runs, so the rAF loop is still live. `animation.ts:63` recomputes `startTime` only when it is `null`; on the very next `tick` (`:67-69`) `t.value` is overwritten from `elapsed`, discarding the keyboard seek entirely. Arrow-key scrubbing during playback is a no-op that *looks* like an input-lag bug.
2. **Trail corruption when paused.** With `anim.scrubbing` false, `trail.update` takes the `else` branch (`trail.ts:70-71`) and pushes a single tip point. A `Right`-arrow step is `+1%` = `Δt 0.01`, which does **not** trip the `t < this.lastT - 0.01` backwards guard, and a `Shift+Right` / `PageUp` step is `+10%` (`SliderRoot.js:170-171`, multiplier 10). The trail therefore draws a straight chord from the pre-seek tip to the post-seek tip across the Fourier curve. `Home`/`End` jump to 0/100: `Home` trips the backwards guard and self-heals; `End` does not, and draws a chord across the entire figure.

Note the *asymmetry with the producer*: `ScrubberTimeline`'s `onKeydown` handler is also outside its `scrubStart`/`scrubEnd` pair — so this is an inherited design gap, not a fork regression. It is nonetheless a live defect here because fourier's store makes `scrubbing` load-bearing for the render path, which the producer's does not.

**Falsifier:** if `@value-commit` fired on keyboard *and* the handler armed rather than only disarmed, the seek would park the clock. It does fire (`commit: true` at `SliderRoot.js:165,166,175`) — but `onValueCommit` (`:53-54`) early-returns because `scrubbing` was never set. Confirmed by reading both sides.

## L-M3 · MAJOR · The caret is positioned by raw `t` while its content is derived from `easedT` — the readout disagrees with the frame that is drawn

`GlassTimeline.vue:62-64` positions the caret at `anim.t * 100 + '%'` and renders `label` verbatim. `AnimationControls.vue:52-54` computes that label:

```ts
const caretLabel = computed(() =>
    isEpicycleOnly.value ? `t = ${anim.t.toFixed(2)}` : `N = ${currentLevel.value}`);
// :44  const pos = anim.easedT * (levels.length - 1);
// :47  return Math.max(1, Math.ceil(anim.easedT * epicycleData.components.length));
```

The canvas agrees with the *label*, not the position: `BasisCanvas.vue:196,231,239` all derive the drawn harmonic level from `anim.easedT`. The default easing is `sine` = `easeInOutSine` (`animation.ts:24`; `lib/easings.ts:79`), which is non-linear everywhere except `t ∈ {0, 0.5, 1}`.

Worked example (`components.length = 50`, default easing): at `t = 0.25`, `easeInOutSine(0.25) ≈ 0.1464`, so `currentLevel = ceil(7.32) = 8`. The caret and the slider's filled edge both sit at **25%** of the track — the position a viewer reads as "a quarter of the harmonics" ≈ 13 — while the caret text reads **`N = 8`** and the canvas draws 8. Position and readout are consistently ~40% apart through the first quarter of the sweep.

**Falsifier:** if the default easing were `linear` (`easings.ts:71` lists it as an option) the two coincide and the defect is invisible. The default is `sine` (`animation.ts:24` `ref<AnimationEasingName>("sine")`), so the defect is *on* by default. The magnitude of the perceived mismatch is `UNPROVEN-NEEDS-LIVE`; the arithmetic is not.

The cure spans two files (position by `easedT`, or label by `t`) — which is itself the finding: the raw-vs-eased axis is not owned anywhere, and `GlassTimeline` is the seam where the two meet.

## L-M4 · MAJOR · `data-held` is a dock-wide hold counter, not this slider's drag state — the caret's reveal is keyed on the wrong signal

`GlassTimeline.vue:102-105`:

```css
.timeline-row:hover .timeline-caret,
.timeline-row:has(.glass-slider[data-held]) .timeline-caret { opacity: 1; }
```

This is the one live `[data-held]` selector in the tree (corroborating lane-frontend.md:382). Tracing what sets it:

- `slider-DQ95MET2.js`: `let R = a(() => j?.held.value === !0)` … `"data-held": R.value || void 0` — where `j = useOptionalDockContext()`. **The attribute mirrors the dock's `held`, never the slider's own drag.**
- `dock.js` `useDockState`: `let … p = V(0), m = C(() => p.value > 0)` — `held` is a **counter** over `keepOpen()`/`release()` (`function I() { p.value++ … }`, `function L() { p.value = Math.max(0, p.value - 1) … }`), provided dock-wide as `{ keepOpen: L, release: R, held: O }`.
- Callers of `keepOpen()` inside the dock bundle include the slider's own `useDockHold` **and** a focus-guarded dock member (`dock.js`: `function b() { y.value || (y.value = !0, r?.keepOpen()) }` on focus-in, released on focus-out). `AnimationControls.vue:104` mounts a `<DockDropdownTrigger>` inside the same dock.

So the caret's "someone is scrubbing" affordance is actually "**the dock is held open for any reason**". The producer's twin avoids this precisely: `glass-ui.css` `data-v-a206e2d2` uses `.timeline-row:has(.glass-track:active) .timeline-caret{opacity:1}` — a self-scoped `:active`, not a shared flag.

**Falsifier:** if `held` were per-consumer the finding dies — refuted, it is a single `ref(0)` on `useDockState` shared by every dock member. **Mechanism CONFIRMED; the specific spurious-reveal instance (focus the ⋮ trigger → caret pops) is `UNPROVEN-NEEDS-LIVE`.** Secondary note: `:has()` + a child-component-owned class is also an unguarded coupling to a producer internal — if `glass-slider` is renamed at glass-ui 7.0.0 (the uplift the census books at §3a FE §5), this selector fails **silently**, and touch users lose the caret entirely since `:hover` never fires for them.

---

# MINOR

## L-m1 · MINOR · `--slider-scrub-track-height` does not exist — a dead declaration at two sites, silently discarding the intended geometry

`GlassTimeline.vue:124-126` sets `--slider-scrub-track-height: 24px`. `grep -rn "slider-scrub-track-height" node_modules/@mkbabb/glass-ui/dist` → **zero hits**. The real token is `--slider-track-height`:

```css
.glass-slider[data-size=md][data-v-534634a7]{--slider-track-height:1.25rem;--slider-thumb-size:1rem}
.slider-track[data-v-534634a7]{ … height:var(--slider-track-height,.375rem); … }
```

The track therefore renders at the `md` default **20px**, not 24px — and 4px short of the producer twin's `.glass-track{height:24px}`. `ConvergenceTimeline.vue:135-137` carries the identical dead property (`20px`), so the fork propagated the typo. **Falsifier:** a `--slider-scrub-*` alias in some other stylesheet — searched `dist/`, `dist/styles/`, and `web/src/style.css`; none.

## L-m2 · MINOR · Comment/code divergence, twice, and one of them inverts the truth

- `:120-123` — *"Retint the glass-scrubber variant tokens to match HEAD's foreground-tinted recipe (the variant defaults compose `--surface-tint-*`; HEAD used `color-mix(…)` which is equivalent…)"*. The rule that follows (`:124-126`) contains **no colour declaration of any kind** — only the dead height property of §L-m1. Nothing is retinted. The comment describes work that was removed or never landed.
- `:5-18` — the header's migration narrative is backwards, as established in §L-B1: the "175 LOC shadow recipe" with `glass-track`/`glass-fill`/`glass-thumb` paints is the producer's shipping `ScrubberTimeline`, not a local relic. A future reader is told the shadow was retired; the tree says it was re-forked, minus the `pointercancel` handler.

## L-m3 · MINOR · The scrub adapter is duplicated verbatim across two files with no shared composable

`GlassTimeline.vue:30-57` and `ConvergenceTimeline.vue:36-56` are the same 25 lines — same `scrubbing` ref, same `computed<number[]>` with `[Math.round(x * 100)]` / `Math.max(0, Math.min(1, (arr[0] ?? 0) / 100))`, same two handlers, same guard structure. Only the sink differs (store call vs `emit`). Both carry §L-B1's latch and §L-m1's dead token; a fix to one will not reach the other. Colocation: neither lives near the other (`components/visualization/` vs `components/equation/convergence/`), and `web/src/components/visualization/composables/` exists but holds no scrub adapter. Goldilocks: at 127 LOC the file is well-sized — the module-size axis is clean here; the failure is *distribution*, not size.

## L-m4 · MINOR · Two sources of truth for one boolean

`scrubbing` (`:30`, local) and `anim.scrubbing` (`animation.ts:114`, global) always move together in the happy path, and the local one exists only to guard against re-entry. But it makes the component the sole custodian of a flag the render path reads, with no reconciliation — which is precisely what turns §L-B1 from "a missed event" into "a permanent state corruption", and what makes the dual-mount desync in §L-B2 possible. The correct shape is one owner: either a store-side reference count (the pattern `visibleCanvases` already establishes at `animation.ts:43,99-106`) or a local-only flag with the store deriving from it.

## L-m5 · MINOR · Design-token drift against the producer's byte-identical rule — one of which is dark-mode-wrong

Line-for-line, local `:90-118` vs `glass-ui.css` `data-v-a206e2d2`:

| Property | Producer (`ScrubberTimeline`) | Fork (`GlassTimeline`) | Note |
|---|---|---|---|
| `.timeline-caret` transition | `opacity var(--duration-fast) var(--ease-standard)` | `opacity 0.2s ease` (`:96`) | `--duration-fast: 0.2s`, so timing matches; the **curve** drifts off the system standard |
| `.caret-value` font-size | `var(--type-small)` (a `clamp()` fluid step) | `@apply text-base` (`:110`) = 1rem fixed | scale token → utility; sizes differ and the fluid response is lost |
| `.caret-value` radius | `var(--radius-sm)` | `0.25rem` (`:111`) | hardcoded |
| `.caret-value` shadow | `var(--shadow-sm)` = `0 2px 8px color-mix(in srgb, var(--shadow-color) 6%, transparent)` | `0 2px 6px rgba(0, 0, 0, 0.1)` (`:116`) | **theme-blind**: a fixed black shadow under a dark surface |

This also contradicts the repo's own written rule, cited twice in adjacent files: *"A.W3.d — named properties + canonical token, no `transition: all`"* (`ConvergenceTimeline.vue:114`, `AnimationControls.vue:195`). The dark-mode shadow claim is CONFIRMED from the token definition; its **visual** severity is `UNPROVEN-NEEDS-LIVE`.

## L-m6 · MINOR · Dead indirection and a misnamed handler

`onPointerDown` (`:49-51`) is a one-line delegation to `onValueCommitStart` (`:43-47`) with no second caller (`grep onValueCommitStart` → one definition, one call). And `onValueCommitStart` names an event that does not exist: `Slider`'s emit surface is exactly `{ "update:modelValue", valueCommit }` (`Slider.vue.d.ts`); the function is bound to `pointerdown`. The name asserts a symmetry with `onValueCommit` that is the *precise* thing §L-B1 proves false — the naming actively conceals the bug.

---

# INFO

## L-i1 · INFO · Emit type is `number[] | undefined`; the setter's parameter is `number[]`

`Slider.vue.d.ts` declares `"update:modelValue": (payload: number[] | undefined) => any`. The setter (`:37`) is typed `(arr: number[])` via `computed<number[]>`, and its guard `(arr[0] ?? 0)` defends a missing *element*, not a missing *array* — `undefined[0]` throws `TypeError`. **Not currently reachable**: `SliderRoot.js:100-103` constructs `useVModel(props, "modelValue", emits, { passive: props.modelValue === void 0 })`; with `v-model` bound, `passive` is `false` and every emit assigns an array (`:131`). Graded INFO, not MAJOR, on that falsifier. It becomes live the moment anything binds `:model-value="undefined"` or reka changes the `passive` branch — and `vue-tsc` will not catch it, because the writable-computed target erases the `| undefined`.

## L-i2 · INFO · R5-7 (native template-loop invisibility) — not applicable *in* this file; it applies one level down, and §L-M1 is what drives it

`grep -c "v-for" GlassTimeline.vue` → **0**. The component's template is two elements and one child component; there is no native `li`/element loop for an instance-derived census to miss. Folded honestly: the R5-7 class does bite one level down — `slider-DQ95MET2.js` renders its thumbs with `renderList(t.modelValue, (e, t) => …, key: t)`, an index-keyed native loop over the **consumer-supplied** array. Any census that counts component instances sees one `<Slider>` and misses the loop, and any census that counts DOM sees a node whose cardinality is set by this file's `tArr` getter. §L-M1 is the consequence: the fresh-array identity re-runs that invisible loop 60×/s. So R5-7's contribution here is a *provenance* note — the loop's driver is in this file, its body is not.

## L-i3 · INFO · `aria-label="Timeline"` is hardcoded while a semantic `label` is in hand

`:71` hardcodes the accessible name while `:63` renders `label` (`"t = 0.42"` / `"N = 8"`) visually only. Screen-reader users get reka's raw `aria-valuenow` percentage and never the harmonic count. Also note `slider-DQ95MET2.js` re-applies `$attrs["aria-label"]` onto the thumb *while* the same attr falls through to the root — a duplicate-name condition owned by the producer, not this file. Flagged for the **A (a11y)** axis; recorded here only because the `label` prop's under-use is a contract observation.

## L-i4 · INFO · Disposition — this file should not exist

Folding CENSUS §3a Shadows (line 93) and lane-frontend.md:401-403 with the evidence above: `@mkbabb/glass-ui@4.0.0` already exports `./timeline` → `{ GlassTimeline, ContinuousTimeline, ScrubberTimeline, SegmentedTimeline }` (`dist/components/custom/timeline/index.d.ts` + the four `.vue.d.ts` files), and `grep -rn "glass-ui/timeline" web/src` → **0**. `ScrubberTimeline`'s surface is `{ modelValue: number = 0, label?: string }` emitting `{ update:modelValue, scrubStart, scrubEnd }` — a near-exact match for what `AnimationControls` needs, on a **primitive** model (killing §L-M1), with `pointercancel` teardown (killing §L-B1) and a self-scoped `:active` reveal (killing §L-M4). The `[0..1]`↔`[0..100]` adapter, the array boxing, and the caret CSS all disappear with the file. lane-frontend.md:641 already books this as **[P2] → F.W3**; this challenge upgrades the rationale from *"it is a shadow"* to *"the shadow is behaviourally worse than the thing it shadows, in two blocker-grade ways."*

---

# SUPERLATIVES (L-18, both ways)

## L-S1 · The `t` axis is clamped on both sides of the seam

`:38` clamps in the setter (`Math.max(0, Math.min(1, …))`) **and** `animation.ts:129` clamps again inside `seek()`. Belt-and-braces on the single scalar that every downstream consumer keys off — `BasisCanvas.vue:140,144,322,329` (`fourierPositionsAt`, `trail.update`), `easedT` (`animation.ts:27-30`), `currentLevel` (`AnimationControls.vue:44,47`). `arr[0] ?? 0` additionally survives an empty array. **Falsifier:** an unclamped path into `t` — grep for writers of `t.value` finds `animation.ts:69` (arithmetic on `frac`, structurally in `[0,1]`), `:129` (clamped), `:134` (literal 0). None escapes. Rare discipline: most adapters clamp once and trust the peer.

## L-S2 · The two-way `computed` is round-trip stable — the classic adapter bug is absent

For every integer `k ∈ [0,100]`, `get(set(k)) === k`: `Math.round(clamp(k/100) * 100) === k` exactly, because `k/100` is representable-adjacent and `round` recovers it. There is no getter↔setter oscillation, no `watch` pair, no ref mirror, no `nextTick` dance. This is precisely the failure mode this codebase has been bitten by before (project memory: *"`shallowRef` + `defineModel` caveat — reads after writes return stale data"*), and the writable-`computed` shape sidesteps it structurally rather than with a cache. **Falsifier:** a `k` where the round-trip drifts, or a reactive cycle — neither exists in `[0,100]`.

## L-S3 · `pointer-events: none` on the caret is load-bearing, and correct

`:94` (plus `user-select: none` at `:98-99`). The caret is absolutely positioned directly above the track at the live value — exactly the coordinate a user aims at. Without `pointer-events: none` it would swallow presses near the current position, which is *the* null-delta press of §L-B1 door 1; the fork would have made its own worst bug trivially reproducible. **Falsifier:** remove the declaration and the caret becomes a hit target at the one x-position where a press cannot commit. Getting this right on a `bottom: calc(100% + 6px)` overlay is not automatic.

## L-S4 · The override channel is the right one

`class="timeline-slider"` (`:72`) rides `Slider`'s **declared** `class` prop (`Slider.vue.d.ts` → `class?: HTMLAttributes['class']`, merged through `cn()` in `slider-DQ95MET2.js`) rather than an attribute-selector reach-in, and the only style override attempted is a **CSS custom property** (`:124-126`) — the sanctioned handoff for a design-system component. Zero `:deep()`, zero `!important`, zero element-selector reach into producer internals. Contrast this file's own parent, `AnimationControls.vue:139-187`, which paints `.play-btn` with raw `rgba()`, `backdrop-filter`, and two pseudo-element gradient stacks. The property *name* is wrong (§L-m1); the *channel* is exemplary, and channel is the part that survives a producer uplift.

## L-S5 · Scoped-CSS discipline is total

One `<style scoped>` block, 49 lines, styling exactly the two elements this component owns plus the custom-property handoff. No global `<style>` escape hatch — again in contrast to its parent, which ships an unscoped block (`AnimationControls.vue:203-224`) for the portaled menu. **Falsifier:** any unscoped rule or `:deep()` in the file — none. This is the reason the fork's class-name collision with the producer's `.timeline-row`/`.timeline-caret`/`.caret-value` (`data-v-a206e2d2` vs the local scope id) is **harmless**: two independently scoped copies of the same three names coexist in one stylesheet without interference. The discipline is what makes an otherwise-serious duplication inert at the CSS layer.

---

## Provenance ledger

| ID | Sev | Anchor | Falsifier status |
|---|---|---|---|
| L-B1 | BLOCKER | `GlassTimeline.vue:43-57,73-74`; `SliderRoot.js:114-119`; `SliderImpl.js:57-63`; `trail.ts:48-72`; `animation.ts:114-126` | CONFIRMED (4 falsifiers run); door frequency UNPROVEN-NEEDS-LIVE |
| L-B2 | BLOCKER | `GlassTimeline.vue` (no lifecycle hooks, `:20`); `FullscreenViewer.vue:107,130-131`; `VisualizationView.vue:236,282` | CONFIRMED |
| L-M1 | MAJOR | `GlassTimeline.vue:35-37,62`; `animation.ts:22-23,69`; `dock.js` (both slots unconditional); `AnimationControls.vue:60-61` | CONFIRMED; frame-cost ms UNPROVEN-NEEDS-LIVE |
| L-M2 | MAJOR | `GlassTimeline.vue:49-57`; `SliderRoot.js:165-177`; `SliderImpl.js:34-45`; `animation.ts:63,67-69`; `trail.ts:48,70-71` | CONFIRMED |
| L-M3 | MAJOR | `GlassTimeline.vue:62`; `AnimationControls.vue:44,47,52-54`; `BasisCanvas.vue:196,231,239`; `animation.ts:24`; `easings.ts:79` | CONFIRMED (arithmetic); perceived magnitude UNPROVEN-NEEDS-LIVE |
| L-M4 | MAJOR | `GlassTimeline.vue:102-105`; `slider-DQ95MET2.js` (`data-held` ← `j?.held`); `dock.js` (`p=V(0)`, `m=C(()=>p.value>0)`); `glass-ui.css` `data-v-a206e2d2` | mechanism CONFIRMED; instance UNPROVEN-NEEDS-LIVE |
| L-m1 | MINOR | `GlassTimeline.vue:124-126`; `ConvergenceTimeline.vue:135-137`; `glass-ui.css` `.glass-slider[data-size=md]` | CONFIRMED |
| L-m2 | MINOR | `GlassTimeline.vue:5-18,120-126`; `dist/timeline.js` `ScrubberTimeline` | CONFIRMED |
| L-m3 | MINOR | `GlassTimeline.vue:30-57`; `ConvergenceTimeline.vue:36-56` | CONFIRMED |
| L-m4 | MINOR | `GlassTimeline.vue:30`; `animation.ts:43,99-106,114` | CONFIRMED |
| L-m5 | MINOR | `GlassTimeline.vue:96,110,111,116`; `glass-ui.css` `data-v-a206e2d2`; `styles/tokens/*` | CONFIRMED; visual severity UNPROVEN-NEEDS-LIVE |
| L-m6 | MINOR | `GlassTimeline.vue:43-51`; `Slider.vue.d.ts` emit surface | CONFIRMED |
| L-i1 | INFO | `Slider.vue.d.ts`; `GlassTimeline.vue:35-40`; `SliderRoot.js:100-103,131` | CONFIRMED unreachable today |
| L-i2 | INFO | `GlassTimeline.vue` (0 `v-for`); `slider-DQ95MET2.js` `renderList(t.modelValue,…)` | CONFIRMED N/A-in-file, applies one level down |
| L-i3 | INFO | `GlassTimeline.vue:63,71`; `slider-DQ95MET2.js` (`$attrs["aria-label"]` on thumb) | CONFIRMED; A-axis referral |
| L-i4 | INFO | CENSUS §3a:93; lane-frontend.md:401-403,641; `dist/components/custom/timeline/index.d.ts` | CONFIRMED |
| L-S1..L-S5 | SUPERLATIVE | see each | all falsifiers run |

**Totals — defects 16 · blockers 2 · superlatives 5.**

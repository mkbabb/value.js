claude-opus-5[1m]

# CHALLENGE · EasingScene · axis C (CONSUMPTION)

**Subject** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/easing/EasingScene.vue` (133 L)
**Axis** how this scene consumes keyframes.js (the library) and glass-ui (the design system): subpath
choices, shadow components, value.js transitive exposure, props/emits contract quality, integration
seams with siblings.
**Method** static only, source-derived. No browser (owner law). Read whole: the scene + every file in
its import closure (`useEasingDemo.ts`, `easingKeys.ts`, `EasingTarget.vue`, `EasingSidebar.vue`,
`PlaybackRibbon.vue`, `AnimationVisualizer.vue`) + the seams it binds (`sceneExposedApi.ts`,
`App.vue`, `controlSurfaces.ts`, `scene-facility/index.ts`, `ControlsPaneWrapper.vue`,
`ChannelControls.vue`) + the library it reaches (`engine/animation.ts`, `option-setters.ts`,
`options.ts`, `compile/easing/easing-option.ts`, `easing-registry.ts`) + the installed vendor
artifacts (`node_modules/@mkbabb/value.js@4.0.0`, `node_modules/@mkbabb/glass-ui@7.0.0`). Four value.js
behaviours were **executed** against the installed tarball (probe transcripts inline) rather than
asserted.
**Posture** the component is presumed DEFECTIVE until the tree proves otherwise; every claim carries
its own falsifier and dies if the falsifier fires. Live-only claims are marked
`UNPROVEN-NEEDS-LIVE` for SS-13.

**Tally** 15 defects (1 BLOCKER · 6 MAJOR · 6 MINOR · 2 INFO) · 5 superlatives.

---

## 0 · The consumption map (what this scene actually reaches)

| entry point | via | declared? |
|---|---|---|
| `@mkbabb/value.js/math` (`clamp`) | `EasingScene.vue:9`; again `useEasingDemo.ts:22` | ✅ `package.json:"dependencies"` `@mkbabb/value.js: 4.0.0` |
| `@mkbabb/value.js/math` (`cubicBezierToString`) | `useEasingDemo.ts:2`, `EasingTarget.vue:140` | ✅ |
| `@mkbabb/value.js/easing` (`JumpPosition`, `bezierPresets`) | `useEasingDemo.ts:1`, `EasingSidebar.vue:77` | ✅ |
| `@mkbabb/keyframes.js` LIGHT (`NumericAnimation`, `KeyframesAnimation` type) | `useEasingDemo.ts:6-7` | ✅ self-alias, `vite.config.ts:38` |
| `@mkbabb/keyframes.js` HEAVY (`CSSKeyframesAnimation`) | `kfEngine()` — `useEasingDemo.ts:24,288` | ✅ dynamic boundary |
| `@mkbabb/glass-ui` root (`Card`, `CardContent`, `Button`, `Slider`, `useTouchGate`) | `EasingSidebar.vue:70`, `EasingTarget.vue:136`, `PlaybackRibbon.vue:92`, `AnimationVisualizer.vue:52` | ❌ **F-1** |
| `@mkbabb/glass-ui/labeled-field`, `/easing`, `/fading-scroll`, `/chip`, `/toggle-group`, `/tooltip` | `EasingSidebar.vue:71,72`, `EasingTarget.vue:137,138,139`, `PlaybackRibbon.vue:94` | ❌ **F-1** |

**7 distinct glass-ui entry points, 0 declared. 2 value.js subpaths, both declared.**

---

## C-1 · BLOCKER — the facility declares a PAINTING channel over a TARGETLESS animation, and that one field manufactures three surfaces the scene believes do not exist

**Claim.** `EasingScene` exposes `facility` (`EasingScene.vue:116`) whose sole channel carries
`animation: previewAnim` (`useEasingDemo.ts:351-359`). `previewAnim` is constructed with **no
targets** (`useEasingDemo.ts:289-301` — `new CSSKeyframesAnimation({...}).fromString(...)`, the
2nd..nth constructor rest-arg `...targets: HTMLElement[]` (`css-animation.ts:56-59`) is never passed)
and is **never played** (`grep previewAnim` over the scene: only `.name`, `.superKey`, `.reversed`,
`.t`, `setTimingFunction`, `setDuration`, `options.duration` — never `.play()`, never
`.setTargets`/`targets =`, in the scene or in `useSceneMachineShellBinding.ts`). Its default renderer
is `transformTargetsStyle(vars, this.targets)` over `[]` (`engine/animation.ts:155-156, 198-199`) —
it paints nothing, anywhere, ever.

The `ChannelHandle` contract is explicit about what that field means:

> `/** Present ⇒ the triad is HONEST for this channel (it paints). */ animation?: KeyframesAnimation<any>;`
> — `demo/composables/scene-facility/index.ts:35-36`

and the T.B2 derivation reads it as a boolean oracle:

> `const base: ControlSurface[] = selected?.animation ? [...BUILT_IN_SURFACES] : [...(selected?.surfaces ?? [])];`
> — `demo/state/controlSurfaces.ts:107-109`

**Therefore, for the easing scene at HEAD:**
`surfacesFor(facility, "Easing")` = `["controls","keyframes","timeline"]` (base, because
`animation` is truthy) `∪ []` (no channel facets) `∪ ["easing"]` (facility facet,
`useEasingDemo.ts:361`) = **4 surfaces**. `App.vue:247-257` feeds exactly this to the machine
(`watchEffect(() => machine.setActiveSurfaces(derivedSurfaces.value))`, `App.vue:257`), and
`useSceneMachine.ts:308` re-publishes it verbatim — **no per-scene filter survives anywhere in the
chain**. `useSceneMachineShellBinding.ts:105-112` seats `selectedAnimation = "Easing"`, so the host
mounts: `ControlsPaneWrapper.vue:207-218` (`controlHosts` = channels *with* an animation) →
`ChannelControls :animation="host.animation"` (`ControlsPaneWrapper.vue:60`).

**What that materially mounts for a curve-gallery scene:**
- `ChannelOptions` over `previewAnim` (`ChannelControls.vue:104-116`) — including
  `TimingFunctionPanel.vue:145-146`, which writes `props.animation.options.timingFunction` **directly**;
- the **Monaco** keyframes pane, force-mounted (`ChannelControls.vue:129-147`) — the file's own
  comment three lines above says *"the easing scene never spins up the Monaco keyframes pane"*
  (`ChannelControls.vue:88-90`);
- `KeyframeTimeline :targets="animation.targets"` (`ChannelControls.vue:192-196`) — bound to `[]`.

**The scene's own header states the opposite world:**
> *"The easing scene's ONLY valid control surface is `easing` … `CONTROL_SURFACES.easing = ['easing']` … the built-in controls/keyframes/timeline triggers no longer exist for this scene"* — `EasingScene.vue:23-27`

so does the shell's: *"the easing scene → [], so NO keyframes/timeline tab node exists for it"*
(`App.vue:200-203`). Both cite a table that `controlSurfaces.ts:4-6` records as **DELETED** ("the
deleted `CONTROL_SURFACES` / `CONDITIONAL_SURFACES` rows").

**Why this is the scene's defect, not the derivation's.** The derivation is honest — it asks "does
this channel paint?". The scene answers *yes* for an animation that cannot paint. The honest
declaration for a clock-only channel already exists in the same interface: omit `animation` and
declare `surfaces` (`scene-facility/index.ts:37-38`; `sequence` uses it). The T.B1-β comment at
`useEasingDemo.ts:279-287` even bills `previewAnim` as "ONE REAL `CSSKeyframesAnimation` whose
keyframes ARE the preview sweep (translateX 0→100%, the ball's rail)" — the ball on the rail is
painted by `EasingTarget.vue:254-259` (`el.style.transform = translateX(...)` from
`fnForCurve(...)`), **not** by `previewAnim`. The decoy T.B1-β declares dead has been re-declared
as a first-class painting channel.

**Falsifier.** Any one of: (a) a `targets`/`setTargets` binding onto `previewAnim` anywhere in the
tree; (b) a per-scene filter between `surfacesFor` and `ChannelControls.hasSurface` (I traced
App.vue:247 → useSceneMachine.ts:136/308 → ChannelControls.vue:297-302 and found none); (c)
`storedControls.selectedAnimation` failing to seat "Easing" (contradicted by
`useSceneMachineShellBinding.ts:108-112`). **Live confirmation of what the user sees is
UNPROVEN-NEEDS-LIVE** — the four dock tabs and the empty timeline are a source-derived consequence,
not an observed screenshot.

---

## C-2 · MAJOR — `ribbonContent` returns `null` on three now-reachable surfaces, deleting the entire transport

`EasingScene.vue:94-110`: `slotProps.selectedControl === "easing" ? h(PlaybackRibbon, …) : null`.
Under C-1 the user can select `controls` / `keyframes` / `timeline` from the dock or the in-panel
strip (`ChannelControls.vue:78-86`), at which point the **only** transport in the ribbon bar
(scrubber Slider + Play/Pause + Reverse + `AnimationVisualizer`) unmounts. `RibbonBar.vue:112` slots
whatever the scene returns; nothing else fills the band.

This is the identical string-literal gate cube uses (`CubeScene.vue:183-184`), but cube's gate is
*additive* (its ribbon extras sit beside a transport it does not own) whereas easing's gate is
*subtractive* — it owns the primary transport and withdraws it. The gate is also a hard-coded
duplicate of a `ControlSurface` union member (`controlSurfaces.ts:41-47`): renaming the surface
silently yields a permanently empty ribbon, with no type error (see C-7).

**Falsifier.** C-1 dying (surfaces really are `["easing"]`), or a fallback transport rendered by
`RibbonBar`/`ControlsPaneWrapper` when the scene slot returns null — I read both
(`ControlsPaneWrapper.vue:88-100`, `RibbonBar.vue:105-120`); there is none.

---

## C-3 · MAJOR — `tabsContent` is UNGATED, against the host's documented contract

`EasingScene.vue:57`: `const tabsContent = () => h(EasingSidebar, { demo });` — unconditional.

The host renders that slot **ungated** in the multi-surface branch:
`ChannelControls.vue:180` `<slot name="tabs-content"></slot>`, sitting *after* the three gated
`role="tabpanel"` divs, under the comment:

> *"Scene-specific panels … flow through the `tabs-content` slot AS BEFORE; **the scene gates its own body on the active surface**."* — `ChannelControls.vue:174-179`

Cube honours it (`CubeScene.vue:170-172` gates on `selectedControl === "matrix-controls"`); easing
does not. Consequence under C-1: with `controls` selected, `ChannelOptions` **and** the whole
`EasingSidebar` (EasingPicker canvas + duration slider) render stacked in one scroll column. The
`v-if="isSingleSurfaceScene"` flat-mount branch that would make the omission safe requires
`machine.controlSurfaces.value.length === 1 && builtInTabs.length === 0`
(`ChannelControls.vue:332-337`) — false for easing at HEAD.

**Falsifier.** C-1 dying, or a gate inside `EasingSidebar` (there is none — `EasingSidebar.vue:14`
is an unconditional `<Card>` root).

---

## C-4 · MAJOR — the scrub rail's `max` is bound to a field that Vue can never observe, and the scene is the one that mutates it

`PlaybackRibbon.vue:119-121`:
```ts
const effectiveDuration = computed(() => animation?.options.duration ?? source?.duration ?? 1);
```
consumed as the Slider's `:max` (`PlaybackRibbon.vue:19`).

`animation` is `demo.previewAnim` — `markRaw` (`useEasingDemo.ts:289`) and, independently, a prop
value (Vue props are *shallow*Reactive: nested fields are never tracked). So this computed's only
dependency is the **identity** of `props.animation`, which is stable for the scene's whole life. It
evaluates once and is never invalidated.

The scene then mutates exactly that field. `EasingSidebar.vue:53-63` binds a `LabeledSlider`
(300 → 5000 ms) to `demo.duration`; `useEasingDemo.ts:316-318` watches it into
`previewAnim.setDuration(d)`; `option-setters.ts:46-62` (`applyDuration`) assigns
`anim.options.duration = d` in place. Meanwhile `currentT` **does** track the new duration, because
the scene recomputes it per render from the reactive `progress`
(`EasingScene.vue:100` — `demo.progress.value * demo.previewAnim.options.duration`).

**Failure.** Move the duration slider 1500 → 5000. `max` stays 1500; `currentT` now ranges to 5000.
The thumb geometry saturates at/past the rail end for every `progress ≥ 0.3`. Inversely, a scrub
emits `effectiveT ∈ [0, 1500]`, which `EasingScene.vue:72-75` divides by the **current** 5000 →
`progress` can never exceed 0.3. The scrubber becomes a 30 % rail with a pinned thumb.

**Consumption framing.** The ribbon's `animation.options.duration` contract is unsatisfiable by any
consumer with a mutable duration; the ribbon offers a second, observable path for exactly this case
(`source.duration`, `PlaybackRibbon.vue:105-111`). Easing is the only scene with a user-facing
duration control and it picked the unobservable path.

**Falsifier.** Show `effectiveDuration` re-evaluating after a `setDuration` — it would require
`props.animation` identity to change (it does not: one `markRaw` instance for the scene's life) or
`options` to be reactive (it is not: `markRaw` + shallow props). A `:key` remount of `PlaybackRibbon`
on duration change would also kill this; `EasingScene.vue:96-109` passes no key.

---

## C-5 · MAJOR — the ribbon is bound to the 6 Hz COLD path while the 60 Hz value sits exported and unused

`useEasingDemo.ts:164` `const readout = useThrottledReadout(PROGRESS_READOUT_HZ)`, with
`PROGRESS_READOUT_HZ = 6` (`demo/utils/rafConstants.ts:16`). The reactive `progress` ref is written
**at most 6×/s** by design (`useEasingDemo.ts:191-193`), and the composable exports the always-current
60 Hz value for consumers that need it: `liveProgress()` (`useEasingDemo.ts:169-171, 378`).

`EasingScene.vue:100` binds the ribbon's `currentT` to `demo.progress.value` (6 Hz) — the Slider
thumb therefore advances in ~167 ms jumps. Worse, the same 6 Hz ref is the only writer of the
animation clock the visualizer polls: `useEasingDemo.ts:325-328` (`watch(progress, p => previewAnim.t
= p * duration)`) → `AnimationVisualizer.vue:240-248` reads `anim.effectiveT` in a per-frame rAF loop.
A 60 Hz loop sampling a 6 Hz source paints a 6 Hz staircase.

The sibling scene that mounts the same component already diagnosed and cured this class:

> *"the scrubber thumb reads the CONTINUOUS 60 Hz position channel (`scrubberPhase`), NOT the 6 Hz `progress` text mirror that made the thumb visibly STEP"* — `SpringScene.vue:113-119`

Easing consumes the mirror spring rejected, with `liveProgress()` — the exact analogue of
`scrubberPhase` — already exported and reaching zero consumers (see C-11).

**Falsifier.** A smoothing/interpolating layer inside `PlaybackRibbon` or the Slider (there is none:
`PlaybackRibbon.vue:20` passes `[currentT]` straight through), or `progress` being written per frame
(contradicted by `useEasingDemo.ts:186-193` — the per-frame write is `livePhaseValue`, non-reactive).
The **perceptual** severity of the stepping is `UNPROVEN-NEEDS-LIVE`; the cadence arithmetic is not.

---

## C-6 · MAJOR — `Reverse` reverses nothing, and inverts the scrub mapping while pressed

`EasingScene.vue:77-82`:
```ts
const onToggleReverse = () => { userReversed.value = !userReversed.value;
                                demo.previewAnim.reversed = userReversed.value; };
```

**(a) It does not reverse the motion.** The sweep is `useEasingDemo.ts:173-195`; its phase is
`((now - startTime) / (duration*2)) % 1`, monotonically increasing, and the balls are painted from
`livePhaseValue` (`EasingTarget.vue:254-259`). Neither `userReversed` nor `previewAnim.reversed` is
read by the loop, the painter, or `usePainterRegistry`. `previewAnim` is never played
(`KeyframesAnimation.reversed` is a delegate onto `_playback.reversed`,
`engine/animation.ts:95-96`), so the flag only alters `effectiveT` for readers of that one object.

**(b) While pressed, it inverts the scrub.** `PlaybackRibbon.vue:181-194`:
`rawT = animation.reversed ? duration - effectiveT : effectiveT`, emitted as `sliderUpdate.t`.
`EasingScene.vue:72-75` seats `progress = rawT / dur`; `EasingScene.vue:100` re-renders the thumb at
`progress * dur = rawT`. Forward: drag to *x* → thumb at *x* (stable). Reversed: drag to *x* → thumb
lands at `dur − x`. The display half of the mirror is missing — `currentT` is a *raw* t handed to a
control the ribbon treats as *effective* t.

**(c) The visualizer's mirror is incidental.** `AnimationVisualizer.vue:243-246` reads
`anim.effectiveT` (`engine/animation.ts:451-452`), which does honour `reversed` — but only re-samples
inside its rAF loop, whose guard is `props.isPlaying || isDragging`
(`AnimationVisualizer.vue:248`). Pressing Reverse while paused repaints nothing.

`SpringScene.vue:93-96` carries the identical two-line handler, so this is a **class** across the two
PlaybackRibbon consumers, not an easing typo — but easing is the scene where the sweep, the balls and
the scrub all disagree with the button.

**Falsifier.** Any read of `userReversed`/`previewAnim.reversed` in the sweep, the painter registry or
`EasingTarget` (grepped: none), or a `currentT` computation that applies the reverse mapping
(`EasingScene.vue:100` does not).

---

## C-7 · MAJOR — the scene's entire consumption contract is statically unverified: no `satisfies`, and no SFC typechecker in the repo

`SceneExposedApi` exists and is properly typed (`demo/app/scene/sceneExposedApi.ts:16-34`), and the
consumer side is typed (`App.vue:209` `shallowRef<SceneExposedApi | null>`). But:

1. **No scene binds to it.** `grep -rn "SceneExposedApi" demo/` → 4 hits, all on the *reader* side
   (`App.vue`, `useSceneMachineShellBinding.ts`, the definition). `EasingScene.vue:112`
   `defineExpose({...})` has no `satisfies SceneExposedApi`, as do all 6 sibling scenes.
2. **Nothing could check it if it did.** `vue-tsc` is **not** a devDependency
   (`package.json` devDeps contain `vue`, `@vitejs/plugin-vue`, `@vueuse/core` — no `vue-tsc`; the
   sole lockfile hit is a transitive peer range). `npm run check` is `tsc --noEmit` + the test project
   (`package.json:"check"`), and plain `tsc` does not read `.vue`. CI runs only
   `npm run check:lib` (`.github/workflows/ci.yml:41-42`, `release.yml:42-43`) = `tsconfig.lib.json`,
   `src/` only. `.vue` imports resolve through `demo/env.d.ts:3-6`:
   `DefineComponent<{}, {}, any>` — **props typed as `{}`**.

**Consequences specific to this scene.** Every consumption call it makes is a render-function prop
bag against an `any` component: `h(PlaybackRibbon, {...})` (`EasingScene.vue:96-109`) — 5 props + 5
`on*` handlers, none checked against `PlaybackRibbon.vue:98-132`; `h(EasingSidebar, { demo })`
(`EasingScene.vue:57`) against `EasingSidebar.vue:82`. A misspelt `isAnimStarted`, a dropped
`userReversed`, or the C-2 surface-literal drift are all silent. The `isStarted` type mismatch in
C-14 is a live instance of exactly this blind spot.

**Falsifier.** A `vue-tsc`/`vti` invocation anywhere in `package.json` scripts or `.github/workflows/`
(searched all three workflow files), or a `satisfies SceneExposedApi` on any scene's `defineExpose`.

---

## C-8 · MAJOR — a reachable `steps(1, jump-none)` throws inside the vendor picker the scene mounts by default

`EasingSidebar.vue:27-36` mounts `EasingPicker` from `@mkbabb/glass-ui/easing` and its steps mode is
first-class for this scene (`seedFor` emits `mode:"steps"` for `steps`/`step-start`/`step-end`,
`EasingSidebar.vue:99-110`). Inside glass-ui 7.0.0 the picker's easing computed is:

```js
l = d(() => { if (n.value === "steps") return H("EasingPicker:steppedEase", F(s.value, c.value)); … })
function H(e, t) { if (!t.ok) throw Error(`${e}: ${t.error.code}`); return t.value; }
```
— `node_modules/@mkbabb/glass-ui/dist/easing.js` (`F` = `steppedEase` from `@mkbabb/value.js/easing`,
`H` = the throwing unwrapper). Step count is clamped to `[1,12]` (`Math.max(1, Math.min(12, …))`) and
the term list handed to the UI is `terms: P` = value.js's **full** `jumpTerms`.

Executed against the installed value.js 4.0.0:
```
jumpTerms [ 'jump-start', 'jump-end', 'jump-none', 'jump-both' ]
steppedEase(1,jump-start) ok
steppedEase(1,jump-end)   ok
steppedEase(1,jump-none)  ERR {"code":"step_count_invalid"}
steppedEase(1,jump-both)  ok
```
So `steps = 1 ∧ term = "jump-none"` — both individually reachable from the picker's own controls —
puts a **throw inside a Vue computed** in the scene's default-mounted facet body. And this
combination is one click from a seeded state: `EasingSidebar.vue:106-109` seeds
`{ steps: 1, term: "jump-start" }` for the `step-start` tile and `{ steps: 1, term: "jump-end" }` for
`step-end`; the user then only has to change the term dropdown.

The demo's own mirror of the same call is equally unguarded (`timingCurveUtils.ts:34-38`
`requireEasing(steppedEase(count, position), …)` throws), reached via
`useEasingDemo.ts:84-89` — latent only because that computed is dead (C-11).

**Falsifier.** A guard inside `EasingPicker` that disables `jump-none` when `steps === 1` (or clamps
`steps ≥ 2` for `jump-none`) — I found the clamp (`Math.max(1, …)`) and the unfiltered `terms: P`
export in the dist bundle and no such coupling, but **the rendered control set is
UNPROVEN-NEEDS-LIVE**: if the picker's term control is a `Select` that omits `jump-none`, this claim
dies. The value.js rejection and the throwing unwrapper are proven.

---

## C-9 · MINOR — "the COMPLETE re-parseable literal, never truncated" is falsified by `cubicBezierToString` itself

`EasingTarget.vue:31-40` renders the header literal beside a `CopyButton`, under
`EasingSidebar.vue:2-13`'s claim of *"the COMPLETE re-parseable readout literal with copy — the F7
truncation class is dead by construction"* and `EasingTarget.vue:16-19`'s *"COMPLETE and re-parseable,
never truncated"*. The literal for an editable curve is
`cubicBezierToString(...demo.bezierControlPoints.value)` (`EasingTarget.vue:213-216`).

Executed against value.js 4.0.0 `@mkbabb/value.js/math`:
```
cubicBezierToString(0.215, 0.61, 0.355, 1)  →  "cubic-bezier(0.21, 0.61, 0.35, 1.00)"
cubicBezierToString(0.005, 0.999, 0.123, 0.456) → "cubic-bezier(0.01, 1.00, 0.12, 0.46)"
```
Two decimals. Both upstream sources of the quad carry **three**: `NAMED_EASING_BEZIER`
(`animationDescriptions.ts:20-49` — `0.735`, `0.045`, `0.215`, `0.575`, …) and the picker
(`+a.toFixed(3)`, glass-ui `dist/easing.js`). So `ease-out-cubic` (`0.215, 0.61, 0.355, 1`) copies as
`0.21 / 0.35` — a different curve on re-parse.

Compounding: the same truncated string is what re-seats the animation
(`useEasingDemo.ts:308-315` → `setTimingFunction(cssValue)`), while the scene's own curve function
uses the **untruncated** quad (`useEasingDemo.ts:82` `cubicBezierEasing(...bezierControlPoints)`). The
ribbon's visualizer and the scene's math run measurably different curves.

**Falsifier.** A `cubicBezierToString` that preserves ≥3 significant decimals in some other value.js
build — the executed output above is from the installed 4.0.0 tarball this repo pins exactly.

---

## C-10 · MINOR — the copied "CSS literal" is not CSS for the majority of the gallery

`EasingTarget.vue:217-219` returns the bare curve **name** as the literal for every engine-named
curve, rationalised as *"value.js round-trips it by registry lookup"*. True for value.js; false for
CSS. Executed against `@mkbabb/value.js/css` `parseTimingFunction`:
```
"ease"              ok:keyword
"step-start"        ok:steps
"steps(4, jump-end)" ok:steps
"ease-in-sine"      ERR      ← rescued only by kf's own registry map
"ease-in-bounce"    ERR
"smooth-step-3"     ERR
```
`easing-registry.ts:123-136` rescues these via `timingFunctionRegistry` (built from
`bezierPresets` ∪ `"ease-in-bounce"` ∪ `DIRECT_NAMES`, `easing-registry.ts:30-46`) — so the *library*
seam is fine. But the UI presents the string as a code literal (`data-register="code"`, mono face,
`CopyButton label="Copy easing literal"`), and 26 of the ~31 gallery tiles copy a token that is
invalid in a stylesheet. The honest literal for those is the bezier quad the scene already holds.

**Falsifier.** A CSS spec or browser accepting `animation-timing-function: ease-in-sine`, or the copy
affordance being labelled as a value.js identifier rather than a CSS literal.

---

## C-11 · MINOR — four exported computeds on the injected context have zero consumers (one is a latent throw)

Repo-wide grep (`demo/`, `test/`, `scripts/`) for `svgPath` · `currentEasingFn` · `currentFamily` ·
`comparisonCurves` returns **only** their definitions and their re-export in `useEasingDemo.ts`
(78-131, 383-389) — plus a prose mention in a driver comment (`scripts/lib/demo-driver.mjs:110`). The
T.E6 gallery redesign replaced them (`EasingTarget.vue` computes its own portraits via
`getCurvePath`/`fnForCurve`, `:175-198`) and the removal of the consumers was not followed by the
removal of the producers.

They are dead **API surface** on `EasingDemoContext`, which is `ReturnType<typeof useEasingDemo>`
(`easingKeys.ts:4`) — i.e. the injected contract every future consumer sees. They also keep 5 imports
alive (`generateCurveSVGPath`, `generateStepSVGPath`, `cubicBezierEasing`, `steppedEasing`,
`getFamilyForCurve`/`getFamilyCurves`, `useEasingDemo.ts:9-16, 26-29`). And `currentEasingFn`
(`:78-91`) is the latent C-8 throw site: the moment anything reads it under
`stepOptions = {1, "jump-none"}`, `requireEasing` raises inside a computed.

**Falsifier.** A consumer outside `demo/`, `test/`, `scripts/` — the repo has no other source root
(`tsconfig.json:"include": ["src/","demo/"]`).

---

## C-12 · MINOR — the `scrubbed` emit is declared, documented as keyboard-critical, and left unbound

`PlaybackRibbon.vue:126-128` declares:
> *"Wake-only: fires on EVERY scrub (pointer, keyboard, or visualizer) so a settled sync loop re-arms even on a keyboard-arrow nudge."*

`EasingScene.vue:96-109` binds `onTogglePlay`, `onToggleReverse`, `onSliderUpdate`, `onScrubStart`,
`onScrubEnd` — not `onScrubbed`. Pause-on-scrub is therefore pointer-only:
`onScrubStart` is fired from `useDragCapture` (`PlaybackRibbon.vue:148-151`, driven by
`gatedSliderDown`, `:167-179`). A keyboard-arrow scrub while playing writes `demo.progress` and is
then discarded on the next frame — `useEasingDemo.ts:181` reconciles `progress ← livePhaseValue` and
the `watch(progress)` reconciler is explicitly gated off while the loop runs
(`useEasingDemo.ts:335-338` `if (!playback.running)`). Keyboard scrubbing during playback is a no-op.

**Falsifier.** A reka/glass-ui `Slider` that synthesises `pointerdown` for keyboard interaction, or a
pause path other than `onScrubStart`.

---

## C-13 · MINOR — two seam comments assert sibling parity that does not exist at HEAD

1. `EasingScene.vue:60-61` and `SpringScene.vue:70-71`: *"the STANDARD PlaybackRibbon (the SAME
   component cube/amiga mount)"*. `grep -rn PlaybackRibbon demo/` → imported by **EasingScene and
   SpringScene only**; `CubeScene.vue:183-190` returns bare `Button`s, and no amiga file references
   it. The claimed reference implementations do not exist — which is precisely how C-4/C-5/C-6 (all
   shared verbatim with spring, the *only* other consumer) went unchallenged.
2. `useSceneMachineShellBinding.ts:200-203`: *"a raw-rAF preview scene that exposes `autoPlays: true`
   (easing)"* — `EasingScene.vue:126` exposes `autoPlays: false` (T.G3). The **code** is correct
   (`:204` reads `=== true`); the seam's documentation of its own only-named consumer is stale.

**Falsifier.** A PlaybackRibbon mount under `demo/scenes/cube/` or `demo/scenes/amiga/` (searched
both), or an `autoPlays: true` in `EasingScene.vue`.

---

## C-14 · INFO — `isStarted` is exposed as a never-written `ref`, beside a hard-coded `true`

`EasingScene.vue:46` `const isStarted = ref(true)` — never assigned again; exposed at `:118`.
`SceneExposedApi.isStarted?: boolean` (`sceneExposedApi.ts:33`) declares a **boolean**, not a ref;
Vue's expose proxy unwraps it, so this happens to work — and only because nothing typechecks SFCs
(C-7). Two lines away the same fact is passed to the ribbon as a literal
(`EasingScene.vue:101` `isAnimStarted: true`) rather than from the ref, so the ribbon's
`is-disabled` styling (`PlaybackRibbon.vue:9, 74`) is dead code for this scene and the two
representations can never disagree only by luck.

**Falsifier.** A write to `isStarted` anywhere in the scene (none), or a `startStateChange`
round-trip that seats it (`App.vue:37` routes the *shell's* event, not the scene's ref).

---

## C-15 · INFO (fold F-1) — 7 glass-ui entry points in this scene's closure, 0 declared; plus a duplicated value.js import

**F-1 fold** (`lane-frontend.md:15, 54`): `@mkbabb/glass-ui` is absent from `package.json` **and**
`package-lock.json` while 7.0.0 sits in `node_modules`. The EasingScene closure alone reaches the
root barrel plus `/tooltip`, `/labeled-field`, `/easing`, `/fading-scroll`, `/chip`, `/toggle-group`
(table §0). Under `npm ci` this scene does not build — every visible surface of it (the gallery
`Card`/`Chip`/`ToggleGroup`/`FadingScroll`, the picker, the ribbon's `Button`/`Slider`/`Tooltip`) is
undeclared. Contrast the value.js half, which is exemplary (SUP-2). **F-1 is a precondition for any
wave that touches this scene.**

**S-7 fold** (`lane-frontend.md:383-385`): `EasingTarget.vue:35-39, 143` consumes the shadow
`CopyButton` — the AMBER 113-line partial whose shell should be a glass `Button`, and whose
`@keyframes` JS-string style injection is its own defect. This scene is one of its consumers; it
should be counted in the S-7 migration's blast radius.

**Additionally**: `useEasingDemo.ts:2` and `useEasingDemo.ts:22` are two separate `import … from
"@mkbabb/value.js/math"` statements in one module (`cubicBezierToString`, then `clamp`) — a
`no-duplicate-imports` row that `depcruise src` cannot see (it lints `src`, not `demo`:
`package.json:"lint"`).

**Falsifier.** A `@mkbabb/glass-ui` entry appearing in `package.json`/`package-lock.json`, or an npm
workspace/`overrides` resolution that supplies it (neither exists; `vite.config.ts:32-42` aliases only
`@mkbabb/keyframes.js`).

---

# Superlatives (L-18, falsifiable in both directions)

**SUP-1 · The light/heavy engine boundary is honoured exactly.** `useEasingDemo.ts:6` statically
imports `NumericAnimation` — a genuine LIGHT-barrel export (`src/animation/index.ts:29` →
`physics/numeric`, value.js-free) — while the value.js-bearing `CSSKeyframesAnimation` is reached
**only** through the dynamic accessor (`kfEngine()`, `useEasingDemo.ts:24, 288`), exactly as
`demo/kf-engine.ts:1-27` prescribes. A single static `import { CSSKeyframesAnimation }` here would
drag value.js onto the light barrel and red `proof:boundary`. *Falsifier:* any static heavy import in
the scene closure — there is none.

**SUP-2 · The value.js consumption is the model the glass-ui consumption is not.** value.js 4.0.0 is
**rootless** (no `"."` in its exports map — verified against the installed tarball: only
`./color ./value ./css ./easing ./math ./transform ./quantize`). Every one of this scene's 4 value.js
imports names a real subpath and a real named export (`clamp`, `cubicBezierToString` in
`dist/subpaths/math.js`; `bezierPresets`, `JumpPosition` in `dist/subpaths/easing.js` — both
enumerated from the installed bundles), and the dependency is **declared and exactly pinned**
(`package.json` `"@mkbabb/value.js": "4.0.0"`). Reproducible under `npm ci`. *Falsifier:* a value.js
deep-import past a subpath, or a subpath that does not resolve.

**SUP-3 · The prop-vs-inject split across the render-fn teleport is correct and non-obvious.**
`EasingScene.vue:21` provides `EASING_DEMO_KEY` for `EasingTarget` (injected at
`EasingTarget.vue:152`) — which mounts inside the scene's own subtree. `EasingSidebar` is created by
the scene's render fn (`:57`) but **mounted** in the shell's subtree
(`ChannelControls.vue:180`), where `inject` resolves against the *mount* parent chain and would miss
the scene's provide entirely — so it correctly takes `demo` as a **prop**
(`EasingSidebar.vue:82`). Two mechanisms for one context, each right for its mount site. This is the
kind of seam that is usually got wrong. *Falsifier:* Vue resolving `inject` via the creating instance
rather than the mount parent — it does not.

**SUP-4 · R1 non-reachability is proven, not assumed.** The known R1 crash surface is
`parseCssColor` at `demo/scenes/square/useSquareTumble.ts:22` (`lane-library.md:243`) — a different
scene. This closure contains no color parse: `previewAnim`'s keyframe text is
`transform: translateX(0%|100%)` (`useEasingDemo.ts:296-299`). Its only value.js parse reach is
`parseTimingFunction` via `setTimingFunction` (`lane-library.md:181`, seam A5,
`easing-registry.ts:131`), and **every string this scene can emit** was executed against the installed
parser (C-8/C-9/C-10 transcripts): all named curves, both step keywords, `steps(n, term)` for
`n ≥ 2`, and bezier literals across the picker's full clamp box (`x∈[0,1]`, `y∈[-0.6,1.6]` — glass-ui
`dist/easing.js`) all resolve. The one hole found is C-8, and it is a `steppedEase` domain error, not
a parser crash. *Falsifier:* any color-valued property added to the preview keyframes, or a scene
edit that admits an unclamped bezier quad.

**SUP-5 · The paint strategy is the right consumption of the library, not the obvious one.** For a
~31-tile gallery the obvious move is 31 `CSSKeyframesAnimation`s. Instead the scene runs **one** raw
`NumericAnimation` sweep (`useEasingDemo.ts:138-140`) and N pure value.js easing functions evaluated
into direct `style.transform` writes (`EasingTarget.vue:254-259`), IntersectionObserver-gated
(`:290-301`) and keyed by `data-curve` rather than v-for index (`:283-289` — a correctly-earned
distrust of ref-array ordering), with both animation objects `markRaw`'d
(`useEasingDemo.ts:138, 289`). All balls read one phase, so "departure is simultaneous by
construction" is literally true. *Falsifier:* the painter reading a per-tile clock, or a reactive
per-frame write (the frame body writes only `livePhaseValue`, `:186`). The **fps claim** attached to
this design (`useEasingDemo.ts:144-157`) is `UNPROVEN-NEEDS-LIVE`; the structure is not.

---

# Disposition

- **C-1 is the root.** C-2 and C-3 are its consequences and share its single falsifier (the derived
  surface set). Cure C-1 by declaring the channel honestly — drop `animation`, declare
  `surfaces: []`, and keep `previewAnim` as the ribbon's clock via the ribbon's own `source`
  contract (`PlaybackRibbon.vue:105-111`) — and C-2/C-3/C-4 all collapse together, because the
  `source` path is also the one whose `duration` Vue can observe.
- **C-4, C-5, C-6 are shared verbatim with `SpringScene`** and should be cured as one PlaybackRibbon
  consumption spec, not per scene.
- **C-15/F-1 gates everything**: nothing in this file is reproducible under `npm ci` until glass-ui is
  declared and locked.
- **C-7 is why all of the above survived**: no `.vue` file in this repository is typechecked by any
  script or CI job.

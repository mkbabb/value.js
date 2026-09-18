claude-opus-5[1m]

# CHALLENGE · `SpringScene.vue` · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringScene.vue` (204 L)
**Axis** how this component consumes keyframes.js (the library) and glass-ui (the design system): subpath choices, shadow components (S-1..S-8), value.js transitive exposure (R1 class where reachable), props/emits contract quality, integration seams with siblings.
**Mode** static, read-only. No installs, no dev server, no browser. Every livable-only claim is marked **UNPROVEN-NEEDS-LIVE**.
**Tree** `/Users/mkbabb/Programming/keyframes.js` @ working tree as read 2026-08-06. Hitherto corpus folded: `formation/keyframes/lane-frontend.md` (F-1, F-6, S-1..S-8), `lane-library.md` (§4.1 A13, §4.6 R1 surface).

**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Two claims I *expected* to find were killed by the tree and are recorded as cleared (§4) rather than shipped as findings.

**Tally** 16 defects — **2 BLOCKER**, 6 MAJOR, 6 MINOR, 2 INFO — and 4 superlatives.

---

## 0. What the file actually consumes

| edge | site | shape |
|---|---|---|
| glass-ui root barrel | `SpringScene.vue:18` `import { Button } from "@mkbabb/glass-ui"` | 1 named import, **root** subpath |
| lucide | `:19` `Eye, EyeOff, Shuffle` from `@lucide/vue` | declared `package.json:74` + locked ✔ |
| demo component | `:21` `PlaybackRibbon` | the shared transport |
| siblings | `:23-25` `SpringTarget`, `StartingStyleTarget`, `SpringPhysicsFacet` | 2 by template, 1 by render-fn |
| scene composable | `:26` `useSpringDemo` | the whole context object |
| keys | `:27` `SPRING_DEMO_KEY`, `SPRING_SCENE_ID` | |
| keyframes.js | **none direct** | reached transitively via `useSpringDemo` (`SpringProgress`, `springTimingFunction`, `NumericAnimation`, `CSSKeyframesAnimation`, `RAFPlayback`) |
| value.js | **none direct** | transitively `@mkbabb/value.js/math` `clamp` (`useSpringDemo.ts:4`), and the `/css` parse seam behind `CSSKeyframesAnimation.fromString` (lane-library A13) |

Shadow-component census result for this file: **zero**. No local `ui/` copy, no `reka-ui` import, no `cva`/`clsx`, no bespoke re-implementation of a glass primitive. It introduces none of S-1..S-8. (Confirms `lane-frontend.md` F-6 at this site.)

---

## 1. BLOCKERS

### C-B1 · glass-ui is a phantom dependency at this import site — the component cannot build from a clean checkout — **BLOCKER**

`SpringScene.vue:18` imports `Button` from `@mkbabb/glass-ui`. That package is declared **nowhere**:

```
keyframes.js/package.json:69      "@mkbabb/value.js": "4.0.0"     ← the ONLY @mkbabb dep
$ grep -c "glass-ui" package-lock.json                       → 0
$ node -e '…require("@mkbabb/glass-ui/package.json").version' → 7.0.0   (installed, real dir)
```

`npm ci` reconstructs `node_modules` strictly from the lockfile; with zero glass-ui rows there is nothing to resolve and `:18` is the first import to fail. The working tree survives only on a stale install. This is `lane-frontend.md` **F-1** landing on this component — cited, not re-derived; what is new here is that SpringScene is one of the 37 `.vue` files that make F-1 *load-bearing* rather than theoretical, and it is a **scene** (lazily chunked at `app/scene/scenes.ts:172`), so the failure is a chunk-level build error, not a warning.

*Falsifier* — any of: a `@mkbabb/glass-ui` entry appearing in `package.json`/`package-lock.json`; an `overrides`/`workspaces`/`file:` resolution supplying it; a `vite.config.ts` alias mapping the bare specifier to a path (checked: `vite.config.ts:37-60` aliases 9 specifiers, **glass-ui is not among them**).

### C-B2 · the ribbon's **Reverse** button drives the scrubber thumb and the visualizer ball in *opposite directions*, and mirrors every subsequent scrub — **BLOCKER**

`SpringScene.vue:93-96` implements reverse as a flag write on the Sweep animation:

```ts
const onToggleReverse = () => {
    userReversed.value = !userReversed.value;
    demo.springEditAnim.reversed = userReversed.value;   // :95
};
```

The two position readouts inside the *same* `PlaybackRibbon` then disagree, by construction:

- **thumb** — `SpringScene.vue:119-120` passes `currentT = demo.scrubberPhase.value * duration`, i.e. the RAW forward phase; `PlaybackRibbon.vue:15-22` binds it as `:model-value="[currentT]"` against `:max="effectiveDuration"`. Thumb position = `phase`.
- **ball** — `AnimationVisualizer.vue:246` reads `anim.effectiveT / anim.options.duration`, and `engine/play-lifecycle.ts:448-450` defines `effectiveT = reversed ? duration - t : t`. The scene writes `springEditAnim.t = springLive.phase * duration` every frame (`useSpringDemo.ts:240`), so ball position = `1 - phase`.

With `reversed === true` and the machine playing, the thumb sweeps left→right while the ball sweeps right→left in the same 200-px band.

Scrubbing is worse. `PlaybackRibbon.vue:181-194`:

```ts
const rawT = animation.reversed ? animation.options.duration - effectiveT : effectiveT;
emit("sliderUpdate", { t: rawT, animation });
```

`SpringScene.vue:83-91` then does `demo.scrubTo(v.t / dur)`. Trace at `duration = SAMPLER_DURATION = 1400` (`useSpringDemo.ts:25`), user drags the thumb to `V`:
`rawT = 1400 − V` → `scrubTo((1400−V)/1400)` → `springLive.phase = 1 − V/1400` → `paintScrubberPhase()` (`useSpringHotPath.ts:125-127`) → `currentT = 1400 − V`. **The thumb lands at `1400 − V`, mirrored across the rail from where the pointer released.** Only `V = 700` is a fixed point.

And the button reverses nothing on stage: the `SpringProgress` trackers and the `samplerAnim` sweep (`useSpringDemo.ts:214-229`) are unaffected by `springEditAnim.reversed`, and `springEditAnim` is never played — the per-frame `.t` write always runs forward. So the verb is simultaneously a **false affordance** and a **corrupting one**.

Cross-check that the seam is knowable: `usePlaybackToggle.ts:27-30` — the demo's *other* reverse implementation — calls `getAnimation().reverse()`, which flips the flag **and rebases `t`** (`play-lifecycle.ts:91-101`). SpringScene copied the flag half without the clock half. (`EasingScene.vue:77-82` carries the identical copy; the defect is shared, which is corroboration, not exculpation.)

*Falsifier* — a live capture showing thumb and ball co-moving with Reverse engaged; or a code path that rebases `springEditAnim.t` on the reverse toggle; or evidence that `scrubberPhase` is itself reversed-aware (checked: `useSpringHotPath.ts:81,125-127` writes `springLive.phase` verbatim, no direction term anywhere in the file).

---

## 2. MAJOR

### C-M1 · `tabsContent` is not gated on the active control surface — the Physics facet renders under the Controls / Keyframes / Timeline panels — **MAJOR**

`SpringScene.vue:67`:

```ts
const tabsContent = () => h(SpringPhysicsFacet, { demo });
```

The host's contract is explicit (`ChannelControls.vue:174-180`):

> *"Scene-specific panels … flow through the `tabs-content` slot AS BEFORE; **the scene gates its own body on the active surface**."*

and the slot is rendered **ungated** on line `180`. The sibling that consumes the same slot honors the contract — `CubeScene.vue:170-181` returns `null` unless `storedControls.selectedControl === "matrix-controls"`.

SpringScene's justification for skipping the gate is `:33-44`, which asserts the spring scene has exactly one valid surface, citing `CONTROL_SURFACES.spring = ['spring']`. **That table is deleted** — `state/controlSurfaces.ts:4` names it as removed, and the T.B2 derivation replaced it. Under the live derivation both spring channels carry an `animation` (`useSpringDemo.ts:406-427`), so `surfacesFor` (`controlSurfaces.ts:106-110`) returns the whole triad plus the facet. The repo's own test asserts it verbatim:

```
test/demo/state/control-surface-dfa.test.ts:81-86
expect(surfacesFor(springFacility, "Sweep")).toEqual(["controls","keyframes","timeline","spring"]);
```

Consequently `ChannelControls.vue:331-337` evaluates `isSingleSurfaceScene` false (`controlSurfaces.length === 4`, `builtInTabs.length === 3`), the multi-surface branch runs, and the facet is painted beneath whichever built-in panel is active. The `:58-66` comment ("AnimationControls renders this slot directly for single-surface scenes … the panel is mounted BY CONSTRUCTION") is void by the same measurement.

*Falsifier* — any additional gate between `App.vue:61-63` and `ChannelControls.vue:180`; or a spring facility whose channels omit `animation`; or the DFA test above being changed/skipped.

### C-M2 · `tabsContent` is rendered once **per animation-bearing channel** — two live `SpringPhysicsFacet` instances — **MAJOR**

`ControlsPaneWrapper.vue:206-218` builds `controlHosts` by `flatMap`ping every channel that carries an `animation`; `:44-48` then mounts one `ChannelControls` per host inside `<div v-show="storedControls.selectedAnimation == host.name">` — **`v-show`, so both subtrees mount** — and `:77-84` forwards the `tabs-content` slot into each.

The spring facility declares two animation-bearing channels (`useSpringDemo.ts:406-427`: `Sweep`, `Entry`). SpringScene therefore instantiates `SpringPhysicsFacet` **twice**, always, from first paint:

- two `demo.registerSpringPainter(...)` registrations (`SpringPhysicsFacet.vue:151-162`) — the 60 Hz painter writes both DOM ball sets, one permanently hidden;
- two `<SpringHeatmap :demo="demo">` (`:58`, a 338-line canvas instrument) — double the per-param canvas work;
- **two `<KeyframesEditor :animation="demo.springEditAnim" …>` (`:119`) two-way bound to the same `markRaw` object.** Because the animation is `markRaw` (`useSpringKeyframesEditor.ts:57`), a per-stop edit in the visible editor cannot propagate to the hidden one's string mirrors; switching the transport channel reveals a stale editor whose next write clobbers the fresh state. A dual-authority stale-write, which is the exact class the scene's own prose claims to have killed.

*Falsifier* — a `v-if` (not `v-show`) on the host wrapper; a per-host key on the slot that Vue collapses; or evidence that `KeyframesEditor` re-seeds its mirrors from the animation on reveal (checked `KeyframesEditor.vue:160-215` + `useKeyframesEditor.ts`: mirrors are seeded through `useKeyframesState`, not on visibility change). **UNPROVEN-NEEDS-LIVE** for the visible symptom; the mount count is static-provable.

### C-M3 · both facility channels are **non-painting** — the "decoy-zero" clause is violated on the surface that declares it dead — **MAJOR**

`composables/scene-facility/index.ts:35` — *"Present ⇒ the triad is HONEST for this channel (**it paints**)"*; `:17-18` — *"The contract-group decoy … is DELETED — proof:scene-facility's decoy-zero clause is GREEN and blocking."* `controlSurfaces.ts:68` repeats it: *"Present ⇒ this channel **PAINTS**."*

Neither spring channel paints:

- **Sweep / `springEditAnim`** — built at `useSpringKeyframesEditor.ts:57-64` from a bare `@keyframes spring { … }` body with **no style rule**, so it has no `targets`; it is never `play()`ed, never joined to a group, and nothing reads its interpolated output. The stage balls are painted from `SpringProgress` + `samplerAnim` instead (`useSpringDemo.ts:214-232` → `repaintSprings`). The only consumer of its clock is `AnimationVisualizer`, which reads `effectiveT` (a *time*, `AnimationVisualizer.vue:246`) — not a keyframe value. **Editing a stop in the Physics facet's `KeyframesEditor` changes nothing visible anywhere in the app.** That directly contradicts `SpringScene.vue:110-112` ("the ribbon binds the Sweep CHANNEL's REAL animation … the opacity decoy `contractAnim` is DEAD") and `useSpringDemo.ts:384-388` ("an animation whose keyframes a panel edit really re-shapes").
- **Entry / `entryAnim`** — `useCompiledEntry.ts:53-63` builds it, `:71-76` feeds it to `compileToEntry` as *compile input only*. `grep -rn entryAnim demo/` returns 16 hits, none of them a play, a target bind, or a render. The discrete card is animated by pure CSS (`StartingStyleTarget.vue:158-197`: `@starting-style` + `allow-discrete`). Yet the facility exposes `progress()`/`setProgress()` over `entryAnim.t` (`useSpringDemo.ts:413-426`), and those are live: `useControlsKeyboardShortcuts.ts:53-58` binds ArrowLeft/Right/Home/End → `AnimationControlsGroup.vue:264-271` → `ch.setProgress(...)`. **Arrow-key scrubbing with Entry selected writes a number nothing paints.**

*Falsifier* — any site that binds `targets` to, plays, or reads interpolated output from `springEditAnim` or `entryAnim`; or a painter closure reading either animation. (Searched: `grep -rn "springEditAnim\|entryAnim" demo/` — all writes are `.t`, `.name`, `.superKey`, `.reversed`, `setTimingFunction`, `fromString`, `parse`.)

### C-M4 · scrubbing the ribbon slider **freezes the visualizer ball**, and the emit that exists to cure it is dropped — **MAJOR**

`SpringScene.vue:99-102` pauses the machine on scrub start:

```ts
const onScrubStart = () => {
    wasPlayingBeforeScrub = demo.isPlaying.value;
    if (wasPlayingBeforeScrub) demo.pause();
};
```

`AnimationVisualizer.vue:241-250` syncs the ball inside `useRafLoop(..., { guard: computed(() => props.isPlaying || isDragging.value) })`, and `useDemoTicker.ts:30-35` stops the shared driver as soon as no subscriber is enabled. During a *slider* drag `isDragging` is the **visualizer's own** drag flag — false — and `isAnimPlaying` (`SpringScene.vue:121`) is now false. The loop stops; nothing else calls `setBallProgress`. The ball is frozen for the whole gesture while the thumb moves, then snaps on `onScrubEnd`'s `play()`. If the scene was already paused when the drag began, `wasPlayingBeforeScrub` is false, no `play()` follows, and the ball stays stale **indefinitely**.

This falsifies the scene's own claim at `SpringScene.vue:85-89` — *"route the scrub through `scrubTo` … it moves the thumb + the visualizer + the live ball together AND works while idle."* It moves the thumb and the live ball (`repaintSprings`); it does not move the visualizer.

The ribbon ships the cure and SpringScene declines it. `PlaybackRibbon.vue:126-128` declares:

```ts
// Wake-only: fires on EVERY scrub (pointer, keyboard, or visualizer) so a
// settled sync loop re-arms even on a keyboard-arrow nudge.
(e: "scrubbed"): void;
```

emitted unconditionally at `:203`. The only handler in the tree is `ChannelOptions.vue:391` `@scrubbed="wake"`. SpringScene's `h(PlaybackRibbon, {...})` (`:108-129`) wires 5 of the 6 emits — `onTogglePlay`, `onToggleReverse`, `onSliderUpdate`, `onScrubStart`, `onScrubEnd` — and **omits `onScrubbed`**. A props/emits contract consumed at 5/6.

*Falsifier* — another writer of `ball.style.transform` reachable while paused; or `useDemoTicker` keeping the driver alive with zero enabled subscribers. **UNPROVEN-NEEDS-LIVE** for the visual freeze; the guard topology is static-provable.

### C-M5 · a slider drag drives the library's **heavy compile** surface, undebounced and uncancelled — **MAJOR**

`SpringPhysicsFacet.vue:27-46` binds two `LabeledSlider`s (`step 0.01`) straight onto `demo.response` / `demo.dampingFraction`. Three uncoordinated watchers fire on every step:

1. `useSpringDemo.ts:341` `watch([response, dampingFraction], rebuildLiveSpring)` → `dispose()` + `new SpringProgress` + `buildSamplerAnimation()` → `springTimingFunction` (64-sample solve **plus** an eager `springLinearStops` 24-stop solve it never uses — `physics/spring/css/timing-function.ts:108-115`) + `startLoop()`.
2. `useCompiledEntry.ts:79-81` `watch([response, dampingFraction], () => void recompile(), { immediate: true })` → `await loadAnimationEngine()` → **`compileToEntry(...)`**, the emitter behind the LIGHT/HEAVY dynamic boundary (`lane-library.md` §3.3, `load-engine.ts:124`). No debounce, no `flush` control, **no cancellation token** — concurrent recompiles race and `css.value = out.css` (`:76`) resolves last-completed-wins, not last-requested-wins.
3. `StartingStyleTarget.vue:116-119` `useSpringLinearStops` — a **fourth** solve of the same curve.

Dragging damping 0.2 → 1.5 is ~130 steps ⇒ ~130 spring disposals/rebuilds and ~130 `compileToEntry` invocations. `SpringScene` is the composition root that mounts all three consumers and owns none of the coordination.

*Falsifier* — a debounce/throttle inside `LabeledSlider`'s `update:modelValue` (its `.d.ts` declares a plain `(value: number) => any`, no batching); or Vue coalescing the pre-flush watchers to one run per drag (it coalesces per tick, not per gesture — a pointermove-per-frame stream is one tick each). **UNPROVEN-NEEDS-LIVE** for the measured cost; the call graph is static-provable.

### C-M6 · two independent reverse authorities write the same `markRaw` animation — **MAJOR**

On the spring scene's **Controls** surface (reachable per C-M1), `ChannelOptions.vue:376-400` mounts a **second** `PlaybackRibbon` (teleported to `#controls-ribbon-target`) bound to the channel host's animation — for the Sweep host that is the same `springEditAnim` object. Its reverse runs through `usePlaybackToggle.ts:27-30` → `animation.reverse()` (flag flip **+ clock rebase**), while `SpringScene.vue:95` writes `animation.reversed = …` (flag only). Two `userReversed` refs (`SpringScene.vue:81`, `usePlaybackToggle.ts:25`) track one engine flag and cannot observe each other — the flag is on a `markRaw` object, so neither `aria-pressed` state is reactive to the other's write.

*Falsifier* — evidence that ChannelOptions' ribbon is never mounted for the spring scene (it is gated only on `selectedControlSurface === 'controls'`, `ChannelControls.vue:98`, which C-M1 establishes is reachable).

---

## 3. MINOR / INFO

**C-m1 (MINOR) · dead local.** `SpringScene.vue:55` `const isPlaying = demo.isPlaying;` is never referenced — the ribbon reads `demo.isPlaying.value` directly at `:121` and `:100`, and it is not exposed. Five lines of comment (`:52-54`) justify a binding with no consumer. *Falsifier* — any `isPlaying` reference in the SFC other than `demo.isPlaying`; `grep -n isPlaying` returns only `:52,53,55,100,121,196`, of which `52,53,196` are prose.

**C-m2 (MINOR) · `isStarted` is written by the shell and ignored by the scene.** `:56` `const isStarted = ref(true)` is exposed at `:186`; the shell writes it (`useSceneMachineShellBinding.ts:261-267`, fed from `useAnimationGroupPlayback.ts:71` via `App.vue:37`). The scene never reads it — `:122` hard-codes `isAnimStarted: true`, so `PlaybackRibbon`'s `is-disabled` treatment (`PlaybackRibbon.vue:9,74`) is unreachable on this scene. *Falsifier* — an `isStarted.value` read anywhere in the SFC.

**C-m3 (MINOR) · root-barrel glass-ui import where a subpath exists.** `:18` draws `Button` from `@mkbabb/glass-ui`; the installed 7.0.0 exports `./button` (73 subpaths total), and `dist/button.js` is a 71-byte re-export while `dist/glass-ui.js` eagerly imports **44** chunks (`grep -oE 'from ?"[^"]+"' dist/glass-ui.js | sort -u | wc -l` → 44, incl. `data-table`, `command`, `configurator`, `dialog`). Sibling files in the same directory already use narrow subpaths (`SpringPhysicsFacet.vue:130-131` `/labeled-field`, `/chip`). Production is likely shaken (`sideEffects: ["*.css"]`), but the Vite dep pre-bundle is not. *Falsifier* — a bundle analysis showing no chunk delta between the root and `/button` specifier.

**C-m4 (MINOR) · dead guard in `ribbonContent`.** `:136` `if (slotProps.selectedControl !== "spring") return null;` can never fire: `RibbonBar.vue:107-115` invokes the slot only when the selected surface is **not** `controls`/`keyframes`/`timeline`, and spring's derived set contains exactly one such surface (`spring`). Defensive code that reads as a live gate and thereby *masks* the missing gate of C-M1. *Falsifier* — a spring surface set containing `matrix-controls` or another facet.

**C-m5 (MINOR) · keyboard collision between the stage rail and the transport shortcuts.** `SpringTarget.vue:62-72` renders the rail as `role="slider" tabindex="0" @keydown="onKeydown"`, handling Arrow/Home/End → `demo.reseat(...)` (`:254-269`). The globally registered transport shortcuts bind the **same** keys → `scrubActive` (`useControlsKeyboardShortcuts.ts:53-58`). glass-ui's dispatcher skips only `INPUT/TEXTAREA/SELECT/contentEditable/.monaco-editor` (`node_modules/@mkbabb/glass-ui/dist/keyboard.js`, fn `f()`), so a focused `<div role="slider">` is not exempt: one ArrowRight both re-seats the spring target and scrubs the channel. *Falsifier* — a `stopPropagation()` on the rail handler (there is only `preventDefault()`), or a capture-phase filter in the shortcut registry. **UNPROVEN-NEEDS-LIVE** for the double-fire.

**C-m6 (MINOR) · redundant library re-solves.** `springTimingFunction` is invoked from three sites per param change (`useSpringDemo.ts:167`, `useSpringKeyframesEditor.ts:44`, `useCompiledEntry.ts:67-70`) and always computes its CSS `linear()` half eagerly (`timing-function.ts:108-115`), which only `useCompiledEntry`'s neighbour needs; `useSpringLinearStops` re-solves the same stops a fourth time (`StartingStyleTarget.vue:116`). The demo is the library's proving ground, so this is also a **library API signal**: `springTimingFunction` has no way to ask for `.fn` without paying for `.css`.

**C-i1 (INFO) · three stale comments, one of them load-bearing.** (a) `:33-44` and `:58-66` cite the deleted `CONTROL_SURFACES` table and a single-surface premise the DFA test contradicts — this is the *cause* of C-M1. (b) `:195-197` describes "the raw-rAF ScenePlayback adapter — the App registers it…" sitting directly above `tabsContent,` at `:198`; the `scenePlayback` expose it documents was removed (only `facility` remains). (c) `useSpringLinearStops.ts:9-13` names its two call sites as `SpringSidebar.vue:130` and `StartingStyleTarget.vue:95`; `SpringSidebar.vue` no longer exists (dissolved at T.B7) and the composable now has one consumer.

**C-i2 (INFO) · the emit payload is narrowed at the handler.** `PlaybackRibbon.vue:129` emits `{ t, animation }`; `SpringScene.vue:83` types the handler `(v: { t: number })` and discards `animation`, so the scrub is hard-wired to Sweep regardless of which animation the ribbon reports. Harmless today (one ribbon, one animation) and a silent mis-route the day a second is bound. `AnimationControlsGroup.vue:244-251` shows the correct shape — it *matches on* `val.animation.id` before routing.

---

## 4. Claims I expected and the tree killed (recorded, not shipped)

- **R1 (`parseCssColor` oklch crash) is NOT reachable from this component.** The scene's only value.js parse entries are `CSSKeyframesAnimation.fromString` on machine-generated, colorless strings — `useSpringKeyframesEditor.ts:43-55` emits `translateX(<n>%)` only; `useCompiledEntry.ts:24-27` is a fixed `opacity`/`transform` literal. The user-typed path (the facet's `KeyframesEditor`, where a color *could* be typed) is wrapped: `useKeyframeOps.ts:111-140` routes every edit through `withErrorToastAsync`, so a value.js throw surfaces as a toast, not a crash. Lane-library §4.6 correctly places the R1 surface in the **square** scene (`useSquareTumble.ts:22`), not here.
- **`seedKeyframes()` cannot emit `NaN%`.** I expected `springTimingFunction(...).fn(t)` to go non-finite at ζ = 1.0 (reachable: the `gentle` preset, `springPresets.ts:36-40`, and the slider's 0.01 step) and to reach the unguarded `springEditAnim.fromString(...); springEditAnim.parse()` at `useSpringKeyframesEditor.ts:72-73`. The solver splits the regime explicitly — `solver/solver.ts:36-52` handles ζ<1, **ζ === 1**, and ζ>1 with no `√(1−ζ²)` division on the critical branch. No NaN path; claim dropped.

---

## 5. Superlatives (L-18, running both ways)

**C-S1 · zero shadow components; the shared transport is consumed, not forked.** For a 204-line scene owning a bespoke physics instrument, SpringScene reaches for `PlaybackRibbon` (`:21`, "the SAME component cube/amiga mount") and glass-ui `Button` (`:18`) for its two domain verbs, on the shared `.btn-playback` skin — the exact opposite of the S-1 `KfPillTabs` fork (217 lines forked over an ARIA bug fixed three majors ago). No local `ui/`, no `reka-ui` import, no `cva`/`clsx`, no hand-rolled slider or caret. *Falsifier* — any primitive re-implementation in the SFC; there is no `<style>` block at all.

**C-S2 · one scrub seam, guarded at both ends.** `:90` refuses to divide by a zero duration; `useSpringDemo.ts:282` clamps inside `scrubTo`; the scene never pokes `demo.progress.value` directly (the pattern `:86-89` documents as the prior defect). Every scrub, restore, reset and adapter round-trip converges on one function.

**C-S3 · the prop-vs-inject split is correct, and non-obvious.** `:32` `provide(SPRING_DEMO_KEY, demo)` serves the two template children (`SpringTarget`, `StartingStyleTarget.vue:96` both `inject`), while `:67` passes `demo` as a **prop** to `SpringPhysicsFacet`. That asymmetry is required, not redundant: `tabsContent` is invoked by `App.vue:62` as a functional component in the *App's* render context, which is an **ancestor** of SpringScene — an `inject` there would resolve against App's chain and miss the key. The file gets this right; it nowhere says why, which is the one thing a future simplifier would need.

**C-S4 · the expose surface is exactly the typed contract.** `:180-200` supplies `facility`, `superKey`, `isStarted`, `autoPlays`, `tabsContent`, `ribbonContent` — a strict subset of `SceneExposedApi` (`app/scene/sceneExposedApi.ts:16-34`) with no duck-typed extras; the decoy `animationGroup` expose really is gone, and `autoPlays: false` is honored by `useSceneMachineShellBinding.ts:206-207` so the scene genuinely rests at zero rAF on entry.

---

## 6. Ranked remediation order (consumption axis only)

1. **C-B1** — declare + lock `@mkbabb/glass-ui@7.0.0`. Nothing below is reproducible until it lands.
2. **C-B2** — make the thumb reversed-aware (`currentT = effectiveT`) *or* stop writing `.reversed` and drop the verb from this scene; do not ship the half-wire.
3. **C-M1 / C-m4** — gate `tabsContent` on `storedControls.selectedControl === "spring"`, copying `CubeScene.vue:170-181`; then delete the dead `ribbonContent` guard or keep exactly one of the two.
4. **C-M3** — decide the honest shape of the two channels: either bind real targets (make them paint) or declare them `surfaces: [...]` light channels. This also collapses C-M1/C-M2 at the root, because a light channel stops earning the triad and stops spawning a host.
5. **C-M2** — falls out of (4); otherwise key the facet to one host.
6. **C-M4** — wire `onScrubbed`, and stop pausing the machine on scrub-start (or teach the visualizer to paint while paused).
7. **C-M5** — debounce/cancel the `compileToEntry` watcher; split `springTimingFunction`'s eager `.css`.
8. **C-M6, C-m1..m3, C-m5, C-i1..i2** — mechanical.

---

## Provenance

Files read whole (read-only, no writes outside this document): `demo/scenes/spring/{SpringScene,SpringTarget,StartingStyleTarget,SpringPhysicsFacet}.vue`, `demo/scenes/spring/{useSpringDemo,useSpringHotPath,useSpringKeyframesEditor,useCompiledEntry,useSpringLinearStops,springKeys,springPresets}.ts`, `demo/components/playback/{PlaybackRibbon,AnimationVisualizer}.vue`, `demo/components/instrument/transport/composables/{useRafLoop,useDemoTicker}.ts`, `demo/components/instrument/transport/channel-controls/{ChannelControls.vue,composables/usePlaybackToggle.ts}`, `demo/components/instrument/transport/controls-pane/{RibbonBar,ControlsPaneWrapper}.vue`, `demo/components/instrument/transport/AnimationControlsGroup.vue` (partial) + `AnimationControlsGroup/useControlsKeyboardShortcuts.ts`, `demo/app/scene/sceneExposedApi.ts`, `demo/app/scene/useSceneMachineShellBinding.ts` (partial), `demo/app/App.vue` (partial), `demo/state/controlSurfaces.ts`, `demo/state/useSceneMachine.ts` (partial), `demo/composables/scene-facility/index.ts` (partial), `demo/scenes/easing/EasingScene.vue` (comparand), `demo/scenes/cube/CubeScene.vue` (comparand), `src/animation/engine/{animation,interpolate,play-lifecycle}.ts` (partial), `src/animation/physics/spring/css/timing-function.ts`, `src/animation/physics/spring/solver/solver.ts`, `test/demo/state/control-surface-dfa.test.ts` (partial), `node_modules/@mkbabb/glass-ui/{package.json,dist/glass-ui.js,dist/button.js,dist/keyboard.js}` (metadata/probe reads).

No file in keyframes.js, glass-ui, or fourier-analysis was written, mutated, or executed. No installs, no dev servers, no browser tooling.

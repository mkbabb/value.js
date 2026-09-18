claude-opus-5[1m]

# CHALLENGE · SquareScene · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/square/SquareScene.vue` (331 L)
**Mode** static, read-only. No installs, no dev server, no browser. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; each claim carries its own falsifier and dies if the falsifier holds.

## Read set (whole, read-only)

| file | L | role |
|---|---|---|
| `demo/scenes/square/SquareScene.vue` | 331 | the target |
| `demo/scenes/square/useSquareDemo.ts` | 404 | spring loop + transformFunc + the tour anim |
| `demo/scenes/square/useSquareTumble.ts` | 50 | the spin/palette egg |
| `demo/scenes/square/useSquareKeyboard.ts` | 103 | arrow/Home nudge + `c` envelope tour |
| `demo/scenes/square/SquareInstrument.vue` | 212 | the instrument sub-unit |
| `demo/scenes/square/SquareScene.css` | 159 | scoped styles (`<style scoped src>`) |
| `demo/scenes/square/squareKeys.ts` | 5 | `SQUARE_SCENE_ID` |
| `demo/composables/useDragScrub.ts` · `useDoubleTap.ts` · `scene-facility/index.ts` · `scene-runtime/useSweepScene.ts` | — | the shared seams it rides |
| `demo/kf-engine.ts`, `@mkbabb/glass-ui` (`Card`) | — | the two imported surfaces |
| engine: `src/animation/group/{group,entries}.ts`, `src/animation/engine/{interpolate,compile-bridge,css/css-animation}.ts`, `src/animation/physics/spring/{progress,types}.ts` | — | evidence for every engine-idiom claim |

## Verdict

**22 defects · 2 BLOCKER · 7 MAJOR · 10 MINOR · 3 INFO · 5 superlatives.**

The scene is *architecturally* one of the best-behaved in the demo (one rAF, one paint authority, exemplary colocation, the only end-to-end `unflatten` consumer). Its failures are all at the **seams it declares but does not hold**: it takes a second playback authority the repo's own law forbids, it hands the editor an animation the editor cannot preserve, and its instrument layer reports state it stops receiving the moment the engine takes over.

---

## BLOCKERS

### L-1 · BLOCKER · a second playback authority — the drag pauses the group behind the machine's back

`SquareScene.vue:237-241`

```ts
if (animationGroup.started && !animationGroup.paused) {
    animationGroup.pause();
    seatFromPose();
    isPlaying.value = false;
}
```

The repo's stated law (`demo/components/instrument/transport/AnimationControlsGroup/useAnimationGroupPlayback.ts:30-36`):

> `isPlaying` is a read-only projection of `machine.status` … the whole-group play/pause axis routes ONLY through the emit (App.onPlayStateChange → `machine.dispatch` → `createGroupAdapter` re-arms/stops the loop). **This composable NEVER calls an `AnimationGroup` playback method — `createGroupAdapter` is the ONLY code path that touches them (proof:no-shadow-playback-authority).**

The sibling that *does* reach the group annotates its exemption (`useAnimationGroupActions.ts:55-57`: "`stop()` … is the hard reset, allowed by proof:no-shadow-playback-authority"). `pause()` is squarely on the play/pause axis and carries no such exemption.

**Failure scenario (deterministic from the tree).** Play the tour → `machine.status === "playing"`. Press the pointer anywhere on the box (`useDragScrub.onPointerDown` fires `onStart: captureFrame` unconditionally, `useDragScrub.ts:112-126`). The group pauses; the machine is never told (`isPlaying.value = false` writes a *local, unexposed* ref — see L-8). Now:

- the transport still renders the Pause face (`TransportDock.vue:63,75` bind `isPlaying`, derived from `machine.status` via `useSceneTransport`);
- clicking it emits `playStateChange(false)` → `PAUSE` → `createGroupAdapter.suspend()` → the group is already `paused`, so it takes the `else` arm `group.playback.stop()` (`scenePlaybackAdapters.ts:87-92`) — visually nothing happens;
- a **second** click is required to reach `PLAY → resume() → group.resume()` (`:94-98`).

So one tap on the box costs the user a dead Play button and a double-click to recover.

**Falsifier.** Show any path that dispatches `PAUSE` to the machine on square's pointerdown, or any code that re-derives `machine.status` from live group state. I found none: `useSceneMachineShellBinding.ts:246-258` (`onPlayStateChange`) is reachable only from the transport emit, and `:263-266` writes `isStarted` only.

---

### L-2 · BLOCKER · the panel's keyframes edit destroys the scene's custom `transformFunc`

`useSquareDemo.ts:342-371` builds the tour with a custom renderer:

```ts
const anim = new CSSKeyframesAnimation({...}).fromKeyframes({...}, transformFunc);
```

`css-animation.ts:110-114` — supplying a transform sets `this.unflatten = true` and installs it on every frame. That is the *entire point of this scene*: `useSquareDemo.ts:10-16` — "the dogfood of the custom-transform-function over NESTED-OBJECT values primitive (the distinct library feature this scene exists to prove)".

The scene then publishes that same animation to the editor. `facilityFromGroup` (`scene-facility/index.ts:92-99`) sets `animation: anim` on the channel; `controlSurfaces.ts:48-55,68-69` — "a channel that PAINTS (carries an `animation`) earns the whole triad by construction" — so `keyframes` is a live surface here. It reaches `ControlsPaneWrapper.vue:50-64` (`:animation="host.animation"`) → `ChannelControls.vue:138-146` → `KeyframesStringControls` / `KeyframesEditor` → `useKeyframesParsing.ts:71` → `useKeyframeOps.ts:59-70`:

```ts
const compiled = new CSSKeyframesAnimation(options, ...animation.targets)
    .fromKeyframes(keyframes);          // ← NO transform argument
animation.adoptCompiled(compiled);
```

`fromKeyframes` with no transform → `resolveTransform(undefined)` → `this.unflatten = false` + the default DOM renderer on every frame (`css-animation.ts:110-114,131-145`). `adoptCompiled` then transplants the compiler **and** copies the flag: `compile-bridge.ts:99` — `anim.unflatten = source.unflatten;`.

**Failure scenario.** Open square → Keyframes tab → touch the CSS (even a whitespace round-trip through `updateFromString`). From that moment `anim.unflatten === false` and no frame carries `transformFunc`; the nested `transform.a.b.c.d` leaf — the primitive under proof — is unreachable from the engine path. The drag still works (the spring loop calls `transformFunc` directly, `useSquareDemo.ts:201`), so the breakage is **silent and Play-only**. Nothing re-supplies the transform: the only `keyframesUpdate` consumer is `useAnimationGroupActions.ts:47-52`, which merely clears `groupObject.values`.

The scene's own comment asserts the opposite (`SquareScene.vue:103-105`: "Play now drives the group's honest tour (the panel triad edits a LIVE animation, T.B3)"). It edits a live animation by *replacing its renderer*.

**Falsifier.** Show that `adoptCompiled` preserves the receiving animation's frame transforms (it does not — the compiler, which owns `frames`, is transplanted whole at `compile-bridge.ts:96-97`), or show the square channel does not expose the `keyframes` surface (it does, by the `animation`-present rule above). *The precise downstream paint under the default renderer is `UNPROVEN-NEEDS-LIVE`; the loss of `transformFunc` + `unflatten` is proven statically.*

---

## MAJOR

### L-3 · MAJOR · the tumble accumulator desyncs from the spring — N-turn tumbles after a takeover

`useSquareTumble.ts:11,42-46` keeps a **private** accumulator:

```ts
let target = 0;
const tumble = () => { target += 360; spin.target = target; startLoop(); };
```

`useSquareDemo.seatFromPose():319` resets the same spring: `springSpin.reset(0, 0)` — and `SpringProgress.reset` writes `targetValue` too (`progress.ts:374-380`: `this.targetValue = v;`). The accumulator is never told.

**Failure scenario (3 gestures).** Double-tap the box → `target = 360`, spin settles at 360. Press Play. Press the pointer on the box mid-tour → `captureFrame` → `seatFromPose()` → `springSpin` value **and target** := 0, while `useSquareTumble.target` is still 360. Next double-tap: `target = 720` → the spring chases 0 → 720 = **two full barrel-rolls** and two colour-sweep cycles. Each subsequent takeover adds another turn (3 turns, 4 turns, …), monotonically.

**Falsifier.** Show `useSquareTumble` re-derives its accumulator from `spin.target` (it does not — `target += 360` on a module-private local), or show `reset()` leaves `targetValue` alone (it does not, `progress.ts:377`).

### L-4 · MAJOR · the instrument layer freezes and lies during playback

`SquareInstrument.vue:2-9` declares itself "DERIVED READS of the spring state SquareScene feeds as props". The feed is `onTick`, and `onTick` has exactly two call sites: inside `frame()` (`useSquareDemo.ts:243-247`) and once in `paintRest()` (`:384`). `frame()` runs **only while the spring rAF loop is armed**, and the loop is armed only by `reseat`/`settle`/`tumble` (`:275, :289, useSquareTumble.ts:45`). The engine's four-corner tour never pumps it.

So during Play — the scene's headline verb — the box visibly tours ±90 px around a diamond while:

- the badge reads **"settled"** (`SquareInstrument.vue:29-32`, `settled` last written by `paintRest`);
- the tether is hidden or frozen at a stale deflection (`tetherActive` / `deflX` / `deflY`, `SquareScene.vue:143-152`);
- the `x`/`y` numerals hold the last dragged value (`springReadout`, written only in `onScrub`/`onEnd`/`onTarget`);
- `aria-valuenow` on both hidden sliders is likewise stale (`SquareScene.vue:62,72`).

Nothing hides the instrument during playback — `SquareInstrument` is rendered unconditionally (`SquareScene.vue:18-26`), with no `v-if` on `mode`.

**Falsifier.** Point to another `onTick` pump reachable during group playback, or to a render gate on the instrument. Neither exists in the tree.

### L-5 · MAJOR · the "jump-free takeover" is jump-free in translation only

`useSquareDemo.ts:303-320` reads `DOMMatrixReadOnly(cs.transform).m41/m42`, maps them into the two positional springs, then `springSpin.reset(0, 0)`. The tour's other painted channels are discarded: `rotate` (0 → 360°, `:350-368`) and the nested `d` scale (100 % ↔ 108 %). The very next spring frame repaints `rotate(${rotate}deg)` from `springSpin.value === 0` (`:112, :205, :126`).

**Failure scenario.** Press the pointer on the box at t ≈ 25 % of the tour (rotate ≈ 90°, scale ≈ 1.08). One frame later the box is at rotate 0° and scale `1 + defl*0.12` — a 90° un-rotation in a single frame, against `SquareScene.vue:232-236` ("a seamless, jump-free takeover") and `useSquareDemo.ts:296-299` ("no frame jump").

**Falsifier.** Show the spring loop preserves the tour's rotation (it cannot — `transformFunc` composes `rotate` solely from `transform?.rotate`, and the loop passes `rotate: springSpin.value`), or show `seatFromPose` decomposes the matrix rotation (it reads `m41`/`m42` only). *Magnitude of the visual jump is `UNPROVEN-NEEDS-LIVE`; its existence is proven.*

### L-6 · MAJOR · the `c` hotkey hijacks ⌘C / Ctrl+C

`useSquareKeyboard.ts:72-77`

```ts
const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "c" || e.key === "C") { e.preventDefault(); tourEnvelope(); return; }
```

No `ctrlKey` / `metaKey` / `altKey` guard, and the handler is bound raw to the focused box (`SquareScene.vue:53`). With the box focused, ⌘C/Ctrl+C launches the envelope tour and `preventDefault()`s the browser's copy. There is also no `e.repeat` guard (held-key auto-repeat re-enters, harmlessly absorbed by the `touring` latch at `:49`), and the key bypasses the demo's own shortcut registry (`registerShortcut` from `@mkbabb/glass-ui/keyboard`, `EditorShell.vue:122`), so it is invisible to the shortcuts modal.

**Falsifier.** Show a modifier guard upstream of `onKeydown` (there is none — the binding is direct), or show a browser where keydown `preventDefault` does not suppress copy. Even under that falsifier the *tour firing on a copy gesture* remains a defect.

### L-7 · MAJOR · `transformFunc` and `colorAt` throw **inside** the engine's rAF render

`num()` (`useSquareDemo.ts:78-90`) raises `TypeError` on any leaf that is not a bare number or a numeric-unit string. `useSquareTumble.ts:23,36,38` raise `TypeError` on a colour that fails to parse/mix/serialize. Both are invoked from the frame path.

The engine does **not** guard the call: `interpolate.ts:301-307`

```ts
if (transformFrames) {
    if (anim.unflatten) frame.transform(frame.vars, t);
    else                frame.transform(frame.flatVars as V, t);
}
```

reached from `renderMultiTarget` (`entries.ts:91-99`) ← `AnimationGroup._renderFrame` ← the group's draw loop. `colorAt` sits inside `frame()` under `useSweepScene`'s `RAFPlayback`.

**Reachability, probed against the installed value.js 4.0.0:**

```
parseCssScalar("90px")          -> {type:"number", value:90,  unit:"px"}
parseCssScalar("calc(1px+2px)") -> ERR            // → num() throws
```

`calc()` is ordinary CSS a user types into the live keyframes editor (L-2's same path). One `calc()` and the group's draw loop dies with an uncaught exception.

**Falsifier.** Show a `try`/`catch` around the transform in the engine or around `frame` in `RAFPlayback`, or show the editor cannot deliver an arbitrary value string to this animation. (I traced the editor path in L-2; it can.)

### L-8 · MAJOR · `isPlaying` is never exposed — the whole `playback` FSM branch is unreachable

`SquareScene.vue:313-323`

```ts
defineExpose({
    facility,
    superKey,
    // T.A13 — the writable play state the App toggles … `onPlayStateChange` writes `isPlaying` …
});
```

The comment describes an expose that **is not in the object**. Corroboration:

- `demo/app/scene/sceneExposedApi.ts:16-34` — `SceneExposedApi` has `facility`, `tabsContent`, `ribbonContent`, `headerLeft`, `superKey`, `autoPlays`, `isStarted`. **No `isPlaying`.** `sceneRef` is typed to it (`App.vue:209`), so even an exposed ref would be a type error at the reader.
- Nothing writes `sceneRef.value.isPlaying` anywhere (`useSceneMachineShellBinding.ts:263-266` writes only `isStarted`).

Therefore `isPlaying` is written exactly once, to `false`, at `:240` — a no-op on an already-`false` ref, so `watch(isPlaying, …)` at `:165-168` **never fires**, `mode` can never take `"playback"`, and the `else if (mode.value === "playback")` arm at `:167` is unreachable. ~20 lines of FSM narrative with zero runtime effect. (CubeScene exposes `isPlaying` at `CubeScene.vue:250`; AmigaScene does not — so the invoked "cube/amiga contract" does not exist as a contract either.)

**Falsifier.** Show a reader of a scene-exposed `isPlaying`, or a second `defineExpose`/`expose` in this SFC. There is one `defineExpose`, and no reader.

### L-9 · MAJOR · `mode` is write-only — `data-square-mode` has zero consumers

`mode` is declared at `SquareScene.vue:113-114` and written at `:138, :166, :167, :242, :278`. Its single read is the DOM binding `:data-square-mode="mode"` (`:48`). Repo-wide:

```
$ grep -rn "square-mode\|squareMode" . --exclude-dir=node_modules --exclude-dir=.git
demo/scenes/square/SquareScene.vue:48:            :data-square-mode="mode"
```

One hit — the binding itself. No CSS selector (`SquareScene.css`, `SquareInstrument.vue` styles), no vitest, no `scripts/gates/**`, no observe driver reads it. Combined with L-8, the three-state FSM that the file's largest comment block exists to explain is a write-only variable feeding an attribute nobody reads, and it can only ever hold two of its three states.

**Falsifier.** Produce any consumer of `data-square-mode` — a stylesheet, a gate, a Playwright selector. The grep above is exhaustive over the working tree.

---

## MINOR

### L-10 · MINOR · `num()` is unit-*blind*, not "unit-honest"

`useSquareDemo.ts:78-90` special-cases only `%`; every other unit is silently dropped and the bare number re-emitted as `px`/`deg` by position (`:125-128`). Probed against the installed value.js:

```
parseCssScalar("5rem")  -> {value:5,  unit:"rem"}   →  num() = 5   →  translate(5px, …)
parseCssScalar("90deg") -> {value:90, unit:"deg"}   →  num() = 90  →  translate(90px, …)
```

The doc calls this "THE UNIT-HONEST `num()` NORMALIZER" (`:66`). It is a unit *stripper*. (Also dead: the `pct ? 1 : 0` arm at `:79` is unreachable for `pct === true` — the only percent call site guards `!= null` first, `:108`.)

**Falsifier.** Show `parseCssScalar` rejects non-px length units, or a unit check downstream of `num()`. Neither exists.

### L-11 · MINOR · the tumble's "seamless by construction" landing is false

`useSquareDemo.ts:230-236` and `SquareScene.css:38-50` both assert the sweep's terminal stop **is** the box's rest hue, so clearing the inline background lands seamlessly. Measured from the tree:

| token | site | sRGB |
|---|---|---|
| `--rainbow-green` (sweep terminus) | `design-idioms.css:18` `hsl(130 70% 50%)` | `rgb(38, 217, 68)` |
| `--subject-teal` (box rest hue) | `design-idioms.css:54` `#52e898` | `rgb(82, 232, 152)` |

Oklab distance ≈ **0.095** — roughly 5× a comfortable JND. A pure green snapping to a mint. Worse, `colorAt` is keyed on `(value mod 360)/360` (`:219`), which is in `[0,1)` and therefore **never reaches** the green stop at `t = 1`; at exactly 360° it wraps to `t = 0` = violet (`useSquareTumble.ts:27-33`). Related and latent: the three hues are resolved **once** at mount from `document.documentElement` (`useSquareTumble.ts:12-19`), so a later theme change would not re-resolve them — benign today only because `--rainbow-*` has no `.dark` override (`design-idioms.css:15-21` is the sole declaration).

**Falsifier.** Show `--subject-teal` equals `--rainbow-green` (the hex values above disprove it), or show the sweep is re-normalized to end on green.

### L-12 · MINOR · all three springs decline the engine's reduced-motion policy

`useSquareDemo.ts:60-61` and `useSquareTumble.ts:8` construct `SpringProgress` with `{response, dampingFraction, initial}` only. `respectReducedMotion` defaults to **`false`** (`src/animation/physics/spring/types.ts:112-120`), so `reseatTarget`'s PRM snap arm (`progress.ts:214-235`) is never taken. Four sibling demo sites *do* opt in — `useSceneSwap.ts:45`, `TypingDots.vue:91`, `AnimationVisualizer.vue:147`, `animationOptionsStore.ts:49`. Square has **zero** JS PRM sites; its CSS blocks (`SquareScene.css:136-159`, `SquareInstrument.vue:207-211`) drop only decoration and explicitly keep the motion ("the box still tumbles + sweeps colour"). This sharpens lane-frontend §6.5's "conscientious but inconsistent in mechanism": square is the inconsistency.

**Falsifier.** The keep-the-tumble comment is evidence of *deliberate* posture, which is why this is MINOR rather than MAJOR; it dies entirely if a PRM opt-in is shown on any of the three springs.

### L-13 · MINOR · `singleTarget = false` is a render-path switch that `setTargets` silently reverts

`SquareScene.vue:180` forces `animationGroup.singleTarget = false` to route the group down `renderMultiTarget` (the only path that hands a child its nested authored vars). But `AnimationGroup.setTargets()` **recomputes** the flag (`group.ts:201-204`), as does the constructor (`:158-161`). The scene survives only because it attaches targets to the *child* (`SquareScene.vue:198` `anim.setTargets(...)`) — an invariant nowhere stated. Square is the only scene that hand-forces the flag; a future `animationGroup.setTargets(box.value)` (the ergonomic call) silently flips it back to `true` and changes the paint path.

**Falsifier.** Show `setTargets` preserves a manually-set `singleTarget` (`group.ts:201` overwrites unconditionally). *Whether the grouped path would still paint correctly is `UNPROVEN-NEEDS-LIVE` — the revert itself is proven.*

### L-14 · MINOR · a dead import, and nothing in the repo can catch it

`SquareScene.vue:81` imports `computed`; `grep -n computed SquareScene.vue` returns that line only. It survives because **no `.vue` script in this repo is ever type-checked or linted**: `package.json` `check` is `tsc --noEmit && tsc --noEmit -p tsconfig.test.json` over `include: ["src/","demo/"]`, `vue-tsc` is absent from devDependencies, `node_modules/.bin` has no `vue-tsc` and no `eslint`, there is no eslint config file, and `lint` is `depcruise src` (source only). `noUnusedLocals` is also unset (`tsconfig.json`). This is the enabling condition for L-8's phantom expose as much as for the dead import.

**Falsifier.** Produce a script or CI step that type-checks `demo/**/*.vue`.

### L-15 · MINOR · the readout sync is triplicated across two redundant mirrors

`springReadout` (strings, `:184`) and `axisNow` (numbers, `:191`) are two reactive mirrors of the same two scalars in two formats, written at three sites: `:266-268`, `:279-281`, `:305-307`. Six copied lines that collapse to one `syncReadouts()` reading `springX.target`/`springY.target`. The two formats are also produced by *different* rounding rules — `toFixed(2)` vs `Math.round(x*100)/100` — which disagree on tie-adjacent doubles (probed: `0.345 → "0.34"` vs `0.35`; `-0.125 → "-0.13"` vs `-0.12`), so `aria-valuenow` and `aria-valuetext` can announce different numbers.

**Falsifier.** The divergence needs a drag target landing within ~1 ulp of a `.005` boundary, so it is vanishingly rare in practice — the *duplication* is the load-bearing claim, not the rounding.

### L-16 · MINOR · an unregistered stub `ScenePlayback` decoy is minted every mount

`useSquareDemo.ts:259-265` calls `useSweepScene` with `getProgress: () => 0` and `setProgress: () => {}`. `useSweepScene` builds a full `createRafAdapter` from those stubs (`useSweepScene.ts:97-107`) — and square destructures only `{playback, startLoop, stopLoop}`, so the adapter is never registered (square registers `facility.playback`, the *group* adapter). A `ScenePlayback` whose progress round-trip is a constant `0` is exactly the "decoy" shape `scene-facility/index.ts:13-18` declares deleted ("there is no third 'decoy' state … `proof:scene-facility`'s decoy-zero clause is GREEN and blocking").

**Falsifier.** Show a registration of square's `scenePlayback`. `useSquareDemo.ts:403` does not even return it.

### L-17 · MINOR · the progressive hint discloses on a tap, not a drag

`hasDragged = true` is set in `captureFrame` (`SquareScene.vue:230`), which `useDragScrub` invokes on **every** `pointerdown` (`useDragScrub.ts:124`), with no movement threshold. The comment two lines above promises disclosure "once the first drag settles" (`:128-129`). A single click on the box reveals both hints ("double-click to tumble", "press C to trace the field", `SquareInstrument.vue:45-55`). `useDoubleTap` shows the house pattern for the distinction (a `moveTolerance` of 12 px, `useDoubleTap.ts:38-41,65-68`) — it is simply not used here.

**Falsifier.** Show a move threshold on `hasDragged`. There is none.

### L-18 · MINOR · `onBeforeUnmount` against the folder's `onScopeDispose` idiom

`useSquareKeyboard.ts:98-100` uses `onBeforeUnmount`, while every sibling in the same folder/seam uses `onScopeDispose` (`useSquareDemo.ts:401`, `useSquareTumble.ts:48`, `useSweepScene.ts:112`). `onBeforeUnmount` requires a component instance and warns without one — which the repo's own suite triggers, calling `useSquareKeyboard` bare inside `it()` (`test/demo/scenes/square-scene.test.ts:29-36`, no `effectScope`, unlike the `useSquareDemo` case at `:91`).

**Falsifier.** Show Vue no longer warns on `onBeforeUnmount` outside an instance.

### L-19 · MINOR · the cure this scene exists for has no regression test

`test/demo/scenes/square-scene.test.ts` (98 L) covers `useSquareKeyboard` (7 assertions) and a 4-line `useSquareDemo` smoke construct (`:90-96`). Untested: `transformFunc`, `num()` — the "0pxpx" CSSOM-discard cure that the entire T.A13 narrative is built on (`useSquareDemo.ts:66-90`) — `seatFromPose`, `frame()`, and the whole of `useSquareTumble` (`colorAt`'s oklab mix and its three throw sites). The exact regression the scene was rebuilt to prevent (a `"42px"` leaf interpolated into `` `${v}px` ``) would ship silently.

**Falsifier.** Point to a test asserting `num("42px") === 42` or that the painted `transform` string is unit-valid. None exists in `test/`.

### L-20 · MINOR · glass-ui phantom-dep exposure lands on this component's first import

`SquareScene.vue:82` — `import { Card } from "@mkbabb/glass-ui"`. Re-verified against this tree (confirms lane-frontend **F-1**): `package.json` declares only `@mkbabb/value.js@4.0.0` under `@mkbabb/*`; the lockfile has zero `glass-ui` entries; 7.0.0 sits in `node_modules` from an install that predates the removal. `npm ci` therefore cannot resolve `:82`, and the scene fails to build. Two sub-points local to this file: (a) glass-ui exposes a `./card` subpath (73 exports) yet the root barrel is imported; (b) the scene has exactly one glass-ui symbol, so it is a cheap fix candidate but not an escape from F-1.

**Falsifier.** Show `@mkbabb/glass-ui` in `package.json`/`package-lock.json`. It is in neither.

---

## INFO

### L-21 · INFO · the `Card` prose does not match the `Card` call

`SquareScene.vue:2-9` documents the plate as `<Card surface="glass" tier="resting" :shadow="false">`; the element at `:10-13` passes only `:shadow="false"`. Against the installed 7.0.0: `surface` defaults to `"glass"` (`dist/Surface-DOHf5u2R.js:14`) so that half is a no-op, `shadow` defaults to `false` (`:19-22`) so `:shadow="false"` is redundant, and `tier` has **no** default (`tier: {}`) — the documented `tier="resting"` is simply absent. **This is prose-vs-tree only, not a visual divergence:** every sibling protagonist plate passes the identical props (`SpringTarget.vue:10-12`, `EasingTarget.vue:11-15`, `SequenceTarget.vue:8`), so the square renders consistently with them.

**Falsifier.** Show `tier` has a default of `"resting"` in the installed build. It does not.

### L-22 · INFO · two smaller seams

(a) **The spring loop erases the tour's fill-forwards colour.** `useSquareDemo.ts:234-236` clears `el.style.backgroundColor` whenever `springSpin.settled` — keyed on the *egg's* spin state, not on paint authority. So any drag after a paused tour silently discards the engine's `fillMode: "forwards"` background. (b) **Forward `const` references across ~120 lines** — the callbacks passed at `SquareScene.vue:138` and `:147` close over `animationGroup` (declared `:174`) and `dragging` (declared `:256`). Safe only because nothing invokes them during setup; any future synchronous `onTick`/`onSettle` inside `useSquareDemo`'s body becomes a TDZ `ReferenceError`. (c) **Prose density** — the `<script setup>` block is 245 lines, of which 102 are comment-only and 21 blank: 122 lines of code, a 0.84 : 1 comment-to-code ratio, keyed almost entirely to internal tranche ids (`T.A13`, `J.W7a S2`, `P.W6 S1(a)`, `S.G2`, `L.W11 S4`, `I.W4 D1/D2`, `D1/SQ-3`) that are unresolvable from the published repo. This is the library's public showcase source.

---

## SUPERLATIVES (L-18 runs both ways)

### S★-1 · the only end-to-end `unflatten` consumer in the demo — and the routing is exactly right

`animationGroup.singleTarget = false` (`SquareScene.vue:180`) sends the group down `renderMultiTarget` (`group.ts:225-235`) → `entry.animation.interpFrames(t, true)` (`entries.ts:96`) → `interpolate.ts:302-303` `frame.transform(frame.vars, t)` — the **only** path that hands a child its NESTED authored shape rather than the flattened composite. The scene reads `transform.a.b.c.d` (`useSquareDemo.ts:108`), a leaf that maps to no CSS property, every frame. This is genuine, non-decorative coverage of a library feature nothing else exercises. *Falsifier: show another demo scene that drives `unflatten` through a group render — I found none.*

### S★-2 · `seatFromPose`'s matrix read is mathematically correct, and its failure mode is documented

`useSquareDemo.ts:303-320`. The painted string is `translate(tx,ty) rotate() skew() scale()`; translation is the leftmost factor, so the composed matrix's `m41`/`m42` are **exactly** `tx`/`ty` — no decomposition needed, no approximation. The `catch` carries a `KEEP:` rationale ("a malformed/'none' transform → seat at home … best-effort by design") rather than a silent swallow. The translation half of the takeover is exemplary; only its incompleteness is L-5.

### S★-3 · one loop, one paint authority, zero hidden rAFs

`useSweepScene` owns the single `RAFPlayback` (`useSweepScene.ts:78`); all three springs are driven as pure `Tickable`s via `tickDt` (`useSquareDemo.ts:167-169`) and **never** `.play()` — so `SpringProgress`'s internal `springStartLoop` auto-resume (`progress.ts:206-235`, armed only when `_onFrame` is set) is never triggered. No second loop is possible by construction. The velocity tilt/squash (`:183-200`) are derived reads of the already-tracked `spring.velocity` — zero new physics, zero new state, riding the same single `transform` write. The loop self-terminates on settle (`:239`) and `reseat` re-arms it, so the idle cost is literally zero.

### S★-4 · teardown is belt-and-braces and genuinely idempotent

`onScopeDispose(dispose)` inside the composable (`useSquareDemo.ts:401`) *plus* `onBeforeUnmount(… dispose())` in the host (`SquareScene.vue:204-207`). The double call is provably harmless: `RAFPlayback.stop()` is idempotent and `SpringProgress.dispose()` is a flag + `stop()` + `subscribers.clear()` (`progress.ts:461-465`). The stated rationale (`useSquareDemo.ts:393-400`) — "the raw RAFPlayback loop owner MUST stop on dispose itself, not lean on a host remembering to call dispose()" — is the right ownership posture, and `useSquareTumble.ts:48` disposes its own spring rather than leaking it into the parent's `dispose`.

### S★-5 · seam discipline and colocation

The drag rides the ONE shared `useDragScrub` with a **declared** `releasePolicy: "persist"` (`SquareScene.vue:256-283`) instead of a hand-rolled `window` drag, inheriting global select-suppression and `pointercancel` recovery for free. The tumble rides `useDoubleTap` (pointer-based, touch-reachable) instead of the desktop-only `@dblclick`. The folder is a model unit: 6 files, one key module, the instrument's markup **and** its styles colocated in the sub-unit while the scene keeps only the subject + stage (`SquareScene.css:8-10` says so and the tree obeys). Every file is well under the 500 L decomposition floor.

---

## Corpus reconciliation (hitherto lanes)

| id | this challenge |
|---|---|
| `lane-frontend.md` **F-1** (glass-ui phantom dep, RED) | **CONFIRMED at this component's import site** — L-20. Re-probed: no `@mkbabb/glass-ui` in `package.json` or the lockfile; 7.0.0 installed. |
| `lane-frontend.md` §6.5 (13 PRM sites, "inconsistent in mechanism") | **SHARPENED** — L-12. Square carries 2 CSS PRM blocks and **zero** JS PRM; all three of its `SpringProgress` instances decline `respectReducedMotion` while 4 sibling sites opt in. |
| `lane-frontend.md` §4 roster row `square/SquareScene.vue 331 G — square scene — Card` | **CONFIRMED** exactly (331 L, one glass-ui symbol). |
| `lane-frontend.md` §3.1 (21/73 subpaths; root barrel = 31 uses) | **CONFIRMED**; this file is one of the 31, and a `./card` subpath exists (L-20b). |
| `lane-frontend.md` **F-5** — "`composables/useAnimationGroupPlayback.ts` is **DEAD** — zero consumers" | **CONTRADICTED.** It has one consumer: `test/demo/state/no-shadow-playback-authority.test.ts:21` imports through the shim. F-5's grep was run with `cd demo`, so `test/` was outside its scope. The shim is still a `feedback_no_backwards_compat` violation — but deleting it *breaks the suite*, so the remediation is "repoint the test **and** `ChannelControls.vue:230`, then delete", not "delete". |
| `lane-library.md` (parse seams) | No overlap with this component beyond L-7/L-10's use of `parseCssScalar`/`parseCssColor`, probed directly against installed value.js 4.0.0. |

## Provenance note

Nothing was written, mutated, or executed in `keyframes.js`; no installs, no dev server, no browser. The only writes are this file and its parent directories. Value.js parse probes were read-only `node --input-type=module` evaluations against the already-installed `@mkbabb/value.js@4.0.0` (`parseCssScalar`, `parseCssColor`, `mixColors`, `convertColor`) plus pure-JS float arithmetic; no product source was touched in any repo.

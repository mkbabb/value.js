claude-opus-5[1m]

# CHALLENGE · SquareScene · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/square/SquareScene.vue` (331 L)
**Read whole, plus every import** — `useSquareDemo.ts` (404 L) · `useSquareKeyboard.ts` (103 L) · `useSquareTumble.ts` (50 L) · `SquareInstrument.vue` (212 L) · `SquareScene.css` (159 L) · `squareKeys.ts` (5 L) · `demo/kf-engine.ts` · `demo/composables/useDragScrub.ts` · `demo/composables/useDoubleTap.ts` · `demo/composables/scene-facility/index.ts` · `demo/composables/scene-runtime/useSweepScene.ts` — and, as read-only evidence, the library/design-system surfaces they bind: `src/animation/physics/playback.ts`, `src/animation/physics/spring/{progress,types}.ts`, `src/animation/group/group.ts`, `src/animation/engine/css/css-animation.ts`, `demo/state/scenePlaybackAdapters.ts`, `demo/app/scene/{sceneExposedApi,useSceneMachineShellBinding}.ts`, `node_modules/@mkbabb/glass-ui/dist/**`, `node_modules/@mkbabb/value.js@4.0.0/dist/**`.

**Posture.** The component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries file:line provenance and a falsifier; where a claim could only be settled by a browser it is marked **UNPROVEN-NEEDS-LIVE** and routed to SS-13. Four claims were *killed* during the audit and are recorded in §5 so the parent does not re-file them.

**Tally** — 15 findings (1 BLOCKER · 5 MAJOR · 8 MINOR · 1 INFO) · 4 superlatives · 4 self-falsified non-findings.

**Hitherto corpus folded** (`docs/tranches/V/megatranche/formation/keyframes/`): `lane-frontend.md` F-1 (phantom glass-ui dep), S-1..S-8 shadow census, the 331-L row at `lane-frontend.md:239`; `lane-library.md §4.6` (the two square parse consumers, one flagged "the known R1 crash surface"). Overlaps cited inline; one explicit **census gap** filed at C-14.

---

## 1. BLOCKER

### C-1 · The colour half of this component's value.js consumption is dead paint — `background-color` is occluded by the element's own opaque `background-image`

**Severity BLOCKER.**

`useSquareDemo.ts:138` is the single colour write:

```ts
if (backgroundColor) el.style.backgroundColor = backgroundColor;
```

`el` is `.demo-box`, and `.demo-box`'s own scoped rule (`SquareScene.css:51-56`) paints an **opaque background-image over it**:

```css
background-color: var(--subject-teal);
background-image: linear-gradient(
    to bottom,
    color-mix(in oklab, var(--subject-teal) 92%, white 8%),
    var(--subject-teal)
);
```

CSS Backgrounds & Borders L3 §3.10: the background *color* is painted **underneath all background images**. Both operands of the `color-mix()` are opaque (`--subject-teal: #52e898`, `white`), so the gradient layer is fully opaque end-to-end — an inline `style.backgroundColor` on this element cannot produce a single visible pixel.

Two independent writers land on that dead channel:

1. **The tumble egg's palette sweep** — `useSquareDemo.ts:218-221` calls `tumbleColorAt(...)`, i.e. `useSquareTumble.ts:27-40`, which is the *entire* reason `parseCssColor` + `mixColors` + `serializeCssColor` are in this component's graph.
2. **The four-corner tour's rainbow keyframes** — `useSquareDemo.ts:349-368` authors `backgroundColor: "#C462D8" / "#5AC8FA" / "#3DD0C4" / "#52E898"` on all five stops.

So the component imports three value.js colour entry points across two subpaths (`@mkbabb/value.js/css`, `@mkbabb/value.js/color`), runs an oklab interpolation every frame of a tumble, and paints the result nowhere.

**Why it survived.** `useSquareDemo.ts:222-228` marks the box `data-palette-sweep` while the sweep is "live", and the comment at `:224` states the design-refinement browser probe reads `palette|sweep` **on the box**. The gate witnesses the *attribute*; the attribute is set unconditionally alongside the paint. `SquareScene.css:130-134` then hangs a `box-shadow` bloom off that attribute — which *is* visible — so the egg reads as "working" to both the probe and a casual look while its actual colour channel is inert.

This is the historical rhyme worth naming: the component's own docblock (`useSquareDemo.ts:66-77`, `SquareScene.vue:94-106`) celebrates curing the S.G2 `"0pxpx"` CSSOM-discard that made Play paint nothing. The *positional* half of that cure landed. The *colour* half is still painting nothing — for a different reason (paint order, not CSSOM rejection) — and no gate can tell.

**Falsifier.** Render the box with `data-palette-sweep` set (double-tap it) and sample the painted pixel at the box centre. If the sampled pixel tracks the swept hue rather than the `--subject-teal` gradient, this claim is dead. Equally fatal: any rule anywhere setting `background-image: none` on `.demo-box[data-palette-sweep]` or during playback — I grepped every `.demo-box` selector in the tree (`SquareScene.css:28,71,83,104,118,130,141-152` are the *complete* set; `demo-box` appears in no other file) and none resets `background-image`. **UNPROVEN-NEEDS-LIVE** for the pixel sample; CONFIRMED-BY-SPEC + source for the occlusion.

---

## 2. MAJOR

### C-2 · `isPlaying` is a dead shadow ref — never exposed, never written by the App; the documented three-state FSM is a two-state one

**Severity MAJOR.**

`SquareScene.vue:107` declares `const isPlaying = ref(false)` and `:105-106` claims it is "the WRITABLE ref the App toggles (the cube/amiga group-scene contract)". The tree contradicts every clause:

- **Not exposed.** `defineExpose({ facility, superKey })` at `:313-323`. The trailing comment block at `:318-322` *describes* `isPlaying` — inside the `defineExpose` object literal, as prose — but the property is absent. `CubeScene.vue:250` does list `isPlaying` in its expose; square does not.
- **Not in the contract.** `demo/app/scene/sceneExposedApi.ts:16-34` — the typed `SceneExposedApi` has `facility`, `tabsContent`, `ribbonContent`, `headerLeft`, `superKey`, `autoPlays`, `isStarted`. No `isPlaying`.
- **Not written.** `useSceneMachineShellBinding.ts:246-259` `onPlayStateChange` dispatches `machine.dispatch({type: playing ? "PLAY" : "PAUSE"})`. The only handler that writes back through `sceneRef` is `onStartStateChange` (`:261-267`), and it writes `isStarted`. Grep for a write to `sceneRef.value.isPlaying` across `demo/app/`, `demo/state/`, `demo/components/instrument/transport/`: zero.

The **only** writer of the square's `isPlaying` is `SquareScene.vue:240` — `isPlaying.value = false` — inside `captureFrame`. The ref is initialised `false`. A ref write of the identical value does not trigger. Therefore `watch(isPlaying, ...)` at `:165-168` **can never fire**, `mode.value = "playback"` at `:166` is unreachable, and the "single-authority {idle, drag, playback} FSM" the T.A13 docblock spends 13 lines describing (`:94-106`, `:111-114`, `:160-164`) is a two-state machine.

The aggravating context is that this repo has an explicit anti-shadow law. `useSpringDemo.ts:44-46`, `useEasingDemo.ts:54-56`, `useSequenceDemo.ts:49-54` each record deleting exactly this pattern ("the private `isPlaying = ref(true)` … was the D12 shadow-authority smell; DELETED"), and `AnimationControlsGroup.vue:151-154` records retiring the `machinePlaying` prop for the same reason. There is even a proof file, `test/demo/state/no-shadow-playback-authority.test.ts` — which I read: it asserts *scrub persistence*, not shadow-ref absence, so it does not bite here. Square re-introduced the very thing three siblings excised.

**Falsifier.** Any code path that sets `isPlaying.value = true`. I grepped `isPlaying` across the whole demo tree; the square's occurrences are `:104,105,107,165,240,320` and none is a `true` write. If `<Suspense>`/`v-bind` or a template ref could reach it — it is not in `defineExpose`, and `<script setup>` bindings are private without it. Kill this claim by producing one `true` write.

### C-3 · `captureFrame` pauses the AnimationGroup behind the machine's back — `machine.status` and the transport button desync

**Severity MAJOR.**

`SquareScene.vue:237-241`:

```ts
if (animationGroup.started && !animationGroup.paused) {
    animationGroup.pause();
    seatFromPose();
    isPlaying.value = false;   // ← the intended sync
}
```

The comment at `:235-236` says this "sync[s] the App-written play state so the transport reflects the pause". By C-2 that write reaches nothing. Meanwhile the *real* transport authority is the machine: `AnimationControlsGroup.vue:151-154` records that `useAnimationGroupPlayback` "now projects `isPlaying` directly off `machine.status` (the single authority)", and playback for square reaches the group only through `facility.playback` = `createGroupAdapter` (`scene-facility/index.ts:110`, `scenePlaybackAdapters.ts:37-105`).

Calling `animationGroup.pause()` directly bypasses that adapter. `machine.status` stays `playing`; `TransportDock.vue:63,75,79` keep rendering the Pause glyph and the "Pause" tooltip while the group is, in fact, paused. The first press of that button then dispatches `PAUSE` → `adapter.suspend()` → `group.started && !group.paused` is now false → the `else` arm `group.playback.stop()` (`scenePlaybackAdapters.ts:87-93`). The state recovers, but the UI has lied for one interaction and the user has spent a click undoing a pause that already happened.

**Falsifier.** Show that `machine.status` is derived from `facility.isPlaying()` (i.e. `getGroup().playing()`, `scene-facility/index.ts:114`) rather than from the machine's own reducer state — then the direct pause *would* propagate. `AnimationControlsGroup.vue:151-154` says otherwise, but that is prose; the reducer in `demo/state/sceneMachine.ts` is the arbiter. **UNPROVEN-NEEDS-LIVE** for the visible glyph; CONFIRMED for the bypass.

### C-4 · The keyboard layer never pauses the group — two writers on `el.style.transform`

**Severity MAJOR.**

The whole T.A13 justification (`useSquareDemo.ts:33-38`) is: *"The two writers (the spring drag loop and the engine tour) are never simultaneous — the {idle,drag,playback} FSM in the host pauses the group on a drag."* That guarantee is implemented in exactly one place: `captureFrame` (`SquareScene.vue:237-241`), which runs on **pointerdown only** (`useDragScrub.ts:112-126` → `onStart`).

The box is `tabindex="0"` (`SquareScene.vue:51`) with an unconditional `@keydown="onKeydown"` (`:53`). `useSquareKeyboard.ts:72-96` handles `ArrowLeft/Right/Up/Down`, `Home`, `End`, and `c`; every branch calls `reseat(nx, ny)`, which is `useSquareDemo.ts:272-276` → `startLoop()`. It has **no reference to `animationGroup` at all** — `SquareScene.vue:300-309` wires it only `{springX, springY, reseat, onTarget}`.

So: press Play (group tours the diamond, writing `el.style.transform` every frame via the shared `transformFunc`), focus the box, press `→`. The spring loop arms and writes `el.style.transform` every frame too. Two rAF-driven writers on the same CSS property on the same element, last-write-wins per frame, indefinitely — the exact condition the FSM exists to prevent.

The `c` envelope-tour egg is worse: `useSquareKeyboard.ts:48-69` chains five legs on 520 ms timers, so the contention lasts ~2.6 s minimum and re-arms the loop five times.

Note the tumble egg is *accidentally* safe: a double-tap goes through `pointerdown` (`SquareScene.vue:52`), so `captureFrame` fires and pauses the group before `useDoubleTap` (`:287-292`) ever recognises the second tap. The keyboard is the only gap — and it is the path with no pointer at all.

**Falsifier.** Any gate on `onKeydown` that early-returns while the group plays, or any listener that pauses the group on `focus`/`keydown`. `SquareScene.vue:44-54` and `useSquareKeyboard.ts` are the complete keyboard surface; there is none. Kill this by showing `AnimationGroup` writes a *different* property than `transform` during playback — but `useSquareDemo.ts:125-128` is the single `transformFunc` shared by both writers, so it writes the same string.

### C-5 · The tumble sweep crosses its own palette wrap 6× per tumble, and the token substitution broke the "seamless landing by construction" invariant

**Severity MAJOR.** (Masked today by C-1; both become visible the moment C-1 is fixed — file them together.)

**(a) The wrap flicker.** `useSquareDemo.ts:219` keys the sweep off the angle *within* the current turn:

```ts
backgroundColor: tumbleColorAt(((((springSpin.value % 360) + 360) % 360) / 360))
```

`useSquareTumble.ts:8` builds that spin with `dampingFraction: 0.58` — underdamped, so it overshoots its `+360` target. Simulated against the **real installed `SpringProgress`** at the shipped params (`response: 0.55, ζ: 0.58`, 16.67 ms dt): peak **398.4°**, and the trajectory crosses the 360° boundary **6 times** before settling at frame ~121 (~2.0 s). Each crossing snaps `t` between ~0.99 (the green terminal stop) and ~0.02 (the violet origin stop) in one frame. The comment at `:257-258` asserts "the colour sweep keys off `value mod 360`, so it cycles every turn" — it does, but the *settle tail* cycles it six more times as a flicker, not once as a sweep.

**(b) The broken landing.** `useSquareDemo.ts:230-236` claims: *"the sweep's rainbow-green terminal stop IS that token's value, so the landing is seamless by construction, J.W7a D13"*, echoed by `SquareScene.css:38-44` (`--subject-teal` is "the EGG_HUES terminal stop"). That was true of the **hard-coded fallback**: `useSquareTumble.ts:9` has `hues[2] = "#52E898"`, and `design-idioms.css:55` defines `--subject-teal: #52e898`. Identical.

Then `useSquareTumble.ts:12-19` overwrites all three stops at mount from `--rainbow-violet`, `--rainbow-cyan`, `--rainbow-green`. `design-idioms.css:19` defines `--rainbow-green: hsl(130 70% 50%)` ≈ `rgb(38 217 68)`. The box's rest colour is `--subject-teal` = `rgb(82 232 152)`. Those are not the same colour. The "provenance fix" the comment at `useSquareTumble.ts` / `useSquareDemo.ts:150-157` describes as riding "the sanctioned crayon family by construction (hue-exact, zero drift)" is precisely what *introduced* the drift it claims to eliminate — it swapped the one literal that was token-exact for a token that is not.

Compounding: because of (a), the last frame actually painted before the clear at `useSquareDemo.ts:234-236` sits near value 360.0-360.4 → wrapped `t ≈ 0` → **violet**, not green at all.

**Falsifier.** Re-run the spring sim at the shipped params and show ≤1 wrap crossing (kills (a)); or show `--rainbow-green` resolving to `#52e898` in the live cascade, e.g. a `.dark` or media-query override of the token (kills (b)). I grepped `--rainbow-green` across `demo/`: `design-idioms.css:19` is the sole definition, unconditional. Also fatal to (b): if `getPropertyValue("--rainbow-green")` returned empty at mount, the `if (value)` guard at `useSquareTumble.ts:17` would keep the `#52E898` fallback — but `:root` is unconditional, so it resolves.

### C-6 · Every `SpringProgress` in this scene declines the library's `respectReducedMotion` seam, against the house contract its siblings honour

**Severity MAJOR.**

Three constructions, none passing the option:

- `useSquareDemo.ts:60-61` — `new SpringProgress({ response: 0.32, dampingFraction: 0.62, initial: 0 })` ×2
- `useSquareTumble.ts:8` — `new SpringProgress({ response: 0.55, dampingFraction: 0.58, initial: 0 })`

`src/animation/physics/spring/types.ts:119` — `respectReducedMotion: false` is the default. `src/animation/internal/reduced-motion.ts:153-162` — `if (!respect && respect !== 0) return run()`. So all three springs animate at full amplitude under `prefers-reduced-motion: reduce`, including the 360° barrel roll.

The house contract exists and is named. `useCubeDemo.ts:159-168` ("the house reduced-motion contract") snaps the graph attitude with a `matchMedia` guard; `useSequenceInstrument.ts:29-33` skips the power-on entirely; `demo/app/transition/useSceneSwap.ts:45`, `TypingDots.vue:91`, `AnimationVisualizer.vue:147` each pass `respectReducedMotion: true` to `SpringProgress`; `demo/state/animationOptionsStore.ts:49` sets `respectReducedMotion: true` as the *default stored animation option*. Square is the sole holdout.

What the scene *does* do under PRM is suppress decoration: `SquareScene.css:136-158` drops the grab-pulse and the bloom halo; `SquareInstrument.vue:207-211` drops the tether fade. `SquareScene.css:152-154` says so explicitly — *"the tumble + colour sweep still play — only the halo is suppressed."* WCAG 2.3.3 (Animation from Interactions) targets the motion, not the glow: a full 360° rotation triggered by a user gesture is exactly the non-essential motion the criterion names. The scene suppressed the harmless layer and kept the harmful one.

The drag springs are arguable (snapping a direct-manipulation control would break the affordance, and `withReducedMotion`'s positive-intensity policy exists precisely for that middle ground — `reduced-motion.ts:160-161`). The **tumble spin has no such defence**: it is a decorative egg.

**Falsifier.** A global PRM guard covering this scene — I grepped `prefersReducedMotion|prefers-reduced-motion|respectReducedMotion` across `demo/**/*.{ts,vue}`; square's only hits are the two CSS media blocks. Also fatal: if `defaultAnimationOptions.respectReducedMotion` (`animationOptionsStore.ts:49`) is applied to the group's animations at mount, the *tour* at least would be covered — that would narrow this finding to the springs, not kill it.

---

## 3. MINOR

### C-7 · F-1 lands directly on line 82: this component imports a phantom dependency

**Severity MINOR** (elevated by blast radius; the lane already owns the root cause).

`SquareScene.vue:82` — `import { Card } from "@mkbabb/glass-ui";`. `lane-frontend.md:15,54,612` records F-1: glass-ui is absent from both `package.json` and `package-lock.json` while 7.0.0 sits in `node_modules`. Verified independently: `package.json:69` declares `@mkbabb/value.js: 4.0.0` and no glass-ui row; `node_modules/@mkbabb/glass-ui/package.json` reports `7.0.0`.

`npm ci` therefore cannot build this file. Flagged here because the census row (`lane-frontend.md:239`) tags SquareScene "G — `Card`" without noting that it is one of the components F-1 actually breaks.

**Falsifier.** A `package.json` field the lane and I both missed (`peerDependencies`, `optionalDependencies`, a workspace protocol) that resolves glass-ui. Grepped all three specifier forms; none present.

### C-8 · Root-barrel import where a `./card` subpath exists — against this repo's own majority discipline

**Severity MINOR.**

`SquareScene.vue:82` pulls a *single* component from the root barrel. glass-ui 7.0.0 publishes 60+ subpaths including `./card` (`node_modules/@mkbabb/glass-ui/package.json` exports map; `dist/card.js` + `dist/card.d.ts` exist).

The demo's own split, counted across `demo/**/*.{vue,ts}`: **31** root-barrel imports vs **~40** subpath imports (`/tooltip` 6, `/forms` 5, `/dock` 5, `/labeled-field` 4, `/tabs` 3, `/keyboard` 3, `/dark-mode-toggle` 3, `/dark` 3, `/status-dot` 2, `/easing` 2, `/chip` 2, and 8 singletons). The sibling that consumes `Metric` reaches for `@mkbabb/glass-ui/metric` (`SequenceTarget.vue:138`). Square is on the wrong side of a discipline its own neighbours keep, for the cheapest possible case: one named export.

**Falsifier.** Measure it. If Vite's ESM tree-shake of the root barrel yields a bundle byte-identical to the `/card` subpath import, this is prose-only and should be downgraded to INFO. That measurement is cheap and I did not run it — the claim as filed is about *discipline consistency*, which stands on the counts above regardless.

### C-9 · The R1 crash class is one token edit away, and a throw inside the frame **bricks** the loop permanently

**Severity MINOR** (not currently reachable; the failure mode when it becomes reachable is severe).

`lane-library.md:243` flags `useSquareTumble.ts:22` as "the known R1 crash surface". Sharpening it with the tree:

**Reachability today: safe.** The inputs are `getComputedStyle(document.documentElement).getPropertyValue(--rainbow-{violet,cyan,green})` (`useSquareTumble.ts:12-19`), which resolve to `hsl(300 75% 60%)`, `hsl(180 80% 50%)`, `hsl(130 70% 50%)` (`design-idioms.css:19-21`). Probed against the installed value.js 4.0.0: all three parse `ok`, `mixColors(..., {space:"oklab"})` returns `ok`, `serializeCssColor` returns `ok`. **The lane's flag is currently a latent, not a live, crash.** Recording that explicitly so the parent does not over-rate it.

**The R1 crash is real in the installed build.** Probed: `parseCssColor("oklch()")` → **throws** `TypeError: Cannot read properties of undefined (reading 'replace')` rather than returning `{ok: false}`. Also probed `!ok` (correct Result) for `color-mix(in srgb, ...)`, `light-dark(#fff, #000)`, `var(--x)`, `rgb(from red r g b)`, `""`.

**Why the seam is fragile.** `useSquareTumble.ts:21-25` handles only the `!ok` branch — and its handler is `throw new TypeError(...)`. So *both* value.js failure modes (an R1 throw, and a well-behaved `!ok` result) exit `colorAt` as an exception. `colorAt` is called from `useSquareDemo.ts:219`, i.e. **inside the rAF frame body**.

**The consequence chain is worse than a dropped frame.** `RAFPlayback._run` (`playback.ts:125-150`) calls `const result = step(now)` at `:139` with **no try/catch**; a throw skips `reschedule` (`:117-123`), so `_cleanup()` at `:121` never runs and `_rafId` is never nulled. `get running()` at `:98` is `this._rafId !== null` → stays `true` **forever**. `useSweepScene.ts:82-87` guards `if (!playback.running)` → `startLoop()` becomes a permanent no-op. Net: one throw and the box stops responding to drag, keyboard, and tumble for the lifetime of the mount, with no error surfaced beyond a console trace.

The trigger surface is small but real: re-author any of three design tokens in a syntax value.js 4.0.0 rejects — `color-mix()` (this codebase's dominant colour idiom: 12 uses in `SquareScene.css` + `SquareInstrument.vue` alone), `light-dark()`, `oklch()`, or a `var()` indirection. A pure-CSS token change bricks a JS animation loop.

**Falsifier.** Show `RAFPlayback` catching per-frame throws (I read `_run` end to end — it does not), or show a value.js version in the resolution graph where `parseCssColor` is total. Also fatal: a token-lint gate forbidding non-`hsl()` values in `--rainbow-*`. None found.

### C-10 · `useSweepScene` is a misfit seam here — a decoy `ScenePlayback` is built, stubbed, and discarded

**Severity MINOR.**

`useSquareDemo.ts:259-265` calls `useSweepScene({ frame, onArm, getProgress: () => 0, setProgress: () => {}, getPlaying: () => playback.running })`.

`useSweepScene` (`useSweepScene.ts:94-107`) *always* constructs a `createRafAdapter` `ScenePlayback` from those getters and returns it as `scenePlayback`. Square:

- feeds it `getProgress: () => 0` and `setProgress: () => {}` — a playhead that is constantly 0 and unseatable;
- **discards** the adapter (`:259` destructures only `{ playback, startLoop, stopLoop }`);
- registers a *different* playback with the machine — `facilityFromGroup`'s `createGroupAdapter` (`SquareScene.vue:311`, `scene-facility/index.ts:110`).

So the scene manufactures exactly the "decoy" object the `SceneFacility` docblock says was deleted (`scene-facility/index.ts:14-18`: *"The contract-group decoy (useContractAnim…) is DELETED — proof:scene-facility's decoy-zero clause is GREEN and blocking"*). It is unregistered, so no gate sees it — but a future author who wires `scenePlayback` up gets a scene that reports progress 0 forever.

Secondary: `getPlaying: () => playback.running` at `:264` reads the `const` being initialised by the same statement. It is a lazy arrow so no TDZ fires today, but it is a self-referential binding one eager call away from a `ReferenceError`.

What square actually wants from this seam is the rAF ownership + `useSceneVisibilityPause` registration (`useSweepScene.ts:112-119`) — those are real and correct. The adapter half is dead weight.

**Falsifier.** Find a consumer of the square's `scenePlayback`. `useSquareDemo.ts:403` returns `{anim, springX, springY, reseat, settle, seatFromPose, travel, startLoop, paintRest, tumble, dispose}` — it is not in the return, so it is unreachable outside the composable.

### C-11 · `animationGroup.singleTarget = false` is a raw poke at library-derived state that `setTargets` silently reverts

**Severity MINOR.**

`SquareScene.vue:180` writes the field directly. But `AnimationGroup` *derives* it in two places: the constructor (`group.ts:159-161`) and `setTargets` (`group.ts:194-206`), both as `entries.every(e => e.animation.targets[0] === entries[0]?.animation.targets[0])`. For a **single-animation** group that predicate is vacuously `true`.

So the invariant square depends on — the per-animation `transformFunc` path rather than the grouped SoA composite (`group.ts:225`, `:289`) — is held by a raw assignment that any future `animationGroup.setTargets(...)` flips back, silently, with the only symptom being a changed paint. No `setTargets` on a *group* exists in `demo/` today (I grepped all 14 `.setTargets(` call sites; every one is on an `Animation`, including square's own `anim.setTargets(box.value!)` at `SquareScene.vue:198`), so it is latent.

The library offers no supported way to pin this. Worth a keyframes.js-side ask: an explicit opt-out rather than a public mutable field the library also owns.

**Falsifier.** Show `singleTarget` documented as a supported consumer-writable knob, or show `render()` honouring a separate flag. `group.ts:73` declares it a bare public field with an initialiser and two internal recomputes — no setter, no doc.

### C-12 · The per-axis ARIA contract goes stale during playback

**Severity MINOR.**

`SquareScene.vue:55-74` gives each axis a complete WCAG 4.1.2 slider contract with a live `:aria-valuenow="axisNow.x|y"`. `axisNow` is written by `syncAxisNow()` (`:192-195`), called from exactly three places: `onScrub` (`:268`), `onEnd` (`:281`), and the keyboard `onTarget` (`:307`).

During the four-corner tour the box travels ±90 px (`useSquareDemo.ts:349-368`) with no drag and no keydown — so `syncAxisNow` never runs and both sliders report the last *drag* target while the subject is somewhere else entirely. `aria-valuetext` (`:63,73`, from `springReadout`) is stale by the same path.

Narrow but real: the sliders are the scene's whole AT surface, and playback is one of its two primary modes.

**Falsifier.** Any `onTick`-side write of `axisNow`. `useSquareDemo.ts:243-247`'s `onTick` snapshot is consumed at `SquareScene.vue:143-152`, which writes `deflX/deflY/settled/tetherActive` — not `axisNow` or `springReadout`. Also fatal: if playback is unreachable — but the group *is* registered with the machine via `facility.playback`, so the transport drives it (C-2 concerns the local ref, not the group).

### C-13 · Four dead artefacts the toolchain cannot catch

**Severity MINOR** (aggregated; each trivial, the *pattern* is the finding).

1. **`computed` imported, never used** — `SquareScene.vue:81`. Zero call sites in the file (grep: the import line is the only `computed` occurrence).
2. **`palette-sweep-host` class, zero definitions** — `SquareScene.vue:46`. Grepped `demo/**` and `node_modules/@mkbabb/glass-ui/dist/**`: the usage site is the only occurrence in the tree.
3. **`data-square-mode`, zero readers** — `SquareScene.vue:48`. Grepped `demo/` and `test/`: one hit, the write site. No CSS rule, no test, no probe. Combined with C-2 (the attribute can only ever read `idle` or `drag`), the FSM's entire observable surface is inert.
4. **Redundant `as CssColor`** — `useSquareTumble.ts:37`. `mixColors<S>` returns `Result<Color<S>, ColorIssue>` (`value.js/dist/subpaths/color.d.ts:71`), `S` infers `"oklab"` from the literal, and `CssColor` is the union over `CssColorSpace` which includes `"oklab"` (`css.d.ts:105-109`). Verified: compiled a cast-free equivalent under `--strict` against the installed 4.0.0 → **no error**. The cast suppresses nothing today and would suppress a genuine incompatibility tomorrow (call it with `{space: "okhsl"}` and the cast hides it).

None of these is machine-catchable here: `tsconfig.json:7` sets `strict: true` but **no `noUnusedLocals`/`noUnusedParameters`**, and no `eslint.config*` exists at the repo root.

**Falsifier.** For (1)-(3): produce a consumer. For (4): produce a tsc error from the cast-free form — I ran it; there is none.

### C-14 · CENSUS GAP — a shadow-component candidate the S-1..S-8 sweep did not reach

**Severity MINOR.** *(Explicitly extending `lane-frontend.md`'s census, not contradicting it.)*

`SquareInstrument.vue:21-33` hand-rolls a live-telemetry strip: a serif title, a 4-cell label/value grid of `<span>`s, and a tone-swapping status badge. The sibling that renders the same *kind* of thing consumes the design system: `SequenceTarget.vue:18` uses `<Metric>` from `@mkbabb/glass-ui/metric` (`:138`) for its live master-progress readout. glass-ui 7.0.0 additionally publishes `./badge` and `./status-dot` — and the demo already imports `/status-dot` at two sites.

**This is a weaker candidate than S-1..S-7 and I am filing it as such.** The `.status-badge` / `.settled-badge` / `.tracking-badge` classes are a *shared demo idiom* (`design-idioms.css:213-239`, parameterised by `--badge-tone`) with ≥2 consumers (`SquareInstrument.vue:29-32`, `SequenceTarget.vue:40-41`) — that is the KISS-correct home for a two-scene pattern, and replacing it is a design argument, not a mechanical swap. The *metric strip* is the sharper half: one scene uses `<Metric>`, the other hand-rolls it, for the same job.

Proposed id **S-9 · square telemetry strip → `Metric` (+ evaluate `Badge`) — AMBER, ~13 lines of markup**, for the census owner to accept or reject.

**Falsifier.** Show `MetricProps` (`glass-ui/dist/components/metric/types.d.ts`) cannot express a two-row `x`/`y` pair at the `text-mono-small` rung inside an `aria-hidden` absolutely-positioned strip — then the bespoke markup is justified and this drops to INFO. I read the slot surface (`label`/`value`/`unit`/`context`) but did not verify the size/orientation rungs against the strip's layout.

---

## 4. INFO

### C-15 · The instrument props are written at 60 Hz — a Vue render per frame

`SquareScene.vue:143-152` (`onTick`) writes `deflX.value` and `deflY.value` every frame the loop runs. Those are props of `SquareInstrument` (`:19-20`), which recomputes `tetherPath` (`SquareInstrument.vue:83-97`) and patches the SVG `d` attribute per frame.

Filed **INFO, not a defect**: this is honestly documented (`SquareScene.vue:118-122` — "mirrors its state into the few reactive bindings the SVG/badge consume"), the cost is one child render + one attribute patch, `settled`/`tetherActive` are no-op writes when unchanged, and the loop self-terminates on settle. The narrower comment at `:182-183` ("no per-frame Vue work on the hot path") is scoped to `springReadout` and is **accurate** — `springReadout` is written at pointermove cadence only.

**Falsifier.** Profile it. If the per-frame child render is measurable against a drag's frame budget it graduates to MINOR.

---

## 5. SELF-FALSIFIED — claims I formed and then killed (do not re-file)

L-18 runs both ways; these are recorded so the parent does not spend the same cycles.

1. **"`<Card :shadow="false">` contradicts its own docblock."** `SquareScene.vue:2-9` documents `<Card surface="glass" tier="resting" :shadow="false">` while `:10-13` passes only `:shadow="false"`. **Not a defect.** `surface`/`tier` are `SurfaceProps` with defaults (`Surface.vue.d.ts:7-16` + the resolved-defaults block), and the sibling plates do exactly the same: `SpringTarget.vue:3-4` and `StartingStyleTarget.vue:3-5` carry the identical prose over the identical bare `:shadow="false"`, as does `SequenceTarget.vue:8` and `EasingTarget.vue:11-12`. This is a consistent house convention describing the defaults, not drift.
2. **"Writing `spring.target` spawns a second rAF."** `progress.ts:236` — `if (this._onFrame) springStartLoop(this)`. `_onFrame` is attached only by `.play()`. Square never calls `.play()` on any spring (grepped all three constructions and every use site). The auto-resume cannot fire. The "one loop, no second rAF" claim is **true at the library seam**, not merely asserted — promoted to superlative S-A.
3. **"Double-dispose corrupts the springs."** `SquareScene.vue:204-207` calls `dispose()` and `useSquareDemo.ts:401` registers `onScopeDispose(dispose)`. `progress.ts:461-465` sets a flag, stops playback, clears subscribers — idempotent. `springSpin` is disposed once, by its own owner (`useSquareTumble.ts:48`). No defect.
4. **"`anim.name = "Transform"` after group construction leaves the channel mis-keyed."** Ordering is correct: `SquareScene.vue:154` precedes `:174`'s `new AnimationGroup(anim)`, and the constructor keys off the animation at construction time (`group.ts:147-152`). The transport channel label resolves correctly through `facilityFromGroup`'s `Object.entries(getGroup().animations)` (`scene-facility/index.ts:88`).

---

## 6. SUPERLATIVES

### S-A · The light/heavy engine split is consumed exactly right — and the "one loop" claim survives verification in the library

Textbook. The LIGHT surface is statically imported from the published barrel (`useSquareDemo.ts:2-3` — `SpringProgress`, `type Vars`; `useSquareTumble.ts:1`; `useSquareKeyboard.ts:2`). The HEAVY, value.js-bearing surface is reached **only** through the warmed dynamic accessor: `kfEngine()` for `CSSKeyframesAnimation` (`useSquareDemo.ts:1,342`) and for `AnimationGroup` (`SquareScene.vue:83,173`). Zero deep `@src/animation/*` imports anywhere in the square's six files. This is the `demo/kf-engine.ts:22-25` dogfood invariant ("value.js never lands on the LIGHT static barrel") held perfectly by a scene that consumes value.js at four separate call sites.

And the load-bearing part: the scene owns **one** rAF (`useSweepScene`'s `RAFPlayback`) and drives all three springs by `tickDt` from it (`useSquareDemo.ts:167-169`). I went looking for the second loop — `set target`'s auto-resume at `progress.ts:236` — and it cannot fire, because `.play()` is never called (§5.2). The inv-ζ claim the comments make in five places is *true*, verified in the library rather than trusted from the comment. That is rare.

### S-B · Typography is 100 % published glass-ui rungs, with the scoped block deliberately emptied of type

Every type class on the square resolves to a glass-ui `@utility`: `text-display` (`dist/styles/typography/semantic.css`), `text-caption`, `text-admin-label` (same file), `text-mono-small`, `text-mono-caption` (`dist/styles/typography/utilities.css`). `SquareScene.css` (159 L) contains **zero** `font-*` declarations, and `:45-46` records the deletion as intentional: *"the font-weight/size leaves with the D7 `text-display` swap — the published rung owns the type; scoped rules no longer shadow it."*

The one place the demo overrides a rung, it does so at the root in a declared layer (`style.css:263-274`, `@layer demo-typography`, with the reason — Instrument Serif's true 400 vs glass-ui's Jakarta-tuned 600) and never per-instance. That is `feedback_root_styling` and `feedback_glass_ui_first_class` honoured to the letter, at a component that had every excuse to hand-roll a display size for one word.

**Falsifier (L-18 both ways).** Find a `font-size`/`font-weight`/`font-family` in `SquareScene.css` or `SquareInstrument.vue`'s scoped block. There is none in either.

### S-C · `parseCssScalar` at the two-writer boundary — the demo's best use of value.js

`useSquareDemo.ts:78-90`. One 12-line normalizer sits at the exact seam where two writers with two different value shapes meet — the spring loop's raw numbers and the engine's authored `"90px"` / `"108%"` strings — and resolves both through the **library parser** with a `pct` flag for the fractionalising case. No regex. No `parseFloat`. No unit sniff.

Verified against the actual authored corpus (`useSquareDemo.ts:349-368`): `"0px"`, `"90px"`, `"-90px"`, `"100%"`, `"108%"` all return `ok` with correct `{value, unit}` payloads under the installed 4.0.0.

This is the counter-example to `lane-library.md §4.3`'s Tier-C indictment — the library itself re-parses its own emitted text with regexes in six places (`view-transition.ts:146,159`, `composition.ts:176`, `format.ts:136-144`, `draw-svg.ts:89`), and the *demo* is the one doing it properly. Worth citing upward: when the parser wave lands, `num()` is the shape the library's own internal call sites should converge on.

### S-D · The gesture seam is genuinely single-authority — three input modalities, two springs, zero hand-rolled listeners

Drag routes through the shared `useDragScrub` (`SquareScene.vue:256-283`) with a *declared* `releasePolicy: "persist"` rather than a buried `reseat(0,0)`. Double-tap routes through the pointer-based `useDoubleTap` (`:287-292`), which is drag-disjoint **by construction** (`useDoubleTap.ts:70-75` — a moved pointer resets the pending single, so a scrub can never launder into a double-tap). Keyboard routes through a colocated sub-unit. All three re-seat the same two `SpringProgress` instances; none opens a `window` listener of its own; none opens a second rAF.

The composition also earns something for free: `useDragScrub` owns the global select-suppression token (`useDragScrub.ts:29-38, 105, 116`), so dragging the box across the dock cannot highlight the chrome — an affordance the square gets by *consuming the seam correctly* rather than by carrying its own copy. And the pointer path's coverage of the tumble egg (C-4's note) is a structural consequence of that composition, not luck.

---

## 7. What this component is actually for, and whether it delivers

The square exists to dogfood **one** library primitive: a custom `transformFunc` composing `transform` from *deeply nested* vars (`transform.a.b.c.d`) that map to no CSS property. On that single question the verdict is **it delivers** — the nested read is genuine and exercised every frame from both writers (`useSquareDemo.ts:108`), it survives the number/string shape split via `parseCssScalar`, and the ±90 px keyframe envelope was deliberately seated inside the ±110 px spring travel (`:340-341`) so drag and playback share one coordinate world.

The failures cluster somewhere else entirely: **everything the component says about itself in prose that the tree does not support.** C-1 (the sweep paints nothing), C-2 (the FSM's third state is unreachable), C-3 (a "sync" that syncs nothing), C-4 (a two-writer guarantee that covers two of three inputs), C-5 (a "seamless by construction" landing that the construction broke). Each of those is a comment asserting an invariant, and in each case the invariant is false. The docblocks in these six files run to roughly 40 % of their lines and are, on the evidence, the least reliable artefact in the component.

The recommendation that follows is not "write fewer comments" — several of them (S-A's inv-ζ claim, S-C's normalizer rationale) are load-bearing and *true*. It is that the five false ones are all **cheaply testable** and none is tested: `test/demo/scenes/square-scene.test.ts` (98 L) covers `useSquareKeyboard`'s six keydown branches and smoke-constructs `useSquareDemo`. It never mounts the SFC, never touches the FSM, never touches the colour path, never touches the group. A single mount test asserting `mode` reaches `"playback"` would have caught C-2 the day it was written.

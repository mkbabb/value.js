claude-opus-5[1m]

# CHALLENGE · `EasingScene` · axis **L (LIBRARY)**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/easing/EasingScene.vue` (133 L)
**Mode:** static, read-only. No browser tooling; no writes to any product tree. One node probe against installed
`@mkbabb/value.js` / `@mkbabb/glass-ui` **dist** artifacts (read-only evaluation of published constants — no install, no build).
**Posture:** the component is presumed DEFECTIVE until the tree proves otherwise. Every claim carries **severity + file:line + falsifier**. Where a claim is *not* provable from source it is marked `UNPROVEN-NEEDS-LIVE` and handed to SS-13.

**Import closure read whole (the L-axis surface):**

| file | L | why in closure |
|---|---|---|
| `demo/scenes/easing/EasingScene.vue` | 133 | target |
| `demo/scenes/easing/useEasingDemo.ts` | 410 | direct import — the scene's entire model |
| `demo/scenes/easing/EasingTarget.vue` | 335 | direct import — the stage |
| `demo/scenes/easing/EasingSidebar.vue` | 234 | direct import — the facet body |
| `demo/scenes/easing/easingKeys.ts` | 9 | direct import |
| `demo/components/playback/PlaybackRibbon.vue` | 244 | direct import — the transport |
| `demo/components/playback/AnimationVisualizer.vue` | 256 | ribbon child (contract-bearing) |
| `demo/composables/scene-runtime/{useSweepScene,usePainterRegistry,useSceneTransport}.ts` | 122/20/93 | model closure |
| `demo/composables/useThrottledReadout.ts`, `demo/utils/rafConstants.ts` | 82/15 | model closure |
| `demo/state/{scenePlaybackAdapters,sceneMachine,useSceneMachine}.ts` | 219/…/342 | the contract the scene registers into |
| `demo/app/App.vue` (slot host), `demo/app/scene/{useSceneMachineShellBinding,sceneExposedApi}.ts` | — | the consumer of `defineExpose` |
| `demo/utils/reference-data/{timingCurveUtils,easingGroups,animationDescriptions}.ts` | 90/121/… | the curve catalogue |
| `src/animation/{engine/animation,engine/option-setters,engine/options,physics/{numeric,playback},compile/easing/*}.ts` | — | engine-consumption ground truth |
| `node_modules/@mkbabb/glass-ui/dist/{easing.js,components/easing/**}` | — | vendor contract ground truth (7.0.0) |

**Hitherto corpus folded (not re-derived):** `formation/keyframes/lane-frontend.md` **F-1** (glass-ui phantom dependency), **F-2** (fork on a stale-version rationale), **S-1…S-8** (shadow census — `EasingScene.vue` is row `| 133 | easing/EasingScene.vue | b |`, i.e. *no direct glass import*, which is exactly the shape of L-M6 below). One census row is **contradicted** by the tree at L-M4.

---

## 0. Verdict

**1 BLOCKER · 8 MAJOR · 10 MINOR · 4 INFO · 5 SUPERLATIVE.**

`EasingScene.vue` is a 133-line file of which ~55 lines are executable and ~78 are prose. The executable part is small, well-factored, and leak-free — its loop, teardown, and adapter registration are all inherited structurally from `useSweepScene`, and it correctly refuses to hand-roll any of them (L-S2). What fails is **the transport wiring at the seam it owns**: the four props it feeds `PlaybackRibbon` (`animation`, `currentT`, `userReversed`, `onSliderUpdate`) are each individually plausible and jointly wrong — one is cached against a mutable non-reactive field, one is in the wrong coordinate system, one drives a control that does not control anything, and one samples a 6 Hz mirror to move a 60 Hz thumb. The prose is worse than the code: at least five comment blocks assert properties the tree contradicts, and two vendor-rationale comments are **factually false against the installed dependency versions**, keeping ~80 lines of machinery alive that the vendor obsoleted.

The scene is a genuinely good *engine* consumer and a genuinely poor *vendor* consumer.

---

## 1. BLOCKER

### L-B1 · The duration slider desynchronises the transport scrub rail — permanently, silently — because `effectiveDuration` is a `computed` over a **non-reactive** field of a `markRaw` object

**Severity: BLOCKER.**

**Chain (all four links source-proved):**

1. `EasingSidebar.vue:53-63` ships a live duration control: `LabeledSlider :min="300" :max="5000" :step="100"` writing `demo.duration.value`.
2. `useEasingDemo.ts:316-318` — `watch(duration, (d) => { previewAnim.setDuration(d); })`.
3. `src/animation/engine/option-setters.ts:46-62` — `applyDuration` rescales `frame.time` and assigns `anim.options.duration = d`. **A plain property write on a plain object.**
4. `useEasingDemo.ts:289` — `previewAnim` is `markRaw(new CSSKeyframesAnimation(...))`, and `EasingScene.vue:99` passes it straight to the ribbon as the `animation` prop.

`PlaybackRibbon.vue:119-121`:

```ts
const effectiveDuration = computed(
    () => animation?.options.duration ?? source?.duration ?? 1,
);
```

The computed's only trackable dependency is `props.animation` (props are **shallow**-reactive; `markRaw` additionally forbids conversion). `.options.duration` is an untracked read of a raw object. `props.animation`'s identity never changes for the life of the scene. **Therefore this computed evaluates exactly once — at 1500 ms — and never again.**

**Failure scenario (concrete):** enter easing (duration = 1500). Drag the sidebar duration to 5000. `previewAnim.options.duration` is now 5000; the ribbon's `Slider :max="effectiveDuration"` is still **1500**.
- **Display:** `EasingScene.vue:100` feeds `currentT: demo.progress.value * demo.previewAnim.options.duration` ∈ [0, 5000] into a slider whose max is 1500 → the thumb is pinned hard right for every `progress > 0.30`.
- **Input:** dragging the thumb to its right edge emits `val[0] = 1500`; `PlaybackRibbon.vue:181-204` forwards it; `EasingScene.vue:72-75` computes `1500 / 5000 = 0.30`. **The user can scrub only the first 30 % of the sweep, and the last 70 % of the rail is dead.**
- Both errors scale with the ratio `1500 / newDuration`, so they are maximal at the slider's own maximum.

**Falsifier.** Any ONE of these kills the claim: (a) `KeyframesAnimation.options` is reactive — it is not (`src/animation/engine/animation.ts` declares it as a plain field; `markRaw` at `useEasingDemo.ts:289` forecloses conversion even without the shallow-props rule); (b) `PlaybackRibbon` is remounted on a duration change — there is no `:key` at `EasingScene.vue:96`, `<component :is="sceneRef?.ribbonContent">` (`App.vue:66-70`) keeps a stable functional type, and the only enclosing `v-else-if` (`RibbonBar.vue:107`) gates on `selectedControl !== 'controls'`, which is invariantly true for a scene whose surface DFA is `['easing']`; (c) some other reactive read inside the computed invalidates it — there is none. If a live run shows the rail max tracking the slider, this claim is dead — but the source admits no mechanism by which it could.

**Note:** `SpringScene.vue:119-120` has the identical shape; whether it bites there depends on whether spring's duration is user-mutable (out of this challenge's scope). The *cure* is scene-side and cheap either way — pass `duration` explicitly, or key the ribbon on it, or make the ribbon read the duration through a getter prop.

---

## 2. MAJOR

### L-M1 · `currentT` is fed **raw** `t` into a prop whose contract is **effective** `t` — the reversed state inverts the scrubber against its own visualizer

**Severity: MAJOR.**

`PlaybackRibbon` defines two directions of one coordinate:
- **input:** `PlaybackRibbon.vue:182-185` — `scrubTo(effectiveT)` converts *in*: `rawT = animation.reversed ? duration - effectiveT : effectiveT`. The slider value is therefore **effectiveT** by construction.
- **display twin:** `AnimationVisualizer.vue:244-248` — `progress = anim.effectiveT / anim.options.duration` (`effectiveT` = `reversed ? duration - t : t`, `src/animation/engine/animation.ts:451-453`). The ball paints **effectiveT**.

`EasingScene.vue:100` supplies `currentT: demo.progress.value * demo.previewAnim.options.duration`. `useEasingDemo.ts:328` sets `previewAnim.t = p * duration`, so this expression is **raw `t`**, not `effectiveT`.

**Failure scenario.** Press Reverse (`EasingScene.vue:77-82` sets `previewAnim.reversed = true`). Now, at `progress = 0.8`: the visualizer ball paints at `effectiveT/dur = 0.2` (left) while the slider thumb sits at `currentT/dur = 0.8` (right) — **two widgets in the same 2-inch band showing opposite playheads**. Grab the thumb at 0.8 and `scrubTo` maps it to `rawT = dur − 0.8·dur = 0.2·dur` → `progress = 0.2`: the playhead teleports across the rail on touch.

**Falsifier.** If `previewAnim.reversed` were never true this is unreachable — but `EasingScene.vue:81` is the only writer and it is bound to a rendered Reverse button (`PlaybackRibbon.vue:53-69`). If `effectiveT === t` when `reversed` is true, the claim dies — `src/animation/engine/animation.ts:451` forbids that. If some other consumer passes raw `t` too and the *ribbon's* convention is really "raw", then the defect relocates to `AnimationVisualizer` — but the ribbon's own `scrubTo` un-reverses on input, which pins the convention to effective.

### L-M2 · The Reverse button reverses **nothing on stage** — it flips a clock twin that paints no pixel of the scene

**Severity: MAJOR** (a control that lies — the exact class this tranche's own prose claims to have killed).

`EasingScene.vue:77-82` is the entire Reverse implementation: toggle a local ref, assign `previewAnim.reversed`. The scene's actual motion is produced by `useEasingDemo.ts:173-195` (`frame`) → `livePhaseValue = sweep.at(phase).p` → `repaintDots()` → `EasingTarget.vue:254-259` (`el.style.transform = translateX(fn(phase)·maxX)`). **`frame()` never reads `previewAnim` or `reversed`.** `previewAnim` has no attached target and is never `play()`ed; its keyframes (`translateX 0%→100%`, `useEasingDemo.ts:296-299`) render on no element.

So pressing Reverse leaves every specimen ball sweeping left→right while the ribbon's twin runs right→left. The `useEasingDemo.ts:279-287` comment declares the former "decoy" dead because the new animation's `timingFunction` tracks the edit — true, but it is still a **non-painting twin**, and `reversed` is the field where that shows.

**Falsifier.** Show any code path in which `previewAnim.reversed` reaches the sweep clock, the painters, or `EasingTarget`. `grep -rn "reversed" demo/scenes/easing/` returns exactly two hits, both in `EasingScene.vue:77-82`. If the intended semantics really are "Reverse is a transport-preview verb only", then the defect is the unlabeled control, not the wiring — either way the surface is dishonest.

### L-M3 · The transport thumb and visualizer ball are driven off the **6 Hz readout mirror** — the exact defect `SpringScene` diagnosed, documented, and cured, un-ported to easing

**Severity: MAJOR.**

`useEasingDemo.ts:161-195` implements a deliberate hot/cold split: `livePhaseValue` (60 Hz, non-reactive) drives the painters; `progress` (reactive) is written only through `readout.maybeFlush` at `PROGRESS_READOUT_HZ = 6` (`demo/utils/rafConstants.ts:15`). Correct, and a superlative in itself (L-S1).

`EasingScene.vue:100` then samples the **cold** channel to position the transport: `currentT: demo.progress.value * duration`. `useEasingDemo.ts:328` likewise writes `previewAnim.t` from the same 6 Hz watch, and `AnimationVisualizer.vue:241-250` polls `anim.effectiveT` at 60 Hz — polling a source that only moves 6 times a second. Both the reka `Slider` thumb and the big ball therefore advance in **~167 ms steps** (≈11 % of the rail per step at the default 1500 ms) while the stage runs smooth.

`SpringScene.vue:114-118` carries the cure verbatim: *"the scrubber thumb reads the CONTINUOUS 60 Hz position channel (`scrubberPhase`), NOT the 6 Hz `progress` text mirror that made the thumb visibly STEP"* (K.W4 S2, `live-spring-sequence-mp-verdict.md §2`). `useEasingDemo` exposes `liveProgress()` — the exact continuous channel — at line 171/378, and **nothing consumes it** (see L-m6).

**Falsifier.** If `progress` were written per-frame this dies — `useEasingDemo.ts:191-193` gates it behind `maybeFlush`. If the ribbon interpolated between prop updates it dies — `PlaybackRibbon.vue:19` binds `:model-value="[currentT]"` directly and `AnimationVisualizer.vue:248` writes `setBallProgress` from the raw sample. *Magnitude* of the perceived step is `UNPROVEN-NEEDS-LIVE` (SS-13); the 6 Hz cadence of the source is source-proved.

### L-M4 · `NAMED_EASING_BEZIER` is a **byte-identical 29-row duplicate** of value.js's published `bezierPresets`, kept alive by a rationale comment that is **factually false** — and the duplication emits a false caption to the user

**Severity: MAJOR.** *(This contradicts nothing in the census — it extends `lane-frontend` F-2's "fork on a stale rationale" class from glass-ui to **value.js**, which the census did not cover.)*

`EasingSidebar.vue:86-89` states:

> *"glass-ui's bezier catalogue is value.js `bezierPresets`; the demo's named map (`NAMED_EASING_BEZIER`) is **wider (quart/quint)** and **differs on some quads (sine)** — seed by PRESET only when the picker's own catalogue knows the name."*

Measured against the installed `@mkbabb/value.js` 4.0.0:

```
demo keys: 29   identical to bezierPresets: 29   differences: (none)
in value.js not in demo: [ 'smooth-step-3' ]
```

**Both clauses are false.** `bezierPresets` contains every quart and quint key; every one of the 29 shared quads agrees to 1e-9; and value.js is **strictly wider**, not narrower. The demo therefore maintains a 30-line hand-copy (`animationDescriptions.ts:~/NAMED_EASING_BEZIER`) of a published constant it already depends on, guarded by a comment asserting a divergence that does not exist.

**User-visible consequence of the one real gap (`smooth-step-3`):**
- `useEasingDemo.ts:73-76` — `isBezierEditable = name === "cubic-bezier" || name in NAMED_EASING_BEZIER` → **false** for `smooth-step-3`.
- `EasingSidebar.vue:132-137` — `catalogueGap = name !== "cubic-bezier" && !isBezierEditable && !isSteps` → **true** → the panel renders *"smooth-step-3 is engine-native — editing here authors a custom cubic-bezier"* (`EasingSidebar.vue:42-49`).
- `EasingSidebar.vue:112-114` — `"smooth-step-3" in bezierPresets` → **true** → the very picker beneath that caption is seeded `mode: "bezier", preset: "smooth-step-3"`.
- `EasingTarget.vue:209-220` — `literal` falls through to the bare name, so the header shows `smooth-step-3` while the picker's own readout shows `cubic-bezier(…)`.

**One selection, one panel, three mutually contradictory statements.** `smooth-step-3` is a rendered specimen tile (`easingGroups.ts:58`, family *Cubic*), so this is on a normal click path.

**Falsifier.** Re-run the comparison against whatever value.js the wave pins: if `bezierPresets` there lacks quart/quint or disagrees on the sine quads, the comment is vindicated and this claim dies. Probe used (read-only, published dist): `import("@mkbabb/value.js/easing").then(m => Object.keys(m.bezierPresets))`.

### L-M5 · The EasingPicker **remount-seed** machinery rests on a glass-ui **4.0.1** claim that the installed **7.0.0** falsifies — ~50 lines of dead vendor-workaround

**Severity: MAJOR.** *(Directly the `lane-frontend` **F-2** class: "forks glass-ui over a bug that is fixed in the installed 7.0.0" — F-2 named `KfPillTabs`; this is a second, uncensused instance in the easing scene.)*

`EasingSidebar.vue:17-26`:

> *"glass-ui 4.0.1's modelValue is **EMIT-ONLY** (no external write-through / points-in prop), so a **remount is the only blessed re-seat seam**"*

Installed vendor (`node_modules/@mkbabb/glass-ui/package.json` → `7.0.0`; `dist/easing.js`, `EasingPicker` setup):

```js
let l = te(e, "modelValue");            // useModel
function We(e) { …  v.value = …mode; N(0,…); N(1,…); P.value = …steps; F.value = …term; }
k(l, We, { deep: !0, immediate: !0 });  // ← incoming modelValue RE-SEATS the picker
k(B, Ue, { immediate: !0 });            // ← outgoing, with its own echo guard (q(J,e))
```

7.0.0 has a **deep, immediate, echo-guarded two-way `modelValue`**, plus a `watch(props.mode)` sync. The stated blocker is gone. Consequently the following are all dead weight against the installed version: `PickerSeed` (`:90-96`), `seedCount` (`:98`), `seedFor` (`:99-119`), the `:key` remount (`:28`), `isSeedEcho` (`:144-157`), and the seed-driven `watch` (`:159-166`) — ~50 of the file's 234 lines, plus a **full component teardown/rebuild of the SVG canvas + pointer handlers on every tile click** whose name lands in `bezierPresets`.

**Falsifier.** If the wave pins glass-ui < 7.0.0, the rationale holds and this claim dies. If 7.0.0's echo guard `q()` is unsound for this consumer's payload shape (it compares `mode`/`css`/`fn`/`steps`/`term` + all four points by identity), the local `isSeedEcho` earns its keep as belt-and-braces — but the **remount** never does. Note the compounding hazard: F-1 means *no version is pinned at all*, so neither rationale is reproducible.

### L-M6 · Phantom-dep exposure (**F-1**) is total for this scene: it declares zero glass-ui and renders 100 % glass-ui

**Severity: MAJOR** (inherited RED; recorded here because the census row obscures it).

`lane-frontend.md` §5 lists `| 133 | easing/EasingScene.vue | b | easing scene shell` — **`b`, no direct glass import.** True and misleading. `EasingScene.vue` renders exactly three things:

| import | site | glass-ui surface pulled |
|---|---|---|
| `EasingTarget` | `:13`, template `:3` | `Card`, `FadingScroll`, `Chip`, `ToggleGroup(+Item)` (`EasingTarget.vue:136-139`) |
| `EasingSidebar` | `:14`, via `tabsContent` `:57` | `Card`, `CardContent`, `LabeledSlider`, `EasingPicker` (`EasingSidebar.vue:70-76`) |
| `PlaybackRibbon` | `:11`, via `ribbonContent` `:96` | `Button`, `Slider`, `useTouchGate`, `Tooltip*` (`PlaybackRibbon.vue:92-94`) |

Every pixel this scene draws comes from a package that appears in **neither `package.json` nor `package-lock.json`** (F-1). Under `npm ci` the easing chunk does not resolve at its first import and the scene cannot render at all. The `b` classification would let a triage pass rank this scene as low-risk for the F-1 remediation; it is in fact one of the most exposed.

**Falsifier.** `grep -c "glass-ui" package-lock.json` → non-zero would kill F-1 and this with it. Re-verified this session: the only `@mkbabb` lock entry is `node_modules/@mkbabb/value.js` at `package-lock.json:611`.

### L-M7 · `EasingScene.vue` and `SpringScene.vue` are near-identical files — the transport-arming quartet is byte-for-byte, the preamble is 39 lines of shared prose

**Severity: MAJOR** (duplication; and the repo has already ruled on this exact class).

`diff <(sed -n '18,56p' EasingScene.vue) <(sed -n '29,67p' SpringScene.vue)` differs only in the tokens `EASING`/`SPRING`, `useEasingDemo`/`useSpringDemo`, and three re-worded comment lines. `diff <(sed -n '70,92p' EasingScene.vue) <(sed -n '81,106p' SpringScene.vue)` differs only in the animation identifier and the scrub body:

```ts
// EasingScene.vue:70-92 ─ SpringScene.vue:81-106
const userReversed = ref(false);
const onToggleReverse = () => { userReversed.value = !userReversed.value; <anim>.reversed = userReversed.value; };
let wasPlayingBeforeScrub = false;
const onScrubStart = () => { wasPlayingBeforeScrub = demo.isPlaying.value; if (wasPlayingBeforeScrub) demo.pause(); };
const onScrubEnd   = () => { if (wasPlayingBeforeScrub) demo.play(); wasPlayingBeforeScrub = false; };
```

This is the *identical* triplication signature that `useSceneTransport` was authored to kill — its own docstring (`useSceneTransport.ts:41-45`): *"kills the byte-for-byte triplication across `useEasingDemo` / `useSpringDemo` / `useSequenceDemo`"*. That extraction took the `isPlaying/play/pause/togglePlay` half and left the `userReversed` + pause-around-scrub half behind, in the scene shells, where it re-duplicated. A `useRibbonTransport(demo, anim)` returning `{ userReversed, onToggleReverse, onScrubStart, onScrubEnd, onScrubUpdate }` collapses ~23 lines × 2 scenes and gives L-B1/L-M1/L-M3 **one** place to be fixed instead of two.

**Falsifier.** Show a behavioural divergence in the quartet that a shared seam could not express. The one real divergence is the scrub body (`demo.progress.value = …` vs `demo.scrubTo(…)`), which is a per-scene callback — the seam's parameter, not an obstruction.

### L-M8 · The scene pauses for the whole scrub gesture, which switches OFF the visualizer's sync loop — the ball freezes for exactly the gesture it exists to visualise; the ribbon's `scrubbed` wake emit is declared and dropped

**Severity: MAJOR.**

- `EasingScene.vue:85-88` — `onScrubStart` pauses the machine for the duration of the gesture.
- `AnimationVisualizer.vue:241-250` — its position loop is gated: `useRafLoop(…, { guard: computed(() => props.isPlaying || isDragging.value) })`, and `props.isPlaying` is `EasingScene.vue:101`'s `demo.isPlaying.value`.
- `useDemoTicker.ts` — a subscriber whose `enabled()` is false is skipped and the shared driver stops when none are enabled.

So during a **slider** scrub: `isPlaying === false`, `isDragging === false` (that flag belongs to the ball's own drag), guard false, ball frozen. The thumb and the stage move; the visualizer twin does not. If the user was already paused when they scrubbed, `wasPlayingBeforeScrub === false` (`:86`) so nothing resumes — **the ball stays stranded at its stale position indefinitely**, until the next Play.

`PlaybackRibbon.vue:126-128` declares `(e: "scrubbed"): void` precisely as a *"Wake-only: fires on EVERY scrub … so a settled sync loop re-arms even on a keyboard-arrow nudge"*, and `ChannelOptions.vue:~395` wires it (`@scrubbed="wake"`). `EasingScene.vue:96-109` passes `onTogglePlay`, `onToggleReverse`, `onSliderUpdate`, `onScrubStart`, `onScrubEnd` — and **not** `onScrubbed`. The scene declines a contract the ribbon publishes for exactly this hazard.

**Falsifier.** If `useRafLoop`'s guard turning false leaves the last tick's position correct, the freeze is invisible — it does not: the position was last written before the scrub began. If wiring `onScrubbed` would fix it, this is a one-line scene defect; if it would not (because the guard is the visualizer's own and `scrubbed` only wakes `useAnimationSync`), the defect is a ribbon-contract hole that this scene's pause-on-scrub choice detonates. Both readings are defects; the second is the one the source supports. Perceptual confirmation: `UNPROVEN-NEEDS-LIVE` (SS-13).

---

## 3. MINOR

### L-m1 · Dead import — `computed`
`EasingScene.vue:8` — `import { computed, h, provide, ref } from "vue";`. `computed` appears **once** in the file (that line). Falsifier: `grep -n computed EasingScene.vue` → single hit.

### L-m2 · Dead local — `isPlaying`
`EasingScene.vue:45` — `const isPlaying = demo.isPlaying;`. Never read: the template renders only `<EasingTarget />` (`:2-4`), `defineExpose` (`:112-132`) omits it, and every consumer site reads `demo.isPlaying.value` directly (`:86`, `:101`). Falsifier: any `<script setup>` binding is template-visible — but this template has no interpolation at all, so template use is impossible.

### L-m3 · `isStarted` is a **write-only** ref, and the one site with that semantic hardcodes the opposite
`EasingScene.vue:46` declares `const isStarted = ref(true)`, `:118` exposes it. `useSceneMachineShellBinding.ts:261-266` **writes** it (`sceneRef.value.isStarted = started`, where `started = isPlaying || group.started`, and easing's group is the empty placeholder — so it tracks `isPlaying` and goes **false** on every pause). Nothing reads it: `TransportDock`/`AnimationControlsGroup` compute their own. Meanwhile `EasingScene.vue:102` hardcodes `isAnimStarted: true` into the ribbon, which drives the `is-disabled` class on both the scrub gate (`PlaybackRibbon.vue:11`) and the visualizer (`:74`). Either the ref is dead or the constant is a lie; the tree says both.

### L-m4 · The `defineExpose` comment describes a key that is not there
`EasingScene.vue:127-129` — *"The raw-rAF ScenePlayback adapter — the App registers it with the machine on SCENE_READY…"* — sits immediately above `tabsContent,` / `ribbonContent,`. `scenePlayback` is **not** exposed by this scene (correctly: `useSceneMachineShellBinding.ts:131` registers `facility.playback`). A reader following the comment looks for a key that does not exist. Falsifier: `grep -n scenePlayback EasingScene.vue` → no hit.

### L-m5 · The documented pause-reconcile is **unreachable** on every real pause path, so the contract snapshot is a ≤167 ms-stale mirror
`useEasingDemo.ts:176-183` claims *"no ≤1-tick lag survives a pause"* by reconciling `progress.value = livePhaseValue` inside `frame()` when the machine leaves `playing`. But every path out of `playing` **cancels the rAF synchronously before that frame can run**: `PAUSE` → `useSceneMachine.ts:235-236` `adapter.suspend()` → `createRafAdapter.suspend` (`scenePlaybackAdapters.ts:206-208`) → `useSweepScene.stopLoop` → `RAFPlayback.stop()` (`src/animation/physics/playback.ts:234-240`, cancels + nulls `_rafId` inline). Same for `NAVIGATE`/`SUSPEND` (`useSceneMachine.ts:194-210`) and tab-visibility. The only survivor is `RESET`, where `reset()` has already zeroed both values — a no-op.

Consequence: `progress` (the value `createRafAdapter.snapshot()` persists, `scenePlaybackAdapters.ts:188-195`) is stale by a uniform [0, 167) ms at every pause and every scene leave — and `captureActive` snapshots **before** suspending (`useSceneMachine.ts:197-199`), so the stale read is guaranteed. Return to the scene and the balls jump back by up to 11 % of the rail. Falsifier: show any transition where the loop survives ≥1 frame past `status !== "playing"` with a non-trivial delta.

### L-m6 · Six of `useEasingDemo`'s twenty exports have **zero** consumers
Measured across the whole demo tree (excluding the defining file):

| export | external consumers |
|---|---|
| `svgPath` (`:106-114`) | **0** |
| `comparisonCurves` (`:120-131`) | **0** |
| `currentFamily` (`:116-118`) | **0** |
| `currentEasingFn` (`:78-91`) | **0** (only `svgPath`, itself dead) |
| `liveProgress` (`:171`) | **0** — and it is exactly the channel L-M3 needs |
| `cssValue` (`:93-104`) | **0** (internal watch only) |

`svgPath` + `comparisonCurves` + `currentFamily` + `currentEasingFn` ≈ 45 lines, and they are the sole reason for the `easingGroups` import (`:26-29`). `EasingTarget` computes its own paths via `getCurvePath` (`:194`) and its own family list from `EASING_GROUPS` (`:158-159`) — the composable's versions are a parallel, unused implementation of the same two things. Falsifier: `grep -rn "\bsvgPath\b" demo/ | grep -v useEasingDemo.ts` → empty (repeat per symbol).

### L-m7 · `SCENE_ID` is a pointless indirection
`EasingScene.vue:18` — `const SCENE_ID = EASING_SCENE_ID;`, used once (`:117`). `easingKeys.ts:7` is already the named authority. Two names for one constant in a 133-line file.

### L-m8 · `wirePainter`'s async continuation is unguarded against teardown
`EasingTarget.vue:277-311` — `wirePainter` `await nextTick()` then constructs an `IntersectionObserver`, observes N stages, and calls `demo.registerDotPainter`. `onScopeDispose` (`:314-317`) tears down only what exists *at dispose time*. If the scene swaps while a `wirePainter` is in flight (triggered by `watch(visibleCurves)` `:319` / `watch(reducedMotion)` `:320`), the continuation resumes after dispose and creates a fresh observer + registration that nothing will ever release. **Falsifier (honest):** `EasingTarget` is rendered unconditionally inside `EasingScene` (`:3`), so its `demo` and the orphaned closure die together and are GC-reachable-free once the microtask drains — there is **no unbounded leak**. The defect is the missing `if (disposed) return` discipline, not a measured leak; it becomes real the moment the target is made conditional or reused.

### L-m9 · `?? ""` routes a missing attribute into a throw inside an unawaited async function
`EasingTarget.vue:285-289` — `fn: fnForCurve(el.dataset.curve ?? "")`. `fnForCurve` → `namedEasing("")` → `requireEasing(easing(""))` → **throws** (`timingCurveUtils.ts:13-23, 42-46`). Inside `async wirePainter`, called as `onMounted(() => wirePainter())` (`:313`) and from two bare `watch` callbacks — the rejection is unhandled and the *entire* painter wiring silently aborts (no observer, no registration, every ball frozen, no user-visible error). The template always sets `:data-curve` (`:109`), so this is unreachable today; the `?? ""` reads as a safe default and is in fact a fail-loud-into-a-void path. Prefer `if (!el.dataset.curve) continue;`.

### L-m10 · Nothing in the demo tree can detect L-m1/L-m2/L-m6
`package.json` → `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"`; `tsconfig.json` sets `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` — but **not** `noUnusedLocals`/`noUnusedParameters`. `"lint": "depcruise src"` covers the **library** only, not `demo/`. `devDependencies` contains **no** eslint/oxlint/biome. Dead imports, dead locals, and dead exports in `demo/` have **zero** automated detection. Falsifier: point at a CI step that fails on an unused `demo/` symbol.

---

## 4. INFO

### L-i1 · The "zero rAF ticks at rest" claim is off by one tick
`EasingScene.vue:120-125` asserts *"a paused-on-entry machine leaves the loop un-armed → zero rAF ticks"*. `useEasingDemo.ts:242` calls `startLoop()` **unconditionally** at composable init, before any status is known. The first frame observes `status !== "playing"`, writes `progress`, and returns `false` — one armed rAF, one tick, then quiescence. The perf substance survives; the sentence does not.

### L-i2 · The fail-soft `try/catch` is unreachable for every reachable input
`useEasingDemo.ts:308-315` swallows `setTimingFunction` failures for *"a transiently bare name"*. Probed against the tree's own catalogue: every specimen name resolves — `step-start`/`step-end`/`steps(n,term)`/`ease`/`linear` parse as CSS (`value.js parseTimingFunction`), and `smooth-step-3`/`ease-in-quart`/`ease-in-bounce` fall through to the registry (`easing-registry.ts:18-33`, which explicitly seeds `bezierPresets` keys + `ease-in-bounce` + the camelCase direct names). The custom path is `cubicBezierToString(...)` over points glass-ui clamps to `x ∈ [0,1]` (`dist/easing.js` `setHandle`), always a legal literal. Were it ever to fire, it would leave the preview's timing function silently disagreeing with the displayed literal — the dishonesty class the surrounding comment claims to have eliminated.

### L-i3 · Partial adoption of the extracted readout seam
`useEasingDemo.ts:164` takes `useThrottledReadout` but uses only `maybeFlush`; `reconcile` and `reset` — the composable's documented settle/scrub/restore path (`useThrottledReadout.ts:36-48`) — are hand-rolled instead at `:181` and `:216-224`. Given L-m5 (the `:181` site is unreachable), the seam's own reconcile is the fix for both.

### L-i4 · The shell's auto-play prose names easing as the `autoPlays: true` example
`useSceneMachineShellBinding.ts:200-203`: *"a raw-rAF preview scene that exposes `autoPlays: true` (easing) plays on EVERY entry"*. `grep -rn "autoPlays:" demo/scenes/` → **two** hits, both `false` (`EasingScene.vue:126`, `SpringScene.vue:194`). No scene sets it true; the branch survives only via `autoPlayNext`. Cross-file drift, recorded because it is the fourth stale comment in this closure.

---

## 5. SUPERLATIVE — L-18 runs both ways

### L-S1 · The hot/cold split is textbook, and the engine is consumed in exactly its documented mode
`useEasingDemo.ts:138-140` builds `new NumericAnimation<{p:number}>([{p:0},{p:1},{p:0}])` with **no** duration and samples it statelessly via `sweep.at(phase)` (`:186`). That is precisely the "Stateless: call `.at(progress)` from your own render loop" mode the class documents (`src/animation/physics/numeric.ts:60-63`), and `.at()` is the zero-allocation path returning a pre-allocated `result` (`:162-201`) — the consumer reads `.p` immediately and never retains it, which is the one discipline that mode demands. The 0→1→0 ping-pong is expressed **as keyframes** rather than as hand-synced `1-|2p-1|` math, which is what a dogfooding demo is *for*. Paired with `usePainterRegistry` (`:166-167`) driving `style.transform` off the render graph and `useThrottledReadout` at 6 Hz for the numerals, this is the correct answer to "60 Hz positional update in a reactive framework", and the b16 §1 measurement in the comment shows it was arrived at by evidence.
**Falsifier:** show `.at()`'s result object being retained across frames, or a per-frame reactive write — neither exists.

### L-S2 · The scene owns none of its lifecycle, and that is why it does not leak
`EasingScene.vue` contains **no** `onMounted`/`onUnmounted`/`onScopeDispose`/rAF/listener of its own. Everything hazardous is structural in `useSweepScene` (`:77-122`): the `markRaw(new RAFPlayback())`, the idempotent bound `startLoop`/`stopLoop`, the `createRafAdapter` wiring, `onScopeDispose(stopLoop)`, and `useSceneVisibilityPause` **with bound callbacks**. That composable's docstring documents the crash it exists to make unrepeatable (`this._gen++` thrown by a free-standing `playback.stop`) and the engine hardened the same seam independently with arrow class-fields (`src/animation/physics/playback.ts:62-77`). Defence in depth, at the right two layers, with the scene left unable to reintroduce the bug.
**Falsifier:** find an rAF, timer, or listener created in `EasingScene.vue` or `useEasingDemo.ts` outside `useSweepScene`. `usePainterRegistry` is a plain `Set` with a returned unregister, consumed correctly at `EasingTarget.vue:310/314-317`.

### L-S3 · The provide/inject-vs-prop split is a correct boundary call, not inconsistency
`EasingScene.vue:21` provides `EASING_DEMO_KEY` for `EasingTarget` (in-subtree, injects at `EasingTarget.vue:152`), but passes `demo` as a **prop** to `EasingSidebar` (`:57`). That asymmetry is forced and right: `tabsContent`/`ribbonContent` are render functions handed up to `App.vue:62/66` and mounted in *sibling* slot positions, outside this scene's provide scope — injection there would silently resolve to `undefined`. `sceneExposedApi.ts:6-10` names the same reasoning ("scenes project into sibling slot positions that Vue named slots structurally cannot reach"). Getting this wrong is a common Vue failure; the tree gets it right in both directions.
**Falsifier:** show the sidebar mounted inside `EasingScene`'s subtree — `App.vue:61-63` places it in `#tabs-content`, a sibling of `#target`.

### L-S4 · The painter snapshot is keyed by `data-curve`, not by `v-for` ref-array order
`EasingTarget.vue:283-289` explicitly refuses the obvious mapping: *"Snapshot keyed by data-curve (NOT v-for index — ref arrays carry no order guarantee)"*, reading `el.dataset.curve` and resolving the function from the name. Vue's template-ref arrays genuinely carry no ordering contract; under the family filter (`:186-198`) the set is re-derived on every toggle, which is exactly where an index-keyed snapshot would silently paint each ball with a neighbour's easing. Subtle, correctly reasoned, and documented at the site.
**Falsifier:** demonstrate that Vue 3.5 guarantees `v-for` ref-array order for a keyed list under filter mutation.

### L-S5 · The `IntersectionObserver` gate on the paint walk is the right shape and is torn down on both axes
`EasingTarget.vue:246-311` gates the per-frame transform walk on visibility with `rootMargin: "25% 0px"` (pre-warm), snaps newly-visible tiles on the observer tick (`:296-297`), honours `prefers-reduced-motion` by resting every ball at its end state instead of running a degraded sweep (`:263-267, 304-307`), and disconnects on **both** re-wire (`:281`) and dispose (`:316`). For a drawer of ~30 specimen tiles this converts an O(tiles) per-frame walk into O(visible), without ever leaving a ball at a stale position.
**Falsifier:** find a path that re-wires without disconnecting, or a reduced-motion path that still registers the sweeping painter — `:304-307` returns before `registerDotPainter`.

---

## 6. Ranked repair order (for the wave that consumes this)

| # | id | why first |
|---|---|---|
| 1 | **L-M6 / F-1** | nothing below is reproducible until glass-ui is declared + locked |
| 2 | **L-B1** | the duration control is live and breaks the transport on first use |
| 3 | **L-M1 + L-M2 + L-M3** | one seam (`currentT`/`reversed`/`liveProgress`); fix together or the coordinate confusion returns |
| 4 | **L-M7** | extract `useRibbonTransport` *while* fixing #3 so easing+spring take the cure once |
| 5 | **L-M4 + L-M5** | delete the two false-rationale forks; both are net **−80 lines** |
| 6 | **L-m10** | turn on `noUnusedLocals` for `demo/`, then L-m1/L-m2/L-m6 fall out mechanically |
| 7 | L-m5, L-m3, L-m4, L-m8, L-m9, L-i1–i4 | correctness-of-record; cheap, individually landable |

**Preserve unconditionally:** L-S1 (the hot/cold split + stateless `NumericAnimation`), L-S2 (`useSweepScene` ownership), L-S4 (`data-curve` keying), L-S5 (the IO gate + reduced-motion rest). Any repair that reintroduces a per-frame reactive write, a scene-local rAF, or an index-keyed painter snapshot is a **regression**, not a simplification.

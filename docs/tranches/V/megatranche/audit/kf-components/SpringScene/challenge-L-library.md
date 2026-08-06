claude-opus-5[1m]

# CHALLENGE · SpringScene · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringScene.vue` (204 lines)
**Axis** L — correctness, leaks/teardown, types, duplication, colocation, module size, composable
contracts, error postures, dead code, engine-consumption idioms, glass-ui phantom-dep exposure.
**Date** 2026-08-06 · **Posture** guilty-until-the-tree-acquits; every claim carries its falsifier.
**Law observed** keyframes.js read-only; no browser tooling; single write = this file.

## Read closure

Direct imports (all read whole): `vue`, `@mkbabb/glass-ui` (Button), `@lucide/vue`,
`@components/playback/PlaybackRibbon.vue` (244L), `./SpringTarget.vue` (470L),
`./StartingStyleTarget.vue` (216L), `./SpringPhysicsFacet.vue` (242L), `./useSpringDemo` (499L),
`./springKeys` (10L).

Transitive closure read where a contract of SpringScene's depends on it: `useSpringHotPath.ts`,
`useSpringKeyframesEditor.ts`, `useCompiledEntry.ts`, `useSpringDerby.ts`, `springPresets.ts`,
`useSpringLinearStops.ts`, `scene-runtime/{useSweepScene,useSceneTransport,usePainterRegistry}.ts`,
`composables/scene-facility/index.ts`, `app/scene/sceneExposedApi.ts`,
`app/scene/useSceneMachineShellBinding.ts`, `app/App.vue`, `state/controlSurfaces.ts`,
`state/sceneMachine.ts`, `transport/controls-pane/{ControlsPaneWrapper,RibbonBar}.vue`,
`transport/channel-controls/ChannelControls.vue`, `transport/composables/useDragCapture.ts`,
`components/playback/AnimationVisualizer.vue`, and the engine's
`physics/playback.ts`, `engine/{animation,interpolate,play-lifecycle}.ts`,
`physics/spring/progress.ts`.

**Counting convention.** `defects = 10` counts every severity BLOCKER/MAJOR/MINOR (blockers are a
subset, not additive). INFO rows in §Adjudicated-non-defects are excluded.
**Tally: 10 defects · 3 blockers · 4 superlatives.**

---

## Hitherto corpus — folded, not re-invented

| Corpus id | Where | This challenge |
|---|---|---|
| **F-1** phantom `@mkbabb/glass-ui` | `formation/keyframes/lane-frontend.md` §0, §2 (F-1) | **Confirmed and localised to this file** as **L-1**. The lane established the repo-wide fact; I establish that SpringScene.vue:18 is one of the 42 bite sites and re-ran the two probes below. |
| lane-frontend §4 roster | `lane-frontend.md:248` — "204 \| `spring/SpringScene.vue` \| G \| spring scene — `Button`" | Agrees with the tree. No contradiction. |
| lane-frontend §5 S-1..S-8 | shadow census (KfPillTabs, timeline cluster, scrubber, …) | **No overlap.** None of S-1..S-8 names SpringScene or its direct imports. `PlaybackRibbon`/`AnimationVisualizer` are *not* in the shadow census; my L-5/L-6 are behavioural, not shadow-component, claims. |
| lane-frontend §5 note at `:304` | "`scenes/spring/useSpringDemo.ts:61`, `SpringPhysicsFacet.vue:7` carry only *prose* about a removed strip" | **Corroborated and extended.** The prose-vs-tree drift the lane spotted in two spring files is broader than the pill strip — see **L-8**, which enumerates five more stale assertions in SpringScene.vue itself, two of which (**L-3**, L-8c) are load-bearing rather than cosmetic. |
| lane-library L-1 (dead LIGHT allowlist paths) | `lane-library.md:156` | No overlap — that is a `.dependency-cruiser.cjs` finding in the library half. |

**Explicit contradiction of no corpus row.** The lanes and the tree agree everywhere I probed.

---

## BLOCKERS

### L-1 · BLOCKER · `@mkbabb/glass-ui` is unresolvable from a clean checkout, and this file imports it

**Provenance**
- `demo/scenes/spring/SpringScene.vue:18` — `import { Button } from "@mkbabb/glass-ui";`
- `package.json` — `grep -n "glass-ui" package.json` → **exit 1, zero hits**. `dependencies` contains
  exactly one entry (`@mkbabb/value.js 4.0.0`); glass-ui is in neither `dependencies`,
  `devDependencies`, `peerDependencies`, nor `optionalDependencies`.
- `package-lock.json` — `grep -n "glass-ui" package-lock.json` → **zero hits**.
- `node_modules/@mkbabb/glass-ui/package.json` → `version 7.0.0` — installed, undeclared, unlocked.
- `vite.config.ts:37-59` — the alias map covers `@src`, `@mkbabb/keyframes.js`, `@styles`, `@state`,
  `@components`, `@utils`, `@kf-engine`, `@composables`, `@app`, `@assets`. **No glass-ui entry.**
- `tsconfig.json` `paths` — same: no glass-ui entry. TS resolves it out of `node_modules` only.

**Failure scenario.** `npm ci` reconstructs `node_modules` strictly from the lockfile. With zero
glass-ui rows there, a fresh clone has no `@mkbabb/glass-ui` on disk; the first module the spring
chunk touches at line 18 fails to resolve, and `vite build --mode gh-pages` dies before the scene is
ever emitted. The working tree survives only because a pre-existing local install predates whatever
removed the declaration.

**Why it is SpringScene's problem and not only the repo's.** SpringScene draws exactly one symbol
(`Button`) from the **root barrel**, while its own sibling draws from *subpaths*
(`SpringPhysicsFacet.vue:130-131` — `@mkbabb/glass-ui/labeled-field`, `@mkbabb/glass-ui/chip`).
Under F-1's remediation the barrel import is the more expensive one to keep: it pulls the whole
package entry graph for a single button, and it is the import shape least able to survive a
subpath-exports tightening in glass-ui 7.x. The fix is one line in `package.json` **plus** one line
here (`from "@mkbabb/glass-ui/button"` if the subpath exists — unverified, see falsifier).

**Falsifier.** Any of: (a) a `@mkbabb/glass-ui` entry appearing in `package.json` or
`package-lock.json`; (b) a bundler alias or `resolve.dedupe`/`optimizeDeps` shim mapping the bare
specifier (grepped `vite.config.ts` — absent); (c) an `.npmrc`/workspace link that makes the bare
specifier resolvable without a lockfile row. **Sub-claim falsifier:** if
`node_modules/@mkbabb/glass-ui/package.json` `exports` has no `./button` subpath, the
barrel-vs-subpath half of this finding dies and only the declaration half stands. I did not open the
exports map (out of read budget); treat the subpath recommendation as UNVERIFIED and the declaration
half as CONFIRMED.

---

### L-2 · BLOCKER · The scene's headline gesture is inert in its born state — `reseat()` arms a loop that self-terminates before it ticks

This is the sharpest defect in the file's closure, and the source comment asserts the opposite.

**The chain**
1. `SpringScene.vue:194` — `autoPlays: false`.
2. `useSceneMachineShellBinding.ts:206-209` — `PLAY` is dispatched only when
   `autoPlays || autoPlayNext`. Neither holds for a direct arrival at the spring scene.
3. `state/sceneMachine.ts:97` — the fresh per-scene snapshot is `playing: false`;
   `sceneMachine.ts:125` — `SCENE_READY` returns `{ status: snap.playing ? "playing" : "paused" }`.
   ⇒ **spring is `paused` on entry.**
4. `useSpringDemo.ts:294-300` — `reseat(v)` writes `target`, `liveSpring.target`, every
   `t.spring.target`, then calls `startLoop()`. **It calls neither `repaintSprings()` nor any
   `tickDt`.**
5. `useSweepScene.ts:82-87` — `startLoop()` = `if (!playback.running) { onArm(); playback.loop(frame) }`.
6. `useSpringDemo.ts:191-206` — `frame()`'s **first statement** is
   `if (machine.status.value !== "playing") { flushReadouts(); paintScrubberPhase(); …; return false; }`.
7. `src/animation/physics/playback.ts:228-231` + the `_run` core — `loop(cb)` reschedules **only**
   while `cb` returns `true`. A `false` first frame means one dead tick and stop.

**Failure scenario (deterministic, no timing race).** User lands on `/spring`. Machine = `paused`.
User does the one thing the stage tells them to do — `SpringTarget.vue:126-130`: *"Tap or drag the
rail — the ball springs to the new target."* `useDragScrub` fires `demo.reseat(ratio)`
(`SpringTarget.vue:233-242`). The dashed ghost marker moves (it is a reactive `:style`,
`SpringTarget.vue:87-90`), and **the live ball does not move at all** — `liveSpring.tickDt` is never
called, `repaintSprings()` is never called, `springLive.value` is unchanged, and `flushReadouts()`
copies that unchanged value into the readout. The `x` numeral stays frozen. The scene reads as
broken until the user finds Play in the dock.

The double-tap easter egg is worse: `useSpringDerby.ts:73-108` flips `derbyActive` true, so
`SpringTarget.vue:105-124` fades in four rainbow lanes with a `derby-fade-in` animation — and the
four lane balls sit motionless at `translateX(0cqw)` for the whole 1.5 s race, because every timer
callback's payload is `t.spring.target = 1; startLoop()` and every one of those loops dies on frame
one. The egg renders its chrome and none of its content.

**The comment that says otherwise.** `SpringScene.vue:191-193`:

> *"The sampler sweeps + the ball springs the instant the user presses Play (**or taps the rail —
> `reseat` re-arms the loop directly**)."*

The parenthetical is false against `frame()`'s own gate at `useSpringDemo.ts:197`. Note the author
already built the correct shape for the sibling case: `scrubTo` (`useSpringDemo.ts:281-289`) is
explicitly documented as *"scrub-while-idle … the playhead is set WITHOUT play first"* and it does
the work inline (`flushReadouts` + `repaintSprings` + `paintScrubberPhase`). `reseat` needed the same
treatment and did not get it — it is the one discrete-event seam that delegates to the loop.

**Falsifier.** Any of: (a) evidence that `machine.status` is `playing` on a first entry to spring —
would need `sceneMachine.ts:97` to seed `playing: true`, or a PLAY dispatch on the reseat path
(neither exists); (b) `RAFPlayback.loop` rescheduling regardless of the callback's return — refuted
at `physics/playback.ts:228-231` + the `loop` docstring *"returns `true` to continue"*; (c) a
painter invocation inside `reseat` or inside `startLoop`/`onArm` — `onArm`
(`useSpringDemo.ts:260-263`) only rebases `lastNow`/`startTime`; (d) a second driver (e.g.
`SpringProgress.play()`/`RAFPlayback.drive`) moving the live spring — grepped: the spring cluster
owns exactly one `RAFPlayback`, in `useSweepScene`. Kill any one of (a)–(d) and this finding dies.

**Not claimed:** that state is corrupted. Pressing Play afterwards animates to the seated target
correctly. The defect is that the scene's primary interaction is *deferred and invisible*, against
its own on-stage copy.

---

### L-3 · BLOCKER · `tabsContent` is unconditional — the Physics facet is instantiated **twice** and bleeds under every built-in tab

`SpringScene.vue:67` — `const tabsContent = () => h(SpringPhysicsFacet, { demo });` — with **no
gate**, resting on the comment at `:58-66`:

> *"The spring scene has a SINGLE valid surface (`['spring']`) … AnimationControls renders this slot
> directly for single-surface scenes … the panel is mounted BY CONSTRUCTION."*

That premise no longer holds. Two independent consequences follow.

#### 3a — duplicated **per channel** (spring-unique)

- `useSpringDemo.ts:404-431` — the facility declares **two** channels, and **both carry a painting
  `animation`**: `Sweep → springEditAnim`, `Entry → entryAnim`.
- `ControlsPaneWrapper.vue:205-227` — `controlHosts` = one host per channel **that has an
  `animation`** ⇒ 2 hosts for spring.
- `ControlsPaneWrapper.vue:45-56` — the hosts are `v-for`'d with **`v-show`, not `v-if`**
  (`<div v-show="storedControls.selectedAnimation == host.name">`). Both `ChannelControls` instances
  are therefore **mounted**.
- `ControlsPaneWrapper.vue:77-84` — each forwards `#tabs-content` → `App.vue:61-63`
  `<component :is="sceneRef?.tabsContent" />`.

⇒ **Two live `SpringPhysicsFacet` instances**, one of them permanently `display:none`.

**Failure scenario.** Every consequence is measurable in source:
- Two `demo.registerSpringPainter(...)` registrations (`SpringPhysicsFacet.vue:151-162`) in the one
  shared `Set` (`usePainterRegistry.ts:6`), so `repaintSprings()` does **2× the preset-ball work every
  frame**, half of it writing `style.transform` on a `display:none` subtree.
- Two `<KeyframesEditor :animation="demo.springEditAnim">` (`SpringPhysicsFacet.vue:119`) — two
  two-way editors over **one** `CSSKeyframesAnimation` object. A stop added in the hidden copy is a
  write into the visible one's model.
- Two `<SpringHeatmap :demo="demo">` (`SpringPhysicsFacet.vue:58`), each with its own
  `useResizeObserver` (`SpringHeatmap.vue:267`) and its own `watch(isDark, paint)` (`:270`); the
  hidden one paints into a zero-width canvas on every dark-mode/param change.
- Two preset `Chip` grids writing `demo.response` / `demo.dampingFraction`
  (`SpringPhysicsFacet.vue:169-172`) — the same refs, two DOM surfaces, one of them unreachable.

Spring is the **only** scene that hits 3a, because it is the only raw-rAF scene exposing two
*painting* channels (easing exposes one — `EasingScene.vue:57`; cube's hosts derive from real group
members and its `tabsContent` **is** gated, `CubeScene.vue:170-181`).

#### 3b — bleeds **per surface**

- `state/controlSurfaces.ts:95-119` (`surfacesFor`) — `base = selected.animation ? [...BUILT_IN_SURFACES] : …`.
  Spring's selected channel always paints ⇒ base = `["controls","keyframes","timeline"]`, unioned with
  the facility facets (`useSpringDemo.ts:428` → `"spring"`).
  ⇒ **`machine.controlSurfaces` for spring = `["controls","keyframes","timeline","spring"]`.**
- `ChannelControls.vue:331-336` — `isSingleSurfaceScene` requires
  `controlSurfaces.length === 1 && builtInTabs.length === 0`. For spring: `4` and `3`. ⇒ **false**.
- Therefore the flat-mount branch (`ChannelControls.vue:16-36`) is **not** taken; the tabbed branch
  runs, and its `<slot name="tabs-content">` at `ChannelControls.vue:180` is rendered **ungated**,
  as a sibling of the `hasSurface(...)`-gated built-in panels at `:98`, `:130`, `:150`.
- `ChannelControls.vue:174-179` states the contract the scene is expected to honour: *"the scene
  gates its own body on the active surface."* CubeScene honours it; SpringScene does not.

⇒ the whole Physics facet (heatmap + preset grid + a full keyframes editor) paints under the
**Controls**, **Keyframes** and **Timeline** tabs as well as its own.

**Falsifier (both halves).** (a) `surfacesFor` returning `["spring"]` for the spring facility —
requires at least one spring channel to drop its `animation`, refuted at `useSpringDemo.ts:407` and
`:414`; (b) `ChannelControls.vue:180`'s slot acquiring a gate; (c) `ControlsPaneWrapper.vue:49`
switching `v-show`→`v-if`, which would kill 3a but not 3b; (d) a `v-if` guard appearing in
`SpringScene.vue:67`'s `tabsContent`, which would kill both. Any one kills the corresponding half.
**Caveat honoured:** the *rendered* result is a live-DOM fact; what I claim from source is the
**instantiation and mount count**, which is decidable from `v-show` + the slot-forward chain alone. A
visual double-panel screenshot is `UNPROVEN-NEEDS-LIVE` and belongs to the SS-13 pass.

---

## MAJOR

### L-4 · MAJOR · Two keyframes editors over one `springEditAnim` — the facet's own comment says its editor should already be dead

- `SpringPhysicsFacet.vue:119` — `<KeyframesEditor :animation="demo.springEditAnim" :framed="false" />`.
- `SpringPhysicsFacet.vue:91-97` and `:17-20` — *"its terminal home is the derived Keyframes triad tab
  (T.B2 — the shared editor pane takes over and this section dies in that motion)."*
- T.B2 **has landed**: `state/controlSurfaces.ts` **is** the derivation (its header at `:4-5` records
  the deletion of the `CONTROL_SURFACES` table).
- `ControlsPaneWrapper.vue:60` — `:animation="host.animation"`, and for the Sweep host that object
  **is** `springEditAnim`.
- `ChannelControls.vue:130-147` — the built-in keyframes pane renders
  `<KeyframesStringControls :animation="animation">` for exactly that object, `v-if="hasSurface('keyframes') && keyframesWarmed"`, and `hasSurface('keyframes')` is **true** for spring per L-3b.

**Failure scenario.** Select the Keyframes tab on the spring scene: the built-in string editor and
the facet's per-stop editor render simultaneously, both authoritative, both two-way, over one
`CSSKeyframesAnimation`. An edit in one is invisible to the other's local input state until a
re-render; a `seedKeyframes()` (`SpringPhysicsFacet.vue:107`, `useSpringKeyframesEditor.ts:71-74`,
which calls `fromString` + `parse`) blows away in-flight edits in whichever surface the user is not
looking at. With L-3a this is **four** editors, two of them hidden.

**Falsifier.** The Sweep host's `animation` not being `springEditAnim` (refuted:
`useSpringDemo.ts:407`, `ControlsPaneWrapper.vue:205-217`), or `keyframesWarmed` never becoming true
for this scene — a lazy-warm flag I did not trace; if it is permanently false for spring, the
*simultaneity* dies and only the architectural duplication (facet editor outliving its declared
terminal date) stands. Marked accordingly.

---

### L-5 · MAJOR · "Reverse" is half-wired: the ribbon's two twins disagree, the scrub inverts on write only, and the stage never reverses

`SpringScene.vue:93-96` — `onToggleReverse` flips `userReversed` and writes
`demo.springEditAnim.reversed = userReversed.value`. Four consequences, each traced:

**(a) The visualizer mirrors.** `AnimationVisualizer.vue:243-248` reads `anim.effectiveT`;
`engine/play-lifecycle.ts:449` — `effectiveT = reversed ? duration - t : t`. The ball's position
becomes `1 - phase`.

**(b) The slider does not.** `SpringScene.vue:119-120` supplies
`currentT: demo.scrubberPhase.value * demo.springEditAnim.options.duration` — a bare product, with no
`reversed` term. `PlaybackRibbon.vue:15-22` binds it straight into `:model-value="[currentT]"`. So
the slider thumb shows `phase` while the visualizer ball — the ribbon's *own* declared decorative
twin of that same slider (`AnimationVisualizer.vue:1-6`: *"a decorative VISUAL twin of the real reka
`<Slider>` … same scrub value, same range"*) — shows `1 - phase`. **The two twins of one value point
at opposite ends of the rail.**

**(c) A slider scrub inverts on write only.** `PlaybackRibbon.vue:182-185` —
`rawT = animation.reversed ? animation.options.duration - effectiveT : effectiveT`, emitted as
`sliderUpdate`. `SpringScene.vue:83-91` divides by duration and calls `demo.scrubTo(v.t / dur)`,
which sets `springLive.phase = clamped` (`useSpringDemo.ts:281-289`). Drag the thumb to display
position *p* ⇒ phase becomes `1 − p` ⇒ `currentT` re-renders at `(1 − p)·dur` ⇒ **the thumb snaps to
the mirror of where the user dropped it.** Every reversed drag fights the user.

**(d) The stage does not reverse at all.** The loop's phase is monotonically forward
(`useSpringDemo.ts:228` — `((now - startTime) / SAMPLER_DURATION) % 1`), and the on-stage sampler
ball reads `springLive.sampled = samplerAnim.at(springLive.phase).x` (`:229`) where
`engine/interpolate.ts:111-115` **explicitly neutralises `reversed`** for the duration of `at()` —
and `samplerAnim` is a different object (`NumericAnimation`, `useSpringDemo.ts:165-175`) that never
has `reversed` set anyway. So "Reverse" reverses one decorative ball in the ribbon and nothing the
scene is actually about.

**Falsifier.** (a) dies if `AnimationVisualizer` stopped reading `effectiveT`; (b)/(c) die if
`currentT` acquired a `reversed` term at `SpringScene.vue:119-120` (it has none) or if the Slider
consumed something other than `currentT` (`PlaybackRibbon.vue:19`); (d) dies if the loop's phase
acquired a direction term or if `samplerAnim` were the same object as `springEditAnim`.

**Honest scope.** `EasingScene.vue:96-104` has the identical `currentT` shape and the identical
`onToggleReverse`, so (b)/(c) are a **family** defect of the scene↔ribbon contract, not spring-only —
the cure probably belongs in `PlaybackRibbon` (derive `currentT` from `animation.effectiveT` when an
`animation` is present) rather than in each scene. (d) *is* spring-specific: only spring has a stage
sweep decoupled from the ribbon's animation.

---

### L-6 · MAJOR · `wasPlayingBeforeScrub` is a single unguarded latch fed by two asynchronous gesture sources — a fling-then-scrub loses the play state

`SpringScene.vue:98-106`:

```
let wasPlayingBeforeScrub = false;
const onScrubStart = () => { wasPlayingBeforeScrub = demo.isPlaying.value; if (wasPlayingBeforeScrub) demo.pause(); };
const onScrubEnd   = () => { if (wasPlayingBeforeScrub) demo.play(); wasPlayingBeforeScrub = false; };
```

Both handlers are wired to `PlaybackRibbon` (`SpringScene.vue:127-128`), which emits `scrubStart`/
`scrubEnd` from **two independent sources**:
- the slider drag, via `useDragCapture` (`PlaybackRibbon.vue:148-151`) — synchronous with
  pointerdown/pointerup;
- the visualizer ball drag (`PlaybackRibbon.vue:77-79` → `AnimationVisualizer.vue:305`, `:318`) —
  whose `dragEnd` is **deferred by the inertial coast**: `startCoast` (`AnimationVisualizer.vue:174-190`)
  emits `dragEnd` only when `coastSpring.settled`, hundreds of ms after the pointer is released.

**Failure scenario (single pointer, no multi-touch needed).** Playback running. User flings the
visualizer ball → `scrubStart` latches `true` and pauses. User releases; the coast runs, `dragEnd`
pending. Within that window the user grabs the slider → `scrubStart` fires again and reads
`demo.isPlaying.value === false` (we already paused) → **the latch is overwritten with `false`**. The
coast settles → `dragEnd` → `onScrubEnd` sees `false`, does not resume, and zeroes the latch. The
slider release → `scrubEnd` → still `false`. **Net: playback silently never resumes**, and the user's
only recourse is the dock Play. `useDragCapture.ts:52-67` has no re-entrancy guard —
`onPointerDown` unconditionally sets `isDragging = true` and re-arms listeners.

**Falsifier.** Proof that the two sources are mutually exclusive in time — refuted by the coast's
asynchronous `dragEnd` at `AnimationVisualizer.vue:186-190`; or a depth counter / "already latched"
guard in `onScrubStart` (absent); or `AnimationVisualizer` cancelling its coast on any external
`scrubStart` (it cancels only on **its own** `onStart`, `:299`).

**Scope.** `EasingScene.vue:84-92` carries the same three lines verbatim — the latch is copy-pasted
across scenes and belongs in the ribbon (or in a `useScrubTransport` seam) as a refcount.

---

## MINOR

### L-7 · MINOR · `isAnimStarted` is a literal `true` while the scene exposes a mutable `isStarted` — two truths for one fact, and one of them is dead

- `SpringScene.vue:56` — `const isStarted = ref(true);`
- `SpringScene.vue:185` — exposed as `isStarted` (typed `SceneExposedApi.isStarted?: boolean`,
  `sceneExposedApi.ts:33`).
- `useSceneMachineShellBinding.ts:263-266` — the shell **writes** it:
  `if (sceneRef.value && "isStarted" in sceneRef.value) sceneRef.value.isStarted = started;`
  (Vue's expose proxy is `proxyRefs`, so the assignment lands on `.value` — the ref is genuinely
  writable from outside.)
- `SpringScene.vue:122` — the ribbon is nevertheless given **`isAnimStarted: true`**, a literal.
- `PlaybackRibbon.vue:9` and `:74` consume that prop as the `is-disabled` class on the scrub gate and
  the visualizer.

**Failure scenario.** Either the shell does drive `isStarted` false for spring — in which case the
ribbon's disabled affordance never engages and the transport claims a started animation that is not
started — or it never does, in which case the exposed ref at `:56`/`:185` is pure ceremony. One of
the two is dead code by construction; which one is a live-behaviour question. Flagged as MINOR
because neither branch corrupts state.

**Falsifier.** `isAnimStarted` being replaced by `isStarted.value` at `:122` (kills it), or evidence
that `onStartStateChange` is never emitted on the spring route (converts it into pure dead code,
still a defect, lower value).

### L-8 · MINOR · Dead code the toolchain cannot catch

- `SpringScene.vue:17` — `import { computed, h, provide, ref } from "vue";` — **`computed` is never
  used**. `grep -n "computed" SpringScene.vue` returns exactly line 17.
- `SpringScene.vue:55` — `const isPlaying = demo.isPlaying;` — **never read**. The two consumers go
  through `demo.isPlaying` directly (`:100`, `:121`); the template does not reference it.
- `SpringScene.vue:29` — `const SCENE_ID = SPRING_SCENE_ID;` — a one-use alias of an already-imported
  7-character constant, consumed once at `:184`.

**Why nothing catches these.** `tsconfig.json` sets `strict`, `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`, `verbatimModuleSyntax` — but **not** `noUnusedLocals` /
`noUnusedParameters`; and `ls -a | grep -i eslint` at the repo root returns nothing. A tightening of
`noUnusedLocals` would flag `computed` and `isPlaying` for free across the demo.

**Falsifier.** An eslint/oxlint config outside the repo root, or a `noUnusedLocals` in
`tsconfig.lib.json`/`tsconfig.test.json` that covers `demo/` (both were checked to `include` only
narrower trees; `tsconfig.json` is the one with `"include": ["src/", "demo/"]`).

### L-9 · MINOR · Comment mass carries five falsified assertions, two of them load-bearing

204 lines, of which ≈62 are executable — a comment:code ratio near **2.3:1**, and the commentary is
archaeological rather than explanatory. That would be a style note if the archaeology were *true*.
It is not:

| Line | Asserts | Tree says |
|---|---|---|
| `:203-204` | the `.spring-view-*` rules "moved WITH the markup into **SpringSidebar.vue**" | `find . -name "SpringSidebar*" -not -path "*/node_modules/*"` returns **only `.claude/worktrees/` copies** — no live file. `SpringPhysicsFacet.vue:2-8` records the dissolution. |
| `:34-38` | "`CONTROL_SURFACES.spring = ['spring']`" is the authority | `state/controlSurfaces.ts:4-5` records that table as **deleted**, inverted into `surfacesFor`. |
| `:58-66` | the panel mounts FLAT because spring is single-surface | **Falsified — see L-3b.** `isSingleSurfaceScene` is `false`. This is the load-bearing one: it is the premise the ungated `tabsContent` rests on. |
| `:112` and `:114-118` | narrate `contractAnim` / "`contractAnim.t` (markRaw)" as a live thing | no `contractAnim` identifier exists anywhere in `demo/`. (`useSpringDemo.ts:234-238` repeats the same phantom.) |
| `:195-197` | *"The raw-rAF ScenePlayback adapter — the App registers it with the machine on SCENE_READY…"* | sits **directly above `tabsContent`** in the `defineExpose` block and describes a `scenePlayback` key that **is not exposed here** (`useSpringDemo` returns it, `:497`, but `SpringScene.vue:180-200` exposes only `facility/superKey/isStarted/autoPlays/tabsContent/ribbonContent`). A misplaced comment orphaned by a deletion. |

**Failure scenario.** A maintainer reading `:58-66` before touching `tabsContent` will conclude the
panel is single-surface and mounted once — the exact wrong model, and the reason L-3 survived. Stale
provenance in this file is not cosmetic; it is load-bearing misinformation.

**Falsifier.** `grep -rn "SpringSidebar\|CONTROL_SURFACES\|contractAnim" demo/` returning live hits.
(Run: `SpringSidebar` → 0 live; `CONTROL_SURFACES` → 1 hit, `controlSurfaces.ts:4`, which is the
sentence announcing its deletion; `contractAnim` → 0.)

### L-10 · MINOR · Playing the Entry channel spins the Sweep loop against an unmounted stage

Selecting the `Entry` channel drives `storedControls.selectedAnimation === "Entry"` →
`useSpringDemo.ts:67-73` sets `view = "discrete"` → `SpringScene.vue:10-11` unmounts `SpringTarget`
(so its painter unregisters, `SpringTarget.vue:228`) and `SpringScene.vue:138-157` replaces the
ribbon with the lone Reveal/Dismiss button. But the **dock's** Play (`TransportDock.vue:63-79`) is
independent of `ribbonContent` and still dispatches `PLAY`.

**Failure scenario.** On the discrete view, press Play in the dock: `frame()` runs at 60 Hz —
`liveSpring.tickDt` plus four preset `tickDt`s (`useSpringDemo.ts:214-224`), a `samplerAnim.at()`
(`:229`), `repaintSprings()` over a registry whose only remaining members are the *hidden* facet
copies (L-3a), a `springEditAnim.t` write (`:240`) and a 6 Hz 17-ref readout flush (`:243`) — while
the visible stage is a CSS-transition card driven by `--spring-ease` alone
(`StartingStyleTarget.vue:172-180`). The Entry channel's own `entryAnim.t` is **never advanced by the
loop** (`useSpringDemo.ts:415-426` writes it only from the channel's `setProgress`). Net: Play on the
Entry channel burns a rAF and paints nothing. It is the exact CPU-at-rest class VERDICT #19 /
`autoPlays:false` (`SpringScene.vue:188-194`) was created to kill, re-entering through the channel
axis.

**Falsifier.** A gate that pauses the machine or stops the loop on channel change (grepped the `view`
watch, `useSpringDemo.ts:67-73` — it writes `view` and nothing else); or evidence the Entry channel's
animation *is* loop-driven; or a dock that hides Play on the discrete view.

---

## SUPERLATIVES (L-18 runs both ways)

### S-1 · The 60 Hz hot path is textbook engine consumption — better than most production code

The positional truth is a **non-reactive** snapshot (`useSpringHotPath.ts:87-95`), pushed through a
painter registry (`usePainterRegistry.ts`) whose members write `el.style.transform` directly
(`SpringTarget.vue:206-225`, `SpringPhysicsFacet.vue:152-161`), while the Vue-visible refs are
**readout mirrors** flushed at `PROGRESS_READOUT_HZ` (`useSpringHotPath.ts:118-120`). Three details
lift this above "we used a ref less":

1. **`translateX(<cqw>)` with `container-type: inline-size` on the rail** (`SpringTarget.vue:298-306`,
   `SpringPhysicsFacet.vue:189-191`, `.derby-lane` at `:417-425`) removes the per-frame
   `getBoundingClientRect()`/`clientWidth` read entirely — the value axis stays rail-relative with
   zero layout reads and zero layout writes. Contrast `AnimationVisualizer.vue:88-99`, which *does*
   read `clientWidth` every frame.
2. **The position channel is split from the text channel** (`useSpringHotPath.ts:67-81`):
   `scrubberPhase` at 60 Hz for the thumb, `progress` at 6 Hz for numerals — with the docstring
   correctly arguing why raising `PROGRESS_READOUT_HZ` would have been the wrong cure.
3. **`registerPainter` paints once on registration** (`usePainterRegistry.ts:10` —
   `paint(...currentArgs())`), so a late-mounting consumer is born-correct instead of waiting a frame.

**Falsifier.** Any reactive `:style` binding on a 60 Hz value in this cluster. The only `:style`
positions are `spring-target-marker` (`SpringTarget.vue:87-90` — a *discrete* re-seat event, correctly
reactive) and the derby lane tone (`:113`, a constant per lane). Clean.

### S-2 · Teardown is structural, not per-author discipline — I found zero leaks in the whole closure

`useSweepScene.ts:109-119` owns `onScopeDispose(stopLoop)` **and** the `useSceneVisibilityPause`
registration with **bound** callbacks, with a docstring naming the exact historical bug the binding
prevents (a free-standing `playback.stop` throwing `this._gen` inside a Vue flush). `useSpringDerby.ts:112`
owns `onScopeDispose(() => derbyTimers.forEach(clearTimeout))`. Both painter consumers unregister
(`SpringTarget.vue:228`, `SpringPhysicsFacet.vue:163`). `AnimationVisualizer.vue:251-254` stops the
*second* raw `coastPlayback` on dispose with a comment explaining why the first one's auto-cleanup
does not cover it. And the engine backs it: `physics/playback.ts:63-77` makes `play/drive/loop/stop`
**arrow class-fields**, so the unbound-method crash class is closed at the seam rather than
re-asserted per call site.

**Falsifier.** A `setInterval` / `addEventListener` / bare `requestAnimationFrame` in SpringScene's
import closure without a matching dispose. Grepped the closure: none. The one raw `rAF` handle in the
whole cluster is `RAFPlayback`'s, and `useSweepScene` owns exactly one.

### S-3 · `rebuildLiveSpring` is velocity-continuous — the hard version, done right

`useSpringDemo.ts:321-339`: on a param change it reads `liveSpring.value` **and**
`liveSpring.velocity`, calls `dispose()` (`physics/spring/progress.ts:461-462` — a real method that
sets the `disposed` flag every tick path checks, `:275`, `:293`, `:427`), then re-seats a fresh
`SpringProgress` with `initial: carriedValue, initialVelocity: carriedVelocity`. A slider drag
therefore re-parameterises the spring **without a visible discontinuity**, and the sampler is
re-derived in the same motion (`:337`). The lazy alternative — `new SpringProgress(...)` from rest —
is what nearly every demo ships, and it snaps.

**Falsifier.** `SpringProgressOptions` not honouring `initialVelocity` (declared at
`physics/spring/types.ts`), or `dispose()` being a no-op (refuted at `progress.ts:461`).

### S-4 · The `provide` + prop **dual** delivery is correct-by-necessity, and the naive alternative would have been broken

`SpringScene.vue:32` provides `SPRING_DEMO_KEY`, **and** `:67` passes `demo` as a prop. That reads
like duplication and is not. The render-fn slot protocol teleports `tabsContent` across the component
hierarchy: `App.vue:61-63` → `EditorShell.vue:92-94` → `ControlsPaneWrapper.vue:77-84` →
`ChannelControls.vue:180`. The resulting `SpringPhysicsFacet` instance's parent is the **shell**, not
SpringScene — so `inject(SPRING_DEMO_KEY)` there would return `undefined`. The prop is the only
correct channel, and the stage children that *are* inside the scene's subtree
(`SpringTarget.vue:169`, `StartingStyleTarget.vue:96`) correctly inject. `sceneExposedApi.ts:6-10`
even records why the render-fn bridge is idiomatic rather than a workaround.

**Cost of the superlative:** the one thing the file does **not** say is *why* both exist. A
maintainer "simplifying" the prop away would produce an instant crash. One line of comment at `:67`
would bank it.

**Falsifier.** Evidence that Vue resolves `inject` lexically rather than through `instance.parent` —
it does not; provide/inject walks the mount hierarchy, and the slot content mounts under
`ChannelControls`.

---

## Adjudicated non-defects (examined, cleared — recorded so the next pass does not re-litigate)

| # | Suspicion | Verdict |
|---|---|---|
| N-1 | `ribbonContent`'s `if (slotProps.selectedControl !== "spring") return null` (`:136`) looked like it could blank the transport. | **Cleared.** `RibbonBar.vue:106-115` only renders the slot in the `v-else-if="selectedControl !== 'controls'"` arm, after the `keyframes` and `timeline` arms have claimed their own button rows. So the guard is *redundant but harmless*. Consequence worth noting under L-3b, not a defect of its own: spring's scrubber/Reverse/Re-seat live **only** on the Physics tab; the dock's Play (`TransportDock.vue:63-79`) survives everywhere. |
| N-2 | `onScrubUpdate` typed `(v: { t: number })` against an emit payload of `{ t, animation }` (`PlaybackRibbon.vue:129`). | **Cleared.** Structurally compatible; `h()`'s component overload does check the props it is given, and all four required props are supplied (`:119-123`). Narrowing the parameter is legitimate — the handler genuinely does not need `animation`. |
| N-3 | `usePainterRegistry(() => [] as const)` (`useSpringHotPath.ts:98`) — a zero-arg registry. | **Cleared.** `Args` is inferred as `readonly []`; painters read `springLive` from closure. Slightly odd against the generic's intent but type-correct and allocation-free at the call site (`repaint` allocates one empty array per frame — negligible, and I will not manufacture a defect out of it). |
| N-4 | `rebuildLiveSpring`/`reseat`/`derby` all calling `startLoop()` while paused. | **Cleared as a leak** — the loop self-terminates on frame one (`useSpringDemo.ts:197`), so no rAF is orphaned. **Not cleared as behaviour** — that is precisely L-2. |
| N-5 | `SpringProgress.tickDt` early-returning on `isSettled` (`progress.ts:275`). | **Cleared.** Setting `.target` clears the settled state; this is the engine's intended rest optimisation, and the demo drives targets, not ticks. |
| N-6 | Painter closures outliving the demo's scope. | **Cleared.** `repaintSprings` is reachable only from `frame`/`scrubTo`/`reset`, all owned by the same scope that `onScopeDispose(stopLoop)`s. No post-dispose invocation path. |

---

## Ranked repair order (advisory — no edits made)

1. **L-1** — declare `@mkbabb/glass-ui@7.0.0` and regenerate the lock. Matches lane-frontend §10's
   "F-1 first"; nothing below is reproducible until it lands.
2. **L-3** — gate `tabsContent` on `selectedControl === "spring"` **and** on the selected channel
   (or, better, cure it upstream: `ControlsPaneWrapper.vue:49` `v-show`→`v-if`, which kills 3a for
   every multi-channel scene at once). Delete the falsified premise at `SpringScene.vue:58-66` in the
   same motion.
3. **L-2** — give `reseat` the `scrubTo` treatment: tick-and-repaint inline, or dispatch PLAY. Fix
   the comment at `:191-193` either way.
4. **L-4** — retire the facet's `KeyframesEditor` section on its own declared schedule (T.B2 has
   landed), or gate it out when `hasSurface('keyframes')`.
5. **L-5 / L-6** — lift both into `PlaybackRibbon` (derive `currentT` from `effectiveT`; refcount the
   scrub latch), curing spring and easing together.
6. **L-7 … L-10** — mechanical; L-8 is a `noUnusedLocals` flip away.

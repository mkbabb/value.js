claude-opus-5[1m]

# CHALLENGE — `AnimationVisualizer.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/playback/AnimationVisualizer.vue` (256 lines)
**Sole mount site** `demo/components/playback/PlaybackRibbon.vue:72-80` (verified by exhaustive grep — one site)
**Posture** assumed DEFECTIVE until the tree proved otherwise. Every claim below carries file:line provenance and its own falsifier. No browser was used; every number is static or token-derived. Where a claim needs a live substrate it is marked **UNPROVEN-NEEDS-LIVE**.

**Tally — defects 18 (BLOCKER 2 · MAJOR 4 · MINOR 10 · INFO 2) · superlatives 4.**

## Files read whole (read-only)

| file | why |
|---|---|
| `demo/components/playback/AnimationVisualizer.vue` | target |
| `demo/components/playback/PlaybackRibbon.vue` | the parent + the `<Slider>` twin the aria-hidden disposition names |
| `demo/components/instrument/transport/composables/useRafLoop.ts` → `useDemoTicker.ts` | the sync-loop guard semantics |
| `demo/components/instrument/transport/composables/useDragCapture.ts` | the drag seam |
| `src/animation/physics/spring/progress.ts`, `.../types.ts` | `SpringProgress` — coast convergence + PRM |
| `src/animation/physics/smooth.ts` | `SmoothProgress` — velocity estimator |
| `src/animation/physics/playback.ts` | `RAFPlayback.drive` |
| `src/animation/internal/reduced-motion.ts` | the PRM gate |
| `src/animation/resolve/browser.ts` | `bumpLayoutEpoch` provenance |
| `demo/styles/{style,layout,design-idioms,playback-idiom}.css` | tokens, the rail/ball idiom, `.is-disabled` |
| `demo/DESIGN.md` §§3–7 | the demo's own design law |
| `node_modules/@mkbabb/glass-ui/dist/composables/dom/useTouchGate.d.ts`, `dist/styles/tokens/{color-radius,dark-arm}.css`, `dist/glass-ui.css` | gate contract, background tokens, Slider sizing |
| sibling precedents: `demo/scenes/sequence/SequenceScrubber.vue`, `demo/composables/useDragScrub.ts`, `demo/components/instrument/transport/channel-controls/composables/useAnimationSync.ts` | the demo's own rail/ball + scrub precedent |

---

## BLOCKERS

### D-1 · BLOCKER — the release "inertia" is not inertia: every fling terminates at a timeline boundary

`AnimationVisualizer.vue:183` sets the coast target unconditionally to an endpoint:

```
coastSpring.target = velocity > 0 ? 1 : 0;
```

A `SpringProgress` **always converges to its target**. `progress.ts:313-346` (`evaluateAt`) solves toward `scaledTarget = origin + s·(target − origin)`; with no active `prefers-reduced-motion` query `s === 1` (`reduced-motion.ts:125-131`), so `scaledTarget === target`. `progress.ts:348-366` (`checkSettled`) can only latch when `|current − scaledTarget| < 1e-3` (`types.ts:117`) — i.e. only at the boundary. `dampingFraction: 1` (`AnimationVisualizer.vue:146`) is critical damping, so the approach is monotone-ish and certain.

Release velocity therefore controls **transit time only, never destination**. A 2 % fling and a 200 % fling both end the playhead at `t = 0` or `t = duration` after ≈ 0.5 s (ω₀ = 2π/0.45 ≈ 13.96 rad/s).

The trigger threshold is effectively zero: `FLING_THRESHOLD = 0.00002` progress/ms (`:164`) = **2 % of the timeline per second of pointer travel** — an order of magnitude below any deliberate drag.

Worse, the estimator never decays at rest. `trackVelocity` (`:152-161`) is called only from `onMove` (`:214-218`), and `SmoothProgress` only advances inside `tickDt` (`smooth.ts:128-147`) — there is no idle decay and no wall-clock term. A mouse emits no `pointermove` while stationary, so **"drag to 42 %, hold two seconds, release" still reads the last moving velocity and flings to the end.**

Net design consequence: the component's single purpose — park the playhead at a chosen time — is unreachable by its own primary gesture, and `applyProgress` (`:112-120`) emits `scrub` on every coast frame, so the underlying animation is genuinely seeked to its start/end (`PlaybackRibbon.vue:181-204` forwards unconditionally).

The prose contradicts the code. `:122-125` and `:166-171` describe a friction model — *"carries the momentum to rest"*, *"a release without a fling has nothing to coast"* — while the implementation is spring-to-boundary. Under PRM the same endpoint is reached in one emit (`progress.ts:217-240` → `_snapSettled`), so the reduced-motion branch is *honest* about a destination that is itself wrong: **PRM correctly removes the travel and correctly preserves the (wrong) meaning.**

**Falsifier.** Any of: (a) a second write to `coastSpring.target` mid-coast; (b) a `coastPlayback.stop()` reachable before settle; (c) a consumer that discards `scrub` during coast. I grepped all three: `coastSpring.target` is written only at `:183`; `coastPlayback.stop()` only at `:206` (a new pointer-down) and `:255` (scope dispose); `PlaybackRibbon.scrubTo` forwards every emission. Also killed by a spring whose `checkSettled` could latch away from the target — `progress.ts:355` measures distance *to `scaledTarget`*, so it cannot.

---

### D-2 · BLOCKER — the "visual twin" freezes during the paused slider scrub, and never seats on mount

The sync loop's guard (`:250`):

```
{ guard: computed(() => props.isPlaying || isDragging.value) }
```

`useRafLoop` → `useDemoTicker(callback, guard)` (`useRafLoop.ts:18`), and `useDemoTicker.ts:30` makes `enabled` **strictly** that guard — a false guard means the tick never runs (`useDemoTicker.ts:12,19-20`).

Scrubbing a paused animation sets neither flag. The demo's own sibling composable states this in as many words (`useAnimationSync.ts:87-89`):

> *"scrubbing a SETTLED (non-playing) animation mutates `effectiveT` via `setChildTime()` **without touching `isPlaying`**"*

`useAnimationSync` solves it for the ribbon's `<Slider>` with an explicit `wake()` re-arm (`:73-76`, wired at `ChannelOptions.vue:392`). **`AnimationVisualizer` has no wake path** — `scrubbed` never reaches it, and `setBallProgress` has exactly two callers: `applyProgress` (drag/coast) and the gated tick (`:248`).

So the ordinary flow — pause, then drag the `<Slider>` or arrow-key it — moves the real thumb while the 48 px ball sits still, then **jumps** when playback resumes. The same guard means the ball is never seated on mount: `v-if="animation"` + `<Teleport>` (`ChannelOptions.vue:377`) can mount the visualizer against an animation already at 60 %, and the ball renders at `translateX(0)` because nothing has written a transform yet.

This falsifies the component's own header comment (`:2-6`, *"same scrub value, same range"*) and the code comment at `:237-239` (*"Always poll — the animation's `effectiveT` changes during playback, **slider scrub**, and visualizer drag"*), which describes the loop the guard prevents.

*The a11y disposition survives this* — the `<Slider>` is still the correct and correctly-synced AT surface. What breaks is the visual twin, i.e. the entire reason the component exists.

**Falsifier.** A parent that holds `isAnimPlaying` true across a paused scrub, or a `wake()` that flips it. `useAnimationSync.ts:73-76` sets only `stableFrames`/`tickerActive`; `isPlaying` is derived from the animation's own play state (`ChannelOptions.vue:501`). Also killed by an `onMounted`/`watch` seat — neither exists in the file.

---

## MAJOR

### D-3 · MAJOR — a container resize leaves the ball at a stale pixel offset; the resize hook fixes something else

`setBallProgress` (`:94-99`) writes an **absolute pixel** transform derived from `getMaxX()` (`:86-91`). Nothing re-applies it on resize. The `useResizeObserver` at `:79` calls `bumpLayoutEpoch()` and nothing else.

While the sync loop is gated off (paused — see D-2), a container width change leaves the ball at the old px, so it no longer lands on the rail's ends. The comment at `:70-78` names *exactly* this scenario — *"a panel/split-pane re-layout that changes the container width WITHOUT a viewport resize"* — and then applies the fix to a cache the ball does not consult.

The demo's own sibling is immune by construction: `SequenceScrubber.vue:34` positions its ball as `translateX(calc(${p*100}cqw))` — a container-relative percentage that the browser re-resolves on every layout, with no observer at all.

**Falsifier.** An unconditional sync loop, a resize handler that re-seats the ball, or a container-relative unit on the ball's transform. None exist: `:79` is the only `useResizeObserver`; `:98` is the only transform write; the guard is `:250`.

### D-4 · MAJOR — `touch-gate-target` / `touch-gate-active` are phantom classes: the mobile arm-state has zero visual feedback

`:21` and `:23` apply `touch-gate-target` and (conditionally) `touch-gate-active`. Exhaustive grep for the string `touch-gate` across `demo/`, `src/`, and `node_modules/@mkbabb/glass-ui/dist/` returns **four `.vue` call sites and no definition** (the only `dist` hits are prose inside `useDockTouchGate.d.ts`). They are not Tailwind utility patterns, so nothing generates them.

`useTouchGate`'s contract is *"the first tap activates the control unless it turns into a vertical scroll gesture"* (`useTouchGate.d.ts:12-17`). On touch, the first tap is therefore **swallowed** and the control silently changes mode — with, in this tree, no styling whatsoever to announce it. A touch user taps, nothing happens, and there is no state change to read. That is a state-coverage hole in the one interaction mode the gate exists for.

Sibling to lane-frontend **F-1** (glass-ui itself undeclared/unlocked) — a different phantom on the same brittle resolution surface; note that F-1 makes even the *negative* result non-reproducible, since the installed `node_modules` is not lockfile-derived.

**Falsifier.** A `@utility`/`@layer` definition, an `@apply` alias, or a glass-ui CSS entry point the demo imports but I did not scan. `demo/styles/style.css:1-13` enumerates every imported sheet; all were scanned.

### D-5 · MAJOR — the demo's own `.progress-rail` / `.progress-ball` idiom is bypassed; this is its seventh, divergent authoring

`design-idioms.css:161-187` defines the pair and states it was *"promoted ONCE (was authored four ways)"*. `DESIGN.md:113-118` (§5) names it a **cross-component recipe** that must *"remain central rather than being copied into SFCs"*, and §3 (`DESIGN.md:76-78`) calls it *"the implementation vocabulary."* Six sites consume it (`EasingTarget.vue:105,108`, `SequenceScrubber.vue:31,33`, `SequenceTarget.vue:93,116`, `SpringTarget.vue:74,94,118,142,144`).

The flagship rail/ball — the one every scene mounts through `PlaybackRibbon` — hand-rolls its own:

| | idiom (`design-idioms.css`) | `AnimationVisualizer` |
|---|---|---|
| rail height | `2px` (`:171`) | `h-1` = 4px (`:15`) |
| rail tint | `--rail-tint` 8 % of `--ball-tone` (`:174`) | `bg-accent-kf/20` (`:15`) |
| ball size | `var(--ball-size, 36px)` (`:180-181`) | `h-12 w-12` = 48px (`:21`) |
| ball depth | accent glow `0 2px 10px … 35%` (`:185`) | generic `shadow-md` (`:21`) |
| retint seam | `--ball-tone` fallback chain | none — literal `bg-accent-kf` |

Two divergences are **live and unconditional** (thickness, size, depth idiom); the `--ball-size` seam is documented as *"the seam EasingTarget reads via `getComputedStyle`"* and this ball is invisible to it.

**Scoped honesty:** the `--ball-tone` half is **latent, not live** — grep shows `--ball-tone` is only ever set to `var(--color-progress)` (`EasingTarget.css:7`, `SequenceTarget.css:8`, `SpringTarget.vue:278`), so no scene currently retints. The divergence bites the moment one does.

**Falsifier.** A scoped `<style>` in the SFC reconciling the two (the file has none — it ends at `:256` with no style block), or an idiom revision making 48px/4px the canonical values.

### D-6 · MAJOR — the ball's fill bypasses `--color-progress`, the declared ONE motion-color authority

`style.css:158-163` establishes the contract: *"Every motion surface (… the rail/ball pair …, the timeline scrub track …) reads `--color-progress`."* `PlaybackRibbon.vue:208-216` re-asserts it and specifically claims the outcome:

> *"the track + thumb paint the SAME violet the AnimationVisualizer's ball/dashed-twin draws — ONE motion-color identity"*

But the ribbon drives its `<Slider>` through `--color-progress` (`PlaybackRibbon.vue:231-234, 242`) while the visualizer paints from `bg-accent-kf` (`:15,21,31,35`). Two paths, one authority claimed. They agree **only** because `style.css:163` currently reads `--color-progress: var(--accent-kf)`. Repoint the authority — precisely what the token's own comment frames it as *for* — and the twin splits silently, with the loudest 48 px element on the ribbon left on the stale hue.

This is the flat-namespace hazard in its concrete form here: a global, un-namespaced indirection (`--color-progress`) whose consumers are enforced by prose rather than by construction. `layout.css:8-12` documents the same posture for geometry tokens — *declared outside `@layer` so they override glass-ui's "incidental same-named tokens"* — which is collision management by cascade luck, not by namespace.

**Falsifier.** `--color-progress` being permanently and irrevocably aliased to `--accent-kf`. It is not: `playback-idiom.css:29-31,45-48,66-68` consumes `--color-progress` (never `--accent-kf`) precisely so the repoint carries — which proves the indirection is intended to be live.

---

## MINOR

### D-7 · MINOR — proportion inversion: the decorative twin outweighs the operative control on both axes

Within one `grid gap-2` (`PlaybackRibbon.vue:2`):

| | operative `<Slider>` | decorative visualizer |
|---|---|---|
| thumb | `--slider-thumb-size: 1rem` = **16px** (glass-ui `[data-size=md]`) | ball `h-12` = **48px** (`:21`) — **3×** |
| track | `--slider-track-height: 1.5rem` = **24px** (`PlaybackRibbon.vue:238-240`) | rail `h-1` = **4px** (`:15`) — **1/6×** |

The thing that *can* be operated is the small one; the thing that is `aria-hidden` decoration is 3× larger. The rail/track ratio inverts in the opposite direction, so the two rows do not read as a pair of the same instrument at two scales — they read as two unrelated widgets. The file's own opening words are *"this big ball"* (`:2`). Aristotelian mean: the twin should sit *below* its principal in visual weight, or share its scale; it does neither.

**Falsifier.** A deliberate ruling that the visualizer is the hero and the slider the vestige — `DESIGN.md` contains no such ruling, and `PlaybackRibbon.vue:2-26` places the Slider first, tooltipped, and unhidden.

### D-8 · MINOR — non-text contrast: rail and end-marker fall below 3:1 (WCAG 1.4.11)

Computed from the declared tokens (`--accent-kf` = `light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))`, `style.css:130`; `--background` = `hsl(40 30% 98%)` light / `hsl(24 9% 4%)` dark, glass-ui `tokens/color-radius.css` + `tokens/dark-arm.css`), with Tailwind's `/N` modelled as an alpha-N composite:

| element | line | light | dark |
|---|---|---|---|
| ball, solid accent, vs bg | `:21` | **4.81** ✓ | **8.18** ✓ |
| ball vs rail | `:21`/`:15` | 3.70 ✓ | 6.00 ✓ |
| rail `accent/20` vs bg | `:15` | **1.30** ✗ | **1.36** ✗ |
| start marker `accent/30` vs rail | `:31` | **1.15** ✗ | **1.25** ✗ |
| end marker fill `accent/15` vs bg | `:35` | **1.21** ✗ | **1.24** ✗ |
| end marker border `accent/40` vs bg | `:35` | **1.73** ✗ | **2.18** ✗ |

The ball — the load-bearing element — is comfortably clear in both arms (see SUP-3). The rail is arguably exempt substrate under `DESIGN.md:84-85` (*"Stage tint is a low-contrast substrate, never a signal"*). The **end marker is not substrate**: a dashed ring marking end-of-timeline is a meaningful graphic, and at 1.21:1 fill its only carrier is a 2px dashed border at 1.73:1 — effectively invisible in the light arm.

**Falsifier / caveat.** The ribbon is teleported into `Card cartoon tier="quiet"` with `CardContent class="p-3"` (`RibbonBar.vue:3-9`), i.e. a translucent plate over the stage field, not bare `--background`. The exact composited ratios are **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit. The *conclusion* is robust: a 15–40 % overlay of a mid-luminance accent cannot reach 3:1 against a near-white or near-black plate — killed only by a substrate whose luminance is far enough from the accent's, which neither theme arm provides.

### D-9 · MINOR — no forced-colors handling anywhere in the demo

`grep -rn "forced-colors|prefers-contrast" demo/` → **zero hits**. Under Windows High Contrast every `background-color` here (`:15,21,31,35`) is force-overridden to the system Canvas pair, collapsing rail, ball, and both markers into one undifferentiated strip; only the dashed `border` on the end marker survives as a distinguishable form. No `forced-color-adjust`, no `@media (forced-colors: active)` fallback to `Highlight`/`ButtonText`.

Mitigated (not cured) by the aria-hidden disposition + the `<Slider>` twin — but the sighted HCM user loses the visualizer entirely rather than degrading gracefully.

**Falsifier.** A forced-colors block in glass-ui's shipped CSS that reaches these elements. `dist/styles/accessibility.css` exists but the demo's own paints are Tailwind-generated utilities on bare divs; no glass class is applied.

### D-10 · MINOR — zero-duration state: a dead ball wearing a live grab cursor

`applyProgress` (`:112-120`) returns **before** `setBallProgress` when `anim.options.duration <= 0`. The ball therefore does not move under the pointer at all, while `:22` keeps promising `cursor-grab` / `cursor-grabbing` and `useDragCapture` still acquires pointer capture and the global `body.is-dragging` select-suppression token (`useDragCapture.ts:52-67`).

The parent's disabled affordance covers a different predicate: `PlaybackRibbon.vue:74` applies `is-disabled` on `!isAnimStarted`, and `style.css:249-252` gives it `opacity:.5; pointer-events:none`. A *started* animation with `duration === 0` is inert but fully lit and fully grabbable.

**Falsifier.** A duration invariant guaranteeing `> 0` at every mount. `PlaybackRibbon.vue:119-121` explicitly tolerates a missing duration (`?? source?.duration ?? 1`), and `:243` re-checks `duration > 0` in the tick — the code does not believe its own invariant.

### D-11 · MINOR — the manipulable ball carries no label, tooltip, or legend

`DESIGN.md:147-153` (§7): *"Every manipulable scene has one concise verb line in `.stage-legend`: what to drag, what motion is produced, and what release/keyboard action does… Cursor-only or home-only hints are not sufficient."* The `<Slider>` twin gets `TooltipContent`: *"Scrub animation timeline"* (`PlaybackRibbon.vue:25`). The 48px ball gets nothing — its whole discoverability rests on `cursor-grab` (`:22`), which is a *cursor-only hint*, named in §7 as insufficient.

**Scoped honesty:** §7 says "scene", and this is ribbon chrome, not a stage scene — so this is a scope-extension argument, not a literal violation. Graded MINOR for that reason.

**Falsifier.** A legend or tooltip in an ancestor covering the ball. `PlaybackRibbon.vue:1-82` wraps only the Slider in `<Tooltip>`; the visualizer sits outside it.

### D-12 · MINOR — `will-change: transform` is permanently declared on a mostly-idle element

`:21` carries `will-change-transform` as a static class, so the ball holds a promoted compositor layer for the entire session — including while paused, while the tab is backgrounded, and in every scene that never touches it. The documented guidance for `will-change` is to set it for the duration of the gesture (here: `isDragging || coastPlayback.running`) and release it. The file already computes both signals (`:195`, `:243`) and already toggles two other classes on the same element (`:22-23`), so the honest form costs one array entry.

**Falsifier.** Measured jank without it. None recorded; the ball's transform is a single `translateX` on a 48px round div.

### D-13 · MINOR — three inert utilities on the markup

- `text-accent-kf-foreground` (`:21`) on an element that is `<div …></div>` — permanently empty, no text node, no slot, no pseudo-content. Dead. (For the record it *would* pass: 4.78 light / 6.86 dark on the accent.)
- `h-full` on the root (`:7`). The root is a grid item of `PlaybackRibbon.vue:2` (`grid gap-2`, auto rows); `height:100%` against an auto-height parent resolves to `auto`. No-op.
- `relative` on `trackEl` (`:10`). Every absolutely-positioned child lives inside `containerEl` (`:13`, itself `relative`); `trackEl`'s only child is `containerEl`. `progressFromPointerX` uses `getBoundingClientRect()` (`:104`), which needs no positioning context. No-op.

A related seam wobble worth recording: `getMaxX` measures `containerEl.clientWidth` (`:90`) while `progressFromPointerX` measures `trackEl.getBoundingClientRect().width` (`:104`) — two different elements and two different box models for the same length. They agree today only because `containerEl` is `w-full h-full` and borderless.

**Falsifier.** A consumer or `:deep()` rule that gives these elements content/height/positioned children. The SFC has no `<style>` block; `PlaybackRibbon.vue:207-244`'s scoped rules target `.timeline-green` only.

### D-14 · MINOR — the resize comment mis-attributes its own mechanism and describes an animation that does not exist

`:70-78` claims *"Feed the genuine signal **value.js** exports for exactly this"* and *"the eviction policy stays ONCE in **value.js** — DRY."* The import at `:45` is `@src/animation/resolve/browser` — **keyframes.js's own** resolver (`src/animation/resolve/browser.ts:17`, where `bumpLayoutEpoch` is defined and where `:23` already registers the global `window.resize` listener the comment contrasts against). The only value.js import in the file is `clamp` (`:46`).

The same comment states *"The dashed twin **animates** to `calc(100cqw - 100%)`."* It does not animate: `:35` is a static Tailwind arbitrary transform, resolved natively by the container query on every layout, consulting no cache and no epoch.

Both errors matter because they are the reasoning that produced D-3: the author diagnosed the right scenario (a container relayout with no viewport resize) and wired the fix to a cache this component never reads, leaving the actual stale-px hazard open.

**Falsifier.** A value.js re-export of `bumpLayoutEpoch`, or any value.js/keyframes animation targeting an element in this subtree. Grep: `bumpLayoutEpoch` appears in exactly two files repo-wide (`browser.ts:17`, `AnimationVisualizer.vue:45,79`); no animation in the file targets these divs.

### D-15 · MINOR — comment mass mints rationale `DESIGN.md` reserves to itself

Roughly 95 of 256 lines are prose. `DESIGN.md:140-142` (§6): *"Rationale prose is owned here. Comments may point to a section; **they do not mint a competing authority**."* Several blocks do exactly that — a 10-line cache-eviction argument (`:70-79`), a 10-line spring-physics justification (`:122-125, 138-148, 166-171`), and a 4-line dispose rationale (`:252-254`) — none of which cite a DESIGN.md section.

The register also drifts into promotional voice — *"the engine's two flagship light trackers"* (`:123-124`), *"its analytic damped-decay solver carries the momentum to rest"* (`:140-141`) — and the second phrase is the trite formulation that conceals D-1: it *sounds* like momentum physics while describing convergence to a fixed endpoint. Marketing voice in a code comment is how a wrong model survives review.

**Falsifier.** A DESIGN.md clause exempting SFC comments, or a `§`-reference in these blocks. Neither exists.

### D-16 · MINOR — `progressFromPointerX` is a fourth hand-rolled rect-ratio projector

`useDragScrub.ts:8-20` documents itself as *"the ONE pointer-drag scrub seam"*, created because *"Spring's `positionFromEvent`, Sequence's master-scrub `progressFromEvent`, and MotionPath's `projectPointer` were THREE hand-rolled copies of the SAME dance: pointer-capture on `pointerdown` + window `pointermove`/`pointerup` + a `project(e) → ratio` read."* `AnimationVisualizer.vue:101-110` is that dance a fourth time, on a different seam (`useDragCapture`) — while its sibling rail/ball, `SequenceScrubber.vue:47-50`, rides `useDragScrub`.

**Scoped honesty:** the seam's own docblock scopes it to *"the stage scenes"*, and this is ribbon chrome — hence MINOR, not MAJOR. But the demo now has two rail/ball scrubbers on two drag seams with two a11y postures (`SequenceScrubber.vue:23-29` carries `role="slider"`, `aria-label`, `aria-valuenow/min/max`, `tabindex="0"`, `@keydown`; this file carries `aria-hidden` and no keyboard).

---

## INFO

### D-17 · INFO — RTL: physical-axis geometry throughout (latent)

`left-6` (`:15`), `left-0` (`:31`), and positive `translateX` (`:98`) are physical, not logical. reka's `<Slider>` honors document direction; under `dir="rtl"` the operative thumb would travel right-to-left while the twin continued left-to-right — the twin running visibly backwards.

**Latent, not live:** `grep -rn 'dir="rtl"|:dir=|useTextDirection' demo/` → zero hits. The demo never sets direction. Recorded so the first RTL pass finds it rather than discovers it.

**Falsifier.** The demo adopting `dir` (then this becomes MAJOR), or a ruling that a time axis stays LTR in RTL (defensible for timelines — but then the `<Slider>` must be pinned too, and it is not).

### D-18 · INFO — census extension: the shadow census skipped the larger of the two rail/ball shadows

`lane-frontend.md:227` inventories `playback/AnimationVisualizer.vue` (256 lines, *"visualizer — `useTouchGate`"*), but the shadow census **S-1..S-8** never evaluates it. **S-4** (`lane-frontend.md:350-353`) evaluates `SequenceScrubber.vue` at 162 lines with the finding *"A rail-with-ball is the `Slider` primitive's exact shape"*, against glass-ui's unimported `ScrubberTimeline` / `Slider`.

`AnimationVisualizer` is the **same shadow, 94 lines larger, mounted in every scene** (`EasingScene.vue:96`, `SpringScene.vue:109`, `ChannelOptions.vue:378`) — and unlike `SequenceScrubber` it is *already adjacent to* a live glass `<Slider>` in the same grid, which is the strongest available evidence that the primitive covers the shape.

**Proposed id: S-9** — `AnimationVisualizer` → `ScrubberTimeline` (glass-ui `/timeline`, still unimported per S-3), AMBER. Carries the S-3 caveat: the drag/coast/touch-gate behaviour must be checked against the primitive's contract before any swap, and D-1 means the coast should be *deleted*, not ported.

I do **not** contradict any lane finding; I extend the census by one row. **F-1** is upstream of everything here: with glass-ui absent from `package.json` and `package-lock.json`, every negative result I proved against `node_modules/@mkbabb/glass-ui/dist/` (notably D-4's "defined nowhere") holds for *this* install and is not reproducible until F-1 lands.

---

## SUPERLATIVES (L-18, both directions)

### SUP-1 — the gutter geometry is exactly coherent across three independent expressions

Ball width `w-12` = 3rem = 48px (`:21`), so `getMaxX()` = containerWidth − 48. The rail is inset `left-6` (1.5rem = 24px) and sized `w-[calc(100% − var(--visualizer-track-gutter))]` with the token = `3rem` (`layout.css:23`) = 2 × 24px — so the rail spans **precisely** ball-centre-at-progress-0 to ball-centre-at-progress-1. The dashed end marker independently reproduces the same extent in pure CSS: `translate-x-[calc(100cqw − 100%)]` (`:35`) against the `container-inline-size` box (`:13`, `style.css:238-240`) = containerWidth − 48 = `getMaxX()` exactly.

Three expressions — a JS measurement, a CSS `calc` inset, and a container-query transform — agree by construction, and all three lengths are `rem`/`cq`-relative, so they scale together under a root font-size change. `layout.css:23`'s comment names the coupling (*"1.5rem each side"*), which is the discipline `styling-findings.md S2c` originally asked for (the magic `3rem` → named token). This is the best thing in the file.

**Falsifier.** A padding/border on `containerEl` (would split `clientWidth` from the `cqw` box) or a non-`rem` ball width. Neither: `:13` is `w-full h-full relative container-inline-size`, borderless; `:21` is `w-12`.

### SUP-2 — the `aria-hidden` disposition is correctly reasoned *and* structurally guaranteed

`:2-6` states the rule (one AT slider per scrub value; the reka `<Slider>` is it; the twin is sighted-only flair) and it holds by construction, not convention: the component has exactly **one** mount site (`PlaybackRibbon.vue:72`), and that site is inside the same subtree as the `<Slider>` it defers to (`PlaybackRibbon.vue:15-22`). The ball carries no `tabindex` and no `role`, so `aria-hidden` cannot trap focus (the `aria-hidden-focus` failure mode does not apply), and the disabled path is honest: `is-disabled` resolves to `opacity:.5; pointer-events:none` (`style.css:249-252`), so the surface cannot be dragged while it reads disabled.

Correct in a subtle spot too: `gate.isTouchDevice` is read **without** `.value` at `:11` while `gate.isActive.value` is read **with** it — which is right, because `TouchGateReturn` types `isActive: Ref<boolean>` and `isTouchDevice: boolean` (`useTouchGate.d.ts:3-4`). The obvious bug (a truthy Ref making `!gate.isTouchDevice` permanently false, pinning `touch-action` to `pan-y`) is *not* present.

**Falsifier.** A second mount site, a `tabindex`, or an `isTouchDevice` that is actually a Ref. All three checked and negative.

### SUP-3 — theme honesty for free: zero dark-mode overrides, and it cannot drift

Every paint in the file resolves through `--accent-kf`, itself a single `light-dark()` pair (`style.css:130-136`). There is not one hex literal, `rgb()`, `hsl()`, `.dark:` variant, or `@media (prefers-color-scheme)` in the component — so the two arms cannot diverge, and the load-bearing element is comfortable in **both**: ball-vs-background **4.81** light / **8.18** dark, ball-vs-rail **3.70** / **6.00**. Compare the sibling files, which carry per-scene overrides.

**Falsifier.** Any hardcoded colour in the SFC. `grep -E '#[0-9a-f]{3,8}|rgba?\(|hsla?\(|oklch\('` over the file → zero hits.

### SUP-4 — the second-playback dispose is caught, named honestly, and correct

`:252-255` stops `coastPlayback` on scope dispose, with the reasoning stated plainly (*"the sync loop rides `useRafLoop`'s auto-cleanup, but `coastPlayback` is a second raw playback; unmounting mid-fling would otherwise leave it running until the spring settles (a bounded micro-leak)"*). The diagnosis is right — `useDemoTicker.ts:45-48` cleans up only its own subscriber — and the fix is safe: `RAFPlayback.stop` is idempotent and generation-guarded (`playback.ts:234-240`), and it is an arrow class-field, so the extracted-callback receiver hazard (`playback.ts:62-76`) cannot bite. Without it, a mid-fling unmount would keep emitting `scrub` into a dead parent for ~0.5s.

Honest register, correct scope, minimal mechanism — the counterexample to D-15's promotional blocks in the same file.

**Falsifier.** `onScopeDispose` not firing for a `<Teleport>`-hosted component (it does — the setup scope is the component's, not the teleport target's), or `stop()` throwing on an idle playback (`:236` guards `_rafId !== null`).

---

## What I could not decide statically

- Exact composited contrast on the live `Card cartoon tier="quiet"` plate (D-8) — **UNPROVEN-NEEDS-LIVE**, SS-13.
- Whether the D-1 coast is *perceived* as a bug or as an intentional "fling to end" affordance by the owner. The **mechanism** is proven; the **intent** is a ruling, and the code comments claim momentum physics, which the mechanism is not.
- Forced-colors rendering (D-9) — the absence of any handling is proven; the visual result is **UNPROVEN-NEEDS-LIVE**.

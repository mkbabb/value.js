SERVED MODEL: Opus 5.5 (`claude-opus-5-5`). The register seat and every audit and confirm seat ran on Opus 5.5; Fable was not used, by owner order.

# KF animation audit: frame-by-frame register (OA-30)

- **Date:** 2026-09-23
- **Authority:** value.js `docs/tranches/X/COHESION.md` §0be + §0bf
- **keyframes.js SHAs seen:** `d78bed01` (audit start, 3-4 dirty), `3c8199c5` (KF.W13U.t, 2-5 dirty), `cd2cd88f` / `57b4815c` (KF.W13U.e, 2-3 dirty). At register time HEAD is `57b4815c` with 2 dirty. Each seat recorded HEAD and porcelain beside its captures. The KF.W13U commits during the audit touched only PlaybackRibbon.vue, the ChannelOptions easing-trigger slot, and ChannelControls' pane inset. Every confirm seat checked that no cited defect line changed, and re-ran reproductions at the newer HEADs where the frames could not decide the question.
- **Instrument:** headed Chromium on the real GPU (ANGLE Metal, Apple M5 Max), viewport 1440×900, deviceScaleFactor 1, against the served page `http://localhost:5173/` (vite dev). Each seat used one method or a mix: (1) WAAPI/CSS pause and seek, (2) the library's own clock stepped, (3) CDP `Page.startScreencast` with everyNthFrame 1 plus a per-rAF in-page state logger. No harness-only or SwiftShader reading is counted. No MCP browser tool was used.
- **Owner's words (verbatim):** "Mark that most of the animations are broken, like the amiga animation does not layer and compose properly--audit every animation and frame by frame thereof, too. In a planned workflow". Earlier the same day: "Dock animations and transitions for keyframes.js are also awful, blurry, janky, and jittery. The cube doesnt' animate, none of the animationsa re wired up ... the timeline is always greyed out; the animations are all entirely broken".
- **Evidence root `E/`** = `docs/tranches/X/keyframes/evidence/animation-audit/`. Each seat's scripts, JSON logs and frames are under `E/<surface>/`. Cause paths are in keyframes.js unless marked **value.js** (KFA-14) or glass-ui (`node_modules/@mkbabb/glass-ui/dist/…`, glass-ui 7.0.0). Per the BH-relay law, glass-ui causes are relays, not consumer patches.
- **Pipeline:** 36 surfaces, each got an audit seat and then an independent confirm seat. Every audit defect came back CONFIRMED or AMENDED; none was fully REFUTED. Where a confirm seat amended a severity or cause, this register uses the amended version, and the claims it struck are listed in Appendix A. Rows that share a root cause across surfaces are merged into one row that lists every surface. Confirm seats' MISSED items appear as "found at confirm" rows, unless they duplicated an existing row, in which case they were folded into it (noted in that row).
- **Ordering:** BROKEN → HIGH → MEDIUM → LOW. Within a severity, layering/compositing defects come first, and the Amiga layering/compositing rows come first among equals (KFA-18 in HIGH, KFA-64/65 in MEDIUM, KFA-181 in the found-at-confirm HIGH rows).

## Verdict

**The owner's reading holds.** Across 36 surfaces the register holds **228 KFA rows**: **17 BROKEN · 48 HIGH · 72 MEDIUM · 91 LOW**. Of those, 180 are from the audits and 48 were found at confirm. 33 of the 36 surfaces animate at all, and only the hero wave (`home-animated-text`) and the axis-lock tell (`cube-axis-lines`) are close to healthy. Three surfaces do not animate on their reachable path:
- the scene swap (KFA-12, an unbound `startViewTransition` hard-cuts every swap)
- the cube loader (KFA-89, dead code)
- the timeline (KFA-14, value.js rejects legacy `rgba()`, so a snapshot-built timeline never builds; this is the "always greyed out" root, together with KFA-61's greyed-out ribbon rail)

**Amiga does not compose.** KFA-18: the store's default `ease-in-out` overwrites every authored Amiga curve (linear X and spin, FALL/RISE gravity), so X stalls mid-room, the spin stalls, and Y floats instead of slamming. KFA-181: Y drifts out of phase with X every loop because the engine drops each wrap's overshoot. KFA-64: the gesture is composed outside the spin. KFA-65: the back wall hangs through the floor.

**"The cube doesn't animate / nothing is wired."** The cube spins, but the orbit layer is never applied and the drag is written into the playing Matrix channel (KFA-1). A second writer makes it flicker (KFA-2). The pose is applied twice (KFA-29), relighting is frozen (KFA-31), and Pause does not pause (KFA-182). All of these trace to the missing machine-derived `isStarted/isPlaying` authority.

**Dock "blurry, janky, jittery."** The cause is the glass-ui dock morph, and all of these go to the glass-ui relay: an 80 px first-expand plate (KFA-8), an under-measured wrap (KFA-51), the stagger swallowed by the controls' own transitions (KFA-52), the leaving row spilling into a column (KFA-50), and the dock-wide blur plus the squashed end pose (KFA-55). On the transport dock specifically, the collapsed Play cannot be pressed (KFA-13), because the hover-expand moves it 58-77 px within 60 ms.

## Summary

| Severity | Rows | from audit | found at confirm |
|---|---|---|---|
| BROKEN | 17 | 17 | 0 |
| HIGH | 48 | 46 | 2 |
| MEDIUM | 72 | 61 | 11 |
| LOW | 91 | 56 | 35 |

A merged row counts once for each surface it lists, so the per-surface counts below add up to more than 228.

| Surface | Animates? | BROKEN | HIGH | MEDIUM | LOW | Worst row |
|---|---|---|---|---|---|---|
| `home-landing-cube` | yes | 0 | 2 | 4 | 4 | KFA-22 (HIGH): The home Play gesture freezes the page (0.27-1.5 s), and then the spin jumps ~176° in one … |
| `home-hero-aurora` | yes | 0 | 1 | 1 | 2 | KFA-23 (HIGH): Cold load: a page-wide 1.9-2.5 s main-thread stall (a FrameRequestCallback in glass-ui's u… |
| `home-animated-text` | yes | 0 | 0 | 1 | 1 | KFA-74 (MEDIUM): A one-shot 0.75-1.05 s page-wide freeze ~8-11 s after load stops the hero wave mid-cycle a… |
| `home-typing-dots` | yes | 0 | 1 | 0 | 2 | KFA-28 (HIGH): The `steps(4, jump-none)` cadence is baked into linear ramps on the WAAPI lane: the steppe… |
| `scene-swap-transition` | no | 1 | 3 | 3 | 2 | KFA-12 (BROKEN): Scene swap does not animate at all: kf viewTransition calls the native startViewTransition… |
| `scene-skeleton-shimmer` | yes | 0 | 1 | 4 | 2 | KFA-27 (HIGH): The skeleton shimmer does not reach the plate for ~1.4 s after mount, so a real cold load … |
| `cube-group-spin-matrix-bob` | yes | 2 | 2 | 2 | 3 | KFA-2 (BROKEN): Two writers on `.cube`: paintTarget's matrix3d and the spin animation alternate frames, so… |
| `cube-orbital-drag-inertia` | yes | 2 | 2 | 4 | 0 | KFA-1 (BROKEN): The orbit layer never renders: the OrbitalDrag container transform is never applied, and e… |
| `cube-relit-faces` | yes | 1 | 3 | 1 | 0 | KFA-1 (BROKEN): The orbit layer never renders: the OrbitalDrag container transform is never applied, and e… |
| `cube-roll-egg` | yes | 0 | 0 | 2 | 4 | KFA-86 (MEDIUM): The roll overshoot scales with the whole multi-turn arc: the die rolls up to a whole face … |
| `cube-axis-lines` | yes | 1 | 0 | 1 | 2 | KFA-2 (BROKEN): Two writers on `.cube`: paintTarget's matrix3d and the spin animation alternate frames, so… |
| `cube-loader-spin` | no | 0 | 0 | 1 | 3 | KFA-89 (MEDIUM): The cube loader is dead code: it never mounts or paints, because its show gate is a select… |
| `amiga-boing-composite` | yes | 0 | 3 | 2 | 2 | KFA-18 (HIGH): Amiga layers do not compose into the Boing arc: every channel's authored timing is overwri… |
| `amiga-contact-shadow` | yes | 0 | 1 | 1 | 1 | KFA-18 (HIGH): Amiga layers do not compose into the Boing arc: every channel's authored timing is overwri… |
| `amiga-grid-room-backdrop` | yes | 0 | 2 | 4 | 2 | KFA-18 (HIGH): Amiga layers do not compose into the Boing arc: every channel's authored timing is overwri… |
| `amiga-sphere-spin-gesture` | yes | 0 | 2 | 1 | 5 | KFA-19 (HIGH): Drag spin is gimbal-coupled: after a vertical drag, a horizontal drag rolls the ball in pl… |
| `square-tour` | yes | 1 | 1 | 2 | 4 | KFA-13 (BROKEN): Pressing the collapsed transport pill's Play does not play: the hover-expand moves Play ~5… |
| `square-drag-spring-tether` | yes | 1 | 1 | 5 | 0 | KFA-4 (BROKEN): The rubber-band tether is never visible: the box it tethers paints over it at every pose |
| `square-tumble-egg` | yes | 0 | 0 | 5 | 3 | KFA-90 (MEDIUM): Pressing Play on Square snaps the fill from the rest teal to the tour's violet in one fram… |
| `easing-gallery-race` | yes | 2 | 1 | 2 | 1 | KFA-9 (BROKEN): The specimen gallery renders as one content-sized horizontal pill row, not the responsive … |
| `easing-picker-curve` | yes | 1 | 2 | 2 | 4 | KFA-11 (BROKEN): EasingPicker is crushed into a ~41 px thumbnail curve in both hosts (Curve tab and TimingF… |
| `spring-live-solver` | yes | 0 | 2 | 2 | 4 | KFA-38 (HIGH): The spring page loads falsely 'tracking': the ball sits at 0 and the target at 1, nothing … |
| `spring-derby-egg` | yes | 0 | 3 | 1 | 3 | KFA-40 (HIGH): Derby lane tags wrap to two lines and print over the next lane's tag, so they cannot be re… |
| `spring-physics-facet` | yes | 1 | 3 | 1 | 4 | KFA-13 (BROKEN): Pressing the collapsed transport pill's Play does not play: the hover-expand moves Play ~5… |
| `spring-starting-style-entry` | yes | 0 | 2 | 2 | 4 | KFA-45 (HIGH): The @starting-style entry spring runs 4× too fast: the whole entry or exit happens in ~100… |
| `sequence-staggered-rows` | yes | 1 | 1 | 1 | 3 | KFA-3 (BROKEN): The ball's `scale` pop multiplies its rail position: balls rest off their gates, run past … |
| `sequence-power-on-cascade` | yes | 0 | 1 | 2 | 2 | KFA-49 (HIGH): The master playhead that fades in last lands in the ruler strip, over the '0' label, and n… |
| `sequence-reel-egg` | yes | 3 | 2 | 2 | 3 | KFA-3 (BROKEN): The ball's `scale` pop multiplies its rail position: balls rest off their gates, run past … |
| `chrome-dock-expand-collapse` | yes | 1 | 4 | 3 | 0 | KFA-8 (BROKEN): First expand after load morphs inside an 80 px plate: the row wraps into a 4-row column sp… |
| `chrome-dock-menus` | yes | 0 | 1 | 4 | 3 | KFA-50 (HIGH): Dock morph crossfade is layered wrongly: on every collapse, the leaving row wraps into a v… |
| `transport-dock` | yes | 2 | 3 | 1 | 4 | KFA-7 (BROKEN): The collapsed transport face overflows its pill: Play hangs outside the glass and the chan… |
| `controls-pane-drawer` | yes | 0 | 0 | 4 | 5 | KFA-116 (MEDIUM): Opening or closing the controls rail slices the pane cards with a hard vertical edge inste… |
| `timeline-panel` | no | 1 | 5 | 5 | 3 | KFA-14 (BROKEN): A timeline built from Snapshots never builds: value.js rejects the legacy `rgba(r, g, b, a… |
| `playback-ribbon-visualizer` | yes | 0 | 3 | 1 | 3 | KFA-21 (HIGH): The controls panel shows demo-global defaults (5s / alternate / ease-in-out), not the opti… |
| `keyframes-editor-cards` | yes | 4 | 1 | 2 | 4 | KFA-5 (BROKEN): Card control cluster (✕ / copy / f·s meta) paints through the sticky 'Keyframe offsets' fo… |
| `copy-button-feedback` | yes | 0 | 1 | 1 | 3 | KFA-63 (HIGH): The 'copied' confirmation is a ~100 ms blink that is never held, and at rest the control s… |

## Defect rows (audit-confirmed or amended)

### KFA-1 · BROKEN · The orbit layer never renders: the OrbitalDrag container transform is never applied, and every drag frame is written into the playing Matrix channel's end keyframe
**Surface:** `cube-orbital-drag-inertia`, `cube-relit-faces`

- **Observed vs expected:** The orbit container's inline transform is '' in all 942 samples across 4 flings, and isStarted/isPlaying are false the whole time even though the scene autoplays. The model rotates, but what shows is `.cube-pose` wherever the Matrix playhead happens to be. The error runs from ~0° to 60° (the B drag has no visible effect) up to 154° (D coast). After a coast the die slides back toward identity. Expected: the die follows the pointer 1:1, coasts through decay(), and stays where it lands, as its own composed layer above bob · pose · spin (DESIGN.md §8).
- **Frames + evidence:** run3 f30-75, f255-316 (drag has no visible effect), f150-254 (slides back), f702-873; samples 48-96, 176-304, 344-376, 816-936 · `E/cube-orbital-drag-inertia/run3/`, `samples.json`
- **Cause:** `demo/scenes/cube/CubeTarget.vue:15` gates the container on `isPlaying || isStarted`. isPlaying has no writer (`CubeScene.vue:61-71`). isStarted is written only from a transport click (`useSceneMachineShellBinding.ts:261-266` ← `useAnimationGroupPlayback.ts:67-71`), so the autoplay PLAY never sets it. `matrix-editor/useTransformState.ts:276-293` then turns each drag frame into matrix3dEnd, and `useCubeDemo.ts:62-64` calls adoptCompiled on a PLAYING animation every frame.
- **Fix shape:** Give the orbit one unconditional owner: drop the gate so OrbitalDrag always composes its rotate3d on the container. Remove the drag→matrix3dEnd path, so only slider and cell intents write the Matrix channel. Derive isStarted/isPlaying from machine status (one authority), which covers the autoplay PLAY too.

### KFA-2 · BROKEN · Two writers on `.cube`: paintTarget's matrix3d and the spin animation alternate frames, so the die flickers between two attitudes (and a drag during autoplay does nothing)
**Surface:** `cube-orbital-drag-inertia`, `cube-group-spin-matrix-bob`, `cube-axis-lines`

- **Observed vs expected:** On 86 of 179 frames of a fling, `.cube` receives both paintTarget's matrix3d and the spin's rotateX/Y/Z, and the matrix3d holds for about one vsync. The die snaps between two orientations on alternate frames (4|1 from below vs 3/2|3 from above). The same flicker appears in the axis-lines seat's X-held drag (sc-180..191), and the cube-group seat saw drags during autoplay produce no visible effect (122/122 samples spin-only). Expected: one writer per property per element, with `.cube` owned by the spin.
- **Frames + evidence:** orbital run3 f264-277, f80-95, f216/219, f720-723 · `E/cube-orbital-drag-inertia/writers.json`; `E/cube-group-spin-matrix-bob/interact/drag-during-autoplay.json`, `double-pose.json`; `E/cube-axis-lines/sheet-screencast-07.png`
- **Cause:** `demo/scenes/cube/matrix-editor/useTransformState.ts:120-125`: paintTarget writes matrix3dCss(matrix3dEnd) into targetRef = cubeElRef, which is `.cube` (`CubeScene.vue:172`). That is the spin's own element (`useCubeDemo.ts:160` rotationAnim.setTargets(cubeEl)).
- **Fix shape:** Delete paintTarget's write to `.cube`, or point it at poseEl (the Matrix channel's own element) and write only while the group is idle. No demo code should write the transform of an element that an animation channel owns.

### KFA-3 · BROKEN · The ball's `scale` pop multiplies its rail position: balls rest off their gates, run past the rail end, and lurch backwards as the pop settles
**Surface:** `sequence-staggered-rows`, `sequence-reel-egg`

- **Observed vs expected:** At rest (scale 0.7), rows 2-5 sit 23/45/68/90 px LEFT of their start handles, which breaks the resting diagonal (the first frame anyone sees; the rows confirm seat also reported this). On the 70% plateau (scale 1.12) balls sit 47-74 px ahead of `--ball-p`, and row 5 pokes past the rail end at 1038 px. When scale goes 1.12→1, the ball lurches backwards while p moves forwards. The reel shows the same composition. Expected: the ball centre sits exactly at f·100cqw and the pop only changes size.
- **Frames + evidence:** rows seek#0 (`rest-fresh.png`), seek#1-40, seek#28 row 5 cx 1047; reel A#0, A#77-90, `00-page.png` · `E/sequence-staggered-rows/capture-log.json`, `E/sequence-reel-egg/samples.json`
- **Cause:** `demo/scenes/sequence/useSequenceDemo.ts:161-165` keyframes the individual CSS `scale` property, while `SequenceTarget.css:239-244` positions with `transform: translateX(...)`. CSS composes translate→rotate→scale→transform, so the matrix is S·T and scale multiplies the translation.
- **Fix shape:** Carry the travel on the individual `translate:` property (applied before scale) instead of `transform: translateX`, or put the pop on an inner dot so the positioned host is never scaled.

### KFA-4 · BROKEN · The rubber-band tether is never visible: the box it tethers paints over it at every pose
**Surface:** `square-drag-spring-tether`

- **Observed vs expected:** The tether is active (class --active, opacity 1) during every drag, yet only 0-2 of 61 path points reach the screen. The only trace is a 2 px violet stub at the box corner. Expected: a violet slingshot line from home to the chasing box while it chases (`SquareInstrument.vue:4-9`).
- **Frames + evidence:** rAF rec 21-99, 219-285; screencast f2-47, f86-110 · `E/square-drag-spring-tether/probe2.json` (visibleSamples 0/1/2/2), `held-poses-sheet.png`
- **Cause:** `demo/scenes/square/SquareInstrument.vue:173-190`: the path runs from home to the box CENTRE. Travel is 110 px (`SquareScene.css:29`) against a swollen half-size of 107.5 px (`:69`, `useSquareDemo.ts:315`), so home is always inside the box. `.demo-box` has z-index var(--z-content) (`SquareScene.css:66-67`) and `.square-tether` has no z-index (`SquareInstrument.vue:243-257`).
- **Fix shape:** Clip the path at the box outline, or draw home→pointer against the box, or raise the band above the box fill. Travel must clearly exceed the swollen half-size for any segment to show.

### KFA-5 · BROKEN · Card control cluster (✕ / copy / f·s meta) paints through the sticky 'Keyframe offsets' footer
**Surface:** `keyframes-editor-cards`

- **Observed vs expected:** At rest, the absolutely positioned control cluster of any card scrolled under the sticky footer draws on top of it: ✕ over the word 'between', 'f 1 / s 25%' over the offsets slider. Expected: the footer plate paints above all scrolled card content.
- **Frames + evidence:** A #0-3, C #0-46 · `E/keyframes-editor-cards/rest-editor.png`, `sheet-A_edit_single-0.png`
- **Cause:** `demo/components/instrument/keyframes/components/KeyframeCard.vue:132` gives the cluster `absolute z-content` (10). The footer at `KeyframesEditor.vue:62` is `sticky bottom-0` with z auto, and card roots do not isolate.
- **Fix shape:** Put `isolation:isolate` on each card root, or give the footer a z rung above the content plane (one of the two, not both).

### KFA-6 · BROKEN · After a card is removed, its neighbour is left displaced: the transform is applied twice and the neighbour overlaps the card above
**Surface:** `keyframes-editor-cards`

- **Observed vs expected:** After the removal re-layout, the neighbour keeps an inline translateY(-106.863%) (~180 px). It ends at y≈147.6 over the preceding card (y≈142.1) and the two cards' text is drawn over each other. The residue persists into the next removal, which snaps it -106.9%→0 in one frame. Cards below do not move, so a gap opens and then snaps shut. Expected: a FLIP-like close with no residual transform. (Confirm amended the cause: -106.863% is the frozen mid-flight overshoot from the KFA removal-freeze row. Fill-forwards would still leave -100% on top of the layout shift.)
- **Frames + evidence:** C #47-59, D #0-2, #47-62 · `E/keyframes-editor-cards/rest-end.png`, `C_remove_middle/frames.json`
- **Cause:** `demo/components/instrument/keyframes/KeyframesEditor.vue:552-556`: exitMotion never clears inline style. jumpUp inherits `fillMode:'forwards'` (`src/animation/constants/defaults.ts:84`, `presets/catalog.ts:307-310`). jumpUp's -100% is the card's height (168 px), not the list pitch (184.5 px). Only `cards[frameIx+1]` is targeted.
- **Fix shape:** FLIP: measure the following cards before the splice, commit, then animate the deltas to 0 with fillMode 'none' (or use a TransitionGroup move class). At minimum use fillMode 'none' and clear the inline transform after the commit.

### KFA-7 · BROKEN · The collapsed transport face overflows its pill: Play hangs outside the glass and the channel name spills across a 56 px circle
**Surface:** `transport-dock`

- **Observed vs expected:** Collapsed, the glass is a 56×56 circle, and the summary layer is forced to a 40×40 square. Its content (32 px Play plus the 94 px 'Rotations' label) is centred and overflows on both sides: Play at cx 669.9 is outside the pill, and the label is drawn over and past the circle. Expected: a pill that contains Play and the name (TD-37).
- **Frames + evidence:** step collapse #30-47; rt #563-642, #757-1024 · `E/transport-dock/step/rest-collapsed.png`, `probe-collapsed.png`, `confirm/probe-collapsed.png` (re-verified at kf cd2cd88f)
- **Cause:** `demo/components/instrument/transport/TransportDock.vue:224-245` puts two items in #collapsed. glass-ui 7.0.0 `dist/components/dock/styles/morph.css:1` forces `.dock-layer--summary` to be square (aspect-ratio 1, centred). ChromeDock (`ChromeDock.vue:600-615`) documents this exact constraint and went icon-only.
- **Fix shape:** Consumer: make the collapsed face Play-only, like ChromeDock. Or producer (relay to BH): a non-square summary variant (aspect-ratio auto, max-content measured into --dock-collapsed-px).

### KFA-8 · BROKEN · First expand after load morphs inside an 80 px plate: the row wraps into a 4-row column spilling past the glass, then snaps to 536 px
**Surface:** `chrome-dock-expand-collapse`

- **Observed vs expected:** On the first hover, `--dock-expanded-px` is 80px. The dock is held at 80 px for the whole morph, the row wraps into a 185 px-tall 4-row column whose labels paint outside the plate, and at settle it snaps in one frame to a 536×56 single row. Expected: a smooth widen from 60 to 536 px with a one-row reveal.
- **Frames + evidence:** rt #43-74 (sheets exp1a-c), snap #74→#75; rt-log rows 47-78 · `E/chrome-dock-expand-collapse/rt/`, `rt-log.json`
- **Cause:** glass-ui `dist/dock.js:469-476` (ze/Be): with no earlier expansion the estimate is `_ + m`, where m is the offsetWidth of the hidden `.dock-layer--full` (absolute, inset:0 per `layers.css`), about 20 px. `layers.css` `[data-morphing] inline-size: var(--dock-expanded-px)` plus overflow="wrap" (`demo/app/dock/ChromeDock.vue:415-419`) forces the wrap.
- **Fix shape:** Producer (relay): measure the hidden layer's intrinsic width (a max-content probe), or seat the endpoint without a morph until a real measurement exists.

### KFA-9 · BROKEN · The specimen gallery renders as one content-sized horizontal pill row, not the responsive tile grid
**Surface:** `easing-gallery-race`

- **Observed vs expected:** `.specimen-grid` computes display inline-flex, radius 10003px, and the ToggleGroup track background. Tiles are sized to their names (40-161 px), and the row is 4032 px wide inside an 828 px y-scroller, so about 8 of the 28 specimens are visible and the 8th is cut off ('ease-'). Expected: repeat(auto-fill, minmax(150px,1fr)) wrapping all 28 uniform tiles (`EasingTarget.css:100-107`).
- **Frames + evidence:** every A frame #0-366 · `E/easing-gallery-race/00-landing.png`, `01-rest.png`, `sheets/A-sheet-00..15`, `confirm-probe.mjs` (re-verified)
- **Cause:** `demo/scenes/easing/EasingTarget.vue:118`: the producer ToggleGroup renders a fragment with a leading text anchor, so scoped fallthrough never stamps `data-v-ae6ddf0c` on the grid root. Both scoped `.specimen-grid[data-v-…]` rules (`EasingTarget.css:100` and the track-reset block) match nothing.
- **Fix shape:** Style it from an owned ancestor: `.specimen-drawer :deep(.specimen-grid)`, or wrap the group in an owned grid element. Long term the producer should render a single-root ToggleGroup plus a track opt-out.

### KFA-10 · BROKEN · One rail width, measured from the first tile only, drives all 28 balls: they overshoot narrow rails and stop short on wide ones
**Surface:** `easing-gallery-race`

- **Observed vs expected:** railWidth comes from tile 0's stage (60 px, maxX 46) and is used for all 28 balls. The 'ease' ball runs 20 px past its 40 px pill, and wide tiles stop their balls at 46 px, far short of the terminus tick. The Back filter repeats it (ease-in-out-back stops ~40 px short). The sparkline and ball also disagree on every tile whose width differs from tile 0 (found at confirm).
- **Frames + evidence:** A#96-99, `10-zoom-midmotion.png`, D#0 · `E/easing-gallery-race/transport.json` ('pointer-drag to end' all 46px)
- **Cause:** `demo/scenes/easing/EasingTarget.vue:308-330, 363`: tileBallXAt reads a single shared railWidth set from `tileSnapshot[0].stage`. The comment's assumption that all tiles are the same width (`:390-393`) broke with the grid.
- **Fix shape:** Store maxX on each TileEntry (per-stage clientWidth measured by one ResizeObserver over all stages) and paint with entry.maxX.

### KFA-11 · BROKEN · EasingPicker is crushed into a ~41 px thumbnail curve in both hosts (Curve tab and TimingFunctionPanel)
**Surface:** `easing-picker-curve`

- **Observed vs expected:** The picker grid resolves to columns '67.2px 288px'. The svg is 41.2×200 and meet-bound to a ~41×49 plot in a 67×226 dead column, with 3.3 px handles and a ~4 px hit radius. #/cube's TimingFunctionPanel is the same. Expected: a square plot of at least 200 px with grabbable handles, and presets stacked below it (EasingSidebar.vue:1-12, "the bezier/steps AUTHORING surface").
- **Frames + evidence:** drag f000-047, tfp f000-023 · `E/easing-picker-curve/A-rest-zoom.png`, `E-cube-detail-open-rest.png`, `meta.json` parts.A.rest
- **Cause:** glass-ui 7.0.0 `dist/easing.js:316` `lg:grid-cols-[1fr_18rem]` is keyed to the viewport, not the host. `:334` `block-size: clamp(200px,38cqi,320px)` together with w-full defeats aspect-ratio. Consumed at `demo/scenes/easing/EasingSidebar.vue:35` and `demo/components/instrument/transport/channel-controls/TimingFunctionPanel.vue:50`.
- **Fix shape:** Producer (relay to BH): switch the two-column split to a container query (`@2xl:grid-cols-…`) and let aspect-ratio own the svg inline size. Do not :deep-override it in the consumer.

### KFA-12 · BROKEN · Scene swap does not animate at all: kf viewTransition calls the native startViewTransition unbound, it throws 'Illegal invocation', and the swap falls back to a hard cut
**Surface:** `scene-swap-transition`

- **Observed vs expected:** Every dock scene pick is a single-frame hard cut. getAnimations() shows 0 ::view-transition-* animations, with 2 recorded throws per swap. A bound call on the same page runs 10 VT animations. The no-VT spring fallback is also inert, because supportsViewTransitions() is true. Expected: a compositor cross-fade with a shared-element morph on the scene host, or at minimum the fallback's cross-dissolve.
- **Frames + evidence:** A-cube-to-amiga f075→076, f089→090 (`pair-75-76-89-90.png`); A-amiga-to-square f026→027 · `E/scene-swap-transition/probe-vt-binding.json`, `B-shipped-seek-*/`
- **Cause:** `src/animation/orchestration/view-transition/view-transition.ts:233-243` detaches `document.startViewTransition` into a local and calls it bare. The catch at `:244-250` runs the fallback, which becomes immediateHandle (`:152`). The unit stub (`test/orchestration/view-transition.test.ts:126-135`) has no receiver check. `demo/app/transition/useSceneSwap.ts:35/44` disables the spring whenever VT is detected.
- **Fix shape:** Call `document.startViewTransition(…)` as a method (or bind it). Make the test stub assert `this === document`. Drive useSceneSwap's fallback from the handle's `backend !== 'view-transition'`, not from an independent feature probe.

### KFA-13 · BROKEN · Pressing the collapsed transport pill's Play does not play: the hover-expand moves Play ~58-77 px within 60 ms, so the press lands on the Select trigger or is cancelled
**Surface:** `transport-dock`, `cube-group-spin-matrix-bob`, `square-tour`, `spring-physics-facet`, `sequence-reel-egg`

- **Observed vs expected:** With the pointer on the collapsed Play (cx ~670), the dock hover-expands ~60 ms after pointerenter and the expanded Play lands at cx ~593-612. The press then opens the animation Select (transport cpress #03) or is silently cancelled by the same-control rule. This was seen on cube (the Play mirror has moved 77 px by 60 ms; confirm re-probe), square (amended: once the dock has settled, Play works), spring (after any facet interaction), and sequence (the first press only re-expands, so a Play held for after the reel never gets through). Expected: one press on the visible Play plays.
- **Frames + evidence:** `E/transport-dock/sheets/zoom-cpress.png` (#00-35); `E/cube-group-spin-matrix-bob/interact/confirm-play-click.json`; `E/square-tour/confirm-dockplay.json`; `E/spring-physics-facet/probe-transport-after-interactions.json`; `E/sequence-reel-egg/` dockprobe2-4
- **Cause:** The faces are centred, not start-anchored (glass-ui `morph.css:1` justify-content:center; `layers.css` grid-area 1/1), so Play's x differs between the faces. glass-ui `dist/dock.js` useDockState expands 60 ms after mouseenter. `demo/components/instrument/transport/TransportDock.vue:164-172, 203-245` plus `TransportDock/usePlayActuation.ts:13-25, 81-89` (the same-control guard).
- **Fix shape:** Give Play the same x on both faces: start-anchor the summary and anchor the morph at inline-start. Or treat both play mirrors as one actuation identity, or actuate the collapsed mirror on pointerdown. Re-verify with the cpress sequence.

### KFA-14 · BROKEN · A timeline built from Snapshots never builds: value.js rejects the legacy `rgba(r, g, b, a)` that getComputedStyle returns, so the timeline is "always greyed out"
**Surface:** `timeline-panel`

- **Observed vs expected:** Snapshots at 0/50/100% produce the banner 'Animation could not be built — Invalid CSS value for "backgroundColor" at 0-16: expected scalar'. animation stays null, and scrubbing moves the playhead while the preview holds one transform across all 51 frames. With a valid imported @keyframes the same path paints 51 distinct poses, so the build is the only break. Confirm reproduced it against the installed value.js dist: `rgba(0, 0, 0, 0)` fails in parseCssValue/Values/Scalar/Color, and `rgb(0 0 0 / 0)` passes.
- **Frames + evidence:** D-scrub f000-050 · `E/timeline-panel/C-after-snapshots-full.png`, `capture-log.json` D_rows, `F-selected-full.png`, probe5
- **Cause:** **value.js** `src/css/grammar.ts:221-227` (parseFunctionalColor) turns commas into spaces and then requires `components.length === 3`. Alpha is read only after a slash (`:212`). keyframes.js throws at `src/animation/compile/value/compile.ts:33-38`, and `demo/components/instrument/timeline/utils/snapshotCapture.ts` captures background-color by default.
- **Fix shape:** value.js: accept CSS Color 4 legacy syntax (when commas are used, allow 3 or 4 components for rgb/rgba/hsl/hsla, 4th = alpha; reject mixing commas and slash) and add a test for `rgba(0, 0, 0, 0)`. Optionally also have the demo normalise captured colours.

### KFA-15 · BROKEN · The edit-feedback sweep is never visible: the bar's rest class `scale-x-0` multiplies the animated transform by zero
**Surface:** `keyframes-editor-cards`

- **Observed vs expected:** The engine runs scaleX(0)→scaleX(1) over exactly 1000 ms, yet getBoundingClientRect width is 0 in every sample and no rainbow bar appears in any frame. Computed shows `transform: matrix(0.594…)` alongside `scale: 0 1`. Forcing `scale:1` makes it render. Expected: a 0→full-width sweep on each edit (`KeyframesEditor.vue:630-633`).
- **Frames + evidence:** A #4-49, B #1-20 · `E/keyframes-editor-cards/probe5-midsweep.png` vs `probe5-scale-override.png`
- **Cause:** `demo/components/instrument/keyframes/KeyframesEditor.vue:253` `scale-x-0` compiles (Tailwind v4) to the individual `scale: 0 1` property, which multiplies with the animated `transform: scaleX()` at `:635-639`. The twin is at `components/KeyframesAddDialog.vue:51`.
- **Fix shape:** Use one property for rest and sweep: animate `scale` (`fromVars([{scale:'0 1'},{scale:'1 1'}])`), or set the rest state with transform. Fix both sites.

### KFA-16 · BROKEN · Card-removal motion freezes at ~74%: the engine throws on mismatched transform lists, the group never settles, and removal lands only on the 1400 ms timeout
**Surface:** `keyframes-editor-cards`

- **Observed vs expected:** The leaving card (warpLeft) and its neighbour (jumpUp) animate for ~516 ms, then both freeze in the same frame. The leaving card is a translucent ghost (opacity 0.239) over the neighbour's text for ~870 ms, and then the data removal lands at 1449 ms. pageerror: BrowserScalarResolutionError 'Could not resolve "translateX(0%) rotate(0deg)"'. The console warns twice that the motion did not settle within 1400 ms. D reproduces it exactly.
- **Frames + evidence:** C #33-46 → #47 (1457 ms); D #33-46 → #47 · `E/keyframes-editor-cards/sheet-C_remove_middle-1.png`, `meta.json`, probe6 output
- **Cause:** `src/animation/presets/classic-data.ts:170-190` warpLeft goes from 75% `translateX(0%) rotate(0deg)` to 100% `translateX(-100%)`. `src/animation/compile/frame/interp-slot.ts:239` (browserResolvedPair) sends the mismatched pair to the scalar probe, which throws (`src/animation/resolve/browser.ts:111`). The throw aborts the shared draw-loop frame, and AnimationGroup.play() never resolves.
- **Fix shape:** Engine: interpolate mismatched transform lists per CSS Transforms (pad with identity functions, else matrix-decompose) and never scalar-probe a list. Contain a per-animation draw failure so it rejects that animation's promise. Data: make the 100% stop `translateX(-100%) rotate(0deg)`.

### KFA-17 · BROKEN · Play after any scrub (including a Play held during the reel) shows PLAYING while the master stays frozen
**Surface:** `sequence-reel-egg`

- **Observed vs expected:** Scrub to 0.5, then reel, then Play: the badge reads PLAYING and the dock shows Pause, but the clock stays at 970 and the balls never move. A plain scrub then Play is frozen in the same way. From the origin, the held Play runs. Confirm re-ran it at kf cd2cd88f: frozen at 970 PLAYING.
- **Frames + evidence:** E-master-live f0000-0022 · `E/sequence-reel-egg/transport.json` T4/T5, dockprobe3 'scrub-then-play', dockprobe4 'scrub-reel-held-play'
- **Cause:** `demo/scenes/sequence/useSequenceDemo.ts:254, 271` startLoop takes the isMidPlay() branch and calls `sequence.resume()`. `lifecycle.ts:108` returns early when `_playingPromise` is unset, which is the case for a sequence that was only seeked. The machine is left 'playing' with no engine loop.
- **Fix shape:** Resume only when there is a live paused play; otherwise `play()` from `sequence.time`. Or have Sequence.resume() fall back to play-from-playhead instead of silently doing nothing.

### KFA-18 · HIGH · Amiga layers do not compose into the Boing arc: every channel's authored timing is overwritten by the store default `ease-in-out` (X stalls mid-room and at the walls, the spin stalls, Y floats onto the floor instead of slamming)
**Surface:** `amiga-boing-composite`, `amiga-contact-shadow`, `amiga-grid-room-backdrop`

- **Observed vs expected:** At runtime all three channels carry `timingFunction {css:'ease-in-out'}`, and every compiled frame is resampled to ease-in-out, while templateFrames still hold the authored linear and FALL/RISE curves. Stepped X at t=167/333/500 ms reads 0.068/0.281/0.646 where linear gives 0.417/0.833/1.250. The ball holds x≈0 for ~1 s at each centre crossing and decelerates dead into each wall, and the spin stops with it. Y reaches the floor at ~0.8 u/s (it should be ~17+ u/s), so the bounce floats and the contact shadow lingers 4-5 frames per contact instead of flashing. The shadow's x-track and scale/fade inherit the same wrong curves (shadow scrub 10% gives px 1.351 where linear gives 2.0). Expected: `useAmigaDemo.ts:26-30, 236-238, 253-255, 287-291`: linear X and spin (|v| 2.5 u/s), FALL ease-in into the floor, RISE ease-out to the apex.
- **Frames + evidence:** boing step s1-47 (`sheets/step-00.png`, `step-01.png`), live f96-119; grid step s1-3, s11-13, s23-25; shadow f72-90, f192-210 · `E/amiga-boing-composite/easing-probe.json`, `options-probe.json`; `E/amiga-contact-shadow/raflog.json`, `transport/x-scrub.json`; `E/amiga-grid-room-backdrop/capture-out.json`, `confirm/c05-scrub-reset.mjs` (still reproduces at kf 3c8199c5)
- **Cause:** `demo/state/animationOptionsStore.ts:106-114` seeds every new channel bucket with `structuredClone(defaultStoredAnimationOptions)` (the `:42-50` defaults are 5s / alternate / ease-in-out). `demo/components/instrument/transport/channel-controls/ChannelOptions.vue:933-941` (onMounted, at kf 3c8199c5) re-applies the stored easing unconditionally through `useTimingFunctionEditor.ts:148-152`, whose `animation.frames.forEach(f => f.timingFunction = easing)` clobbers per-frame easings and bypasses the engine's identity-preserving `src/animation/engine/option-setters.ts:53-66`. The overwrite also reaches unselected channels.
- **Fix shape:** Seed an empty bucket FROM the animation's own options (duration, direction, timingFunction, per-frame curves). Do not re-apply on mount; apply only on a user edit. Route edits through `animation.setTimingFunction()`, which re-seats only the frames that inherited the easing.

### KFA-19 · HIGH · Drag spin is gimbal-coupled: after a vertical drag, a horizontal drag rolls the ball in place (no effect at 90° pitch, reversed past it)
**Surface:** `amiga-sphere-spin-gesture`

- **Observed vs expected:** Drag down 157 px (ox=π/2) so the north pole faces the camera, then drag right: the wedges turn like a wheel around the pole instead of travelling under the finger. For a +0.05 rad yaw the front point moves dx 0.050/0.035/0.000/-0.035/-0.050 at pitch 0/45/90/135/180° (independently re-derived at confirm). Expected: trackball behaviour, where a horizontal drag always turns the ball about the screen-vertical axis (DESIGN.md §8).
- **Frames + evidence:** p2-pitch-then-yaw f139, f143-281 (`key-sheet.png`, sheet-05..11); p1b-flick-cast f24-47 · `E/amiga-sphere-spin-gesture/euler-check.mjs`
- **Cause:** `demo/scenes/amiga/useSphereSpin.ts:151-152` accumulates two Euler angles. `demo/scenes/amiga/AmigaScene.vue:245, 396-397` builds `Euler(offset.x, offset.y, 0, 'XYZ')`, so yaw is applied about the already-pitched body Y axis.
- **Fix shape:** Accumulate a single quaternion: on each move, premultiply a screen-axis rotation (axis normalize(dy,dx,0), angle |d|·s). Carry release velocity as one angular-velocity vector, and derive offset.{x,y} only for aria-valuenow.

### KFA-20 · HIGH · Keyboard yaw nudge is exactly one checker tile: each Arrow press looks like a red↔white colour swap, and two presses look like nothing happened
**Surface:** `amiga-sphere-spin-gesture`

- **Observed vs expected:** Each ArrowLeft/Right changes the image in one frame, to the same checker with colours inverted. After 2 presses (45°) the render is identical to the start. No in-between frame shows direction. Expected: 'Arrow keys spin the ball a sixteenth of a turn', with the turn visible.
- **Frames + evidence:** p3-keys f1, f2, f19, f20, f24, f25 · `E/amiga-sphere-spin-gesture/p3-keys/key-sheet.png`, `probe.json`
- **Cause:** `demo/scenes/amiga/AmigaScene.vue:165` NUDGE_RAD = π/8 = 22.5°, which equals one tile (`utils.ts:47` tiles=16), so each press is a texture symmetry. `useSphereSpin.ts:263-266` nudge() writes the offset in one step.
- **Fix shape:** Animate the nudge through the same decay() glide (seed velocity so the coast covers exactly one step), or choose a step that is not a multiple of 22.5°.

### KFA-21 · HIGH · The controls panel shows demo-global defaults (5s / alternate / ease-in-out), not the options actually running (Amiga 8000/1600 ms normal, Square 2000 ms normal)
**Surface:** `square-tour`, `amiga-boing-composite`, `amiga-grid-room-backdrop`, `playback-ribbon-visualizer`

- **Observed vs expected:** Square: the panel reads 5s alternate while the tour runs 2000 ms normal (the loop wraps every ~2017 ms and never alternates). Amiga: the panel reads 5s / alternate / ease-in-out on all 3 channel cards while the rail max is 8000 and the engine direction is 'normal'. Edits do reach the animation, so the panel writes but does not read back. This is also the channel that installs the easing clobber in the Amiga compose row. Expected: the panel reflects the live channel from the first frame.
- **Frames + evidence:** `E/square-tour/recon-rest.png`, `panel-probe.json`; `E/amiga-boing-composite/shots/01-playing-fullpage.png`; `E/amiga-grid-room-backdrop/reach-full.png`; `E/playback-ribbon-visualizer/scout-0.png`, `live/raf.json` (wrap at t≈8087)
- **Cause:** `demo/state/animationOptionsStore.ts:42-50, 108-114` (the default table is cloned into missing buckets). `ChannelOptions.vue:66-68` (`?? '5s'`), `:93`, `:157` and `:184` fall back to literals. Square's own options are at `demo/scenes/square/useSquareDemo.ts:494-498`, Amiga's at `useAmigaDemo.ts:47, 235-238`.
- **Fix shape:** One direction of authority: seed the stored entry from `animation.options` the first time a channel is seen (serialise duration, direction, fill, iterations and easing). A channel with per-frame easings shows 'per-keyframe'. Remove the literal fallbacks.

### KFA-22 · HIGH · The home Play gesture freezes the page (0.27-1.5 s), and then the spin jumps ~176° in one frame and keeps jumping
**Surface:** `home-landing-cube`

- **Observed vs expected:** After Play, no frame is presented for 1497 ms under screencast (LoAF without screencast: 265-329 ms, BUTTON.onpointerup). The group clock keeps running through the stall, so `.cube` steps 3.5°, 179.5°, 164.6°, 160.8°, 141.5°, 73.6°, 37.6° before reaching the smooth ~3.8°/frame. The die leaps 5/1/4 → green 2 → 5 diamond → 5/1/4, and the whole ease-in of the first iteration is lost. The bob jumps 0.11→4.02 px as well. Expected: the spin starts from p=0 with the ease-in visible.
- **Frames + evidence:** #29→#30 (1497 ms gap), #33→#34, #37→#39; samples play t=317→1783 · `E/home-landing-cube/samples.json`, `loaf.json`, `sheets/play-00..01.png`
- **Cause:** `demo/app/scene/useSceneMachineShellBinding.ts:246-255` makes home Play a scene switch that remounts CubeScene across the `:key=superKey` boundary. `:206-208` markSceneReady dispatches PLAY inside the remount's long frame. `src/animation/engine/play-lifecycle/frame.ts:99-107` stamps startTime from the first tick, and `:127` charges the stall to the animation.
- **Fix shape:** Keep the home CubeScene instance (register the group on home→cube rather than remounting), or defer PLAY until the first presented frame after SCENE_READY (rAF→rAF). Engine: clamp the first-frame dt, or start the clock at the first presented tick.

### KFA-23 · HIGH · Cold load: a page-wide 1.9-2.5 s main-thread stall (a FrameRequestCallback in glass-ui's useRAFLoop chunk) freezes the cube's attitude settle mid-sweep, which then snaps
**Surface:** `home-landing-cube`, `home-hero-aurora`

- **Observed vs expected:** The `.graph` attitude reads 0°, 18.9°, 21.0°, then no rAF for 2550 ms, then 22.8°, then 30°. The overshoot never shows, and none of the mid-sweep attitudes is ever painted (#4 is flat, #5 is settled). This happened in 2 of 3 cold loads. The aurora seat saw the same stall (1888/2014 ms LoAF in useSelectionGroup-B5XplBbo) freeze all motion. Confirm amended: this is a page-wide stall, not specific to the settle, and it also holds first paint (see found-at-confirm).
- **Frames + evidence:** mount #3→#4→#5; samples mount t=1501→4051 · `E/home-landing-cube/loaf.json` (run0 st=3548 dur=1902), `E/home-hero-aurora/results2.json` rafRunning drops [1983]
- **Cause:** LoAF points at `node_modules/.vite/deps/useSelectionGroup-B5XplBbo-*.js` (glass-ui dist useRAFLoop). The subscriber is inferred to be HeroAurora's first GPU frame (`demo/components/instrument/shell/HeroAurora.vue`, mounted at `App.vue:55-57`), which fits the timing (the aurora appears as the stall clears) but is not proven at the bytes. The settle is a main-thread rAF animation (`demo/scenes/cube/useCubeDemo.ts:129-150, 173`). It may be dev-only; confirm on a production build.
- **Fix shape:** Take a Performance trace and attribute the long task. Move HeroAurora's first render or pipeline compile off the first ~700 ms, or start the settle after the aurora reports ready. Optionally run the single-target settle on WAAPI (useWAAPI:true).

### KFA-24 · HIGH · Direct-hash and back/forward navigation bypass the scene transition entirely
**Surface:** `scene-swap-transition`

- **Observed vs expected:** Changing `location.hash` from #/amiga to #/easing makes 0 viewTransition calls and hard-cuts in one frame. This stays broken after the binding fix, because this path never reaches runSceneSwitch. Expected: every scene-nav entry goes through the transition (`App.vue:353-356`).
- **Frames + evidence:** D-hash-amiga-to-easing f001→002 · `E/scene-swap-transition/D-hash-amiga-to-easing/sheet-00.png`
- **Cause:** `demo/app/scene/useSceneMachineRouterBinding.ts:75-83`: router.afterEach dispatches NAVIGATE directly, not through `useSceneTransition.runSceneSwitch`.
- **Fix shape:** Route the afterEach reconcile through the same VT wrapper (inject runSceneSwitch), or have a single VT-wrapped reconcile point that both the dock and the URL readers use.

### KFA-25 · HIGH · A cold (first-visit) swap shows a blank SceneSkeleton plate and strips the chrome, then hard-pops (and a working VT would cross-fade into that stripped state)
**Surface:** `scene-swap-transition`

- **Observed vs expected:** SHIPPED: an empty skeleton card for ~210 ms (cube→amiga) or ~90 ms (amiga→square). The controls panel, the dock's Controls tab and the transport labels vanish, then the real scene and chrome pop in. COUNTERFACTUAL (VT bound): the page washes out into the stripped state, then hard-pops at VT end. Expected: 'a cross-dissolve, never a blank gap'.
- **Frames + evidence:** A-cube-to-amiga f076-089, f090 pop; A-amiga-to-square f027-033; CF-screencast-cold-amiga-to-square f055-060 (`quad-55-57-59-60.png`)
- **Cause:** `demo/app/App.vue:92-101`: a keyed Suspense remounts and shows its `#fallback <SceneSkeleton/>` while the async chunk (`scenes.ts:104-107`) is pending. `demo/app/transition/useSceneTransition.ts:85-88` wraps only the synchronous key flip. Hover-warm fires too late.
- **Fix shape:** In the VT update callback, await the destination chunk and the Suspense resolve (`viewTransition(async () => { await loader(id); mutate(id); await suspenseResolved(); })`). Warm all scene chunks at idle after first paint.

### KFA-26 · HIGH · (Latent, visible once VT runs) the named scene-subject group paints OVER the open Select popover and chrome during the transition
**Surface:** `scene-swap-transition`

- **Observed vs expected:** Counterfactual warm seek square→amiga: the outgoing 'Transform' heading and the 'SETTLED' badge draw over the still-closing Scene dropdown rows. Expected: overlays stay above the stage throughout, in the same z-order as at rest.
- **Frames + evidence:** CF-seek-warm-square-to-amiga s012; CF-seek-cold-cube-to-amiga s000-023 · `E/scene-swap-transition/CF-seek-*/`
- **Cause:** `demo/app/App.vue:380-381` names only `.scene-host` (`view-transition-name: scene-subject`). Its group renders after ::view-transition-group(root), above every unnamed overlay. The Select is still open at capture (`useSceneTransition.ts:85`).
- **Fix shape:** Give ChromeDock, TransportDock and the popover layer their own view-transition-names (later groups paint above the subject), or add a VT group-order rule. Close the Select before dispatching the VT.

### KFA-27 · HIGH · The skeleton shimmer does not reach the plate for ~1.4 s after mount, so a real cold load shows a static blank plate and is gone before the first sweep
**Surface:** `scene-skeleton-shimmer`

- **Observed vs expected:** Seek f00-f13 (0-1354 ms) is a flat plate, and the band first touches the left edge at f14. Unthrottled cold loads show the fallback for 58-180 ms, static throughout. Fast-3G shows a static plate for ~1.4-1.6 s before the first band. Expected: a sheen that reads as loading from its first painted frame.
- **Frames + evidence:** seek f00-14 (`sheet-seek-00-23.png`); organic/unthrottled s0004-0007; organic/fast3g s0004-0084 · `E/scene-skeleton-shimmer/meta.json` (note: the organic firstBandMs metric is broken; the frames decide)
- **Cause:** glass-ui 7.0.0 `dist/glass-ui.css` `.skeleton::after` animates translate(-110%)→110% with ease-in-out (the band covers only 24-72% of the pseudo). `--duration-shimmer` resolves to 5s (`dist/styles/tokens/scheme-motion.css`; that is the gold-text shimmer token, the producer's own fallback is 2.4s). The consumer mounts it bare (`demo/app/App.skeleton.vue:103-109`).
- **Fix shape:** Producer (relay): give Skeleton its own ~1.4-2 s token, limit travel to the band width, and use a negative delay so the band is on the plate at mount. Consumer interim: a local duration/delay override on `.scene-skeleton__sheen::after`.

### KFA-28 · HIGH · The `steps(4, jump-none)` cadence is baked into linear ramps on the WAAPI lane: the stepped pulse is lost, the curve is lopsided, and full opacity shows for only one instant
**Surface:** `home-typing-dots`

- **Observed vs expected:** Each dot carries 35 linear keyframes: 15 bisection stops converging on 0.125, a second run converging on 0.75, and the rise step at 0.375 never emitted. Measured dot 0: holds and steps correctly at k0-6, then ramps 0.467→0.689 where it should hold, ramps 0.733→0.978, is 1.0 only at k24, then ramps down again. Only 2 of 8 cliffs survive. Budget waste (30 of 35 keyframes redundant) was found at confirm. Expected: a symmetric 4-step march with a 300 ms peak, matching the rAF lane (`TypingDots.vue:152-157`, `engine/interpolate.ts:252-254`).
- **Frames + evidence:** seek f-06..f-47 (`sheet-seek-0.png`, `sheet-seek-1.png`); live sc-009, sc-015..020 · `E/home-typing-dots/probe.json` dotAnims[].kf, `frames.json` measured vs ideal
- **Cause:** `src/animation/waapi/emission.ts:36` `bakeCurve = multiSegment && canDensifyWAAPISlots(animation)` sends numeric multi-segment animations down the bake path with linear keyframes (`:37-39, 72-77`). `src/animation/waapi/densify.ts:45` (16-stop budget) and `:239-318` chord bisection cannot converge on a jump discontinuity. Unchanged at kf HEAD.
- **Fix shape:** Never bake a step or other discontinuous easing. When the easing's `css` twin is exact (steps(…)), emit the boundary keyframes with `keyframe.easing = timingFunction.css` (the structural arm that already exists). Add a regression test comparing WAAPI steps(4,jump-none) samples to the rAF lane.

### KFA-29 · HIGH · The drag pose is applied twice after Play: both the OrbitalDrag container and the Matrix channel on `.cube-pose` carry the same rotation
**Surface:** `cube-group-spin-matrix-bob`

- **Observed vs expected:** Reset, drag at rest (faces 1 and 2 showing), Play, then Pause at the leg end (spin ≈ identity). The container reads rotate3d(-0.447, 0.894, 0, 277.75°) and `.cube-pose` holds the same matrix3d, so the die sits at R_drag² showing faces 2 and 3. Expected: the dragged pose is applied once, and bob · pose · spin each compose their own contribution.
- **Frames + evidence:** `E/cube-group-spin-matrix-bob/interact/20-rest-after-drag.png` vs `21-paused-near-leg-end.png`; `double-pose.json` pausedNearLegEnd; `sheet-snap-00..03`
- **Cause:** `demo/scenes/cube/matrix-editor/useTransformState.ts:180-222` composes matrix3dEnd from the drag's T·R·S at rest. `useCubeDemo.ts:50-64, 161` puts it on `.cube-pose`. Once the group has started, `CubeTarget.vue:15` makes `OrbitalDrag.vue:65-77` render the same rotation on its container.
- **Fix shape:** Give the drag rotation one owner: do not fold the orbit into matrix3dEnd (the container keeps the orbit), or hand it to the Matrix endpoint at start and zero the container. Witness: at the leg end, container·pose·spin equals the rest pose.

### KFA-30 · HIGH · The die squashes non-rigidly to ~5% width: matrix3d is interpolated cell by cell instead of decomposed, and it stays squashed at rest
**Surface:** `cube-orbital-drag-inertia`

- **Observed vs expected:** The `.cube-pose` inline matrix is not orthonormal. Its column norm falls to 0.80, 0.254 and at minimum 0.051 (recomputed at confirm: 0.0506 at sample 809). The values match a per-cell lerp exactly, and the die collapses into a thin slab. Confirm amended: the squash stays on screen with no gesture active (C-pauseclick f481-494: a ~30%-width slab for 14+ frames), because the Matrix playhead is still partway to a displaced endpoint. Expected: rigid rotation (CSS decompose, then slerp, then recompose).
- **Frames + evidence:** run3 f732-743, f726-731, f86/89/91, f481-494; samples 440-520, 784-888 · `E/cube-orbital-drag-inertia/samples.json`
- **Cause:** `demo/scenes/cube/useCubeDemo.ts:50-56` compiles the Matrix channel via fromVars of two matrix3d endpoints. keyframes.js `src/` has no matrix-aware interpolation (grep finds only `emit/format/format.ts:127` and `emit/backward/backward.ts:19`). value.js `src/transform/decompose.ts` exists but is not used on this path.
- **Fix shape:** In function-value interpolation, send matrix()/matrix3d() and mismatched transform lists through value.js decompose, slerp and recompose (as the CSS Transforms spec requires). Removing drag→endpoint (the orbit-layer BROKEN row) takes this off the orbit surface.

### KFA-31 · HIGH · Re-lighting is frozen during playback and on the transport: `--lit` reads only the orbit model, so the spin, roll and pose channels never re-light the faces (the light turns with the die)
**Surface:** `cube-relit-faces`, `cube-group-spin-matrix-bob`

- **Observed vs expected:** Live playback: 1 distinct `--lit` tuple across 24 frames, while the geometry-implied lit changes on 23 of them (error up to 0.85). At A16 the top face hangs at the bottom facing away (true 0.22) yet is painted brightest at 0.91 with its specular. Pause and scrub move the die but not the light (T0-T6). The cube-group seat saw byte-identical `--lit` across rotateX 251°→360°. The math is right: with the missing inner transforms excluded, inline equals geometric exactly. Expected: 'the light is PINNED in the room; the cube turns under it' (`useCubeRelit.ts:10-11`).
- **Frames + evidence:** A0-A23 (A16 worst), T0-T6, D0-D47 · `E/cube-relit-faces/capture-log.json`, `capture2-log.json`, `sheet-A-playback-0.png`; `E/cube-group-spin-matrix-bob/interact/probe.json` litDuringPlay
- **Cause:** `demo/scenes/cube/useCubeRelit.ts:167-171` computes faceLit from `transform.value.rotate` (OrbitalDrag) plus GRAPH_ATTITUDE only. `CubeTarget.vue:211` wires only that input.
- **Fix shape:** Feed the full composed orientation (graph · orbit · pose · spin · roll) into litFor on the group's own tick, from the channels' interpolated values or the composed element matrices. One writer, no second rAF. Scrub then re-lights for free.

### KFA-32 · HIGH · In the default light theme the re-light is null and inverted: the shadow veil mixes near-white `--background`, so faces turned away get washed out, not darkened
**Surface:** `cube-relit-faces`

- **Observed vs expected:** Forcing `--lit` 0→1 on one face gives light-theme luminance 166/166/166/171/162 (flat, and lit=1 comes out darker than lit=0). The dark theme is monotone 28→56. Expected: luminance rises monotonically with `--lit` in both themes.
- **Frames + evidence:** `E/cube-relit-faces/sheet-veil-veilLight.png` vs `sheet-veil-veilDark.png`; P24-P47
- **Cause:** `demo/scenes/cube/CubeTarget.css:200-205`: the veil is `color-mix(in srgb, var(--background) …, transparent)`. This is already declared and still uncured at `:171-190` (KF.W6 #8, waiting on a register member).
- **Fix shape:** Add one material-register member that is dark in both themes and route the veil (plus the lacquer shade stop and the amiga ground stop) through it.

### KFA-33 · HIGH · The orbit container stalls during a horizontal (yaw) drag while `--lit` keeps changing, then snaps ~88°: the light and the die come apart
**Surface:** `cube-relit-faces`

- **Observed vs expected:** Paused horizontal drag: the container holds rotate3d(0,1,0,2.67°) for P0-P10 while `--lit` changes. At P11 it snaps to 90.9°, then freezes again through P23. Vertical drags are smooth. Expected: continuous turning, with lighting that follows the die every frame.
- **Frames + evidence:** P0-P10 frozen, P11 snap, P12-P23 frozen · `E/cube-relit-faces/sheet-P-drag-paused-0.png`, `capture-log.json` orbitStyle
- **Cause:** `demo/scenes/cube/orbital-drag/OrbitalDrag.vue:70`: containerStyle's only rotation dependency is `void model.value.rotate.x`, and currentQuaternion (`:82`) is not reactive. A pure yaw changes rotate.y and rotate.z but leaves x at 0 until the Euler decomposition flips.
- **Fix shape:** Depend on rotate.x, rotate.y and rotate.z, or bump a reactive version counter in syncRotationToModel.

### KFA-34 · HIGH · On a diagonal drag the squash axis flips back and forth frame to frame (the box's width pops ~35 px per flip)
**Surface:** `square-drag-spring-tether`

- **Observed vs expected:** The scale alternates between (1.172, 0.971) and (0.971, 1.184), with 6-9 axis flips per gesture. The box alternates between a tall and a wide rhombus. The magnitude saturates at SQUASH_CAP 0.1 at |v| ≥ 2.86 u/s, so every flip is the maximum. Expected: a smooth squash along the direction of travel.
- **Frames + evidence:** rec 26/27, 33/34, 41/42, 47/48, 54/55; screencast f11-f22, f27-28, f34-35 · `E/square-drag-spring-tether/rec.json`, `sheet-00.png`
- **Cause:** `demo/scenes/square/useSquareDemo.ts:308` uses a hard boolean `xDominant = |vx| >= |vy|`, and `:316-318` applies ±sqMag. On a diagonal, float noise decides the axis each frame.
- **Fix shape:** Squash along the velocity vector (rotate(θ) scale(1+s,1-s) rotate(-θ)), or weight by vx²/|v|², and low-pass the magnitude.

### KFA-35 · HIGH · Resuming re-seeds the sweep clock from the eased VALUE as if it were the PHASE, so every Play after a pause or scrub snaps the balls
**Surface:** `easing-gallery-race`

- **Observed vs expected:** Paused at 19.62/46 on the up-leg → resumes at 39.58 (predicted 39.2). Paused at 36.39 on the down-leg → resumes at 18.86. From the end (p=1), Play teleports every ball from the terminus to the origin. The dock Play does the same. Expected: resume continues from the paused position and direction.
- **Frames + evidence:** D#0→D#1 · `E/easing-gallery-race/resume.json`, `08-paused-*.png` vs `08-resumed-*.png`
- **Cause:** `demo/scenes/easing/useEasingDemo.ts:238`: `startTime = now - livePhaseValue * duration * 2`. livePhaseValue is the triangle output `p`, not the phase (`:214-215`).
- **Fix shape:** Keep the raw phase and rebase from it. When only p is known, invert the triangle using the last direction (phase = p/2 on the up-leg, 1 - p/2 on the down-leg).

### KFA-36 · HIGH · Closing detail→main collapses the whole card to a 28 px sliver at t=0, then regrows it
**Surface:** `easing-picker-curve`

- **Observed vs expected:** At close t=0 all three rows measure 0 and the card snaps 341→28 px. The main row then grows back to 392 over 300 ms. The detail row's fade runs on an already-empty row. Expected: a crossfade that mirrors the (smooth) open.
- **Frames + evidence:** panel-close f000 (cardH 28), f001-047 · `E/easing-picker-curve/sheets/panel-close-000-023.png`, `panel-close-024-047.png`
- **Cause:** `demo/components/instrument/transport/channel-controls/ChannelOptions.vue:565` (at kf 3c8199c5): `<TimingFunctionPanel v-if="showDetailPanel">` unmounts on the same tick the row class flips (`:550-554`), so the collapsing row has no content left to collapse.
- **Fix shape:** Keep the panel mounted through the exit: clear a local detailMounted flag on the row's grid-template-rows transitionend, or give it a `<Transition>` leave.

### KFA-37 · HIGH · Dragging a handle past y∈[0,1] re-fits the viewBox mid-gesture: the whole plot slides ~12 px under the hand and the handle drifts off the pointer
**Surface:** `easing-picker-curve`

- **Observed vs expected:** The viewBox grows every frame ('0 -0.121 1 1.221' up to '0 -0.7 1 1.8'), so the endpoints, grid and the undragged handle slide down ~12.4 px on a 49 px plot and then jump back up. The dragged handle lags the pointer 0.87-2.2 px outside [0,1]. rAF is clean, so this is motion design, not dropped frames. Expected: the frame stays still while a handle is held.
- **Frames + evidence:** drag f000-016, f028-034, live s000-104 · `E/easing-picker-curve/sheets/drag-000-023.png`, `meta.json` parts.A.frames[].vb/err
- **Cause:** glass-ui 7.0.0 `dist/easing.js:67-79` computes the viewBox extent from the live handle y values. It is bound at `:309`, and pointer mapping re-reads getScreenCTM on every move (`:219, 245-248`).
- **Fix shape:** Producer (relay): freeze the viewBox while a handle is captured and re-fit on pointerup with an eased tween, or use a static viewBox over the whole authoring domain.

### KFA-38 · HIGH · The spring page loads falsely 'tracking': the ball sits at 0 and the target at 1, nothing moves, and the first Play or facet write launches the stale chase (only once)
**Surface:** `spring-live-solver`, `spring-physics-facet`

- **Observed vs expected:** Fresh load: the badge reads TRACKING with x 0.000 while the dashed target sits at value 1, and will-change stays on. Nothing moves for the whole rest window. The dock's Sweep Play then launches the live ball 0→1. The physics seat saw the first heatmap click send the live ball to 1.309 and all four preset balls 25.9→130 px, while later writes moved nothing. Expected: an honest rest (settled at the target) or a deliberate entry spring. The Sweep's Play should never release the rail solver.
- **Frames + evidence:** A-rest rows 0-99, `00-fresh-load.png`; F2-play-pill #1-23; physics A_heatmap_click f000-031, E2_play f000-023 · `E/spring-live-solver/A-rest/probe.json`; `E/spring-physics-facet/A_heatmap_click/`
- **Cause:** `demo/scenes/spring/useSpringDemo.ts:107, 116, 127` set target 1 with initial 0 (`:40-45`). `:238` chaseIntent is born false, so the mount loop returns and the solver is left unsettled. `useSpringHotPath.ts:57` liveSettled starts as ref(false). The playing branch ticks the field (`:256-295`), and `reset()` (`:492-517`) rebuilds the same state.
- **Fix shape:** Construct the solvers settled (initial = target), or set chaseIntent before the mount loop if an entry spring is wanted. Initialise liveSettled from the solver. Make heatmap and preset writes an explicit reseat. Keep tickField out of the sweep-only Play.

### KFA-39 · HIGH · Dock Reset (and R / Escape) is a dead control on the spring scene: the machine's RESET has no effect arm
**Surface:** `spring-live-solver`

- **Observed vs expected:** Pressing Reset after a settle changes nothing (ball, marker and badge are constant for 1.5 s). The click does land (press feedback runs). During playback, Reset only drops status to paused. Expected: the whole field rewinds to its born state and the sweep phase goes to 0.
- **Frames + evidence:** N-reset-pill #0-14 · `E/spring-live-solver/N-reset-pill/`, probe rows 0-100
- **Cause:** `demo/state/useSceneMachine.ts:217-249` applyEffects switches only on SCENE_READY/PLAY/PAUSE/RESUME. The RESET reducer (`demo/state/sceneMachine.ts:190-199`) only writes state. The code itself says `useSpringDemo.ts:492 reset` is unreachable (KF-SS-2 at `:476-491`).
- **Fix shape:** Add `case "RESET": adapter?.reset?.()` in demo/state and a `reset` member on ScenePlayback that useSweepScene forwards. Fix it once, not with a watcher per scene.

### KFA-40 · HIGH · Derby lane tags wrap to two lines and print over the next lane's tag, so they cannot be read
**Surface:** `spring-derby-egg`

- **Observed vs expected:** 'smooth · ζ0.86' wraps inside its 100 px gutter, so 'ζ0.86' prints over 'snappy', 'ζ0.65' over 'bouncy', and so on. Only 'smooth ·' and the final 'ζ1.00' can be read, for the whole race. Expected: four single-line labels.
- **Frames + evidence:** runA f010-139 (and runB/runC) · `E/spring-derby-egg/runA/zoom-f060-tags.png`
- **Cause:** `demo/scenes/spring/SpringTarget.vue:849-853` (the tag width is the gutter, with no nowrap), `:812` (gutter 6.25rem), `:804` (lane height 0.9rem).
- **Fix shape:** `white-space:nowrap`, and size the gutter to the longest label (~7.5-8rem), or split the name and ζ into columns. Re-check the gutter invariant.

### KFA-41 · HIGH · Derby lanes use a different value axis from the rail: every finish and rest sits ~87 px left of the target line
**Surface:** `spring-derby-egg`

- **Observed vs expected:** At value 1 the lane balls are centred at x≈1146 while the live ball and the dashed value-1 line are at ≈1232. At rest (0.5) they sit at ≈907 against 957. No target line is drawn in the lanes, the bouncy peak never crosses the only visible target, and the dimmed live ball rests under the tag column. Expected: one axis, where bouncy rings past the shared target and gentle never crosses it (`useSpringDerby.ts:36-37`).
- **Frames + evidence:** runA f048-100, f120-139; sampler #60/#102 · `E/spring-derby-egg/runA/zoom-f060-lanes.png`, `run*/samples.json`
- **Cause:** `demo/scenes/spring/SpringTarget.vue:790-800` (lanes span the full rail), `:812-813` (the gutter padding makes each lane container 648 px against the rail's 682→1232 track), `:414-416` (the painter uses cqw per lane).
- **Fix shape:** Put the lane value track on the rail's own geometry (tags outside the rail box, or reuse `.spring-track`'s inset), and draw a value-1 tick across the lanes.

### KFA-42 · HIGH · Each tap of the double-click re-seats the field first, so the derby starts mid-flight and 'restores' to the tapped spot
**Surface:** `spring-derby-egg`

- **Observed vs expected:** Tapping the rail middle: at lane mount the balls are already spread (0.34/0.45/0.40/0.26) and drifting toward 0.5, so the 110 ms cascade never reads as a wave from a common start. At settle the field returns to 0.5 (the tapped value), not the pre-gesture 1.0. Expected: a round trip back to the pre-gesture pose (i-18).
- **Frames + evidence:** runA f010-030, f120-174, `rest-after.png`; runB f024-033 (clean contrast) · `E/spring-derby-egg/runA/samples.json`
- **Cause:** `demo/scenes/spring/SpringTarget.vue:455-468` (useDragScrub onScrub → reseat on every pointerdown), before `:468-473` (useDoubleTap → derby). `useSpringDemo.ts:441-444` captures preDerbyTarget after the taps. KF-SCR-1 is named at `:414-418` and not worked.
- **Fix shape:** Defer the scrub's reseat until the double-tap window closes or the pointer moves past tolerance, or snapshot the target at the first pointerdown and restore it.

### KFA-43 · HIGH · The Sweep channel's 'Spring Keyframes' editor animation drives nothing: no target, no playhead, and edits never reach the screen
**Surface:** `spring-physics-facet`

- **Observed vs expected:** While the Sweep plays: `document.getAnimations()` is [] and the editor section gets 0 mutations. The visible sweep is a separate NumericAnimation (samplerAnim), so typed stop edits change nothing on screen, and the declared `direction:'alternate'` is dead (the clock is a phase%1 sawtooth). Expected: the editable @keyframes drives the visible sweep and shows its progress.
- **Frames + evidence:** E2_play f000-136 (sheet-E2_play-0..5), G2_scrub f000-025 · `E/spring-physics-facet/meta-transport.json` (editorMutationsDuringPlay 0)
- **Cause:** `demo/scenes/spring/useSpringKeyframesEditor.ts:57-64` constructs a CSSKeyframesAnimation with no target. `useSpringDemo.ts:250/303/367` only write `.t`. The painted sweep is samplerAnim (`:184-194, 292`).
- **Fix shape:** Give the editor animation a real target (the stage sweep ball or a facet preview) and drop the parallel sampler, or bind the channel to what is actually painted. Paint a playhead or active stop from channel progress.

### KFA-44 · HIGH · Transport Reverse is a no-op on the Sweep: the button toggles pressed, but the sweep and the thumb keep running forward
**Surface:** `spring-physics-facet`

- **Observed vs expected:** aria-pressed becomes true, and the scrubber keeps rising 539→722 in steps of ~16.7. Expected: the playhead runs backwards while Reverse is pressed.
- **Frames + evidence:** E2_play rafLog rows rev=1 · `E/spring-physics-facet/meta-transport.json` scrubBeforeReverse/After
- **Cause:** `demo/scenes/spring/SpringScene.vue:154-157` writes only `springEditAnim.reversed` (which paints nothing). `useSpringDemo.ts:291` builds phase with no reversed term.
- **Fix shape:** Carry a reversed flag into the frame clock (phase = reversed ? 1-p : p, rebasing startTime on toggle), or derive the phase from a real animation whose reversed flag the ribbon owns.

### KFA-45 · HIGH · The @starting-style entry spring runs 4× too fast: the whole entry or exit happens in ~100 ms, the rest of the 500 ms is flat, and the exit leaves a 390 ms invisible tail
**Surface:** `spring-starting-style-entry`

- **Observed vs expected:** Entry: opacity 0→0.976 and scale 0.9→0.998 by f08 (85 ms), static from f10 to f47. Live screencast: pixels change in only 7 consecutive frames per transition. Exit: invisible from 106 ms but `display:flex` until 500 ms. The emitted linear() reaches 0.99893 at 20%. Expected: motion across the spring's real settle (~400-500 ms at response 0.5 s).
- **Frames + evidence:** A f00-f10 (motion) / f10-47 (static); B f10-47; screencast s062-068, s014-021 · `E/spring-starting-style-entry/sheet-A-mount-entry-0.png`, `capture.json`, `02-entry-selected.png`
- **Cause:** `src/animation/physics/spring/css/linear-stops.ts:49` samples over `response*4` (2000 ms), while `demo/scenes/spring/StartingStyleTarget.vue:291-294` (500ms), `:156` (ENTRY_CONTRACT.durationMs 500) and `useCompiledEntry.ts:55` (duration 500) play those stops in 500 ms. The in-file note at `:109-117` names this 'priced fork'.
- **Fix shape:** Make the duration equal the sampling window in all three places together (duration = response·4), or sample over the real settle time and use that as the duration. Optionally give the exit its own non-overshooting curve.

### KFA-46 · HIGH · The Entry channel is not wired to the transport: Play, Pause, Reset and scrub never touch the card
**Surface:** `spring-starting-style-entry`

- **Observed vs expected:** With Entry selected, the card's computed style holds one value across both dock clicks and Reset. The only thing that moves the card is Reveal/Dismiss. Expected: the transport drives the entry, or it is not presented as controlling this view.
- **Frames + evidence:** `E/spring-starting-style-entry/R-out.json` transport.cardWhile1/cardWhile2/cardAfterReset, `R-transport-after-click1.png`
- **Cause:** `demo/scenes/spring/useCompiledEntry.ts:53-60` constructs a CSSKeyframesAnimation with no target (the constructor takes targets, `src/animation/engine/css/animation.ts:48`). `useSpringDemo.ts:566-570, 594-597` write a clock that paints nothing. The card moves only through the `.is-open` CSS transition (`StartingStyleTarget.vue:40, 290-309`).
- **Fix shape:** Bind the `.discrete-card` element and drive it from entryAnim.t (pausing the CSS transition while the transport controls it), or declare Entry non-transportable and hide Play/Reset/scrub for it.

### KFA-47 · HIGH · The sequence spring runs separately on each keyframe segment: every row (and every reel ball) dashes, stalls ~450 ms at the 70% stop, then snaps
**Surface:** `sequence-staggered-rows`, `sequence-reel-egg`

- **Observed vs expected:** Row 1: p 0→0.74 in ~80 ms (up to 138 px in one frame), recoil to 0.695, freeze at exactly 0.700 for ~450 ms, then 0.70→1.0 in about 2 frames (83 px/frame). All rows show it at their stagger, and every reel run shows the same two-hop jolt with a ~390 ms stall. Scale also overshoots (1.144-1.154) and shrinks back while it is still 'popping', which adds horizontal wobble through the S·T composition (found at confirm). Expected: one spring-eased glide 0→1 with a single settle pop.
- **Frames + evidence:** rows seek#1-16, live#1-41, rAF samples 5-44; reel A#4-55, B#8-50 · `E/sequence-staggered-rows/capture-log.json`; `E/sequence-reel-egg/samples.json`, `sheets/A-button-00..02`
- **Cause:** `demo/scenes/sequence/useSequenceDemo.ts:150-165` authors a 3-stop glide (0/70/100%) under one spring timing function. The engine eases each keyframe interval (`src/animation/engine/interpolate.ts:252-254`; `option-setters.ts:62-65` bakes the reel's `setTimingFunction(reelOvershoot)` at `useSequenceDemo.ts:444` into every frame). The spring settles in ~25% of its sampling domain (`physics/spring/css/timing-function.ts:70`).
- **Fix shape:** Author `--ball-p` as one 0%→100% segment carrying the spring. Move the opacity fade and scale pop to their own keyframes with their own easing. Do not change the engine's per-interval semantics.

### KFA-48 · HIGH · The reel overshoot throws each ball past the rail end, through the stage border, where the card edge slices it off
**Surface:** `sequence-reel-egg`

- **Observed vs expected:** On the first overshoot each ball reaches p≈0.91 at scale ~1.22 with its centre at x≈1066-1116, past the rail end (1038), the stage border (1055) and the card clip (1072). Ball 1 is cut in half, then only a glow sliver remains. Every ball does this, and the second hop also crosses the rail end. Expected: a bounded bounce inside the stage.
- **Frames + evidence:** A#7-11, A#19, A#24, A#30; C#5, C#9 · `E/sequence-reel-egg/sheets/A-edge-clip-f6-f9.png`
- **Cause:** The scale×translate compounding (the BROKEN sequence row, `SequenceTarget.css:239`) plus the under-damped reel spring (`demo/scenes/sequence/useSequenceDemo.ts:414-417`, dampingFraction 0.34). The clip is `.glass-resting.card`'s overflow:hidden and contain:paint.
- **Fix shape:** First cure the composition (use the `translate` property). Then reserve overshoot room inside `.seq-track` (inline-end padding of at least max overshoot × rail) or clamp the visual overshoot. Do not rely on the card clip.

### KFA-49 · HIGH · The master playhead that fades in last lands in the ruler strip, over the '0' label, and never crosses the rows
**Surface:** `sequence-power-on-cascade`

- **Observed vs expected:** `.seq-playhead-track` is at y=312.58, h=24, which is exactly the `.seq-axis` box. The rows block starts at y=344.58. The diamond sits on the ruler's '0' tick label. Expected: the playhead spans the rows block, with its head rising only 3 px into the row gap, 'never into the ruler's strip' (`SequencePlayhead.vue:36-43`).
- **Frames + evidence:** B-seeked s29-s47; A-crop f050-068 · `E/sequence-power-on-cascade/sheets/zoom-playhead-head-rest.png`, `probe-rects.mjs` output
- **Cause:** `demo/scenes/sequence/SequencePlayhead.vue:48` `grid-row: 2 / -1`. `.seq-stage` (`SequenceTarget.css:61-90, 72`) declares only columns, so -1 resolves to line 1 and the span becomes 1/2 (the ruler row).
- **Fix shape:** `grid-row: 2 / span 1`, or give `.seq-stage` an explicit `grid-template-rows: auto 1fr`. Then check the 3 px rise and the track's 576 vs 560 px width (see the playhead-track-width row).

### KFA-50 · HIGH · Dock morph crossfade is layered wrongly: on every collapse, the leaving row wraps into a vertical column that spills ~150 px below the capsule while the summary glyph double-exposes over the label ('H⌂me', 'C[glyph]be')
**Surface:** `chrome-dock-expand-collapse`, `chrome-dock-menus`, `transport-dock`

- **Observed vs expected:** When a collapse starts, the leaving full layer reflows one control per line (Cube/Home, Controls, toggle, @mbabb, Share…) and hangs up to y≈252 below a 56 px plate while it fades. The summary glyph paints at full opacity over the label. This happens after every menu, popover or dialog close too, and plays behind the shortcuts modal. The transport dock has the related crossfade faults: on collapse, the Select, separators and Reset vanish at once and two Play buttons superimpose for ~8 frames; on expand, the leaving summary jumps ~103 px left and draws outside the plate. Expected: one face dissolves into the other inside the glass.
- **Frames + evidence:** chrome-dock rt #325-334, #743-752 (sheets col1a/b, col2a/b); menus live-dock/C s153-162, live-hold/shortcuts-modal s159-171; transport step collapse #00-08 (`zoom-collapse-a.png`), expand #00-07 (`zoom-expand-a.png`), rt #556-561, #650-659 · `E/chrome-dock-expand-collapse/rt-log.json`; `E/chrome-dock-menus/live-dock.json`; `E/transport-dock/step-meta.json`
- **Cause:** glass-ui 7.0.0 `dist/components/dock/styles/overflow.css` `.dock-overflow-wrap .dock-layer--full { flex-wrap: wrap }` has no leaving/collapsed guard (the only collapsed rule is white-space:nowrap). `layers.css:1` puts the non-active layer at absolute inset:0 (re-boxed into the summary square) and `.is-leaving` keeps it visible. `morph.css:1` centres a square summary. Nothing clips the layers to the live plate while morphing. Consumers: `demo/app/dock/ChromeDock.vue:415-418`, `TransportDock.vue:29`.
- **Fix shape:** Producer (relay to BH): freeze the leaving layer at its last measured box (`.is-leaving { flex-wrap:nowrap; inset:auto; width:var(--dock-expanded-px) }`), anchored to the same edge. Clip both layers to the live plate while morphing. Start the summary glyph's onset only after the row has faded.

### KFA-51 · HIGH · Every expand morph wraps the last control to a second row (a 0.5 px under-measure), then snaps back at settle
**Surface:** `chrome-dock-expand-collapse`

- **Observed vs expected:** epx is 536px but the true row is 536.5px, so for the whole expand the dock is 100 px tall with the Theme toggle alone on row 2 and row 1 shifted ~23 px right. At settle, in one frame, the height goes 100→56 and the row slides left.
- **Frames + evidence:** rt #470-501 (sheets exp2a-c), snap #501→#502; seek expand-00..47 · `E/chrome-dock-expand-collapse/rt-log.json`
- **Cause:** glass-ui `dist/dock.js:466-476` measures with offsetWidth (integer-rounded). `layers.css` pins inline-size to that value, and `overflow.css` flex-wrap wraps the overflowing item.
- **Fix shape:** Measure with getBoundingClientRect().width and ceil it, or use `flex-wrap:nowrap` on `.dock-layer--full` while `[data-morphing]`.

### KFA-52 · HIGH · The staggered child reveal is swallowed by the controls' own opacity/scale CSS transitions (the two are applied on top of each other)
**Surface:** `chrome-dock-expand-collapse`

- **Observed vs expected:** During a real-time expand every child's computed opacity stays ≥0.96, while the intended `--child-reveal` is 0.09 at t=0.05. All controls pop in at full opacity together. 14-17 CSSTransitions run inside the dock on every morph frame. The converged seek shows the intended per-onset reveal, so the CSS ladder is correct and the runtime defeats it.
- **Frames + evidence:** rt #44-60, #471-490 (#45, #472 first appearance); seek expand-00..23 · `E/chrome-dock-expand-collapse/rt-log.json` rows 47-60, `sheets/seek-expand-0.png`
- **Cause:** glass-ui `dist/components/dock/styles/controls/triggers.css:1` and `controls/icon-button.css:2` transition scale and opacity (0.35 s / 0.2 s) on the same properties that `layers.css`' `[data-morphing] .dock-layer.is-active > * { opacity: var(--child-reveal) }` drives every frame. Each rAF write retargets a transition that starts from ~1.
- **Fix shape:** Producer (relay): `.glass-dock[data-morphing] .dock-layer > * { transition-property: background-color, color, box-shadow }` so the spring is the only writer of opacity and scale.

### KFA-53 · HIGH · The dock morph blurs the whole dock and holds the blur through the settle tail; the collapse end pose is a squared, soft rectangle that snaps to a sharp circle
**Surface:** `chrome-dock-expand-collapse`, `transport-dock`

- **Observed vs expected:** On every collapse's ~300 ms settle tail the collapsed pill sits at blur(1.25px), with near-square corners and a soft glyph, then snaps to a crisp round pill in one frame (chrome #353→#354). The transport dock does the same at step #29→#30, and text is soft through the morph. This is the owner's "blurry, janky". Confirm also noted that the expand-start blur smears controls that are already fully opaque (see the stagger row).
- **Frames + evidence:** chrome rt #335-353, #771-772 (sheets col1b/c, col2c); transport step collapse #06-#30 (`zoom-collapse-end.png`), expand #01-04 · `E/chrome-dock-expand-collapse/rt-log.json` rows 341-358; `E/transport-dock/sheets/`
- **Cause:** glass-ui `dist/components/dock/styles/morph.css` `[data-morphing] { filter: blur(calc(var(--dock-reveal-blur) * clamp(0,(0.5 - var(--dock-expand-t))/0.5,1))) }` is at maximum at t=0 (the collapsed endpoint). It is held until the spring's onSettle drops data-morphing (`dist/dock.js:417-446`). `shape.css` `scale: var(--dock-size-scale) 1` (non-uniform x scale 0.112) squashes the 28 px radius into ~3 px.
- **Fix shape:** Producer (relay): make the blur zero at both endpoints (∝ sin(πt) or velocity) or drop it. Clear data-morphing when |1-t| < ε. Morph the real inline-size (or clip-path inset with a radius) instead of scaleX, or counter-correct the radius.

### KFA-54 · HIGH · The transport dock collapses under an open animation Select; the dropdown jumps ~107 px and floats over a collapsed pill
**Surface:** `transport-dock`

- **Observed vs expected:** With the Select open (listbox x 658), the dock idle-collapses ~5.7 s later. The listbox jumps to x 765, then 757, and floats detached. Expected: an open Select holds the dock open, as ChromeDock does.
- **Frames + evidence:** psel #21→#22 (`sheets/psel-00.png`) · `E/transport-dock/drift-log.json` t=4744 / 10443 / 11448, `drift/d*.png`
- **Cause:** `demo/components/instrument/transport/TransportDock.vue:79-86` does not bind the Select's open state to the dock's keepOpen/release. ChromeDock does exactly this at `demo/app/dock/ChromeDock.vue:384-389` (RR-2 MISSED #1).
- **Fix shape:** `@update:open="o => o ? dockRef?.keepOpen() : dockRef?.release()"`, mirroring ChromeDock. Hold only; never call expand().

### KFA-55 · HIGH · The timeline is not wired to the transport: Play, Pause and Space never move the playhead or the preview
**Surface:** `timeline-panel`

- **Observed vs expected:** With a VALID imported animation, four play-state phases each give 30 samples with one distinct playhead value (0%) and one preview value. The engine reports paused:true throughout. The snapshot path is also static (E-play 24 frames). Expected: the caret tracks during play (inventory), or the timeline offers its own play.
- **Frames + evidence:** E-play f000-023 · `E/timeline-panel/capture-import-log.json` I2_state0/click1/click2/space
- **Cause:** `demo/components/instrument/timeline/composables/useTimelineBuild.ts:161-168`: scrub is the only driver and forces `paused = true`. Nothing binds scrubT to the scene or group clock.
- **Fix shape:** Bind the timeline engine to the transport: on play, run the built animation and mirror its t into scrubT on one rAF owner; on pause, stop. Or bind scrubT to the group clock.

### KFA-56 · HIGH · Expand teleports ALL THREE channel timelines into `#timeline-expanded-target` (1581 px of content in a 540 px overflow-hidden cell)
**Surface:** `timeline-panel`

- **Observed vs expected:** After Expand the cell holds 3 wrappers and 3 tracks, with scrollHeight 1581 against a 540 px max-height. Timelines 2 and 3 are unreachable, and the first one's editor is cut off. Three 'enter' animations start at the same timestamp. Collapsed, the hidden instances still mount 3 cube clones and 3 engines.
- **Frames + evidence:** H-expand f006-065 · `E/timeline-panel/H-expanded-full.png`, probe7 output, `capture-log.json` H_expand_anims
- **Cause:** `demo/components/instrument/transport/channel-controls/ChannelControls.vue:167-170` (at kf cd2cd88f): a Teleport per channel under `v-if="isTimelineVisible"`, which is scene-level (`:341`, keyed by SceneId, `controlOptionsStore.ts:80`) and ignores the `active` prop. The inactive channels are hidden only by v-show (`ControlsPaneWrapper.vue:54`), which a Teleport escapes.
- **Fix shape:** `v-if="active && isTimelineVisible"` (or `:disabled="!active || !expanded"`), so one KeyframeTimeline, one clone and one engine are mounted.

### KFA-57 · HIGH · The expanded timeline cell overlaps the controls pane: the ribbon (Snapshot/Import/Export) shows through the translucent wash under the timeline header
**Surface:** `timeline-panel`

- **Observed vs expected:** The expanded cell spans y 306-846 (z-dock, glass-wash alpha 0.33, 1 px blur) over the ribbon card at y 291-395, so two control rows are superimposed. The cell sits mid-screen in the rail column, not as a bottom bar. Expected: its own band below the rail, with no interleaving.
- **Frames + evidence:** H-expand f012-065, H-collapse f000-011 · `E/timeline-panel/H-expanded-full.png`
- **Cause:** `demo/components/instrument/transport/AnimationControlsGroup.vue:93-101`: the cell takes `--panel-max-h` in the bottom row while the pane content (`ControlsPaneWrapper.vue:161`, row-start-1) overflows downward into it. The translucent wash composites both.
- **Fix shape:** When expanded, make the rail row yield (collapse or scroll the pane body), or cap the cell to the space below the pane's content. Give the cell an opaque or legible surface.

### KFA-58 · HIGH · Switching the tab Controls → Timeline destroys the user's keyframes (the state lives in the unmounted component)
**Surface:** `timeline-panel`

- **Observed vs expected:** After importing 2 keyframes, a round trip to the Controls tab shows 'No keyframes yet', with the diamonds, the built animation and the undo history gone.
- **Frames + evidence:** A2-reenter f017-059 vs `I0-after-import-pane.png` · `E/timeline-panel/sheet-A2-reenter-00..02.png`
- **Cause:** `ChannelControls.vue:169-170` (kf cd2cd88f): `v-if` plus `:key` unmount KeyframeTimeline. `demo/components/instrument/timeline/composables/useTimeline.ts:22` keeps its state component-local.
- **Fix shape:** Hoist timeline state and history into a per-scene/per-channel store, or keep the component alive (KeepAlive or content-visibility gating).

### KFA-59 · HIGH · The diamond hover preview always fails: html2canvas 1.4.1 cannot parse CSS `color()`
**Surface:** `timeline-panel`

- **Observed vs expected:** Hovering any diamond shows 'Preview unavailable — Attempting to parse an unsupported color function "color"' with an empty box, even with a valid animation.
- **Frames + evidence:** `E/timeline-panel/G-hover-diamond.png`, `G-hover-diamond-valid-anim.png`
- **Cause:** `demo/components/instrument/timeline/composables/useTimelineBuild.ts:213-240` (`scrubAndCapture` → html2canvas, `package.json:94` ^1.4.1, which has no Color 4 parser).
- **Fix shape:** Replace the rasterisation with a live scaled inert clone posed through interpFrames, or use a capture library that supports Color 4.

### KFA-60 · HIGH · Scrub drag pins the playhead to 0 (or runs with a huge fixed offset) when a press on the track is followed by a move before the next frame
**Surface:** `playback-ribbon-visualizer`

- **Observed vs expected:** Paused, press the track at x 444: onSlideStart gives 7655 (correct). The first onSlideMove at the same x gives 16, and later moves go negative and clamp to 0, so the engine t, thumb and ball stay at 0 for the whole gesture (3/3). A variant on fresh load freezes at 3440 or 2480. Drag while playing tracks correctly. Expected: the thumb follows the pointer.
- **Frames + evidence:** drag f032-052 (`sheets/drag-1.png`, `drag-2.png`) · `E/playback-ribbon-visualizer/probe2/emitlog7-0..2.json`, `samples.json`
- **Cause:** reka-ui 2.9.9 `dist/Slider/SliderHorizontal.js:49` latches `offsetPosition = clientX - thumb.left` on the first move. The thumb is controlled by `demo/components/playback/PlaybackRibbon.vue:55` `:model-value="[currentT]"`, and currentT only updates on the useAnimationSync ticker (`useAnimationSync.ts:40-53`), which is a frame late and idle while paused. So the offset latches at ~345 px.
- **Fix shape:** Seat the displayed value synchronously during a gesture: set a local scrubValue in onSliderInput (`PlaybackRibbon.vue:273-277`) and bind `isDragging ? [scrubValue] : [currentT]`.

### KFA-61 · HIGH · The scrub rail looks greyed out and disabled: no elapsed fill and a near-invisible thumb (the owner's "timeline is always greyed out")
**Surface:** `playback-ribbon-visualizer`

- **Observed vs expected:** The track is flat neutral on a beige card, the range span is transparent (no elapsed fill), and the thumb is a transparent 12×40 pill with a 2 px cream border. This is the same at rest, while playing and while scrubbing.
- **Frames + evidence:** every live frame s0-403 (sheets/live-00..16) · `E/playback-ribbon-visualizer/rest/ribbon-rest.png`, `sheets/zoom-live-s150.png`
- **Cause:** `demo/components/playback/PlaybackRibbon.vue:49` `variant="spectrum"` (a colour-spectrum slider that expects a consumer gradient track; the tokens were deleted under OA-8, `:37-46`). It falls back to glass-ui's spectrum defaults (`--secondary` track, transparent range, transparent thumb).
- **Fix shape:** Use a variant whose range fills (standard, with a visible thumb), or add a producer-level timeline variant in glass-ui (relay). At minimum, supply the range and thumb tones through published tokens.

### KFA-62 · HIGH · Add-dialog submit feedback is never seen: the dialog closes on the same tick, and the editor's own bar does not sweep on add
**Surface:** `keyframes-editor-cards`

- **Observed vs expected:** On submit the dialog closes at 172 ms. Its internal sweep starts at 198 ms after the async engine import and reaches only scaleX 0.009 before unmount, with width 0 (the same scale-x-0 composition). The editor bar stays at scaleX(0). The keyframe is added with no confirmation.
- **Frames + evidence:** G #9-22 (`sheet-G_dialog_submit-0.png`) · `E/keyframes-editor-cards/G_dialog_submit/frames.json`
- **Cause:** `demo/components/instrument/keyframes/KeyframesEditor.vue:209-213` closes the dialog synchronously on success. The sweep lives inside the closing dialog (`components/KeyframesAddDialog.vue:51, 218-229, 245`).
- **Fix shape:** On a successful add, play the editor's persistent progressSweep (`KeyframesEditor.vue:633-640`) and delete the in-dialog bar. Fix the scale composition first.

### KFA-63 · HIGH · The 'copied' confirmation is a ~100 ms blink that is never held, and at rest the control says 'Copied' forever
**Surface:** `copy-button-feedback`

- **Observed vs expected:** The check is at opacity 1 only from ~38 to ~95 ms of a 200 ms run, fades by 155 ms, and is gone. Afterwards the glyph is the bare clipboard while aria-label, the tooltip and the live region read 'Copied to clipboard' for the rest of the session. Expected: a crossfade to a check, a hold of ~1-1.5 s, then a return, with the name reverting in step.
- **Frames + evidence:** step #0-47 (on #3, full #9-23, gone #33); live #1-8, #31-38, #55-63 · `E/copy-button-feedback/sheets/step-000-023.png`, `live-zoom-f0-3-5-7-8-20.png`, `meta.json` afterLive
- **Cause:** `demo/components/CopyButton/CopyButton.vue:121-131` (the check keyframes go 0→1→0 in a single 200 ms play, `:93`). `:106` sets isCopied=true, and nothing resets it (`:35`, `:53`).
- **Fix shape:** Split into enter (check 0→1 with fill forwards, clipboard 1→0, pulse on enter only), a hold timer of ~1200-1500 ms that also resets isCopied, and an exit.

### KFA-64 · MEDIUM · The Amiga back-wall grid hangs one unit below the floor plane and shows through the translucent floor, so the room has no clean floor/wall corner
**Surface:** `amiga-grid-room-backdrop`

- **Observed vs expected:** The back wall's vertical lines run past the floor's back edge down to page y≈625, below the floor line at 592, in both themes and at rest. Expected: the wall stands on the floor (its bottom edge at CONTACT_FLOOR, z=-BOX_SIZE/2).
- **Frames + evidence:** every step frame (static layer) · `E/amiga-grid-room-backdrop/reach-full.png`, `reach-crop-junction.png`, `zoom-dark-junction-shadow.png`
- **Cause:** `demo/scenes/amiga/useAmigaThree.ts:222-230` rotates backGrid by π/2 with no y offset, so it spans y -6..6, while the floor sits at CONTACT_FLOOR = -5 (`useAmigaDemo.ts:39`).
- **Fix shape:** Set `backGrid.position.y = CONTACT_FLOOR + BOX_SIZE/2`, or crop the wall so it starts at the floor line.

### KFA-65 · MEDIUM · The Amiga gesture layer is outermost, so any pitch permanently tilts the group's Boing spin axis (the layers compose in the wrong order)
**Surface:** `amiga-sphere-spin-gesture`

- **Observed vs expected:** After a downward flick during play (ox 2.43, oy -2.44), the linear Boing spin turns about the world axis (-0.21, -0.85, 0.49), 151° from the authentic ~16°-tilted vertical (recomputed at confirm: 150°). The ball tumbles with its pole at the bottom-front until Home. Expected: the gesture adds attitude on top of the composite while the Boing keeps its tilted-axis spin.
- **Frames + evidence:** p4b-transport f356-372, f480-527 (`track-sheet-20`, `track-sheet-21`)
- **Cause:** `demo/scenes/amiga/AmigaScene.vue:398` `mesh.quaternion.copy(qGesture).multiply(qSpin)` puts the gesture outside the spin, so it rotates tiltAxis (`:238-242`).
- **Fix shape:** Compose qSpin(tiltAxis_world) · qGesture (the spin is applied last, about the fixed world axis), and conjugate each drag delta by the current qSpin so drags still follow the screen. Do this together with the quaternion-accumulator fix.

### KFA-66 · MEDIUM · The Amiga Y bounce alternates between a full hop (apex +2) and a short two-thirds hop that stalls at y=0 every 1600 ms
**Surface:** `amiga-boing-composite`, `amiga-grid-room-backdrop`, `amiga-contact-shadow`

- **Observed vs expected:** Y keyframes run 0 → FLOOR → APEX → FLOOR → 0, so the loop seam at y=0 is a zero-velocity turning point. Peaks at +818 ms reach 1.98, while peaks at +1568 ms reach only ≈0. The fall time is 400 ms for both 6- and 4-unit drops, so gravity reads differently between hops. The contact shadow's scale and fade alternate with it. This happens independently of the easing clobber. Expected: every bounce reaches the same upper-third apex.
- **Frames + evidence:** boing step s5 vs s9-10; grid s4-5 vs s19-20, s28-29 vs s43 · `E/amiga-boing-composite/samples.json` (+818/+1568/+2318), `E/amiga-grid-room-backdrop/capture-out.json`
- **Cause:** `demo/scenes/amiga/useAmigaDemo.ts:287-291` has the 0% and 100% stops at SPHERE_HOME (0) mid-air, chosen so PLAY enters from rest (T.A8).
- **Fix shape:** Author one apex→floor→apex bounce (0% APEX, 50% FLOOR, 100% APEX) and let createPoseContinuity absorb the cold-start seam, or start the cycle at the floor.

### KFA-67 · MEDIUM · The Amiga grid room and contact shadow are theme-blind constants: the shadow vanishes in dark mode, and in light mode the room grid is no stronger than the flat backdrop grid
**Surface:** `amiga-grid-room-backdrop`

- **Observed vs expected:** Light: room lines Δ36 on the paper against the backdrop grid's Δ32, so the depth cue is lost. Dark: the room grid dominates, and the black contact shadow disappears on near-black paper. Nothing re-reads the theme on toggle.
- **Frames + evidence:** `E/amiga-grid-room-backdrop/reach-full.png` (light), `theme-dark-full.png`, `zoom-dark-junction-shadow.png`
- **Cause:** `demo/scenes/amiga/useAmigaThree.ts:214-227` hard-codes gridColor '#b9b9c6' at opacity 0.35/0.18. `:116-119` makeShadowTexture uses fixed rgba(0,0,0,…). Only `--amiga-red` is resolved from the theme.
- **Fix shape:** Resolve the grid and shadow colours from theme tokens through the `--amiga-red` probe (`demo/scenes/amiga/utils.ts`), re-resolve on theme change plus markRenderDirty, and tune opacity per theme.

### KFA-68 · MEDIUM · Transport Reset does nothing to a scrubbed Amiga stage (only children that have been started rewind)
**Surface:** `amiga-grid-room-backdrop`

- **Observed vs expected:** After a scrub (spin -2.471), dock Reset leaves the pose at [0,0,-2.471]. Re-verified at confirm (kf 3c8199c5). Since the rail became live at boot (KF.W13U.t), a user can scrub before ever pressing Play, and then Reset cannot undo it. Expected: every channel rewinds to its initial frame.
- **Frames + evidence:** `E/amiga-grid-room-backdrop/transport-after-scrub.png`, `confirm/c05-scrub-reset.mjs` poseAfterScrub vs poseAfterReset
- **Cause:** `src/animation/group/lifecycle.ts:180-185` reset() repaints only children with `anim.started`, and a child moved only through setChildTime is never started. AmigaScene authority then stays 'pose' (`AmigaScene.vue:343`).
- **Fix shape:** In reset(), also rewind children whose t was set by setChildTime, or have the transport's reset call `setChildTime(child, 0).render()` on every child.

### KFA-69 · MEDIUM · The transport scrubber scrubs only the selected channel, so phase-locked channels fall out of phase (Amiga X/Y/Spin; the cube bob freezes while the spin follows the thumb)
**Surface:** `amiga-boing-composite`, `cube-group-spin-matrix-bob`

- **Observed vs expected:** Amiga: 10 ArrowRight presses and a click at 30% move only Spin (0.656→2.885) while px and py hold. The child times end up at 2400/3367/1550 ms, the spin/wall phase lock is lost for the rest of the session, and the ball does not move under the scrubber. Cube: `.cube` follows 151°→336° while `.cube-bob` holds translateY(4.9143px), even though the machine records SCRUB t for every child.
- **Frames + evidence:** `E/amiga-boing-composite/capture.json` scrub{…}, `shots/03-scrubbed.png`; `E/cube-group-spin-matrix-bob/interact/scrub.json`
- **Cause:** `demo/composables/scene-facility/index.ts:107` `getGroup().setChildTime(anim, clamped*dur).render()` for one child only. `demo/components/instrument/transport/AnimationControlsGroup/useAnimationGroupPlayback.ts:133-147` scrubs one child per the comment "must NOT drag its siblings along", but `machine.dispatch({type:'SCRUB', t})` records t for all.
- **Fix shape:** For phase-locked groups, expose a group-level seek (every child to the same master time, modulo each duration) and bind the scrubber to it. Or make the per-child SCRUB record agree with the paint.

### KFA-70 · MEDIUM · The mount settle's first moving frame is already 63-70% of the sweep: a pop, not a gentle ease
**Surface:** `home-landing-cube`

- **Observed vs expected:** In all 3 cold loads the first non-identity `.graph` frame reads 18.9-20.9° of the 30° target, one frame after identity. That is 63-70% of the sweep in a single frame, where ease-out-back reaches it only at x≈0.14. Expected: a first moving frame near 3-4°.
- **Frames + evidence:** `E/home-landing-cube/loaf.json` run0 886→902 ms, run1 447→464 ms; samples mount t=1467→1484
- **Cause:** `demo/scenes/cube/useCubeDemo.ts:173` calls play() inside onMounted during the engine-load long frame (`src/animation/load-engine.ts`, LoAF 118-141 ms). `src/animation/engine/play-lifecycle/frame.ts:107` stamps startTime at that frame's timestamp.
- **Fix shape:** Start the settle one frame after the mount work (rAF→rAF), or anchor startTime to the first presented tick. WAAPI would also fix it.

### KFA-71 · MEDIUM · Play flashes the die flat (attitude 30°→0°) for 2 frames before it re-settles
**Surface:** `home-landing-cube`

- **Observed vs expected:** On Play the `.graph` attitude resets to 0. The cube shows flat and face-on with an edge-on side plane (#31, #32), then pops to 30.8° and settles. Expected: the shared die keeps its attitude into the cube scene.
- **Frames + evidence:** #31-#33; samples play t=50 (0°), 1783 (30.8°), 1850 (30.0°) · `E/home-landing-cube/frames/`
- **Cause:** The home→cube remount (`useSceneMachineShellBinding.ts:246-255`, the `:key=superKey` boundary) creates a fresh `.graph`, and `demo/scenes/cube/useCubeDemo.ts:129-150, 173` always animates from rotate3d(…0deg). The attitude is not persisted (only the transform is, via `useCubeTransform`).
- **Fix shape:** Skip the settle, or seed it from graphAttitudeCss(), when the die has already settled this session. Keeping the instance (the Play-freeze row fix) removes this too.

### KFA-72 · MEDIUM · The start-screen hero text outlives the scene switch: it stays painted under the cube scene's chrome for 3 frames, then vanishes with no exit
**Surface:** `home-landing-cube`

- **Observed vs expected:** Confirm amended: #30 is still the home layout. In #31-#33 'Select an animation…' and its sub-copy stay painted across the stage behind the already-mounted Pause/Reverse card and duration panel, and across the cube itself, so two scenes' chrome are composited together. It is gone at #34 with no fade frame (a second 283 ms rAF gap swallowed the exit).
- **Frames + evidence:** #31-#34 · `E/home-landing-cube/frames/`, `samples.json` 1950→2233
- **Cause:** A consequence of the two post-Play stalls (the Play-freeze row). The start-screen exit bytes were not traced.
- **Fix shape:** This should fall out of the Play-freeze fix. Otherwise, sequence the hero exit before the cube chrome mounts.

### KFA-73 · MEDIUM · The aurora's ambient drift cannot be seen at the served 0.1 presence, but a full-viewport GPU loop runs at 60 fps for the whole session
**Surface:** `home-hero-aurora`

- **Observed vs expected:** On the raw canvas the field drifts smoothly (luma 127→143 over ~16 s, deterministic). In the served composite the change is at most ~1.6 levels (MAE 0.002-0.003), which reads as a static lavender wash. The canvas still redraws 1440×900 at 60 fps. Expected (OD-2): drift that registers to the eye, or no invisible loop.
- **Frames + evidence:** stepped s00-47, amplified a00-23, served live f000-280 · `E/home-hero-aurora/sheets/stepped-00-23.png` vs `live-000.png`, `results.json`
- **Cause:** `demo/components/instrument/shell/HeroAurora.vue:58` (opacity ceiling 0.1), `:160` (colorEnergy 0.18), `:163` (motion 'drifting'), `:167` (paper wash). This is the open owner question KF-HA-10 (`:142-148`).
- **Fix shape:** Owner decision KF-HA-10: raise in-field contrast or drift until the served change is ~4-6 levels per cycle, or accept a static tint (a still register, or render once and pause()).

### KFA-74 · MEDIUM · A one-shot 0.75-1.05 s page-wide freeze ~8-11 s after load stops the hero wave mid-cycle and swallows glyph lifts (a synchronous GPU readback in the dock's luma sampler)
**Surface:** `home-animated-text`

- **Observed vs expected:** Screencast s133→s134 has a 755 ms gap (matching a 747 ms longtask). The wave resumes mid-sweep and the lifts of 'S' and 'e' never reach the screen. The first frames after the gap are stale (the rest pose), then the wave teleports to mid-sweep (found at confirm). A pure-JS 900 ms block does NOT freeze the compositor wave, whereas this stall does. It happens once per load; the windows at 12 s and 15 s were clean. (The '1798 ms' figure was not banked and has been dropped.)
- **Frames + evidence:** screencast s133→s136 · `E/home-animated-text/screencast.json`, `inktrack.json`, `block.json` (profile top: 1152 ms `ke`), `block/sheet-block-00.png`
- **Cause:** glass-ui 7.0.0 `dist/dock.js` `ke` (served at `.vite/deps/@mkbabb_glass-ui_dock.js:1309-1330`, called at `:1409`) does drawImage(aurora WebGL canvas) then getImageData(32×32). It is wired from `demo/app/dock/ChromeDock.vue:274, 419` (`:background-canvas`). Tied to the stall by correlation across runs, not measured within the same run.
- **Fix shape:** Producer (relay): sample asynchronously (createImageBitmap resize, or readPixels into a PBO with a fence), or derive luma from the aurora's uniforms, and defer and throttle the first sample. Consumer stopgap: drop `:background-canvas`.

### KFA-75 · MEDIUM · The chrome panel and ribbon pop in 1-2 frames after the new scene, and the stage blanks for one frame when they do
**Surface:** `scene-swap-transition`

- **Observed vs expected:** After the swap the left controls panel is missing for 1-2 frames, then snaps in fully formed. Confirm amended: on that same frame (f092) the sphere and floor vanish and return at f093, so the scene subject flickers too.
- **Frames + evidence:** A-cube-to-amiga f090-093, A-amiga-to-square f034-035 · `E/scene-swap-transition/A-cube-to-amiga/`
- **Cause:** `demo/app/App.vue:63-72` renders `#tabs-content`/`#ribbon-content` from `sceneRef?.tabsContent`, which exists only after the async scene mounts. The stage blank is likely the scene-host resize (878→912 px) clearing the render (not verified).
- **Fix shape:** Take the panel and ribbon from the static scene descriptor (`scenes.ts`), or keep the outgoing chrome until Suspense resolves and swap both in one VT update.

### KFA-76 · MEDIUM · Main-thread stalls of 80-317 ms land exactly on the swap instant (dropped frames)
**Surface:** `scene-swap-transition`

- **Observed vs expected:** rAF deltas at the swap: 217 ms (cube→amiga), 316.6 ms (spring→sequence), 133, 116.7, 83, and 82 ms on a warm hash nav. Any cross-fade would freeze across them.
- **Frames + evidence:** A-cube-to-amiga f060→061, f075→076; `A-*/frames.json` rafStats · `E/scene-swap-transition/`
- **Cause:** Chunk evaluation plus the synchronous new-scene mount run on the swap tick (`demo/app/App.vue:92` keyed Suspense; `useSceneMachineShellBinding.ts:273-276`).
- **Fix shape:** Warm scene chunks at idle, resolve the destination before starting the VT, and defer heavy scene init past first paint.

### KFA-77 · MEDIUM · (Latent) The root cross-fade double-exposes the changing dock and transport labels ('Squiare', 'Spinsform')
**Surface:** `scene-swap-transition`

- **Observed vs expected:** Counterfactual: during the 250 ms fade the two labels superimpose, horizontally offset because the dock width changes, which reads as blurry, doubled text.
- **Frames + evidence:** CF-seek-warm-square-to-amiga s012; CF-screencast-cold-amiga-to-square f055-057
- **Cause:** `demo/app/App.vue:381`: only `.scene-host` is named, so the chrome cross-fades inside root with the UA plus-lighter fade.
- **Fix shape:** Name the dock and transport so they morph as their own groups, or keep chrome geometry stable across scenes.

### KFA-78 · MEDIUM · More than half of every 5 s shimmer cycle is a dead, frozen plate between sweeps
**Surface:** `scene-skeleton-shimmer`

- **Observed vs expected:** The band is visible only in f14-f34 (~2.2 s). f35-f47 plus f00-f13 (~2.8 s) are identical static plates. The Fast-3G run emitted no damage frame for 1529 ms while the fallback was up.
- **Frames + evidence:** seek f35-47, f00-13 · `E/scene-skeleton-shimmer/sheet-seek-24-47.png`, `organic/fast3g` s0184-0243
- **Cause:** Same producer bytes as the late-shimmer row: ±110% travel with ease-in-out on the 5s token (glass-ui `dist/glass-ui.css .skeleton::after`).
- **Fix shape:** Shorten the travel to the band width and shorten the duration, so the off-plate rest is ≤30% of the cycle.

### KFA-79 · MEDIUM · Fallback flash: on a normal cold load the skeleton appears for 58-180 ms and is hard-cut
**Surface:** `scene-skeleton-shimmer`

- **Observed vs expected:** Unthrottled: the fallback mounts and unmounts within 58 ms (or 180 ms), and a plain plate flashes. Confirm amended: the originally cited 'hard cut' frames s0725/s0726 are clip-sized screenshot artefacts, so the hard cut rests on the code (nothing ramps the scene in on resolve).
- **Frames + evidence:** organic/unthrottled s0004-0007 · `E/scene-skeleton-shimmer/sheet-organic-unthrottled.png`, `organic/meta.json` lifeMs 58
- **Cause:** `demo/app/App.vue:92-100` (a keyed Suspense shows the fallback immediately), `demo/app/App.skeleton.vue:103-109` (no appear delay), `demo/app/transition/useSceneSwap.ts:44-51` (watches activeSceneKey only).
- **Fix shape:** A delayed fade-in on `.scene-skeleton` (~150-200 ms delay, PRM-gated) so sub-threshold loads paint nothing. Optionally ramp the scene in on @resolve.

### KFA-80 · MEDIUM · The skeleton plate's geometry is not the scene's: the stage reflows under it (the rail track animates) and jumps at the swap
**Surface:** `scene-skeleton-shimmer`

- **Observed vs expected:** The skeleton plate is 91..1349 × 154..746 while the scene plate is ~74..1366 × 124..772, then the rail opens and the stage shrinks. Unthrottled, the plate x drifts 566→550 within 27 ms and jumps +32 px wide and +54 px tall at the swap. Confirm's corrected citation is s0724→s0727, not s0726. Confirm suggested this could rank HIGH, since it is the root of the narrow, moving plate.
- **Frames + evidence:** `E/scene-skeleton-shimmer/sheet-organic-fast3g-life.png` s0004-0064, `sheet-resolve-held.png` s0724→s0727→s0728
- **Cause:** (a) `demo/app/App.vue:45, 269-277`: derivedSurfaces reads `sceneRef?.facility` (undefined while pending), so `AnimationControlsGroup.vue:25` goes railless and `AnimationControlsGroup.css:57` animates the track. (b) `demo/app/App.skeleton.vue:108` padding `clamp(1rem,4cqi,3rem)` vs `SpringScene.vue:51` `px-6 lg:px-8`.
- **Fix shape:** Derive rail presence from the static scene descriptor, and make the skeleton gutter the scene host's gutter.

### KFA-81 · MEDIUM · A ~216 ms main-thread stall at cube entry cuts the graph settle's overshoot return and jumps the spin
**Surface:** `cube-group-spin-matrix-bob`

- **Observed vs expected:** One rAF delta of 216 ms ~470 ms after `.cube` mounts: the spin jumps 4.51°→10.88° and the settle skips 32.6°→30.6°. After that, 0 frames over 20 ms. The cause is not pinned.
- **Frames + evidence:** live f0017→f0018 (`sheet-live-00`); `E/cube-group-spin-matrix-bob/live/samples.json` idx 13→14
- **Cause:** Not pinned at the bytes. LoAF attributed a 303 ms frame to `src/animation/load-engine.ts` import.then, before mount. The class of cause is likely engine or lazy-module warm-up overlapping the entry motion (same class as the landing settle-pop row).
- **Fix shape:** Start the settle and autoplay after the engine and lazy imports resolve, or warm them at idle before SCENE_READY. Re-measure with LoAF across 5 loads.

### KFA-82 · MEDIUM · Releasing after holding the pointer still still flings the die ~450° at up to ~1300°/s
**Surface:** `cube-orbital-drag-inertia`

- **Observed vs expected:** Drag, hold perfectly still for 400 ms, release: the model coasts ~20°/frame and travels ~450° over ~2.7 s. Expected: a stationary hold carries no momentum.
- **Frames + evidence:** run3 f291-316 (hold), f317-467 · `E/cube-orbital-drag-inertia/samples.json` 339-528
- **Cause:** `demo/scenes/cube/orbital-drag/composables/useOrbitalPointer.ts:115` returns early on sub-0.5 px moves, so the EMA (`OrbitalDrag.vue:136-140`) never decays during a hold. `:393-395` keeps 0.8× the stale speed, and `useOrbitalInertia.ts:135-141` coasts on it.
- **Fix shape:** Timestamp the last pointermove, and on release zero the speed if the hold exceeds ~50-80 ms, or decay() it over the hold.

### KFA-83 · MEDIUM · Orbit inertia is not frame-rate invariant (despite its docblock), and fling speed is measured per pointer event rather than per second
**Surface:** `cube-orbital-drag-inertia`

- **Observed vs expected:** The coast applies per-event radians once per rAF without dt, so coast distance is v0/(1-f): 20·v0 at 60 Hz and 39.5·v0 at 120 Hz (from reading the source; 120 Hz was not measured). The opening coast at ~1220°/s aliases against the die's 90° symmetry (f80-95).
- **Frames + evidence:** run3 f76-110; samples 100-140 · `E/cube-orbital-drag-inertia/`
- **Cause:** `demo/scenes/cube/orbital-drag/composables/useOrbitalInertia.ts:99-100` (no dt in applyRotation) and `OrbitalDrag.vue:132-140` (EMA of per-event angle).
- **Fix shape:** Track ω in rad/s (angle over event dt), then apply ω·dt per frame, or use decay()'s closed form.

### KFA-84 · MEDIUM · Uneven coast cadence: the pose advances in alternating tiny and large steps (~30 Hz judder with no dropped frames)
**Surface:** `cube-orbital-drag-inertia`

- **Observed vs expected:** `.cube-pose` m00 across successive frames reads -0.393, -0.384, 0.014, 0.021, 0.411, 0.415…: pairs differing by less than 0.01, then a jump of 0.2-0.4. This is a symptom of the orbit-layer BROKEN row.
- **Frames + evidence:** run3 f702-760; samples 760-774 · `E/cube-orbital-drag-inertia/samples.json`
- **Cause:** The Matrix animation's own time step and the rAF-debounced recompile (`useTransformState.ts:285-292` → `useCubeDemo.ts:62-64`) land on alternate frames.
- **Fix shape:** Goes away with the orbit-layer fix.

### KFA-85 · MEDIUM · The cube face specular hotspot and veil direction are face-local, so they turn with the face instead of staying pinned to the up-right key light
**Surface:** `cube-relit-faces`

- **Observed vs expected:** On the blue face '3' shown rotated 180° (confirm corrected: the audit had named face '2'), the specular sits bottom-left facing away from the light. At A16 face 2 has its hotspot lower-left and face 5 top-left. The 180° veil darkens the face-local bottom whichever way that points (found at confirm: this also inverts the dark theme's shading on rolled faces).
- **Frames + evidence:** A15-A17; `E/cube-relit-faces/sheet-veil-veilDark.png` lit=0.75/1 and lit=0-0.5
- **Cause:** `demo/scenes/cube/CubeTarget.css:192-205`: `radial-gradient(… at 78% 18%)` and `linear-gradient(180deg)` are set in face space, and only their strength follows `--lit`.
- **Fix shape:** In useCubeRelit, project KEY_LIGHT onto each face's tangent plane and publish `--spec-x/--spec-y` and `--veil-angle` alongside `--lit`.

### KFA-86 · MEDIUM · The roll overshoot scales with the whole multi-turn arc: the die rolls up to a whole face past its landing and then drifts back
**Surface:** `cube-roll-egg`

- **Observed vs expected:** Every roll overshoots by 8.7% of its arc (31/39° up to 86/78°). At the apex the die holds on the ADJACENT face for ~250 ms, then drifts back up to 86° over ~400 ms, which reads as a second, backwards roll.
- **Frames + evidence:** #63-96, #177-205, #288-315 · `E/cube-roll-egg/trace-analysis.txt`, `sheet-02`, `sheet-08`, `sheet-12`
- **Cause:** `demo/scenes/cube/CubeTarget.vue:310-319`: one from/to pair spans 360-990° with `ease-out-back`, whose overshoot is a fixed fraction of the delta.
- **Fix shape:** Split spin from settle (an ~80% stop at end+10° with ease-out, then ease back to end), or express the overshoot as a fixed angle.

### KFA-87 · MEDIUM · The roll egg ignores prefers-reduced-motion and plays the full 1.1 s multi-turn tumble
**Surface:** `cube-roll-egg`

- **Observed vs expected:** With reducedMotion 'reduce' emulated, a double-tap produces 53 distinct transforms going 0→rotateX(360) rotateY(630).
- **Frames + evidence:** `E/cube-roll-egg/reduced.json`
- **Cause:** `demo/scenes/cube/CubeTarget.vue:310-316` omits respectReducedMotion, and `src/animation/constants/defaults.ts:87` defaults it to false.
- **Fix shape:** Pass `respectReducedMotion:true`, or under reduced motion write rollTransform(end) directly.

### KFA-88 · MEDIUM · Axis-lock release is a one-frame snap, not a fade: the stroke goes solid→dashed and the bloom drops in the keyup frame
**Surface:** `cube-axis-lines`

- **Observed vs expected:** At keyup the ink drops 141.5→88.3 in one frame (~55% of the release), and the rest eases over ~12 frames. The seek shows 'dashed' and filter 'none' while `--axis-active` is still 1.
- **Frames + evidence:** screencast sc-054→055 (`strip-sc-xup1-0.png`), seek x-out-00..47 · `E/cube-axis-lines/probes-log.json` liveOut/reversal
- **Cause:** `demo/scenes/cube/CubeAxisLines.vue:139` (solid only under `.axis-line--locked`), `:150-153` (the bloom is class-gated), `:116` (only `--axis-active` transitions).
- **Fix shape:** Crossfade a solid ::after layer by var(--axis-active) over the dashed base. Let the bloom outlive the class (allow-discrete filter, or a 'releasing' state cleared on transitionend).

### KFA-89 · MEDIUM · The cube loader is dead code: it never mounts or paints, because its show gate is a selection proxy that is false from the first render
**Surface:** `cube-loader-spin`

- **Observed vs expected:** Cold load of #/cube: 0 MutationRecords add `svg.animate-spin`, and 0 frames paint with it present. Confirm amended the severity from BROKEN to MEDIUM: nothing on screen breaks, and the real loading window belongs to Suspense.
- **Frames + evidence:** pass1 f000-038 · `E/cube-loader-spin/capture.json` cold.mut=[], loaderPaintedFrames 0, `pass1/log.json`
- **Cause:** `demo/scenes/cube/CubeScene.vue:20` `:show-loader="!hideLoader && !storedControls.selectedAnimation"`. `demo/app/scene/useSceneMachineShellBinding.ts:107-112` seeds the selection before the first render. `CubeTarget.vue:56-63` holds the unreachable Loader2.
- **Fix shape:** Delete the loader (`CubeTarget.vue:56-63`, the prop at `:156`, `CubeScene.vue:20`), or gate it on real readiness outside preserve-3d.

### KFA-90 · MEDIUM · Pressing Play on Square snaps the fill from the rest teal to the tour's violet in one frame (this happens on every Play from rest, not only mid-tumble)
**Surface:** `square-tour`, `square-tumble-egg`

- **Observed vs expected:** At rest the box is teal #52e898, and the first frame after Play is violet oklab(0.684 0.212 -0.133) with nothing in between. The pose is continuous (ARB-1), the colour is not. Confirm found that the swap and the will-change flip land one frame before the clock ticks (see found-at-confirm).
- **Frames + evidence:** square-tour live L0→L1 (`sheets/live-000.png`), rAF 26→27; tumble #167→#168 · `E/square-tour/capture.json`; `E/square-tumble-egg/state-log.json`
- **Cause:** `demo/scenes/square/useSquareDemo.ts:483-490` (TOUR_PALETTE[0]/[4] = `--rainbow-violet`) against the rest `SquareScene.css:98` teal. `tourTimeForPose` (`useSquareDemo.ts:597-614`) matches x/y only, and the watch at `SquareScene.vue:322-324` seats t=0.
- **Fix shape:** Make the 0%/100% stops the rest identity teal, or paint stop 0 at rest, or blend the first ~150 ms of fill.

### KFA-91 · MEDIUM · The Square tour's green→violet segment passes through grey (oklab chroma collapses to 0.011)
**Surface:** `square-tour`, `square-tumble-egg`

- **Observed vs expected:** Chroma drops from S36 0.233 to S42 (t=1750) 0.011, with the hue flipping 140°→5°, then comes back to violet. This repeats every iteration (live L96-98, and tumble #268-275 under the stale halo).
- **Frames + evidence:** S40-S44 (`sheets/step-24.png`), live L96-98 · `E/square-tour/`; `E/square-tumble-egg/sheets/sheet-11.png`
- **Cause:** The engine default colorSpace 'oklab' (`src/animation/constants/defaults.ts:88`) takes the straight chord between near-complementary hues. Options are at `demo/scenes/square/useSquareDemo.ts:494-498`.
- **Fix shape:** Pass `colorSpace:'oklch'` in the tour options, or add an intermediate stop.

### KFA-92 · MEDIUM · The Square velocity tilt snaps to its 9° cap in one frame and stays pinned; its axes are crossed and its sign is inconsistent
**Surface:** `square-drag-spring-tether`

- **Observed vs expected:** Tilt goes 0→skew(-6.6°,-8.5°) in the first frame, sits at ±9° for 330 ms, and reverses sign at release (+2.1/+2.8°). A horizontal fling slants the top and bottom edges instead of leaning the sides. Down-right drags stretch along the motion, up-left drags compress.
- **Frames + evidence:** rec 220-222, 234-240, 36-55; screencast f86→f87 · `E/square-drag-spring-tether/horiz-fling-midflight.png`, `probe2.json` horizFling
- **Cause:** `demo/scenes/square/useSquareDemo.ts:299-300` (tiltX from vy, tiltY from vx, contradicting the comment at `:296-297`). `:291-292` TILT_GAIN 5 saturates TILT_CAP 9 immediately. There is no smoothing.
- **Fix shape:** Derive the lean from the velocity vector (sides lean against travel), check the sign on all four diagonals, lower the gain, and low-pass or spring the tilt.

### KFA-93 · MEDIUM · The Square FSM drops to 'idle' while the pointer is still holding the box (will-change promotion is lost and the badge reads SETTLED mid-drag)
**Surface:** `square-drag-spring-tether`

- **Observed vs expected:** data-square-mode goes drag→idle one frame after pointerdown, while the dragging class stays on. A 900 ms still hold reads idle. Found at confirm: promotion is also dropped for the whole post-release fling (rec 229+).
- **Frames + evidence:** rec 21→22 vs 219-228; rec 229-240 · `E/square-drag-spring-tether/rec.json`, `probe3.json`
- **Cause:** `demo/scenes/square/SquareScene.vue:213` the settle callback sets mode idle without checking `dragging`. will-change is gated on mode=drag (`SquareScene.css:116-129`).
- **Fix shape:** `if (!dragging.value && …) mode.value = 'idle'`, and let the drag's onEnd own drag→idle. Set idle only when the springs settle, not at release.

### KFA-94 · MEDIUM · Grabbing the Square mid-tour pops its scale 6.5% in one frame, and the box then rests upside-down
**Surface:** `square-drag-spring-tether`

- **Observed vs expected:** scale goes 1.0118→1.0771 within two rAFs, then the box settles at rotate(169.957°) until the next Play or tumble.
- **Frames + evidence:** `E/square-drag-spring-tether/probe2.json` takeover.pre/post, afterTakeover.tf
- **Cause:** `demo/scenes/square/useSquareDemo.ts:421-450` seatFromPose seats x/y/spin but not the d scale (the comment at `:440-441` wrongly calls it continuous). `:449` `springSpin.reset(rotate,0)` leaves the spin target at ~170°.
- **Fix shape:** Seat a scale carrier from the painted matrix (or blend d over a few frames), and retarget the spin to the nearest multiple of 360°.

### KFA-95 · MEDIUM · Arrow/Home keys are handled twice, by the focused widget and by the global transport shortcut (Square's box turns magenta and stays; the ribbon playhead lurches +2 steps at random)
**Surface:** `square-drag-spring-tether`, `playback-ribbon-visualizer`

- **Observed vs expected:** Square: Home on the focused box also scrubs the transport, so the engine paints the tour pose plus a magenta `--subject-fill` that never clears (it does not happen when bubbling is blocked). Ribbon: two ArrowRight presses usually move +160 (2×1%), but frames k1/32/35/36/41 jumped +320.
- **Frames + evidence:** `E/square-drag-spring-tether/held-poses-sheet.png`, `probe3-afterHome.png`, probe4; `E/playback-ribbon-visualizer/kbd/f001, f032, f035, f036, f041`, `kbd/samples.json`
- **Cause:** `demo/components/instrument/transport/AnimationControlsGroup/useControlsKeyboardShortcuts.ts:94-99` (~:95/:98 at HEAD) registers Arrow/Home/End through glass-ui registerShortcut, whose dispatcher skips only editable targets and ignores defaultPrevented. That policy is already relayed as a standing registry row (`:85-86`).
- **Fix shape:** The registry dispatcher (glass-ui, relay) should skip defaultPrevented events and `[role=slider]` targets, or targets whose aria-keyshortcuts claim the key. Consumer stopgap: stopPropagation in the widgets.

### KFA-96 · MEDIUM · Pressing Play mid-tumble snaps the box upright and leaves the tumble's spring loop running under the tour (two writers; the halo rides the tour for ~1.75 s)
**Surface:** `square-tumble-egg`

- **Observed vs expected:** Space 420 ms into a tumble: a tilted (~12-15°) teal box becomes an upright magenta one in a single frame. The spin loop keeps writing transform and `--subject-fill` alongside the engine, and `data-palette-sweep` plus the pink halo persist for ~1.75 s. Confirm amended: the colour half is the generic Play-from-rest snap (the Square Play-snap row). The tumble-specific parts are the ~12-15° tilt snap, the lingering sweep and bloom, and the second writer.
- **Frames + evidence:** #167→#168, #168-#281 (`sheets/sheet-07..11`) · `E/square-tumble-egg/state-log.json` rows 247-353
- **Cause:** `demo/scenes/square/SquareScene.vue:322-327` watch(isPlaying) only calls setProgress(tourTimeForPose()) and never retires springSpin, the loop or `data-palette-sweep` (`useSquareDemo.ts:283, 335`).
- **Fix shape:** On the rising Play edge, reset springSpin (value mod 360, v=0), clear the sweep marker and fill, and stopLoop() before the group plays.

### KFA-97 · MEDIUM · The tumble's 'landing' bloom (pink halo) lingers ~1.1 s after the box is visibly at rest, and stays violet around a teal box
**Surface:** `square-tumble-egg`

- **Observed vs expected:** The box is visibly still by T1+892 ms, but the sweep marker, the violet 1.5rem bloom and will-change stay on until T1+2017 ms, around a box that has been teal since #24.
- **Frames + evidence:** #24-#133, #133→#134 · `E/square-tumble-egg/sheets/sheet-01..05`, `state-log.json` rows 28-149
- **Cause:** `demo/scenes/square/useSquareTumble.ts:30` uses the default settle thresholds (1e-3, in degrees) on a 360° spring. `useSquareDemo.ts:283/335` key the marker to `!settled`. `SquareScene.css:204-208` hard-codes `--rainbow-violet`.
- **Fix shape:** Use degree-appropriate thresholds (~0.1°, ~1°/s), or key the marker to the sweep's own progress plus a short timed pulse. Colour the bloom from `--subject-fill`.

### KFA-98 · MEDIUM · The tumble's colour sweep takes off with a one-frame hue snap (teal→magenta) before any rotation
**Surface:** `square-tumble-egg`

- **Observed vs expected:** On the first sweep frame the box jumps from teal to hsl(300…) magenta at rotation 0. The landing is seamless.
- **Frames + evidence:** #9→#10, #151→#152 · `E/square-tumble-egg/state-log.json` rows 27→28
- **Cause:** `demo/scenes/square/useSquareTumble.ts:38` stops are violet → blue → teal. colorAtSpin (`:79-95`) returns stops[0] at t=0.
- **Fix shape:** Make the rest colour stop 0 (teal→violet→blue→teal), or seed stop 0 from the current `--subject-fill`.

### KFA-99 · MEDIUM · Overshooting (back-curve) balls are clipped flat by the tile's paint containment
**Surface:** `easing-gallery-race`

- **Observed vs expected:** During the anticipation dip, the ease-in-out-back ball is cut into a 'D' shape along the pill edge, and the 'ease' ball pushed out by the rail-width bug is clipped too. Forcing content-visibility:visible removes the clip. Confirm amended: ease-in-back is NOT visibly clipped in the banked pair.
- **Frames + evidence:** D#10-23, A#96-99 · `E/easing-gallery-race/11-dip-pair.png`, `11-dip-clipped.png`
- **Cause:** `demo/scenes/easing/EasingTarget.css:113` `.specimen-tile { content-visibility:auto }` implies paint containment.
- **Fix shape:** Drop content-visibility on the tile (the paint walk is already IO-gated), or add inline padding / overflow-clip-margin equal to the maximum overshoot.

### KFA-100 · MEDIUM · Reverse does not reach the easing specimen race (the transport and the ribbon disagree)
**Surface:** `easing-gallery-race`

- **Observed vs expected:** Reverse flips the ribbon visualizer, but the 28 tile balls keep sweeping forward (lin 32.9→45.7, turning at the natural peak).
- **Frames + evidence:** `E/easing-gallery-race/transport.json` 'playing' / 'after Reverse'
- **Cause:** `demo/scenes/easing/EasingScene.vue:89-93` sets only `previewAnim.reversed`. `useEasingDemo.ts:214-215` has no direction term.
- **Fix shape:** Expose a reversed flag that the frame applies (rebased so it stays continuous), and route onToggleReverse to it.

### KFA-101 · MEDIUM · Both picker swaps slide the content vertically: focus() scrolls the overflow:hidden box while it is collapsing
**Surface:** `easing-picker-curve`

- **Observed vs expected:** Close: the reveal is bottom-first ('easing/select/advanced' first, 'fill mode/direction/duration' sliding in from above). Open: the title shows only 'bézier', with 'cubic-' clipped, drifting down.
- **Frames + evidence:** panel-close f008-023, panel-open f012-023 · `E/easing-picker-curve/sheets/panel-close-000-023.png`, `panel-open-000-023.png`, verify-close.mjs (scrollTop 240)
- **Cause:** `demo/components/instrument/transport/channel-controls/ChannelOptions.vue:866, 871` (at kf 3c8199c5): focusBack() / pencil `$el.focus()` without preventScroll, into a ~0 px overflow:hidden `.panel-content`. `TimingFunctionPanel.vue` focusBack does the same.
- **Fix shape:** `focus({ preventScroll: true })` at both sites, optionally deferred to the row's transitionend.

### KFA-102 · MEDIUM · A spring overshoot beyond the 0.18 rail allowance pins the ball flat at the rail end (live ball ~11 frames at ζ 0.2; bouncy derby lane 5 frames at the peak and trough)
**Surface:** `spring-live-solver`, `spring-derby-egg`

- **Observed vs expected:** Live: at ζ=0.2 the ball holds at value -0.18 from +229 to +395 ms while the header reads -0.284, so the numeral and the ball disagree. The Sweep sampler clamps for 2 frames at each extreme even at ζ 0.45. Derby: the bouncy lane holds at exactly 100cqw for 5 frames at the peak and 0cqw for 5 at the trough.
- **Frames + evidence:** live O-low-zeta-tap #11-22, F-play rows 18-19/134-135; derby runB f035-040, f103-107 · `E/spring-live-solver/O-low-zeta-tap/`; `E/spring-derby-egg/runB/zoom-f037-bouncy-pinned.png`
- **Cause:** `demo/scenes/spring/SpringTarget.vue:342-350` OVERSHOOT_ALLOWANCE = 0.18 and railPct clamps to [-0.18, 1.18], below the ζ=0.45 peak (≈1.205) and far below the ζ=0.2 slider floor (≈1.53). The comment at `:339-341` claims otherwise.
- **Fix shape:** Size the band from the worst reachable overshoot at the damping floor, or replace the hard clamp with soft compression (tanh past 1). Use one map for ball, sampler and lanes.

### KFA-103 · MEDIUM · The 'settled' badge and settle pulse fire ~130-650 ms after the ball visibly stops
**Surface:** `spring-live-solver`

- **Observed vs expected:** Confirm amended the range: K ~130-330 ms late, B ~265 ms, H3 ~650 ms. It is driven by an invisible sub-pixel tail (H3 1163.9→1164.1 px over 233 ms).
- **Frames + evidence:** `E/spring-live-solver/` K-reseat-verb +520…+1103 ms, H3 +741…+1391 ms, B rows 56-72
- **Cause:** `demo/scenes/spring/useSpringDemo.ts:24, 40-45` SETTLE = 1e-4 (≈0.075 px on the rail) for both thresholds. The 6 Hz readout throttle (`useSpringHotPath.ts:118-120`) adds up to ~166 ms.
- **Fix shape:** Express the thresholds in visible units (~5e-4 to 1e-3 plus a velocity bound), and reconcile the readout at once on the settled edge.

### KFA-104 · MEDIUM · Selecting the Entry channel auto-starts a 60 Hz loop that paints nothing, and the dock reads 'Pause' (playing) while the stage is at rest
**Surface:** `spring-starting-style-entry`

- **Observed vs expected:** Before the select: 0 style recalcs per 2 s. After selecting Entry: 120 RecalcStyle and 0.161 s of task time per 2 s, with nothing moving. After Pause: 21.
- **Frames + evidence:** `E/spring-starting-style-entry/idle-cost.json`, `02-entry-selected.png`
- **Cause:** `demo/components/instrument/transport/AnimationControlsGroup/useAnimationGroupPlayback.ts:86-88` onSelectAnimation calls `syncPlayState(true)` when the group has not started, which contradicts the scene's `autoPlays:false`.
- **Fix shape:** Do not auto-play on channel select (at least for channels with no painting target), or gate the spring loop on view==='solver'.

### KFA-105 · MEDIUM · The master playhead track is 16 px wider than the row tracks, so the playhead runs ahead of the gates and ends past the balls
**Surface:** `sequence-staggered-rows`

- **Observed vs expected:** The rows and the axis span x 478→1038, but `.seq-playhead-track` spans 478→1054. The playhead is ~8.6 px ahead of row 5's gate when that row starts, and at t=1940 it sits on the stage border, 16 px right of the settled balls and the '1940 ms' tick.
- **Frames + evidence:** seek#47 · `E/sequence-staggered-rows/zoom-end-right.png`, `geometry.json` phTrack [478,1054] vs tracks [478,1038]
- **Cause:** `demo/scenes/sequence/SequencePlayhead.vue:45-49`: an abspos grid child with `inset:0` resolves its inline end to the stage padding edge. `:75` sweeps 100cqw of that wider box.
- **Fix shape:** Make the playhead track an in-flow grid cell (position relative, same grid-row fix as the power-on playhead row), and add a gate asserting its width equals the seq-track width.

### KFA-106 · MEDIUM · The sequence power-on boot plays on a card that is still sliding 229 px sideways from the railless layout collapse
**Surface:** `sequence-power-on-cascade`

- **Observed vs expected:** Arriving from #/cube, the stage moves x 614.4→385 over 0-520 ms (a CSSTransition on controls-layout), a different fractional x every frame. The ruler wipe and the drops of lanes 1-3 play against the card's motion.
- **Frames + evidence:** A-crop f021-050 · `E/sequence-power-on-cascade/C-entry-log.json` t=86-519, `sheets/A-fullframe-context.png`
- **Cause:** `demo/components/instrument/transport/AnimationControlsGroup.css:57` transitions grid-template-columns. `demo/scenes/sequence/SequenceTarget.vue:257` → `useSequenceInstrument.ts:48-57` starts the boot at onMounted.
- **Fix shape:** Start powerOn on the layout's transitionend (with a timeout fallback), or commit the railless track before mount.

### KFA-107 · MEDIUM · When the reel settles, all five balls cut back to the master playhead in one frame
**Surface:** `sequence-reel-egg`

- **Observed vs expected:** A#76→A#77: every ball goes from p=1 (at the far end, full size) to p=0 (faded, near the gates) with no transition.
- **Frames + evidence:** A#76→A#77; B, C, D equivalents · `E/sequence-reel-egg/sheets/A-button-03.png`
- **Cause:** `demo/scenes/sequence/useSequenceDemo.ts:453` `sequence.seek(progress·duration)` in the settle callback.
- **Fix shape:** Tween each ball back to its master-derived p, then hand ownership back.

### KFA-108 · MEDIUM · Each reel ball teleports backwards when its wave starts if the master is not at the origin
**Surface:** `sequence-reel-egg`

- **Observed vs expected:** With the master at 0.5, each wave start snaps its ball to p=0 before the glide (C#1→2, C#5→6, C#10→11).
- **Frames + evidence:** `E/sequence-reel-egg/sheets/C-held-play-00.png`
- **Cause:** `demo/scenes/sequence/useSequenceDemo.ts:445` `child.play()` restarts from 0%.
- **Fix shape:** Seed each reel glide from the ball's current `--ball-p`, or add a short eased rewind.

### KFA-109 · MEDIUM · The dock's staggered onset order is non-monotone: hidden separators and a stray span take nth-child slots, and @mbabb falls outside the ladder
**Surface:** `chrome-dock-expand-collapse`

- **Observed vs expected:** 11 element children, 4 of them display:none. Onsets: Scene 0, Controls 0.16, Panel 0.24, @mbabb 0, Share 0.16, Keyboard 0.08, Theme 0, so the middle @mbabb pops in with the edges. The stagger-swallow row masks this today.
- **Frames + evidence:** seek expand-06..14 (`sheets/seek-expand-0.png`) · `E/chrome-dock-expand-collapse/rt-log.json` row 50 kids
- **Cause:** glass-ui `dist/components/dock/styles/layers.css` ladder (nth-child 2..5, nth-last-child 2..3; `of *` counts hidden nodes). `demo/app/dock/ChromeDock.vue:492, 530, 562, 584` render DockSeparators that overflow="wrap" always hides, plus an empty span.
- **Fix shape:** Producer: a JS `--dock-stagger-index` over visible children. Consumer: stop rendering separators that are always hidden.

### KFA-110 · MEDIUM · During expand the dock's row content paints outside the glass plate (a counter-scaled full-width row over a narrow plate)
**Surface:** `chrome-dock-expand-collapse`

- **Observed vs expected:** From the first reveal frame, the 536 px row sits over bare page on both sides of a plate that is 84-337 px wide.
- **Frames + evidence:** rt #472-479, #45-52; seek expand-02..23 · `E/chrome-dock-expand-collapse/sheets/exp2a.png`
- **Cause:** glass-ui `dist/components/dock/styles/shape.css` counter-scales `.dock-layers` with no clip while morphing. Only DockCrossfade faces are clipped (`crossfade.css`).
- **Fix shape:** Clip `.dock-layers` to the live plate while `[data-morphing]` (clip-path inset from `--dock-size-scale`, or overflow:clip).

### KFA-111 · MEDIUM · Spring overshoot drives the dock's wrap-mode corner radius negative: square corners flash at the end of every expand
**Surface:** `chrome-dock-expand-collapse`

- **Observed vs expected:** With t overshooting to 1.011, border-radius computes to 0px for ~10 frames, then jumps to 24px. The pill→card radius is effectively a step, dropping below 28 px only at t>0.997.
- **Frames + evidence:** rt #490-500, #60-73 · `E/chrome-dock-expand-collapse/rt-log.json` rows 490-500
- **Cause:** glass-ui `dist/components/dock/styles/overflow.css` interpolates from `--radius-pill` (9999px) with an unclamped `--dock-expand-t`.
- **Fix shape:** clamp(0,t,1), and interpolate from the effective pill radius (block-size/2) rather than 9999px.

### KFA-112 · MEDIUM · The dock collapses under a resting pointer after a Scene select, Controls select or @mbabb menu closes
**Surface:** `chrome-dock-menus`

- **Observed vs expected:** Escape with the pointer resting on the trigger: the dock collapses 3322 ms later. In the control run (no menu opened) there was no collapse in 4.5 s. The focus ring rides the collapse (found at confirm).
- **Frames + evidence:** `E/chrome-dock-menus/live-dock.json` A vs B, `sheets/live-dock__A-escape-pointer-still__3200-3900ms.png`
- **Cause:** glass-ui `dist/dock.js` useDockExpansion `release()` always schedules the collapse without checking `:hover/:focus-within` (the modal select swallowed pointerenter). Consumer holds are at `demo/app/dock/ChromeDock.vue:386-389` and `MbabbMenu.vue:320-330`.
- **Fix shape:** Producer (relay): when the hold count reaches 0, re-check `rootEl.matches(':hover, :focus-within')` and do not schedule the collapse if it matches.

### KFA-113 · MEDIUM · The dock collapses behind the open Keyboard-shortcuts modal and the Clear-all dialog, and plays the spilled morph through the backdrop
**Surface:** `chrome-dock-menus`

- **Observed vs expected:** Modal open: the dock collapses at 2513 ms. Dialog open: at 3367 ms. The 'H⌂me' double glyph is visible through the backdrop.
- **Frames + evidence:** `E/chrome-dock-menus/live-hold/live-hold.json`, `sheets/live-hold__shortcuts-modal__2400-3000ms.png` s159-171
- **Cause:** `demo/app/dock/ChromeDock.vue:386-389` holds only for isSelectOpen, and `shortcutsOpen` (`:219, 591, 644`) is never held. `demo/app/dock/MbabbMenu.vue:320-330` holds only while the menu is open, not `confirmClearOpen` (`:183, 255`).
- **Fix shape:** Add shortcutsOpen to the ChromeDock hold, and key MbabbMenu's hold on `open || confirmClearOpen`.

### KFA-114 · MEDIUM · The Share popover opened from the @mbabb menu sits over the menu and hides the Dark-mode row's toggle
**Surface:** `chrome-dock-menus`

- **Observed vs expected:** Confirm amended: the popover opens to the LEFT, level with the Dark-mode row, and its right ~43 px (the clipboard button) intrudes into the menu's leading-icon column, so the Dark-mode toggle glyph is hidden while it is open (same z-index 130, later in the DOM).
- **Frames + evidence:** mbabb-share/open f24-47 · `E/chrome-dock-menus/sheets/mbabb-share__open__24-47.png`
- **Cause:** `demo/components/instrument/shell/SharePopover.vue:59-62` `align="end"` with side-offset 8 (authored for the retired ribbon, `:52`), reused at `demo/app/dock/MbabbMenu.vue:51`.
- **Fix shape:** Add side/align inputs and have the menu site open it clear of the menu edge (collision-padded), or render it as a DropdownMenuSub.

### KFA-115 · MEDIUM · The dark-mode switch is out of sync: the plate snaps dark while label ink fades through the plate's luminance, so Scene and Keyboard vanish mid-swap and @mbabb keeps a light pill
**Surface:** `chrome-dock-menus`

- **Observed vs expected:** The plate is dark from f00. The Home label and keyboard glyph are fully invisible at f06 (56 ms). Share snaps to white. The @mbabb chip keeps its light pill for ~200 ms. The sun→moon icon itself animates correctly.
- **Frames + evidence:** darkmode-toggle/to-dark f00-f10 · `E/chrome-dock-menus/sheets/darkmode-toggle__toDark__00-23.png`, `probe-theme.json`
- **Cause:** `demo/app/dock/ChromeDock.vue:598` and `MbabbMenu.vue:73` do not pass `disable-transitions` (the default is false, glass-ui `dist/dark-mode-toggle.js:11`), so the dock-control colour transitions run on the theme flip.
- **Fix shape:** Pass `disable-transitions` at both sites, with a producer-side exemption for the toggle's own icon transform, or swap the theme through a view transition.

### KFA-116 · MEDIUM · Opening or closing the controls rail slices the pane cards with a hard vertical edge instead of moving them
**Surface:** `controls-pane-drawer`

- **Observed vs expected:** The fixed-width content is cropped by the moving track for the whole 450 ms: the cards lose their right border, radius and shadow, and controls are cut mid-word ('alte', '0m', half a Reverse button). Nothing slides.
- **Frames + evidence:** seek close #4-20, open #4-40; rt A #43-62, #158-182 · `E/controls-pane-drawer/detail-clip-open16-close10.png`
- **Cause:** `demo/components/instrument/transport/AnimationControlsGroup.css:51-57, 64-66` (grid-template-columns transition), `controls-pane/ControlsPaneWrapper.css:92-93` (overflow hidden), `:133` (content fixed at --rail-width).
- **Fix shape:** Register `--rail-track` as an @property length and transition it, then translate the content with it (`translateX(calc(var(--rail-track) - var(--rail-width)))`), or feather the clip edge with a mask.

### KFA-117 · MEDIUM · The first switch to the Keyframes tab freezes the page for ~333 ms and shows an empty pane
**Surface:** `controls-pane-drawer`

- **Observed vs expected:** On key '2': one 333 ms rAF gap, during which the pane shows only the ribbon card with a blank editor area and the cube stops. The Controls panel vanishes with no exit.
- **Frames + evidence:** rt B #485→#486, #487-489 · `E/controls-pane-drawer/detail-tabswap-485-488-524-527.png`, `rt-log.json` t=17868.8
- **Cause:** `demo/components/instrument/transport/channel-controls/ChannelControls.vue:99-111` keeps Monaco mounted behind content-visibility. On first reveal `composables/useKeyframesPaneReveal.ts:123-135` focuses it and Monaco lays out every line in one task. The Controls panel is a plain v-if (`:68`).
- **Fix shape:** Do the first Monaco layout during the idle warm, and cross-fade the tab panels.

### KFA-118 · MEDIUM · When the Keyframes tab auto-shows the rail, the content slides in from the left offset ~235 px instead of the normal reveal
**Surface:** `controls-pane-drawer`

- **Observed vs expected:** With the rail closed, '2' reopens it, but `.controls-pane` starts at scrollLeft 235.5 and the content at x -192, with its left side cut off, until the track reaches full width. The Controls and Timeline tabs reveal left-anchored.
- **Frames + evidence:** rt C #803-819 · `E/controls-pane-drawer/detail-autoshow-C803-819.png`, `autoshow-scroll.json`
- **Cause:** `demo/components/instrument/transport/channel-controls/composables/useKeyframesPaneReveal.ts:134` `node.focus()` without preventScroll while the track is ~0 px wide, inside an overflow:hidden pane (`ControlsPaneWrapper.vue:41`, see the latch row).
- **Fix shape:** `node.focus({ preventScroll: true })`, or focus on the rail's transitionend.

### KFA-119 · MEDIUM · The first switch to the Timeline tab leaves a blank pane for 2-3 frames and the ribbon card jumps up ~190-260 px and back
**Surface:** `controls-pane-drawer`, `timeline-panel`

- **Observed vs expected:** The old panel vanishes at once. The ribbon (Snapshot/Import/Export) jumps to the top of the pane for 1-3 frames, then snaps back down when the async timeline card appears and fades in. On re-open with the chunk cached there are still 2 empty frames.
- **Frames + evidence:** controls-pane rt B #524→#527; timeline A-enter f011-017, A2-reenter f015-023 · `E/controls-pane-drawer/rt-log.json` (h160→554.9); `E/timeline-panel/sheet-A-enter-00.png`
- **Cause:** `demo/components/instrument/transport/channel-controls/ChannelControls.vue:156-171`: v-if plus re-key with an enter-only animate-in around the defineAsyncComponent KeyframeTimeline (`:207`), with no leave and no reserved height.
- **Fix shape:** Keep the timeline mounted and toggle it (like the keyframes pane), or preload the chunk and use an out-in Transition with a min-height hold.

### KFA-120 · MEDIUM · The timeline preview subject is not fitted to its stage: a 225 px cube clone is centre-cropped in a 96/160 px stage
**Surface:** `timeline-panel`

- **Observed vs expected:** The stage shows a slab of one or two faces with the numeral cut at the edge, and under a rotateX scrub it collapses to an edge-on sliver. Confirm lowered this from HIGH: the engine does paint correct poses into it.
- **Frames + evidence:** I1-scrub f000-050 · `E/timeline-panel/B-rest-pane.png`, `probe2-timeline.png`, probe6
- **Cause:** `demo/components/instrument/timeline/KeyframeTimeline.vue:170-176` (a fixed h-24/h-40 stage with overflow-clip and no fit scale). createPreviewSubject (`utils/timelineEngine.ts`) clones at scene size.
- **Fix shape:** Wrap the clone in a fit container scaled by min(stageW,stageH)/subjectDiagonal (resized by a ResizeObserver), keeping the engine's transform on the inner subject.

### KFA-121 · MEDIUM · After a (re)build the timeline preview shows a stale cloned scene pose that disagrees with the playhead until the first scrub
**Surface:** `timeline-panel`

- **Observed vs expected:** Right after Import (playhead 0% = rotateX(0)), the preview keeps the scene pose captured at clone time (rotateX(324°)…). It snaps on the first scrub. Found at confirm: the empty state also shows a frozen, unrelated clone.
- **Frames + evidence:** `E/timeline-panel/I0-after-import-pane.png`, `capture-import-log.json` afterImport.inl vs I1[0].inl
- **Cause:** `demo/components/instrument/timeline/KeyframeTimeline.vue:438-443` only calls setTargets on rebind. The clone copies the source's inline transform.
- **Fix shape:** After setTargets, call `scrub(scrubT.value)`, and strip the source's inline transform from the clone.

### KFA-122 · MEDIUM · Collapsing the expanded timeline stalls: 280 ms and 216 ms paint gaps mid-fade
**Surface:** `timeline-panel`

- **Observed vs expected:** Only 18 frames arrive in 750 ms, with gaps f013→f014 (102→382 ms) and f016→f017 (398→614 ms) falling mid-fade. Expand is smooth.
- **Frames + evidence:** H-collapse f012-017 · `E/timeline-panel/sheet-H-collapse-00.png`
- **Cause:** PLAUSIBLE, not bisected: three instances teleport back at once (see the 3-timelines row), each re-running animate-in and re-laying out its editor and clone (`ChannelControls.vue:167`, `AnimationControlsGroup.vue:96-97`).
- **Fix shape:** Fix the 3-instance teleport, then re-measure. Defer the editor re-layout, and do not re-trigger animate-in on Teleport moves.

### KFA-123 · MEDIUM · Keyframe card layout at rest: the offset chip truncates ('0…'), the ✕ overlaps the CSS text, and a label box steals clicks on the CSS line
**Surface:** `keyframes-editor-cards`

- **Observed vs expected:** The chip shows '0…/5…/1…'. The ✕ overlaps the trailing ';'. Clicking the word 'transform' hits `DIV.labeled-field`, so the caret is not placed (probe7).
- **Frames + evidence:** `E/keyframes-editor-cards/rest-editor.png`, `probe-spring.png`, A #0
- **Cause:** `demo/components/instrument/keyframes/components/KeyframeCard.vue:76` (`w-16 text-ellipsis aspect-square`), `:132` (absolute cluster at top-2 right-4).
- **Fix shape:** Size the chip to its content, move the cluster into the grid flow, and keep the labeled-field box off the pre row.

### KFA-124 · MEDIUM · Re-clicking Copy during the pulse is swallowed: a second copy within 200 ms gets no visual feedback
**Surface:** `copy-button-feedback`

- **Observed vs expected:** A double-click (the second click at +80 ms) produces one 200 ms curve with no restart. The clipboard is written twice.
- **Frames + evidence:** live #71-82 · `E/copy-button-feedback/meta.json` sampler 'double'
- **Cause:** `demo/components/CopyButton/CopyButton.vue:114` `void group.value?.play()`. `src/animation/internal/transport-core.ts:16` returns the pending promise while it is running.
- **Fix shape:** reset()/stop() then play() on each click, or re-arm the hold timer (from the copied-blink row).

### KFA-125 · LOW · The Amiga contact shadow spills past the floor edge at the apex near a wall (it is not clipped to the room floor)
**Surface:** `amiga-contact-shadow`

- **Observed vs expected:** At the apex near the left wall (px -4.72) the blob (scale 1.9, radius ~2.47 u) reaches past the floor's x=-6 edge onto the void. Opacity is 0.12.
- **Frames + evidence:** #294-306, and symmetric at #102-110 · `E/amiga-contact-shadow/detail-shadow-edges.png`
- **Cause:** `demo/scenes/amiga/useAmigaThree.ts:230-240` PlaneGeometry(2.6) scaled by lerp(1,1.9) at `AmigaScene.vue:412`. 5+1.3·1.9 = 7.47 > 6.
- **Fix shape:** Clamp the scale so |x|+1.3s ≤ 6, fade with wall distance, or clip in the material.

### KFA-126 · LOW · Pausing the Amiga freezes the ball in place, while the documented T.A8 settle-home is reachable only by a race (the spec is undecided)
**Surface:** `amiga-boing-composite`

- **Observed vs expected:** On 2 of 2 pauses the rendered pose froze where it was and never settled home. Resume is continuous. Confirm amended: the race is inferred from the code, and the evidence shows a consistent hold, so hold-on-pause versus home-on-stop needs a decision.
- **Frames + evidence:** `E/amiga-boing-composite/samples.json` after the PAUSE marks (+17211, +23013 ms), `shots/02-paused-0..4.png`
- **Cause:** `demo/scenes/amiga/AmigaScene.vue:339-344`: `scrubbed = !playing && poseMoved()` wins over `wasPlaying ? 'home'`.
- **Fix shape:** Take the pause/stop edge explicitly from the transport, and decide hold versus home in one place.

### KFA-127 · LOW · Occasional long frames (33-66 ms) during live Amiga playback
**Surface:** `amiga-boing-composite`

- **Observed vs expected:** Recomputed at confirm: 12 of 1451 deltas are over 20 ms, including 66.5 ms at the play start and 50.7/50.1 ms. There is no visible snap.
- **Frames + evidence:** `E/amiga-boing-composite/samples.json` +101, +5701, +5934 ms
- **Cause:** Not isolated. Suspects: the always-on present loop (`demo/scenes/amiga/useAmigaThree.ts:287-318`) and the per-frame panel sync.
- **Fix shape:** Profile the long frames, starting with Vue reactive work in the panel sync.

### KFA-128 · LOW · The Amiga glide step is timed with performance.now() when tickGlide runs, not the rAF frame time (a ±7% per-frame ripple)
**Surface:** `amiga-sphere-spin-gesture`

- **Observed vs expected:** Steps after release on an even 16-17 ms clock: 53.6, 56.7, 53.8 … 43.7, 46.8, 42.8 mrad. Not visible by eye.
- **Frames + evidence:** `E/amiga-sphere-spin-gesture/p1b-flick-cast/probe.json` +14…+400 ms
- **Cause:** `demo/scenes/amiga/useSphereSpin.ts:205`.
- **Fix shape:** Pass the frame timestamp into tickGlide and angularVelocity.

### KFA-129 · LOW · The Amiga release impulse uses only the last pointer sample, so the coast length depends on event-timing jitter
**Surface:** `amiga-sphere-spin-gesture`

- **Observed vs expected:** omega jumps 3.92→6.78→3.60 rad/s during an even drag. Confirm amended: that spike came from the harness's CDP event cadence and the real release was unaffected. This stays as a robustness defect.
- **Frames + evidence:** p1b-flick-cast f28-36 · `E/amiga-sphere-spin-gesture/p1b-flick-cast/probe.json`
- **Cause:** `demo/scenes/amiga/useSphereSpin.ts:155-156` (the velocity of the last event only).
- **Fix shape:** Use an EMA or least-squares slope over FLICK_WINDOW_MS.

### KFA-130 · LOW · Amiga Home snaps the ball back to rest in one frame, with no transition
**Surface:** `amiga-sphere-spin-gesture`

- **Observed vs expected:** The offset goes (0.79, 1.36)→(0,0) between f29 and f30.
- **Frames + evidence:** p3-keys f28-30 · `E/amiga-sphere-spin-gesture/p3-keys/probe.json`
- **Cause:** `demo/scenes/amiga/useSphereSpin.ts:270-275` rest() zeroes the offset.
- **Fix shape:** A decay glide or ~300 ms slerp home, snapping under reduced motion.

### KFA-131 · LOW · Cube compositor promotion during play never fires: `isPlaying` has no writer
**Surface:** `home-landing-cube`, `cube-roll-egg`

- **Observed vs expected:** `.cube`'s will-change is 'auto' while playing, so the `.idle-hover.playing .cube` rule never matches (the roll seat saw the missing class too). No blur was observed.
- **Frames + evidence:** `E/home-landing-cube/report.json` playing.chain[0]
- **Cause:** `demo/scenes/cube/CubeScene.vue:61-71` `const isPlaying = ref(false)` with no writer, bound at `CubeTarget.vue:22`.
- **Fix shape:** One playing-state writer from the shell binding (the same machine-derived authority as the orbit-layer row).

### KFA-132 · LOW · The aurora's resume() clock resets to t=1 s instead of continuing, so the field snaps back after every pause, tab-hide or off-screen resume
**Surface:** `home-hero-aurora`

- **Observed vs expected:** After a resume the frame matches renderAt(1.03), not the ~6 s elapsed (a one-frame max diff of 19/255). It shows only at 0.1 presence here, but the same code runs under every glass-ui canvas.
- **Frames + evidence:** `E/home-hero-aurora/results.json` resumeSnap
- **Cause:** glass-ui 7.0.0 `dist/createCanvasLifecycle-DbXRwjU_.js:142-145` (`g = performance.now() - 1e3`) and `:135`.
- **Fix shape:** Producer (relay): store the paused elapsed time and rebase `g = now - pausedAt`.

### KFA-133 · LOW · The aurora placeholder ground does not match the first canvas frame, so arming cross-dissolves between two different compositions
**Surface:** `home-hero-aurora`

- **Observed vs expected:** The 8×8 LUT placeholder is a banded blue→violet strip. The canvas that fades in has a dark lobe top-left and pink top-right.
- **Frames + evidence:** arm m010-040 · `E/home-hero-aurora/sheets/arm-banded-vs-smooth.png`
- **Cause:** glass-ui `dist/aurora.js:2684-2730` (the placeholder is built from the LUT, not the nuclei field) plus the `.aurora-canvas-layer` opacity transition.
- **Fix shape:** Producer (relay): bake the placeholder from the field at t=0, or snapshot the first frame.

### KFA-134 · LOW · The hero wave's claimed in-content pause (`--motion-weight: 0`) cannot be reached from any UI, so the infinite wave can only be stopped by OS reduced-motion
**Surface:** `home-animated-text`

- **Observed vs expected:** No setter exists in the demo or src (glass-ui's writeVelocityWeight floors at 0.618 on the pressed element). Reduced motion does still it.
- **Frames + evidence:** `E/home-animated-text/prm.png`; grep
- **Cause:** `demo/components/instrument/shell/AnimatedText.vue:128-137, 165`.
- **Fix shape:** Have an app motion control set `--motion-weight:0` on the start screen, or fix the comment.

### KFA-135 · LOW · An external WAAPI pause or seek (DevTools, `getAnimations().pause()`) on the typing dots is undone by the engine's shadow tick
**Surface:** `home-typing-dots`

- **Observed vs expected:** After pause() the playState reads 'running' two rAFs later, and currentTime drifts 16-42 ms.
- **Frames + evidence:** `E/home-typing-dots/verify.json` out[0..4]
- **Cause:** `src/animation/waapi/delegation.ts:65-72` reconcile calls `wa.play()` whenever the engine is not paused.
- **Fix shape:** Treat an externally paused animation as an engine pause, or document that delegated animations are engine-owned.

### KFA-136 · LOW · Scene-swap direction types are derived but nothing consumes them: the swap would be the bare UA 250 ms fade plus a 34 px incidental morph
**Surface:** `scene-swap-transition`

- **Observed vs expected:** Types forward/backward are passed. All 10 pseudo animations are UA defaults (effect linear, keyframes 'ease'). The scene group morphs 878→912 px because the host resizes.
- **Frames + evidence:** `E/scene-swap-transition/CF-seek-cold-cube-to-amiga/seek.json` anims
- **Cause:** `demo/app/transition/useSceneTransition.ts:62-88`. glass-ui `view-transition.css` styles only `route` types (not verified independently).
- **Fix shape:** Land the glass-ui typed scene recipe, or drop the dead derivation, and keep host geometry stable.

### KFA-137 · LOW · The skeleton sheen's opaque `--muted` base hides the Card's glass, so the placeholder's material is not the scene plate's
**Surface:** `scene-skeleton-shimmer`

- **Observed vs expected:** The plate is translucent glass (alpha 0.664), but the Skeleton child fills it with opaque rgb(246,243,239), so it reads as a matte slab.
- **Frames + evidence:** seek f00, f35-47 · `E/scene-skeleton-shimmer/meta.json` probe
- **Cause:** `demo/app/App.skeleton.vue:117-124` stretches the primitive, and the producer `.skeleton` paints `var(--muted)`.
- **Fix shape:** Set `background: transparent` on `.scene-skeleton__sheen` and keep only the ::after band.

### KFA-138 · LOW · The cube Matrix channel is inert on a fresh load (identity → identity), so selecting 'Matrix' changes nothing
**Surface:** `cube-group-spin-matrix-bob`

- **Observed vs expected:** `.cube-pose` stays at identity for all 180 frames.
- **Frames + evidence:** `E/cube-group-spin-matrix-bob/live/log.json` distinct.pose=1, `live/03-matrix-selected.png`
- **Cause:** `demo/scenes/cube/matrix-editor/useTransformState.ts:89-90`.
- **Fix shape:** Seed a demo endpoint, or disable 'Matrix' until an endpoint exists.

### KFA-139 · LOW · Boot artefacts: a loader sliver inside the 3D die, and a page-wide webfont swap mid-settle
**Surface:** `cube-group-spin-matrix-bob`

- **Observed vs expected:** f0004: a violet ellipse cuts through face 1 (the Loader2 inside preserve-3d). f0007→f0008: the glyphs swap page-wide (confirm amended: the panel labels and buttons swap too, not only the numeral).
- **Frames + evidence:** live f0004-0008 · `E/cube-group-spin-matrix-bob/live/sheet-live-00.png`
- **Cause:** `demo/scenes/cube/CubeTarget.vue:56-66` (the loader in the 3D chain); an app-shell font-display swap.
- **Fix shape:** Mount the loader outside the 3D chain (or delete it, as in the dead-loader row), and preload the fonts or gate first paint on document.fonts.ready.

### KFA-140 · LOW · The roll egg's front-loaded easing strobes: 50-75° per frame in the first ~250 ms
**Surface:** `cube-roll-egg`

- **Observed vs expected:** The first step is 27/34° (roll 1), ~71°/frame (roll 2), so the face set changes almost every frame. The frames stay crisp.
- **Frames + evidence:** #33-47, #141-160, #251-265 · `E/cube-roll-egg/trace.json`
- **Cause:** `demo/scenes/cube/CubeTarget.vue:303-316`: ease-out-back over a fixed 1100 ms regardless of arc.
- **Fix shape:** A bounded-slope curve for the spin, or a duration scaled to the arc.

### KFA-141 · LOW · The roll's ROLL_FACES table does not decide the face shown, because the roll wraps the running group's pose and spin
**Surface:** `cube-roll-egg`

- **Observed vs expected:** Roll 3 targets face 5 and lands showing face 4. After landing the inner spin keeps turning ~40° in 400 ms, so the rolled face is presented only briefly (found at confirm).
- **Frames + evidence:** #206-215, #306-335 · `E/cube-roll-egg/sheet-12.png`, `sheet-13.png`
- **Cause:** `demo/scenes/cube/CubeTarget.vue:18-37` (`.idle-hover` is outside bob/pose/spin), `:272-279`.
- **Fix shape:** Drop the 'face N' claim, or compute the landing from the inverse inner pose (or hold the group during the roll).

### KFA-142 · LOW · Every die face is translucent (alpha 0.8), so the axis strokes and grid show through what should be an opaque die
**Surface:** `cube-roll-egg`, `cube-axis-lines`

- **Observed vs expected:** The dashed axes and the background grid are visible through faces 3 and 4 at about 20%. Confirm amended the axis-lines paint-order claim: this is mostly translucency. Whether the locked X stroke's stronger show-through is a depth-sort problem is undecided (found at confirm).
- **Frames + evidence:** `E/cube-roll-egg/frames/f0100.jpg`, `recon-rest.png`; `E/cube-axis-lines/x-held-full.png`
- **Cause:** `demo/styles/style.css:199-205` defines `--face-1..6` with alpha 0.8.
- **Fix shape:** Add an opaque base layer under the tinted faces.

### KFA-143 · LOW · Axis lock-in opens with a discrete dashed→solid pop before the eased brighten
**Surface:** `cube-axis-lines`

- **Observed vs expected:** sc-018→019: the stroke goes solid while `--axis-active` is still 0 (~15% of the change in one frame).
- **Frames + evidence:** `E/cube-axis-lines/strip-sc-xdown1-0.png`, seek x-in-00
- **Cause:** `demo/scenes/cube/CubeAxisLines.vue:139`.
- **Fix shape:** The same crossfade as the release-snap row.

### KFA-144 · LOW · When forced visible, the cube spinner is a centre-plane child of the tumbling `.cube`: it flattens edge-on and shows as a dark smear through the faces
**Surface:** `cube-loader-spin`

- **Observed vs expected:** It collapses to a sliver at s12/13 and s20/21, and elsewhere it is a muddy ring behind the numerals. This matters only if the loader is kept.
- **Frames + evidence:** `E/cube-loader-spin/sheet-step-00-23.png`, `sheet-live-024.png`
- **Cause:** `demo/scenes/cube/CubeTarget.vue:56-63`.
- **Fix shape:** Hoist it to a flat overlay sibling of `.graph`.

### KFA-145 · LOW · The Square tour's loop boundary repeats a frame and drifts the period by 1-2 frames per iteration
**Surface:** `square-tour`

- **Observed vs expected:** t=2000 and t=0 paint identical poses on consecutive frames (3 frames at rotate 360), and the periods measure 2017-2033 ms. The ease-in-out dwell masks it, but a linear easing would hitch. (The same engine clamp drives the Amiga Y drift found at confirm.)
- **Frames + evidence:** `E/square-tour/capture.json` samples 146-149, 268-271, 632-635
- **Cause:** `src/animation/engine/play-lifecycle/frame.ts:130-135`: when t ≥ duration it clamps to duration, and onEnd clears startTime (`:64-79`), discarding the overshoot.
- **Fix shape:** On non-final iterations, advance startTime by exactly the duration, carry the overshoot into t, and paint the wrapped pose in the same frame.

### KFA-146 · LOW · Two 33 ms dropped frames in the first ~350 ms of Square Play
**Surface:** `square-tour`

- **Observed vs expected:** Samples 27→28 and 44→45 are 33.3 ms. The will-change flip lands at sample 27.
- **Frames + evidence:** `E/square-tour/capture.json` samples 26-46; live L14→L15
- **Cause:** Unproven. Likely layer promotion on the mode flip (`demo/scenes/square/SquareScene.css:124-128`).
- **Fix shape:** Profile the play edge, and pre-promote on hover or focus-within.

### KFA-147 · LOW · Each tap of the double-tap flashes the Square drag affordances (grab-pulse ring, drag mode, will-change)
**Surface:** `square-tumble-egg`

- **Observed vs expected:** A one-frame thin violet ring on #9 and #151, with mode=drag and the DRAG class.
- **Frames + evidence:** `E/square-tumble-egg/state-log.json` rows 26, 231; `sheets/sheet-00.png`, `sheet-06.png`
- **Cause:** `demo/scenes/square/SquareScene.vue:390-404` captureFrame sets mode 'drag' on every pointerdown.
- **Fix shape:** Arm the drag visuals only after MOVE_TOLERANCE.

### KFA-148 · LOW · The Square tumble is not on the transport: Pause does not stop it and the scrubber does not show it (an intended egg, recorded because of the owner's "not wired")
**Surface:** `square-tumble-egg`

- **Observed vs expected:** The spin loop is independent of the transport. Its only real harm is the Play-mid-tumble collision row.
- **Frames + evidence:** #168-281 · `E/square-tumble-egg/state-log.json`
- **Cause:** `demo/scenes/square/useSquareDemo.ts:377-382` (no-op getProgress/setProgress), by design per `SquareScene.vue:137-141`.
- **Fix shape:** Owner call: gate the spin loop on Pause/Play, or leave it as an egg and just resolve the collision.

### KFA-149 · LOW · The picker's travel-dot layer does not exist on this surface, yet the comment describes a clock that runs
**Surface:** `easing-picker-curve`

- **Observed vs expected:** With `:playback="false"` there is no travel dot or control, and 0 picker animations over 3 s of Play. Picker edits do reach the scene live. This is documentation drift.
- **Frames + evidence:** `E/easing-picker-curve/meta.json` parts.C
- **Cause:** `demo/scenes/easing/EasingSidebar.vue:31-39`.
- **Fix shape:** Reword the comment.

### KFA-150 · LOW · The TimingFunctionPanel header wraps: 'cubic-/bézier' on two lines plus a two-line disclosure
**Surface:** `easing-picker-curve`

- **Observed vs expected:** The h3 is 189×79 px over two lines, the disclosure wraps, and the readout wraps its final '1)'.
- **Frames + evidence:** `E/easing-picker-curve/E-cube-detail-open-rest.png`, `A-rest-zoom.png`
- **Cause:** `demo/components/instrument/transport/channel-controls/TimingFunctionPanel.vue:14-40`.
- **Fix shape:** A smaller title token, the disclosure on its own line or truncated.

### KFA-151 · LOW · The spring x/v readout and the badge lag the start of motion by 150-235 ms
**Surface:** `spring-live-solver`

- **Observed vs expected:** The ball is mid-flight while x reads 0.000 (first update at tap+218-235 ms). The badge still read 'settled' at +53/+120 ms. The Sweep readout shows the same effect (found at confirm).
- **Frames + evidence:** B-tap-030 #1-7, F2-play-pill #1-11 · `E/spring-live-solver/`
- **Cause:** `demo/scenes/spring/useSpringHotPath.ts:48, 105, 117-120`: the time gate means the first flush publishes the value from before the motion.
- **Fix shape:** Flip liveSettled at once on the chase-arm edge, and flush on the first frame with dt>0.

### KFA-152 · LOW · One unattributed 183-317 ms long frame ~220 ms after the first settle pulse following load
**Surface:** `spring-live-solver`

- **Observed vs expected:** B row 88 (183 ms) and M row 89 (317 ms). The LoAF has no script, style or layout cost. Confirm amended: the filter-raster hypothesis is weak, and a screencast or GC artefact is equally likely.
- **Frames + evidence:** `E/spring-live-solver/meta4.json` loafFirstTap
- **Cause:** Unattributed. Suspect `demo/scenes/spring/SpringTarget.vue:734-771` (a drop-shadow pulse).
- **Fix shape:** Re-measure without the screencast before changing anything.

### KFA-153 · LOW · Derby lane balls freeze during the 220 ms exit fade while the field is still settling
**Surface:** `spring-derby-egg`

- **Observed vs expected:** Lane transforms freeze once derbyActive clears, while the live ball keeps moving (~2-3 px offset).
- **Frames + evidence:** runA sampler #145-159 · `E/spring-derby-egg/runA/samples.json`
- **Cause:** `demo/scenes/spring/SpringTarget.vue:173, 372-382, 413-416`: the ref callback deletes the map entry when it receives null, before the leave.
- **Fix shape:** Remove entries on @after-leave instead.

### KFA-154 · LOW · Heatmap drag start: the first write glides for one frame, then the stream switch cancels the transition and the marker jumps ~240 px
**Surface:** `spring-physics-facet`

- **Observed vs expected:** 292.9→270.4 (glide), then 30.8 px with is-streaming. A stall can flip it back to glide mid-drag.
- **Frames + evidence:** `E/spring-physics-facet/B_heatmap_drag/rafLog.json` t=199→250, 899-950
- **Cause:** `demo/scenes/spring/SpringHeatmap.vue:319-333` (streaming decided by wall clock; lastWriteAt starts at -Infinity), `:592-593`.
- **Fix shape:** Set streaming on pointerdown and hold it until pointerup.

### KFA-155 · LOW · The heatmap readout renders ζ as an uppercase 'Ζ' and wraps onto two lines ('0.50 S / Z' / '0.86')
**Surface:** `spring-physics-facet`

- **Observed vs expected:** text-transform uppercase. Confirm added the wrap.
- **Frames + evidence:** `E/spring-physics-facet/probe-00-load.png`
- **Cause:** `demo/scenes/spring/SpringHeatmap.vue:19-23` (`text-mono-caption`).
- **Fix shape:** `.code-token` with tabular-nums (as in SpringTrace), plus nowrap.

### KFA-156 · LOW · The Physics facet is mounted twice (the second copy is 0×0), and both copies register a 60 Hz painter
**Surface:** `spring-physics-facet`

- **Observed vs expected:** 2 heatmaps, 2 editors, 8 preset balls, and 20 editor mutations per scrub step.
- **Frames + evidence:** `E/spring-physics-facet/meta.json` onScreen.facetCount=2
- **Cause:** `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue:77-84` → `ChannelControls.vue:35-37`, and `SpringPhysicsFacet.vue:188-200` registers the painter.
- **Fix shape:** Render the slot only in the active wrapper, or gate the painter on layout.

### KFA-157 · LOW · The ribbon Reveal/Dismiss verb for the Entry card is below the fold at 1440×900
**Surface:** `spring-starting-style-entry`

- **Observed vs expected:** The ribbon twin is at y≈1212. Only the in-card button is visible.
- **Frames + evidence:** `E/spring-starting-style-entry/02-entry-selected.png`
- **Cause:** `demo/scenes/spring/SpringScene.vue:218-237`.
- **Fix shape:** Retire the twin (the in-card verb is canonical), or lift it.

### KFA-158 · LOW · The Entry card is 2.5 px taller than its stage, and its from-state crowds the Dismiss button
**Surface:** `spring-starting-style-entry`

- **Observed vs expected:** The stage is 112 px and the card 114.47 px. At the from-state the card bottom sits 4.4 px above the button, with its shadow underneath.
- **Frames + evidence:** A f00-03 · `E/spring-starting-style-entry/R-out.json` geoOpen
- **Cause:** `demo/scenes/spring/StartingStyleTarget.vue:243-246` (`min-height:7rem`), `:327`.
- **Fix shape:** Raise the stage floor to ~9-10rem, or cap the artifact block lower.

### KFA-159 · LOW · The sequence master scrub ball and its glow are clipped by the card at both rail ends
**Surface:** `sequence-staggered-rows`

- **Observed vs expected:** The 36 px ball is centred at 385/1055, and the card clips at 368/1072.
- **Frames + evidence:** seek#0, seek#47 · `E/sequence-staggered-rows/zoom-end-right.png`, `geometry.json`
- **Cause:** `demo/scenes/sequence/SequenceTarget.vue:16` (overflow-x hidden), `SequenceScrubber.vue:222-223`.
- **Fix shape:** Inset the rail by the ball radius plus the glow.

### KFA-160 · LOW · A fresh sequence Play from the settled end hard-snaps all five balls back to the origin in one frame
**Surface:** `sequence-staggered-rows`

- **Observed vs expected:** rAF 195→196: every ball jumps 350-560 px back to its (mis-scaled) rest position.
- **Frames + evidence:** `E/sequence-staggered-rows/capture-log.json` samples 195-196
- **Cause:** `demo/scenes/sequence/useSequenceDemo.ts:272` fresh-play branch.
- **Fix shape:** A short eased rewind, or document it as intended.

### KFA-161 · LOW · When the power-on boot class is removed, the sequence rows re-rasterise (a one-frame antialiasing change)
**Surface:** `sequence-power-on-cascade`

- **Observed vs expected:** The end frame and the rest frame differ by 9017 px. Confirm amended: this is an antialiasing change with no geometric shift, possibly below perception.
- **Frames + evidence:** `E/sequence-power-on-cascade/sheets/diff-end800-vs-rest.png`, `zoom-label2-end800-left-vs-rest-right.png`
- **Cause:** `demo/scenes/sequence/SequenceTarget.css:271-273, 283-286` (the composited drop), `useSequenceInstrument.ts:53-56`.
- **Fix shape:** Drop via opacity/clip or an inner wrapper, or snap the rows to whole pixels.

### KFA-162 · LOW · Firing the reel while the master plays leaves it stopped, with the badge reading READY mid-rail
**Surface:** `sequence-reel-egg`

- **Observed vs expected:** The master is playing at 366 ms, pauses at 450 ms, and stays paused. The badge says READY, not PAUSED.
- **Frames + evidence:** `E/sequence-reel-egg/transport.json` T6
- **Cause:** `demo/scenes/sequence/useSequenceDemo.ts:424-427` (`playHeldByReel = false`).
- **Fix shape:** `playHeldByReel = isPlaying.value` before the pause.

### KFA-163 · LOW · Select dropdown content never slides: its translate is pinned at `0 4px`, while menus and popovers slide 8 px
**Surface:** `chrome-dock-menus`

- **Observed vs expected:** All 96 samples read `0px 4px`. Only opacity, scale and blur move.
- **Frames + evidence:** `E/chrome-dock-menus/capture-scene-select.json` vs `capture-mbabb-menu.json`
- **Cause:** The glass-ui SelectContent class `data-[side=bottom]:translate-y-1` (`dist/select-*.js:198`) beats `reveal.css`.
- **Fix shape:** Producer (relay): drop the translate utilities and use sideOffset.

### KFA-164 · LOW · Occasional 1-4 frame hitches ~100 ms into an overlay's enter (mostly within baseline noise)
**Surface:** `chrome-dock-menus`

- **Observed vs expected:** 5 drops in 15 reps. Confirm amended: 34 ms drops also happen at rest with no overlay open. Only the single 66.8 ms stall stands out.
- **Frames + evidence:** `E/chrome-dock-menus/live-raf.json`, `live-dock.json` B
- **Cause:** Unattributed (suspect: the `reveal.css` filter transition).
- **Fix shape:** Trace the first open before changing anything.

### KFA-165 · LOW · The Reset glyph twist is two beats: it stops dead at the mirrored pose, then kicks again
**Surface:** `transport-dock`

- **Observed vs expected:** It decelerates to exactly -180° and holds the mirrored arrow (#4-#10), then kicks at ~33°/frame.
- **Frames + evidence:** step twist #00-35 · `E/transport-dock/sheets/step-twist-00.png`
- **Cause:** `demo/components/instrument/transport/TransportDock/useIconSpin.ts:29-40` (the 40% stop plus per-interval easeOutCubic).
- **Fix shape:** Make rotateY a single 0→100% interval, with the scale dip on its own track.

### KFA-166 · LOW · Boot posture: the transport mounts expanded and never idle-collapses until it is first hovered
**Surface:** `transport-dock`

- **Observed vs expected:** Expanded for 10 s with no interaction.
- **Frames + evidence:** rt #0-254 · `E/transport-dock/rt-log.json`
- **Cause:** `demo/components/instrument/transport/TransportDock.vue:20-22` (TD-5, a documented no-op).
- **Fix shape:** Settle it with the RR-1 M#4 batch.

### KFA-167 · LOW · The Select's progress rings show identical progress on all channels and snap 1→0 at the loop boundary
**Surface:** `transport-dock`

- **Observed vs expected:** Rotations, Matrix and Hover show the same `--dot-p`, and the rings reset under 'alternate'. Intent is unverified.
- **Frames + evidence:** psel #11→#12 · `E/transport-dock/psel-log.json`
- **Cause:** `demo/components/instrument/transport/TransportDock.vue:312-315` (the upstream source is unconfirmed).
- **Fix shape:** Confirm the intent, then key progress per channel and make it direction-aware.

### KFA-168 · LOW · The glass-ui `--spring-smooth` curve jumps to its end value in the final frame (a 4× velocity spike)
**Surface:** `controls-pane-drawer`

- **Observed vs expected:** Close: 13.7→10.9→0 px. The last segment's slope is 0.0111 against 0.0027. Confirm lowered this from MEDIUM (it is visible only when measured).
- **Frames + evidence:** seek close #44-47, open #44-47 · `E/controls-pane-drawer/sheets/seek-close-24-47.png`
- **Cause:** glass-ui `dist/styles/tokens/scheme-spring.css` (stops at 0.97726@97.959%, then 1), consumed at `AnimationControlsGroup.css:57`.
- **Fix shape:** Producer (relay): sample until the remaining error is below 0.1%, or pair the curve with the real settle time.

### KFA-169 · LOW · On controls-rail close the content fades out before the track is halfway shut
**Surface:** `controls-pane-drawer`

- **Observed vs expected:** Opacity reaches 0 at 200 ms with the track at 205 px (43%). The remaining 250 ms is an empty collapse.
- **Frames + evidence:** seek close #20-47 · `E/controls-pane-drawer/sheets/seek-close-00-23.png`
- **Cause:** `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.css:108-111` vs `AnimationControlsGroup.css:57`.
- **Fix shape:** Tie the fade to the track progress, or use one duration and easing for both.

### KFA-170 · LOW · The desktop controls-pane scroll latch never re-arms: after any close/open the pane stays overflow-hidden
**Surface:** `controls-pane-drawer`

- **Observed vs expected:** overflow-y is 'auto' on fresh load and 'hidden' for the rest of the session. It is harmless today but enables the auto-show scroll offset row.
- **Frames + evidence:** `E/controls-pane-drawer/latch.json`
- **Cause:** `demo/components/instrument/transport/ControlsPaneWrapper/useControlsLayout.ts:31-38` listens only for a `max-height` transitionend, which never fires on desktop.
- **Fix shape:** Desktop paneScrollable = isControlsPanelOpen, or listen on grid-template-columns.

### KFA-171 · LOW · The controls pane's idle 'instant lift' is actually a 300 ms fade, and the scroll-fade layer does nothing on desktop
**Surface:** `controls-pane-drawer`

- **Observed vs expected:** The dim works (after ~12.3 s, not 10 s, unexplained), but the lift is a 300 ms fade. The `-top/-bottom` mask classes have no rules.
- **Frames + evidence:** rt D #1064-1080, #1124-1144 · `E/controls-pane-drawer/rt-log.json`
- **Cause:** `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.css:95-100` (one transition, both directions), `:55-76`.
- **Fix shape:** `transition-duration:0s` on the lift, and add the desktop mask rules or drop the wiring.

### KFA-172 · LOW · The timeline playhead alternates crisp and soft while scrubbing (sub-pixel `left:%`)
**Surface:** `timeline-panel`

- **Observed vs expected:** f007 soft, f008 crisp, f009 soft.
- **Frames + evidence:** `E/timeline-panel/zoom-playhead.png`
- **Cause:** `demo/components/instrument/timeline/components/TimelineTrack.vue:159-161`.
- **Fix shape:** Position with a rounded translateX.

### KFA-173 · LOW · Timeline caret readouts straddle the collapsed rail's bottom border, and the end diamonds are half-clipped
**Surface:** `timeline-panel`

- **Observed vs expected:** The border strikes through '0%/50%/100%', and the 100% diamond is cut.
- **Frames + evidence:** `E/timeline-panel/zoom-caret-labels.png`
- **Cause:** `demo/components/instrument/timeline/components/TimelineTrack.vue:757` (caret offset 16px in a 48 px rail).
- **Fix shape:** Raise the offset to ~26 px, or pad the rail inline by half a diamond.

### KFA-174 · LOW · Pressing Reverse while the ribbon is paused leaves the thumb and ball at the stale position; they snap on Play
**Surface:** `playback-ribbon-visualizer`

- **Observed vs expected:** At effective 1.0 the pressed Reverse leaves them at 1.0, and Play jumps them to 0.035.
- **Frames + evidence:** `E/playback-ribbon-visualizer/sheets/reverse-0.png`, `reverse/samples.json`
- **Cause:** `demo/components/instrument/transport/channel-controls/ChannelOptions.vue:667` `@toggle-reverse` does not call wake() (the scrub handlers at `:654/659/662` do). Inferred.
- **Fix shape:** Call wake() on toggle-reverse.

### KFA-175 · LOW · The keyframe-removal neighbour's jumpUp bobs mid-flight: it overshoots, falls back, then relaunches
**Surface:** `keyframes-editor-cards`

- **Observed vs expected:** -58.7→-50.1→-83.2% (and the leaving card 29.4→24.9→1.2%).
- **Frames + evidence:** C #16-25, D #16-26 · `E/keyframes-editor-cards/C_remove_middle/frames.json`
- **Cause:** `ease-in-bounce` (value.js `src/easing.ts:139-142`) applied per segment to multi-stop presets (`src/animation/presets/catalog.ts:307-310`, `classic-data.ts:427-442`).
- **Fix shape:** Linear per-segment keyframes with an overall easing, or 2-stop presets. Moot if FLIP replaces jumpUp.

### KFA-176 · LOW · A burst of keyframe edits gets one sweep, not one per edit
**Surface:** `keyframes-editor-cards`

- **Observed vs expected:** 6 keystrokes produce a single sweep from 42 to 1025 ms.
- **Frames + evidence:** B #1-20 · `E/keyframes-editor-cards/B_edit_burst/frames.json`
- **Cause:** `demo/components/instrument/keyframes/KeyframesEditor.vue:633-640` (play() on a running animation does nothing).
- **Fix shape:** Seek to 0, then play(), on each edit.

### KFA-177 · LOW · The inventory route does not reach the keyframe card editor: the #/cube Keyframes tab is a CSS code editor
**Surface:** `keyframes-editor-cards`

- **Observed vs expected:** The card editor is mounted only at #/spring's physics facet (twice). The comment at `SpringPhysicsFacet.vue:110-111` is stale.
- **Frames + evidence:** `E/keyframes-editor-cards/probe-cube-keyframes-tab.png`
- **Cause:** `demo/components/instrument/transport/channel-controls/ChannelControls.vue:100-108`, `demo/scenes/spring/SpringPhysicsFacet.vue:137`.
- **Fix shape:** Correct the inventory and the comment. Whether cube should host the cards is an owner call.

### KFA-178 · LOW · The Copy pulse overshoots its authored amplitude (1.25→1.296), dips to 0.954, and writes out-of-range opacity (clamped into a plateau and a ~30 ms cliff)
**Surface:** `copy-button-feedback`

- **Observed vs expected:** Peak 1.2957 at #15 and 0.954 at #39, settling smoothly to 1 (confirm: not a snap). The inline opacity is written as 1.18263 and -0.182251, which the browser clamps. After the check is gone, the rest glyph visibly shrinks (found at confirm).
- **Frames + evidence:** step #9-47 · `E/copy-button-feedback/meta.json` step.frames[].inlineCheck
- **Cause:** `demo/components/CopyButton/CopyButton.vue:94` `easeInBounce` = cubic-bezier(.09,.91,.5,1.5) (value.js `src/easing.ts:139-142`) applied per interval. The engine does not clamp bounded properties.
- **Fix shape:** Overshoot on transform only, with a non-overshooting ease for opacity. Engine: clamp opacity to [0,1] on write.

### KFA-179 · LOW · The Copy clipboard's 'fade-out' layer does not fade; the crossfade works only because the two glyph outlines coincide
**Surface:** `copy-button-feedback`

- **Observed vs expected:** Clipboard opacity is 1 in every frame, and at the peak both glyphs are fully opaque.
- **Frames + evidence:** step #9-23 · `E/copy-button-feedback/meta.json`
- **Cause:** `demo/components/CopyButton/CopyButton.vue:134-145` (the opacity lines were removed).
- **Fix shape:** Give the clipboard the inverse opacity, or use one layer with a glyph swap.

### KFA-180 · LOW · On the first Copy play there is one 33 ms frame, and the first painted frame is already at full check opacity
**Surface:** `copy-button-feedback`

- **Observed vs expected:** Later clicks paint a ramp frame (0.726).
- **Frames + evidence:** live #1-2 · `E/copy-button-feedback/meta.json` sampler
- **Cause:** Likely first-tick setup (`demo/components/CopyButton/CopyButton.vue:114, 117-154`).
- **Fix shape:** Warm the group at mount (interpFrames(0) / render()).

## Found at confirm

### KFA-181 · HIGH · During live playback the Amiga Y channel drifts steadily out of phase with X and Spin, so the floor slam slides away from the wall hit (the composite stops composing over time)
**Surface:** `amiga-boing-composite` · *found at confirm*

- **Observed vs expected:** By design Y (1600 ms) is phase-locked to X (8000 ms): the wall hit and the floor slam coincide at T=2000/6000. Live, the floor minimum trails the wall extreme by +33, +84, +117, +167, then +217 ms in successive X periods, and py at the wall moment climbs from -3.945 to -1.713. Child times while playing already show Y ~183 ms behind before any scrub. After about a minute the ball slams the floor mid-sweep.
- **Frames + evidence:** `E/amiga-boing-composite/samples.json` wall/floor extrema +2134/+2167 … +21833/+22050 ms; `capture.json` childTimesWhilePlaying, afterPause.children; stepped reference `sheets/step-00.png` s12, `step-01.png` s36
- **Cause:** `src/animation/engine/play-lifecycle/frame.ts:130-134`: at t ≥ duration it clamps, onEnd clears startTime, and the next frame re-bases at `now`, dropping the overshoot plus one held frame on every iteration. Y wraps 5× per X wrap, so it loses ~4 extra frame-times every 8 s. The group has no shared master clock. (This per-wrap mechanism is inferred from the code and matches the measured drift rate.)
- **Fix shape:** Engine: on non-final iterations, carry the overshoot (`startTime += duration`, t = overshoot) instead of re-basing. Group: derive child times from one master clock (t mod each child's duration).

### KFA-182 · HIGH · The cube's visible 'Pause animation' does not pause: after the click the die keeps moving, squashed
**Surface:** `cube-orbital-drag-inertia` · *found at confirm*

- **Observed vs expected:** After the click, frames 481-494 still change, and cubeInl rotateX goes 246→268°. The label never flips. The audit had routed this to the transport seat.
- **Frames + evidence:** run3 f468-494; `E/cube-orbital-drag-inertia/samples.json` 532-556
- **Cause:** Probably the same missing machine-derived isStarted/isPlaying authority as the orbit-layer BROKEN row (the autoplay PLAY never reaches the shell binding). Not verified separately.
- **Fix shape:** Machine-derived play state (one authority). Re-verify Pause on an autoplayed cube.

### KFA-183 · MEDIUM · A cold load of home paints nothing for ~3.9 s: the first frame with the cube is at 3898 ms
**Surface:** `home-landing-cube` · *found at confirm*

- **Observed vs expected:** Frames #0-#3 are blank off-white (0-832 ms). #4 at 3898 ms already shows the die partway through its unpainted settle.
- **Frames + evidence:** mount #0-#4 · `E/home-landing-cube/sheets/mount-00.png`
- **Cause:** The same 1.9-2.5 s FrameRequestCallback stall as the cold-load HIGH row, which blocks first paint for the whole page. Possibly inflated by vite-dev (re-measure on a production build).
- **Fix shape:** The same as the cold-load row.

### KFA-184 · MEDIUM · After a scene resolves, the rail content is clipped mid-word while the grid track animates open
**Surface:** `scene-skeleton-shimmer` · *found at confirm*

- **Observed vs expected:** The response/damping rail first appears as a sliver ('overdampe', 'parameter spa'), then widens while the stage slides right.
- **Frames + evidence:** resolve s0728-s0730 · `E/scene-skeleton-shimmer/sheet-resolve-held.png`
- **Cause:** Follows from the skeleton-geometry row (a): derivedSurfaces is false while pending, so the track goes railless and is then transitioned open (`AnimationControlsGroup.css:57`).
- **Fix shape:** Derive rail presence from the scene descriptor.

### KFA-185 · MEDIUM · A 232 ms main-thread stall when the cube's visible 'Pause animation' is clicked
**Surface:** `cube-orbital-drag-inertia` · *found at confirm*

- **Observed vs expected:** rAF dt is 232.6 ms at sample 537, the largest hitch in the run. There are also 32-33 ms deltas at samples 20, 232 and 315.
- **Frames + evidence:** run3 f468-494 · `E/cube-orbital-drag-inertia/samples.json` 537
- **Cause:** Undetermined (a handler or UI re-render on Pause). A CDP trace would attribute it.
- **Fix shape:** Trace and attribute.

### KFA-186 · MEDIUM · On an ordinary Square drag the squash and tilt both saturate together (~23% stretch plus a 9° shear), and the label text shears with the box
**Surface:** `square-drag-spring-tether` · *found at confirm*

- **Observed vs expected:** On a 150 px diagonal both caps are pinned for ~15 frames (rec 40-55). The net matrix is ≈(1.23, 0.19; 0.16, 1.00), which reads as distortion rather than mass.
- **Frames + evidence:** rec 40-55 · `E/square-drag-spring-tether/sheet-00.png` f8-23, `sheet-03.png` f87-95
- **Cause:** `demo/scenes/square/useSquareDemo.ts:291-294`: TILT_GAIN 5 and SQUASH_GAIN 0.035 are tuned for ±3 u/s but exceeded at once, with no low-pass.
- **Fix shape:** Lower the gains and low-pass or spring both channels (with the squash-flip and tilt rows).

### KFA-187 · MEDIUM · On the Entry view the spring controls pane looks broken: sliders are bare orange bars with no thumb or value, and the @keyframes editor shows a truncated chip and stacked 'f 0 / s 0%'
**Surface:** `spring-starting-style-entry` · *found at confirm*

- **Observed vs expected:** At y≈88/115 the rows are filled bars with no handle or readout. The editor block at y≈760-870 shows a truncated chip and stacked label fragments.
- **Frames + evidence:** `E/spring-starting-style-entry/02-entry-selected.png` (left pane); compare `E/spring-physics-facet/probe-00-load.png`
- **Cause:** Not established from these frames (a sibling surface). The physics seat saw the same zero-size LabeledSlider thumbs and the editor collapse at its width.
- **Fix shape:** Route to the controls/keyframes-editor owner: LabeledSlider thumb sizing, and KeyframesEditor row wrapping at ~390 px.

### KFA-188 · MEDIUM · Bézier handles and endpoints at x=0 or x=1 are half-clipped by the svg viewport (the viewBox has no x padding)
**Surface:** `easing-picker-curve` · *found at confirm*

- **Observed vs expected:** The P2 handle on the plot's right edge paints only its left half (live #24-#47), and the start endpoint is clipped on the left. A handle dragged to x=1 becomes nearly ungrabbable.
- **Frames + evidence:** `E/easing-picker-curve/sheets/live-024-047.png`, drag sheets #0-23
- **Cause:** glass-ui `dist/easing.js:309` bezier viewBox `0 ${minY} 1 ${height}` pads only y (steps mode pads x).
- **Fix shape:** Producer (relay): pad x the same way, or use overflow visible on the plot svg.

### KFA-189 · MEDIUM · The collapsed-face Play is squashed into a 32×40 vertical capsule, different from the expanded 40×40 circle, and the two crossfade over each other on every morph
**Surface:** `transport-dock` · *found at confirm*

- **Observed vs expected:** Summary BTN w32 h40 against full BTN w40 h40. At col#02 a circle and a capsule are drawn side by side.
- **Frames + evidence:** `E/transport-dock/confirm/probe-collapsed-confirm.mjs` output (kf cd2cd88f), `zoom-collapse-a.png` col#02-30, `step-meta.json`
- **Cause:** The same root as the collapsed-face BROKEN row: two items competing for the 40 px square summary (glass-ui `morph.css:1`).
- **Fix shape:** Falls out of the collapsed-face fix.

### KFA-190 · MEDIUM · The sequence scene placeholder hands off to the card with a jump in size and position (centred blank box → off-centre card → slide)
**Surface:** `sequence-power-on-cascade` · *found at confirm*

- **Observed vs expected:** At f020 a centred blank placeholder. By f030 the real card is at a different size, ~229 px right. By f045 it has slid back to centre.
- **Frames + evidence:** `E/sequence-power-on-cascade/sheets/A-fullframe-context.png` f020/f030/f045
- **Cause:** The loading surface is laid out in the settled railless geometry while the mounted scene first lays out railed (compounds the boot-on-sliding-card row).
- **Fix shape:** Commit the railless track before mount, and hold the placeholder and boot until the layout settles.

### KFA-191 · MEDIUM · The spring sweep sampler lurches and dwells: each 700 ms leg reaches the far rail in ~150 ms and then sits still ~550 ms (the 2000 ms spring is played ~2.9× compressed)
**Surface:** `spring-physics-facet` · *found at confirm*

- **Observed vs expected:** The sampler goes 784.9→1110.8→1213.7→1225.5 in 150 ms, then holds at 1222.74 for ~500 ms. The return leg repeats this. The stage trace is labelled 2000 ms. Found at confirm too: the scrubber thumb and phase are a sawtooth that jumps 1400→0 every iteration despite 'alternate'.
- **Frames + evidence:** `E/spring-physics-facet/E2_play/rafLog.json` t=4544-5193, `meta-transport.json` scrub
- **Cause:** `demo/scenes/spring/useSpringDemo.ts:25` SAMPLER_DURATION 1400, and `:185-194` (a settle-normalised springTimingFunction applied to each 700 ms leg), `:291` (%1 sawtooth).
- **Fix shape:** Size the sampler legs to the spring's settle horizon, or sample only its moving portion, and fold the phase for alternate.

### KFA-192 · MEDIUM · Removing the LAST keyframe stop jumps the card above upward, a move no layout needs
**Surface:** `keyframes-editor-cards` · *found at confirm*

- **Observed vs expected:** With no card below, the preceding card runs jumpUp 0→-106.863% (frozen) and ends displaced at y 332.
- **Frames + evidence:** `E/keyframes-editor-cards/D_remove_last/frames.json` c1 +300..+900 ms, `sheet-D_remove_last-1.png`
- **Cause:** `demo/components/instrument/keyframes/KeyframesEditor.vue:548` falls back to `cards[frameIx-1]` with the same upward jumpUp.
- **Fix shape:** When the last stop is removed, animate no neighbour (FLIP makes this fall out).

### KFA-193 · MEDIUM · Expanding the timeline has its own layout jump and an empty-cell gap (the audit had called expand smooth)
**Surface:** `timeline-panel` · *found at confirm*

- **Observed vs expected:** At f001 the pane body vanishes and the ribbon snaps up to y≈300. f001-f005 show an empty grey strip at the viewport bottom. From f006 the cell grows upward over the ribbon until ~f018.
- **Frames + evidence:** H-expand f000-018 · `E/timeline-panel/sheet-H-expand-00.png`
- **Cause:** The same v-if/Teleport remount as the tab-enter row, plus the max-height transition at `AnimationControlsGroup.vue:96-97` while the pane rows re-flow instantly.
- **Fix shape:** Fix it with the 3-instance and tab-enter fixes, and reserve height.

### KFA-194 · LOW · The Amiga ball reverses at x=±5 against nothing: the room has no side walls
**Surface:** `amiga-grid-room-backdrop` · *found at confirm*

- **Observed vs expected:** The ball turns at ±WALL_X in open space (s12, s36). Only the floor and back wall exist.
- **Frames + evidence:** `E/amiga-grid-room-backdrop/sheet-step-00-23.png` s11-13, `sheet-step-24-47.png` s35-37
- **Cause:** `demo/scenes/amiga/useAmigaThree.ts:214-230` (floor and back grids only) vs `useAmigaDemo.ts:257-261`.
- **Fix shape:** Add side-wall grids at ±BOX_SIZE/2, or an owner call to accept it.

### KFA-195 · LOW · The Amiga ball renders washed out: the white tiles come out mid-grey and no specular highlight is visible
**Surface:** `amiga-sphere-spin-gesture` · *found at confirm*

- **Observed vs expected:** Every frame shows muted pink-red on light grey with no specular lobe, despite Phong and the lights. The comment at `utils.ts:73-78` promises 'glossy'.
- **Frames + evidence:** `E/amiga-sphere-spin-gesture/p3-keys/key-sheet.png`, `p4b-transport/track-sheet-20.png`
- **Cause:** Not verified. Likely a CanvasTexture colorSpace or tone-mapping mismatch, and a weak specular (0x333333) (`demo/scenes/amiga/utils.ts:73-83`, `useAmigaThree.ts:204-207`).
- **Fix shape:** Set the texture colorSpace to SRGB and re-check the specular. Undecided until verified.

### KFA-196 · LOW · The Amiga contact shadow drops out of the tracking crop partway through the play run (undetermined)
**Surface:** `amiga-sphere-spin-gesture` · *found at confirm*

- **Observed vs expected:** Visible f480-490, faint f491-492, absent f493-503. It may just be the crop leaving the floor at the top of the bounce.
- **Frames + evidence:** `E/amiga-sphere-spin-gesture/p4b-transport/track-sheet-20.png`
- **Cause:** Undetermined. A full-frame recheck of f490-503 is needed.
- **Fix shape:** Re-check at full frame before treating it as a defect.

### KFA-197 · LOW · The home hero text's entrance is squeezed into ~25 ms: a pop, not a fade
**Surface:** `home-landing-cube` · *found at confirm*

- **Observed vs expected:** #5 shows no text, #6 a faint ghost, #7 full opacity, ~0.5 s after the die settles.
- **Frames + evidence:** mount #5-#7 · `E/home-landing-cube/frames/`
- **Cause:** Probably scheduled from load and mostly elapsed during the stall. Not traced.
- **Fix shape:** Start the fade after first paint (it falls out of the stall fix).

### KFA-198 · LOW · The aurora's lavender background tint pops in over one frame when the cold-load stall clears
**Surface:** `home-landing-cube` · *found at confirm*

- **Observed vs expected:** #10 off-white → #11 a lavender wash over the whole stage.
- **Frames + evidence:** `E/home-landing-cube/frames/` #10-#11
- **Cause:** HeroAurora's first render landing right after the stall (consistent with that row's attribution, not proven).
- **Fix shape:** Fade the aurora in on arm, together with the stall fix.

### KFA-199 · LOW · A second post-Play rAF gap (283 ms) on home goes uncounted, swallowing the hero exit and the spin steps 160.8→141.5→73.6°
**Surface:** `home-landing-cube` · *found at confirm*

- **Observed vs expected:** samples 1950→2233. The LoAF pass caught only the pointerup frame.
- **Frames + evidence:** `E/home-landing-cube/samples.json`; frames #33→#34
- **Cause:** More remount or first-frame work after home→cube. Not attributed.
- **Fix shape:** Trace it together with the Play-freeze fix.

### KFA-200 · LOW · The typing-dots stagger quantum (160 ms) does not match the step quantum (150 ms), so even an ideal march changes the dots 10 ms apart
**Surface:** `home-typing-dots` · *found at confirm*

- **Observed vs expected:** The ideal steps land at k6 (dot 0), k13 (dot 1) and k19 (dot 2), never on a shared tick.
- **Frames + evidence:** `E/home-typing-dots/frames.json` ideal[] k6/k12/k13/k18/k19
- **Cause:** `demo/components/instrument/shell/TypingDots.vue:98, 102` (CYCLE_MS 1200, STEP_MS 160 against 150 ms steps).
- **Fix shape:** STEP_MS = CYCLE_MS/8 if the owner wants a lockstep march.

### KFA-201 · LOW · The outgoing Select dropdown's exit fade lingers over the new scene for 15+ frames
**Surface:** `scene-swap-transition` · *found at confirm*

- **Observed vs expected:** The menu is fully open over the skeleton at f076, and ghosted rows are over the amiga stage at f089-091.
- **Frames + evidence:** `E/scene-swap-transition/A-cube-to-amiga/` f076, f089-091; CF quad f060
- **Cause:** The mutation dispatches synchronously on pick, before the Select closes (`demo/app/transition/useSceneTransition.ts:85`).
- **Fix shape:** Close the Select before dispatching the swap (shared with the popover-layering row).

### KFA-202 · LOW · The skeleton sweep is a dark, low-contrast shadow band, not a light sheen
**Surface:** `scene-skeleton-shimmer` · *found at confirm*

- **Observed vs expected:** On #f6f3ef the band is a grey, darker smear (10% alpha foreground ink), barely visible at its edges.
- **Frames + evidence:** `E/scene-skeleton-shimmer/sheet-seek-00-23.png` f16-23
- **Cause:** glass-ui 7.0.0 Skeleton ::after `linear-gradient(105deg, transparent 24%, oklab(0.216 … / 0.1) 48%, transparent 72%)`.
- **Fix shape:** Producer (relay): use a light sheen tone on light grounds.

### KFA-203 · LOW · Pre-theme white flash on cube boot
**Surface:** `cube-group-spin-matrix-bob` · *found at confirm*

- **Observed vs expected:** f0000-f0001 (0-0.12 s) are pure white before the cream theme background.
- **Frames + evidence:** `E/cube-group-spin-matrix-bob/live/sheet-live-00.png` #0-#3
- **Cause:** The document background is not set before the app stylesheet loads (app shell).
- **Fix shape:** Set an inline background colour on html/body in index.html (theme-aware).

### KFA-204 · LOW · The cube's first paint is a flat face with a blue edge sliver for one frame before the 3D pose settles
**Surface:** `cube-loader-spin` · *found at confirm*

- **Observed vs expected:** f003 is a flat red square with a vertical blue sliver, and f004 is posed 3D.
- **Frames + evidence:** `E/cube-loader-spin/pass1/sheet-pass1-00-23.png` f003 vs f004
- **Cause:** Not determined. Likely the pose or perspective is applied a frame after the faces mount (the same class as the landing settle-pop row).
- **Fix shape:** Apply the pose before first paint.

### KFA-205 · LOW · A cold #/cube load shows ~4 s of bare grid with no loading indicator (plausibly inflated by vite-dev)
**Surface:** `cube-loader-spin` · *found at confirm*

- **Observed vs expected:** f001-f002 show only the grid, and nothing changes until f003 at 4.23 s. SceneSkeleton is not visible as an indicator.
- **Frames + evidence:** `E/cube-loader-spin/pass1/sheet-pass1-00-23.png` row 1
- **Cause:** The loading window belongs to `demo/app/App.vue:92-101` Suspense/SceneSkeleton (see the shimmer rows). The cold-load stall may also contribute.
- **Fix shape:** Re-measure on a warm reload or production build, then fix with the skeleton rows.

### KFA-206 · LOW · The Square fill and will-change are applied one frame before the clock runs (a 'flash then go' on the play edge)
**Surface:** `square-tour` · *found at confirm*

- **Observed vs expected:** At sample 27 the mode is playback, will-change is transform and the fill is violet, while playing=False and t=0. The clock starts at 28, which is also the first 33 ms drop.
- **Frames + evidence:** `E/square-tour/capture.json` samples 26-29; live L0→L1
- **Cause:** The SquareScene mode flip / setProgress(tourTimeForPose()) seat runs before the group ticks (`demo/scenes/square/SquareScene.vue:322-324`).
- **Fix shape:** Order the mode flip with the first engine tick.

### KFA-207 · LOW · After the tumble lands, the Square rocks visibly for ~650 ms (+38° then -4°) under the bloom
**Surface:** `square-tumble-egg` · *found at confirm*

- **Observed vs expected:** The swing is ~10% of the 360° travel and reads as a second, slower half-rotation rather than a thunk.
- **Frames + evidence:** `E/square-tumble-egg/sheets/sheet-01.png` #24-47; state-log rows 43-68
- **Cause:** The spin SpringProgress in `demo/scenes/square/useSquareTumble.ts:30` is underdamped for a 360° throw.
- **Fix shape:** Tune damping (owner taste call on 'janky').

### KFA-208 · LOW · The 8th easing specimen's ball is cut off at the viewport edge throughout the race, and 20 tiles can be reached only by horizontal scroll inside a y-scroller
**Surface:** `easing-gallery-race` · *found at confirm*

- **Observed vs expected:** The partly visible 'ease-' tile shows a sliver of its ball. This is a consequence of the gallery-grid BROKEN row.
- **Frames + evidence:** `E/easing-gallery-race/sheets/A-sheet-04.png`
- **Cause:** The inline-flex 4032 px row inside an 828 px y-axis FadingScroll.
- **Fix shape:** Falls out of the grid fix.

### KFA-209 · LOW · The picker's detail-open crossfade paints both panes' text at partial opacity together (a double exposure)
**Surface:** `easing-picker-curve` · *found at confirm*

- **Observed vs expected:** panel-open #10-15: the fading rows and the incoming header overlap at mid-opacity.
- **Frames + evidence:** `E/easing-picker-curve/sheets/panel-open-000-023.png`
- **Cause:** The ChannelOptions row opacity transitions share one 300 ms window with no stagger.
- **Fix shape:** Finish the outgoing fade by ~40% of the window before the incoming fade starts.

### KFA-210 · LOW · A mid-flight hitch on the first spring chase after load: a 51 ms frame and a 29 px jump
**Surface:** `spring-live-solver` · *found at confirm*

- **Observed vs expected:** B row 16: dt 51 ms, and the ball goes 712→741 px (about 10 px/frame on either side). This contradicts the audit's 'no jumps'.
- **Frames + evidence:** `E/spring-live-solver/B-tap-030/probe.json` rows 15-17, `frames.json` f002→f003
- **Cause:** Unknown (a first-use cost, or harness jitter). Needs a re-run.
- **Fix shape:** Re-run with LoAF.

### KFA-211 · LOW · The spring ball keeps will-change and `spring-target--live` while the badge reads 'settled' during Sweep playback
**Surface:** `spring-live-solver` · *found at confirm*

- **Observed vs expected:** F-play rows 12-140+: live=true and wc=transform with a static rail ball.
- **Frames + evidence:** `E/spring-live-solver/F-play/probe.json`, `H3-pause-then-tap/probe.json` rows 0-8
- **Cause:** isLive (`demo/scenes/spring/SpringTarget.vue:288-289`) follows the loop/playing status, not the solver's settled state.
- **Fix shape:** Key isLive on the live solver's settled state.

### KFA-212 · LOW · The derby's live x/v readout updates in steps of ~200 ms while the ball moves continuously
**Surface:** `spring-derby-egg` · *found at confirm*

- **Observed vs expected:** runB f024-041: 0.004 / v 0.00 while the ball travels, then a jump to 0.615. This is possibly the deliberate 6 Hz throttle.
- **Frames + evidence:** `E/spring-derby-egg/runB/sheets/sheet01.png`
- **Cause:** Unverified. Most likely the same PROGRESS_READOUT_HZ throttle (`useSpringHotPath.ts`) as the readout-lag row.
- **Fix shape:** Check the intent. If it is the throttle, flush on the derby-arm edge.

### KFA-213 · LOW · The DERBY badge switches between plain text and a filled pill mid-race (hard frame cuts)
**Surface:** `spring-derby-egg` · *found at confirm*

- **Observed vs expected:** runB f024-031 plain, f032-041 filled, f042-047 plain, while the badge value stays 'derby'.
- **Frames + evidence:** `E/spring-derby-egg/runB/sheets/sheet01.png`
- **Cause:** Unverified. Possibly a pulse class on the live-ball launch (~+440 ms).
- **Fix shape:** Check the intent. If it is a pulse, transition it.

### KFA-214 · LOW · The spring @keyframes editor renders collapsed on entry: the stop tab is truncated to 'O…' and the frame/stop fields are stacked under the icons
**Surface:** `spring-physics-facet` · *found at confirm*

- **Observed vs expected:** Static layout, but it makes the editor that is supposed to own the Sweep illegible.
- **Frames + evidence:** `E/spring-physics-facet/probe-00-load.png` (bottom of the pane)
- **Cause:** Not traced. The ~390 px pane width, with a KeyframesEditor row that does not wrap (see also the card-layout row).
- **Fix shape:** Fix together with the card-layout row.

### KFA-215 · LOW · The Entry card's exit keeps the full spring overshoot on opacity and uses the same curve as the entry
**Surface:** `spring-starting-style-entry` · *found at confirm*

- **Observed vs expected:** The exit fade ends at f09-10, as fast as the entry. The overshoot past 0 is clamped, while scale briefly dips below 0.9 on an invisible card.
- **Frames + evidence:** `E/spring-starting-style-entry/sheet-B-dismiss-exit-0.png` f08-10
- **Cause:** `demo/scenes/spring/StartingStyleTarget.vue:291-294` (one `--spring-ease` for both directions).
- **Fix shape:** Give the exit its own non-overshooting curve.

### KFA-216 · LOW · The transport dock overlaps the bottom edge of the @starting-style panel
**Surface:** `spring-starting-style-entry` · *found at confirm*

- **Observed vs expected:** The dock pill at y≈770-815 sits over the panel's bottom border and shadow (panel bottom ≈770).
- **Frames + evidence:** `E/spring-starting-style-entry/02-entry-selected.png`
- **Cause:** Not established. Likely the dock's fixed anchoring against a stage that fills the viewport height.
- **Fix shape:** Reserve dock clearance in the stage's block size.

### KFA-217 · LOW · The sequence master scrub ball and the playhead use different geometries (385→1055 vs 478→1054 vs 478→1038), so the two cues for the same clock never line up
**Surface:** `sequence-staggered-rows` · *found at confirm*

- **Observed vs expected:** At p≈0.489 the scrub ball is near the card middle while the playhead is at the 970 tick.
- **Frames + evidence:** `E/sequence-staggered-rows/geometry.json`, `sheet-seek-00.png` seek#12-23
- **Cause:** `demo/scenes/sequence/SequenceScrubber.vue` (the rail spans the card's padded width, not the track column).
- **Fix shape:** Put the scrub rail on the track column (together with the playhead-width row).

### KFA-218 · LOW · The sequence stage chrome (header, READY chip, master clock) is fully formed before the stage ignites and is not part of the boot
**Surface:** `sequence-power-on-cascade` · *found at confirm*

- **Observed vs expected:** At f030 the chrome is fully opaque on a card that is still sliding, while the stage well shows only the ruler and a ghosted lane. (This is a design observation.)
- **Frames + evidence:** `E/sequence-power-on-cascade/sheets/A-fullframe-context.png` f030
- **Cause:** By design, `.is-powering-on` covers only `.seq-stage` children (`demo/scenes/sequence/SequenceTarget.css:264-278`).
- **Fix shape:** Owner call: extend the ignition to the chrome, or accept the current scope.

### KFA-219 · LOW · The sequence playhead marker paints over its own axis tick labels ('0', '97|0')
**Surface:** `sequence-reel-egg` · *found at confirm*

- **Observed vs expected:** At rest the playhead covers '0'. Scrubbed to 0.5, it cuts through '970'.
- **Frames + evidence:** `E/sequence-reel-egg/00-page.png`, E-master-live and C-held-play-00 sheets
- **Cause:** The needle and the tick labels share the axis row with no offset. The CSS was not located.
- **Fix shape:** Offset the labels or knock them out under the needle.

### KFA-220 · LOW · The sequence header status does not show the reel: it reads READY at clock 0 the whole time the balls fly
**Surface:** `sequence-reel-egg` · *found at confirm*

- **Observed vs expected:** This holds in every A/B frame, so there is no feedback on why a Play pressed mid-reel does not start at once.
- **Frames + evidence:** `E/sequence-reel-egg/sheets/A-button-00..03.png`
- **Cause:** The status machine has no 'reeling' state (inferred from the frames).
- **Fix shape:** Add a reel status (or a busy indicator) to the header.

### KFA-221 · LOW · After collapse, the dock's spilled leaving layer stays in layout (~150 px below the capsule) for ~2 s after it has visibly faded
**Surface:** `chrome-dock-menus` · *found at confirm*

- **Observed vs expected:** spillLast at t=4502.7 ms with w=60 and itemsMaxBottom 244.7. It may leave an invisible hit region over the canvas (not probed).
- **Frames + evidence:** `E/chrome-dock-menus/live-dock/live-dock.json` spillLast
- **Cause:** `.dock-layer--full.is-leaving` (glass-ui `layers.css` visibility visible) is not made display:none or inert after the fade.
- **Fix shape:** Producer (relay): inert or display:none the leaving layer on animationend. Probe elementFromPoint first.

### KFA-222 · LOW · The collapsed transport pill hover-scales to 1.1, and the expand morph then starts from that scaled box (the height drops 61.6→56 in one frame)
**Surface:** `transport-dock` · *found at confirm*

- **Observed vs expected:** Before expand: dscale 1.1, h 61.6. First morph frame: dscale '0.24 1', h 56.
- **Frames + evidence:** `E/transport-dock/step-meta.json` expand i0→i1
- **Cause:** The hover scale and the morph size-scale write the same `scale` property with no hand-off (glass-ui dock).
- **Fix shape:** Producer (relay): compose the hover scale into the morph, or drop it once the morph arms.

### KFA-223 · LOW · The bottom scene pill ('Rotations') changes content and width in one frame when the rail-close click lands (with a 100 ms frame gap)
**Surface:** `controls-pane-drawer` · *found at confirm*

- **Observed vs expected:** rt A #45→#46: the reset icon is gone and the label changes weight and shrinks, with no transition.
- **Frames + evidence:** `E/controls-pane-drawer/rt-frames.json` #45-46
- **Cause:** Not determined (a hover/focus pill state plus a short hitch). Route to the transport seat.
- **Fix shape:** Investigate with the transport-dock fixes.

### KFA-224 · LOW · With a keyframe selected, the collapsed timeline pane overflows the viewport, and the editor shows the snapshot's computed matrix3d instead of the authored rotation
**Surface:** `timeline-panel` · *found at confirm*

- **Observed vs expected:** The ~250 px editor pushes the ribbon down to y≈795-900, cut off at the viewport bottom. matrix3d cannot represent multi-turn rotation (plausible; not verified because the build never succeeds).
- **Frames + evidence:** `E/timeline-panel/H-collapsed-full.png`
- **Cause:** The rail has no max-height or scroll, and captureSnapshot serialises the computed transform (`demo/components/instrument/timeline/utils/snapshotCapture.ts`).
- **Fix shape:** Scroll the rail, and capture the authored transform functions (or decompose) instead of matrix3d.

### KFA-225 · LOW · Under Reverse the ribbon's ball and thumb still travel left→right, so Reverse looks the same as forward playback (by design under C-2)
**Surface:** `playback-ribbon-visualizer` · *found at confirm*

- **Observed vs expected:** With Reverse pressed, travel is 0.035→0.244, left to right. The only cue is the glyph and the pressed tint. This feeds the "none of the animations are wired" reading.
- **Frames + evidence:** `E/playback-ribbon-visualizer/reverse/r2-play.png..r7-play.png`
- **Cause:** The ribbon's effective-time contract (`demo/components/playback/PlaybackRibbon.vue:160-170`).
- **Fix shape:** Owner call: show raw time under Reverse, or add a direction cue on the rail.

### KFA-226 · LOW · Dragging the ribbon while playing silently pauses and then auto-resumes; a release near the end wraps to 0 within ~400 ms
**Surface:** `playback-ribbon-visualizer` · *found at confirm*

- **Observed vs expected:** The button reads Play during the drag and Pause 400 ms after release, by which time the playhead has wrapped to ~0.
- **Frames + evidence:** `E/playback-ribbon-visualizer/sheets/drag-0.png`, `drag-1.png` f031-after-release
- **Cause:** Scrub-start pauses and scrub-end resumes, on an infinite normal loop.
- **Fix shape:** Resume from the released position, and hold the release briefly near the loop end.

### KFA-227 · LOW · Submitting a keyframe clears the textarea one frame before the dialog starts to leave, so the form flashes empty
**Surface:** `keyframes-editor-cards` · *found at confirm*

- **Observed vs expected:** #9: the dialog is fully opaque with an empty textarea, and the fade starts at #10.
- **Frames + evidence:** `E/keyframes-editor-cards/sheet-G_dialog_submit-0.png` #8-#10
- **Cause:** PLAUSIBLE: the draft reset runs on the same tick as `dialogOpen=false` (`demo/components/instrument/keyframes/KeyframesEditor.vue:209-213`).
- **Fix shape:** Reset the draft after the leave transition.

### KFA-228 · LOW · The easing select trigger shows the name and description run together ('ease-in-outslow start & end', 'cubic-beziercustom curve')
**Surface:** `square-tour`, `amiga-grid-room-backdrop`, `easing-picker-curve` · *found at confirm*

- **Observed vs expected:** Seen on the amiga, square and easing (cube) panels. KF.W13U.e reports OA-28/OA-31 cured at kf cd2cd88f (glass SelectValue slot). This audit captured before that fix, so re-verify.
- **Frames + evidence:** `E/square-tour/recon-rest.png`, `E/amiga-grid-room-backdrop/reach-full.png`, `E/easing-picker-curve/` notes
- **Cause:** `demo/components/instrument/transport/channel-controls/ChannelOptions.vue` SelectValue renders the label and description inline (pre-cd2cd88f).
- **Fix shape:** Re-verify on the served page at kf ≥ cd2cd88f.

## Surfaces NOT audited

`[]`: every one of the 36 inventory surfaces has an audit seat and a confirm seat (see the summary table).

Coverage gaps inside audited surfaces (not unaudited surfaces):
- mobile Drawer path of `controls-pane-drawer` (<1024 px; captured on desktop only)
- dark-theme leg of `home-hero-aurora` (the toggle could not be reached)
- 120 Hz behaviour of `cube-orbital-drag-inertia` (KFA inertia row; judged from the source only)
- Slow-3G reading of `scene-skeleton-shimmer` (the dev module graph did not boot within 120 s)
- the transport pause test on `cube-loader-spin` (harness selector miss)

## Appendix A: refuted claims (struck by a confirm seat, with the refuting frame)

No audit defect was refuted outright. These parts of audit claims were struck or corrected at confirm:

| Surface | Struck claim | Refuting evidence |
|---|---|---|
| home-animated-text | a "1798 ms stall" in the first rAF sample | not in any banked JSON; `E/home-animated-text/screencast.json` raf max 745.8 ms |
| home-landing-cube | the hero text overlaps the cube from #30 | full-res #30 is still the home layout; the overlap is #31-#33 |
| home-landing-cube | the 74° step at play t=12366 | instrument: an end-of-phase screenshot caused a 299 ms gap (audit note) |
| home-hero-aurora | "home cube static" (confirm cross-surface note) | not a defect: the landing is still until its own Play, by design (`E/home-landing-cube` notes) |
| home-hero-aurora / home-animated-text | the cube overlapping the headline as a layering defect | owner-ruled as welcome (`EditorStartScreen.vue:6-13`) |
| home-hero-aurora | a zero cursor-swirl result (pass 3) | instrument: pause plus renderAt integrated a ~7 s dt; with the same time sequence, swirl diff = 0.87-0.96/255 |
| cube-group-spin-matrix-bob | the collapsed-Play cause "the crossfade lands the release on the other mirror" | `interact/confirm-play-click.json`: the Play mirror moves 77 px within 60 ms of hover and the press hits the Select trigger (KFA-13) |
| cube-loader-spin | severity BROKEN | dead code with no visible breakage → MEDIUM (KFA-89) |
| cube-relit-faces | the forced-lit sweep face is "face 2" | it is the blue face 3 rotated 180° (`sheet-veil-veilDark.png`) |
| cube-orbital-drag-inertia | run1 / run2 flings | invalid: the press started off the die, and a frame-numbering race; only their samples are kept |
| amiga-boing-composite | "pause settles home only by a race" | 2/2 pauses held consistently (`samples.json` 200/200 and 94/94 constant); the race is inferred only |
| amiga-sphere-spin-gesture | the release-impulse spike as a user-visible fault | a harness CDP event cadence (~33 ms), and the real release was unaffected |
| amiga-sphere-spin-gesture | p1-flick-x and p4-transport runs | invalid (Playwright latency missed the flick window; the press missed the moving ball) |
| square-tour | "collapsed Play fails after a panel edit" | `confirm-dockplay.json`: after the dock settles, Play starts the tour; the failure is the hover-reflow race (KFA-13), severity LOW |
| square-tumble-egg | the Play-mid-tumble colour snap is caused by the tumble | Play from rest snaps the hue too (`tourTimeForPose` is x/y only), folded into the Square Play-snap row |
| scene-skeleton-shimmer | frames s0725/s0726 as the hard-cut witness | 1354×688 clip-sized screenshot artefacts, not page frames; `organic/meta.json` firstBandMs is also broken (a fixed-px threshold) |
| easing-gallery-race | ease-in-back is clipped | `11-dip-pair.png`: the ease-in-back ball is round in both halves |
| spring-live-solver | settle-badge lag of "300-670 ms" | re-measured at 130-650 ms |
| spring-live-solver | a long frame caused by the filter drop-shadow raster | `meta4.json` LoAF: render 1 ms, styleLayout 0, no scripts, so unattributed |
| spring-physics-facet | first-run E/F/G phases | invalid (the Play press was swallowed by KFA-13, and the scrubber selector matched a span); re-captured as E2/G2 |
| sequence-power-on-cascade | a ~0.5 px vertical row shift | `zoom-label2-end800-left-vs-rest-right.png`: same baseline; only antialiasing differs |
| sequence-reel-egg | `transport.json` T2/T3 as held-Play evidence | the dock-swallow artefact (clicked the first match, not the visible Play); a re-run shows the held Play works from the origin |
| chrome-dock-menus | the Share popover "drops down over the row below" | `mbabb-share__open__24-47.png`: it sits to the left, level with the Dark-mode row |
| chrome-dock-menus | enter hitches tied to the reveal blur | `live-dock.json` B (no overlay) also drops 34 ms frames: baseline |
| controls-pane-drawer | spring-curve end jump at MEDIUM | visible only when measured → LOW |
| timeline-panel | preview-fit at HIGH | the engine paints correct poses, so a legibility defect → MEDIUM |
| keyframes-editor-cards | -106.863% is the fill-forwards end state | it is the frozen mid-flight value from the removal-freeze throw |
| copy-button-feedback | the pulse "snaps to 1" | 0.981 at #45, then 1 at #47: a smooth settle |
| playback-ribbon-visualizer | a one-sample scrub lag (probe3) | instrument: the seat's own pointer→value mapping; the reka emit trace shows no lag |

## Appendix B: instrument, provenance and INFO notes

- **Evidence committed vs on disk.** The evidence tree is **8.4 GB (25,692 files, 25,179 of them PNG/JPEG frames)**. Committing it would put about 8 GB into value.js history, so this commit carries the register plus every non-image evidence file: capture and probe scripts (`*.mjs`, `*.py`, `*.js`), JSON logs, metadata and text (~14 MB, 513 files). The frames and contact sheets (`sheets/`, `frames/`, `live/`, `step/`, `*.png`) stay on disk at the paths cited above and are uncommitted. The cited image paths therefore resolve on this machine only until they are archived elsewhere (for example an LFS or asset store); that is an owner call.
- The headed macOS window returns screencast frames at 2880×1800 (Retina backing) even at DPR 1. Seek and clip frames are in CSS pixels. Softness in the 2× screencast is compositor upscale, not page blur.
- CDP screencast metadata timestamps occasionally go backwards by ~3 ms (`E/home-animated-text/screencast.json` s141/s142); sort by t before velocity analysis.
- A screencast skips frames with no damage, so rAF samplers are the authority on dropped frames. Screencast capture itself can inflate stalls (KFA landing Play-freeze: 1497 ms under screencast, 265-329 ms under LoAF alone).
- The cube Rotations channel spins rotateX, rotateY and rotateZ in lockstep (`rotateX(a) rotateY(a/360 turn) rotateZ(a)`), so witnesses must assert all three axes.
- The axis-lines release reversal lasts ~130 ms, not 200 ms. That is the CSS transition reversing-shortening rule, so any "symmetric 200 ms" gate should allow for it.
- `E/home-animated-text/stack.json`: hero glyph hit-testing is owned by the scene's face-numeral spans while the paint order puts the ink on top (INFO; the hero band is probably pointer-events:none).
- There is one console 404 per load, on `GET /assets/icons/favicon.svg` (seen by several seats), unrelated to motion.
- keyframes.js was read-only for every seat: nothing was edited, staged or committed there. The vite dev server was never started or stopped by this workflow.

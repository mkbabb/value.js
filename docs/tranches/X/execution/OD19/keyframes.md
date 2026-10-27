# OD19 · keyframes · DIAGNOSE (owner docket 2026-10-19, rows OD19-K1..K8 + the keyframes half of OD19-ALL)

SERVED MODEL: vite dev at http://localhost:5173 (pid 11345, started 2026-10-19 14:01:53, cwd /Users/mkbabb/Programming/keyframes.js), keyframes.js HEAD `7fdae407` plus another seat's dirty hero hunks (AnimatedText.vue, TypingDots.vue, EditorStartScreen.vue, KeyframeTimeline.vue, test/demo/instrument/hero-wave-pause.test.ts); glass-ui `10.1.0` installed (node_modules), glass source read at `795f7234b`. Hash routes (`#/cube`). Headless Chromium, one browser per run, one context per cell, cells light+dark × 1440×900 and 390×844, DPR 2.

Evidence: `before/` (PNGs, `motion.json`, `layers.json`, `capTrace.json`, `probe-before*.json`). Probe scripts: `before/motion.mjs`, `before/layers.mjs`, `before/capTrace.mjs`, and `probe-before.mjs` / `probe-before-2.mjs` (an earlier seat of this task, 13:05–13:10, before the machine reboot; its captures are kept and cited as `probe-before*.json`).

## Diagnose

| row | reproduced (BEFORE, measured) | root cause (file:line) | owner |
|---|---|---|---|
| OD19-K1 | 13:05 served: the "Pause the title animation" button present (1440: x28 y685 217×36; 390: x99 y654 191×36), `K1-hero-*.png`. At 14:08 it is already gone from the served page: another seat has the cure dirty in the tree (KF.DS.r1, COHESION §0gf.2(b)). | `demo/app/hero/EditorStartScreen.vue:156-166` (the Button), `:72` (the `--motion-weight` write), `:197` (`wavePaused`). | consumer. **IN FLIGHT with another seat. No packet.** Those paths are dirty with its hunks. |
| OD19-K2 | With the pane open at 1440, both docks centre on the stage column, not the viewport: the top and bottom dock cx is 957.6 against a viewport cx of 720 (+237.6 = rail/2). The band is x475.2 w964.8 and `--dock-band-inset-start` is 475.2px (`probe-before.json` K2, `K2-cube-paneopen-*.png`). At 390 (sheet, no rail) the docks are centred (cx 195). | ESC-dock-2: `demo/app/dock/ChromeDock.vue:599-602` and `demo/components/instrument/transport/TransportDock.vue:345-348` (`.dock-band{left:var(--dock-band-inset-start)}`), published by `demo/components/instrument/transport/AnimationControlsGroup.css:92-96` (`--dock-band-inset-start: var(--rail-width)` while the rail is open). | consumer |
| OD19-K3 | The direction and fill-mode triggers hold only the value text plus the chevron (1 svg each, the chevron). Easing has its curve glyph (`K3-direction-fill-*.png`). Their chevrons point up (^) while easing's points down (v). | `demo/components/instrument/pane/channel-controls/ChannelOptionsForm.vue:89-106`: `SelectTrigger` holds `<SelectValue/>` only, and the items are bare text. The glyph seat to mirror is `EasingField.vue:44-56`. | consumer |
| OD19-K4 | The Reverse/Preview verb row (36px tall) sits above a 64px ball track of three discs (start, live, dashed ghost) as two separate bands (`K4-reverse-preview-balls-*.png`; rowY 616, trackY 660 at 1440). | `demo/components/playback/PlaybackRibbon.vue:127-175` (the verb row, two quiet Buttons) and `:183-192` (PreviewToggle around AnimationVisualizer). The discs are `demo/components/playback/AnimationVisualizer.vue:43-58`. | consumer |
| OD19-K5 | The title hover wash is a square band inside the 16px (390: 12px) rounded layer. Trigger bg is 5% foreground, radius 0, and the layer has `overflow: visible` (`probe-before-2.json` K5, `K5-title-hover-*.png`). | glass: `glass-ui/src/components/configurator/styles.css:255-261` (`.configurator-layer-trigger:hover` paints a background with no radius and no inset) inside `.configurator-layer` (radius 16px, not clipped). The consumer only hosts it (`KeyframesStringControls.vue:31-37`, `.panel-content` design-idioms.css:196-199 sets tints only). | glass. Raise as an O-102 sub-row. No consumer act: patching it locally is forbidden. |
| OD19-K6 | Four separate icon DockControls (Controls, Keyframes, Timeline, plus the facet "Matrix: select the Matrix channel") with no visible titles (`K6-K8-topdock-expanded-*.png`, `motion.json` K6). | `demo/app/dock/ChromeDock.vue:503-529`, the `<template v-if="showSurfaceItems">` run of `DockControl v-for="item in surfaceItems"` (`onSurfaceItem` / `isSurfaceShowing`). The descriptors come from `state/controlSurfaces` `dockSurfaceItems`. | consumer |
| OD19-K7 | The editor has 3 inks only (dark: fg 233,230,226 ×25 · muted 172,160,145 ×26 · violet 190,149,236 ×8; light is the same 3 rungs), so selectors, `@keyframes`, property names and value keywords share colours. The status reads "Parsed" next to a 7px (390: 6px) success dot whose glyph is a check mark (`K7-editor-*.png`). | Inks: `demo/components/instrument/keyframes/CSSCodeEditor.vue:224-238`, the deliberate 3-rung table `utils/codeTokens.ts:16-20` (KF-C24-02), mirrored by `tokenizeCSS`. Status: `KeyframesStringControls.vue:39-47` (StatusDot `size="sm"` plus visible text). The check is glass's: `.feedback-mark[data-state=success]::after` (glass-ui.css, `status-dot` 10.1.0). | both. The consumer owns the inks, the size and dropping the text. Glass owns a success dot with no glyph (O-102 sub-row). |
| OD19-K8 | Not reproduced in the expanded rest state: radius 9999px both sides, run scrollLeft 0 (`K8-expanded-left-edge-zoom-*.png`). **The mechanism is measured, though.** The collapsed plate paints `border-radius: 50% 16px 16px 50%` (a D-shape: one side cut to 16px) because the collapsed run has overflow: scrollWidth 419 against clientWidth 56 at 1440, 333 against 56 at 390 (`layers.json`, `capTrace.json`, `K8-collapsed-puck-zoom-dark-1440.png`). The cut cap's leading arm cuts the LEFT corners whenever the run's scrollLeft > 0, which is the owner's frame. | glass: `glass-ui/src/components/dock/styles/run.css:502-511`. The scroll-driven "cut cap" (`gl-dock-cap-inline-start/end` on `--dock-run`) fires on a COLLAPSED dock whose overflow is an artefact of collapse, not hidden content. This is the same family as OD19-V1 (ellipse). The docket places it at glass D2 C1-C7. No consumer cause: ChromeDock content (419px) never exceeds its cap. | glass. Raise an O-102 sub-row with this evidence. No consumer act. |
| OD19-ALL (kf) | Scene swap cube→spring through the Scene select: the hash commits 451–479 ms after input. During the swap there are 5–8 frames over 34 ms and the worst frame is 119–140 ms. The View Transition is active for 8–13 frames (`motion.json` swap, `MOTION-swap-strip-*.png`). Keyframes surface: 276–407 ms from input to the editor's first paint, with one 128–134 ms long frame (the Monaco mount). Dev cold load to scene-ready: 246–621 ms (light/dark 1440/390-light), 757–1515 ms (dark-390 under machine load); FCP 228–324 ms; 250 requests / ~8.2 MB unbundled in dev (`probe-before.json`). The top dock EXPANDS IN ONE FRAME (56→433 px; there are only 2 distinct widths in every cell) but COLLAPSES over 24–33 frames. | Swap latency: `demo/app/transition/useSceneTransition.ts:78-93`. The swap serially `await`s `loadScene(id)` plus `settleClosingOverlays()` (`:106-117`, which waits out the closing Select's exit animation) BEFORE `viewTransition()` starts. The update callback then awaits `whenSceneReady` (`:85-89`) while the page is frozen on the old snapshot. Editor latency: `CSSCodeEditor.vue` creates Monaco on surface open. The dock expanding as a snap is glass's dock morph (docket: glass D2 R1-R8). | both. The consumer owns the swap path and the editor mount. Glass owns the expand morph. |

### glass-rooted sub-rows (named for O-102, measured)
- K5: `.configurator-layer-trigger:hover` (configurator/styles.css:255-261) paints a square wash inside a rounded, unclipped layer.
- K7: StatusDot `success` always draws a check (`.feedback-mark[data-state=success]::after`). The owner wants a plain, larger dot; this needs a glyph-less state or prop.
- K8 / V1: dock cut-cap (run.css:502-511) applies to a collapsed run. Measured: plate radius `50% 16px 16px 50%`, run 419/56 (1440), 333/56 (390).
- ALL: GlassDock expand is an instant width snap (2 distinct widths across the trace); collapse is animated (24–33).

## Packets (consumer cures; modify-file sets disjoint; none touches a path dirty with another seat)

| id | rows | files |
|---|---|---|
| KF-P1 dock | OD19-K2, OD19-K6 | demo/app/dock/ChromeDock.vue · demo/components/instrument/transport/TransportDock.vue · demo/components/instrument/transport/AnimationControlsGroup.css · test/demo/app/chrome-dock-containment.test.ts · test/demo/app/dock-surface-items.test.ts |
| KF-P2 pane controls | OD19-K3, OD19-K4 | demo/components/instrument/pane/channel-controls/ChannelOptionsForm.vue · demo/components/playback/PlaybackRibbon.vue · demo/components/playback/AnimationVisualizer.vue · test/demo/instrument/channel-options-w13x.test.ts · test/demo/instrument/playback-ribbon-contract.test.ts |
| KF-P3 code editor | OD19-K7 (consumer half), OD19-ALL (editor open) | demo/components/instrument/keyframes/CSSCodeEditor.vue · demo/components/instrument/keyframes/KeyframesStringControls.vue · demo/components/instrument/keyframes/utils/codeTokens.ts · test/demo/instrument/css-code-editor-seam.test.ts |
| KF-P4 route swap | OD19-ALL (scene swap) | demo/app/transition/useSceneTransition.ts · demo/app/scene/scenes.ts |

### Briefs
- **KF-P1 dock.** K2: drop the ESC-dock-2 stage offset at its root. Delete `.dock-band{left:var(--dock-band-inset-start…);transition:left…}` (ChromeDock.vue:599-602, TransportDock.vue:345-348) and its publisher (AnimationControlsGroup.css:92-96). Both bands then span `left-0 right-0`, so both docks centre on the viewport. K6: replace the DockControl run (ChromeDock.vue:503-529) with ONE glass DockTrigger `for="dropdown"` plus a glass DropdownMenu, the way the @mbabb menu does it. Its face is the showing surface's glyph. It lists titled items (glyph plus title from `dockSurfaceItems`), and a disabled item keeps its reason. Re-picking the showing item closes the pane. Rewrite the two tests to this contract at equal strength. Falsifier (#/cube, pane open, 1440/1280/1024/390, light+dark): top and bottom dock cx = innerWidth/2 ±1 (BEFORE 957.6 vs 720). The expanded dock does not intersect the pane. One trigger opens a menu naming Controls, Keyframes, Timeline and the facet.
- **KF-P2 pane controls.** K3: one value→lucide glyph table for direction (normal, reverse, alternate, alternate-reverse) and fill mode (none, forwards, backwards, both). Seat the glyph leading in the SelectTrigger and in each SelectItem (ChannelOptionsForm.vue:89-106), with the same seat and size as EasingField.vue:44-56's curve glyph. Align the chevron with easing's. K4 (be creative, using the ball): fold the verb row (PlaybackRibbon.vue:127-175) into the ball track (AnimationVisualizer.vue:43-58). The start disc becomes the Reverse button: its arrow glyph flips and it carries aria-pressed. The dashed ghost disc becomes the Preview toggle (eye / eye-off). Both stay named buttons with tooltips. Use glass Button/Tooltip only; add no wrapper. Falsifier (1440/390, light+dark): direction and fill triggers each hold a leading svg plus the chevron (BEFORE 1). No separate verb row exists (BEFORE rowH 36 above the track). Reverse and Preview are reachable by role and name and toggle state. The tests pass.
- **KF-P3 code editor.** K7 inks: widen CODE_INK (codeTokens.ts:16-20) from 3 rungs to 6, all from app tokens with identity hues kept: at-rule/selector, property name, value keyword, number+unit, keyframe stop %, and punctuation/comment (muted). Re-ink the Monaco rules (CSSCodeEditor.vue:224-238), and teach `tokenizeCSS` the same classes so StartingStyleTarget stays in lockstep. Status (KeyframesStringControls.vue:39-47): remove the visible "Parsed/Applied/Parse error" text. The words move to StatusDot `label`, and role=status/aria-live still announce. Set StatusDot `size="md"`. The success check glyph is glass's (an O-102 ask); do not mask it. Editor open: warm the Monaco chunk at idle or on surface hover so opening has no long frame. Falsifier: ≥5 distinct inks in `.view-lines`, dark and light (BEFORE 3). The status row has no visible text. Dot ≥9 px (BEFORE 7/6). Input→editor paint ≤150 ms with no frame >50 ms (BEFORE 276–407 / 128–134).
- **KF-P4 route swap.** The scene swap commits 451–479 ms after input, with 5–8 frames >34 ms and a worst frame of 119–140 ms. Root: `runSceneSwitch` (useSceneTransition.ts:78-93) serially awaits `loadScene` plus `settleClosingOverlays` (:106-117, the closing Select's exit animation) before `viewTransition()`, then freezes on the old snapshot until `whenSceneReady`. Acts: mark the three segments with performance marks, then cut the dominant ones at root. Warm the target chunk on trigger hover/open (`warmScene`, scenes.ts:132) so `loadScene` is already settled. Stop gating the transition's start on a full exit animation: wait a single frame, so the closed content leaves the old snapshot. Keep the KFA-26 no-double-exposure invariant (verify on the strip). Falsifier (1440/390, light+dark): input→hash ≤200 ms, no frame >50 ms during the swap, and a 5-frame strip with no double exposure.

K1 is in flight with another seat, so it has no packet. K5 and K8 are glass-only (see the sub-rows above).

### KF-P2-pane-controls

Rows OD19-K3, OD19-K4. keyframes.js `eb2b7bc1` (master, fast-forward pushed from `eb4048fe`).

- **K3 (cured, consumer).** `ChannelOptionsForm.vue` has one value-to-lucide glyph table, `OPTION_GLYPHS`. It is typed exhaustively over the engine's `DIRECTIONS` ∪ `FILL_MODES`:
  - direction: normal → ArrowRight, reverse → ArrowLeft, alternate → ArrowRightLeft, alternate-reverse → ArrowLeftRight
  - fill mode: none → CircleDashed, forwards → ArrowRightToLine, backwards → ArrowLeftToLine, both → MoveHorizontal

  The glyph leads in the SelectTrigger and in every SelectItem. It uses the curve glyph's box (1.5em × 1em, stroke 1.5, gap-1.5, ps-3). The trigger's `pe-10` puts the producer chevron in the easing chevron's column. Measured live at 1440 on the cured bytes (`chevron-probe.mjs`): each trigger holds 2 svgs (BEFORE 1). The option glyph's right edge is 233.3 px, equal to the easing curve glyph's 233.3 px.
- **K4 (cured, consumer).** The verb row is gone. The ball track's start disc IS Reverse: ArrowRight, flipped with `scale-x-[-1]` under Reverse, `aria-pressed`, the `.btn-playback` pressed skin. The dashed ghost disc IS the ball Preview toggle: eye / eye-off, `aria-pressed` while shown. Both are named glass Buttons with Tooltips, authored in `PlaybackRibbon.vue` and seated by `AnimationVisualizer.vue`'s `start` / `end` slots, with no wrapper. The discs flank the stage, so the ball never covers a control. Only the stage is aria-hidden. PreviewToggle now wraps the stage alone, and the discs stay. On the short desktop rail (KF-C5-03) the row stays compact: discs at `--control-h-md`, no ball, no eye. That is the same block size as the old verb row, so the scroller budget is unchanged.
- **Falsifiers.** RED on the pre-cure bytes 5/5, GREEN ×2:
  - `test/demo/instrument/channel-options-w13x.test.ts` (15) and (16)
  - `test/demo/instrument/playback-ribbon-contract.test.ts` "OD19-K4": no verb row; Reverse found by role and name, toggling and flipping; the real visualizer seats both discs around its stage; the short rail.
- **Gates.**
  - `npm run check` (vue-tsc ×2 + proof:structure): PASS.
  - Demo vitest ×2: 950/955. The 5 failures are in sibling seats' in-flight files (KF-P3 css-code-editor-seam, keyframes-pane-header, r4panes-artifact-ink; KF-P4 scene-swap-w13x). They are not on this packet's import path.
  - The 10 ribbon/options/preview files run alone: 89/89.
  - keyframes.js has no e2e suite.
- **Adjacent same-concern edits** (outside the modify set; the structure moved and assertions keep their strength):
  - `test/demo/instrument/preview-toggle.test.ts` (2) and (3) read the new seat.
  - The AnimationVisualizer stubs in `test/demo/instrument/transport-w13x.test.ts` and `test/demo/scenes/easing-preview-persistence.test.ts` now render the `start` / `end` slots.
  - No golden was re-baselined.
- **Glass-rooted (O-102 sub-row, measured).** glass `SelectTrigger`'s chevron carries `in-data-[state=open]:rotate-180`, which compiles to `:where([data-state=open]) .x`. That matches ANY open ancestor. Inside glass's own open `.configurator-layer` / `.configurator-layer-region` (both `data-state=open`, measured), the closed select's chevron points UP. Easing's ChevronDown points down. The scope should be the trigger's own `data-state`. The consumer does not patch it locally. The column alignment is the consumer's and is cured (`pe-10`).
- **Browser AFTER (1440/390 × light/dark): RUN 2026-10-20, and it caught a K3 layout defect, now cured in keyframes.js `e414a40f` (pushed).**
  - First run (on `eb2b7bc1`): each trigger did hold 2 svgs, but the glyph sat ABOVE a centred value. glass SelectTrigger's `[&>span]:line-clamp-1` turns any direct `span` child into a `-webkit-box`, and the cure's span row was one. This is the producer's documented recipe, so the cause is consumer-side.
  - Cure: the glyph and `SelectValue` (`min-w-0 flex-1 text-start`) are now the trigger's own children (`gap-1.5 pe-10`), with no span row. New falsifier `channel-options-w13x` (17): RED on `eb2b7bc1`, GREEN ×2. The 5 ribbon/options/preview files pass 62/62 ×2. `npm run check` PASS.
  - Second run (`probe-after.json`, `run.log`, 20 PNGs `K3-direction-fill-*`, `K3-direction-open-*`, `K4-track{,-reversed,-preview-hidden}-*`): in all 4 cells each trigger holds 2 svgs. The option glyph's x equals the easing curve glyph's x (208.7 at 1440, 131.7 at 390), and the chevron's right edge equals easing's (415.4 / 315). Every item carries 1 glyph.
  - K4, all 4 cells: the ribbon's children are `param-row, visualizer-row` (no verb row). `Reverse` and `Ball preview` are found by role and name. Reverse toggles `aria-pressed` false→true→false and the arrow gets `scale-x-[-1]`. The eye toggles true→false (stage `hidden`)→true (stage `shown`). The row stays 64 px tall.
  - Still open: the chevron points up (rotate 180deg, measured), as the O-102 sub-row above says. That cause is in glass.

### KF-P1-dock
**Rows:** OD19-K2 and OD19-K6. **Commit:** keyframes.js `13762e6e` (master, pushed). **Evidence:** `keyframes/after/KF-P1-dock/` (`probe.mjs`, `run-1/results.json`, and 24 frames: `K2-paneopen-*`, `K2-bottom-expanded-*`, `K6-menu-*`, for {light,dark}×{1440,1280,1024,390}).

- **K2 (cured at root).** I deleted ESC-dock-2's stage-column inset: the `.dock-band{left:var(--dock-band-inset-start,0px);transition:left …}` rule in ChromeDock.vue and TransportDock.vue, and its publisher `:root:has(.controls-layout--open…){--dock-band-inset-start:var(--rail-width)}` in AnimationControlsGroup.css. Both bands are now `fixed left-0 right-0`.
  - AFTER, measured on #/cube with the pane open: top and bottom dock cx = innerWidth/2 exactly (720 / 640 / 512 / 195), collapsed and expanded, in all 8 cells. BEFORE it was 957.6 against 720 at 1440.
  - The expanded docks do not intersect the desktop pane at 1440, 1280 or 1024 (pane x 71–478 / 66–421 / 28–360).
  - At 390 the pane is the mobile sheet. Its header row hosts the transport dock by design, and this packet does not touch it (the inset never applied below 1024), so the probe records `botOnSheetHeader` rather than asserting clearance there.
- **K6 (cured at root).** The four-control DockControl run is now ONE glass `DockTrigger for="dropdown"` (`aria-label="Editor surfaces"`, `aria-haspopup=menu`) plus a glass `DropdownMenu`, the @mbabb pair.
  - The trigger's face is the selected surface's glyph; failing that, the first live surface's.
  - Each row is a glyph plus a title from `dockSurfaceItems`. Live: Controls | Keyframes | Timeline | "Matrix: select the Matrix channel" (disabled, so the reason is kept).
  - Picking a row opens the pane on that surface. Re-picking the row the open pane shows closes the pane.
  - The blank facet seat (KF-C13-01) has no title, so it gets no row.
  - The menu rides ChromeDock's popup mutex (dock keepOpen/release) and `useDockEdgeOffset`.
- **Falsifiers.**
  - Vitest `dock-surface-items` (5 ChromeDock cases rewritten at equal strength: one trigger, titled rows with glyphs, pick opens, re-pick closes, disabled rows keep their reason, home has no trigger) and `chrome-dock-containment` (1) (`left-0 right-0`, no `dock-band`, no inline left). Both were run against a HEAD export: RED ×2 (6 failed / 8 passed, twice). On the cure: GREEN (14/14).
  - Playwright probe on headless chromium, one browser, a context per cell, run-1: `fails: []`.
  - Run-2 of the probe and the second vitest GREEN were queued behind guard admission: load was 100–177 for more than 2 h, and nothing was admitted after 17:29. They were not banked then.
  - **Resume 2026-10-20 (after the reboot, load ~19):** vitest on `13762e6e`+ master: GREEN ×2 (14/14 both runs). vue-tsc `-p tsconfig.json`: clean. Probe run-2 (`run-2/`, 24 frames + `results.json`): `fails: []`. Top and bottom cx = 720/640/512/195 in all 8 cells, collapsed and expanded. One trigger, with no DockControl run. Menu rows: Controls | Keyframes | Timeline | "Matrix: select the Matrix channel" (disabled). The keyframes app has no e2e spec over the dock; the probe stands as its touched browser check. No source changed on resume.
  - vue-tsc `-p tsconfig.json`: clean.
- **Residuals (outside the modify set, not touched):** `scripts/lib/demo-driver.mjs:941` and `scripts/observe/demo/live-session{,-mobile}.mjs` still read the selected surface from `[data-dock-surface-item][data-selected]` on the dock. The rows now carry that attribute inside the portalled menu, which renders only while the menu is open. These observers need to read `[data-dock-surface-trigger][data-surface]` instead.
- **Same-concern adjacent lines:** none beyond the five files.

### KF-P4-route-swap

- **Rows:** OD19-ALL (the scene swap). **Verdict:** latency CURED. The frame budget is ESCALATED as two named residuals outside the modify set.
- **Commit:** keyframes.js `38951f24` on master, pushed fast-forward (`13762e6e..38951f24`).
- **Root, measured:** this packet added performance marks (`scene-swap:prepare` / `:commit` / `:total`). On the BEFORE code they showed prepare at **306–321 ms**: `settleClosingOverlays` awaited the closing Select's full exit animation before `viewTransition()`. Commit, the frozen old snapshot until `whenSceneReady`, ran 77–101 ms.
- **Cure (`demo/app/transition/useSceneTransition.ts`):**
  - After the one frame reka needs to mark the content `data-state="closed"`, the finite exit animations of closed content are `finish()`ed, not awaited. `finish()` fires `animationend` and presence unmounts the content. The cross-dissolve itself is that content's exit.
  - Infinite animations are left alone.
  - The three performance marks stay as the swap's segment instrumentation.
- **`warmScene`, `scenes.ts`:** no change. `loadScene` was not a dominant segment: prepare after the cut is 8–46 ms, bounded by the one rAF. Every chunk is already warmed at idle (`warmScenesAtIdle`) and again when the Scene menu opens (`ChromeDock` `warmScene`). Hover-warming would need `ChromeDock.vue`, which is outside this set and was being edited by a sibling seat.
- **Falsifier, vitest:** `test/demo/app/scene-swap-w13x.test.ts`. The KFA-26 case is rewritten to the one-frame invariant:
  - the exit's `finish()` is invoked before `startViewTransition`;
  - the exit's `finished` (which never settles) is not awaited;
  - an infinite animation is not finished;
  - the KFA-25 hold on the update callback is unchanged.
  - **RED on HEAD** (`startVT` called 0 times): `after/KF-P4-route-swap/vitest-RED.txt`.
  - **GREEN ×2:** run 1 was the app scene suite, 19 files, 80/80. Run 2 was the falsifier file, 5/5.
  - The old assertion "no capture while the exit runs" encoded the removed wait. Its invariant (no popover in the old capture) is now asserted as finish-before-capture.
- **Falsifier, probe:** `after/KF-P4-route-swap/swap-probe.mjs`. Headless chromium, cube→spring through the dock Scene select, 1440/390 × light/dark. The timed pass takes no screenshots; the strip pass is separate.

| measure (run 1 / run 2) | BEFORE | AFTER |
|---|---|---|
| input→router push (budget ≤200 ms) | 451–479 ms | **68–76 ms / 37–47 ms**, GREEN ×2 |
| prepare segment | 306–321 ms | 11–46 ms / 8–11 ms |
| commit segment (frozen old snapshot) | 77–101 ms | 95–111 ms / 66–83 ms |
| frames >50 ms, 390 | 1 | 1 / 1 (the commit freeze) |
| frames >50 ms, 1440 | 4–5 | 4 / 4–6 |
| 5-frame strip | — | one dissolve, no Select rows over the new scene (`contact-cut{1,2}-*.png`, `strip-cut2-*`) |

- **Frame budget (≤50 ms), ESCALATED.**
  - **(a) Commit freeze, 66–111 ms, one frame.** A CPU profile (`commit-profile.json`) attributes it to the Spring scene's own mount:
    - Vue patch/mount: 71–93 ms of samples;
    - forced layout: `getPropertyValue` and `getBoundingClientRect`, about 45–50 ms;
    - `demo/components/playback/AnimationVisualizer.vue:73 getMaxX`;
    - `demo/components/instrument/pane/composables/useFoldLanding.ts:358 land`.
    - These are consumer-side, owned by the scene and pane packets, not this modify set.
  - **(b) 1440 cross-fade frames, 65–98 ms.** These are the compositor animating the full-viewport snapshot pair at DPR 2 in headless software raster, with the live scene animating underneath. They are not attributable to the dispatch.
- **Typecheck and machine:**
  - vue-tsc `-p tsconfig.json` and `-p tsconfig.test.json`: clean.
  - One suite rerun hung at 0 % CPU under load 160 and the guard killed it at the 10-minute timeout (rc 124). A concurrent run in the same window failed two tests outside this change (`home-cube-one-mount`, KFA-24) while sibling seats had other app files dirty. Neither is attributed to this cure.
- **Same-concern adjacent lines:** the test file above (the falsifier for the changed mechanism). Nothing else was touched.
- **Re-deploy check, 2026-10-20:** `38951f24` is an ancestor of `origin/master`. The modify set and falsifier are unchanged since then. `scene-swap-w13x` passes 5/5 under guarded. No new act was needed, and residuals (a) and (b) still stand.

### KF-P3-code-editor

Rows OD19-K7 (consumer half) and OD19-ALL (editor open). keyframes.js commit `be52ee80` on master, pushed. Evidence: `after/KF-P3-code-editor/`.

- **K7 inks: root `codeTokens.ts` CODE_INK plus the Monaco rules.**
  - The table widens from 3 rungs to 6. Each rung is an app token or a `color-mix()` of two, so the identity violet is kept and red is not used:
    - structure: at-rules, selectors and the `@keyframes` name (`--foreground`);
    - property (violet mixed with foreground);
    - value keyword (foreground mixed with muted);
    - number+unit (`--color-progress`);
    - keyframe stop (`--accent-kf-strong`, bold);
    - punctuation/comment (`--muted-foreground`).
  - Monaco's css grammar is copied as data. The `@keyframes` name becomes `tag`, and the keyframe body reads `0%`/`from`/`to` as `keyframe.stop`. The theme rules map the Monarch classes onto the six rungs.
  - `tokenizeCSS` folds the same classes. StartingStyleTarget is unchanged and stays in lockstep.
- **K7 status (KeyframesStringControls).**
  - The visible word is gone. It is now StatusDot's `label` (role=img, aria-label), inside the same `role=status aria-live=polite` region.
  - The dot is keyed on state, so each change adds a named node and is announced.
  - `size="md"`.
  - The success check is glass's (O-102 sub-row, unchanged). It is not masked.
- **ALL (editor open).**
  - Three acts:
    - The hidden well's first idle period warms the Monaco chunk.
    - One idle period later it primes Monaco's page-wide font measurement. This is a throwaway editor with the same font, in an offscreen box at `<body>`, never in the well, disposed in the same task.
    - The theme resolves its 11 colours through one `display:none` probe.
  - A box that arrives on a pane open boots one frame later.
  - Root, measured: the open's boot task was 51–55 ms with 27–30 ms of forced layout (`loaf-open` before the font warm). The CPU profile puts the forced layout in Monaco's `readFontInfo → readCharWidths` chain (`profile-open-forced.txt`).
  - The one-idle-seat contract (KFA-81, case 5) holds: a well that already has its box boots in the mount's idle period.

| measure (probe run 1 / run 2; light+dark × 1440/390) | BEFORE | AFTER |
|---|---|---|
| distinct inks in `.view-lines` | 3 | **6 / 6** in all 4 cells |
| visible status text | "Parsed" | **"" / ""** (aria-label "Parsed", aria-live polite) |
| status dot | 7 px (390: 6 px) | **11.6 px (390: 10 px)** both runs |
| input→editor paint (budget ≤150 ms) | 276–407 ms | **46–67 ms / 51–63 ms** |
| worst frame during the open (budget ≤50 ms) | 128–134 ms | **16–26 ms / 18–22 ms**, 0 frames over 50; `loaf-open.log` records no LoAF |

- **Falsifier, vitest:** `test/demo/instrument/css-code-editor-seam.test.ts`.
  - The new cases:
    - (0) the hidden well warms the chunk and then the font, with no editor in the well and no geometry read;
    - (9) the theme inks 6 Monarch classes apart, and the grammar emits `keyframe.stop` and the `tag` name;
    - (10) `tokenizeCSS` gives 6 rungs;
    - (11) the status is a labelled md dot with no visible text, in a polite region.
  - **RED at HEAD:** 6 failed, 8 passed (`vitest-RED-head.log`, which includes pane-header).
  - **GREEN ×2:** 16/16 (`vitest-GREEN-{1,2}.log`).
  - Neighbour suite: 11 files, 85/85 (`vitest-neighbours.log`).
  - vue-tsc (app + test): clean.
  - No e2e spec touches the editor or status.
- **Probe:** `probe.mjs` (`run1/`, `run2/`, with editor PNGs for each cell), `loaf-open.mjs`, `profile-open.mjs`, `warm-check.mjs`. All headless chromium, one browser per run, a context per cell. The opener follows KF-P1's dropdown (`[data-dock-surface-trigger]` → menuitem), and input is the press on the Keyframes item.
- **Same-concern adjacent lines, listed:**
  - `test/demo/instrument/keyframes-pane-header.test.ts`: the status word is read from the dot's label. Text empty, aria-live and data-size md are added, and the stub takes `label`/`size`.
  - `test/demo/scenes/r4panes-artifact-ink.test.ts`: property names take the `property` rung, and the artifact now carries 5 distinct inks (it has no keyframe stop).
  - Both assertions moved to the new contract at equal or greater strength. Nothing was skipped or deleted, and no golden was re-baselined.
- **Glass (O-102, unchanged):** StatusDot `success` always draws a check (`.feedback-mark[data-state=success]::after`). The owner's plain dot needs a glyph-less state or prop.

### load

OD19-ALL, the keyframes half: "All loading times for all apps needs to be improved, every page, every app", and route-to-route navigation "smoothly and subtly".

**Cure:** keyframes.js `9439cfb7` (pushed to master).

**Method.**
- Production build (`vite build --mode gh-pages`) served by `vite preview`. One guarded run (`load/measure-final.sh`), with the servers stopped on exit.
- Headless Chromium at **CPU 4× (CDP `Emulation.setCPUThrottlingRate`)**, no network throttle (localhost), 1440×900, light. One browser per run and one context per cell.
- Probe: `load/load-probe.mjs`.
  - **Cold** = a fresh context per route, deep link `#/<route>`. Content = the scene host holds the scene, with no skeleton and no view transition running.
  - **Warm** = one context booted on `#/cube` with 3 s idle, then hash navigation route to route (the router → `runSceneSwitch` path the dock takes). It records the `scene-swap:*` measures and rAF frame timing.
  - **Surf** = a pick from the dock's Editor-surfaces menu.
- Builds:
  - BEFORE = `dist/od19-before` (keyframes `be52ee80`, the tree before these cures).
  - AFTER = `dist/od19-final` (the cured tree, `9439cfb7` content plus `e414a40f`, plus another seat's one-class hunk in KeyframeTimeline.vue). Re-measured ×2, interleaved with the before run on the same machine state (2026-10-20 ~15:30, load ≈ 20).
- Routes: home, cube, amiga, square, easing, spring, sequence (every scene in `demo/app/scene/scenes.ts`). Keyframes and Timeline are dock surfaces, not routes, and are measured as surf rows.

**Root causes (measured) and cures.**
1. **A deep link rendered home first.**
   - The first-load seed ran in the `router.isReady()` microtask, after App's first render. Every cold `#/<scene>` fetched and evaluated the home-only `HeroAurora` chunk (211 KB), mounted the start screen, then switched.
   - Cure: `useSceneMachineRouterBinding.ts` seeds in setup once the initial navigation has resolved, which happens on every boot. `main.ts` warms the linked scene's chunk beside the engine chunk instead of after mount.
2. **Each well mount redid the Monaco page work.**
   - `CSSCodeEditor.vue` kept its boot promise and font-measurement warm in `<script setup>`, so every well mount (one per scene swap, force-mounted hidden) re-registered the `css` grammar and built a second throwaway editor inside the swap.
   - Cure: both move to module scope.
3. **Already in place and verified, not re-authored.**
   - Route-level splitting: every non-home scene is its own chunk. Monaco, three and Aurora load lazily behind their consumers.
   - Prefetch on intent: opening the Scene list warms every scene chunk (`ChromeDock.vue` `warmScene`), the surfaces menu warms the Monaco pane, and `warmScenesAtIdle` runs after first paint.
   - The scene fallback is glass `Skeleton` in a glass `Card` (`SceneSkeleton.vue`), with no text loader. "Loading scene" is a polite-region announcement only.
   - The swap is the untyped glass cross-dissolve plus the shared-element morph, which animates opacity and transform only. The demo carries no `::view-transition-*` CSS of its own.

| cold route | content ms (before → run1 / run2) | JS KB before content | long tasks before content (count / total ms) | Aurora fetched |
|---|---|---|---|---|
| home | 577 → **553 / 498** | 1096 → **1096 / 1096** | 2/456 → **2/441 / 2/405** | True → True / True |
| cube | 833 → **652 / 652** | 1096 → **885 / 885** | 2/701 → **2/540 / 2/552** | True → False / False |
| amiga | 1113 → **699 / 800** | 1704 → **1424 / 1424** | 3/902 → **3/560 / 3/639** | True → False / False |
| square | 934 → **729 / 831** | 1111 → **901 / 901** | 3/764 → **3/605 / 3/687** | True → False / False |
| easing | 1063 → **794 / 936** | 1109 → **898 / 898** | 3/903 → **3/655 / 3/762** | True → False / False |
| spring | 1059 → **651 / 798** | 1138 → **927 / 927** | 3/860 → **3/520 / 3/625** | True → False / False |
| sequence | 887 → **577 / 639** | 1105 → **894 / 894** | 3/705 → **3/452 / 3/502** | True → False / False |

| warm swap | total ms (before → run1 / run2) | commit ms | worst frame ms | frames > 50 ms | new KB fetched |
|---|---|---|---|---|---|
| cube->amiga | 1371 → **949 / 1031** | 370 → **257 / 285** | 535 → **348 / 363** | 6 → **5 / 5** | 996 → **3466 / 3466** |
| amiga->square | 740 → **688 / 706** | 322 → **270 / 303** | 359 → **299 / 339** | 4 → **5 / 5** | 0 → **0 / 0** |
| square->easing | 1080 → **891 / 952** | 528 → **431 / 465** | 582 → **473 / 510** | 6 → **6 / 7** | 0 → **0 / 0** |
| easing->spring | 848 → **842 / 725** | 322 → **318 / 261** | 370 → **364 / 303** | 6 → **6 / 6** | 0 → **0 / 0** |
| spring->sequence | 553 → **551 / 547** | 177 → **146 / 147** | 223 → **182 / 183** | 5 → **6 / 6** | 0 → **0 / 0** |
| sequence->cube | 1304 → **980 / 1110** | 309 → **211 / 245** | 428 → **337 / 446** | 4 → **3 / 4** | 0 → **0 / 0** |
| cube->home | 500 → **433 / 487** | 66 → **30 / 27** | 154 → **116 / 123** | 6 → **5 / 3** | 0 → **211 / 211** |
| home->easing | 853 → **823 / 868** | 403 → **413 / 436** | 447 → **453 / 482** | 5 → **4 / 4** | 0 → **0 / 0** |

| editor surface (dock menu pick) | click → content ms | worst frame ms | long tasks |
|---|---|---|---|
| Keyframes/idle3s | 856 → **763 / 806** | 231 → **190 / 259** | 4 → **4 / 4** |
| Keyframes/first | 967 → **862 / 889** | 190 → **184 / 195** | 4 → **4 / 4** |
| Timeline/idle3s | 100 → **103 / 106** | 167 → **175 / 171** | 3 → **3 / 3** |
| Timeline/first | 126 → **129 / 130** | 203 → **194 / 196** | 4 → **4 / 4** |

**Falsifiers.**
- **Committed perf spec:** keyframes.js `scripts/observe/demo/route-load.mjs`. Run it with `KF_PLAYWRIGHT_DIR=<value.js>` (keyframes carries no playwright), and `KF_DIST=<build>`.
  - Bars per route: cold content ≤ 1500 ms.
  - JS before content ≤ 960 KB; home ≤ 1150, amiga ≤ 1500.
  - Aurora is fetched on home only.
  - Warm swap prepare ≤ 150 ms and commit ≤ 650 ms.
  - Results:
    - BEFORE build: **FAIL (12)** (`load/gate-final-before.txt`).
    - AFTER build: **PASS ×2**, 35/35 checks each (`load/gate-final-{1,2}.txt`).
  - A run with no resolvable browser now **exits 2**. The first pass of this re-measure exposed a vacuous PASS (`withBrowser` skipped silently), and that path is now a failure.
- **vitest** (`--maxWorkers=2`): 94/94 across 20 files. These include `test/demo/app/deep-link-first-render.test.ts` (RED 3/3 at HEAD) and `css-code-editor-seam` (0b) (RED at HEAD; `load/vitest-RED.txt`).
- **vue-tsc** (app + test): clean.
- No test was deleted, skipped or weakened, and no golden was re-baselined.

**Residuals (named, not hidden).**
- **Warm swap frames over 50 ms are unchanged (3–7 per swap at 4×).** They sit inside the commit span, where the View Transition holds the frozen old paint while the destination scene mounts. That paint is the captured snapshot, so the visible dissolve is not where the jank lands. The cut is the commit span itself (−5–30 %).
- **The first warm swap off a cold `#/cube` fetches 3466 KB.** This is the idle warm of the Monaco and three chunks landing inside that swap's window at 4× CPU. Before the cure, the home detour had fetched them earlier. It is latency the user does not wait on: prepare is 66–87 ms against a 150 ms bar.
- **The Keyframes surface open (click → Monaco lines) is 763–889 ms at 4×, down from 856–967.** Monaco's own evaluation is the floor.
- **Glass (O-102, unchanged):** `Skeleton` is a breathe, not a shimmer. The owner's "skeleton shimmer" is relayed to glass by the orchestrator (DOCKET), and no local animation is authored.

Evidence: `keyframes/load/` (`final-before.json`, `final-{1,2}.json`, `gate-final-*.txt`, `table.py`, `measure-final.sh`; the earlier seat's `before-*/after-*/profile-*` captures are kept).

### repair 1

Critic 1's five consumer findings on keyframes (C1-KF-03, -04, -09, -10, -11), cured at the root or routed with measurements. Commit: keyframes.js `2457f241` (master). BEFORE = kf `9439cfb7` built (`dist/r1-before`); AFTER = the repair built (`dist/r1-final`). Every probe ran headless through `guarded`, one browser per run, with a context per cell. Evidence: `keyframes/after/repair-1/`.

| row | verdict | cause → cure | falsifier (RED → GREEN ×2) |
|---|---|---|---|
| C1-KF-04 code inks | **CURED** | `CODE_INK` set structure and value as two near neutrals, and property, number and stop as three violets. Each rung now has its own hue, taken from glass's categorical, theme-armed `--section-color-*`: property is blue (`-3`), value is green (`-10`), and stop is amber (`-5`) stepped 30 % toward `--foreground`. Number keeps the identity violet (§0dm), punctuation keeps the muted ink, and no rung uses red or pink. The Monaco theme and `tokenizeCSS`/StartingStyleTarget read the same table, so they stay in lockstep. | committed `scripts/observe/demo/code-ink.mjs`: the minimum pairwise OKLab ΔE of the six resolved rungs must be ≥ 0.085 in light and in dark. HEAD table (`KF_INK_SRC=codeTokens-HEAD.ts.txt`): **FAIL ×2**, number/stop 0.073 light and 0.058 dark. AFTER: **PASS ×2**, 0.092 light (value/punct) and 0.104 dark (value/stop). Frames: `frames-{before,after}/K7-editor-*.png`. |
| C1-KF-10 surfaces menu | **CURED** | The rows were plain `DropdownMenuItem`s carrying a `data-selected` that nothing painted. They are now glass `DropdownMenuRadioGroup`/`DropdownMenuRadioItem`, so the showing surface wears the producer's own leading radio dot and `aria-checked`, the same affordance the Scene list uses. `@select` still routes the press, and re-picking the checked row closes the pane. Probe selectors moved in lockstep (`[aria-checked="true"]`). | `test/demo/app/dock-surface-items.test.ts`: role is `menuitemradio`, the showing row is the only `aria-checked="true"` row, and it has `.menu__radio-dot`. HEAD **RED ×2** (`vitest-RED-head*.txt`). AFTER GREEN in both gate runs. Live: Controls row checked with the dot visible, the others unchecked (`frames-after.json`, `K6-surfaces-menu-after-*.png`). |
| C1-KF-11 Reverse disc | **CURED** | The resting glyph was a lone `ArrowRight`, which reads as "next". It is now `ArrowRightLeft`, mirrored under Reverse as before, at the eye disc's 1rem glyph rung (`size-4`). | Live: the glyph is `lucide-arrow-right-left` at 16 px in a 48 px disc, light and dark (`K4-reverse-disc-*.png`, `frames-*.json`). |
| C1-KF-03 swap long frames | **PARTIAL: consumer cut landed, remainder routed** | Measured cause split (prod build, 1x, dock Scene pick; `swap-diag.mjs`, `swap-regions.mjs`, `swap-vt.mjs`): **(a)** one script frame, the destination mount inside the VT update callback; **(b)** 3–5 frames of 80–105 ms that contain **no script**, during the dissolve. For (a) on Easing, `curvePlot` ran all 48 bisection halvings on every grid interval (3,201 curve calls per tile, about 40 ms of the mount). The bisection now stops once the bracket's difference falls under the jump floor, and the vertices are unchanged. | `test/demo/scenes/curve-plot-cost.test.ts`: ≤ 1,200 calls for a continuous curve, and vertices identical to the full-depth algorithm for every tile. HEAD **RED ×2** (`linear: 3201`). AFTER GREEN ×2. Swap (`vt-before-*` vs `vt-final-*`): Easing commit **125–131 → 87–89 ms**, worst frame **147–153 → 104–106**, VT ready 235–247 → 166–180. Spring and Sequence are unchanged (commit 59–66 / 35–40). |
| C1-KF-09 option chevrons | **GLASS-ROOTED (O-102 sub-row, already named in KF-P2; re-measured)** | Direction and fill mode compute `rotate: 180deg`, and easing computes `none`. Their nearest open ancestor is glass's own `.configurator-layer-region[data-state=open]`, which glass `SelectTrigger`'s `in-data-[state=open]:rotate-180` matches (`frames-*.json` `chevrons`). Easing is a Popover trigger with no producer chevron to adopt. Copying the producer class locally, or overriding the rotate, would patch producer behaviour, so the consumer authors nothing here. | (glass fix: scope the rotate to the trigger's own `data-state`). |

**C1-KF-03: what remains, and why it is not the consumer's.**
- **The dissolve's own frame cost (O-102 sub-row, new).** Control `vt-null.mjs` starts a null View Transition (no DOM change) on each settled scene.
  - Rest frames: worst 10–26 ms, mean 7–12.
  - During the dissolve: worst **70–90 ms**, mean 30–43.
  - With `backdrop-filter: none` injected: worst 41–60, mean 12–23.
  - So the 80–105 ms no-script frames inside a swap are the platform re-rendering the live new-state image of a page of glass blur materials. That cost is the floor of any root dissolve here (headless SwiftShader; a GPU compositor will differ).
  - A tried cut was measured and reverted: finishing the destination's finite mount animations before the capture (`vt-a-1x`, `vt-b-run*`). It left the VT frames within run-to-run noise, so it was not kept (KISS).
- **Mount-time computed-style reads in glass composables (O-102 sub-row, new).**
  - Over the commit window (`regions-commit-{easing,spring}.json`, sync-marked): native `getPropertyValue` takes **24–26 ms**. `useLiquidPress`, `useLiquidFlex` and `writeVelocityWeight` take 14–25 ms each, inclusive.
  - glass `writeVelocityWeight` reads `getComputedStyle(el).getPropertyValue("--motion-weight"/"--flex-vel")`, and `motionTempo` reads `--motion-tempo`, once per instance. Inside a swap, each read forces a style recalc of the incoming tree.
  - Asks for glass: read the root tokens once, or after the first frame.
- **KF-P4's swap falsifier (no frame > 50 ms) stays RED** in this environment, for the two causes above. On the built app, input→hash measured 103–191 ms at BEFORE (`diag-before-1x.json`), and AFTER the new state is captured (VT `ready`) at 94–180 ms after the pick (`vt-final-*`), inside the 200 ms bar. The critic's 206–209 ms was measured on the dev server under load 15–25.

**Gates ×2 (guarded):** `npm run check` (vue-tsc app + test + proof:structure) PASS ×2. `vitest --project demo --maxWorkers=2` **158 files / 963 tests** PASS ×2. `route-load.mjs` over `dist/r1-final` PASS ×2. eslint on the touched demo files is clean. No test was deleted, skipped or weakened. Two assertions in `dock-surface-items` moved from `menuitem`/`data-selected` to the producer's `menuitemradio`/`aria-checked`, which is a stronger check of the same row. No golden was re-baselined.

### repair 2

Critic 2's three consumer findings on keyframes (C2-KF-01, -02, -03). Commit: keyframes.js `6ab81299` (master). BEFORE = kf `2457f241` built (`dist/r2-before`). AFTER = the repair built (`dist/r2-final`). Every probe ran headless through `guarded`, one browser per run, with a context per cell. The default renderer is the headless shell's SwiftShader. The GPU witness is the same headless shell started with ANGLE-Metal (`--use-angle=metal`), not branded Chrome. Evidence: `keyframes/after/repair-2/`.

| row | verdict | cause → cure | falsifier (RED → GREEN ×2) |
|---|---|---|---|
| C2-KF-02 Reverse glyph | **CURED** | The C1-KF-11 disc drew `ArrowRightLeft`, which the direction select uses for `alternate`. `OPTION_GLYPHS`, the pane's one value→glyph table, moved out of `ChannelOptionsForm.vue` into its own module, `channel-controls/optionGlyphs.ts`. The ribbon's Reverse disc now draws `OPTION_GLYPHS.reverse` (`ArrowLeft`), mirrored under Reverse as before. Each glyph in the pane now has one meaning. | `playback-ribbon-contract.test.ts` "C2-KF-02": the disc's lucide glyph equals the table's `reverse` entry and none of the non-reverse entries. On HEAD sources it is **RED ×2** (`vitest-RED-head-{1,2}.txt`). AFTER it is GREEN in both gate runs. Live (`frames/ui-frames.json`, `K4-pane-{before,after}.png`): the disc is `arrow-right-left` → `arrow-left`, and the direction trigger still shows `arrow-right-left` for `alternate`. |
| C2-KF-03 disabled row title | **CURED** | `dockSurfaceItems` made the latent facet's title the disabled-reason sentence. The row's title is now `meta.label` ("Matrix"), and the reason ("Select the Matrix channel") is a new `reason` field. `ChromeDock` renders `reason` as the glass `DropdownMenuRadioItem`'s `aria-description`, because the glass item has no secondary-text seat. Enabled rows carry no description. | `dock-surface-items.test.ts`: the disabled row's text is "Matrix", its `aria-description` is the reason, the three enabled rows have none, and the descriptor is `{title: "Matrix", reason: …}`. On HEAD it is **RED ×2** (2 tests). AFTER it is GREEN ×2. Live: the menu is **333 → 172 px** wide at 1440, and the row reads "Matrix", dimmed (`K6-menu-{before,after}.png`). |
| C2-KF-01 Cube/Amiga swap frame | **ENVIRONMENT-ROOTED (SwiftShader software raster). No consumer cause on a GPU compositor. Locked by a witness. No source change.** | Measured with `swap3d.mjs`: the dock pick from Spring into Cube and into Amiga, over the built app. **(a) Cube:** on SwiftShader there are 4 frames of 250–703 ms per swap (`diag-before.json`, `before-sw-2.json`). The cause is the dissolve. With the root dissolve off (`novt`), the swap peaks at 64–98 ms. Naming the 3D subject on its own (`scene-3d`) was measured twice. On the perspective root, the peak fell to 94–118 ms, but the mid-dissolve frame shows that the name **flattened the cube** to its front face (`frames/swap-cube-mid-rejected-graphname.png`). On the non-3D wrapper, the cube keeps its 3D and the cost stays at 615–709 ms (`diag-wrap.json`). So the cost is rastering a live preserve-3d context into a snapshot in software. It was reverted and is not kept. **(b) Amiga:** on SwiftShader there is one 281–444 ms frame that has no LoAF (the main thread is idle). It starts at the room's first `drawElements` (GL trace in `diag-before-2.json`), and it stays at 326–375 ms with the dissolve off. Turning off antialias or mipmaps does not move it (`diag-amiga.json`). It is SwiftShader building the Vulkan pipeline at the first draw. **On ANGLE-Metal**, the same BEFORE code peaks at 58–93 ms with the dissolve on (`diag-gpu.json`). | Committed `scripts/observe/demo/swap-3d.mjs`: Spring→Cube→Spring→Amiga ×2 on the GPU witness, and no frame over 120 ms on any swap into Cube or Amiga. It exits 2 when only SwiftShader is served, so it never passes vacuously. Over `dist/r2-final` it **PASSES ×2**: Cube 53–79 ms, Amiga 55–68 ms (`gate-swap-3d-{1,2}.txt`). There is no RED, because the GPU frame was never over the bar. The critic's reading is the shell's software rasterizer. Changing the boot scene's transition to suit that rasterizer would overfit the test environment. |

**Gates ×2 (guarded):** `npm run check` (vue-tsc app + test + proof:structure) PASS ×2. `vitest --project demo --maxWorkers=2` **158 files / 964 tests** PASS ×2 (one test more than repair 1: the C2-KF-02 assertion). `swap-3d.mjs` over `dist/r2-final` PASS ×2. eslint on the touched files is clean.
- No test was deleted, skipped or weakened. Two `dock-surface-items` assertions moved from the old reason-as-title string to the new contract, which also checks the description.
- No golden was re-baselined.
- The gate runs read a working tree that also held another seat's one-line `KeyframeTimeline.vue` hunk. It was not staged and not committed here.

### repair 3

Critic 3's four consumer findings on keyframes (C3-KF-01 to -04). Commit: keyframes.js `8876e82e` (master). BEFORE = kf `6ab81299` built (`dist/r2-final`). AFTER = the repair built (`dist/r3-final`). Every probe ran headless through `guarded`, one browser per run, with a context per cell. Default renderer: the shell's SwiftShader. GPU witness: the same shell on ANGLE-Metal, as in repair 2. Evidence: `keyframes/after/repair-3/`.

| row | verdict | cause → cure | falsifier (RED → GREEN ×2) |
|---|---|---|---|
| C3-KF-01 glass 10.1.1 + skeleton shimmer | **CURED** | `@mkbabb/glass-ui` is pinned to exactly `10.1.1`. Its lockfile integrity equals the registry's (`sha512-7e/gASh…Q8pQ==`), and its dependency and peer sets are identical to 10.1.0. `SceneSkeleton` sets glass's `<Skeleton shimmer>` (O-102b(3)), the producer's own sheen, so no local animation is authored. The dock-collapse overlay close (atlas G-3) arrives with the same bytes. The built CSS now carries `.skeleton[data-shimmer]` (`dist/r3-final/assets/index-*.css`); the BEFORE build does not. | `test/demo/app/scene-skeleton-shimmer.test.ts`: exact pin and lock integrity, and the mounted fallback's Skeleton carries `data-shimmer`. On HEAD sources: **RED ×2** (`vitest-RED-head-{1,2}.txt`). AFTER: GREEN in both gate runs. The dock-surface and scene-swap tests, plus `route-load.mjs`, were re-run on the repin (gates below). |
| C3-KF-02 first move into Home stalls | **CURED** | Home's backdrop was the one route-lazy chunk outside `sceneLoaders`. Nothing warmed it, and `loadScene(home)` resolved at once, so `HeroAurora` was fetched about 60 ms after the pick, inside the swap. HeroAurora's async boundary is now `HomeBackdrop = lazyScene(HOME_SCENE_ID, …)` in `scenes.ts`, the scenes' one load path. `warmScenesAtIdle` warms it, the Scene-menu open warms it (ChromeDock now also emits `warmScene` for Home's row), and `runSceneSwitch`'s pre-transition `loadScene` awaits it. Cold deep links still fetch Aurora on home only. | `route-load.mjs` gains a **deep link → Home** row: a fresh context boots `#/sequence`, idles, then goes home, under prepare/commit bars, with no HeroAurora request starting after the pick. BEFORE: **RED ×2** (`backdrop fetched after the pick: HeroAurora-*.js, *.css`; `route-load-RED-before-{1,2}.txt`). AFTER: **PASS ×2** (prepare 1–2 ms, commit 125–136 ms, none fetched late; `gate-route-load-{1,2}.txt`). The new `scripts/observe/demo/home-swap.mjs` (N=5 Sequence→Home picks through the dock, GPU witness) is **FAIL ×2** on BEFORE (every run fetches the backdrop late) and **PASS ×2** on AFTER (worst frame 42–59 ms, total 317–340 ms; `home-swap-{r2,r3}-final-gpu-{1,2}.txt`). |
| C3-KF-03 blank frame into Home | **MEASURED: no consumer layer is empty. The blank is a forced capture of the View Transition's render-suppressed update window. The C3-KF-02 cure also moves the chunk wait out of that window.** | Per-rAF layer record (`home-swap-*/home-swap-sequence.json` `layers`): every frame from the pick on holds the scene host's child and the top dock, BEFORE and AFTER. With the warm, the aurora root is present by the transition's second frame (BEFORE: only after its chunk). Control `vt-hold-control.mjs`: a **null** View Transition (no DOM change at all) whose update callback holds 60–300 ms, on a settled page, gives a `page.screenshot` of uniform background (stddev 0) in **5 of 12** holds (`vt-hold/`). That is the critic's 2 of 3. Control `vt-hold-screencast.mjs`: the compositor's **presented** frames (CDP screencast), for the same null transition and for the real Sequence→Home pick, are **never blank**, BEFORE or AFTER (min stddev 15.1–18.1; `vt-screencast{,-before}/`). A viewer never sees that frame. The update window the capture can land in is the swap's commit (31–40 ms here). | `home-swap.mjs` reads its strip from presented frames, and every presented frame of N=5 picks must have luma stddev ≥ 1. AFTER: **PASS ×2** (min 15.4–16.6). BEFORE also passes this clause. That is the finding: there was no real flash to turn RED. |
| C3-KF-04 surfaces face vs checked row at 390 | **CURED** | The face read `selectedControl`, while the checked row also required `isControlsPanelOpen`. The phone sheet never closes: ControlsPaneWrapper parks it at PEEK with its surface's title row in view, and the store fact is false. ChromeDock now derives both from one `selectedItem` read. The pane shows that surface while open, or always on the sheet layout (the same `(max-width: 1023px)` boundary the sheet uses). Re-picking the peeking row raises the sheet. | `dock-surface-items.test.ts` "on the phone sheet's peek…": face = Physics, and the Physics row is the only `aria-checked` row, with its dot. On HEAD: **RED ×2**. AFTER: GREEN ×2. Live (`dock390.mjs`, `#/spring`): BEFORE light/dark-390, face `spring` with checked `[]`. AFTER light/dark-390 and 1440, face `spring` with checked `["spring"]` (`dock390-{r2,r3}-final/`). |

**Environment note (C3-KF-02).** Under SwiftShader, both BEFORE and AFTER show 230–880 ms frames as the aurora's canvas arms. LoAF records **no script and 0 blocking** in them (`home-swap.mjs` `loaf`). They are software raster of the full-viewport aurora, the same class repair 2 parted on Amiga. `home-swap.mjs` therefore binds its 120 ms frame bar only on a GPU renderer and reports it under SwiftShader. On ANGLE-Metal, BEFORE had one run at 307 ms (n=3, the chunk landing inside the swap); its later runs were 44–53 ms. AFTER is 42–59 ms in all 10 runs.

**Gates ×2 (guarded):** `npm run check` (vue-tsc app + test + proof:structure) PASS ×2. `vitest --project demo --maxWorkers=2` **160 files / 969 tests** PASS ×2 (five tests more than repair 2). `route-load.mjs` over `dist/r3-final` PASS ×2. `home-swap.mjs` (GPU witness) PASS ×2. eslint on the touched files is clean.
- The first suite run (`prefix-vitest-{1,2}.txt`) failed 3 tests on two contracts the cure moves, and two assertions moved with them:
  - `chrome-dock-triggers` UIA-KF-242 now also expects Home's warm. This is stronger, and its failure had left a listbox open that cascaded into UIA-KF-131.
  - `scene-swap-w13x` awaits home's loader (the idle warm's state) before the switch, with all assertions unchanged.
- No test was deleted, skipped or weakened. No golden was re-baselined.
- Another seat's one-line `KeyframeTimeline.vue` hunk stayed in the tree, unstaged and uncommitted here.

### glass-10.1.1

Adopting `@mkbabb/glass-ui` **10.1.1** (tag `v10.1.1` at `d7baa1dc3`). Read before the work: MIGRATION §10.1.1 and the CHANGELOG 10.1.1 section, both whole. Code: keyframes `f8d6077b`. Evidence: `keyframes/after/glass-10.1.1/`. Every run went through `guarded`. Browser runs were headless Chromium, with one browser per run and one context per cell. Another seat's staged `KeyframeTimeline.vue` hunk stayed in the tree. It was not staged or committed here.

| item | verdict | detail |
|---|---|---|
| pin | **ALREADY ADOPTED** | `10.1.1` exact with registry-equal lock integrity: `8876e82e`, repair 3 (C3-KF-01). The demo never calls `provideDockContext`, so `DockContext.expanded` needs nothing. |
| G-2 menus on the popover rung | **RETIRED** (`f8d6077b`) | The consumer `z-popover` class is gone from the surface menu (`ChromeDock`), the @mbabb menu (`MbabbMenu`, whose MM-15 note is rewritten to name glass's role rung) and the Share popover (`SharePopover`). Live (`probe-skeleton-menu-3.json`): the @mbabb menu's content carries `z-popover` from glass, at z-index 130, and all 5 of 5 hit points land on the menu at both 1440 and 390. Run 2 missed three corners because it read during the reveal transition. Run 3 reads 700 ms after open, with a 12 px inset. |
| G-1 Sheet fixed | **NOTE ONLY** | No consumer override existed; the ControlsPaneWrapper note on the held SHEET-POSITION row (O-87/O-88) now records glass's cure. |
| O-102(3) collapse closes face overlays | **NOTHING TO RETIRE** | No code closes menus by hand on collapse. The `keepOpen()`/`release()` holds (ChromeDock Selects, MbabbMenu, TransportDock) are the documented way to keep the dock open while an overlay is up, and MIGRATION §10.1.1 names them as such, so they stay. The ChromeDock watchdog answers glass's touch gate, which collapses past the hold counter. 10.1.1 does not change that gate, so the watchdog is not redundant. |
| Skeleton shimmer | **ALREADY ADOPTED, RE-READ LIVE** | `SceneSkeleton` passes `<Skeleton shimmer>` (`8876e82e`). The live run deep-linked into `#/amiga` with its scene chunk held (`probe-skeleton-menu-3.json`). At 1440 and at 390 the fallback's Skeleton read `data-shimmer`, `::after` animation `skeleton-shimmer`, and an `::after` transform moving between reads 400 ms apart (-441.6 → -382.0 px). The host had no text. There is no local shimmer CSS. Runs 1–2 switched the hash from `#/cube`. An idle warm had sometimes already resolved the scene, so no fallback was mounted. The deep link removes that race. |

**Gates ×2 (guarded):** `npm run check` (vue-tsc app and test, then proof:structure) rc 0 ×2 (`check-{1,2}.txt`). `vitest run --project demo --maxWorkers=2`: **160 files / 969 tests ×2** (`vitest-demo-{1,2}.txt`). These include the dock and menu suites (`chrome-dock-*`, `dock-*`, `mbabb-menu-*`, `r4dock-*`) and `scene-skeleton-shimmer`. keyframes has no Playwright suite; its dock, menu and skeleton specs are these vitest files, and the live probe above is the browser read.

No golden was re-baselined. No test was deleted, skipped or weakened. glass-ui is untouched.

### residue (§0gp)

Residue seat, 2026-10-27, `claude-opus-5-5` (the re-deploy of the 2026-10-21 seat, whose HEAD readings, profiles and in-flight Easing cure this seat inherited and finished). Scope: the warm-swap frame budget (CLOSE §5.4) and the keyframes critic residue of the three OD19 passes. Code: keyframes.js `fc1a3383` (master, pushed). Evidence: `keyframes/residue/`. Every run went through `guarded`: browser runs never light, one browser per run, a context per rep, closed in `finally`.

**Cell of record (§0gp.2, §0fr.2).** `residue/warm-swap-probe.mjs`: headless real Chrome, `channel:'chrome'` (demo-driver `gpu: true`), `--use-angle=metal`; renderer read back as `ANGLE Metal Renderer: Apple M5 Max`. The need is cited in the probe header: a frame budget over a WebGL/blur page is a GPU-compositor fact. Production build, 1440×900, light. Boot `#/cube`, 3 s idle, then hash-swap amiga → square → easing → spring → sequence → cube → home, 2 reps per run. The budget is that no rAF frame inside a swap exceeds 50 ms. Software (`head-sw1-1.json`, the headless shell's SwiftShader) is INFORMATIONAL only.

**What the GPU cell reads (HEAD `f8d6077b`, runs `head-gpu1-1`, `head-gpu1-2`).** The CLOSE's "3–7 frames over 50 ms" was the software/4× reading. On the GPU cell each swap has **exactly one** frame over 50 ms, and it is the commit frame: the destination scene's mount, inside the View Transition update callback (LoAF invoker `import.then` / `ViewTransitionCallback`). The dissolve frames themselves are clean on the GPU, so the no-script 60–90 ms frames that C1-KF-03(b) measured are software raster (frames are vsync-quantised at 16.7 ms).

| swap | HEAD worst frame ms (r1 rep0/1 · r2 rep0/1) | HEAD commit ms | CURE worst frame ms (r1 · r2) | CURE commit ms |
|---|---|---|---|---|
| cube→amiga | 83/99 · 84/84 | 60–71 | 86/82 · 66/82 | 52–59 |
| amiga→square | 82/82 · 83/101 | 62–81 | 143*/67 · 66/67 | 50–60 |
| **square→easing** | **102/118 · 117/117** | **82–104** | **228*/69 · 67/67** | **49–59** |
| easing→spring | 83/84 · 83/83 | 58–67 | 230*/68 · 66/67 | 47–63 |
| spring→sequence | 50/51 · 50/50 | 28–37 | 50/51 · 50/33 | 25–33 |
| sequence→cube | 68/83 · 67/49 | 41–61 | 68/135* · 67/50 | 38–54 |
| cube→home | 38/45 · 46/38 | 6–7 | 177*/91* · 245*/33 | 5–7 |

`*` = cure run 1 rep 0 and the home row, read at load 45–58 (guard admission waited on load 45 > 36). The same reps' commit spans are in family, so these frames are machine noise rather than script. HEAD r2 and cure r2 ran back to back at load ≈ 30.

**Profile (`profile-swap.mjs` over the unminified build `dist/residue-head-nomin`, `prof-head-gpu1-{1,2}.json`, attributed by `attribute.py` to source `//#region`s).** Commit-frame busy time is 37–158 ms per swap. Named costs:
- **Easing tile plots (consumer, CURED):** the catalogue's 28 tiles re-plotted on every mount, about 24,000 curve calls through value.js `easing` (`h$2`) plus `curvePlot`. That is 10–15 ms of samples and the largest consumer script in any commit frame.
- **glass forced style (O-102, already filed at repair 1):** `getPropertyValue` under glass `maxStretch` (useLiquidFlex), and `writeVelocityWeight`/`motionTempo`. These are 5–25 ms per swap and the single largest forced-layout source in every swap.
- **glass dock measurement (O-102 / O-80 class):** `dock.js` `Ie`/`Ee`/`Oe`/`C`, `getBoundingClientRect` on the dock on every swap, 4–10 ms.
- **consumer, small:** `useFoldLanding.land` 2–4 ms, `AnimationVisualizer.getMaxX` ≈ 4 ms (amiga), keyframes `src/animation/resolve/browser.ts probeBrowserScalar` 5–6 ms (cube), SquareScene setup `getPropertyValue` 4 ms. Amiga's `attachRenderer` (18 ms) is already a later frame (KFA-76 builds the room past first paint), not the commit.
- The remainder is Vue's own patch and mount of the destination tree.

**Cure (keyframes `fc1a3383`): the swap into Easing builds no tile plot.**
- `curvePlot.ts` `unitEasingPlot(fn)`: one unit-frame plot per function object, held in a WeakMap. A plot is a pure function of its curve.
- `scenes/easing/specimens.ts`: the specimen groups plus ONE stable function per tile. Their plots are built when the scene chunk evaluates (the idle warm, `warmScenesAtIdle`, or a deep link's boot), not in the swap.
- `EasingTarget.vue` takes its specimens from that module. `EasingCatalogue.vue` draws through `unitEasingPlot`, so live dropdown kinds that hand fresh functions still plot as before.
- **Result on the GPU cell:** square→easing commit 82–104 → **49–59 ms**, worst frame 102–118 → **66–69 ms** (×2). That swap moves from the worst to in family with the others.

**Falsifier:** `test/demo/scenes/easing-swap-plots.test.ts`.
- (1)(2) a mount and a revisit call the tile curves 0 times. It was born RED at `f8d6077b`: 24,426 calls (`vitest-RED-head-{1,2}.txt`).
- (3) each tile's stroke equals its own function's plot.
- GREEN ×2 (`vitest-GREEN-{1,2}.txt`).

**Gates ×2.**
- `npm run check` (vue-tsc app and test, then proof:structure): rc 0 ×2 (`check-{1,2}.txt`).
- `vitest run --project demo --maxWorkers=2`: **161 files / 971 tests ×2** (`vitest-demo-{1,2}.txt`; 969 plus the 2 new).
- `scripts/observe/demo/route-load.mjs` over `dist/residue-cure`: PASS in 3 of 4 runs (`route-load-1.txt`, `route-load-disc-cure.txt`, `route-load-disc-cure2.txt`). Run 2 (`route-load-2.txt`) failed 2 checks: **cold amiga 1707 KB before content, Aurora fetched**. The interleaved HEAD runs passed ×2 (`route-load-disc-head{,2}.txt`), and the cure's passing runs read 1427 KB against HEAD's 1426.
  - Mechanism, named and not cured here: `warmScenesAtIdle` is a `requestIdleCallback` with no deadline. During cold amiga's three.js chunk wait the main thread is idle, so the warm (every scene, plus Home's Aurora since `8876e82e`) can be requested before amiga's content. The cure does not change what is fetched, or when.
  - **Row KF-RES-1 (consumer, open):** start the idle warm after the deep link's content, not at the first idle.
- keyframes has no Playwright e2e suite. The touched browser reading is the GPU probe above ×2 plus route-load.
- No test was deleted, skipped or weakened. No golden was re-baselined. glass-ui was untouched. Another seat's staged and unstaged `KeyframeTimeline.vue` hunks stayed in the tree and were not committed.

**Budget verdict: RED on the real-GPU cell, ESCALATED with its decomposition.**
- 5 of 7 swaps still have one 66–84 ms commit frame (cure r2 ×2). spring→sequence sits at the 50 ms edge, and home is within budget.
- At 16.7 ms quantisation, reaching the bar needs commit ≤ ~33 ms, a further ~20–25 ms per swap.
- The remaining consumer items above total under that on any one swap. glass's mount-time computed-style reads plus the dock measurement (9–35 ms per swap, O-102 sub-rows filed at repair 1) are the dominant named cost.
- Ask: glass reads root tokens once (or after the first frame) and skips the dock re-measure when the dock's box is unchanged. Then re-read on this cell. The small consumer reads (`land`, `getMaxX`, `probeBrowserScalar`, SquareScene setup) go after first paint in the scene/pane packets.

**Software split (§0gp.2):** no committed keyframes spec binds a warm-swap frame bar on software. `route-load.mjs` binds only prepare/commit latency; `home-swap.mjs` and `swap-3d.mjs` already bind their frame bars on a GPU renderer only and report under SwiftShader. So no software leg needed moving. The SwiftShader reading (`head-sw1-1.json`: 2–6 frames over 50 ms per swap, most with no script) is banked as INFORMATIONAL.

**Critic residue (three passes), re-read here:**
- C1-KF-03 (a) commit-frame mount: cut at the Easing root (above); the rest is escalated with the budget. (b) no-script dissolve frames: **ENVIRONMENT-ROOTED, confirmed**, absent on the GPU cell.
- C1-KF-09 option chevrons: GLASS-HELD (O-102 §6), unchanged.
- C2-KF-01 Cube/Amiga swap frames: ENVIRONMENT-ROOTED. The GPU cell's cube/amiga commit frames are the shared commit cost above, not raster.
- C3-KF-03 blank frame into Home: MEASURED (VT render-suppressed window). On the GPU cell cube→home is within budget (33–46 ms outside load noise).
- Not taken (outside this residue, recorded in CLOSE): the K6 observer scripts (`demo-driver.mjs:941`, `live-session{,-mobile}.mjs`) still select `[data-dock-surface-item][aria-checked]`, which exists only while the portalled menu is open.

### residue-2 (§0gq.3)

Residue-2 seat, 2026-10-27, `claude-opus-5-5`. Scope: §0gq.3, the one consumer unit that cures the remaining consumer reads in each warm swap's commit frame, cures KF-RES-1, and re-reads the warm-swap 50 ms bar on the GPU cell. Code: keyframes.js **`cc1a8669`** (master, pushed). Evidence: `keyframes/residue-2/`. Every run went through `guarded`: browser runs never light, one browser per run, a context per rep, closed in `finally`. glass-ui was not touched. Another seat's staged and unstaged `KeyframeTimeline.vue` hunks stayed in the tree and out of the commit. Both builds that were measured carry that one-line hunk, so the comparison is like for like.

**Where each read sat (HEAD `fc1a3383`, `prof-head.json`, caller chains by `stacks.py` over `raw-cpuprofiles.tgz`).**
- `getMaxX` read the stage's and the ball's `clientWidth` on every paint. In a swap that meant a paused seat inside the commit's pre-flush and every frame of a play: 24.6 ms across sequence→cube, 4.8 ms of cube→amiga.
- SquareScene's setup read was `useSquareTumble`'s `onMounted` `getComputedStyle(:root)`. Behind it, `paintRest` read `--square-travel` and the tour's root tokens. Whichever read came first paid the forced recalc, so the cure had to remove all three.
- `probeBrowserScalar` on the cube came from SCENE_READY's `restoreGroupPlaybackState`, which sampled the saved clocks (the `var(--rotationX)` endpoint) inside the View Transition callback. The resumed loop then sampled the same clocks again in the same rendering step.
- `useFoldLanding.land` ran from the frame callback that the new rail's mutation scheduled, which was the commit frame (4–10 ms).

**Cures (keyframes `cc1a8669`):**
- `AnimationVisualizer.vue`: the ball's run is kept as a size. The observer that bumps the layout epoch (now watching the stage and the ball) re-reads it after layout, when the read is free. Only the first paint before the first report reads it.
- `useSquareTumble.ts`: the egg's palette is read at the first sweep and kept, not at mount. `useSquareDemo.ts`: `paintRest` reads no style. The envelope was already resolved by the plate's first observer report, and the tour's stops are now seated once on that same report. The rest pose needs neither, and each stop's fallback is its token's declared value.
- `scenePlaybackAdapters.ts`: a playing restore re-seats the clocks and resumes. The loop's first frame is the one sample and paint, taken after the commit's DOM work. A paused restore still paints at once.
- `useFoldLanding.ts`: while `:active-view-transition` matches, a landing takes the frame after (the new state is at the dissolve's first step). Outside a transition it lands in the next frame, as before.
- **KF-RES-1** (`useSceneTransition.ts`, `App.vue`, `scenes.ts`): the idle warm of every scene chunk is no longer armed at the shell's mount. The scene host's first `<Suspense>` resolve (`onSceneContent`) arms it in the next frame, so its idle period follows that frame's paint. Later resolves arm nothing.

**Where the reads sit after (`prof-cure.json`):**
- the square's mount reads are gone (resolveEnvelope/resolveTourPalette 0.3 ms, in the observer);
- `getMaxX` is one read per visualizer mount (2.9 ms), not 24.6;
- the cube probe is 2.6 ms in the loop's frame, not 7.9 in the mount;
- `land` no longer runs in the commit frame.

**Falsifiers (each RED ×2 at `fc1a3383`, by assertion: `vitest-RED-head-{1,2}.txt`; GREEN ×2: `vitest-GREEN-{1,2}.txt`):**
- `test/demo/instrument/visualizer-run-read-once.test.ts`: 6 width reads → 2 over three seats; a resize re-reads in the observer and not in the paint.
- `test/demo/scenes/square-mount-reads-no-style.test.ts`: mount plus rest paint make 3 `getComputedStyle` calls → 0. The first tumble reads once, and its sweep colours.
- `test/demo/state/restore-playing-paints-once.test.ts`: a playing restore makes 1 style read → 0, and the loop's first frame paints. A paused restore still paints at once.
- `test/demo/instrument/fold-landing-swap-frame.test.ts`: under a transition the landing moves from frame 1 → 2; outside one it stays at frame 1.
- `test/demo/app/scene-warm-after-content.test.ts`: the idle warm armed at mount → none until the first content, then one.

**KF-RES-1 gate (`route-load.mjs`, 4× CPU, `dist/residue2-{head,cure}`):**
- HEAD ×2: cold amiga **1427 KB**, PASS (`route-load-head-{1,2}.txt`).
- Cure: **4 of 4** in the first set (`route-load-cure-{1..4}.txt`) and **4 of 4** in the second (`route-load-cure-{5..8}.txt`). Every run reads cold amiga at **1427 KB**, Aurora not fetched, PASS (all 35 checks, warm-swap prepare/commit and the deep-link→home backdrop leg included).
- The 1707 KB failure was intermittent, 1 in 4 at the residue seat, and HEAD passed both of its runs here. The deterministic witness is the vitest falsifier above.

**The 50 ms bar re-read on the real-GPU cell (`warm-swap-probe.mjs`, the residue seat's cell):**
- Setup: headless real Chrome, `channel:'chrome'` (demo-driver `gpu: true`), `--use-angle=metal`; renderer read back as `ANGLE Metal Renderer: Apple M5 Max`. Production build, 1440×900, light, 2 reps per run, ×2 runs each side, load 20–27.
- Each cell is the worst frame per rep (r1 rep0/rep1 · r2 rep0/rep1) and the commit range, in ms (`head-gpu-{1,2}`, `cure-gpu-{1,2}`, `summary.txt`).

| swap | HEAD worst frame | HEAD commit (med) | CURE worst frame | CURE commit (med) |
|---|---|---|---|---|
| cube→amiga | 66/82 · 85/82 | 52–69 (62.5) | 66/85 · 84/83 | 49–62 (58) |
| amiga→square | 65/82 · 66/83 | 48–74 (65) | 68/83 · 68/66 | 50–67 (51) |
| square→easing | 68/66 · 67/88 | 54–65 (58) | 67/67 · 65/83 | 50–60 (52.5) |
| easing→spring | 89/85 · 68/85 | 57–74 (62) | 85/68 · 67/68 | 46–61 (49) |
| spring→sequence | 32/49 · 51/49 | 25–34 (30) | 51/33 · 50/50 | 25–34 (30) |
| **sequence→cube** | 52/51 · 85/84 | 37–59 (50.5) | 139*/50 · 51/50 | 38–49 (39.5) |
| cube→home | 2523*/41 · 35/36 | 5–6 | 52/34 · 38/38 | 5–6 |

`*`: one frame each, outside the commit span, while the reads in family ran beside it, so these are machine noise. The 2523 ms HEAD frame is a stalled rep.

**Budget verdict: RED, still ESCALATED. What remains is glass-rooted under O-102, with the relay in §0gq.4.**
- Every consumer read §0gq.3 named is out of the commit frame or read once. Commit medians fell 4–14 ms on five swaps.
- sequence→cube reaches the bar's edge (50–51 ms, three vsync frames).
- 5 of 7 swaps still have one 65–85 ms commit frame.
- LoAF reads the remainder as one script, the mount inside the transition callback (`import.then`, 40–62 ms). Inside it:
  - **glass forced computed style at mount**: `maxStretch` (useLiquidFlex) plus `writeVelocityWeight`/`motionTempo` (`l$4`/`e$10`), 10–26 ms per swap.
  - **the glass dock re-measure on every swap**: `dock.js` `Ie`/`Ee`, 4–10 ms.
  - glass tabs `m` getPropertyValue, 3 ms.
  - Vue's own patch and mount of the destination tree.
- These are held under O-102 and were not patched locally.
- The consumer remainder is small: Amiga's `disposeGraph` teardown inside the commit (3 ms), the Easing catalogue's first `tick` (3 ms), the one `getMaxX` read per visualizer mount (2.9 ms) and the cube probe in the loop's frame (2.6 ms). Together they are under any swap's ~20–30 ms gap to the bar, so the bar is not reachable without the glass half.

**Gates ×2:**
- `npm run check` (vue-tsc app and test, then proof:structure): rc 0 ×2 (`check-{1,2}.txt`).
- `vitest run --project demo --maxWorkers=2`: **166 files / 979 tests ×2** (`vitest-demo-{1,2}.txt`; 971 plus the 8 new).
- Touched browser observations ×2 over the cure build: `home-swap.mjs`, `swap-3d.mjs`, `smoke.mjs` and `subject-animates.mjs` all PASS ×2 (`e2e-*-{1,2}.txt`; home-swap and swap-3d frame bars are informational on SwiftShader per §0gp.2). keyframes has no Playwright e2e suite, so the touched browser readings are these, the GPU probe ×2 and route-load.
- No test was deleted, skipped or weakened, and no golden was re-baselined.

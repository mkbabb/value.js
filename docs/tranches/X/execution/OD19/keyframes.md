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
- **Browser AFTER (1440/390 × light/dark): PENDING.** `after/KF-P2-pane-controls/probe-after.mjs` is queued in `guarded` and was not admitted: machine load was 109–163 against a gate of 36. When it runs it writes `probe-after.json` and the K3/K4 PNGs into the same directory. The vitest falsifiers above carry the verdict until then.

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
  - Run-2 of the probe and the second vitest GREEN were queued behind guard admission: load was 100–177 for more than 2 h, and nothing was admitted after 17:29. They are not banked here.
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

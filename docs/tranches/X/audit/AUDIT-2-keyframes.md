SERVED MODEL: claude-opus-5-5 (Opus 5.5), register seat.

# AUDIT-2 register: keyframes.js

**Date:** 2026-09-24 · **Authority:** `docs/tranches/X/COHESION.md` §0cq (Lenses 1 and 2, OA-62/OA-64) and §0cu (Lens 3, OA-69) · **Spec:** `docs/tranches/X/audit/AUDIT-2.md` · **Seat:** REGISTER (three lens seats folded in; every BROKEN and HIGH row re-measured here)

**Owner, verbatim (2026-09-24):**
- *"ensure that we're not duplicating any component in any view, too: KISS, DRY. Audit our component structure for cogency in every project."*
- *"Audit every mobile view for every mobile app view for all projects, too."*
- *"All issues should be fixed at the glass-ui root, too."*
- *"Ensure proper design hierarchy and usage of space in all UIs hereof"*

**Trees.**
- keyframes.js HEAD `a939e7d6` (X.KF.W13V.s2, the Sequence timeline pane). It pins `@mkbabb/glass-ui` **10.0.1** (`package.json:78`; node_modules 10.0.1).
- glass-ui source HEAD `25c205a9` (`v10.0.1-122-g1f2dbb5a`). Each glass line cited by a BROKEN or HIGH row was re-read there.
- Served page: `http://localhost:5173`. Headed Chromium on the real GPU, Playwright from `value.js/node_modules/playwright`, DPR 2.

**Paths.** Code paths are relative to `/Users/mkbabb/Programming/keyframes.js/` unless they start with `glass-ui/`, meaning `/Users/mkbabb/Programming/glass-ui/`. Frame and probe paths are relative to `docs/tranches/X/audit/audit-2/`. Frames are git-excluded.

**Routing.**
- **KF.W13X:** consumer rows.
- **BL:** GLASS rows. They go in the glass letter.
- **KF.W13X + BL:** rows with both a consumer half and a glass half.

**Prior registers.** Rows cite the earlier register instead of repeating it: `UI-AUDIT-keyframes.md` (UIA-KF-*), KF-ANIMATION-AUDIT (KFA-*), and the O-53..O-71 letters.

## Totals

After deduplication there are **60 rows**. The seats filed 63; three were merged (see "Merges" below).

| Lens | BROKEN | HIGH | MEDIUM | LOW | Total |
|---|---:|---:|---:|---:|---:|
| L1 component cogency | 0 | 0 | 12 | 17 | 29 |
| L2 mobile views | 3 | 4 | 4 | 6 | 17 |
| L3 hierarchy and space | 1 | 1 | 6 | 6 | 14 |
| **All** | **4** | **5** | **22** | **29** | **60** |

| Route | Rows |
|---|---:|
| KF.W13X only | 36 |
| BL only (glass letter) | 12 |
| KF.W13X + BL | 12 |

- **BL only (12):** L1-25, L1-26, L1-27, L1-28, L1-29, L2-2, L2-6, L2-7, L2-9, L2-16, L3-1, L3-4.
- **KF.W13X + BL (12):** L1-8, L1-9, L1-22 (only if a gap is found), L2-1, L2-3, L2-8, L2-12, L2-13, L2-14, L2-17, L3-2, L3-17 (either owner, per UIA-KF-253).
- **Glass letter:** all 24 rows with a GLASS half are listed under "Glass letter rows" at the end.

**New against prior registers:** 51 rows. The other 9 re-confirm or amend covered rows at HEAD: L1-10, L1-11, L2-2, L2-7, L2-8, L2-13, L3-13, L3-15 and L3-17.

## Confirmation of every BROKEN and HIGH row

The register seat re-measured every BROKEN and HIGH row on the served page at `a939e7d6`, using its own probe `keyframes-register/confirm.mjs`. It re-read each cited source line in keyframes.js and glass-ui. The raw output is in the seat's scratch, and the frames are in `keyframes-register/frames/`. Nothing was dropped or downgraded; every row reproduced.

| Row | Severity | Re-measured | Verdict |
|---|---|---|---|
| A2-KE-L2-1 | BROKEN | 390x844 touch, #/cube, top dock expanded. `touchscreen.tap` on Controls leaves detent `aria-valuenow` **0.12**; `click` gives **0.36** and it stays. Source: `ChromeDock.vue:190-198` and `ControlsPaneWrapper.vue:153-157` (`Dialog :modal=false`, and `@update:open(false)` emits `setControlsPanelOpen(false)`). Frames: `keyframes-register/frames/L2-1-cube-390-{tap,click}.png`. | CONFIRMED |
| A2-KE-L2-2 (+L3-14) | BROKEN | Sheet computed `position: relative`. At 390x844 the rect goes from [716,887] at 0.12 to [716,1020] at 0.36, so the top edge is fixed and the box grows off-screen. At 844x390 it is [262,467] at 0.36 on a 390px viewport. `glass-ui/src/styles/glass/material.css:35-47` includes `.glass-floating { position: relative }`; `sheet/styles.css:29-32` has the zero-specificity `:where([data-slot=sheet-content]) { position: fixed }`; `SheetContent.vue:106` adds `surfaceClass("floating")`. | CONFIRMED |
| A2-KE-L2-3 | HIGH | Measured with the SHEET-POSITION cure simulated (`position: fixed; left/right: 0`) at 844x390. At rest the sheet is [58,262], 204px at detent 0.12. Opened to 0.36 it is the **same** [58,262], 204px, so the ladder is degenerate. The top dock's bottom is at 91, so the rest sheet rises under it. The scroller figure (69/707) was not re-derived with the seat's selector; the degenerate ladder and the dock overlap are enough to hold HIGH. Frames: `keyframes-register/frames/L2-3-SIM-cube-844x390-{rest,open}.png`. | CONFIRMED |
| A2-KE-L2-4 | HIGH | 844x390 home: band [107,262], `grid-template-rows: 0px 202.797px 0px`, h1 [68,146] at 73.76px, deck [244,282], hint [288,325], transport [268,328], top dock [31,91], pause [333,387]. The seat's numbers match exactly. Frame: `keyframes-register/frames/L2-4-home-844x390.png`. | CONFIRMED |
| A2-KE-L2-5 | HIGH | Home at 390x844 and 844x390. The toggle's computed `pointer-events` is `none`. `elementFromPoint` at its centre returns the stage cell or grid. After `touchscreen.tap` the aria-label is still "Pause the title animation". | CONFIRMED |
| A2-KE-L2-6 | HIGH | 360 and 390, #/cube, top dock expanded. All four surface items measure 30.8x30.8 with class `dock-icon-button--compact` and no `::after` (content `none`). A point 6px beyond either edge does not hit the button. `glass-ui/src/components/dock/styles/controls/touch-floor.css:25-28` exempts compact buttons from the floor, and the `::after` slop at :41-46 targets only `.dock-trigger/.dock-select-trigger/.dock-dropdown-trigger`. | CONFIRMED |
| A2-KE-L2-8 (+L3-16) | BROKEN (carried from UIA-KF-032) | 360: collapsed plate x 150-210 (60px). "Pause animation" spans x 118-162 and "Rotations" x 168-242, both outside it. 390: plate 165-225, Pause 133-177, Rotations 183-257. | CONFIRMED |
| A2-KE-L3-1 | HIGH | 390x844 coarse, #/easing Curve (opened by click so the sheet stays open), `--ui-scale` 1.5. The Bezier and Steps `.segmented-tab` elements render at **12.179px** and are **34px** tall. The sibling "Custom" Select trigger renders at **21px** and is 60px tall. At 1440 the tabs are 16.4px. `glass-ui/src/components/tabs/styles/segmented.css:284` sets `var(--type-caption)`; `:311` switches to `--type-small` at 640px and up. Amendment: at 34px the tabs are also under the 44px touch floor. | CONFIRMED (amended) |
| A2-KE-L3-13 | BROKEN (carried from UIA-KF-008) | 1440, #/easing Keyframes surface: the scene's Curve card sits under the editor card ([516,1091]) inside a surface cut at 618, and the Bezier tab is present at y 904. #/spring Timeline: the Physics card [62,693] leads and the Timeline card starts at 693, below the cut. #/spring Keyframes: Physics [516,1147] under the editor. Frames: `keyframes-register/frames/L3-13-{easing-Keyframes,spring-Timeline,spring-Keyframes}-1440.png`. | CONFIRMED |

## Merges (dedupe across lenses; ids kept)

- **A2-KE-L3-3 → A2-KE-L1-4.** A2-KE-L3-3 is the visible symptom: the desktop rail's cut edge has no fade, because `useScrollFade` observes `.controls-pane` while `.controls-surface` is the scroller. A2-KE-L1-4 is the local copy of glass FadingScroll that causes it. One cure, applied on the real scroller, closes both.
- **A2-KE-L3-14 → A2-KE-L2-2.** Both describe the in-flow glass sheet that cannot rise (SHEET-POSITION). L3-14 adds that End, ArrowUp and drag all move `aria-valuenow` while the top edge stays at y 716-723.
- **A2-KE-L3-16 → A2-KE-L2-8.** Both describe the collapsed transport content spilling past its pill (UIA-KF-032 / O-65). L2-8 carries the phone measurement. The row takes UIA-KF-032's BROKEN severity, since the defect reproduces; the L2 seat had filed it MEDIUM.

## Lens 1: component cogency

### A2-KE-L1-1 · MEDIUM · Route KF.W13X · dead components
- **View:** #/spring Physics facet (former inline editor); Keyframes pane.
- **Finding:** The per-stop keyframes editor subtree is dead. Nothing in the product imports it, yet it still pulls in the highlight.js dependency and four test files.
  - e69f7731 retired the spring inline editor (UIA-KF-044) but left the tree behind: `KeyframesEditor.vue` (688 lines), `KeyframeCardList.vue`, `KeyframeCard.vue` (401 lines), `KeyframesAddDialog.vue`, `useToolbarKeyboard.ts` and `utils/contenteditable.ts`.
  - The live Keyframes pane (`KeyframesStringControls`) uses 4 of the 14 members that `useKeyframesEditor` returns. The other 10 served only the dead editor.
- **Evidence:**
  - An import-graph walk of `demo/` (aliases from `vite.config.ts:37-58`) finds 0 importers for `KeyframesEditor.vue`.
  - `KeyframesEditor.vue:6-7` still says "the ONE live render site is SpringPhysicsFacet.vue", which is false.
  - `useHighlightCSS.ts:173` and `:209` are imported only by `KeyframeCard.vue:267` and `KeyframesEditor.vue:282`, so the highlight.js dependency at `package.json:93` is dead.
  - `KeyframesStringControls.vue:73-78` destructures 4 of the members returned at `useKeyframesEditor.ts:41-62`.
  - Tests keep the dead code importable: `test/demo/instrument/KeyframesAddDialog.test.ts:124`, `keyframes-editor-honest.test.ts:220`, `kf-toolbar-keyboard.test.ts` and `highlight-css-roundtrip.test.ts`, plus a stale mock at `spring-heatmap-reversibility.test.ts:70`.
- **Cause:** e69f7731 deleted the only mount site but not the tree that existed only to serve it.
- **Cure:**
  - Delete the six files, `useCodeHighlight` and `syncHostSource`, and highlight.js.
  - Cut the editor composables down to the four live members, or fold what remains into `KeyframesStringControls`.
  - Delete or re-seat the four tests and the stale mock.
  - Close as retired the register rows that point at this subtree: UIA-KF-039, 040, 042, 043, 087, 095, 206, 228 and 289.
- **Owner:** CONSUMER `demo/components/instrument/keyframes/**`, `package.json:93`, `test/demo/instrument/*`.
- **Covered by:** UIA-KF-044 ordered the retirement. Its dead residue is new.

### A2-KE-L1-2 · MEDIUM · Route KF.W13X · duplicate composables
- **View:** Controls ribbon scrub; Sequence Timeline pane; #/spring rail; #/square drag.
- **Finding:** Two pointer-capture drag composables do one job: `useDragCapture` (transport/composables) and `useDragScrub` (composables/).
  - Both carry the same `activePointerId` latch, select-suppression, `setPointerCapture`, window move/up/cancel listeners and scope-dispose release.
  - They differ only in rAF coalescing (`useDragCapture`) and a project/onScrub mapping (`useDragScrub`).
- **Evidence:**
  - `components/instrument/transport/composables/useDragCapture.ts:58-165` against `composables/useDragScrub.ts:119-206`. Both import acquire/releaseSelectSuppression (`:3-6`).
  - `useDragCapture` users: `AnimationVisualizer.vue:72,249` and `PlaybackRibbon.vue:150,243`.
  - `useDragScrub` users: `SequenceLanes.vue:91,123,168`, `SpringTarget.vue:264,455` and `SquareScene.vue:118,423`.
- **Cause:** The scrubber and the scene drags each grew their own capture state machine, and the directory split hid the twin.
- **Cure:**
  - Make `composables/useDragScrub.ts` the single owner, with an opt-in `coalesce: 'raf'`.
  - Migrate `AnimationVisualizer` and `PlaybackRibbon`.
  - Delete `useDragCapture.ts`, with no re-export.
- **Owner:** CONSUMER `demo/composables/useDragScrub.ts`; retire `demo/components/instrument/transport/composables/useDragCapture.ts`.
- **Covered by:** none.

### A2-KE-L1-3 · LOW · Route KF.W13X · duplicate composables
- **View:** Controls pane (progress readout, ribbon ball).
- **Finding:** `useRafLoop` is an 8-line alias of `useDemoTicker`, so one job has two names.
- **Evidence:**
  - `components/instrument/transport/composables/useRafLoop.ts:29-34` returns `useDemoTicker(callback, options?.guard)`.
  - Its importers are `useAnimationProgress.ts` and `AnimationVisualizer.vue`. `useAnimationSync.ts` already imports `useDemoTicker` directly.
- **Cause:** A rename left the old name in place as a forwarding wrapper.
- **Cure:**
  - Import `useDemoTicker` at both sites and delete `useRafLoop.ts`.
  - Keep the demo's RAFPlayback ticker (dogfooding the engine is deliberate).
- **Owner:** CONSUMER `demo/components/instrument/transport/composables/useRafLoop.ts`.
- **Covered by:** none.

### A2-KE-L1-4 (absorbs A2-KE-L3-3) · MEDIUM · Route KF.W13X · local copy of a glass surface, and a fade that never arms
- **View:** Controls pane scroll port (desktop rail and mobile sheet). The L3 symptom shows on the desktop rail: easing (Controls, Curve, Keyframes, Timeline), spring (every surface) and the cube timing-function detail, at 1440 in both themes.
- **Finding:** The pane uses a 130-line local re-implementation of glass FadingScroll (`useScrollFade`) that emits the `.scroll-fade-*` classes glass has retired. The app already uses glass FadingScroll in the shortcuts dialog.
  - (L3-3) Since X.KF.W13V.c made `.controls-surface` the rail's one scroller, the fade observes `.controls-pane`, which no longer overflows, so it never arms.
  - The rail therefore cuts its cards off flat, with no fade and no scroll cue. The curve and heatmap cards lose their bottom edge. Spring hides 211px (its presets and "Write physics to keyframes") and easing hides 107px.
- **Evidence:**
  - `components/instrument/transport/composables/useScrollFade.ts:59-129`. It is consumed at `ControlsPaneWrapper/useControlsLayout.ts:5,76-81`, bound at `controls-pane/ControlsPaneWrapper.vue:50-54` and styled at `ControlsPaneWrapper.css:58-63`. The scroller is set at `ControlsPaneWrapper.css:130-135`.
  - `glass-ui/src/components/fading-scroll/README.md:3-9` says FadingScroll supersedes the static `.scroll-fade-*` utilities, "a clean break, no alias". `KeyboardShortcutsModal.vue:296` already imports FadingScroll.
  - L3 probe (`keyframes-L3/probe-fade.mjs`): easing `.controls-surface` scrollHeight 595 / clientHeight 488; spring 651/440; mask-image none; `.controls-pane` 704/704.
  - Frames: `keyframes-L3/frames/1440-light/{easing-02-Curve,spring-02-Physics,easing-02-Keyframes,ov-01-timing-function}.png` and `1440-dark/easing-02-Controls.png`.
- **Cause:** The pane's fade predates glass FadingScroll, was never migrated, and was left pointing at the old scroller when C1-1 moved the scroll.
- **Cure:**
  - Wrap the real scroller (`.controls-surface` / the DefinePaneBody scroller) in `<FadingScroll axis="y">`.
  - Delete `useScrollFade.ts`, the `scrollFadeClass` plumbing and the `.scroll-fade-*` rules.
  - Consider `scroll-padding-block-end` so a resting card's foot lands on its radius.
- **Owner:** CONSUMER `demo/components/instrument/transport/composables/useScrollFade.ts`, `ControlsPaneWrapper/useControlsLayout.ts`, `controls-pane/ControlsPaneWrapper.{vue,css}`.
- **Covered by:** KFA-171 records the symptom on desktop. The duplicate and the wrong-scroller cause are new. UIA-KF-007 was the unbounded rail, and this is the residue of its cure.

### A2-KE-L1-5 · MEDIUM · Route KF.W13X · duplicate components
- **View:** #/easing Curve facet; Controls pane → easing pencil detail (every scene).
- **Finding:** `EasingSidebar` and `TimingFunctionPanel` are two timing-curve editors around glass EasingPicker. They copy the same pieces:
  - the SeatTruth mapping, including the step-start/step-end branch word for word;
  - a `nameForQuad` lookup in two spellings;
  - the "engine-native" notice;
  - the reseat watch.
  - `scenes/easing` also deep-imports a channel-controls private composable.
- **Evidence:**
  - `scenes/easing/EasingSidebar.vue:34-41` (picker), `:109-131` (truth), `:135-138` (nameForQuad), `:47-55` (notice), `:176-187` (watch).
  - `transport/channel-controls/TimingFunctionPanel.vue:50-57`, `:121-143`, `:116-119`, `:20-29`, `:163-171`.
  - `EasingSidebar.vue:88-92` deep-imports `useEasingPickerSeat`.
- **Cause:** The facet was built beside the pane's detail editor, not on top of it.
- **Cure:**
  - Create one `TimingCurveEditor.vue` beside `useEasingPickerSeat` in a neutral `components/instrument/easing/`, taking `(truth, onAuthored, catalogueGap)`.
  - Move truth-from-{name, points, steps} and `nameForQuad` into the composable.
  - `EasingSidebar` becomes the editor plus the duration row; `TimingFunctionPanel` becomes the editor plus its back header.
- **Owner:** CONSUMER `demo/scenes/easing/EasingSidebar.vue`, `demo/components/instrument/transport/channel-controls/{TimingFunctionPanel.vue,composables/useEasingPickerSeat.ts}`.
- **Covered by:** UIA-KF-080, 116 and 167 are symptom rows. The component duplicate is new.

### A2-KE-L1-6 · MEDIUM · Route KF.W13X · local copy of a glass surface
- **View:** Controls pane easing Select; #/easing specimen tiles; #/spring trace.
- **Finding:** The demo draws curve plots with hand-written SVG in at least three components, twice in one file, although glass ships `EasingCurve` for exactly this. glass's README says EasingCurve exists because "three downstream repositories each grew their own plot". The demo never imports it.
- **Evidence:**
  - `ChannelOptions.vue:402-419` and `:515-530` repeat the same svg/path markup.
  - `EasingTarget.vue:133-140` (tile sparkline).
  - `SpringTrace.vue:55-88` (plausible, since it carries overshoot axes).
  - `EasingMini.vue:57-58` (dock art, which can stay).
  - `glass-ui/src/components/easing/README.md:1-12`.
  - `grep EasingCurve demo/` returns 0 hits.
- **Cause:** The plots predate glass EasingCurve.
- **Cure:**
  - Render the ChannelOptions glyphs and the EasingTarget sparklines with `<EasingCurve :strokes=[{d, tone}]>`, fed by `timingCurveUtils.generateCurveSVGPath`.
  - Evaluate SpringTrace against EasingCurve's overshoot support and send any gap to glass.
  - Delete `.curve-glyph` (`ChannelOptions.vue:1012-1021`).
- **Owner:** CONSUMER `ChannelOptions.vue`, `demo/scenes/easing/EasingTarget.vue`, `demo/scenes/spring/SpringTrace.vue`.
- **Covered by:** UIA-KF-093 cites EasingCurve only for the catalogue gap. This row is new.

### A2-KE-L1-7 · MEDIUM · Route KF.W13X · god module
- **View:** Controls pane → Controls surface (every animation scene).
- **Finding:** `ChannelOptions.vue` (1082 lines) owns five jobs:
  - the options form;
  - a bespoke grouped easing Select;
  - a hand-rolled three-row drill-in stack, with back buttons and focus return;
  - the option-commit path;
  - the PlaybackRibbon mount, which it teleports into another component's DOM id.
- **Evidence:** In `ChannelOptions.vue`:
  - `:58-250` form;
  - `:287-570` curve Select;
  - `:20-30`, `:616-707` and CSS `:1023-1063` drill-in;
  - `:930-951` four focus-return handlers;
  - `:884-907` commitOption;
  - `:713-737` `<Teleport to="#controls-ribbon-target">`.
- **Cause:** Each wave added its surface to the one card.
- **Cure:**
  - `ChannelOptionsForm` owns the form and commitOption.
  - The curve Select becomes one `EasingSelect` on EasingCurve (A2-KE-L1-6).
  - One drill-in owner (a small PaneStack with push/back/focus-return) serves both the detail and advanced sub-panes.
  - The PlaybackRibbon mount moves to RibbonBar, and the id teleport goes away.
- **Owner:** CONSUMER `demo/components/instrument/transport/channel-controls/ChannelOptions.vue`.
- **Covered by:** UIA-KF-163 and UIA-KF-269 are symptom rows. The god-module split is new.

### A2-KE-L1-8 · MEDIUM · Route KF.W13X + BL · duplicate section headers
- **View:** #/spring solver stage; #/sequence; #/easing gallery; #/square instrument; #/spring @starting-style.
- **Finding:** The scene stage header (a serif title, mono readouts and a status badge) is hand-assembled in five components.
  - The badge span is copied three times with an identical class string.
  - One stage uses glass Metric and the others use spans; the @starting-style stage uses CardTitle.
- **Evidence:**
  - `SpringTarget.vue:52-98` (badge `:80`), `SequenceTarget.vue:15-80` (Metric `:34`, badge `:73`), `EasingTarget.vue:21-71`, `SquareInstrument.vue:22-35`, `StartingStyleTarget.vue:15`.
  - The badge skin is at `design-idioms.css:271-296`.
- **Cause:** There is no shared stage-header component.
- **Cure:**
  - Add one `SceneStageHeader.vue` (title prop; readouts slot rendering glass Metric/MetricRow; status prop rendering glass Badge/StatusDot).
  - Migrate the five sites and delete the badge idiom CSS.
  - The badge-tone gap goes to glass as UIA-KF-201.
- **Owner:** CONSUMER `demo/scenes/{spring/SpringTarget.vue,sequence/SequenceTarget.vue,easing/EasingTarget.vue,square/SquareInstrument.vue,spring/StartingStyleTarget.vue}`; GLASS badge soft tone (UIA-KF-201, O-59).
- **Covered by:** UIA-KF-064, UIA-KF-201 and UIA-KF-210 are symptom rows. The header-component duplicate is new.

### A2-KE-L1-9 · MEDIUM · Route KF.W13X + BL · duplicate components
- **View:** Timeline pane (animation scenes against #/sequence mode since a939e7d6).
- **Finding:** The one Timeline pane hosts two independent timeline stacks, each with its own scrub, playhead, ruler and handles.
  - KeyframeTimeline → TimelineTrack/TimelineCaret: a rail slider, useZoomPan and a tick ruler.
  - SequenceTimeline → SequenceLanes: a hand-rolled master scrub, per-lane handles and no ruler.
  - The Sequence stage keeps its own SequenceAxis ruler.
- **Evidence:**
  - `KeyframeTimeline.vue:182-193`; `TimelineTrack.vue:112`, `:146-154`, `:205`.
  - `SequenceTimeline.vue:10-32`; `SequenceLanes.vue:11-30`, `:59-71`, `:77-84`.
  - `scenes/sequence/SequenceAxis.vue:12-23`; `ControlsPaneWrapper.vue:114-121`.
- **Cause:** a939e7d6 moved the re-time into the pane as a separate leaf. Glass has no draggable-marks or lanes rail.
- **Cure:**
  - Build one lane-track primitive with N lanes, sharing one scrub, playhead and ruler.
  - Make SequenceLanes and TimelineTrack its two data adapters.
  - Take the rail from glass once UIA-KF-280's Slider marks gap lands.
- **Owner:** CONSUMER `demo/components/instrument/timeline/{KeyframeTimeline.vue,SequenceTimeline.vue,components/TimelineTrack.vue,components/SequenceLanes.vue}`; GLASS rail primitive (`glass-ui/src/components/slider`, per UIA-KF-280).
- **Covered by:** UIA-KF-099 and UIA-KF-280 (GLASS, O-59). The two-stack duplication is new.

### A2-KE-L1-10 · MEDIUM · Route KF.W13X · duplicate mounts (re-confirmation)
- **View:** Controls pane on #/cube, #/amiga, #/spring.
- **Finding:** At HEAD the pane still mounts one full ChannelControls host per channel behind v-show, and each host renders the scene's tabs-content slot. Scene facets are therefore mounted N times.
- **Evidence:**
  - `keyframes-L1/probe-mounts.json` (1440x900): #/cube has 3 `.controls-surface` hosts (1 visible) and 6 role=tabpanel; #/amiga has 3 hosts; #/spring has 2 hosts and 2 heatmaps.
  - Frames: `keyframes-L1/frames/scene-{cube,amiga,spring}-1440.png`.
  - Source: `ControlsPaneWrapper.vue:61-107` and `ChannelControls.vue:165`.
- **Cause:** Channel state lives in component instances, not in the store.
- **Cure:** Mount a single ChannelControls bound to the selected channel, with per-channel state in the store.
- **Owner:** CONSUMER `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue`.
- **Covered by:** UIA-KF-104, UIA-KF-019 and KFA-156, all still open.

### A2-KE-L1-11 · MEDIUM · Route KF.W13X · duplicate registry (re-confirmation, cure amended)
- **View:** Top dock surface items; transport channel select.
- **Finding:** The surface registry is still defined twice, in `surfaceTabs.ts` and `state/controlSurfaces.ts`. There is a trap in the filed cure: `dockSurfaceItems` exists only in `surfaceTabs.ts`, so deleting that file as filed would break the dock.
- **Evidence:**
  - `components/instrument/surfaceTabs.ts:12-19`, `:21-23`, `:25-41`, `:75-97`.
  - `state/controlSurfaces.ts:145-160`, `:189-195`, `:278-309`.
  - Importers: `ChromeDock.vue:19-23` and `TransportDock.vue:250`.
- **Cause:** A compatibility shim left over from T.B2.
- **Cure:**
  - Move `dockSurfaceItems`, `DockSurfaceItem` and `DOCK_ITEM_KINDS` into `state/controlSurfaces.ts`.
  - Re-point both importers and delete `surfaceTabs.ts`, with no re-export.
- **Owner:** CONSUMER `demo/components/instrument/surfaceTabs.ts` → `demo/state/controlSurfaces.ts`.
- **Covered by:** UIA-KF-103. This row adds the `dockSurfaceItems` move to its cure.

### A2-KE-L1-12 · LOW · Route KF.W13X · dead code
- **View:** Controls pane (every scene).
- **Finding:** `TABS_EXTERNALLY_MANAGED_KEY`'s only provider passes the constant `true`. Every `!tabsExternallyManaged` arm is dead, and `isSingleSurfaceScene` is always false.
- **Evidence:**
  - `App.vue:191` is the only provide.
  - `ChannelControls.vue:254`, `:283`, `:286` and `:297-302`; its own comment is at `:238-253` and `:290-296`.
  - It is threaded through `useSelectedControlSurface.ts:13,82,93,110`.
- **Cause:** The in-panel tab strip was deleted, but its gate was left outside that unit's writable set.
- **Cure:**
  - Delete the key (`injectionKeys.ts:4`) and the provide.
  - Fold to the machine-driven branch.
  - Delete `isSingleSurfaceScene`, its flat-mount template branch (`ChannelControls.vue:19-53`) and the flag parameter.
- **Owner:** CONSUMER `demo/components/instrument/transport/{injectionKeys.ts,channel-controls/ChannelControls.vue,channel-controls/composables/useSelectedControlSurface.ts}`, `demo/app/App.vue`.
- **Covered by:** none.

### A2-KE-L1-13 · LOW · Route KF.W13X · dead contract members
- **View:** App shell / scene registry.
- **Finding:** Several contract members are declared but never used.
  - `SceneExposedApi.tabsTrigger` and `headerLeft` are never provided or read.
  - `SceneDescriptor.showStartScreen` and `gridBackground` are never read.
  - The cube's `lazyScene` loader is unused, because App.vue static-imports the cube.
- **Evidence:** `app/scene/sceneExposedApi.ts:38-43`; `app/scene/scenes.ts:86-87,129,139`; `App.vue:42,177,364-377`.
- **Cause:** The members outlived the features that consumed them.
- **Cure:** Delete the four members, and give the cube one load path.
- **Owner:** CONSUMER `demo/app/scene/{sceneExposedApi.ts,scenes.ts}`, `demo/app/App.vue`.
- **Covered by:** KFA-89 covers the dead cube loader spinner separately.

### A2-KE-L1-14 · LOW · Route KF.W13X · duplicate constants and types
- **View:** Scene machine, router, facility.
- **Finding:** Scene identity and the channel shape are each spelled several times.
  - `HOME_SCENE_ID` is defined twice.
  - Scene ids appear as a literal, a `*_SCENE_ID` constant and local `SCENE_ID` aliases.
  - Three structural types describe one channel, so a939e7d6 had to add `sequence` in two places.
- **Evidence:**
  - `state/sceneMachine.ts:31` and `app/scene/scenes.ts:122`; `scenes.ts:134-181`.
  - `scenes/cube/useCubeDemo.ts:18`, `easing/EasingScene.vue:19`, `sequence/SequenceScene.vue:12`.
  - `transport/transportSource.ts:25-37`, `composables/scene-facility/index.ts:33-52` and `state/controlSurfaces.ts:66-74`.
- **Cause:** Declared where first needed and never consolidated.
- **Cure:**
  - Keep one `HOME_SCENE_ID`, use `id: X_SCENE_ID` and drop the aliases.
  - Make `ChannelHandle` the one channel type, with the other two as `Pick<>`s.
- **Owner:** CONSUMER `demo/app/scene/scenes.ts`, `demo/state/sceneMachine.ts`, `demo/components/instrument/transport/transportSource.ts`, `demo/composables/scene-facility/index.ts`.
- **Covered by:** none.

### A2-KE-L1-15 · MEDIUM · Route KF.W13X · directory structure
- **View:** Whole demo tree.
- **Finding:** The layout no longer matches responsibility.
  - (a) `transport/` mostly holds the controls pane.
  - (b) Composables follow four conventions, one of them dirs named after a sibling component that lives elsewhere.
  - (c) `transport/components/` holds only `DemoGlobalChrome`, which is app-global but mounted per scene.
  - (d) `shell/` mixes the instrument host with app-only chrome.
  - (e) `components/playback/` up-imports `instrument/transport/composables`.
  - (f) There are two utils roots.
  - (g) There are layer inversions: scene-facility → timeline types, and scenes/easing → a channel-controls private composable.
  - (h) `SCENE_ANNOUNCER_KEY` lives in `EditorShell.vue`, and `App.skeleton.vue` defines `SceneSkeleton`.
- **Evidence:** `AnimationControlsGroup.vue:145,154`; `ControlsPaneWrapper.vue:230-231`; `App.vue:143,159-161`; `app/dock/MbabbMenu.vue`; `PlaybackRibbon.vue:150`; `AnimationVisualizer.vue:72`; `composables/scene-facility/index.ts:25`; `EasingSidebar.vue:88-92`; `EditorShell.vue:107-119`; `App.skeleton.vue:84,89`.
- **Cause:** The T.F5 facility fold, followed by waves that landed files where their writable sets allowed.
- **Cure:** Name directories by responsibility:
  - `app/hero/` and `app/dock/menu/`, with `DemoGlobalChrome` mounted once in App.vue;
  - `components/instrument/pane/` for the pane;
  - `transport/` keeps the dock and playback;
  - one composables convention (a sibling `composables/`, cross-cutting in `demo/composables`) and one utils root;
  - move the timeline source types, move `SCENE_ANNOUNCER_KEY` into `injectionKeys.ts`, and rename `App.skeleton.vue` to `SceneSkeleton.vue`.
- **Owner:** CONSUMER `demo/components/instrument/**`, `demo/components/playback/**`, `demo/app/**`, `demo/composables/**`.
- **Covered by:** none.

### A2-KE-L1-16 · LOW · Route KF.W13X · one-off structure
- **View:** #/amiga, #/square against the other scenes.
- **Finding:** Cube, easing, sequence and spring follow Scene.vue → *Target.vue with *Motion.ts and *Keys.ts. Amiga and square do not.
  - Amiga inlines its canvas stage into `AmigaScene.vue` (616 lines).
  - Square inlines its target into `SquareScene.vue` (541 lines).
  - Styles follow two conventions.
- **Evidence:**
  - `scenes/amiga/AmigaScene.vue:1-87`; `scenes/square/SquareScene.vue:10-100`.
  - `CubeScene.vue:15-21`, `EasingScene.vue:2-4`, `SequenceScene.vue:2`.
  - External sheets: `CubeTarget.vue:356`, `EasingTarget.vue:397`, `SequenceTarget.vue:210`, `SquareScene.vue:541`.
- **Cause:** The scenes were authored in different tranches, with no convention enforced.
- **Cure:** Extract `AmigaTarget.vue` and `SquareTarget.vue`, and fold the four external sheets into scoped blocks.
- **Owner:** CONSUMER `demo/scenes/amiga/AmigaScene.vue`, `demo/scenes/square/SquareScene.vue`.
- **Covered by:** UIA-KF-194 covers amiga's visual stage chrome. The file-structure break is new.

### A2-KE-L1-17 · LOW · Route KF.W13X · duplicate code
- **View:** Top dock scene glyphs (all six scenes).
- **Finding:** Six dock miniatures repeat one live-lifecycle block: a `live` prop, `onMounted` setTargets, a `watch(live)` play/stop, and stop on unmount.
- **Evidence:** `cube/CubeMini.vue:52-64`; `easing/EasingMini.vue:41-52`; `spring/SpringMini.vue:47-60`; `square/SquareMini.vue:55-65`; `sequence/SequenceMini.vue:51-63`; `amiga/AmigaMini.vue:49-56`.
- **Cause:** Each mini was copy-adapted from the first.
- **Cure:** Add one `useLiveMini(players, live)` in `demo/composables/`; keep each mini's art and motion local.
- **Owner:** CONSUMER `demo/scenes/*/*Mini.vue`.
- **Covered by:** none.

### A2-KE-L1-18 · LOW · Route KF.W13X · duplicate code
- **View:** #/amiga canvas; #/square box.
- **Finding:** The keyboard-operable two-axis subject (help text, two role=slider children and an arrow/Shift/Home keymap) is hand-built twice. The class that hides the sliders exists only in `SquareScene.css`.
- **Evidence:** `AmigaScene.vue:57-84,188`; `SquareScene.vue:64-97`; `useSquareKeyboard.ts:69-174`; `SquareScene.css:50`.
- **Cause:** Both scenes adopted the same recipe independently.
- **Cure:** Add one `SubjectAxes` component or composable with a shared keymap helper, and put the hiding class in `design-idioms.css`.
- **Owner:** CONSUMER `demo/scenes/amiga/AmigaScene.vue`, `demo/scenes/square/{SquareScene.vue,SquareScene.css,useSquareKeyboard.ts}`.
- **Covered by:** UIA-KF-291 covers the focus defect. The duplicate is new.

### A2-KE-L1-19 · LOW · Route KF.W13X · local copy of a glass surface
- **View:** Keyframes pane Copy; Share; #/easing header copy; Timeline Export.
- **Finding:** The demo copies through its own `copyText`, which has no failure path: a rejected `writeText` throws unhandled from CopyButton's fire-and-forget call. There is also one raw clipboard call. glass ships `useClipboard`/`writeClipboard` with named failure results, and value.js already uses them.
- **Evidence:**
  - `utils/clipboard.ts:3-8`; `CopyButton.vue:104`; `useTimelineBuild.ts:261`; `KeyframesStringControls.vue:258,265,302`; `useShareState.ts:30`.
  - `glass-ui/src/composables/dom/useClipboard.ts:35-52`.
  - value.js `demo/workbenches/mix/MixResultDisplay.vue:32` and 6 other sites.
- **Cause:** The helper predates glass `useClipboard`.
- **Cure:** Move to glass `writeClipboard`/`useClipboard`, toast the failure branch, and delete `utils/clipboard.ts`.
- **Owner:** CONSUMER `demo/utils/clipboard.ts`, `demo/components/CopyButton/CopyButton.vue`, `demo/components/instrument/timeline/composables/useTimelineBuild.ts:261`.
- **Covered by:** UIA-KF-298 covers the icon timing only.

### A2-KE-L1-20 · LOW · Route KF.W13X · glass surface unused
- **View:** Timeline pane error states.
- **Finding:** glass ships Alert and the demo imports it nowhere. The timeline build-error banner and the editor error line are hand-rolled.
- **Evidence:** `KeyframeTimeline.vue:215-225,307-315`; `grep glass-ui/alert demo/` returns 0 hits; `glass-ui/src/components/alert/`.
- **Cause:** No wave adopted Alert.
- **Cure:**
  - Render the banner as `<Alert tone="destructive">` with a Retry action.
  - Make the editor error the field's described-by error.
  - Apply the same to the spring states once UIA-KF-207 lands.
- **Owner:** CONSUMER `demo/components/instrument/timeline/KeyframeTimeline.vue`.
- **Covered by:** UIA-KF-054, 185 and 207 are symptom rows. The unused primitive is new.

### A2-KE-L1-21 · LOW · Route KF.W13X · dead CSS and invalid idiom
- **View:** Controls pane surfaces; design-idioms.
- **Finding:** Leftover idiom residue:
  - `tab-idiom.css` is 32 lines carrying one 4-line rule, named after a deleted skin.
  - That rule keys on role=tabpanel, which the panes stamp although no tablist exists.
  - `.reverse-badge` has no user.
  - Two description tables are exported and never read.
- **Evidence:** `styles/tab-idiom.css:1-32`; `ChannelControls.vue:84,116,136`; `probe-mounts.json` (6 tabpanels, 0 tablists on #/cube); `design-idioms.css:292`; `utils/reference-data/animationDescriptions.ts:5,12`.
- **Cause:** The tab strip was deleted piecemeal.
- **Cure:**
  - Move the rule into `design-idioms.css` on a data attribute and delete `tab-idiom.css`.
  - Drop role=tabpanel, or label the panels by the dock control.
  - Delete `.reverse-badge` and the two tables, or wire the tables per UIA-KF-171.
- **Owner:** CONSUMER `demo/styles/{tab-idiom.css,design-idioms.css}`, `ChannelControls.vue`, `demo/utils/reference-data/animationDescriptions.ts`.
- **Covered by:** UIA-KF-171 covers the unused table. The rest is new.

### A2-KE-L1-22 · LOW (PLAUSIBLE) · Route KF.W13X (+ BL only if a gap is found) · local copy of a glass surface
- **View:** Bespoke focusable hosts (rails, handles, subject, drill-in row).
- **Finding:** `.kf-focus-ring` is a local twin of glass `.focus-ring`: the same `var(--focus-ring-shadow)` with outline:none, plus a forced-colors outline. glass ships both. 11 components carry the local class.
- **Evidence:** `demo/styles/design-idioms.css:106-109,127-132`; `glass-ui/src/styles/utilities/base.css:84-90`; `a11y-overrides.css:114`.
- **Cause:** KF.W6 renamed its hosts off `.focus-ring` (rationale at `design-idioms.css:113-126`) and the choice was never re-checked against glass 10.
- **Cure:**
  - Re-derive against glass 10.0.1 `.focus-ring`. If the two are equivalent, swap the class on the 11 hosts and delete the local rule.
  - If they are not, relay the gap to glass.
  - The equivalence was not measured on screen.
- **Owner:** CONSUMER `demo/styles/design-idioms.css` (+11 hosts); GLASS only if a gap is found.
- **Covered by:** UIA-KF-024, 305 and 313 are symptom rows.

### A2-KE-L1-23 · LOW · Route KF.W13X · imperative relay and id portals
- **View:** Controls pane ribbon (Keyframes and Timeline verbs); expanded timeline.
- **Finding:** RibbonBar runs its verbs through `any`-typed component refs relayed three levels up, and the shortcut composable uses the same relay. Two layout seams are DOM-id teleports.
- **Evidence:**
  - `RibbonBar.vue:144-148,19,32,43,55,77-98`; `AnimationControlsGroup.vue:219-229`; `ChannelControls.vue:374-378`; `useControlsKeyboardShortcuts.ts:108-115`.
  - Portals: `RibbonBar.vue:7` ← `ChannelOptions.vue:713`, and `AnimationControlsGroup.vue:94` ← `ChannelControls.vue:171`.
- **Cause:** The actions were hoisted without the state and commands they act on.
- **Cure:**
  - Provide a typed command object per selected channel, and have RibbonBar and the shortcuts inject it.
  - After A2-KE-L1-10, render the ribbon slot and the expanded cell from the one host.
- **Owner:** CONSUMER `demo/components/instrument/transport/{controls-pane/RibbonBar.vue,AnimationControlsGroup.vue,channel-controls/ChannelControls.vue,AnimationControlsGroup/useControlsKeyboardShortcuts.ts}`.
- **Covered by:** UIA-KF-173 and 179 are UI rows. The relay is new.

### A2-KE-L1-24 · LOW · Route KF.W13X · duplicate transport mounts
- **View:** Controls ribbon on cube/amiga/square; #/easing ribbon; #/spring ribbon.
- **Finding:** PlaybackRibbon is mounted three ways with three wiring copies. Spring also duplicates Reveal/Dismiss between the ribbon and the in-card button.
- **Evidence:** `ChannelOptions.vue:713-737`; `EasingScene.vue:106-124`; `SpringScene.vue:213-250` (twin at `:214-231`) against `StartingStyleTarget.vue:59-68`.
- **Cause:** Each scene extended the ribbon on its own.
- **Cure:**
  - Under UIA-KF-051's ruling keep one transport. If PlaybackRibbon survives, mount it once from RibbonBar.
  - Retire the ribbon's Reveal/Dismiss twin (KFA-157).
- **Owner:** CONSUMER `ChannelOptions.vue`, `demo/scenes/easing/EasingScene.vue`, `demo/scenes/spring/SpringScene.vue`.
- **Covered by:** UIA-KF-051 and KFA-157. This row adds only the three-mount variance.

### A2-KE-L1-25 · MEDIUM · Route BL · cross-app duplicate
- **View:** The @mbabb menu in keyframes, the value.js ProfileSection @mbabb menu, and the fourier AppDock about card.
- **Finding:** The @mbabb identity surface (avatar, handle, tagline, repo link and dark row) is hand-built in three apps on three primitives. glass `DropdownMenuItem` has no leading-glyph or description slot, so keyframes hand-rolls the glyph + title + subtitle row five times.
- **Evidence:**
  - keyframes `demo/app/dock/MbabbMenu.vue:5-283` (glyph column `:61,86,102,152,218,242`; identity `:234-281`).
  - value.js `demo/shell/dock/menus/ProfileSection.vue:151-200`.
  - fourier `web/src/components/layout/AppDock.vue:75-113`.
  - `glass-ui/src/components/menu/DropdownMenuItem.vue:41-46`.
- **Cause:** glass ships no identity block and no item anatomy.
- **Cure:**
  - `DropdownMenuItem` gains `#leading` and `#description` slots.
  - glass ships an identity-block recipe (Avatar + handle + tagline + repo link).
  - All three apps collapse onto it.
- **Owner:** GLASS `glass-ui/src/components/menu/DropdownMenuItem.vue` (+ a recipe beside `src/components/avatar`); consumers keyframes `MbabbMenu.vue`, value.js `ProfileSection.vue`, fourier `AppDock.vue`.
- **Covered by:** O-61 (DARK-MENU-ITEM) and O-71 (4) cover the dark and link halves. The identity block and item anatomy are new.

### A2-KE-L1-26 · LOW · Route BL · cross-app duplicate
- **View:** Home hero aurora (keyframes) and the value.js picker atmosphere.
- **Finding:** The pointer-follow for glass Aurora is hand-wired twice, and the copies diverge: only keyframes guards touch, reduced motion and hidden documents. glass already ships `useRoutePointer`.
- **Evidence:** keyframes `demo/components/instrument/shell/HeroAurora.vue:211-242`; value.js `demo/color-picker/composables/boot/useAtmosphere.ts:377-394`; `glass-ui/src/composables/motion/pointer/useRoutePointer.ts:83`.
- **Cause:** Aurora exposes only an imperative setCursor/clearCursor.
- **Cure:** Give Aurora a `followPointer` prop (or a documented recipe) that owns the guards; both consumers then delete their listeners.
- **Owner:** GLASS `glass-ui/src/components/aurora/Aurora.vue` (+ `useRoutePointer`); consumers keyframes `HeroAurora.vue`, value.js `useAtmosphere.ts`.
- **Covered by:** none.

### A2-KE-L1-27 · LOW · Route BL · consumer workaround
- **View:** Keyboard-shortcuts dialog; Share popover; CSS paste dialog.
- **Finding:** Every keyframes overlay hand-wires an `@interact-outside` guard, backed by a local `toastGuard` that reads glass's private `data-slot="toast"`, so that a toast press does not dismiss the overlay. There are three copies.
- **Evidence:** `demo/components/instrument/utils/toastGuard.ts:1-27`; `KeyboardShortcutsModal.vue:83-88`; `SharePopover.vue:64-68`; `CSSPasteDialog.vue:16-20`; `glass-ui/src/components/dialog/DialogContent.vue:208`; `popover/PopoverContent.vue:143-145`.
- **Cause:** The Toaster portals outside the overlay layer.
- **Cure:** DialogContent, PopoverContent and Sheet ignore outside interactions inside the glass Toaster; then delete `toastGuard.ts` and the three guards.
- **Owner:** GLASS `glass-ui/src/components/{dialog/DialogContent.vue,popover/PopoverContent.vue,sheet}`; consumer `demo/components/instrument/utils/toastGuard.ts`.
- **Covered by:** none.

### A2-KE-L1-28 · LOW · Route BL · cross-app gap
- **View:** Every text entry on iOS (all three apps).
- **Finding:** glass ships an iOS no-zoom rule keyed on a `.ios` root class but no code that sets the class. Only keyframes sets it, with its own sniffer, so the rule is inert in value.js and fourier.
- **Evidence:** `glass-ui/src/styles/utilities/base-misc.css:32-38`; no `classList.add('ios')` in glass, value.js or fourier; keyframes `demo/components/instrument/utils/iosTextEntry.ts:1-19` (called at `EditorShell.vue:133`).
- **Cause:** The CSS half shipped without its JS half.
- **Cure:** Ship `installPlatformClass()` beside `installDarkModeSync`, or key the rule on `@supports (-webkit-touch-callout: none)`. keyframes then deletes its sniffer.
- **Owner:** GLASS `glass-ui/src/styles/utilities/base-misc.css` (+ a composables installer); consumer `demo/components/instrument/utils/iosTextEntry.ts`.
- **Covered by:** UIA-KF-192 covers the keyframes symptom. The cross-app root is new.

### A2-KE-L1-29 · LOW · Route BL · cross-app duplicate
- **View:** #/easing header copy (keyframes); value.js mix/gradient/generate/config copy buttons.
- **Finding:** glass has no copy-button primitive. keyframes has its own CopyButton, and value.js repeats the status→icon swap at five sites.
- **Evidence:** keyframes `demo/components/CopyButton/CopyButton.vue:29-55,94-114`; value.js `MixResultDisplay.vue:32-33,133-136`, `GradientVisualizer.vue:111`, `GradientEasingEditor.vue:102`, `GenerateControls.vue:119`, `ConfigSliderPane.vue:94`; glass has only `src/composables/dom/useClipboard.ts`.
- **Cause:** glass shipped the composable without the control.
- **Cure:** Add a glass `CopyButton` (text prop, useClipboard, icon swap, tooltip, sr-only status, failure tone) and retire the local copies onto it.
- **Owner:** GLASS `glass-ui/src/components` (new, beside `button/`); consumers keyframes `CopyButton.vue`, value.js `workbenches/*`.
- **Covered by:** UIA-KF-298 covers the icon timing only.

## Lens 2: mobile views

### A2-KE-L2-1 · BROKEN · Route KF.W13X + BL · CONFIRMED
- **View:** Every scene route · top dock expanded · surface items (Controls, Keyframes, Timeline, Curve/Physics) · 360x780, 390x844, 430x932, 844x390 · light and dark.
- **Finding:** On a touch device, tapping a top-dock surface item never opens the controls sheet. The tap opens the pane, and 3 ms later the non-modal sheet's outside-press dismissal closes it, so the sheet stays at peek. A mouse click keeps it open, so every fine-pointer oracle misses this.
- **Evidence:**
  - `keyframes-L2/probe/debug3.mjs` trace at 390x844: tap → valuenow 0.36 at 1121ms → 0.12 at 1124ms. `results-main.json`: every s2-* state (6 scenes × 4 viewports × 2 themes) ends at 0.12.
  - Frame: `keyframes-L2/frames/cube-390x844-light-s2-controls.png`.
  - Register re-measure: `keyframes-register/frames/L2-1-cube-390-{tap,click}.png` (tap 0.12, click 0.36).
  - Source: `demo/app/dock/ChromeDock.vue:190-198`; `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue:153-157`.
- **Cause:** reka's DismissableLayer defers pointer-down-outside for `pointerType: 'touch'` to a document click listener. That listener runs after the dock item's own click handler, so the dock tap counts as outside the sheet.
- **Cure:**
  - GLASS: the non-modal detented SheetContent must not outside-dismiss on presses on persistent dock chrome (`.glass-dock` / `[data-dock-tether]`). The live-behind contract at `sheet/styles.css:83-93` already names the dock as sibling chrome.
  - CONSUMER until then: `@pointer-down-outside` / `@interact-outside` on SheetContent (`ControlsPaneWrapper.vue:182-189`) calls `preventDefault()` when the target is inside `[data-dock-tether]`.
  - Gate: `touchscreen.tap` on each item leaves the expanded rung.
- **Owner:** GLASS `glass-ui/src/components/sheet/SheetContent.vue`; CONSUMER `ControlsPaneWrapper.vue:153-157,182-189`.
- **Covered by:** none. This is distinct from UIA-KF-216, which is the handle tap.

### A2-KE-L2-2 (absorbs A2-KE-L3-14) · BROKEN · Route BL · CONFIRMED (re-confirmation)
- **View:** Every scene route · mobile controls sheet (<1024px, including 844x390) · light and dark.
- **Finding:** The glass 10 sheet computes `position: relative`. It sits in flow, lifted −128px, with its top fixed at vh−128 at every detent (716px at 390x844). Raising the detent grows the box downward, off-screen: the 0.36 rung ends at y 1020 on an 844px viewport.
  - (L3-14) End, ArrowUp and drag all move `aria-valuenow` from 0.12 to 0.36, yet the top edge stays at 716-723 and the height goes 171 → 304 → 523.
  - The Lens 3 seat could therefore judge the 390 pane only on a SYNTHETIC in-page lift (`keyframes-L3/capture390lift.mjs`).
- **Evidence:**
  - `keyframes-L2/probe/{debug2,sheetpos}.mjs`; frames `keyframes-L2/frames/SHEETPOS-cube-390x844-light-detent-expanded.png`, `SHEETPOS-cube-844x390-dark-detent-expanded.png`, `keyframes-L3/frames/390-light/cube-02-Controls.png`, `keyframes-L3/frames/_probe/390-drag.png`.
  - Register re-measure: relative; [716,887] → [716,1020] at 390x844; [262,467] at 844x390.
- **Cause:** `SheetContent.vue:106` adds `.glass-floating`. Its `position: relative` (`glass-ui/src/styles/glass/material.css:35-47`, specificity (0,1,0)) beats the sheet's zero-specificity `:where([data-slot=sheet-content]) { position: fixed }` (`sheet/styles.css:29-32`), both in `@layer components`. The bottom placement also has no inset-inline.
- **Cure:** GLASS makes the sheet's positioning win, by excluding `[data-slot=sheet-content]` from the material list or raising the sheet rule to (0,1,0), and adds `inset-inline: 0` for side=bottom. No consumer change is needed.
- **Owner:** GLASS `glass-ui/src/styles/glass/material.css:35-47`, `glass-ui/src/components/sheet/styles.css:28-33`, `SheetContent.vue:106`.
- **Covered by:** SHEET-POSITION (KF.W13R/KF.W13V honest-RED, BL F-21), and UIA-KF-005/006 (the 7.0.0 predecessor). This row re-confirms them under touch at all four viewports.

### A2-KE-L2-3 · HIGH · Route KF.W13X + BL · CONFIRMED
- **View:** Every scene route · 844x390 landscape · controls sheet, measured with the SHEET-POSITION cure simulated.
- **Finding:** The detent ladder is portrait-derived and breaks in landscape.
  - With the sheet cured, PEEK is already 204px (the glass chrome floor), spans y 58-262, covers the whole 176px stage and slides under the top dock (bottom 91).
  - 0.36 gives the same 204px, so the ladder is degenerate. 0.62 reaches y 20.
  - The scroll window is 69px at 0.36 and 106px at 0.62, per the seat.
  - This is latent behind SHEET-POSITION today and becomes the landscape experience the moment glass is cured.
- **Evidence:**
  - `keyframes-L2/probe/results-simsheet.json`; frames `keyframes-L2/frames/SIM-cube-844x390-light-s0-rest.png` and `SIMSHEET-easing-844x390-open.png`.
  - Register re-measure: rest [58,262] and 0.36 [58,262], both 204px; top dock bottom 91. Frames `keyframes-register/frames/L2-3-SIM-cube-844x390-{rest,open}.png`.
- **Cause:** `ControlsPaneWrapper.vue:421-436` uses fixed viewport fractions (PEEK 0.12, SUBJECT 0.36, EDITOR 0.62). The derivation assumes b≈0.08, but landscape `--stage-bottom-inset` is 128px (b 0.33), and the chrome floor exceeds 0.12·390 and 0.36·390. The glass sheet has no top-clearance lever.
- **Cure:**
  - CONSUMER: under `(max-height: 500px)` or landscape, mount SheetContent side="right" (the desktop-rail analogue). Otherwise derive the rungs in px from the available band.
  - GLASS: give the detented Sheet a top-clearance lever (the dock band) that caps the top rung.
- **Owner:** CONSUMER `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue:399-445`; GLASS `glass-ui/src/components/sheet/styles.css`.
- **Covered by:** none. UIA-KF-006 and SHEET-POSITION cover portrait only.

### A2-KE-L2-4 · HIGH · Route KF.W13X · CONFIRMED
- **View:** / (home) · 844x390 · light and dark.
- **Finding:** The home hero collapses in landscape.
  - The phone grid's rows resolve to 0 / 203 / 0px inside a 155px band.
  - The 74px headline (y 68-146) runs under the top dock (31-91) and over the cube.
  - The deck and hint (244-325) sit under the transport (268-328).
  - The pause toggle falls to y 333-387, at the viewport's bottom edge.
- **Evidence:**
  - `keyframes-L2/probe/debug6.mjs`; frame `keyframes-L2/frames/home-844x390-light-s0-rest.png` (and -dark-).
  - Register re-measure: identical figures; frame `keyframes-register/frames/L2-4-home-844x390.png`. At 390x844 the grid is 203/203/203 and clean.
- **Cause:** `EditorStartScreen.vue:386-410` applies the phone column on `max-width: 1023px` alone. `--home-cube-extent` (203px) exceeds the 155px band, and `--type-display-4` is inline-fluid, not bounded by block size.
- **Cure:**
  - Add a short-viewport branch with a two-column hero: headline and deck beside the cube.
  - Bound the cube extent by the band's block size, and clamp the display rung by block size (cqb or dvh).
  - Gate: at 844x390 no hero rect intersects a dock rect.
- **Owner:** CONSUMER `demo/components/instrument/shell/EditorStartScreen.vue:247-260,386-410`, `demo/styles/layout.css` (`--home-cube-extent`).
- **Covered by:** none. UIA-KF-065 and 121 are 390 portrait.

### A2-KE-L2-5 · HIGH · Route KF.W13X · CONFIRMED
- **View:** / (home) · every viewport (touch) · light and dark.
- **Finding:** The "Pause the title animation" toggle ignores pointer and touch input. It is a 54px button and the only way to stop the hero wave on a phone, but it inherits `pointer-events: none` from the start-screen wrapper, so a tap passes through to the stage.
- **Evidence:**
  - `keyframes-L2/probe/debug4.mjs`; frame `keyframes-L2/frames/home-390x844-light-s0-rest.png`.
  - Register re-measure at 390x844 and 844x390: computed `pointer-events: none`, `elementFromPoint` returns the stage cell, and the label is unchanged after a tap.
- **Cause:** `EditorStartScreen.vue:14-22` documents the inherited none. The Button at `:143-155` never re-enables it. KFA-134's probe (`keyframes/evidence/W13V/u/kfa-134/pause.mjs`) checked keyboard Tab only.
- **Cure:**
  - Add `pointer-events-auto` to `.hero-motion-toggle`, the TD-36 dock idiom.
  - Land it with A2-KE-L3-10's placement move.
  - Gate: a tap flips aria-pressed.
- **Owner:** CONSUMER `demo/components/instrument/shell/EditorStartScreen.vue:143-155`.
- **Covered by:** none. KFA-134 introduced the control.

### A2-KE-L2-6 · HIGH · Route BL · CONFIRMED
- **View:** Every scene route · top dock expanded · 360/390/430/844x390 · light and dark.
- **Finding:** The four top-dock surface items are the app's primary pane navigation. On touch they paint and hit at 30.8×30.8px with no hit-slop, at every mobile width. The neighbouring Scene and @mbabb triggers do reach 44px through glass's `::after` slop.
- **Evidence:**
  - `keyframes-L2/probe/results-main.json` s1-dock-expanded (all scenes, viewports and themes); frame `keyframes-L2/frames/cube-390x844-light-s1-dock-expanded.png`.
  - Register re-measure at 360 and 390: 30.8×30.8, `dock-icon-button--compact`, `::after` content `none`, no hit 6px beyond either edge. Frames `keyframes-register/frames/L2-6-cube-{360,390}-dock-expanded.png`.
- **Cause:** `ChromeDock.vue:462-470` mounts the items `compact`. `glass-ui/src/components/dock/styles/controls/touch-floor.css:25-28` exempts compact buttons, and the coarse slop at `:41-46` targets only the three trigger classes.
- **Cure:** GLASS extends the self-limiting `::after` slop (`max(100%, --dock-touch-target)`) to `.dock-icon-button--compact` under `pointer: coarse`. The painted size stays, so the 360 row still fits. Dropping `compact` in the consumer would overflow 360.
- **Owner:** GLASS `glass-ui/src/components/dock/styles/controls/touch-floor.css:25-44`, `icon-button.css:235-240`; consumer `demo/app/dock/ChromeDock.vue:466` unchanged.
- **Covered by:** none. UIA-KF-256 was the old select trigger.

### A2-KE-L2-7 · MEDIUM · Route BL · re-confirmation
- **View:** Every scene route · rest (sheet at peek) · 390x844, 844x390 · light and dark.
- **Finding:** At peek the detent handle sits under the transport dock: 7 of 11 hit samples resolve to the dock at 390x844. A tap on the uncovered part still does nothing at 10.0.1, so the sheet can only be raised by a drag that lands on a sliver of the grip.
- **Evidence:** `keyframes-L2/probe/handle.mjs`: samples `HHDDDDDDDoo` at 390x844 and `HHHHDDDHHHo` at 844x390; a tap leaves 0.12. Frame `keyframes-L2/frames/cube-390x844-light-s0-rest.png`.
- **Cause:** The in-flow sheet (A2-KE-L2-2), plus no tap-to-step on the glass handle (`sheet/styles.css:255-305`).
- **Cure:** The occlusion clears with SHEET-POSITION. GLASS: a handle tap steps to the next rung (UIA-KF-216).
- **Owner:** GLASS `glass-ui/src/components/sheet/SheetContent.vue`, `sheet/styles.css:255-305`.
- **Covered by:** UIA-KF-005 and UIA-KF-216, re-confirmed under touch at 10.0.1.

### A2-KE-L2-8 (absorbs A2-KE-L3-16) · BROKEN (carried from UIA-KF-032) · Route KF.W13X + BL · CONFIRMED (re-confirmation)
- **View:** Every scene route · collapsed transport (auto-collapses when the top dock expands on phones; collapsed at 1440 too) · 360/390/430/844x390 and 1440 · light and dark.
- **Finding:** The collapsed transport's content overflows its 56-60px pill.
  - At 390 the Play mirror paints at x 133-177 and the channel name at 183-257, both outside the plate at 165-225 and over the sheet header.
  - The plate itself looks empty.
  - At 1440 the label ("Rotations", "Sweep", "Easing") spills out of the circle.
- **Evidence:**
  - `keyframes-L2/probe/debug5.mjs`; frames `keyframes-L2/frames/cube-390x844-light-s1-dock-expanded.png`, `spring-390x844-dark-s1-dock-expanded.png`, `keyframes-L3/frames/1440-light/{cube-02-Keyframes,spring-02-Physics,easing-02-Curve}.png`.
  - Register re-measure: at 360 the plate is 150-210 with Pause at 118-162 and Rotations at 168-242; at 390 the plate is 165-225 with Pause at 133-177 and Rotations at 183-257.
- **Cause:** The GlassDock collapsed layer is sized to the summary square, while `TransportDock.vue:199-215` slots a Play mirror plus a name into `#collapsed`.
- **Cure:**
  - GLASS: the collapsed form contains its slotted content (O-65 DOCK-COLLAPSED-FORM).
  - CONSUMER: KF.W13W .d keeps `#collapsed` to one glyph at phone widths.
- **Owner:** GLASS O-65 (`glass-ui/src/components/dock`); CONSUMER `demo/components/instrument/transport/TransportDock.vue:199-215`.
- **Covered by:** UIA-KF-032, O-65, KF.W13W .d (OA-57). This row adds only the phone measurement.

### A2-KE-L2-9 · MEDIUM · Route BL
- **View:** Controls pane fields (duration, delay, iterations, NumberField) and the Share URL field · 14px at 360/390/430, 14.91px at 844x390 · light and dark.
- **Finding:** Under real coarse emulation (hasTouch, isMobile) at glass 10.0.1, every glass text field renders below the iOS 16px floor, so focusing any of them zooms the page.
  - UIA-KF-192's 7.0.0 amendment suspected this was a no-touch artifact; at 10.0.1 it is real.
  - It reaches beyond the textarea.
- **Evidence:** `keyframes-L2/probe/results-simsheet.json` (inputs at 14px, h60, on five scenes); `results-overlays.json` (the share field at 14px); frame `keyframes-L2/frames/OV-cube-390x844-light-o4-share-popover.png`.
- **Cause:** `glass-ui/src/components/_shared/field/control.css:112-122` uses `var(--type-small)`, whose floor is 0.875rem, and deliberately drops `--ui-scale`.
- **Cure:** Floor the field-control font at `max(1rem, var(--type-small))` under `pointer: coarse` or narrow inline sizes.
- **Owner:** GLASS `glass-ui/src/components/_shared/field/control.css:112-122`.
- **Covered by:** UIA-KF-192 (same root). This row widens its scope and resolves its amendment.

### A2-KE-L2-10 · MEDIUM · Route KF.W13X
- **View:** cube/amiga/square (0.36) and easing/spring (0.62) · 360x780, 390x844 · Controls surface, measured with SHEET-POSITION simulated.
- **Finding:** With the sheet cured, the subject rung gives the pane a scroll window of 171px (360) or 194px (390) for 706px of content, so about 3 of 9 rows show.
  - The handle row and the ribbon header take about 110px of the 304px sheet.
  - The editor rung shows 374-413px of 1223-1328px.
- **Evidence:** `keyframes-L2/probe/results-simsheet.json`; frames `keyframes-L2/frames/SIMSHEET-cube-390x844-open.png` and `SIMSHEET-cube-390x844-open-scrolled.png`.
- **Cause:** `EXPANDED_SUBJECT = 0.36` (`ControlsPaneWrapper.vue:435`) keeps the 0.45 stage floor, and the fixed chrome comes out of the same box.
- **Cure:**
  - Add a third, full rung (stage compacted) for editing, or move the ribbon header into the handle row.
  - Re-measure after SHEET-POSITION.
- **Owner:** CONSUMER `ControlsPaneWrapper.vue:421-445`, `RibbonBar.vue`.
- **Covered by:** related to UIA-KF-006's fix text. The measurement is new.

### A2-KE-L2-11 · MEDIUM · Route KF.W13X
- **View:** Every scene route · 844x390 · rest · light and dark.
- **Finding:** In landscape the chrome takes 60% of the height: a 107px top band plus a 128px bottom inset leave the stage 176px (45%).
  - Stage cards clip and scroll internally: spring 458px of content in 174px, sequence 309/174, square 197/174.
  - All 10 visible easing specimens sit under the sheet or dock.
- **Evidence:** `keyframes-L2/probe/stage.mjs`; `results-main.json`; frames `keyframes-L2/frames/STAGE-spring-844x390.png`, `STAGE-sequence-844x390.png`, `easing-844x390-light-s0-rest.png`.
- **Cause:** `demo/styles/layout.css:53-56,108-150`: the band reserves are constant px, not height-aware.
- **Cure:**
  - Under `(max-height: 500px)`, shrink the anchors and reserves, or float the transport over the stage.
  - Pair it with A2-KE-L2-3's side sheet.
- **Owner:** CONSUMER `demo/styles/layout.css:53-56,108-165`.
- **Covered by:** UIA-KF-203 covers the easing gallery at 390 portrait. The landscape budget is new.

### A2-KE-L2-12 · LOW · Route KF.W13X + BL
- **View:** /cube · @mbabb menu → Share popover · 360/390/430 portrait · light and dark.
- **Finding:** The Share popover lands flush against the left edge (0px gutter) and covers the menu's Dark mode and Keyboard shortcuts rows.
- **Evidence:** `keyframes-L2/probe/results-overlays.json`: x 0 and w 288 at 360/390/430; x 96.5 at 844x390. Frame `keyframes-L2/frames/OV-cube-390x844-light-o4-share-popover.png`.
- **Cause:** `SharePopover.vue:59-62` uses align="end" and w-72. glass PopoverContent sets no collisionPadding, whereas `SelectContent.vue:56` sets 16.
- **Cure:**
  - GLASS: give PopoverContent and DropdownMenuContent a default collisionPadding of 16.
  - The overlap is UIA-KF-056's cure.
- **Owner:** GLASS `glass-ui/src/components/popover/PopoverContent.vue`; CONSUMER `demo/components/instrument/shell/SharePopover.vue:59-62`.
- **Covered by:** UIA-KF-056 and UIA-KF-113. The 0px phone gutter is new.

### A2-KE-L2-13 · LOW · Route KF.W13X + BL · re-confirmation
- **View:** /cube · @mbabb menu · Dark mode row · all viewports (touch).
- **Finding:** Tapping the Dark mode row does nothing. The row is 258×53px, but only its 28×28 toggle acts.
- **Evidence:** `keyframes-L2/probe/darkrow.mjs`; `results-overlays.json`; frame `keyframes-L2/frames/OV-cube-390x844-light-o2-mbabb-menu.png`.
- **Cause:** `MbabbMenu.vue:79-93` uses a DropdownMenuItem with `@select.prevent` wrapping DarkModeToggle.
- **Cure:**
  - CONSUMER: a DropdownMenuCheckboxItem bound to `isDark` (mmm3).
  - GLASS: the menu-item dark form (DARK-MENU-ITEM).
- **Owner:** CONSUMER `demo/app/dock/MbabbMenu.vue:79-93`; GLASS DARK-MENU-ITEM.
- **Covered by:** DARK-MENU-ITEM (O-61 R-3, KF.W13R honest-RED) and UIA-KF note mmm3. This row adds only the touch-target measurement.

### A2-KE-L2-14 · LOW · Route KF.W13X + BL
- **View:** @mbabb menu, square/sequence status badges, sequence axis ticks, easing specimen numerals · all mobile viewports.
- **Finding:** An 11px micro rung carries readable text on phones and does not scale under a coarse pointer. It covers:
  - the menu descriptions;
  - the link lines (13.8px-tall targets);
  - the status badges;
  - the axis ticks;
  - the easing numerals.
- **Evidence:** `keyframes-L2/probe/results-overlays.json` (8 texts at 11px; links 208×13.8); `results-main.json`; frame `keyframes-L2/frames/sequence-390x844-light-s0-rest.png`.
- **Cause:** The glass micro rung is a fixed 11px.
- **Cure:**
  - GLASS: floor text-micro and text-mono-micro at 12px under coarse or narrow sizes.
  - CONSUMER: make the whole menu row the link target.
- **Owner:** GLASS `glass-ui/src/styles/typography/scale.css`; CONSUMER `demo/app/dock/MbabbMenu.vue:160-250`.
- **Covered by:** UIA-KF-147 covers key caps only. Partially new.

### A2-KE-L2-15 · LOW · Route KF.W13X
- **View:** All routes · safe-area insets.
- **Finding:** The viewport meta has no `viewport-fit=cover`, so every `env(safe-area-inset-*)` term is dead on iOS. There is also no left/right inset handling. Chromium cannot show real insets, so this rests on source.
- **Evidence:** `demo/app/index.html:6`; measured env() = 0px (`results-main.json`); dead terms at `demo/styles/layout.css:111,123,145,162,248` and `TransportDock.vue:351`.
- **Cause:** The arithmetic assumes edge-to-edge, but the viewport never opts in.
- **Cure:** Either add `viewport-fit=cover` with inline insets for landscape, or delete the dead terms and document the letterboxed posture.
- **Owner:** CONSUMER `demo/app/index.html:6`, `demo/styles/layout.css:111-248`, `TransportDock.vue:351`.
- **Covered by:** none.

### A2-KE-L2-16 · LOW · Route BL
- **View:** Every scene route · top dock expanded · 360x780 · light and dark.
- **Finding:** At 360 the expanded top dock (342.8px) leaves 8.6px side gutters, half the 16px page gutter.
- **Evidence:** `keyframes-L2/probe/results-main.json`; frame `keyframes-L2/frames/cube-360x780-light-s1-dock-expanded.png`.
- **Cause:** The dock's inline cap is not bounded by a gutter token.
- **Cure:** Cap the dock at `calc(100dvw - 2 * var(--page-gutter, 1rem))`, letting the native scroll axis take over when content is wider.
- **Owner:** GLASS `glass-ui/src/components/dock/styles/shell.css`.
- **Covered by:** none.

### A2-KE-L2-17 · LOW · Route KF.W13X + BL
- **View:** /cube · @mbabb menu · 844x390 · light and dark.
- **Finding:** In landscape the 10-row menu is clipped to 234px (scrollHeight 387). "Clear all & reload" and the @mbabb row are hidden below a scroll with no affordance.
- **Evidence:** `keyframes-L2/probe/results-overlays.json`; frame `keyframes-L2/frames/OV-cube-844x390-light-o2-mbabb-menu.png`.
- **Cause:** DropdownMenuContent's available-height cap, with no scroll fade.
- **Cure:**
  - GLASS: a scroll fade on overflowing menu content.
  - CONSUMER: move the brand rows out of the menu in short viewports.
- **Owner:** GLASS `glass-ui/src/components/dropdown-menu`; CONSUMER `demo/app/dock/MbabbMenu.vue`.
- **Covered by:** none.

## Lens 3: hierarchy and use of space

(A2-KE-L3-3, L3-14 and L3-16 are merged above.)

### A2-KE-L3-1 · HIGH · Route BL · CONFIRMED (amended)
- **View:** easing Curve facet (rail and sheet) and the cube timing-function detail; every glass SegmentedTabs host at a coarse phone (390, both themes).
- **Finding:** In EasingPicker's single control row, the Bezier/Steps tabs render at 12.2px beside a 21px "Custom" Select, and the tab pill is about 34-36px tall against a 60-64px trigger. Two sizes compete at one level.
  - At 1440 both render at 16.4px.
  - Amendment: at 34px the tabs are also below the 44px touch floor.
- **Evidence:**
  - Frames `keyframes-L3/frames/390-light-lifted/easing-L-Curve.png` and `easing-L-Curve-end.png`; metrics `keyframes-L3/frames/390-light/log-sheet.json`; 1440 `keyframes-L3/frames/1440-light/log.json`.
  - Register re-measure: 12.179px, 34px tall, against 21px/60px, with `--ui-scale` 1.5.
  - Source: `glass-ui/src/components/tabs/styles/segmented.css:284,311`; `glass-ui/src/styles/tokens/sizing.css:35`; `glass-ui/src/components/easing/EasingPicker.vue:505-537`.
- **Cause:** The segmented label follows the fluid ramp, drops to caption below 640px, and never reads `--control-text` or `--ui-scale`.
- **Cure:**
  - `.segmented-tab` uses `var(--control-text)` (or `--control-text-sm`) and `--control-h-*`.
  - Delete the <640px caption step.
  - Relay with A2-KE-L3-2.
- **Owner:** GLASS `glass-ui/src/components/tabs/styles/segmented.css:284,311` (host row `EasingPicker.vue:505-515`).
- **Covered by:** none. The prior register never emulated a coarse pointer (note cpdm3).

### A2-KE-L3-2 · MEDIUM · Route KF.W13X + BL · type scale
- **View:** Controls pane, Curve and Physics facets, and scene stage titles at a coarse phone (390, both themes).
- **Finding:** On a coarse phone the type hierarchy inverts. Controls grow 1.5x while headings and readouts shrink.
  - Section headings ("advanced", "Peak overshoot") render at 14px under 18.6px/500 labels and 21px values.
  - Readouts ("1500 ms", "ζ 0.86") are 12.2px mono beside 18.6px labels.
  - The easing title (25.9px) barely leads 18.3px chips in 54px pills.
- **Evidence:** `keyframes-L3/frames/390-light/log-sheet.json`; frames `keyframes-L3/frames/390-dark-lifted/spring-L-Physics.png`, `390-light-lifted/easing-L-Curve-end.png`, `390-dark/easing-00-rest.png`; source `ChannelOptions.vue:599,676`, `SpringHeatmap.vue:22`, `design-idioms.css:362-371`, `SpringPhysicsFacet.vue:87`, `glass-ui/src/styles/tokens/sizing.css:35-42`.
- **Cause:** `--ui-scale` scales only the control tokens, while headings and readouts sit on the raw fluid ramp.
- **Cure:**
  - CONSUMER: readouts on `--control-label`; headings at or above `--control-label` with the heading weight.
  - GLASS: publish ui-scaled section-heading and readout roles.
- **Owner:** CONSUMER `ChannelOptions.vue:599,676`, `demo/scenes/spring/SpringHeatmap.vue:22`, `demo/styles/design-idioms.css:366`, `demo/scenes/spring/SpringPhysicsFacet.vue:87`; GLASS `glass-ui/src/styles/tokens/sizing.css:35-42`.
- **Covered by:** UIA-KF-107 (eyebrow) and UIA-KF-273 (1440 weight) only. This row is new.

### A2-KE-L3-4 · MEDIUM · Route BL · one treatment per level
- **View:** Controls pane form (duration/delay/iterations against direction/fill mode/easing) on cube, amiga, square, easing and spring; 1440 and 390, both themes.
- **Finding:** One labeled form mixes two field materials with opposite resting weights.
  - Input: an opaque plate with a rim at alpha 0.48.
  - Select trigger: a transparent 10% tint with a rim at alpha 0.14.
  - Emphasis flips with the theme: selects read heavier in light, inputs in dark.
- **Evidence:** `keyframes-L3/probe-fields.mjs`; frames `keyframes-L3/frames/1440-light/cube-01-dock-expanded.png`, `1440-dark/square-00-rest.png`, `1440-dark/amiga-01-dock-expanded.png`.
- **Cause:** `glass-ui/src/components/_shared/field/control.css:103` (a solid plate) differs from `glass-ui/src/components/select/SelectTrigger.vue:52` (a tint gradient).
- **Cure:** Give Input, NumberField and the Select trigger one resting material, with the same plate and rim alpha in both themes. Fold into O-66.
- **Owner:** GLASS `control.css:103`, `SelectTrigger.vue:52` (tokens `glass-ui/src/styles/tokens/glass.css:254`).
- **Covered by:** O-66 GLASS-SELECT-GREY (§0cs), partially. This row is the parity aspect.

### A2-KE-L3-5 · MEDIUM · Route KF.W13X · gutters and rhythm
- **View:** Stage plates of easing, spring, sequence and square; 1440 and 390, both themes.
- **Finding:** Each scene frames its plate differently.
  - Rail-to-card gutter at 1440: 41 / 73 / 129px.
  - Card tops: 127 / 127 / 270.
  - Title inset: 17 / 74 / 11px, so spring opens with a 74px dead band.
  - At 390 easing runs edge to edge while the others keep 24px.
- **Evidence:** `keyframes-L3/probe-stage.mjs`, `probe-easing390.mjs`; frames `keyframes-L3/frames/1440-light/{easing-02-Curve,spring-02-Physics,sequence-00-rest}.png`, `390-dark/{easing-00-rest,spring-01-dock-expanded}.png`.
- **Cause:** No shared stage frame: `EasingTarget.vue:13`, `SpringTarget.vue:23,531` (safe-centre) and `SequenceTarget.vue:5,14`.
- **Cure:**
  - One shared stage-plate frame: one inline gutter, a top-anchored header inset, and a block end at `--stage-bottom-inset`.
  - Top-anchor spring, and give easing the 390 gutter.
- **Owner:** CONSUMER `demo/scenes/easing/EasingTarget.vue:13`, `demo/scenes/spring/SpringTarget.vue:23,531`, `demo/scenes/sequence/SequenceTarget.vue:5,14` (+ square and amiga plates).
- **Covered by:** UIA-KF-315 and UIA-KF-194, partially.

### A2-KE-L3-6 · MEDIUM · Route KF.W13X · alignment
- **View:** All scenes at 1440 with the rail open, both themes.
- **Finding:** The page has two centring axes. The docks centre on the viewport (x 720) and the plates on the stage column (x ≈957). The transport lands over the left third of the plate and overlaps its foot by 8px.
- **Evidence:** `keyframes-L3/probe-stage.mjs`; frames `keyframes-L3/frames/1440-light/{easing-02-Curve,spring-02-Physics}.png`, `1440-dark/{square-00-rest,amiga-01-dock-expanded}.png`.
- **Cause:** `ChromeDock.vue:344` and `TransportDock.vue:6` centre on the viewport, while the scenes centre in the stage column.
- **Cure:** While the rail is open, anchor both dock bands to the stage grid area, or end every plate at `--stage-bottom-inset`.
- **Owner:** CONSUMER `demo/app/dock/ChromeDock.vue:344`, `demo/components/instrument/transport/TransportDock.vue:6`.
- **Covered by:** UIA-KF-284, partially.

### A2-KE-L3-7 · MEDIUM · Route KF.W13X · one primary per region
- **View:** Sequence: Timeline pane (Sequence mode) and stage; 1440 and 390, both themes.
- **Finding:** Since a939e7d6 the pane and the stage both show the five-item list, each with its own time axis and playhead, in different label treatments. Two adjacent regions compete as the timing primary.
- **Evidence:** Frames `keyframes-L3/frames/1440-light/sequence-00-rest.png`, `390-dark-lifted/sequence-L-Timeline.png`; `SequenceLanes.vue:40`, `SequenceTarget.vue:123-125`.
- **Cause:** s2 moved re-time into the pane, and the stage kept its timing labels and axis.
- **Cure:** The pane owns timing. The stage keeps unlabelled lanes (an index at most).
- **Owner:** CONSUMER `demo/scenes/sequence/SequenceTarget.vue:123-125`, `demo/components/instrument/timeline/components/SequenceLanes.vue:40`.
- **Covered by:** none. UIA-KF-210 predates the pane.

### A2-KE-L3-8 · LOW · Route KF.W13X · lone control row
- **View:** Spring ribbon (all surfaces), 1440 and 390.
- **Finding:** The spring-only "Re-seat" takes a full-width third ribbon row.
- **Evidence:** Frames `keyframes-L3/frames/1440-light/spring-02-Physics.png`, `390-light-lifted/spring-L-Physics-end.png`.
- **Cause:** `SpringScene.vue:236-250` appends a `w-full` Button.
- **Cure:** Put Re-seat inline in the Play/Reverse row as a compact control, or on the stage beside its rail.
- **Owner:** CONSUMER `demo/scenes/spring/SpringScene.vue:236-250`.
- **Covered by:** UIA-KF-051, partially.

### A2-KE-L3-9 · LOW · Route KF.W13X · section action inline
- **View:** Spring Physics facet, 1440 (below the cut) and 390.
- **Finding:** "Write physics to keyframes" is a 25px caption button on its own row at the card's foot, away from the heading of the section it acts on.
- **Evidence:** Frame `keyframes-L3/frames/390-light-lifted/spring-L-Physics-end.png`; `1440-light/log.json` (lone 218×25).
- **Cause:** `SpringPhysicsFacet.vue:95-103`.
- **Cure:** Move it into the header row as a size-sm section action (the O-68 header-actions pattern).
- **Owner:** CONSUMER `demo/scenes/spring/SpringPhysicsFacet.vue:95-103`.
- **Covered by:** none.

### A2-KE-L3-10 · LOW · Route KF.W13X · lone control row
- **View:** Home start screen, 1440 and 390, both themes.
- **Finding:** The Pause toggle sits alone on a row under the hint, about 250px below the headline it controls, and reads as a stray control.
- **Evidence:** Frames `keyframes-L3/frames/1440-dark/home-01-dock-expanded.png`, `390-light/home-00-rest.png`.
- **Cause:** `EditorStartScreen.vue:143-155`.
- **Cure:** Inline it at the end of the headline or the deck line. Land it with A2-KE-L2-5's `pointer-events-auto`.
- **Owner:** CONSUMER `demo/components/instrument/shell/EditorStartScreen.vue:143-155`.
- **Covered by:** none.

### A2-KE-L3-11 · LOW · Route KF.W13X · gutters and rhythm
- **View:** Controls → advanced sub-pane drill-in, 1440 (and 390).
- **Finding:** The advanced pane sizes its own label column (66px against 98px), so the fields jump 32px sideways on drill-in.
- **Evidence:** Frames `keyframes-L3/frames/1440-light/ov-02-advanced.png`, `cube-01-dock-expanded.png`.
- **Cause:** Two `.labeled-field-grid` containers (`ChannelOptions.vue:58,685`) each auto-size their label track (`design-idioms.css:317-319`).
- **Cure:** One label-track token (`minmax(var(--pane-label-col), auto)`), or one subgridded grid.
- **Owner:** CONSUMER `demo/styles/design-idioms.css:317-319`, `ChannelOptions.vue:58,685`.
- **Covered by:** UIA-KF-081, partially.

### A2-KE-L3-12 · LOW · Route KF.W13X · cramp
- **View:** Spring Physics preset tiles at a coarse phone (390).
- **Finding:** The preset readouts run into the tile's right edge.
- **Evidence:** Frame `keyframes-L3/frames/390-light-lifted/spring-L-Physics-end.png`.
- **Cause:** `SpringPhysicsFacet.vue:87` (nowrap in a two-column grid).
- **Cure:** Wrap the readout or move the units to a caption line; size it per A2-KE-L3-2.
- **Owner:** CONSUMER `demo/scenes/spring/SpringPhysicsFacet.vue:87`.
- **Covered by:** UIA-KF-107, partially.

### A2-KE-L3-13 · BROKEN (carried from UIA-KF-008) · Route KF.W13X · CONFIRMED (re-confirmation)
- **View:** Easing Keyframes/Timeline and spring Keyframes/Timeline, 1440, both themes.
- **Finding:** The scene facet still stacks under the other surfaces.
  - easing Keyframes shows the Curve plate under the editor.
  - spring Keyframes and Timeline show the Physics facet, and the Timeline card is out of view.
- **Evidence:**
  - Frames `keyframes-L3/frames/1440-light/{easing-02-Keyframes,spring-02-Timeline}.png`, `1440-dark/spring-02-Keyframes.png`.
  - Register re-measure: `keyframes-register/frames/L3-13-*-1440.png`. easing Keyframes has the Curve card at [516,1091] with Bezier at y 904. spring Timeline has Physics at [62,693] and the Timeline card from 693, past the 618 cut.
- **Cause:** As filed in UIA-KF-008.
- **Cure:** Gate the facet body to its own surface (UIA-KF-008).
- **Owner:** CONSUMER, per UIA-KF-008.
- **Covered by:** UIA-KF-008.

### A2-KE-L3-15 · MEDIUM · Route KF.W13X · lone control row (re-confirmation, amended)
- **View:** Keyframes and Timeline ribbons, 1440 and coarse 390.
- **Finding:** At 1440 both ribbons wrap 3+1, orphaning "Apply CSS" and "Add CSS", with no primary emphasis. Amendment: at coarse 390 the Timeline ribbon wraps 1+2+1, so four verbs take three rows.
- **Evidence:** Frames `keyframes-L3/frames/1440-light/{cube-02-Keyframes,cube-02-Timeline}.png`, `390-light-lifted/cube-L-Timeline-end.png`.
- **Cause:** RibbonBar uses flex-wrap justify-center over four buttons at the coarse height.
- **Cure:** A one-row toolbar with a primary lead action (UIA-KF-179, UIA-KF-319).
- **Owner:** CONSUMER, per UIA-KF-172, 179, 200 and 319.
- **Covered by:** UIA-KF-172, 179, 200, 319.

### A2-KE-L3-17 · LOW · Route KF.W13X or BL (per UIA-KF-253) · re-confirmation, amended
- **View:** Clear-all confirm and Keyboard Shortcuts dialogs, 1440, both themes.
- **Finding:** Amendment to UIA-KF-253: after the glass 10 repin, a pointer-opened dialog paints its focus ring on the close ✕. A 50px ringed ✕ becomes the heaviest mark in the header.
- **Evidence:** Frames `keyframes-L3/frames/1440-dark/ov-09-clear-all.png`, `1440-light/ov-08-shortcuts.png`.
- **Cause:** Initial focus goes to the first focusable, and the ring shows on a pointer open.
- **Cure:** Send initial focus to the content or the primary, with no visible ring on a pointer open.
- **Owner:** Per UIA-KF-253: the GLASS dialog initial-focus policy, or CONSUMER onOpenAutoFocus.
- **Covered by:** UIA-KF-253.

## Glass letter rows (to BL)

Rows with a GLASS half, for the one glass letter:

| Row | Sev | Glass file | Ask |
|---|---|---|---|
| A2-KE-L2-1 | BROKEN | `sheet/SheetContent.vue` | Non-modal detented sheet does not outside-dismiss on dock chrome (touch path) |
| A2-KE-L2-2 | BROKEN | `styles/glass/material.css:35-47`, `sheet/styles.css:28-33` | Sheet `position: fixed` wins over `.glass-floating`; add `inset-inline: 0` (SHEET-POSITION) |
| A2-KE-L2-8 | BROKEN | `components/dock` | Collapsed form contains its slot (O-65) |
| A2-KE-L2-3 | HIGH | `sheet/styles.css` | Top-clearance lever capping the top rung |
| A2-KE-L2-6 | HIGH | `dock/styles/controls/touch-floor.css:25-44` | Coarse `::after` hit-slop on `.dock-icon-button--compact` |
| A2-KE-L3-1 | HIGH | `tabs/styles/segmented.css:284,311` | Segmented tab on `--control-text` / `--control-h-*`; drop the <640 caption step |
| A2-KE-L1-25 | MEDIUM | `menu/DropdownMenuItem.vue` | `#leading` / `#description` slots + identity-block recipe |
| A2-KE-L2-7 | MEDIUM | `sheet/SheetContent.vue` | Handle tap steps a rung (UIA-KF-216) |
| A2-KE-L2-9 | MEDIUM | `_shared/field/control.css:112-122` | 16px field floor under coarse pointers |
| A2-KE-L3-2 | MEDIUM | `styles/tokens/sizing.css:35-42` | ui-scaled heading and readout roles |
| A2-KE-L3-4 | MEDIUM | `_shared/field/control.css:103`, `select/SelectTrigger.vue:52` | One resting field material (fold into O-66) |
| A2-KE-L1-8 | MEDIUM | badge | Soft tone (UIA-KF-201, O-59) |
| A2-KE-L1-9 | MEDIUM | `slider` | Draggable marks / lanes rail (UIA-KF-280, O-59) |
| A2-KE-L1-26 | LOW | `aurora/Aurora.vue` | `followPointer` prop owning the touch, reduced-motion and visibility guards |
| A2-KE-L1-27 | LOW | `dialog/DialogContent.vue`, `popover/PopoverContent.vue`, sheet | Ignore outside interactions inside the Toaster |
| A2-KE-L1-28 | LOW | `styles/utilities/base-misc.css` | Ship the `.ios` installer, or key the rule on `@supports` |
| A2-KE-L1-29 | LOW | new `copy-button` | A glass CopyButton |
| A2-KE-L1-22 | LOW | `styles/utilities/base.css:84-90` | Only if the `.focus-ring` equivalence fails |
| A2-KE-L2-12 | LOW | `popover/PopoverContent.vue` | Default collisionPadding 16 (and DropdownMenuContent) |
| A2-KE-L2-13 | LOW | menu | DARK-MENU-ITEM (O-61 R-3) |
| A2-KE-L2-14 | LOW | `styles/typography/scale.css` | 12px micro floor under coarse |
| A2-KE-L2-16 | LOW | `dock/styles/shell.css` | Dock inline cap bounded by the page gutter |
| A2-KE-L2-17 | LOW | dropdown-menu | Overflow scroll fade |
| A2-KE-L3-17 | LOW | dialog | Initial-focus policy on a pointer open (UIA-KF-253), if glass owns it |

## Views skipped (verbatim from the seats)

**Lens 1 seat:**
- All mobile viewports (360/390/430 portrait, 844×390 landscape) and the mobile controls sheet at runtime. That is Lens 2's seat. The sheet branch of ControlsPaneWrapper.vue:153-195 was read in source only.
- Dark theme at runtime. Lens 1 is structural, so no theme frames were taken.
- Runtime of the overlays: @mbabb menu open, Share popover, keyboard-shortcuts dialog, clear-all confirm, CSS paste dialog. These were read in source only; their duplicate guards (A2-KE-L1-27) are cited from source.
- Runtime of the sub-states: the spring discrete/@starting-style view, Matrix Controls, the expanded timeline, the easing detail editor and advanced sub-pane. All were read in source only; the probe captured each route's rest state.
- Runtime of the scene-loading skeleton (App.skeleton.vue). Read in source only.

**Lens 2 seat:**
- CSS paste dialog (Import / Add CSS): not reached, because on touch the sheet cannot be opened (A2-KE-L2-1/-2) and the sim pass did not drive the ribbon's Import
- expanded timeline (transport 'expand timeline' / timeline-expanded): not driven
- keyframes add dialog (KeyframesAddDialog): not driven
- timing-function detail editor ('Edit easing curve' from the Controls surface): not driven
- controls advanced layer panel (blend / z-index / weight section): reached only by scroll in the sim frames, not measured row by row
- cube Matrix controls facet: only offered once the matrix channel is picked; not driven
- spring discrete view toggle: not driven
- toasts: not triggered
- scene loading skeleton (pending-scene window): not captured
- sim-pass sheet surfaces in dark theme: light only (dark covered for the touch path and overlays; the geometry is theme-invariant, so contrast in the open sheet was not read in dark)
- overlays on routes other than /cube: menus, dialogs and selects were read on /cube only
- real iOS safe-area insets and focus-zoom behaviour: Chromium emulation cannot produce insets or iOS zoom; A2-KE-L2-9 and -15 rest on measured font sizes and source

**Lens 3 seat:**
- scene-select listbox (top dock Scene trigger): the harness never reached it at either viewport (ov-10 'not reached'); covered earlier by the dock-scene-select page of UI-AUDIT-keyframes
- transport channel list and Matrix Controls at 390: the transport stays collapsed and the harness could not click the channel trigger
- 390 frames ov-01-timing-function, ov-02-advanced, ov-05-dialog-css: captured, but they are scrollIntoView artifacts (the sheet jumped to y=412, a state users cannot reach, the same class as the prior evidence note ssm3), so they were excluded from findings
- 390 pane content in a real user-reachable expanded state: impossible at HEAD because the sheet cannot rise (A2-KE-L3-14 / UIA-KF-006); judged only on the synthetic lift
- spring discrete 'Entry' view (StartingStyleTarget): not captured
- expanded-timeline state, spring 'Add keyframes' dialog, toasts, and the scene loading skeleton: not captured this pass (all have rows in UI-AUDIT-keyframes)
- 360 and 430 widths and 844x390 landscape: outside this Lens 3 seat's 1440/390 brief (Lens 2 seat scope)
- Clear-all, Share, Shortcuts and @mbabb menu at 390: captured but not examined frame by frame (metrics only)

**Register seat:** it re-measured only the BROKEN and HIGH rows (listed above). It did not re-measure MEDIUM or LOW rows, and carries them as the seats filed them.

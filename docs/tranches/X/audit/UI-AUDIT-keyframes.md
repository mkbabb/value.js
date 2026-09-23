SERVED MODEL: claude-opus-5-5 (Opus 5.5), register seat. Fable was not used, per the owner.

# UI audit: keyframes.js demo

**Date:** 2026-09-23 · **Authority:** `docs/tranches/X/COHESION.md` §0bl · **Seat:** REGISTER (the audit and confirm seats are folded in; nothing was re-captured here)

**Trees.**
- keyframes.js: register-time HEAD `3b1dbd8f` (2 dirty). Capture HEADs were `62ecc324`, `60477b06` and `531aa3f1` (2–27 dirty; other workflows were editing concurrently). Confirm HEADs were `6d5b4288` and `9aa93cae` (2–5 dirty). Every confirm seat re-checked its cited source lines at its own HEAD; line numbers below are the confirmed ones.
- glass-ui: register-time HEAD `6433284a` (5 dirty, v10.0.1). Captures read it at `79c3601b`, `fe5df357`, `b7099ea6` and `6433284a`.
- **Glass version the demo actually runs:** keyframes.js pins `@mkbabb/glass-ui` **7.0.0** (`package.json:78`, node_modules 7.0.0). Every GLASS cite was checked against both the 7.0.0 dist the page serves and glass HEAD source.

**Instrument.** Headed Chromium on the real GPU, driven by Playwright from `value.js/node_modules/playwright`, DPR 2. Viewports 1440x900 and 390x844, light and dark. No MCP browser tools were used. The dev server at `localhost:5173` answered throughout and was never started or stopped by these seats.

**Canon.** glass-ui `DESIGN.md` radius role table, lines 383-395 at `6433284a` (the brief's 385-391 is out of date):
- `--radius-control` (385) is a stadium, for single-line controls only.
- `--radius-field` (386) is 16px, for multi-line fields and steppers.
- `--radius-card` (387) is 16px, for content cards and popovers.
- `--radius-dialog` (388) is 16px.
- `--radius-panel` (389) is 12px.
- `--radius-dock` (393) is a stadium.
- `--radius-tooltip` (395) is 10px.

Also cited: the glass component READMEs, and the keyframes `demo/DESIGN.md` (§3, §7, §8).

**Owner's words (2026-09-23, verbatim):** "this entire UI is god awful, not glass-ui idiomatic, cluttered, and too rounded in some pills. A full UI audit of every page should be done, too. The smooth and bouncy pills, for example are too rounded and should be more card like--mark this and route all glass-ui changes, too to the glass-ui session and agent thereof, to be fixed at the root. And for example, why does this page have an inline keyframes editior and NOT properly leverage our idiom of the cube, amiga, etc of having the keyframes pane separate--ensure that we have cohesion between all animation views, too, and NO one-off instances such as this."

**Evidence root.** All frame paths below are relative to `docs/tranches/X/audit/ui-evidence/keyframes/`. Code paths are relative to `/Users/mkbabb/Programming/keyframes.js/` unless they start with `glass-ui/`, which means `/Users/mkbabb/Programming/glass-ui/`.

## How to read this register

- **Consolidation.** The 29 seats filed 421 findings; the confirm seats added 128 missed items. Many findings are the same defect seen from several pages: the transport over the mobile sheet, the unreachable drawer ribbon, the spring inline editor, the collapsed transport, the glass 7.0.0 pin, vue-sonner, and so on. Each distinct defect is filed once as a `UIA-KF-n` row, and its **Seats** field lists every page that reported it. Every CONFIRMED or AMENDED finding and every substantive confirm-seat miss maps to at least one row. INFO and NOTE items are listed under *Evidence notes*.
- **Severity** is the highest severity a confirm seat upheld. Where a confirm seat downgraded a finding, the downgrade is used.
- **Owner** is the owner after confirmation. There are four values:
  - `GLASS`: the fix belongs at the glass-ui root. Route it to the glass-ui session.
  - `CONSUMER`: the fix belongs in keyframes.js. `CONSUMER (pin)` means the defect is already fixed in glass ≥8/10, and the cure is for keyframes to adopt a current glass version.
  - `GLASS+CONSUMER`: both have work to do.
  - `VALUE.JS`: the fix belongs in the value.js library.
- **Verdict tag.** `[C]` = confirmed as filed, `[A]` = amended (the amended text is used), `[M]` = missed by the audit seat and raised by the confirm seat, `[P]` = plausible, not fully traced.

## Per-page summary

| Page | Findings | Confirmed | Amended | Refuted | Confirm misses | Worst (post-confirm) | Frame folder |
|---|---|---|---|---|---|---|---|
| home-hero | 15 | 13 | 2 | 0 | 5 | BROKEN | `home-hero/` |
| scene-loading-skeleton | 9 | 5 | 4 | 0 | 4 | HIGH | `scene-loading-skeleton/` |
| top-dock | 12 | 6 | 6 | 0 | 4 | HIGH | `top-dock/` |
| dock-scene-select | 10 | 5 | 4 | 1 | 3 | HIGH | `dock-scene-select/` |
| dock-controls-tab-select | 10 | 7 | 3 | 0 | 4 | HIGH | `dock-controls-tab-select/` |
| mbabb-menu | 13 | 11 | 2 | 0 | 5 | BROKEN | `mbabb-menu/` |
| share-popover | 14 | 12 | 2 | 0 | 5 | BROKEN | `share-popover/` |
| keyboard-shortcuts-modal | 10 | 8 | 2 | 0 | 2 | BROKEN | `keyboard-shortcuts-modal/` |
| clear-all-confirm-dialog | 12 | 8 | 4 | 0 | 6 | BROKEN | `clear-all-confirm-dialog/` |
| transport-dock | 15 | 13 | 2 | 0 | 4 | BROKEN | `transport-dock/` |
| cube-scene | 18 | 14 | 4 | 0 | 4 | BROKEN | `cube-scene/` |
| cube-matrix-controls-tab | 14 | 10 | 4 | 0 | 5 | BROKEN | `cube-matrix-controls-tab/` |
| controls-tab-channel-options | 19 | 14 | 5 | 0 | 5 | BROKEN | `controls-tab-channel-options/` |
| controls-timing-function-detail | 12 | 10 | 2 | 0 | 4 | BROKEN | `controls-timing-function-detail/` |
| controls-advanced-layer | 14 | 9 | 5 | 0 | 3 | BROKEN | `controls-advanced-layer/` |
| keyframes-tab-css-editor | 15 | 12 | 3 | 0 | 5 | BROKEN | `keyframes-tab-css-editor/` |
| timeline-tab | 16 | 12 | 4 | 0 | 5 | BROKEN | `timeline-tab/` |
| timeline-expanded | 15 | 11 | 4 | 0 | 3 | BROKEN | `timeline-expanded/` |
| css-paste-dialog | 17 | 12 | 5 | 0 | 5 | BROKEN | `css-paste-dialog/` |
| amiga-scene | 20 | 16 | 4 | 0 | 4 | BROKEN | `amiga-scene/` |
| square-scene | 13 | 10 | 3 | 0 | 5 | BROKEN | `square-scene/` |
| easing-scene-specimens | 17 | 11 | 6 | 0 | 5 | BROKEN | `easing-scene-specimens/` |
| easing-curve-tab | 15 | 14 | 1 | 0 | 5 | BROKEN | `easing-curve-tab/` |
| spring-scene-solver | 16 | 14 | 2 | 0 | 4 | BROKEN | `spring-scene-solver/` |
| spring-physics-tab | 23 | 20 | 3 | 0 | 5 | BROKEN | `spring-physics-tab/` |
| spring-discrete-view | 15 | 9 | 5 | 1 | 5 | BROKEN | `spring-discrete-view/` |
| sequence-scene | 18 | 16 | 2 | 0 | 5 | BROKEN | `sequence-scene/` |
| mobile-controls-drawer | 13 | 10 | 3 | 0 | 5 | BROKEN | `mobile-controls-drawer/` |
| toasts | 11 | 8 | 3 | 0 | 4 | BROKEN | `toasts/` |
| **Total** | **421** | **320** | **99** | **2** | **128** | | |


Note: square-scene also has a page-level cohesion verdict, "(page) No inline keyframes editor; shared pane cohesion" (CONFIRMED). It is not counted as a finding. It is the reference case for row 044.

**Pages not audited.** The brief supplied a "not audited" list of all 29 pages. In fact every one of those 29 has a completed audit seat and a completed confirm seat, so no page is unaudited. The list appears to be the harness's page roster rather than a list of gaps.

**Cross-cutting verdict.** The worst of the demo does not live on any single page. Five things recur everywhere:
1. The mobile controls sheet cannot show its own content, and the transport dock sits on top of what it does show (rows 005 and 006).
2. The spring and easing scenes break the shared per-surface contract (row 008), and spring carries the one-off inline keyframes editor the owner named (row 044).
3. Every toast renders off-screen (row 001).
4. The app runs glass-ui 7.0.0, three majors behind. Roughly 25 of the filed defects are already fixed at glass HEAD (row 048 and the `CONSUMER (pin)` rows).
5. The stadium pill is used on multi-line cells and tiles, where canon calls for a card shape. The root gap is glass: ToggleGroupItem and Input have no tile or card shape (rows 046 and 047).

**Register totals.** BROKEN 43 · HIGH 57 · MEDIUM 121 · LOW 101. That is 322 rows carrying 419 confirmed or amended findings and 115 substantive misses. 53 rows have a glass-ui root and go to the glass-ui session. VALUE.JS owns 1 row (UIA-KF-092).

---

## BROKEN

**UIA-KF-001 · BROKEN · Every toast in the demo renders below the fold and cannot be seen.** [C]
- *Seats:* share-popover, keyframes-tab-css-editor, css-paste-dialog, toasts. Also the confirm-seat misses: the copy-fallback info toast is invisible, and error toasts stack and grow the document.
- *State:* success, info, error and stacked toasts, both viewports, both themes.
- *Frame:* `toasts/11-FULLPAGE-error-1440.png`, `toasts/01-success-copy-1440-light.png`, `share-popover/02f-copied-toast-FULLPAGE-1440-dark.png`, `toasts/probe-position.json`.
- *Observed:* The toaster `<ol data-sonner-toaster>` computes `position:static`, sits after `<body>`, and matches 0 sonner CSS rules. Toasts land at y=900 (1440) and y=844 (390). `html` and `body` are `overflow:hidden`, so the toasts can't be scrolled to. The aria-live region still announces them, so screen-reader users hear feedback that sighted users never see. Toasts that never show: Copy, Format, Export CSS, share copy/restore/error, the clipboard fallback, and the Retry action.
- *Expected:* Toasts fixed on the `--z-toast` layer, using the glass `<Toaster>`, which ships in the installed 7.0.0 (`dist/toast.js`, `ToastPortal` + `fixed top-0 z-toast`).
- *Owner:* CONSUMER, `demo/components/instrument/transport/components/DemoGlobalChrome.vue:27-58` (vue-sonner `<Toaster unstyled>` teleported to `html`; no `vue-sonner/style.css` import anywhere).
- *Fix:* Mount the glass `<Toaster>` once at the App root. Port every `toast.*` call site: clipboard.ts, useShareState.ts, CSSCodeEditor.vue:426, KeyframesStringControls.vue, useKeyframeOps.ts, useTimeline*.ts, KeyframesEditor.vue. Re-key `utils/toastGuard.ts` to `[data-slot=toast]`. Remove `vue-sonner` from package.json:118. Do not just import sonner's stylesheet: see rows 221, 218 and 322.

**UIA-KF-002 · BROKEN · The toaster is remounted on every scene switch, so a cross-scene share restore shows no feedback.** [C][M]
- *Seats:* share-popover.
- *State:* restore success when the link's scene differs from the current one (amiga → cube).
- *Frame:* `share-popover/03f-restore-success-FULLPAGE-1440-light.png`, `share-popover/probe-toast-1440-light.json` (P2: 0 toasts; P3 same-scene: 1 toast).
- *Observed:* The Toaster lives inside `<AnimationControlsGroup :key="superKey">` (`EditorShell.vue:78-79` → `AnimationControlsGroup.vue:144` → DemoGlobalChrome). Every scene switch tears it down, and `onSceneRestore` fires before `toast.success`. Any toast in flight at a scene switch is lost.
- *Expected:* A document-level singleton that survives the scene switch.
- *Owner:* CONSUMER.
- *Fix:* Hoist the glass Toaster to App.vue (this lands together with row 001). Emit the restore toast after `runSceneSwitch` resolves.

**UIA-KF-003 · BROKEN · Loading a non-state share payload reports "State restored!".** [C]
- *Seats:* share-popover.
- *State:* load-from-hash with valid base64 that is not a state object (`MTIz`, which decodes to 123).
- *Frame:* `share-popover/06f-probe-nonstate-json-FULLPAGE-1440-light.png`.
- *Observed:* The decode is truthy, `restoreStateFromParam` returns `{restored:false}` (`state/hashSharing.ts:57`), and the UI still toasts success and closes the popover.
- *Expected:* An invalid payload reports invalid and keeps the field open.
- *Owner:* CONSUMER, `demo/components/instrument/shell/useShareState.ts:69-86`.
- *Fix:* Branch on `result.restored`. Fold decode, validate and apply into one call so the UI cannot disagree with the store.

**UIA-KF-004 · BROKEN · A channel picked from the home transport list is thrown away; the app plays Rotations on #/cube instead.** [C]
- *Seats:* home-hero.
- *State:* first load → open the ☰ list → pick Matrix or Hover.
- *Frame:* `home-hero/14-home-pick-Matrix-1440-light.png`, `home-hero/confirm/c-pick-matrix-light.png`.
- *Observed:* The pick is written to the HOME storedControls. The home→cube intercept carries no selection, so cube plays Rotations.
- *Expected:* The picked channel is the one that plays, or home offers no list.
- *Owner:* CONSUMER, `demo/components/instrument/transport/AnimationControlsGroup/useAnimationGroupPlayback.ts:80-89` and `demo/app/scene/useSceneMachineShellBinding.ts:245-255`.
- *Fix:* Write `getStoredAnimationGroupControlOptions(CUBE).selectedAnimation` before NAVIGATE, or drop the list on home (see row 229).

**UIA-KF-005 · BROKEN · At 390 the transport dock covers the controls sheet's content and takes its taps, at every detent and on every scene.** [C][A]
- *Seats:* home-hero, scene-loading-skeleton, transport-dock, cube-scene, cube-matrix-controls-tab, dock-controls-tab-select, controls-tab-channel-options, controls-advanced-layer, keyframes-tab-css-editor, timeline-tab, timeline-expanded, amiga-scene, square-scene, spring-scene-solver, spring-physics-tab, spring-discrete-view, mobile-controls-drawer.
- *State:* 390 peek, expanded, and transport hover, in light and dark.
- *Frame:* `mobile-controls-drawer/13c-crop-bottom-390-light.png`, `mobile-controls-drawer/zoom-02b-collapsed-transport-390-light.png`, `transport-dock/60-square-390-sheet-geometry-light.png`, `cube-matrix-controls-tab/13-drawer-keys-full-390-light.png`, `controls-advanced-layer/03-amiga-advanced-pane-390-light.png`, `timeline-expanded/P3-expanded-selected-390-dark.png`, `probe-hit.json`.
- *Observed:* The transport pill (y 729-785) sits inside the sheet's visible band. It covers the duration row ("du…" cut off), the matrix Ty/Tz cells (a hit test at their centres returns the dock), the enabled switch, fill mode, the heatmap axis, code lines 1-2 and the timeline ticks. `--drawer-inset-block-end` shortens the 772px box, but under the translate model the box is only moved up, so the dock band still falls inside the visible band.
- *Expected:* A live-behind sheet never has persistent chrome over its content. The sheet's block-end edge sits above the dock band, or the transport docks into the sheet.
- *Owner:* GLASS+CONSUMER. CONSUMER: `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue:117-151` and `TransportDock.vue:2-9`. GLASS: the glass-10 detented Sheet has no block-end dock-band reserve lever (`glass-ui/src/components/sheet/styles.css:86-93` puts the sheet at `z-dock - 1`, which makes dock-over-content the designed outcome).
- *Fix:* GLASS: give the detented bottom Sheet a documented dock-band reserve that shortens the sized region, not the translate. CONSUMER: bind that reserve to `--dock-band-reserve-stable` after migrating to glass-10 SheetContent, or seat the transport in the sheet header or footer below lg. Gate: a hit test at the centre of every sheet field returns the field.

**UIA-KF-006 · BROKEN · At 390 the controls sheet's content below the fold can never be reached; the ribbon is never on screen.** [C][A]
- *Seats:* mobile-controls-drawer, controls-tab-channel-options, controls-advanced-layer, cube-matrix-controls-tab, keyframes-tab-css-editor, timeline-tab, timeline-expanded, css-paste-dialog, easing-scene-specimens, easing-curve-tab, spring-scene-solver. Also the confirm-seat miss: the pane's ribbon actions exist on desktop but not on mobile.
- *State:* every detent (0.12 / 0.36 / 0.62), every tab, light and dark.
- *Frame:* `mobile-controls-drawer/02b-cube-expanded-toggle-390-light.png` (and 03, which is identical), `controls-advanced-layer/probe390-after-drag.png`, `css-paste-dialog/confirm/c1-390-expanded-light.png`, `spring-scene-solver/probe5-390-wheel-bottom.png`, `easing-scene-specimens/confirm/c03*`.
- *Observed:* The sheet is a 772px box translated down; its bottom sits at y 1065-1451 on an 844px viewport. `.controls-pane` is `overflow-y:auto`, but its height is not bounded (scrollHeight equals clientHeight at 727), so it never scrolls. The nested ChannelControls region scrolls on spring but ends below the fold. The RibbonBar sits after the scroller as `flex-shrink-0` and is never visible: Play/Reverse, Copy/Format/Export/Apply CSS, Snapshot/Import/Export/Add CSS, Re-seat, and the easing preview toggle are all out of reach. Timeline Import and Add CSS can only be opened with the keyboard. At 0.36 on cube, 10 of 16 controls are off-screen.
- *Expected:* Every control is reachable at every detent, and primary actions sit on the visible edge. The glass-10 sheet docs name this exact translate-model defect (`glass-ui/src/components/sheet/styles.css:36-47`).
- *Owner:* CONSUMER, `ControlsPaneWrapper.vue:117-151, 356-377`, `ControlsPaneWrapper.css:44-50`, and `ChannelControls.vue:33,56`. The root is already cured by glass 10 `SheetContent` detents (glass 10 has no Drawer export).
- *Fix:* At the glass-10 repin (KF.W13R), move to `SheetContent` with `useSheetDetents` and a block-size-sized `auto minmax(0,1fr)` region. Collapse the nested scrollers into one. Pin the RibbonBar as the region's footer. Until then, bound the pane to the visible detent (`max-block-size = visible snap − dock band`).

**UIA-KF-007 · BROKEN · At 1440 on spring and easing, the desktop rail is not height-bounded, so the ribbon and the Keyframes action bar fall off-screen and the wheel scrolls nothing.** [C][M]
- *Seats:* spring-scene-solver, keyframes-tab-css-editor, easing-curve-tab. Also the confirm-seat miss: the Keyframes bar is below the fold. Related: spring-physics-tab, where the document scrolls with the rail (row 101).
- *State:* rest, Keyframes tab, Physics and Curve surfaces.
- *Frame:* `spring-scene-solver/probe3-wheel-panel.png`, `spring-scene-solver/00-load-rest-1440-light.png`, `keyframes-tab-css-editor/20-easing-keyframes-1440-light.png`, `easing-curve-tab/C-keyframes-surface-1440-light.png`.
- *Observed:* The spring pane is 1401-1745px tall inside a 900px shell. Play/Reverse/Re-seat sit at y 1245-1421. The easing pane is 927px tall, with Apply CSS at y 911. The inner scroller has scrollHeight equal to clientHeight, and the wheel moves nothing.
- *Expected:* The rail track is bounded to the stage row and scrolls internally (as on cube and amiga).
- *Owner:* CONSUMER, `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue:40-45,161` and `AnimationControlsGroup.css:199`. Made worse by row 008.
- *Fix:* Give `.controls-pane-wrapper` and `.controls-pane` `min-height:0` and `max-height:100%` of the stage row, so the existing `overflow-y-auto` engages. Pin RibbonBar below the scroller.

**UIA-KF-008 · BROKEN · The easing and spring scene facets are not gated to their own surface: Curve and Physics render under the Controls, Keyframes and Timeline tabs.** [C][A]
- *Seats:* keyframes-tab-css-editor, timeline-tab, easing-scene-specimens, easing-curve-tab, spring-scene-solver, spring-physics-tab, mobile-controls-drawer. Also the confirm-seat misses: stale single-surface comments in both scenes.
- *State:* dock "Controls tab" set to Controls, Keyframes or Timeline.
- *Frame:* `spring-physics-tab/11c-tab-timeline-1440-light.png` (the dock says Timeline; the rail shows Physics; the timeline pane is 0px tall), `easing-curve-tab/C-keyframes-surface-1440-light.png` (the Curve card is wedged between Monaco and its action bar), `mobile-controls-drawer/24-spring-tab-timeline-390-light.png`, `keyframes-tab-css-editor/20-spring-keyframes-1440-light.png`.
- *Observed:* `tabsContent = () => h(SpringPhysicsFacet)` and `() => h(EasingSidebar)` are ungated. On the spring Keyframes tab this puts two keyframes editors on one surface. The comments in both scenes still claim a single valid surface, but `controlSurfaces.ts:107-119` unions Controls/Keyframes/Timeline onto both scenes.
- *Expected:* Each tab shows exactly its own surface (`ChannelControls.vue:155-161`: "the scene gates its own body on the active surface"), as on cube (`CubeScene.vue:132-133`).
- *Owner:* CONSUMER, `demo/scenes/spring/SpringScene.vue:118-128` and `demo/scenes/easing/EasingScene.vue:24-28, 52-62`.
- *Fix:* Gate on `selectedControl === 'spring' | 'easing'`, or better, render facets centrally as surface panels from SURFACE_META so no scene can forget. Delete the stale comments. Add a test that switching tabs unmounts the facet.

**UIA-KF-009 · BROKEN · The Controls panel shows store defaults (5s, alternate, ease-in-out) while the engine runs each scene's authored options.** [C][A]
- *Seats:* amiga-scene, square-scene, easing-scene-specimens, easing-curve-tab.
- *State:* any channel, fresh load.
- *Frame:* `amiga-scene/00-load-idle-1440-light.png` vs `amiga-scene/08-keyframes-tab-1440-light.png`; `square-scene/00-idle-box-1440-light.png` vs `07c-tab-keyframes-1440-light.png`; `easing-curve-tab/C-controls-surface-1440-light.png` (5s/ease-in-out above a 1500/ease Curve card).
- *Observed:*
  - Amiga shows 5s, alternate and ease-in-out for all three channels, while the engine runs 8000ms/1600ms normal (a measured ~8s X period).
  - Square shows 5s/alternate while it runs 2000ms/normal. Its options are in `squareMotion.ts:20-24`, and editing the panel field does drive the animation.
  - Easing shows 5s/ease-in-out while Curve and the CSS both say 1500ms/ease, so two duration controls and two easing controls disagree.
- *Expected:* The readout is current state (`demo/DESIGN.md` §3). There is one authoring seam.
- *Owner:* CONSUMER, `demo/state/animationOptionsStore.ts:40-50, 105-111` (getStoredAnimationOptions clones the defaults) and `ChannelOptions.vue:65-68`.
- *Fix:* Seed each channel's stored options from its animation's authored options on first read, so the options card reads and writes `animation.options`. Check the same seam on cube and spring.

**UIA-KF-010 · BROKEN · The Controls panel overwrites each amiga channel's authored easing on mount (the linear X sweep and Y's gravity easing become ease-in-out).** [C]
- *Seats:* amiga-scene.
- *State:* Boing ball bouncing, fresh load, with the channel select never touched.
- *Frame:* `amiga-scene/probe3.out` (xTrace S-curve: 4.967 → 4.997 → 4.999 near the wall), `amiga-scene/08-keyframes-tab-1440-light.png`.
- *Observed:* `onMounted` → `updateTimingFunctionFromName(stored default)` → `setAnimationTimingFunction` stamps ease-in-out on every frame.
- *Expected:* The authored linear and per-segment FALL/RISE easings survive (`useAmigaDemo.ts:246, 263, 289-298`).
- *Owner:* CONSUMER, `demo/components/instrument/transport/channel-controls/ChannelOptions.vue:931-939` and `composables/useTimingFunctionEditor.ts:135-153`.
- *Fix:* Never re-apply a store default over an authored easing on mount; apply it only on a user edit. This shares a root with row 009.

**UIA-KF-011 · BROKEN · Any edit or Format in the CSS editor rewrites `animation-duration: 5s` to `5ms`, a 1000x speed-up.** [A]
- *Seats:* keyframes-tab-css-editor.
- *State:* ready editor → Format, or type one space.
- *Frame:* `keyframes-tab-css-editor/06-format-toast-1440-dark-crop.png`, `probe-parse-log.json` (clipA 5s → clipB 5ms), `16-garbage-after-1440-light.png`.
- *Observed:* value.js `collectAnimationOptions` returns seconds (`src/css/rules.ts:115, 478`). The keyframes adapter passes them through unscaled, so 5 is taken as 5 ms. Easing (1.5) and spring (1.4) are corrupted the same way.
- *Expected:* parse → serialize is value-stable.
- *Owner:* CONSUMER, `demo/components/instrument/keyframes/utils/parseAnimationCSS.ts:44-53`. There is also a cross-repo unit contract to write down: value.js CSSAnimationOptions are in seconds, keyframes works in ms.
- *Fix:* Multiply duration and delay by 1000 in the adapter. Add a round-trip test over {5s, 1500ms, 0.25s}. Also see row 177 on unit preservation.

**UIA-KF-012 · BROKEN · The CSS editor has no reachable parse-error state: malformed CSS toasts "Keyframes parsed 🎉".** [A]
- *Seats:* keyframes-tab-css-editor.
- *State:* the buffer is `rotate( ; )`, or has trailing junk.
- *Frame:* `keyframes-tab-css-editor/23-hardfail-settled-1440-light.png`, `probe-hardfail-log.json` (0 markers, no shake).
- *Observed:* The engine's spec-faithful error recovery drops the bad declaration silently. The adapter rejects only PARSE_ERROR and ignores EMPTY_PARSE, and success is toasted even when nothing was adopted. The stage animation is unchanged, yet the success message still fires.
- *Expected:* An editor-strict mode: rejection shows a marker at the source, a glass Alert, and the shake.
- *Owner:* CONSUMER, `demo/components/instrument/keyframes/utils/parseAnimationCSS.ts:32-38` and `KeyframesStringControls.vue:140-157`. The keyframes library also needs a diagnostic that reports dropped declarations with their ranges.
- *Fix:* Treat EMPTY_PARSE and dropped-declaration diagnostics as rejections, and map them to `monaco.editor.setModelMarkers`. Toast success only when adoption actually changed the animation. Do not force full-input consumption in the engine, which would contradict its recovery policy.

**UIA-KF-013 · BROKEN · An invalid-value error stays on the field after the user restores the original value.** [A]
- *Seats:* controls-tab-channel-options.
- *State:* type `abc` + Enter, then type the persisted `5s` + Enter.
- *Frame:* `controls-tab-channel-options/R2-invalid-sticks-after-restoring-5s-1440-light.png`, `repro-log.json`.
- *Observed:* The field shows a valid 5s with a red ring and the 4-line error. The error clears only when a *different* value is committed. The same bug affects the duration, delay and iterations fields.
- *Expected:* The error state follows the field's current content.
- *Owner:* CONSUMER, `ChannelOptions.vue:87/110/151` (error templates) and `:820-838` (commitOption clears only inside a commit).
- *Fix:* Clear `invalidField` on input, or when the draft equals the persisted value, on all three rows.

**UIA-KF-014 · BROKEN · Modal dialogs do not own the keyboard: Esc on a dialog also stops and resets the animation, and shortcut keys act behind the scrim.** [C][M]
- *Seats:* clear-all-confirm-dialog, keyboard-shortcuts-modal. Also the confirm-seat miss: Esc resets the animation. The confirm seat inferred the same leak for CSSPasteDialog.
- *State:* dialog open, with Esc, Space or 3 pressed.
- *Frame:* `clear-all-confirm-dialog/09-escape-leak-transport-1440-light-compare.png`, `keyboard-shortcuts-modal/07-open-question-cube-1440-light.png` → `08-after-escape-cube-1440-light.png`, `keyboard-shortcuts-modal/11-wheel-end-cube-1440-light.png` ("3" switched the panel under the scrim).
- *Observed:* The 7.0.0 `dist/keyboard.js:76` window listener has no modal gate. Esc (`registerShortcut('Escape', reset)`) fires together with the dialog dismiss. Delete, Space and 3 are live behind the scrim.
- *Expected:* While a modal is open, its scope owns the keyboard.
- *Owner:* CONSUMER (pin). This is cured at glass HEAD: `DialogContent.vue:17,77` `useModalShortcutBarrier` → `_shared/overlay/shortcuts.ts:24` suspendShortcuts. Consumer binding: `useControlsKeyboardShortcuts.ts:91`.
- *Fix:* Adopt glass ≥ HEAD. Do not hand-roll a document capture listener. Verify: with the scene playing, open each dialog and press Esc; the transport must stay on Pause.

**UIA-KF-015 · BROKEN · Pressing Esc to close a Select (not a dialog) also fires the global "Stop animation" shortcut.** [A]
- *Seats:* controls-tab-channel-options, square-scene (the Esc from closing the Controls-tab select also triggered Stop; plausible, not isolated).
- *State:* easing or direction Select open → Esc.
- *Frame:* `controls-tab-channel-options/R1-escape-from-select-stops-playback-1440-light.png`, `repro-log.json` (Pause → Play).
- *Observed:* reka-ui `DismissableLayer.js:72-76` emits dismiss on Esc without calling `preventDefault`. The glass registry's window listener is registered first, so it runs first. HEAD's `defaultPrevented` guard (`useKeyboardShortcuts.ts:298`) would not catch this event.
- *Expected:* An Esc that closes an overlay is consumed by that overlay.
- *Owner:* GLASS+CONSUMER. GLASS: keyboard registry plus Select/Popover (`glass-ui/src/components/keyboard/useKeyboardShortcuts.ts:298-317`). CONSUMER: `useControlsKeyboardShortcuts.ts:91`.
- *Fix:* GLASS: skip global Esc shortcuts while a reka dismissable layer is mounted, or have Select and Popover push a claim onto the LIFO stack while open. CONSUMER interim: guard on `document.querySelector('[data-reka-popper-content-wrapper],[role=dialog][data-state=open]')`. A `defaultPrevented` check is dead weight here.

**UIA-KF-016 · BROKEN · The keyboard-shortcuts dialog becomes a second scroller: wheeling past the list's end scrolls the header and close button away and leaves the plate about 70% empty.** [C]
- *Seats:* keyboard-shortcuts-modal.
- *State:* scrolled to the end with the wheel, 1440 and 390.
- *Frame:* `keyboard-shortcuts-modal/11-wheel-end-cube-1440-light.png`, `probe-log.json` (dialog scrollHeight 1220 vs 689 client).
- *Observed:* The 22 absolutely positioned sr-only spans have DialogContent as their containing block, because the FadingScroll port is static. They inflate the dialog's scroll height, and the `scroll` prop sets `overflow-y:auto`.
- *Expected:* The port is the only scroller (FadingScroll README: "The root IS the scroll port").
- *Owner:* GLASS+CONSUMER. CONSUMER: `demo/components/instrument/shell/KeyboardShortcutsModal.vue:81, 227`. GLASS rider: the `.fading-scroll` root sets no `position` and no `overscroll-behavior` (`base-misc.css`).
- *Fix:* Add `relative` on the FadingScroll. GLASS: give the `.fading-scroll` root `position:relative; overscroll-behavior:contain`.

**UIA-KF-017 · BROKEN · The Share and Dark mode rows in the @mbabb menu can't be used from the keyboard or by clicking the row; only the 28px glyph works.** [A]
- *Seats:* mbabb-menu, share-popover (the dead-row part).
- *State:* dropdown open; Enter or Space, or a click on the row label.
- *Frame:* `mbabb-menu/13-kbd-share-enter-1440-light.png`, `mbabb-menu/probe-keyboard.json`, `mbabb-menu/10-darkrow-rowclick-*-crop.png`.
- *Observed:* Both rows are menuitems with `@select.prevent` and no handler, each wrapping a nested button (WAI-ARIA forbids interactive content in a menuitem). The uncommitted d4 edit wires Share's row select to `openShare`, which is in flight. Dark mode stays inert on purpose (`MbabbMenu.vue:73-76`, O-61 R-3).
- *Expected:* A menuitem's own select runs its command.
- *Owner:* CONSUMER, `demo/app/dock/MbabbMenu.vue:50-58, 66-78`. No glass change is needed: `useGlobalDark` and `toggleDark` are exported on `@mkbabb/glass-ui/dark` (glass `src/index.ts:30`).
- *Fix:* Make Dark mode a `DropdownMenuCheckboxItem` bound to `isDark` with `@select=toggleDark`. Share: see row 056. Re-probe `probe-keyboard.mjs` after d4 commits.

**UIA-KF-018 · BROKEN · Tabbing into the collapsed transport sends focus to `<body>`, so Select animation and Reset are never reachable by Tab.** [A]
- *Seats:* transport-dock.
- *State:* collapsed after hover-leave, then a keyboard Tab walk.
- *Frame:* `transport-dock/probe-focus.txt` (tab12 lands on an [INERT] control; 200ms later focus is on BODY), `41-cube-kbd-entry-1440-light.png`, `42-cube-kbd-next-1440-light.png`.
- *Observed:* The focusable Play sits in `#collapsed`. The 7.0.0 root `onFocusin` expands the dock (`dist/dock.js:804`), the summary goes inert (`:833-841`), and focus is dropped. At glass HEAD the summary is a `role=button` disclosure with `@focusin.stop` (`GlassDock.vue:476-491`), which would make the consumer's Play a nested interactive element.
- *Expected:* A complete focus-visible path through the dock (dock README, Interaction contracts).
- *Owner:* CONSUMER (the load-bearing part), `TransportDock.vue:197-224`. GLASS is secondary: repin.
- *Fix:* Move Play into GlassDock's `#persistent` slot (present in 7.0.0) so `#collapsed` holds no focusable control. This also retires KFA-7/13/189. Repin, then re-run the Tab walk.

**UIA-KF-019 · BROKEN · The expanded timeline mounts one timeline per channel host (3 on cube), stacked and clipped, and Tab walks into the hidden channels' timelines.** [C][A]
- *Seats:* timeline-tab, timeline-expanded. The per-host multiplication of timelines and histories (LOW) is folded in here.
- *State:* expanded, 1440 and 390.
- *Frame:* `timeline-expanded/P2-expanded-populated-1440-light.png`, `timeline-tab/42-expanded-settled-1440-light.png`, `timeline-tab/probe-expand.json` (3 stages; 1495/526 overflow), `timeline-expanded/P4-after-tab-walk-390-*.png`.
- *Observed:* The Teleport is disabled only on `!isTimelineExpanded` and is not gated on `active`. `v-show` on the host wrapper does not hide teleported content.
- *Expected:* One timeline, the active channel's.
- *Owner:* CONSUMER, `ChannelControls.vue:167-181, 341-343` and `ControlsPaneWrapper.vue:50-54`.
- *Fix:* Gate the teleport on `props.active`, or lift one timeline to layout level, bound to the selected channel.

**UIA-KF-020 · BROKEN · At 1440 the expanded timeline cell covers the ribbon, so Snapshot, Import, Export and Add CSS can't be clicked.** [C]
- *Seats:* timeline-expanded.
- *State:* expanded, empty and populated.
- *Frame:* `timeline-expanded/01-expanded-empty-1440-light.png`, `P2-expanded-populated-1440-light.png`.
- *Observed:* The cell (`z-dock`, grid-row `bottom`) paints over the pane's overflowing ribbon. `elementFromPoint` at each ribbon button's centre hits the timeline. The empty-state copy tells the user to press Snapshot or Import anyway.
- *Expected:* The expanded surface never stacks over live controls.
- *Owner:* CONSUMER, `AnimationControlsGroup.vue:94-101` and `AnimationControlsGroup.css:219-222`.
- *Fix:* Carry the ribbon into the expanded surface, or stop the pane overflowing into the bottom row (drop the placeholder; see row 061).

**UIA-KF-021 · BROKEN · The expanded timeline cell clips the selected keyframe's label row and editor.** [C]
- *Seats:* timeline-expanded.
- *State:* expanded + a keyframe selected, 1440 and 390.
- *Frame:* `timeline-expanded/P3-expanded-selected-1440-dark.png`, `P3-expanded-selected-390-dark.png`.
- *Observed:* The cell's scroll height is 1826 against 538, with `overflow:hidden` and max-h `--panel-max-h`. The editor shows as a 20px sliver.
- *Expected:* The detail is reachable (a scrolling region).
- *Owner:* CONSUMER, `AnimationControlsGroup.vue:96-100`.
- *Fix:* Make the surface `overflow-y:auto` with the house scroll fade, or remove the inline editor (row 045).

**UIA-KF-022 · BROKEN · The timeline hover preview always fails and prints a raw html2canvas exception.** [C]
- *Seats:* timeline-tab.
- *State:* hovering a populated keyframe diamond, both themes.
- *Frame:* `timeline-tab/09-hover-preview-1440-light.png`, `09-hover-preview-1440-dark.png`.
- *Observed:* The tooltip reads "Preview unavailable — Attempting to parse an unsupported color function "color"" on every hover, over 4 lines. It also covers the card's own toolbar and tick labels (a confirm-seat miss).
- *Expected:* The keyframe's pose, or a quiet ghost fallback, with no exception text shown.
- *Owner:* CONSUMER, `demo/components/instrument/timeline/composables/useTimelineBuild.ts:232-236` and `components/TimelineHoverPreview.vue:266, 405`.
- *Fix:* Render the preview from the preview subject (clone + vars), not with html2canvas. Keep failure silent. Open the tooltip away from the toolbar.

**UIA-KF-023 · BROKEN · Amiga's Reset jumps X and spin to 0 but strands Y mid-air, and no stop path ever settles the ball home.** [C][A]
- *Seats:* amiga-scene. The Pause-freeze finding, downgraded by its confirm seat to MEDIUM, shares this root and is folded in here.
- *State:* Reset while playing; Pause mid-flight.
- *Frame:* `amiga-scene/05a-reset-settle-60ms-1440-light.png`, `05c-reset-rest-1440-light.png`, `p3-after-reset-3s-1440-light.png`, `04-paused-midflight-1440-light.png`, `probe3.out`.
- *Observed:* py holds at −1.8 to −3.5 for more than 3s after Reset. `poseMoved()` counts the facility's own reset or pause pose write as a scrub, so `authority='pose'` wins and the `wasPlaying ? 'home'` HOME seam at `AmigaScene.vue:343` never fires. The next drag at the stage centre then misses the stranded ball and orbits the camera instead.
- *Expected:* A stop hands the pose to HOME, and the springs carry it back (the continuity-lanes doc; T.A8).
- *Owner:* CONSUMER, `demo/scenes/amiga/AmigaScene.vue:303-306, 337-374`.
- *Fix:* Exclude facility-issued writes from scrub detection. Seed all three lanes toward `SPHERE_HOME` on stop. Decide which control owns "settle to home".

**UIA-KF-024 · BROKEN · The keyboard focus ring never paints on the scene subject (the amiga canvas, the square drag box).** [C]
- *Seats:* amiga-scene, square-scene.
- *State:* focus-visible, reached by a real Tab walk.
- *Frame:* `amiga-scene/p3-tab-focus-canvas-1440-light.png`, `square-scene/q1-tab-focus-box-crop-1440-light.png`, `square-scene/q1-tab-focus-box-1440-dark.png`.
- *Observed:* A scoped `box-shadow` rule has the same (0,2,0) specificity as `.kf-focus-ring:focus-visible` (`demo/styles/design-idioms.css:106-109`) and wins on source order. The hairline or halo replaces the ring, and outline is none.
- *Expected:* A visible indicator (WCAG 2.4.7) in the kf-focus-ring idiom.
- *Owner:* CONSUMER, `demo/scenes/amiga/AmigaScene.vue:590` and `demo/scenes/square/SquareScene.css:106-108`.
- *Fix:* Compose the ring into a `:focus-visible` shadow stack, or move the halo to an outline or `::after`. For amiga, dropping the stage hairline (row 194) also fixes it.

**UIA-KF-025 · BROKEN · Glass 7.0.0 buttons lose their focus ring: quiet/icon-only buttons and the destructive primary show no keyboard focus.** [C][A]
- *Seats:* spring-discrete-view (Copy; BROKEN), share-popover (Copy/Load), controls-timing-function-detail (Back/pencil), controls-advanced-layer (Back), clear-all-confirm-dialog ("Clear & reload").
- *State:* keyboard focus.
- *Frame:* `spring-discrete-view/06b-kbd-focus-next-1440-light.png`, `share-popover/01b-tab1-1440-light-crop.png`, `controls-timing-function-detail/07-back-focus-visible-1440-light-crop.png`, `controls-advanced-layer/11-back-kbd-focus-zoom-1440-light.png`, `clear-all-confirm-dialog/03-tab1-1440-dark-crop.png`.
- *Observed:* In 7.0.0, `.focus-ring:focus-visible` paints with `box-shadow` and `outline:none`. `.button[data-emphasis=quiet]{box-shadow:none}`, and the destructive primary's own drop shadow, replace it. KF-CO-46 moves focus onto these very controls on every open and close. The discrete-view artifact `<code>` region is a separate CONSUMER case: its scoped `:focus-visible` outline computes to `none`.
- *Expected:* Every focusable control shows the house ring (DESIGN.md:13).
- *Owner:* CONSUMER (pin). Cured at glass HEAD `src/styles/utilities/base.css:144`, which paints the ring as an outline (v8.0.0+, `70dc0f06`/`bca22bd9`). Also CONSUMER: `demo/scenes/spring/StartingStyleTarget.vue:332-335`.
- *Fix:* Repin and re-verify on quiet icon-only buttons and the destructive primary. Put `kf-focus-ring` on the artifact region.

**UIA-KF-026 · BROKEN · On the square scene, Esc/Reset leaves the scene out of sync: magenta 0% frame, badge stuck on "tracking", the scrubber disagrees, and Home jumps back to the old pose.** [A]
- *Seats:* square-scene.
- *State:* Play → drag takeover → Esc.
- *Frame:* `square-scene/q2-after-escape-stuck-tracking-1440-light.png`, `q3-after-home-1440-light.png`, `probe2.json`.
- *Observed:* `reset()` stops the group, but the square never reseats its springs. The FSM stays `tracking`, the scrubber sits at about 75%, and Home restores −90° and magenta. The confirm seat notes the tether stays at opacity 1 but is zero-length, and that Home's two handlers (element-scoped and global) are not isolated from each other.
- *Expected:* Reset returns the scene to its rest identity (teal, 0,0, settled).
- *Owner:* CONSUMER, `demo/scenes/square/SquareScene.vue:196-236, 322-327` and `useAnimationGroupActions.ts:55-61`.
- *Fix:* Subscribe the scene to the group's reset (reseat + paintRest + settle). Consider making the tour's 0% stop the rest identity.

**UIA-KF-027 · BROKEN · While the cube autoplays on entry, orbit drag, wheel and pinch do nothing, and the swallowed gesture jumps in when paused.** [A]
- *Seats:* cube-scene.
- *State:* idle autoplay on entry, 1440 and 390 touch.
- *Frame:* `cube-scene/14a-autoplay-after-drag-1440-light.png`, `12b-touch-orbit-mid-390touch-light.png`, `autoplay-drag-probe.json`.
- *Observed:* The container-transform gate reads `isPlaying || isStarted`. `isPlaying` has no writer, and the autoPlays dispatch never sets `isStarted`.
- *Expected:* The gesture acts in every playback state.
- *Owner:* CONSUMER, `demo/scenes/cube/CubeTarget.vue:15` and `CubeScene.vue:61-71, 215-219`.
- *Fix:* Read one playing-state authority that the autoplay dispatch also sets, or give the orbit its own element.

**UIA-KF-028 · BROKEN · The Matrix Controls Fixed/Free toggle does nothing but flip its label.** [C]
- *Seats:* cube-matrix-controls-tab.
- *State:* fixed vs free.
- *Frame:* `cube-matrix-controls-tab/06-toggle-hover-1440-light.png`, `07-toggle-flipped-1440-light.png`, `08-flipped-edit-Sx-1.5-1440-light.png`.
- *Observed:* `matrixOptions.fixed` is written and never read. The label names the action rather than the state, and there is no `aria-pressed`.
- *Expected:* Every control does something. A toggle shows its state (DESIGN.md:13, :604).
- *Owner:* CONSUMER, `demo/scenes/cube/CubeScene.vue:151-160`, `demo/state/controlOptionsStore.ts:38-41`, `MatrixEditor.vue:135-140`.
- *Fix:* Delete it, or give it a real meaning and render it as a pressed glass Button or a 2-item ToggleGroup.

**UIA-KF-029 · BROKEN · Sequence balls rest off their start handles, and the scale-pop shifts their position for the whole glide.** [A]
- *Seats:* sequence-scene.
- *State:* at rest, playing and scrubbing, both viewports.
- *Frame:* `sequence-scene/00c-card-crop-1440-light.png`, `03a-playing-650ms-1440-light.png`, `capture-log.json` (handle 553 vs ball 531).
- *Observed:* The engine's individual `scale` property multiplies the `translateX` positioning, so at rest the ball sits at 0.7x its gate (up to 90px off). Example of the drift: row 2 runs 50px ahead at 70%. The spring also drives `--ball-p` above 1.
- *Expected:* The centre is at `f*100cqw` (`SequenceTarget.css:229-237`).
- *Owner:* CONSUMER, `demo/scenes/sequence/SequenceTarget.css:239` and `sequenceMotion.ts:30-32`.
- *Fix:* Position with the `translate:` property, or scale an inner child. Clamp or tolerate p>1. Gate: |handle−ball| ≤ 1px at p=0.

**UIA-KF-030 · BROKEN · The sequence master playhead covers only the ruler strip and runs 16px past the track end.** [C]
- *Seats:* sequence-scene.
- *State:* playing, scrubbing, end.
- *Frame:* `sequence-scene/03c-played-end-1440-light.png`, `07a-scrub-drag-mid-1440-light.png`, `probe2.out`.
- *Observed:* `grid-row: 2 / -1` with no explicit row template resolves to row 1. `grid-column: 2` with an auto end stretches the playhead to the padding edge (576 vs 560px).
- *Expected:* A line spanning the row block in the track column (`SequencePlayhead.vue:36-46`).
- *Owner:* CONSUMER, `demo/scenes/sequence/SequencePlayhead.vue:47-48`.
- *Fix:* `grid-column: 2 / 3; grid-row: 2 / 3`, or declare the row template.

**UIA-KF-031 · BROKEN · The sequence row re-time handle slides out from under the pointer.** [C]
- *Seats:* sequence-scene.
- *State:* per-row drag.
- *Frame:* `sequence-scene/05b-row3-drag-mid-1440-light.png`.
- *Observed:* The drag projects `ratio * STAGGER_MAX` (1600ms), but the handle is drawn at `at/duration` (1940ms), so the handle trails the pointer by 58px. Duration also re-derives mid-drag.
- *Expected:* The thumb stays under the pointer.
- *Owner:* CONSUMER, `demo/scenes/sequence/SequenceTarget.vue:149, 278-279`.
- *Fix:* Project and draw on the same clock.

**UIA-KF-032 · BROKEN · The collapsed transport dock is a 40–56px circle that doesn't contain its content: Play hangs off one side and the channel label spills off the other.** [C][A][M]
- *Seats:* sequence-scene and spring-discrete-view (both BROKEN); transport-dock and amiga-scene (HIGH); home-hero, square-scene and cube-scene (MEDIUM, cube as a miss); spring-scene-solver (LOW); mobile-controls-drawer (a miss: reproduces on desktop too).
- *State:* the transport collapsed after idle, a stage click, or a toggle, 1440 and 390.
- *Frame:* `sequence-scene/crop-transport-collapsed-1440-light.png`, `spring-discrete-view/33a-dock-after-dismiss-4s-crop-1440-light.png`, `transport-dock/crop-01b-cube-collapsed-after-leave-1440-light.png`, `square-scene/crop-02a-drag-mid-1440-light-600-740.png`, `home-hero/confirm/c-cube-steady-5s-light.png` (steady state, not mid-morph).
- *Observed:* The consumer puts a w-8 Play and a text label in `#collapsed` (`TransportDock.vue:197-224`). The glass 7.0.0 summary is pinned 1:1 (`morph.css:170-198`, "guarantees 1:1 even if a consumer's collapsed-slot content is wider"). `--dock-collapsed-px` is measured once per content change (`dist/dock.js:476`), and nothing clips the overflow. The top ChromeDock, whose content fits in a circle, collapses correctly. The collapsed Play also renders as a 32x40 vertical oval.
- *Expected:* The collapsed face is one stadium pill containing its content (`--radius-dock` DESIGN.md:393; dock README "collapsed: compact-state content").
- *Owner:* GLASS+CONSUMER. CONSUMER-first: honour the single-glyph contract. GLASS: `GlassDock` collapsed sizing and clip (`glass-ui/src/components/dock/styles/morph.css:170-198`, `layers.css:90-100`); document the single-glyph contract in the dock README; offer a fit-content summary variant.
- *Fix:* CONSUMER: collapse to the Play glyph only, placed in `#persistent` (row 018). GLASS: clip `.dock-layers` and size the summary from its content when `fitContent` is set. Re-measure at 10.0.1 first (the OA-41 dock-morph family), and file it once, not once per scene.

**UIA-KF-033 · BROKEN · The easing specimen grid collapses into one horizontal stadium row: 28 tiles in a 3988px scroller, 7 visible.** [A]
- *Seats:* easing-scene-specimens.
- *State:* every state and filter.
- *Frame:* `easing-scene-specimens/00-load-1440-light.png`, `0309-filter-all-390-light.png`, `confirm/confirm-log.json`.
- *Observed:* In 7.0.0, ToggleGroup renders reka `as-child` with an inner div and `inheritAttrs:false`, so the scope id never reaches the root. The scoped `.specimen-grid{display:grid}` misses it, and the root computes `inline-flex nowrap`, radius 10003px. About 60% of the plate is empty.
- *Expected:* A responsive tile grid (T.E6).
- *Owner:* CONSUMER, `demo/scenes/easing/EasingTarget.vue:163-170` and `EasingTarget.css:100-107`. The glass HEAD root is a single div (`ToggleGroup.vue:138-151`).
- *Fix:* Put the grid on a wrapper element the consumer owns, and repin. Delete the track-reset block.

**UIA-KF-034 · BROKEN · The easing specimen races are wrong: every tile uses one shared rail width, and overshooting curves leave their rail.** [A][M]
- *Seats:* easing-scene-specimens.
- *State:* playing and paused; the Steps and Bounce filters.
- *Frame:* `easing-scene-specimens/02-drawer-scrolled-end-1440-dark.png`, `0307-filter-bounce-1440-light.png`, `confirm/c01-filter-steps-1440-light.png`.
- *Observed:* One width, read from an arbitrary snapshot entry, is applied to stages that range from 40px to 171px. Narrow tiles overshoot their end tick; wide tiles never reach it. `tileBallXAt = fn(p)*maxX` with no headroom, so the back curves and the value.js "bounce" (peak 1.18) clip off-stage.
- *Expected:* Every ball ends on its own end tick, and the overshoot is visible.
- *Owner:* CONSUMER, `demo/scenes/easing/EasingTarget.vue:300-337, 374-376`.
- *Fix:* Measure maxX per tile, or use a container-query `--p` mapping. Normalise to the curve's sampled [min,max] range. See also row 092.

**UIA-KF-035 · BROKEN · The curve plot, the editor's main content, is squeezed into a ~41x200px strip at 1440.** [C]
- *Seats:* controls-timing-function-detail (BROKEN), easing-curve-tab (HIGH), easing-scene-specimens (HIGH).
- *State:* the curve editor open in the ~370-400px rail.
- *Frame:* `controls-timing-function-detail/03-detail-converted-from-1440-light-crop.png`, `easing-curve-tab/01-curve-rest-1440-light-crop.png`, `easing-scene-specimens/00d-sidebar-crop-1440-light.png`.
- *Observed:* The 7.0.0 EasingPicker uses `grid lg:grid-cols-[1fr_18rem]`, a *viewport* breakpoint inside a card, which gives columns of `67px 288px`. The same picker lays out correctly at 390. Handles fall below the 44px floor.
- *Expected:* The curve dominates. The picker's frame is a constant square (glass README).
- *Owner:* CONSUMER (pin). Cured at glass HEAD `EasingPicker.vue:411-420` (single column, no breakpoint).
- *Fix:* Repin to 10.0.1 and pass `surface="bare"` (row 102).

**UIA-KF-036 · BROKEN · At 390 the timing-function editor opens with its header cut off and half of it below the fold, under the transport.** [C]
- *Seats:* controls-timing-function-detail.
- *State:* editor open at 390.
- *Frame:* `controls-timing-function-detail/03-detail-converted-from-390-light.png`, `05-after-drag-390-dark.png`, `10-departure-engine-native-390-light-crop.png`.
- *Observed:* The title shows only "bézier". The Back arrow is clipped. PRESET sits at y≈877. The Rotations pill floats over the plot.
- *Expected:* The navigation header is never inside the scrolled region, and the main content is in view.
- *Owner:* CONSUMER, `ChannelOptions.vue:994-997` (`max-height:min(50dvh,480px)`, header inside the scroller) and `TimingFunctionPanel.vue:12-40`.
- *Fix:* Make the sub-pane header sticky or a sibling of the scroller. Snap the sheet to expanded on open. Reserve the dock inset (row 005).

**UIA-KF-037 · BROKEN · At 390 the spring discrete view's stage card collapses: the title breaks mid-word, the demo card overlaps the header, the toggle covers the artifact label and Copy, and the footer is clipped.** [A]
- *Seats:* spring-discrete-view.
- *State:* Entry visible, dismissed, or mismatched at 390.
- *Frame:* `spring-discrete-view/02-entry-visible-rest-390-light.png`, `32a-header-toggle-collision-crop-390-light.png`, `32b-footer-under-sheet-crop-390-dark.png`.
- *Observed:* "@start/ing-/style" breaks over 3 lines. The 256px artifact is the block that overflows: the toggle overlap happens only when it is present, not in the mismatched state. The footer is lost under the peek.
- *Expected:* A readable phone column where nothing overlaps.
- *Owner:* CONSUMER, `demo/scenes/spring/StartingStyleTarget.vue:9, 14-31, 104`.
- *Fix:* Below lg, let the card body scroll with the artifact as the only shrinking child. Stack CardAction under the title. Wrap the footer. Pad by the peek height.

**UIA-KF-038 · BROKEN · In the spring Entry view the transport shows Pause while nothing plays, and Play/Pause/Reset do nothing on stage.** [C]
- *Seats:* spring-discrete-view.
- *State:* Entry at rest; after dock Play/Reset.
- *Frame:* `spring-discrete-view/02c-dock-entry-rest-crop-1440-light.png`, `12a-dock-play-in-entry-250ms-390-light.png`, `probe3-log.json`.
- *Observed:* The Entry channel is a facility channel (duration 500), yet `SpringScene.vue:136-141` itself says the sweep transport "doesn't apply".
- *Expected:* The transport tells the truth, and every control does something.
- *Owner:* CONSUMER, `demo/scenes/spring/SpringScene.vue:136-141, 213-234` and `useCompiledEntry.ts:52-63`.
- *Fix:* Map play to replaying the card's entry, or mark the channel non-playable so the dock shows only the select. The status on switch-in must be "rest".

**UIA-KF-039 · BROKEN · The inline keyframes editor's offset field truncates its own value ("0…", "2…"); the field is a 64px circle.** [C][M]
- *Seats:* spring-physics-tab, spring-scene-solver, toasts (the confirm seat's circle-field miss), mobile-controls-drawer.
- *State:* the inline editor's per-stop cards; invalid entry.
- *Frame:* `spring-physics-tab/06a-inline-editor-top-1440-light.png`, `13b-after-remove-50-1440-light.png`, `toasts/10-spring-offset-invalid-1440-dark.png` (")%").
- *Observed:* The input is `text-subheading w-16 text-ellipsis aspect-square`, so the stadium becomes a circle that can't hold "0%" or "100%". This circle shape fits no radius role.
- *Expected:* A single-line field sized to its content (`--radius-control`, a mono data register).
- *Owner:* CONSUMER, `demo/components/instrument/keyframes/components/KeyframeCard.vue:76`.
- *Fix:* This goes away if row 044 deletes the inline editor. Otherwise drop `aspect-square`/`w-16` and use `min-w-[7ch]` with tabular-nums.

**UIA-KF-040 · BROKEN · In the inline keyframes editor, each card's action cluster overlaps the declaration text and paints through the sticky "Keyframe offsets" shelf.** [C][M]
- *Seats:* spring-physics-tab, spring-scene-solver (sticky footer), css-paste-dialog (the confirm miss: the offsets popover paints under the stop-row controls), mobile-controls-drawer.
- *State:* inline editor top, hover, after remove; 1440 and 390.
- *Frame:* `spring-physics-tab/06a-inline-editor-top-1440-light.png`, `09c-offsets-slider-kbd-retime-1440-light.png`, `spring-scene-solver/07-inline-keyframes-editor-1440-light.png`, `css-paste-dialog/20-spring-add-trigger-hover-1440-light.png`.
- *Observed:* The × sits on "%)" and the clipboard on ";". The next card's ×, clipboard and "f 1 / s 25%" paint over the shelf's text. The f/s readouts repeat the offset field.
- *Expected:* Actions in a flowed header row, and overlays stacked above the list.
- *Owner:* CONSUMER, `KeyframeCard.vue:132` (`absolute z-content`) and `KeyframesEditor.vue:62` (sticky shelf with no z-index or isolation).
- *Fix:* Goes away with row 044. Otherwise use a flex header row, drop the f/s readouts, and give the shelf a z-index above the list.

**UIA-KF-041 · BROKEN · Spring's "re-sample" does not restore retimed offsets, gives no feedback, and its 5-stop seed does not express the spring.** [C]
- *Seats:* spring-physics-tab.
- *State:* re-sample after a retime; preset change then re-sample.
- *Frame:* `spring-physics-tab/12a-after-retime-resample-1440-light.png`, `resample-probe.json` (after_bouncy_resample is byte-identical to initial_smooth), `retime-probe.json`.
- *Observed:* The 25.1% offset survives the re-sample. Bouncy produces the same seed as smooth, which also suggests stale parameter reads; both need probing. A long run corrupts stops (`25.1% :: translateX(0%)`).
- *Expected:* Re-sample replaces every stop from the current (response, ζ), visibly, and confirms itself.
- *Owner:* CONSUMER, `demo/scenes/spring/useSpringKeyframesEditor.ts:43-55, 71-74`.
- *Fix:* Rebuild templateFrames wholesale, sampling at the linear() trace's stop count or emitting `linear()`. Give a confirmation. Re-home the action to the Keyframes pane (row 044).

**UIA-KF-042 · BROKEN · The multi-value "Keyframe offsets" slider has invisible thumbs, fills to the last value, and keyboard retime sticks after one step.** [C]
- *Seats:* spring-physics-tab.
- *State:* the inline editor footer; keyboard retime.
- *Frame:* `spring-physics-tab/06b-inline-editor-scrolled-footer-1440-light.png`, `09c-offsets-slider-kbd-retime-1440-light.png`, `retime-probe.json`.
- *Observed:* Five 0px-wide thumbs sit on a solid bar from 0 to 100. "Value 2 of 5" stays at 25 while its card reads 25.1, and a second ArrowRight does nothing.
- *Expected:* Each value is a visible, focusable knob, and the model and thumb stay in sync.
- *Owner:* GLASS+CONSUMER. GLASS: `glass-ui/src/components/slider/styles.css:143-157` (the invisible thumb) and `Slider.vue:157-163` (fill to the last value only), which leave no multi-value rendering. CONSUMER: `KeyframesEditor.vue:103-118` (`step 0.1`; thumbs don't re-project).
- *Fix:* GLASS: when `modelValue.length>1`, render visible thumbs or ticks and the between-range, and put the focus ring on the focused thumb. CONSUMER: bind to the card projection and use step 1. The consumer part goes away with row 044. The glass part also serves the timeline rail (row 280).

**UIA-KF-043 · BROKEN · Spring's "Add keyframes" fails silently: no inline error, no invalid state, the dialog just stays open.** [C][M]
- *Seats:* css-paste-dialog. Also the plausible confirm miss: a failed add leaves stops half-applied, and the toast's Retry would append them again.
- *State:* invalid CSS; a valid stop that fails to build.
- *Frame:* `css-paste-dialog/22-spring-add-parse-error-1440-light.png`, `23-spring-add-submit-sweep-1440-light-crop.png`.
- *Observed:* The adapter's submit returns void, so the shell's inline-error path at `CSSPasteDialog.vue:172-180` never runs. `addFrame` runs before `parse()` and nothing rolls back.
- *Expected:* An awaitable submit that rejects shows the message beside the draft (G14 P2).
- *Owner:* CONSUMER, `demo/components/instrument/keyframes/components/KeyframesAddDialog.vue:233-248` and `composables/useKeyframeOps.ts:171-205`.
- *Fix:* Return and reject the op's promise. Build before appending, or roll back on failure. Better still, retire the adapter with the inline editor (row 044).

## HIGH

**UIA-KF-044 · HIGH · The spring scene has a one-off inline "@keyframes (editable)" editor in its Physics facet instead of using the separate Keyframes pane that cube, amiga and square use — the owner-named defect**
- *Seats:* dock-controls-tab-select, controls-tab-channel-options, css-paste-dialog, spring-scene-solver, spring-physics-tab, spring-discrete-view, mobile-controls-drawer — findings dct#0[C] ss#2[A] spt#1[C] sdv#5[C] mcd#2[C] cpd#3[C] co#5[C]
- *Frame:* `spring-physics-tab/06a-inline-editor-top-1440-light.png`
- *Observed → expected:* Spring mounts a second KeyframesEditor (with its own offsets slider, re-sample button, clipboard actions and its own "Add keyframes" dialog: three entry points to one job) inside the Physics facet. It also stays on screen in the Entry view, where it edits the Sweep channel. Cube, amiga and square route all keyframe authoring through the shared Keyframes tab (square-scene page verdict: "No inline keyframes editor; shared pane cohesion", CONFIRMED). Rows 039–043 are this editor's render defects. Canon: owner §0bl "NO one-off instances"; controlSurfaces.ts contract (one surface per concern).
- *Owner:* CONSUMER — demo/scenes/spring/SpringPhysicsFacet.vue:109-139 (+ useSpringKeyframesEditor.ts, KeyframesAddDialog.vue twin)
- *Fix:* Delete the inline editor and its KeyframesAddDialog twin. The Physics facet keeps presets, the response and ζ sliders and the heatmap, plus one action, "Write keyframes", which seeds the Sweep channel's keyframes, now shown in the shared Keyframes tab. One Add-CSS entry point for the whole app. This row cures 039–043 at the same time.

**UIA-KF-045 · HIGH · The timeline embeds a second, inline per-stop Monaco CSS editor instead of handing off to the Keyframes pane**
- *Seats:* timeline-tab, timeline-expanded — findings tl#4[C] tx#3[C]
- *Frame:* `timeline-tab/42-expanded-settled-1440-light.png`
- *Observed → expected:* Selecting a diamond opens a per-stop Monaco editor inside the timeline card (collapsed and expanded). This is a third keyframes editor next to the Keyframes tab and the spring one-off. Canon: owner §0bl cohesion order.
- *Owner:* CONSUMER — demo/components/instrument/timeline/KeyframeTimeline.vue:297 (per-stop Monaco)
- *Fix:* Selecting a stop should reveal and focus that stop in the Keyframes pane (or show a read-only summary with "Edit in Keyframes"). Delete the inline Monaco. This also cures row 021.

**UIA-KF-046 · HIGH · The Smooth/Snappy/Bouncy/Gentle presets, the easing specimen tiles and the Curve preset strip are stadium pills around two-line content; they should be card-like tiles (owner-marked)**
- *Seats:* dock-controls-tab-select, timeline-tab, easing-scene-specimens, easing-curve-tab, spring-scene-solver, spring-physics-tab, spring-discrete-view, mobile-controls-drawer — findings dctm0[M] spt#2[A] ss#3[C] mcd#4[C] es#2[C] dct#1[A] tlm0[M] sdv#11[C] ecm0[M]
- *Frame:* `spring-physics-tab/05c-preset-bouncy-selected-crop-1440-light.png`
- *Observed → expected:* Preset cells measure w138 h68–75 at r=9999px. Specimen tiles are 9999px on a 10003px plate. Two-line label plus track content gets crowded into stadium ends. Glass ToggleGroupItem has no shape axis, and there is no tile or choice-card primitive anywhere in glass (radio-group is stadium too). Canon: DESIGN.md:385 (--radius-control stadium = single-line controls only) and :386 (--radius-field 16px = multi-line holders); owner 2026-09-23: "too rounded … should be more card like".
- *Owner:* GLASS+CONSUMER — GLASS: toggle-group/styles.css:67-70 (border-radius: var(--radius-pill) unconditional; ToggleGroupItem.vue:15-16 "size and variant axes are GONE"); CONSUMER: SpringPhysicsFacet.vue:83/:93 restates rounded-pill; EasingTarget specimen tiles; Curve preset strip
- *Fix:* GLASS: add a card or tile shape to ToggleGroupItem (for example `shape="tile"`, or automatic when the item holds block content) reading --radius-field (16px), with the group plate following the concentric rule. CONSUMER: drop rounded-pill and the plate reset in SpringPhysicsFacet and adopt the tile in spring presets, easing specimens and the Curve strip.

**UIA-KF-047 · HIGH · Matrix cells render as circles: glass has no card-like single-value field shape, so a stretched Input or NumberField becomes a disc inside a rounded square**
- *Seats:* cube-scene, cube-matrix-controls-tab — findings cmm2[M] cm#2[A] cu#2[C] cm#8[A]
- *Frame:* `cube-matrix-controls-tab/01-rest-1440-light.png`
- *Observed → expected:* input0 measures 56×56 at radius 9999px (the pill clamps to half the block size). The 16 cells read as bubbles in rounded squares, and the focus ring is a black circle. The cells are text Inputs with bogus start/end/step attributes. Switching to NumberField does not help, because NumberFieldInput also forces data-kind=input. Canon: DESIGN.md:386 (--radius-field 16px for multi-line field / stepper).
- *Owner:* GLASS+CONSUMER — GLASS: _shared/field/control.css:151-154 (data-kind=input → --radius-pill) and number-field/NumberFieldInput.vue:32 (hard-codes data-kind=input); CONSUMER: MatrixEditor.vue:9-24
- *Fix:* GLASS: add a tile or box field kind (data-kind="tile") at --radius-field for single-value cells and NumberField. CONSUMER: switch the matrix to NumberField with the tile kind, drop the rounded-lg cell wrapper, and use a real numeric control.

**UIA-KF-048 · HIGH · The demo runs glass-ui 7.0.0, three majors behind; about 25 filed defects are already fixed at glass HEAD**
- *Seats:* home-hero, scene-loading-skeleton, top-dock, controls-advanced-layer, amiga-scene — findings hhm0[M] tdm3[M] amm1[M] sk#4[A] adv#10[C]
- *Frame:* `scene-loading-skeleton/11-prm-fallback-1440-light.png`
- *Observed → expected:* Every GLASS cite was checked against 7.0.0 dist and against HEAD. Rows owned by `CONSUMER (pin)` in this register are cured by the bump: dark rest chip and cream hairline, Tailwind :root radius leak, quiet-button focus ring, 12px listbox, EasingPicker breakpoint/viewBox/break-all/custom preset/copy line, dialog gutter/footer/destructive/shortcut barrier, skeleton band, sheet radius, toggle-group 10003px plate, SelectItem dot, SelectLabel. LayerConfigPanel is written against the 7.0.0 NumberField API that 10.0.1 removed, and the Drawer is gone at 10 (it is now Sheet). One regression lands with the bump: the field font drops ui-scale (row on cpd#11).
- *Owner:* CONSUMER (pin) — keyframes.js package.json:78 "@mkbabb/glass-ui": "7.0.0" (glass HEAD 10.0.1; 8.0.0/9.0.0/10.0.x on npm)
- *Fix:* Adopt glass ≥10.0.1 as one owned migration (KF.W13R): Drawer → SheetContent with detents (rows 005 and 006), GlassDock props (drop overflow="wrap", collapse-delay, start-collapsed), NumberField API, Toaster (row 001). Then re-capture every `CONSUMER (pin)` row before relaying anything to glass as open.

**UIA-KF-049 · HIGH · glass-ui 7.0.0 leaks Tailwind's default :root radius values over the canon radius ladder across the whole app**
- *Seats:* dock-scene-select, spring-discrete-view — findings dssm0[M] sdvm2[M]
- *Frame:* `dock-scene-select/09-closeup-amiga-1440-light.png`
- *Observed → expected:* index.css imports the emitted block last, `layer(components)`, so it beats the @theme ladder. --radius-lg computes to 8px (canon 10px) and --radius to 4px. Menu rows, the discrete-view card and every `rounded`/`var(--radius)` consumer are off the ladder. Canon: DESIGN.md:370-395 radius ladder.
- *Owner:* CONSUMER (pin) — glass 7.0.0 dist/styles/components.css:1 emits Tailwind's default :root{--radius:0.25rem;--radius-lg:0.5rem}; fixed in glass v8.0.0+ (vite.utility-emit.ts R3)
- *Fix:* Adopt glass ≥8 (row glass-pin). After the bump, sweep consumer `var(--radius)` / `rounded` uses.

**UIA-KF-050 · HIGH · In dark theme every resting dock control draws a cream outline or filled chip, so the dock reads as pills inside a pill**
- *Seats:* home-hero, top-dock — findings td#0[A] hh#5[A]
- *Frame:* `top-dock/crops/ztoggle.png`
- *Observed → expected:* The ::before on .dock-select-trigger, .dock-dropdown-trigger and .dock-icon-button paints `inset 0 0 0 0.75px color-mix(hsl(40 35% 92%) 70%…)` plus opacity 0.07 at rest in dark. Light rest is bare. Canon: dock README (the rest face is bare).
- *Owner:* CONSUMER (pin) — glass 7.0.0 material.css rest floor 0.07 + cream hairline box-shadow; STRUCK at glass v8.0.0+ (cfc4dffa; material.css:218-233 at HEAD)
- *Fix:* Adopt glass ≥10.0.1. There is nothing left to cut at the glass root.

**UIA-KF-051 · HIGH · Two transports drive one animation: the controls-pane PlaybackRibbon (Play/Pause, Reverse, scrub, ball rail) duplicates the dock transport on every scene**
- *Seats:* transport-dock, cube-scene, controls-tab-channel-options, amiga-scene, square-scene, easing-curve-tab, spring-scene-solver, spring-physics-tab, spring-discrete-view — findings trd#4[C] cu#6[C] co#9[C] am#11[C] ss#7[C] sptm1[M] sq#8[C] ecm1[M] sdv#7[C]
- *Frame:* `transport-dock/crop-31-square-expanded-1440-dark.png`
- *Observed → expected:* Every scene shows the dock's Play/Reset/select and, in the rail, a second Play/Pause + Reverse + scrubber (+ a ball rail on easing, which is a second progress readout). Spring adds a floating stage "Sweep" pill, and discrete-view adds a Reveal/Dismiss twin. Canon: demo/DESIGN.md §3 (one control per verb); owner §0bl "cluttered".
- *Owner:* CONSUMER — demo/components/instrument/transport/PlaybackRibbon.vue + TransportDock.vue (+ per-scene in-card transports)
- *Fix:* Pick one transport. Either the dock owns play, reset and select, and the ribbon keeps only scrub and reverse without its own Play; or the dock collapses into the ribbon when the pane is open. Delete the scene-local twins.

**UIA-KF-052 · HIGH · The transport Play is a hand-rolled `<Button rounded-full w-10 h-10 rainbow scale-on-hover>`, not a DockControl like its siblings**
- *Seats:* home-hero, transport-dock, controls-tab-channel-options — findings hh#4[C] trd#5[C] co#16[C] trd#14[C] hh#13[C]
- *Frame:* `transport-dock/crop-31-square-expanded-1440-dark.png`
- *Observed → expected:* Reset and Collapse are DockControl shape=icon, while Play is a larger bespoke button with literal rounded-full and its own hover scale. It stretches the dock height and is the only rainbow control. Literal `rounded-full` and opacity 0.85 appear where role tokens exist. Canon: dock README (DockControl for every dock verb); DESIGN.md:385 --radius-control.
- *Owner:* GLASS+CONSUMER — CONSUMER: TransportDock.vue:46-64 / :203-210 (hand-rolled rainbow Button), PlaybackRibbon Reverse rounded-full; GLASS: DockControl has no accent/primary tone
- *Fix:* GLASS: give DockControl an accent or primary tone (paired foreground, see the rainbow-pastel row). CONSUMER: render Play as `<DockControl tone="accent" shape="icon">` and replace literal radii with role tokens.

**UIA-KF-053 · HIGH · The ruled immersive register is missing on cube, amiga and easing: no .stage-whisper readout and no .stage-legend verb line, so orbit, wheel, axis-lock, double-tap roll and pinch are undiscoverable**
- *Seats:* cube-scene, cube-matrix-controls-tab, amiga-scene, easing-scene-specimens — findings cu#3[C] am#7[C] cm#9[A] es#11[A]
- *Frame:* `cube-scene/14a-autoplay-after-drag-1440-light.png`
- *Observed → expected:* Square, spring and sequence carry the legend and whisper, while cube, amiga and easing have neither. The matrix live readout (.stage-whisper) that is ruled for the cube is not implemented. Canon: demo/DESIGN.md §7 (stage register).
- *Owner:* CONSUMER — scene shells (CubeScene.vue, AmigaScene.vue, EasingScene.vue); ruled .stage-whisper / .stage-legend idiom (square, spring, sequence have it)
- *Fix:* Add the shared StageLegend and StageWhisper to every scene shell from one registry, so no scene can omit them.

**UIA-KF-054 · HIGH · Error and status text uses the uppercase micro-mono eyebrow register and dumps raw engine or parser messages**
- *Seats:* timeline-tab, css-paste-dialog, easing-scene-specimens, easing-curve-tab, spring-physics-tab — findings tl#6[C] cpd#5[C] spt#10[C] es#9[C] ec#5[C]
- *Frame:* `timeline-tab/09-hover-preview-1440-light.png`
- *Observed → expected:* Errors render as 10px all-caps mono: whole raw blocks, parser codes (BrowserScalarResolution…) and 4-line engine messages that re-centre labels and shove the ribbon. Catalogue-gap captions are 4-line uppercase prose that uppercases curve identifiers. Canon: glass field error slot (sentence case, --type-small); demo/DESIGN.md §8 copy.
- *Owner:* CONSUMER — ChannelOptions.vue:87/:831, KeyframeTimeline error banner, KeyframeCard offset error, CSSPasteDialog error line, EasingSidebar captions
- *Fix:* Map engine errors to one short sentence-case message in the glass field error slot, keep raw diagnostics in a disclosure or console, and never uppercase identifiers.

**UIA-KF-055 · HIGH · The Monaco CSS editor uses GitHub and Dracula themes: a blue-white or slate well inside the warm glass card**
- *Seats:* cube-scene, keyframes-tab-css-editor, amiga-scene, square-scene, mobile-controls-drawer — findings kce#6[C] amm2[M] sqm1[M] mcd#9[C] cu#11[C] am#15[C]
- *Frame:* `keyframes-tab-css-editor/06-format-toast-1440-dark-crop.png`
- *Observed → expected:* The light theme is a ghost-white well and dark is slate, with red property names, a line-1 highlight while unfocused, and a grey Monaco scrollbar. The last line is clipped at the card edge, and at 390 identifiers wrap mid-token. Canon: glass DESIGN.md colour tokens (no code or syntax family exists, so a GLASS gap).
- *Owner:* GLASS+CONSUMER — CONSUMER: CSSCodeEditor.vue:84-85 imports Dracula.json / GitHub.json; GLASS: no --code-* syntax token family in DESIGN.md
- *Fix:* GLASS: publish --code-bg/--code-fg/--code-keyword/--code-property/--code-number/--code-comment tokens (light and dark). CONSUMER: build the Monaco theme from those tokens, use a transparent background on the card, and wordWrap on token boundaries.

**UIA-KF-056 · HIGH · Share opens a hand-rolled popover nested inside a menuitem, which overlaps its own menu and the controls pane**
- *Seats:* mbabb-menu, share-popover — findings mm#1[C] sp#5[A] mmm1[M]
- *Frame:* `share-popover/01-popover-open-1440-light-crop.png`
- *Observed → expected:* The popover opens beside the still-open dropdown and occludes it at 390 and the glyph column at 1440. It also covers the Controls pane's iterations and direction fields. The copy action uses a paste glyph. Canon: glass menu README (a menuitem runs a command; no interactive content inside); WAI-ARIA menuitem.
- *Owner:* CONSUMER — demo/app/dock/MbabbMenu.vue:50-58, SharePopover.vue
- *Fix:* Make the Share row a plain menuitem that closes the menu and opens the share surface as its own popover anchored to the @mbabb trigger, or as a small dialog. Use the copy glyph.

**UIA-KF-057 · HIGH · At 390 installed-glass dialogs run edge to edge with no gutter, a stacked full-width footer and a 16px close target**
- *Seats:* keyboard-shortcuts-modal, clear-all-confirm-dialog, css-paste-dialog, spring-physics-tab — findings ksm#6[A] cac#1[C] cac#2[C] cpd#9[C] spt#20[A]
- *Frame:* `clear-all-confirm-dialog/01-open-390-light.png`
- *Observed → expected:* Dialog x 0, w 390; a tap outside cannot land on the scrim; Clear & reload and Cancel touch (gap 0) with the destructive action on top; the close target is 16×16. Canon: glass HEAD dialog/styles.css:17-26 (comment names this exact x 0 bug at 393).
- *Owner:* CONSUMER (pin) — keyframes package.json:78 pins @mkbabb/glass-ui 7.0.0; cured in glass ≥8/10.0.1 (HEAD dialog/styles.css:25-26 inline gutter; footer row; 44px close)
- *Fix:* Adopt glass ≥10.0.1. Route the radius question separately (dialog-radius row).

**UIA-KF-058 · HIGH · glass-ui contradicts itself on dialog radius: the stylesheet paints 24px while the role table says 16px, so the repin makes every dialog rounder**
- *Seats:* keyboard-shortcuts-modal, clear-all-confirm-dialog, css-paste-dialog — findings ksmm1[M] cac#9[A] cpd#10[A]
- *Frame:* `keyboard-shortcuts-modal/01-open-menu-cube-1440-light.png`
- *Observed → expected:* Installed 7.0.0 paints 16px. Glass HEAD paints 24px ("ROOM"), while DESIGN.md:388 and the radius.css:131 alias say 16px. The bump would turn every kf dialog from 16px to 24px, against the owner's 2026-09-23 "too rounded … more card like".
- *Owner:* GLASS — dialog/styles.css:22 `border-radius: var(--radius-3xl)` (24px "ROOM") vs DESIGN.md:388 --radius-dialog = card 16px (radius.css:131 alias)
- *Fix:* Glass owner ruling: revert styles.css:22 to var(--radius-dialog) (= card 16px, per the owner's order), or finish the re-point by updating DESIGN.md:388 and the alias together. Rule before the consumer bump.

**UIA-KF-059 · HIGH · The toast is a hand-rolled, inverted opaque slab on the 12px panel rung with its icon on its own row, not the glass Toast primitive**
- *Seats:* share-popover, toasts — findings to#1[C] sp#10[C] to#3[C]
- *Frame:* `toasts/01-success-copy-1440-light.png`
- *Observed → expected:* Inverted slab, 12px (panel) radius, the icon on a dead row that doubles toast height, unstyled bare action and close buttons. Canon: glass Toast (card rung; the Toast.vue:112-115 comment argues the more elevated surface is never less rounded).
- *Owner:* CONSUMER — demo/components/instrument/transport/components/DemoGlobalChrome.vue:27-58 toast templates
- *Fix:* Retire with row 001: glass Toaster and Toast.

**UIA-KF-060 · HIGH · The destructive "Clear all & reload" label fails text contrast, and the menu row and the confirm button use two different reds**
- *Seats:* mbabb-menu, clear-all-confirm-dialog — findings mm#2[C] cacm1[M] cac#5[A]
- *Frame:* `clear-all-confirm-dialog/01-open-1440-light.png`
- *Observed → expected:* The kf light --accent-red gives 3.34–3.48:1 against the page and white ink. The confirm uses glass --destructive, a different red. Binding glass --destructive to the kf red would push the button label below 4.5:1. Canon: WCAG 1.4.3; DESIGN.md destructive tone.
- *Owner:* CONSUMER — kf --accent-red (hsl(0 72% 63%)), MbabbMenu.vue Clear-all row, ClearAllConfirmDialog
- *Fix:* Use glass --destructive / --destructive-foreground in both places, and delete the kf red for text.

**UIA-KF-061 · HIGH · The expanded timeline shows four collapse affordances at once, plus a dead "Timeline expanded below" placeholder in the rail (which at 390 points the wrong way)**
- *Seats:* timeline-expanded — findings tx#7[A] tx#8[A]
- *Frame:* `timeline-expanded/01-expanded-empty-1440-light.png`
- *Observed → expected:* Expanded state shows a collapse chip in the transport, a card collapse, a rail placeholder with a bouncing chevron, and the tab. At 390 the placeholder says "below" with a down chevron while the timeline is above the sheet. Canon: demo/DESIGN.md §3 (one control per verb).
- *Owner:* CONSUMER — AnimationControlsGroup.vue:94-101 (placeholder), TransportDock.vue collapse chip
- *Fix:* One collapse affordance on the expanded surface. Delete the rail placeholder so the pane stops overflowing into the bottom row, which also cures row 020.

**UIA-KF-062 · HIGH · The 7.0.0 EasingPicker re-fits its viewBox during a drag, breaks the literal mid-number, shows "Pick a curve" for a custom curve, grows the card on copy and mixes label registers**
- *Seats:* controls-timing-function-detail, easing-curve-tab — findings tf#5[C] tf#9[C] tfm3[M] ec#12[C] ec#13[C] ec#8[C]
- *Frame:* `controls-timing-function-detail/05-after-drag-390-dark.png`
- *Observed → expected:* viewBox goes from "0 -0.1 1 1.2" to "0 -0.7 1 1.8" mid-drag, so the unit square shrinks under the pointer. The readout breaks "1." / "6)". An authored curve shows the placeholder. "COPIED CURVE LITERAL." appears inside the card. PRESET, STEPS and JUMP TERM are in mono caps beside a sans "duration". Canon: glass EasingPicker README (constant square frame).
- *Owner:* CONSUMER (pin) — keyframes package.json:78 pins @mkbabb/glass-ui 7.0.0; cured in glass ≥8/10.0.1 (EasingPicker at HEAD: constant VIEW_BOX, no break-all, CUSTOM preset item, sr-only copy status, captions → aria-label)
- *Fix:* Adopt glass ≥10.0.1 (row glass-pin). Nothing new for glass.

**UIA-KF-063 · HIGH · Matrix cells paint the editable value on top of a larger bold axis-label watermark, so both are illegible (worse in dark)**
- *Seats:* dock-controls-tab-select, cube-scene, cube-matrix-controls-tab — findings cu#1[C] cm#3[C] dct#6[A] cm#10[C] cmm0[M]
- *Frame:* `cube-matrix-controls-tab/01-rest-1440-light.png`
- *Observed → expected:* Values "1" and "0" sit on "Sx", "y" and "Pw". In dark, the red and navy labels nearly vanish. Three perspective cells share the label "Pw", and off-diagonal cells carry only a bare axis letter. Canon: glass LabeledField (label outside the control).
- *Owner:* CONSUMER — demo/scenes/cube/matrix-editor/MatrixEditor.vue:41-44, :208-209 (text-heading axis label at 55% mix under the value)
- *Fix:* Put the axis label outside or above the cell in the label register, with unique names (m11…m44 or Sx/Kxy/Tx/Px), and show the value alone in the tile field.

**UIA-KF-064 · HIGH · Scene status badges are hand-rolled spans, and the square one is stretched into a 150px stadium bar**
- *Seats:* square-scene, sequence-scene — findings sq#5[A] seq#12[C]
- *Frame:* `square-scene/00-idle-box-1440-light.png`
- *Observed → expected:* The square badge is stretched to 150px with literal rounded-full and a 14% tint. Sequence uses a hand span. Glass Badge has no progress tone and no soft or tint variant. Canon: glass Badge.
- *Owner:* CONSUMER + GLASS gap — SquareScene / SequenceTarget hand-rolled .status-badge; glass badge/index.ts has solid tones only
- *Fix:* Use glass Badge (inline-size: auto). Route the soft-tone variant (sqm4 row) to glass.

**UIA-KF-065 · HIGH · At 390 the hero prose prints on the saturated red cube face: hard to read, and the face numeral runs into the text** [C]
- *Page · state:* home-hero · first-load start screen, 390 light and dark — finding `hh#2`
- *Frame:* home-hero/01-firstload-390-light.png (+ 01-firstload-390-dark.png)
- *Observed:* The deck 'from the list ☰ below, then press Play.' and the muted hint 'or drag M. cubert' sit entirely on the red face. The face's '1' glyph runs into 'then' ('1then'), and the yellow-face '4' cuts through 'animation'. The muted hint (rgb 124,102,80) on red is low-contrast. The top ~50% of the viewport is empty.
- *Expected:* Body-size prose sits on the ground, or on a glass plate, never on a saturated moving subject. The headline overlap (T.D9) may be deliberate, but the deck and hint are reading text and must stay legible.
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/shell/EditorStartScreen.vue:345-353 (<lg band top = work-area-height × 0.52) and demo/components/instrument/shell/EditorShell.vue:47 (start screen at z-controls above the subject)
- *Fix:* Below lg, put the hero band in the empty upper half (above the die), or move the die down. Keep the deck and hint off the subject's box, or give them a translucent glass Surface.

**UIA-KF-066 · HIGH · The hero instructions don't match what the page does: the list auto-plays and leaves the page, Play leaves the page, and dragging never dismisses the start screen** [A]
- *Page · state:* home-hero · first-load → drag M. cubert (1440/390, both themes); hover on Play — finding `hh#3`
- *Frame:* home-hero/13-after-cube-drag-steady-1440-light.png (+ 12-mid-cube-drag-*, 02-hover-play-1440-dark.png; capture3-log.json drag600/drag3600 hero:true)
- *Observed:* The copy says 'Select an animation… from the list below, then press Play … or drag M. cubert'. Dragging does rotate the cube, but the 177px headline stays printed over the cube for as long as #/ is open (show-start-screen = isHome). Picking from the list starts playback without Play. Play (tooltip 'Play') actually navigates to #/cube.
- *Expected:* Every path the start screen names should dismiss it. The inventory's own states list says 'after drag/Play the start screen dismisses', and the copy and tooltip should describe what actually happens.
- *Owner:* CONSUMER — keyframes.js demo/app/App.vue:42 (:show-start-screen="isHome"), App.vue:60 (hint copy); demo/components/instrument/shell/EditorStartScreen.vue:118-131 (deck copy)
- *Fix:* Tie show-start-screen to 'home and not yet engaged', and set engaged on the subject's first pointerdown/drag (CubeScene orbital-drag). Reword the deck to the real flow (e.g. 'Press Play, or drag M. cubert'). Consider the tooltip 'Open the cube' at home.
- *Confirm amendment:* Confirmed on the capture3 fresh contexts: 13-after-cube-drag-steady-1440-light.png and capture3-log drag3600 both show hero:true. App.vue:42 still binds :show-start-screen="isHome". Add this: after a drag the transport collapses to the Play button alone (frame 13), yet the deck still says 'from the list ☰ below', so the copy points at a control that is no longer shown. Caveat: my re-probe drag ran in a context that had already picked a channel, and it restored the cube scene (hero false, c-home-drag-3500-light.png). That run is contaminated and does not refute the finding. Frame 10 has the same contamination, see the collapsed-plate row.

**UIA-KF-067 · HIGH · The skeleton's silhouette does not match the scene it stands in for (hard load)** [C]
- *Page · state:* scene-loading-skeleton · loading fallback → resolved, hard load #/amiga, both viewports, both themes — finding `sk#0`
- *Frame:* 01-hardload-fallback-1440-light.png vs 05-hardload-resolved-1440-light.png; 01-hardload-fallback-390-light.png vs 05-hardload-resolved-390-light.png
- *Observed:* At 1440 the fallback is one full-width card (x91 w1258 h592). The resolved layout is a 566px controls column on the left plus a stage at x518 w878 h646, so the card collapses into a different box and a panel appears from nothing. At 390 the fallback is a gutter-inset card (x16 w358 y90 h664). The resolved stage is full-bleed (x0 w390 y133 h577) with a bottom sheet under it. While loading there is also no transport pill, which then appears. The docblock claims the 'swap-time silhouette is the scene's by construction' (App.skeleton.vue:20-24), and that is false for both forks.
- *Expected:* The fallback reserves the resolved layout: the controls column or bottom sheet and the transport stay in place, and only the stage region shows a placeholder at the stage's real box, so resolve causes no layout shift.
- *Owner:* CONSUMER — demo/app/App.skeleton.vue:108-112 (plate fills the whole scene-host) + demo/app/App.vue:63-72,92-101 (the shell's pane/ribbon only exist once sceneRef resolves) — scene-host fallback
- *Fix:* Mount the shell's shared chrome (tabs-content pane, ribbon, transport) independently of sceneRef, with skeleton rows inside it while loading. Shrink SceneSkeleton to the stage slot only, with the same gutter and inset the scene's stage uses (full-bleed at 390).

**UIA-KF-068 · HIGH · In-app scene change unmounts the shared controls pane and bottom sheet, and blanks the channel select** [C]
- *Page · state:* scene-loading-skeleton · route change cube → amiga with the chunk cold; loading fallback; 1440 + 390; light + dark — finding `sk#1`
- *Frame:* 06-route-before-cube-1440-light.png → 07-route-t120-1440-light.png → 08-route-fallback-1440-light.png → 10-route-resolved-1440-light.png; 08-route-fallback-390-dark.png
- *Observed:* The duration/delay/iterations/direction/fill/easing pane and the Play/Reverse card are the same shared keyframes pane in every scene. They vanish for the whole load, leaving an empty left half at 1440, and at 390 the bottom sheet disappears. The transport's channel select drops to an icon-only list glyph with no label. When the scene resolves, all of it pops back in one frame.
- *Expected:* Per the owner's cohesion rule (every scene uses the separate keyframes pane, with no one-off chrome), the keyframes pane is shell-owned and persists across scene swaps. Only its values rebind, and a loading state shows inside it.
- *Owner:* CONSUMER — demo/app/App.vue:63-72 (`sceneRef?.tabsContent` / `sceneRef?.ribbonContent` are gated on the unresolved scene ref) — EditorShell #tabs-content / #ribbon-content slots during Suspense
- *Fix:* Hoist the pane and ribbon so they are mounted from a shell-level channel model, not from `sceneRef` exposure. While the scene resolves, render them disabled or with glass Skeleton rows. Keep the channel select's last label or show a skeleton line, never a bare glyph.

**UIA-KF-069 · HIGH · Floating listbox has a hard 3-step shadow that looks like a dark slab or second card behind it** [A]
- *Page · state:* dock-scene-select — finding `dss#0`
- *Frame:* 09-closeup-amiga-1440-light.png, 01-open-home-current-1440-light.png, 05-open-spring-current-390-light.png; probe-log.json .shadows[0]
- *Observed:* The measured stack puts three 0-blur offsets under the glass-floating shadow: -4px 4px (warm ink 0.32), -7px 7px (0.26) and -11px 11px (0.18). This paints a hard brown slab down and left of the list, the heaviest shadow in the whole chrome. The dock the list hangs from casts only a soft shadow. In light mode it looks like a second, darker card offset behind the menu, which adds clutter.
- *Expected:* DESIGN.md:462-471 documents --shadow-cartoon-lg as a soft stamp (1-2px blur, 12%/8% neutral --shadow-color). It also says the cast is consumer-driven: 'No component emits the cast child… the consumer drives it.' A transient dropdown should take the floating tier alone (DESIGN.md:49/516: '.glass-floating … Popovers, tooltips, dropdowns'). Today the shipped token contradicts the doc, and the plate stamps the cartoon register on every popover without any opt-in.
- *Owner:* GLASS — overlay-plate.css:318 (`box-shadow: … var(--glass-shadow-floating), var(--shadow-cartoon-lg)`) + tokens/shadow.css:85-89; canon DESIGN.md:460-475 (§Cartoon shadows) — Every open state of the scene listbox (both viewports and themes). The shared SelectContent plate is used by every Select/Dropdown in the app.
- *Fix:* GLASS (route to the glass-ui session): remove the static --shadow-cartoon-lg under-stamp from the overlay/floating plate, or gate it behind an explicit opt-in such as surface='cartoon'. Make DESIGN.md §Cartoon shadows and tokens/shadow.css agree (one blur and one ink, recorded once). Consumer: no change.
- *Confirm amendment:* The stack is real and the owner is GLASS. Probe: -4/4, -7/7, -11/11 at 0 blur in warm ink. It is visible in 09-closeup-amiga-1440-light and 05-open-spring-current-390-light. The source contradiction is real: shadow.css:85-89 ships 0-blur warm cel-ink layers, while DESIGN.md:466-471 still shows the soft 1-2px neutral form. Three corrections. (1) Location and scope: the stamp is scoped to `[data-slot="select-content"]` only. In the installed 7.0.0 it lives in dist/components/_shared/field-surfaces.css; at glass HEAD it is overlay-plate.css:315-318. The HEAD comment at overlay-plate.css:54-56 says '#81's select-content block carries … the cartoon under-stamp'. So it hits every Select listbox, not every popover or dropdown. (2) The stamp is deliberate house register, not drift in the token. shadow.css:9-12 says 0-blur down-left warm ink is 'the cel family coherence'. The same slab is also on the scene side cards (frames 04, 06). The stale party is DESIGN.md §Cartoon shadows, and removing the stamp is a register decision for glass, not a bug fix. (3) The fix stands as a glass-session decision: either drop the stamp from transient popovers so they take the floating tier alone (DESIGN.md:49/516), or re-document it. The doc must be corrected either way. Severity HIGH stands, given the owner's 'cluttered'.

**UIA-KF-070 · HIGH · After a restore the modal @mbabb menu stays open with focus stranded outside it; at 390 the trigger is then unreachable** [C]
- *Page · state:* share-popover — finding `sp#3`
- *Frame:* 03-restore-success-390-light.png, 03-restore-success-1440-light.png, 02-copied-toast-1440-light.png; capture-log-*.json afterRestore {menuOpen:true, bodyPE:'none', focus:'scene-host'}; capture-log-390-*.json reopenFail
- *Observed:* The popover closes but the DropdownMenu (modal) stays open. body has pointer-events:none, and activeElement is the .scene-host div, outside the menu's focus scope. At 390, 2×Escape plus a dock hover did not make '@mbabb menu' clickable within 30s, in both themes. After Copy, the menu also stays open over the scene.
- *Expected:* A completed Share action (copy or load) dismisses the whole menu stack and returns focus to the @mbabb trigger.
- *Owner:* CONSUMER — demo/components/instrument/shell/useShareState.ts:32,36,76 (closes only its own popover) + demo/app/dock/MbabbMenu.vue:50-51 (popover nested in a menuitem, @select.prevent) — share-popover — after restore success (and after copy)
- *Fix:* Close the parent menu on success, e.g. pass the menu's open model down or emit 'done' so MbabbMenu sets open=false. Better still, see the DropdownMenuSub/item restructure below, where item select closes the menu natively.

**UIA-KF-071 · HIGH · Inverted hierarchy and clutter: the primary 'share' action is the smallest control; export and import are fused in one unlabeled row** [C]
- *Page · state:* share-popover — finding `sp#6`
- *Frame:* 01-popover-open-1440-light-crop.png, 01-popover-open-1440-dark.png
- *Observed:* The popover has no heading and no labels. A 170px paste field (the rare import path) takes the width and the auto-focus. The action the menu row names, 'Share', i.e. copy the link, is the last 36px ghost clipboard icon, identified only by a native title tooltip. An arrow (Load) and a clipboard (Copy) sit side by side with no reading of which verb is which.
- *Expected:* The primary action is dominant and named (a glass Button with a label, e.g. 'Copy link'). The secondary import path is separated and labeled. Glass Tooltip or visible text, not a native title.
- *Owner:* CONSUMER — demo/components/instrument/shell/SharePopover.vue:110-144 — share-popover — open state
- *Fix:* Covered by the restructure above. If the popover is kept: a labeled primary 'Copy link' Button on top, a Separator, then a LabeledField 'Load from link' with the Input and a labeled Load button.

**UIA-KF-072 · HIGH · Sticky group headings are opaque, square-cornered bg-popover plates painted across the translucent glass dialog** [C]
- *Page · state:* keyboard-shortcuts-modal — finding `ksm#2`
- *Frame:* 01-open-menu-cube-1440-light-crop.png, 01-open-menu-cube-390-dark.png, 04-scrolled-mid-cube-1440-dark-crop.png, 05-scrolled-bottom-cube-1440-light-crop.png
- *Observed:* Each group heading paints a full-width solid band: rgb(253,245,236) cream in light and rgb(53,42,34) in dark, with radius 0. They sit on a glass-floating dialog (translucent plus backdrop blur), which gives hard bright or dark stripes with square corners inside a 16px plate. When pinned, the port's top mask feathers the plate's own top edge ('Navigation' fades out in the 04/05 frames), and the previous row's key cap peeks out under the thin plate (05 light, under 'Navigation'). The heading is also the same size as its rows (16.4px at 1440 and 14px at 390, weight 600 vs 400) and in the muted colour. It reads weaker than the rows it names while shouting through the plate.
- *Expected:* glass idiom: surfaces are glass tiers, and a plate inside a card follows the concentric radius relay (DESIGN.md §context relay). The consumer's own R-7 intent: the heading leads its rows. A sticky header in a masked port must not be faded by the port's own mask.
- *Owner:* CONSUMER demo/components/instrument/shell/KeyboardShortcutsModal.vue:162 (`sticky top-0 bg-popover -mx-2 px-2 py-1`) — all states, both themes, both viewports; most visible in 01 and in the 04/05 scrolled frames
- *Fix:* Drop the opaque sticky plate. Use static group headings with a step up in weight/rung (or a hairline separator per group), and let the FadingScroll mask be the only edge treatment. If sticky must stay, use a glass tier/veil token (not bg-popover), inset by the fade width, with a radius on the relay.

**UIA-KF-073 · HIGH · Cube orbit shortcuts render as the developer event-code tokens 'KeyX', 'KeyY', 'KeyZ'** [C]
- *Page · state:* keyboard-shortcuts-modal — finding `ksm#3`
- *Frame:* 05-scrolled-bottom-cube-1440-light-crop.png, 04-scrolled-mid-cube-1440-dark-crop.png, 11-wheel-end-cube-1440-light.png
- *Observed:* The key caps read 'KeyX', 'KeyY' and 'KeyZ' in mono beside 'Constrain orbit to the X axis (hold)'. The sr-only twin speaks 'KeyX'. The same leak is latent for 'Shift+Alt+KeyF' (KeyframesAddDialog.vue:266) whenever that dialog is open.
- *Expected:* A shortcut reference shows the key the user presses ('X'). Every other cap on this surface goes through the producer formatter, and it should own code-to-glyph mapping the way it owns platform glyphs.
- *Owner:* GLASS @mkbabb/glass-ui/keyboard formatComboParts (does not normalise KeyboardEvent.code tokens Key[A-Z]/Digit[0-9] although registerShortcut accepts them) + CONSUMER demo/scenes/cube/orbital-drag/OrbitalDrag.vue:292 (registers `code` strings) — #/cube, every viewport and theme, scrolled to the Cube group
- *Fix:* GLASS: formatComboParts/formatCombo (and the accessible-name companion already on the relay) map Key*/Digit* codes to their letter or digit. Until then the consumer could register with a label-bearing display hint, but prefer the producer fix. Do not rename the codes (they are layout-independent on purpose).

**UIA-KF-074 · HIGH · The dark-theme destructive button label contrast is 3.07:1** [C]
- *Page · state:* clear-all-confirm-dialog · CONFIRMED (computed) — finding `cac#4`
- *Frame:* 01-open-1440-dark-crop.png · 01-open-390-dark.png
- *Observed:* The 'Clear & reload' label is 16.4px/650, which is not large text. Its contrast is 3.07:1 in dark, against 4.69:1 in light. The label reads washed out against the coral fill.
- *Expected:* 4.5:1 for a primary button label below 18.66px bold (WCAG 1.4.3). The HEAD dark arm flips to dark ink.
- *Owner:* CONSUMER (pin) — keyframes package.json:78 pins @mkbabb/glass-ui 7.0.0; cured in glass ≥8/10.0.1 (HEAD dark-arm.css:139-140 destructive) — open, dark, 1440 and 390
- *Fix:* Adopt the glass-ui HEAD tokens. Do not override --destructive-foreground in the consumer.

**UIA-KF-075 · HIGH · Paused-state Play (the primary CTA) is the lowest-contrast control in the dock: white glyph on rainbow-pastel = 1.38–2.10:1** [C]
- *Page · state:* transport-dock · paused — finding `trd#3`
- *Frame:* crop-31-square-expanded-1440-dark.png, crop-13-cube-timeline-expanded-1440-light.png, 61-square-390-sheet-geometry-expanded-light.png; probe-contrast.json
- *Observed:* Glyph rgb(255,255,255) against the pastel stops red 1.97, orange 1.75, yellow 1.38, green 1.66, blue 1.98, indigo 2.10, violet 1.93. The paused Play reads as washed out and disabled, most of all in dark next to the solid-violet Play in the PlaybackRibbon.
- *Expected:* WCAG 2.2 SC 1.4.11 non-text contrast ≥3:1 for a control's identifying glyph. Glass tokens should ship a foreground pair with every fill.
- *Owner:* GLASS glass-ui src/styles/utilities/btn.css:119-140 (rainbow-pastel has no paired foreground; the header endorses it for 'the play + Apply buttons') + CONSUMER TransportDock.vue:51-53 / :207-209 (text-white hard-coded) — every scene, paused, 1440+390, light AND dark (the ramp is theme-invariant)
- *Fix:* Glass: pair rainbow-pastel with a dark foreground token (e.g. --rainbow-pastel-foreground → foreground), or render the idle state as a vivid ring around a neutral glass fill. Consumer: drop text-white and inherit the pair.

**UIA-KF-076 · HIGH · The closed controls panel stays in the tab order: focus lands on invisible inputs** [C]
- *Page · state:* cube-scene · panel closed + keyboard — finding `cu#4`
- *Frame:* docs/tranches/X/audit/ui-evidence/keyframes/cube-scene/15-panel-closed-tab4-1440-light.png; 11-kbd-tab4-1440-dark.png; focus-probe.json
- *Observed:* After closing the panel, Tab #2..#8 walk into the hidden pane: the panel div at x=-160, the inputs at x=-34, alternate, forwards, and Edit easing curve. Each has an opacity-0 ancestor, inert=false, and :focus-visible=true, so the focus ring is invisible.
- *Expected:* A collapsed surface leaves the tab order (inert). Glass's own drawer renders its collapsed layer inert (the comment at ChromeDock.vue:587 says so), so the desktop pane should match.
- *Owner:* CONSUMER — the pane host outside the cube files: demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue:34-43 (collapsed pane not `inert`), toggled from demo/app/dock/ChromeDock.vue:539 — cube-scene, 'Controls panel' toggled closed, 1440 light/dark
- *Fix:* Set `inert` on the collapsed desktop pane, or unmount it, and restore focus to the toggle. Never apply.

**UIA-KF-077 · HIGH · Ribbon Reset/Fixed buttons wear a one-off rounded-lg skin that the shared ribbon removed on purpose** [C]
- *Page · state:* cube-matrix-controls-tab · ribbon Reset + Fixed/Free lock toggle — finding `cm#4`
- *Frame:* 01-rest-1440-light.png, 10-ribbon-focus-visible-1440-dark.png
- *Observed:* The h() Buttons carry the class string `h-8 gap-1.5 cursor-pointer text-small font-medium px-3 rounded-lg`, have no emphasis, and use w-3.5 h-3.5 icons. Measured: radius 8px (a Tailwind literal that is on neither canon rung: not the stadium, not --radius-lg 10px) and height 36px (h-8 never lands). Every sibling ribbon verb (Copy/Format/Export/Apply, Snapshot/Import/Export/Add CSS) in RibbonBar.vue:16-98 is a bare `size="sm" emphasis="secondary"` with icon-sm. RibbonBar.vue:136-140 records that this exact token set was retired as dead, unreachable and duplicative.
- *Expected:* Owner: 'NO one-off instances'. A ribbon verb is a glass Button size=sm emphasis=secondary with a stadium corner (DESIGN.md:385 --radius-control) and no class of its own.
- *Owner:* CONSUMER demo/scenes/cube/CubeScene.vue:146-160 — ribbon Reset + Fixed/Free, 1440 light+dark
- *Fix:* Render the two verbs exactly like RibbonBar's: size='sm' emphasis='secondary', no class, icon-sm. Better still, declare the cube's ribbon verbs as data ({label, icon, action, pressed}) and let RibbonBar render them, so a scene cannot re-skin a verb.

**UIA-KF-078 · HIGH · The selected option is never marked in any Select on the surface (easing, direction, fill mode)** [A]
- *Page · state:* controls-tab-channel-options · select open — finding `co#3`
- *Frame:* 02-cube-easing-select-open-1440-{light,dark}.png (ease-in-out aria-selected, no mark), 06-cube-direction-open-1440-light-crop.png (alternate selected, no mark), R3-after-pencil-peek-select-open-1440-light.png; probe: dot 8x8 bg rgba(0,0,0,0), row data-state=checked
- *Observed:* aria-selected/data-state=checked are set, and the 28px start gutter is reserved, but nothing paints in it. The open list gives no cue to the current value. Only a keyboard focus ring (04) or a hover tint ever marks a row.
- *Expected:* The glass Select row shows its selected mark (the start-gutter dot) as the DESIGN menu-row contract requires.
- *Owner:* GLASS root already fixed at HEAD (SelectItem.vue:82 bg-current) → CONSUMER (pin); consumer must also align pane vs dock row marks — #/cube Controls tab: easing grouped Select open; direction LabeledSelect open
- *Fix:* Route to the glass-ui session: confirm the bg-current fix is in the next cut. The consumer then bumps @mkbabb/glass-ui past 7.0.0 and re-verifies. No consumer override.
- *Confirm amendment:* The invisible mark is confirmed (probe: dot bg rgba(0,0,0,0) on a data-state=checked row). The stated cause is wrong. The 7.0.0 dist select-BcBAyLXA.js:282-283 does paint the dot, with the inline style `background-color: var(--select-dot-color, var(--glass-accent, currentColor))`. It comes out transparent because the producer declares the registered property --glass-accent as var(--color-gold) before --color-gold exists. keyframes' own demo/app/dock/ChromeDock.vue:47-58 measured and documented this and binds --select-dot-color: currentColor at :457 and :506. Glass HEAD SelectItem.vue:82 (bg-current, chain removed) is the root fix, so the owner stays GLASS. 'No consumer override' clashes with the app's own precedent, though: the dock Selects mark their rows and the pane Selects do not, which is an inconsistency inside one app. Until the bump, bind the same variable on the pane SelectContent or on one shared wrapper.

**UIA-KF-079 · HIGH · Editor title is the largest type on the card, wraps to two lines, and breaks the notice mid-word** [C]
- *Page · state:* controls-timing-function-detail · open, converted / departure — finding `tf#3`
- *Frame:* 03-detail-converted-from-1440-light-crop.png, 10-departure-engine-native-1440-light-crop.png
- *Observed:* 'cubic-bézier' is set at 32.9px/700 and takes two lines (189x79). The notice is squeezed between title and Back and wraps 'from ease-in-/out'. The departure notice runs three lines. Every other label on the card is 16.4px. The heading, which only names a mode, gets more visual weight than the curve.
- *Expected:* A sub-pane header at the sibling rung: the same card's 'advanced' sub-pane uses a 16px muted label beside a LEFT Back. One line, with the provenance notice as a caption under it.
- *Owner:* CONSUMER (TimingFunctionPanel.vue:13-14 h3.text-title in a justify-between row; :20-29 notice p) — detail header, 1440 + 390, both themes
- *Fix:* Use one sub-pane header (Back first, then title at the label/subheading rung). Put the provenance notice on its own caption line under the header, shortened to e.g. 'from ease-in-out' / 'approximating ease-in-bounce'.

**UIA-KF-080 · HIGH · Inline, one-off easing editor that replaces the controls form and doesn't match its sibling sub-pane** [C]
- *Page · state:* controls-timing-function-detail · open / return — finding `tf#4`
- *Frame:* 03-detail-converted-from-1440-light-crop.png vs ../controls-tab-channel-options/10-cube-advanced-1440-light-crop.png; 08-returned-to-controls-1440-light-crop.png
- *Observed:* Opening the pencil swaps the whole controls form out for an inline curve editor in the same card. Its header has title LEFT and dismiss RIGHT at the display rung. The advanced sub-pane in the same card has Back LEFT and a muted label title. The same EasingPicker is also hosted, with different chrome, in the Easing scene's sidebar. The owner's instruction (2026-09-23) is that animation editing uses the separate-pane idiom (cube, amiga, …) with no one-off editors or chrome.
- *Expected:* One editor host and one sub-pane chrome across all animation views (COHESION §0bl). The timing-function editor either lives in the app's separate editor pane or uses exactly the sub-pane header its sibling uses.
- *Owner:* CONSUMER (ChannelOptions.vue:552-571 detail panel-row swap; TimingFunctionPanel.vue:30-40 Back on the RIGHT vs ChannelOptions.vue:597 advanced Back on the LEFT; demo/scenes/easing/EasingSidebar.vue:35 is a second host of the same picker) — Controls card; compare with the 'advanced' sub-pane (controls-tab-channel-options/10-cube-advanced-1440-light-crop.png) and the Easing scene sidebar
- *Fix:* Create one sub-pane header (Back LEFT + label title) used by both sub-panes. Decide at orchestration whether the per-channel curve editor moves into the separate keyframes/editor pane host shared with the Easing scene, and drop the in-card swap if so.

**UIA-KF-081 · HIGH · The label column changes width with the weight readout: showing or hiding weight moves every control 27px sideways, and changing the value nudges them again** [C]
- *Page · state:* controls-advanced-layer — finding `adv#2`
- *Frame:* 03-amiga-advanced-pane-1440-light-crop.png vs 05-amiga-blend-add-weight-hidden-1440-light-crop.png vs 07-amiga-weight-070-focus-1440-light-crop.png; capture-log.json grid.cols
- *Observed:* Grid columns '[label] 90.16px [value] 265px' while 'weight 1.00' is shown. With op=add or on cube: '[label] 62.9px [value] 292px', so blend, z-index and switch jump 27px left. At weight 0.70 the column widens again and the controls shift about 3px. There is almost no space in 'weight1.00'.
- *Expected:* A stable label column (§LABEL-subgrid gives one derived width from static labels). The value readout sits in its own tabular-nums cell beside the control, as the z-index integer does.
- *Owner:* CONSUMER — demo/components/instrument/transport/channel-controls/LayerConfigPanel.vue:103 (:label=`weight ${weight.toFixed(2)}` puts the value inside the label) under demo/styles/design-idioms.css:308-314 (.labeled-field-grid [label] auto column). GLASS co-owner: LabeledSlider has no readout/value slot (the SS-6 producer ask cited in LayerConfigPanel.vue:88-94) — amiga advanced pane: blend replace→add, weight 1.00→0.70; cube multi-target compared with amiga
- *Fix:* Make the label the static 'weight'. Render the value as a trailing readout: ask glass for a LabeledSlider readout/valueText slot (route to glass-ui), or show it in the value track with font-variant-numeric: tabular-nums and a fixed ch width.

**UIA-KF-082 · HIGH · On multi-target scenes the advanced pane is a dead end: blend and enabled are disabled with no reason given, and the one live control (z-index) has no effect** [C]
- *Page · state:* controls-advanced-layer — finding `adv#4`
- *Frame:* 10-cube-advanced-multitarget-1440-light-crop.png, 10-cube-advanced-multitarget-390-dark.png
- *Observed:* The blend select and the enabled switch render at opacity 0.5 (switch still ON) with no helper text or tooltip explaining why. Weight is absent. z-index is fully live, but renderMultiTarget interpolates each independent entry the same way whatever its order, so stepping it changes nothing on screen. The user navigates into a pane where nothing works.
- *Expected:* A control is offered only when it does something (LP-6/LP-17 'honest disabled posture'). When disabled, the reason is stated once.
- *Owner:* CONSUMER — LayerConfigPanel.vue:68-74 (z-index is disabled only on !enabled, never on !blendAvailable) and ChannelOptions.vue:519-542 (the advanced row is offered when nothing in the pane can act); engine: src/animation/group/entries.ts:91 renderMultiTarget never reads entry.layer, and group.ts:232 zIndex only sorts independent targets — cube and square, advanced pane, all viewports and themes
- *Fix:* When !blendAvailable, either hide the 'advanced' row entirely or render one muted line in the pane ('layer compositing applies to single-target groups') and disable z-index along with blend and enabled.

**UIA-KF-083 · HIGH · The preview stage shows a mis-scaled clip of the scene element, and paints even with 0 keyframes** [C]
- *Page · state:* timeline-tab · empty, single, populated and selected; cube and amiga; 1440 and 390 — finding `tl#3`
- *Frame:* 01-empty-1440-light.png; 06-populated-1440-light-crop.png; 10-selected-1440-light.png; 30-amiga-timeline-1440-light.png; 43-drawer-open-timeline-390-light.png
- *Observed:* The inert clone is not fitted: its box is 61x221 (matrix3d) inside a 96px-high stage, so the stage shows arbitrary shards of cube faces (red/green wedges, a lone '1'). On amiga the stage is blank. Clone faces cover the keyframe's authored background-color, so the pose cannot be read. With 0 keyframes the stage still paints a cube fragment beside 'No keyframes yet'.
- *Expected:* The stage shows the subject fitted to the tile (object-fit: contain semantics) at the keyframe's pose, or nothing, with the empty state owning the space when there are no keyframes. --radius-media is the tile role (DESIGN.md:385).
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/timeline/KeyframeTimeline.vue:170-176 (stage) and utils/timelineEngine.ts:31-45 (createPreviewSubject clones at scene scale with no fit).
- *Fix:* Scale the subject to the stage from its own bounding box (transform: scale(min(stageW/w, stageH/h))). Hide the stage while keyframes.length < 2, or swap it for the empty state.

**UIA-KF-084 · HIGH · 'Expand' does not widen the timeline: cell stays in the 475px rail and takes height from the stage** [C]
- *Page · state:* timeline-expanded · expanded — finding `tx#4`
- *Frame:* P2-expanded-populated-1440-light.png; 01-expanded-empty-1440-dark.png
- *Observed:* The cell is 475px wide at x 43. The track is 441px, no wider than collapsed. The stage row shrinks to 252px, so the ~880px stage column below the subject sits empty while the subject is pushed up into the top-dock band. The seat brief describes this as a 'full-width timeline'.
- *Expected:* Expand buys horizontal resolution for the track (the primary content). Hierarchy: the track dominates.
- *Owner:* CONSUMER — AnimationControlsGroup.css:219-222 (.timeline-expanded-cell grid-column: rail; grid-row: bottom) — timeline-expanded 1440
- *Fix:* Span [bottom] across rail and stage (full-width bottom panel above the transport band), or drop the expand mode if rail-only is intended.

**UIA-KF-085 · HIGH · Expanded surface is a hand-rolled square glass-wash strip, and the glass Card inside it has its skin removed** [C]
- *Page · state:* timeline-expanded · expanded — finding `tx#5`
- *Frame:* 01-expanded-empty-1440-light.png; P2-expanded-populated-1440-dark.png
- *Observed:* Computed: cell radius 0px, glass-wash bg, blur(1px), top border only. The inner Card has bg transparent, border 0, no shadow. The surface reads as an unframed slab next to the rounded ribbon card.
- *Expected:* A glass primitive surface on the canon role table: --radius-panel 12px for panels or --radius-card 16px for cards (glass-ui DESIGN.md:386-389). No class overrides that strip a Card's material.
- *Owner:* CONSUMER — AnimationControlsGroup.vue:99 ('border-t border-border/50 glass-wash px-4 py-3', radius 0); KeyframeTimeline.vue:3-4 (props.expanded → 'border-0 shadow-none bg-transparent' on <Card>) — timeline-expanded, all
- *Fix:* Render the expanded timeline in a glass Card or panel at its own tier and radius; remove the expanded-mode class overrides.

**UIA-KF-086 · HIGH · 390: translucent cell over the full-bleed stage lets the subject show through the preview and track** [C]
- *Page · state:* timeline-expanded · expanded, 390 — finding `tx#6`
- *Frame:* 01-expanded-empty-390-light.png; 06-transport-dock-expanded-collapse-chip-390-light.png; 12-reexpanded-placeholder-view-390-light.png; P3-expanded-selected-390-dark.png
- *Observed:* The cube renders through the preview stage and the diamond track, a second subject under the timeline content. The cell also runs into the bottom-sheet band.
- *Expected:* Content surfaces over the stage use a glass tier with enough blur or opacity to keep text and track legible.
- *Owner:* CONSUMER — AnimationControlsGroup.css:179-184 (fixed cell over the stage) + AnimationControlsGroup.vue:99 (glass-wash, blur 1px) — timeline-expanded 390 light and dark
- *Fix:* Use the glass panel material (stronger tier) and anchor the cell above the sheet reserve.

**UIA-KF-087 · HIGH · The spring twin's decorative sweep plays on a failed add and leaves a dead band at the dialog foot** [C]
- *Page · state:* css-paste-dialog · spring Add keyframes: rest and submit — finding `cpd#4`
- *Frame:* 23-spring-add-submit-sweep-1440-light-crop.png (progressBar transform scaleX(0.17) while the add failed), 21-spring-add-open-1440-light.png / 22-spring-add-parse-error-390-light.png (the empty band under the button)
- *Observed:* The success flourish animates even when the add throws. At rest the scaleX(0) bar plus mt-2 still takes space: the plate is 504px tall against 472px for the Timeline twin, leaving empty space under the action at both viewports. It is chrome that exists in only one of the two twins.
- *Expected:* Feedback only reports what happened (KF-KE-21 already found the bar 'measures NOTHING'). Twins of one shell share the same chrome (COHESION §0bl: no one-off chrome).
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/keyframes/components/KeyframesAddDialog.vue:49-53 (the `.progress-bar` feedback slot) and :245 (animateProgressBar fired on every submit), demo/styles/design-idioms.css:184-185
- *Fix:* Delete the sweep and the `feedback` slot. If motion is wanted, put it on the resolved success in the one shell.

**UIA-KF-088 · HIGH · The '2-axis coordinate field' draws only the X axis: stage-field-x overrides stage-field-y** [C]
- *Page · state:* square-scene · all — finding `sq#3`
- *Frame:* 00-idle-box-1440-light.png, 00-idle-box-1440-dark.png, 00-idle-box-390-light.png
- *Observed:* Only vertical quarter lines are drawn (x = 25/50/75%). There are no horizontal lines and no y-home crosshair. The faint 80px grid visible behind is the page background showing through the translucent plate, not the field. SquareInstrument's own docblock calls the field the thesis ('the missing axes'), yet one of its two axes is missing.
- *Expected:* Both axes drawn (the -y idiom's horizontal quarter lines plus the baseline, and the -x verticals), with the 50% lines forming the home crosshair.
- *Owner:* CONSUMER — demo/scenes/square/SquareInstrument.vue:10 (both classes on one element) + demo/styles/design-idioms.css:249-264 (both classes set `background-image`, and -x comes later so it wins) — square-scene, every state, both viewports and themes
- *Fix:* Make the idiom stack: e.g. `.stage-field-x.stage-field-y { background-image: <x layers>, <y layers> }`, or have each class write a custom property (`--field-x`/`--field-y`) that a single `background-image: var(--field-x, none), var(--field-y, none)` composes. Not applied.

**UIA-KF-089 · HIGH · Legend and discovery hints are hidden under the controls drawer at 390, so the tumble/tour hint states are invisible on phones** [C]
- *Page · state:* square-scene · tumble hint shown / tour hint shown — finding `sq#4`
- *Frame:* 03-settled-tumble-hint-390-light.png, 05c-kbd-nudged-settled-tour-hint-390-light.png, 07c-tab-keyframes-390-dark.png; capture-log 390 legend rect [76,668,293,58] vs drawer top ≈680
- *Observed:* The legend sits at y 668–726, but the drawer sheet starts at about y 680. 'spring-chased · drag the box…' is cut in half, and the 'x·y ∈ [-1,1]' line and the 'double-tap to tumble' / 'press C to trace the field' hints are fully covered. The progressive-disclosure state the scene builds for these eggs never shows on a phone.
- *Expected:* Stage chrome sits inside the visible part of the stage (above the drawer's peek height). DESIGN.md:171 names the square's progressive-disclosure legend as a source idiom.
- *Owner:* CONSUMER — demo/scenes/square/SquareInstrument.vue:307-322 (.square-legend bottom:1rem of the full-bleed stage) vs the subject-mode drawer overlay (demo/app/scene/scenes.ts:43 stageMode 'subject') — square-scene 390x844, light+dark, tumble-hint and tour-hint states
- *Fix:* Anchor the legend to the visible stage (bottom offset = drawer peek, via the stage-mode inset token the overlay already computes), or move the legend to the top-right opposite the telemetry at the phone breakpoint. Not applied.

**UIA-KF-090 · HIGH · Instrument field does not map to the travel envelope, the tether is hidden under the box, and most of the 1440 plate is dead space** [C]
- *Page · state:* square-scene · 2-axis spring drag, envelope tour — finding `sq#6`
- *Frame:* 02a-drag-mid-1440-light.png, crop-02a-drag-mid-1440-light-900-200.png, crop-05e-kbd-c-envelope-tour-mid-1440-light.png, 00-idle-box-1440-light.png
- *Observed:* The plate is 878×646, but travel is ±110px. At x=+1,y=−1 the box centre lands between the 50% and 75% plate lines, so the quarter ticks and the legend 'x·y ∈ [-1,1]' describe the plate, not the coordinate space. The box half-size (96px × 1.12) is larger than the travel (110px), so the violet rubber-band tether from home to the box centre is almost always underneath the opaque box: only a 2px stub shows at the box corner (crop). The box never gets within about 230px of the plate's left or right edges.
- *Expected:* The field ticks mark the [-1,1] envelope (or the travel scales to the plate), and the tether shows the displacement: the subject dominates a plate sized to its reach.
- *Owner:* CONSUMER — demo/scenes/square/SquareScene.css:29 (--square-travel clamp max 6.875rem) and :69 (--size up to 12rem); SquareInstrument.vue:10-17 (field at plate quarters, tether sized to travel) — square-scene 1440, drag / far-corner / C-tour
- *Fix:* Size the field element to the travel envelope (2×travel + box) instead of the whole plate, or derive --square-travel from the stage's inline size (container query units) so ±1 reaches the plate quarters. Draw the tether from the home crosshair to the box edge (not the centre), or raise it above the box with a knockout. Not applied.

**UIA-KF-091 · HIGH · Clutter: the literal, the copy button, the curve selection and the transport are each shown twice, and the engine-native state contradicts itself** [C]
- *Page · state:* easing-scene-specimens · load; ease-in-bounce selected — finding `es#7`
- *Frame:* 00-load-1440-light.png, 06-select-ease-in-bounce-1440-light.png, 07e-copy-hover-tooltip-1440-light.png
- *Observed:* The header shows 'cubic-bezier(0.25, 0.10, 0.25, 1.00)' with 'Copy easing literal'. The picker shows 'cubic-bezier(0.25, 0.1, 0.25, 1)' with 'Copy curve literal': the same literal in two formats with two copy buttons. The tiles, the family filter and the picker's 'Easing preset' Select all select the same curve. There are two play controls (ribbon Play/Reverse and dock Play/Reset). With ease-in-bounce selected, the header prints the name twice ('ease-in-bounce ease-in-bounce'), and the picker shows 'Pick a curve' with a linear cubic-bezier(0, 0, 1, 1) curve.
- *Expected:* One authority per fact. Each affordance earns its place (audit law: CLUTTER). The editor never draws a curve that is not the selection.
- *Owner:* CONSUMER demo/scenes/easing/EasingTarget.vue:24-40 + EasingSidebar.vue:35-56 (plus GLASS ask: EasingPicker option to suppress its readout and preset Select when the host owns them) — #/easing header + rail
- *Fix:* Keep the header literal and its copy button, and suppress the picker readout. Tiles are the one selector, so drop or hide the picker preset Select here. For engine-native names, drop the duplicated literal and put the picker in a disabled/ghost 'not bezier-expressible' state rather than drawing linear.

**UIA-KF-092 · HIGH · 'ease-in-bounce' is not a bounce: value.js easeInBounce is a smooth overshoot curve, so the Bounce family's only specimen, its sparkline and its header name are wrong** [M]
- *Page · state:* easing-scene-specimens — finding `esm0`
- *Frame:* 06-select-ease-in-bounce-1440-light.png (the sparkline rises and plateaus like an ease-out-back), 0307-filter-bounce-1440-light.png
- *Observed:* Sampled easeInBounce(x) for x=0..1 step .1: 0, .534, .800, .971, 1.082, 1.149, 1.180, 1.178, 1.146, 1.087, 1.0. It has no bounces and does not start slowly; it overshoots by 18%. Under the Bounce filter the lone ball is pushed about 148px, past its 141px stage (127 × 1.165), and is clipped. That is the real cause of the invisible ball the audit attributed to rail width.
- *Owner:* VALUE.JS library (dist/subpaths/easing.js exports g as easeInBounce and 'ease-in-bounce') + CONSUMER demo/utils/reference-data/easingGroups.ts:91 ('bouncing ramp up') — #/easing gallery, Bounce filter, header
- *Fix:* Correct the value.js curve (a real ease-in-bounce, the mirror of the ease-out bounce) or rename it to what it is. In the tile race, reserve rail room for any curve whose range exceeds [0,1] (the back family and this one).

**UIA-KF-093 · HIGH · In the catalogue-gap state the picker shows a linear curve and copies cubic-bezier(0, 0, 1, 1) while ease-in-bounce is selected** [C]
- *Page · state:* easing-curve-tab · catalogue gap — finding `ec#4`
- *Frame:* 08-catalogue-gap-1440-light.png, 08-catalogue-gap-1440-dark-crop.png, 08-catalogue-gap-390-light.png
- *Observed:* The header says ease-in-bounce, but the plot draws a straight diagonal, the readout says cubic-bezier(0, 0, 1, 1) with a live copy button, and the preset trigger shows the placeholder 'Pick a curve'. Copying from the editor gives linear, not the selected curve.
- *Expected:* The editor shows the selected curve, or clearly marks itself as read-only or departed. The glass README says EasingCurve is the DISPLAY primitive for curves the picker cannot author.
- *Owner:* CONSUMER — demo/scenes/easing/EasingSidebar.vue truth() bezier branch (returns demo.bezierControlPoints, which is linear after a tile pick) + the catalogueGap render at :48-58 — Curve tab · ease-in-bounce (engine-native) selected
- *Fix:* In the gap state, render <EasingCurve> with a stroke sampled from the engine function (display only) and hide or disable the picker's copy. Seat the editable picker on the first 'edit' gesture, which is the departure. Keep the header literal as the one copy.

**UIA-KF-094 · HIGH · Derby lane tags wrap to two lines and overprint each other (illegible)** [C]
- *Page · state:* spring-scene-solver · derby active (double-tap rail) — finding `ss#5`
- *Frame:* 03a-derby-active-450ms-1440-light.png; 03a-derby-active-450ms-390-light.png; 03b-derby-active-950ms-1440-dark.png
- *Observed:* 'smooth · ζ0.86' etc. does not fit the 100px gutter, so each tag wraps to two lines on a 14px lane. The four tags collide into an unreadable stack at the right edge, over the ghost marker.
- *Expected:* Each lane label is readable on one line and aligned to its lane.
- *Owner:* CONSUMER — demo/scenes/spring/SpringTarget.vue:803-815 (.derby-lane height 0.9rem, --derby-tag-gutter 6.25rem) + :849-862 (.derby-lane-tag width = gutter, no nowrap); tag text at :197-199 — spring, derby active, 1440 and 390, both themes
- *Fix:* white-space:nowrap plus a gutter sized to the longest tag (or drop the ζ into a title), or move the tags to the lane start as a legend. At 390, use name-only tags.

**UIA-KF-095 · HIGH · Removing a stop throws an uncaught BrowserScalarResolutionError and the exit motion stalls >2.8s with a duplicated card list** [A]
- *Page · state:* spring-physics-tab · card 'Remove the keyframe at 50%' — finding `spt#7`
- *Frame:* 13a-remove-hover-tooltip-1440-light.png, 13b-after-remove-50-1440-light.png, remove-probe.json, retime-probe.json (step 'remove 50%')
- *Observed:* pageerror: 'BrowserScalarResolutionError: Could not resolve "translateX(0%) rotate(0deg)" for "transform" to a numeric CSS scalar'. Warning: 'The keyframe's exit motion did not settle within twice its declared length (1400 ms)'. Two seconds after the click the list shows 9 cards (0%, 0%, 25.1%, 50%, 50%, 75%, 75%, 100%, 100%) with the 50% stop still present. It settles to 4 later.
- *Expected:* Remove animates out the one card in under 300ms and throws nothing. The other cards keep identity and don't re-enter.
- *Owner:* CONSUMER — demo/components/instrument/keyframes/components/KeyframeCardList.vue:40 (list keyed/transitioned per frame) plus the engine at src/animation/resolve/browser.ts:111 via compile/parse-facade.ts:69 (the throw)
- *Fix:* Stable per-stop keys that survive reprojection, and a leave transition bounded by a token duration. Guard the scalar probe for composite transforms (or route composite transforms through the decomposer). Moot for this page if the inline editor is deleted, but the engine throw is general.
- *Confirm amendment:* The throw and the 1400ms not-settled warning are confirmed in both remove-probe.json and retime-probe.json. The card-list detail is wrong. The 9-card snapshot at 'remove 50%' is 0,0,25.1,50,50,75,75,100,100: every stop except the retimed one appears twice. The list is re-keying all cards (leave+enter of the whole list), not just a lingering 50% stop, which strengthens the stable-key fix. It settles to 4 cards (remove-probe cards).

**UIA-KF-096 · HIGH · The 'physics curve' on show is a ~120ms pop: a 2s spring sample is replayed over a pinned 500ms, then ~300ms of invisible dead time** [A]
- *Page · state:* spring-discrete-view · visible ⇄ dismissed — finding `sdv#4`
- *Frame:* 04a-dismissing-140ms-1440-light.png, 05a-revealing-140ms-1440-light.png, probe2-log.json (exit/enter samples), 02-entry-visible-rest-1440-light.png (artifact: stops 44%→96% all 1.00000)
- *Observed:* Smooth preset (response 0.5s, ζ 0.86): on exit, opacity is 0.47 at 93ms and 0.03 at 143ms, and transform settles by about 290ms. The card is then invisible but still display:flex and hit-testable until about 590ms. Entry is fully opaque by 139ms. The linear() plateaus at 1.00000 from 44% on (13 of 26 stops are redundant). The card copy says 'enters + exits on a physics curve', and the footer has to add a disclaimer ('— response is not expressed on this card').
- *Expected:* The showcase is the product: the card should move over the spring's real time (≈ the sampled span), so response visibly changes the motion and the artifact carries no dead stops.
- *Owner:* CONSUMER demo/scenes/spring/useCompiledEntry.ts:55 (duration: 500) + demo/scenes/spring/StartingStyleTarget.vue:156 (ENTRY_CONTRACT.durationMs 500), against src/animation/physics/spring/css/linear-stops.ts:49 (samples over maxDuration = 4 × response) — spring-discrete-view · dismissing / revealing · all viewports
- *Fix:* Use one duration derived from the sample span: either duration = 4 × response (the fork ENTRY_CONTRACT already prices), or call springLinearStops with maxDuration = durationMs/1000 and trim the settled plateau. Write the number once in both ENTRY_CONTRACT and useCompiledEntry, then delete the 'response is not expressed' line.
- *Confirm amendment:* The numbers are confirmed. linear-stops.ts:49 uses maxDuration = response×4 (2s for Smooth), useCompiledEntry.ts:55 and ENTRY_CONTRACT.durationMs (StartingStyleTarget.vue:156) pin 500, probe2 exit gives opacity 0.47@93ms / 0.03@143ms and display:none @593ms, and 13 stops from 48% to 96% sit at 1.00000. Amendment: this is a DOCUMENTED, deliberate decision, not an oversight. StartingStyleTarget.vue:109-117 (KF-SST-2) records that springLinearStops is self-similar under response, keeps the duration pinned to the artifact's, and prices the fork calc(response*4s), which reaches 4.8s at the slider max. So this is an owner ruling to reopen, not a bug fix. The audit's option (b), maxDuration = 0.5s, has a caveat: for any response above about 0.2s the sampler would truncate before settling, so the curve would jump to 1 at 100%. It needs a settle-aware trim, not just a shorter window.

**UIA-KF-097 · HIGH · The stage card at 1440 is cluttered and upside-down: the code block and a 748px accent bar dominate the demo, with three lines of developer meta-copy** [C]
- *Page · state:* spring-discrete-view · visible, dismissed — finding `sdv#6`
- *Frame:* 02-entry-visible-rest-1440-light.png, 02-entry-visible-rest-1440-dark.png, 32c-footer-line-crop-1440-light.png, 32d-hello-card-and-toggle-crop-1440-light.png
- *Observed:* The demo card is 324×114. The toggle is a 748×40 full-accent stadium, the loudest mark on the page. The artifact is 748×256 of monospaced numeric stops and scrolls to 1069px. Meta copy appears three times: 'emitted by springLinearStops()' names a different emitter than 'compileToEntry() artifact' for the same block, and the footer reads 'eased by Smooth ζ 0.86 · 500 ms — response is not expressed on this card'. The artifact is plain muted mono, while the pane's editor right beside it is syntax-coloured.
- *Expected:* The primary content, the card entering and exiting, is the hero. The verb is an intrinsic-width control. The artifact is secondary (folded or capped) and uses the same code register as the editor. One caption carries the meta. (Owner: 'cluttered'; glass hierarchy DESIGN.md §L type scale.)
- *Owner:* CONSUMER demo/scenes/spring/StartingStyleTarget.vue:21-28 (header 'emitted by springLinearStops()'), :57-66 (toggle wears the transport skin; `.btn-playback { width:100% }` at demo/styles/playback-idiom.css:22 stretches it to 748px), :72-100 (always-expanded 256px artifact), :104-126 (footer meta line) — spring-discrete-view · Entry visible/dismissed · 1440 light+dark
- *Fix:* Give the demo card the stage (a larger viewport and a larger card). Use a plain glass <Button> without the btn-playback skin, at intrinsic width. Fold the artifact into a glass Collapsible or expandable-container with a copy action and highlight it with the editor's code tokens. Merge the header action and footer into one caption naming compileToEntry(). Delete the disclaimer once the duration is fixed.

**UIA-KF-098 · HIGH · One-off scene: no separate keyframes pane; an inline bespoke timing editor and in-card transport instead** [C]
- *Page · state:* sequence-scene · no controls pane (no Controls tab / panel toggle) — finding `seq#4`
- *Frame:* 02-top-dock-hover-no-controls-1440-light.png, 02-top-dock-hover-no-controls-390-light.png, 00b-storyboard-rest-1440-light.png
- *Observed:* The top dock offers only Scene + @mbabb: no Controls tab, no panel toggle, no Keyframes/Timeline surface. Timing is edited inline through five hand-rolled drag handles on the card, the reel and row-reset verbs sit in the card header, and the card carries its own master-clock scrubber that duplicates the Timeline pane's scrub.
- *Expected:* Owner OA-37 (COHESION §0bl, 2026-09-23): 'ensure that we have cohesion between all animation views… NO one-off instances'. The cube/amiga idiom is the stage plus a separate keyframes pane (Keyframes/Timeline tabs) plus the bottom transport.
- *Owner:* CONSUMER — demo/scenes/sequence/useSequenceDemo.ts facility (~:505-515, the lone 'Sequence' channel declares surfaces []) + demo/state/controlSurfaces.ts:106/:202 (the sequence special case) + SequenceTarget.vue:55-85 (reel/reset/badge in the card) + SequenceScrubber.vue (a second scrub rail) — top dock hover; whole scene
- *Fix:* Give the Sequence channel the standard surfaces (keyframes + timeline). Author the per-row `at:` offsets in the Timeline pane as segments/marks. Move the reel into the transport or controls and the row reset into the pane. The card becomes a pure stage (rows + playhead). Delete the sequence special case in controlSurfaces.

**UIA-KF-099 · HIGH · Six hand-rolled role=slider divs and a hand-rolled tick ruler where glass <Slider :marks> is the canon surface** [C]
- *Page · state:* sequence-scene · master-clock scrubber; per-row re-time — finding `seq#5`
- *Frame:* 00c-card-crop-1440-light.png, 05d-row2-kbd-focus-nudged-1440-dark.png, crop-scrub-kbd-focus-1440-light.png
- *Observed:* Every control is a styled div with its own keyboard map, drag seam, focus ring, grip (::after pill) and ARIA. The master rail has no visible track (8% tint), and its 36px ball overhangs the rail ends.
- *Expected:* glass DESIGN.md:11 'Component over CSS class. Interactive elements are Vue components…'. DESIGN.md:1327-1328 / timeline/README.md:17-18: 'the commanding playhead-with-ticks surface is <Slider :marks>'.
- *Owner:* CONSUMER — SequenceTarget.vue:146-157 (5 .seq-handle role=slider), SequenceScrubber.vue:22-41 (.seq-scrub role=slider + .progress-ball), SequenceAxis.vue (bespoke tick band); glass 7.0.0 ships Slider with `marks` (dist/components/slider/types.d.ts:21) — storyboard + master clock
- *Fix:* Master clock -> glass <Slider :marks='quarters' :step> with aria-valuetext in ms (it replaces SequenceAxis + SequenceScrubber). Row offsets -> glass Slider per row, or Timeline-pane segments per the cohesion row. If a gap remains (e.g. an externally painted thumb), relay it to glass BK and do not hand-roll it.

**UIA-KF-100 · HIGH · Success, error, info and warning are visually identical: tone is carried only by glyph shape** [C]
- *Page · state:* toasts · error, success, stacked — finding `to#2`
- *Frame:* toasts/sim-04-stacked-expanded-390-light-crop.png; sim-04-stacked-expanded-390-dark.png
- *Observed:* 'Invalid shared state' (error), 'No shared state found in URL' (error) and 'State restored!' (success) share the same plate colour, text colour and icon colour. The icon is rgb(251,250,248) in light and rgb(11,10,9) in dark for every type. Only a 16px ! vs ✓ glyph separates a failure from a success. warning ('Could not compile …') and info ('URL updated …') get the same treatment.
- *Expected:* glass-ui's shared feedback-tone register. Toast.vue:130-140 has the tone prop mapping to .feedback-tone .feedback-tone-{success|warning|info|destructive}: a bounded tint of the glass toward the house status token, a tone-keyed rim and a full-chroma glyph, with the body text kept --foreground.
- *Owner:* CONSUMER — DemoGlobalChrome.vue:40-48 (unstyled:true with no per-type class; every type gets the same bg-foreground/text-background) — stacked mixed error + success · 390 light + dark
- *Fix:* On migration, map sonner types to tone: success→'success', error→'destructive', warning→'warning', info→'info'. Supply a tone glyph (see the GLASS finding on the Toaster glyph).


## MEDIUM

**UIA-KF-101 · MEDIUM · At 1440 on spring the whole document scrolls with the rail, so the stage slides up and the fixed scene-switcher orb covers stage content**
- *Seats:* spring-physics-tab, spring-discrete-view — findings sptm0[M] sdv#12[C]
- *Frame:* `spring-discrete-view/33a-dock-after-dismiss-4s-1440-light.png`
- *Observed → expected:* The unbounded rail (row 007) makes the document the scroller on spring. Canon: shell contract (the stage is fixed, the rail scrolls).
- *Owner:* CONSUMER — shell grid (ControlsPaneWrapper / AnimationControlsGroup.css) on spring
- *Fix:* Cured by the rail bound in row 007. Add a test that document.scrollingElement.scrollHeight equals the viewport on every scene.

**UIA-KF-102 · MEDIUM · Cards are nested two and three deep with non-concentric corners: kf Card > picker glass-card > plot tile > literal plate**
- *Seats:* cube-matrix-controls-tab, controls-timing-function-detail, easing-curve-tab, spring-physics-tab — findings tf#6[C] ec#9[C] spt#14[C] cmm3[M]
- *Frame:* `easing-curve-tab/01-curve-rest-1440-light-crop.png`
- *Observed → expected:* Every nested plate carries its own border, shadow and 16px corner inside a 16px card with a 12px inset. Spring adds a nested 26rem scroll band inside the rail scroll. Canon: DESIGN.md:423 (nested corner = max(4px, ctx − inset)); glass EasingPicker README `surface="bare"`.
- *Owner:* CONSUMER — EasingSidebar.vue:35, TimingFunctionPanel.vue, SpringPhysicsFacet.vue (26rem band), cube matrix Card in Drawer
- *Fix:* Pass surface="bare" to EasingPicker after the repin, flatten facet bodies to one card, and never put a Card inside the Sheet or Drawer surface.

**UIA-KF-103 · MEDIUM · The surface-tab metadata registry ("THE ONE") is defined twice, and the dock, the in-panel strip and the facets read different copies**
- *Seats:* top-dock, dock-controls-tab-select — findings td#9[A] dct#2[A]
- *Frame:* `dock-controls-tab-select/05-cube-after-pick-Timeline-1440-light.png`
- *Observed → expected:* ChromeDock and TransportDock read surfaceTabs. ChannelControls, useSceneMachine and the @state re-exports read controlSurfaces. A label edit would split the dock from the in-panel strip. This is an explicit compatibility shim, which the owner's no-backwards-compat law forbids.
- *Owner:* CONSUMER — demo/components/instrument/surfaceTabs.ts:6-41 duplicates demo/state/controlSurfaces.ts:134-160/:189 (controlSurfaces.ts:122 "compatibility exports")
- *Fix:* One owner module. Migrate every importer, delete surfaceTabs.ts, and add no re-export.

**UIA-KF-104 · MEDIUM · The controls pane mounts one full copy per channel (three on cube) behind v-show, including three MatrixEditors and three timelines**
- *Seats:* cube-scene, cube-matrix-controls-tab — findings cu#16[C] cm#6[C]
- *Frame:* `cube-matrix-controls-tab/01-rest-1440-light.png`
- *Observed → expected:* Hidden copies keep listeners, ids and histories. They are the root of rows 019 (timeline ×3) and 008 (facet ×2).
- *Owner:* CONSUMER — ControlsPaneWrapper.vue:50-86 (v-for channel hosts behind v-show)
- *Fix:* Mount one host bound to the selected channel, and keep per-channel state in the store.

**UIA-KF-105 · MEDIUM · Controls cards carry a hard dark offset "stacked slab" cartoon shadow and lip instead of a glass surface**
- *Seats:* home-hero, dock-controls-tab-select, controls-advanced-layer, amiga-scene — findings hhm3[M] advm0[M] amm0[M] dctm3[M]
- *Frame:* `controls-advanced-layer/03-amiga-advanced-pane-1440-light-crop.png`
- *Observed → expected:* A 0-blur warm-ink offset stack under every controls card reads as a second card. The glass HEAD shadow.css:9-12 makes cel ink deliberate, but DESIGN.md §Cartoon shadows (:460-475) still shows a soft form (see the SelectContent row). Canon: DESIGN.md:49/:516 floating tier.
- *Owner:* CONSUMER — kf Card usage with `shadow` (hard offset --shadow-cartoon-*) in controls cards, popovers, drawer
- *Fix:* After the glass ruling on the cartoon stamp, use the resting glass card with no cartoon stamp in the controls rail.

**UIA-KF-106 · MEDIUM · LabeledSliders show only a bare amber fill capsule: no value readout, no unit, and at 0 or max no visible edge**
- *Seats:* cube-matrix-controls-tab, controls-tab-channel-options, controls-advanced-layer, keyframes-tab-css-editor, easing-scene-specimens, easing-curve-tab, spring-scene-solver, spring-physics-tab, spring-discrete-view, mobile-controls-drawer — findings com0[M] com1[M] es#10[C] ec#6[C] kcem1[M] ssm0[M] spt#19[C] sdvm0[M] mcd#10[A] adv#8[A] cm#7[C]
- *Frame:* `spring-physics-tab/02b-response-slider-kbd-focus-none-preset-1440-light.png`
- *Observed → expected:* The invisible thumb is glass canon (slider/styles.css:144-151, the leading edge is the handle). At 1.00 or 0 there is no edge, and nothing states the value. The fill is --glass-capsule-warm against the scene's violet accent, and the easing track is invisible in light. The matrix slider has no name and silently re-ranges. Canon: glass LabeledSlider README; WCAG 1.4.11.
- *Owner:* GLASS+CONSUMER — GLASS: LabeledSlider has no value/unit readout prop (7.0.0 LabeledSliderProps; HEAD same) and no edge at the extremes; CONSUMER: kf LabeledSlider call sites (duration, steps, response, ζ, weight, matrix)
- *Fix:* GLASS: add `format`/`unit` and a value readout slot to LabeledSlider, plus an edge or rail mark at the extremes. CONSUMER: pass the readouts, set --slider-range-bg to the scene accent, and name the matrix slider.

**UIA-KF-107 · MEDIUM · Data readouts use the uppercase eyebrow utility: "0.50 s / ζ 0.86" renders as "0.50 S / Z 0.86"**
- *Seats:* spring-scene-solver, spring-physics-tab — findings ss#8[C] spt#9[C]
- *Frame:* `spring-physics-tab/05a-preset-smooth-selected-1440-light.png`
- *Observed → expected:* The unit s becomes S and ζ becomes a capital Ζ, which changes the meaning. Canon: glass Metric (tabular, case-preserving data register).
- *Owner:* CONSUMER — SpringPhysicsFacet readouts using the eyebrow utility
- *Fix:* Use glass Metric, or the mono data register without text-transform.

**UIA-KF-108 · MEDIUM · Selected rows are marked twice (dot plus bold) in dock selects, and the pane selects and dock selects disagree**
- *Seats:* top-dock, dock-scene-select, dock-controls-tab-select, controls-tab-channel-options — findings td#10[C] dss#6[C] dct#4[C] com3[M]
- *Frame:* `dock-scene-select/09-closeup-amiga-1440-light.png`
- *Observed → expected:* The glass SelectItem indicator dot plus a consumer font-bold. Every row reserves a 28px dot gutter, and the pane Selects show no mark at 7.0.0. Canon: glass SelectItem (indicator is the single selection channel).
- *Owner:* CONSUMER — ChromeDock.vue / TransportDock.vue SelectItem font-bold; ChannelOptions pane Selects
- *Fix:* Drop the consumer font-bold. After the repin the dot marks both dock and pane.

**UIA-KF-109 · MEDIUM · At 390 the top dock wraps to two rows with @mbabb stranded alone on the second, and the split changes with the label width**
- *Seats:* top-dock, mbabb-menu, amiga-scene — findings td#2[C] mm#12[C] am#16[C]
- *Frame:* `top-dock/crops/z08-390.png`
- *Observed → expected:* The row split varies by scene label length. The wrap card is a rounded rect (the wrap recipe struck in glass 9). Canon: dock README (single-row dock; overflow scrolls).
- *Owner:* CONSUMER — ChromeDock.vue (dock-label, item set at 390)
- *Fix:* Below sm, drop the text labels (glyph-only scene and tab triggers) so the dock fits one row.

**UIA-KF-110 · MEDIUM · The spring preset cells carry a bespoke skin: near-black bg-background blobs in dark, a dashed violet selected ring, a fake slider track, and a shorter Gentle cell**
- *Seats:* spring-scene-solver, spring-physics-tab, spring-discrete-view — findings ss#9[C] spt#11[C] spt#13[C] sdvm1[M] sptm2[M]
- *Frame:* `spring-physics-tab/05c-preset-bouncy-selected-crop-1440-light.png`
- *Observed → expected:* In dark the cells paint the black page ground inside a brown card. Selection is a hand-rolled dashed outline rather than the ToggleGroup on-state. A mini track with a draggable-looking dot suggests a control. Gentle is h52 against h75. Canon: glass ToggleGroup on-state.
- *Owner:* CONSUMER — SpringPhysicsFacet.vue:83-100 (bg-background, dashed violet selected ring, mini track)
- *Fix:* After tg-tile lands, render the preset tiles with glass defaults only (no bg or ring overrides), give them equal height, and draw a static curve glyph instead of a fake track.

**UIA-KF-111 · MEDIUM · The NumberField stepper is a 44px stadium pill, but canon assigns steppers --radius-field (16px): glass contradicts its own role table**
- *Seats:* controls-advanced-layer, amiga-scene — findings adv#7[C] am#18[A]
- *Frame:* `controls-advanced-layer/03-amiga-advanced-pane-1440-light-crop.png`
- *Observed → expected:* The z-index stepper is a 44px stadium, taller than the select beside it. DESIGN.md:386 lists "--radius-field 16px Multi-line field / stepper", while the component paints --radius-control. Canon: DESIGN.md:385-386.
- *Owner:* GLASS — number-field/NumberFieldInput.vue:37 `number-field__input field-control` → components.css:20 border-radius var(--radius-control) (stadium)
- *Fix:* Glass ruling: give NumberField its own geometry arm reading --radius-field (with the tile kind from the tile-field row), or amend DESIGN.md:386. Relay with the smooth/bouncy-pill docket.

**UIA-KF-112 · MEDIUM · After a pointer pick, the Select or DockTrigger keeps a keyboard focus ring, indistinguishable from keyboard focus**
- *Seats:* dock-scene-select, dock-controls-tab-select, spring-discrete-view — findings dct#5[C] dssm1[M] sdvm4[M]
- *Frame:* `dock-controls-tab-select/05-cube-after-pick-Timeline-1440-dark.png`
- *Observed → expected:* fv:true after a mouse pick with the "0 0 0 2px" ring. Reka returns focus programmatically after the listbox closes, and the heuristic marks it focus-visible. Canon: DESIGN.md:13 (the ring marks keyboard focus).
- *Owner:* GLASS — SelectContent.vue:90 re-emits close-auto-focus without modality; dock-select-trigger focus-visible ring
- *Fix:* On pointer-initiated close, return focus with `focusVisible:false` or suppress the ring until the next key.

**UIA-KF-113 · MEDIUM · The @mbabb dropdown sits flush against the screen edge at 390: DropdownMenuContent has no collision padding and the documented viewport-pad token is unused**
- *Seats:* top-dock, mbabb-menu — findings td#4[A] mm#3[C] mmm2[M]
- *Frame:* `top-dock/crops/z08-390.png`
- *Observed → expected:* The plate is at x=0 at 390. Select gets collisionPadding 16 while DropdownMenu gets none, and DESIGN.md:1477 documents --popover-viewport-pad 8px that nothing in glass src reads.
- *Owner:* GLASS+CONSUMER — GLASS: menu/DropdownMenuContent.vue:33-38, :51-63 (no collisionPadding; SelectContent.vue:56 has 16); --popover-viewport-pad (DESIGN.md:1477) consumed by nothing; CONSUMER interim MbabbMenu.vue:26
- *Fix:* GLASS: default collisionPadding to var(--popover-viewport-pad) on every floating content (DropdownMenu, Popover, Select, Combobox). CONSUMER interim: `:collision-padding="16"`.

**UIA-KF-114 · MEDIUM · The Timeline says "No keyframes yet" for a channel whose Keyframes tab shows authored keyframes**
- *Seats:* cube-scene, amiga-scene — findings cum2[M] am#14[C]
- *Frame:* `amiga-scene/08-keyframes-tab-1440-light.png`
- *Observed → expected:* Amiga has 5 authored keyframes and cube shows 0%/100% in the Keyframes tab, while the Timeline shows the empty state. Two sources of truth for one channel.
- *Owner:* CONSUMER — Timeline pane empty state reads a different store than the Keyframes tab
- *Fix:* The Timeline reads the channel's authored keyframes (the same source as the Keyframes pane), and Snapshot adds to them.

**UIA-KF-115 · MEDIUM · The easing row breaks the labeled-field grid and the label colour rule**
- *Seats:* controls-tab-channel-options, controls-timing-function-detail — findings co#8[C] tfm1[M]
- *Frame:* `controls-tab-channel-options/R2-invalid-sticks-after-restoring-5s-1440-light.png`
- *Observed → expected:* The easing row lays out label and control differently from duration, delay and iterations, and uses a different label ink. Canon: glass LabeledField grid.
- *Owner:* CONSUMER — ChannelOptions.vue easing row, TimingFunctionPanel
- *Fix:* Render the easing row through the same LabeledField as its siblings.

**UIA-KF-116 · MEDIUM · The easing detail editor and the Curve facet repeat the preset picker and the copy action already shown one step away**
- *Seats:* controls-timing-function-detail, keyframes-tab-css-editor, easing-curve-tab — findings tf#7[A] kcem2[M] ec#10[C]
- *Frame:* `easing-curve-tab/01-curve-rest-1440-light-crop.png`
- *Observed → expected:* The PRESET Select duplicates the main easing Select or the specimen gallery. There are two copy buttons with different icons and number formats, and an empty tall curve well in the Keyframes facet. Canon: owner §0bl "cluttered".
- *Owner:* CONSUMER — TimingFunctionPanel.vue / EasingSidebar.vue (preset Select + gallery + picker)
- *Fix:* One preset chooser per surface: the gallery on easing, the Select on the controls card. The detail editor shows only the curve and literal.

**UIA-KF-117 · MEDIUM · In the 390 drawer the controls card sits off-centre (29px left, 41px right gutter) with a dark cartoon stamp down its left edge**
- *Seats:* controls-timing-function-detail, keyframes-tab-css-editor, mobile-controls-drawer — findings mcd#8[C] tfm0[M] kce#14[C]
- *Frame:* `mobile-controls-drawer/13c-crop-bottom-390-light.png`
- *Observed → expected:* Asymmetric pane gutters, a card inside the sheet surface, and a hard offset shadow showing as a dark vertical bar.
- *Owner:* CONSUMER — ControlsPaneWrapper.css pane gutters (pl-4 pr-7) + Card cartoon stamp in the Drawer
- *Fix:* Symmetric --space-section gutters, and no Card inside the Sheet (the sheet is the surface).

**UIA-KF-118 · MEDIUM · Focus drops to <body> after the Clear-all confirm closes; the consumer suppresses the menu's own return to the trigger**
- *Seats:* clear-all-confirm-dialog — findings cac#7[A] cacm0[M]
- *Frame:* `clear-all-confirm-dialog/03-tab1-1440-dark-crop.png`
- *Observed → expected:* onMenuCloseAutoFocus calls preventDefault when handing off to the dialog, and the dialog is given no return target. Canon: WAI-ARIA dialog (focus returns to the invoker).
- *Owner:* CONSUMER — MbabbMenu.vue onMenuCloseAutoFocus preventDefault; ClearAllConfirmDialog has no return target
- *Fix:* Pass the @mbabb trigger as the dialog's return-focus target and stop preventing the menu's return.

**UIA-KF-119 · MEDIUM · The ground changes colour when Play is pressed (lavender Aurora on home → cream paper on cube), and the dark ground is near-black** [C]
- *Page · state:* home-hero · first-load vs after Play, 1440 light; dark first-load — finding `hh#7`
- *Frame:* home-hero/01-firstload-1440-light.png vs 05-after-play-1440-light.png (+ 01-firstload-1440-dark.png)
- *Observed:* Home is tinted lavender/pink by the 0.1-ceiling Aurora. Play navigates to the same cube on untinted cream (rgb 251,250,248), so the whole ground flashes. Dark body ground is rgb(11,10,9), close to the black ground already filed as value.js §0ao.
- *Expected:* Home and cube share one ground (they are the same CubeScene), so Play moves nothing but the chrome. The dark ground should be a paper token, not near-black.
- *Owner:* CONSUMER — keyframes.js demo/app/App.vue:55-57 (Aurora home-only), demo/components/instrument/shell/HeroAurora.vue:58 (HERO_AURORA_OPACITY_CEILING) and :160-168 (PAPER_WASH_GROUND)
- *Fix:* Either keep the Aurora wash on through the home→cube swap (fade it with the scene swap), or drop the tint to neutral so the grounds match. Raise the dark background to glass's dark paper tier.

**UIA-KF-120 · MEDIUM · The hero's kinetic headline is a one-off hand-written CSS @keyframes, while its sibling TypingDots runs on the keyframes.js engine** [C]
- *Page · state:* home-hero · first-load start screen (all) — finding `hh#8`
- *Frame:* home-hero/01-firstload-1440-light.png
- *Observed:* AnimatedText's char wave is scoped CSS @keyframes charLift with literal cubic-bezier(0.35,0,0.55,1) / (0.22,1,0.36,1) and a literal 3600ms cycle. The TypingDots on the same line use CSSKeyframesAnimation + stagger from the library. Two animation idioms in one headline, on the library's own demo.
- *Expected:* The owner's 'cohesion between all animation views … NO one-off instances'. The demo should use its own engine, with easing from glass tokens (DESIGN.md §Easing :273 spring curves), not literals.
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/shell/AnimatedText.vue:136 (--wave-cycle 3600ms), :169-181 (@keyframes charLift, :172/:176 literal beziers); compare TypingDots.vue:148
- *Fix:* Drive the char lift with CSSKeyframesAnimation + stagger(...) the way TypingDots does, with timing from --spring-*/--ease-* tokens. Keep the reduced-motion path.

**UIA-KF-121 · MEDIUM · At 390 the top half of the viewport is empty and the hero and die are packed into the bottom half** [C]
- *Page · state:* home-hero · first-load, 390 light and dark — finding `hh#9`
- *Frame:* home-hero/01-firstload-390-light.png
- *Observed:* From y≈110 to ≈430 (CSS px) there is only graph paper. The home orb is at top, and the die, headline, deck, hint and transport all sit in y 430-770, on top of each other.
- *Expected:* Primary content is spread across the viewport with no large dead band (HIERARCHY lens; DESIGN.md §L6 proportion :158).
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/shell/EditorStartScreen.vue:345-353 (0.52 offset) and the cube stage placement at <lg
- *Fix:* At <lg, stack the headline in the upper band and the die in the lower band (or the reverse) so neither overlaps the other.

**UIA-KF-122 · MEDIUM · At 390 the channel list's option text is oversized (~24px) against the 16px trigger label** [C]
- *Page · state:* home-hero · after Play → open channel list, 390 light — finding `hh#10`
- *Frame:* home-hero/06-channel-select-390-light.png
- *Observed:* Rotations/Matrix/Hover render at roughly 24px CSS, bigger than the trigger's 'Rotations' and bigger than the pane's body text. The popover takes a third of the stage.
- *Expected:* Popover items use the glass popover/menu type rung (DESIGN.md size tokens :720, --type-body/--type-small), not the dock's touch-scaled label size.
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/transport/TransportDock.vue:107 (<SelectGroup class="dock-label">) and :109 (SelectItem py-2 px-3 overrides)
- *Fix:* Remove dock-label from SelectGroup and the padding overrides from SelectItem, and let glass SelectContent/SelectItem set the type.

**UIA-KF-123 · MEDIUM · At home, after a drag, the transport collapses to Play alone, but the hero copy still points at 'the list ☰ below'** [M]
- *Page · state:* home-hero — finding `hhm1`
- *Observed:* home-hero/13-after-cube-drag-steady-1440-light.png
- *Owner:* CONSUMER
- *Confirm note:* The copy names a control that is not shown. Fold this into the hero-copy row.

**UIA-KF-124 · MEDIUM · The skeleton's material contradicts the scenes it stands in for: an opaque glass card over plate-less stages** [A] (filed HIGH, set by confirm)
- *Page · state:* scene-loading-skeleton · loading fallback, all viewports and themes — finding `sk#2`
- *Frame:* 08-route-fallback-1440-light.png vs 06-route-before-cube-1440-light.png and 05-hardload-resolved-1440-dark.png
- *Observed:* The fallback plate paints the resting glass card: bg oklab 0.93/0.664 (light), a 1px border and an inset highlight, so it reads as a heavy slab. The resolved cube stage has no plate at all (just the grid), and amiga has only a 1px ring at 5% alpha. The docblock justifies the card by pointing to SquareScene (App.skeleton.vue:20-22), but that is one scene of six. The loading plate is a one-off register that no scene actually uses.
- *Expected:* COHESION (4): the placeholder uses the stage register the scenes share. Either every stage stands on the same plate, or the skeleton uses the lightest common form (hairline stage outline plus a quiet breathe), with no raised glass slab that vanishes on resolve.
- *Owner:* CONSUMER — demo/app/App.skeleton.vue:108-112 (`<Card :shadow="false">` = glass-resting card) vs scenes/cube (no plate) and scenes/amiga (`amiga-canvas rounded-card`, 5% inset hairline, transparent) — .scene-skeleton__plate
- *Fix:* Decide one stage register for all scenes (the owner's cohesion ask). Then either put scenes on it or make SceneSkeleton the bare stage outline (rounded-card, hairline ink-seam ring, no glass fill), with the glass Skeleton breathe inside.
- *Confirm amendment:* The material mismatch is real for the two scenes measured (cube: no plate; amiga: `amiga-canvas rounded-card` with a 5% ring, AmigaScene.vue:49). But the premise that 'SquareScene is one scene of six / a one-off register no scene uses' is false. `grep '<Card' demo/scenes` shows square (SquareScene.vue:10), spring (SpringTarget.vue:21, StartingStyleTarget.vue:7), sequence (SequenceTarget.vue:16) and easing (EasingTarget.vue:11) all stand on glass Card plates. So 4 of 6 scenes use the skeleton's register and the seat happened to test the 2 plate-less ones. Re-state it as: the stage register splits 4/2 across scenes (cube/amiga have no plate), so the skeleton is a slab for exactly those two. The cohesion fix is to unify the stage register across all six scenes, and the skeleton then follows it. Downgrade from HIGH to MEDIUM. Owner stays CONSUMER.

**UIA-KF-125 · MEDIUM · The skeleton → resolved-scene handoff is an unanimated hard cut with a ~180-200ms main-thread stall** [A]
- *Page · state:* scene-loading-skeleton · swap fade into the resolved scene (useSceneSwap), Chromium (VT present), all four runs — finding `sk#3`
- *Frame:* 08-route-fallback-1440-light.png → 09-route-swap-t0-1440-light.png; 03-hardload-swap-t0-390-dark.png (scene fully painted at detach)
- *Observed:* The View Transition wraps only the synchronous key mutation, so the old scene cross-fades into the skeleton. The later skeleton → scene resolve is not animated: the host's opacity trace reads 1 on every frame and the transform stays scale(1). The rAF trace shows a 183-204ms gap at the flip (e.g. 74→278ms at 1440-light, 36→219ms at 1440-dark), a visible hitch. On no-VT engines the spring is seeded on the activeSceneKey change (useSceneSwap.ts:47), so it fades in the skeleton, not the resolved scene. The composable's own contract ('fading the new scene in… never a blank gap') is therefore not met on either engine when a chunk is cold.
- *Expected:* The arrival of the resolved scene gets the house swap motion (one motion, not two stacked), and chunk evaluation does not block the frame that removes the placeholder.
- *Owner:* CONSUMER — demo/app/transition/useSceneSwap.ts:36,45-52 + demo/app/transition/useSceneTransition.ts:84-87 — scene-host swap
- *Fix:* Trigger the fade (or a second viewTransition) from `@resolve`/`onSceneResolved` rather than from the key watch. Keep the key-change VT only for warm swaps. Warm every scene chunk at idle after LCP (warmScene exists, scenes.ts:118) so the cold path is rare.
- *Confirm amendment:* The hard cut is CONFIRMED. The trace shows host opacity '1' and scale(1) on every frame across the flip. useSceneTransition.ts:84-87 wraps only `mutate(id)` in the VT, and useSceneSwap.ts:45-52 seeds the no-VT spring on the activeSceneKey watch, so it animates the skeleton's arrival, not the scene's. The stall is not proven for production. The release is `route.continue()` of a held module on the Vite DEV server (capture.mjs:23), so the 74→278ms gap includes fetching and transforming the unbundled import graph after release, plus Playwright's waitForSelector polling in the page. Report it as a dev-server hitch and re-measure on a gh-pages/prod build before calling it a main-thread stall.

**UIA-KF-126 · MEDIUM · The dock's overflow="wrap" mode applies its multi-row styling to a single-row dock: separators are hidden at every width and the corners become card-rounded** [A]
- *Page · state:* top-dock — finding `td#1`
- *Frame:* 05-expanded-cube-1440-light.png (full frame: the bottom TransportDock shows separators, the top dock shows none); capture-log.json (seps = none in all 62 frames; dock radius 24px at 56px height)
- *Observed:* The DockSeparators at ChromeDock.vue:484 and :522 never render, even at 1440 where everything fits on one row. The 'identity | section | nav' grouping the file describes is dead, and the top dock disagrees with the TransportDock on the same page, which does show separators. The one-row 56px dock gets a 24px corner radius instead of a full stadium (28px), so it looks squarer than the stadium-shaped TransportDock below it.
- *Expected:* DESIGN.md:391: `--radius-dock` is a stadium for the dock container. The card radius (:386) is only for multi-row holders. Separators should group controls whenever the controls share a row.
- *Owner:* CONSUMER (pin) — keyframes package.json:78 pins @mkbabb/glass-ui 7.0.0; cured in glass ≥8/10.0.1 (drop overflow="wrap" at ChromeDock.vue:409-414 on the bump) — Every expanded state, 1440 and 390, both themes
- *Fix:* glass: apply the card radius and the separator hiding only when the run has actually wrapped (a data-wrapped flag set by measurement), not whenever the class is present. At glass HEAD the wrap mode has been removed in favour of the lattice; when upgrading, the consumer drops overflow="wrap" and checks that separators return.
- *Confirm amendment:* CONFIRMED on 7.0.0. dist overflow.css has `.glass-dock.dock-overflow-wrap .dock-separator{display:none}` and the calc(--radius-pill → --dock-card-radius × --dock-expand-t) radius, both keyed on the class. capture-log.json records radius 24px at h 56 with seps ['none'] in every expanded 1440 frame. Amendments: (a) the wrap recipe is gone in the RELEASED 9.0.0, not only at HEAD (overflow.css has no wrap rules at v9.0.0, and the useDockShellProps.ts header records `overflow` as struck), so the glass-side fix is already shipped and the remaining owner is CONSUMER (drop overflow="wrap" when bumping, then check that separators return); (b) the consumer line refs at 6d5b4288 are GlassDock ~ChromeDock.vue:409-414 and DockSeparators at :488 and :526 (not :484/:522).

**UIA-KF-127 · MEDIUM · Two neighbouring dock controls serve the same pane: a 'Controls tab' select and a 'Controls panel' toggle** [C]
- *Page · state:* top-dock — finding `td#3`
- *Frame:* 05-expanded-cube-1440-light.png, 07-panel-closed-cube-1440-light.png, 05-expanded-cube-390-light.png
- *Observed:* The select shows the value 'Controls' (the same word as its role) and the icon-only toggle beside it shows or hides the same pane. At 390 the toggle is a bare up or down chevron that reads as 'collapse the dock', not 'open the controls sheet'. That is two seats for one pane, plus a third word 'Controls'.
- *Expected:* Each control earns its seat. One pane, one control: picking a surface opens the pane, and closing it lives on the pane edge.
- *Owner:* CONSUMER: demo/app/dock/ChromeDock.vue:483-517 (Controls tab Select) and :536-551 (Controls panel DockControl). The file's own comment at :516-521 says the toggle's 'ultimate home is the panel edge'. — Any scene with a panel, expanded, both viewports
- *Fix:* Choosing a tab in the select opens the pane (add a 'Hide panel' item or an active-state toggle inside the same trigger), and move the collapse affordance to the panel edge, as the file's comment already plans. This also fixes the 390 wrap.

**UIA-KF-128 · MEDIUM · The dock README documents props that the current GlassDock source no longer has, and ChromeDock binds three of them** [A]
- *Page · state:* top-dock — finding `td#5`
- *Frame:* n/a (source reading: glass 79c3601b vs dist 7.0.0 useDockShellProps.d.ts:86,111)
- *Observed:* On 7.0.0 these props work. At glass HEAD they are gone, so on upgrade they would silently become plain attributes: the 2500ms collapse delay would revert to the default and wrap would disappear, with no type error in a template binding. The README would still tell the consumer they exist.
- *Expected:* Component READMEs match the prop surface they document (glass-ui README law), and removed props are listed in the migration notes.
- *Owner:* GLASS: src/components/dock/README.md:36-50 lists size, layout, overflow, alwaysExpanded, startCollapsed and collapseDelay, but HEAD DockProps (src/components/dock/composables/useDockShellProps.ts:41-99) has only fitContent, backdropMode, shape, orientation, collapse and backgroundCanvas. CONSUMER: ChromeDock.vue:405-410 binds :collapse-delay, :start-collapsed and overflow. — The whole dock, on the next glass bump
- *Fix:* glass: regenerate the dock README props table from DockProps and add a migration note (startCollapsed → collapse="closed", overflow removed, how collapseDelay is replaced). Consumer: migrate these bindings in the same change as the version bump.
- *Confirm amendment:* The README drift is CONFIRMED at glass HEAD 6433284a: src/components/dock/README.md:41-47 still lists overflow, size, position, alwaysExpanded, startCollapsed and collapseDelay, and :50 still documents overflow="wrap", while the useDockShellProps.ts:6-12 header records them as 'struck outright'. The props were struck in the RELEASED 9.0.0 (and are absent in 10.0.1), not just at an unreleased HEAD. So 'on the next bump' means today: the published 9.x and 10.x READMEs misdocument their own API. The consumer binds :collapse-delay, :start-collapsed and overflow at ChromeDock.vue ~:411-414. Severity MEDIUM stands (a silent fall-through on upgrade).

**UIA-KF-129 · MEDIUM · The capture predates keyframes 6d5b4288: the dock's scene glyph is now a live animated miniature at both sites (collapsed face and expanded trigger)** [M]
- *Page · state:* top-dock — finding `tdm0`
- *Observed:* git log 60477b06..6d5b4288 in keyframes.js. The ChromeDock diff adds `live` to both `<component :is="currentIcon">` sites. None of the 62 frames shows motion.
- *Owner:* CONSUMER (ChromeDock.vue `live` on currentIcon; demo/scenes/*/<S>Mini.vue)
- *Confirm note:* Persistent motion at rest in chrome needs a re-capture (frame-diff at rest) and a reduced-motion check. The commit claims PRM snaps it static. Whether always-on motion in the top chrome is idiomatic is an owner design call.

**UIA-KF-130 · MEDIUM · Menu row radius is 8px, which is off the canon ladder and not concentric with the listbox** [A]
- *Page · state:* dock-scene-select — finding `dss#1`
- *Frame:* 02-hover-easing-warm-1440-dark.png (highlighted Easing row shows an 8px box with a 2px ring plus a fill); capture-log.json items[].radius = 8px
- *Observed:* Every option row computes border-radius 8px. The highlight paints a 2px box-shadow ring and a 0.52-0.63α fill inside a 12px plate with a 9px inset. 8px is not a rung on the ladder (4/6/10/12/16/24/pill), and 12 − 9 does not give 8, so the corner is neither a token nor concentric. Ring plus fill also doubles the hover signal.
- *Expected:* Per the ladder, a row radius should resolve from a named rung or from the concentric relay (plate radius − inset, DESIGN.md 'Context relay — the concentric-nesting channel'). The owner's direction is card-like, not pill-rounded. The highlight should use one channel: fill or ring, not both.
- *Owner:* GLASS+CONSUMER — 8px radius = CONSUMER (pin, Tailwind :root leak); residual GLASS: row ring + fill double channel (base.css:244 + menu.css:43-47) — Listbox rows, rest and highlighted states, all viewports and themes
- *Fix:* GLASS: derive the row radius from the concentric relay against the plate (or bind --radius-md / --radius-lg explicitly), and pick a single highlight channel. Route this to the glass-ui session with the owner's 'more card-like' note.
- *Confirm amendment:* 8px is measured, but the cause and owner are wrong. `.interactive-item` paints `border-radius: var(--radius-lg)` in both 7.0.0 and HEAD (base.css:200-203), and canon --radius-lg is 10px, a rung. It measures 8px because glass-ui 7.0.0 dist/styles/components.css:1 emits Tailwind's default `:root{--radius:0.25rem;--radius-lg:0.5rem}`. index.css imports it last, `layer(components)`, so it beats the @theme ladder in theme/radius.css. Glass already fixed the emitter after 7.0.0: vite.utility-emit.ts R3 ('emits NO :root{} block'), contained in v8.0.0+. So the 8px is a CONSUMER dependency lag, cured by the pending adoption. The GLASS residual still stands at HEAD: the highlighted row paints a ring plus a fill. That is `.interactive-item:focus-visible` outline (base.css:244) plus the `.glass-menu-row[data-highlighted]` fill (menu.css:43-47), a double channel (frame 02-hover-easing-warm-1440-dark). Concentricity of a 10px row inside the rounded-card 16px plate should also be checked after adoption.

**UIA-KF-131 · MEDIUM · The open scene listbox covers its own dock; at 390 on scene routes it hides the @mbabb control** [A]
- *Page · state:* dock-scene-select — finding `dss#3`
- *Frame:* 05-open-spring-current-390-light.png, 01-open-home-current-1440-light.png; probe-log.json overlapDockPx 9 (1440) / 12 (390); top-dock capture-log 390 spring: @mbabb at (165,82,60×26)
- *Observed:* reka positions the list 4px below the trigger. The trigger sits inside a 56px dock, so the list's top edge runs 9-12px up into the dock. At 390 with a scene active the dock wraps: row 2 holds @mbabb at y 82-108, and the list (x≈60-252, from y 78) paints over it completely. The dock's lower rim and one of its controls disappear under the menu.
- *Expected:* A popover anchored in chrome should clear the surface that hosts it, meaning start below the dock's bottom edge, and never occlude the dock's own controls (the dock's 'no-occlusion contract', ChromeDock.vue:391-395).
- *Owner:* GLASS+CONSUMER — GLASS: SelectContent.vue:35 sideOffset 0 / no dock-edge offset; CONSUMER interim side-offset at ChromeDock.vue:451 — Open listbox. 1440 home, 390 home, and 390 on any scene route where the dock wraps to 2 rows (312×86)
- *Fix:* CONSUMER: give the scene/controls SelectContent a side-offset equal to (dock bottom − trigger bottom + gap), or `position="popper"` with the dock as the collision boundary. Better at the root: GLASS teaches SelectContent/DropdownMenuContent inside a dock (dock context present) to offset from the dock edge. Relay it.
- *Confirm amendment:* The occlusion is real. In 07-kbd-focus-trigger-390-light, @mbabb sits on dock row 2 at about css (172-218, 94). In 05-open-spring-current-390-light, the listbox (x60-252, y78→) paints over it. The capture log gives the 390 scene-route dock as 312×86 at y30. Two corrections. (1) On scene routes at 390 the overlap is 38px (116−78), not 12px; 9/12px is only the home-route single-row case, which is what the probe measured. At home the probe shows @mbabb as topmost, so it is not occluded there. (2) The 'no-occlusion contract' cited at ChromeDock.vue:395-397 is about page content masking the dock, not about a popover covering the dock, so it is weak support. The better root is GLASS: SelectContent defaults `sideOffset: 0` (SelectContent.vue:35), and dock context is producer territory. The consumer side-offset stays as the interim fix.

**UIA-KF-132 · MEDIUM · Scene glyphs mix three styles: a mono stroke Home icon, blurry 32px rasters shown at 20px, and colour vectors** [A]
- *Page · state:* dock-scene-select — finding `dss#4`
- *Frame:* 09-closeup-amiga-1440-light.png (Cube/Amiga/Square visibly soft beside crisp Easing/Spring/Sequence; Home a thin monochrome outline), 01-open-home-current-390-dark.png
- *Observed:* The 7 rows use 3 glyph families. Home is a lucide 2px monochrome stroke that follows the ink colour. Cube, Amiga and Square are 32px PNG pixel art scaled to 20px (0.625, a non-integer scale), so their edges blur. Easing, Spring and Sequence are colour vectors with different stroke weights. When Home is current the trigger shows the only monochrome glyph in the set, which reads as a disabled or other-kind item. The inconsistency is noted in the ChromeDock.vue:79-94 comments (D-3/D-4) and left as 'the asset owner's'.
- *Expected:* One glyph idiom per list (cohesion), rendered at the dock glyph grid (`--dock-icon-glyph`, 20px here) without resampling blur. The Home entry belongs to the same colourful family as the scene entries.
- *Owner:* CONSUMER — assets/icons/cube.svg, amiga.svg, square.svg (`<svg><image href=data:image/png>` 32×32 rasters); scenes.ts:15-20; ChromeDock.vue:448,459 (lucide <Home>) — Listbox rows plus the trigger glyph, all viewports and themes
- *Fix:* CONSUMER: redraw Cube/Amiga/Square as vectors (or ship rasters at integer multiples of 20px), put Easing/Spring/Sequence on one stroke weight, and add a matching colourful Home glyph to scenes.ts homeScene.icon so the <Home> lucide fallback leaves the menu.
- *Confirm amendment:* It was true at the capture sha: frame 09-closeup-amiga-1440-light shows soft Cube/Amiga/Square, and capture-log marks raster:true for those three. Keyframes HEAD 6d5b4288 (OA-32) has since replaced every scene icon with a vector `<S>Mini.vue` living miniature (scenes.ts:11-16), so the raster-blur half is superseded in code. Two residuals stand. Home is still the lone lucide monochrome glyph (ChromeDock.vue:452 and :463), the only other-kind item in the set. The new live-animated glyph in the trigger ('rendered live', ChromeDock.vue:81) needs a fresh capture to judge whether motion in the chrome adds clutter. Re-capture before routing.

**UIA-KF-133 · MEDIUM · 'Matrix Controls' tab label repeats the channel name, gives two '…Controls' rows, and resizes/reflows the dock** [C]
- *Page · state:* dock-controls-tab-select · open + Matrix Controls picked, 1440 and 390 — finding `dct#3`
- *Frame:* 12-cube-matrix-open-1440-light.png, 13-cube-matrix-controls-picked-1440-light.png, 13-cube-matrix-controls-picked-390-dark.png
- *Observed:* The list reads Controls · Keyframes · Timeline · Matrix Controls, while the transport already says 'Matrix'. The trigger grows from 140px to 201px (1440) and 122px to 170px (390). The dock recentres and the Cube select moves about 40px left. At 390 the panel toggle wraps to row 2 (compare 02-easing-open-current-390-light, where it sits on row 1). Other tab switches also change the width: Controls 140, Timeline 136, Keyframes ~155, Curve 113, Physics 129, so the dock slides on every pick.
- *Expected:* The file's own T.E8 rule (controlSurfaces.ts:148-152): facet labels 'name the FACET, not the scene' (Curve, Physics). Controls in the dock should keep a stable position.
- *Owner:* CONSUMER demo/state/controlSurfaces.ts:155-159 (label) + demo/components/instrument/surfaceTabs.ts:18; ChromeDock.vue:490-499 (unbounded trigger width) — #/cube with the Matrix channel selected
- *Fix:* Rename the tab to 'Matrix' (or 'Cells'). Give the Controls-tab trigger a stable min-inline-size equal to its longest label, or have glass DockTrigger for=select reserve its widest SelectItem, so picks do not reflow the dock.

**UIA-KF-134 · MEDIUM · At 390 the two-row dock overlaps the panel top and hides its own second row under the open listbox** [M]
- *Page · state:* dock-controls-tab-select — finding `dctm1`
- *Frame:* 02-easing-open-current-390-light.png, 13-cube-matrix-controls-picked-390-dark.png
- *Observed:* The dock grows to two rows at 390 and its lower edge covers the panel card's top edge (the 'ease' title sits right under it). The @mbabb row is hidden under the popover.
- *Owner:* CONSUMER ChromeDock / panel top offset
- *Fix:* Offset the panel by the measured dock height, or keep the dock to one row at 390 (this ties to the fixed trigger width in finding 4).

**UIA-KF-135 · MEDIUM · Highlighted row paints a heavy bordered ring instead of a fill (installed glass 7.0.0)** [C]
- *Page · state:* mbabb-menu · hover and keyboard highlight, all viewports and themes — finding `mm#4`
- *Frame:* 02-hover-row0-1440-light-crop.png, 03-kbd-arrow-1440-light-crop.png, 04-pp-true-1440-dark-crop.png, 06-pp-false-390-light-crop.png
- *Observed:* The pointed-at or keyboard-highlighted row gets a roughly 2px grey outlined box (8px radius) that reads as a focus ring on every hover. It is the loudest mark in the menu and fights the separators.
- *Expected:* Current canon, glass src/components/_shared/menu/menu.css (the .glass-menu-row block): 'A menu ROW … carries a hover FILL and nothing else', meaning a --glass-plate-quiet fill. keyframes is pinned to glass-ui 7.0.0 (package.json:78), which predates this.
- *Owner:* CONSUMER (pin) — keyframes package.json:78 pins @mkbabb/glass-ui 7.0.0; cured in glass ≥8/10.0.1 (re-capture the ring after adoption)
- *Fix:* Adopt glass ≥10 in keyframes, then re-capture. If the ring persists after adoption, relay to glass as a menu-row regression.

**UIA-KF-136 · MEDIUM · The ppmycota checkbox row breaks the leading-glyph column, and an unchecked row looks inert** [C]
- *Page · state:* mbabb-menu · ppmycota unchecked vs checked, all — finding `mm#6`
- *Frame:* 01-open-1440-light-crop.png (unchecked), 04-pp-true-1440-dark-crop.png (checked), 06-pp-false-390-light-crop.png
- *Observed:* The CheckboxItem reserves an indicator seat with padding-inline-start 32px (7.0.0 data-indicator=wide). The logo lands at x677 against the sibling glyph column's centre at 667, and the label column at x715 against 691, a 24px stagger that undoes the file's own MM-11 single-glyph-column rule. Unchecked, the seat is an empty hole, and nothing marks the row as a toggle. Checked, a check plus the logo form two leading glyphs.
- *Expected:* One leading-glyph slot per row (MbabbMenu.vue:38-40 MM-11). A persisted boolean should show its state in both positions (DESIGN.md glass checkbox and switch idiom).
- *Owner:* GLASS — DropdownMenuCheckboxItem indicator seat (no trailing-indicator or glyph-slot option); CONSUMER — MbabbMenu.vue:133-134
- *Fix:* Producer: add an indicator placement option to DropdownMenuCheckboxItem (indicator='end', rendering a trailing check or mini-switch), so rows with their own leading glyph keep the column. Consumer: use it. Interim: move the brand mark into the w-7 slot and show state as a trailing check. Relay to glass.

**UIA-KF-137 · MEDIUM · Two booleans in one menu use two different idioms (theme as a nested toggle button, ppmycota as a checkbox row)** [C]
- *Page · state:* mbabb-menu · open dropdown — finding `mm#7`
- *Frame:* 01-open-1440-light-crop.png, 04-pp-true-1440-dark-crop.png
- *Observed:* 'Dark mode' is a static label next to a sun or half-moon DarkModeToggle glyph, with no checked state and a subtitle ('Light or dark theme') that says nothing about the current value. 'ppmycota' is a menuitemcheckbox with a check indicator. The same kind of setting reads two ways in one menu.
- *Expected:* Cohesion (audit axis 4). One menu, one idiom for persisted booleans: a CheckboxItem, or a RadioGroup Light/Dark/System.
- *Owner:* CONSUMER — MbabbMenu.vue:66-78
- *Fix:* Fold into the Dark mode fix above: DropdownMenuCheckboxItem bound to the dark ref, or a DropdownMenuRadioGroup (Light / Dark / System).

**UIA-KF-138 · MEDIUM · The menu is cluttered: a subtitle on every row, a three-line identity block, the handle shown twice** [C]
- *Page · state:* mbabb-menu · open dropdown, all — finding `mm#8`
- *Frame:* 01-open-1440-light-crop.png, 01-open-390-light.png
- *Observed:* Five commands take a 351px-tall plate (332px at 390). Every row carries an 11px text-micro subtitle, several of them self-evident ('Light or dark theme', 'Every key the editor answers'). The footer label stacks avatar + '@mbabb' + 'CSS keyframe animation engine' + 'View the project on GitHub 🎉'. '@mbabb' repeats the trigger text right above it. The title-to-subtitle step is 16.4→11px, which skips a rung.
- *Expected:* A settings menu is single-line rows with an optional shortcut hint, per the glass DropdownMenu anatomy (DropdownMenuItem + DropdownMenuShortcut). Descriptions only where the command is ambiguous (the destructive row). Axis 2: redundant labels do not earn their place.
- *Owner:* CONSUMER — MbabbMenu.vue:52-55, 74-77, 83-86, 205-208, 215-244
- *Fix:* Drop the subtitles except under Clear all. Collapse the identity block to one row (avatar + '@mbabb · GitHub' as a single link item, or a DropdownMenuLabel with one line). Drop the emoji.

**UIA-KF-139 · MEDIUM · Keyboard Shortcuts dialog (opened from this menu): opaque square group bars and a clipped focus outline in a glass dialog** [C]
- *Page · state:* mbabb-menu · Keyboard shortcuts row → dialog, 1440 and 390, both themes — finding `mm#10`
- *Frame:* 07-shortcuts-dialog-1440-light.png, 07-shortcuts-dialog-390-dark.png
- *Observed:* Group headers ('General', 'Playback', 'Navigation') are sticky bg-popover slabs: opaque, square-cornered, full-bleed bars on a translucent 16px dialog, with the header text flush to the bar edge. The focused-on-open FadingScroll region shows its focus outline only as two blue 1px vertical hairlines down the left and right edges, clipped top and bottom. At 390 the dialog spans the full width (no gutter). The title case 'Keyboard Shortcuts' does not match the menu row's 'Keyboard shortcuts'.
- *Expected:* Glass surfaces keep the translucent plate (DESIGN.md:49 tiers) with sticky headers on the plate's own tint. The focus ring should be a whole ring, or focus should go to the first actionable element. A 16px side gutter at phone width.
- *Owner:* CONSUMER — demo/components/instrument/shell/KeyboardShortcutsModal.vue:162 (sticky bg-popover header), :136 (FadingScroll focus target); GLASS — FadingScroll focus-visible outline clipped by its own overflow
- *Fix:* Header: drop bg-popover, use a plate-tinted sticky header (or no sticky) with px matching the rows. Focus the close button or dialog on open instead of the scroll region, or give FadingScroll an inset focus ring. Relay the clipped outline to glass. Sentence-case the title.

**UIA-KF-140 · MEDIUM · Share trigger renders as a 28x36 oval and dims to 50% on hover** [C]
- *Page · state:* share-popover — finding `sp#7`
- *Frame:* 00b-trigger-hover-1440-light-crop.png, 01-popover-open-1440-light-crop.png (measured 28x36, radius 9999px)
- *Observed:* The icon-only Button is 28 wide and 36 tall with a stadium radius, so the hover plate is a vertical egg. On hover the icon fades to 50% opacity, a recede-on-hover signal that no sibling menu glyph uses.
- *Expected:* Icon-only controls are square, so the stadium reads as a circle. The hover affordance comes from the glass Button quiet plate, not an opacity fade.
- *Owner:* CONSUMER — demo/app/dock/MbabbMenu.vue:51 (`w-7` slot squeezes the icon-only Button) + demo/components/instrument/shell/SharePopover.vue:33-34 (`hover:opacity-50`) — share-popover — trigger at rest / hover
- *Fix:* Moot if the row becomes a plain item. Otherwise size the slot to the button (or drop w-7 for this row) and delete the hover:opacity-50 / transition-opacity classes.

**UIA-KF-141 · MEDIUM · Field too narrow: placeholder and pasted URL truncated inside a literal-width popover** [C]
- *Page · state:* share-popover — finding `sp#8`
- *Frame:* 01-popover-open-1440-light-crop.png ('Paste share UR'), 03a-pasted-390-light-crop.png (shows only 'MmN1YmUlMjIlN0Q='), 05-error-invalid-1440-light-crop.png ('@@not-base64@a')
- *Observed:* The input is 170px inside a 288px popover, with two 36px icon buttons beside it. The placeholder is cut mid-word. A pasted multi-KB URL shows only its base64 tail, so the user cannot see what they pasted.
- *Expected:* A readable field width, ideally one that shows the head of the URL (host/scene). Width from a glass token or container, not a literal.
- *Owner:* CONSUMER — demo/components/instrument/shell/SharePopover.vue:60 (`w-72` literal) + 111-121 — share-popover — open / pasted / error
- *Fix:* Give the import field its own full-width row (or a Dialog) and move the buttons below or beside it. Consider displaying a parsed summary ('cube · 4 channels') after paste.

**UIA-KF-142 · MEDIUM · Error states have no field-level skin or message (toast-only, and the toast is invisible)** [C]
- *Page · state:* share-popover — finding `sp#9`
- *Frame:* 04-error-no-state-1440-light-crop.png, 05-error-invalid-1440-light-crop.png, 05f-error-invalid-FULLPAGE-1440-light.png
- *Observed:* aria-invalid is null and there is no inline message. The field looks identical to its valid state; only a (below-the-fold) toast carries the error.
- *Expected:* The glass invalid state on the Input plus an inline description (LabeledField error slot), announced to AT.
- *Owner:* CONSUMER — demo/components/instrument/shell/useShareState.ts:64-72 + SharePopover.vue:111-121 (declared-but-unbuilt 'invalid skin', SharePopover.vue:107-109) — share-popover — 'No shared state found in URL' / 'Invalid shared state'
- *Fix:* Add a reactive `error` ref in useShareState, bind the Input's invalid prop + aria-describedby to an inline message, and clear it on input.

**UIA-KF-143 · MEDIUM · Deep-link ?state= restores and fails silently** [C]
- *Page · state:* share-popover — finding `sp#11`
- *Frame:* 07-deeplink-restore-1440-light.png, 07-deeplink-restore-390-dark.png, 08-deeplink-garbage-1440-light.png
- *Observed:* A valid link lands on the shared scene (cube) and the URL is cleaned, with no acknowledgement. A garbage ?state= is silently stripped and the page lands on the route scene (#/amiga) with no hint that the link was bad.
- *Expected:* One consistent feedback path: success is quietly acknowledged, and failure says the shared link could not be read.
- *Owner:* CONSUMER — demo/app/scene/router.ts:46-60 — share-popover — deep-link restore via ?state= on load
- *Fix:* After the guard redirect, queue a (glass) toast from the restore result: {restored:false} → error, success → optional info.

**UIA-KF-144 · MEDIUM · Canon contradiction: popover radius is --radius-panel (12px) but the role table assigns popovers --radius-card (16px)** [A]
- *Page · state:* share-popover — finding `sp#12`
- *Frame:* 01-popover-open-1440-light-crop.png (capture-log: popover radius 12px, menu radius 12px)
- *Observed:* PopoverContent measures 12px (the panel rung), while the canon row names the popover as a 16px card.
- *Expected:* One answer. Either the role table moves popovers to --radius-panel, or .popover-content reads --radius-card. The owner's 'more card-like' direction suggests the card rung.
- *Owner:* GLASS — src/styles/utilities/base.css:74-75 `.popover-content{border-radius:var(--radius-panel)}` vs DESIGN.md:387 `--radius-card … Content card / popover` — share-popover — open (also the @mbabb DropdownMenuContent, 12px)
- *Fix:* Route to the glass-ui session: reconcile DESIGN.md:387 with base.css:75 at the root (and the dropdown content, which shares .popover-content).
- *Confirm amendment:* The contradiction is real at glass HEAD. DESIGN.md:387 says `--radius-card … Content card / popover`, while src/styles/utilities/base.css:74-75 has `.popover-content{border-radius:var(--radius-panel)}`, and the capture measured 12px. The owner is GLASS. Amendment: the root is not only base.css. PopoverContent.vue:122-128 registers the overlay as `overlayContentAttrs({role:"panel", slot:"popover-content"})` (the W-OVERLAY register), so the panel rung is a deliberate role assignment. The reconciliation must pick one answer across DESIGN.md, the overlay register role and base.css. Glass's own Toast.vue:112-115 comment argues that the more elevated surface must not be the less rounded one, which supports the card rung. Any glass-root fix reaches keyframes only after the 7.0.0 → ≥8 bump.

**UIA-KF-145 · MEDIUM · Delete row reads '⌫ or Backspace' on Mac: the same physical key twice, and the alias bypasses the formatter** [C]
- *Page · state:* keyboard-shortcuts-modal — finding `ksm#4`
- *Frame:* 05-scrolled-bottom-cube-1440-light-crop.png, 05-scrolled-bottom-square-390-light-crop.png
- *Observed:* formatComboParts('Delete') renders the Mac glyph ⌫, which is the Mac Backspace/'delete' key. The interim alias then appends a literal full-word 'Backspace' cap, so the row names one key twice, in two different registers (a glyph cap and a wide word cap), and the forward-delete key (⌦) the binding also accepts is never shown. On non-Mac platforms the pairing would be correct, so the interim is right on some platforms and wrong on others.
- *Expected:* The formatter is the source of record for platform key names (the consumer's zero-platform-knowledge rule, :314-319). Aliases should be surfaced by the producer in the same register as the primary cap.
- *Owner:* GLASS+CONSUMER — GLASS: keyboard formatComboParts has no platform alias parts; CONSUMER: KeyboardShortcutsModal.vue:267-276, :337 KEY_ALIASES interim — all routes, Actions group, both viewports and themes
- *Fix:* GLASS: formatComboParts returns platform-correct alias parts (Mac: ⌫ + ⌦; other platforms: Del + Backspace). Consumer: delete KEY_ALIASES/aliasFor and render the producer's alias parts through the same .kbd loop.

**UIA-KF-146 · MEDIUM · The browser's default focus outline (1px blue) boxes the list on every open; initial focus lands on the scroll port** [C]
- *Page · state:* keyboard-shortcuts-modal — finding `ksm#5`
- *Frame:* 01-open-menu-cube-1440-light-crop.png (blue vertical rules left and right of the rows), 01-open-menu-cube-390-dark.png (pale-blue rules), 10-open-kbd-cube-1440-light.png
- *Observed:* Measured activeElement = DIV[region] 'Keyboard shortcuts', :focus-visible true, outline 'rgb(0,95,204) auto 1px' (light) / 'rgb(153,200,255) auto 1px' (dark). It shows even on the mouse path. The ring is square-cornered and partly hidden behind the heading plates, so it reads as stray blue rules.
- *Expected:* Every focus indicator uses the house ring (base.css:124-145: 'A focus indicator may not restate the element's shape', 3:1 accent ring). Opening a dialog with the mouse should not paint a keyboard ring on a passive list.
- *Owner:* GLASS FadingScroll (named port is tabindex=0 + role=region but ships no house focus ring; src/components/fading-scroll/FadingScroll.vue, dist base-misc.css .fading-scroll rules have no :focus-visible) against canon src/styles/utilities/base.css:124-145 (.focus-ring:focus-visible, --focus-ring-width) — open via ? and open via the @mbabb menu (mouse), both themes and viewports
- *Fix:* GLASS: apply the .focus-ring contract to the FadingScroll root (outline via --focus-ring-width/--focus-ring colour, radius inherited from the relay). Consumer: consider sending initial focus to the dialog content or the close (DialogContent @open-auto-focus) rather than the list port.

**UIA-KF-147 · MEDIUM · Single narrow column at 60dvh forces scrolling at 1440x900 for 22 short rows; key caps are 11px mono under 16px labels, and the glyphs are illegible** [C]
- *Page · state:* keyboard-shortcuts-modal — finding `ksm#7`
- *Frame:* 01-open-menu-cube-1440-light.png, 01-open-menu-cube-1440-light-crop.png (␣ reads as a speck, ⇧ ⌘ ⌫ tiny)
- *Observed:* At 1440x900 only 11 of 22 rows are visible in a 398x540 port. Each row is a label at the left edge and a 24px cap at the far right, with about 250px of dead space between. The caps render at 11px Fira Code (--type-micro) next to 16.4px labels, and the Space (␣), Shift (⇧) and Backspace (⌫) glyphs are about 5px tall.
- *Expected:* The primary content, the whole shortcut map, should be readable at a glance on desktop without scrolling. The type scale should step up to the data cap and not drop two rungs under it (glass type scale; the demo DESIGN.md Mono-as-data rule).
- *Owner:* GLASS+CONSUMER — GLASS: .kbd font-size var(--type-micro) 11px (styles/utilities/base-misc.css:220-234); CONSUMER: KeyboardShortcutsModal.vue:82 / :136 layout — 1440 light/dark open state; the cap legibility is at every viewport
- *Fix:* Consumer: at ≥md, lay the groups in two columns inside the canon dialog width (or let the dialog take --panel-max-h only below md), so all 22 rows fit at 900px tall. GLASS: raise .kbd to the --type-small rung, or size glyph parts optically (symbol caps a rung above word caps).

**UIA-KF-148 · MEDIUM · Consumer type overrides flatten title-over-description hierarchy (20.35px vs 18.6px, leading-none)** [A]
- *Page · state:* clear-all-confirm-dialog · CONFIRMED — finding `cac#6`
- *Frame:* 01-open-1440-light-crop.png · 01-open-390-light.png
- *Observed:* Title is 20.35px/600 with line-height 20.35px (1.0, cramped). Description is 18.6px at 1440 and 16px at 390. The step is about 1.09×, so the question barely leads its body. The description ink is forced to muted rgb(112,89,66) over a translucent plate where the cube's green and magenta bleed through, as in 01-open-1440-light.png. No DialogHeader groups the pair, so the title-to-description spacing is the plate's 16px grid gap rather than the atom rung.
- *Expected:* Title 1.272× body at body leading, description in --foreground, and title plus description wrapped in DialogHeader (HEAD styles.css header rule, gap --space-atom). KeyboardShortcutsModal.vue:99 already uses DialogHeader, so the three sibling dialogs disagree.
- *Owner:* CONSUMER (size + ink); leading-none = GLASS 7.0.0 DialogTitle, cured at HEAD — open, all four combinations
- *Fix:* Drop the class overrides on DialogTitle and DialogDescription in MbabbMenu.vue:276-277 and CSSPasteDialog.vue:23-24, and wrap each pair in <DialogHeader>. Let the glass canon own dialog type.
- *Confirm amendment:* The size and ink parts are CONFIRMED CONSUMER. capture-log shows title 20.352px/600, description 18.608px in muted rgb(112,89,66), and header=false (no DialogHeader). MbabbMenu.vue gives DialogTitle class text-subheading and DialogDescription class 'text-body text-muted-foreground', and CSSPasteDialog.vue:23-24 repeats both. The cramped leading-none (lh 20.352px) is not a consumer override. The measured class string is 'leading-none tracking-tight text-subheading', where 'leading-none tracking-tight' comes from glass 7.0.0's own DialogTitle; HEAD DialogTitle.vue:14-18 records that it removed it. The owner is therefore split: leading = GLASS, cured at HEAD; size, muted ink and the missing DialogHeader = CONSUMER. The consumer part matters even after adoption. HEAD's title and description rules sit in :where() inside @layer components, so the utility-layer text-subheading and text-muted-foreground classes would still win over the canon.

**UIA-KF-149 · MEDIUM · The destructive confirm uses the 'free' dismissal grammar; the redundant X duplicates Cancel** [C]
- *Page · state:* clear-all-confirm-dialog · CONFIRMED — finding `cac#8`
- *Frame:* 01-open-1440-light-crop.png · 03-tab2-1440-light-crop.png
- *Observed:* The plate carries X (tab stop 3), Cancel and Clear & reload. The X and Cancel do the same thing. In 7.0.0 the X is a 16×16 square with rounded-sm 4px and opacity-70 (capture-log: w16 h16 radius 4px), below the 44px --touch-target (glass-ui sizing.css:282). It is also off the stadium role for a single-line icon control (DESIGN.md radius table: --radius-control stadium).
- *Expected:* HEAD dismissal grammar: a confirm is dismiss="deliberate". That drops the X and keeps Esc and outside-click, which leaves one Cancel and one confirm.
- *Owner:* CONSUMER after adoption: keyframes.js/demo/app/dock/MbabbMenu.vue:275 (<DialogContent> with no dismiss). Canon: glass-ui HEAD src/components/dialog/DialogContent.vue header doc ('deliberate Esc · outside — a confirm'). The axis is absent from 7.0.0, so this is blocked on the pin at package.json:78. — open, all four combinations
- *Fix:* After adopting glass-ui HEAD, set <DialogContent dismiss="deliberate"> at MbabbMenu.vue:275 and the same on CSSPasteDialog if it is a confirm. HEAD already cures the X geometry (44px capsule) for dialogs that keep it.

**UIA-KF-150 · MEDIUM · Channel Select opened by pointer leaves focus on the trigger: ArrowDown/Enter do nothing until an option is hovered** [A]
- *Page · state:* transport-dock · channel select open — finding `trd#6`
- *Frame:* 08-cube-select-kbd-highlight-*.png, 09-cube-after-pick-*.png (listbox still open, still 'Rotations'), 50-cube-select-kbd-after-arrows-1440-light.png; probe-selectkbd.json; sibling evidence ../dock-scene-select/capture-log.json frame 01 focus 'Scene:Home'
- *Observed:* click-open: active = trigger, highlighted = []. ArrowDown ×2 leaves highlighted = []. Enter leaves the listbox open with the value unchanged. A keyboard-opened listbox (focus the trigger + Enter) works: the option is focused, ArrowDown highlights Matrix, Enter picks it (frame 51).
- *Expected:* reka/WAI-ARIA listbox: an open listbox takes focus on the selected option whatever the opening modality.
- *Owner:* GLASS Select/DockTrigger at 7.0.0 (the same behaviour on the top-dock Scene select → family, not a transport one-off). Verify at 10.0.1 before ruling. — cube 1440 light+dark and 390: click the 'Select animation' trigger, then use the keyboard
- *Fix:* Glass: on open, SelectContent focuses the selected (else first) item regardless of pointerType. Re-probe at 10.0.1 and mark ANSWERED if cured.
- *Confirm amendment:* The behaviour is confirmed. probe-selectkbd.json: click-open gives active = trigger and hl = []. ArrowDown ×2 and Enter do nothing. Opening with Enter focuses the option, and the pick works. The sibling dock-scene-select log also shows focus on 'Scene:Home', which supports a family-wide cause. Amendment: the owner is still provisional. Reka/Radix Select deliberately behaves differently when opened by pointer, and the Tooltip plus wrapper div around the trigger (:77-80) could also be intercepting. Before routing this to GLASS, re-probe one Select in the glass-ui 10.0.1 docs demo that has no Tooltip wrapper.

**UIA-KF-151 · MEDIUM · Every channel row carries the same status dot, which gives no per-row information. Paused reads as a 'warning' alert, and the selected row is bold-only with no indicator** [C]
- *Page · state:* transport-dock · channel select open — finding `trd#7`
- *Frame:* 07-cube-select-open-paused-390-light.png (orange warning diamonds on all rows), crop-22-amiga-select-open-1440-dark.png (dashed 'unknown' dots nearly invisible), crop-10-cube-select-open-playing-1440-light.png (identical progress wedges, KFA-167)
- *Observed:* Every row shows the same dot state because the state is the group's, not the row's. Once started and paused, all rows turn glass StatusDot 'warning' orange. Selection is shown only by font-bold, with no check and no selected paint; the highlight and the selection look alike.
- *Expected:* StatusDot semantics (glass status-dot README): 'warning' = a warning condition, not 'paused'. Glass SelectItem ships a selection indicator; the Clutter rule says a glyph must earn its place.
- *Owner:* CONSUMER TransportDock.vue:109-124 (hide-indicator + a per-row StatusDot/progress-dot keyed on global isStarted/isPlaying) — cube/amiga/spring select open: paused-unstarted, paused-started, playing; light+dark
- *Fix:* Drop the per-row dot (the transport already shows the play state), or drive it with real per-channel progress/state. Remove hide-indicator so glass SelectItem shows the selection.

**UIA-KF-152 · MEDIUM · The channel listbox overlaps the dock's top edge (4px at 1440, 8px at 390)** [C]
- *Page · state:* transport-dock · channel select open — finding `trd#8`
- *Frame:* crop-10-cube-select-open-playing-1440-light.png, crop-22-amiga-select-open-1440-dark.png, 07-cube-select-open-paused-390-light.png
- *Observed:* Listbox bottom y769 vs dock top y765 (1440). At 390: 737 vs 729. The popover's rim sits over the pill's rim and the two glass edges collide.
- *Expected:* A popover floats clear of its anchor by the --popover-offset token (glass DESIGN.md: DockSelectTrigger 'anchors popover').
- *Owner:* CONSUMER TransportDock.vue:106 (SelectContent without position/side-offset); GLASS if the dock-context default offset is meant to come from DockTrigger — cube/amiga/spring select open, all legs
- *Fix:* position='popper' side='top' with side-offset from --popover-offset (glass default for Select inside a dock).

**UIA-KF-153 · MEDIUM · Timeline-expanded state adds a Collapse chip plus a static 'Timeline' label to the transport: the third collapse-timeline control, and the grown dock abuts the left panel** [C]
- *Page · state:* transport-dock · timeline expanded — finding `trd#9`
- *Frame:* crop-13-cube-timeline-expanded-1440-light.png, 14-cube-tooltip-collapse-timeline-*.png
- *Observed:* The dock widens 279→410px. The non-interactive 20px 'Timeline' text sits after an icon button and reads as a button label. Collapse-timeline also exists in the timeline header and in the tab placeholder. The dock's left edge (x515) meets the timeline panel's right edge (≈x517).
- *Expected:* The comment at TransportDock.vue:136-139 already names the timeline pane as the chip's home. The clutter rule: one affordance per verb, and no inert text posing as a control.
- *Owner:* CONSUMER TransportDock.vue:152-163 (chip + <span class='dock-label'>Timeline</span>), duplicated by components/instrument/timeline/KeyframeTimeline.vue:150-160 and channel-controls/ChannelControls.vue:142-150 — cube 1440 light+dark, timeline expanded (at 390 the path is unreachable: no 'Controls tab' combobox)
- *Fix:* Delete the chip and the label from the transport. The timeline header's own Collapse is the single control.

**UIA-KF-154 · MEDIUM · Single-channel scenes: the collapsed face shows the channel name, the expanded face never does** [C]
- *Page · state:* transport-dock · single-channel collapsed vs expanded — finding `trd#10`
- *Frame:* crop-30b-square-collapsed-after-leave-1440-dark.png vs crop-31-square-expanded-1440-dark.png
- *Observed:* Collapsed: '▷ Transform'. Expanded: '▷ | ↺' with no name. Expanding the dock loses information, and the collapsed pill looks wider than the expanded one.
- *Expected:* The T.B5 elision rationale (the lone animation is the scene identity) should hold on both faces.
- *Owner:* CONSUMER TransportDock.vue:221-223 (the name in #collapsed) vs :75 (the zone elided for <2 channels) — square/easing/sequence, all legs
- *Fix:* The collapsed face shows only the persistent Play (per the focus row). Otherwise use the same name policy on both faces.

**UIA-KF-155 · MEDIUM · PlaybackRibbon's paused 'Play' pill in dark: white text on a light-lavender fill, low contrast (same family as the rainbow-pastel finding)** [M]
- *Page · state:* transport-dock — finding `trdm0`
- *Frame:* crop-22-amiga-select-open-1440-dark.png, crop-31-square-expanded-1440-dark.png, crop-30b-square-collapsed-after-leave-1440-dark.png
- *Owner:* CONSUMER PlaybackRibbon.vue:77-86 (btn-playback) / GLASS if btn-playback is a glass utility
- *Confirm note:* By eye the fill is about rgb(192,150,240), which gives roughly 2.3-2.5:1 against white text. probe-contrast.json measured only the dock Play, so this needs a probe to confirm.

**UIA-KF-156 · MEDIUM · The owner's §0bl 'too rounded, more card-like' complaint is not addressed for the ribbon's Play/Reverse stadium pills inside the controls card** [M]
- *Page · state:* transport-dock — finding `trdm3`
- *Frame:* crop-01b-cube-collapsed-after-leave-1440-light.png (the violet 'Pause' and 'Reverse' stadiums in the card)
- *Owner:* GLASS (DESIGN.md:385 makes --radius-control a stadium for all single-line action pills; a change here is a root-level canon question, so route it to the glass-ui session) + CONSUMER
- *Confirm note:* The audit's rounded-full finding only asks for the token to replace the literal. The owner's verdict asks for card-like radii, which conflicts with the current role table, so glass must rule on it.

**UIA-KF-157 · MEDIUM · Matrix Controls ribbon buttons are hand-sized 8px rounded rectangles, unlike every sibling ribbon** [C]
- *Page · state:* cube-scene · Matrix Controls — finding `cu#7`
- *Frame:* docs/tranches/X/audit/ui-evidence/keyframes/cube-scene/05b-matrix-controls-surface-1440-light.png vs 05c-keyframes-surface-matrix-1440-light.png; radius-probe.json
- *Observed:* Reset and Free measure 36px tall at radius 8px. The Copy, Format, Export CSS, Apply CSS, Snapshot, Import and Export ribbon buttons are glass Button at 9999px. This is the scene's one-off ribbon chrome.
- *Expected:* Cohesion: every ribbon uses the same glass Button recipe, with no per-scene class overrides of height, padding or radius, and radius from the role table (glass-ui DESIGN.md:385-391).
- *Owner:* CONSUMER — demo/scenes/cube/CubeScene.vue:147 and :153 (`class: "h-8 gap-1.5 cursor-pointer text-small font-medium px-3 rounded-lg"` on glass Button) — cube-scene › Matrix Controls ribbon vs the Keyframes/Timeline ribbons, 1440
- *Fix:* Drop the class overrides and render Reset/Free with the shared ribbon-button recipe. Never apply.

**UIA-KF-158 · MEDIUM · Choosing 'Matrix Controls' silently stops and rewinds the playing scene** [C]
- *Page · state:* cube-scene · playing → Matrix Controls — finding `cu#8`
- *Frame:* docs/tranches/X/audit/ui-evidence/keyframes/cube-scene/05a-controls-tab-open-matrix-1440-light.png → 05b-matrix-controls-surface-1440-light.png; capture-log.json notes.motionOnMatrixControls {cube:false,bob:false}; tabswitch-probe.json (Keyframes tab keeps playing)
- *Observed:* The die snaps back to its rest pose, motion stops and the transport flips to Play. No message explains why. Switching to Keyframes or Timeline keeps playing, so the behaviour is inconsistent across surfaces.
- *Expected:* STATES: a mode change that suspends playback says so, or the surfaces behave alike.
- *Owner:* CONSUMER — demo/scenes/cube/CubeScene.vue:117-127 (tabsContent gate) with demo/scenes/cube/matrix-editor/useTransformState.ts (isStarted / painter mutual exclusion) — cube-scene, Matrix channel playing → Controls tab → Matrix Controls, all viewports
- *Fix:* Show an 'editing end pose — playback paused' state in the pane or whisper, or keep playback live with the painter. Never apply.

**UIA-KF-159 · MEDIUM · The Matrix channel is a no-op by default, and the channel select implies isolation it does not provide** [C]
- *Page · state:* cube-scene · playing each channel — finding `cu#9`
- *Frame:* docs/tranches/X/audit/ui-evidence/keyframes/cube-scene/05c-keyframes-surface-matrix-1440-light.png (`0%, 100% { transform: matrix3d(1,0,0,0,…,1) }`); 04a/04b/04c-playing-*-1440-light.png; capture-log.json notes.motion-* (pose:false in every run)
- *Observed:* The Matrix keyframes are identity→identity, so the pose element never moves. Selecting Rotations, Matrix or Hover gives the same motion (spin + bob every time), so 'Matrix ▷' in the transport plays the other two channels.
- *Expected:* STATES: an empty or no-op channel shows an empty state ('edit the end pose in Matrix Controls'). The select is labelled for what it does (the channel being edited), or it isolates playback.
- *Owner:* CONSUMER — demo/scenes/cube/useCubeDemo.ts:46-63 (matrix animation compiled from matrix3dStart/End, both identity) + the transport 'Select animation' semantics — cube-scene, playing each channel (Rotations / Matrix / Hover), all runs
- *Fix:* Seed a non-identity end pose, or show an inline empty-state hint. Rename or clarify the select's role. Never apply.

**UIA-KF-160 · MEDIUM · The Timeline preview thumbnail crops the die** [C]
- *Page · state:* cube-scene · Timeline surface — finding `cu#10`
- *Frame:* docs/tranches/X/audit/ui-evidence/keyframes/cube-scene/05d-timeline-surface-matrix-1440-light.png
- *Observed:* The preview box shows a red face with its numeral cut off at the bottom edge. The cloned target is sized to the viewport (min(25vh,25vw,15rem)), not to the 370×95 preview frame.
- *Expected:* The preview fits the subject whole inside its frame, like the siblings' previews.
- *Owner:* CONSUMER — cross-seat timeline preview host + demo/scenes/cube/CubeTarget.css:88-97 (--side-size from the viewport, not the host box) — cube-scene › Timeline tab, 1440 light/dark
- *Fix:* Size the cloned target from a container-query unit or a preview token. Never apply.

**UIA-KF-161 · MEDIUM · The matrix surface is a scene-owned h() one-off, not a first-class hosted surface** [C]
- *Page · state:* cube-matrix-controls-tab · the MatrixEditor 4x4 grid — finding `cm#5`
- *Frame:* 01-rest-1440-light.png, 13-cube-matrix-controls-picked-1440-light.png (sibling seat)
- *Observed:* The Controls, Keyframes and Timeline surfaces are components hosted by ChannelControls.vue:76-150, with ribbons declared in RibbonBar. The matrix surface is two ad-hoc render functions: an unnamed role=tabpanel (panelLabel null; CubeScene.vue:125-130 admits the missing name) plus its own ribbon skin. The panel has no title and no legend for its glyph grammar: S/P/T subscripts, with 'Pw' for perspective, are never explained.
- *Expected:* COHESION (owner 2026-09-23): every animation view shares one idiom and there are no one-off editors or chrome. A surface is a named panel with a heading and uses the shared ribbon.
- *Owner:* CONSUMER demo/scenes/cube/CubeScene.vue:131-162 (tabsContent / ribbonContent render functions) — Matrix Controls panel as a whole
- *Fix:* Promote MatrixEditor to a registered control surface that ChannelControls hosts next to controls/keyframes/timeline (aria-labelledby a visible 'Transform matrix' heading). Its verbs go through RibbonBar as data. Add a one-line legend or tooltips for S/P/T/w.

**UIA-KF-162 · MEDIUM · P and off-diagonal cells get rotate bounds ±360 on the slider though their values are unitless matrix entries** [M]
- *Page · state:* cube-matrix-controls-tab — finding `cmm1`
- *Frame:* (source; selecting any P or off-diagonal cell)
- *Observed:* The slider for a perspective or shear cell (normal magnitudes around 0..1 or ≤0.01) spans ±360 degrees, so one slider step wildly distorts the cube and the control is effectively unusable for those cells.
- *Owner:* CONSUMER demo/scenes/cube/matrix-editor/transformMath.ts:240-249 (getSliderOptionsFromIx maps everything that is not T or S to transformSliderOptions.rotate, bounds [-360,360])

**UIA-KF-163 · MEDIUM · The same animation options get different controls per scene: duration is a text input on cube/amiga/square, an orange slider on easing, absent on spring** [A]
- *Page · state:* controls-tab-channel-options · default per scene — finding `co#6`
- *Frame:* 01-cube-controls-default-1440-light-crop.png, 12-amiga-controls-default-1440-light-crop.png, 12-square-controls-default-1440-light-crop.png, 12-easing-controls-default-1440-light.png, 12-spring-controls-default-1440-light.png
- *Observed:* Cube, amiga and square share the ChannelOptions card. Easing instead shows a PRESET card with a tall curve tile, dead space, and a 'duration' label over a short orange slider fill, a different widget for the same property. Easing's ribbon adds an eye toggle, and the others have none. Spring has no ribbon at all.
- *Expected:* One Controls idiom across all animation views: the same field for the same option, and the same ribbon grammar.
- *Owner:* CONSUMER demo/scenes/easing/EasingSidebar.vue:190-197 (the duration-field slider skin) versus ChannelOptions.vue:65-88 (LabeledInput 'duration'); the preview eye toggle appears only on easing (PlaybackRibbon.vue preview prop) — Controls tab across #/cube, #/amiga, #/square, #/easing, #/spring
- *Fix:* Have easing and spring mount ChannelOptions, or a shared options subset built from the same LabeledInput/LabeledSelect rows, and put their scene-specific facets on separate surfaces. Give the preview toggle to every ribbon or to none.
- *Confirm amendment:* The divergence is confirmed: 12-easing-controls-default-1440-light-crop.png shows the PRESET card, an empty curve tile, and 'duration' as an orange fill slider with no thumb and no value readout, plus an eye toggle only on easing. Correction: spring is not 'no ribbon at all'. It has its own stage transport pill (Play / 'Sweep' select / reset) under the stage (12-spring 1440). That is a third transport grammar, which strengthens the finding. The easing duration slider also never shows the duration value (see missed).

**UIA-KF-164 · MEDIUM · Select group headings render larger than the options, and their text edge is 4px off the rows** [C]
- *Page · state:* controls-tab-channel-options · select open — finding `co#7`
- *Frame:* 02-cube-easing-select-open-1440-light.png, 02-cube-easing-select-open-390-light.png, R3-after-pencil-peek-select-open-1440-light.png; probe: label class 'py-1.5 pl-8 pr-2 font-semibold text-muted-foreground' 18.608px/600 vs items 16.4px, descriptions 14.38px
- *Observed:* 'Standard', 'Sine', 'Steps' and 'Custom' render at 18.6px semibold, above the 16.4px option names, so the headings dominate the choices. The heading inset (32px) does not line up with the option gutter (28px).
- *Expected:* The heading sits on the family secondary rung (text-dropdown-secondary ≈ 14.4px) and shares the option text edge (DESIGN menu-row gutter).
- *Owner:* CONSUMER (pin) — keyframes package.json:78 pins @mkbabb/glass-ui 7.0.0; cured in glass ≥8/10.0.1 (HEAD class-names.ts:135, SelectLabel ps-7) — #/cube easing Select open
- *Fix:* Adopt a glass version with the HEAD twMerge font-size group and ps-7 (route to the glass-ui session). Until then the consumer can drop its class override: muted colour should be the SelectLabel default at the root, not a per-instance class.

**UIA-KF-165 · MEDIUM · Opening the curve editor to look at it silently rewrites the easing** [C]
- *Page · state:* controls-tab-channel-options · pencil open → back without editing — finding `co#10`
- *Frame:* R3-after-pencil-peek-select-open-1440-light.png; 11-cube-ribbon-reverse-hover-1440-light.png; repro-log.json pencil{before:'ease-in-out', afterPeekBack:'cubic-bezier'}
- *Observed:* The trigger changes from 'ease-in-out' to 'cubic-bezier' and the easing label turns gold (the 'custom' signal) although nothing was edited. The named keyword is lost.
- *Expected:* Viewing does not mutate state. The conversion to cubic-bezier happens on the first real drag or edit, and backing out untouched restores the named easing.
- *Owner:* CONSUMER demo/components/instrument/transport/channel-controls/composables/useTimingFunctionEditor.ts:341-349 (onEasingLabelClick writes controlPoints + updateTimingFunctionFromName('cubic-bezier') on open) — #/cube Controls tab → pencil → back
- *Fix:* Seed the picker from NAMED_EASING_BEZIER without committing. Commit the conversion on the first onPickerChange, and on exitDetailPanel with no edit, keep or restore the named key.

**UIA-KF-166 · MEDIUM · The error text is a raw 4-line engine message that pushes the row, re-centres the label and moves the ribbon** [C]
- *Page · state:* controls-tab-channel-options · error — finding `co#11`
- *Frame:* 08-cube-duration-invalid-1440-light-crop.png, 08-cube-duration-invalid-1440-dark.png, 08-cube-duration-invalid-390-light.png
- *Observed:* 'Invalid value for animation option "duration": "abc" — expected a positive duration in milliseconds or a CSS time string' wraps to 4 red lines. The 'duration' label floats to the middle of the 136px block, away from its input. The pane grows 96px (632→728) and the ribbon card jumps down.
- *Expected:* A short human error ('Use a time like 500ms or 2s'). The label stays aligned to its control. Layout shift is minimal.
- *Owner:* GLASS+CONSUMER — CONSUMER: ChannelOptions.vue:87/:831 passes e.message verbatim; GLASS: labeled-field label is cross-axis centred on the whole field block, so an error re-centres it — #/cube Controls tab, duration invalid
- *Fix:* Map AnimationOptionError to short per-field messages in the consumer. Producer: align the labeled-field label to the control row (align-self:start + control-height line box), and relay that half to the glass-ui session.

**UIA-KF-167 · MEDIUM · The easing detail editor repeats the preset picker** [C]
- *Page · state:* controls-tab-channel-options · detail editor open — finding `co#12`
- *Frame:* 09-cube-easing-detail-editor-1440-light-crop.png
- *Observed:* The main card's easing Select, grouped with curve glyphs, and the editor's 'PRESET' Select both choose a named easing. PRESET uses a third label register (uppercase, tracked) that appears nowhere else in the pane.
- *Expected:* One preset chooser per surface, and one label register.
- *Owner:* GLASS+CONSUMER — GLASS: EasingPicker has no prop to hide its preset row (HEAD EasingPicker.vue:517-522); CONSUMER: TimingFunctionPanel.vue hides the duplicate — #/cube Controls tab → pencil
- *Fix:* Add a glass EasingPicker prop (for example `presets={false}`) and relay it to the glass-ui session. The consumer hides the duplicate, since the grouped Select stays one step back.

**UIA-KF-168 · MEDIUM · Provenance notice goes stale; departure view shows a curve unrelated to the named source** [C]
- *Page · state:* controls-timing-function-detail · after drag; departure — finding `tf#8`
- *Frame:* 05-after-drag-1440-light-crop.png, 10-departure-engine-native-1440-light-crop.png
- *Observed:* After an authored drag, the header still says 'from ease-in-out' while PRESET says 'Pick a curve' and the readout shows cubic-bezier(0.42, 0, 0.216, 1.6). On departure the notice reads 'departing from ease-in-bounce — engine-native, no cubic-bezier reproduces it', but the plot shows the previous custom quad, which has no relation to bounce.
- *Expected:* The disclosure describes what is on screen. It clears or changes to 'edited' once the user has authored a change. A departure seats a reasonable approximation of the source, or says it is starting from the last custom curve.
- *Owner:* CONSUMER (useTimingFunctionEditor.ts:321-362 convertedFromName kept after authoring; departure opens on the stored quad) — detail header
- *Fix:* Clear or reword convertedFromName on the first authored emit. For a departure, seat a nearest-bezier approximation (value.js fit) or state the actual starting curve in plain words.

**UIA-KF-169 · MEDIUM · Inconsistent disabled posture: with enabled off, the z-index label stays at full ink while its stepper dims** [C]
- *Page · state:* controls-advanced-layer — finding `adv#5`
- *Frame:* 08-amiga-enabled-off-1440-light-crop.png, 08-amiga-enabled-off-1440-dark-crop.png
- *Observed:* Label opacity: blend 0.5, weight 0.5, z-index 1.0. The z-index stepper buttons and value are dimmed.
- *Expected:* Each disabled row dims label and control together through glass 7's disabled channel (the header comment says blend, z-index and weight 'render disabled beneath the live switch').
- *Owner:* CONSUMER — LayerConfigPanel.vue:68 (<LabeledField label="z-index"> gets no :disabled, so glass never sets data-disabled on the row and the label never dims; only the inner NumberField is disabled) — amiga advanced pane, enabled=off, 1440 and 390, light and dark
- *Fix:* Pass :disabled="!layerConfig.enabled" to the z-index LabeledField as well as to the NumberField.

**UIA-KF-170 · MEDIUM · In the mobile drawer every label and the muted 'advanced' header resolve to pure #000 / #fff, losing the muted ink and the app's warm ink** [C]
- *Page · state:* controls-advanced-layer — finding `adv#6`
- *Frame:* 03-amiga-advanced-pane-390-light.png, 03-amiga-advanced-pane-390-dark.png; probe-ink.mjs chain output; compare 03-amiga-advanced-pane-1440-light-crop.png
- *Observed:* 1440: header rgb(112,89,66) 16.4px, labels rgb(28,25,23). 390: header, back arrow and all labels rgb(0,0,0) in light and rgb(255,255,255) in dark, at 14px. In the element chain, the Card (div.glass-quiet.card) has --muted-foreground: contrast-color(light-dark(hsl(30 85% 96%…)), which Chromium resolves to pure black or white. The muted header therefore reads the same as the labels, and the ink is off-palette.
- *Expected:* Surfaces nested in a drawer keep the warm --foreground and the muted register. The bright-bucket flip applies only over a genuinely bright or busy backdrop (ladder.css's own comment says a calm plate should keep the WARM-INK and muted caption register).
- *Owner:* GLASS — src/styles/glass/ladder.css:254-279 (@supports contrast-color → @container style(--glass-backdrop: light) { .glass-quiet, … { color / --foreground / --muted-foreground: contrast-color(var(--card)) } }), which fires on the glass-quiet Card nested in .glass-drawer, including in dark theme — advanced pane and Controls tab inside the 390 drawer, light and dark
- *Fix:* At the root in glass-ui: do not pass the --glass-backdrop: light flag from the drawer plate down to nested content tiers (or gate the flip on the actual backdrop sample), and keep a muted mix instead of collapsing --muted-foreground to the same contrast ink. Route to the glass-ui session.

**UIA-KF-171 · MEDIUM · The blend select departs from the sibling easing select: no per-item descriptions (the description table sits unused in the demo) and no mark on the selected item** [A]
- *Page · state:* controls-advanced-layer — finding `adv#9`
- *Frame:* 04-amiga-blend-open-1440-light-crop.png, 04-amiga-blend-open-1440-dark-crop.png, 04-amiga-blend-open-390-light.png; sibling: ../controls-tab-channel-options/02-cube-easing-select-open-1440-light-crop.png
- *Observed:* Options are 'replace / add / accumulate' as bare words. 'replace' has aria-selected=true but a transparent background and no check. The easing select one pane over shows a glyph, a mono name and a muted description per item. What 'add' and 'accumulate' do goes unexplained although the demo already has copy for them.
- *Expected:* One select idiom across the Controls pane (cohesion): item title plus muted description, and the current value marked.
- *Owner:* CONSUMER (the missing selected mark is 7.0.0 lag) — amiga, blend select open, 1440 and 390, light and dark
- *Fix:* Compose LabeledField + Select as the easing select does (the path glass HEAD mandates anyway). Render COMPOSITE_OPERATOR_DESCRIPTIONS as the SelectItem description and include the item indicator.
- *Confirm amendment:* The missing descriptions are CONSUMER, confirmed: LayerConfigPanel.vue:151-152 records that the COMPOSITE_OPERATOR_DESCRIPTIONS binding was deleted as a phantom prop. The missing selected mark is 7.0.0 lag, not an open glass defect: glass HEAD SelectItem.vue:56-57 defaults indicator to 'start' unless hideIndicator is set. Drop the GLASS co-owner; it is cured by the bump together with the LabeledField+Select rewrite.

**UIA-KF-172 · MEDIUM · Two stacked cartoon Cards (editor + ribbon), each with a hard offset shadow; four actions wrap to two rows with 'Apply CSS' orphaned** [C]
- *Page · state:* keyframes-tab-css-editor · rest — finding `kce#7`
- *Frame:* 01-keyframes-rest-1440-light-crop.png, 08-apply-active-1440-dark-crop.png, 02-ribbon-in-view-390-light.png
- *Observed:* The pane is two sibling glass cards (glass-resting 407x454 and glass-quiet 407x108), both cartoon-stamped with -3px 3px offset shadows, so two heavy frames stack in a 475 px column. In a 407 px-wide card, Copy/Format/Export CSS fill row 1 and Apply CSS sits alone and centred on row 2. The ribbon card holds nothing but four buttons, so the card spends more chrome than its content.
- *Expected:* One surface per job. The action bar belongs to the editor (a CardHeader/CardFooter of the same card, or a single-line toolbar), fits on one line in the pane, and puts the primary action where it reads as primary. Owner: 'cluttered'; §0bl OA-36 clutter.
- *Owner:* CONSUMER — demo/components/instrument/keyframes/CSSCodeEditor.vue:24-28 (<Card cartoon :shadow=false> via :is) + transport/controls-pane/RibbonBar.vue:2-4 (<Card cartoon tier=quiet>) + :13-15 (flex-wrap justify-center) — keyframes-tab-css-editor, cube/amiga/square, 1440 + 390, light+dark
- *Fix:* Fold the actions into the editor card as a single-line footer or header toolbar. Use compact icon+label buttons, or icon buttons with glass Tooltips for Copy/Format, so the row fits 407 px (and 320 px at 390). Drop the second cartoon card. Keep one cartoon shadow on the pane's surface, not on each child.

**UIA-KF-173 · MEDIUM · Copy and Export CSS are near-duplicate copy actions with different content and different animation names** [C]
- *Page · state:* keyframes-tab-css-editor · after Copy / after Export CSS — finding `kce#8`
- *Frame:* 05-copy-toast-1440-light.png, 07-export-toast-1440-light.png; capture-log-1440-light.json notes.clip vs notes.exportClip
- *Observed:* Copy puts the editor buffer on the clipboard: a generated class rule `.keyframes-style-cube-Rotations {animation-*}` plus `@keyframes keyframes-style-cube-Rotations`. Export CSS puts `@keyframes Rotations {…}` there. Both are clipboard copies, with no visible feedback (finding 2), and they name the same animation two different ways. Nothing tells the user which one to ship.
- *Expected:* One copy affordance per artifact, clearly named. Duplicated affordances are the clutter the owner named ('controls that do not earn their place').
- *Owner:* CONSUMER — demo/components/instrument/transport/controls-pane/RibbonBar.vue:16-46 + KeyframesStringControls.vue:245-290 (copyCSS vs exportCompiledCSS) — keyframes-tab-css-editor, cube, 1440 light
- *Fix:* Merge them into one 'Copy CSS' with a glass Select/menu for the variant (editor buffer vs compiled zero-runtime), or keep only Export and let Copy be the editor's own ⌘C. Use the same animation name in both outputs.

**UIA-KF-174 · MEDIUM · Generated internal identifiers dominate the buffer ('keyframes-style-cube-Rotations'), and word-wrap breaks mid-token** [C]
- *Page · state:* keyframes-tab-css-editor · rest — finding `kce#9`
- *Frame:* 01-keyframes-rest-1440-light-crop.png ('rotateY / (0turn)', 'var / (--rotationX)'), 02-ribbon-in-view-390-light.png ('.' alone on line 1, 'keyframes-style-cube-Rotati / ons {', 'animation-timing-function / : ease…'), 20-spring-keyframes-1440-light.png ('Spring-Keyfram / es')
- *Observed:* The first thing the user reads is a machine class name (keyframes-style-<scene>-<name>), repeated three times. The user's animation is 'Rotations'. Monaco wraps inside identifiers and before '(' and ':', so the code is hard to read at every width. The worst case is 390, where one selector spans three visual lines.
- *Expected:* Hierarchy: the primary content (the keyframes) is legible and dominant. Code wraps at token boundaries or scrolls horizontally.
- *Owner:* CONSUMER — CSSCodeEditor.vue:350 (wordWrap: 'on' in a 316–403 px column at 14 px Fira Code) + useKeyframesEditor/keyframesStyleId naming (KeyframesStringControls.vue:73-78) — keyframes-tab-css-editor, all scenes, 1440 + 390
- *Fix:* Show the user-facing name in the buffer (@keyframes Rotations) and keep the style-id mapping internal. Set wrappingStrategy: 'advanced' with wordWrapBreakBeforeCharacters/AfterCharacters tuned for CSS, or wordWrap 'off' + horizontal scroll at narrow widths. Consider 13 px on the narrow pane (still above the iOS no-zoom clamp).

**UIA-KF-175 · MEDIUM · Apply CSS toggle is hand-rolled: rainbow-vivid class override on a glass Button, no aria-pressed** [A]
- *Page · state:* keyframes-tab-css-editor · selected (Apply active) — finding `kce#10`
- *Frame:* 08-apply-active-1440-dark-crop.png, 08-apply-active-1440-light.png; capture-log-*.json notes.applyPressed = null
- *Observed:* The applied state is a full rainbow gradient fill with white text, bolted onto a secondary glass Button through a consumer class and a scoped border rule. It is the loudest element on the pane. aria-pressed is absent, so the on/off state is not announced, although KeyframesStringControls' own comments describe it as a pressed toggle.
- *Expected:* Glass idiom: a two-state action is the glass Toggle (glass-ui/src/components/toggle) or a Button with aria-pressed and glass's own pressed styling. Tokens, not a bespoke gradient.
- *Owner:* CONSUMER (a dedicated glass Toggle would be a separate GLASS request) — keyframes-tab-css-editor, 1440 light+dark
- *Fix:* Render Apply CSS as a glass Toggle (or Button with :aria-pressed=cssApplied) using glass's selected/pressed treatment. Delete the rainbow-vivid override and .ribbon-apply--active. If a brand accent is wanted, request a glass variant.
- *Confirm amendment:* The substance is CONFIRMED (08-apply-active crops, applyPressed null). The prescribed primitive does not exist: glass-ui has no src/components/toggle, only toggle-group, switch and button. DESIGN.md:13's four-state contract names 'aria-pressed / .is-active' as the semantic toggle. So the cure is the glass Button with :aria-pressed and the glass .is-active treatment, or a single-item ToggleGroup. If a dedicated glass Toggle is wanted, it is a GLASS request to route to the glass-ui session.

**UIA-KF-176 · MEDIUM · Editor focus ring is Monaco's/UA blue outline, not the glass --ring** [C]
- *Page · state:* keyframes-tab-css-editor · focus (editor) — finding `kce#12`
- *Frame:* 10-parse-error-shake-1440-light.png, 11-parse-error-toast-1440-light.png (blue rounded outline around the card), 09-editor-focused-1440-light.png; capture-log focus = 'DIV.native-edit-context fv=true outline=auto rgb(0, 95, 204)'
- *Observed:* Focusing the code draws a saturated UA/Monaco blue outline (rgb(0,95,204)) around the well. The ribbon buttons, by contrast, show the glass focus-ring box-shadow (04-focus-copy). There are two focus languages on one pane.
- *Expected:* One focus treatment: glass focus-ring / --ring on every focusable surface (states consistent).
- *Owner:* CONSUMER — CSSCodeEditor.vue theme (focusBorder from GitHub.json/Dracula.json) + the .cartoon-surface:has(:focus-visible) lift in styles/design-idioms.css — keyframes-tab-css-editor, cube, 1440 light+dark
- *Fix:* Set focusBorder in the token-built Monaco theme to --ring (finding 7). Suppress the UA outline on .native-edit-context and let the card's :has(:focus-visible) glass ring and lift carry focus.

**UIA-KF-177 · MEDIUM · reverseCSSTime's 5000 ms threshold makes Format byte-unstable even after the ×1000 fix** [M]
- *Page · state:* keyframes-tab-css-editor — finding `kcem0`
- *Observed:* milliseconds >= 5000 ? s : ms, so an authored '0.25s' or '4.5s' re-serializes as '250ms' or '4500ms' on any edit or Format. The value survives but the author's unit is rewritten. Keep the author's unit (carry it through parse) or always emit the shortest exact form.
- *Owner:* CONSUMER/keyframes library — src/animation/compile/emit/css-text.ts:12-13

**UIA-KF-178 · MEDIUM · Caret readouts straddle the track border and repeat the tick labels; the selected percent appears three times** [C]
- *Page · state:* timeline-tab · populated and selected at 1440 and 390, light and dark — finding `tl#7`
- *Frame:* 06-populated-1440-light-crop.png; 10-selected-1440-light.png; 13-css-editor-error-1440-dark-crop.png
- *Observed:* The track spans y 290-338 and the caret readouts span y 330-344, so each '0% 35% 70% 100%' sits on the track's bottom border line. The 0% and 100% ticks above the rail repeat the 0% and 100% caret readouts below it. When a stop is selected, '35%' shows on the caret (underlined), again as the editor header and again in the tooltip.
- *Expected:* Readouts clear the rail (the offset tokens in TimelineTrack.vue:757-764 claim clearance), with one label per position and one percent readout per selection.
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/timeline/components/TimelineTrack.vue:743-765 (--timeline-caret-offset 16px/23px) and TimelineCaret.vue:69; KeyframeTimeline.vue:255-257 (duplicate header percent).
- *Fix:* Put carets below the rail with the offset derived from the rail's block size plus a gap token, and hide tick labels that coincide with a stop. Replace the header percent with the label field alone, since the caret already shows it.

**UIA-KF-179 · MEDIUM · Two toolbars and four wrapped ribbon verbs for one instrument; Import and Add CSS are near-duplicates** [C]
- *Page · state:* timeline-tab · all states; ribbon at 1440 and 390 — finding `tl#8`
- *Frame:* 06-populated-1440-light-crop.png; 02-ribbon-hover-snapshot-1440-light.png; 07-populated-track-in-view-390-light.png
- *Observed:* Undo/Redo/Clear/Expand sit in a right-aligned row inside the timeline card and leave its left 60% empty. Snapshot/Import/Export/Add CSS sit in a SECOND card below. At 1440 the four stadium buttons wrap 3+1 (Add CSS orphaned and centred); at 390 they wrap 2+2 and the second row falls under the transport. Import (replace) and Add CSS (merge) open the same dialog with different verbs and neither label says 'replace'. 'Export' here copies CSS while the Keyframes tab's 'Export CSS' compiles, so the same word names two artifacts.
- *Expected:* One toolbar per instrument with no orphan wrap, and each control earning its place (the audit lens CLUTTER). Stadium is right for these single-line actions (DESIGN.md:386 --radius-control), so the issue is count and layout, not shape.
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/transport/controls-pane/RibbonBar.vue:69-101; KeyframeTimeline.vue:86-167; CSSPasteDialog descriptors at KeyframeTimeline.vue pasteDialogs.
- *Fix:* Merge into one row in the timeline card: Snapshot · Paste @keyframes (one dialog with a Replace/Merge choice) · Copy CSS · overflow (Undo/Redo/Clear/Expand), or icon-only secondary buttons. Rename Export to 'Copy CSS'.

**UIA-KF-180 · MEDIUM · About 40px dead band reserved for the invisible pan row at zoom 1** [C]
- *Page · state:* timeline-tab · all non-zoomed states at 1440 and 390 — finding `tl#9`
- *Frame:* 06-populated-1440-light-crop.png vs 19-zoomed-focus-1440-light-crop.png
- *Observed:* The pan row is opacity-0 but still in flow at zoom=1, which leaves an empty band between the preview stage and the tick labels in every resting frame. It only fills once zoomed (frame 19, '2.0X').
- *Expected:* No reserved dead space (the audit lens HIERARCHY). The pan row appears only when zoomLevel > 1.
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/timeline/components/TimelineTrack.vue:36-38
- *Fix:* Collapse the row with grid-template-rows 0fr→1fr (or v-show plus a height transition) instead of opacity.

**UIA-KF-181 · MEDIUM · Timeline surfaces are hand-rolled with off-canon radius and ink-weight borders** [A]
- *Page · state:* timeline-tab · all states at 1440 and 390 — finding `tl#10`
- *Frame:* 07-populated-track-in-view-1440-light-crop.png; 19-zoomed-focus-1440-light-crop.png; 09-hover-preview-1440-light.png
- *Observed:* The track rail is 'rounded-lg border border-muted-foreground bg-muted/50', computing radius 8px with a 1px rgb(112,89,66) ink border, where the rest of glass uses hairlines. The preview stage is rounded-lg at 8px. The pan bar is a hand-rolled rounded-full groove with an ink border. The buildError banner is hand-rolled rounded-lg destructive/10. The stop-count chip is hand-rolled rounded-full bg-primary. The caret edit box is 'rounded' (4px) on bg-[var(--input-on-glass)]. The hover ghost plate is rounded-md.
- *Expected:* Roles, not rungs (DESIGN.md:385-391): --radius-media for the stage and ghost tile, and a glass Input for the caret edit (--radius-control). Use glass Badge for the count and glass Alert tone=destructive for buildError. The rail and groove should come from the glass slider groove tokens; glass-ui src/components/timeline/README.md:17-18 names `<Slider :marks>` as the playhead-with-ticks surface. Use hairline border tokens, not --muted-foreground ink.
- *Owner:* CONSUMER — keyframes.js TimelineTrack.vue:43, :61, :109, :222; KeyframeTimeline.vue:173, :217; TimelineCaret.vue:106; TimelineHoverPreview.vue:69
- *Fix:* Swap to the named primitives and role tokens. Take the rail's groove, border and fill from the glass slider stylesheet variables instead of utilities.
- *Confirm amendment:* The radius and primitive part is CONFIRMED. The rail and stage are rounded-lg at 8px (TimelineTrack.vue:109, KeyframeTimeline.vue:173), the pan bar and stop-count are rounded-full (TimelineTrack.vue:43, :222), and the buildError banner is hand-rolled (KeyframeTimeline.vue:217). The 'use hairline border tokens, not --muted-foreground ink' part is amended. The source comment above TimelineTrack.vue:36 says --muted-foreground was chosen deliberately so the rail boundary meets WCAG 1.4.11 (3:1 non-text contrast), and a hairline would regress that. The fix should use a glass groove/boundary token that meets 3:1, not a hairline. The owner is CONSUMER, and it depends on the Slider-marks GLASS ask below.

**UIA-KF-182 · MEDIUM · Clear all keyframes fires instantly with no confirm and no undo prompt, unlike the app's other Clear all** [C]
- *Page · state:* timeline-tab · 'Clear all keyframes' at 1440 and 390 — finding `tl#11`
- *Frame:* 23-hover-clear-1440-light.png; 24-after-clear-all-1440-light.png
- *Observed:* One click on the destructive-tone trash empties the whole timeline. There is no confirmation, no toast and no inline 'Undo' offer; only the small Undo icon (now enabled) can recover it. The @mbabb menu's 'Clear all' uses a confirm dialog (sibling seat clear-all-confirm-dialog), so the two destructive clears behave differently.
- *Expected:* Destructive actions are consistent across the app (the audit lens COHESION/STATES): either the confirm dialog or a glass toast with an Undo action.
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/timeline/KeyframeTimeline.vue:128-143 (Clear button → clear()); composables/useTimelineBuild.ts:339-342
- *Fix:* After clear(), fire a toast('Cleared N keyframes', { action: Undo }), or reuse the confirm dialog.

**UIA-KF-183 · MEDIUM · The hover-preview tooltip occludes the timeline card's own toolbar and tick labels** [M]
- *Page · state:* timeline-tab — finding `tlm1`
- *Frame:* 09-hover-preview-1440-light.png
- *Observed:* The tooltip opens upward over the card and covers Undo, the 25%/50% tick labels and half the stage, so the instrument hides itself.
- *Owner:* CONSUMER — TimelineTrack.vue:233-255 (tooltip side and max-w-56)

**UIA-KF-184 · MEDIUM · 390: 'Timeline' label on the dock's collapse chip is clipped at the pill's right edge** [A]
- *Page · state:* timeline-expanded · expanded, dock expanded — finding `tx#9`
- *Frame:* 06-transport-dock-expanded-collapse-chip-390-light.png (stray 'T' past the collapse icon)
- *Observed:* The label renders past the dock pill's right edge and is cut off.
- *Expected:* Dock contents fit the dock. Icon-only at compact widths, with the name in the tooltip.
- *Owner:* CONSUMER only (TransportDock.vue:162) — timeline-expanded 390, dock hovered
- *Fix:* Drop the label and keep the tooltip, or hide it under the compact container query.
- *Confirm amendment:* The clip is confirmed: 06-390-light shows a stray glyph past the collapse icon at the pill's right edge. Drop the secondary GLASS owner. GlassDock.vue:41-44 makes a capped axis 'overflow: auto unconditionally', so the dock scrolls by contract, and what the frame shows is the scroll edge. The consumer overfills the run with a loose span (TransportDock.vue:162). Owner = CONSUMER only.

**UIA-KF-185 · MEDIUM · Track, preview stage and error banner use rounded-lg 8px, which is not on the radius role table** [A]
- *Page · state:* timeline-expanded · expanded — finding `tx#11`
- *Frame:* P2-expanded-populated-1440-light.png
- *Observed:* Computed border-radius is 8px on .timeline-track and .timeline-preview-stage, next to a 16px card and stadium buttons.
- *Expected:* Multi-line holders use --radius-field 16px and panels --radius-panel 12px (DESIGN.md:386, :389). Use role tokens, not Tailwind rounded-lg.
- *Owner:* CONSUMER — TimelineTrack.vue:109; KeyframeTimeline.vue:173, :217 — timeline-expanded, all
- *Fix:* rounded-[var(--radius-field)] (or the panel token) on the track, stage and banner.
- *Confirm amendment:* 8px is confirmed in capture-log.json and at TimelineTrack.vue:109 and KeyframeTimeline.vue:173 and :217. Correction: the role table includes --radius-media (10px, 'Media tile', DESIGN.md:384). The preview stage is a media tile and should take --radius-media, not --radius-field. The track (a multi-line holder) takes --radius-field 16px, and the banner takes --radius-field or --radius-panel. The fix should name the role for each element.

**UIA-KF-186 · MEDIUM · Preview stage is a large, cropped copy of the subject already on stage and outweighs the track** [C]
- *Page · state:* timeline-expanded · expanded — finding `tx#12`
- *Frame:* P2-expanded-populated-1440-light.png; 01-expanded-empty-390-light.png
- *Observed:* The 160px preview shows one or two cube faces cropped at the edges. It is the largest element in the cell, above a 128px track, and the live subject is visible beside it at 1440.
- *Expected:* The primary content (track and diamonds) dominates (hierarchy).
- *Owner:* CONSUMER — KeyframeTimeline.vue:168-177 (h-40 when expanded) — timeline-expanded 1440 and 390
- *Fix:* Shrink or drop the preview in expanded mode, or make it a thumbnail on the playhead.

**UIA-KF-187 · MEDIUM · End-of-track diamonds and their labels overhang the track border; the '0%' label collides with the playhead** [M]
- *Page · state:* timeline-expanded — finding `txm0`
- *Frame:* P2-expanded-populated-1440-light.png; P3-expanded-selected-390-dark.png
- *Observed:* The 0% and 100% diamonds sit half outside the track's rounded border. The '0%' marker label overlaps the violet playhead bar at the left edge, and '100%' touches the right border.
- *Owner:* CONSUMER — TimelineTrack.vue:109 (overflow-x-clip on the track; markers placed at 0%/100% with no inset)
- *Fix:* Inset the marker rail by half a diamond (padding-inline on the rail) so the 0 and 100 markers and their labels sit inside the track.

**UIA-KF-188 · MEDIUM · 390: the bottom sheet's peek overlaps expanded-timeline content, and its grab handle crosses the Label input** [M]
- *Page · state:* timeline-expanded — finding `txm1`
- *Frame:* P3-expanded-selected-390-dark.png
- *Observed:* The sheet's top edge and grab handle paint over the selected keyframe's '35% Label… ×' row, so the handle cuts through the input.
- *Owner:* CONSUMER — AnimationControlsGroup.css:179-184 (fixed cell bottom = --dock-menubar-reserve does not reserve the sheet peek) + ControlsPaneWrapper sheet
- *Fix:* Anchor the expanded cell above the sheet's peek height, or collapse the sheet while the timeline is expanded.

**UIA-KF-189 · MEDIUM · A stale error stays after the draft is edited, and after closing and reopening** [C]
- *Page · state:* css-paste-dialog · error → edit draft; error → Esc → reopen — finding `cpd#6`
- *Frame:* 06-import-tab-focus-1440-light-crop.png (a valid @keyframes draft still marked 'NO @KEYFRAMES STOPS FOUND' with pink invalid tint and aria-invalid=true), 12-import-reopen-after-error-1440-light.png
- *Observed:* The error message, aria-invalid and the invalid tint stay after the user fixes the text. They are still there when the dialog is dismissed and reopened.
- *Expected:* Error state reflects the current draft. Clear it on edit and on open (STATES lens: error consistent with content).
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/timeline/CSSPasteDialog.vue:164-183 (`error` is reset only inside onSubmit)
- *Fix:* Clear `error` in the text update handler and when `modelOpen` changes to true.

**UIA-KF-190 · MEDIUM · The invalid-state border is overridden by a stale consumer border class** [C]
- *Page · state:* css-paste-dialog · parse error, light and dark — finding `cpd#7`
- *Frame:* 03-import-parse-error-1440-light-crop.png (border 1.5px rgb(112,89,66) identical to rest), 03-import-parse-error-1440-dark-crop.png
- *Observed:* In the invalid state the fill tints pink but the edge stays muted brown. The override was justified by a 5% producer perimeter ink. glass now ships `--ink-perimeter` 0.48 (a 3.0:1 rung), and its invalid state sets border-color var(--destructive).
- *Expected:* glass src/components/_shared/field/control.css:47-52 (THE ONE INK) and :245 (invalid border = --destructive). Tokens, not consumer overrides.
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/timeline/CSSPasteDialog.vue:64 (`class="font-mono border-muted-foreground"`, justified at :45-50)
- *Fix:* Delete `border-muted-foreground`. Bump the glass-ui pin so the producer perimeter ink applies.

**UIA-KF-191 · MEDIUM · The dialog anatomy skips DialogHeader and overrides the title and description type and ink** [C]
- *Page · state:* css-paste-dialog · open, all states — finding `cpd#8`
- *Frame:* 01-import-open-empty-1440-light-crop.png, 34-390-import-typed-focus-390-light.png
- *Observed:* No `[data-slot=dialog-header]` is found on the plate (header=false in every frame). Title and description are bare grid children spaced by the 16px body gap, so the pair reads as two unrelated rows. The title carries `text-subheading`. The description carries `text-body text-muted-foreground` and paints muted brown over the scrim.
- *Expected:* glass dialog anatomy: DialogHeader groups title and description on the atom rung (glass src/components/dialog/styles.css:35-42). Title and description form a derived √φ pair, and the description ink is `--foreground` for 4.5:1 on the painted plate (styles.css:62-85).
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/timeline/CSSPasteDialog.vue:23-24
- *Fix:* Wrap title and description in `<DialogHeader>`. Remove the class overrides on DialogTitle and DialogDescription.

**UIA-KF-192 · MEDIUM · The textarea renders at 14px on phone width, below the iOS 16px no-zoom floor** [A]
- *Page · state:* css-paste-dialog · 390 open / typed-focus, light and dark — finding `cpd#11`
- *Frame:* 34-390-import-typed-focus-390-light.png, 21-spring-add-open-390-light.png (capture-log textarea font 14px/400 Fira Code; probe-390 taFont 14px)
- *Observed:* At 390 the field font resolves to 14px (16.4px at 1440). Focusing it on iOS Safari zooms the page.
- *Expected:* Text fields at ≥16px on touch viewports (the iOS zoom floor the consumer comment relies on).
- *Owner:* GLASS — HEAD regression: control.css:111-122 drops --ui-scale from the field font (14px on phones) — lands at the bump — glass-ui src/components/_shared/field/control.css:112-122 (`font-size: var(--type-small)`) + src/styles/tokens/sizing.css:35. Consumer comment CSSPasteDialog.vue:37-39 claims `--control-text` clears the zoom floor.
- *Fix:* GLASS: clamp the field-control font floor to 16px at coarse or narrow viewports. CONSUMER: correct the comment's claim.
- *Confirm amendment:* The 14px measurement is an emulation artifact at the pinned 7.0.0. capture.mjs:44 and probe-390.mjs:8 create the context without hasTouch/isMobile, so `(pointer: coarse)` never matched. At 7.0.0 the field font is var(--field-control-font) = --control-text = --type-small × --ui-scale (dist CSS), and glass light-dark.css:17-20 sets --ui-scale 1.5 under pointer:coarse, so a real phone gets about 21px. The consumer comment at CSSPasteDialog.vue:37-39 is right at 7.0.0. The real defect is at glass HEAD: control.css:111-122 re-points the field to plain var(--type-small) (clamp floor 14px, scale.css:104-108) and deliberately drops the ui-scale. So once the pin is bumped, a real iPhone will get 14px and zoom. Owner GLASS is correct, but the finding should be rewritten as a HEAD regression that the bump will trigger. Re-measure with hasTouch:true/isMobile:true to prove it. Severity stays MEDIUM because the bump is already recommended by the rows above.

**UIA-KF-193 · MEDIUM · The empty well has no placeholder or example** [C]
- *Page · state:* css-paste-dialog · open, empty — finding `cpd#12`
- *Frame:* 01-import-open-empty-1440-light.png, 09-addcss-open-1440-light.png, 21-spring-add-open-1440-dark.png
- *Observed:* A 273px-tall blank textarea with placeholder="". The primary action is disabled with no hint of what to paste, and 10 rows of empty space dominate the plate.
- *Expected:* STATES lens: an empty state explains itself. glass Textarea forwards `placeholder` via $attrs (Textarea.vue:15-16).
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/timeline/CSSPasteDialog.vue:53-68 (no `placeholder`). Declared open as KAD-20 at KeyframesAddDialog.vue:141-146.
- *Fix:* Add a monospace placeholder with a two-line @keyframes example. Consider a smaller :rows floor, since field-sizing:content grows the well.

**UIA-KF-194 · MEDIUM · One-off stage card chrome: a 16px rounded card with hairline on the raw canvas, unlike every sibling scene** [C]
- *Page · state:* amiga-scene · all states; the 'full-bleed' panel-closed state — finding `am#8`
- *Frame:* 00-load-idle-1440-light.png (faint rounded rectangle 518..1396 × 127..773), 10-panel-closed-fullbleed-1440-light.png and 11b-fullbleed-playing-1440-dark.png (still an inset 1354×646 card whose bottom edge chops the room floor), compare cube-scene/01-idle-paused-1440-light.png (no plate)
- *Observed:* Amiga is the only scene that frames its stage. The `rounded-card` role (16px, 'Content card / popover') sits on a WebGL canvas. The stage never goes full-bleed, and the floor grid is cut off at y=773 behind the transport.
- *Expected:* demo/DESIGN.md §3 ('A full-bleed 3D canvas may omit a plate') and §8 ('No stage plate is required; the full-bleed canvas is the immersive genre's deliberate surface'). The card radius role (glass DESIGN.md:387) is for content cards, not a stage. Cohesion with cube.
- *Owner:* CONSUMER keyframes.js demo/scenes/amiga/AmigaScene.vue:49 (`rounded-card`) + :590 (inset hairline) — AmigaScene.vue:49, :552-591
- *Fix:* Drop `rounded-card` and the hairline and let the canvas fill the scene root like cube's stage. The focus ring then needs no special handling.

**UIA-KF-195 · MEDIUM · Room grid and contact shadow ignore the theme: grid nearly invisible in light, shadow invisible in dark, and a second grid pitch clutters the stage** [C]
- *Page · state:* amiga-scene · light vs dark, both viewports — finding `am#9`
- *Frame:* 00-load-idle-1440-light.png (back wall barely readable), 00-load-idle-1440-dark.png (crisp room), 03c-playing-bouncingY-selected-1440-dark.png and 11b-fullbleed-playing-1440-dark.png (no shadow under the ball: it floats ungrounded)
- *Observed:* The room grid uses one hex colour for both themes, so contrast flips polarity (faint on paper, loud on black). The black shadow blob disappears on the near-black ground. The in-canvas room grid also sits on top of the shell's `.grid-background` paper grid at a different pitch, so two grids compete behind the subject.
- *Expected:* Tokens, not literals (glass DESIGN law). demo/DESIGN.md §4: 'Stage tint is a low-contrast substrate, never a signal', retinted by theme. One grid substrate.
- *Owner:* CONSUMER keyframes.js demo/scenes/amiga/useAmigaThree.ts:213-222 (`new THREE.Color('#b9b9c6')` literal, opacity 0.35/0.18) + :102-115, :228-236 (black radial shadow blob) — useAmigaThree.ts:213-236
- *Fix:* Read the grid and shadow colours from theme tokens (resolve the CSS vars on theme change) with per-theme opacity. In dark, use a lifted or soft-light contact shadow. Keep either the room grid or the shell paper behind the room, not both.

**UIA-KF-196 · MEDIUM · Subject is undersized and outweighed by the controls chrome** [C]
- *Page · state:* amiga-scene · load / bouncing at 1440 and 390 — finding `am#10`
- *Frame:* 00-load-idle-1440-light.png (ball about 100px tall in a 646px stage), 00-load-idle-390-light.png (about 60px)
- *Observed:* The primary subject takes about 1/6.5 of the stage height. Two heavy cartoon control cards take the left third of the screen, and the eye lands on the panel first.
- *Expected:* HIERARCHY: the primary content dominates. The immersive register (§8) keeps the subject unobstructed and prominent.
- *Owner:* CONSUMER keyframes.js demo/scenes/amiga/useAmigaThree.ts:43-70, :163-190 (frameRoom / camera distance) — useAmigaThree.ts frameRoom
- *Fix:* Frame the camera to the bounce envelope, not the whole 12-unit room (e.g. fit ±WALL_X plus the radius with a small margin). Consider collapsing the controls by default on immersive scenes.

**UIA-KF-197 · MEDIUM · A missed drag orbits the room camera, and nothing puts the view back** [C]
- *Page · state:* amiga-scene · drag / arrow-key spin — finding `am#12`
- *Frame:* 06a-drag-spin-mid-1440-dark.png, 11b-fullbleed-playing-1440-dark.png, 10-panel-closed-fullbleed-390-light.png (room left rotated after the missed drag)
- *Observed:* A drag that starts off the ball (easy to do, since the ball bounces or is stranded by Reset) permanently rotates the room. Home and Reset restore only the ball's attitude, and there is no reset-view affordance.
- *Expected:* STATES: every manipulable state has a way back. Home 'returns it to its rest attitude', and the room view should have an equivalent.
- *Owner:* CONSUMER keyframes.js demo/scenes/amiga/useSphereSpin.ts (miss falls through to OrbitControls) + AmigaScene.vue:188-215 (Home resets only the ball) — AmigaScene.vue:205-207; useAmigaThree.ts OrbitControls setup :250-258
- *Fix:* Let Home, Reset or a double-tap also spring the OrbitControls camera to its home. Alternatively, give the orbit a soft return-to-home when released.

**UIA-KF-198 · MEDIUM · 390: the subject is never full-bleed, and the 'Controls panel' toggle raises the sheet instead of clearing the stage** [C]
- *Page · state:* amiga-scene · 390 subject full-bleed — finding `am#13`
- *Frame:* 00-load-idle-390-light.png (sheet peeks over the floor), 10-panel-closed-fullbleed-390-light.png and 10-panel-closed-fullbleed-390-dark.png (after the toggle, the sheet rises to y≈495 and covers the ball's lower half of travel)
- *Observed:* On mobile the stage always has a sheet over its bottom 20–40%. The toggle that clears the stage on desktop does the opposite here.
- *Expected:* The toggle has the same meaning at every breakpoint (COHESION). §8 immersive: the canvas stays full-bleed and unobstructed.
- *Owner:* CONSUMER keyframes.js shell sheet layout (controls sheet + 'Controls panel' toggle) — shell sheet toggle
- *Fix:* At 390, map 'Controls panel' off to fully dismissing the sheet, so the stage becomes full-bleed with the transport alone at the bottom.

**UIA-KF-199 · MEDIUM · After a drag takeover from playback the box rests permanently rotated 90° and off-colour with sideways text; Home does not restore it** [C]
- *Page · state:* square-scene · after takeover / after Home — finding `sq#7`
- *Frame:* 06c-drag-takeover-from-playback-1440-light.png, 06d-after-takeover-1440-light.png, 06d-after-takeover-390-light.png, q3-after-home-1440-light.png
- *Observed:* The takeover has no visible jump, but afterwards the subject settles at 90°, blue, with 'drag me' running vertically, and stays like that. Home re-centres x/y but leaves the −90° rotation (probe2 afterHome tf). The subject's rest identity (teal, upright) cannot be reached without a reload or a tumble.
- *Expected:* Once released, the non-positional channels (rotate/scale/colour) ease back to the rest identity, or Home fully resets. The subject's rest state is its identity (DESIGN.md square subject label).
- *Owner:* CONSUMER — demo/scenes/square/SquareScene.vue:276-282 (takeOverFromPlayback → seatFromPose) + useSquareDemo.ts seatFromPose (rotation/colour held; springs chase only x/y) — square-scene 1440/390 after Play → pointer drag
- *Fix:* On drag end after a takeover, spring rotate/colour back to rest (reuse the tumble's settle-to-teal path), and make Home call paintRest(). Not applied.

**UIA-KF-200 · MEDIUM · Action-row cards wrap with an orphaned last button** [M]
- *Page · state:* square-scene — finding `sqm0`
- *Frame:* 07c-tab-keyframes-1440-light.png (Copy/Format/Export CSS, then 'Apply CSS' alone on row 2), 07d-tab-timeline-1440-light.png (Snapshot/Import/Export, then 'Add CSS' alone)
- *Observed:* At 1440 the ~400px card fits three pills and drops the fourth onto a centred second row. The result reads unbalanced and cluttered, which is the owner's 'cluttered' complaint. A 2x2 grid, an icon-only toolbar or an overflow menu would each fix it.
- *Owner:* CONSUMER (shared pane action cards; cross-ref the keyframes-tab and timeline-tab seats)

**UIA-KF-201 · MEDIUM · Glass Badge has no soft/tinted tone for status chips (producer gap)** [M]
- *Page · state:* square-scene — finding `sqm4`
- *Frame:* crop-00-idle-box-1440-light-520-120.png
- *Observed:* The consumer's .status-badge family (design-idioms.css:271-290: 14% tint, AA text-mix, settled/tracking/reverse) exists because glass Badge only offers solid tones. Migrating to glass Badge needs a soft variant at the root. Route it to the glass-ui session per the owner's 'fix at the root' order.
- *Owner:* GLASS — glass-ui/src/components/badge/index.ts TONE map (solid fills only; no 'progress' tone and no tint variant)

**UIA-KF-202 · MEDIUM · The ribbon's ball preview does not show the easing: it moves in linear time for every curve** [A] (filed HIGH, set by confirm)
- *Page · state:* easing-scene-specimens · scrubbed to 60% with linear / ease-in / ease-in-expo / steps — finding `es#8`
- *Frame:* 11-scrub60-linear-1440-light.png, 11-scrub60-steps-1440-light.png
- *Observed:* At t=900/1500, the visualizer ball is at translateX 165px (0.6 of a 275px rail) for linear, ease-in, ease-in-expo and steps alike. steps(4, jump-end) should be at 0.5 and ease-in at about 0.4. EasingScene.vue:108-110 says the ribbon binds previewAnim 'whose timingFunction IS the edited easing', but the visualizer never applies it.
- *Expected:* On the easing scene, the 'ball preview' (the OA-10 toggle) previews the selected curve, matching the tile race and the header.
- *Owner:* CONSUMER demo/components/playback/AnimationVisualizer.vue:124-129, 300-307, 318-324 (setBallProgress(effectiveT/duration), no timing function applied) — #/easing ribbon
- *Fix:* Paint the ball at animation.timingFunction(progress) (or have the ribbon take an eased-progress prop for the easing mount), or drop the redundant ball on this scene.
- *Confirm amendment:* The mechanism is confirmed. AnimationVisualizer.vue:123-129 is documented as 'no animation timing curve', and :300-307 and :318-324 paint effectiveT/duration. One change: this is the shared ribbon's time playhead, and it is linear on every scene by design, so it is not an easing-only regression. The defect is that EasingScene.vue:108-110 claims the previewAnim's timingFunction drives the ribbon, and that on this scene a time ball reads as a curve preview. I would drop severity to MEDIUM. Prefer the 'drop the redundant ball on this scene' option, or relabel it as the playhead, over forking the shared visualizer.

**UIA-KF-203 · MEDIUM · At 390 the drawer covers the gallery, which is the scene's primary selection surface** [M]
- *Page · state:* easing-curve-tab — finding `ecm2`
- *Frame:* 10-duration-focus-390-dark.png, 08a-drawer-closed-gallery-390-light.png
- *Observed:* With the drawer open, only one row of tiles peeks out above it, and the audit notes the Controls toggle does not close the drawer. So on mobile a user cannot pick a curve and edit it together. The audit mentions this only in passing (the element.click() workaround) and never states it as a finding.
- *Owner:* CONSUMER

**UIA-KF-204 · MEDIUM · Stage badge says TRACKING at rest on entry while nothing moves (x 0.000, v 0.00, target marker at 1)** [A]
- *Page · state:* spring-scene-solver · rest (untouched) — finding `ss#6`
- *Frame:* 00-load-rest-1440-light.png; 00-load-rest-390-dark.png; capture-log (state=tracking, x=0.000, railNow=1 for 3.5s)
- *Observed:* The scene deliberately rests on entry (autoPlays:false), yet the one high-salience state badge announces 'tracking'. The ghost marker sits at 1 while the ball is parked at 0, which reads as stuck.
- *Expected:* State badges must be honest at rest: 'settled' or 'at rest', with the marker at the ball's position until the user acts.
- *Owner:* CONSUMER — demo/scenes/spring/SpringTarget.vue:295-301 (stateLabel from liveSettled) + useSpringDemo.ts initial liveSettled=false with target seeded to 1 — spring, rest on entry, all viewports and themes
- *Fix:* Seed the target at 0 (the marker sits on the ball), or derive the label from actual chase intent (tracking only while CHASE is armed).
- *Confirm amendment:* The frames confirm it: 00-load-rest-1440-light and 16-tabcycle-timeline-1440-dark show TRACKING with x 0.000, v 0.00 and the dashed ghost marker at the far right. Owner path correction: liveSettled is seeded `ref(false)` in demo/scenes/spring/useSpringHotPath.ts:57, not in useSpringDemo.ts. The target is seeded `ref(1)` at useSpringDemo.ts:87. The label logic is at SpringTarget.vue:295-301.

**UIA-KF-205 · MEDIUM · Physics facet is cluttered and too tall; presets are expressed twice and labels use three different registers** [C]
- *Page · state:* spring-physics-tab · Physics rest, 1440 and 390 — finding `spt#12`
- *Frame:* 00-physics-tab-rest-1440-light.png (and probe2-tab-select.png for the unscrolled rail), 00-physics-tab-rest-390-light.png, 05a-preset-smooth-selected-390-light.png
- *Observed:* The facet is about 1.6 viewports tall at 1440 and the presets sit below the fold at 390. The four presets appear both as labelled pips in the heatmap and as the 4-cell grid. The legend runs three lines ('peak overshoot 0 → 53 % · varies with ζ only (response sets tempo, not peak)') plus a '0.05 lattice' aside. Sliders show no values; the numbers live in the heatmap header. Cell values '0.5 / 0.86' are unlabelled and use a different precision from '0.50 s / ζ 0.86'. Headings mix lowercase ('parameter space — peak overshoot'), code-ish ('@keyframes (editable)') and Title case ('Keyframe offsets').
- *Expected:* The primary content (live params and presets) is dominant and above the fold. Each affordance appears once. One label register per level, and consistent number formatting.
- *Owner:* CONSUMER — demo/scenes/spring/SpringPhysicsFacet.vue:22-43, 81-107; demo/scenes/spring/SpringHeatmap.vue:18, 84-90, 123-128
- *Fix:* Put the presets first as the 4-tile grid, then the sliders with inline values, then the heatmap with its pips as the ONLY preset marks (or drop the pip labels). Cut the legend to one line ('peak overshoot 0–53%') and drop '0.05 lattice'. Use one section-label register throughout.

**UIA-KF-206 · MEDIUM · Keyframe toolbar: a decorative wand looks like a 4th action, Apply gives no feedback, icon-only actions with no visible labels** [C]
- *Page · state:* spring-physics-tab · toolbar focus, Apply hover and click — finding `spt#15`
- *Frame:* 08a-toolbar-kbd-focus-add-1440-light.png, 09a-apply-hover-tooltip-1440-light.png, 09b-apply-clicked-1440-light.png
- *Observed:* Four same-size glyphs (wand, file+, clipboard, brush). The wand is inert. Hovering Apply for 700ms showed no tooltip. Clicking Apply only swaps the brush glyph for a hand glyph; the stage and scrubber give no visible confirmation. Compare the cube's labelled 'Copy / Format / Export CSS / Apply CSS' buttons.
- *Expected:* Labelled actions matching the shared Keyframes pane, and a visible result or confirmation for Apply.
- *Owner:* CONSUMER — demo/components/instrument/keyframes/KeyframesEditor.vue:184-196 (WandSparkles in the toolbar) and the Apply Button/Tooltip (the Apply button block after :200)
- *Fix:* Resolved by deleting the inline editor, with the Keyframes pane action bar as the one home. Otherwise drop the wand and use labelled glass Buttons.

**UIA-KF-207 · MEDIUM · The artifact's not-ready and mismatched states are one muted caption: compiling and refused are indistinguishable, and a safety warning carries no tone** [C]
- *Page · state:* spring-discrete-view · artifact not ready (instrumented), mismatched (instrumented) — finding `sdv#8`
- *Frame:* 20-artifact-not-ready-1440-light.png, 20-artifact-not-ready-390-dark.png, 21-artifact-mismatched-390-dark.png, 21-artifact-mismatched-1440-light.png
- *Observed:* Not ready shows 'No artifact yet — the compile is still running, or it refused.' as a text-caption in muted-foreground, with no spinner or skeleton; the stage card keeps about 200px of empty space. Mismatched shows 'This artifact does not describe the card above — it is not safe to paste.' in the same muted caption. Copy is correctly hidden in both.
- *Expected:* STATES: loading uses glass Skeleton; a refusal or mismatch is a toned glass Alert that names the reason (the refusals the emitter already returns).
- *Owner:* CONSUMER demo/scenes/spring/StartingStyleTarget.vue:97-99 + :235-239; demo/scenes/spring/useCompiledEntry.ts:103-108 (drops compileToEntry's `eligible`/`refusals`) — spring-discrete-view · artifact not ready / mismatched · 1440+390 light+dark
- *Fix:* Keep `{css, eligible, refusals}` from compileToEntry. Render three distinct states: Skeleton (compiling), Alert tone=warning listing the refusals (refused), Alert tone=destructive (mismatched).

**UIA-KF-208 · MEDIUM · The dismissed state leaves an unmarked ~130px hole in the stage** [C]
- *Page · state:* spring-discrete-view · dismissed — finding `sdv#9`
- *Frame:* 04b-dismissed-settled-1440-light.png, 04b-dismissed-settled-390-light.png
- *Observed:* After Dismiss, the stage between the header and the Reveal bar is empty grid, with no slot outline, caption, or ghost to say where the card will enter; it reads as a missing render.
- *Expected:* An empty state that names itself, e.g. the dashed settled-state register this page already uses for the preset chip, as a slot outline.
- *Owner:* CONSUMER demo/scenes/spring/StartingStyleTarget.vue:35-46 (.stage-viewport shows nothing once .discrete-card reaches display:none) — spring-discrete-view · dismissed · 1440+390
- *Fix:* Draw a dashed placeholder slot (outline in the chip's --color-progress dashed register) at the card's footprint while dismissed, or a one-line caption.

**UIA-KF-209 · MEDIUM · Hand-rolled surfaces off the canon radius roles: the code block is 6px, the demo card is 8px, the chip is a bespoke pill** [A]
- *Page · state:* spring-discrete-view · visible — finding `sdv#10`
- *Frame:* 32d-hello-card-and-toggle-crop-1440-light.png, 32c-footer-line-crop-1440-light.png, 02-entry-visible-rest-1440-dark.png, probe2-log.json radii
- *Observed:* Measured radii: artifact 6px, discrete-card 8px, stage Card 16px, chip 9999px. The chip is an unstyled span with an outline and color-mix fill instead of the glass Chip family.
- *Expected:* DESIGN.md:386 `--radius-field` 16px for multi-line holders (the code block), or the concentric relay inside the 16px Card (DESIGN.md:423). DESIGN.md:387 `--radius-card` for a card-role plate. A static label pill is a glass `<Chip>` (chip/README.md, mode static, shape pill, size xs).
- *Owner:* CONSUMER demo/scenes/spring/StartingStyleTarget.vue:318-329 (.artifact --radius-md 6px on a multi-line holder), :268-285 (.discrete-card var(--radius-lg) resolves to 8px, canon lg = 10px → token drift under glass 7.0.0), :251-259 (.active-preset-chip hand-rolled dashed pill) — spring-discrete-view · Entry visible · all
- *Fix:* Put the artifact on var(--radius-field) (or the concentric inner radius), the demo card on var(--radius-card) (or document it as a demonstrand exempt from the canon), and the chip as <Chip size='xs' tone=…>. Re-check `--radius-lg` resolution after the glass 10.x repin.
- *Confirm amendment:* The measurements are confirmed (probe2 radii: artifact 6px, discrete 8px, chip 9999px). Owner split, amended: the 8px on `.discrete-card var(--radius-lg)` is a GLASS 7.0.0 packaging defect, not consumer drift. dist/styles/components.css line 1 opens with a leaked Tailwind `:root { … --radius: 0.25rem; --radius-lg: 0.5rem; … }` that clobbers the canon (glass src/styles/theme/radius.css:122 `--radius-lg: var(--radius)` = 10px). Glass HEAD's dist/styles/components.css no longer carries that :root block, so this is cured by the 10.x repin. The leaked `--radius: 0.25rem` also puts every other `var(--radius)` / `rounded` consumer at 4px under 7.0.0, which is worth a sweep after the repin. The consumer items stand: artifact on --radius-md for a multi-line holder (DESIGN.md:386 --radius-field), and the hand-rolled .active-preset-chip where a glass Chip belongs.

**UIA-KF-210 · MEDIUM · Header clutter: clock shown three times, scene name three times, a state badge duplicating the transport, two identical reset glyphs meaning different things** [C]
- *Page · state:* sequence-scene · clock Metric; Reset to the default stagger; light; dark — finding `seq#6`
- *Frame:* 01-header-metric-crop-1440-light.png, 07a-scrub-drag-mid-1440-light.png, 03b-playing-1350ms-390-light.png
- *Observed:* The clock appears as the Metric 'CLOCK 1067 ms', the 'MASTER CLOCK 0.550' fraction and the playhead. 'Sequence' appears in the top dock select, the h2 and the collapsed transport label. READY/PLAYING repeats the transport's play/pause glyph. The card's RotateCcw resets the rows while the transport's identical RotateCcw resets playback. One header row mixes five type registers: display serif 41.9px, mono caps caption 14.4px, sans micro caps (Metric label), mono bold value, mono unit.
- *Expected:* One readout per datum and one verb per glyph (owner: 'cluttered… controls that do not earn their place'). The header should be a title plus at most one metric.
- *Owner:* CONSUMER — SequenceTarget.vue:30-86 (h2 :32, stagger caption :34, Metric :36-42, reel :55-64, reset :67-75, status badge :81-85), SequenceScrubber.vue:13-15 (timecode) — card header + transport; all states
- *Fix:* Keep the h2 and one ms Metric. Drop the 0.000 fraction and the status badge (the transport shows state). Move reel/row-reset into the pane (cohesion row) or give row-reset a distinct glyph/label. Hide the collapsed transport label when it equals the scene name.

**UIA-KF-211 · MEDIUM · At 390 the header re-wraps as clock digits grow, and the card jumps 23px during playback** [C]
- *Page · state:* sequence-scene · 390 storyboard card — finding `seq#7`
- *Frame:* 00b-storyboard-rest-390-light.png vs 03b-playing-1350ms-390-light.png
- *Observed:* At rest the header is 2 lines (card [24,209,342,426]). At 1400ms+ the 4-digit value wraps it to 3 lines, so the card grows to 449px and re-centres to y=197. The whole storyboard shifts vertically mid-animation.
- *Expected:* No layout shift from a live readout (the tabular-nums intent). The phone header holds a stable number of lines.
- *Owner:* CONSUMER — SequenceTarget.vue:30-86 (flex-wrap header; the Metric shares the title's wrap line) — 390 storyboard card, playing
- *Fix:* Give the Metric its own stable line/slot at narrow widths (reserve 4ch), or drop the Metric per the clutter row. Gate: card rect constant across play at 390.

**UIA-KF-212 · MEDIUM · The stage plate's radius collapses to 0px: a square-cornered box inside the 16px card** [C]
- *Page · state:* sequence-scene · storyboard rows with axis + playhead — finding `seq#8`
- *Frame:* 00c-card-crop-1440-light.png, 00b-storyboard-rest-1440-dark.png, 00b-storyboard-rest-390-light.png
- *Observed:* The computed radius is 0px (16px - 16px). The tinted .seq-stage reads as a hard-edged debug rectangle inside the rounded glass Card. The formula is hand-rolled rather than using the relay tokens.
- *Expected:* glass DESIGN.md:405 / :423: 'A nested card-class surface derives max(--radius-floor, calc(--radius-ctx − --radius-inset))', where --radius-floor is 4px and never rounds below the floor.
- *Owner:* CONSUMER — demo/scenes/sequence/SequenceTarget.css:77 `border-radius: calc(var(--radius-card) - 1rem)` — storyboard stage, all states
- *Fix:* Consume the relay: `border-radius: max(var(--radius-floor), calc(var(--radius-ctx) - var(--radius-inset)))`, with the Card publishing ctx/inset. Or drop the plate border and tint, and let the Card be the only frame.

**UIA-KF-213 · MEDIUM · The master scrub ball is clipped by the card edge at both ends of the clock** [C]
- *Page · state:* sequence-scene · master-clock scrubber — finding `seq#9`
- *Frame:* 03c-played-end-1440-light.png, 07c-scrub-end-p1-1440-dark.png, 05d-row2-kbd-focus-nudged-390-light.png, 00b-storyboard-rest-390-light.png
- *Observed:* The ball rect at p=1 is [1037,627,36,36] against the card's right edge at 1072, and at p=0 it is [367,...] against the card's left edge at 368. The ball meets the card edge and is flattened by the card's overflow clip. The 36px ball also overhangs the 16px content inset, so the thumb travel does not match the rail.
- *Expected:* A slider thumb stays inside its track's inset at both extremes (glass Slider thumb inset).
- *Owner:* CONSUMER — SequenceScrubber.vue (.scrub-ball `left:0; margin-left: calc(var(--ball-size,36px)/-2)`; the rail spans the card's full content width) + SequenceTarget.vue:16 (Card overflow-x-hidden) — master-clock scrubber p=0 and p=1; both viewports and themes
- *Fix:* Inset the rail by half the thumb (padding-inline: calc(var(--ball-size)/2)) so the rail length equals the travel. Or adopt glass Slider (see the hand-rolled-slider row).

**UIA-KF-214 · MEDIUM · Balls travel to the track end instead of to their own end time, so the storyboard misstates time** [C]
- *Page · state:* sequence-scene · storyboard rows with axis + playhead; 'Play the reel' cascading replay — finding `seq#10`
- *Frame:* 03a-playing-650ms-1440-light.png, 07a-scrub-drag-mid-1440-light.png
- *Observed:* At clock 700ms the playhead is at 700 on the axis, but row 1's ball is already at the 1940 end and row 2's is near 1700. Handles and playhead are time positions, while the balls are per-row progress stretched to the axis end, so one horizontal axis carries two meanings.
- *Expected:* A time ruler with a playhead reads as time. Each lane's traveller should end at (at + ROW_DURATION)/duration, so the lanes read as bars that the playhead sweeps.
- *Owner:* CONSUMER — SequenceTarget.css:239-243 (`f = row-start + ball-p*(1 - row-start)` maps each 900ms child onto the remainder of a 1940ms axis) — playing / scrub
- *Fix:* Map the ball to `row-start + ball-p * (ROW_DURATION/duration)`. Optionally draw each lane's active span as a filled segment between gate and end.

**UIA-KF-215 · MEDIUM · The glass Metric's 3ch minimum on a left-aligned value leaves 'CLOCK 0 ms' with a detached unit** [C]
- *Page · state:* sequence-scene · clock Metric — finding `seq#11`
- *Frame:* 01-header-metric-crop-1440-light.png, 06-reset-default-stagger-1440-light.png
- *Observed:* A one-digit value leaves a ~2ch hole between '0' and 'ms'. With 4 digits the unit hugs the value, so the unit also jumps horizontally as the value grows.
- *Expected:* A metric reading keeps value and unit adjacent. The reserved width, if any, belongs before the value (tabular right alignment), per the Metric README's poster-metric intent.
- *Owner:* GLASS — metric/styles.css:66-67 `.metric__value { min-inline-size: 3ch }` with no `text-align: end` (same in the consumer's glass 7.0.0 dist/components/metric/styles.css) — clock Metric at rest / after reset
- *Fix:* Glass: `text-align: end` on .metric__value, or reserve the space on .metric__reading. Batch into the glass BK letter.

**UIA-KF-216 · MEDIUM · Tapping the drawer's grab handle does nothing; opening the sheet needs a drag, the keyboard, or a top-dock button** [C]
- *Page · state:* mobile-controls-drawer · peek → tap handle — finding `mcd#5`
- *Frame:* 01-cube-peek-390-light.png vs 02-cube-expanded-tap-390-light.png (identical; aria-valuenow stays 0.12)
- *Observed:* Clicking the 44px grip leaves the sheet at 0.12. Expanding only works by dragging (09→11 works), ArrowUp/Down on the role=slider handle, or a trip to the top ChromeDock's 'Controls panel' button, which is two taps away and at the other end of the screen.
- *Expected:* The grabber is the sheet's primary affordance, and on a touch sheet a tap on it steps to the next rung (the platform convention). Its slider semantics already model the steps.
- *Owner:* GLASS — drawer/sheet detent handle (glass 7 `.glass-drawer-handle`; glass 10 `[data-slot=sheet-detent-handle]`, sheet/styles.css:255-305) — #/cube, #/spring, #/amiga @390x844
- *Fix:* GLASS: tap on the detent handle cycles to the next rung (wrapping from the top rung back to the lowest non-zero rung), with the same spring. No consumer change needed after the migration.

**UIA-KF-217 · MEDIUM · At the 0.62 editor detent the spring scene's subject is almost entirely covered, and the top dock overlaps the stage card** [C]
- *Page · state:* mobile-controls-drawer · expanded (editor/storyboard stage mode), light+dark — finding `mcd#7`
- *Frame:* 21-spring-expanded-390-light.png, 26b-spring-physics-scrolled-1-390-dark.png
- *Observed:* The sheet top sits at y=293. The SpringProgress card shows only its title and the x/v readout, and its track and ball are hidden behind the sheet. The expanded top ChromeDock (y 30–116) overlaps the stage card's top edge. The scene's protagonist is reduced to a 180px band between two chrome layers.
- *Expected:* Primary content stays dominant (HIERARCHY). An expanded editor sheet keeps the live subject legible, or the stage compacts deliberately to the readout and track.
- *Owner:* CONSUMER — ControlsPaneWrapper.vue:370-375 (EXPANDED_EDITOR 0.62) + the spring stage layout — #/spring @390x844
- *Fix:* Lower the editor rung, or lay out a stage-compaction state for spring at mobile (the track above the readout, clear of both docks). Once the sheet is block-size-sized, re-measure the 0.45 floor math against the real visible band.

**UIA-KF-218 · MEDIUM · Dark-theme toast description becomes invisible once sonner's stylesheet is present, so the naive 'import style.css' fix ships a contrast defect** [C]
- *Page · state:* toasts · success with description, dark — finding `to#4`
- *Frame:* toasts/sim-04-stacked-expanded-390-dark.png (the 'Animation state loaded from shared URL.' line is near-white on the bone plate, effectively invisible); compare sim-04-stacked-expanded-390-light-crop.png, where it is legible
- *Observed:* The title is legible, but the description disappears in dark mode. theme="system" also means that when the in-app Dark mode toggle disagrees with the OS, sonner's theme vars and the app's inverted slab disagree too.
- *Expected:* Description on --muted-foreground over the glass plate, with the theme driven by the app's own colour-scheme source, not the OS.
- *Owner:* CONSUMER — DemoGlobalChrome.vue:44 ('description: font-normal text-small' sets no colour, so sonner's [data-sonner-theme=dark] [data-description] colour wins on the inverted light slab) + DemoGlobalChrome.vue:50 (theme="system" follows the OS, not the app's class-toggled theme) — 'State restored!' + description · 390 dark (instrumented)
- *Fix:* Do not take the one-line style.css fix. Migrate to glass ToastDescription, which inherits the app theme through tokens.

**UIA-KF-219 · MEDIUM · Toast chatter: a success toast on every successful parse, emoji and marketing copy, and duplicated feedback** [C]
- *Page · state:* toasts · stacked, success — finding `to#6`
- *Frame:* toasts/capture-log-1440-light.json (frame 03-stacked-collapsed: 4 toasts from Copy/Format/Export/Copy, including a 104px 'Compiled CSS copied — zero-runtime, paste & ship 🎉'; frame 05-error-format-action: 'CSS formatted' + 'Keyframes parsed 🎉' stacked together)
- *Observed:* The editor emits a success toast on every successful parse, in addition to explicit-action toasts. Messages mix emoji, exclamation marks and promotional copy. Four toasts stack from four clicks. Once toasts actually render, this becomes constant noise over the work surface.
- *Expected:* Toasts only for outcomes the UI does not already show, in a plain declarative voice ('CSS copied', 'Compiled CSS copied'). Parse success is already visible in the editor and preview, so it should not toast; parse failure is marked at the editor well (shakeEditorWell).
- *Owner:* CONSUMER — demo/components/instrument/keyframes/KeyframesStringControls.vue:144 (toast.success('Keyframes parsed 🎉') on every applyEditorChange), :149 ('Failed to parse keyframes 🔧'), :251 ('Compiled CSS copied — zero-runtime, paste & ship 🎉'), :274 ('Export CSS failed 🔧'); useShareState.ts:31/83 ('Link copied to clipboard!', 'State restored!') — stacked · 1440
- *Fix:* Drop the per-edit 'Keyframes parsed' success toast and keep only the error, deduped. Strip emoji and exclamation marks. Shorten the compiled-copy title and move the 'zero-runtime' explanation to a description or nowhere.

**UIA-KF-220 · MEDIUM · Action, cancel and close buttons are unstyled bare buttons, and 10s error toasts have no close control** [C]
- *Page · state:* toasts · error with action — finding `to#7`
- *Frame:* toasts/05-error-format-action-1440-light.png (not reached: shows 'CSS formatted' + 'Keyframes parsed 🎉' instead); every measured toast in capture-log-*.json has close:false
- *Observed:* With unstyled:true and empty classes, the Retry action renders as an unstyled native <button>. No toast has a close button (close:false in every frame), and error toasts carry duration 10000.
- *Expected:* glass ToastAction (a glass Button) and ToastClose (the glass corner affordance, which Toast.vue sets up via glass-corner-host).
- *Owner:* CONSUMER — DemoGlobalChrome.vue:45-47 (actionButton/cancelButton/closeButton: '' under unstyled:true); the Retry action is at KeyframesStringControls.vue:117-120 — 'Could not format CSS' + Retry (code-read: the prettier-refusal path was not reached live; the typed garbage parsed)
- *Fix:* Use glass ToastAction/ToastClose via the Toaster's action slot on migration. No empty-string class overrides.

**UIA-KF-221 · MEDIUM · glass-ui toast API gaps that block a clean sonner-to-glass migration: no caller id for replace-in-place, and no tone glyph in the Toaster** [A]
- *Page · state:* toasts · error dedupe, tone glyph — finding `to#9`
- *Frame:* n/a (source read at glass-ui 6433284a, 2 dirty); the consumer needs are shown in capture-log-1440-light.json (id 'kf-parse' dedupe, per-index startDiagnosticId)
- *Observed:* keyframes relies on sonner's id to replace a toast in place (KeyframesStringControls.vue:144/149 'kf-parse'; KeyframesEditor.vue:451 startDiagnosticId) and on sonner's built-in per-type glyph. glass toast() always calls genId() and returns a handle, so a repeat parse error stacks instead of replacing. The Toaster renders no status glyph for a tone, so the 'full-chroma glyph' the tone register promises only appears when a caller hand-builds one.
- *Expected:* The canonical glass toast covers the demo's needs without hand-rolling: an optional stable id (upsert) and a tone-keyed default glyph (success ✓, destructive !, warning △, info i) rendered by the Toaster.
- *Owner:* GLASS — Toast/Toaster: glass-ui src/components/toast/use-toast.ts:11-28 (ToastOptions: title, description, action, tone, surface, duration; no id) and Toaster.vue template (renders Title/Description/action/Close only; Toast.vue's '[&_svg]:text-(--tone)' arm colours only an svg the caller supplies). Canon: Toast.vue:130-140 comment ('a tone-keyed rim + a full-chroma glyph'). — migration seam for every keyframes toast call site
- *Fix:* Route to the glass-ui session: add ToastOptions.id?: string with upsert semantics in the reducer, and a per-tone default glyph slot in Toaster.vue (overridable). Then keyframes migrates with no shims.
- *Confirm amendment:* Both gaps are CONFIRMED in source. use-toast.ts ToastOptions (lines 11-28) is title/description/action/tone/surface/duration with no id, and toast() always calls genId() (line 113). The Toaster.vue template renders only a grid of ToastTitle and ToastDescription, the action and ToastClose, so there is no glyph. The owner call GLASS is correct. The amendment is about severity. 'Blocks a clean migration' is too strong: toast() returns a handle {id, dismiss, update}, and useToast().dismiss(toastId) accepts an id string (line 147), so a consumer can keep a keyed handle map and update() in place. That keyed map is a consumer-side shim, so the upsert id is still the right root fix, but the gap is a friction item, not a blocker. The glyph gap stands at full weight: without it the 'full-chroma glyph' of the tone register never appears for Toaster-queued toasts. A secondary GLASS doc drift: DESIGN.md:78 (--spring-bouncy 'toast arrival') and :1493 ('pop' scale+opacity toast entrance) contradict Toast.vue, which now enters on the overlay glass-reveal register (F20). The BROKEN finding's 'expected' clause cites the stale DESIGN.md:78 line.


## LOW

**UIA-KF-222 · LOW · Inside the open drawer, closed select triggers show up-chevrons: the rotate variant keys on any open ancestor**
- *Seats:* controls-tab-channel-options, controls-advanced-layer — findings adv#12[A] com4[M] advm2[M]
- *Frame:* `controls-advanced-layer/03-amiga-advanced-pane-390-light.png`
- *Observed → expected:* The `in-data-[state=open]` variant matches the open Drawer or Dialog ancestor, so every closed trigger inside rotates. The same pattern appears library-wide.
- *Owner:* GLASS — select/SelectTrigger.vue:72 `in-data-[state=open]:rotate-180` (ancestor variant; library-wide)
- *Fix:* Scope the rotation to the trigger's own state (`data-[state=open]:` on the trigger or a named group), across the library.

**UIA-KF-223 · LOW · Select listboxes, the menu and the share plates are 12px (panel) where the canon says popover = card 16px**
- *Seats:* dock-scene-select, dock-controls-tab-select, mbabb-menu, transport-dock, controls-tab-channel-options, controls-advanced-layer — findings dss#2[C] co#13[C] adv#13[A] trd#12[C] mm#5[C] dct#7[C]
- *Frame:* `dock-scene-select/09-closeup-amiga-1440-light.png`
- *Observed → expected:* All measured 12px at 7.0.0. The tooltip is 8px (canon 10px). Canon: DESIGN.md:387 (--radius-card 16px content card / popover), :395 tooltip 10px.
- *Owner:* CONSUMER (pin) — keyframes package.json:78 pins @mkbabb/glass-ui 7.0.0; cured in glass ≥8/10.0.1 (HEAD SelectContent.vue:84 rounded-card; overlay-plate --radius-ctx: var(--radius-card))
- *Fix:* Adopt glass ≥10.0.1. The PopoverContent row (GLASS) stays open separately.

**UIA-KF-224 · LOW · Icon buttons use native title tooltips instead of the glass Tooltip**
- *Seats:* share-popover, sequence-scene — findings sp#13[C] seq#16[C]
- *Frame:* `share-popover/01-popover-open-1440-light-crop.png`
- *Observed → expected:* Native OS tooltips, delayed and unstyled, next to glass tooltips elsewhere. Canon: glass Tooltip.
- *Owner:* CONSUMER — SharePopover.vue icon buttons, SequenceTarget in-card icon buttons
- *Fix:* Wrap them in glass Tooltip and keep aria-label.

**UIA-KF-225 · LOW · At 1440 the transport dock's top rim overlaps the stage card's bottom rim (glass on glass)**
- *Seats:* transport-dock, easing-scene-specimens — findings trdm1[M] esm2[M]
- *Frame:* `transport-dock/crop-31-square-expanded-1440-dark.png`
- *Observed → expected:* The dock band is not reserved under the stage card on square and easing.
- *Owner:* CONSUMER — TransportDock placement vs stage card (square, easing)
- *Fix:* Reserve --dock-band-reserve-stable below the stage card on every scene.

**UIA-KF-226 · LOW · The ribbon scrub thumb is a thin sharp-cornered sliver that hangs half outside the track at t=0 and nearly disappears in dark**
- *Seats:* controls-tab-channel-options, amiga-scene, easing-curve-tab, spring-scene-solver — findings co#15[C] amm3[M] ssm1[M] ec#14[C] com2[M]
- *Frame:* `controls-tab-channel-options/R1-escape-from-select-stops-playback-1440-light.png`
- *Observed → expected:* A 12×40 rectangular thumb at t=0 hangs half outside the track start. In dark it is a black-outlined sliver on a dark track. Canon: glass slider README (thumb inset into the track); WCAG 1.4.11.
- *Owner:* GLASS — Slider spectrum/scrub variant thumb (not inset into the track; low contrast in dark)
- *Fix:* Inset the spectrum thumb into the track, round it to the control rung, and raise dark contrast.

**UIA-KF-227 · LOW · favicon.svg returns 404 on every route**
- *Seats:* home-hero, scene-loading-skeleton, dock-scene-select, cube-scene, controls-timing-function-detail, amiga-scene — findings hh#14[C] hhm4[M] dss#8[C] cu#17[C] tf#11[C] am#19[A] sk#8[C]
- *Frame:* `home-hero/01-firstload-1440-light.png`
- *Observed → expected:* The console shows a 404 on every load, because the href points above the Vite root.
- *Owner:* CONSUMER — demo/app/index.html:31/:33 (favicon href leaves the Vite root)
- *Fix:* Move the favicon under demo/app/public, or fix the href.

**UIA-KF-228 · LOW · The "re-sample" action is a hand-rolled <button> with an off-role radius on its band**
- *Seats:* spring-scene-solver, spring-physics-tab — findings ss#10[C] spt#21[C]
- *Frame:* `spring-physics-tab/06a-inline-editor-top-1440-light.png`
- *Observed → expected:* Not a glass Button, and its band uses an off-ladder radius.
- *Owner:* CONSUMER — SpringPhysicsFacet / KeyframesEditor "re-sample" <button>
- *Fix:* Goes away with spring-inline. Otherwise use a glass Button emphasis="quiet".

**UIA-KF-229 · LOW · The home transport carries controls that do nothing useful there (Reset on an empty group; a list whose choice navigates away)** [C]
- *Page · state:* home-hero · first-load, all — finding `hh#11`
- *Frame:* home-hero/01-firstload-1440-light.png
- *Observed:* On home the group is empty (useSceneMachineShellBinding.ts:74-78), yet the transport shows Play, ☰ list and Reset. Reset has nothing to reset.
- *Expected:* CLUTTER lens: on home, show only the controls that act there. One CTA (Play/'Open the cube') would match the hero.
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/transport/TransportDock.vue:43-160 (rail rendered unconditionally)
- *Fix:* Hide Reset (and the list, unless the BROKEN row is fixed by carrying the choice) while isHome.

**UIA-KF-230 · LOW · One screen uses three type registers, and one dock row mixes sans 'Home' with mono '@mbabb'** [C]
- *Page · state:* home-hero · keyboard focus (2 Tabs) expands the chrome dock, 1440 light — finding `hh#12`
- *Frame:* home-hero/03-focus-2tabs-1440-light.png
- *Observed:* Hero in Instrument Serif (display-mega plus an italic deck and hint), dock/pane in Plus Jakarta Sans, '@mbabb' trigger in mono (text-mono-caption, data-register='code') next to the sans 'Home ▾' in the same pill.
- *Expected:* Rebranding --font-display is allowed (DESIGN.md typography consumer activation). But one dock row should use one register, and dock labels share the dock label face.
- *Owner:* CONSUMER — keyframes.js demo/app/dock/MbabbMenu.vue:15
- *Fix:* Use the dock's label face for the @mbabb trigger, and keep mono for the identifier inside the menu content.

**UIA-KF-231 · LOW · At 390 the fallback plate collides with the scene chip and the transport pill** [C]
- *Page · state:* scene-loading-skeleton · loading fallback 390 light (hard load) and 390 dark (route) — finding `sk#5`
- *Frame:* 01-hardload-fallback-390-light.png; 08-route-fallback-390-dark.png
- *Observed:* On hard load the top scene chip sits on the plate's top edge (plate y=90). On the route path the transport pill overlaps the plate's bottom edge.
- *Expected:* The placeholder respects the same top/bottom chrome safe-area insets as the resolved stage (which starts at y=133).
- *Owner:* CONSUMER — demo/app/App.skeleton.vue:120-124 (padding `clamp(1rem,4cqi,3rem)` reads only the container inline size, not the shell's top/bottom chrome insets) — .scene-skeleton gutter
- *Fix:* Size the stage slot from the shell's stage box (the same insets the scene uses) instead of a free cqi gutter; this is resolved by the first finding's slot-only skeleton.

**UIA-KF-232 · LOW · SceneSkeleton docblock: ~90 lines of history prose for a 20-line component, citing a removed token** [A]
- *Page · state:* scene-loading-skeleton · n/a (source) — finding `sk#7`
- *Frame:* n/a
- *Observed:* The docblock narrates KF-SKEL-1..18 dispositions and ids, and asserts properties the frames falsify (a silhouette 'by construction', the 7.0.0 sweep as the cure). The style comment names `--radius-input`, which DESIGN.md:429 records as REMOVED (renamed `--radius-media`).
- *Expected:* Lean docs (owner edict: tranche docs lean; KISS): state the contract in a few lines and keep history in the ledger.
- *Owner:* CONSUMER — demo/app/App.skeleton.vue:2-89, :126-128 (the comment cites `--radius-input`)
- *Fix:* Cut the docblock to the structural contract (stage-slot placeholder, decorative, announces via EditorShell) and fix the token name in the comment.
- *Confirm amendment:* The bloat is CONFIRMED: an 89-line docblock narrating KF-SKEL ids, with claims (silhouette by construction, the 7.0.0 sweep as the cure) that the frames falsify. The 'removed token' part is AMENDED. The installed 7.0.0 dist really does paint `.skeleton{border-radius:var(--radius-input)}`, so the style comment is accurate for the pinned package. It is stale only against glass HEAD (DESIGN.md:429 REMOVE → `--radius-media`) and becomes wrong at the pin bump in finding 5. The descendant `border-radius: inherit` override is still needed after the bump, because the HEAD default `--radius-media` is 10px against the plate's 16px card.

**UIA-KF-233 · LOW · Transport stays live during the fallback with no scene to drive** [M]
- *Page · state:* scene-loading-skeleton — finding `skm0`
- *Frame:* 08-route-fallback-1440-light.png, 08-route-fallback-1440-dark.png, 08-route-fallback-390-dark.png
- *Observed:* The rainbow Play button and the reset control render enabled while the channel select is blank and no scene exists. They are dead controls while loading.
- *Owner:* CONSUMER — ChromeDock transport / EditorShell ribbon
- *Fix:* Disable the transport, or skeleton-line it, while Suspense is pending. This goes with finding 2's shell-owned pane.

**UIA-KF-234 · LOW · The sheen's opaque --muted fill hides the card's glass material entirely** [M]
- *Page · state:* scene-loading-skeleton — finding `skm1`
- *Frame:* probeFallback.sheen bg rgb(246,243,239) at inset 0 over the plate
- *Observed:* The Skeleton covers the whole plate with an opaque muted fill, so the 'stage-card register' the docblock justifies is never actually visible. It reads as a flat muted slab, not glass. This makes finding 3's register argument moot for the skeleton itself.
- *Owner:* CONSUMER — App.skeleton.vue:108-112 plus the glass 7.0.0 Skeleton fill
- *Fix:* This resolves itself if the skeleton becomes the stage outline plus breathe (finding 3/5 fix). Otherwise, inset the Skeleton instead of `inset:0`.

**UIA-KF-235 · LOW · Band parked at the plate's left edge shows as a smudge** [M]
- *Page · state:* scene-loading-skeleton — finding `skm2`
- *Frame:* 01-hardload-fallback-390-light.png (left-edge shading), 01-hardload-fallback-1440-light.png (top-left)
- *Observed:* In the band's dead time the gradient partly peeks in at the left edge, so the plate reads as a stained blank rather than a loading surface.
- *Owner:* CONSUMER (stale pin; glass root cured)
- *Fix:* Cured by the glass pin bump (finding 5).

**UIA-KF-236 · LOW · Hover and pressed/selected fills look the same on dock controls in light theme** [C]
- *Page · state:* top-dock — finding `td#6`
- *Frame:* crops/ztoggle.png (row 1: hovered 'Controls' next to pressed panel toggle), 05-expanded-cube-1440-light.png
- *Observed:* The hovered Controls trigger and the pressed (open) panel toggle wear nearly identical cream fills. You cannot tell which one is selected and which is only under the pointer.
- *Expected:* The selected state uses its own signal, separate from hover (DESIGN.md: states present and distinct).
- *Owner:* GLASS: glass-ui 7.0.0 dist components/dock/styles/controls/triggers.css. Hover `--dock-control-hover-bg` and active `--dock-control-active-bg` measure cream at 0.65 vs 0.8 alpha (probe-dark.json). — Expanded dock with the panel open, light, 1440
- *Fix:* glass: give the selected/pressed dock control its own marker (an ink change, an indicator, or a clearly separate token) rather than a slightly denser version of the hover fill.

**UIA-KF-237 · LOW · Dock controls in one row have three different heights** [C]
- *Page · state:* top-dock — finding `td#7`
- *Frame:* capture-log.json (1440: Scene 39px, panel toggle 40px, @mbabb 31px; touch: 33 / 47 / 28px), crops/ztoggle.png
- *Observed:* The @mbabb trigger's smaller mono type shrinks its box to 31px against 39-40px neighbours, so the capsule outlines in dark theme have visibly different heights. A mono handle also sits among sans labels.
- *Expected:* Every control in a dock row has the same height, set by the dock's own tokens (--dock-layer-height / --dock-trigger-min-height).
- *Owner:* CONSUMER: demo/app/dock/MbabbMenu.vue:16 (`text-mono-caption normal-case tracking-normal lg:text-mono-small` on the DockTrigger) — Expanded dock, all scenes, both viewports
- *Fix:* Let DockTrigger set the height (bind --dock-trigger-min-height to the layer height at glass level, or drop the type overrides and keep only the mono face if it is a brand choice).

**UIA-KF-238 · LOW · The Curve and Physics tabs use the same glyph** [C]
- *Page · state:* top-dock — finding `td#8`
- *Frame:* 12-expanded-easing-1440-light.png, 13-expanded-spring-1440-light.png, crops/sheetB-1440-light.png
- *Observed:* '∿ Curve' and '∿ Physics' share one icon even though they are different instruments. Every other surface has its own glyph.
- *Expected:* One glyph per surface, so the icon identifies the surface at a glance.
- *Owner:* CONSUMER: demo/state/controlSurfaces.ts:153-154 and demo/components/instrument/surfaceTabs.ts:18-19 (both `icon: "Activity"`) — easing and spring scenes, Controls tab trigger and list
- *Fix:* Give each its own lucide glyph (for example Spline for Curve and Waves or Orbit for Physics) in the single registry.

**UIA-KF-239 · LOW · At 390 the dock is not the first Tab stop because focus starts on the drawer handle** [A]
- *Page · state:* top-dock — finding `td#11`
- *Frame:* 10-kbd-tab1-amiga-390-light.png, 11-kbd-tab2-amiga-390-light.png, capture-log.json (focus = 'Drawer position' at load; Tab moves to DIV, then INPUT)
- *Observed:* At 1440 the first Tab lands on the collapsed Scene button and expands the dock (good). At 390 focus already sits on the drawer handle at load, so Tab moves forward into the sheet and never reaches the app's only scene navigation first.
- *Expected:* No focus is taken on load. The first Tab stop follows DOM order, starting with the top dock.
- *Owner:* GLASS — a live-behind Drawer must not auto-focus its handle (7.0.0 drawer.js:405-411); CONSUMER interim @open-auto-focus.prevent at ControlsPaneWrapper.vue:139 — cube, amiga and spring scenes, first load, 390
- *Fix:* Stop the sheet from taking focus on mount, or only move focus there when the user opens it.
- *Confirm amendment:* The behaviour is CONFIRMED: capture-log shows focus 'Drawer position' in 05, 12 and 13 at 390 before any input, and the 10/11-kbd-390 frames show Tab going to DIV and then INPUT with the dock still collapsed (h 56, radius 9999px). The owner is wrong or incomplete, though. 'Drawer position' is glass-ui's own handle (dist drawer.js:405-411, role=slider tabindex=0), and focus lands there through reka Dialog open-auto-focus when the consumer mounts `<Drawer mode="live-behind">` open (ControlsPaneWrapper.vue:117-139). Owner: GLASS, because a live-behind (non-modal, page-interactive) Drawer should not auto-focus on open by default. CONSUMER interim: `@open-auto-focus.prevent` on DrawerContent at ControlsPaneWrapper.vue:139.

**UIA-KF-240 · LOW · Dark theme: the dock plate throws a light halo instead of a shadow** [M]
- *Page · state:* top-dock — finding `tdm1`
- *Observed:* crop of 05-expanded-cube-1440-dark.png and sheetA-1440-dark.png: a soft pale glow around the capsule on the black ground
- *Owner:* GLASS (probably --shadow-dock / --glass-edge-light in dark), not source-verified
- *Confirm note:* This adds to the 'glowing pill' clutter in dark. Re-check on ≥10.0.1 before relaying.

**UIA-KF-241 · LOW · The focus-visible ring is a heavy 2px stadium, the loudest mark on the dock** [M]
- *Page · state:* top-dock — finding `tdm2`
- *Observed:* crops/ztoggle.png rows 3 and 6 (state 09): @mbabb carries a thick grey (light) or cream (dark) ring after focus returns from its menu (capture-log focus '@mbabb menu'). The same ring appears on the open Home and Controls triggers in sheet-390-light and sheetA-1440-dark.
- *Owner:* GLASS focus-ring token
- *Confirm note:* Focus-visible is correct behaviour, but its weight (a grey stadium stroke on a cream plate) feeds the 'too rounded pills' complaint. Worth a quieter token.

**UIA-KF-242 · LOW · Scene warm-prefetch fires on mouse hover only; keyboard and touch never warm** [C]
- *Page · state:* dock-scene-select — finding `dss#5`
- *Frame:* capture-log.json runs[].warm (hover: 5/5 rows each pulled the scene chunk, e.g. Amiga → AmigaScene.vue + 5 modules); probe-log.json kbdWarm [] after 6 ArrowDowns on a cold context; 10-kbd-arrow-walk-1440-light.png
- *Observed:* Mouse hover warms each row's chunk as intended. Opening the list with Enter and arrowing through all six scene rows fires zero scene requests. Touch has no hover before the tap, so it never warms either. The prefetch exists only for mouse users.
- *Expected:* Warm on highlight, meaning whatever makes reka set `data-highlighted` (pointer or keyboard), or warm all rows once on listbox open. The warm is idempotent (scenes.ts:118-123).
- *Owner:* CONSUMER — ChromeDock.vue:467 (`@pointerenter="emit('warmScene', scene.id)"`) — Listbox hover and keyboard highlight
- *Fix:* CONSUMER: bind the warm to the item's focus/highlight (e.g. `@focus` on SelectItem, or a watch on the open model that warms every scene once when `sceneSelectOpen` turns true).

**UIA-KF-243 · LOW · Dock select-trigger chevron is 12px beside a 20px glyph and a 20px label** [C]
- *Page · state:* dock-scene-select — finding `dss#7`
- *Frame:* 07-kbd-focus-trigger-1440-light.png, 05-open-spring-current-1440-dark.png; probe-log.json triggerGlyphs: house 20×20, chevron 12×12
- *Observed:* The chevron renders at 12px next to a 20px dock-glyph and a 20.35px label (16px at 390). At that 0.6 ratio it reads as a stray tick mark rather than the disclosure affordance.
- *Expected:* The chevron size should come from the dock's own glyph arithmetic (`--dock-icon-glyph` × a stated ratio), the same token that sizes every other glyph in the row (DESIGN.md dock geometry; ChromeDock.vue:617-639 describes that invariant).
- *Owner:* GLASS — DockTrigger `for="select"` chevron (`.dock-select-trigger__chevron`); canon DESIGN.md:1046 (DockSelectTrigger 'text + chevron') — Scene trigger (and the Controls tab trigger), rest, hover, open and focus, 1440 and 390
- *Fix:* GLASS: size the select-trigger chevron from `--dock-icon-glyph` with a documented disclosure ratio (e.g. 0.75) instead of a fixed 12px. Relay to the glass-ui session.

**UIA-KF-244 · LOW · The scene's default facet is listed last** [C]
- *Page · state:* dock-controls-tab-select · open, current = Curve / Physics — finding `dct#8`
- *Frame:* 02-easing-open-current-1440-light.png, 02-spring-open-current-1440-dark.png
- *Observed:* Easing and spring open on Curve / Physics (SCENE_DEFAULT_CONTROL), but those rows sit at the bottom under Controls/Keyframes/Timeline. On cube/amiga/square the default (Controls) is first.
- *Expected:* The same position for the current default across sibling scenes (cohesion).
- *Owner:* CONSUMER demo/app/dock/ChromeDock.vue:147-153 (builtIn then extra ordering) — #/easing, #/spring
- *Fix:* When a scene has a signature facet, order the tabs with the facet first. Alternatively, list the facet first always, followed by the triad.

**UIA-KF-245 · LOW · Scene select and tab select render as two different trigger treatments side by side** [M]
- *Page · state:* dock-controls-tab-select — finding `dctm2`
- *Frame:* 13-cube-matrix-controls-picked-390-dark.png, 02-cube-open-current-1440-light.png
- *Observed:* 'Cube' has a filled pill with no border, while the tab trigger has a bordered or ringed stadium. Part of the difference is the lingering focus ring (finding 6), but at 390 dark the fills also differ.
- *Owner:* CONSUMER ChromeDock (verify against glass DockTrigger for=select)
- *Fix:* Re-check after the focus-ring fix. Both should be the same DockTrigger idiom.

**UIA-KF-246 · LOW · ppmycota.com is rendered in uppercase** [C]
- *Page · state:* mbabb-menu · open dropdown — finding `mm#9`
- *Frame:* 01-open-1440-light-crop.png, 01-open-390-dark-crop.png
- *Observed:* The URL uses text-admin-label (10px Fira Code, text-transform uppercase, caps tracking). It renders as 'PPMYCOTA.COM', a shouty chip under the brand name that is also the smallest text in the menu (10px).
- *Expected:* An artifact string, as the comment at :163 calls it, should keep its case. The caps chip register misrepresents a lowercase domain.
- *Owner:* CONSUMER — MbabbMenu.vue:170
- *Fix:* Use text-micro (or text-mono-caption normal-case tracking-normal, the MM-29 pair) so the domain renders lowercase. Alternatively drop the second line and let the row open ppmycota.com via a trailing external-link glyph.

**UIA-KF-247 · LOW · Pointer highlight stays on Clear all when the pointer moves onto the identity label** [A]
- *Page · state:* mbabb-menu · hover the @mbabb label block after hovering Clear all — finding `mm#11`
- *Frame:* 02-hover-label-1440-light-crop.png
- *Observed:* With the pointer resting on the non-interactive DropdownMenuLabel, the 'Clear all & reload' row still shows its highlight ring, so the destructive row looks armed while the pointer is elsewhere.
- *Expected:* Highlight follows the pointer and clears over non-item content, as reka-ui's menu does for pointer-leave on items.
- *Owner:* GLASS — DropdownMenuLabel / menu content pointer handling (installed 7.0.0; recheck at ≥10)
- *Fix:* Recheck after the glass ≥10 adoption. If it persists, relay: label and separator pointermove should clear the highlighted item.
- *Confirm amendment:* The frame does show the Clear all ring, but the evidence is weak. capture.mjs:52 finds the label with `[role=menu] [role=group], [role=menu] > div`.last(). That selector also matches the menuitem and separator divs. The pointer was on Clear all (row 4) just before. No per-frame record of the pointer target or the highlighted item exists (the capture-log entry for 02-hover-label carries no items). I could not rule out that the pointer never left the Clear all row. This needs a re-probe that logs elementFromPoint and [data-highlighted] before it goes to glass.

**UIA-KF-248 · LOW · The Share load field in the popover is a stadium with a heavy 2px near-black outline on open** [M]
- *Page · state:* mbabb-menu — finding `mmm0`
- *Frame:* 12-share-btnclick-1440-dark.png (renders light)
- *Owner:* CONSUMER SharePopover.vue (or GLASS Input focus ring if it is the producer default)
- *Confirm note:* This is the heaviest stroke on the page, and it competes with the menu for attention.

**UIA-KF-249 · LOW · loadHashInput is never cleared after a successful load** [M]
- *Page · state:* share-popover — finding `spm2`
- *Observed:* Reopening Share shows the previous paste still in the field. SharePopover's comment declares this as undone ('a reset of loadHashInput after success').
- *Owner:* CONSUMER — demo/components/instrument/shell/useShareState.ts (loadFromInput success path)

**UIA-KF-250 · LOW · The platform scrollbar overlays the key-cap column** [C]
- *Page · state:* keyboard-shortcuts-modal — finding `ksm#8`
- *Frame:* 04-scrolled-mid-cube-1440-dark-crop.png, 05-scrolled-bottom-cube-1440-light-crop.png, 05-scrolled-bottom-square-390-light-crop.png
- *Observed:* The overlay scrollbar thumb draws over the right edge of the Backspace, Z and KeyY caps.
- *Expected:* Caps are right-aligned data with clear space. The FadingScroll README tells consumers to pass the scrollbar utilities (e.g. scrollbar-hidden) on the root.
- *Owner:* CONSUMER KeyboardShortcutsModal.vue:133-137 (port has no gutter/scrollbar-gutter) — scrolled states, 1440 and 390
- *Fix:* Pass `scrollbar-hidden` (the mask already signals overflow), or add scrollbar-gutter:stable plus matching padding-inline-end on the port.

**UIA-KF-251 · LOW · Copy and markup residue: 'grouped by register' jargon, Title-Case title vs the sentence-case menu item, and a dead rounded-md on rows with no plate** [C]
- *Page · state:* keyboard-shortcuts-modal — finding `ksm#9`
- *Frame:* 01-open-menu-cube-1440-light-crop.png; compare the mbabb-menu item 'Keyboard shortcuts' (../mbabb-menu/01-open-1440-light-crop.png)
- *Observed:* The description 'Every shortcut registered in this session, grouped by register.' uses internal vocabulary and takes two lines at every width. The title reads 'Keyboard Shortcuts' while the menu entry that opens it reads 'Keyboard shortcuts'. The rows keep rounded-md although R-12 removed their plate, so the class paints nothing. At 390 the dialog lists keyboard-only bindings on a touch device and nothing says so.
- *Expected:* No redundant labels, one casing across the menu and the dialog, and every class earning its place.
- *Owner:* CONSUMER KeyboardShortcutsModal.vue:109 (title), :128-131 (description), :198 (`rounded-md` on rows with no background) — open state, all viewports and themes
- *Fix:* Title 'Keyboard shortcuts'. Either drop the description or make it one line ('Grouped by area.'). Remove rounded-md at :198. Optionally, below the pointer:coarse breakpoint, say that these apply to a hardware keyboard.

**UIA-KF-252 · LOW · The translucent plate lets vivid scene color bleed under the confirm copy and buttons** [C]
- *Page · state:* clear-all-confirm-dialog · PLAUSIBLE — finding `cac#10`
- *Frame:* 01-open-1440-light.png (green/magenta cube faces under 'the page reloads' and behind 'Clear & reload') · 01-open-390-light.png
- *Observed:* Saturated blotches of cube color sit under the description text and behind the destructive button. Legibility is uneven across the line, and the red confirm competes with magenta beneath it.
- *Expected:* A modal plate reads as a calm room. glass-ui HEAD dialog/styles.css itself measured the painted plate at 3.295:1 for the description in light, so the veil needs to be denser for dialogs.
- *Owner:* GLASS: dialog surface veil (7.0.0 floating surface, light bg alpha 0.69, backdrop blur(11px) saturate(1.6)). HEAD introduces --glass-veil-dialog (DialogContent.vue contentStyle); verify after adoption. — open, light (strongest) and dark
- *Fix:* Route to glass-ui: confirm that --glass-veil-dialog at HEAD holds contrast of at least 4.5:1 for body ink over a saturated WebGL/3D ground, or raise the dialog tier. No consumer override.

**UIA-KF-253 · LOW · The focus ring is painted on Cancel at pointer open, making Cancel the most emphasized control** [C]
- *Page · state:* clear-all-confirm-dialog · PLAUSIBLE — finding `cac#11`
- *Frame:* 01-open-1440-light.png · 01-open-1440-dark-crop.png · 02-hover-confirm-1440-light-crop.png
- *Observed:* Cancel opens with a heavy double-stroke ring (0.30 ring plus 0.15 bloom), so the secondary action wears more chrome than the primary. Hovering 'Clear & reload' gives no fill change (sampled rgb(219,36,36) at rest and on hover), so the destructive action has no perceptible hover state.
- *Expected:* The ring only for keyboard modality, and a hover response on every button (DESIGN.md states rule).
- *Owner:* GLASS: Dialog/Button 7.0.0. On pointer-initiated open, auto-focus reports :focus-visible=true on Cancel. HEAD's outline ring would still show; check reka's focus-visible heuristic. — open via pointer, all combinations
- *Fix:* Route to glass-ui: suppress focus-visible for pointer-initiated auto-focus, and verify a hover fill/scale on the tone=destructive primary at HEAD.

**UIA-KF-254 · LOW · At 390 the button labels shrink to 14px while the description stays at 16px** [M]
- *Page · state:* clear-all-confirm-dialog — finding `cacm4`
- *Observed:* capture-log 01-open-390-light: buttons font 14px/650; description 16px
- *Owner:* GLASS: control-text mobile rung (7.0.0); re-check at HEAD
- *Confirm note:* The action labels drop below body type on mobile, which weakens the footer's legibility against the bleed.

**UIA-KF-255 · LOW · The 390 bleed also tints the Cancel capsule** [M]
- *Page · state:* clear-all-confirm-dialog — finding `cacm5`
- *Observed:* 01-open-390-light.png: a magenta wash under the Cancel capsule
- *Owner:* GLASS: dialog veil and secondary button veil
- *Confirm note:* This extends finding 11 beyond the copy and the confirm button.

**UIA-KF-256 · LOW · The select label sits off the dock's type rung: 20.35px text beside a ~10px chevron, and a 39px (32px at 390) trigger among 40px controls** [C]
- *Page · state:* transport-dock · expanded — finding `trd#11`
- *Frame:* crop-02-cube-expanded-1440-light.png, crop-04-cube-tooltip-play-390-dark.png
- *Observed:* The 'Rotations' label is the largest text in the whole dock at 1440 (20.35px vs the 18.6px control rung, 14.4px tooltip), with a hairline chevron. The trigger is 1px shorter than its row at 1440 and 8px shorter at 390.
- *Expected:* DockTrigger owns its face and text rung (dock README: 'DockTrigger applies the same face to select…').
- *Owner:* CONSUMER TransportDock.vue:92 (class='dock-label' on DockTrigger) + demo/styles/style.css:368 (<1024 override); GLASS dock-label = --dock-control-size × 0.5088 — cube/amiga/spring, all legs
- *Fix:* Remove dock-label from the trigger and let DockTrigger's rung apply. If glass's dock-label ratio is meant for this, the chevron should scale with it (GLASS).

**UIA-KF-257 · LOW · A redundant 'Select animation' tooltip and wrapper div on a trigger that already shows its value and chevron** [C]
- *Page · state:* transport-dock · hover — finding `trd#13`
- *Frame:* crop-02-cube-expanded-1440-light.png, 05-cube-tooltip-select-*.png
- *Observed:* Hovering the trigger pops 'Select animation' into the band where the listbox opens. The wrapper div exists only to host the TooltipTrigger.
- *Expected:* DESIGN.md:1046 DockSelectTrigger 'anchors popover'. The clutter rule: labels that restate a visible value do not earn their place (aria-label already names it).
- *Owner:* CONSUMER TransportDock.vue:77-133 (Tooltip around a bare <div class='relative flex items-center gap-1.5'> around the Select) — cube/amiga/spring hover
- *Fix:* Drop the Tooltip and the wrapper div; keep the aria-label.

**UIA-KF-258 · LOW · The Select trigger inside the dock paints its own stadium ring (a pill inside a pill) when open or hovered** [M]
- *Page · state:* transport-dock — finding `trdm2`
- *Frame:* crop-22-amiga-select-open-1440-dark.png ('Spin' shows an outlined stadium inside the dock pill)
- *Owner:* GLASS DockTrigger open-state paint vs DESIGN.md:1046 'Bg darken only'
- *Confirm note:* This is exactly the 'too rounded / pills' complaint the owner raised in §0bl. It may be the focus ring left on the trigger, which fits the Select keyboard finding (focus stays on the trigger). Probe it with :focus-visible versus data-state=open.

**UIA-KF-259 · LOW · At 1440 the subject is the smallest thing on the page** [A] (filed MEDIUM, set by confirm)
- *Page · state:* cube-scene · idle / playing — finding `cu#12`
- *Frame:* docs/tranches/X/audit/ui-evidence/keyframes/cube-scene/01-idle-paused-1440-light.png; 10-panel-closed-fullbleed-1440-light.png
- *Observed:* The die is about 225px (≈4% of the stage), while the pane beside it is 407×610. The controls outweigh the hero subject.
- *Expected:* HIERARCHY: DESIGN.md §8 calls this an immersive full-bleed subject, and the primary content should dominate.
- *Owner:* CONSUMER — demo/scenes/cube/CubeTarget.css:88-97 (`--side-size: min(25vh, 25vw, 15rem)` at ≥lg) — cube-scene idle/playing, 1440
- *Fix:* Raise the desktop side-size rung (≈35–40vh), or derive it from the stage cell rather than the raw viewport. Never apply.
- *Confirm amendment:* The claim as worded is refuted by 01-idle-paused-1440-light and 10-panel-closed-fullbleed-1440-light. The projected die spans about 370x360px, the largest single object on the stage and comparable to the 410x600 pane, not the smallest thing. The 225px figure is the face size (--side-size), not the rendered footprint. What remains: the subject is under-scaled for an immersive full-bleed hero with the pane open. Downgrade to LOW.

**UIA-KF-260 · LOW · Matrix slider shows only a fill capsule: no visible thumb, no label, weak selected-cell state** [A]
- *Page · state:* cube-scene · Matrix Controls selected cell — finding `cu#13`
- *Frame:* docs/tranches/X/audit/ui-evidence/keyframes/cube-scene/05b2-matrix-slider-crop-1440-light.png; 05b2-matrix-cell-focus-crop-1440-light.png
- *Observed:* An orange stadium fill sits on an almost invisible track. No thumb, value or cell name shows which cell the slider drives, and the selected cell differs from the others only by bold text.
- *Expected:* STATES: the selected state is visible (glass selected ring or fill), and the slider carries a label/readout (glass labeled-field).
- *Owner:* CONSUMER (the invisible thumb is glass canon, slider/styles.css:144-151) — cube-scene › Matrix Controls, 1440 light
- *Fix:* Label the slider with the selected cell (e.g. 'Sy = 1.00'), give the selected cell a glass selected treatment, and confirm the thumb renders. Never apply.
- *Confirm amendment:* The missing thumb is glass canon, not a defect. glass slider/styles.css:144-151 says 'THE INVISIBLE THUMB. The scrubber is ONE continuous glass segment and the filled cylinder's leading EDGE is the handle', and the cited :267-270 belongs to the spectrum variant. Drop the 'Possibly GLASS / confirm thumb renders' part. The rest stands as CONSUMER: no label or readout names the driven cell (MatrixEditor.vue:58-91), and selection is marked only by font-bold.

**UIA-KF-261 · LOW · The channel-select status glyph reads as a warning (orange diamond) on every option** [A]
- *Page · state:* cube-scene · channel select open — finding `cu#14`
- *Frame:* docs/tranches/X/audit/ui-evidence/keyframes/cube-scene/03-channel-select-open-1440-dark-crop.png; 03-channel-select-open-1440-light-crop.png
- *Observed:* Rotations, Matrix and Hover each carry an orange '!' diamond while paused. In light or while playing the glyph shrinks to a barely visible mark.
- *Expected:* State glyphs use glass status-dot semantics. A paused state is not an error.
- *Owner:* CONSUMER — TransportDock.vue:120 maps paused → StatusDot warning — cube-scene, transport 'Select animation' open, paused, dark (a tiny lilac tick in light while playing)
- *Fix:* Use glass StatusDot or a play/pause micro-glyph consistently in both themes. Never apply.
- *Confirm amendment:* 03-channel-select-open-1440-dark-crop confirms an orange '!' lozenge on Rotations, Matrix and Hover. The proposed fix 'use glass StatusDot' is wrong: TransportDock.vue:118-121 already renders glass `<StatusDot :state="isStarted ? 'warning' : 'unknown'">`. The consumer maps paused to 'warning', which glass StatusDot.vue:162-180 draws as the warning lozenge. Fix: map paused to 'idle' (StatusDot.vue:130). Owner CONSUMER at TransportDock.vue:120.

**UIA-KF-262 · LOW · Re-lit material misbehaves per theme, and ppmycota faces disappear into the ground** [C]
- *Page · state:* cube-scene · dark / ppmycota — finding `cu#15`
- *Frame:* docs/tranches/X/audit/ui-evidence/keyframes/cube-scene/07a-axis-x-armed-1440-dark.png; 09a-ppmycota-on-1440-light.png; 10-panel-closed-fullbleed-1440-light.png
- *Observed:* In dark the veil muddies the crayon (yellow renders olive). In ppmycota light the faces are page-cream on cream, so the die loses its silhouette and edges.
- *Expected:* The lighting keeps the hue legible in both arms (a dark-in-both-arms shade register member), and the egg keeps an edge or silhouette against the ground.
- *Owner:* CONSUMER — demo/scenes/cube/CubeTarget.css:171-200 (shadow veil mixes --background; declared #8/D-7) + the ppmycota face fill (demo styles) — cube-scene dark (crayon), ppmycota light
- *Fix:* Add the banked dark-in-both-arms shade token, and give ppmycota faces a card surface token with an edge. Never apply.

**UIA-KF-263 · LOW · The matrix grid uses about 235px of a 400px card, leaving dead gutters, and the slider is squeezed to the grid width** [M]
- *Page · state:* cube-scene — finding `cum1`
- *Frame:* 05b-matrix-controls-surface-1440-light.png
- *Observed:* The 4x4 grid and its slider sit centred in the card, with about 80px of empty card on each side, so the cells are 56px when the card could hold about 90px cells.
- *Owner:* CONSUMER: MatrixEditor.vue:3-6 (CardContent `grid items-center justify-center`, which shrink-wraps the w-full grid)

**UIA-KF-264 · LOW · Selected cell has no resting selected state (bold text only)** [C]
- *Page · state:* cube-matrix-controls-tab · selected — finding `cm#11`
- *Frame:* 05-slider-dragged-1440-light.png (Tx drives the slider; no cell looks selected), 09-after-reset-1440-light.png
- *Observed:* The only selection cue is font-bold, which is invisible under the overlapping label. Once focus leaves, nothing shows which cell the slider drives.
- *Expected:* glass DESIGN.md:604/996: .is-active / aria-pressed gives a tinted bg and a 25% foreground border.
- *Owner:* CONSUMER demo/scenes/cube/matrix-editor/MatrixEditor.vue:24-29 — after focus leaves the grid
- *Fix:* Apply .is-active (or aria-current) to the selected cell, using the glass tint and edge.

**UIA-KF-265 · LOW · Translate bounds of ±1000px let the cube leave the stage** [A]
- *Page · state:* cube-matrix-controls-tab · slider drag — finding `cm#12`
- *Frame:* 05-slider-dragged-1440-light.png, 05-slider-dragged-390-dark.png
- *Observed:* A 60px slider drag moves Tx from 80 to 525, and the cube leaves the viewport: it is cut off at the right edge at 1440 and almost entirely off-screen at 390.
- *Expected:* The subject stays inside its stage; bounds come from the stage extent.
- *Owner:* CONSUMER demo/scenes/cube/matrix-editor/transformMath.ts (translate sliderOptions.bounds) — slider drag / cell edit on Tx
- *Fix:* Derive the translate bounds from the stage half-extent (layout tokens) or clamp the painted translation.
- *Confirm amendment:* The frames partly refute the observation as written. 07-toggle-flipped-1440-light holds the same Tx=525 as 05, yet the cube sits inside the stage because the Matrix animation is playing and the painted pose is interpolated. The off-stage cube in 05 is a transient, not a steady result of Tx=525. The underlying concern survives: bounds of [-1000,1000] (transformMath.ts:34) exceed the 720px half-width at 1440 and the 195px half-width at 390 at the animation's end state. Keep it LOW and treat it as a bounds-derivation issue.

**UIA-KF-266 · LOW · Two stacked cards with dead space: a grid island inside a wide card, and a full card for two small verbs** [C]
- *Page · state:* cube-matrix-controls-tab · light — finding `cm#13`
- *Frame:* 01-rest-1440-light.png
- *Observed:* The 236px grid is centred in a 403px card with about 84px of empty space on each side, and the slider only spans the grid. Below it a second full-width cartoon card holds only Reset and Free.
- *Expected:* HIERARCHY/CLUTTER: the primary content fills its holder and verbs are not chromed as a second slab.
- *Owner:* CONSUMER demo/scenes/cube/matrix-editor/MatrixEditor.vue:2-6 (grid justify-center inside the Card) + RibbonBar.vue:2-4 — 1440 rest
- *Fix:* Let the grid and slider fill the card width, and fold the verbs into the panel as a card footer once the surface is first-class (see the one-off finding).

**UIA-KF-267 · LOW · Top dock collapses to a lone scene glyph while the grid or slider is used, removing the 'Matrix Controls' context** [M]
- *Page · state:* cube-matrix-controls-tab — finding `cmm4`
- *Frame:* 01-rest-1440-light.png (expanded) vs 03-cell-Tx-focused-1440-light.png / 05 / 07 (collapsed to the cube icon)
- *Observed:* After interacting with the panel, the dock shows only the cube glyph, so the active surface name disappears while the user is editing it. This may be the intended idle-collapse, but it is worth checking against the panel-interaction case.
- *Owner:* CONSUMER dock collapse policy (demo/app/dock), needs confirmation by the dock seat

**UIA-KF-268 · LOW · The listbox glass lets the Pause button and ball show through as purple smudges that read like highlights** [C]
- *Page · state:* controls-tab-channel-options · select open — finding `co#14`
- *Frame:* 02-cube-easing-select-open-1440-light.png, 02-cube-easing-select-open-1440-dark.png, 05-cube-easing-scrolled-mid-1440-light.png
- *Observed:* A blurred purple blob sits behind 'ease-in' and another near 'ease-out'. Neither row is highlighted, but they look hovered.
- *Expected:* Menu surfaces are opaque enough that underlying accent colour never reads as row state.
- *Owner:* GLASS select/SelectContent material (glass-reveal, bg ≈ 0.75 alpha over a busy card) — #/cube easing Select open over the PlaybackRibbon
- *Fix:* Raise the menu-surface opacity or blur for popper menus at the glass root, and route the change to the glass-ui session.

**UIA-KF-269 · LOW · The 'advanced' drill-in and the back buttons are hand-rolled or override glass sizing** [C]
- *Page · state:* controls-tab-channel-options · default / advanced open — finding `co#17`
- *Frame:* 01-cube-controls-default-1440-light-crop.png, 10-cube-advanced-1440-light-crop.png
- *Observed:* The row is a bespoke button with its own focus ring. The pencil and back icons are glass Buttons shrunk by class overrides, so their hit areas and focus rings differ from every other icon button.
- *Expected:* Glass primitives at their own sizes (Button size=sm icon-only). The drill row is a glass menu-row/Collapsible, not a local grid-rows animation.
- *Owner:* CONSUMER ChannelOptions.vue:519-541 (a raw `<button>` row with kf-focus-ring) + the scoped .panel-row grid-rows drill CSS; :274 and :601 (glass Button with `h-auto p-1` overriding its size) — #/cube Controls tab, advanced row and advanced pane
- *Fix:* Replace the raw button with a glass Button (emphasis=quiet, full-width, trailing chevron) or Collapsible trigger, and remove the h-auto p-1 overrides. If glass lacks a drill-in row primitive, add it at the root and relay it.

**UIA-KF-270 · LOW · The advanced pane greys out blend and the enabled label with no stated reason** [A]
- *Page · state:* controls-tab-channel-options · advanced open (disabled state) — finding `co#18`
- *Frame:* 10-cube-advanced-1440-light-crop.png, 10-cube-advanced-1440-dark.png
- *Observed:* The 'blend' label and select render at disabled opacity. 'enabled' also looks disabled although its switch is live. 'z-index' is full foreground. Nothing explains why blend is unavailable.
- *Expected:* A disabled control carries a reason (tooltip or helper text), and only the disabled field dims.
- *Owner:* CONSUMER demo/components/instrument/transport/channel-controls/LayerConfigPanel.vue (blend disabled when blendAvailable=false; the label dims with it) — #/cube Controls tab → advanced
- *Fix:* Dim only the blend row and add helper text or a tooltip (for example 'Blend needs a single target'). Check why the enabled label inherits the dim.
- *Confirm amendment:* The claim that 'enabled … switch is live' is refuted by 10-cube-advanced-1440-light-crop.png: the switch itself renders washed and disabled. LayerConfigPanel.vue:15-23 disables blend and enabled together on a multi-target group on purpose (LP-6/LP-17: the engine never reads entry.layer in renderMultiTarget). The real defects: no reason is given to the user, and z-index stays fully live although the same comment implies the layer is inert on multi-target. Verify whether z-index is honoured there, or disable it with the same reason.

**UIA-KF-271 · LOW · Gold-shimmer 'easing' label used as an unexplained status, and the collapsed Select hides the authored curve** [C]
- *Page · state:* controls-timing-function-detail · return (back to controls) — finding `tf#10`
- *Frame:* 08-returned-to-controls-1440-light-crop.png
- *Observed:* The 'easing' label turns gold-shimmer, a signal used nowhere else on the card. The Select shows 'cubic-bezier' with a generic glyph, so the authored parameters can't be seen without reopening the editor.
- *Expected:* Status is carried by the control's value: the trigger shows the current curve's sampled glyph and a short literal or 'custom'. Labels keep the one label ink.
- *Owner:* CONSUMER (ChannelOptions.vue:241-249 gold-shimmer on label when isDetailEasing; SelectTrigger shows only the kind) — controls row after returning
- *Fix:* Remove the gold-shimmer label state. Have the trigger's SelectValue slot draw the stored curve's own glyph and a 'custom' / short-literal value.

**UIA-KF-272 · LOW · The card height jumps on every open, close and reopen** [M]
- *Page · state:* controls-timing-function-detail — finding `tfm2`
- *Frame:* capture-log-1440-light.json pane boxes
- *Observed:* The pane height is 632 at rest, 581 in the detail view and 542 on reopen at 1440. The transport card below moves by 50-90px on every toggle, and the reopen height differs from the first open.
- *Expected:* A sub-pane swap that keeps the host height stable, or one height transition that is the same on every open.
- *Owner:* CONSUMER (panel-row swap)

**UIA-KF-273 · LOW · The sub-pane title 'advanced' is weaker than its own field labels and names a category, not the content (layer compositing)** [C]
- *Page · state:* controls-advanced-layer — finding `adv#11`
- *Frame:* 03-amiga-advanced-pane-1440-light-crop.png, 05-amiga-blend-add-weight-hidden-1440-dark-crop.png
- *Observed:* Header 16.4px/500 muted brown, while the rows beneath are 16.4px/500 in foreground ink. The title is visually subordinate to what it titles. 'advanced' is a bucket name: the pane holds only the four layer-compositing fields and nothing says what a layer is.
- *Expected:* The title sits one type step above its rows (hierarchy) and names what it contains.
- *Owner:* CONSUMER — ChannelOptions.vue:594-607 (header span text-small font-medium text-muted-foreground) and :530 (entry row label) — advanced pane header, 1440 light and dark
- *Fix:* Rename the entry row and title to 'layer' (or 'compositing') and set the title on the heading rung (foreground, one step up), keeping the back glyph. Optionally add one muted line of description.

**UIA-KF-274 · LOW · Ribbon icon colours are four unrelated literals (default, text-gold, text-emerald-500, rainbow SVG gradient)** [C]
- *Page · state:* keyframes-tab-css-editor · rest — finding `kce#11`
- *Frame:* 01-keyframes-rest-1440-light-crop.png, 04-focus-copy-1440-dark-crop.png
- *Observed:* Four sibling buttons, four icon colour systems. text-emerald-500 is a raw Tailwind palette literal, and the Paintbrush uses a document-global SVG gradient id.
- *Expected:* Tokens, not literals. Sibling actions share one icon tone (--muted-foreground/--foreground), and colour is reserved for state.
- *Owner:* CONSUMER — demo/components/instrument/transport/controls-pane/RibbonBar.vue:21, :34 (text-gold), :45 (text-emerald-500), :57-64 (stroke url(#rainbow-gradient)) — keyframes-tab-css-editor, 1440 + 390, light+dark
- *Fix:* Use one icon token for all four. Drop emerald/gold/rainbow and let the pressed state (finding 11) carry emphasis.

**UIA-KF-275 · LOW · No pane heading or status; the only name for this surface is the dock trigger** [C]
- *Page · state:* keyframes-tab-css-editor · rest — finding `kce#13`
- *Frame:* 01-keyframes-rest-1440-light.png, 01-keyframes-rest-390-light.png
- *Observed:* The pane starts directly with line 1 of generated code. It has no heading, no animation name, and no parse status (valid/invalid, applied/not applied) near the source. The tabpanel has no accessible name (ChannelControls.vue:57-77 comment admits it).
- *Expected:* Hierarchy: the pane names what is being edited, and state lives beside the thing it describes, the more so because toasts are invisible (finding 2).
- *Owner:* CONSUMER — demo/components/instrument/keyframes/KeyframesStringControls.vue:1-18 — keyframes-tab-css-editor, all scenes
- *Fix:* Add a compact CardHeader on the editor card: the animation name, a glass StatusDot/Badge for parsed/error/applied, and aria-labelledby on the tabpanel pointing to it.

**UIA-KF-276 · LOW · Focus outline is square-cornered against the 16px card radius** [M]
- *Page · state:* keyframes-tab-css-editor — finding `kcem3`
- *Observed:* 11-parse-error-toast-1440-light-crop.png: the rectangular blue outline cuts across the rounded card corners.
- *Owner:* CONSUMER — CSSCodeEditor / .native-edit-context outline

**UIA-KF-277 · LOW · Stage animation is unchanged after an 'accepted' invalid buffer** [M]
- *Page · state:* keyframes-tab-css-editor — finding `kcem4`
- *Observed:* 23-hardfail-settled-1440-light.png: the buffer is '@keyframes x {…rotate( ; )}', yet the cube keeps playing Rotations and the success toast still fires. The success message is sent regardless of whether anything was adopted.
- *Owner:* CONSUMER — KeyframesStringControls.vue:140-145

**UIA-KF-278 · LOW · Remove keyframe is a tiny red × that reads as 'close'** [C]
- *Page · state:* timeline-tab · keyframe selected; hover Remove — finding `tl#12`
- *Frame:* 10-selected-1440-light.png; 15-hover-remove-1440-light.png
- *Observed:* A destructive icon-xs X at the far right of the label row, visually a dismiss-editor glyph. The Clear-all beside it uses a Trash glyph at icon-sm, so the two deletes use different glyphs and sizes.
- *Expected:* The same destructive glyph family and size as the toolbar trash, so intent reads at rest.
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/timeline/KeyframeTimeline.vue:280-290
- *Fix:* Use Trash2 at icon-sm with an explicit 'Remove' tooltip.

**UIA-KF-279 · LOW · Hover-preview property list truncates every value to a stub** [C]
- *Page · state:* timeline-tab · hover a keyframe — finding `tl#13`
- *Frame:* 09-hover-preview-1440-light.png; 09-hover-preview-1440-dark.png
- *Observed:* The tooltip is capped at max-w-56, so 'transform: rotate(9…' and 'background-color: r…' leave the values unreadable while half the tooltip is error prose.
- *Expected:* The values are the content: wrap them, or show the property list at a width that fits common declarations.
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/timeline/components/TimelineTrack.vue:255 (max-w-56); TimelineHoverPreview.vue:140-157 (truncate)
- *Fix:* Allow the value to wrap (break-words, 2 lines) or widen to max-w-72, and remove the error block (see the hover-preview BROKEN row).

**UIA-KF-280 · LOW · Glass Slider marks are static, so a draggable keyframe rail has no glass primitive** [A]
- *Page · state:* timeline-tab · populated track — finding `tl#15`
- *Frame:* 07-populated-track-in-view-1440-light-crop.png
- *Observed:* The demo hand-rolls the rail, diamonds, carets and zoom because glass `Slider :marks` (the canon's playhead-with-ticks surface) renders non-interactive ticks only.
- *Expected:* glass-ui src/components/timeline/README.md:17-18 routes playhead+ticks to `<Slider :marks>`. An editable-marks mode (draggable, selectable, keyboard-movable marks with a count badge) would let consumers drop the hand-rolled rail.
- *Owner:* GLASS — glass-ui Slider (src/components/slider/Slider.vue:37-38 resolveValueMarks; types.ts:28 marks?: readonly number[]); canon timeline/README.md:17-18
- *Fix:* Ask BK/BL: add an interactive-marks slot or mode to Slider (mark roving focus, drag emits, selected state) so the keyframes rail can adopt the glass groove, thumb and focus.
- *Confirm amendment:* The GLASS owner call stands, but the scope is overstated. The glass Slider already takes modelValue: number[] and minStepsBetweenThumbs (slider/types.ts; reka multi-thumb), so draggable, keyboard-movable stops already exist as multiple thumbs. marks?: readonly number[] is 'decorative checkpoints' (types.ts:28). The real gap is (a) a per-thumb slot or state for selected and diamond glyph, (b) add or remove a stop by clicking or keyboard on the groove, and (c) per-thumb valueText labels, which exist, versus a count badge. The BK/BL ask should be 'multi-thumb Slider: thumb slot + selected thumb + add/remove emits', not 'interactive marks'. Route to the glass-ui session.

**UIA-KF-281 · LOW · The keyframe label field is a heavy 2px-ink stadium outline, unlike glass Input** [M]
- *Page · state:* timeline-tab — finding `tlm2`
- *Frame:* 12-selected-css-editor-1440-light-crop.png
- *Observed:* 'Quarter turn' sits in a thick dark-ink ring (light theme) where glass fields use hairline or on-glass input tokens. The dark theme is lighter.
- *Owner:* CONSUMER — KeyframeTimeline.vue label row (about :255-290)

**UIA-KF-282 · LOW · Placeholder chevron bounces forever (animate-bounce), a one-off motion not gated for reduced motion** [C]
- *Page · state:* timeline-expanded · expanded — finding `tx#13`
- *Frame:* 01-expanded-empty-1440-light.png
- *Observed:* The chevron bounces as long as the timeline stays expanded. It uses a Tailwind utility, not a motion token, and has no motion-safe guard.
- *Expected:* House motion tokens, with reduced-motion gating.
- *Owner:* CONSUMER — ChannelControls.vue:~140 (<ChevronDown class='w-6 h-6 animate-bounce' />) — timeline-expanded, rail placeholder
- *Fix:* Remove it along with the placeholder, or use motion-safe: plus a tokenized, finite animation.

**UIA-KF-283 · LOW · Dock chip pairs a collapse icon with the bare word 'Timeline', which reads as a title, not an action** [C]
- *Page · state:* timeline-expanded · expanded — finding `tx#14`
- *Frame:* 06-transport-dock-expanded-collapse-chip-1440-light.png; 07-transport-collapse-tooltip-1440-dark.png
- *Observed:* '[⤡] Timeline' sits after Reset. The label is a non-interactive span, so the icon-plus-word looks like a clickable 'Timeline' control. The action is named only in the tooltip.
- *Expected:* Dock controls are self-describing glass DockControls. No loose labels (clutter).
- *Owner:* CONSUMER — TransportDock.vue:152-163 — timeline-expanded, transport dock hovered
- *Fix:* Icon-only DockControl with a tooltip, or delete it with the collapse consolidation.

**UIA-KF-284 · LOW · 1440: the transport dock butts against the expanded cell's right edge with no gutter** [M]
- *Page · state:* timeline-expanded — finding `txm2`
- *Frame:* 06-transport-dock-expanded-collapse-chip-1440-light.png
- *Observed:* The expanded dock's left edge (about x 718 of 2000 display px) touches the cell's right edge (about x 719), so the two glass surfaces kiss.
- *Owner:* CONSUMER — AnimationControlsGroup layout (dock centred on the stage column, cell in the rail column)
- *Fix:* Resolved by spanning the expanded surface above the transport band (see the 'Expand does not widen' finding), or give the dock a gutter from the rail.

**UIA-KF-285 · LOW · Focus falls to <body> after a failed submit** [C]
- *Page · state:* css-paste-dialog · parse error, no-stops error — finding `cpd#13`
- *Frame:* 03-import-parse-error-1440-light.png, 04-import-no-stops-error-1440-light.png (capture-log focus = BODY)
- *Observed:* After Import is clicked and the parse fails, document.activeElement is BODY. A keyboard user loses their place inside the modal, and the new error is not next to the focus.
- *Expected:* Focus stays inside the dialog, on the field that owns the error (aria-describedby is already wired).
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/timeline/CSSPasteDialog.vue:167-183 (`busy` → Button `:loading` disables the focused control)
- *Fix:* On reject, focus the textarea (it already has aria-describedby → the error).

**UIA-KF-286 · LOW · Disabled and enabled primary actions look almost the same** [A]
- *Page · state:* css-paste-dialog · open empty (disabled) vs typed (enabled), light — finding `cpd#14`
- *Frame:* 01-import-open-empty-1440-light-crop.png vs 02-import-typed-focus-1440-light-crop.png
- *Observed:* Both show the same cream capsule, oklab(0.974 …/0.8). Only the label ink changes, from grey to black. The 'primary' confirm looks the same as the secondary ribbon capsules behind the scrim.
- *Expected:* The emphasis ladder should make primary noticeably stronger than secondary, and disabled should be clearly inert (DESIGN emphasis ladder).
- *Owner:* GLASS — glass-ui src/components/button/styles.css:133-136 (primary = floating rung + 600 weight) and the disabled state
- *Fix:* GLASS: strengthen the primary rung's plate or edge, or dim the disabled plate as well as the ink.
- *Confirm amendment:* The measurement holds: frames 01 and 02 have the same bg oklab(0.974…/0.8), and only the ink changes. But the 'dim the plate' half of the fix contradicts an explicit glass ruling at HEAD button/styles.css:257-269 ('DIM, and dim is not desaturate … the box keeps its full-alpha silhouette and the INK alone recedes'). The part that survives is primary vs secondary. At :133-136 primary differs from secondary only by --glass-depth-content and weight 600, which reads as the same cream capsule as the ribbon's secondary buttons. Measured at 7.0.0 only, so it needs a re-measure at HEAD. Owner GLASS is correct. Frame it as an emphasis-ladder question, not a disabled-state defect.

**UIA-KF-287 · LOW · The draft is cleared before the close animation, and the busy state never renders** [C]
- *Page · state:* css-paste-dialog · submit progress — finding `cpd#15`
- *Frame:* 07-import-submit-busy-1440-light.png (textarea len 0, button disabled, dialog still mounted; captured 40ms after the click at 20× CPU throttle)
- *Observed:* Even at 20× CPU throttle the submit resolves inside one frame, so `loading` is never visible. The well empties while the plate is still exiting.
- *Expected:* The exit animates the content the user submitted. Clear the draft after the dialog closes.
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/timeline/KeyframeTimeline.vue:631-634 and :644-647 (`importText.value = ""` inside submit, before the shell sets open=false)
- *Fix:* Clear the draft in an on-close handler rather than inside the submit.

**UIA-KF-288 · LOW · Title, description and button repeat the same words** [C]
- *Page · state:* css-paste-dialog · open — finding `cpd#16`
- *Frame:* 01-import-open-empty-1440-light-crop.png, 09-addcss-open-1440-light.png
- *Observed:* 'Import CSS @keyframes' / 'Paste CSS @keyframes to load into the timeline' / 'Import'. 'CSS @keyframes' appears twice in 40 words, and the description does not say that Import replaces while Add merges, which is the one thing the user needs to know.
- *Expected:* CLUTTER lens: the description should earn its line.
- *Owner:* CONSUMER — keyframes.js demo/components/instrument/timeline/KeyframeTimeline.vue:627-642; KeyframesAddDialog.vue:5-8
- *Fix:* Shorten the title to 'Import keyframes' / 'Add keyframes'. Make the description state the consequence: 'Replaces the current timeline' / 'Merges into matching stops'.

**UIA-KF-289 · LOW · The twins diverge on keyboard affordances as well as chrome** [M]
- *Page · state:* css-paste-dialog — finding `cpdm2`
- *Observed:* This is one more one-off beyond the icon, sweep and error-path splits. It supports retiring the adapter (finding 4).
- *Owner:* CONSUMER — KeyframesAddDialog.vue `:format` + the Shift+Alt+F registerShortcut (only the spring twin has it). The Timeline Import/Add has no reformat.

**UIA-KF-290 · LOW · The 390 Timeline track shows no stop diamonds at the expanded detent** [M]
- *Page · state:* css-paste-dialog — finding `cpdm4`
- *Frame:* confirm/c1-390-expanded-light.png vs 08-import-success-closed-1440-light.png
- *Observed:* At 1440 the ruler shows 0/50/100% diamonds. At 390 the stop track under the ruler is empty apart from the playhead. It could be a data-state difference (a fresh page on the cube default), so it needs a check against the same animation.
- *Owner:* CONSUMER

**UIA-KF-291 · LOW · Pitch and yaw role=slider readouts cannot be focused or operated** [C]
- *Page · state:* amiga-scene · drag / arrow-key spin (AT) — finding `am#17`
- *Frame:* 07b-kbd-arrows-yaw45-pitch-22-1440-light.png (aria-valuetext updates to 'yaw 45°' / 'pitch -22°'; Home resets to 0°), capture-log.json sliders
- *Observed:* The two `role=slider` spans are canvas fallback content with no tabindex or key handling. Keyboard operation lands on the parent group. The values do update correctly.
- *Expected:* An ARIA slider is a focusable, operable widget. Read-only values are `role=status` or `output` (or the group owns aria-valuetext).
- *Owner:* CONSUMER keyframes.js demo/scenes/amiga/AmigaScene.vue:67-84
- *Fix:* Make the spans read-only readouts (role=img/status with a label), or make each slider the focus target for its own axis keys.

**UIA-KF-292 · LOW · Dark theme: the box's rest halo becomes a heavy near-black frame** [C]
- *Page · state:* square-scene · idle dark — finding `sq#10`
- *Frame:* crop-05a-kbd-focus-1440-dark.png, 00-idle-box-1440-dark.png, 07c-tab-keyframes-390-dark.png
- *Observed:* In light theme the 8px halo reads as a soft matte. In dark it is 50% of the near-black --background, so the box sits in a thick black bezel against the warm-brown plate.
- *Expected:* A halo that reads the same in both themes (a hairline or a plate-toned lift, not a hole).
- *Owner:* CONSUMER — demo/scenes/square/SquareScene.css:106-108 (`0 0 0 0.5rem color-mix(var(--background) 50%)`) — square-scene dark, 1440 and 390
- *Fix:* Mix the halo from the plate or card surface token (or `--border`) rather than --background, or drop the halo and keep only the inset edge-light. Not applied.

**UIA-KF-293 · LOW · data-square-mode drops to 'idle' mid pointer drag, so will-change is lost while the box is moving** [C]
- *Page · state:* square-scene · 2-axis spring drag — finding `sq#11`
- *Frame:* 02a-drag-mid-1440-light.png; capture-log 02a/02b/02c mode='idle' while keyboard nudge 05b reads mode='drag'
- *Observed:* During a pointer drag pinned at the clamp (x +1.00) the FSM reads 'idle' and the badge flickers settled/tracking; the keyboard nudge correctly reads 'drag'.
- *Expected:* mode stays 'drag' until pointer release (SquareScene.vue:455).
- *Owner:* CONSUMER — demo/scenes/square/SquareScene.vue:213 (settle callback forces mode='idle' whenever the group is stopped, even mid-drag) — square-scene pointer drag, 1440/390
- *Fix:* Guard the settle callback with `!dragging.value`. Not applied.

**UIA-KF-294 · LOW · Timeline pane's target thumbnail clips the square's label** [C]
- *Page · state:* square-scene · Timeline tab, empty timeline — finding `sq#12`
- *Frame:* 07d-tab-timeline-1440-light.png, p2-fresh-timeline-tab-1440-light.png; probe.json freshAfterTimelineTab demoBoxes=2
- *Observed:* The preview well crops the cloned box so 'drag me' is cut through the middle and the box is pinned to the top edge.
- *Expected:* The target thumbnail fits (object-fit: contain) and centres the subject.
- *Owner:* CONSUMER (shared timeline preview) — cross-ref timeline-tab seat; the clone is the scene's .demo-box (a second .demo-box appears in the DOM on the Timeline tab) — square-scene Timeline tab, 1440 light
- *Fix:* Scale the cloned target to fit the preview well rather than cropping at natural size. Not applied.

**UIA-KF-295 · LOW · Timeline toolbar shows an enabled red Delete (trash) on an empty timeline** [M]
- *Page · state:* square-scene — finding `sqm2`
- *Frame:* 07d-tab-timeline-1440-light.png
- *Observed:* With 'No keyframes yet', undo and redo are dimmed but the destructive trash is painted full red, so a destructive control looks armed when there is nothing to delete. It should be disabled or muted until the timeline has content.
- *Owner:* CONSUMER (shared timeline pane)

**UIA-KF-296 · LOW · At 390 the box at x=+1 runs its halo into the plate's right edge** [M]
- *Page · state:* square-scene — finding `sqm3`
- *Frame:* 03-settled-tumble-hint-390-light.png (x +1.00: the box halo reaches ~x=378 on a ~388px plate)
- *Observed:* The inverse of the 1440 dead-space finding: at phone width the travel envelope nearly overflows the plate. Travel should derive from the stage inline size at both ends.
- *Owner:* CONSUMER — --square-travel does not account for the box + halo at phone width (SquareScene.css:29)

**UIA-KF-297 · LOW · The family filter sits on a 10003px stadium plate (glass 7.0.0 track); the same plate also wraps the specimen row** [C]
- *Page · state:* easing-scene-specimens · all filters — finding `es#12`
- *Frame:* 07c-copy-literal-crop-1440-light.png, 0308-filter-steps-390-dark.png
- *Observed:* The computed track radius is 10003px (the ×32 census bug). The same quiet blurred plate wraps both the segmented filter and the specimen grid.
- *Expected:* DESIGN.md:391 --radius-tab applies to a segmented stadium through the role token, and card tiles carry no track.
- *Owner:* CONSUMER (pin) — keyframes package.json:78 pins @mkbabb/glass-ui 7.0.0; cured in glass ≥8/10.0.1 — #/easing header
- *Fix:* KF.W13R repin to 10.0.1, then re-check that the filter still reads as a segmented control.

**UIA-KF-298 · LOW · The copy button's check icon disappears within 400ms while its label stays 'Copied to clipboard', and the two icons overlap at the start** [C]
- *Page · state:* easing-scene-specimens · after click — finding `es#13`
- *Frame:* 07f-copy-t80-1440-light.png, 07f-copy-t400-1440-light.png, 07c-copy-literal-crop-1440-light.png
- *Observed:* At 80ms both icons are at opacity 1 and scale 1.295 (drawn on top of each other). By 400ms the icon is back to the plain clipboard, but aria-label stays 'Copied to clipboard' for about 2s. The clipboard content is correct.
- *Expected:* The visual and accessible states agree and hold for the same time.
- *Owner:* CONSUMER demo/components/CopyButton/CopyButton.vue:31-45 — #/easing header copy button
- *Fix:* Keep the check icon for the whole isCopied window and cross-fade the two icons rather than stacking both at full opacity.

**UIA-KF-299 · LOW · The tile row grows about 13-23px taller when a tile gets keyboard focus or selection, shifting the gallery** [C]
- *Page · state:* easing-scene-specimens · keyboard focus / select — finding `es#14`
- *Frame:* 00-load-1440-light.png compared with 05-tile-kbd-focus-1440-light.png
- *Observed:* Tile names move from y≈343 to y≈356 and the plate's bottom from about 370 to 393 once focus enters the group.
- *Expected:* State changes do not move the layout.
- *Owner:* CONSUMER demo/scenes/easing/EasingTarget.vue specimen tiles (likely the pressed tile's font-weight or focus geometry inside the nowrap stadium row) — #/easing gallery
- *Fix:* Recheck after the grid fix. Reserve the ring and weight change with outline-offset or a fixed tile height.

**UIA-KF-300 · LOW · When the ball preview is hidden, only a floating eye icon is left in an empty row, and its name reads 'Hide' even while pressed** [C]
- *Page · state:* easing-scene-specimens · preview hidden / shown — finding `es#15`
- *Frame:* 09-preview-hidden-1440-dark.png, 09b-preview-shown-again-1440-dark.png
- *Observed:* The row collapses to one right-aligned icon and the card reflows by about 30px. aria-pressed=true (hidden) keeps the name 'Hide ball preview'.
- *Expected:* The toggle sits in a stable position (e.g. next to Reverse) and its tooltip says the action it will take.
- *Owner:* CONSUMER demo/components/playback/PlaybackRibbon.vue:102-135 — #/easing ribbon
- *Fix:* Move the toggle into the Play/Reverse row, or keep the row height, and use a 'Show/Hide ball preview' tooltip.

**UIA-KF-301 · LOW · The 'Copied' tooltip is almost invisible (very low contrast ghost text above the header)** [M]
- *Page · state:* easing-scene-specimens — finding `esm3`
- *Frame:* 07f-copy-t80-1440-light.png (faint 'Copied' at top right)
- *Observed:* The tooltip appears as pale text on the card ground, with no visible tooltip surface.
- *Owner:* CONSUMER demo/components/CopyButton/CopyButton.vue (tooltip content) / GLASS Tooltip 7.0.0 if the fade is the vendor's — #/easing header copy button
- *Fix:* Show the confirmation in a tooltip with a real surface, or rely on the icon plus the live region only.

**UIA-KF-302 · LOW · Keyframes surface: the Monaco card's scrollbar thumb is clipped at the card's top-right corner, and line 18 is cut off at the card foot** [M]
- *Page · state:* easing-scene-specimens — finding `esm4`
- *Frame:* 13-dock-tab-keyframes-1440-light.png
- *Observed:* A vertical scrollbar stub sits outside the rounded corner at x≈468,y≈70. The editor ends mid-line at the 18th line and the next card overlaps it.
- *Owner:* CONSUMER keyframes pane mount inside the stacked rail (same root cause as the Curve-card stacking) — #/easing, dock tab Keyframes @1440
- *Fix:* Resolved by mounting one pane per surface; confirm the Monaco container respects the card radius.

**UIA-KF-303 · LOW · `label-class` and `tooltip` on the duration LabeledSlider are not declared props, so they do nothing (the ms hint never shows)** [C]
- *Page · state:* easing-curve-tab · rest — finding `ec#7`
- *Frame:* 01-curve-rest-1440-light-crop.png (label renders in the default glass-label style, 16.4px/500 foreground, not muted small); probe2.mjs output shows `label-class="…" tooltip="Sweep duration (ms)"` as raw attributes on the root
- *Observed:* The glass-ui 7.0.0 LabeledSliderProps (types.d.ts:7-13, 45-47) accept label, description, requirement, layout and errorLive, not labelClass or tooltip. Both land as raw DOM attributes on div.labeled-field.
- *Expected:* The same inert-prop class X.W7.a2 cured elsewhere (69c0d255): no props that do nothing.
- *Owner:* CONSUMER — demo/scenes/easing/EasingSidebar.vue:64-65 — Curve tab · duration field
- *Fix:* Delete both. Use `description="Sweep duration (ms)"` for the hint and let the glass label style stand, or restyle it at the glass root.

**UIA-KF-304 · LOW · The copyable literal wraps mid-number ('1.' / '6)', '0.25,' / '1)')** [C]
- *Page · state:* easing-curve-tab · rest / after drag — finding `ec#11`
- *Frame:* 07-handle-drag-1440-light-crop.png, 01-curve-rest-1440-light-crop.png, 01-curve-rest-390-light.png
- *Observed:* break-all splits a number across two lines, so 1.6 reads as '1.' then '6)'
- *Expected:* A literal that reads correctly and can be copied; wrap only at argument boundaries
- *Owner:* GLASS — HEAD replaces break-all with truncate (hides the literal); needs a wrap-at-token rule — Curve tab · rest (1440 + 390), after a drag
- *Fix:* GLASS: `overflow-wrap:anywhere; word-break:normal` with a zero-width break after each ', ', or a field wide enough for the full literal. Do not truncate the text the copy button copies.

**UIA-KF-305 · LOW · Rail focus ring is a square grey rectangle around the 48px gesture box** [C]
- *Page · state:* spring-scene-solver · focus-visible (Tab to rail, End) — finding `ss#12`
- *Frame:* 04-kbd-focus-rail-end-1440-light.png
- *Observed:* A sharp-cornered rectangle wraps the whole invisible hit box, including the overshoot bands. It matches no drawn shape on the stage.
- *Expected:* The focus ring follows the control's drawn shape and radius role.
- *Owner:* CONSUMER — SpringTarget.vue:105 (.spring-rail kf-focus-ring, no radius) + demo/styles/design-idioms.css:106-109 (box-shadow ring follows the host box) — spring stage, keyboard focus
- *Fix:* Give .spring-rail a radius (var(--radius-field)) or ring the value track (.spring-track) through :has(:focus-visible).

**UIA-KF-306 · LOW · Panel crowding and hierarchy: three inputs for the same two params, wrapped headers, and slider tone off the scene accent** [C]
- *Page · state:* spring-scene-solver · rest — finding `ss#13`
- *Frame:* 00-load-rest-1440-light.png; 20-sheet-expanded-390-dark.png
- *Observed:* response/ζ are set by sliders, by the 2D heatmap (with its own readout) and by the presets (each with its own readout and mini track). The heatmap header wraps to two lines and the legend to three. The sliders use the peach liquid fill while every other mark in the scene is violet (--color-progress).
- *Expected:* One primary input with the others demoted, headers that fit their column, and one accent per scene.
- *Owner:* CONSUMER — SpringPhysicsFacet.vue:22-56 (LabeledSlider x2 + SpringHeatmap + preset grid); SpringHeatmap.vue:18 header — spring Physics panel, 1440 (371px column) and 390
- *Fix:* Make the heatmap the primary 2D input and fold the sliders into it (or collapse them). Shorten the header to 'peak overshoot' and the legend to one line. Pass the scene tone to LabeledSlider.

**UIA-KF-307 · LOW · The heatmap plot well renders near-black in dark theme** [M]
- *Page · state:* spring-scene-solver — finding `ssm2`
- *Frame:* 16-tabcycle-timeline-1440-dark.png
- *Observed:* The overdamped region of the heatmap is a solid near-black rectangle on the warm-brown glass panel. This is the value.js 'black ground' docket at component scale, and the same symptom as the dark preset cells.
- *Owner:* CONSUMER — SpringHeatmap.vue plot background — spring Physics panel, dark
- *Fix:* Tint the empty region from a surface token rather than from the page background or black.

**UIA-KF-308 · LOW · Heatmap hover shows a hollow cell but no value for that cell; the active marker overprints the 'smooth' label** [C]
- *Page · state:* spring-physics-tab · heatmap hover cell / keyboard focus — finding `spt#18`
- *Frame:* 04a-heatmap-hover-cell-1440-light.png, 04b-heatmap-kbd-focus-arrow-1440-light.png
- *Observed:* The hover draws a small rectangle but the header still reports the current params, so a user can't see what a click would write. Keyboard focus rings the plot; the arrows move the marker, which lands on the label ('sr◉oth').
- *Expected:* The hover previews '(r, ζ) → peak %' near the cursor or in the readout. Labels avoid the marker.
- *Owner:* CONSUMER — demo/scenes/spring/SpringHeatmap.vue:95-100 (hoverCell, no hover readout), :18-24 (the readout reports only the current value), :84-90 (pip labels)
- *Fix:* Show the hovered cell's values in the readout while hovering (reverting on leave). Offset the pip labels, or hide the label of the active pip.

**UIA-KF-309 · LOW · Top dock mid-collapse spills its children outside the pill (Physics / sidebar icon / @mbabb stacked on the stage)** [C]
- *Page · state:* spring-physics-tab · any, after focus leaves the dock (captured during heatmap keyboard focus) — finding `spt#22`
- *Frame:* 04b-heatmap-kbd-focus-arrow-1440-light.png
- *Observed:* The pill has shrunk to 'Spring' while 'Physics', the panel-toggle icon and '@mbabb' render stacked beneath it over the stage card title.
- *Expected:* Children clip or fade inside the morphing pill; nothing renders outside it mid-transition.
- *Owner:* CONSUMER — demo/app/dock/ChromeDock.vue morph (cross-reference the top-dock seat and COHESION §0bs OA-41, 'dock morph blurry/slow/jittery')
- *Fix:* Clip the dock content to the morphing shell (overflow clip plus content opacity keyed to the morph). Owned by the dock or glass-repin wave.

**UIA-KF-310 · LOW · 390 drawer shows the grey native scrollbar and fades the first row ('response') under the handle at rest** [M]
- *Page · state:* spring-physics-tab — finding `sptm4`
- *Frame:* 00-physics-tab-rest-390-light.png (scrollbar at x≈383; the 'response' row is washed out under the handle)
- *Observed:* The scrollbar is not the glass scroll idiom, and the first control is only half-legible at rest.
- *Owner:* CONSUMER — drawer body scroll styling (glass Drawer consumer)

**UIA-KF-311 · LOW · The controls pane idle-dims to 35% opacity, taking primary verbs with it** [M]
- *Page · state:* spring-discrete-view — finding `sdvm3`
- *Frame:* 10a-ribbon-twin-in-pane-1440-light.png
- *Observed:* With the pointer away, the whole rail, including the accent Dismiss twin and the preset cells, fades to 0.35, so live controls read as disabled. This interacts with the duplicated-verb finding.
- *Owner:* CONSUMER demo/styles/design-idioms.css:44 (--controls-idle-opacity: 0.35)

**UIA-KF-312 · LOW · Rails near-invisible and the dark stage plate muddy** [C]
- *Page · state:* sequence-scene · light; dark — finding `seq#13`
- *Frame:* 00b-storyboard-rest-1440-dark.png, 00b-storyboard-rest-1440-light.png
- *Observed:* The row rails and master rail paint at 8% alpha (measured color(srgb .9 .3 .9 / 0.08)), so the lanes and the scrub track almost vanish. In dark the stage plate is a flat brown wash with a pink border.
- *Expected:* A visible track for a draggable control (glass Slider track token) and the glass surface register for nested plates.
- *Owner:* CONSUMER — demo/styles/design-idioms.css:227 (.progress-rail tint `var(--rail-tint, 8%)`), SequenceTarget.css:78-86 (stage tint + border) — storyboard + master rail, dark especially
- *Fix:* Use glass Slider's track or a surface-tint token for the rails. Drop the stage's tone-mixed plate for the glass inset surface.

**UIA-KF-313 · LOW · Focus rings are square boxes around the invisible hit hosts, not the visible grip** [C]
- *Page · state:* sequence-scene · per-row re-time; master-clock scrubber — finding `seq#14`
- *Frame:* 05d-row2-kbd-focus-nudged-1440-dark.png, 05d-row2-kbd-focus-nudged-390-light.png, crop-scrub-kbd-focus-1440-light.png
- *Observed:* A 44x32 grey square around the 6px pill grip, and a full-width square rectangle around the master rail.
- *Expected:* glass focus-visible ring + glow on the control's own shape (DESIGN.md:603 --focus-ring-shadow; a slider's ring sits on its thumb).
- *Owner:* CONSUMER — SequenceTarget.vue:148 + SequenceScrubber.vue:24 (`.kf-focus-ring` box-shadow on radius-0 hosts; design-idioms.css:106-109) — row handle keyboard focus; scrub keyboard focus
- *Fix:* Ring the grip/thumb (e.g. :focus-visible::after box-shadow), or adopt glass Slider.

**UIA-KF-314 · LOW · The playhead diamond covers axis labels ('0' at rest; '1940' late in the clock at 390)** [C]
- *Page · state:* sequence-scene · storyboard rows with axis + playhead — finding `seq#15`
- *Frame:* crop-axis-zero-playhead-1440-light.png, 03b-playing-1350ms-390-light.png
- *Observed:* The diamond and line sit on top of the '0' label and later on '1940 ms' at 390.
- *Expected:* The ruler labels stay legible and the playhead lives in the lane block.
- *Owner:* CONSUMER — SequencePlayhead.vue ::before diamond (top:-3px) overlapping SequenceAxis.vue labels (same strip, because of the grid-row bug) — rest, playing
- *Fix:* Resolved by the playhead grid-row fix. Otherwise start the head below the label line.

**UIA-KF-315 · LOW · 1440 hierarchy: a small card in a mostly empty page; the scrub ball outweighs the subject** [C]
- *Page · state:* sequence-scene · storyboard rows with axis + playhead — finding `seq#17`
- *Frame:* 00b-storyboard-rest-1440-light.png
- *Observed:* The card is 704x465 in a 1440x900 viewport, leaving about 60% empty grid. The lanes are 560px. The 36px violet scrub ball is the heaviest mark on the page, outweighing the 26px travellers that are the subject.
- *Expected:* The primary content (the five-lane cascade) dominates, and the instrument chrome is subordinate.
- *Owner:* CONSUMER — SequenceTarget.vue:5 (`max-w-3xl`), SequenceScrubber.vue .scrub-ball (36px, full glow) — 1440 rest
- *Fix:* Widen the stage (max-w-5xl) and increase lane pitch. Size the scrub thumb to the glass Slider thumb.

**UIA-KF-316 · LOW · Ruler labels at arbitrary quarter values (485/970/1455), and at 390 the ruler drops to 0/970/1940** [M]
- *Page · state:* sequence-scene — finding `seqm1`
- *Frame:* 03a-playing-650ms-1440-light.png, 03b-playing-1350ms-390-light.png
- *Observed:* The time ruler labels non-round ms values and its label density differs by viewport. A ruler reads best on round ms steps.
- *Owner:* CONSUMER — SequenceTarget.vue:212-214 AXIS_QUARTERS (labels = q × duration)
- *Fix:* Use glass Slider marks at round ms steps (e.g. every 250/500ms), which the hand-rolled-slider row already calls for.

**UIA-KF-317 · LOW · Re-timing a row gives no active or dragging affordance, and the lanes stay in their end state** [M]
- *Page · state:* sequence-scene — finding `seqm2`
- *Frame:* 05b-row3-drag-mid-1440-light.png, 05c-row3-retimed-1440-light.png
- *Observed:* While dragging, the handle does not change state (no grab or active style) and the balls stay parked at the track end, so the new offset shows no motion preview until Play. The rows can also become non-monotonic (3@943 after 4@780) with no reordering or indication.
- *Owner:* CONSUMER — SequenceTarget.vue .seq-handle
- *Fix:* Covered in part by moving authoring into the Timeline pane (cohesion row). Otherwise add an active state and preview the retimed row.

**UIA-KF-318 · LOW · The sheet's top corners are 12px (panel rung); the canon sheet rung is 24px** [C]
- *Page · state:* mobile-controls-drawer · peek/expanded, light+dark — finding `mcd#11`
- *Frame:* 02b-cube-expanded-toggle-390-light.png (drawer.borderTopLeftRadius 12px in capture-log-390-light.json)
- *Observed:* The drawer's top corners are 12px, about the same as the 16px cards inside it, so the sheet does not read as the outer container.
- *Expected:* DESIGN.md:378 — `--radius-3xl` 24px is the 'Big-dock/sheet rung', which keeps the nesting concentric (outer > inner).
- *Owner:* CONSUMER (pin) — keyframes package.json:78 pins @mkbabb/glass-ui 7.0.0; cured in glass ≥8/10.0.1 — all scenes @390x844
- *Fix:* Fixed by the Sheet migration. No separate work.

**UIA-KF-319 · LOW · The desktop ribbon wraps its four actions 3+1, leaving 'Apply CSS' alone on a row** [C]
- *Page · state:* mobile-controls-drawer · Keyframes tab, desktop rail (the ribbon is unreachable on mobile — see finding 1) — finding `mcd#12`
- *Frame:* 41-cube-desktop-keyframes-1440-dark.png
- *Observed:* Copy · Format · Export CSS sit on one row and Apply CSS sits alone centred on a second row. The primary stateful toggle (Apply) reads as an afterthought.
- *Expected:* The ribbon's actions have a clear hierarchy: Apply is the primary toggle, and copy/format/export are secondary icons or an overflow menu.
- *Owner:* CONSUMER — demo/components/instrument/transport/controls-pane/RibbonBar.vue:12-15 (`flex flex-wrap justify-center` over 4 sm Buttons) — #/cube @1440x900
- *Fix:* Make Apply CSS the lead action and put Copy/Format/Export in an icon row or a DropdownMenu, so the ribbon is one row at both rail and sheet widths.

**UIA-KF-320 · LOW · The Physics facet's legend and axis labels collide on phone width** [M]
- *Page · state:* mobile-controls-drawer — finding `mcdm3`
- *Frame:* 24-spring-tab-timeline-390-light.png, 26a-spring-physics-scrolled-0.5-390-light.png
- *Owner:* CONSUMER — SpringPhysicsFacet heatmap legend
- *Confirm note:* Above the chart, 'parameter space — peak overshoot' wraps to two lines against the '0.50 S / Z 0.86' readout. The 'smooth' marker label collides with the ζ=1 dashed line. The 'peak overshoot 0→53% · varies with ζ only (response sets tempo, not peak)' legend wraps to four lines beside the '0.05 lattice' label. The chart has no phone layout.

**UIA-KF-321 · LOW · The Share flow leaves the @mbabb dropdown open behind the confirmation toast; the info fallback asks the user to copy from an address bar they may not see** [C]
- *Page · state:* toasts · success, info — finding `to#10`
- *Frame:* toasts/sim-01-success-link-copied-1440-light.png; sim-05-info-1440-light.png (menu still open with Share / Dark mode / Keyboard shortcuts / Clear all while the toast fires)
- *Observed:* After Copy share link, the popover closes but the whole dropdown menu stays open over the scene. The clipboard-refused fallback router.replace()s the URL and tells the user to copy from the address bar, which is hidden on an installed PWA or a mobile browser with a collapsed URL bar.
- *Expected:* The action completes and dismisses its menu chain. The fallback offers a selectable read-only field or a retry, not a pointer to browser chrome.
- *Owner:* CONSUMER — demo/components/instrument/shell/useShareState.ts:30-39 (closes only sharePopoverOpen; the parent menu stays open) + SharePopover.vue — success 'Link copied to clipboard!' and info 'URL updated — copy from address bar' · 1440 + 390
- *Fix:* Close the parent menu on share success and fallback. Replace the info fallback with the share field pre-filled and selected (share-popover seat to confirm).

**UIA-KF-322 · LOW · glass-ui DESIGN.md toast motion rows are stale against Toast.vue** [M]
- *Page · state:* toasts — finding `tom0`
- *Owner:* GLASS — glass-ui/DESIGN.md:78 (--spring-bouncy 'toast arrival') and :1493 ('pop' scale+opacity, --spring-bouncy, 'Badge / toast entrance') vs src/components/toast/Toast.vue (data-reveal=overlay, glass-reveal on the overlay clock, glass-vaporize exit, F20 'no bespoke transient fork')
- *Fix:* Route to the glass-ui session: update both DESIGN.md rows so the toast rides the overlay reveal register. Re-cite the consumer BROKEN finding's 'expected' clause against Toast.vue rather than DESIGN.md:78.


## Appendix A: finding → row index

Every audit finding and confirm-seat miss, and the row that carries it. Folded findings keep their evidence under the page folder.

- **home-hero** (`hh`): hh#0→004 · hh#1→005 · hh#2→065 · hh#3→066 · hh#4→052 · hh#5→050 · hh#6→032 · hh#7→119 · hh#8→120 · hh#9→121 · hh#10→122 · hh#11→229 · hh#12→230 · hh#13→052 · hh#14→227 · hhm0→048 · hhm1→123 · hhm2→032 · hhm3→105 · hhm4→227
- **scene-loading-skeleton** (`sk`): sk#0→067 · sk#1→068 · sk#2→124 · sk#3→125 · sk#4→048 · sk#5→231 · sk#6→005 · sk#7→232 · sk#8→227 · skm0→233 · skm1→234 · skm2→235 · skm3→note
- **top-dock** (`td`): td#0→050 · td#1→126 · td#2→109 · td#3→127 · td#4→113 · td#5→128 · td#6→236 · td#7→237 · td#8→238 · td#9→103 · td#10→108 · td#11→239 · tdm0→129 · tdm1→240 · tdm2→241 · tdm3→048
- **dock-scene-select** (`dss`): dss#0→069 · dss#1→130 · dss#2→223 · dss#3→131 · dss#4→132 · dss#5→242 · dss#6→108 · dss#7→243 · dss#8→227 · dss#9→REFUTED · dssm0→049 · dssm1→112 · dssm2→note
- **dock-controls-tab-select** (`dct`): dct#0→044 · dct#1→046 · dct#2→103 · dct#3→133 · dct#4→108 · dct#5→112 · dct#6→063 · dct#7→223 · dct#8→244 · dct#9→005 · dctm0→046 · dctm1→134 · dctm2→245 · dctm3→105
- **mbabb-menu** (`mm`): mm#0→017 · mm#1→056 · mm#2→060 · mm#3→113 · mm#4→135 · mm#5→223 · mm#6→136 · mm#7→137 · mm#8→138 · mm#9→246 · mm#10→139 · mm#11→247 · mm#12→109 · mmm0→248 · mmm1→056 · mmm2→113 · mmm3→note · mmm4→note
- **share-popover** (`sp`): sp#0→001 · sp#1→003 · sp#2→002 · sp#3→070 · sp#4→025 · sp#5→056 · sp#6→071 · sp#7→140 · sp#8→141 · sp#9→142 · sp#10→059 · sp#11→143 · sp#12→144 · sp#13→224 · spm0→note · spm1→002 · spm2→249 · spm3→001 · spm4→001
- **keyboard-shortcuts-modal** (`ksm`): ksm#0→016 · ksm#1→014 · ksm#2→072 · ksm#3→073 · ksm#4→145 · ksm#5→146 · ksm#6→057 · ksm#7→147 · ksm#8→250 · ksm#9→251 · ksmm0→014 · ksmm1→058
- **clear-all-confirm-dialog** (`cac`): cac#0→014 · cac#1→057 · cac#2→057 · cac#3→025 · cac#4→074 · cac#5→060 · cac#6→148 · cac#7→118 · cac#8→149 · cac#9→058 · cac#10→252 · cac#11→253 · cacm0→118 · cacm1→060 · cacm2→014 · cacm3→note · cacm4→254 · cacm5→255
- **transport-dock** (`trd`): trd#0→018 · trd#1→005 · trd#2→032 · trd#3→075 · trd#4→051 · trd#5→052 · trd#6→150 · trd#7→151 · trd#8→152 · trd#9→153 · trd#10→154 · trd#11→256 · trd#12→223 · trd#13→257 · trd#14→052 · trdm0→155 · trdm1→225 · trdm2→258 · trdm3→156
- **cube-scene** (`cu`): cu#0→027 · cu#1→063 · cu#2→047 · cu#3→053 · cu#4→076 · cu#5→005 · cu#6→051 · cu#7→157 · cu#8→158 · cu#9→159 · cu#10→160 · cu#11→055 · cu#12→259 · cu#13→260 · cu#14→261 · cu#15→262 · cu#16→104 · cu#17→227 · cum0→032 · cum1→263 · cum2→114 · cum3→note
- **cube-matrix-controls-tab** (`cm`): cm#0→028 · cm#1→005 · cm#2→047 · cm#3→063 · cm#4→077 · cm#5→161 · cm#6→104 · cm#7→106 · cm#8→047 · cm#9→053 · cm#10→063 · cm#11→264 · cm#12→265 · cm#13→266 · cmm0→063 · cmm1→162 · cmm2→047 · cmm3→102 · cmm4→267
- **controls-tab-channel-options** (`co`): co#0→015 · co#1→006 · co#2→013 · co#3→078 · co#4→035 · co#5→044 · co#6→163 · co#7→164 · co#8→115 · co#9→051 · co#10→165 · co#11→166 · co#12→167 · co#13→223 · co#14→268 · co#15→226 · co#16→052 · co#17→269 · co#18→270 · com0→106 · com1→106 · com2→226 · com3→108 · com4→222
- **controls-timing-function-detail** (`tf`): tf#0→035 · tf#1→036 · tf#2→025 · tf#3→079 · tf#4→080 · tf#5→062 · tf#6→102 · tf#7→116 · tf#8→168 · tf#9→062 · tf#10→271 · tf#11→227 · tfm0→117 · tfm1→115 · tfm2→272 · tfm3→062
- **controls-advanced-layer** (`adv`): adv#0→006 · adv#1→005 · adv#2→081 · adv#3→025 · adv#4→082 · adv#5→169 · adv#6→170 · adv#7→111 · adv#8→106 · adv#9→171 · adv#10→048 · adv#11→273 · adv#12→222 · adv#13→223 · advm0→105 · advm1→006 · advm2→222
- **keyframes-tab-css-editor** (`kce`): kce#0→011 · kce#1→001 · kce#2→012 · kce#3→007 · kce#4→006 · kce#5→008 · kce#6→055 · kce#7→172 · kce#8→173 · kce#9→174 · kce#10→175 · kce#11→274 · kce#12→176 · kce#13→275 · kce#14→117 · kcem0→177 · kcem1→106 · kcem2→116 · kcem3→276 · kcem4→277
- **timeline-tab** (`tl`): tl#0→019 · tl#1→006 · tl#2→022 · tl#3→083 · tl#4→045 · tl#5→008 · tl#6→054 · tl#7→178 · tl#8→179 · tl#9→180 · tl#10→181 · tl#11→182 · tl#12→278 · tl#13→279 · tl#14→019 · tl#15→280 · tlm0→046 · tlm1→183 · tlm2→281 · tlm3→039 · tlm4→note
- **timeline-expanded** (`tx`): tx#0→019 · tx#1→020 · tx#2→021 · tx#3→045 · tx#4→084 · tx#5→085 · tx#6→086 · tx#7→061 · tx#8→061 · tx#9→184 · tx#10→006 · tx#11→185 · tx#12→186 · tx#13→282 · tx#14→283 · txm0→187 · txm1→188 · txm2→284
- **css-paste-dialog** (`cpd`): cpd#0→001 · cpd#1→043 · cpd#2→006 · cpd#3→044 · cpd#4→087 · cpd#5→054 · cpd#6→189 · cpd#7→190 · cpd#8→191 · cpd#9→057 · cpd#10→058 · cpd#11→192 · cpd#12→193 · cpd#13→285 · cpd#14→286 · cpd#15→287 · cpd#16→288 · cpdm0→040 · cpdm1→043 · cpdm2→289 · cpdm3→note · cpdm4→290
- **amiga-scene** (`am`): am#0→023 · am#1→010 · am#2→009 · am#3→023 · am#4→024 · am#5→032 · am#6→005 · am#7→053 · am#8→194 · am#9→195 · am#10→196 · am#11→051 · am#12→197 · am#13→198 · am#14→114 · am#15→055 · am#16→109 · am#17→291 · am#18→111 · am#19→227 · amm0→105 · amm1→048 · amm2→055 · amm3→226
- **square-scene** (`sq`): sq#0→024 · sq#1→026 · sq#2→009 · sq#3→088 · sq#4→089 · sq#5→064 · sq#6→090 · sq#7→199 · sq#8→051 · sq#9→032 · sq#10→292 · sq#11→293 · sq#12→294 · sqm0→200 · sqm1→055 · sqm2→295 · sqm3→296 · sqm4→201
- **easing-scene-specimens** (`es`): es#0→033 · es#1→034 · es#2→046 · es#3→009 · es#4→008 · es#5→006 · es#6→035 · es#7→091 · es#8→202 · es#9→054 · es#10→106 · es#11→053 · es#12→297 · es#13→298 · es#14→299 · es#15→300 · es#16→008 · esm0→092 · esm1→034 · esm2→225 · esm3→301 · esm4→302
- **easing-curve-tab** (`ec`): ec#0→008 · ec#1→009 · ec#2→006 · ec#3→035 · ec#4→093 · ec#5→054 · ec#6→106 · ec#7→303 · ec#8→062 · ec#9→102 · ec#10→116 · ec#11→304 · ec#12→062 · ec#13→062 · ec#14→226 · ecm0→046 · ecm1→051 · ecm2→203 · ecm3→note · ecm4→007
- **spring-scene-solver** (`ss`): ss#0→007 · ss#1→006 · ss#2→044 · ss#3→046 · ss#4→008 · ss#5→094 · ss#6→204 · ss#7→051 · ss#8→107 · ss#9→110 · ss#10→228 · ss#11→040 · ss#12→305 · ss#13→306 · ss#14→005 · ss#15→032 · ssm0→106 · ssm1→226 · ssm2→307 · ssm3→note
- **spring-physics-tab** (`spt`): spt#0→008 · spt#1→044 · spt#2→046 · spt#3→039 · spt#4→040 · spt#5→041 · spt#6→042 · spt#7→095 · spt#8→005 · spt#9→107 · spt#10→054 · spt#11→110 · spt#12→205 · spt#13→110 · spt#14→102 · spt#15→206 · spt#16→008 · spt#17→011 · spt#18→308 · spt#19→106 · spt#20→057 · spt#21→228 · spt#22→309 · sptm0→101 · sptm1→051 · sptm2→110 · sptm3→008 · sptm4→310
- **spring-discrete-view** (`sdv`): sdv#0→037 · sdv#1→038 · sdv#2→032 · sdv#3→025 · sdv#4→096 · sdv#5→044 · sdv#6→097 · sdv#7→051 · sdv#8→207 · sdv#9→208 · sdv#10→209 · sdv#11→046 · sdv#12→101 · sdv#13→005 · sdv#14→REFUTED · sdvm0→106 · sdvm1→110 · sdvm2→049 · sdvm3→311 · sdvm4→112
- **sequence-scene** (`seq`): seq#0→029 · seq#1→030 · seq#2→031 · seq#3→032 · seq#4→098 · seq#5→099 · seq#6→210 · seq#7→211 · seq#8→212 · seq#9→213 · seq#10→214 · seq#11→215 · seq#12→064 · seq#13→312 · seq#14→313 · seq#15→314 · seq#16→224 · seq#17→315 · seqm0→032 · seqm1→316 · seqm2→317 · seqm3→032 · seqm4→note
- **mobile-controls-drawer** (`mcd`): mcd#0→006 · mcd#1→005 · mcd#2→044 · mcd#3→008 · mcd#4→046 · mcd#5→216 · mcd#6→006 · mcd#7→217 · mcd#8→117 · mcd#9→055 · mcd#10→106 · mcd#11→318 · mcd#12→319 · mcdm0→032 · mcdm1→005 · mcdm2→note · mcdm3→320 · mcdm4→006
- **toasts** (`to`): to#0→001 · to#1→059 · to#2→100 · to#3→059 · to#4→218 · to#5→001 · to#6→219 · to#7→220 · to#8→039 · to#9→221 · to#10→321 · tom0→322 · tom1→001 · tom2→001 · tom3→039

## Appendix B: REFUTED

- **dock-scene-select `dss#9` · filed LOW/CONSUMER — ChromeDock.vue:455 and :504 (`<SelectGroup class= · Dock mobile font-size step (`dock-label`) leaks into the portalled listbox** — The rows carry their own `text-dropdown` class, which resolves as `font-size: var(--dropdown-text)` → `--control-text` → `calc(var(--type-small) * var(--ui-scale))`. With `--type-small: clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` that gives exactly 14px at 390 and 16.4px at 1440, matching capture-log items[].font. So the step is the producer's own fluid rung. The `.dock-label` rule (style.css:367-371) would set var(--type-body), which is at least 16px and never 14px, and it is set on the SelectGroup, where the rows' own font-size overrides it. The class on the SelectGroups (ChromeDock.vue:459 and the Controls twin) is inert hygiene, not a leak. The real 390 mismatch, a 16px trigger over 14px rows, comes from `dock-label` on the TRIGGER.
- **spring-discrete-view `sdv#14` · filed LOW/GLASS DockSelectTrigger (dock-select-trigger) — dock skin; D · The dock's channel Select trigger is a stadium outline nested inside the stadium dock (pill-in-pill)** — The outline is not rest chrome. 00-solver-before-flip-1440-light ('Sweep') and 02-entry-visible-rest-1440-dark ('Entry') both show a FLAT trigger with no outline inside the dock. The ring appears only in the open state (01-select-open) or when focus has been returned to the trigger after a selection (02c-light, 30a-dark). That is glass 7.0.0's .focus-ring box-shadow stadium, i.e. the four-state focus indicator (DESIGN.md:13), not a second boundary. At most a nit remains: a ring showing after a pointer selection. It changes with the 10.x outline-based focus ring.

Refuted sub-claims inside CONFIRMED or AMENDED findings (the finding stands; these parts do not):
- scene-loading-skeleton `sk#4`: "the band is invisible in light theme" (11-prm-fallback-1440-light shows it; frame 01 caught off-box dead time) and "under reduced motion nothing signals loading" (a frozen stripe paints instead).
- scene-loading-skeleton `sk#2`: "no scene uses the card plate" (4 of 6 scenes stand on glass Card; cube and amiga do not). Severity HIGH→MEDIUM.
- cube-scene `cu#12`: "the subject is the smallest thing on the page" (downgraded to LOW).
- cube-scene `cu#13`: "the missing thumb is a token failure" (the invisible thumb is glass canon, slider/styles.css:144-151).
- controls-advanced-layer: "the enabled switch is live" on multi-target scenes (it is disabled; the defect is the missing reason).
- timeline-tab `tl#1` at 390: the "overflow-hidden" mechanism (the cause is the unbounded pane; see row 006).
- amiga-scene `cm#12`/amiga translate bounds: transience of the off-stage cube (the bound, not the transience, is the defect).
- amiga-scene `am#3`: pause-freeze severity HIGH→MEDIUM (contract/doc contradiction), folded into row 023.
- easing-scene-specimens `es#8`: ribbon ball linear severity HIGH→MEDIUM.
- top-dock `td#0`: "the glass fix is unreleased" (it shipped in v9.0.0 and v10.0.1).
- transport-dock `trd#0`: "glass should measure the collapsed layer" (it already does, dist/dock.js:476).

## Appendix C: evidence notes (INFO / NOTE / audit-hygiene items, not defects)

- scene-loading-skeleton `skm3` · Confirm-time tree drift — keyframes.js HEAD moved 60477b06 → 6d5b4288 (commits 531aa3f1, 6d5b4288 touch only ChromeDock.vue and scenes.ts). glass-ui HEAD is now 6433284a with dirty 3. The files carrying the findings are unchanged, so no finding is invalidated. The live scene-icon miniature in the dock chip (6d5b4288) was not captured in these frames.
- dock-scene-select `dssm2` · The capture sha is stale against the live tree; a re-capture is owed before routing — Frames are at keyframes 60477b06 and glass 79c3601b. Live now: keyframes 6d5b4288 (OA-32 living scene miniatures, ChromeDock line shifts of about +4) and glass 6433284a.
- mbabb-menu `mmm3` · The Dark mode fix does not need a producer change: glass exports useGlobalDark/toggleDark on the @mkbabb/glass-ui/dark subpath — MbabbMenu.vue:73-75 defers Dark mode to a producer menu-item form (O-61 R-3). The consumer can make the row a CheckboxItem bound to isDark now.
- mbabb-menu `mmm4` · The evidence was captured at 60477b06, but MbabbMenu.vue and SharePopover.vue now have uncommitted in-flight edits (d4) at HEAD 6d5b4288 — Re-run probe-keyboard.mjs after d4 commits before the Share half of finding 1 and all of finding 2 are routed.
- share-popover `spm0` · Tree drift during the audit: d4 ESC-d-3 is rewiring the Share row live — HEAD is 6d5b4288 (dirty 5). Row select now opens the popover via the exposed open model. Keyboard reachability improves, but the nested-Popover occlusion and the menu-stays-open issues are not addressed. Re-capture after the commit lands.
- clear-all-confirm-dialog `cacm3` · Harness evidence gap: the scrim was never measured — capture-log 'overlay' = cls 'grid-background pointer-events-none fixed inset-0', bg transparent, backdrop none
- cube-scene `cum3` · Tree drift since the audit — keyframes.js is now at 6d5b4288 (dirty 5), and 6d5b4288 changes the top-dock scene icon to a live miniature and moves the cube data to cubeMotion.ts. glass-ui is now at 6433284a (dirty 3), not fe5df357. The findings remain pinned to 60477b06 frames. Recapture the top-dock and icon frames before routing.
- timeline-tab `tlm4` · Evidence gap: cited frames 43/44 were never saved — probe-drawer.mjs writes 43-drawer-open-timeline-390-light.png and 44-drawer-drag-up-timeline-390-light.png, but neither exists under timeline-tab/. Finding 2's 'overflow-hidden' claim has no surviving capture and is contradicted by capture-log-390.json.
- css-paste-dialog `cpdm3` · The capture harness never emulates touch, so the 390 passes measure the fine-pointer ladder — Every 390 control, font and hit-size measurement (field font, button heights, close target) reflects --ui-scale 1 and not the coarse 1.5 a phone gets. Re-run the 390 set with hasTouch:true, isMobile:true before relaying the numbers to glass.
- easing-curve-tab `ecm3` · Frame caveat: 10-duration-focus-390-dark still shows steps mode — The steps(4, jump-end) state carried over from frame 09, so this frame does not show the rest-state duration focus it is named for. Findings 3 and 7 still hold, but a clean rest-state 390 duration capture would make the evidence stronger.
- spring-scene-solver `ssm3` · Evidence hygiene: frames 07-10c are not user-reachable states — scrollIntoView through the overflow:hidden shell shifted the whole layout, so the top chrome dock overlays the stage card's linear() trace. That overlap is an artifact of the capture method and must not be filed.
- sequence-scene `seqm4` · Audit line refs drifted: keyframes HEAD moved 531aa3f1 -> 6d5b4288 during the audit — Commit 6d5b4288 (KF.W13U.d2) touched SequenceTarget.vue, useSequenceDemo.ts and sequenceMotion.ts. The facility is now at about useSequenceDemo.ts:490-505, not :505-515. All findings still reproduce in source at HEAD.
- mobile-controls-drawer `mcdm2` · The Matrix facet is not offered in the tab select, but the audit's 07-cube-tab-matrix frame is labelled as if it were — The audit's own frame list admits Matrix is only offered once the matrix channel is picked. So frame 07 is not a Matrix capture, and there is no evidence yet on how the Matrix surface lays out in the drawer. That frame needs a re-capture with the matrix channel selected.

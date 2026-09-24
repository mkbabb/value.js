SERVED MODEL: claude-opus-5-5 (Opus 5.5)

# AUDIT-2-value: value.js component cogency, mobile views, hierarchy and space

| field | value |
|---|---|
| date | 2026-09-24 |
| seat | REGISTER, value.js. It folds three lens seats: value-L1 (component cogency), value-L2 (mobile views) and value-L3 (hierarchy and space). |
| authority | `docs/tranches/X/COHESION.md` §0cq (OA-62, OA-64) and §0cu (OA-69). Spec: `docs/tranches/X/audit/AUDIT-2.md`. |
| trees | value.js `59f0fdce` (dirty; other seats are editing) · glass-ui HEAD `1f2dbb5a` (10.0.1) · installed `@mkbabb/glass-ui` 7.0.0 |
| seat evidence | `docs/tranches/X/audit/audit-2/value-L1/` (import graph `value-l1-reach.txt`) · `audit-2/value-L2/` (`metrics-{v360,v390,v430,l844}.json`, `probe-*.json`, `frames/`) · `audit-2/value-L3/` (`metrics.json`, `metrics-seeded.json`, `frames/`). Frame paths in the rows are relative to the seat folder the row came from. |
| register confirm evidence | `audit-2/value-register/confirm.json` and `audit-2/value-register/frames/` (git-excluded). Measured with headed Chromium on the real GPU, `isMobile` and `hasTouch` set (`pointer: coarse` true). |
| instrument note | The shared dev server on :9000 (pid 24616) still accepted TCP but answered no HTTP request at register time (`curl -m 15` → 000). The register served the same tree read-only on `127.0.0.1:9121`, using the repo's own `vite.config.ts` with a private cache, and API calls were proxied to :3000 with CORS re-stamped. It did not touch the dev.sh stack. The L2 and L3 seats did the same thing on :9102 and :9983. |

## The owner, verbatim (2026-09-24)

> "ensure that we're not duplicating any component in any view, too: KISS, DRY. Audit our component structure for cogency in every project." … "Audit every mobile view for every mobile app view for all projects, too." … "All issues should be fixed at the glass-ui root, too." … "Ensure proper design hierarchy and usage of space in all UIs hereof"

## Totals

44 rows. No two rows describe the same defect, so no seat row was merged away. Rows that touch each other carry a cross-reference instead. All ids are kept as the seats minted them.

| lens | BROKEN | HIGH | MEDIUM | LOW | total |
|---|---|---|---|---|---|
| L1 component cogency | 0 | 2 | 10 | 12 | 24 |
| L2 mobile views | 1 | 3 | 6 | 2 | 12 |
| L3 hierarchy and space | 0 | 1 | 6 | 1 | 8 |
| **all** | **1** | **6** | **22** | **15** | **44** |

Owner split: CONSUMER 31 · GLASS 4 · GLASS+CONSUMER 9.

Routing:
- CONSUMER parts go to **X-W12**, or its successor. That is 40 rows: every CONSUMER and GLASS+CONSUMER row, plus the consumer adoption step of GLASS rows L2-3 and L3-3.
- GLASS parts go to **the AUDIT-2 glass letter (BL)**. That is 13 rows: L1-2, L1-6, L1-7, L2-1, L2-3, L2-6, L2-7, L2-9, L2-12, L3-1, L3-2, L3-3 and L3-6.
- A glass row marked cured-at-HEAD is adopted through the consumer repin (I-30), then re-measured.

## Confirm ledger: the BROKEN and HIGH rows, re-read by the register

The seats filed 2 BROKEN and 7 HIGH rows. The register re-opened every file:line and re-measured every served claim. Outcome: 1 BROKEN and 6 HIGH confirmed, 1 BROKEN downgraded, 1 HIGH's glass half re-stated.

| id | seat severity | register verdict | what the register saw |
|---|---|---|---|
| A2-VA-L1-1 | HIGH | **CONFIRMED** | The wrapper → `Card tier=resting` → `.pane-scroll-fade` → PaneHeader recipe is present, typed by hand, in ExtractPane.vue:2-7 and NotFoundPane.vue:3-8. BrowsePane.vue:2, PalettesPane.vue:2 and AdminPane.vue:2 drop the wrapper. ConfigSliderPane.vue:105-113 puts the scroller one level in. AboutPane.vue:19 uses `FadingScroll`. PaneErrorPlate.vue:3 and PaneLoadingPlate.vue:3 repeat the wrapper. The gutter string `pb-4 px-4 sm:px-6 pt-2` occurs in 4 `.vue` files. No `shell/PaneShell.vue` exists. |
| A2-VA-L1-2 | HIGH | **CONFIRMED, glass half AMENDED** | Both consumer copies are present: PaneHeader.vue (237 lines; :170 "until P3's ScrollCardHeader knobs land (BOOKED)") and useHeaderCondense.ts (138 lines; :3-15 "the REFERENCE implementation a producer real-box-shrink door later absorbs"). Amendment: **glass HEAD 10.0.1 already ships the real-box discrete condense**. CardHeader.vue:19-70 has a hysteresis condense at 20/12 with a `hasRoomToCondense` sufficiency gate. card/scroll.css:96-105 flips `padding-block-start` and title `font-size` under `[data-condensed="true"]`, with a compositor scale glide on top. Installed 7.0.0 has the `shrink` prop but not the real-box rules. So the glass door is **cured-at-HEAD** and is adopted through I-30. The PaneHeader scroll veil is still open at glass. The consumer retirement of both copies stays HIGH. |
| A2-VA-L2-1 | BROKEN | **CONFIRMED** | Re-measured at 844x390 dark on /browse. The Filters trigger is at y 226.9, h 44. The popover is at y **−247.5**, h 470.1 (bottom 222.6), with computed `max-height: none`. Frame `value-register/frames/l2-1-l844-dark-filter.jpg`. At glass HEAD, overlay-plate.css clamps the `menu` and `tooltip` reveal roles to `--reka-popper-available-height` (:72-79, :106-122), but the `overlay` role that Popover wears has only an inline-size rule. So the glass half is **open-at-HEAD**. |
| A2-VA-L2-2 | HIGH | **CONFIRMED** | At 390 on /generate, `h1.route-title` "Generate" is at y 104, h 15.6, `position: static`, `z-index: auto`, opacity 1. The canvas is `position: fixed`, `z-index: auto`. Clip frames: `value-register/frames/l2-2-h1-canvas-on.png` shows gradient only and no text; `l2-2-h1-canvas-hidden.png` shows "GENERATE" legible. The source at App.vue:25-35, :75 and :582-592 matches the row. |
| A2-VA-L2-5 | HIGH | **CONFIRMED** | At 360x780, /mix, /blob and /palettes all measure stage y 128 h 535 and inspector y **678** (vh 780). viewSchema.ts pairs `stage: color-picker` with `inspector: mix`, `blob` and `palettes`. Frame `value-register/frames/l2-5-360-palettes-top.jpg`. |
| A2-VA-L2-6 | HIGH | **CONFIRMED** | At 390, coarse pointer: Select view 58.7x33.4, Toggle action bar 33.4x33.4, Menu 42.7x33.4, Regenerate, Save palette and Copy colors 32x32. Glass HEAD `dock/styles/controls/touch-floor.css:41-44` adds the coarse `::after` hit-slop, so this is **cured-at-HEAD** for the triggers. The row overlaps UIA-V-76 (HIGH) and is kept only for the Select view and Menu triggers and the four-viewport scope. |
| A2-VA-L2-7 | BROKEN | **DOWNGRADED to LOW (folded into UIA-V-10)** | The clip reproduces exactly: at 360 the dock is x 36–324 and "Open color input" is x 296.9–343.7. "Wholly unreachable" does not reproduce. 27.1px of the toggle is visible, and `elementFromPoint` at the visible centre returns the toggle. The layer is `overflow-x: auto` (scrollWidth 357, clientWidth 266), so the user can also scroll it into view. This is the same defect UIA-V-10 and UIA-V-8 already carry at BROKEN (390). It is kept here only as a 360 re-measure and is not counted a second time. Frame `value-register/frames/l2-7-360-actionbar.jpg`. |
| A2-VA-L3-1 | HIGH | **CONFIRMED** | Served at 390: /nope/xyz title "Not Found" is 25.888px/400 and the plate headline is 25.888px/**700**. The L3 seat's `metrics.json` shows the same pair for browse-390-light ("Browse" 25.888/400 against "No palettes published yet." 25.888/700). Source: EmptyState.vue:9 and :48 (`font-display text-heading`), and glass HEAD `typography/scale.css:122` `--type-display-1: clamp(1.618rem, …)` = the `--type-heading` floor at :120. Note that the prior register rated the admin-only instances LOW (UIA-V-632, UIA-V-638, UIA-V-647). The seat's HIGH rests on the 11-view scope and the glass root. The row reproduces, so the register keeps HIGH. |

Side observation, not rowed: on the register's served run, hash-navigating to `/admin/tags` rendered the Not Found pane at 390. The L3 seat framed a token-refused admin plate there. The register did not seed an admin token, so this may be the guard for an unauthenticated visitor. It is left for the X-W12 admin unit to confirm.

---

## Lens 1: component cogency

#### A2-VA-L1-1 · HIGH · CONSUMER → X-W12 · every pane route (/, /palettes, /browse, /extract, /mix, /generate, /gradient, /atmosphere, /blob, /admin/*, not-found, About)
- **Finding:** The pane shell is copied by hand into 11 panes, and the copies have drifted into three scroll mechanisms. The copied shell is a wrapper div, then `Card tier=resting`, then PaneHeader, then a body gutter. Most panes use the local `.pane-scroll-fade` class, About uses glass FadingScroll, and ConfigSliderPane uses an inner scroller. Browse, Admin and Palettes also drop the wrapper div. There is no single pane-shell component.
- **Evidence:**
  - demo/workbenches/extract/ExtractPane.vue:2-7; generate/GeneratePane.vue:32-38; gradient/GradientPane.vue:42-48; mix/MixPane.vue:66-67; demo/scenes/notfound/NotFoundPane.vue:3-6
  - demo/scenes/ConfigSliderPane.vue:105-113 (inner scroller); demo/scenes/about/AboutPane.vue:19-22 (FadingScroll)
  - demo/palettes/BrowsePane.vue:2, PalettesPane.vue:2, admin/AdminPane.vue:2 (no wrapper)
  - the body gutter `pb-4 px-4 sm:px-6 pt-2` at 4 sites; demo/shell/PaneErrorPlate.vue:3 and PaneLoadingPlate.vue:3 repeat the wrapper
  - The register re-read all of these.
- **Cause:** Each pane was authored standalone. PaneHeader holds the scroll-fade CSS (shared/ui/PaneHeader.vue:56-67), but the host element it needs is re-typed in every pane.
- **Cure:** Add one `shell/PaneShell.vue`: the wrapper, `Card tier=resting`, one scroll owner (glass FadingScroll or `.card-scroll-host`), a PaneHeader slot and a body gutter slot. Port all 11 panes to it and retire the per-pane class strings. The per-pane height-bound defects are then fixed in one place.
- **Covered by:** Symptoms only: UIA-V-64, UIA-V-138, UIA-V-161, UIA-V-429. The structural duplication is not rowed. Cross-reference A2-VA-L3-5: the row contract belongs inside this shell.

#### A2-VA-L1-2 · HIGH · GLASS+CONSUMER → glass letter (cured-at-HEAD, adopt via I-30; veil open) + X-W12 · / (picker header) and every pane header
- **Finding:** Two local implementations do the scroll-condensing card header, and glass ships a third. PaneHeader.vue (237 lines, a scroll veil plus a title-scale scrub) serves the panes. The picker uses glass CardHeader driven by a local useHeaderCondense.ts (138 lines) plus picker/header.css. Both local copies say they exist because glass has no real-box condense.
- **Evidence:**
  - demo/shared/ui/PaneHeader.vue:1-60, :160-180 ("until P3's ScrollCardHeader knobs land (BOOKED)")
  - demo/picker/composables/useHeaderCondense.ts:3-15; demo/picker/ColorPicker.vue:28-33
  - glass-ui/src/components/card/CardHeader.vue:3-70; card/scroll.css:96-105
- **Register amendment:** Glass HEAD 10.0.1 already has the real-box discrete condense: a hysteresis threshold with a sufficiency gate, and a `padding-block-start` plus `font-size` flip under `[data-condensed]`. Installed 7.0.0 does not. So the glass ask shrinks to two things: adopt HEAD through the repin, and absorb the PaneHeader veil (still open).
- **Cause:** At 7.0.0, glass CardHeader shrink could not shrink the layout box, so the consumer forked twice, once per header family.
- **Cure:**
  - GLASS: publish the HEAD condense (cured) and absorb the PaneHeader veil (open).
  - CONSUMER, after I-30: retire useHeaderCondense.ts, the condense rules in header.css and PaneHeader's scrub, so the picker and the panes use one `<CardHeader shrink>` inside `.card-scroll-host`.
- **Covered by:** Partial: UIA-V-3 (condense inverted at 1440 and 390). The duplication is not rowed.

#### A2-VA-L1-3 · MEDIUM · CONSUMER → X-W12 · /gradient and /mix
- **Finding:** The interpolation-space and hue-method Select pair is authored twice, and the copies disagree. Gradient labels them "Space"/"Hue" with text-only descriptions. Mix labels them "Color space"/"Hue method" with PreviewRamp specimens. Both read the same INTERPOLATION_SPACES and HUE_INTERPOLATION_METHODS catalogue.
- **Evidence:** demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:193-257; demo/workbenches/mix/MixConfigBar.vue:106-147 (PreviewRamp :119, :140); demo/color-session/color-space-meta.ts:47-66.
- **Cause:** The data was deduped into color-space-meta.ts at S.W5-6, but the control that renders it was never extracted.
- **Cure:** Extract `color-session/InterpolationFields.vue`: LabeledField and two Selects, with PreviewRamp specimens and one label vocabulary. Gradient and Mix both consume it.
- **Covered by:** none (UIA-V-137 covers only Mix's label registers).

#### A2-VA-L1-4 · MEDIUM · CONSUMER → X-W12 · /mix and /generate
- **Finding:** The palette specimen (strip, name and count) is hand-typed three times, even though PaletteSpecimen already exists. PaletteSpecimen is props-only and `display: contents`, and the inspector and admin use it. The copies are two inside MixSourceSelector and one in the Generate plate. Their count voices differ: a bare mono number in Mix, a Badge in PaletteSpecimen and Generate.
- **Evidence:** demo/workbenches/mix/MixSourceSelector.vue:240-251 and :324-341; demo/workbenches/generate/GenerateControls.vue:143-170; the shared component is demo/palettes/browser/card/PaletteSpecimen.vue:1-80, used at PaletteInspector.vue:31 and AdminUsersPanel.vue:197.
- **Cause:** The hosts reach for PaletteColorStrip and re-type the head, instead of using the specimen.
- **Cure:** Render PaletteSpecimen in both Mix rows. Give it an editable-name slot (see L1-14) so the Generate plate can host it too. Delete the hand-typed heads.
- **Covered by:** Partial: UIA-V-320, UIA-V-362.

#### A2-VA-L1-5 · MEDIUM · CONSUMER → X-W12 · /mix
- **Finding:** One view lists the same saved-palette collection twice:
  - the Colors tab's "From palettes" collapsible, where swatches add single colours
  - the Palettes tab, where rows select whole palettes

  That is two lists, two row recipes and two empty states for one collection in one pane.
- **Evidence:** demo/workbenches/mix/MixSourceSelector.vue:224-277, :280-341.
- **Cause:** Two verbs (add one colour, select a whole palette) were given two lists instead of one list with two verbs.
- **Cure:** Keep one palette list, with each row as a PaletteSpecimen. A row press selects the palette, and a disclosure reveals the swatches for single-colour adds. Delete the second list.
- **Covered by:** none for the duplication. Adjacent rows: UIA-V-40, UIA-V-137, UIA-V-357.

#### A2-VA-L1-6 · MEDIUM · GLASS+CONSUMER → glass letter (open-at-HEAD) + X-W12 · /palettes, /browse, /admin/users, /admin/flagged, /admin/names, /admin/tags (also fourier gallery and admin)
- **Finding:** Six destructive confirm dialogs repeat the same recipe of about 20 lines: Dialog, `DialogContent surface=glass :show-close=false`, Header, Title and Description, then a Footer with a text Cancel and a `tone=destructive` commit. Fourier repeats it twice. Glass has no confirm composite, so the pending state, verdict and focus return drift between copies.
- **Evidence:** demo/palettes/PalettesPane.vue:127-146; BrowsePane.vue:185; browser/admin/AdminUsersPanel.vue:235; AdminFlaggedPanel.vue:183-201; AdminNamesPanel.vue:148; AdminTagsPanel.vue:168; fourier-analysis/web/src/components/visualization/GalleryView.vue:493 and gallery/AdminUserList.vue:788. glass-ui/src/components/dialog/ has no confirm composite (checked at HEAD `1f2dbb5a`).
- **Cause:** Glass ships only the dialog parts. The confirm-destroy composite is a cross-app job with no owner.
- **Cure:** GLASS: add a ConfirmDialog composite with title, description, cancel, a destructive commit with a pending state, and focus return. CONSUMER: port the six value sites (and fourier's) to it. Make no local copy in the interim.
- **Covered by:** Adjacent only: UIA-V-104, UIA-V-327, UIA-V-331, UIA-V-338.

#### A2-VA-L1-7 · MEDIUM · GLASS+CONSUMER → glass letter (open-at-HEAD) + X-W12 · dock (all routes), all three apps
- **Finding:** Each of the three apps hand-authors its own @mbabb attribution menu. value.js also authors it twice internally, as desktop and mobile twins.
- **Evidence:** demo/shell/dock/menus/ProfileSection.vue:152+ and MobileMenuDropdown.vue:43+; keyframes.js/demo/app/dock/MbabbMenu.vue:1-40; fourier-analysis/web/src/components/layout/AppDock.vue:95-111. glass-ui/src/components/dock has no attribution menu.
- **Cause:** A cross-app chrome surface with no producer owner.
- **Cure:** GLASS: add a dock attribution menu: a `DockTrigger for=dropdown` plus the standard rows, with the repo URL and extra rows as props or slots. Retire all four consumer copies.
- **Covered by:** Partial: UIA-V-270, UIA-V-264.

#### A2-VA-L1-8 · MEDIUM · CONSUMER → X-W12 · app-wide (import graph)
- **Finding:** The same glass primitives are imported two ways. One way is 19 `demo/ui/*/index.ts` one-line re-export shims, a vestigial shadcn layer. The other is direct `@mkbabb/glass-ui/<subpath>` imports. Dialog, Select and Badge each come through both paths. `ui/label` and `ui/switch` have zero importers.
- **Evidence:** Dialog through ui/dialog at FlagReportDialog.vue:64, VersionHistoryDrawer.vue:114 and MigratePalettesDialog.vue:52, versus through glass-ui/dialog at BrowsePane.vue:216, PalettesPane.vue:172 and four admin panels. Select through ui/select ×5, versus glass-ui/select at ColorSpaceSelector.vue:147. Badge through ui/badge ×7, versus glass-ui/badge at ImageDropZone.vue:65. demo/ui/alert/index.ts:1-9. Seat file `value-L1/value-l1-reach.txt`.
- **Cause:** The shadcn barrels became pass-throughs when glass took over, and were never removed.
- **Cure:** Delete `demo/ui/` and import glass subpaths directly everywhere, one grammar (the owner's no-compat-shim rule).
- **Covered by:** none.

#### A2-VA-L1-9 · MEDIUM · CONSUMER → X-W12 · dock band and /palettes (Current Palette)
- **Finding:** The API-status chip is hand-rolled twice, as DockStatusLamp (with status-lamp.ts) and as ApiOfflineChip. Each is a dot, a small-caps Fira label and a pill hairline, and both render the "misconfigured" state. Glass 7 ships StatusDot and Chip for exactly this mark.
- **Evidence:** demo/shell/dock/DockStatusLamp.vue:11-19, :38-60; demo/palettes/browser/status/ApiOfflineChip.vue:9-23, :41-80; CurrentPaletteEditor.vue:127; glass-ui/src/components/status-dot/README.md.
- **Cause:** The second seat copied the first chip's CSS instead of sharing a component, and neither used glass StatusDot.
- **Cure:** Keep one status component that composes glass StatusDot and a Chip label, and render it from both seats. Say "misconfigured" in one place only (the dock lamp).
- **Covered by:** Partial: UIA-V-274.

#### A2-VA-L1-10 · MEDIUM · CONSUMER → X-W12 · shell (every route)
- **Finding:** usePaneRouter.ts is a 1071-line god module whose responsibilities are inverted. It holds the lazy pane registry, region resolution and per-pane prop builders, and also the whole scene-action catalogue for five features. Meanwhile App.vue holds the scene-target folding that the router consumes.
- **Evidence:** demo/shell/usePaneRouter.ts:317-332 (the registry), :609-705 (props and regions), :789, :842, :879, :912, :956-1022 (the action builders); demo/color-picker/App.vue:343-480.
- **Cause:** Each feature's verbs were added to the shell router instead of to the feature.
- **Cure:** Give each feature its own `sceneActions.ts` (generate, gradient, mix, picker, palettes). usePaneRouter keeps only region resolution and imports the builders. Move the scene-target folding out of App.vue into the shell.
- **Covered by:** none structurally (UIA-V-142 and UIA-V-109 cite its lines for duplicated verbs).

#### A2-VA-L1-11 · MEDIUM · CONSUMER → X-W12 · /gradient
- **Finding:** GradientStopEditor.vue is a 1099-line god component doing two jobs:
  - the stop rail: drag, keyboard grab and caret, crowding lanes and the click-to-add ghost
  - the stop inspector: position field, Remove and the refusal notice

  It also carries 337 lines of scoped CSS.
- **Evidence:** demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue:1-567 (script), :569-760 (template; the inspector is at about :700-757), :762-1099 (style).
- **Cause:** The inspector grew inside the rail component.
- **Cure:** Split it into GradientStopRail.vue (rail and gestures) and GradientStopInspector.vue (a glass NumberField row and Remove), with GradientVisualizer composing both.
- **Covered by:** Partial: UIA-V-369, UIA-V-45. Cross-reference A2-VA-L3-7 (the inert inspector rows).

#### A2-VA-L1-12 · MEDIUM · CONSUMER → X-W12 · /admin/users, /gradient, /palettes and /browse (inspector), / (debug)
- **Finding:** The disclosure idiom is re-built four times, while glass Collapsible is used exactly once. The four copies are:
  - a `div role=button aria-expanded` user row
  - a hand-rolled easing accordion
  - the debug header toggle
  - PaletteInspector's expand, driven by a 104-line JS height-morph composable
- **Evidence:** The one glass Collapsible is at MixSourceSelector.vue:224. The hand-rolled copies are at AdminUsersPanel.vue:111-122; GradientEasingEditor.vue:128, :199; PointerDebugOverlay.vue:12; PaletteInspector.vue:98-120, :248 with useHeightTransition.ts:1-104.
- **Cause:** Each seat solved expand and collapse locally.
- **Cure:** Use glass Collapsible (or Accordion for the easing intervals) at all four sites, and delete useHeightTransition.ts.
- **Covered by:** Partial: UIA-V-382.

#### A2-VA-L1-13 · LOW · CONSUMER → X-W12 · /extract (and the /browse skeleton)
- **Finding:** Two components do the palette-ghost job: ShadowPalette and PaletteCardSkeleton, which already has a "developing" variant. ShadowPalette's only render site is Extract's at-rest state.
- **Evidence:** demo/palettes/browser/card/ShadowPalette.vue:1-22; PaletteCardSkeleton.vue:1-30; ExtractWorkbench.vue:198 (and :136).
- **Cure:** Delete ShadowPalette. UIA-V-348 wants no ghost at rest; if one is kept, make it a PaletteCardSkeleton variant.
- **Covered by:** Partial: UIA-V-348.

#### A2-VA-L1-14 · LOW · CONSUMER → X-W12 · /generate, /palettes and /browse inspector rename, dock slug layer
- **Finding:** Inline name editing is built three ways: PaletteRenameInput.vue, a bare `<input>` in the Generate plate, and a bare `<input>` in the slug layer.
- **Evidence:** PaletteRenameInput.vue:11; GenerateControls.vue:158-163; demo/shell/dock/layers/SlugEditLayer.vue:90.
- **Cure:** Generalise PaletteRenameInput (on glass Input) and use it for the Generate plate. The slug field adopts the glass SearchBar or Input idiom, per UIA-V-249.
- **Covered by:** Partial: UIA-V-600, UIA-V-246, UIA-V-99, UIA-V-249. Cross-reference A2-VA-L2-9 (the 30.5px plate-name field).

#### A2-VA-L1-15 · LOW · CONSUMER → X-W12 · /palettes, /browse, /generate, /mix
- **Finding:** A swatch-with-verb control comes in three idioms, each with its own size and pressed state:
  - SwatchHoverMenu
  - a Button+WatercolorDot copy grid in Generate
  - a Button+WatercolorDot add grid in Mix
- **Evidence:** CurrentPaletteEditor.vue:29; PaletteCardSwatches.vue:25; GenerateControls.vue:213-232; MixSourceSelector.vue:255-272.
- **Cure:** Add one `shared/ui/SwatchButton.vue` (glass icon-only Button with a WatercolorDot face, size tokens, and verb, label and feedback props). SwatchHoverMenu composes it as its trigger.
- **Covered by:** Partial: UIA-V-41, UIA-V-43.

#### A2-VA-L1-16 · LOW · CONSUMER → X-W12 · dock, /palettes and /browse swatches
- **Finding:** There are three single-open popup mutexes:
  - usePopupMutex.ts, a local fork of a composable glass retired
  - useHoverPopover.ts, an index mutex
  - an activeHover prop and emit chain that ActionButton threads through GenericActionBar

  ActionButton also builds its tooltip from `Popover trigger=hover`, where the rest of the app uses glass Tooltip.
- **Evidence:** demo/shell/dock/composables/usePopupMutex.ts:1-2; useHoverPopover.ts:1-16; ActionButton.vue:2-8, :59-93; GenericActionBar.vue; glass Tooltip at ConsoleRail.vue:25, ColorInput.vue:31 and CurrentPaletteEditor.vue:83.
- **Cure:** Keep one keyed mutex (usePopupMutex, moved to shared) for all three. Make the ActionButton hint a glass Tooltip, or fold it into DockControl per UIA-V-75.
- **Covered by:** Partial: UIA-V-75, UIA-V-106.

#### A2-VA-L1-17 · LOW · CONSUMER → X-W12 · source tree (palettes, admin, workbenches)
- **Finding:** The directory structure no longer matches responsibility:
  - `palettes/browser/` now holds admin, dialog, slug, status and card, so it is not a "browser"
  - the admin feature is split across four places
  - `PaletteCard/` outlived PaletteCard.vue and houses ActionFeedback (7 importers)
  - the inspector's composables sit under browser/card
  - `palettes/mix.ts` serves only the Mix workbench
  - Vue components sit in color-session/
  - workbenches reach into palettes/browser/card for shared primitives
- **Evidence:** demo/palettes/admin/AdminPane.vue, palettes/browser/admin/*Panel.vue, palettes/useAdmin*.ts, palettes/api/admin-*.ts, palettes/browser/search/UserSortMenu.vue (sole importer AdminPane.vue:96). ActionFeedback importers: AdminUsersPanel.vue:283, AdminFlaggedPanel.vue:219, AdminTagsPanel.vue:205, AdminPane.vue:88, PalettesPane.vue:177, PaletteInspector.vue:156, CurrentPaletteEditor.vue:202. palettes/mix.ts importers: MixConfigBar.vue:23, useMixingState.ts:21. Cross-feature reaches: MixSourceSelector.vue:9, GenerateControls.vue:22, ExtractWorkbench.vue:230.
- **Cure:** Re-home by owner, as pure moves with no API change:
  - `palettes/admin/{AdminPane.vue, panels/, composables/, UserSortMenu.vue}`
  - `palettes/inspector/`
  - `shared/ui/` for ActionFeedback, PaletteSpecimen, PaletteColorStrip and PaletteCardSkeleton
  - move mix.ts to workbenches/mix, and ColorSpaceSelector and color-chips into a UI directory
- **Covered by:** Partial: UIA-V-540.

#### A2-VA-L1-18 · LOW · CONSUMER → X-W12 · source tree (app root)
- **Finding:** The app root (App.vue, main.ts, router, boot composables, index.html) lives in `color-picker/`, while `picker/` is the picker component. keyframes.js names the same root `demo/app/`.
- **Evidence:** demo/color-picker/{App.vue,main.ts,router/,composables/boot/}; demo/picker/ColorPicker.vue; keyframes.js/demo/app/.
- **Cure:** Rename `demo/color-picker/` to `demo/app/`, updating the vite root, the gh-pages build root and imports.
- **Covered by:** none.

#### A2-VA-L1-19 · LOW · CONSUMER → X-W12 · source tree (dead code)
- **Finding:** These are dead:
  - the `palettes/browser/index.ts` barrel: zero importers, re-exporting 18 symbols
  - `palettes/browser/status/index.ts`: reachable only through that barrel
  - `ui/label` and `ui/switch`: zero importers
  - the `.section-subtitle` class: zero uses
- **Evidence:** `value-L1/value-l1-reach.txt`; demo/palettes/browser/index.ts:1-45; demo/styles/utils.css:18-28.
- **Cure:** Delete them. Delete ActionToolbar.vue (UIA-V-503) and PaletteSlugBar.vue (UIA-V-249) in the same pass.
- **Covered by:** siblings UIA-V-503, UIA-V-249.

#### A2-VA-L1-20 · LOW · CONSUMER → X-W12 · shell (seal ink)
- **Finding:** view-accents.ts is a one-function alias: `resolveSealInk` returns `contrastInkFor`. It has one importer.
- **Evidence:** demo/color-picker/composables/boot/view-accents.ts:38-40; useViewAccents.ts:56, :175.
- **Cure:** Import `contrastInkFor` from color-session/ink directly and delete view-accents.ts.
- **Covered by:** none.

#### A2-VA-L1-21 · LOW · CONSUMER → X-W12 · app-wide (utilities)
- **Finding:** Debounce is done three ways: the local shared/utils.ts debounce (7 importers), three hand-rolled setTimeout debounces, and vueuse `useDebounceFn`, which is already a dependency.
- **Evidence:** demo/shared/utils.ts:22-44; useExtractSession.ts:189; usePaletteWiring.ts:167; AdminAuditPanel.vue:146.
- **Cure:** Use one debounce everywhere.
- **Covered by:** none.

#### A2-VA-L1-22 · LOW · CONSUMER → X-W12 · app-wide (persistence)
- **Finding:** Storage access is done three ways: safe get/set wrappers (used by auth only), inline try/catch localStorage calls, and vueuse `useStorage`.
- **Evidence:** demo/platform/storage/useSafeStorage.ts:1-27; useColorPersistence.ts:54-58, :60; hydrate.ts:76-78; useAtmosphere.ts:280; usePaletteStore.ts:25-27.
- **Cure:** Use one form (vueuse `useStorage`, or the safe wrappers) for every read and write.
- **Covered by:** none.

#### A2-VA-L1-23 · LOW · CONSUMER → X-W12 · app-wide (type)
- **Finding:** The font alias classes `.fira-code` (26 uses) and `.fraunces` (8 uses) duplicate the `font-mono` and `font-display` tokens.
- **Evidence:** demo/styles/utils.css:4-11.
- **Cure:** Replace the 34 alias uses with the tokens and delete the two classes.
- **Covered by:** none.

#### A2-VA-L1-24 · LOW · CONSUMER → X-W12 · / (picker)
- **Finding:** The pointer-debug instrument (339 + 135 + 290 lines) is statically imported into ColorPicker and gated only at runtime, so it ships in the production bundle. It lives in picker/visual, not in a debug home.
- **Evidence:** demo/picker/ColorPicker.vue:113, :145, :153, :187-188; usePointerDebug.ts:50-51; PointerDebugOverlay.vue:1-20.
- **Cure:** Load it with `defineAsyncComponent` behind `isDebugEnabled()`, and move the three files to `picker/debug/`.
- **Covered by:** Adjacent: UIA-V-54, UIA-V-459.

---

## Lens 2: mobile views

#### A2-VA-L2-1 · BROKEN · GLASS+CONSUMER → glass letter (open-at-HEAD) + X-W12 · /browse Filters popover, 844x390 landscape
- **Finding:** In landscape the Filters popover flips above its trigger and runs off the top of the viewport. The whole SORT section and most of TIER sit above y=0, so a phone user cannot reach them.
- **Evidence:**
  - L2 seat: `probe-l844-dark.json` shows the dialog at y −278, h 470.1 in a 390px viewport; at 360x780 it fits (y 242.5, gapB 78). Frame `frames/probe/l844-dark-browse-filter.jpg`.
  - Register re-measure: y −247.5, h 470.1, `max-height: none`. Frame `value-register/frames/l2-1-l844-dark-filter.jpg`.
  - Source: demo/palettes/browser/search/SearchFilterBar.vue:16 (`PopoverContent align=end w-60`, no block clamp).
- **Cause:** The popover content has no block-size clamp to the space reka reports as available. At glass HEAD, overlay-plate.css clamps the `menu` and `tooltip` reveal roles to `--reka-popper-available-height`, but the `overlay` role that Popover wears has none.
- **Cure:**
  - GLASS: clamp the overlay-role max-block-size to `var(--reka-popper-available-height)`, with `overflow-y: auto` and a scroll fade.
  - CONSUMER: drop any fixed height on the filter body, then re-measure at 844x390.
- **Covered by:** Partial: UIA-V-32 (the same popover overflows the bottom at 1440 and 390). The upward flip past the top edge is new.

#### A2-VA-L2-2 · HIGH · CONSUMER → X-W12 · every route (shell), all phone widths and landscape
- **Finding:** The one visible route H1 ("GENERATE", "PALETTES" and so on) paints underneath the fixed atmosphere canvas, so it never shows. It still takes a 24px band between the dock and the stage on every view.
- **Evidence:**
  - L2 seat: `probe-h1.json`; frames `frames/probe/h1-390-canvas-on.jpg` and `h1-390-canvas-hidden.jpg`.
  - Register re-measure: H1 at y 104, h 15.6, `position: static`; canvas `position: fixed`, `z-index: auto`. Clips `value-register/frames/l2-2-h1-canvas-{on,hidden}.png`.
  - Source: demo/color-picker/App.vue:25-35, :75, :582-592.
- **Cause:** A positioned element with `z-index: auto` (the fixed canvas) paints above in-flow, non-positioned content in the same stacking context. The pane wrappers are `position: relative` with `z-index: 1`, and the H1 is not.
- **Cure:** Give `.route-title` `position: relative` with `z-index: 1`, or isolate the canvas at `z-index: -1`. Then decide the band: keep a visible H1, or rule that the pane title is the H1 and drop the 24px row. On phones that space is better given to content.
- **Covered by:** Confirms held row UIA-V-H3 (PLAUSIBLE, LOW) and supplies its cause. Cross-reference A2-VA-L2-4.

#### A2-VA-L2-3 · MEDIUM · GLASS → glass letter (open-at-HEAD) · dock mobile menu, view select and colour-space select, 844x390
- **Finding:** In landscape every dock overlay is clamped to 60% of the viewport (234px), even with 86px free below it. None of the three overlays shows a scroll affordance:
  - the mobile menu hides its "Dark mode" row behind an internal scroll
  - the view list hides about 2 of its 8 rows
  - the colour-space list shows about 2 of 18 spaces
- **Evidence:** `metrics-l844.json`: dock-menu h 234, clientHeight 232 < scrollHeight 257, gapB 86.5; view-select listbox h 234; colour-space listbox h 165.6. Frames `frames/l844/light-dock-{menu,viewselect,spaceselect}.jpg`. Installed 7.0.0 sets `--overlay-max-block: 60vh`. Glass HEAD src/styles/tokens/offsets.css:82 sets `min(24rem, 60dvh)`, and overlay-plate.css:72-79 takes `min(--overlay-max-block, --reka-popper-available-height)`, so the 60dvh ceiling still applies at HEAD.
- **Cause:** The overlay max-block ceiling is a fixed fraction of the viewport.
- **Cure:** GLASS: base the ceiling on `min(24rem, available-height)` rather than 60dvh on short viewports, and add a scroll-edge fade. The consumer adopts through I-30.
- **Covered by:** Partial: UIA-V-66.

#### A2-VA-L2-4 · MEDIUM · CONSUMER → X-W12 · every route, 844x390 landscape
- **Finding:** In landscape the shell spends 33% of the viewport height on chrome before any content. The in-flow dock scrolls away as soon as the user reaches the content.
- **Evidence:** `metrics-l844.json` on "/": band y 16 h 72, H1 y 104, stage y 127.5 in vh 390. Frames `frames/l844/light-picker-top.jpg`, `light-gradient-top.jpg`. demo/styles/foundation.css:470-472; demo/styles/shell.css:78-86, :138-144.
- **Cause:** The band tokens are tuned for portrait and desktop, and nothing responds to short heights. The invisible H1 row (L2-2) adds to it.
- **Cure:** Add `@media (max-height: 30rem)`: shrink `--dock-inset` and `--dock-gap` to 0.5rem, set `--dock-band-min-h` to the icon size plus 0.5rem, and fold or remove the route H1. Target: the stage starts at 80px or less.
- **Covered by:** none.

#### A2-VA-L2-5 · HIGH · CONSUMER → X-W12 · /mix and /blob (and /palettes), 360/390/430 portrait
- **Finding:** Mix and Blob, like Palettes, open on a screen identical to the picker's. The routed subject pane starts at y≈680, so at 360x780 only about 100px of its header shows.
- **Evidence:** `metrics-v{360,390,430}.json`, inspector at y 678.5 / 682.5 / 683.5. Register re-measure at 360: stage y 128 h 535, inspector y 678 on all three routes. Frames `frames/v360/light-{mix,blob}-top.jpg`, `value-register/frames/l2-5-360-palettes-top.jpg`. demo/shell/viewSchema.ts:159-162, :186-189, :219-222; demo/styles/shell.css:193-197.
- **Cause:** On one-column widths the stage comes first, and for these views the stage is the shared picker, not the route's subject.
- **Cure:** At compact width, order the routed subject first when the stage is the shared picker (a CSS `order` under the single-track query), or compact the picker to a strip. Apply one rule to /palettes, /mix and /blob.
- **Covered by:** Extends UIA-V-102 (HIGH, /palettes at 390).

#### A2-VA-L2-6 · HIGH · GLASS → glass letter (cured-at-HEAD, adopt via I-30) · dock main layer, all four viewports
- **Finding:** On a coarse pointer every dock main-layer trigger is under the 44px floor at every phone width and in landscape. The action-bar seats are 32x32.
- **Evidence:** `metrics-v{360,390,430}.json` and `metrics-l844.json`. Register re-measure at 390 (coarse true): Select view 58.7x33.4, Toggle action bar 33.4x33.4, Menu 42.7x33.4, and the scene seats 32x32. Frames `frames/v360/light-picker-top.jpg`, `frames/v390/light-dock-actionbar.jpg`. Glass HEAD src/components/dock/styles/controls/touch-floor.css:41-44 adds the coarse `::after` hit-slop.
- **Cause:** Glass 7.0.0's touch floor is scoped `:not(.glass-dock *)`.
- **Cure:** Adopt through the repin (I-30) and re-measure the hit area. The 32px scene seats still need DockControl or a slop (UIA-V-106).
- **Covered by:** UIA-V-76 (HIGH, the Tools trigger and seats at 390). This row adds Select view and Menu, and all four viewports.

#### A2-VA-L2-7 · LOW (register-downgraded from BROKEN; folded into UIA-V-10) · GLASS+CONSUMER → glass letter + X-W12 · picker action bar, 360x780
- **Finding:** At 360 the action-bar layer clips the "Open color input" (T) toggle past the dock's right edge. The toggle is at x 296.9–343.7; the dock's right edge is at 324.
- **Evidence:** `metrics-v360.json` dock x 36 w 288 (80vw), clippedKids; frames `frames/v360/light-dock-actionbar.jpg`. Register re-measure: 27.1px of the toggle is visible, `elementFromPoint` at the visible centre hits the toggle, and the layer is `overflow-x: auto` (scrollWidth 357, clientWidth 266). Frame `value-register/frames/l2-7-360-actionbar.jpg`.
- **Register verdict:** The clip reproduces. "Wholly unreachable" does not: the toggle is partly visible, tappable and scrollable. The defect is UIA-V-10 and UIA-V-8 (both BROKEN at 390), so it is counted there. This row only adds the 360 measurement.
- **Cure:** Per UIA-V-8 and UIA-V-10: glass dock overflow (wrap, or an overflow menu seat) plus a consumer set trimmed for compact widths (demo/shell/dock/layers/ActionBarLayer.vue).
- **Covered by:** UIA-V-10, UIA-V-8.

#### A2-VA-L2-8 · MEDIUM · CONSUMER → X-W12 · /generate plate verb cluster, 360x780
- **Finding:** At 360 the plate's "Copy all colors" button overruns the card by 11px. It ends at x 355, and the card ends at 344.
- **Evidence:** `probe-v360-light.json` genVerbs; frames `frames/probe/v360-light-generate-verbs.jpg`. Source: demo/workbenches/generate/GenerateControls.vue:169-196.
- **Cause:** The `shrink-0` cluster is wider than the plate at 360, and the coarse 1.5x scale inflates Regenerate to 60px.
- **Cure:** Let the cluster wrap (`flex-wrap`, `justify-end`), or make Regenerate icon-only below about 24rem.
- **Covered by:** UIA-V-361 (at 390 it overruns the padding). Cross-reference A2-VA-L3-2 (the verb row belongs in the header actions).

#### A2-VA-L2-9 · MEDIUM · GLASS+CONSUMER → glass letter (control floor cured-at-HEAD) + X-W12 · picker, /mix, /generate controls outside the dock, all widths
- **Finding:** Glass-family controls outside the dock measure under 44px on a coarse pointer:
  - colour-space title trigger: 55x29.6 (37.4 in landscape)
  - Mix Colors/Palettes segments: 27.5px tall
  - Generate "Palette name" field: 30.5px tall
  - ConsoleRail channel tabs: 31.7px wide, by design (0.72 × 44)
- **Evidence:** `metrics-v390.json`; frames `frames/v390/light-{picker,mix,generate}-top.jpg`. Glass HEAD src/styles/tokens/light-dark.css:20 lifts `--control-floor` to `--touch-target` on coarse pointers (sizing.css:25 sets the 0px default); 7.0.0 lacks this. demo/color-session/ColorSpaceSelector.vue:38; MixSourceSelector.vue:4; GenerateControls.vue:160; ConsoleRail.vue:344-347.
- **Cure:**
  - GLASS: adopt the HEAD `--control-floor` through I-30, then re-measure the trigger and the segments.
  - CONSUMER: put the plate name on glass Input (UIA-V-600, L1-14), and give ConsoleRail a full-width hit-slop or record the 0.72 exception in DESIGN.md.
- **Covered by:** Partial: UIA-V-600, UIA-V-136, UIA-V-465, UIA-V-340. Cross-reference A2-VA-L3-6 (the same scale inflates the text).

#### A2-VA-L2-10 · MEDIUM · CONSUMER (owner ruling on T-31 first) → X-W12 · every route; worst on / (About inspector), phone widths
- **Finding:** On phones the dock is the only navigation, and it scrolls away with the page. On "/" at 360 the document is 8,799px tall. The collapsed seal form is disabled below 1024px.
- **Evidence:** `metrics-v360.json` docSH 8799; `probe-dock-v360.json` scroll-600 puts the dock at y −375. Frames `frames/v360/light-picker-full.jpg`, `frames/probe-dock/v360-2-scroll-600.jpg`. demo/styles/shell.css:138-144; demo/shell/dock/Dock.vue:87, :151-157, :164.
- **Cause:** T-31 (the DOCK-ATOP BAND LAW) made the dock in-flow and did not consider phone-length documents.
- **Cure:** Needs an owner ruling first. Then, below 1024px, show a compact sticky seal (the existing `#collapsed` WatercolorDot slot) once the band scrolls out, using an IntersectionObserver on `.dock-band`. Alternatively, bound the About inspector's height (UIA-V-64).
- **Covered by:** Partial: UIA-V-283, UIA-V-64.

#### A2-VA-L2-11 · MEDIUM · CONSUMER → X-W12 · /gradient to any route (Select open across a route change), 360x780
- **Finding:** An open Select listbox survives a route change. The gradient "Linear / Radial" list floated over the picker view and covered the dock's view trigger. On phones, the swipe-back gesture reaches this state.
- **Evidence:** `probe-dock-v360.json` (tap-body, then hash-picker); frame `frames/probe-dock/v360-8-hash-picker.jpg`. GradientVisualizer.vue:167-173; App.vue:97, :126 (KeepAlive).
- **Cause:** The kept-alive pane is deactivated, not unmounted, so the Select's open state and its teleported content persist.
- **Cure:** Close open popups on route change (`router.afterEach` or `onDeactivated`). Optionally, glass Select and Popover could close when their host deactivates.
- **Covered by:** none.

#### A2-VA-L2-12 · LOW · GLASS+CONSUMER → glass letter (open-at-HEAD) + X-W12 · shell (every route), landscape especially
- **Finding:** The app does not handle safe areas. The viewport meta has no `viewport-fit=cover`, and neither the demo nor glass reads `env(safe-area-inset-*)`.
- **Evidence:** demo/color-picker/index.html:15. Grep for safe-area: demo 0 hits, installed dist 0 hits, glass HEAD only deck/styles/stage.css:33-34 (none in dock). Chromium cannot emulate a notch, so `env()` measured 0px everywhere.
- **Cure:**
  - CONSUMER: add `viewport-fit=cover`, and pad `.app-layout` with `max(var(--app-gutter), env(safe-area-inset-*))` (shell.css:78-86).
  - GLASS: give the dock shell an `env()`-aware inset.
- **Covered by:** none.

---

## Lens 3: hierarchy and space

#### A2-VA-L3-1 · HIGH · GLASS+CONSUMER → glass letter (open-at-HEAD) + X-W12 · 390 (both themes): Browse stage, My Palettes (in 5 host views), /nope, /admin/{users,names,audit,flagged,tags}
- **Finding:** At 390 the empty or error headline is the same size as the pane title and heavier, so it becomes the region's primary element. The headline is 25.9px at weight 700, often on two lines; the pane title is 25.9px at weight 400. This happens in 11 of 15 views. At 1440 the ladder holds.
- **Evidence:**
  - L3 seat: `value-L3/metrics.json` headings (for example browse-390-light "Browse" 25.888/400 against "No palettes published yet." 25.888/700). Frames `value-L3/frames/{browse-390-light,palettes-390-dark,not-found-390-light,admin-users-390-light,admin-tags-390-dark}.png`.
  - Register re-measure: /nope/xyz 25.888/400 against 25.888/700.
  - Source: demo/shared/ui/EmptyState.vue:9, :48; PaneHeader.vue:120; glass HEAD src/styles/typography/scale.css:120-122.
- **Cause:** The glass `--type-display-1` clamp floors at exactly `--type-heading`. The consumer plate headline sits on the heading step at weight 700.
- **Cure:**
  - CONSUMER: set the EmptyState message on `--type-subheading` at weight 600, with the detail in body sans.
  - GLASS: raise the display-1 floor to at least `--type-title` (2.058rem).
- **Covered by:** Partial: UIA-V-632, UIA-V-638, UIA-V-647 (LOW, admin-only, consumer-only cure). The multi-view scope and the glass root are new.

#### A2-VA-L3-2 · MEDIUM · GLASS+CONSUMER → glass letter (open-at-HEAD) + X-W12 · /admin/{tags,flagged,users,audit}, My Palettes, /atmosphere, /blob, /mix, /generate; 1440 and 390
- **Finding:** No pane header has a trailing-actions seat, so each pane spends a full row on its section actions:
  - Tags and Flagged: a count and Refresh row that is 992px wide at 1440 for one 28px Refresh. In the refused state the Refresh is disabled, so the row holds only a dead control.
  - Users: a Prune/Refresh row.
  - Palettes: an orphan Delete-all trash row.
  - Atmosphere and Blob: a bordered Copy JSON/Reset footer band.
  - Mix: the Colors/Palettes tabs, centred alone on a row.
  - Generate: a verb row.
- **Evidence:** `value-L3/metrics.json` lone rows (admin-tags-1440 and admin-flagged-1440: row 992w, control 28w). Frames `value-L3/frames/{admin-tags-1440-light,admin-flagged-1440-dark,admin-users-1440-light,palettes-1440-light-seeded,atmosphere-1440-light,mix-1440-light,generate-1440-light}.png`. Source: demo/shared/ui/PaneHeader.vue:29; glass-ui src/components/card/CardHeader.vue:86 (default slot only, re-checked at HEAD); AdminTagsPanel.vue:14; AdminFlaggedPanel.vue:16; AdminUsersPanel.vue:18-36; PalettesPane.vue:91; ConfigSliderPane.vue:170-182; MixSourceSelector.vue:125.
- **Cause:** The header surface cannot carry actions.
- **Cure:**
  - GLASS: add an additive `#actions` trailing slot to CardHeader, the card-level sibling of O-68's ConfiguratorLayer `#actions`.
  - CONSUMER: PaneHeader forwards `#actions`. The count moves to the header badge (UIA-V-438). Refresh, Prune and Delete-all move to the header or its overflow, hidden while an EmptyState owns Retry. Copy JSON and Reset move to the header. Mix's tabs sit trailing in the header. Delete each spent row.
- **Covered by:** Symptoms: UIA-V-438, UIA-V-435, UIA-V-645, UIA-V-406, UIA-V-655, UIA-V-278, UIA-V-159, UIA-V-399, UIA-V-361. New here: the common root, the glass ask, the Mix tabs row, and the disabled-only Refresh row.

#### A2-VA-L3-3 · MEDIUM · GLASS → glass letter (open-at-HEAD); consumer adopts in X-W12 · /atmosphere (1440) and /blob inspector (1440 and 390)
- **Finding:** ConfiguratorRow stacks the label above the control at every width. In Atmosphere at 1440, each slider spends two lines over a track about 680px long. In Blob, 31 two-line rows make the inspector 2693px tall at 1440 and 3174px at 390.
- **Evidence:** Frames `value-L3/frames/{atmosphere-1440-light,atmosphere-1440-dark,blob-1440-light,blob-390-light}.png`. `metrics.json` blob-1440-light inspector 512×2693; the register measured the Blob inspector at h 3174 at 360. glass-ui src/components/configurator/ConfiguratorRow.vue:122-168 (no layout or orientation prop at HEAD); demo/scenes/ConfigSliderPane.vue:144-161.
- **Cure:** GLASS: add a container-query inline layout: a label column, the control at `flex-1`, and a right-aligned tabular value when the row is at least about 28rem wide; stack below that. CONSUMER: ConfigSliderPane adopts it, with the ConfiguratorLayer grouping of UIA-V-156 and UIA-V-162.
- **Covered by:** Partial: UIA-V-397, UIA-V-163, UIA-V-161, UIA-V-156.

#### A2-VA-L3-4 · MEDIUM · CONSUMER → X-W12 · My Palettes inspector on /palettes, /browse, /extract, /generate, /gradient
- **Finding:** Three bands sit before the first saved palette, where one line (caption plus "+") would fit:
  - a "Start a new palette" caption row, in a titled well about 80px tall
  - a lone "+" tile of 44–48px on a second row
  - an orphan trash row in the list toolbar
- **Evidence:** `value-L3/metrics.json` lone-row hit (row 435w, control 48w, 54h at 1440; 297w and 44w at 390). Frames `value-L3/frames/{palettes-1440-light-seeded,palettes-390-light-seeded,generate-1440-light}.png`. CurrentPaletteEditor.vue:6-20; PalettesPane.vue:85-96.
- **Cure:** With no swatches, put the caption and the "+" on one line. Move Delete-all into the header actions (L3-2).
- **Covered by:** Partial: UIA-V-278, UIA-V-593, UIA-V-24, UIA-V-103.

#### A2-VA-L3-5 · MEDIUM · CONSUMER → X-W12 · /gradient, /extract, /generate, /browse My Palettes (1440); /blob stage region (1440)
- **Finding:** Companion cards stretch to the shared grid row but pin their content to the top:
  - Gradient at 1440: the My Palettes card is 983px tall, with a 536px dead band.
  - Extract, Generate and Browse: the same fault at a smaller scale.
  - Blob, the inverse: the 2693px inspector sets the row, and the picker stretches over 2138px of empty ground.
- **Evidence:** `value-L3/metrics.json` (gradient-1440-light inspector gap 536; blob-1440-light stage gap 2138). Frames `value-L3/frames/{gradient-1440-light,gradient-1440-dark-fold,blob-1440-light,extract-1440-light}.png`. demo/styles/shell.css:250-277; AboutPane.vue:4 (the only adopter); PalettesPane.vue:2.
- **Cause:** Only About adopts the row contract.
- **Cure:** PalettesPane, MixPane and ConfigSliderPane declare `.pane-row-follow`. The empty state takes the leftover space (flex-1, centred). Best done once inside the PaneShell of A2-VA-L1-1.
- **Covered by:** Partial: UIA-V-593, UIA-V-363, UIA-V-138, UIA-V-161.

#### A2-VA-L3-6 · MEDIUM · GLASS → glass letter (open-at-HEAD) · 390 (touch): /atmosphere, /mix, /generate, /gradient, /blob, /browse, /nope
- **Finding:** On a coarse pointer, control text is multiplied by 1.5. Controls render at about 21px, above the 20.4px section headings and within 5px of the 25.9px pane title.
- **Evidence:** `value-L3/metrics.json` 390 size sets (21px present, absent at 1440). Frames `value-L3/frames/{atmosphere,mix,generate,not-found}-390-light.png`. Glass HEAD src/styles/tokens/sizing.css:35 (`--control-text: calc(var(--type-small) * var(--ui-scale))`, re-read), tokens/light-dark.css:19, sizing.css:20.
- **Cause:** The coarse scale multiplies the type as well as the hit area.
- **Cure:** GLASS: on coarse pointers grow only `--control-floor` and `--touch-target`. Keep `--control-text` at `--type-small`, or cap it at `--type-body`.
- **Covered by:** Partial: UIA-V-112 (`--dropdown-text` only); symptoms UIA-V-299, 365, 389, 139, 381, 445. Cross-reference A2-VA-L2-9.

#### A2-VA-L3-7 · LOW · CONSUMER → X-W12 · /gradient Stops section, 1440 and 390
- **Finding:** With no stop selected, the stop inspector spends two rows (three at 390) on an inert state: "No stop selected", an empty Position field, a disabled Remove, and a separate help line.
- **Evidence:** Frames `value-L3/frames/{gradient-1440-light,gradient-1440-dark-fold,gradient-390-light}.png`. GradientStopEditor.vue:698-760, :409, :705.
- **Cure:** With no selection, render only the hint line. When a stop is selected, mount Position and Remove on one row. Pairs with the split in A2-VA-L1-11.
- **Covered by:** Partial: UIA-V-607, UIA-V-373.

#### A2-VA-L3-8 · MEDIUM · CONSUMER → X-W12 · /browse stage card rows (1440, fixture list)
- **Finding:** At 1440 the palette name, the row's primary, truncates to "Autumn orc…" while five metadata items hold the row at full size: the Featured mark, the colour-count badge, "+2", "♡42" and "⋯".
- **Evidence:** Frames `value-L3/frames/browse-1440-{light,dark}-seeded.png` (6 fabricated public palettes served by a Playwright route; layout only). PaletteCardMeta.vue:13-35.
- **Cure:** Give the name flex priority, with a min-width of about 16ch before any meta shows. Drop the count badge (UIA-V-524), collapse "+N", show Featured as an icon, and keep the vote and menu trailing.
- **Covered by:** Partial: UIA-V-30 (BROKEN at 390), UIA-V-302, UIA-V-556. New here: the same fault at 1440.

---

## Views skipped (verbatim from the seats)

### value-L1
- No live headed frames were captured for any view. Lens 1 was run as a source and import-graph audit, so every row's evidence is file:line and nothing was observed on the served :9000 page.
- Read by grep and outline only, not line by line: picker/controls/ComponentSliders/* (ConsoleRail, touch gates), SpectrumCanvas, ColorComponentDisplay, scenes/about/markdown/Markdown.vue, ColorNutritionLabel.vue, palettes/export/*, palettes/api/*, platform/transport/*, color-session/*.ts logic modules beyond the dedup checks, styles/foundation.css, styles/shell.css and styles/animations.css beyond the class-usage counts.
- Already rowed in UI-AUDIT-value and therefore not re-rowed here: ActionToolbar dead (UIA-V-503); PaletteSlugBar twin (UIA-V-249); MiniColorPicker hand-rolled picker (UIA-V-308); duplicate tag checklists (UIA-V-125); easing one-off editor (UIA-V-143/148); ConfigSliderPane versus glass Configurator (UIA-V-162); hand-rolled icon-button strings (UIA-V-275); admin row recipe copied four times (UIA-V-416/405/177); aurora canvas re-implementation (UIA-V-188); DockCrossfade shims (UIA-V-244/500); Generate verbs duplicated in the dock (UIA-V-142); duplicate plates per region (UIA-V-454).
- Cross-app glass rows (L1-6, L1-7) cite the keyframes and fourier sites from spot checks only. Those apps' full Lens 1 inventories belong to the keyframes-L1 and fourier-L1 seats.

### value-L2
- dock collapsed (seal) form at every mobile viewport: it cannot be reached below 1024px by design (demo/shell/dock/Dock.vue:87 and :164, always-expanded when not desktop). Recorded as context in A2-VA-L2-10.
- version-history-drawer: needs a remote palette with versionCount > 1. The API palette DB is empty (GET /palettes returns data:[]), and seeding it would break the read-only law. Glass 7 right placement resolves to 75% width (dist components/dialog/placement.css), so no overflow is expected at 360, but this is unmeasured.
- palette-card-menu, palette-scene-actions, tag-edit-popover, flag-report-dialog, migrate-palettes-dialog: all need saved or published palettes (empty DB; the probe's local save did not populate the list). Unmeasured at 360, 430 and landscape.
- palettes-delete-all-dialog: needs saved palettes (as above). Unmeasured.
- admin views in their populated states (tables, rows, confirm dialogs): need a real admin token. Only the 'not permitted' plate was measured.
- dock-color-input, dock-slug-edit-layer, dock-profile-menu (logged-in), dock-mbabb-menu desktop twin: not driven in this seat. The prior register covers them at 390 (UIA-V-9/11-17/19-21/87/251).
- pane-plates (error and loading plates) and pointer-debug-overlay: not driven (need fault injection or a debug flag).
- about-pane internal states (space facts, KaTeX clip, guide TOC): captured only as part of '/' full frames. Not probed separately (prior UIA-V-62..65/203/208).
- Shared server http://localhost:9000 was not used: it accepted TCP but answered no HTTP request for >10 min. The same tree was served on :9102 (see instrument-notes.txt).

### value-L3
- INSTRUMENT: the served :9000 dev server (pid 24616, 3+ h at about 90% CPU) returned no response to any request over repeated 20–100 s probes. Every capture ran against a same-tree fallback vite on 127.0.0.1:9983: the repo's own vite.config.ts, wrapped only for cacheDir, watch-ignore on docs/ and VITE_API_URL=http://localhost:3000. API calls to :3000 were proxied through a Playwright route that added CORS for the fallback origin. The fallback server has been stopped. The dev.sh stack was not touched.
- admin-users/names/audit/flagged/tags POPULATED states: the live API on :3000 refused api/.env's ADMIN_TOKEN with 403. Only the refused state was framed live. For context I looked at the prior register's populated frames (ui-evidence/value/admin-*/…populated…png) but did not re-measure them, so admin populated rows for hierarchy and space are not asserted here beyond the toolbar-row root (A2-VA-L3-2).
- Browse against real published data: the live API returns an empty list, so the populated Browse frames use a locally fabricated fixture (layout only).
- Overlays and sub-states not framed in this seat: dock menus (view-select, mobile menu, profile, mbabb), dock color-input and slug-edit layers, color-space select popover, version-history drawer, flag-report / migrate / delete-all / tag-edit dialogs and popovers, palette card menu, browse filter popover.
- Interaction states not framed: Extract with an image loaded or the eyedropper open, Mix with palettes selected or a result, Generate after save, a selected card in Browse or Palettes, Gradient with a stop selected or the easing authoring open, Mix Palettes mode.
- About pane below the fold at 390 (the 7838px inspector was captured full-page, and its heading ladder read from metrics, but the section rhythm was not audited frame by frame; the heading-ladder fault is already UIA-V-203).
- Intermediate widths (between 390 and 1440) and landscape: not in the Lens-3 brief for this seat (Lens 2 owns 360/430/844×390).

### register
- MEDIUM and LOW rows were folded as the seats filed them. The register did not re-measure them. Wherever it re-read a glass HEAD file for routing (L2-3, L2-9, L3-2, L3-3, L3-6), the head state above is its own reading.

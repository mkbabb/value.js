SERVED MODEL: claude-opus-5-5 (Opus 5.5; owner: Fable not used)

# UI-AUDIT-value: value.js colour picker, full UI audit register

| field | value |
|---|---|
| date | 2026-09-23 |
| seat | REGISTER. It folds 37 page audits and 37 confirm seats. Authority: `docs/tranches/X/COHESION.md` §0bl. |
| tree at register | value.js `26681172`, 12 dirty (other workflows are editing concurrently) · glass-ui `6433284a` (10.0.1), 5 dirty · installed `@mkbabb/glass-ui` 7.0.0 (`package.json:88` ^7.0.0) |
| trees at capture | Recorded per page in each audit's page line and `ui-evidence/value/<page>/` manifests. Captures span value.js `de278769`, `f95a2f77`, `ace3a5d7` and later, and glass-ui `1c1f1f67` to `6433284a`. |
| instrument | Headed Chromium (`chromium.launch({headless:false})`) on the real GPU. Playwright is imported from `value.js/node_modules/playwright/index.mjs`. Dev server localhost:9000. Viewports 1440x900 and 390x844, light and dark. No MCP browser tools. |
| design authority | glass-ui `DESIGN.md`. The radius role table (:385-391) reserves stadium for single-line controls; multi-line holders take `--radius-field` 16px. Plus the component READMEs under `glass-ui/src/components/*` and `demo/DESIGN.md`. |
| evidence root | `docs/tranches/X/audit/ui-evidence/value/<page>/`. Frame paths below are relative to that page folder. |
| machine-readable source | `ui-evidence/value/audit-confirm-results.json`: the raw audit and confirm results this register folds. |

## The owner's words (2026-09-23, verbatim)

> "this entire UI is god awful, not glass-ui idiomatic, cluttered, and too rounded in some pills. A full UI audit of every page should be done, too. The smooth and bouncy pills, for example are too rounded and should be more card like--mark this and route all glass-ui changes, too to the glass-ui session and agent thereof, to be fixed at the root. And for example, why does this page have an inline keyframes editior and NOT properly leverage our idiom of the cube, amiga, etc of having the keyframes pane separate--ensure that we have cohesion between all animation views, too, and NO one-off instances such as this."

Earlier dockets: value.js COHESION §0ao/§0bd, fourier §0ao/§0bc, keyframes §0be-§0bj.

## Totals

676 register rows: **BROKEN 54 · HIGH 131 · MEDIUM 275 · LOW 216**. That is 529 audit findings (CONFIRMED or AMENDED) plus 147 confirm-seat misses. Owner split: CONSUMER 509 · GLASS 66 · GLASS+CONSUMER 97 · UNRESOLVED 4. Also filed: 3 held rows (PLAUSIBLE or unconfirmed, Appendix B), 15 instrument and evidence notes (Appendix C) and 0 outright REFUTED verdicts (Appendix A lists the partial refutations).

Severity and owner follow the confirm verdict: an AMENDED verdict overrides the audit. There are two severity changes: app-ground-atmosphere #5 moves HIGH→MEDIUM, and palette-scene-actions #8 moves MEDIUM→HIGH. Where an amended verdict re-routed the owner (for example dock-color-input #1, where glass already ships `Popover keepDockOpen`), the row carries the corrected class. The GLASS "head" state is derived from the seats' text: "cured-at-HEAD" means adopt it through the consumer repin wave (I-30 / COHESION §0bo) and re-measure; "open-at-HEAD" means route it to the glass-ui session. The glass session should re-verify each head state.

### The owner's marks, located

- **"Smooth and bouncy pills too rounded, should be more card like."** Located in the mix-view SegmentedTabs rows (glass `tabs/styles/segmented.css`, where `--radius-tab` is a stadium). They are routed to GLASS as a canon change: the radius role for segmented tracks moves from stadium to a card-like role. The same pill-rounding complaint recurs at ConsoleRail (home-picker), the slug-pill/Badge rows, and the filled capsules in the dock (dock-main). Each of those rows says whether the cure is a consumer role fix or a glass canon change.
- **"Inline keyframes editor instead of the separate keyframes pane (cube, amiga) idiom; cohesion between all animation views."** Located in the gradient-easing-authoring rows. The easing authoring surface is inline in the gradient pane, not a separate pane, which violates COHESION §0bl OA-37. They are routed to CONSUMER (re-seat into the shared pane idiom) and to GLASS (easing seat and gallery primitive, EasingPicker props).
- **"Cluttered, not glass-ui idiomatic."** The recurring classes: hand-rolled rows, chips and skeletons instead of glass primitives; retired Button `variant=` props (Button is emphasis/tone at HEAD); dead WatercolorDot buttons (7.0.0 WatercolorDot has no tag or slot, and `pointer-events:none`); duplicated controls and readouts; mixed type voices in the dock.

## Per-page summary

| page | audit findings | confirm C / A / held | misses (rows / notes) | BROKEN | HIGH | MED | LOW | GLASS-touching rows |
|---|---|---|---|---|---|---|---|---|
| app-ground-atmosphere | 12 | 7 / 5 / 0 | 5 / 0 | 1 | 5 | 7 | 4 | 3 |
| home-picker | 15 | 12 / 3 / 0 | 5 / 0 | 2 | 2 | 9 | 7 | 8 |
| about-pane | 16 | 13 / 3 / 0 | 5 / 0 | 1 | 4 | 9 | 7 | 5 |
| color-space-select | 10 | 7 / 3 / 0 | 3 / 0 | 1 | 1 | 4 | 7 | 5 |
| dock-main | 18 | 14 / 4 / 0 | 2 / 0 | 3 | 5 | 6 | 6 | 5 |
| dock-view-select | 16 | 12 / 4 / 0 | 3 / 0 | 0 | 3 | 8 | 8 | 4 |
| dock-action-bar-color | 15 | 9 / 6 / 0 | 4 / 0 | 2 | 2 | 10 | 5 | 8 |
| dock-color-input | 17 | 13 / 3 / 1 | 5 / 0 | 3 | 6 | 7 | 5 | 1 |
| dock-slug-edit-layer | 14 | 9 / 5 / 0 | 5 / 0 | 4 | 4 | 7 | 4 | 6 |
| dock-mobile-menu | 11 | 8 / 3 / 0 | 4 / 0 | 1 | 3 | 7 | 4 | 6 |
| dock-profile-menu | 13 | 11 / 2 / 0 | 4 / 2 | 3 | 4 | 7 | 3 | 6 |
| dock-mbabb-menu | 9 | 7 / 2 / 0 | 4 / 0 | 2 | 2 | 6 | 3 | 3 |
| palettes-view | 22 | 15 / 7 / 0 | 5 / 0 | 4 | 8 | 8 | 7 | 2 |
| palette-scene-actions | 17 | 12 / 5 / 0 | 5 / 1 | 1 | 8 | 6 | 7 | 0 |
| palette-card-menu | 12 | 11 / 1 / 0 | 4 / 1 | 1 | 2 | 7 | 6 | 7 |
| palettes-delete-all-dialog | 10 | 6 / 4 / 0 | 4 / 0 | 0 | 2 | 5 | 7 | 10 |
| browse-view | 17 | 15 / 2 / 0 | 5 / 0 | 2 | 4 | 9 | 7 | 3 |
| browse-search-filter | 16 | 13 / 3 / 0 | 3 / 0 | 2 | 4 | 7 | 6 | 7 |
| tag-edit-popover | 14 | 12 / 2 / 0 | 3 / 0 | 2 | 2 | 5 | 8 | 4 |
| version-history-drawer | 15 | 12 / 3 / 0 | 5 / 0 | 3 | 4 | 7 | 6 | 2 |
| flag-report-dialog | 9 | 5 / 4 / 0 | 2 / 1 | 1 | 2 | 4 | 4 | 3 |
| migrate-palettes-dialog | 12 | 7 / 5 / 0 | 4 / 0 | 0 | 2 | 9 | 5 | 3 |
| extract-view | 17 | 9 / 7 / 1 | 4 / 1 | 0 | 2 | 10 | 8 | 4 |
| mix-view | 17 | 15 / 2 / 0 | 4 / 1 | 1 | 5 | 11 | 4 | 5 |
| generate-view | 12 | 9 / 3 / 0 | 5 / 0 | 3 | 2 | 7 | 5 | 3 |
| gradient-view | 18 | 14 / 4 / 0 | 3 / 1 | 2 | 5 | 9 | 5 | 2 |
| gradient-easing-authoring | 16 | 12 / 4 / 0 | 3 / 0 | 0 | 6 | 9 | 4 | 8 |
| atmosphere-view | 19 | 15 / 4 / 0 | 4 / 0 | 1 | 6 | 10 | 6 | 11 |
| blob-view | 13 | 10 / 3 / 0 | 4 / 0 | 2 | 5 | 7 | 3 | 5 |
| admin-users | 23 | 17 / 6 / 0 | 6 / 1 | 1 | 6 | 11 | 11 | 3 |
| admin-names | 14 | 12 / 2 / 0 | 3 / 1 | 2 | 2 | 9 | 4 | 4 |
| admin-audit | 16 | 12 / 4 / 0 | 3 / 1 | 1 | 2 | 9 | 7 | 3 |
| admin-flagged | 13 | 10 / 3 / 0 | 4 / 1 | 0 | 4 | 6 | 7 | 1 |
| admin-tags | 11 | 8 / 3 / 0 | 5 / 1 | 0 | 4 | 7 | 5 | 4 |
| not-found | 12 | 8 / 3 / 1 | 4 / 0 | 0 | 1 | 7 | 7 | 2 |
| pane-plates | 13 | 10 / 3 / 0 | 3 / 1 | 1 | 2 | 5 | 8 | 4 |
| pointer-debug-overlay | 8 | 5 / 3 / 0 | 3 / 1 | 1 | 0 | 4 | 6 | 3 |

## BROKEN (54)

#### UIA-V-1 · BROKEN · app-ground-atmosphere · The atmosphere canvas is as tall as the whole document, so the WebGPU aurora fails to start on long pages (and on retina screens); the field goes dead or flat

- **source** audit #1 · **verdict** AMENDED · **state** rest, light + dark · **where** /#/ and /#/palettes at 390 (both themes); /#/ at 1440 dark (About pane unclipped, OA-21)
- **frame** `app-ground-atmosphere/` 390-light-rest-home.png (flat magenta, dead field; boot 1400→4000 ms frame-diff 0.0); 390-dark-rest-home.png; report.json → 390-light/390-dark .routes['/'].canvas {bufW:390, bufH:8687}, 1440-dark .routes['/'].canvas {bufH:7558}
- **observed** The canvas grows to the document's scroll height: 390x8687 on /#/ at 390 and 1440x7558 on /#/ at 1440 dark. The WebGPU swapchain texture limit is 8192. · Console: 'Texture size ([Extent3D width:390, height:8687]) exceeded maximum texture size (8192)' followed by '[aurora] init failed: GPUValidationError'. · 390-light: the canvas never gets `atmosphere-canvas--arrived` and the ground is a static flat slab. · 390-dark: 10,820 init-failed warnings in about 90 s (a retry storm). · 1440 dark at DPR 2 (the owner's 2846x1650 retina surface) would need a 15116-px texture, so it fails the same way.
- **expected + canon** A full-bleed field sized to the viewport; page content scrolls over it. glass Aurora README §Runtime contract (:30-52): the substrate owns 'backing-store sizing and DPR policy' and 'tab, offscreen … parking'. It is not meant to be a document-sized buffer.
- **owner** **CONSUMER**: CONSUMER — demo/color-picker/App.vue:17-18 (canvas `absolute inset-0 w-full h-full` inside .app-layout) + demo/styles/shell.css:78-86 (.app-layout `min-block-size: 100svh`, grows with content)
- **fix shape** Make the field viewport-fixed: `position: fixed; inset: 0; block-size: 100lvh` (or mount glass <Aurora class="fixed inset-0">) instead of absolute on the growing grid. The backing store is then bounded by the viewport × DPR on every route, however long the scroll.
- **confirm** The mechanism holds. App.vue:17 is still `absolute inset-0 w-full h-full` inside .app-layout, and shell.css:78-86 is `min-block-size:100svh` with nothing capping it. report.json has bufH 8687 on / at 390 in both themes, and the console has 'Texture size ([Extent3D width:390, height:8687]) exceeded maximum texture size'. Two corrections. (a) 1440-dark / measured bufH 7558 at DPR 1, which is under 8192. That run had no init failure, so the 'where' entry '/#/ at 1440 dark' is only a projection for retina. (b) The retina figure is wrong. Installed glass 7.0.0 clamps aurora DPR to 1.5 (dist color.wgsl-Ct5o9dpf.js `var a = 1.5`, fed as aurora.js:2355 dprPolicy), so retina needs 7558×1.5 ≈ 11337 px, not 15116. That still fails. Also, 1440-light / was only 900 px tall because About had been replaced by the error boundary. The canvas height follows the unclipped About pane (OA-21), so the tall canvas and the About clip are one root cause.

#### UIA-V-2 · BROKEN · home-picker · Space-select popover overflows the viewport at 390 (right border and selected row clipped)

- **source** audit #1 · **verdict** CONFIRMED · **state** open · **where** home-picker · space selector open · 390 light and dark
- **frame** `home-picker/` 390-dark-08-space-select-open.png, 390-light-08-space-select-open.png (measure-select.mjs: listbox [16,198,413,384] at vw 390)
- **observed** The listbox is 413px wide from x=16, so its right edge is at 429 on a 390 viewport. The right border, the selected-row card edge and the ends of long specimen strings go off-screen.
- **expected + canon** A popover fits the viewport minus the 16px gutter (DESIGN.md: --radius-card popover role :387; page contract of no horizontal overflow and a 16px gutter).
- **owner** **GLASS+CONSUMER**: GLASS — SelectContent (glass-ui src/components/select/SelectContent.vue:84 has min-w only, no max-width tied to the available width; collisionPadding 16 at :56 cannot shift a box wider than the viewport). Contributing: CONSUMER demo/color-session/ColorSpaceSelector.vue:379 (the caption max-width is a character budget, so the specimen row sets the width) · *glass component* SelectContent (src/components/select/SelectContent.vue:84) · *head* open-at-HEAD
- **fix shape** glass: SelectContent gets max-w-(--reka-select-content-available-width), clamped to 100vw minus 2x the collision padding. consumer: let the specimen caption truncate below its character budget in narrow bands, or wrap the caption under the name.

#### UIA-V-3 · BROKEN · home-picker · Header condense is inverted: it fires at 1440 over the sliders and never at 390

- **source** audit #2 · **verdict** CONFIRMED · **state** scrolled (window 400px) · **where** home-picker · page scrolled · 1440 and 390
- **frame** `home-picker/` 1440-light-11-condensed.png, 1440-dark-11-condensed.png, 390-light-11-condensed.png, *-11-condense.json
- **observed** At 1440, page scroll condenses the header, and the sticky strip rides down over the card's own content. The display-1 readout sits on top of the L slider row, with the L track and the '92.0%' meter showing through under the numerals. The veil only covers the title band and paints a muddy grey slab (the backdrop-blurred spectrum) with a hard lower edge. At 390, where this state was built for, condensed=false: the card is the observed root but never overflows (scrollHeight 602 = clientHeight 602), so the header just scrolls away.
- **expected + canon** Per the composable's own contract (ColorPicker.vue:136-145): condense only where the picker actually scrolls (mobile), stay expanded at desktop, and the veil covers the whole strip (header.css:47-55 'rows never ghost-through').
- **owner** **CONSUMER**: CONSUMER — demo/picker/composables/useHeaderCondense.ts:65-73 (resolveScrollRoot returns null at lg because the card's lg:overflow-visible beats overflow-x-hidden, so the viewport is the root), :93 (the sufficiency gate is skipped when scrollRoot is null); demo/picker/header.css:24-27 (position: sticky); demo/picker/ColorPicker.vue:9 (card overflow classes)
- **fix shape** Resolve the scroll root to the element that actually scrolls (the app scroll host at <lg), and never condense when the root is the viewport and the card fits. Size the veil to the condensed strip, including the readout, or cap the sticky range inside the card.

#### UIA-V-4 · BROKEN · about-pane · Conversion-graph tooltips are empty, and the chips show a pointer cursor but do nothing

- **source** audit #2 · **verdict** CONFIRMED · **state** hover on any path chip, all viewports · **where** Conversion Graph section
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-04-graph-hover.png ; probe-out.json (tooltip role=tooltip, text '', 1x1 px; chip cursor pointer, tabindex null, role null)
- **observed** Hovering opens a role=tooltip node that is 1x1 px with no text. The chip shows cursor:pointer but is not focusable, has no role and has no action. One TooltipProvider is created per path.
- **expected + canon** A tooltip must say something. glass Tooltip (DESIGN.md:1474) is used for real content, and a pointer cursor means the element is actionable.
- **owner** **CONSUMER**: CONSUMER demo/scenes/about/ColorNutritionLabel.vue:105-150 (TooltipContent at :147-148 has class 'contents' and no children; the chip at :117-118 has cursor-pointer)
- **fix shape** Either give the tooltip real content (for example 'N conversion steps: OKLCh → OKLab (polar→cartesian) …') and make the chip focusable, or delete the Tooltip/TooltipProvider wrapper and the cursor-pointer and leave the chips as static data. Hoist the single TooltipProvider out of the v-for.

#### UIA-V-5 · BROKEN · color-space-select · At 390px the open list runs about 39px past the right edge of the screen, cutting off the row captions and the right border

- **source** audit #1 · **verdict** AMENDED · **state** open list · **where** picker header and About host, open list, 390x844, light and dark
- **frame** `color-space-select/` 390-light-05-open-listbox.png; p2-390-dark-13-open-mid.png; p2-390-*-17-about-open.png; report-pass2.json open.content {l:16, r:428.6, w:412.6, vw:390, clippedRight:true}
- **observed** The list is 412.6px wide in a 390px viewport. Its left edge sits at x=16, the collision padding, so it overflows the right edge by 38.6px. The right border, the selected row's highlight ring and the ends of the captions are cut off: 'color(srgb-linear 2.58 0.2763 0.5753 / 82.7%' loses its closing paren. `truncate` never applies because the caption box is set to the full character budget.
- **expected + canon** On phone width a floating list stays inside the viewport minus the 16px collision padding (the page contract: no horizontal overflow at phone width). glass-ui already sets collisionPadding:16 (SelectContent.vue:57), but it can only shift the list sideways, not narrow it.
- **owner** **GLASS+CONSUMER**: CONSUMER demo/color-session/ColorSpaceSelector.vue:379 + GLASS SelectContent (glass-ui src/components/select/SelectContent.vue:57 / styles/glass/overlay-plate.css — no width cap) · *glass component* SelectContent (src/components/select/SelectContent.vue:57) · *head* open-at-HEAD
- **fix shape** GLASS: cap the list at `max-width: var(--reka-select-content-available-width)` so reka's available width bounds it. CONSUMER: change the caption from `max-width: calc(budget*1ch)` to `min(calc(budget*1ch), 100%)` so the existing `truncate` can apply on narrow screens, or let the caption wrap.
- **confirm** Confirmed. In 390-light-05 the right border and selection ring are visibly cut off. report-pass2 shows the list at l:16 r:428.6 w:412.6 vw:390 with clippedRight:true, and the About host has the same box. The owner split is correct. At glass HEAD, SelectContent.vue:84 sets only min-w-(--overlay-min-width) and never caps the width at --reka-select-content-available-width, and overlay-plate.css has no max-width. On the consumer side, ColorSpaceSelector.vue:379 `max-width: calc(var(--specimen-char-budget)*1ch)` stops truncate from ever applying. Amendment: collisionPadding is at SelectContent.vue:56, not :57.

#### UIA-V-6 · BROKEN · dock-main · Collapsed wax seal carries no view glyph (and no admin gold ink) because WatercolorDot 7.0.0 has no default slot

- **source** audit #1 · **verdict** CONFIRMED · **state** collapsed wax seal · **where** collapsed dock (1440, both themes; admin mode)
- **frame** `dock-main/` d-light-11-seal.png, d-dark-11-seal.png, d-light-23-admin-seal.png, d-light-15-seal-probe.png, probe-seal.json
- **observed** Seal = a pink squarish blob and nothing else. probe-seal.json: .dock-seal-ink = null and the wax's only child is svg.watercolor-filter-host. The 'identity by impression' (view icon) and the admin gold-shimmer identity on the seal never render. The Dock.vue:295-334 comment's two-voice contract is fiction on this build. tag="div" at Dock.vue:172/180/339 is also silently ignored.
- **expected + canon** Dock.vue's own contract: the wax (live color) plus the inked current-view glyph in --seal-ink, with gold ink in admin mode. The glyph must exist at both morph endpoints (the W7-1 continuity clause).
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/shell/dock/Dock.vue:337-352 (slots the view icon + gold-shimmer-icon into <WatercolorDot>); GLASS note: glass-ui 7.0.0 dist watercolor-dot.js:100-146 renders only span>svg (no renderSlot, no `tag` prop), and glass HEAD src/components no longer ships watercolor-dot at all (62305f4a BK #55 relocate), so the import itself breaks at the next adoption · *glass component* WatercolorDot (7.0.0: no tag/slot, pointer-events:none; relocated out of glass at BK #55) · *head* open-at-HEAD
- **fix shape** Stack the ink as a SIBLING of the wax inside the .dock-seal grid (both grid-area 1/1, the ink above the wax) instead of slotting it into WatercolorDot. Keep the vj-morph Transition on the ink. Alternatively ask glass to restore a default slot on the relocated swatch primitive. Relay the WatercolorDot relocation to the glass session because this consumer import dies at adoption.

#### UIA-V-7 · BROKEN · dock-main · View-select trigger shows NO keyboard focus ring: --dock-ring is overwritten with a bare colour

- **source** audit #2 · **verdict** CONFIRMED · **state** keyboard focus · **where** dock main layer, first tab stop (1440 light and dark; admin arm too)
- **frame** `dock-main/` d-light-05-focus-0-Select_view.png, d-dark-05-focus-0-Select_view.png vs d-light-05-focus-1-Toggle_action_bar.png; probe-seal.json.focus
- **observed** probe-seal.json: :focus-visible = true, outline 'none', box-shadow 'none', --dock-ring 'oklch(0.47 0.19 9.8)'. A colour is not a valid box-shadow, so the declaration drops and the first tab stop in the whole app is invisible. The Tools control beside it gets the ring correctly ('0 0 0 2px accent/0.3, 0 0 8px').
- **expected + canon** glass dock README:71-72 says interactive controls keep a complete focus-visible ring. --dock-ring is a box-shadow token, not a colour seam.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/DockViewSelect.vue:70 (`'--dock-ring': isAdminMode ? 'var(--color-gold)' : 'var(--accent-view)'`); glass consumes it as `box-shadow: var(--dock-ring)` (7.0.0 dist components/dock/styles/index.css, `.dock-select-trigger:focus-visible`)
- **fix shape** Pass a full ring shadow (e.g. `0 0 0 2px color-mix(in oklab, var(--accent-view) 45%, transparent), 0 0 8px …`), with the gold arm built the same way. Better: glass exposes a colour-only seam (e.g. --dock-ring-color) that the ring shadow derives from, so consumers cannot break the ring by setting a colour. Route that API ask to the glass session.

#### UIA-V-8 · BROKEN · dock-main · 390 action-bar layer overflows the 312px dock: the colour-input control is clipped by the plate cap

- **source** audit #3 · **verdict** CONFIRMED · **state** action-bar layer at 390 · **where** 390 light/dark, after tapping Tools
- **frame** `dock-main/` m-light-16-actionbar-full-band.png, m-light-05-actionbar-layer.png, probe-2.json
- **observed** The dock-layer--full has scrollWidth 305 but clientWidth 294 (overflow-x auto). The 'Open color input' control's right edge is at 353 while the dock's is at 351. The T glyph is cut by the stadium's right cap, and the rest is reachable only by a hidden horizontal scroll.
- **expected + canon** The glass dock README:50-52 scroll is a last-resort run cap, not a way to fit a fixed toolset. Every control must sit inside the plate at the mobile aperture.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/Dock.vue:204-213 + demo/shell/dock/layers/ActionBarLayer.vue (Back + separator + 5 actions + separator + color-input in the 390 aperture)
- **fix shape** At <sm drop the Back→actions separator and the trailing separator, or fold one action (Extract/Palettes) into an overflow; or tighten the compact register (--dock-compact-control-padding) for this layer only. Verify with the probe-2 overflow check.

#### UIA-V-9 · BROKEN · dock-action-bar-color · At 390px, input and propose modes scroll the Back button and the arm toggle out of the dock

- **source** audit #1 · **verdict** AMENDED · **state** input arm, propose arm · **where** /#/ at 390x844, light and dark, action bar → 'Open color input' → 'Propose color name'
- **frame** `dock-action-bar-color/` light-m-picker-06-input-arm-dock.png, light-m-picker-07-arm-next.png, dark-m-picker-06-input-arm-dock.png; capture-log.json light-m-picker-input / light-m-picker-arm2
- **observed** The dock is capped at 312px (x 39..351). In input mode the row grows to 419.9px. Back sits at x=15, partly outside the dock's left edge; the arm toggle sits at x=388, off the right edge of the 390px viewport; the lab() value is clipped. In propose mode Back is at x=-14, fully off screen. The frames show an empty seat in front of the separator. The only way back is a hidden horizontal scroll inside the dock (dock-scroll-x).
- **expected + canon** Every control in the active layer stays inside the dock at every viewport. glass dock README:69-72 says interactive controls keep a complete target, and the layer transition is supposed to share the dock spring, not overflow. The inactive sub-layer must not add to the dock's size.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/layers/ActionBarLayer.vue:135-150 (.dock-layer-grid stacks both sub-layers, so the grid is as wide as the widest face) + demo/shell/dock/ColorInput.vue:16 (the input has no width contract for the dock aperture)
- **fix shape** Size the sub-layer container to the ACTIVE face only. Either adopt glass DockCrossfade (README:25, 'the thin controlled face-swap primitive'), which sizes to the current face, or use grid-template-columns:minmax(0,1fr) with the inactive layer taken out of flow. Give ColorInput flex:1 1 0 and min-width:0 so it shrinks to the space left between Back and the toggle.
- **confirm** Confirmed for input mode. capture-log light-m-picker-input shows dock x 39..351, row 419.9px, back x 15, armToggle x 388.2, and light-m-picker-06-input-arm-dock.png shows the empty lead seat and the clipped lab() value. Propose mode is only half right. In light-m-picker-arm2 the arm toggle is back INSIDE the dock (x 287.9..339.4, capsule-filled), and light-m-picker-07-arm-next.png shows field + separator + '⋮' all seated. Only Back is lost there (x -14..32.8, which is entirely left of the dock's x=39, though not fully off the viewport). Code note: ColorInput already carries class min-w-0 (ActionBarLayer.vue:147), so the fix is the grid (.dock-layer-grid stacking both faces, ActionBarLayer.vue:136) plus the field's w-full/px-3 intrinsic width, not a missing min-width. Owner CONSUMER stands.

#### UIA-V-10 · BROKEN · dock-action-bar-color · At 390px the actions layer clips the 'Open color input' toggle 24px past the dock edge

- **source** audit #2 · **verdict** CONFIRMED · **state** actions sub-layer · **where** /#/, /#/palettes and /#/blob at 390x844, light and dark, actions sub-layer
- **frame** `dock-action-bar-color/` light-m-picker-01-actions.png, dark-m-picker-01-actions.png; capture-log.json light-m-picker-actions (dock x 39..351, arm x 327.9..374.7)
- **observed** The trailing separator draws at the dock's right cap and the 'T' toggle sits outside it. The control that opens the color input cannot be seen on a phone.
- **expected + canon** Every seat the scene declares shows inside the pill (dock README:61-72). A 7-control row has to fit the 312px aperture, or the dock has to decide what to drop.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/Dock.vue:204-213 (Back + separator + row + separator + arm in one 312px aperture) and demo/shell/dock/layers/ActionBarLayer.vue:154-173
- **fix shape** Make the seats uniform DockControls at the coarse size and drop the two DockSeparators below sm, as the main layer already does ('below sm the aperture holds controls only', Dock.vue:230-233). Or move Back into the dock's persistent slot. Check the fit at 390.

#### UIA-V-11 · BROKEN · dock-color-input · Opening the color input collapses the dock to the swatch orb and leaves the 'Enter a color' popover floating on its own

- **source** audit #1 · **verdict** AMENDED · **state** input mode, just opened (reproduced in 3 of 4 runs at 1440-light; the 4th run did not collapse) · **where** ActionBarLayer.vue:136-149 + @mkbabb/glass-ui/dock GlassDock collapse timer
- **frame** `dock-color-input/` docs/tranches/X/audit/ui-evidence/value/dock-color-input/1440-light-02-input-mode-resting.png, 1440-light-02p-probeA-3s-after-open.png (log: input-open dock 56x56 collapsed:true within 800 ms)
- **observed** The pointer rests where the user clicked 'Open color input'. Within 0.8 s the dock morphs to fit the 325px field, then collapses to the 56px swatch orb. Meanwhile the hover popover ('Enter a color / lab(...) / LAB l 92%... / outside srgb gamut') opens anyway and hangs beside the orb, pointing at nothing. Reaching the field takes another click to re-expand.
- **expected + canon** Entering the input arm is an explicit mode: the dock stays expanded while the arm is open, focus-within holds, or a hosted popover is open. The field receives focus. No popover opens that the user did not ask for.
- **owner** **CONSUMER**: GLASS (GlassDock collapse state machine — dock/README.md 'Interaction contracts': portaled popovers keep the dock open through the typed dock context; collapse must hold while a hosted popover is open or a layer is morphing) + CONSUMER (demo/shell/dock/layers/ActionBarLayer.vue:136-149 fit-content layer swap resizes the dock under the pointer)
- **fix shape** Glass: add the open-popover and focus-within collapse hold to the GlassDock state machine, and never start the collapse timer from a pointerleave caused by the dock's own morph. Consumer: while toolbarMode !== 'actions', seat the arm as an always-expanded hold and focus() the field on open (the watch at ColorInput.vue:255-268 only focuses in propose mode). Route the glass half to the glass-ui session.
- **confirm** The symptom is CONFIRMED. 02 and 02p show a 56px orb with the popover hanging to its right, and log row 4 has dock 56x56 collapsed:true, pop null at input-open. The owner split is wrong, though: this is mostly CONSUMER. Glass already provides both holds the finding asks glass to add. (1) glass Popover has a `keepDockOpen` prop that takes a dock keepOpen token while the popover is open (src/components/popover/Popover.vue:24,95, via useDockParticipation). It is also in the installed 7.0.0 dist (dist/components/popover/Popover.vue.d.ts:15). (2) useDockState.onMouseLeave returns early while keepOpenCount>0 (useDockState.ts:275-295), and GlassDock binds @focusin/@focusout (GlassDock.vue:349-350). The dock README :67 says the consumer wires overlay open state to keepOpen. ColorInput.vue:3-8 passes no keep-dock-open, and the field is never focused in input mode (the :253-268 watch focuses only when propose is true), so neither hold engages. Consumer fix: add keep-dock-open to the Popover (or take a keepOpen token while toolbarMode !== 'actions') and focus the field on open. The glass half should be narrowed to one PLAUSIBLE question for the glass session: does the dock's own content resize under a stationary pointer fire mouseleave? useDockState.ts:150-154 claims the hit frame never sweeps under the cursor. Do not relay 'add a popover/focus hold' to glass as a defect.

#### UIA-V-12 · BROKEN · dock-color-input · A successful propose leaves the toolbar in propose mode and fills the name field with the CSS color string

- **source** audit #2 · **verdict** CONFIRMED · **state** propose mode, after the 201 response · **where** ColorInput.vue:233-245; ActionBarLayer.vue:36,49-62
- **frame** `dock-color-input/` 1440-light-11-after-propose-success.png (log after-propose-success: toggles ['Close propose'], text 'lab(92% 88.8 20 / 82.7%)', send disabled:true opacity 1)
- **observed** After the request succeeds, the toggle still reads '⋮ Close propose'. The name field now shows 'lab(92% 88.8 20 / 82.7%)', i.e. a color string sitting in the name field. proposedName is '' so the arrow is disabled but still painted in the accent. There is no success confirmation. e2e/smoke/flows/color-propose.spec.ts ('a successful propose returns the toolbar to its actions state') asserts the opposite behaviour.
- **expected + canon** On success: emit to the parent so toolbarMode returns to 'actions' (or 'input'), announce success (glass toast/status), and never write the color serialization into the name field.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:233-245 (comment 'Signal parent to exit propose mode' at :239 has no emit; ActionBarLayer.vue never leaves 'propose')
- **fix shape** Add defineEmits(['proposed']) to ColorInput and emit after proposeColorName resolves. ActionBarLayer handles it by setting toolbarMode='actions'. Delete the innerText=formattedCurrentColor write at :240-242 in propose mode. Add a glass toast or aria-live 'Name proposed' confirmation.

#### UIA-V-13 · BROKEN · dock-color-input · Invalid-parse feedback is transient and swallowed: pressing Enter again on the same invalid text does nothing, and the error clears after 2 s while the bad text stays

- **source** audit #3 · **verdict** CONFIRMED · **state** invalid parse · **where** useColorParsing.ts:64 `if (!input \|\| input === previousInvalid) return;`
- **frame** `dock-color-input/` 1440-light-06-invalid-enter-400ms.png, 1440-light-06b-invalid-enter-again-same-text.png (log C-enter1+400ms err:true; C-enter1+3.2s err:false with text 'zzzz'; C-enter2-same-text+400ms err:false)
- **observed** The first Enter on 'zzzz' flashes the error. 2 s later the error clears while 'zzzz' is still in the field. A second Enter on the same text returns silently at the previousInvalid guard, so the user gets no feedback. The debounced path (2 s after typing) re-flashes once, and only for new text.
- **expected + canon** The invalid state is tied to the field content: it stays while the content is invalid and every submit of invalid content reports it. Glass has the grammar for this: the Input `invalid` prop (input/types.ts), and LabeledField's `invalid` flag plus #error slot (labeled-field/LabeledField.vue:25,59-66).
- **owner** **CONSUMER**: CONSUMER demo/color-session/useColorParsing.ts:51-64,87 (previousInvalid guard) and :56-60 (2000 ms auto-clear)
- **fix shape** Replace flashParseError/previousInvalid with a computed `invalid` derived from the last parse of the current text. Clear it only when the text changes to something valid. Bind aria-invalid and the glass invalid state. Keep the one-shot celebrate beat only as decoration on submit.

#### UIA-V-14 · BROKEN · dock-slug-edit-layer · A failed slug login is silent: the 404/409/429 copy goes to a ref that is never bound

- **source** audit #1 · **verdict** AMENDED (substance CONFIRMED) · **state** typed slug → submit → server 404 · **where** dock slug-edit layer · submit a slug the server does not know
- **frame** `dock-slug-edit-layer/` 1440-dark-08-switch-outcome-nonexistent-slug.png, 1440-light-08-…, 390-light-08-…
- **observed** The layer closes about 60ms after Enter and the dock returns to Home/Tools/Login. The server returns 404, which the console logs. No text, toast, role=alert or role=status appears anywhere (capture-log alerts=[]), and the user stays logged out with no explanation.
- **expected + canon** The authored copy ('Slug not found.', 'Already signed in as this slug.', 'Too many attempts.') appears in the surface the act was taken from, as the identity verdict already does at ProfileSection.vue:100-108.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/useSlugMigration.ts:62 (slugBarRef declared, bound nowhere; grep finds no template ref and no port export) + :133-137 (every error branch is `slugBarRef.value?.setError(...)`, so it is a no-op); SlugEditLayer.vue:54-56 closes the layer before the promise settles
- **fix shape** Have onSlugSwitch return or throw its outcome, or write it into the existing `identity` state (IdentityState 'failed'). Delete slugBarRef. SlugEditLayer awaits pm.onSlugSwitch, keeps the layer open on failure and renders the message under the field with role=alert.
- **confirm** Confirmed. useSlugMigration.ts:62 declares slugBarRef, :134-137 write to it, and the composable returns it at :175. usePalettePorts.ts:158-168 (sessionPort) does not forward it, and grep finds no binding anywhere in demo. Every error branch is therefore a no-op. SlugEditLayer.vue:54-56 closes the layer without awaiting. The console shows the 404 (1440-light-08 consoleErrors) and the frame shows nothing. Precision fix: capture-log alerts are not literally []; they hold live-region text ('Home view', 'Loading the scene…'). No error copy appears in any role=alert or role=status. The claim that there is 'no port export' should read 'returned by the composable but dropped by usePalettePorts'. Owner CONSUMER is correct.

#### UIA-V-15 · BROKEN · dock-slug-edit-layer · The 'switching' spinner can never show: onSlugSwitch is not awaited

- **source** audit #2 · **verdict** CONFIRMED · **state** switching (API delayed 2.5s via page.route) · **where** dock slug-edit layer · submit
- **frame** `dock-slug-edit-layer/` 1440-light-06-switching-60ms.png, 1440-dark-06-switching-60ms.dock.png, 1440-light-07-switching-660ms.png, 390-light-06/07
- **observed** At 60ms and at 660ms after submit, with the login request still in flight, the slug-edit layer is already gone (metrics: spinner=false, main layer visible, Login button back). Nothing indicates that a login is pending for the 2.5s the request takes.
- **expected + canon** Loader2 in the submit seat, with the field and controls disabled, until the login settles. The orphaned twin PaletteSlugBar.vue:24-26 already models this with aria-label 'Signing in…'.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/layers/SlugEditLayer.vue:54 (`pm.onSlugSwitch(...)` called without await, then :55-56 clear and close; :68-69 finally resets slugSwitching in the same tick); spinner markup at :108
- **fix shape** Make onSlugSubmit `await pm.onSlugSwitch(...)`, close only on success, and set aria-busy and a 'Signing in…' label while pending. Depends on the finding above, which makes onSlugSwitch report its outcome.

#### UIA-V-16 · BROKEN · dock-slug-edit-layer · Any string that is not a 4-word slug becomes an admin token: a typo logs you out and turns on admin mode

- **source** audit #3 · **verdict** CONFIRMED · **state** malformed slug 'brave-quiet-amber' (3 words) submitted; also 'dev' · **where** dock slug-edit layer · submit
- **frame** `dock-slug-edit-layer/` 1440-light-09-malformed-slug-submitted.png, 390-light-09-malformed-slug-submitted.png, 1440-light-05-admin-token-submitted.png
- **observed** The 3-word typo is stored as palette-admin-token='brave-quiet-amber'. The user slug is cleared, the route jumps to #/palettes, and the dock turns gold with an 'admin' pill (metrics adminPill=['admin']). A logged-in user who mistypes their slug loses their identity and silently enters an unverified admin mode.
- **expected + canon** The field classifies input explicitly. A slug-shaped near miss is rejected with inline copy. An admin token is verified by the server (for example a HEAD against an admin endpoint) before the client clears the user identity or claims admin mode.
- **owner** **CONSUMER**: CONSUMER — SlugEditLayer.vue:25-27,45-46 (`isAdmin = !looksLikeSlug(normalized)`) + useSlugMigration.ts:104-108 (clearUserSlug(), then adminLogin(value), then route to palettes) + demo/platform/auth/useAdminAuth.ts:35-38 (stores the token with no server check)
- **fix shape** Split the classification three ways: 4-word slug → login; `ADMIN_TOKEN=` prefix or a verified token → admin; anything else → inline 'Not a slug' error. Verify the token before calling clearUserSlug. Put looksLikeSlug and normalizeTokenInput in one shared module (see the duplicate-twin finding).

#### UIA-V-17 · BROKEN · dock-slug-edit-layer · At 390 the Cancel control is clipped out of the dock and Generate is half cut off

- **source** audit #6 · **verdict** CONFIRMED · **state** empty field / typed slug, both themes · **where** dock slug-edit layer at 390x844 (coarse pointer)
- **frame** `dock-slug-edit-layer/` 390-light-01-empty-field.png, 390-light-02-empty-tab-focus.dock.png, 390-dark-01-empty-field.dock.png, 390-light-03-typed-slug.dock.png
- **observed** The dock stadium ends around x=350. The RefreshCw glyph is sliced at the rim, and the Cancel X (box x=363..407) is not visible at all. A phone user cannot cancel except by collapsing the dock, since phones have no Escape.
- **expected + canon** Every control of the layer sits inside the aperture at 390, and the field flexes to the room that is left.
- **owner** **CONSUMER**: CONSUMER — SlugEditLayer.vue:95 (fixed `w-40` field) + :160-162 (every seat lifted to the 44px coarse floor): measured content 354px (input 160 + submit 44 + separator + regen 44 + cancel 44 + gaps) inside the ~312px aperture at 390w (Dock.vue S.W7-2 note)
- **fix shape** Make the field `flex-1 min-w-0` instead of w-40, keep submit and cancel, and move Generate out of this layer (menu only). This fits in 312px as field ~160 + 2×44 + gaps.

#### UIA-V-18 · BROKEN · dock-mobile-menu · GitHub row: `as-child` is ignored by glass DropdownMenuItem, so the row is a DIV menuitem wrapping an inline <a>. Keyboard Enter and taps on the row padding do nothing, and the icon stacks above the label

- **source** audit #1 · **verdict** AMENDED · **state** menu open; keyboard focus on GitHub; Enter · **where** all themes, 390 menu open (in+out) and the 1440 desktop twin
- **frame** `dock-mobile-menu/` light-390-out-3-keyfocus.png, light-390-in-1-open.png, light-1440-in-1-desktop-twin-open.png; probe-github-enter.mjs output
- **observed** DOM is <div role=menuitem class='dropdown-menu__item … text-small gap-2'><a>…GitHub</a></div>. The row is 55px tall where the other rows are 44px, and the icon sits on its own line above 'GitHub'. Enter on the focused row closes the menu and opens no page (pages 1→1). A tap on the row's right padding also opens nothing. Only a tap on the anchor text itself navigates.
- **expected + canon** The whole row is the link: activating it with Enter or a tap anywhere on the row opens the repo. The icon and label sit inline like every other row. Canon: a glass primitive owns interaction; the consumer does not hand-roll a link inside an item.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/MobileMenuDropdown.vue:111-118 (twin demo/shell/dock/menus/ProfileSection.vue:177); GLASS DropdownMenuItem (glass-ui/src/components/menu/DropdownMenuItem.vue:7-14 has no asChild prop, so the attribute falls through)
- **fix shape** GLASS: support `asChild` on DropdownMenuItem (forward it to the reka primitive) or ship a DropdownMenuLinkItem. CONSUMER, until then: drop the nested <a> and call window.open(repo, '_blank', 'noopener') from @select, so the row itself is the command. Apply the same fix to both twins.
- **confirm** Reproduced: Enter on the focused GitHub row leaves pages at 1→1; the row is 55px on coarse and 46px on fine pointer where the other rows are 44; the outerHTML is a div[role=menuitem] with an <a> inside; the svg computes display:block, which is why it stacks, and the icon also stacks on fine pointer (c-light-390-in-open-fine.png). The GLASS fix is wrong. Glass removed the polymorphic API on purpose: glass-ui/src/components/_shared/primitive.ts:23 POLYMORPHIC_ATTRS = {as, asChild, as-child} are stripped by fixedHostAttrs ('without reviving a retired polymorphic API'), and DropdownMenuItem.vue:38 hard-codes as="div". Re-adding asChild at glass would reverse a deliberate ruling. Owner: CONSUMER now, with @select → window.open(repo,'_blank','noopener') in both twins. A request for a first-class link item (href prop or DropdownMenuLinkItem) can go to glass as an idea, not as a bug. Severity BROKEN stands.

#### UIA-V-19 · BROKEN · dock-profile-menu · A failed 'Regenerate slug' signs the user out but the menu keeps showing the old identity

- **source** audit #1 · **verdict** CONFIRMED · **state** profile menu open, identity verdict = failed · **where** ProfileSection.vue:96-108 (verdict render); root cause in useUserAuth.regenerate
- **frame** `dock-profile-menu/` light-1440-8-failed-crop.png, light-1440-9-after-failed-closed-crop.png, light-1440-10-after-failed-reload-crop.png (dark-1440-* identical)
- **observed** With POST /sessions returning 503, the verdict reads 'The new slug was not issued: Service Unavailable'. The header pill still shows the old slug (woven-nesting-pearl-toad / smoky-dipping-citrine-stork) and the dock still says 'Profile'. But regenerate() already DELETEd the session and removed palette-user-slug and the token from storage: localStorage slug = null, and the console shows a 401. After a reload the dock shows 'Login', so the user was signed out and the verdict never said so.
- **expected + canon** A failed identity act leaves the prior identity intact, or the UI and the verdict truthfully report the sign-out. The CARRY LOCK comment at ProfileSection.vue:96-99 promises that the act's outcome is what gets rendered.
- **owner** **CONSUMER**: CONSUMER demo/platform/auth/useUserAuth.ts:112-126 (regenerate) + demo/palettes/useSlugMigration.ts:87-100
- **fix shape** Issue the new session first and revoke the old one only after success. On failure keep the old slug and token persisted. If revoking first is unavoidable, clear the slug ref on failure and say 'You were signed out; the new slug was not issued'.

#### UIA-V-20 · BROKEN · dock-profile-menu · Signing in with an unknown slug fails silently: the error goes to an unmounted PaletteSlugBar

- **source** audit #2 · **verdict** CONFIRMED · **state** slug-edit sign-in (the reach into this menu), failure · **where** useSlugMigration.ts:124-128 slugBarRef.value?.setError(...); SlugEditLayer.vue:53 un-awaited pm.onSlugSwitch then :55 slugEditMode=false
- **frame** `dock-profile-menu/` light-1440-13-login-typed.png → light-1440-14-login-unknown-slug-result.png (dark-1440-14 same)
- **observed** POST /sessions/login returned 404. No 'Slug not found' appears anywhere; the layer closes at once and the dock goes back to 'Login'. slugBarRef is only ever bound by PaletteSlugBar, and grep finds that component mounted nowhere in demo/. SlugEditLayer's own slugError/catch (:56-66) is unreachable because onSlugSwitch is not awaited.
- **expected + canon** The failed sign-in shows its reason in the surface where it was attempted. The 409/404/429 copy authored at useSlugMigration.ts:124-127 is never shown.
- **owner** **CONSUMER**: CONSUMER demo/palettes/useSlugMigration.ts:117-128 + demo/shell/dock/layers/SlugEditLayer.vue:53-55
- **fix shape** Await onSlugSwitch in SlugEditLayer. Keep the layer open until the result arrives, and return or throw the ApiProblem so the layer's slugError renders the authored copy. Delete the dead slugBarRef/PaletteSlugBar path.

#### UIA-V-21 · BROKEN · dock-profile-menu · Admin: any string that is not slug-shaped grants a gold 'admin' identity with no server check, and nothing in the dock lets the user leave it

- **source** audit #3 · **verdict** CONFIRMED · **state** admin (no slug), gold 'admin' pill in place of the menu · **where** ProfileSection.vue:115 inert <span class=slug-pill gold-shimmer>
- **frame** `dock-profile-menu/` light-1440-11-admin-crop.png, dark-1440-11-admin-crop.png, light-1440-12-admin-hover-crop.png, light-390-12-admin-menu-crop.png, dark-390-12-admin-menu-crop.png
- **observed** Typing 'audit_admin_token_x' stores it as the admin token with no API verification, and the dock shows a gold stadium 'admin' pill. The pill is a span (tabindex -1, no role); clicking it opens nothing. Login is hidden (v-else-if), and useAdminAuth().logout() has zero callers in demo/. The 390 twin's menu has only the muted 'admin' label, with no Login, Switch or Sign-out row. A user who mistypes a slug (not exactly four a-z words) is silently promoted to a fake admin and stranded there until they clear site data.
- **expected + canon** Admin is an identity state with the same menu idiom as a user: a trigger opening a menu with 'Sign out of admin' and 'Switch account'. The token is verified before the identity is claimed. A string that is not slug-shaped and fails verification gets an error, not a promotion.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue:113-117 + MobileMenuDropdown.vue:84-88 + SlugEditLayer.vue:25-27,43 + demo/platform/auth/useAdminAuth.ts:35-43
- **fix shape** Render admin through the same DropdownMenu trigger (label 'admin'), with rows Switch account and Sign out (adminAuth.logout). In onSlugSwitch, validate the token against an admin endpoint before adminLogin. Tell the user in the slug layer when the input is neither a slug nor a valid token.

#### UIA-V-22 · BROKEN · dock-mbabb-menu · GitHub row: as-child is silently dropped, so the icon stacks above the label and only the text itself navigates

- **source** audit #1 · **verdict** CONFIRMED · **where** dock @mbabb menu, open state, GitHub row: all 4 viewport/theme combinations
- **frame** `dock-mbabb-menu/` 1440-light-2b-open-zoom.png, 1440-dark-4-kbd-focus.png, 390-light-2-open.png, 390-dark-2b-open-zoom.png, 1440-light-7-github-padding-click.png, probe-github-row.json
- **observed** The row renders as DIV[role=menuitem] > A(display:block) > svg(display:block). The GitHub glyph sits on its own line with 'GitHub' wrapped under it, so this row is 49px tall against 44px for its siblings (45.6 vs 44 at 390). The anchor covers only 54x37 of the 201x49 row. Pressing Enter on the highlighted row, or clicking the row's padding, closes the menu and navigates nowhere (no popup opened in probe-github-row.json).
- **expected + canon** Every menu row is one flex line: icon then label, on the glass .menu__item grid (overlay-plate.css:191-203). Activating the row by keyboard or anywhere on its box opens the link. Glass retired the polymorphic API, so a consumer may not rely on as-child.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue:177-184 (twin: demo/shell/dock/menus/MobileMenuDropdown.vue:111-119). Glass rider: glass-ui src/components/_shared/primitive.ts:24-32 fixedHostAttrs silently strips as/asChild/as-child from DropdownMenuItem (DropdownMenuItem.vue:31-38, hard `as="div"`) with no dev warning and no link-row replacement
- **fix shape** Consumer: drop as-child and the inner <a>. Render the icon and 'GitHub' as the item's direct children and handle @select with window.open('https://github.com/mkbabb/value.js','_blank','noopener'). Fix both twins at once, or through the shared component in the cohesion finding below. Glass (route to the glass-ui session): add a first-class link row (e.g. DropdownMenuItem href/target) and emit a dev warning when a retired polymorphic attribute is passed.

#### UIA-V-23 · BROKEN · dock-mbabb-menu · 'Share color' copies a URL that does not contain the color

- **source** audit #2 · **verdict** CONFIRMED · **where** dock @mbabb menu → Share color → 'Copied!', every viewport and theme
- **frame** `dock-mbabb-menu/` 1440-light-5-copied.png, 1440-dark-5-copied.png, 390-light-5-copied.png, 390-dark-5-copied.png; clipboard readback in capture-log-run1.json / capture-log.json (.runs[].clipboard)
- **observed** The picker showed Lab 92.0%, 88.8, 20.0 (restored from storage). The clipboard held 'http://localhost:9000/#/' in all 4 runs: no ?space= or ?color=. A recipient opening that link gets the default color or their own stored color. The UI still says 'Copied!' as if it succeeded.
- **expected + canon** The row is labeled 'Share color', so the copied link must reproduce the sharer's current color whether or not they have edited it this session. The URL-seed contract in useColorUrl expects both halves, #/?space=…&color=….
- **owner** **CONSUMER**: CONSUMER demo/color-picker/App.vue:529-531 (copies window.location.href) with demo/color-session/useColorUrl.ts:115-139 (the query is written only after a live edit; the storage-restored boot color is never put in the address)
- **fix shape** Build the share URL from the model instead of reading location.href: router.resolve({ query: { ...route.query, space, color: serialize(model.color) } }).href, reusing the serializer at useColorUrl.ts:92-94. Alternatively, write the address once at mount after the reconciliation.

#### UIA-V-24 · BROKEN · palettes-view · 'Add current color' slot is dead: click adds nothing, and it is an aria-hidden span, not a button

- **source** audit #1 · **verdict** AMENDED · **state** CONFIRMED · **where** palettes-view · current-palette editor · add slot (all viewports and themes)
- **frame** `palettes-view/` swatchhover__1440__light.png + probe-swatch.mjs output (tree d5b8ed76 dirty=5)
- **observed** The add slot renders as <span aria-hidden="true" data-testid="watercolor-swatch" class="add-slot-ghost ...">. No aria-label, no role, no Vue listener bound (_vei none). A real pointer click at its center leaves the count at '4 colors' before and after. The consumer passes tag="button", :aria-label and @click to WatercolorDot. Installed glass 7.0.0 watercolor-dot.js declares only color/variant/animate/cycleDuration/range/seed, always renders a span and forwards only class+style, so all three are dropped. The TooltipTrigger as-child handlers are dropped too, so the tooltip never shows.
- **expected + canon** The pane's primary constructive verb (add the live color to the palette) is a real, named, focusable button (glass Button canon DESIGN.md:925-944: iconOnly needs aria-label).
- **owner** **GLASS+CONSUMER**: CONSUMER demo/palettes/browser/card/CurrentPaletteEditor.vue:95-105 (also a GLASS contract gap: the pinned 7.0.0 WatercolorDot has no tag prop and forwards only class/style) · *glass component* WatercolorDot (7.0.0: no tag/slot, pointer-events:none; relocated out of glass at BK #55) · *head* open-at-HEAD
- **fix shape** Wrap the dot in a real control: glass <Button emphasis="text" icon-only :aria-label=... @click=addCurrentColor> with WatercolorDot as a decorative child (aria-hidden). Do the same for every WatercolorDot tag="button" site (SwatchHoverMenu.vue:14-20, 29-36). Relay to the glass BK letter that WatercolorDot has no documented passthrough contract, and it appears to be pruned from current glass source.
- **confirm** Confirmed and worse than reported. In the dist (watercolor-dot.js:79-110) the span also carries an inline pointerEvents:'none' and has no renderSlot, so the <Plus> child (CurrentPaletteEditor.vue:104) is dropped. The add slot shows as an empty dashed blob with no '+' in every frame (loaded__1440__light.png, searchnone__1440__dark.png). Glass src/components has no watercolor-dot directory, so the relay point stands: WatercolorDot has been pruned at the root. The fix is right: WatercolorDot stays decorative inside a glass Button.

#### UIA-V-25 · BROKEN · palettes-view · Desktop swatch action menu (edit/copy/remove) renders off-screen and unstyled: .floating-panel is a retired glass class

- **source** audit #2 · **verdict** AMENDED · **state** CONFIRMED · **where** palettes-view · current palette · hover a swatch at 1440 (also PaletteCardSwatches in the selected card, same component)
- **frame** `palettes-view/` swatchhover__1440__light.png (probe: HOVER-PANEL rect=0,900 1440x40 bg=rgba(0,0,0,0) position=static aria-hidden=true buttons=3)
- **observed** Hovering swatch 3 teleports <div class="floating-panel"> to the end of <body>. It is position:static, transparent, radius 0, no shadow or backdrop, 1440 px wide at y=900 (below the viewport), so nothing appears. The floatingStyle top/left is inert. The panel carries aria-hidden="true" while holding 3 buttons. glass-ui src/styles/index.css:124-130 records .floating-panel as RETIRED (zero consumers), and it is absent from the installed 7.0.0 dist and from demo styles. The swatch click path is dead too (listener dropped). Net effect: current-palette swatches cannot be edited, copied or removed on a fine pointer.
- **expected + canon** One accessible overlay path: a glass Popover (the rung-3 chrome overlay plate, demo/DESIGN.md Surfaces rung 3) anchored to a real swatch button, keyboard-openable, never aria-hidden over interactive children.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/card/SwatchHoverMenu.vue:37-50 (+ :29-36, where the swatch @click.stop is dropped by WatercolorDot)
- **fix shape** Delete the Teleport/canHover fork. Use glass Popover for both pointers (open on hover-intent and on click/Enter) with PopoverContent holding glass icon Buttons. Make the swatch a real button (see the add-slot finding).
- **confirm** The hover path is confirmed. SwatchHoverMenu.vue:40-50 teleports class="floating-panel" with aria-hidden, and glass src/styles/index.css:124-130 records the class as retired. The touch path is dead as well, so this is not only 'on a fine pointer'. SwatchHoverMenu.vue:9-22 uses PopoverTrigger as-child on WatercolorDot, which forwards only class and style and paints pointer-events:none, so the trigger's click, aria and data attributes never reach a hit target. Source only, since the 390 swatch popover was not captured, but the dist render function is decisive. Current-palette swatch verbs are unreachable on every pointer.

#### UIA-V-26 · BROKEN · palettes-view · Search with no matches claims 'No saved palettes yet. Add colors, then save.' while 4 are saved

- **source** audit #3 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · search filtering (q=zzzz) · 1440 and 390, light and dark
- **frame** `palettes-view/` searchnone__1440__dark.png, searchnone__1440__light.png, searchnone__390__light.png
- **observed** Header badge reads 4, yet the empty state under the list says the library is empty and tells the user to add colors. Nothing says the search is filtering or offers to clear it. The header count still says 4 while 0 show.
- **expected + canon** STATES: filtered-empty is distinct from true-empty (EmptyState copy 'No palettes match "zzzz"' + a clear-search action); the count reads 'n of N' while filtering.
- **owner** **CONSUMER**: CONSUMER demo/palettes/PalettesPane.vue:98-103 (static empty-text/hint) + demo/palettes/browser/card/PaletteCardGrid.vue:21-26
- **fix shape** Pass a filtered flag (searchQuery non-empty && savedPalettes.length>0) and switch EmptyState message/hint/action. Bind the header badge to 'filtered/total' while a query is active.

#### UIA-V-27 · BROKEN · palettes-view · Touch swatch popover is dead too (PopoverTrigger as-child on an attr-swallowing, pointer-events:none span)

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `palettes-view/` not captured (the 390 light session was lost to saturation); source-proven
- **observed** WatercolorDot has inheritAttrs:false and forwards only class/style, with inline pointerEvents:'none' (watercolor-dot.js:80,106-110), so reka's trigger handlers and aria-expanded never land. Per-color verbs are unreachable at every width.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/card/SwatchHoverMenu.vue:9-22

#### UIA-V-28 · BROKEN · palette-scene-actions · Edit tags opens the tag editor unanchored at the viewport's top-left corner

- **source** audit #1 · **verdict** CONFIRMED · **state** owned remote palette selected -> dock 'Edit tags' (the card menu uses the same popover) · **where** demo/palettes/BrowsePane.vue:152-159 mounts <TagEditPopover> with no #trigger slot. demo/palettes/browser/search/TagEditPopover.vue:2-6 has PopoverTrigger around an empty slot.
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/light-1440-14-tags-from-dock.png (also dark-1440-14-tags-from-dock.png, sheet-light-390-c.png frame 4)
- **observed** The TAGS popover renders at box {x:0,y:4,w:208} (capture-log-*.json step 14). At 390 it covers the dock and the seat's hover card. It is not attached to the card or to the seat that opened it.
- **expected + canon** A glass Popover is anchored to its trigger or anchor (glass-ui src/components/popover). The editor should open on the selected palette, or on the seat that dispatched it.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Give TagEditPopover a PopoverAnchor bound to the selected card's element, or to the dispatching dock seat. Alternatively, make it a placed Dialog. Never mount PopoverContent without an anchor.

#### UIA-V-29 · BROKEN · palette-card-menu · Destructive and muted item tones never paint: Delete, Delete (admin) and Report render in plain ink

- **source** audit #1 · **verdict** CONFIRMED · **state** all menu-open states · **where** browse and palettes · menu open · owner, other-user and admin states · both themes
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/menu-owned-1440-light.png; menu-admin-feature-1440-dark.png; menu-saved-local-390-dark.png
- **observed** Computed color is identical on every row, including Delete and Delete (admin): rgb(28,25,23) in light and rgb(233,230,226) in dark. The cascade probe shows `.text-destructive` (layer utilities) losing to the unlayered `.dropdown-menu__item{color:inherit}`. A destructive verb looks the same as Rename.
- **expected + canon** Destructive verbs read in the --destructive tone and Report reads de-emphasized, set by a glass primitive axis rather than a consumer class override.
- **owner** **GLASS+CONSUMER**: GLASS: DropdownMenuItem. The installed glass-ui 7.0.0 dist/components/dropdown-menu/styles.css ships UNLAYERED `.dropdown-menu__item{color:inherit;font-size:var(--dropdown-text)}`, which beats every layered utility. glass-ui HEAD src/components/menu/DropdownMenuItem.vue:7-13 still has no destructive/tone variant. CONSUMER: demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:135, :145, :164 (text-destructive / text-muted-foreground class overrides that are dead) · *glass component* DropdownMenuItem (dist/components/dropdown-menu/styles.css) · *head* open-at-HEAD
- **fix shape** GLASS: move the item sheet into @layer components (HEAD's menu.css already does this) and add `variant: default \| destructive` (and a muted tone) to DropdownMenuItem. CONSUMER: after adoption, replace the class strings at :135/:145/:164 with `variant="destructive"`, then verify with a computed-color readback.

#### UIA-V-30 · BROKEN · browse-view · 390: the colour-count badge is clipped and covered by the '+N' tag chip; the palette name truncates to 5 characters

- **source** audit #1 · **verdict** AMENDED · **state** loaded, 390, both themes · **where** Collapsed palette card head row at 390
- **frame** `browse-view/` probe-row390__sunset__dsf2.png; loaded__390__dark.png; loaded__390__light.png
- **observed** On Sunset Coast the colour-count Badge '5' spans x194-207 and is hidden under the '+2' button (x201-226); only a dark half-disc shows. The head's overflow:hidden backstop clips the badge the source calls 'priority 2, always stays'. The name renders 80px wide as 'Sunse…', while 23px of empty gap sits before the Featured mark. Every card at 390 truncates its name ('Forest Fl…', 'Neon Ar…', 'A Very Long …').
- **expected + canon** Per the source's own declared priority (PaletteSpecimen.vue:137-139), the name and the count never collapse, and no control overlaps another. The name is the card's primary content and should get the most width.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/browser/card/PaletteSpecimen.vue:116-133 (head overflow:hidden + name min-inline-size 5rem) · demo/palettes/PaletteInspector.vue:448 (grid auto minmax(0,1fr) auto auto) · demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue:28
- **fix shape** Below 30rem of card width, move the meta cluster (tags and vote) to its own grid row, or fold it into the ⋯ menu, so the head row holds name + count + menu. Give the head a min-content floor large enough for the count badge, and never rely on the overflow clip to settle the layout.
- **confirm** probe-row390__sunset__dsf2.png shows the Sunset Coast count badge clipped to a dark half-disc under '+2', with 'Sunse…' and an empty gap before the Featured mark. PaletteSpecimen.vue has head overflow:hidden and name min-inline-size min(5rem,100%) as cited. Amendment: the claim that every card truncates is refuted by loaded__390__light.png, where 'Quiet Greys' renders in full. The overlap bug itself is confirmed only on Sunset Coast (the card with the Featured mark). Truncation hits the four longer names.

#### UIA-V-31 · BROKEN · browse-view · Cards cannot be selected by keyboard: the entity inspector and the dock palette scene need a mouse click

- **source** audit #2 · **verdict** CONFIRMED · **state** loaded → focus walk (Tab ×3 from search) · **where** PaletteInspector root
- **frame** `browse-view/` focus__1440__light.png
- **observed** Tabbing from the search field goes filter trigger → '+2' → '12 votes' button (the focus lands on the vote button in the frame). The card itself is never a tab stop, and there is no Enter/Space handler. The only way to select a palette — which unfurls the detail and registers the dock palette scene (Back/Save/Remix/Vote/Export) — is a pointer click.
- **expected + canon** Selecting a palette is the page's main interaction and must be reachable by keyboard, with aria-expanded/aria-selected set.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/PaletteInspector.vue:14-23 (root <div role=article @click> with no tabindex or key handler)
- **fix shape** Make the specimen head a real <button aria-expanded> (or give the root tabindex=0 with Enter/Space and a focus-ring). Keep the inner controls as separate tab stops.

#### UIA-V-32 · BROKEN · browse-search-filter · Filters popover runs past the viewport: Find by Color (1440) and Clear all (390) cannot be reached

- **source** audit #1 · **verdict** CONFIRMED · **state** filters popover open / active filters · **where** /#/browse · Filters popover open · 1440x900 and 390x844, both themes
- **frame** `browse-search-filter/` FAIL-1440-light.png, p2-filters-wheel-1440-light.png, filters-open-390-light.png, active-filters-popover-390-dark.png, FAIL-390-light.png
- **observed** At 1440 the popover measures 240x633 from y=352, so its bottom is at 985 in a 900px viewport. The 'FIND BY COLOR' label is cut at the bottom edge, and the swatch (y=918) and color field sit below the fold. At 390 the popover measures 621px from y=267 (bottom 888 of 844). With active filters it grows to 682px, and 'Clear all filters' sits at y=875, off screen. Neither the popover nor the page scrolls: a wheel over the popover only scrolls the inner 112px tag list. Playwright's real click timed out on both controls (pass-1 FAIL frames). Pass 2 could only reach them with DOM .click().
- **expected + canon** An anchored overlay never extends past the viewport. The popover should either scroll or flip/cap to the available height, as glass already does for the menu and tooltip roles (overlay-plate.css:72-81, 'Capping without the scroller would clip the tail silently, which is the masking fallback house law bars'). At glass HEAD the panel role adds `overflow:hidden` (overlay-plate.css:68) with no cap, so after the repin this becomes a silent clip instead of an overflow.
- **owner** **GLASS+CONSUMER**: GLASS (PopoverContent panel role: src/styles/glass/overlay-plate.css:84-89 — the panel role [data-reveal=overlay] has no max-block-size, while the menu role at :75-81 and the tooltip role both cap at --reka-popper-available-height) + CONSUMER (demo/palettes/browser/search/SearchFilterBar.vue:16 PopoverContent class 'w-60 p-0' with no block cap; :49 nested max-h-28 scroller) · *glass component* PopoverContent (src/styles/glass/overlay-plate.css:84-89) · *head* open-at-HEAD
- **fix shape** GLASS: give .glass-overlay-plate[data-reveal=overlay] the same max-block-size: min(var(--overlay-max-block), var(--reka-popper-available-height, …)) + overflow-y:auto as the menu arm. CONSUMER: shrink the panel so it fits without scrolling. Move Sort into a glass Select or ToggleGroup and Tier into a single Featured toggle Chip. Drop the nested max-h-28 scroller and let the plate itself scroll.

#### UIA-V-33 · BROKEN · browse-search-filter · The typed color field ignores anything that is not a 6-digit hex, though its placeholder advertises hsl()

- **source** audit #2 · **verdict** CONFIRMED · **state** color text 'hsl(120 100% 25%)' + Enter · **where** /#/browse · Filters popover · Find by Color text field
- **frame** `browse-search-filter/` p2-color-hsl-1440-light.png, p2-color-hsl-390-dark.png (manifest-pass2.json hslState)
- **observed** Typing hsl(120 100% 25%), a dark green, and pressing Enter searched the swatch colour #4488cc (blue) instead. The only result was 'Harbour Dusk' (blue); 'Quiet Moss' (green) did not match. The field still shows the hsl text, so what it says and what it searched disagree. There is no error or invalid state. The same code rejects #rgb, #rrggbbaa, rgb(), oklch() and named colours, although the file already imports parseColorIn (value.js's own parser).
- **expected + canon** A field labelled '#hex, hsl(...)' parses what it advertises, and value.js is a CSS-colour library. Unparseable input should show an invalid state (glass Input aria-invalid), not silently substitute another colour.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/SearchFilterBar.vue:217 (applyColorSearch accepts only /^#[0-9a-f]{6}$/ and otherwise silently uses pickerHex); placeholder at :92
- **fix shape** Parse colorText with parseColorIn(text, 'oklab'). On failure set aria-invalid and a caption, and do not emit. Sync pickerHex from the parsed colour so the swatch matches the query.

#### UIA-V-34 · BROKEN · tag-edit-popover · The tag popover has no anchor: it opens pinned to the viewport's top-left corner from every reach

- **source** audit #1 · **verdict** CONFIRMED · **state** open · **where** /#/browse, open state, all 4 viewport/theme combinations, reached from the card menu and from the dock
- **frame** `tag-edit-popover/` 1440-light-02-open.png, 1440-dark-04-tag-added.png, 390-light-02-open.png, 390-dark-09-save-failed-open.png, 1440-light-14-open-from-dock.png
- **observed** The dialog box measures x=0, y=4, w=208 in every capture, far from the card or dock button that opened it. At 390 it covers the dock's search and kebab controls and the Browse scene title.
- **expected + canon** A floating surface sits next to the control that opened it (glass popover placement: side/align/sideOffset, avoidCollisions). A menu-item or dock-verb reach should anchor to the card's menu trigger or the inspector.
- **owner** **GLASS+CONSUMER**: CONSUMER demo/palettes/BrowsePane.vue:152-158 (TagEditPopover is rendered with no #trigger slot) + demo/palettes/browser/search/TagEditPopover.vue:3-5 (PopoverTrigger as-child wraps an empty slot); GLASS popover (src/components/popover/index.ts exports no PopoverAnchor; PopoverTrigger.vue:25 strips `reference`), so a popover opened from code cannot be anchored · *glass component* PopoverAnchor (src/components/popover/index.ts) · *head* open-at-HEAD
- **fix shape** GLASS: export a PopoverAnchor, or accept a `reference` (virtual element) on Popover/PopoverContent instead of stripping it. CONSUMER: anchor to the card's ... trigger or the inspector element. At 390, present the editor in the glass Sheet (bottom) instead of a floating popover.

#### UIA-V-35 · BROKEN · tag-edit-popover · A failed tag save leaves the unsaved tag shown as applied: the card count stays and the checkbox stays checked

- **source** audit #2 · **verdict** CONFIRMED · **state** tag added (save failed) · **where** /#/browse, tag added with PATCH /palettes/owned-one returning 500
- **frame** `tag-edit-popover/` 1440-light-09-save-failed-open.png, 390-dark-09-save-failed-open.png, 1440-light-10-save-failed-closed.png
- **observed** PATCH {tags:[cool,pastel]} returned 500. 'pastel' stays checked in the popover and the card goes from +1 to +2. The error ('The tags were not saved: Server exploded') appears only as a card rail verdict, away from the act; after close it is gone and the card still shows +2.
- **expected + canon** The failure is shown where the user acted (W7 failure-dispositions row 3) and the displayed state matches the server: the change is rolled back or marked unsaved.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/TagEditPopover.vue:76-77 (emits update:tags BEFORE saveTags and ignores its result) + demo/palettes/BrowsePane.vue:423-431 (onTagsUpdated writes the tags into remotePalettes unconditionally)
- **fix shape** Emit update:tags only after saveTags resolves with a palette, or restore the previous tags when it returns undefined. Render tagEdit.error inside the popover as role=alert under the list.

#### UIA-V-36 · BROKEN · version-history-drawer · No row is ever marked current, so Revert is offered on the live version too

- **source** audit #1 · **verdict** CONFIRMED · **state** open with versions · **where** version-history-drawer · open with versions (every state)
- **frame** `version-history-drawer/` open-versions__1440__light.png, row-hover__1440__dark.png, open-versions__390__light.png (manifest: currentMarked=0, revertButtons=4 of 4 rows on every frame)
- **observed** The drawer compares `version.hash === currentHash`. Since X-W3 the list `hash` is the RELEASE id (_id, api routes/versions.ts:12,52), while `Palette.currentHash` is the PAYLOAD hash (service/versions.ts:231; model.ts:140 says payloadHash 'Mirrors Palette.currentHash'). The two can never be equal. As a result no row shows the ring, the inset bar or '(current)', and the newest (live) v4 carries a Revert button. Reverting to it writes a duplicate revision (versionCount+1). The client PaletteVersion type has no `payloadHash` field at all.
- **expected + canon** The live version is marked and cannot be reverted to. The drawer should compare like with like, as the X-W3 identity split requires (routes/versions.ts:11-13).
- **owner** **CONSUMER**: CONSUMER (demo/palettes/browser/dialog/VersionHistoryDrawer.vue:26,30,38,76 · demo/palettes/types.ts:66-77)
- **fix shape** Add `payloadHash` to the client PaletteVersion type and compare `version.payloadHash === currentHash`, or have the palette envelope carry the current release id. Hide Revert on the matched row. Add a unit test pinning the identity pair.

#### UIA-V-37 · BROKEN · version-history-drawer · Revert is invisible on touch but still hit-testable, so a blind tap reverts

- **source** audit #2 · **verdict** CONFIRMED · **state** open with versions (touch) · **where** 390x844 · open with versions / row tap
- **frame** `version-history-drawer/` row-hover__390__dark.png, open-versions__390__light.png (btn opacity 0, 84x44 hit box at the row's lower-left)
- **observed** The button is `opacity-0 … group-hover:opacity-100`. On a touch viewport a tap never produces hover, so tapping the row shows nothing (row-hover__390). The 84x44 button stays fully clickable while invisible, so restore cannot be discovered, and a tap on the empty lower-left of a row fires an unconfirmed revert.
- **expected + canon** Destructive row actions stay visible on touch (or sit in a row menu). An invisible element never receives input.
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:79)
- **fix shape** Show Revert at rest (quiet emphasis), or reveal it with `@media (hover:hover)` only and use `pointer-events-none` while hidden. Better: a per-row action slot that is always present.

#### UIA-V-38 · BROKEN · version-history-drawer · Client revert sends no If-Match and no Idempotency-Key, so every real revert returns 428

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `version-history-drawer/` routes/versions.ts:81-85 calls assertIfMatch(c.req.header('If-Match'), paletteETag(current)). etag.ts:89-94 throws PreconditionRequiredError when If-Match is absent, and the route doc (:6-8) makes Idempotency-Key REQUIRED too. revertPalette() passes neither `ifMatch` nor `idempotencyKey`, while updatePalette/publish do (api/palettes.ts:85-101, paletteETag :169). The audit's capture.mjs:58-64 stub answers 200 without checking headers, so the restore-after frames show a success path that production cannot reach. At the real server the user always sees 'Revert failed: If-Match header is required…' on the occluded card.
- **observed** routes/versions.ts:81-85 calls assertIfMatch(c.req.header('If-Match'), paletteETag(current)). etag.ts:89-94 throws PreconditionRequiredError when If-Match is absent, and the route doc (:6-8) makes Idempotency-Key REQUIRED too. revertPalette() passes neither `ifMatch` nor `idempotencyKey`, while updatePalette/publish do (api/palettes.ts:85-101, paletteETag :169). The audit's capture.mjs:58-64 stub answers 200 without checking headers, so the restore-after frames show a success path that production cannot reach. At the real server the user always sees 'Revert failed: If-Match header is required…' on the occluded card.
- **owner** **CONSUMER**: CONSUMER (demo/palettes/api/versions.ts:34-39)
- **fix shape** Have revertPalette take ifMatch = paletteETag(palette) and idempotencyKey = crypto.randomUUID(), and add an api-contract test for the revert headers. The audit's stub should enforce If-Match so the success frames mean something.

#### UIA-V-39 · BROKEN · flag-report-dialog · Submit wipes the form before the verdict arrives: no pending state, the spinner never renders, and the typed detail is lost on failure

- **source** audit #1 · **verdict** CONFIRMED (with an evidence note) · **state** submitted (in flight, and failure) · **where** FlagReportDialog.vue:84-95
- **frame** `flag-report-dialog/` 3a-submitting-1440-light.png, 3a-submitting-390-dark.png, 3d-submitted-fail-1440-dark.png vs 2-reason-selected-1440-light.png
- **observed** onSubmit calls emit('submit') synchronously. `submitting` goes true and back to false in the same tick, and `finally` clears reason and detail at once. The parent then awaits pm.flagged.report() with the dialog still open. For the whole request (2.5 s in 3a; longer through the 429 retry backoff in 3d) the dialog shows an empty form: no radio checked (metrics: all aria-checked=false), textarea value '', Report disabled, no spinner. It reads as 'my input was discarded'. On failure the dialog closes and the user's typed detail is gone for good. The Loader2 at :46 is dead code.
- **expected + canon** While the report is in flight the dialog keeps its inputs, locks them, and shows a loading Report button (the glass 7 Button has a `loading` prop: 'Marks an in-flight command and suppresses activation until it settles'). The form clears only on a successful close. On failure the input is kept for a retry.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/browser/dialog/FlagReportDialog.vue:84-95 (onSubmit) + :46 (Loader2); parent demo/palettes/BrowsePane.vue:348-354
- **fix shape** Let the parent own the pending state: pass a `pending` prop, or have the submit handler return the promise and await it. Bind `<Button :loading="pending">` and delete the hand-rolled Loader2. Reset reason and detail only when the dialog closes after ok:true.
- **confirm** In 2-reason-selected-1440-light, Copyright is selected and the detail is typed. In 3a-submitting-1440-light, 150 ms after the click, all four radios read aria-checked=false, textareaValue is '', Report is disabled and there is no Loader2. Source at HEAD matches: FlagReportDialog.vue:89-99 emits synchronously, then `finally` resets `submitting` and clears reason and detail. BrowsePane.vue:348-354 awaits the report and then calls onFlagOpenChange(false). Glass 7's Button has `loading` ('Marks an in-flight command and suppresses activation until it settles'). Evidence note: 3d-submitted-fail-1440-dark is labelled 'failure verdict' but shows the dialog still open with an empty form (mid-retry, dialog metrics present). The failure verdict itself is not in the frame, so 'on failure the dialog closes and the detail is gone' rests on the source, not on the frame.

#### UIA-V-40 · BROKEN · mix-view · Colors mode is dead: the add-slot and every 'From palettes' swatch render as inert aria-hidden spans, so no color can ever be added and Mix stays disabled

- **source** audit #1 · **verdict** AMENDED · **state** Colors tab: sources empty → attempt to choose sources
- **frame** `mix-view/` 1440-light-colors-01-colors-empty.png (the ghost has no Plus glyph); 1440-light-colors-03-from-palettes-open.png; 1440-light-colors-FAIL.png; probe-inert.json
- **observed** Live DOM of .add-slot-ghost: SPAN, aria-hidden=true, pointer-events:none, no <svg> Plus. Selected chips stay at 0 before and after a forced click on the ghost and a click on the swatches. The Mix button stays disabled. The pane's accessibility tree holds only 6 buttons (2 tabs, the collapsible trigger, 2 comboboxes, Mix): none of the ~15 'Add color … from …' buttons exist. Every Colors-mode path downstream is unreachable: the chosen state, the chip-remove affordance, the Space/Hue PreviewRamps (which need 2 or more operands), the Colors-mode convergence animation, and the dock Tools→Mix/Copy verbs.
- **expected + canon** Each add affordance is a real <button> with an accessible name and a working click, and the ghost shows its Plus glyph. Pages must work when used.
- **owner** **CONSUMER**: CONSUMER — demo/workbenches/mix/MixSourceSelector.vue:195-207 (ghost add slot) and :242-252 (palette swatches) pass tag="button", @click, aria-label, :disabled and a <Plus> slot to WatercolorDot. The served glass-ui 7.0.0 WatercolorDot (node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js:79-120) has no `tag` prop, sets inheritAttrs:false, forwards only class and style, and hard-codes <span aria-hidden="true" style="pointer-events:none"> with no default slot. This is version skew: the consumer calls an interactive WatercolorDot API that the pinned producer does not ship.
- **fix shape** Either repin to the glass release whose WatercolorDot takes `tag` and forwards attrs and slots, or (consumer-local, today) wrap each dot in a native <button type=button aria-label … @click> and keep the dot purely decorative. Add an e2e test that clicks add and checks the chip count, so a producer skew cannot silently kill the verb again.
- **confirm** The defect is CONFIRMED. probe-inert.json (sha f82daf4a, 6 dirty) shows SPAN, aria-hidden=true, pe:none, svgPlus:false, chips 0 before and after the clicks, and mixDisabled:true. Served dist/watercolor-dot.js:79-120 has inheritAttrs:false, no tag prop and hard-codes <span aria-hidden pointer-events:none>. MixSourceSelector.vue:195-207 and :242-252 still pass tag="button", @click and a <Plus> slot. The FIX is wrong: no glass release to repin to exists. glass-ui v6.0.0 WatercolorDot had `tag?: "div"\|"button"`, :is=tag and <slot/>. The v7.0.0 cut (490cc46e) dropped them. The component was then DELETED at 8.0.0 and moved to value.js (BK #55, 62305f4a; glass src/components/blob/README.md:7 and PROCEDURAL-SUITE.md:21). The skew therefore entered with the W44 whole-adoption of glass 7, and moving forward to 8+ removes the import entirely. The only fix is consumer-side: wrap each dot in a native <button type=button aria-label @click> and keep the dot decorative, or home a value.js-owned WatercolorDot now. Either way this is needed before any glass ≥8 upgrade. The e2e guard (click add, assert chip count) stands. Owner: CONSUMER is correct.

#### UIA-V-41 · BROKEN · generate-view · Swatch copy verb is dead: WatercolorDot ignores tag="button"/@click/aria-label and renders an aria-hidden span with inline pointer-events:none

- **source** audit #1 · **verdict** CONFIRMED · **state** default, every viewport and theme
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/1440-dark-10-swatch-copied.png ; probe-log.json swatchCopy.clip="SENTINEL" at 390-light/1440-dark/390-dark ; probe-swatch.mjs output
- **observed** The .generate-swatch element is <span aria-hidden="true" style="pointer-events:none">. glass-ui 7.0.0 dist/watercolor-dot.js:82-112 has no `tag` prop, sets inheritAttrs:false and forwards only class and style. The onClick and aria-label never reach the DOM. A real click leaves the clipboard unchanged (SENTINEL). Playwright reports that the parent div intercepts pointer events. The ariaSnapshot of the plate has no swatch buttons, and the Tab tour skips them (Regenerate > Save > Copy > Preset > Harmony > slider). The comment at :195-204 describes a copy verb that does not exist.
- **expected + canon** Each swatch is a real focusable <button> named 'Copy <color>' that writes to the clipboard and shows copied feedback. glass-ui blob/README.md:7 says WatercolorDot relocated to value.js at BK #55. The dot is decorative paint only. The consumer must own the interactive seat.
- **owner** **CONSUMER**: CONSUMER (demo/workbenches/generate/GenerateControls.vue:206-215)
- **fix shape** Wrap each dot in a real <button type=button class=focus-ring aria-label=...> that carries @click=copyColor. Keep the WatercolorDot inside as aria-hidden paint. Optionally add a transient 'Copied' state, matching the palette-card swatch popover. Also audit the other tag="div"/"button" WatercolorDot consumers: EmptyState.vue:35-37 and CurrentPaletteEditor.vue:62-64 pass a dead `tag` too.

#### UIA-V-42 · BROKEN · generate-view · The editable plate name is a lie: Save always stores 'Generated Palette'

- **source** audit #2 · **verdict** CONFIRMED · **state** after rename, then Save palette
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/1440-dark-11-renamed-saved-twice.png ; probe-log.json saved=["Generated Palette"] at all 3 probe combos
- **observed** Plate titled 'Audit Rename' > Save > the inspector card and localStorage both read 'Generated Palette'. GenerateControls emits save(colors, name) (:55-57, :109-111). GeneratePane.onSave(colors) drops the second argument and hardcodes pm.createPalette("Generated Palette", ...). The same hardcode applies to the dock seat generate.save.
- **expected + canon** The saved palette carries the plate's name. GenerateControls.vue:51-54 itself says 'the save carries the plate's own name'.
- **owner** **CONSUMER**: CONSUMER (demo/workbenches/generate/GeneratePane.vue:14-20)
- **fix shape** onSave(colors, name) should call pm.createPalette(name.trim() \|\| 'Generated Palette', ...).

#### UIA-V-43 · BROKEN · generate-view · The dead-WatercolorDot class spans pages: the palette-card swatch popover trigger and Mix's add-from-palette swatches

- **source** confirm miss #4 · **verdict** MISSED (confirm seat) · **severity note** BROKEN (cross-page; palettes-view and mix audits should verify)
- **frame** `generate-view/` source plus glass 7.0.0 dist/watercolor-dot.js (inheritAttrs:false, pointer-events:none span)
- **observed** PopoverTrigger as-child and @click both land on a component that drops attrs and refuses pointer events. The WatercolorDot export no longer exists in glass HEAD (relocated at BK #55), so a glass upgrade will also break the import.
- **owner** **CONSUMER**: CONSUMER (demo/palettes/browser/card/SwatchHoverMenu.vue:14-32 ; demo/workbenches/mix/MixSourceSelector.vue:242-251)

#### UIA-V-44 · BROKEN · gradient-view · At 390px the Type/Space/Hue Select triggers overlap each other and the render tile

- **source** audit #1 · **verdict** CONFIRMED · **state** default · **where** gradient-view · default + every later state · 390x844 light and dark
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/390-dark-01-default.png (also 390-light-01-default.png, 390-dark-02d-type-radial.png, 390-dark-06b-after-seed.png)
- **observed** Measured trigger boxes [33..136], [114..228], [196..310] at 54px tall: each trigger overlaps the next by 22-32px, Hue runs into the 80px render tile, 'OKLCh' is clipped, the chevrons are hidden, and 21px trigger text is larger than the 16px field labels.
- **expected + canon** Each single-line control sits inside its own cell as a stadium (DESIGN.md:385 --radius-control) with no overlap, and the band reflows at phone width (16px gutter, no collisions).
- **owner** **GLASS+CONSUMER**: CONSUMER demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:147-148 (secondary GLASS: select/SelectTrigger.vue:59 value span has line-clamp-1 but cannot shrink below its content width) · *glass component* SelectTrigger (SelectTrigger.vue:59) · *head* open-at-HEAD
- **fix shape** Below sm, stack the band: put the render tile full-width above, then the three LabeledFields in a single column or with layout="horizontal". Give each LabeledField root and the trigger min-w-0 and truncate the SelectValue. At the glass root, make SelectTrigger's value span shrink and truncate.

#### UIA-V-45 · BROKEN · gradient-view · Stop Position input truncates its value ('74.7' shows as '7‹' or '7', '100' as '1(')

- **source** audit #2 · **verdict** CONFIRMED · **state** stop dragged/added · **where** gradient-view · stop selected / dragged · 1440 and 390, light and dark
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-03d-stop-dragged.png (crop shows '74' + clipped glyph), 1440-light-03g-inspector-2stops.png ('1(' for 100), 390-dark-03d-stop-dragged.png ('7')
- **observed** A 42x24 (1440) or 36x44 (390) native number field with spin buttons reserves space and cuts the position value to 1-2 characters. The one numeric readout of the selected stop cannot be read.
- **expected + canon** A glass NumberField (glass-ui src/components/number-field) sized for '100.0', with a stadium radius for a single-line control (DESIGN.md:385).
- **owner** **CONSUMER**: CONSUMER demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue:714-726 + :1002-1011 (inline-size:5ch hand-rolled <input type=number>)
- **fix shape** Replace it with <NumberField> (+NumberFieldInput, optional steppers) at min-inline-size 7ch with tabular numerals, and drop the scoped .stop-inspector-input recipe.

#### UIA-V-46 · BROKEN · atmosphere-view · Medium 'Oil Pastel' turns the whole atmosphere ground black

- **source** audit #1 · **verdict** CONFIRMED · **state** select Oil Pastel · **where** /#/atmosphere, Medium select → Oil Pastel, all viewports and themes
- **frame** `atmosphere-view/` 1440-light-04-medium-oil-pastel.png, 1440-light-04-medium-smooth.png (still black because of the switch delay), 1440-light-10c-motion-still-t0.png, probe-1x-texture-oil-pastel.png, probe-ground.json 'medium→Oil Pastel'
- **observed** About 4.3 s after the pick, mean ground luminance falls from 188.5 to 22.5 (near-black with faint grain). It stays black until another medium is picked, then that change also lands about 4 s late. The glass card turns grey-muddy over the black. Reproduced twice (main capture and probe).
- **expected + canon** Aurora README:3-4 lists oil-pastel as a supported register. It should paint a textured field in the seed's palette, like the other media.
- **owner** **GLASS**: GLASS — Aurora oil-pastel medium register (glass-ui/src/components/aurora; the consumer passes only {kind:'oil-pastel'} at AuroraPane.vue:92-98, and atmosphere-calibration.ts does not override the medium) · *glass component* Aurora (src/components/aurora) · *head* open-at-HEAD
- **fix shape** Relay to the glass-ui session: repro = deriveAurora(seed oklch(95.8% .27 9.8), analogous, energy .76, zones 6 scattered) + medium {kind:'oil-pastel'} with no amount. Check the oil-pastel program's output (likely a NaN or zero-alpha path on the WebGPU/WebGL2 substrate). Until it is fixed, the consumer could drop 'oil-pastel' from MEDIA (AuroraPane.vue:57-65).

#### UIA-V-47 · BROKEN · blob-view · Blob pane Geometry sliders do nothing: the only blob on the page ignores them

- **source** audit #1 · **verdict** AMENDED (confirmed, and it is wider than reported) · **state** slider tuned, live blob response
- **frame** `blob-view/` crops/probe-blob-strip.png (probe-B-sat0 vs probe-B-sat4, probe-C-body-min vs probe-C-body-max); crops/1440-light-blob-strip.png (01-default vs 06-tuned-live, bodyRadius 0.22→0.45, satellites 3→4, smoothK 0.05→0.45)
- **observed** I moved Body Radius from min to max and Satellites from 0 to 4. The hero blob rendered pixel-identical in both cases. The page has 2 canvases (the app-layout aurora and the one goo-blob-wrapper), so the tuning surface has no other blob it could be driving. 4 of the 5 Geometry sliders are overwritten by the hero overlay on every frame, and Satellites has no visible effect.
- **expected + canon** Every slider in a tuning pane produces a visible response on the thing being tuned. BlobPane.vue:43-46 states the pane's own law: an abrogated key must 'fail typecheck rather than silently no-op a slider'. A pinned overlay is exactly that silencer.
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/picker/visual/HeroBlob.vue:152-165 (heroConfig hard-codes geometry.bodyRadius 0.325, orbitRadius 0.4, satelliteRadius 0.09, eccentricity 0.03 over appBlobConfig) + demo/scenes/blob/BlobPane.vue:57-63 (the sliders that drive those keys) · *glass component* Blob (wake on non-colour liveConfig atoms) · *head* open-at-HEAD
- **fix shape** Give the blob scene its own blob, rendered from the un-overlaid app config (see the next finding). Or have the hero derive its register by scaling appBlobConfig.geometry instead of pinning literals. Or remove the sliders the hero pins. Never keep a live slider that is a no-op.
- **confirm** The four probe frames (sat0, sat4, body-min, body-max) are identical, and HeroBlob.vue:163-169 pins bodyRadius, orbitRadius, satelliteRadius and eccentricity (and fissionAmp at :174). But 06-tuned-live also changed smoothK from 0.05 to 0.45, which is NOT pinned, and the blob still did not change. The root cause is wider than the overlay. HeroBlob's idle gate (:211-225) parks the renderer 5.3s after the last colour or save activity, and slider writes never call noteBlobActivity. Blob.vue only wakes a parked renderer on color, paletteStops, satelliteColors, rimColor or pointer.active (:185-243). So every one of the 31 sliders (membrane, surface, color shifts, tempo, satellites) is silent while the hero is parked, not only the four pinned Geometry keys. Owner: CONSUMER for the overlay and the idle gate. GLASS as well: Blob has no wake on a change to non-colour config atoms, so route a 'wake on any liveConfig change' seam to the glass-ui session.

#### UIA-V-48 · BROKEN · blob-view · Config sliders never wake the parked hero, so the whole pane is dead after 5.3s idle

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `blob-view/` 1440-light-blob-strip frames 01 vs 06: the unpinned smoothK went from 0.05 to 0.45 and satellites from 3 to 4, and the blob is identical. Folded into verdict 1, but it is a distinct root cause.
- **observed** 1440-light-blob-strip frames 01 vs 06: the unpinned smoothK went from 0.05 to 0.45 and satellites from 3 to 4, and the blob is identical. Folded into verdict 1, but it is a distinct root cause.
- **owner** **GLASS+CONSUMER**: CONSUMER demo/picker/visual/HeroBlob.vue:211-225 (noteBlobActivity only on colour/save) + GLASS Blob.vue:185-243 (the wake watchers cover only color, paletteStops, satelliteColors, rimColor and pointer) · *glass component* Blob (Blob.vue:185-243) · *head* open-at-HEAD

#### UIA-V-49 · BROKEN · admin-users · Retry on 'Couldn't load users' does nothing for up to 30 s

- **source** audit #1 · **verdict** CONFIRMED · **state** error · **where** admin-users · load-error state · Retry
- **frame** `admin-users/` 390-light-09b-retry-within-cooldown.png (also 1440-dark, 390-dark 09b); meta retryWithinCooldownRequests=0, retryAfterCooldownRequests=1
- **observed** After one failed read, the transport sets RETRY_COOLDOWN_MS=30000. Pressing Retry inside that window throws ApiUnavailableError before any request goes out: 0 network requests. The panel shows the same 'Backend unreachable — working locally.' error again, with no spinner, countdown, or disabled state. Only after 31 s does Retry send a request.
- **expected + canon** A control that does nothing when pressed is broken (seat criterion 6). An explicit user retry should either get past the latch as the one probe, or show the cooldown and disable Retry until it expires.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:74-77 + demo/platform/transport/availability.ts:87,251-268
- **fix shape** Route an explicit Retry/Refresh through a probe-admitting path (for example assertApiAttemptAllowed({ userInitiated: true })), or expose unavailableSince and show 'Retry in Ns' with Retry disabled until then. Also drop the duplicate header Refresh while the error plate shows Retry.

#### UIA-V-50 · BROKEN · admin-names · Pending\|Approved segmented-tab indicator lands about 22 px below its track on every entry to the view and covers the search field

- **source** audit #1 · **verdict** AMENDED · **state** first mount of /#/admin/names (deep link, hash entry, error, loading) — every theme and viewport · **where** AdminNamesPanel.vue:23-28 (SegmentedTabs inside AdminPane Card)
- **frame** `admin-names/` 1440-light-01-empty-pending.png, 1440-light-14-error.png, 1440-light-15-loading.png, 1440-dark-01/14/15, 390-light-01/15, 390-dark-01/15; correct after one tab change: 1440-light-02-empty-approved.png, 1440-light-05-pending-populated.png
- **observed** At 1440 the track spans y 420-459 while the active-segment body spans about y 441-489: taller than the track, hanging out of it, and covering the 'Search color names…' placeholder. It corrects only after the first click on a tab.
- **expected + canon** The indicator sits inside the track at mount (glass tabs/README.md:19-23: the eyeglass is the active segment's body). Measure in layout space (offsetLeft/Top/Width/Height), or re-measure after the ancestor's transition ends.
- **owner** **GLASS**: GLASS — SegmentedTabs (pill) indicator engine: installed 7.0.0 dist/useTabRovingFocus measures with getBoundingClientRect once at mount; HEAD src/composables/motion/morph/useSelectionIndicator.ts:223-224 still does, and its ResizeObserver never re-fires for an ancestor transform. Consumer side: the pane's entrance transform is live at mount. · *glass component* SegmentedTabs (dist/useTabRovingFocus) · *head* open-at-HEAD
- **fix shape** Glass: the indicator should measure in untransformed layout space, or re-measure on the first animation frame after the ancestor transitions settle (also on transitionend or a document-level visual-viewport pass). Consumer interim: none. Route to glass; re-check after the glass repin.
- **confirm** The symptom is confirmed. In 1440-light-01-empty-pending.png the indicator is about 48 px tall and sits about 21 px low on a 39 px track (the buttons measure 31 px in the manifest), and it covers the search placeholder. In 1440-light-05 it is correct after a tab change. 390-dark-15-loading.png shows a smaller offset of about 8 px. The owner call (GLASS) stands, but the stated mechanism is wrong. useSelectionIndicator.ts:223-231 computes x/y as btnRect minus containerRect, so a pure ancestor translate cancels out. A uniform scale would shrink or grow the width too, yet the indicator's width is exactly right (492 px) while only its height and y are wrong. The error is anisotropic (height and y only), so 'the ancestor transform is live at mount' does not explain it. Likely causes are a first measure taken before the button's layout or font settles, or a y-only entrance transform (scaleY or clip). Glass should re-measure after settle (rAF, document.fonts.ready, or a ResizeObserver on the button). Glass should still own the fix, with the corrected diagnosis.

#### UIA-V-51 · BROKEN · admin-names · Names notice never auto-dismisses: the success chip stays up until the next moderation act

- **source** audit #2 · **verdict** CONFIRMED · **state** after Approve / Reject · **where** AdminPane.vue:29-39
- **frame** `admin-names/` 1440-light-10-approve-notice.png → 1440-light-10b-notice-after-4s.png → 1440-light-11/12/13 (still showing more than 10 s later); 390-light-10b-notice-after-4s.png
- **observed** 'Approved “…”' is still present at +4.3 s and through every later frame. Each notice mounts with visible already true, so the watcher never fires and the 4000 ms timer never starts.
- **expected + canon** The success notice dismisses after 4 s, as autoDismissMs=4000 declares at AdminPane.vue:36.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/browser/card/PaletteCard/ActionFeedback.vue:40-48 (watch on props.visible without immediate) together with demo/palettes/admin/AdminPane.vue:30-37 (:visible="true" constant, re-keyed by seq)
- **fix shape** Start the timer on mount ({ immediate: true } or onMounted), or drive visibility from the notice ref instead of a constant true. Better, replace the chip with the glass Toast (see the notice-idiom finding).

#### UIA-V-52 · BROKEN · admin-audit · At 390 the rows push the list wider than the card: count, Refresh and Next page end up off-card and cannot be clicked; long targets are cut off with no ellipsis

- **source** audit #1 · **verdict** CONFIRMED · **state** entries, 390 · **where** admin-audit, entries (every page), 390x844, light+dark
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-entries-390-light.png, p2-entries-390-dark.png, p2-entries-p3-last-390-light.png, probe-390-after-wheel.png, p2-focus-refresh-crop-390-dark.png, probe-scroll.json
- **observed** probe-scroll.json at390: grid 324px wide, row 552px (rowMinW 'auto'); '47 entries' at x=462 and Refresh at x=557 with a 390px viewport; refreshHit {inViewport:false, hitIsButton:false}; Next page at x=357-397 against a card clip at 374, so only a sliver of the button shows (probe-390-after-wheel.png); 'color:very-long-colour-name-that-keeps' is cut by the card edge, not truncated with an ellipsis. With entries loaded, a phone user cannot refresh or reliably go to the next page.
- **expected + canon** The row shrinks to the track and the target truncates. This bug is already fixed and documented in the sibling AdminListItem.vue:1-12 comment (S.W5-12 F-1: 'min-w-0 on the ROW ITSELF ... blowing the track to ~850px at 390'). AdminAuditPanel hand-rolls the same row without that fix.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminAuditPanel.vue:84 (entry row has no min-w-0)
- **fix shape** Render entries through AdminListItem (or add min-w-0 to the :84 row). Better: move to the tabular form in the next finding. Put the count and Refresh on the header line so they can never wrap off-card.

#### UIA-V-53 · BROKEN · pane-plates · Error-plate detail line overflows and is clipped on both card edges at 390

- **source** audit #1 · **verdict** CONFIRMED · **state** CONFIRMED · **where** 390x844 light+dark · chunk-error plate (hop and deep link)
- **frame** `pane-plates/` 390-light-08b-chunk-error-deeplink-gradient-scrolled.png, 390-dark-08b-…, 390-light-05-chunk-error-hop-mix.png
- **observed** The detail <p> measures x=5 w=379 inside a card at x=16 w=358. The text runs past the card's content box and is cut off at both edges ('ailed to fetch…', 'ttp://localhost…'). 44ch of Fira at 14px ≈ 379px, wider than the ~310px content box. The centred flex item overflows symmetrically and the card clips it.
- **expected + canon** Machine truth wraps inside the plate at every viewport. No horizontal overflow at the 16px gutter (DESIGN.md: layout works at phone width).
- **owner** **CONSUMER**: CONSUMER demo/shared/ui/EmptyState.vue:12 (detail <p> `max-w-[44ch] break-words` inside the `items-center` flex column at :4)
- **fix shape** Give the detail `w-full max-w-[min(44ch,100%)] min-w-0` and `overflow-wrap:anywhere`. Better: stop printing the raw loader message (see the finding on the raw detail).

#### UIA-V-54 · BROKEN · pointer-debug-overlay · The expanded debug overlay paints UNDER the picker card: header toggle, gauge values, the FROZEN? badge and the 'copied!' feedback are hidden, and at 390 the header cannot be clicked

- **source** audit #1 · **verdict** CONFIRMED · **state** overlay open with gauges/event log; freeze detection; copy · **where** demo/picker/visual/PointerDebugOverlay.vue:136
- **frame** `pointer-debug-overlay/` 06-freeze__1440__light.png + __crop.png; 04-expanded-after-drags__390__dark.png; 06-freeze__390__light.png; 08-copy__1440__light__crop.png; capture-log.json (zIndexRaw='auto', zDebugVar='' in all 44 frames; at 390 expanded, headerHit = SPAN.slider-range / DIV.channel-rows, headerHitIsOverlay=false)
- **observed** `--z-debug` is defined nowhere: not in value.js demo/ and not in glass src or the installed dist. The declaration is invalid at computed-value time, so z-index resolves to `auto`. At 1440 the right ~90 px of the 280 px panel sits under the picker card (x≥200). The 'Debug' title shows, but the '−' collapse glyph, the FROZEN? badge (the one thing freeze detection exists to show) and every gauge VALUE column are hidden; only the keys read. Long values bleed ('div.spe / picker.'). At 390, the viewport this tool exists for (iOS Safari pointer debugging), almost the whole expanded panel, header included, is under the card. elementFromPoint at the header center returns the L slider, so a tap meant to collapse the overlay drives the slider instead.
- **expected + canon** glass DESIGN.md:353 puts debug overlays on `--z-debug` 99999, above everything, including `--z-max` 9999 (:352). A debug overlay must paint over the content it instruments.
- **owner** **GLASS+CONSUMER**: CONSUMER (PointerDebugOverlay.vue:136 `z-index: var(--z-debug)`). The root is a GLASS token gap: see the next finding · *glass component* z-index token scale (--z-debug absent; DESIGN.md:335-353 stale) · *head* open-at-HEAD
- **fix shape** Point the overlay at a z token that exists: `var(--z-max)`, until glass ships `--z-debug` (next finding). Or define `--z-debug` in the demo's style.css :root under a commented rationale. Then re-check the header hit-test at 390 expanded.

## HIGH (131)

#### UIA-V-55 · HIGH · app-ground-atmosphere · Glass aurora substrate does not keep its backing store within the GPU texture limit, and retries init every frame after a validation error

- **source** audit #2 · **verdict** CONFIRMED · **state** 390-dark rest · **where** any route where the canvas is taller than 8192 device px
- **frame** `app-ground-atmosphere/` report.json → 390-dark.console: 10,820× '[aurora] init failed: [object GPUValidationError]' + 100× 'Could not create the swapchain texture' / '[Invalid CommandBuffer from CommandEncoder "[Aurora] frame"]', then 'WebGPU: too many warnings'
- **observed** The substrate sizes the swapchain to canvas CSS × DPR with no clamp to device.limits.maxTextureDimension2D. After the validation error it keeps encoding '[Aurora] frame' and re-reporting init failure every frame. It neither drops to its WebGL2 path nor settles on one reported failure.
- **expected + canon** Clamp the backing store to maxTextureDimension2D (scale DPR down). After a setup failure: report once, set rendererStatus to failed, and fall to the WebGL2 or static CSS product mode. Never loop.
- **owner** **GLASS**: GLASS — aurora useAurora/createGpuSubstrate (installed 7.0.0 dist/aurora.js dprPolicy ≈:2355; src/components/aurora/composables/runtime.ts:299-318 onInitError path). Canon: aurora/README.md:30-52 'backing-store sizing and DPR policy … engine recovery', and 'Setup and pipeline failures are reported rather than disguised'. · *glass component* aurora (dist/aurora.js) · *head* open-at-HEAD
- **fix shape** Route to the glass-ui session (O-56 G-4 follow-up with this measurement). Clamp in the shared lifecycle's resize policy, and add a one-shot failure latch that switches to the CSS-gradient mode. No consumer copy.

#### UIA-V-56 · HIGH · app-ground-atmosphere · No fallback when the aurora fails: the canvas stays transparent and the ground drops to the tiling body gradient

- **source** audit #3 · **verdict** CONFIRMED · **state** aurora init failed · **where** /#/ and /#/palettes at 390
- **frame** `app-ground-atmosphere/` 390-light-rest-home.png; report.json 390-light .routes['/'].canvas.cls has no `atmosphere-canvas--arrived`, bgImage 'none'
- **observed** On a GPU failure at runtime (as opposed to a device-tier 'css' pick) nothing switches to the palette's CSS gradient. The field disappears and the phone ground reads as one flat saturated slab, rgb(200,70,215) in light.
- **expected + canon** The 'one material from t0' contract that useAtmosphereBoot and overture.css:40-56 describe: the same derived palette paints through the CSS placeholder whenever the GPU field is absent.
- **owner** **CONSUMER**: CONSUMER — demo/color-picker/composables/boot/useAtmosphere.ts:195-199 (`onInitError: (err) => console.warn(...)` only) + App.vue:20-22 (`auroraCssGradient` is bound only when renderMode resolves to 'css')
- **fix shape** In onInitError, and on a rendererStatus of 'failed', set the CSS-placeholder path: paletteToCssGradient(resolvedPalette) onto the canvas background, and mark the canvas arrived.

#### UIA-V-57 · HIGH · app-ground-atmosphere · The body ground gradient repeats every viewport height and restarts at its darkest stop below the fold, leaving a near-black band at the end of the document in dark

- **source** audit #4 · **verdict** AMENDED · **state** dark, scroll-end · **where** /#/, /#/palettes, /#/gradient at 390 (scrolled to the end); any page where the document is taller than the canvas
- **frame** `app-ground-atmosphere/` 390-dark-rest-palettes-scrollend.png (bottom 6 px); crop-390-dark-palettes-scrollend-bottom-x4.png; 390-dark-rest-home-scrollend.png
- **observed** Below the canvas (the document is 1214 px tall, the layout 1208) the page shows rgb(39,0,27)→rgb(58,0,31). That is --saved-bg-0 restarting at x≈0, a hard seam of near-black plum under the last card. It is one reproducible source of the owner's 'background goes black'.
- **expected + canon** One continuous ground with no seam and no tile restart (the W2-2 'one material' ground).
- **owner** **CONSUMER**: CONSUMER — demo/styles/foundation.css:656-663 (body `background-image: linear-gradient(135deg, --saved-bg-0..3)` with no size, repeat or attachment)
- **fix shape** `background-attachment: fixed` plus no-repeat on the body ground, or paint the ground on the same viewport-fixed field layer as the canvas. Also find and remove the 5–6 px of scroll beyond .app-layout.
- **confirm** The seam is real. crop-390-dark-palettes-scrollend-bottom-x4.png shows a hard dark-plum band under the last card. report 390-dark /palettes has docScrollH 1214 against layout h 1208, and the scroll-end sample at (195,838) is rgb(51,0,30) at lum 0.051. The owner site foundation.css:656-663 is correct: body has a gradient with no attachment, size or repeat set. What is not proven is 'repeats every viewport height / restarts at its darkest stop'. No frame separates a tile restart from where the root background's positioning area starts. Restate as: the ground below .app-layout is the body gradient, not the field, and it is darkest there. The fix (paint the ground on the viewport-fixed field layer, or use background-attachment:fixed, and remove the 6 px of overflow past .app-layout) stands.

#### UIA-V-58 · HIGH · app-ground-atmosphere · View switch: the vacated inspector slot shows an over-saturated, plate-shaped slab for about 1 s while the next pane slides in from off-screen, then the scene jumps 48 px

- **source** audit #6 · **verdict** CONFIRMED · **state** view-switch transition (owner: janky) · **where** /#/ → /#/palettes (1440 dark), /#/gradient → /#/atmosphere (1440 light), /#/atmosphere → /#/ (390 light)
- **frame** `app-ground-atmosphere/` 1440-dark-switch-home-to-palettes-f0.png; probe-slab-dark-home-to-palettes-1.png and -3.png; 1440-light-switch-gradient-to-atmosphere-f0.png; 390-light-switch-atmosphere-to-home-f0.png
- **observed** 1440 dark, / → /palettes (chunk already warm): · The inspector rect (x 730–1240) shows a bright field-coloured slab while the old About pane leaves to the right and the new pane arrives from x≈1300. · elementFromPoint in the slot is a bare `div.pane-wrapper`: transparent, no backdrop-filter. · The main thread did not answer between +111 ms and +1103 ms. · The card top moves from 112 to 160 px as the tall About pane leaves. On the other switches, the stage is empty for a frame while the leaving card is still on screen.
- **expected + canon** One short, bounded enter/leave per region on glass motion tokens (X.W12.b). No empty or flat-filled slot, no layout jump, no long task during the swap.
- **owner** **CONSUMER**: CONSUMER — demo/color-picker/App.vue pane regions (pane-wrapper--stage/--inspector) + demo/styles/animations.css:246-292 (the pane vj-enter overrides); the jump comes from OA-21's unclipped About pane
- **fix shape** Enter each incoming pane in its own slot (short translate, not an off-screen slide) so the slot is never empty. Identify the layer painting the slab; it cannot be hit-tested, so likely the leaving plate's backdrop or pseudo layer left in place. Break up the ~1 s long task on switch. Clip About to the stage's height (X.W12.c) so the grid does not re-centre.

#### UIA-V-59 · HIGH · app-ground-atmosphere · The per-view accent stays locked to admin gold after visiting /atmosphere or /blob, even when logged out; the 9-view 40° hue steps disappear

- **source** audit #8 · **verdict** CONFIRMED · **state** per-view accent hue · **where** every user view after one visit to /#/atmosphere or /#/blob
- **frame** `app-ground-atmosphere/` probe-accent-seq2.json (/atmosphere → / → /gradient → /mix: each svg has `gold-shimmer-icon`, colour oklch(0.751 0.147 84.2), while `--accent-view` on the trigger is per-view); probe-accent-*.png; montage-1440-light-accent-9views.png and montage-1440-dark-accent-9views.png (all 9 icons gold); crop-1440-light-viewicon-gradient-x4.png
- **observed** After one admin-class view the dock icon and ring are gold on every view. The painted icon pixel is rgb(218,165,31) on home, palettes, gradient and mix. The dock still shows 'Login', so the user is not authenticated. The schema's accentHueShift 280/320 for atmosphere and blob never shows either, because those views always render gold.
- **expected + canon** viewSchema.ts:129-140: 'the nine … hue rotation', and 'admin identity is the gold accent' applies only in admin mode. Leaving admin views should restore the per-view accent.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/composables/useDockAdminMode.ts:55-59 (the watch only ever sets `isAdminMode = true`; nothing sets it back when the view is a user view)
- **fix shape** Derive isAdminMode (computed from currentView ∈ adminViews AND isAdminAuthenticated) instead of a one-way latched ref. Decide whether atmosphere and blob are user views (with a hue) or admin views (gold), not both.

#### UIA-V-60 · HIGH · home-picker · ConsoleRail is a stadium-radius pill around a vertical four-item column (owner: 'too rounded pills')

- **source** audit #3 · **verdict** CONFIRMED · **state** default · **where** home-picker · channel console · all states, both viewports and themes
- **frame** `home-picker/` 1440-light-02-card.png, 390-light-01-default.png, 390-dark-01-default.png
- **observed** A 31x166 (1440) or 38x194 (390) vertical capsule with a 9999px radius and a 1px accent ring holds L/a/b/α, so both ends are half-circles. It reads as a large soft pill beside the square-shouldered slider console.
- **expected + canon** DESIGN.md:390: --radius-strip 12px for a 'Bounded column-stack segmented track (vertical)'. Stadium is only for single-line horizontal controls (:385 --radius-control, :391 --radius-tab).
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/picker/controls/ComponentSliders/ConsoleRail.vue:228 (border-radius: var(--radius-pill) on .channel-rail). GLASS — the booked P5 letter-rail primitive should ship a vertical segmented-rail variant on --radius-strip (route to the glass-ui session) · *glass component* Tabs/SegmentedTabs vertical rail variant (--radius-strip) · *head* open-at-HEAD
- **fix shape** Rail enclosure takes var(--radius-strip). Build it as a glass Tabs vertical variant (reusing the component-type name, not a bespoke ring) and route the variant to glass-ui.

#### UIA-V-61 · HIGH · home-picker · Readout line-lock leaves about 61px of dead air between the title and the numbers at 1440, and orphans '20.0' onto a second line at 390

- **source** audit #4 · **verdict** CONFIRMED · **state** default · **where** home-picker · header · default
- **frame** `home-picker/` 1440-light-02-card.png, 1440-dark-01-default.png, 390-light-01-default.png
- **observed** At 1440, --readout-lines=2 and min-height=122.4px for a one-line tuple, pinned to the bottom. That leaves an empty line-height band above the numbers, and 'Lab' floats about 90px above them: the header takes ~227px of a 685px card. At 390, the same lock actually wraps '92.0 %, 88.8,' / '20.0', so the tuple breaks mid-sentence.
- **expected + canon** Hierarchy: primary content dominant with no dead band. The seat's own law says 'an instrument readout broken-lined mid-figure is a hierarchy defect' (ColorComponentDisplay.vue style comment). The type scale should step title then tuple with a rhythm gap (--picker-header-rhythm), not a reserved empty line.
- **owner** **CONSUMER**: CONSUMER — demo/picker/display/ColorComponentDisplay/readoutReservation.ts:192-208 (readoutLineCount returns 2 for Lab from a static capacity constant); ColorComponentDisplay.vue style: min-height calc(var(--readout-lines)*1.12em) plus align-content: flex-end
- **fix shape** Derive the lock from the measured container capacity, or lock to the rendered line count at the band. At 390, choose one deliberate form: a smaller rung that keeps one line, or an intentional 3-row stack. Remove the dead band at wide widths.

#### UIA-V-62 · HIGH · about-pane · In the space selector, out-of-gamut conversions print as nonsense values, and the gamut mark cannot be seen

- **source** audit #1 · **verdict** CONFIRMED (widened) · **state** selector open, all viewports and themes · **where** About header selector (the same component as the picker title), open, at the default color lab(92% 88.8 20 / 82.7%)
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-01-selector-open.png ; 390-light-10-selector-open-about.png ; row text in probe2-out.json
- **observed** The rows print 'rgb(385.3 143.4 199.6)', 'hsl(346deg -1295% 103.7%)', 'hsv · 346 · 0.6279 · 1.511', 'hwb(346deg 56.23% -51.1%)', 'color(srgb-linear 2.58 …)', 'color(display-p3 1.402 …)'. The only out-of-gamut signal is `data-out-of-gamut` plus a native `title` tooltip, and neither is visible in the frames or reachable by touch. The grammar also differs between rows: CSS function strings for most rows, a '·'-separated form for hsv, kelvin, ictcp and jzazbz.
- **expected + canon** The catalog promises 'gamut measured and marked' (ColorSpaceSelector.vue:172). An out-of-range specimen should carry a visible mark, for example a glass Badge or StatusDot plus a muted caption, and should not print a -1295% saturation as if it were a real reading. One specimen grammar across all rows.
- **owner** **CONSUMER**: CONSUMER demo/color-session/ColorSpaceSelector.vue:97-110 (the specimen caption; the out-of-gamut signal is only a `title` attribute) + demo/color-session/format-color (formatSpecimen)
- **fix shape** Render the out-of-gamut state as a visible glyph or badge on the row, drawn from glass primitives (StatusDot or Badge). For cylindrical sRGB-derived spaces (hsl, hsv, hwb), show 'out of gamut' in place of the unbounded numbers, or clamp the displayed numbers and mark them. Unify the '·' grammar rows with the CSS-string rows.
- **confirm** Frames 1440-light-01 and 390-light-10 both show hsl -1295% / 103.7%, hwb -51.1%, and hsv value 1.511. ColorSpaceSelector.vue:97-110 carries the out-of-gamut state only as data-out-of-gamut plus a native title. Widened: probe2 rows show three gamut policies in one list. rgb is unclamped (385.3), Hex is silently clamped (#ff8fc8d3), and Kelvin reports 5309 for an out-of-gamut pink. The '·' grammar rows (hsv, kelvin, ictcp, jzazbz) also drop the alpha that every CSS-string row prints.

#### UIA-V-63 · HIGH · about-pane · KaTeX display equations are clipped at the card's right edge with no sign that they scroll (the §0ao About clip)

- **source** audit #3 · **verdict** AMENDED · **state** oklch and lab guides at 390, lab guide even at 1440, both themes · **where** Detailed Guide, in the matrix and Lab-formula rows
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/montage-390-light-oklch-seg5-7.png (OKLab↔XYZ matrices: '= M₂⁻¹ [' and '∛s' cut) ; montage-1440-light-lab-seg3-7.png (at 1440: 'f(Y/Yn…' and 'Z = Zn·f⁻' cut)
- **observed** Wide formulas stop mid-glyph at the card edge. The box scrolls horizontally, but there is no scrollbar (hidden scrollbar), no edge fade and no hint, so the maths reads as truncated. capture-meta shows 1–3 overflowing display blocks per guide at 390 and 2 in the lab guide at 1440.
- **expected + canon** Either the formula fits the column or the overflow is visible. glass has fading-scroll and scroll-progress-rim primitives for exactly this, and the canon rule is to use primitives, not hand-rolled overflow.
- **owner** **CONSUMER**: CONSUMER demo/scenes/about/markdown/Markdown.vue:301-306 (the display-math box is overflow-x:auto with no affordance) + :106-109 (content-visibility:auto on sections)
- **fix shape** Wrap each display-math block in glass FadingScroll (horizontal) so the cut edge fades and invites scrolling. Alternatively, author the matrix rows to break with KaTeX `\\` or aligned environments at narrow widths, or scale display math with a container query.
- **confirm** The clip is real. montage-1440-light-lab-seg3-7 shows 'Z = Zn·f⁻' and 'f(Y/Yn…' cut at 1440, and Markdown.vue:301-306 is a bare overflow-x:auto. Amendment: nothing in demo/scenes/about or demo/styles hides the scrollbar. The invisible bar is macOS overlay-scrollbar behaviour, which also hits every trackpad user. The fix still stands: FadingScroll (glass has fading-scroll and scroll-progress-rim), or break the matrices.

#### UIA-V-64 · HIGH · about-pane · About drives a ~7,600 px page, and the picker (the primary stage) scrolls away, leaving the left half empty

- **source** audit #4 · **verdict** CONFIRMED · **state** default and any authored guide, 1440, both themes · **where** Home view (/#/), About inspector at 1440
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-03-oklch-seg1.png … seg7.png ; 1440-dark-03-oklch-seg3.png ; probe-out.json layout chain
- **observed** The card measures h=7459–7505 px while the picker is 685 px, and the document scrollHeight is 7585–7631. The card's own overflow-y:auto never engages because its parent, pane-wrapper--inspector, has no maximum height. After the first screen the stage is gone and the right column scrolls alone beside ~700 px of empty gradient for more than 6,000 px. In frame 04 the picker's compact header also overlaps its own sliders as it scrolls away. The sibling Palettes inspector route (/#/palettes) measured docH=900, so it stays within the viewport.
- **expected + canon** The Home view's primary content, the picker, should stay dominant. The inspector should scroll within the viewport band like its siblings (Palettes, Mix and Gradient all declare the same `h-full overflow-y-auto pane-scroll-fade` Card recipe), or the stage should be sticky.
- **owner** **CONSUMER**: CONSUMER demo/styles/foundation.css:178-187 (the block-axis cap was deleted at X.W5.b) + demo/scenes/about/AboutPane.vue:4 (its `h-full overflow-y-auto pane-scroll-fade` are dead because the parent is unbounded)
- **fix shape** Bound the inspector slot to the viewport band at the dual-pane breakpoint so the card's own scroll and fade engage, or make the stage column sticky. In either case delete the dead scroll classes if document scroll stays the chosen idiom.

#### UIA-V-65 · HIGH · about-pane · The body font face never loads, so **bold** lead-ins in the guide render at regular weight

- **source** audit #5 · **verdict** CONFIRMED · **state** all states, dev server · **where** Detailed Guide lists ('Better uniformity than CIE LCh.', 'Design system palettes.' …) and all body text
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-03-oklch-seg6.png ; probe2-out.json (bold: fw 700 but width at 700 == width at 400 = 157.76px; document.fonts lists only 'Plus Jakarta Sans Fallback' faces, 3 of them status 'error')
- **observed** <strong> computes to font-weight 700 but renders at the same width and weight as 400. No real 'Plus Jakarta Sans' face is registered, so the body voice falls back to a system sans and the emphasis the guide is written with disappears.
- **expected + canon** glass DESIGN.md:668: 'Plus Jakarta Sans' ships as a variable woff2 with weights 200..800. Bold should render.
- **owner** **CONSUMER**: CONSUMER demo/styles/foundation.css:64-81 (deferGlassFonts marker / plugins/vite-defer-glass-fonts.ts in dev) — app-wide, surfaced here
- **fix shape** Check that the deferred font-corpus import actually reaches the dev page (the marker replacement in the defer plugin). If the corpus is deliberately absent in dev, allow font-synthesis for weight on the fallback face.

#### UIA-V-66 · HIGH · color-space-select · Option rows are 77–81px tall, so the list shows about 4 of 18 spaces

- **source** audit #2 · **verdict** CONFIRMED · **state** open list · **where** picker header and About host, open list, all viewports and themes
- **frame** `color-space-select/` 1440-light-05-open-listbox.png; p2-1440-dark-12-open.png; 1440-dark-06-open-item-hover.png
- **observed** Each option name is set in 32.9px italic display type (`text-title`), the same step as a pane heading, with a monospace conversion line and a swatch underneath. That makes rows 81px tall at 1440 and 77px at 390. The list is capped at 384px (glass-ui `--select-content-max-h: min(24rem,60dvh)`), so the scroll area is 334px against 1471px of content: about 22% shows at once, 4 fully visible rows (HSL/HSV/HWB/Lab). The list opens scrolled so the selected row sits at the bottom, and RGB is half hidden under the scroll-up chevron. It reads more like a poster than a picker, and the user has to scroll to compare spaces.
- **expected + canon** The option text should be clearly smaller than the trigger title, and a list of 18 should show most options without scrolling. The DESIGN.md radius table reserves the stadium shape for single-line controls, and list rows follow the compact control sizing. The owner's docket (COHESION §0bl) asks for less clutter.
- **owner** **CONSUMER**: CONSUMER demo/color-session/ColorSpaceSelector.vue:79 (`text-title` on .specimen-name) + :67 (py-2) + the two-line #description row
- **fix shape** Set the option name one or two type steps smaller (body-lg or heading rather than title) and put the name and conversion on one line, or show the conversion only on the highlighted row. Aim for rows of about 44px so 8–9 show within the 384px cap. Keep the italic display face for the trigger title only.

#### UIA-V-67 · HIGH · dock-main · Collapse morph passes through a small-radius rounded SQUARE and an empty wide plate

- **source** audit #4 · **verdict** CONFIRMED · **state** expand → collapse morph · **where** 1440 light/dark
- **frame** `dock-main/` sheet-d-dark-13-morph-collapse.png, zoom-d-dark-13-collapse-02.png, d-light-13-morph-collapse-00.png, zoom-d-light-13-collapse-00.png
- **observed** Frame 00: every control vanishes at once, leaving a ~560px empty plate with the wax in the middle plus a ghost Home icon and a stray 'H'. Frames 01–03 (~120–360ms): the plate is a ~56px SQUARE with ~8px corners. Only at frame 04 does it snap to the circle. The shape goes pill → square → circle.
- **expected + canon** The radius is a stadium (half-height) at every morph frame, and the content cross-fade rides the same clock as the width leg. No off-canon corner ever appears.
- **owner** **GLASS**: GLASS — GlassDock morph (src/components/dock/styles/morph.css + shape.css): canon DESIGN.md:393 `--radius-dock` = stadium; README:69 'collapse, resize, and layer transitions share the dock spring' · *glass component* GlassDock (src/components/dock/styles/morph.css) · *head* open-at-HEAD
- **fix shape** Keep border-radius at the stadium throughout the collapse (compute from the live block size or hold 9999px), and bind the controls' exit fade to the width leg rather than an instant cut. Relay to the glass session: this is the owner's 'janky transitions / dock pills' docket (COHESION §0ao).

#### UIA-V-68 · HIGH · dock-main · Expand morph desync: content lays out at full width outside the still-growing plate

- **source** audit #5 · **verdict** CONFIRMED · **state** collapse → expand morph · **where** 1440 light/dark
- **frame** `dock-main/` zoom-d-light-12-expand-01.png, d-light-12-morph-expand-01.png, sheet-d-light-12-morph-expand.png, capture-meta.json frames['d-light-14-expand-raf-trace']
- **observed** At ~235ms the plate spans only the right ~60% of the final width, while the Home trigger and the fading pink wax sit OUTSIDE the plate's left edge. The trailing Login/@mbabb zone is absent. rAF trace width goes 56→119→298→412→460→471 over ~300ms, and the content is not clipped to or anchored with the plate.
- **expected + canon** Content is clipped by the plate (or grows from the same anchor) on the shared dock spring (README:69). Nothing paints outside the glass.
- **owner** **GLASS**: GLASS — GlassDock morph / fitContent measure (src/components/dock/composables/useDockMorph.ts, dockMorphMeasure.ts, styles/morph.css) · *glass component* GlassDock (src/components/dock/composables/useDockMorph.ts) · *head* open-at-HEAD
- **fix shape** Clip the full layer to the plate during the morph (clip-path inset tied to the plate's width) or anchor both to the same inline-centre origin. Relay to glass.

#### UIA-V-69 · HIGH · dock-main · Login + @mbabb pass the RETIRED `variant` prop to glass Button: both paint as filled grey capsules with dead border ink

- **source** audit #6 · **verdict** AMENDED · **state** expanded 1440 · **where** 1440 trailing zone, light/dark, user and admin
- **frame** `dock-main/` d-light-02-dock-expanded.png, d-dark-02-dock-expanded.png, d-light-21-admin-dock.png, d-light-24-admin-auth-picker-dock.png
- **observed** glass 7.0.0 Button has only emphasis (primary\|secondary\|quiet\|text) and tone (dist Button.vue.d.ts:4), so `variant` paints nothing. Both controls fall to default secondary emphasis: computed bg oklab(0.72 … / 0.6) glass-wash with border '0px none'. The @mbabb wordmark (meant as ghost/text) and Login (meant as outline) render as muddy grey slabs behind crimson/brown mono text. They are 28px tall against the 32px dock triggers, and their hover change is imperceptible (d-light-04-hover-login vs 02).
- **expected + canon** Every dock control is a dock primitive (README:21-22: DockControl is the button face; DockTrigger applies it to dropdown triggers). There are no filled capsules inside the dock plate, and one height per row.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/menus/ProfileSection.vue:59-68 (Profile, variant="outline"), :130-139 (Login, variant="outline"), :154-160 (@mbabb, variant="ghost"); dead `borderColor` at :63/:134. Same retired prop at 64 sites app-wide (grep variant="outline\|ghost\|…" demo)
- **fix shape** @mbabb → <DockTrigger for="dropdown"> (the same face as the 390 kebab, MobileMenuDropdown.vue:40). Login → <DockControl compact> with icon and label, like Tools. Separately, sweep the 64 retired `variant=` sites to emphasis/tone.
- **confirm** The visual defect stands. In d-light-06 and d-light-02, Login and @mbabb are 28px filled glass-wash capsules (capture-meta bg oklab(0.72…/0.6)), while the dock triggers are 32px. But the retired-prop cause is already partly stale. At HEAD ce391643, ProfileSection.vue has NO `variant=` (it was deleted in 69c0d255 'delete inert glass-component props'), so line cites :59-68/:130-139/:154-160 have shifted. The `borderColor` in :style is still dead (lines :62, :73, :132). The app-wide count is now 46 retired `variant=` sites, not 64 (git grep at e97c8afc = 64). Small visual amendment: in dark (d-dark-07) both capsules show a hairline ring that light does not, so 'border 0px none' holds for light only. The fix (DockTrigger for @mbabb, DockControl for Login) stands.

#### UIA-V-70 · HIGH · dock-main · Four dock controls, four faces and three type voices; separators between every control

- **source** audit #7 · **verdict** CONFIRMED · **state** expanded 1440 · **where** 1440 light/dark
- **frame** `dock-main/` d-light-02-dock-expanded.png, d-dark-02-dock-expanded.png, d-light-21-admin-dock.png
- **observed** From capture-meta radii: · Home: DockTrigger, Fraunces 16.4px/400, flat. · Tools: DockControl compact, Plus Jakarta box with a Fraunces label, accent ink, black ArrowRight. · Login: Fira Code 16.4px/700, filled capsule. · @mbabb: Fira Code/500, filled capsule. · Admin: Fira Code/700, gold-outlined pill. There are 3 DockSeparators for 4 controls. In dark only, Home and Tools show resting hairline capsule outlines that light does not. The sibling keyframes app just cured this same clutter (commit 1389e4c4 / KF.W13U.d OA-33: the trailing zone is the @mbabb trigger alone, with Share/theme in its dropdown).
- **expected + canon** One dock voice (the demo DESIGN.md chrome rung, and README:28-30 on grouping with separators between GROUPS, not between every control). Cohesion with the sibling apps' trailing identity zone.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/Dock.vue:216-292 composition; ProfileSection.vue:46-143; ActionBarToggle.vue:82-104; DockViewSelect.vue:66-88
- **fix shape** Reduce to [view select] [Tools] \| [@mbabb ▾], with Login/Profile/admin identity as rows in the @mbabb menu, as keyframes did. That uses one separator between the nav group and the identity group, and one font voice for dock labels.

#### UIA-V-71 · HIGH · dock-main · GitHub row in both identity menus is broken: the icon stacks ABOVE the label

- **source** audit #8 · **verdict** CONFIRMED · **state** menu open · **where** @mbabb menu (1440) and mobile Menu (390)
- **frame** `dock-main/` d-dark-07-mbabb-menu-open.png, m-light-03-menu-open.png
- **observed** The GitHub glyph sits on its own line with 'GitHub' below it, left-flush and out of the icon column. Every other row is icon + label inline.
- **expected + canon** One row recipe for menu items (a glass DropdownMenuItem row).
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/menus/ProfileSection.vue:177-183 and its twin demo/shell/dock/menus/MobileMenuDropdown.vue:111-116 (DropdownMenuItem as-child onto a bare <a class="no-underline text-foreground">)
- **fix shape** Give the anchor `flex items-center gap-2` (as-child replaces the item's own layout host), or make it a normal DropdownMenuItem that opens the URL on @select.

#### UIA-V-72 · HIGH · dock-view-select · View list has no current-view indicator: the selected row looks identical to every other row

- **source** audit #1 · **verdict** CONFIRMED · **state** selected · **where** both lists, 1440 and 390, both themes, open state
- **frame** `dock-view-select/` user-1440-light-01-open.png (Home selected), user-1440-dark-05-mix-open.png and user-390-dark-05-mix-open.png (Mix selected), admin-1440-dark-03-admin-open.png (Users selected)
- **observed** probe.json: the selected row has aria-selected=true but data-highlighted=false, background rgba(0,0,0,0) and weight 400, the same as its siblings. hide-indicator removes the producer's check mark. The comment says the producer's 'glass-quiet highlighted-on-open row' marks selection, but no row is highlighted when the menu opens. Nothing shows the user where they are.
- **expected + canon** Canon: glass SelectItem's default indicator is 'start' (glass-ui src/components/_shared/menu/rowClass.ts, the start variant reserves ps-7 for the check mark). The selected row needs a visible, non-weight marker.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/DockViewSelect.vue:97 and :128 (hide-indicator); the claim in the :100-108 comment is false
- **fix shape** Remove hide-indicator and use the producer's start check. Or ask glass for a quiet [data-state=checked] fill on .glass-menu-row. Either way, correct the false comment.

#### UIA-V-73 · HIGH · dock-view-select · Gold 'Admin' row text is 2.22:1 on the light popover

- **source** audit #2 · **verdict** CONFIRMED · **state** default · **where** user list with the admin token set, light theme, 1440 and 390
- **frame** `dock-view-select/` admin-1440-light-01-open.png, crop-light-admin-row.png
- **observed** Measured from the frame: the darkest 2% of the ink is rgb(192,122,40) on a plate of rgb(254,191,191), 2.22:1. The same row in dark measures 4.93:1.
- **expected + canon** WCAG 1.4.3 requires at least 4.5:1 for body-size text. The gold identity has to survive the light theme.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/DockViewSelect.vue:134-135 (gold-shimmer on the label)
- **fix shape** Give the label a light-theme gold ink step of at least 4.5:1, or keep the label in ink and let only the Shield icon carry gold.

#### UIA-V-74 · HIGH · dock-view-select · The dock's gold 'admin' pill has the same light-theme contrast failure as the Admin row

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `dock-view-select/` admin-1440-light-01-open.png, admin-1440-light-04-admin-hover.png
- **observed** The gold mono 'admin' text on the pale pink dock plate looks about as weak as the 2.22:1 Admin row. It is also an inline-style color literal, not a token or class.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue:114 (inline style color: var(--color-gold), border-color: var(--color-gold), plus gold-shimmer)
- **fix shape** The same light-theme gold ink step (at least 4.5:1) as the Admin row. Move the style into a class or token. Fold this into the admin-affordance redesign.

#### UIA-V-75 · HIGH · dock-action-bar-color · Action seats are hand-rolled 32px buttons, not DockControl; the layer mixes two control registers

- **source** audit #3 · **verdict** CONFIRMED · **state** rest, hover, focus · **where** every action-bar scene, both viewports, both themes
- **frame** `dock-action-bar-color/` light-d-picker-01-actions-dock.png, dark-m-generate-01-actions-dock.png, light-d-picker-03-focus.png; capture-log.json *-actions seats[].btn {w:32,h:32,radius:'4px'} vs back {40x40 desktop / 46.8x46.8 coarse, radius 9999px}
- **observed** In the same row, Back and the arm toggle are glass DockControls: glass-capsule hover, specular gleam, a capsule focus ring, 40px wide (46.8px on coarse pointers). The five scene seats are bare 32px buttons whose hover is an icon scale(1.2) plus an accent stroke, and whose focus ring is a 2px square ring with 4px corners (rounded-sm). The seats sit 38px apart while Back gets 46.8px, so the row looks cramped next to Back.
- **expected + canon** glass DESIGN.md:11: interactive elements are components that carry the four-state contract, not recipes. DESIGN.md:13: no scattered hardcoded transforms. dock README:21-22: DockControl is the button face, and DockTrigger gives popover triggers the same face. radius.css:140ff: --radius-control retires the raw rounded-sm.
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/shell/dock/ActionButton.vue:13-20,105-120 (a bare <button class=action-button-wrapper> at 2rem, rounded-sm focus ring, hover scale(1.2)); GLASS for the coarse floor, see the next finding · *glass component* DockControl · *head* open-at-HEAD
- **fix shape** Render each seat as <DockControl :active :aria-label> (or DockTrigger wrapped in the hover Popover), and delete ActionButton's box, hover transform and focus-ring classes. Keep only the click-feedback keyframe, moved onto the spring tokens.

#### UIA-V-76 · HIGH · dock-action-bar-color · Coarse-pointer target floor is not applied: seats are 32px and the compact Tools trigger is 33.4px

- **source** audit #4 · **verdict** AMENDED · **state** rest · **where** 390x844 with touch, all color and workbench scenes, main layer (Tools) and actions layer (seats)
- **frame** `dock-action-bar-color/` dark-m-picker-00-main-layer.png (Tools); light-m-picker-01-actions.png (seats); capture-log.json light-m-picker-main toolsBtn 33.4x33.4, seats 32x32, back 46.8x46.8
- **observed** On a touch viewport DockControl non-compact grows to 46.8px, but the compact Tools trigger stays at 33.4px and every scene seat stays at 32px.
- **expected + canon** 44px minimum on coarse pointers for every dock control (dock README:71-72; WCAG 2.5.5).
- **owner** **GLASS+CONSUMER**: GLASS — dock/styles/controls/touch-floor.css:25 exempts .dock-icon-button--compact from the 44px coarse floor, against dock README:71-72 ('Interactive controls preserve a 44px coarse-pointer target floor'). CONSUMER — ActionBarToggle.vue:86-95,154-158 (compact DockControl + padding override) and ActionButton.vue:109-110 (2rem box) · *glass component* DockControl (styles/controls/touch-floor.css:25) · *head* open-at-HEAD
- **fix shape** GLASS: extend touch-floor.css to cover the compact variant with a min-block/inline-size floor (not --dock-control-size). CONSUMER: comes free once seats are DockControls (finding 3). Send this to the glass-ui session.
- **confirm** The measurements are confirmed (light-m-picker-main toolsBtn 33.4x33.4, seats 32x32, back 46.8). The GLASS citation is wrong. touch-floor.css:25 is the STANDALONE floor, scoped :not(:where(.glass-dock *)), so it would not apply inside the dock even without the compact exemption. The operative glass gap is icon-button.css:235-240: .dock-icon-button--compact sizes to --dock-compact-control-size/auto + padding and so bypasses the in-dock floor, which lives only on --dock-control-size's max(…,44px) clamp (density.css:107, :381). The glass-idiomatic cure already exists one rule below in touch-floor.css:30-55, the ::after hit-slop applied to .dock-trigger/.dock-select-trigger/.dock-dropdown-trigger. Route to glass: extend that hit-slop selector to .dock-icon-button--compact, not a box min-size. The consumer half stands (ActionBarToggle.vue:86 compact plus the --dock-compact-control-padding override at :154-158; the seats via ActionButton).

#### UIA-V-77 · HIGH · dock-color-input · The 'not a valid color' badge covers the typed text and the send button, and spills past the field onto the dock separator

- **source** audit #4 · **verdict** AMENDED · **state** invalid parse · **where** ColorInput.vue:87 .error-badge
- **frame** `dock-color-input/` 1440-light-06-invalid-enter-400ms.png (field 96px, badge wider than the field and covering 'zzzz'), 1440-light-06d-probeB-focused-pointer-away.png ('notac' + badge over the rest of the text and the arrow)
- **observed** A hand-rolled red 4px-radius chip is positioned absolutely over the right end of the field. With a short entry it covers all of the text and runs past the field's left edge. The user cannot see what they typed or reach the send arrow. It has no aria-live, so screen readers get nothing.
- **expected + canon** Error text sits outside the value (a field description or error row below or under the dock field, or a glass Badge/tooltip anchored to the field) and is announced. Canon: a badge uses --radius-badge (stadium) per glass DESIGN.md radius role table (:385-391); the error message belongs in the LabeledField #error slot (polite live region).
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:84-90 (template), :349-368 (.error-badge: absolute right .5rem, --radius-sm 4px, raw --destructive fill)
- **fix shape** Remove .error-badge. Signal the error with the field's invalid ring and an aria-live error line under the field (or a glass Tooltip anchored to the field) that never overlays the value.
- **confirm** CONFIRMED by 06: the red chip covers all of 'zzzz', runs past the field's left edge onto the separator, and there is no aria-live (ColorInput.vue:86-90, .error-badge :349-367 with --radius-sm and a raw --destructive fill). Correction: the second citation is wrong. 06d shows 'notacolor(' with NO badge (log row 26: err:false at probeB+3.5s, because the 2 s clear had already fired). Drop 06d as evidence, or replace it with the log row 24 state (err:true at D-typed+2.4s), which has no surviving frame.

#### UIA-V-78 · HIGH · dock-color-input · The dock field is a hand-rolled contenteditable span: a square white 4px box inside the stadium dock instead of the glass dock-field or Input pill

- **source** audit #5 · **verdict** CONFIRMED · **state** all input and propose states · **where** ColorInput.vue:13-16
- **frame** `dock-color-input/` 1440-light-02a-input-open-midflash.png, 1440-light-03-hover-popover-open.png, 1440-light-08-propose-mode-empty.png (log radiusVars: --radius-input 0.25rem, border-radius 4px, bg rgb(251,250,248))
- **observed** An opaque paper-white rectangle with 4px corners and a 1px --input hairline is set into a stadium (9999px) glass dock. It reads as a foreign form control pasted into the chrome, and the corner mismatch is plain to see. The white fill is paper register on rung-3 chrome.
- **expected + canon** Glass DESIGN.md :385-386: --radius-control is the stadium for a single-line control/field. demo/DESIGN.md :112-118 (register law): glass `.input-bar` is rung-3 dock furniture and 'Dock/overlay search keeps the floating pill'. Glass dock ships the field seat (GlassDock `#search` slot → `.dock-search-field .input-bar` with glass-plate and --on-glass-muted placeholder, dock/styles/search.css:35-60). demo/DESIGN.md:201 says rounded-input = 8px, which is also stale (measures 4px, and the token is retired in glass as --radius-media).
- **owner** **GLASS+CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:11-27 (class list :16 'bg-background rounded-input border ...'); GLASS pin note: consumer runs glass 7.0.0, whose dist/styles/components.css :root re-declares Tailwind defaults `--radius:0.25rem; --radius-lg:0.5rem`, so --radius-input computes to 0.25rem (glass HEAD 10.0.1 dist no longer emits that block — repin, and relay to the glass session as the 7.x leak) · *glass component* dock (dist/styles/components.css) · *head* cured-at-HEAD (:root radius re-declare) + consumer rebuild
- **fix shape** Rebuild the arm on the glass Input (native <input type=text>, size to the dock) seated in the dock's field seam (`#search` slot / .input-bar), with a stadium radius and glass-plate fill. Drop contenteditable, bg-background and rounded-input. Correct demo/DESIGN.md:201. Repin glass past the :root radius leak.

#### UIA-V-79 · HIGH · dock-color-input · The field sizes to its content, so the whole dock resizes on every keystroke and an empty field shrinks to a 50px stub with no placeholder

- **source** audit #6 · **verdict** CONFIRMED · **state** input mode empty / typing · **where** ColorInput.vue:16; ActionBarLayer.vue:136
- **frame** `dock-color-input/` 1440-light-04-input-empty-focused.png (field 50px, dock 192px, only the arrow visible), 1440-light-05-typing-parse-echo.png (log widths: 50→96→165→268→325px; dock 192→467px)
- **observed** Clearing the field leaves a tiny white box holding only the arrow, with no placeholder or hint in input mode (data-placeholder is set only in propose mode, :262). Typing grows the field and re-centres the whole dock every character, and the text is centred (text-center), so the caret moves too.
- **expected + canon** A stable field measure (min-inline-size, e.g. the dock field cap), left-aligned text entry, and a placeholder in input mode ('oklch(…), #hex, name…').
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:16 (w-full inside a fit-content dock), ActionBarLayer.vue:135-149
- **fix shape** Give the field a fixed or min inline-size token, left-align the text, and set a placeholder in input mode too. The glass dock field seam already carries a stable field width.

#### UIA-V-80 · HIGH · dock-color-input · The 'live parse' isn't live: a 2 s debounce, and the echo readout only appears in a hover popover that doesn't open while you type

- **source** audit #7 · **verdict** AMENDED · **state** typing: ParseEchoReadout live parse · **where** useColorParsing.ts:94
- **frame** `dock-color-input/` 1440-light-05-typing-parse-echo.png (the field shows oklch(0.7 0.25 150), the picker still shows Lab 92/88.8/20, no echo visible), 1440-light-03-hover-popover-open.png
- **observed** While typing, nothing responds for 2 s. The AST echo and gamut verdict only show if the pointer leaves the field and hovers again. The popover then shows the value three times: the field text, the serialized line (ColorInput.vue:103-105) and the echo 'LAB l 92% a 88.8 b 20 α 0.827'.
- **expected + canon** Parse feedback within about 150–250 ms and visible next to the field while it has focus. One rendering of the value, not three.
- **owner** **CONSUMER**: CONSUMER demo/color-session/useColorParsing.ts:94 (debounce 2000), demo/shell/dock/ColorInput.vue:94-110 (ParseEchoReadout only inside PopoverContent), demo/shell/dock/ParseEchoReadout.vue:11-29
- **fix shape** Cut the debounce to about 200 ms (Enter still commits at once). Show ParseEchoReadout as the field's description row, or open the popover on focus rather than hover. Drop the duplicate serialized line and the separator between them.
- **confirm** CONFIRMED: debounce(parseAndSetColor, 2000) at useColorParsing.ts:94, and in 05 the field shows oklch(0.7 0.25 150) while the picker still reads Lab 92/88.8/20, with no echo on screen. The fix needs to go further. ParseEchoReadout (ParseEchoReadout.vue:32-35) renders astEcho/gamutVerdict, which derive from model.value.color (useColorParsing.ts:102-104). That is the COMMITTED color, not the field text. So the echo never parses what is being typed. While the text is partial or invalid, it shows the old color's AST and gamut verdict with full confidence, and cutting the debounce to about 200 ms does not change that. The echo should parse the field text: show the candidate AST, or an 'unparsed' state. The duplicated value (03: field + serialized line + echo) is confirmed.

#### UIA-V-81 · HIGH · dock-color-input · INCIDENTAL (outside seat): :9000 dev server stalls or hangs, the About pane fails to import lab.md, aurora WebGPU canvas exceeds the max texture size, and the renderer froze after a parse

- **source** audit #17 · **verdict** CONFIRMED · **state** any · **where** vite pid 50026 on :9000; aurora canvas; demo About pane
- **frame** `dock-color-input/` 1440-light-02-input-mode-resting.png (first run: 'This panel hit an unexpected error. Failed to fetch dynamically imported module …/assets/docs/lab.md?import'), 1440-light-10-proposing-spinner.png ('Loading the scene…' stuck)
- **observed** (a) :9000 answered, stalled, then gave TCP connect timeouts for 20+ minute stretches (12:48–13:11, again from about 13:15 to 13:37) while still LISTENing. Not restarted, per LAW. (b) Console repeats 'Texture size 2160x11337 exceeded maximum 8192' and '[aurora] init failed' every frame: document height about 7.5k CSS px at 1440. (c) The page renderer stopped producing frames after typing oklch(0.7 0.25 150) (screenshot timeouts, 2 of 2 attempts). Could be the instrument; PLAUSIBLE. (d) ?color=%23abcdef was ignored: boot showed the persisted lab(92% 88.8 20 / 82.7%).
- **expected + canon** The dev server answers, the aurora canvas is sized to the viewport rather than the document, and the About pane loads.
- **owner** **CONSUMER**: CONSUMER (dev infra / demo scenes/atmosphere aurora mount); report only, other seats own it
- **fix shape** Route (a) to whoever owns the dev server. Clamp the aurora canvas to the viewport or maxTextureDimension2D. Check the ?color hydrate path against the hash route.

#### UIA-V-82 · HIGH · dock-color-input · The ground drops to black and the panes go grey mid-session (aurora lost), at sha 307791a4

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `dock-color-input/` docs/tranches/X/audit/ui-evidence/value/dock-color-input/1440-light-08-propose-mode-empty.png and 08a-dock (sha 307791a4 dirty 15)
- **observed** In 08 the page ground is a flat near-black texture, both panes are a desaturated grey with no drop shadow, the dock is a grey plate, and About is stuck on 'Loading the scene…'. The earlier frames (02p/03/05) have the pink aurora. The audit's incidental row mentions aurora init failures but never flags this visible state. It may be a transient from the concurrent tree edits (dirty 15), so it needs a re-probe.
- **owner** **CONSUMER**: CONSUMER (scenes/atmosphere aurora; incidental, and matches the value §0ao black-ground docket)

#### UIA-V-83 · HIGH · dock-slug-edit-layer · When regenerate fails, the stored identity is already wiped, while the UI still shows the old slug

- **source** audit #4 · **verdict** AMENDED (worse than stated) · **state** identity verdict failed · **where** dock slug-edit layer · Generate new slug (logged in, API unreachable)
- **frame** `dock-slug-edit-layer/` 1440-light-13-regen-failed-logged-in.png, 1440-light-14-regen-failed-logged-in-menu.png, 390-light-14-regen-failed-logged-in-menu.png
- **observed** After the failure, localStorage palette-user-slug is null and the token is cleared, but the menu still shows 'sable-wishing-charcoal-impala' with 'The new slug was not issued: Backend unreachable — working locally.' A reload silently logs the user out, and the old identity is gone.
- **expected + canon** Replacing the identity is atomic: the old slug and token are cleared only after the new session is issued, or restored when createSession throws. The verdict's 'working locally' promise is then true.
- **owner** **CONSUMER**: CONSUMER — demo/platform/auth/useUserAuth.ts:118-120 (safeRemoveItem(SLUG_KEY) and clearPersistedToken() run BEFORE createSession() at :123; on throw nothing is restored)
- **fix shape** Snapshot the slug and token, attempt createSession, and persist the new pair on success or restore the snapshot on failure. deleteSession of the old session should come after the new one is issued.
- **confirm** Confirmed. useUserAuth.ts:118-119 clear SLUG_KEY and the token before createSession (:122). Frames 1440-light-13/14 and 390-light-14 show ls palette-user-slug=null while the menu still shows the old slug with the 'working locally' verdict. Amendment: :113-116 also call deleteSession() on the OLD server session first. Restoring localStorage on failure is therefore not enough, because the old token is already revoked server-side. The fix must reorder the calls (issue the new session, then persist it, then delete the old one), not only snapshot and restore. The docblock at :109-111 ('Atomically replace') is false. Owner CONSUMER.

#### UIA-V-84 · HIGH · dock-slug-edit-layer · 'Generate new slug' failures started from the layer are invisible (always when logged out, until the menu is reopened when logged in)

- **source** audit #5 · **verdict** CONFIRMED · **state** identity verdict failed (API aborted), logged out and logged in · **where** dock slug-edit layer · Generate new slug
- **frame** `dock-slug-edit-layer/` 1440-light-10-regen-failed-logged-out.png, 390-dark-11-regen-failed-logged-out-menu.png, 1440-light-13-regen-failed-logged-in.png
- **observed** Logged out: the layer closes and the verdict is rendered nowhere, not even in the reopened 390 Menu (verdict=[]). The only signal is the generic corner chip 'backend offline — saved locally', which at 390 is an unlabeled dot. Logged in: the failure exists only inside the closed Profile/Menu dropdown, and a success (frame 12) gives no in-dock confirmation either. The X.W7.d MMD-2 carry-lock ('verdict rendered in the menu it was taken from') does not cover this third call site.
- **expected + canon** The act's verdict appears where the act was taken, in the dock layer itself, whether or not the user is logged in.
- **owner** **CONSUMER**: CONSUMER — SlugEditLayer.vue:119 (closes the layer, then fires pm.onRegenerateSlug()); the verdict row renders only inside the logged-in menu branch: ProfileSection.vue:51 + :100-108, MobileMenuDropdown.vue:45 + :74-82; the logged-out branches (ProfileSection.vue:120-140, MobileMenuDropdown.vue:88-93) have no verdict
- **fix shape** Keep the layer open while identity.kind==='pending' and render pm.identity (pending, done or failed) in the layer, then close on done. Alternatively, remove Generate from this layer and leave it only in the menu twins, which already carry the verdict (see the clutter finding).

#### UIA-V-85 · HIGH · dock-slug-edit-layer · At 1440, opening the layer lands focus on the dock face instead of the field, which then shows a square UA focus ring

- **source** audit #7 · **verdict** AMENDED · **state** empty field; also after every layer swap (admin submitted, switch outcome) · **where** dock slug-edit layer at 1440 (Login clicked in the main face)
- **frame** `dock-slug-edit-layer/` 1440-light-01-empty-field.png (activeElement=DIV.dock-face), 1440-dark-06-switching-60ms.dock.png, 1440-light-05-admin-token-submitted.png, 390-light-09-malformed-slug-submitted.png
- **observed** The caret is not in the field: typing does nothing until the user clicks or Tabs into it. The mobile path, which starts from a portaled menu, does focus the input. After each layer swap the face shows a rectangular 2px UA outline (blue, or orange in admin mode) inscribed inside the stadium dock.
- **expected + canon** When the entering face already holds focus, the producer does not steal it, so the consumer's field focus survives. If the landing-pad face is focused, it does not paint a UA rectangle; any ring follows the dock ring token and stadium radius.
- **owner** **GLASS**: GLASS — DockCrossfade.vue:154-161 transferFocusOnDissolve focuses the entering `.dock-face` host a nextTick later, overwriting the consumer's own nextTick input.focus() (SlugEditLayer.vue:20-22); DockLayer.vue:87 gives the face tabindex=-1 and no `.dock-face:focus-visible` rule is styled (only the switcher tab ring at layer-group.css:320-322). Canon: the dock ring register --dock-ring-* and the stadium container --radius-dock · *glass component* DockCrossfade (DockCrossfade.vue:154-161) · *head* open-at-HEAD
- **fix shape** GLASS (relay to the glass-ui session): in transferFocusOnDissolve, skip the focus when `faceEl(toId)?.contains(document.activeElement)` after the nextTick, or focus `[autofocus]`/the first field in the entering face. Add `.dock-face:focus-visible { outline: none }` (landing pad) or a ring on --dock-ring-* with --radius-dock. CONSUMER interim: none needed once the producer check exists.
- **confirm** Focus steal CONFIRMED. At 1440-light/dark-01, activeElement is DIV.dock-face with inputFocused=false. At 390, where the reach path starts from a portaled menu that fromHost does not contain, the input is focused. glass DockCrossfade.vue:155-162 (source unchanged since 1c1f1f67; lines have shifted by +1) focuses faceEl(toId) after a nextTick scheduled during the watcher flush, which lands after the consumer's earlier nextTick input.focus(). Owner GLASS confirmed. Ring AMENDED: at frame 01 the face paints no ring (activeFocusStyle 'none 1.5px'). The rectangular 1px UA ring (outline 'auto', blue rgb(0,95,204) light / rgb(153,200,255) dark, orange rgb(229,151,0) at 390) appears after the keyboard-submit swap back to the main face: seen in 1440-light-05.dock and 1440-dark-06.dock, and recorded as outline auto 1px (not viewed) in 390-light-05/08. Cite those frames for the ring, not 1440-light-01. DockLayer.vue:87 tabindex=-1 and no .dock-face:focus-visible rule (only layer-group.css:320 for switcher tabs), so the ring fix is GLASS.

#### UIA-V-86 · HIGH · dock-slug-edit-layer · The 390-dark 12-14 capture run is mislabeled: the live Generate did not issue a slug

- **source** confirm miss #1 · **verdict** MISSED (confirm seat) · **severity note** HIGH (evidence integrity, and possibly the invisible-failure bug again)
- **frame** `dock-slug-edit-layer/` capture-log: 390-dark-12-regen-live-ok has ls palette-user-slug=null, loginBtn=true, verdict=[]. As a result, 390-dark-13 ('logged in') and 390-dark-14 ('menu reopened: the verdict row') are logged-out captures with verdict=[]. Either the API refused createSession (rate limit after repeated runs) or the capture raced. In both cases the user got no feedback that Generate failed with the API up, which strengthens the invisible-failure finding. The audit should drop or re-capture 390-dark-12..14 and not cite them as the states they are named for.
- **observed** capture-log: 390-dark-12-regen-live-ok has ls palette-user-slug=null, loginBtn=true, verdict=[]. As a result, 390-dark-13 ('logged in') and 390-dark-14 ('menu reopened: the verdict row') are logged-out captures with verdict=[]. Either the API refused createSession (rate limit after repeated runs) or the capture raced. In both cases the user got no feedback that Generate failed with the API up, which strengthens the invisible-failure finding. The audit should drop or re-capture 390-dark-12..14 and not cite them as the states they are named for.
- **owner** **CONSUMER**: AUDIT harness; CONSUMER if reproduced

#### UIA-V-87 · HIGH · dock-mobile-menu · Slug edit layer (reached from Login / Switch account) overflows the 390 dock: Cancel is fully off-screen, regenerate is clipped, and the placeholder is truncated

- **source** audit #2 · **verdict** CONFIRMED · **state** slug edit layer active · **where** 390, both themes, logged-in 'Switch account' and logged-out 'Login'
- **frame** `dock-mobile-menu/` light-390-in-8-switch-account.png, dark-390-out-8-login-clicked.png, light-390-in-9-slug-layer-measure.png
- **observed** The clipping layer (.dock-layer--full, overflow:auto) spans x 50→340. Cancel sits at x 363→407, entirely outside it. Generate-new-slug sits at 312→356, partly clipped. The placeholder needs 190px but the input is w-40 = 160px, so it reads 'enter slug or toker'. On touch the only way out is scrolling the dock sideways. Escape works but touch has no Escape.
- **expected + canon** The layer fits a 390 viewport, including the 16px gutter law, and every exit is visible. The field flexes to the space left over; a fixed w-40 should not force overflow.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/layers/SlugEditLayer.vue:90-96 (input fixed at `w-40`) and :108-130 (three compact DockControls)
- **fix shape** Make the input flex-1 min-w-0 (drop w-40) and shorten the placeholder to 'slug or token'. Drop the duplicate regenerate control from this layer, since the menu already offers 'Regenerate slug', so input + submit + cancel fit. Check again at 320px.

#### UIA-V-88 · HIGH · dock-mobile-menu · Glass menu CSS sits outside any cascade layer, so every consumer utility on a menu row is dead: `text-small` and `text-muted-foreground` never apply

- **source** audit #3 · **verdict** AMENDED · **state** menu open, logged in · **where** 390 both themes (and every consumer of DropdownMenuItem)
- **frame** `dock-mobile-menu/` light-390-in-1-open.png (the 'Regenerate slug' row is not muted); probe-measure.mjs output
- **observed** The 'Regenerate slug' row has class text-muted-foreground but computes to rgb(28,25,23), the same colour as 'Logout'. Every row has class text-small (clamp(.875rem…)) but computes to 21px. The unlayered glass rule beats Tailwind's @layer utilities.
- **expected + canon** Glass component CSS ships inside `@layer components`, like the rest of glass-ui.css, so consumer utilities and the documented class prop can adjust a row (DESIGN: tokens and class passthrough are the override channel).
- **owner** **GLASS+CONSUMER**: GLASS dropdown-menu (dist/glass-ui.css: `.dropdown-menu__item` at offset 29179, outside `@layer components` which spans 2503–19139; the rule sets `color: inherit; font-size: var(--dropdown-text)`). CONSUMER sites that look styled but are not: MobileMenuDropdown.vue:52,55,58,62,90,107,111,120 · *glass component* _shared/menu CSS outside @layer components (dist/glass-ui.css) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** GLASS: wrap the dropdown-menu component styles (and the other unlayered component blocks) in @layer components. CONSUMER: once that lands, remove the per-row `text-small` (rows should read the governed --dropdown-text), and keep or drop `text-muted-foreground` on purpose.
- **confirm** The mechanism is confirmed in the live CSSOM: '.dropdown-menu__item, .dropdown-menu__sub-trigger {color:inherit; font-size:var(--dropdown-text)}' is UNLAYERED, while .text-small and .text-muted-foreground sit in @layer utilities (and in components). The Regenerate row computes rgb(28,25,23) at 21px like every other row. The fix is already in glass: glass HEAD CHANGELOG ('Changed — every library style rule sits in @layer components', 466 rules moved and styles.css opening with '@layer theme, base, components, utilities;') covers the post-9.0.0 major. So this is not a new glass bug to relay. The fix is to publish that unreleased major and have the consumer adopt it, 7.0.0 → HEAD. HIGH stands for the consumer's dead classes until then.

#### UIA-V-89 · HIGH · dock-mobile-menu · Slug layer placeholder truncation reproduces in dark logged-out Login flow and at every theme; there is no visible exit on touch in either

- **source** confirm miss #4 · **verdict** MISSED (confirm seat) · **severity note** HIGH (extends finding 2)
- **frame** `dock-mobile-menu/` confirm/c-dark-390-out-login.png
- **observed** 
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/layers/SlugEditLayer.vue

#### UIA-V-90 · HIGH · dock-profile-menu · Profile, Login and @mbabb pass the retired glass Button `variant` prop, so all three render as plated secondary capsules with a gray slab

- **source** audit #4 · **verdict** AMENDED · **state** signed-in dock (Profile trigger), signed-out dock (Login), @mbabb · **where** the served dist button-Bu9F4uU6.js has props {emphasis:'secondary', tone, size, ...} and no variant
- **frame** `dock-profile-menu/` light-1440-2-signed-in-dock-zoom-trigger.png, dark-1440-2-signed-in-dock-zoom-trigger.png, light-1440-10-after-failed-reload-crop.png (Login)
- **observed** variant="outline" and variant="ghost" fall through as unknown DOM attributes, so every one of these buttons is emphasis=secondary with classes 'glass-wash glass-capsule glass-capsule-hover'. The fill oklab(0.72 0.005 0.011 / 0.6) paints a muddy gray slab behind the label in light theme. The @mbabb wordmark, which was meant to be unplated ('ghost'), wears a plate. The inline borderColor accent is dead (computed border 'none 0px'). Next to them, Home and Tools (DockTrigger / DockControl) are clear at rest, so these read as sub-plates inside the dock plate.
- **expected + canon** Dock dropdown triggers use the dock face: DockTrigger for="dropdown", as MobileMenuDropdown.vue:41 already does. No retired props.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue:59-64, :130-135, :154-158 (canon: glass-ui src/components/button/Button.vue:127-146, where variant is retired in favour of emphasis/tone; dock/README.md:21-22, where DockTrigger is the dropdown-trigger face)
- **fix shape** Profile → <DockTrigger for="dropdown">; @mbabb → DockTrigger (the wordmark's unplated face); Login → DockControl. Delete variant= and the dead :style borderColor. Glass relay: the dev-only retired-prop console.error did not fire on the served dist; consider making the warning visible in consumer dev builds.
- **confirm** The cause is no longer present at HEAD. Commit 69c0d255 (2026-09-23 13:27, after the capture SHAs c25f8968/de278769/f95a2f77, which all still carry variant= at :60/:131/:155) deleted the three variant bindings as inert props, with a stated null pixel delta. The visible defect is unchanged: the bare Button still defaults to emphasis secondary glass-capsule, so the gray slab in light-1440-2-signed-in-dock-zoom-trigger.png and the plated @mbabb persist. The dead :style borderColor also still sits at ProfileSection.vue:62 and :132, and the log shows border 'none 0px'. The finding should say 'bare glass Button (emphasis secondary) where the dock face is owed'. The DockTrigger/DockControl fix stands, since MobileMenuDropdown.vue:40 already uses DockTrigger for="dropdown" and dock/README.md:21-22 confirms it. Owner is CONSUMER. The glass dev-warning relay is still valid: Button.vue:127-146 in 10.0.1 carries the retired-prop warning, which the 7.0.0 dist being served predates.

#### UIA-V-91 · HIGH · dock-profile-menu · The dock's trailing zone has two identity/utility triggers, off-idiom against its siblings and keyframes

- **source** audit #5 · **verdict** CONFIRMED · **state** signed-in dock, profile menu open · **where** ProfileSection renders DockSeparator \| Profile menu \| DockSeparator \| @mbabb menu at lg; MobileMenuDropdown folds everything into one ⋮
- **frame** `dock-profile-menu/` light-1440-2-signed-in-dock-crop.png, dark-1440-16-menu-after-slug-login.png, light-390-3-menu-open-done.png
- **observed** At 1440 the dock ends in two bold-mono capsule triggers (Profile, @mbabb), each opening its own menu, and the account and utility content is split across them. At 390 the same content lives in one menu. keyframes cured the same shape to a single trailing @mbabb trigger holding share, shortcuts and theme (value.js commit 1389e4c4, KF.W13U.d OA-33). 'Profile' is a generic label, and the actual identity (the slug) appears only after opening. The dock now carries three type voices: Fraunces labels, Fira Code bold 'Profile', and Fira Code '@mbabb'.
- **expected + canon** One trailing identity trigger per app, cohesive across the constellation. The desktop and mobile menus carry the same content, so they should be one component instead of hand-kept twins.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue:46-199 + demo/shell/dock/Dock.vue:272-290
- **fix shape** Collapse ProfileSection and MobileMenuDropdown into one menu (identity header, account rows, share, GitHub, theme) behind one DockTrigger, whose label is the identity (slug, 'admin', or 'Sign in'). Retire the second trigger and its separator.

#### UIA-V-92 · HIGH · dock-profile-menu · The slug identity header and the admin pill are hand-rolled stadium chips; the owner rejects them as 'too rounded' and wants them card-like

- **source** audit #6 · **verdict** CONFIRMED · **state** profile menu open; admin · **where** .slug-pill measured radius 1.67772e+07px, 1px border in live ink, Fira Code 16.4px/700
- **frame** `dock-profile-menu/` light-1440-3-menu-open-done-crop.png, dark-1440-3-menu-open-done-crop.png, light-1440-11-admin-crop.png, light-390-3-menu-open-done.png
- **observed** The menu's first row is a full stadium outline pill around a static label. In the dock, the admin identity is a gold stadium pill with the same geometry as the Profile capsule beside it, so it looks like a control but is inert. The radius is a literal rounded-full, not a token.
- **expected + canon** DESIGN.md:385 reserves stadium (--radius-control) for single-line CONTROLS, and a slug header is a label. The owner mark (COHESION §0bl) says pills should be more card-like. A static identity should use a glass primitive (Chip mode=static size=xs, or plain DropdownMenuLabel text) on a tokenized non-stadium rung.
- **owner** **GLASS+CONSUMER**: CONSUMER demo/styles/foundation.css:633-635 (.slug-pill @apply ... rounded-full border) + :794 (2px bump); ProfileSection.vue:71-76, :115. GLASS: Chip/Badge stadium (DESIGN.md:392 --radius-badge = pill) is routed to the glass-ui session per the owner mark · *glass component* Chip/Badge --radius-badge (stadium canon role) · *head* open-at-HEAD
- **fix shape** Replace .slug-pill in both menu twins with a DropdownMenuLabel carrying the mono slug (no chip), or glass Chip static with the card-like radius glass settles on. Delete the .slug-pill recipe once AdminUsersPanel migrates. Relay to the glass-ui session: the badge/chip stadium role needs a card-like rung per the owner's pill mark.

#### UIA-V-93 · HIGH · dock-profile-menu · The admin token survives server rejection

- **source** confirm miss #4 · **verdict** MISSED (confirm seat) · **severity note** HIGH (folds into the admin finding)
- **observed** A bogus admin token is never cleared even after the server answers 401 (admin panels only render 'signed-out'), so the stranded state has no automatic exit either.
- **owner** **CONSUMER**: CONSUMER demo/platform/transport/client.ts:122 (clears only sessionTokenRef on 401) + demo/palettes/api/admin-call.ts:37

#### UIA-V-94 · HIGH · dock-mbabb-menu · Desktop @mbabb trigger is a ghost Button, not the dock's dropdown trigger; at rest it reads as a gray pressed chip with a link-style underline on hover

- **source** audit #3 · **verdict** AMENDED · **where** dock at 1440, trigger closed and hovered, light and dark
- **frame** `dock-mbabb-menu/` 1440-light-0b-closed-dock-zoom.png, 1440-dark-0b-closed-dock-zoom.png, 1440-light-1-trigger-hover.png, 1440-dark-1-trigger-hover.png
- **observed** The trigger carries classes 'button … glass-wash glass-capsule glass-capsule-hover' and has a resting fill (light: oklab L0.72 α0.6), which paints a muddy gray capsule on the pink dock. Home and Tools beside it are flat. The trigger has no chevron although it opens a menu, and it gains `hover:underline`, a link cue on a button. The desktop and mobile twins use different trigger primitives for the same menu.
- **expected + canon** One dock-trigger idiom for every dock dropdown (DockDropdownTrigger / DockTrigger for="dropdown": 'Bg darken + scale (1.1)' on hover, chevron affordance). The @mbabb wordmark stays lowercase mono text inside it, with no resting wash that differs from its siblings.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue:154-160 (canon: glass-ui DESIGN.md:1047 'DockDropdownTrigger … <DropdownMenu> triggers inside a dock'; the mobile twin already uses DockTrigger for="dropdown" at MobileMenuDropdown.vue:37)
- **fix shape** Replace the Button (ProfileSection.vue:154-160) with <DockTrigger for="dropdown"> wrapping the wordmark, as MobileMenuDropdown.vue:37 does. Delete the hover:underline and text-foreground/70 overrides and let the dock trigger own its hover and open states.
- **confirm** The defect holds. 1440-light-0b-closed-dock-zoom shows a muddy gray capsule next to the flat Home and Tools. triggerCls includes 'glass-wash glass-capsule glass-capsule-hover … hover:underline', and the trigger computes underline in the open probe. Two corrections. (1) The canon cited is stale: glass HEAD retired DockDropdownTrigger into DockTrigger for="dropdown" (dock/index.ts:26, DockTrigger.vue:15-23), so DESIGN.md:1047 is doc drift that should go to glass. (2) DockTrigger renders its built-in ChevronDown only for for="select" (DockTrigger.vue:54-62), so moving to for="dropdown" does not give a chevron. The consumer has to add one, or glass has to add it to the dropdown leg. The Login button beside it has the same gray capsule (see missed).

#### UIA-V-95 · HIGH · dock-mbabb-menu · Login dock trigger shares the same muddy ghost-capsule idiom

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `dock-mbabb-menu/` 1440-light-0b-closed-dock-zoom.png
- **observed** The frame shows Login with the identical gray resting capsule while Home and Tools are flat. The dock-trigger cohesion fix should cover both chips, not only @mbabb.
- **owner** **CONSUMER**: CONSUMER (the dock Login button beside @mbabb, same Button size=xs glass-wash/glass-capsule idiom)

#### UIA-V-96 · HIGH · palettes-view · Selecting a palette is invisible: the dock collapses to an orb, the card gets no selected state, and the verb set is 2 clicks away

- **source** audit #4 · **verdict** AMENDED · **state** CONFIRMED · **where** palettes-view · card selected (click Forest Floor) · 1440 light and dark; 390
- **frame** `palettes-view/` selected__1440__light.png, selected__1440__dark.png, dock__1440__light__s2__AFTER-SELECT.png, dock__1440__light__s2.png, dock__390__dark.png
- **observed** On click the dock morphs to a single red orb (collapsedAfterSelect=1 at 1440 light and dark). Expanding it shows 'Forest Floor →', and the verbs (Rename/Publish/Export JSON/Delete palette) sit behind a further 'Toggle action bar' press. The selected card looks identical to its siblings apart from the opened swatch band: no ring, tint or elevation. At 390 the dock is not in view once the list is scrolled to (the list is always below the fold there), so the verb set is never beside the selection.
- **expected + canon** SELECTED is a first-class, consistent state (ring or elevation on the card tier). Selecting an entity makes its verbs visible where the selection happened (COHESION §0bk.1 the dock palette scene) without a collapse.
- **owner** **CONSUMER**: CONSUMER demo/palettes/PaletteInspector.vue:18 (data-selected set) + :443-507 (no [data-selected] rule); the shell dock collapse-on-pane-interaction policy
- **fix shape** Add a [data-selected] rule on .palette-card (the glass selected/active ring token plus the -2px cartoon-lg rung already used for hover). Exempt entity selection from the dock auto-collapse, or open the action bar directly on selection. At compact width, pin the action bar (sticky) while an entity is selected.
- **confirm** The card half is confirmed. In selected__1440__light.png the Forest Floor card differs only by its dot band, and grep finds no [data-selected] rule in PaletteInspector.vue or browser/ (the attribute is set at :18). The dock collapse is not specific to selection: the dock is also an orb in menucolor__1440__light__s2.png (menu open, nothing selected) and rename__1440__light.png. So the policy is collapse on any pane interaction, and exempting only selection would not cure it. The dock rule needs to be scoped wider than the finding proposes.

#### UIA-V-97 · HIGH · palettes-view · Delete is not destructive-toned: glass DropdownMenuItem has no tone axis and the consumer's text-destructive loses

- **source** audit #5 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · palette menu open · 1440 and 390, light and dark
- **frame** `palettes-view/` menucolor__1440__light__s2.png, menucolor__1440__dark.png, menu__1440__light.png, menu__390__light.png
- **observed** Computed color: Delete = rgb(28,25,23) = Rename (light); Delete = rgb(233,230,226) = Rename (dark). A probe .text-destructive resolves rgb(219,36,36) / rgb(235,71,71). A pixel sample of the frame confirms identical ink. The irreversible verb reads like Rename.
- **expected + canon** The destructive row carries the destructive tone from the menu primitive (one register, no per-instance class), like Button tone="destructive".
- **owner** **GLASS+CONSUMER**: GLASS DropdownMenuItem (glass-ui src/components/menu/DropdownMenuItem.vue:7-13: props disabled/textValue/inset/class only) vs the shared Tone axis the Button has (DESIGN.md:927 tone … destructive); CONSUMER demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:133-140, 163-169 · *glass component* DropdownMenuItem (src/components/menu/DropdownMenuItem.vue:7-13) · *head* open-at-HEAD
- **fix shape** GLASS: add tone: Tone (neutral\|destructive…) to DropdownMenuItem, painting the row ink and highlight from the tone tokens. CONSUMER: replace class="text-destructive focus:text-destructive" with tone="destructive" on Delete and Delete (admin). Route into the glass BK letter.

#### UIA-V-98 · HIGH · palettes-view · Keyboard cannot select, reorder, or reach swatches; list semantics wrong; reorder uses a hand-rolled sortable instead of glass SortableList

- **source** audit #6 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · focus traversal and reorder drag · 1440/390 light and dark
- **frame** `palettes-view/` focus__1440__light__s2.png, focus__1440__dark.png, focus__390__dark.png (session logs), dragmid__1440__light__s2__INFLIGHT.png, dragmid__1440__dark.png
- **observed** Tab from search: input[] (unnamed) > button[] (unnamed save) > Delete all > Palette menu ×4 > leaves the pane. Swatches, the add slot and the grips are never reached, and no card is focusable, so selection (and so the dock verb set) is pointer-only. Pointer drag works (order after drop: Sunset, Quiet Greys, Forest, Neon), but the only in-flight cue is opacity-30 in place: no lift, no announcement, no keyboard path. role=list has no listitem children.
- **expected + canon** glass SortableList/SortableItem/SortableHandle (glass-ui src/components/sortable-list/README.md: native ul/li, button handle with a 32/44px floor, Space/Enter lift, Arrow keys, Escape, polite announcements, vacancy as the indicator). The card is a keyboard-selectable item.
- **owner** **CONSUMER**: CONSUMER demo/palettes/PaletteInspector.vue:15-24 (div role=article @click, no tabindex/keydown), :35-38 (grip is an SVG), demo/palettes/PalettesPane.vue:211-226 (@vueuse useSortable), demo/palettes/browser/card/PaletteCardGrid.vue:3 (role=list with role=article children)
- **fix shape** Replace useSortable + GripVertical with SortableList (:items by id, @reorder → pm.movePalette) / SortableItem / SortableHandle. Make the card head a button (or tabindex=0 + Enter/Space) that toggles selection. Drop role=list from the grid div.

#### UIA-V-99 · HIGH · palettes-view · Unnamed and undersized controls: save check, name field, rename submit/cancel

- **source** audit #7 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · current-palette editor; inline rename · 1440 and 390
- **frame** `palettes-view/` rename__1440__light.png, rename__390__dark.png, loaded__1440__light.png, focus__1440__light__s2.png (tab log input[] > button[])
- **observed** The save Button is icon-only with no aria-label (Tab reads button[]). The name Input has a placeholder only ('Palette 5'), no label. The rename submit/cancel are raw <button>s with a 14px glyph at p-0.5 (about 18px target), unnamed, and stay about 18px at 390 under a coarse pointer (rename__390__dark.png).
- **expected + canon** DESIGN.md:942-943: iconOnly never supplies a name, callers provide aria-label. The target floor: controls meet the size rung, and 44px under pointer: coarse via [data-control-target] (DESIGN.md:930-938).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/card/CurrentPaletteEditor.vue:133-150; demo/palettes/browser/card/PaletteCard/PaletteRenameInput.vue:18-29
- **fix shape** Use glass Button icon-only size="sm" with aria-label="Save palette" / "Save name" / "Cancel rename". Give the name Input aria-label="New palette name" (or a glass LabeledInput).

#### UIA-V-100 · HIGH · palettes-view · Three different field registers on one pane (seated search / glass Input / chrome input-bar in mono)

- **source** audit #8 · **verdict** AMENDED · **state** CONFIRMED · **where** palettes-view · search / name field / inline rename · light vs dark
- **frame** `palettes-view/` loaded__1440__light.png, loaded__1440__dark.png, rename__1440__light.png, rename__390__dark.png
- **observed** Search is a well fill + ink hairline + a RAISED cartoon stamp. The name Input is a borderless cream pill in light and an outlined transparent pill in dark. The rename field is the floating chrome .input-bar in Fira Code mono, editing a name set in display serif directly above it, so the name shows twice in two faces. demo/DESIGN.md:113-121 REGISTER LAW: fields on paper wear the seated register. .search-seated is an 'INTERIM demo seat … booked swap onto ASK-D'. glass now ships the recessed seated register .glass-well (glass-ui src/styles/glass/surface-axis.css:115-130) and the --input-bar-font seam (components.css:46-55), but the swap was never taken.
- **expected + canon** One seated field register for every in-pane field (search, name, rename), in the plate's text voice, identical across themes. A rename edits in place in the name's own face.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/card/PaletteCard/PaletteRenameInput.vue:4,11-17 (raw .input-bar chrome); demo/styles/utils.css:132-150 (.search-seated interim override); demo/palettes/browser/card/CurrentPaletteEditor.vue:133-141 (glass Input) + GLASS SearchBar/Input seated surface prop
- **fix shape** GLASS: expose surface="seated" on SearchBar/Input (it wears .glass-well, so no consumer override). CONSUMER: delete .search-seated. Build PaletteRenameInput from the same seated Input with the display face, replacing the title in place (not a second row).
- **confirm** The visual is confirmed: loaded__1440__light.png (the search's raised stamp vs the flat cream name pill) and rename__1440__light.png (mono '✎ Sunset Coast' under the serif title). The GLASS half is misrouted: glass deleted SearchBar (src/components/input/index.ts:6, BK #42), so 'expose surface=seated on SearchBar' has no target. The consumer migrates search onto glass Input, and the seated-register ask goes on Input alone.

#### UIA-V-101 · HIGH · palettes-view · 390: the 44px 'Palette menu' touch button overhangs its card row

- **source** audit #9 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · loaded/selected/menu · 390 light and dark (coarse pointer)
- **frame** `palettes-view/` selected__390__light.png, menu__390__light.png, dock__390__dark.png, rename__390__dark.png
- **observed** Under pointer: coarse the glass Button takes its 44px floor (correct per canon), but the name row stays about 48px incl. padding. The circle's lower edge crosses the card's bottom edge and cast (Sunset Coast, Quiet Greys, Neon Arcade). The count badge also inflates beside the name.
- **expected + canon** The host row accommodates the canonical floor (DESIGN.md:930-938: the 44px floor is the control's box), so no control paints outside its card.
- **owner** **CONSUMER**: CONSUMER demo/palettes/PaletteInspector.vue:443-475 (grid rows not sized for the coarse floor; menu margin-inline only)
- **fix shape** Give the head row min-block-size: calc(var(--touch-target) + 2*row-pad) under pointer: coarse, or seat the menu in the strip corner as an overlay control. Keep the Button unmodified.

#### UIA-V-102 · HIGH · palettes-view · 390: the Palettes route opens on the picker; the whole palettes pane is below the fold

- **source** audit #10 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · every state · 390 light and dark
- **frame** `palettes-view/` loaded__390__light.png, empty__390__dark.png, recovery__390__dark.png, scrolled__390__dark.png (scrollY=624 to reach the header)
- **observed** At 390x844 the first screen is 100% color picker. 'My Palettes' starts at about y=750 and the list, store-recovery notice, offline chip and empty state are all off-screen. A user who chose 'Palettes' sees no palettes.
- **expected + canon** HIERARCHY: the routed pane is the dominant content of its route at every width.
- **owner** **CONSUMER**: CONSUMER shell stage order at compact width (demo/shell/usePaneRouter.ts palettes slot; demo/palettes/PalettesPane.vue:2 Card h-full)
- **fix shape** At compact width on /#/palettes, lead with the pane (picker collapses to a compact swatch/strip or follows it), or auto-scroll the pane into view on route entry.

#### UIA-V-103 · HIGH · palettes-view · Add-slot '+' glyph never renders: WatercolorDot 7.0.0 has no default slot

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `palettes-view/` loaded__1440__light.png, searchnone__1440__dark.png, offline__1440__light.png (the add slot is an empty dashed blob at 1023,349)
- **observed** node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js:79-146 renders span > svg filter + ghost-stroke span and never calls renderSlot. Nothing on the page marks the primary constructive verb as 'add'.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/card/CurrentPaletteEditor.vue:95-105 (child <Plus> passed into a slotless component); root cause in the pruned glass WatercolorDot

#### UIA-V-104 · HIGH · palette-scene-actions · Dock 'Delete palette' destroys a saved palette instantly: no confirm, no undo, no message

- **source** audit #2 · **verdict** AMENDED · **state** /#/palettes, saved local palette selected -> Delete · **where** demo/palettes/PalettesPane.vue:113 (@delete -> pm.onDelete) -> demo/palettes/usePaletteActions.ts:31-38 (immediate deletePalette)
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/light-1440-10a-delete-armed.png -> light-1440-10b-after-delete.png (also sheet-light-390-b.png frame 4: My Palettes 2 -> 1)
- **observed** One click removes 'Moss & Slate' with no dialog, alertdialog or message (step 10: dialog 0, alertdialog 0, remaining 1). The dock silently falls back to the colour Tools set, and an unprompted 'Extract palette' hover card appears.
- **expected + canon** The app's own destructive policy: deleting an owned palette in Browse asks for confirmation (BrowsePane.vue:196), and 'Delete all' asks too (PalettesPane.vue:122-140). The same verb from the same dock needs the same guard.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Route local delete through the same confirm Dialog Browse uses, or delete with an undo toast. Use one destructive-verb policy for both panes and for the dock.
- **confirm** The defect is confirmed: step 10 gives remaining 1, dialog 0, alertdialog 0, and usePaletteActions.ts onDelete calls deletePalette directly. The precedent the finding cites is wrong. BrowsePane.vue:180-200 is the ADMIN delete confirm, not the owner delete. The owned-remote delete (BrowsePane.vue:102 -> onDeleteOwned :267 -> pm.onDeleteOwned) also has no confirm. So both of the dock's delete paths, local and owned-remote, are unguarded. The only guarded destructive verbs are Delete all and admin delete. The fix still stands, widened to both paths.

#### UIA-V-105 · HIGH · palette-scene-actions · At 390 the 9-verb palette set overflows the dock: Remix clipped mid-icon, Vote/Export/Delete off-screen

- **source** audit #3 · **verdict** CONFIRMED · **state** 390x844, owned remote palette selected -> Tools · **where** demo/shell/usePaneRouter.ts:930-995 (paletteActions emits every offered verb as a flat seat row)
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/crop-390-row-overflow.png (probe-390-row.png, sheet-light-390-c.png frames 1-3)
- **observed** The dock is 312px wide. The layer's content is 421px wide in a 290px client area, with overflow-x:auto (probe-log.json). Save, Rename, Tags, Versions and Private are visible. Remix is cut through its icon. Vote, Export and Delete are only reachable by a horizontal swipe that nothing on screen suggests.
- **expected + canon** Per the glass dock README (:50-52), capped runs fall back to native scrolling only. The consumer should not overflow a phone dock with a flat list of 9 verbs, and a destructive verb should never be hidden off-canvas.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Rank the verbs. Keep 3-4 primary seats (for example Rename, Export, Vote/Save) and put the rest behind one DockTrigger overflow menu that reuses PaletteCardMenu's item list. Or cap the seat count by viewport.

#### UIA-V-106 · HIGH · palette-scene-actions · Palette seats are hand-rolled buttons, not DockControl: 32px, 4px radius, below the 44px touch floor

- **source** audit #4 · **verdict** CONFIRMED · **state** any palette verb set, both widths · **where** demo/shell/dock/ActionButton.vue:11-33 (hand-rolled button); rendered by demo/shell/dock/layers/GenericActionBar.vue (v-for seat)
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/crop-focus-dock-dark-rail.png (top two strips) + probe-log.json
- **observed** The seats are <button class='action-button-wrapper ... rounded-sm'>, 32x32 with a 4px radius, even with touch emulated at 390. The Back control in the same row is DockControl ('dock-icon-button glass-specular-track glass-capsule-hover'): 40x40 on desktop, 46.8x46.8 on touch, stadium radius. So one row has two different button faces.
- **expected + canon** The glass dock README says 'DockControl is the button face' and that interactive controls keep a 44px coarse-pointer target floor. DESIGN.md: --radius-control is a stadium for a single-line control.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Render each seat as <DockControl shape="icon" :active> and drop the local button face. The hover hint then becomes a glass Tooltip on the DockControl.

#### UIA-V-107 · HIGH · palette-scene-actions · A second verdict within 2.5s is dismissed early by the first verdict's timer

- **source** audit #5 · **verdict** CONFIRMED · **state** two verbs in a row (Vote, then Make private, or Remix then Save) · **where** demo/palettes/browser/card/PaletteCard/ActionFeedback.vue:39-47 (the watch only follows props.visible, so a new message while visible does not restart the timer)
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/light-390-13-visibility-failed-500.png and light-390-17-save-remote.png (no rail visible); probe-log.json 'race'
- **observed** Measured: 'Vote failed' appears at 168ms. Visibility is clicked at 1110ms and 'Unpublish failed' appears at 1268ms, but it is gone at 2971ms, killed by the vote's timer (168+2500). In the 390 captures the verdicts for steps 13 and 17 never appear in their frames at all.
- **expected + canon** Every verdict is readable for its full time. W7-mutation-ownership says a failure is rendered where the act was taken.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Restart the timer on every showFeedback, by watching [message, visible] or taking a nonce. Do not auto-dismiss error verdicts.

#### UIA-V-108 · HIGH · palette-scene-actions · Result of a dock verb lands only on the card rail: off-screen on phones, gone in 2.5s, and the dock's 'failed' state can never fire

- **source** audit #6 · **verdict** CONFIRMED · **state** publish with the API down; any failed verb dispatched from the dock · **where** demo/palettes/PaletteInspector.vue:345-368 (every command is a fire-and-forget emit that never throws or returns a promise) + demo/shell/usePaneRouter.ts:936-940 (resolve() can only mark failed on a throw) + ActionFeedback.vue:32 (autoDismissMs 2500 for errors too)
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/light-1440-06a-publish-1s.png (visible at 1.2s) vs light-1440-06-publish-failed-api-down.png (gone by 6s); sheet-light-390-a.png frame 4 and sheet-dark-390-a.png frame 2 (the failure is below the fold, never seen)
- **observed** 'Failed to publish: Backend unreachable' shows on the card for 2.5s and then disappears. At 390 the user is looking at the dock at the top of the page while the card is below the fold. The dock seat stays 'ready', with no destructive colour and no role=alert.
- **expected + canon** GenericActionBar models a 'failed' state (destructive colour + role=alert, recoverable). An error should persist where the act was taken, which here is the dock.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Have the host return each mutation's promise through the command, so a rejection lands in the router's failures map and the seat shows 'failed'. Keep error verdicts until dismissed, or use a glass toast that is visible at any scroll position.

#### UIA-V-109 · HIGH · palette-scene-actions · Owned palette's verb set duplicates itself: Save and Remix say the same thing, and the whole set repeats the card's menu

- **source** audit #8 · **verdict** AMENDED · **severity** MEDIUM→HIGH (confirm) · **state** /#/browse, owned remote palette selected · **where** demo/palettes/PaletteInspector.vue:353,361 (save + fork both on remote, no owned check); demo/shell/usePaneRouter.ts:942-978
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/light-1440-11-browse-remote-owned-verbs.png, dark-1440-17-save-remote.png
- **observed** 9 icon-only seats. 'Save palette' is described as 'Save this palette to your library.' and 'Remix palette' as 'Copy the selected palette into your library.': the same outcome, both offered on a palette the user owns. The card's own menu (⋯) carries the same verbs one-for-one.
- **expected + canon** This is the owner's clutter complaint (COHESION §0bl): controls must earn their place, and there should be one place per verb.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Offer Save only for palettes the user does not own, or Remix only for others' palettes, never both. Show only primary verbs in the dock and leave the full list in the card menu.
- **confirm** Confirmed, and worse than stated, so HIGH rather than MEDIUM. PaletteInspector.vue:357 offers save for any remote palette and :365 offers fork for any remote palette, with no owned check. capture-log-light-390 step 17b-save-twice records ownedCopies:2: Save on a palette the user owns silently makes a duplicate copy on each click. Cited lines :353/:361 are actually :357/:365.

#### UIA-V-110 · HIGH · palette-scene-actions · Save on a palette the user already owns creates silent duplicate copies

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `palette-scene-actions/` capture-log-light-390.json step 17b-save-twice gives ownedCopies:2 (frame light-390-17b-save-twice.png). PaletteInspector.vue:357 offers save for every remote palette.
- **observed** capture-log-light-390.json step 17b-save-twice gives ownedCopies:2 (frame light-390-17b-save-twice.png). PaletteInspector.vue:357 offers save for every remote palette.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Do not offer Save on owned palettes. Make save idempotent per slug.

#### UIA-V-111 · HIGH · palette-scene-actions · Owned-remote delete in Browse is also unconfirmed (the cited confirm guards only admin delete)

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `palette-scene-actions/` BrowsePane.vue:102 -> onDeleteOwned :267-274 has no dialog. The confirm at :180-200 is labelled the 'browse-wall admin delete'.
- **observed** BrowsePane.vue:102 -> onDeleteOwned :267-274 has no dialog. The confirm at :180-200 is labelled the 'browse-wall admin delete'.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** One destructive-verb policy: the same glass confirm Dialog for local, owned-remote and admin delete.

#### UIA-V-112 · HIGH · palette-card-menu · Coarse-pointer menu text grows to 21px inside a fixed 192px menu, so rows wrap and icons get squeezed

- **source** audit #2 · **verdict** CONFIRMED · **state** open · **where** browse/palettes · menu open · owner and admin · 390 (and 1440 for 'Make private')
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/menu-owned-390-light.png; menu-admin-other-390-light.png; menu-owned-1440-light.png
- **observed** Item font is 21px Fira Code at 390 versus 16.4px at 1440, so the phone gets LARGER menu type than the desktop. 'Make private · PUBLIC' wraps to 2 lines (row 71px at 390, 58px at 1440) and 'Delete (admin)' wraps (71px). The EyeOff glyph shrinks below the other 16px icons because it has no shrink-0.
- **expected + canon** Single-line menu rows on one type rung. The coarse pointer should enlarge the hit area (min-block-size / --touch-target), not the label. Menu width should come from a glass min-width token, not a literal.
- **owner** **GLASS+CONSUMER**: GLASS: 7.0.0 styles/tokens/sizing.css `--dropdown-text: var(--control-text)` = type-small × --ui-scale, with --ui-coarse-scale 1.5, so TYPE scales with the pointer. CONSUMER: PaletteCardMenu.vue:7 `class="w-48 text-small"` (fixed-width literal) · *glass component* sizing.css (styles/tokens/sizing.css) · *head* open-at-HEAD
- **fix shape** GLASS: stop multiplying --dropdown-text by the coarse scale (keep the 44px row floor). CONSUMER: drop `w-48`, let the content size to max-content under the glass --overlay-min-width, and put `shrink-0` on item icons.

#### UIA-V-113 · HIGH · palette-card-menu · At 390 the Export submenu lands on top of its parent menu, and overlays touch the viewport edge

- **source** audit #3 · **verdict** CONFIRMED · **state** open · Export submenu · **where** browse · other-user menu → Export hovered/tapped · 390, both themes
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/menu-other-export-sub-390-dark.png; menu-other-export-sub-390-light.png
- **observed** The sub-content is at x=0 and 301px wide over the parent menu (x=151, 192px wide). Save/Remix/Export are hidden, a stray 'Report' row and chevron show beneath, and the left edge sits flush with the screen (0px gutter).
- **expected + canon** On a phone the export formats should stay reachable without covering the menu that owns them. Overlays should keep the 16px phone gutter.
- **owner** **GLASS+CONSUMER**: CONSUMER: PaletteCardMenu.vue:107-127 (a nested DropdownMenuSub used on a phone). GLASS: DropdownMenuContent/SubContent set no collisionPadding (glass-ui HEAD src/components/menu/DropdownMenuContent.vue:35,59 only sideOffset:4) · *glass component* DropdownMenuContent (src/components/menu/DropdownMenuContent.vue:35,59) · *head* open-at-HEAD
- **fix shape** CONSUMER: on coarse/narrow viewports, render Export as a labelled group inside the root menu (or a glass Sheet), not a cascading sub. GLASS: default collisionPadding on DropdownMenuContent/SubContent/PopoverContent to the page-gutter token.

#### UIA-V-114 · HIGH · palettes-delete-all-dialog · Keyboard focus is invisible on both dialog actions (Cancel and Delete all)

- **source** audit #1 · **verdict** AMENDED · **state** open, keyboard Tab / Shift+Tab, light and dark · **where** PalettesPane.vue:133 and :136 (Button emphasis=text / tone=destructive inside DialogContent)
- **frame** `palettes-delete-all-dialog/` docs/tranches/X/audit/ui-evidence/value/palettes-delete-all-dialog/p2-light-focus-delete.png, p2-dark-focus-cancel.png, p3-kbd-focus-delete.png, 1440-dark-3-focus-tab.png
- **observed** After keyboard Tab, 'Delete all' matches :focus-visible, yet its computed box-shadow is the resting `0 2px 8px /0.06` and outline-style is none. Cancel at :focus-visible has box-shadow none. Neither frame shows a ring, although --focus-ring-shadow resolves on the element (probe3-log.json dialogBtn.token). The page's ghost trash trigger does paint the ring (probe3 trigger.bs), so this is specific to the emphasis/tone arms.
- **expected + canon** Every focusable control paints --focus-ring-shadow at :focus-visible (DESIGN.md:603,611). On an irreversible destructive confirm, the user must be able to see which action Enter will fire.
- **owner** **GLASS**: GLASS - Button (src/components/button/styles.css:177-183 `.button[data-emphasis=text]{box-shadow:none}` and the secondary/tone arm's resting shadow) vs canon DESIGN.md:603 (Focus-visible = ring + glow via --focus-ring-shadow) and :611 (.focus-ring atomic box-shadow) · *glass component* Button (src/components/button/styles.css:177-183) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** GLASS: order `.focus-ring:focus-visible` after the emphasis/tone arms, or add `:focus-visible` to the chromeless/tone rules so they compose the ring with their own shadow (e.g. box-shadow: var(--focus-ring-shadow), var(--button-rest-shadow)). Route to the glass-ui session.
- **confirm** The symptom is confirmed. p2-light-focus-delete.png and p2-dark-focus-cancel.png show no ring. probe3 dialogBtn has fv:true with bs equal to the resting 0 2px 8px/0.06. Cancel has bs:none. Correction 1: 'Delete all' is data-emphasis=secondary with tone=destructive, not a text arm. The cited HEAD styles.css:177-183 is not the code that runs. In v7.0.0, base.css:113-116 `.focus-ring:focus-visible{box-shadow:var(--focus-ring-shadow)}` loses to v7 button/styles.css:53-56 and :103-106 (box-shadow:none), and to the capsule's resting shadow. Correction 2: the proposed fix is stale. Glass v8.0.0 (70dc0f06, BK #80) moved .focus-ring to an OUTLINE (HEAD utilities/base.css:135-150), and a button's box-shadow cannot hide an outline. So this is a GLASS defect in 7.0.0 that is already fixed at the producer; the consumer owes the adoption (value pins ^7.0.0). New GLASS item to route: DESIGN.md:603 and :611 still describe the retired box-shadow ring, so the canon doc is behind its own stylesheet. Severity stays HIGH.

#### UIA-V-115 · HIGH · palettes-delete-all-dialog · At 390 the dialog plate sits flush against both viewport edges (x 0, w 390) with rounded corners touching the bezel

- **source** audit #2 · **verdict** CONFIRMED · **state** open, 390x844, light and dark · **where** PalettesPane.vue:123 DialogContent surface=glass
- **frame** `palettes-delete-all-dialog/` docs/tranches/X/audit/ui-evidence/value/palettes-delete-all-dialog/390-light-2-open.png, 390-dark-3-focus-tab.png
- **observed** dialogBox {x:0, width:390} (capture-log.json). The 16px corners and the hairline border run into the screen edges, so the plate reads as clipped, not floating. The footer stacks a full-width 340px stadium over a text link.
- **expected + canon** A phone-width layout keeps a 16-20px side gutter (artifact contract, and glass HEAD styles.css:16-19: 'a real 20px gutter per side at 393').
- **owner** **GLASS**: GLASS - DialogContent (7.0.0 ships `w-full max-w-lg` with no inline gutter; glass HEAD already cures it at src/components/dialog/styles.css:16-25 `inline-size: min(100% - 2*var(--space-section), 32rem)`). Consumer adoption owed: value.js pins ^7.0.0. · *glass component* DialogContent (src/components/dialog/styles.css:16-25) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** Adopt the glass HEAD dialog geometry (the next glass cut). Do not hand-roll a gutter in the consumer; the producer comment records that two consumers already did and disagreed.

#### UIA-V-116 · HIGH · browse-view · The whole pane group re-centres vertically on every state change, and a long wall scrolls the page instead of the pane

- **source** audit #3 · **verdict** CONFIRMED · **state** empty → loading → loaded, 1440 (same at 390) · **where** Browse stage layout
- **frame** `browse-view/` empty__1440__light.png, loading__1440__light.png, loaded__1440__light.png, loaded__1440__light__full.png
- **observed** The pane title h1 sits at y=271 in the empty and error states, y=224 while loading, and y=129 when loaded: both panes, headers and search fields jump up to 142px whenever the wall's content changes. When loaded, the document scrolls (full-page capture is 996px tall, and 'More from the commons' is below the fold at y=909). The Card's overflow-y-auto never engages, and the empty My Palettes pane stretches to the same height as dead space.
- **expected + canon** Chrome stays put while content settles (the owner's janky-transitions docket, COHESION §0ao; the vj-morph comment at BrowsePane.vue:29-37 promises 'one surface, new content'). The wall scrolls inside its pane.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/BrowsePane.vue:2 (Card h-full overflow-y-auto never gets a viewport-bound height) + the stage layout in demo/styles/shell.css (vertical centring)
- **fix shape** Anchor the stage to the top, or give the panes a fixed viewport-bound height (e.g. max-block-size: calc(100dvh - dock offset)), so the Card's own overflow-y-auto scrolls the wall and the header and search stay fixed across the empty/loading/loaded/error states.

#### UIA-V-117 · HIGH · browse-view · After selection, the palette's verbs are out of sight: the 1440 dock collapses to a 56px dot, and when opened it shows only a name chip (390 shows the icons)

- **source** audit #4 · **verdict** AMENDED · **state** card selected, 1440 vs 390 · **where** Dock palette scene for the selected Browse card
- **frame** `browse-view/` probe-dock__1440__t600.png, probe-dock__1440__t1500.png, selected__1440__dark.png, probe-dock__1440__engaged.png, probe-dock__390__engaged.png
- **observed** At 1440 the dock has class 'collapsed' at 56×56 from about 150ms after the card click and stays collapsed, even after deselecting. The Back/Save palette/Remix palette/Vote/Export JSON buttons are in the DOM but not visible. Hovering the dock expands it to 'Browse \| 🎨 Neon Arcade → \| Login \| @mbabb', which still hides the verbs behind a second click. At 390 the same scene shows ← 🔖 ⑂ ♡ ⤓ as unlabelled icons with no palette name. The selected card itself gains no actions.
- **expected + canon** The selected-entity inspector shows its verbs where the user's attention is, and presents them the same way at both viewports (cohesion law 4).
- **owner** **CONSUMER**: CONSUMER — the X-W4 palette scene registration from PaletteInspector.vue (selected entity → dock SceneActionSet) and the dock's idle-collapse policy (cross-ref seat dock-main); GLASS only if the collapse is the glass Dock default
- **fix shape** While a scene is registered, keep the dock expanded and show the scene's actions directly (a name chip plus the verbs), at both viewports. Alternatively, seat a compact action row in the unfurled card detail and treat the dock as the secondary home.
- **confirm** probe-dock__1440__t1500.png shows the 56px dot, and probe-dock__1440__engaged.png shows 'Browse \| Neon Arcade → \| Login \| @mbabb' with no verbs. probe-dock__390__engaged.png shows unlabelled ← bookmark fork heart download icons. Amendment on owner and cause: demo/shell/dock/Dock.vue:161-162 passes :collapse-delay=5000 and :start-collapsed=false, so a collapse about 150ms after the click is NOT the glass idle-timer default (README collapseDelay 2000). Something explicit in the consumer or scene path collapses it, so the owner is CONSUMER, and 'GLASS only if it is the Dock default' is effectively ruled out. The collapse is also not selection-specific: the dock is already a dot in filters__1440__light, focus__1440__light and cardmenu__1440__dark with no card selected. Cross-ref the dock-main seat.

#### UIA-V-118 · HIGH · browse-view · The filters trigger is a kebab ⋮ capsule that is taller than the search bar and sticks out of it

- **source** audit #5 · **verdict** CONFIRMED · **state** all states, both viewports · **where** Browse SearchBar trailing slot
- **frame** `browse-view/` empty__1440__light.png, loaded__1440__light.png, empty__390__light.png
- **observed** The h-8 w-8 override is only half applied: the button renders at 32×40 with radius 9999px (an oval) inside a 36px bar, from y358 to y398 against the bar's y360 to y396. It visibly overruns the bar's end in light and dark. The glyph is a vertical kebab ('more'), while the card menu uses a horizontal ⋯, so the page has two different overflow glyphs, and neither says 'sort/filter'.
- **expected + canon** A glass Button at a size rung that fits the input-bar height (--control-pill-h), with no h/w utility overriding the atom (DESIGN.md: tokens, not literals), and an icon that names the act (SlidersHorizontal / ListFilter).
- **owner** **CONSUMER**: CONSUMER — demo/palettes/browser/search/SearchFilterBar.vue:5-6 (<Button icon-only class="relative h-8 w-8"> + EllipsisVertical)
- **fix shape** Remove the h-8 w-8 override, use the Button size rung matched to the bar height (or an input-bar-trailing slot inset), and switch to a filter glyph. Keep the active-count dot, drawn as a glass Badge (see the hand-rolled atoms finding).

#### UIA-V-119 · HIGH · browse-view · Dock collapses to a dot without any card selection

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `browse-view/` filters__1440__light.png, focus__1440__light.png, cardmenu__1440__dark.png
- **observed** The 56px dot shows on plain interactions (opening the filter popover, a Tab walk, opening the card menu), not only after selection. So a popover or focus elsewhere hides the route's whole navigation.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/Dock.vue (collapse-delay 5000 / start-collapsed false are passed but not honoured on this route); cross-ref seat dock-main
- **fix shape** Find the explicit collapse path (popup-mutex or hold release at Dock.vue:101-116) and make it respect the 5s policy and scene registration.

#### UIA-V-120 · HIGH · browse-search-filter · The active-filter count badge is clipped by its own trigger and reads as a sliver

- **source** audit #3 · **verdict** CONFIRMED · **state** active filter chips (Featured + retro + color) · **where** /#/browse · Filters trigger · active filters
- **frame** `browse-search-filter/` active-filters-closed-390-light.png, active-filters-popover-390-dark.png, p2-active-filters-closed-1440-light.png
- **observed** Badge box: 16x16 at (332,215). Trigger box: 44x44 at (300,219). The badge's top-right quadrant sits outside the button, and the capsule clips it, so only a crescent of olive shows and the count digit is unreadable. The badge is the only on-page sign that filters are active, and it is also a hand-rolled rounded-full bg-primary span, not a glass Badge.
- **expected + canon** Active filter state is visible and legible. glass Badge (--radius-badge) placed outside the clipping capsule, or better, the glass Chip removable row (next finding).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/SearchFilterBar.vue:5-11 (badge absolutely positioned at -right-1 -top-1 inside a glass-capsule Button that clips its children)
- **fix shape** Remove the hand-rolled badge and show active filters as chips (next finding). If a count stays, render a glass Badge as a sibling of the Button, outside its overflow.

#### UIA-V-121 · HIGH · browse-search-filter · No active-filter chips: filter state is hidden behind a kebab, with no one-click removal

- **source** audit #4 · **verdict** CONFIRMED · **state** active filter chips · **where** /#/browse · below the search field
- **frame** `browse-search-filter/` p2-active-filters-closed-1440-light.png, active-filters-closed-390-light.png
- **observed** With Featured + retro + a colour query active, the page shows the same bare search bar as at rest, plus the clipped badge. Nothing names the active filters. Removing one filter means reopening the overflowing popover and finding it; 'Clear all' is off screen at 390.
- **expected + canon** Each active filter (Tier, each tag, the colour swatch) appears as a glass Chip mode='removable' under the field, with the colour chip showing its swatch, and a text action to clear everything. This is the glass-idiomatic filter surface.
- **owner** **CONSUMER**: CONSUMER demo/palettes/BrowsePane.vue:9-26 (SearchBar + SearchFilterBar only; no chip row) — glass primitive exists: Chip mode="removable" (/Users/mkbabb/Programming/glass-ui/src/components/chip/README.md:10)
- **fix shape** Add a chip row under the SearchBar in BrowsePane, fed by tier, selectedTags and colorSearchParams. Each chip's remove calls the existing emit. The chip row then replaces the badge and the in-popover 'Clear all'.

#### UIA-V-122 · HIGH · browse-search-filter · The no-results state says 'No palettes published yet.' and offers no way out

- **source** audit #5 · **verdict** CONFIRMED · **state** no-results (query 'zzqx'; Featured+retro+colour) · **where** /#/browse · results wall
- **frame** `browse-search-filter/` p2-no-results-query-390-dark.png, p2-no-results-query-1440-light.png, active-filters-closed-390-light.png, p2-active-filters-closed-1440-light.png
- **observed** A query or filter set that matches nothing shows the 'wall is empty' copy, 'No palettes published yet.', which is false because 4 palettes exist. It does not mention the query or filters and has no Clear action. At 390 the headline wraps to two lines of display type, so the false message is the most prominent thing in the pane. At 1440 the Browse pane also shrinks and re-centres (card top y=283 to 353), so the layout jumps.
- **expected + canon** A distinct filtered-empty state, e.g. 'Nothing matches “zzqx”' plus a secondary 'Clear search / filters' Button, using the same EmptyState component. The pane height stays stable across states.
- **owner** **CONSUMER**: CONSUMER demo/palettes/BrowsePane.vue:83-84 (PaletteCardGrid empty-text is a single constant for both 'wall empty' and 'filters/query matched nothing')
- **fix shape** Split the empty copy on (query \|\| tier \|\| tags \|\| colour). Pass an #action slot with a clear Button to EmptyState/PaletteCardGrid. Keep a min-height on the wall so the pane does not re-centre.

#### UIA-V-123 · HIGH · browse-search-filter · The Find-by-Color block holds two Search buttons, two swatches and a nested popover over its parent

- **source** audit #6 · **verdict** CONFIRMED · **state** Find by Color popover open · **where** /#/browse · Filters popover · Find by Color + MiniColorPicker
- **frame** `browse-search-filter/` mini-picker-open-390-light.png, p2-mini-picker-open-1440-dark.png, filters-open-390-light.png
- **observed** The block has: a trigger swatch, a mono text field with a hand-rolled inline 'Search' button, and a second popover (side='top') that covers the parent popover's own Tier/Tags rows. That second popover holds a second swatch, a hex readout and a second 'Search' Button. So one query has two swatches, two Search buttons and Enter. At 1440 the mini popover's bottom also runs past the viewport. The text field is 148px wide with 64px of right padding (pr-16), so '#217bd9' truncates to '#217…' and '#hex, hsl(...)' to '#hex…'. The field is 18.3px Fira at 390, louder than the 14px option text.
- **expected + canon** One colour query surface. Popover-in-popover stacking is not a glass pattern: DESIGN.md's overlay family anchors one plate per trigger. The field should be wide enough to show a full CSS literal.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/SearchFilterBar.vue:58-106 + demo/palettes/browser/search/MiniColorPicker.vue:6-58
- **fix shape** Put the picker inline in the filter panel instead of a nested popover, or make the swatch the sole trigger that commits on close. Keep one Search affordance (Enter, or the field's trailing action) and delete MiniColorPicker's output row. Give the field the full panel width.

#### UIA-V-124 · HIGH · tag-edit-popover · An unreachable tag catalog is shown as 'No tags available.' and nothing reports the failure

- **source** audit #3 · **verdict** AMENDED · **state** error (catalog) · **where** /#/browse, GET tags refused
- **frame** `tag-edit-popover/` 1440-light-12-catalog-unreachable.png vs 1440-light-13-catalog-empty.png (identical), 1440-dark-12/13, 390-*-12/13
- **observed** The unreachable and empty frames are pixel-identical: 'TAGS / No tags available.' No alert or status appears, and there is no retry. useTagEdit.ts:59 sets an error message that no one displays.
- **expected + canon** Empty, loading and error are separate states (useTagEdit.ts:58 comment: 'the editor must not open without its catalog in silence').
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/TagEditPopover.vue:16-18 (empty and error share one branch; tagEdit.error is never read) + demo/palettes/BrowsePane.vue:452-458 (the verdict watch skips while tagEditPalette is null at mount, and does not fire again when the next failure has the same message)
- **fix shape** Add a `v-else-if="tagEdit.error.value"` branch with the message and a Retry button that calls loadAllTags(true); keep 'No tags available.' for a true empty catalog.
- **confirm** The popover content is identical in 12 and 13 ('TAGS / No tags available.', both 122.97px high), but the frames are not pixel-identical: the md5 hashes differ at all four viewports. Frame 1440-light-12 has a global top-right pill, 'BACKEND OFFLINE — SAVED LOCALLY', which the log's alerts list confirms. So one failure signal exists, but it is generic, sits far from the act, and is wrong. The backend is not offline (only GET /tags was refused), and 'saved locally' does not apply to a catalog read. It also offers no retry. The core claim stands: TagEditPopover.vue:16-18 collapses error into empty, and tagEdit.error is never read in the popover. Revised text: 'the only signal is a misleading app-wide backend-offline pill; the popover itself shows the empty state'. Severity stays HIGH, owner CONSUMER.

#### UIA-V-125 · HIGH · tag-edit-popover · Hand-rolled tag checklist, duplicated with a different style in the search filter

- **source** audit #4 · **verdict** CONFIRMED · **state** open / hover · **where** /#/browse, open state
- **frame** `tag-edit-popover/` 1440-light-02-open.png, 1440-dark-03-row-hover.png
- **observed** The same tag vocabulary has two hand-rolled checkbox lists with different row styling in two places. Hover uses a literal 6px row corner (rounded-md) and utility padding instead of a glass item. The popover also overrides the primitive's padding (see the padding finding).
- **expected + canon** GLASS IDIOM: a many-of-N pick inside a floating surface uses the glass menu family's DropdownMenuCheckboxItem (already re-exported in demo/ui/dropdown-menu/index.ts), or glass Chip mode=selectable (chip/README.md). COHESION: one tag-pick component for both editing and filtering.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/TagEditPopover.vue:21-34 (label rows with ad hoc `rounded-md px-2 py-1 hover:bg-accent/50`) and demo/palettes/browser/search/SearchFilterBar.vue:47-57 (`.filter-option` rows for the same Tag[] vocabulary)
- **fix shape** Replace both lists with one component built on DropdownMenuCheckboxItem, grouped by DropdownMenuLabel per category, or on selectable Chips, and use it in SearchFilterBar and the tag editor.

#### UIA-V-126 · HIGH · version-history-drawer · After a restore the list is stale: still '4 versions', no new revision, nothing marked current

- **source** audit #3 · **verdict** CONFIRMED · **state** restore · **where** restore (success)
- **frame** `version-history-drawer/` restore-after__1440__light.png, restore-after__390__light.png
- **observed** The server appends a revision and sets a new currentHash (service/versions.ts:200-234). The drawer loads only on the `open` transition, so after 'Revert' it still reads 'Harbour Dusk — 4 versions' with the same four rows. The reverted-to row still offers Revert and the new v5 never appears. The only feedback, 'Reverted', paints on the card behind the modal scrim, blurred, and at 390 it is mostly hidden behind the drawer.
- **expected + canon** A restore visibly lands in the surface that caused it: the list refetches or prepends the returned revision, the current mark moves, and success or failure is announced inside the drawer.
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:157-167 · demo/palettes/BrowsePane.vue:315-328)
- **fix shape** Have onRevert return the verdict to the drawer (emit a promise or pass a result). On ok, call loadVersions(0) and flash the new top row. Render the verdict with the glass feedback primitive in the drawer header or footer instead of the occluded card.

#### UIA-V-127 · HIGH · version-history-drawer · No empty state, and a fetch failure looks exactly like an empty history

- **source** audit #4 · **verdict** CONFIRMED · **state** empty history · **where** empty history · error
- **frame** `version-history-drawer/` empty-history__1440__light.png, empty-history__390__dark.png
- **observed** With zero versions the drawer is a blank 900px column under 'Quiet Moss — 0 versions'. There is no empty message and no illustration. fetchVersions swallows every error to `undefined` with a console.warn, so a network or 403 failure renders the same blank '0 versions'. It also cannot be retried.
- **expected + canon** Separate, designed empty and error states that match the app's own empty idiom (the 'No saved palettes yet.' dashed-well plus caption on the sibling Palettes pane). The error state offers a retry.
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:15-98 · demo/palettes/useVersionHistory.ts:48-54)
- **fix shape** Return a typed verdict from fetchVersions ({ok:false,message}), as `revert` already does. Render an empty well ('No earlier versions') and an error well with a Retry button.

#### UIA-V-128 · HIGH · version-history-drawer · Revert buttons take keyboard focus while fully transparent

- **source** audit #5 · **verdict** AMENDED · **state** focus · **where** keyboard focus inside drawer
- **frame** `version-history-drawer/` focus__1440__light.png (activeEl = data-slot=button Revert; only the mouse-hovered row's button is painted)
- **observed** Every row's Revert button is in the tab order. The reveal is hover-only (no `group-focus-within`/`focus-visible` reveal), so tabbing lands the focus ring on opacity-0 buttons and a keyboard user reverts without seeing the target.
- **expected + canon** A focused control is visible (glass focus-ring is only meaningful on a painted element).
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:75-84)
- **fix shape** Add `focus-visible:opacity-100 group-focus-within:opacity-100`, or show the action at rest (see the touch finding).
- **confirm** The finding holds, but the cited frame does not prove it. In focus__1440__light, the focused button is v3's Revert, which is painted because the pointer is still hovering row 2; the pink ring is visible. The proving frame is focus__390__light: manifest activeEl is a Revert button (data-slot=button) and nothing is painted anywhere in the drawer. At 1440, Tab 1 from the close button lands on v4's opacity-0 Revert, which was not captured.

#### UIA-V-129 · HIGH · version-history-drawer · Row wastes about a third of its height on an invisible button and has no dominant element

- **source** audit #6 · **verdict** CONFIRMED · **state** open with versions · **where** open with versions · both viewports
- **frame** `version-history-drawer/` open-versions__1440__light.png (rows 122px, bottom ~40px empty), open-versions__390__light.png (rows 138px, bottom ~48px empty)
- **observed** The opacity-0 Revert (mt-2 + 28/44px) keeps its layout box, so every card has a blank lower band. That reads as broken padding and is 'cluttered and too rounded'. Inside the row, the identity (v4), the timestamp, the name and the swatches are all text-micro or 20px dots. Nothing leads, and the drawer title is the only type step.
- **expected + canon** A compact card-like row: version and relative time as the lead line, the palette as a readable specimen, and actions on one baseline. No reserved dead space.
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:22-85)
- **fix shape** Put the action in the header line (trailing, same row as the timestamp) or in a row overflow menu. Collapse the reserved band. Promote the version label to text-small/semibold.

#### UIA-V-130 · HIGH · flag-report-dialog · The Report and Cancel buttons render identically: `variant=` is a dead prop on the glass Button

- **source** audit #2 · **verdict** AMENDED · **state** open / reason selected · **where** FlagReportDialog.vue:39-48
- **frame** `flag-report-dialog/` 2-reason-selected-1440-light.png, 2-reason-selected-1440-dark.png, 2-reason-selected-390-light.png
- **observed** The installed glass 7.0.0 ButtonProps are emphasis / tone / size / loading. There is no `variant`. Both buttons compute the same neutral fill: oklab(0.72 … / 0.6) in light and oklab(0.41 … / 0.63) in dark, both 9999px, 86x40 and 84x40. The primary action has no visual weight and nothing shows it is consequential. `variant` falls through as a stray HTML attribute. A grep finds 30 `variant="destructive"\|"outline"` usages across demo/.
- **expected + canon** Use the glass Button API (glass-ui button/styles.css: [data-emphasis], [data-tone]). The sibling palette confirms already do this (BrowsePane.vue:196, PalettesPane.vue:136, AdminTagsPanel.vue:170, AdminFlaggedPanel.vue:190 use `tone="destructive"`).
- **owner** **CONSUMER**: CONSUMER — FlagReportDialog.vue:40 (variant="outline") and :43 (variant="destructive"); the same dead prop appears in 30 demo call sites
- **fix shape** Report: `emphasis="primary"` plus a tone chosen for the intent (tone="destructive" to match the siblings, or warning), with `:loading`. Cancel: `emphasis="quiet"` or secondary. Sweep the other ~28 dead `variant=` usages in the same pass.
- **confirm** The visual defect is confirmed. In the 2-reason-selected-1440-dark metrics, Cancel is 86x40 and Report 84x40, both 9999px, both bg oklab(0.4149 … ) with the same class stack; the frame shows two identical stadiums. The 'dead prop' framing is out of date: after the capture, 69c0d255 deleted `variant="outline"/"destructive"` from this file (lines 38/41 now) and put nothing in their place. At HEAD both buttons take the glass defaults emphasis=secondary, tone=neutral (glass 7 button-Bu9F4uU6.js:11-12), so they are still identical. The demo sweep count is now 22 `variant="destructive\|outline"` .vue hits, not 30. The fix is unchanged: Report gets `tone="destructive"` (the BrowsePane.vue:197 sibling uses this) plus `:loading`, and Cancel gets `emphasis="text"`, as the BrowsePane.vue:196 sibling does.

#### UIA-V-131 · HIGH · flag-report-dialog · Hand-rolled textarea: 4px corner, opaque ground (pure black in dark), heavy ad-hoc ring; the glass Textarea is not used

- **source** audit #3 · **verdict** CONFIRMED · **state** open / reason selected / focus · **where** FlagReportDialog.vue:30-35
- **frame** `flag-report-dialog/` 2-reason-selected-1440-dark.png, 1b-open-tab-focus-390-dark.png, 2-reason-selected-390-light.png
- **observed** A raw <textarea> with `h-20 rounded-input border border-input bg-background … focus-visible:ring-2`. It computes to border-radius 4px and an opaque bg: rgb(11,10,9) in dark, a black slab inside the glass room, and rgb(251,250,248) in light. The focus state is a thick 2px contrasting frame. `rounded-input` names the rung glass renamed away (radius.css:132-136: '--radius-input … Renamed clean-break (no legacy alias)'). It is the only non-glass surface in the dialog and the one control that does not sit on glass.
- **expected + canon** The glass Textarea primitive (glass-ui/src/components/textarea/Textarea.vue: field-control glass-control-edge, rows → --field-rows). Radius role --radius-field 16px for multi-line holders (glass-ui DESIGN.md:387, 'Multi-line field / stepper / dialog-nested input'). Tokens, not bg-background literals.
- **owner** **CONSUMER**: CONSUMER — FlagReportDialog.vue:30-35
- **fix shape** `<Textarea v-model="detail" rows="3" maxlength="500" resize="none" placeholder="Additional details (optional)" />` imported from @mkbabb/glass-ui. Delete the utility-class stack. If the dialog needs a caption, use a LabeledField.

#### UIA-V-132 · HIGH · migrate-palettes-dialog · Choice buttons pass the retired `variant` prop, so all three render as the same secondary capsule and the choice has no hierarchy

- **source** audit #1 · **verdict** AMENDED · **where** switch mode and regenerate mode, both viewports, both themes
- **frame** `migrate-palettes-dialog/` …/migrate-palettes-dialog/1440-light-02-switch-settled.crop.png, 1440-dark-02-switch-settled.crop.png, 1440-dark-12-regenerate-mode.crop.png, 390-dark-02-switch-settled.png
- **observed** Measured on all three buttons: data-emphasis="secondary" and data-tone="neutral". A stray DOM attribute variant="default\|outline\|ghost" is left on each. Background, shadow and 40px height are identical. The one visual difference is the focus ring that autofocus puts on the first button. The `text-muted-foreground` on "Just switch" is the only trace of the intended ghost style, and it barely reads.
- **expected + canon** glass Button's API is `emphasis` (primary\|secondary\|quiet\|text) plus `tone` (glass-ui src/components/button/Button.vue:39-46). Button.vue:127-146 says a retired `variant` "no longer exists and paints nothing". Sibling dialogs PalettesPane.vue:133-138 and BrowsePane.vue:195-196 already use `emphasis`/`tone`.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/dialog/MigratePalettesDialog.vue:15,24,32
- **fix shape** Map the old variants: publish → emphasis="primary"; transfer → emphasis="secondary"; skip → emphasis="quiet" or "text". Drop the `variant` attributes. Also sweep the 49 other `<Button … variant=` sites in demo/ (grep count) that have the same silent break.
- **confirm** The hierarchy defect is confirmed. In capture-log-1440-light.json frames 01-07, all three buttons have emphasis=secondary, tone=neutral, h=40 and the same bg oklab(0.72…/0.6); in 1440-light-02.crop and 1440-dark-02.crop they look identical. Three amendments. (1) At HEAD 7bc63234, commit 69c0d255 has already deleted the `variant=` props with no `emphasis` in their place, so the fix is now only to add emphasis=primary/secondary/quiet\|text; the stray-attribute half is gone. (2) Even the trace of the ghost style does not exist: 'Just switch' paints rgb(0,0,0) in light and rgb(255,255,255) in dark, the same as its siblings, so the glass capsule ink overrides `text-muted-foreground` completely. (3) The sweep count is 29 `<Button … variant=` sites in demo/ at HEAD (a multi-line perl count), not 49. Owner is CONSUMER; glass Button.vue:39-46 (emphasis/tone) and the retired-variant DEV warning at glass HEAD Button.vue:127-146 are verified.

#### UIA-V-133 · HIGH · migrate-palettes-dialog · When the migration fails, the dialog closes and the dock collapses with no error on screen: the failure only appears in a menu the user has to reopen

- **source** audit #2 · **verdict** CONFIRMED · **where** after "Just switch" to a slug that does not exist (404), and after "Publish, then switch" with the backend down
- **frame** `migrate-palettes-dialog/` …/1440-light-09-just-switch-150ms.png, 1440-light-10-just-switch-outcome.png, 1440-dark-11-publish-api-down-outcome.png, 390-light-11-publish-api-down-outcome.png
- **observed** After a click the dialog closes at once. With no pending state, the dock collapses to its seal. 2.5s later there is no [data-identity-verdict] or role=alert with the failure: measured verdict=[], and the only alerts were 'Home view' and 'Loading the scene…'. The console shows a 404, and the About pane is left on a 'Loading the scene…' skeleton. On the path without local palettes the same 404 shows 'Slug not found.' inline in the slug bar (useSlugMigration.ts:124-133). Through the dialog the user gets silence.
- **expected + canon** The failure is shown where the user acted, as the path without migration already does: the slug bar's setError, or the dialog staying open with an error. The dialog also needs a pending state while publish and login run (glass Button `loading`).
- **owner** **CONSUMER**: CONSUMER demo/palettes/useSlugMigration.ts:160-174 (onMigrateRespond sets `identity` only) + demo/shell/dock/menus/ProfileSection.vue:101-108 (the only place `identity` renders, inside a closed menu)
- **fix shape** Keep the dialog open until the chosen action settles. Put `loading` on the chosen Button and disable the others. On failure keep the dialog open with an inline error line, or route the ApiProblem status to `slugBarRef.setError` as useSlugMigration.ts:124-133 already does. Only close on success.

#### UIA-V-134 · HIGH · extract-view · Eyedropper overlay covers the whole workbench, runs past the viewport, and shows the image twice

- **source** audit #1 · **verdict** CONFIRMED · **state** image loaded → eyedropper open / loupe / pinned / zoom, both viewports, both themes · **where** demo/workbenches/extract/ExtractWorkbench.vue:176-183 (overlay mounted as a child of the workbench root, relative at :2); demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:8 (absolute inset-0 glass-floating rounded-panel)
- **frame** `extract-view/` eyedropper__1440__light.png, loupe__1440__light.png, pinned__1440__dark.png, eyedropper__390__light.png, pinned__390__dark.png
- **observed** The .glass-floating overlay measures [200,202,510,749] at 1440 and [17,198,356,724] at 390, so its bottom edge is below the 900/844 viewport. It spans the whole workbench: drop zone, sliders, dominant readout and palette card. Its surface is translucent, so the large blurred drop-zone copy of the cube shows through at the top while the fitted canvas copy sits lower down. The dimmed sliders, '29% of the…' and the swatches also show through. The fit centres the image in a box that is mostly off-screen, which leaves the working image in the lower half of the view. The top bar (close, swatch, readout) sits far from the image.
- **expected + canon** The sampler is one coherent surface over the specimen it samples, with an opaque stage and nothing from underneath showing through. It is either seated on the drop zone's own box (the specimen) or presented as a glass Dialog/Sheet at --radius-dialog 16px (glass DESIGN.md:387-388, 'Dialog (matches the card)'). The image fits inside the visible box.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Mount the eyedropper inside the ImageDropZone box (or a relative wrapper around only that box) so inset-0 covers the specimen. Alternatively promote it to the glass Dialog/Sheet with an opaque bg-stage canvas well. Fit to the visible box.

#### UIA-V-135 · HIGH · extract-view · The k / kC slider cluster is hand-rolled, unlabeled and inconsistent, and pre-image it paints saturated or white slabs

- **source** audit #2 · **verdict** AMENDED · **state** empty and loaded, both viewports, both themes · **where** demo/workbenches/extract/ExtractControls.vue:14-36 (hand rail :19-23, number-only label :15-17), :65-79 (kC row, 'kC' label :66)
- **frame** `extract-view/` empty__1440__light.png, empty__1440__dark.png, loaded__1440__dark.png, k12__1440__light__full.png, empty__390__light__full.png
- **observed** The k row is a glass Slider with a transparent track laid over a hand-painted div rail. The rail uses rounded-full, an inline gradient background and an inline boxShadow hairline ring. Its only label is the bare number ('5', '12'); no name says what it controls. The kC row is a second glass Slider with a different anatomy: a thinner track, the micro mono label 'kC' (jargon for chroma weight) and a '0.5' readout. Before an image loads, both tracks are solid hot magenta in light and a flat near-white slab in dark (empty__1440__dark.png). They are the loudest elements in the pane and outweigh the drop zone, which is the actual primary affordance. The two sliders do not share width, height, label position or readout convention.
- **expected + canon** One slider row idiom: the glass Slider with its own track (the spectrum variant carries the gradient through --glass-slider-track-background, glass slider/styles.css:117-121), a named label ('Colors' / 'Chroma weight') and a readout in the same position on both rows. Tokens, not inline literals. A pre-image track ink that recedes behind the drop zone.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Delete the painted rail div and pass the gradient through --glass-slider-track-background on the Slider. Give both rows the same label/readout grammar with plain-language names. Pre-image, use the quiet track token rather than the certified accent. If a hairline 'identity edge' is still needed, ask glass for a track-edge token instead of an inline boxShadow.
- **confirm** Visuals confirmed: in empty__1440__light.png both tracks are solid magenta and outweigh the drop zone. In empty__1440__dark.png both are near-white pink slabs. In loaded__1440__dark.png the kC track is still a white slab next to the gradient k track. The hand rail is present at HEAD (ExtractControls.vue:23-27, rounded-full with a railStyle inline), and the Slider gets '--slider-track-bg: transparent'. Amendments: (a) 'the only label is the bare number' is only partly true. Both Sliders carry aria-labels ('Number of colors', 'Chroma weight') and the kC label has title='Chroma weight', so this is a visible-label problem, not an accessibility-name one. (b) The k readout changed at HEAD (d106f3be: kReadout.text shows found/requested). (c) The magenta and white pre-image fills are deliberate 'certified track ink' (T-44a/E1-R3 comment :4-15), so the fix has to override a recorded ruling (the WCAG graphics floor), not just restyle. Owner CONSUMER holds.

#### UIA-V-136 · HIGH · mix-view · The Colors/Palettes SegmentedTabs is a stadium pill; owner-marked 'too rounded, should be more card-like'

- **source** audit #2 · **verdict** CONFIRMED · **state** Colors tab / Palettes tab, all viewports and themes
- **frame** `mix-view/` 1440-light-colors-01-colors-empty.png, 1440-dark-colors-01-colors-empty.png, 390-light-palettes-12-palettes.png
- **observed** Measured: track 162x39 with border-radius 10003px, indicator 77x31 with 9999px. It is a full capsule inside a card-grammar pane whose cards, wells and palette tiles all sit at 16px.
- **expected + canon** Owner ruling of 2026-09-23: smooth and bouncy pills become card-like, fixed at the root. The canon's bounded rung already exists: `--radius-strip` 12px (DESIGN.md:390), or `--radius-panel`/`--radius-field`.
- **owner** **GLASS**: GLASS — SegmentedTabs: src/components/tabs/styles/segmented.css:55 `--bouncy-slider-radius: var(--radius-tab)`, and DESIGN.md:391 `--radius-tab = var(--radius-pill)` (stadium). Consumer site: MixSourceSelector.vue:122-129 (the 'Bouncy segmented control', variant="pill"). · *glass component* SegmentedTabs (src/components/tabs/styles/segmented.css:55) · *head* open-at-HEAD
- **fix shape** Route to the glass-ui session. Rebind `--radius-tab` (DESIGN.md:391) to a bounded card rung (for example --radius-strip or --radius-panel), and let segmented.css:55-56 plus the Law-1 concentric calc (:105-111) derive the indicator. Update the role table so stadium is reserved for true single-line inline controls. No consumer override.

#### UIA-V-137 · HIGH · mix-view · Four different label registers in one pane: 'Selected', 'FROM PALETTES', 'Color space', 'RESULT'

- **source** audit #3 · **verdict** CONFIRMED · **state** Colors empty / Palettes config / Result
- **frame** `mix-view/` 1440-dark-colors-03-from-palettes-open.png, 1440-light-palettes-17-result-palette.png
- **observed** Serif bold 'Selected', mono letterspaced 'FROM PALETTES 3', 16px regular sans 'Color space'/'Hue method'/'Size mismatch', and italic serif caps 'RESULT'. Section captions look like four different apps. The field labels are the largest of the four, which inverts the hierarchy against the section heads.
- **expected + canon** One caption register per role, per demo/DESIGN.md:58 (the type-scale tokens and .section-label). Section heads share one recipe, and field labels sit one step below them.
- **owner** **CONSUMER**: CONSUMER — MixSourceSelector.vue:150 (text-small font-display semibold), MixSourceSelector.vue:214 (.section-label: mono caps, letterspaced), MixConfigBar.vue:106/128/151 (LabeledField label: 16.4px sans at 1440, larger than the others), MixResultDisplay.vue:59 (font-display caption bold uppercase tracking-wide; the only such caption in any workbench)
- **fix shape** Put every section head (Selected, From palettes, Result) on .section-label, or on one shared eyebrow recipe, and let LabeledField's label sit at the caption rung. Delete the one-off uppercase 'Result' class string.

#### UIA-V-138 · HIGH · mix-view · The Mix pane is not bounded by the stage: at empty it has 273px of dead space, and once it has content it outgrows the picker and scrolls the whole page

- **source** audit #4 · **verdict** CONFIRMED · **state** Palettes empty → Palettes selected → Result
- **frame** `mix-view/` 1440-light-palettes-empty-18-palettes-empty.png, 1440-light-palettes-16-anim-200ms.png, 1440-light-palettes-17-result-palette.png, 1440-dark-palettes-17-result-palette.png
- **observed** Measured pane 685px tall with 412px of content (273px dead) in the empty and Colors-empty frames. After selecting palettes the pane is 837px. When the result plate mounts, the page scrolls about 80px, both cards jump up mid-animation, the Mix card's bottom falls below the fold while the picker card ends at y≈765, and a page scrollbar appears.
- **expected + canon** A two-plate stage where the inspector scrolls inside its own card (the pane-scroll-fade contract) and both plates keep one height, with no document scroll and no layout jump while the narration plays.
- **owner** **CONSUMER**: CONSUMER — demo/workbenches/mix/MixPane.vue:66-67 (`h-full` + `overflow-y-auto` on the Card, but the parent row does not bound its height), together with the pane-shell layout (demo/DESIGN.md:387)
- **fix shape** Bound the stage row's height (min-h-0 plus a definite height on the PaneSlot/grid cell) so the Card's own overflow-y-auto engages, and top-align the content without stretching dead space, or size the pane to its content under a max-height equal to the stage.

#### UIA-V-139 · HIGH · mix-view · At 390px the select triggers are 54px tall with 21px text and dominate the pane

- **source** audit #5 · **verdict** AMENDED · **state** Palettes config, 390x844
- **frame** `mix-view/` 390-light-palettes-15-palettes-config.png, 390-light-palettes-17-result-palette.png
- **observed** Measured combobox 158x54 with 21px text (desktop: 227x36, 16.4px). Labels are 14px and palette names 13px, so 'OKLab'/'Shorter'/'Discard extras' are the largest text in the pane after the title, and the Mix CTA grows to about 60px.
- **expected + canon** Controls stay subordinate to content. A touch target can grow its hit area without growing the type (canon: stadium for single-line controls DESIGN.md:385; type from the scale tokens).
- **owner** **GLASS**: GLASS — SelectTrigger (src/components/select/SelectTrigger.vue:52-59: `h-(--control-h-md)` + `text-dropdown`, the comfort cohort on a coarse or narrow viewport). Consumer note: MixConfigBar.vue:108/130/158 still pass `size="sm"`, which glass HEAD removed (SelectTrigger.vue:20-24) and which is now a dead attribute. · *glass component* SelectTrigger (src/components/select/SelectTrigger.vue:52-59) · *head* open-at-HEAD
- **fix shape** Route to glass-ui: keep the comfort height via padding or hit-slop but pin the trigger's type to the control rung, not a mobile bump. Consumer: drop the dead size="sm" props.
- **confirm** The observation is CONFIRMED (390-light-palettes-15: the selects and the Mix CTA dominate the pane). The mechanism and consumer note are wrong for the served version. The served 7.0.0 select-BcBAyLXA.js:91-100 HAS a `size` prop, and `sm` maps to h-(--control-h-sm), so MixConfigBar's size="sm" is LIVE, not dead. The desktop 36px = 2.25rem × ui-scale 1 proves it. The 390 figures are exactly --control-h-sm × --ui-scale 1.5 (36→54) and the 14px control text × 1.5 (→21). The root is --ui-scale/--ui-coarse-scale multiplying the TYPE along with the height (glass tokens :root --control-text: calc(var(--type-small) * var(--ui-scale))). It is not h-md or a text-dropdown bump. The size prop only becomes dead when the consumer moves to glass HEAD (SelectTrigger.vue:20-24 removed it). Owner GLASS stands, retargeted to decoupling --control-text from --ui-scale.

#### UIA-V-140 · HIGH · mix-view · The glass pins in the audit's GLASS cites have moved on: glass HEAD is now 10.0.1 (6433284a), but the demo serves 7.0.0

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `mix-view/` n/a (package.json:88; node_modules/@mkbabb/glass-ui/package.json version 7.0.0; glass package.json 10.0.1)
- **observed** Every glass-routed fix, whether a --radius-tab rebind or a SelectTrigger change, lands in a producer three majors ahead of what /#/mix renders. Such a fix will not show on this page until value.js adopts glass ≥8. That adoption also deletes WatercolorDot, the Select size prop and possibly DockControl compact. The relay letter should say the owner-visible cure needs a consumer repin wave, not only a glass root change.
- **owner** **CONSUMER**: CONSUMER (package.json:88 "^7.0.0") plus a relay note to the glass-ui session

#### UIA-V-141 · HIGH · generate-view · The same palette is rendered three times and the count twice inside one plate

- **source** audit #3 · **verdict** CONFIRMED · **state** default
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/1440-light-01b-card.png ; 390-light-01-default.png ; 1440-dark-12-count-12.png
- **observed** The plate shows: a 40px PaletteColorStrip, then a Badge '5', then a row of 5 WatercolorDots of the same colors, then a mono 'seed' line. Beneath it the count slider's track is a third gradient rendering of the same colors, with a second '5' label (:292-296). At count 12 the dots wrap to two rows and the plate grows to about 270px tall. The primary artifact, the palette, is only 40px tall.
- **expected + canon** One dominant rendering of the generated palette (HIERARCHY). No duplicated readouts (CLUTTER). Owner edict §0bl: 'cluttered'.
- **owner** **CONSUMER**: CONSUMER (demo/workbenches/generate/GenerateControls.vue:142, 157-159, 205-216, 291-301)
- **fix shape** Make the strip the single specimen: taller, with the copy verbs ON its segments (the palette-card idiom), and delete the dot row. Drop either the Badge or the slider's numeric label (keep one count). A plain track would do for the count slider, or keep the ramp and drop the strip; either way, not both.

#### UIA-V-142 · HIGH · generate-view · Regenerate, Save and Copy are duplicated inline AND in the dock Tools bar, which no sibling workbench does

- **source** audit #4 · **verdict** AMENDED · **state** default vs Tools open
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/1440-light-04-tools-open.png ; 1440-light-01-default.png
- **observed** The plate carries a primary-audacious 'Regenerate' capsule plus Save and Copy icon capsules. Tools shows the identical three verbs (generate.regenerate/save/copyColors). Gradient carries no inline duplicates. Mix has a single MixConfigBar button. Generate alone ships its full verb set twice.
- **expected + canon** COHESION: one home for scene verbs across workbenches, the dock Tools SceneActionSet. At most one inline primary where a sibling precedent exists. CLUTTER: no duplicated affordances.
- **owner** **CONSUMER**: CONSUMER (demo/workbenches/generate/GenerateControls.vue:163-192 vs demo/shell/usePaneRouter.ts:816-850)
- **fix shape** Keep the dock Tools set as the canonical verbs. Reduce the plate to at most one inline Regenerate (or none, matching Gradient). Save and Copy live in Tools only.
- **confirm** The duplication is confirmed. usePaneRouter.ts:821-849 declares generate.regenerate, save and copyColors, and 1440-light-06-after-save.png shows the same three in the dock. Gradient and mix have no inline <Button> (grep finds only MixConfigBar.vue:173). One correction: the inline Regenerate is NOT 'primary-audacious'. It carries no emphasis prop, so it renders at the default secondary register (1440-light-01b and 1440-dark-01b show a quiet capsule). The plate therefore has no primary verb at all, which is a separate hierarchy miss.

#### UIA-V-143 · HIGH · gradient-view · Easing editor is built into the Gradient card, not a separate pane (a one-off editor, against the owner's §0bl cohesion edict)

- **source** audit #3 · **verdict** CONFIRMED · **state** easing row open + 'Author a custom curve' disclosed · **where** gradient-view · easing rows / authoring stage · all viewports
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-04d-easing-row-with-stage.png, 390-light-04d-easing-row-with-stage.png, 1440-light-04c-easing-author-stage.png (stage opens at y=882, below the 900px fold)
- **observed** Each interval nests four surfaces deep: pane card > 16px row card > well > EasingPicker with its own PRESET Select. The row grows to about 683px, and the card grows to 1446px with the CSS output pushed off-screen. value.js has no other place where easing is authored, so this is a one-off in-card editor.
- **expected + canon** Owner 2026-09-23: 'ensure that we have cohesion between all animation views… NO one-off instances' — the keyframes idiom keeps the curve editor in its own pane. value.js's pane router already pairs a stage with an inspector (Gradient + Palettes).
- **owner** **CONSUMER**: CONSUMER demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:283-293 + GradientEasingEditor.vue:115-225 + easing/EasingAuthoringStage.vue:96
- **fix shape** Move per-interval easing authoring into its own pane (Gradient stage + Easing inspector, opened by selecting an interval row), built on the same easing-pane component the keyframes scenes use. The Gradient card keeps only a compact one-line summary per interval (dots, glyph, name).

#### UIA-V-144 · HIGH · gradient-view · EasingPicker canvas letterboxed and its endpoint handles clipped inside the well

- **source** audit #4 · **verdict** AMENDED · **state** easing author open · **where** gradient-view · authoring stage disclosed · 1440 and 390 light
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-04d-easing-row-with-stage.png, 390-light-04d-easing-row-with-stage.png
- **observed** At 1440 the unit-square plot fills only the left ~2/3 of the 440x476 well, leaving the right third empty (the 'zero letterbox' law in the seat's own header comment is broken). The (0,0) handle is cut in half at the well's left edge and the (1,1) handle is clipped. At 390 the bottom-left handle is also clipped.
- **expected + canon** The drawn plot is the element box with handle-radius headroom on every side, so grab targets are never clipped. The producer owns its surface register (DESIGN.md tier ladder: wells, not nested cards), so consumers do not :deep-override it.
- **owner** **GLASS+CONSUMER**: GLASS EasingPicker (glass-ui src/components/easing/EasingPicker.vue; README) — no container-sized compact/well variant, so the consumer overrides its internals with :deep (demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue:108-145 styling .glass-card and svg[aria-label]) · *glass component* EasingPicker (src/components/easing/EasingPicker.vue) · *head* open-at-HEAD
- **fix shape** Route to the glass-ui session: add EasingPicker props surface="well" and layout="compact" (container-query, one column) plus handle-overflow padding. The consumer then deletes the four :deep overrides.
- **confirm** The visual is confirmed: 1440-light-04d shows the plot in the left ~2/3 of the well, the (0,0) handle cut in half and the (1,1) handle clipped. The owner call is wrong on the letterbox, though. The consumer causes it: EasingAuthoringStage.vue caps the plot at `inline-size: min(100%, 19rem)` with !important aspect and margin-inline:0 overrides. That 304px cap inside a ~440px well is the empty right third. The glass premise is also stale. Producer EasingPicker already has `surface?: 'card'\|'bare'` (EasingPicker.vue:58-76), and the consumer ignores it, overriding .glass-card with :deep instead of passing surface="bare". Corrected call: CONSUMER primary (drop the 19rem cap and the :deep card overrides, use surface="bare"). GLASS secondary, only for handle-radius headroom inside the SVG viewBox, which is where the clipping happens.

#### UIA-V-145 · HIGH · gradient-view · Copy CSS copies a 32-stop sampled string, not the CSS shown, and gives no copied feedback

- **source** audit #5 · **verdict** CONFIRMED · **state** Tools: Copy CSS after Seed from palette · **where** gradient-view · Tools > Copy CSS and the CSS header copy · 1440 and 390
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-06c-after-copy.png (clipboard in capture-log-1440-light.json metrics '1440-light-copy')
- **observed** The editor shows `linear-gradient(45deg, #ff6b35 0%, #f7c59f 25%, …)`. The clipboard receives `linear-gradient(45deg in oklch, oklch(70.45% 0.19259 39.23deg) 0.00%, … 3.13%, …` (about 32 sampled stops) even though every interval is linear. No 'Copied' state appears; only the hover tooltip. The per-row easing copy does flip to a Check tick, so the two copy buttons behave differently.
- **expected + canon** What is copied matches what is shown (or the editor shows the eased form when easing is non-linear). Copy confirms the same way everywhere (glass useClipboard state, as the easing readout rail does).
- **owner** **CONSUMER**: CONSUMER demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:107-109 (copyCSS writes coalescedCSS) and :297-307 (the editor shows simpleCSS)
- **fix shape** Copy simpleCSS when all intervals are linear, otherwise show the coalesced form in the editor (or label it 'eased CSS'). Drive a Check tick or toast from glass useClipboard on both copy sites.

#### UIA-V-146 · HIGH · gradient-view · Rendered gradient is a small side tile, not the main surface; CSS output sits below the fold

- **source** audit #6 · **verdict** CONFIRMED · **state** default · **where** gradient-view · default · 1440x900 light and dark
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-01-default.png, 1440-dark-01-default.png
- **observed** The page's output, the gradient as rendered with type and direction, is a 96x134 tile tucked right of three Selects. The strongest element is the editing rail, and the CSS section starts at y≈812 and is cut off at the 900px fold. Section h3s ('Stops', 'Interpolation', 'Easing', 'CSS') all use the same muted Fraunces 20px, so nothing leads.
- **expected + canon** Primary content dominates: a large preview plate at the top, the rail directly beneath it as its editor, then the controls, with the CSS output visible without scrolling at 1440x900.
- **owner** **CONSUMER**: CONSUMER demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:147-259 (the 96x134 tile at row-span-2 beside the selects) and GradientPane.vue:43-49
- **fix shape** Promote the render tile to a full-width preview plate (aspect about 16:9, --radius-media) at the top of the card. Put the rail under it and turn the Type/Space/Hue/Direction band into one compact row. Collapse easing to per-interval summaries (see the easing-pane finding) so the CSS fits in the first viewport.

#### UIA-V-147 · HIGH · gradient-view · Direction slider still shows (and does nothing) when Type = Radial

- **source** audit #7 · **verdict** CONFIRMED · **state** select open → Radial chosen · **where** gradient-view · Type=Radial · 1440 and 390
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-03b-stop-added.png (Radial selected, DIRECTION 90° still live), 390-dark-03d-stop-dragged.png
- **observed** After choosing Radial, 'DIRECTION 90°' and its slider stay fully live, but the emitted CSS is `radial-gradient(…)` with no angle.
- **expected + canon** Controls earn their place: for Radial the angle control is hidden or disabled with a reason; for Conic it reads 'From'.
- **owner** **CONSUMER**: CONSUMER demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:261-280 (no v-if on type; model says direction is ignored for radial, model/types.ts:42)
- **fix shape** Use v-if="type !== 'radial'" on the Direction field and label it 'From' when type === 'conic'.

#### UIA-V-148 · HIGH · gradient-easing-authoring · The inline authoring editor is a one-off seat: a third, differently-overridden EasingPicker host and a copied specimen gallery, not the shared separate-pane idiom

- **source** audit #1 · **verdict** CONFIRMED · **state** authoring stage open (bezier and steps) · **where** CONSUMER demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue:91-103 (inline seat) + :107-134 (three :deep 'laws', !important on the svg); EasingSpecimenStrip.vue:1-10 ('the kf T.E6 specimen gallery … transposed'); GradientEasingEditor.vue:208-221. GLASS easing family (README 'Ownership boundary': 'three downstream repositories each grew their own plot' — the same has now happened with the gallery and the seat).
- **frame** `gradient-easing-authoring/` 1440-light-06-authoring-bezier.png, 1440-light-10-authoring-steps-el.png, 390-dark-06-authoring-bezier.png
- **observed** The owner's flag is borne out. value.js puts glass <EasingPicker> INLINE inside the interval row through its own EasingAuthoringStage, which restyles the producer's internals with three :deep override laws (one column, wells-not-cards, zero-letterbox with !important). keyframes.js reaches the same component through a different shared seat (demo/components/instrument/transport/channel-controls/composables/useEasingPickerSeat.ts), used by both TimingFunctionPanel and EasingSidebar in a separate panel. It also has its own specimen gallery (EasingTarget.vue), of which value.js's EasingSpecimenStrip is a hand transposition. So there are two seats, two galleries, and two sets of chrome for one curve editor.
- **expected + canon** One animation/easing idiom across all views (COHESION §0bl OA-37: 'NO one-off instances'). A curve is chosen in one gallery primitive and authored in one editor seat, with the editor in its own pane/panel beside the thing it drives. It should not be poured into an accordion row with local overrides of the producer's internals.
- **owner** **GLASS+CONSUMER**: CONSUMER + GLASS · *glass component* EasingPicker · *head* open-at-HEAD
- **fix shape** Glass publishes the gallery and the seat. Options: an EasingGallery (or a gallery mode on the easing family), plus seat behaviour (preset display, bare surface, one column) as props, so neither consumer overrides internals. value.js then opens the editor in a separate surface (a side pane or sheet anchored to the interval, like kf's timing panel) and deletes EasingAuthoringStage's :deep laws. keyframes and value.js consume the same two primitives.

#### UIA-V-149 · HIGH · gradient-easing-authoring · The preset Select reads 'Pick a curve' while the interval IS a named preset from its own list; the strip and the Select disagree

- **source** audit #2 · **verdict** AMENDED · **state** authoring stage open after a strip selection (ease-in-back, smooth-step-3, linear) · **where** GLASS EasingPicker. At 7.0.0, EasingPickerValue carries no preset field, so a v-model write never names the preset (documented in keyframes' useEasingPickerSeat.ts header). At glass HEAD, src/components/easing/usePicker.ts:242 and :261 also set seeded or handle-written points to CUSTOM_PRESET, without matching them against the catalogue. Consumer site: EasingAuthoringStage.vue:96-102 (:model-value only).
- **frame** `gradient-easing-authoring/` 1440-light-06-authoring-bezier.png, 1440-light-09-authoring-steps-el.png (smooth-step-3 pressed, Select still 'Pick a curve'), 390-light-06-authoring-bezier.png, 1440-light-08-preset-select-open.png (its list contains linear/ease/…/smooth-step-3)
- **observed** In every leg, selecting a tile in the strip (head shows 'ease-in-back', tile pressed) leaves the picker's PRESET Select on its placeholder 'Pick a curve'. The opposite direction works: choosing ease-out in the Select moves the head, the trigger and the pressed tile (log: preset → head 'ease-out', selTile 'ease-out'). The same interval therefore shows two contradictory selection states, and one of them says no curve is set.
- **expected + canon** When points are written through the model and they equal a catalogue preset, the Select displays that preset. It shows 'custom' only for off-catalogue points. The two selectors never disagree (glass DESIGN states: selected state consistent).
- **owner** **GLASS+CONSUMER**: GLASS · *glass component* EasingPicker · *head* open-at-HEAD
- **fix shape** Glass: derive `preset` from the points on every model write (exact-quad match against the catalogue, else custom), or add `preset` to EasingPickerValue. Consumer: none needed once glass derives it (keyframes currently remounts on a preset key as a workaround; value.js should not copy that).
- **confirm** The desync is confirmed: 1440-light-09-authoring-steps-el.png shows the smooth tile pressed and the head reading smooth-step-3 while the Select says 'Pick a curve', and the 06 frames show the same. The owner should be GLASS + CONSUMER, not GLASS alone. The installed 7.0.0 EasingPicker.vue.d.ts has a `preset?: string` prop ('The initial bezier preset key'), and EasingAuthoringStage.vue:96-102 does not pass it. The stage mounts when authoring is disclosed, so passing :preset=selectedId would name the preset on open today. Glass still owns keeping it in sync after mount: HEAD usePicker.ts:242 and :261 set CUSTOM_PRESET and never match the catalogue.

#### UIA-V-150 · HIGH · gradient-easing-authoring · The authoring stage buries the gradient: one interval grows to ~770px, and the whole gradient and CSS output scroll away while you edit

- **source** audit #3 · **verdict** CONFIRMED · **state** authoring stage open · **where** demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue:151-222 (open-row body inline in the pane scroll) + EasingAuthoringStage.vue:91-103
- **frame** `gradient-easing-authoring/` 1440-light-06-authoring-bezier.png, 1440-light-07-authoring-bezier-canvas.png, 390-dark-06-authoring-bezier.png, 390-light-06-authoring-bezier.png
- **observed** Measured row0 height goes from 196px (open) to 767px (authoring) at 1440 and to 736px at 390, and the pane grows from 1035px to 1606px. In the authoring frames the Stops rail and the gradient preview are off-screen, so the only feedback for a drag is the row's 20px ramp strip. At 390, a single interval fills the whole phone viewport.
- **expected + canon** The primary content (the gradient being built) stays dominant and visible while its easing is authored (HIERARCHY; glass DESIGN depth/hierarchy). Editing belongs in a surface adjacent to the preview, not in an in-flow accordion that pushes the preview out of view.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Move authoring to a separate pane, sheet or anchored popover (the same surface as the one-idiom finding), or at minimum keep the stop rail and preview sticky above the open row while authoring is disclosed.

#### UIA-V-151 · HIGH · gradient-easing-authoring · Three selectors for one interval curve: a 27-chip specimen strip, the picker's own preset Select (the same catalogue), and the handles

- **source** audit #4 · **verdict** CONFIRMED · **state** authoring stage open · **where** CONSUMER EasingSpecimenStrip.vue:87-124 (strip) beside GLASS EasingPicker's Select (installed 7.0.0 'Preset'; HEAD EasingPicker.vue:517-538). The picker has no prop to suppress its preset control (7.0.0 d.ts; HEAD props :60-79 = initial/playback/label/surface/class).
- **frame** `gradient-easing-authoring/` 1440-light-08-preset-select-open.png, 1440-light-06-authoring-bezier.png
- **observed** The strip (css/sine/quad/cubic/expo/circ/back/steps families, 27 tab-stop chips) and the picker's PRESET dropdown (linear, ease, ease-in, …, smooth-step-3, ease-in-sine …) both select from the same value.js bezierPresets catalogue, one above the other, with a 'PRESET' eyebrow. Add the literal rail and the SlidersHorizontal toggle, and a single interval shows 5 control clusters.
- **expected + canon** CLUTTER: every control earns its place, so the same choice is offered once. The stated BG-8 division is 'the strip selects, the picker authors', but the picker still selects.
- **owner** **GLASS+CONSUMER**: GLASS + CONSUMER · *glass component* EasingPicker preset Select (suppress-presets prop) + easing gallery/seat primitive · *head* open-at-HEAD
- **fix shape** Glass: a prop (e.g. `presets=false`, or a gallery-hosted mode) that drops the preset Select when the host supplies the selection surface. Consumer: pass it. The other option is to drop the strip and let the glass gallery primitive be the only selector.

#### UIA-V-152 · HIGH · gradient-easing-authoring · Specimen tiles are circles holding two lines (glyph + label): the 'too rounded pills' the owner flagged; they should be card-like cells

- **source** audit #5 · **verdict** AMENDED · **state** row open (strip), all themes/viewports · **where** demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:105 (shape="icon") + :172-183 (44×44 sizing) and the rationale comment :166-171 that chose the circle over `cell`
- **frame** `gradient-easing-authoring/` 1440-light-01-row-open-el.png, 1440-dark-01-row-open-el.png, 1440-light-10-authoring-steps-el.png
- **observed** Each tile is a glass Chip shape="icon", which measures radius 9999px on a 44×44 box. Inside it sits a 22px curve portrait over a 9px mono label, and 'in-out' / 'n = 4' press against the circular edge. The row reads as a line of bubbles, exactly the owner's 'too rounded … should be more card like'.
- **expected + canon** glass DESIGN.md:385-391 role table: stadium/pill is for single-line controls only; a multi-line holder takes --radius-field (16px) / card. Glass already ships the card-like chip geometry: `shape="cell"` → `.glass-chip--cell { border-radius: var(--radius-card) }` (glass-ui src/styles/glass/glass-chip.css, cell rule).
- **owner** **GLASS+CONSUMER**: CONSUMER · *glass component* Chip shape="cell" (glass-chip.css) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** Use `shape="cell"` (radius-card, column layout) for every specimen tile, sized to fit the portrait and label (e.g. ~56×52). Keep the glyph inside the cell's padding. The d1 comment's 'capsule' objection is resolved by cell's radius-card, not by a circle.
- **confirm** The observation stands: tile0 measures 44×44 with r=9999px, glyph plus label, in every leg. The owner and the fix are wrong at the installed version. My probe shows `glass-chip--cell` computes 9999px at 7.0.0, because glass-chip.css (which holds `.glass-chip--cell{border-radius:var(--radius-card)}`) is imported by no 7.0.0 style entry. The d1 comment's claim that 'cell resolved to a capsule' (EasingSpecimenStrip.vue:166-171) was therefore empirically true, not a misreading. Owner is GLASS (7.0.0 packaging, cured at 4442b451 and in 8.0.0 or later) + CONSUMER (shape choice). The consumer fix is to switch to shape="cell" only together with the repin to glass ≥8.0.0; before that it is a no-op.

#### UIA-V-153 · HIGH · gradient-easing-authoring · Glass 7.0.0 does not load glass-chip.css, so chips app-wide render without their styling

- **source** confirm miss #1 · **verdict** MISSED (confirm seat) · **where** node_modules/@mkbabb/glass-ui/dist/styles/glass.css (@import list without glass-chip.css), dist/glass-ui.css (0 matches for .glass-chip). The glass-ui fix is 4442b451, first tagged v8.0.0.
- **frame** `gradient-easing-authoring/` Headed probe at 1440 light on value.js c5368a51 with 4 dirty. Walking the page stylesheets finds 0 `.glass-chip[data-mode…]` rules. A synthetic .glass-chip--cell computes 9999px.
- **observed** Headed probe at 1440 light on value.js c5368a51 with 4 dirty. Walking the page stylesheets finds 0 `.glass-chip[data-mode…]` rules. A synthetic .glass-chip--cell computes 9999px. node_modules/@mkbabb/glass-ui/dist/styles/glass.css (@import list without glass-chip.css), dist/glass-ui.css (0 matches for .glass-chip). The glass-ui fix is 4442b451, first tagged v8.0.0. This is the shared root of the unpainted-pressed-tile and circle-tile findings, and it is not limited to this page. Every Chip on the site loses its pressed flood, the cell and icon shape rules, and the coarse-pointer touch floor. The same commit re-homed glass-atom, so the atom styles (.glass-atom/.badge-atom) are likely missing at 7.0.0 too; this seat did not verify that. The cross-page UI audit should treat this as one root cause and route it as a repin item, not as per-page consumer restyles.
- **owner** **GLASS+CONSUMER**: GLASS (cured upstream) + CONSUMER (repin) · *glass component* Chip (glass-chip.css import; 4442b451, >=8.0.0) · *head* cured-at-HEAD (adopt via repin)

#### UIA-V-154 · HIGH · atmosphere-view · Textured media (pastel, watercolor, oil, crayon, Van Gogh) look identical to Smooth

- **source** audit #2 · **verdict** CONFIRMED · **state** each medium selected, ≥4 s settle · **where** /#/atmosphere, Medium select
- **frame** `atmosphere-view/` 1440-light-04-medium-*.png, probe-1x-texture-{smooth,watercolor,vangogh,crayon}.png, probe-ground.json (luminance std 0.6-1.9 for every medium, equal to smooth)
- **observed** At 1:1, crops of the ground under crayon, Van Gogh and watercolor are the same soft gradient as smooth. Only hue drifts. Six of the seven options give no visible change, so the select does not earn its place.
- **expected + canon** Each painterly register should read as a distinct texture (Aurora README:3-4). A control should visibly change its subject.
- **owner** **GLASS**: GLASS — Aurora medium registers' default amount (consumer AuroraPane.vue:92-98 passes no amount and offers no Amount knob) · *glass component* Aurora (AuroraPane.vue:92-98) · *head* open-at-HEAD
- **fix shape** Glass: raise or verify the default amount per textured medium on the smooth-calibrated field. Consumer: add a Texture amount slider shown only for textured kinds, and give Medium options a preview like Harmony's PreviewStrip. Also delete the no-op ternary at AuroraPane.vue:97 (`kind === 'smooth' ? { kind } : { kind }`).

#### UIA-V-155 · HIGH · atmosphere-view · Pane covers its own subject: a 1042×655 form hides the atmosphere it tunes

- **source** audit #4 · **verdict** AMENDED · **state** default · **where** /#/atmosphere default, 1440 and 390
- **frame** `atmosphere-view/` 1440-light-01-default.png, 390-light-01c-fullpage.png
- **observed** The card takes about 60% of the 1440 viewport and nearly all of the 390 viewport. The field being tuned shows only as a margin around a settings form, so medium and motion changes are judged through a 1 cm border. Four single-word Selects stretch to 867-918 px wide.
- **expected + canon** The canon Configurator idiom (glass DESIGN.md:1436-1443; Aurora chrome is itself a useConfiguratorState consumer, DESIGN.md:1461) uses a stage-dominant layout: the stage is the subject and a controls aside of about 360 px holds the knobs.
- **owner** **CONSUMER**: CONSUMER — demo/scenes/ConfigSliderPane.vue:98-101 (full-stage Card); the route is a single stage region
- **fix shape** Render the pane as a narrow aside or sheet over the ground (Configurator side=right or a ConfiguratorLayer sheet), with the ground as the stage. On mobile, use a bottom sheet with a peek so the ground stays visible.
- **confirm** The frames confirm it: the card covers most of the 1440 stage and nearly all of 390. The citation is wrong. DESIGN.md:1436-1443 lists the primitives but says nothing about a stage-dominant layout. The 360 px aside plus stage layout is in glass src/components/configurator/Configurator.vue:26-49 (asideSide, 'the 360px aside'). Cite that. The CONSUMER owner call stands.

#### UIA-V-156 · HIGH · atmosphere-view · Two row grammars in one pane: hand-rolled enum rows outside the well, ConfiguratorRow sliders inside it

- **source** audit #5 · **verdict** AMENDED · **state** default · **where** /#/atmosphere default
- **frame** `atmosphere-view/` 1440-light-01-default.png, 1440-light-01b-card.png, 390-light-01c-fullpage.png
- **observed** The enum rows are a hand-rolled flex with an inline mono-caps .section-label. Label widths vary, so trigger left edges land at x=298/308/349/298 (a ragged column). They sit on the bare plate. The numeric knobs sit in a console well with a 'FIELD' mono-caps section header and sans labels stacked above the tracks. That makes three label voices (HARMONY mono caps, FIELD mono caps plus rule, 'Colour Energy' sans) and two containment levels for one flat atom set.
- **expected + canon** glass DESIGN.md:1441-1442: ConfiguratorLayer is the 'labelled group of related rows' and ConfiguratorRow is a 'single labelled control (slider, select, color, switch)'. Every atom should be one ConfiguratorRow in the same layer or well.
- **owner** **CONSUMER**: CONSUMER — demo/scenes/atmosphere/AuroraPane.vue:120-186 plus the scoped .aurora-row style at :191-196; ConfigSliderPane.vue:118-156
- **fix shape** Move all seven atoms into ConfiguratorRow inside ConfiguratorLayer groups (e.g. Palette: Harmony · Field: Arrangement, Zones, Noise, Energy · Material: Medium · Motion). Delete .aurora-row. Use one label voice.
- **confirm** Confirmed visually: the trigger left edges are ragged at 1440 and at 390, and there are three label voices. Line cites are shifted: the enum block is AuroraPane.vue:124-186 and .aurora-row is at :193-198, not :191-196. The DESIGN.md:1441-1442 quote is accurate.

#### UIA-V-157 · HIGH · atmosphere-view · Italic text on every control: triggers, options and caption

- **source** audit #7 · **verdict** CONFIRMED · **state** default and open · **where** /#/atmosphere, all states and viewports
- **frame** `atmosphere-view/` 1440-light-01-default.png (crop: Analogous/Scattered/Smooth/Drifting italic), 390-light-03c-select-medium-open.png, probe-type.json (trigger and span font-style: italic)
- **observed** Trigger values, all option rows and the pane description render in italic Plus Jakarta Sans. The class only half-applies: the italic arrives but the caption size loses to text-dropdown (16.4 px, not 14.4 px).
- **expected + canon** demo/DESIGN.md:28-29: 'italics never on control text'.
- **owner** **GLASS+CONSUMER**: CONSUMER — AuroraPane.vue:128,148,162,176 (`text-caption` on SelectTrigger) and :135,152,166,180 (on SelectItem). Root cause is GLASS 7.0.0 dist styles/typography/semantic.css, where `@utility text-caption` carries font-style:italic; glass HEAD src/styles/typography/semantic.css:224 has already dropped it, so it lands with the pin bump. · *glass component* SelectTrigger (styles/typography/semantic.css) · *head* cured-at-HEAD (text-caption) + residual open (italic display triggers)
- **fix shape** Remove `text-caption` from the SelectTrigger and SelectItem class lists and let the glass Select own its type (text-dropdown). Bump glass past 7.0.0 so that text-caption is upright.

#### UIA-V-158 · HIGH · atmosphere-view · Sliders render as heavy solid slabs with no filled range and a hard-to-read readout

- **source** audit #11 · **verdict** CONFIRMED · **state** default, dragging · **where** /#/atmosphere Field well, both themes
- **frame** `atmosphere-view/` 1440-light-01-default.png (dark slabs), 1440-dark-01-default.png (light-grey slabs), 390-light-01c-fullpage.png, 1440-dark-05b-slider-dragging.png
- **observed** Each knob is a full-width, 16 px tall, solid ink stadium. The spectrum variant's .slider-range is transparent, so no filled/unfilled split shows and the value reads only from a 12×24 hairline thumb. The three slabs are the heaviest marks on the pane, outweighing the title. The readout is a ~10 px mono '0.760' that switches format to '1' at integers. Zones (1-6, step 1) shows no ticks.
- **expected + canon** The spectrum variant is for colour-gradient tracks. A scalar knob uses the default glass Slider (track plus filled range), with the value readable at the label rung.
- **owner** **CONSUMER**: CONSUMER — ConfigSliderPane.vue:144-152 (`variant="spectrum"` for plain numeric knobs) and :202 (track re-inked to --ink-muted); readout at ConfigSliderPane.vue:141 (`fmt`)
- **fix shape** Use the default Slider variant with a filled range; drop the --slider-track-bg override. Format readouts to fixed precision per def (e.g. 2 dp; integers for Zones) at label size. Add step ticks for discrete defs.

#### UIA-V-159 · HIGH · atmosphere-view · Action footer: two capsule buttons inside a GlassDock pill inside the card, with a misregistered fill

- **source** audit #12 · **verdict** AMENDED · **state** default, after copy · **where** /#/atmosphere card footer, all states
- **frame** `atmosphere-view/` 1440-light-01-default.png (crop: grey fill inset from the capsule edge, not covering the icon), 390-light-01c-fullpage.png, 1440-dark-06a-after-copy.png
- **observed** A stadium dock holds two stadium 'ghost' buttons, pill in pill in card, above a separator rule. Ghost renders a filled oklab(.72/.6) capsule. In light theme the grey fill is narrower than its capsule, a visibly misregistered lozenge. This is the 'too rounded pills' pattern the owner named.
- **expected + canon** GlassDock is the dock container (--radius-dock, DESIGN.md:396). A card footer's secondary actions are plain Buttons in the card or Configurator footer. Ghost has no resting fill. Card-like surfaces rather than nested stadiums (owner 2026-09-23).
- **owner** **GLASS+CONSUMER**: CONSUMER — ConfigSliderPane.vue:163-174 (GlassDock always-expanded used as a footer toolbar). GLASS — Button variant=ghost renders glass-wash/glass-capsule with an inset fill in 7.0.0 · *glass component* Button · *head* open-at-HEAD
- **fix shape** Consumer: replace the GlassDock with a plain right-aligned footer row of Button ghost/sm, or use the Configurator's commit/reset slot. Glass: fix the ghost resting fill, and the glass-wash layer's inset so it does not misregister, inside dock contexts.
- **confirm** Pill-in-pill-in-card is confirmed (ConfigSliderPane.vue:163-174). The inset grey lozenge is clearly visible in 390-light-01c and 1440-light-01-default. It is absent in dark (1440-dark-03a2 renders clean outlined capsules), so the misregistration is light-theme only. The mechanism is wrong: the consumer passes no variant (`<Button size="sm">`). Glass 7.0.0 Button defaults to emphasis 'secondary', and neutral tone plus primary/secondary emphasis adds 'glass-wash glass-capsule'. This is not 'ghost', so 'ghost has no resting fill' is not the governing expectation. Consumer fix: pass a lower emphasis and drop the GlassDock. Glass fix: the glass-wash inset misregistration in light theme.

#### UIA-V-160 · HIGH · blob-view · The blob scene's subject is a 113px ornament in the corner and scrolls away while you tune it

- **source** audit #2 · **verdict** CONFIRMED · **state** default / slider tuned / animation view
- **frame** `blob-view/` 1440-light-01-default.png, 1440-light-03-pane-scrolled-bottom.png, 1440-light-10-after-copy.png, 390-light-06-tuned-live.png (crops/390-light-sheet.png)
- **observed** The stage is the whole colour picker (spectrum and channel console), which has nothing to do with blob tuning. The blob is a 113x113 decorative bead at the card's top-right (metrics: hero-blob-anchor box [598,-1,113,113]). Scrolling to Lit Glass, Pointer, Satellites or Tempo leaves the left half of the viewport as empty gradient (03/10), so the blob is not visible while you tune those sliders. At 390 the first slider sits below the entire picker, so the blob and the sliders are never on screen together. The Pointer sliders (Attraction, Strength, Stretch, Click Impulse) cannot be tried at all, because the hero is pointer-events-none.
- **expected + canon** The tuned subject is the dominant, always-visible content of its own scene. The sibling Atmosphere scene (viewSchema.ts:212-216) gives its subject the stage and nothing beside it. Scenes should share one grammar: the subject on the stage, the controls in the inspector.
- **owner** **CONSUMER**: CONSUMER — demo/shell/viewSchema.ts:218-225 (blob scene: stage = color-picker, inspector = blob) + demo/picker/visual/HeroBlob.vue:2-10 (aria-hidden, pointer-events-none ornament)
- **fix shape** Blob scene: stage = a dedicated interactive blob stage (a large Blob that pointer events can reach, sticky or viewport-bounded), inspector = BlobPane. Drop the picker from this scene. At <lg, pin the stage above the pane or use a sheet.

#### UIA-V-161 · HIGH · blob-view · Inspector card has no height bound (2693px), so the 'docked' Copy/Reset footer sits 1700px below the fold

- **source** audit #3 · **verdict** CONFIRMED · **state** default config sliders; Copy JSON / Reset
- **frame** `blob-view/` 1440-light-01-default.png, 1440-light-03-pane-scrolled-bottom.png; 1440-light-metrics.json (card box h=2693, scroll sh=2614 == ch=2614, actionBar y=2614)
- **observed** The scroll host never scrolls: scrollHeight equals clientHeight at 2614, so the whole page scrolls instead. The action bar that ConfigSliderPane.vue:171-174 says is 'docked below the scroll region so it can never occlude a slider' is at y=2614 at 1440 and y≈7800 at 390. It can only be reached after scrolling past all 31 sliders. The picker card beside it is bounded at about 950px, so the two cards of one scene are wildly different heights.
- **expected + canon** Inspector panes are bounded to the viewport. The pane-scroll-fade region scrolls internally, and the footer actions are always visible, which is what the component's own comment says.
- **owner** **CONSUMER**: CONSUMER — demo/scenes/ConfigSliderPane.vue:109-189 (Card h-full + flex-1 scroll region + flex-none footer, which only works under a bounded parent) and the blob scene's inspector region sizing
- **fix shape** Bound the inspector region's block size (e.g. min(100dvh - dock offset, content)) so Card h-full resolves. Or make .config-action-bar sticky at the bottom of the card.

#### UIA-V-162 · HIGH · blob-view · Configurator chrome is hand-rolled around ConfiguratorRow instead of using the glass-ui configurator family

- **source** audit #4 · **verdict** CONFIRMED · **state** default config sliders
- **frame** `blob-view/` 1440-light-02-pane.png, crops/1440-light-hoverfocus.png
- **observed** Seven hand-rolled mono, caps, letterspaced section headers with a hairline (16.4px, the same size as the row labels). A bespoke reset that restores everything at once. No per-row reset, no presets, no collapse. The file's header comment says 'the section-group wrapper and the floating copy/reset dock remain demo-local'.
- **expected + canon** glass-ui DESIGN.md:1438-1443: the configurator family (Configurator / ConfiguratorLayer / ConfiguratorRow / useConfiguratorState) is 'the canonical chrome for live token/preset editing'. ConfiguratorLayer carries the section label (--configurator-section-{size,weight}) and the section radius. ConfiguratorRow.vue:79-93 provides canReset per row.
- **owner** **CONSUMER**: CONSUMER — demo/scenes/ConfigSliderPane.vue:143-146 + :221-233 (config-section-header/-title reproduce ConfiguratorLayer's section label), :93-95 (resetDefaults = Object.assign, re-rolling useConfiguratorState.reset), :176-187 (GlassDock + ghost Buttons as the action bar); ConfiguratorRow canReset never used
- **fix shape** Compose ConfiguratorLayer per section and useConfiguratorState<BlobConfig> for reset, commit and presets. Enable ConfiguratorRow canReset per row. Delete .config-section-header/.config-section-title. If ConfiguratorLayer lacks a needed axis, route that gap to the glass-ui session rather than forking it.

#### UIA-V-163 · HIGH · blob-view · 31-slider wall with no disclosure, jargon labels, and duplicate row names

- **source** audit #5 · **verdict** CONFIRMED · **state** default config sliders
- **frame** `blob-view/` crops/1440-light-hoverfocus.png (the full pane), 390-light-01b-fullpage.png (7870px tall at 390)
- **observed** 31 rows across 7 sections, all expanded at once. 'Noise Freq' and 'Noise Speed' each appear twice (Membrane and Color) with no qualifier. The labels are internal jargon ('Smooth K', 'Sat Radius', 'Rim Power', 'Sub-surface'). Tempo is a whole section with a single slider. Nothing ranks importance.
- **expected + canon** Clutter rule: controls earn their place. The canon family provides ConfiguratorLayer for grouped, collapsible sections. Each label is unique and meaningful within the pane.
- **owner** **CONSUMER**: CONSUMER — demo/scenes/blob/BlobPane.vue:54-116 (SECTIONS)
- **fix shape** Use collapsible layers with Geometry and Membrane open by default and the rest collapsed. Qualify duplicated labels ('Membrane noise freq' / 'Colour noise freq') or rely on unique layer context plus sub. Fold Tempo into Membrane or Pointer. Consider hiding the expert atoms (Rim Power, Shininess) behind an 'Advanced' layer.

#### UIA-V-164 · HIGH · blob-view · Hero blob flashes as an opaque square tile during a colour jump

- **source** audit #11 · **verdict** CONFIRMED as a captured frame; the cause remains PLAUSIBLE · **state** animation view (blob motion) / colour change after Reset
- **frame** `blob-view/` crops/1440-light-home-blob.png, 1440-light-12-home.png, 1440-dark-12-home.png (both themes); a direct load of the same near-black colour renders correctly: probe-F-nearblack-blob.png
- **observed** Right after the colour jumped to lab(2.7% 2.5 0.2) (a click on the spectrum following Reset and a scroll), the blob slot captured about 1.5s later showed a hard-edged, dark, filled square the size of the canvas instead of a metaball. The same frame appeared in both themes. Loading the same colour directly renders a proper dark blob.
- **expected + canon** The blob canvas is transparent outside the membrane in every frame, including wake, repaint and palette re-seed.
- **owner** **GLASS+CONSUMER**: GLASS — Blob (@mkbabb/glass-ui/blob wake/repaint path) with CONSUMER HeroBlob.vue:152-176 (heroConfig recomputed per colour tick) — PLAUSIBLE, not reproduced on direct load · *glass component* Blob (HeroBlob.vue:152-176) · *head* open-at-HEAD
- **fix shape** Repro: /#/blob, press Reset, scroll to top, click the spectrum at bottom-centre, capture the blob slot within 2s. Check that Blob clears to transparent on re-seed and resize and never presents an unrendered backing store. Route to the glass-ui session if the cause is in the substrate.
- **confirm** crops/1440-light-home-blob.png does show a hard-edged, opaque dark square where the blob should be, and the author reports it in both themes. The direct-load control (probe-F) renders a correct dark blob, so this is a transition-path artefact. Because HeroBlob parks and wakes the renderer (idle gate :211-225, plus the KeepAlive wake-gray cure right after), the consumer's park/wake choreography is as likely a cause as a Blob backing-store present. Keep the owner as GLASS plus CONSUMER. Run the author's repro before routing it.

#### UIA-V-165 · HIGH · admin-users · Button `variant=` props are dead on glass 7: every ghost/outline control renders as a filled secondary capsule

- **source** audit #2 · **verdict** AMENDED · **state** rest · **where** admin-users · toolbar, every row, sort trigger
- **frame** `admin-users/` 1440-light-00-roster-local.png; meta buttons[].attrs shows variant="ghost"/"outline" next to data-emphasis="secondary" with backgroundColor oklab(.916 …/0.52) on all 28x28 delete-user buttons
- **observed** The installed glass-ui 7.0.0 ButtonProps are emphasis\|tone\|size\|iconOnly\|loading. The prop variant="outline"/"ghost" is passed through to the DOM as a plain attribute, so every button renders at emphasis=secondary as a glass capsule. W5-12's intent (the per-row destructive button 'quieted to ink-at-rest, never resting beacons') is defeated: 12 filled capsules run down the list, and the ⋮ sort trigger is a filled disc inside the search field.
- **expected + canon** glass Button axes (Button.vue.d.ts: emphasis 'primary'\|'secondary'\|'quiet'\|'text'). A quiet or text control should have no plate at rest (DESIGN.md:15: 'A ghost Button sits flat on any Card variant').
- **owner** **GLASS+CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:16,27,135,148; demo/palettes/browser/search/UserSortMenu.vue:9 (same pattern in siblings AdminFlaggedPanel.vue:13,122,133, AdminTagsPanel.vue:14, AdminAuditPanel.vue:32, AdminNamesPanel.vue:76,83). GLASS note: 7.0.0 accepts the unknown attr silently; glass HEAD src/components/button/Button.vue ~95-113 now warns in DEV · *glass component* Button (src/components/button/Button.vue) · *head* open-at-HEAD
- **fix shape** Re-spell to emphasis="quiet" (row delete, sort trigger) and emphasis="secondary" (toolbar), with tone="destructive" on hover or focus for the destructive buttons. Sweep the whole admin console the same way, and add a vue-tsc check that fails on unknown props passed to glass components.
- **confirm** Core claim CONFIRMED. demo/ui/button re-exports glass Button. Installed Button.vue.d.ts has emphasis\|tone\|size\|iconOnly\|loading and no variant. meta-390-light buttons[0] (Sort users) shows attrs variant="ghost" next to data-emphasis="secondary", 28x28, bg oklab(.9156…/0.52). Amendments: (1) add :75 Retry (variant="outline") to the site list; (2) the palette-row Feature/Delete buttons at :183-200 pass no emphasis at all, so they also rest as secondary capsules (the trash button's hover:text-destructive quieting has no quiet base); (3) glass HEAD's DEV warning is at Button.vue:127-140, not ~95-113. Badge variant="secondary" IS a valid glass 7 prop, so Badges are not affected.

#### UIA-V-166 · HIGH · admin-users · AdminListSkeleton is written against a Skeleton API that is not installed: circles render as 4px squares and dark mode shows near-black slabs

- **source** audit #3 · **verdict** AMENDED · **state** loading · **where** admin-users · loading skeleton (refresh, initial, expanded-row)
- **frame** `admin-users/` 1440-light-18-loading-skeleton.png, 1440-light-13-expand-loading.png, 390-dark-18-loading-skeleton.png; meta skeletons.kids r=4px on the rounded-full elements
- **observed** The glass 7 Skeleton takes only `class`. `surface="glass" variant="breath"` land as DOM attrs. `rounded-full` loses to the scoped radius, so the 'swatch' circle and 'action lozenge' render as 4px squares. The certified `--skeleton-glass-bg` ink register is never read, so in dark mode the blocks are --muted near-black slabs on the plate. That is the exact 'featureless slab' utils.css:44-55 claims to have cured.
- **expected + canon** The skeleton shapes should match the content they stand in for. Tokens should be the ones the installed glass version reads. DESIGN.md:384: --radius-media is the Skeleton default and the caller's shape utility wins (HEAD).
- **owner** **GLASS+CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminListSkeleton.vue:13-18 + demo/styles/utils.css:56-60. GLASS: 7.0.0 dist `.skeleton[data-v-cd03d0b0]{border-radius:var(--radius-input);background:var(--muted)}` beats consumer utilities; cured at glass HEAD src/components/skeleton/Skeleton.vue:59-67 (a08143ce lane L, @layer components) · *glass component* Skeleton (src/components/skeleton/Skeleton.vue:59-67) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** GLASS: already cured at HEAD; adopt it with the repin. CONSUMER: until then, drop the dead props, and set the ink through the variable 7.0.0 reads (background via a class using --skeleton-ink) with an explicit rounded-full that wins. Reshape the skeleton to the users row (see the cohesion finding).
- **confirm** CONFIRMED in dark. Installed Skeleton.vue.d.ts takes only class. dist CSS is `.skeleton[data-v-cd03d0b0]{border-radius:var(--radius-input);background:var(--muted)}`, and no dist file reads --skeleton-glass-bg. meta-390-light 18 skeletons.kids have attrs surface/variant and r=4px on rounded-full. 1440-dark-18 shows near-black square slabs. Amendment: in LIGHT the failure is the opposite. In 1440-light-13 the blocks are near-white --muted slabs on the pink plate, low-contrast and ghostly, not dark. So the certified ink register fails in both schemes, not only dark. The --skeleton-shimmer-tint seam is also unread: the dist sheen hard-codes foreground 10%.

#### UIA-V-167 · HIGH · admin-users · Row focus ring is clipped by the row wrapper's overflow-hidden (invisible at 390)

- **source** audit #4 · **verdict** CONFIRMED · **state** focus · **where** admin-users · populated · keyboard focus on a disclosure row
- **frame** `admin-users/` 1440-light-12-row-focus.png (only the top edge of the ring shows), 390-light-12-row-focus.png (no ring at all); meta focus.boxShadow '… rgb(28,25,23) 0 0 0 2px'
- **observed** The row's 2px outer ring is painted outside its box. The parent `rounded-md border overflow-hidden` clips it, so a keyboard user sees only a faint bg tint, or at 1440 a hairline on the top edge.
- **expected + canon** Focus is visible (WCAG 2.4.7). glass `focus-ring` utility and control conventions.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:85 (wrapper `overflow-hidden`) clipping :99 (`focus-visible:ring-2`)
- **fix shape** Move the ring onto the wrapper (`:has(:focus-visible)` or focus-within), or use an inset ring (ring-inset), or drop overflow-hidden (it exists only to clip the disclosure's border-t).

#### UIA-V-168 · HIGH · admin-users · A dead backend still shows '0 users' and a header badge '0': the error plate is dressed as an empty roster

- **source** audit #5 · **verdict** CONFIRMED · **state** error · **where** admin-users · load-error
- **frame** `admin-users/` 1440-light-09-load-error.png, 390-light-09-load-error.png, 390-dark-09-load-error.png
- **observed** 'Users (0)' badge + '0 users' count line sit above 'Couldn't load users.' adminUsersTotal defaults to 0, so a first-load failure claims an empty roster. The Prune/Refresh toolbar stays, which duplicates the plate's Retry.
- **expected + canon** The panel's own W5-5 clause (:66-67, 'error ≠ empty — a dead backend never costumes as an empty roster'), extended to the chrome. A-3's badge suppression should cover the error case too.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:8-13 (count gated on !loading && !access only) + demo/palettes/admin/AdminPane.vue:136-138 (badge gated on loadingUsers/usersAccess only)
- **fix shape** Add `&& !loadError` to both count gates, and null the badge when usersLoadError is set. Hide the toolbar's Refresh while the error plate carries Retry.

#### UIA-V-169 · HIGH · admin-users · Token refused: the message is wrong and there is no way forward

- **source** audit #6 · **verdict** CONFIRMED · **state** error/denied · **where** admin-users · token refused (403 wrong token)
- **frame** `admin-users/` 1440-light-08-token-refused.png (real wrong token), 390-light-08-token-refused-403.png, 390-dark-08-token-refused-403.png
- **observed** The plate says 'This admin token is not permitted to do that.' + 'Sign in with an admin token to see the roster.' But a token IS held, and the dock still shows the gold 'admin' pill. There is no action: no Sign out, Change token, or Retry. Disabled Prune empty/Refresh buttons stay on the page, and the search field and ⋮ sort menu remain operable over nothing. At 390 the 30px display-voice heading shouts the refusal over half the card.
- **expected + canon** Per the comment at :52-53, signed-out/denied is its own register and never an operable control set. Denied needs its own copy ('This token is not an admin token') and one recovery action.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:54-60 (EmptyState detail fixed to the signed-out copy), :19/:30 (disabled toolbar kept), demo/palettes/admin/AdminPane.vue:11-22 (search + sort stay live)
- **fix shape** Branch the detail on access.kind ('signed-out' vs 'denied'). Add a single action (Sign out / Use a different token, calling useAdminAuth().logout or opening the dock sign-in). Unmount the toolbar and SearchBar while access is set.

#### UIA-V-170 · HIGH · admin-users · At 390 the destructive 'Delete all palettes' label crowds out the user's identity

- **source** audit #7 · **verdict** CONFIRMED · **state** rest · **where** admin-users · populated · 390
- **frame** `admin-users/` 390-light-10-populated.png, 390-light-02-sort-menu-open.png, 390-dark-10-populated.png; meta slugPills[0].w = 83px
- **observed** The widest element in each row is the destructive command (~137px). The slug is squeezed to 83px: 'l… a1b2c3', 'q… er-fox', 'v…ss-owl'. In 02 the head collapses to nothing and a clipped glyph shows ('\ss-owl'). The one datum an admin needs to tell rows apart is unreadable, while the destructive button gets the space.
- **expected + canon** Hierarchy: primary content dominant (seat criterion 1). The destructive act belongs in secondary, disclosed chrome, never the widest resting element.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:133-143 (labelled xs outline button in the row's action seat) vs :114-118 (slug pill min-w-0)
- **fix shape** Put the per-user actions in a trailing overflow DropdownMenu (Delete all palettes / Delete user), or show the label only at sm and use an icon-only quiet button below. Let the identity take the row (two lines at 390: slug, then a caption like '7 palettes · joined …').

#### UIA-V-171 · HIGH · admin-names · Row action buttons pass a `variant` prop that glass 7 removed, so Approve and Reject render identically

- **source** audit #3 · **verdict** AMENDED · **state** populated Pending/Approved rows · **where** AdminNamesPanel.vue:76-91, 126-137
- **frame** `admin-names/` 1440-light-06-approve-hover.png, 1440-light-07-reject-keyboard-focus.png (manifest: data-emphasis="secondary" on both buttons, dead attribute variant="outline"/"ghost" in the DOM)
- **observed** Both buttons are data-emphasis=secondary glass capsules. The file's own intent ("destructive quieted to ink-at-rest", W5-12 F-8) is lost, and the class overrides (px-2, hover:bg-destructive/10) fight the capsule. The buttons measure 30×28, not square.
- **expected + canon** glass Button API: emphasis (primary\|secondary\|quiet\|text) × tone (neutral\|destructive) × iconOnly (glass-ui src/components/button/Button.vue:39-60). `variant` 'no longer exists and paints nothing' (Button.vue:139-143).
- **owner** **CONSUMER**: CONSUMER — AdminNamesPanel.vue:76 (variant="outline"), :83 and :129 (variant="ghost"), :56 and :108 (Retry, variant="outline")
- **fix shape** Approve: emphasis="secondary" icon-only. Reject/Delete: emphasis="quiet" tone="destructive" icon-only. Retry: emphasis="secondary" size="sm". Drop px-2 and the hover/focus colour classes.
- **confirm** Confirmed. The manifest shows data-emphasis=secondary on both buttons, with a dead variant attribute. Glass Button.vue:39-60 is the emphasis/tone/iconOnly/loading API, and Button.vue:136-143 logs a console.error for the retired variant. Amendment: at 390 the buttons measure 30×44 with radius 9999px (manifest-390-light, frame 05). They are tall vertical ovals, not the 30×28 of the 1440 reading. This matches the owner's 'too rounded pills' complaint. iconOnly fixes the geometry, so it is required, not optional.

#### UIA-V-172 · HIGH · admin-names · Row icon buttons are 30×44 vertical ovals at coarse pointer

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `admin-names/` 390-light-05-pending-populated.png, 390-light-08 (background)
- **observed** manifest-390-light frame 05: buttons w 30, h 44, radius 9999px. These are egg-shaped pills, the owner's 'too rounded' complaint on this page, and they also squeeze the name to about 14 characters before truncation.
- **owner** **CONSUMER**: CONSUMER (missing iconOnly plus the px-2 override on a size=xs capsule); check the glass coarse-pointer min-height too

#### UIA-V-173 · HIGH · admin-audit · Turning a page removes the pager, drops keyboard focus to BODY, and collapses the card to 3 skeletons

- **source** audit #2 · **verdict** AMENDED · **state** paging · **where** admin-audit, entries, Next/Previous page, both viewports and themes
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-entries-p2-1440-light.png, p2-loading-1440-light.png, capture2-log-light.json (entries-p2 active=BODY; paneScroll 1940 -> 359 -> 1940)
- **observed** Clicking Next sets loading=true. The v-else-if loading branch replaces the 20 rows and the PaginationBar with 3 AdminListSkeletons, so the focused Next button unmounts. document.activeElement becomes BODY at both viewports (log entries-p2 and entries-p3-last: act BODY). Card height goes 1940 -> ~359 -> 1940 on every page turn, and the vertically centred card jumps.
- **expected + canon** The pager stays mounted and focused. The retained page stays visible (dimmed/aria-busy) until the next page arrives, which is the per-page stability the W7.425 comment intends. Keyboard paging must not lose its place.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminAuditPanel.vue:48-49 + :80/:105 (the loading branch swaps out rows and PaginationBar); demo/palettes/useAdminAudit.ts:54-75
- **fix shape** Split 'initial load' from 'refetch': show skeletons only when entries is empty. On refetch keep rows + PaginationBar mounted with aria-busy and a subtle dim, and keep focus on the pager button. Optionally scroll the list top into view after the swap.
- **confirm** The mechanism is confirmed in code: useAdminAudit.ts:54 sets loading=true on every nextPage/prevPage, and AdminAuditPanel.vue:48 v-else-if loading replaces the whole template containing the rows and PaginationBar. The log shows active=BODY for entries-p2 and entries-p3-last at both viewports. Amendment: the 1940→359→1940 height sequence was not measured during a page turn. The 359 comes from the separate 6 s initial-load capture (paneScroll [359,359]). The collapse follows from the code, but it is an inference. Addition: the pager's aria-live 'Page n of m' region is unmounted and remounted on each turn. A live region inserted together with its content is usually not announced, so the page change is also silent to screen readers.

#### UIA-V-174 · HIGH · admin-audit · Tabular log drawn as 20 separately bordered cards: large vertical cost and dead width

- **source** audit #3 · **verdict** CONFIRMED · **state** entries · **where** admin-audit, entries, 1440 and 390, light+dark
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-entries-1440-light.png, p2-entries-1440-dark.png, p2-entries-390-light.png
- **observed** Each audit entry is its own 1px-bordered 6px-radius box, 992x73 css px for two short lines. At 1440 about 70% of each box is empty to the right. 20 rows make the pane 1942px tall in a 900px viewport, so only ~7 entries are visible and the pager needs about 1170px of scrolling. The stacked boxes are the clutter the owner flagged ('cluttered', 'not glass-ui idiomatic').
- **expected + canon** An audit log is a table (time / action / actor / target). glass-ui ships DataTable with responsive projection and stable row identity (DESIGN.md:1612-1617). The library idiom is hairline-separated rows in one surface, not a card per record.
- **owner** **GLASS+CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminAuditPanel.vue:80-102; GLASS DataTable exists (glass-ui DESIGN.md:1612-1617) · *glass component* DataTable · *head* open-at-HEAD
- **fix shape** Replace the v-for boxes with glass-ui DataTable: columns Time (tabular-nums) \| Action (sm badge) \| Actor \| Target (mono, truncate), with row separators and no per-row border. At 390 project to two lines per row inside the same table surface. Keep the caller-owned pagination.

#### UIA-V-175 · HIGH · admin-flagged · Button `variant="outline"` / `variant="ghost"` are retired props that paint nothing — every panel button renders as the default secondary capsule; the 'quiet delete' asymmetry (W5-12) is defeated

- **source** audit #1 · **verdict** CONFIRMED · **state** with reports, at rest / hover / keyboard focus · **where** with reports — the row actions, toolbar refresh and pager
- **frame** `admin-flagged/` crop-row-actions-states-1440-light.png; c-reports-1440-light.png; metrics in manifest-1440-light.json
- **observed** Computed: the Dismiss and trash buttons both have data-emphasis=secondary and the same glass-capsule background (oklab .915/.52); the DOM carries a stray `variant="outline"`/`variant="ghost"` attribute. At rest the trash matches the Dismiss capsule in weight. The panel comment at :113-116 says it should be a quiet icon with ink at rest.
- **expected + canon** glass Button 7.0.0 API: `emphasis` (primary\|secondary\|quiet\|text) × `tone` × `size` + `iconOnly` (node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts; glass HEAD Button.vue:127-143 names `variant` as retired, 'exists and paints nothing'). Dismiss should be emphasis=secondary; delete should be emphasis=quiet tone=destructive iconOnly.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/browser/admin/AdminFlaggedPanel.vue:13,55,122,134 and PaginationBar.vue:7,21 (the same dead prop appears in AdminAuditPanel.vue:32, AdminTagsPanel.vue:14 and AdminUsersPanel.vue:15,26)
- **fix shape** Replace variant=outline with emphasis="secondary", and variant=ghost with emphasis="quiet" plus iconOnly. Delete the hand-rolled hover:text-destructive/hover:bg-destructive/10 classes at :135 and let tone=destructive carry the hover ink. Sweep the other admin panels the same way. Also add a vue-tsc/eslint guard, because an unknown prop falls through silently.

#### UIA-V-176 · HIGH · admin-flagged · Offset pagination silently skips reports after an in-place Dismiss/Delete — rows shift up server-side but page 2 still reads offset=20

- **source** audit #2 · **verdict** AMENDED · **state** after resolving N items on page 1, then Next · **where** with reports + PaginationBar
- **frame** `admin-flagged/` i-after-delete-1440-light.png → j-after-dismiss-1440-light.png → k-page2-1440-light.png; manifest adminCalls: DELETE /admin/palettes/neon-knockoff, DELETE /admin/flags/buy-cheap-pixels-now, GET /admin/flagged?limit=20&offset=20
- **observed** removeRow only filters the rows held on the client and decrements total. Page 1 is not refilled. Next then fetches offset=(page-1)*20, but the server has already dropped the N resolved palettes, so items 21..20+N moved onto page 1 and are never shown on either page. The moderator never sees those reports until a manual refresh.
- **expected + canon** A moderation queue never hides pending reports. After a mutation, re-read the current page (or backfill from offset+len) so later pages line up with the server again.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/useAdminFlagged.ts:105-112 (removeRow) and :129-134 (nextPage), offset computed at :84
- **fix shape** After a successful dismiss or delete, call loadFlagged() for the current page instead of removing the row locally, or keep a 'resolved since load' counter and subtract it from the next offset. Keep the existing clamp for an emptied last page.
- **confirm** Dismiss half CONFIRMED. api service/flagged.ts dismissFlags deletes the flags, the server list shrinks, removeRow (useAdminFlagged.ts:105-112) only filters locally, and nextPage reads (page-1)*20, so N reports are skipped. The Delete half is WRONG in mechanism and worse. DELETE /admin/palettes/:slug is a soft delete (service/palettes.ts:1-16 says in so many words that it cascades neither votes nor flags), and the aggregate $lookup (repository/flag.ts:96-103) does not filter deletedAt. A deleted palette keeps its flags, stays in countDistinctPalettes and returns on the next read. It returns with its name and swatches intact (the lookup still matches the soft-deleted row), so it looks like a live report. The client total-- is also wrong for delete. Fix: a CONSUMER re-read of the current page after either act, plus an API fix: cascade-dismiss the flags on admin delete, or add a {deletedAt: null} filter to the $lookup pipeline and count.

#### UIA-V-177 · HIGH · admin-flagged · Flagged row is a hand-rolled 6px bordered box, not a glass surface and not the admin row primitive; radius is off the canon role table

- **source** audit #5 · **verdict** CONFIRMED · **state** with reports · **where** with reports
- **frame** `admin-flagged/` c-reports-1440-light.png; d-pagination-1440-light.png; metrics rows radius=6px
- **observed** Each report is a 992px outlined box with a 6px corner (--radius-md) nested inside the 16px pane card. The rows are flat outline, not a glass tier. The sibling AdminNamesPanel uses AdminListItem.vue, and the loading skeleton imitates AdminListItem's grammar, which the loaded row does not follow.
- **expected + canon** glass DESIGN.md radius roles (:380-391): content card = --radius-card 16px, panel = --radius-panel 12px. Nothing canon sits at 6px for a content holder, and concentric nesting (law 1, Context relay) means the inner radius = outer − inset. The row should be a glass Card at the nested rung (or AdminListItem), matching its siblings.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/browser/admin/AdminFlaggedPanel.vue:71-74 (`rounded-md border border-card-edge overflow-hidden`), :145 (`border-t border-border/50`)
- **fix shape** Build each report as a glass Card (tier=resting or the nested well) with rounded-panel, or extend AdminListItem with a details slot for the flag list. Replace border-border/50 with the card's own separator token.

#### UIA-V-178 · HIGH · admin-flagged · Admin palette delete leaves the report in the moderation queue permanently (API soft-delete does not cascade flags; the flagged $lookup does not exclude deletedAt)

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `admin-flagged/` Source. The palettes.ts docstring states that deleteByPaletteSlug has no caller and nothing cascades. The i-after-delete frame hides the row only on the client. Any refresh or page change brings 'Neon Knockoff' back with its name and swatches, and the moderator cannot tell it was already acted on.
- **observed** Source. The palettes.ts docstring states that deleteByPaletteSlug has no caller and nothing cascades. The i-after-delete frame hides the row only on the client. Any refresh or page change brings 'Neon Knockoff' back with its name and swatches, and the moderator cannot tell it was already acted on.
- **owner** **CONSUMER**: CONSUMER (api) — api/src/modules/admin/service/palettes.ts:1-16,67-95 and api/src/modules/palette/repository/flag.ts:96-113 (plus countDistinctPalettes)

#### UIA-V-179 · HIGH · admin-tags · Tag chip is hand-rolled instead of glass Chip mode="removable"; ✕ is off canon (4px radius, 16px touch target, square focus ring)

- **source** audit #1 · **verdict** CONFIRMED · **state** with tags / chip ✕ focus / touch · **where** admin-tags · with tags, all 4 contexts
- **frame** `admin-tags/` 1440-light-03-with-tags.png, 1440-dark-05-keyboard-focus.png, 390-light-03-with-tags.png (manifest chip.x: w16 h16 radius 4px)
- **observed** Each tag is a <div class="rounded-full border border-card-edge bg-muted/30 px-2.5 py-1 hover:bg-accent/50"> with a bare <button class="p-0.5 rounded-sm …">. The ✕ computes to 16×16 px with a 4px radius, at 390 as well (hasTouch). Its keyboard focus ring is a square box pressed against the tag text ('calm⊠' in 1440-dark-05). The chip body changes colour on hover, which suggests the whole chip is clickable when only the ✕ is. The colours are Tailwind literals, not glass tones.
- **expected + canon** glass-ui/src/components/chip/README.md: `<Chip mode="removable" remove-label=… @remove=…>` is 'the single chip family'. An interactive chip 'takes the 44px touch floor' on a coarse pointer. DESIGN.md:387 gives the tag-delete control the `--radius-control` (stadium) role. The installed glass 7.0.0 already ships ChipMode 'removable' (dist/components/chip/types.d.ts:42).
- **owner** **CONSUMER**: CONSUMER — demo/palettes/browser/admin/AdminTagsPanel.vue:128-148
- **fix shape** Replace the div+button with `<Chip mode="removable" size="sm" :remove-label="`Delete tag ${tag.name}`" @remove="onDeleteClick(tag.name)">`. Drop the hand-written hover, radius and colour classes, and let Chip own the touch floor, focus ring and remove-glyph geometry.

#### UIA-V-180 · HIGH · admin-tags · Long tag names wrap to two lines inside a stadium chip at 390 (multi-line holder at stadium radius)

- **source** audit #2 · **verdict** AMENDED · **state** with tags (long name 'an-exceedingly-long-tag-name-for-truncation') · **where** admin-tags · with tags · 390 light and dark
- **frame** `admin-tags/` 390-light-03-with-tags.png, 390-dark-07-created-notice.png, 390-dark-09-deleted-notice.png, 390-light-08-delete-confirm.png
- **observed** The chip grows to two lines, about 48px tall and full width, and keeps the 9999px radius. The result is a big lozenge with the ✕ floating mid-right: exactly the 'too rounded pill' the owner named.
- **expected + canon** DESIGN.md:385-391: stadium (`--radius-control`/`--radius-pill`) is for single-line controls only; a multi-line holder uses `--radius-field` (16px). A tag chip is by definition a single-line token, so it should stay one line.
- **owner** **GLASS+CONSUMER**: CONSUMER — AdminTagsPanel.vue:128-133 (no truncate or min-w-0 on the chip label) · *glass component* Chip (AdminTagsPanel.vue:128-133) · *head* open-at-HEAD
- **fix shape** Keep the chip to one line: `max-w-full min-w-0`, with the label `truncate` and the full name in `title`/aria (glass Chip should do this once adopted). If glass Chip itself wraps its label, relay a GLASS fix to Chip (nowrap and truncate by default).
- **confirm** The observation is confirmed: in 390-light-03 the long chip is w324 h49 with radius 1.67e7px (fully rounded) and wraps to two lines, and 390-light-08 shows the same. The owner call needs amending to CONSUMER plus GLASS. The finding's conditional has come true: glass Chip does not truncate at HEAD or at 7.0.0. .glass-chip__content only sets min-inline-size:0 (glass-chip.css:69-71); there is no nowrap or ellipsis anywhere in chip/ or glass-chip.css, and chipVariants base has no whitespace class. Adopting Chip will therefore not stop the wrap. Relay a root fix to glass: the pill/removable Chip content should be white-space:nowrap with text-overflow:ellipsis, plus overflow:hidden and max-inline-size:100% on the chip. Until that lands, the consumer puts the full name in the title attribute.

#### UIA-V-181 · HIGH · admin-tags · At 390 the Refresh and Create icon buttons render as 28×44 vertical capsules

- **source** audit #3 · **verdict** AMENDED · **state** all states at phone width · **where** admin-tags · every state · 390 light and dark
- **frame** `admin-tags/` 390-light-03-with-tags.png, 390-dark-07-created-notice.png (manifest refresh/create: w28 h44 radius 9999px)
- **observed** The coarse-pointer 44px floor raises the height, but the width is held at 28px by `px-2` and the xs rung. Both buttons become upright pill-shaped slabs next to 54px-tall inputs, which reads as broken chrome.
- **expected + canon** Icon-only controls should be square/circular at the touch floor (44×44), sized from the Button's own icon rung. At 1440 they are 28×28 circles.
- **owner** **CONSUMER**: CONSUMER — AdminTagsPanel.vue:14 and :66-75 (size="xs" class="px-2" on an icon-only Button); GLASS relay — Button touch floor raises block size only
- **fix shape** Use the glass Button's icon-only shape (size="icon" / icon-only rung) and remove `px-2`, so the floor applies to both axes. Relay to glass: an icon-only Button under the coarse-pointer floor should also get min-inline-size = --touch-target.
- **confirm** The observation is confirmed (manifest refresh/create w28 h44 radius 9999px at 390). The fix and the GLASS relay are wrong. ButtonSize at 7.0.0 is xs\|sm\|md\|lg, so there is no size="icon". The Button has an iconOnly prop (dist Button.vue.d.ts:13). It sets data-icon-only, which makes inline-size equal block-size equal --button-size with padding 0, and data-control-target, which applies the touch floor to BOTH axes (installed dist/styles/utilities/responsive.css: min-block-size and min-inline-size = --touch-target). Glass already does what the relay asks for. Owner is CONSUMER only: add `icon-only` to both Buttons and drop `px-2` (AdminTagsPanel.vue:14, :66-69). No glass relay.

#### UIA-V-182 · HIGH · admin-tags · At 390 the primary name field is narrower than the category field and clips its own placeholder

- **source** audit #4 · **verdict** CONFIRMED · **state** create form, empty · **where** admin-tags · create form · 390 light and dark
- **frame** `admin-tags/` 390-light-03-with-tags.png, 390-dark-07-created-notice.png (nameInput w136 h54, catInput w144 h54)
- **observed** 'Tag name…' shows as 'Tag nam€': the placeholder is cut mid-glyph. The primary field (136px) is smaller than the secondary (144px). The row carries two 54px stadiums plus a 28px capsule, which crowds a 358px content width. The comment at :44-46 says this clipping was fixed, but it is back.
- **expected + canon** Hierarchy: the tag name is the primary input and must dominate. No placeholder clipping at 390 (the S.W5-3/F-7 contract cited in the source).
- **owner** **CONSUMER**: CONSUMER — AdminTagsPanel.vue:43-64 (name flex-1 min-w-0 vs category fixed w-36)
- **fix shape** At <sm, put the name on its own full-width row and the category plus Add on a second row (flex-wrap, or a grid with the name spanning 2 columns). Or give the category `basis-28 shrink` so the name keeps at least 60%.

#### UIA-V-183 · HIGH · not-found · Home CTA passes a retired glass-ui prop: variant="ghost" paints nothing; the button renders as the default filled secondary pill

- **source** audit #1 · **verdict** AMENDED · **state** unknown address / refused admin / all states · **where** NotFoundPane.vue:17 `<Button variant="ghost" size="sm">`
- **frame** `not-found/` 1440-light-01-unknown.png, 1440-dark-01-unknown.png, 390-light-01-unknown.png
- **observed** The installed glass-ui 7.0.0 Button (dist/button-Bu9F4uU6.js) declares only emphasis, tone, size and iconOnly, so there is no `variant` prop. `variant="ghost"` falls through as a DOM attribute and the button paints the default emphasis="secondary": a filled glass stadium (bg oklab(0.916 … / 0.52) light, oklab(0.415 … / 0.63) dark) with a drop shadow. The author's quiet 'ghost' intent is not rendered. glass-ui src Button.vue:127-146 now warns on `variant` in DEV, but the pinned 7.0.0 dist has no such warning, so the app gives no signal. No console error was captured.
- **expected + canon** glass-ui DESIGN.md Button API table (:925-928): emphasis `primary \| secondary \| quiet \| text` carries visual priority. A secondary way out of a dead end should be `quiet` or `text`.
- **owner** **CONSUMER**: CONSUMER — demo/scenes/notfound/NotFoundPane.vue:17 (plus 25 more `variant="ghost"` sites in demo/, e.g. shared/ui/EmptyState.vue, shell/dock/menus/ProfileSection.vue, color-session/ColorSpaceSelector.vue)
- **fix shape** Migrate at the root: replace every `variant="ghost"` in demo/ with `emphasis="quiet"` (or `text`), with no shim. Then re-judge hover (see the hover finding).
- **confirm** Confirmed as captured. At f82daf4a, line 17 read `<Button variant="ghost" size="sm">`, and the installed glass-ui 7.0.0 dist button declares `emphasis` (default secondary) and no `variant`. The filled stadium is visible in 1440-light-01, 1440-dark-06 and 390-light-01. Two amendments. (1) The tree moved: commit 69c0d255 (after the audit) deleted the prop outright. The current line 17 is `<Button size="sm" @click="goHome">`, which is an explicit secondary pill, so the fix now reads 'add emphasis="quiet"' rather than 'replace variant'. (2) The site count is overstated. EmptyState.vue's three `variant="ghost"` are on WatercolorDot, which really has a ghost variant (dist/watercolor-dot.js), and the Select dist also knows `ghost`, so ColorSpaceSelector needs a per-site check. At f82daf4a there were 22 non-WatercolorDot sites, not 25. At HEAD there are 12. Owner is CONSUMER, correct: the glass API is right and the consumer is stale.

#### UIA-V-184 · HIGH · pane-plates · Region ErrorBoundary plate has no surface: a bare EmptyState painted on the atmosphere ground

- **source** audit #2 · **verdict** CONFIRMED · **state** CONFIRMED · **where** all 4 combos · boundary caught
- **frame** `pane-plates/` 1440-dark-09-boundary-caught-mix.png, 1440-light-09-…, 390-light-09-…, 390-dark-09-…
- **observed** Measured background rgba(0,0,0,0), radius 0px. The statement, the mono detail and the Try-again button float on the pink/red atmosphere next to the resting-card picker. The chunk-error plate for the same region sits on a 16px resting card. That makes two error plates with two different grounds. EmptyState.vue:94-100 says --ink-muted is certified against the resting plate, and here it is read on the ground instead.
- **expected + canon** Every occupant of a pane region is a pane-shaped glass Card (radius-card 16px, DESIGN.md:387), the same as the loading and chunk-error plates. One plate idiom for loading, chunk error and render error.
- **owner** **CONSUMER**: CONSUMER demo/color-picker/ErrorBoundary.vue:18-27 (EmptyState rendered straight into the region, no Card; the sibling PaneErrorPlate.vue:19-22 wraps the same EmptyState in Card tier=resting)
- **fix shape** Extract one PanePlate shell (Card tier=resting, full-region fill) and use it in PaneLoadingPlate, PaneErrorPlate and ErrorBoundary's fallback. The boundary adds only its live region and focus target.

#### UIA-V-185 · HIGH · pane-plates · Loading plate is one generic shape at two different sizes, neither shaped like the pane it stands in for

- **source** audit #3 · **verdict** CONFIRMED · **state** CONFIRMED · **where** 1440 + 390 · loading (cold deep link and in-app hop)
- **frame** `pane-plates/` 1440-light-04-loading-deeplink-gradient.png, 1440-dark-04-…, 390-light-04-…, 1440-light-01-loading-hop-mix.png, 390-light-01-…
- **observed** Cold deep link: each plate is a 154px card (390: 150px) floating at viewport mid-height (y=425 of 900), with about 60% dead ground above and below. The real pane then lands at 685px, so the whole layout jumps. In-app hop: the same plate stretches to 685px, with two bars and one line in the top ~130px and ~80% of the card empty. Every pane (Gradient, Palettes, Mix) gets the identical title-bar + line + caption.
- **expected + canon** A loading plate reserves the pane's footprint (block size and header anatomy) so nothing shifts on arrival, and the primary content region keeps its dominance (hierarchy).
- **owner** **CONSUMER**: CONSUMER demo/shell/PaneLoadingPlate.vue:15-24 (the header claim at :6-7 'shaped like the pane it stands in for' is false)
- **fix shape** Size the plate to the region's resting pane height (a shared min-block token), top-align the content, and sketch the pane's own anatomy (title + subtitle + control rows) per pane, or per region role.

## MEDIUM (275)

#### UIA-V-186 · MEDIUM · app-ground-atmosphere · The dark-theme field is near-black by construction: the dark lightness band makes the ground read as black, not as a coloured atmosphere (OA-18)

- **source** audit #5 · **verdict** AMENDED · **severity** HIGH→MEDIUM (confirm) · **state** dark · **where** /#/, /#/palettes, /#/gradient, /#/atmosphere at 1440 + 390
- **frame** `app-ground-atmosphere/` 1440-dark-rest-home.png, 1440-dark-rest-atmosphere.png, 390-dark-rest-home.png; report.json 1440-dark tokens.savedBg = rgb(38,0,27) · rgb(72,0,33) · rgb(110,0,25) · rgb(136,39,0)
- **observed** Ground luminance across all dark frames is 0.12–0.18, and 0.137 was flat for all 10 idle samples. The left third of every dark frame is black-plum, with the first stop at rgb(38,0,27).
- **expected + canon** A dark atmosphere that still reads as hue (the owner's docket rejects 'black'). The plates keep their worst-case contrast floor (DESIGN.md:154) through the glass veil, so the field does not need to be this dark.
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/color-picker/composables/boot/useAtmosphere.ts:188-193 (fieldAtoms injects `lightnessScheme: "dark"` → band L 0.18–0.42 per its own comment :172-176). GLASS if the default band is the fix: deriveAurora dark-scheme band. · *glass component* Aurora deriveAurora dark lightness band · *head* open-at-HEAD
- **fix shape** Lift the dark band through the shipped door, e.g. atoms `lBand: [0.26, 0.48]` in fieldAtoms. Re-derive the ground record (GROUND_RECORD_VERSION bump). If the producer's default dark band is the cause, relay it to glass.
- **confirm** The band is real. useAtmosphere.ts:188-193 injects `lightnessScheme:'dark'`, and its own comment (:181-184) measures L 0.18-0.42. But 1440-dark-rest-home.png does not read as black. It is a hued plum-to-crimson atmosphere, dark on the left third and clearly coloured on the right. The audit's own idle samples found no black at all. Downgrade to MEDIUM ('dark and muddy on the left third, not black'). The black the owner sees reproduces only at the seam (finding 4) and in the failed-field paths (findings 1-3). Lifting the band is a tuning choice, not a defect fix. The owner call (CONSUMER through the atoms door) is correct.

#### UIA-V-187 · MEDIUM · app-ground-atmosphere · The Picker stage replays its entrance on views where it persists, and one card has two animation owners on transform

- **source** audit #7 · **verdict** CONFIRMED · **state** view-switch transition · **where** /#/ ↔ /#/palettes (both have the color-picker stage); /#/atmosphere → /#/
- **frame** `app-ground-atmosphere/` report.json → 1440-light.switches[0].census (+100 ms), 1440-dark.switches[3].census (+50 ms / +654 ms); 1440-light-switch-home-to-palettes-f0.png
- **observed** On / → /palettes the persisting picker runs `field-paint-in` (420 ms) on div.spectrum-picker, plus 4× `stagger-child-in` (300 ms) on the channel-rail items and 4× on the channel strips. It is re-mounted and re-animated even though the pane did not change. On /atmosphere → /: `div.glass-resting.card` has `T:transform@440ms` at +50 ms, then `A:plate-land@440ms` at +654 ms. That is a transition and a keyframe animation both owning transform (the OA-25 'double animated').
- **expected + canon** A pane shared by both views stays still. Each element has one motion owner per property (X.W12.b gate).
- **owner** **CONSUMER**: CONSUMER — demo/color-picker/App.vue region render/keying; demo/color-picker/composables/boot/overture.css (plate-land) vs animations.css vj-enter transform transition
- **fix shape** Key the stage region by pane id, not by view, so a shared pane does not re-mount. Take the card enter transform out of either the vj-enter transition or plate-land.

#### UIA-V-188 · MEDIUM · app-ground-atmosphere · The hand-mounted <canvas> + useAurora re-implements glass <Aurora> and loses its contracts (sizing, fallback, status)

- **source** audit #9 · **verdict** CONFIRMED · **state** all · **where** all routes
- **frame** `app-ground-atmosphere/` 1440-light-rest-home.png; report.json canvas attrs (data-glass-field-canvas, width/height = document)
- **observed** The field is a consumer canvas driven by the lower-level useAurora. Sizing (findings 1 and 2) and failure fallback (finding 3) are the consumer's job and both are broken.
- **expected + canon** glass aurora/README.md:1-28: use the <Aurora :config> primitive, which owns product mode, sizing, parking and fallback.
- **owner** **CONSUMER**: CONSUMER — demo/color-picker/App.vue:17-25 (raw <canvas>) + demo/color-picker/composables/boot/useAtmosphere.ts:195-199 (useAurora on it)
- **fix shape** Mount glass <Aurora class="fixed inset-0" :config :on-init-error>, keeping the `data-glass-field-canvas` stamp (ask glass to forward it if needed). Keep only the palette and atoms derivation in the consumer.

#### UIA-V-189 · MEDIUM · app-ground-atmosphere · Error state in a scene region: fallback text sits directly on the field (no glass plate) with a square browser-default blue focus outline

- **source** audit #10 · **verdict** CONFIRMED · **state** error (chunk load failed) · **where** /#/ inspector region (About) at 1440 light
- **frame** `app-ground-atmosphere/` 1440-light-rest-home.png (x 728–1242 blue square-cornered outline; heading, mono error text and 'Try again' on the bare field)
- **observed** The boundary fills the region with no card surface. Programmatic focus draws a 2 px blue rectangle with square corners, next to 16 px-rounded glass cards. The raw module URL is shown in mono. (Trigger here: a Vite 504 Outdated Optimize Dep; the same state happens in production after a deploy.)
- **expected + canon** The fallback sits inside the region's glass card (--radius-card 16 px, DESIGN.md:385-391 role table). Focus uses the app's focus-ring.css, shown only on :focus-visible or suppressed for script focus on a tabindex=-1 region.
- **owner** **CONSUMER**: CONSUMER — demo/color-picker/ErrorBoundary.vue:24-26 (tabindex=-1 plate) + :102 (programmatic focus)
- **fix shape** Wrap the fallback in the glass card or Surface (resting tier) and add `outline: none` for the script-focus target (keeping the focus-visible ring). Hide the module URL behind a details or copy affordance.

#### UIA-V-190 · MEDIUM · app-ground-atmosphere · In dark, all nine per-view accents collapse to near-white, so the hue step is invisible

- **source** audit #11 · **verdict** AMENDED · **state** dark, per-view accent · **where** all 9 views, 1440 + 390
- **frame** `app-ground-atmosphere/` report.json 1440-dark.views (/ oklch(0.958 0.021 9.8) … /gradient oklch(0.958 0.021 249.8) … /extract oklch(0.958 0.08 129.8))
- **observed** The dark solve pushes every accent to L 0.958 with chroma 0.02–0.08. Palettes, gradient, atmosphere and home are all about 0.02 C, which reads as white. The per-view identity exists only in light (L 0.471, C 0.08–0.19).
- **expected + canon** viewSchema.ts:129-140: the per-view hue rotation is a visible identity in both schemes.
- **owner** **CONSUMER**: CONSUMER — demo/color-picker/composables/boot/useViewAccents.ts (the contrast solve lands at L≈0.958)
- **fix shape** In dark, solve for the lowest L that clears 3:1 against the dock plate, with a chroma floor of about 0.08 (the solve's own 'low-C floor'), instead of maximising L.
- **confirm** The data holds: 390-dark /palettes has accentView oklch(0.958 0.023 49.8). The attribution is off. The input axis itself, accentLive, is already oklch(95.8% 0.021 9.8°) in dark (report tokens.accentLive), so useViewAccents rotates an axis that is already near-white and low in chroma. Its C-floor lifts only some hues (/extract C 0.08). The owner site is the dark derivation of --accent-live, upstream of useViewAccents, plus the C-floor, which should apply to every view and not only to hues that fall out of gamut.

#### UIA-V-191 · MEDIUM · app-ground-atmosphere · 'atmosphere-canvas--arrived' comes from the boot overture, not from renderer status

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `app-ground-atmosphere/` report.json 390-dark / has cls …--arrived while bufH is 8687 and 10,820 init failures are logged. 390-light never gets the class on any route.
- **observed** report.json 390-dark / has cls …--arrived while bufH is 8687 and 10,820 init failures are logged. 390-light never gets the class on any route. The class does not tell you whether the field is painting. Tie it to aurora rendererStatus === 'ready', or run it through the finding-3 fallback.
- **owner** **CONSUMER**: CONSUMER — demo/color-picker/App.vue:19 (`overture.b2.value && 'atmosphere-canvas--arrived'`)

#### UIA-V-192 · MEDIUM · app-ground-atmosphere · A failed field never recovers after navigating to a page short enough to render

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `app-ground-atmosphere/` report.json 390-light: /palettes bufH 1208, /gradient 1555 and /atmosphere 844 are all under 8192, yet none has the arrived class and bgImage is 'none' on all of them. Only 2 init failures are logged, so the substrate latched as fatal on the first oversize.
- **observed** report.json 390-light: /palettes bufH 1208, /gradient 1555 and /atmosphere 844 are all under 8192, yet none has the arrived class and bgImage is 'none' on all of them. Only 2 init failures are logged, so the substrate latched as fatal on the first oversize. The one-shot latch the audit proposes in finding 2 would make this permanent. The failure policy has to tell 'this size cannot work' apart from 'the device cannot work'.
- **owner** **GLASS+CONSUMER**: GLASS (lifecycle re-arm after a size-caused setup failure) + CONSUMER (fallback) · *glass component* Aurora lifecycle re-arm after size-caused setup failure · *head* open-at-HEAD

#### UIA-V-193 · MEDIUM · home-picker · The same channel values are shown twice in one card (hero tuple and channel meters), and the About pane repeats the space selector

- **source** audit #5 · **verdict** CONFIRMED · **state** default · **where** home-picker · default · 1440 (two-region) and 390
- **frame** `home-picker/` 1440-light-01-default.png, 1440-light-02-card.png
- **observed** 92.0%, 88.8 and 20.0 appear in 54px Fraunces in the header and again in Fira mono at the end of each slider row. Only the alpha meter adds new information. At 1440 the adjacent About pane title also hosts a second 'Lab ⌄' selector, so there are two space selectors on screen.
- **expected + canon** CLUTTER: one voice per fact (the file's own 'one voice per fact' comment). Each affordance should earn its place.
- **owner** **CONSUMER**: CONSUMER — demo/picker/controls/ComponentSliders/ComponentSliders.vue:~83 (.channel-meter) with ColorComponentDisplay.vue (hero tuple); About pane title selector (second ColorSpaceSelector host)
- **fix shape** Pick one numeric voice: either the hero tuple stays and the meters go (alpha joins the tuple), or the meters become the editable fields and the header shows the CSS string or swatch. Make the About title a label, not a second selector, when the picker is co-visible.

#### UIA-V-194 · MEDIUM · home-picker · Nested plates are not concentric: the spectrum and console carry 12px inside a 16px card at a 21px inset, and the card publishes --radius-inset 0

- **source** audit #6 · **verdict** CONFIRMED · **state** default · **where** home-picker · card body · all states
- **frame** `home-picker/` 1440-light-02-card.png, 390-light-01-default.png (measure-radius.mjs: card 16px, console 12px at 21px inset, spectrum 12px at 21px inset)
- **observed** The two inner plates use the 12px panel rung, so their corners read nearly as round as the outer card's. Combined with the stadium tracks and rail, everything reads 'too rounded'.
- **expected + canon** DESIGN.md:405 and :423 (§L6 BD.W-CONCENTRIC-RADIUS): a nested card-class surface derives max(--radius-floor, --radius-ctx − --radius-inset), which here is max(4, 16−21) = 4px.
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:231 (border-radius: var(--radius-xl)); ComponentSliders.vue:30 (rounded-panel on a Card, overriding the relay). GLASS — Card does not publish its content padding as --radius-inset (measured --radius-ctx 1rem, --radius-inset 0px) · *glass component* Card · *head* open-at-HEAD
- **fix shape** CardContent publishes --radius-inset equal to its padding (glass Card should do this at the root). The console Card drops rounded-panel and takes the relay. The spectrum plate reads the same relay.

#### UIA-V-195 · MEDIUM · home-picker · Readout value edit has no commit or cancel: Escape does not revert, typed values apply live, and the dock never switches

- **source** audit #7 · **verdict** AMENDED · **state** editing · **where** home-picker · component value in edit · 1440 and 390
- **frame** `home-picker/` 1440-light-09-value-edit.png, 1440-light-10-after-escape.png, 390-light-09-value-edit.png, 1440-light-13-typed-value.png, *-09-edit-dock.json
- **observed** Clicking '88.8' draws a hand-rolled box around the cell. Typing '-40' recolours the whole app on each keystroke. Escape leaves '-40' applied and focus in the field. The Save/Cancel edit controls stay hidden at both viewports (vis=false at 1440; at 390 they report non-zero boxes but the frame shows the nav dock). The edited cell loses the int/frac demotion ('-40' next to the meter's '-40.0').
- **expected + canon** STATES: an edit has visible commit and cancel paths. Escape reverts to the pre-edit snapshot, Enter commits and blurs, and the value is re-formatted on blur. This is the same state machine the palette edit already has.
- **owner** **CONSUMER**: CONSUMER — demo/picker/ColorPicker.vue:193-205 (Enter/Escape handled only when isEditing, i.e. a palette editTarget); ColorComponentDisplay.vue @input (emits on every keystroke); demo/shell/dock/Dock.vue:88 (mobile-edit layer bound only to !isDesktop && editTarget)
- **fix shape** Route readout focus through the existing edit state machine: snapshot on focus, Enter commits, Escape restores, blur formats. Optionally raise the mobile-edit dock layer at <lg for readout edits too.
- **confirm** The behaviour is confirmed: 1440-light-11 still shows the '88.8' edit box persisting after the probe flow, and Escape handling is gated on isEditing (editTarget !== null). The line refs have drifted: the Escape branch is now at ColorPicker.vue:258-259 (isEditing at :281), not :193-205. Dock.vue:88-89 is still correct: mobileEditActive = !isDesktop && !!editTarget, where editTarget is a destructured prop and not a ref, so it is not always-truthy.

#### UIA-V-196 · MEDIUM · home-picker · Out-of-gamut values are shown raw with no visible marker (hsl −1295%, rgb 385.3, hwb −51.1%, hsv v 1.511)

- **source** audit #8 · **verdict** CONFIRMED · **state** open / default · **where** home-picker · space selector open, and default (boot color lab(92% 88.8 20 / 82.7%))
- **frame** `home-picker/` 1440-light-08-space-select-open.png, 390-dark-08-space-select-open.png
- **observed** Specimen rows show 'hsl(346deg -1295% 103.7% / 82.7%)', 'rgb(385.3 143.4 199.6 …)' and 'hwb(346deg 56.23% -51.1% …)' as if they were valid colours. The boot colour is far outside sRGB, but the spectrum handle just pins to the top edge with no gamut cue.
- **expected + canon** STATES: an out-of-gamut state that is visible, not hover-only (a glyph or muted strike, plus the mapped value).
- **owner** **CONSUMER**: CONSUMER — demo/color-session/ColorSpaceSelector.vue:98-108 (the out-of-gamut state exists only as data-out-of-gamut plus a title tooltip); the picker header has no gamut indicator
- **fix shape** Add a visible out-of-gamut badge or glyph on each affected row (and in the header when the live colour is out of gamut). Show the gamut-mapped value alongside the measured one.

#### UIA-V-197 · MEDIUM · home-picker · Space-select specimens are heavy and inconsistent: two-line display-italic cards with a mix of CSS functions and 'hsv · 346 · …' pseudo-syntax

- **source** audit #9 · **verdict** CONFIRMED · **state** open · **where** home-picker · space selector open
- **frame** `home-picker/` 1440-light-08-space-select-open.png, 390-dark-08-space-select-open.png
- **observed** 18 rows, each a ~56px two-line card with a ~36px italic Fraunces name. Only about 4 rows are visible in the 384px scroll port, with scroll chevrons. HSV, Kelvin, ICtCp and Jzazbz use a dotted pseudo-syntax while the other rows are CSS functions. The selected row is a nested bordered card.
- **expected + canon** CLUTTER/COHESION: a menu of single-line rows (DESIGN.md --radius-card popover :387, rows on the overlay-plate option corner), with one caption grammar for every row.
- **owner** **CONSUMER**: CONSUMER — demo/color-session/ColorSpaceSelector.vue:79 (specimen-name font-display italic text-title), :99 (caption); specimen-format.ts (form selection)
- **fix shape** Make the rows single-line (name at body or subheading rung plus a muted caption on the same line), or drop captions for inactive rows. Use one caption grammar, e.g. always the channel tuple.

#### UIA-V-198 · MEDIUM · home-picker · Dark theme: the card reads opaque brown on a saturated red ground

- **source** audit #10 · **verdict** CONFIRMED · **state** default dark · **where** home-picker · default · dark · 1440 and 390
- **frame** `home-picker/` 1440-dark-01-default.png, 390-dark-01-default.png, 1440-dark-02-card.png
- **observed** The card background measures oklab(0.395 0.0097 0.0165 / 0.75): a flat muddy brown slab on a red, textured ground. The inner console is a darker brown plate, and the header has low figure-ground separation.
- **expected + canon** DESIGN.md:17: 'transmissive warm-cream glass … NEVER gray/dark/opaque, both modes'.
- **owner** **GLASS+CONSUMER**: GLASS — the glass-resting dark arm (glass-ui src/styles/tokens/dark-arm-glass.css). CONSUMER — the page-ground derivation from the live colour · *glass component* dark-arm-glass.css (src/styles/tokens/dark-arm-glass.css) · *head* open-at-HEAD
- **fix shape** glass: rebalance the dark resting tier toward transmissive (lower alpha, keep the edge). consumer: temper the dark ground derivation so the glass has a colourful field to transmit.

#### UIA-V-199 · MEDIUM · home-picker · The HeroBlob ornament is a blurred matte ball in light and a blown-out white orb in dark, and it costs header space

- **source** audit #11 · **verdict** CONFIRMED · **state** default (post-overture) · **where** home-picker · after the overture · both viewports and themes
- **frame** `home-picker/` 1440-light-02-card.png, 1440-dark-01-default.png, 390-dark-01-default.png
- **observed** Light: a soft pink sphere with a blurred halo and a satellite nub, which reads out of focus. Dark: a featureless white orb with no interior shading. At 390 it takes ~112px (about 30% of the header width) and forces the title-row reservation, so the header is taller while the ornament does no work.
- **expected + canon** HIERARCHY: an ornament must not compete with or push down the primary content (owner docket: blob).
- **owner** **GLASS+CONSUMER**: GLASS — the Blob engine's hero-scale interior shading (seat.css comment names this producer-root, the P6 rider). CONSUMER — demo/picker/seat.css (.title-row padding-right calc(0.76*fp+0.5rem) and min-height), demo/picker/visual/HeroBlob.vue · *glass component* Blob (seat.css) · *head* open-at-HEAD
- **fix shape** Owner decision. Either route the hero-scale shading fix to glass-ui and shrink the footprint, or retire the ornament from the picker header and reclaim the reservation.

#### UIA-V-200 · MEDIUM · home-picker · Hard offset drop-shadow slab under every card

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `home-picker/` 390-light-01-default.png, 1440-light-11-condensed.png, 1440-dark-01-default.png
- **observed** Each card, picker and About alike, carries a solid dark-brown offset slab about 16px down and right: a flat, brutalist, opaque shadow that fights the 'transmissive glass' material and adds visual weight.
- **owner** **GLASS+CONSUMER**: CONSUMER (or GLASS if it is a Card variant): check the card shadow token · *glass component* Card resting shadow token (--shadow-cartoon-*), ownership unverified · *head* open-at-HEAD

#### UIA-V-201 · MEDIUM · home-picker · Dock at 1440 mixes typefaces and nested pills

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `home-picker/` 1440-dark-01-default.png
- **observed** 'Home' and 'Tools' are serif, while 'Login' is bold mono in its own inner stadium and '@mbabb' is mono in another inner stadium: pills inside the dock pill, in three type voices. This is part of the owner's 'dock pills' docket and was not recorded on this page.
- **owner** **GLASS+CONSUMER**: CONSUMER demo/shell/dock (Login/@mbabb items); GLASS if the dock item variant forces it · *glass component* Dock item faces (DockTrigger / DockControl) · *head* open-at-HEAD

#### UIA-V-202 · MEDIUM · about-pane · The Definition alert renders with an 8 px radius; the consumer's `rounded-card` class loses

- **source** audit #6 · **verdict** CONFIRMED · **state** all · **where** Top of the nutrition label
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-02-oklch-view.png ; capture-meta.json radii ([data-slot=alert] radius 8px, all runs)
- **observed** The computed border-radius is 8px, a value not on the canon role table. The surface is a flat well fill with a border, not the quiet glass tier.
- **expected + canon** DESIGN.md:390: `--radius-card` = 16px (content card). glass Alert wears the card role.
- **owner** **CONSUMER**: CONSUMER demo/scenes/about/ColorNutritionLabel.vue:16 (the `rounded-card` override is dead against installed glass 7.0.0, whose Alert is `rounded-lg border`). The producer is already fixed at glass HEAD: src/components/alert/index.ts:7-12,56 = `glass-quiet … rounded-card`.
- **fix shape** Adopt the glass version that carries the Alert → rounded-card/glass-quiet fix (the I-30 pin), then delete the consumer `rounded-card`/`bg-well`/`border-border/30` overrides so the primitive stands alone.

#### UIA-V-203 · MEDIUM · about-pane · Pane title is out-ranked at 390: 'Detailed Guide' and the guide's h2s are larger than the pane header

- **source** audit #7 · **verdict** CONFIRMED · **state** 390 both themes, and at 1440 as a ladder problem · **where** Whole pane
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/montage-390-light-oklch-seg1-4.png ; capture-meta.json headings
- **observed** At 390 the pane title 'About the color spaces, OKLCh' is 25.9px/400, 'Detailed Guide' is 32.9px/700, markdown h2 is 30px/600, h3 is 24px, and the nutrition section h2s are 20.4px/600. That is three unrelated heading ladders on one card, and the section heading out-ranks the page title.
- **expected + canon** One type ladder from glass tokens (DESIGN.md §type: --type-* / .text-* utilities), with the pane title at the top at every width and sub-sections stepping down.
- **owner** **CONSUMER**: CONSUMER demo/scenes/about/AboutPane.vue:70 (`text-title` h2) + demo/scenes/about/markdown/Markdown.vue:157-182 (raw Tailwind text-4xl/3xl/2xl/xl literals)
- **fix shape** Map the markdown h1–h6 onto the glass semantic utilities (text-heading / text-title / text-subheading) instead of text-4xl…text-base. Demote 'Detailed Guide' to the same rung as the nutrition section heads, or below the PaneHeader title.

#### UIA-V-204 · MEDIUM · about-pane · In dark theme the live-color accent disappears: headings, channel names and space-name marks all turn plain foreground

- **source** audit #8 · **verdict** CONFIRMED · **state** dark, with the default near-white pink color (oklch 95.8% 0.27 9.8) · **where** Nutrition Components row and all guide headings and marks
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/1440-dark-02-oklch-view.png ; 1440-dark-03-oklch-seg3.png ; montage-390-dark-oklch-seg0-3.png (compare 1440-light-03-oklch-seg3.png)
- **observed** In light theme the accent certifies to a crimson that separates h2 from h3 from body text and marks space names. In dark, every accent resolves to near-white, so headings, channel names and cs-name marks are all indistinguishable from body text and the page reads monochrome.
- **expected + canon** The markdown highlighting palette should keep hierarchy in dark theme. The certifier should keep a minimum chroma or hue separation from --foreground, not only a contrast floor.
- **owner** **CONSUMER**: CONSUMER demo/scenes/about/markdown/composables/useMarkdownColors.ts:27-60 (--md-color-h2/h3/accent) + demo/scenes/about/ColorNutritionLabel.vue:203-204 (componentInk)
- **fix shape** When the certified accent's ΔE to --foreground falls under a threshold, pull its lightness down so chroma survives, or fall back to the view accent (--accent-view).

#### UIA-V-205 · MEDIUM · about-pane · The guide repeats the nutrition label's facts and contradicts them

- **source** audit #9 · **verdict** CONFIRMED · **state** oklch (the same pattern appears in the lab guide) · **where** Detailed Guide vs the nutrition label
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-03-oklch-seg0.png vs 1440-light-03-oklch-seg1.png and seg3.png
- **observed** The label says 'Created: 2019'; the guide says 'published by Björn Ottosson in 2020'. The label gives L '0% to 100%' and C '0 to 0.5'; the guide gives L '0 to 1' and C '0 to ~0.4'. The components are listed three times on one card: the label's Components, the guide's Attributes, and the guide's Color Model › Components.
- **expected + canon** Each fact is stated once, and the same everywhere. The label is the facts table (AboutPane.vue:52-60 already makes that claim).
- **owner** **CONSUMER**: CONSUMER assets/docs/oklch.md (Attributes; Color Model › Components; Historical Context) vs demo/color-session/space-catalog.ts:318-345 (oklch info/channels)
- **fix shape** Delete the guide's 'Attributes' and 'Color Model › Components' blocks, or have them reference the label. Reconcile the created year and the C range in one source (the catalog).

#### UIA-V-206 · MEDIUM · about-pane · Hovering one conversion path highlights matching nodes in every path

- **source** audit #10 · **verdict** CONFIRMED · **state** hovering the first chip (OKLCh → OKLab) · **where** Conversion Graph
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-04-graph-hover.png
- **observed** The OKLCh and OKLab nodes light up in all three chips at once. The fill is 4px `rounded` inside a 12px chip, so the radii are not concentric.
- **expected + canon** Only the hovered path lights up. Nested radius follows the concentric-nesting relay (DESIGN.md radius §Context relay, law 1).
- **owner** **CONSUMER**: CONSUMER demo/scenes/about/ColorNutritionLabel.vue:129-136 (`hoveredPath.includes(space)` is evaluated for every chip)
- **fix shape** Key the highlight by path index as well as space, and use a radius token derived from the chip, not bare `rounded`.

#### UIA-V-207 · MEDIUM · about-pane · The same state has two selectors side by side at 1440 (picker title and About title)

- **source** audit #11 · **verdict** CONFIRMED · **state** default · **where** Home view, 1440
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-00-landing.png ; 1440-light-02-oklch-view.png
- **observed** 'Lab ▾' in the picker and 'About the color spaces, Lab ▾' in the inspector are two triggers for one model.selectedColorSpace, 500px apart. Changing either changes both.
- **expected + canon** One control per value on a screen. The duplicate is justified only at 390, where the picker has scrolled away.
- **owner** **CONSUMER**: CONSUMER demo/scenes/about/AboutPane.vue:17-33
- **fix shape** At the dual-pane layout, render the About title's space as static accent text (or a link that scrolls to or focuses the picker selector). Keep the inline selector only for the single-column layout.

#### UIA-V-208 · MEDIUM · about-pane · At 390 the selector dropdown runs past the right edge of the viewport

- **source** audit #12 · **verdict** AMENDED · **state** 390 light (the same geometry in dark) · **where** About header selector, open at 390
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/390-light-10-selector-open-about.png ; probe2-out.json selectorRect (x 16, w 412.6, right 428.6 > 390)
- **observed** The listbox is 413px wide in a 390px viewport. The selected 'Lab' row's border is cut at the right edge, and the popover covers the trigger line it belongs to.
- **expected + canon** A floating popover stays inside the viewport, respecting the 16px gutter.
- **owner** **GLASS**: GLASS SelectContent (item-aligned positioning has no collision padding at narrow width). DESIGN.md:49 says floating surfaces stay in the viewport. Consumer contributor: ColorSpaceSelector.vue:61 `align="start"` with specimen rows. · *glass component* SelectContent (no max-width cap: --reka-select-content-available-width) · *head* open-at-HEAD
- **fix shape** Glass: clamp the SelectContent max-width to the available viewport width minus the collision padding in both position modes. Consumer: let the specimen caption truncate (the SPECIMEN_CHAR_BUDGET already exists) inside a clamped width.
- **confirm** The overflow is real: 390-light-10 and probe2 selectorRect right 428.6 > 390. The mechanism is wrong. Installed glass 7.0.0 SelectContent is already position:'popper' with avoidCollisions and collisionPadding:16 (dist select-BcBAyLXA.js:179-185; confirm probe popper=true); it is not item-aligned. Collision padding shifts the box but cannot shrink it: computed max-width is 'none', and glass HEAD SelectContent.vue:84 only sets min-w-(--overlay-min-width). GLASS owner stands; the fix is to cap max-width at var(--reka-select-content-available-width). At 390 the popper flips above the trigger and covers the title sentence it belongs to (frame 10).

#### UIA-V-209 · MEDIUM · about-pane · The installed glass 7.0.0 listbox corner is --radius-panel (12px), not the popover role

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `about-pane/` docs/tranches/X/audit/ui-evidence/value/about-pane/confirm/1440-light-selector-open-reconfirm.png
- **observed** confirm probe: select-content class has 'rounded-panel border'. DESIGN.md:385-391 gives --radius-card 16px as 'Content card / popover'.
- **owner** **GLASS**: GLASS (already fixed at HEAD: SelectContent.vue:84 rounded-card); consumer adopts via the I-30 pin · *glass component* SelectContent (SelectContent.vue:84) · *head* cured-at-HEAD (adopt via repin)

#### UIA-V-210 · MEDIUM · about-pane · Three gamut policies in one specimen list (unclamped rgb, clamped hex, kelvin for an out-of-gamut color); '·' rows drop alpha

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `about-pane/` docs/tranches/X/audit/ui-evidence/value/about-pane/390-light-10-selector-open-about.png
- **observed** probe2-out.json rows: 'rgb(385.3 …)', 'Hex #ff8fc8d3', 'Kelvin kelvin · 5309', 'hsv · 346 · 0.6279 · 1.511' (no alpha).
- **owner** **CONSUMER**: CONSUMER demo/color-session/format-color (formatSpecimen)

#### UIA-V-211 · MEDIUM · color-space-select · Out-of-gamut conversions (10 of 18 rows) look exactly like in-gamut ones and show impossible numbers

- **source** audit #3 · **verdict** CONFIRMED · **state** open list with an out-of-gamut color (the default lab(92% 88.8 20)) · **where** open list, all viewports and themes
- **frame** `color-space-select/` 1440-light-05-open-listbox.png (hsl(346deg -1295% 103.7%), hwb … -51.1%); 390-light-05-open-listbox.png (rgb(385.3 …)); report-pass2.json outOfGamutRows (10 rows) with inkIn == inkOut
- **observed** rgb, hsl, hsv, hwb, srgb-linear, display-p3, a98-rgb, prophoto-rgb, rec2020 and hex are all flagged out of gamut, but their caption color is identical to in-gamut rows (oklch(0.447 0.0039 34.6) for both in light mode). The only explanation is the `title` tooltip, which needs a mouse hover and never appears on touch. A user sees 'hsl(346deg -1295% …)' presented as a real value.
- **expected + canon** Out-of-gamut values should be marked visibly and consistently with the rest of the app. foundation.css:292 already defines the out-of-gamut ink/paper color pairs for this (R.W3 Lane B1).
- **owner** **CONSUMER**: CONSUMER demo/color-session/ColorSpaceSelector.vue:101-107 (data-out-of-gamut set but never styled; the only signal is a hover `title`)
- **fix shape** Style `.specimen-caption[data-out-of-gamut=true]` with the existing gamut ink token and add a small visible marker (glyph or tag) that also has an accessible name, instead of relying on `title` alone.

#### UIA-V-212 · MEDIUM · color-space-select · Every row shows the same swatch, and hiding the check mark leaves the selected space hard to spot

- **source** audit #4 · **verdict** CONFIRMED · **state** selected vs highlighted row · **where** open list, item hover and reopened list
- **frame** `color-space-select/` 1440-dark-06-open-item-hover.png (hover ring on HSV, the selected Lab row marked only by a brighter dot); 1440-light-10-reopen-selected.png; 1440-light-05-open-listbox.png (idle dots are almost invisible, pink on pink)
- **observed** All 18 rows show the same live color in a 14px watercolor dot, so the dot says nothing about the row. The glass-ui selection dot is turned off (`hide-indicator`). Selection is shown only by the dot going from 35% to full opacity. When the list opens, the selected row and the highlighted row are the same one, so the highlight ring stands in for selection. Once the pointer or keyboard moves away, the selected row is barely distinguishable, especially in light mode where a pale pink dot at 35% sits on a pink panel.
- **expected + canon** The glass-ui select has a selection indicator (SelectItem.vue:79-82: a dot at start-2). Selected and highlighted should look different in both themes, and repeated decoration that carries no meaning is clutter under the §0bl ruling.
- **owner** **CONSUMER**: CONSUMER demo/color-session/ColorSpaceSelector.vue:66 (`hide-indicator`) + :88-96 (WatercolorDot with the same `cssColor` on every row) + :336-337 (idle opacity 0.35)
- **fix shape** Turn the glass-ui indicator back on (drop `hide-indicator`) and remove the 18 identical swatches, or keep one swatch on the selected row only. If a color cue is wanted per row, show each space's own gamut or ramp preview, as MixConfigBar does with PreviewRamp.

#### UIA-V-213 · MEDIUM · color-space-select · The select list uses the 12px panel corner, not the 16px popover corner in the canon table

- **source** audit #5 · **verdict** AMENDED · **state** open list · **where** open list, all hosts, viewports and themes
- **frame** `color-space-select/` 1440-light-05-open-listbox.png; report.json listbox.contentRadius '12px', itemRadius '8px'
- **observed** The list's corner radius is 12px (`--radius-panel`) and the rows are 8px.
- **expected + canon** glass-ui DESIGN.md:387 gives a content card or popover `--radius-card` = 16px. `--radius-panel` (12px, :389) is for panels, configurators and the Command panel. A select list is a popover.
- **owner** **GLASS**: GLASS SelectContent (consumed 7.0.0 dist select-*.js: `rounded-panel`); already `rounded-card` at glass-ui HEAD src/components/select/SelectContent.vue:78 — consumer adoption pending · *glass component* SelectContent (src/components/select/SelectContent.vue:78) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** No producer change needed: glass-ui HEAD already uses rounded-card. value.js needs to move to the glass-ui 8/9 release (I-30) that ships it. Then confirm the row corner follows the 16px card, since the row radius comes from the list's radius and inset in overlay-plate.css.
- **confirm** Confirmed. The consumed dist select-BcBAyLXA.js:198 uses `rounded-panel`, and report radius is 12px. DESIGN.md:387 assigns --radius-card 16px to 'Content card / popover', and :389 assigns --radius-panel to panel/configurator/Command. Glass HEAD already uses `rounded-card`, so this is consumer adoption of a glass release and needs no new producer fix. Amendment: the HEAD line is SelectContent.vue:84, not :78.

#### UIA-V-214 · MEDIUM · color-space-select · The trigger passes `variant="ghost"`, which glass-ui HEAD has removed

- **source** audit #6 · **verdict** CONFIRMED · **state** closed trigger · **where** closed trigger, picker header and About host
- **frame** `color-space-select/` 1440-light-02-closed-trigger.png; p2-1440-dark-16-about-closed.png; report.json trigger {bg: transparent, radius: 9999px}
- **observed** On 7.0.0 the ghost variant makes the trigger a bare italic title with a caret: transparent background, but still radius 9999px. glass-ui HEAD drops ghost and always adds `control-surface glass-control-edge glass-capsule-hover h-(--control-h-md)`. On the next glass upgrade, the 53px title will turn into a 36-40px capsule with a background and edge, which is exactly the kind of overly round pill the owner flagged.
- **expected + canon** A consumer should not rely on a variant the producer has removed. HEAD's own note says a picker with no edge is not a picker. If a bare title-as-trigger is the intended value.js design, glass-ui should offer it as a named primitive.
- **owner** **GLASS+CONSUMER**: CONSUMER demo/color-session/ColorSpaceSelector.vue:39 vs GLASS SelectTrigger (glass-ui HEAD src/components/select/SelectTrigger.vue:20-24: ghost and size=sm 'gone with no alias') · *glass component* SelectTrigger (src/components/select/SelectTrigger.vue:20-24) · *head* open-at-HEAD
- **fix shape** Relay to the glass-ui session: decide whether a title-style Select trigger (display type, no surface, caret only) is a supported glass-ui primitive (e.g. a `SelectTitleTrigger` or `bare` register). If it is, ship it and have value.js use it. If not, restyle the picker header to use the standard trigger. Until then, pin the scoped reset on `.space-trigger` so the upgrade cannot silently add the capsule.

#### UIA-V-215 · MEDIUM · dock-main · Admin identity is a hand-rolled, inert .slug-pill that looks like a button and has no exit path

- **source** audit #9 · **verdict** AMENDED · **state** admin mode · **where** 1440, admin-authenticated (admin views and picker)
- **frame** `dock-main/` d-light-21-admin-dock.png, d-dark-21-admin-dock.png, d-light-24-admin-auth-picker-dock.png, probe-2.json.adminPill
- **observed** A <span> with no role and no tabindex, computed radius 1.67772e+07px (the rounded-full literal, not a token) and a 1px gold border. It reads exactly like the interactive stadium controls beside it but does nothing. Gold #D4AF37 text on the pink light ground is low contrast. On desktop, admin-without-slug has no logout/exit row anywhere in the dock.
- **expected + canon** A status label is a glass Badge (DESIGN.md:392 --radius-badge), visibly not a control. Identity actions (logout / back to app) live in a menu.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/menus/ProfileSection.vue:113-118 + demo/styles/foundation.css:633-635 (`.slug-pill { @apply … rounded-full border }`)
- **fix shape** Render admin identity as glass <Badge> (gold tone) inside the @mbabb menu header, with an 'Exit admin / Logout' row. Retire the dock-level span.
- **confirm** Confirmed: probe-2.json adminPill is a SPAN with role=null and tabindex=null, and foundation.css:633-634 has `.slug-pill{@apply … rounded-full border}` (the pill is at ProfileSection.vue:114 at HEAD). The amendment is to the fix rationale. DESIGN.md --radius-badge resolves to var(--radius-pill), a STADIUM, so moving to a Badge does not change the rounding. It only replaces the rounded-full literal with the canon token and moves the label to a non-control primitive. I did not independently probe the 'no logout row' claim.

#### UIA-V-216 · MEDIUM · dock-main · View-select menu shows no current-view selection state

- **source** audit #10 · **verdict** CONFIRMED · **state** view-select open (selected) · **where** 1440/390, light/dark, user and admin lists
- **frame** `dock-main/` d-light-06-view-select-open.png, m-dark-04-view-select-open.png, d-dark-22-admin-view-select.png
- **observed** The current view (Home; Users in admin) is painted identically to every other row. The 'producer glass-quiet highlighted-on-open row' the comment at :99-106 relies on is not visible in any frame.
- **expected + canon** Selected state present and consistent (audit axis STATES). The glass Select family ships an item indicator for exactly this.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/DockViewSelect.vue:92-98 (`hide-indicator` + the retired weight marker; nothing replaces them)
- **fix shape** Drop hide-indicator (use the glass check indicator), or style [aria-selected=true]/[data-state=checked] with the glass quiet tint. Keep weight 400.

#### UIA-V-217 · MEDIUM · dock-main · Two dock menus, two type voices, misaligned icon column

- **source** audit #11 · **verdict** CONFIRMED · **state** menus open · **where** 1440/390
- **frame** `dock-main/` d-light-06-view-select-open.png vs d-dark-07-mbabb-menu-open.png, m-light-03-menu-open.png
- **observed** View-select rows are serif display. @mbabb/mobile menu rows are sans, with a mono '@mbabb' plus an italic serif caption in the header. The Dark mode icon is w-4 while its siblings are w-3.5, so its label starts ~3px right of the others.
- **expected + canon** One menu-row recipe across the dock's popovers (COHESION axis).
- **owner** **CONSUMER**: CONSUMER — ProfileSection.vue:162-197 / MobileMenuDropdown.vue (text-small sans rows, w-3.5 icons, Dark-mode row w-4 at ProfileSection.vue:193-194) vs DockViewSelect.vue:90-118 (Fraunces display rows, w-4 icons)
- **fix shape** Share one row class (font, icon size, gap) across all dock menus; normalise the Dark mode glyph to the row icon size.

#### UIA-V-218 · MEDIUM · dock-main · DockStatusLamp at 390 is an unlabelled lozenge: display:none strips its label from the accessibility tree, and it hand-rolls a status dot

- **source** audit #12 · **verdict** CONFIRMED · **state** error/offline status · **where** 390 and 1440, backend offline
- **frame** `dock-main/` m-dark-31-lamp-band.png, m-light-30-lamp-offline-page.png, d-light-31-lamp-band.png, probe-2.json.lamp390Aria, capture-lamp-meta.json
- **observed** At 390 the ARIA snapshot is '- status' with no name. The comment says the label stays in the accessibility tree ('visually-hidden, not v-if'd'), but display:none removes it. Visually it is a 26x18 open-ring capsule floating at the band edge with no meaning. At 1440 it reads fine: small-caps 'BACKEND OFFLINE — SAVED LOCALLY'. Its radius, dot and pulse are hand-rolled with literal fallbacks (oklch(0.58 0.19 25)).
- **expected + canon** The status keeps an accessible name at every width. The status mark is the glass StatusDot (distinct silhouette per state, forced-colour safe).
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/DockStatusLamp.vue:64-74 (`.lamp-label{display:none}` below 1024) and :43-107 (hand-rolled pill + dot + pulse); glass 7.0.0 ships StatusDot (dist status-dot.js; README 'the one compact status-and-liveness mark')
- **fix shape** Use sr-only (not display:none) below lg. Replace .lamp-dot and its pulse with <StatusDot state="offline\|error" :label=…>. Drop the literal colour fallbacks.

#### UIA-V-219 · MEDIUM · dock-main · Dock pill rounding (owner docket): the dock radii are ON canon; the 'too rounded' read comes from nested filled capsules of mismatched height

- **source** audit #13 · **verdict** AMENDED · **state** dock pills rounding · **where** 1440/390
- **frame** `dock-main/` d-light-02-dock-expanded.png, d-dark-02-dock-expanded.png, capture-meta.json radii['d-light-expanded']
- **observed** Measured: · Plate: 471x62 at 9999px. · Triggers: 107x32 and 105x32 at 9999px. · Login/@mbabb: 86x28 and 77x28 at 9999px, filled. · Admin pill: 68x29 at 1.67e7px (literal). · 390 kebab: 40x32 at 9999px. Every dock control is single-line, so stadium is the canon role. None of these should go 'card-like'. The over-rounded impression comes from the three stacked stadium heights (62/32/28) and the filled 28px capsules floating inside the 62px plate. The only genuinely off-canon radius in this seat is the mid-collapse ~8px square (GLASS).
- **expected + canon** Stadium for dock and single-line controls (canon). The owner's 'more card-like' ruling applies to the multi-line smooth/bouncy holders (--radius-field 16px, DESIGN.md:386), which is another seat, routed to glass.
- **owner** **GLASS+CONSUMER**: CONSUMER (the filled-capsule faces, ProfileSection.vue:59-160) + GLASS (mid-morph square, see the collapse-morph finding); canon DESIGN.md:385 --radius-control stadium for single-line controls, :393 --radius-dock stadium, :397-405 context relay (--radius-ctx/--radius-inset) · *glass component* Dock radius canon (DESIGN.md:385/:393 stadium) + dock collapse morph · *head* open-at-HEAD
- **fix shape** Do NOT re-radius the dock. Remove the filled capsules (the retired-variant finding) so one control height (32) sits concentrically in the plate. Put the admin label on --radius-badge (DESIGN.md:392), not the rounded-full literal. Record in the X-ALL-BK letter that the dock is the stadium role, so the glass-side 'card-like' change does not leak into DockControl or DockTrigger.
- **confirm** The core call holds against DESIGN.md: --radius-control and --radius-dock are stadium, so the dock must not go card-like, and the ruling targets --radius-field (16px) multi-line holders. capture-meta confirms 471x62, 107x32, 105x32, 86x28 and 77x28, all at 9999px. Two amendments. First, --radius-badge is itself stadium, so the Badge move is tokenization, not de-rounding. Second, the only 4px radii in the dock row are the ActionButtons (capture-meta 'action-button-wrapper' radius 4px, 32x32), an under-rounded outlier inside a stadium row. That belongs in this rounding summary beside the mid-collapse square.

#### UIA-V-220 · MEDIUM · dock-main · View-select list is height-clipped at 1440x900: Atmosphere and Blob sit below a fade with no visible scroll affordance

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `dock-main/` d-light-06-view-select-open.png
- **observed** The listbox shows 7 rows (Home…Gradient), and the Gradient row fades out at the bottom edge. viewSchema.ts:212-225 defines 2 more user views (Atmosphere, Blob) that are not visible, even though the 900px viewport has plenty of room below the menu.
- **expected + canon** A 9-item nav list fits without scrolling at desktop height, or it shows an explicit scroll affordance (glass Select scroll buttons).
- **owner** **GLASS+CONSUMER**: CONSUMER (DockViewSelect content max-height) or GLASS (the Select viewport fade/scroll mask). Needs a probe of the SelectViewport scrollHeight to assign. · *glass component* SelectViewport fade / scroll mask · *head* open-at-HEAD
- **fix shape** Probe SelectViewport scrollHeight vs clientHeight. Raise or remove the max-height at lg, or use the glass SelectScrollDownButton.

#### UIA-V-221 · MEDIUM · dock-view-select · Mouse hover paints the keyboard focus ring on menu rows

- **source** audit #3 · **verdict** AMENDED · **state** hover · **where** both lists at 1440 (fine pointer), both themes
- **frame** `dock-view-select/` admin-1440-light-04-admin-hover.png (Audit Log), user-1440-light-02-hover.png
- **observed** rules.mjs: the hovered row matches :focus-visible (reka focuses the row programmatically on pointermove). It paints box-shadow '0 0 0 2px accent/.3, 0 0 8px accent/.15' on top of the hover fill, so a mouse hover looks like a keyboard-focused control.
- **expected + canon** menu.css:66: pointer hover gets fill and lift only. The focus ring is for keyboard navigation (base.css:244).
- **owner** **GLASS**: GLASS select/SelectItem, _shared/menu (menu.css:66 hover = fill + lift) with utilities/base.css:244 (.interactive-item:focus-visible) · *glass component* _shared/menu/menu.css (:focus-visible ring on pointer-driven focus) · *head* open-at-HEAD
- **fix shape** At the glass root, do not paint the focus-visible ring on .glass-menu-row when reka's highlight came from the pointer (scope the ring to keyboard modality inside reka-managed lists). Relay to the glass-ui session.
- **confirm** The defect is confirmed: admin-1440-light-04-admin-hover.png shows Audit Log with fill and a pink ring. The citation needs fixing. The accent box-shadow ring comes from the INSTALLED 7.0.0 dist (dist/styles/utilities/base.css: .interactive-item:focus-visible{box-shadow:var(--focus-ring-shadow)}). glass HEAD base.css:244 is now an OUTLINE in foreground ink, not the accent box-shadow the finding quotes. HEAD menu.css still has no :focus-visible suppression for .glass-menu-row, so reka's programmatic focus on pointermove will still draw a ring at HEAD, in outline form. Owner: GLASS, correct. Relay should cite the HEAD outline rule, not the 7.0.0 shadow.

#### UIA-V-222 · MEDIUM · dock-view-select · Two rows lit at once when the keyboard moves the highlight away from the pointer

- **source** audit #4 · **verdict** CONFIRMED · **state** hover plus keyboard · **where** user list at 1440
- **frame** `dock-view-select/` user-1440-light-03-kbd.png (Extract keeps the hover fill while Mix gets the highlight and ring)
- **observed** After ArrowDown with the mouse resting on a row, the row under the pointer keeps its :hover fill and lift, and the keyboard target gets fill plus ring. Two rows look active.
- **expected + canon** A single active row. reka's data-highlighted already follows the pointer.
- **owner** **GLASS**: GLASS _shared/menu/menu.css:66 (the :hover rule is separate from [data-highlighted]; glass HEAD still has it) · *glass component* menu.css (menu.css:66) · *head* open-at-HEAD
- **fix shape** In reka-managed menu rows, paint hover through [data-highlighted] only and drop the bare :hover rule. Relay to glass-ui.

#### UIA-V-223 · MEDIUM · dock-view-select · Popover radius is 12px (panel step); canon says a popover is --radius-card 16px

- **source** audit #5 · **verdict** CONFIRMED · **state** open · **where** every open state
- **frame** `dock-view-select/` user-1440-light-01-open.png, admin-1440-dark-03-admin-open.png
- **observed** tokens.mjs: the content class is 'rounded-panel … glass-floating glass-field-port' and computes to 12px, although --radius-card resolves to 1rem.
- **expected + canon** DESIGN.md:387 --radius-card = 16px 'Content card / popover'. DESIGN.md:389 reserves --radius-panel (12px) for panel, configurator and Command.
- **owner** **CONSUMER**: CONSUMER package.json:88 (glass-ui pinned to ^7.0.0; 7.0.0 installed). Glass HEAD already has the fix: glass-ui src/components/select/SelectContent.vue:84 uses rounded-card
- **fix shape** Adopt the current glass-ui, which is 10.0.1 at HEAD; its SelectContent is rounded-card. Do not override the radius locally.

#### UIA-V-224 · MEDIUM · dock-view-select · At 390 the menu text grows to 21px, 1.5x its own trigger and louder than the page's labels

- **source** audit #6 · **verdict** AMENDED · **state** open · **where** both lists at 390 (coarse pointer), both themes
- **frame** `dock-view-select/` user-390-light-01-open.png, user-390-dark-05-mix-open.png, admin-390-dark-03-admin-open.png
- **observed** --ui-scale is 1.5 on the phone. Rows compute to 21px while the dock trigger computes to 14px. With 44px rows, the list fills 328-381px of an 844px viewport, and 'Generate' and 'Back to app' run to the plate edge. The navigation menu is the loudest type on screen.
- **expected + canon** A touch target makes the row taller; it should not make the glyphs 1.5x. Menu text should stay on the small step, the same as the trigger (hierarchy).
- **owner** **GLASS**: GLASS styles/tokens/sizing.css:35 (--control-text = --type-small x --ui-scale) feeding --dropdown-text:62 and text-dropdown in rowClass.ts · *glass component* sizing.css (styles/tokens/sizing.css:35) · *head* open-at-HEAD
- **fix shape** Glass root: apply --ui-scale to row block-size and padding, not to --dropdown-text. Relay to glass-ui.
- **confirm** 21px rows (14px x --ui-scale 1.5, light-dark.css:19) are confirmed in the probe and in user-390-dark-05-mix-open.png. Drop the '1.5x its own trigger' comparison. At 390 the trigger is icon-only (DockViewSelect.vue:87 SelectValue v-if=isDesktop), so its 14px font-size is not visible type. Compare the rows with the page's body text instead. The GLASS owner call is stronger than the audit says. glass HEAD sizing.css:41 states 'A 44px touch target needs 44px of BOX (--touch-target), never a 21px label', yet :62 sets --dropdown-text: var(--control-text) = --type-small x --ui-scale. Glass contradicts its own rule, so fix it at the root.

#### UIA-V-225 · MEDIUM · dock-view-select · Desktop rows use the 44px touch target, and the consumer adds its own padding

- **source** audit #7 · **verdict** CONFIRMED · **state** open · **where** 1440, both lists
- **frame** `dock-view-select/` user-1440-light-01-open.png, admin-1440-light-01-open.png
- **observed** Each of the 7 user rows is 44px tall with 16.4px text, making a 328px plate. The admin plate is 381px against a 384px max-height. The spacing is airy and tall for a 7-item nav, and the row padding is a literal set in the consumer.
- **expected + canon** On a fine pointer a row should be on the 2rem density step. Consumer rows should not restate producer padding (glass-ui first; tokens, not literals).
- **owner** **GLASS+CONSUMER**: GLASS _shared/menu/menu.css:12 (min-block-size: max(2rem, var(--touch-target, 2.75rem)) on a fine pointer). CONSUMER DockViewSelect.vue:96 and :127 (py-1.5 px-2.5 override the producer's py-1 px-2) · *glass component* menu.css (menu.css:12) · *head* open-at-HEAD
- **fix shape** Glass: tie the touch-target floor to (pointer: coarse). Consumer: delete the py-1.5 px-2.5 overrides.

#### UIA-V-226 · MEDIUM · dock-view-select · Hand-rolled separator instead of glass SelectSeparator

- **source** audit #8 · **verdict** CONFIRMED · **state** open · **where** user list with the admin token, and the admin list
- **frame** `dock-view-select/` admin-1440-dark-03-admin-open.png, admin-1440-light-01-open.png
- **observed** The divider is a bare div: no role=separator (probe sepRole null), border-border rgb(198,180,159), and it is inset to the row width (rect 515..689).
- **expected + canon** glass SelectSeparator (glass-ui src/components/select/SelectSeparator.vue: glass-menu-divider -mx-1 my-1, bleeding to the plate edge, reka separator semantics). It is already exported from demo/ui/select/index.ts.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/DockViewSelect.vue:123 (<div class="border-t border-border my-1">)
- **fix shape** Replace the div with <SelectSeparator />.

#### UIA-V-227 · MEDIUM · dock-view-select · The admin toggle is a sentinel listbox option, while the dock's gold 'admin' pill looks like a control but does nothing

- **source** audit #9 · **verdict** CONFIRMED · **state** default / mode switch · **where** admin-token sessions, 1440 and 390
- **frame** `dock-view-select/` admin-1440-light-01-open.png (gold 'admin' pill in the dock plus the 'Admin' row in the menu), admin-1440-dark-03-admin-open.png ('Back to app' row), admin-1440-light-06-back.png
- **observed** A mode action is announced as an option of the 'Select view' combobox. The visible gold 'admin' pill looks like a button but is inert. 'Back to app' always goes to picker (useDockAdminMode.ts:46), so the user's previous view is lost. There are two admin affordances: the one that looks clickable does nothing, and the one that works sits in the menu.
- **expected + canon** One admin affordance, placed where the user looks for it, as a real control (glass DockTrigger or Button). The view listbox should contain only views.
- **owner** **CONSUMER**: CONSUMER DockViewSelect.vue:121-141 (value='__admin_toggle__'), useDockAdminMode.ts:41-47 and :66-72, demo/shell/dock/menus/ProfileSection.vue:115 (cursor-default span)
- **fix shape** Make the dock admin pill the toggle and give it aria-pressed. Remove the __admin_toggle__ option and its separator. Remember the last user view when exiting admin mode.

#### UIA-V-228 · MEDIUM · dock-view-select · '@mbabb' identity pill paints a grey rectangle that does not match the pill shape, and admin sessions show two identity pills

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `dock-view-select/` admin-1440-light-01-open.png, admin-1440-light-04-admin-hover.png, user-1440-light-01-open.png
- **observed** The mono '@mbabb' sits on a squared grey fill inside a rounded pill, so it reads as a pill inside a pill. The admin frames show both an 'admin' pill and an '@mbabb' pill. In the user frames, 'Login' and '@mbabb' appear together.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue (slug-pill); outside this seat, route to the dock/profile seat
- **fix shape** One identity control built on glass DockTrigger or Button, with one state voice.

#### UIA-V-229 · MEDIUM · dock-action-bar-color · Hover cards open without being asked: after the Tools click, and again after clicking a seat

- **source** audit #5 · **verdict** AMENDED · **state** layer swap; ActionButton click feedback · **where** /#/ and /#/palettes at 1440x900, light and dark
- **frame** `dock-action-bar-color/` light-d-picker-01-actions.png, dark-d-picker-01-actions.png, probe-tools-Palettes-click1.png, light-d-picker-01b-after-click-copy.png; capture-log.json *-unrequested-card, *-click-card-samples (after clicking Copy, none at 60/200ms, card at 350ms, fully opaque at 800-1200ms)
- **observed** Clicking Tools swaps the layer and leaves 'Copy color' under the resting pointer, so its hover card (title + two-line description) opens over the picker with no hover intent. Clicking a seat plays the pulse and then reopens the same card 350ms later, where it stays until the pointer leaves. The same thing happens in the input arm: ColorInput's hint card opens as soon as the arm swaps in (light-d-picker-06-input-arm.png).
- **expected + canon** A hover preview follows hover intent. It does not open because a layer moved content under a still pointer, and it closes on activation and stays closed until pointerleave, as tooltips do. ActionButton.vue:93 already tries to express this intent.
- **owner** **GLASS+CONSUMER**: GLASS — popover/Popover.vue:18-22,85 (the hover arm reopens while the pointer rests after an activation click; there is no dismiss-on-activate). CONSUMER — ActionButton.vue:79-99 (clears activeHover on click, but the hover arm re-arms 300ms later) · *glass component* Popover (Popover.vue:18-22,85) · *head* open-at-HEAD
- **fix shape** GLASS: add a 'dismiss on activation / require pointer movement after a layer swap' guard to the Popover hover arm, and send it to the glass-ui session. CONSUMER stopgap: suppress the reopen until pointerleave after a click, and ignore pointerenter events caused by a layer swap.
- **confirm** The behaviour is confirmed. light-d-picker-01b-after-click-copy.png and probe-tools-Palettes-click1.png show the 'Copy color' card open, and click-card-samples show none at 60/200ms, op 0.40 at 350ms, op 1 at 800ms. The first cited frame is wrong: light-d-picker-01-actions.png shows NO card, only the Copy seat's hover ink (the card was in the DOM per *-unrequested-card but not yet painted). The mechanism is more specific than 'the hover arm re-arms'. reka HoverCardTrigger.js:48 opens on FOCUS (onFocus → rootContext.onOpen). The click focuses the button at mousedown, the 300ms open-delay timer (ActionButton.vue:8) fires after ActionButton.handleClick has already emitted null (ActionButton.vue:93), and the card opens at about 350ms. Owner split: GLASS Popover.vue:85/98-104 passes reka's focus-open through on the hover arm, where a hover preview should open on pointer intent or keyboard focus-visible, not on pointer-click focus. CONSUMER stopgap: prevent the focus-open on pointer activation. The layer-swap case (card under a still pointer) stays PLAUSIBLE, backed only by the probe-tools frame.

#### UIA-V-230 · MEDIUM · dock-action-bar-color · The Palettes seat shows as selected on /#/blob, where there is no Palettes pane

- **source** audit #6 · **verdict** CONFIRMED · **state** selected · **where** /#/blob, both viewports, both themes
- **frame** `dock-action-bar-color/` light-d-blob-01-actions-dock.png (palette glyph in accent ink); capture-log.json light-d-blob-actions seats color.palettes active:true; viewSchema.ts:218-224 (the blob regions are picker + blob only)
- **observed** On the Blob view the Palettes seat carries the active stroke, as if the palettes pane were open. It also reads active on any non-picker color view and while an edit is open.
- **expected + canon** 'Selected' means the thing is open. The active member (AB-32) has to reflect whether the palettes region is actually mounted.
- **owner** **CONSUMER**: CONSUMER — demo/picker/ColorPicker.vue:326-328 (`paletteActive = currentView !== 'picker' \|\| isEditing`) feeding usePaneRouter.ts:802
- **fix shape** Derive paletteActive from the route's regions (the current view's regions include pane 'palettes'), not from `!== 'picker'`.

#### UIA-V-231 · MEDIUM · dock-action-bar-color · The selected seat is only a stroke colour, and it nearly disappears in dark mode

- **source** audit #7 · **verdict** AMENDED · **state** selected / failed · **where** /#/palettes (and /#/blob), dark theme especially
- **frame** `dock-action-bar-color/` crop-dark-d-picker-08-after-palettes-seat.png, dark-d-palettes-01-actions-dock.png
- **observed** The active seat changes only its stroke to the live accent. In dark mode the accent is near-white against cream glyphs, so the palette icon looks barely different from its neighbours. The failed state uses the same approach (an inline stroke of var(--destructive)).
- **expected + canon** dock README:65-66: `DockControl.active` supplies pressed/selected paint (the .glass-capsule seat, --dock-control-active-bg), so selection reads as glass, not as ink.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/layers/GenericActionBar.vue:81-89 (inline stroke/strokeWidth styles) + ActionButton.vue:30
- **fix shape** Pass action.active to DockControl :active (aria-pressed + capsule). Show the failed state through a glass status treatment (for example a DockStatusLamp or StatusDot), not stroke literals.
- **confirm** 'Nearly disappears' is refuted by the finding's own frame: crop-dark-d-picker-08-after-palettes-seat.png shows the active palette glyph clearly brighter and heavier than its neighbours. The real defect is stronger and different. HOVER and SELECTED share the same paint: an accent stroke, per ActionButton .action-icon:hover stroke var(--hover-color) vs the active inline stroke. probe-tools-Palettes-click1.png shows the hovered Copy seat and the selected Palettes seat inked the same, so they cannot be told apart. No glass seat or aria-pressed is involved (capture-log reads `active` only as data-*). The fix stands: DockControl :active (capsule + aria-pressed, dock README 'Interaction contracts'). CONSUMER.

#### UIA-V-232 · MEDIUM · dock-action-bar-color · While a workbench pane is still loading, its seats say 'not registered in this layout'

- **source** audit #8 · **verdict** AMENDED · **state** loading vs unavailable · **where** /#/mix, /#/gradient and /#/generate after an in-app route change, both viewports
- **frame** `dock-action-bar-color/` dark-d-mix-01-actions.png ('Copy result — unavailable / the Mix pane is not registered in this layout' shown next to the pane's own 'Loading the scene...'); dark-m-generate-01-actions-dock.png (seats at 50%); probe-inapp.json (gradient uuuL for about 4s, then rrr)
- **observed** For about 1-4s after switching to a workbench, every seat is inert at opacity 50%, titled '<verb> — unavailable', and its hover card blames the layout. On a cold load the same seats are ready within 1s (probe-registration.json), so the message is false: nothing is missing from the layout, the pane is only loading.
- **expected + canon** States are complete and truthful: loading is its own state (a skeleton or spinner seat, or the row withheld until registration), and 'unavailable' is kept for real absence.
- **owner** **CONSUMER**: CONSUMER — demo/shell/usePaneRouter.ts:402-409 (SCENE_ABSENT reasons) + readScenePaneTarget :425-434 (no loading state); GenericActionBar.vue:57-73
- **fix shape** Add a `pending` SceneActionState while the lazy pane chunk is resolving (usePaneRouter knows the region is mounting). Render it as a quiet, non-alarming seat and write the copy for users.
- **confirm** The copy is confirmed in dark-d-mix-01-actions.png ('Copy result — unavailable / Unavailable — the Mix pane is not registered in this layout.' next to 'Loading the scene...'). The finding frames this as initial load only. probe-inapp.json shows it is also a regression AFTER ready: 390-generate-5 reads rrr for samples 0-7, uuuL for samples 8-10, then rrr. The seats deregister and re-register mid-session, which points to a pane remount, not only lazy-chunk loading. The fix must cover both: a pending state, plus keeping registration stable across remounts. It is intermittent, not deterministic: probe-inapp 1440-mix-2 and 1440-mix-4 are rrr throughout. CONSUMER.

#### UIA-V-233 · MEDIUM · dock-action-bar-color · The input-arm toggle cycles three modes through one button whose icons don't say what they do

- **source** audit #9 · **verdict** CONFIRMED · **state** actions / input / propose · **where** /#/ at both viewports, actions → input → propose → actions
- **frame** `dock-action-bar-color/` light-d-picker-01-actions-dock.png ('T'), light-d-picker-06-input-arm-dock.png (Tag), light-d-picker-07-arm-next.png / light-m-picker-07-arm-next.png ('⋮' = 'Close propose')
- **observed** One button walks through a hidden 3-state machine. The glyph is a 'T' (Type) for 'Open color input', a tag for 'Propose color name', and a vertical ellipsis for 'Close propose'. The ellipsis normally means 'more options', not 'close'. The layer also has a separate Back arrow, so there are two different exits.
- **expected + canon** Cohesion with the dock's layer grammar: Back (ArrowLeft) is the one exit, and each mode is its own named control, with the mode shown as a selected state (DockControl :active or a glass Tabs strip), not a cycling glyph.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/layers/ActionBarLayer.vue:36-80,154-173
- **fix shape** Replace the cycle with explicit controls: an input toggle (DockControl :active) plus a Propose action shown only inside the input face. Let Back close any sub-mode.

#### UIA-V-234 · MEDIUM · dock-action-bar-color · The dock colour input is an opaque white 10px rectangle inside a stadium dock, and its hover card repeats the value

- **source** audit #10 · **verdict** CONFIRMED · **state** input arm, propose arm · **where** /#/ input arm, both viewports, both themes
- **frame** `dock-action-bar-color/` light-d-picker-06-input-arm.png, light-m-picker-06-input-arm-dock.png, light-m-picker-07-arm-next.png
- **observed** A flat white field with a 10px radius and a hard border inside the glass stadium pill. When the arm opens, its hover card shows the same value three times: in the field, as a mono line in the card, and as the LAB l/a/b/α channel line, plus the 'Enter a color / Any valid CSS color string is accepted' heading.
- **expected + canon** glass DESIGN.md radius table :385-391 says a single-line control uses --radius-control (the stadium), and the glass Input component reads the pill (radius.css:128-137). The hint should add information, not repeat it.
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/shell/dock/ColorInput.vue:3-26 (a hand-rolled contenteditable span, bg-background, rounded-input) and ColorInput.vue:341,356 (--radius-sm); GLASS note: dist still ships --radius-input (10px), but glass src/styles/theme/radius.css:133-137 renames it to --radius-media 'clean-break (no legacy alias)', so `rounded-input` will stop resolving on the next glass bump · *glass component* Input / field radius (styles/theme/radius.css:133-137) · *head* open-at-HEAD
- **fix shape** Build the field on the glass Input (single-line, stadium, glass fill). Cut the hint card down to the parse echo and the gamut note. Replace `rounded-input` now, before the glass rename breaks it.

#### UIA-V-235 · MEDIUM · dock-action-bar-color · The workbench bar can render with Back shifted outside the dock's left edge (bar opened across a colour → workbench route change)

- **source** audit #11 · **verdict** AMENDED · **state** actions layer after a scene swap · **where** 1440x900, light and dark: /#/blob with the bar open → /#/generate, /#/gradient and /#/mix through history/hash navigation
- **frame** `dock-action-bar-color/` dark-d-generate-01-actions-dock.png, light-d-gradient-01-actions-dock.png; capture-log.json light-d-generate-actions (dock x 621.5..818.5, back x 548.5, seat0 x 613.5)
- **observed** The dock shrinks to 197px, but its content stays offset about 73px to the left: Back and the separator are clipped, the first seat is cut in half, and the right cap is empty. Opening the bar fresh on a workbench seats correctly (probe-tools-after-select.json, probe-reopen.json, 3 of 3). The exact trigger is unconfirmed: probe-scene-swap-open.mjs could not run because :9000 stopped answering (PLAUSIBLE).
- **expected + canon** A layer whose content changes re-measures and re-centres inside the dock spring (dock README:67-70).
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/shell/dock/Dock.vue:50-56,204-213 (actionBarLayerActive survives a scene change while the layer's content width changes 326→197); GLASS possibly — DockLayer size-morph keeps the previous layer's offset · *glass component* DockLayer · *head* open-at-HEAD
- **fix shape** Rerun probe-scene-swap-open.mjs once the server is healthy. If it reproduces, re-key the action-bar DockLayer on the scene (or reset actionBarLayerActive on scene change) so the size-morph measures fresh, and send the stale-offset symptom to glass if DockLayer keeps it.
- **confirm** The symptom is real: light-d-generate-01-actions-dock.png (capture-log dock x 621.5, back x 548.5) and dark-d-mix-01-actions.png, where Back and the separator are missing and the dock starts at the trash seat. The stated trigger is REFUTED. probe-swap-1440-blob-generate.png and probe-swap-1440-picker-mix.png, written by probe-scene-swap-open.mjs itself (bar opened, then location.hash changed, no further click), show Back and the separator correctly seated. light-d-generate-00-main-layer.png (capture.mjs:126, before openBar) also shows the bar persisted open across blob→generate and seated correctly. The mis-seat appears only AFTER capture.mjs:50-55 openBar force-clicks 'Toggle action bar' while the bar is already open (the Tools button sits in the inactive layer), so something toggles during or just after the size-morph and leaves a stale offset. Re-scope to a rapid toggle / click-through on the inactive layer interrupting the DockLayer size-morph (PLAUSIBLE). Repro: open the bar on a workbench, then force-click the Tools centre point within about 1s. Owner leans GLASS (DockLayer morph not re-measuring when interrupted) and CONSUMER (the inactive-layer Tools button is not inert while its layer is off-stage).

#### UIA-V-236 · MEDIUM · dock-action-bar-color · The desktop Tools trigger is 32px tall next to 40px DockControls, and its own comment says otherwise

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `dock-action-bar-color/` capture-log light-d-blob-actions toolsBtn 104.5x32 vs back 40x40
- **observed** The comment says the box 'lands at the sibling controls' 2.5rem height', but it measures 32px against 40px siblings. That is a second height register in the main layer, next to the 32px seats of finding 3.
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/shell/dock/ActionBarToggle.vue:82-84,150-158 (the compact + --dock-compact-control-padding override); GLASS for the compact register (icon-button.css:235-240) · *glass component* DockControl (icon-button.css:235-240) · *head* open-at-HEAD
- **fix shape** Use DockControl shape='tab' (a label-bearing face) at the dock control size instead of compact plus a padding override.

#### UIA-V-237 · MEDIUM · dock-action-bar-color · Hover and selected paint are identical on the scene seats

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `dock-action-bar-color/` probe-tools-Palettes-click1.png (the hovered Copy seat and the selected Palettes seat have the same accent ink)
- **observed** Rest→hover and rest→selected both change only the stroke to the same accent, so hover and selected cannot be told apart. This breaks the four-state contract (DESIGN.md:13).
- **owner** **CONSUMER**: CONSUMER — ActionButton.vue:112-115 (.action-icon:hover stroke var(--hover-color)) + GenericActionBar.vue:81-89 (active inline stroke)
- **fix shape** Covered once seats are DockControls (capsule hover vs the --dock-control-active-bg selected seat). Folded into finding 7's amendment and recorded here so it is tracked on its own.

#### UIA-V-238 · MEDIUM · dock-action-bar-color · Scene seats deregister after they were ready (ready → unavailable → ready flicker)

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `dock-action-bar-color/` probe-inapp.json 390-generate-5 (samples 8-10 'uuuL' after 8 samples of 'rrr')
- **observed** After a workbench's seats are ready, they briefly return to unavailable, dimmed to 50% with the 'not registered in this layout' copy, and then recover. Nothing the user did caused it.
- **owner** **CONSUMER**: CONSUMER — demo/shell/usePaneRouter.ts readScenePaneTarget / pane registration lifecycle
- **fix shape** Keep the registration keyed to the region, not to the pane instance lifetime, or hold the last-ready target through a remount.

#### UIA-V-239 · MEDIUM · dock-color-input · The hover popover on a text field carries instructions that belong in the placeholder or description, in three typefaces

- **source** audit #8 · **verdict** CONFIRMED · **state** suggestion popover open · **where** ColorInput.vue:94-110
- **frame** `dock-color-input/` 1440-light-03-hover-popover-open.png, 1440-light-02-input-mode-resting.png
- **observed** 'Enter a color' (display serif, subheading) + 'Any valid CSS color string is accepted.' (serif body, italic 'Any') + mono value + mono echo + amber verdict is three voices in five lines. It opens on 300 ms hover, including when the dock morphs under a stationary pointer, and covers the picker and About pane headings. No suggestions are offered even though the state is called a suggestion popover.
- **expected + canon** Clutter rule: the instruction lives in the placeholder or aria-description, and the preview surface only carries what the field can't (the parse echo). Open on focus or intent, in one voice.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:3-8,94-110 (glass Popover trigger='hover' is sanctioned only as a 'pointer-adaptive hover preview', glass popover/Popover.vue:18-19)
- **fix shape** Move the copy to the placeholder or aria-describedby. Keep a compact echo row (mono) under the field. If a popover stays, make it trigger='click' or focus-anchored, with the title dropped.

#### UIA-V-240 · MEDIUM · dock-color-input · Mode toggle cycles through three states and each icon shows the next state; ⋮ means 'Close'

- **source** audit #9 · **verdict** CONFIRMED · **state** input mode / propose mode · **where** ActionBarLayer.vue:64-80
- **frame** `dock-color-input/` 1440-light-02a-input-open-midflash.png (T), 1440-light-03-hover-popover-open.png (Tag = 'Propose color name'), 1440-light-08-propose-mode-empty.png (⋮ = 'Close propose')
- **observed** One DockControl cycles actions → input → propose → actions. The glyph shows the destination (T, then Tag, then EllipsisVertical), so the current mode is never shown. The vertical ellipsis, which everywhere else means 'more menu', here means 'close'. Propose can only be reached by going through input.
- **expected + canon** Current mode visible (glass DockControl `active`, or a glass Tabs/ToggleGroup segmented 'Color \| Name' inside the arm) plus an explicit close/back affordance. glass dock README: the consumer owns selection state via DockControl.active / useSelectionGroup.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/layers/ActionBarLayer.vue:49-80,159-172
- **fix shape** Split into a segmented mode control (glass ToggleGroup/Tabs, stadium per --radius-tab) and a single close control (X). Retire the cycle and the EllipsisVertical glyph.

#### UIA-V-241 · MEDIUM · dock-color-input · The send arrow has no accessible name and its disabled state looks the same as enabled

- **source** audit #10 · **verdict** CONFIRMED · **state** propose mode empty / after propose / proposing · **where** ColorInput.vue:67-82
- **frame** `dock-color-input/` 1440-light-08-propose-mode-empty.png, 1440-light-11-after-propose-success.png (log send disabled:true opacity '1' label null)
- **observed** An icon-only <button> with no aria-label. When disabled (empty name, or after success) it keeps full opacity and the accent stroke, so it looks clickable. It is hand-seated with a 4px radius on a 24px hit target, below the dock's 44px coarse-pointer floor (dock/README.md 'Interaction contracts').
- **expected + canon** A glass icon button (DockControl or Button size icon) with aria-label 'Apply color' / 'Propose name' and the house disabled register.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:67-82 (buttons without aria-label), :336-347 (.send-btn radius --radius-sm, only cursor changes when disabled)
- **fix shape** Use the glass icon-button primitive seated as the field's trailing slot, add aria-label, and let the btn-interactive disabled opacity apply (it is currently overridden).

#### UIA-V-242 · MEDIUM · dock-color-input · The propose placeholder is pure black (#000), darker than typed text, and gives no context

- **source** audit #11 · **verdict** CONFIRMED · **state** propose mode · **where** ColorInput.vue:322-326
- **frame** `dock-color-input/` 1440-light-08-propose-mode-empty.png (log phColor rgb(0,0,0) vs text rgb(28,25,23))
- **observed** 'propose a name...' (three periods, lower case) is painted rgb(0,0,0), so it reads as entered text. Nothing says which color is being named, that proposals are reviewed, or that a session will be created (session.ensureSession at :234).
- **expected + canon** The placeholder uses the on-glass muted rung (glass dock/styles/search.css: placeholder reads --on-glass-muted, NOT --muted-foreground). A short helper or swatch shows the target color.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:262 (placeholder text), :322-326 (::before color var(--muted-foreground))
- **fix shape** Use a native input placeholder in the glass field seam (--on-glass-muted), write 'Propose a name…', and show a swatch chip of the current color as the field's leading adornment.

#### UIA-V-243 · MEDIUM · dock-color-input · Proposing state: a 14px spinner is the only signal, and the field stays editable with no busy semantics

- **source** audit #12 · **verdict** CONFIRMED · **state** proposing spinner · **where** ColorInput.vue:73
- **frame** `dock-color-input/` 1440-light-10-proposing-spinner.png
- **observed** The arrow swaps to a 14px Loader2. The contenteditable still accepts input, and nothing sets aria-busy or announces status. The About pane beside it shows 'Loading the scene…' at the same time, so two loading idioms sit side by side.
- **expected + canon** Field readonly and aria-busy while submitting, with a status announcement. Use the house spinner or glass progress idiom rather than a bare lucide icon.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:67-75,229-246
- **fix shape** Bind readonly/aria-busy to proposing and use the glass field's pending state. Announce via aria-live.

#### UIA-V-244 · MEDIUM · dock-color-input · One-off motion: scoped @keyframes input-mode-flash and crown-appear, plus a local crossfade shim duplicating glass DockCrossfade

- **source** audit #13 · **verdict** CONFIRMED · **state** input→propose transition / crown · **where** ColorInput.vue:317; ActionBarLayer.vue:91-110
- **frame** `dock-color-input/` 1440-light-08a-propose-midflash.png vs 1440-light-08-propose-mode-empty.png (the flash can't be seen: frames identical)
- **observed** The input-mode-flash (scaleX .97 plus fade over --duration-slow) can't be seen in capture. It is a per-component keyframe outside the vj-morph/vj-celebrate families that the toggle and badge already use. The sub-layer swap re-implements DockCrossfade with a 260 ms setTimeout literal.
- **expected + canon** Owner edict 2026-09-23: NO one-off instances; cohesion across animation views. glass dock README: 'DockCrossfade is the thin controlled face-swap primitive'.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:313-321,370-377; demo/shell/dock/layers/ActionBarLayer.vue:82-129 (local useLayerTransition; its own comment asks glass for a public content-swap composable)
- **fix shape** Delete input-mode-flash and let the arm swap ride DockCrossfade. Move crown-appear into the shared animations.css celebrate family. Relay the public content-swap composable request to the glass session.

#### UIA-V-245 · MEDIUM · dock-color-input · The focus indicator is the user's current color, not a focus register, and it vanishes for pale colors

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `dock-color-input/` 1440-light-04-input-empty-focused-dock.png (focused: a 1px pale-pink hairline only; log row 12 border lab(92 88.8 20 / 0.827))
- **observed** The field removes the outline and signals focus only by recolouring its 1px border to the picked color. With a light or low-alpha color, as here (L 92%, α 0.827), the focused and unfocused field look nearly the same. That fails the glass contract's 'complete focus-visible ring' (dock README :71) and WCAG 2.4.7/1.4.11.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:16 (focus-visible:outline-none), :163-167 (inputStyle borderColor = cssColor on focus)

#### UIA-V-246 · MEDIUM · dock-slug-edit-layer · The slug field is a bare hand-rolled <input>: no field surface, no focus ring, placeholder in full ink

- **source** audit #8 · **verdict** AMENDED (owner split) · **state** empty field / Tab focus / typed · **where** dock slug-edit layer
- **frame** `dock-slug-edit-layer/` 1440-light-02-empty-tab-focus.dock.png (field focused: outline none, box-shadow none), 390-dark-01-empty-field.dock.png vs 390-light-03-typed-slug.dock.png
- **observed** When focused, the field has no ring and no plate; only the caret marks it. The placeholder 'enter slug or token…' renders at the same weight and ink as a typed value (computed ::placeholder rgb(0,0,0) light / rgb(255,255,255) dark against input ink rgb(28,25,23) / rgb(233,230,226)), so empty and filled look alike. The type steps 16.4px at 1440 and 14px at 390.
- **expected + canon** A glass field primitive. On the canon role table a single-line control/field is --radius-control (stadium), with the producer focus ring and a muted placeholder.
- **owner** **GLASS+CONSUMER**: CONSUMER — SlugEditLayer.vue:90-97 (`bg-transparent border-none outline-none`, class literal). The producer idioms exist: glass-ui GlassDock.vue:496-510 `#search` slot / `.dock-search-field` (the tint seam with a ≥4.5:1 field floor) + useDockSearch, and glass SearchBar (which the orphan twin PaletteSlugBar.vue:5 already uses) · *glass component* Input field primitive (on-glass placeholder register) · *head* open-at-HEAD
- **fix shape** Render the field through the dock's field seam (`.dock-search-field` / a glass DockField, if glass-ui promotes one for non-search fields) or through glass SearchBar/Input at compact size. Drop outline-none. If glass-ui lacks a non-search dock field, relay a request for a DockField primitive to the glass-ui BH inbox.
- **confirm** Bare input CONFIRMED: SlugEditLayer.vue:90-95 has bg-transparent, border-none and outline-none. 1440-light-02 shows the field focused with outline none and shadow none. glass GlassDock.vue:509 .dock-search-field and search.css:35 exist as the producer seam. Placeholder AMENDED: the consumer does apply placeholder:text-muted-foreground. The full ink seen in 390-light-01 and 1440-light-01.dock comes from glass's own ladder, where glass/ladder.css:182-190 (@container style(--glass-backdrop: light)) lifts --muted-foreground to var(--foreground) on glass tiers. The LogIn glyph (text-muted-foreground) is full ink for the same reason. The measured ::placeholder rgb(0,0,0)/rgb(255,255,255) matches neither ink token and looks like an unreliable pseudo read, so it should not be cited. The muted-placeholder collapse routes to GLASS (on-glass placeholder register), while the field surface and focus ring stay CONSUMER.

#### UIA-V-247 · MEDIUM · dock-slug-edit-layer · The 160px field truncates both the placeholder and every real slug

- **source** audit #9 · **verdict** CONFIRMED · **state** empty field / typed slug · **where** dock slug-edit layer
- **frame** `dock-slug-edit-layer/` 1440-light-02-empty-tab-focus.dock.png ('enter slug or to'), 390-light-01-empty-field.png ('enter slug or toker'), 1440-light-03-typed-slug.dock.png ('-quiet-amber-fox'; scrollWidth 212 > clientWidth 160)
- **observed** The placeholder is cut mid-word at both viewports. A typed 21-character slug scrolls so its head is hidden, and real issued slugs are longer ('sable-wishing-charcoal-impala', 29 characters), so the user cannot check what they typed.
- **expected + canon** The field shows a whole 4-word slug at 1440 and uses all the aperture that is left at 390. The placeholder fits or is shortened.
- **owner** **CONSUMER**: CONSUMER — SlugEditLayer.vue:95 (`w-40`)
- **fix shape** Size the field in ch (about 30ch at lg) with flex-1 min-w-0 at 390, and shorten the placeholder to 'slug or token'.

#### UIA-V-248 · MEDIUM · dock-slug-edit-layer · Dead error state: slugError is written in six places but never rendered, so typing your own slug silently does nothing

- **source** audit #10 · **verdict** CONFIRMED · **state** submit the slug you are already signed in as; any caught error · **where** dock slug-edit layer
- **frame** `dock-slug-edit-layer/` (code-read; the no-render is corroborated by every frame's alerts=[] in capture-log.json)
- **observed** 'Already signed in.' returns early and leaves the layer open with no message, and the catch-block copy never shows. The layer has no error or empty-validation state at all.
- **expected + canon** One inline status line under the field (role=alert for errors), the same state vocabulary as the menu verdict row.
- **owner** **CONSUMER**: CONSUMER — SlugEditLayer.vue:13, :18, :43, :49, :64-67 (written) vs the template :80-132 (no render site)
- **fix shape** Render slugError (or pm.identity, see the silent-login finding) in the layer, or delete the dead ref once errors route through identity.

#### UIA-V-249 · MEDIUM · dock-slug-edit-layer · Two slug editors with copy-pasted logic: the dock layer and an orphaned PaletteSlugBar

- **source** audit #11 · **verdict** CONFIRMED · **state** n/a (cohesion) · **where** slug entry, app-wide
- **frame** `dock-slug-edit-layer/` (code-read)
- **observed** The live editor is a hand-rolled input inside DockControl. The dead twin is glass SearchBar + Button icon-only with a real spinner and aria 'Signing in…'. The two diverge in copy ('enter slug…' vs 'enter slug or token…', 'Cancel' vs 'Cancel slug edit') and in idiom.
- **expected + canon** One slug-entry component and one classifier module, built on glass primitives. No orphaned twin kept as a type anchor.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/browser/slug/PaletteSlugBar.vue (no `<PaletteSlugBar` render site in demo/; its looksLikeSlug/normalizeTokenInput at :184-197 are byte-identical to SlugEditLayer.vue:25-37); useSlugMigration.ts:5,62 still types against it
- **fix shape** Delete PaletteSlugBar.vue and the slugBarRef type import, and move the classifier into demo/platform/auth. The dock layer adopts the SearchBar idiom the twin already had.

#### UIA-V-250 · MEDIUM · dock-slug-edit-layer · A login layer carries a destructive 'Generate new slug' act, icon-only and weighted the same as Cancel

- **source** audit #12 · **verdict** CONFIRMED · **state** empty / typed · **where** dock slug-edit layer
- **frame** `dock-slug-edit-layer/` 1440-light-01-empty-field.png, 1440-dark-01-empty-field.dock.png
- **observed** The row is LogIn glyph, field, submit arrow, separator, RefreshCw, then X. RefreshCw creates a new identity (and when logged in it discards the current one) from a surface whose job is sign-in. It has no label and sits beside Cancel with the same size and ink. The menu twins already offer 'Regenerate slug' with its verdict. The leading LogIn glyph repeats the layer's purpose, which the submit arrow already carries.
- **expected + canon** The sign-in layer holds field, submit and cancel. Identity creation lives in the menu that renders its verdict.
- **owner** **CONSUMER**: CONSUMER — SlugEditLayer.vue:113-122
- **fix shape** Remove Generate (and the separator) from the layer. If first-time 'create account' belongs here, make it a labeled secondary action with pending and verdict states.

#### UIA-V-251 · MEDIUM · dock-slug-edit-layer · At 390 the layer's dock box overflows the viewport

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `dock-slug-edit-layer/` Metrics for 390-*-01..04: dock content x=53 w=354, which ends at 407 > 390. Cancel x=363 ends at 407. Beyond the aperture clip, the box extends past the viewport edge, so horizontal page overflow on this layer should be checked.
- **observed** Metrics for 390-*-01..04: dock content x=53 w=354, which ends at 407 > 390. Cancel x=363 ends at 407. Beyond the aperture clip, the box extends past the viewport edge, so horizontal page overflow on this layer should be checked.
- **owner** **GLASS+CONSUMER**: CONSUMER (the same w-40 and 44px seats); verify the GLASS aperture clamp · *glass component* DockLayer aperture clamp · *head* open-at-HEAD

#### UIA-V-252 · MEDIUM · dock-slug-edit-layer · The migrate-dialog branch of onSlugSwitch (saved palettes > 0) was not captured

- **source** confirm miss #3 · **verdict** MISSED (confirm seat) · **severity note** MEDIUM (untested state)
- **frame** `dock-slug-edit-layer/` useSlugMigration.ts:111-122 closes the layer and opens a migrate dialog. A failed userLogin there lands as identity 'The migration did not complete' (:165-167), which renders only in the logged-in menu branch. The same invisibility applies, and no frames cover it.
- **observed** useSlugMigration.ts:111-122 closes the layer and opens a migrate dialog. A failed userLogin there lands as identity 'The migration did not complete' (:165-167), which renders only in the logged-in menu branch. The same invisibility applies, and no frames cover it.
- **owner** **CONSUMER**: CONSUMER

#### UIA-V-253 · MEDIUM · dock-mobile-menu · Mobile menu rows render at 21px, larger than the app's own body text. The 215px menu reads as a billboard and covers about half the viewport

- **source** audit #4 · **verdict** AMENDED · **state** menu open · **where** 390 light+dark, logged in
- **frame** `dock-mobile-menu/` light-390-in-1-open.png, dark-390-in-1-open.png
- **observed** Rows are 21px Plus Jakarta Sans at 44px tall. The logged-in menu is 215×441, 52% of the 844 viewport, and covers the picker readout. At 1440 the twin's rows are visibly smaller. The slider readouts under the menu are about 14px.
- **expected + canon** One governed picker-family scale (sizing.css:56-63: PRIMARY → item rows) that reads as secondary chrome beside the page's primary content. Touch height comes from row padding, not a 1.5× font.
- **owner** **GLASS**: GLASS --dropdown-text (installed 7.0.0 dist resolves to calc(var(--text-small) * 1.5); glass HEAD glass-ui/src/styles/tokens/sizing.css:62 now aliases --control-text, which may already cure this but is not adopted) · *glass component* sizing.css (src/styles/tokens/sizing.css:62) · *head* open-at-HEAD (--ui-scale coupling; 7.0.0 already aliases --control-text)
- **fix shape** Relay to glass: confirm the 7.0.0 → HEAD --dropdown-text change (control-text) and cut a release. Consumer adopts it; no local override.
- **confirm** The symptom is confirmed: coarse pointer gives 21px rows and a 215×441 menu (52% of 844). The stated cause is wrong. The installed 7.0.0 dist (node_modules/@mkbabb/glass-ui/dist/styles/tokens/sizing.css) already sets --dropdown-text: var(--control-text), the same as glass HEAD sizing.css:62, so no release 'cures' this. The 21px comes from glass light-dark.css:16-20: @media (pointer: coarse) sets --ui-scale to var(--ui-coarse-scale, 1.5), which multiplies type as well as control heights. The probe measured --ui-scale 1.5 on coarse, and on fine pointer at the same 390 viewport the rows are 14px (c-light-390-in-open-fine.png). The 1440 twin is smaller because of the fine pointer, not the width. Owner: GLASS policy. The coarse amplification scales font-size where DESIGN intends touch height to come from padding and the --control-floor. Relay it as an --ui-coarse-scale-on-type issue. Consumer escape hatch: retune --ui-coarse-scale, though a local override is discouraged.

#### UIA-V-254 · MEDIUM · dock-mobile-menu · Theme row is a plain menuitem with a static 'Dark mode' label. State shows only through a sun/moon glyph and is not announced

- **source** audit #5 · **verdict** CONFIRMED · **state** menu open · **where** 390 + 1440 twin, both themes
- **frame** `dock-mobile-menu/` light-390-out-1-open.png (sun) vs dark-390-in-1-open.png (moon)
- **observed** The label says 'Dark mode' in both themes. In light the glyph is a sun, which reads as 'light is on', while the text names dark. role=menuitem carries no aria-checked, so a screen reader hears 'Dark mode' with no state.
- **expected + canon** A glass DropdownMenuCheckboxItem (role=menuitemcheckbox, aria-checked=isDark) with the glass check indicator, or a label that states the action ('Switch to dark').
- **owner** **GLASS+CONSUMER**: CONSUMER demo/shell/dock/menus/MobileMenuDropdown.vue:120-130 (twin ProfileSection.vue); GLASS DropdownMenuCheckboxItem is exported but unused · *glass component* DropdownMenuCheckboxItem · *head* open-at-HEAD
- **fix shape** Replace it with <DropdownMenuCheckboxItem :model-value='isDark' @update:model-value='toggleDark()' @select.prevent>Dark mode</DropdownMenuCheckboxItem> in both twins.

#### UIA-V-255 · MEDIUM · dock-mobile-menu · The identity verdict widens the open menu from 215 to 270px and slides it to x=4, 4px from the viewport edge. The slug text wraps mid-word

- **source** audit #6 · **verdict** CONFIRMED · **state** identity verdict (success) · **where** 390 light, logged in, after Regenerate slug
- **frame** `dock-mobile-menu/` light-390-in-1-open.png vs light-390-in-7-identity-verdict.png
- **observed** The new, longer slug is nowrap, which stretches the popover to 270px while it is open. The popper re-anchors it to x=4, breaking the 16px gutter. The verdict 'New slug lush-arching-papaya-goose.' wraps as 'papaya-/goose' and repeats the slug the pill above already shows.
- **expected + canon** The open menu keeps a stable width and stays inside the 16px gutter. The verdict is a short status that does not repeat the pill ('Slug regenerated').
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/MobileMenuDropdown.vue:47-50 (slug pill whitespace-nowrap drives the content width) and :74-82 (verdict `max-w-[16rem]` literal)
- **fix shape** Cap the pill (max-w + truncate, with the full slug in the Copy action) and fix the content width with a token (min-w-menu/max-w-menu). Set the popper collision padding to 16. Rephrase the verdict so it does not echo the slug, and drop the max-w-[16rem] literal.

#### UIA-V-256 · MEDIUM · dock-mobile-menu · 'Copy slug' gives no feedback, while 'Share color' two rows below confirms with 'Copied!'. The same act has two idioms

- **source** audit #7 · **verdict** CONFIRMED · **state** copy slug / link copied · **where** 390 both themes, logged in
- **frame** `dock-mobile-menu/` light-390-in-5-copy-slug.png vs dark-390-in-4-link-copied.png
- **observed** After tapping Copy slug the menu stays open (@select.prevent) and the row still reads 'Copy slug': no check, no status, and no failure path. Share color flips to '✓ Copied!' through glass useClipboard.
- **expected + canon** One copy idiom: glass useClipboard (App.vue:526) status drives a Check glyph and a 'Copied!' label on every copy row.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/layers/SlugEditLayer.vue:73-75 (fire-and-forget writeClipboard) via Dock.vue:74-76; MobileMenuDropdown.vue:52-54
- **fix shape** Give onCopySlug its own useClipboard({resetMs}) instance and pass a slugCopied flag to both twins, rendered like the share row. Do not share the share-link instance.

#### UIA-V-257 · MEDIUM · dock-mobile-menu · Clutter: 9 rows in 3 unlabeled clusters. Two GitHub links, two 'regenerate' entry points, and Switch account reuses the Login icon

- **source** audit #8 · **verdict** CONFIRMED · **state** menu open, logged in · **where** 390 both themes, logged in
- **frame** `dock-mobile-menu/` light-390-in-1-open.png
- **observed** The identity cluster has 4 actions plus a verdict. Then a non-interactive @mbabb header whose link goes to github.com/mkbabb, then Share, then a 'GitHub' row to the repo: two GitHub destinations about 60px apart. Regenerate slug appears here and again in the slug edit layer. 'Switch account' reuses the LogIn glyph of 'Login'. Regenerate replaces the identity in one tap with no confirmation, even though the class meant to mute it has no effect.
- **expected + canon** Each control earns its place. The identity actions sit under a DropdownMenuLabel group heading; the attribution is a single link row; a destructive identity act is confirmed or placed apart.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/MobileMenuDropdown.vue:44-118
- **fix shape** Group into two DropdownMenuGroups (Account / About). Merge the @mbabb header and the GitHub row into one link item. Keep Regenerate in one place (the menu) and add a confirm step or a DropdownMenuSub. Give Switch account a distinct glyph (e.g. UserRound / ArrowLeftRight).

#### UIA-V-258 · MEDIUM · dock-mobile-menu · The @mbabb attribution header is a hand-rolled div with a nested anchor, so it is keyboard-inert (ESC-d-3 class)

- **source** audit #9 · **verdict** CONFIRMED · **state** keyboard navigation · **where** 390 both themes
- **frame** `dock-mobile-menu/` light-390-out-3-keyfocus.png; probe-measure.mjs arrow-walk
- **observed** The ArrowDown walk visits Copy slug → Switch account → Logout → Regenerate → Share color → GitHub → Dark mode and never reaches the @mbabb link. The <a> is not a menuitem, and Tab closes the menu. Only a pointer can reach it.
- **expected + canon** Every interactive element in a menu is a glass menu item, or the header is purely decorative (a DropdownMenuLabel with no link).
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/MobileMenuDropdown.vue:98-106
- **fix shape** Make it a DropdownMenuLabel (avatar + name, not a link) and move the profile link into the single merged link row (see the clutter finding).

#### UIA-V-259 · MEDIUM · dock-mobile-menu · Coarse-pointer amplification also reaches the slug label (18.27px mono bold) and the slug-edit field; the whole menu grows 1.5× from type, not padding

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `dock-mobile-menu/` confirm/c-light-390-in-open.png vs confirm/c-light-390-in-open-fine.png
- **observed** --ui-scale 1.5 on coarse vs 1 on fine; row fs 21px vs 14px; label 18.27px vs 12.18px; menu height 441 vs 423 (height barely changes because the 44px floor already holds, so the extra size is pure type inflation).
- **owner** **GLASS**: GLASS glass-ui/src/styles/tokens/light-dark.css:16-20 (--ui-scale → --ui-coarse-scale 1.5 multiplies --control-text) · *glass component* light-dark.css (src/styles/tokens/light-dark.css:16-20) · *head* open-at-HEAD

#### UIA-V-260 · MEDIUM · dock-profile-menu · The identity verdict is stale, repeats the slug, wraps mid-slug, and collapses during pending (the menu jumps 292→234→292px)

- **source** audit #7 · **verdict** CONFIRMED · **state** identity pending / done / failed · **where** hand-rolled <div data-identity-verdict class='px-2 py-1.5 text-small max-w-[16rem]'>
- **frame** `dock-profile-menu/` light-1440-3-menu-open-done-crop.png (stale), light-1440-6-pending-crop.png, light-1440-7-done-crop.png, light-1440-8-failed-crop.png, dark-1440-6-pending-crop.png
- **observed** The first open after generating from the slug layer already shows 'New slug eager-mapping-ember-sparrow.'. identity is never cleared, so the done verdict persists on every later open. It repeats the slug printed in the header pill two rows above. The literal max-w-[16rem] wraps it mid-slug ('eager-mapping- / ember-sparrow'). During pending the verdict unmounts and the menu shrinks from 292 to 234px, then grows back to 292px on done or failed. Pending itself is only a dimmed 'Regenerating…' row with a spinning icon.
- **expected + canon** A glass feedback primitive in a reserved live region (the S-13 ActionFeedback idiom this app already uses for admin notices, admin-call.ts:103-110). No arbitrary-value literals. The verdict is cleared when the menu closes, and pending, done and failed occupy the same slot without resizing the menu.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue:100-108 + demo/palettes/useSlugMigration.ts:61,87-100
- **fix shape** Render the verdict through ActionFeedback/FeedbackMark in an always-mounted slot, and reset identity on menu close. Say 'Slug regenerated' without echoing the slug, since the header updates. Drop max-w-[16rem].

#### UIA-V-261 · MEDIUM · dock-profile-menu · Glass menu rows take the 44px coarse-pointer floor on a fine pointer, making the 4-command profile menu 292px tall

- **source** audit #8 · **verdict** CONFIRMED · **state** profile menu open, 1440 fine pointer · **where** every .glass-menu-row measured 306x44 at 1440 (desktop Chromium, no touch)
- **frame** `dock-profile-menu/` light-1440-3-menu-open-done-crop.png, dark-1440-16-menu-after-slug-login.png
- **observed** Rows are 44px tall at 1440 with 16.4px text, so four commands plus a header take 292px. The menu reads bloated next to the 32px dock controls it drops from. The same README promises the 44px floor only for coarse pointers (dock/README.md:67-68).
- **expected + canon** On a fine pointer the row is the 2rem rung; 44px applies only under pointer: coarse.
- **owner** **GLASS**: GLASS menu: glass-ui src/components/_shared/menu/menu.css:12 (min-block-size: max(2rem, var(--touch-target, 2.75rem))) vs src/styles/tokens/sizing.css:278-282 (--touch-target is declared unconditionally at :root, documented as the floor 'read by the @media (pointer: coarse) block') · *glass component* menu.css (src/components/_shared/menu/menu.css:12) · *head* open-at-HEAD
- **fix shape** At the glass root, move the --touch-target read in menu.css under @media (pointer: coarse), or read a pointer-scoped token that resolves to 2rem on fine pointers. Relay to the glass-ui session.

#### UIA-V-262 · MEDIUM · dock-profile-menu · Menu type voice: sans rows under a Fraunces dock and a mono trigger; at 390 the rows (21px) outrank the identity header (14px)

- **source** audit #9 · **verdict** CONFIRMED · **state** profile menu open, both viewports · **where** measured: rows 'Plus Jakarta Sans' 16.4px (1440) / 21px (390); slug header Fira Code 14px/700 at 390; verdict 14px; dock labels Fraunces
- **frame** `dock-profile-menu/` light-1440-3-menu-open-done-crop.png, light-390-3-menu-open-done.png, dark-390-8-failed-crop.png
- **observed** Three families span trigger → menu. The consumer's font-display (Fraunces) on DropdownMenuContent and text-small on the rows are both overridden by the glass row rule. At 390 the command rows are 1.5x the identity header, so the identity reads as a footnote to 'Copy slug'.
- **expected + canon** One type voice per surface and a correct scale step: the identity header is at or above the rows. The consumer's type intent either applies or is not written.
- **owner** **GLASS+CONSUMER**: GLASS overlay-plate.css:202 (.menu__item font-size: var(--dropdown-text) = --control-text × --ui-scale, sizing.css:35,62) + CONSUMER ProfileSection.vue:70 (font-display on the content is dead for rows) / :77-94 (text-small overridden) · *glass component* --dropdown-text (overlay-plate.css:202) · *head* open-at-HEAD
- **fix shape** Glass: document or offer a menu font-family and scale hook, and confirm the coarse ui-scale bump on --dropdown-text is intended at 21px. Consumer: drop the dead font-display/text-small classes, or set them through the glass hook, and size the identity header on the dropdown rung.

#### UIA-V-263 · MEDIUM · dock-profile-menu · After a slug-edit submit, focus lands on the DockLayer container and paints a rectangular UA blue ring inside the stadium dock

- **source** audit #10 · **verdict** CONFIRMED · **state** admin; sign-in result (keyboard Enter submit) · **where** document.activeElement = 'DIV PalettesTools admin @mbabb' (the layer)
- **frame** `dock-profile-menu/` light-1440-11-admin-crop.png, dark-1440-11-admin-crop.png, light-1440-14-login-unknown-slug-result.png
- **observed** A square-cornered browser-blue outline boxes the whole dock content inside the stadium plate. It is not the house --focus-ring (a --ink-perimeter outline).
- **expected + canon** Focus moves to the control that replaced the layer (the Profile/admin trigger or Login). A programmatic tabindex=-1 landing container paints no UA ring.
- **owner** **GLASS+CONSUMER**: GLASS dock: glass-ui src/components/dock/DockLayer.vue:87 (:tabindex="isActive ? -1 : undefined", the focus-transfer-on-dissolve target) + CONSUMER demo/shell/dock/Dock.vue:69-75 (no focus handoff to the re-mounted trigger) · *glass component* DockLayer (src/components/dock/DockLayer.vue:87) · *head* open-at-HEAD
- **fix shape** Glass: give the DockLayer landing target outline:none or the house ring on --radius-ctx. Consumer: after onSlugSubmit, focus the identity trigger. Relay the glass half to the glass-ui session.

#### UIA-V-264 · MEDIUM · dock-profile-menu · The desktop and mobile identity twins diverge: gold admin on desktop, muted admin on mobile, and a separator only on desktop

- **source** audit #11 · **verdict** CONFIRMED · **state** admin; profile menu open · **where** two hand-copied templates ('one cure, applied identically at both twins', MobileMenuDropdown.vue:22)
- **frame** `dock-profile-menu/` light-1440-11-admin-crop.png vs light-390-12-admin-menu-crop.png; light-1440-3-menu-open-done-crop.png vs light-390-3-menu-open-done.png
- **observed** Admin is a gold-shimmer pill with inline style literals (border-color/color: var(--color-gold)) on desktop, and a muted-foreground pill with different inline literals on mobile. Desktop separates Regenerate from Logout; mobile does not. Every future cure has to be applied twice, and the pattern has already drifted.
- **expected + canon** One component and one presentation of each identity state across viewports. Token classes, not inline style.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue:86,115 vs MobileMenuDropdown.vue:59-60,86
- **fix shape** Fold both twins into the single menu from the trailing-zone finding. Pick one admin register (the gold metal, as DockViewSelect uses) through a class, not an inline style.

#### UIA-V-265 · MEDIUM · dock-profile-menu · At 390 the GitHub row breaks: the icon sits on its own line above a wrapped 'GitHub' label

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `dock-profile-menu/` light-390-3-menu-open-done.png
- **observed** The DropdownMenuItem as-child anchor does not keep the row's inline-flex layout, so gap-2 does nothing and the svg stacks above the text, unlike every other row.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/MobileMenuDropdown.vue (the @mbabb section's as-child <a> row) and the same pattern at ProfileSection.vue:174-181

#### UIA-V-266 · MEDIUM · dock-profile-menu · The app's own design doc canonizes the stadium slug-pill

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **observed** The doc calls the slug-pill recipe the pill signature. Any card-like cure for the slug header must amend this line or the next audit will re-justify the stadium.
- **owner** **CONSUMER**: CONSUMER demo/DESIGN.md:207 (and :400, which keeps .slug-pill as a shared recipe)

#### UIA-V-267 · MEDIUM · dock-mbabb-menu · Menu typography is split three ways: per-row text-small overrides the menu's own font and size tokens, and the content's font-display class does nothing

- **source** audit #4 · **verdict** CONFIRMED · **where** dock @mbabb menu open, both viewports and themes
- **frame** `dock-mbabb-menu/` 1440-light-2b-open-zoom.png, 390-light-2-open.png (computed styles in capture-log-run1.json .runs[].probes.open)
- **observed** The four rows use three families. The menu content computes to Fira Code (the project token wins over the dead `font-display` class), the header link is Fira Code, the tagline is Fraunces italic at 11px, and the rows are Plus Jakarta Sans at 16.4px, forced by `text-small`. The dock's own labels (Home, Tools) are Fraunces. The project's decision that menus are mono never reaches a single row.
- **expected + canon** The menu owns one type register through its producer tokens (--dropdown-menu-font / --dropdown-text), and rows do not restate font or size. Consumers keep canon utilities and do not override per instance (feedback: root styling, not per-instance).
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue:162,169,173,177,186 (text-small on every item; font-display on DropdownMenuContent) versus demo/styles/foundation.css:420 (--dropdown-menu-font: var(--font-mono)). Canon: glass-ui src/styles/typography/semantic.css:217-219 (text-small sets font-family: var(--font-text)); glass-ui overlay-plate.css:202 (.menu__item font-size: var(--dropdown-text))
- **fix shape** Remove `text-small` from the DropdownMenuItems and `font-display` from DropdownMenuContent in both twins. Choose the menu face once, either keeping the foundation.css:420 token or retiring it, and let the tagline be the one deliberate secondary register (menu__label / --dropdown-text-secondary).

#### UIA-V-268 · MEDIUM · dock-mbabb-menu · Dark mode row is a plain command with a static label and no checked state; its icon is mis-sized and pushes the label off the text column

- **source** audit #5 · **verdict** CONFIRMED · **where** dock @mbabb menu, Dark mode row, light→dark and dark→light
- **frame** `dock-mbabb-menu/` 1440-light-2b-open-zoom.png (sun + 'Dark mode'), 1440-light-6b-toggled-zoom.png, 1440-dark-6b-toggled-zoom.png, 390-light-2-open.png
- **observed** The label reads 'Dark mode' in both themes. In light mode it shows a Sun glyph next to 'Dark mode', which reads as contradictory. The row has role=menuitem and no aria-checked, so the current theme is not announced. The `aspect-square w-4` icon renders 16x24 because lucide's height=24 attribute wins, against 14x14 on the sibling rows, so 'Dark mode' starts about 2px right of the other labels (visible at 390).
- **expected + canon** A toggle in a menu is a checkbox row: role menuitemcheckbox with aria-checked equal to isDark and the producer's indicator, or a label that names the current state. Icons use one size across the menu.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue:186-196 (twin MobileMenuDropdown.vue:122-133); glass offers DropdownMenuCheckboxItem (src/components/menu/DropdownMenuCheckboxItem.vue)
- **fix shape** Use <DropdownMenuCheckboxItem :model-value="isDark" @update:model-value="toggleDark" @select.prevent> labeled 'Dark mode'. Otherwise keep a menuitem, relabel it 'Theme: Light/Dark' and size the icon w-3.5 h-3.5 like its siblings. Apply to both twins.

#### UIA-V-269 · MEDIUM · dock-mbabb-menu · Header block repeats the trigger label, adds a second GitHub destination, and its link is outside the menu's keyboard reach

- **source** audit #6 · **verdict** CONFIRMED · **where** dock @mbabb menu open, header row
- **frame** `dock-mbabb-menu/` 1440-light-2b-open-zoom.png, 1440-dark-4-kbd-focus.png (ArrowDown roving goes Share→GitHub; the header link is never highlighted), 390-dark-2b-open-zoom.png
- **observed** The trigger says '@mbabb' and the first line of the menu says '@mbabb' again. The header's naked <a> points to github.com/mkbabb, and the GitHub row two lines below points to github.com/mkbabb/value.js: two GitHub links in a four-row menu. The header <a> is a bare interactive element inside role=menu, not a menuitem, so arrow-key roving skips it.
- **expected + canon** Every interactive child of a menu is a menu item, and each destination appears once (clutter criterion). The identity header is a label, not a second link.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue:163-171 (twin MobileMenuDropdown.vue:94-102)
- **fix shape** Make the header a non-interactive DropdownMenuLabel: avatar, tagline, and the wordmark only if it adds information. Keep one GitHub row, or two clearly named rows ('Profile', 'Source') as proper items.

#### UIA-V-270 · MEDIUM · dock-mbabb-menu · The @mbabb block is duplicated by hand across the desktop and mobile twins, so each bug ships twice

- **source** audit #7 · **verdict** CONFIRMED · **where** dock @mbabb menu at 1440 vs the mobile overflow menu at 390
- **frame** `dock-mbabb-menu/` 1440-light-2b-open-zoom.png vs 390-light-2b-open-zoom.png: the same stacked GitHub row and the same icon offset in both
- **observed** Two copies of the same four rows. The as-child GitHub break, the mis-sized Dark mode icon, the per-row text-small and the duplicate header link appear in both files. The comment at MobileMenuDropdown.vue:22 already calls it 'the desktop twin's cure, verbatim'.
- **expected + canon** One source for the @mbabb rows, consumed by both breakpoints (no-god-modules / KISS: a focused component, not a copy).
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue:163-196 and demo/shell/dock/menus/MobileMenuDropdown.vue:94-135 (identical avatar/share/GitHub/dark markup and identical 180-character inline GitHub SVG path)
- **fix shape** Extract the rows (header label, Share, GitHub, theme) into one focused component, e.g. demo/shell/dock/menus/MbabbMenuItems.vue, rendered inside both DropdownMenuContents. Move the GitHub glyph into a single icon asset.

#### UIA-V-271 · MEDIUM · dock-mbabb-menu · Hover and keyboard highlight light two rows at once; the light-theme hover wash is nearly invisible

- **source** audit #8 · **verdict** CONFIRMED · **where** dock @mbabb menu: pointer over Share, then ArrowDown; light and dark
- **frame** `dock-mbabb-menu/` 1440-dark-4-kbd-focus.png (Share keeps a wash while GitHub has the highlight ring), 1440-light-3-hover-share.png (the hovered Share row is almost indistinguishable)
- **observed** After pointer hover on Share and one ArrowDown, data-highlighted moves to GitHub while Share still paints its :hover wash, so two rows look active. In light, the hover wash is oklab L0.916 α0.52 over a menu ground of L0.936 α0.81, roughly ΔL 0.02, so hover gives almost no feedback. Dark reads well (L0.41 α0.63).
- **expected + canon** Exactly one highlighted row, keyed on reka's [data-highlighted], which already follows the pointer. The hover/highlight rung is measurably distinct in both schemes.
- **owner** **GLASS**: GLASS DropdownMenuItem / .glass-menu-row with .interactive-item:hover (glass-ui src/styles/index.css:226-233 hover/highlight ordering; utilities/base.css .interactive-item) · *glass component* DropdownMenuItem (src/styles/index.css:226-233) · *head* open-at-HEAD
- **fix shape** Glass (route to the glass-ui session): paint the row wash from [data-highlighted] only and drop the independent .interactive-item:hover leg inside menus. Raise the light-scheme row highlight rung to a perceptible contrast step.

#### UIA-V-272 · MEDIUM · dock-mbabb-menu · value.js resolves glass-ui 7.0.0 while glass HEAD has moved on; glass-owned findings must name which version they target

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `dock-mbabb-menu/` n/a (capture-log menuCls vs glass HEAD overlayContentAttrs)
- **observed** The radius finding is already cured at glass HEAD. The relay letter should mark each glass item as fixed-at-HEAD (adopt) or still open at HEAD (fix: the hover double-paint, the as-child silent strip and the link row) so the glass session does not re-fix landed work.
- **owner** **CONSUMER**: CONSUMER (package.json '@mkbabb/glass-ui': '^7.0.0', node_modules version 7.0.0)

#### UIA-V-273 · MEDIUM · palettes-view · Store-recovery notice is permanent, undismissable, and in a debug register; the empty state below contradicts it

- **source** audit #11 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · store-recovery (corrupt color-palettes) · 1440/390 light and dark
- **frame** `palettes-view/` recovery__1440__light.png, recovery__1440__dark.png, recovery__390__dark.png
- **observed** The verdict chip (a copy-toast primitive) is reused as a persistent two-line banner: 11-12px Fira mono in red on pink, no dismiss button (the @update:visible handler is unreachable). The empty state directly under it still says 'No saved palettes yet. Add colors, then save.'
- **expected + canon** STATES: a recoverable-error notice is a glass Alert (glass-ui src/components/alert) with a dismiss and prose voice. The empty state names the reset ('Your library was reset').
- **owner** **CONSUMER**: CONSUMER demo/palettes/PalettesPane.vue:51-60 + demo/palettes/browser/card/PaletteCard/ActionFeedback.vue:1-18 (no close control; autoDismissMs 0)
- **fix shape** Replace it with glass Alert tone="destructive" dismissible bound to pm.storeRecovery, and feed a recovery flag into the EmptyState copy.

#### UIA-V-274 · MEDIUM · palettes-view · Offline: two identical 'BACKEND OFFLINE — SAVED LOCALLY' chips (two live regions); the chip is hand-rolled

- **source** audit #12 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · ApiOfflineChip (route abort :3000 + /api) · 1440 light and dark (390 shows one)
- **frame** `palettes-view/` offline__1440__light.png, offline__1440__dark.png, offline__390__light__offline.png
- **observed** In dev, the dock band lamp (top-right) and the editor chip both say the same thing, each role=status. The editor chip is 11px letter-spaced small-caps mono, pushes the name row down about 32px, and is a bespoke span+dot. The glass Login pill stays offered while the backend is down.
- **expected + canon** CLUTTER: one status announcement per condition. The glass Chip (static, size xs) + StatusDot(state) is the one status mark (glass-ui src/components/status-dot/README.md; chip/README.md).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/status/ApiOfflineChip.vue:11-26 (hand-rolled) seated at demo/palettes/browser/card/CurrentPaletteEditor.vue:124; demo/shell/dock/DockStatusLamp.vue (dev lamp)
- **fix shape** Rebuild ApiOfflineChip on Chip size="xs" + StatusDot. Suppress the per-surface chip while the dock lamp is showing (or vice versa), keeping one role=status.

#### UIA-V-275 · MEDIUM · palettes-view · The same ~180-character hand-rolled icon-button class string is copied 9 times across 3 files

- **source** audit #13 · **verdict** AMENDED · **state** CONFIRMED · **where** palettes-view · swatch action menus, slug copy, rename submit/cancel, edit overlay
- **frame** `palettes-view/` rename__1440__light.png (evidence is the source; the swatch menus are unreachable, see the swatch-menu finding)
- **observed** `p-1.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40` is repeated verbatim. The edit overlay uses `btn-interactive p-2 rounded-full bg-foreground/5`. It is a local focus ring and press scale, not the house register.
- **expected + canon** GLASS IDIOM: every command is a glass Button (emphasis text/quiet, iconOnly, size rung). feedback_root_styling: style at the primitive, never per instance.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/card/CurrentPaletteEditor.vue:46,49,52,75,78; demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue:14,44,51,58; demo/palettes/browser/card/PaletteCard/PaletteRenameInput.vue:20,26
- **fix shape** Replace all of them with <Button emphasis="text" icon-only size="xs\|sm" :aria-label>. Delete the class strings.
- **confirm** The substance stands, but the count is off. The exact string `p-1.5 rounded-sm hover:bg-accent active:scale-95 ...` occurs 6 times (3 in CurrentPaletteEditor.vue, 3 in PaletteCardSwatches.vue). PaletteRenameInput.vue:20,26 carry a near-variant (`p-0.5 ... hover:bg-accent/50`), not the verbatim string. The fix is the same: glass Button text icon-only.

#### UIA-V-276 · MEDIUM · palettes-view · Per-instance overrides on glass Buttons: save check measures 32×40 (a capsule, not a circle); Update/Cancel are 24px italic serif

- **source** audit #14 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · current-palette editor; duplicate-name prompt · 1440 light/dark
- **frame** `palettes-view/` loaded__1440__light.png (metrics: .dashed-well button.rounded-full 32x40, radius 1.67772e+07px), dupe__1440__light__s2.png, dupe__390__dark.png
- **observed** The save check's width override fights the glass capsule's min-height, giving 32×40. The duplicate prompt sets mono-italic copy beside 24px-tall italic-serif pills, below the control height rung.
- **expected + canon** Glass Button size rungs (DESIGN.md:928 size xs\|sm\|md\|lg; the control height cohort) with no consumer geometry. One voice for a prompt and its actions.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/card/CurrentPaletteEditor.vue:142-150 (h-8 w-8 rounded-full border-border/50), :159-174 (h-6 px-2 text-caption font-display rounded-full)
- **fix shape** Button icon-only size="sm" (no h/w/rounded/border classes). Update = Button size="xs" emphasis="secondary", Cancel = emphasis="text". Set the prompt in the plate's text voice.

#### UIA-V-277 · MEDIUM · palettes-view · Stage jumps 48px vertically when the list length changes (search, empty, recovery)

- **source** audit #15 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · loaded vs search/empty/recovery · 1440
- **frame** `palettes-view/` loaded__1440__light.png (cards top y≈112) vs search__1440__light.png / empty__1440__light.png / recovery__1440__light.png (top y≈160)
- **observed** Typing a query that shortens the list re-centers the whole stage, so the picker card and pane both move about 48px under the user's eye mid-typing.
- **expected + canon** COHESION/STATES: filtering content never moves the stage. Panes keep a fixed top anchor, and the pane scrolls internally.
- **owner** **CONSUMER**: CONSUMER shell stage centering (the picker+pane stage block; demo/palettes/PalettesPane.vue:2 Card h-full)
- **fix shape** Anchor the stage top (align-content:start with a fixed top offset) or give the pane a fixed block-size, so it scrolls and does not resize the stage.

#### UIA-V-278 · MEDIUM · palettes-view · Orphan toolbar row: a lone 24px trash ghost with dead band; Delete-all stays live while a search hides palettes

- **source** audit #16 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · loaded; search filtering · 1440/390
- **frame** `palettes-view/` loaded__1440__light.png, search__1440__light.png, selected__390__light.png
- **observed** A full-width flex row exists only to right-align one 24px ghost icon, leaving about 50px of dead space between the editor and the list. With q=neon (1 visible) the same trash deletes all 4, including hidden ones.
- **expected + canon** CLUTTER/HIERARCHY: a rare destructive bulk verb lives in the pane header's overflow (PaneHeader actions / glass DropdownMenu) and is scoped or disabled while filtering.
- **owner** **CONSUMER**: CONSUMER demo/palettes/PalettesPane.vue:85-96, :122-142
- **fix shape** Move 'Delete all' into a header overflow menu (tone=destructive), and disable it (or say 'Delete 1 shown') while a query is active. Remove the row.

#### UIA-V-279 · MEDIUM · palettes-view · Search sits above the Current Palette editor but filters only the saved list below it

- **source** audit #17 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · loaded; search
- **frame** `palettes-view/` loaded__1440__light.png, search__1440__light.png
- **observed** The pane order is search, then editor, then saved list. The search controls are separated from their results by an unrelated composer, and read as if they search the current palette too.
- **expected + canon** HIERARCHY: a filter sits in the header of the collection it filters.
- **owner** **CONSUMER**: CONSUMER demo/palettes/PalettesPane.vue:42-47 vs :64-77
- **fix shape** Order: Current Palette editor (compose), then a 'Saved' section header carrying SearchBar + the count + the overflow menu, then the list.

#### UIA-V-280 · MEDIUM · palettes-view · Dock collapses to an orb on ANY pane interaction (menu open, rename), not just selection

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `palettes-view/` menucolor__1440__light__s2.png, rename__1440__light.png (orb at 720,40 with nothing selected)
- **observed** The shell's global navigation vanishes whenever the user touches the pane, so the selection finding's 'exempt selection' fix is too narrow.
- **owner** **CONSUMER**: CONSUMER shell dock collapse policy

#### UIA-V-281 · MEDIUM · palette-scene-actions · Publish is offered as ready while the app already reports the backend offline

- **source** audit #7 · **verdict** CONFIRMED · **state** /#/palettes, API down, saved palette selected · **where** demo/palettes/PaletteInspector.vue:354 (publish gating ignores availability); demo/shell/usePaneRouter.ts:936-940 (seat() never passes a blocked reason)
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/light-1440-04-palette-verbs-saved.png (status lamp 'BACKEND OFFLINE — SAVED LOCALLY' top right, globe seat live) -> light-1440-06a-publish-1s.png
- **observed** The seat state is ready and clicking it produces a guaranteed failure.
- **expected + canon** The typed contract already has a 'blocked' state with a spoken reason (GenericActionBar header). Use it when apiAvailability is 'unavailable' or 'misconfigured'.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Read apiAvailability in paletteActions and pass blocked 'the backend is offline' for publish, visibility, vote, fork, tags and versions.

#### UIA-V-282 · MEDIUM · palette-scene-actions · Selected palette has no visual selection mark

- **source** audit #9 · **verdict** AMENDED · **state** any palette selected · **where** demo/palettes/PaletteInspector.vue:16-18 (data-selected stamp) and scoped style :446-520 (no selected register)
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/light-1440-03-selected-dock-label.png, probe-two-selected-1440.png
- **observed** The root gets data-selected, but no CSS rule anywhere in demo targets .palette-card[data-selected]. The only cue is the swatch band unfolding, which looks the same as 'expanded'. Meanwhile the whole dock now acts on this palette.
- **expected + canon** Selected states should be present and consistent (lens 5). A glass selected state is painted, the way DockControl.active is (dock README 'Interaction contracts').
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Add a selected style built from glass tokens: the lg cartoon cast plus an accent edge, or the producer's active paint, keyed on [data-selected].
- **confirm** There is no [data-selected] rule for .palette-card: the only data-selected CSS in demo is GradientStopEditor.vue:976. The amendment: PaletteInspector.vue:18 binds data-selected to `expanded`, not to dock selection. So even the stamp means 'expanded', and there is no selection state in the DOM at all. The fix needs a real selected binding (from SELECTED_ENTITY_KEY) as well as a painted style. light-1440-14 shows 'Owned One' selected with nothing to mark it.

#### UIA-V-283 · MEDIUM · palette-scene-actions · On phones the selected palette is never named, and the dock scrolls away

- **source** audit #10 · **verdict** CONFIRMED · **state** 390x844, palette selected · **where** demo/shell/dock/ActionBarToggle.vue:90-97 (label desktop-only); demo/shell/dock/Dock.vue:204-213 (action layer carries no entity name)
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/sheet-light-390-a.png frame 2 (dock gone after selecting a card lower down) and frame 3 (verbs without a name)
- **observed** The toggle's text is empty at 390, so the 'palette name' label is only a glyph swap. After selecting a card lower down the page, the dock is at y -411 (inline, scrolled off). Inside the action layer no width shows the palette's name: only Back and icons.
- **expected + canon** 'The dock action bar is now labelled with the palette name' should hold at every width. The verb surface should stay reachable from the selected entity.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Put a compact name chip (truncated) at the start of the action layer. On phones, make the dock sticky or scroll it into view when a palette is selected.

#### UIA-V-284 · MEDIUM · palette-scene-actions · Verdict rail is a hand-rolled chip with hard-coded colours and a code font

- **source** audit #11 · **verdict** CONFIRMED · **state** any verb verdict · **where** demo/palettes/browser/card/PaletteCard/ActionFeedback.vue:5-10
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/crop-focus-dock-dark-rail.png (bottom), light-1440-07-export-json.png
- **observed** It uses 'bg-green-500/10 text-green-600 dark:text-green-400' and 'bg-destructive/10', a 12px panel radius, and 'fira-code' monospace for full sentences. Errors use role=status, not alert.
- **expected + canon** Glass components use tokens, not literals. glass-ui ships Alert (src/components/alert) and Toast for inline and transient verdicts. Errors should be announced as alerts.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Replace the chip with a glass Alert (inline, success and destructive variants), use semantic tokens, set body type in the body font, and give errors role=alert.

#### UIA-V-285 · MEDIUM · palette-scene-actions · Version history drawer has no empty or error state: a failed load reads as '0 versions'

- **source** audit #12 · **verdict** CONFIRMED · **state** owned palette -> Version history · **where** demo/palettes/browser/dialog/VersionHistoryDrawer.vue:9-20 (only a loading branch), :140-142 ('if (!page) return' leaves total at 0)
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/light-1440-15-versions-from-dock.png, dark-1440-15b-versions-after-one-escape.png
- **observed** 'Owned One — 0 versions' over a blank body, while the card advertises ⟲2. Note: the versions endpoint returned a mocked empty page in this capture. The code shows the same blank result on a failed fetch.
- **expected + canon** Empty, loading and error states present and consistent (lens 5).
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Add a designed empty row ('No saved versions yet') and an error row with Retry. Do not show a count when the load failed.

#### UIA-V-286 · MEDIUM · palette-scene-actions · data-selected is bound to expansion, not selection

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `palette-scene-actions/` PaletteInspector.vue:18 has :data-selected="expanded ? '' : undefined".
- **observed** PaletteInspector.vue:18 has :data-selected="expanded ? '' : undefined".
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Bind the stamp to dock selection (SELECTED_ENTITY_KEY) and paint it.

#### UIA-V-287 · MEDIUM · palette-card-menu · Tags popover at 390 is flush against the right viewport edge

- **source** audit #4 · **verdict** CONFIRMED · **state** tags popover · **where** browse · tags popover open (+N clicked) · 390
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/tags-popover-open-390-light.png
- **observed** The popover's right border sits on the viewport edge (x≈389 of 390). The plate also carries empty space below the second chip row. Hovering the +N count only changes its fill; the popover is click-only, although the brief says 'hover the tag count'.
- **expected + canon** The same 16px phone gutter as other overlays; the plate hugs its content.
- **owner** **GLASS+CONSUMER**: GLASS: PopoverContent sets no collisionPadding (glass-ui HEAD src/components/popover/PopoverContent.vue:39,58). CONSUMER: PaletteCardMeta.vue:39 `align="start" class="w-auto max-w-64 p-2"` · *glass component* PopoverContent (src/components/popover/PopoverContent.vue:39,58) · *head* open-at-HEAD
- **fix shape** Same GLASS collisionPadding default as the submenu finding. CONSUMER: pass `align="end"` for a right-edge trigger.

#### UIA-V-288 · MEDIUM · palette-card-menu · Export submenu and the Versions count render in ITALIC mono

- **source** audit #5 · **verdict** CONFIRMED · **state** open · submenu · **where** browse · Export submenu; owner/other menus · Versions row · both viewports and themes
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/menu-other-export-sub-1440-light.png; menu-other-export-sub-390-dark.png; menu-owned-1440-light.png
- **observed** The served `.text-caption` utility (layer utilities) carries font-style: italic (probe-italic.mjs). It is used here as a size token, so all five export rows are italic Fira Code while the parent menu is upright, and the '3' version count is italic.
- **expected + canon** One upright type register across the root and sub menus. Counts and annotations use glass DropdownMenuShortcut / --dropdown-text-secondary.
- **owner** **CONSUMER**: CONSUMER: PaletteCardMenu.vue:112 `<DropdownMenuSubContent class="text-caption">` and :101 `<span class="ml-auto text-caption text-muted-foreground">`
- **fix shape** Remove `text-caption` from :112. Render the count at :101 as `<DropdownMenuShortcut>`.

#### UIA-V-289 · MEDIUM · palette-card-menu · The menu mixes four type registers, and the mono pin is a consumer override

- **source** audit #6 · **verdict** CONFIRMED · **state** open · **where** browse/palettes · every menu-open state
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/menu-owned-1440-light.png; menu-admin-feature-1440-dark.png
- **observed** Four registers in one menu: a bold display-serif header ('Harbour Dusk', truncated 'Gallery Marigold Sun…'), Fira Code verb rows, a small-caps mono PUBLIC/offline annotation set by an inline style literal, and an uppercase tracked mono 'ADMIN' label. The header repeats the palette name printed directly beside the trigger.
- **expected + canon** The glass DropdownMenu default register (Label / Item / Shortcut / Separator). Tokens, not inline styles or literals.
- **owner** **CONSUMER**: CONSUMER: demo/styles/foundation.css:419 `--dropdown-menu-font: var(--font-mono)`; PaletteCardMenu.vue:9 (font-display font-bold label, `max-w-[180px]` literal), :34-38 and :56-58 (inline `style="font-variant: small-caps"` + fira-code annotation), :155 (uppercase mono 'Admin' label). glass-ui HEAD src/components/_shared/menu/menu.css:125 has retired the --dropdown-menu-font knob, so the pin goes inert on upgrade
- **fix shape** Drop the mono pin and inline styles. Use the default DropdownMenuLabel for the 'Admin' group. Render state annotations via DropdownMenuShortcut. Remove the name header or leave it untruncated in the default label style.

#### UIA-V-290 · MEDIUM · palette-card-menu · Tag chips and the +N control are hand-rolled pills, not the glass Chip, and +N is an 18px touch target

- **source** audit #7 · **verdict** AMENDED · **state** rest / hover / popover · **where** browse/palettes · cards at rest, +N hover, tags popover · both viewports
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/browse-rest-390-light.png; tags-more-hover-1440-light.png; tags-popover-open-390-light.png
- **observed** The +N button measures 25×18 CSS px at 390 with hasTouch, radius 9999px, 11px Plus Jakarta Sans. The chip recipe is hand-copied three times. Stadium for a single-line static chip is on-canon (DESIGN.md role table :385-396, --radius-badge/--radius-control); the problem is that the primitive is bypassed.
- **expected + canon** glass-ui/src/components/chip/README.md: `<Chip size="xs">` is 'the static micro-pill rung (4/2px pads, fixed 11px roman type)', and `mode="action"` gets 'the 44px touch floor' on a coarse pointer.
- **owner** **CONSUMER**: CONSUMER: demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue:18, :28, :45 (`rounded-full bg-muted/60 px-1.5 py-0.5 text-micro text-muted-foreground`, repeated 3×)
- **fix shape** Tags become `<Chip size="xs">`, +N becomes `<Chip mode="action" size="xs" :aria-label>`, and the popover list uses the same Chip. Delete the three class strings.
- **confirm** The bypass is confirmed: the same `rounded-full bg-muted/60 px-1.5 py-0.5 text-micro` recipe appears at PaletteCardMeta.vue:18/:28/:45, and stadium for a static chip is on-canon. The fix needs amending. chip/README.md:22-24 says 'On a coarse pointer an INTERACTIVE chip still takes the 44px touch floor whatever its rung, so `xs` is for the static pill.' The tag chips should be `<Chip size="xs">`, but +N should be `<Chip mode="action">` at the default/sm rung, not size="xs".

#### UIA-V-291 · MEDIUM · palette-card-menu · No tag chip ever renders in the served layouts: every card shows only an opaque '+6'

- **source** audit #8 · **verdict** CONFIRMED · **state** rest · **where** browse and palettes · cards at rest · 1440 dual-pane and 390
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/browse-rest-1440-light.png; palettes-rest-1440-dark.png; browse-rest-390-light.png
- **observed** Card inline size is 462px at 1440 (dual pane) and 324px at 390. Both fall below the 30rem (480px) band-0 threshold, so bands 1–3 (1–3 visible chips) are unreachable and every card shows a bare '+6' / '+5' / '+1' / '+4'. The count reads as a number next to the colour count and the vote count, with no tag semantics.
- **expected + canon** The declared priority should produce at least one visible tag in the product's real card widths. Otherwise the count needs a tag glyph or label.
- **owner** **CONSUMER**: CONSUMER: PaletteCardMeta.vue:117-147 (container bands < 30rem / 30 / 36 / 42rem)
- **fix shape** Re-derive the bands from the measured card widths (e.g. 1 chip at ≥ 24rem), or drop the chip bands and render a tag-glyph Chip with the count. Coordinate with the PaletteSpecimen seat.

#### UIA-V-292 · MEDIUM · palette-card-menu · Card row hierarchy: the palette name truncates while the meta cluster and a 54px trigger keep their width

- **source** audit #9 · **verdict** CONFIRMED · **state** rest · **where** browse/palettes · cards at rest and with the menu open · 390 (also 1440 'Gallery …')
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/browse-rest-390-light.png; menu-saved-local-390-dark.png; menu-owned-1440-light.png
- **observed** The primary content truncates to 'Harbour…', 'Galler…' and 'My Saved T…' at 390, and to 'Gallery …' at 1440, while the colour-count chip, +N, the heart count and a 54×54 trigger (36×36 at 1440) take the row. The trigger circle is more than half the 98px card height.
- **expected + canon** The name dominates the card row. A coarse pointer gets a ≥44px hit area without a 54px visual.
- **owner** **GLASS+CONSUMER**: CONSUMER: demo/palettes/PaletteInspector.vue (and its twin PaletteCard.vue:49-58) — `<Button icon-only size="sm">` trigger in the card row. GLASS: Button icon-only sm grows its VISUAL size under --ui-coarse-scale 1.5 (7.0.0 sizing.css), 36→54px, beyond the 44px floor · *glass component* Button (sizing.css) · *head* open-at-HEAD
- **fix shape** GLASS: coarse pointer enlarges the hit box (pseudo-element / padding-box) and leaves the visual at the size rung. CONSUMER: at narrow card widths move votes and +N to the specimen's second line so the name keeps the row.

#### UIA-V-293 · MEDIUM · palette-card-menu · At 390 an upward-flipped card menu covers the app dock

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/menu-admin-other-390-light.png
- **observed** The Gallery admin menu opens upward, and its top plate covers the top dock pill (the search control is hidden beneath the 'Gallery Marigol…' header).
- **owner** **GLASS+CONSUMER**: GLASS: DropdownMenuContent has no collisionPadding/collision boundary that avoids the dock. CONSUMER: PaletteCardMenu side/avoidCollisions · *glass component* DropdownMenuContent · *head* open-at-HEAD

#### UIA-V-294 · MEDIUM · palettes-delete-all-dialog · Delete-all trigger occupies its own toolbar row, detached from the header count and from the list it acts on

- **source** audit #3 · **verdict** CONFIRMED · **state** resting pane with 1 or more saved palettes · **where** PalettesPane.vue:84 `<div v-if=... class="flex items-center justify-end">` holding one 28px icon Button
- **frame** `palettes-delete-all-dialog/` docs/tranches/X/audit/ui-evidence/value/palettes-delete-all-dialog/1440-light-0-pane.png, 1440-light-1-trigger-hover.png
- **observed** A lone 28x28 trash glyph floats at the right edge of an otherwise empty ~40px band between the dashed 'Start a new palette' card and the first saved card. The band exists only for this glyph and adds dead space. The glyph also sits far from the 'My Palettes 3' header badge that names its scope. The seat spec itself says 'in the pane header', and the tree does not match. The owner's docket names clutter and controls that do not earn their place.
- **expected + canon** A pane-scoped bulk action belongs in the pane header's action slot, beside the count Badge, or in an overflow menu on the saved-list section. It should not take its own layout row.
- **owner** **CONSUMER**: CONSUMER - demo/palettes/PalettesPane.vue:84-96
- **fix shape** Move the ghost icon Button into the Card header's trailing slot next to the count badge (or fold it into a header overflow menu with 'Delete all...') and delete the toolbar div. Keep the S.W5-7 quiet-ghost demotion (red only on hover/focus).

#### UIA-V-295 · MEDIUM · palettes-delete-all-dialog · Dialog title renders in Plus Jakarta Sans while every other heading on the page uses the app's Fraunces display voice

- **source** audit #4 · **verdict** AMENDED · **state** open, all viewports and themes · **where** PalettesPane.vue:125 DialogTitle
- **frame** `palettes-delete-all-dialog/` docs/tranches/X/audit/ui-evidence/value/palettes-delete-all-dialog/1440-light-4-dialog-crop.png, 1440-light-2-open.png
- **observed** probe2-log.json: dialogTitle font-family 'Plus Jakarta Sans'. The dock 'Palettes' label, 'My Palettes', the numeric readout and the empty-state heading are all Fraunces. The modal reads as a stock component pasted over a serif page.
- **expected + canon** The app's modal titles speak the same heading voice as its pane titles (COHESION, one idiom across surfaces).
- **owner** **CONSUMER**: CONSUMER - the app's typography rebrand does not reach glass DialogTitle (.text-subheading reads --font-text, glass DESIGN.md:887-889). The rebrand seam is DESIGN.md:698-702 (re-declare the bridge in the consumer's @theme).
- **fix shape** Re-declare the heading/text-title bridge in the value.js @theme so glass title slots inherit Fraunces app-wide. Do not add a one-off class on this DialogTitle.
- **confirm** The measurement is confirmed: probe2 dialogTitle is Plus Jakarta Sans and the pane headings are Fraunces. The proposed fix contradicts the app's own law. demo/DESIGN.md:16-22 says re-declaring @theme font bridges in the demo was the split-brain and has been deleted. It also says the display voice is fixed at the source token --font-stack-display, and Fraunces is only for display rungs, pane titles and section headings (:25-29). DialogTitle uses .text-subheading, which reads --font-text (glass DESIGN.md:889). Re-pointing that bridge would turn body and control text into Fraunces too. Corrected fix: a ruling is needed on whether a modal title counts as a section heading in the app voice. If it does, the seam belongs in GLASS: give DialogTitle a heading or display font slot the consumer can steer through --font-stack-display. It should not be a consumer @theme re-declaration. Lower to LOW/MEDIUM until that ruling.

#### UIA-V-296 · MEDIUM · palettes-delete-all-dialog · Irreversible destructive confirm is a plain role=dialog and is dismissed by a click outside

- **source** audit #5 · **verdict** CONFIRMED · **state** open · **where** PalettesPane.vue:121-142
- **frame** `palettes-delete-all-dialog/` docs/tranches/X/audit/ui-evidence/value/palettes-delete-all-dialog/1440-light-2-open.png (probe3-log.json openAfterOutsideClick: 0)
- **observed** The dialogRole capture returns ['dialog']. A pointer click on the scrim closes the confirm. The 'This cannot be undone' prompt is not announced as an alert.
- **expected + canon** A destructive confirmation should expose alertdialog semantics and require an explicit choice (WAI-ARIA alertdialog pattern; reka's AlertDialog does both).
- **owner** **GLASS**: GLASS - Dialog family (the 7.0.0 fold of ConfirmDialog into Dialog removed the alert/confirm axis: no role=alertdialog, no dismiss lock on outside pointer). The DESIGN.md:50 overlay row lists Dialog / Action Sheet with no confirm variant. · *glass component* Dialog · *head* open-at-HEAD
- **fix shape** GLASS: add a `role`/`intent="confirm"` axis on DialogContent that maps to reka AlertDialog semantics (role=alertdialog, outside-pointer dismiss disabled, Esc kept). CONSUMER: set it on this dialog once it ships.

#### UIA-V-297 · MEDIUM · palettes-delete-all-dialog · Dialog plate uses a weaker tier than the canon Overlay surface, so saved-card swatches bleed through the text area

- **source** audit #6 · **verdict** CONFIRMED · **state** open, light (worst) and dark · **where** PalettesPane.vue:123 `surface="glass"`
- **frame** `palettes-delete-all-dialog/` docs/tranches/X/audit/ui-evidence/value/palettes-delete-all-dialog/1440-light-4-dialog-crop.png, 390-light-2-open.png
- **observed** The computed plate is oklab alpha 0.705 (light) / 0.797 (dark) with blur(11px). The pink field and the Sunset Drift yellow/cyan blocks show as coloured smears behind the description and footer, most visible at 390.
- **expected + canon** A modal takeover reads on the .glass-overlay tier (95-96% opacity, 24px blur), so its text sits on a calm ground.
- **owner** **GLASS**: GLASS - DialogContent surfaceClass("floating") (src/components/dialog/DialogContent.vue:182) vs canon DESIGN.md:517 (Overlay: 95%/96% opacity, blur(24px) saturate(1.5), for dialogs) · *glass component* DialogContent (src/components/dialog/DialogContent.vue:182) · *head* open-at-HEAD
- **fix shape** GLASS: map Dialog's default surface to the overlay tier, or reconcile DESIGN.md:517 with the floating tier and document which is canon. CONSUMER: none beyond adopting it.

#### UIA-V-298 · MEDIUM · palettes-delete-all-dialog · The consumer is two or more glass majors behind, and three of this page's defects are already fixed upstream

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `palettes-delete-all-dialog/` p2-light-focus-delete.png, 390-light-2-open.png, 1440-dark-2-open.png
- **observed** The invisible focus (BK #80), the flush 390 plate (dialog inline-size clamp) and the dark destructive contrast (BK #31) are all fixed in glass v8.0.0. The biggest single remedy for this page is adopting a newer glass, not new glass work. The memory ledger notes that a glass 8/9 adoption is already planned (X-W0.j / F.W1 G1).
- **owner** **CONSUMER**: CONSUMER package.json (^7.0.0) with glass v8.0.0-v10.0.1 available

#### UIA-V-299 · MEDIUM · browse-view · 390 inverts the hierarchy: controls grow past the content (54px search bar with 21px text, 54×54 card menu, 281×54 'More' button) while the pane title stays at 25.9px

- **source** audit #6 · **verdict** CONFIRMED · **state** all, 390 · **where** Browse pane at 390
- **frame** `browse-view/` loaded__390__dark.png, error__390__light.png, empty__390__light.png, probe-dock__390__engaged.png
- **observed** Search input-bar is 324×54 with a 21px field font. Filter button is 44×44. The card ⋯ menu is 54×54 and fills the card's whole meta row down to its bottom edge. 'More from the commons' is 281×54, Retry is 91×54. The pane title is 25.9px, and the empty/error headline ('The commons is unreachable.') is about 26px bold on two lines, as large as the title. At 1440 the ratio is 41.9px title to 16.4px field.
- **expected + canon** The title outranks the controls, and a 44px touch target is met by the hit area, not by inflating the visible glyph plate.
- **owner** **GLASS+CONSUMER**: GLASS — the coarse-pointer control lift (glass-ui src/styles/tokens/sizing.css:17 comfort default + src/styles/utilities/responsive.css:4) enlarges the visible control instead of only its hit area. CONSUMER — demo/shared/ui/EmptyState.vue:9 (text-heading message at 390 matches the title) · *glass component* sizing.css (src/styles/tokens/sizing.css:17) · *head* open-at-HEAD
- **fix shape** GLASS: lift coarse targets with an invisible ::after hit-slop or padding and keep the visible icon-only plate at the sm rung. CONSUMER: step the EmptyState message down a rung (text-subheading) under the pane title.

#### UIA-V-300 · MEDIUM · browse-view · Search field radius does not match the canon and nests two radius systems (16px bar around a stadium button)

- **source** audit #7 · **verdict** CONFIRMED · **state** all · **where** Browse and My Palettes search bars
- **frame** `browse-view/` empty__1440__light.png, loaded__1440__dark.png
- **observed** The computed border-radius of .search-seated is 16px on a 36px single-line field (54px at 390), with a 9999px capsule button inside it and a 1.5px card-edge border plus a cartoon stamp. The bar is neither a stadium nor a card.
- **expected + canon** DESIGN.md:385-391: a single-line control or field takes --radius-control (stadium); 16px --radius-field is only for multi-line holders.
- **owner** **CONSUMER**: CONSUMER — installed @mkbabb/glass-ui 7.0.0 dist `.input-bar{border-radius:var(--radius-2xl)}`; glass HEAD moved it to `--radius-control` (glass-ui src/styles/utilities/components.css:16-21). The consumer needs a repin; demo/styles/utils.css:132-138 (.search-seated) adds a hard edge on top
- **fix shape** Repin to the glass release that ships --radius-control on .input-bar (or apply the role token until the repin). Fit the trailing button concentrically inside the bar. Relay: the owner's 'too rounded' docket should be checked against this role table in the glass-ui session.

#### UIA-V-301 · MEDIUM · browse-view · Hand-rolled atoms in the card row and filter popover instead of glass primitives

- **source** audit #8 · **verdict** CONFIRMED · **state** loaded / focus / filters · **where** PaletteCardMeta + SearchFilterBar
- **frame** `browse-view/` focus__1440__light.png, loaded__1440__light.png, filters__1440__light.png
- **observed** Tag chips and the +N counter are raw spans and buttons at radius 1.67e7px and 11px text. The count uses the glass Badge (Fira 16.4px) in the same row, so there are two chip species side by side. The vote button is a 4px rounded-sm plate with its own ring-2 focus ring, drawn as a thin square bracket in the focus frame, not the glass --focus-ring-shadow. The filter popover's 'Search' pill and count dot are also hand-rolled.
- **expected + canon** Glass Chip/Badge for tags and counters, glass Button (emphasis=text, size xs, icon) for vote and search, and the shared focus-ring (DESIGN.md: every control a glass primitive, tokens not literals).
- **owner** **CONSUMER**: CONSUMER — demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue:17-19 (tag <span rounded-full bg-muted/60>) and :28 (+N <button rounded-full ... text-micro>), and the vote <button rounded-sm ... focus-visible:ring-2 ring-ring/40> right after it · demo/palettes/browser/search/SearchFilterBar.vue:9 (count dot), :76 (color swatch trigger), :99 (in-field 'Search' button)
- **fix shape** Replace these with glass Chip or Badge (the +N as a Badge trigger for the Popover), Button emphasis=text for vote, and Button size=xs for the color Search. Drop the per-site ring-2 in favour of focus-ring.

#### UIA-V-302 · MEDIUM · browse-view · Tags are never visible at this pane's widths: every card shows a bare '+N' counter, even for a single tag

- **source** audit #9 · **verdict** CONFIRMED · **state** loaded, both viewports · **where** Card meta cluster
- **frame** `browse-view/` loaded__1440__light.png, loaded__390__dark.png
- **observed** The card is 462px at 1440 and 324px at 390, both inside band 0, so no tag chip ever renders. Forest Floor shows '+1' for its one tag 'nature', and Sunset Coast shows '+2'. A number stands in for a word, next to the unlabelled colour count and vote count (e.g. '6 +4 ♥27' on Neon Arcade).
- **expected + canon** Content over counters: at least the first tag is readable at the pane's normal width, and a counter shows only for overflow.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue:78-142 (band 0 = card width < 30rem → zero chips)
- **fix shape** Lower the band thresholds to the pane's real widths (e.g. one chip from 20rem), or render the first tag and '+N-1'. Consider dropping the colour-count badge, since the strip already shows N segments.

#### UIA-V-303 · MEDIUM · browse-view · Selected state has no selection register, and the unfurled detail repeats the strip

- **source** audit #10 · **verdict** CONFIRMED · **state** card selected · **where** PaletteInspector expanded
- **frame** `browse-view/` selected__1440__light__full.png, selected__1440__dark.png, probe-dock__390__engaged.png
- **observed** The selected card looks the same as its siblings apart from the unfurl: no ring, tint, or elevation. The detail band repeats the same 6 colours from the strip above as blob swatches with no hex labels, plus a bare accent stadium 'ada' chip with a copy glyph and no 'by' label.
- **expected + canon** STATES law: selected is visibly distinct. The inspector adds information (author line, hex values, dates, tags) rather than repeating the specimen.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/PaletteInspector.vue:18 (data-selected set, but no CSS reads it anywhere in demo/) · PaletteCardSwatches (the detail band)
- **fix shape** Style [data-selected] with the glass selected register (accent ring or elevation step). Turn the detail into an information row: 'by ada' with the copy action, the full tag list, and hex labels on the swatches (or drop the swatch row and let the strip segments be the swatch targets).

#### UIA-V-304 · MEDIUM · browse-view · The same verbs have three homes: card ⋯ menu, inline vote, and the dock palette scene

- **source** audit #11 · **verdict** CONFIRMED · **state** loaded / cardmenu / selected · **where** Browse card actions
- **frame** `browse-view/` cardmenu__1440__dark.png, probe-dock__390__engaged.png, loaded__1440__light.png
- **observed** The card menu offers Save, Remix, Export ›, Report. The dock scene for the same palette offers Save, Remix, Vote, Export. Vote is also inline on every card. Each act has two or three entry points with different glyph sets and labels ('Save' vs 'Save palette', 'Export ›' vs 'Export JSON').
- **expected + canon** Clutter law: one home per verb (the X-W4 SceneActionSet if the dock is the inspector), and one label per verb.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/PaletteInspector.vue:44-66 (PaletteCardMenu) + PaletteCardMeta vote + the dock SceneActionSet registration
- **fix shape** Decide the single home. If it is the dock scene, reduce the card menu to secondary or admin acts (Report, Versions, Tags) and keep the vote inline as the one exception. Align the labels.

#### UIA-V-305 · MEDIUM · browse-view · The error state says 'offline' three times, and 'working locally' is not true for the public wall

- **source** audit #12 · **verdict** CONFIRMED · **state** error (:3000 aborted) and retry · **where** Browse error EmptyState
- **frame** `browse-view/` error__1440__dark.png, error__1440__light.png, error__390__light.png, retry__1440__light.png
- **observed** Headline 'The commons is unreachable.', then a mono detail 'Failed to load palettes: Backend unreachable — working locally.', plus the global chip 'BACKEND OFFLINE — SAVED LOCALLY' at the top right (at 390 it shrinks to an unlabelled dot pill). The public wall has no local fallback, so 'working locally' misleads. Retry gives no visible pending feedback: after the click (still aborted) the frame is unchanged.
- **expected + canon** One clear statement plus an action, with the machine detail only when it adds information.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/BrowsePane.vue:55-72 (message + :detail=pm.browseError) · demo/palettes/useBrowsePalettes.ts:95 ("Failed to load palettes: ${...}")
- **fix shape** Drop the 'Failed to load palettes:' prefix and the local-fallback clause for this surface. Omit the detail when the global offline chip is showing. Show a pending state on Retry (Button loading, or the developing plates).

#### UIA-V-306 · MEDIUM · browse-view · The filter popover is sparse and mixes species: 57px rows for one-line radios, radio dot plus icon glyphs, truncated hex field

- **source** audit #13 · **verdict** CONFIRMED · **state** filters open · **where** Browse filter popover
- **frame** `browse-view/` filters__1440__light.png, filters__390__dark.png
- **observed** Three sort options and two tier options sit about 57px apart, so the popover is about 470px tall for five one-line choices. Each row carries a radio dot and a lucide icon. Section labels are mono uppercase and items are sans. The Tier 'All/Featured' pair is a two-row radio. The hex input placeholder truncates to '#hex, …' / '#hex…' under a hand-rolled in-field 'Search' pill.
- **expected + canon** A menu-density chooser using glass idioms: glass Menu radio items or a segmented Tabs control for sort, a Toggle/Switch for 'Featured only', and a full-width field.
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/palettes/browser/search/SearchFilterBar.vue:16-104 (RadioGroup in a w-60 popover; Input with an absolute 'Search' button). GLASS note — RadioGroup has only the 44px form pitch (glass-ui src/components/radio-group/styles.css:6-15) and no dense menu register · *glass component* RadioGroup / menu radio items (radio-group/styles.css:6-15) · *head* open-at-HEAD
- **fix shape** Rebuild as a glass Menu with radio items (or Tabs for sort) and a Switch for Featured. Place the colour search on its own row: swatch trigger, a full-width Input, and a glass Button. Relay to glass: a dense or menu RadioGroup register, if the menu component does not already cover this.

#### UIA-V-307 · MEDIUM · browse-view · Hover state is effectively invisible on a cursor-pointer card

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `browse-view/` cmp-hover-vs-rest__1440__light.png, hover__1440__light.png
- **observed** The hover and rest crops of Forest Floor are nearly identical: no lift, ring or tint change you can see. The audit captured the hover matrix but filed nothing on it.
- **owner** **CONSUMER**: CONSUMER — PaletteInspector.vue .palette-card (cursor-pointer, no hover register)
- **fix shape** Give the card a visible hover register (elevation step or edge tint) that shares the selected register's family.

#### UIA-V-308 · MEDIUM · browse-search-filter · MiniColorPicker is a hand-rolled HSV picker (own conversion math, literal hue gradient) inside a colour library whose app already has a picker

- **source** audit #7 · **verdict** CONFIRMED · **state** Find by Color popover open / after SV drag · **where** /#/browse · Find by Color popover
- **frame** `browse-search-filter/` mini-picker-open-390-light.png, mini-picker-dragged-390-dark.png, p2-mini-picker-open-1440-dark.png
- **observed** A third colour-picking idiom on the site, after the home picker and the dock colour input: sRGB-HSV, where the app's canon space is OKLCH. Its conversions duplicate value.js's own parseColorIn/convert. Its radii (8px canvas, stadium hue strip, round thumbs) are literals, not role tokens. The 8px canvas matches no role: --radius-media is 10px (DESIGN.md:385). The dragged SV thumb and output readout work, and hover mutation after release did not reproduce.
- **expected + canon** Cohesion: one picker idiom across the app, reusing the home picker's slider/space primitives or a glass Slider, with radii from the role table (--radius-media for the 2D field, --radius-control for a single-line strip).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/MiniColorPicker.vue:8-40 (SV canvas rounded-lg 8px, hue strip literal gradient '#f00,#ff0,…' at :29, thumbs rounded-full border-white literals :20,:37), :127-147 (hand-written HSV→hex), :151-167 (hand-written hex→HSV), :195-199 (literal #000/#fff gradients)
- **fix shape** Reuse the color-picker's existing 2D field and hue-slider components, or glass Slider for hue, and value.js conversions. Delete the local HSV math and gradient literals, and use radius role tokens.

#### UIA-V-309 · MEDIUM · browse-search-filter · Radio rows are 44px tall and checkbox rows about 29px, so the filter list has a broken vertical rhythm

- **source** audit #8 · **verdict** AMENDED · **state** filters popover open · **where** /#/browse · Filters popover · Sort/Tier vs Tags
- **frame** `browse-search-filter/` filters-open-1440-light.png, filters-open-390-light.png, active-filters-popover-390-dark.png
- **observed** The radio measures 44x44 at both 1440 (fine pointer) and 390. Sort and Tier rows repeat every ~52px, with large dead gaps between 'Newest', 'Most Popular' and 'Most Forked'. Tag checkbox rows (16x16 box) repeat every ~29px in the same panel. The label row is 31px while the radio inside it is 44px, so the hover wash (6px --radius-md, off the role table) is drawn on a shorter box than the control.
- **expected + canon** Controls of one register (one-of-N and many-of-N in the same list) share one row pitch. The touch floor is a coarse-pointer concern and should come from a hit-slop, not layout. DESIGN.md role table: the list row radius should be a role token, not --radius-md.
- **owner** **GLASS+CONSUMER**: GLASS RadioGroupItem (src/components/radio-group/RadioGroupItem.vue:30-34 + styles.css:7 — the 44px seat is in flow, while Checkbox takes a 16px layout box) + CONSUMER SearchFilterBar.vue:238-246 (.filter-option padding 4px 8px added on top of the seat) · *glass component* RadioGroupItem (radio-group/RadioGroupItem.vue:30-34) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** GLASS: RadioGroupItem and Checkbox share one seat rule, with the in-flow 44px only on (pointer:coarse) or via pseudo hit-slop; route to the glass session. CONSUMER: remove the per-option padding and use the glass menu/list row interior for the option rows.
- **confirm** The 7.0.0 paint is confirmed: the manifest has radio at 44x44 and checkbox at 16x16, and FAIL-1440-light shows ~52px radio pitch against ~30px tag pitch. The glass half of the fix is out of date, though. At glass HEAD, Checkbox.vue:38 composes `checkbox control-bit`, and control-bit.css:142-152 gives every control-bit an in-flow max(var(--touch-target)=44px, face) seat with no pointer query. So HEAD already unifies the pitch, but at 44px for both, which makes the tag list ~44px per row and the popover taller (it worsens the overflow finding). The glass route should be: 'the 44px in-flow seat (control-bit.css:142) should be (pointer:coarse)-only or a pseudo hit-slop, so fine-pointer list rows are not 44px'. It should not ask to share a seat rule, which HEAD already does. The consumer .filter-option padding and --radius-md hover wash (:241-245) are confirmed.

#### UIA-V-310 · MEDIUM · browse-search-filter · The Filters trigger uses a kebab (⋮) icon, is 32x40 instead of square, and overhangs the search bar

- **source** audit #9 · **verdict** CONFIRMED · **state** filters idle / keyboard focus · **where** /#/browse · search bar right end
- **frame** `browse-search-filter/` idle-1440-dark.png, focus-trigger-1440-light.png, p2-active-filters-closed-1440-light.png
- **observed** The trigger measures 32x40 (1440) inside a 36px-tall bar (bar y 309-345, trigger y 307-347), so an oval capsule sticks out above and below the bar's edge. Its focus ring draws outside the bar, alongside the bar's own focus-within ring (two concentric rings at once). The icon is a vertical ellipsis, the 'more actions' glyph, while each card on the same page uses a horizontal '…' for its menu. So two different 'more' glyphs appear, and neither says 'filter'.
- **expected + canon** A filter affordance reads as filter (SlidersHorizontal/ListFilter). An icon-only control is square at the glass icon-only rung and nests concentrically inside its field (DESIGN.md Law 1, the concentric relay). One focus indicator at a time.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/SearchFilterBar.vue:5-6 (EllipsisVertical icon; class 'h-8 w-8' fighting the glass Button icon-only touch floor)
- **fix shape** Use a filter icon and drop the h-8/w-8 override so the glass icon-only size nests inside the bar. Suppress the shell's focus-within ring when focus is on the trailing button (or ring only the button).

#### UIA-V-311 · MEDIUM · browse-search-filter · The browse search field is 16px-cornered (the multi-line role) instead of the single-line stadium, through a consumer override

- **source** audit #10 · **verdict** AMENDED · **state** filters idle · **where** /#/browse (and the sibling My Palettes search)
- **frame** `browse-search-filter/` idle-1440-light.png, idle-390-dark.png
- **observed** The .input-bar.search-seated shell computes border-radius 16px on a 36px (1440) / 54px (390) single-line field, and carries a --shadow-cartoon-sm stamp and a 1.5px edge. The color field inside the same popover is a 9999px stadium, so the page has two radii for single-line text fields. The SearchBar import only resolves because value.js is still on glass 7.0.0; at glass 10.0.1 './search' no longer exists.
- **expected + canon** DESIGN.md:385-391: --radius-control = stadium for single-line controls/fields; --radius-field 16px is for multi-line holders only. At HEAD the canon path is the .input-bar recipe on a glass Input.
- **owner** **GLASS+CONSUMER**: CONSUMER demo/styles/utils.css:132-155 (.search-seated interim override) + demo/palettes/BrowsePane.vue:9-13 (SearchBar from @mkbabb/glass-ui/search, a subpath DELETED at glass BK #42 — glass-ui MIGRATION.md:403) · *glass component* .input-bar radius (styles/utilities/components.css:20) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** At the repin, replace SearchBar with glass Input + the .input-bar recipe, per MIGRATION.md:403. Delete the .search-seated fork (its own comment books that swap) and let the field take --radius-control. Note: the owner's 'pills too rounded' complaint targets cards and holders, not this single-line field.
- **confirm** The 16px radius is real (manifest searchShell radius 16px), but the owner is wrong. utils.css:132-138 .search-seated sets background, border, shadow and max-width, and does NOT set border-radius. The 16px comes from glass 7.0.0's own recipe: node_modules/@mkbabb/glass-ui/dist/styles/utilities/components.css `.input-bar { border-radius: var(--radius-2xl) }`. glass HEAD already cures it (src/styles/utilities/components.css:20 `border-radius: var(--radius-control)`). Owner should be GLASS@7.0.0, cured at HEAD, and needs the repin. The consumer part that remains is the BrowsePane.vue:229 import from '@mkbabb/glass-ui/search', a subpath deleted at HEAD (MIGRATION.md ~:397-404, confirmed), plus the .search-seated border and stamp fork.

#### UIA-V-312 · MEDIUM · browse-search-filter · Tag checkboxes render as circles, the same silhouette as the Sort/Tier radios

- **source** audit #11 · **verdict** CONFIRMED · **state** filters popover open / tag selected · **where** /#/browse · Filters popover · Tags
- **frame** `browse-search-filter/` filters-open-1440-light.png, active-filters-popover-390-dark.png
- **observed** Unchecked tag boxes are 16px circles, the same shape as the unchecked radios directly above them, so one-of-N and many-of-N look identical at rest. The checked 'retro' box shows a tick inside a circle.
- **expected + canon** glass HEAD checkbox styles.css:9-12: 'a checkbox was a CIRCLE and therefore silhouette-identical to an unchecked radio … the one thing the two shapes exist to say.' The checkbox should use the 6px tick corner.
- **owner** **GLASS**: GLASS Checkbox at the installed 7.0.0 (computed border-radius 9999px); cured at glass HEAD src/components/checkbox/styles.css:1-20 (--control-bit-radius: --radius-md, the 6px tick corner) — needs the value.js repin · *glass component* Checkbox (src/components/checkbox/styles.css:1-20) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** No consumer change. Repin to glass ≥10.0.1 (the COHESION §0bo repin wave), then re-measure.

#### UIA-V-313 · MEDIUM · browse-search-filter · The hand-rolled inline 'Search' button and swatch trigger are off the glass primitives; MiniColorPicker's Search button is squashed into a 44px circle

- **source** audit #13 · **verdict** CONFIRMED · **state** Find by Color popover open · **where** /#/browse · Find by Color
- **frame** `browse-search-filter/` filters-open-390-light.png, mini-picker-open-390-light.png, p2-mini-picker-open-1440-dark.png
- **observed** The inline Search button is 53x24 with 11px text in a pill, drawn in a raw element over the field's padding. MiniColorPicker's glass Button is forced to h-6, but the coarse-pointer touch floor wins at 390, so it renders as a large grey 44px circle labelled 'Search' (mini-picker-open-390-light). At 1440 it is a small capsule. One control therefore has two unrelated shapes across viewports.
- **expected + canon** Controls are glass primitives at their own size rungs: Button size='sm'/'xs', not class overrides. A field's trailing action uses the glass Input's trailing slot or the .input-bar recipe. Radii come from role tokens (--radius-control), not rounded-full literals.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/SearchFilterBar.vue:73-77 (raw <button> swatch: rounded-full border-2 shadow-cartoon-sm), :97-104 (raw <button> 'Search' absolutely positioned inside the Input: h-6 rounded-full text-micro bg-muted/50 literals); MiniColorPicker.vue:51-57 (glass Button forced to 'h-6 px-2 text-micro')
- **fix shape** Replace the raw buttons with glass Button (size rung, no h-/px- overrides) and the swatch with the app's shared swatch primitive. Once the duplicate is removed (see the Find-by-Color finding), keep one Search action.

#### UIA-V-314 · MEDIUM · browse-search-filter · At 390 the search field's text is larger than on desktop and larger than its own shell font

- **source** confirm miss #1 · **verdict** MISSED (confirm seat) · **where** /#/browse and My Palettes search, 390x844
- **frame** `browse-search-filter/` active-filters-closed-390-light.png, mini-picker-open-390-light.png (manifest-pass2 searchInput font 21px/31.5px at 390 vs 16.4px at 1440; searchShell font 16px at 390)
- **observed** The field text and placeholder are 21px on a phone and 16.4px on desktop, so the phone scale is inverted. 'Search palettes...' is the loudest text in the Browse pane after the display title, and the field is 54px tall. /#/browse and My Palettes search, 390x844
- **owner** **GLASS+CONSUMER**: GLASS@7.0.0 (.input-bar-field font-size: var(--control-pill-text, var(--control-text)) scaling with the coarse/touch rung) + CONSUMER .search-seated (utils.css:152 font-family: inherit only) · *glass component* .input-bar --control-pill-text · *head* open-at-HEAD
- **fix shape** Keep one control text size (16px holds the iOS no-zoom floor) and do not scale it up on coarse pointers. Re-check at glass HEAD after the repin.

#### UIA-V-315 · MEDIUM · tag-edit-popover · Checkbox renders as a circle (radio shape), and a checked box under the pointer loses its fill

- **source** audit #5 · **verdict** CONFIRMED · **state** tag added, tag removed, hover · **where** /#/browse, tag added / removed
- **frame** `tag-edit-popover/` 1440-light-04-tag-added.png, 1440-dark-04-tag-added.png, 1440-light-09-save-failed-open.png, 390-dark-09-save-failed-open.png
- **observed** The checkboxes compute border-radius 9999px (16x16). A just-checked box still under the pointer draws as an outline ring with a thin tick and no fill, unlike a checked box at rest. It reads as half-checked in both themes.
- **expected + canon** The glass 10 tick corner (6px, glass-ui checkbox/styles.css) so many-of-N does not look like one-of-N, and a checked box that looks the same under hover as at rest.
- **owner** **GLASS+CONSUMER**: GLASS checkbox at the installed 7.0.0 (glass 10.0.1 src/components/checkbox/styles.css already sets the 6px corner via --control-bit-radius: var(--radius-md), per D1). CONSUMER repin: value.js package.json:88 is "@mkbabb/glass-ui": "^7.0.0" · *glass component* Checkbox (src/components/checkbox/styles.css) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** Repin value.js to glass-ui 10.x, then re-capture 04/09. If the hover-loses-fill problem is still there, route it to glass (checkbox checked+hover material).

#### UIA-V-316 · MEDIUM · tag-edit-popover · Tag names are truncated to make room for a category label repeated on every row

- **source** audit #6 · **verdict** CONFIRMED · **state** open (scrolled) · **where** /#/browse, list scrolled to the end
- **frame** `tag-edit-popover/` 1440-light-07-list-scrolled.png
- **observed** 'minimal' shows as 'mini…' and 'autumn' as 'au…', while 'STYLE' and 'SEASON' in mono caps keep full width. The category label repeats on every row (MOOD, MOOD, STYLE, STYLE…).
- **expected + canon** HIERARCHY/CLUTTER: the tag name is the primary content. Category is a grouping and belongs as a heading once per group, not a label on every row.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/TagEditPopover.vue:6 (literal w-52 = 208px) + :32-33 (the name truncates while the category is shrink-0)
- **fix shape** Group the rows under one category heading each and drop the per-row label; size the panel to its content (min-w) instead of w-52.

#### UIA-V-317 · MEDIUM · tag-edit-popover · On mobile, rows are below the touch floor and the scroll list cuts a row in half with no fade

- **source** audit #7 · **verdict** CONFIRMED · **state** open · **where** /#/browse at 390x844
- **frame** `tag-edit-popover/` 390-light-02-open.png, 390-dark-09-save-failed-open.png
- **observed** At 390, rows are 27.6px high and the checkbox is 16x16. The 160px list cuts the 'ocean' row in half, with no fade edge or other sign that it scrolls.
- **expected + canon** Coarse-pointer targets of at least 44px (the floor glass/chip/README.md states for interactive controls on coarse pointers). A scroll region uses glass FadingScroll (src/components/fading-scroll).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/TagEditPopover.vue:21 (max-h-40 overflow-y-auto scrollbar-thin) and :25 (py-1 rows)
- **fix shape** Use item-height tokens or a coarse-pointer row height of at least 44px; wrap the list in FadingScroll; on mobile move the editor to a Sheet (see the anchor finding).

#### UIA-V-318 · MEDIUM · tag-edit-popover · Each click sends its own PATCH, with no pending state and the saved palette thrown away

- **source** audit #8 · **verdict** CONFIRMED · **state** tag added / removed · **where** /#/browse, tag added then removed
- **frame** `tag-edit-popover/` 1440-light-04-tag-added.png, 1440-light-05-tag-removed.png; PATCH bodies and If-Match in log-1440-light.json rec.patches
- **observed** Two clicks sent two independent PATCHes with the same If-Match "h2" and nothing showed a save in progress. The palette returned by the server is never written back, so a palette with currentHash null (ETag = updatedAt, api/src/modules/palette/etag.ts:29) would send a stale If-Match on the next toggle. That would be a 412 (PLAUSIBLE: not reproduced, my mock kept currentHash).
- **expected + canon** STATES: a visible pending state per change. The client adopts the saved palette so its next validator is current.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/TagEditPopover.vue:64-78 (the saveTags return value is discarded; nothing marks a row pending) + demo/palettes/useTagEdit.ts:65-89
- **fix shape** Write the returned palette into remotePalettes (slug match). Queue the saves one at a time, or debounce into a single PATCH on close. Disable or mark the row while its save is in flight.

#### UIA-V-319 · MEDIUM · tag-edit-popover · A refused tag-catalog GET raises the app-wide 'BACKEND OFFLINE — SAVED LOCALLY' pill

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `tag-edit-popover/` 1440-light-12-catalog-unreachable.png (top-right pill; log-1440-light 12-catalog-down alerts[0]='backend offline — saved locally')
- **observed** In the capture, only /tags was aborted (capture.mjs:44), and sessions and palettes returned 200. The global pill still declared the whole backend offline and claimed local saving, which the tag editor does not do.
- **owner** **CONSUMER**: CONSUMER (the backend-health signal that the tags fetch failure feeds; locate its source under demo/ in the owning seat)
- **fix shape** Keep catalog failure local to the editor (see the catalog-error finding). Don't let one resource's failure trip the global offline state, or at least don't add 'saved locally' for a non-save read.

#### UIA-V-320 · MEDIUM · version-history-drawer · Palette rendered as overlapping 20px circles, unlike every other palette surface

- **source** audit #7 · **verdict** CONFIRMED · **state** open with versions · **where** open with versions
- **frame** `version-history-drawer/` open-versions__1440__light.png vs the Browse cards behind it (stripe bands)
- **observed** Rows show `-space-x-0.5` rounded-full dots, capped at 8 plus '+N'. Browse and Palettes cards render the same palette as a flat stripe band (PaletteSpecimen). The drawer invents a third palette depiction.
- **expected + canon** COHESION: one palette depiction app-wide. A version row shows the same specimen strip as the card, so versions can be compared against the card at a glance.
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:51-64)
- **fix shape** Reuse the PaletteSpecimen stripe (compact height) in the row and drop the hand-rolled dot stack.

#### UIA-V-321 · MEDIUM · version-history-drawer · Row radius is an 8px literal, while sibling palette wells use rounded-card (16px)

- **source** audit #8 · **verdict** CONFIRMED · **state** open with versions · **where** open with versions
- **frame** `version-history-drawer/` open-versions__1440__light.png (manifest row radius 8px; dialog 16px)
- **observed** `rounded-lg border border-border bg-well p-3` resolves to 8px. demo/DESIGN.md:200 puts palette cards on `rounded-card` (= --radius-card 16px), and glass DESIGN.md:385-391 gives content cards --radius-card. The same WELL tier (demo/DESIGN.md:104, which names 'VersionHistoryDrawer rows' beside PaletteCard) is drawn at two radii.
- **expected + canon** Rows on the canon role token: rounded-card (or the glass Card primitive), matching PaletteCard.
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:25)
- **fix shape** Replace rounded-lg with rounded-card, or render each row as the glass Card at well tier. The `ring-2 ring-primary` plus inset-bar selected state should use the app's selected-card treatment.

#### UIA-V-322 · MEDIUM · version-history-drawer · Action labels render italic (text-caption on buttons) and pass the retired `variant` prop

- **source** audit #9 · **verdict** AMENDED · **state** hover / load more · **where** row hover · load more
- **frame** `version-history-drawer/` row-hover__1440__dark.png ('Revert' italic), load-more__390__light.png ('Load older versions' italic, 148x54 stadium)
- **observed** probe-italic.mjs shows the utilities-layer `.text-caption` painting font-style: italic at installed glass 7.0.0. Canon 10.0.1 has caption upright (glass src/styles/typography/semantic.css:224-229; DESIGN.md:893). The consumer also passes `variant="outline"` and `variant="ghost"`, which glass Button no longer has. Both fall through as raw DOM attrs and render as data-emphasis=secondary, so the intended quiet 'Load older' matches the row action. glass Button.vue:127-143 logs these as retired.
- **expected + canon** Button labels take the Button's own size typography, and emphasis comes from `emphasis` ("quiet"/"text" for Load older).
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:77-79,90-92)
- **fix shape** Drop `text-caption` from both buttons. Use `emphasis="secondary"` for Revert and `emphasis="quiet"` or `"text"` for Load older. Italic captions then clear at the glass repin.
- **confirm** The italic half is CONFIRMED. The installed node_modules/@mkbabb/glass-ui 7.0.0 dist/styles/typography/semantic.css defines `@utility text-caption {... font-style: italic ...}`, while canon src/styles/typography/semantic.css:224-229 has no italic. Revert and 'Load older versions' render italic in row-hover__1440__dark and load-more__390__light, and text-caption is still on both buttons at HEAD (:78, :90). The variant half is already cured at HEAD: 69c0d255 deleted variant="outline"/"ghost" after the capture at f95a2f77. What is left is that both buttons now carry no emphasis, so both default to secondary. 'Load older' still needs emphasis="quiet" or "text".

#### UIA-V-323 · MEDIUM · version-history-drawer · Loading shows '0 versions' and a bare spinner instead of a skeleton

- **source** audit #10 · **verdict** CONFIRMED · **state** loading · **where** loading
- **frame** `version-history-drawer/` loading__1440__dark.png, loading__390__light.png
- **observed** The description reads 'Harbour Dusk — 0 versions' while the request is pending, because total is reset to 0 on open. The body is a lone 20px Loader2 spinner. The app's own loading idiom for palettes is the PaletteCard skeleton (a shared shell, demo/DESIGN.md:104), and glass ships Skeleton.
- **expected + canon** The count is withheld or shown from palette.versionCount while loading. The list area shows glass Skeleton rows in the row geometry.
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:10-19,162-164)
- **fix shape** Seed the description from palette.versionCount (or hide the count while loading). Render 3 Skeleton rows at row height in place of Loader2.

#### UIA-V-324 · MEDIUM · version-history-drawer · Revert is offered on other users' palettes, and restore has no confirm or pending state

- **source** audit #11 · **verdict** CONFIRMED · **state** restore · **where** other user's palette · restore
- **frame** `version-history-drawer/` other-user-24__1440__light.png (revertButtons=20 on a gallery-owned palette), restore-error__1440__light.png ('Revert failed: Forbidden' on the occluded card)
- **observed** The drawer gets no ownership prop, so every non-current row offers Revert on a palette the viewer does not own. The server answers 403 (requireOwnership), and the failure paints behind the scrim. A click fires a whole-payload replace immediately, with no confirmation, no disabled or pending state on the button, and nothing to stop a double-click.
- **expected + canon** A read-only history for non-owners. For owners, a confirm step (or undo) and a pending button during the request, as with the app's other destructive verbs.
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:75-84 · BrowsePane.vue:161-169)
- **fix shape** Pass `canRevert` from BrowsePane (palette.userSlug === pm.userSlug). Hide the action for non-owners. Wrap revert in a pending ref and disable the button while it is in flight. Add an inline confirm or a 'Reverted — Undo' verdict.

#### UIA-V-325 · MEDIUM · version-history-drawer · Phone presentation is a 293px right sheet with page ghosting through it

- **source** audit #12 · **verdict** AMENDED · **state** all (phone) · **where** 390x844 · all states
- **frame** `version-history-drawer/` open-versions__390__light.png, empty-history__390__dark.png (Browse card text legible through the plate)
- **observed** At 390 the right drawer is 293px wide and leaves a 97px strip. The plate is glass-floating at alpha 0.70 (light) / 0.80 (dark) with computed backdrop-filter none on the element, so the pane behind ('Harbour… 4', 'Galler…') reads through the drawer. The header also flips to centred while the desktop header is left-aligned.
- **expected + canon** On phone width, a bottom sheet with detents (glass 10 SheetContent), or a full-width side sheet on an opaque-enough room material so the content under the drawer is not legible.
- **owner** **GLASS+CONSUMER**: GLASS (Dialog placement="right" at 7.0.0 → canon SheetContent + detents at 10.0.1: src/components/sheet/index.ts, src/components/dialog/styles.css:14-22) · *glass component* SheetContent (src/components/sheet/index.ts) · *head* open-at-HEAD
- **fix shape** GLASS: route to the glass-ui session to confirm the side-sheet material density and the phone placement rule (right→bottom under a breakpoint). CONSUMER: adopt SheetContent at the repin wave (§0bo) instead of Dialog placement="right".
- **confirm** The observation is CONFIRMED in open-versions__390__light: the plate starts at about x97 and is 293px wide, the Browse cards bleed through its left edge, and the header is centred at 390 but left-aligned at 1440. The owner should be split rather than GLASS only. Canon glass already ships SheetContent + detents (src/components/sheet/{SheetContent.vue,detents}), and glass DESIGN.md:48 puts sheets on the frosted Resting material. So the material and placement are a CONSUMER repin/adopt item at 7.0.0, and GLASS only needs to confirm the phone placement rule (right to bottom). A glass-side drift was also found: DESIGN.md:389 says --radius-dialog is 16px and matches the card (F48), but canon dialog/styles.css:14-22 and sheet/styles.css:391-402 author the room at --radius-3xl, 24px. Route that doc/source contradiction to the glass-ui session.

#### UIA-V-326 · MEDIUM · version-history-drawer · glass DESIGN.md radius table contradicts the canon dialog/sheet source (16px vs 24px)

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `version-history-drawer/` The table row says `--radius-dialog` resolves to var(--radius-card), 16px, 'matches the card — F48'. The canon dialog partial says 'The plate is a ROOM (24px)' and sets border-radius: var(--radius-3xl), and the sheet corners also use --radius-3xl. This is the authority the audit's radius calls rest on, and it is self-contradictory. Relay it to the glass-ui session to fix at the root.
- **observed** The table row says `--radius-dialog` resolves to var(--radius-card), 16px, 'matches the card — F48'. The canon dialog partial says 'The plate is a ROOM (24px)' and sets border-radius: var(--radius-3xl), and the sheet corners also use --radius-3xl. This is the authority the audit's radius calls rest on, and it is self-contradictory. Relay it to the glass-ui session to fix at the root.
- **owner** **GLASS**: GLASS (DESIGN.md:389 vs src/components/dialog/styles.css:14-22, src/components/sheet/styles.css:391-402) · *glass component* DESIGN.md (src/components/dialog/styles.css:14-22,) · *head* open-at-HEAD
- **fix shape** GLASS: reconcile the DESIGN.md radius role table with the room role (add --radius-room/24px, or restate --radius-dialog).

#### UIA-V-327 · MEDIUM · flag-report-dialog · The one palette dialog off the confirm idiom: ✕ plus Cancel as two dismiss affordances, default surface, literal width

- **source** audit #4 · **verdict** AMENDED · **state** open · **where** FlagReportDialog.vue:3 (`<DialogContent class="sm:max-w-md">`)
- **frame** `flag-report-dialog/` 1-open-1440-light.png, 1-open-390-dark.png
- **observed** Every sibling palette dialog composes `<DialogContent surface="glass" :show-close="false">` (BrowsePane.vue:185, PalettesPane.vue:123, AdminTagsPanel.vue:159, AdminUsersPanel.vue:213, AdminFlaggedPanel.vue:179, AdminNamesPanel.vue:148). This one keeps the ✕ next to a Cancel button, so there are two ways to dismiss (clutter). It also sets width with a Tailwind literal `sm:max-w-md` (448px measured) instead of the producer's width rule.
- **expected + canon** One dialog idiom across the palette scenes (cohesion law, COHESION §0bl): the same surface, the same dismiss rung, and width from the producer.
- **owner** **CONSUMER**: CONSUMER — FlagReportDialog.vue:3
- **fix shape** Compose like the siblings: surface="glass", one dismiss (drop the ✕ or drop Cancel, the same way the siblings do), and remove `sm:max-w-md`. When the pin moves to glass ≥ 8, use the `dismiss` rung spelling, as BrowsePane.vue:181-184 notes.
- **confirm** The '✕ plus Cancel' part is confirmed (1-open-1440-light shows both), and so is the width literal: `sm:max-w-md` at :3, measured w=448. The 'default surface' part is REFUTED. The glass 7 DialogContent default is `surface: { default: "glass" }` (dist/dialog-TNRDkcE4.js:206), and manifest metrics record surface 'glass', blur 11px on this dialog. The siblings' `surface="glass"` is redundant, not a difference. The real divergence is only showClose (default true, :210-212) and the width literal.

#### UIA-V-328 · MEDIUM · flag-report-dialog · Phone: full-bleed dialog with no gutter, a 16×16 ✕ hit box, and a stacked footer of two 340×60 stadium pills — stale glass 7 pin (fixed at glass HEAD)

- **source** audit #5 · **verdict** CONFIRMED · **state** open at 390x844 · **where** package pin @mkbabb/glass-ui 7.0.0; glass HEAD dialog/styles.css:25, :86-94, :96-110
- **frame** `flag-report-dialog/` 1-open-390-dark.png, 2-reason-selected-390-light.png, 1b-open-tab-focus-390-dark.png
- **observed** At 390 the dialog is x=0, w=390: flush to both screen edges, with 16px corners at the bezel. The ✕ is 16×16 (below the 44px touch target). The footer stacks Report above Cancel as two full-width 340×60 stadium capsules with 21px labels. These are the heaviest things in the dialog, and they are exactly the 'too rounded pills' the owner named. Headers center on phone but left-align on desktop.
- **expected + canon** Glass HEAD 10.0.1 already has the fixes: inline-size min(100% - 2*--space-section, 32rem) (dialog/styles.css:25); a 44×44 ✕ (:100-110, --touch-target); the footer 'a row at EVERY viewport' with Cancel before the confirm (:86-94); the room radius 24 (:14-22). The radius canon puts the stadium on single-line controls only (DESIGN.md:385-391), and the owner asked that pills read more card-like.
- **owner** **GLASS+CONSUMER**: CONSUMER (glass pin 7.0.0 → repin wave, COHESION §0bo). GLASS only if the 60px/21px control scaling persists after the repin · *glass component* Dialog footer controls under --ui-scale (verify after repin) · *head* open-at-HEAD
- **fix shape** Repin to current glass in the consumer repin wave, then re-measure at 390. If buttons still render ≥ 56px tall with 21px text at compact width, route it to the glass session: control-h/ui-scale at the compact breakpoint makes dialog footer buttons too large.

#### UIA-V-329 · MEDIUM · flag-report-dialog · Weak type hierarchy and near-invisible unselected radios in light theme

- **source** audit #6 · **verdict** AMENDED · **state** open · **where** FlagReportDialog.vue:8-11, :17-26
- **frame** `flag-report-dialog/` 1-open-1440-light.png, 2-reason-selected-1440-light.png, 2-reason-selected-390-light.png
- **observed** Title: Fraunces 500, 20.35px. Option labels (`text-small`): 16.4px. Description: 14px. The question that frames the choice is smaller than its answers, and the title is only 1.24x the options, so the header barely separates from the body. In light theme the unchecked radio rings are pale discs on pink glass and are almost invisible (1-open-1440-light). Only the checked item reads.
- **expected + canon** Title > description ≥ options, on the glass type steps. The rest state of a radio should meet 3:1 against the glass surface (the same bar glass HEAD applied to the ✕: 'Rest ink … at ≥3:1', dialog/styles.css:96-98).
- **owner** **GLASS+CONSUMER**: CONSUMER for the scale (FlagReportDialog.vue:8, :23). GLASS for the radio rest ring (radio-group/styles.css:25-29, RadioGroupItem) · *glass component* RadioGroupItem (styles.css:25-29,) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** Consumer: drop the `text-small` override so labels take the RadioGroup/Label default step, and let DialogDescription sit at the body step. Glass: raise the RadioGroupItem rest ring contrast on glass surfaces. Relay to the glass session.
- **confirm** The type scale is confirmed: title Fraunces 20.35px, labels 16.4px (`text-small`), description 14px. The radio rest contrast is confirmed in light (1-open-1440-light, 3a-submitting-1440-light). It is also weak in dark, so extend the scope to both themes: in 2-reason-selected-1440-dark and 3d-submitted-fail-1440-dark the unchecked rings are dark-on-dark and barely visible. For the GLASS owner call: at 7.0.0 the rest face is `border: 1px solid var(--control-ring)` over a 72% wash (dist radio-group/styles.css). Glass HEAD has moved the item to `.control-bit` with `--control-bit-edge` color-mix (control-bit.css:140-263). Re-measure the rest ring after the repin and relay it to glass only if it is still below 3:1.

#### UIA-V-330 · MEDIUM · flag-report-dialog · Double-submit and cancel race during the in-flight window

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `flag-report-dialog/` Source; 3a-submitting-1440-light shows Cancel live and the radios re-enabled
- **observed** The form resets immediately and nothing is locked, so while the first POST is pending the user can pick a reason again and press Report, which sends a second POST for the same palette. Cancel or Esc can also close the dialog mid-flight: onFlagOpenChange(false) nulls flagPalette, but the pending onFlagSubmit still holds `palette` and later pops a verdict for a dialog the user dismissed. The pending/loading fix in finding 1 must also lock the radios, the textarea and the dismiss path, or ignore a second submit. Source; 3a-submitting-1440-light shows Cancel live and the radios re-enabled
- **owner** **CONSUMER**: CONSUMER — FlagReportDialog.vue:89-99 + BrowsePane.vue:348-354

#### UIA-V-331 · MEDIUM · migrate-palettes-dialog · One-off dialog: it is the only palette dialog without surface="glass", DialogFooter and emphasis/tone, and it hand-rolls radius, width and type

- **source** audit #3 · **verdict** AMENDED · **where** all states
- **frame** `migrate-palettes-dialog/` …/1440-light-02-switch-settled.crop.png vs palettes-delete-all-dialog/1440-light-4-dialog-crop.png
- **observed** The dialog sets `class="rounded-dialog max-w-sm"`, a DialogTitle override `font-display font-medium text-subheading`, a DialogDescription override `text-small font-display`, and `rounded-full font-display cursor-pointer justify-start` on every Button. Six sibling dialogs (PalettesPane:123, BrowsePane:185, AdminFlagged:179, AdminTags:159, AdminNames:148, AdminUsers:213) all use the bare `<DialogContent surface="glass" :show-close="false">` with a DialogFooter and a text-emphasis Cancel. This dialog has a ✕ and no Cancel.
- **expected + canon** The app's dialog idiom as seen in those siblings. glass owns the plate's radius, width and title/description type ramp (glass-ui src/components/dialog/styles.css:15-35 and the Type block, where title = --type-body×1.272 and description ink is --foreground). Consumers pass no geometry or type literals.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/dialog/MigratePalettesDialog.vue:3,7,8,13-38
- **fix shape** Remove every class override. Use surface="glass". Put the choices in the body as a glass choice list (see the next finding), with an emphasis="text" Cancel in DialogFooter to match the siblings. Or keep the ✕ and drop Cancel, but choose one grammar app-wide.
- **confirm** The class overrides are verified in the source at MigratePalettesDialog.vue:3,7,8,15,23,30, and the six siblings do use `<DialogContent surface="glass" :show-close="false">` (PalettesPane:123, BrowsePane:185, AdminTags:159, AdminFlagged:179, AdminNames:148, AdminUsers:213). The claim that it is 'the only' one is refuted: FlagReportDialog.vue:3 (`<DialogContent class="sm:max-w-md">`, no surface="glass") is a second palette dialog with the same one-off grammar, and it should be in the same sweep. The owner call (CONSUMER) is correct: glass dialog/styles.css at HEAD owns the plate's radius, inline-size, padding and header, and says the SFC ships no geometry.

#### UIA-V-332 · MEDIUM · migrate-palettes-dialog · Full-width stacked choice rows are stadium pills (radius 9999px). The owner's "too rounded, should be card-like" applies, and glass has no choice-row primitive

- **source** audit #4 · **verdict** CONFIRMED · **where** switch mode and regenerate mode, both viewports
- **frame** `migrate-palettes-dialog/` …/1440-light-02-switch-settled.crop.png, 390-light-02-switch-settled.png, 390-dark-02-switch-settled.png
- **observed** The three choices are 334px wide × 40px at 1440 and 334 × 60px at 390 (21px Fraunces). Computed radius is 1.67772e+07px, a stadium. They are hand-built as left-aligned (`justify-start`) Buttons with an icon, but each is really a decision between outcomes that needs a line of explanation, not a single-line control. At 390 the three 60px stadium pills fill the plate and read as oversized pills.
- **expected + canon** DESIGN.md radius roles (:385-391): stadium (`--radius-control`) is for single-line controls only. A multi-line or option holder takes `--radius-field`/`--radius-card`, 16px. The owner (COHESION §0bl): pills too rounded, should be more card-like, route glass changes to the root.
- **owner** **GLASS+CONSUMER**: GLASS: no action-sheet or choice-list primitive (DESIGN.md:50 names "Dialog / Action Sheet" but there is no component). CONSUMER demo/palettes/browser/dialog/MigratePalettesDialog.vue:17,26,34 (`rounded-full`) · *glass component* Dialog (MigratePalettesDialog.vue:17,26,34) · *head* open-at-HEAD
- **fix shape** GLASS: add a dialog choice-list or action-sheet item: card-like rows at --radius-field, an icon, a title and a one-line description, keyboard roving. Relay to the glass BL/BK session. CONSUMER: adopt it, drop `rounded-full`/`justify-start`, and give each option a description line (see the copy finding).

#### UIA-V-333 · MEDIUM · migrate-palettes-dialog · At 390 the dialog sits 3px from each screen edge because the consumer's `max-w-sm` overrides the pinned glass width and there is no gutter clamp

- **source** audit #5 · **verdict** CONFIRMED · **where** 390×844, switch and regenerate, both themes
- **frame** `migrate-palettes-dialog/` …/390-light-02-switch-settled.png, 390-dark-02-switch-settled.png, 390-light-12-regenerate-mode.png
- **observed** Measured dialog x=3, w=384 at a 390 viewport, so the plate is nearly flush with the screen edges. The header is centred at 390 but left-aligned at 1440, an alignment flip from the pinned 7.0.0 DialogHeader.
- **expected + canon** glass HEAD dialog/styles.css:15-25: `inline-size: min(100% - 2*var(--space-section), 32rem)` gives a 20px gutter per side at 393. Its header comment says "the alignment does not flip per viewport".
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/dialog/MigratePalettesDialog.vue:3 (`max-w-sm`) + repin to glass HEAD
- **fix shape** Delete `max-w-sm` and repin glass to the version that ships the gutter clamp and the non-flipping header. This is a pin issue in the consumer; glass has already fixed it at the root.

#### UIA-V-334 · MEDIUM · migrate-palettes-dialog · The ✕ close has a 16×16 hit box, and it is the only way to cancel (no Cancel button)

- **source** audit #6 · **verdict** CONFIRMED · **where** all open states, both viewports
- **frame** `migrate-palettes-dialog/` …/1440-light-02-switch-settled.crop.png, 390-light-02-switch-settled.png
- **observed** The Close button measured 16×16 with radius 4px and `opacity-70`, at 1440 and at 390 (touch). Besides Esc and a click outside, that ✕ is the only way to back out of an identity change.
- **expected + canon** glass HEAD dialog/styles.css:96-110 gives the ✕ a 44×44 hit box via --touch-target, with --foreground ink at rest. The sibling dialogs cancel with a DialogFooter `emphasis="text"` Cancel.
- **owner** **CONSUMER**: CONSUMER (repin; pinned @mkbabb/glass-ui 7.0.0 DialogContent close) + MigratePalettesDialog.vue (no Cancel)
- **fix shape** Repin glass to get the 44px ✕, or use :show-close="false" plus a footer Cancel to match the six sibling dialogs.

#### UIA-V-335 · MEDIUM · migrate-palettes-dialog · Copy does not explain the choices: 'Publish, then switch' and 'Transfer to new account' read the same, 'Just switch' does not say palettes stay local, and the title is generic

- **source** audit #7 · **verdict** CONFIRMED · **where** switch mode (and regenerate mode)
- **frame** `migrate-palettes-dialog/` …/1440-dark-02-switch-settled.crop.png, 1440-dark-12-regenerate-mode.crop.png
- **observed** The title is 'What about your palettes?'. Both branches of the `title` computed (:74-78) return the same string, so the conditional is dead. 'Publish' publishes under the current identity before login; 'Transfer' publishes under the new identity after login (useSlugMigration.ts:115-117). Nothing on screen tells the user that. Both actions make palettes public, and neither says so. 'Just switch' (internal name 'discard') does not say the palettes stay in this browser.
- **expected + canon** Each option states its consequence. A dialog title names the act ('Switch to <slug>?').
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/dialog/MigratePalettesDialog.vue:19-37,74-96
- **fix shape** Title: 'Switch to {slug}?' / 'Regenerate your slug?'. Give each option a one-line description, e.g. 'Publish 3 palettes publicly under your current slug, then switch' / 'Switch, then publish them publicly under {slug}' / 'Switch; palettes stay saved in this browser'. Collapse the dead `title` computed.

#### UIA-V-336 · MEDIUM · migrate-palettes-dialog · Autofocus lands on 'Publish, then switch', so an Enter keypress publishes every local palette publicly

- **source** audit #8 · **verdict** CONFIRMED · **where** switch mode on open
- **frame** `migrate-palettes-dialog/` …/1440-light-02-switch-settled.crop.png (ring on Publish; activeElement = 'Publish, then switch'), 1440-light-06-focus-tab1.crop.png
- **observed** On open, activeElement is 'Publish, then switch' and the focus ring shows. The user was typing a slug and pressed Enter to submit it. A second Enter, or a key repeat, publishes all local palettes publicly. Making palettes public is effectively irreversible exposure.
- **expected + canon** Initial focus goes to the non-committing choice or to Cancel. The sibling confirm dialogs put Cancel first in DOM and tab order (glass dialog/styles.css:87-89).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/dialog/MigratePalettesDialog.vue:14-21 (the first focusable element takes reka's default initial focus)
- **fix shape** Use @open-auto-focus to focus 'Just switch' or a Cancel button, or order the options so the safe choice comes first.

#### UIA-V-337 · MEDIUM · migrate-palettes-dialog · The aurora ground's WebGPU init fails repeatedly (about 2000 warnings in 5s) while the dialog is open: its canvas texture exceeds maxTextureDimension2D

- **source** audit #11 · **verdict** AMENDED · **where** 1440 light: from dialog open (02) through the Tab walk (06: 2046 warnings) to Esc (08: 1090)
- **frame** `migrate-palettes-dialog/` …/1440-light-06-focus-tab1.png; console lines in capture-log-1440-light.json frames 02-08
- **observed** 'Texture size (2160×11338) exceeded maximum texture size (8192×8192)' → 'Could not create the swapchain texture' → '[aurora] init failed: GPUValidationError', repeating at hundreds per second. 01-switch-open had 0 warnings; 02, 1.2s after open, had 170. The GPU was shared with about 25 other headed audits, but a texture 11338px tall means the canvas is sized to something far larger than the viewport.
- **expected + canon** The aurora canvas is sized to the viewport at DPR and clamped to device.limits.maxTextureDimension2D. A failed init degrades once to the static ground and does not retry every frame.
- **owner** **GLASS**: GLASS aurora (@mkbabb/glass-ui aurora onInitError; the canvas is not clamped to the adapter limit and retries without backoff) · *glass component* aurora · *head* open-at-HEAD
- **fix shape** GLASS: clamp the canvas backing size to the adapter limit, size it to the viewport rather than document height, and put backoff or a one-shot fallback in onInitError. Cross-reference the app-ground-atmosphere seat.
- **confirm** The warnings are real (1440-light frames 02-08: 170/250/290/30/2046/295/1090) and glass HEAD has no maxTextureDimension2D clamp anywhere in src/ (grep, 6433284a), so the GLASS owner stands. Three amendments. (1) The texture is 2160×11338 at DPR 2, which is a 1080×5669 CSS-px canvas. That is not the viewport-sized ground (1440 wide) and it is not a fullPage artefact, because capture.mjs:99 takes viewport screenshots. Some pane-hosted aurora is sized to its content height, so the 'viewport vs document height' diagnosis is unproven. (2) It is not tied to this dialog: 0 warnings at 01, 08b, 09 and 10, and 0 in every 390-light and 390-dark frame. (3) It happened in one run on a GPU shared by about 25 audits. Re-home it to the app-ground or aurora seat rather than this page.

#### UIA-V-338 · MEDIUM · migrate-palettes-dialog · FlagReportDialog is a second one-off dialog with the same grammar

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `migrate-palettes-dialog/` `<DialogContent class="sm:max-w-md">`: no surface="glass", and a width override that fights glass HEAD's gutter clamp. It belongs in the same sweep as the one-off dialog finding.
- **observed** `<DialogContent class="sm:max-w-md">`: no surface="glass", and a width override that fights glass HEAD's gutter clamp. It belongs in the same sweep as the one-off dialog finding.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/dialog/FlagReportDialog.vue:3

#### UIA-V-339 · MEDIUM · migrate-palettes-dialog · Commit 69c0d255 dropped the variant props without adding `emphasis`, so the break now compiles silently in a new way

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `migrate-palettes-dialog/` The commit is described as a deletion of inert glass props, but the replacement emphasis mapping never landed. At HEAD 7bc63234 the three buttons are intentionally all default secondary, and 29 other `<Button … variant=` sites remain in demo/. A re-probe at HEAD will no longer show variantAttr, so do not read its absence as cured.
- **observed** The commit is described as a deletion of inert glass props, but the replacement emphasis mapping never landed. At HEAD 7bc63234 the three buttons are intentionally all default secondary, and 29 other `<Button … variant=` sites remain in demo/. A re-probe at HEAD will no longer show variantAttr, so do not read its absence as cured.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/dialog/MigratePalettesDialog.vue:14-35 (69c0d255, X.W7.a2 O-57)

#### UIA-V-340 · MEDIUM · extract-view · Touch: slider thumbs overhang their tracks (12×44 thumb on a 24px rail)

- **source** audit #3 · **verdict** CONFIRMED · **state** all states at 390 (hasTouch) · **where** package.json:88 "@mkbabb/glass-ui": "^7.0.0" (served dist) — the repin wave named in COHESION §0bo
- **frame** `extract-view/` empty__390__light__full.png, loaded__390__dark.png, closed__390__dark__full.png
- **observed** The computed thumb box is 12×44 on both sliders at 390 and 12×24 at 1440 (capture-flow-log-390__*.json). At 390 the k thumb overhangs the 24px rail by about 10px on each side, and the kC thumb reaches roughly double its thin track's height. These read as tall outlined stadium bars, the 'too rounded pill' register.
- **expected + canon** The thumb spans only its own capsule. The coarse-pointer target floor applies to the root and not to the painted thumb. Glass source already states this invariant and its fix ('A height: 100% thumb … overhangs its own capsule by 10px on every touch device', glass src/components/slider/styles.css:86-99). The served demo resolves the installed glass 7.0.0 dist.
- **owner** **CONSUMER**: CONSUMER (repin — the fix exists in glass source 10.0.1)
- **fix shape** Adopt the glass cut that carries the slider coarse-floor fix, then re-measure the thumb box at 390. No consumer CSS override.

#### UIA-V-341 · MEDIUM · extract-view · The result block shows the same palette three times; the dominant readout row is crowded and truncated

- **source** audit #4 · **verdict** CONFIRMED · **state** image loaded (k=5 and k=12), both viewports · **where** demo/workbenches/extract/ExtractWorkbench.vue:123-147 (dominant row), :149-159 (PaletteInspector expanded: strip + swatches)
- **frame** `extract-view/` loaded__1440__dark.png, k12__1440__light__full.png, loaded__390__light__full.png
- **observed** Under the sliders the palette appears three ways: (1) a baseline row with the display-serif '32' plus sans '% of the image', an uppercase mono 'DOMINANT' label and a mono oklch(…) value truncated to 'oklch(90.02% 0.15…' ('oklch(90.0…' at 390); (2) the card's proportional colour strip; (3) the card's row of watercolour swatch blobs, plus a count badge. That is four type registers on one baseline. At 390 the '32%' display figure competes with the 'Extracted Palette' title.
- **expected + canon** One specimen with one caption register. The proportional strip already encodes the dominance share, so the dominant row is redundant, as the in-code note concedes: 'the card's first swatch IS the dominant specimen' (ExtractWorkbench.vue:118-122).
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Fold the dominance into the strip, for example a tooltip or caption on its first segment, and drop the separate baseline row. Alternatively keep only '32% dominant' as the card's meta and remove the truncated oklch readout, which the swatch already exposes.

#### UIA-V-342 · MEDIUM · extract-view · Processing state has no preview: the drop zone still says 'Upload image' while the skeleton pulses, and the dark skeleton is black slabs

- **source** audit #5 · **verdict** AMENDED · **state** file chosen → quantizing · **where** demo/workbenches/extract/composables/useExtractSession.ts:205-212 (setPreview after await runQuantize); PaletteCardSkeleton dark ink
- **frame** `extract-view/` loaded__1440__dark__FAIL.png (processing held more than 90 s under server load)
- **observed** After setInputFiles, the drop zone keeps its empty 'Upload image' prompt and the shadow plate turns into near-black blocks in dark. Nothing tells the user that their file was accepted. The preview appears only after quantize resolves.
- **expected + canon** Intake is acknowledged at once: the preview shows as soon as the file decodes, and the skeleton is a tone step of the well, not black (the 'same bones — a material change, not a layout jump' contract, ExtractWorkbench.vue:94-98).
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Call setPreview(URL.createObjectURL(file)) before the quantize run and revoke it if decoding fails. Check the imminent skeleton's --skeleton-ink in dark against bg-well.
- **confirm** Confirmed in loaded__1440__dark__FAIL.png: the drop zone still reads 'Upload image' and the skeleton is near-black slabs. zonehover__1440__dark.png is the same processing frame. The cause is still in HEAD at useExtractSession.ts:208-211 (await runQuantize(), then setPreview(URL.createObjectURL(file))). Amendment: the empty state (empty__1440__dark.png, empty__1440__light.png) already shows a skeleton-shaped ShadowPalette ghost with the same bones, one tone lighter. The only visible change at intake is that the ghost turns black, which users read as darkening rather than progress. The two states need distinct registers. Evidence-label caveat: zonehover__1440__dark.png is not a hover-over-specimen frame (see the FileDrop finding).

#### UIA-V-343 · MEDIUM · extract-view · Mouse wheel does not zoom the eyedropper, and there is no zoom affordance

- **source** audit #6 · **verdict** CONFIRMED · **state** eyedropper open → wheel ×6 · **where** demo/workbenches/extract/ImageEyedropper/composables/useInertiaGesture.ts:299-320
- **frame** `extract-view/` zoom__1440__dark.png, zoom__1440__light.png (cube identical in size to pinned__1440__dark.png)
- **observed** Six wheel notches over the canvas leave the image unchanged. A plain wheel is treated as a pan, which is clamped to nothing because the image fits. Zoom happens only with ctrlKey (trackpad pinch) or a two-finger touch pinch. There are no zoom buttons, no hint and no reset or fit control.
- **expected + canon** A mouse user can zoom a pixel sampler, either with the wheel or with visible zoom controls, and the zoom state and a reset are visible.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Zoom on a plain wheel when the image fits (no pan range) or when deltaMode is line-based, and keep ctrl+wheel for trackpads. Add a compact zoom −/+/fit group to the top bar using glass Button icon-only.

#### UIA-V-344 · MEDIUM · extract-view · No glass FileDrop primitive: the drop zone is hand-rolled, with a UA-blue focus ring and weak dragover

- **source** audit #7 · **verdict** AMENDED · **state** empty, focus (keyboard), dragover, loaded hover · **where** glass-ui: new FileDrop (drop-well) primitive, canon DESIGN.md:385-391 role table + :603/:611 focus ring; consumer site demo/workbenches/extract/ImageDropZone.vue:6-26, :54-59
- **frame** `extract-view/` focus__1440__dark.png, focus__390__light.png, dragover__1440__light.png, dragover__390__dark.png, zonehover__1440__dark.png
- **observed** Keyboard focus shows the browser's default blue outline, not the glass ring. Dragover only turns the dashed edge green, scales to 1.01 and changes the tint by about 5%, with no 'Drop to extract' copy. When loaded, hover brings the dashed upload edge back around the specimen and adds a 'SAMPLE' chip that is a rounded-sm (4px) bg-background/85 literal. fourier-analysis hand-rolls the same thing (web/src/components/visualization/ImageUpload.vue).
- **expected + canon** Focus uses .focus-ring / --focus-ring-shadow (glass DESIGN.md:603, :611). A multi-line holder uses --radius-field or --radius-panel from the role table (DESIGN.md:385-391). With two consumers, the drop well belongs in glass and should not be minted per app.
- **owner** **GLASS+CONSUMER**: GLASS · *glass component* FileDrop (missing primitive) · *head* open-at-HEAD
- **fix shape** GLASS: ship a FileDrop primitive with a dashed well on the role-table radius, focus-ring, a dragover state with copy, a disabled/processing state and an edge-tag slot. CONSUMER meanwhile: add the focus-ring class to ImageDropZone and drop the dashed border once a preview exists.
- **confirm** The focus ring is CONFIRMED. focus__1440__dark.png shows a pale-blue 2px outline, and ImageDropZone.vue has no focus-ring class and no :focus-visible rule, so this is the UA outline and not glass --focus-ring-shadow (glass DESIGN.md focus-visible row, .focus-ring utility). The missing primitive is CONFIRMED: glass src/components/ has no file-drop or drop-well component. Amendments: (a) the 'SAMPLE chip rounded-sm bg-background/85 literal' is stale. At HEAD it is a glass <Badge variant=secondary size=sm> (ImageDropZone.vue:50-56, d106f3be after capture), though k12__1440__light__full.png still shows the old rectangular chip. (b) The cited frame zonehover__1440__dark.png shows the processing skeleton, not a loaded hover. The dashed edge around a loaded specimen is actually shown in k12__1440__light__full.png. (c) The empty well is the consumer's own documented '.dashed-well' WELL rung (demo/DESIGN.md:104, also used by MixSourceSelector.vue:147). The GLASS ask stands on the two-consumer argument (value plus fourier ImageUpload), but it should be routed as a promotion of the existing .dashed-well recipe, not as a new invention. The interim focus-ring fix is CONSUMER.

#### UIA-V-345 · MEDIUM · extract-view · The stage jumps when the image loads (both panes re-centre about 137px)

- **source** audit #8 · **verdict** CONFIRMED · **state** empty → loaded at 1440 · **where** the pane stage layout that vertically centres the pane pair (shell stage / PaneSlot container, not in this seat's file list)
- **frame** `extract-view/` empty__1440__dark.png (pane top y≈255) vs loaded__1440__dark.png (pane top y≈118)
- **observed** The two-pane stage is vertically centred, so when the Extract column grows the whole stage, including the unrelated My Palettes pane, jumps upward. This is the 'janky transitions' class from the COHESION §0ao/§0bd docket.
- **expected + canon** The stage is anchored to the top under the dock, and content growth extends the page downward without moving the sibling pane.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Top-align the stage (items-start plus a fixed top offset under the dock) instead of centring it in the viewport.

#### UIA-V-346 · MEDIUM · extract-view · At 1440 the dock collapses to a bare pink dot while the eyedropper is open

- **source** audit #9 · **verdict** CONFIRMED · **state** eyedropper open / pinned / zoom at 1440, both themes · **where** demo/shell/dock (condense trigger), cause unverified
- **frame** `extract-view/` eyedropper__1440__light.png, pinned__1440__dark.png, afteradd__1440__light.png
- **observed** The full dock (Extract select · Extracted Palette → · Login · @mbabb in loaded__1440__dark.png) is replaced by a single pink blob, and all navigation disappears. At 390 the dock stays whole (pinned__390__dark.png). The cause was not verified: the addendum dock-state probe never ran because :9000 was down.
- **expected + canon** The dock stays in its resting state, or collapses to the canonical condensed dock and not an unlabeled dot.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Find the trigger (scroll condense or overlay z-popover), then keep the dock expanded, or show the labelled condensed form, during a local in-pane overlay.

#### UIA-V-347 · MEDIUM · extract-view · Palette card's '…' menu button renders at about 54px on touch, larger than the title it serves

- **source** audit #10 · **verdict** AMENDED · **state** loaded at 390, both themes · **where** demo/palettes/PaletteInspector.vue:57-65 (Button icon-only size="sm")
- **frame** `extract-view/` loaded__390__dark.png, loaded__390__light__full.png, closed__390__dark__full.png
- **observed** The Palette menu button is a roughly 54px glass disc hanging at the right of the 'Extracted Palette 9' title row. At 1440 it is about 36px (loaded__1440__dark.png). The count badge beside it is a dark filled disc. Together they dominate the card head.
- **expected + canon** Touch keeps a 44px target but not a 54px painted disc. The target floor belongs on the hit area (the same law as the glass slider coarse floor), and the icon-only control stays one quiet row-height glyph.
- **owner** **GLASS**: CONSUMER (verify against glass Button coarse sizing) · *glass component* Button icon-only coarse sizing · *head* open-at-HEAD
- **fix shape** Measure the Button's coarse-pointer box (the addendum did not run). If glass Button inflates the painted size under pointer:coarse, route that to glass as a coarse-floor-on-hit-area ask. Otherwise remove the consumer sizing.
- **confirm** The size is CONFIRMED visually in loaded__390__dark.png: a large disc of about 54px beside a dark count disc. The owner call and the fix are wrong. PaletteInspector.vue:61-67 passes only <Button icon-only size='sm'> plus class 'shrink-0', and 'remove the consumer sizing' has nothing to remove. The painted size comes from the served glass 7.0.0 Button under pointer:coarse; the glass source button/styles.css:27 comment speaks of the 44px coarse floor. Owner should be GLASS: verify whether 10.x still paints the floor or moves it to a hit area like the slider fix. If 10.x has it, it is CONSUMER repin. Either way it goes through the glass session.

#### UIA-V-348 · MEDIUM · extract-view · The empty state has two ghost registers: the drop zone and a skeleton-shaped ShadowPalette card that looks like it is loading

- **source** confirm miss #1 · **verdict** MISSED (confirm seat) · **where** demo/workbenches/extract/ExtractWorkbench.vue ShadowPalette v-else (~:198) vs PaletteCardSkeleton
- **frame** `extract-view/` empty__1440__light.png, empty__1440__dark.png
- **observed** Before any intake, a grey segmented card (5 header cells and 2 bar placeholders) sits under the sliders. It looks like the processing skeleton, one tone lighter, so the pane reads as already loading. demo/workbenches/extract/ExtractWorkbench.vue ShadowPalette v-else (~:198) vs PaletteCardSkeleton
- **owner** **CONSUMER**: CONSUMER

#### UIA-V-349 · MEDIUM · extract-view · In light theme, panes, the search field and cards carry a hard near-black offset slab shadow; dark theme has almost none

- **source** confirm miss #2 · **verdict** MISSED (confirm seat) · **where** pane/card shadow token (demo/DESIGN.md WELL rung cites --shadow-cartoon-sm)
- **frame** `extract-view/` empty__1440__light.png, loaded__1440__light.png vs empty__1440__dark.png
- **observed** The right and bottom edges of both panes, the 'Start a new palette' card, the search input and the Extracted Palette card get a heavy dark offset slab in light. It is the loudest ink on the page, and the dark theme does not match it. This is likely the --shadow-cartoon rung and page-wide, so it should be triaged across pages. pane/card shadow token (demo/DESIGN.md WELL rung cites --shadow-cartoon-sm)
- **owner** **GLASS+CONSUMER**: CONSUMER-or-GLASS (shadow token source unverified) · *glass component* Card resting shadow token (--shadow-cartoon-*), ownership unverified · *head* open-at-HEAD

#### UIA-V-350 · MEDIUM · mix-view · The primary verb 'Mix' (primary-audacious) barely differs between disabled and enabled

- **source** audit #6 · **verdict** CONFIRMED · **state** Sources empty (disabled) vs palettes selected (enabled)
- **frame** `mix-view/` 1440-light-colors-01-colors-empty.png vs 1440-light-palettes-13-palettes-selected.png; 1440-dark-colors-01-colors-empty.png
- **observed** Both states are a pale translucent full-width 40px capsule. Enabled differs only by darker glyph and label ink, and in dark mode the disabled capsule is a faint outline. The pane's only verb has less visual mass than the section wells.
- **expected + canon** The deliberate-primary register reads as the page's single primary action, and the disabled state reads as clearly unavailable. The owner's 'too rounded / more card-like' also applies to this 460px-wide stadium.
- **owner** **GLASS**: GLASS — Button variant `primary-audacious` (consumer: MixConfigBar.vue:173-181; demo/DESIGN.md:105 names the Mix CTA as CHROME) · *glass component* Button (MixConfigBar.vue:173-181) · *head* open-at-HEAD
- **fix shape** Route to glass-ui: give primary-audacious a real filled or accent register with a distinct disabled treatment, and review stadium on wide block buttons under the card-like ruling.

#### UIA-V-351 · MEDIUM · mix-view · Unselected palettes are dimmed with opacity-75, which falsifies the swatch colors in a color tool

- **source** audit #7 · **verdict** CONFIRMED · **state** Palettes tab, unselected rows
- **frame** `mix-view/` 390-light-palettes-12-palettes.png, 1440-light-palettes-15-palettes-config.png
- **observed** Neon Arcade's #111 reads as brown #4a3a3a and its #fff reads as pink over the aurora. Forest Floor greys out entirely. The strips no longer show the palette's true colors.
- **expected + canon** Selection state is carried by the ring or edge alone, and swatch pixels are never alpha-attenuated (the same principle as the F-4 'quieter ≠ illegible' sweep cited at MixSourceSelector.vue:217-220).
- **owner** **CONSUMER**: CONSUMER — demo/workbenches/mix/MixSourceSelector.vue:286-291 (`opacity-75 hover:opacity-100`)
- **fix shape** Drop the opacity on unselected rows. Show selection through the existing ring (or a check badge), and dim only the name/meta text if a rest state is wanted.

#### UIA-V-352 · MEDIUM · mix-view · Radius drift: stadium gradient strip and a 12px result plate beside 16px sibling wells and cards

- **source** audit #8 · **verdict** CONFIRMED · **state** Result (palette)
- **frame** `mix-view/` 1440-light-palettes-17-result-palette.png, 390-light-palettes-17-result-palette.png
- **observed** Measured: strip radius 1.67e7px (full stadium on a decorative gradient bar); .mix-plate 12px; while .dashed-well and the palette tiles are 16px (--radius-card).
- **expected + canon** Stadium is only for single-line controls (glass DESIGN.md:385/391), and demo/DESIGN.md:207 says never hand-roll rounded-full. A media strip takes --radius-media or --radius-sm. The result plate is a WELL (demo/DESIGN.md:104) at the same --radius-card as the .dashed-well, or the concentric inner rung.
- **owner** **CONSUMER**: CONSUMER — demo/workbenches/mix/MixResultDisplay.vue:111 (`h-4 rounded-full` preview strip) and :56 (`rounded-xl` plate)
- **fix shape** Strip → rounded-(--radius-media) or rounded-sm. Plate → rounded-card (or the Law-1 --radius-ctx relay) so every in-plate well shares one corner.

#### UIA-V-353 · MEDIUM · mix-view · Result actions borrow dock furniture (DockControl/DockSeparator) as bare unlabelled glyphs; 'Copy color' title on a palette result

- **source** audit #9 · **verdict** CONFIRMED · **state** Result (palette and color)
- **frame** `mix-view/` 1440-light-palettes-17-result-palette.png, 1440-dark-palettes-17-result-palette.png
- **observed** Three loose 20px glyphs (copy, save, a separator, reset) float at the plate's bottom-left with no labels and no surface. The copy title stays 'Copy color' when the result is a palette. The same Copy and Clear verbs also exist in the dock action bar, which duplicates the affordances.
- **expected + canon** In-plate actions use glass Button (ghost/icon size) or a toolbar primitive, not dock chrome outside the dock (glass idiom). Each verb lives in one place, or the plate's copy is the result-scoped one with correct labels.
- **owner** **CONSUMER**: CONSUMER — demo/workbenches/mix/MixResultDisplay.vue:121-144
- **fix shape** Swap to glass Button icon or a labelled small-button row. Title the copy by result type. Decide whether the dock's Copy result/Clear or the plate's buttons own the verb, and remove the duplicate.

#### UIA-V-354 · MEDIUM · mix-view · The tab focus ring is a blue 5px rounded rectangle that ignores the stadium indicator

- **source** audit #10 · **verdict** CONFIRMED · **state** Colors tab keyboard focus
- **frame** `mix-view/` 1440-light-colors-02-tab-focus.png
- **observed** Keyboard focus draws a saturated blue square-cornered ring around 'Colors' that is inset from and a different shape to the pill indicator. On the pink/orange theme it reads like a browser default.
- **expected + canon** The focus ring follows the segment's own radius (the concentric inner rung) and uses the --ring token tuned to the theme.
- **owner** **GLASS**: GLASS — SegmentedTabs tab button (measured tab radius 5px vs indicator 9999px; focus ring off the family shape and accent) · *glass component* SegmentedTabs · *head* open-at-HEAD
- **fix shape** Route to glass-ui: bind the tab button radius to the indicator's derived radius (segmented.css:105-111) and draw focus-visible from the family focus-ring recipe. This lands together with the card-like radius change above.

#### UIA-V-355 · MEDIUM · mix-view · The Colors/Palettes strip swaps whole panels but uses toggle semantics (role=group + aria-pressed)

- **source** audit #11 · **verdict** CONFIRMED · **state** Colors / Palettes tab
- **frame** `mix-view/` 1440-light-palettes-12-palettes.png
- **observed** Measured `button[aria-pressed]` on both segments. The control replaces the whole source panel (vj-morph out-in), which is panel navigation.
- **expected + canon** glass tabs README:43-50 says to use semantics="tabs" for mutually exclusive panel navigation (tablist/tab + aria-selected), with the panels linked.
- **owner** **CONSUMER**: CONSUMER — demo/workbenches/mix/MixSourceSelector.vue:124-129 (no `semantics` prop, so pill defaults to toggle)
- **fix shape** Add semantics="tabs" and wire aria-controls/tabpanel on the two branch roots.

#### UIA-V-356 · MEDIUM · mix-view · The tab swap reflows everything below it twice: the config bar and Mix button jump by about 120px

- **source** audit #12 · **verdict** CONFIRMED · **state** Palettes tab (tab-direction transition), both directions
- **frame** `mix-view/` 1440-light-palettes-11-tab-swap-110ms.png vs 1440-light-palettes-12-palettes.png; 1440-light-palettes-14-tab-swap-back-110ms.png
- **observed** At 110ms the outgoing Colors well slides and fades while 'Color space' sits at y≈489. After the swap it snaps to y≈607. The selects and the CTA teleport once when the old branch leaves and again when the new one enters.
- **expected + canon** One surface, new content: the family's optional height morph (--vj-morph-collapse/-expanded, animations.css:70-74) or a crossfade in a fixed-height region, so sibling controls glide once or not at all. This is the 'janky transitions' docket (COHESION §0ao/§0bd).
- **owner** **CONSUMER**: CONSUMER — demo/workbenches/mix/MixSourceSelector.vue:143 (`<Transition name="vj-morph" mode="out-in">` with no height morph)
- **fix shape** Enable the vj-morph height morph on the swap region, or use a grid-stack crossfade so both branches share one cell and the controls below move in one eased step.

#### UIA-V-357 · MEDIUM · mix-view · The empty library still shows the full config bar and a disabled Mix; the empty hint is set in monospace with no call to action

- **source** audit #13 · **verdict** CONFIRMED · **state** Palettes tab with no saved palettes; Colors tab with no library
- **frame** `mix-view/` 1440-light-palettes-empty-18-palettes-empty.png, 1440-light-palettes-empty-19-colors-no-library.png
- **observed** Below the 'No saved palettes yet.' invitation sit the Color space, Hue method and Size mismatch selects and a disabled Mix. None of these can do anything. The prose hint uses Fira Code, and nothing links to where palettes are saved.
- **expected + canon** Controls that cannot act do not earn their place (CLUTTER). The empty state leads with one invitation and one route, and prose is set in the body face.
- **owner** **CONSUMER**: CONSUMER — MixPane.vue:102-110 (MixConfigBar always mounted); MixSourceSelector.vue:270-274 (EmptyState hint); demo/shared/ui/EmptyState.vue (mono hint voice)
- **fix shape** Hide or collapse MixConfigBar while canMix cannot become true for lack of sources. Set the EmptyState hint in the body/sans rung. Add a single 'Open palettes' action.

#### UIA-V-358 · MEDIUM · mix-view · Mix narration: the pigment pool crosses over live controls on a literal-ms clock outside the motion tokens

- **source** audit #14 · **verdict** CONFIRMED · **state** After Mix: result display + MixAnimationCanvas (the animation-cohesion audit)
- **frame** `mix-view/` 1440-light-palettes-16-anim-200ms.png, 1440-light-palettes-16-anim-600ms.png, 390-light-palettes-16-anim-600ms.png
- **observed** At 200ms the drops are 4–6px specks inside the palette strips and barely readable. At 600ms a single magenta blob sits on top of the 'Size mismatch' label and the 'Discard extras' select text, painted above the controls. Meanwhile the page scroll jump (above) moves the target well mid-flight. Cohesion verdict: this is value.js's only animation view. It is a one-shot narration, not an inline keyframes editor, so there is no keyframes-pane one-off to fold. But its clock and easing live in their own literal constants, while every other transition in the app rides --duration-*/--ease-* (animations.css vj-morph/vj-enter).
- **expected + canon** The narration reads at its own scale, travels behind or around interactive content (or dims the controls it passes), and takes its timing from the shared motion tokens, so the app has one motion vocabulary.
- **owner** **CONSUMER**: CONSUMER — MixAnimationCanvas.vue:30-34 (canvas `z-controls` over the pane content); mixStage.ts:22-26 (MIX_ARRIVE_MS 700 / MIX_CONVERGE_MS 900 / MIX_EPILOGUE_MS 300 literals)
- **fix shape** Derive the MIX_* timings from the motion tokens (read the CSS vars at arm time), route drop paths around the controls or lower the canvas below the control layer with a scrim, and give the drops a minimum lift-off radius so the 'pour' is legible. The height fix above removes the mid-flight target jump.

#### UIA-V-359 · MEDIUM · mix-view · The 'Selected' well at empty has no instruction or affordance text: an unlabelled dashed ghost with no Plus glyph and no hint

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `mix-view/` 1440-light-colors-02-tab-focus.png, 1440-dark-colors-01-colors-empty.png
- **observed** Even after the BROKEN cure, the empty Colors well gives no hint such as 'add the current color or pick from palettes'. The Palettes branch has an EmptyState, but the Colors branch has none.
- **owner** **CONSUMER**: CONSUMER — MixSourceSelector.vue Colors branch

#### UIA-V-360 · MEDIUM · mix-view · The expanded dock shows stadium pills ('Login', '@mbabb', the Mix select trigger), part of the owner's 'too rounded pills'

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `mix-view/` 1440-light-colors-02-tab-focus.png, 1440-dark-colors-01-colors-empty.png
- **observed** This is visible in this seat's own frames but was not itemised. The dock's 'Mix' route label also repeats the pane's H1 'Mix'.
- **owner** **GLASS**: GLASS (dock control radius --radius-dock / --radius-control, DESIGN.md:385/393); cross-reference the dock-main seat · *glass component* dock · *head* open-at-HEAD

#### UIA-V-361 · MEDIUM · generate-view · The plate's verb cluster always wraps to its own row, leaving a dead row and an orphan count badge; at 390 the cluster overruns the plate padding

- **source** audit #5 · **verdict** CONFIRMED · **state** default, both viewports
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/1440-light-01b-card.png ; 390-light-01-default.png
- **observed** The name input has flex-1 basis-[10rem]. With the badge and the 145+36+36px verb cluster, the row exceeds the 438px plate at 1440, so the cluster wraps onto a second right-aligned row even on desktop. The first row is left with the title and a lone '5' at the far right, and the space left of Regenerate is dead. At 390 the verbs are 60/54px tall. Copy spans x 301-355 while the plate's padded content edge is about 344, so the button kisses the plate border.
- **expected + canon** Plate chrome fits one row at 1440. At 390 the controls stay inside the 12px plate padding (HIERARCHY: no crowding or dead space).
- **owner** **CONSUMER**: CONSUMER (demo/workbenches/generate/GenerateControls.vue:150-193)
- **fix shape** Once the verbs move to Tools (see the previous finding), the row becomes title + count and needs no wrap logic. Otherwise, give the input basis-0 and let the cluster shrink icons-only below a container query.

#### UIA-V-362 · MEDIUM · generate-view · The plate is a hand-rolled card nested in a card at the SAME 16px radius, with a cartoon drop shadow on a 'well', violating the concentric-nesting law

- **source** audit #6 · **verdict** CONFIRMED · **state** default
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/1440-light-01b-card.png ; 1440-dark-05a-regen-150ms.png
- **observed** <section class="rounded-card border border-card-edge bg-well shadow-cartoon-sm"> measures 16px radius, sitting inside the Card tier=resting pane (16px) at a 24px inset. It is not a glass primitive (Surface/Card). The hard -2px 2px offset shadow makes a 'well' read as a raised card-in-card. The strip hard-codes rounded-t-card to match.
- **expected + canon** glass-ui DESIGN.md:396-404 (law 1): a nested card-class surface derives max(--radius-floor, --radius-ctx − --radius-inset), i.e. about 4px here, or it uses a flatter --radius-panel (12px, DESIGN.md:390) inset register. A well is recessed, not shadow-raised. Owner §0bl: 'too rounded … should be more card like'.
- **owner** **CONSUMER**: CONSUMER (demo/workbenches/generate/GenerateControls.vue:136-142)
- **fix shape** Compose the glass Surface/Card primitive with the radius relay (publish --radius-ctx/--radius-inset from the pane). Drop shadow-cartoon-sm on the well and let the strip inherit the derived corner. Relay to glass if Surface lacks a 'well' variant that wires the relay.

#### UIA-V-363 · MEDIUM · generate-view · Saving re-centres the whole stage (a 40px jump up), and the Generate pane stretches to hold about 115px of dead space

- **source** audit #7 · **verdict** CONFIRMED · **state** after Save palette (1440)
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/1440-light-01-default.png vs 1440-light-06-after-save.png
- **observed** Before the save, both panes start at CSS y≈267 with a band of about 260px of empty ground above them. After the save the Palettes inspector grows by one card, the centred stage shifts up about 40px, and the Generate card (h-full) stretches to match. Empty glass appears beneath the count slider. Nothing the user touched moved; everything else did.
- **expected + canon** Adding content to one pane does not move the sibling pane (COHESION §0ao: 'janky transitions'). Each pane is sized to its own content, or the stage is top-anchored so there is no reflow jump.
- **owner** **CONSUMER**: CONSUMER (stage layout; demo/workbenches/generate/GeneratePane.vue:31-32 h-full + the scene's vertical-centre container)
- **fix shape** Top-anchor the two-pane stage (align-items:start with a fixed top offset) instead of vertical centring. Drop h-full on the Generate card, or cap it to content, so it does not stretch to the inspector's height.

#### UIA-V-364 · MEDIUM · generate-view · Save has no success or dedup feedback: re-saving is a silent no-op and every save gets the same name

- **source** audit #8 · **verdict** CONFIRMED · **state** after Save palette; Save pressed twice
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/390-light-06-after-save.png ; 1440-dark-11-renamed-saved-twice.png
- **observed** Save shows no toast, no 'Saved' state on the button, and no scroll-to or flash on the new inspector card. At 390 the new card lands below the fold, and only the header count changing 1→2 signals success. A second press dedupes silently (same name + colors, so the existing palette moves to the front), with no 'already saved' cue. Because the name is hardcoded (finding 2), successive regenerated saves pile up as identical 'Generated Palette' rows.
- **expected + canon** STATES: success, duplicate and error states are present and consistent with the palettes family (the picker's Save flow expands the saved card via expandedId).
- **owner** **CONSUMER**: CONSUMER (demo/workbenches/generate/GeneratePane.vue:14-20 ; demo/palettes/usePaletteStore.ts:82-97)
- **fix shape** After createPalette, route through usePaletteActions.onCurrentPaletteSaved so the new card expands and is focused, and show a transient 'Saved' state on the verb. When the dedup branch returns an existing palette, say 'Already saved'.

#### UIA-V-365 · MEDIUM · generate-view · At 390 the control type out-ranks the headings: Regenerate and the Select values render at 21px, above the 20px plate title, beside 16px field labels

- **source** audit #9 · **verdict** AMENDED · **state** default, 390 (hasTouch)
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/390-light-01-default.png ; capture-log.json 390-*-default.buttons/badge
- **observed** At 1440, Regenerate is 16.4px/40px tall. At 390 it is 21px/60px tall, and Save and Copy are 54px circles. The Badge is 21px, the plate title is 20.35px and the 'Preset'/'Harmony' labels are 16px. 'Vibrant'/'Golden' in the triggers visually dominate the pane. glass-ui dist CSS has no coarse or max-width font rule, so the step-up comes from the consumer or a size token. It could not be traced because :9000 stopped answering.
- **expected + canon** Coarse density raises the target (DESIGN.md:931-937: --control-floor lifts HEIGHT to 2.75rem), never the type rung. The type ladder keeps the title above the control labels (HIERARCHY).
- **owner** **GLASS**: CONSUMER (trace needed: demo/workbenches/generate/GenerateControls.vue:164-171, 229, 262; possibly the glass Button/SelectTrigger size rung) · *glass component* SelectTrigger (GenerateControls.vue:164-171,) · *head* open-at-HEAD
- **fix shape** Find what scales control font-size at small width. Keep control type on the control rung and let only --control-floor lift the hit box. Pin size="sm" triggers to the sm type.
- **confirm** The symptom is confirmed in 390-light-01-default.png, where 'Vibrant'/'Golden' and 'Regenerate' dwarf the 'Preset' labels. I traced the cause, and the owner is GLASS, not the consumer. glass tokens/light-dark.css (dist 7.0.0 and HEAD src/styles/tokens/light-dark.css:17-21) sets --ui-scale: var(--ui-coarse-scale, 1.5) under @media (pointer: coarse). sizing.css:35-36 then defines --control-text: calc(var(--type-small) * var(--ui-scale)) and --control-text-sm likewise, so a 14px base becomes 21px on touch. The heading and title ladder is not scaled, so the controls invert the hierarchy. This contradicts DESIGN.md:931-937, which says coarse input should lift the target through --control-floor. Route to glass: decouple --control-text from --ui-scale, or scale the whole ladder. As an interim, the consumer can set --ui-coarse-scale. 390 in this capture is hasTouch, so this is really a coarse-pointer effect, not a width effect.

#### UIA-V-366 · MEDIUM · generate-view · Palettes inspector: an orphan, unlabeled trash icon floats between 'Start a new palette' and the palette list

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/1440-light-01-default.png (display ~1669,796) ; 1440-light-06-after-save.png (~1669,740)
- **observed** It is a detached destructive verb attached to no card. This is the clutter the owner named in §0bl.
- **owner** **CONSUMER**: CONSUMER (palettes inspector)

#### UIA-V-367 · MEDIUM · generate-view · Pane Cards, the palette cards and the inspector search field all wear a hard offset cartoon slab shadow

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/390-light-01-default.png (dark slab right and bottom of both panes, and on the search input) ; 1440-light-01-default.png
- **observed** The slab reads as a sticker, not glass. On a single-line stadium search field it is a register mismatch. This is part of the owner's 'not glass-ui idiomatic'.
- **owner** **GLASS+CONSUMER**: CONSUMER (verify whether glass Card tier=resting ships it; if so, GLASS) · *glass component* Card resting shadow token (--shadow-cartoon-*), ownership unverified · *head* open-at-HEAD

#### UIA-V-368 · MEDIUM · gradient-view · Duplicated affordances: Copy CSS in two places, and curve presets picked two ways

- **source** audit #8 · **verdict** CONFIRMED · **state** Tools open; easing author open · **where** gradient-view · default / Tools open / easing author open
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-06a-tools-open.png, 1440-light-04d-easing-row-with-stage.png
- **observed** Copy CSS appears in the Tools dock and again beside the 'CSS' heading. A curve can be picked from the specimen strip or from 'PRESET · Pick a curve'. The Select says 'Pick a curve' while 'linear' is selected in the strip, so the two disagree.
- **expected + canon** One owner per action (scene actions live in the Tools seat) and one preset selector per interval, showing a consistent selected state.
- **owner** **CONSUMER**: CONSUMER demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:297-302 (the header DockControl repeats the Tools seat gradient.copyCSS) + GradientEasingEditor.vue:169-205 with easing/EasingAuthoringStage.vue:96 (strip + the EasingPicker's PRESET Select)
- **fix shape** Drop the header copy button (or the scene seat) and keep one. Pass :presets="false" (or the producer equivalent) to EasingPicker so the strip is the only preset selector, or bind the Select to the strip's value.

#### UIA-V-369 · MEDIUM · gradient-view · Stop inspector, easing rail buttons, separators, accordion and the Direction field are hand-rolled, not glass primitives

- **source** audit #9 · **verdict** AMENDED · **state** default / stop selected · **where** gradient-view · default and stop selected · all
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-01-default.png, 1440-light-03g-inspector-2stops.png
- **observed** The Remove button is a 92x24 bordered box with a 4px radius and the Position field is a 4px-radius box, both next to 9999px Select stadiums. The easing rows are a custom disclosure with a hand-drawn chevron. Three raw <hr> separators. Direction uses the .section-label eyebrow and a hand-placed value instead of the field composition used for Type/Space/Hue.
- **expected + canon** Glass primitives: Button (ghost/destructive-on-hover), NumberField, Accordion/Collapsible, Separator, LabeledSlider (glass labeled-field README: LabeledSlider is the typed adapter). Single-line controls take --radius-control (stadium), DESIGN.md:385.
- **owner** **CONSUMER**: CONSUMER GradientStopEditor.vue:712-741 + :1002-1025 (input/Remove at --radius-sm 4px); GradientEasingEditor.vue:122-160 (hand-rolled accordion) + :186-205/:316-335 (.rail-btn); GradientVisualizer.vue:136,:286,:296 (<hr class=border-border>), :261-267 (Direction caption and readout)
- **fix shape** Swap in Button size=sm variant=ghost for Remove and the rail icon buttons, NumberField for Position, Accordion type=single for the interval rows, Separator for the <hr>s, and LabeledSlider label="Direction" with the degrees as its value readout. Delete the scoped recipes.
- **confirm** Confirmed: raw <input>, raw <button> Remove, <hr class=border-border>, a hand-rolled disclosure (GradientEasingEditor.vue:128-152 aria-expanded plus a rotate-180 chevron), and the Direction .section-label. Amendment: the '4px' radius is not established. The source reads var(--radius-sm, 0.375rem) and the Remove box in 390-dark-01 looks about 6-8px CSS. Re-measure before quoting a pixel value; the substance stands.

#### UIA-V-370 · MEDIUM · gradient-view · CSS code editor: wrong radius, off-idiom focus border, and token-splitting wraps

- **source** audit #10 · **verdict** CONFIRMED · **state** code editor edited (debounced parse) · **where** gradient-view · code editor default / focused / invalid · 1440 and 390, light and dark
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-05b-code-valid-focused.png, 1440-light-01c-card-bottom.png ('145de\|g'), 1440-light-05c-code-valid-blurred.png ('oklc\|h')
- **observed** The multi-line holder measures an 8px radius. On focus it gets a heavy dark 2px box (near-white in dark) instead of the glass focus ring used by the Selects. word-break:break-all splits tokens mid-word ('145de g', 'oklc h', '#7928ca 5 0%'). Syntax highlighting disappears while focused. The parse verdict and red border work.
- **expected + canon** Multi-line field = --radius-field 16px (DESIGN.md:387); focus uses the shared focus-ring token; code wraps at token or comma boundaries.
- **owner** **CONSUMER**: CONSUMER demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue:93 (rounded-lg, break-all, focus-visible:ring-2 over a border)
- **fix shape** Use rounded-field and the glass focus-ring utility; switch to overflow-wrap:anywhere with word-break:normal (or print one stop per line); keep highlighting while typing (re-highlight on a debounced input with the caret saved) or accept the plain-text state on purpose.

#### UIA-V-371 · MEDIUM · gradient-view · Consumer reads --radius-input, which glass-ui 8 removes with no alias

- **source** audit #11 · **verdict** CONFIRMED · **state** easing row open · **where** gradient-view · easing readout rail buttons
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-04d-easing-row-with-stage.png
- **observed** The token still resolves on the installed glass-ui 7.0.0. glass-ui DESIGN.md:429 lists `--radius-input` as REMOVE (renamed, no legacy alias), and :435 hands the consumer migration to the value.js owner's tranche.
- **expected + canon** Icon buttons read --radius-control (stadium) or use the glass Button primitive.
- **owner** **CONSUMER**: CONSUMER demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue:321 (.rail-btn border-radius: var(--radius-input))
- **fix shape** Replace with glass Button icon (preferred) or var(--radius-control) before the glass 8.0 adopt.

#### UIA-V-372 · MEDIUM · gradient-view · Three different caption styles in one control band

- **source** audit #12 · **verdict** CONFIRMED · **state** default · **where** gradient-view · default · all
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-dark-01-default.png
- **observed** Within 200px the same kind of caption appears as sans title-case (Type), mono uppercase tracked eyebrow (DIRECTION), and italic caption (Position), and the authoring stage adds another eyebrow (PRESET).
- **expected + canon** One field-caption register via the glass labeled-field composition (README: one accessible field composition, no visual taxonomy of its own).
- **owner** **CONSUMER**: CONSUMER GradientVisualizer.vue:263 (.section-label 'DIRECTION' uppercase mono) vs :152-245 (LabeledField 'Type/Space/Hue' sans 16px/500) vs GradientStopEditor.vue:704-713 (italic caption 'No stop selected / Position') vs EasingAuthoringStage 'PRESET' eyebrow
- **fix shape** Put every field caption on LabeledField, LabeledSlider or LabeledInput. Keep the .section-label eyebrow only where the design doc allows it (none here).

#### UIA-V-373 · MEDIUM · gradient-view · Added stop is not selected, and the inspector help line causes layout jumps

- **source** audit #13 · **verdict** CONFIRMED · **state** stop dragged/added · **where** gradient-view · stop added / stop selected · 1440 and 390
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-03b-stop-added.png vs 1440-light-03d-stop-dragged.png
- **observed** After tapping the rail, a third stop appears but the inspector still says 'No stop selected'. Selecting a stop removes the 'Select a stop on the rail to remove it.' line and the whole card moves up about 22px (Interpolation h3 y 296→274 in the contact sheet). With nothing selected the inspector shows four elements for an empty state: a label, a disabled Position field, a disabled Remove, and a help sentence.
- **expected + canon** The minted stop becomes the selection (the inspector can edit it immediately), and state changes do not shift layout.
- **owner** **CONSUMER**: CONSUMER demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue:317 (emit add without selecting the minted stop) + :747-754 (removalRefusal help line added and removed)
- **fix shape** Set selectedId to the new stop's id after mintStop. Reserve the help line's block-size, or drop it and put the reason in the disabled Remove button's tooltip or description.

#### UIA-V-374 · MEDIUM · gradient-view · Seed from palette silently uses the first saved palette and does nothing when there is none; wrong icon

- **source** audit #14 · **verdict** CONFIRMED · **state** Tools: Reset / Seed from palette · **where** gradient-view · Tools: Seed from palette · 1440 and 390
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-06b-after-seed.png, 390-dark-06b-after-seed.png
- **observed** Seeding works (five Sunset Coast stops), but the user cannot choose which palette, even though the Palettes inspector is right beside it. With no saved palettes the command returns without feedback while the seat reads data-action-state=ready. The seat's icon is an eyedropper, which suggests picking a colour, not seeding.
- **expected + canon** The seed source is the palette the user selected in the inspector (or a picker). When no palette exists the seat is disabled and says why. The icon matches the action.
- **owner** **CONSUMER**: CONSUMER demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:86-89 (savedPalettes[0], silent return) + the scene seat state in demo/shell/usePaneRouter.ts:873-878
- **fix shape** Seed from the inspector's selected palette (fall back to a small palette menu), resolve the seat to disabled with a reason when savedPalettes is empty, and use a palette or import glyph.

#### UIA-V-375 · MEDIUM · gradient-view · Easing specimen tiles are round bubbles with cramped labels; strip clips the next family

- **source** audit #15 · **verdict** AMENDED · **state** default (row 1 open) · **where** gradient-view · easing row open · 1440 and 390, light and dark
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-01-default.png (strip at y≈1100), 390-dark-02-select-type-open.png
- **observed** 44px circles each hold a curve glyph over a 9px mono label ('in-out' touches the rim). The third family is cut to a sliver ('c' plus a rule) at 1440, and the 'sine' family is cut at 390. Owner 2026-09-23: pills are 'too rounded and should be more card like'.
- **expected + canon** A glyph-over-label specimen reads as a small card (--radius-panel 12px or --radius-media 10px per DESIGN.md:384-389), not a circle; stadium/circle is for single-line controls only (DESIGN.md:385).
- **owner** **CONSUMER**: GLASS Chip (glass-ui src/components/chip) — no card-like glyph+label cell shape (the consumer comment at EasingSpecimenStrip.vue:162-171 says shape="cell" resolved to a capsule, so it fell back to shape="icon" circles); consumer seat demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:101-106,:172-185
- **fix shape** Route to the glass-ui session: give Chip a real card-cell shape (rounded-panel, aspect about 1:1.1, label below the glyph). The consumer then uses shape="cell" and sizes the strip so a whole family fits or the fade signals more.
- **confirm** The visual is confirmed in 1440-light-04d: 44px circles, and a third family cut to a 'c' sliver. The GLASS owner premise is false. Installed glass-ui 7.0.0 dist and glass src/styles/glass/glass-chip.css:59-61 both already give `.glass-chip--cell, .glass-chip--cell.glass-capsule { border-radius: var(--radius-card) }` (since cf149cff, 2026-06-24), so shape="cell" is already card-like, not a capsule. The consumer chose shape="icon" (EasingSpecimenStrip.vue:105) on a stale rationale (comment :166-171). Corrected call: CONSUMER, switch to shape="cell" and fix the strip width or fade. The only glass-routable part is the owner's wish for a smaller card radius (--radius-panel 12px) on micro cells, and that should go to the glass session as a radius-role question, not as a missing shape.

#### UIA-V-376 · MEDIUM · gradient-view · The editing rail ignores Type and Direction, so rail and tile disagree for Radial

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-03b-stop-added.png
- **observed** With Type=Radial, the Stops rail and the easing ramp still paint a linear strip. Only the 96px tile shows the radial result, which strengthens the 'rendered gradient is a side tile' finding.
- **owner** **CONSUMER**: CONSUMER GradientVisualizer.vue (comment :140-145: the rail normalizes to 90°)

#### UIA-V-377 · MEDIUM · gradient-easing-authoring · The selected tile is not painted: pressed and rest chips measure identical, and hover changes nothing

- **source** audit #6 · **verdict** AMENDED · **state** row open: selected (linear / back-in / steps) and hover · **where** GLASS Chip (mode=selectable) at installed 7.0.0. The pressed rule `.glass-chip[data-mode="selectable"][data-state="on"]` (glass-ui src/styles/glass/glass-chip.css:36) keys on data-mode, which the 7.0.0 Chip does not render (attrs.mjs: outerHTML has data-state="on" and no data-mode; --accent-band resolves empty).
- **frame** `gradient-easing-authoring/` 1440-light-01-row-open-el.png, 1440-light-02-tile-hover-el.png (hover on 'in' is indistinguishable), supp-log.json (pressedLinear vs restEase vs hoverEase)
- **observed** data-state=on and data-state=off chips report the same backgroundColor oklab(0.9256 …/0.839), the same border rgb(198,180,159) and the same shadow, in light and in dark. The only selection cue is a slightly heavier glyph stroke and a bold 9px label. On hover, background, border and shadow are unchanged in both themes.
- **expected + canon** Selected and hover states present and consistent (STATES). The glass rule gives the pressed chip an accent band, edge, ink and flood.
- **owner** **GLASS**: GLASS · *glass component* Chip · *head* cured-at-HEAD (adopt via repin)
- **fix shape** Glass: have Chip render data-mode (or key the pressed rule on aria-pressed) and resolve --accent-band under accent-tone. BL should re-measure at 10.0.1, since this may already be cured upstream (COHESION §0bo). Consumer: no local restyle; repin.
- **confirm** The paint equality is confirmed (supp-log.json: pressedLinear, restEase and hoverEase are identical in light and in dark). The stated mechanism is refuted by my probe. The pressed chip's attributes include data-mode=selectable and data-shape=icon, and --accent-band/--accent-edge resolve to non-empty color-mix values on the chip (attrs.mjs read --accent-band on documentElement, which is the wrong scope). The real cause is that no stylesheet on the page contains a `.glass-chip[data-mode` rule, because glass 7.0.0 never @imports glass-chip.css. Owner GLASS is correct, and the cure already exists upstream (4442b451, in v8.0.0 through v10.0.1). The consumer action is the repin only.

#### UIA-V-378 · MEDIUM · gradient-easing-authoring · Exclusive single-select is hand-coordinated across 27 independent Chips: 27 tab stops, no roving focus

- **source** audit #7 · **verdict** CONFIRMED · **state** row open (strip), keyboard · **where** demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:101-111 (v-for Chip mode=selectable + onTileToggle :33-35)
- **frame** `gradient-easing-authoring/` 1440-light-03-tile-focus-el.png
- **observed** attrs.mjs counts 27 focusable specimen tiles in one row. Tab walks every chip, and the selection is enforced by hand ('pressing the pressed tile again is a no-op').
- **expected + canon** glass-ui src/components/chip/README.md: 'Use ToggleGroup or SegmentedTabs when the owner requires exclusive selection or roving focus rather than coordinating independent chips by hand.'
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Rebuild the strip on glass ToggleGroup (type=single, roving focus, one tab stop) with cell-shaped items. Ideally this comes as part of the glass gallery primitive.

#### UIA-V-379 · MEDIUM · gradient-easing-authoring · Authoring canvas letterboxes: a 304px plot left-aligned in a 440px well (~120px dead strip) at 1440

- **source** audit #8 · **verdict** CONFIRMED · **state** authoring stage open (bezier and steps), 1440 both themes · **where** demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue:129-134 (`inline-size: min(100%, 19rem)` + `margin-inline: 0 !important`)
- **frame** `gradient-easing-authoring/` 1440-light-06-authoring-bezier.png, 1440-dark-06-authoring-bezier.png, 1440-light-10-authoring-steps-el.png
- **observed** picker-card0 is 440×476 and picker-svg is 304×450 (bezier), 304×365 (steps), pinned to the left edge. That leaves an empty well-coloured band on the right and a tall 1:1.48 plot. The file's own 'Law 3: zero letterbox' is violated by its cap.
- **expected + canon** The well hugs the plot, or the plot is centred and fills it. No dead space inside a surface (HIERARCHY; glass easing README 'The frame is a constant', a square viewBox at HEAD).
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Drop the 19rem cap and the margin override, and let the picker size itself. At repin, glass HEAD's constant square viewBox plus surface="bare" make this whole law unnecessary.

#### UIA-V-380 · MEDIUM · gradient-easing-authoring · The row's single literal is ellipsized even at 1440 and unreadable at 390

- **source** audit #9 · **verdict** CONFIRMED · **state** row open / authoring (custom and back curves) · **where** demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue:185 (`truncate` on the code)
- **frame** `gradient-easing-authoring/` 1440-light-06-authoring-bezier.png ('cubic-bezier(0.6, -0.28, 0.735, 0.0…'), 390-dark-06-authoring-bezier.png ('cubic-bezier(0.6, -0.28, …')
- **observed** The readout is the only place the literal appears (the picker's own readout is suppressed, :readout=false). It truncates, so the fourth control-point value is hidden at desktop and half the literal is hidden on a phone.
- **expected + canon** The one-literal law implies the one literal is legible. It should wrap (break-all on commas) or scale, not ellipsize a numeric value.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Replace `truncate` with wrapping (`break-words`/`overflow-wrap:anywhere`) in the rail, and put the icon buttons on the first line's end.

#### UIA-V-381 · MEDIUM · gradient-easing-authoring · At 390 the preset / jump-term Select trigger is 60px tall with ~20px text, the largest element in the Easing section

- **source** audit #10 · **verdict** CONFIRMED · **state** authoring stage open, 390 both themes · **where** GLASS Select trigger inside EasingPicker (coarse-pointer sizing). Measured preset-trigger 302×60 at 390 vs 440×41 at 1440 (log-main.json).
- **frame** `gradient-easing-authoring/` 390-dark-06-authoring-bezier.png, 390-light-06-authoring-bezier.png, 390-dark-07-authoring-bezier-canvas.png
- **observed** 'Pick a curve' renders larger than the 'Easing' section heading and than every row label, so a secondary control becomes the visual anchor of the stage.
- **expected + canon** Type steps descend from the section heading to the control (HIERARCHY). The touch floor is 44px (Chip README) and should be met with padding, not a type jump.
- **owner** **GLASS**: GLASS · *glass component* SelectTrigger under --ui-scale coarse · *head* open-at-HEAD
- **fix shape** Glass: cap the coarse-pointer Select trigger at the 44px floor with body type. Ask BL to confirm at 10.0.1 whether the upsizing comes from the Select or the input-bar rung.

#### UIA-V-382 · MEDIUM · gradient-easing-authoring · The interval disclosure is a hand-rolled accordion with a v-show hard cut; glass Accordion/Collapsible exist

- **source** audit #11 · **verdict** AMENDED · **state** row closed ↔ row open · **where** demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue:125-150 (button aria-expanded + custom chevron) and :151-155 (v-show body); styles :256-278
- **frame** `gradient-easing-authoring/` 1440-light-05-rows-closed.png vs 1440-light-01-row-open.png
- **observed** Each interval row is a bespoke <button aria-expanded> with its own hover wash and chevron rotate. The body toggles with v-show, which is an instant jump with no height motion (part of the owner's 'janky transitions' docket, COHESION §0ao/§0bd).
- **expected + canon** GLASS IDIOM: the disclosure is glass Accordion (type=single, matching the openInterval model) or Collapsible, with the expand-fade motion (glass DESIGN.md:1491). fourier cured the same pattern to a glass Collapsible at F.W13.a.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Rebuild as glass Accordion single; keep the specimen head as the trigger slot.
- **confirm** Confirmed at GradientEasingEditor.vue:125-156 (a button with aria-expanded, a custom chevron rotate, and a v-show body). One correction: the installed 7.0.0 exports ./collapsible but NOT ./accordion. Accordion exists only at glass HEAD (src/components/accordion). At the current pin the cure is Collapsible (with expand-fade, DESIGN.md:1491). Accordion single becomes available after the repin.

#### UIA-V-383 · MEDIUM · gradient-easing-authoring · Readout-rail buttons are hand-rolled 24×24 icons (below the touch floor) on a retired radius token

- **source** audit #12 · **verdict** CONFIRMED · **state** row open, 390 (touch) · **where** demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue:186-205 (raw <button class=rail-btn>), :316-338 (`border-radius: var(--radius-input)`); rail :184 `rounded-md`
- **frame** `gradient-easing-authoring/` 390-light-01-row-open.png, 1440-light-01-row-open-el.png
- **observed** Copy and 'Author a custom curve' measure 24×24 at 390 with hasTouch. They are raw buttons with local hover/focus CSS. --radius-input is marked REMOVE in glass DESIGN.md:429 ('renamed, no legacy alias'; value.js is named there as a reader to migrate), and the rail itself is a 6px rounded-md literal.
- **expected + canon** Glass Button (emphasis quiet, icon size), which carries the 44px coarse-pointer floor and house focus, with radius taken from the role table rather than a removed token.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Swap to glass Button quiet/icon, and put the rail on the field/control role token in place of --radius-input and rounded-md.

#### UIA-V-384 · MEDIUM · gradient-easing-authoring · Consumer overrides target 7.0.0 internals and break at repin: :deep on .glass-card / data-testid / svg[aria-label] with !important, and :readout=false

- **source** audit #13 · **verdict** CONFIRMED · **state** authoring stage open · **where** demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue:98 (:readout="false"), :107-134 (:deep laws)
- **frame** `gradient-easing-authoring/` 1440-light-06-authoring-bezier.png
- **observed** The seat restyles producer internals that glass HEAD no longer has. HEAD renders data-slot="easing-picker" (not data-testid), offers surface="card"\|"bare" instead of internal .glass-card wells, and has no `readout` prop (glass-ui src/components/easing/EasingPicker.vue:60-79, :411-425). At the glass repin (COHESION §0bo), Laws 1 and 2 go dead silently, and the picker's own readout returns as a second literal.
- **expected + canon** Consumers style through published props and tokens, never :deep into a producer (glass-ui-first law; the file itself says the overrides 'retire at the P7 adopt').
- **owner** **CONSUMER**: CONSUMER
- **fix shape** At the repin, use surface="bare" and the published props, and delete all three :deep laws. Add a repin check that the picker shows no second readout.

#### UIA-V-385 · MEDIUM · gradient-easing-authoring · The consumer ignores EasingPicker's available `preset` prop at 7.0.0

- **source** confirm miss #2 · **verdict** MISSED (confirm seat) · **where** demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue:96-102
- **frame** `gradient-easing-authoring/` The 7.0.0 EasingPicker.vue.d.ts has `preset?: string` ('The initial bezier preset key'), and the stage passes only :model-value.
- **observed** The 7.0.0 EasingPicker.vue.d.ts has `preset?: string` ('The initial bezier preset key'), and the stage passes only :model-value. demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue:96-102 Passing the selected tile id as :preset would at least make the Select name the curve when authoring opens. This is a partial consumer cure for the preset desync, independent of the glass-side re-derivation.
- **owner** **CONSUMER**: CONSUMER

#### UIA-V-386 · MEDIUM · atmosphere-view · Atom changes land about 4 s after the pick, with a hard cut

- **source** audit #3 · **verdict** CONFIRMED · **state** select change · **where** /#/atmosphere, any Medium change, and Arrangement
- **frame** `atmosphere-view/` probe-ground.json: Crayon step 22.6→179.6 at 4089 ms; Oil Pastel 188.7→22.5 at 4320 ms; 1440-light-04-medium-smooth.png (still showing the previous black state 1.6 s after the pick)
- **observed** For about 4 s the select shows the new value but the ground shows the old one. Then the field hard-cuts, with no crossfade and no pending indicator. Measured under load average ~100, so the absolute latency may be inflated (PLAUSIBLE), but the hard cut is structural.
- **expected + canon** Tuning feedback within one frame to about 300 ms, or a crossfade over the register swap. A long compile should show a pending state.
- **owner** **GLASS**: GLASS — useAurora medium/program swap (glass-ui/src/components/aurora/composables/useAurora.ts). The consumer has no debounce on this path (useAtmosphere.ts:277 debounces persistence only) · *glass component* aurora (src/components/aurora/composables/useAurora.ts) · *head* open-at-HEAD
- **fix shape** Glass: prewarm or compile the medium programs asynchronously and crossfade the swap. Consumer: show a busy state on the Medium trigger until the renderer acknowledges.

#### UIA-V-387 · MEDIUM · atmosphere-view · Enums with three options use full-width dropdowns instead of the segmented control

- **source** audit #6 · **verdict** CONFIRMED · **state** select open · **where** /#/atmosphere Arrangement/Motion selects
- **frame** `atmosphere-view/` 1440-light-03d-select-motion-open.png, 390-dark-03b-select-arrangement-open.png
- **observed** Scattered/Composed/Centred and Still/Breathing/Drifting each take a 900 px stadium trigger plus a popover, so every comparison costs two clicks.
- **expected + canon** The glass segmented control (Tabs/ToggleGroup variant; --radius-tab stadium, DESIGN.md:391) is the idiom for a small, mutually exclusive, always-visible choice. The owner's memory also records a preference for reusing Tabs variants over new controls.
- **owner** **CONSUMER**: CONSUMER — AuroraPane.vue:145-157 (Arrangement, 3 options) and :173-185 (Motion, 3 options)
- **fix shape** Use a ToggleGroup/Tabs segmented variant for Arrangement and Motion inside their ConfiguratorRow. Keep Select for Harmony (6 options with strip previews) and Medium (7 options).

#### UIA-V-388 · MEDIUM · atmosphere-view · Last glyph of Select values is clipped ('Scattered' renders as 'Scatterea')

- **source** audit #8 · **verdict** CONFIRMED · **state** default · **where** /#/atmosphere triggers, both viewports
- **frame** `atmosphere-view/` 1440-light-01-default.png (Arrangement 'Scatterea', Medium 'Smooth' with a clipped h), 390-light-01c-fullpage.png
- **observed** probe-type.json: value span overflow:hidden, -webkit-line-clamp:1, width equal to scrollWidth (81 px). The italic overhang of the final glyph is cut off.
- **expected + canon** Glyphs render whole. Glass controls should tolerate slanted or overhanging faces.
- **owner** **GLASS**: GLASS — SelectTrigger.vue:59 (`[&>span]:line-clamp-1` gives the value span overflow:hidden with no inline-end padding), triggered by the consumer's italic above · *glass component* SelectTrigger (SelectTrigger.vue:59) · *head* open-at-HEAD
- **fix shape** Glass: add padding-inline-end of about 0.1em (or overflow-clip-margin) to the clamped value span. The consumer fix (drop italic) removes the trigger here.

#### UIA-V-389 · MEDIUM · atmosphere-view · On touch, the coarse-pointer scale inflates control text 1.5×, above the pane's labels

- **source** audit #9 · **verdict** CONFIRMED · **state** default, select open, action bar · **where** /#/atmosphere 390 (touch)
- **frame** `atmosphere-view/` 390-light-01c-fullpage.png, 390-light-03a-select-harmony-open.png, 390-dark-06a-after-copy.png
- **observed** Trigger values and options are 21 px, while row labels are 12.2 px and slider labels are about 16 px. The 'Copy JSON' and 'Reset' buttons are 21 px on 54 px capsules. The harmony list overflows its 16 rem max-height, so Monochrome's strip is clipped behind a scroll chevron. The biggest text on the pane after the title is the dropdown values.
- **expected + canon** The comfort axis should enlarge hit area (the --control-floor 44 px), not invert the type scale. Label ≥ value text within a row.
- **owner** **GLASS**: GLASS — src/styles/tokens/light-dark.css:17-21 (`@media (pointer:coarse){--ui-scale: var(--ui-coarse-scale,1.5)}`) feeding --control-text and --dropdown-text (tokens/sizing.css:35,62) · *glass component* sizing.css (src/styles/tokens/light-dark.css:17-21) · *head* open-at-HEAD
- **fix shape** Glass: scale control height and padding under coarse pointer but cap text at about 1.15×, or split --ui-scale into hit and type axes. Consumer interim: set --ui-coarse-scale on the pane.

#### UIA-V-390 · MEDIUM · atmosphere-view · Consumer `h-9` pins the Select triggers at 36 px on touch, under the 44 px floor

- **source** audit #10 · **verdict** CONFIRMED · **state** default · **where** /#/atmosphere 390
- **frame** `atmosphere-view/` 390-light-01c-fullpage.png; capture-log.json 390-light-default triggers box height 36
- **observed** Trigger box height is 36 px at 390 with a coarse pointer, while the glass control floor lifts to --touch-target 2.75rem.
- **expected + canon** glass light-dark.css:10-13: every scaled control clamps at ≥44 px (WCAG 2.5.5).
- **owner** **CONSUMER**: CONSUMER — AuroraPane.vue:128,148,162,176 (`h-9`)
- **fix shape** Drop `h-9` (and `min-w-menu`, which is moot at w-full) and let SelectTrigger's control-height cohort size it.

#### UIA-V-391 · MEDIUM · atmosphere-view · Copy JSON gives no feedback; Reset has no 'modified' state

- **source** audit #13 · **verdict** CONFIRMED · **state** after Copy JSON; defaults · **where** /#/atmosphere footer actions
- **frame** `atmosphere-view/` 1440-dark-06a-after-copy.png, 1440-light-06b-after-reset.png; capture-log.json clip + *-copy toasts (only the route live region 'Atmosphere view')
- **observed** The clipboard write succeeds, and the JSON includes a 12-digit oklch seed and the interactivity atom. There is no toast, label swap or check icon. Reset is always enabled and identical at defaults, with no marker of which atoms differ from the default.
- **expected + canon** A consistent success state for clipboard actions (sibling Copy CSS on gradient). useConfiguratorState (DESIGN.md:1443) provides the draft/diff/reset semantics.
- **owner** **CONSUMER**: CONSUMER — ConfigSliderPane.vue:88-94 (copyAsJson, resetDefaults)
- **fix shape** Use a transient 'Copied' swap on the button (the glass copy idiom used elsewhere). Drive Reset's enabled state and per-row modified dots from useConfiguratorState. Round the seed in the export.

#### UIA-V-392 · MEDIUM · atmosphere-view · No selected-item mark in the Selects; hovered and selected rows look the same

- **source** audit #14 · **verdict** CONFIRMED · **state** select open + keyboard move · **where** /#/atmosphere, all four Selects open
- **frame** `atmosphere-view/` 1440-dark-03a2-harmony-kbd-hover.png (the Complementary hover ring is the only mark; selected Analogous is unmarked), 1440-dark-03d-select-motion-open.png
- **observed** After ArrowDown, nothing shows which option is current. The only emphasis is the bordered highlight on the focused row.
- **expected + canon** A persistent selected mark separate from hover/focus.
- **owner** **GLASS**: GLASS — SelectItem in the consumed 7.0.0 shows no indicator. Glass HEAD SelectItem.vue:56-83 has a start-gutter dot by default (lands with the pin bump) · *glass component* SelectItem (SelectItem.vue:56-83) · *head* open-at-HEAD
- **fix shape** Take glass HEAD's SelectItem indicator (pin bump, I-30). Verify on this pane after the bump.

#### UIA-V-393 · MEDIUM · atmosphere-view · Dock view-select shows no view name on /#/atmosphere, and the route is not in the public view list

- **source** audit #16 · **verdict** CONFIRMED · **state** default · **where** /#/atmosphere dock, 1440
- **frame** `atmosphere-view/` 1440-light-01-default.png (sparkle + chevron, empty label), capture-log.json triggers[0] text '' width 60
- **observed** A public route renders with an unlabeled dock trigger, and the menu offers no entry for the current page. The only way back to it is the URL.
- **expected + canon** The dock names the current view on every public route (sibling views show their label).
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/DockViewSelect.vue:87 (`<SelectValue v-if="isDesktop"/>` resolves against viewEntries, which excludes atmosphere outside admin) plus the viewEntries source
- **fix shape** Either list Atmosphere (and Blob) in the public view entries, or render the current route's label in the trigger when it is not in the list. Alternatively, make the route admin-only for real.

#### UIA-V-394 · MEDIUM · atmosphere-view · Hard 8px offset drop shadow on a glass card (not glass-idiomatic)

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `atmosphere-view/` 1440-light-01-default.png, 390-light-01c-fullpage.png, 1440-dark-03a2-harmony-kbd-hover.png; probe-type.json cardShadow 'color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px'
- **observed** The Atmosphere Card has a solid, unblurred, brutalist offset slab at bottom-right. It fights the translucent glass tier='resting' material and adds to the heavy look the owner calls 'god awful'. Also: the open Select popover in 390-light-03a carries a doubled grey slab offset to the lower-left, which clips the 'ARRANGEME' label behind it.
- **owner** **CONSUMER**: CONSUMER (verify against the value.js card idiom and demo/DESIGN.md before routing)
- **fix shape** Confirm which layer injects the shadow (pane-wrapper--stage, or an app-level card token). Replace it with the glass elevation token for the tier, and check the popover's second plate.

#### UIA-V-395 · MEDIUM · atmosphere-view · The dock collapses to an unlabelled pink disc after in-pane interaction

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `atmosphere-view/` 1440-light-04-medium-oil-pastel.png, 1440-dark-03a2-harmony-kbd-hover.png (the dock is a single pink circle at top centre); compare 1440-light-01-default.png (expanded: sparkle, Login, @mbabb)
- **observed** After Select or keyboard interaction, the top dock shrinks to a bare filled disc with no icon or label. Navigation and the Login affordance disappear from view while the user tunes the pane.
- **owner** **GLASS+CONSUMER**: CONSUMER/GLASS (dock collapse behaviour, needs a repro) · *glass component* dock · *head* open-at-HEAD
- **fix shape** Record the collapse trigger (idle, scroll or focus-out) and state it in the dock's design contract. If the collapse is intended, the collapsed form still needs an identifying glyph.

#### UIA-V-396 · MEDIUM · blob-view · Config slider tracks are heavy flat slabs with no filled range

- **source** audit #6 · **verdict** CONFIRMED · **state** default / hover / focus, both themes
- **frame** `blob-view/` 1440-light-01-default.png (charcoal slabs), 1440-dark-01-default.png (pale-grey slabs), crops/1440-light-hoverfocus.png, 390-dark-sheet.png
- **observed** Each row is a 24px, fully inked stadium with a transparent range (the spectrum recipe has no fill), so position reads only from a thin thumb. 31 identical charcoal (light) or #a8a8a8-ish (dark) bars dominate the pane visually over the labels and values. Beside them, the picker's channel sliders carry meaning in their gradients. Focus shows only as a faint ring on the thumb (05 vs 04 are nearly identical).
- **expected + canon** A value slider shows its filled extent, as the glass Slider default variant does, with the range tinted by accent. The spectrum variant is for tracks that carry a gradient, which is the picker's use. Focus is clearly visible.
- **owner** **CONSUMER**: CONSUMER — demo/scenes/ConfigSliderPane.vue:152-160 (variant="spectrum") + :196-213 (--slider-track-bg: var(--ink-muted) override)
- **fix shape** Switch config rows to the default Slider variant (filled range, muted track) and drop the ink-muted override. Keep the track thin, with the ≥3:1 contrast target met by the range and not by a full slab. Verify focus-visible on the thumb.

#### UIA-V-397 · MEDIUM · blob-view · Row readout is tiny and follows the label instead of sitting in a right-aligned column

- **source** audit #7 · **verdict** CONFIRMED · **state** default config sliders
- **frame** `blob-view/` 1440-light-02-pane.png, 1440-dark-01-default.png
- **observed** Values such as '0.220' render at about 11px mono in muted ink immediately after the 16.4px label, so the readout column is ragged. The picker console in the same scene right-aligns its values (92.0% / 88.8 / 20.0) in a fixed column, so one scene contains two readout grammars.
- **expected + canon** One readout grammar across the app's slider populations (the file itself cites the M-34 'one rhythm source'). Values sit right-aligned and tabular, at a legible step of the type scale.
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/scenes/ConfigSliderPane.vue:147-161 (:name=fmt(...)) + :214-216 (re-ink of .font-mono); GLASS if ConfiguratorRow cannot right-align name (ConfiguratorRow.vue name slot, 'right of label') · *glass component* ConfiguratorRow readout column · *head* open-at-HEAD
- **fix shape** Right-align the name/readout (ConfiguratorRow justify-between) with tabular-nums at --type-small or larger. If the row cannot do this, route a 'value' placement option to glass-ui.

#### UIA-V-398 · MEDIUM · blob-view · Copy JSON / Reset give no feedback; Reset also overwrites the live palette feed and cannot be undone

- **source** audit #8 · **verdict** AMENDED · **state** Copy JSON / Reset
- **frame** `blob-view/` 1440-light-09-copy-hover.png vs 1440-light-10-after-copy.png; probe-D-reset-3s.png
- **observed** Copy JSON wrote valid JSON (1412 chars, confirmed via clipboard read) but nothing changed on screen: no 'Copied' state, check icon or toast. Reset restored the sliders (bodyRadius 0.45→0.22) instantly, with no confirmation and no undo. Because it is Object.assign(config, structuredClone(BLOB_CONFIG_DEFAULTS)), it also overwrites color.paletteStops with the default ramp until the next picker colour change.
- **expected + canon** Actions show a success or selected state. Reset is scoped to the tunable atoms (or goes through useConfiguratorState.reset) and does not touch the live-fed palette.
- **owner** **CONSUMER**: CONSUMER — demo/scenes/ConfigSliderPane.vue:89-95 (copyAsJson / resetDefaults) and BlobPane.vue:8-9 (color.paletteStops is the live picker feed)
- **fix shape** Give Copy a transient icon swap and label ('Copied'). Scope reset to the slider keys, or use useConfiguratorState. Offer undo or per-row reset (canReset).
- **confirm** There is no feedback state (09 vs 10) and no undo: confirmed. The palette half needs correcting. Object.assign(config, structuredClone(defaults)) does replace config.color, and with it paletteStops, on the shared app config. But heroConfig re-pins color.paletteStops to heroStops (HeroBlob.vue:175), so the only visible blob is unaffected. The overwrite matters only for other readers of appBlobConfig and for the copied JSON. Lower that sub-claim from a visible defect to a data-hygiene defect. Owner CONSUMER.

#### UIA-V-399 · MEDIUM · blob-view · Action bar: ghost buttons nested as pills inside a pill dock, with a grey slab that does not fit the button shape

- **source** audit #9 · **verdict** AMENDED (the owner call changes) · **state** Copy JSON / Reset (rest and hover)
- **frame** `blob-view/` crops/1440-light-actionbar.png, crops/1440-dark-actionbar.png, 390-light-03-pane-scrolled-bottom.png
- **observed** The 'ghost' buttons at rest show a grey fill slab that is inset and offset inside their own stadium: the left edge is clipped and the ellipse ends do not match the pill. That stadium sits inside a second stadium (the GlassDock, radius 9999px). Metrics: dock 254x56 at r=9999px, buttons 36px at r=9999px. The result is the pill-in-pill look the owner called 'too rounded'.
- **expected + canon** The role table (DESIGN.md:385-391) gives stadium to single-line controls. Two pane-footer actions do not need a dock container. A ghost button has no resting fill, and any hover fill follows the button's own radius.
- **owner** **GLASS+CONSUMER**: GLASS — dock/button (GlassDock fit-content + always-expanded hosting Button variant=ghost; DESIGN.md:385-391 radius roles) with CONSUMER use at demo/scenes/ConfigSliderPane.vue:176-187 · *glass component* Button secondary capsule plate misregistered inside GlassDock · *head* open-at-HEAD
- **fix shape** Consumer: drop GlassDock and render the two actions as plain Buttons in the card footer, or use the configurator's own action slot. Glass: inspect Button ghost inside GlassDock (resting background plus the dock item's inner highlight misregistration) and route it to the glass-ui session.
- **confirm** The frame reproduces: crops/1440-light-actionbar shows a grey slab inset inside each stadium, with a clipped left edge, and all of it inside the dock stadium. But the buttons were never ghost buttons. Glass 7 Button has no variant prop. It uses emphasis (primary \| secondary \| quiet \| text, default 'secondary': Button.vue:39,63-65), and it lists variant as a retired attribute that 'paints nothing' (:127-143). Commit 69c0d255 has since deleted the inert variant="ghost" at ConfigSliderPane.vue:165/169. The resting fill is therefore the secondary capsule plate, as designed, so the primary owner is CONSUMER: pass emphasis="quiet" or "text", or drop the GlassDock wrapper (a dock is not a pane-footer container per the DESIGN.md:385-391 role table). The remaining GLASS question is narrower: why a secondary glass-capsule's plate renders misregistered (slab offset from the button's own stadium) when nested inside GlassDock's backdrop. That looks like a nested backdrop-filter or specular-track registration issue, and only that part should be routed to the glass-ui session.

#### UIA-V-400 · MEDIUM · blob-view · Top-of-page transition after an action leaves blank picker and blob frames; dock stays collapsed

- **source** audit #12 · **verdict** CONFIRMED · **state** after Reset (scroll back to top)
- **frame** `blob-view/` 1440-light-11-after-reset.png, 390-light-11-after-reset.png (spectrum and blob blank, picker shadow gone, dock shrunk to a pink orb); probe-D-reset-3s.png + probe-reset.json (dockBox 56px at scrollY 0 after 3s) vs probe-A-scroll-roundtrip-3s (dockBox 424px)
- **observed** Clicking Reset (which needs a scroll to the bottom) and then returning to the top gave light-theme frames in which the spectrum canvas and the blob were blank while the header was condensed. After a 3s settle at scrollY 0 the dock was still collapsed to a 56px orb. A plain scroll round-trip with no pane click restores the dock to 424px.
- **expected + canon** The condense transitions are reversible and never blank content. At scrollY 0 the dock is expanded.
- **owner** **CONSUMER**: CONSUMER — picker header condense + dock condense-on-scroll (demo/shell/dock, picker header) — observed from blob-view; the owning seats should confirm
- **fix shape** Have the dock re-expand on scroll position (scrollY≈0), not only on scroll direction or pointer events. Keep the spectrum and blob painted through the header condense transition. The ground-transition and dock seats should also check this.

#### UIA-V-401 · MEDIUM · blob-view · The action buttons carried a retired prop; glass Button speaks emphasis, not variant

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `blob-view/` Button.vue:39,63,127-143 lists variant as retired and says it paints nothing. At HEAD the buttons fall to emphasis 'secondary' (a plated capsule). The intended quiet look needs emphasis="quiet". The glass Button also emits a dev warning for retired attributes, and the author's no-errors check (errors only) would not surface it.
- **observed** Button.vue:39,63,127-143 lists variant as retired and says it paints nothing. At HEAD the buttons fall to emphasis 'secondary' (a plated capsule). The intended quiet look needs emphasis="quiet". The glass Button also emits a dev warning for retired attributes, and the author's no-errors check (errors only) would not surface it.
- **owner** **CONSUMER**: CONSUMER demo/scenes/ConfigSliderPane.vue:165,169

#### UIA-V-402 · MEDIUM · blob-view · Picker card loses its hard offset shadow and its spectrum during the condense transition

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `blob-view/` 1440-light-11-after-reset.png: the left card's 8px brown offset shadow is missing while the right card keeps it, and the spectrum area paints as flat pink wash. Recorded in the finding's observed text, but not listed as a separate defect of the elevation grammar.
- **observed** 1440-light-11-after-reset.png: the left card's 8px brown offset shadow is missing while the right card keeps it, and the spectrum area paints as flat pink wash. Recorded in the finding's observed text, but not listed as a separate defect of the elevation grammar.
- **owner** **CONSUMER**: CONSUMER (the picker header condense, a sibling of the dock-collapse finding)

#### UIA-V-403 · MEDIUM · admin-users · User rows use a 6px corner that is not on the radius role table, and 16px palette cards nest inside them

- **source** audit #8 · **verdict** AMENDED · **state** rest/expanded · **where** admin-users · rows; expanded disclosure
- **frame** `admin-users/` 1440-light-14-expanded-palettes.png, 390-light-14-expanded-palettes.png; meta rows.borderRadius=6px, adminPal.borderRadius=16px
- **observed** The user rows are hand-rolled boxes with 6px corners (`rounded-md border-card-edge`). No role on the canon table uses 6px. When a row expands, 16px palette cards sit inside the 6px parent, so the inner corners are rounder than the outer ones. The whole page reads as stadium pills floating in square-ish boxes.
- **expected + canon** Radius roles, glass DESIGN.md:383-391: --radius-panel 12px for panel/list containers, --radius-card 16px for content cards. Concentric rule, DESIGN.md:423: an inner corner is max(floor, ctx − inset). Owner 2026-09-23: 'more card like'.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:85 (`rounded-md`), :178 (`.admin-palette rounded-card`), :442 (--specimen-radius)
- **fix shape** Make each user a glass Card (size="sm"), or at least rounded-panel with the relay tokens. Derive the specimen radius from the row (--specimen-radius: max(var(--radius-sm), var(--radius-panel) - inset)) instead of a fixed rounded-card.
- **confirm** CONFIRMED on substance: meta rows.borderRadius=6px and adminPal.borderRadius=16px. 1440-light-14 shows 16px specimens inside the 6px row, and :442 fixes --specimen-radius to radius-card−1px. Citation fix: the concentric rule is DESIGN.md:163 (law) and :405 (context relay, `max(--radius-floor, calc(--radius-ctx − --radius-inset))`), not :423. The radius table is :383-395.

#### UIA-V-404 · MEDIUM · admin-users · The slug pill is an identifier styled as a stadium chip: 12 bold, accent-bordered chips per page

- **source** audit #9 · **verdict** AMENDED · **state** rest/dialog · **where** admin-users · every row; every confirm dialog
- **frame** `admin-users/` 1440-light-00-roster-local.png, 1440-light-10-populated.png, 1440-light-04-row-confirm-delete-user.png, 1440-light-15-row-confirm-delete-palettes.png
- **observed** Each row's identity is a 29px stadium with a 1px accent border, bold 16.4px mono, and crimson accent ink (oklch .47 .19 9.8). A roster of 12 reads as 12 red alarm chips. In the dialogs the inline pill inflates the line box and breaks the description's rhythm (text jumps between lines in 04 and 15).
- **expected + canon** glass DESIGN.md:385: --radius-control stadium is for a control/field/mode/action pill. A static identifier is not a control. Owner: 'too rounded in some pills … should be more card like'. The glass Chip README gives `shape: pill \| cell` if a plate is truly needed.
- **owner** **CONSUMER**: CONSUMER demo/styles/foundation.css:633-635 (.slug-pill `rounded-full border font-bold`) as used at AdminUsersPanel.vue:114-118 and :219-223
- **fix shape** Render the row slug as the row's title text (mono, --foreground ink, no border). In dialogs use inline <code> or a glass Chip shape="cell" size="xs". Keep the accent-bordered stadium for dock identity only.
- **confirm** CONFIRMED in light: foundation.css:633-634 uses `text-mono-small font-bold … rounded-full border`, color oklch(.471 .188 9.8). 1440-light-06 shows 12 crimson stadiums, and 1440-light-16 shows the inline pill inflating the description line box. Amendments: (1) in dark (1440-dark-12) safeAccent resolves to a light ink, so the chips are white-bordered stadiums, not red. The 'red alarm' reading is light-only; the rounding/idiom complaint holds in both schemes. (2) At 390 the pill is 14px/26px high, not 16.4px/29px.

#### UIA-V-405 · MEDIUM · admin-users · Users rows are hand-rolled instead of the admin list grammar; the skeleton matches neither

- **source** audit #10 · **verdict** CONFIRMED · **state** rest/loading · **where** admin-users · rows, loading, expanded-loading
- **frame** `admin-users/` 1440-light-10-populated.png vs 1440-light-18-loading-skeleton.png; 1440-light-13-expand-loading.png vs 1440-light-14-expanded-palettes.png
- **observed** The Users panel re-implements the row: pill + badge + text button + icon. It does not use AdminListItem, which the Names panel uses. The loading skeleton mimics AdminListItem (swatch + 2 lines + lozenge), a row shape Users never shows. The expanded-row skeleton is list-row shaped, but the content is palette specimens (color strip + name), so both loading states jump in shape when data arrives.
- **expected + canon** Sibling admin panes share one list grammar (seat criterion 4). Loading shadows are shaped like their content (the panel's own F-13 note at :61-62).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:82-156 vs demo/palettes/browser/admin/AdminListItem.vue:11-23 (used by AdminNamesPanel.vue:65,116) and AdminListSkeleton.vue:7-19
- **fix shape** Pick one admin row primitive: AdminListItem, extended with a disclosure slot, or glass Collapsible/DataTable. Use it in Users, Names, Flagged, and Audit. Derive the skeleton from that row, and use PaletteCardSkeleton for the expanded palettes.

#### UIA-V-406 · MEDIUM · admin-users · Users toolbar breaks from its sibling admin panels: labelled buttons with italic serif text, and Refresh orphaned at 390

- **source** audit #11 · **verdict** CONFIRMED · **state** rest · **where** admin-users · toolbar
- **frame** `admin-users/` 1440-light-00-roster-local.png, 390-light-10-populated.png, 390-dark-10-populated.png
- **observed** The siblings use one icon-only, named Refresh. Users uses labelled 'Prune empty' / 'Refresh' / 'Delete all palettes' in Fraunces italic, because glass 7's text-caption is italic. One band carries four type voices: the Fraunces title, italic serif buttons, Plus Jakarta search/menu/dialog text, and the Fira count. At 390 the toolbar wraps with the count and Prune on one line and Refresh alone on a second.
- **expected + canon** One admin toolbar grammar across the console (seat criterion 4). glass HEAD a08143ce removed italic from text-caption, so the italic label is a version artefact the demo relies on.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:4-36 (esp. :18,:29,:137 `font-display text-caption`) vs AdminFlaggedPanel.vue:13, AdminTagsPanel.vue:14, AdminAuditPanel.vue:32 (icon-only Refresh)
- **fix shape** Use one AdminToolbar: count caption on the left, icon-only quiet Refresh + a named Prune in an overflow menu on the right, no font-display/text-caption on buttons. Match it in every admin panel.

#### UIA-V-407 · MEDIUM · admin-users · The same count appears three times, and the per-row numbers have no unit

- **source** audit #12 · **verdict** CONFIRMED · **state** rest/empty · **where** admin-users · header, toolbar, rows
- **frame** `admin-users/` 1440-light-00-roster-local.png, 1440-light-07-empty-roster.png, 1440-light-14-expanded-palettes.png
- **observed** 'Users (12)' next to '12 users · 12 empty' next to a bare '0'/'7'/'12' stadium Badge on every row, with no unit. In the empty state: badge 0 + '0 users' + 'No users found.'. The expanded palette specimens add another unlabeled number ('4').
- **expected + canon** One count, labelled once (seat criterion 2: redundant labels, controls that do not earn their place).
- **owner** **CONSUMER**: CONSUMER demo/palettes/admin/AdminPane.vue:5 (header Badge) + AdminUsersPanel.vue:8-13 (count line) + :119-121 (per-row Badge)
- **fix shape** Keep the toolbar caption and drop the header badge on this pane, or the reverse. Render the per-row count as a caption ('7 palettes') in the row's secondary line, not a Badge.

#### UIA-V-408 · MEDIUM · admin-users · Sort control is a ⋮ overflow glyph, and the active sort is invisible at rest

- **source** audit #13 · **verdict** CONFIRMED · **state** menu open · **where** admin-users · search field trailing slot / sort menu
- **frame** `admin-users/` 1440-light-02-sort-menu-open.png, 390-light-02-sort-menu-open.png
- **observed** ⋮ usually means 'more actions', not 'sort'. The current mode ('Newest first') only shows once the menu is open. The rows never show createdAt/lastSeenAt, so 'Newest first' orders by a date the user cannot see. At 1440 the menu (44px sans rows) covers Prune/Refresh.
- **expected + canon** Controls signify their function. The selected state is visible (seat criterion 5).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/UserSortMenu.vue:6-14 (EllipsisVertical trigger)
- **fix shape** Use a glass Select or a DropdownMenu trigger showing an ArrowUpDown icon plus the current label ('Newest'). Show 'joined 3d ago' in the row caption so the sort has visible grounds.

#### UIA-V-409 · MEDIUM · admin-users · Filtered no-match and true empty share one plate, and it contradicts the count line

- **source** audit #14 · **verdict** CONFIRMED · **state** empty · **where** admin-users · empty (filtered) / empty roster
- **frame** `admin-users/` 1440-light-01-empty-filtered.png, 390-dark-01-empty-filtered.png, 1440-light-07-empty-roster.png
- **observed** Searching 'zzzz-no-such-user' shows the true-empty watercolor dot trio and 'No users found.', while the line above still says '12 users · 12 empty' and the badge says 12. There is no 'clear search' action (only the field's ×).
- **expected + canon** States are distinct and consistent (seat criterion 5). EmptyState.vue's own note keeps the true-empty invitation for true emptiness.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:80 (single `No users found.` EmptyState) + :8-13
- **fix shape** When usersSearch is non-empty, render 'No users match “zzzz…”' (plain register) with a Clear-search action. Keep the dot-trio plate for a genuinely empty roster.

#### UIA-V-410 · MEDIUM · admin-users · Glass DialogTitle has no display voice: every confirm title renders as body sans

- **source** audit #15 · **verdict** AMENDED · **state** dialog open · **where** admin-users · all confirm dialogs
- **frame** `admin-users/` 1440-light-03-prune-confirm.png, 1440-light-04-row-confirm-delete-user.png, 390-dark-04-row-confirm-delete-user.png
- **observed** 'Prune every empty user?' / 'Delete user?' render in Plus Jakarta at weight 400, the same voice as the description. The pane behind them titles in the app's display face (Fraunces). The dialog's heading does not read as a heading.
- **expected + canon** Titles take the display register (--font-display + --type-weight-display), so a consumer's display rebrand reaches dialogs too.
- **owner** **GLASS**: GLASS dialog/DialogTitle — src/components/dialog/styles.css:70-74 (size/leading/tracking only; no font-family/weight) vs DESIGN.md:766-775 (display voice for titles/section heads via --font-display/--type-weight-display) · *glass component* DialogTitle (src/components/dialog/styles.css:70-74) · *head* open-at-HEAD
- **fix shape** Route to the glass-ui session: add `font-family: var(--font-display); font-weight: var(--type-weight-display)` to [data-slot=dialog-title] in @layer components. The consumer changes nothing.
- **confirm** The observation is CONFIRMED: 1440-light-03/16 show a sans title at weight 400, the same weight as the description. glass HEAD dialog/styles.css:70-74 `:where([data-slot="dialog-title"])` sets only size/leading/tracking. The proposed fix contradicts glass canon, though. DESIGN.md:874-900 (the 2026-09-22 O-23/O-32 R2 correction) puts .text-title/.text-heading on the TEXT face at --type-weight-title 700 and deliberately moved them off the display face. The :766-775 citation covers display-mega/hero utilities, not dialog titles. Corrected GLASS ask: give [data-slot=dialog-title] font-weight: var(--type-weight-title) (text face, per the .text-title row, semantic.css:151), not --font-display. Owner stays GLASS. The mismatch with value.js's Fraunces pane titles is a consumer display-face choice, not a glass defect.

#### UIA-V-411 · MEDIUM · admin-users · No disclosure affordance: expandable rows look like inert rows until clicked

- **source** audit #18 · **verdict** CONFIRMED · **state** rest/hover/selected · **where** admin-users · populated rows / expanded
- **frame** `admin-users/` 1440-light-10-populated.png, 1440-light-11-row-hover.png, 1440-light-14-expanded-palettes.png
- **observed** Rows with palettes and rows without look the same apart from the delete button. The only cue is the cursor, and the hover tint (bg-accent/50) is barely visible. The open state shows as a hard dark rule under the header.
- **expected + canon** Selected and expandable states are signified (seat criterion 5). glass has Collapsible (trigger + content).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:95-107 (row is role=button with no chevron), :158 (expanded area `border-t border-border bg-muted/30`)
- **fix shape** Use glass Collapsible, with a rotating chevron in the row's leading or trailing slot. Mark the open row with the selection card variant (glass Card variant="selection") instead of the border-border rule.

#### UIA-V-412 · MEDIUM · admin-users · The Users card jumps vertically between states because the stage is centred

- **source** audit #19 · **verdict** CONFIRMED · **state** loading/empty/error · **where** admin-users · every state change (load, refresh, empty, error, refused)
- **frame** `admin-users/` 1440-light-00 (card y=112) → 1440-light-05 (y≈291) → 1440-light-07 (y=307) → 1440-light-09 (y=278); 390-light-08 (card top ≈265px css under a 75px dock)
- **observed** The card is vertically centred in the scene band, so each content-height change moves the whole card, header included: refresh shrinks it to 3 skeleton rows and it jumps about 180px. At 390 about 190px of dead space sits above short states.
- **expected + canon** The pane header is a fixed anchor, and transitions are not janky (docket §0ao).
- **owner** **CONSUMER**: CONSUMER demo/styles/shell.css:149-152 (`.pane-main { justify-content: center }`)
- **fix shape** Align admin panes (list scenes) to the top (justify-content: flex-start, or a scene-level `data-align=start`). Keep centring only for short hero plates.

#### UIA-V-413 · MEDIUM · admin-users · Fixed 6-char tail split cuts slugs mid-word, so the truncated identity reads wrong

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `admin-users/` 390-light-10-populated.png, 390-light-02-sort-menu-open.png
- **observed** 'eager-mapping-ember-sparrow' renders 'eager-mapping-em… parrow', and 'verdant-tidal-moss-owl' renders '\ss-owl'. The tail boundary is a character count, not the last hyphen segment, so the 'identity-bearing suffix' W5-12 promises is itself a fragment.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:288-294 (SLUG_TAIL=6 slugHead/slugTail)
- **fix shape** Split at the last '-' (or the last segment ≥ N chars), or render the full slug on two lines at 390.

#### UIA-V-414 · MEDIUM · admin-names · The same pending count appears twice: header badge and 'Pending · N', and both show 0 over a load error

- **source** audit #4 · **verdict** CONFIRMED · **state** error, loading, Approved tab, all viewports · **where** PaneHeader badge + SegmentedTabs labels
- **frame** `admin-names/` 1440-light-14-error.png ('Names 0' + 'Pending · 0' above 'Couldn't load proposals.'), 1440-light-15-loading.png ('Pending · 0' under skeletons), 1440-light-11-approved-populated.png (badge '0' while the Approved list shows 1), 390-light-05-pending-populated.png (badge Fira 600 21px next to a 25.9px title)
- **observed** The count is stated twice. The strip claims 0 during loading and error: a false moderation fact, which the A-3 comment at AdminPane.vue:136-137 forbids for the badge. At 390 the badge is almost title size.
- **expected + canon** One count, only when it is true (the A-3 principle), no redundant labels (CLUTTER). The badge rung should sit below the title on the type ladder.
- **owner** **CONSUMER**: CONSUMER — AdminPane.vue:5 and :138-144 (adminCount suppressed for loading/access only); AdminNamesPanel.vue:281-282 (count baked into tab labels)
- **fix shape** Keep one count, either the tab label or the badge (suggest dropping the badge and keeping 'Pending · N'). Suppress counts while loading or on error, e.g. label 'Pending' with no number. Give the badge the caption rung, not a display-size rung.

#### UIA-V-415 · MEDIUM · admin-names · Moderation notice is a hand-rolled palette-card chip with literal green, inserted above the tabs so the layout shifts

- **source** audit #5 · **verdict** CONFIRMED · **state** after Approve / Reject / Delete · **where** AdminPane.vue:29-39
- **frame** `admin-names/` 1440-light-09-reject-notice.png, 1440-light-10-approve-notice.png, 390-light-10-approve-notice.png (a 60 px three-line mono chip), 390-dark-10-approve-notice.png
- **observed** A 12 px Fira green chip (Tailwind palette literals, rounded-panel) mounts above the Pending\|Approved strip and pushes the tabs, search and list down 28-60 px. The error variant has no dismiss affordance (autoDismiss 0, no close button).
- **expected + canon** Message tones live on glass Alert/Toast (glass Button.vue:41-44: success/warning/info 'are message tones and live on Alert/Toast'). Tokens, not literals. No layout shift on feedback.
- **owner** **CONSUMER**: CONSUMER — AdminPane.vue:29-39 imports ActionFeedback from browser/card/PaletteCard (cross-feature reach); ActionFeedback.vue:8-10 uses bg-green-500/10 text-green-600 dark:text-green-400, text-xs, fira-code
- **fix shape** Route the notice through the glass Toast (Toaster, tone success/destructive, with a close), or a reserved-height glass Alert slot. Delete the ActionFeedback import from the admin pane.

#### UIA-V-416 · MEDIUM · admin-names · List rows and skeleton rows are hand-rolled boxes on an off-canon 6 px radius, and the recipe is copied across four admin panels

- **source** audit #6 · **verdict** CONFIRMED · **state** populated / loading · **where** AdminListItem.vue:11
- **frame** `admin-names/` 1440-light-05-pending-populated.png (manifest rows radius 6px, border 1px card-edge), 1440-light-11-approved-populated.png, 390-light-05-pending-populated.png
- **observed** Two-line swatch+name+readout rows are bordered divs at radius 6 px. No glass surface or primitive. The radius is not on the role table.
- **expected + canon** glass DESIGN.md:385-391 role table: a multi-line holder is --radius-field or --radius-card (16 px) or --radius-panel (12 px); no 6 px rung. One row recipe (COHESION).
- **owner** **CONSUMER**: CONSUMER — AdminListItem.vue:11, AdminListSkeleton.vue:9 (rounded-md, border-card-edge); copies at AdminAuditPanel.vue:84, AdminFlaggedPanel.vue:74, AdminUsersPanel.vue:85
- **fix shape** Put AdminListItem on a glass surface (Card tier wash/quiet, or a list-row primitive) with radius var(--radius-panel), and have AdminAudit/Flagged/Users consume AdminListItem instead of re-spelling the row. If glass lacks a list-row primitive, route one.

#### UIA-V-417 · MEDIUM · admin-names · Loading skeleton doesn't match the row it stands for: square swatches, one lozenge for two icon buttons, near-black blocks in dark

- **source** audit #7 · **verdict** CONFIRMED · **state** loading · **where** AdminListSkeleton.vue:13-17
- **frame** `admin-names/` 1440-light-15-loading.png (manifest skeleton swatch radius 4px despite rounded-full), 1440-dark-15-loading.png and 390-dark-15-loading.png (near-black blocks on the brown plate)
- **observed** The circle swatch paints as a 4 px square. The action slot is one rounded rectangle. In dark the ink mix renders as black holes, heavier than the content that replaces them, contrary to utils.css:50-53 ('lifted above it in dark').
- **expected + canon** The skeleton traces the loaded row (a circle swatch, two icon-button circles on Pending) and stays low-contrast in both schemes.
- **owner** **GLASS+CONSUMER**: GLASS — Skeleton 7.0.0 unlayered radius beats `rounded-full` (cured at HEAD src/components/skeleton/Skeleton.vue:59-66 @layer components → repin). CONSUMER — AdminListSkeleton.vue:13-17 (trailing h-7 w-14 lozenge vs two 30 px circles), demo/styles/utils.css:56-60 (.skeleton-ink-register dark ink) · *glass component* Skeleton (src/components/skeleton/Skeleton.vue:59-66) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** Repin glass so rounded-full applies (or set the skeleton radius var). Replace the lozenge with icon-only-sized circles. Re-derive --skeleton-ink in dark so it lifts above --well-bg.

#### UIA-V-418 · MEDIUM · admin-names · No in-flight state on Approve/Reject/Delete: busyNameIds is exported but never reaches the panel

- **source** audit #8 · **verdict** CONFIRMED · **state** write in flight · **where** AdminNamesPanel.vue:76-91
- **frame** `admin-names/` 1440-light-06-approve-hover.png (the button stays live; there is no loading affordance anywhere in the flow)
- **observed** A second press during the POST is silently refused (useColorNameQueue.ts:77) and nothing on the row says a write is pending.
- **expected + canon** STATES: the glass Button `loading` prop 'marks an in-flight command and suppresses activation' (glass Button.vue:57-58).
- **owner** **CONSUMER**: CONSUMER — useColorNameQueue.ts:33 and :125 (busyNameIds), usePalettePorts.ts:256; AdminPane.vue:42-56 does not pass it; AdminNamesPanel.vue:167-181 has no busy prop
- **fix shape** Pass busyNameIds into AdminNamesPanel and bind :loading="busy.has(item.id)" on the row's buttons.

#### UIA-V-419 · MEDIUM · admin-names · Focus drops to <body> after a confirmed Reject or Delete

- **source** audit #9 · **verdict** CONFIRMED · **state** after the confirm Dialog accepts · **where** AdminNamesPanel.vue:147-163
- **frame** `admin-names/` 1440-light-09-reject-notice.png (manifest focused = BODY)
- **observed** The Dialog restores focus to its trigger, which the removal has just unmounted, so a keyboard user is dumped to the document start.
- **expected + canon** Focus moves to the next row's action, or the list or empty state, after a destructive act (STATES: focus).
- **owner** **CONSUMER**: CONSUMER — AdminNamesPanel.vue:210-218 (onConfirm closes the Dialog, then the row that triggered it is removed)
- **fix shape** Use DialogContent @close-auto-focus.prevent and focus the next row's first button, or the SegmentedTabs strip when the list is empty.

#### UIA-V-420 · MEDIUM · admin-names · Pending\|Approved switches panels but is announced as a toggle group, not tabs

- **source** audit #10 · **verdict** CONFIRMED · **state** all · **where** AdminNamesPanel.vue:23-28
- **frame** `admin-names/` 1440-light-01-empty-pending.png (manifest strip role=group, buttons aria-pressed)
- **observed** role=group with aria-pressed buttons controls a content-panel swap. There is no tablist, tab or tabpanel relationship.
- **expected + canon** glass tabs/README.md:27-31: `variant="pill" semantics="tabs"` is the glass-pill panel-navigation form (role=tablist/tab + aria-selected).
- **owner** **CONSUMER**: CONSUMER — AdminNamesPanel.vue:23-28 (variant="pill" with no semantics)
- **fix shape** Add semantics="tabs" and give each branch root role=tabpanel with aria-labelledby.

#### UIA-V-421 · MEDIUM · admin-names · At phone width the search field outweighs the selector it serves

- **source** audit #11 · **verdict** CONFIRMED · **state** 390 all states · **where** AdminNamesPanel.vue:35 (#query slot)
- **frame** `admin-names/` 390-light-05-pending-populated.png (manifest: tab labels 13px Fraunces in a 34px track; search field 21px Plus Jakarta), 390-dark-01-empty-pending.png
- **observed** The Pending\|Approved strip (primary navigation) reads as a thin 13 px band, while the stamped search well below it is the heaviest control on the card.
- **expected + canon** HIERARCHY: the selector dominates its own query. Controls share one type rung.
- **owner** **CONSUMER**: CONSUMER — the SearchBar `search-seated` slot (AdminPane.vue:60-66, demo/styles/utils.css:132-138), composed with the glass InputBar field rung
- **fix shape** Bring the search field to the body rung (and its well to the strip's height), or step the strip labels up. Verify whether the 21 px comes from the glass InputBar at coarse pointer; if so, route it to glass.

#### UIA-V-422 · MEDIUM · admin-names · The dock loses its view label and admin identity

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `admin-names/` 1440-light-05-pending-populated.png (dock collapsed to an unlabeled pink blob, where 01 shows 'Names · admin · @mbabb'), 390-light-05/10/15 (only the tag icon and a kebab; no 'Names' and no admin marker)
- **observed** At 1440 the dock alternates between the full pill and a bare blob across states of the same page. At 390 nothing in the chrome says the user is in admin mode.
- **owner** **CONSUMER**: CONSUMER dock (outside this seat's files); route to the dock seat

#### UIA-V-423 · MEDIUM · admin-audit · Action badge is the loudest text in each row (16.4px semibold uppercase) and every action shares one neutral tone

- **source** audit #4 · **verdict** AMENDED · **state** entries · **where** admin-audit, entries, all viewports/themes
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-entries-1440-light.png, p2-rowhover-crop-1440-dark.png, capture2-log-light.json (badge fs 16.4px fw 600 tf uppercase)
- **observed** Computed badge font-size is 16.4px at weight 600, uppercase with caps tracking. The time text is also 16.4px and the pane description is 14.4px, so 'DELETE-USER' / 'IMPERSONATE' shouts in every row. The consumer's text-mono-caption never applies: Badge's size axis (default md = --control-label) wins. Destructive acts (delete-user, delete-palette, impersonate) look the same as approve-color.
- **expected + canon** glass-ui Badge has a size axis (sm = --type-caption) and a tone axis (neutral/destructive/success/warning/info), glass-ui src/components/badge/index.ts:44-66, 'a tone is not a style'. A caption-scale mark should sit under the primary line, and severity should be carried by tone.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminAuditPanel.vue:89 (class 'text-mono-caption' loses to Badge SIZE md; no size/tone passed)
- **fix shape** <Badge size="sm" :tone="toneFor(entry.action)"> with delete-* -> destructive, approve-* -> success, reject-* -> warning, impersonate -> warning/info. Drop the class override and the uppercase caps register.
- **confirm** The badge measures 600 weight, uppercase, 16.4px at 1440 and 14px at 390, the same size as the time and target (16.4 / 14). It dominates by weight and caps, not by size. The claim 'text-mono-caption never applies' holds from the measurement. glass badge/index.ts:59-66 at HEAD has TONE (neutral/destructive/success/warning/info) and SIZE sm=--type-caption, and the consumer passes neither. The frames show DELETE-USER, IMPERSONATE and APPROVE-COLOR in the identical neutral plate.

#### UIA-V-424 · MEDIUM · admin-audit · The audit log never shows who acted: actorSlug and payload are fetched but not rendered

- **source** audit #5 · **verdict** CONFIRMED · **state** entries · **where** admin-audit, entries
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-entries-1440-light.png
- **observed** Rows show action, time and target only. AuditEntry carries actorSlug and payload, but neither appears anywhere, so the panel cannot answer the first audit question ('who did this').
- **expected + canon** Primary content of an audit ledger = who, what, when, on what. Hierarchy (1) calls for the dominant content to be present.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminAuditPanel.vue:82-102 (AuditEntry at demo/palettes/types.ts:126-134)
- **fix shape** Add an Actor column (the slug in mono). Make the row expandable, or open a popover showing the payload JSON. That would also give the row hover a real affordance (next finding).

#### UIA-V-425 · MEDIUM · admin-audit · Rows light up on hover but do nothing when clicked

- **source** audit #6 · **verdict** CONFIRMED · **state** hover · **where** admin-audit, entries, hover, 1440 + 390, light+dark
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-rowhover-crop-1440-dark.png, p2-entries-1440-light.png (3rd row tinted under the pointer), probe-390-after-wheel.png
- **observed** The row tints on hover (muddy gray-brown in dark), but it has no click handler, no role and no tabindex. The sibling AdminListItem rows (Names) have no hover at all.
- **expected + canon** Hover feedback only on interactive rows (glass press/hover grammar, DESIGN.md:619-625 'list rows — anything that wants press feedback'). One row grammar across admin panes.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminAuditPanel.vue:84 (hover:bg-accent/50 on a non-interactive div)
- **fix shape** Remove the hover class, or make the row a real disclosure (button/role=row + aria-expanded) that reveals actor/payload, with focus-ring and --scale-press.

#### UIA-V-426 · MEDIUM · admin-audit · Error state shows a stale '47 entries' count next to 'Couldn't load the audit log.'

- **source** audit #7 · **verdict** CONFIRMED · **state** error · **where** admin-audit, error (500), 1440 + 390, light+dark
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-error-1440-light.png, p2-error-390-light.png, capture2-log-light.json (error: count '47 entries')
- **observed** The count reads '47 entries' (the previous success) above the error plate. The two contradict each other: a dead backend is reported next to a live count.
- **expected + canon** The sibling panes hide the count over an error: AdminTagsPanel.vue:6 and AdminFlaggedPanel.vue:6 both guard with !loadError ('W7.61 (ATP-12): the count speaks only over a loaded ledger').
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminAuditPanel.vue:28 (count guard omits loadError)
- **fix shape** v-if="!audit.access.value && !audit.loading.value && !audit.loadError.value".

#### UIA-V-427 · MEDIUM · admin-audit · Filter toolbar breaks from its siblings: bare Input pills instead of the admin SearchBar register, free text for a closed action set, and a spacer that halves the Target field

- **source** audit #8 · **verdict** CONFIRMED · **state** toolbar · **where** admin-audit, all states, 1440 + 390, light+dark
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-empty-1440-light.png, empty-390-light.png, p2-filtered-empty-390-light.png, p2-focus-action-crop-1440-dark.png
- **observed** Action (128px) and Target are glass Input size=sm pills. At 1440 the flex-1 Target shares free space with the flex-1 spacer (:25), so Target stops at 369px and leaves about 350px of dead gap before the count. At 390 the count and Refresh wrap to their own left-aligned second line, and with entries they are pushed off-card entirely (see the BROKEN finding). 'Action...' is free text over a closed vocabulary (approve-color, delete-color, delete-user, delete-palette, impersonate) that the user has to guess. Users and Names use glass-ui SearchBar with .search-seated (AdminPane.vue:10-21, :60-66), so the admin panes carry two different query registers.
- **expected + canon** One admin query idiom (cohesion (4)). A closed enum is picked, not typed. No flex spacer competing with a flex field. Single-line fields on the stadium role are correct per DESIGN.md:385 ('--radius-control ... stadium'), so the shape is fine; the register and layout are not.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminAuditPanel.vue:4-25
- **fix shape** Action becomes a glass Select (or a segmented/chip filter) over the known actions. Target becomes the same SearchBar .search-seated field the Users/Names panes use, set flex-1 min-w-0. Delete the :25 spacer. Seat the count + Refresh in PaneHeader's trailing slot.

#### UIA-V-428 · MEDIUM · admin-audit · Refresh is a 28x28 icon-only capsule with no loading feedback, unlike Users' labelled spinning Refresh

- **source** audit #9 · **verdict** CONFIRMED · **state** idle/loading/focus · **where** admin-audit, toolbar, loading, 1440 + 390
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-focus-refresh-crop-1440-light.png, p2-loading-1440-light.png, capture2-log-light.json (refresh box 28x28)
- **observed** Button size=xs measures 28x28 css px, below a 44px touch target at 390. During loading it stays enabled and static. AdminUsersPanel.vue:26-34 renders 'Refresh' with a label, disables while loading and spins its icon. Audit, Flagged and Tags use the bare icon, so four admin panes split between two refresh idioms. The focus ring does paint correctly (p2-focus-refresh-crop).
- **expected + canon** One refresh control across admin panes, with pressed/busy state while fetching and a phone-sized hit area (glass control rungs).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminAuditPanel.vue:32-34
- **fix shape** Adopt the Users recipe (label + spin + :disabled=loading) on all four panels, or the icon-only form at size sm with aria-busy. Share it via one admin toolbar slot instead of four copies.

#### UIA-V-429 · MEDIUM · admin-audit · The pane never scrolls itself: the document scrolls, so the title, filters and count leave the screen, and the pager sits about 2000px down

- **source** audit #10 · **verdict** CONFIRMED · **state** entries, scrolled · **where** admin-audit, entries page 1-2, 1440 + 390
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/probe-1440-after-wheel.png, probe-390-after-wheel.png, probe-scroll.json, p2-entries-bottom-1440-light.png (the scrollPane-to-end frame is identical to the top: nothing to scroll)
- **observed** The Card has scrollHeight == clientHeight == 1940, so its overflow-y-auto and pane-scroll-fade are inert. The HTML element scrolls instead (sh 2068 / ch 900 at 1440, scrollTop 1168 after the wheel). At the pager, the card top is at y=-1056: header, filters and '47 entries' are gone, and 'Page 1 of 3' is separated from the count by the whole list.
- **expected + canon** A data pane is bounded by the stage and scrolls its list under a persistent header and toolbar. The scroll-fade register exists for exactly this.
- **owner** **CONSUMER**: CONSUMER demo/palettes/admin/AdminPane.vue:2 (Card h-full overflow-y-auto, height unbounded)
- **fix shape** Bound the pane to the stage height (max-h / flex min-h-0 chain) so the Card's own scroller works. Make the toolbar sticky. Put 'Page n of m' beside the count, or keep the pager sticky at the list foot.

#### UIA-V-430 · MEDIUM · admin-audit · The card moves vertically on every state change because it is centred in the stage

- **source** audit #11 · **verdict** AMENDED · **state** state transitions · **where** admin-audit, empty -> loading -> entries -> error, 1440 + 390
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-empty-1440-light.png, p2-loading-1440-light.png, p2-error-1440-light.png, p2-entries-1440-light.png, p2-filtered-empty-390-light.png
- **observed** The card top sits at about y=320 css (empty), 310 (loading), 293 (error) and 108 (entries). Typing a filter that empties the result moves the filter field itself under the user's caret and pointer. The owner's docket already names 'janky transitions' (COHESION §0ao/§0bd).
- **expected + canon** Data/admin panes anchor to the top of the stage so the toolbar is spatially stable across states.
- **owner** **CONSUMER**: CONSUMER demo shell stage centring (hosts AdminPane.vue:2; not in the listed files)
- **fix shape** Top-align admin (and other list) panes in the stage (align-self:start), and centre only true single-card scenes.
- **confirm** The logged pane tops at 1440 are 334 (empty), 321 (loading), 304 (error) and 112 (entries), not the 320/310/293/108 the audit reports. The direction and conclusion stand. At 390 the tops are 306 / 311 / 260 / 128 and filtered-empty is 288, so a filter that empties the result does move the fields. The owner is the shell stage (not verified in source by this seat).

#### UIA-V-431 · MEDIUM · admin-audit · Dark-theme filter fields are opaque gray-brown wells with a cool hairline; light ones are opaque cream

- **source** audit #12 · **verdict** AMENDED · **state** idle/focus · **where** admin-audit, toolbar, both themes (most visible in dark)
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-focus-action-crop-1440-dark.png, p2-entries-390-dark.png, empty-1440-dark.png, capture2-log-light.json (input bg rgb(243,236,226) no alpha)
- **observed** Computed Input background is a fully opaque rgb(243,236,226) in light. In dark it renders as a flat gray-brown slab with a greenish-gray hairline on the warm red ground. Neither transmits the field behind it the way the pane glass and capsule buttons do: the buttons' glass-wash is oklab(... / 0.52), the fields are solid.
- **expected + canon** DESIGN.md:17: 'perfected transmissive warm-cream glass (a colorful field behind glass + a defined edge, NEVER gray/dark/opaque, both modes)'.
- **owner** **GLASS**: GLASS Input field surface (field-control glass-defined), canon glass-ui DESIGN.md:17 · *glass component* Input · *head* open-at-HEAD
- **fix shape** Route to the glass-ui session: give the Input/field-control well a translucent warm tint in both schemes, with an edge token that derives from the warm ink rather than a neutral gray. Consumers change nothing.
- **confirm** GLASS ownership is confirmed. The log gives light bg rgb(243,236,226) with no alpha. glass src/components/_shared/field/control.css:75-83 at HEAD sets --control-surface-bg: var(--input-on-glass), and a comment there already admits the token 'is OPAQUE at HEAD (α 1.0)' and that backdrop-filter is inert. Gate G-F2 ships KNOWN-RED, owned by #22 W-FROST. The token values are on-glass-fg.css:37 hsl(36 40% 92%) and dark-arm.css:303 hsl(26 12% 22%). So the relay should cite that known-RED gate rather than file a new defect. The dark well is warm-dark, not gray-brown by token. The 'cool greenish hairline' is faintly visible in p2-focus-action-crop-1440-dark.png but could not be measured from a dark log. Also note: value.js resolves @mkbabb/glass-ui ^7.0.0 (7.0.0 installed), and the captured class was 'glass-defined', while glass HEAD Input.vue:44 emits 'glass-control-edge'. The glass cure reaches this page only on a glass bump.

#### UIA-V-432 · MEDIUM · admin-flagged · Stale success notice paints beside the load-error plate (contradictory verdicts stacked)

- **source** audit #3 · **verdict** CONFIRMED · **state** Dismiss, then Refresh, then the 500 response · **where** load error
- **frame** `admin-flagged/` l-load-error-1440-light.png
- **observed** The green chip 'Dismissed the reports on buy-cheap-pixels-now' sits directly above 'Couldn't load flagged palettes. Internal Server Error [Retry]'.
- **expected + canon** One verdict per surface. The panel's own rule (the W7.81/AF-4 comment at :68-69) is that the error plate never paints beside stale content, and a prior success counts as stale content.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/browser/admin/AdminFlaggedPanel.vue:19-29 (notice region mounted outside the state chain) and useAdminFlagged.ts:81-103 (loadFlagged never clears notice)
- **fix shape** When a read starts or fails, call dismissNotice() in loadFlagged, or render the notice only in the rows branch of the v-if chain.

#### UIA-V-433 · MEDIUM · admin-flagged · Loud reason Badges and the saturated red count out-shout the palette name; the flag count is an unlabeled red dot

- **source** audit #6 · **verdict** CONFIRMED · **state** with reports · **where** with reports
- **frame** `admin-flagged/` c-reports-1440-light.png; d-pagination-1440-light.png
- **observed** The reason badges are 16.4px Fira Code 600 in bold uppercase, tracked, on an opaque stadium. They are the heaviest ink in each row, heavier than the Fraunces palette name. The count renders as a solid red '3'/'7' pill with no noun, and it reads like a notification bubble. User slugs are forced to uppercase ('COPY-CAT-FOX'), which misstates case-sensitive data. When flagCount (7) differs from the listed flags (3), nothing explains the gap.
- **expected + canon** Hierarchy: the palette identity is primary and the reasons are annotations. glass Badge 7.0.0 offers surface="glass" (the quiet transmissive capsule; its d.ts says `secondary`/`outline` placements may route quiet) and size. Data such as slugs keeps its case.
- **owner** **CONSUMER**: CONSUMER — AdminFlaggedPanel.vue:108-110 (Badge tone=destructive count), :151-153 (Badge variant=secondary reasons), :100-104/:157 (uppercase caption register)
- **fix shape** Reason badges: surface="glass" size="sm", no uppercase. Count: label it ('3 reports') in a neutral or quiet Badge, and reserve destructive for a threshold. Drop the uppercase on the userSlug caption. Show '+N more' when flagCount > flags.length.

#### UIA-V-434 · MEDIUM · admin-flagged · Icon-only refresh stretches into a vertical capsule at 390 (touch min-height without min-width) — the owner's 'too rounded pills'

- **source** audit #7 · **verdict** AMENDED · **state** empty / loading at 390 · **where** toolbar
- **frame** `admin-flagged/` a-empty-390-light.png; b-loading-390-light.png (compare a-empty-1440-light.png where it is a 28×28 circle)
- **observed** The refresh button is about 28px wide by 44px tall with a 9999px radius, which makes a tall pill lozenge rather than a round or square icon target.
- **expected + canon** A square geometry for an accessibly named icon command (the glass Button `iconOnly` contract), with the touch target growing in both axes.
- **owner** **CONSUMER**: GLASS — Button (touch/coarse-pointer target sizing for non-iconOnly buttons; DESIGN.md :385-391 'stadium for single-line controls only') + CONSUMER — AdminFlaggedPanel.vue:13 omits iconOnly
- **fix shape** Consumer: add iconOnly to the refresh (and the pager chevrons). Glass: when a coarse pointer raises min-height, also raise min-width on iconOnly buttons, and consider a floor aspect for any button whose content is only an svg. Route to the glass-ui session.
- **confirm** Observation CONFIRMED from pixels: a-empty-390-light refresh is about 28 wide by 43 tall, a stadium lozenge. The 390 manifest has no metrics. Owner split REFUTED on the GLASS half: installed 7.0.0 dist button/styles.css already has `.button[data-icon-only]{inline-size:var(--button-size);block-size:var(--button-size);min-block-size:var(--button-size);padding:0}`, and --control-h-xs = max(1.75rem*ui-scale, --control-floor), with the coarse floor set to --touch-target (44px). An iconOnly button therefore already grows square in both axes. The defect is purely CONSUMER: the missing iconOnly at :13 and the PaginationBar chevrons. At most, route a glass nicety: a dev warning when a Button's only child is an svg without iconOnly.

#### UIA-V-435 · MEDIUM · admin-flagged · Count lives in a toolbar mono line, not the PaneHeader badge like Users/Names; and '0 flagged' duplicates the empty plate

- **source** audit #8 · **verdict** CONFIRMED · **state** empty, with reports · **where** toolbar / header
- **frame** `admin-flagged/` a-empty-1440-light.png; a-empty-390-light.png; c-reports-1440-light.png
- **observed** The empty state says '0 flagged' in the toolbar right above 'No flagged palettes.', the same fact twice. With rows present, '23 flagged' is a bare mono line, while the Users and Names sub-views carry their count as a Badge beside the PaneHeader title.
- **expected + canon** One count, in one place, in the same grammar across the admin sibling panes.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/admin/AdminPane.vue:132-146 (adminCount has no admin-flagged case) + AdminFlaggedPanel.vue:5-10
- **fix shape** Add `case "admin-flagged": return pm.flagged.loading.value \|\| pm.flagged.access.value ? null : pm.flagged.total.value` to adminCount, and delete the toolbar count span. Hide the count when it is 0, since the empty plate already says so.

#### UIA-V-436 · MEDIUM · admin-flagged · Loading skeleton shapes misfire: rounded-full swatch/lozenge render as rounded squares, and the skeleton imitates a row grammar the loaded row doesn't use

- **source** audit #10 · **verdict** CONFIRMED · **state** loading · **where** loading
- **frame** `admin-flagged/` b-loading-1440-dark.png; b-loading-390-light.png
- **observed** The leading swatch (w-8 h-8 rounded-full) and trailing lozenge (rounded-full) paint as square tiles with a small radius. The shape is one 32px square, one title bar and one action block, while the loaded row has 5 overlapping 20px circles, a count badge, a Dismiss and a trash icon, plus a flag-detail sub-list. In dark, the skeletons are flat near-black slabs.
- **expected + canon** Skeleton honors the caller's public shape utility (the glass comment at HEAD Skeleton.vue:59-63). The row shadow matches the row it stands in for.
- **owner** **GLASS+CONSUMER**: GLASS — Skeleton at installed 7.0.0 (dist: unlayered `.skeleton[data-v]{border-radius:var(--radius-input)}` outranks consumer `rounded-full`; fixed at glass HEAD Skeleton.vue:59-66 via @layer components) + CONSUMER — AdminListSkeleton.vue:13,19 vs AdminFlaggedPanel.vue:71-142 · *glass component* Skeleton (Skeleton.vue:59-66) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** Glass: already fixed at HEAD, so value.js needs the pin moved past 7.0.0 (relay: confirm it ships in the next tag). Consumer: give the flagged panel its own skeleton (or reuse the row component with a skeleton prop) that has a swatch cluster, badges and a detail line.

#### UIA-V-437 · MEDIUM · admin-flagged · Hard dark offset slab shadow under the pane (bottom-right) reads as a brown block in light theme and is clipped at the viewport edge in the dialog frame

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `admin-flagged/` c-reports, l-load-error, a-empty-390-light and h-confirm-dialog 1440-light show a solid umber band offset about 8-10px right and below the glass-resting card. That is not a glass elevation shadow, and it collides with the transmissive glass idiom the owner asked for.
- **observed** c-reports, l-load-error, a-empty-390-light and h-confirm-dialog 1440-light show a solid umber band offset about 8-10px right and below the glass-resting card. That is not a glass elevation shadow, and it collides with the transmissive glass idiom the owner asked for.
- **owner** **CONSUMER**: CONSUMER shell (pane stage), not the flagged panel — verify shell-wide before routing

#### UIA-V-438 · MEDIUM · admin-tags · Count + Refresh toolbar wastes a full row, duplicates the empty message, and breaks the sibling admin idiom (header badge)

- **source** audit #5 · **verdict** CONFIRMED · **state** empty, with tags, error · **where** admin-tags · empty / with tags / error
- **frame** `admin-tags/` 1440-light-01-empty.png ('0 tags' over 'No tags yet.'), 1440-light-03-with-tags.png, 1440-light-10-error.png (orphan Refresh button alone on its row, above an EmptyState that also has 'Retry')
- **observed** The first body row holds only a 16px mono '11 tags' at the far left and a 28px Refresh at the far right, with about 1100px of dead space between them. In the empty state, '0 tags' and 'No tags yet.' say the same thing twice. In the error state the count disappears, leaving a lone Refresh button that duplicates the EmptyState's Retry. The sibling panes Users and Names show their count as a Badge in the PaneHeader (AdminPane.vue:5).
- **expected + canon** Cohesion with the sibling admin panes: one count location, the header Badge. No duplicate recovery affordances. Every row earns its place.
- **owner** **CONSUMER**: CONSUMER — AdminTagsPanel.vue:4-17; demo/palettes/admin/AdminPane.vue:5 and :132-146 (adminCount has no 'admin-tags' case)
- **fix shape** Add `case "admin-tags": return tags.loading \|\| tags.access ? null : tags.tags.length` to adminCount. Delete the toolbar row. If Refresh is kept, seat it once (e.g. a header trailing slot) and hide it while the EmptyState owns Retry.

#### UIA-V-439 · MEDIUM · admin-tags · Create row: the primary action is a faint unlabeled 28px '+', Enter does not submit, and category is unconstrained free text

- **source** audit #6 · **verdict** CONFIRMED · **state** create form empty / filled · **where** admin-tags · create form
- **frame** `admin-tags/` 1440-light-03-with-tags.png, 1440-light-06-create-filled.png (create w28 h28 next to 36px sm inputs)
- **observed** Two different rungs share one row: 36px Input sm and a 28px Button xs. The '+' is a pale glass-wash capsule that reads as disabled even when enabled. Neither Input has an @keydown.enter handler, so typing a name and a category and pressing Enter does nothing. Category is a free-text field, so any typo silently creates a new category group; the existing groups (mood/season/use) are never offered.
- **expected + canon** One control rung per row (glass Input size=sm with Button size=sm). The primary action is labeled and visually primary. Pressing Enter in a form submits it. The category picks from the known taxonomy.
- **owner** **CONSUMER**: CONSUMER — AdminTagsPanel.vue:43-76
- **fix shape** Wrap the row in a <form @submit.prevent="tagsApi.createTag()">. Use a Button size="sm" labeled 'Add tag' (emphasis primary). Turn the category into a glass Select/Command combobox seeded from groupedTags keys, with 'new category…' as an entry.

#### UIA-V-440 · MEDIUM · admin-tags · Loading skeletons render as 4px rectangles, not chip shapes (glass 7.0.0 Skeleton overrides the consumer's rounded-full)

- **source** audit #7 · **verdict** CONFIRMED · **state** loading (GET delayed 5s) · **where** admin-tags · loading
- **frame** `admin-tags/` 1440-light-11-loading.png, 390-light-11-loading.png (manifest skeletons radius 4px, class 'h-7 rounded-full')
- **observed** Five flat 4px-cornered off-white bars. The source comment at :86-87 promises 'chip-shaped shadows in the ONE loading-ink register', but at 7.0.0 they do not match the stadium chips that replace them, so the shape jumps on load.
- **expected + canon** A placeholder has the geometry of the content it stands in for: stadium like the chips (DESIGN.md:387 control/badge stadium). The glass HEAD comment names this 'the public shape seam'.
- **owner** **GLASS**: GLASS — Skeleton radius seam (installed 7.0.0 ships scoped `.skeleton[data-v]{border-radius:var(--radius-input)}`, which outranks utilities); fixed at glass HEAD src/components/skeleton (default radius moved to @layer components, lines 59-66). Adoption = glass bump. Consumer site: AdminTagsPanel.vue:94-101 · *glass component* Skeleton (src/components/skeleton) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** Adopt a glass version that includes the @layer fix (no consumer change needed then). Until then, do not hand-patch; the relay confirms the fix is already upstream.

#### UIA-V-441 · MEDIUM · admin-tags · At 390 the delete-confirm Dialog is full-bleed (no side gutter), with rounded corners against the screen edge and a large dead bottom pad

- **source** audit #8 · **verdict** AMENDED · **state** delete confirm Dialog open · **where** admin-tags · delete confirm Dialog · 390
- **frame** `admin-tags/` 390-light-08-delete-confirm.png (dialog x0 w390 radius 16px)
- **observed** The plate spans the full 390px, so its 16px corners sit against the viewport edge. About 90px of empty plate sits under 'Cancel'. At 1440 it is correct: 512px, centred, footer Cancel/Delete right-aligned (1440-light-08, 1440-dark-08).
- **expected + canon** The artifact contract and the glass HEAD dialog comment call for a real gutter per side at phone width (≥16px), and the plate hugs its content.
- **owner** **GLASS**: GLASS — DialogContent geometry at installed 7.0.0; fixed at glass HEAD src/components/dialog/styles.css:16-25 (`inline-size: min(100% - 2 * var(--space-section), 32rem)`). Adoption = glass bump · *glass component* DialogContent (src/components/dialog/styles.css:16-25) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** Adopt glass with the dialog/styles.css gutter clamp. Check the block padding at the 390 rung in the same adoption.
- **confirm** Confirmed: at 390 the dialog is x0 w390 radius 16, and the installed class 'w-full max-w-lg' has no gutter. 390-light-08 shows the full-bleed plate and about 90px of dead pad under Cancel. The GLASS call is correct. Corrections for the relay: glass HEAD is now 6433284a, the gutter clamp sits at dialog/styles.css:21-25 (`inline-size: min(100% - 2 * var(--space-section), 32rem)`), and HEAD also changes the plate radius to --radius-3xl (24px, the 'room' role). The adoption check should therefore expect 24px corners, not 16px.

#### UIA-V-442 · MEDIUM · admin-tags · The write notice is a cross-feature, hand-tinted strip (ActionFeedback) that pushes the form down on every write

- **source** audit #9 · **verdict** CONFIRMED · **state** created / deleted notice · **where** admin-tags · after create / after delete
- **frame** `admin-tags/` 1440-light-07-created-notice.png, 1440-light-09-deleted-notice.png, 390-dark-07-created-notice.png (notice cls 'feedback-chip … bg-green-500/10 text-green-600', 12px Fira)
- **observed** A full-width 28px strip with 12px green mono text: below the type scale and off the palette tokens. It is inserted in flow above the form, so the inputs and chips jump down about 40px and back after 4s. The component is borrowed from the PaletteCard feature folder instead of a shared or glass primitive.
- **expected + canon** Glass idiom: status feedback through a glass primitive (toast / status) with tone tokens, not Tailwind colour literals. Notices must not reflow the working surface (COHESION §0ao, janky transitions).
- **owner** **CONSUMER**: CONSUMER — AdminTagsPanel.vue:19-30 and :195 (imports ../card/PaletteCard/ActionFeedback.vue); ActionFeedback uses the literals bg-green-500/10 text-green-600 dark:text-green-400, rounded-panel, text-xs
- **fix shape** Route admin write results through the glass toast (or a reserved-height status slot with glass tone tokens). If ActionFeedback survives, move it out of PaletteCard/ into shared UI and swap the literals for tone tokens.

#### UIA-V-443 · MEDIUM · admin-tags · The vertically centred pane jumps with every content change (state changes move the whole card)

- **source** audit #10 · **verdict** CONFIRMED · **state** empty → loading → with tags → notice · **where** admin-tags · state transitions
- **frame** `admin-tags/` Compare 1440-light-03-with-tags.png (card top at about 333px) with 1440-light-07-created-notice.png (about 313px), 1440-light-11-loading.png (about 495px) and 1440-light-01-empty.png (about 427px)
- **observed** The card is centred in the viewport, so any change in content height (skeletons, a notice, a new chip wrapping a row) moves its top edge by up to 180px. The header and the input under the cursor move with it.
- **expected + canon** The pane's top edge stays anchored while its content changes. Reads as the 'janky transitions' in value.js COHESION §0ao.
- **owner** **CONSUMER**: CONSUMER — pane placement in the shell/AdminPane host (Card centred in the route viewport)
- **fix shape** Anchor admin panes to the top (e.g. align-self:start with a fixed top offset under the dock, or a min-block-size) rather than centring on content height.

#### UIA-V-444 · MEDIUM · admin-tags · At 390 the delete-confirm footer stacks a full-width, 60px-tall destructive pill ABOVE Cancel

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `admin-tags/` 390-light-08-delete-confirm.png
- **observed** 'Delete tag' is a huge red stadium spanning the whole plate, with Cancel as a text link beneath it. The irreversible action is the largest target and the first one in the stack. At 1440 the order is Cancel then Delete, right-aligned (1440-light-08).
- **owner** **GLASS**: GLASS: DialogFooter stack order and button rung at phone width (installed 7.0.0), to be checked against glass HEAD; consumer site AdminTagsPanel.vue:168-174 · *glass component* DialogFooter (AdminTagsPanel.vue:168-174) · *head* open-at-HEAD
- **fix shape** The stacked footer should put the dismiss action on the safe side, or keep the pair in one row, and use the sm/md rung rather than a full-bleed slab. Relay to glass DialogFooter.

#### UIA-V-445 · MEDIUM · not-found · Coarse pointer: the size=sm CTA label (21px) outranks the body copy (16px) and nearly matches the title

- **source** audit #2 · **verdict** AMENDED · **state** unknown address / refused admin at 390x844 (touch) · **where** Button[data-size=sm] under pointer:coarse
- **frame** `not-found/` 390-light-01-unknown.png, 390-dark-01-unknown.png, 390-light-06-admin-refused.png
- **observed** The measured button is 236x54px with a 21px label. Body copy is 16px and the pane title is 25.9px. The CTA is the loudest text on the plate after the title; at 1440 the same button is 36px tall with a 16.4px label.
- **expected + canon** The control-text rung should stay at or below the body rung. Coarse-pointer growth belongs to the hit box (the 44px floor via --control-floor), not to the label type, so the type hierarchy holds: title > body ≥ control label.
- **owner** **GLASS**: GLASS — glass-ui tokens: styles/tokens/light-dark.css:19 `--ui-scale: var(--ui-coarse-scale, 1.5)` multiplies `--control-text-sm` (styles/tokens/sizing.css:36 = --type-caption × --ui-scale). Canon: DESIGN.md :929-938 says the 44px target floor is carried by --control-floor / [data-control-target], not by scaling type · *glass component* sizing.css (styles/tokens/light-dark.css:19) · *head* open-at-HEAD
- **fix shape** Route to the glass-ui session: decouple --control-text-* from --ui-scale under coarse (cap it at --type-body, or scale height/padding only) and let --control-floor carry the 44px target.
- **confirm** The frame confirms it: in 390-light-01 the 'Back to the picker' label is visibly larger than the body paragraph and close to the title. The GLASS owner is right, but the ask is framed wrong. glass-ui src/styles/tokens/light-dark.css:6-21 says scaling type on coarse pointers is deliberate canon: 'the WHOLE library … grows ~1.5× on touch from this ONE place … so the touch scale is CONSISTENT'. It is not a bug against DESIGN.md. DESIGN.md:929-938 only says the 44px floor is carried by --control-floor, [data-control-target] and .control-bit; it does not forbid type growth. So the relay should be a canon-change request: decouple --control-text* (sizing.css:35-36) from --ui-scale, or cap it at --type-body. It should not be framed as a violation. Also note two local levers. The consumer is pinned at 7.0.0, and DESIGN.md says Button wears [data-control-target] only from 8.0.0. `--ui-coarse-scale` is a public retune knob, so value.js could lower it locally in the meantime.

#### UIA-V-446 · MEDIUM · not-found · Two sentences say the same thing in developer voice, and neither names the address that failed

- **source** audit #3 · **verdict** CONFIRMED · **state** unknown address / refused admin / deep unknown · **where** NotFoundPane.vue:8-16
- **frame** `not-found/` 1440-light-01-unknown.png, 1440-dark-05-deep-unknown.png, 390-dark-01-unknown.png
- **observed** The caption reads 'That address does not name a view of this app.' The body then restates it: 'The demo resolves every address to a named view. This one resolves to none of them — either it was mistyped, or it names a surface this build does not carry.' That is two statements of one fact, in implementation voice ('resolves', 'named view', 'this build does not carry'). On a phone the paragraph wraps to four lines. The attempted path (/foo/bar/baz) is never shown.
- **expected + canon** A dead end should show one thing (the view schema's own comment, viewSchema.ts:263-265): one statement, the offending address and one way out. OM-15/G19 already struck contrived captions that restate the message (EmptyState.vue X.W7.g note).
- **owner** **CONSUMER**: CONSUMER — demo/scenes/notfound/NotFoundPane.vue:8 (PaneHeader description) and :12-16 (paragraph)
- **fix shape** Keep the title. Replace caption and paragraph with one line that names the address (`route.path`, mono, --ink-muted), for example 'Nothing lives at /foo/bar/baz.', then the CTA. Delete the paragraph.

#### UIA-V-447 · MEDIUM · not-found · Dead end hand-rolls its own layout instead of the app's EmptyState register

- **source** audit #4 · **verdict** CONFIRMED · **state** all not-found states · **where** NotFoundPane.vue:10-20
- **frame** `not-found/` 1440-light-01-unknown.png, 1440-light-06-admin-refused.png
- **observed** The pane builds a one-off left-aligned `<p class=text-body text-muted-foreground max-w-prose>` plus a Button. The app already has one empty/error register, EmptyState.vue: a centred Fraunces statement, a plate-ink hint in mono and an #action slot. Browse, the admin panels, PaneErrorPlate and ErrorBoundary all use it. Not-found is the only terminal surface that does not.
- **expected + canon** COHESION §0bl: one idiom, no one-off instances. Every terminal or empty plate in the app speaks through EmptyState.
- **owner** **CONSUMER**: CONSUMER — demo/scenes/notfound/NotFoundPane.vue:10-20 vs demo/shared/ui/EmptyState.vue
- **fix shape** Render `<EmptyState variant="error" message="Not found" :detail="route.path">` with the Home button in #action, inside the pane Card. Drop the bespoke paragraph block.

#### UIA-V-448 · MEDIUM · not-found · Desktop: a full-width stage plate holds two lines and a button, leaving dead space

- **source** audit #5 · **verdict** CONFIRMED · **state** unknown address / refused admin at 1440x900 · **where** NotFoundPane.vue:2-6
- **frame** `not-found/` 1440-light-01-unknown.png, 1440-dark-06-admin-refused.png
- **observed** The card measures 1042x231 at x=199, y=387, the full two-plate stage width. The body stops at max-w-prose (about 65%), so the right third of the plate is empty. About 300px of empty ground sits between the dock and the plate. The plate reads as a banner, not a message.
- **expected + canon** HIERARCHY: primary content dominant, no dead space. A single-message plate should be sized to its content, not inherit the picker's two-column band.
- **owner** **CONSUMER**: CONSUMER — demo/scenes/notfound/NotFoundPane.vue:2-6 (w-full h-full Card); demo/shell/viewSchema.ts:266-271 (single stage region at picker width)
- **fix shape** Size the not-found plate to its content (for example max-w-[36rem] mx-auto) or give the not-found region a narrow width in the pane system. With the EmptyState fix, centre the content.

#### UIA-V-449 · MEDIUM · not-found · Body copy uses the retired static `text-muted-foreground`: a fixed warm brown that clashes with every accent

- **source** audit #6 · **verdict** CONFIRMED · **state** light theme, all states · **where** NotFoundPane.vue:12 `text-body text-muted-foreground`
- **frame** `not-found/` 1440-light-06-admin-refused.png, 390-light-06-admin-refused.png, 1440-light-01-unknown.png
- **observed** Body ink is rgb(112,89,66), a brown that stays fixed whatever the accent. It sits on a mint plate in the teal frames and on a pink plate in the pink frames. PaneHeader's own caption right above it uses --ink-muted (PaneHeader.vue:136), so the header and body inks disagree on one plate.
- **expected + canon** The app's de-emphasis rung on a plate is `--ink-muted` / `.plate-ink` (PaneHeader.vue:128-136 AB-2; EmptyState.vue P4-R2: static muted-foreground composited to 3.84:1 on a resting plate, below the 4.5:1 floor).
- **owner** **CONSUMER**: CONSUMER — demo/scenes/notfound/NotFoundPane.vue:12
- **fix shape** Replace `text-muted-foreground` with `plate-ink` (or color: var(--ink-muted)). The EmptyState migration covers this.

#### UIA-V-450 · MEDIUM · not-found · The PaneHeader veil paints a visible band and hard edge across the card at rest

- **source** audit #7 · **verdict** AMENDED · **state** all not-found states, both themes, both viewports · **where** PaneHeader.vue:10 + its ::before veil
- **frame** `not-found/` 1440-light-01-unknown.png (band ends at display y≈665), 390-light-06-admin-refused.png (y≈845), 1440-dark-01-unknown.png
- **observed** The card does not scroll (231px of content), yet the header region paints a lighter, differently tinted slab. It ends in a horizontal seam just under the italic caption, which cuts the card into two tones. The caption also sits tight under the title, with no rhythm gap.
- **expected + canon** GLASS IDIOM: one plate reads as one material at rest. A scroll veil should not produce a visible seam when nothing scrolls under it.
- **owner** **CONSUMER**: CONSUMER — demo/shared/ui/PaneHeader.vue:10 (.pane-header sticky veil, shared by 9 panes)
- **fix shape** Hold the veil at zero intensity when scrollTop = 0 or the host does not overflow, or feather its bottom edge. Add the rhythm gap between title and caption. This is a shared seam, so fix it once in PaneHeader.
- **confirm** The frames confirm it: 1440-light-01 shows a clear lighter slab ending in a seam just under the caption, and so do 1440-dark-06 and 390-light-01. The proposed fix contradicts documented intent, though. PaneHeader.vue:75-95 says the veil paints 'AT REST' by constitution (a Q9 rest floor of 0.52), and a 14px mask feather is 'the band-killer' that 'stays at EVERY state'. The real defect is that the feather does not dissolve the band on a non-scrolling plate. Fix: repair or lengthen the feather (the comment says the producer-owned rest-floor and bottom-feather knobs are booked as packet P3, so this may touch glass). Do not zero the veil at scrollTop 0, which would re-open the ruling. The owner stays CONSUMER for the interim veil, with possible GLASS co-ownership through P3.

#### UIA-V-451 · MEDIUM · not-found · The audit's fix for the HIGH was pre-empted the wrong way

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **observed** Commit 69c0d255 (X.W7.a2, O-57, 'delete inert glass-component props') removed variant="ghost" across strict-probe files without mapping it to emphasis. It enshrined the unintended filled secondary paint. The remaining 12 Button/Select ghost sites should be migrated to emphasis, not deleted, and the NotFoundPane site needs emphasis="quiet" re-added.
- **owner** **CONSUMER**: CONSUMER — process

#### UIA-V-452 · MEDIUM · pane-plates · Skeleton bars read as opaque slabs (near-white in light, near-black in dark) with a travelling shimmer band

- **source** audit #4 · **verdict** AMENDED · **state** CONFIRMED · **where** all combos · loading plate
- **frame** `pane-plates/` 1440-light-04-loading-deeplink-gradient.png, 1440-dark-04-…, 390-dark-04b-…
- **observed** Measured skeleton background rgb(246,243,239) in light: cream bars on a pink card, reading as white content blocks. In dark they are near-black holes with a visible sheen band. Neither matches the muted ink the app's other skeletons use (ShadowPalette, PaletteCardSkeleton, AdminListSkeleton).
- **expected + canon** A skeleton is a quiet mark on the in-content ink rung (glass Skeleton.vue A-9 note: --ink-seam), not a surface; one loading-ink family app-wide.
- **owner** **GLASS+CONSUMER**: CONSUMER demo/shell/PaneLoadingPlate.vue:21-22 (no `.skeleton-ink-register`, the app's 'ONE loading-ink recipe' at demo/styles/utils.css:57-61) + GLASS Skeleton (installed 7.0.0 dist: `background: var(--muted)` + `skeleton-scan` ::after band; already cured at glass root 79c3601b src/components/skeleton/Skeleton.vue ink-seam fill + opacity breathe) — adoption pending · *glass component* Skeleton (src/components/skeleton/Skeleton.vue) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** Consumer: add the skeleton-ink-register class to the plate, or drop the local recipe when adopting glass ≥ the ink-seam Skeleton. Glass: already fixed at root; route as an adoption item, not a new glass defect.
- **confirm** The visual defect holds. In 1440-light-04 the bars are cream rgb(246,243,239) on a pink card. In 390-dark-04b they are near-black slabs with a sheen band. The installed 7.0.0 dist rule is `.skeleton{background:var(--muted)}` plus an ::after skeleton-scan animation. The consumer fix is wrong, though. `.skeleton-ink-register` (demo/styles/utils.css:56-59) only sets --skeleton-glass-bg and --skeleton-shimmer-tint, and grep finds no 7.0.0 dist rule that reads --skeleton-glass-bg. So adding the class to the plate would change nothing on the installed glass Skeleton. The app's other 'ink-register' skeletons are also not recolouring glass Skeleton through that seam. The GLASS half is correct: at glass HEAD, Skeleton.vue:47-56 fills with --ink-seam and :88-99 replaces the band with an opacity breathe. The only real cure is adopting glass HEAD. Until then, a consumer override would have to set background on .skeleton directly.

#### UIA-V-453 · MEDIUM · pane-plates · Chunk-error detail prints the raw loader message: dev URL, absolute filesystem path, cache-buster timestamp

- **source** audit #5 · **verdict** CONFIRMED · **state** CONFIRMED · **where** all combos · chunk-error plate
- **frame** `pane-plates/` 1440-light-05-chunk-error-hop-mix.png, 1440-light-08-chunk-error-deeplink-gradient.png
- **observed** Four lines of 16px Fira: 'Failed to fetch dynamically imported module: http://localhost:9000/@fs/Users/mkbabb/Programming/value.js/demo/workbenches/mix/MixPane.vue?t=1790178928027'. It breaks mid-token ('Progr\|amming'), is the same size as the button label, and outweighs the recovery action.
- **expected + canon** The plate states the failure in human terms and offers the cure. Machine truth goes to the failure reporter (it already receives it: main.ts FAILURE_REPORTER_KEY) or behind a disclosure.
- **owner** **CONSUMER**: CONSUMER demo/shell/PaneErrorPlate.vue:66 (`detail = error.message`) → EmptyState.vue:12
- **fix shape** For PaneChunkError, show a fixed human line (e.g. 'A newer version is available — reload to continue.'). Keep error.message out of the UI, or put it behind a collapsed 'Details' toggle.

#### UIA-V-454 · MEDIUM · pane-plates · One app-scoped failure is duplicated per region: two statements, two raw URLs, two 'Reload the app' buttons (and two 'Loading the scene…')

- **source** audit #6 · **verdict** CONFIRMED · **state** CONFIRMED · **where** 1440 + 390 · cold deep link /gradient (both regions lazy)
- **frame** `pane-plates/` 1440-light-08-chunk-error-deeplink-gradient.png, 390-light-08b-…, 1440-light-04-loading-deeplink-gradient.png
- **observed** A stale-deploy chunk failure (whose only cure is a full reload) paints the same plate twice, side by side at 1440 and stacked at 390, each with its own whole-app 'Reload the app'. Loading does the same: two identical 'Loading the scene…' cards.
- **expected + canon** No duplicated affordances (CLUTTER). A whole-app action appears once.
- **owner** **CONSUMER**: CONSUMER demo/shell/usePaneRouter.ts:269-281 (a loading and an error component per lazy pane) + demo/color-picker/App.vue:128 (plate per region)
- **fix shape** Hoist the stale-chunk reload to one shell-level notice (or only the first failed region carries the action and the others show a quiet statement). Loading copy names the region (region.label) instead of repeating 'the scene'.

#### UIA-V-455 · MEDIUM · pane-plates · Boundary focus target shows the browser-default square focus outline around the whole region

- **source** audit #7 · **verdict** CONFIRMED · **state** CONFIRMED · **where** all combos · boundary caught (focus lands on catch)
- **frame** `pane-plates/` 1440-dark-09-boundary-caught-mix.png, 390-light-09-…, 390-dark-09-…
- **observed** On catch the region shows `outline: rgb(0,95,204) auto 1px` (:focus-visible true) as a sharp 0-radius blue rectangle spanning the full region. Next to the 16px cards it reads as a debug border. It disappears once Tab moves on (11).
- **expected + canon** The glass focus grammar (DESIGN.md:603 `--focus-ring-shadow`, :611 `.focus-ring`) on the canon card radius, or no visible ring on a non-interactive programmatic focus target.
- **owner** **CONSUMER**: CONSUMER demo/color-picker/ErrorBoundary.vue:22-25 (`tabindex=-1` + `nextTick(() => plateRef.focus())` at :104, no focus styling)
- **fix shape** Put `outline:none` on the tabindex=-1 container, since it is an SR landing target and not a control, or move focus to the Try-again button, which carries the glass focus-ring. Once the plate is a Card, any ring must follow radius-card.

#### UIA-V-456 · MEDIUM · pane-plates · The skeleton-ink-register seam is inert against the installed glass Skeleton, app-wide

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `pane-plates/` grep finds nothing in node_modules/@mkbabb/glass-ui/dist that reads --skeleton-glass-bg; the 7.0.0 Skeleton rule is background:var(--muted). The 4 consumers of the class (PaletteCardSkeleton, AdminListSkeleton, ShadowPalette, AdminTagsPanel) recolour only their own local seams, never the glass Skeleton fill. Adopting glass HEAD's --ink-seam Skeleton makes the class dead code, and it should then be deleted.
- **observed** grep finds nothing in node_modules/@mkbabb/glass-ui/dist that reads --skeleton-glass-bg; the 7.0.0 Skeleton rule is background:var(--muted). The 4 consumers of the class (PaletteCardSkeleton, AdminListSkeleton, ShadowPalette, AdminTagsPanel) recolour only their own local seams, never the glass Skeleton fill. Adopting glass HEAD's --ink-seam Skeleton makes the class dead code, and it should then be deleted.
- **owner** **GLASS+CONSUMER**: CONSUMER demo/styles/utils.css:56-59 + GLASS adoption · *glass component* Skeleton --skeleton-glass-bg seam · *head* open-at-HEAD

#### UIA-V-457 · MEDIUM · pointer-debug-overlay · glass DESIGN.md z-index table documents tokens and values the stylesheet does not ship (`--z-debug` missing, stale rungs)

- **source** audit #2 · **verdict** CONFIRMED · **state** all · **where** /Users/mkbabb/Programming/glass-ui/DESIGN.md:353; /Users/mkbabb/Programming/glass-ui/src/styles/tokens/scheme-motion.css:197-216
- **frame** `pointer-debug-overlay/` capture-log.json (zDebugVar='' on every frame)
- **observed** DESIGN.md lists `--z-debug` 99999, `--z-hovercard` 60, `--z-tooltip` 60, `--z-popover` 70, `--z-modal` 80, `--z-fullscreen` 90 and `--z-toast` 100. The shipped scale has no `--z-debug`, deletes `--z-hovercard` (comment at :206-209), and puts tooltip at 120, popover at 130, modal at 140, fullscreen at 150 and toast at 160, plus `--z-behind` -10 and `--z-toggle` 999, which the table omits. A consumer that followed the canon (value.js PointerDebugOverlay) got an undefined token and a broken overlay.
- **expected + canon** The DESIGN.md token table matches the shipped scale, and every documented rung resolves.
- **owner** **GLASS**: GLASS: z-index scale (DESIGN.md:335-353 vs src/styles/tokens/scheme-motion.css:197-216) · *glass component* z-index (src/styles/tokens/scheme-motion.css:197-216) · *head* open-at-HEAD
- **fix shape** In glass: either ship `--z-debug: 99999` in the §3 z-index scale (scheme-motion.css) and the bridges.css `--z-index-*` alias set, or delete the row. Re-sync the DESIGN.md table to the shipped values (tooltip 120 / popover 130 / modal 140 / fullscreen 150 / toast 160 / toggle 999 / behind -10; hovercard removed). Route to the glass-ui BK session.

#### UIA-V-458 · MEDIUM · pointer-debug-overlay · Event log cannot be scrolled: `overflow-y:auto` is dead under `pointer-events:none`, and wheel/touch pass through to the page

- **source** audit #3 · **verdict** AMENDED · **state** overlay open with gauges/event log · **where** demo/picker/visual/PointerDebugOverlay.vue:253; demo/picker/visual/DebugEventLog.vue:67
- **frame** `pointer-debug-overlay/` 05-log-wheel__1440__light.png, 05-log-wheel__390__light.png; capture-log.json note: log scrollTop 0→0 at both viewports, page scrolled 0→68 at 390; scrollHeight 529 vs clientHeight 243 after reset
- **observed** With 80 buffered events and gauges filling the 35dvh panel, the log shows only the newest 1-3 events. Wheeling over it scrolls the PAGE, so older events, including the ones before a FREEZE_DETECTED, are unreachable except through Copy JSON. The composable already ignores overlay-origin pointer events (usePointerDebug.ts:151-154 `isDebugOverlay`), so pointer-events:none is not needed to keep the instrument clean.
- **expected + canon** A scroll container scrolls (DESIGN lens 5/6: the control works when used).
- **owner** **CONSUMER**: CONSUMER (PointerDebugOverlay.vue:253-257 `.debug-scroll{overflow-y:auto;pointer-events:none}`, :146 on the root; DebugEventLog.vue:67-73)
- **fix shape** Give the log region `pointer-events:auto` with `touch-action:pan-y` and `overscroll-behavior:contain`, or lift the gauges into a collapsible section so the log gets the height. Delete the dead `overflow-y:auto` if the pass-through is kept on purpose.
- **confirm** The core claim is confirmed: .debug-scroll has overflow-y:auto with pointer-events:none (:253-257), log scrollTop stays 0→0 while sh 335 > ch 243, and every overlay listener already early-returns on isDebugOverlay (usePointerDebug.ts:160,181,195,205,214,218). Amend the page-scroll half. The page scrolled 0→68 only at 390; at 1440 the page is not scrollable (after=0,0,0), so the pass-through there is inert, not a page scroll. Also note the pass-through is DELIBERATE: DebugEventLog.vue:2 says 'pointer-events: none so the visual feed can't steal touches'. The fix has to keep that guarantee, which the existing isDebugOverlay filter already does.

#### UIA-V-459 · MEDIUM · pointer-debug-overlay · Overlay is hand-rolled chrome: literal rgba/hex palette, hardcoded font stack, theme-blind, no glass primitives

- **source** audit #4 · **verdict** CONFIRMED · **state** all (light and dark render identically) · **where** demo/picker/visual/PointerDebugOverlay.vue:139-141,153,176,181,205,217-229,265-284; DebugEventLog.vue:62,74-133
- **frame** `pointer-debug-overlay/` 01-collapsed__1440__light.png vs 01-collapsed__1440__dark.png; 06-freeze__1440__light__crop.png; 11-clear__1440__dark.png
- **observed** Surface `rgba(0,0,0,0.92)` with a `#e0e0e0` text literal, plus about 20 hex/rgba literals for state colors (#ff4444, #4caf50, #8bc4ff, #b388ff, #ffcc80, rgba(255,60,60,.25)…). Font is `"SF Mono","Fira Code",monospace`, not `var(--font-mono)` (glass bridges.css:90). The header is a raw <button> with '+'/'−' text glyphs, not glass Collapsible/CollapsibleTrigger. Gauges are ad-hoc flex rows, not glass MetricStack/MetricRow/Metric posture="row". The blinking red 'FROZEN?' text stands where glass StatusDot (state=error) would go. The actions are three raw buttons, not glass Button. The surface ignores light theme entirely. The `.debug-section`/`.debug-section-title` rules are duplicated verbatim in both files (PointerDebugOverlay.vue:184-196, DebugEventLog.vue:47-60).
- **expected + canon** glass DESIGN.md: every surface/control a glass primitive, tokens not literals. demo/DESIGN.md already lists this file as bespoke (:273) for the blink only, not for the palette or surface.
- **owner** **CONSUMER**: CONSUMER (PointerDebugOverlay.vue:132-285; DebugEventLog.vue:47-135)
- **fix shape** Rebuild on glass: Surface/Card panel (`--radius-panel`), Collapsible for the header, MetricStack+MetricRow for gauges, StatusDot for frozen/active, Button size=sm for actions (variants destructive/secondary/ghost), `--font-mono`, and semantic color tokens (`--destructive`, `--muted-foreground`, …) that follow the theme. Keep the event-type tints as a small token map. Dedupe the section rules into one place. Dev-only surface, so it ranks below user-facing pages.

#### UIA-V-460 · MEDIUM · pointer-debug-overlay · Action buttons are 27 px tall at 10 px type with a 4 px radius: under touch-target size on the mobile tool, and off the radius role table

- **source** audit #5 · **verdict** AMENDED · **state** overlay open (actions) · **where** demo/picker/visual/PointerDebugOverlay.vue:230
- **frame** `pointer-debug-overlay/` 04-expanded-after-drags__390__dark.png; 10-reset__390__light__crop.png; capture-log.json btns: box h=27, radius 4px, font 10px
- **observed** Reset / Copy JSON / Clear are 83×27 px with 10 px labels and a 4 px (`--radius-sm`) corner. The overlay exists to debug touch on iOS, where 27 px is well under the 44 px target. The 4 px corner is not a role on the canon table. The panel itself uses the raw `--radius-xl` scale step, not the semantic `--radius-panel`.
- **expected + canon** glass DESIGN.md:385-391 semantic radius roles: action pill = `--radius-control` (stadium, single-line control), panel = `--radius-panel` (12 px). Touch targets ≥ 44 px on a touch-first tool.
- **owner** **CONSUMER**: CONSUMER (PointerDebugOverlay.vue:230-245 `.debug-btn{padding:6px;border-radius:var(--radius-sm);font-size:10px}`)
- **fix shape** Use glass Button size=sm (it carries the control radius and hit area), or at least min-height 36-44 px with `--radius-control`. Swap `var(--radius-xl)` on the overlay (:143) for `var(--radius-panel)`.
- **confirm** The measurements are confirmed: btn box 83×27, radius 4px, font 10px (capture-log). Two amendments. (a) --radius-panel resolves to var(--radius-xl) = 12px (DESIGN.md:389), so swapping :143 to the semantic name changes no pixels; it is naming hygiene, not a visual defect. (b) The fix prescribes stadium --radius-control. That is canon for single-line controls (DESIGN.md:385), but on 2026-09-23 the owner ruled some pills 'too rounded … should be more card like'. The radius choice should follow whatever glass Button size=sm ships after that ruling lands at the root, not hand-set stadium.

## LOW (216)

#### UIA-V-461 · LOW · app-ground-atmosphere · One navigation runs on three different clocks (ground 200 ms, accent sweep 550 ms, pane plate 440 ms)

- **source** audit #12 · **verdict** AMENDED · **state** view-switch transition · **where** every view switch
- **frame** `app-ground-atmosphere/` report.json switches[*].census (`button.view-select-trigger` T:--accent-view@550ms beside card T:transform@440ms / A:vj-settle@440ms)
- **observed** The dock hue sweep ends about 110 ms after the panes land, and the ground's 200 ms breath is a third, unrelated beat.
- **expected + canon** One navigation beat on glass motion tokens (DESIGN.md duration table; X.W12.b 'one sequenced entrance').
- **owner** **CONSUMER**: CONSUMER — demo/styles/foundation.css:676-681 (ground 200 ms); demo/shell/dock/DockViewSelect.vue:159-161 (`--accent-view` over --duration-panel, measured 550 ms); overture.css:16 (plate-land 440 ms)
- **fix shape** Put the accent sweep and the pane swap on the same token and end the sweep with the pane landing.
- **confirm** The three clocks are confirmed: foundation.css:676-681 is 200 ms, the census shows --accent-view@550ms, and plate-land is 440ms. The audit undercounts. The same /atmosphere → / census also shows A:blob-emerge@500ms and canvas.goo-blob-canvas A:substrate-reveal-bloom@1100ms, which make five clocks with the longest at 1100 ms. Several pane-header animations also report '@NaNms' in the census (pane-header-veil, pane-title-shrink, pane-desc-shrink): the tool could not read their durations, and that is unverified.

#### UIA-V-462 · LOW · app-ground-atmosphere · The blob re-emerges on every return to /, adding a 500 ms and an 1100 ms beat to navigation

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `app-ground-atmosphere/` report.json 1440-dark switches[3] census: div.hero-blob-anchor A:blob-emerge@500ms and canvas.goo-blob-canvas A:substrate-reveal-bloom@1100ms
- **observed** report.json 1440-dark switches[3] census: div.hero-blob-anchor A:blob-emerge@500ms and canvas.goo-blob-canvas A:substrate-reveal-bloom@1100ms This is the same root cause as finding 7 (the shared stage re-mounts), and it extends finding 12's clock count.
- **owner** **CONSUMER**: CONSUMER — hero blob mount/keying (HeroBlob; pane region keyed by view)

#### UIA-V-463 · LOW · app-ground-atmosphere · The pane-header motion census reports NaN ms durations

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `app-ground-atmosphere/` report.json switches census rows 'A:pane-header-veil-19daabcf@NaNms', 'A:pane-title-shrink-19daabcf@NaNms'
- **observed** report.json switches census rows 'A:pane-header-veil-19daabcf@NaNms', 'A:pane-title-shrink-19daabcf@NaNms' Unverified. These are probably scroll-timeline animations, which have no time duration, but the X.W12.b 'one motion owner' gate should check them explicitly.
- **owner** **CONSUMER**: CONSUMER — pane-header-veil / pane-title-shrink / pane-desc-shrink (scoped keyframes, probably a scroll-driven or var() duration)

#### UIA-V-464 · LOW · app-ground-atmosphere · Possible pale vertical strip at the right edge at 390 scroll-end

- **source** confirm miss #5 · **verdict** MISSED (confirm seat)
- **frame** `app-ground-atmosphere/` report 390-dark /palettes scrollEnd samples at x=382: rgb(189,148,137) lum 0.611 and rgb(192,157,139) lum 0.64. crop-390-dark-palettes-scrollend-bottom-x4.png right edge.
- **observed** report 390-dark /palettes scrollEnd samples at x=382: rgb(189,148,137) lum 0.611 and rgb(192,157,139) lum 0.64. crop-390-dark-palettes-scrollend-bottom-x4.png right edge. Probably the headed-Chromium overlay scrollbar. A capture with the scrollbar hidden would settle it.
- **owner** **UNRESOLVED**: unknown (overlay scrollbar thumb vs. a plate edge)

#### UIA-V-465 · LOW · home-picker · At 390 the slider thumbs are 12x44 over a ~24px track and overhang it; a grey square halo appears on the active thumb

- **source** audit #12 · **verdict** CONFIRMED · **state** default / hover-focus · **where** home-picker · channel console · 390
- **frame** `home-picker/` 390-light-01-default.png, 390-light-11-condensed.png, 390-dark-01-default.png
- **observed** The thumb grows to the 44px touch height, so each thumb overhangs the track by about 10px above and below. In the scrolled frame the active 'b' thumb shows a grey rounded-square halo.
- **expected + canon** Hit areas grow but glyphs do not (the rail's own law). The visible thumb keeps its fine-pointer proportion inside a transparent 44px hit box.
- **owner** **GLASS**: GLASS — Slider spectrum variant, coarse-pointer thumb rung (glass-ui src/components/slider) · *glass component* Slider (src/components/slider) · *head* cured-at-HEAD (adopt via repin; re-measure)
- **fix shape** glass: separate the thumb's hit area from its painted box on coarse pointers. Restyle the halo to the focus-ring token.

#### UIA-V-466 · LOW · home-picker · Rail states: nothing is selected at load, and the active WatercolorDot crosses the rail edge at 390

- **source** audit #13 · **verdict** AMENDED · **state** default / selected · **where** home-picker · channel console · default and after selecting a channel
- **frame** `home-picker/` 1440-light-02-card.png (no active mark), 390-light-09-value-edit.png, 390-dark-08-space-select-open.png (dot overflows the ring)
- **observed** At load every tab reports aria-selected=false, so the tablist has no selection. Once a channel is chosen at 390, the ~34px dot touches or crosses the 1px enclosure ring.
- **expected + canon** STATES: a tablist always has one selected tab. The selected mark sits inside its container.
- **owner** **CONSUMER**: CONSUMER — demo/picker/controls/ComponentSliders/ConsoleRail.vue:52-60 (rail-dot-seat); ComponentSliders.vue activeComponent defaults to null
- **fix shape** Default activeComponent to the first channel. Size the dot seat to the rail's inner width minus its padding.
- **confirm** Both halves are confirmed, and the overflow is worse than 'touches the ring'. In 390-light-11 and 390-dark-08 the 'b' WatercolorDot visibly breaks out past the rail's left and right strokes. It is not limited to one state: it shows whenever a channel is active at 390, including after a slider interaction (not just value edit).

#### UIA-V-467 · LOW · home-picker · The spectrum handle collides with the readout's comma at 1440

- **source** audit #14 · **verdict** CONFIRMED · **state** default (handle at the top edge) · **where** home-picker · default · 1440
- **frame** `home-picker/` 1440-light-02-card.png, 1440-light-01-default.png
- **observed** The handle straddles the plate's top edge and its crown sits about 2px under the '88.8,' comma.
- **expected + canon** Clear separation between the display tuple and the interactive plate.
- **owner** **CONSUMER**: CONSUMER — demo/picker/ColorPicker.vue:76-81 (CardContent pt-3 and the header pb-0 seam)
- **fix shape** Add a rhythm-token gap between the header and the plate equal to at least half the handle height, or clamp the handle inside the plate.

#### UIA-V-468 · LOW · home-picker · Uneven readout punctuation: the '%' unit sits between the figure and the comma

- **source** audit #15 · **verdict** AMENDED · **state** default · **where** home-picker · header · default
- **frame** `home-picker/` 1440-light-02-card.png
- **observed** The first cell reads '92.0 %,' with a small italic unit and a comma after it, while the second reads '88.8 ,' with a visible gap before the comma, so the tuple rhythm is uneven.
- **expected + canon** Uniform separators across the tuple.
- **owner** **CONSUMER**: CONSUMER — demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue (.fig-unit 0.55em plus .fig-comma)
- **fix shape** Put the unit as a superscript or trailing unit without a gap, and attach the comma to the preceding glyph.
- **confirm** The gap before the comma is visible in every frame ('88.8 ,' vs '92.0 %,'), so the defect is confirmed. The severity also covers 390, where the uneven comma then triggers the orphan wrap in F4. Same CONSUMER owner.

#### UIA-V-469 · LOW · home-picker · About pane: hard header band plus a nested bordered Definition card inside the card

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `home-picker/` 390-light-11-condensed.png, 1440-dark-01-default.png
- **observed** A full-width tinted header band with a hard divider, then a second bordered, rounded 'Definition' card nested inside the card (non-concentric like F6), then more hairlines. This adds clutter to the co-visible pane.
- **owner** **CONSUMER**: CONSUMER (About pane; belongs to the About page audit but is co-visible here)

#### UIA-V-470 · LOW · home-picker · 390 About card shows a skeleton placeholder in the default frame

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `home-picker/` 390-light-01-default.png
- **observed** The About card below the picker shows two grey shimmer bars at the capture moment (load plus 4s). Its content lazy-loads late, and the skeleton blocks read as generic placeholders rather than an idiomatic glass loading state. This ties to the transient lab.md import failure noted in the dev-server log.
- **owner** **CONSUMER**: CONSUMER (About content boundary loading state)

#### UIA-V-471 · LOW · home-picker · Edit box persists into later states (focus not released)

- **source** confirm miss #5 · **verdict** MISSED (confirm seat)
- **frame** `home-picker/` 1440-light-11-condensed.png
- **observed** The '88.8' cell still has its hand-rolled edit outline in the scrolled/condensed capture, well after the Escape step, which supports F7: Escape does not blur, so focus leaks into later states.
- **owner** **CONSUMER**: CONSUMER ColorComponentDisplay

#### UIA-V-472 · LOW · about-pane · After a mouse pick, the selector trigger keeps a boxy 6px focus ring at rest

- **source** audit #13 · **verdict** AMENDED (owner → GLASS + CONSUMER) · **state** after choosing a space with the mouse · **where** About title trigger 'OKLCh ▾'
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-02-oklch-view.png ; 390-light-02-oklch-view.png ; probe-out.json afterPick (fv true, 2px ring, radius 6px)
- **observed** A 2px pink ring box stays around the italic display word inside the heading sentence.
- **expected + canon** Focus rings appear for keyboard modality only. An inline title trigger should not wear a control box at rest.
- **owner** **GLASS+CONSUMER**: GLASS SelectTrigger/Select (focus returns to the trigger and matches :focus-visible after a pointer selection). Installed 7.0.0 trigger radius is 6px; HEAD SelectTrigger.vue:59 uses rounded-pill. · *glass component* SelectTrigger (SelectTrigger.vue:59) · *head* open-at-HEAD
- **fix shape** Glass: on pointer-initiated close, restore focus with {focusVisible:false}, or suppress the ring through data-pointer modality. Route this to the glass session.
- **confirm** Confirmed in 1440-light-02 and probe afterPick (fv true, 2px ring, radius 6px). The owner call is split. Restoring focus as :focus-visible after a pointer selection is producer behaviour (GLASS). But the consumer's .space-trigger (ColorSpaceSelector.vue:219-278) declares that the inline title has 'no background, border, radius, padding rhythm' and still inherits the ghost variant's 6px corner and the ring. The consumer owes an ink-grammar focus treatment (underline) for its inline host, or the glass pin that brings the rounded-pill trigger.

#### UIA-V-473 · LOW · about-pane · The About view's controls are hand-rolled divs, not glass primitives

- **source** audit #14 · **verdict** CONFIRMED · **state** all · **where** Nutrition label
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-02-oklch-view.png
- **observed** The key/value facts are bare two-column div grids with italic labels. The value column starts at 50%, which leaves a wide gutter and wraps values early ('Variable (typically D50 or / D65)'). The path chips are 60px-tall hand-painted wells. The 3-column Components grid wraps '0deg to / 360deg' at 390, and units are unspaced ('0deg').
- **expected + canon** Glass idiom: use a primitive for each surface (glass Table, Metric or LabeledField for facts; Chip or Badge for path nodes), with tokens not literals.
- **owner** **CONSUMER**: CONSUMER demo/scenes/about/ColorNutritionLabel.vue:34-45, :82-95 (italic key/value div grids), :117-118 (conversion chips as `bg-well rounded-panel` divs), :54-73 (components grid)
- **fix shape** Move the facts to a glass Table (or a dl styled with a glass recipe) with an auto-sized label column. Make the path nodes glass Chips joined by the arrow glyph. Format units with a space ('0 – 360°').

#### UIA-V-474 · LOW · about-pane · The Detailed Guide empty state is a 33px display heading over one muted sentence

- **source** audit #15 · **verdict** CONFIRMED · **state** guide none-authored · **where** Display P3 (and the six other spaces with doc:null)
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-09-p3-guide.png
- **observed** A full 'Detailed Guide' display heading promises content, and the only thing under it is a disclaimer.
- **expected + canon** The empty-state register used elsewhere in the app (the EmptyState statement, cited in Markdown.vue:21-25). A section that has no content should not take a top-rung heading.
- **owner** **CONSUMER**: CONSUMER demo/scenes/about/AboutPane.vue:70,79-83
- **fix shape** When doc is null, collapse the section to one muted line under the Usage section, or use the glass EmptyState recipe, and drop the heading.

#### UIA-V-475 · LOW · about-pane · Opening the About selector collapses the dock to a dot (cross-seat)

- **source** audit #16 · **verdict** CONFIRMED (owner unresolved) · **state** selector open, 1440 light · **where** Dock while the About selector is open
- **frame** `about-pane/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-01-selector-open.png (compare 1440-light-00-landing.png)
- **observed** The Home/Tools/Login/@mbabb dock collapses to a single pink dot at the top centre while the listbox is open.
- **expected + canon** The dock keeps its state while an unrelated popover is open.
- **owner** **GLASS+CONSUMER**: CONSUMER dock / scroll-lock interaction (the dock seat should confirm the owner) · *glass component* dock · *head* open-at-HEAD
- **fix shape** Refer to the dock audit seat. It is likely the Select's scroll-lock or body padding feeding the dock's scroll-collapse heuristic.
- **confirm** Reproduced headed at ce391643: confirm/1440-light-selector-open-reconfirm.png shows the dock as a single pink dot. The nav rect is unchanged (1408x72), so the collapse is internal to the dock. While the listbox is open, body carries 'pointer-events:none; overflow:hidden' (reka body lock), which is the likely trigger. Glass SelectContent also stamps dock participation (useDockParticipation) at HEAD, so the owner may be GLASS rather than CONSUMER. The dock seat must adjudicate.

#### UIA-V-476 · LOW · about-pane · The selector opens scrolled so the selected row sits on the bottom scroll-button edge and the first rows (RGB) are hidden

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `about-pane/` docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-01-selector-open.png
- **observed** 1440-light-01: the list starts at HSL and a scroll-up chevron shows. The selected Lab row's border meets the scroll-down button. Only 4 of the 18 rows fit.
- **owner** **GLASS+CONSUMER**: GLASS SelectContent viewport scroll-into-view / CONSUMER specimen row height · *glass component* SelectContent · *head* open-at-HEAD

#### UIA-V-477 · LOW · about-pane · Every heading in the pane is an H2, including the pane title, so the outline is flat

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `about-pane/` docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-02-oklch-view.png
- **observed** capture-meta headings: the pane title, Basic Information … Usage, and Detailed Guide are all tag H2. The markdown then starts at H3.
- **owner** **CONSUMER**: CONSUMER AboutPane.vue:70 + ColorNutritionLabel.vue section h2s + PaneHeader

#### UIA-V-478 · LOW · about-pane · The dock's Login and @mbabb items render as dark inset chips unlike Home and Tools (cross-seat, for the dock audit)

- **source** confirm miss #5 · **verdict** MISSED (confirm seat)
- **frame** `about-pane/` docs/tranches/X/audit/ui-evidence/value/about-pane/1440-light-00-landing.png
- **observed** 1440-light-00: Login and @mbabb carry a darker inset plate and a mono face, while Home and Tools are plain ink.
- **owner** **CONSUMER**: CONSUMER dock (dock seat to confirm)

#### UIA-V-479 · LOW · color-space-select · The caret, the only closed-state hint that the title is clickable, is faint and small

- **source** audit #7 · **verdict** CONFIRMED · **state** closed / rest · **where** closed trigger, both hosts, both themes
- **frame** `color-space-select/` 1440-light-02-closed-trigger.png; 1440-dark-04-focus-trigger.png; p2-1440-dark-16-about-closed.png
- **observed** The chevron is 20px next to a 53px title and is drawn in a pale, low-contrast pink (light) or pale gray (dark). At rest it reads as decoration. The underline only appears on hover and touch devices have no hover, so on a phone nothing at rest says this title opens a menu.
- **expected + canon** A control's affordance should be visible without hover (DESIGN.md control conventions: the trigger reads as a control).
- **owner** **CONSUMER**: CONSUMER demo/color-session/ColorSpaceSelector.vue:289 (`width/height: 0.382em`) + the 86%-alpha title ink at :255
- **fix shape** Draw the chevron in the full title color, or step it to about 0.5em, so it clears a 3:1 non-text contrast ratio against the plate.

#### UIA-V-480 · LOW · color-space-select · The keyboard focus ring uses a non-canon radius and sits tight against the italic letters

- **source** audit #8 · **verdict** CONFIRMED · **state** focus-visible · **where** keyboard focus, both hosts
- **frame** `color-space-select/` 1440-light-04-focus-trigger.png; 1440-dark-04-focus-trigger.png; 390-light-09-after-select.png
- **observed** The focus ring is a custom box-shadow with a `--radius-md` corner. That radius is a scale step, not a role token in the DESIGN.md:383-395 role table. The 'O' of OKLCh touches the ring's left edge at 390. glass-ui HEAD's shared `.focus-ring` is an outline (SelectTrigger.vue comment, 'coexists with the rim').
- **expected + canon** Focus should use the shared glass-ui `.focus-ring` with an offset so it clears the letterforms, and any radius should be a role token (e.g. `--radius-field`).
- **owner** **CONSUMER**: CONSUMER demo/color-session/ColorSpaceSelector.vue:325-329 (box-shadow ring + `border-radius: var(--radius-md)`)
- **fix shape** Replace the scoped box-shadow ring with the glass-ui focus-ring utility plus an outline offset, which drops the literal radius.

#### UIA-V-481 · LOW · color-space-select · HSV and Kelvin captions use a different format from the other 16 rows

- **source** audit #9 · **verdict** CONFIRMED · **state** open list · **where** open list
- **frame** `color-space-select/` 1440-light-05-open-listbox.png ('hsv · 346 · 0.6279 · 1.511'); p2-390-dark-13-open-mid.png ('kelvin · 5309')
- **observed** 16 rows print CSS function notation (`hsl(346deg … / 82.7%)`). HSV and Kelvin print dot-separated values with no unit suffixes (HSL shows `deg` and `%`, HSV shows neither) and no alpha, so the column reads unevenly.
- **expected + canon** Every row in one list should follow one caption format (COHESION: no one-off instances).
- **owner** **CONSUMER**: CONSUMER demo/color-session/format-color.ts (specimen `form` for non-CSS spaces), shown at ColorSpaceSelector.vue:98-109
- **fix shape** Write non-CSS spaces as `hsv(346deg 62.8% 151.1% / 82.7%)`, with the same units and alpha as their CSS neighbors, or mark them as non-CSS with a consistent prefix.

#### UIA-V-482 · LOW · color-space-select · Opening the list collapses the dock to a dot at 1440 but not at 390

- **source** audit #10 · **verdict** AMENDED · **state** open list · **where** open list, 1440 vs 390
- **frame** `color-space-select/` 1440-light-05-open-listbox.png (dock reduced to a pink dot at the top center) vs 390-light-05-open-listbox.png (dock pill fully shown)
- **observed** At 1440 the dock collapses to a small dot while the list is open. At 390 it stays as the full pill. The same overlay causes two different dock behaviors depending on viewport, and the collapse makes the dock look like it has vanished.
- **expected + canon** The dock should react to an overlay the same way at every viewport (cohesion across views), or the viewport rule should be documented in the dock/overlay README.
- **owner** **GLASS+CONSUMER**: GLASS useDockParticipation (glass-ui src/components/_shared/overlay, applied at SelectContent.vue:62 `dock.portalAttrs`) · *glass component* SelectContent (src/components/_shared/overlay) · *head* open-at-HEAD
- **fix shape** Relay to the glass-ui session: document or unify the dock's response when an overlay opens across viewport sizes. No consumer change.
- **confirm** The behavior is confirmed. With the list closed, the dock is a full pill in 1440-light-01 and p2-1440-dark-11. With it open, the dock is a dot in 1440-light-05, 1440-dark-06 and p2-1440-dark-12. At 390 it stays a pill in 390-light-05. The owner cite is wrong, though. useDockParticipation (glass _shared/overlay/participation.ts:104-125) only stamps and holds overlays that are inside a dock context (`dock?.id`). The picker's Select is not dock-owned, so `dock.portalAttrs` is empty and does nothing here. The collapse is the dock's own idle / outside-interaction collapse, which fires in the 1440 full-dock register but not in the 390 compact register. Re-route to GLASS dock collapse policy (and value.js's dock config), not overlay participation. It is a dock-cohesion item (COHESION §0ao dock pills) more than a selector defect.

#### UIA-V-483 · LOW · color-space-select · The About pane host shows the browser's default blue square focus outline

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `color-space-select/` 1440-light-01-closed-page.png (sharp-cornered blue rectangle around the whole About host)
- **observed** When the errored pane takes focus, the browser's default outline is drawn around the pane host. It has square corners and ignores the glass focus-ring, which is off-canon next to the rounded plates.
- **owner** **CONSUMER**: CONSUMER (About pane host / error-boundary focus target)
- **fix shape** Give the focusable pane host the glass .focus-ring (focus-visible only) with the --radius-card corner, or tabindex=-1 with no visible ring when focus is set programmatically.

#### UIA-V-484 · LOW · color-space-select · The error boundary shows a raw absolute filesystem URL in an uncarded layout

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `color-space-select/` 1440-light-01-closed-page.png; 1440-light-05-open-listbox.png; 390-light-05 (the 'This panel hit an' heading pushes below the fold)
- **observed** The fallback prints 'Failed to fetch dynamically imported module: http://localhost:9000/@fs/Users/mkbabb/…/lab.md?import' as body text with no glass card. At 390 it takes focus and scrolls the page, which moves the picker trigger to y=-39. The trigger fault is environmental (Vite 504), but the fallback's presentation and its focus-stealing are consumer behavior.
- **owner** **CONSUMER**: CONSUMER (pane error boundary)
- **fix shape** Show a user-facing message with details collapsed, set on a glass card, and don't move focus or scroll unless the user caused the error.

#### UIA-V-485 · LOW · color-space-select · The row highlight corner is not concentric with the list corner

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `color-space-select/` 1440-light-05-open-listbox.png; 1440-dark-06-open-item-hover.png (8px outlined highlight box inside the 12px list)
- **observed** The highlighted and selected row is drawn as an outlined 8px box inside the list's 12px corner. When the list moves to rounded-card (16px), the row radius has to follow the same inset math, or the outlined ring will look boxy against the rounder plate. The audit only notes this as a follow-up under the radius finding; it should be checked as its own item.
- **owner** **GLASS**: GLASS overlay-plate.css (item radius = list radius minus inset) · *glass component* overlay-plate.css (overlay-plate.css) · *head* open-at-HEAD
- **fix shape** Derive the item radius as calc(var(--radius-card) - var(--overlay-pad-inline)) in overlay-plate.css, and check it after the consumer adopts the new release.

#### UIA-V-486 · LOW · dock-main · Tools layer-swap arrow reads as solid black; the three triggers use three different disclosure glyphs

- **source** audit #14 · **verdict** CONFIRMED · **state** expanded · **where** 1440 light
- **frame** `dock-main/` d-light-02-dock-expanded.png, d-light-03-hover-tools.png
- **observed** On the pink ground the 'muted' arrow renders near-black, the darkest mark in the dock and louder than the accent label it annotates. Home has a chevron, Tools an arrow, and @mbabb (a dropdown) has nothing.
- **expected + canon** Affordance glyphs at a quieter weight than the labels; one disclosure grammar for dropdown triggers.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/ActionBarToggle.vue:103 (ArrowRight `text-muted-foreground`), DockViewSelect chevron (glass), no glyph on Login/@mbabb
- **fix shape** Tone the arrow with the chevron's ink (the glass trigger chevron token). A DockTrigger for @mbabb then brings the same chevron as the view select.

#### UIA-V-487 · LOW · dock-main · 390 kebab speaks foreground ink while its siblings speak the accent

- **source** audit #15 · **verdict** AMENDED · **state** expanded 390 · **where** 390 light
- **frame** `dock-main/` m-light-01-page-expanded.png, m-light-02-dock-expanded.png
- **observed** Home and Tools icons are crimson accent while the kebab is black. The dock has two ink voices at 390.
- **expected + canon** One dock voice (the W7-4 'ONE dock voice' comments in DockViewSelect.vue:60-65).
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/menus/MobileMenuDropdown.vue:40-41 (MoreVertical with no accent; the cssColorOpaque prop is used only for the slug pill at :49)
- **fix shape** Either all three dock glyphs wear the accent chrome ink, or the kebab joins the view-accent. Pick one and apply it at the trigger.
- **confirm** This is light-theme only. In m-dark-31-lamp-band.png (dark 390) the Home, Tools and kebab glyphs are all the same off-white, so dark mode has one ink voice. MobileMenuDropdown.vue:41 `<MoreVertical class="w-6 h-6"/>` has no accent at HEAD. The finding stands for light.

#### UIA-V-488 · LOW · dock-main · Admin view list uses the same Tag glyph for two destinations (Names, Tags)

- **source** audit #16 · **verdict** CONFIRMED · **state** admin view-select open · **where** 1440 admin
- **frame** `dock-main/` d-dark-22-admin-view-select.png
- **observed** Names and Tags rows carry identical icons. The seal and trigger would also be indistinguishable between those two views.
- **expected + canon** Each destination has a distinct glyph (the seal's identity-by-impression depends on it).
- **owner** **CONSUMER**: CONSUMER — demo/shell/viewSchema.ts:241 and :259 (both `icon: Tag`)
- **fix shape** Give Names a distinct lucide glyph (e.g. Type/CaseSensitive).

#### UIA-V-489 · LOW · dock-main · Hand-rolled divider in the view-select menu

- **source** audit #17 · **verdict** CONFIRMED · **state** view-select open · **where** 1440 admin-authenticated
- **frame** `dock-main/` d-dark-22-admin-view-select.png
- **observed** A raw div border separates 'Back to app' / 'Admin' from the list instead of the Select family's separator primitive.
- **expected + canon** Compose the existing Reka-backed menu families (glass dock README:29-30); the glass Select ships a separator.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/DockViewSelect.vue:123 (`<div class="border-t border-border my-1">`)
- **fix shape** Replace it with <SelectSeparator />.

#### UIA-V-490 · LOW · dock-main · Action-bar hover tooltip renders as a large card over the pane; the action buttons sit on a 4px radius inside the stadium dock

- **source** audit #18 · **verdict** CONFIRMED · **state** hover on an action · **where** 1440/390 action-bar layer (cross-seat: reached via the Tools toggle)
- **frame** `dock-main/` d-light-08-actionbar-layer.png, m-light-16-actionbar-full-band.png
- **observed** 'Copy color' / 'Random color' appear as a big serif-headed card-radius slab overlapping the picker card. The action buttons compute a 4px radius, so their focus ring (focus-visible:ring-2) is a squarish ring inside a stadium dock. Their siblings in the same row (Back, Open color input) are DockControl stadiums.
- **expected + canon** Tooltip role at --radius-tooltip with the tooltip type scale. Every control in a dock row uses the DockControl face.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/ActionButton.vue (.action-button-wrapper, 32x32 at 4px) + the action-bar tooltip; canon DESIGN.md:395 --radius-tooltip 10px
- **fix shape** Hand this to the action-bar seat: make ActionButton a DockControl and use the glass Tooltip primitive.

#### UIA-V-491 · LOW · dock-main · Seal-ink contract also fails DURING the collapse morph: the only view glyph visible in the collapse is the leaving Home trigger ghosting over the wax, not the seal ink

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `dock-main/` zoom-d-light-13-collapse-00.png, sheet-d-dark-13-morph-collapse.png frames 01-09
- **observed** Frame 00 shows a Home glyph over the wax. It comes from the fading trigger, and every later frame has no glyph, so the W7-1 'glyph at both morph endpoints' continuity clause fails across the whole morph, not only at the steady seal.
- **expected + canon** The inked view glyph persists from the trigger into the seal.
- **owner** **CONSUMER**: CONSUMER (the same root cause as the WatercolorDot-slot finding); cross-reference only
- **fix shape** Cured by the sibling-ink fix in finding 1. Verify with a morph re-capture.

#### UIA-V-492 · LOW · dock-view-select · Three ink voices in one 8-row menu, and the Palettes ramp nearly disappears in dark

- **source** audit #10 · **verdict** CONFIRMED · **state** default · **where** user list, both themes
- **frame** `dock-view-select/` user-1440-light-01-open.png (magenta Palettes) vs crop-dark-palettes-row.png (Palettes near white), admin-1440-light-01-open.png (plus the gold Admin row)
- **observed** Light theme: ink, a magenta ramp and gold in one short list. Dark theme: the Palettes ramp measures rgb(255,236,236), which reads as plain ink, so the sanctioned exception appears in light only.
- **expected + canon** A consistent voice across themes. Owner docket: 'cluttered'.
- **owner** **CONSUMER**: CONSUMER DockViewSelect.vue:116 (.palettes-ramp-text) and :134-135 (gold-shimmer)
- **fix shape** Keep the exception in both themes with a dark ramp step, or drop it and use ink rows only.

#### UIA-V-493 · LOW · dock-view-select · Names and Tags share the Tag icon; Users reuses the admin-mode Shield

- **source** audit #11 · **verdict** CONFIRMED · **state** default · **where** admin list
- **frame** `dock-view-select/` admin-1440-dark-03-admin-open.png, admin-390-dark-03-admin-open.png
- **observed** Two rows with identical glyphs. In admin mode the trigger's Users Shield is the same glyph as the mode badge.
- **expected + canon** One distinct icon per destination.
- **owner** **CONSUMER**: CONSUMER demo/shell/viewSchema.ts:241 (Names: Tag), :259 (Tags: Tag), :235 (Users: Shield); DockViewSelect.vue:134 (Admin: Shield)
- **fix shape** Choose distinct lucide icons for Names (e.g. Type or TextCursor) and Users (Users).

#### UIA-V-494 · LOW · dock-view-select · Admin list mixes moderation views and tuning panes without grouping

- **source** audit #12 · **verdict** CONFIRMED · **state** default · **where** admin list
- **frame** `dock-view-select/` admin-1440-light-04-admin-hover.png
- **observed** Users, Names, Audit Log, Flagged, Tags, Atmosphere and Blob form one flat run, with no headers.
- **expected + canon** glass SelectLabel groups (exported from demo/ui/select).
- **owner** **CONSUMER**: CONSUMER useDockAdminMode.ts:27 (adminViews)
- **fix shape** Two SelectGroups with SelectLabels, e.g. 'Moderation' and 'Tuning'.

#### UIA-V-495 · LOW · dock-view-select · text-small on SelectGroup is dead styling

- **source** audit #13 · **verdict** AMENDED · **state** n/a · **where** all
- **frame** `dock-view-select/` probe.json (rows compute 16.4px at 1440 and 21px at 390, which is text-dropdown, not --type-small)
- **observed** Each producer row sets its own text-dropdown, so the group's text-small never reaches the rows.
- **expected + canon** No classes that have no effect.
- **owner** **CONSUMER**: CONSUMER DockViewSelect.vue:91
- **fix shape** Remove text-small; keep font-display only if it is intended.
- **confirm** The conclusion stands; the evidence needs correcting. At 1440, text-dropdown equals --control-text equals --type-small x 1, so both give 16.4px and that reading proves nothing. The 390 reading (rows 21px, --type-small 14px) is what shows the group class never reaches the rows. Owner: CONSUMER, correct.

#### UIA-V-496 · LOW · dock-view-select · Popover glass picks up the WebGL blob as a grey smudge inside the plate

- **source** audit #14 · **verdict** AMENDED · **state** open · **where** any open state over the picker
- **frame** `dock-view-select/` user-1440-light-01-open.png (disc beside the Extract/Browse rows), user-390-dark-05-mix-open.png (about 590,330)
- **observed** A blurred grey disc sits inside the menu plate behind the rows.
- **expected + canon** A clean plate behind navigation text.
- **owner** **CONSUMER**: GLASS glass-floating plate (backdrop-filter blur(11px) saturate(1.6)) over the consumer's hero blob
- **fix shape** Raise plate opacity for menu plates, or have the blob layer sit under a scrim while an overlay is open.
- **confirm** Confirmed visually: a grey disc beside Extract in user-1440-light-01-open.png, and a blurred disc inside the plate at about 590,330 next to the white blob in user-390-dark-05-mix-open.png. The owner call should be CONSUMER first. Sampling the backdrop is what the glass-floating plate is designed to do. The fix that avoids changing the design system is for the consumer's blob layer to sit under a scrim, or pause, while an overlay is open. Relay to glass only the question of whether menu plates should get a higher-opacity rung.

#### UIA-V-497 · LOW · dock-view-select · Conflicting shadow directions: the popover casts down-left (canon), the picker card beside it casts down-right

- **source** audit #15 · **verdict** CONFIRMED · **state** open · **where** picker route with the menu open
- **frame** `dock-view-select/` user-1440-light-01-open.png, user-390-light-01-open.png
- **observed** The popover's slab falls lower-left; the Lab card's slab falls right and bottom. Two light sources in one frame.
- **expected + canon** One key light across the whole app.
- **owner** **CONSUMER**: CONSUMER picker card shadow (outside this seat; route to the picker seat). Canon: glass-ui src/styles/tokens/shadow.css:84-89 (--shadow-cartoon-* down-LEFT, coherent with the upper-right --glass-key)
- **fix shape** Put the card on --shadow-cartoon-* (down-left).

#### UIA-V-498 · LOW · dock-view-select · Error boundary shows a raw /@fs filesystem URL to the user (seen while the dev server re-optimized deps)

- **source** audit #16 · **verdict** CONFIRMED · **state** error · **where** Home route, first load
- **frame** `dock-view-select/` user-1440-light-01-open.png, user-1440-light-03-kbd.png
- **observed** 'This panel hit an unexpected error. Failed to fetch dynamically imported module: http://localhost:9000/@fs/Users/mkbabb/…/lab.md?import'. The cause was a transient vite 504 (Outdated Optimize Dep); the URL now returns 200.
- **expected + canon** The error state should name the failure in user language, not leak internal paths.
- **owner** **CONSUMER**: CONSUMER About-pane error boundary (outside this seat)
- **fix shape** Show a generic message plus 'Try again'; put the raw error behind a details toggle or send it to the console only.

#### UIA-V-499 · LOW · dock-view-select · Admin plate is 3px from its max-height; one more admin view would make it scroll

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `dock-view-select/` probe.json (admin plate 381px vs max-height 384px)
- **observed** The 7 admin views, the separator and the toggle fill 381 of 384px. Any added view gives a scrolling nav menu at 1440. This follows from the row-floor defect and makes it more urgent.
- **owner** **CONSUMER**: CONSUMER useDockAdminMode.ts:27 together with the glass 44px desktop row floor
- **fix shape** Resolves once the row floor is tied to (pointer: coarse) and the toggle row is removed.

#### UIA-V-500 · LOW · dock-action-bar-color · The sub-layer crossfade reimplements DockCrossfade with a setTimeout

- **source** audit #12 · **verdict** CONFIRMED · **state** transition · **where** /#/ actions ↔ input
- **frame** `dock-action-bar-color/` light-d-picker-06-input-arm-dock.png (the grid-sizing side effect is finding 1)
- **observed** A hand-written two-ref timer with a hard-coded 260ms, not tied to the dock spring. Because both faces stay in a grid, the hidden face sets the width (root cause of finding 1).
- **expected + canon** dock README:25: DockCrossfade is the face-swap primitive; README:67-68: layer transitions share the dock spring.
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/shell/dock/layers/ActionBarLayer.vue:82-129 (local useLayerTransition shim, SUB_LAYER_CROSSFADE_MS=260). GLASS — the file's own relay note asks for a public content-swap composable · *glass component* DockCrossfade · *head* open-at-HEAD
- **fix shape** Use <DockCrossfade> directly. If a composable is really needed, ask the glass-ui session to export one; do not keep the local shim.

#### UIA-V-501 · LOW · dock-action-bar-color · Seat click feedback is hand-written keyframes on --ease-standard, not the spring vocabulary

- **source** audit #13 · **verdict** CONFIRMED · **state** ActionButton pulse/spin feedback · **where** all scenes, click
- **frame** `dock-action-bar-color/` light-d-picker-04-pulse-random.png (at 90ms the dice shows no visible pulse), light-d-picker-05-spin-reset.png (spin shows)
- **observed** The pulse is not visible in the 90ms frame. The spin reads. Both are literal transforms and stroke widths on a 400ms decelerate curve.
- **expected + canon** DESIGN.md:77: '--spring-snappy ... tap release'; DESIGN.md:13: no scattered hardcoded transforms. DockControl's useLiquidPress already provides the press.
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/ActionButton.vue:117-136 (scale 1.2/1.3, stroke-width 2.75, 0.4s, action-pulse/action-spin)
- **fix shape** After moving to DockControl (finding 3), drop action-pulse. Keep the reset/regenerate spin as a token-driven motion (a --spring-snappy duration or easing).

#### UIA-V-502 · LOW · dock-action-bar-color · The hidden Tools trigger stays in the accessibility tree on views with no action bar

- **source** audit #14 · **verdict** CONFIRMED · **state** no action bar · **where** /#/browse, /#/extract, /#/atmosphere, /#/admin/users and /#/nope-404, both viewports
- **frame** `dock-action-bar-color/` crop-light-d-nobar-browse.png, light-m-nobar-browse.png; capture-log.json *-nobar-* (toolsSlotVisible:false, toolsBtnCount:1, tabindex '-1')
- **observed** Visually correct: Tools is absent and the dock is shorter. But the button is still rendered, named 'Toggle action bar', with no inert or aria-hidden, so screen readers can still list it.
- **expected + canon** An absent control is absent for every modality (four-state contract, DESIGN.md:13).
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/ActionBarToggle.vue:76-95 (visibility is only opacity:0 plus a 0fr column and tabindex=-1)
- **fix shape** Put `inert` on .action-bar-toggle-slot when !visible, which also removes the need for tabindex juggling.

#### UIA-V-503 · LOW · dock-action-bar-color · The retired ActionToolbar.vue is still in the tree

- **source** audit #15 · **verdict** CONFIRMED · **state** n/a · **where** code only
- **frame** `dock-action-bar-color/` n/a (source)
- **observed** 121 lines of dead UI whose header explains why it can't be deleted yet. It is a second copy of the five seats that a later reader could revive.
- **expected + canon** One render path (X-W4 CC-043's own rule).
- **owner** **CONSUMER**: CONSUMER — demo/shell/dock/ActionToolbar.vue:1-121 (not imported anywhere; pinned by test/picker-blob-config.test.ts:50-51)
- **fix shape** In the wave that owns test/**, delete the file and re-anchor the two test assertions on usePaneRouter.ts colorActions, as the file's header prescribes.

#### UIA-V-504 · LOW · dock-action-bar-color · Inactive-layer controls are still hit-testable during and after a layer swap

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `dock-action-bar-color/` capture.mjs:50-55 openBar force-click → light-d-generate-01-actions-dock.png mis-seat
- **observed** The capture could reach 'Toggle action bar' while the actions layer was on stage, and doing so correlates with the stale-offset render in finding 11. An off-stage layer should be inert.
- **owner** **GLASS+CONSUMER**: CONSUMER — Dock.vue layer composition (the off-stage main layer carrying the Tools button); possibly GLASS DockLayer (no inert on inactive layers) · *glass component* DockLayer · *head* open-at-HEAD
- **fix shape** Mark inactive DockLayers inert (the glass DockLayer if it owns the stage, otherwise the consumer).

#### UIA-V-505 · LOW · dock-color-input · Spellcheck, autocorrect and autocapitalize are live on a CSS-literal field

- **source** audit #14 · **verdict** CONFIRMED · **state** typing · **where** ColorInput.vue:13
- **frame** `dock-color-input/` 1440-light-05-typing-parse-echo.png (red spellcheck squiggle under 'oklch'; log spell:true)
- **observed** The contenteditable span keeps default spellcheck, so CSS function names get a misspelling underline. On mobile, autocapitalize/autocorrect would also rewrite input (not captured: 390 blocked by the server outage).
- **expected + canon** A CSS-literal field sets spellcheck=false, autocapitalize=off, autocorrect=off, inputmode=text, enterkeyhint=done (glass Input native attrs, input/types.ts InputNativeAttrs).
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:11-16
- **fix shape** Moot once the field is the glass Input. Until then add spellcheck='false' autocapitalize='off' autocorrect='off' to the span.

#### UIA-V-506 · LOW · dock-color-input · Right-edge mask fades the resting value under the send arrow

- **source** audit #15 · **verdict** CONFIRMED · **state** input mode resting · **where** ColorInput.vue:302-306
- **frame** `dock-color-input/` 1440-light-02a-input-open-midflash.png (')' of 'lab(92% 88.8 20 / 82.7%)' faded)
- **observed** The last characters of the current color fade out at rest even when they fit, because the mask always applies and pr-9 plus centred text push the value under it.
- **expected + canon** Reserve the trailing slot as layout (a flex trailing adornment) rather than masking over content.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:300-310 (.color-input mask-image, --input-action-width 2.5rem)
- **fix shape** Move the arrow into a trailing flex slot of the field and drop the mask.

#### UIA-V-507 · LOW · dock-color-input · The crown indicator and the send arrow are both absolutely seated at the field's right edge and will overlap

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `dock-color-input/` none. Code read only: no named color was active in any capture. PLAUSIBLE.
- **observed** When currentColorMeta is set, the crown (right: .5rem) and the send arrow (right: .25rem) share the same spot, and the error badge (right: .5rem) sits there too. Three absolutely positioned trailing adornments, no layout slot.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:33-35 (Crown absolute right-2) vs :336-340 (.send-btn absolute right .25rem)

#### UIA-V-508 · LOW · dock-color-input · Enter and the 2 s debounce double-fire the same parse

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `dock-color-input/` code read
- **observed** Typing queues parseAndSetColorDebounced, and Enter calls parseAndSetColor immediately without cancelling the pending debounce, so the same text is parsed again 2 s later. With invalid text, the previousInvalid guard swallows the second call. With valid text, it is a redundant updateModel no-op. This is part of why the invalid-feedback timing looks erratic.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:195-212 + useColorParsing.ts:94

#### UIA-V-509 · LOW · dock-color-input · Dead injections and prop on ColorInput

- **source** confirm miss #5 · **verdict** MISSED (confirm seat)
- **frame** `dock-color-input/` code read
- **observed** The `editTarget` prop, `cssColorOpaque` and `canProposeName` are declared or injected but never read in this component. That is residue from the ColorPicker extraction, and it widens the COLOR_MODEL_KEY surface the component appears to depend on.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:139-156

#### UIA-V-510 · LOW · dock-slug-edit-layer · The slug and admin labels are hand-rolled .slug-pill stadiums with inline literal colors, not glass Badge

- **source** audit #13 · **verdict** AMENDED · **state** admin token submitted; logged-in menu · **where** results of the layer: admin mode pill in the dock; slug label in the Profile/Menu dropdown
- **frame** `dock-slug-edit-layer/` 1440-light-05-admin-token-submitted.png ('admin' gold stadium in the dock), 1440-light-14-regen-failed-logged-in-menu.png (29-char bold mono stadium label)
- **observed** A static label is dressed as a bordered stadium pill (the owner's 'too rounded pills' complaint). The inline style literals bypass tokens, and the dropdown label pill competes with the menu items for weight.
- **expected + canon** glass Badge (variant outline, --radius-badge) with an admin/gold variant or token, or plain mono text for the slug in the menu label.
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/styles/foundation.css:633-635 (`.slug-pill { @apply … rounded-full border }`), ProfileSection.vue:70-75 and :115-117 (inline `style="border-color: var(--color-gold); color: var(--color-gold)"`), MobileMenuDropdown.vue:46-51, :85-86. Canon: DESIGN.md radius role table `--radius-badge` = Badge; demo/DESIGN.md:207 'avoid hand-rolling rounded-full when the role-bearing token applies' · *glass component* Badge (styles/foundation.css:633-635) · *head* open-at-HEAD
- **fix shape** Replace .slug-pill with glass Badge. If Badge lacks a gold/admin tone, relay the variant request to glass-ui BH rather than restyling locally.
- **confirm** Hand-rolled pill CONFIRMED: foundation.css:633-635 is rounded-full plus a border, with inline styles at ProfileSection.vue:114 and MobileMenuDropdown.vue:86 (the audit's line numbers are off by about one). 1440-light-05.dock shows the gold bordered 'admin' stadium. But glass DESIGN.md:390 sets --radius-badge = var(--radius-pill), a stadium. Adopting glass Badge fixes the token and literal hygiene but not the owner's 'too rounded' complaint. If labels should be card-like, that is a GLASS canon change to the --radius-badge role and must be relayed, not claimed as solved by Badge adoption.

#### UIA-V-511 · LOW · dock-slug-edit-layer · 390 Menu (the reach path): the GitHub item wraps its icon and label onto two lines

- **source** audit #14 · **verdict** CONFIRMED · **state** logged out, dark · **where** 390 Menu dropdown
- **frame** `dock-slug-edit-layer/` 390-dark-11-regen-failed-logged-out-menu.png
- **observed** The GitHub glyph sits on one line and 'GitHub' below it, unlike Share color and Dark mode. The item type scale (about 20px Login) also dwarfs the '@mbabb' mono row.
- **expected + canon** Every menu row is glyph plus label on one line, at one type step.
- **owner** **GLASS+CONSUMER**: CONSUMER — demo/shell/dock/menus/MobileMenuDropdown.vue:111-117 (`DropdownMenuItem as-child` with an <a> that does not take the item's flex/gap layout); possibly GLASS DropdownMenuItem as-child class merge — verify · *glass component* DropdownMenuItem · *head* open-at-HEAD
- **fix shape** Put `flex items-center gap-2` on the <a>, or fix as-child class forwarding in glass DropdownMenuItem if that is the root.

#### UIA-V-512 · LOW · dock-slug-edit-layer · The UA focus ring also shows at 390 after every swap, and in orange when not in admin mode

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `dock-slug-edit-layer/` 390-light-08 and 390-dark-08 have activeFocusStyle 'auto 1px rgb(229,151,0)' on DIV.dock-face with no admin mode, so the orange is not an admin cue. The ring's color is uncontrolled and fixed by nothing on the canon ring tokens.
- **observed** 390-light-08 and 390-dark-08 have activeFocusStyle 'auto 1px rgb(229,151,0)' on DIV.dock-face with no admin mode, so the orange is not an admin cue. The ring's color is uncontrolled and fixed by nothing on the canon ring tokens.
- **owner** **GLASS**: GLASS (DockLayer face focus-visible) · *glass component* DockLayer · *head* open-at-HEAD

#### UIA-V-513 · LOW · dock-slug-edit-layer · The Tab order from the empty field at 390 skips the disabled submit and lands on the destructive Generate

- **source** confirm miss #5 · **verdict** MISSED (confirm seat)
- **frame** `dock-slug-edit-layer/` 390-light-02 and 390-dark-02 have active='Generate new slug'. The first keyboard stop after the field is the identity-destroying act. This supports removing Generate from the layer.
- **observed** 390-light-02 and 390-dark-02 have active='Generate new slug'. The first keyboard stop after the field is the identity-destroying act. This supports removing Generate from the layer.
- **owner** **CONSUMER**: CONSUMER

#### UIA-V-514 · LOW · dock-mobile-menu · Four type voices in one 215px menu, and the content's `font-display` class has no effect

- **source** audit #10 · **verdict** CONFIRMED · **state** menu open · **where** 390 + 1440 twin, both themes
- **frame** `dock-mobile-menu/` light-390-in-1-open.png, light-1440-in-1-desktop-twin-open.png
- **observed** The slug is Fira Code 18px/700, the rows Plus Jakarta Sans 21px, '@mbabb' Fira Code, and the tagline Fraunces italic micro. The `font-display` (Fraunces) class on DropdownMenuContent never reaches the rows, which take glass's font.
- **expected + canon** One menu voice (glass picker-family), with mono only for literal identifiers. No dead font classes.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/menus/MobileMenuDropdown.vue:43 (font-display), :48 (slug-pill mono bold), :103-104 (mono link + italic serif tagline)
- **fix shape** Delete font-display from the content. Show '@mbabb' in the row voice and drop the italic tagline, or move it to About.

#### UIA-V-515 · LOW · dock-mobile-menu · The slug chip is a hand-rolled stadium `.slug-pill` recipe, not the glass Badge

- **source** audit #11 · **verdict** CONFIRMED · **state** menu open, logged in · **where** 390 both themes, logged in and admin
- **frame** `dock-mobile-menu/` light-390-in-1-open.png, dark-390-in-1-open.png
- **observed** A bold mono chip with a 2px accent-ink border and computed radius 1.67772e+07px, coloured per instance through :style. It is the one heavy-outlined pill in the menu, and 'admin' is a second hand-rolled copy with inline style literals at :86. Stadium is canon for a badge, so the radius is correct, but the component is not a glass primitive.
- **expected + canon** A glass <Badge variant='outline'> reading --radius-badge, with ink supplied through a token or prop rather than inline :style.
- **owner** **GLASS+CONSUMER**: CONSUMER demo/styles/foundation.css:633-635 (`@apply … rounded-full border`) + :794 (2px border bump); used at MobileMenuDropdown.vue:48,86. GLASS Badge (glass-ui/src/components/badge) with canon --radius-badge (DESIGN.md radius role table: Badge → stadium) · *glass component* Badge (src/components/badge) · *head* open-at-HEAD
- **fix shape** Replace .slug-pill here and at :86 with the glass Badge. If the owner's 'too rounded pills' ruling extends to badges, relay it to glass as a --radius-badge role change and do not override it locally.

#### UIA-V-516 · LOW · dock-mobile-menu · GitHub row stacks icon-over-label on fine pointer too (46px row), not only at 21px

- **source** confirm miss #2 · **verdict** MISSED (confirm seat) · **severity note** LOW (extends finding 1)
- **frame** `dock-mobile-menu/` confirm/c-light-390-in-open-fine.png
- **observed** 
- **owner** **CONSUMER**: CONSUMER MobileMenuDropdown.vue:112-117 / ProfileSection.vue twin (<a> computes display:block; svg display:block from preflight)

#### UIA-V-517 · LOW · dock-mobile-menu · Regenerate row keeps a heavy accent focus/highlight ring after @select.prevent, so the verdict row reads as if it were attached to a selected control

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `dock-mobile-menu/` light-390-in-7-identity-verdict.png
- **observed** 
- **owner** **GLASS+CONSUMER**: CONSUMER (@select.prevent keeps focus on the row) / GLASS glass-menu-row highlight ring radius · *glass component* _shared/menu highlight ring after @select.prevent · *head* open-at-HEAD

#### UIA-V-518 · LOW · dock-profile-menu · 'Regenerate slug' is an identity-destroying act styled as a peer command; its muted class is dead

- **source** audit #12 · **verdict** AMENDED · **state** profile menu open · **where** class 'text-muted-foreground' on the DropdownMenuItem
- **frame** `dock-profile-menu/` light-1440-3-menu-open-done-crop.png, dark-1440-16-menu-after-slug-login.png
- **observed** The row's computed color is rgb(28,25,23), the same as Copy/Switch/Logout, so the de-emphasis never paints. The act revokes the current identity (see the failed-regenerate finding) with one click and no confirmation, unless local palettes exist.
- **expected + canon** A destructive identity act carries destructive tone or a confirm step, and class intent actually paints.
- **owner** **GLASS+CONSUMER**: CONSUMER demo/shell/dock/menus/ProfileSection.vue:86-95 · *glass component* DropdownMenuItem tone/destructive axis · *head* open-at-HEAD
- **fix shape** Use the glass destructive item tone (or a confirm sub-step), and remove the dead muted class.
- **confirm** The defect is confirmed: text-muted-foreground at ProfileSection.vue:87 and MobileMenuDropdown.vue:62 is overridden, and the frames show the same ink as its sibling rows. The fix cites a primitive that does not exist: glass src/components/menu/DropdownMenuItem.vue declares only disabled/inset, and menu.css paints no destructive tone. The fix should be a confirm sub-step in the consumer, plus a GLASS relay requesting a destructive menu-item tone.

#### UIA-V-519 · LOW · dock-profile-menu · Signing in with a slug yanks the view to Palettes

- **source** audit #13 · **verdict** CONFIRMED · **state** after slug sign-in · **where** deps.setActiveView("palettes") on every successful sign-in and admin entry
- **frame** `dock-profile-menu/` dark-1440-16-menu-after-slug-login.png (Palettes view after signing in from Home)
- **observed** The user signs in from Home (picker) and lands in Palettes. The URL becomes #/palettes and the picker context is left.
- **expected + canon** Identity change is orthogonal to the view: stay where the user acted, or offer navigation.
- **owner** **CONSUMER**: CONSUMER demo/palettes/useSlugMigration.ts:107,119,126
- **fix shape** Drop the forced setActiveView, or make it an explicit 'Open palettes' action in the verdict.

#### UIA-V-520 · LOW · dock-profile-menu · At 390 the dropdown hugs the viewport's left edge (x≈0) with no 16px side gutter

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `dock-profile-menu/` light-390-3-menu-open-done.png
- **observed** The menu's left border touches the viewport edge while the dock sits centered, which breaks the phone-gutter rule.
- **owner** **GLASS+CONSUMER**: GLASS DropdownMenuContent collision padding, or CONSUMER align/collision props · *glass component* DropdownMenuContent · *head* open-at-HEAD

#### UIA-V-521 · LOW · dock-mbabb-menu · DropdownMenuContent corner is 12px (panel rung), not the popover/card rung, and it sits outside the overlay-plate family that Select uses

- **source** audit #9 · **verdict** AMENDED · **where** dock @mbabb menu open, all viewports and themes
- **frame** `dock-mbabb-menu/` 1440-light-2b-open-zoom.png, 390-dark-2b-open-zoom.png (computed borderRadius 12px in capture-log .probes.open.menu)
- **observed** The menu computes border-radius 12px (the --radius-panel rung) and 6px padding. Rows are 8px. Select content, which rides the overlay plate, resolves to --radius-card at 16px. The two anchored-list overlays in the same app use different corner rungs.
- **expected + canon** One corner rung for the floating anchored-list family per the role table, with rows taking the concentric inner radius from the relay (Law 1).
- **owner** **CONSUMER**: GLASS DropdownMenuContent (class list 'dropdown-menu__content glass-reveal glass-floating', with no .glass-overlay-plate). Canon: glass-ui DESIGN.md:387 '--radius-card 16px Content card / popover' and DESIGN.md:1173 (DropdownMenuContent is in the popover family); overlay-plate.css:63-64 (.glass-overlay-plate --radius-ctx: var(--radius-card))
- **fix shape** Glass (route to the glass-ui session): put DropdownMenuContent on .glass-overlay-plate[data-reveal="menu"], or name a menu role in the radius table and use it for both Select and DropdownMenu. Row radius then comes from --overlay-option-radius.
- **confirm** The observation is correct for what ships. menuCls is 'dropdown-menu-content dropdown-menu__content glass-reveal glass-floating', and the 7.0.0 glass-ui.css has `.dropdown-menu__content{…border-radius:var(--radius-panel)}`, which is 12px. But glass HEAD has already cured it: DropdownMenuContent.vue now takes overlayContentAttrs (_shared/overlay/content.ts:57-60), which writes 'glass-overlay-plate glass-reveal', so --radius-ctx is var(--radius-card) at 16px (overlay-plate.css:63). The owner is therefore CONSUMER/pin (value.js pins ^7.0.0 and resolves 7.0.0), and the glass session has nothing new to fix. Route it as 'adopt the glass release that carries the overlay-plate menu' plus a verify-after-bump, not as a fresh glass defect.

#### UIA-V-522 · LOW · dock-mbabb-menu · glass DESIGN.md:1047 still documents the retired DockDropdownTrigger; DockTrigger for=dropdown has no chevron

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `dock-mbabb-menu/` n/a (source)
- **observed** This is doc drift that misleads consumers citing canon. Glass should either give the dropdown leg the 'text + icon + chevron' shape the table promises or correct the table. Route to the glass-ui session.
- **owner** **GLASS**: GLASS (DESIGN.md dock component table; DockTrigger.vue:54-68 renders the chevron only for for=select) · *glass component* dock (DockTrigger.vue:54-68) · *head* open-at-HEAD

#### UIA-V-523 · LOW · dock-mbabb-menu · Menu separator stops short of the plate edges

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `dock-mbabb-menu/` 1440-light-2b-open-zoom.png (seps rect x733 w209 vs menu x730 w215 in capture-log-run1.json)
- **observed** Hairlines leave a 3px gap on each side instead of bleeding to the plate edge or matching the row inset. Low confidence that this breaks canon. Recheck after the overlay-plate adoption, where --overlay-pad may change it.
- **owner** **GLASS**: GLASS DropdownMenuSeparator (margin -4px inside a 6px-padded plate) · *glass component* DropdownMenuSeparator · *head* open-at-HEAD

#### UIA-V-524 · LOW · palettes-view · Same Badge, two meanings: header '4' = palettes, card '5' = colors (unit only in a title tooltip); the card count duplicates the strip

- **source** audit #18 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · loaded
- **frame** `palettes-view/` loaded__1440__light.png, loaded__1440__dark.png
- **observed** Identical secondary stadium badges carry palette counts and color counts, with no visible unit. The per-card count restates the number of strip segments directly above.
- **expected + canon** CLUTTER: counts that are not already shown by the specimen stay off it, or carry a unit.
- **owner** **CONSUMER**: CONSUMER demo/palettes/PalettesPane.vue:19-24; demo/palettes/browser/card/PaletteSpecimen.vue (count Badge, data-count=colors)
- **fix shape** Drop the per-card count (the strip is the count), or render it as quiet text '5 colors'. Keep the header badge.

#### UIA-V-525 · LOW · palettes-view · Selected card repeats its strip as a row of dots

- **source** audit #19 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · card selected
- **frame** `palettes-view/` selected__1440__light.png, selected__1440__dark.png, dock__390__dark.png
- **observed** The selection opens a band of 4 watercolor dots with exactly the colors of the strip 40px above, and they are not interactive (see the swatch-menu finding).
- **expected + canon** CLUTTER: one representation of the palette. Per-color verbs attach to the strip segments.
- **owner** **CONSUMER**: CONSUMER demo/palettes/PaletteInspector.vue:94-122 (PaletteCardSwatches on expand)
- **fix shape** Make strip segments the per-color targets (glass Popover on each), and drop the duplicate dot band (or show a dense detail instead, such as CSS values).

#### UIA-V-526 · LOW · palettes-view · Menu voice: display-serif header over mono items (about 20px mono at 390)

- **source** audit #20 · **verdict** AMENDED · **state** PLAUSIBLE · **where** palettes-view · palette menu · 1440 and 390
- **frame** `palettes-view/` menu__1440__light.png, menu__390__light.png
- **observed** Prose verbs (Publish, Rename, Export, Delete) are set in Fira mono, while the menu label is display serif. At 390 the mono grows to about 20px.
- **expected + canon** Menu rows take a font token seam (like --input-bar-font) so a consumer can set the plate's prose voice once.
- **owner** **CONSUMER**: GLASS DropdownMenuContent/Item font (the menu row reads --font-mono; same family as the Select-font feedback: font should be a token seam)
- **fix shape** GLASS: add a --menu-row-font token defaulting to the current face. CONSUMER: set it once at the app root.
- **confirm** The visual is confirmed in menucolor__1440__light__s2.png (serif 'Sunset Coast' label over mono Publish/Rename/Export/Delete). The OWNER is wrong: the mono is the CONSUMER's own pin, demo/styles/foundation.css:419 `--dropdown-menu-font: var(--font-mono)` ('PROJECT OVERRIDE'). Glass root already retired the `--dropdown-menu-{font,bg,border,shadow}` knobs (glass src/components/_shared/menu/menu.css:125, 'clean break, no alias'), so asking glass for a --menu-row-font would revive a ruled-dead knob. Fix: CONSUMER deletes the pin, and the rows then inherit the plate's voice, as they do automatically on the glass upgrade.

#### UIA-V-527 · LOW · palettes-view · Search clear '×' renders saturated blue on the warm plate

- **source** audit #21 · **verdict** AMENDED · **state** PLAUSIBLE · **where** palettes-view · search filtering · 1440 light
- **frame** `palettes-view/` search__1440__light.png
- **observed** The clear glyph is a bright blue accent unrelated to the page's derived palette (dark theme renders it as ink).
- **expected + canon** Tokens, not a fixed accent: the clear affordance takes --muted-foreground/--foreground.
- **owner** **CONSUMER**: GLASS SearchBar clear-button ink
- **fix shape** GLASS: paint the SearchBar clear icon from the muted-foreground token.
- **confirm** The owner is misrouted. Glass has deleted SearchBar at the root (src/components/input/index.ts:6, BK #42), so a GLASS 'fix the SearchBar clear ink' has no target. The blue lives only in the 7.0.0 dist, and the cure is the consumer moving to glass Input (search). The visual is unverified in this pass, since only the dark frame (where the × renders as ink) was opened. It stays PLAUSIBLE as a symptom.

#### UIA-V-528 · LOW · palettes-view · dashed-well: dashed 'receptacle' edge on a raised cartoon stamp; glass's seated well is recessed

- **source** audit #22 · **verdict** CONFIRMED · **state** CONFIRMED · **where** palettes-view · Current Palette editor (empty and loaded)
- **frame** `palettes-view/` empty__1440__light.png, loaded__1440__light.png
- **observed** The in-progress composer has a dashed edge plus --shadow-cartoon-sm (reads raised), inside the rung-1 plate that also has a stamp. glass-ui now ships .glass-well (an inset groove = recessed seat, surface-axis.css:115-130).
- **expected + canon** A rung-2 well reads recessed (hole in the plate), never heavier than its host (demo/DESIGN.md depth law RC-2).
- **owner** **CONSUMER**: CONSUMER demo/styles/utils.css:90-108
- **fix shape** Compose .dashed-well from .glass-well (inset) and keep the dashed edge. Drop the outset stamp.

#### UIA-V-529 · LOW · palettes-view · Picker-card blob pops in late / inconsistently across loads

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `palettes-view/` loaded__1440__light.png (no blob at the card's top right) vs selected__1440__light.png / offline__1440__light.png (blob present at 655,165)
- **observed** The same state and theme show different chrome depending on capture timing. This may reflect the saturated load, so re-check on an idle machine before ruling.
- **owner** **CONSUMER**: CONSUMER picker hero blob mount

#### UIA-V-530 · LOW · palettes-view · Current Palette header mixes serif title with mono '4 colors' count, a third voice in one well

- **source** confirm miss #5 · **verdict** MISSED (confirm seat)
- **frame** `palettes-view/` loaded__1440__light.png (767,303 serif vs 1162,302 mono)
- **observed** This compounds the mono menu/rename/offline registers. The plate uses at least three faces for prose.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/card/CurrentPaletteEditor.vue (count label)

#### UIA-V-531 · LOW · palette-scene-actions · Escape first closes the seat's hover card, not the open drawer; the card paints above the modal backdrop

- **source** audit #13 · **verdict** CONFIRMED · **state** dock 'Version history' -> Escape · **where** demo/shell/dock/ActionButton.vue:2-10 (hover-triggered Popover stays open across dispatch)
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/light-1440-15-versions-from-dock.png, dark-1440-15b-versions-after-one-escape.png, sheet-light-390-d.png frame 1
- **observed** One Escape leaves the drawer open (afterEsc1 dialogs=1); a second Escape closes it. The 'Version history' hover card stays above the backdrop.
- **expected + canon** A hint should be dismissed when its control is activated. A glass Tooltip closes on activation.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Close the hint on click, or switch to glass Tooltip (see the finding on hover hints).

#### UIA-V-532 · LOW · palette-scene-actions · Seat hints use a hover Popover card instead of the glass Tooltip, and pop up unprompted

- **source** audit #14 · **verdict** CONFIRMED · **state** opening any action layer · **where** demo/shell/dock/ActionButton.vue:2-5
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/light-1440-09b-deselected-tools-set.png, light-1440-10b-after-delete.png
- **observed** Hints are Popover trigger='hover' surfaces with the 16px card radius and a heading-plus-description layout. They open under the resting pointer when the layer swaps in ('Copy color' / 'Extract palette' appear without intent).
- **expected + canon** DESIGN.md role table: --radius-tooltip 10px for a tooltip vs --radius-card 16px for a popover. glass-ui ships Tooltip (src/components/tooltip).
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Use glass Tooltip (with its open delay, and no opening on layer mount).

#### UIA-V-533 · LOW · palette-scene-actions · Icon and wording collisions in the verb set

- **source** audit #15 · **verdict** AMENDED · **state** saved vs remote verb sets · **where** demo/shell/usePaneRouter.ts:955-983
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/light-1440-04-palette-verbs-saved.png vs light-1440-11-browse-remote-owned-verbs.png
- **observed** The globe icon means 'Publish palette' on a local palette and 'Make public' on a remote one. The Vote title flips to 'Remove vote', but its description stays 'Vote for the selected palette.' The bookmark icon means Save.
- **expected + canon** One icon per meaning; descriptions follow the state.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Give Publish its own icon (for example Upload or Send). Make the vote description depend on the voted state.
- **confirm** The code confirms it: usePaneRouter.ts:971 is Globe for Publish, and :974 is Globe for 'Make public' when not public. The vote description is fixed at :986. No frame shows it, though: the captured owned palette is public, so its seat shows EyeOff (light-1440-14). The Globe collision rests on source alone.

#### UIA-V-534 · LOW · palette-scene-actions · Verb messages are inconsistent: the export message shows an internal id, and the Remix failure uses different words

- **source** audit #16 · **verdict** CONFIRMED · **state** Export JSON; Remix with 500 · **where** demo/palettes/PaletteInspector.vue exportAs (showFeedback of outcome.filename); BrowsePane fork handler
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/light-1440-07-export-json.png, dark-1440-16-remix-failed.png
- **observed** The export message reads 'Exported palette-draft--saved-1.json', showing the device-draft id; the filename stem itself is by spec (export/canonical.ts:62-66). Remix says 'Remix failed: the fork did not reach the server.' where its siblings relay the server's problem title ('Vote failed: Server exploded').
- **expected + canon** Messages speak the palette's name and follow one pattern.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** 'Exported Sunset Harbor as JSON'. Use one '<Verb> failed: <problem title>' template for all verbs.

#### UIA-V-535 · LOW · palette-scene-actions · Glass dock cuts a seat in half at the scroll edge with no scroll cue

- **source** audit #17 · **verdict** AMENDED · **state** 390x844, any overflowing dock layer · **where** GlassDock overflow (glass-ui src/components/dock/README.md:41,50-52)
- **frame** `palette-scene-actions/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/palette-scene-actions/crop-390-row-overflow.png
- **observed** The capped run scrolls natively. A half-faded Remix icon is the only hint that more controls exist, and the partial control can still be pressed.
- **expected + canon** Glass dock README :50-52: 'capped horizontal and vertical runs otherwise use native scrolling only when measured content exceeds the relevant size cap'. The producer owns overflow, so its cue belongs there too.
- **owner** **CONSUMER**: GLASS
- **fix shape** Snap the scroll so no control is cut in half, or add an overflow='menu' mode that folds the tail into a trigger. Either way, give a visible end-of-row cue.
- **confirm** The frame is confirmed (crop-390-row-overflow.png), but the owner should be CONSUMER first, not GLASS. The producer already offers overflow='wrap' (dock README :41), which the consumer does not use (Dock.vue:159-165 passes no overflow). glass also ships a fading-scroll primitive. What glass still owns is narrow: no edge cue and no snap on a capped native-scroll run, so an optional scroll-snap or fading edge in GlassDock is a fair relay ask, at LOW. Primary cure: the consumer ranks the verbs or uses wrap or an overflow menu.

#### UIA-V-536 · LOW · palette-scene-actions · The glass dock's overflow='wrap' is not used by the consumer

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `palette-scene-actions/` glass-ui src/components/dock/README.md:41 lists overflow grow\|wrap. demo/shell/dock/Dock.vue:159-165 passes no overflow prop.
- **observed** glass-ui src/components/dock/README.md:41 lists overflow grow\\|wrap. demo/shell/dock/Dock.vue:159-165 passes no overflow prop.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Use wrap, or an overflow menu, for verb layers on narrow viewports.

#### UIA-V-537 · LOW · palette-scene-actions · Version drawer surface lets the page show through its left band (palette card visible through the sheet)

- **source** confirm miss #5 · **verdict** MISSED (confirm seat)
- **frame** `palette-scene-actions/` light-1440-ERR-16-remix-failed.png: the Sunset Harbor swatch band and card edges show through the drawer's left ~110px.
- **observed** light-1440-ERR-16-remix-failed.png: the Sunset Harbor swatch band and card edges show through the drawer's left ~110px.
- **owner** **UNRESOLVED**: UNCERTAIN (glass Dialog placement surface vs consumer class)
- **fix shape** Check the glass sheet/drawer surface opacity ramp. If it is a producer gradient, relay it to glass.

#### UIA-V-538 · LOW · palette-card-menu · The owned-palette menu is cluttered: 9 rows + header, redundant verbs, two different actions both called 'Publish'

- **source** audit #10 · **verdict** CONFIRMED · **state** open · owner · **where** browse · owner menu; palettes · local saved menu
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/menu-owned-1440-light.png; menu-saved-local-1440-light.png
- **observed** The owner sees Save and Remix on their own palette alongside Make private, Rename, Edit Tags, Versions, Export and Delete. 'Publish' on a saved local palette (create remote) and 'Publish' on a private remote palette (flip visibility) share a label and icon but are different operations.
- **expected + canon** Every menu row earns its place for the viewer's relation to the palette. One verb per operation.
- **owner** **CONSUMER**: CONSUMER: PaletteCardMenu.vue:14-21 (Save on remote incl. owned), :62-69 (Remix incl. owned), :27-40 vs :48-59 (two 'Publish' semantics), :9 (name header)
- **fix shape** Hide Save/Remix when isOwned. Rename the visibility flip to 'Make public'. Group the verbs (Edit: Rename, Tags · Share: visibility, Export · Danger: Delete) with separators.

#### UIA-V-539 · LOW · palette-card-menu · Menu plate radius is 12px (--radius-panel), but the canon role for an overlay/popover is --radius-card (16px)

- **source** audit #11 · **verdict** CONFIRMED · **state** open · **where** all menu-open states
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/menu-other-1440-light.png (manifest: menu radius 12px, rows 8px)
- **observed** Menu and sub-menu radius is 12px. The tags popover in the same card uses a different overlay register.
- **expected + canon** glass-ui/DESIGN.md role table (:385-396): `--radius-card` 16px 'Content card / popover'; `--radius-panel` is for panel/configurator/Command.
- **owner** **GLASS**: GLASS: installed 7.0.0 dist/components/dropdown-menu/styles.css `.dropdown-menu__content{border-radius:var(--radius-panel)}`. HEAD overlay-plate.css:64 already sets --radius-ctx: var(--radius-card), so this resolves at adoption · *glass component* overlay-plate.css (dist/components/dropdown-menu/styles.css) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** Resolves when value.js adopts the glass-ui line that uses .glass-overlay-plate. Re-measure then; no consumer override.

#### UIA-V-540 · LOW · palette-card-menu · PaletteCard.vue survives as a near-verbatim twin of PaletteInspector.vue, both hosting this menu and meta

- **source** audit #12 · **verdict** CONFIRMED · **state** n/a · **where** browse/palettes · card host
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/browse-rest-1440-light.png
- **observed** The two templates differ only by one comment and an @focus handler. BrowsePane and PalettesPane render PaletteInspector, and demo/test/palettes/n-fixtures/harness/main.ts:5 says the inspector 'replaced PaletteCard', yet PaletteCard.vue is still exported, so there are two hosts of PaletteCardMenu/PaletteCardMeta to keep in sync.
- **expected + canon** One card host, with no one-off duplicates (owner edict: cohesion, no one-off instances).
- **owner** **CONSUMER**: CONSUMER: demo/palettes/browser/card/PaletteCard/PaletteCard.vue (whole file) + demo/palettes/browser/card/index.ts:4 export. The inspector was in-flight/dirty at capture (HEAD de278769)
- **fix shape** Delete PaletteCard.vue and its index.ts export once the inspector lands. Fix the trigger/meta findings once, in the inspector.

#### UIA-V-541 · LOW · palette-card-menu · The featured card drops its colour-count chip at 390

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/tags-popover-open-390-light.png
- **observed** 'Galler…' shows the ribbon, +5 and the vote count, but no '6' colour count, while sibling cards keep theirs. The Featured label text shown at 1440 also collapses to a bare icon at 390.
- **owner** **CONSUMER**: CONSUMER: PaletteInspector/PaletteCardMeta featured-row layout

#### UIA-V-542 · LOW · palette-card-menu · Menu row icons and labels are misaligned when a row wraps

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/menu-owned-1440-light.png
- **observed** The labels on the 'Make private' and 'Delete (admin)' rows start about 8px left of the other rows' labels, because the glyph compresses. Part of this was noted under finding 2, but the column misalignment was not called out.
- **owner** **CONSUMER**: CONSUMER: item icons missing shrink-0 (:50-59, :160-166)

#### UIA-V-543 · LOW · palette-card-menu · A floating orphan trash button sits between the My Palettes cards

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `palette-card-menu/` docs/tranches/X/audit/ui-evidence/value/palette-card-menu/menu-owned-1440-light.png
- **observed** A lone circular trash icon hangs at the right between 'Start a new palette' and the 'My Saved Terracotta' card, detached from any card.
- **owner** **CONSUMER**: CONSUMER: PalettesPane (outside this seat's scope; route to the palettes-pane seat)

#### UIA-V-544 · LOW · palettes-delete-all-dialog · Dark theme: white label on the lighter destructive fill falls under AA contrast

- **source** audit #7 · **verdict** AMENDED · **state** open, dark · **where** PalettesPane.vue:136
- **frame** `palettes-delete-all-dialog/` docs/tranches/X/audit/ui-evidence/value/palettes-delete-all-dialog/1440-dark-2-open.png, 390-dark-3-focus-tab.png
- **observed** The dark fill is rgb(235,71,71) with a near-white 16.4px/500 label, about 3.8:1 by estimate. Light is rgb(219,36,36), about 4.9:1.
- **expected + canon** 4.5:1 for non-large text (WCAG AA). The label here is not large text.
- **owner** **GLASS**: GLASS - Button tone=destructive dark arm (src/components/button/styles.css:157-170, --destructive dark value) · *glass component* Button (src/components/button/styles.css:157-170,) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** GLASS: deepen the dark-scheme destructive fill, or solve the ink against it through the accent-tone solver the library already ships.
- **confirm** The contrast is confirmed. For rgb(235,71,71), I compute 3.80:1 against pure white and 3.07:1 against the likely dark foreground rgb(232,231,227). Light rgb(219,36,36) gives 4.90:1 against white. p2-dark-focus-cancel.png shows the near-white label. The finding is already fixed at the producer: glass v8.0.0 (72105fc4, BK #31) sets dark-arm.css:139-140 `--destructive: oklch(0.702 0.184 27.5); --destructive-foreground: hsl(24 10% 10%)`, a dark ink measured at 6.08 (:203). This becomes a consumer adoption item, not a new glass fix.

#### UIA-V-545 · LOW · palettes-delete-all-dialog · Glass canon disagrees with itself on dialog radius (16px in the doc, 24px room in the HEAD stylesheet)

- **source** audit #8 · **verdict** CONFIRMED · **state** open · **where** glass-ui canon, not the consumer
- **frame** `palettes-delete-all-dialog/` docs/tranches/X/audit/ui-evidence/value/palettes-delete-all-dialog/1440-light-4-dialog-crop.png (7.0.0 renders 16px)
- **observed** Consumed 7.0.0 renders 16px, which matches DESIGN.md:388. Glass HEAD styles.css binds the plate to the 24px room role. The next adoption will silently change the corner, and the role table will then be wrong.
- **expected + canon** One radius role per surface in the table at DESIGN.md:385-391, and the implementation matches it.
- **owner** **GLASS**: GLASS - DESIGN.md:388 (`--radius-dialog` = var(--radius-card), 16px, 'matches the card - F48') vs src/components/dialog/styles.css:14-22 (plate = ROOM, border-radius var(--radius-3xl) 24px) · *glass component* DESIGN.md (src/components/dialog/styles.css:14-22) · *head* open-at-HEAD
- **fix shape** GLASS: update the radius role table (add a room row or re-point --radius-dialog to --radius-3xl), or revert the stylesheet. Rule on one value.

#### UIA-V-546 · LOW · palettes-delete-all-dialog · Dock collapsed to its blob while the dialog was open and had not re-expanded after close (cause unconfirmed)

- **source** audit #9 · **verdict** AMENDED · **state** open and post-close · **where** Dock.vue:159-162
- **frame** `palettes-delete-all-dialog/` docs/tranches/X/audit/ui-evidence/value/palettes-delete-all-dialog/1440-light-2-open.png, 1440-dark-5-after-confirm.png, p2-light-after-cancel-5s.png, p3-dock-strip.png
- **observed** In 1440-*-0-pane the dock is fully expanded. At about 0.7s after opening, it is a small blob in every open frame, and it is still collapsed 5s after Cancel or confirm. Control: with no interaction the dock stayed expanded past 12s. After one dock hover plus an outside click it collapsed. This may be the designed 5s idle collapse, not a dialog side effect.
- **expected + canon** Opening and closing a modal should not change the chrome state. Navigation should be in the state the user left it.
- **owner** **GLASS+CONSUMER**: CONSUMER - demo/shell/dock/Dock.vue:161 (collapse-delay 5000) together with the GlassDock collapse state; related to the open DOCK-SCROLL-MORPH / O-55 rows · *glass component* GlassDock (Dock.vue:161) · *head* open-at-HEAD
- **fix shape** Verify whether the modal's scroll-lock or pointer capture starts the dock collapse timer. If it does, hold the dock state while an overlay is open (Dock.vue already has a popup-mutex hold) and restore it on close.
- **confirm** The observation is confirmed: 1440-light-2-open.png shows the dock as a blob, and 1440-light-0-pane.png shows it expanded. The 'cause unconfirmed' and 'maybe 5s idle' parts can now be settled. Glass v7 useDockState.ts:352-362 `onPointerDownOutside` calls collapse() on any capture-phase pointerdown outside the dock (state machine :76 'PINNED --(clickOutside)--> COLLAPSED'). The pointer click on the trash trigger is that outside pointerdown. The dialog is not involved, and the collapse comes within about 0.7s, well before the 5000ms delay at Dock.vue:161. The probe3 control never clicked the page, which is why it stayed expanded. The probe2 'dockOpen w 1408' numbers measure the .dock-band wrapper and prove nothing either way. Owner: GLASS useDockState click-away policy (a desktop dock that the consumer starts expanded via start-collapsed=false collapses on any content click), plus CONSUMER Dock.vue:159-163 configuration. The same happens for every content click, so it is not specific to this dialog.

#### UIA-V-547 · LOW · palettes-delete-all-dialog · Description copy leaks implementation ('from local storage'); the confirm button hand-sizes its icon

- **source** audit #10 · **verdict** CONFIRMED · **state** open · **where** PalettesPane.vue:126-138
- **frame** `palettes-delete-all-dialog/` docs/tranches/X/audit/ui-evidence/value/palettes-delete-all-dialog/1440-light-4-dialog-crop.png
- **observed** The copy reads 'This will permanently delete 3 palettes from local storage.' The 14px Trash2 in the 40px md button is sized by a literal utility, not the Button icon slot.
- **expected + canon** User language ('from this browser'). Icon size inherits from the Button size rung (glass Button owns icon geometry).
- **owner** **CONSUMER**: CONSUMER - demo/palettes/PalettesPane.vue:127-129 (copy), :137 (`<Trash2 class="w-3.5 h-3.5">` literal size)
- **fix shape** Reword to '...delete 3 saved palettes from this browser. This cannot be undone.' Drop the literal w/h and let Button size the icon.

#### UIA-V-548 · LOW · palettes-delete-all-dialog · Dialog header alignment flips per viewport (centred at 390, left-aligned at 1440)

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `palettes-delete-all-dialog/` 390-light-2-open.png vs 1440-light-2-open.png
- **observed** At 390 the title and description are centred and the footer stacks with Delete all above Cancel. At 1440 everything is left-aligned with the footer in one row on the right.
- **owner** **GLASS**: GLASS: v7 DialogHeader and DialogFooter per-viewport alignment. HEAD dialog/styles.css says 'the alignment does not flip per viewport (a per-viewport alignment flip is on no series)', so it is fixed at the producer and the consumer owes the adoption. · *glass component* DialogFooter (styles.css) · *head* open-at-HEAD

#### UIA-V-549 · LOW · palettes-delete-all-dialog · Cancel renders underlined at 390 and without an underline at 1440 in the same open state (cause not isolated)

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `palettes-delete-all-dialog/` 390-light-2-open.png (underlined) vs 1440-light-2-open.png (no underline)
- **observed** Both viewports use the same capture path, and focus starts on Cancel in both. At 1440, probe2 focusCancel reports td:none. The 390 underline is either a hover artifact from where the pointer sat after the tap, or a focus treatment that differs by breakpoint. A text-decoration probe at 390 is needed before routing.
- **owner** **GLASS**: GLASS Button emphasis=text (hover/focus underline), possibly a pointer hover left over from the capture, not verified · *glass component* Button · *head* open-at-HEAD

#### UIA-V-550 · LOW · palettes-delete-all-dialog · Canon doc drift: the DESIGN.md focus-visible rows describe the retired box-shadow ring

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `palettes-delete-all-dialog/` none (doc vs source)
- **observed** The doc still says '.focus-ring atomic :focus-visible { box-shadow: var(--focus-ring-shadow) }'. The shipped source since v8.0.0 paints an outline and states that --focus-ring-shadow is retired for this purpose. Any auditor who follows the doc, as the audit under review did, proposes the wrong fix.
- **owner** **GLASS**: GLASS DESIGN.md:603 and :611 vs HEAD utilities/base.css:135-150 (outline, --ink-perimeter) · *glass component* base.css (base.css:135-150) · *head* open-at-HEAD

#### UIA-V-551 · LOW · browse-view · The Browse empty state gives no next step, unlike its sibling, and leaves about 60% of the pane dead

- **source** audit #14 · **verdict** CONFIRMED · **state** empty (local default) · **where** PaletteCardGrid empty
- **frame** `browse-view/` empty__1440__dark.png, empty__1440__light.png, empty__390__light.png
- **observed** 'No palettes published yet.' has no hint and no action. The sibling My Palettes empty state carries a hint ('Add colors, then save.') plus a 'Start a new palette' tile. The Browse pane below the message is empty down to y≈750.
- **expected + canon** COHESION: sibling empty states share structure (message, hint, action).
- **owner** **CONSUMER**: CONSUMER — demo/palettes/BrowsePane.vue:78-80 (empty-text only, no hint or action)
- **fix shape** Add a hint and an action (e.g. 'Publish one of yours', which opens the My Palettes publish verb), using the same EmptyState hint slot.

#### UIA-V-552 · LOW · browse-view · Pane-header veil draws a visible band and seam at rest

- **source** audit #15 · **verdict** CONFIRMED · **state** all, scrollTop 0 · **where** Browse and My Palettes header
- **frame** `browse-view/` empty__1440__light.png, loading__1440__light.png
- **observed** A lighter frosted band sits behind the title with a soft-edged seam at about y=345 in light (subtler in dark) before anything has scrolled, which reads as a stripe across the card.
- **expected + canon** The veil exists to separate scrolled content and should not show at scrollTop 0.
- **owner** **CONSUMER**: CONSUMER — demo/shared/ui/PaneHeader.vue (.pane-header::before veil, opacity var(--pane-veil-rest), 14px mask)
- **fix shape** Drive the veil opacity from the existing --pane-scroll timeline, from 0 at the top up to the rest floor.

#### UIA-V-553 · LOW · browse-view · Pane-title treatment differs between siblings (gradient 'Palettes', plain 'Browse'; light theme only)

- **source** audit #16 · **verdict** CONFIRMED · **state** all · **where** PaneHeader titles on the Browse stage
- **frame** `browse-view/` loaded__1440__light.png vs loaded__1440__dark.png
- **observed** In light, 'My Palettes' has a magenta-to-rust ramp on 'Palettes' and 'Browse' is plain ink. In dark, both are plain.
- **expected + canon** Sibling panes on one stage share one title register in both themes.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/PalettesPane.vue:15 (palettes-ramp-text) vs demo/palettes/BrowsePane.vue:3
- **fix shape** Either give Browse the same accent treatment or remove the ramp. Make it theme-consistent.

#### UIA-V-554 · LOW · browse-view · Developing skeleton shimmer reads as bright white glare in light, and the stagger is dormant

- **source** audit #17 · **verdict** CONFIRMED · **state** loading · **where** PaletteCardSkeleton developing
- **frame** `browse-view/` loading__1440__light.png, loading__390__dark.png
- **observed** In light, the strip and meta blocks are near-white glossy bars with a diagonal highlight, reading as glare on the well rather than 'muted ink shadow'. All five segments sweep together, with no left-to-right develop. Dark reads correctly.
- **expected + canon** Per the component's own contract, one muted-ink family, scheme-true, with the sequential sweep.
- **owner** **GLASS+CONSUMER**: GLASS — Skeleton surface="glass" variant="shimmer" (installed 7.0.0 does not read --skeleton-shimmer-delay/--skeleton-glass-bg; see the PaletteCardSkeleton.vue:40-67 note). CONSUMER — demo/palettes/browser/card/PaletteCardSkeleton.vue:14-21 · *glass component* Skeleton (PaletteCardSkeleton.vue:40-67) · *head* open-at-HEAD
- **fix shape** GLASS: honour --skeleton-glass-bg and --skeleton-shimmer-delay in the shimmer ::after (ship them in the next pin). CONSUMER: repin once shipped.

#### UIA-V-555 · LOW · browse-view · Menu typography species mix: card menu items in mono, filter popover items in sans

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `browse-view/` cardmenu__1440__dark.png vs filters__1440__light.png
- **observed** The card ⋯ menu sets Save/Remix/Export/Report in monospace under a serif title. The filter popover sets its items in Plus Jakarta sans under mono labels. Two popovers on one pane use two type systems.
- **owner** **CONSUMER**: CONSUMER — PaletteCardMenu (menu item font) vs SearchFilterBar RadioGroup
- **fix shape** Use one menu-item type register, the glass Menu default.

#### UIA-V-556 · LOW · browse-view · 'Featured' mark renders as mono-bold text beside the serif name, and silently becomes icon-only at 390

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `browse-view/` loaded__1440__light.png vs loaded__390__light.png
- **observed** At 1440 'Featured' is a mono-bold word with a rosette. At 390 only the rosette remains, with about 23px of dead gap while the name truncates.
- **owner** **CONSUMER**: CONSUMER — PaletteSpecimen featured mark
- **fix shape** Render it as a glass Badge in one register, icon-only at every width with a tooltip, and let the name take the freed width.

#### UIA-V-557 · LOW · browse-view · Third overflow glyph: the 390 dock uses a vertical ⋮ next to the search glyph

- **source** confirm miss #5 · **verdict** MISSED (confirm seat)
- **frame** `browse-view/` loaded__390__light.png
- **observed** The page shows ⋮ in the dock, ⋮ as the filter trigger and ⋯ on every card, so three overflow affordances have different meanings.
- **owner** **CONSUMER**: CONSUMER — dock route controls
- **fix shape** One overflow glyph per meaning. The filter trigger gets a filter glyph (already in the audit's fix).

#### UIA-V-558 · LOW · browse-search-filter · The popover plate is 12px (panel rung), but the role table names popover under --radius-card 16px

- **source** audit #12 · **verdict** AMENDED · **state** popover open · **where** /#/browse · Filters popover and MiniColorPicker popover
- **frame** `browse-search-filter/` filters-open-1440-dark.png, mini-picker-open-390-light.png
- **observed** Both popovers compute border-radius 12px (--radius-panel). The glass role table lists popover under --radius-card (16px), and glass HEAD's overlay plate relays --radius-card as the context radius. The canon disagrees with itself.
- **expected + canon** One answer in canon. Either the DESIGN.md row moves popover to --radius-panel, or .popover-content reads --radius-card.
- **owner** **GLASS**: GLASS src/styles/utilities/base.css:74-75 (.popover-content border-radius: var(--radius-panel)) vs DESIGN.md --radius-card row ('Content card / popover', 16px) and overlay-plate.css:64 (--radius-ctx: var(--radius-card)) · *glass component* overlay-plate.css (src/styles/utilities/base.css:74-75) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** Route to the glass session to reconcile DESIGN.md's --radius-card and --radius-panel rows with .popover-content and overlay-plate. No consumer change.
- **confirm** The 12px paint at 7.0.0 is confirmed (manifest popovers radius 12px). The claim that canon still disagrees with itself at HEAD is stale. HEAD PopoverContent.vue:122-128 composes overlayContentAttrs (_shared/overlay/content.ts:57-60), which emits 'glass-overlay-plate glass-reveal' and no longer the .popover-content class. overlay-plate.css sets --radius-ctx: var(--radius-card), which ladder.css paints, so the HEAD popover is 16px and agrees with DESIGN.md:388. What is left for glass is hygiene: base.css:74-75 .popover-content { border-radius: var(--radius-panel) } looks like an orphaned rule that nothing in src applies. The fix is a repin, with a small note to glass to delete or realign that rule.

#### UIA-V-559 · LOW · browse-search-filter · The tag list scrolls inside a 112px well that clips glyphs mid-row with no fade

- **source** audit #14 · **verdict** CONFIRMED · **state** filters popover open · **where** /#/browse · Filters popover · Tags
- **frame** `browse-search-filter/` active-filters-popover-390-dark.png, p2-filters-wheel-1440-light.png
- **observed** The 12 tags scroll inside a 112px well. The top and bottom rows are cut through their letters ('green', 'neutral' half-visible) with no fade mask, and a wheel over the panel is captured by this inner scroller instead of reaching the rest of the panel. Scroll inside scroll.
- **expected + canon** Tags use the glass Chip selectable family (chip/README.md:9), which wraps and has no inner scroller. If a scroller is needed, the glass fading-scroll component provides the fade.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/SearchFilterBar.vue:49 (max-h-28 overflow-y-auto scrollbar-thin)
- **fix shape** Render tags as <Chip mode='selectable' size='sm'> in a wrapping row, or use glass FadingScroll. Remove the nested max-h scroller.

#### UIA-V-560 · LOW · browse-search-filter · The popover's 'p-0' override loses to the glass overlay pad, so padding doubles and dividers are inset

- **source** audit #15 · **verdict** CONFIRMED · **state** filters popover open · **where** /#/browse · Filters popover
- **frame** `browse-search-filter/` filters-open-1440-light.png, filters-open-390-light.png
- **observed** The popover computes 20.35px 16px padding (glass --overlay-pad-*), so 'p-0' has no effect, and each .filter-section adds 12px more. Content is inset about 28px, and the divide-y rules stop short of the plate edges. The 240px panel keeps only about 180px of content width, which squeezes the colour field.
- **expected + canon** Glass HEAD has one overlay pad per role (overlay-plate.css:66) and says consumers should not re-pad. Sections sit on the plate's own inset.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/SearchFilterBar.vue:16 ('p-0') + :237 (.filter-section padding 0.75rem)
- **fix shape** Drop 'p-0' and the .filter-section padding. Use the glass Separator between groups and let the plate pad.

#### UIA-V-561 · LOW · browse-search-filter · The colour search filters only the loaded page (50), not the server

- **source** audit #16 · **verdict** CONFIRMED · **state** colour filter active · **where** /#/browse · colour search applied
- **frame** `browse-search-filter/` color-search-applied-390-light.png
- **observed** The colour match works on the fixture (blue #217bd9 → 'Harbour Dusk'). It filters only the palettes already paged in, and 'More from the commons' then loads unfiltered pages that are filtered locally. With more than 50 palettes the results are silently incomplete, while tier and tags filter on the server. The fixed radius 0.15 is not shown to the user.
- **expected + canon** All filters behave the same way (server-side, via currentFilterOpts), so pagination and filtering agree.
- **owner** **CONSUMER**: CONSUMER demo/palettes/BrowsePane.vue:479-495 (client-side OKLab radius 0.15 over pm.filteredBrowse); the API supports colorL/colorA/colorB (demo/palettes/api/palettes.ts:50-52)
- **fix shape** Add colorL/A/B to useBrowsePalettes.currentFilterOpts and reload. Remove the pane-local displayedBrowse filter.

#### UIA-V-562 · LOW · browse-search-filter · The search clear (×) glyph is a saturated off-palette blue

- **source** confirm miss #2 · **verdict** MISSED (confirm seat) · **where** /#/browse search bar with a query
- **frame** `browse-search-filter/` p2-no-results-query-1440-light.png
- **observed** With 'zzqx' typed, the clear control is a bright blue ×. It matches no token ink on the warm pink/cream plate, while every other icon on the bar is muted-foreground. /#/browse search bar with a query
- **owner** **GLASS+CONSUMER**: GLASS@7.0.0 SearchBar clear button (dies with ./search at HEAD) / CONSUMER once replaced by the .input-bar recipe · *glass component* SearchBar · *head* open-at-HEAD
- **fix shape** When SearchBar is replaced with glass Input + .input-bar, give the clear action a glass icon-only Button in muted-foreground ink.

#### UIA-V-563 · LOW · browse-search-filter · The pane re-centres vertically as results change

- **source** confirm miss #3 · **verdict** MISSED (confirm seat) · **where** /#/browse at 1440, when the result count changes
- **frame** `browse-search-filter/` FAIL-1440-light.png (4 cards; the Browse pane top sits higher) vs p2-color-hsl-1440-light.png (1 card) and p2-no-results-query-1440-light.png (0 cards), where the pane top is lower at display-y ~353
- **observed** The shift happens with any change in result count, not only in the empty state as the no-results finding says. The search field the user is typing in moves on every filter change, and the pane shrinks and re-centres each time. /#/browse at 1440, when the result count changes
- **owner** **CONSUMER**: CONSUMER BrowsePane / pane layout (vertical centring of an intrinsic-height pane)
- **fix shape** Give the pane a stable min-block-size or anchor it to the top so filtering never moves the field.

#### UIA-V-564 · LOW · tag-edit-popover · Glass popover radius contradicts its own canon: 12px measured, the popover role says 16px

- **source** audit #9 · **verdict** AMENDED · **state** open · **where** /#/browse, open state
- **frame** `tag-edit-popover/` 1440-light-02-open.png (measured radius 12px, log-1440-light.json 02-open)
- **observed** The popover surface computes border-radius 12px (the panel rung).
- **expected + canon** DESIGN.md:387: `--radius-card` 16px, 'Content card / popover'.
- **owner** **GLASS**: GLASS popover: src/styles/utilities/base.css:74-75 (.popover-content uses border-radius: var(--radius-panel), 12px), while DESIGN.md:387 and src/styles/theme/radius.css:22 give popover as --radius-card (16px) · *glass component* base.css (src/styles/utilities/base.css:74-75) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** GLASS: make .popover-content use --radius-card, or change the role table if 12px is intended. Route to the glass-ui session (BK relay).
- **confirm** The 12px was measured on the installed glass 7.0.0, not the 10.x source, so the frame alone does not prove the defect in current glass. It does persist at glass HEAD 6433284a: src/styles/utilities/base.css:74-75 has `.popover-content { border-radius: var(--radius-panel) }` (12px), while DESIGN.md:387 and radius.css:22 give popover as --radius-card (16px). The owner call (GLASS) is confirmed. Add to the finding that the contradiction is in current source, so repinning alone will not fix it.

#### UIA-V-565 · LOW · tag-edit-popover · Popover padding overridden with p-0 and utility padding instead of the glass overlay pad tokens

- **source** audit #10 · **verdict** CONFIRMED · **state** open · **where** /#/browse, open state
- **frame** `tag-edit-popover/` 1440-light-02-open.png
- **observed** The glass pad classes (px-(--overlay-pad-inline) py-(--overlay-pad-block)) are cancelled by p-0 and replaced with literal px-3/py-2 on a wrapper div, and the width is a literal w-52.
- **expected + canon** TOKENS NOT LITERALS: use the primitive's overlay pad axis.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/TagEditPopover.vue:6-7 (class="w-52 p-0" then an inner div with px-3 py-2)
- **fix shape** Drop p-0 and the wrapper padding and let PopoverContent pad itself; set a min-width token instead of w-52.

#### UIA-V-566 · LOW · tag-edit-popover · The dialog has no usable name and doesn't say which palette it is tagging

- **source** audit #11 · **verdict** CONFIRMED · **state** open · **where** /#/browse, open state
- **frame** `tag-edit-popover/` 1440-light-02-open.png, 390-light-02-open.png
- **observed** role=dialog with aria-labelledby=reka-popover-trigger-v-NN, an id with no element because the trigger slot is empty. The only header is the mono caption 'TAGS', and the palette's name never appears. With no anchor (first finding), nothing on screen ties the popover to its palette.
- **expected + canon** HIERARCHY + a11y: a named dialog ('Tags for Owned One') with a real heading (glass PopoverContent ariaLabel prop, PopoverContent.vue:23-30).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/TagEditPopover.vue:6-8 (no ariaLabel; 'Tags' is a .section-label div, not a heading)
- **fix shape** Pass aria-label or a heading with the palette name; show the name as the popover title.

#### UIA-V-567 · LOW · tag-edit-popover · Loading state is a lone spinner in a near-empty box

- **source** audit #12 · **verdict** CONFIRMED · **state** loading · **where** /#/browse, catalog GET delayed 4s
- **frame** `tag-edit-popover/` 1440-light-11-catalog-loading.png, 1440-dark-11-catalog-loading.png
- **observed** The box is ~138x90 with 'TAGS' and a 16px spinner. The box then grows to 250px when the list arrives (a layout jump).
- **expected + canon** STATES: glass Skeleton rows at the list's height, so the surface doesn't jump when the list arrives.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/TagEditPopover.vue:11-13
- **fix shape** Render 4-5 Skeleton rows (glass skeleton) at row height while loading.

#### UIA-V-568 · LOW · tag-edit-popover · Checkbox keyboard focus ring is faint, especially in dark

- **source** audit #13 · **verdict** CONFIRMED · **state** focus · **where** /#/browse, keyboard focus in the list
- **frame** `tag-edit-popover/` 1440-light-06-keyboard-focus.png, 1440-dark-06-keyboard-focus.png
- **observed** Focus on the 'pastel' checkbox shows only as a slightly thicker ring on the 16px circle; in dark it is barely different from an unchecked box at rest.
- **expected + canon** A clearly visible focus ring (glass .focus-ring) in both themes.
- **owner** **GLASS**: GLASS checkbox/focus-ring at the installed 7.0.0 (re-verify after repinning to 10.x) · *glass component* Checkbox · *head* cured-at-HEAD (70dc0f06 outline ring; re-verify)
- **fix shape** Re-capture on glass 10. If it is still faint, route to glass (control-bit focus ring contrast on dark).

#### UIA-V-569 · LOW · tag-edit-popover · The card never shows tag names, only a '+N' count, so the edit's result can't be read

- **source** audit #14 · **verdict** CONFIRMED · **state** closed after edit · **where** /#/browse, after closing
- **frame** `tag-edit-popover/` 1440-light-08-closed-card-reflects.png, 1440-dark-04-tag-added.png
- **observed** After editing, the card shows '+1' or '+2' and no tag names, so the user can't tell which tags were applied.
- **expected + canon** COHESION: the surface you edited shows the result you set.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/card/PaletteCard (tag overflow chip); belongs to the palette-card seat
- **fix shape** Show at least the first tag name as a static Chip before the +N overflow.

#### UIA-V-570 · LOW · tag-edit-popover · Two tag-save verdict paths exist, and neither is where the user acted; the verdict is lost if the popover closes first

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **observed** In frame 390-dark-09 the rail verdict renders under the card behind the popover. The value.js HEAD, not the capture, shows the watch keys on the error string alone, so a second failure with the same message does not re-announce. The original finding already mentions this, but its fix does not address it.
- **owner** **CONSUMER**: CONSUMER demo/palettes/BrowsePane.vue:452-458
- **fix shape** Once the error renders in the popover as role=alert, retire or re-key the pane watch, for example with a failure counter or a verdict token.

#### UIA-V-571 · LOW · tag-edit-popover · The popover has no explicit close or Done control, and saves are silent on success

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **observed** Frames 02 through 07 show only rows, with no footer. The only way out is outside-click or Esc, and a save that succeeds gives no confirmation. At 390, the pinned surface covers the dock controls, so there is no visible way to dismiss it.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/search/TagEditPopover.vue
- **fix shape** If it moves to a Sheet at 390, the Sheet's close covers this. At 1440, if the finding 8 debounce-on-close approach is taken, add a footer with a 'Saved' status.

#### UIA-V-572 · LOW · version-history-drawer · The scroll body cuts hard under the header with no edge fade

- **source** audit #13 · **verdict** CONFIRMED · **state** load more · **where** 24 versions, scrolled
- **frame** `version-history-drawer/` load-more__390__light.png (top row sliced flat at y≈260)
- **observed** The list is a raw `overflow-y-auto scrollbar-thin` div. Scrolled rows are guillotined against the header with no feather.
- **expected + canon** glass FadingScroll (the one scroll-state edge-fade primitive, glass src/components/fading-scroll/README.md) feathers the start edge only past scroll > 0.
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:15)
- **fix shape** Wrap the list in `<FadingScroll axis="y">` at the repin.

#### UIA-V-573 · LOW · version-history-drawer · Row repeats the palette name on every version and shows a raw fork hash

- **source** audit #14 · **verdict** CONFIRMED · **state** open with versions · **where** open with versions
- **frame** `version-history-drawer/` open-versions__1440__light.png ('Harbour Dusk' x2 plus the header; 'Forked from a1b2c3d4...')
- **observed** The comment says 'Name (if different from current)', but the name renders unconditionally, which repeats the header's palette name on every row. The fork line prints an 8-char hash plus '...', which means nothing to a user.
- **expected + canon** The name appears only when it differs (a rename is a meaningful change). Fork provenance names the source palette or is omitted.
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:45-48,66-72)
- **fix shape** Add `v-if="version.name !== paletteName"`. Replace the hash with the source palette name/link, or drop it.

#### UIA-V-574 · LOW · version-history-drawer · One verb carries three labels: 'Versions' / 'Version history' / 'Version History'

- **source** audit #15 · **verdict** CONFIRMED · **state** reach · **where** reach → drawer title
- **frame** `version-history-drawer/` open-versions__1440__light.png (title); card-menu frames under ../palette-card-menu/
- **observed** The card menu says 'Versions (N)', the scene verb says 'Version history', and the drawer title uses Title Case 'Version History', while the sibling dialogs use sentence case ('Delete all saved palettes?').
- **expected + canon** One label and one case across the menu, the verb and the title.
- **owner** **CONSUMER**: CONSUMER (demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:97 · demo/shell/usePaneRouter.ts:959 · VersionHistoryDrawer.vue:9)
- **fix shape** Standardise on 'Version history' (sentence case) in all three sites.

#### UIA-V-575 · LOW · version-history-drawer · The ordinal is reinvented as total - i instead of the server's revisionNo

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `version-history-drawer/` model.ts:143-150 (fold S-6) adds revisionNo as 'the ordinal a client renders', so the client need not 'reinvent the ordinal from a separate count'. The client type omits revisionNo and renders v{{ total - i }}. That label goes wrong if total changes between pages, for example when a revert lands while 'Load older' is paging.
- **observed** model.ts:143-150 (fold S-6) adds revisionNo as 'the ordinal a client renders', so the client need not 'reinvent the ordinal from a separate count'. The client type omits revisionNo and renders v{{ total - i }}. That label goes wrong if total changes between pages, for example when a revert lands while 'Load older' is paging.
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:37 · demo/palettes/types.ts:66-77)
- **fix shape** Add revisionNo (and payloadHash) to PaletteVersion and render v{{ version.revisionNo }}.

#### UIA-V-576 · LOW · version-history-drawer · The Revert pill is a stadium sitting inside an 8px-radius row

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `version-history-drawer/` The manifest gives btn radius 9999px (glass-capsule) inside a row radius of 8px. In row-hover__1440__dark, the stadium sits on a nearly square card, which matches the owner's 'too rounded pills, should be more card like' complaint. The stadium is correct for a single-line control per DESIGN.md:386, so the fix is the row radius and placement, not the pill.
- **observed** The manifest gives btn radius 9999px (glass-capsule) inside a row radius of 8px. In row-hover__1440__dark, the stadium sits on a nearly square card, which matches the owner's 'too rounded pills, should be more card like' complaint. The stadium is correct for a single-line control per DESIGN.md:386, so the fix is the row radius and placement, not the pill.
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:25,75-83)
- **fix shape** Move the action to the header line or an overflow menu, and put the row on rounded-card (see the row-radius and dead-band findings).

#### UIA-V-577 · LOW · version-history-drawer · The same release hash doubles as the v-for key while a revert duplicates payloads

- **source** confirm miss #5 · **verdict** MISSED (confirm seat)
- **frame** `version-history-drawer/` This is harmless now that hash is the release _id, which is unique. But the fix for the current-row finding moves identity to payloadHash, and payloadHash repeats after a revert because two releases can share one payload (model.ts:137-140). So the marking must highlight only the head release that matches, not every row with the same payloadHash.
- **observed** This is harmless now that hash is the release _id, which is unique. But the fix for the current-row finding moves identity to payloadHash, and payloadHash repeats after a revert because two releases can share one payload (model.ts:137-140). So the marking must highlight only the head release that matches, not every row with the same payloadHash.
- **owner** **CONSUMER**: CONSUMER (VersionHistoryDrawer.vue:24)
- **fix shape** When marking current, match payloadHash === currentHash only on the newest row (revisionNo max), or have the envelope carry the head release id.

#### UIA-V-578 · LOW · flag-report-dialog · Radio rows: hand-rolled labels, and 44px hit boxes overlap on a 31px row pitch

- **source** audit #7 · **verdict** AMENDED · **state** open / reason selected · **where** FlagReportDialog.vue:19-25
- **frame** `flag-report-dialog/` 2-reason-selected-390-light.png (metrics: radios 44×44 at y=339/370/401/432)
- **observed** Each option is a div > RadioGroupItem + raw `<label class="text-small">`. The radio hit boxes are 44px tall but the rows are 31px apart, so neighbours overlap by 13px and the later item wins. A tap near the bottom of a row selects the next reason. The glass Label primitive is not used.
- **expected + canon** Whole-row targets with no overlap, built from glass primitives (Label, or LabeledField from glass-ui/src/components/labeled-field).
- **owner** **CONSUMER**: CONSUMER — FlagReportDialog.vue:17-26
- **fix shape** Make each row the label, e.g. `<label class="flex items-center gap-2 min-h-11">` wrapping the item, or use a glass Label with the row gap ≥ the touch target. Retire the raw `<label>`.
- **confirm** The overlap is confirmed (radios 44x44 at y=339/370/401/432, pitch 31). The mechanism is more specific than the audit says. Glass 7 builds the pitch from `gap: calc(var(--radio-seat) - var(--radio-face))` (26px) plus a negative seat margin. The consumer's `class="flex flex-col gap-2"` on RadioGroup (:16) overrides that gap to 8px, and the per-item <div> wrapper takes the rows off the group's flex axis. The consumer override causes the overlap, so the CONSUMER owner is right. Glass HEAD makes the 44px seat in-flow at gap 0 ('GAP 0 IS THE PITCH', radio-group/styles.css). After the repin the overlap goes away even with gap-2, but the raw <label> and the gap override should still go.

#### UIA-V-579 · LOW · flag-report-dialog · Type voice changes along the report flow: mono in the menu and verdict, sans in the dialog

- **source** audit #8 · **verdict** CONFIRMED · **state** menu → open → submitted · **where** PaletteCardMenu.vue:143-150; ActionFeedback verdict
- **frame** `flag-report-dialog/` 0-menu-report-item-1440-light.png, 2-reason-selected-1440-light.png, 3b-submitted-ok-1440-light.png
- **observed** The 'Report' menu item and the 'Reported — thank you.' verdict are set in mono. The dialog between them is Plus Jakarta Sans. One flow switches voice twice.
- **expected + canon** One voice per affordance family across menu, dialog and feedback (cohesion, COHESION §0bl).
- **owner** **CONSUMER**: CONSUMER — demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:143-150 (menu voice) vs FlagReportDialog.vue
- **fix shape** Pick one voice for the palette action family. Most likely the menu and verdict move to the body sans, or the dialog labels adopt the menu voice. Apply it app-wide rather than per surface.

#### UIA-V-580 · LOW · flag-report-dialog · Dead prop `paletteSlug`

- **source** audit #9 · **verdict** CONFIRMED · **state** all · **where** FlagReportDialog.vue:68-72
- **frame** `flag-report-dialog/` n/a (source)
- **observed** The component declares and receives `paletteSlug` but never reads it. The parent reads the slug from its own `flagPalette` ref.
- **expected + canon** No props that go unused.
- **owner** **CONSUMER**: CONSUMER — FlagReportDialog.vue:70 (declared), BrowsePane.vue:175 (passed)
- **fix shape** Drop the prop and its binding at BrowsePane.vue:175.

#### UIA-V-581 · LOW · flag-report-dialog · Glass doc/impl drift: DESIGN.md says dialog radius 16, dialog/styles.css ships the 24px room

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `flag-report-dialog/` glass HEAD 6433284a
- **observed** The audit's finding 5 cites 'room radius 24' as the glass cure, but the design authority's own radius table says 16. Route this to the glass session so DESIGN.md and radius.css can be reconciled with the shipped room radius, since the owner's 'more card-like' ask depends on which one is canonical. glass HEAD 6433284a
- **owner** **GLASS**: GLASS — DESIGN.md:388 (`--radius-dialog` var(--radius-card) 16px 'matches the card — F48') vs src/components/dialog/styles.css `border-radius: var(--radius-3xl)` (the room, 24px), and radius.css:131 still aliases --radius-dialog to card · *glass component* DESIGN.md (src/components/dialog/styles.css) · *head* open-at-HEAD

#### UIA-V-582 · LOW · migrate-palettes-dialog · Dialog title and description type are overridden to display voice at smaller rungs, and the description is muted

- **source** audit #9 · **verdict** CONFIRMED · **where** all open states, light theme most visible
- **frame** `migrate-palettes-dialog/` …/1440-light-02-switch-settled.crop.png, 390-light-02-switch-settled.png
- **observed** The title is forced to `font-display font-medium text-subheading` and the description to `text-small font-display`. The description paints in a muted brown over the glass plate in light theme.
- **expected + canon** glass dialog/styles.css Type block: title is calc(var(--type-body)*1.272) and the description rides --type-body in --foreground ink, because the painted plate measured about 3.3:1 against muted ink. The siblings pass no type classes.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/dialog/MigratePalettesDialog.vue:7-10
- **fix shape** Delete both class overrides and let glass own the pair.

#### UIA-V-583 · LOW · migrate-palettes-dialog · Radius canon contradiction for the dialog: DESIGN.md says --radius-dialog is 16px, while glass HEAD dialog/styles.css paints --radius-3xl (24px, 'room')

- **source** audit #10 · **verdict** AMENDED · **where** all open states
- **frame** `migrate-palettes-dialog/` …/1440-light-02-switch-settled.crop.png (measured 16px on the pinned 7.0.0 plate with the consumer's `rounded-dialog`)
- **observed** The consumer pins 16px through `rounded-dialog`. On repin, glass HEAD's plate is 24px but the consumer override would hold it at 16. The two glass sources disagree about which value is canon.
- **expected + canon** One canon row: the role table and the component partial agree.
- **owner** **GLASS**: GLASS DESIGN.md:388 (`--radius-dialog` = var(--radius-card), 16px) vs src/components/dialog/styles.css:14-19 (`border-radius: var(--radius-3xl)`, room 24px) · *glass component* DESIGN.md (src/components/dialog/styles.css:14-19) · *head* open-at-HEAD
- **fix shape** GLASS: reconcile DESIGN.md:388 with dialog/styles.css (either --radius-dialog becomes 24px 'room', or the partial reads var(--radius-dialog)). CONSUMER: drop `rounded-dialog` so glass owns the value. Relay to the glass session.
- **confirm** Still true at glass HEAD 6433284a, and wider than stated. The 16px side is held by DESIGN.md:388 ('--radius-dialog = var(--radius-card), 16px, matches the card — F48') and also by the token itself at src/styles/theme/radius.css:131 (`--radius-dialog: var(--radius-card)`). Against both, dialog/styles.css paints `border-radius: var(--radius-3xl)` and cites F48 for the opposite value. The fix must reconcile three sites, not two. GLASS owner is correct.

#### UIA-V-584 · LOW · migrate-palettes-dialog · Esc or ✕ cancels the switch silently and throws away the typed slug

- **source** audit #12 · **verdict** AMENDED · **where** after Esc in switch mode
- **frame** `migrate-palettes-dialog/` …/1440-light-08-after-escape.png, 390-light-08-after-escape.png
- **observed** After Esc the dock collapses to the seal, the slug field reads value "", and nothing is switched or published. The user has to re-open the layer and re-type the slug. `pendingMigrateAction` is left set until the next open.
- **expected + canon** Cancel returns the user to where they were: the slug layer open with the typed slug, and the pending action cleared.
- **owner** **CONSUMER**: CONSUMER demo/palettes/useSlugMigration.ts:106-121 (pendingMigrateAction is left pending; the slug-bar value is not restored)
- **fix shape** On dialog close without a response (the `update:open` false path), clear pendingMigrateAction and re-open the slug layer with the typed value, or keep the layer open underneath.
- **confirm** The silent cancel and the leftover pendingMigrateAction are confirmed. The dialog's close path never clears it, and onMigrateRespond is the only site that nulls it (useSlugMigration.ts:157-158). The claim that Esc throws away the slug is refuted as stated: slugInput.value is already "" at 01-switch-open and 02-switch-settled, while the dialog is still open, in both the 1440-light and 390-light logs. The typed slug is cleared on submit, before the dialog opens, not by Esc. The fix is to keep the typed slug until the migration settles, and to restore the slug layer and clear pending on cancel.

#### UIA-V-585 · LOW · migrate-palettes-dialog · The success outcome is invisible too

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `migrate-palettes-dialog/` The publish/transfer tally ('N palettes published') is written only to `identity`, which renders only in ProfileSection.vue:100-107 inside a closed menu. The dialog has closed and the view jumps to palettes, so the user never sees what was published.
- **observed** The publish/transfer tally ('N palettes published') is written only to `identity`, which renders only in ProfileSection.vue:100-107 inside a closed menu. The dialog has closed and the view jumps to palettes, so the user never sees what was published.
- **owner** **CONSUMER**: CONSUMER demo/palettes/useSlugMigration.ts:117-119

#### UIA-V-586 · LOW · migrate-palettes-dialog · The ✕ and Esc leave the migration closure pending, and a later Regenerate can run a stale switch closure

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `migrate-palettes-dialog/` pendingMigrateAction is overwritten on the next open, so the stale closure is harmless unless the dialog's respond fires after a mode change. The v-model close path should null it explicitly (see the Esc finding).
- **observed** pendingMigrateAction is overwritten on the next open, so the stale closure is harmless unless the dialog's respond fires after a mode change. The v-model close path should null it explicitly (see the Esc finding).
- **owner** **CONSUMER**: CONSUMER demo/palettes/useSlugMigration.ts:111-122,144-150

#### UIA-V-587 · LOW · extract-view · Extract's toolbar uses DockControl / DockSeparator circles inside the pane

- **source** audit #11 · **verdict** CONFIRMED · **state** empty and loaded · **where** demo/workbenches/extract/ExtractControls.vue:40-90; ImageEyedropper.vue:11-58
- **frame** `extract-view/` loaded__1440__dark.png, empty__390__light__full.png
- **observed** Upload, Camera and Reset are DockControl dock-icon-buttons (40px, or 44px on touch, radius 9999) scattered across a row with the kC slider between them. Reset sits isolated at the far right. The DockSeparators render no visible rule outside a dock. The eyedropper top bar uses the same DockControls.
- **expected + canon** Glass README: 'DockControl is the button face' of a GlassDock (glass src/components/dock/README.md:21). An in-pane tool row uses glass Button icon-only in one grouped cluster.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Replace these with glass Button icon-only in one group: [upload · camera] on the left and reset beside the slider it resets. Remove the inert DockSeparators.

#### UIA-V-588 · LOW · extract-view · The swatch-pop class stays on after the animation, so a repeat 'Add' likely gives no feedback

- **source** audit #12 · **verdict** CONFIRMED · **state** pinned → Add to palette → later · **where** demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:18-23, :213-225, :305-318
- **frame** `extract-view/` swatchpop__1440__dark.png, afteradd__1440__light.png, zoom__1440__light.png
- **observed** .swatch-pulse is still on the sampled swatch 1.2s after the add, and still there after Escape and zoom (capture-flow-log-1440__light.json: afteradd, zoom). The animationend reset did not clear it, so toggling swatchPulse to true again cannot restart the pop. The replay probe did not run. The only confirmation of an add is the far pane's 'Current Palette · 1 color'.
- **expected + canon** Each add gives feedback, and the pop replays on every add.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Reset swatchPulse on a timer or use key-bump remounting instead of relying on animationend from WatercolorDot. Move swatch-pop to the global animations.css keyframes, tokenised (moved, not removed).

#### UIA-V-589 · LOW · extract-view · The eyedropper loupe and action hover use literal shadow and scale values

- **source** audit #13 · **verdict** AMENDED · **state** loupe / pinned · **where** demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:283-303
- **frame** `extract-view/` loupe__1440__light.png, pinned__1440__dark.png
- **observed** The loupe border and shadows are hand-mixed color-mix literals (2px border, 0 4px 16px 15%, 0 0 0 1px 30%). Action icons scale(1.2) on hover.
- **expected + canon** Tokens, not literals: glass --shadow-* and the focus/selected ring token for the pinned ring, per the DESIGN.md token doctrine.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Map these to --shadow-md and --focus-ring-shadow (pinned), and remove the hover scale in favour of the DockControl or Button hover state.
- **confirm** Literals are CONFIRMED at ImageEyedropper.vue:285-286, :295 (color-mix border and shadows) and :301 (scale(1.2), beside the glass --scale-hover 1.08 token). The copy is CONFIRMED at :36 ('Tap to sample', eyedropper__1440__light.png). Amendment to the readout finding: it truncates at 1440 as well ('oklch(78.23% 0.0833 160.1d…' in pinned__1440__dark.png), not only at 390, so the fix is a separate readout row at every width.

#### UIA-V-590 · LOW · extract-view · k=12 returns 9 colours without explanation

- **source** audit #15 · **verdict** AMENDED · **state** k slider → 12 · **where** demo/workbenches/extract/ExtractControls.vue:15-17 (label); useExtractSession quantize merge
- **frame** `extract-view/` k12__1440__light__full.png, k12__390__light__full.png
- **observed** The slider reads '12' and the card badge reads '9'. Near-duplicate clusters were merged silently.
- **expected + canon** The instrument says why its output differs from its setting, for example 'max 12 · 9 distinct'.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Label the slider as a maximum ('up to 12'), or caption the card '9 distinct'.
- **confirm** True in the frame (k12__1440__light__full.png: slider '12', badge '9'), but already addressed in source after capture. d106f3be (12:54) added kReadout, whose text and title give found/requested (ExtractControls.vue:13-21, EC-9 'never a lying readout'). A re-capture at HEAD is needed to close it.

#### UIA-V-591 · LOW · extract-view · Small source images upscale blurry in the drop zone and the eyedropper fit

- **source** audit #16 · **verdict** AMENDED · **state** image loaded, eyedropper · **where** demo/workbenches/extract/ImageDropZone.vue:37-43 (img object-contain); ImageEyedropper canvas
- **frame** `extract-view/` loaded__1440__dark.png, eyedropper__1440__light.png
- **observed** The 6.5 KB cube.png is upscaled with smoothing, so the specimen the user samples from is visibly blurred, while the loupe shows hard pixels.
- **expected + canon** The specimen never lies (the ImageDropZone.vue:3-5 contract): pixelated rendering above 1×, or no upscale beyond natural size.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Apply image-rendering: pixelated when the displayed scale is above 1, or cap the preview at natural size.
- **confirm** The drop-zone half is CONFIRMED: loaded__1440__dark.png shows the cube heavily blurred, and ImageDropZone.vue:37-43 uses img object-contain with no image-rendering. The eyedropper half is stale. The 1440 frames predate 26836da6 (12:46, the visible canvas is the sampled canvas), which removed the offscreen twin, and the pinned frames already show hard pixel edges on the fitted cube. Re-measure the eyedropper at HEAD.

#### UIA-V-592 · LOW · extract-view · Sibling pane headers disagree: 'My Palettes' two-tone in light, 'Extract' monochrome

- **source** audit #17 · **verdict** CONFIRMED · **state** all, light theme · **where** demo/workbenches/extract/ExtractPane.vue:7 (PaneHeader) vs the palettes pane header
- **frame** `extract-view/` empty__1440__light.png, empty__1440__dark.png
- **observed** In light, the right pane's 'Palettes' word is accent-gradient inked while 'Extract' is plain. In dark, both are plain.
- **expected + canon** One PaneHeader grammar across sibling panes and both themes.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Pick one PaneHeader treatment and apply it everywhere, in both schemes.

#### UIA-V-593 · LOW · extract-view · My Palettes shows two empty-state affordances, plus dead height

- **source** confirm miss #3 · **verdict** MISSED (confirm seat) · **where** palettes pane (My Palettes)
- **frame** `extract-view/` loaded__1440__light.png, eyedropper__1440__light.png
- **observed** A dashed 'Start a new palette' card and a separate 'No saved palettes yet / Add colors, then save.' ghost cluster stack in one pane. The pane also stretches to the Extract column's height and leaves about 350px of empty ground. palettes pane (My Palettes)
- **owner** **CONSUMER**: CONSUMER

#### UIA-V-594 · LOW · extract-view · The two thumbs render in different inks across themes

- **source** confirm miss #5 · **verdict** MISSED (confirm seat) · **where** ExtractControls.vue trackInk + glass slider thumb
- **frame** `extract-view/` loaded__1440__light.png vs loaded__1440__dark.png
- **observed** In light the thumbs are white-outlined and nearly invisible on the magenta kC track and the pastel k track. In dark they are black-outlined bars on the white slabs. There is no consistent handle ink across states. ExtractControls.vue trackInk + glass slider thumb
- **owner** **GLASS+CONSUMER**: CONSUMER (track ink) / GLASS 7.0.0 thumb (repin) · *glass component* Slider thumb ink · *head* open-at-HEAD

#### UIA-V-595 · LOW · mix-view · The '.dashed-well' is a recessed well that also wears a cartoon drop shadow, so it reads as raised

- **source** audit #15 · **verdict** CONFIRMED · **state** Colors tab sources well
- **frame** `mix-view/` 1440-light-colors-01-colors-empty.png, 390-light-palettes-12-palettes.png (no well) vs the Colors frames
- **observed** The 'Selected' well has a dashed edge, a tone-step fill and a dark offset shadow (measured -2px 2px). It looks like a lifted card rather than a recess to drop into, and conflicts with the WELL rung's 'opaque tone-step' definition (demo/DESIGN.md:104).
- **expected + canon** A well reads as recessed: an inset edge or no elevation. The dashed edge already carries the in-progress semantics.
- **owner** **CONSUMER**: CONSUMER — demo/styles/utils.css:90-107 (`box-shadow: var(--shadow-cartoon-sm)` on the WELL rung)
- **fix shape** Drop the cartoon shadow from .dashed-well, or replace it with an inset hairline.

#### UIA-V-596 · LOW · mix-view · Condensed dock dot rides off the top of the viewport when the Mix pane grows the page

- **source** audit #16 · **verdict** CONFIRMED · **state** Result (palette), 1440 light and dark
- **frame** `mix-view/` 1440-light-palettes-17-result-palette.png, 1440-dark-palettes-17-result-palette.png
- **observed** After the page scrolls about 80px, the condensed dock blob is cut in half at y=0.
- **expected + canon** The dock stays fully on screen (it is sticky or fixed chrome).
- **owner** **CONSUMER**: CONSUMER — shell/dock (cross-reference the dock-main seat); triggered by the unbounded Mix pane
- **fix shape** Fix it in the pane-bounding item above. If the page can still scroll, pin the condensed dock at the --dock-inset.

#### UIA-V-597 · LOW · mix-view · The last selected color can never be removed (MIN_COLORS = 1)

- **source** audit #17 · **verdict** CONFIRMED · **state** Colors chosen (unreachable today; judged from source)
- **frame** `mix-view/` n/a: the state cannot be reached because of the BROKEN finding; source-read only
- **observed** canRemoveColor requires length > 1, so the remove button is disabled on a lone chip. The user can only clear through the dock's Clear.
- **expected + canon** Any chip can be removed, so the empty state is reachable in place.
- **owner** **CONSUMER**: CONSUMER — demo/workbenches/mix/MixSourceSelector.vue:38-40, 185
- **fix shape** Set MIN_COLORS to 0, or drop the guard, since canMix already gates the verb.

#### UIA-V-598 · LOW · mix-view · The dashed-well's cartoon shadow disappears in dark mode, so the well's elevation reads differently per theme

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `mix-view/` 1440-light-colors-02-tab-focus.png vs 1440-dark-colors-01-colors-empty.png
- **observed** In light mode the well is visibly raised; in dark mode it is flat. That is one more reason to drop the shadow and use an inset hairline.
- **owner** **CONSUMER**: CONSUMER — demo/styles/utils.css:106 (--shadow-cartoon-sm dark value)

#### UIA-V-599 · LOW · generate-view · Count slider track is a hand-rolled absolute gradient div under a transparent glass Slider track

- **source** audit #10 · **verdict** CONFIRMED · **state** default
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/1440-light-01b-card.png
- **observed** The code uses <div class="absolute inset-0 rounded-full overflow-hidden h-6" :style=background> plus <Slider variant=spectrum :style="{'--slider-track-bg':'transparent'}">. That is two layers and a literal rounded-full for what the Slider's own --slider-track-bg seam already carries.
- **expected + canon** GLASS IDIOM: tokens and primitive seams, not overlay divs. The Slider already exposes --slider-track-bg.
- **owner** **CONSUMER**: CONSUMER (demo/workbenches/generate/GenerateControls.vue:297-312)
- **fix shape** Bind '--slider-track-bg': countSliderGradient directly on the Slider and delete the overlay div. Shared with the extract k-slider, so cure both.

#### UIA-V-600 · LOW · generate-view · The plate name is a hand-rolled bare <input>: no resting affordance on touch, and its own ring instead of the shared focus-ring

- **source** audit #11 · **verdict** CONFIRMED · **state** default, hover, focus
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/1440-light-02c-name-hover.png ; probe-log.json 1440-dark focusTour[8] (Palette name: ring transparent, outline none)
- **observed** The editability cue is a dashed underline shown on :hover only, so a touch user never sees it. The focus style is a local focus-visible:ring-2 ring-ring/40 on a 4px rounded-sm box. Every other control on the plate wears the shared .focus-ring class. The Tab tour read the input's box-shadow as transparent.
- **expected + canon** STATES: consistent focus and editable affordance. The palette-card rename uses the card family's inline-edit idiom (palettes-view).
- **owner** **CONSUMER**: CONSUMER (demo/workbenches/generate/GenerateControls.vue:151-156)
- **fix shape** Reuse the palette-card inline-rename component (or a glass InlineEdit, if one exists), apply .focus-ring, and show a resting dashed underline or pencil glyph.

#### UIA-V-601 · LOW · generate-view · Select popups are item-aligned and cover their own field label and the plate; only 5 of 10 presets are visible at 390

- **source** audit #12 · **verdict** AMENDED · **state** select open
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/390-light-07-preset-open.png ; 1440-dark-08-harmony-open.png
- **observed** The list positions the selected item over the trigger. At 390 it rises to y=94 and covers the Generate header and plate. At 1440 the Harmony list covers the 'Harmony' label. At 390 only Vibrant through Earth are in view, and Neon to Random need the scroll chevron. The rows themselves are well built (Fraunces name, seed-exact PreviewStrip chip, micro description), on panel 12px / row 8px.
- **expected + canon** The popup opens adjacent to the trigger and never covers the field it labels (STATES: open state legible in context).
- **owner** **GLASS**: GLASS (Select: SelectContent default position; DESIGN.md radius table :387 card/popover) — consumer may pass position="popper" at GenerateControls.vue:235,268 · *glass component* SelectContent (GenerateControls.vue:235,268) · *head* open-at-HEAD
- **fix shape** Use position="popper" with side="bottom" and collision flip on these two Selects, or make popper the glass default for SelectContent in labelled-field contexts (route to the glass session).
- **confirm** The mechanism is wrong. Glass forces popper: HEAD src/components/select/SelectContent.vue:48-56 spreads position:'popper', avoidCollisions:true and collisionPadding:16 LAST, and the 7.0.0 dist select-*.js:176-179 strips any consumer position. The consumer therefore CANNOT pass position='popper', because it already is popper. The frames show a collision FLIP to side=top: the full-height list (6 or 10 rows, each two-line) will not fit below the trigger. In 1440-dark-08-harmony-open.png it opens above and covers the 'Harmony' label and half the plate. In 390-light-07-preset-open.png it rises over the header and plate and shows 5 of 10 items. The owner is GLASS: cap the content at the available height (e.g. --reka-select-content-available-height) so it stays on the preferred bottom side and scrolls, rather than flipping over the field's own label. The consumer-side 'fix' in the original finding is void.

#### UIA-V-602 · LOW · generate-view · No primary verb in the plate: the inline Regenerate renders at the default secondary emphasis

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `generate-view/` docs/tranches/X/audit/ui-evidence/value/generate-view/1440-dark-01b-card.png
- **observed** The comment claims a 'deliberate-primary register', but no emphasis='primary' is passed, so all three verbs read at the same weight.
- **owner** **CONSUMER**: CONSUMER (GenerateControls.vue:164-171)

#### UIA-V-603 · LOW · generate-view · The glass HEAD upgrade path removes seams this page depends on

- **source** confirm miss #5 · **verdict** MISSED (confirm seat)
- **frame** `generate-view/` source only
- **observed** glass HEAD has no watercolor-dot component and no --slider-track-bg reference. Any cure written against 7.0.0 names (findings 1 and 10) will need rework at the glass pin bump.
- **owner** **CONSUMER**: CONSUMER (upgrade planning)

#### UIA-V-604 · LOW · gradient-view · Render tile uses the card radius instead of the media radius

- **source** audit #16 · **verdict** CONFIRMED · **state** default · **where** gradient-view · default · all
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-01-default.png
- **observed** The 96x134 preview tile is at 16px (--radius-card), the same as the pane card around it.
- **expected + canon** A media tile takes --radius-media (10px), DESIGN.md:384; the card radius is for content cards.
- **owner** **CONSUMER**: CONSUMER demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:257 (rounded-card, measured 16px)
- **fix shape** Use rounded-media (and revisit as part of the hero-preview reshaping).

#### UIA-V-605 · LOW · gradient-view · Easing row 1 is open by default

- **source** audit #17 · **verdict** CONFIRMED · **state** default (spec: easing rows closed) · **where** gradient-view · default · all
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-01c-card-bottom.png
- **observed** On load the first interval is expanded (ramp strip, specimen strip, readout rail), adding about 150px and pushing the CSS output below the fold.
- **expected + canon** The seat's state list says the easing rows start closed. A closed summary row keeps the default view compact.
- **owner** **CONSUMER**: CONSUMER demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue:66 (openInterval = ref<number\|null>(0))
- **fix shape** Initialise openInterval to null (or move the editor to its own pane per the cohesion finding).

#### UIA-V-606 · LOW · gradient-view · Pane loading plate has no timeout or retry: 'Loading the scene…' stayed up more than 10 minutes

- **source** audit #18 · **verdict** AMENDED · **state** loading · **where** gradient-view · cold load under a stalled dev server · 390 light (first run)
- **frame** `gradient-view/` not kept: the first-run 390-light frames were overwritten by the successful rerun. Observation is recorded in this finding (the plate stayed for the whole 600s wait plus a 600s reload).
- **observed** While :9000 was saturated, the gradient pane chunk never resolved and never rejected. The loading plate showed indefinitely with no error plate or retry. The cause is environmental, but the state has no way out.
- **expected + canon** The loading state ends in an error plate with a retry after a bounded wait (the P-3 contract already has PaneErrorPlate).
- **owner** **CONSUMER**: CONSUMER demo/shell/usePaneRouter.ts:266-280 (defineAsyncComponent with loadingComponent/errorComponent/delay but no `timeout`)
- **fix shape** Pass timeout (e.g. 15000 ms) to defineAsyncComponent so a stalled chunk reaches PaneErrorPlate, which offers Retry.
- **confirm** The missing timeout is a documented, deliberate ruling, not an oversight. usePaneRouter.ts:220-222 says: 'No `timeout`: a slow network is not a failure, and a timed-out chunk that arrives later would be shown an error plate it had already outrun'. There is also no frame (the audit says it was overwritten). Record this as a policy challenge to that ruling, with no frame evidence, not as a defect. Suggested alternative: a non-terminal 'still loading… Retry' affordance after N seconds, which answers the ruling's objection. LOW, CONSUMER.

#### UIA-V-607 · LOW · gradient-view · Empty-state inspector shows a blank bordered Position box beside a '%' glyph

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/390-dark-01-default.png
- **observed** The disabled empty field and the orphan '%' read like a broken control at 390. It should be hidden until a stop is selected.
- **owner** **CONSUMER**: CONSUMER GradientStopEditor.vue:714-727

#### UIA-V-608 · LOW · gradient-view · Easing well corner radius nests a card radius inside a card-radius row

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `gradient-view/` /Users/mkbabb/Programming/value.js/docs/tranches/X/audit/ui-evidence/value/gradient-view/1440-light-04d-easing-row-with-stage.png
- **observed** The PRESET Select stadium sits flush under a square-ish well inside a rounded row. That makes three radius registers stacked, the owner's 'cluttered' complaint. This goes away if the Easing pane move is done.
- **owner** **CONSUMER**: CONSUMER EasingAuthoringStage.vue (:deep(.glass-card) border-radius override)

#### UIA-V-609 · LOW · gradient-easing-authoring · Strip type is 9px literals below the glass type scale; family eyebrows at 0.75 opacity

- **source** audit #14 · **verdict** CONFIRMED · **state** row open (strip) · **where** demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:150-157 (.family-eyebrow font-size 0.5625rem, opacity .75), :206-213 (.tile-label 0.5625rem)
- **frame** `gradient-easing-authoring/` 1440-light-01-row-open-el.png, 390-light-01-row-open-el.png
- **observed** The family eyebrows (css, sine, back, steps) and the tile labels measure 9px Fira Code, and the eyebrows are further faded. They are the smallest text on the page.
- **expected + canon** Tokens, not literals: glass .text-micro / .text-mono-caption / .section-label (DESIGN.md:894-897).
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Use text-micro for the labels and section-label (or text-mono-caption) for the eyebrows, with no opacity dimming.

#### UIA-V-610 · LOW · gradient-easing-authoring · The pressed 'linear' tile's glyph draws across its own label

- **source** audit #15 · **verdict** CONFIRMED · **state** row open, linear selected · **where** demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:188-192 (overflow: visible) + :217-220 (pressed stroke 1.75)
- **frame** `gradient-easing-authoring/` 1440-dark-01-row-open-el.png, 1440-light-01-row-open-el.png
- **observed** The diagonal of the linear portrait runs from the chip's lower-left through the 'linear' label text, most visibly in dark.
- **expected + canon** The portrait and the label occupy separate bands of the tile.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** This is resolved by the cell-shaped tile (portrait band over label band). Otherwise, clip the portrait to its box except for overshoot families.

#### UIA-V-611 · LOW · gradient-easing-authoring · The same curve has two names: head says 'linear', readout says cubic-bezier(0, 0, 1, 1)

- **source** audit #16 · **verdict** CONFIRMED · **state** row open, linear · **where** demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue.ts:106-127 (bezierTile css = bezierLiteral(points))
- **frame** `gradient-easing-authoring/` 1440-light-01-row-open-el.png
- **observed** The keyword curves (linear, ease, ease-in, …) are exported as their bezier quads, while the head and tile show the keyword.
- **expected + canon** The one literal matches the named identity; CSS keywords export as keywords.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Emit the CSS keyword literal for the five css-family tiles and keep the quad in points.

#### UIA-V-612 · LOW · gradient-easing-authoring · At 1440 the preset Select trigger is wider than its well

- **source** confirm miss #3 · **verdict** MISSED (confirm seat) · **where** log-main.json 1440 authoring: preset-trigger 447px wide vs picker-card0 440px
- **frame** `gradient-easing-authoring/` 1440-light-06-authoring-bezier.png: the trigger's pill edge sits proud of the well edges
- **observed** 1440-light-06-authoring-bezier.png: the trigger's pill edge sits proud of the well edges log-main.json 1440 authoring: preset-trigger 447px wide vs picker-card0 440px The control breaks its container's edge, which is likely a side effect of the :deep one-column grid override.
- **owner** **GLASS+CONSUMER**: CONSUMER (Law 1 one-column override) or GLASS · *glass component* SelectTrigger width inside a well · *head* open-at-HEAD

#### UIA-V-613 · LOW · atmosphere-view · Trigger hover and slider-thumb focus are near-invisible

- **source** audit #15 · **verdict** CONFIRMED · **state** hover, keyboard focus · **where** /#/atmosphere
- **frame** `atmosphere-view/` 1440-light-02a-trigger-hover.png vs 1440-light-01b-card.png (no perceptible change); 1440-light-05a-slider-focus-energy-max.png (a faint pink hairline on a 12 px thumb)
- **observed** Trigger hover is indistinguishable from rest. Keyboard focus on a slider thumb is a thin low-contrast outline on a 12×24 thumb over a dark slab. (Trigger focus is fine: a 2 px accent ring.)
- **expected + canon** A visible hover lift and a ≥3:1 focus indicator (WCAG 2.4.11).
- **owner** **GLASS**: GLASS — glass-capsule-hover on SelectTrigger (control-surface) and the Slider thumb focus ring · *glass component* SelectTrigger · *head* open-at-HEAD
- **fix shape** Glass: raise the hover wash delta on control-surface over tinted plates, and use the focus-ring token at full weight on slider thumbs.

#### UIA-V-614 · LOW · atmosphere-view · Harmony's 'Colour' vs 'color' spelling and the 'Vangogh' label

- **source** audit #17 · **verdict** AMENDED · **state** default, medium open · **where** /#/atmosphere
- **frame** `atmosphere-view/` 1440-light-01-default.png, 1440-light-03c-select-medium-open.png
- **observed** British and US spellings mix on one pane, and the painter's name is mangled.
- **expected + canon** One locale for copy; proper names correct ('Van Gogh').
- **owner** **CONSUMER**: CONSUMER — AuroraPane.vue:106 ('Colour Energy'), :199 description 'picked color', :63 plus label() at :68-73 (splits only on '-', so 'vangogh' renders as 'Vangogh')
- **fix shape** Standardise on 'Color' and add a label map for 'vangogh' → 'Van Gogh'.
- **confirm** Confirmed, but the lines are wrong. 'Colour Energy' is at AuroraPane.vue:107 (not :106). 'picked color' is the description prop at :121 (not :199). label() is at :71-76 and 'vangogh' is at :66.

#### UIA-V-615 · LOW · atmosphere-view · Console well radius 12 px inside a 16 px card at a 24 px inset breaks the concentric rule

- **source** audit #18 · **verdict** CONFIRMED · **state** default · **where** /#/atmosphere Field well
- **frame** `atmosphere-view/` 1440-light-01b-card.png
- **observed** Card 16 px (--radius-card), well 12 px at a 24 px inset. The nested corner reads rounder than its container allows.
- **expected + canon** glass DESIGN.md radius context relay: a nested card-class surface = max(--radius-floor, --radius-ctx − --radius-inset), so 4 px here, or --radius-panel only when flush.
- **owner** **CONSUMER**: CONSUMER — ConfigSliderPane.vue:122 (.console-well) inside the rounded-card Card
- **fix shape** Have the well consume the --radius-ctx/--radius-inset relay (or the Configurator layer's own radius) instead of a fixed panel rung. This matters most if the well survives the ConfiguratorLayer move.

#### UIA-V-616 · LOW · atmosphere-view · Lazy pane load has no timeout, so a stalled chunk leaves 'Loading the scene…' forever

- **source** audit #19 · **verdict** CONFIRMED · **state** loading · **where** /#/atmosphere cold load, 390
- **frame** `atmosphere-view/` probe-type-fail-390.png
- **observed** Under host load (load average ~100) the plate stayed more than 150 s with no error or retry, and PaneErrorPlate never showed. The plate also sits vertically centred while the loaded pane anchors at the top, so the layout jumps on resolve. PLAUSIBLE: the trigger was environmental, the missing timeout is structural.
- **expected + canon** Loading → error/retry within a bounded time; the loading plate occupies the loaded pane's slot.
- **owner** **CONSUMER**: CONSUMER — demo/shell/usePaneRouter.ts:269-282 (defineAsyncComponent with errorComponent but no `timeout`)
- **fix shape** Pass a `timeout` (e.g. 20 s) so PaneErrorPlate and retry appear, and top-anchor the loading plate to the pane's resting position.

#### UIA-V-617 · LOW · atmosphere-view · Zones thumb overhangs the track end at max value

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `atmosphere-view/` 390-light-01c-fullpage.png (the Zones=6 thumb extends past the rounded right end of the track)
- **observed** At max, the thumb is not inset within the track, so it sits half outside the slab's stadium end.
- **owner** **CONSUMER**: CONSUMER (the spectrum variant on a scalar knob; subsumed by the slider finding)
- **fix shape** This goes away with the default Slider variant. Otherwise inset the thumb travel by half the thumb width.

#### UIA-V-618 · LOW · atmosphere-view · The dark-theme footer buttons render correctly, so the fill misregistration is theme-dependent

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `atmosphere-view/` 1440-dark-03a2-harmony-kbd-hover.png vs 1440-light-01-default.png and 390-light-01c-fullpage.png
- **observed** The relay repro must name light theme. The dark theme's secondary buttons show an outlined capsule with no inner lozenge.
- **owner** **GLASS**: GLASS (glass-wash light-theme inset) · *glass component* glass-wash · *head* open-at-HEAD
- **fix shape** Include the theme in the glass relay repro.

#### UIA-V-619 · LOW · blob-view · Section titles and row labels are the same size; the header dwarfs a pane of tiny controls

- **source** audit #10 · **verdict** CONFIRMED · **state** default
- **frame** `blob-view/` 1440-light-01-default.png; 1440-light-metrics.json (headerTitle 41.9px Fraunces, sectionTitles 16.4px, row labels 16.4px)
- **observed** The scale steps are 41.9px (H2) → 16.4px (section) → 16.4px (label) → about 11px (value). The section and label tiers collapse into one size, told apart only by case and colour.
- **expected + canon** Each hierarchy tier takes a distinct type-scale step (ConfiguratorLayer mints --configurator-section-size and -weight for exactly this).
- **owner** **CONSUMER**: CONSUMER — demo/scenes/ConfigSliderPane.vue:227-233 (.config-section-title font-size var(--type-small) resolves 16.4px = row label size)
- **fix shape** Adopting ConfiguratorLayer fixes this. Otherwise set the section label one step smaller or heavier than the row label.

#### UIA-V-620 · LOW · blob-view · No in-scene route back to Home

- **source** audit #13 · **verdict** CONFIRMED (LOW) · **state** Home
- **frame** `blob-view/` 1440-light-01-default.png (dock: view select, Tools, Login, @mbabb), probe-reset.json (Select view unreachable while the dock is collapsed)
- **observed** The listed 'Home' state has no affordance inside the scene. Home is reachable only through the dock's view select, which is missing whenever the dock has collapsed to its orb (see the previous finding). My scripted 'Home' locator hit the spectrum instead (aria-label contains 'picker') and changed the colour, and the route stayed #/blob.
- **expected + canon** The way back to Home is discoverable and does not depend on the dock's condense state, consistent with sibling admin scenes.
- **owner** **CONSUMER**: CONSUMER — demo/shell/viewSchema.ts:218-225 / dock admin list (useDockAdminMode.ts:27)
- **fix shape** Keep the view select reachable (fix the dock re-expand). Optionally put a back-to-Home action in the pane header for admin-listed scenes.
- **confirm** 01-default's dock offers only the view select, Tools, Login and @mbabb, and nothing in the pane leads Home. The select disappears whenever the dock is in its orb state (11-after-reset). The finding depends on the dock-collapse defect. Owner CONSUMER.

#### UIA-V-621 · LOW · blob-view · Dock shows 'Login' and '@mbabb' side by side

- **source** confirm miss #3 · **verdict** MISSED (confirm seat) · **severity note** LOW (PLAUSIBLE)
- **frame** `blob-view/` 1440-light-01-default.png dock: a Login button in accent mono sits next to an '@mbabb' handle pill. Either a signed-out state renders a user handle, or an author credit is styled as an account chip. Both read as a contradictory auth state. The two items also use different type treatments from the dock's serif Tools label.
- **observed** 1440-light-01-default.png dock: a Login button in accent mono sits next to an '@mbabb' handle pill. Either a signed-out state renders a user handle, or an author credit is styled as an account chip. Both read as a contradictory auth state. The two items also use different type treatments from the dock's serif Tools label.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock (auth section)

#### UIA-V-622 · LOW · admin-users · Confirm dialogs: the palette delete names the slug, the counts are missing, and one icon is wrong

- **source** audit #16 · **verdict** CONFIRMED · **state** dialog open · **where** admin-users · row confirm dialogs, prune confirm
- **frame** `admin-users/` 1440-light-16-row-confirm-delete-palette.png, 1440-light-15-row-confirm-delete-palettes.png, 1440-light-03-prune-confirm.png
- **observed** 'Delete palette?' quotes `harbor-dusk-x1`, but the list shows 'Harbor Dusk'. Every dialog appends 'and all associated data', which is vague for a palette and ambiguous for 'delete all palettes' (does it delete the user too?). 'Delete all palettes?' does not say how many (7). The Prune confirm button uses Trash2, while its trigger uses Eraser.
- **expected + canon** A destructive confirm names the object as the user saw it and quantifies the effect.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:376-410 (confirm payloads), :224 (shared suffix), :320 (default Trash2 icon for Prune)
- **fix shape** Pass the display name for palettes and the count for the bulk delete ('Delete 7 palettes by …'). Drop the generic suffix. Pass icon: Eraser for Prune.

#### UIA-V-623 · LOW · admin-users · Translucent glass confirm dialog lets saturated palette strips bleed through its text

- **source** audit #17 · **verdict** CONFIRMED · **state** dialog open · **where** admin-users · expanded row + any confirm
- **frame** `admin-users/` 1440-light-15-row-confirm-delete-palettes.png, 1440-light-16-row-confirm-delete-palette.png, 390-light-16-row-confirm-delete-palette.png
- **observed** Blurred blue, yellow, and orange strip blotches show behind the description and footer of the destructive confirm, which lowers legibility where it matters most.
- **expected + canon** Floating chrome over busy content should read cleanly (demo/DESIGN.md:105 CHROME rung).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:213 (`DialogContent surface="glass"`)
- **fix shape** Use the opaque/overlay rung for destructive alert dialogs (surface="floating" or the overlay tier). If glass lacks an alert-dialog default, route that as a separate glass ask.

#### UIA-V-624 · LOW · admin-users · Loading drops the toolbar context, and Prune stays enabled while loading

- **source** audit #20 · **verdict** CONFIRMED · **state** loading · **where** admin-users · refresh / initial loading
- **frame** `admin-users/` 1440-light-05-refresh-loading-skeleton.png, 390-dark-18-loading-skeleton.png
- **observed** During a refresh the count line and header badge disappear and the list becomes 3 generic skeleton rows. Prune empty stays enabled (its disabled binding ignores `loading`), so its confirm would quote the previous roster's count.
- **expected + canon** Loading keeps its context. Commands that depend on the roster wait for it.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:8-13,19,63-65
- **fix shape** Keep the previous rows visible and dimmed with an in-place busy mark during refresh (glass Button `loading` on Refresh). Add `\|\| loading` to Prune's disabled binding.

#### UIA-V-625 · LOW · admin-users · The always-mounted empty live region doubles the gap between the toolbar and the list

- **source** audit #21 · **verdict** CONFIRMED · **state** rest · **where** admin-users · rest
- **frame** `admin-users/` 1440-light-00-roster-local.png (toolbar bottom y=295 → first row y=319: 24px vs the 12px rhythm)
- **observed** The empty aria-live div is a zero-height grid item, so it still takes a gap-3 on each side.
- **expected + canon** One spacing rung between siblings.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:40-50 inside `grid gap-3` (:2)
- **fix shape** Take the live region out of flow (absolute/sr-only wrapper) or collapse it with `empty:hidden`. Keep it mounted for the announcement.

#### UIA-V-626 · LOW · admin-users · Mutation feedback is a hand-rolled chip, not a glass Alert or Toast (not captured)

- **source** audit #22 · **verdict** CONFIRMED · **state** notice · **where** admin-users · after any mutation
- **frame** `admin-users/` not captured (notice.mjs timed out on the saturated :9000 server); code-read only
- **observed** feedback-chip: rounded-panel, raw green-500/destructive tints, fira-code text. glass-ui 7 ships alert and toast primitives.
- **expected + canon** Glass idiom: every surface is a glass primitive (seat criterion 3).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/card/PaletteCard/ActionFeedback.vue:3-17 (used at AdminUsersPanel.vue:41-49)
- **fix shape** Replace it with a glass Alert (inline, in the same live region) or a Toast. Keep the one-verdict/live-region contract.

#### UIA-V-627 · LOW · admin-users · Dock collapses to an orb whenever a menu or dialog opens and stays collapsed afterwards (cross-seat)

- **source** audit #23 · **verdict** AMENDED · **state** overlay open/closed · **where** admin-users · after sort menu / confirm dialog
- **frame** `admin-users/` 1440-light-02-sort-menu-open.png, 1440-light-03-prune-confirm.png, 1440-light-06-refresh-settled.png (still an orb after the dialog closed)
- **observed** The dock shrinks to a pink orb when any overlay opens and was still collapsed after the overlays closed and the roster refreshed. With the dock collapsed, the admin view title and mode pill are gone.
- **expected + canon** The chrome returns to rest after the overlay closes.
- **owner** **CONSUMER**: CONSUMER dock (demo/shell/dock/*; not traced in this seat — route to dock-main seat)
- **fix shape** Hand this to the dock seat to confirm whether the collapse-on-overlay is intended. If it is, restore the dock on overlay close.
- **confirm** At 1440 the orb persists after the first overlay. In the 1440-dark run order (10…17 then 02, 03, 04, 01, 18, 07, 09), the dock is full through 14, an orb from 15/16 onward, and still an orb in 02/18/09 (1440-dark-02 and 1440-dark-18 show the orb with no overlay open). At 390 the dock never became an orb: 390-light-02 (menu open, after 15/16 in run order) still shows the compact shield+⋮ dock. So the claim is 1440-only, and 'whenever a menu opens' is too strong; the observed trigger is the first dialog. It stays a route to the dock seat.

#### UIA-V-628 · LOW · admin-users · Admin load-error detail says 'Backend unreachable — working locally.'

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `admin-users/` 1440-light-09-load-error.png
- **observed** 'Working locally' is the palette-editor offline register. The admin roster has no local mode, so the detail promises a fallback that does not exist. The top-right 'BACKEND OFFLINE — SAVED LOCALLY' chip repeats the same register.
- **owner** **CONSUMER**: CONSUMER copy (usersLoadError message source via the transport's ApiUnavailableError text) surfaced at AdminUsersPanel.vue:68-73
- **fix shape** Map ApiUnavailableError to admin-specific copy ('The server is unreachable. The roster can't be read offline.').

#### UIA-V-629 · LOW · admin-users · Confirm dialog Cancel renders in crimson accent ink beside the red destructive button

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `admin-users/` 1440-light-03-prune-confirm.png, 1440-light-16-row-confirm-delete-palette.png
- **observed** In light, 'Cancel' is crimson text right next to the red 'Prune'/'Delete palette' fill. Both actions read as red, and the safe exit looks alarming.
- **owner** **CONSUMER**: CONSUMER accent (safeAccent crimson) through glass Button emphasis="text" at AdminUsersPanel.vue:228
- **fix shape** Give Cancel neutral ink (tone="neutral" / foreground) in destructive confirms. If the text emphasis always takes accent ink, route a glass ask for a neutral text button inside destructive dialogs.

#### UIA-V-630 · LOW · admin-users · Palette-row Feature/Delete buttons pass no emphasis, so they rest as filled capsules

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `admin-users/` 1440-light-14-expanded-palettes.png
- **observed** The per-palette Unfeature/Feature and trash controls rest as secondary glass capsules, italic serif. The trash has hover-destructive classes but no quiet base, so each specimen carries two resting plates.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminUsersPanel.vue:183-200
- **fix shape** emphasis="quiet" on both, with tone="destructive" on the trash on hover/focus. Fold into the Button re-spell sweep.

#### UIA-V-631 · LOW · admin-users · Per-row icon-only delete-user target is 28x28 at 390

- **source** confirm miss #5 · **verdict** MISSED (confirm seat)
- **frame** `admin-users/` 390-light-10-populated.png; meta buttons Sort users w=28 h=28
- **observed** The destructive icon targets and the sort trigger are 28px at phone width. That is below glass's --touch-target (44) convention for mobile, though above the WCAG 2.5.8 minimum of 24.
- **owner** **CONSUMER**: CONSUMER AdminUsersPanel.vue:146-154 (size="xs"), and the ⋮ sort trigger at UserSortMenu.vue
- **fix shape** Use iconOnly size="sm"/md at < sm, or move the row actions into one overflow menu (which the crowding finding already proposes).

#### UIA-V-632 · LOW · admin-users · Error/refused EmptyState heading outranks the pane title

- **source** confirm miss #6 · **verdict** MISSED (confirm seat)
- **frame** `admin-users/` 390-light-08-token-refused-403.png, 1440-light-09-load-error.png
- **observed** The plate message is bold display (~30px at 390), while the pane title 'Users' is 25.9px Fraunces 400 (meta title fontSize). The state plate shouts over the page heading. The detail is set in Fira mono, a fourth voice for prose.
- **owner** **CONSUMER**: CONSUMER demo/shared/ui/EmptyState.vue (message voice)
- **fix shape** Put the EmptyState message on the text-face .text-heading/subheading rung below the pane title, and the detail on text-body (not mono).

#### UIA-V-633 · LOW · admin-names · Confirm Dialog runs edge to edge at 390 with no side gutter

- **source** audit #12 · **verdict** CONFIRMED · **state** reject/delete confirm at 390 · **where** AdminNamesPanel.vue:147-163
- **frame** `admin-names/` 390-light-08-reject-confirm.png, 390-light-12-delete-confirm.png, 390-dark-08-reject-confirm.png (manifest dialog x 0, w 390, radius 16px)
- **observed** The 16 px-radius plate touches both viewport edges, so its corners clip against the screen.
- **expected + canon** A real gutter at phone width (glass dialog/styles.css:19).
- **owner** **GLASS**: GLASS — DialogContent 7.0.0 `w-full max-w-lg` (cured at HEAD src/components/dialog/styles.css:19-25: min(100% - 2*--space-section, 32rem), a 20 px gutter at 393) → repin · *glass component* DialogContent (src/components/dialog/styles.css:19-25) · *head* cured-at-HEAD (adopt via repin)
- **fix shape** Glass repin (answered at HEAD). No consumer change.

#### UIA-V-634 · LOW · admin-names · Confirm Dialog prints the colour name in bold mono, so long names wrap three lines

- **source** audit #13 · **verdict** CONFIRMED · **state** delete/reject confirm · **where** AdminNamesPanel.vue:150-155
- **frame** `admin-names/` 1440-light-12-delete-confirm.png, 390-light-12-delete-confirm.png
- **observed** The row shows the name in the sans primary rung, but the Dialog switches it to mono (the readout rung the F-9 note reserves for CSS literals). A long name becomes a three-line bold mono block.
- **expected + canon** The name keeps its primary register everywhere (COHESION), quoted and clamped.
- **owner** **CONSUMER**: CONSUMER — AdminNamesPanel.vue:153 (font-mono font-medium subject)
- **fix shape** Render the subject in the text rung with curly quotes and a 2-line clamp; keep mono for the css caption only.

#### UIA-V-635 · LOW · admin-names · The filtered-zero state wears the true-empty ghost trio

- **source** audit #14 · **verdict** CONFIRMED · **state** search 'zzzz' with zero matches · **where** AdminNamesPanel.vue:62, 113
- **frame** `admin-names/` 1440-light-13-filtered-empty.png, 390-light-13-filtered-empty.png
- **observed** 'No approved names match this search.' sits under the seeded WatercolorDot trio. EmptyState.vue documents the trio as the one voice of TRUE empty.
- **expected + canon** A filtered zero is not an empty queue (the panel's own W7.83 note): a plain line with a clear-search action.
- **owner** **CONSUMER**: CONSUMER — AdminNamesPanel.vue:62 and :113 (EmptyState default variant for a filtered zero)
- **fix shape** Use a plain filtered-empty register (no trio) with a 'Clear search' text button.

#### UIA-V-636 · LOW · admin-names · The destructive confirm is a full-width stadium about 60 px tall at 390

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `admin-names/` 390-light-08-reject-confirm.png
- **observed** A red stadium spanning the plate, with a bare-text Cancel under it. The stadium is canon for a single-line control, but the size dominates the Dialog. Check the footer's intended size rung.
- **owner** **GLASS+CONSUMER**: CONSUMER (the Dialog footer Button, no size) / GLASS (the dialog footer rung) · *glass component* DialogFooter button rung at phone width · *head* open-at-HEAD

#### UIA-V-637 · LOW · admin-audit · Loading skeleton is shaped like a Names row (swatch dot + trailing action block), not an audit row

- **source** audit #13 · **verdict** CONFIRMED · **state** loading · **where** admin-audit, loading, 1440 + 390
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-loading-1440-light.png, p2-loading-390-light.png
- **observed** The skeletons draw a leading 32px circle and a trailing 56px block. Audit rows have neither. The Target field also widens during loading because the count is hidden, so the toolbar shifts when data lands.
- **expected + canon** The skeleton traces the shape it stands in for, so the loaded state does not jump.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminListSkeleton.vue:9-20 as used at AdminAuditPanel.vue:49
- **fix shape** A skeleton variant with badge + time + target line (or DataTable's own row skeleton after migration). Reserve the count's width while loading.

#### UIA-V-638 · LOW · admin-audit · Empty and filtered-empty plates repeat the counter, the filtered plate has no way out, and the plate headline competes with the pane title

- **source** audit #14 · **verdict** CONFIRMED · **state** empty / filtered-empty · **where** admin-audit, empty + filtered-empty, 1440 + 390
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-empty-1440-light.png, p2-filtered-empty-390-light.png, p2-filtered-empty-1440-dark.png
- **observed** '0 entries' sits above 'No audit entries found.', saying the same thing twice. Filtered-empty ('No audit entries match these filters.') has no 'Clear filters' action. At 390 the plate headline wraps to two bold display lines about as large as the 'Audit Log' pane title. On true empty, both filter fields and Refresh stay live over an empty ledger.
- **expected + canon** One statement of emptiness. The filtered zero offers the way back. The plate stays subordinate to the pane title (hierarchy (1)).
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminAuditPanel.vue:28 and :67-74; demo/shared/ui/EmptyState.vue
- **fix shape** Hide the count when entries are 0. Add an #action 'Clear filters' button to the filtered plate. Step the EmptyState headline down one rung inside panes.

#### UIA-V-639 · LOW · admin-audit · glass-ui has no pagination control, so Audit and Flagged hand-roll PaginationBar

- **source** audit #15 · **verdict** CONFIRMED · **state** entries pager · **where** admin-audit, entries pager, 1440 + 390
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-entries-p3-last-1440-light.png, probe-390-after-wheel.png
- **observed** PaginationBar is a consumer composition: two outline sm Buttons at 40x36 plus a text-caption 'Page n of m'. It renders only when pageCount > 1 and is centred at the list foot, so at 390 it is centred on the overflowed track (see BROKEN). PagerDots is carousel-only. Every glass consumer that pages a DataTable must re-invent this.
- **expected + canon** A library pagination control that sits with DataTable (caller-owned state, library-owned chrome, capsule buttons on the control rung, polite live status).
- **owner** **GLASS+CONSUMER**: GLASS (missing primitive; DataTable leaves pagination to callers, glass-ui DESIGN.md:1615); CONSUMER demo/palettes/browser/admin/PaginationBar.vue:1-27 · *glass component* Pagination (missing primitive beside DataTable) · *head* open-at-HEAD
- **fix shape** Route to the glass-ui session: add a Pagination/Pager primitive, paired in the DataTable README. value.js then deletes PaginationBar.vue and uses it in Audit and Flagged.

#### UIA-V-640 · LOW · admin-audit · Signed-out deep link to #/admin/audit resolves to Not Found, so the panel's signed-out plate cannot be reached from a URL

- **source** audit #16 · **verdict** CONFIRMED · **state** signed-out · **where** admin-audit, signed-out, 1440 + 390, light+dark
- **frame** `admin-audit/` docs/tranches/X/audit/ui-evidence/value/admin-audit/p2-signed-out-1440-light.png, p2-signed-out-390-dark.png
- **observed** With no token, the guard sends the address to the 'Not Found' scene ('That address does not name a view of this app'). This is deliberate (fail-closed). The panel's 'Sign in with an admin token' plate is therefore only reachable if the token is dropped while the pane is mounted.
- **expected + canon** Informational: the fail-close is intended. Just note that the in-panel signed-out plate is a mid-session-only state.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminAuditPanel.vue:40-46 vs demo/shell/viewSchema.ts:262-264 (router/guards.ts fail-close)
- **fix shape** No change required. Optionally confirm the mid-session token-drop path renders the plate (not tested here: needs a live token-revocation flow).

#### UIA-V-641 · LOW · admin-audit · Three stacked role=status live regions while loading, and no aria-busy on the list

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **observed** Each of the three AdminListSkeletons is role=status aria-label='Loading', so assistive tech gets three identical status regions. The wrapping div has only aria-label (no role, no aria-busy). One status or aria-busy on the list container is the idiom.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/AdminAuditPanel.vue:48-49 + AdminListSkeleton.vue:10-11

#### UIA-V-642 · LOW · admin-audit · The page-change announcement is lost, because the pager's aria-live region unmounts on every page turn

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **observed** This follows from the HIGH paging finding. The polite live 'Page n of m' span is destroyed and re-created with new text, so it is typically not announced. Keeping PaginationBar mounted during refetch cures both issues.
- **owner** **CONSUMER**: CONSUMER demo/palettes/browser/admin/PaginationBar.vue:17 as unmounted by AdminAuditPanel.vue:48

#### UIA-V-643 · LOW · admin-audit · Dark theme at 1440 shows the dock as a lone pink blob, while light and 390 show the full dock pill

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **observed** In p2-entries-1440-dark.png the top-centre dock is a single pink blob disc. p2-entries-390-light.png shows the icon + chevron + kebab pill. This may be a collapse or theme state rather than a defect. It is flagged for the shell/dock audit and was not judged here.
- **owner** **UNRESOLVED**: UNVERIFIED (shell dock; outside the admin-audit files)

#### UIA-V-644 · LOW · admin-flagged · Dismiss notice names the slug; Delete notice names the palette — two registers for the same act family

- **source** audit #4 · **verdict** CONFIRMED · **state** after Dismiss / after Delete · **where** after moderation act
- **frame** `admin-flagged/` j-after-dismiss-1440-light.png vs i-after-delete-1440-light.png
- **observed** 'Dismissed the reports on buy-cheap-pixels-now' (raw slug) vs 'Deleted “Neon Knockoff”' (display name in quotes).
- **expected + canon** The same label rule for both acts. The row, the aria-label and the confirm dialog all use palette?.name ?? slug.
- **owner** **CONSUMER**: CONSUMER — demo/palettes/useAdminFlagged.ts:117 vs :122-125
- **fix shape** Hoist the delete path's label lookup into a shared helper and use it in dismiss: `Dismissed the reports on “${label}”`.

#### UIA-V-645 · LOW · admin-flagged · Refresh affordance diverges from siblings and duplicates Retry in the error state; no busy feedback

- **source** audit #9 · **verdict** CONFIRMED · **state** loading, load error · **where** toolbar
- **frame** `admin-flagged/` l-load-error-1440-light.png; b-loading-1440-light.png
- **observed** Flagged uses a 28px icon-only refresh that stays enabled during loading and never spins. Users uses a labeled 'Refresh' that spins and disables while loading. In the error state, the icon refresh and the plate's Retry are two controls for the same act.
- **expected + canon** One refresh grammar across the admin panes, and each control earning its place.
- **owner** **CONSUMER**: CONSUMER — AdminFlaggedPanel.vue:13-15 vs AdminUsersPanel.vue:26-35
- **fix shape** Use the Users toolbar recipe (:loading on the glass Button, disabled while loading), and hide the toolbar refresh while the error plate with its Retry is showing.

#### UIA-V-646 · LOW · admin-flagged · Deleted-palette row loses its leading column — the name jumps left, misaligned with every other row

- **source** audit #11 · **verdict** CONFIRMED · **state** row whose palette is null · **where** with reports
- **frame** `admin-flagged/` c-reports-1440-light.png (ghost-palette row)
- **observed** 'ghost-palette' starts at x≈346 while other names start at x≈463 or 396. The swatch-strip width also varies with the colour count (2 vs 5 circles), so names never share a left edge.
- **expected + canon** A fixed leading slot (the AdminListItem 'swatch' slot is a fixed w-8 box) so names align, with a placeholder glyph for a deleted palette.
- **owner** **CONSUMER**: CONSUMER — AdminFlaggedPanel.vue:79-86 (swatch strip renders nothing when palette is null)
- **fix shape** Give the swatch cluster a fixed width (for example 5×20 − overlap), and render a dashed placeholder or an EyeOff icon when palette is null.

#### UIA-V-647 · LOW · admin-flagged · Empty/error plate headline out-weighs the pane title; dead band above the pane at 390

- **source** audit #12 · **verdict** CONFIRMED · **state** empty, load error · **where** empty / error
- **frame** `admin-flagged/` a-empty-1440-light.png; a-empty-390-light.png; l-load-error-1440-light.png
- **observed** 'No flagged palettes.' is set in heavy (~700–800) Fraunces, visibly heavier than the regular-weight 'Flagged' PaneHeader title, so an empty state shouts over the page identity. At 390 the short pane sits vertically centred with about 470px of dead ground between the dock and the card, and the card jumps between heights as the state changes (340px empty, full list, 340px error).
- **expected + canon** The type scale steps downward: page title > empty headline. The pane holds a stable top anchor under the dock.
- **owner** **CONSUMER**: CONSUMER — demo/shared/ui/EmptyState.vue (message weight) / shell pane placement
- **fix shape** Set EmptyState's message to text-subheading at weight ≤500. Top-anchor the admin stage (align-start under the dock) rather than centring it vertically.

#### UIA-V-648 · LOW · admin-flagged · Confirm Dialog: title/description in sans while the page speaks display serif; Cancel inked in accent-red beside the destructive button

- **source** audit #13 · **verdict** AMENDED · **state** open, focus on Cancel; Tab to Delete · **where** resolve confirm Dialog
- **frame** `admin-flagged/` h-confirm-dialog-1440-light.png; h2-confirm-tab-1440-light.png
- **observed** The dialog is a 512×186 glass surface at radius 16px (on canon --radius-dialog), and focus lands on Cancel then Tab reaches Delete, both correct. But the title is Plus Jakarta Sans while the pane and palette names are Fraunces, and the palette name is injected mid-sentence in bold Fraunces. The emphasis=text Cancel is crimson accent ink right beside the red 'Delete palette' fill, so there are two reds and the safe action reads as destructive.
- **expected + canon** One type voice per surface (a display-voice title, as the PaneHeader uses). The safe action is neutral ink.
- **owner** **CONSUMER**: CONSUMER — AdminFlaggedPanel.vue:178-196 (and the same recipe at AdminUsersPanel.vue:212-239); possibly GLASS DialogTitle default font
- **fix shape** Give DialogTitle font-display (or have glass carry a title-voice token). Give Cancel tone=neutral with foreground ink, not accent. Keep the palette name in weight-500 display, not bold.
- **confirm** The Cancel half is CONFIRMED: h-confirm-dialog shows a crimson 'Cancel' beside the red 'Delete palette' fill. Installed button CSS gives emphasis=text `color:var(--primary)`, and value's primary resolves to a crimson accent, so it is a CONSUMER emphasis pick (use quiet/neutral). The type-voice half stands as a mismatch, but the frame's title and body render in a Helvetica-like fallback, not Plus Jakarta Sans, because the fonts-wait hung during the server stall. The 'Plus Jakarta Sans' wording is the declared font, not what painted. Re-verify the painted face after the server recovers before routing any GLASS DialogTitle font ask.

#### UIA-V-649 · LOW · admin-flagged · Dismiss button and pager caption render in italic display (Fraunces italic) — a third type voice among the row controls

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `admin-flagged/` crop-row-actions-states-1440-light, where 'Dismiss' is italic Fraunces; h-confirm-dialog, where 'Page 1 of 2' is italic. Command labels in glass Button use the control sans (--control-text), not the display italic.
- **observed** crop-row-actions-states-1440-light, where 'Dismiss' is italic Fraunces; h-confirm-dialog, where 'Page 1 of 2' is italic. Command labels in glass Button use the control sans (--control-text), not the display italic.
- **owner** **CONSUMER**: CONSUMER — AdminFlaggedPanel.vue:124 (font-display on a Button label), PaginationBar.vue:17

#### UIA-V-650 · LOW · admin-flagged · Success notice is a full-width mono green-on-grey stadium strip, not a glass Toast/feedback plate; it spans the whole pane for a one-line message

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `admin-flagged/` l-load-error-1440-light, notice strip at y≈620
- **observed** l-load-error-1440-light, notice strip at y≈620
- **owner** **CONSUMER**: CONSUMER — ActionFeedback usage at AdminFlaggedPanel.vue:19-29 (check ActionFeedback against the glass feedback register)

#### UIA-V-651 · LOW · admin-tags · 'uncategorized' sorts alphabetically among real categories

- **source** audit #11 · **verdict** CONFIRMED · **state** with tags · **where** admin-tags · with tags
- **frame** `admin-tags/` 1440-light-03-with-tags.png (MOOD, SEASON, UNCATEGORIZED, USE)
- **observed** The fallback bucket is sorted between SEASON and USE, and its label uses the same style as a real category.
- **expected + canon** The remainder bucket sits last and is visibly distinct (e.g. muted or italic 'No category').
- **owner** **CONSUMER**: CONSUMER — demo/palettes/useAdminTags.ts:66-74
- **fix shape** Sort with 'uncategorized' pinned last, and render its label in the de-emphasised rung.

#### UIA-V-652 · LOW · admin-tags · Create form stays live in the loading and error states

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `admin-tags/` 1440-light-10-error.png, 1440-light-11-loading.png (nameInput and catInput present)
- **observed** The name, category and '+' controls stay operable above 'Couldn't load tags.' and above the loading skeletons, so a user can write into a ledger that failed to load.
- **owner** **CONSUMER**: CONSUMER: AdminTagsPanel.vue:43 (the only condition is !access)
- **fix shape** Disable or hide the create row unless the list has loaded.

#### UIA-V-653 · LOW · admin-tags · A success notice ('Deleted tag "calm"') is still showing over the error and loading states

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `admin-tags/` 1440-light-10-error.png and 1440-light-11-loading.png (manifest notice 'Deleted tag "calm"' still present)
- **observed** A green success strip sits above a red 'Couldn't load tags' error register. The two signals contradict each other. This may be partly an artifact of capture timing inside the 4s auto-dismiss.
- **owner** **CONSUMER**: CONSUMER: useAdminTags.ts, where loadTags does not clear the notice
- **fix shape** Clear the notice when loadTags starts or fails.

#### UIA-V-654 · LOW · admin-tags · Chip label type is larger than the control type

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `admin-tags/` 1440-dark-05-keyboard-focus.png
- **observed** The chip text is 16.4px Fira Code, while the Input and Button text in the same pane is 14.4px. The small tokens out-size the controls. Moving to glass Chip size=sm would fix this.
- **owner** **CONSUMER**: CONSUMER: text-mono-small on the chips at AdminTagsPanel.vue:131
- **fix shape** Take the type size from the Chip rung.

#### UIA-V-655 · LOW · admin-tags · At 390 the toolbar's 44px Refresh leaves about 50px of dead band above the create row

- **source** confirm miss #6 · **verdict** MISSED (confirm seat)
- **frame** `admin-tags/` 390-light-03-with-tags.png
- **observed** The count row reads '11 tags' next to a tall capsule. Together with gap-3, the band above the inputs is taller than any content row, which adds clutter at phone width.
- **owner** **CONSUMER**: CONSUMER (it follows from #3 and #5)
- **fix shape** Resolved by moving the count to the header Badge and deleting the row (#5).

#### UIA-V-656 · LOW · not-found · The Home button shows no hover feedback

- **source** audit #8 · **verdict** CONFIRMED · **state** home-hover (fine pointer) · **where** NotFoundPane.vue:17
- **frame** `not-found/` 1440-light-02-home-hover.png vs 1440-light-01-unknown.png; 1440-dark-02-home-hover.png
- **observed** Computed background at rest and after a 400ms hover is identical (oklab(0.9156 0.0055 0.0131 / 0.52) light, / 0.6304 dark), and the frames are visually indistinguishable. Keyboard focus does paint a visible 2px accent ring (03-home-focus).
- **expected + canon** STATES: hover present and consistent. The quiet/text emphasis in glass-ui button/styles.css:194-204 paints --fill-hover under (hover:hover).
- **owner** **CONSUMER**: CONSUMER — consequence of NotFoundPane.vue:17 (secondary emphasis via the retired variant)
- **fix shape** Resolved by the emphasis migration. Verify that `quiet` hover paints.

#### UIA-V-657 · LOW · not-found · Route announcement repeats 'Not Found' and reads the percent-encoded query

- **source** audit #9 · **verdict** CONFIRMED · **state** deep unknown with query; every not-found · **where** App.vue:502
- **frame** `not-found/` 1440-light-05-deep-unknown.png (capture-meta.json runs.1440-light.deep.live)
- **observed** The live region reads 'Not Found. /foo/bar/baz?color=oklch(70%25+0.15+180deg)&space=oklch could not be opened — showing the Not Found scene.' ('Not Found' twice, the jargon word 'scene', raw %25/+ encoding). For /nope it reads '…— showing the Not Found scene.'
- **expected + canon** A single clear polite announcement of the route change.
- **owner** **CONSUMER**: CONSUMER — demo/color-picker/App.vue:497-503 (routeAnnouncement)
- **fix shape** Announce the decoded `route.path` only, for example 'Not found: /foo/bar/baz.', and drop the 'showing the … scene' clause for not-found.

#### UIA-V-658 · LOW · not-found · Dock condenses to a lone colour blob on in-app arrival at the dead end, hiding the view selector

- **source** audit #10 · **verdict** CONFIRMED · **state** deep unknown / refused admin reached by in-app hash navigation · **where** dock condensed state on the not-found view
- **frame** `not-found/` 1440-dark-05-deep-unknown.png, 1440-dark-06-admin-refused.png, 1440-light-06-admin-refused.png (vs full dock in 1440-light-01-unknown.png)
- **observed** After an in-app hash navigation, the dock shows only a colour-swatch blob. The view selector (the compass), which is the only way out besides the card's button, is hidden until the user interacts. On a fresh load, the full dock (compass · Login · @mbabb) shows.
- **expected + canon** COHESION/STATES: on a terminal view the navigation chrome should stay legible, since the dock is the app's primary way out.
- **owner** **CONSUMER**: CONSUMER — dock condense policy (demo/shell/dock/*), not specific to NotFoundPane
- **fix shape** Keep the dock expanded while currentView === 'not-found' (exempt it from idle condense).

#### UIA-V-659 · LOW · not-found · Document title carries the colour voice only when the dead-end URL has a colour query

- **source** audit #12 · **verdict** CONFIRMED · **state** deep unknown vs unknown · **where** useDocumentTitle
- **frame** `not-found/` 1440-light-05-deep-unknown.png vs 1440-light-01-unknown.png (capture-meta.json titles)
- **observed** /#/foo/bar/baz?color=… gives the tab title 'oklch(70% 0.15 180deg) · Not Found — Color Picker'. /#/nope gives 'Not Found — Color Picker'. The refused admin link correctly gives 'Not Found — Color Picker'.
- **expected + canon** The terminal view names itself one way whatever the query.
- **owner** **CONSUMER**: CONSUMER — demo/color-picker/router/useDocumentTitle.ts (installed at router/index.ts:72)
- **fix shape** Omit the picked-colour prefix when the route is not-found.

#### UIA-V-660 · LOW · not-found · Plate drop shadow is a hard, dark offset slab

- **source** confirm miss #1 · **verdict** MISSED (confirm seat)
- **frame** `not-found/` 1440-light-01-unknown.png, 390-light-01-unknown.png
- **observed** A near-black brown offset block sits under the bottom-right of the plate, which reads heavy and dirty on the light pink ground and looks unlike glass. It needs a check against glass-ui's resting-tier elevation spec before routing; it may be the shared app plate recipe rather than something specific to not-found.
- **owner** **GLASS+CONSUMER**: CONSUMER or GLASS (card tier 'resting' shadow token), not yet determined · *glass component* Card resting shadow token (--shadow-cartoon-*), ownership unverified · *head* open-at-HEAD

#### UIA-V-661 · LOW · not-found · Version skew undermines the coarse-pointer relay

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **observed** value.js pins @mkbabb/glass-ui 7.0.0. DESIGN.md describes 8.0.0+ behaviour ([data-control-target] on Button), and the glass-ui source has the DEV warning for retired `variant`. Any glass-side fix to --control-text lands only after value.js bumps two or more majors, so the relay should say so.
- **owner** **CONSUMER**: CONSUMER

#### UIA-V-662 · LOW · not-found · Plate is vertically centred in the viewport, far from the dock

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **frame** `not-found/` 1440-light-01-unknown.png, 390-light-01-unknown.png
- **observed** At 390 the plate starts around y≈350 CSS with empty ground above it, and the view name is not visible anywhere near the dock. On a phone the message sits mid-screen, disconnected from the nav chrome. This belongs with the desktop dead-space finding.
- **owner** **CONSUMER**: CONSUMER — stage band centring (App.vue pane-main)

#### UIA-V-663 · LOW · pane-plates · Three vocabularies for one region failure/loading: 'scene' vs 'panel'

- **source** audit #8 · **verdict** CONFIRMED · **state** CONFIRMED · **where** all combos
- **frame** `pane-plates/` 1440-light-01-loading-hop-mix.png, 1440-light-05-…, 1440-light-09-boundary-caught-mix.png
- **observed** The inspector region (Mix, Palettes) is one pane of the scene, yet the plates call it 'the scene'. The boundary calls the same region 'this panel'.
- **expected + canon** One noun for a region's occupant across all three plates, ideally the region's own label (viewSchema SceneRegion.label).
- **owner** **CONSUMER**: CONSUMER demo/shell/PaneLoadingPlate.vue:23 ('Loading the scene…'), demo/shell/PaneErrorPlate.vue:25 ('This scene could not be loaded.'), demo/color-picker/ErrorBoundary.vue:69 ('This panel hit an unexpected error.')
- **fix shape** Pass region.label into the plates ('Loading Mix…', 'Mix could not be loaded.', 'Mix hit an unexpected error.').

#### UIA-V-664 · LOW · pane-plates · Plates bypass Card anatomy with literal, mismatched padding; per-instance type and spacing overrides on glass Button

- **source** audit #9 · **verdict** CONFIRMED · **state** CONFIRMED · **where** all combos
- **frame** `pane-plates/` 1440-light-04-loading-deeplink-gradient.png (padding 24/24), 1440-light-05-chunk-error-hop-mix.png (padding-top 0)
- **observed** The two sibling plates use two different literal paddings instead of CardContent's `--card-pad`. The glass Button's typeface and spacing are overridden at each call site in two files.
- **expected + canon** GLASS IDIOM: Card anatomy (CardHeader/CardContent, --card-pad) and component-owned four-state contract (DESIGN.md:11 'Component over CSS class').
- **owner** **CONSUMER**: CONSUMER demo/shell/PaneLoadingPlate.vue:16 (`px-4 sm:px-6 py-6 gap-4`), demo/shell/PaneErrorPlate.vue:21 (`px-6`, py 0), PaneErrorPlate.vue:30-31 + ErrorBoundary.vue:34-35 (`font-display mt-1`, icon `w-3.5 h-3.5 mr-1.5`)
- **fix shape** Wrap plate content in CardContent. If Fraunces buttons are the app register, set that once through the Button's font token and not per instance. Use the Button's icon slot and gap.

#### UIA-V-665 · LOW · pane-plates · Skeleton radius overridden to 4px against the canon media-tile rung

- **source** audit #10 · **verdict** CONFIRMED · **state** CONFIRMED · **where** all combos · loading plate
- **frame** `pane-plates/` 1440-light-04-loading-deeplink-gradient.png
- **observed** Measured skeleton border-radius 4px.
- **expected + canon** Skeleton default is --radius-media 10px (glass DESIGN.md:384 'Media tile — Skeleton default'); a caller override should be a shape the stand-in mirrors (e.g. a title bar), not an arbitrary rung.
- **owner** **CONSUMER**: CONSUMER demo/shell/PaneLoadingPlate.vue:21-22 (`rounded-md`)
- **fix shape** Drop `rounded-md` and inherit the glass default, or use the radius of the element each bar stands in for.

#### UIA-V-666 · LOW · pane-plates · Outline Button hover is imperceptible on the plates' recovery actions

- **source** audit #11 · **verdict** AMENDED · **state** PLAUSIBLE · **where** all combos · chunk-error and boundary hover
- **frame** `pane-plates/` 1440-light-06-chunk-error-reload-hover.png vs 05, 1440-dark-10-boundary-tryagain-hover.png vs 09
- **observed** Computed background is identical at rest and on hover (light oklab(0.9156…/0.52), dark oklab(0.4149…/0.6304)). The frames show no visible change.
- **expected + canon** A visible hover step on the only recovery action in a failure state.
- **owner** **GLASS**: GLASS Button outline variant (glass-capsule-hover) — DESIGN.md:603 state table; consumer pinned to 7.0.0 dist · *glass component* Button · *head* open-at-HEAD
- **fix shape** Check at glass HEAD whether outline hover paints a visible tint or lift. If not, route to the glass session. If it does, it is an adoption item.
- **confirm** Two parts of the claim are wrong. First, the variant is not outline: the measured button variant is null (default), and both call sites pass only size=sm. Second, hover does paint. The button grows from 124x36 to 126x37 in 1440-light-10 and from 166x36 to 168x37 in 06. That is the 7.0.0 dist `.glass-capsule-hover:hover{scale:1.015; --specular-intensity:0.14}`, with no background tint, which is why the measured background is unchanged. It is subtle, not absent. It does conflict with glass's own DESIGN.md state table, which gives hover as 'Scale up, or bg tint' at --scale-hover 1.08, while the capsule uses a literal 1.015. The owner is GLASS, as a canon-vs-implementation question, and it should be re-checked against HEAD button/styles.css, which is rewritten around data-emphasis. The consumer has no defect here.

#### UIA-V-667 · LOW · pane-plates · Error plate hand-rolls the alert register (role=alert + glyph + statement) instead of glass Alert; redundant aria-live on role=alert

- **source** audit #12 · **verdict** CONFIRMED · **state** CONFIRMED · **where** all combos · chunk-error and boundary
- **frame** `pane-plates/` 1440-light-05-chunk-error-hop-mix.png, 1440-dark-09-boundary-caught-mix.png
- **observed** The failure register is a demo-local composition. Glass already ships an announcing Alert primitive with tone and announce axes.
- **expected + canon** GLASS IDIOM: every surface is a glass primitive or a named reason why not.
- **owner** **CONSUMER**: CONSUMER demo/shared/ui/EmptyState.vue:2-17 (manual role=alert, CircleAlert glyph) + demo/color-picker/ErrorBoundary.vue:25 (`aria-live=assertive` on an element whose role=alert already implies it); glass has src/components/alert/Alert.vue (tone + announce='assertive')
- **fix shape** Either compose glass Alert (tone=destructive, announce=assertive) inside the plate card, or record why a centred plate is not an Alert and propose an EmptyState/Plate primitive to glass. Remove the duplicate aria-live.

#### UIA-V-668 · LOW · pane-plates · After 'Try again' the dock is collapsed to a single blob chip (unattributed)

- **source** audit #13 · **verdict** AMENDED · **state** PLAUSIBLE · **where** 1440 light+dark · boundary after reset
- **frame** `pane-plates/` 1440-light-12-boundary-after-reset.png, 1440-dark-12-boundary-after-reset.png (compare 09/11, full dock)
- **observed** The frame taken about 2 s after reset shows the dock as a lone pink blob at top-centre. It may be the dock's idle morph and not caused by the reset. The mix pane itself mounted correctly (reset works).
- **expected + canon** Recovery does not change unrelated chrome.
- **owner** **UNRESOLVED**: CONSUMER unknown (dock, not this seat's files) — observation only
- **fix shape** Hand to the dock seat to check whether the collapse is idle-driven or triggered by focus leaving the dock or the region remount.
- **confirm** The frame is real: 1440-light-12 shows the lone pink blob chip at top centre and the Mix pane mounted correctly. Frame 12 was taken about 2 s after reset, following a hover and a Tab. That timing fits the dock's idle morph at least as well as a reset side effect. It stays an observation with no owner in this seat and should go to the dock seat. It is not a pane-plates defect.

#### UIA-V-669 · LOW · pane-plates · Skeleton default radius differs between installed dist and canon

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **frame** `pane-plates/` The 7.0.0 dist sets .skeleton border-radius to var(--radius-input). DESIGN.md:385 and HEAD Skeleton.vue set it to --radius-media (10px). Dropping `rounded-md` before adoption would give the input rung, not the media rung.
- **observed** The 7.0.0 dist sets .skeleton border-radius to var(--radius-input). DESIGN.md:385 and HEAD Skeleton.vue set it to --radius-media (10px). Dropping `rounded-md` before adoption would give the input rung, not the media rung.
- **owner** **GLASS**: GLASS (adoption) · *glass component* Skeleton · *head* cured-at-HEAD (adopt via repin)

#### UIA-V-670 · LOW · pane-plates · Error-plate Card has zero block padding and relies on EmptyState's py-8

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **frame** `pane-plates/` Measured paddingTop 0px. The 390 plates are 310px tall, and the content sits only on EmptyState's internal padding. Any other EmptyState consumer inside a Card would get different vertical rhythm. This is part of the CardContent/--card-pad finding, but padding-top 0 is its own concrete measurement.
- **observed** Measured paddingTop 0px. The 390 plates are 310px tall, and the content sits only on EmptyState's internal padding. Any other EmptyState consumer inside a Card would get different vertical rhythm. This is part of the CardContent/--card-pad finding, but padding-top 0 is its own concrete measurement.
- **owner** **CONSUMER**: CONSUMER demo/shell/PaneErrorPlate.vue:22

#### UIA-V-671 · LOW · pointer-debug-overlay · Gauge formatting: integers render as '1.0', raw performance.now() timestamps shown, long values wrap into the key with no gap

- **source** audit #6 · **verdict** CONFIRMED · **state** freeze detection; after reset · **where** demo/picker/visual/PointerDebugOverlay.vue:75
- **frame** `pointer-debug-overlay/` 06-freeze__1440__light__crop.png ('global.lastDown.targetdiv.spe / picker.'); 10-reset__390__light__crop.png ('lastForceRelease 90196.9'); capture-log.json 06-freeze text ('global.lastDown.pid 1.0', 'global.activePointers 1.0', 'global.silenceMs 4510.0')
- **observed** `toFixed(1)` is applied to every number, so pointer ids and counts read '1.0' and silenceMs reads '4510.0'. lastForceRelease/lastForceReset show absolute performance.now() ms (90196.9), which means nothing to a reader. `.debug-gauge` is justify-between with no gap, min-width:0 or ellipsis, so the value 'div.spectrum-picker.flex' collides with its key and wraps.
- **expected + canon** Readouts formatted by kind (integers as integers, durations as relative 'Xs ago'), with key/value separated (glass Metric posture=row handles this).
- **owner** **CONSUMER**: CONSUMER (PointerDebugOverlay.vue:75-79 formatGauge; :198-202 .debug-gauge; usePointerDebug.ts:95,184,190)
- **fix shape** Format by gauge kind: Number.isInteger → no decimals; timestamps → `${((now-t)/1000).toFixed(1)}s ago`. Add a gap and `min-width:0; text-overflow:ellipsis` to the value, or adopt MetricRow.

#### UIA-V-672 · LOW · pointer-debug-overlay · Synthetic log rows carry noise fields ('p-1', '??')

- **source** audit #7 · **verdict** CONFIRMED · **state** freeze detection; reset · **where** demo/picker/composables/usePointerDebug.ts:24
- **frame** `pointer-debug-overlay/` 06-freeze__1440__light__crop.png, 06-freeze__390__light.png ('FREEZE_DETECTED p-1 ??'); 10-reset__390__light__crop.png ('FORCE_RESET_DONE p-1 ??')
- **observed** Events logged with pointerId -1 and a null target (FREEZE_DETECTED, FORCE_RELEASE, FORCE_RESET_DONE, ORPHAN_POINTERS) render 'p-1 ??' before their meaningful `extra` text. That spends the narrow row width and pushes the stuck-pointer detail onto a second line.
- **expected + canon** Clutter lens: fields that do not apply are omitted.
- **owner** **CONSUMER**: CONSUMER (usePointerDebug.ts:24 `describeElement` returns '??'; DebugEventLog.vue:13-15)
- **fix shape** In DebugEventLog, render the pid only when ≥ 0 and the target only when non-empty. Have describeElement return '' for null.

#### UIA-V-673 · LOW · pointer-debug-overlay · Header disclosure has no focus-visible ring and an inconsistent title alignment

- **source** audit #8 · **verdict** AMENDED · **state** collapsed (keyboard focus); expanded · **where** demo/picker/visual/PointerDebugOverlay.vue:151
- **frame** `pointer-debug-overlay/` 02-header-focus__1440__dark__crop.png (no ring); 01-collapsed vs 03-expanded-empty__1440__light__crop.png ('Debug' left-aligned collapsed, centered expanded)
- **observed** `.debug-header` defines no :focus-visible style, and none shows in the focus frame (PLAUSIBLE: the follow-up Tab-walk probe that would confirm :focus-visible could not run because the server stopped answering). `.debug-title{flex:1}` inherits the button's center text-align, so the title jumps from left (collapsed chip) to center (expanded) and the toggle glyph sits far right, where it is hidden under the card (see BROKEN row).
- **expected + canon** Every interactive control has a visible focus state (lens 5), and the disclosure is laid out consistently. glass Collapsible/CollapsibleTrigger carries both.
- **owner** **CONSUMER**: CONSUMER (PointerDebugOverlay.vue:151-165; only .debug-btn has :focus-visible at :242)
- **fix shape** Adopt glass CollapsibleTrigger, or add `.debug-header:focus-visible` with the canon ring token and `text-align:start` on the title. Replace the '+'/'−' glyphs with a chevron icon.
- **confirm** The 'no ring' half is REFUTED. capture-log 02-header-focus__1440__dark records headerFocusOutline='auto', and probe-focus__1440.png (written by the partial probe run) shows Chromium's default blue -webkit-focus-ring-color outline around the collapsed chip. A ring IS drawn; it is the UA default, not the glass canon ring token, and it clashes with the palette. The alignment half is confirmed: 'Debug' sits left in the collapsed chip and centred in the expanded header (06-freeze, probe-click-header), because .debug-title flex:1 inherits the button's centre alignment. Restate the finding as 'off-canon UA focus ring', not 'missing ring'.

#### UIA-V-674 · LOW · pointer-debug-overlay · Event-log timestamp column shows raw performance.now() seconds

- **source** confirm miss #2 · **verdict** MISSED (confirm seat)
- **observed** `(evt.ts/1000).toFixed(2)` renders '118.39' and '56.57'. These are absolute page-clock seconds with the same meaninglessness as the lastForceRelease gauge. Render them relative to now, or to the newest event (Δ ms). Frames: 06-freeze__1440__light, probe-click-header__1440.
- **owner** **CONSUMER**: CONSUMER (DebugEventLog.vue:13)

#### UIA-V-675 · LOW · pointer-debug-overlay · Collapsed chip reads as a pill (12px radius on a ~30px-tall chip), against the owner's 'too rounded pills' edict

- **source** confirm miss #3 · **verdict** MISSED (confirm seat)
- **observed** The collapsed state inherits var(--radius-xl) 12px on a 30px-tall chip, so it is nearly a stadium (01-collapsed, probe-focus__1440). Once rebuilt on a glass Surface or Card, the collapsed chip should take whatever card-like radius glass settles on after the 2026-09-23 rounding ruling. It should not hand-pick one.
- **owner** **CONSUMER**: CONSUMER (PointerDebugOverlay.vue:143 radius on .debug-collapsed)

#### UIA-V-676 · LOW · pointer-debug-overlay · The z-index fix must also clear glass --z-toggle 999 and the stacking of teleported glass overlays

- **source** confirm miss #4 · **verdict** MISSED (confirm seat)
- **observed** The suggested interim `var(--z-max)` (9999) is correct, but --z-toggle 999 is an undocumented rung (it is missing from DESIGN.md), so that row belongs in the glass table re-sync too. Re-verify the 390 header hit-test after the fix, and check the expanded overlay against open popovers and sheets (130/140), which the audit did not capture.
- **owner** **GLASS+CONSUMER**: CONSUMER + GLASS · *glass component* z-index token scale (--z-toggle 999, teleported overlays) · *head* open-at-HEAD

## Appendix A: REFUTED

No confirm seat returned an outright REFUTED verdict: all 531 verdicts are CONFIRMED, AMENDED or PLAUSIBLE. The claims below were refuted *inside* AMENDED verdicts. Each row above already carries the corrected statement; this appendix keeps the refuted half on record so it is not re-raised.

- **dock-action-bar-color #7** (The selected seat is only a stroke colour, and it nearly disappears in dark mode): 'Nearly disappears' is refuted by the finding's own frame: crop-dark-d-picker-08-after-palettes-seat.
- **dock-action-bar-color #11** (The workbench bar can render with Back shifted outside the dock's left edge (bar opened ac): The stated trigger is REFUTED.
- **dock-color-input #16** (Entering propose mode can scroll the page (focus without preventScroll), clipping the dock): I can neither confirm nor refute this.
- **dock-profile-menu #1** (A failed 'Regenerate slug' signs the user out but the menu keeps showing the old identity): No frame refutes this.
- **palette-card-menu #12** (PaletteCard.vue survives as a near-verbatim twin of PaletteInspector.vue, both hosting thi): This is not refutable from frames, and I did not re-diff the templates at 1dac53fb.
- **browse-view #1** (390: the colour-count badge is clipped and covered by the '+N' tag chip; the palette name ): Amendment: the claim that every card truncates is refuted by loaded__390__light.
- **flag-report-dialog #4** (The one palette dialog off the confirm idiom: ✕ plus Cancel as two dismiss affordances, de): The 'default surface' part is REFUTED.
- **migrate-palettes-dialog #3** (One-off dialog: it is the only palette dialog without surface="glass", DialogFooter and em): The claim that it is 'the only' one is refuted: FlagReportDialog.
- **migrate-palettes-dialog #12** (Esc or ✕ cancels the switch silently and throws away the typed slug): The claim that Esc throws away the slug is refuted as stated: slugInput.
- **gradient-easing-authoring #6** (The selected tile is not painted: pressed and rest chips measure identical, and hover chan): The stated mechanism is refuted by my probe.
- **atmosphere-view #6** (Enums with three options use full-width dropdowns instead of the segmented control): Nothing refutes this.
- **atmosphere-view #15** (Trigger hover and slider-thumb focus are near-invisible): I could not separate a hover delta from the drift, so this is weak-positive and not refuted.
- **admin-users #22** (Mutation feedback is a hand-rolled chip, not a glass Alert or Toast (not captured)): Code-read only; there is no frame to refute or confirm visually.
- **admin-flagged #7** (Icon-only refresh stretches into a vertical capsule at 390 (touch min-height without min-w): Owner split REFUTED on the GLASS half: installed 7.
- **not-found #11** (The 'ONE VISIBLE route H1' does not appear in any frame (PLAUSIBLE; the probe was blocked)): Neither refuted nor confirmed without the blocked probe.
- **pointer-debug-overlay #8** (Header disclosure has no focus-visible ring and an inconsistent title alignment): The 'no ring' half is REFUTED.

Register-seat consolidation of further partial refutations (from the verdict text):

- **dock-color-input #1**: The GLASS-only owner is refuted. glass `Popover` already ships `keepDockOpen`, so the dock-collapse defect is mostly CONSUMER.
- **palettes-view #20**: The monospace menu font is not a glass defect. It is the consumer's own pin (`demo/styles/foundation.css:419`).
- **palettes-view #8 / #21**: The GLASS SearchBar asks are misrouted. SearchBar was deleted from glass at BK #42 (`./search` subpath gone at HEAD), so there is no glass target.
- **generate-view #9**: "The consumer should pass popper" is refuted: the consumer cannot. The owner is GLASS.
- **tag-edit-popover**: The icon-button squaring ask is refuted: glass already squares `iconOnly`.
- **admin-flagged #7**: The GLASS half of the owner split is refuted. Installed 7.0.0 sizes the button correctly; the consumer is missing `iconOnly`.
- **atmosphere-view**: "Footer button is ghost" is refuted: it is the default secondary emphasis inside a GlassDock.
- **pane-plates**: "Retry has no hover" is refuted as stated: hover paints through `scale 1.015`. The row keeps only the canon-vs-implementation question. The skeleton ink register is inert against 7.0.0.
- **gradient-view #15**: "Chip has no card/cell shape" is refuted: glass Chip already ships `shape="cell"` on `--radius-card`.
- **gradient-view #4**: The EasingPicker letterbox as a glass defect is refuted: `surface="bare"` exists. The only glass residue is handle-radius headroom.
- **gradient-view #18**: The pane-transition timeout is a deliberate ruling (`usePaneRouter.ts:266-280`), not a defect. It is filed LOW CONSUMER.
- **migrate-palettes-dialog #12**: "Esc throws away the typed slug" is refuted: the input is cleared on submit, not on Esc.
- **migrate-palettes-dialog #3**: "The only one-off dialog" is refuted: FlagReportDialog is also one.
- **about-pane #12**: "Select is item-aligned" is refuted: it already uses popper positioning. The overflow is a missing max-width cap.
- **flag-report-dialog #4**: The "default surface" half is refuted.
- **pointer-debug-overlay #8**: "No focus ring" is refuted: the UA ring shows.
- **dock-slug-edit-layer #13 (and the dock-main slug-pill row)**: "Badge adoption cures the too-rounded slug pill" is refuted: `--radius-badge` is still stadium. Any card-like label is a GLASS canon change.
- **about-pane #3**: "A consumer rule hides the scrollbar" is refuted: it is the macOS overlay scrollbar.
- **admin-names #1**: The translate-cancel mechanism is refuted: `useSelectionIndicator` subtracts container rects. The symptom stands and the owner stays GLASS.
- **app-ground-atmosphere #1**: "1440-dark fails at DPR 1" is refuted: 7558 px is under 8192. The retina projection is about 11337 px (glass clamps DPR to 1.5), not 15116.
- **app-ground-atmosphere #4**: "The ground seam is a tile restart" is unproven. The seam is the body gradient below the field.

## Appendix B: held rows (PLAUSIBLE or unconfirmed)

These audit findings did not reach CONFIRMED or AMENDED. They are kept for re-probe and are not counted in the totals.

#### UIA-V-H1 · LOW · dock-color-input · Entering propose mode can scroll the page (focus without preventScroll), clipping the dock top

- **source** audit #16 · **verdict** PLAUSIBLE · **state** propose mode · **where** ColorInput.vue:263 requestAnimationFrame(() => inputColorRef.value?.focus())
- **frame** `dock-color-input/` First-run evidence only, since overwritten (logged scrollY 19, input y -1; the dock top was cut in the then-08 frame). Not reproduced in the second run (scrollY 0). PLAUSIBLE.
- **observed** Once, the rAF focus scrolled the document 19px and pushed the in-flow dock band partly off the top edge.
- **expected + canon** Focusing chrome never scrolls the page.
- **owner** **CONSUMER**: CONSUMER demo/shell/dock/ColorInput.vue:263
- **fix shape** focus({ preventScroll: true }).
- **confirm** I can neither confirm nor refute this. The only evidence frame was overwritten. The surviving propose row (log 34) has scrollY 0, and 08 shows the dock fully on screen. The code path exists (ColorInput.vue:263, rAF focus() with no preventScroll), so the one-line fix is harmless. Keep it LOW and PLAUSIBLE.

#### UIA-V-H2 · LOW · extract-view · Copy and readout: 'Tap to sample' shows on desktop, and the sampled value truncates at 390

- **source** audit #14 · **verdict** UNCONFIRMED (the confirm seat returned no verdict for this finding) · **state** eyedropper open / pinned · **where** demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:35-37
- **frame** `extract-view/` eyedropper__1440__light.png, pinned__390__dark.png
- **observed** A mouse user sees 'Tap to sample'. At 390 the pinned readout is cut to 'oklch(78.23…', which removes the value the tool exists to produce.
- **expected + canon** Pointer-appropriate copy ('Click or tap to sample'), and the full value readable, wrapping or placed in a second line under the bar.
- **owner** **CONSUMER**: CONSUMER
- **fix shape** Use neutral copy, and let the readout take its own row at narrow width.

#### UIA-V-H3 · LOW · not-found · The 'ONE VISIBLE route H1' does not appear in any frame (PLAUSIBLE; the probe was blocked)

- **source** audit #11 · **verdict** PLAUSIBLE (unresolved) · **state** all not-found states · **where** App.vue:66
- **frame** `not-found/` 1440-light-01-unknown.png (the band above the plate is empty; scratch crop checked), 1440-dark-06-admin-refused.png
- **observed** The DOM has exactly one h1, 'Not Found', with a non-zero box, and the pane title is an h2. The App.vue comment requires a visible uppercase 13px route caption above the plate, but none is visible in any capture. The follow-up probe (probe.mjs) could not run because :9000 stopped answering.
- **expected + canon** App.vue:60-65 (gate A5): one visible route H1 inside <main>.
- **owner** **CONSUMER**: CONSUMER — demo/color-picker/App.vue:66 (h1.route-title) and :573-583 (its style)
- **fix shape** Re-probe the computed rect, opacity and stacking of #route-title once the server answers. If it is hidden, restore it, or rule the pane title the visible H1 and drop the duplicate.
- **confirm** A crop of the band above the plate in 1440-light-01 (y 350-530 CSS) shows plain ground with no uppercase caption. App.vue:66 and its style (:573-583) declare a visible 13px uppercase --ink-muted caption. However, capture-meta.json records h1 [{text:'Not Found', vis:true}], so the node has a box but no paint in any frame, possibly an overture/opacity state or occlusion. Neither refuted nor confirmed without the blocked probe. Also: 13px of --ink-muted uppercase text on a pink watercolor ground would be faint anyway.

## Appendix C: instrument and evidence notes (confirm seats)

- **dock-profile-menu · miss #5** [NOTE · audit record] The evidence record should cite the rerun logs, not the first-run log, for light-1440: In capture-log.txt:7 and :13, the first-run light-1440 'menu-open' and 'admin' states read trigger='Login' and a 404, so that run did not reach those states. capture-log-rerun-light1440.txt and capture-log-rerun-admin.txt are the valid sources.
- **dock-profile-menu · miss #6** [NOTE · audit record] The cited line numbers have drifted since capture: HEAD is now ce391643. 69c0d255 removed the variant lines, so ProfileSection lines shift by 1 to 3. The useSlugMigration catch is now :124-137, with setError at :134-137.
- **palette-scene-actions · miss #6** [INFO · AUDIT] Evidence gap: the light-1440 Remix/Save frames are script failures, not product states: capture-log-light-1440 steps 16 and 17 have ok:false. The seat click was blocked because the version drawer was left open (no double Escape in that run), and the frames are ERR-prefixed. The Remix and Save findings rest on the dark-1440 and 390 runs only. Re-capture light-1440 16 and 17 after closing the drawer.
- **palette-card-menu · miss #5** [INFO · n/a] Tree drift since the audit: At confirm time value.js was at 1dac53fb with 6 dirty files and glass-ui was at 6433284a with 3 dirty (the audit cited 1c1f1f67 with 0 dirty). All glass HEAD citations were re-verified at 6433284a.
- **flag-report-dialog · miss #3** [LOW · AUDIT EVIDENCE — capture.mjs] The failure-verdict frame does not show the failure verdict: The 3d frames were captured during the 429 retry backoff, before the dialog closed. The 'Report failed: …' rail on the card was never captured, so its look (tone, voice, wrap at 390) is unaudited. A later 3e frame after the retries settle is needed. 3d-submitted-fail-*: dialog metrics present, form empty, no verdict rail
- **extract-view · miss #4** [LOW · AUDIT] Evidence labelling: zonehover__1440__dark.png is a processing frame, not a loaded-hover frame: The frame shows the empty 'Upload image' zone with black skeleton slabs. It cannot support the loaded-hover dashed-edge or SAMPLE-chip claim; k12__1440__light__full.png does show both.
- **mix-view · miss #5** [LOW · AUDIT] Coverage gap: no 390-dark palettes frames and no dock-flow frames at all (server starvation): The findings above are not verified in 390-dark, and the dock Tools→Mix/Copy/Clear duplication claim is source-only. A re-capture is owed once :9000 is healthy.
- **gradient-view · miss #4** [INFO · audit record] Instrument drift: glass-ui HEAD moved during the audit: The audit recorded glass-ui at ddf6385a, but it is now 6433284a dirty=4. Any glass relay from this page should cite the current producer source. Both GLASS owner calls in this audit were written against stale assumptions: EasingPicker already has surface='bare', and Chip cell is already radius-card.
- **admin-users · miss #7** [LOW · AUDIT evidence (au-shoot.mjs run bookkeeping)] Evidence provenance: meta-1440-light.json does not match the frames it indexes: A later failed run overwrote the 1440-light meta. Its frame entries carry only doc width, so the 1440-light measurements cited in findings (buttons attrs, rows 6px, focus ring) are not re-readable from the file named. The same fields were verified from the 390/1440-dark metas. Write meta per run-sha (meta-<vp>-<theme>-<sha>.json) so a failed rerun cannot clobber the evidence.
- **admin-names · miss #4** [INFO · PROCESS] The audit's glass baseline is stale: Glass HEAD is now 6433284a with 4 dirty files, not ddf6385a clean. The 'cured at HEAD' claims (Skeleton.vue:59-66, dialog/styles.css:19-25) still hold at 6433284a. The skeleton defect in 7.0.0 is a scoped [data-v] specificity win (0,2,0 over .rounded-full), not only unlayering.
- **admin-audit · miss #4** [INFO · CONSUMER package.json:88 (@mkbabb/glass-ui ^7.0.0, 7.0.0 installed)] The glass cure for the opaque field does not reach value.js without a dependency bump: The captured Input class 'field-control glass-defined' is the 7.0.0 register, and glass HEAD emits 'field-control glass-control-edge'. The relay letter should state that the value.js side of any glass routing is a version bump.
- **admin-flagged · miss #5** [INFO · AUDIT — re-run capture.mjs for 1440-dark, 390-light and 390-dark once :9000 answ] Capture integrity: sans webfont (Plus Jakarta Sans) appears unloaded in the 1440 frames (subtitle 'Review reported palettes.' and dialog text in a Helvetica-like fallback); 390-dark missing, 1440-dark/390-light partial, m-signed-out lost: a-empty-390-light, c-reports-1440-light, h-confirm-dialog-1440-light; manifest-390-light.json has no metrics
- **admin-tags · miss #5** [INFO · audit gap] The signed-out register is unverified: Because of capture gap (a), the EmptyState variant=error at :34-40 was never rendered. Its styling and the header hierarchy in the signed-out state were not audited. Re-capture with a fresh boot and no token once :9000 answers.
- **pane-plates · miss #4** [LOW · audit hygiene] Line-number drift in the audit's cites at HEAD ace3a5d7: PaneErrorPlate detail is at :70 (cited :66). ErrorBoundary focus is at :102 (cited :104). ErrorBoundary message default is at :63 (cited :69). PaneErrorPlate message is at :26 (cited :25). The glass tree also moved from 79c3601b to 6433284a (3 dirty).
- **pointer-debug-overlay · miss #1** [LOW · AUDIT] Audit misreports its own probe as not run: probe-focus__1440.png and probe-click-header__1440.png exist (mtime 12:41) in the evidence dir. The probe ran at 1440 and died before 390, so probe-focus-occlusion.json was never written. The 1440 frames refute the 'no focus ring' claim and confirm that a 1440 header click toggles the panel. The page text should say the probe was partial, not that it never ran.

## Pages not audited

**None.** The computed task listed all 37 value.js pages as "not audited", but every one has an audit and a confirm result (see the per-page table), with frames under `ui-evidence/value/<page>/`. That list looks miscomputed. It is probably the pre-audit page manifest, not the set difference. Partial coverage gaps inside audited pages are recorded in Appendix C. Examples: mix-view has no 390-dark palettes frames; admin-flagged 1440-dark and 390 need a re-run; the admin-tags signed-out view is unverified; dock-slug-edit-layer has no migrate-dialog branch.

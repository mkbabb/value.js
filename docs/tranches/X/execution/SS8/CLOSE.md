# SS-8 CLOSE: the UNPROVEN-NEEDS-LIVE visual-audit slot (value.js)

**SERVED MODEL:** `claude-opus-5-5` (Opus 5.5), the model ID in this seat's own system prompt.
**Seat:** SS-8 CLOSE · 2026-10-20 · authority: `docs/tranches/X/EXECUTION-RUNBOOK.md` §4.1, dispatched by COHESION §0gd.4.
**Law carried:** statuses travel verbatim. A cure never upgrades a row: a REFUTED row stays REFUTED and its cure is stated beside it, and an UNPROVEN row stays UNPROVEN with its measured reason. The adjudicated registry records are untouched (E-3). Every verdict below is read from this slot's own packets (`packets/*.md`), and nothing is re-judged by transcription.
**Instruments (repeatable, read-only over the packets):** `tools/close_tally.py` re-counts each packet's verdict table, `tools/close_refuted.py` maps every REFUTED row to its `## cures` line, and `tools/close_tables.py refuted|unproven` renders the two tables in §5 and §6.

## 1. Verdict

**The SS-8 slot is SWEPT, with residue.** Every one of the 751 inventory items, and every record of the 14-record zero-residue cohort, holds a verdict from a live witness or a named reason why none could be taken. The slot is **not GREEN**:
- **257 rows stay UNPROVEN** (233 residue + 24 cohort), each with its measured reason in §6. Most were starved of a browser slot: the guard was not admitted, the WebKit lock was not granted, or `:9000` had stalled. A smaller set need hardware: real Safari, an iOS device, a WHCM host or a screen reader.
- **The REFUTED rows that carry live defects are routed**, not cured here (§4).
- **The CLOSE re-read of the cure falsifiers is not uniformly GREEN x2** (§8):
  - All 36 vitest cure files are GREEN x2, and so are the api vote falsifier and 10 of 16 e2e specs whole.
  - **B19 R-13 (SS8-0537)** reads RED on today's served tree, which carries an uncommitted glass-ui 10.1.0 → 10.1.1 bump.
  - **Z-ColorPicker-14** reads RED on committed bytes.
  - B05 0132 sits at its floor.
  - The other gaps are timeouts and frame detaches under load. They are recorded as such, not as verdicts.

§4.1's condition is met: *"SS-8 may not be called complete until this cohort is swept"*. The cohort is swept (§3). "Complete" in this file means swept and dispositioned. It does not mean that every row reads PROVEN or REFUTED.

## 2. Totals, reconciled to the inventory

The unit is the verdict row. Four packets split composite items into limbs so that no undecided limb rides on a decided verdict, which is why the row count and the item count differ.

| batch | items | rows | PROVEN | REFUTED | UNPROVEN | reconciliation note |
|---|---|---|---|---|---|---|
| B01-picker-canvas | 27 | 27 | 11 | 5 | 11 | |
| B02-picker-sliders-debug | 32 | 31 | 15 | 5 | 11 | 1 item DISCHARGED (carried verbatim, not an UNPROVEN item) |
| B03-hero-atmosphere | 26 | 26 | 6 | 15 | 5 | |
| B04-dock-profile-menus | 35 | 35 | **6** | **10** | **19** | the packet's header tally (7 · 12 · 16) disagrees with its own verdict table. This CLOSE counts the table (`close_tally.py`), which matches the 10 REFUTED rows its cures section locks |
| B05-dock-actionbar | 34 | 34 | 12 | 17 | 5 | |
| B06-dock-toolbar-status | 33 | 33 | 5 | 14 | 14 | |
| B07-pane-shell | 31 | 31 | 6 | 13 | 12 | |
| B08-shared-feedback | 32 | 32 | 6 | 6 | 20 | |
| B09-about | 26 | 30 | 11 | 11 | 8 | 0255 → a/b/c, 0257 → a/b, 0261 → a/b (+4 rows) |
| B10-browse | 32 | 32 | 11 | 16 | 5 | |
| B11-browse-search-dialogs | 31 | 31 | 7 | 13 | 11 | |
| B12-card-shell | 29 | 29 | 3 | 20 | 6 | |
| B13-card-swatches | 29 | 29 | 6 | 18 | 5 | |
| B14-card-grid-skeleton | 24 | 24 | 5 | 10 | 9 | |
| B15-palettes | 29 | 29 | 13 | 8 | 8 | 0439 NOT TRUTH-APT, counted UNPROVEN. 0447 is split U-8 UNPROVEN / U-9 REFUTED and counted UNPROVEN |
| B16-palette-dialogs | 26 | 26 | 5 | 10 | 11 | |
| B17-admin-shell-names | 32 | 32 | 7 | 16 | 9 | |
| B18-admin-panels | 27 | 27 | 11 | 14 | 2 | |
| B19-color-chips | 27 | 31 | 17 | 10 | 4 | 0536, 0551, 0554 and 0559 are each split into a/b (+4 rows) |
| B20-gradient-visualizer-code | 29 | 29 | 8 | 12 | 9 | includes the 12 prose-carried R-1..R-12 |
| B21-gradient-easing | 28 | 28 | 0 | 2 | 26 | the browser pool was wedged for the whole witness |
| B22-gradient-specimen | 14 | 14 | 5 | 8 | 1 | |
| B23-mix-canvas-result | 27 | 27 | 11 | 9 | 7 | |
| B24-mix-config | 34 | 34 | 8 | 21 | 5 | |
| B25-extract-inputs | 28 | 28 | 10 | 13 | 5 | |
| B26-extract-generate-panes | 29 | 29 | 9 | 15 | 5 | |
| **residue total** | **751** | **758** | **214** | **311** | **233** | 751 − 1 DISCHARGED + 4 (B09) + 4 (B19) = 758 rows ✓ |

The inventory total is 751 = 739 parsed from the value.js §UNPROVEN sections (78 records) + 12 prose-carried (`wb-gradient-visualizer` R-1..R-12). That matches §4.1's ~751. Summing per-batch items gives 751 ✓.

| zero-residue cohort | records | derived obligations (rows) | PROVEN | REFUTED | UNPROVEN |
|---|---|---|---|---|---|
| Z1-app-chassis | App · Dock · chassis-fitness · layout-gestalt | 49 | 31 | 14 | 4 |
| Z2-picker-cohort | ColorPicker · ColorInput · ColorSpaceSelector · ConfigSliderPane | 67 | 32 | 30 | 5 |
| Z3-workbench-about-cohort | GenerateControls · GradientStopEditor · Markdown | 63 limbs over 48 items | 17 | 36 | 10 |
| Z4-admin-library-parser | AdminUsersPanel · library-band · parser-band | 62 | 26 | 31 | 5 |
| **cohort total** | **14** | **241** | **106** | **111** | **24** |

The cohort carries no §UNPROVEN section, so its rows are obligations each seat derived from the record. They are not part of the 751. **Overall: 999 verdict rows, of which 320 are PROVEN, 422 REFUTED and 257 UNPROVEN.**

## 3. The zero-residue cohort: swept (yes/no per record)

| record | swept | batch · witness commit | note |
|---|---|---|---|
| App | **yes** | Z1 · `709a560b1` | `:9000` hung, so the witness ran on the built artifact |
| Dock | **yes** | Z1 · `709a560b1` | the delta-r3 `Dock.worker-O.md` sibling is folded |
| chassis-fitness | **yes** | Z1 · `709a560b1` | |
| layout-gestalt | **yes** | Z1 · `709a560b1` | |
| ColorPicker | **yes** | Z2 · `0a15889cb` | Chromium. WebKit cells (Picker-22, -24) stay UNPROVEN |
| ColorInput | **yes** | Z2 · `0a15889cb` | |
| ColorSpaceSelector | **yes** | Z2 · `0a15889cb` | |
| ConfigSliderPane | **yes** | Z2 · `0a15889cb` | |
| GenerateControls | **yes** | Z3 · `120572d97` + `83e50cb71` | |
| GradientStopEditor | **yes** | Z3 · `120572d97` + `83e50cb71` | G9 WebKit coarse cell witnessed at `83e50cb71` |
| Markdown | **yes** | Z3 · `120572d97` + `83e50cb71` | |
| AdminUsersPanel | **yes** | Z4 · `2daaa45f4` | the delta-r3 `AdminUsersPanel.worker-F.md` sibling is folded |
| library-band | **yes** | Z4 · `2daaa45f4` | |
| parser-band | **yes** | Z4 · `2daaa45f4` | |

All 14 records are swept, with 14 of 14 marked yes.

## 4. REFUTED rows: cures, routes, O-row candidates, owner rulings

A REFUTED row falls into one of three dispositions:
- **(a) cured in code by an SS-8 cure seat.** The commit is named, and the falsifier went RED x2 then GREEN x2.
- **(b) already cured at HEAD.** The record's figure or premise describes an earlier tree. Most of these rows are locked by a mutant-RED / GREEN pin, and the no-change dispositions say so.
- **(c) routed.** The row still carries a live defect, and the cure belongs to a wave, to glass or to the owner.

Every row's own disposition is in §5.

### 4.1 Code cures landed by the SS-8 cure seats (category a)

| batch | rows cured in code | commit(s) |
|---|---|---|
| B01 | SS8-0012 (dot position in `@layer components`) · SS8-0019 / 0025 (8-bit ties-to-even, M-9) | `d386d18bc` · `a40ab6613` |
| B02 | SS8-0035 (`none` resolved on the outward colour strings). Its live in-app witness stays UNPROVEN because `:9000` was down | `d9f16d5f7` |
| B03 | SS8-0063 (AP-5 strips through the field's derive-seam guarantee) | `eefb2d0b2` |
| B05 | SS8-0125 · 0146 · 0133 · 0140 · 0132. 0132 has RED x1 only: it did not reproduce on the later tree, so its second RED stays UNWITNESSED | `6b3bb6dde` |
| B06 | SS8-0162 (status lamp band ink) · SS8-0165 (2-beat pulse, 4.8 s) | `9e0e827f8` |
| B07 | SS8-0192 · 0197 (PaneHeader's dead T.W3-4 veil deleted) | `8f4822853` |
| B08 | SS8-0241 (error-plate detail on the strong muted rung) · SS8-0231 pin | `365875b3e` · `b89a93a50` |
| B09 | SS8-0257b · 0259 (`contrastInkFor` total; dark ink over the brightest stop) · SS8-0267 · 0272 (FadingScroll formula; destructive KaTeX error ink). `8cd46d136` restored the lazy KaTeX that `f18313ef0` had reverted | `6cae41f07` · `f18313ef0` · `8cd46d136` |
| B10 | SS8-0291 (one page turn per load) · SS8-0285 (strip is a colour surface) · SS8-0288 (vote button type token) | `6aa74e30f` |
| B11 | SS8-0309 (the report dialog opens after the menu hands focus back) · SS8-0319 / 0323 (field-aware marker ink). The pixel re-measure for 0319 / 0323 is UNPROVEN | `92942388e` |
| B12 | SS8-0350 · SS8-0366 client + api · SS8-0363 (prefers-contrast: more under `.pane-wrapper`) | `b35bfbbc8` · `96bf338d5` · `784c7a500` |
| B12 (blockedByDirty, landed) | SS8-0342 WHCM limb: `data-color-surface` on the strip root, landed with B10's hunk (see §7) | `6aa74e30f` |
| B13 | SwatchHoverMenu U-3 / L-1 (wrapper is a flex container; baseline reserve 5.97 → 0 px) | `bcf8c17b2` |
| B14 | SS8-0404 (single-root inspector) · SS8-0408 (skeleton ink register on `--ink-seam`) | `88b762da0` · `63436369f` |
| B15 | SS8-0442 (grid `contain: layout style`; ring on four edges) · SS8-0445 (named menu triggers) | `aa47c2553` |
| B16 | SS8-0454 (held Enter swallowed) · SS8-0471 (version drawer aborts its read) | `6a3d72fc6` |
| B17 | SS8-0487 (skeleton column = live text stack) · SS8-0504 (names swatch forced-colors surface). SS8-0483 is cured at the token root by B14's `63436369f` | `4c4506b9a` · `b43de3e18` (falsifier) |
| B18 | SS8-0532 (nameless tags dropped at the wire) · SS8-0533 (kept-alive Tags re-read) · SS8-0514 gap limb, with the height limb re-armed in §7 | `bd868414a` |
| B19 | SS8-0537 · 0546 · 0554a (chip.css: opaque specimen well + outset `--card-edge` outline) | `4f6116d49` |
| B21 | SS8-0612 (stale producer-shape prose struck) | `08a96102d` |
| B22 | SS8-0620 (captions on the strong de-emphasis rung) · SS8-0631 (Chip `surface="veil"`) | `962789bad` |
| B23 | SS8-0639 (`release()` finds the canvas when `getContext` is null) | `4b8e889f7` |
| B24 | SS8-0678 (add-slot stroke at the 3:1 floor) · SS8-0684 (MP-4 roster). `af35c4ddf` returned the other seat's swept hunks | `8ab3b8290` |
| B25 | SS8-0705 · 0713 · 0715 · 0721 · 0722 (eyedropper modal, loupe re-projection, dashed-well edge, O-18 hook) | `605daabe7` |
| B26 | SS8-0741 (seed line primary ink) · SS8-0726 (eyedropper polite status) | `48392f8c5` |
| Z1 | Z-Dock-5 · Z-Dock-10 · Z-chassis-2 / 3 · Z-LG-3 / 4 / 5 / 6 · Z-Dock-13 consumer half | `fe398ede2` |
| Z2 | Z-ColorInput-1 (BANK-1: the field reads the parse Result) | `28397f458` (falsifier) · `ba202df7f` (guards) |
| Z4 | Z-library-band-11 (`path.ts` split, R-T1 ratchet) · Z-parser-band-3 (non-string guard at all nine `./css` entries) | `3dc9294f4` · `91f96b06a` |

The following batches have no new product code. Every REFUTED cure in them had already landed, and is locked by falsifiers:
- B04: `52e916e70`
- B20: `83a69d695`
- Z3: `61c3324cd`

### 4.2 Glass O-row candidates (for the orchestrator's mail; glass-ui is READ-ONLY to this slot)

| source row | defect at the producer (glass 10.1.0) |
|---|---|
| B03 SS8-0068 | the Slider root lets `aria-label` fall through (a dual label on root and thumb) |
| B03 SS8-0075 | the 30 %-α slider focus ring is under 3:1 in both schemes |
| B03 SS8-0073 | a config write does not wake a demand-parked `<Blob>` |
| B06 0157 | the dock ring `color-mix(--focus-ring-color 48%, transparent)` is under 3:1 |
| B06 0168 | the resting dock-select trigger ink (80 % mix) is 4.23:1 on the light band |
| B06 0173 | the dock select content overlaps the plate by 14.05 px |
| B10 0299 + 0301 | PopoverContent has no height contract: no `max-height`, and `--reka-popover-content-available-height` is not read. Already named **O-59** |
| B13 V-3 / L-4 | the focus-ring outline at `--ink-perimeter` 0.48 measures 2.15:1 on translucent grounds |
| B14 0412 | Skeleton breathe/shimmer ignores `--skeleton-shimmer-delay`, so the consumer's stagger is dormant |
| B15 0442 residue | the focus-ring utility's 48 %-alpha ink. Not re-measured after the four-edge cure |
| B17 0483 limb | first-class skeleton-ink tokens: glass's Skeleton reads no `--skeleton-*` seam |
| B17 0489 | the segmented indicator box is taller (+5.14 px) and lower (+5.19 px) than the active button (the D-3 BH relay) |
| B20 R-7 (SS8-0583) | no `./accordion` subpath, so the consumer's root-barrel import cannot narrow |
| B24 0674 (R-MP3) | the Button disabled recipe is ink-alpha only, with no forced-colours disabled delta. From a PROVEN row: R-MP6 SegmentedTabs at 24 px coarse |
| Z1 Z-Dock-4 | layer activation does not honour a consumer entry-focus target |
| Z1 Z-Dock-13 readback | GlassDock's `backgroundCanvas` getter returns null when unbound, which defeats the sampler's `[data-glass-field-canvas]` default. With the canvas bound, the sampler reads an empty backing store and does not fall back |
| Z1 Z-Dock-16 | DockLayerGroup has no inline-size morph (it composes DockCrossfade reserve=block and exposes no reserve prop) |
| Z1 Z-LG-7 | no `pointer: coarse` rung on DockTrigger / tab DockControl |
| Z2 Z-ColorPicker-9 | CardHeader `shrink` reads only `.card-scroll-host`, so it needs a document-scroller source. The alternative is an owner ruling for a bounded stage host below `lg` |
| Z2 (named O-rows touched) | B-3 label-id / valuetext prop-through (CSP-2, CSP-7) · B-4 `.glass-well` (CSP-13) · Blob dark-tone (Picker-23) |
| Z4 Z-AdminUsersPanel-22 | Button disabled treatment, which computes no disabled channel (**I-20**). From a PROVEN row: AUP-5, the `xs` rung's touch target |

Two relays are discharged, with nothing to send:
- B12 0353: sub-content now carries `max-height` and `overflow`.
- B18 0531 ATP-23: glass ships `glass-chip.css`.

### 4.3 Owner-ruling and owner-act rows

| row | the question |
|---|---|
| B02 SS8-0054 | **OWNER ACT**: record the actual deploy source. The served `index-DJ8Ije_5.css` is not the gh-pages tree at `17c10267f` |
| B02 SS8-0039 | the range caption at `opacity-60`: a consumer cure or a glass O-row |
| B03 SS8-0061 | the SelectContent material α 0.22 / 0.26, a material ruling |
| B03 SS8-0085 | the hero overscan overhangs 390 by about 18 px. Options are T-30 bead placement (owner-judged) or moving the clip. Routed to **X-W6** |
| B05 SS8-0140 | the 390 phone Tools seat is icon-only by design. Confirm |
| B10 0300 (R-3) | re-grade SFB-23 (the glyph passes 1.4.11 at 4.19 / 5.65:1) |
| B13 V-3 / L-3 | the attribution ink. A `--muted-foreground-strong` trial reached 4.44:1 and was reverted. Reaching 4.5:1 reverses the X-DS P9R-04 meta-rung ruling |
| B15 SS8-0440 | must elevation read the same in both schemes? If yes, a scheme-aware `--well-bg` lift token at `foundation.css:407` |
| B15 0422 · 0444 | proportion re-banks (tray 50.0 %, specimen 1.26:1). No binding law (K-5) |
| B24 0669 (R-9) | the machine firewall, not the code, keeps `host: true` off the LAN |
| B24 U-11 | carried by the packet as needing an owner ruling |
| B22 U-1 residual · B09 SS8-0259 family | bare `--ink-muted` is certified exactly at 4.5:1 against the light field-mean referent, so captions over darker field regions fall under. This is the app-wide referent law and needs the orchestrator's route |
| Z4 Z-library-band-17 + the band's landed rows | **OWNER ACT**: publish 4.1.0. The registry latest is 4.0.0, and the band's REFUTED rows ship at the dated cut (X-W9.f) |

### 4.4 Wave and upstream routes

- B07 SS8-0215 → **X-W8**: `SESSION_PORT_KEY` moves to `platform/auth/`.
- B12 SS8-0348 → next library publish + `api/package.json` bump. The published 4.0.0 parser admits `rgb(1 2 3 / )`.
- B12 SS8-0357 / 0358 → **X-W7**: the AP-9 visibility family, and lazy per-row portals (K-14).
- B12 SS8-0360 → upstream reka (AP-14, the searchRef typeahead guard).
- B10 0287 → record-only. X-W7 G11 is conditional on a caster returning.
- B19 SS8-0558 → **X-W9.f**: the dated 4.1.0 cut.
- B20 R-4 (SS8-0580) and the R-15 desktop limb → **X-W6.b** (GV-19 frame).
- B24 SS8-0671 (MC-7) / 0673 (DD-1) → **PKT-3 / X-W6.j / MX-CLUSTER**. Both live attempts were reverted. SS8-0692 → W-HYGIENE (U-8 / L-13).
- B08 SS8-0245 → the record's wave owns the structural containment. The 90.6 % figure is retired: 45.6 % served.
- Z2 Z-ColorInput-5 → PR-12 (the 24×24 send seat). Z-ColorPicker-7 (PROVEN) owns deleting the contenteditable write path.
- Z3 Z-Markdown-8 (Chromium cell PROVEN) → the content-visibility rung at `Markdown.vue:106-111` is left to its owner.
- B05 observation (not a row): the T-36 HTML-comment separator in `ActionBarToggle.vue` is resolved. The separator was deleted by `fe398ede2` (Z-Dock-10, main-layer separators deleted), and the file is clean at HEAD.

## 5. Every REFUTED row and its disposition

Rendered by `python3 -I tools/close_tables.py refuted`. Each disposition is the row's line in its packet's `## cures` section, cut at about 230 characters; the packet is the full text. When a packet disposes of a row only in a grouped or ranged cures line, or only in its verdict cell, the generator's `MANUAL` / `ZGROUP` tables record that reading by hand. Their wording is the packet's own.

The Z3 table lists the 30 verdict-table rows. The packet's limb tally counts 36 REFUTED limbs, because some rows carry several limbs, and all 36 are locked by `61c3324cd` or live-witnessed per its cures section. The residue total stays 311.

#### B01-picker-canvas — REFUTED 5 · cure commits: d386d18bc a40ab6613

| row | disposition (packet `## cures`) |
|---|---|
| SS8-0010 | REFUTED · **None owed.** HEAD already derives `--readout-lines` = 1, so the residual has no subject. No falsifier was written: no defect means no RED-before. A pin of `readoutLineCount("oklch",…) = 1` would be a snapshot, and `tes… |
| SS8-0012 | REFUTED · **Cured at the root, structurally.** The dot's `position: relative` default moves out of the unlayered `.watercolor-swatch` rule and into `@layer components` (`demo/shared/ui/watercolor-dot/WatercolorDot.vue`). A consume… |
| SS8-0019 | REFUTED · **Cured in the library (M-9), with no public API change.** `roundHalfEven` in `src/color/operations.ts` had a tie window of `EPSILON· · v |
| SS8-0025 | REFUTED · Same root and same commit as SS8-0019. Neither 295 nor 747 reproduces. The 1392 is 1367 from the rounding mode plus 25 from drift, and the drift part is now zero against the exact reference. · as SS8-0019 |
| SS8-0026 | REFUTED · **None owed.** The fix landed at `49306a1d0`. A re-check at this seat found that `e2e/smoke/oracles/o18-contrast-census.spec.ts` has three `plate-caption` hits, all of them rationale comments (`:693-696`), and no `locato… |

#### B02-picker-sliders-debug — REFUTED 5 · cure commits: d9f16d5f7

| row | disposition (packet `## cures`) |
|---|---|
| SS8-0035 | **Code, consumer root.** `demo/color-session/picker-color.ts` exports `resolveMissingChannels` (the existing `withResolvedMissing`, CSS Color 4 §4.2: `none` is zero once converted). `demo/color-session/useColorPipeline.ts` builds … |
| SS8-0041 | No code change. Retire the record's negative-clearance premise (−0.51/−0.76 px) and its ~2px/side filter-bleed attribution: HEAD measures +1.08/+1.09 px rest clearance, no grown hover/pressed state, and 0 px bleed (`E/d2-06-bleed.… |
| SS8-0052 | No code change. Quotable HEAD numbers: header **278×26**, button **83.3×36**, overlay tab ordinals **28-31 / 31**, liveRegions **0** (`E/p3-debug.json` `u1_u2_keyboard_measure`). Occlusion %, composited colour, AX dump, RTL and th… |
| SS8-0053 | No code change. Keep only D-N10's static GATE-ONCE half (row 35). The dynamic flag-drop limb is not reproduced on the dock path (`E/p4-followups-u3_dock_nav.json`: `?debug=1` survives Home → Gradient → Home and a reload, `useViewM… |
| SS8-0054 | No code change. Production currency is the served manifest `index-DJ8Ije_5.css` (both color.babb.dev and mkbabb.github.io/value.js), not the `gh-pages` tree at `17c10267f` (`index-DS-0HlXP.css`) (`E/u4-manifest.txt`). Recording th… |

#### B03-hero-atmosphere — REFUTED 15 · cure commits: eefb2d0b2

| row | disposition (packet `## cures`) |
|---|---|
| SS8-0060 AuroraPane U-1 (AP-13) | no change needed · Cure already landed (X.W7.g / X-DS re-composition). The REFUTED witness `A-atmosphere.json .light/.dark.labels` stands. |
| SS8-0061 U-2 (pass-1 D-2) | The SelectContent material α 0.22/0.26 (SS8-0061) is an owner-ruling on material, not a cure. [from the packet's REFUTED owner index] |
| SS8-0063 U-4 (AP-5) | **CURED** · `eefb2d0b2` · `guaranteeSeamOffset` moved out of `useAtmosphere.ts` into the pure `atmosphere-calibration.ts`, behind `resolveAtmosphereField(atoms)`. The WebGL field getter, the CSS fallback / D6 referent (`resolvedPa… |
| SS8-0066 U-7 (AP-10) | no change needed · Already landed (one label column, V1C-05). Witness `A-atmosphere.json .light.triggers/.coarse390/.narrow320`. |
| SS8-0069 U-10 (AP-1) | no change needed · Figure drift. The AP-1 composition rides the X.W6.j scene contract and is not decided by this number. |
| SS8-0071 BlobPane D-6 (consequence limb) | no change needed · Already landed (spectrum variant retired). Witness `B-blob.json .forced`. |
| SS8-0073 BlobPane 13-untracked wake shape | A config write does not wake a demand-parked `<Blob>` (SS8-0073). [from the packet's REFUTED owner index] |
| SS8-0074 BlobPane live-only magnitudes | no change needed · Figures drifted. The underlying rows keep their dispositions. |
| SS8-0076 BlobPane `/#/blob` 200 %-zoom arm + threshold | no change needed · Already landed (`defaultPaneIndex`). Witness `B2-blob-wake.json .routes`. |
| SS8-0079 heroblob D-3 park timeline (last change 7000 / firs… | no change needed · Already landed (X.W12.d settled seam). Witness `H-hero.json .timeline`. |
| SS8-0080 heroblob D-9 537 ms long task → emerge re-measure | no change needed · Nothing is owed on the emerge seam. The boot-side long tasks remain unowned (not booked here). |
| SS8-0081 heroblob D-11 forced-colors "single most chromatic … | no change needed · The claim is refuted outright. No defect. |
| SS8-0082 heroblob C-7 branch | no change needed · Already landed (X.W12U.b re-derivation). Witness `O12-3-spec.log`. |
| SS8-0084 heroblob L-1 production-chunk landing | no change needed · Already landed (X-W2.a blob-config repoint). Witness `G-ghpages.json`. |
| SS8-0085 heroblob 404/blob bleed attribution | **ROUTED → X-W6** (geometry / owner design) · none · The 404 limb is REFUTED and that row is dead. The live residual: at 390 on `#/` and `#/blob` the hero's 1.6× overscan canvas overhangs the viewport ([228,408] > 390, about 18px)… |

#### B04-dock-profile-menus — REFUTED 10 · cure commits: 52e916e70 (falsifiers)

| row | disposition (packet `## cures`) |
|---|---|
| SS8-0089 | **Already cured.** The twin certifies the raw pick once, on the floating rung (`MobileMenuDropdown.vue` `menuInk`). Re-certification is idempotent. No drift row remains; the L-6 single-owner carve (X-W8) stays an ownership/naming … |
| SS8-0091 | **Already cured** (UIA-V-18/22/71, `b41731371`). The GitHub row is the `DropdownMenuItem @select=openRepository`, with no inner anchor. · "SS8-0091 · 0108 · 0097 …" ×2 twins · `expected 1 to be +0` (nested `<a>`), both twins |
| SS8-0092 | **Already cured** (UIA-V-21/215/227, `d8b8e063b`). The admin identity is a menu with Switch account and Sign out of admin. Sign out reaches `adminLogout`. · "SS8-0092 …" ×2 twins · desktop: `no open menu` (inert pill). Mobile: `ex… |
| SS8-0093 | **Already cured** (X.W12.e/OA-22). Login is glass `DockControl shape="tab"` (`.dock-tab-button`); Profile, admin and @mbabb are `DockTrigger`. No page Button wash capsule. · "SS8-0093 · 0098 … (out/user/admin)": every band `<butto… |
| SS8-0097 | **Already cured** (UIA-V-18/22/71, `b41731371`). The GitHub row is the `DropdownMenuItem @select=openRepository`, with no inner anchor. · "SS8-0091 · 0108 · 0097 …" ×2 twins · `expected 1 to be +0` (nested `<a>`), both twins |
| SS8-0098 | **Already cured** (X.W12.e/OA-22). Login is glass `DockControl shape="tab"` (`.dock-tab-button`); Profile, admin and @mbabb are `DockTrigger`. No page Button wash capsule. · "SS8-0093 · 0098 … (out/user/admin)": every band `<butto… |
| SS8-0099 | **Already cured** (UIA-V-254/268, `21aeff087`). Dark mode is `DropdownMenuCheckboxItem` (`menuitemcheckbox`, `aria-checked`), with no sun/moon glyph. · "SS8-0099 …" ×2 twins · `expected 'menuitem' to be 'menuitemcheckbox'`, both t… |
| SS8-0101 | **No product defect.** Strike the corpus "near-unblurred" artifact as an input to U-10/N-3. No code change. jsdom cannot paint `backdrop-filter`, so the regression witness is the live probe `probes/B04/desktop2.mjs` stripe-field r… |
| SS8-0107 | **Already cured** (`bd72e216e`). The admin trigger wears `.gold-ink`, the one reader of the per-ground rebound `--ink-gold`, with no inline gold and no shimmer. · "SS8-0107 …" (trigger classes and inline style) + utils.css `.gold-… |
| SS8-0108 | **Already cured** (UIA-V-18/22/71, `b41731371`). The GitHub row is the `DropdownMenuItem @select=openRepository`, with no inner anchor. · "SS8-0091 · 0108 · 0097 …" ×2 twins · `expected 1 to be +0` (nested `<a>`), both twins |

#### B05-dock-actionbar — REFUTED 17 · cure commits: 6b3bb6dde

| row | disposition (packet `## cures`) |
|---|---|
| 0122 · ABL D-1 | None needed: cured before this seat (MISS-5 containment). The collapse numbers are retired. AB-3's transposition is still the structural cure, and it is not attempted here. · o33 "bar-less routes" ×3 (`/atmosphere`, `/browse`, `/e… |
| 0123 · ABL C-3/L-3 | owner-ruling · Re-base on 0 px box overhang at 1440. The faces now resolve against a `position:relative` crossfade, so the `.dock-layer-grid` premise is gone. Any surviving claim must be about painted content overflow, and needs i… [from the packet's REFUTED owner index] |
| 0124 · ABL L-4/D-5/C-9 | owner-ruling · Re-price AB-10 on the HEAD figures: +10 px input toggle, Δw −145.3 on Tools. The `reserve="inline"` cure (X-W8.d) still applies to the mechanism. [from the packet's REFUTED owner index] |
| 0125 · ABL D-13 | `ActionBarLayer.vue` root `gap-0` → `gap-(--dock-layer-gap)` (MISS-1). · o33 0125: root gap = face gap; trailing row→separator air = leading separator→root air; separator→toggle = Back→separator (pointer off the dock) · RED x2: ro… |
| 0129 · ABL C-15/L-5 | owner-ruling · No leak at HEAD. Demote AB-12's leak limb to the stranding/teleport mechanism only. [from the packet's REFUTED owner index] |
| 0132 · ABT D-02/ABT-8 | `Dock.vue` `toolsInk`: the Tools wordmark and glyph ink is `useChromeAccentFn(dockPlate).safeCss(safeAccent, TEXT_CONTRAST_FLOOR)`. That is the band's own floating-rung instrument, the same one the band words and gold use. The res… |
| 0133 · ABT D-08/ABT-11 | `Dock.vue`: `bandInkStyle` sets `--focus-ring-color` to `bandSafeCss(safeAccent, GRAPHICS_CONTRAST_FLOOR)`. A scoped rule re-seats glass's own `--dock-ring-color` hook to `var(--focus-ring-color)` (opaque) on the dock control set.… |
| 0135 · ABT C-3/ABT-1 | owner-ruling · The stale-boot limb no longer reproduces (0/7). Drop it from ABT-1; the PRM and flap limbs stand (rows 0138/0139). [from the packet's REFUTED owner index] |
| 0136 · ABT C-2/D-06/ABT-4 | None needed: the `:inert` interim was already cured, ghost set 0. Re-base on 0. The authenticated admin views are still for X-W8. · Same bar-less guard: CDP `Accessibility.getFullAXTree` has no exposed "Toggle action bar" node · G… |
| 0137 · ABT L-1/ABT-2 | owner-ruling · The mobile entry point exists and Save persists (X.W5.c). Close the discard limb as witnessed-cured. The generic-bar mobile no-op limb is not covered by this probe. [from the packet's REFUTED owner index] |
| 0140 · ABT D-07/ABT-10 | `ActionBarToggle.vue`: `.dock-tools-btn` gets `min-block-size`/`min-inline-size: var(--dock-control-floor, 0px)`, glass's own coarse floor (44 px coarse, 0 fine). The wordmark goes from `v-if="isDesktop"` to `hidden sm:inline`, so… |
| 0143 · ABT L-2 | owner-ruling · T-36 now holds (`8px 12px`, o15 6/6 GREEN live). Retire ABT-6's RED premise. The CI-runs-no-Playwright limb is separate and unwitnessed here. [from the packet's REFUTED owner index] |
| 0144 · ABN U-1 | owner-ruling · No observable leak; no collapse under an open bar. Re-base ABN-1 on the code path (unmount-while-open / prop-close) only. [from the packet's REFUTED owner index] |
| 0146 · ABN U-3 | `GenericActionBar.vue` row: added `gap-(--dock-layer-gap)` (ABN-19). `justify-around` now only shares the slack beyond the gap. · o33 0146: every inter-seat gap ≥ the face's resolved `--dock-layer-gap` · RED x3: gaps 0. GREEN x2. |
| 0147 · ABN U-4 | owner-ruling · Retire the 4.90 / 1.26 table. Dark is 12+:1; light 4.11–4.65 is non-text glyph ink (≥ 3:1 floor, met). [from the packet's REFUTED owner index] |
| 0148 · ABN U-5 | owner-ruling · Moot per K-4. The HEAD figure is 1.31–1.37:1 at opacity 0.5, an inactive component and exempt. [from the packet's REFUTED owner index] |
| 0149 · ABN U-6 | None needed: ABN-10's native-disabled arm was cured before this seat. Closed as superseded. · Existing `demo/test/shell/pane-popups-and-seats.test.ts` "an inoperable seat is a focusable button marked aria-disabled" (`disabled` att… |

#### B06-dock-toolbar-status — REFUTED 14 · cure commits: 9e0e827f8

| row | disposition (packet `## cures`) |
|---|---|
| 0155 · AT-4 | no cure (stale premise) · The seats are DockControl since `c00004924`, so the coarse delta is 0. |
| 0157 · AT-19 | **0157:** the dock ring is `color-mix(--focus-ring-color 48%, transparent)` and reads below 3:1. Cure: an opaque or paired producer dock ring. [from the packet's REFUTED owner index] |
| 0158 · AT-12 | no cure (stale premise) · The crossfade is live, with 15 mid frames each way. X-W8 G-8's RED cell is stale and should be re-read at its wave. |
| 0159 · owner Q | Owner-ruling: 0159, where the owner question's premise is gone. [from the packet's REFUTED owner index] |
| 0162 · DSL U-2 | **RED, before the cure:** `guarded --timeout 15 -- npx playwright test --project=smoke --workers=1 --timeout=90000 e2e/smoke/oracles/o22-status-lamp.spec.ts` (:8090). Results: SS8-0165 measured `lamp-dot-pulse runs 7199.99 ms` aga… |
| 0164 · DSL U-4 | no cure · There is no collision at 1024–1100 at HEAD widths. |
| 0165 · DSL U-5 | **RED, before the cure:** `guarded --timeout 15 -- npx playwright test --project=smoke --workers=1 --timeout=90000 e2e/smoke/oracles/o22-status-lamp.spec.ts` (:8090). Results: SS8-0165 measured `lamp-dot-pulse runs 7199.99 ms` aga… |
| 0168 · DVS | **0168:** the resting dock-select trigger text ink is the 80% mix, which gives 4.23:1 on the light band. Cure: make it opaque, or certify it at ≥4.5:1. [from the packet's REFUTED owner index] |
| 0170 · DVS | no cure (symptom not reproduced) · 0 of 24 cold loads redirected. The structural single-writer cure stays with its wave. |
| 0172 · DVS | no cure (stale premise) · The dark accents span 0.331 OKLab; they are not near-whites. |
| 0173 · DVS | **0173:** the dock select content overlaps the plate by 14.05 px. Cure: offset the content from the plate edge. [from the packet's REFUTED owner index] |
| 0175 · DVS | no cure · The consumer-certified `--ink-gold-glyph` paints, so there is no glass relay (DVS-35). |
| 0178 · GAB U-1 | no cure · Reset restores 90deg at +250 ms. The capture is banked for X.W4.d D4. |
| 0182 · GAB U-5 | no cure (stale premise) · The Tools toggle is visible at 390 on every sampled route. |

#### B07-pane-shell — REFUTED 13 · cure commits: 8f4822853

| row | disposition (packet `## cures`) |
|---|---|
| 0189 · PH-3 | Already cured (A2-VA-L1-2). Regression guard: the `seated` arm asserts at y = 0/64/120/300/max on 6 routes that the title has `transform: none`, its font-size is constant, and `data-condensed` is never `"true"`. Figures struck her… |
| 0190 · C-8(ii) | No code cure. No gate in `e2e/**` is keyed to "≈211 px" (`grep` empty). Any future gate re-bases on 247 px (document) or on pane travel. · n/a, nothing to change |
| 0192 · C-11 | **BEFORE (HEAD `4d5d0dbdc` bytes, worktree vite :8097), ×2:** `SS8-0192/0197 — no stylesheet carries the dead pane-header veil` **RED both runs**. It found `.card:has(> .pane-header ~ .pane-scroll-fade) > .pane-header::before` and… |
| 0194 · D-15 | Already cured. New regression falsifier: no shipped CSS rule contains `tan(atan2(`. GREEN at HEAD and after the cure. `git grep 'tan(atan2' demo e2e` is empty. Rung ratios use `calc(len / len)` (0198). · `8f4822853` |
| 0195 · C-4 | Already cured. The guard is the same `seated` arm: never condensed, so no dead band. Figures struck here. · `8f4822853` (falsifier) |
| 0196 · L2-3 | At `4fe9b05b9^` = `7f045c25c`, the seated arm was GREEN. Every pane was already seated, so that commit is not a RED for 0196/0199. |
| 0197 · veil alphas | **BEFORE (HEAD `4d5d0dbdc` bytes, worktree vite :8097), ×2:** `SS8-0192/0197 — no stylesheet carries the dead pane-header veil` **RED both runs**. It found `.card:has(> .pane-header ~ .pane-scroll-fade) > .pane-header::before` and… |
| 0199 · PH-13 | At `4fe9b05b9^` = `7f045c25c`, the seated arm was GREEN. Every pane was already seated, so that commit is not a RED for 0196/0199. |
| 0209 · PS out-in | Already cured (X.W5.d2). The standing regression gate is `out-in-reprobe.mjs`'s dev arm, as booked. This seat added nothing new. · n/a |
| 0210 · PS D-2/3/4 | owner-ruling · Retire the figures; they describe the deleted default-mode co-mount. Re-base any carried geometry on HEAD's out-in slot (1 pane per region, constant width). [from the packet's REFUTED owner index] |
| 0212 · PS D-6 | owner-ruling · Do not quote 2.1–2.5 s. Measured dev cold first-visits run 0.26–2.89 s, so any loading-plate threshold must be set from a built-bundle measurement, not dev. [from the packet's REFUTED owner index] |
| 0214 · PS B3 | Already cured. Guard: cold boot `/gradient` and `/browse` → `#/` → `.hero-blob-anchor canvas` count 1 with width > 0. · `8f4822853` (falsifier) |
| 0215 · PS L-5 | **ROUTED to X-W8 (booked):** move `SESSION_PORT_KEY` from `palettes/usePalettePorts.ts` to `platform/auth/`. The consumer files `Dock.vue`, `ProfileSection.vue` and `MobileMenuDropdown.vue` are dirty with other seats' hunks (Track… |

#### B08-shared-feedback — REFUTED 6 · cure commits: 365875b3e b89a93a50

| row | disposition (packet `## cures`) |
|---|---|
| 0227 · AP U-3 | no code owed: the verdict cell retires the claim (neither mark vanishes at HEAD); no cures line |
| 0231 · AP U-7 | transport (`demo/platform/transport/availability.ts`) · **No code owed.** It was already cured: the branch in `assertApiAttemptAllowed` that admits a call also re-arms the window (`:263`). This sitting pins that gate with a test. … |
| 0241 · EB U-1 | consumer (`demo/shared/ui/EmptyState.vue`) · **Cured.** The error variant's detail line, the machine truth in Fira mono-small, now uses the **strong muted rung** `text-(color:--muted-foreground-strong)` in place of the bare `.plat… |
| 0242 · EB U-2 | consumer · **Nothing owed.** The EB-1 plate lift has landed. Statement, glyph and detail hit-test to themselves; the plate covers 25.8% of the viewport and the ink 1.55% (witness sitting). · None authored. A falsifier for an absen… |
| 0245 · EB U-5 | consumer · **The figure retires** (served: 140/307 = 45.6%, not 90.6%). The structural cure (the atmosphere canvas, the dock nav and 5 body-level hosts sit outside every boundary) **stays with the record's wave**, per the cure sta… |
| 0246 · EB U-6 | consumer · **Nothing owed.** After 12 throw→Try-again cycles there is no WebGL2 context churn (created 2, live 1, canvases 2). The hypothesis retires. · None authored (no defect, so no RED state). |

#### B09-about — REFUTED 11 · cure commits: 6cae41f07 f18313ef0 8cd46d136

| row | disposition (packet `## cures`) |
|---|---|
| SS8-0251 | none; already cured at HEAD (the header sits outside the port) · no RED is possible at HEAD; the witness is `E/about-all.json` d6 · — (no change needed) |
| SS8-0252 | none; the anomaly does not reproduce · witness `E/about-all.json` deeplink · — (no change needed) |
| SS8-0255c | none; the cold chunk shows a skeleton · witness `E/about-all.json` d14 · — (no change needed) |
| SS8-0256 | none; cured at HEAD. The surviving class is N-1 (`oklch(none …)`), which is not in this batch · witness `E/cnl-all.json` cnl2 · — (no change needed) |
| SS8-0257b | `demo/color-session/ink.ts` `contrastInkFor`: gamut-map the fill to sRGB before the neutral walk, then step down through the floors 4.5 → 3 → 1. Null is now returned only for a non-colour or a translucent fill · `demo/test/about/s… |
| SS8-0258 | none; there is no descendant cascade · witness `E/supp-all.json` c5b · — (no change needed) |
| SS8-0259 | `ink.ts` `resolveFieldAmbientLightness` (called from `useAtmosphere.ts` `derivedLightness`). In dark, the page-ambient referent is now the brightest field stop at its WCAG luminance (the neutral whose Y equals the stop's Y) instea… |
| SS8-0263 | none · witness `E/cnl-all.json` c7 · — (no change needed) |
| SS8-0267 | `Katex.vue`: `displayMode` roots on glass `FadingScroll axis="x"` (`.katex-row`: both edges feathered, `tabindex=0`). `Markdown.vue`: the hand-rolled trailing mask, `@property --katex-row-edge` and its keyframes are retired, and `… |
| SS8-0268 | none · witness `E/katex2-chromium-all-built.json` d9all · — (no change needed) |
| SS8-0272 | `Katex.vue`: `errorColor: "var(--destructive)"`, which `shell.css` seats in-pane as `--ink-destructive`, certified on the resting plate. `span.katex-error` gets `role="img"` and `aria-label="Formula could not be rendered: <source>… |

#### B10-browse — REFUTED 16 · cure commits: 6aa74e30f

| row | disposition (packet `## cures`) |
|---|---|
| 0277 · BrowsePane U1 | REFUTED · already landed at HEAD (the trigger is the glass `sm` square with no size or radius override); record row stale · `0277: the trigger is the glass sm square…` · mutant `0277-trigger` (`h-10 w-8 rounded-full`) RED ×2 |
| 0282 · BrowsePane U6 | REFUTED · already landed: `EmptyState.vue` has a single root (no leading comment) · `0282: variant=error mounts a single element` · mutant `0282-fragment` RED ×2 |
| 0285 · BrowsePane U9 | One caveat on the RED for 0285. The pre-cure strip root had a leading template comment, which makes a dev-mode fragment, so `wrapper.element` was the fragment anchor. Its RED is therefore re-established by the mutant below, not by… |
| 0287 · BrowsePane U11 | REFUTED (no caster at HEAD) · **no cure: there is nothing to cure.** Nothing casts a shadow at HEAD. X-W7 G11's clip-ancestor re-audit is conditional on a caster returning, so the row stays record-only. No falsifier is written: a … |
| 0288 · BrowsePane U12 | REFUTED (2 of 4) · **CURED.** The vote button now carries the canon's `text-mono-small` rung itself (the count's own rung), so its box no longer inherits the meta row's 18.176px body size. The re-measured computed size is **UNPROV… |
| 0289 · BrowsePane U13 | REFUTED · already landed (`785e522c5`) · `0289: the barrel's names are the browse cluster only` (module namespace, not grep) · mutant `0289-barrel` RED ×2 |
| 0291 · PaginationBar Out-of-order | REFUTED (out-of-order); double activation live · **CURED at the one pager** (`usePager.ts`). `next()` and `prev()` turn one page per load: a turn waits for its own reload to settle, and a failed load releases the gate. The buttons… |
| 0294 · PaginationBar The `variant="outline"` | REFUTED · already landed (W8 deletion) · `0294: neither button carries a variant attribute` · mutant `0294-variant` RED ×2 |
| 0298 · SearchFilterBar R-1 | no owner, nothing to cure (both readings wrong; packet roll-up) |
| 0299 · SearchFilterBar R-2 | REFUTED (24.2% / 50.0%) · **ROUTED (glass).** The height contract is PopoverContent's: glass 10.1.0's popover chunk declares no `max-height` and does not read `--reka-popover-content-available-height`. SearchFilterBar.vue's own co… |
| 0300 · SearchFilterBar R-3 | OWNER-RULING: the SFB-23 re-grade (glyph passes 1.4.11 at 4.19 / 5.65:1; packet roll-up) |
| 0301 · SearchFilterBar R-4 | ROUTED X-W7 (menu height contract + scroll path) + glass O-row candidate (PopoverContent height contract, with 0299 / O-59) |
| 0302 · SearchFilterBar R-5 | REFUTED · already landed (menu rebuild) · `0302/0304: Sort is one horizontal toggle row of three` · mutant `0302-sort-column` (`orientation="vertical"`) RED ×2 |
| 0303 · SearchFilterBar R-6 | REFUTED · already landed (menu rebuild) · `0303: tags are wrapping selectable chips — no checkboxes, no nested scroller` · mutant `0303-scroller` (`max-h-28 overflow-y-auto`) RED ×2 |
| 0304 · SearchFilterBar R-7 | REFUTED · already landed (menu rebuild) · `0302/0304: Sort is one horizontal toggle row of three` · mutant `0302-sort-column` (`orientation="vertical"`) RED ×2 |
| 0306 · SearchFilterBar R-9 | REFUTED · already landed (SFB-3, both limbs) · `0306: an active filter rides the trigger's accessible name` · mutant `0306-name` RED ×2. The contain/paint limb is a pixel reading and stays the live record's (`wall-extra.json .extr… |

#### B11-browse-search-dialogs — REFUTED 13 · cure commits: 92942388e

| row | disposition (packet `## cures`) |
|---|---|
| **SS8-0309** · FlagReportDialog C-9 | **ROOT (measured):** the card menu's `flag` verb emitted while focus was still on the menu item. The dialog's FocusScope recorded that item as the element to restore. The item is gone by the time the dialog closes, so focus fell t… |
| **SS8-0310** · FlagReportDialog D H-1 | **none (claim not reproduced; nothing to cure):** 0310 · 0313 · 0315 · 0321 · 0322 (no glass relay owed) · 0326. [from the packet's REFUTED owner index] |
| **SS8-0311** · FlagReportDialog dark scheme | Already cured at HEAD (the field-control swap; verdict row above, `E/flag.json` dark-1280). Row **closes**; no code. · none written (nothing to cure; the RED state no longer exists at HEAD) · n/a |
| **SS8-0312** · FlagReportDialog D-8 | Already cured at HEAD (`field-sizing: content`, hiddenPx 0 at six lines; `E/flag.json *.overflow`). Row **closes**. · none (as 0311) · n/a |
| **SS8-0313** · FlagReportDialog H-2 | **none (claim not reproduced; nothing to cure):** 0310 · 0313 · 0315 · 0321 · 0322 (no glass relay owed) · 0326. [from the packet's REFUTED owner index] |
| **SS8-0314** · FlagReportDialog H-3 | Already cured at HEAD (`field-sizing: content`; zoom200 / text200 in `E/flag.json`). Row **closes**. · none (as 0311) · n/a |
| **SS8-0315** · FlagReportDialog D §2.1 | **none (claim not reproduced; nothing to cure):** 0310 · 0313 · 0315 · 0321 · 0322 (no glass relay owed) · 0326. [from the packet's REFUTED owner index] |
| **SS8-0316** · MiniColorPicker R-1 | **owner-ruling:** 0316 (re-adjudicate MCP-7's mount-time limb; its per-sample limb is still open). [from the packet's REFUTED owner index] |
| **SS8-0319** · MiniColorPicker R-4 | MCP-16's X-W7 rider. The SV thumb's ring now takes the plate's own field-aware ink: `spectrumFieldIsLight(hue, s, v)` from `demo/picker/controls/spectrumLuma.ts`, the one predicate the main picker's dot and slider needle already s… |
| **SS8-0321** · MiniColorPicker R-6 | **none (claim not reproduced; nothing to cure):** 0310 · 0313 · 0315 · 0321 · 0322 (no glass relay owed) · 0326. [from the packet's REFUTED owner index] |
| **SS8-0322** · MiniColorPicker R-7 | **none (claim not reproduced; nothing to cure):** 0310 · 0313 · 0315 · 0321 · 0322 (no glass relay owed) · 0326. [from the packet's REFUTED owner index] |
| **SS8-0323** · MiniColorPicker R-8 | Same cure, rail handle. The rail under the handle is `hsv(hue, 1, 1)`, so its ink is `spectrumFieldIsLight(hue, 1, 1)`. At hue 60 (yellow) the ring is now black where it had been white at 1.795:1. No `shadow-*` class is involved, … |
| **SS8-0326** · MiniColorPicker R-11 | **none (claim not reproduced; nothing to cure):** 0310 · 0313 · 0315 · 0321 · 0322 (no glass relay owed) · 0326. [from the packet's REFUTED owner index] |

#### B12-card-shell — REFUTED 20 · cure commits: b35bfbbc8 96bf338d5 784c7a500

| row | disposition (packet `## cures`) |
|---|---|
| 0340 · PC U-1 | no change needed · Already landed (glass Collapsible unmounts under PRM). Witness `E/run-card-A.json` PC-U1. The retention figures are retired. |
| 0341 · PC U-2 | no change needed · Already landed (X.W12.u1 glass Popover). Witness PC-U2. PC-2 geometry is retired. |
| 0342 · PC U-3 | CURE seat, 2026-10-20, served model `claude-opus-5-5`. The batch held 19 REFUTED rows. Three carried a live defect with a consumer cure and are cured below (0350, 0363, 0366). One is blocked because another seat's in-flight hunk i… |
| 0343 · PC U-4 | no change needed · There is no caster, so nothing is clipped. Re-run the A/B if G11 revives a cast. |
| 0345 · PC U-6 | no change needed · The shimmer is retired; the word is 4.85/9.30 and the icon 3.89/5.81. PC-19's ratios are retired. |
| 0347 · PC U-8 | no change needed · The premise is gone (1 of 8 swatches mutates). Hypothesis retired. |
| 0348 · PC U-9 | CURE seat, 2026-10-20, served model `claude-opus-5-5`. The batch held 19 REFUTED rows. Three carried a live defect with a consumer cure and are cured below (0350, 0363, 0366). One is blocked because another seat's in-flight hunk i… |
| 0349 · PC U-10 | no change needed · Already landed (a real BUTTON trigger). R-3 drop retired. |
| 0350 · PC U-11 | CURE seat, 2026-10-20, served model `claude-opus-5-5`. The batch held 19 REFUTED rows. Three carried a live defect with a consumer cure and are cured below (0350, 0363, 0366). One is blocked because another seat's in-flight hunk i… |
| 0351 · PC U-12 | no change needed · Already unified (one shell). G11's before-frames use 127.5 px. |
| 0353 · Menu U-2 | glass O-row · Already resolved by the producer: sub-content now carries `max-height` and `overflow-y: auto`. Close AP-35's relay as satisfied; there is nothing to send. [from the packet's REFUTED owner index] |
| 0357 · Menu U-6 | CURE seat, 2026-10-20, served model `claude-opus-5-5`. The batch held 19 REFUTED rows. Three carried a live defect with a consumer cure and are cured below (0350, 0363, 0366). One is blocked because another seat's in-flight hunk i… |
| 0358 · Menu U-7 | CURE seat, 2026-10-20, served model `claude-opus-5-5`. The batch held 19 REFUTED rows. Three carried a live defect with a consumer cure and are cured below (0350, 0363, 0366). One is blocked because another seat's in-flight hunk i… |
| 0359 · Menu U-8 | no change needed · The register no longer exists. Strike the C3-1 widths; X-W10 confirms the register. |
| 0360 · Menu U-9 | CURE seat, 2026-10-20, served model `claude-opus-5-5`. The batch held 19 REFUTED rows. Three carried a live defect with a consumer cure and are cured below (0350, 0363, 0366). One is blocked because another seat's in-flight hunk i… |
| 0361 · Menu U-10 | no change needed · Already landed (the certified serialisers). AP-25/AP-40 retired. |
| 0362 · Menu U-11 | no change needed · Figures re-based in the verdict row. **The occlusion intervals remain UNPROVEN (not re-measured).** |
| 0363 · Meta U-1 | CURE seat, 2026-10-20, served model `claude-opus-5-5`. The batch held 19 REFUTED rows. Three carried a live defect with a consumer cure and are cured below (0350, 0363, 0366). One is blocked because another seat's in-flight hunk i… |
| 0366 · Meta U-4 | CURE seat, 2026-10-20, served model `claude-opus-5-5`. The batch held 19 REFUTED rows. Three carried a live defect with a consumer cure and are cured below (0350, 0363, 0366). One is blocked because another seat's in-flight hunk i… |
| 0367 · Meta U-5 | no change needed · Already satisfied (one served `.fira-code` rule). Close PM-19. |

#### B13-card-swatches — REFUTED 18 · cure commits: bcf8c17b2

| row | disposition (packet `## cures`) |
|---|---|
| V-1 | REFUTED (at HEAD) · No change: the cures named in the batch (X.W12.u1, X.W7.c/d, the reka Collapsible, the removal of `useHoverPopover`'s spread) are already in the tree, and the witness packet measured them live. |
| V-2 | REFUTED (at HEAD) · No change: the cures named in the batch (X.W12.u1, X.W7.c/d, the reka Collapsible, the removal of `useHoverPopover`'s spread) are already in the tree, and the witness packet measured them live. |
| V-3 | REFUTED (numerals superseded); L-3 live · **NOT CURED; ROUTED (design ruling).** The suggested consumer cure, stepping the ink to `--muted-foreground-strong`, was trialled and measured. It reached only **4.44:1** light (dark 6.11)… |
| V-4 | REFUTED (at HEAD) · No change: the cures named in the batch (X.W12.u1, X.W7.c/d, the reka Collapsible, the removal of `useHoverPopover`'s spread) are already in the tree, and the witness packet measured them live. |
| V-5 | REFUTED (at HEAD) · No change: the cures named in the batch (X.W12.u1, X.W7.c/d, the reka Collapsible, the removal of `useHoverPopover`'s spread) are already in the tree, and the witness packet measured them live. |
| V-7 | REFUTED (at HEAD) · No change: the cures named in the batch (X.W12.u1, X.W7.c/d, the reka Collapsible, the removal of `useHoverPopover`'s spread) are already in the tree, and the witness packet measured them live. |
| V-10 | REFUTED (at HEAD) · No change: the cures named in the batch (X.W12.u1, X.W7.c/d, the reka Collapsible, the removal of `useHoverPopover`'s spread) are already in the tree, and the witness packet measured them live. |
| U-3 | REFUTED (magnitudes) · mechanism live · **CURED.** The `SwatchHoverMenu.vue` wrapper went from `relative` to `relative flex`. The inline-block trigger is now a flex item, so no line box forms and no descender is reserved. The wrap… |
| U-4 | REFUTED (at HEAD) · No change: these were observed cured at HEAD (PCS-19, the PCS-1 floor cure in X.W7.c). |
| U-5 | REFUTED (at HEAD) · No change: these were observed cured at HEAD (PCS-19, the PCS-1 floor cure in X.W7.c). |
| U-7 | REFUTED (at HEAD) · No change: these were observed cured at HEAD (PCS-19, the PCS-1 floor cure in X.W7.c). |
| U-1 | REFUTED (at HEAD) · No change: these were observed cured at HEAD (the one-Popover rebuild, the SwatchButton trigger, `p-1.5` winning). U-7's rewritten e2e specs remain unrun, as the witness noted. |
| U-2 | REFUTED (at HEAD) · No change: these were observed cured at HEAD (the one-Popover rebuild, the SwatchButton trigger, `p-1.5` winning). U-7's rewritten e2e specs remain unrun, as the witness noted. |
| U-3 | REFUTED (magnitudes) · mechanism live · **CURED.** The `SwatchHoverMenu.vue` wrapper went from `relative` to `relative flex`. The inline-block trigger is now a flex item, so no line box forms and no descender is reserved. The wrap… |
| U-4 | REFUTED (at HEAD) · No change: these were observed cured at HEAD (PCS-19, the PCS-1 floor cure in X.W7.c). |
| U-5 | REFUTED (at HEAD) · No change: these were observed cured at HEAD (PCS-19, the PCS-1 floor cure in X.W7.c). |
| U-6 | REFUTED (at HEAD) · No change: these were observed cured at HEAD (the one-Popover rebuild, the SwatchButton trigger, `p-1.5` winning). U-7's rewritten e2e specs remain unrun, as the witness noted. |
| U-7 | REFUTED (at HEAD) · No change: these were observed cured at HEAD (PCS-19, the PCS-1 floor cure in X.W7.c). |

#### B14-card-grid-skeleton — REFUTED 10 · cure commits: 88b762da0 63436369f

| row | disposition (packet `## cures`) |
|---|---|
| 0402 · PCG U-5 | **no code cure** (no subject) · The card has no `.cartoon-cast`, so there is nothing to amputate. The existing pin `palette-card-layout.test.ts` G11 asserts `castChildren 0`. Re-run the contain diff with the press held if PG-17 wi… |
| 0404 · PCG U-7 | **cured** (static limb) · `PaletteInspector.vue` opens its `<template>` on its root `<div role="article">`. The leading note moved into `<script setup>`, as ES-2 did for PaletteCardSkeleton. In dev the card now mounts on one eleme… |
| 0408 · PCS U-1 | `~/.claude/guard/guarded --timeout 30 -- sh docs/tranches/X/execution/SS8/probes/B14/b14-0408-redgreen.sh`, which runs RED x2, then `git apply` of `probes/B14/b14-0408-cure.patch`, then GREEN x2. Log: `E/cure-0408-redgreen.log`. |
| 0409 · PCS U-2 | owner-ruling · R-3's "100 px on /#/browse" does not hold at HEAD (127.5 px). Re-base it, and every downstream figure, on 127.5 (browse) and 100.5 (palettes, natural). L-3's 120 is the min-h-stretched lone card, not the collapsed c… [from the packet's REFUTED owner index] |
| 0410 · PCS U-3 | **no code cure** (decision fact) · Carried as the fact for the transition-mode decision: the skeleton seats under load (about 780 ms at 6× CPU) and never seats unthrottled (Chromium). The **WebKit limb stays UNPROVEN**: it was not… |
| 0411 · PCS U-4 | **no code cure** (bill absent) · 0 `will-change: transform` elements at HEAD. The 32 concurrent `skeleton-breathe` animations remain **UNPROVEN** for device cost, which needs a target-device run. · none |
| 0412 · PCS U-5 | glass O-row · The producer `Skeleton` breathe/shimmer animation does not read `--skeleton-shimmer-delay`, so the consumer's 0–0.94 s stagger stays dormant. The O-row asks glass-ui to apply `animation-delay: var(--skeleton-shimmer-… [from the packet's REFUTED owner index] |
| 0413 · PCS U-6 | **no change needed** (cured at HEAD by X.W7.g G20 and X-DS p5/p9) · G20 should read 42 px, k-invariant. Regression pin added. · `ss8-b14-cures.test.ts` "instrument: one strip row at k=5 and k=16": GREEN before and after. A RED is … |
| 0419 · SP-3 | **no change needed** (cured at HEAD) · Strike the 148/214/276–278 px magnitudes from carried prose. Same pin as 0413 (rows 1 at k=5 and k=16). · same pin, GREEN before and after |
| 0420 · SP-6 | **no change needed** (cured at HEAD by V9C-04) · Do not carry 56 px. Pin: the instrument has no meta row (rows = 1), and the loading row count does not grow with k. · `ss8-b14-cures.test.ts` "loading: the row count does not grow w… |

#### B15-palettes — REFUTED 8 · cure commits: aa47c2553

| row | disposition (packet `## cures`) |
|---|---|
| 0422 | **0422 CPE U-1.** Owner: owner-ruling (no binding law; K-5). Cure: re-bank the populated-tray input at **50.0 %** (225/450, 12 colours) for any ratified populated-secondary proportion rule. Nothing to change in code. [from the packet's REFUTED owner index] |
| 0436 | **Already cured at `6bd9ff799`.** Retire A-3's throw surface. No code change. The regression witness is the live login arms in `probes/b15-cpe.mjs` PSB-U4-login-surface (`E/b15-cpe.out.json`). · the existing probe (no new spec: th… |
| 0440 | **Re-banked, not cured: owner ruling.** The measured signs are light −0.0269 L and dark +0.0499 L. The scheme-aware lift token for `--well-bg` (`demo/styles/foundation.css:407`) waits on the owner ruling that elevation must read t… |
| 0442 | Seat: SS-8 CURE, batch B15-palettes, 2026-10-19. The verdicts above stay verbatim (E-3). This section records only what the cure seat did with each REFUTED row. Falsifiers: `demo/test/palettes/palette-inspector.test.ts` ("SS8-0445… |
| 0444 | **0444 PP U-5.** Owner: owner-ruling (proportion reading, no law). Cure: re-bank the specimen:metadata relation at 50.5:40 = 1.26:1. [from the packet's REFUTED owner index] |
| 0445 | Seat: SS-8 CURE, batch B15-palettes, 2026-10-19. The verdicts above stay verbatim (E-3). This section records only what the cure seat did with each REFUTED row. Falsifiers: `demo/test/palettes/palette-inspector.test.ts` ("SS8-0445… |
| 0446 | **Already cured upstream** (the `.pane-scroll-fade` 24 px bottom mask). Retire P5-10's 5/100 sliver and re-bank 46/101 with the fade. No code change. · spec "SS8-0446" regression arm: the card's scroll container computes a `linear… |
| 0450 | **No defect.** Drop the "delete-all is the only control" premise from PG-5's cure. PG-5's other arms are unaffected. No code change. · spec "SS8-0450" regression arm: the zero-match query shows a visible "Clear search" button · no… |

#### B16-palette-dialogs — REFUTED 10 · cure commits: 6a3d72fc6

| row | disposition (packet `## cures`) |
|---|---|
| 0452 · MPD C-9 | REFUTED · **Figure struck.** 3.63:1 does not reproduce (10.4:1 light / 5.2:1 dark, mean ground). No code change: the A-15 limb (`surface="glass"` at alpha 0.18/0.22) remains the consumer's surface decision. · the `surface` lock in… |
| 0453 · MPD D-9 / D-8 | REFUTED · **Figure struck.** 3.63:1 does not reproduce (10.4:1 light / 5.2:1 dark, mean ground). No code change: the A-15 limb (`surface="glass"` at alpha 0.18/0.22) remains the consumer's surface decision. · the `surface` lock in… |
| 0454 · MPD A-12 | **RED before, x2.** The cure diff was reverse-applied to the five subject files and the falsifier file was run twice: `Tests 5 failed \| 4 passed (9)` both times. The five failures were 0454 ×1 and 0471 ×4. The four passes were the… |
| 0455 · MPD | REFUTED · Already cured (emphasis axis). Locked. · `cured frame`: no button has `variant` (mutant RED x2) |
| 0456 · MPD L-8 | REFUTED · Already cured (UIA-V-333). Locked. · `cured frame`: 0 `rounded-dialog` tokens (mutant RED x2) |
| 0458 · MPD L-1 | **0458 type mutant, x2.** `setActiveView: (id: string) => void` was run through `vue-tsc -p tsconfig.test.json` twice. Both runs gave `ss8-b16-cures.test.ts(95,9): TS2578 Unused '@ts-expect-error'` (`C/mutant-0458-{1,2}.log`). The… |
| 0460 · MPD A-21 | REFUTED · **Figures struck.** Already cured at X.W12U.s2: no close button, footer Cancel, glass surface. · `cured frame`: `dialog-close` null and surface `glass` (mutants `close-0460`, `opaque-0453` RED x2) |
| 0461 · PRI U-1 | REFUTED (Chromium) · **No cure.** The field computes `cursor: text`. The WebKit hover read is still owed for a cross-engine verdict, so it stays Chromium-only. · none (no defect) |
| 0464 · PRI U-4 | owner-ruling · The mono limb died with A2-VA-L1-14 (glass Input). Whether a rename should switch the specimen name from Fraunces 20.35/500 to Jakarta 16.4/400 mid-edit, or keep the display voice through `input-class`, is a design … [from the packet's REFUTED owner index] |
| 0471 · VHD U-4 | **RED before, x2.** The cure diff was reverse-applied to the five subject files and the falsifier file was run twice: `Tests 5 failed \| 4 passed (9)` both times. The five failures were 0454 ×1 and 0471 ×4. The four passes were the… |

#### B17-admin-shell-names — REFUTED 16 · cure commits: 4c4506b9a b43de3e18

| row | disposition (packet `## cures`) |
|---|---|
| 0478 · AL Secondary-line contrast | **Falsifier:** `e2e/smoke/admin/ss8-b17-admin-names.spec.ts` (smoke-admin project; it pulls in the `admin-populated` fixture). It has four tests: SS8-0478 (3 aurora hues × 1440/390 × light/dark), SS8-0483+0487 (one test per scheme… |
| 0483 · ALS Ink re-certification | **Falsifier:** `e2e/smoke/admin/ss8-b17-admin-names.spec.ts` (smoke-admin project; it pulls in the `admin-populated` fixture). It has four tests: SS8-0478 (3 aurora hues × 1440/390 × light/dark), SS8-0483+0487 (one test per scheme… |
| 0485 · ALS CLS magnitude | **No cure** (CLS ≈ 0, per the witness). The users −3.03 px/row and audit +19 px/row / gap 8→12 geometry rides A-1's shared row frame, with the corrected figures above. Nothing was changed. · — (witness `E/probe-b.json`) |
| 0487 · ALS Names near-coincidence | **Falsifier:** `e2e/smoke/admin/ss8-b17-admin-names.spec.ts` (smoke-admin project; it pulls in the `admin-populated` fixture). It has four tests: SS8-0478 (3 aurora hues × 1440/390 × light/dark), SS8-0483+0487 (one test per scheme… |
| 0489 · ANP D-3 exact deltas | glass O-row (the D-3 BH relay) · The segmented indicator's box is taller (+5.14 px) and offset lower (+5.19 px) than the active button. Measure the button's own offsetTop/offsetHeight relative to the track and re-measure on resize… [from the packet's REFUTED owner index] |
| 0492 · ANP D-16 `--tab-indicator-duration` | owner-ruling (record correction) · Correct the figure to 210 ms (`--spring-dock-duration`) in the F034-b booking. No code cure. [from the packet's REFUTED owner index] |
| 0493 · ANP C-7 microtask sub-claim | **None remaining** (already cured at HEAD: `admitRecoveryProbe`). No falsifier can go RED at HEAD. · witness `E/probe-b.json` `latch.retry` |
| 0495 · ANP D-4 geometry 512/512/774 | **None remaining** (D-4 `right: null` landed: one `stage` pane, no selector). The D-11 caster stays a W52 source question. · witness `probe-a`/`probe-c` |
| 0496 · ANP D-1.4 acreage ~225 px | **None** (already cured: the card hugs its content, per-corpus search refs, MT-AU1 pager). · witness `probe-c` |
| 0497 · ANP L-8 cross-pane leak | **None** (already cured: the card hugs its content, per-corpus search refs, MT-AU1 pager). · witness `probe-c` |
| 0498 · ANP D-1.6 dark wash at rest | **None** (the claim was false). · witness `probe-c` `rest-dark` |
| 0499 · AP D-01/D-11 rendered geometry | **None remaining** (D-4 `right: null` landed: one `stage` pane, no selector). The D-11 caster stays a W52 source question. · witness `probe-a`/`probe-c` |
| 0500 · AP D-02 selector rects at 390/320 | **None remaining** (D-4 `right: null` landed: one `stage` pane, no selector). The D-11 caster stays a W52 source question. · witness `probe-a`/`probe-c` |
| 0501 · AP D-07 RTL rect table (8.00 → 0.00) | **None for the admin instance.** The PalettesPane `ml-2` twin was not re-checked by this seat and stays UNPROVEN. · witness `probe-c` `rtl-*` |
| 0504 · AP Forced-colors, whole component | **Falsifier:** `e2e/smoke/admin/ss8-b17-admin-names.spec.ts` (smoke-admin project; it pulls in the `admin-populated` fixture). It has four tests: SS8-0478 (3 aurora hues × 1440/390 × light/dark), SS8-0483+0487 (one test per scheme… |
| 0506 · AP D-09 >50-user truncation | **None** (already cured: the card hugs its content, per-corpus search refs, MT-AU1 pager). · witness `probe-c` |

#### B18-admin-panels — REFUTED 14 · cure commits: bd868414a

| row | disposition (packet `## cures`) |
|---|---|
| 0509 · AAP-1 | already cured (no code owed) · vitest pin: the 6 KB-target audit row and its column carry `min-w-0` (UIA-V-52). RED x2 under the mutant that strips it, GREEN x2 at the tree. e2e pin at 320: `row − track ≤ 1`, `sw ≤ cw`. · `E/cures… |
| 0510 · AAP-9 | already cured (no code owed) · vitest pin: count + Refresh form one `ms-auto shrink-0` cluster, and the toolbar has no `flex-1` spacer peer (V16-05). RED x2 under the spacer mutant, GREEN x2. · as 0509 |
| 0513 · AAP-19 | already cured (no code owed) · vitest pin: Refresh renders `data-size="xs"` and `data-icon-only="true"` with no text. RED x2 under the `size="sm"` mutant, GREEN x2. e2e pins: 28×28 fine, 44×44 coarse (GREEN x2, `E/cures/e2e-green-… |
| 0514 · Skeleton-vs-row | **gap limb CURED**; height limb **blockedByDirty** · `AdminAuditPanel.vue`: the loading region stands at the root's rhythm (`grid gap-2` → `gap-3`). The rows are the root's own children at `gap-3`, so the shadows now space as the … |
| 0515 · Mobile | already cured (V16-05) · covered by the 0510 pin, plus the e2e 390 pin (no empty spacer; Refresh ends the toolbar). · as 0510 |
| 0518 · AF U-1 | owner-ruling · AF-22's 512 / 36.4 % and the 774 / 166.2 cells are pre-X-W5 geometry. Re-base on single-pane 1042 × 796.9, dead 29 px, or retire AF-22's figures with AAP-13. [from the packet's REFUTED owner index] |
| 0521 · AF U-4 | no landing cure owed · No code. The out-of-flow ActionFeedback notice belongs to the X-W7 rebuild, as the packet routes it. |
| 0523 · AF U-6 | D-15 conclusion obsolete · No code. e2e pin: the flag badge's computed font-size equals `var(--type-small)` (GREEN x2). · `E/cures/e2e-green-cure-{1,2}.txt` |
| 0524 · AF U-7 | Chromium arm PROVEN; **Safari arm UNPROVEN** · No code. The e2e Chromium coarse-390 arm passed x2: Dismiss and delete ≥ 44 px. The WebKit arm was not run at this seat (the browser pool was saturated: 6/6 slots, queue 9). It is sti… |
| 0526 · AF U-9 | H-2/H-3 struck; H-1 hypothesis · No code. e2e pin: after settling, there are no further `/admin/` requests over 5 s, and `/?utm=x&q=1#/admin/flagged` routes to the flagged pane (GREEN x2). · `E/cures/e2e-green-cure-{1,2}.txt` |
| 0529 · ATP all-geometry | **residue not reproduced → no code** · A shorter placeholder was drafted and **withdrawn**. The e2e coarse-390 cell (isMobile, hasTouch, DPR 2; `pointer: coarse` true, `--ui-scale` 1.5) measured HEAD's `"Category..."` at **80.9 px… |
| 0531 · ATP-23 | glass O-row (discharged) · Glass 10.1.0 ships and imports `glass-chip.css`. The BH relay row for ATP-23 can be closed on this witness. The ATP-5 adoption block (BLOCKED-ON the relay) is lifted. The orchestrator mails. [from the packet's REFUTED owner index] |
| 0532 · ATP C-axis | **CURED** · `demo/palettes/api/admin-colors.ts` `getAdminTags`: a row without a non-empty string `name` is dropped at the wire (the ATP-13 identity: a tag IS its name). vitest: `[{name:"moody"}, {name:""}, {no name}]` → only `Dele… |
| 0533 · ATP-29 | **CURED** · `AdminTagsPanel.vue`: `onActivated` re-reads on every RETURN to the kept-alive pane. The first activation is the mount's own read, so it is not doubled. vitest under a real `KeepAlive`: GET count 1 → 2 on re-entry, and… |

#### B19-color-chips — REFUTED 10 · cure commits: 4f6116d49

| row | disposition (packet `## cures`) |
|---|---|
| SS8-0537 | `R-13 · … outset --card-edge boundary that never veils the endpoint stops` (light + dark). Structural: `box-shadow` none, `outline-style` solid, `outline-color` ≡ resolved `var(--card-edge)`. Live: at the chip's content edge, the … |
| SS8-0539 | o14 test 5 (`honest absence`) and o14 test 7's add-slot `aria-label` + two real clicks · none: already cured upstream, so no RED is possible at this tree · GREEN x2 (tests 5 and 7) |
| SS8-0542 | none written: there is no overflow consequence to falsify (probe-c: worst child edge −8 px, `scrollWidth == clientWidth`) · n/a · n/a |
| SS8-0546 | o14 test 7, `the chip feasibility leg` (unedited). It walks the ground up from the chip itself, so with the well the stops are measured against the stage they sit on · RED x2: `Color space chip 0: perceptible vs menu surface rgb(1… |
| SS8-0551b | The geometry is held. The outer box is still 2.618rem x 1em with `radius-sm` (`box-sizing: border-box`), so row rhythm (0536a/0551a) does not move. Display is unified to `inline-flex`, which is harmless for the childless ramp. |
| SS8-0554a | `D-11 · the strip chip sits on its own opaque stage …` (light + dark). /generate at count 12 (tail masked), Preset menu open once. Vibrant (selected) row highlighted vs highlight moved to a row ≥3 away. Frames are registered from … |
| SS8-0555 | owner-ruling · No live producer exists in the fuzzed domain. Either close the hypothesis, or keep PS-4/PS-17's seam validation as the structural guard. No defect cure is owed [from the packet's REFUTED owner index] |
| SS8-0556 | owner-ruling · No cure. Chromium renders hard seams (Δ0). Close the hypothesis. A WebKit check is the only open follow-up, and it is not owed by this batch [from the packet's REFUTED owner index] |
| SS8-0558 | none: a library dist/publish row · n/a · n/a |
| SS8-0559a | o14 test 6 (`every open-menu chip's painted gradient carries exactly its stamped stops`) · none: already cured upstream · GREEN x2 |

#### B20-gradient-visualizer-code — REFUTED 12 · cure commits: 83a69d695

| row | disposition (packet `## cures`) |
|---|---|
| 0563 · D3-5 verdict-vs-specimen size | **Outcome.** No consumer source change was needed. Nine rows were already cured by changes that landed after the records were sealed. Two had no defect (0563, R-1). R-7 makes no shipped-bytes charge. Each row that this seat can ho… |
| 0564 · A-3 crayon contrast | **Already cured** (X-DS V4C-03 + V6C-10). · vitest `SS8-0564`: every crayon (comment, keyword, entity, string, number) is checked against the `--code-ground` law read from `hljs.css` (L pinned, chroma capped). The sweep covers h 0… |
| 0566 · `break-all` severance columns | **Already cured** (`wrap-break-word` + V11C-02). · vitest `SS8-0566`: the editor carries `wrap-break-word` and `whitespace-pre-wrap`, and no `break-all`. Mutant: `break-all` → RED x2. · `83a69d695` |
| 0572 · L-3 computed pixels | **Already cured** (V4C-03). · vitest `SS8-0572`: the SFC's scoped `.code-editor` rule is parsed with `@vue/compiler-sfc`. Its `background` must be `var(--code-ground)`, and the ground must be the alpha-free `oklch(from …)` law in … |
| 0574 · A-14c boundary non-paint | **Already cured** (X.W12.u3 UIA-V-184). · vitest `SS8-0574`: a deliberate setup throw lands the plate and its Try-again Button inside a `resting`, full-region (`w-full h-full`) Card. Mutant: `tier="floating"` → RED x2. Not covered… |
| 0575 · L-16 cross-route reproduction | **Already cured** (library A-1: `parseCssColor` is total). No `src/**` change and no public-API change. · vitest `SS8-0575`: `linear-gradient(90deg, X 0%, blue 100%)` with X = `oklch()`, `calc()` or `foo()` returns a verdict namin… |
| R-1 (0577) · contrast over the live aurora | No defect at HEAD; the four figures are retired. · playwright `R-1` (1440, light and dark): each h3's computed ink is composited over the screenshot ground 16 px and 40 px past its text run, and must be ≥ 4.5. Mutant: Interpolatio… |
| R-4 (0580) · 12-stop degradation numbers | **ROUTED to X-W6.b (GV-19 frame)**, not cured here. The growth mechanism stands. Re-size from the measured numbers: body 748.4→1516.3 px (2076.9 open), easing share 38.7 % (55.3 % open), well 462×425.8. It is a frame decision, not… |
| R-6 (0582) · phone-clip percentages | **Already cured** (UIA-V-44 + V7C-01). · playwright `R-6 + R-15` (390, 320): the band is one column (one left edge, distinct tops), and no trigger value is clipped, overlaps the tile or runs off the right edge. Mutant: the three-a… |
| R-7 (0583) · shipped-bytes closure | No shipped-bytes charge (rolldown root = subpath, 13,320 B). The one hygiene residue is the root-barrel `Accordion` import at `GradientEasingEditor.vue:29`. It **cannot be cured consumer-side**: glass-ui 10.1.0 publishes no `./acc… |
| R-14 (0590) · GV-68 hidden-twin cost at 12 stops | **Already cured** (A2-VA-L1-12). · vitest `R-14`: with 12 stops and 11 rows closed, 0 `.specimen-strip` elements are mounted; opening one row mounts exactly 1. Mutant: `force-mount` on `AccordionContent` → RED x2. · `83a69d695` |
| R-15 (0591) · tile aspect spread | **Phone limb already cured** (V7C-01). The **desktop limb (no aspect-ratio at 1440, 0.709) is ROUTED to X-W6.b (GV-19)**. · playwright `R-6 + R-15` (390, 320): tile aspect in (0.8, 1.25). Mutant: the pre-V7C-01 tile (`col-start-2 … |

#### B21-gradient-easing — REFUTED 2 · cure commits: 08a96102d

| row | disposition (packet `## cures`) |
|---|---|
| SS8-0600 | no code owed: the stage renders role=group 'Curve mode' at HEAD (verdict cell); no cures line |
| SS8-0612 | **REFUTED** (at HEAD) → CURED (consumer prose) · The stale producer-shape prose on `canvasSvg()` in `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue` (the claim that the installed producer renders the … |

#### B22-gradient-specimen — REFUTED 8 · cure commits: 962789bad

| row | disposition (packet `## cures`) |
|---|---|
| **U-1** SS8-0620 | REFUTED (record figures) · the NEW light-label reading is a live defect · **CURED.** The resting tile labels and family eyebrows read `--muted-foreground-strong` (the pane's existing strong de-emphasis rung, `shell.css` `.pane-wra… |
| **U-3** SS8-0622 | REFUTED · No action: already cured by X.W6.e and V14C-01/V15C (`02f571d59`, `b8cf3fb18`). No falsifier written; nothing to turn RED. |
| **U-4** SS8-0623 | REFUTED · No action: already cured by V15C-03/V16C-02 (container-query grid). The narrow single line stays D-42's weak-affordance row. |
| **U-5** SS8-0624 | REFUTED · No action: already cured by `shape="icon"` (X.W6.d d1) and the open-row-only mount. |
| **U-7** SS8-0626 | REFUTED for (b); (c) was unwitnessed for overshoot · **(c) WITNESSED, no code change.** The spec presses Shift+ArrowUp ×4 on "Bezier control point 2", reads both handles' `aria-valuetext`, and computes the authored cubic's y-range… |
| **U-9** SS8-0628 | REFUTED · No action: already cured by V14C-02 (9px rung retired to `--text-caption`). |
| **U-12** SS8-0631 | REFUTED (no card shadow) · C-04's in-plate capsule shadow is the live reading · **CURED (glass-first, no O-row needed).** The tiles pass glass Chip's existing `surface="veil"` axis (`surface-axis.css`: the quiet in-plate veil, `--… |
| **U-14** SS8-0633 | no cure: glass-owned C-02(b), resolved at the producer (glass 10.1.0: one --radius, --radius-input retired) |

#### B23-mix-canvas-result — REFUTED 9 · cure commits: 4b8e889f7

| row | disposition (packet `## cures`) |
|---|---|
| SS8-0635 | REFUTED (no crash) · nothing owed: no crash at HEAD. MX-7's ErrorBoundary half stays its own row. · none |
| SS8-0636 | REFUTED (at HEAD) · cure was already landed by X.W6.j `17dd0df47`. **Pinned:** a deactivation mid-narration returns the store (canvas 0x0). RED at `17dd0df47~1` x2, GREEN x2. · `4b8e889f7` (pin) |
| SS8-0637 | REFUTED (the MX-3 entailment); the locator diagnosis is now **REFUTED** too · **No locator defect.** `MAIN_PANE` already binds the shell's real `<main>`. Live witness `landmark.mjs` on its own vite :9123 (`E/cure-landmark.json.txt… |
| SS8-0639 | REFUTED (the BLOCKER revival) · **Residual found and cured at the root.** The settle half had landed. The release half had not: `arm()` sizes the canvas (`w·dpr × scrollHeight·dpr`, `style.height`) before `getContext`, but `releas… |
| SS8-0641 | REFUTED (at HEAD) · **Pinned:** a phase reset clears `style.height` and the store. RED at `17dd0df47~1` x2, GREEN x2. The 0639 cure closes the same ratchet on the null-ctx path. The re-mix fallback itself (R-1/MX-2) stays with MX-… |
| SS8-0642 | REFUTED (at HEAD) · **Pinned:** a narration cut short by deactivation settles exactly once. RED at `17dd0df47~1` x2 (`onSettled` never fired), GREEN x2. · `4b8e889f7` (pin) |
| SS8-0649 | REFUTED (at HEAD) · nothing owed: cure landed (`MixResultDisplay.vue` scoped block). The packet's live per-rAF timeline (`E/result-swap.json`) is the witness. A jsdom pin cannot observe the opacity ramp, so none was written. · non… |
| SS8-0650 | REFUTED (at HEAD) · nothing owed: cure landed (X-W6.j MixPane order rack → result → commit). Witness `E/result-order.json`. · none |
| SS8-0658 | REFUTED (at HEAD) · nothing owed: the abspos leave recipe is gone from `demo/styles/`. The re-check before MR-4's `appear` + identity-key cure stays with MR-4. · none |

#### B24-mix-config — REFUTED 21 · cure commits: 8ab3b8290 af35c4ddf

| row | disposition (packet `## cures`) |
|---|---|
| SS8-0663 | R-3 · no-change · No defect: a measureText artifact (`E/cells-a.out.json` R3-390). |
| SS8-0664 | R-4 · no-change · Reduce is honoured (R4-reduce: every duration 0 s). |
| SS8-0665 | R-5 · no-change · The cure had already landed (R5-*). |
| SS8-0666 | R-6 · no-change · No surviving body lock (R6). MC-15's ownership hole remains a code fact with no symptom. |
| SS8-0667 | R-7 · no-change · The cure had already landed (`E/r7-chunks.json`). |
| SS8-0669 | OWNER-RULING: R-9 (the machine firewall, not the code, keeps host:true off the LAN) |
| SS8-0671 | R-11 · **routed**: X-W6.j / PKT-3 · Tried the record's cure: `<Transition name="vj-celebrate">` with `--vj-celebrate-collapse: 0px / -expanded: 6rem`. **BEFORE (live):** the footer grew 145.4→221.7 px in **one frame**; the verb he… |
| SS8-0672 | R-MP1 · no-change · The cure had already landed (MP1-*). |
| SS8-0673 | R-MP2 · **routed**: MX-CLUSTER / X-W6.j / PKT-3 · Tried DD-1's two custom properties on both `vj-morph` sites (MixPane plate mount, MixResultDisplay ghost→content swap). **AFTER (live):** the settle went from one +32 px jump to **… |
| SS8-0674 | glass O-row candidate: R-MP3, glass 10.1.0 Button disabled recipe is ink-alpha only (no forced-colours disabled delta) |
| SS8-0675 | no defect (R-MP4: no forced-colours selection/focus collapse) |
| SS8-0678 | R-MP7 · **cured** · **Root:** the add slot's ghost stroke was the raw picker colour (`MixSourceSelector.vue`), with no contrast floor. **Cure:** the stroke is now the picker colour certified to the 3:1 graphics floor (`GRAPHICS_CO… |
| SS8-0682 | R-MP11 · no-change · The MX-3 cure had already landed. CI wiring stays with X-W1. |
| SS8-0684 | U-1 · **cured** · Same root and witness as SS8-0678 (MSS-20 → X.W4.g). |
| SS8-0685 | U-2 · no-change · The cure had already landed (U2-rtl). |
| SS8-0686 | U-3 · no-change · The cure had already landed (U3-*). |
| SS8-0687 | U-4 · no-change · The cure had already landed (U4-disclosure). |
| SS8-0689 | U-6 · no-change · The cure had already landed (MP6-*). |
| SS8-0690 | U-7 · no-change · The cure had already landed (U7-*). |
| SS8-0692 | U-9 · **routed**: NO-WAVE-OWNER (W-HYGIENE, rides U-8 / L-13) · The figure is restated as 40 modules / 193,065 B source. The record names no code cure: K-10 killed the payload framing, because the port module already sits in the e… |
| SS8-0693 | U-10 · no-change · Closed by the X-W1 visual oracle (`e2347c0e5`). |

#### B25-extract-inputs — REFUTED 13 · cure commits: 605daabe7

| row | disposition (packet `## cures`) |
|---|---|
| 0696 · D-2 rail-vs-ground | REFUTED · **No cure.** The dark chroma-collapse limb is retired. The light-walk green chroma loss (0.2 → 0.052) is an observation, not a defect. · none (no defect) |
| 0697 · cross-axis tension | REFUTED · **No cure.** The shared-bias premise is dead: the bias is about 0.15 ratio points. · none |
| 0700 · EC-43 intermediate | REFUTED · **No cure.** V3C-04 removed the subject. EC-43's unit-test proposal is retired. · none |
| 0704 · L-10 premise | glass (no O-row needed) · No cure. glass already sets `--slider-thumb-size`. The premise is stale, and EC-47's INFO stands on the root-target argument alone. [from the packet's REFUTED owner index] |
| 0705 · L-22 colour half | 0705: no `[data-o18="generate-count"] .slider-range` |
| 0709 · U-3 blank preview | REFUTED (Chromium) · **No cure.** R-1 holds. WebKit stays an SS-13/X-W1 matrix cell. · none |
| 0710 · U-4 focus after picker | REFUTED (the harm) · **No cure.** `aria-disabled` accompanies the flip. The optional tabindex hold was not taken: it would leave a disabled node in the tab order for no witnessed harm. · none |
| 0713 · U-7 carried contrast | 0713: `'1.5px dashed var(--card-edge)'` |
| 0715 · geometry amounts | 0715: no dialog content |
| 0717 · C-3 escaping rejections | REFUTED (cured at HEAD) · **No cure.** Cured by X-W7 Repair 1 (EY-10). · none |
| 0720 · D-13(C) wheel momentum | REFUTED · **No cure.** The coast is the intended shape. · none |
| 0721 · EY-12 remount + EY-20 stale pin | 0721: `expected { x: 100, y: 80 } to deeply equal { x: 160, y: 150 }`, i.e. the loupe stayed at its viewport point |
| 0722 · focusable censuses | 0722: no dialog content mounted |

#### B26-extract-generate-panes — REFUTED 15 · cure commits: 48392f8c5

| row | disposition (packet `## cures`) |
|---|---|
| 0724 · D pixel corpus | REFUTED, closed against this packet's witness. No product change. |
| 0726 · X-5 | **CURED (residual).** The visual pulse stood; now Add to palette and Apply each write a polite status (`"<colour> added to palette"`) inside the modal, cleared and rewritten so a repeat press is re-announced. · `ImageEyedropper.vu… |
| 0727 · L-11 | REFUTED, section-F carry closed. No change. |
| 0728 · L-3 shell count | REFUTED in count: corrected to **9** shell DockControls, all aria-labelled. The shell-aria-label vs workbench-title direction stands for X-W4. No change here. |
| 0729 · D-16 | REFUTED; cured by X-W1 (`e2347c0e5`). |
| 0731 · D2-23 (+XW-35, XW-9) | REFUTED (main and hit-cell limbs). Glyph-over-video contrast and real-hardware XW-9 stay **UNPROVEN** (no real camera). |
| 0734 · C-34 | REFUTED; hypothesis closed. |
| 0735 · zoom-200 clipping | REFUTED ("all four" falsified by one unclipped arm). |
| 0737 · D2-01 magnitude | REFUTED; X-W7 G20 landed. |
| 0741 · R-2 | **CURED.** The packet's suggested cure (`.plate-ink`) was measured and rejected: the well washes the live ambient (ground rgb 199/92/169 under the default pink), and bare `--ink-muted` reads **3.71**, the well rung 4.07, a 61.8 % … |
| 0742 · R-3 | REFUTED; no subject at HEAD. |
| 0743 · R-4 | REFUTED. |
| 0744 · R-5 | REFUTED; the color-dialect fixture cured it. |
| 0745 · R-6 | REFUTED. The side observation (Preset/Harmony triggers lose their edge under forced colors) is a glass Select trigger surface; not an item here, not cured. |
| 0747 · R-8 | REFUTED; not reproduced. |

#### Z1-app-chassis — REFUTED 14 · cure commits: fe398ede2

| row | disposition (packet `## cures`) |
|---|---|
| Z-App-2 | owner-ruling (already ruled: OD19-V4, V9C-01) · none locally; G6's wording needs the owner's amendment [from the packet's REFUTED owner index] |
| Z-Dock-4 | glass O-row (to mint) · producer layer activation honours a consumer entry-focus target [from the packet's REFUTED owner index] |
| Z-Dock-5 | **CURED** `fe398ede2` · `layers/ActionBarLayer.vue`: actions→input focuses the `ColorInput` ref, after `nextTick` plus one frame, past the crossfade's un-inert. `ColorInput.vue` is unchanged (it already exposes `focus`). · GREEN ×… |
| Z-Dock-10 | **Amended oracle:** `o15-dock-register.spec.ts`. Its "separator folds into the slot" case asserted count 1, the premise Z-Dock-10 retires. It now asserts 0 and passes in both GREEN runs. |
| Z-Dock-13 | **RED before the cure, ×2:** `red-run1.txt` and `red-run2.txt` (6/6 failed). Measured: the stage share was 0.5 against 0.618; `--pane-max` was `32rem`; the gutter was 16 px against 12 (`red-run1-lg6.txt` plus run 2); 3 visible sep… |
| Z-Dock-16 | **routed: glass O-row** (no consumer change) · The row's own condition holds. `DockLayerGroup` has no inline-size morph: it composes `DockCrossfade` with the default `reserve="block"` and exposes no reserve prop. Inactive faces ar… |
| Z-chassis-1 | owner-ruling (CC-108/A-17, K-CHASSIS DEAD) · none; superseded [from the packet's REFUTED owner index] |
| Z-chassis-2 | **CURED** `fe398ede2` · `shell.css`: `.pane-main` is the `scene` inline-size container. Under the row's two-track query, `.pane-container:has(> stage + inspector)` takes `minmax(var(--pane-min), var(--pane-stage-share)) minmax(var… |
| Z-chassis-3 | **CURED** `fe398ede2` · Same rule: `61.8033989fr / 38.1966011fr`, stage major, on picker, generate, gradient, extract and mix. Blob and other unnamed routes keep equal tracks. · GREEN ×2: stage share ≈ 0.618 (2 dp) |
| Z-LG-3 | **CURED** `fe398ede2` · The row's `max-width: var(--pane-row-max)` and the `--pane-row-max` token are deleted. The row spans the band. · GREEN ×2: stage@3440 > stage@1440 on `/ /generate /browse /mix` |
| Z-LG-4 | **CURED** `fe398ede2` · same · GREEN ×2: row/3440 ≥ 0.90 on the same 4 routes |
| Z-LG-5 | **CURED** `fe398ede2` · `--pane-max` deleted from `foundation.css`. Its card-comfort half (owner ruling 2026-07-05, 32rem) is kept under its own name, `--card-measure`, worn only by the two lone-card scenes (`AuroraPane.vue`, `Not… |
| Z-LG-6 | **CURED** `fe398ede2` · `--app-gutter: clamp(0.75rem, 2.5cqi, 3rem)` (foundation.css `:root`, its one home; `cqi` resolves at `.app-layout`, which has no container ancestor, so it reads the small viewport). Only this seat's hunks … |
| Z-LG-7 | glass O-row (ask G-4) · producer `pointer: coarse` rung on DockTrigger / tab DockControl [from the packet's REFUTED owner index] |

#### Z2-picker-cohort — REFUTED 30 · cure commits: 28397f458 ba202df7f

| row | disposition (packet `## cures`) |
|---|---|
| Z-ColorPicker-1 | **No product change. The packet's residual is an instrument miss.** At 390 the run keeps the priority prefix (Copy, Random, Palettes, plus Open color input). Reset color and Extract palette sit in the run's **"More actions"** menu… |
| Z-ColorPicker-6 | **Record-arm correction, no cure.** The readout recovers after a slider write. The live defect is Z-ColorPicker-7 (PROVEN, not in this batch); its cure (delete the contenteditable write path) stays with Z-7's owner. · e2e `P6` (re… |
| Z-ColorPicker-9 | **ROUTED. Not cured, not deleted.** C-7 re-adjudicated: the condense surface is dead at every viewport. Glass `CardHeader shrink` reads only `closest(".card-scroll-host").scrollTop`. At `lg` and above the host is `display:contents… |
| Z-ColorPicker-10 | Cured at HEAD; regression-guarded · e2e `P10`: GREEN ×2 · `ba202df7f` |
| Z-ColorPicker-11 | **ROUTED. Not cured, not deleted.** C-7 re-adjudicated: the condense surface is dead at every viewport. Glass `CardHeader shrink` reads only `closest(".card-scroll-host").scrollTop`. At `lg` and above the host is `display:contents… |
| Z-ColorPicker-14 | playwright, final spec: `E/cures-e2e-run1.log` and `E/cures-e2e-run2.log` each show **8 passed, 1 failed**. The one failure is Z-ColorPicker-14's seam both times (see below). `E/cures-e2e-p11-run{1,2}.log`: once the seam assertion… |
| Z-ColorPicker-16 | Cured at HEAD; regression-guarded (0.7862 at 1440 and at 390) · GREEN ×2 · `ba202df7f` |
| Z-ColorPicker-20 | Cured at HEAD; regression-guarded (one cell top at 390) · GREEN ×2 · `ba202df7f` |
| Z-ColorPicker-21 | Cured at HEAD; regression-guarded. The `overture-plate-settle` duration is sampled from first paint and equals `--overture-plate-land` (450 ms). · GREEN ×2 (p11 logs) · `ba202df7f` |
| Z-ColorPicker-22 | Cured at HEAD in Chromium; regression-guarded (left-gutter mean Y, dark < 0.5× light). The WebKit cell still has not run. · GREEN ×2 · `ba202df7f` |
| Z-ColorInput-1 | **CURED (BANK-1 fired).** `useColorParsing.parseAndSetColor` now reads the parse Result through `readPickerColor` (one reader at the `picker-color.ts` choke point). An invalid parse raises the badge; the bare `catch {}` that turne… |
| Z-ColorInput-5 | Name arm cured at HEAD; regression-guarded (`[aria-label="Apply color"]` present). **ROUTED:** the 24×24 seat to PR-12, and `type` null (latent) with it. · GREEN ×2 · `ba202df7f` |
| Z-ColorInput-10 | Cured at HEAD; regression-guarded (global `@keyframes crown-appear` in the CSSOM) · GREEN ×2 (p11 logs) · `ba202df7f` |
| Z-ColorInput-13 | Cured at HEAD; regression-guarded (390: the field opens, `rgb(10 200 30)` commits to the title) · GREEN ×2 · `ba202df7f` |
| Z-ColorSpaceSelector-1 | Cured at HEAD; regression-guarded in one test: 18 options; ≤ 4 decimals; out-of-gamut rows marked; declared form on every caption; 0 overflow; 18 distinct seeds; no `tag=`; display-p3 and rec2020 each get their own About card with… |
| Z-ColorSpaceSelector-2 | cured at HEAD; regression-guarded `ba202df7f` (Z2 cures: ColorSpaceSelector-1..7) |
| Z-ColorSpaceSelector-3 | cured at HEAD; regression-guarded `ba202df7f` (Z2 cures: ColorSpaceSelector-1..7) |
| Z-ColorSpaceSelector-4 | cured at HEAD; regression-guarded `ba202df7f` (Z2 cures: ColorSpaceSelector-1..7) |
| Z-ColorSpaceSelector-5 | cured at HEAD; regression-guarded `ba202df7f` (Z2 cures: ColorSpaceSelector-1..7) |
| Z-ColorSpaceSelector-6 | cured at HEAD; regression-guarded `ba202df7f` (Z2 cures: ColorSpaceSelector-1..7) |
| Z-ColorSpaceSelector-7 | cured at HEAD; regression-guarded `ba202df7f` (Z2 cures: ColorSpaceSelector-1..7) |
| Z-ConfigSliderPane-3 | Cured at HEAD; regression-guarded: scrubber ×31 with a painted range; track ≠ `--ink-muted`; heading family ≠ row-label family; `data-size=sm`; one `.glass-dock` · e2e `CSP3/4/10/12/14 · CSP5`: GREEN ×2 · `ba202df7f` |
| Z-ConfigSliderPane-4 | cured at HEAD; regression-guarded `ba202df7f` (Z2 cures: CSP-3,4,10,12,14) |
| Z-ConfigSliderPane-5 | Visual arm cured at HEAD; regression-guarded (label → "Copied", clipboard parses as JSON). The AT arm is Z-ConfigSliderPane-6 (PROVEN, not in this batch): its status-region cure stays with that row. · GREEN ×2 · `ba202df7f` |
| Z-ConfigSliderPane-8 | **No cure on this axis** (record-arm correction: the scrubber variant draws no 12×24 thumb) |
| Z-ConfigSliderPane-10 | cured at HEAD; regression-guarded `ba202df7f` (Z2 cures: CSP-3,4,10,12,14) |
| Z-ConfigSliderPane-12 | cured at HEAD; regression-guarded `ba202df7f` (Z2 cures: CSP-3,4,10,12,14) |
| Z-ConfigSliderPane-14 | cured at HEAD; regression-guarded `ba202df7f` (Z2 cures: CSP-3,4,10,12,14) |
| Z-ConfigSliderPane-15 | Cured at HEAD; regression-guarded (forced colors: the focused slider's outline equals the Copy JSON button's and is not `none`) · GREEN ×2 · `ba202df7f` |
| Z-ConfigSliderPane-16 | Cured at HEAD; regression-guarded (390 `#/blob`: 31 sliders in the DOM, the console visible) · GREEN ×2 · `ba202df7f` |

#### Z3-workbench-about-cohort — REFUTED 30 · cure commits: 61c3324cd

| row | disposition (packet `## cures`) |
|---|---|
| Z-GenerateControls-1 | the swatches are SwatchButton copy verbs with `Copy <name>` / `Copied <name>` (E/gc.json copy) · `-1/-3/-14` · aria-label → static `Swatch` · REFUTED (cure LANDED) · locked |
| Z-GenerateControls-2 | the typed name persisted (E/gc.json save) · `-2` · save emits the default name · REFUTED (cure LANDED) · locked |
| Z-GenerateControls-3 | REFUTED (cure LANDED) · locked `61c3324cd` (Z3 cures: -1,-3,-14 per-swatch arm) |
| Z-GenerateControls-5 | no `variant` attribute; no strip (E/gc2.json) · `-5/-6` · `variant="ghost"` on Regenerate + a PreviewStrip on the plate · REFUTED (cure LANDED) · locked |
| Z-GenerateControls-6 | REFUTED (cure LANDED) · locked `61c3324cd` (Z3 cures: -5,-6) |
| Z-GenerateControls-7 | measured live only (E/gc.json, E/gc2.json: thumb 36.36 % = fill; verb row on 1 line at 1440/1024/768/390) · none: jsdom does no layout. The live witness is the evidence (the scrubber/no-track arm of -6/-7 is also held by `generate… |
| Z-GenerateControls-8 | owner-ruling · Rule VC:194's seat (Dock vs plate) against the live state (one operable Regenerate, on the plate; the dock seat is opacity 0 under `aria-hidden`), then delete the losing seat's DOM [from the packet's REFUTED owner index] |
| Z-GenerateControls-10 | REFUTED (cure LANDED) · live-witnessed only, jsdom does no layout (Z3 cures: -7,-9,-10,-11,-15 group; -8 per its verdict cell) |
| Z-GenerateControls-12 | a visible "Colors" label; no badge (E/gc.json count) · `-12/-18` · the Label deleted · REFUTED (cure LANDED) · locked |
| Z-GenerateControls-14 | **Z-GenerateControls-14 (Copy all):** no confirmation reaches sight or AT (consumer: route `copyColors` through the `useClipboard` status). [from the packet's REFUTED owner index] |
| Z-GenerateControls-18 | REFUTED (cure LANDED) · locked `61c3324cd` (Z3 cures: -12,-18) |
| Z-GradientStopEditor-1 | the re-sorted CSS re-feeds clean (E/gse2.json cross) · `-1` · `.sort(byPosition)` dropped from `setStopPosition` · REFUTED (cure LANDED) · locked |
| Z-GradientStopEditor-2 | geometry and focus, measured live only (E/gse.json, E/gse2.json, E/gse2-coarse-webkit.json) · none: jsdom does no layout · REFUTED (cure LANDED) · live-witnessed |
| Z-GradientStopEditor-3 | REFUTED (cure LANDED) · live-witnessed only (Z3 cures: -2..5,-8,-8w,-9,-10,-11,-18) |
| Z-GradientStopEditor-4 | REFUTED (cure LANDED) · live-witnessed only (Z3 cures: -2..5,-8,-8w,-9,-10,-11,-18) |
| Z-GradientStopEditor-5 | REFUTED (cure LANDED) · live-witnessed only (Z3 cures: -2..5,-8,-8w,-9,-10,-11,-18) |
| Z-GradientStopEditor-6 | 2 → 2 on a middle or right press (E/gse.json buttons) · `-6` · the bar's `e.button !== 0` guard deleted · REFUTED (cure LANDED) · locked |
| Z-GradientStopEditor-8 | REFUTED (cure LANDED) · live-witnessed only (Z3 cures: -2..5,-8,-8w,-9,-10,-11,-18) |
| Z-GradientStopEditor-8w | REFUTED (cure LANDED) · live-witnessed only (Z3 cures: -2..5,-8,-8w,-9,-10,-11,-18) |
| Z-GradientStopEditor-9 | REFUTED (cure LANDED) · live-witnessed only (Z3 cures: -2..5,-8,-8w,-9,-10,-11,-18) |
| Z-GradientStopEditor-10 | **Z-GradientStopEditor-10:** the handle boundary is 2.83:1 at one of two handles, and the declared dark inset ring does not paint. [from the packet's REFUTED owner index] |
| Z-GradientStopEditor-11 | REFUTED (cure LANDED) · live-witnessed only (Z3 cures: -2..5,-8,-8w,-9,-10,-11,-18) |
| Z-GradientStopEditor-13 | panes 2 → 2, verdict `unparseable color "oklch()"` (E/gse.json crash) · `-13` · `applyCSS` throws on a verdict. The parser band's π-R1 totality is not touched; no public API changed · REFUTED (cure LANDED) · locked |
| Z-GradientStopEditor-14 | Enter on the caret mints; role=group/slider (E/gse.json kb, census) · `-14/-15` · `role="group"` and the caret's Enter/Space mint deleted · REFUTED (cure LANDED) · locked |
| Z-GradientStopEditor-15 | REFUTED (cure LANDED) · locked `61c3324cd` (Z3 cures: -14,-15) |
| Z-GradientStopEditor-16 | Remove disabled with its reason and status; spinbutton 50 → 33 (E/gse.json floor, E/gse2-numeric.json) · `-16/-17` · the inspector's `:disabled` deleted · REFUTED (cure LANDED) · locked |
| Z-GradientStopEditor-17 | REFUTED (cure LANDED) · locked `61c3324cd` (Z3 cures: -16 absence arm,-17) |
| Z-GradientStopEditor-18 | REFUTED (cure LANDED) · live-witnessed only (Z3 cures: -2..5,-8,-8w,-9,-10,-11,-18) |
| Z-Markdown-2 | the bones carry only data-slot/aria-hidden/class (E/md.json skeleton) · `-2` · `variant="glass"` on a Skeleton · REFUTED (cure LANDED) · locked |
| Z-Markdown-3 | display-p3 shows the explicit no-guide sentence (E/md.json route) · `-3` · display-p3 `doc: null` → a doc module. AboutPane.vue is dirty with another seat's hunks; it is read and never written · REFUTED (cure LANDED) · locked |

#### Z4-admin-library-parser — REFUTED 31 · cure commits: 3dc9294f4 91f96b06a

| row | disposition (packet `## cures`) |
|---|---|
| Z-AdminUsersPanel-1 · L-5 (BLOCKER) | **NO CHANGE**: cured at HEAD. Close the carry against `E/admin-anon.json`. · the REFUTED verdict above |
| Z-AdminUsersPanel-2 · L-3 / D-23 | **NO CHANGE**: each one is cured at HEAD. Close the carries against `E/admin-*.json` (pop-1440/390, focus, disabled, prune, pruneErr, pruneHdr, race, search, siblings, listErr, palErr, delErr). · the REFUTED verdicts above |
| Z-AdminUsersPanel-3 · L-11 | NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26) |
| Z-AdminUsersPanel-4 · D-24 | NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26) |
| Z-AdminUsersPanel-6 · Δ-10 | NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26) |
| Z-AdminUsersPanel-7 · Δ-11 | NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26) |
| Z-AdminUsersPanel-11 · Δ-1 | NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26) |
| Z-AdminUsersPanel-12 · Δ-3 | NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26) |
| Z-AdminUsersPanel-14 · L-7 / Δ-2 | NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26) |
| Z-AdminUsersPanel-15 · Δ-9 | NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26) |
| Z-AdminUsersPanel-16 · Δ-8 | NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26) |
| Z-AdminUsersPanel-17 · Δ-4 | NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26) |
| Z-AdminUsersPanel-18 · Δ-13 | NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26) |
| Z-AdminUsersPanel-19 · Δ-7 | NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26) |
| Z-AdminUsersPanel-22 · D-32 (GLASS-OWNED) | glass O-row (I-20) · Button disabled treatment: the element computes no disabled channel (opacity 1, ink/bg identical). [from the packet's REFUTED owner index] |
| Z-AdminUsersPanel-26 · L-8 | NO CHANGE: cured at HEAD; carry closed against E/admin-*.json (Z4 cures: AdminUsersPanel-2/3/4/6/7/11/12/14-19/26) |
| Z-library-band-1 · LIB-01 | **NO CHANGE**: landed in the tree. These ship at the dated 4.1.0 cut. Z-library-band-17 stays PROVEN: not published, and the registry latest is 4.0.0. The publish is an owner act. · the REFUTED verdicts above |
| Z-library-band-2 · MTS-01 | NO CHANGE: landed in the tree; ships at the dated 4.1.0 cut (publish = OWNER ACT) (Z4 cures: library-band-1-8,12,14,16,18) |
| Z-library-band-3 · MTS-01 twin | NO CHANGE: landed in the tree; ships at the dated 4.1.0 cut (publish = OWNER ACT) (Z4 cures: library-band-1-8,12,14,16,18) |
| Z-library-band-4 · MTS-02 | NO CHANGE: landed in the tree; ships at the dated 4.1.0 cut (publish = OWNER ACT) (Z4 cures: library-band-1-8,12,14,16,18) |
| Z-library-band-5 · easing stability | NO CHANGE: landed in the tree; ships at the dated 4.1.0 cut (publish = OWNER ACT) (Z4 cures: library-band-1-8,12,14,16,18) |
| Z-library-band-6 · PSL-2 declares | NO CHANGE: landed in the tree; ships at the dated 4.1.0 cut (publish = OWNER ACT) (Z4 cures: library-band-1-8,12,14,16,18) |
| Z-library-band-7 · `_2` | NO CHANGE: landed in the tree; ships at the dated 4.1.0 cut (publish = OWNER ACT) (Z4 cures: library-band-1-8,12,14,16,18) |
| Z-library-band-8 · LB-N1 LEG1 | NO CHANGE: landed in the tree; ships at the dated 4.1.0 cut (publish = OWNER ACT) (Z4 cures: library-band-1-8,12,14,16,18) |
| Z-library-band-11 · R-T1 ratchet | **CURED**: `src/transform/path.ts` was split at its tokenizer/geometry seam. The tokenizer (`Op`, `Segment`, `tokenizePath`, the separator and number regexes) moved to the internal `src/transform/path-tokenize.ts`. `path.ts` is no… |
| Z-library-band-12 · W.L2/W.L3 numeric leaves | NO CHANGE: landed in the tree; ships at the dated 4.1.0 cut (publish = OWNER ACT) (Z4 cures: library-band-1-8,12,14,16,18) |
| Z-library-band-14 · W.L5 root retirement | NO CHANGE: landed in the tree; ships at the dated 4.1.0 cut (publish = OWNER ACT) (Z4 cures: library-band-1-8,12,14,16,18) |
| Z-library-band-16 · §3 SHIP list | NO CHANGE: landed in the tree; ships at the dated 4.1.0 cut (publish = OWNER ACT) (Z4 cures: library-band-1-8,12,14,16,18) |
| Z-library-band-18 · W.L8 AB-1 | NO CHANGE: landed in the tree; ships at the dated 4.1.0 cut (publish = OWNER ACT) (Z4 cures: library-band-1-8,12,14,16,18) |
| Z-parser-band-3 · debt 4 non-string guard | **CURED**: added one `notText()` failure constructor in the internal `src/css/result.ts`. A `typeof source !== "string"` guard at the head of all nine `./css` parse entries (parseCssColor · parseCssScalar · parseCssValue · parseCs… |
| Z-parser-band-15 · HONESTY LAW reject leg | **NO CHANGE**: the HONESTY-LAW measurement is superseded. The claim retires against `E/bench-g7-run1.json` and `E/bench-g7-run2.json` (HEAD's combinator parser is 1.11–1.12× faster than 4.0.0 on the reject leg). The 0.6× bar stays… |


## 6. Every residual UNPROVEN row and its measured reason

Rendered by `python3 -I tools/close_tables.py unproven`. The reasons are copied from the packets' verdict cells, cut at about 260 characters. The generator does not match two B15 rows, because their verdict cells are not spelled `**UNPROVEN**`:
- **0439:** NOT TRUTH-APT, carried verbatim and counted UNPROVEN. The record's revival condition ("only if the file is ever mounted") has not occurred.
- **0447:** SPLIT. The U-8 arm is UNPROVEN because the dev network log and the 27-module co-location cost were not run. The U-9 arm is REFUTED.

Z3's three further UNPROVEN limbs ride rows the table shows under their row id; the limb tally is 10.

#### B01-picker-canvas — UNPROVEN 11

| row | measured reason (verbatim from the packet) |
|---|---|
| SS8-0001 | **UNPROVEN**: the Safari/WebKit witness could not be admitted (R-G). Chromium is measured, and on Chromium `ch` matches neither advance Chromium on Fraunces 41.888px with `lining-nums tabular-nums`: `1ch` = 26.781px (0.6394em). Tabular '0' = 27.013px (0.6449em… |
| SS8-0002 | **UNPROVEN**: headless has no screen reader, so the strings an AT speaks cannot be witnessed here Context only: the Chromium AX tree exposes `heading "200 50 50" [level=3]` containing `textbox "r component value"` ×3 (`supp-dev-chromium.json` `.ax.readout`). T… |
| SS8-0004 | **UNPROVEN**: per-engine, and the WebKit witness was not admitted (R-G). Chromium is measured Chromium, srgb-linear `g`: after select-all and typing `0`, `.`, `5`, `5`, the caret is in the host at offsets 1, 2, 3, 4, still at 4 after a 600ms settle (past the 5… |
| SS8-0007 | **UNPROVEN** ("any engine"): REFUTED for Chromium only, and the WebKit witness was not admitted (R-G) Chromium computed `outline-style: none` in both the normal and the forced-colors register. In forced colors `box-shadow: none` and only **3** pixels change on… |
| SS8-0008 | **UNPROVEN**: headless has no software keyboard, and felt cost needs a device in hand Not run. |
| SS8-0009 | **UNPROVEN**: the seam was not exercised across spaces 0 torn in 190 and in 203 rAF+mutation snapshots. But in-session external writes did **not** switch the space: only the `r,g,b`, `l,a,b` and `hex` key sets were ever observed, across 12 writes to 10 spaces,… |
| SS8-0011 | **UNPROVEN**: the host was not quiet (loadavg 21.9/24.6/29.7 at the run) Indicative built-bundle numbers only: drag window 5518ms, 387 rAFs, rAF p50 0.115ms, max 222ms, 304 Layouts = 253.7ms, 310 style recalcs = **1637.4ms** (about 40ms per move). Idle window … |
| SS8-0015 | **UNPROVEN**: emulation only, and no divergence occurred At rest, after a tap at +600ms, at +3.5s and after a second tap, inline TA = computed TA every time (`pan-y`, `none`, `pan-y`, `none`). The 3s deactivation is witnessed, but no drift. |
| SS8-0018 | **UNPROVEN**: no screen reader in headless Context only: the AX tree has `img "Color spectrum, saturation 75%, lightness 78%"`, its `<figure>` ancestor has no name, and the img says "lightness" for HSV value. |
| SS8-0020 | **UNPROVEN**: the precondition is unmet `none` is still not admissible. The boot throws `Ink certification failed: color_missing_channel` (vue · setup function), then a render `TypeError … reading 'currentView'`. No `.spectrum-picker` mounts and the readout is… |
| SS8-0024 | **UNPROVEN**: no real touch or hybrid hardware in a headless seat Emulation (SS8-0015) shows only the 3s pan-y→none→pan-y cycle. |

#### B02-picker-sliders-debug — UNPROVEN 11

| row | measured reason (verbatim from the packet) |
|---|---|
| SS8-0036 | **UNPROVEN** (owner ruling, VC §2; no compositing measurement taken) — |
| SS8-0037 | **UNPROVEN** (subject retired: both dirs are absent at HEAD; the before/after gh-pages build diff was not run, per probe parsimony) shell output in this packet's run log |
| SS8-0038 | **UNPROVEN** (subject retired: no ring renders) Both schemes: rail `border 0`, `box-shadow none`, `outline none`, and no ring in either frame. Removed at ConsoleRail.vue:230 (X-DS pass 1 V1-21). `E/p2-rail.json`, `d2-11-rail-{light,dark}.png` |
| SS8-0044 | **UNPROVEN** (challenge-audit input, not a verdict) Posture recorded: 4 meters `aria-live="off"`, no other live region, thumbs carry `aria-valuetext` ("Red 128"). `E/p2-rail.json` |
| SS8-0045 | **UNPROVEN** (owner ruling) Live posture: at boot no item is selected (all `aria-selected=false`, no dot), and the roving tabindex is 0 on the first item. `E/p2-rail.json` |
| SS8-0048 | **UNPROVEN** (iOS device cell; not headless-Chromium decidable) — |
| SS8-0055 | **UNPROVEN** (iOS device cell) — |
| SS8-0056 | **UNPROVEN** (frequency needs field sessions). Corroborative only: the gesture reproduces in one headless desktop cell (SS8-0049 canvas) — |
| SS8-0057 | **UNPROVEN** (owner taste) — |
| SS8-0058 | **UNPROVEN** (owner ruling) — |
| SS8-0059 | **UNPROVEN** (device cell; not repo-provable) — |

#### B03-hero-atmosphere — UNPROVEN 5

| row | measured reason (verbatim from the packet) |
|---|---|
| SS8-0065 U-6 (AP-12) | **UNPROVEN** Chromium 390 coarse: `--ui-scale` 1.5, `--control-h-md` = `max(calc(2.5rem * 1.5),2.75rem)` = **60px**, `--control-h-sm` = 54px. The triggers now use `h-(--control-h-sm)` = **54px** (`A-atmosphere.json .coarse390`). The chromium arm reproduces the… |
| SS8-0072 BlobPane "every pixel-delta figure" | **UNPROVEN** (re-pack limb; sub-limbs below) Idle arm: the loop never parks (51–54 draws/s; B `parkMs0` null over 16s). Frame Δmean after each write: smoothK **26.99**, warpAmp **0.18** (max 4), noiseAmp **0.19** (max 6), hueRange 0.89, satelliteCount 3→0 **30… |
| SS8-0077 heroblob bead/plate pixel numbers + plate referent | **UNPROVEN** (owner-ruling) The record itself requires the audit to RULE the authoritative referent (0.8079 / 0.8392 / 0.8515 / ≈0.908) before any gate-shaped number means anything. No referent ruling exists. The bead's geometry and palette have also changed a… |
| SS8-0078 heroblob idle-fps delta + TBT (40.1 vs 112.8 at 1×;… | **UNPROVEN** The direction reproduces and draws attribute it: hero live **51.5 fps / 51.6 draws/s** (1×), 50.7 / 51.0 (4×). PRM arm **120.1 fps / 0 draws/s**. TBT 1× 783 ms vs PRM 624 ms (n=1). 4× cold-load TBT 1704 ms. Reason it stays UNPROVEN: the PRM arm re… |
| SS8-0083 heroblob C-3 Safari trigger | **UNPROVEN** Needs a real-Safari or real-GPU-pressure rig. Headless WebKit and Chromium cannot produce a non-synthetic context loss, and Chromium's synthetic `loseContext()` auto-restores (record row 30). Post-cure witness also impossible: `useAtmosphere.ts:32… |

#### B04-dock-profile-menus — UNPROVEN 19

| row | measured reason (verbatim from the packet) |
|---|---|
| SS8-0087 | **UNPROVEN** (WebKit arm not admitted, load > gate). Chromium arm re-witnessed. After the resize the menu stays mounted at `[0,17,176,260]` with opacity 1, while the trigger has 0 client rects and `aria-expanded="true"`. Escape then drops focus to `BODY`, so t… |
| SS8-0090 | **UNPROVEN** — needs a cold vite deps cache on the served instance. That server (pid 12243) is shared with concurrently editing seats, so this seat did not purge or restart it. — |
| SS8-0095 | **UNPROVEN** — the quantities depend on the pick, and the record does not state its pick. Red-pick readings: plate α **0.10** light / **0.14** dark; menu α 0.18 / 0.22; delivered 5.23 / 5.57. A mismatch at one pick decides neither way. `E/desktop-in-{light,dar… |
| SS8-0096 | **UNPROVEN** — this is a table across picks, and one pick was read. Red pick: light ink is byte-identical to `--accent-live` (`oklch(11.9496…% 0.04844 25deg)`). Dark is not (73.476 % vs 73.088 %). Over-certification gain is +6.3 % in light (5.231 vs 4.920) and… |
| SS8-0103 | **UNPROVEN** — a claim about a past capture corpus, which a live probe of the app cannot decide. — |
| SS8-0104 | **UNPROVEN** — the live trace was not admitted. Static limb only (no browser): `git grep -c 'variant=' -- demo` = **57** lines at `9682675e2`, and none in `demo/shell/dock/menus`. That is today's count, not the record's 103. — |
| SS8-0105 | **UNPROVEN** — `guarded --exclusive webkit` not admitted (load > gate). — |
| SS8-0109 | **UNPROVEN** — not admitted (load > gate). — |
| SS8-0110 | **UNPROVEN** — not admitted. — |
| SS8-0111 | **UNPROVEN** — not admitted. — |
| SS8-0112 | **UNPROVEN** — not admitted. — |
| SS8-0113 | **UNPROVEN** — not admitted. — |
| SS8-0114 | **UNPROVEN** — not admitted. — |
| SS8-0115 | **UNPROVEN** — not admitted. — |
| SS8-0116 | **UNPROVEN** — not admitted. — |
| SS8-0117 | **UNPROVEN** — NEEDS-HARDWARE. A headless engine cannot show iOS focus zoom. Static note, not a live verdict: the "missing `autocapitalize`" limb no longer matches the source, since `SlugEditLayer.vue:106` sets `autocapitalize="off"`. This seat also saw the re… |
| SS8-0118 | **UNPROVEN** — not admitted. — |
| SS8-0119 | **UNPROVEN** — not admitted. — |
| SS8-0120 | **UNPROVEN** — not admitted. — |

#### B05-dock-actionbar — UNPROVEN 5

| row | measured reason (verbatim from the packet) |
|---|---|
| 0126 · ABL D-14 | **UNPROVEN** (precondition unmet: MISS-1's `gap-0` is still served, `layerRootGap 0px`). Pre-cure reading: outline `solid 2px … offset 2px` on the 839-px box, so the outer edge is at 835. The separator spans 832–833, a **2 px** clearance with no crossing. The … |
| 0130 · ABL L-1 | **UNPROVEN** (the asserted trigger was not reached). With the bar open, idle collapse never fires (S1: 0 morph frames in 10 s), so expand-while-open could not be driven by idle. Measured: the stagger selector (`.glass-dock[data-morphing] … .dock-face.is-active… |
| 0141 · ABT D-12 | **UNPROVEN** (precondition unmet: D2-08's main-layer separators → 0 has not landed, so no AFTER state exists). Measured BEFORE state: **3** separators at x = **607.8 / 755.3 / 864.1** (1×27.5). `E/desk-light.json` `mainSeparators` |
| 0145 · ABN U-2 | **UNPROVEN** (the triples are bound to that capture's seed, and the selected-stroke channel needs a selected seat, which no probed state had). Measured at the boot seed: every seat's hover ink serialises `oklch(30.4649% 0.121841 9.834deg)`. That is the safe-ac… |
| 0152 · ABN U-9 | **UNPROVEN** (needs a real coarse device; emulation is not the device). Emulated reading: one tap fires the action once (colour changes) and opens **no** hint card (`hintsAfterTap: []`). `E/cell-coarse.json` |

#### B06-dock-toolbar-status — UNPROVEN 14

| row | measured reason (verbatim from the packet) |
|---|---|
| 0156 · AT-11 | **UNPROVEN** (coarse arm); fine arm measured Fine: after the Extract click the route is `#/extract` and the dock is `collapsed` at +7.3 s, the same as the untouched control. **No leaked hold on fine** (`E/p1-desktop.json` `c0156_fine`/`c0156_control`). Coarse … |
| 0160 · coverage | **UNPROVEN** The subject (`ActionToolbar.vue`) is deleted at `c00004924`. A coverage census is a static count, not a live observation, and the successor seats are a different subject. |
| 0161 · DSL U-1 | **UNPROVEN** DOM half measured: one region in every cell, `role="status"`, `aria-live` none (implicit polite), `data-variant=unavailable`. Mid-session it is **inserted already carrying its text** (`hasText:true`, t=3011.7 ms) (`E/p3-latch.json` `mid-session`).… |
| 0166 · DSL U-6 | **UNPROVEN** The subject SFC is deleted (`8b5b48347`), so its duplication counts cannot be re-measured. The successor dock chip renders **242.4 px** at 1440 and 229.1–231.6 px at 1024–1100, which matches neither banked figure (`E/p3-latch.json`). Per the recor… |
| 0167 · DSL U-7 | **UNPROVEN** This needs a `gh-pages` build, and `dist/` is shared with concurrent seats, so the build was not run. The mechanism has also moved: the dock gate is now `resolveApiStatus(…, isDev, seat)` in `api-status.ts`, so the block's prod-deadness must be re… |
| 0174 · DVS | **UNPROVEN** Executing a mutation means editing `demo/**` source, which Track A and X-DS are editing concurrently. That is outside a witness seat's write scope. It belongs to X-W1's born-RED authoring (mutation 3 first), as the record says. |
| 0176 · DVS-25 | **UNPROVEN** The probe never reached this cell. Run 1 got a dev-server `ERR_CONNECTION_TIMED_OUT` at the first cell. Run 2 failed on the input-face reach, which is now fixed. On the re-run, the follow-up run was queued at 16:35 and never admitted: `guarded` he… |
| 0177 · DVS | **UNPROVEN** It was not admitted. `guarded` logged `waiting for the 'webkit' lock` from 15:10 because the machine-wide exclusive WebKit lock was held by another run (`E/p5-webkit-coarse.log`), and the run was stopped un-run. For instrument hygiene, Chromium's … |
| 0181 · GAB U-4 | **UNPROVEN** Measured: `(min-width:1024px)` true, the app desktop MQ (`and (min-aspect-ratio:1.1)`) **false**. The dock carries a `Save edit`/`Cancel edit` face (inactive) and the Tools toggle is visible. The `#/palettes` main region has **0** edit/save/commit… |
| 0183 · GAB owner | **UNPROVEN** These are owner items, not probes, and stay with the owner's ruling. |
| 0184 · PER U-1 | **UNPROVEN** It was not measured. The follow-up run was queued at 16:35 and never admitted: `guarded` held it at `waiting for headroom (load 160 > 36)` (`E/p1b-input.log`), uptime load 94→169 over 16:35–17:40, and it was stopped un-run per the machine law (loa… |
| 0185 · PER U-2 | **UNPROVEN** It was not measured. The follow-up run was queued at 16:35 and never admitted: `guarded` held it at `waiting for headroom (load 160 > 36)` (`E/p1b-input.log`), uptime load 94→169 over 16:35–17:40, and it was stopped un-run per the machine law (loa… |
| 0186 · PER U-3 | **UNPROVEN** It was not admitted, because the exclusive WebKit lock was held elsewhere from 15:10. Even run, Playwright WebKit is an engine witness and not iOS Safari, so the iOS claim needs a real device. |
| 0187 · PER U-4 | **UNPROVEN** Voicing needs a real screen reader, and none runs headless. The record also holds this moot until A-2's cure lands. |

#### B07-pane-shell — UNPROVEN 12

| row | measured reason (verbatim from the packet) |
|---|---|
| 0188 · PH engine | **UNPROVEN**: shipping Safari cannot be run headless, so the engine-attribution question stays open. Measured in Playwright WebKit 26.4: the PH-1 arithmetic **reproduces to six figures** (1440 → 0.310808, 1024 → 10.868346, 1280 → −7.39094, 1300 → 13.171055, 39… |
| 0200 · PSC RTL | **UNPROVEN**: the subject is DELETED (`50633f195`), and the dock has no segmented control or indicator to paint. The BJ relay's precondition cannot be met and the relay is moot. `E/chromium-dock.json` |
| 0201 · PSC D-1 | **UNPROVEN**: the subject is deleted. `E/chromium-dock.json` |
| 0202 · PSC D-2 | **UNPROVEN**: the subject is deleted. Engine sub-cell, recorded only: `CSS.supports("color","contrast-color(red)")` = **true** in Chromium 148 and in WebKit 26.4. `E/chromium-engine.json`, `E/webkit-engine.json` |
| 0203 · PSC 639/641 | **UNPROVEN**: the subject is deleted. — |
| 0204 · PSC C-3 | **UNPROVEN**: the subject is deleted. — |
| 0205 · PSC D-7 | **UNPROVEN**: the subject is deleted. — |
| 0206 · PSC C-9 | **UNPROVEN**: the subject is deleted, so there is nothing to mutate. — |
| 0207 · PSC-9 + atmosphere jolt | **UNPROVEN**: the subject is deleted. Sub-cell: `.dock-mobile-panes` is absent (0), and the dock band is unchanged across the hop (358×72 @390, 992×72 @1024). Only end states were sampled, not frame-by-frame. `E/chromium-dock.json` |
| 0208 · PSC PRM | **UNPROVEN**: the subject is deleted. — |
| 0211 · PS-1 | **UNPROVEN**: PS-1's quantity is the window in which App files the outgoing instance under the incoming key. At HEAD `onMount(instance, key)` makes that unrepresentable by construction, and no live instrument reads it. Measured only for context: warm swaps put… |
| 0217 · PS-4 + D-5 | **UNPROVEN**: the PS-4 write counter was not instrumented. D-5 measured **add=4 / rem=0** over boot plus 10 hops (0/0 per hop) in all three runs. The shape holds (cached panes never remove), but the record's 3 does not reproduce. `E/chromium-hops.json` `kdTota… |

#### B08-shared-feedback — UNPROVEN 20

| row | measured reason (verbatim from the packet) |
|---|---|
| 0220 · AF U-2 | **UNPROVEN**: needs an AT transcript (VoiceOver/NVDA), and headless DOM reads cannot decide it. At HEAD the chip mounts with `role="status"` inside `v-if` (ActionFeedback.vue:4-6), which is exactly the pattern in question. source |
| 0221 · AF U-3 | **UNPROVEN**: the subject is absent. The AF-7 adoption has not landed (ActionFeedback.vue is still the hand-rolled `div`), so there is no glass Alert in the well to render. source |
| 0224 · AF U-6 | **UNPROVEN**: this is an owner/ledger question that no live probe can decide (owner-ruling). — |
| 0225 · AP U-1 | **UNPROVEN** (the AT half needs VoiceOver/NVDA). Adjacent DOM facts at HEAD: the misconfigured face renders **once** (dock seat, `role=alert`), so the record's two-regions-misconfigured fact no longer holds (`8b5b48347`). In the **offline** state, though, **tw… |
| 0229 · AP U-5 | **UNPROVEN** (owner-ruling). The timing is measured: `lamp-dot-pulse` runs **2400 ms × 3** iterations, which is 7.2 s, finite but over the 5 s line, on a 7.19 px `aria-hidden` dot. It runs even though StatusDot is passed `motion="off"`. Whether 2.2.2 applies t… |
| 0230 · AP U-6 | **UNPROVEN**: the run was held by the guard at load > 36 and never launched. Byte read only, not a witness: the shipped bundle calls the resolver with `isDev = !1`, so the dock seat returns null in production. `P/ap18.mjs`; the bundle grep in the transcript |
| 0233 · ES U-1 | **UNPROVEN**: the cell never ran (guard headroom wall; see Served state). — |
| 0234 · ES U-2 | **UNPROVEN**: needs an AT transcript. — |
| 0235 · ES U-3 | **UNPROVEN**: the cell never ran (guard headroom wall). — |
| 0236 · ES U-4 | **UNPROVEN**: the cell never ran (guard headroom wall). — |
| 0237 · ES U-5 | **UNPROVEN**: the cell never ran, and the record marks the figure irreproducible as filed. — |
| 0238 · ES U-6 | **UNPROVEN**: the cell never ran (guard headroom wall). — |
| 0239 · ES U-7 | **UNPROVEN**: real WHCM is Windows-only, and Playwright WebKit has no forced-colors emulation. — |
| 0240 · ES U-8 | **UNPROVEN**: the cell never ran (guard headroom wall). — |
| 0243 · EB U-3 | **UNPROVEN**: the cell never ran (guard headroom wall). — |
| 0244 · EB U-4 | **UNPROVEN**: try 1 used a stale selector (`[data-pane="picker"]`, which is `color-picker` at HEAD; now fixed), and try 2 hit a 120 s navigation timeout on the stalled dev server. `E/eb.out.txt` |
| 0247 · EB U-7 | **UNPROVEN**: the cell never ran (guard headroom wall). — |
| 0248 · EB U-8 | **UNPROVEN**: the cell never ran (guard headroom wall). — |
| 0249 · EB U-9 | **UNPROVEN**: the subject is deleted (`demo/ui/` is absent at HEAD), so neither arm can be rebuilt. `ls demo/ui` → absent |
| 0250 · EB U-10 | **UNPROVEN**: needs an AT pass. — |

#### B09-about — UNPROVEN 8

| row | measured reason (verbatim from the packet) |
|---|---|
| SS8-0260 | **UNPROVEN** Needs a Windows High Contrast (WHCM) engine. Playwright's `forcedColors:'active'` is emulation, which the record already rules cannot settle this. No WHCM host is reachable from this seat. |
| SS8-0261b | **UNPROVEN** At 1440 the port measures `scrollHeight 7174 / clientHeight 490` on the default OKLCh doc, and the lab doc measured 4557 in keys. The record does not name the viewport or doc that gives a 772 px client, so 1047.9-in-772 cannot be re-derived. scrol… |
| SS8-0262 | **UNPROVEN** (subject retired at HEAD) `E/cnl-all.json` geom: `alertCount 0`. The definition is a `<P>` at **16.4 px** on a `rgba(0,0,0,0)` parent. X-DS pass 3 V3C-08 replaced the well/Alert with a plain section (`ColorNutritionLabel.vue:13-23`). Per the SS-8 … |
| SS8-0265 | **UNPROVEN** (the WebKit arm was not run) Chromium half (`E/katex-chromium-k1-tab-sweep-geom-d5-forced.json` k1): `annotation` display `none`, height 0; the ariaSnapshot math name holds no raw TeX. A differential needs the WebKit arm. The host load sat at 107–… |
| SS8-0266 | **UNPROVEN** (WebKit/Safari not run) Chromium (`E/katex2-chromium-all-built.json` tab2): the overflowing row (no tabindex attribute, `tabIndex -1`) is reached at Tab press **33** (1440) and **16** (390) through keyboard-focusable scrollers, and ArrowRight scro… |
| SS8-0271 | **UNPROVEN** (heights PROVEN, scrollLeft limb undecided) Heights: **75.97–109.83 px** under `contain-intrinsic-size: auto 200px` (`E/katex-chromium-…json` geom). scrollLeft: cv3 set 160, sent the row to `top −309` (inside Chromium's content-visibility relevanc… |
| SS8-0273 | **UNPROVEN** The artifact was built (`E/0276-ghpages-census-r2.txt`) and served on :4399, but the faces cell was queued after the 75-min server window and the host load (107–133) blocked re-admission. The probe is ready: `B09_ORIGIN=http://127.0.0.1:4399/ … B0… |
| SS8-0275 | **UNPROVEN** The record makes no decidable claim. The Chromium emulation frame `E/0275-forced-colors-chromium.png` (`matches:true`) is emulation, not WHCM, and is kept for reference only. |

#### B10-browse — UNPROVEN 5

| row | measured reason (verbatim from the packet) |
|---|---|
| 0278 · BrowsePane U2 | **UNPROVEN** Needs a real iOS device. Headless emulation is exactly the apparatus the record says may be producing the artifact (K5), so no headless probe can decide this item. |
| 0292 · PaginationBar AT | **UNPROVEN** Needs a real screen reader. A headless browser has no AT speech queue, so it can show DOM order but not what the screen reader voices. |
| 0295 · PaginationBar Whether | **UNPROVEN** A design judgment against an intent that is not rendered (no outline variant ships to compare against). Frame for the ruling: `pager-1280-light-crop.png`. **Owner-ruling** (X-W8 DISSENT #6 / X-W10 canon). |
| 0296 · PaginationBar M1 | **UNPROVEN** `401 urn:contract:session-invalid` (`pager-m1-prod-flagged.txt`). Without the production admin token, the count cannot be read without mutating anything. |
| 0308 · SearchFilterBar R-11 | **UNPROVEN** Child-owned: the record routes it to `MiniColorPicker.md`'s residue, and that record's batch decides it. |

#### B11-browse-search-dialogs — UNPROVEN 11

| row | measured reason (verbatim from the packet) |
|---|---|
| **SS8-0324** · MiniColorPicker R-9 | **UNPROVEN** (an iOS touch-scroll arbitration witness needs WebKit on a touch device or the Simulator; headless Chromium `hasTouch` does not reproduce it, and no such engine is available to this seat). Measured: `touch-action: auto` on both surfaces in every c… |
| **SS8-0327** · TagEditPopover focus entry | **UNPROVEN** (the four cells were lost to the served app: run 1 (14:30) died on a 30 s `page.goto` timeout before the JSON flushed; run 2 (15:52) got `net::ERR_NETWORK_IO_SUSPENDED` and then 90 s `page.goto` timeouts, with `GET :9000/` taking 278 s at 14:44 an… |
| **SS8-0329** · TagEditPopover category ink | **UNPROVEN** (both paint cells lost to the served app; see 0327). Subject change seen in the surviving frame: the labels (`mood`/`style`/`use`) now render light, not brown, over the red/blue/peach fields, so the record's `rgb(112,89,66)` premise is stale. The … |
| **SS8-0330** · TagEditPopover `demo/ui/` bundle delta | **UNPROVEN** (moot at HEAD: the subject was deleted at `2ae7344d2`, so it has no bundle to measure; no `gh-pages` build was run). What remains of the cost limb belongs to the 7 root-barrel `@mkbabb/glass-ui` imports for the subpaths glass does not ship (Accord… |
| **SS8-0331** · TagEditPopover live geometry/emit | **UNPROVEN** (paint cells lost to the served app; see 0327). `E/tags.json` |
| **SS8-0332** · TagEditPopover TEP-6 | **UNPROVEN** (the client cell was lost to the served app. The server half needs a legacy row in a DB this seat may not write, and `createPalette` always sets a hash. The record calls it a hypothesis at every seat, and it stays one). `E/tags.json` `tep6` |
| **SS8-0333** · TagEditPopover cure designs | **UNPROVEN** (not a live proposition: a cure design has no served subject until the inspector seat lands; nothing to probe). — |
| **SS8-0335** · UserSortMenu US-6 | **UNPROVEN** (one of the required cells was measured; I-20 forbids inference across cells). The WebKit `light-fine` cell hit a 120 s `page.goto` timeout. The Chromium run (light/dark × fine/coarse) was queued by `guarded` for 2 h 40 m without admission (load 8… |
| **SS8-0336** · UserSortMenu US-12 | **UNPROVEN** (no screen reader can run in a headless seat, and the Chromium AX-tree cell, which would only be a proxy, was in the run that never got admitted; see 0335). — |
| **SS8-0337** · UserSortMenu US-5 | **UNPROVEN** (the Chromium run was never admitted; see 0335). — |
| **SS8-0338** · UserSortMenu US-8 | **UNPROVEN** (this needs the live admin corpus. The dev users list sits behind an admin token this seat does not hold, and the dev palette corpus is a fixture other seats wrote. Production admin answered 503 at `df97486e2`, F.REL .r4. The record notes the code… |

#### B12-card-shell — UNPROVEN 6

| row | measured reason (verbatim from the packet) |
|---|---|
| 0344 · PC U-5 | **UNPROVEN** (the re-run of this seat's cell did not complete: the dev server was unreachable from 16:35 and the guarded run was still waiting for it when this packet was written). Partial live datum from this seat's `shell` cell: skeleton 127.45 px vs card 12… |
| 0352 · Menu U-1 | **UNPROVEN**. Headless Chromium cannot set browser page zoom, and the only available arm is the substitution the canon forbids. For the record, that substitution (360×225 @DPR 4) puts the menu at `max-height` 90.9 px with **81 %** of its content scrolled out (… |
| 0355 · Menu U-4 | **UNPROVEN** (mis-aim frequency is a behavioural rate that one headless geometry read cannot give). Geometry witnessed: the open menu covers **2** next-row controls ("Colors of Probe Five", "Palette menu"), and the page is modal (`body pointer-events: none`). … |
| 0364 · Meta U-2 | **UNPROVEN** (routed by the record to X-W7 G9's measure-at-open; not duplicated). — |
| 0365 · Meta U-3 | **UNPROVEN** (needs screen-reader sessions; it gates nothing per the record). — |
| 0368 · Meta (not residue) | **UNPROVEN** (the record excludes it from residue, and this seat's `target` cell did not complete because the dev server was unreachable). — |

#### B13-card-swatches — UNPROVEN 5

| row | measured reason (verbatim from the packet) |
|---|---|
| V-6 | **UNPROVEN** — the 60-capture tally is a property of a historical capture set, and no live run can re-observe it Live: the loopback dev page does **not** latch `misconfigured`. Unrouted `#/browse` shows "No palettes published yet" (0 cards; the API really is e… |
| U-1 | **UNPROVEN** — no shipped mount renders the vertical branch, so there is no real node to measure vertical count = **0 on all 5 routes**. The only producer is `ExtractWorkbench :layout="layout === 'split' ? 'aside' : 'default'"`, and `ExtractPane.vue:9` hard-co… |
| U-8 | **UNPROVEN** — a build-byte measurement of a historical patch, with no live surface. Re-running it means reconstructing the L-3/L-6 patch against a tree that no longer has the subject. — |
| U-9 | **UNPROVEN** — the cited captures are not in the tree. The only matching file, `audit/visual/safari-real/picker-safari26.4-light.png`, was opened in full and shows the picker, not an add-slot. Live HEAD reading for context: every `.add-slot-ghost` carries 2 `<… |
| U-10 | **UNPROVEN** — the subject is gone. `SwatchHoverMenu.vue` at HEAD has no dead `tag`/`@click.stop` binding (props `color/open/size/ghost`), so a HEAD typecheck cannot witness the record's tree state. — |

#### B14-card-grid-skeleton — UNPROVEN 9

| row | measured reason (verbatim from the packet) |
|---|---|
| 0399 · PCG U-2 | **UNPROVEN** (perceptual severity is a human judgement that headless measurement cannot settle). Measured: the filtered-zero plate is in the DOM **31 ms** after `fill`, and the 1-match state 36 ms after. Grid height 825 → **245.5** (plate) → 127.5 (1 card). Th… |
| 0401 · PCG U-4 | **UNPROVEN** (needs a screen-reader session; the AX tree is not a transcript). The AX input to that session is fixed above: `list > article×6` with no `listitem`, and `list > status` in the empty states. `E/b14-populated.json` `axLists` |
| 0403 · PCG U-6 | **UNPROVEN** for the item as a whole. Limb (b) stays CONTINGENT: no caster exists, and the pressed card shows scale-only `1.0093 0.9514`, so `--cast-spread` never exists. Limb (a) is **measured**: on #/palettes the lone card's natural height is 100.5 px, and m… |
| 0405 · PCG U-8 | **UNPROVEN** (an announcement needs a screen-reader transcript). The DOM premise is **witnessed**: the `role="status"` node is inserted as one added node that already holds its text ("No palettes match. Nothing on the wall matches…"). The live region did not e… |
| 0406 · PCG U-9 | **UNPROVEN** (no working consumer is live: `grep 'surface="cartoon"' demo` = 0, and the card has no caster). The card's press is scale-only, `1.0093 0.9514`. `E/b14-populated.json` `castPressed` |
| 0416 · PCS U-9 | **UNPROVEN** (locating a citation is not a render fact). DEFECT-LEDGER `:30414` cites `:7499` for it, but `:7499` now holds the Sortable-drag row. The live seat trace does **not** reproduce the state: after a successful decode the plate gives way to the card a… |
| 0417 · SP Forced-colors | **UNPROVEN** for the item as a whole: the "swatch retained oklab" limb has no swatch at the empty rest, and no upload was made under forced colours. The capture **fills the hole**: plate bg `rgba(255,255,255,0)`, hairline and seams `rgb(0,0,0)` 1 px, cells tra… |
| 0418 · SP-1 | **UNPROVEN** (the subject is retired). The instrument face runs **0** animations (X-DS pass 8 V3C-02, static face), so the telemetry cannot be reproduced. `E/b14-extract.json` `k5.animations` |
| 0421 · SP-35 | **UNPROVEN** (unreachable, as the record states). The token is **absent** (`""`), so no probe can advance it. `E/b14-extract.json` `shadowSegToken` |

#### B15-palettes — UNPROVEN 6

| row | measured reason (verbatim from the packet) |
|---|---|
| 0429 | **UNPROVEN** (subject deleted) `useHoverPopover` was deleted at `a1f349a3f`, so the historical question cannot be decided from a live page. The successor glass Popover measures centred: `swatchCx 791 = panelCx 791, dx 0`. `E/b15-cpe.out.json` |
| 0434 | **UNPROVEN** (subject deleted) `PaletteSlugBar.vue` was deleted at `6bd9ff799`. The successor `SlugEditLayer.vue` has no raw `<button>` (grep), so no rendered subject remains. |
| 0435 | **UNPROVEN** (subject deleted) The help Popover went with the file at `6bd9ff799`. `SlugEditLayer.vue` has no `Popover`. |
| 0437 | **UNPROVEN** (subject deleted) 6/6 files fail: `Failed to resolve import "…/demo/palettes/browser/slug/PaletteSlugBar.vue"`, `Tests no tests`. The count cannot be retaken at HEAD. `E/psb-u5-repro-suite.out.txt` |
| 0438 | **UNPROVEN** (subject deleted) All inputs are geometry of the deleted component. The successor's error box (`role=alert`, SlugEditLayer) is a different subject. |
| 0441 | **UNPROVEN** (seed-relative) The three wells share one computed bg, `oklab(0.216 … / 0.08)` in light and `oklab(0.925 … / 0.08)` in dark, so the token identity is proven. The composited pixels track the hue-driven ambient: at accent oklch(.72 .16 298) light gi… |

#### B16-palette-dialogs — UNPROVEN 11

| row | measured reason (verbatim from the packet) |
|---|---|
| 0457 · MPD L-4 | **UNPROVEN** (subject gone): the `demo/ui/` dual-entrypoint shim was deleted at `2ae7344d2` (X.W12U.k), so the two closures being compared no longer exist. Measured instead: opening the dialog fetches **1** module (light; `foundation.css`) and **0** (dark), so… |
| 0462 · PRI U-2 | **UNPROVEN**: needs a live IME session. CDP `Input.imeSetComposition` does not reproduce an IME consuming a confirming Enter. The source premise stands at HEAD: `<form @submit.prevent>`, with no `isComposing` guard (PaletteNameInput.vue). (source) |
| 0465 · PRI U-5 | **UNPROVEN** (a screen-reader experience needs an SR transcript; the title-click entry path was not driven). Live finding on the **menu path**: focus is **not unconditional**. The field takes focus at +43 ms with the whole name selected (0..23), then the menu'… |
| 0467 · PRI U-7 | **UNPROVEN** (an owner ruling, not a probe). (record) |
| 0469 · VHD U-2 | **UNPROVEN** (not run): the WebKit arm could not start because the dev server stopped answering (see apparatus). The probe is written. — |
| 0470 · VHD U-3 | **UNPROVEN**: headless Playwright has no browser-zoom control. DPR or viewport emulation is the halving that VISUAL-CONSTITUTION §3.2 forbids. Needs a headed or real browser zoom. — |
| 0472 · VHD U-5 | **UNPROVEN** (not run: dev-server stall). The Windows-HCM limb is impossible on this Mac in any case. Chromium baseline at HEAD: the swatch computes `forced-color-adjust: auto` (not `none`), so VHD-23's mechanism stands in source. `E/vhd-chromium-rest-coarse-r… |
| 0473 · VHD U-6 | **UNPROVEN** (the coarse cell errored on a dev-server timeout, `page.goto` 30 s). Adjacent facts: in the fine-pointer cell, Revert computes **opacity 1, visible, 82.5×28**, so it is visible at rest with no hover (UIA-V-128). On the rename coarse arm, Chromium … |
| 0474 · VHD U-7 | **UNPROVEN**: a dated observation of production commons. The local dev commons is empty, and production is outside this seat's served scope. — |
| 0475 · VHD U-8 | **UNPROVEN**: those numbers describe the drawer before X.W12U.s2 and cannot be re-measured as the same subject. HEAD baseline: sheet **w 380, h 451.6, x 0**; well radius 16 px, row height 94.7; ring colour `oklch(0.959 0.033 82)`. **New observation:** in the 1… |
| 0476 · VHD U-9 | **UNPROVEN**: a token that does not resolve is refused **401** `urn:contract:session-invalid` before any write. An *authenticated-but-unresolved* session (a session row with no `userSlug`) cannot be minted through any current route (`session/service/auth.ts:76… |

#### B17-admin-shell-names — UNPROVEN 9

| row | measured reason (verbatim from the packet) |
|---|---|
| 0479 · AL AT triple announcement | **UNPROVEN** (needs a screen-reader session, and no headless AX read is a transcript). — |
| 0480 · AL 200%-text and Safari cells | **UNPROVEN**: the shipping-Safari limb cannot run headless. The 200%-text limb is measured in both engines: rows grow to 128 px, the actions stay on-card (right edge 1334 < row 1359), and there is no page overflow (scrollWidth 1440 = vw). The long name truncat… |
| 0482 · AL D-V density | **UNPROVEN** (not truth-apt per the record, so no probe can decide it). — |
| 0484 · ALS AT matrix | **UNPROVEN** (needs screen readers). — |
| 0488 · ALS M-15 | **UNPROVEN** (quarantine law: carried as given, not adjudicated by this seat). — |
| 0494 · ANP C-6/L-9 rendered box metrics | **UNPROVEN**. The `DevMisconfigError` runbook needs `VITE_API_URL` unset on a loopback page, and the served dev sets it, so the state is unreachable without re-serving with another config (`scripts/dev/dev.sh` is never touched). The reachable unavailable plate… |
| 0505 · AP C-9 KeepAlive-eviction race | **UNPROVEN** (no live window was manufactured). Static read only: `defineExpose` has 0 hits in `AdminUsersPanel.vue`, and `App.vue:166` reads `:max="PANE_CACHE_MAX[region.role]"`. The absence condition looks met, but that is a source read, not a witness. — |
| 0507 · AP type-cycle CI-breakage prediction | **UNPROVEN** (untested; the record marks it moot after MT-AU1 (7)). — |
| 0508 · AP L-5 43-module dev-fetch figure | **UNPROVEN**. Static read only: AdminPane no longer imports `../ui/{card,badge}`, so the two edges the figure counted are gone at HEAD. No dev-fetch count was taken. — |

#### B18-admin-panels — UNPROVEN 2

| row | measured reason (verbatim from the packet) |
|---|---|
| 0516 · AAP-22 | **UNPROVEN**. The live backend refuses the available token (403), so no live write was made. Against the stub the client shows the consequence: page 1 ends `tag:t19` and page 2 **starts `tag:t19`** (one row duplicated, from requests `offset=0`, then `offset=20… |
| 0527 · AF U-10 | **UNPROVEN** (the "reads as" is perceptual). Measured: the block ink is `oklab(0.216 …/0.08)` light and `oklab(0.925 …/0.08)` dark, an 8 %-alpha register, not raw `var(--muted)`. Block vs ground is **1.075:1** light and **1.141:1** dark. `E/flagged-skel.json` |

#### B19-color-chips — UNPROVEN 4

| row | measured reason (verbatim from the packet) |
|---|---|
| SS8-0536b | **UNPROVEN** The record names no element pair for the two 535.38 reads, so no probe could locate the coincidence to re-measure it |
| SS8-0550 | **UNPROVEN** This seat: count 12 (valuenow 12, 12 stamped) gave **0 long tasks in 5 of 5 opens**; count 1 gave 0 of 5; 11 steps gave 0. This batch's 2026-10-19 pass, at load ~38, logged 68 ms and 53 ms in 2 of 3 opens at count 12 (`E/../probe-b-timing_atmos_mo… |
| SS8-0554b | **UNPROVEN** No host renders a disabled chip row (no rendering host) |
| SS8-0557 | **UNPROVEN** A call count needs an instrumented module, and ESM bindings cannot be spied on from the page. AuroraPane is admin-gated and carries another seat's uncommitted hunks. This rides X.W6.i's harness |

#### B20-gradient-visualizer-code — UNPROVEN 9

| row | measured reason (verbatim from the packet) |
|---|---|
| 0568 · forced-colors paint truth | **UNPROVEN** (needs real WHCM, K-D3). Emulation reading only, not a verdict: resting border **rgb(0,0,0)** vs error border **rgb(255,255,0)**. Under Chromium emulation the two borders do not converge. `E/probe-a.json` `forced`; `E/a-forced-emulated.png` \| — |
| 0570 · iOS autocapitalize/smart-substitution corruption | **UNPROVEN** (needs an iOS device). Live re-measure: `autocapitalize`, `autocorrect`, `inputmode` and `dir` are all **null**. Only `spellcheck="false"` is present. `E/recon.json` `editorStyle` \| — |
| 0576 · C-R24 mutation run | **UNPROVEN** (not executed). The control-vs-mutant pair needs about two full spec runs against `:9000`, and during the seat `:9000` repeatedly refused connections under machine load 85–184. The apparatus is committed and ready. By static read, no spec blurs af… |
| R-3 (0579) · RTL mirroring | **UNPROVEN** (the RTL cell never ran validly). The LTR control is measured: a mint at clickX 339.5 lands at **339.4 (−0.1 px), value 23.6**, and ArrowRight moves it to 24.6. The first RTL pass's init script failed (`documentElement` was null at init; `htmlDir`… |
| R-5 (0581) · WHCM composite | **UNPROVEN** (needs real Windows HCM). Only the editor's emulated borders were read (see 0568). — \| — |
| R-9 (0585) · R2-1 blast frames + two HYPOTHESIS vectors | **UNPROVEN** overall. The **blast-frame limb is REFUTED at HEAD**: bodyText goes 501 → 449/447/445/440, there is no boundary and no "Try again", the editor stays alive, and each case gets a verdict. The **two exposure vectors were not driven** (no overshoot dr… |
| R-10 (0586) · stop-ID collision | **UNPROVEN** (a latent race that no single run reproduces). Live IDs have the form `stop-<n>-<base36 time>`, for example `stop-3-mvfmcrs4`. `E/probe-b.json` `r3-ltr.minted.id` \| — |
| R-11 (0587) · GV-36 fallback UX | **UNPROVEN** (the true eval-throw cell did not run). The pass that did run served a stub with **no exports**. That is an ESM **link** error (`does not provide an export named …`), not an evaluation throw. It landed as **neither the ErrorBoundary nor an unbound… |
| R-12 (0588) · per-tick cost figures | **UNPROVEN** (not measured). Attempt 1: the module was not in the resource timing list (specifier `undefined`). Attempt 2: the root-relative URL is not importable (`Failed to fetch dynamically imported module`). Attempt 3: the `/@fs/` URL, which curl confirms … |

#### B21-gradient-easing — UNPROVEN 26

| row | measured reason (verbatim from the packet) |
|---|---|
| SS8-0592 | **UNPROVEN** (no Tab sequence was executed because the browser pool was wedged) Census, not a decision: in the rendered stage the Preset combobox is a native `<button role=combobox>` with no `tabindex=-1`, placed after the handles and the roving Curve-mode but… |
| SS8-0593 | **UNPROVEN** (no pixel sample taken; pool wedged) — |
| SS8-0594 | **UNPROVEN** (pool wedged; subject changed: the 19rem cap V14C-01 and the `--vb-ratio` aspect law now set the box) — |
| SS8-0595 | **UNPROVEN** (the record files it to the ErrorBoundary seat with the mechanism UNRESOLVED; the statement it names is not identified in this record, so this seat had no subject to probe) — |
| SS8-0596 | **UNPROVEN** (pool wedged; the source now declares an `aspect-ratio` transition under `no-preference`) — |
| SS8-0597 | **UNPROVEN** (pool wedged; producer source now carries a CUSTOM item, glass EasingPicker.vue:527-532) — |
| SS8-0598 | **UNPROVEN** (pool wedged; the recon role census lists one labelled svg, `role=img`, but it did not count unlabelled or role-less svgs) `E/recon.json` (partial) |
| SS8-0599 | **UNPROVEN** (pool wedged; the consumer's rAF sites are gone at HEAD, but the producer's nested double rAF at glass EasingPicker.vue:276-277 remains) — |
| SS8-0601 | **UNPROVEN** (pool wedged; subject changed: no `.glass-card` at glass 10.1.0, and the override now targets `[data-slot="easing-picker"]`) — |
| SS8-0602 | **UNPROVEN** (pool wedged) — |
| SS8-0603 | **UNPROVEN** (the transcripts are historical runs and were not repeated) Context: at HEAD the canvas svg *is* `role="img"` (`E/recon.json`), so the mismatch the transcripts recorded does not stand at HEAD. See SS8-0612. |
| SS8-0604 | **UNPROVEN** (pool wedged) — |
| SS8-0605 | **UNPROVEN** (pool wedged; subject changed: head name is now `text-foreground`, V2C-07) — |
| SS8-0606 | **UNPROVEN** (pool wedged; at HEAD `--ink-muted` is used only on the open-rail caption, `.rail-caption`) — |
| SS8-0607 | **UNPROVEN** (pool wedged) — |
| SS8-0608 | **UNPROVEN** (pool wedged; source still pairs `outline: none` with `box-shadow: var(--focus-ring-shadow)` on `.rail-btn:focus-visible`) — |
| SS8-0609 | **UNPROVEN** (pool wedged; the claim needs a real iOS arm in any case, and Chromium emulation cannot close it) — |
| SS8-0610 | **UNPROVEN** (pool wedged) — |
| SS8-0611 | **UNPROVEN** (pool wedged; recon shows one `role=status` (`easing-copy-status`) inside the stage subtree, but its `aria-live` attribute was not read in that run) `E/recon.json` (partial) |
| SS8-0613 | **UNPROVEN** (pool wedged; no fresh number exists) — |
| SS8-0614 | **UNPROVEN** (pool wedged) — |
| SS8-0615 | **UNPROVEN** (needs a real mobile virtual keyboard; headless emulation cannot raise one) — |
| SS8-0616 | **UNPROVEN** (pool wedged; source declares a dual-contrast focus ring, 1px dark inner under 3px light outer, GradientStopRail.vue:255-270) — |
| SS8-0617 | **UNPROVEN** (a harm-threshold judgment for affected users; owner-ruling class, not decidable by a probe) — |
| SS8-0618 | **UNPROVEN** (pool wedged) — |
| SS8-0619 | **UNPROVEN** (pool wedged) — |

#### B22-gradient-specimen — UNPROVEN 1

| row | measured reason (verbatim from the packet) |
|---|---|
| **U-8** SS8-0627 | **UNPROVEN** (no flake reproduced; a systematic edge overshoot instead) `main.keep.out.json`. All 10 trials behave the same: scrollLeft 1138–1139 of max 1140–1141, pressed, `scrollYDelta 0` (no page yank). The strict in-port check fails **10/10 deterministical… |

#### B23-mix-canvas-result — UNPROVEN 7

| row | measured reason (verbatim from the packet) |
|---|---|
| SS8-0638 | **UNPROVEN** (the instance numbers are viewport/content-bound and the record names no viewport) At 1440×900 the pane is **510×619**: the width reproduces, the height does not. The pool share πr²/(w·h) is **0.78 %** (r=28), the same formula that gives 0.71 % at… |
| SS8-0643 | **UNPROVEN** (partial; no perceptual grade from alpha samples, and N=12 not captured) `E/canvas-seam.json`: largest single-frame centre-alpha step in the hand-off window is −33/255 (N=2, 814→815 ms), +41 (N=3), +53 (N=8). Every N shows a 41→8 drop near ~770–81… |
| SS8-0644 | **UNPROVEN** (Chromium: no divergence; WebKit not sampled because the lock was not granted) `E/k13-chromium.json`: classic bar 15 px, parent clientWidth 385, canvas CSS width **385**: agree. Live app: parent 766 / canvas 766 (parent `overflow-y:hidden` at HEAD… |
| SS8-0647 | **UNPROVEN** (meta) Not adoptable wholesale. This seat re-proved the following independently: miss 203 px on re-mix / 0.8 px on first mix (R-1), backing store 1.204 MB (R-3), pane 510×619 (R-5), null rate 0/3 (R-6). L's own numbers stay unadopted. |
| SS8-0653 | **UNPROVEN** (2 of 3 limbs decided) `E/result-c6.json`. **Focus (R6-2): reproduced** — Reset by keyboard → `activeElement` **BODY**, plate unmounted (matches C). **Identity (R6-3): split** — the first face is **not** the same DOM node after a re-mix (`sameDomN… |
| SS8-0657 | **UNPROVEN** (pin-bound; L's pin not re-measured) `E/r10-closure.json` at glass **10.1.0**: barrel **75 modules / 239,068 B** vs `dom` **6 / 12,622 B**. MixResultDisplay imports `useClipboard` from `@mkbabb/glass-ui/dom`. Same order (~19×); not load-bearing (a… |
| SS8-0660 | **UNPROVEN** (retired by the record; not spent, by law) — |

#### B24-mix-config — UNPROVEN 5

| row | measured reason (verbatim from the packet) |
|---|---|
| SS8-0661 | **UNPROVEN** (the deciding cell — the Safari app under main-thread starvation — was not available; headless WebKit settles) `E/webkit.out.json`, frames `E/r1-webkit-*.png`: in all three WebKit cells the pane settles — at 0 ms the `pane-shell` carries only its … |
| SS8-0679 | **UNPROVEN** (no stable modal at the default seed) `E/cells-b.out.json`: dark plate band modal [115,22,16] at only **2.2 %** share (n=7,750) — a gradient ground, no dominant colour; the record names no seed, so no figure can be confirmed or refuted. |
| SS8-0688 | **UNPROVEN** (neither arm fired in this seat's runs) Both takes stop at `page.goto("/")` (ERR_ABORTED, harness), before `openView` (the dock arm) or the add-slot assertion; so this seat cannot say which fires first. B23's run against its own dev vite reached `… |
| SS8-0691 | **UNPROVEN** (A/B not run) The A/B needs two builds that differ only in `package.json#sideEffects` / the entry. Editing either in the shared tree is outside this seat's paths, and no isolated worktree build was run. BASELINE that would be named: this seat's bu… |
| SS8-0694 | **UNPROVEN** (owner-ruling) A design judgment over live geometry; the record itself withholds it from defect status without an owner ruling. Geometry not re-taken. |

#### B25-extract-inputs — UNPROVEN 5

| row | measured reason (verbatim from the packet) |
|---|---|
| 0702 · EC-8 real WHCM | **UNPROVEN.** Real WHCM is unavailable on this macOS seat. Under Chromium `forcedColors:"active"` emulation the rail computes `background-color: rgb(255,255,255)`, `background-image: none`, `box-shadow: none`, and the rail interior paints Canvas (~240,236,232)… |
| 0706 · pin-hold provenance | **UNPROVEN.** This is not decidable by a live witness. It stays an owner/formation question (X-W0 sitting). — |
| 0712 · U-6 real Safari amplitude | **UNPROVEN.** No device, and WebKit-desktop emulation has no URL-bar collapse. — |
| 0716 · sticky hover on touch | **UNPROVEN.** In Chromium touch emulation `matches(':hover')` is false and the svg transform is `none`. But `(hover: hover)` is false and CDP touch emulation does not synthesize the compatibility mouse events that make hover sticky. A real touch engine (iOS Sa… |
| 0718 · D-14 vue-tsc gate | **UNPROVEN.** The subject is gone from the tree, so the historical gate claim can only be witnessed by a typecheck at the record's commit, which this seat did not run. — |

#### B26-extract-generate-panes — UNPROVEN 5

| row | measured reason (verbatim from the packet) |
|---|---|
| 0723 · C transcript | **UNPROVEN** (a bundle of six numbers; one limb measured). The 142 px-hidden number does not reproduce: the in-pane host reads **clientH = scrollH** at every k (754/818/818/882), so nothing is hidden. The Tab walk past the eyedropper badge reads Replace image … |
| 0730 · coverage note (pane) | **UNPROVEN.** A catch-claim needs a mutation-seeded suite run, which is not an observation. Measured premise drift: `/extract` is now driven by `o9-shadow-palette`, `crash-battery`, `ss8-z1-app-chassis`, `o18-contrast-census` and 12 visual goldens (`e2e/visual… |
| 0738 · C-22 | **UNPROVEN.** Needs fault injection into the quantize worker (a stalled or poisoned worker) to hold `isProcessing`. That is an intervention, not an observation, and this seat ran none. In every image load here the skeleton cleared within 249–264 ms (`loadMs`).… |
| 0739 · coverage note (workbench) | **UNPROVEN** (same reason as 0730: a catch-claim needs a mutation run). — |
| 0751 · R-12 | **UNPROVEN.** Needs WebKit with touch, and ideally a real iOS device. The `ex-webkit` lock was held by a queue of five `--exclusive webkit` runs for the whole session, and no iOS hardware is attached. — |

#### Z1-app-chassis — UNPROVEN 4

| row | measured reason (verbatim from the packet) |
|---|---|
| Z-App-3 | **UNPROVEN**: no admin token here. Anonymous loads resolve to the Not found view (H1 "Not found", status "/admin/users could not be opened."). The authed arm was not reachable. `E/prod-app-routes.json` |
| Z-Dock-2 | **UNPROVEN**: no admin token here. `adminAuthenticated:false`. `E/prod-dock-latch.json` |
| Z-Dock-15 | **UNPROVEN**: the composited-band L measurement was not run, and the referent is unavailable (Z-Dock-13), so the comparison has no input — |
| Z-LG-10 | **UNPROVEN**: the anonymous viewer is routed to Not found (which *is* one full-width region, 1042 px), and the consoles were not rendered `E/prod-app-routes.json` |

#### Z2-picker-cohort — UNPROVEN 5

| row | measured reason (verbatim from the packet) |
|---|---|
| Z-ColorPicker-24 | **UNPROVEN** Not reproduced in the Chromium dev cell: no context-lost line in 9 cells. The record banks the decider on the **built artifact** across both matrices, including WebKit. Neither was run. |
| Z-ColorPicker-25 | **UNPROVEN** The dev cell shows `/demo/picker/debug/usePointerDebug.ts` fetched at boot and `PointerDebugOverlay` not fetched. The record's claim is a bundle delta, which needs the built artifact. Not run. |
| Z-ColorInput-11 | **UNPROVEN** 0 on keyboard focus **and** 0 on hover. The detector failed on the positive control, so the keyboard 0 decides nothing. |
| Z-ColorInput-12 | **UNPROVEN** the echo was not captured (same instrument failure) |
| Z-ConfigSliderPane-17 | **UNPROVEN** The record itself classes the shader arm UNVERIFIABLE (glass metaball behaviour). The live `aria-disabled` count is 0/31 at satellites=3, not at 0; this seat did not drive Satellites to 0. |

#### Z3-workbench-about-cohort — UNPROVEN 7

| row | measured reason (verbatim from the packet) |
|---|---|
| Z-GenerateControls-4 | **UNPROVEN** (not run) The only witness is `npx playwright test e2e/smoke/oracles/o20-generate-plate.spec.ts --project=smoke`. Its `webServer` reuses `:8090`, which is another seat's live vite and answered `curl` in 29.8 s, and its second `webServer` builds an… |
| Z-GenerateControls-16 | **UNPROVEN** (no live instrument) The claim times `presetStops`/`harmonyStops`, which are template calls inside the dropdown's option rows. The BUILT bundle does not expose them, and a page-level timing (open the Preset listbox at count 5 vs 12) would add Reka… |
| Z-GenerateControls-19 | **UNPROVEN** (intermittent class) The record calls the drift intermittent and hands it to the shell lane, with the o20 run as its mechanical re-trigger. One headless boot cannot decide an intermittent claim, and o20 was not run (see -4). Nine fresh `#/generate… |
| Z-GradientStopEditor-7 | **UNPROVEN** (not observable in the built DOM) The claim counts model emissions per move. Vue batches both writes into one DOM flush, so a DOM-side MutationObserver cannot tell one write from two, and the BUILT bundle exposes no emit hook. A witness needs an i… |
| Z-GradientStopEditor-12 | **UNPROVEN** (not run) Same blocker as Z-GenerateControls-4: the smoke project's `webServer` binds `:8090` (another seat's vite, 29.8 s per request) and builds `:8091` in the shared tree. The workflow arm is source-only and not upgraded. |
| Z-GradientStopEditor-20 | **UNPROVEN** (not run) This sweep never minted 10 stops. Arithmetic on the rail width is not a live witness and does not upgrade the claim. |
| Z-Markdown-7 | **UNPROVEN** (no "before" state) Both are before/after pairs around the record's own cures. Neither cure's "before" build is served or captured anywhere this seat can reach, and HEAD is already past both edits (`Markdown.vue` and `useMarkdownColors.ts` were mo… |

#### Z4-admin-library-parser — UNPROVEN 5

| row | measured reason (verbatim from the packet) |
|---|---|
| Z-AdminUsersPanel-25 · D-28 | **UNPROVEN(not measured)**: the users row's identity start (x 13 inside its wrapper) was read, but the sibling Admin routes' identity start was not. The comparison was not run, and the sibling panels (`AdminNamesPanel`, `AdminTagsPanel`) are dirty with another… |
| Z-AdminUsersPanel-27 · D-33 | **UNPROVEN(not run)**: no forced-colors cell this slot (one browser run per slot under a wedged pool). — |
| Z-library-band-13 · MTS-05 singular 3D | **UNPROVEN(subject deleted)**: `decomposeMatrix3D` is absent from `src/` and from every subpath (`4be221892` "retire the unused matrix family"). No live call is possible. Owner act: the record's carry retires by subtraction, citing `4be221892`. `E/numeric-head… |
| Z-library-band-15 · W.L5 π grey curves | **UNPROVEN(the fourier app is not served in this slot)**: the delta "four grey curves → four distinct hues" needs a fourier frame. The mechanism (`cssVarToHex`) is deleted (row 14), but the visual is undecided. — |
| Z-library-band-19 · W.L9 keyset tie / boot / idempotency | **UNPROVEN(a live witness needs fixtures the api will not take)**: `createdAt` is server-minted, so a 5-way tie cannot be produced through the public api. Boot resilience needs an api restart with a seeded malformed row, which would touch a shared service othe… |

## 7. blockedByDirty rows: re-attempted at CLOSE

| row | blocked on | state at CLOSE (2026-10-20 ~22:00) | outcome |
|---|---|---|---|
| B12 SS8-0342 PC U-3 (WHCM limb) | `demo/shared/ui/PaletteColorStrip.vue`, which held B10's uncommitted `data-color-surface` hunk | **clean.** The hunk landed at `6aa74e30f` (B10 SS8-0285), and the strip root carries `data-color-surface` (`PaletteColorStrip.vue:6`) | **Cure landed** through `6aa74e30f`. Status stays **REFUTED** (verbatim). Falsifier `demo/test/palettes/ss8-b10-browse.test.ts` "SS8-0285 · the colour strip is a colour surface" is **GREEN x2** (vitest-run1/2). A live `forcedColors` pixel re-read of the strip was **not run** at CLOSE, so the WHCM pixel claim stays **UNPROVEN** |
| B18 SS8-0514 height limb | `demo/palettes/admin/panels/AdminListSkeleton.vue`, which held B17's uncommitted SS8-0487 column hunk | **clean.** B17 landed at `4c4506b9a` | **Re-armed and GREEN x2.** `test.fixme` → `test` in `e2e/smoke/admin/ss8-b18-admin-panels.spec.ts` (this commit). e2e-run1 measured shadow h 81.01 = row h 81.01 (gap −0.23 = −0.23). e2e-run2 measured 78.97 = 78.97 (gap 1.80 = 1.80). Both runs GREEN. No RED-before exists on today's tree, because the column cure predates the re-arm |
| Z2 Z-ColorPicker-14 | `demo/styles/shell.css`, which held an uncommitted golden-split hunk | **clean.** The split landed with Z1's `fe398ede2` (per-route golden / 2:1 tracks) | **Still RED, now on committed bytes.** Settled seam = **42.578 px** against the 14.87 ceiling, in e2e-run1 and e2e-run2 (`ss8-z2-picker-cohort.spec.ts:93`, soft). The packet's cause (the golden split widens the picker, so `--blob-fp` reaches 11rem and the W20 `.title-row` min-height grows) now sits in HEAD. The row stays **REFUTED** (verbatim). Its re-read at HEAD contradicts the refutation, so it is **ROUTED to the orchestrator**: Z1 `fe398ede2`'s split has to be reconciled with the W20 title-row seat reservation. This seat did not attempt a cure, because two cure seats' committed work collides on it |
| B13 (not a row) | `demo/test/palettes/palette-card-layout.test.ts` holds an uncommitted "SS-8 B13 · the expanded swatch band" block that no committed seat owns | **still dirty** (another seat's hunks) | Not touched and not run at CLOSE. Its L-3 case asserts 4.5:1 while L-3 is routed for an owner ruling (§4.3) |

B05 observation: the T-36 HTML comment swallowed `<DockSeparator>` in `ActionBarToggle.vue`. That file is clean at HEAD, and `fe398ede2` (Z-Dock-10) deleted the main-layer separators by design. Nothing remains.

## 8. Cure falsifiers re-read on the current tree

### 8.1 Tree and apparatus

- **Tree:** `tranche-u` HEAD `29798d5df` plus other seats' dirty hunks: `PalettesPane.vue`, `AboutPane.vue`, `PaneShell.vue`, `PaneLoadingPlate.vue`, `foundation.css`, `o11`, `palette-card-layout.test.ts`.
- **Producer drift:** another seat's uncommitted bump `@mkbabb/glass-ui` **10.1.0 → 10.1.1** in `package.json` / `package-lock.json`, installed in `node_modules`. Every SS-8 cure was witnessed against glass 10.1.0, so this re-read runs against a producer that none of them saw.
- **Runs:** each through `~/.claude/guard/guarded`. vitest `--maxWorkers=2` (the plate-mass re-run `--maxWorkers=1`), playwright `--workers=1` headless Chromium on the suite's own server (`VJS_E2E_PORT=8297`; `:9000` answered `000`). Host load 16–30.
- **Evidence:** `evidence/CLOSE/`. Runners: `probes/CLOSE/e2e-falsifiers.sh`, `probes/CLOSE/e2e-retry.sh`.

### 8.2 vitest falsifiers

These are the 37 files listed in `evidence/CLOSE/vitest-files.txt`, which covers every vitest falsifier named in a packet's `## cures` section, minus the dirty `palette-card-layout.test.ts`.

| run | result |
|---|---|
| vitest-run1 | 36 / 37 files, 452 passed, 2 skipped. The FAIL is `plate-mass.test.ts` "plate at 390 px", a `beforeAll` `page.goto` 30 s timeout in its browser harness |
| vitest-run2 | 36 / 37 files, 451 passed. The FAIL is `plate-mass.test.ts`: the 390 harness `goto` timeout plus the N-17 test's 5 s timeout at 1440 |
| plate-mass alone, x2 (`--maxWorkers=1`) | 2 passed, 2 skipped. The 390 harness `goto` timed out again both times |

Verdict:
- **All 36 other files are GREEN x2.** They cover B01, B02, B03, B04, B08, B09, B10, B11, B12, B13, B14, B16, B18, B20, B21, B23, B24, B25, Z2, Z3 and Z4.
- `plate-mass.test.ts` is a touched-suite regression guard from B10/B16, not a cure falsifier. Its 390 harness is **UNPROVEN at CLOSE**, an instrument fault that the B10 and B16 packets also recorded.
- **api:** `api/src/modules/palette/__tests__/palette-votes.test.ts` (B12 SS8-0366 api) is **GREEN x2** (5/5, `api-votes-run{1,2}.txt`).

### 8.3 e2e falsifiers

There were two full runs (e2e-run1: 90 passed / 6 failed; e2e-run2: 88 passed / 8 failed), then a targeted retry x2 of every spec that was not GREEN x2. retry2 was hit by a frame-detach storm (`net::ERR_ABORTED; maybe frame was detached?`) from concurrent seats' HMR and dist rebuilds, so its failures with that error carry no verdict.

**GREEN x2, both full runs:**

| spec | passing tests | batch |
|---|---|---|
| `ss8-b07-pane-shell` | 10/10 | B07 |
| `ss8-b12-card-shell` | 2/2 | B12 SS8-0363 |
| `ss8-b14-skeleton-ink` | 2/2 | B14 SS8-0408 |
| `ss8-b15-palette-cards` | 3/3 | B15 |
| `ss8-b17-admin-names` | 8/8 | B17 |
| `ss8-b18-admin-panels` | 10/10 | B18, including the re-armed height limb |
| `ss8-b20-gradient` | 4/4 | B20 |
| `ss8-b22-gradient-specimen` | 6/6 | B22 |
| `ss8-z1-app-chassis` | 6/6 | Z1 |
| `o22-status-lamp` | 4/4 | B06 |
| `ss8-z2-picker-cohort` | 8/9 | Z2. The ninth is Z-ColorPicker-14 (§7) |
| `o14-preview-truth` | 6/7 | B19 0539 / 0546 / 0559a legs |
| `o33-dock-actionbar-b05` | 7/9 | B05 |
| `ss8-b26-cures` | 2/3 | B26 |

**NOT GREEN x2 on the current tree.** These are cure seats' falsifiers that this CLOSE could not re-read GREEN twice. The rows' statuses stay as written. The cures are not withdrawn, and each is routed back to the orchestrator:

| falsifier | runs (✓ GREEN / ✘ RED / T timeout) | reading |
|---|---|---|
| `ss8-b19-color-chips` R-13 (SS8-0537), light + dark | run1 light ✘ / dark ✓ · run2 light ✓ / dark ✘ · retry1 **both ✘** · retry2 both T | **REAL RED, assertion not timeout.** Head rim step **154** (light) and **65** (dark) against interior slope 0 (rim 194,91,135 / 118,49,69, first stop 107,198,112). The R-13 outline no longer reads as a seamless outset boundary. Suspects: the glass 10.1.1 drift, or the uncommitted `foundation.css` hunk. **Re-open for B19's owner. The 4f6116d49 cure's GREEN does not hold on today's served tree** |
| `o33` 0132 (Tools ink ≥ 4.5 on the light band) | run1 T (hue 0, 60) · run2 ✓ · retry1 ✘ (**4.42**) | Reproduces the cure seat's own "RED x1 only" (4.23–4.35 at 14:50). **Not stably GREEN**, so 0132 stays mechanism-cured with its UNWITNESSED second RED, and the live ink sits at the floor |
| `o33` 0146 (seat row on `--dock-layer-gap`) | run1 ✓ · run2 ✓ · retry1 ✘ (5.398 < 5.5) | GREEN x2 in the full runs, then ✘ by 0.1 px in the retry. Likely sub-pixel at load. Recorded |
| `o33` 0125 (equal separator air) | run1 ✓ · run2 ✘ (air delta 2 px) · retry1 ✓ | GREEN x2 of 3. Recorded. Z-Dock-10 (`fe398ede2`) deleted main-layer separators after B05's cure, so the two cures share a surface |
| `o33` 0122/0136 (bar-less /atmosphere) and 0140 (coarse floor / 200 % zoom) | one `waitForSelector` / frame-detach T each | instrument, no verdict. Each passed in the other runs |
| `o14` ramp feasibility (dark) | run1 ✓ · run2 ✘ · retry1 ✓ | GREEN 2 of 3 |
| `ss8-b26-cures` X-5 phone (SS8-0726 polite status) | run1 ✓ · run2 ✘ (element not found) · retry1 ✓ · retry2 ✘ | GREEN 2 of 4. Flaky at load, so the live witness is not stable |
| `ss8-b26-cures` R-2 (SS8-0741) | ✓ ✓ · retry2 frame-detach | **GREEN x2** in the full runs |
| `palette-flag` (B11 SS8-0309 + the flow) | T in every run (`page.goto` / dialog `toBeVisible` timeouts at 30–60 s) | **UNPROVEN at CLOSE.** The cure seat's live RED x2 → GREEN x2 stands as its record, and this re-read could not reach the dialog |
| `ss8-z2-picker-cohort` Z-ColorPicker-14 | ✘ ✘ (42.578 px) | see §7 |

Two rows are now flagged for the orchestrator: **B19 R-13 (SS8-0537)** and **Z-ColorPicker-14**. They are named so that no one carries a "cured" claim forward on them silently.

### SS-8.r ruled rows

COHESION §0gk.2 / §0gk.3, the delegate-ruled consumer rows. Seat: SS-8.r (claude-opus-5-5), 2026-10-27, `tranche-u`. Own vite on `:9147` (guarded), headless Chromium with the smoke project's SwiftShader WebGL, `--workers=1`. Falsifier spec: `e2e/smoke/ss8r-ruled-rows.spec.ts`, plus one case in `o33`. Recon probe: `probes/SS8r/recon.mjs`. Evidence: `evidence/SS8r/` (`recon-r0..r4*.json`, `red-0440.txt`, `e2e-green-run{1,2}.txt`, `o7-run1.txt`). Glass-ui was not touched. The §0gl.3 / §0gm.4 caption cells (Track A) were not redone.

| row | ruling | outcome | falsifier | RED before | GREEN |
|---|---|---|---|---|---|
| B15 SS8-0440 | elevation reads the same in both schemes; scheme-aware `--well-bg` lift at `foundation.css:407` | **CURED.** `--well-bg` is now a lift in both schemes, toward the scheme's light pole: `:root` uses `color-mix(in oklab, var(--background) 14%, transparent)` (paper), and `.dark` uses `color-mix(in oklab, var(--foreground) 8%, transparent)` (cream ink, unchanged). Measured ΔL (fill minus host): light **+0.025..+0.041**, dark **+0.032..+0.047** (`recon-r2/r3`), so the sign and the magnitude now match | `ss8r-ruled-rows` "SS8-0440", light/dark × 2 seeds. Inline-start edge sampling: median ΔL over the card's own-surface rows must be > 0.015 | light **−0.041 / −0.184** with the old 8% `--foreground` wash restored (`red-0440.txt`); dark GREEN | ×2 (run1, run2) |
| B13 L-3 | the 4.5:1 floor wins over P9R-04; the attribution ink takes the token step that clears ≥ 4.5:1 in both schemes | **CURED.** `PaletteCardSwatches.vue` attribution: `text-muted-foreground` → `text-(color:--muted-foreground-strong)`. On the lifted well (0440), over the darkest ground pixel under the text box (referent law), the strong step reads light **4.77–5.17**, dark **6.46–6.84** across 5 seeds. Bare muted still fails on the lifted well (light default seed 4.44), so the step is owed | `ss8r-ruled-rows` "B13 L-3", light/dark × 5-seed sweep. The ink is the strong step, and min contrast over every ground pixel is ≥ 4.5 | `recon-r1` (HEAD): light **3.41–3.82**, every rung of the dark pole ≤ 3.82 on the sinking well | ×2 |
| B03 SS8-0085 | move the clip; the hero clips at the viewport; bead placement unchanged | **CURED.** `seat.css .hero-blob-anchor` adds `clip-path: inset(calc(-1 * (var(--blob-seat) + 0.75rem)))`. The hero clips its own paint one seat-plus-gutter-floor beyond its box. At 390 that is exactly the viewport edge: anchor right 378 + 12 = 390, with the canvas still at 411.6. The bead body sits 0.175·fp inside the wrapper, so only transparent overscan is cut. The producer's 1.6× canvas is untouched | `ss8r-ruled-rows` "SS8-0085", `#/` and `#/blob` at 390 touch. Checks: canvas right > vw (the clip is load-bearing); clipped paint right ≤ vw; `documentElement`/`body` scrollWidth ≤ vw; anchor flush to the pane-shell top-right less `--blob-seat` | HEAD: no clip (`clipPath none`), painted canvas to **411.6 > 390** (`recon-r0` hero) | ×2 |
| B05 SS8-0140 | record-only: icon-only by design, accessible name asserted | **RECORDED + asserted.** The 390 Tools seat is icon-only (S.W7-2). Its name is the accessible name | `o33` "the icon-only Tools seat carries its accessible name": exactly one button named "Toggle action bar", visible, `toHaveAccessibleName`, wordmark hidden | n/a (record-only) | ×2 |
| B24 U-11 (SS8-0694) | read; cure at root by the default rule, or record why nothing is owed | **NOTHING OWED (recorded).** D-22, "three compositions in one file", was a MINOR composition note that PASSED the no-god-modules edict (`challenge-D-design.md` §4). Its discharge condition ("the disclosure leaves with the private card dialect") is met at HEAD. The private card dialect is gone: A2-VA-L1-5 merged the two palette lists into ONE list whose rows compose the shared atoms `PaletteSpecimen`, `SwatchButton` and `EmptyState`, and the one list serves both modes. The D-axis figures (well ink ~4.6 %, the 23.8 % share) are D-3 / proportion design judgments with no binding law (the same K-5 reading §0gk.2 gives B15 0422 / 0444). Under the default rule (no law, so no defect row), nothing is cut | none (no law to falsify) | — | — |
| B02 SS8-0039 | consumer cure; the caption reaches its ink through a token step, never opacity | **NOT CURABLE AS RULED: ESCALATED (ESC-SS8r-0039).** The opacity limb is already discharged: `opacity-60` is retired, and the caption is `text-muted-foreground` in the floating seat. The light failure is not an ink-step gap. The rail tooltip (`.glass-floating.glass-overlay-plate`) composites, in light, to a dark tinted ground: WCAG luminance **0.090–0.156** under the caption across 4 seeds. The certified floating pair already sits at the dark pole (`--ink-floating-muted` = `--ink-floating-primary`, L 0.018–0.019), and the dark pole reads **2.80 / 3.00 / 3.22 / 3.39 : 1** over the darkest ground. Every rung (bare, strong, 61.8 %, primary) is identical, so there is no further step. Only the light pole clears it: **5.10–5.76 : 1**. The tooltip's title, on the same plate, has the same 2.8–3.4 : 1. Dark scheme GREEN: bare 5.06–6.13 | probe only (`recon-r1` caption cell); not admitted to the suite while it is RED | — | — |

**ESC-SS8r-0039 arms** (for the delegate). The cause is that the floating pair is certified over the bare ambient field (`useContrastSafeColor.ts` `floatingL`), while the rail tooltip sits over the picker plate and console, a darker composite in light.
- (a) **Ground:** glass's tooltip plate takes a denser rung in light. `TooltipContentProps` exposes no material or rung prop, so this is a glass O-87 relay with these numbers. Glass is read-only here.
- (b) **Referent:** certify a floating pair for the over-pane floater against its real composite. That is a plate-wide polarity decision: the title and caption flip together, one polarity per plate. It touches every floater, so it needs a ruling.
- (c) **Caption-only polarity flip:** refused by the §0gm.4 precedent (arm c).

**Collateral read:**
- o7 card census GREEN (4/4).
- `ss8-b14-skeleton-ink`, `ss8-b15-palette-cards` and `ss8-b22-gradient-specimen` GREEN ×2.
- `o33` 0125 (air Δ 2 px) and 0146 (5.26 < 5.5) each RED once, in different runs. These are the pre-existing CLOSE §8.3 residues owned by the B05 SS-8.r item, not these rows.
- **Visual lineage:** the light `--well-bg` lift changes every light-scheme well pixel, so darwin goldens that show a well re-baseline attributed to this commit (E14 lineage, Track A's suite).

**Orphan:** `demo/test/palettes/palette-card-layout.test.ts` still holds the uncommitted SS-8 B13 hunk (§7). Its L-3 case asserts the strong rung at ≥ 4.5, which this cure now satisfies. It is another seat's hunk and was not touched.

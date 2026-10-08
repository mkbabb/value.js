# X-DS — value.js: pass receipts

Wave: `waves/X-DS.md` (COHESION §0ej, refined at §0ek). App: value.js, `demo/**` (not `demo/@/components/ui/**`), branch `tranche-u`. Canon: `execution/DS/value-canon.md`. Frames: `evidence/DS/value/pass-NN/`.

Note: the first pass-1 cure (`36adcc1ff`, critic rows V1-xx) cites "recorded in execution/DS/value.md" for its refusals (V1-07, V1-12, V1-21 plate half, V1-25, V1-26). This file did not exist until now; those refusals live only in that commit body.

### pass 1

This receipt covers the cure of the pass-1 critic's rows **V1C-01 … V1C-11** (consumer) and **V1C-G1 … G4** (glass), judged after `36adcc1ff`.

**Commits.** value.js `082e1abbd` (the cure, 14 files) and `f3280eefa` (AFTER frames, census, probes, e2e listings).

**Consumer findings, cured at the root.**

| id | cure | measured |
|---|---|---|
| V1C-01 | `utils.css` THE WELL INK: inside `.dashed-well`, `.console-well`, `.search-seated` and `[data-generate-plate]`, `--muted-foreground` is `--ink-muted` one golden step (38.2%) toward `--foreground`. One token rule; every `text-muted-foreground`, placeholder and icon in a well follows it. Bare `--ink-muted` (the critic's suggestion) measured 3.7–3.9:1 on the dark well, because the well's own 8% foreground wash moves the ground toward the ink. | Painted-ground contrast, HEAD → cure (`cure-probe-before/after.json`). Light: well caption 1.99 → 4.69, search placeholder 2.09 → 4.91, generate seed 1.55 → 3.64. Dark: 5.12 → 5.19, 4.87 → 5.00, 5.91 → 5.99. |
| V1C-03 | `App.vue` `.route-title`: uppercase and 0.06em tracking are gone. The title stays visible for A5 and reads in sentence case ("Atmosphere"). Not moved into the pane's title row. | `text-transform: none`, `letter-spacing: normal` |
| V1C-04 | Section heads take the app's one head: `ConfigSliderPane` sections are `h3.font-display.text-subheading` (Fraunces 600, sentence case: "Field", "Geometry" …), and Mix's Selected, Result and From palettes take the same classes. Inline field labels take glass `Label` (the voice of "Preset"/"Type"): Aurora's Harmony, Arrangement, Medium and Motion, and Gradient's Direction. Glass's `.section-label` utility is not restyled. | Field: Fraunces 600, no transform; Harmony: Plus Jakarta Sans 500 |
| V1C-05 | `AuroraPane`: `.aurora-form` is one grid (`max-content minmax(0,1fr)`), with the rows as `display: contents`. | trigger x at 1440: 298/308/349/298 → 324 ×4 (both themes) |
| V1C-06 | `ConfigSliderPane`: glass's default range variant replaces `spectrum`. The range is the value, inked with `--ink-muted` through `--slider-range-bg`. The unfilled track keeps glass's quiet default, with no override. | range 731 of 962px at Color Energy 0.76; o18 range leg ≥3:1, light and dark, ×2 |
| V1C-07 | `GenerateControls`: the header `PaletteColorStrip` is removed; the title opens the plate. | 0 strips in the plate |
| V1C-08 | `ExtractControls`: with nothing developed, the K rail stands at glass's `sm` rung (12px, the same as kC). It grows to 24px only when it carries the ramp. The row keeps its 24px band. **Partly cured:** the rail keeps the certified track ink, not the "quiet tone" the critic asked for. A quiet tone would reopen the owner's "un-readable sliders" (t33-audit-11) and fail O-18 T-44a's ≥3:1 extract-k-rail leg. | rail 24 → 12px, kC 12px |
| V1C-09 | Picker seat: one `--spectrum-stamp` (8px) is read by the stamp and the seat. The spectrum→console gap is `8px + 1rem`. The field gives up the stamp's width on its right, so the stamp ends on the console's edge. The stamp is canon and stays. | gap 12 → 24px (16px breath under the stamp); stamp right 690 = console right 690; card edge 711 (1440). At 390: 359 = 359, card edge 374. |
| V1C-10 | `DockViewSelect` `--dock-ring`: the `0 0 8px` accent glow layer is removed; the width ring stays. O-59 stays the root ask. | one layer |
| V1C-11 | Generate's copied check takes `contrastInkFor(swatch)` instead of white with a `drop-shadow` filter. | no filter |

**Refused (owner-ruled), escalated for a ruling.**
- **V1C-02** (the Extract instrument face's idle pulse). The living, staggered pulse on that face is the owner's own overrule: T.md R12 **[OWNER-2026-07-11]**, "these shadow palettes … do not shimmer properly" (t33-audit-07), which names "LIVING staggered pulse (i × 0.12s)" for exactly the standing-instrument face, with PRM degrading it static. O-9's living leg asserts it. The later §0ek ruling ("idle shimmer, pulse or breathe that carries no state" is out) contradicts it. Choosing between the owner's two rulings is an owner decision, not a cure, so the pulse stays. The census's 14 consumer looping animations are all this face.

**Glass-owned, left honest-RED, not overridden.**
- **V1C-G1, G2, G4:** O-87 FLAT-LIGHTING (the rim stack, the hero bead's specular and double drop, the two-layer control fill and the hover specular).
- **V1C-G3:** O-88 DOCK-COLLAPSE-MOTION.

**Census** (`scripts/ds-census.mjs --widths 1440 --themes light,dark --settle 5000`, 9 routes). Both columns are served from clean worktrees at `9b05194d1`, each with a local api and mongod, so no dev-misconfigured state. They are like for like with each other, but not with the critic's `census.json`, which was served without an api.

| computed | HEAD (`census-before-head.json`) | cure (`census-after.json`) |
|---|---:|---:|
| consumer: box-shadow layers | 116 | 116 |
| consumer: backdrop blur | 18 | 18 |
| consumer: looping animations | 14 | 14 (V1C-02, refused) |
| glass: multi-layer elements | 86 | **154** |
| glass: inset-highlight layers | 174 | **310** |
| glass: backdrop blur | 42 | 110 |
| filter: drop-shadow (glass) | 8 | 8 |
| gradient fills on controls (glass) | 22 | 22 |
| verdict | RED | RED |

The glass rise is the 34 config scalars (3 on Atmosphere, 31 on Blob). With V1C-06 they render glass's scrubber range, `span.slider-range.glass-liquid-fill`, which carries the four-sided rim stack V1C-G1 already names (31 offenders per Blob page). The rule here is glass-first with no local override, so the rows are glass's to flatten at the 10.2.0 repin. **Flagged for the pass-2 critic:** this consumer choice puts more glass lighting on screen until that repin.

The static half is unchanged: the removed glow and filter lived in a JS string and a Tailwind `drop-shadow` utility, which the static scan does not count.

**Frames.** `evidence/DS/value/pass-01/`: 36 frames (9 routes × light/dark × 1440/390), headless real Chrome (`capture.mjs`), served from the cure worktree. The critic's own frames are in `pass-01/critic-2026-10-07/` (not this seat's).

**Gates.**
- **Type-check** (`vue-tsc` lib/demo/test + `tsc` e2e): 0 errors ×2.
- **vitest**, cure tree at `9b05194d1`: 1094/1101 ×2. HEAD alone fails the same 7 (`ink.test` ×5, `spectrum-luma` C-5, `reka-binding-idiom` NG-6). None touches a changed file. **Not GREEN, pre-existing.**
- **e2e**, the 19 specs that touch the changed surfaces (116 tests, smoke project, headless, workers 1, host load 50–100): cure run 1 33 failed / 83 passed; cure run 2 32 / 84; HEAD alone 33 / 83. 22 tests fail in both cure runs and on HEAD; they are pre-existing. Listings are in `v1c-gates/`.
  - Only two tests failed in both cure runs and not in the HEAD run: `views/gradient` "a grab is not a teleport" and "neighbour-crossing drag". Both sit at the 30 s budget (22–35 s). Isolated, they pass and fail on both trees: HEAD failed 1 of 4 runs, the cure failed 3 of 4 and later passed 3 of 4 at lower load. They are timeout flakes, not a functional break, and need a quiet-host read.
  - The directly affected legs are GREEN in both cure runs: O-18 config rows (text) and the re-aimed config range leg, light and dark; O-10d heading census; O-9 Extract instrument face; O-20 verb containment; page-load ×2.
  - **e2e is NOT ×2 GREEN** because of the pre-existing set.
- **Gate re-aimed (named, not a golden):** the O-18 config-track graphics leg measures `.slider-range` (the value's extent) instead of `.slider-track`, at the same 3:1 floor and on the same well. **No visual golden was re-baselined.**

**Instrument notes.**
- A vite dev server that shares `node_modules/.vite` with another server (`:9000` serves this tree for other seats) re-optimises under a running suite. The pane then crashes with "Cannot read properties of null (reading 'ce')", which reads as duplicate Vue. The fix is a worktree with its own `node_modules` directory (per-entry symlinks, private `.vite`).
- Without a local api, the "dev MISCONFIGURED" console error fails every zero-console-error test. This seat ran its own `mongod` (rs0, :27117) and api (:3473), and allowed both worktree origins.
- The scratchpad is shared with other sessions, and a file named `specs.txt` was overwritten mid-pass. Use unique names.

**For the pass-2 critic.**
- The config scalars now wear glass's liquid range rim (see the census). Judge whether `scrubber` is right for them before 10.2.0, or whether the rows should wait for glass.
- Light-scheme well text over a saturated aurora still measures below 4.5:1 at the generate seed (3.64). Pure `--foreground` measures 4.27 on that ground, so the ceiling is the plate's translucency.
- V1C-03's "better still" (seat the title in the pane's title row) was not done.
- V1C-02 waits on the owner.

### pass 2

This receipt covers the cure of the pass-2 critic's rows **V2C-01 … V2C-17**, judged after `02356e29d`.

**Commits.** value.js `ddd399786` (the cure, 11 files) and `2e605e5cb` (AFTER frames, census, probes, e2e listings).

**Consumer findings, cured at the root.**

| id | cure | measured (`pass-02/cure-probe-after.json`) |
|---|---|---|
| V2C-01 | `PalettesPane`: the body runs on glass's `FadingScroll` inside the row-following card, exactly as About does (end feather on, start feather off under the sticky veil; the `pane-scroll-fade` timeline host moves to the port). The row contract is untouched. The empty state no longer takes `grow`, and in this pane its plate padding starts at zero, so it sits under the "Start a new palette" well. | Browse 1440, both themes: card 362, content 416, mask on, feather 24px; message bottom 336 < feather start 338. The hint fades under the feather. Generate: card 405, message bottom 336. |
| V2C-02 | One scalar row: the name left, the value right in mono tabular figures, the track below (Direction's pattern). Extract K "Colors", kC "Chroma weight" and Generate's count "Colors" take visible glass `Label`s. The config console's `ConfiguratorRow` value moves to the row end at the mono-small rung (scoped `:deep`, layout only). Generate's slider is now named "Number of colors", which contains its visible name. | Every row: name left = track left, value right = track right, value above the track, `tabular-nums` (Atmosphere, Blob, Direction, K, kC, count). |
| V2C-03 | **Partly cured.** When the controls stand down (a run in flight, the camera open), the K rail and the kC track take glass's `--opacity-disabled`. The critic's premise did not hold: with no image the sliders are live. | No image: `data-disabled` false on both sliders, rail opacity 1, so the certified ink stays (O-18 T-44a, no re-aim needed). |
| V2C-06, V2C-09 | One scalar range ink, set once on glass's `--slider-range-bg` token at `:root` (`utils.css`, THE SCALAR RANGE INK): `--ink-muted` halfway toward the view accent `--primary`. It carries the identity hue, and in dark it lifts the bar off the flat mid-grey. `ConfigSliderPane` drops its local rule; Direction takes the token with no instance rule. The Direction readout sits at `plate-ink`. Only these two populations use glass's default range variant; the spectrum sliders do not read the token. | `ink-candidates.jsonl` (painted ground): light Atmosphere well `--ink-muted` 3.04, the mix 3.01; a mix toward the plate falls to 2.49 (23.6%) and 2.13 (38.2%), so the light bar cannot be lighter. Dark well: 3.28 → 5.04. O-18 config range leg GREEN ×2, light and dark. |
| V2C-07 | The easing curve name reads at `text-foreground`; the "1 → 2" index stays muted. | light: name rgb(28,25,23), index rgb(112,89,66) |
| V2C-08 | The CSS output wraps with `wrap-break-word`, not `break-all`. | `word-break: normal`, `overflow-wrap: break-word`; frames show breaks at spaces |
| V2C-12 | `.aurora-form` field column capped: `max-content minmax(0, 20rem)`. | triggers 320px (from about 890), all left at 324 |
| V2C-13 | One dash per affordance: `.dashed-well:has(.add-slot-ghost)` draws a 1px solid `--card-edge` hairline (`utils.css`, one rule). Mix's "Selected" and the current-palette well change; Extract's empty drop zone, which has no add-slot, keeps its dash. | Mix and My Palettes wells: `solid 1px` |
| V2C-14 | "Upload image" uses `font-display text-small`. | Fraunces 16.4px |
| V2C-17 | `.pane-scroll-fade.fading-scroll--y { --fade-scroll-width: 1.5rem }` (`PaneHeader.vue`, next to the scroll-host rule): the token is set once for the vertical pane ports, About and My Palettes. | feather 1.5rem (24px) on both |

**Not cured, escalated.**
- **V2C-05** (move the h1 into the pane title). This is a structural re-aim of X.W5.a gate A5, not a style cure. The `<main aria-labelledby="route-title">` relation and the `MAIN_PANE` fixture (`main:has(> h1#route-title)`, read by 64 spec files) both key on the shell's h1. The routed subject is not one pane on every route (Palettes, Mix and Blob seat the shared picker as the stage). An out-in pane swap would leave a moment with no h1, or two. The landmark name would also change from the schema label ("Home") to a pane sentence, and the mobile spec asserts "Home". It needs a named A5 ruling before a seat moves it. Until then the title stays as V1C-03 left it.
- **V2C-15** (the resting header veil). Owner-ruled Q9 / O-11 gate 1. Banked for an owner ruling under §0ek, as the critic asked.
- **V2C-16** (the "Palettes" ramp in light and dark). **DESIGN-RULING.** The ±40° fan is the ruled form (Q4/Q5), and `palettes-ramp.ts` records that "the PASTEL REGISTER inside this honest guard is the owner's T-56 bracket (P4-B1)… the owner rules the register." Measured: the title stops sit at the guarded live accent's lightness (light L 0.305, C 0.12 / 0.12 / 0.08; dark L 0.958, C 0.034 / 0.021 / 0.023). The walk keeps a stop that already clears 3:1 and never re-lifts its chroma. Re-seeding the title stops from the hue cusp would restore hue separation inside the 3:1 floor, but that is a change of register, so the owner rules it. Identity is untouched (§0dm).

**Glass-owned, held on O-87, not overridden.** V2C-04 (the floater's 9-layer stack and the down-left cartoon rung against the canon's down-right stamp), V2C-10 (a disabled seated capsule casting a float shadow), V2C-11 (the inactive Tabs ink on the composited track, and the plate-in-plate indicator).

**Census** (`scripts/ds-census.mjs --base :9000 --widths 1440 --themes light,dark --settle 5000`, 9 routes; `census-after.json`). It reads exactly as pass 1 did: consumer box-shadow layers 116, backdrop blur 18, looping animations 14 (V1C-02, still awaiting the owner); glass multi-layer elements 154, inset highlights 310, backdrop blur 110, drop-shadow 8, control gradients 22. **Verdict RED**, on glass-owned chrome (O-87, the 10.2.0 repin). The pass added and removed no lighting.

**Frames.** `evidence/DS/value/pass-02/`: 36 frames (9 routes × light/dark × 1440/390), headless real Chrome (`capture.mjs`), served from the working tree on `:9000`. 0 of 36 failed.

**Gates.**
- **Type-check** (`npm run typecheck`: vue-tsc lib/demo/test + tsc e2e): 0 errors ×2.
- **vitest**: 1094/1101 ×2. The 7 failures are the same 7 as pass 1 and HEAD (`ink.test` ×5, `spectrum-luma` C-5, `reka-binding-idiom` NG-6). None touches a changed file. **Not GREEN; pre-existing.**
- **e2e**: 18 specs touching the changed surfaces (113 tests, smoke project, headless, workers 1, against `:9000` with its api). Run 1: 28 failed / 85 passed. Run 2: 29 failed / 84 passed. Listings are in `v2c-gates/`.
  - Every failure that appears in both runs is also in pass 1's HEAD/cure listings, except `o17-easing-composition` ×3. That spec was not in pass 1's set. It fails on a strict-mode count of four `svg` inside glass's `#easing-authoring-0`, and this cure touched only the class of one summary-row `span`. Read as pre-existing, but not proven on HEAD this pass.
  - The one run-2-only failure, `scene-action-contract` D4 "Generate on the desktop branch", fails on the dock's "Toggle action bar" not appearing after `expandDock`. That is the O-88 dock-collapse class, and the test passed in run 1.
  - The directly affected legs are GREEN ×2: the O-18 Extract GRAPHICS leg and the config range leg (light and dark), O-9 Extract instrument face and the three TRUE-EMPTY legs (My Palettes included), O-11 gates 1+2 (every pane, so the new My Palettes port is covered), w12-about-clip ×6, and companion-pane-track-start.
  - **e2e is NOT ×2 GREEN**, because of the pre-existing set.
- **No visual golden was re-baselined. No gate was re-aimed.**

**For the pass-3 critic.**
- The scalar range ink in light is pinned at the 3:1 floor by the saturated Atmosphere well. Judge whether the plum-tinted charcoal reads as the value or as weight.
- The kC row is now a two-line column inside the Extract control strip (138px wide at 390). Check that it does not crowd the dock controls.
- V2C-05, V2C-15, V2C-16 and V1C-02 wait on the owner.

### pass 3

This receipt covers the cure of the pass-3 critic's rows **V3C-01 … V3C-11** and **V3C-G1/G2**, judged after `9f556b4c0`.

**Commits.** value.js `3c84d787b` (the cure, 15 files) and `0732ea8b4` (AFTER frames, census, probes, e2e listings).

**Consumer findings, cured at the root.**

| id | cure | measured (`pass-03/`) |
|---|---|---|
| V3C-01 | About and My Palettes seat their `PaneHeader` **above** the `FadingScroll` port, as its sibling (About's rule moves out with it), so nothing scrolls under the title. The card scopes the port's `--pane-scroll` timeline (`PaneHeader.vue`, one `@supports`-gated `timeline-scope` rule on `.card:has(> .pane-header ~ .pane-scroll-fade)`), so the veil keeps the Q9 rest floor and its swell (V2C-15's amount untouched). The title shrink and caption fade bind only to a header inside its scroll host, so a seated header keeps its rest form and has no dead band. Both port edges now feather. | `probe-about.txt`, scrolled to the end at 1440: header 113–250, port starts at 251, the veil swells to opacity 1; `about-scrolled-1440-{light,dark}.png` show the title clean over the scrolled body. |
| V3C-02 | Delete-all is a labelled **"Delete all"** text action (glass `Button`, `emphasis="text"`) at the end of the search row, the row that acts on the whole list. The lone trash row is gone. | `gensave-1440-light.png`; the button keeps its accessible name "Delete all saved palettes" (w7-mutation-visibility). |
| V3C-03 | The row-follow contract carries a floor: `min-block-size: var(--pane-follow-floor, 0px)` under the same container query, with `--pane-follow-floor: 30rem` on the palettes companion (`shell.css`). Its minimum content is measured at 450 px (one card) and 464 px (the empty state). | `probe-companion.txt`: Browse card 480 (from 362), hint bottom 481 < card bottom 592, port 389 = content 389 (no scroll); Generate after a save, card 480, first card bottom 487 < 592. |
| V3C-04 | One slider register. Extract K (before a run develops) and kC are glass `scrubber` scalars at `sm` on the scalar range ink; the 24 px data rail (spectrum variant, certified hairline ring) mounts only to carry the developed ramp. **The scalar range ink is re-derived** on what it sits on, glass's scheme-toned track: `--slider-range-bg: var(--foreground)` (`utils.css`). The pass-2 ink (`--ink-muted` toward `--primary`) is certified against the plate and flips with it, so under the owner brick in light the bar went near-white on the light track. The scalar row shows glass's scrubber register everywhere (config, Direction, K, kC); Generate's count stays a data slider (palette segments). | `ink-candidates.jsonl` (painted track pixel, composited at the range's α 0.88): pass-2 ink 2.42 (Extract) and 2.19 (Atmosphere well) on the owner brick in light; `--foreground` ≥ 5.23 on all ten cells, both schemes; every mix toward `--primary` that keeps the hue falls under 3:1 there by 25%. O-18 Extract GRAPHICS leg and config leg GREEN, light and dark. |
| V3C-05 | kC is a full-width scalar row like "Colors" (one left edge). The image actions are one labelled action row (`role="group"`, "Image actions"), showing only live ones: Replace image, Open/Close camera (pressed while live), Reset; with no image, only the camera. No dead glyphs, no Upload repeating the drop zone. | `extract-{1440,390}-{light,dark}.png`. |
| V3C-06 | The spectrum thumb keeps its organic outline (identity, §0dm) and is still at rest: `animate` and the 2 s cycle are gone. The outline re-seeds with the colour, so it changes only while the user moves it. | no rAF wobble on the picker at rest. |
| V3C-07 | The thumb's vertical travel is inset by its radius (`--spectrum-dot-size`, one token for size and inset), and the pointer maps over the same inset span, so the thumb stays under the pointer and at high V sits inside the plate. The numerals are untouched. | `picker-390-{light,dark}.png`: at V≈1 the thumb sits below the readout. |
| V3C-08 | Definition is a `<section>` with an `h2` at `font-display text-subheading`, the text below it and the rule after; the well is gone. | About frames; o10d (every main h2 in the display face) holds. |
| V3C-09 | The Atmosphere card caps at one pane column, `max-w-(--pane-max)`, centred by the pane root's `mx-auto`. | `atmosphere-1440-*.png`: card 512 px. |
| V3C-10 | The dock view trigger renders the current view's schema label (`viewManager.currentConfig.label`) in `SelectValue`, so `/atmosphere` and `/blob` read icon + name. | `atmosphere-1440-*.png`, `blob-1440-*.png`. |

**Refused.**
- **V3C-11** (gamut-map the specimen caption). This contradicts a standing ruling: X.W6.f gate f6 (adjudicated L-3) is "out-of-gamut is MARKED, never PROJECTED", with an anti-projection lock (`o23-specimen-gamut-honesty.spec.ts`, legs (b) and (d) red on any clamp). The caption already carries the at-rest gamut-edge wavy underline and the sr-only "(outside …'s gamut)". Changing it needs an owner ruling against f6; it is not a cure.

**Glass-owned, held on O-87, not overridden.** V3C-G1 (floaters let the content plate read through; the floating plate tier). V3C-G2 (the hero bead's specular body and double drop): the hero's `BlobConfig.surface` knobs are public config, so a flatter register needs no CSS, but whether to set them before glass lowers its defaults in 10.2.0 is an orchestrator or owner call. Not done here.

**Gate re-aims, named** (no assertion weakened).
- O-18 Extract GRAPHICS leg: reads each scalar's `.slider-range` (`extract-kc`, `extract-k`), as the config leg was re-aimed at V1C-06. Same 3:1 floor, same ground.
- O-11 gate 3: `scrubTo` finds a seated header beside its port. The Gradient leg records `no-collider` when no pane port overflows: at 1280×720 its only scroll host was ever the My Palettes companion, which now neither overflows nor runs under its header. Home keeps the full scrub (About's port overflows by 7,000 px), and the swell is measured there.
- `demo/test/extract/extract-controls.test.ts` follows the labelled actions and the no-rail state.

**Census** (`scripts/ds-census.mjs --base :9000 --widths 1440 --themes light,dark --settle 5000`, 9 routes; `census-after.json`). The consumer rows are unchanged from pass 2 (box-shadow layers 116, backdrop blur 18, looping animations 14). The glass rows rise by four elements (multi-layer 154 → 158, inset highlights 310 → 318, backdrop blur 110 → 114): the two labelled glass `Button`s bring glass's own button material. Ring layers fall 16 → 14 (the two `DockControl`s are gone). **Verdict RED**, on glass-owned chrome (O-87, the 10.2.0 repin).

**Frames.** `evidence/DS/value/pass-03/`: 36 frames (9 routes × light/dark × 1440/390), headless real Chrome (`capture.mjs`), served from the working tree on `:9000`; 0 of 36 failed. Plus `about-scrolled-1440-{light,dark}.png` and `gensave-1440-light.png`.

**Gates.**
- **Type-check** (`npm run typecheck`): 0 errors ×2 on the final tree.
- **vitest**: 1094/1101 ×2. The 7 failures are the same 7 as pass 1, pass 2 and HEAD (`ink.test` ×5, `spectrum-luma` C-5, `reka-binding-idiom` NG-6). **Not GREEN; pre-existing.**
- **e2e**: 21 specs touching the changed surfaces (120 tests, smoke project, headless, workers 1, against `:9000`). Listings in `v3c-gates/`.
  - Run 1: 20 failed / 100 passed. Every failure is in pass 2's listings or failed on a HEAD worktree in this session (BR-5, O-10a mobile, w12-dock trigger-clip, walk, the R27 rows), except O-9 Extract instrument face (a 0.38 px height reading under load; it passed 3 of 3 alone) and w12-ground (a 150 s mouse-move timeout).
  - Run 2: the first attempt was voided by host load (~70; it hit the 50-minute cap). The re-run: 31 failed / 89 passed at load ~60. The failures beyond run 1's set are timeouts (30 s, 2.5–3.1 min). A HEAD worktree under the same load also failed R18/R19 (2 of 3).
  - The directly affected legs are GREEN when run alone on the final tree: O-11 gates 1–6, O-18 Extract GRAPHICS and config legs (light and dark), O-18 letterform gate, O-9 Extract instrument face (×3).
  - **e2e is NOT ×2 GREEN**, because of the pre-existing set and the load-driven timeouts.
- **No visual golden was re-baselined.**

**For the pass-4 critic.**
- The scalar range is now the scheme ink (near-black in light, near-white in dark) on every scalar. Judge whether it reads as the value or as weight, and whether the config bars want the quiet `sm` rung lighter.
- The seated About and My Palettes headers keep their full title and caption. Check their height against the short follower at 1440×800.
- The Palettes companion floor (30rem) makes a short leader (Browse empty, Generate) stretch to 480 px. Check the leader's empty space.
- V2C-05, V2C-15, V2C-16, V1C-02 and V3C-11 wait on the owner.

### pass 4

This receipt covers the cure of the pass-4 critic's rows **V4C-01 … V4C-09** and **V4C-G1/G2**, judged after `973dddc09`.

**Commits.** value.js `340ec4250` (the cure, 22 files) and `d6d461556` (AFTER frames, census, probes, e2e listings).

**Consumer findings, cured at the root.**

| id | cure | measured (`pass-04/`) |
|---|---|---|
| V4C-01 | **One polarity per plate.** `resolvePlateInk` (`ink.ts`) certifies the scheme foreground against the composited resting plate with the same guard and the same referent as `--ink-muted`; the boot writer stamps it as `--ink-primary`. `--ink-muted` is now a golden step **of that pole**: a rung that would flip, or outrank its primary, is the primary. `shell.css` seats the pair as the in-plate foreground family on `.pane-wrapper` (`--foreground`, `--card/-secondary/-accent-foreground`, the muted pair, and glass's own `--on-glass-muted` seam), so titles, labels, readout integers, section heads and empty-state heads inherit by token. Root-computed tokens (`--slider-range-bg`, `--well-bg`, hairlines, `--code-ink`) keep the scheme ink they were certified with. The 14% material is kept. | `probe-ink.json`, owner brick in light: readout integer 7.14 and fraction 7.18 (both near-white; was 2.35 / 2.03 with opposite inks), About title 4.97, Extract title 7.38, Colors 7.37, Gradient title 7.53, section head 7.06. Dark unchanged in polarity (titles 8.6–11.5). Unit leg: `test/ink.test.ts` "resolvePlateInk (ONE polarity per plate)", both schemes × five ambients. |
| V4C-02 | Glass re-seats `--muted-foreground` on its surfaces from `--on-glass-muted`; that seam now carries `--ink-muted` inside the panes, so quiet/text Buttons, placeholders and tiles read the certified rung. "Delete all" reads `text-(color:--ink-muted)` (a layered utility, so its destructive hover still wins). | Owner brick, light: Copy JSON 7.07 (was 1.13), Reset 6.40, Open camera 7.41 (was 1.14), Start a new palette 6.80. Default pink, light: Copy JSON 3.82 (was 1.78–2.01), Open camera 3.71 (was 1.73); see the residual below. |
| V4C-03 | The gradient editor's code sits on `--code-ground` (hljs.css, root-computed: card 92% + foreground, the opaque paper the crayons were certified on) instead of `glass-wash`. Crayons untouched. | number token 4.93 and body ink 13.2 in light, 6.13 / 9.24 in dark, on both colours. |
| V4C-04 | ConfigSliderPane takes About's contract: `pane-row-follow`, the seated PaneHeader, the sections in glass's `FadingScroll` port, the action bar a flex-none footer below it. | `probe-layout.json` /blob 1440: card 112–733 = the stage card; footer 675–732; port 437 px of a 2137 px body; document 900 = viewport (was 2455). |
| V4C-05 | A seated header (`.card:has(> .pane-header ~ .pane-scroll-fade) > .pane-header`) paints no veil; the pass-3 `timeline-scope` that let it swell goes with it. Headers that overlie their scrolling body keep the banked rest veil (V2C-15). | `seatedVeil: none`; About, My Palettes and the config pane frames carry no tone band or feather. |
| V4C-06 | One header block-end gap, `--pane-header-gap: var(--phi-3)`, in PaneHeader; the per-body `pt-2`/`py-4` are removed (Gradient, Mix, Generate, Extract, Browse, Admin, My Palettes, Atmosphere, the config sections); About drops its under-header rule so its first section rides the same gap. | header bottom → first row = 0 px on every pane, caption → first row 26 px (was ≈ 8–40 px by pane). |
| V4C-07 | `.aurora-form` field column `minmax(0, 1fr)`. | trigger right edges 951 = the console well's 951. |
| V4C-08 | The Colors/Palettes switch is start-aligned. | tabs left 754 = title left 754. |
| V4C-09 | The Generate title row never wraps; Regenerate's label is `max-sm:sr-only` (its accessible name stays "Regenerate", O-20 holds). | 390: name 46–198, Regenerate 206–256, copy 308–344, all on one row (`generate-row-390-light.png`). |

**Residual, honest-RED (V4C-G1's third row).** On the default pink in light the resting plate shows a ground of luminance ≈ 0.18–0.20 (`probe-ink.json` grounds rgb(202–226, 64–96, 131–167)). Against such a ground no ink exceeds ≈ 5:1 at either pole. The primary is already near-black (rgb(28,25,23)) and measures 4.13–4.65; the muted rung measures 3.25–4.23. That is the resting veil's 14% α on a saturated mid-tone, cited to O-87 (a resting tier legible on saturated grounds), not overridden locally. The referent model (the palette's mean OKLab L) also reads these grounds lighter than they paint; refining it is a further step, not taken here.

**Glass-owned, held on O-87 / O-88, not overridden.** V4C-G1 (floater halo and plate-in-plate selected capsule; the view menu letting the rail read through; the near-clear resting tier). V4C-G2 (an in-pane select scrolls the page and the dock collapses at desktop width): O-88.

**Gate re-aims, named** (no assertion weakened).
- O-11 gates 1+2: the rest floor and feather are asserted on headers that overlie their body; a seated header must now paint **no** veil (`display: none`), a new positive assertion.
- O-11 gate 3: the scrub host must hold its own header. About's header is seated, so Home now records `no-collider`, as Gradient did at pass 3. In the shipped layouts at 1280×720 no header overlies a scrolling body, so this gate currently measures nothing; the swell code remains for unseated headers.
- `test/ink.test.ts` gains the V4C-01 leg.

**Census** (`scripts/ds-census.mjs --base http://localhost:9000 --widths 1440 --themes light,dark --settle 5000`; `census-after.json`). Box-shadow layers 828 → 820, multi-layer elements 158 → 156, inset highlights 318 → 314, backdrop blur 132 → 130 (the seated veils are gone). Static half unchanged. **Verdict RED**, on glass-owned chrome (O-87, the 10.2.0 repin).

**Frames.** `evidence/DS/value/pass-04/`: 36 route frames (9 routes × light/dark × 1440/390, `capture.mjs`, 0 of 36 failed), the critic's brick and menu cells re-shot (`probe-brick.mjs`), `atmosphere-form-1440-light.png`, `generate-row-390-light.png`. All headless real Chrome (§0ei). The critic's own frames stay in `pass-04/critic/` (not committed by this seat).

**Gates.**
- **Type-check** (`npm run typecheck`): 0 errors ×2 on the final tree.
- **vitest**: 1096/1103 ×2. The 7 failures are the same 7 as passes 1–3 and HEAD (`ink.test` ×5, `spectrum-luma` C-5, `reka-binding-idiom` NG-6). The two `resolveMutedInk` "QUIETER" legs return byte-identical values to HEAD (compared through HEAD's `ink.ts` in this session). **Not GREEN; pre-existing.**
- **e2e**: 18 specs touching the changed surfaces (117 tests, smoke project, headless, workers 1, against `:9000`). Listings in `v4c-gates/`.
  - Run 1 (load 50–150): 35 failed / 82 passed. Most failures are click/nav timeouts. The suspicious ones were re-run alone (`e2e-rerun-a.txt`): O-11 gates 1–6 and the O-10d walk pass; the remainder are the classes below.
  - Run 2: the first attempt was voided by dev-server reloads (93 of 99 failures are `page.goto: net::ERR_ABORTED; frame was detached`; `e2e-run2-void-reload.txt`). The re-run: **21 failed / 96 passed**. O-11 gates 1–6, the O-18 W4 rows (readout fracs, channel letters, ConfigSliderPane rows), both O-18 config-track graphics legs, the O-18 GRAPHICS leg, O-20's verb leg, O-12 and w12-about-clip are GREEN.
  - The 21: the pass-3 pre-existing set (a11y-select-title B1/B2, O-10a mobile, O-10d browse wall ×2, O-14 ×3, O-18 graph nodes, IDENTITY, R27 ×3, O-9 Browse error); the O-88 dock class (scene-action-contract D4 ×4; w7-inspector-rows' selection leg waits on `.glass-dock[data-morphing]`); w7-inspector-rows' tag leg, which waits on the tag dialog's checkbox; and O-20 T-17, which clicks a combobox named "Generation preset" that has been "Preset" since `583715162` (a stale locator, pre-existing). None of these touches a changed surface.
  - A HEAD comparison server could not be built from a detached worktree in this session (a rolldown build error), so these are classed by their failure text, not by a HEAD run.
  - **e2e is NOT ×2 GREEN**, because of the pre-existing set and the O-88 class.
- **No visual golden was re-baselined.**

**For the pass-5 critic.**
- In light, a plate now flips its whole foreground family to near-white when the aurora under it is mid-tone (the owner brick). Judge whether the white titles read as the app's type, or the flip reads as a mode change.
- Default pink in light sits in the dead-zone ground (the residual above): the primary is 4.1–4.7 and the muted rung 3.3–4.2.
- The Gradient pane's unseated header still paints the banked rest veil (V2C-15), now over a 26 px gap; check that band.
- The config pane is a 621 px card on /blob with a 437 px port. Check that the Blob sections read well inside the port, and that /atmosphere (where the pane is the sole stage) still grows with its content.
- V2C-05, V2C-15, V2C-16, V1C-02 and V3C-11 wait on the owner.

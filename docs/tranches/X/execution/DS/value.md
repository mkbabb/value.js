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

### pass 5

This receipt covers the cure of the pass-5 critic's rows **V5C-01 … V5C-10** and **V5C-G1**, judged after `8c151729b`.

**Commits.** value.js `a76ccb875` (the cure, 17 files) and `b0d6d9784` (AFTER frames, census, probes, gate listings).

**Consumer findings, cured at the root.**

| id | cure | measured (`pass-05/`) |
|---|---|---|
| V5C-01 | PaneHeader's veil `::before` is `inset: 0`; the mask fades the last 14 px **inside** the header's own 26 px `--pane-header-gap` band. Nothing overhangs onto the first row. The banked rest veil (V2C-15) and the swell keyframes are unchanged. | `probe-v5c.json`: on /browse, /extract, /mix and /gradient the veil's bottom equals the header's bottom (220) in both schemes, and the first row starts at 220 (the search field reads one tone, `browse-1440-light.png`). |
| V5C-02 | The boot writer certifies the same pair against the **floating** rung (`resolvePlateInk`/`resolveMutedInk` on `surfaceLightnessNow("floating")`) and stamps `--ink-floating-primary`/`--ink-floating-muted`. `shell.css` seats them on glass's floating plate (`.glass-floating`, the content root of every portaled select, popover and menu) as the foreground family plus glass's `--on-glass-muted` seam. The descriptions keep `text-muted-foreground`, which now **resolves** to the certified floating rung, so the label/description hierarchy stays. Dropping the class would have put the descriptions at primary ink. | Floater `--muted-foreground` (default aurora): light L 0.271, dark L 0.708. The Type menu descriptions and the inactive sort chips read that rung (`selectmenu-light.png`, `browse-filter-*.png`, `brick-browse-filter-*.png`). |
| V5C-03 | `.section-label` (mono caps) is retired at its call sites. The filter popover heads ("Sort", "Show", "Find by color"), the tag editor head and the admin category heads use glass `Label`. Extract's "dominant" uses `text-caption`. The drop zone's "sample" Badge keeps its own type. No new class. | The popover labels are Plus Jakarta Sans with `text-transform: none`. |
| V5C-04 | The filter trigger is `emphasis="text"` (icon-only, size sm). The badge is still anchored to it. | trigger background `rgba(0,0,0,0)`, shadow none. |
| V5C-05 | glass's field ground token `--input-on-glass` (an opaque cream) is re-seated to `--well-bg` on the app's glass hosts (`.pane-wrapper`, `.glass-floating`). That is the rung-2 tone step `.search-seated` wears. The inline Search is a text-rung glass Button with no plate. | Position field and popover field ground: `--foreground` at 8% (light and dark). **Glass half, cited on O-87:** the field edge (`--field-control-ink`, foreground at 48%) is declared on `.field-control` itself, so no host seam can reach it. |
| V5C-06 | The palette-name input is `truncate`. | At 390 the box is 152 px and the value is 173 px; `text-overflow: ellipsis` (`generate-row-390-light.png`). |
| V5C-07 | The image actions use the text rung, as "Delete all" does. The group pulls back by the rung's own inline pad, glass's `--space-residue`. | camera glyph x 225 (was 239); Colors label 224. |
| V5C-08 | The under-head rule (`.config-section-header` border) is deleted, so a section is a head followed by its rows. The well (M-34) stays. Orchestrator call taken: Atmosphere's four select rows sit in the same console well as "Field", so sibling settings sit at one level. | `blob-*`, `atmosphere-*` frames; head border 0. |
| V5C-09 | The cure as written was already in place: the config scalars were on glass's `sm` rung, which is 0.75rem, still a slab. The weight drops at the token instead: `--slider-track-height-sm: 0.375rem` in foundation.css's `:root`, after glass's token sheet. 0.375rem is glass's own unsized rail. Gradient's Direction joins the `sm` scalar population. The ink stays `--foreground`. Spectrum sliders size from the thumb and are untouched. | /blob track 12 → 6 px. |
| V5C-10 | Beside the My Palettes companion the stage wrapper is `align-self: start`, so it sizes to its content. A taller stage still sets the row. | 1440: Generate 415 / companion 480, Browse 364 / 480. No dead plate under the content. |

**Glass-owned, held, not overridden.** V5C-G1 re-observed (V3C-G1/G2, V4C-G1, V2C-10 on O-87; V4C-G2 on O-88), plus V5C-05's field-edge half on O-87. These are honest-RED until the 10.2.0 repin.

**Gate re-aims, named** (no assertion weakened).
- x-w7l O-68 reads a section head by `.config-section-title`, because the `.config-section-header` wrapper is gone.
- a11y B3's internal-variable fence now matches a **whole identifier**. The published sizing token `--slider-track-height-sm` (glass `tokens/sizing.css`) was being matched as a prefix of the internal `--slider-track-height`.

**Census** (`scripts/ds-census.mjs --base http://localhost:9000 --widths 1440 --themes light,dark --settle 5000`; `census-after.json`).
- Box-shadow layers 820 → 812, multi-layer elements 156 → 154, inset highlights 314 → 310, backdrop blur 130 → 128.
- Consumer looping animations 14 → 16: /browse light was captured mid-load, with its skeleton breathing (state motion, not a change of this pass).
- The static half is unchanged.
- **Verdict RED**, on glass-owned chrome (O-87).

**Frames.** `evidence/DS/value/pass-05/`, all headless real Chrome (§0ei):
- 36 route frames (`capture.mjs`, 0 of 36 failed);
- the critic's cells re-shot (`probe-cells.mjs`) plus `selectmenu-*` and `brick-browse-filter-*`;
- `generate-row-390-light.png`;
- the O-68 frames under `x-w7l/`.

The critic's own frames stay in `pass-05/critic/` (not committed by this seat).

**Gates.**
- **Type-check:** 0 errors ×2.
- **vitest:** 1096/1103 ×2, the same 7 pre-existing failures (`ink.test` ×5, `spectrum-luma` C-5, `reka-binding-idiom` NG-6). In run 1 an eighth test, generate-rail EC-10, timed out at 5.4 s under host load 48; it passes alone (2.5 s) and passed in run 2.
- **e2e:** 17 specs, 115 tests, smoke project, headless, workers 1, against `:9000`. Listings are in `v5c-gates/`.
  - Run 1: 28 failed / 87 passed. Run 2: 20 failed / 95 passed.
  - Re-run alone, these pass: O-11 gates 1–6, a11y B3 (after the re-aim), O-10b, O-10d gated titles, O-18 letterform gate, scene-action §8 ×2 and D4 registered.
  - O-21 "meniscus" (323 of 324 columns) reproduces on the **pre-cure tree**: a worktree at `a76ccb875~1` was served on `:9311`, and `e2e-baseline-o21.txt` shows the same 323/324. That pre-cure server was otherwise cold-broken, so the rest of that run is not a baseline.
  - The remainder is the pass-3/4 pre-existing set: a11y B1/B2, O-10a, O-10d browse ×2, O-14 ×2, O-18 graph nodes, IDENTITY, R27 ×3, O-20 T-17, w7-inspector ×2, D4 unavailable ×3. w7-mutation's export leg timed out on the menu in run 2 and passed ×2 alone.
  - **e2e is NOT ×2 GREEN**, because of the pre-existing set.
- **No visual golden was re-baselined.**

**For the pass-6 critic.**
- The floater inks are certified against the floating rung's model. Check the owner brick in light, where the resting plate flips to near-white ink: the floater may keep the dark pole, so a menu and its pane can now differ in polarity.
- The field edge on glass is still glass's 48% ink (O-87).
- /atmosphere now shows two stacked wells (selects, then "Field"); judge the rhythm between them.
- The 6 px scalar rail: check that the thumbless default range still reads as a control at 390 and on coarse pointers (glass's coarse floor keeps the hit target).
- V2C-05, V2C-15, V2C-16, V1C-02 and V3C-11 wait on the owner.

### pass 7

This receipt covers the cure of the pass-7 critic's rows **V7C-01 … V7C-04**, judged after the pass-6 cure `5eecee0ac`. The workflow that dispatched this seat called it "pass 2" (its counter restarted after the limit reset). It is filed as pass 7, because `pass-02/` already holds pass 2's committed evidence and the critic's frames are in `pass-07/critic/`. Pass 6's cure is committed (`5eecee0ac`), but its evidence (`pass-06/`) and its receipt are not; that work belongs to the pass-6 seat.

**Commits.** value.js `a85477894` (the cure, 7 files) and `2a3c686a1` (AFTER frames, census, probe, gate listings).

**Consumer findings, cured at the root.**

| id | cure | measured (`pass-07/`) |
|---|---|---|
| V7C-01 | The Interpolation band has two tracks at every width. Below sm the fields span both tracks, and the render tile (`order-last`, `col-start-2`, `w-12`, `min-h-10`) follows them, beside the Direction row it illustrates. The row sets the tile's height. From sm the layout is unchanged (`sm:order-none`, `sm:row-span-2`, the 96 px tile). | `probe-v7c.json`: at 390 the tile is 48×40 at y 654, on the 40 px Direction row (`gradient-tile-390-light.png`). At 1440 the tile is still 96×120. |
| V7C-02 | The two config schemas use sentence case: "Color energy", "Body radius", "Satellite radius", "Orbit radius", "Smoothness" (was "Smooth K"), "Noise amplitude", "Noise frequency", "Pulse frequency", "Pulse amplitude", "Hue range", "Rim power", "Core glow", "Click impulse", and the section "Lit glass". Data only. | The slider names on /blob and /atmosphere read in sentence case (`probe-v7c.json` `labels`). |
| V7C-03 | Atmosphere's select group is a section of its own, **"Character"**, with the same `h3.config-section-title.font-display.text-subheading` head as "Field" (ConfigSliderPane's section grammar). The head colour reaches the slotted head through `:slotted(.config-section-title)`. | The heads are Character and Field: Fraunces, 20.35 px, the same ink (`atmosphere-well-1440-light.png`). |
| V7C-04 | The row is a follow companion's **ceiling**, not its height (shell.css, the row contract). The region wrapper becomes a column, and the companion takes its content height (`block-size: auto; flex: 0 1 auto`). It shrinks to the row, and scrolls, only when its content is longer. The 30rem floor stays on the wrapper, so the V3C-03 floor still holds. My Palettes now wraps its card the way Mix and the config pane do. Without the wrap, the T-45 blur carrier sat on the region wrapper, which the shorter card no longer fills, and painted a blur strip under the card (seen in the first frames and cured before commit). | 1440: Mix is 426 px inside a 621 px row (`companion-mix-1440-light.png`, first probe, empty Mix). My Palettes is 419 px beside Generate (415) and Browse (364), with no plate under "Add colors, then save." (`companion-generate-1440-light.png`). Blob follows its row and scrolls. On the final probe, Mix follows the row because another seat's uncommitted `MixSourceSelector.vue` adds a "Saved palettes" block, which is the contract working. |

**Glass-owned rows.** None were raised this pass. The census's glass rows stay honest-RED on O-87 (no local override).

**Gate re-aim, named** (no assertion weakened). x-w7l O-68 reads a section's actions without its select triggers. A `role="combobox"` is one of the section's fields, not an action, and Atmosphere's "Character" section holds four of them.

**Census** (`scripts/ds-census.mjs --base http://localhost:9000 --widths 1440 --themes light,dark --settle 5000`; `census-after.json`).
- Consumer rows are unchanged: box-shadow layers 116, backdrop blur 18, looping animations 14.
- Glass rows read 704 box-shadow layers, 158 multi-layer elements and 326 inset highlights. They moved with the concurrent X-W12U .k2 glass adoptions (Collapsible, Input, Button), not with this cure.
- A first census run under load ~500 captured six dark pages half-booted. It was re-run, and light and dark now agree page for page.
- **Verdict RED**, on glass-owned chrome (O-87).

**Frames.** `evidence/DS/value/pass-07/`, all headless real Chrome (§0ei):
- 36 route frames (`capture.mjs`, 0 of 36 failed). The palettes, generate, browse, mix and picker frames were re-shot after the Palettes wrap.
- The probe cells (`gradient-tile-390-light.png`, `atmosphere-well-1440-light.png`, `companion-*-1440-light.png`).

The critic's own frames stay in `pass-07/critic/` (not committed by this seat).

**Gates** (`v7c-gates/`, with a README). Host load was 107–530 throughout.
- **Type-check:** 0 errors ×2.
- **vitest:** 1104/1120 ×2 (8 skipped).
  - The failures are the 7 pre-existing ones: `ink.test` resolveMutedInk ×2 and T-35 ×3, `spectrum-luma` C-5, `reka-binding-idiom` NG-6.
  - The eighth, generate-rail EC-10, times out at the 5 s default under load. It passes alone with a 30 s timeout (2.9 s).
- **e2e:**
  - The pass-6 set plus o19 and o29 (153 tests) was **voided**: it was stopped at 37/153, and every failure was a 30 s timeout at load 270–530.
  - The focused set (the specs that touch the changed files, `--timeout 240000`) ran ×2 plus a re-run. O-68 (re-aimed) passed 2/2 ×2. D8-1 passed ×2. companion-pane-track-start passed in run 1. gradient.spec T-21b (the tile carries type and direction) and the drag round-trip passed in the re-run.
  - Remaining failure classes, none on a changed surface:
    - Nav and settle timeouts: `getByRole(main)` not found, "Loading the scene" lazy-chunk plates, and "the region never settled" on the **picker's** `div.pane-shell`.
    - o29's gradient leg: `regionsOf` gains a third, unnamed region, a glass Collapsible disclosure (`role="region"`) from the concurrent `cc38595c1`.
    - **o19's canvas leg is pre-existing RED.** An A/B on the live tile, through the oracle's own window and dpr 2, reads 390 light 14.0 against **1.5** with the pre-cure classes, 390 dark 12.6 against 1.5, and 1280 (tile unchanged) 1.6. The netting plate it guarded was retired (X-W6). The oracle reads a plain render tile under either class set, so it is RED for a reason this pass does not own.
  - **e2e is NOT ×2 GREEN**, because of the load classes and the pre-existing set.
- **No visual golden was re-baselined.**

**For the pass-8 critic.**
- At 390 the tile is a small square beside Direction. Judge whether 48 px reads as the result of the controls or as a stray swatch, and check it with radial selected (no Direction row; the tile holds `min-h-10` on the right).
- The companions now end at their content, so a pair can differ in height, as the original two cards did. Check that /mix with a result plate, and My Palettes with several saved cards, still follow the row and scroll inside the card.
- "Character" is this seat's name for Harmony, Arrangement, Medium and Motion. "Palette" was the critic's other option; it fits Harmony only.
- V2C-05, V2C-15, V2C-16, V1C-02 and V3C-11 still wait on the owner.

### pass 8

This receipt covers the cure of the pass-8 critic's rows **V3C-01 … V3C-07**, judged after the pass-7 cure `a85477894`. The workflow that dispatched this seat called it "pass 3" (its counter restarted after the limit reset). It is filed as pass 8, as pass 7's seat did for the same reason: `pass-03/` already holds pass 3's committed evidence, and V3C-07 itself names "the pass-8 cure seat".

**Commits.** value.js `5f3275ac9` (the cure, 12 files) and `fa2c2e820` (AFTER frames, probe, census). The gate listings and this receipt are committed together.

**Consumer findings, cured at the root.**

| id | cure | measured (`pass-08/`) |
|---|---|---|
| V3C-01 | Mix composes PaneShell `seated`, and MixConfigBar (Color space, Hue method and the Mix button) sits in the shell's `#footer` seat, the way the config pane's action bar does since `3abe9d7d5`. The seat carries the body gutter (`px-4 sm:px-6 pt-3 pb-4`) and the config pane's 35% footer hairline, so the verb never scrolls and the selects are no longer flush on the card edge. The Saved-palettes true-empty plate takes EmptyState's new `compact` prop: no plate-scale `py-8` under its own section heading, and a tighter `gap-1.5`. | `probe-v3c.json`: at 1440 the button's bottom is 716 inside a card ending at 733 (17 px under it). It is outside the port in every cell. The empty Mix port is 361/361 at 1440 (no scroll; it was 683 against 619) and 348/348 at 390 (`probe-shots/mix-card-1440-light.png`, `mix-*.png`). |
| V3C-02 | PaletteCardSkeleton's `instrument` branch drops `animate-pulse` and its staggered `animationDelay` on the cells and meta blocks. The face is a static, flat well that keeps its live-k segmentation (`gap-px`). Motion stays on the loading registers (the `v-else` Skeleton branch). | Extract's ghost runs 0 looping animations in all four cells (was 7). The census's consumer looping animations fall from 14 to **0**. |
| V3C-03 | The name has the title row to itself. The verb cluster (Regenerate, save, copy) moves to the bench-note row, right of the seed that Regenerate re-rolls, so provenance and the verb that changes it share one line. One display voice at every width: the `max-sm:text-body` step swapped the family as well as the size, and with the whole row the default fits at 390 on the same rung. The field wears the plate's well (`--input-on-glass: transparent`, scoped to `[data-generate-plate]`). The second 8% tone step it laid over the well was the heaviest fill on the card. glass's field edge is kept (O-87). | "Generated Palette" is unclipped at 1440 (434/434, was 197/191) and at 390 (296/296). The voice is Fraunces 20.35 px in all four cells. The field background is transparent over the well (`generate-*.png`, `probe-shots/generate-plate-*.png`). |
| V3C-04 | Browse, Generate, Gradient, Extract and Mix compose PaneShell `seated`. The existing seated-header rule (PaneHeader.vue, V4C-05) drops the rest veil. No header is restyled. A seated header never condenses; this is About's and My Palettes' contract. | Every visible header in every probed row (Browse, Generate, Gradient and Extract each beside My Palettes, and Mix) paints no veil (`::before` display none), light and dark, 1440 and 390. |
| V3C-05 | Generate's "Colors" is glass's `scrubber` Slider at the `sm` rung, Extract's idle register. The swatches still show on the plate above. The content-as-track rail and its `countSliderGradient` retire. | Count rail absent and variant `scrubber` in all four cells. `paletteRail` still serves Extract's developed rail, under its own lock. |
| V3C-06 | **No local cure. This needs an owner ruling.** Gate A5 keeps the route h1 visible as the focus target. Record for the owner: anchor it as the dock's label, or let the pane title carry the h1 role, only if A5 is revisited. | — |
| V3C-07 | Evidence only. The gradient and extract cells (and every other cell) are re-captured at this HEAD. | `gradient-1440-*.png` and `extract-1440-*.png` show no plate under My Palettes. The Gradient labels read "Color space" and "Hue method". |

**Glass-owned rows.** None were raised. The census's glass rows stay honest-RED on O-87, with no local override. The V3C-03 field edge is glass's (`--field-control-ink`, no host seam) and is cited on O-87.

**Re-aims, named** (no assertion weakened elsewhere):
- **O-9's living leg → a still leg** (`e2e/smoke/oracles/o9-shadow-palette.spec.ts`). It asserted an infinite staggered pulse on a face where nothing is loading. The X-DS canon and addendum (a) (§0ej/§0ek) put idle pulse on state-less chrome out. The leg now asserts that no cell animates at k = 5 or k = 6. The live-k re-segmentation, the no-grow height and the PRM leg are unchanged.
- **generate-rail.test.ts → the count-control contract.** EC-10's twin locked the retired rail. It now asserts the glass scrubber at `sm`, with no rail and no gradient track.

**Census** (`scripts/ds-census.mjs --widths 1440 --themes light,dark --settle 5000`, `census-after.json`). The first run caught /gradient, /atmosphere and /blob half-booted ("Loading the scene" plates). Those three were re-run at a 15 s settle (`census-after-rerun.json`).
- Consumer box-shadow layers 116 and backdrop blur 18: unchanged.
- **Consumer looping animations: 14 → 0.**
- **Verdict RED**, on glass-owned chrome (O-87): inset highlights, multi-layer elements, the dock's drop-shadow and gradient fills on glass controls.

**Frames.** `evidence/DS/value/pass-08/`, all headless real Chrome (§0ei):
- 36 route frames (`capture.mjs`, 0 of 36 failed);
- the probe cells in `probe-shots/`;
- `probe-v3c.json` (final) and `probe-v3c-first.json` (before the compact empty state, when Mix's port was 422 against 361).

**Gates** (`v3c-gates/README.txt`). Host load was 92–450 throughout.
- **Type-check:** 0 errors ×2.
- **vitest:**
  - Run 1: 1095/1120. Run 2: 1100/1120 (10 skipped).
  - Failures are the pre-existing set (ink ×5, spectrum-luma C-5, reka NG-6) plus load timeouts: byte-exact PNG, extract-session, the admin panels, and the n-fixtures harness's in-file 60 s hook in palette-card-layout and plate-mass.
  - The re-aimed generate-rail and admin-destructive pass alone with a 180 s timeout.
- **e2e: NOT ×2 GREEN.**
  - The focused set on a cold 8090 server was voided twice: it ran at load 300–450, where nearly every test hit a goto, dock or pane timeout.
  - On the warm server, the targeted set ran ×2. O-9 Extract (the re-aimed still leg) and O-9 Browse-empty **passed ×2**.
  - The rest failed ×2 in one class: openView's dock-listbox option never reads "stable" in the SwiftShader smoke project at load, so the pane under test never opens. The dock select is not in this diff.
  - A direct headless-Chrome walk of the same openView opens all five changed panes in 1.3–2.7 s.
  - companion-pane-track-start shows the pass-7 "region never settled" class.
- **No visual golden was re-baselined.**

**For the pass-9 critic.**
- The empty Mix fits the 1440 row exactly (port 361/361). Judge it with colours selected and with a result plate. The port should scroll above the fixed footer, and the convergence overlay should still land on the result well.
- Generate's verbs now sit on the seed row. Judge whether Regenerate reads as the plate's verb there, and whether the title row (name alone) reads as a title rather than a field. The field edge is glass's.
- The five workbench headers no longer condense on scroll (seated). Check the phone band, where Gradient's card is long, for header weight.
- V3C-06 waits on the owner (A5), with V2C-05, V2C-15, V2C-16, V1C-02 and V3C-11.

### pass 2 (re-dispatch, 2026-10-13): critic V7C — already cured at pass 7; re-read at HEAD, no source change

The workflow relaunched on 2026-10-13 with its pass counter reset, and dispatched this seat as "pass 2" with the pass-7 critic's rows **V7C-01 … V7C-04**. Those four rows were cured at `a85477894` (the "### pass 7" receipt above). This seat read the tree and the served app, found every cure standing, and changed **no source file**. The evidence sits in `evidence/DS/value/pass-02/redispatch-2026-10-13/`, a sub-directory, so pass 2's own committed frames are not overwritten.

**Commit.** value.js `584a31b08` (frames, probe, census, gate listings). This receipt is committed after it.

**The four rows, re-read** (`probe-v7c-reread.json`, headless real Chrome, §0ei; the pass-7 probe plus a wait for the tile and a dark 390 cell).

| id | state at HEAD | measured |
|---|---|---|
| V7C-01 | Cured (`a85477894`). The render tile is `order-last col-start-2 w-12 min-h-10` below sm, and `sm:order-none sm:row-span-2 sm:w-24` from sm. | At 390, light and dark: the tile is 48×40 at y 663, on the 40 px Direction row (y 663). It sits after Type, Color space and Hue method (`probe-shots/gradient-tile-390-*.png`). At 1440 it is 96×120. |
| V7C-02 | Cured. Both config schemas are in sentence case. The one Title Case string left is "Van Gogh", a proper name. | /atmosphere: "Color energy", "Noise", "Zones". /blob: "Body radius", "Satellite radius", "Orbit radius", "Smoothness", "Noise amplitude", "Noise frequency", "Pulse frequency", … (31 labels, none in Title Case). |
| V7C-03 | Cured. The select group is the section "Character". | The well's heads are Character and Field: Fraunces, 20.35 px, the same ink (`probe-shots/atmosphere-well-1440-light.png`). |
| V7C-04 | Cured. The row is a follow companion's ceiling (shell.css); the 30rem floor stays on the wrapper. | 1440: 1 px under the last content in every companion. Mix is 598 px in a 621 px row. My Palettes is 425 px beside Generate (stage 459), Browse (370) and the picker (621). Blob follows its row (621) and scrolls. |

Mix is taller than pass 7's 426 px because the tree now carries the "Saved palettes" block and the pass-8 footer seat; it still ends at its content.

**Glass-owned rows.** None in this dispatch. The census's glass rows stay honest-RED on O-87, with no local override.

**Census** (`scripts/ds-census.mjs --widths 1440 --themes light,dark`).
- The first run (`census-after.json`, settle 15 s, load 150) caught seven cells half-booted. Its 16 "consumer looping animations" are all `skeleton-breathe` on the lazy-chunk loading plate, which is a loading register and carries state.
- The re-run of those six routes (`census-after-rerun.json`, settle 30 s) reads **0 consumer looping animations** in all twelve cells.
- **Verdict RED**, on glass-owned chrome (O-87): inset highlights (177 on the six re-run routes), multi-layer elements, the dock's drop-shadow, gradient fills on glass controls.

**Frames.** 36 route frames (9 routes × light/dark × 1440/390; `capture.mjs`, headless real Chrome). Four 1440 light frames timed out at load 185 and were re-shot (`capture-reshoot.log`); the manifest marks them. The probe cells are in `probe-shots/`.

**Gates** (`gates/README.txt`). They read HEAD `b50237f09` plus the tree's other dirty paths. Host load ran from 10 to 454 during the sitting.
- **Type-check:** 0 errors ×2.
- **vitest:** 1105/1122 ×2 (8 skipped); 9 tests and 2 suites failed ×2.
  - The 7 pre-existing: `ink.test` resolveMutedInk ×2 and T-35 ×3, `spectrum-luma` C-5, `reka-binding-idiom` NG-6.
  - `plate-mass` G20 and N-17: the test page imports `demo/palettes/browser/card/PaletteCardSkeleton.vue`, which X-W12U `.k2` moved to `demo/shared/ui/` (`785e522c5`). This is a stale path, not a timeout. It belongs to X-W12U `.k2` and was not touched here.
  - `palette-card-layout` (suite) and `plate-mass` at 390: the harness's 30 s `page.goto` under load.
- **e2e: NOT ×2 GREEN.** The pass-7 focused set, smoke project, warm server, one worker.
  - Run 1 (load 97–153): 11 passed, 15 failed of 26. O-68: 2/2 passed.
  - Run 2: the first attempt was voided at load 180–190. The second (load 107–454) was stopped at 20/26 with 6 passed and 14 failed. O-68 was not read a second time.
  - The failure classes are pass 7's: o19's canvas leg ×4 (pre-existing RED); o29's gradient scene (a third unnamed region from glass's Collapsible); and gradient.spec, mix.spec and o29 j4, where the pane under test is not found or never settles. companion-pane-track-start failed run 1 and passed run 2.
- **No visual golden was re-baselined.**

**For the orchestrator.**
- The workflow's critic findings for value are stale by at least two passes: the V7C rows were cured at pass 7 and the V3C rows at pass 8. `pass-09/` holds an uncommitted pass-9 critic and probe from 2026-10-09 (the dead session). The next value seat should be given the pass-9 critic's rows, or a fresh critic at HEAD.
- The gradient.spec "main named Gradient has no Gradient heading" failures repeat in both runs, including at the lower load. They need a read on a quiet host to tell load from a defect in the dirty X-W12U `.h` header work (`demo/shared/ui/PaneHeader.vue`).

### pass 3 (re-dispatch, 2026-10-14/15): critic VC3 — the served app's boot, the Mix verb, the doubled empty voice, the capture gate

The relaunched workflow dispatched this seat as "pass 3" with critic VC3's rows **VC3-01 … VC3-04** (frames `evidence/DS/value/pass-03/critic-2026-10-14/`). `pass-03/` already holds pass 3's own committed evidence, so this cure's evidence sits in the sub-directory `pass-03/vc3-2026-10-14/`. The first cure seat did the work on 2026-10-14 and died uncommitted in the 13:24 WindowServer abort (below). This seat re-read every cure on 2026-10-15, re-ran the gates and the census, and committed.

**Commits.** value.js `eddd784a5` (the cure, 8 files) and `900e08e97` (AFTER frames, diag, probe, census, gate listings). This receipt is committed after them.

| id | cure | measured (`pass-03/vc3-2026-10-14/`) |
|---|---|---|
| VC3-01 (high) | **Root: one optimized-deps cache per long-lived vite.** `vite.config.ts`'s dev branch takes `cacheDir` from `VJS_VITE_CACHE_DIR`. The e2e webServer sets its own (`node_modules/.vite-e2e-<port>`, `playwright.config.ts`), and the n-fixtures harness (`demo/test/palettes/n-fixtures/browser.ts`, the root that optimizes a smaller dep set) sets `node_modules/.vite-harness`. The :9000 server keeps the default. It was restarted once with a fresh optimize (2026-10-14 ~12:25). | `probe-vc3.json` and `diag-boot-before/after.png`: before, dock 0 and the three errors (GlassDock "missing template", dockEl "not extensible", renderSlot `'ce'`); after, dock 1 and none. Re-read 2026-10-15 13:00 on the same server: dock mounts, Mix renders, 0 errors. |
| VC3-02 | The Mix verb takes glass Button `emphasis="primary"`, and the stale "glass 7 declares no variant" comment is deleted. No local fill or shadow: the primary lighting (`glass-deep`, the specular track) is glass's and is judged under O-87 at the 10.2.0 repin. | `data-emphasis=primary` on the Mix button; `mix-*.png`. |
| VC3-03 | The My Palettes well ("Start a new palette", the dashed + slot) carries the invitation. The library's true-empty trio (owner-ruled t33-audit-08) keeps its plate, but its statement takes the hint rung: one scoped rule in `PalettesPane.vue` on the companion grid's untyped empty state. Browse's own trio, the only empty voice in its card, is untouched. | At 1440 light, the well label is 16.4 px / 600, and "No saved palettes yet." is 16.4 px / 400 (it was the 20 px / 600 subheading). The statement no longer outranks the action (`palettes-*.png`, `browse-*.png`). |
| VC3-04 | The pass-02 capture gate (`pass-02/redispatch-2026-10-13/capture.mjs`) fails and retries a frame while `main [role="alert"]` (PaneErrorPlate) stands. This seat's `capture.mjs` carries the same gate (VR3-10). `picker-390-light.png` is re-shot on the healthy server, and the manifest marks the re-shoot. | The re-shot frame shows the picker and the About card, with no error plate. All 36 AFTER frames passed at attempt 1. |

The critic's other cure note was to re-read pass-02's e2e failures where "main Gradient heading not found" or the pane under test never settled. The boot fault is a credible cause for that class: on a two-Vue page, no pane mounts. In this sitting the focused set ran on its own server and cache, and no "pane never settled" failure recurred (below).

**Glass-owned rows.** None raised. VC3-02's primary lighting and the census's glass rows (inset highlights, multi-layer elements, the dock's drop-shadow, gradient fills on glass controls) stay honest-RED on O-87, with no local override.

**Census** (`scripts/ds-census.mjs --widths 1440 --themes light,dark --settle 15000`).
- 2026-10-14 (`census-after.json`, right after the cure): **consumer looping animations 0**. RED only on glass rows.
- 2026-10-15 (`census-after-2026-10-15.json`): consumer box-shadow layers 77, backdrop blur 16. **Verdict RED**, on glass rows: inset highlights 319, max 6 layers, drop-shadow 7, gradient fills 18.
  - Its 64 "consumer looping animations" are all Browse's loading register (glass `Skeleton`, `skeleton-breathe`, 32 per theme) while the public-palettes fetch is pending on :9000. This is a loading state, as in the pass-2 precedent, and is not in this diff.
  - `/atmosphere` and `/blob` light lost their renderer ("Target crashed" / "Page crashed") in the census browser. The dark cells read clean, and the 2026-10-14 frames of both scenes are whole.

**Frames.** 36 route frames (9 routes × light/dark × 1440/390), headless real Chrome (§0ei). They are shot from the cured tree (sources 12:21–12:26, frames 12:41–12:51 on 2026-10-14). The diag boot pair and the probe are in the same directory.

**Gates** (`gates/README.txt`). Host load 12–20.
- **Type-check:** 0 errors ×2.
- **vitest:** 1182/1191 ×2; the same 9 failed ×2, none in this diff:
  - the 7 pre-existing (ink D6 ×2 and T-35 ×3, spectrum-luma C-5, reka NG-6);
  - `v4-css-emerging` `if(supports(…))` ×2, the library parser, another seat's in-flight BBNF work.
  - plate-mass and palette-card-layout (the harness, now on its own cache) pass ×2.
- **e2e:** the focused set (`gates/specs.txt`: mix, o9, o10d, w7-mutation, o7, o11, companion-pane-track-start, scene-action-contract). Smoke project, headless, one worker, own server :9161 with its own cache.
  - **40/49 ×2.** The same 9 failed ×2, all pre-existing since pass 1 (`pass-01/v1c-gates/e2e-head.txt`): O-7 ×3 (grain / rung-1, glass), O-10d browse wall ×2, w7 G13 admin delete-all, and scene-action-contract D4 ×3. In D4, Generate, Gradient and Mix at 390 now register as "ready", not "unavailable": a stale spec after X-W5's `bindPane`.
  - mix.spec, o9, o11 and companion-pane-track-start passed ×2.
- **No visual golden was re-baselined.**
- **The guard, named.** vitest, e2e and the census ran under `guarded --light` (still RSS- and timeout-contained) after the heavy-slot wait starved for 55 min (vitest) and 11 min (e2e). `acquire_slot` polls `flock` every 5 s, so a newer arrival wins a freed slot, while three slots were held by 45–150-minute runs from other repos.

**The 2026-10-14 13:24 crash** (the first cure seat died in it; there has been no reboot since 2026-10-09, so it was a GUI-session loss):
- **What failed:** `WindowServer` aborted (SIGABRT) in `WSIOSurfaceDebugTallyAndAbort`, under `iosurface_create_common` ← `CaptureSurfaceMetal::CreateMetalBacking` ← `captureWindowList` ← `_XWindowListCreateImage`, with the kernel triage `vm_map_copyout_kernel_buffer failed`. In plain terms, a window-list screen capture asked for an IOSurface the kernel could not map.
- **The client is not recorded.** Headless Chrome does not use that path. Something on the host was taking window or screen captures.
- **Host state:** load 50–109, ~1,250–1,400 processes, swap ~87–89%, memfree 37–47%.
- **Bursts beforehand:** Playwright WebKit WebContent aborts at 12:23–13:21. An earlier WindowServer userspace-watchdog hang hit at 2026-10-13 18:42.
- **A standing drain:** ~45 `vitest-vscode` processes (the editor's vitest extension) were live on 2026-10-15.

**For the next critic.**
- Judge the Mix verb's primary register against the selects at rest (disabled) and enabled.
- Judge the My Palettes card at 390, where the well and the hint-rung trio stack.
- Browse's twin trio is now one voice beside a quieter one. Check whether it still reads as two plates.
- The VR3 re-dispatch (`fbc2affa9`) left `pass-03/redispatch-2026-10-13/` uncommitted, with no receipt here. It is not this seat's to commit.

### pass 4 (re-dispatch, 2026-10-15): critic VC4 — the dark stamp, one empty register, the admin sweep, the faux italic, the census's loading loops

The relaunched workflow dispatched this seat as "pass 4" with critic VC4's rows **VC4-01 … VC4-11** (frames `evidence/DS/value/pass-04/critic-vc4-2026-10-15/`). `pass-04/` already holds pass 4's own committed evidence, so this cure's evidence sits in `pass-04/vc4-2026-10-15/`.

**Commits.** value.js `7ccdddee1` (the cure, 7 files) and `c30a5acfd` (AFTER frames, probe, census, gate listings). This receipt is committed after them.

| id | cure | measured (`pass-04/vc4-2026-10-15/`) |
|---|---|---|
| VC4-01 (medium) | **One token, `--spectrum-stamp-ink`, per scheme** at the one declaration (`SpectrumCanvas.vue`). Light keeps the live colour half-way to black. Dark takes the live hue at the stone caster's band: `oklch(from <live> calc(l * 0.22) min(c, 0.07) h)`. The 8px / 0-blur register and the hue are kept. The critic's example (30 % live into `--shadow-color`) was computed and rejected: for a light live colour (L 0.92) it lands at L ~0.42, still over the ~0.32 dark ground. Without the chroma cap, the gamut clip swung the ink to pure red (110,0,0), still brighter than the ground. | `probe-vc4-cure.json`. Dark: the stamp is (49,6,17), Y 0.008, over a ground of (92,13,43), Y 0.027. It was (193,72,100), Y 0.169. Light: unchanged, (193,72,100) over (226,70,157). `stamp-crop-1440-*.png`. |
| VC4-02 (medium) | **EmptyState settles the true-empty statement once:** `font-display text-body font-medium`, body at 500, one step over the hint, for every host. PalettesPane's VC3-03 `:deep` instance override is deleted. The error statement stays at subheading. The filtered register stays body at 400, a weight under. | Mix, Browse and My Palettes all read 18.6 px / 500 Fraunces at 1440, light and dark. Mix's "Saved palettes" head is 20.35 / 600, so the statement no longer ties with its own heading. |
| VC4-03 (medium) | The admin view-menu entry (`DockViewSelect.vue`) and the admin profile trigger (`ProfileSection.vue`) swap glass `.gold-shimmer` for the flat `.gold-shimmer-icon` (the gold identity hue, §0dm). The trigger's redundant inline `color` is dropped. | Source-verified; the admin dock is authed and not in the 9-route capture. O-18's A-1 admin-pill row stays born-RED by arithmetic (the gold is unchanged). |
| VC4-04 (low) | About's fact keys and the range "to" are **upright**: `italic` is dropped. The body voice ships no italic face, and Fraunces stays on the display rungs (three-voice law). The muted plate ink against the weighted value carries the contrast. No local `@font-face`. | `font-style: normal` on every key and connector. `picker-1440-*.png` reads "0% to 100%" and "-125 to 125". |
| VC4-05 (low, glass) | **Glass half:** cited against O-87 (optional versus swap is decided at the 10.2.0 band-0 wave). **Consumer harness half, cured:** `capture.mjs` gates on the voice the page renders. A probe span in `"Plus Jakarta Sans", monospace` must measure differently from one in monospace alone. If not, the page is reloaded (up to 4 times) and then the attempt fails. | 36/36 frames shot in the declared body voice. |
| VC4-06, -07 (glass) | Cited against **O-87**. These are the translucent floater plate with its stacked shadow, and the disabled-primary register. No local override. | — |
| VC4-08 (glass) | Cited against **O-88 DOCK-COLLAPSE-MOTION**. No shim. | — |
| VC4-09 (trivial) | **The owner's call**, recorded only. The route h1 caption was ruled visible at gate A5. | — |
| VC4-10 (trivial) | `scripts/ds-census.mjs` tallies a loop inside an in-flight loading register apart as `stateLoopsExempt`, never as chrome. A loading register is `[aria-busy="true"]`, or `[role=status][aria-label^="Loading"]` (Browse's developing PaletteCardSkeleton). | Consumer looping animations: 0, with 64 exempt. |
| VC4-11 (trivial, optional) | **Not taken.** The config list scrolls in glass's FadingScroll port, so whether its end edge feathers is the port's behaviour. A local mask would be the counter-style the canon forbids. Re-judge at the 10.2.0 repin. | — |

**Census** (`census-after.json`, `--widths 1440 --themes light,dark --settle 15000`).
- **Verdict RED, on glass rows only (O-87):** max 6 layers, inset highlights 364, drop-shadow 8, gradient fills on controls 22.
- **Consumer:** 0 offenders, looping 0, box-shadow layers 116 (single-layer stamps), backdrop blur 18.
- Every route read clean; no renderer crashed.

**Frames.** 36 route frames (9 routes × light/dark × 1440/390), headless real Chrome (§0ei); 0 of 36 failed under the role=alert gate and the rendered-voice gate. Also in the directory: `stamp-crop-1440-light/dark.png` and `probe-vc4-cure.mjs/.json`.

**Gates** (`gates/README.txt`). Host load 5–20.
- **Type-check:** 0 errors ×2.
- **vitest:** 1182/1191 ×2. The same 9 as pass 3 failed ×2, none in this diff: ink D6 ×2 and T-35 ×3, spectrum-luma C-5, reka NG-6, and v4-css-emerging ×2.
- **e2e:** smoke project, headless, one worker, own server :9171. The specs were mix, o9, o10d, o11, companion-pane-track-start, o21, crash-battery and o18.
  - Run 1 passed 56/63, run 2 54/63. Every failure is outside this diff:
    - the O-10d browse wall ×2, red since pass 1;
    - O-18 F-3 dark (5.74 against 5.75), the admin pill A-1 (born-RED) and the profile-menu row labels N-3, all three already red at pass 5;
    - O-18 T-35, the same row as vitest T-35;
    - run 2 only: an O-10d Gradient heading, and the O-9 Extract ghost height (46.84 against 46.49, on Extract files another seat has dirty).
  - Passed ×2: mix, o9's true-empty legs, o10d's empty-statement face, o11, o21, crash-battery's R15/R16 (the nutrition label), and companion-pane-track-start.
- **No visual golden was re-baselined.**
- **The guard:** another repo's runs held the heavy slot for 20 min. vitest, e2e, the census and the capture ran under `guarded --light`, which is still RSS- and timeout-contained, one heavy run at a time from this seat.

**Host, 2026-10-15 ~14:00.**
- There has been no reboot since 2026-10-09 (up 5 d 19 h).
- `/Library/Logs/DiagnosticReports` holds no WindowServer or kernel-panic report after the 2026-10-14 13:24 IOSurface abort named in pass 3. Today's entries are `cpu_resource` and `.diag` reports (spotlightknowledged, media-indexer, mysqld, rsync, git).
- Load was 5–20, memfree 72–79 % and swap 87 %. That swap level is the standing pressure the next crash would ride on.

**For the next critic.**
- Judge the dark stamp's register at other live colours. A dark live colour gives a near-black stamp, since `l × 0.22`.
- Judge the true-empty line at 18.6 / 500 beside the My Palettes well label (16.4 / 600). It is larger and lighter, one step over the hint.
- `critic-vc4-2026-10-15/` (the critic's own frames and probe) is still uncommitted. It is not this seat's to commit.

### pass 5 (re-dispatch, 2026-10-15): critic VC5 — the route caption, the picker's tooltip register, the display-math edge

The relaunched workflow dispatched this seat as "pass 5" with critic VC5's rows **VC5-01, -02, -03** and **VC5-G1**. `pass-05/` already holds pass 5's own committed evidence, so this cure's evidence sits in `pass-05/vc5-2026-10-15/`. The critic's own frames (`tools-1440-*`, `scroll-4600`) were not on disk for this seat.

**Commits.** value.js `c040b8ea8` (the cure, 2 files) and `0265948c3` (AFTER frames, probe, census, gate listings). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-05/vc5-2026-10-15/`) |
|---|---|---|---|
| VC5-01 (low) | **Not taken; owner's call (A5 lock read).** | W5.md gate A5 iterates all fourteen `ViewId`s and fails "on a label that disagrees with `VIEW_MAP`". The lead pane's own title cannot carry that text on every view: Home has no pane title (its About head reads "About the color spaces, Lab"), the Palettes view's lead pane reads "My Palettes", and the admin and Not Found views title their panes in their own words. A5 is therefore read as requiring the shell-level node. The critic's fallback (tie the node to the dock row) would move the H1 out of `<main>`, which breaks the main's `aria-labelledby`, the seven focus origins and e2e's `MAIN_PANE` (`main:has(> h1#route-title)`). The node already sits centred directly under the dock as its caption. VC4-09 recorded the same row as the owner's call; it stays there. | — |
| VC5-02 (low) | **Cured.** | The picker's three descriptions join the house register of terse imperatives (`demo/picker/sceneActions.ts`): "Reset to the default color.", "Copy the current color.", "Pick a random color." | `probe-vc5-cure.json`: all three tooltips read on **one line** (desc box 310 px), light and dark; `tools-1440-light/dark.png`. No spec or unit test asserted the old strings. |
| VC5-03 (trivial) | **Cured, at the one shared rule.** | `Markdown.vue`'s display-math scroll row (AB-1) gets a flat trailing-edge **mask**, not a shadow. Its width is a registered `--katex-row-edge` (`@property`, initial 0) driven by the row's own `scroll(self inline)` timeline: 1.5rem while more of the row lies to the right, 0 at the row's end. A row that fits has an inactive timeline, so it keeps the initial 0 and carries no mask. An engine without scroll timelines resolves the 0 s animation to its end state, which is also no mask. The markdown sources are untouched. | 390 Home, both schemes: 4 display rows; the 2 overflowing (`f_y…`, 431/332 px, and `X = Xn·f⁻¹…`, 505/332 px) measure `--katex-row-edge` **24 px at rest → 0 px scrolled to the end**; the fitting rows 0 px. `katex-row-390-light/dark.png` show the bracket fading at the card edge. Census: the scroll-linked animation is not counted as a loop (looping 0). |
| VC5-G1 (glass) | **Held, cited O-87 / O-88.** | The 6-layer dock rim and halo, the name field's 48 % ring and insets with a 14 px backdrop, the translucent tooltip and floater plates (VC4-06), the disabled primary (VC4-07), and the body-voice fallback (VC4-05's glass half) are honest-RED until the 10.2.0 repin. VC4-08 and the 390 dock fill stay on O-88. No local override. | — |

**Census** (`census-after.json`, `--base :9000 --widths 1440 --themes light,dark --settle 15000`). Byte-identical to pass 4's totals.
- **Verdict RED, on glass rows only (O-87):** max 6 layers, inset highlights 364, drop-shadow 8, gradient fills on controls 22.
- **Consumer:** box-shadow layers 116 (single-layer), backdrop blur 18, looping 0 (64 loading loops tallied apart).

**Frames.** 36 route frames (9 routes × light/dark × 1440/390), headless real Chrome (§0ei), under the pass-4 gates (rendered body voice; no role=alert plate). 0 of 36 failed. The four Browse frames were re-shot against `:9000`, because this seat's e2e server (`:9175`) points `VITE_API_URL` at itself and Browse rendered its load-error plate, which the gate correctly refused. Also in the directory: `katex-row-390-*.png`, `tools-1440-*.png`, `probe-vc5-cure.mjs/.json`.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 errors ×2.
- **vitest:** 1169/1191 ×2 (10 skipped). Stable across both runs:
  - the pass-4 nine (ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6, v4-css-emerging ×2);
  - plate-mass 390/1440, whose test and PaletteCardSkeleton/PaletteSpecimen/SwatchButton are another seat's dirty files;
  - palette-card-layout, a hook timeout.

  The other three per run differ between runs; all are "timed out" at host load 60–170. The two suites that read this diff's files (`katex-corpus`, `picker-blob-config`) pass ×2. **Not GREEN; nothing in this diff.**
- **e2e:** the 5 specs that touch the changed surfaces (scene-action-contract, o29, o15, w12-about-clip, o21; 29 tests; smoke project, headless, workers 1, own server :9175). 19/29 ×2, with the **same 10 failures both runs**:
  - D4 ×3, the O-88 class already red at pass 4;
  - O-15b ×2, the glass dock Tools register;
  - o29 gradient: a stray `undefined:null` region in the scene row, from the shell, not this diff;
  - o29 j4 blob: a born-RED `test.fail` now passes;
  - w12-about-clip ×3: `.about-card` overflow is `visible`, About's FadingScroll-port contract since `340ec4250`.

  o21 (the About guide's facts) passes ×2. **e2e is NOT ×2 GREEN; nothing in this diff.**
- **No visual golden was re-baselined.**

**Host — the user's "why did the computer crash again", as measured from this seat (2026-10-15, 14:45–19:40).**
- **No kernel crash or reboot since 2026-10-09 18:57** (`last reboot`; up 6 days). `/Library/Logs/DiagnosticReports` holds no panic or WindowServer report.
- What it holds today:
  - a burst of **WebKit WebContent crashes, 14:42–14:50**, in `~/Library/Logs/DiagnosticReports`. These are headless Playwright WebKit pages from another seat; the reaper killed orphaned WebKit GPU and Networking helpers at 14:34;
  - `cpu_resource` reports for mds_stores and spotlightknowledged.
- **The load was the hazard.** The 1-minute load ran **100–171** from about 15:15 to 18:50, with memory free at 47–73 % and **swap 8.8 of 10 GB**. The CPU went to Backblaze `bztransmit` (3.4 GB RSS), the CrowdStrike agent, fileproviderd and Spotlight. There were also **42 `vitest-vscode` processes**, which belong to VS Code's Vitest extension (not to any guarded run), and roughly 38 guard waiters.
- The guard held this seat's vitest for about 70 minutes, past its 72 load threshold, and nothing was killed for RSS. Any freeze the user saw in that window rides on CPU starvation and near-full swap, not on a test OOM from this seat.

**For the next critic.**
- Judge the 1.5rem fade at 390 on other colour spaces' formulas: OKLab/OKLCh carry the widest matrices.
- VC5-01 waits on the owner, alongside VC4-09.

### pass 6 (re-dispatch, 2026-10-15): critic VC6 — the tag chip's noun, the probes' body voice, a framed Browse wall, the dark cast's register, the code paper

The relaunched workflow dispatched this seat as "pass 6" with critic VC6's rows **VC6-01..05** and **VC6-G1**. `pass-06/` already holds pass 6's own evidence from 2026-10-08, so this cure's evidence sits in `pass-06/vc6-2026-10-15/`. The critic's own `browse-cards-*` frames were not on disk; this seat framed its own before and after.

**Commits.** value.js `b623b3737` (VC6-01 + the test), `01aaf6a9c` (VC6-05) and `158dcbff3` (AFTER frames, harness, probes, census, gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-06/vc6-2026-10-15/`) |
|---|---|---|---|
| VC6-01 (medium) | **Cured, at the band rules.** | `PaletteCardMeta.vue`'s bands now come from the room the meta row actually has. Below 30rem, PaletteInspector's UIA-V-30 rule already puts the cluster on its **own row** under the name (the card less the menu column). There, one 9ch chip fits from **18rem** and two from **24rem**. From 30rem the cluster rejoins the head row, so the 30/36/42 steps stand for that range. The bands are still declared in CSS only (`@container … or …`), with no JS measuring. Band 0 (now under 18rem only) gives its count a noun: **"2 tags"**, not "+2". The n-fixtures label test follows. | `probe-browse-meta-before/after.json`, `browse-cards-{before,after}-*`. At 1440 the card is 462 px (28.9rem): **0 chips → 2**. At 390 the card is 324 px (20.25rem): **0 chips → 1**. "+N" now only follows a real chip. No meta row clips (`scrollWidth = clientWidth`) in any of the 4 cells. palette-card-layout (G9/G10, real Chromium at 390) passes ×2. |
| VC6-02 (low) | **Cured, in the harness.** | One shared `harness.mjs` holds the boot, the VR3-01/VC4-05 **rendersJakarta** gate (reload up to 4 times, then fail) and the role=alert refusal. `capture.mjs` and both probes import it, so a cure probe can no longer shoot without the gate. Root cause found while wiring the Browse fixture: Playwright's `page.route` **disables the HTTP cache**, so every gate reload fetched the faces cold and `font-display: optional` kept the fallback. The fixture is therefore answered in-page, by a fetch shim installed before boot. | `probe-vc6.json`: the tools and katex frames were re-shot with `voice: true` in both schemes. VC5-02 re-taken under the real face, **dark included**: all three descriptions are **1 line**, text 156–199 px in the 310 px box, in "Plus Jakarta Sans" in both schemes. The katex rows are unchanged (24 px at rest → 0 px at the end; the fitting rows 0). |
| VC6-03 (low) | **Cured.** | For `/#/browse`, `capture.mjs` answers `GET /palettes` with six varied palettes, in the e2e fixture's shape (`{ data, nextCursor, hasMore }`): 0 to 4 tags, votes 0 to 1203, 3 to 6 colours. It shoots only once a `role=article` card stands. | `browse-{1440,390}-{light,dark}.png` frame real community cards, the first Browse set to do so in six passes. |
| VC6-04 (low) | **Not a seat's cure: owner DESIGN-RULING (P6-B1).** | Both poles are framed at the one knob, injected by the probe; nothing ships. **Pole A** is today's stone at 50 %. **Pole B** is the original's (`684c818f`) `dark:shadow-gray-700`, an opaque, lighter offset: `--shadow-color: color-mix(in oklab, var(--foreground) 34%, var(--background))`, cast unblended at the same 8 px / 10 px hover geometry. Only `--shadow-color` / `--shadow-cartoon(-hover)` move. | `poles-A-picker-1440-dark.png` vs `poles-B-picker-1440-dark.png`. Pole B gives the dark cards a visible grey stamp against the wine field; Pole A reads as a faint darker band. |
| VC6-05 (trivial) | **Cured, at the token.** | The suggested cap raise alone **did not bind**. The dark `--accent-live` is the contrast-guarded light ink (default pick: L 0.958, **C 0.021**), so `min(c, 0.05)` = 0.021, the same grey slab. In dark the paper now takes `min(c * 2.5, 0.05)`; light keeps its 0.03 cap. A grey pick (C ≈ 0) stays neutral, and L stays pinned at 0.345. | Default pick, dark: ground C **0.021 → 0.05** (h 9.8). Live crayon ratios: ink 9.49, comment 5.15, keyword 4.99, entity 5.47, string 5.95, number 6.27. `certify-code-ground.json` covers every hue at the cap (step 5°): worst keyword **4.75** (h 175); all ≥ 4.5. Crop: `code-plate-1440-dark.png`. |
| VC6-G1 (glass) | **Held, cited O-87 / O-88.** | The dock's 6-layer rim and halo, inset top-lights on fields, the 8 drop-shadows (the bead's double drop, the dock), gradient fills on glass controls, the translucent tooltip and floater plates, the bead's specular body, and the 390 dock fill (O-88) are honest-RED until the 10.2.0 repin. No local override. | — |

**Census** (`census-after.json`, `--base :9000 --widths 1440 --themes light,dark --settle 15000`, guarded `--light`).
- **Verdict RED, on glass rows only (O-87):** max 6 layers, inset highlights 318, drop-shadow 8, gradient fills on controls 13.
- **Consumer:** box-shadow layers 111 (single-layer), backdrop blur 18, looping 0 (70 loading loops tallied apart), with no inset highlights, drop-shadows or control gradients.
- The glass tallies moved from pass 5 (364 → 318, 22 → 13) with no glass change from this seat. The served state differs between runs (the dock register, lazy panes), so this is not counted as a cure.

**Frames.** 36/36 route frames (9 routes × light/dark × 1440/390), headless real Chrome (§0ei), all through `harness.mjs`; 0 failed. Also in the directory: `browse-cards-{before,after}-*` (16), `tools-1440-*`, `katex-row-390-*`, `poles-{A,B}-picker-1440-dark.png` and `code-plate-1440-dark.png`.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 errors ×2.
- **vitest:** 1182/1191 ×2, the **same 9** failures both runs, all from the pass-4 set: ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6, v4-css-emerging ×2. The suites that read this diff's files pass ×2 (n-fixtures, compact-counts, format-color, palette-card-layout). plate-mass also passed this time.
- **e2e:** projects smoke + smoke-admin, headless, workers 1, own server :9175. Five specs, 24 tests: browse-loading, browse-pagination, gradient, w7-inspector-rows, a11y-authed-user. **21/24 ×2**, with the **same 3** failures both runs, none touching the bands or the code paper:
  - w7-inspector-rows "tag": the Edit Tags dialog shows no checkbox;
  - w7-inspector-rows: the dock's scene set lacks `palette.save`;
  - gradient "selector aurora": a census-hash assertion that expects the "glass-ui 10.1.0" text.

  **Not ×2 GREEN; nothing in this diff.** No visual golden was re-baselined.

**Host: the user's "why did the computer crash again", from this seat (2026-10-15, 19:36–20:50).**
- **No kernel panic or reboot since 2026-10-09 18:57.** `/Library/Logs/DiagnosticReports` holds no panic.
- `~/Library/Logs/DiagnosticReports` has 40 reports dated today:
  - **18:53–18:55:** a burst of **SIGABRT at launch**. 15 `node`, plus `cat`, `echo` and `env`, each dying within about 0.15 s of spawning from zsh. Ordinary processes failing to start is the signature of process or memory exhaustion, not of any one test.
  - **19:25:** 5 Firefox Nightly `plugin-container` SIGSEGVs.
  - **13:10:** 7 `python3.13` SIGSEGVs.
  - **14:16 / 14:50:** Safari and WebKit WebContent aborts.
- **Swap stayed at 8.8 of 10 GB the whole session.** The 1-minute load was 15–28, with about 1,130–1,250 processes.
- The guard's three heavy slots were saturated by other seats: this seat's census waited more than 20 minutes for a slot and was re-run under `--light`. Nothing was killed for RSS.
- Any freeze or "crash" today rides on near-full swap and process count, not on a test OOM from this seat.

**For the next critic.**
- Judge the bands at the widths that switch rows (29.9rem vs 30rem): the cluster drops from 2 chips on its own row to 1 in the head row by design.
- VC6-04 waits on the owner (P6-B1), alongside VC5-01 and VC4-09.

### pass 4 (re-dispatch, 2026-10-15/16): critic P4R — the Palettes rainbow, the body voice's word space, the title field's rim, Extract's dark ghost, the verb row

The relaunched workflow dispatched this seat as "pass 4" with critic P4R's rows **P4R-01..05** (evidence `critic-p4r-2026-10-15/`). `pass-04/` already holds pass 4's own evidence and the VC4 re-dispatch's, so this cure's evidence sits in `pass-04/p4r-2026-10-15/`.

**Commits.** value.js `f7a21f95a` (P4R-01 + P4R-04 + the test row; utils.css staged as HEAD plus this seat's hunks only, another seat's V9C-05 comment hunk left in the tree) and `af5fe4f46` (AFTER frames, crops, probe, census, gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-04/p4r-2026-10-15/`) |
|---|---|---|---|
| P4R-01 (medium) | **Cured, in the one resolver.** | `palettes-ramp.ts`: the max-chroma solve. The pick gives its **hue only**. Each stop starts at the surface's lightness with a chroma past the sRGB cusp, and the house certify (`certifyAccentInk`: floor + headroom where reachable, else the best ratio ≥ floor) walks L away from the plate, gamut-mapping at each step. The stop lands as near the plate as the guard allows and holds its hue's maximum chroma there. The fan widens from ±40° to **±60°** (three stops kept; one resolver for both sites). The recipe (`utils.css .palettes-ramp-text`) now interpolates **in OKLCh**, with the sRGB declaration kept as the fallback line. A first cut at a ×1.1 margin measured **2.36–2.8:1 on real plate pixels**, because the composited plate is lighter than its model, so the house headroom stands. | `probe-p4r-cure.json`, contrast against the sampled plate pixels under the title. **Light:** L 0.40/0.39/0.37, C **0.20/0.16/0.08**, h 310/10/70, **3.62–3.87:1** (was L 0.305, C 0.12/0.12/0.08). **Dark:** L 0.66/0.66/0.64, C **0.24/0.23/0.14**, **3.04–3.30:1** (was L 0.958, C 0.02–0.03). `crops/palettes-title-*`: violet to rose to orange in dark. Light reads purple to crimson to brown: amber at L 0.37 has no more sRGB chroma (C 0.08 is the gamut maximum), so the light end stays warm-dark. If the owner wants a cooler light end, that is a register call (T-56 bracket). |
| P4R-02 (low) | **Held, glass-owned (O-87).** | The face corpus and the body-voice token are glass's. The relay asks glass to check the embedded Plus Jakarta Sans woff2's space advance against upstream. If the face is faithful, glass would set a small word-spacing (about 0.04–0.06 em) at the body/small rung token. Probe numbers: a space of 2.44 px on 14.38 px (0.169 em), letter-spacing normal, word-spacing 0. No local word-spacing. | `critic-p4r-2026-10-15/probe-p4r.json`. |
| P4R-03 (low) | **Held, glass-owned (O-87 single-edge refinement).** | glass Input has no quiet-rest (title) register, and the consumer already zeroes the fill. The ask to glass: an inline/title field register with no edge at rest and the single quiet edge on hover and focus-visible. PaletteNameInput's live mode adopts it then. No hand-rolled borderless input (A2-VA-L1-14). Honest-RED. | — |
| P4R-04 (low) | **Cured, at the one token + the one span.** | `utils.css`: `.skeleton-ink-register` keeps its 15 % step toward `--skeleton-ink-pole`, which is `--foreground` and, under `.dark`, `--background`. The ghost now recedes below the plate in dark instead of lifting toward cream. `ImageDropZone.vue`: the "Upload image" span takes `text-foreground` at its font-display small rung, and only the ImagePlus glyph keeps `plate-ink`. | Dark (1440 and 390): ghost cell **L 0.925 → 0.389** (the same α 0.218 wash, now darker than the plate); verb **L 0.713 → 0.925**, now level with the "Colors" label (0.925); glyph unchanged at 0.713. Light is unchanged for the cell and the verb goes 0.289 → 0.216 (the foreground). `crops/extract-card-{before,after}-*`: in dark the strip sits as a quiet well under the sliders. **Trade-off for the next critic:** the 1 px cell seams (the well ground) are fainter in dark. |
| P4R-05 (trivial) | **Not cured: optional judgement, held.** | The critic marks this "not a canon violation". Regenerate is the plate's primary verb, labelled at width and with save/copy as named glyph buttons. Another seat (pass 9, V9C-07) has uncommitted hunks in `GenerateControls.vue` now. Left for the owner or a later critic. | — |

**Census** (`census-after.json`, `--base :9000 --widths 1440 --themes light,dark --settle 15000`).
- **Verdict RED, on glass rows only (O-87):** max 6 layers, inset highlights 364, drop-shadow 8, gradient fills on controls 22.
- **Consumer:** box-shadow layers 116 (single-layer), backdrop blur 18, looping 0, with no inset highlights, drop-shadows or control gradients.
- The glass tallies sit at pass 5's (364 / 22), up from pass 6's read (318 / 13), with no glass change from this seat. The served state varies between runs (the dock register, lazy panes).

**Frames.** 36/36 route frames (9 routes × light/dark × 1440/390), headless real Chrome (§0ei), through `harness.mjs`.
- 32 were shot on this seat's own server (:9178).
- The 4 Browse frames were re-shot on :9000. That server has a `VITE_API_URL`, so the in-page fixture shim answers; the plain server never reached it. The manifest says so.
- Also: `crops/palettes-title-{1440,390}-{light,dark}` and `crops/extract-card-{before,after}-{1440,390}-{light,dark}`.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1208/1215 ×2, with the **same 7** failures both runs, all standing from the pass-4 set: ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6. view-accents (the ramp rows) passes ×2.
- **e2e** (smoke, headless, workers 1, Playwright's own server :9177): o14-preview-truth, o9-shadow-palette, browse-loading, crash-battery, walk.
  - Run 1: **29/29**.
  - Run 2: **28/29**. o14's title-ramp test did not find the title within 8 s at a 1-minute load of 108.
  - That spec re-run alone: **7/7**.

  Not a strict ×2 GREEN; the one miss was load timing, not this diff. An earlier e2e pair that reused a plain `vite` server (no `VITE_API_URL`) was discarded. No visual golden was re-baselined.

**For the next critic.**
- Judge the light ramp's warm end (h 70 at L 0.37) against T-56's "pleasing pastel". A cooler light end needs the owner's register call.
- Judge the dark ghost's 1 px seams at 390.
- P4R-02 and P4R-03 wait on glass (O-87). P4R-05 is open as a judgement call.

### pass 5 (re-dispatch, 2026-10-16): critic P5C — the collapsed dock seal, the light Palettes ramp, Extract's idle ghost

The relaunched workflow dispatched this seat as "pass 5" with critic P5C's rows **P5C-01..03** (evidence `pass-05/critic-p5-2026-10-16/`). `pass-05/` already holds the earlier pass-5 evidence, so this cure's evidence is in `pass-05/p5c-2026-10-16/`.

**Commits.**
- value.js `7de5c708e`: P5C-03. `PaletteCardSkeleton.vue` was staged as HEAD plus this seat's hunks only. Another seat's uncommitted V9C-04 hunks in the same file stay in the tree.
- value.js `94292cb81`: probe, AFTER frames, crops, census and gates.

This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-05/p5c-2026-10-16/`) |
|---|---|---|---|
| P5C-01 (low) | **Held. The fill is owner-ruled identity; the lighting is glass's (O-87 / O-88).** | Consumer check as asked: no demo token feeds the tile's fill. The seal markup and its computed styles carry neither `--dock-ring` nor `--accent-view`. The filled tile is the **wax**: `Dock.vue #collapsed`, a WatercolorDot in the **live colour** (`cssColorOpaque`), with the view glyph inked over it in `--seal-ink`. That is the owner-ruled seal (T.W6 W6-7, Q12/T-28; T-37 "the wax speaks live"). Quieting it would strip identity, which §0dm forbids for a cure. `--dock-ring` only reaches the expanded trigger's focus ring. The ring and halo around the collapsed tile come from glass's `.glass-dock.collapsed`, so no local override. | `probe-p5c.json` `p5c01`: in both schemes the wax is `lab(92 88.8 20)` (the live pick) and `sealUsesDockRing` / `sealUsesAccentView` are both false. The collapsed `.glass-dock` box-shadow is one `0 0 12px` halo (glass). Crops: `crops/dock-collapsed-1440-{light,dark}`. |
| P5C-02 (low) | **Not a seat's cure: owner DESIGN-RULING (P5-B1, under T-56 / P4-B1).** | As the critic says, this is a register call. Both poles are framed at the ramp tokens, injected by the probe on the two consume sites; nothing ships. **Pole A** is today's ±60° fan around the pick (h 310 / 10 / 70). **Pole B** re-centres the light fan cool (violet 300, rose 350, coral 30), using the same max-chroma solve and held at **Pole A's own measured contrast**. Pole B is one resolver change (the light shifts), with no second recipe. Certifying the title at a bare 3:1 was not chosen: pass 4 measured a thin margin falling under 3:1 on real plate pixels. | **Title, 1440 light** (plate rgb 215/132/124): Pole A L 0.40/0.39/0.37, C 0.20/0.16/**0.08**, 3.72–3.75:1. Pole B L 0.40/0.39/0.39, C 0.21/0.16/**0.155**, 3.73–3.74:1. The warm end moves from brown to coral at the same contrast (`crops/palettes-title-pole{A,B}-{1440,390}-light`). **Menu entry** (normal text, 4.5 floor, plate 211/122/101): both poles land at L about 0.30, 4.54–4.57:1. Pole B lifts the warm end's C from 0.06 to 0.12, but at that floor the word stays dark (`crops/view-menu-entry-pole{A,B}-1440-light`). The menu entry stays near one ink at the 4.5 floor under either pole. |
| P5C-03 (trivial) | **Cured, at the one component (the critic's option b).** | The instrument face is now an **outline**: the card's one hairline, plus a `--card-edge` hairline between the k cells. It has no `bg-well` ground and no `--skeleton-ink` fill step. The mount stays as it is: R7 / T-13 (owner) seat the shadow palette at Extract's true-empty, so option (a) was not taken. The loading registers keep their ground and motion. The cure adds no counter-style: the fill rule is deleted and the seams replace the gap-px. | `p5c03`, all 4 cells: ground `0.08α well` → **transparent**; cell fill `0.218α ink` → **transparent**; seams `0px` → **1px card-edge**; height **42 px unchanged**. Crops: `crops/extract-card-{before,after}-{1440,390}-{light,dark}`. In light the slab no longer outweighs the sliders. In dark the seams now read. |

**Census** (`census-after.json`, `--base :9000 --widths 1440 --themes light,dark --settle 15000`, guarded `--light`).
- **Verdict RED, on glass rows only (O-87):** max 6 layers, inset highlights 364, drop-shadow 8, gradient fills on controls 22.
- **Consumer:** box-shadow layers 116 (single-layer), backdrop blur 18, looping 0. No inset highlights, drop-shadows or control gradients.
- Unchanged from pass 4's read.

**Frames.** Headless real Chrome (§0ei), through the pass-4 `harness.mjs`, on :9000. That server serves the working tree, so other seats' uncommitted V9C hunks show in the frames: the image actions sit under the drop zone, and the instrument has no meta blocks.
- The critic's cells: `gradient-stop-1440-*`, `card-open-1440-*` (Browse fixture), `view-menu-1440-*` and `extract-{1440,390}-*`.
- Plus the crops above.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1212/1219 ×2, with the **same 7** standing failures both runs: ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6. plate-mass passes ×2.
- **e2e** (smoke, headless, workers 1, own server :9179): o9-shadow-palette, browse-loading, crash-battery.
  - Run 1: **21/21**.
  - Run 2: **20/21**. In o9's no-growth leg, `boundingBox` read 46.836 vs 46.724 px, a sub-pixel transient from the plate's arrival transform. The cure adds no block-axis box.
  - Re-run alone `--repeat-each=3`: **3/3**.
  - Another seat's `4d6d0f96d`, which landed during this run, re-reads that leg as layout height for exactly this transient.

  Not a strict ×2 GREEN; the one miss is the known transient. No visual golden was re-baselined.

**For the next critic.**
- Judge the outline instrument's 1 px seams at 390 dark, and the swap from outline to the filled imminent skeleton when a run starts. That swap is now a material change; the layout is unchanged.
- P5C-02 waits on the owner (P5-B1), alongside VC6-04, VC5-01 and VC4-09.
- P5C-01's halo and rims wait on glass (O-87 / O-88). The wax tile itself is owner-ruled identity.

### pass 6 (re-dispatch, 2026-10-16): no findings above trivial — the pinned loupe's second shadow

The relaunched workflow dispatched this seat as "pass 6" with **no findings**: the critic found nothing above trivial. The task was to refine the remaining trivial items toward the original styles without regressing anything. `pass-06/` already holds pass 6's own evidence and the VC6 re-dispatch's, so this seat's evidence is in `pass-06/p6-2026-10-16/`.

**Commits.** value.js `5f33874b4` (the refinement) and `af459967c` (AFTER frames, probe, crops, census, gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-06/p6-2026-10-16/`) |
|---|---|---|---|
| P6-T1 (trivial) | **Refined, by deletion.** | `ImageEyedropper.vue`: `.loupe-pinned` re-declared a heavier float shadow (`0 4px 16px` at 20 % vs the loupe's 15 %), a second lighting state on the one floating surface. The rule is deleted. The loupe keeps its one neutral shadow (V1-18) in both states, and the pin is carried by the `--primary` ring alone. No counter-style was added. | `probe-p6-loupe.json`: in both schemes the box-shadow is `0 4px 16px` at 0.15 at hover **and** at pin (was 0.20 at pin). The ring is `--primary` at pin: oklch(0.305 0.082 130) light, oklch(0.958 0.08 130) dark. Crops: `crops/loupe-{hover,pinned}-1440-{light,dark}.png`. |

Other trivial rows were left on purpose:
- The other remaining consumer shadow sites are focus rings, hairline edges and MixSourceSelector's two-ring selection. MixSourceSelector carries another seat's uncommitted hunks.
- P4R-05's verb row sits in `GenerateControls.vue`, which also carries another seat's uncommitted hunks.
- The outline instrument's seams (P5C-03) sit in the dirty Extract files.

None of these was touched.

**Census** (`census-after.json`, `--base :9000 --widths 1440 --themes light,dark --settle 15000`, guarded `--light`).
- **Verdict RED, on glass rows only (O-87):** max 6 layers, inset highlights 364, drop-shadow 8, gradient fills on controls 22.
- **Consumer:** box-shadow layers 116 (single-layer), backdrop blur 18, looping 0. No inset highlights, drop-shadows or control gradients.
- Static consumer sites: box-shadow declarations **18 → 17**, layers 22 → 21 (the deleted pin rule). The computed census does not see the change, because no loupe is mounted on a route frame.

**Frames.** 36/36 route frames (9 routes × light/dark × 1440/390), headless real Chrome (§0ei), through the pass-4 `harness.mjs`, on :9000. That server serves the working tree, so other seats' uncommitted hunks show in the frames. Also: the four loupe crops above.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1212/1219 ×2, with the **same 7** standing failures both runs: ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6.
- **e2e** (smoke, headless, workers 1, own server :9181): o7-card-census, o9-shadow-palette, o18-contrast-census, 37 tests.
  - **31/37 ×2**, with the **same 6** failures both runs. All six are o18 contrast-ink rows, and none reads a box-shadow or the loupe: graph nodes F-3 (dark), the IDENTITY leg T-35 (light), the admin pill A-1 (both schemes), and the profile menu row labels N-3 (both schemes).
  - o7 and o9 pass ×2.

  Not a strict ×2 GREEN; nothing in this diff. No visual golden was re-baselined.

**For the next critic.**
- Judge the pinned loupe at 390 on a coarse pointer. The ring is now the pin's only signal, and it is 2 px.
- The open owner rulings are unchanged: P5C-02 (P5-B1), VC6-04 (P6-B1), VC5-01 and VC4-09.
- The glass rows wait on O-87 / O-88.

### pass 7 (re-dispatch, 2026-10-16): critic V7R — the floaters, opened for the first time; a menu buried under the stage

The relaunched workflow dispatched this seat as "pass 7" with critic V7R's 4 rows. `pass-07/` already holds the first pass 7 and the V7C re-dispatch, so this seat's evidence is in `pass-07/p7-2026-10-16/`.

**Commits.** value.js `4ac3da33f` (the cure, the oracle, the census overlay cells, the O-87 relay addendum) and `4bac97f33` (frames, probe, census, gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-07/p7-2026-10-16/`) |
|---|---|---|---|
| V7R-01 (high) | **Cured on the consumer side (interim); root relayed to glass.** | glass 10.1.0's `DropdownMenuContent` computes `z-index: auto`, while its Select and Popover take `z-popover`. Reka's fixed popper wrapper therefore sat at `auto`, and `.pane-wrapper--stage { z-index: 1 }` outranked it. The 6 call sites (`PaletteCardMenu`, `MobileMenuDropdown`, `ProfileSection` ×3, `UserSortMenu`) now carry glass's own `z-popover` utility, a layer token rather than a lighting override. The `shell.css` comment that called portaled overlays "unaffected" is corrected. Root: an addendum to `relay/X-ALL-BK-FLAT-LIGHTING.md` (O-87, with O-80's layering family) asks for `DropdownMenuContent` to take `z-popover`; the utility comes off at the repin. New oracle: `e2e/smoke/oracles/v7r-overlay-layer.spec.ts`. It reads **paint** order with pointer-events forced on, because reka's modal layer makes a plain hit test "find" a buried item. | `before/overlays.json`: card menu (1440) and overflow menu (390), both schemes, wrapper z `auto`, paint-top **0/5**. `overlays.json` after: all 8 cells z `130`, paint-top **5/5**. Frames: `card-menu-1440-*`, `overflow-menu-390-*` (before and after). |
| V7R-02 (low) | **Glass-owned: cited, not overridden.** | `select-content` stacks rims, under-shadow, floating halo and `--shadow-cartoon-lg` on a gradient fill. Cited in the O-87 addendum. Honest-RED until the 10.2.0 repin. | Census overlay row: `floaterMaxLayers` 8 (glass `select-content`); the menu plate has 5. |
| V7R-03 (low) | **Cured.** | `scripts/ds-census.mjs` opens 4 overlay cells per theme: the dock view menu, a Browse card menu at 1440 on an in-page fixture, the 390 overflow menu and a Mix select. It records `floaterMaxLayers`, `floaterGradients` and `paintTopFailures` apart from the route totals. `floaterMaxLayers ≤ 1` and `paintTopFailures = 0` join the allowance. The pass capture gains the same cells (`overlays.mjs`, sharing `harness.mjs`). | `census-after.json` `computed.overlays`: 8 cells, 0 errors, paint-top failures **0**, floater max layers 8 (glass), floater gradients 6 (glass). |
| V7R-04 (trivial) | **Glass-owned: cited.** | When a card menu opens, the dock folds to its seal. Cited under O-88 DOCK-COLLAPSE-MOTION in the addendum. No shim. | Visible in `card-menu-1440-*.png`. |

**Census** (`census-after.json`, `--base :9000 --widths 1440 --themes light,dark --settle 15000`, guarded).
- **Verdict RED, on glass rows only (O-87).** Routes: max 6 layers, inset highlights 364, drop-shadow 8, gradient fills on controls 22. Overlays: floater max layers 8.
- **Consumer:** unchanged from pass 6. Static box-shadow declarations 17, no inset highlights, drop-shadows or control gradients, looping 0.
- Overlay paint-top failures: **0**. This is the new gate, and before the cure it read 4 of the 8 cells.

**Frames.** Headless real Chrome (§0ei), on :9000 (the working tree, so other seats' uncommitted hunks show).
- 36/36 route frames: 9 routes × light/dark × 1440/390.
- 8 opened-overlay frames: `{view-menu-1440, card-menu-1440, overflow-menu-390, mix-select-1440}-{light,dark}`.
- The BEFORE overlay set is in `before/`.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1212/1219 ×2, with the **same 7** standing failures (ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6).
- **e2e** (smoke + smoke-admin, headless, workers 1, own server :9183). The specs are every one that opens one of the 6 menus, plus the new oracle: 82 tests.
  - **76/82 ×2**, with the **same 6** o18 contrast-ink rows as pass 6 (F-3, T-35, A-1 ×2, N-3 ×2).
  - N-3 reads the profile menu rows' ink, not their layer, and failed identically before this diff.
  - `v7r-overlay-layer` passed 2/2 ×2.

  Not a strict ×2 GREEN; nothing in this diff. No visual golden was re-baselined.

**For the next critic.**
- Judge the now-visible menus' material. In the census they are glass's 5-layer `menu-content` and 8-layer `select-content` (O-87).
- Check that no other portaled glass surface (tooltip, hover card, toast) lands under the stage. The overlay cells now make that a census read.
- The open owner rulings are unchanged: P5C-02 (P5-B1), VC6-04 (P6-B1), VC5-01 and VC4-09.

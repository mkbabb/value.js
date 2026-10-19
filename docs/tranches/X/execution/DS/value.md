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

### pass 8 (re-dispatch, 2026-10-16): critic V8C — the RGB specimen's digits, the My Palettes hierarchy, the select floater and trigger

The relaunched workflow dispatched this seat as "pass 8" with critic V8C's 5 rows. `pass-08/` already holds the first pass 8, so this seat's evidence is in `pass-08/p8-2026-10-16/`.

**Commits.** value.js `ff7ea01b3` (the cure, the unit case, the O-87 relay addendum) and `84c2b5f26` (frames, census, gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-08/p8-2026-10-16/`) |
|---|---|---|---|
| V8C-01 (low) | **Cured at the root.** | `formatSpecimen` applied the digit policy on the picker's 0..255 scale, and the library's `serializeCssColor` then divided an out-of-range rgb by 255 for `color(srgb …)`, bringing back 12 decimals. An rgb colour outside 0..255 now has its policy applied in the serialized domain (0..1 channels budgeted to 4 significant digits). No projection; the gamut mark is unchanged. New unit case `demo/test/color-session/specimen-format.test.ts`: Lab(92% 88.8 20 / 0.827) gives an RGB specimen ≤ 52 chars ending in `/ 82.7%)`, 4 significant digits per channel, and it round-trips `parseCssColor`. | `mix-select-1440-{light,dark}.png`: the RGB row reads `color(srgb 1.511 0.5623 0.7829 / 82.7%)` (39 chars; was 66, cut before its alpha). The o23 census print in `gates/e2e-run*.txt` shows the same. |
| V8C-02 (low) | **Cured, by lifting the action.** | `CurrentPaletteEditor.vue`: the well label moves from `text-small` muted to `text-body` foreground, keeping `font-display font-semibold`. It now ranks one step over EmptyState's single register (body, 500) on every host. EmptyState is untouched, so Mix's VC4-02 fix still holds. | `palettes-1440-*`, `browse-*`, `extract-*`, `generate-*` and `gradient-*` frames: "Start a new palette" at the body rung in full ink above "No saved palettes yet." |
| V8C-03 (low) | **Glass-owned: cited, not overridden.** | The select floater's translucency over the spectrum field, and the three-signal highlighted row. Cited as an addendum to V7R-02 in `relay/X-ALL-BK-FLAT-LIGHTING.md` (O-87). Honest-RED until the 10.2.0 repin. | Census overlay `floaterMaxLayers` 8 (glass `select-content`), unchanged. |
| V8C-04 (low) | **Glass-owned: cited.** | Wide `SelectTrigger`s take `--radius-control` (pill). The ask is `--radius-field` for wide, field-holding triggers (OA-54; O-58's radius table is the precedent). Cited in the same addendum. No consumer restyle. | `atmosphere-1440-*`, `mix-1440-*`, `generate-1440-*`, `gradient-390-*`. |
| V8C-05 (trivial) | **Left to the seat holding V9C-07.** | The `fill` cap sits in another seat's uncommitted hunks (`SwatchButton.vue`, `GenerateControls.vue`). This seat did not touch them. | — |

**Census** (`census-after.json`, `--base :9000 --widths 1440 --themes light,dark --settle 15000`, guarded).
- **Verdict RED, on glass rows only (O-87).** Routes: max 6 layers, inset highlights 367, drop-shadow 8, gradient fills on controls 22. Overlays: floater max layers 8.
- **Consumer:** unchanged. Static box-shadow declarations 17, with no inset highlights, drop-shadows or control gradients; looping 0.
- Overlay paint-top failures: 0.

**Frames.** Headless real Chrome (§0ei), on :9000. That server serves the working tree, so other seats' uncommitted hunks show in the frames.
- 36/36 route frames.
- 8 opened-overlay frames: `{view-menu-1440, card-menu-1440, overflow-menu-390, mix-select-1440}-{light,dark}`.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1214/1221 ×2. The 2 new V8C-01 cases pass. The **same 7** standing failures remain (ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6).
- **e2e** (smoke, headless, workers 1, own server :9184): o7, o10d, o18, o21, o22, o23, o24 and palette-save, 43 tests.
  - **36/43 ×2**, with the same 7 failures both runs: the 6 standing o18 rows (F-3, T-35, A-1 ×2, N-3 ×2), plus o23's projection leg.
  - o23 fails on the **HSL** row: the printed saturation reads back as 0 against a true −12.95, because the parser clamps a negative `hsl()` saturation. It does not fail on the RGB row this diff changes.
  - Falsifier: `gates/o23-at-HEAD.txt` runs the same spec with HEAD's `specimen-format.ts`, and it fails identically.

  Not a strict ×2 GREEN; nothing in this diff. No visual golden was re-baselined.

**For the next critic.**
- The o23 HSL row is standing and unowned. Either the specimen's HSL row for out-of-gamut colours, or the oracle's read-back through a clamping parser, needs a ruling. It is not a lighting row.
- `docs/tranches/X/gates/gate-specimen-grammar.mjs` is stale: it still reads `demo/color-session/ColorSpaceSelector.vue`, which moved to `shared/ui/` at `785e522c5`. Its 52-char sweep therefore never saw this row.
- Judge the well label at 390, where it now sits at the body rung beside the add slot.
- The glass rows wait on O-87 / O-88.

### pass 9 (2026-10-16): critic P9R — the expanded card's collision, the in-card rule tone, the strip remnant, the attribution chip, the well's promise, the zone badge's noun

The relaunched workflow dispatched this seat as "pass 9" with critic P9R's 9 rows. `pass-09/` already holds an earlier pass-9 critic's material (`critic/`, `critic-p9r/`, V9C probes), so this seat's evidence is in `pass-09/p9-2026-10-16/`.

**Commits.** value.js `a86622b18` (the cure and the new oracle) and `0df03cd19` (frames, probe, census, gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-09/p9-2026-10-16/`) |
|---|---|---|---|
| P9R-01 (medium) | **Cured at the root.** | `PaletteInspector.vue`: the narrow-card rule's detail selector is now a **descendant** (`.palette-card:not([data-layout="aside"]) .palette-card__detail`). The band sits inside the Collapsible's `display: contents` root, so the child selector never matched and the band kept the `detail` area, row 3, under the meta row. New oracle `e2e/smoke/oracles/p9r-card-detail-row.spec.ts`: on an expanded Browse card at 1440 and at 390, the meta row's box and the detail band's box do not intersect, and the band sits below the meta row. | `probe-p9r.json`: 1440 (card 462 px) meta y 324–359, detail y 359–473; 390 (card 324 px) meta y 326–357, detail y 357–470; `metaDetailIntersect` false in all 4 cells. Frames `browse-expanded-{1440,390}-{light,dark}.png`, `exp-crop-*.png`. |
| P9R-02 (low) | **Cured, by token.** | Every in-card rule now uses the minted hairline `border-card-edge` (`--card-edge` = foreground 12 %): Gradient's three `<hr>`s (`GradientVisualizer.vue`), Mix's footer rule (`MixPane.vue`, was `border-border/35`), and both of `PaletteCardSwatches.vue`'s rules (were `border-border/15`). | `gradient-rule-*`: all 3 rules compute `oklab(0.216 … / 0.12)` light and `oklab(0.925 … / 0.12)` dark, which is the ink hairline and not the opaque khaki `--border`. The card's slug-row rule reads the same. |
| P9R-03 (low) | **Cured, by deletion.** | Expanded (non-aside), the specimen strip collapses to `block-size: 0`, so the fold still transitions. The 0.25rem remnant could not take its 1rem start radii. The swatch row is now the colours. The Extract result card (pinned expanded) follows. No ornament added. | `stripBlockSize` `0px` in all 4 expanded cells. `exp-crop-*.png`, `extract-loaded-*.png`. |
| P9R-04 (low) | **Cured.** | Attribution speaks at the meta rung: `text-small`, muted ink, regular weight, no ring, reading "by \<author\>" (the bare slug when the palette has no `userSlug`). The first-colour ink and ring are gone, along with `safeFirstColor` and its plumbing in the inspector. The copy verb is glass's `Button icon-only emphasis="quiet" size="sm"`, anchored to the slug, and keeps its `Copy slug …` aria-label (`copy-verdict.test.ts` passes unchanged). | `slugText` "by gallery", weight 400, border 0, colour = muted ink; `copyIsGlassButton` true. |
| P9R-05 (low) | **Cured: the row keeps the label's promise.** | `CurrentPaletteEditor.vue`: when the well is empty, its label row (`data-well-label-row`) is a pointer target for the same `addCurrentColor` the trailing add slot runs. The slot stays the keyboard stop and the accessible name, so there is no duplicate control and no new wrapper. V8C-02's rung is kept. | `palettes-editor-*`: a click on "Start a new palette" turns the well from empty to "Current Palette · 1 color" in both themes (`wellEmptyBefore` true → `wellEmptyAfter` false). |
| P9R-06 (trivial) | **Cured.** | `ImageDropZone.vue`: the badge now shows the verb and its glyph: Pipette + "Pick a color". The click opens the eyedropper. The zone's aria-label is unchanged. | `extract-loaded-{1440,390}-*`: badge text "Pick a color", glyph present. |
| P9R-G1 (medium) | **Glass-owned: cited, not overridden.** | Floater material (`select-content`/`menu-content` stack, gradient fill, blur). O-87 FLAT-LIGHTING (V7R-02, already relayed). Honest-RED until the 10.2.0 repin. | Census overlay `floaterMaxLayers` 8, `floaterGradients` 6 (glass). |
| P9R-G2 (low) | **Glass-owned: cited.** | The dock folds to its seal on non-scroll interactions, and its fill is misshapen at 390. O-88 DOCK-COLLAPSE-MOTION. No local shim. | Visible in `extract-loaded-*`, `palettes-editor-*`. |
| P9R-G3 (low) | **Glass-owned: cited.** | Hero bead, rim stacks and control plates. O-87. Honest-RED until 10.2.0. | Census below. |

**Census** (`census-after.json`, `--base :9000 --widths 1440 --themes light,dark --settle 15000`, guarded).
- **Verdict RED, on glass rows only (O-87).**
  - Routes: max 6 layers, inset highlights 339, drop-shadow 8, gradient fills on controls 17. Pass 8 read 367 and 22; these are glass rows and the counts move with route state, so this pass claims nothing about them.
  - Overlays: floater max layers 8.
- **Consumer:**
  - Computed: 0 multi-layer, 0 inset highlights, 0 drop-shadows, 0 control gradients, looping 0.
  - Static: 17 box-shadow declarations, unchanged.
- Overlay paint-top failures: 0.

**Frames.** Headless real Chrome (§0ei), on :9000. That server serves the working tree, so other seats' uncommitted hunks show in the frames.
- 36/36 route frames.
- 8 opened-overlay frames.
- 16 P9R interaction cells: `browse-expanded-{1440,390}`, `gradient-rule`, `palettes-editor`, `extract-loaded-{1440,390}`, each in light and dark, plus `exp-crop-*`.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1214/1221 ×2, with the **same 7** standing failures (diffed: ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6). None is in this diff.
- **e2e** (smoke, headless, workers 1, own server :9186): the new oracle plus every spec that drives the Browse card or inspector, Gradient, the well or the card menus, 54 tests. **54/54 ×2, a strict ×2 GREEN.**
- The oracle's first draft read the band mid-morph at 1440 (`oracle-first.txt`), so it now polls the band open before the geometry read. No assertion was weakened.
- No visual golden was re-baselined.

**For the next critic.**
- `PaletteInspector`'s `cssColor` prop is now read by nothing (it fed only the slug's first-colour ink). Hosts still pass it, and two of them, `ExtractWorkbench.vue` among them, carry other seats' hunks. Retiring it is a small host sweep for the seat that owns those files.
- Judge the empty well's row-as-command at 390. Judge the "by \<author\>" line against the tag chips' register.
- The glass rows wait on O-87 / O-88. The open owner rulings are unchanged.

### pass 10 (2026-10-16): critic V10 — one interior-rule voice, the Extract stat's column edge, the inspector's dead prop

The relaunched workflow dispatched this seat as "pass 10" with critic V10's 4 rows. Evidence is in `pass-10/`.

**Commits.** value.js `a5383d50c` (the cure) and `f982aca30` (frames, probe, census, gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-10/`) |
|---|---|---|---|
| V10-01 (low) | **Cured at the root, glass first.** | One interior-rule voice, which is glass's seam. Gradient's three section `<hr>`s become glass `<Separator decorative />`. Every other in-card rule paints glass's seam ink through a new `border-seam` utility: `foundation.css` `@theme` `--color-seam` = foreground at `var(--ink-seam)`. That is a pure consume of glass's token, not an override, and no wrapper was added. The rules it covers: Mix's footer, the card's slug-row and swatch-row rules (`PaletteCardSwatches.vue`), the Config footer (`ConfigSliderPane.vue` `.config-action-bar`, was `--border` at 35 %, on Atmosphere and Blob), and the two admin panel rules (`AdminFlaggedPanel.vue`, was `border-border/50`; `AdminUsersPanel.vue`, was `border-border`). `--card-edge` stays the **perimeter** hairline, and the Gradient code paper now takes it (`GradientCodeEditor.vue`, was `border-border/40`). | `probe-v10.json`. Light: Gradient's 3 separators, the Atmosphere and Blob footers, Mix's footer and the card's slug-row rule all compute `oklab(0.216 … / 0.08)`, the same as the About card's 6 glass Separators on Home (`picker-1440-*`). Dark: all of them compute `oklab(0.925 … / 0.08)`. The code paper computes `/ 0.12` (perimeter). Gradient renders 0 `<hr>`. Frames `gradient-rule-*`, `atmosphere-rule-*`, `blob-rule-*`, `mix-rule-*`, `browse-expanded-1440-*`. |
| V10-T1 (trivial) | **Cured.** | `ExtractWorkbench.vue`: the stat wrapper drops its `px-1`. The file carries another seat's uncommitted hunks, so only this seat's lines were staged (index blob = HEAD + this change). | `extract-loaded-1440-*`: stat x 224 = "Colors" x 224 = "Chroma weight" x 224. At 390: 33 = 33 = 33. `paddingLeft` 0. |
| V10-T2 (trivial) | **Cured, by deletion.** | `PaletteInspector`'s dead `cssColor` prop is removed, along with its three host bindings (`BrowsePane.vue`, `PalettesPane.vue`, `ExtractWorkbench.vue`, the last hunk-staged). `BrowsePane`'s now-unused `CSS_COLOR_KEY` inject goes too. `ExtractWorkbench` keeps its inject, because `ExtractControls` still reads it. No behaviour change. | Type-check 0 ×2. |
| V10-G1 (low) | **Glass-owned: cited, not overridden.** | The floater material, the dock fold and its 390 plate, the hero bead, the title-field rim and the wide-select pill are standing rows, already relayed (O-87 FLAT-LIGHTING: V7R-02, V8C-03, V8C-04, P4R-02, P4R-03, P9R-G1, P9R-G3; O-88 DOCK-COLLAPSE-MOTION: P9R-G2, P5C-01). There is no new ask and no local shim. They stay honest-RED until the 10.2.0 repin. | Census overlay `floaterMaxLayers` 8 (glass). |

**Census** (`census-after.json`, `--base :9000 --widths 1440 --themes light,dark --settle 15000`, guarded).
- **Verdict RED, on glass rows only (O-87).**
  - Routes: max 6 layers, inset highlights 368, drop-shadow 8, gradient fills on controls 22.
  - Overlays: floater max layers 8.
  - These are glass rows, and the counts move with route state (pass 9 read 339 and 17; pass 8 read 367 and 22), so this pass claims nothing about them.
- **Consumer:**
  - Computed: 0 multi-layer, 0 inset highlights, 0 drop-shadows, 0 control gradients, looping 0.
  - Static: 17 box-shadow declarations, unchanged.
- Overlay paint-top failures: 0.

**Frames.** Headless real Chrome (§0ei), on :9000, served by `vite --port 9000` with `VITE_API_URL` set same-origin (the e2e webServer's env).
- A first capture ran without that variable. The app's dev-misconfigured banner showed and Browse could not load, so every cell was re-captured on the corrected server. Only the corrected set is committed.
- The server serves the working tree, so other seats' uncommitted hunks show in the frames.
- 36/36 route frames.
- 8 opened-overlay frames.
- 16 V10 probe cells.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1214/1221 ×2, with the **same 7** standing failures (diffed against pass 9: ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6). None is in this diff.
- **e2e** (headless, workers 1, own server :9190). **A strict ×2 GREEN.**
  - smoke: pass 9's 12 specs plus `views/mix.spec.ts` and `scene-action-contract.spec.ts`, 65/65 ×2.
  - smoke-admin: `admin-populated.spec.ts`, 3/3 ×2.
- No visual golden was re-baselined.

**For the next critic.**
- Judge whether the seat-weight rules (0.08) now read too faint against the cream card in light at 390, where the Gradient sections sit close together.
- The `--card-edge` perimeter set: card outline, wells, code paper, the easing rows and the stop rail's inset ring.
- The glass rows wait on O-87 / O-88.

### pass 11 (2026-10-16): critic V11 — the dead hover-lift lighting tokens

The workflow dispatched this seat as "pass 11" with critic V11's single row. The critic found nothing above trivial. Evidence is in `pass-11/`.

**Commits.** value.js `1e03023ea` (the cure) and `cd1024b18` (frames, probe, census, gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-11/`) |
|---|---|---|---|
| V11-T1 (trivial) | **Cured, by deletion.** | `foundation.css`: the `--shadow-card-hover` alias is deleted in both places (`@theme` and light `:root`), along with both value.js `--shadow-cartoon-hover` overrides (the light and dark 10px stamps). Glass's own `--shadow-cartoon-hover` default is glass's and is left alone (read-only). `animations.css`: the stage's `overflow-clip-margin: 10px` comment now budgets for `--shadow-cartoon`'s 8px reach, which leaves a 2px margin; the value is unchanged. `demo/DESIGN.md` no longer documents the dead rung (§ Depth law 3, § Shadows, the `:root` override list). Nothing was added. | `probe-v11.json`, light and dark at 1440. The root `--shadow-card-hover` computes empty. `--shadow-cartoon` and `--shadow-card` still compute value's 8px stamp. 32 hovers ran across the pane plates, Browse and Palettes cards, the swatches and the hero; 0 of them changed `box-shadow`. Frames `hover-picker-1440-*`. |

**Remaining trivial refinement.** Nothing beyond V11-T1 was named, so no further density, border or tone change was made. Adding one would have been invention, not cure.

**Census** (`census-after.json`, `--base :9011 --widths 1440 --themes light,dark --settle 15000`, guarded).
- **Verdict RED, on glass rows only (O-87).** These counts are byte-identical to pass 10:
  - routes: max 6 layers, inset highlights 368, drop-shadow 8, gradient fills on controls 22;
  - overlays: floater max layers 8.
- **Consumer:**
  - static lighting-token definitions fall from **4 to 2**; the two left are `--shadow-cartoon`, light and dark;
  - every other static total is unchanged, including 17 box-shadow declarations;
  - computed is unchanged, as expected from deleting tokens that never painted.
- Overlay cells: 8, with 0 paint-top failures and 0 errors.

**Frames.** Headless real Chrome (§0ei), served by `vite --port 9011 --strictPort` with `VITE_API_URL` set same-origin and its own deps cache.
- Port :9000 was held by another process, so this seat used its own port and stopped the server afterwards.
- The server serves the working tree, so other seats' uncommitted hunks show in the frames.
- Counts: 36 of 36 route frames, 8 opened-overlay frames and 2 hover cells.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1214/1221 ×2, with the **same 7** standing failures as pass 10 (ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6). None is in this diff.
- **e2e** (headless, workers 1, own server :9190), **strict ×2 GREEN.** `foundation.css` is global, so pass 10's whole set was re-run:
  - smoke, 14 specs: 65/65 ×2;
  - smoke-admin: 3/3 ×2.
- No visual golden was re-baselined.

**For the next critic.**
- The consumer's lighting vocabulary is now one stamp, `--shadow-cartoon` (8px), routed to `--shadow-card`. Judge whether the plate stamp's weight in dark (50 % mix) still reads as the pre-glass era's tone.
- The glass rows still wait on O-87 / O-88.

### pass 12 (2026-10-16): critic V12 — the dark stamp's register again, and the glass rows

The workflow dispatched this seat as "pass 12" with critic V12's two rows. Neither row is a seat's cure: one is an owner ruling and one is owned by glass. **No source changed.** Evidence is in `pass-12/`.

**Commits.** value.js `780401800` (frames, the stamp sample, census and gates). This receipt is committed after it.

| id | verdict | cure / reason | measured (`pass-12/`) |
|---|---|---|---|
| V12-01 (low) | **Not a seat's cure: owner DESIGN-RULING (P6-B1).** This is the same row as VC6-04, sighted again, and the critic's own cure says to bank it. | The dark stamp is Pole A of the P6-B1 register bracket (`foundation.css`, `.dark --shadow-color` stone ink at a 50 % `--shadow-cartoon` mix). T.W8 P6-R1 pinned the stone to retire the cream slab that the owner had sighted. The other pole is the original's lighter grey offset, already framed at pass 6 (`pass-06/vc6-2026-10-15/poles-{A,B}-picker-1440-dark.png`). If the owner rules for the original's tone, the only knob is `.dark --shadow-color`: a mid slate step, for example about 35–40 % foreground on stone. It keeps one layer, zero blur and no producer fork. A seat may not pick the register, so nothing ships. | `stamp-sample.json` (`stamp-sample.py`; picker 1440 dark; the 8px band past the left plate's bottom and the About plate's right edge, against the field just beyond). **Today (Pole A)** the stamp is rgb(56,23,32) over rgb(92,22,42), **1.22:1**, and rgb(60,23,30) over rgb(98,22,38), **1.25:1**. That is identical to pass 11 and the pass 6 Pole A frame. **Pole B** is rgb(74,72,70) over the same fields, **1.43:1 / 1.41:1**. Pole B also leaves the wine hue for a neutral grey, so it separates by hue as well as by contrast. The critic's reading holds: today the stamp is a darker band in the field, not an ink stamp. |
| V12-G1 (low) | **Glass-owned: honest-RED, cited against O-87 FLAT-LIGHTING and O-88 DOCK-COLLAPSE-MOTION.** No local override. | The rows are the 390 dock lozenge's spill, the dock folding to its seal when a menu opens, the hero bead glowing through the view and card menus, the colour-space select's 9-layer stack and gradient wash, the hero bead's specular body and double drop, and the disabled Mix primary's tan plate. All were already relayed (V7R-02, V8C-03, V8C-04, P4R-02, P4R-03, P9R-G1, P9R-G2, P9R-G3, P5C-01, VC3-02). They are re-judged at the glass 10.2.0 repin. | The census's glass rows are unchanged (below). In the overlays, the select floater still carries 8 layers (`overlays.json`, `div[select-content]`) with paint-top passing on every cell. |

**Census** (`census-after.json`, `--base :9011 --widths 1440 --themes light,dark --settle 15000`, guarded).
- **Verdict RED, on glass rows only (O-87).** The gate is byte-identical to pass 11: max 6 layers, 368 inset highlights, 8 drop-shadows, 22 gradient fills on controls, and floater max layers 8.
- **Consumer static totals are identical to pass 11:** 17 box-shadow declarations and 2 lighting-token definitions (`--shadow-cartoon`, light and dark).

**Frames.** Headless real Chrome (§0ei), served by `vite --port 9011 --strictPort` (same-origin `VITE_API_URL`, its own deps cache) and stopped afterwards.
- Counts: 36 of 36 route frames, and 8 opened-overlay frames with 0 paint-top failures.
- The server serves the working tree, so other seats' uncommitted hunks show in the frames.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1214/1221 ×2, with the **same 7** standing failures as pass 11 (ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6).
- **e2e:** pass 11's set was re-run as a no-change control (headless, workers 1, own server :9190), **strict ×2 GREEN**:
  - smoke, 14 specs: 65/65 ×2;
  - smoke-admin: 3/3 ×2.
- No visual golden was re-baselined.

**Loop state.**
- This is pass 12, the X-DS floor. Its critic found nothing that a consumer seat may cure: one owner ruling and the standing glass rows.
- The open owner rulings are P5C-02 (P5-B1), VC6-04 / V12-01 (P6-B1, the dark stamp's register; one knob, both poles framed and measured), VC5-01 and VC4-09.
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin.

### pass 13 (2026-10-16): critic V13 — the dock's slug field, and two glass rows

The critic named one consumer row and two glass rows. The consumer row is cured at the token seat. Evidence is in `pass-13/`.

**Commits.** value.js `973ae490e` (the cure in `demo/styles/shell.css`, plus frames, the login probe, census and gates). This receipt is committed after it.

| id | verdict | cure / reason | measured (`pass-13/`) |
|---|---|---|---|
| V13-01 (low) | **CURED at the token seat.** | V5C-05 ("fields on glass stay glass") re-seated glass's `--input-on-glass` to `--well-bg` only on `.pane-wrapper, .glass-floating`. The dock is a glass host in neither list, so its login layer's slug field fell back to glass's opaque cream paper ground. `.glass-dock` now joins the same rule in `shell.css`. That is one selector: it adds no wrapper and no counter-style, and it leaves glass's lighting untouched. | `login.json` (`login.mjs`, headless real Chrome). At 1440 and 390, light and dark, the field's fill equals the Browse search pill's **4/4**. Light is `oklab(0.216 0.004 0.005 / 0.08)`; dark is `oklab(0.925 0.002 0.006 / 0.08)`. Before, it was opaque rgb(243,236,226) / rgb(63,55,49). Frames: `login-{1440,390}-{light,dark}.png`. |
| V13-02 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING** as an ink-rung addendum. No local override. | Glass's dock adaptive-legibility rule (`:where(.glass-dock){--muted-foreground: contrast-color(var(--card))}`) collapses the muted rung onto the contrast pole. The field's `::placeholder` therefore paints at full ink, which is louder than a typed value. The ask: the dock's muted rung should stay a step toward the ground, or the placeholder should take its own rung. This waits on the 10.2.0 repin. | `login.json`: the placeholder is rgb(0,0,0) in light and rgb(255,255,255) in dark; the typed ink is rgb(28,25,23) / rgb(233,230,226). |
| V13-T1 (trivial) | **Glass-owned (O-87 menu refinement).** There is no consumer cure. | In light, glass's unchecked `DropdownMenuCheckboxItem` draws an empty indicator slot. A local glyph would bring back the retired sun/moon idiom (UIA-V-254/268). | `overflow-menu-390-light.png` is unchanged. |

**Census** (`census-after.json` plus `census-after-supplement.json`, `--base :9011 --widths 1440 --themes light,dark --settle 15000`, guarded).
- **Verdict RED, on glass rows only (O-87).** This is identical to pass 12 on all 18 route cells and the 8 overlay cells: max 6 layers, 368 inset highlights, 8 drop-shadows, 22 gradient fills on controls, and floater max layers 8. Consumer static totals are unchanged: 17 box-shadow declarations and 2 lighting-token definitions.
- **Run 1 is void** (`census-after-run1-underloaded.json`). At a 1-minute load of about 15, five light cells and two dark cells were read before their panes mounted: 4451 elements against 5304, and 10 loading spinners.
- **Run 2** read 16 of the 18 cells identical to pass 12, then timed out on `goto` for `/#/` and `/#/palettes` light. The supplement re-read those two cells, and both are identical to pass 12.

**Frames.** Headless real Chrome (§0ei), served by `vite --port 9011 --strictPort` (same-origin `VITE_API_URL`, its own deps cache) and stopped afterwards.
- Counts: 36 of 36 route frames, 8 opened-overlay frames with 0 paint-top failures, and 4 login-layer frames.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1214/1221 ×2, with the **same 7** standing failures as pass 12.
- **e2e** (headless, workers 1, own server :9190), **strict ×2 GREEN.** Pass 12's set was re-run, plus the specs that drive the dock login layer (`w12-dock`, `flows/login-register`, `admin/a11y-authed-user`):
  - smoke, 16 specs: 72/72 ×2;
  - smoke-admin: 5/5 ×2.
- No visual golden was re-baselined.

**Loop state.**
- Pass 13 found one consumer row (cured) and two glass rows (V13-02 and V13-T1, cited on O-87).
- The open owner rulings are unchanged: P5C-02, VC6-04 / V12-01, VC5-01 and VC4-09.
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin.

### pass 14 (2026-10-16): critic V14 — the orphaned V9C hunks, the unframed featured and admin cells, the doc's dead idioms, one button grammar

The critic named three consumer rows, one trivial doc row and the standing glass rows. Every consumer row is cured; the glass row gains one O-87 addendum. Evidence is in `pass-14/`.

**Commits.** value.js `e78a7fc5a` (V14-01, the V9C adoption), `5ca07270e` (V14-T2, V14-T1, V14-02) and `f6ee033cd` (frames, probes, census and gates). The V14-G1 addendum to `relay/X-ALL-BK-FLAT-LIGHTING.md` was committed inside the fourier seat's `0fc21ba29`, which committed that file whole while this seat's addendum stood in it; the text is this seat's and it is on HEAD. This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-14/`) |
|---|---|---|---|
| V14-01 (medium) | **CURED: the V9C rows adopted by id.** | The dead pass-9 seat's 10 modified demo files and 1 untracked test (X-W12U.md Act 4's orphan list) are committed whole as they stood. V9C-01: the dock's view glyph paints over the wax. V9C-03: the featured badge drops glass `.gold-shimmer` and is flat gold ink, which removes HEAD's one live idle loop. V9C-04: the idle Extract instrument loses its fake name and count slabs. V9C-05: Mix's Selected tray leaves `.dashed-well` for the bare-section grammar. V9C-06: the image actions sit under the drop zone, and their contract moves whole to `extract-image-actions.test.ts`. V9C-07: a `fill` swatch size lets Generate's result share the plate's width. V9C-02 and V9C-08 had already landed at `3f79672a6`. Each hunk was read against the canon before adoption; none adds a wrapper or a counter-style. | The dead seat's failing rows (`palette-card-layout`, `plate-mass`: hook timeouts under load) plus `demo/test/extract`: **36/36 ×2** (`gates/v9c-rows-run{1,2}.txt`). The frames are taken from a demo tree equal to committed HEAD `5ca07270e`: `tree-before.txt` shows an empty `git status -- demo`, and `tree-after.txt` shows that another seat's `demo/color-session/*` hunks arrived at 20:23:12, after the last reading at 20:18:50. In the frames, Extract's actions sit under the zone (`extract-*`), Generate's swatches span the plate (`generate-*`), and the Mix tray has no well (`mix-*`). |
| V14-02 (low) | **CURED.** | The e2e browse fixture's first row (`e2e/smoke/fixtures/browse-palettes.ts`) is tier `featured`, and so are the pass harness's Neon Arcade and the census fixture's first row. The census route cells now install the same in-page `/palettes` shim as its overlay cells, so `/#/browse` is read on cards (91 → 136 elements per cell). A new probe, `v14.mjs`, frames the featured wall and one authed admin cell: the token is seeded the same way as in e2e `admin-auth`, and `/admin/*` is answered in-page. | `v14.json`. Featured badge, all 4 cells: **0 running animations**, `background-image: none`, flat gold ink `oklch(0.751 0.147 84.2)` in light and `oklch(0.784 0.143 86)` in dark (`featured-{1440,390}-{light,dark}.png`). Admin cell: the dock's gold admin ink runs **0 animations** in all 4 cells (`admin-users-*.png`). The admin view menu is framed at 1440 (`admin-view-menu-1440-*.png`); in admin mode it lists the admin views, so it shows no "Admin" entry. |
| V14-T1 (trivial) | **CURED.** | `demo/DESIGN.md`: the `golden-text-shimmer` KEEP row and its use as the cubic-bezier exemplar are deleted. The glass `--shadow-cartoon-sm/md/lg` chip-rung mentions are deleted at :104, :153, law 2 and :194, since no demo consumer remains. | `grep -rn "shadow-cartoon-(sm\|md\|lg)" demo` finds only a historical comment in `PaletteInspector.vue`. |
| V14-T2 (trivial) | **CURED.** | `PaletteCardSwatches.vue`: the hover card's Add / Edit / Copy are glass `Button icon-only emphasis="quiet" size="sm"`, the same as the slug copy beside them. The local hover, active-scale and ring classes are deleted, and no wrapper is added. The aria-labels are unchanged, so the format-color census rows B5–B7 hold. | e2e `w12-dock` (it drives `Edit color …`) passes ×2. |
| V14-G1 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING and O-88.** No local override. | The rows already relayed stand: the dock lozenge and its fold, the hero bead, the select stack, the Mix primary and V13-02. **New O-87 addendum (V14-G1):** glass `Input` keeps its own `backdrop-filter` inside a glass host. The ask is that a field on glass drops it, just as `--input-on-glass` drops its ground. These rows are re-judged at the 10.2.0 repin. | `login.json`: the dock slug field computes `blur(20px) saturate(1.5)` at 1440 and `blur(14px)` at 390, inside the blurred dock. Its fill still matches the Browse pill in 4 of 4 cells. |

**Census** (`census-after.json`, `--base :9011 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded; one run, 18 of 18 route cells and 8 of 8 overlay cells, with no errors).
- **Verdict RED, on glass rows only (O-87).** Max 6 layers, 368 inset highlights, 8 drop-shadows, 22 gradient fills on controls, floater max layers 8 and no paint-top failures. These match the combined pass-13 reading.
- **Consumer:** looping animations 0. The static totals are unchanged: 17 box-shadow declarations and 2 lighting-token definitions.
- The Browse cells now hold the featured card. The census cannot see the badge's old loop because it is gone, so the loop-free reading is confirmed directly by `v14.json`.

**Frames.** Headless real Chrome (§0ei), served by `vite --port 9011 --strictPort` (same-origin `VITE_API_URL`, its own deps cache).
- Counts: 36 of 36 route frames, 8 overlay frames, 4 login frames, 4 featured frames, 4 admin frames and 2 admin-menu frames.
- After the readings the server hung (95 % CPU). It was force-stopped, and nothing from this seat is left running.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1214/1221 ×2, with the **same 7** standing failures as pass 13.
- **e2e** (headless, workers 1, own server :9190), **strict ×2 GREEN**:
  - smoke, 20 specs: 95/95 ×2. That is pass 13's 16, plus `crash-battery`, `browse-loading`, `o20-generate-plate` and `o9-shadow-palette`.
  - smoke-admin: 5/5 ×2.
- No visual golden was re-baselined.

**Loop state.**
- Pass 14 cured every consumer row. It adopted the week-old V9C orphan set, so HEAD now ships what the frames show.
- The open owner rulings are unchanged: P5C-02, VC6-04 / V12-01, VC5-01 and VC4-09.
- The glass rows, now including V14-G1, wait on O-87 / O-88 at the 10.2.0 repin.

### pass 15 (2026-10-16): critic V15 — the featured badge's gold, the admin count chips, two verb voices, "Audit Log"

The critic named one medium and three low consumer rows, one trivial row, one row homed to X-W10 and the standing glass rows. Every consumer row the seat owns is cured. V15-04 stays with X-W10 by id, and the glass rows stay honest-RED. Evidence is in `pass-15/`.

**Commits.** value.js `c8132a9b1` (the cure, 21 paths) and `38e0878fc` (frames, probes, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-15/`) |
|---|---|---|---|
| V15-01 (medium) | **CURED.** | A new root token, `--ink-gold`, carries the gold. `useContrastSafeColor` takes `--color-gold` (the scheme's arm of glass's `light-dark()` pair) and certifies it with `certifyAccentInk` against the resting plate, the referent `--ink-primary` uses. The hue is kept and only the lightness walks. `useAtmosphereBoot` stamps the token, and `foundation.css` gives it the raw gold as its pre-boot value. The badge's glyph paints `--ink-gold`, which is a bronze `oklch(0.370 0.076 84.2)` in light and the unchanged gold in dark. The word "Featured" reads in the plate's own ink. The dead `border-gold` class and the `.featured-badge { border-color; color }` rule are deleted, and the comment now says the ring is glass's outline ring. The glyph is certified at the text floor even though its own floor is 3:1: at the graphics floor the frame read 2.64:1, because the modelled plate is lighter than the aurora patch under the card. **Enrolled:** a new o18 row, "the featured badge", checks label ≥ 4.5, glyph ≥ 3, glyph hue within 20° of gold and C > 0.04. It was born-RED in light (1.26:1) and is GREEN ×2. `DESIGN.md`'s gold entry names `--ink-gold` as the candidate for X-W10's O18-1296. | `v15.json`, pixels read off each frame: **glyph 3.45:1 (1440) and 3.58:1 (390) in light**, 5.01:1 and 4.90:1 in dark. Pass 14 read 1.75:1 in light. The badge runs 0 animations. **Residual, stated plainly:** in light the label reads 4.18:1 on the pink patch at rgb(200,78,140), a mid-luminance plate where no ink reaches 5:1. This is the plate ink `--ink-primary`, which the card name "Neon Arcade" also wears; the o18 census, which reads the model ground, measures ≥ 4.5. It is a gap in the house plate-ink referent: the ambient mean versus the local aurora under a card. The next critic should judge it there, not as a badge row. |
| V15-02 (low) | **CURED.** | AdminPane's title count chip and its `adminCount` computed are deleted. Each count is now said once, where its list speaks: the users toolbar's "N users", and the names tabs' "Pending · N" and "Approved · N". Each user row's count is the specimen's idiom: `text-mono-small tabular-nums text-muted-foreground`, titled "N palette(s)". No wrapper was added. | `v15.json`, all 4 admin cells: 0 title chips, row counts `1`/`2` titled "1 palette"/"2 palettes" in muted ink, toolbar "2 users" (`admin-users-*.png`). |
| V15-03 (low) | **CURED: the law is held.** | Ruling: DESIGN.md's three-voice law stands ("Never on body/control text"). A labelled glass Button is control text, so it speaks the body sans. The house had ~40 sans verbs and 17 Fraunces ones, so holding the law is the smaller and truer convergence; the critic's count of "4 sans sites" missed most of the sans buttons. `font-display` comes off the 17 Buttons: Regenerate, Mix, Prune empty, Refresh, Delete all palettes, the admin row action at :210, every Retry, Clear search and filters, Load more, and Reload the app. DESIGN.md now states the ruling. `demo/test/shell/button-voice.test.ts` parses every demo SFC that imports glass `Button` and fails on any labelled Button carrying a family utility. It was born-RED with the 17 sites and is GREEN now. | Frames `generate-*`, `mix-*` and `admin-users-*`: the verbs are in Plus Jakarta. e2e `o10d-display-voice-census`, `o10-type-locks` and `o10d-admin-title-voice` pass ×2. |
| V15-04 (low) | **Not cured here: X-W10's O18-1296, homed by id** (W10-ADDENDUM-2026-10-16-cprime §1, rows 3–4). | The dock's raw-gold admin ink is unchanged. X-W10's candidate is now in the tree as `--ink-gold`, a single resolver, so the app can end up with one gold-ink answer. | `admin-users-1440-light.png`: the "admin" label is still faint gold on the dock. |
| V15-05 (trivial) | **CURED.** | "Audit log" at `viewSchema.ts:248` and `AdminPane.vue`. The two e2e heading strings that named it (`admin-walk`, `route-guard`) were updated to match; the matcher is unchanged. | `v15.json` admin menu: Users, Names, Audit log, Flagged, Tags, Atmosphere, Blob, Back to app. |
| V15-G1 (low) | **Glass-owned: honest-RED on O-87 FLAT-LIGHTING and O-88 DOCK-COLLAPSE-MOTION.** No local override. | Unchanged rows, re-judged at the glass 10.2.0 repin. | The census glass rows are unchanged (below). |

**Census** (`census-after.json`, `--base :9011 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded; 18 of 18 route cells, no page errors).
- **Verdict RED, on glass rows only (O-87).** Max 6 layers, 368 inset highlights, 8 drop-shadows, 22 gradient fills on controls and floater max layers 8 (`overlays.json`, no paint-top failures). These are identical to pass 14.
- **Consumer:** looping animations 0. The static totals are unchanged: 17 box-shadow declarations and 2 lighting-token definitions.

**Frames.** Headless real Chrome (§0ei), served by `vite --port 9011 --strictPort`. Counts: 36 of 36 route frames, 8 overlay frames, 4 login frames, 4 featured frames, 4 admin frames and 2 admin-menu frames. The demo tree was equal to `c8132a9b1` (`tree-before.txt`, `tree-after.txt`). The server was stopped, and nothing from this seat is left running.

**Gates** (`gates/README.txt`).
- Type-check: 0 ×2.
- vitest: 1221/1228 ×2, with the same 7 standing failures as passes 13–14.
- e2e strict ×2 GREEN:
  - smoke, 22 specs: 107/107 ×2;
  - smoke-admin, 7 specs: 16/16 ×2.
- No visual golden was re-baselined.

**Loop state.**
- Pass 15 cured every consumer row it owns.
- One residual is stated for the next critic: the plate ink's pixel reading on a mid-luminance aurora patch (4.18:1). It is the house referent's gap, not a badge row.
- O18-1296 (V15-04) stays with X-W10, with `--ink-gold` as its candidate.
- The open owner rulings are unchanged: P5C-02, VC6-04 / V12-01, VC5-01 and VC4-09.
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin.

### pass 16 (2026-10-16): critic V16 — the first opened dialogs, the admin caps register, one count idiom, one dialog-title voice

The critic named one high, one medium and five low consumer rows, one trivial row, one row that stays with an owner ruling, and the standing glass rows. Every consumer row is cured. V16-07 stays with the owner's V2C-15 ruling, and the glass rows (now with two pass-16 addenda) stay honest-RED. Evidence is in `pass-16/`.

**Commits.** value.js `abfeb8a39` (the cure, 21 paths, including the O-87 addendum) and `80f613056` (frames, probes, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-16/`) |
|---|---|---|---|
| V16-01 (high) | **CURED at the token seat.** | The ink resolver gains a **modal** referent. It is the floating plate over glass's scrim (`--overlay-scrim`) over the ambient, read from the live recipes, with the static model as fallback (`ink.ts` `"modal"`, `useContrastSafeColor` `modalL`). The boot writer stamps `--ink-modal-primary`, `--ink-modal-muted` and `--ink-modal-destructive`, which keeps the red's hue and walks only its lightness. `useViewAccents` stamps `--ink-modal-accent` and its on-fill ink `--ink-modal-accent-fg`, so Cancel, which paints `--primary`, is certified too. `shell.css` seats them all on `.glass-floating[role="dialog"]`, beside V5C-02. That is one selector and adds no wrapper. It also sets `color: var(--foreground)`, because the modal root declared no ink and its title and labels inherited the page body's ink. It changes colour only; glass's plate, blur and scrim are untouched. Surfaces stay `surface="glass"`. The users confirm's slug pill reads the modal ink, not the resting-plate accent. **Enrolled:** a new pixel row, `e2e/smoke/admin/o18-modal-ink.spec.ts`, checks the confirm's title, body and Cancel, and the Report dialog's title, body, every reason and Cancel, at ≥ 4.5:1 read off the frame. It was born-RED in light (2.19:1, 2.09:1) and is GREEN ×2. | `v16.json`, pixels: **light** confirm title 7.15–7.37, body 7.29–7.90, slug 7.39–7.57, Cancel 6.39–7.32, Delete 5.39–5.68. Report title 7.37–7.40, reasons 7.09–8.20, placeholder 9.1–9.3, Cancel 6.26–7.86. Before, these read 1.07–2.17. **Dark** holds 10–14 on text. **Residual, stated plainly:** in dark the destructive verb reads **4.14–4.54:1**. Glass's `secondary` destructive button lays a ~26 % tint of its own red under the red ink. The ink is certified against the plate, not the tint, so this is relayed as V16-G1's second half. The disabled Report verb (2.7–4.1) is exempt as a disabled control. Frames: `admin-confirm-*`, `report-*`. |
| V16-02 (medium) | **CURED.** | Six sites move from `text-mono-caption` to `text-mono-small`: the flagged owner slug, the reason chips, the date (with tabular-nums), the "palette deleted" note (inline small-caps and `tracking-wide` deleted) and the audit action chips. The flagged owner is a plain muted mono slug. **Enrolled:** a leg of `button-voice.test.ts` fails on `text-mono-caption`, `uppercase`, `small-caps` or caps tracking in any admin template, with comments blanked first. It was born-RED and is GREEN. | `v16.json`, all 4 cells: every admin mono string has `text-transform: none`, `letter-spacing: normal` and `font-variant-caps: normal`, and 0 `text-mono-caption` remain. `crimson-owl-77`, `palette.feature` and `Jul 4` render as stored (`admin-flagged-*`, `admin-audit-*`). |
| V16-03 (low) | **CURED.** | The destructive Badge comes off the count. The count is now the one count idiom: `text-mono-small tabular-nums text-muted-foreground`, titled "N report(s)". Red stays only on the delete glyph's hover and focus. | The counts `2` and `1` are muted ink with no fill, titled "2 reports" and "1 report". |
| V16-04 (low) | **CURED (consumer half); glass half relayed.** | `font-display` comes off the Names `SegmentedTabs`, so the strip speaks the sans, as Mix's does. **Enrolled:** a `button-voice.test.ts` leg fails on a family utility on glass `SegmentedTabs`/`Tabs`. It was born-RED. **The overhang survives the face change.** The empty list reads indicator 235.8–275.5 against track 226.6–269.2, identical to the critic's Fraunces reading, from inline `height: 39.76px; translate: 4.04px 9.19px` against a 34.6 px tab. The populated list reads 230.7–282.4. So the overhang was never the face: it is glass's JS indicator measurement. It is relayed as an O-87 addendum, with no local override. | `v16.json` names: family Plus Jakarta Sans, labels "Pending · 2" / "Approved · 0" (`admin-names-*`). |
| V16-05 (low) | **CURED.** | The audit toolbar's count and Refresh are now one `ms-auto` non-wrapping cluster, the shape of the Flagged and Tags headers. The spacer is deleted. The entry's meta line wraps (`flex-wrap`), and the actor clause is no longer truncated. | 390: the filters fill line 1, and "3 entries" sits with Refresh at the right of line 2 (count x 245, Refresh x 329, same row). 1440 is unchanged (beside the filters). All actor clauses read whole, none clipped (`admin-audit-390-*`). |
| V16-06 (low) | **CURED.** | Ruling: the house's title surfaces speak the display register (O-10d gated title surfaces, T.W4-6), so every `DialogTitle` takes `font-display font-medium`. That adds 7 confirm titles to the 3 that already had it. It is written as "Report palette" (the o10d string updated). `DESIGN.md` states the ruling, and a `button-voice.test.ts` leg holds it. It was born-RED. | Fraunces titles on `admin-confirm-*` and `report-*`. |
| V16-07 (low) | **Not cured: it stays with the owner's V2C-15 ruling.** | Nothing for a seat to cure. Frames are attached for the banked ask. | `admin-users-{1440,390}-{light,dark}.png`. |
| V16-08 (trivial) | **CURED.** | The admin tag chip takes the card chip's recipe (borderless, `bg-muted/60`, `text-micro`, muted ink) and keeps its remove ×. The parse-echo space label drops `uppercase tracking-[0.14em]` and keeps its `--ink-muted`. The rail tooltip range moves to `text-mono-small text-muted-foreground`, the floater's certified muted ink, with no case transform. | `v16.json` tags: border 0, `bg-muted/60`, sans 11 px (`admin-tags-*`). |
| V16-G1 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING and O-88.** No local override. | The standing rows are unchanged. **New O-87 addenda (pass 16):** (a) in light, the modal plate at α 0.18 over a 50 % ink scrim composites dark; ask glass for a light ground in the light scheme, plus the destructive verb's own-tint contrast cost. (b) The SegmentedTabs indicator's geometry. Both are re-judged at the 10.2.0 repin. | The census glass rows are unchanged (below). |

**Census** (`census-after.json`, `--base :9011 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded; 18 of 18 route cells, no errors).
- **Verdict RED, on glass rows only (O-87).** Max 6 layers, 368 inset highlights, 8 drop-shadows, 22 gradient fills on controls and floater max layers 8 (`overlays.json`, no paint-top failures). These are identical to pass 15.
- **Consumer:** looping animations 0. The static totals are unchanged: 17 box-shadow declarations and 2 lighting-token definitions.

**Frames.** Headless real Chrome (§0ei), served by `vite --port 9011 --strictPort`.
- Counts: 36 of 36 route frames, 8 overlay frames and 4 login frames.
- V16 frames: 8 opened-dialog frames (`admin-confirm-*`, `report-*`) and 20 admin frames (users, flagged, audit, names and tags × 4 cells).
- The server was stopped, and nothing from this seat is left running.

**Gates** (`gates/README.txt`).
- Type-check: 0 ×2.
- vitest: 1227/1234 ×2, with the same 7 standing failures as passes 13–15.
- e2e:
  - smoke-admin, 8 specs (pass 15's 7 plus `o18-modal-ink`): **20/20 ×2**.
  - smoke, 24 specs (pass 15's 22 plus `o18-contrast-census` and `w7-destructive-seats`, because the ink resolver changed): **138 passed ×2**, with the same 6 failed ×2. All 6 are the standing class (c′) o18 cells homed by id to X-W10 (W10-ADDENDUM-2026-10-16-cprime §1, rows 1–6). None reads a changed surface.
  - Pass 15's set is strict GREEN ×2.
- No visual golden was re-baselined.

**Loop state.**
- Pass 16 cured every consumer row it owns. It opened dialogs for the first time, and the modal ground is now in the house's ink model.
- Two residuals are stated for the next critic, both glass-material:
  - the dark destructive verb's own-tint contrast (4.14–4.54);
  - the SegmentedTabs indicator overhang.
- The open owner rulings are unchanged: P5C-02, VC6-04 / V12-01, VC5-01, VC4-09 and V2C-15 (V16-07).
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin.

### pass 4 (re-dispatch, 2026-10-16/17): critic P4R again — already cured at `f7a21f95a` / `7de5c708e`; re-read at HEAD, no source change

The workflow dispatched this seat as "pass 4" with critic P4R's rows **P4R-01..05** a second time. Those rows were cured at `f7a21f95a` (the first "pass 4 (re-dispatch, 2026-10-15/16)" receipt above), and P5C-03 (`7de5c708e`) refined P4R-04's ghost into an outline since. This seat read the tree and the served app at HEAD `8e12bce41`. Every cure still stands, so it changed **no source file**. Evidence is in `pass-04/redispatch-2026-10-16/`.

**Commit.** value.js `fe3a6062a` (probe, frames, crops, census and gates). This receipt is committed after it.

| id | state at HEAD | measured (`probe-p4r-reread.json`, headless real Chrome, §0ei) |
|---|---|---|
| P4R-01 | **The rainbow stands.** The max-chroma solve, the ±60° fan and the OKLCh recipe are unchanged (`palettes-ramp.ts`; `1c04f8c68` only re-pointed an import). **But the 3:1 floor is now missed in dark, measured on real pixels.** | The stops are byte-identical to pass 4. Light: L 0.40/0.39/0.37, C 0.20/0.16/0.08, **3.51–3.75:1**. Dark: L 0.66/0.66/0.64, C 0.24/0.23/0.14, violet to pink to orange (`crops/palettes-title-*`, `palettes-1440-dark.png`). **Dark contrast against the sampled plate under the title is 2.65–2.82:1**; pass 4 read 3.04–3.30. The stops did not move. The composited plate did: rgb 129/12/14 → 137/32/30 at 1440 and 119/12/23 → 128/33/38 at 390. Two probe runs agree to ±0.01. The layer stack under the title is the resting card (dark: `srgb .093 .050 .009 / 0.18`, no backdrop filter) over the body gradient and aurora. The stops are certified against a model ground (the resting tint over `derivedLightness`, the **mean** OKLab L of the aurora palette) with ×1.25 headroom. The title sits over a field region lighter than that mean, so the margin is consumed. **Not cured here, and no fudge:** raising the title's headroom alone would make the title site diverge from the house's one referent. The root is the D6 referent being a field mean rather than the local field under the text. That is an ink-model unit (it touches every certified ink on a moving aurora), and it is stated for the next critic and the orchestrator as **P4R-01-R (residual)**. The o14 title-ramp oracle (certified against the model) is GREEN ×2. |
| P4R-02 | Held, glass-owned (O-87): the body voice's word space. No local word-spacing. | The critic's numbers stand (0.169 em space). |
| P4R-03 | Held, glass-owned (O-87 single-edge refinement): the quiet-rest title field register. Honest-RED, no hand-rolled input. | — |
| P4R-04 | **Cured and standing** (and refined by P5C-03). | All 4 cells: the ghost cells are transparent, an outline with 1 px seams (`crops/extract-card-after-*`). The "Upload image" verb is foreground ink (dark L 0.925, the same as the "Colors" label) and the glyph is plate-ink (L 0.713). The `crops/extract-card-before-*` pair re-injects the old pole and ink for comparison. |
| P4R-05 | Not cured: an optional judgement call, held for the owner or a later critic (unchanged). | — |

**Census** (`census-after.json`, `--base :9213 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87):** max 6 layers, 368 inset highlights, 8 drop-shadows, 22 gradient fills on controls, floater max layers 8 (0 paint-top failures).
- **Consumer:** looping animations 0.
- Identical to pass 16.

**Frames.** 36/36 route frames (9 routes × light/dark × 1440/390; `capture.mjs`, headless real Chrome, 0 failed), plus `crops/`. They were served by `vite --port 9213` with `VITE_API_URL`, so Browse is shot on the in-page fixture. The server was stopped afterwards.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1227/1234 ×2, with the same 7 standing failures (ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6).
- **e2e** (smoke, headless, workers 1, own server :9214; pass 4's P4R set: o14-preview-truth, o9-shadow-palette, browse-loading, crash-battery, walk): **29/29 ×2**, strict GREEN.
- No visual golden was re-baselined.

**For the orchestrator.**
- This dispatch's rows were stale by twelve passes. The next value seat needs a fresh critic at HEAD, not P4R's rows.
- **P4R-01-R** is new and measured: in dark the Palettes title clears 2.65–2.82:1 on real pixels, against its 3:1 floor. Its root is the ink model's mean-ambient referent, not the ramp. It needs either an ink-model unit (certify display ink against the local, or brightest, field under its site) or an owner call on the margin.
- P4R-02 and P4R-03 wait on glass (O-87). P4R-05 and the open owner rulings (P5C-02, VC6-04 / V12-01, VC5-01, VC4-09, V2C-15) are unchanged.

### pass 5 (2026-10-17): critic VP5 — the config fold lands on a row, Mix's empty Palettes tab speaks once, the menu strapline goes

The critic named three low consumer rows, one trivial consumer row, one glass row (the scrubber's resting thumb) and the standing glass rows. Every consumer row is cured. The glass rows stay honest-RED on O-87 / O-88. Evidence is in `pass-05/vp5-2026-10-17/`.

**Commits.** value.js `3d73afb54` (the cure, 4 source paths) and `129154ff3` (probes, frames, crops, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-05/vp5-2026-10-17/`) |
|---|---|---|---|
| VP5-01 (low) | **CURED (option 1: the fold lands on a row boundary).** | `ConfigSliderPane.vue`: a ResizeObserver on the follow port and its body reads where the port ends. The footer (`.config-action-bar`, which this pane owns) takes the remainder as its top margin, so the port ends exactly where the first row or section head that does not fit begins. The write lands one frame after the reading, because resizing the observed port inside its own callback is a ResizeObserver loop. The trim is read back into the available height, so it settles in one pass, and it is 0 whenever the content fits (Atmosphere, the 390 one-track column). There is no wrapper and no new class, and glass's FadingScroll and its mask are untouched. Option 2 was rejected: glass's feather is a `mask-image` on the port itself, so a well edge drawn on the port would be masked out with the content. A wider feather (one row pitch) was tried first and dropped, because it only dimmed the ghost (`blob-foot-crop-*` before/after). | `probe-vp5-before.json` → `probe-vp5-after.json`, /#/blob, both schemes. **1440×900:** the cut "Warp" row showed 19 px (label and value); it now shows 1 px of its 4 px row padding, with no glyph. Footer trim 18 px; the last whole row is Smoothness. **1280×800:** 22 px → 1 px, trim 21 px. /#/atmosphere: trim 0 (it fits). `probe-roloop.mjs`: 0 page or console errors across 1280×800 → 1100×760 → 1440×900 → 390×844 → 1440×900 (trim 21/19/19/0/19). The well's hairlines and tone dissolve in glass's 1.5rem pane feather above a plate band, then the rule (`blob-foot-crop-1440-{light,dark}.png` against the `-before` crops). |
| VP5-02 (low) | **CURED.** | `MixSourceSelector.vue`: the Palettes tabpanel caption renders only when `savedPalettes.length > 0`. TRUE EMPTY is the EmptyState alone (A2-VA-L1-5 / T.W6.5 Lane S). There is no copy change and no new element. | `probe-vp5-after.json` mix, 1440 both schemes: caption `null`, 0 saved rows, the EmptyState's "No saved palettes yet. / Save a palette, then pour it or its colors in here." is the one voice (`mixpal-{1440,390}-*`). |
| VP5-03 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING.** No local thumb shim. | The ask stands as the critic wrote it: a quiet resting thumb, or a single-edge leading-edge cap, on the scrubber register (one hairline, no specular, inside the single-quiet-edge ruling). The consumer adopts it at the 10.2.0 repin. Pass 5's open question ("does the thumbless default read as a control?") is answered **no** by this critic. | `blob-*`, `atmosphere-*` (the rails are unchanged). |
| VP5-04 (trivial) | **CURED (deleted).** | The micro italic Fraunces strapline "Color space picker & converter" is deleted from `ProfileSection.vue` and `MobileMenuDropdown.vue`, together with its now-empty wrapper `div`. The menu header is the avatar plus the `@mbabb` handle. | `capture-vp5.json`: `usermenu-1440-*` and `dockmenu-390-*` read handle "@mbabb", strapline false. |
| VP5-G1 (low) | **Glass-owned: honest-RED, cited on O-87 (and O-88 for the dock rows).** No local override. | Every row was already relayed: V7R-02, V8C-03, V8C-04, P4R-02, P4R-03, P9R-G1..G3, P5C-01 and VC3-02. They are re-judged at the 10.2.0 repin. | The census glass rows are unchanged (below). |

**Census** (`census-after.json`, `--base :9231 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded; 18 of 18 route cells, 0 errors).
- **Verdict RED, on glass rows only (O-87).** Max 6 layers, 368 inset highlights, 8 drop-shadows, 22 gradient fills on controls, floater max layers 8. These are identical to the pass-4 re-dispatch.
- **Consumer:** looping animations 0. The static totals are unchanged: 17 box-shadow declarations and 2 lighting-token definitions.
- A first census run lost its dark half when the guarded dev server reached its timeout. It was re-run whole on a fresh server, and only that run is committed.

**Frames.** Headless real Chrome (§0ei), one browser per cell, closed in a `finally`. `capture-vp5.mjs` took 16 of 16 cells: blob, atmosphere and mixpal at 1440 and 390, `usermenu-1440` and `dockmenu-390`, each in light and dark. The fold probe adds blob and atmosphere at 1440×900 and 1280×800 in both schemes, plus crops. The server was stopped, and nothing from this seat is left running.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1227/1234 ×2, with the same 7 standing failures (ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6).
- **e2e** (smoke, headless, workers 1, own server :9232). The 11 specs that open /#/blob, /#/atmosphere, /#/mix or the dock menus: 68 passed / 5 failed, then 67 / 6.
  - Every failure is in the standing class (c') o18 set homed by id to X-W10: :713, :993, :1297 a/b and :1322 a/b. The :1297 dark cell passed in run 1.
  - The :1322 menu-row cells fail on Switch account, Logout, Regenerate slug and Copy slug, not on the deleted strapline.
  - The other 10 spec files (walk, w12-dock, x-w7l-detached and the rest) are strict GREEN ×2, with 0 ResizeObserver-loop lines.
- **Disclosed:** the first e2e pair ran on a draft of the snap. It wrote the trim inside the observer callback (an RO-loop window error, and one walk timeout) and kept a stale trim when the content fit (one x-w7l 1024×768 gutter read). Both were fixed, and every gate above was re-run on the final code.
- No visual golden was re-baselined.

**Loop state.**
- Pass 5 cured every consumer row it owns.
- One glass ask is new on the record: VP5-03, the scrubber's resting thumb, under O-87.
- The open owner rulings are unchanged: P5C-02, VC6-04 / V12-01, VC5-01, VC4-09 and V2C-15. P4R-01-R stays stated for an ink-model unit.
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin.

### pass 6 (2026-10-17): critic VC6 — the dock's menus hang below the dock

The critic named one medium consumer row (VC6-01), the standing glass rows (VC6-G1) and two trivial consumer rows that are held by ruling (VC6-T1, VC6-T2). VC6-01 is cured at one shared value. The glass rows stay honest-RED on O-87 / O-88. Evidence is in `pass-06/vc6-2026-10-17/`.

**Commits.** value.js `b84fda97d` (the cure: 1 new 12-line module plus 3 call-site files) and `b14cbad1e` (probe, frames, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-06/vc6-2026-10-17/`) |
|---|---|---|---|
| VC6-01 (medium) | **CURED.** | Glass exposes no dock-menu offset: `DropdownMenuContent`'s `sideOffset` is a number prop, default 4, and the dock has no offset token. So the one home is a single shared constant, `DOCK_MENU_SIDE_OFFSET = 17`, in `demo/shell/dock/menus/dockMenuOffset.ts`. It is the 12.5 px of plate below a centred trigger in the 56 px pill, plus the 4 px floater gap, rounded up. All five dock-seated sites read it as `:side-offset`: `ProfileSection.vue` ×3 (Profile, admin, @mbabb), `MobileMenuDropdown.vue` and `GenericActionBar.vue`'s overflow menu. There is no wrapper component and no glass override. If glass ever owns dock-menu placement (beside O-88), the constant goes. | `probe-vc6-before.json` → `probe-vc6-after.json`, gate `menu.top ≥ dock.bottom + 4`. **1440 (@mbabb):** menu top 60 → 73 against a dock bottom of 68.5, so the gap goes from −8.5 to +4.5 px. **390 (Menu):** 69 → 82 against 77, so −8 → +5 px. Light and dark read the same. The frames are `usermenu-1440-*` and `dockmenu-390-*`, each with a `-before` twin, and the dock's lower rim is whole above the menu. The GenericActionBar overflow trigger did not show at 390 or 1440 on /, mix, gradient, palettes or blob, even with the action bar open; it reads the same constant. The Profile and admin sites are not reachable without a session, and they use the same `DockTrigger` and the same constant. |
| VC6-G1 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING (the menu's 6-layer stack, the disabled primary's under-shadow, the bead specular, the scrubber thumb VP5-03) and O-88 DOCK-COLLAPSE-MOTION (the 390 plate bulge, the collapsed seal).** No local override. | Every row was already relayed. They are re-judged at the 10.2.0 repin. | The census glass rows are unchanged (below). |
| VC6-T1 (trivial) | **Held by Gate A5 (X.W5.a).** No consumer change. | One visible route H1 is required, and the sr-only cure was struck. If the owner revisits A5, the pane title becomes the H1. | — |
| VC6-T2 (trivial) | **Held by ruling V7C-04** (the follow companion ends with its row and scrolls). No change. | VP5-01's row-boundary fold holds. | `blob-1440x900-*`, `blob-1280x800-*`. |

**Census** (`census-after.json`, `--base :9241 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** Max 6 layers, 368 inset highlights, 8 drop-shadows, 22 gradient fills on controls, floater max layers 8. These are identical to pass 5.
- **Consumer:** looping animations 0. The static totals are unchanged: 17 box-shadow declarations and 2 lighting-token definitions.

**Frames.** Headless real Chrome (§0ei), one browser per cell, closed in a `finally`. `capture-vc6.mjs` took 20 of 20 cells: blob, atmosphere and mixpal at 1440 and 390; blob at 1440×900 and 1280×800; `usermenu-1440` and `dockmenu-390` (which also record the menu gap); each in light and dark. The probe adds the `-before` menu frames. The server was stopped, and nothing from this seat is left running.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1227/1234 ×2, with the same 7 standing failures (ink D6 ×2, T-35 ×3, spectrum-luma C-5, reka NG-6).
- **e2e** (smoke, smoke-admin and smoke-mobile; headless, workers 1, own server :9242). The 19 spec files are pass 5's 11 plus every spec that opens a `[role=menu]` or the action bar. Both runs were 109 passed / 5 failed, and the 5 were identical.
  - Every failure is in the standing class (c') o18 set homed to X-W10: :713, :993, :1297 light, and :1322 light/dark.
  - The :1322 menu-row cells fail on the same alpha-0 reads as pass 5, not on the menu's new position.
  - Every other spec is strict GREEN ×2.
- No visual golden was re-baselined.

**Loop state.**
- Pass 6 cured its one actionable consumer row.
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin. The open owner rulings are unchanged (P5C-02, VC6-04 / V12-01, VC5-01, VC4-09, V2C-15), and so is P4R-01-R.

### pass 5 (2026-10-17, re-dispatch): critic C5 — the spectrum predicate is total, and the companion's empty statement drops a rung

Critic C5 (fresh, at `f34718e2f`, in `pass-05/critic-c5-2026-10-17/`) named one medium consumer row, one low, one trivial, and the standing glass rows. C5-01 and C5-02 are cured. C5-03 is optional and held, with the reason below. The glass rows stay honest-RED on O-87 / O-88. Evidence is in `pass-05/c5-2026-10-17/`.

**Commits.** value.js `f04cdc586` (the cure: 4 paths) and `9b7a252d1` (frames, probes, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-05/c5-2026-10-17/`) |
|---|---|---|---|
| C5-01 (medium) | **CURED at the helper's entry.** | `spectrumLuma.ts`: `spectrumFieldLuminance` reads a non-finite `h`, `s` or `v` as 0 before calling `hsv()`, so the one predicate both render-path instruments share (the dot's border, the needle's ink) can no longer throw inside a computed and drop the pane to its error plate. The remaining throws are assertions on the library's own conversion, which finite input cannot fail. The hue-aware model and the 3:1 law are unchanged. **Falsifier:** a new case in `test/spectrum-luma.test.ts`, RED against `1434921d6`'s helper and GREEN with the cure. **Routed to Track A (X-W8), by id:** the second half of the critic's cure, making `dotPos` and `channelNumber` never yield NaN. That lives in `SpectrumCanvas` and `color-session/picker-color.ts`, outside this seat's touch, and the predicate is now safe without it. | `capture-c5.json`: 0 `spectrumFieldLuminance` errors and 0 `main [role=alert]` plates in all 36 route cells (picker, mix and the rest, 1440 and 390, both schemes). |
| C5-02 (low) | **CURED (the critic's hint-rung arm).** | One scoped rule in `PalettesPane.vue` on the companion's true-empty statement: `--type-small` at 400, still Fraunces. EmptyState's register for Browse and Mix is untouched, and its note now names this one exception. **The body-family arm was tried first and dropped:** O-10d (the three-voice law) RED'd it 1 of 49 ×2, with "empty-state statement off the display face" (`gates/draft/`). | Companion (/#/palettes, /browse, /generate; both schemes): **1440**, label Fraunces 18.6px/600 over statement Fraunces 16.4px/400 (was 18.6/500). **390**, 16px/600 over 14px/400. Mix's own EmptyState is unchanged at 18.6/500 (`palettes-*`, `browse-*`, `generate-*`, `mix-*`). |
| C5-03 (trivial, optional) | **HELD, no change.** | Dropping "Selected" in true-empty leaves a lone dashed + slot with no visible label. Merging it with "Saved palettes" breaks the one section grammar of V9C-05. The critic marks it optional hierarchy polish, not lighting. The heads measure 20.35px/600 as the critic read them. | `mix-1440-*`, `mix-390-*`. |
| C5-G1 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING (bead specular, Generate name-field rim stack, Mix's disabled primary, the thumbless scrubber VP5-03, the tinted Browse tag-overflow popover) and O-88 DOCK-COLLAPSE-MOTION (the dock rim and halo, the 390 bulge, the collapsed seal).** No local override. | Every row was already relayed (V1C-G1..G4, VC4-06/07, VC5-G1, VP5-03, VC6-G1). They are re-judged at the 10.2.0 repin. | `scene-browse-open-1440-*`; the census glass rows are unchanged (below). |

**Census** (`census-after.json`, `--base :9253 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** Max 6 layers, 368 inset highlights, 8 drop-shadows, 22 gradient fills on controls, floater max layers 8. These are identical to pass 6.
- **Consumer:** looping animations 0. The static totals are unchanged: 17 box-shadow declarations and 2 lighting-token definitions.

**Frames.** Headless real Chrome (§0ei). `capture-c5.mjs` uses one browser for the run and a new context per cell, closing both in a `finally`. It took 36 of 36 cells (9 routes × 1440 and 390 × light and dark), plus `scene-browse-open-1440-*`. The guarded dev server on :9253 was stopped, and nothing from this seat is left running.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1234/1239 ×2, with the same 5 standing failures (ink D6 ×2, T-35 ×3). C-5 and NG-6 have been GREEN since X.W8.i2.
- **e2e** (smoke, headless, workers 1, own server :9252; 9 specs on the spectrum, the sliders and the palettes empty states, `gates/specs.txt`): **49/49 ×2**, strict GREEN.
- No visual golden was re-baselined.

**Loop state.**
- This re-dispatch cured both actionable consumer rows. C5-03 is held as optional.
- One row is routed to Track A: the NaN source in `dotPos` / `channelNumber`.
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin. The open owner rulings are unchanged (P5C-02, VC6-04 / V12-01, VC5-01, VC4-09, V2C-15), and so is P4R-01-R.

### pass 6 (2026-10-17, re-dispatch): critic V6C — the under-label statement rung lives in EmptyState, and the draft well speaks the app's voice

Critic V6C named two consumer rows (V6C-01 low, V6C-02 trivial), one carried consumer row (V6C-R1 = P4R-01-R) and the standing glass rows (V6C-G1). V6C-01 and V6C-02 are cured at the root. V6C-R1 stays open as before. The glass rows stay honest-RED on O-87 / O-88. Evidence is in `pass-06/c6-2026-10-17/`.

**Commits.** value.js `233594f39` (the cure: 4 paths) and `a4c342bb3` (frames, probe, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-06/c6-2026-10-17/capture-c6.json`) |
|---|---|---|---|
| V6C-01 (low) | **CURED at the register (tokens before instances).** | EmptyState's `compact` register, which already meant "seated under its own label", now also sets the true-empty statement at the hint rung (`text-small` = `--type-small`) at 400, still Fraunces (O-10d's three-voice law). Mix's "Saved palettes" plate already passed `compact`. My Palettes' companion passes it through `PaletteCardGrid`'s new `emptyCompact` prop. The C5-02 `:deep(...) > p.font-display` override in `PalettesPane.vue` is deleted, and so is EmptyState's note naming the exception. No wrapper and no new dir. | The companion on /#/palettes, /browse, /generate, /gradient and /extract, both schemes: **1440**, label Fraunces 18.6/600 over statement 16.4/400. **390**, 16/600 over 14/400. **Mix**: "Saved palettes" 20.35/600 over the statement at 16.4/400 at 1440 (was 18.6/500, a 1.75 px near-tie) and 14/400 at 390. The app now sets "No saved palettes yet." at one rung per width. |
| V6C-02 (trivial) | **CURED.** | `CurrentPaletteEditor.vue`: "Current Palette" becomes "Current palette" (sentence case, like every other head). The count takes the app's one count idiom (PaletteSpecimen): the bare `formatCount` numeral, muted mono `tabular-nums`, on the label's baseline beside it (the row is `items-baseline`, no longer `justify-between`), with "1 color" / "N colors" in `title`. | `palettes-new-*` (1440 and 390, both schemes): label "Current palette"; count text "1", title "1 color", `tabular-nums`, 8 px after the label (it used to sit at the row's far right edge). |
| V6C-R1 (low, carried) | **OPEN, unchanged: P4R-01-R.** | It needs an ink-model unit that certifies display ink against the local (or brightest) field under its site, or an owner call on the margin. No local fudge on the title alone. | — |
| V6C-G1 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING (the dock layers, rim and halo, the bead specular and double drop-shadow, the 8-layer listbox floater stack with its cartoon rung and gradient fills, the control rims, Mix's disabled primary, the thumbless scrubber rails, the tinted Browse tag-overflow popover) and O-88 DOCK-COLLAPSE-MOTION (the 390 bulge, the collapsed seal).** No local override. | Every row was already relayed. They are re-judged at the 10.2.0 repin. | The census glass rows are unchanged (below). |

**Census** (`census-after.json`, `--base :9263 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** Max 6 layers, 368 inset highlights, 8 drop-shadows, 22 gradient fills on controls, floater max layers 8. These are identical to pass 5.
- **Consumer:** looping animations 0. The static totals are unchanged: 17 box-shadow declarations and 2 lighting-token definitions.

**Frames.** Headless real Chrome (§0ei). `capture-c6.mjs` uses one browser for the run and a new context per cell, closing both in a `finally`. It took 28 of 28 cells: palettes, browse, generate, gradient, extract, mix and palettes-new (the well after one colour lands), each at 1440 and 390 in light and dark. The guarded dev server on :9263 was stopped, and nothing from this seat is left running.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1234/1239 ×2, with the same 5 standing failures (ink D6 ×2, T-35 ×3).
- **e2e** (smoke, headless, workers 1, own server :9262; pass 5's 9 specs, including O-10d and the palettes empty-state and palette-save specs, `gates/specs.txt`): **49/49 ×2**, strict GREEN.
- No visual golden was re-baselined.

**Loop state.**
- Both actionable consumer rows are cured.
- P4R-01-R (V6C-R1) stays open.
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin. The open owner rulings are unchanged (P5C-02, VC6-04 / V12-01, VC5-01, VC4-09, V2C-15).

### pass 7 (2026-10-17): critic V7C — Not Found seats its header, the watercolor blob keeps no straight side

Critic V7C named three consumer rows (V7C-01 medium, V7C-02 low, V7C-03 trivial) and the standing glass rows (V7C-G1). All three consumer rows are cured at the root. The glass rows stay honest-RED on O-87 / O-88. Evidence is in `pass-07/c7-2026-10-17/`.

**Commits.** value.js `94441d77f` (the cure: 3 paths) and `513eeaff8` (frames, probe, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-07/c7-2026-10-17/capture-c7.json`) |
|---|---|---|---|
| V7C-01 (medium) | **CURED at the shell's contract.** | Not Found's short plate had nothing to scroll under its header but took PaneShell's overlying layout, so it fell through to the 0.52 rest veil. It now takes PaneShell's `seated` layout, which is the shell's existing contract for a header with nothing scrolling under it. V4C-05's rule (`.card:has(> .pane-header ~ .pane-scroll-fade)`) then paints no `::before`. `--pane-veil-rest` is unchanged. The one remaining overlying pane, Admin, has a body that scrolls under its title and keeps the banked rest veil (V2C-15). PaneShell's notes are corrected. No new rule, wrapper or dir. | `/#/nope` at 1440 and 390, both schemes: header `::before` `display: none`, seated true, no document scroll. A pixel column across the header's bottom edge (`edge`, 5 px steps from -25 to +15 px) varies by at most about 5 levels (grain noise). It was a 13-level step. |
| V7C-02 (low) | **CURED at the shape source.** | `randomRadii` (`watercolor-dot/prng.ts`) now makes each side's two corner radii complementary: they sum to 100%, so no side keeps a straight run. The free corner of each side still draws in `[lo, hi]`, so the shape keeps its seeded organic asymmetry (identity, §0dm). All 8 draws are still consumed, so the wobble channels seeded after them are unchanged. The ghost reads the same `borderRadius`, so it still traces the solid. | Every watercolor swatch on `/#/generate` (11) and in the current-palette well (8), at 1440 and 390 in both schemes: the largest straight run, computed from the radii after CSS's overlap scaling, is **0 px** on every side. It was up to 55 px of a 78 px cell. |
| V7C-03 (trivial) | **CURED.** | The Not Found PaneShell takes `max-w-(--pane-max)`, the one pane column Atmosphere already uses. The shell's `mx-auto` centres it. | At 1440 the plate is x 464–976, w 512, which is Atmosphere's exact box (it was 200–1240). At 390 both are 16–374. |
| V7C-G1 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING and O-88 DOCK-COLLAPSE-MOTION.** | The rows are the hero bead, the dock's rim, halo, 390 bulge and collapsed tile, the card rims, the name-field rim stack, Mix's disabled primary and the thumbless scrubber rails. No local override. | They are re-judged at the 10.2.0 repin. |

**Census** (`census-after.json`, `--base :9263 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** Max 6 layers, 368 inset highlights, 8 drop-shadows, 22 gradient fills on controls, floater max layers 8. These are identical to pass 6.
- **Consumer:** looping animations 0. The static totals are unchanged.
- One overlay cell (card-menu, `/#/browse`, dark) timed out on `page.goto` under machine load. The other 7 cells read the same as pass 6.

**Frames.** Headless real Chrome (§0ei). `capture-c7.mjs` uses one browser for the run and a new context per cell, closing both in a `finally`. It took 16 of 16 cells: notfound, atmosphere (the single-column reference), generate and palettes-new, each at 1440 and 390 in light and dark. The guarded dev server on :9263 was stopped, and nothing from this seat is left running.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1234/1239 ×2, with the same 5 standing failures (ink D6 ×2, T-35 ×3).
- **e2e** (headless, workers 1, own server :9262, `gates/specs.txt`): **smoke 31/31 ×2** over 9 specs that touch the changed files, among them o11-header-gates (the veil contract), page-load and w12u-x-admin-tags (Not Found), and o20/o24/o9/o14/palette-save (the swatches). **smoke-admin route-guard 3/3 ×2.** Strict GREEN.
- No visual golden was re-baselined.

**Loop state.**
- Every consumer row from V7C is cured.
- P4R-01-R stays open.
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin. The open owner rulings are unchanged (P5C-02, VC6-04 / V12-01, VC5-01, VC4-09, V2C-15).

### pass 8 (2026-10-17): critic V8C — the route's name is said once, and Not Found's plate takes Fira and sits under its title

Critic V8C named three consumer rows (V8C-01 medium, V8C-02 low, V8C-03 low) and two glass rows (V8C-G1 medium, V8C-G2 low). All three consumer rows are cured at the root. The glass rows stay honest-RED on O-87 / O-88. Evidence is in `pass-08/c8-2026-10-17/`.

**Commits.** value.js `dc94d7745` (the cure: 9 paths) and `b56d22721` (frames, probe and gates). The census and this receipt are committed after them.

| id | verdict | cure / reason | measured (`pass-08/c8-2026-10-17/capture-c8.json`) |
|---|---|---|---|
| V8C-01 (medium) | **CURED at the schema and the shell (gate A5's contract kept).** | A scene region whose pane title says the view's label is marked `titled` in `viewSchema.ts`: Browse, Extract, Mix, Generate, Gradient, Atmosphere, Blob and Not Found. On those routes PaneShell renders that title as the route's one visible `<h1 id="route-title" tabindex="-1">`, which still names `<main>`. PaneHeader gains level 1 and a `titleId` prop. App prints no caption. Where no pane title says the label (Home, Palettes and the admin consoles), the caption stays. It is now set `text-align: start` on the row's own inline clamp, which is named once as `--pane-row-max` on `.pane-main` (shell.css) and read by both `.pane-container` and `.route-title`. That seats it on the stage card's leading edge. `ROUTE_TITLE_ID` moves to `useViewManager.ts`. The e2e `MAIN_PANE` relation now matches the H1 anywhere inside `<main>` (it was `> h1`). No new component, wrapper or dir. **The A5 gate owner should confirm this** (the critic's ask). | Every cell (10 routes × 1440/390 × light/dark): exactly 1 visible H1 inside `<main>`, with `tabindex=-1`. **Titled routes**: the H1 is the pane title at 41.9 px (1440) and 32.9 px (390). It was a 14.4 / 12.2 px caption, so the hierarchy is no longer inverted. The label is said once in `<main>`. **Home / Palettes**: the caption's left edge is x=199 at 1440, which equals the stage card's left edge (it used to be centred at x=720, over the gutter), and x=16 at 390. |
| V8C-02 (low) | **CURED.** | EmptyState's error detail takes `text-mono-small`, the class of Generate's seed line, in place of `text-small`. `plate-ink` and the wrap rules are kept. | `/nope` renders in "Fira Code" at 16.4 px (1440) and 14 px (390), in every cell. |
| V8C-03 (low) | **CURED on the existing `compact` axis.** | EmptyState's `compact` now also applies to the error plate. Under its pane title the plate drops its top padding and keeps the bottom one, because Not Found's body has no gutter. NotFoundPane passes `compact`. Its one action takes the default size instead of `sm`, still with `emphasis="quiet"`. No new component. | Header bottom to glyph top is **0 px** (the header's own `--pane-header-gap` spaces it). It was about 32 px of dead band. The card is 265 px tall at 1440 (was 293) and 280 px at 390. The action is 16.4 px text in a 40 px box, against the 16.4 px Fira detail line. |
| V8C-G1 (medium) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING.** | The light scheme's resting plate mixes the dark `--glass-veil-ink` into `--card`, so the card reads darker than the page it sits on. That needs a light veil ink (or a lower veil alpha) in light, decided in glass. No local override: lowering the consumer's `--glass-level` would strip the material, which §0ek counts as a regression. | Re-judged at the 10.2.0 repin. |
| V8C-G2 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING and O-88 DOCK-COLLAPSE-MOTION.** | These are the standing V7C-G1 rows: the hero bead's specular and double drop, the dock's rim, halo, 390 bulge and collapsed tile, the name-field rim stack, Mix's lit disabled primary and the thumbless scrubber rails. No local override. | Re-judged at the 10.2.0 repin. |

**Census** (`census-after.json`, `--base :9263 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** Max 6 layers, 368 inset highlights, 8 drop-shadows, 22 gradient fills on controls, floater max layers 8. These are identical to pass 7.
- **Consumer:** looping animations 0. The static totals are unchanged.
- The computed element count is 5380, down from 5394: the captions are gone from the titled routes. All 8 overlay cells read with 0 errors (pass 7 had one timeout).
- **Run note:** the machine's heavy pool was full, and a separately queued census could outlive its server. The server and the census therefore ran in one guarded slot (`serve-census.sh`), which stops the server on exit.

**Frames.** Headless real Chrome (§0ei). `capture-c8.mjs` uses one browser for the run and a new context per cell, closing both in a `finally`. It took 40 of 40 cells: picker, palettes, browse (fixture), extract, mix, generate, gradient, atmosphere, blob and notfound, each at 1440 and 390 in light and dark. Every guarded dev server on :9263 was stopped, and nothing from this seat is left running.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1234/1239 ×2, with the same 5 standing failures (ink D6 ×2, T-35 ×3).
- **e2e** (headless, workers 1, own server :9262, `gates/specs.txt`):
  - **smoke 51/51 ×2** over 12 specs that touch the changed files, among them page-load and walk (A5's one visible H1 per view), a11y-select-title, o11-header-gates, o10/o10d, o7, views/mix and palette-save;
  - **smoke-admin 8/8 ×2** (route-guard, admin-walk, admin-populated, o10d-admin-title-voice);
  - **smoke-mobile page-load-mobile 1/1 ×2.**
  - Strict GREEN.
- No visual golden was re-baselined. Note: the `e2e/visual` goldens were not run in this pass, as in earlier passes. Their titled-route frames will differ by the removed caption at the next visual run, which needs a named re-baseline.

**Loop state.**
- Every consumer row from V8C is cured. V8C-01 asks the A5 gate owner to confirm.
- P4R-01-R stays open.
- The glass rows (V8C-G1, the light plate's dark veil ink, is new on O-87) wait on O-87 / O-88 at the 10.2.0 repin. The open owner rulings are unchanged (P5C-02, VC6-04 / V12-01, VC5-01, VC4-09, V2C-15).

### pass 9 (2026-10-17): critic V9C — Palettes names its view on its own card, the scalar row keeps one rhythm, the Not Found frames speak Jakarta

Critic V9C named three consumer rows (V9C-01 medium, V9C-02 low, V9C-03 low) and one glass row (V9C-G1 low). All three consumer rows are cured at the root. The glass row stays honest-RED on O-87 / O-88. Evidence is in `pass-09/c9-2026-10-17/` (`pass-09/` already holds an earlier seat's pass 9).

**Commits.** value.js `c6c27afd5` (the cure: 8 paths) and `5ef8d672e` (frames, probes, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-09/c9-2026-10-17/`) |
|---|---|---|---|
| V9C-01 (medium) | **CURED at the schema and the shell.** | The palettes inspector region is marked `titled` (`viewSchema.ts`, on the palettes view only). PaneShell's rule for a title that "says" the label now accepts a title that is the label or ends on it, with a word boundary before the label, so "My Palettes" says "Palettes". It is one rule, with no per-view alias, and the view's label (the dock entry) is unchanged. PalettesPane passes the plain `title="My Palettes"` for the match, and its `#title` slot still paints the ramp and the count. On /palettes the pane title is the route H1 at both widths, and App prints no caption on the picker card. Home keeps its caption. Gate A5 (`walk.spec.ts`) reads the H1, and the `<main>` name, as the label or ending on it, anchored at the end, so a label that disagrees with the schema still fails. No caption was moved by hand. | `capture-c9.json`: /palettes has 1 visible H1, "My Palettes", in the **inspector** region at 1440 and at 390 (41.9 / 32.9 px). The view label is said 0 times outside the H1 (pass 8: the caption sat on the picker card, x 199, with the name said twice). All 40 cells have exactly 1 H1. |
| V9C-02 (low) | **CURED at the root (one rule, no wrapper).** | The cause sits under the critic's: glass gives the `sm` slider its `--slider-touch-target` (1.5rem) band only under `pointer: coarse`. Under a fine pointer the root shrank to its 9 px track. Extract wrapped its rails in a hand-made `h-6` band, and the other rows did not. `foundation.css` now gives the `sm` rung, which only the scalar population takes, that band at every pointer, from glass's own token. This is layout, not lighting. The hand-made band around Extract's kC is deleted. K keeps its box only to seat the developed rail behind the track. The config console rows take `gap-1`, the Tools rows' label gap. | `probe-v9c02-before.json` → `-after.json`, label bottom to track top: Extract 13 → 13, Generate 5 → 13, Gradient Direction 5 → 13, Atmosphere and Blob 9 (1440) / 7 (390) → 14 / 13. Every `sm` root is now 24 px. |
| V9C-03 (low) | **CURED in the harness; frames re-shot.** | `pass-09/c9-2026-10-17/harness.mjs` (copied from `pass-04/redispatch-2026-10-16`) gains `bootRoute(page, url, { allowAlert })`. It runs the full Jakarta load-and-render gate, reloads included, and skips only the refusal of a role=alert plate. `capture-c9.mjs` boots the Not Found cells through it, with no cold `goto`. The product is unchanged. The cold first-visit fallback is glass's `font-display: optional` (VR3-01). | `notfound-{1440,390}-{light,dark}.png`: "Back to the picker" is set in Plus Jakarta Sans 500 (16.4 px at 1440, 14 px at 390), and `rendersJakarta` is true in all four cells. |
| V9C-G1 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING and O-88 DOCK-COLLAPSE-MOTION.** | The rows are the bead's specular and double drop, the dock's rim, halo and 390 bulge, the rim stacks, the `.control-surface` gradients and the floater's stepped `--shadow-cartoon-sm` ink. This restates V8C-G1/G2. There is no local override. | Re-judged at the 10.2.0 repin. |

**Census** (`census-after.json`, `--base :9271 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** byOwner, glass: 788 layers, 368 inset highlights, 8 drop-shadows and 22 control gradients. Max 6 layers on one element; floater max 8. These are identical to pass 8.
- **Consumer:** 116 single layers, and 0 on every allowance line. Looping animations: 0.
- Computed elements: 5376, down from 5380, because the /palettes caption is gone. All 8 overlay cells read with 0 errors.

**Frames.** Headless real Chrome (§0ei). `capture-c9.mjs` uses one browser for the run and a new context per cell, and closes both in a `finally`. It took 40 of 40 cells: 10 routes × 1440/390 × light/dark. The guarded dev server on :9271 was stopped, and nothing from this seat is left running. The served tree also carried other seats' uncommitted hunks (`picker/header.css`, `shared/ui/PaneHeader.vue`, `styles/animations.css`).

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1234/1239 ×2, with the same 5 standing failures (ink D6 ×2, T-35 ×3).
- **e2e** (headless, workers 1, own server :9272, `gates/specs.txt`):
  - **smoke 70/70 ×2** over 15 specs: page-load and walk (A5), o7, o9, o10, o10d, o11, x-w7l-detached (the console rows), views/gradient (Direction), companion-pane-track-start, views/mix, a11y-select-title, scene-action-contract, w12u-x-admin-tags and palette-save.
  - **smoke-mobile page-load-mobile 1/1 ×2.**
  - Strict GREEN.
- No visual golden was re-baselined. The `e2e/visual` goldens were not run. At the next visual run, /palettes (caption gone, title as H1) and the scalar rows (24 px band) will differ and need a named owner-ruling re-baseline (§0ej).

**Loop state.**
- Every consumer row from V9C is cured. The A5 gate owner should confirm that it reads "says the label" as "is the label or ends on it".
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin. The open owner rulings are unchanged.

### pass 10 (2026-10-17): critic V10C — the copied gradient is the rail's gradient, the docs' range prose leaves KaTeX

Critic V10C named two consumer rows (V10C-01 low, V10C-02 low), one trivial consumer row (V10C-03) and one glass row (V10C-G1 medium). V10C-01 and V10C-02 are cured at the root. V10C-03 is recorded with no change, as the critic asks. The glass row stays honest-RED on O-87 / O-88. Evidence is in `pass-10/c10-2026-10-17/` (`pass-10/` already holds an earlier seat's pass 10).

**Commits.** value.js `a96b4ce3e` (the cure: 11 paths) and `d514557bc` (frames, probes, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-10/c10-2026-10-17/`) |
|---|---|---|---|
| V10C-01 (low) | **CURED at the serializer, with the parser to match.** | `serializeGradient` now prints the same `preamble()` the render tile prints: the geometry plus `interpolationClause(space, hueMethod)`, which is the helper `stripHead` uses for the rail. The copied CSS and the rail are now one gradient. For the copied string to survive its own round-trip, the strict parser (`gradientParse.ts`) lifts the css-color-4 `in <space> [<hue> hue]` clause, before or after the geometry, through the serializer's own space table read backwards (`spaceFromCssName`, `isPolarCssSpace`). So it accepts only what the serializer can print, and it rejects a hue method on a non-polar space or an unnamed space. `applyCSS` sets the model's space and hue method when the CSS names them. When the CSS names no space, the model keeps its own, so HSV, which has no CSS name and prints no clause, survives its round-trip. The helper omits the default `shorter`, so the default reads `90deg in oklch`, exactly as the rail does. Unit (`gradient-parse.test.ts`): serialize then parse round-trips space and hue method across linear (default and angled), conic (`from 45deg in hsl decreasing hue`) and radial (`in srgb`). Further cases: the clause before the geometry, HSV with no clause, and two rejections. The existing literal round-trip now expects `45deg in oklch`. | `capture-c10.json`, all 4 gradient cells: the well reads `linear-gradient(90deg in oklch, oklch(75% 0.15 145deg) 0%, …)` and the rail's computed image reads `linear-gradient(90deg in oklch, …`. After `… 90deg in oklch longer hue …` is authored into the well, the well, the rail and the Hue method select all read Longer (`gradient-longer-*.png`). |
| V10C-02 (low) | **CURED in the content, at every site.** | Every inline Components range in `assets/docs/*.md` keeps only the symbol as KaTeX. Inequalities (`a^* < 0`) also stay KaTeX, because they are math. The words and numbers are prose in the list's body voice, for example `<Katex expression="L^*"/>: 0 (black) to 100 (diffuse white)`. That covers 19 sites across hsl, hsv, hwb, oklab, lab and rgb (3 each), plus kelvin, which is now prose alone (`1000 K (reddish-orange) to 40000 K (blue)`), because its label already names the symbol. Display equations (cases' `\text{otherwise}`, `M_{\text{sRGB}}`, hex's function names) and the math-set or variable sites (`\{0\text{–}9, A\text{–}F\}`, `T = \text{kelvin}/100`) are content, and stay. | `probe-v10c02.json`: on Home (lab), all 3 Components items at 1440 and at 390, in light and dark, carry **0** KaTeX `\text` runs, and no line ends on a bare `=`. The items' family is Plus Jakarta Sans. `about-components-{1440,390}-{light,dark}.png`: at 390, each range sits on one line under its label (`L* : 0 (black) to 100 (diffuse white)`). |
| V10C-03 (trivial) | **No change (as the critic rules).** | Home's caption is the only fallback H1. Gate A5 keeps it visible, so it is never made sr-only, and the picker card has no title to promote. Whether the picker card should carry a title is the owner's call. | `capture-c10.json` title probe: Home still has 1 visible H1, App's caption. |
| V10C-G1 (medium) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING and O-88 DOCK-COLLAPSE-MOTION.** | The rows are the bead's specular and double drop, the dock's rim, halo, 390 bulge and action-bar lens, the collapsed tile with its lone glyph (O-88), the card, menu and name-field rim stacks, Mix's disabled primary and the thumbless scrubber rails. There is no local override. | Re-judged at the 10.2.0 repin. |

**Census** (`census-after.json`, `--base :9291 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** byOwner, glass: 788 layers, 368 inset highlights, 8 drop-shadows and 22 control gradients. Max 6 layers on one element; floater max 8. These are identical to pass 9.
- **Consumer:** 116 single layers, and 0 on every allowance line. Looping animations: 0.
- Computed elements: 5358. Pass 9 read 5376; the drop comes from the About rows' KaTeX `\text` spans, which are now prose.

**Frames.** Headless real Chrome (§0ei). `capture-c10.mjs` uses one browser for the run and a new context per cell, and closes both in a `finally`. It took 40 of 40 route cells (10 routes × 1440/390 × light/dark) and 4 `gradient-longer-*` cells. The first run's About clip threw on the two 1440 Home cells after their frames were taken, so `ONLY=picker` re-ran the Home cells (`capture-c10-picker.json`, 4/4). The About list frames are taken by `probe-v10c02.mjs`. The guarded dev server on :9291 was stopped, and nothing from this seat is left running. The served tree also carried other seats' uncommitted hunks (`picker/header.css`, `shared/ui/PaneHeader.vue`, `styles/animations.css`).

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1246/1251 ×2, with the same 5 standing failures (ink D6 ×2, T-35 ×3; the failure lists are identical across runs).
- **e2e** (headless, workers 1, own server :9282, `gates/specs.txt`): **smoke 37/37 ×2** over 7 specs: views/gradient (the authored-CSS round-trip and the canonical text on blur), o21-gradient-rail, a11y-gradient-stop-grammar, w12-about-clip, o21-space-catalog-truth, page-load and walk. Strict GREEN.
- No visual golden was re-baselined. The `e2e/visual` goldens were not run. At the next visual run, the Gradient CSS well (the clause) and the About Components rows will differ and need a named owner-ruling re-baseline (§0ej).

**Loop state.**
- Every consumer row from V10C is cured or ruled no-change.
- Next critic:
  - judge the clause in the well at 390, where the string wraps one line longer;
  - judge that a pasted bare gradient keeps the model's space rather than taking CSS's oklab default (deliberate, for HSV's round-trip).
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin. The open owner rulings are unchanged.

### pass 11 (2026-10-18): critic V11C — the Longer rail is one sweep, the CSS well sets one stop per line, a bare paste takes CSS's default, the range items stop restating their symbol

Critic V11C named one high consumer row (V11C-01), two low (V11C-02, V11C-03), one trivial (V11C-04) and one glass row (V11C-G1 medium). All four consumer rows are cured at the root. The glass row stays honest-RED on O-87 / O-88. Evidence is in `pass-11/c11-2026-10-18/` (`pass-11/` already holds an earlier seat's pass 11).

**Commits.** value.js `d7a613d9f` (the cure: 10 paths) and `26c24feec` (frames, probes, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-11/c11-2026-10-18/`) |
|---|---|---|---|
| V11C-01 (high) | **CURED at the root, in `useGradientCSS.ts`.** | The sampled forms print the space with `shorter` hue: `stripHead`, which serves the rail and every interval ramp, and the render tile's `preamble`. `preamble` now takes the hue method from its caller. Their samples already walk the model's hue path (`sampleCoalescedStops`, at least 2 steps per interval), so adjacent samples are always under 180° apart, and `shorter` between them is the walked direction. `longer` there had taken the long arc between every pair, which painted one hue wheel per sub-interval. Only the raw-stop `serializeGradient` prints `<hue> hue`. This corrects pass 10's capture: it counted the rail "reading longer hue" as a pass, but that reading was the defect. Unit: for `longer`, `serializeRailRamp`, `serializeCoalescedGradient` and `serializeIntervalRamp` print `in oklch, ` with no `longer hue`, and `serializeGradient` keeps it. | `capture-c11.json`, 4/4 gradient cells, asserted: with Longer authored, the well carries `longer hue`, the Hue select reads Longer, and the rail's and the tile's computed images both read `linear-gradient(90deg in oklch, …` (33 stops) with no hue method. `gradient-longer-{1440,390}-{light,dark}.png`: one sweep from green through amber and pink to blue, on the rail and the tile alike. |
| V11C-02 (low) | **CURED in the serializer's block form, not with CSS.** | `serializeGradient(model, "block")` puts each top-level argument on its own two-space-indented line: the preamble, then one stop per line. `simpleCSS`, the well's text and what it settles to on blur, takes this form. The clipboard copy is the coalesced CSS and stays on one line. The parser already treats newlines as whitespace, so the block round-trips (unit). `views/gradient.spec.ts`'s blur assertion now reads the block (`red 0%,\n  rebeccapurple 80%\n)`), with the same literals in the same order. | `probe-v11c02.json`: with Longer authored, the well has 5 text lines and 5 rendered line boxes at 462px (1440) and at 324px (390), in light and dark, so no literal breaks. `gradient-well-*.png`. |
| V11C-03 (low) | **CURED in `applyCSS`.** | When the CSS names no space, the model takes css-images-4's default, `oklab` with `shorter` hue. The exception is a model space CSS cannot name (HSV, for which `interpolationClause` returns `''`): it keeps its own, so its round-trip survives. Unit: a bare paste from oklch-longer gives oklab/shorter, and a bare paste from HSV stays HSV/longer. | `capture-c11.json`, 4/4, asserted: after the Longer cell, pasting `linear-gradient(red, blue)` settles the well to `linear-gradient(\n  in oklab,\n  red 0%,\n  blue 100%\n)`. |
| V11C-04 (trivial) | **CURED in the content, at every site.** | The 14 pure-range Components items (hsl, hsv, hwb, rgb ×3; lab, oklab ×1) drop the KaTeX symbol and its colon. Their labels already name the symbol, so each reads as prose: `0 (black) to 100 (diffuse white)`. That is how pass 10 already wrote kelvin. The inequalities (`a^* < 0`, …) keep KaTeX. | `probe-v11c04.json`: on Home (lab), the `L*` item carries 0 KaTeX and no ` :` at 1440 and 390, light and dark. Items 2 and 3 keep 2 KaTeX each. `about-components-*.png`. `katex-corpus` falls from 69 to 55 expressions, all of which still typeset. |
| V11C-G1 (medium) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING and O-88 DOCK-COLLAPSE-MOTION.** | The rows are the bead, the dock (rim, halo, 390 bulge, collapsed tile), the card, menu and name-field rim stacks, Mix's disabled primary and the thumbless scrubber rails. There is no local override. | Re-judged at the 10.2.0 repin. |

**Census** (`census-after.json`, `--base :9321 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** byOwner, glass: 788 layers, 368 inset highlights, 8 drop-shadows, 22 control gradients. Max 6 layers on one element; floater max 8. All identical to pass 10.
- **Consumer:** 116 single layers, and 0 on every allowance line. Looping animations: 0.

**Frames.** Headless real Chrome (§0ei). `capture-c11.mjs` uses one browser per run and a new context per cell, and closes both in a `finally`. It took 40 of 40 route cells and 4 `gradient-longer-*` cells, and asserted the Longer and bare-paste states. `probe-v11c02.mjs` framed the well, 4 cells, and `probe-v11c04.mjs` framed the About list, 4 cells. The guarded dev server on :9321 was stopped, and nothing from this seat is left running. The served tree also carried other seats' uncommitted hunks.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1237/1242 ×2, with the same 5 standing failures (ink D6 ×2, T-35 ×3). The failure lists are identical across runs. The total moves −9 against pass 10: katex-corpus −14 (one test per shipped expression) and gradient-parse +5.
- **e2e** (headless, workers 1, own server :9312, `gates/specs.txt`): **smoke 37/37 ×2** over the 7 specs pass 10 ran. Strict GREEN.
- No visual golden was re-baselined. The `e2e/visual` goldens were not run. At the next visual run, the Gradient CSS well (now a block) and the About Components rows will differ, and need a named owner-ruling re-baseline (§0ej).

**Loop state.**
- Every consumer row from V11C is cured.
- For the next critic:
  - judge the block well's height against the card at 390 (5 lines, inside the well's 12rem cap);
  - judge whether a long user-typed stop list should scroll inside the well or let it grow.
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin.

### pass 12 (2026-10-18): critic V12C — the CSS well grows with its block, a head keeps its first row, one inline-code register, the About card states each range once

Critic V12C named one medium consumer row (V12C-01), four low (V12C-02 to -05), one trivial (V12C-06) and one glass row (V12C-G1 medium). V12C-01 to -05 are cured at the root. V12C-06 is recorded with no change, as the critic allows. The glass row stays honest-RED on O-87 / O-88. Evidence is in `pass-12/c12-2026-10-18/` (`pass-12/` already holds an earlier seat's pass 12).

**Commits.** value.js `135e63136` (the cure: 14 paths) and `ad5c36e07` (frames, capture, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-12/c12-2026-10-18/`) |
|---|---|---|---|
| V12C-01 (medium) | **CURED by deletion.** | `GradientCodeEditor.vue` drops `max-h-[12rem] overflow-y-auto` and the now-idle `scrollbar-thin`, and keeps `min-h-[5rem]`. The well grows with its block-form text, and the pane's own port is the one scroller. | `capture-c12.json`, 4/4 gradient cells, asserted: at 5 stops (Generate's default) and at 8, the well's scrollHeight equals its clientHeight (5 stops: 237/237 at 1440, 206/206 at 390; 8 stops: 317/317, 274/274), overflow-y is `visible`, max-height `none`, no overflowing scroller wraps it, and the closing `)` sits inside the well's padding box. `well5-*.png`, `well8-*.png`. |
| V12C-02 (low) | **CURED in `snapFold`, one selector.** | The row right after a section head is no longer a fold candidate (`.configurator-row:not(.config-section-title + *)`). The fold therefore lands on the head's top, and the head scrolls in with its rows. No new class. | `capture-c12.json` fold probe: at Blob 1440 (light and dark), the last whole item above the fold is the Eccentricity row (port 389px, footer margin 42px), not a head. `orphanHead` is false in all 8 Blob and Atmosphere cells. At 390, the column does not scroll. `blob-1440-*.png`. |
| V12C-03 (low) | **CURED: one inline-code rule.** | `Markdown.vue`'s accent-chip selector is `:not(pre) > code` in place of `p > code, li > code`, so a label's chip inside `<strong>` speaks the prose's register. The bold labels keep their backticks. | `capture-c12.json` About probe, lab, LCh and OKLCh at 1440/390 in light and dark: `strong > code` and the prose chips share one padding-inline (4px) and one accent ink (light `oklch(0.305 0.122 9.8)`, dark `oklch(0.958 0.021 9.8)`). `oneRegister` is true in all 12 readings. `about-lch-*.png`. |
| V12C-04 (low) | **CURED in the content.** | `lch.md` and `oklch.md` Components, and `hsv.md`'s hue note, set their numerals as prose in the list's body voice, for example `0 (black) to 100 (diffuse white)` and `90 = yellowish`. Code stays for the symbols (`L`, `a*b*`). | The About probe counts **0** numeral chips per Components item in lab, LCh and OKLCh, at every cell. |
| V12C-05 (low) | **CURED by deletion.** | The `### Attributes` list is deleted from all 11 docs. The nutrition label is the summary, and Components is the explanation. | The About probe reads no `Attributes` heading in lab, LCh and OKLCh. The h3 run now opens on Historical Context or Background. |
| V12C-06 (trivial) | **No change (as the critic allows).** | The 4px `mx-1` on inline math stays. | — |
| V12C-G1 (medium) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING and O-88 DOCK-COLLAPSE-MOTION.** | The rows are the bead, the dock (rim, halo, 390 bulge, collapsed tile), the card, menu and name-field rim stacks, Mix's disabled primary, the thumbless scrubber rails and the light plate's dark veil ink. There is no local override. | Re-judged at the 10.2.0 repin. |

**Census** (`census-after.json`, `--base :9331 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** byOwner, glass: 788 layers, 368 inset highlights, 8 drop-shadows, 22 control gradients. Max 6 layers on one element; floater max 8. All identical to pass 11.
- **Consumer:** 116 single layers, and 0 on every allowance line. Looping animations: 0.
- Computed elements: 5304. The drop comes from the deleted Attributes lists.

**Frames.** Headless real Chrome (§0ei). `capture-c12.mjs` uses one browser for the run and a new context per cell, and closes both in a `finally`. It took 40 of 40 route cells (10 routes × 1440/390 × light/dark), plus `well5-*`, `well8-*`, `about-lab-*` and `about-lch-*` (4 each). The guarded dev server on :9331 was stopped, and nothing from this seat is left running. The served tree also carried other seats' uncommitted hunks.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1237/1242 ×2, with the same 5 standing failures (ink D6 ×2, T-35 ×3). The failure lists are identical across runs.
- **e2e** (headless, workers 1, own server :9342, `gates/specs.txt`): smoke, 12 specs. Pass 11's 7, plus `o10-type-locks`, `o11-header-gates` and `o18-contrast-census` (the About chips), and `x-w7l-detached` and `companion-pane-track-start` (the config folds). **80 passed ×2**, with the same 6 failed ×2. All 6 are the standing class (c′) o18 cells homed by id to X-W10, the same list as `DS/close/value/e2e-smoke-fails-1.txt`. None reads a changed surface.
- No visual golden was re-baselined. The `e2e/visual` goldens were not run. At the next visual run, the Gradient CSS well (now uncapped), the config folds and the About card will differ, and need a named owner-ruling re-baseline (§0ej).

**Loop state.**
- Every consumer row from V12C is cured or ruled no-change.
- For the next critic:
  - judge the uncapped well's height for a long user-typed stop list at 390;
  - judge whether `oklch.md`'s Disadvantages line (`` `0`–`1` ``, `` `0`–`100` ``) should follow V12C-04's prose ranges. It is outside Components and was left as it is.
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin.

### pass 13 (2026-10-18): critic V13C — the Easing intervals are one divided panel, OKLCh's ranges are prose, and the pointer-pick focus ring is glass's

Critic V13C named one low consumer row (V13C-02), one trivial (V13C-03) and two glass rows (V13C-01 low, V13C-G1 medium). Both consumer rows are cured at the root. The glass rows stay honest-RED on O-87 / O-88. Evidence is in `pass-13/c13-2026-10-18/` (`pass-13/` already holds an earlier seat's pass 13).

**Commits.** value.js `b03948c00` (the cure: 2 paths) and `090a5895e` (frames, capture, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-13/c13-2026-10-18/`) |
|---|---|---|---|
| V13C-01 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING.** | reka's Select restores focus to the trigger on close, and Chrome carries `:focus-visible` to it after a pointer pick. The cure belongs in glass's `SelectContent` close-auto-focus (prevent the default, then `trigger.focus({ focusVisible: false })` when closed by pointer), so every consumer inherits it. `ColorSpaceSelector.vue`'s `:focus-visible` rule is correct for the keyboard and stays. No local per-instance handler is added. | Read, not cured: `capture-c13.json` (`v13c01_afterPointerPick`): after a mouse pick of OKLCh in the About card, the trigger is `document.activeElement`, matches `:focus-visible`, and carries the 2px + 8px ring. This is the same in all 4 cells. |
| V13C-02 (low) | **CURED in `GradientEasingEditor.vue`, by deletion.** | `.easing-panel` carries the one edge: `border-card-edge`, `--radius-card` (the outer rung, now on the panel) and `overflow-hidden`. The rows drop their own border, overflow and radius, and the panel drops its 8px gap. The divider is glass's own `.disclosure-item` block-end hairline, given the card-edge ink, so no new divider rule is minted. The last row drops it (`last:border-b-0`), because the panel's edge closes the list. The square hover plate (VC7-01), the specimen dots, the curve glyph and the expanded body are kept. | `capture-c13.json`, 4/4 gradient cells, asserted at 5 stops and at 8: rows = n−1; the panel is 1px card-edge at 16px with overflow hidden; 0 rows carry a side or top border; n−2 rows carry a 1px block-end in the panel's ink; the last row's is 0; the row gaps are 0. At 8 stops the panel is 317px tall, against seven separate capsules before. `easing5-*.png`, `easing8-*.png`. |
| V13C-03 (trivial) | **CURED in the content.** | `oklch.md` Disadvantages reads "The 0–1 lightness scale differs from Lab/LCh's 0–100", as V12C-04 ruled. `hwb.md`'s `1` inside the W + B constraint stays. | `capture-c13.json` About probe, OKLCh: 0 numeral-only chips in the whole doc, and 0 `code` in the Disadvantages line, in all 4 cells. `about-oklch-*.png`. |
| V13C-G1 (medium) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING and O-88 DOCK-COLLAPSE-MOTION.** | The rows are the bead, the dock (rim, halo, 390 bulge, collapsed tile), the card, menu and name-field rim stacks, Mix's disabled primary, the thumbless scrubber rails and the light plate's dark veil ink. There is no local override. | Re-judged at the 10.2.0 repin. |

**Census** (`census-after.json`, `--base :9351 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** byOwner, glass: 788 layers, 368 inset highlights, 8 drop-shadows, 22 control gradients. Max 6 layers on one element; floater max 8. All identical to pass 12.
- **Consumer:** 116 single layers, and 0 on every allowance line. Looping animations: 0. Computed elements: 5304.

**Frames.** Headless real Chrome (§0ei). `capture-c13.mjs` uses one browser for the run and a new context per cell, and closes both in a `finally`. It took 40 of 40 route cells (10 routes × 1440/390 × light/dark), plus `easing5-*`, `easing8-*`, `well5-*`, `well8-*`, `about-lab-*`, `about-lch-*` and `about-oklch-*` (4 each). The guarded dev server on :9351 was stopped, and nothing from this seat is left running. The served tree also carried other seats' uncommitted hunks.

**Gates** (`gates/README.txt`).
- **Type-check:** 0 ×2.
- **vitest:** 1237/1242 ×2, with the same 5 standing failures (ink D6 ×2, T-35 ×3). The failure lists are identical across runs.
- **e2e** (headless, workers 1, own server :9362, `gates/specs.txt`): smoke, 15 specs. Pass 12's 12, plus `o17-easing-composition`, `o27-focus-affordance` and `o29-scene-contracts` (the Easing panel). **96 passed ×2**, with the same 5 failed ×2. All 5 are the standing class (c′) o18 cells homed by id to X-W10, a subset of pass 12's six (the A-1 dark cell passed both runs). None reads a changed surface.
- No visual golden was re-baselined. The `e2e/visual` goldens were not run. At the next visual run, the Gradient Easing panel and the OKLCh About card will differ, and need a named owner-ruling re-baseline (§0ej).

**Loop state.**
- Every consumer row from V13C is cured.
- For the next critic:
  - judge the divided Easing panel with one row open: the expanded body sits between two hairlines inside the panel;
  - judge the panel's hairline weight against the section rules above and below it.
- The glass rows (V13C-01, V13C-G1) wait on O-87 / O-88 at the 10.2.0 repin.

### pass 14 (2026-10-18): critic V14C — the bezier handles share the plot's box, the specimen strip speaks the caption rung, the open rail drops its plate, the hue unit reads "deg"

Critic V14C named one high consumer row (V14C-01), one medium (V14C-02) and two low (V14C-03, -04). It also named three glass rows (V14C-G1 medium, -G2 low, -G3 medium) and one carried consumer row (V14C-R1 low). The four consumer rows are cured at the root. The glass rows stay honest-RED on O-87 / O-88. V14C-R1 stays as carried. Evidence is in `pass-14/c14-2026-10-18/` (`pass-14/` already holds an earlier seat's pass 14).

**Commits.** value.js `02f571d59` (the cure: 5 paths) and `89d833765` (frames, capture, falsifier proof, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-14/c14-2026-10-18/`) |
|---|---|---|---|
| V14C-01 (high) | **CURED: the cap moves to the shared box.** | `EasingAuthoringStage.vue` Law 3: `inline-size: min(100%, 19rem)` now sits on the producer's canvas wrapper, the picker root's first child (`[data-slot=easing-picker] > div:has(> [data-slot=easing-curve])`). That box holds the curve, its 0/1 labels and the absolute `easing-handles` overlay. The svg keeps only the aspect rule, and `margin-inline: 0 !important` is deleted. No new wrapper. | `capture-c14.json` `tune`, 4/4 cells: at 1440 the stage is 452, and the svg, the wrapper and the curve root are all 304. At 390 all three are 288. Both handles sit 0/0 px from the plot's CTM mapping of their (cx, cy): linear's corners (267,527) and (521,273) at 1440. The "1" label sits 4px inside the plot's top-right. `tune-*.png`. **Falsifier**: `o17` adds "handle registration" at 1440 and 390, GREEN. `falsifier-v14c01.txt` proves it fails on the old rule: with the svg-only cap injected, the wrapper is 426 against the plot's 304, both handles are 61px off, and the falsifier is RED. |
| V14C-02 (medium) | **CURED in `EasingSpecimenStrip.vue`.** | The family heading and tile names are on `--text-caption` in `--ink-muted`. The 9px mono, the 0.08em tracking and the `opacity: 0.75` are deleted. Headings are in sentence case (`CSS`, `Sine`, `Quad`…). Each tile is a plain column cell: the disc (glass Chip, curve only), then its name. `title` and `aria-label` carry the id. Variant names stay as-cased: they are the CSS keyword fragments (`ease`, `in-out`), the literal's own spelling. | `capture-c14.json` `strip`, 4/4 cells: headings and names compute 14.4px at 1440 and 12.2px at 390 (the caption rung), in Plus Jakarta Sans, with letter-spacing `normal` and opacity 1. 27/27 names sit under their discs, and none is inside one. Strip width 1480/1472, inside the FadingScroll port. `easing-open-*.png`. |
| V14C-03 (low) | **CURED in `GradientEasingEditor.vue`.** | The rail binds `rounded-md bg-well px-2 py-1` only while it holds the literal (`!tuneOpen`). With the stage open, the toggle sits flush right on the panel. No wrapper. | `capture-c14.json` `railClosed` / `railOpen`, 4/4 cells: closed, the rail has a well background, 4px 8px padding, a 6px radius and is 32px tall. Open, it is transparent, with 0 padding, radius 0, and 24px tall. `tune-*.png`. |
| V14C-04 (low) | **CURED in `ColorComponentDisplay.vue`.** | `.fig-unit` drops `font-variant: small-caps` and `letter-spacing: 0.04em`, and keeps the 0.55em muted italic index. TYPOGRAPHY-1 is a tranche-R treatment (R.W3 D1), not an owner ruling, so value-canon §2 Type governs. | `capture-c14.json` `unit`: the OKLCh hue unit reads `deg` (font-variant-caps `normal`, italic), and the console reads `9.8deg`. `about-oklch-*.png` shows "9.8 deg". |
| V14C-G1 (medium) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING.** | The specimen tiles' Chip material: the rim stack, the floating under-shadow, and the pressed radial gleam. No local override. | Re-judged at the 10.2.0 repin. |
| V14C-G2 (low) | **Glass-owned: honest-RED, cited on O-87 (ornament with no meaning).** | The EasingPicker canvas draws a steps staircase in the bezier regime. No local override. | Re-judged at the EasingPicker pass. |
| V14C-G3 (medium) | **Glass-owned: honest-RED, cited on O-87 / O-88.** | The bead; the dock (rim, halo, 390 bulge, collapsed tile); the card, menu and name-field rim stacks; Mix's disabled primary; the thumbless scrubber rails; the light plate's dark veil ink; and the pointer-pick focus ring (V13C-01). | Re-judged at the 10.2.0 repin. |
| V14C-R1 (low) | **Carried, no change (P4R-01-R).** | The dark rainbow title reads 2.65–2.82:1 on real pixels. It needs an ink-model unit (certify against the local field) or an owner call on the margin. No local fudge. | — |

**Census** (`census-after.json`, `--base :9371 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded; the first attempt was killed at the 60-min cap, `census-after-run1-killed.log`).
- **Verdict RED, on glass rows only (O-87).** byOwner, glass: 783 layers, 367 inset highlights, 7 drop-shadows, 22 control gradients. Max 6 layers on one element; floater max 8. This is 5 layers, 1 inset and 1 drop-shadow fewer than pass 13. No glass surface was touched, so that difference is not this cure's.
- **Consumer:** 116 single layers, and 0 on every allowance line. Looping animations: 0. Computed elements: 5294.

**Frames.** Headless real Chrome (§0ei). `capture-c14.mjs` uses one browser per run and a new context per cell, and closes both in a `finally`. It took 40 of 40 route cells over three runs: the 60-min guard cut run 1 at 26 cells, and the dev server's 90-min cap cut run 2. `capture-c14.json` merges them. It also took `easing-open-*`, `tune-*` and `about-oklch-*` (4 each).

**Gates** (`gates/README.txt`). The host ran at load 10–33 all day, with 5–16 min stalls of single tests against 30s budgets.
- **Type-check:** 0 ×2.
- **vitest:** the same 5 standing failures (ink D6 ×2, T-35 ×3) in both runs. Each run also has one load timeout, in a different file (generate-rail at 907s; byte-exact's beforeAll hook). Re-run alone, the two files are 32/32 ×2.
- **e2e** (headless, workers 1, one guarded call per spec, pass 13's 15 specs, plus rechecks). **NOT strict-GREEN ×2 on this host.**
  - Every non-standing failure is a setup, teardown or click timeout, or `ERR_CONNECTION_REFUSED` after a capped server expired. None is an assertion on a changed surface.
  - Clean full passes: `o17` 5/5 ×2, `gradient.spec` 12/12, `o21-gradient-rail` 10/10, `a11y-gradient-stop-grammar` 5/5 ×2, `o27` 6/6 ×2, `o29` 6/6, `o11` 6/6 ×2, `page-load` and `walk` ×2.
  - `o18`: 24 passed ×2, with the same five standing class (c′) cells as pass 13.
  - `o10b` timed out ×3 on an option click. A direct probe shows every option settles and the readout holds its 1-line lock with the new unit, and O-10b asserts only upper bounds.
- No visual golden was re-baselined. The `e2e/visual` goldens were not run. At the next visual run, the Easing strip, the authoring stage and the picker header unit will differ, and need a named owner-ruling re-baseline (§0ej).

**Loop state.**
- Every consumer row from V14C is cured. V14C-R1 is carried.
- For the next critic:
  - judge the strip's length now that names sit under the discs (1480px of scroll at 1440);
  - judge whether the in-disc-name drop the critic allowed is better, keeping `aria-label` plus `title`;
  - judge the open stage with the toggle flush above it.
- The gates owe one strict ×2 e2e pass on a quiet host.
- The glass rows (V14C-G1, -G2, -G3) wait on O-87 / O-88 at the 10.2.0 repin.

### pass 15 (2026-10-18): critic V15C — the plot centres in its stage, the open rail names what is open, the strip wraps where the pane holds it, the angle reads "deg"

Critic V15C named two medium consumer rows (V15C-01, -02), one low (V15C-03) and two trivial (V15C-05, -06). It also named two glass rows (V15C-04 low, V15C-G1 medium). All five consumer rows are cured at the root. The glass rows stay honest-RED on O-87 / O-88. Evidence is in `pass-15/c15-2026-10-18/` (`pass-15/` already holds an earlier seat's pass 15).

**Commits.** value.js `b8cf3fb18` (the cure: 4 paths) and `a8c77f79e` (frames, capture, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-15/c15-2026-10-18/`) |
|---|---|---|---|
| V15C-01 (medium) | **CURED in `EasingAuthoringStage.vue` Law 3.** | `margin-inline: auto` joins `inline-size: min(100%, 19rem)` on the shared capped box (`[data-slot=easing-picker] > div:has(> [data-slot=easing-curve])`). The plot, the handles and the 0/1 labels share that box, so they move together. One declaration, no wrapper. | `capture-c15.json` `tune`, 4/4 cells: at 1440 the stage content is 426 and the box 304, with gutters **61 / 61**. At 390 the box is 288 of 288, with gutters 0 / 0 (unchanged). Handles sit 0/0 px from the plot's CTM mapping in every cell, and the `o17` handle-registration falsifier is GREEN ×2. `tune-*.png`. |
| V15C-02 (medium) | **CURED in `GradientEasingEditor.vue`.** | The aria-hidden empty `flex-1` spacer becomes `<span class="rail-caption">Custom curve</span>`, on the strip's voice (`--text-caption`, `--ink-muted`). The pressed toggle now reads as that row's control. The well is not brought back: the producer keeps the one literal. | `capture-c15.json` `railOpen`, 4/4 cells: the label reads "Custom curve" at 14.4px (1440) and 12.2px (390), in the muted ink, centred on the toggle's row (within 2px). The rail is transparent with no padding, and the toggle is `aria-expanded="true"`. `tune-*.png`. |
| V15C-03 (low) | **CURED in `EasingSpecimenStrip.vue`.** | The FadingScroll port is an `inline-size` container. At `@container (min-width: 24rem)` the `.strip-row` wraps (`flex-wrap: wrap`, `width: auto`). The family hairline moves from a `border-left` to a `::before` centred in the 1.75rem column gap. `overflow: clip` on the wrapped row clips only the hairline of a family that opens a line, because it sits outside the 2px ring headroom. The 390 seat keeps the one scrolling line. Names under the discs (V14C-02) are kept. | `capture-c15.json` `strip`: at 1440 the 8 families sit in **4 lines**, with 8/8 inside the 452px port, no x-overflow and a strip 377px tall. At 390 there is 1 line, 1465px, in a 314px port (the scroll is kept). There are 27 names in every cell. `easing-open-*.png` shows the hairlines between neighbours only. |
| V15C-04 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING (ornament and hierarchy).** | The EasingPicker's readout is hard-coded `text-micro` in a quiet Button, with no `readout` prop. Ask glass to seat it on the mono-small rung, aligned with the controls, or to expose a `readout` prop so the consumer's rail can stay the one literal. No local override. | Re-judged at the 10.2.0 repin. |
| V15C-05 (trivial) | **CURED in the doc comment.** | The stale `:readout="false"` sentence is replaced. The comment now says the producer prints the literal while the stage is open, and points to the editor's readout-rail note. | — |
| V15C-06 (trivial) | **CURED in `GradientVisualizer.vue`.** | The Direction readout prints `{{ direction }}deg`, the CSS well's own spelling. `format-color.ts` is left alone, because its surface does not sit beside a `deg` literal. | `capture-c15.json` `direction`: "90deg" in 4/4 cells. `gradient-*.png`. |
| V15C-G1 (medium) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING / O-88 DOCK-COLLAPSE-MOTION.** | The same rows as V14C-G1..G3 and V13C-01: the bead; the dock (rim, halo, 390 bulge, collapsed bead); the card, menu and name-field rims; Mix's disabled primary; thumbless rails; the Chip's pressed gleam; the steps staircase in the bezier regime; and the pointer-pick focus ring. No local override. | Re-judged at the 10.2.0 repin. |

**Census** (`census-after.json`, `--base :9381 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** byOwner, glass: 788 layers, 368 inset highlights, 8 drop-shadows, 22 control gradients. Max 6 layers on one element; floater max 8. This is identical to pass 13. The one-layer, one-inset, one-drop-shadow difference from pass 14 is not this cure's, because no glass surface was touched.
- **Consumer:** 116 single layers, and 0 on every allowance line. Text-shadow 0; looping animations 0. Computed elements: 5304.

**Frames.** Headless real Chrome (§0ei). `capture-c15.mjs` uses one browser for the run and a new context per cell, and closes both in a `finally`. It took 40 of 40 route cells in one run, plus `easing-open-*` and `tune-*` (4 each). The guarded dev server on :9381 was stopped, and nothing from this seat is left running.

**Gates** (`gates/README.txt`). The host ran at load 21–42 through the e2e runs.
- **Type-check:** 0 ×2.
- **vitest:** 1237/1242 ×2, with the same 5 standing failures (ink D6 ×2, T-35 ×3) in both runs.
- **e2e** (headless, workers 1, one guarded call per spec, `gates/specs.txt`). **NOT strict-GREEN ×2 on this host.**
  - `o17` 5/5 ×2. `o21-gradient-rail` 10/10 ×2. `a11y-gradient-stop-grammar` 5/5 ×2. `o27` 6/6 ×2. `o29` 6/6 ×2. `page-load` 2/2 ×2.
  - `views/gradient.spec`: 11/12 in run 1 (a cold-server `paneSettled` setup timeout on the first test), 12/12 in run 2.
  - `o18`: 25 passed ×2, with the same five standing class (c′) cells as passes 13 and 14.
  - `walk` 0/1 ×2, plus 0/1 ×2 on recheck. Each failure is its single 30s budget expiring at a different step: the Extract click, the Mix click, and the first H1 wait before any navigation. None is an assertion, and walk never opens the Easing panel.
- No visual golden was re-baselined. The `e2e/visual` goldens were not run. At the next visual run, the Gradient pane will differ in four places, and needs a named owner-ruling re-baseline (§0ej):
  - the "90deg" Direction readout;
  - the wrapped strip;
  - the centred plot;
  - the "Custom curve" label.

**Loop state.**
- Every consumer row from V15C is cured. V14C-R1 (the dark rainbow title's margin) is still carried.
- For the next critic:
  - judge the wrapped strip's 377px height at 1440 against the rest of the open interval;
  - judge the 24rem container threshold at tablet widths;
  - judge the "Custom curve" label's voice beside the producer's own readout below it.
- The gates owe a strict ×2 e2e pass on a quiet host, with `walk` in particular.
- The glass rows (V15C-04, V15C-G1) wait on O-87 / O-88 at the 10.2.0 repin.

### pass 16 (2026-10-18): critic V16C — the frames are gated on paint, the wrapped strip is one table, the head glyph sits in a plot box

Critic V16C named two low consumer rows (V16C-01, -02) and one trivial (V16C-03). It also named one glass row (V16C-G1, medium). All three consumer rows are cured at the root. The glass row stays honest-RED on O-87 / O-88. Evidence is in `pass-16/c16-2026-10-18/` (`pass-16/` already holds an earlier seat's pass 16, critic V16).

**Commits.** value.js `9f29879b4` (the cure: 2 paths) and `79ad4bce4` (frames, capture, falsifier, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-16/c16-2026-10-18/`) |
|---|---|---|---|
| V16C-01 (low) | **CURED in the capture harness** (`harness.mjs`, copied from pass 15 and extended; the app was not at fault). **Pass 15's set is corrected to 38/40 valid.** | `paintGate(page, { hero })` runs after `bootRoute` and before every shot. It reads pixels, not the DOM: (1) the first pane card *in view* must hold edges (the fraction of adjacent pixel pairs whose luma differs by more than 24 must be at least 0.004; a smooth ground scores 0); (2) where the bead is seated (the picker at every width; palettes, mix and blob at 1440), hiding the bead's canvas must change its box by a mean of at least 3 RGB levels (an undrawn canvas changes nothing). It re-reads for up to 12 s, then throws. `capture-c16.mjs` then retries the cell in a new context, up to 3 attempts. The decode runs in the page, so no image library is added. | `capture-c16.json`: **40/40** cells, all on the first attempt and the first read. Card edge fraction 0.0128–0.0436; bead hide-delta 13.0–28.3 in all 10 bead cells. Pass 15's `atmosphere-1440-light` and `picker-390-dark` are re-shot under the gate, flagged `reshotFromPass15`, and listed in the manifest's `reshoot` note. Both are valid: pane, dock and bead present. **Falsifier** (`falsify-paint.log`): the gate passes both controls and refuses a page with a ground laid over it (edge 0) and a bead with an undrawn canvas (delta 1.04). |
| V16C-02 (low) | **CURED in `EasingSpecimenStrip.vue`.** | Under the container query, the strip is one grid with shared tracks, replacing the flex-wrap: `repeat(auto-fill, minmax(12.5rem, 1fr))`. One track holds the widest family below CSS (Cubic, with four tiles); CSS spans two. The family gap is one custom property, `--family-gap`, which the `::before` hairline reads, so the rule stays centred in the gap at both widths. The threshold moves to 26.5rem (two tracks, one gap and the 2px headroom), so the grid never falls to one column. The 390 seat keeps its one scrolling line, and the names stay under the discs. No wrapper. | `capture-c16.json` `strip` at 1440 (4/4 cells): grid with 2 tracks of 214px. Family heads sit at x **2 / 236** on every line, and there is **one** hairline column at x 226. 8/8 families are in the port, with no x-overflow. At 390: 1 line, 8 heads in a 314px port (the scroll is kept); 27 names in every cell. The probe (`probe-strip.mjs`) gives heads at 2/225 at 1024 and three tracks at 768. **Cost:** the strip is 5 lines (473px) at 1440 against pass 15's 4 ragged lines (377px). CSS's five tiles need a line of their own. |
| V16C-03 (trivial) | **CURED in `GradientEasingEditor.vue`.** | The head glyph gets the unit-square frame: one `<rect>` hairline in `--card-edge`, no fill, non-scaling stroke. A linear curve now reads as a diagonal in a plot box, not a "/". No lighting is added. | `capture-c16.json` `glyph` (4/4): the frame is present, stroke `--card-edge` (12 % ink), fill none, 1px. `gradient-*.png`, `easing-open-*.png`. |
| V16C-G1 (medium) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING / O-88 DOCK-COLLAPSE-MOTION.** | The same rows as V15C-G1 and V15C-04: the bead; the dock (rim, halo, 390 bulge, collapsed tile); the card, menu and name-field rims; Mix's disabled primary; thumbless rails; the Chip's glossy pressed disc and under-shadow; the steps staircase in the bezier regime; the producer readout on `text-micro`; and the pointer-pick focus ring. No local override. | Re-judged at the 10.2.0 repin and at the EasingPicker pass. |

**Census** (`census-after.json`, `--base :9391 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** byOwner, glass: 788 layers, 368 inset highlights, 8 drop-shadows, 22 control gradients. Max 6 layers on one element; floater max 8. This is identical to pass 15.
- **Consumer:** 116 single layers, and 0 on every allowance line. Computed elements: 5322.

**Frames.** Headless real Chrome (§0ei). `capture-c16.mjs` uses one browser for the run and a new context per cell, and closes both in a `finally`. It took 40 of 40 route cells, plus `easing-open-*` and `tune-*` (4 each). A first full run was stopped and discarded, not counted: its gate read the picker's off-screen card at 390 and asked for a bead on 390 routes that do not seat one. The guarded dev server on :9391 was stopped, and nothing from this seat is left running.

**Gates** (`gates/README.txt`). The host ran at load 22–28. Other seats committed palettes and platform hunks during the runs.
- **Type-check:** 0 ×2.
- **vitest:** run 2 is 1237/1242 with the standing 5 (ink D6 ×2, T-35 ×3).
  - Run 1 is 1235/1242: the standing 5, plus 2 in `plate-mass` at 390.
  - Those 2 read "Execution context was destroyed". Another seat's palettes commit hot-reloaded the harness page in the middle of the test. That file is not on the changed surface.
- **e2e** (headless, workers 1, one guarded call per spec, `gates/specs.txt`): every spec that reads the changed surfaces is **GREEN ×2**.
  - `o17` 5/5. `views/gradient.spec` 12/12. `o21-gradient-rail` 10/10. `a11y-gradient-stop-grammar` 5/5. `o27` 6/6. `page-load` 2/2.
  - `o23` is 0/1 ×2. This is the standing HSL row from pass 13, which has an at-HEAD falsifier. It is not on this diff's surface.
- No visual golden was re-baselined. The `e2e/visual` goldens were not run. At the next visual run, the open Easing interval (the two-track strip) and every interval head (the framed glyph) will differ, and need a named owner-ruling re-baseline (§0ej).

**Loop state.**
- Every consumer row from V16C is cured. V14C-R1 (the dark rainbow title's margin) is still carried.
- For the next critic:
  - judge the strip's five lines (473px at 1440) against pass 15's four ragged ones, including whether CSS should keep a line of its own;
  - judge the head-glyph frame's weight at `--card-edge` on the saturated light ground, where it is faint at 1×;
  - check that every frame's `paint` reading is in `capture-c16.json`.
- The gates owe `walk` and `o18` on a quiet host. They read no changed surface this pass, and were not run.
- The glass rows (V16C-G1) wait on O-87 / O-88 at the 10.2.0 repin.

### pass 17 (2026-10-18): critic V17C — the admin gold reads the certified ink, rebound to the ground it sits on

Critic V17C named one medium consumer row (V17C-01) and four glass rows (V17C-G1 low, -G2 low, -G3 trivial, -G4 low). The consumer row is cured at the token, with one named partial: the view menu's "Admin" row over live content, which is the glass floater's row. The glass rows stay honest-RED on O-87 / O-88. Evidence is in `pass-17/c17-2026-10-18/`.

**Commits.** value.js `bd72e216e` (the cure: 13 paths) and `e3a41b942` (frames, probe, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-17/c17-2026-10-18/`) |
|---|---|---|---|
| V17C-01 (medium) | **CURED at the token on the dock, the seal and the crown. PARTIAL on the view menu's Admin row** (its ground is glass's translucent floater, V17C-G2). | `.gold-shimmer-icon` becomes `.gold-ink` (`utils.css`), the one gold ink recipe, and paints `--ink-gold`, never raw `--color-gold`. The token is certified against the ground it sits on and rebound by scope, never per instance. **Root:** the resting plate (pass 15). **Dock:** `Dock.vue` certifies gold on the band's measured tint (`useChromeAccentFn` on `.dock-plate`) and sets `--ink-gold` on the dock's root. **Seal:** `--seal-ink-gold`, certified on the wax by a new `certifyInkOnFill` (`ink.ts`: the 3:1 glyph floor plus the house headroom), stamped by `useViewAccents`. **Menus:** `--ink-gold-floating` (`useContrastSafeColor`, stamped by `useAtmosphereBoot`), seated as `--ink-gold` on `.glass-floating` (`shell.css`). `ColorInput`'s crown joins the recipe and loses its post-hoc `opacity-75`. The `crown-appear` keyframe settles on `--ink-gold`. The view trigger's focus ring tints on `--ink-gold`. DESIGN.md Law C-4 names the rebinding. The hue is kept (§0dm), and only the lightness walks, to a bronze in light. | `v17.json`, pixel contrast read off the frame (ground = the median pixel of the glyph's box). **Falsifier:** the old rule is injected into the same page and re-read; it is RED. **Light, dock view trigger:** **5.45** (old rule **1.08–1.09**) at 1440 and 390. **Light, admin trigger:** **5.45** (old 1.08). **Seal, 1440:** **4.24** light (old 1.08) and **4.26** dark (old 1.05). **Dark, trigger:** 4.78, unchanged, because gold already clears there. The ink hue holds at 42–45° in every cell. **Menu Admin row, light:** the icon reads 1.94 over the picker's spectrum (old 3.31), and 2.83 over Browse (old 2.24). At that same spot the floater's own neutral ink reads **2.25** and **3.25**. No certified ink clears a ground that live content shows through, so this is V17C-G2's row (an opaque enough floating plate). **Menu, dark:** 5.62 / 4.12, unchanged. At 390 the dock does not idle shut, so the 390 seal is not framed. |
| V17C-G1 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING** (the de-slop ornament row). | Glass's EasingPicker always strokes both regimes (the steps ghost under the bezier curve) and owns the literal's type rung. Ask glass to draw the ghost only on hover or focus of the opposite toggle segment, or drop it, and to set the literal on the caption or mono-small rung. No local override. | Re-judged at the 10.2.0 repin. `tune-*.png`. |
| V17C-G2 (low) | **Glass-owned: honest-RED, cited on O-87 FLAT-LIGHTING.** | The floating plate's tint, blur and shadow let saturated content bloom behind the menu rows (floater max 8 layers). Pass 17 measures its cost: on the light view menu, the Admin row sits on dark red at the bottom of the floater, where neither the certified gold nor the floater's neutral ink can clear. No local override. | `overlays.json` (floater max 8, card menu 5). `card-menu-*`, `mix-select-*`, `admin-view-menu-*`. |
| V17C-G3 (trivial) | **Glass-owned: folded into O-87's existing bead row.** | The goo-blob satellite FSM (identity motion) was captured mid-emerge. No local cure. | `picker-1440-dark.png`. |
| V17C-G4 (low) | **Glass-owned: honest-RED on O-87 FLAT-LIGHTING / O-88 DOCK-COLLAPSE-MOTION** (the standing rows). | Unchanged from pass 16. | Census below. |

**Census** (`census-after.json`, `--base :9471 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** byOwner, glass: 788 layers, 368 inset highlights, 8 drop-shadows, 22 control gradients. Max 6 layers on one element; floater max 8. This is identical to pass 16.
- **Consumer:** 116 single layers, and 0 on every allowance line.

**Frames.** Headless real Chrome (§0ei). There is one browser per script run and a new context per cell, and both are closed in a `finally`.
- `capture-c17.mjs` is copied from pass 16's paint-gated capture. It took 40 of 40 route cells, plus `easing-open-*` and `tune-*`.
- `overlays.mjs` took the 8 overlay cells.
- `v17.mjs` took `admin-users-*` (4 cells), `admin-seal-1440-*` (2), and `admin-view-menu-*` and `admin-view-menu-browse-*` (4).
- The guarded dev server on :9471 was stopped, and nothing from this seat is left running.

**Gates** (`gates/README.txt`). The host ran at load 16–27.
- **Type-check:** 0 ×2.
- **vitest:** 1237/1242 ×2, with the standing 5 (ink D6 ×2, T-35 ×3).
- **e2e** (headless, workers 1, one guarded call per spec):
  - `smoke-admin` (the whole project) 25/25 ×2. `o15-dock-register` 6/6 ×2. `w12-dock` 6/6 ×2. `page-load` 2/2 ×2.
  - **`o18`: 25/30 in run 1, 26/30 in run 2.** Four rows are standing and identical to pass 15: F-3 graph nodes (dark), T-35 identity (light), and N-3 profile menu rows (light and dark).
  - The A-1 admin-pill row was born RED by arithmetic on raw gold. **It is GREEN in run 2.** In run 1 it read the ink through an opacity chain at 0 (ink equal to ground) against the bare ambient. Its stack is empty because the instrument does not see the dock's `.dock-plate` layer. That is a timing-sensitive instrument; the frame reading is this cure's witness.
- No visual golden was re-baselined. At the next visual run, the light admin-mode dock cells (the trigger, the admin trigger and the seal, now bronze in place of raw gold) need a named owner-ruling re-baseline (§0ej).

**Loop state.**
- V17C-01 is cured on every ground the consumer owns. The menu row is partial, and it waits on V17C-G2.
- V14C-R1 (the dark rainbow title's margin) is still carried.
- For the next critic:
  - On a mid-dark band (the e2e owner brown), the band-certified gold walks to near white (`oklch(0.9995 0.0005 84.2)`), and the gold hue no longer reads. Judge whether the gold should stop at the lightest point that still holds chroma. That would be a floor-without-headroom rung, in the same way as the T-35 identity leg.
  - The o18 A-1 instrument should composite the band's `.dock-plate` and read the ink after the dock's morph settles.
  - The 390 seal is unframed, because the mobile dock does not idle shut.
- The glass rows (V17C-G1..G4) wait on O-87 / O-88 at the 10.2.0 repin.

### pass 18 (2026-10-18): critic V18C — the admin gold holds its hue, the error plate's red is certified, the admin consoles say their name once, the head glyph drops its frame

Critic V18C named four consumer rows (V18C-01 medium, -02 low, -03 low, -04 trivial) and two glass rows (V18C-G1 low, -G2 low). All four consumer rows are cured at the root. V18C-01 has one named deviation from the asked cure: the dock band keeps the house headroom, because the frame refuted the premise that it needs none. The glass rows stay honest-RED on O-87 / O-88. Evidence is in `pass-18/c18-2026-10-18/`.

**Commits.** value.js `22782b1cb` (the cure: 17 paths) and `4980c6fa9` (frames, probes, census and gates). This receipt is committed after them.

| id | verdict | cure / reason | measured (`pass-18/c18-2026-10-18/`) |
|---|---|---|---|
| V18C-01 (medium) | **CURED at the token. One named deviation: the headroom stays on the band.** | **One rule in `ink.ts`, `certifyIdentityInk`**, inherited by every gold twin (root, floating, dock band). The ladder: (1) the house certify, kept only while it holds `IDENTITY_CHROMA_HOLD` = 0.4 of the source chroma (gold: C ≥ 0.059); (2) else the most chromatic ink on the far side of the ground that clears the same target; (3) else the ground's own plate ink, so a word speaks the plate's voice. **Glyphs read a glyph rung**, `--ink-gold-glyph`. The `.gold-ink` recipe paints it on `svg.gold-ink` / `.gold-ink svg`, and so do the crown keyframe and the featured badge. On the band it certifies at the 3:1 graphics floor (`Dock.vue`), on the seal it is the wax gold, and on the modelled plates it is the word's rung where that holds, else the graphics floor (`useContrastSafeColor`, stamped by `useAtmosphereBoot`, seated on `.glass-floating` in `shell.css`). **Deviation:** the critic asked for no headroom on the MEASURED band. Only the band's tint is measured; the ambient under it is modelled achromatic. With no headroom, the frame read the light band's glyph at **2.84** and its word at **4.23**, both under their floors (`v18-noheadroom.log`). A rung that trades headroom for chroma read the brown band's word at **4.31** (`v18-hold-bisect.log`). Both were refused. DESIGN.md Law C-4 names the rule. | `v18.json`, the painted ink's oklch per site and the frame ratio. **Owner brown (lab(38% 32 24)), light:** view trigger and shield **C 0.001 → 0.106**, h 84.2, **3.79:1**. The word falls back to the plate ink (5.13:1). The pass-17 band gold (`oklch(0.9995 0.0005 84.2)`), re-injected in the same page, reads RED on every site. **Default light:** glyphs **C 0.064 → 0.080** (L 0.31 → 0.39) at **4.02:1**. The word stays bronze, C 0.064 at 5.45:1 (≥ 0.06 per the witness), the gold that clears text on that ground. The seal is 4.24, C 0.084. **Dark:** unchanged, gold C 0.143, 4.78 to 5.05. **Featured badge (Browse, light):** 3.48:1, C 0.0597, which is pass 17's bronze, unchanged (by 0.0003 under the critic's 0.06; within the code's hold). **View menu, light:** the Admin word falls back to the floating plate ink (the named fallback); the shield keeps the gold (C 0.073) but reads 1.44:1 over live content. That is V18C-G2's floater, where the floater's own neutral ink reads 2.25. The 390 trigger reads 4.02. The 390 admin trigger is desktop-only, and the 390 seal does not idle shut. |
| V18C-02 (low) | **CURED at the token.** | `--ink-destructive`: glass's `--destructive` certified on the resting plate (`useContrastSafeColor`, the modal twin's sibling), stamped by `useAtmosphereBoot` and seated as `--destructive` on `.pane-wrapper` (`shell.css`). `EmptyState`'s alert glyph reads it at full strength; the `/80` is dropped. The plate's error lines inherit the same token (ExtractWorkbench, BrowsePane, GradientCodeEditor, SearchFilterBar, AdminTagsPanel). It certifies at the text floor because it carries text; the glyph clears 3:1 a fortiori. | **Not Found:** **1.74 → 5.11** (1440 light), **1.71 → 5.05** (390 light), **2.87 → 3.99** (1440 dark), **2.89 → 4.02** (390 dark). **Admin tags error plate:** 1.76 → 5.23 light, 2.80 → 3.83 dark. The old rule (raw red at 80 %) re-injected reads RED in every cell. |
| V18C-03 (low) | **CURED.** | The five admin regions are `titled: true` (`viewSchema.ts`). `AdminPane` passes `:title`, and its `#title` slot is deleted (it existed for the count chip that V15-02 removed). The pane title is now the route's one `<h1 id=route-title>`, and App prints no caption. No new component. | One visible H1 inside `<main>`, `route-title`, text equal to the view label, no caption, on all 5 consoles at 1440 and 390 (`v18.json` `admin[]`, 12 rows GREEN). |
| V18C-04 (trivial) | **CURED (deleted).** | The `head-glyph-frame` rect and its style are gone. The glyph sits in a labelled row. | `gradient-*`: capture manifest `glyph.frame: false`. |
| V18C-G1 (low) | **Glass-owned: honest-RED on O-87 FLAT-LIGHTING**, folded into V1C-G4 (Chip `data-state=on` lit, not toned). | No local override. Re-judge at the 10.2.0 repin. | `easing-open-*`. |
| V18C-G2 (low) | **Glass-owned: honest-RED on O-87 / O-88** (the standing rows: the SegmentedTabs indicator overhang, the floater bloom, the EasingPicker ghost, the bead, the dock, the census rows). | No local override. | Census below. |

**Census** (`census-after.json`, `--base :9481 --widths 1440 --themes light,dark --settle 15000 --gpu`, guarded).
- **Verdict RED, on glass rows only (O-87).** It is identical to pass 17: glass 788 layers, 368 inset highlights, 8 drop-shadows, 22 control gradients, max 6 layers on one element, floater max 8.
- **Consumer:** 116 single layers, and 0 on every allowance line.

**Frames.** Headless real Chrome (§0ei). There is one browser per script run and a new context per cell, and both are closed in a `finally`.
- `capture-c18.mjs` took 40 of 40 route cells on the first attempt, plus `easing-open-*` and `tune-*`.
- `overlays.mjs` took the 8 overlay cells.
- `v18.mjs` took the witness cells.
- `nav.mjs` probed the admin hash walk (see Gates).
- The guarded dev server on :9481 was stopped, and nothing from this seat is left running.

**Gates** (`gates/README.txt`). The host ran at load 32–41.
- **Type-check:** 0 ×2.
- **vitest:** 1242/1247 ×2. The standing 5 are unchanged; the 5 new `certifyIdentityInk` cases pass.
- **e2e** (headless, workers 1, one guarded call per spec):
  - **GREEN ×2:** o15 6/6, w12-dock 6/6, page-load 2/2, w12u-x-admin-tags 6/6.
  - **o17:** 4/5 in run 1, a click timeout under load; 5/5 in run 2.
  - **o18:** the four standing rows only. The A-1 admin pill is GREEN in both schemes in run 1. In run 2 it is RED in dark with ink equal to ground at stack []. This is pass 17's instrument fault, and the dark gold is unchanged.
  - **views/gradient:** cold-route timeouts in openView/paneSettled (9–11 of 12). An A/B run on the HEAD demo fails 4 of 12 the same way (`gates/ab-head/`). It is not this cure.
  - **smoke-admin:** 23/25 ×2. admin-populated read the Users title at level 2. V18C-03 makes it the level-1 H1 by design, so the leg is re-read at level 1 (a named spec re-baseline in `22782b1cb`); it is GREEN after.
  - **admin-walk is RED:** after hash navigation from users to names, the Names region renders EMPTY. A/B: with every pass-18 demo path restored to HEAD, it fails the same way, at the Names control step (`gates/ab-head/admin-walk-HEAD-demo-error-context.md`). **This was pre-existing at HEAD during this run, not this cure. Carried.**
- No visual golden was re-baselined. At the next visual run, two sets of cells need a named owner-ruling re-baseline (§0ej):
  - the light admin dock glyphs (the bronze moves from L 0.31 to L 0.39 / C 0.080);
  - the five admin console heads (the caption is gone and the title is the H1).

**Loop state.**
- V18C-01..04 are cured.
- For the next critic:
  - (a) The admin-walk empty Names pane after users → names hash navigation is pre-existing at HEAD. It has no owner in this pass, and a router or KeepAlive seat should take it.
  - (b) On a mid-L plate (the owner brown), `--ink-destructive` walks to near white (C 0.007). It is legible, but the red no longer reads. Judge whether the destructive twin should join `certifyIdentityInk`.
  - (c) The o18 A-1 instrument should composite the band's `.dock-plate` (carried from pass 17).
  - (d) The light view menu's Admin row waits on V18C-G2.
- The glass rows wait on O-87 / O-88 at the 10.2.0 repin.

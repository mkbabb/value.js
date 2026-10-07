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

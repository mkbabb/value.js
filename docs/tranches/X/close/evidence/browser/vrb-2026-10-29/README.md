SERVED MODEL: claude-opus-5-5

# X.W11.vrb — attribution of the G7 visual reds to the Fraunces woff2 (COHESION §0gv.2)

Gate: "one route diffed before/after `c364c6bf6`, changed pixels inside Fraunces runs".

## Method

- Scratch worktree `.worktrees/vrb-att` detached at `c364c6bf6^` (`7edbfc05c`); the product diff
  `961cf807e..c364c6bf6^` (demo src plugins e2e/visual vite.config.ts package.json) is empty, so
  this is the last visual-GREEN product tree.
- A scratch spec (never committed) photographs `/#/` (picker) and `/#/palettes` at 1024 light
  through the suite's own `gotoRoute` + `visual.shot` path (capture.css, quiescence, SwiftShader,
  `--project=visual`, darwin), then dumps every text node's client rects with its computed
  `font-family` and `font-variant-numeric` (`*-text-runs.json`).
- BEFORE: minted at `c364c6bf6^` (`--update-snapshots=all`, scratch goldens).
  AFTER: the same worktree with only `demo/app/public/fonts/fraunces-latin-normal.woff2` checked
  out from `c364c6bf6` (the commit's only shipped byte), compared against BEFORE, x2 (attempt + retry).
- `mask.py` (scratch): every pixel whose RGBA differs at all between BEFORE and AFTER, tested
  against the Fraunces text-run rects (padded 2 CSS px). Green = inside a Fraunces run,
  red = outside, blue = the run boxes.

## Result

| route · 1024 · light   | Playwright diff (threshold 0.15), attempt / retry | raw changed px | inside Fraunces runs | outside | changed bbox (px) | runs hit                                                |
| ---------------------- | ------------------------------------------------- | -------------- | -------------------- | ------- | ----------------- | ------------------------------------------------------- |
| picker `/#/`           | 674 / 674                                         | 1732           | 1732                 | **0**   | [52,190,290,216]  | `73` `.0` `0` `.2` `2` (all `lining-nums tabular-nums`) |
| palettes `/#/palettes` | 687 / 687                                         | 1748           | 1748                 | **0**   | [45,187,284,213]  | `73` `.0` `0` `.2` `2` (all `lining-nums tabular-nums`) |

The 674 / 687 counts equal the CI visual job's own per-cell counts at `8a98adc7d`
(job `123589725494`: `674`, `686`/`687` among its 68 reds). Every changed pixel lies in the
picker readout's tabular-figure runs: the `.tf` composites now centre their varying outline in
the 1340-unit cell (§0gu.4), so each digit moves inside an unchanged advance. No pixel outside a
Fraunces run moves.

Files: `*-before.png` · `*-after.png` · `*-pwdiff.png` (Playwright's diff) · `*-mask.png` ·
`*-attribution.json` · `*-text-runs.json`.

## The HEAD mint equals the c364c6bf6 capture

The HEAD (`a8894d19f`) re-mint of `at-rest · 1024 · {picker,palettes} · both · light` is
pixel-identical to the AFTER capture above (0 differing pixels in either cell). Against BEFORE it
differs by exactly the readout digits: picker 1732 px in bbox [52,190,290,216], palettes 1748 px
in [45,187,284,213]. So no product byte after `c364c6bf6` (`c55697493` Tags, `51a2a6334`
comments, `d65ead3a6` the `.wk3` well) moves a pixel in these cells.

The committed goldens (minted earlier, on the `17bda9aba` / `67ced8038` lineage) differ from a
fresh capture at the last-GREEN tree by 111 px over a channel delta of 24 in 19 small clusters,
plus sub-threshold noise. That is the suite's standing capture drift, which sits inside
`maxDiffPixels` 120 and is not caused by any product change. The re-mint carries it with the
new pixels, as every E14-lineage mint has.

## Census at HEAD and the counterfactual (every red attributed)

- **HEAD census + mint** (`.worktrees/vrb-mint` at `a8894d19f`, clean pixel scope):
  `VJS_VISUAL_PORT=8299 guarded --timeout 90 -- node scripts/visual/regenerate-goldens.mjs --accept`
  → `216 passed (17.7m)`. `--update-snapshots` rewrites only the cells that fail, and it rewrote
  **68**. That is the same 68-cell set as CI job `123589725494` (`68 failed · 148 passed` at
  `8a98adc7d`): at-rest 24 (picker/palettes/mix/blob × 390/1024/3440 × light/dark), palette-card
  12, modality 24 (zoom-200, reduced-motion, forced-colors, rtl-desktop, rtl-mobile and
  keyboard-focus, × picker/palettes/mix/blob), and states 8 (seeded-storage 3, overlay 2,
  param-sweep 3). Every one of them shows the picker readout's tabular digits.
- **Counterfactual** (`.worktrees/vrb-cf` at the same HEAD, with only
  `fraunces-latin-normal.woff2` ← `c364c6bf6^` and `AdminTagsPanel.vue` ← `c55697493^`, against
  the **un-re-minted** goldens): `guarded --timeout 90 -- npx playwright test -c
e2e/visual/visual.config.ts --project=visual --retries=0` → **`216 passed (16.3m)`**.
  Removing those two bytes alone turns every red GREEN, so no other product change since the last
  GREEN moves a cell past tolerance. That covers `.wk3`'s `d65ead3a6` well lift,
  `useContrastSafeColor` and `useAtmosphereBoot`, and the `51a2a6334` comments.
- **Split between the two bytes:** none of the 68 is an admin cell. The `/admin/tags` cells
  pass at HEAD against their existing goldens, so `AdminTagsPanel.vue` accounts for **0** of
  them and the woff2 for **68**.
- **No diff outside a Fraunces run or the Tags panel** → nothing to escalate under §0gv.2.
- `CENSUS.tsv`: per cell, the count of pixels whose channel delta exceeds 24 between the old and
  new golden, and their bbox. The wider bboxes in the at-rest and palette cells are the standing
  capture drift described above (measured at the last-GREEN tree for picker · 1024 · light). The
  counterfactual, not the bbox, is the attribution proof.

## Anchor drift, recorded (INTENT at the true bytes)

- §0gv.2 says to re-mint "in the CI-equivalent Linux image". At the bytes, the CI `visual` job
  runs on `runs-on: macos-15` (`.github/workflows/ci.yml:193-195`). The goldens live at
  `e2e/visual/goldens/{platform}/` = `darwin/` (`e2e/visual/visual.project.ts:69`), and no
  linux golden set exists; a linux mint would be refused by the `{platform}` path. So the
  CI-equivalent image is darwin with SwiftShader, which is how this Mac minted every E14-lineage
  set. The renderer slug `angle-google-vulkan-1-3-0-swiftshader-device-llv-be9edeaf` is read
  live and is unchanged.
- The brief's `e2e/visual/**/MANIFEST.json` names no file at the bytes. The golden manifest is
  `docs/tranches/X/evidence/w1/visual/MANIFEST.json`, the file `golden-integrity.spec.ts:48`
  reads and `regenerate-goldens.mjs` writes. That is the file re-derived here (68 sha256/bytes
  entries plus `totalBytes`, and nothing else).
- `maxDiffPixelRatio` is not set anywhere in the visual tolerance. The bar is the absolute
  `maxDiffPixels` in `e2e/visual/tolerance.ts`, and that file is untouched.

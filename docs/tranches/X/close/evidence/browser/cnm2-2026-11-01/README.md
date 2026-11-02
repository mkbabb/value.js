SERVED MODEL: claude-opus-5-5

# X.W11.cnm2 — the resting accent's hue-bounded maximin (COHESION §0gz.1, ESC-W11cnm-1 arm (a))

Cure commit `1ccd03f06` (`demo/color-session/ink.ts` `resolveRestingAccentReferent` · `useContrastSafeColor.ts` `certifyRestingAccentInkOnce`, read by `--accent-live` and every `useSafeAccentFn("resting")` consumer · `test/ink.test.ts`). Subject, instrument and default seed as in `../cnm-2026-10-31/README.md`.

## The walk (`probe/walk.test.ts` → `runs/walk.txt`)

The referent moves from the field mean toward `resolveFieldPlateReferent` (bisected, 16 steps) only while the certified ink keeps `IDENTITY_CHROMA_HOLD` 0.4 of the pick's chroma. The floor (4.5) and `CERTIFY_HEADROOM` (1.25) are the house certify's own and byte-equal (unit lock).

| referent | ink | C / pick | vs cnm GPU ground | vs cnm docker ground | over the model's darkest stop (Y 0.182) |
|---|---|---|---|---|---|
| mean 0.7900 (HEAD) | rgb(92,0,43) | 0.672 | 4.078 | 5.022 | 3.114 |
| **hue-bounded (cnm2)** | **rgb(42,0,16)** | **0.404** | **5.494** | **6.766** | **4.196** |
| plate 0.6218 (refused: drains the hue) | rgb(0,0,0) | 0.075 | 6.076 | 7.482 | 4.640 |

The model's per-stop grounds (the resting plate over each stop's luminance lightness, `[cnm2-model]` lines): the mean's ink reads 3.147 / 4.472 / 6.647 / 9.322, and the hue-bounded ink reads **4.240** / 6.025 / 8.955 / 12.559 over stops L 0.630 / 0.737 / 0.843 / 0.950.

## Unit lock (`test/ink.test.ts`, describe "the resting accent walk is a hue-bounded maximin")

- BEFORE (`runs/unit-before.txt`, HEAD `ink.ts` swapped in): 3 RED (`resolveRestingAccentReferent is not a function`), 1 GREEN (the constants are byte-equal).
- Mutant (`runs/unit-mutant-mean.txt`, the referent forced to the mean): 3 RED on assertions (`expected 49 to be less than or equal to 2`, and others).
- AFTER (`runs/unit-after.txt`): `42 passed (42)`. Full vitest `--maxWorkers=2` ×2 (`runs/vitest-full-r{1,2}.txt`): `1515 passed (1515)` each.
- A first wiring that certified inside `ink.ts` broke `demo/test/color-session/colour-frame-cost.test.ts:179`, the OD19-V3 cost lock (one walk per rung per frame), with 1 call where 2 were expected. The landed form returns the referent and certifies through the composable's one memoised walk, so the lock is unedited and GREEN.

## The o18 leg (`e2e/smoke/oracles/o18-contrast-census.spec.ts`, "O-18 census · the default-seed component name on its real ground")

This is the cnm instrument as an oracle. The ink is the settled computed colour on the 8-bit grid. The ground is the glyph-masked plate under the name's line boxes, with the mask asserted at the DOM. The verdict is the worst sample over three frames, against `TEXT_FLOOR` 4.5. Legs: light, dark and light-reduce, all at 1440×900.

| cell | product | light | dark | light reduce |
|---|---|---|---|---|
| GPU (ANGLE Metal, Apple M5 Max, Chrome 156.0.8078.80), `probe/gpu.sh` | pre-cure (`1ccd03f06^`) | **3.8853 · 3.9932 RED** | 5.0894 · 5.2922 | **4.1000 ×2 RED** |
| GPU | `1ccd03f06` | 5.3798 ×2 | 5.2231 · 5.1193 | 5.5237 ×2 |
| docker Linux Chromium (`mcr.microsoft.com/playwright:v1.60.0-noble`), `probe/go.sh` | `1ccd03f06` | 6.7656 ×2 | 5.0165 ×2 | 6.7656 ×2 |

O-18 + SS8-0440 keep (`O-18|SS8-0440` over o18 and `ss8r-ruled-rows.spec.ts`):
- docker `keep-r{1,2}.json`: `expected 39 · unexpected 0` ×2 (36 banked + the 3 new legs).
- GPU `gpu-keep-r{1,2}.json`: `expected 40 · unexpected 0` ×2 (the same 39 + the renderer read).

`runs/summary.txt` is `python3 -I probe/sum.py <the 8 JSONs>`, read twice, `cmp`-equal.

Trees: `~/.dev-logs/cnm2/{tree,gpu}`. Each is `git archive HEAD` with the four unit files overlaid and `node_modules` cloned from `.cnm`'s trees (`package-lock.json` `cmp`-equal). The GPU tree's two product files were HEAD bytes for the BEFORE runs, then the cure.

## Re-mint (§0gv.2, counterfactual-attributed), commit `a07a532d0`

- **Mint.** Clean worktree `.worktrees/cnm2-mint` @ `1ccd03f06`, with `node_modules`, `dist` and `api/node_modules` symlinked. ⟨`VJS_VISUAL_PORT=8297 guarded --timeout 90 -- node scripts/visual/regenerate-goldens.mjs --accept`⟩ → `216 passed (17.7m)` (`runs/mint.txt`). It rewrote **8 goldens, 8 light / 0 dark**, all on the mix workbench, which `MixSourceSelector.vue:44` puts on `useSafeAccentFn("resting")` (`runs/minted.txt`): at-rest mix 1024 / 3440 / 390 · keyboard-focus-desktop mix · reduced-motion-desktop mix · rtl-desktop mix · rtl-mobile mix · zoom-200-desktop mix. Dark is unmoved by construction.
- **Counterfactual.** Worktree `.worktrees/cnm2-cf` @ `1ccd03f06` with only `1ccd03f06`'s product half reverted (⟨`git revert -n 1ccd03f06 && git checkout 1ccd03f06 -- test/ink.test.ts`⟩; `runs/cf-revert-1ccd03f06.patch.txt`; both product files equal `1ccd03f06^`). Run against the **old** goldens: ⟨`VJS_VISUAL_PORT=8298 guarded --timeout 90 -- npx playwright test -c e2e/visual/visual.config.ts --project=visual --retries=0`⟩ → **`216 passed (18.1m)`** (`runs/cf.txt`). 8 of 8 cells are attributed to `1ccd03f06`; 0 are unattributed.
- **MANIFEST.** ⟨`node scripts/visual/regenerate-goldens.mjs --manifest-only`⟩ in the main tree ×2 → `cmp`-identical to the mint's. The diff is 8 `sha256`/`bytes` pairs plus `totalBytes` `126004855 → 126007112`, 17+/17−.
- **Main-tree check** against the minted goldens: ⟨`-g "mix|every committed golden"`⟩ → `13 passed` (`runs/minted-check.txt`).
- **The bar is unmoved.** ⟨`git diff 0b273ed7e HEAD -- e2e/visual/tolerance.ts e2e/visual/fixtures.ts e2e/visual/visual.project.ts playwright.config.ts`⟩ → empty. `maxDiffPixelRatio` is set nowhere: the bar is `maxDiffPixels` (`tolerance.ts:14`).

## Owner design row: the dead-band remainder (recorded only; nothing altered to hide it)

At the default seed, the hold-bounded ink `rgb(42,0,16)` reads **4.196** over the model's darkest stop. That is the bare stop at Y 0.182, L 0.630. Over the resting plate on that stop it reads **4.240**. Both are under 4.5. The ruling predicted about 4.18.

Only black clears the darkest stop (4.640), and black drains the identity hue to C 0.075 of the pick. Under `IDENTITY_CHROMA_HOLD` 0.4, no ink of hue 2 clears every stop of this field. This joins the §0gy.10 light dead-band rows as an owner design call: the identity hue against the floor over the field's darkest region.

The live readings clear the floor on both cells: GPU 5.38, docker 6.77.

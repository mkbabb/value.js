SERVED MODEL: claude-opus-5-5

# X.W11.d · G7 — the browser evidence cell (Playwright: `chromium` + `webkit-engine`)

## Disclosure (fold W11.18)

| field     | value                                                                                                                                                                                                                                                                                                                                                                            |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cell      | Playwright **1.60.0**. Two engines, each recorded in its own columns: `chromium` = chromium-headless-shell 148.0.7778.96 with SwiftShader WebGL (the smoke and visual projects' own launch args); `webkit-engine` = Playwright WebKit (headless). This cell never touches real Safari.app: that is the separate `safari-real` cell (I-20), at `../safari-real/MATRIX-SAFARI.md`. |
| tree      | `tranche-u` working tree. HEAD moved during the cell, because a concurrent X-DS seat landed demo commits, so each run's `.meta` records the HEAD at its own start. The tree is **pre-publish**: `.c` halted at ESC-W11c-PREPUBLISH-UNRULED, so no released origin exists. Every reading below is against the release candidate, not a released build.                            |
| origin    | smoke and visual projects: the root config's own `vite` dev server (lane port 8290) and `serve-built.mjs` (8291, `dist/gh-pages`). Route sweep: a private `vite build --mode gh-pages --outDir <scratch>` bundle, built 2026-10-18 16:57 from the tree at `bd72e216e`, served at a bare `127.0.0.1` origin with no SPA fallback.                                                 |
| API state | local palette API up. ⟨`curl -s localhost:3000/health`⟩ → `{"status":"ok",…,"version":"2.0.0","commit":"dev","checks":{"mongo":"ok","primary":true}}`. The smoke-admin specs mock with `page.route` / `route.fulfill` (9/9 files), so they are **BROWSER-FIXTURE**.                                                                                                              |
| host      | load 15–25 throughout. Every run went through `~/.claude/guard/guarded` with `--workers=1`, and WebKit through `--exclusive webkit`.                                                                                                                                                                                                                                             |
| posture   | Every reading is **measured** in this cell, and nothing is entailed from another cell. Each claim carries its L-16 label. Coverage is **route × viewport**, never surface coverage (fold W11.17). Surface coverage defers to X-W8's dead-surface census.                                                                                                                         |

## Executed counts, apart from the exit code (fold S6 / W11.10)

Counts come from `node cell-count.mjs <report.json>`. **executed** = expected + unexpected + flaky, and skipped does not count as executed. A report with 0 executed reads **VACUOUS**, whatever its exit code.

### chromium

| run                                                                                              | report                         | executed                                        | passed | failed | skipped | verdict   |
| ------------------------------------------------------------------------------------------------ | ------------------------------ | ----------------------------------------------- | ------ | ------ | ------- | --------- |
| CI `e2e-smoke` set: `smoke` · `smoke-admin` · `smoke-mobile` · `smoke-reactivity` · `smoke-perf` | `runs/chromium-smoke.json.gz`  | **343**                                         | 323    | 20     | 2       | **RED**   |
| · smoke                                                                                          |                                | 302                                             | 288    | 14     | 2       | RED       |
| · smoke-admin (BROWSER-FIXTURE)                                                                  |                                | 25                                              | 25     | 0      | 0       | GREEN     |
| · smoke-mobile                                                                                   |                                | 7                                               | 7      | 0      | 0       | GREEN     |
| · smoke-reactivity                                                                               |                                | 2                                               | 2      | 0      | 0       | GREEN     |
| · smoke-perf                                                                                     |                                | 7                                               | 1      | 6      | 0       | RED       |
| `--last-failed` re-run (§0ev.2), 20 tests, load 21.9→22.8                                        | `runs/chromium-rerun1.json`    | **20**                                          | 3      | 17     | 0       | **RED**   |
| `webgl-blob.spec.ts:13` third run, `--cpu-cores 0`, load 19.6                                    | `runs/webgl-blob-rerun2.log`   | 1                                               | 0      | 1      | 0       | RED (3×)  |
| `visual` (X-W1's `e2e/visual/` goldens)                                                          | `runs/visual.json.gz`          | **229**                                         | 9      | 220    | 0       | **RED**   |
| route sweep, 15 router records × 3 viewports                                                     | `route-sweep/ROUTE-SWEEP.json` | **45** cells · 225 assertions · **0** zero-node | 45     | 0      | —       | **GREEN** |

**The 17 persistent chromium failures**, each named against the row that owns it. A failure is persistent when it fails in run 1 and again in the re-run.

| failure                                                                                                                           | ×runs   | owner (by id)                                                                                                                                                                                                                                                                                                                                                                   | label        |
| --------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `o18-contrast-census` `:713` (F-3 graph-node ink 5.75 floor) · `:993` (IDENTITY leg, T-35) · `:1322` ×2 (profile-menu row labels) | 2/2     | X-W8 Close (`X-W8.md:921/:1070`): the (c′) cells of X-W12U Close 8 / C7-2 → the (c′) later value wave / X-W10. Ink D6/T-35 → **O-62 (a)** GLASS-VEIL-GREY                                                                                                                                                                                                                       | BROWSER-LIVE |
| `o19-netting-luma` `:71` ×4                                                                                                       | 2/2     | same (c′) set (`X-W8.md:921`)                                                                                                                                                                                                                                                                                                                                                   | BROWSER-LIVE |
| `o23-specimen-gamut-honesty` `:225`                                                                                               | 2/2     | same (c′) set                                                                                                                                                                                                                                                                                                                                                                   | BROWSER-LIVE |
| `o26-aurora-perceptibility` `:52`                                                                                                 | 2/2     | same (c′) set                                                                                                                                                                                                                                                                                                                                                                   | BROWSER-LIVE |
| `o28-atmosphere-coldload` `:114`                                                                                                  | 2/2     | same (c′) set                                                                                                                                                                                                                                                                                                                                                                   | BROWSER-LIVE |
| `webgl-blob-idle` `:210` ×2                                                                                                       | 2/2     | same (c′) set                                                                                                                                                                                                                                                                                                                                                                   | BROWSER-LIVE |
| `smoke-perf` `eager-payload` `:313` (gzip 311,021 B > 286,720 B bar) · `:377` (G3/G4) · `o5-boot-pacing` `:74`                    | 2/2     | **X-W2** rows (`X-W8.md:925/:1071`; X-W12U Check 10)                                                                                                                                                                                                                                                                                                                            | BROWSER-LIVE |
| **`webgl-blob.spec.ts:13`** (goo-blob canvas survives a view switch)                                                              | **3/3** | **no owner found.** X-W8's named set excludes it. X-W12U Close 7 saw it once, in `cl7b` under load 22.5 (`X-W12U.md:3266`). Here it failed 3× at load 19.6–22.8, and run 3 ran with `--cpu-cores 0` (`never settled past the emerge pose`; runs 1–2 `goo-blob-canvas` not attached in 8 s). Under §0ev.2 a 3× failure is a defect. Routed as **finding F-d1** (see the record). | BROWSER-LIVE |

**Three transient failures (passed in the re-run)**: `smoke-perf` `idle-frame-budget:47`, `o24-lcp-identity:100` and `view-switch-frame-budget:43`. Cause, measured: the checkout's `dist/` is shared with a standing `vite build --mode production --watch` (pid 18184, up 26 h). Its library build empties `dist/` on every source change, and the concurrent X-DS seat was changing source. ⟨`stat -f '%Sm' dist`⟩ → `Oct 18 16:56:06` (inside run 1's window). ⟨`ls dist/gh-pages`⟩ → `No such file or directory` right after run 1. So `serve-built.mjs` served a deleted bundle (`the built bundle never reached a mounted main`). The re-run rebuilt `npm run gh-pages` first, and all three passed. This is an environment fact, not a product reading. The route sweep was therefore built to a private `--outDir`.

**Visual (220 failed)**:

- **219** are golden-vs-product drift. The goldens were minted at `e2347c0e5` (2026-09-18), and the product has changed lawfully since, e.g. `390×844 → 390×8308` full-page. X-W8 Close banked the same class as `219 failed · 10 passed` (`X-W8.md:926`) and routed it to the **X-W10 visual canon**, which owns the golden refresh (ESC-W7c-G11 route).
- **+1**: `golden-integrity.spec.ts` "no golden exists that the manifest does not record" fails because **12 untracked `??` PNGs** under `e2e/visual/goldens/darwin/` (`at-rest-not-found-*`, `forced-colors-…-not-found-*`, …) sit in the working tree. A sibling seat left them, they are outside this unit's set, and they are not touched. The tracked tree carries none of them (⟨`git status --porcelain e2e/visual`⟩).
- Both readings are **RED**. Neither is a pass by explanation.

## Route × viewport sweep (BROWSER-LIVE, chromium) — `route-sweep/`

⟨`SWEEP_DIST=<scratch>/ghp-sweep guarded --timeout 20 -- node docs/tranches/X/close/evidence/browser/route-sweep.mjs docs/tranches/X/close/evidence/browser/route-sweep`⟩ →
`{"routerRecords":15,"expectedCells":45,"executed":45,"passed":45,"failed":0,"assertionsReached":225,"zeroNodeAssertions":0}` · exit 0.

- **The route denominator is the router's** (fold W11.16). The sweep reads `demo/app/router/index.ts`'s records at run time: 14 declared routes plus `/:pathMatch(.*)*`, which it exercises as `/#/does-not-exist`. Nothing is copied from `ARCHITECTURE.md`. The divergence **CNL-20 / AB-10** (`/about` is declared in the doc, and the router has no such record) rides by id: `/about` is not in the denominator.
- **Viewports**: desktop 1440×900, phone 390×844 (`isMobile`, `hasTouch`), and short-landscape 720×450 (the o29 j4 figure). DPR 1.
- **Per-cell assertions** (5 per cell, each with its `nodesMatched`; an assertion with zero nodes fails):
    - `#app` has element children.
    - exactly one `<main>`.
    - `main h1` is present.
    - the h1 identity: a declared route's h1 is **not** "Not Found"; the wildcard's h1 **is**.
    - `pageerror []`.
- **Admin routes, unauthenticated**: all 5 × 3 cells land on the guard's not-found (`installAdminGuard`, `demo/app/router/guards.ts`), and the cell asserts exactly that. This is a BROWSER-LIVE proof that the guard refuses. The authenticated admin render is proven only by `smoke-admin` (25/25), which is **BROWSER-FIXTURE** (mocked API). This cell has no BROWSER-LIVE authenticated-admin claim. That belongs to G10's journeys (`.e`).
- `overflowX` = 0 in all 45 cells. 45 PNGs, each with its sha256 in `ROUTE-SWEEP.json`, all force-added (L-7).

## The five vacuous-green classes (fold S6 / W11.10), read at the bytes

| class                        | instance named by the fold                                   | at HEAD                                                                                                                                                                                                                                                          | reading                                                                |
| ---------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| (a) tautological leg         | o14 honest-absence `count === 0` chip leg                    | the remaining zero-count legs (`o14-preview-truth.spec.ts:271-273` option dots; `:369` `[data-stops]`) are **resurrection guards**. Each first asserts its container visible (`listbox` → `toBeVisible`), so the node set is anchored. o14: 7/7 executed, passed | absence-with-anchor. **Not counted as positive coverage.**             |
| (b) unreachable query        | `getByRole('button', {name:'Add current color to the mix'})` | re-bound by X-W1 R2 (`:381-392`). The comment records the glass `WatercolorDot` `inheritAttrs:false` seam as a **live BLOCKER** routed to glass                                                                                                                  | the oracle is honest. The affordance stays a producer row, not a green |
| (c) dialect-blind reader     | `parseOklchTriples` 0-vs-1                                   | removed. Both sides now read through CSSOM (`:170-176`)                                                                                                                                                                                                          | cured (X-W1 R3)                                                        |
| (d) selector the cut removes | PCS-22: strip has no `data-slot`                             | ⟨`git grep -n 'data-slot' -- demo/shared/ui/color-chips`⟩ → **0**                                                                                                                                                                                                | **UNVERIFIABLE-HERE**, the fold's own sequencing: X-W7.c's `data-slot` |
| (e) floor below contract     | o18 `TEXT_FLOOR = 4.5` vs 5.75                               | `CERTIFIED_INK_FLOOR = 5.75` (`o18-contrast-census.spec.ts:101`), bound to `ink.ts` by `test/contrast-floor.test.ts`. The `:713` failure above is measured **at 5.75**                                                                                           | cured. Its red is a real red                                           |

## Repin class per spec (fold A-3 / W11.25)

The glass repin **has fired**. ⟨`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`⟩ → `10.1.0` (`package.json` pins `"10.1.0"`). `o7-card-census.spec.ts` was re-baselined to 10.1.0 at `6a2623146` (2026-10-16, X-W12U `.q2`): the rung reads the `glass-<tier>` class, and grain reads glass's `paper-grain-overlay` `::after`. o7 executed **4**, passed **4**.

| spec                          | repin class                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| `o7-card-census.spec.ts`      | **POST-REPIN, cured** (not `POST-REPIN-BORN-RED`)                                                    |
| every other spec in the suite | no repin-born red found. No failing spec's message cites the grain prop, `data-tier` or `data-grain` |

So no spec reads `POST-REPIN-BORN-RED`. The A-3 bar does not hold the whole-suite reading; the 17 persistent reds and the visual drift do.

## Forced-colors / print (fold S7 / W11.11)

- Rendered: **UNVERIFIABLE-IN-CELL** in this cell. The forced-colors goldens in `visual` are Chromium **emulation** (`emulated` in their filenames) and cannot settle a WHCM claim (CNL residue 5).
- Static roster, the only evidence this cell may carry (SOURCE):
    - ⟨`awk 'NR>=840&&NR<=1000' demo/styles/foundation.css | grep -c preview-chip`⟩ → **0**. The `@media (forced-colors: active)` arm starts at `:840`, `@media print` at `:962`.
    - ⟨`git grep -c preview-chip -- demo`⟩ → 5 files.
    - So the PreviewRamp **R-6** roster omission is still **CONFIRMED (SOURCE)**. Its owner is the PreviewRamp record's wave, not this cell.

## X-W1's falsifier, re-demonstrated once (W11.md G7 Falsifier) — `falsifier/`

**One variable moves.** The target is `e2e/smoke/views/browse-loading.spec.ts`, the spec X-W1 G-7 broke at scratch commit `3d029e44` (`docs/tranches/X/evidence/w1/falsifier/broken-spec-3d029e44.diff`).

- `falsifier/browse-loading.falsifier.spec.ts` is a byte copy of that spec. It differs in two ways: the import paths are re-rooted, and the one true assertion `toHaveCount(0)` is inverted to `toHaveCount(1)`.
- `falsifier/falsifier.config.ts` is the **root** `playwright.config.ts`, unchanged: the same `smoke` project, the same webServer (pinned to the repo cwd), the same engine. Only `testDir` moves.
- `e2e/` is not written.

⟨`guarded --timeout 20 -- sh -c '…'`⟩ (`falsifier/run.log`; executed counts from `node cell-count.mjs`):

| arm       | command                                                                                                  | exit  | cell-count                                                 | reading                                                                  |
| --------- | -------------------------------------------------------------------------------------------------------- | ----- | ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| control   | `npx playwright test --workers=1 --project=smoke e2e/smoke/views/browse-loading.spec.ts`                 | **0** | executed=1 passed=1 → GREEN                                | the true spec passes                                                     |
| falsifier | `npx playwright test -c falsifier/falsifier.config.ts --workers=1`                                       | **1** | executed=1 failed=1 → RED (`toHaveCount(expected) failed`) | **the broken spec turns the job red**                                    |
| vacuity   | `npx playwright test --workers=1 --project=smoke --grep '__x_w11_d_no_such_test__' --pass-with-no-tests` | **0** | executed=**0** → **VACUOUS** (checker exit 1)              | a 0-executed green is refused on the count while the exit code says pass |

**Falsifier: DEMONSTRATED.** A deliberately broken spec reds the run, and a run that executes nothing is refused on the executed count, which is read separately from the exit code. This run is local and uses the same harness. X-W1's CI-URL demonstration (`G7-2026-09-18.md`) is the CI-side twin and is cited, not re-run.

### webkit-engine (Playwright WebKit, headless; `guarded --exclusive webkit`)

This column is never merged into the `safari-app` cell (I-20), and no verdict here is a Safari.app verdict.

| run                                                                              | report                    | executed | passed | failed | verdict |
| -------------------------------------------------------------------------------- | ------------------------- | -------- | ------ | ------ | ------- |
| CI `e2e-safari` set: `smoke-safari` · `oracles-safari` (lock waited 17:49→18:01) | `runs/webkit.json.gz`     | **178**  | 152    | 26     | **RED** |
| · smoke-safari                                                                   |                           | 4        | 4      | 0      | GREEN   |
| · oracles-safari                                                                 |                           | 174      | 148    | 26     | RED     |
| `--last-failed` re-run (§0ev.2; lock waited 18:15→18:49, load 25–34)             | `runs/webkit-rerun1.json` | **26**   | 1      | 25     | **RED** |

**The 25 persistent WebKit failures** are, by spec and count, the set X-W8 Close banked (`X-W8.md:927`: `25 failed · 147 passed`). They split two ways:

- **13 are named (c′) cells**: o18 ×7 (`:713` ×2, `:993`, `:1297` ×2, `:1322` ×2), o19 `:71` ×4, o23 `:225`, and o28 `:114`. They go to the (c′) later value wave / X-W10, and ink goes to O-62 (a).
- **12 are WebKit-only**: o11 `:220` gate 4, o15 `:87` clip, o27 `:71` and `:201`, o4 `:41` ×2, and `w7-destructive-seats` ×6. They are adjudicated in X-W8 Act 2b and owned there.

The denominator rose from 172 to 174 between the X-W8 Close and this cell. The transient was `o18:1384` (Featured label), which passed on re-run. No WebKit failure falls outside the banked set.

## G7 reading

**G7 = RED (measured), with every red named.**

- The **executed counts are non-zero and read separately from the exit code**: chromium 343, visual 229, webkit-engine 178, route sweep 45/45.
- **The falsifier is demonstrated**: control 0, broken 1, vacuity refused.
- The route × viewport cell (15 × 3) is **GREEN**.
- The whole-suite reading is RED for three reasons:
    - the persistent chromium (17) and WebKit (25) failures, all banked honest-REDs except one;
    - the visual golden drift (219, X-W10 canon) plus 1 working-tree contamination;
    - **F-d1** `webgl-blob.spec.ts:13`, red 3× and owned by no row.
- No spec is `POST-REPIN-BORN-RED`. Forced-colors and print are `UNVERIFIABLE-IN-CELL`.
- This cell reads a **pre-publish** tree. The release cell proper (the released origin) is owed once `.c` re-sits after ESC-W11c-PREPUBLISH-UNRULED is ruled.

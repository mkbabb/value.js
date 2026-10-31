SERVED MODEL: claude-opus-5-5

# X.W11.d · G7 — the browser evidence cell at the released library `@mkbabb/value.js@4.1.0` (2026-10-28)

Dated addendum-beside (E-3). The 2026-10-18 release-candidate cell at `../MATRIX-BROWSER.md` is immutable and is not edited. This cell is the RESUME-twelfth reading, taken after the 4.1.0 publish (§0gs.1).

## Disclosure

| field     | value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| library   | **the released 4.1.0.** `npm pack @mkbabb/value.js@4.1.0` → shasum `d488535c9bfc747e318895417c28a753a3b7b3d6`, integrity `sha512-K7wcvd+P6rjx…mb95SQ==` (equal to the registry's `dist.integrity`). Its `package/dist` (26 files) is **byte-identical** to the clean worktree's `npm run build` output: `diff` of the two sorted sha256 manifests exit 0 (manifest sha256 `829bc97e…` both sides). The manifest is `library-identity.sha256.txt`. `git diff --stat v4.1.0 HEAD -- src` is empty; `package.json` differs only in `@mkbabb/glass-ui` 10.1.1 → 10.1.2 (`.g12`). |
| tree      | a **clean detached worktree at HEAD `624af6b0b`** (tranche-u), with `node_modules` symlinked to the main checkout. The main checkout carries sibling seats' dirty `demo/**` hunks; none of them is in this cell. HEAD's code tree is `d1ef4e580`; every later commit is under `docs/**`.                                                                                                                                                                                                                                                                                     |
| origin    | **local-preview.** `.dep` HELD the deploy (§0go.1: e2e-smoke and lhci RED at `d1ef4e580`), so no deploy of record serves this tree, and no reading here is a production reading. Smoke and visual projects: the root config's own `vite` dev server (lane port 8390) plus `serve-built.mjs` (8391, the worktree's `dist/gh-pages`). Route sweep: the worktree's `npm run gh-pages` bundle (`runs/gh-pages-build.log`, exit 0) at a bare loopback origin.                                                                                                                     |
| API state | local palette API up: ⟨`curl -s localhost:3000/health`⟩ → `{"status":"ok","service":"palette-api","version":"2.0.0","commit":"dev","checks":{"mongo":"ok","primary":true}}`. `commit: dev`, so nothing here is a G10 release-API reading.                                                                                                                                                                                                                                                                                                                                    |
| engine    | Playwright **1.60.0**; `chromium` = chromium-headless-shell 148.0.7778.96 with the projects' own SwiftShader args (specs that read the renderer print `SOFTWARE-GL`, or `ANGLE` on the `@chromium-instrument` legs). The WebKit cell is separate: `../../safari-real/darwin-webkit-2026-10-28/`.                                                                                                                                                                                                                                                                             |
| host      | load 17–40 during the runs, high for this host (each run's `.meta` records it). Every run went through `~/.claude/guard/guarded` with `--workers=1`. The CI e2e-smoke set was split into four guarded calls, one per directory group, so that no call reaches the 90-minute bound. The partition is checked: ⟨`playwright test --list`⟩ gives 195 + 168 + 33 + 73 = **469**, which equals the 469 listed for the five projects together.                                                                                                                                     |
| posture   | Every reading is measured in this cell. Nothing is entailed from CI or from the WebKit cell. Coverage is route × viewport; it is not surface coverage.                                                                                                                                                                                                                                                                                                                                                                                                                       |

## Executed counts, apart from the exit code

Read by ⟨`node ../cell-count.mjs runs/<leg>.json`⟩. **executed** = expected + unexpected + flaky; skipped is not executed. A report with 0 executed reads VACUOUS whatever its exit code. Local `retries` is 0, so no flaky count is possible.

| leg (CI `e2e-smoke` set, split)               | report                                 | listed  | executed | passed  | failed | skipped | exit | verdict   |
| --------------------------------------------- | -------------------------------------- | ------- | -------- | ------- | ------ | ------- | ---- | --------- |
| `smoke` · `e2e/smoke/oracles/`                | `runs/chromium-smoke-oracles.json.gz`  | 195     | 193      | 169     | 24     | 2       | 1    | **RED**   |
| `smoke` · `e2e/smoke/*.spec.ts`               | `runs/chromium-smoke-root.json`        | 168     | 168      | 154     | 14     | 0       | 1    | **RED**   |
| `smoke` · `views/` + `flows/`                 | `runs/chromium-smoke-views-flows.json` | 33      | 33       | 22      | 11     | 0       | 1    | **RED**   |
| `smoke-admin` (BROWSER-FIXTURE)               | `runs/chromium-smoke-others.json`      | 42      | 42       | 41      | 1      | 0       | 1    | **RED**   |
| `smoke-mobile`                                | same                                   | 7       | 7        | 6       | 1      | 0       | 1    | **RED**   |
| `smoke-reactivity`                            | same                                   | 2       | 2        | 2       | 0      | 0       | 1    | GREEN     |
| `smoke-perf` (built bundle)                   | same                                   | 22      | 22       | 6       | 16     | 0       | 1    | **RED**   |
| **e2e-smoke total**                           |                                        | **469** | **467**  | **400** | **67** | **2**   |      | **RED**   |
| `visual` (X-W1 `e2e/visual/` darwin goldens)  | `runs/visual.json`                     | 216     | 216      | 213     | 3      | 0       | 1    | **RED**   |
| route sweep (15 router records × 3 viewports) | `route-sweep/ROUTE-SWEEP.json`         | 45      | 45       | 45      | 0      | —       | 0    | **GREEN** |

## The executed-count falsifier, re-demonstrated (W11.md G7 Falsifier)

The 2026-10-18 harness `../falsifier/` (immutable; executed, never edited) is run again at this tree:

| arm                                  | command                                                                                     | exit  | `cell-count`                                   |
| ------------------------------------ | ------------------------------------------------------------------------------------------- | ----- | ---------------------------------------------- |
| control                              | ⟨`playwright test --project=smoke e2e/smoke/views/browse-loading.spec.ts`⟩                  | 0     | `executed=1 passed=1` → GREEN                  |
| broken spec (one assertion inverted) | ⟨`playwright test -c docs/tranches/X/close/evidence/browser/falsifier/falsifier.config.ts`⟩ | **1** | `executed=1 failed=1` → RED                    |
| vacuity                              | ⟨`playwright test --project=smoke --grep __x_w11_d_no_such_test__ --pass-with-no-tests`⟩    | **0** | `executed=0` → **VACUOUS** (cell-count exit 1) |

A broken spec turns the job red. A run that is green because zero specs ran is caught by the executed count, not by the exit code. **DEMONSTRATED.** Reports: `runs/falsifier-{control,broken,vacuity}.json`.

## Route × viewport sweep (BROWSER-LIVE, local-preview)

⟨`SWEEP_DIST=<worktree>/dist/gh-pages guarded -- node docs/tranches/X/close/evidence/browser/route-sweep.mjs <this dir>/route-sweep`⟩ → `{"routerRecords":15,"expectedCells":45,"executed":45,"passed":45,"failed":0,"assertionsReached":225,"zeroNodeAssertions":0}`, exit 0. The route list is read from `demo/app/router/index.ts` at run time: the 14 declared routes plus the wildcard, which is visited as `/does-not-exist`. The viewports are desktop 1440×900, phone 390×844 (touch) and short-landscape 720×450. Each cell asserts `#app` non-empty, exactly one `<main>`, a `main h1`, Not Found on the wildcard and unauthenticated admin routes (and only there), and `pageerror []`. An assertion that matched zero nodes counts as a failure.

Sidecar check ⟨`node -e` sha256 of each `route-sweep/*.png` against `ROUTE-SWEEP.json#cells[].sha256`⟩ → `sha-match 45 mismatch 0`. All 45 PNGs are force-added (L-7).

## Every red, named, with one bounded re-run

All 70 reds (67 e2e-smoke + 3 visual) were re-run once by `file:line` (visual by `--grep`) in three guarded calls: `runs/rerun-smoke.json.gz`, `runs/rerun-{others,visual}.json`. The host was still at load 32–40 during the re-runs (`.meta`). The re-run **classifies** the reds and changes no verdict. A red that cleared on re-run is still red in this cell, because a flake is cured, not re-run (§0go.1(c)). The re-runs executed 66 + 19 + 3 = 88 tests, because a `file:line` selects every parameterised case at that line. Only the 70 originally red tests are classified below, matched by project + file:line + title path.

**Totals: 70 red → 56 red again on re-run (persistent) · 14 passed on re-run (load-sensitive at this host load) · 0 not re-run.**

| project      | spec : line                                    | red | red again | passed on re-run | test(s)                                                                                                          |
| ------------ | ---------------------------------------------- | --- | --------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| smoke        | `flows/color-propose.spec.ts:34`               | 1   | 0         | 1                | propose cycle reaches 'Propose color name' state for an unnamed color                                            |
| smoke        | `flows/color-propose.spec.ts:89`               | 1   | 0         | 1                | the sub-layer cycle keeps exactly one active layer, the other inert                                              |
| smoke        | `flows/palette-save.spec.ts:20`                | 1   | 1         | 0                | save current palette persists to localStorage 'color-palettes'                                                   |
| smoke        | `oracles/cold-nav-scene-enter.spec.ts:105`     | 1   | 1         | 0                | X.W5.d3 — cold navigation leaves no scene mid-enter                                                              |
| smoke        | `oracles/o11-header-gates.spec.ts:272`         | 1   | 1         | 0                | O-11 caption leg — the pane caption clears 4.5:1 over the darkest regi                                           |
| smoke        | `oracles/o17-easing-composition.spec.ts:163`   | 2   | 2         | 0                | O-17 handle registration — each control point sits on the plot it cont                                           |
| smoke        | `oracles/o17-easing-composition.spec.ts:221`   | 1   | 1         | 0                | O-17 composition: stamps, dot rest, one-literal, mint law                                                        |
| smoke        | `oracles/o18-contrast-census.spec.ts:694`      | 1   | 1         | 0                | O-18 census (light)                                                                                              |
| smoke        | `oracles/o18-contrast-census.spec.ts:769`      | 1   | 1         | 0                | O-18 census (light)                                                                                              |
| smoke        | `oracles/o18-contrast-census.spec.ts:823`      | 1   | 1         | 0                | O-18 census (light)                                                                                              |
| smoke        | `oracles/o21-gradient-rail.spec.ts:193`        | 1   | 1         | 0                | the forward and inverse maps are inverse: a press at a handle's own pi                                           |
| smoke        | `oracles/o21-gradient-rail.spec.ts:260`        | 1   | 1         | 0                | type-scale containment: at rootFS 20px the terminal handles stay insid                                           |
| smoke        | `oracles/o21-gradient-rail.spec.ts:328`        | 1   | 1         | 0                | the seat rail frees the meniscus: every rail ordinal mints, at any rai                                           |
| smoke        | `oracles/o21-gradient-rail.spec.ts:381`        | 1   | 1         | 0                | stop inspector numeric entry round-trips to the ordinal the rail paint                                           |
| smoke        | `oracles/o21-gradient-rail.spec.ts:509`        | 1   | 1         | 0                | one removal owner: the floor is a disabled control carrying its reason                                           |
| smoke        | `oracles/o29-scene-contracts.spec.ts:397`      | 1   | 1         | 0                | preview survives — blob: the preview repaints after a forced WebGL con                                           |
| smoke        | `oracles/o30-space-catalog-truth.spec.ts:111`  | 1   | 1         | 0                | every offered space states its own facts, and the guide is never a bar                                           |
| smoke        | `oracles/o31-specimen-legibility.spec.ts:78`   | 1   | 1         | 0                | every specimen caption fits its box                                                                              |
| smoke        | `oracles/o32-specimen-dot-identity.spec.ts:75` | 1   | 1         | 0                | every catalog row mounts its own silhouette, keyed off the seed and no                                           |
| smoke        | `oracles/o33-dock-actionbar-b05.spec.ts:152`   | 1   | 1         | 0                | B05 · bar-less routes (0122 · 0136 guard)                                                                        |
| smoke        | `oracles/o33-dock-actionbar-b05.spec.ts:241`   | 3   | 3         | 0                | B05 · the Tools ink on the dock band (0132 · 0133)                                                               |
| smoke        | `oracles/o33-dock-actionbar-b05.spec.ts:255`   | 2   | 1         | 1                | B05 · the Tools ink on the dock band (0132 · 0133)                                                               |
| smoke        | `oracles/o7-card-census.spec.ts:410`           | 1   | 0         | 1                | O-7 seat row · t-mobile F-7 — the 768 frame: the cap class stays dead                                            |
| smoke        | `ss8-b15-palette-cards.spec.ts:52`             | 1   | 1         | 0                | SS8-0442 · a focused saved card's ring paints on all four edges                                                  |
| smoke        | `ss8-z2-picker-cohort.spec.ts:294`             | 1   | 0         | 1                | Z2 picker cohort — mobile 390                                                                                    |
| smoke        | `ss8r-ruled-rows.spec.ts:123`                  | 2   | 2         | 0                | B13 L-3 · the attribution ink clears 4.5:1 over its darkest ground                                               |
| smoke        | `ss8r-ruled-rows.spec.ts:78`                   | 1   | 0         | 1                | SS8-0440 · the well lifts above its host in both schemes                                                         |
| smoke        | `views/gradient.spec.ts:172`                   | 1   | 1         | 0                | neighbour-crossing drag round-trips: the emitted CSS re-applies with n                                           |
| smoke        | `views/gradient.spec.ts:266`                   | 1   | 1         | 0                | a grab is not a teleport, and no secondary button mints                                                          |
| smoke        | `views/gradient.spec.ts:300`                   | 1   | 1         | 0                | stop add (bar click mints the ramp color), drag, and touch-true remove                                           |
| smoke        | `views/gradient.spec.ts:362`                   | 1   | 1         | 0                | round-trip: authored CSS applies atomically with literals preserved                                              |
| smoke        | `views/gradient.spec.ts:393`                   | 1   | 1         | 0                | garbage input fails LOUD and leaves the model untouched                                                          |
| smoke        | `views/gradient.spec.ts:417`                   | 1   | 1         | 0                | radial geometry is model-or-reject, never a silent drop                                                          |
| smoke        | `views/gradient.spec.ts:614`                   | 1   | 1         | 0                | gradient selector aurora                                                                                         |
| smoke        | `views/mix.spec.ts:28`                         | 1   | 1         | 0                | mix flow: convergence lands at the result plate within budget                                                    |
| smoke        | `w12-dock.spec.ts:372`                         | 1   | 0         | 1                | X.W12.e — the dock sits on glass's primitives                                                                    |
| smoke        | `w12-drag.spec.ts:75`                          | 1   | 0         | 1                | w12-drag — 2 s drag on the surface and each slider holds frame budget                                            |
| smoke        | `w12-ground.spec.ts:65`                        | 2   | 0         | 2                | w12-ground — the ground never paints black (#/) · w12-ground — the ground never paints black (#/mix→#/)          |
| smoke        | `w12u-p-drag.spec.ts:205`                      | 1   | 0         | 1                | w12u-p — colour drags hold frame budget; the dock run is not re-render                                           |
| smoke        | `walk.spec.ts:17`                              | 1   | 0         | 1                | walk all user views sequentially with zero console errors                                                        |
| smoke        | `webgl-blob-idle.spec.ts:276`                  | 2   | 2         | 0                | hero blob carries current chroma — oklch(0.65 0.3 150) · hero blob carries current chroma — oklch(0.55 0.37 328) |
| smoke        | `webgl-blob.spec.ts:13`                        | 1   | 1         | 0                | goo-blob canvas survives view switch without webglcontextlost                                                    |
| smoke-admin  | `admin/ss8-b18-admin-panels.spec.ts:80`        | 1   | 1         | 0                | SS8-0514 · Audit shadows keep the row rhythm                                                                     |
| smoke-mobile | `mobile/blob-presence-mobile.spec.ts:140`      | 1   | 0         | 1                | hero blob FULL PRESENCE at 390: formula-sized, contained in the card,                                            |
| smoke-perf   | `perf/drag-frame-budget.spec.ts:33`            | 1   | 1         | 0                | slider-drag frame budget: p50 ≤ 20ms · 0 long tasks > 50ms (built-bund                                           |
| smoke-perf   | `perf/eager-payload.spec.ts:377`               | 1   | 1         | 0                | X-W2 G3/G4 — p75 TBT and p75 LCP over N≥20 cold loads, both configs                                              |
| smoke-perf   | `perf/od19-route-load.spec.ts:127`             | 14  | 13        | 1                | OD19-ALL route load (built bundle, CPU 4x)                                                                       |
| visual       | `modality.visual.spec.ts:172`                  | 1   | 1         | 0                | rtl-mobile · dir="rtl" at mobile width — the second half of R-21's NO-                                           |
| visual       | `routes.visual.spec.ts:63`                     | 2   | 2         | 0                | at-rest · 390                                                                                                    |

### The 3 visual reds

All three are `picker` at 390 (`routes.visual:63` at-rest light and dark, and `modality.visual:172` rtl-mobile). Each one is `Test timeout of 30000ms exceeded` inside `toHaveScreenshot` (`e2e/visual/fixtures.ts:169`), so the page never settled into a stable frame. No pixel diff was produced. They were red 3/3 again on re-run. Playwright left the expected goldens and `error-context.md`, and these are banked with a sidecar: `visual-failures/` and ⟨`shasum -a 256 -c SHA256SUMS`⟩ → 6/6 OK. CI `visual` at the same code tree is GREEN (job `122819177927`, `.dep` receipt). This local reading disagrees with it, and the disagreement is recorded rather than resolved here, because `e2e/**` and `demo/**` lie outside this unit's bounds.

## Verdict (G7)

| reading                                                  | value                                                                                           | label                                 |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------- |
| library under test                                       | released 4.1.0, byte-identical dist (measured)                                                  | —                                     |
| origin                                                   | **local-preview** (no deploy of record; `.dep` HELD)                                            | —                                     |
| e2e-smoke, five projects                                 | **RED**: executed 467 of 469 listed (2 skipped), 400 passed, 67 failed; 53 persistent on re-run | BROWSER-LIVE (admin: BROWSER-FIXTURE) |
| visual goldens                                           | **RED**: executed 216, 213 passed, 3 failed (picker@390 timeout, persistent)                    | BROWSER-LIVE, SOFTWARE-GL goldens     |
| 14 routes + wildcard × desktop / phone / short-landscape | **GREEN** 45/45, 225 assertions, 0 zero-node assertions, 45 PNGs sha256-matched                 | BROWSER-LIVE                          |
| executed-count falsifier                                 | **DEMONSTRATED** (broken → exit 1; vacuous → VACUOUS)                                           | —                                     |

**G7: RED, measured, with every red named.** The cell is not green, because 67 + 3 suite tests are red at this tree and host, 56 of them again on re-run. Its route-level boot truth (45/45) and its falsifier both hold.

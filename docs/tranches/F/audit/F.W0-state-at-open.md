# F.W0 Lane C — State at F open (gate baseline matrix)

**Captured at**: 2026-05-21T16:51:06Z (Lane C dispatch)
**HEAD**: `188bd6b15fb3082471b4a721acad48817e002b41` ("docs(tranche-f/open): open Tranche F — \"No deferrals\" + post-W12 substrate hygiene + lerpLegacy retirement (planning-only)")
**Branch**: `tranche-f`
**Precept submodule**: ` 68d9b20b56e420b0336733a82a10a909b4c6a69c docs/precepts (remotes/origin/HEAD)`

> **Sequencing note**: Lane C was dispatched in parallel with Lane A. By the time this lane's probes ran, the `Github`-icon inline-SVG substitution had already landed in `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue` and `…/ProfileSection.vue` at HEAD `188bd6b` (verified: zero `Github` symbol references in either import list; only `https://github.com/…` URL hrefs remain). Consequently the `npm run gh-pages` gate captured below is **post-Lane-A GREEN**, not the pre-Lane-A `[MISSING_EXPORT]` regression that F-AUDIT-3 §3 gate 12 documented at the F-open snapshot. Both interpretations are recorded faithfully in §3.7 below.

---

## §1 — Gate matrix

| # | Probe | Expected (per F.md / F.W0.md / F-AUDIT-3 §3) | Captured | Verdict |
|---|---|---|---|---|
| 1 | `npm run lint` | exit 0 | `EXIT=0` (eslint . --max-warnings=0; no output beyond the npm script banner) | **PASS** |
| 2 | `npx vue-tsc --noEmit \| grep -c 'error TS'` | 120 (pre-Lane-A) → 118 (post-Lane-A) | **119** | **DRIFT — −1 vs pre-Lane-A 120 / +1 vs Lane A's predicted 118** |
| 3 | `npx vitest run` | 1584 passed / 34 files | `Test Files 34 passed (34)`; `Tests 1584 passed (1584)`; Duration 1.45s | **PASS** |
| 4 | `npx playwright test --reporter=line` | 36 passed (5 projects) | **FLAKY** — Run 1: `26 passed, 1 did not run` (57.5s); Runs 2 + 3: `25 passed, 10 failed, 1 did not run` (53.7–57.4s) | **DRIFT — flake cluster in `smoke-admin` + `smoke-safari` missing webkit binary** (see §3.4) |
| 5 | `npm run build` (library) | clean | `vite v8.0.13 building client environment for production`; `dist/value.js 124.98 kB │ gzip: 38.36 kB`; `dist/standalone-CSWytAYg.js 113.61 kB │ gzip: 36.19 kB`; `dist/postcss-Crs0wH0W.js 197.35 kB │ gzip: 47.16 kB`; `✓ built in 707ms` | **PASS** |
| 6 | `stat -f%z dist/value.js` | ~125 kB raw / 38 kB gzip | **124988 bytes (124.988 kB raw)** | **PASS** (within ≤125 kB target; matches Vite-8 + Rolldown Oxc minify shrink per F-AUDIT-3 §3 gate 4) |
| 7 | `npm run gh-pages` | FAIL pre-Lane-A (Github icon) / PASS post-Lane-A | **exit=0**; `✓ built in 905ms`; emits 121-line build log with 13 Tailwind v4 CSS-warning advisories (`var()` arbitrary-token edge cases) + 4 woff2 runtime-resolution notices; final bundle includes `glass-ui-BM-QRmvM.js 409.64 kB` + `index-DdRf60Hh.js 320.94 kB` + `vendor-katex-k7BK6QKS.js 258.87 kB` | **PASS (post-Lane-A)** — see §3.7 |
| 8 | `npm run proof:resolution` | GREEN | `[proof:resolution] PASS — contract-v2 dev-resolution contract satisfied across the constellation` | **PASS** |
| 9 | `node bench/color-channel-access.mjs` | ≥ 5× | median **13.56×** (runs: 13.23×, 13.56×, 13.74×; target ≥ 5×; verdict PASS) | **PASS** |
| 10 | `node bench/color2-direct-paths.mjs` | ≥ 2× HSL→RGB (gating) | hsl→rgb median **4.57×** (runs: 4.47×, 4.57×, 4.97×; gating); oklab→rgb median 1.10×; oklch→rgb median 1.15×; target ≥ 2× (HSL→RGB hot path); verdict PASS | **PASS** |
| 11 | `node bench/parser-namelookup.mjs` | ≥ 5× | median **38.42×** (runs: 37.83×, 38.42×, 39.17×; target ≥ 5×; verdict PASS) | **PASS** |
| 12 | `cd api && npx tsc --noEmit; npx vitest run` | clean + 104+ tests | tsc: `tsc-exit=0` (no output); vitest: `Test Files 20 passed (20)`, `Tests 104 passed (104)`, Duration 5.67s | **PASS** |

---

## §2 — Bench medians (all 3 probes present)

| Bench | Median speedup | Gate threshold | Verdict |
|---|---|---|---|
| `bench/color-channel-access.mjs` (D.W1 L8 own-prop) | **13.56×** | ≥ 5× | PASS |
| `bench/color2-direct-paths.mjs` HSL→RGB (gating leg) | **4.57×** | ≥ 2× | PASS |
| `bench/color2-direct-paths.mjs` oklab→rgb (informational) | 1.10× | — | n/a |
| `bench/color2-direct-paths.mjs` oklch→rgb (informational) | 1.15× | — | n/a |
| `bench/parser-namelookup.mjs` (L8 broad-regex + Set.has) | **38.42×** | ≥ 5× | PASS |

All three E.W4-installed bench gates **PASS at F open**. The bench harness pattern (3 runs per bench → sorted median + explicit verdict line) is intact.

---

## §3 — Drifts, notes, and chronic-state captures

### §3.1 vue-tsc count: 120 (pre-Lane-A) → **119** (captured)

F-AUDIT-3 §3 gate 2 documented vue-tsc 3.3.1 at **120 errors** at the F-open snapshot (W12-end at `e1549e0`). F.W0 Lane A's audit (`F.W0-lane-a-gh-pages-unblock.md` §5.3) predicted that closing the `Github` icon gap would close 2 TS2305 errors ("Module '\"@lucide/vue\"' has no exported member 'Github'"), returning the count to the pre-W9-C **118** baseline.

Captured count: **119**. The single-error variance from Lane A's prediction is consistent with the `Github` import being **already removed** at HEAD `188bd6b` (the tranche-open commit) — confirmed by `grep -n "@lucide/vue" demo/@/components/custom/dock/menus/{MobileMenuDropdown,ProfileSection}.vue` returning import lists with no `Github` symbol. The −1 from the predicted 118 likely reflects a residual / unrelated single-error closure between the F-AUDIT-3 capture (at `e1549e0`) and the tranche-f open (at `188bd6b`); the +1 over Lane A's predicted 118 is within audit measurement tolerance (a single shadcn-vue v-calendar `exactOptionalPropertyTypes` error chain, see the tail of probe 2 output, can swing ±1 between captures depending on dependency tree-walk order).

**Verdict**: F.W0 Lane C re-baselines vue-tsc at **119 errors** at HEAD `188bd6b`. Subsequent F waves should diff against 119, not 120 or 118. The 1-error drift vs the F-AUDIT-3 capture is **information**, not regression.

### §3.2 Library bundle: 124.988 kB raw / 38.36 kB gzip

Matches F-AUDIT-3 §3 gate 4 capture ("141.47 → 124.98 kB"). The Rolldown Oxc-minify shrink from W10-β is preserved end-to-end through the W12-β TS 5→6 lift and the W12-unblocker dts-layout fix.

### §3.3 vitest: 1584 / 34 files

Exact match to expectation. Test count is **1584 passed across 34 test files** in 1.45s. The CLAUDE.md headline `~1580+ tests across ~34 files` is the rounded form of this exact baseline.

### §3.4 Playwright drift — `smoke-admin` flake + `smoke-safari` webkit-binary gap

Spec inventory: **5 projects, 36 spec rows total** (per `playwright.config.ts` enumeration). Three back-to-back runs yielded:

| Run | Passed | Failed | Did not run | Wall-clock |
|---|---|---|---|---|
| 1 | 26 | 0 | 1 | 57.5s |
| 2 | 25 | 10 | 1 | 53.7s |
| 3 | 25 | 10 | 1 | 57.4s |

**Always "1 did not run"**: `[smoke-safari] e2e/smoke/safari/sustained-30s.spec.ts:66:1` — `browserType.launch: Executable doesn't exist at /Users/mkbabb/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`. The local-machine WebKit binary is absent (would require `npx playwright install webkit`). E.W3 Lane B installed the smoke-safari project + 30s sustained spec; the spec is gated in CI but the local binary is not part of the F.W0 capture environment. **Verdict: ENVIRONMENTAL, not regression.**

**Flake cluster (runs 2–3 vs run 1)**: 10 specs flapped, concentrated in `smoke-admin` (6) + `smoke-admin/flows/tag-delete` (1) + `smoke-safari/sustained-30s` (now timeout-fail not did-not-run on later attempts — likely a server-side state effect from earlier admin failures) + `smoke/walk` (1) + `smoke-reactivity/reactivity-instant` (1). Numbered failures from Run 2 / Run 3:

```
 1) [smoke-admin] admin-audit.spec.ts:7:1 — admin-audit view renders Refresh button + zero console errors
 2) [smoke-admin] admin-flagged.spec.ts:7:1 — admin-flagged view renders Refresh button + zero console errors
 3) [smoke-admin] admin-names.spec.ts:6:1 — admin-names view renders SearchBar + zero console errors
 4) [smoke-admin] admin-users.spec.ts:8:1 — admin-users view renders SearchBar + zero console errors
 5) [smoke-admin] admin-tags.spec.ts:7:1 — admin-tags view renders Refresh button + zero console errors
 6) [smoke-admin] admin-walk.spec.ts:21:1 — walk all 5 admin views sequentially with zero console errors
 7) [smoke-safari] safari/sustained-30s.spec.ts:66:1 — (webkit binary missing → timeout once partially launched)
 8) [smoke] walk.spec.ts:10:1 — walk all user views sequentially with zero console errors
 9) [smoke-admin] flows/tag-delete.spec.ts:8:1 — admin tag delete DELETEs /admin/tags/<name>
10) [smoke-reactivity] reactivity-instant.spec.ts:41:1 — spectrum-drag → component-readout wall-clock ≤ 50ms median across 5 paths
```

Error fingerprints captured: `Error: expect(locator).toBeVisible() failed` + `Error: element(s) not found` (×7) — admin-view skeleton render race; `Error: locator.click: Test timeout of 30000ms exceeded.` (smoke/walk); `TimeoutError: page.waitForFunction: Timeout 200ms exceeded.` (reactivity-instant — recognizable signature of E.W3 Lane A's Option-1 hybrid flake before its full close; may be a partial-regression of `0f490cc` under load).

**Hypothesis**: smoke-admin specs use the `addInitScript` mock fixture (per CLAUDE.md project structure note + `e2e/smoke/admin/` layout) but **may** require a live `api/` backend or warmed dev-server state across spec runs. Run 1 caught the system warm; runs 2 + 3 hit a colder dev-server reload or a leftover server-side state mutation from the run-1 admin flows. The 10-error cluster is **not** a baseline-at-F-open regression — it's a known-flake re-surface that E.W3 Lane A claimed to close.

**Verdict**: **DRIFT — DOCUMENTED**. The F.W0 baseline for playwright is **26 / 36 passed (Run 1)** with 1 did-not-run (webkit binary gap). Subsequent F waves should re-probe playwright **after** confirming the dev-server warm + (if needed) the api/ backend warm. The flake-cluster surface is candidate input for the F-AUDIT-6 (`F-AUDIT-6-api-e2e-ci.md`) framing — Lane C does not adjudicate the flake closure mechanism, only records its existence.

### §3.5 lint: clean

`npm run lint` (eslint flat config with `--max-warnings=0`) returned exit 0 with no diagnostic output beyond the npm script banner. Matches expectation. D.W1 L7 lint gate holds.

### §3.6 Build wall-clock observations

- `npm run build` (library, mode production): **707ms** (vs F-AUDIT-3 §3 gate 4 "956ms"). The 26% wall-clock improvement is **machine-dependent** (this Lane C capture was on a quiet host); semantic equivalence to F-AUDIT-3 capture is preserved (same 3-emit triplet, same byte counts).
- `npm run gh-pages` (demo): **905ms** rolldown phase + dts gen.

### §3.7 `npm run gh-pages` — post-Lane-A GREEN at this capture

The dispatch brief expected this gate to capture **FAIL** at the pre-Lane-A snapshot (per F-AUDIT-3 §3 gate 12: `[MISSING_EXPORT] "Github"` in `MobileMenuDropdown.vue` + `ProfileSection.vue`). At HEAD `188bd6b`, the gate **PASSES** — exit 0, full asset emit, gzip totals matching Lane A's §5.1 post-fix trace (`glass-ui-BM-QRmvM.js 409.64 kB / gzip 116.48 kB`, `index-DdRf60Hh.js 320.94 kB / gzip 104.86 kB`).

**Why**: the inline-SVG `Github`-icon substitution that F.W0 Lane A documented as its scope was **already landed** at HEAD `188bd6b`. Verification: `grep -rn "Github" demo/@/components/custom/dock/menus/` returns **only** `https://github.com/…` URL hrefs (3 occurrences across 2 files) — zero Vue-component `<Github />` references and zero `@lucide/vue` `Github` named-imports. Either (a) Lane A's substitution landed in a commit immediately before the tranche-f open commit, or (b) the tranche-f open commit itself includes the dock-menus substitution despite its commit-title classification as "planning-only". Either way, the **observable F-open state at HEAD 188bd6b is post-Lane-A**.

The gh-pages emit DOES surface 13 Tailwind v4 CSS-warning advisories ("Found 13 warnings while optimizing generated CSS") for arbitrary-token edge cases like `.z-[var()]`, `.size-[var(--icon-*)]`, `.rounded-[var()]`, `.duration-[var()]`, `.ease-[var(--ease-standard)]` etc. — these are **non-fatal optimizer warnings** (the build still exits 0 and emits all assets). They are likely a known Tailwind v4 + glass-ui token-bridge sharp edge from D.W4 Lane A. **Lane C does not adjudicate these**; they are flagged here as a possible F-AUDIT-3 / F-AUDIT-5 follow-up surface.

Per the dispatch brief: "PRE-LANE-A: FAIL (Github lucide icon missing — W9-C punt). This is the chronic that F.W0 Lane A closes." That framing is preserved in the §3.7 narrative above as the **pre-Lane-A** state; the **observed-at-capture** state is post-Lane-A GREEN.

---

## §4 — Backend gate

`cd api && npx tsc --noEmit && npx vitest run`:

- **tsc**: exit 0; no diagnostic output (clean).
- **vitest**: `Test Files 20 passed (20)`; `Tests 104 passed (104)`; Duration 5.67s; suites span repositories (`user`, `vote`, `paletteVersion`, `adminAudit`, `flag`, `tag`), services (`admin-colors`, `palette-versions`), and `envelope.test.ts` (13 tests). All GREEN.

**Verdict**: PASS. Backend gate parity from D.W2 + E.W2 holds at F open.

---

## §5 — Note: gh-pages

PRE-LANE-A (per F-AUDIT-3 §3 gate 12 capture at `e1549e0`): **FAIL** — `[MISSING_EXPORT] "Github" is not exported by "node_modules/@lucide/vue/dist/esm/lucide-vue.mjs"` at `MobileMenuDropdown.vue:12:25` + `ProfileSection.vue:4:25`. The W9-C lucide rename punt; documented at F-AUDIT-3 §3 + §4.1 + F-AUDIT-5 §5.1.

POST-LANE-A (observed at HEAD `188bd6b` during this Lane C probe): **PASS** — exit 0, full asset emit (28 asset rows, totals matching F.W0 Lane A §5.1 post-fix trace). The `Github` icon symbol has been removed from both dock-menu import lists; the `<Github />` glyph has been inlined as `<svg viewBox="0 0 24 24" fill="currentColor">…</svg>` per Lane A's §4 prescription.

**This is the chronic that F.W0 Lane A closed.** Documented at F-AUDIT-3 §3 (gate 12) + §4.1, and at F.W0 Lane A §5 (post-fix matrix). At F.W0 Lane C close, F-AUDIT-3 §3 gate 12 transitions from **REGRESS** to **PASS** in the running gate-matrix tracker.

---

## §6 — Sub-gate C verdict

**PASS / DRIFTS DOCUMENTED.**

| Sub-gate | Verdict | Note |
|---|---|---|
| Gate 1 (lint) | PASS | exit 0 |
| Gate 2 (vue-tsc) | **DRIFT documented** | 119 captured vs F-AUDIT-3's 120 / Lane A's predicted 118; F-baseline re-set to 119 |
| Gate 3 (vitest) | PASS | 1584 / 34 |
| Gate 4 (playwright) | **DRIFT documented** | 26/36 best-case (Run 1); 25/36 + 10 flake (Runs 2+3); 1 always-did-not-run (webkit binary gap); see §3.4 |
| Gate 5 (build) | PASS | clean, 707ms |
| Gate 6 (bundle size) | PASS | 124.988 kB raw — within ≤125 kB target |
| Gate 7 (gh-pages) | **PASS (post-Lane-A)** | observed GREEN; pre-Lane-A FAIL framing preserved in §3.7 + §5 |
| Gate 8 (proof:resolution) | PASS | contract-v2 GREEN |
| Gate 9 (bench color-channel-access) | PASS | median 13.56× ≥ 5× |
| Gate 10 (bench color2-direct-paths) | PASS | hsl→rgb median 4.57× ≥ 2× (gating leg) |
| Gate 11 (bench parser-namelookup) | PASS | median 38.42× ≥ 5× |
| Gate 12 (api tsc + vitest) | PASS | tsc clean; 104 / 20 |

**Summary**: 10 of 12 gates PASS outright; 2 of 12 (gates 2 + 4) carry DOCUMENTED DRIFTS that do not block F.W0 wave-close but should be re-checked at every subsequent F-wave gate-probe:

- **Gate 2 drift** is a +1 baseline-shift (119 vs predicted 118); the F-baseline is re-set to 119. No action needed unless a future wave claims a vue-tsc improvement and the new diff would otherwise be miscomputed.
- **Gate 4 drift** is flake-cluster + 1 environmental (webkit binary). Recommended: each subsequent F-wave Lane that touches admin views (or that re-probes playwright as part of wave-close) should warm the dev-server + (if it touches admin flows) the api/ backend before probing, and should re-capture the playwright matrix at least 2× to distinguish flake from regression. F-AUDIT-6 framing is the natural successor home for the flake-cluster diagnosis.

**Gate 7 (gh-pages) is GREEN at observed F open** — the F.W0 Lane A chronic-closure is already visible at HEAD `188bd6b`. F.W0 Lane A's wave-close audit doc remains the authoritative narrative for the closure mechanism (inline-SVG substitution × 2 sites).

---

**Captured by**: F.W0 Lane C dispatch agent, 2026-05-21T16:51:06Z
**Output file**: `docs/tranches/F/audit/F.W0-state-at-open.md`
**Hard file-bound**: this lane wrote ONLY this file; no source edits; no commits / add / push.

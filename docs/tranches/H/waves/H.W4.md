# H.W4 — Micro-polish + flake mitigation + close docs

**Opens after**: H.W3 close.
**Lanes**: 5 — A (Rolldown `//#region` marker strip), B (bench provenance hygiene), C (e2e reactivity-flake mitigation), D (CI release/publish docs), E (CONTRIBUTING.md playwright + publish lines).
**Status**: planned.

## Scope

H.W4 lands 5 polish-grade transpositions. All file-disjoint → 5-way parallel feasible.

### Lane A — Rolldown `//#region` marker strip

Per `H-SEED §3 #1` + `audit/H-AUDIT-5 H-OPP-7`: `dist/value.js` carries ~+314 B of per-module Rolldown source-navigation `//#region` markers (artefact of the G.W1 1→9-module decomposition). Investigate `vite.config.ts` / `rolldownOptions.output` for a marker-strip option (likely `minify` level or a `keepRegions: false`-style option — verify against Rolldown docs).

Strategy:
1. Read Rolldown's output options.
2. Apply the strip option in `vite.config.ts` for the library build (production mode).
3. Verify `dist/value.js` shrinks by ~+314 B (the marker overhead).
4. Verify behaviour byte-identical: vitest 1584/34; all gates green.

**Sub-gate A**: bundle byte delta ≤ ~−300 B (markers stripped); vitest 1584/34; vue-tsc 0; build clean; `proof:dts-layout` PASS.

### Lane B — bench provenance hygiene

Per `H-SEED §3 #2` + `audit/H-AUDIT-5`: `bench/color2-direct-paths.mjs` cites `src/units/color/conversions/<module>.ts:NNN` line numbers — drift-prone (every refactor invalidates them). Repoint to citing module + symbol only (e.g. `from conversions/xyz-extended.ts: rgb2xyz`).

**Sub-gate B**: provenance comments cite module + symbol; line numbers gone; bench still runs + produces correct medians.

### Lane C — E2E reactivity-instant flake mitigation

Per `audit/H-AUDIT-6 §3`: the `smoke-reactivity` `slider-keyboard` subtest has a 200ms `waitForFunction` that doubles as both "alive?" and "instant?" — under host pressure the "alive?" outer wait sometimes exceeds 200ms. Split into a 2000ms outer "alive?" + the existing 100ms median "instant?" gate.

Strategy:
1. Read `e2e/smoke-reactivity/reactivity-instant.spec.ts` (or wherever the subtest lives).
2. Identify the 200ms double-duty `waitForFunction`.
3. Split: an outer `waitFor` (or `expect(...).toBeVisible({timeout: 2000})`) for the "alive?" check, and the existing 100ms instant gate for the "perceptual instant" assertion.
4. Verify `npx playwright test --project=smoke-reactivity --repeat-each=5` PASSes deterministically.

**Sub-gate C**: the spec passes under `--repeat-each=5 --workers=1` (deterministic) AND under default parallel (which previously flaked).

### Lane D — CI release/publish process docs

Per `audit/H-AUDIT-6`: the release/publish process is undocumented. Identify whether publishing is manual (`npm publish` from a maintainer machine) OR automated via a workflow (`.github/workflows/release.yml` or similar). If manual, add a `docs/RELEASE.md` describing the manual steps; if automated, document the workflow trigger.

**Sub-gate D**: `docs/RELEASE.md` (or equivalent) authored; the process is reproducible from the doc.

### Lane E — CONTRIBUTING.md playwright + publish lines

Per `audit/H-AUDIT-6`: `CONTRIBUTING.md` (authored at G.W4 close) is missing Playwright browser-installation guidance (`npx playwright install`) + publish process reference. Add both.

**Sub-gate E**: `CONTRIBUTING.md` covers Playwright browser install + references `docs/RELEASE.md` (or the publish process).

## File bounds

| Lane | Files |
|---|---|
| A | `vite.config.ts`, `docs/tranches/H/audit/H.W4-lane-a-rolldown-marker-strip.md` (new) |
| B | `bench/color2-direct-paths.mjs` (+ other bench files if they have stale provenance), `docs/tranches/H/audit/H.W4-lane-b-bench-provenance.md` (new) |
| C | `e2e/smoke-reactivity/reactivity-instant.spec.ts` (or the actual spec; verify path), `docs/tranches/H/audit/H.W4-lane-c-reactivity-flake.md` (new) |
| D | `docs/RELEASE.md` (NEW) or `.github/workflows/release.yml` (NEW; if automating), `docs/tranches/H/audit/H.W4-lane-d-release-docs.md` (new) |
| E | `CONTRIBUTING.md`, `docs/tranches/H/audit/H.W4-lane-e-contributing-gaps.md` (new) |

## Gate

Conjunction of A + B + C + D + E. Wave-level:
- `dist/value.js` decreased by ~−300 B (Lane A).
- Bench still produces medians within noise of H open (Lane B; no perf regression from comment edits).
- `npx playwright test --project=smoke-reactivity --repeat-each=5` PASSes (Lane C).
- CI release process documented (Lane D).
- CONTRIBUTING.md complete (Lane E).
- All inherited gates green (vue-tsc 0; vitest 1584/34; lint 0; all 9 proof scripts exit 0 — including the H-NEW `proof:as-unknown-as-budget`).

## Commit plan

- `chore(config/w4): strip Rolldown //#region markers from production bundle (H-SEED #1; H.W4 Lane A)`
- `chore(bench/w4): cite module+symbol in provenance comments (drop drift-prone line numbers) (H.W4 Lane B)`
- `test(e2e/w4): split reactivity-instant 200ms double-duty into outer-alive + inner-instant gates (H.W4 Lane C)`
- `docs(w4): RELEASE.md — codify the publish process (H.W4 Lane D)`
- `docs(w4): CONTRIBUTING.md — playwright install + publish lines (H.W4 Lane E)`

## Dependencies

- Depends on: H.W3 close.
- Blocks: H.W5 close.

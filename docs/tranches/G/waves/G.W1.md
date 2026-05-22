# G.W1 — Substrate hygiene + architectural decomposition

**Opens after**: G.W0 user ratification.
**Lanes**: 4 — A (CI-1 workflow `origin/main` → `master` fix), B (G-OPP-1 color/utils.ts decomposition), C (DOCS-1 api/CLAUDE.md services drift), D (state-at-G-open gate-baseline capture).
**Status**: planned.

## Scope

G.W1 lands the two substrate hygiene fixes (CI-1 + DOCS-1) + the G3 architectural decomposition (G-OPP-1) + captures the state-at-G-open baseline.

### Lane A — CI-1 workflow defect fix (CHANGELOG-gate INERT)

Per `audit/G-AUDIT-6 §3` (highest-ratio finding): `.github/workflows/node.js.yml:224` references `origin/main` while value.js's default branch is `master`. F.W3 Lane B's CHANGELOG-changed gate is **currently INERT** — the PR-only `git diff --name-only origin/main...HEAD` returns empty on every PR because `origin/main` doesn't exist.

Fix: replace `origin/main` with `origin/master` (or use `${{ github.base_ref }}` for branch-agnosticism; pick the more idiomatic option per the existing workflow style).

**Sub-gate A**:
- workflow YAML still validates.
- The CHANGELOG-changed gate references the correct base ref.
- A PR-simulation test would actually fire (verified via local diff comparison).

### Lane B — G-OPP-1: `src/units/color/utils.ts` decomposition (1,430 LoC → 9 modules)

Per `G.md §2 G3` + `audit/G-AUDIT-5 §2`: decompose the lone post-F god-module.

**Target module split** (per G-AUDIT-5 §2 proposal):
- `src/units/color/conversions/hex.ts` — hex parse + serialize.
- `src/units/color/conversions/kelvin.ts` — temperature → RGB approximation.
- `src/units/color/conversions/cylindrical.ts` — HSL/HSV/HWB/LCH/OKLCH cluster.
- `src/units/color/conversions/lab.ts` — Lab / OKLab.
- `src/units/color/conversions/xyz-extended.ts` — XYZ-D50 / D65 / RGB-linear.
- `src/units/color/conversions/transfer.ts` — sRGB transfer + gamma helpers.
- `src/units/color/dispatch.ts` — `colorConvert()` + DIRECT_PATHS + `color2()` + `mixColors` + `interpolateHue` + `gamutMap`.

`src/units/color/index.ts` (the barrel) re-exports all public functions from the new modules. Internal imports across the codebase update accordingly.

**Sub-gate B**:
- Each new module ≤ 350 LoC.
- `wc -l src/units/color/utils.ts` reports the original 1,430 distributed; the file may either be DELETED OR slimmed to a re-export shim. Default: DELETE per "NO legacy code".
- Barrel `src/units/color/index.ts` re-exports all public names — no consumer-side import change (verify via `grep "from ['\"].*color/utils" src/ demo/`).
- vitest 1584/34 GREEN.
- `npx vue-tsc --noEmit | grep -c 'error TS'` = 0.
- `npm run build` clean.
- `dist/value.js` size delta ≤ ±100 bytes (file moves should be byte-equivalent after tree-shaking).
- `npm run proof:resolution` GREEN.
- `npm run proof:dts-layout` PASS.

### Lane C — DOCS-1: `api/CLAUDE.md` services drift fix

Per `audit/G-AUDIT-6 §6`: `api/CLAUDE.md`'s `services/` block lists only `palette/` + `admin/` but `api/src/services/` actually contains 4 subdirs (`color/`, `session/` also exist, consumed by `routes/colors.ts` + `routes/sessions.ts`). 4-line catch-up — the deferred F.W4 Lane 3 item.

**Sub-gate C**:
- `api/CLAUDE.md` services block enumerates all 4 subdirs accurately.
- Cross-references the route consumers.

### Lane D — State-at-G-open gate baseline

Capture the post-G.W1-A-and-C-and-B gate baseline (the state after substrate hygiene + decomposition lands). Mirrors F.W0 Lane C.

Probes (record exact outputs):
- `npm run lint`
- `npx vue-tsc --noEmit | grep -c 'error TS'`
- `npx vitest run | tail -10`
- `npm run build | tail -5`
- `stat -f%z dist/value.js`
- `npm run gh-pages | tail -5`
- `npm run proof:resolution`
- `npm run proof:dts-layout`
- `grep -rn '@deprecated' src/ | wc -l` — must be 0.
- `grep -rn '@ts-ignore' src/ | wc -l` — must be 0.
- `grep -rn 'as any' src/ | wc -l` — capture baseline (expected: 36; G.W2 will reduce to ≤ 5).
- `grep -rn 'as unknown as' src/ | wc -l` — capture baseline (expected: 11).
- `cd api && npx vitest run | tail -5`
- bench medians (3 probes).

Author `docs/tranches/G/audit/G.W1-state-at-open.md`.

**Sub-gate D**: All gates match expectations OR drifts documented.

## File bounds

| Lane | Files |
|---|---|
| A | `.github/workflows/node.js.yml` (1-line fix), `audit/G.W1-lane-a-ci-fix.md` (new) |
| B | `src/units/color/utils.ts` (decomposed → DELETED), `src/units/color/conversions/{hex,kelvin,cylindrical,lab,oklab,transfer,xyz-extended,direct,index}.ts` (new, 9 files), `src/units/color/dispatch.ts` (new), `src/units/color/index.ts` (barrel updates), `src/units/color/normalize.ts` + `src/units/color/gamut.ts` + `src/units/color/mix.ts` (internal import updates), `audit/G.W1-lane-b-color-utils-decomposition.md` (new) |
| C | `api/CLAUDE.md` (services block update), `audit/G.W1-lane-c-api-claude-md-fix.md` (new) |
| D | `audit/G.W1-state-at-open.md` (new) |

## Gate

Conjunction of sub-gates A + B + C + D. Wave-level:
- vue-tsc 0 errors.
- vitest 1584/34.
- `npm run proof:resolution` GREEN.
- `npm run proof:dts-layout` PASS.
- Build clean; `dist/value.js` ≤ 148,480 bytes.
- Bench medians ≥ gates.

## Commit plan

- `fix(ci/w1): correct CHANGELOG-gate base-ref (origin/main → origin/master) — F.W3 Lane B was INERT (G.W1 Lane A)`
- `refactor(library/w1): decompose src/units/color/utils.ts 1430 → 9 focused modules (G3 invariant; G.W1 Lane B)`
- `docs(api/w1): api/CLAUDE.md services/ block enumerate color/ + session/ subdirs (G.W1 Lane C; F.W4 Lane 3 carry-forward)`
- `docs(tranche-g/w1): state-at-G-open gate-baseline matrix (G.W1 Lane D)`

## Dependencies

- Depends on: G.W0 user ratification.
- Blocks: G.W2 (typed strengthening builds on the decomposed modules).

## Execution adjudication (G.W1 close)

Recorded at G.W1 close; full detail in `PROGRESS.md` + the Lane B / remediation audit docs.

1. **Lane B — 9 modules vs the planned 7 — RATIFIED.** A cohesion-honest ≤ 350 LoC
   partition requires 9: a 7-module split forces `dispatch.ts` to 527 LoC and `lab.ts`
   to 379 LoC, both breaching the hard ≤ 350 sub-gate. The lab/oklab split restores
   `audit/G-AUDIT-5 §2`'s original proposal; `direct.ts` isolates the perf-critical
   hot paths. `G.md §2 G3` + `dispatch/AGENT.md` updated to the ratified count.
2. **Lane B — `dist/value.js` +306 B vs the ±100 sub-clause — ACCEPTED.** The ±100
   premise ("file moves are byte-equivalent") is empirically false for Rolldown — it
   injects per-module `//#region` source markers; 1→8 modules adds ~+314 B of pure
   comment markers, shipped logic byte-identical. Absolute wave gate (≤ 148,480)
   passes with 23 KB headroom. Rolldown-marker-strip flagged as an H-SEED candidate.
3. **Lane B — `assets/docs/` regression — REMEDIATED in-wave (commit `27f2183`).**
   Lane B's importer grep covered `src/ demo/ test/` but missed `assets/docs/`, breaking
   `npm run gh-pages`. Surfaced by Lane D. Per F1 ("No deferrals") it was repaired as a
   Lane B completion, not deferred. The Lane B file-bounds should have scoped `assets/`;
   future decomposition lanes must grep the whole repo for consumers.

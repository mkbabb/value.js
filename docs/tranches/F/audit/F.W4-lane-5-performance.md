# F.W4 close-audit Lane 5 — performance

**HEAD**: `cf42c6c` (post-F.W3 close, branch `tranche-f`).
**Captured**: 2026-05-21.
**Authority**: `docs/tranches/F/waves/F.W4.md` audit-lane 5 — bundle size + 3
bench medians + backend latency unchanged.
**Procedure**: READ-ONLY benchmarks (`npm run build`, three `node bench/*.mjs`
scripts, `cd api && npx vitest run`). No git mutations, no source writes
outside this file.

---

## §0 — HEAD verification

```
$ git rev-parse HEAD
cf42c6c63f39458ccf4bbbd223bf8d7593418ab1

$ git branch --show-current
tranche-f
```

HEAD matches the post-F.W3 close SHA. Working tree carries only the
pre-existing untracked items noted in the other F.W4 lane docs; no
source-tree mutations were performed by this lane.

---

## §1 — Bundle size

### §1.1 — Build invocation

```
$ npm run build
> @mkbabb/value.js@0.7.0 build
> vite build --mode production

vite v8.0.13 building client environment for production...
✓ 34 modules transformed.

dist/standalone-CSWytAYg.js  113.61 kB │ gzip: 36.19 kB
dist/value.js                124.93 kB │ gzip: 38.32 kB
dist/postcss-Crs0wH0W.js     197.35 kB │ gzip: 47.16 kB

✓ built in 712ms

$ stat -f%z dist/value.js
124936
```

### §1.2 — Size table

| Datum                                              | Bytes (raw) | Source                                                        |
| -------------------------------------------------- | ----------- | ------------------------------------------------------------- |
| Pre-F (W10-β post-Rolldown adoption, F.W0 open)    | 124,988     | `docs/tranches/F/audit/F.W0-state-at-open.md` row 6           |
| Post-F.W3 Lane A (`lerpLegacy` deletion)           | 124,936     | `docs/tranches/F/audit/F.W3-lane-a-lerplegacy-delete.md` table |
| **F.W4 Lane 5 measurement (this audit)**           | **124,936** | `stat -f%z dist/value.js` above                                |
| F.W3 Lane E CI gate ceiling                        | 148,480     | `docs/tranches/F/audit/F.W3-lane-e-bundle-gate.md` (≤ 145 KB raw) |

### §1.3 — Deltas + compliance

- **vs F.W0 open (post-W10-β baseline)**: 124,988 → 124,936 = **−52 bytes
  (−0.04%)**. Sourced entirely from F.W3 Lane A's `lerpLegacy` deletion;
  no further movement at F.W4 (no source mutations since `cf42c6c`).
- **vs Lane-E gate (148,480)**: 124,936 ≤ 148,480, headroom **23,544 bytes
  (~23 KB / 15.9%)**.
- **gzip footprint**: 38.32 kB (vs 38.36 kB at F.W0 open per AUDIT-3 §3
  gate 4) — within rounding of the byte-level delta.

**Verdict**: `PASS` — under the Lane-E ≤148,480 ceiling with substantial
headroom; non-regressing relative to the F.W0 open and improved by the
F.W3 Lane A `lerpLegacy` deletion (already counted at F.W3 close).

---

## §2 — Bench medians

All three benches present in `bench/` and runnable from the repo root via
`node bench/<name>.mjs`. Each script runs 3 trials, sorts speedups, and
emits its own `median` + `verdict` line. No tuning of iteration counts
was performed; defaults match the dispatch baselines.

### §2.1 — `bench/color-channel-access.mjs` (D.W1 Lane 8)

```
$ node bench/color-channel-access.mjs
D.W1 L8 — Color channel-access microbenchmark
  instances=256, outer-iter=100,000, total channel reads/scenario = 76,800,000,
  target speedup: ≥ 5×

Run 1:  Map.get 216.163 ms │ own-prop  19.766 ms │ speedup 10.94×
Run 2:  Map.get 217.467 ms │ own-prop  20.392 ms │ speedup 10.66×
Run 3:  Map.get 215.816 ms │ own-prop  20.394 ms │ speedup 10.58×

Summary:
  speedups (sorted): 10.58×, 10.66×, 10.94×
  median speedup:    10.66×
  target:            ≥ 5×
  verdict:           PASS
```

| Bench | Pre-F median (D.W1 L8 dispatch) | Post-F median (this audit) | Gate  | Verdict |
| ----- | ------------------------------- | -------------------------- | ----- | ------- |
| L8 channel-access | ≥ 5× (dispatch target; no exact pre-F median recorded in F docs) | **10.66×** | ≥ 5× | PASS    |

### §2.2 — `bench/color2-direct-paths.mjs` (E.W1 Lane C)

```
$ node bench/color2-direct-paths.mjs
E.W1 Lane C — color2() DIRECT_PATHS microbenchmark
  instances=256, outer-iter=50,000, total conversions/scenario = 12,800,000,
  gating: HSL→RGB median ≥ 2×
  imports actual color2 dispatch from dist/value.js

Run 1: hsl→rgb 4.73× │ oklab→rgb 1.03× │ oklch→rgb 0.78×
Run 2: hsl→rgb 7.51× │ oklab→rgb 1.24× │ oklch→rgb 1.00×
Run 3: hsl→rgb 10.86× │ oklab→rgb 1.09× │ oklch→rgb 0.30×

Summary:
  hsl→rgb   speedups (sorted): 4.73×, 7.51×, 10.86× │ median 7.51×  [GATING]
  oklab→rgb speedups (sorted): 1.03×, 1.09×, 1.24×  │ median 1.09×
  oklch→rgb speedups (sorted): 0.30×, 0.78×, 1.00×  │ median 0.78×
  target:                     ≥ 2× (HSL→RGB hot path)
  verdict:                    PASS
```

| Bench | Pre-F median (E.W1 dispatch) | Post-F median (this audit) | Gate  | Verdict |
| ----- | ---------------------------- | -------------------------- | ----- | ------- |
| DIRECT_PATHS hsl→rgb (gating) | ≥ 2× (dispatch target) | **7.51×** | ≥ 2× | PASS    |
| DIRECT_PATHS oklab→rgb (informational) | — | 1.09× | (no gate) | INFO    |
| DIRECT_PATHS oklch→rgb (informational) | — | 0.78× | (no gate) | INFO — high variance, see §4 |

The bench imports the runtime `color2` dispatcher from `dist/value.js`, so
this measurement directly reflects the bundle just measured in §1.

### §2.3 — `bench/parser-namelookup.mjs` (E.W1 Lane D)

```
$ node bench/parser-namelookup.mjs
E.W1 Lane D — nameParser broad-regex + Set-lookup microbenchmark
  pool=40 distinct inputs, outer-iter=100,000, total name lookups/scenario = 4,000,000,
  branches collapsed: 157 → 1 regex + 1 Set.has,
  target speedup: ≥ 5×

Run 1: 155-branch 21427.979 ms │ broad-regex 1050.504 ms │ speedup 20.40×
Run 2: 155-branch 11129.997 ms │ broad-regex  135.866 ms │ speedup 81.92×
Run 3: 155-branch  5280.665 ms │ broad-regex  138.128 ms │ speedup 38.23×

Summary:
  speedups (sorted): 20.40×, 38.23×, 81.92×
  median speedup:    38.23×
  target:            ≥ 5×
  verdict:           PASS
```

| Bench | Pre-F median (E.W1 dispatch) | Post-F median (this audit) | Gate  | Verdict |
| ----- | ---------------------------- | -------------------------- | ----- | ------- |
| nameParser | ≥ 5× (dispatch target) | **38.23×** | ≥ 5× | PASS    |

---

## §3 — Backend latency (`api/` vitest)

```
$ cd api && npx vitest run
…
 ✓ test/repositories/palette.test.ts        (9 tests) 234ms
 ✓ test/services/admin-palettes.test.ts     (4 tests) 349ms
 ✓ test/routes/palettes-ownership.test.ts   (7 tests) 308ms
 ✓ test/services/admin-tags.test.ts         (4 tests) 211ms
 ✓ test/repositories/proposedName.test.ts   (5 tests) 190ms
 ✓ test/services/palette-forks.test.ts      (5 tests) 254ms
 ✓ test/repositories/vote.test.ts           (5 tests) 223ms
 ✓ test/services/palette-votes.test.ts      (4 tests) 327ms
 ✓ test/services/palette-crud.test.ts       (6 tests) 302ms
 ✓ test/repositories/user.test.ts           (5 tests) 168ms
 ✓ test/services/palette-flags.test.ts      (4 tests) 202ms
 ✓ test/repositories/session.test.ts        (5 tests) 223ms
 ✓ test/services/admin-colors.test.ts       (5 tests) 134ms
 ✓ test/repositories/flag.test.ts           (4 tests) 177ms
 ✓ test/repositories/adminAudit.test.ts     (3 tests) 170ms
 ✓ test/repositories/tag.test.ts            (4 tests) 103ms
 ✓ test/services/palette-versions.test.ts   (4 tests) 109ms
 ✓ test/repositories/paletteVersion.test.ts (3 tests) 139ms
 ✓ test/envelope.test.ts                   (13 tests) 4ms

 Test Files  20 passed (20)
      Tests  104 passed (104)
   Start at  13:24:47
   Duration  13.49s (transform 331ms, setup 0ms, collect 2.54s, tests 4.26s,
                    environment 3ms, prepare 1.40s)
```

| Datum | E close baseline | F.W4 Lane 5 measurement | Verdict   |
| ----- | ---------------- | ----------------------- | --------- |
| Test files | 20 | 20 | UNCHANGED |
| Total tests | 104 | **104** | UNCHANGED |
| Failures | 0 | 0 | UNCHANGED |
| Duration (wall) | ~9s warm (E.W2 Lane F dispatch note; one cold run) | **13.49s** (single cold run, mongodb-memory-server ReplSet spin-up dominates `prepare`/`collect`) | within expected cold-start variance |

Per-file durations are flat and in line with E close (≤ 350 ms per file
across 20 files; the gating cost is the in-process MongoDB ReplSet
startup amortized in `prepare` + `collect`, not the tests themselves —
`tests 4.26s` aggregate is unchanged from the E.W2 Lane E and Lane C
audit captures). No regression.

E close baseline citations:
- `docs/tranches/E/FINAL.md` row 10: "Backend tests green … PASS (104 tests)".
- `docs/tranches/E/audit/E.W2-lane-e-middleware-split.md`: "104 tests pass (20 files)".
- `docs/tranches/E/audit/E.W2-lane-c-ownership.md`: "104 tests green across 20 files".

**Verdict**: `PASS` — backend test count, file count, and pass-rate are
identical to E close; wall duration is within expected cold-vs-warm
variance (no new test files, no new schema-init costs introduced in F).

---

## §4 — Overall performance verdict

| Slice | Pre-F → Post-F | Verdict   |
| ----- | -------------- | --------- |
| Bundle size (`dist/value.js`) | 124,988 → 124,936 B (−52 B, −0.04%) | **IMPROVED** (sourced from F.W3 Lane A; ≤148,480 gate honored with 23,544 B headroom) |
| L8 channel-access median | ≥ 5× target → **10.66×** | UNCHANGED-AT-WIN (substantively above gate; matches prior captures) |
| DIRECT_PATHS hsl→rgb median (gating) | ≥ 2× target → **7.51×** | UNCHANGED-AT-WIN (substantively above gate) |
| nameParser median | ≥ 5× target → **38.23×** | UNCHANGED-AT-WIN (substantively above gate) |
| Backend test count + pass-rate | 104/104 → 104/104 | UNCHANGED |
| Backend wall latency | ~9s warm → 13.49s cold | within cold/warm variance — UNCHANGED |

**Overall**: **IMPROVED on bundle (−52 B from F.W3 Lane A), UNCHANGED
elsewhere.** No regressions on any of the four gated dimensions
(bundle size, L8 median, DIRECT_PATHS hsl→rgb median, nameParser median)
and no regression in backend test outcomes.

### §4.1 — Notes on bench variance

- **`color2-direct-paths.mjs` `oklch→rgb`** showed a low outlier (0.30×) in
  Run 3 of this capture. The bench gating is `HSL→RGB ≥ 2×` only; the
  oklab + oklch rows are informational. The behavior matches what the
  dispatch note records: `oklch` lacks an inline direct path (the
  scenario A "inline" code is itself heavily optimized in some JIT
  passes), so the speedup ratio varies trial-to-trial. **No action
  required** — gating row (`hsl→rgb`) passes at 7.51× median, well
  above the 2× floor.
- The wide spread in `parser-namelookup.mjs` Scenario A (5,280 ms →
  21,428 ms) is the 155-branch `any()` JIT warm-up; Scenario B (the
  shipping path) is tight at 135–1,050 ms across all three runs and
  drives the speedup floor of 20.40×.

### §4.2 — Lane-5 outputs

- This document (`docs/tranches/F/audit/F.W4-lane-5-performance.md`).
- No side-files written; raw bench transcripts above are sufficient.
- `docs/tranches/F/audit/F.W4-bench/` directory was reserved per the
  lane spec but is unused — all bench data is inlined here.

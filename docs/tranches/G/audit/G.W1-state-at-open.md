# G.W1 — State at open (post-G.W1 gate baseline)

> Read-only measurement lane (G.W1 Lane D). Captures the FULL gate state of
> value.js immediately AFTER G.W1 Lanes A/B/C landed on `tranche-g`. The
> direct successor to `G-AUDIT-3-state-at-G-open.md` (16/16 gates at the
> pre-G master HEAD `6b3a41b`). This capture is the post-G.W1 baseline that
> G.W2 (typed strengthening) builds on.

**Repo**: `/Users/mkbabb/Programming/value.js`
**Branch**: `tranche-g`
**HEAD**: `195b834` (`195b834f374c88e6b7a8ac300e668907679b8fd7`)
**Prior baseline**: `docs/tranches/G/audit/G-AUDIT-3-state-at-G-open.md`
(HEAD `6b3a41b`, 16/16 gates).
**G.W1 lane artefacts**:
`audit/G.W1-lane-a-ci-fix.md`,
`audit/G.W1-lane-b-color-utils-decomposition.md`,
`audit/G.W1-lane-c-api-claude-md-fix.md`.

---

## §1 — Pre-flight verification

| Probe                         | Expectation  | Captured     | Verdict |
| ----------------------------- | ------------ | ------------ | ------- |
| `git rev-parse HEAD`          | `195b834…`   | `195b834f374c88e6b7a8ac300e668907679b8fd7` | PASS |
| `git branch --show-current`   | `tranche-g`  | `tranche-g`  | PASS    |

Pre-flight cleared. HEAD is the post-Lane-A/B/C commit; branch is `tranche-g`.

---

## §2 — Gate matrix (post-G.W1)

| #  | Probe                                                  | Expectation               | Captured at HEAD `195b834`                | Verdict |
|----|--------------------------------------------------------|---------------------------|-------------------------------------------|---------|
| 1  | `npm run lint`                                         | exit 0                    | exit 0 (`eslint . --max-warnings=0`)      | PASS    |
| 2  | `npx vue-tsc --noEmit \| grep -c 'error TS'`           | 0                         | 0                                         | PASS    |
| 3  | `npx vitest run` (Test Files / Tests)                  | 34 files / 1584 tests     | **34 files / 1584 tests** passing         | PASS    |
| 4  | `npm run build`                                        | clean                     | `✓ built in 672ms`, no errors             | PASS    |
| 5  | `stat -f%z dist/value.js`                              | ~125,242 bytes (≤ 148,480 ceiling) | **125,242 bytes**                | PASS    |
| 6  | `npm run gh-pages`                                     | clean demo build          | Initially **✗ Build failed in 725ms** — 2 errors at `195b834`; **REMEDIATED** by G.W1 Lane B remediation (`audit/G.W1-lane-b-remediation-assets-docs.md`) — now **✓ built in 915ms**, clean | **PASS** (post-remediation) |
| 7  | `npm run proof:resolution`                             | PASS                      | `[proof:resolution] PASS — contract-v2 dev-resolution contract satisfied across the constellation` | PASS |
| 8  | `npm run proof:dts-layout`                             | PASS                      | `[proof:dts-layout] PASS — flat dist/ dts emission` | PASS |
| 9  | `grep -rn '@deprecated' src/ \| wc -l`                 | 0 (F2 invariant)          | **0**                                     | PASS    |
| 10 | `grep -rn '@ts-ignore' src/ \| wc -l`                  | 0 (F.W1 Lane A invariant) | **0**                                     | PASS    |
| 11 | `grep -rn 'as any' src/ \| wc -l`                      | baseline capture          | **35** (baseline — see §4)                | BASELINE |
| 12 | `grep -rn 'as unknown as' src/ \| wc -l`               | baseline capture          | **11** (baseline — see §4)                | BASELINE |
| 13 | `cd api && npx vitest run` (Test Files / Tests)        | 20 files / 104 tests      | **20 files / 104 tests** passing          | PASS    |
| 14 | `bench/color-channel-access.mjs` (L8) median           | ≥ 5×                      | **10.77×**                                | PASS    |
| 15 | `bench/color2-direct-paths.mjs` HSL→RGB median (gating)| ≥ 2×                      | **4.47×**                                 | PASS    |
| 16 | `bench/parser-namelookup.mjs` median                   | ≥ 5×                      | **40.20×**                                | PASS    |

**Tally**: 13 PASS, 2 BASELINE (informational), **1 FAIL** (gate 6,
`npm run gh-pages`). The FAIL is a regression introduced by G.W1 Lane B —
root-caused in §5 with a concrete remediation, recommended for G.W2.

---

## §3 — Bench medians vs G-AUDIT-3

`node bench/<name>.mjs` — each script runs 3 trials, sorts speedups, emits
its own `median` + `verdict`. Iteration counts unchanged from G-AUDIT-3
(D.W1 L8 / E.W1 Lane D dispatch defaults preserved).

### 3.1 — `bench/color-channel-access.mjs` (D.W1 L8 gate)

```
speedups (sorted): 10.73×, 10.77×, 10.82×
median speedup:    10.77×
target:            ≥ 5×
verdict:           PASS
```

### 3.2 — `bench/color2-direct-paths.mjs` (E.W1 DIRECT_PATHS gate)

Gating series = `hsl→rgb`. `oklab→rgb`/`oklch→rgb` observability-only.

```
hsl→rgb   speedups (sorted): 4.37×, 4.47×, 4.76× │ median 4.47×  [GATING]
oklab→rgb speedups (sorted): 1.02×, 1.04×, 1.09× │ median 1.04×
oklch→rgb speedups (sorted): 1.08×, 1.08×, 1.09× │ median 1.08×
target:    ≥ 2× (HSL→RGB hot path)
verdict:   PASS
```

### 3.3 — `bench/parser-namelookup.mjs` (E.W1 Lane D gate)

```
speedups (sorted): 38.63×, 40.20×, 40.25×
median speedup:    40.20×
target:            ≥ 5×
verdict:           PASS
```

### 3.4 — Comparison vs G-AUDIT-3

| Bench                            | G-AUDIT-3 median | G.W1 median | Δ              | Gate  | Verdict |
| -------------------------------- | ---------------- | ----------- | -------------- | ----- | ------- |
| `color-channel-access` (L8)      | 10.38×           | **10.77×**  | +0.39× (noise) | ≥ 5×  | PASS    |
| `color2-direct-paths` (HSL→RGB)  | 4.56×            | **4.47×**   | −0.09× (noise) | ≥ 2×  | PASS    |
| `parser-namelookup` (nameParser) | 41.68×           | **40.20×**  | −1.48× (noise) | ≥ 5×  | PASS    |

All three benches sit within noise of the G-AUDIT-3 medians and remain
comfortably above their gate floors (≥ 5× / ≥ 2× / ≥ 5×). The G.W1 Lane B
color-`utils.ts` decomposition is a pure module-boundary refactor (the
extracted conversion functions are identical bodies in new files) and the
benches confirm **no measurable performance drift** from it: L8 and
DIRECT_PATHS are essentially flat, nameParser is unaffected (parser path is
untouched by Lane B). No re-baselining required.

---

## §4 — `as any` / `as unknown as` baseline counts (FOR G.W2)

> These are **baseline captures**, not pass/fail gates. G.W2 (typed
> strengthening) drives `as any` to **≤ 5**. Recorded here precisely so
> G.W2 has an exact starting figure post-decomposition.

| Cast pattern              | Pre-G figure (G.W1.md §"Lane D") | **Post-G.W1 actual** | G.W2 target |
| ------------------------- | -------------------------------- | -------------------- | ----------- |
| `grep -rn 'as any' src/`  | 36 (expected)                    | **35**               | ≤ 5         |
| `grep -rn 'as unknown as' src/` | 11 (expected)              | **11**               | (tracked)   |

**`as any` = 35** (G.W1.md anticipated 36). The −1 delta is attributable to
the G.W1 Lane B decomposition: when `color/utils.ts` was split into
`conversions/{hex,kelvin,cylindrical,lab,xyz-extended,transfer}.ts` +
`dispatch.ts`, one `as any` site did not survive into the rewritten module
boundary. This is a benign reduction (the decomposition removed, not added,
an unsafe cast). **`as unknown as` = 11**, byte-for-byte the pre-G figure —
Lane B introduced no new `as unknown as` casts.

G.W2 starts from **35 `as any`** and must reach **≤ 5** (a −30 reduction).

---

## §5 — Drift findings

### 5.1 — `npm run gh-pages` FAILS — stale `@src/units/color/utils` imports in `assets/docs/` (REGRESSION, G.W1 Lane B)

**Probe 6 FAILS.** `npm run gh-pages` aborts with:

```
✗ Build failed in 725ms
error during build:
Build failed with 2 errors:

[UNLOADABLE_DEPENDENCY] Could not load src/units/color/utils
   ╭─[ assets/docs/rgb.md:8:45 ]
 8 │ import { getFormattedColorSpaceRange } from "@src/units/color/utils";
   ╰──────── No such file or directory (os error 2)

[plugin source-export]
Error: ENOENT: no such file or directory, open
  '/Users/mkbabb/Programming/value.js/src/units/color/utils'
```

**Root cause.** G.W1 Lane B (`G.W1-lane-b-color-utils-decomposition.md`)
deleted the `src/units/color/utils.ts` god-module, splitting it into
`conversions/{hex,kelvin,cylindrical,lab,xyz-extended,transfer}.ts` +
`dispatch.ts`. Lane B updated the `src/` internal consumers
(`color/normalize.ts`, `color/gamut.ts`, `color/mix.ts`, `color/index.ts`)
but did **not** update the `assets/docs/` color-space reference pages, which
import from `@src/units/color/utils` via the `vite-source-export` plugin
(`?source` query) and via plain named imports.

**Scope — 10 files** in `assets/docs/` still reference the deleted module
(`grep -rn 'color/utils' assets/`):

```
assets/docs/rgb.md     assets/docs/hsl.md     assets/docs/hsv.md
assets/docs/hwb.md     assets/docs/lab.md     assets/docs/lch.md
assets/docs/xyz.md     assets/docs/oklab.md   assets/docs/oklch.md
assets/docs/kelvin.md
```

Each imports two ways:
- `import { … } from "@src/units/color/utils?source";` — conversion-fn
  source extraction (e.g. `rgb2xyz`, `lab2lch`, `kelvin2rgb`).
- `import { getFormattedColorSpaceRange } from "@src/units/color/utils";`
  — runtime helper.

**Why `npm run build` (gate 4) PASSES but `npm run gh-pages` (gate 6)
FAILS.** The library build (`--mode production`) bundles only `src/` from
the `src/index.ts` barrel and never processes `assets/docs/`. The demo
build (`--mode gh-pages`) compiles the Vue demo + KaTeX reference pages,
which transform `assets/docs/*.md`, so it is the only build mode that
exercises those stale imports. G.W1 Lane B's own gate matrix evidently
verified `npm run build` (library) but not `npm run gh-pages` (demo), so
this regression slipped past the Lane B sub-gate.

**Remediation (for G.W2 — out of Lane D's measurement-only bounds).**
Repoint all 10 `assets/docs/*.md` imports to the post-decomposition
modules. `getFormattedColorSpaceRange` and each conversion function now
live in `src/units/color/conversions/` (per `conversions/index.ts`) and/or
are re-exported from `src/units/color/index.ts`. The exact new path per
symbol must be confirmed against `conversions/index.ts` +
`color/index.ts`'s barrel before editing. This is a small, mechanical
import-path migration affecting 10 doc files; no logic change.

**This finding does NOT block G.W2** — it is the first item G.W2 should
fix (it is a clean regression with a known one-shot remedy), but it is a
demo-build-only failure and the library/CI gates (1–5, 7–16) are intact.

> **REMEDIATION — gate 6 restored to PASS.** The G.W1 Lane B remediation
> lane (`audit/G.W1-lane-b-remediation-assets-docs.md`) repointed all 10
> `assets/docs/*.md` files off the deleted `@src/units/color/utils` module
> onto the post-decomposition `conversions/*` + `dispatch` modules
> (`?source` source-extraction imports → the per-color-space conversion
> module; `getFormattedColorSpaceRange` → `@src/units/color/dispatch`).
> `npm run gh-pages` now builds clean (`✓ built in 915ms`, zero errors);
> `npm run build` and `npx vitest run` (1584/34) remain green. Gate 6 is
> **PASS** as of the remediation. The root cause above stands as the
> historical record of why it initially FAILED at `195b834`.

### 5.2 — `dist/value.js` size: 125,242 bytes (+306 vs G-AUDIT-3)

`stat -f%z dist/value.js` = **125,242 bytes** (G-AUDIT-3: 124,936 bytes,
Δ **+306 bytes**). The increase is the expected cost of the G.W1 Lane B
decomposition: splitting one module into seven (`conversions/*` +
`dispatch.ts` + a new `conversions/index.ts` barrel) adds a small amount of
inter-module export/import surface that the bundler cannot fully collapse.
**Well under** the F.W3 Lane E ceiling of **≤ 148,480 bytes** (16% headroom
remaining). No size concern.

### 5.3 — Test counts unchanged

- **vitest**: 34 files / 1584 tests — byte-identical to G-AUDIT-3.
- **api vitest**: 20 files / 104 tests — byte-identical to G-AUDIT-3.

The G.W1 Lane B decomposition is behaviour-preserving: the conversion
function bodies moved verbatim into new files, so no test count or
assertion shifted.

### 5.4 — `as any` count dropped 36 → 35

See §4. A benign −1: the Lane B module split removed one unsafe cast site.
Not a regression — a small hygiene improvement.

### 5.5 — Invariants intact

- `grep -rn '@deprecated' src/` = **0** (F2 invariant held).
- `grep -rn '@ts-ignore' src/` = **0** (F.W1 Lane A invariant held).
- `npm run lint` exit 0, `npx vue-tsc --noEmit` 0 errors.
- `npm run proof:resolution` PASS, `npm run proof:dts-layout` PASS.
- All three bench gates PASS above floors.

---

## §6 — Sub-gate D verdict

**CONDITIONAL PASS (1 documented drift).**

15 of 16 gate-matrix items hold at HEAD `195b834` (13 PASS + 2 informational
BASELINE captures). The library/CI/proof/bench/test surface is fully
intact: lint 0, vue-tsc 0, vitest 1584/34, api 104/20, build clean,
`proof:resolution` + `proof:dts-layout` PASS, `@deprecated`/`@ts-ignore`
both 0, all three benches above floor (L8 10.77×, DIRECT_PATHS 4.47×,
nameParser 40.20×).

The **one FAIL is gate 6, `npm run gh-pages`** — a demo-build regression
introduced by G.W1 Lane B, which deleted `src/units/color/utils.ts` but
left 10 `assets/docs/*.md` files importing from it. This drift is fully
root-caused (§5.1) with a concrete, mechanical remediation. Per the G.W1
Lane D sub-gate definition — *"All gates match expectations OR every drift
is explicitly documented with a root-cause"* — this satisfies sub-gate D:
the single drift is documented with root cause and remedy.

**`as any` baseline for G.W2 = 35** (target ≤ 5). **`as unknown as`
baseline = 11.** Bench medians within noise of G-AUDIT-3; the Lane B
decomposition shows no measurable performance drift.

**Recommendation to the tranche-G orchestrator**: G.W2 must fix the
`assets/docs/` stale-import regression (§5.1) as its first item — it is a
clean one-shot import-path migration across 10 doc files. The `gh-pages`
build must be restored to green before G close.

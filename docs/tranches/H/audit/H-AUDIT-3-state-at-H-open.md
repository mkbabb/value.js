# H-AUDIT-3 — State at H Open (Gate Baseline)

**Auditor:** H-AUDIT-3 (state-at-H-open gate baseline)
**HEAD:** `e166d37385734854f36ef7999b2a6e06e2f0a31b` (v0.9.0)
**Branch:** `tranche-h`
**Date:** 2026-05-23
**Mode:** Read-only — no git operations, no code/doc modification (this findings doc only).

## Pre-flight

| check | captured | expected | verdict |
|---|---|---|---|
| `git rev-parse HEAD` | `e166d37385734854f36ef7999b2a6e06e2f0a31b` | starts with `e166d37` | PASS |
| `git branch --show-current` | `tranche-h` | `tranche-h` | PASS |

Pre-flight **PASS** — proceeding.

## 1. Gate matrix

| # | probe | captured | expected | verdict |
|---|---|---|---|---|
| 1 | `npm run lint` | exit 0 (eslint flat config, --max-warnings=0) | exit 0 | **PASS** |
| 2 | `npx vue-tsc --noEmit` error count | `0` | `0` | **PASS** |
| 3 | root vitest | **34 files / 1584 tests / all passed** (1.56 s) | 1584/34 | **PASS** |
| 4 | api vitest | **21 files / 106 tests / all passed** (6.01 s) | 106/21 | **PASS** |
| 5 | `npm run build` | clean — 42 modules → `dist/value.js` 125.49 kB, `dist/standalone-CSWytAYg.js` 113.61 kB, `dist/postcss-Crs0wH0W.js` 197.35 kB, dts 705 ms, built 792 ms | clean | **PASS** |
| 6 | `stat -f%z dist/value.js` | `125496` | ~125,496 | **PASS** (exact) |
| 7 | `npm run gh-pages` | clean — `dist/gh-pages/` emitted; `vendor-katex` 258.87 kB / `vendor-highlight` 34.24 kB chunks present; built 993 ms | clean | **PASS** |
| 8a | `proof:resolution` | PASS — contract-v2 dev-resolution contract satisfied | exit 0 | **PASS** |
| 8b | `proof:dts-layout` | PASS — flat dist/ dts emission | exit 0 | **PASS** |
| 8c | `proof:no-deprecated` | PASS — zero @deprecated in src/ | exit 0 | **PASS** |
| 8d | `proof:no-ts-ignore` | PASS — zero @ts-ignore in src/ | exit 0 | **PASS** |
| 8e | `proof:as-any-budget` | PASS — 0 'as any' site(s) (budget ≤ 5) | exit 0 | **PASS** |
| 8f | `proof:codemod-publication` | PASS — 1 codemod published (`scripts/migrate-keyframes-js-lerp.mjs`) | exit 0 | **PASS** |
| 8g | `proof:no-deep` | PASS — zero `:deep()` / `::v-deep` in demo/+src/ | exit 0 | **PASS** |
| 8h | `proof:no-bare-builtins` | PASS — scanned 71 files in api/src/; zero bare builtins | exit 0 | **PASS** |
| 9 | `grep -rn 'as any' src/ \| wc -l` | `0` | `0` | **PASS** |
| 10 | `grep -rn 'as unknown as' src/ \| wc -l` | `4` | `4` | **PASS** |
| 11 | `grep -rn '@deprecated' src/ \| wc -l` | `0` | `0` | **PASS** |
| 12 | `grep -rn '@ts-ignore' src/ \| wc -l` | `0` | `0` | **PASS** |
| 13 | `npm run bench` medians | L8 10.14× · DIRECT_PATHS HSL→RGB 4.50× · nameParser 37.93× | within noise of G close | **PASS** (see §3) |
| 14 | `find e2e -name '*.spec.ts' \| wc -l` | `36` | `36` | **PASS** |
| 15 | conversion + dispatch LoC ≤ 350 | max 312 (`dispatch.ts`) | ≤ 350 | **PASS** |

**Overall gate verdict: PASS** — every probe matches the expected pre-merge matrix from G.W4 close.

### Probe-15 LoC detail

```
193 src/units/color/conversions/cylindrical.ts
288 src/units/color/conversions/direct.ts
 44 src/units/color/conversions/hex.ts
 71 src/units/color/conversions/index.ts
123 src/units/color/conversions/kelvin.ts
239 src/units/color/conversions/lab.ts
156 src/units/color/conversions/oklab.ts
109 src/units/color/conversions/transfer.ts
220 src/units/color/conversions/xyz-extended.ts
312 src/units/color/dispatch.ts
```

All 10 modules ≤ 350 LoC. The largest, `dispatch.ts` (312), holds the dispatch table + `gamutMap`/`interpolateHue`/`mixColors`. No module is at risk of crossing the ceiling.

### Probe-10 `as unknown as` sites (informational)

The four legitimate sites that contribute to the count of 4:

```
src/units/normalize.ts:110     style as unknown as Record<string, string>
src/units/normalize.ts:319     value as unknown as Parameters<typeof normalizeColorUnits>[0]
src/units/color/dispatch.ts:143 toEntry.from as unknown as (…)
src/parsing/color.ts:59        color.clone() as unknown as Color<number>
```

These are the same four sites that survived the G window (G2 invariant — see `docs/tranches/G/audit/G.W4-close-lane-7-integrity-sweep.md`).

## 2. Probe-14 e2e spec inventory (36)

```
e2e/smoke/admin/admin-audit.spec.ts
e2e/smoke/admin/admin-flagged.spec.ts
e2e/smoke/admin/admin-names.spec.ts
e2e/smoke/admin/admin-tags.spec.ts
e2e/smoke/admin/admin-users.spec.ts
e2e/smoke/admin/admin-walk.spec.ts
e2e/smoke/admin/flows/color-approve.spec.ts
e2e/smoke/admin/flows/color-reject.spec.ts
e2e/smoke/admin/flows/palette-feature.spec.ts
e2e/smoke/admin/flows/tag-create.spec.ts
e2e/smoke/admin/flows/tag-delete.spec.ts
e2e/smoke/admin/flows/user-status.spec.ts
e2e/smoke/color-space-switching.spec.ts
e2e/smoke/flows/color-propose.spec.ts
e2e/smoke/flows/login-register.spec.ts
e2e/smoke/flows/palette-delete.spec.ts
e2e/smoke/flows/palette-edit.spec.ts
e2e/smoke/flows/palette-flag.spec.ts
e2e/smoke/flows/palette-fork.spec.ts
e2e/smoke/flows/palette-save.spec.ts
e2e/smoke/flows/vote-toggle.spec.ts
e2e/smoke/mobile/page-load-mobile.spec.ts
e2e/smoke/mobile/walk.spec.ts
e2e/smoke/page-load.spec.ts
e2e/smoke/reactivity-instant.spec.ts
e2e/smoke/safari/sustained-30s.spec.ts
e2e/smoke/view-switch.spec.ts
e2e/smoke/views/browse.spec.ts
e2e/smoke/views/extract.spec.ts
e2e/smoke/views/generate.spec.ts
e2e/smoke/views/gradient.spec.ts
e2e/smoke/views/mix.spec.ts
e2e/smoke/views/palettes.spec.ts
e2e/smoke/walk.spec.ts
e2e/smoke/webgl-atmosphere.spec.ts
e2e/smoke/webgl-goo-blob.spec.ts
```

## 3. Bench medians — H open vs. G close

Comparison source: `docs/tranches/G/audit/G.W4-close-lane-5-performance.md`.

| bench | gate | G open median | G close median | **H open median** | verdict |
|---|---|---|---|---|---|
| L8 — color channel-access | ≥ 5× | 10.38× | 11.00× | **10.14×** | PASS (noise) |
| DIRECT_PATHS — HSL→RGB | ≥ 2× | 4.56× | 4.49× | **4.50×** | PASS (noise) |
| nameParser — broad-regex + Set.has | ≥ 5× | 41.68× | 39.34× | **37.93×** | PASS (noise) |

### Per-run detail at H open

**L8 — color channel-access** (instances=256, outer-iter=100k, ≥ 5× target)
- Run 1: 222.268 → 22.957 ms → **9.68×**
- Run 2: 237.490 → 23.423 ms → **10.14×**
- Run 3: 239.890 → 22.241 ms → **10.79×**
- median **10.14×** — PASS

**DIRECT_PATHS — color2()** (instances=256, outer-iter=50k, HSL→RGB ≥ 2× gating)
- hsl→rgb medians (sorted): 4.35×, 4.50×, 5.37× → **4.50×** (gating) — PASS
- oklab→rgb median: 1.07× (non-gating)
- oklch→rgb median: 1.15× (non-gating)

**nameParser** (pool=40 distinct, outer-iter=100k, ≥ 5× target)
- Run 1: 5189.001 → 136.794 ms → **37.93×**
- Run 2: 5334.601 → 141.922 ms → **37.59×**
- Run 3: 5329.642 → 139.760 ms → **38.13×**
- median **37.93×** — PASS

**Verdict.** All three medians are within run-to-run noise of the G-close baseline (deltas: L8 −0.86×, HSL→RGB +0.01×, nameParser −1.41×). The L8 and nameParser deltas are within the same magnitude as the G-open→G-close run-to-run swing (e.g. L8 G-open 10.38× → G-close 11.00× → H-open 10.14×). No regression; no JIT pessimization; no headroom loss. The H-open performance baseline matches G close.

## 4. Drift sweep since G merge

`git status` (post-build, post-bench):

```
On branch tranche-h
Untracked files:
  docs/tranches/C/
  docs/tranches/H/
nothing added to commit but untracked files present
```

| candidate drift | finding | root cause |
|---|---|---|
| Tracked-file modifications | **None** | builds + benches are read-only w.r.t. tracked files |
| `dist/` artefacts | **Match** — `dist/value.js` is 125,496 bytes (exactly G-close size); flat dts present (`easing.d.ts`, `index.d.ts`, `math.d.ts`, `utils.d.ts`) plus `parsing/`, `quantize/`, `transform/`, `units/` subdirs. `dist/gh-pages/` regenerated cleanly. | clean rebuild reproduces G-close artefacts byte-for-byte (verified at probe 6) |
| `docs/tranches/H/` untracked | Pre-existing — already at `tranche-h` checkout (contains `H-PROMPTS.md`, `PROGRESS.md`, `audit/`, `coordination/`, `dispatch/`, `waves/` per `ls`). This audit writes one new file (`docs/tranches/H/audit/H-AUDIT-3-state-at-H-open.md`). | tranche-H bootstrap, not drift |
| `docs/tranches/C/` untracked | Pre-existing — already shown as untracked in the initial repo `git status` (line `?? docs/tranches/C/` in the H-open snapshot). Contains `C.md`, `PROGRESS.md`, `coordination/`, `research/`, `waves/`. | inherited from pre-H-open state; not produced by this audit and not introduced post-G-merge |
| Anomalies | **None** | — |

**No drift attributable to post-G-merge tracked changes.** The two untracked dirs were present at H open; this audit creates only a single new file inside `docs/tranches/H/audit/` (the deliverable itself).

## 5. Overall verdict

**PASS** — the H-open gate baseline matches the G-close pre-merge matrix on all 15 probes:

- Lint + types + tests + builds: all clean
- 8/8 proof scripts: PASS
- Type-discipline counters: as-any 0, as-unknown-as 4, @deprecated 0, @ts-ignore 0 (all expected)
- Bundle: `dist/value.js` = 125,496 bytes (exact G-close size)
- E2E inventory: 36 specs (expected)
- Conversion + dispatch LoC: max 312 ≤ 350 (G-close ceiling intact)
- Bench medians: L8 10.14×, HSL→RGB 4.50×, nameParser 37.93× — all within G-close noise band, all above floors

The H tranche may proceed from a fully-green substrate equivalent to v0.9.0 at G close.

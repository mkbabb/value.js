# G.W4 — G3 Remediation: `dispatch.ts` ≤ 350 LoC restoration

**Lane:** G.W4 G3-remediation
**Branch:** `tranche-g`
**Substrate HEAD:** `3a25f32`
**Date:** 2026-05-22

## The breach

The ratified G3 invariant caps every module produced by the `color/utils.ts`
decomposition at **≤ 350 LoC** (hard sub-gate).

- **G.W1 Lane B** delivered `src/units/color/dispatch.ts` at **336 LoC** — within
  the ≤ 350 sub-gate.
- **G.W2 Lane B** (`23ec904`, "typed `DIRECT_PATHS` mapped-type", G-OPP-3)
  replaced the type-erased table with the `DirectPathsTable` mapped-type +
  `DirectPath` helper type + `getDirectPath` typed-lookup helper + ~30 lines of
  explanatory commentary. This grew `dispatch.ts` to **391 LoC** — **breaching
  G3 by 41 lines.**
- **Root cause:** the G.W2 wave gate did not re-check the G3 ≤ 350 sub-gate
  after the Lane B growth. Two G.W4 close-audit lanes (close-lane-1 plan-vs-actual
  and close-lane-4 idiomatic-gestalt) flagged the breach.

## What was relocated, and why

The `DIRECT_PATHS` table routes the six hot-path conversion pairs
(`oklab↔rgb`, `oklch↔rgb`, `hsl↔rgb`) to the `directXxx` functions that *already
live in* `src/units/color/conversions/direct.ts`. The table, the types that
describe it, and the lookup that serves it had no cohesion with the rest of
`dispatch.ts` (XYZ-hub dispatch, gamut mapping, hue interpolation, color-mix) —
their cohesion-honest home is **alongside the functions they wire**.

Relocated from `dispatch.ts` → `conversions/direct.ts`:

- `DIRECT_PATHS` — the const table (now `export const`).
- `DirectPathsTable` — the mapped-type (now `export type`).
- `DirectPath<From, To>` — the per-pair entry-signature helper type (module-local).
- `getDirectPath<C>(from, to)` — the typed runtime lookup (now `export const`),
  the *exclusively-serving helper* for the table.

`dispatch.ts`'s `color2()` now imports `getDirectPath` from
`./conversions/direct` and consults it exactly as before — zero behavioural
change. The previous direct-import of the six `directXxx` functions into
`dispatch.ts` is dropped (they are now reached only through `DIRECT_PATHS`).

### Chosen home + LoC rationale

- **Preferred path taken:** merge into the existing `conversions/direct.ts`.
- The relocated block is ~78 lines (table + 2 types + helper + section
  commentary). `direct.ts` 210 + 78 ≈ 288 — comfortably within ≤ 350.
- A sibling `conversions/direct-table.ts` was **not** required (it would only
  have been needed had `direct.ts` been pushed > 350). The LoC math was verified
  before the choice — not guessed.

## Before / after LoC

| Module | Before | After | Δ | ≤ 350 |
|---|---|---|---|---|
| `src/units/color/dispatch.ts` | 391 | **312** | −79 | ✅ |
| `src/units/color/conversions/direct.ts` | 210 | **288** | +78 | ✅ |

`dispatch.ts` falls back below its original G.W1 336 LoC (the unused `HSLColor`
type import — already dead before this lane — was also dropped). Every other
`conversions/*.ts` module is unchanged and ≤ 350.

## Barrels + cycle

- **Barrels:** `DIRECT_PATHS` / `DirectPathsTable` / `getDirectPath` were never
  re-exported by `src/units/color/index.ts` nor by
  `src/units/color/conversions/index.ts` — they are subsystem-internal. No
  barrel update was required; zero consumer-visible change.
- **Import cycle:** `dispatch.ts` ↔ `direct.ts` is a two-module cycle that
  **already existed** (`direct.ts` imports `gamutMap` from `dispatch.ts`;
  `dispatch.ts` imported the `directXxx` functions from `direct.ts`). The
  relocation *keeps the same* cycle — no new cycle is introduced. Every
  cross-module reference sits inside a function body (deferred), so ESM resolves
  it without a top-level evaluation-order hazard; `proof:resolution`, the build,
  and the test suite all confirm no resolution defect.

## Sub-gate evidence

| Probe | Requirement | Result |
|---|---|---|
| `wc -l src/units/color/dispatch.ts` | ≤ 350 | **312** ✅ |
| `wc -l src/units/color/conversions/*.ts` | every module ≤ 350 | max = `direct.ts` 288 ✅ |
| `npx vitest run` | 1584 passed / 34 files | **1584 passed / 34 files** ✅ |
| `npx vue-tsc --noEmit` error count | 0 | **0** ✅ |
| `npm run build` | clean | clean ✅ |
| `dist/value.js` byte size | ≤ 148,480 | **125,496** ✅ |
| `npm run bench` — DIRECT_PATHS HSL→RGB median | ≥ 2× | **4.02×** (PASS) ✅ |
| `npm run proof:as-any-budget` | exit 0 | exit 0 (0 sites) ✅ |
| `npm run proof:no-deprecated` | exit 0 | exit 0 ✅ |
| `npm run proof:no-ts-ignore` | exit 0 | exit 0 ✅ |
| `npm run proof:resolution` | exit 0 | exit 0 ✅ |
| `npm run proof:dts-layout` | exit 0 | exit 0 ✅ |
| `npm run lint` | exit 0 | exit 0 ✅ |
| `grep` dispatch / DIRECT_PATHS importers | all resolve | all resolve ✅ |

### Bench detail (DIRECT_PATHS hot path)

```
hsl→rgb   speedups (sorted): 3.73×, 4.02×, 4.43×
hsl→rgb   median:            4.02×    [GATING]
oklab→rgb median:            1.03×
oklch→rgb median:            1.15×
target:                      ≥ 2× (HSL→RGB hot path)
verdict:                     PASS
```

The relocation did not pessimize the hot path — the gating HSL→RGB median holds
at 4.02×, comfortably above the ≥ 2× floor.

## Files modified

- `src/units/color/dispatch.ts` — removed the table/types/helper block; replaced
  the six `directXxx` imports with a single `getDirectPath` import; dropped the
  dead `HSLColor` type import; updated the file-header docblock.
- `src/units/color/conversions/direct.ts` — appended the relocated `DIRECT_PATHS`
  table + `DirectPathsTable` / `DirectPath` types + `getDirectPath` helper; added
  the `Color` / `ColorSpaceMap` / `ColorSpace` type imports they require; updated
  the file-header docblock.
- `docs/tranches/G/audit/G.W4-g3-remediation-dispatch-split.md` — this audit doc.

No barrels and no consumers were modified — the relocated symbols are
subsystem-internal.

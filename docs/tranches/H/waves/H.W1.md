# H.W1 — api/ cascade-correctness + strictness lift

**Opens after**: H.W0 user ratification.
**Lanes**: 3 — A (API-2 createPalette + patchPalette withTransaction defect), B (API-1 api/tsconfig.json strictness lift), C (withTransaction-coverage audit-list).
**Status**: planned.

## Scope

Repair the cascade-correctness defect (H-AUDIT-6 §3) and codify the coverage. Lift api/ tsconfig strictness to root parity.

### Lane A — API-2: createPalette + patchPalette withTransaction defect

Per `audit/H-AUDIT-6 §3`: `api/src/services/palette/crud.ts:101-119` (`createPalette`) and `:139-184` (`patchPalette`) both write to BOTH `palettes` AND `palette_versions` without `withTransaction`. A partial failure leaves an orphan version row OR a palette whose `currentHash` doesn't match any version record. `createVersionRecord` already accepts `session?: ClientSession` — threading is mechanical.

Strategy:
1. Wrap each multi-collection mutation in `services.withTransaction(async (session) => { ... })` per the existing G.W3 Lane E shape.
2. Thread `session` through every repository call inside the block.
3. Add ≥ 2 rollback tests (mirroring `api/test/services/withTransaction-rollback.test.ts` from G.W3) — one each for `createPalette` and `patchPalette` partial-failure rollback.

**Sub-gate A**: 2 sites wrapped; `cd api && npx vitest run` — all existing tests passing (≥ 106); ≥ 2 new rollback tests; `tsc --noEmit` exit 0.

### Lane B — API-1: api/tsconfig.json strictness lift

Per `audit/H-AUDIT-6 §4`: api/'s `tsconfig.json` is missing 4 strictness flags relative to root: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `isolatedModules`. api/ code is well-typed by inspection.

Strategy:
1. Add the 4 flags to `api/tsconfig.json`.
2. Run `cd api && npx tsc --noEmit` — capture any new errors.
3. Repair every new error genuinely (no `as unknown as` papering-over; no `// @ts-ignore`). If a flag surfaces a genuine API-design issue (not a trivial annotation gap), escalate.

**Sub-gate B**: 4 flags declared; `cd api && npx tsc --noEmit` exit 0; vitest 106+/21+ GREEN.

### Lane C — withTransaction-coverage audit-list (standing reference)

Author `audit/api-withTransaction-coverage.md` — exhaustive enumeration of every cross-collection write site in `api/src/services/` + `api/src/repositories/`, each marked with its session status (WRAPPED / SINGLE-COLLECTION / DEFERRED-WITH-RATIONALE). Becomes the future-reference that prevents the regression class (H1 invariant codification).

**Sub-gate C**: doc landed; each site classified; spot-check against the actual code confirms accuracy.

## File bounds

| Lane | Files |
|---|---|
| A | `api/src/services/palette/crud.ts`, `api/test/services/withTransaction-rollback.test.ts` (extend with new tests OR a new sibling test file), `docs/tranches/H/audit/H.W1-lane-a-createPalette-patchPalette-withTransaction.md` (new) |
| B | `api/tsconfig.json`, any `api/src/**/*.ts` requiring genuine type repair, `docs/tranches/H/audit/H.W1-lane-b-api-tsconfig-strictness.md` (new) |
| C | `docs/tranches/H/audit/api-withTransaction-coverage.md` (NEW — standing reference), `docs/tranches/H/audit/H.W1-lane-c-coverage-audit-list.md` (new) |

## Gate

Conjunction of A + B + C. Wave-level:
- `cd api && npx vitest run` ≥ 108 (was 106 + 2 new rollback tests).
- `cd api && npx tsc --noEmit` exit 0 with 4 new strictness flags active.
- Standing reference `audit/api-withTransaction-coverage.md` accurate.

## Commit plan

- `fix(api/w1): wrap createPalette + patchPalette in withTransaction — close orphan-version defect class (H1; H.W1 Lane A)`
- `chore(api/w1): lift api/tsconfig.json to root strictness (4 flags; H.W1 Lane B)`
- `docs(tranche-h/w1): api withTransaction coverage audit-list — the standing H1 reference (H.W1 Lane C)`

## Dependencies

- Depends on: H.W0 user ratification.
- Blocks: H.W2 (type-system completion II).

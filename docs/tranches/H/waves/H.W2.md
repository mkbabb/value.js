# H.W2 — Type-system completion II (`as unknown as` corpus retirement; H2 invariant)

**Opens after**: H.W1 close.
**Lanes**: 3 — A (H-OPP-1 typed `XYZ_FUNCTIONS` mapped-type), B (H-OPP-2 `proof:as-unknown-as-budget` codification), C (type-predicate narrowing `normalize.ts:319`).
**Status**: planned.

## Scope

H.W2 retires 1 of the 4 `as unknown as` sites + codifies the residue. Target at H.W2 close: `grep -rn 'as unknown as' src/ | wc -l` ≤ 3, enforced by `proof:as-unknown-as-budget`.

### Lane A — H-OPP-1: typed `XYZ_FUNCTIONS` mapped-type

Per `audit/H-AUDIT-5`: `XYZ_FUNCTIONS` in `src/units/color/dispatch.ts:222` has an `as unknown as ...` cast — the XYZ-hub dispatch table. This is the same idiom G.W2 Lane B applied to `DIRECT_PATHS` (typed `DirectPathsTable` mapped-type).

Strategy:
1. Read the current `XYZ_FUNCTIONS` definition + every consumer in `dispatch.ts`.
2. Lift the type to a mapped-type `type XyzFunctionsTable = { [C in ColorSpace]?: { from: ...; to: ... } }` with conditional-type-inferred per-slot signatures.
3. Apply to the existing table — the entries should type-check cast-free.
4. Verify no JIT pessimization: the DIRECT_PATHS / HSL→RGB bench must stay ≥ 2× AND the L8 bench must stay ≥ 5× (the table is consulted in the `color2()` XYZ-hub fallback path).

**Sub-gate A**: 1 `as unknown as` cast retired (`as unknown as` 4 → 3); vitest 1584/34 GREEN; vue-tsc 0; build clean; bench medians ≥ floors.

### Lane B — H-OPP-2: `proof:as-unknown-as-budget.mjs` codification

Author `scripts/proof-as-unknown-as-budget.mjs` mirroring `proof-as-any-budget.mjs`'s shape (G.W3 Lane D); budget = 3 (the post-H.W2-Lane-A count). Wire into `package.json scripts` + the CI workflow post-build step.

The 3 residual sites must each carry an inline comment explaining the irreducibility (DOM `CSSStyleDeclaration`, post-runtime-guard narrowing, clone-reinterpret) — policy-document the residue per the G2-pattern precedent.

**Sub-gate B**: script authored + executable; `npm run proof:as-unknown-as-budget` exits 0 at HEAD (count ≤ 3); CI step wired.

### Lane C — Type-predicate narrowing `normalize.ts:319`

Per `audit/H-AUDIT-5`: `src/units/normalize.ts:319` has an `as unknown as` cast that may be eliminable via a typed type-predicate function. Read the site + the surrounding control flow.

Strategy: if a clean type-predicate replaces the cast, apply it. If the cast is genuinely a structural-impossibility-of-typing (e.g. parse-that combinator return shape), classify as irreducible + leave (within the ≤ 3 budget).

**Sub-gate C**: site analyzed; either retired (count drops further) or documented as irreducible.

## File bounds

| Lane | Files |
|---|---|
| A | `src/units/color/dispatch.ts` (XYZ_FUNCTIONS typing), `src/units/color/constants.ts` (only if a type needs lifting there), `docs/tranches/H/audit/H.W2-lane-a-typed-XYZ_FUNCTIONS.md` (new) |
| B | `scripts/proof-as-unknown-as-budget.mjs` (NEW), `package.json` (scripts), `.github/workflows/node.js.yml` (CI step), `docs/tranches/H/audit/H.W2-lane-b-as-unknown-as-budget.md` (new) |
| C | `src/units/normalize.ts`, `docs/tranches/H/audit/H.W2-lane-c-type-predicate.md` (new) |

## Gate

Conjunction of A + B + C. Wave-level (H2 invariant):
- `grep -rn 'as unknown as' src/ | wc -l` ≤ 3 (was 4).
- `npm run proof:as-unknown-as-budget` exits 0 at HEAD.
- vue-tsc 0 errors; vitest 1584/34; build clean (≤ 148,480 B).
- Bench medians ≥ gates (especially DIRECT_PATHS HSL→RGB ≥ 2× and L8 ≥ 5× — Lane A must not pessimize the XYZ-hub fallback).

## Commit plan

- `refactor(library/w2): typed XYZ_FUNCTIONS mapped-type — retire 1 of 4 as-unknown-as boundary casts (H-OPP-1; H.W2 Lane A)`
- `feat(scripts/w2): proof:as-unknown-as-budget — codify H2 invariant (≤ 3; H.W2 Lane B)`
- `refactor(library/w2): type-predicate narrowing in units/normalize.ts (H.W2 Lane C)` — only if Lane C retires the site.

## Dependencies

- Depends on: H.W1 close.
- Blocks: H.W5 close (proof:as-unknown-as-budget gates the merge).

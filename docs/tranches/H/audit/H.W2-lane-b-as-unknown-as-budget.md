# H.W2 Lane B — `proof:as-unknown-as-budget` (SCRIPTS-5, codifies H2)

**Branch**: `tranche-h` @ `9c32e7a` (H.W2 execution; Lanes A + C landed
uncommitted in working tree).
**Scope**: author `scripts/proof-as-unknown-as-budget.mjs` — `as unknown as`
count in `src/` capped at a budget of 2 — and wire it into `package.json
scripts` + the CI workflow, per `H.W2.md §"Lane B"`.

---

## The finding

`as unknown as <T>` is the documented escape hatch for the irreducible
residue left over when `as any` is retired (G2 / G.W2 → 0). Unlike `as any`,
the double-cast forces an explicit re-typing — but it still subverts the
checker, so its count must be bounded and every site policy-documented.

H.md §2 H2 set the wording at "the remaining 3 are policy-documented +
codified by proof:as-unknown-as-budget (H.W2 Lane B; budget = 3)". The
H.W2.md plan anticipated a post-(A+C) count of 3. The actual post-(A+C)
count is **2** — H.W2 Lane C's type-predicate retirement cleaned more than
expected. This lane therefore tightens the budget to **2** (the strictest
reading of H2: budget headroom is zero, count can only be lowered).

## The fix

`scripts/proof-as-unknown-as-budget.mjs` mirrors the G.W3 Lane D shape of
`scripts/proof-as-any-budget.mjs` exactly:

- `BUDGET = 2` const with the tightening rationale documented inline.
- `execSync('grep -rn "as unknown as" src/ || true', { cwd: ROOT })` —
  `|| true` swallows grep's exit-1 (no-match) on the clean case.
- `count > BUDGET` → print every site (verbatim grep file:line output) +
  the H2 remediation hint → `process.exit(1)`.
- PASS line reports `count` vs. `BUDGET` so drift is visible even while
  green.

Residue-site documentation lives in the script's header comment (co-locates
rationale with enforcement) rather than in this audit doc.

## The 2 residue sites

| # | Site | Class | Rationale |
|---|---|---|---|
| 1 | `src/units/normalize.ts:117` | DOM-structural-impossibility | `CSSStyleDeclaration` has no string index signature, but `getComputedValue` indexes it with a dynamic `prop` string. Only `Record<string, string>` admits that read. Centralised at a single named `styleRecord` helper so the boundary lives at one site (Lane C added the explanatory comment block at lines 108–117). |
| 2 | `src/parsing/color.ts:59` | Clone-reinterpret | `color.clone()` preserves the concrete `Color<ValueUnit<number>>` subclass; the immediately-following loop overwrites every channel slot with the unwrapped numeric value, so the cloned instance is reinterpreted as a `Color<number>` for the writes. The type narrows monotonically through the loop and cannot be expressed structurally without rebuilding the instance. |

Both verdicts: **KEEP**. Both already carry inline rationale comments at
their callsites (Lane C-era cleanup). The H2 invariant is codified at the
proof-script boundary so future drift is caught at CI rather than at review.

## CI wiring

Workflow step inserted directly after the G.W3 Lane D `proof:as-any-budget`
step (sibling-adjacency placement — both budget proofs flank each other in
the invariant block):

```yaml
- name: Proof — as-unknown-as budget ≤ 2 in src/ (H2 invariant; H.W2 Lane B)
  run: npm run proof:as-unknown-as-budget
```

`package.json scripts` entry placed identically — directly after
`proof:as-any-budget`. Both placements optimise for semantic grouping (the
two budget proofs are a pair) rather than strict alphabetisation of the
non-alphabetical existing block.

## Verification

```
$ node scripts/proof-as-unknown-as-budget.mjs
[proof:as-unknown-as-budget] PASS — 2 'as unknown as' site(s) (budget ≤ 2)
$ echo $?
0

$ npm run proof:as-unknown-as-budget
> @mkbabb/value.js@0.9.0 proof:as-unknown-as-budget
> node scripts/proof-as-unknown-as-budget.mjs

[proof:as-unknown-as-budget] PASS — 2 'as unknown as' site(s) (budget ≤ 2)
$ echo $?
0
```

Failure-path mental simulation: adding a third `as unknown as` site to any
`src/**` file would push `count` to 3; `3 > 2` → the FAIL branch prints
the three-line grep output (file:line:matched-source) + the H2 remediation
hint, then exits 1. Verified by code-reading the failure branch — no
regression injected.

## Sub-gate B — status

- [x] Script authored + executable (`scripts/proof-as-unknown-as-budget.mjs`).
- [x] `node scripts/proof-as-unknown-as-budget.mjs` exits 0 at HEAD (count 2 ≤ 2).
- [x] `npm run proof:as-unknown-as-budget` exits 0 (npm-script wiring).
- [x] `package.json scripts` entry added (sibling-adjacent to `proof:as-any-budget`).
- [x] CI step added to `.github/workflows/node.js.yml` (sibling-adjacent to the as-any step).
- [x] Failure path verified by code-reading (no regression injected; the FAIL branch is identical in shape to G.W3 Lane D's).
- [x] No side-effects outside the 4 file bounds.

## Files

- `scripts/proof-as-unknown-as-budget.mjs` — new (75 LoC; ~28 executable + header documentation of both residue sites).
- `package.json` — `scripts` entry `proof:as-unknown-as-budget`.
- `.github/workflows/node.js.yml` — CI step "Proof — as-unknown-as budget ≤ 2 in src/".
- `docs/tranches/H/audit/H.W2-lane-b-as-unknown-as-budget.md` — this doc.

# G.W3 Lane D — `proof:as-any-budget` (SCRIPTS-4, codifies G2)

**Branch**: `tranche-g` @ `c57ec01` (G.W3 execution).
**Scope**: author `scripts/proof-as-any-budget.mjs` — `as any` count in `src/`
capped at a budget of 5 — and wire it into `package.json scripts` + the CI
workflow, per `G.W3.md §"Lane D"`.

---

## The finding

`as any` discards every type guarantee at a callsite — the single most
corrosive escape hatch in a strict-TypeScript codebase. **G2** set a hard
ceiling of 5; G.W2 (Lanes A–D: typed `getColorSpaceBound`, typed
`DIRECT_PATHS`, color-channel typing, `unwrapDeep`) drove the actual count to
**0**. The budget had no runtime guard — the count could silently drift back
upward.

## The fix

`scripts/proof-as-any-budget.mjs` — `BUDGET = 5` const (the G2 target;
headroom, not a license — lower it as the count permits, never raise it).
`execSync` grep with `cwd` pinned to `ROOT`, `|| true` for the clean case.
`count > BUDGET` → print every site + the G2 remediation → exit 1. The PASS
line reports the live count vs. the budget so drift is visible even while
green.

Wired: `package.json scripts` entry `proof:as-any-budget`; CI workflow step
"Proof — as-any budget ≤ 5 in src/" in the G.W3 invariant block, post-build.

## Verification

`npm run proof:as-any-budget` → `PASS — 0 'as any' site(s) (budget ≤ 5)`,
exit 0 at HEAD. The current count is 0 — five budget units of headroom remain.

## Sub-gate D — status

- [x] Script authored + executable.
- [x] `npm run proof:as-any-budget` exits 0 at HEAD (post-G.W2; count 0 ≤ 5).
- [x] CI step wired.

## Files

- `scripts/proof-as-any-budget.mjs` — new.
- `package.json` — `scripts` entry.
- `.github/workflows/node.js.yml` — CI step.

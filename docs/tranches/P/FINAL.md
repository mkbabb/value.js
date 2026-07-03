# Tranche P — FINAL

**Status:** CLOSED. **Version:** 1.1.0. **Commit:** `23d1a91` (2026-06-23). **Tag:** `v1.1.0`.

> Authored lean at R.W0 (2026-07-03) — the P tranche shipped its version and tag but never
> carried a close record. Derived from the `23d1a91` commit and the R charter (`docs/tranches/R/R.md §1`).

## What P was

The constellation campaign's value.js leg, consuming `@mkbabb/parse-that@0.12.0` (packrat
input-safe + fusion). Every change is backward-compatible-additive to the published 1.x surface.

## What shipped

- **VJ-L3 — `parseCSSSubValue(value, opts?)`**: the binding S9 terminal API. A root helper
  internalizing the FunctionArgs-FIRST composition (`any(CSSFunction.FunctionArgs, CSSValues.Value)`)
  that keyframes.js had hand-rolled by reaching past value.js into parse-that. Same-realm now, so
  keyframes drops the direct parse-that production dep + its two cross-realm casts. FunctionArgs-first
  dodges the truncation trap (`parseCSSValue('scale(2) rotate(45deg)')` truncates; `parseCSSSubValue`
  keeps both functions).
- **VJ-CSS1 — `extractFunctions(ast)`**: a depth-walk over the Stylesheet AST (mirroring
  `extractKeyframes`/`extractProperties`) collecting `@function` blocks; the registry keyframes' P.W13
  `@function` lowering pass consumes. (In source since this commit at `src/parsing/extract.ts:124`,
  barreled at `src/index.ts` + `src/subpaths/parsing.ts` — the R.W0 pass refuted the later stale-worktree
  "absent from source" claim.)
- **VJ-CSS2 — `sibling-index()`/`sibling-count()`**: probed → already parse via the generic
  `FunctionValue` producer; contract pinned by round-trip tests (no new arm).
- **VJ-P1 — `color2Into(src, to, out)`**: the gamut zero-alloc headline. A BC-additive out-param
  mirroring `transformMat3Into`; `gamutMapToRgbSpace`'s bisection routes through one reused egress
  scratch. Measured 84 → 37 allocs/call on `gamutMap(display-p3 OOG)` (56% reduction). Bit-equal to
  `color2`.
- **VJ-P3 — `:any`→`string`**: narrowed `setSubProperty`/`setProperty` params across
  `ValueUnit`/`FunctionValue`/`ValueArray` (6 signatures); BC (callers already pass strings).
- **O(N²) fix**: the `FunctionValue` ctor's container propagator was `O(N²)` (walk-all-N called N
  times); fixed to `O(N)`.
- **Record hygiene**: committed the previously-untracked `docs/tranches/O/`; rewrote its PROGRESS
  header DEVELOPMENT → CLOSED-as-built.

## Close state

1901 tests green; typecheck + build clean. `parse-that@0.12.0` introduced no value.js parse
regression (isolation-confirmed). Merged to master and tagged `v1.1.0` at the R.W0 master-merge
(the P/Q commits and their tags were minted on `tranche-q` and healed onto master's history at R.W0).

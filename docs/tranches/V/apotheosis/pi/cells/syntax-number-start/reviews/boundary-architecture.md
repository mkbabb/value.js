# `SYNTAX-NUMBER-START` generation 0 — architecture boundary REJECT

**Exact reviewed manifest:**
`8083052ad158dc9381c877ce1d0ead1b459749498f142a0a654cf323fde96960`.

## Blockers

1. The composable arbitrary-offset contract is not observable through the
   root-only structural `parseState` harness.
2. The harness reports an empty diagnostic list after a successful boolean
   without proving speculative terminal failures left `furthest`, `expected`,
   suggestions, and secondary spans untouched. Published parse-that `opt()`
   and alternation can retain error bookkeeping even after offset restoration.
3. The benchmark description puts result validation inside the timed operation;
   correctness normalization must run before timing, especially for an O(1)
   predicate where validation can dominate.

## Required generation-1 repair

- Exercise the actual `Parser<boolean>` through `Parser.call(ParserState)` at
  nonzero offsets and observe diagnostic state as well as consumption.
- Seal a diagnostic-sandbox construction around direct combinator recognition,
  or request a narrow terminal waiver with proof ordinary composition cannot
  isolate the state. Do not hide error pollution in the observation harness.
- Time only the parser call/ParserState construction after semantic precheck.

Parse-that feasibility, H/B lineage collapse, S/D independence, external
NON_COMPARABLE rulings, module placement, and G-3 deferral were otherwise
accepted.

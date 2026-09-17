# SYNTAX-NUMBER-START generation 1 — architecture boundary challenge

**Verdict: REJECT.**  
**Model:** `gpt-5.6-sol`  
**Reasoning:** `ultra`  
**Workflow:** independent exact-byte challenge

All named hashes and the parse-that 1.0.0 package identity reproduced. H and B
are correctly treated as one unresolved lineage; S and D provide two further
declared topologies. LIVE and BBNF runtime comparators are correctly marked
`NON_COMPARABLE`.

Three exact blockers reject the generation:

1. The harness does not test the parser as an imported combinator dependency.
   Every candidate invocation uses the recognizable `{ seed: offset }` value
   and calls `.call()` directly; the downstream check is a second, separate
   call. Parse-that combinators invoke a child's raw parser function with an
   arbitrary predecessor value. A contrived candidate can therefore pass the
   fixtures and fail in ordinary consume-number composition.
2. The benchmark has no exact warm-up, sample or batch counts, bootstrap seed,
   pairwise strict-win matrix, or allocation method. Timing `ParserState` and
   diagnostic seeding around an O(1) predicate confounds the candidate work;
   no parser-only lane exists.
3. Exact-hash integration is undefined. Reviewed source would live at
   `candidates/<seat>/number-start.ts`, while the declared target is
   `grammar/css/l4/value-unit/number.ts`. No sealed overlay/import strategy or
   projected aggregate hash proves byte-identical promotion.


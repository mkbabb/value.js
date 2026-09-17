# SYNTAX-NUMBER-START generation 2 — architecture challenge

**Verdict: REJECT.**  
**Model:** `gpt-5.6-sol`  
**Reasoning:** `ultra`  
**Workflow:** `v2`, independent exact-byte adversarial challenge

The exact manifest and every public input reproduced; the integration ledger
matches the nineteen current grammar files, `npm run check` is green, candidate
sources are absent, and `.next(candidate)` invokes the raw child parser.

Blockers:

1. Diagnostic profiles are synthetic and incomplete, and the package-global
   diagnostics mode is unsealed. A candidate restoring only negative
   `furthest` values can pass while corrupting ordinary state.
2. The 100,000-state benchmark pool has no exact multiplicity, ordering,
   profile distribution, or predecessor assignment. The xoshiro seed omits
   seed expansion/permutation mechanics, the descriptive corpus is vague, the
   allocation lane conflicts with the pool size, and post-GC heap deltas do not
   measure transient allocation.
3. Promotion omits exact overlay/projected-ledger algorithms and transitive
   import bytes. An overlay can import an unsealed file outside the grammar
   ledger.
4. H/B whole-number lookahead topologies inspect unbounded digit/exponent runs,
   contradicting the three-position O(1) contract. Bounded rewrites converge
   on S, leaving fewer than three proven construction lineages unless another
   independent seat is added.
5. Raw/preprocessed positional equivalence is false for eliminated CRLF
   interior offsets. The contract must relate mapped corresponding positions,
   exclude nonpositions, or depend on the source-map feature.


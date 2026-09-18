# SYNTAX-NUMBER-START generation 2 — specification challenge

**Verdict: REJECT.**  
**Model:** `gpt-5.6-sol`  
**Reasoning:** `ultra`  
**Workflow:** independent exact-byte adversarial challenge

The exact manifest SHA-256
`72183fb4dc3dae48c0e554bda1846beefcc57fcb1fe7874db7b092e2d23df9f5`
and every input hash/byte count reproduced. The CSS Syntax §4.3.10 rule is
accurate, the child invocation is real, and the holdout ordering is sound.

Blockers:

1. The contract promises arbitrary diagnostic-state preservation, while the
   harness exercises only default `furthest=-1` and a synthetic `furthest=-7`
   seeded shape. A candidate conditioned on those values passes while
   corrupting ordinary prior diagnostic states. Profiles must cover furthest
   before, at, and beyond the candidate offset; absent, undefined, empty, and
   multi-entry expected state; and varied diagnostic multiplicity.
2. The public corpus does not mechanically enumerate the normative arms and
   ASCII digit endpoints. Missing witnesses include `-1`, `-9`, `9`, `-x`,
   `-.x`, and `.9`. Withheld cases cannot be the sole complete-arm proof.
3. JSON-normalized equality is not byte/referential preservation. It misses
   replacement of diagnostic arrays by value-equal arrays and property-shape
   changes such as deleting versus assigning `undefined` to `expected`. The
   contract must name its actual equality law and the harness must observe it.


# G16 skeptic 2 — architecture and parser-construction audit

- Frozen subject SHA-256: `e97b1786ffd5a7046d64e80fd39a3e88143e38a99626780b1b9973e187f975fc`
- Candidate: H2, SHA-256 `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`
- Verdict: **REJECT**

## Blocking finding

The exact subject does not independently establish that H2 is preferable to the other declared candidate architectures. The bound `feature.json` says the selection had four topology slots: fused terminal H, BBNF-shaped B, staged S, and first-character-dispatch D. The G16 subject binds only H2's source. It binds neither the other candidate bytes nor an independently reproducible architectural or comparative result over them.

The bound G15 root disposition cannot close that gap. It expressly says G15 was rejected before synthesis and that no feature or benchmark credit followed, then carries H2 forward on the narrative assertion that all five reviewers found it parsimonious. Under this subject's skeptical law, that summary is not independent proof, and the other reviews are outside this review's permitted input in any event. The G16 benchmark also cannot elect H2 among H/B/S/D: its only two lanes are H2 and a historical deposed recognizer, and its stated scope is an exact 64-row common-domain corpus that excludes plus-sign and multiple-leading-zero differences and contains successes only.

Thus a valid narrow H2-versus-deposed performance result still does not prove the architecture-selection proposition needed at total-tranche altitude. This is a reproduced binding/selection defect in the frozen subject, not a semantic failure in H2's implementation.

## Code-feature audit

H2 is otherwise a strong implementation of the leaf contract.

- It uses `regex` and `.map` directly from `@mkbabb/parse-that/core`. There is no manual cursor or source loop, generic remainder capture, token tape, atom/CST layer, or separate scanner runtime.
- A regex terminal is appropriate here rather than contrived. Consume-number is a regular lexical leaf, and the expression directly encodes optional sign, the two valid mantissa shapes, and an all-or-nothing exponent. Its optional fraction and exponent naturally produce the required maximal prefix for inputs such as `1.`, `1e+`, and `1.2.3`.
- In the pinned parse-that 1.0.0 tree, `regex` clones the expression with sticky matching, sets `lastIndex` to the incoming parser offset, and changes the offset/value only on success. `.map` invokes its projection only after success. Consequently H2 preserves offset and predecessor value on failure and composes transactionally without candidate-local rollback code.
- The module constructs exactly two `Parser` instances at initialization: the regex terminal and its mapped parser. Calls construct no parsers and therefore cause no per-call global Parser-ID growth. H2 adds no mutable global state; the terminal's library-owned sticky-regex state is reset from the incoming offset on every call.
- A success necessarily allocates the matched representation string in the library and H2's required fresh mutable result object. H2 adds no arrays, intermediate tuples, CST nodes, tokens, or source slices of its own. The three `includes` probes are allocation-free, although integer representations may be scanned three times before `Number` performs conversion.
- The 17-line source is compact and locally readable once the regular expression is understood. The projection makes sign, integer/number classification, conversion, and own-key order explicit. The regex is dense, but its density follows the small regular language rather than an unrelated optimization trick.
- The inferred runtime export is `Parser<CssNumber>`, and the object literal supplies ordinary writable/configurable/enumerable own properties in `sign`, `type`, `value` order. The implementation-local `CssNumber` alias is not exported even though the ambient `candidate.d.ts` exports a same-shaped alias; because `feature.json` names only `consumeNumber` as the required candidate export, I do not treat that discrepancy as a second blocker for this frozen interface.

At code-feature altitude, H2 fits a `grammar/css/l4/value-unit/numeric` leaf: it owns numeric recognition and intrinsic numeric metadata, while leaving percentage, dimension, integer-only, delimiter, and EOF decisions to parents. A fused lexical terminal is also a reasonable leaf beneath a BBNF value-unit DAG; it does not create a competing ownership layer.

## Evidence audit, without fresh timing

All hashes named by `skeptic-subject.json` reproduce exactly. Static inspection of the bound correctness replay covers maximal prefixing, incomplete exponents, nonzero UTF-16 offsets, failure rollback including pre-existing ahead diagnostics, parent composition, mutable descriptors, repeated calls, parser introspection, and Parser-ID stability. Its bound result reports 180/180 holdout cases plus a 65,024-call independent scanner assay as passing. The candidate and pinned parse-that implementation provide a direct mechanical explanation for those results.

I did not run a timing command. Static reconstruction of `raw-first-attempt.ndjson` found exactly 545 records, 30 distinct process replicates, 360 sample blocks, and balanced first-lane order (180 each). Recomputing the 30 replicate means from the recorded elapsed values reproduces mean log ratio `-0.07336197220979548`, sample SD `0.027244341177386378`, and one-sided upper log bound `-0.06491032168356216`. That supports only the result's carefully stated H2-versus-deposed, exact-corpus, exact-environment claim. It supplies no H2-versus-H/B/S/D evidence and no production-distribution claim.

## Altitude disposition

- Code-feature: semantically sound, idiomatic, compact, transactional, and composable.
- Feature: the bound evidence supports the consume-number contract, but the comparative result is deliberately narrower than feature-wide preference.
- Total tranche: **REJECT** because the frozen subject asks fresh skeptics to ratify H2 selection while withholding independently reviewable evidence that H2 is preferable to the declared alternative architectures, and the zero-credit rejected G15 narrative cannot substitute for that proof.

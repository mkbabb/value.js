# G16 skeptic 3 — correctness and holdout audit

## Verdict

**ACCEPT**

Frozen subject SHA-256: `e97b1786ffd5a7046d64e80fd39a3e88143e38a99626780b1b9973e187f975fc`.

I found no reproducible semantic, state, construction, or evidence-binding defect in the exact H2 subject. This review inspected only the frozen subject and artifacts reached through its bindings; it did not inspect another G16 review, run a timing path, repair the candidate, or mutate production sources.

## Binding and total-tranche audit

Every SHA-256 named directly by `skeptic-subject.json` reproduced exactly: H2, G15 feature/interface/root disposition, correctness replay/evidence/tsconfig, benchmark source/manifest/corpus/schema/correctness/raw/result, and both preflight audits. The subject itself also reproduced the hash above.

The important transitive correctness bindings also close. The immutable CSSWG document is `3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390`; lines 1610–1678 independently hash to `3d9bc61ac4fbaa5a1038354c260e2289bc334b9837b9faf5acab840439cc5708`. The G14 contract, candidate declaration, public evaluator, public fixture manifest, G15 receipt, and ciphertext reproduce their declared hashes. The replay itself authenticates the receipt, ciphertext bytes, canonical AAD, escrow mode/key encoding, GCM tag, plaintext length/hash/canonical form, semantic-contract identity, and all 180 cases before importing H2.

The top-level result is not merely a detached PASS label. Untimed `benchmark.mts --validate` reproduced the bound 64-case/two-lane correctness JSON byte-for-byte and necessarily verified its lane, corpus, harness, Node, package-file, and package-tree bindings. Independent parsing of the bound raw evidence found exactly 545 records: one start, binding, controller, inference, and terminal record; 30 each of spawn/environment/preflight/warmup/summary/exit; and 360 sample blocks. All records share one attempt ID. Every block ratio recomputes exactly from its two elapsed integers, both lane checksums agree, every lane reports 320,000 operations, all 30 summaries equal the recomputed means of their 12 blocks, and the sole inference recomputes exactly (`mean=-0.07336197220979548`, `sd=0.027244341177386378`, upper log bound `-0.06491032168356216`). This is a consistency audit of existing bytes, not fresh timing. Credit correctly remains zero pending the required reviews and synthesis.

## Exact H2 and feature contract

The replay gates H2's hash, byte count, LF count, and mode before its sole dynamic import of `g15/optimization/h2/index.ts`. The public subprocess receives that same exact path. The 180-case evaluator and the 65,024-call assay then share the exact imported `consumeNumber` object; there is no alias, fallback, sibling candidate, or reconstructed implementation in the execution path. The benchmark correctness lane statically imports the same H2 path and verifies its hash before accepting evidence.

H2's scanner-free expression is equivalent to the pinned consume-a-number grammar: optional sign; either digits with an optional dot-plus-digits fraction or a leading dot-plus-digits fraction; then an optional complete signed exponent. Regex alternation order preserves the normative maximal prefix for incomplete fractions/exponents. The projection derives sign and integer/number type from the consumed spelling and uses `Number(representation)`, exactly as the frozen G14 JavaScript contract requires, including signed zero, underflow, and infinities. It constructs only one static regex parser and one static map parser at module initialization, and each success returns a fresh ordinary object literal in `sign,type,value` order.

The bound correctness tsconfig compiles the replay strictly but, because H2 is imported through a computed URL, does not by itself statically include H2. I therefore separately type-checked the exact H2 file with the inherited strict, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, NodeNext, and no-emit flags; it exits zero and conforms to `Parser<CssNumber>`. This scope limitation in the bound tsconfig is not a semantic counterexample.

## Reproduced public and 180-case evidence

The strict TypeScript gate exits zero. A fresh `holdout-replay.mts --verify` exits zero and its stdout compares byte-for-byte with the bound `correctness/evidence.json`. It directly reports all 180/180 cases passing across maximal prefix (24), repeated fraction (16), signs/leading zeroes (18), incomplete exponents (18), UTF-16 offsets/surrogates (16), ahead-diagnostic transactions (14), descriptors/mutability (8), parent composition (24), bounded hostile strings (16), repeat stability (10), introspection (8), and parser-ID allocation sentinels (8). The nested exact frozen public evaluator also passes its 77 inherited successes, 5 complete cases, 6 repeated-fraction cases, 336 transactional failure runs, 10 parent cases (5 of them repeated-fraction repairs), and 10 hostile runs.

An in-memory structural inspection of the authenticated holdout confirms those are real per-case executions rather than asserted family totals. It contains all 180 case objects and 214 source observations: 42 use nonzero offsets; every UTF-16 family case is nonzero-offset; failure transactions include nonzero offsets; and the hostile family has 13 successes plus 3 failures with sources from 4,097 through 16,385 UTF-16 code units. The modes route to the appropriate evaluator functions, and `executed === corpus.total_cases` is enforced.

## Independent oracle and hostile challenges

The stated 65,024 assay calls reconcile exactly: 22,737 every-offset calls over all 4,681 strings of length 0–4 from the eight-symbol alphabet; 42,129 wrapped-context calls; 12 incomplete decimal/exponent, 6 repeated-fraction, 6 UTF-16, 6 long-hostile, and 128 repeat calls. The alphabet includes representatives for every syntactic class and both exponent cases/signs; every valid offset is tried, while the wrappers add ASCII and surrogate-pair prefixes/suffixes. The imperative cursor oracle is structurally independent of H2's regex and separately decides fraction/exponent commitment. Its use of `Number` for the consumed spelling is a deliberate common mode imposed by the semantic contract, not an independent truth claim that could mask a divergence from that contract.

The assay verifies success/failure state, exact end offsets, predecessor identity and ahead-diagnostic restoration on 44,242 expected failures, exact result values and key order, ordinary writable/enumerable/configurable descriptors, extensibility, fresh result identity, stable parser ID/context/keys/printing, and absence of per-call parser allocation. Its hostile set reaches 200,000 code units and covers long signs, dots, exponent markers, digits, repeated fractions, and astral input.

I also ran a separate untimed state-machine differential against exact H2. It made 266,805 calls, exhaustively enumerating the same eight grammar-class representatives through length 5 at every valid offset, adding wrapped nonzero UTF-16 contexts, targeted incomplete/repeated forms, 10,000 repeat calls, and hostile inputs up to 1,000,002 UTF-16 code units. It produced 78,024 matching successes and 188,781 transactional failures, with no counterexample. Separate mutation probes successfully rewrote and deleted result fields and added an extra property; parser identity/context/keys/printing stayed fixed, every successful result identity was fresh, and a parser-ID sentinel showed no allocation growth across calls.

## Residual limits

The local escrow receipt does not authenticate author non-access: its candidate-set freeze field is null and the key is locally available. G15's disposition and G16's evidence explicitly disclaim cryptographically isolated secrecy and use the corpus as post-freeze regression evidence. That prevents the word “holdout” from adding independence credit, but it does not undermine the independently reproduced semantics above.

The exhaustive assay is finite and its oracle was shipped beside the replay, so neither alone proves all JavaScript strings. The pinned normative grammar admits a direct case split, however, and the independent length-5/every-offset and million-unit probes found no missing branch, restoration failure, regex backtracking failure, descriptor defect, or parser-identity defect. I therefore have no blocking counterexample to this exact frozen subject.

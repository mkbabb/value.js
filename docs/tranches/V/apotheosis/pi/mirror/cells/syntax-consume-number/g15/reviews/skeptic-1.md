# G15 skeptic 1 — CSS consume-a-number semantics

## Verdict

**ACCEPT.** Starting from the required assumption that the subject was wrong, I found no semantic defect in the exact selected H2 bytes. The parser consumes the CSS Syntax Level 3 maximal number prefix, projects the required `sign`, `type`, and binary64 `value`, and obeys the frozen transactional failure and UTF-16 offset contract. This verdict is for the assigned semantic/source/byte-integrity axis; it does not award tranche, integration, production, or benchmark credit.

## Frozen subject and exact candidate

- Reviewed subject: `skeptic-subject.json`
- Required and recomputed subject SHA-256: `4df4f41e519ef162110a8e13cdc87c4dc2f7a9d8cec454c110ef91c755f6c449`
- Selected candidate: `optimization/h2/index.ts`
- Required and recomputed candidate SHA-256: `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`
- Exact file facts: 560 bytes, 17 LF-counted lines, mode `0444`. These agree independently with the subject, synthesis set, H2 holdout supplement, and V3 result. I reviewed and executed these exact bytes.

All thirteen subject bindings recomputed exactly: feature `a88dc7df...b3a58`, candidate interface `04b4decb...f2bcf`, original candidate set `6b3b2057...0d40`, synthesis set `bb140549...63dc`, public evaluator `bbeeee5e...84b7`, holdout evaluator `81e91458...7e09`, original holdout evidence `b06c6345...c63c`, H2 supplement `5a702de8...fffb`, benchmark V1 failure `cbcfe27c...0174`, V2 result `9269e6ec...55dd`, V3 result `f717891c...5cde`, V3 raw `97f32458...6ae`, and BBNF engine receipt `6968e378...ed5`. No binding mismatch was found.

## Independent checks

### Normative-source authority

I fetched the official raw `w3c/csswg-drafts` file at immutable commit `08f2f799da6a306e8bf5daca208683717f26d643` and compared it byte-for-byte with the retained authority. The remote and local complete document both hash to `3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390`; lines 1610–1678 both hash to `3d9bc61ac4fbaa5a1038354c260e2289bc334b9837b9faf5acab840439cc5708`. The excerpt is the actual “Consume a number” algorithm and states the same sign, integer digits, digit-guarded fraction, complete exponent, type, and value rules used by this review. The commit/path/hash claim is authoritative and reproducible, not merely a local-byte assertion.

### Maximal prefix, representation, type, and value

The H2 terminal

`[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[Ee][+-]?[0-9]+)?`

is sticky at the current parse-that state offset. Its two mantissa alternatives are exactly digits with an optional digit-guarded fraction, or a leading dot followed by digits. Greediness consumes every digit available. The optional exponent can commit only when its digit is present, so `1e`, `1e+`, and `1e-` consume only `1`; `.5e-` consumes `.5`; `1.` consumes `1`; and repeated fractions such as `1.2.3` consume `1.2`. ASCII `[0-9]`, `E/e`, `+/-`, and `.` correctly exclude Unicode lookalikes.

The projection reads the consumed spelling only. It reports the first consumed sign or `null`; reports `number` exactly when a decimal point or complete exponent was consumed; and otherwise reports `integer`. `Number(representation)` is the frozen contract’s numeric interpretation and preserves `-0`, overflow infinities, and underflow behavior. Returning no separate representation field is correct: the unchanged source and start/end UTF-16 offsets recover the spelling, while the normative result is the value/type/sign triple. The object literal creates a fresh ordinary, extensible object with exact own-key order `sign,type,value` and ordinary writable/enumerable/configurable data properties.

### Failure, offsets, composition, and hostile input

parse-that compiles this terminal to a sticky regular expression and resets `lastIndex` to `state.offset` on every call. Thus a later numeric substring cannot be accepted from an earlier offset. On failure, the regex does not replace the predecessor value or move the offset, and `.map(...)` does not execute; source identity/content remains unchanged and `isError` becomes true. Pre-existing diagnostics whose furthest point is ahead remain structurally unchanged. Empty input and `offset === source.length` also fail transactionally. These behaviors satisfy the frozen parser extension around the normative algorithm’s “starts with a number” precondition.

Independent execution produced the following evidence:

- The bound public evaluator passed the exact H2 file: 77 inherited successes, 5 complete cases, 6 repeated-fraction cases, 336 failure transactions, 10 parent cases, and 10 hostile cases.
- I replayed the authenticated holdout evaluator. Its frozen bindings, runtime bindings, corpus summary, all per-candidate results, and verdict were byte-structurally equal to the persisted evidence core; each original candidate passed 180/180.
- Without changing any on-disk file, I replayed the same authenticated corpus with only the original-H runtime import redirected to the independently hash-verified H2 file. H2 passed 180/180 with zero failures, and its family, construction, transaction, composition, introspection, parser-ID, failure, and verdict result core exactly matched the bound H2 supplement.
- A separate stepwise scanner oracle, not the candidate regex, was compared against H2 for 21,523,381 parses. This exhaustively covered all strings through length seven over `+-.019eEx` in four prefix/offset contexts, then added incomplete forms, signed zero, leading zeroes, overflow/underflow, repeated fractions, astral-prefix offsets, and four one-million-code-unit cases. Separate probes covered actual lone high/low surrogates and non-ASCII digit/minus lookalikes. Every success end offset and leaf was exact; every failure preserved offset and predecessor identity; seeded-ahead diagnostics were unchanged.

## Three-altitude findings

### Feature altitude

No blocker. The exact H2 parser is a faithful direct implementation of CSS Syntax Level 3 consume-a-number under the frozen JavaScript result contract. Maximal-prefix decisions, sign/type/value projection, signed zero, complete-exponent rollback, repeated-fraction boundaries, failure transactionality, mutable leaf shape, and UTF-16 offsets are correct.

### Wave altitude

No semantic or custody blocker. The selected bytes are consistently content-addressed across the synthesis, holdout, and benchmark-result records; the public and authenticated hidden evaluations replay; the normative source pin reproduces from the official immutable commit. This review makes no finding on the assigned-to-others performance methodology or broader candidate-selection axes.

### Tranche altitude

No tranche-level semantic blocker arises from this feature. It is suitable to advance to the remaining G15 review/adjudication gates as a consume-number leaf. Per the frozen subject, feature, benchmark, integration, and production credit remain zero until those independent gates and the tranche-wide requirements are satisfied; this ACCEPT does not bypass them.

## Hostile conclusion

I attempted to falsify H2 at the grammar boundary, exponent/fraction rollback seams, result representation, numerical extremes, failure restoration, diagnostic precedence, repeated calls, long strings, and UTF-16 hostile offsets. The candidate and its semantic evidence survived. **Final verdict: ACCEPT.**

## Model receipt

- Task: `/root/g15_skeptic_1`
- Agent/runtime: Codex desktop agent
- Model family available to the agent: GPT-5
- Exact provider checkpoint: unavailable to the agent; no more specific model identity is claimed
- Review posture: independent hostile review; assumed wrong until checked
- Other skeptic reviews inspected: none
- Repository mutation: only this review file; no candidate, evidence, active grammar, evaluator, corpus, or frozen subject was modified

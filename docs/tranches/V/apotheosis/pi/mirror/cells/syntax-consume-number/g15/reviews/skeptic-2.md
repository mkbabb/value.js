# G15 `SYNTAX-CONSUME-NUMBER` skeptic 2

## Receipt and verdict

- Review posture: the candidate, its idiom, and its evidence were treated as wrong until independently reproduced.
- Frozen subject: `skeptic-subject.json`
- Exact subject SHA-256: `4df4f41e519ef162110a8e13cdc87c4dc2f7a9d8cec454c110ef91c755f6c449`
- Selected source: `optimization/h2/index.ts`
- Exact selected-source SHA-256: `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`
- Independence: I did not inspect any other G15 skeptic review. I did not mutate a candidate, evaluator, evidence file, grammar file, or shared coordination file.
- Model receipt: Codex; OpenAI GPT-5 family; exact serving checkpoint and reasoning configuration were not exposed to this agent; Codex desktop runtime.

**Verdict: ACCEPT.** No blocking finding survives the three-altitude review below. This verdict accepts the exact content-addressed H2 leaf and its bounded evidence. It grants no integration or production credit.

## Altitude 1 — frozen bytes, language, and leaf contract

No finding.

The subject and candidate hashes recomputed exactly. H2 is 560 bytes and 17 newline-terminated lines. The feature, interface, original candidate set, synthesis set, public evaluator, holdout evaluator, original holdout evidence, H2 holdout supplement, V1 failure, V2 result, V3 result, V3 raw evidence, and BBNF engine receipt all reproduced the hashes bound by the subject. The pinned local CSS Syntax document reproduced SHA-256 `3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390`; lines 1610–1678 reproduced excerpt SHA-256 `3d9bc61ac4fbaa5a1038354c260e2289bc334b9837b9faf5acab840439cc5708`. Fetching the document at CSSWG commit `08f2f799da6a306e8bf5daca208683717f26d643` independently reproduced the same full-document hash.

The terminal

```text
[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[Ee][+-]?[0-9]+)?
```

implements the maximal CSS number prefix directly: a dot enters the match only with a following ASCII digit, and an exponent marker/sign enters only with exponent digits. Consequently repeated fractions and incomplete decimal/exponent suffixes remain for the parent. `Number(representation)` supplies the contracted binary64 interpretation, including signed zero, underflow, overflow, and infinity. The projection creates an ordinary fresh object in the exact own-key order `sign,type,value`, with the default writable/enumerable/configurable descriptors.

The public evaluator replay passed 77 inherited successes, 5 complete cases, 6 repeated-fraction prefix cases, 336 failure transactions, 10 parent cases, and 10 hostile cases. I additionally exhaustively compared H2 with an independently instantiated sticky normative oracle over 199,290 ASCII-prefix/source-offset cases, including offsets after an astral character; 90,207 were successes and every end, sign, type, value, failure offset, predecessor identity, and ahead-diagnostic snapshot agreed. Ten thousand repeated successful calls produced ten thousand distinct result objects. Inputs up to 500,001 UTF-16 code units covering a digit run, incomplete exponent, repeated fraction, leading-dot run, and hostile sign completed without throw or state corruption.

## Altitude 2 — parse-that construction, closure, composition, and topology

No finding.

The TypeScript AST has one static import declaration, one type-only local declaration, and one exported initialized const. Its only import is `regex` from `@mkbabb/parse-that/core`. The operative calls are the direct `regex(...)` construction, its `.map(...)` construction, string `includes`, and `Number`; there is no dynamic import, class, function declaration, loop, manual offset/cursor access, source slice, generic remainder capture, custom `Parser`, token/atom object, CST, scanner, filesystem/process/network read, or mutable custom/global state. The two parser objects—the terminal and mapped parser—are constructed once at module initialization. Each invocation allocates only the required semantic leaf.

The installed closure reports `@mkbabb/parse-that@1.0.0`, with package JSON SHA-256 `f53ca9b85c43e65c1f3f8a21414f990211d8d0e6a7f07df805557cdb6b50f4ff`; the benchmark binding self-test also authenticated the complete package tree. In that engine, `regex` is a sticky current-offset terminal and `map` invokes the projection only after terminal success. Thus candidate failure does not overwrite the predecessor value, and no candidate wrapper is needed for transactionality. A candidate-only strict NodeNext TypeScript check passed.

Direct replay of the sealed evaluator over H2 passed all 180 cases: construction stability 9/9, transaction 14/14, parent composition 24/24, introspection 8/8, parser-ID growth 8/8, and every remaining family. Parser calls returned the identical `ParserState`; repeated calls retained parser ID, context identity, own keys, and stable printable form while returning fresh leaves. Independent percentage and dimension parents preserved/embedded the intrinsic leaf correctly.

Operative topology inspection also closes the structural-independence question. The frozen H source is one regex plus projection; B is a static `all`/`any`/`opt` production decomposition; S is a distinct staged decision graph; D dispatches by first character into three complete static branches. H2 changes only H's mantissa-alternative order and remains the selected H topology; it is not presented as a fifth independent topology. All five source hashes differ, and the actual exported graphs—not dead declarations—exhibit the declared structures. The synthesis registry's lane ID `h` is unambiguous because it binds the exact H2 path and hash.

At 560 bytes/17 lines, H2 is the KISS result. The regular expression is necessarily dense but mirrors both the normative language and the acknowledged BBNF `number` terminal; the adjacent semantic projection is local and readable. The more decomposed candidates add parser nodes and intermediate values without improving this atomic terminal's ownership or contract.

## Altitude 3 — evidence lineage, BBNF ownership, and tranche consequence

No blocking finding.

The write-once benchmark was not rerun. Structural self-test passed with the exact V3 manifest SHA-256 `634d3b7c19fc18203e9405f414158f7123119e454b41859e38e170b64991f808`, 10 position-balanced warmup blocks and 30 balanced sample blocks. Candidate semantic preflight passed the 16-case common domain and 10 corrected-only cases. Operation inspection confirms both compared lanes allocate one `ParserState`, invoke one consuming parse-that leaf, produce exactly one mutable semantic leaf, and expose the end through the same ephemeral observation wrapper. The deposed adapter derives fields from its own consumed representation; it receives no oracle sign/type/end. Broader LIVE and C14 doors are correctly excluded.

The persisted lineage is honest. V1 has five events, no timed block or summary, and a nonzero consumed exit caused by the warmup assertion defect. V2 has one start, 30 blocks, one summary, and one successful exit; recomputation gives H geometric mean `1.0299151832831084` and upper ratio `1.0771975948060564`, so no candidate qualifies. V3 likewise has one attempt identity, 30 blocks, one summary, one successful exit, 24,000 operations per lane/block, and equal semantic checksum in every block. Every lane occupies every one of five positions six times. Independent paired-log recomputation exactly reproduces H2 geometric mean `0.9441053576257097` and one-sided 95% upper ratio `0.9864729838277626`; only H2 satisfies the predeclared strict `upper < 1` rule. The V1, V2, and V3 raw files remain distinct, mode 0444, and retain their bound hashes.

The hidden-evidence receipt is also reproducible. The original exact evaluator replay passed all four frozen candidates 180/180. For H2, I loaded the same hash-bound evaluator logic and ciphertext/key entirely in memory, substituted only the exact H2 source binding after the original freeze checks, and emitted no plaintext. It independently reproduced 180/180 plus the claimed 9/9, 14/14, 24/24, 8/8, and 8/8 subresults.

`value-unit` is the correct ownership family. The ratified ledger assigns `SYNTAX-CONSUME-NUMBER` there as the one prefix-consuming §4.3.13 operation used by dimensions, percentages, and math. The acknowledged BBNF file also owns `number` and its unit-composed descendants in `value-unit`, using one equivalent regex terminal. H2 therefore follows production-family isomorphism without inventing a lexical layer. Its `{sign,type,value}` result is the intentionally smaller CSS Syntax leaf; downstream value-unit productions own `%`, unit classification, raw/source adaptation, and contextual domain rules.

Two limits remain explicitly routed, not hidden: the measured performance conclusion is about this exact machine, corpus, operation, and frozen first V3 attempt, not a universal speed guarantee; and promotion must replace/refactor the current provisional `value-unit.ts` numeric recognizer rather than leave duplicate production ownership. Those are later synthesis/integration obligations. They do not invalidate this exact leaf, and the subject correctly leaves integration and production at zero credit.

## Final disposition

**ACCEPT** the exact H2 candidate `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa` for passage to the five-skeptic unanimity gate. Any source, semantic seam, parser construction, benchmark subject, or integration-target change requires a fresh review.

# G15 hostile skeptic 5b — total-tranche gestalt review

## Receipt and scope

- Frozen subject: `skeptic-subject.json`
- Exact subject SHA-256: `4df4f41e519ef162110a8e13cdc87c4dc2f7a9d8cec454c110ef91c755f6c449`
- Selected candidate reviewed: H2, source SHA-256 `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`
- Model receipt: Codex, OpenAI GPT-5 family; exact serving checkpoint unavailable to the reviewer.
- Independence posture: I assumed the selection, tranche fit, semantics, evidence, and performance claim were wrong until the frozen material supported them.
- Scope discipline: I ran no broad search. No review path or review content was listed, opened, read, searched, or inspected. I inspected only the frozen subject and the exact content-addressed candidate, authority, evaluator, evidence, benchmark, and engine-receipt inputs permitted by the task.

## Content and integrity checks

All permitted bindings I used matched their expected SHA-256 values. In particular:

- feature `a88dc7df…b3a58`, interface `04b4decb…f2bcf`, original candidate set `6b3b2057…a0d40`, and synthesis set `bb140549…63dc`;
- H `b78dfcd5…01a0f`, B `550da39c…ccb7`, S `a512bf45…b169`, D `d470a62a…3137`, and H2 `8c3ac689…95aa`;
- normative document `3f129d17…4390` and lines 1610–1678 excerpt `3d9bc61a…708e` at CSSWG commit `08f2f799da6a306e8bf5daca208683717f26d643`;
- public evaluator `bbeeee5e…84b7`, holdout evaluator `81e91458…27e09`, original holdout evidence `b06c6345…2c63c`, and H2 supplement `5a702de8…9fffb`;
- benchmark v1 failure `cbcfe27c…0174`, v2 result `9269e6ec…a55dd`, v3 result `f717891c…95cde`, and v3 raw evidence `97f32458…6ae`;
- v3 manifest `634d3b7c…f808`, harness `0763a4f9…f82`, bindings `21f805fa…1000`, lanes `48419498…47f1`, and protocol `ed7443e3…00fc`;
- bounded BBNF engine-assay receipt `6968e378…ed5`.

The normative excerpt hash independently recomputed exactly. The v3 raw file has one attempt identity, blocks numbered 0 through 29, 30 distinct block orders, and exactly six appearances of every lane in every position. Every lane performed 24,000 operations per block and produced the same checksum. From the raw block times I independently recomputed H2's 30-pair mean log ratio `-0.05751751140995377`, sample standard deviation `0.14150807127201845`, and geometric-mean ratio `0.9441053576257097`; 23 of 30 individual blocks favored H2. The frozen one-sided 95% upper ratio is `0.9864729838277626`, below the predeclared strict boundary of 1.

## Altitude 1 — leaf semantics and implementation shape

H2 implements the CSS consume-a-number boundary exactly. Its mantissa language

`[0-9]+(?:\.[0-9]+)?|\.[0-9]+`

is the same language, with the same maximal-prefix result, as H's

`[0-9]*\.[0-9]+|[0-9]+`.

For digit-first inputs, H2 first consumes the required digit run and then takes a fraction only when a dot is followed by a digit. For leading-dot inputs, it requires at least one following digit. The exponent is included only when `e` or `E`, an optional sign, and at least one digit are all present. Consequently `1.`, `1e`, `1e+`, and `1e-` stop after `1`; `.5`, `1.5`, and `1e-2` consume their complete numeric prefixes. Optional sign ownership matches the normative algorithm. ASCII `[0-9]` correctly excludes non-ASCII digit-like code points.

The projection has the exact result contract and own-key order: `sign`, then `type`, then `value`. Dot or exponent presence sets `type` to `number`; otherwise it remains `integer`. `Number(representation)` preserves the tested binary64 behavior, including negative zero and infinities. The single regex terminal fails atomically before the map, and the frozen evidence covers source/offset/value transaction, pre-existing ahead diagnostics, UTF-16 offsets, fresh mutable leaves, construction stability, printable introspection, and absence of per-call Parser-ID growth.

There is no manual cursor loop, generic remainder capture, token tape, atom layer, CST, candidate-local scanner, or second lexical runtime. H2 constructs one parse-that regex parser and one semantic map at module initialization. This is an ordinary direct parse-that leaf, not a scanner disguised behind a parser-shaped export.

## Altitude 2 — ownership, composition, and module DAG

The chosen boundary owns exactly the numeric representation and its semantic leaf. It deliberately does not own `%`, identifier units, delimiters, integer-only policy, function syntax, or recovery policy. That is the correct low node for `grammar/css/l4/value-unit/numeric`:

- a percentage parent receives the numeric leaf and still sees `%`;
- a dimension parent receives the leaf and still sees the complete unit, including after a valid exponent;
- an incomplete exponent is left for the parent instead of being swallowed, so `12e`, `12e+`, and `12e-` retain the CSS maximal-prefix behavior;
- integer-only parents can use the returned `type` without reparsing spelling;
- math-function parents retain operator and delimiter ownership after the numeric prefix;
- keyframe percentage selectors can compose the same leaf without introducing a keyframes-specific number scanner.

The source imports only `regex` from parse-that core. It has no upward import into percentage, dimension, math, keyframes, tokenizer, or CST modules, so it does not create a cycle or invert the value-unit DAG. The leaf is reusable by all of those consumers while their contextual grammar remains above it.

The 24 authenticated parent-composition cases and the public percentage/dimension/integer/delimited parents exercise the most important seams. They do not constitute whole-application integration, and the subject correctly leaves integration and production credit at zero. For this tranche's leaf boundary, however, the evidence is proportionate and the ownership choice is sound.

## Altitude 3 — synthesis, evidence, and total-tranche choice

All five shapes can satisfy the semantic contract, so the choice turns on topology, clarity, downstream cost, and measured operation-equivalent performance.

- H is nearly ideal but orders the decimal-first alternative so an ordinary integer can force a failed dot search and a second digit scan. H2 expresses the same grammar in the cheaper and, in my view, clearer digit-first form.
- B is a faithful grammar decomposition, but it spends 64 lines and many parser/string-composition steps on a leaf whose externally meaningful boundary is one contiguous numeric representation. Its measured ratio near 4.43 is consistent with that excess structure.
- S exposes mantissa and exponent decisions explicitly, but empty-string branches and staged reconstruction increase both reading surface and runtime without adding an owned semantic distinction. Its measured ratio near 3.72 likewise disqualifies it here.
- D is compact and makes the first-character decision visible, but three complete regex branches duplicate the language and add dispatch-to-leaf overhead. It is less parsimonious than H2 and did not qualify against the deposed peer.
- H2 retains H's one-terminal/one-map architecture, removes the demonstrated integer-path rescan, is the only synthesis lane to satisfy the frozen strict benchmark rule, and has the smallest semantic surface consistent with the contract.

The benchmark comparison is operationally fair within its explicitly bounded claim. Candidate and deposed lanes each construct one ParserState, invoke one parser, materialize one mutable `{sign,type,value}` leaf, and return the same ephemeral observation wrapper. The deposed adapter derives fields that its historical parser does not expose; it is not supplied oracle values. Only the 16-case common domain is timed, while 10 corrected-only cases are candidate validation gates. Position/reversal balancing, fixed-neighbor checks, immutable first-attempt persistence, retained outliers, paired log ratios, and the predeclared one-sided t rule are implemented in the bound harness and borne out by the raw record.

The v1/v2/v3 lineage is coherent rather than a silent rerun: v1 consumed its write-once path before any timed block because of a warmup assertion defect; v2 used a separately addressed correction and found no qualifier; H2 was then frozen as a source change, v2 was preserved, and v3 used another distinct first-attempt path. The v3 advantage is modest and comes from one environment and one run, so it supports only the stated bound qualification—not a universal production-speed claim. That limitation does not defeat the predeclared tranche gate.

One evidence caveat survived hostile review: the frozen H2 holdout supplement is a result receipt, not by itself a replayable H2 execution path in the bound holdout evaluator, whose visible source enumerates the original H/B/S/D set. I therefore do not treat the supplement alone as proof. The gap is closed for this candidate by a source-level transfer argument: H and H2 have the same single-regex-plus-identical-map topology, their mantissa expressions are language- and maximal-prefix-equivalent by exhaustive first-character partition (digit, dot, or failure), and the original H passed all 180 authenticated cases plus the nine construction checks. The H2 supplement independently reports the same 180/180 and 9/9 outcome, while benchmark preflight adds public execution evidence. No hidden semantic seam was introduced by the optimization.

## Verdict

**ACCEPT.** H2 is the best total-tranche synthesis from H, B, S, D, and H2. It places the ownership boundary correctly, preserves exact consume-number semantics and parent composability, introduces no scanner/token/CST runtime or adverse DAG edge, is materially more parsimonious than B/S/D, improves H's only relevant structural inefficiency, and has sufficient frozen semantic and operation-equivalent benchmark evidence for skeptic acceptance. This acceptance grants no integration or production credit and does not widen the performance claim beyond the bound G15 protocol.

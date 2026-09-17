# G15 skeptic 3 — benchmark, equivalence, and custody review

## Receipt

- Review task: `/root/g15_skeptic_3`
- Frozen subject: `docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g15/skeptic-subject.json`
- Required and observed subject SHA-256: `4df4f41e519ef162110a8e13cdc87c4dc2f7a9d8cec454c110ef91c755f6c449`
- Review posture: every performance and benchmark claim was presumed invalid until replayed from bound bytes.
- Timing policy: no timing was rerun. All three raw attempts were left intact.
- Model receipt: Codex desktop agent; OpenAI GPT-5 family; the exact serving checkpoint and internal reasoning-effort label are not available to this reviewer.

## Replayed checks

- The subject's feature, interface, original candidate set, synthesis set, public evaluator, holdout evaluator, original holdout evidence, H2 holdout supplement, v1 failure receipt, v2 result, v3 result, v3 raw evidence, and H2 source hashes all match their current bytes. H2 is exactly `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa` (560 bytes, 17 LF lines).
- The normative document and lines 1610–1678 replay to `3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390` and `3d9bc61ac4fbaa5a1038354c260e2289bc334b9837b9faf5acab840439cc5708`, respectively.
- The historical comparator file is authentic: it is byte-identical to `src/parsing/utils.ts` at value.js commit `9fce504a5764258c8e56b0ce77cd656c725a4907`, and both have Git blob `cbb57ab5327bc0afa667fbd13ad98d77f3b610de` and SHA-256 `73e6a9731c802be86ac0230f32062f1075d344f6143715786eb1d9b8fe0f28e4`.
- The public evaluator replay on H2 passes 77 inherited successes, 5 complete cases, 6 repeated-fraction cases, 336 transactional failures, 10 parent cases, and 10 hostile cases.
- The bound benchmark self-test passes without timing. Candidate validation passes H2 and B/S/D on all 16 common-domain and 10 corrected-only cases; the deposed lane passes the 16 common-domain cases.
- The exact holdout evaluator replay authenticates and passes only the original `h`, `b`, `s`, and `d` sources. In particular it loads original H SHA-256 `b78dfcd5194ec2480d4ce480417555fffb10788e9ea0cdef1fa4d778af901a0f`, not H2.
- H and H2's regex languages are algebraically the same: H's decimal-first `digits* "." digits+ | digits+` is reordered as H2's `digits+ ("." digits+)? | "." digits+`. An independent prefix comparison found no mismatch across 1,060,800 exhaustive/bounded-random strings. Thus the source change itself is credible as an ordering optimization, not a correctness relaxation.
- Raw evidence is preserved read-only: v1 `48286cbc1914513c698d8e43d93503e3ba306efb372d27e28d433297b80d2654` (5 lines), v2 `0bb3348aa75deb938fef37735fa4a4b69a7f4312f26a73c48e7ccb3828b48ee1` (37 lines), and v3 `97f32458d6f031f0ad7de0446ad62b28c232facad629738dd6797cced62ea6ae` (37 lines).
- V3 has exactly 30 indexed sample blocks. Its orders exactly replay from seed `1597463007`; every lane occupies every position six times; every lane executes 24,000 operations per block; and all five checksums agree inside every block. The 10 warmup blocks occur before, and are absent from, the 30 sample arrays.
- Recomputing all V3 medians, MADs, paired log ratios, sample standard deviations, and qualifications reproduces the raw summary. For H2 versus deposed, `n=30`, mean log ratio `-0.05751751140995377`, sample SD `0.14150807127201845`, geometric-mean ratio `0.9441053576257097`, and nominal one-sided 95% upper ratio `0.9864729838277626` are arithmetically correct.

## Three-altitude findings

### Altitude 1 — identity, lineage, and custody

The v3 subject is content-addressed well enough to replay its present code, corpus, registry, schedule, and raw arithmetic. The peer is the real historical parse-that production, not a synthetic slow substitute. The lane does not receive oracle sign/type fields: it receives source text, calls the exact historical parser once, derives its extent/sign/type, and constructs one mutable leaf. Both lanes also construct the same ephemeral observation wrapper. Corrected-only CSS cases are kept out of the historical peer comparison. This repairs G14's obvious operation-asymmetry defects.

The advertised immutable v1/v2/v3 lineage is nevertheless incomplete. V1 raw binds manifest `50184dcf...`, harness `f4e3177c...`, bindings `a9730a61...`, and protocol `4cd8be13...`; none of those byte streams is retained anywhere outside review directories in this workspace. V2 raw binds manifest `ea5049fa...`, which is likewise absent. A workspace-wide content-hash scan found none of those historical subjects. The receipts preserve claims about their content, not the content needed to verify correction scope. V1's failure and the existence of distinct write-once v2/v3 paths are credible, but an independent reviewer cannot prove from retained bytes that v2 changed only the warmup assertion or that all other v1/v2 rules were immutable.

V3 is also a post-result optimization round, not a confirmatory frozen-candidate run. H2 was created after V2 showed original H losing, H3 and H4 source variants also exist before V3, and V3 reuses V2's exact corpus and deterministic order. There is no persisted optimization-selection protocol, multiplicity rule, or evidence excluding unrecorded probes. Calling V3 a distinct source subject is truthful; calling the overall process a retry-proof performance gate is not.

### Altitude 2 — semantic and operation equivalence

Within the timed corpus, operation and result equivalence are sound: both lanes create one `ParserState`, invoke one parser, return one mutable `{sign,type,value}` leaf and consumed end, and pass exact binary64/sign/type/end validation. H2 is broader and CSS-correct on plus signs and leading zeroes, but those corrected-only cases are not charged to the deposed peer. The historical lane's slice/type work is the necessary cost of adapting a parser that historically returned only a number; it is not an oracle-fed penalty.

The corpus only supports a narrow microbenchmark claim. Its 16 common cases are short, start at offset zero, and omit long mantissas, suffix/rollback continuations, failure transactions, and the broader scalar/CST doors. The claimed LIVE and C14 non-comparability is correctly disclosed, but it means this run cannot establish production value-unit speed or a general consume-number workload win. At most it measures this exact 16-string leaf intersection under this runtime.

More seriously, the H2 authenticated-holdout claim is not executable from its declared binding. `holdout-supplement.json` names evaluator SHA-256 `81e914...`, but that exact evaluator hard-codes original candidate-set SHA-256 `6b3b...`, IDs `h,b,s,d`, candidate paths under `g15/candidates`, and each original source hash. It has no command-line argument, environment branch, or H2 binding. Replaying it proves original H, not H2. No separate H2 evaluator, raw evaluator output, or reproducible transformation is retained. The supplement's `PASS_180_OF_180` is therefore an unauthenticated assertion even though source inspection and public tests make semantic equivalence plausible. The selected source has not passed the claimed bound hidden gate.

### Altitude 3 — schedule, denominator, and strictness

The raw observations and formulas are honestly recorded, and warmup/sample contamination by array reuse is absent. The inferential denominator is not justified. The protocol creates only three independently shuffled base orders. Each base deterministically expands into ten dependent rotations/reversals; those 30 constrained rows are then treated as 30 independent observations with `df=29`. There is no serial/cluster analysis or argument that the ten rows sharing a base are independent experimental units. All V3 sampling occurs in one worker over roughly 0.483 seconds between `warmup_complete` and `summary`, so there is no process- or run-level replication either.

Using the three independently randomized superblocks as the experimental units gives H2/deposed mean-log-ratio values `[-0.01981845184660367, -0.10025519835293313, -0.05247888403032449]`. The one-sided 95% t upper ratio with `df=2` is `1.010739980995819`, which crosses equality. Thus the observed point estimate favors H2, but the evidence does not prove that H2 truly and strictly beats the deposed peer. The published `0.9864729838277626` upper bound is a consequence of pseudoreplicating the ten schedule rows per independently randomized base.

## Verdict

**REJECT.** H2 is a parsimonious direct parse-that regex/map and is a credible no-relaxation improvement over original H. The comparator and per-case timed operation are authentic, and the V3 raw point estimate is useful directional engineering evidence. But the selected H2 lacks a runnable authenticated holdout, historical v1/v2 subjects are not retained, the optimization/retry family is uncontrolled, and the strict-win CI uses an unsupported denominator. These are evidence-seam defects, not requests to alter the candidate.

Justified credit: **zero benchmark/performance credit, zero feature credit, zero integration credit, and zero production credit**. The only justified non-credit conclusion is that H2 deserves a newly frozen, independently reproducible correctness gate and a fresh benchmark whose independent replication unit supports its CI. Under the current frozen subject, neither `PASS_180_OF_180` for H2 nor strict superiority over the deposed peer is established.

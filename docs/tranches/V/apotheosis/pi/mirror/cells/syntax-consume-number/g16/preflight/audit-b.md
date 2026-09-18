# G16 pre-timing statistical/operation audit B

## Verdict: ACCEPT

The exact frozen G16 benchmark is acceptable for its first and only timing attempt. The acceptance is for the narrow, predeclared estimand: the mean across 30 fresh child processes of each child's mean of 12 paired-block log elapsed-time ratios, on the exact equally weighted 64-case corpus and exact bound runtime/sources. It does not establish a production-input average, per-case dominance, or independence from ambient host drift.

No timing was run and no source artifact was mutated during this audit.

## Audited bindings

- `benchmark.mts`: `967cb46c2bd46ae8804cf44c5a24d85e52184dca3ee7d1edbd25814343f66edf`
- `benchmark-manifest.json`: `1e4ded8488ca5081251971a1cd9813ccb66abbac78983f660e51dadb454251b0`
- `corpus.json`: `084d40cceed3cce481e23cbac1ca288c2af2899fad515dc948115c0aed9fd46b`
- `benchmark-evidence.schema.json`: `e07b83d9f5d344cde2c62c554c4f6a92d832cab452615ba61630cd34c500e880`
- `evidence/correctness.json`: `72e61a63ff0b8fa5c3d7701635c70029e4c8ded07e3c48aa0959f06907ee1ef5`

All five observed hashes equal the pinned audit inputs.

## Operation audit

- The two timed lanes implement the same declared endpoint: create one `ParserState` at the case's exact UTF-16 offset, invoke the bound parser once, and produce a mutable `{end, leaf}` observation whose leaf has mutable `sign`, `type`, and `value` fields. The deposed lane necessarily normalizes its scalar parser result by deriving `end`, `sign`, and `type` from the actually consumed source span and constructing the equivalent leaf. Therefore the result measures the declared end-to-end normalized operations, not isolated parser-core time.
- Timed work passes only `row.source` and `row.offset` into either lane. Expected `end`, `sign`, `type`, and `binary64_be_hex` fields are used by the untimed semantic validation but are not read by `runWork` or passed to either timed lane. There is no expected-value/oracle leakage into timed work.
- Corpus validation requires exactly 64 ordered unique IDs, exact row fields, valid spans, declared family counts, and matching binary64 encodings. Untimed semantic validation executes both lanes on every row and verifies exact end offset, ordinary mutable wrapper/leaf shape, sign, type, and binary64 value: 128 observations total. The frozen correctness replay produced the bound observation digest `5554b33225d0b55766c8b079b07835702c88ee096733f8f3ba5c5481fdbc1291`.
- Every timed lane/block traverses all 64 rows in fixed order for 5,000 repetitions: exactly 320,000 parser operations per lane/block. Both lanes share the same loop, index weighting, row order, and repetition count. Each block hashes numeric sink bits, structural sink, and operation count and rejects unequal lane digests before emitting the block. The checksum is an aggregate collision detector rather than a per-invocation proof, but the immediately preceding exact 128-observation semantic validation supplies the stronger case-level equality check.
- Each child uses four untimed warmup blocks with two occurrences of each lane order and 12 retained sample blocks with six occurrences of each lane order. Both balanced multisets are Fisher-Yates shuffled from fixed, unique per-child seeds (warmup uses the separately transformed seed). All 360 predeclared sample blocks are retained.
- The controller forks exactly one child at a time for each of 30 fixed unique seeds, waits for its exit, and never restarts it. This supplies fresh process/JIT/heap instances and prevents concurrent child interference. Fresh processes do not make observations physically independent of shared machine state: thermal behavior, scheduler load, CPU frequency, and temporal drift can still correlate sequential children. The t inference therefore retains the ordinary stable-host/approximately independent process-aggregate assumption.

## Statistical audit

- Child `r` computes exactly `d_r = mean_{b=1..12}(ln(h2_elapsed_ns / deposed_elapsed_ns))`. No block is selected, deleted, trimmed, substituted, or weighted differently.
- The only inferential sample is the 30-element vector of child `d_r` values. The harness computes its arithmetic mean and Bessel-corrected sample variance with divisor 29, then `upper = mean + t * sd / sqrt(30)`. Treating blocks as observations would be pseudoreplication; this harness does not do that.
- Independent offline evaluation gives `t(0.95, df=29) = 1.699127026533497`. The frozen `1.6991270265` differs by about `3.35e-11`, an immaterial downward rounding at the displayed precision. The declared `n=30`, `df=29`, standard-error denominator `sqrt(30)`, and one-sided critical value are coherent.
- The qualification is emitted only after all 30 child summaries. A child failure consumes the sole attempt with zero credit. The source contains no interim qualification branch, retry, outlier path, alternate estimator, or optional-stopping path.
- `upper < 0` is the correct strict decision rule for claiming that the predeclared population mean log ratio is below zero at the one-sided 95% level. Zero is the equal-time boundary, and equality correctly fails. Exponentiating interprets the claim as an upper confidence bound below one for the geometric h2/deposed ratio associated with this mean-log estimand. It is not a claim that h2 wins every block, process, family, or individual case.

## Corpus and interpretation limits

The corpus deliberately excludes plus-sign and multiple-leading-zero behavioral differences so that all timed rows lie in the common domain. It is a fixed, synthetic, equally weighted set: 8 integers; 10 decimals; 10 exponents; 10 CSS continuations; 10 rollback/maximal-prefix cases; 10 nonzero-offset cases; and only 2 cases at each 16-, 64-, and 128-digit mantissa length. It is not sampled from a workload distribution and does not cover parser failures or every valid/invalid number boundary. Repeating the same rows improves timing precision but does not broaden external validity. Any accepted result must remain scoped to this corpus, exact lane normalization, exact environment, and mean-log-ratio estimator.

One non-statistical metadata blemish is retained in the exact manifest: `correctness_evidence.status` still reads `PLACEHOLDER_MUST_BE_CONTENT_ADDRESSED_BEFORE_TIMING`, although its SHA-256 is a real bound hash, the manifest-level status is frozen-ready, the harness reports no placeholder, and frozen verification checks the exact evidence hash and contents. This stale descriptive label does not change execution, work, or inference, so it is not a statistical/operation rejection; it should not be quoted later as the actual readiness state.

## Permitted gate evidence

- `../../../node_modules/.bin/tsc -p bench/tsconfig.json --noEmit`: exit 0.
- `../../../node_modules/.bin/tsx bench/benchmark.mts --self-test`: `PASS_FROZEN_STRUCTURE_NO_TIMING`, 64 cases, 30 processes, 4 warmup blocks/process, 12 sample blocks/process, 360 retained blocks, no harness or correctness placeholder.
- `../../../node_modules/.bin/tsx bench/benchmark.mts --validate`: `PASS_EXACT_TWO_LANES_64_CASES_NO_TIMING`, 64 cases and 128 exact observations, reproducing the frozen correctness evidence.
- Offline arithmetic: 320,000 operations per lane/block and 230,400,000 total timed lane operations across the complete planned attempt.

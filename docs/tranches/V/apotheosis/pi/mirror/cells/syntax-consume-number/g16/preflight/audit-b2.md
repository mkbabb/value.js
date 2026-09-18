# G16 repaired pre-timing statistical/operation audit B2

## Verdict: ACCEPT

The repaired exact-byte benchmark remains faithful to the frozen statistical estimand and is acceptable for the first and only timing attempt. The controller now independently reconstructs every retained process aggregate from exact validated sample events; it does not trust a worker-supplied aggregate. Event validation has no value-dependent retention, outlier, replacement, or early-qualification branch. No timing was run during this audit, the subject files were not mutated, and the raw first-attempt path was confirmed absent.

## Exact subject bindings

- `benchmark.mts`: `bd46893f1ddfa628a258f9f0c953227b1d0513f28643a75c13977f49815a74c3`
- `benchmark-manifest.json`: `f9ef032d101a74e4493f0e529ffe26244e35f6e9b49c18998ecb4a83438ca9a1`
- `corpus.json`: `084d40cceed3cce481e23cbac1ca288c2af2899fad515dc948115c0aed9fd46b`
- `benchmark-evidence.schema.json`: `e07b83d9f5d344cde2c62c554c4f6a92d832cab452615ba61630cd34c500e880`
- `evidence/correctness.json`: `0196d9a361bea3bc43fa370f64c7354c739e2c99e1f3e73853d71a712794c22f`
- `README.md`: `cb77506c4fcdfa633ceca93fcca303dddc958cb0b91435bb3dfe341da8752661`

All observed SHA-256 values exactly match the supplied pins. The repaired manifest consistently marks both itself and the correctness evidence frozen/content-addressed; the prior stale placeholder-status blemish is gone.

## Estimand preservation

The worker still computes, for child process `r`, the arithmetic mean of exactly 12 retained values

`ln(h2_elapsed_ns / deposed_elapsed_ns)`.

The repaired controller validates each event's exact phase, field set, seed/index envelope, frozen order, positive safe-integer elapsed times, 320,000 operations per lane, valid equal lane checksums, and exact recomputation of the reported log ratio. It appends the controller-recomputed ratio to `sampleRatios` only after these invariant checks. At the summary event it requires exactly 12 ratios, recomputes their arithmetic mean in original block order, requires bit-exact `Object.is` equality with the worker summary, stores the controller result, and returns that controller result to `runFirstAttempt`.

Consequently, the inferential vector remains exactly 30 child-process aggregates with no change of unit or weighting. `processInference` still uses their arithmetic mean, Bessel-corrected sample variance with divisor 29, standard error `sd / sqrt(30)`, fixed one-sided 95% `t` critical value `1.6991270265`, and strict qualification `upper < 0`. The repaired evidence checks neither pool the 360 blocks nor introduce an alternate estimator. The rule continues to test the predeclared mean-log-ratio boundary; it does not claim per-block or per-case dominance.

## Timing and selection audit

- Both elapsed clocks still bracket only `runWork`. Worker checksum construction, log-ratio construction, IPC, controller validation, controller aggregate recomputation, evidence writes, and fsyncs occur after the paired block's two lane clocks have stopped.
- Validation does not branch on whether an elapsed value or log ratio is favorable, large, small, or an outlier. A malformed phase, order, operation count, checksum, ratio, aggregate, stderr stream, exit, or persistence event fails the entire sole attempt with zero credit. It never deletes a block, substitutes a value, restarts a child, or continues inference with fewer than 30 process aggregates. This introduces no selection/optional-stopping path.
- The exact phase machine requires one environment event, the exact frozen 128-observation semantic preflight, the exact seeded warmup order, all 12 exact seeded sample orders, and one matching summary. Duplicate, missing, extra, reordered, or post-summary sample events fail. Thus controller recomputation cannot silently change the declared sample.
- The child launch adds only Node's narrow `--disable-warning=DEP0205` switch. The untimed fork smoke confirmed the exact TSX `--require`/`--import` argv plus that switch and zero child-stderr bytes. Real workers still reject every remaining nonempty stderr byte. The switch is common to both timed lanes and does not select observations.
- IPC send completion is not an acknowledgment that the parent has finished validation and fsync. Parent work for the preceding event can therefore overlap some subsequent worker activity. This is outside the completed block's clocks and was already structurally possible from per-event durable persistence; the repaired exact checks add controller work but no data-dependent lane choice. Each child has exactly six sample blocks per first-lane order under a frozen shuffle, so a generic first/second-position disturbance is balanced. Residual shared-CPU/I/O contention can add variance and is part of the ordinary stable-host limitation; it is not a value-based retention or estimator bias. A protocol demanding strict parent/child non-overlap would require an explicit parent acknowledgment, but that stronger isolation is not part of the frozen estimand.

## Operation and scope confirmation

The operation contract is unchanged: each timed lane creates one `ParserState` at the exact case offset, invokes its pinned parser once, and returns the normalized mutable leaf/wrapper endpoint. Only `source` and `offset` enter timed work; oracle fields remain confined to untimed validation. All 64 fixed rows run 5,000 times per lane/block, and exact untimed validation again proved both lanes' end offset, sign, type, binary64 value, and mutable object shape on all 128 observations. The observation digest remains `5554b33225d0b55766c8b079b07835702c88ee096733f8f3ba5c5481fdbc1291`.

Acceptance remains limited to this fixed, equally weighted common-domain corpus and exact normalized endpoint. Plus-sign and multiple-leading-zero differences are deliberately excluded; the corpus is not sampled from production and does not establish performance for failures, every grammar boundary, individual cases, or a different case-frequency distribution. Fresh sequential processes isolate JS heaps/JIT state but do not guarantee physical independence from scheduler load, thermal state, CPU frequency, filesystem activity, or temporal drift.

## Permitted untimed gates

- `../../../node_modules/.bin/tsc -p bench/tsconfig.json --noEmit`: exit 0.
- `../../../node_modules/.bin/tsx bench/benchmark.mts --self-test`: `PASS_FROZEN_STRUCTURE_NO_TIMING`; 64 cases, 30 process aggregates, 12 sample blocks/process, 360 retained blocks, and no placeholders.
- `../../../node_modules/.bin/tsx bench/benchmark.mts --validate`: `PASS_EXACT_TWO_LANES_64_CASES_NO_TIMING`; 64 cases, 128 exact observations, repaired benchmark hash, and frozen observation digest reproduced.
- `../../../node_modules/.bin/tsx bench/benchmark.mts --worker-launch-smoke`: `PASS_NO_TIMING_CHILD_STDERR_EMPTY`; child stderr was exactly zero bytes and child exec argv included only the pinned TSX launch flags plus `--disable-warning=DEP0205`.

No blocking statistical or operation defect was found in the repaired bytes.

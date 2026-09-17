# G16 confirmatory consume-number benchmark

This rail compares only the exact G15 H2 parser and exact G7 deposed parser on
64 operation-equivalent common-domain cases. Plus-sign and multiple-leading-zero
differences are deliberately absent from the timed corpus. Each operation makes
one `ParserState` at the declared source/offset, calls one parser once, produces
one mutable leaf, and returns the same mutable observation wrapper.

The only safe pre-timing commands are:

```sh
../../../node_modules/.bin/tsc -p bench/tsconfig.json --noEmit
../../../node_modules/.bin/tsx bench/benchmark.mts --self-test
../../../node_modules/.bin/tsx bench/benchmark.mts --validate
../../../node_modules/.bin/tsx bench/benchmark.mts --worker-launch-smoke
```

`--validate` writes deterministic untimed correctness evidence to stdout. Root
captured that exact line in `bench/evidence/correctness.json`, bound the final
harness/schema/evidence hashes, changed the manifest to
`FROZEN_READY_FOR_FIRST_ATTEMPT`, and replayed the compiler, self-test, and
byte-exact validation comparison. The raw path remains absent.

The launch smoke forks the exact benchmark module without warmup or timing. It
proves that appending Node's narrow `--disable-warning=DEP0205` switch removes
the pinned TSX loader warning from worker stderr while every other nonempty
worker-stderr byte remains fatal to the real attempt.

`--run-first-attempt` is the sole timing entry point. It first opens
`evidence/raw-first-attempt.ndjson` with `wx`, so every failure consumes the
attempt. It then verifies frozen bindings and correctness evidence, launches
exactly 30 fresh child processes sequentially without restart, and fsyncs every
event. The controller validates the exact child phase sequence and every raw
sample payload, then recomputes each process aggregate from the twelve retained
ratios rather than trusting the worker summary. Complete-record writes account
for short writes; final fsync and close are attempted independently on every
post-open path. There is no retry, alternate estimator, outlier rule, or V2
path.

Each child performs an untimed semantic preflight, four warmup paired blocks
(two per order), and twelve retained sample paired blocks (six per order), using
its frozen seed and 5,000 full-corpus repetitions per lane per block. Its sole
aggregate is the mean of the twelve H2/deposed log ratios. The controller uses
the 30 process aggregates with df=29 and the fixed critical value
`1.6991270265`; qualification is strict upper bound `< 0`.

No timing command was run while authoring this rail.

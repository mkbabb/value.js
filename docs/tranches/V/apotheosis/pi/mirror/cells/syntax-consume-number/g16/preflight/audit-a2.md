# G16 benchmark pre-timing hostile re-audit A2

## Verdict

**ACCEPT for the sole first timing attempt.**

The A1-A3 blockers from audit A are resolved in the exact replacement bundle. No new blocker capable of producing a false PASS, violating the one-attempt protocol, or needlessly consuming the attempt was found. This audit performed no timing and did not invoke `--run-first-attempt` or a timed `--worker`.

The raw path was absent before review and remained absent after every allowed untimed check.

## Exact subject bindings

- `benchmark.mts`: `bd46893f1ddfa628a258f9f0c953227b1d0513f28643a75c13977f49815a74c3`
- `benchmark-manifest.json`: `f9ef032d101a74e4493f0e529ffe26244e35f6e9b49c18998ecb4a83438ca9a1`
- `corpus.json`: `084d40cceed3cce481e23cbac1ca288c2af2899fad515dc948115c0aed9fd46b`
- `benchmark-evidence.schema.json`: `e07b83d9f5d344cde2c62c554c4f6a92d832cab452615ba61630cd34c500e880`
- `evidence/correctness.json`: `0196d9a361bea3bc43fa370f64c7354c739e2c99e1f3e73853d71a712794c22f`
- `README.md`: `cb77506c4fcdfa633ceca93fcca303dddc958cb0b91435bb3dfe341da8752661`

## Re-audit of prior blockers

### A1 resolved — narrow loader-warning suppression is effective in the actual fork shape

`childExecArgv()` preserves the controller's exact `process.execArgv` and appends only `--disable-warning=DEP0205`, with duplicate avoidance. The real worker fork and the smoke fork both use that helper. The manifest freezes both the exact appended switch and the policy that every other nonempty worker-stderr byte remains fatal; base binding verification checks both strings.

The allowed `--worker-launch-smoke` fork loaded the exact benchmark module through the pinned Node/TSX path, performed no parser work, exited 0, and reported:

- `PASS_NO_TIMING_CHILD_STDERR_EMPTY`
- `child_stderr_bytes: 0`
- child `exec_argv` equal to the controller TSX arguments plus exactly `--disable-warning=DEP0205`

The smoke controller itself still prints DEP0205 before its JSON result. That is expected and is outside the forked child's captured stderr; the child pipe that the real attempt enforces was empty. Real workers continue to accumulate stderr, kill above the fixed cap, and reject any nonempty remainder after exit.

### A2 resolved — exact IPC phases and controller-derived inference inputs

The controller now enforces the one-way phase sequence `environment -> preflight -> warmup -> samples -> summary`. It checks the exact envelope and exact own fields for every event, rejects duplicates/out-of-order events, and validates:

- the child runtime identity and exact child `exec_argv`;
- the complete semantic result against the frozen correctness object, including every source/evidence hash;
- the exact seeded warmup order and declared warmup count;
- exactly 12 sequential sample blocks in the frozen seeded order;
- exact lane keys and payload keys, positive safe-integer durations, exactly 320,000 operations per lane, valid equal lane checksums, and exact recomputation of each log ratio from elapsed values;
- a summary only after all 12 samples, with an exact match to the controller's recomputed arithmetic mean.

Crucially, `runReplicate()` returns `state.aggregate`, recomputed from the controller-validated sample ratios, rather than the worker's summary field. Only 30 such controller aggregates can reach `processInference()`. A malformed, contradictory, duplicate, or incomplete child stream therefore fails instead of influencing qualification.

### A3 resolved — short writes and every post-`wx` failure path are guarded

After the exclusive `wx` open, the first `start` append and all later work are inside the outer guarded region. Each NDJSON record is converted to bytes, written in a loop until complete, and fsynced before progress. A zero/invalid write fails the attempt.

On ordinary failures, the controller best-effort appends and fsyncs `CONSUMED_FAILED_FIRST_ATTEMPT_ZERO_CREDIT`. The outer `finally` always calls `close()`. That function attempts final fsync and close independently, so an fsync exception cannot bypass the close attempt; a close-path error converts an otherwise successful run to exit failure. No overwrite, deletion, truncation, alternate raw path, retry, or restart path exists.

## Remaining lifecycle review

- `wx` reserves the sole declared raw path before frozen verification; pre-existing evidence prevents execution.
- Frozen corpus, lane, runtime files/trees, harness, and correctness evidence are verified by the controller before any timing work. Each fresh child repeats base bindings and exact 64-case semantic validation before warmup.
- Children run sequentially in the frozen 30-seed order. Any spawn error, protocol error, timeout, signal, nonzero exit, stderr, missing summary, or persistence failure stops the loop; there is no retry/replacement branch.
- Completion requires one validated aggregate from every child, and inference separately requires exactly 30 finite controller-derived aggregates with the frozen one-sided rule.
- Child close is observed before acceptance; stderr is fully closed before its zero-length check; the fixed timeout is cleared only after child close.

## Allowed untimed checks

- `../../../node_modules/.bin/tsc -p bench/tsconfig.json --noEmit` — exit 0.
- `../../../node_modules/.bin/tsx bench/benchmark.mts --self-test` — exit 0; `PASS_FROZEN_STRUCTURE_NO_TIMING`.
- `../../../node_modules/.bin/tsx bench/benchmark.mts --validate` — exit 0; deterministic stdout exactly reproduced the bound correctness evidence.
- `../../../node_modules/.bin/tsx bench/benchmark.mts --worker-launch-smoke` — exit 0; `PASS_NO_TIMING_CHILD_STDERR_EMPTY`, child stderr 0 bytes.

No timing command, timed worker, retry, or alternate attempt was run.

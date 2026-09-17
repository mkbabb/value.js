# G16 benchmark pre-timing hostile audit A

## Verdict

**REJECT. Do not run the first timing attempt.**

This audit performed no timing and did not mutate any benchmark source or frozen input. The exact frozen inputs reviewed were:

- `benchmark.mts`: `967cb46c2bd46ae8804cf44c5a24d85e52184dca3ee7d1edbd25814343f66edf`
- `benchmark-manifest.json`: `1e4ded8488ca5081251971a1cd9813ccb66abbac78983f660e51dadb454251b0`
- `corpus.json`: `084d40cceed3cce481e23cbac1ca288c2af2899fad515dc948115c0aed9fd46b`
- `benchmark-evidence.schema.json`: `e07b83d9f5d344cde2c62c554c4f6a92d832cab452615ba61630cd34c500e880`
- `evidence/correctness.json`: `72e61a63ff0b8fa5c3d7701635c70029e4c8ded07e3c48aa0959f06907ee1ef5`

## Blocking findings

### A1 — The pinned `tsx`/Node 26 launch emits stderr that the controller treats as worker failure

Both allowed untimed executions of the frozen harness emitted this warning on stderr while exiting successfully:

```text
(node:...) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
```

The frozen first-attempt command also launches through `tsx`. Each worker is forked with the controller's `process.execArgv` (`benchmark.mts:527-532`), so it inherits the same loader/bootstrap responsible for the observed Node 26 warning. Worker stderr is piped and accumulated (`benchmark.mts:540-547`), and any nonempty stderr makes an otherwise successful child fail (`benchmark.mts:567-576`). On the audited runtime and invocation, child 0 is therefore expected to emit the loader warning and terminally consume the sole attempt. There is no retry or replacement, as required, so this is fatal pre-timing.

The child launch must suppress only the known loader deprecation at its source or use a warning-free pinned launch path, while continuing to reject unexpected worker stderr. That change and all resulting bindings must be frozen and re-audited before timing.

### A2 — The controller can produce a false PASS from an unsubstantiated child summary

For `sample_block`, the controller validates only the sequential `block_index` and then increments a counter (`benchmark.mts:507-509`). It does not validate the declared order, lane payload presence/shape, positive safe-integer durations, exact operation counts, checksum format/equality, or that `log_ratio_h2_over_deposed` is derived from the two elapsed values. For `replicate_summary`, it accepts any finite `d_r_mean_log_ratio_h2_over_deposed` with `sample_blocks === 12` (`benchmark.mts:510-515`). It neither requires phase order nor recomputes the aggregate from the 12 retained sample events. The accepted summary value is returned (`benchmark.mts:575-577`) and fed directly into the 30-process inference (`benchmark.mts:627-633`).

Consequently, a malformed worker event stream can retain sample evidence that contradicts the summary while the controller still emits `COMPLETE_FIRST_ATTEMPT` and `PASS`. The fact that the current worker intends to construct valid events is not controller-side IPC validation and does not make the raw evidence self-authenticating.

The controller must enforce an exact per-child phase machine; validate every semantic, warmup, sample, and summary field; retain the 12 validated ratios in controller state; recompute `d_r` itself; and use only that recomputed value for inference. The semantic preflight should also be checked against all frozen correctness hashes, not only status and cardinalities.

### A3 — Failure persistence does not guarantee descriptor closure

After the successful `wx` open, the initial `start` append occurs outside the guarded `try` (`benchmark.mts:603-616`). A write/fsync failure there consumes the exclusive path but bypasses both the failure terminal and explicit close. In addition, `close()` calls `fsyncSync` before `closeSync` in one statement (`benchmark.mts:609-610`); if fsync throws, `closeSync` is never attempted, including from the failure `finally` (`benchmark.mts:638-648`). `writeSync`'s returned byte count is also ignored, so a short synchronous write is not completed or rejected before fsync.

All work after `openSync(..., "wx")`, including the first append, must be under a failure-safe outer `try/finally`; closure must be attempted even when final fsync fails; and complete-record writes must account for short writes. A storage failure may prevent a terminal record, but it must not bypass the best-effort terminal/flush/close sequence in the harness.

## Properties that otherwise held under static review

- `wx` is used before bindings verification, preventing overwrite/reuse of the declared raw path.
- Controller-side execution is sequential and has no retry/restart branch.
- Successful completion requires 30 loop results and `processInference` independently requires exactly 30 aggregates.
- Child timeout, spawn error, signal/nonzero exit, stderr, protocol error, incomplete event counts, checksum failure in the worker, persistence errors, and inference errors route to attempt failure in the ordinary path.
- Frozen lane, corpus, runtime, harness, and correctness-evidence bindings are checked before timing work begins; workers repeat the base binding and semantic checks.

## Untimed checks run

- `../../../node_modules/.bin/tsc -p bench/tsconfig.json --noEmit` — exit 0.
- `../../../node_modules/.bin/tsx bench/benchmark.mts --self-test` — exit 0; reported `PASS_FROZEN_STRUCTURE_NO_TIMING`; emitted `[DEP0205]` on stderr.
- `../../../node_modules/.bin/tsx bench/benchmark.mts --validate` — exit 0; reproduced the frozen correctness evidence exactly; emitted `[DEP0205]` on stderr.

No `--run-first-attempt`, worker, timing, retry, or alternate command was run.

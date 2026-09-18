# G15 consume-number leaf benchmark

This is a prototype evidence rail, not production execution. It compares only
operation-equivalent consume-number leaves. The broader LIVE scalar and C14
CST/value-unit doors are bound as witnesses but explicitly non-comparable here.

Before candidates exist, the only permitted executions are structural:

```sh
../../../node_modules/.bin/tsc -p bench/tsconfig.json --noEmit
../../../node_modules/.bin/tsx bench/benchmark.mts --self-test
```

After a four-candidate registry is frozen and its hash replaces the manifest's
`null` placeholder, `--validate-candidates` checks both corpus classes without
timing. `--run-first-attempt` is the only timing entry. It opens
`evidence/raw-first-attempt.ndjson` with exclusive create and never retries;
even a partial, failed, killed, or malformed attempt consumes that path.

The deposed adapter receives only source text. It invokes the exact historical
recognizer, derives its own sign/type/end, and constructs one mutable leaf. A
candidate contributes its parser's intrinsic leaf and end without a second
normalization allocation. Corrected-only CSS cases gate candidate semantics but
do not enter the deposed comparison.

Provenance: `/root/g15_benchmark`, `gpt-5.6-sol`, reasoning `ultra`, 2026-07-22.
No timing command was run while authoring this rail.

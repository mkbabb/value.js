# Formation clean pass 1 — critic B

- Epoch: `912d8cbe6fe0b2ff64ef9edf17156fd8975b14e57c4b3e438ffc01a22fb5ac3f`
- Role: `critic_b`
- Task: `/root/vnext_clean_p1_critic_b_c6769518cdbe51b4f0894b77bb06b74e42b2d5cabd8cc2d776e2f9136914145a`
- Prompt SHA-256: `c6769518cdbe51b4f0894b77bb06b74e42b2d5cabd8cc2d776e2f9136914145a`
- Requested/served route: `gpt-5.6-sol / ultra / priority`
- Epoch before/after: exact match, 157 inputs; no repository mutation.

## Findings

### B-01 — Stale consumer-authority literals (`C00U`, `C05`)

`validate-consumer-bounds.mjs` returns bounds `6ae02dde…`, file `0261de83…`,
manifest `50108ec7…`; `waves/M-C.md:38,51` and `PROVENANCE.md:131-137` require
`69d636…`, `b22f5c…`, `6af154…`. `validate-corpus.mjs` does not join its receipt
to those wave literals, so the aggregate is green over impossible gates.

### B-02 — Return-v3 adjudicator is unsatisfiable and orphan-owned

The base actor forbids extra properties while its `allOf` adjudicator requires
`input_report_sha256`. Direct probes reject both presence and absence. The
deferred owner is `first-production-wave`, while four independent roots exist.

### B-03 — Return-v3 annexes are incompatible with active consumers (`C05`)

v3 requires `annexes` as an array. `deletion-judgment.mjs:109-115`,
`value-target-owner-return.mjs:255-263`, `keyframes-proof-contract.mjs:684`, and
transpose/package validators use named-map lookup. The public-surface validator
explicitly requires v2. A schema-valid v3 return cannot feed these gates.

### B-04 — Exact deletion-owner union is caller-controlled (`C05`)

`deletion-judgment.mjs:369-378` checks the union only when optional
`expectedOwnerWaves` is supplied. Its CLI and all active callers omit it. The
acceptance claim is therefore vacuous and not derived from the transitive graph.

### B-05 — Clean-pass manifest cannot prove protocol relations (`C08`, `C09`)

The schema does not require adjudicator inputs, constrain seat roles, or equate
epochs/predecessors/report hashes; there is no semantic manifest validator.
The available schema engine ignores unsupported `prefixItems` and falsy
`items:false`; a fixture with `passes:[{},{}]` validated.

### B-06 — Deletion truth bypasses quarantine (`C05`)

`deletion-truth.mjs:171-175` enumerates every Git path and `:139-149` performs
metadata/content reads without the forbidden-basename check. A measured repo
containing `r1-opus-refuted` would be opened.

### B-07 — Global prompt-routing prose overclaims (`C08`)

`FORMATION.md:246` says every prompt demand maps to a wave; nine seed demands
are owned by non-wave `formation-root`, explicitly special-cased by the
validator. The 149-row bijection is intact, but the stronger prose is false.

## Coverage

API closure, architecture DAGs, design matrices, parser execution boundary and
state routing disclosed no independent defect. Findings cover consumer truth,
deletion/quarantine, gate soundness, return closure, prompt prose and whole-wave
formation. P00/P01 currentness remains honestly RED.

Commands: epoch before/after; aggregate, wave, DAG, target, API, seed, union,
consumer, CSS and PT validators; direct reachability, return-schema,
clean-manifest, seed-owner and tool-existence probes; read-only inspections.

Verdict: **NOT_CLEAN**.

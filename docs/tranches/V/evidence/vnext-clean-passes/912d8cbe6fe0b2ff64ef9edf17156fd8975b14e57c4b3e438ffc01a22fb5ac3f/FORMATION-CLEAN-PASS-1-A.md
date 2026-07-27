# Formation clean pass 1 — critic A

- Epoch: `912d8cbe6fe0b2ff64ef9edf17156fd8975b14e57c4b3e438ffc01a22fb5ac3f`
- Role: `critic_a`
- Task: `/root/vnext_clean_p1_critic_a_15337d7e422ded9d5d8a290ba75277b374ce1c432e673e52ddeba7935d298fe3`
- Prompt SHA-256: `15337d7e422ded9d5d8a290ba75277b374ce1c432e673e52ddeba7935d298fe3`
- Requested/served route: `gpt-5.6-sol / ultra / priority`
- Epoch before/after: exact match, 157 inputs; no repository mutation.

## Coverage

| Domain | Disposition |
|---|---|
| api-closure | CLEAN — 129 HTTP + 17 headless, 568 bindings; mutations rejected. |
| architecture-dags | CLEAN — five current graphs; 193 waves/794 acyclic edges. |
| consumer-universe | CLEAN — 15 roots, six typed paths, five package scopes. |
| deletion-truth | CLEAN for absent-input refusal; execution remains RED. |
| design-mobile-desktop | CLEAN formation coverage; physical evidence remains born RED. |
| gate-soundness | NOT_CLEAN — F-01/F-02 false-green; F-03 impossible. |
| parser-boundary | CLEAN formation boundary; `--require-current` correctly RED. |
| prompt-seed-bijection | NOT_CLEAN — F-01 leaves union canon unbound. |
| quarantine-safety | CLEAN walker probe. |
| return-dependency-closure | NOT_CLEAN — F-03/F-04. |
| state-routing | CLEAN — one codec/router law and all 21 route models. |
| wave-formation | NOT_CLEAN — structural graph passes, global close cannot. |

## Findings

### F-01 — Union authority is not epoch/content-bound (`C08`)

`tools/corpus-epoch.mjs:15` includes only the two seed letters, while
`UNION-INGESTION.md:26,114` names additional external union canon.
`validate-union-inventory.mjs:73` checks cited line range, not authority SHA or
cited bytes. A temporary fixture prepended bytes to `UNION-APOTHEOSIS.md`
without changing line count; validation still returned 114 valid rows and 193
recipients. Union bytes can drift without changing the epoch or gate.

### F-02 — Clean-pass schema admits a forged clean manifest (`C08`)

`formation-clean-passes.schema.json` uses a generic actor for every seat;
adjudicator input hashes are optional, roles/identities need not differ,
pass-2 predecessor is unrelated to pass-1, and manifest hash is shape-only. A
fixture reused one critic in all seats, omitted adjudicator inputs, supplied
arbitrary predecessor/hash, and passed the available schema validator.

### F-03 — Normative return adjudicator is unsatisfiable (`P00`)

`return.schema.json` gives the base actor `additionalProperties:false`, then
uses `allOf` to require `input_report_sha256` on the adjudicator. Including the
field reports `additional property forbidden`; omitting it reports `required
property missing`. No v3 terminal return can validate.

### F-04 — `first-production-wave` is an orphan (`P00`)

`RETURN-VALIDATOR-DEFERRED.json:5` names no wave and confirms no executable.
`P00`, `V00A`, `A00`, and `G00` are independent roots; no wave deliverable
creates `validate-return.mjs`, while C09 assumes it. Parallel execution has no
deterministic validator owner/prelude.

Commands: epoch before/after; aggregate/API/target/PT validators; deletion
absent-input probes; temporary union-mutation, return-schema, clean-schema,
quarantine and root-enumeration probes; read-only corpus inspection.

Finding families: `union-authority-drift`, `vacuous-clean-manifest`,
`unsatisfiable-return-schema`, `orphan-return-validator`.

Verdict: **NOT_CLEAN**.

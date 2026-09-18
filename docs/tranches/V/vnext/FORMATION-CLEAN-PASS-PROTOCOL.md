# Formation clean-pass protocol

This proves formation, not production; `formation-root` owns it. Its ≤25,000
byte core is this file, `formation-clean-passes.schema.json`, and
`tools/{corpus-files,corpus-epoch,clean-pass-prompts,hash-clean-report,validate-clean-passes}.mjs`.

Freeze formation on the sole `corpus-epoch.mjs` digest. Evidence lives outside
the epoch at `docs/tranches/V/evidence/vnext-clean-passes/<epoch>/`; only the
manifest is self-excluded. Keep external inputs addressed and reject
`r1-opus-refuted` before traversal.

Each pass uses fresh independent `gpt-5.6-sol`/`ultra` critics A/B and a fresh
same-route adjudicator bound to ordered A/B report hashes. Critics never read a
sibling; adjudicators reproduce claims, never vote. Pass 2 follows CLEAN pass 1
and binds `CONSECUTIVE-PASS-2` plus its adjudication hash. A finding resets 0/2
and requires a changed corpus/new epoch.

Root persists each sealed `.prompt.txt`, successful explicit `spawn_agent` JCS
`.assignment.json`, and JCS `.report.json` at
`FORMATION-CLEAN-PASS-<pass>-<A|B|ADJ>.*`. No trailing bytes. Each manifest actor
binds all three paths/bytes/hashes. Validation reloads them, regenerates prompt
and task, and cross-joins identity, route, inputs, epoch and predecessor.

Reports are strict UTF-8 RFC 8785/JCS schema `vnext-clean-pass-report/2`,
≤12,000 bytes. Coverage order is `api-closure`, `architecture-dags`,
`consumer-universe`, `deletion-truth`, `design-mobile-desktop`,
`gate-soundness`, `parser-boundary`, `prompt-seed-bijection`,
`quarantine-safety`, `return-dependency-closure`, `state-routing`,
`wave-formation`.

Coverage keys are exactly `command,disposition,domain,locator,observation`;
command keys `command,exit_code,locator,observation`; evidence keys
`locator,observation`; finding keys `id,locator,mechanism,observation,owner`.
Locators are concrete `path:line`; observations are substantive. Every domain
references a distinct successful non-epoch focused command with identical
locator/observation; evidence equals the ordered coverage projection. CLEAN
also requires matching boundary epochs, exact owners, empty defect vectors and
terminal `"verdict":"CLEAN"}`. Non-JCS bytes are RED.

Schema-v4 requires two passes/six fresh seats, ordered adjudicator inputs and
pass-2 predecessor identity. `manifest_hash` hashes JCS without itself. Run the
validator `--selftest`, then normally. Until both pass on current evidence,
formation is 0/2 and production 0/193.

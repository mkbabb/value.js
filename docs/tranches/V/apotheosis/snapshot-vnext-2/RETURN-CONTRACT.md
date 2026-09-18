# Wave return contract

## Outcome and identity

Every wave returns one `vnext-wave-return/3`. Formation executes none:
production is **0/193**. P00 implements the deliberately RED, normative-schema
validator at ≤15,000 bytes before any other work; every wave descends from P00.

The return binds its exact wave contract and formation epoch.
`repository={realpath,repository_state_sha256}` is the only repository
identity. Its digest is exactly `repositoryStateSha256(realpath)` from
`tools/gate-runtime.mjs`:

```text
SHA256(JCS({schema:"vnext-repository-state/2",root:realpath,head,
 diff_sha256:SHA256(git diff --binary HEAD --),untracked,submodules}))
```

`head` is `git rev-parse HEAD`; `untracked` is the path-sorted exact
`git ls-files --others --exclude-standard -z` vector of
`{path,kind:file|symlink,sha256(contents|link-target)}`. `submodules` is the
path-sorted index-gitlink vector. Each row binds `path`, `index_oid` and either
the exact `UNINITIALIZED` state of an absent/empty checkout or an `INITIALIZED`
`checked_out_head` plus a recursively computed repository-state digest under a
derived identity root. Nonempty uninitialized, escaping, symlinked, malformed,
cyclic or unresolved-stage gitlinks fail closed. Thus two trees with the same
dirty paths/status but different tracked, untracked or nested-gitlink bytes
cannot share identity. The validator recomputes this digest before and after
gate execution and rejects drift. `return_hash` is
`SHA256(JCS(return with return_hash omitted))`.

## One artifact coordinate and one state

Every persisted input/proof uses exactly
`Artifact={path,schema,bytes,sha256}`: canonical absolute realpath, exact owning
schema/media identity, file length and SHA-256. It must be a regular non-symlink
file; the validator re-reads it. A repeated coordinate or split identity for one
realpath is RED.

Let `U` be the union of:

- every `dependencies[*].return`;
- all three challenge actors' `prompt`, `assignment` and `report` coordinates;
- every `gates[*].receipt` and every non-null `proof_output` read from those
  authenticated receipts;
- every `annexes.<family>.artifact`; and
- every `routing.pi[*].artifact` and `routing.delta[*].artifact`.

`state_artifacts` equals `U` exactly and is sorted by ascending UTF-8 bytes of
`JCS(Artifact)`. No missing or extra coordinate is legal. State identity is:

```text
state_digest = SHA256(JCS({repository,state_artifacts}))
```

This is the sole preimage. Artifacts never predict the enclosing digest. Each
challenge actor binds the exact `repository_state_sha256`; challenge and gate
envelope artifacts live outside the bound repository, so challenge may precede
the gate without a cycle and sealing can bind every later gate byte.

## Dependencies and status

Each direct dependency names wave, contract hash, admitted status, self-hash and
a `vnext-wave-return/3` artifact. Recursive validation proves the DAG, exact
edges/policy, hashes, cycles and split identities; checkout green proves nothing.

Statuses are `COMPLETE`, `KEEP`, `PRUNE`, `REFUSED`, `BLOCKED` and `NOT_CLEAN`.
Only the exact wave/edge-policy outcome advances. `BLOCKED` records its external
condition; `NOT_CLEAN` records the surviving defect. Neither earns credit.

## Gate receipt and proof output

Each wave-row gate occurs once. Its `vnext-gate-receipt/1` artifact authenticates
exact JCS plus LF of this complete payload:

```ts
{schema,wave_id,gate_id,kind,probe,disposition,proof_output,exit_code,signal,
 reason,receipt_hash}
```

`schema` is constant; wave/gate/probe are their return-schema IDs/non-empty
strings; `kind` is `command|probe`; `disposition` is
`PASS|NOT_APPLICABLE|RED`; output is `Artifact|null`, exit is integer/null,
signal and reason are non-empty string/null, and `receipt_hash` is SHA-256.

`receipt_hash=SHA256(JCS(receipt without receipt_hash))`; the coordinate hashes
the full LF-terminated bytes. Identity equals the return/contract. `PASS` reruns
the canonical scrubbed-environment gate on the bound repository: exit 0, no
signal/stderr, exactly one strict-JCS-plus-LF stdout equal byte-for-byte to the
non-null output artifact, and null reason. `NOT_APPLICABLE` has null
output/exit/signal, non-empty reason and a contract branch. `RED` records the
failed result/reason and never advances. Substitution, omission, extra stdout,
mutable/missing manifest, fallback or workspace alias is RED.

The pre-mutation manifest binds born-RED, corpus/oracle, budgets, at-limit/`+1`,
crater and expected output. The direct proof command is the sole path.

## Final-state challenge

After repository freeze, two fresh Sol-ultra critics challenge tranche fit,
eight-cell adherence, consumer behavior and implicated global claims. A fresh
adjudicator receives exactly their report hashes and reproduces every claim.
Each actor binds `task_name` equal to the last `agent_path` segment, a prompt
coordinate whose SHA-256 equals `prompt_sha256`, a JCS
`vnext-challenge-assignment/1` coordinate recording successful explicit spawn,
full path/task/prompt identity and requested/served route, and the exact
terminal report coordinate. The validator reloads and cross-joins all three
artifacts; the adjudicator additionally binds the ordered A/B report hashes.
Task names, agent paths, prompts, assignment receipts and reports are pairwise distinct.
Repair requires a fresh triad then gate/crater. C08/C09 remain additional.

## Routing, annexes and remainder

The return repeats `R0`–`R5`; `N/A(no-visual-claim)` has empty π/DELTA and a
reason. Visual/interaction/motion/responsive/a11y/performance claims have matched
π/DELTA artifacts for exact route, viewport, theme, input and state. Distinct
mobile/desktop, touch/multitouch, reduced-motion and nonvisual traces remain;
screenshots alone prove no behavior.

`annexes` remains a kebab-case map. Each value carries family schema, one
exact backing artifact and the family projection. Its validator proves content;
the universal validator proves the coordinate occurs once in state artifacts.
API/target, package/public-surface/transpose, consumers/snapshots,
deletion/judgment, CSS/package, visual and benchmark claims require their named
annexes. Deletion answers intrinsic worth, replacement, total-universe
casualties and exact tombstone/archive action. Its scan vocabulary is the exact
sorted union of removed surface name, governed aliases and tombstone name;
owner-selected omissions/additions are RED. Count alone proves nothing.

Every partial or abandoned item is `fold`ed to an owner, `bank`ed with a
measurable retrigger, or `retire`d with rationale. A twice-deferred chronic gets
its own decision wave. Empty remainder is `[]`.

## Deferred validator

`RETURN-VALIDATOR-DEFERRED.json` is the only deferral. P00 first captures its
immutable external born-RED/input bytes and manifest, then implements and
selftests the universal validator before any repository mutation. Canaries include
artifact substitution/omission/addition/reordering; same-path split identity;
same-status/path repositories with changed dirty bytes; copied state digests;
prompt/task/assignment/route/report nonjoins; gate-output mismatch;
dependency/challenge/annex/π/DELTA union drift; self-hash drift; and fail-closed
I/O. Historical provider/custody and 177 KB validators remain evidence only.

# Universal Return Contract

## Canonical record law

[`return.schema.json`](return.schema.json) is the sole machine schema. The
Markdown return below is only its human projection. JSON is serialized with
RFC 8785/JCS after omitting the `return_hash` member entirely; SHA-256 of those
UTF-8 bytes is then inserted as the lowercase 64-hex `return_hash`. Verification
removes that member and repeats the same preimage rule. Hashing an empty,
zeroed, or self-containing field is invalid.

Every JSON or JSONL authority is decoded from its original bytes with fatal
UTF-8 before parsing. A UTF-8 BOM, malformed byte sequence, non-JSON
whitespace, duplicate object member, lone surrogate, or number that overflows
the finite IEEE-754 domain is invalid; callers may not predecode with
replacement semantics. JSONL applies the same parser independently to every
record after one fatal decode of the bound file.

The canonical identity is `vnext-wave-return/2`. Version 1 is rejected rather
than accepted through an alias or compatibility branch; no execution returns
were persisted before this clean break.

`null`, missing required members, prose sentinels and implicit N/A are
forbidden. An inapplicable conditional section is exactly
`{"applicability":"not_applicable","reason":"…"}`; collections with no
members are empty arrays. Band additions live only under
`annexes.<lowercase-namespace>` and cannot redefine status or a universal
field. `tools/validate-return.mjs` checks the top-level contract, status/gate
law, typed absence, deletion-judgment chain and self-hash; the JSON Schema
remains authoritative for the complete shape. `tools/wave-contract.mjs`
projects each canonical seven-cell wave row into a JCS-hashed
`vnext-wave-contract/1`: exact mission, dependencies, born-RED, deliverables,
exclusions, one canonical acceptance gate, the exact seed-requirement objects
owned by that wave, any structured formation-proof obligation owned by that
wave, and the outcome/edge rows expanded from
[`WAVE-EDGE-POLICY.json`](WAVE-EDGE-POLICY.json). Edges are always
`producer/dependency → consumer`; the reverse orientation is invalid. Every return
binds `scope.wave_contract_sha256` and `scope.seed_requirements_verified` to
that projection and must return exactly that gate set; arbitrary gate IDs,
subjects, expectations, seed omissions, or additional green gates are
rejected. `node tools/validate-wave-contracts.mjs
[WAVE-ID]` prints the signed projection.

The default validator mode proves only the root return against its live branch,
HEAD, dirty state and content-bearing repository-state digest, then re-executes
that root's exact canonical proof command without a shell. Every unique
descendant is instead replayed once from its own exact clean committed epoch in
a detached temporary Git worktree. Thus a later root in the same repository can
advance without falsifying a valid predecessor, while only the root can emit
live completion.

`--offline` is explicitly `offline-historical-only`: it performs structural and
content-address checks, emits `completion_eligible:false`, and sets all three
proof predicates—`accepted_at_epoch`, `holds_now`, and
`authorizes_decision`—to false. It executes no historical proof authority.
Internal `--historical-certificate` materializes and executes exactly its root
clean commit, emits only `accepted_at_epoch:true`, and remains non-completing.
Band-neutral `--immutable-authority` performs that same root replay plus one
managed historical replay per unique descendant and emits
`offline-immutable-authority`, `immutable_authority_eligible:true`, and the exact
authorization closure. It still sets `holds_now:false`,
`authorizes_decision:false`, and `completion_eligible:false`; only a specialized
typed composer may apply outcome policy and turn the immutable evidence into a
decision. The removed Value-only `--decision-authorization` spelling is not an
alias. None of these modes can replace the default live re-execution of the
latest C08 attempt.

Every standards-facing feature return carries a total operation vector:

```text
parse, type, evaluate, resolve, adapt,
serialize.exact, serialize.edit, serialize.canonical
```

Each cell is exactly one of
`implemented(evidence)`, `delegated(capability,evidence)`,
`preserved_syntax_only(evidence)`, `refused(code,evidence)`, or
`not_applicable(reason)`. Preserve-only is valid only for parse/exact/edit;
delegation is valid only for resolve/adapt. Maturity, specification category
and browser interop are separate fields. A scalar “terminal stage” is invalid.

## Required wave return

```md
# <WAVE-ID> Return

## Status
COMPLETE | KEEP | PRUNE | REFUSED | BLOCKED | NOT_CLEAN

## Evidence inputs
| Path | SHA-256 | Purpose | Class |
|---|---|---|---|

## Quarantine attestation
- forbidden path:
- read: false
- tool-log path:
- tool-log SHA-256:

## Pins
- repository:
- path:
- branch:
- HEAD:
- dirty state before:
- dirty state after:

## Scope
- mission:
- wave-contract SHA-256:
- exact seed-requirement projection (row ID, source/excerpt hash, phase,
  disposition, decision, amendments):
- direct predecessor terminal returns (wave, absolute path, file SHA-256,
  return hash, wave-contract SHA-256, exact repository-state set, corpus epoch
  or typed inapplicability):
- files intended:
- files actually changed:

## Born-RED
- witness:
- reproduction command:
- observed failure:

## Delivery
- source changes:
- test changes:
- export/manifest changes:
- deleted paths as exact `{repository, path}` objects:
- migration/data changes:

## DAG delta
- nodes/edges/SCCs before:
- nodes/edges/SCCs after:
- new public edges:
- removed public edges:
- test-isomorphism result:

## Gates
| Gate | Kind | Command/probe | Expected | Result | Receipt | Evidence |
|---|---|---|---|---|---|---|

Every gate carries a strict `vnext-gate-receipt/3` file whose self-hash binds
the wave, exact wave-contract hash, gate ID, kind, subject, expectation,
the exact sealed implementation-challenge hash, timestamps, result, and
proof-manifest path/hash. That manifest must itself be
`vnext-proof-manifest/1` and repeat the exact wave ID, contract hash, and full
seed-requirement projection; hashing an unverified manifest is insufficient.
Command receipts additionally
bind the canonical command token and argument vector, the real executable path
and file digest, a semantic environment digest, the exact named pinned
repository root and its content-bearing state digest, exit code, and persisted
stdout/stderr paths plus hashes. Exit zero mechanically implies `pass` and
nonzero implies `fail`.

The proof module receives only the exact allowlist exported by
`tools/gate-runtime.mjs`: `CI`, `FORCE_COLOR`, `HOME`, `LANG`, `LC_ALL`, `NODE`,
`NO_COLOR`, `PATH`, `TERM`, `TMPDIR`, and `TZ`. Its JCS projection is the
environment digest. `NODE_OPTIONS`, every `VNEXT_*` validator/control flag,
every npm lifecycle/configuration variable, and every other ambient variable
are absent; changing the persisted digest to include one fails closed. The
exact committed `.vnext/proof-runner.mjs` consumes a private JCS carrier,
deletes every ambient key, installs the bound projection, deletes the carrier,
and only then imports the exact repository-relative proof entrypoint. Runner
and entrypoint bytes are covered by the repository-state certificate;
`node_modules/.bin`, `.npmrc`, package scripts, and `script-shell` are outside
the acceptance execution path.

The runner is universal non-shipped proof infrastructure. It is committed and
covered by the repository-state certificate, but is excluded from library
target-path and public-package manifests because no runtime, declaration or
consumer imports it. Deleting or changing it invalidates proof replay; shipping
it as product code is equally incorrect.

The live validator does not trust that caller-authored process record. It will
execute only the generated direct form `node .vnext/proof-runner.mjs
test/proof/<wave>/run.mjs --manifest test/proof/<wave>/manifest.json`, bind
`node` to the validator's canonical `process.execPath` plus executable digest,
require the cwd to equal the identified pin root, and use no shell or package
manager. The live exit code and stdout/stderr byte hashes must equal the
persisted receipt, and the repository state must be unchanged across
execution. A command mismatch, executable or manifest drift, invented success,
output drift, proof side effect, or stale wave contract fails closed before the
return can be terminal. Probe/manual receipts retain typed non-process
execution, but the generated 190-wave registry currently projects command
gates only.

`scope.dependency_returns` is the sorted exact set of canonical direct
predecessors—bare wave names are invalid. Each entry binds the persisted return
file hash, its internal JCS return hash, canonical wave-contract hash, every
pinned repository's strong state digest, and the predecessor's inspected
corpus epoch when one exists. The central edge policy is expanded over the
static DAG in producer-to-consumer orientation. The producer's exact status
must belong to that edge's `allowed_statuses`; no static edge accepts
`REFUSED`, `BLOCKED`, or `NOT_CLEAN`.

In default mode the root validator walks the complete content-addressed return
closure, rejects cycles or two identities for one wave, and historical-replays
each unique descendant exactly once. Only the root is checked against and
executed in the live checkout, and it is completion-eligible only when its
status is in that wave's exact advancing outcome vector. A same-repository
ancestor at an older commit is therefore valid; an unavailable commit, dirty
certificate, failed worktree materialization, or receipt for a command that the
materialized commit never successfully executed is fatal. Diamond ancestry
does not multiply work or weaken proof. Missing, fabricated, wrong-status,
stale, indirect, or extra predecessor records fail closed.

`--immutable-authority` returns the exact sorted node and producer-to-consumer
edge vectors, their self-hash, and the count proving one historical validation
per unique descendant in addition to the root replay. Every node binds canonical
regular non-symlink path, file SHA-256, return self-hash, wave-contract hash,
wave and status. Identity uniqueness is composition-local: one composer merges
all of its relevant closures by wave and rejects conflicting histories,
including histories shared only through a diamond or different owner returns;
independent compositions do not create a process-global identity registry.
Normal Value and Keyframes composers require the root wave's exact advancing
status. `REFUSED` may be consumed only by the specialized C08/C09
reopening-supersession policy and never supplies static-edge green. The root
return path is subject to the same absolute canonical-regular-file law in every
mode.

## API contract
- operations added/changed/removed:
- `api_source_sha256`:
- `api_return_coverage_sha256`:
- exact `owned_http_operation_ids`:
- exact `owned_headless_operation_ids`:
- exact `audited_http_operation_ids`:
- exact `audited_headless_operation_ids`:
- `API-OPERATIONS.md` operation IDs/methods/paths preserved exactly; no invented route:
- validators/OpenAPI/client parity:
- authority/precondition/cache/CORS/audit/lifecycle vector parity:
- ordinary JSON envelope versus declared raw-media representation parity:
- deliberately headless operation parity; no worker/cron/bootstrap HTTP callback:
- ETag/CAS/idempotency evidence:
- authorization/privacy evidence:
- migration evidence:

## Visual π/DELTA
| Route/state | Viewport/theme | π | DELTA | Semantic/input evidence |
|---|---|---|---|---|

## Performance
- environment:
- corpus/workload:
- warmup/samples:
- latency/throughput:
- allocations/memory:
- bundle/frame/energy evidence:
- adopted or rejected optimization:

## Limits and hidden context
- limits manifest and digest:
- at-limit result:
- +1 typed `resource_limit` result:
- deterministic work counters:
- child-process time/memory result:
- poisoned `document`/`getComputedStyle`/`matchMedia`/`fetch` result:

## Consumers
- direct consumers tested:
- peer consumers tested:
- transitive consumers tested:
- casualties:
- migrations:
- packed-tarball evidence:

## Terminal disposition
- kept capability and why:
- pruned capability and casualty:
- deletion decision projections as exact `{decision_id, decision_hash,
  file_effects:{deleted:[{repository,path}],modified:[{repository,path}]}}`
  rows; the content-addressed deletion annex owns the intrinsic-job,
  replacement, casualty, tombstone and zero-residue proof:
- explicit refusals:
- no alias/shim/dual path confirmation:
- standards compatibility rows and provenance:

## Standards operation vector
| Feature key | Parse | Type | Evaluate | Resolve | Adapt | Exact | Edit | Canonical | Maturity / interop |
|---|---|---|---|---|---|---|---|---|---|

## Routed remainder
| Finding | Owning wave/handoff | Blocking? |
|---|---|---|

## Implementation challenge
- typed `annexes.implementation-challenge` binding, or exact typed
  inapplicability for an audit, `BLOCKED`, or `NOT_CLEAN` return:

## Parser annex (P00–P07 only)
- exact parser scope class for the returning wave:
- complete projection of the P00-validated published
  `@mkbabb/parse-that@1.0.0` registry tarball, archive inventory, declarations,
  export conditions, no-link install tree and internal receipt hash:
- exact coordinate-domain vector (`original-utf16`, `processed-utf16`,
  `utf8-byte`, `grammar-byte`):
- parser invocation count and unique exercised route vector:
- P00 package-control receipt SHA-256 and byte-canonical external-handoff
  evidence SHA-256:
- sorted blocker rows, each with `not-reproduced`, `external-routed`, or
  `blocks-adoption`, active-campaign ownership, and one exact evidence hash:

## Verdict
One falsifiable sentence stating what is now true.
```

Every routed-remainder row has exactly one terminal disposition. `banked`
requires a non-empty named `retrigger`; every other disposition forbids that
member. A retrigger cannot be attached to `folded` or `retired` as a
second path.

Every P00–P07 return carries `annexes.parser`; no other wave may carry it. The
scope classes are fixed respectively to `baseline`, `prototype`,
`necessity-adjudication`, `banked-proposal`, `published-control`,
`control-crater`, `consumer-crater`, and `acceptance`. P00, P01, P05, P06 and
P07 must report at least one real parser invocation and one exercised route;
zero is not an audit substitute. The package member is not a caller-authored
summary: the validator loads and, in live mode, revalidates the exact
`vnext-parse-that-package-receipt/1` evidence file, then requires a complete
field-for-field projection of its registry identity, tarball and archive
digests, file count, installed-tree digest and receipt self-hash. Each blocker
hash binds exactly one annex evidence row. P07 cannot return terminal
acceptance while any blocker remains `blocks-adoption`. The only legal branch
is `unchanged-1.0.0-no-republish`; no parser annex can mint a candidate.

## API return coverage law

Every A-wave return and the C03/C06/C10 returns keep `api_contract`
applicable, including rows whose exact owned and audited sets are both empty.
[`API-RETURN-COVERAGE.json`](API-RETURN-COVERAGE.json) separately records each
wave's source-derived owned HTTP/headless vectors and mission-derived audited
HTTP/headless vectors. The return carries those four arrays without folding
them together; every array is exact, sorted, duplicate-free and disjoint from
the other role in its transport class. `api_source_sha256` binds the physical
`api-contract.source.json` bytes and `api_return_coverage_sha256` binds the
coverage manifest's RFC 8785/JCS self-hash. The universal validator executes
the coverage validator and independently checks all four vectors; zero IDs
cannot conceal a nonempty owner or audit obligation.

A00/A01/A26/C06/C10 bind all 147 operations, A03/A06 bind all 96 value
operations, A21R/C03 bind all 51 Fourier operations, and A20/A23C bind their
complete 89/41 HTTP generator unions without claiming headless work.

## Status laws

- A root is advancing only when its status occurs in that wave's exact
  `outcome_policy.advancing_statuses`; `COMPLETE` on a disposition wave and
  `KEEP`/`PRUNE` on a completion wave are invalid even when every gate passes.
- `COMPLETE` means every required deliverable and gate is satisfied.
- `KEEP` and `PRUNE` are allowed only by their central outcome class. `PRUNE`
  requires at least one validated deletion decision; a modified-only effect is
  sufficient and must not fabricate a physical deleted path.
- `REFUSED` names the missing capability/context in at least one unique typed
  refusal row. Every row sets `no_fallback:true` and binds content-addressed
  evidence that appears exactly once in the return evidence inputs. It is
  terminal historical evidence but never an advancing root or static dependency
  green; default validation emits `completion_eligible:false`.
- `BLOCKED` names one exact external condition; difficulty or incomplete work is not blockage.
- `NOT_CLEAN` is audit-only, names at least one reopened owner in the closure
  annex and never counts as dependency green.
- “Mostly complete,” “routine remainder” and unowned follow-up are invalid.

## Evidence laws

- A green test without a reproduced born-RED witness does not prove a repair.
- A screenshot does not prove semantics or interaction.
- A benchmark names hardware, engine, corpus, warmup and sample distribution.
- An allocation claim names the measured boundary.
- A packed-surface claim uses a tarball install, not a workspace link.
- A consumer claim uses pinned source and runtime/type evidence.
- A consumer claim covers direct, peer and transitive classes or records why a
  class is not applicable; a workspace link is never packed evidence.
- A conformance claim distinguishes passed, preserved unknown, delegated and refused.
- An unsupported or experimental browser row is evidence, never a skipped green.
- A limit is frozen in the owning implementation wave; closure may repeat it
  but cannot invent or weaken it.
- A source-fidelity claim distinguishes original, edit-preserving and canonical serializers.

## Final-state implementation challenge

Every terminal implementation return (`COMPLETE`, `KEEP`, `PRUNE` or
`REFUSED`) binds one applicable `vnext-implementation-challenge/1` annex. It is
one compact final-state triad, not two triads and not a second proof gate:

1. `critic_a` and `critic_b` are distinct fresh single-turn
   `gpt-5.6-sol`/`ultra` content-attested transcripts. Each assumes the wave is
   wrong, cannot read the sibling session ID or session/report path, hash or
   decoded report content, and independently challenges all three exact axes:
   `tranche_fit_optimality`, `wave_contract_adherence_friction`, and
   `feature_behavior`.
2. A third distinct content-attested adjudicator transcript declares
   `gpt-5.6-sol`/`ultra`, starts only after both critics complete, reads their
   reports in A-then-B hash order, and adjudicates rather than votes.
3. All three reports are byte-identical to the actors' terminal authored
   messages. Session JSONLs and reports are canonical content-addressed files,
   pairwise distinct, and live outside every pinned repository so the evidence
   cannot enter the implementation-state hash it attests.

The validator reconstructs each critic's complete canonical pre-gate input from
the wave ID/contract, the semantic-subject hash (status, delivery, terminal
disposition, routed remainder, verdict and every typed annex other than the
challenge), producer-to-consumer dependency closure, direct return bindings,
pin/state projection, receipt-free gate contract, role, all three axes and every
axis evidence object. The session contains exactly one user `input_text` block;
the terminal message contains exactly one `output_text` block and ends in the
exact full-input attestation. Session and report bytes match their declared
hashes. An attestation token
without substantive terminal analysis is rejected. The adjudicator input
additionally embeds both exact report paths, hashes and contents in A-then-B
order.

The annex binds the exact current wave-contract hash and the sorted complete
`repositoryStateSha256` projection of every return pin. Every axis evidence
file is rehashed. Both critics must be
`clean`, the adjudicator must be `ratified`, every mandatory axis carries
evidence, and all unresolved-finding arrays are empty. No future receipt path or
hash appears in a pre-gate prompt. The triad finishes first; the canonical
acceptance receipt starts afterward and seals the exact aggregate challenge
hash. A finding reopens its
exact owner. Mutation of the reviewed wave's owned state or evidence before
sealing, tamper with its sealed epoch, or drift of the current live root
invalidates the state join and requires a wholly fresh triad. Unrelated
downstream mutation does not erase `closed_at(epoch)`; a changed relied-on
invariant reopens through impact and owner routing. A routed finding remains in
`routed_remainder`; it cannot be hidden as review prose.

Audit waves and `BLOCKED`/`NOT_CLEAN` attempts carry exact typed
`not_applicable`. C08 and C09 remain the two additional fresh whole-corpus
execution-closure passes; neither is credited as a per-wave implementation
challenge. The universal validator checks the annex while recursively checking
dependency returns, so the law propagates to C05, C08, C09 and C10 without a
second registry, wave or gate.

The local contract proves only the supplied transcript content, internal
chronology, cardinality and joins. It does not cryptographically prove that the
provider session existed, was freshly spawned, used the declared model/effort,
or prevented out-of-band sibling access; those properties require a trusted
Codex session-store/export plus provider attestation and are an explicit
external trust boundary. The execution coordinator must retain those trusted
records operationally, but this content validator cannot manufacture their
authority. Formation prose must not upgrade content-attested files into
provider-authenticated existence, freshness, independence, model, or effort.

## Consumer-universe receipt

C00U additionally returns the exact output of
`tools/resolve-consumer-universe.mjs --input <universe> --output <receipt>`.
The input conforms to `consumer-universe.schema.json`; the output conforms to
`consumer-universe-receipt.schema.json` and is serialized as RFC 8785/JCS plus
one newline. Its `receipt_hash` is SHA-256 of the JCS object with that member
omitted. The receipt binds the physical input hash, semantic input self-hash,
schema hash, resolver hash and canonical 190-wave registry hash. Receipt
validation proves the complete input-to-output projection before any live
resolver replay: every input root projects exactly one receipt root with the
same identity and disposition semantics; every input edge projects exactly one
receipt edge with the same semantic fields and complete occurrence-evidence
coverage; root, edge and disposition counts are derived from the input; and
the observed-root and observed-edge epoch hashes are recomputed from those
exact projections. Rehashing a partial, added or otherwise divergent receipt
cannot make it valid.

Every consumer-universe return annex and every deletion-judgment
`consumer_scan` binds the authority as one clean-break object:

```json
{"bounds_authority":{"path":"/absolute/logical/path","file_sha256":"<sha256>","manifest_hash":"<sha256>"}}
```

The sibling `bounds_sha256` remains the semantic-bounds digest. There is no
scalar alias. Default live validation and plain `--offline` require the exact
canonical `CONSUMER-UNIVERSE-BOUNDS.json` logical path and current bytes; plain
offline validation materializes no historical epoch and therefore cannot
relocate authority. Only `--historical-certificate` and
`--immutable-authority` may verify an alternate authority. Its logical path
must be lexically contained by exactly one clean return pin, and the safe
relative path in that pin's materialized commit must be one tracked regular
non-symlink file whose bytes, self `manifest_hash`, semantic `bounds_sha256`,
fifteen required real-Git IDs, six typed repository-subdirectory identities,
package/target/kind scope and quarantine exclusions equal the binding and
canonical law. Historical verification reads the materialized
file but projects the original logical binding; a zero-pin or duplicate-pin
match, untracked file, symlink, mutable-checkout-only file or byte/hash drift is
RED.

Exit zero and all of the following are required for a dependency green:

- `resolvable` is `true` and `blockers` is empty;
- every included root has one existing-wave owner;
- every discovered edge has one existing-wave owner and a known internal root
  or explicit `external:<package>` target;
- every excluded root/edge has evidence and a reason;
- no root ID, edge ID or canonical realpath is duplicated.

The semantic bounds carry both `required_roots` and `required_paths`, so the
receipt epoch hash binds the consumer floor rather than relying on prose.
Required roots may be included or explicitly unavailable with a blocking
retrigger, but never excluded. Every available `repository-subdirectory` must
exist, resolve to its declared canonical path, and remain strictly inside its
named required Git root.

A valid unavailable root or edge must carry evidence and an existing-wave
retrigger. The resolver writes its audit receipt, sets `resolvable:false`, and
exits 2. C05 reruns the resolver against its current census and may consume
only a fresh exit-zero receipt; copying or editing C00U's earlier receipt is
not evidence.

## V29T total transpose join

V00A emits one self-hashed `vnext-value-current-inventory/1` containing every
pinned working source node, external test node and public export node. Its
repository is the exact canonical Git root, its source and test censuses are
the live code-bearing filesystem closures after applying only D00A's exact
typed test exclusions, and its exports are an AST census of the packed package
map. The artifact binds an immutable byte snapshot of that whole closure. V00A
returns both a live `capture` receipt and a snapshot-only `replay` receipt; the
default universal validator reruns both and `--offline` reruns replay only.
Changing the live checkout after capture therefore cannot change historical
inventory truth, while changing a frozen byte or a persisted receipt is fatal.

V29T cannot close from a target tree alone. It returns
`test/proof/v29t/current-target-disposition.json` as
`vnext-value-target-transpose/1`: every V00A node appears exactly once with a
terminal `keep`, `move`, `fold`, or `delete` disposition, current digest,
owner-wave decision and self-hashed terminal return. A terminal `PRUNE` owner
may project only deletes; a terminal `KEEP` owner may not project a delete.
Every final target with no current origin has one explicit `introduce` owner.
A fold names a separately primary-owned target; it cannot create one
implicitly. Every row's owner must be in V29T's transitive predecessor closure,
and all rows for one owner reuse one exact universally validated return. The
typed disposition annex of each owner equals its complete ledger projection:
there are no unused, missing, mixed-return or invented decisions. V29T itself
is never a semantic owner.

The four conditional source/test pairs have one exact
`vnext-value-target-resolutions/1` row each. Their V16B, V18H, V18V and V24
KEEP/PRUNE results are exact projections of those owners' same typed returns;
there is no default branch. The final target validator is invoked exactly as:

```text
node tools/validate-target-paths.mjs --value-manifest <ledger.target_paths.path> --value-root <ledger.value_root.path> --css-manifest <ledger.css_execution_manifest.path> --conditional-resolutions <ledger.conditional_resolutions.path> --final
```

`tools/validate-value-target-transpose.mjs` joins that ledger to the final
exact-topology `VALUE-TARGET-PATHS.json`, the exact execution CSS manifest, the
conditional-resolution artifact and typed `value-public-surface.json`. The
public gate performs a fresh non-link `npm install` of the exact packed
tarball, bounds and checks every TypeScript and Node probe, rejects source or
workspace imports, and proves the six public keys. Its three root,
`./quantize` and `./value` tombstones are exact V00C typed decisions, not prose
or a locally forged return. The composer rejects a missing or duplicated
current node, invented or ownerless target, wrong-kind edge, orphan fold,
conditional final path, stale owner return, result-vector drift or package
tombstone drift.

Physical delivery remains separate from semantic ownership. The executable
Git truth receipt's before head and branch equal V00A's historical epoch, its
after state equals the final transpose repository state, and its deleted,
added and modified vectors are bound exactly once by ledger effect groups.
Every non-keep semantic decision has an effect, every effect names an existing
semantic decision, and no path or decision can be multiply bound. V29T may
carry the physical move/delete delivery through its deletion-judgment annex,
but it may not re-own an upstream semantic PRUNE. Thus the total
current-to-final join prevents silent drops and invented targets, while the
deletion annex separately proves intrinsic worth, casualties and physical
truth.

Historical-certificate or immutable-authority V29T validation never trusts a newly rehashed
composition receipt. It materializes the deletion-truth receipt's immutable
`after_head` in a detached temporary worktree, requires every tracked path,
mode, byte count and SHA-256 to equal the persisted after snapshot, and reruns
the complete transpose composition there. The replay's semantic projection
must equal the persisted live receipt, and every merged owner-authorization
identity must occur exactly in V29T's own dependency-return closure, including
the V00A inventory and V00C public-surface histories. This historical replay
is always non-completing. Default live validation remains a distinct current
checkout proof and rejects drift after the authority epoch.

## Keyframes inventory, transpose and package contracts

K00 and M00 return an exact current inventory plus two receipts under
`annexes.keyframes-current-inventory`. Capture proves that the inventory's
repository path is the real Git top level and that the content-addressed
snapshot contains every and only the package manifest, source, external test,
typed support and public-export backing bytes. Replay reconstructs the same
nodes and runtime/type graphs from that snapshot without reading the old
checkout. The annex binds `inventory`, `capture_receipt` and `replay_receipt`
by path, file SHA-256 and self-hash; a later mutable checkout is not authority.

K22T and M10T return `annexes.keyframes-target-transpose`. Its ledger gives
every non-export current node exactly one `keep`, `move`, `fold` or `delete`
decision and gives every genuinely new final node one introduced owner. A
terminal owner must be a strict transitive same-band ancestor in the canonical
wave DAG; local decisions must name the transpose wave itself. Folds require a
separate primary target owner, and deletes remain owned by the upstream
terminal decision that supplied the deletion judgment.

The annex also binds a physical receipt and exact `delivery` projection. The
receipt joins immutable current-snapshot bytes to the final Git state, binds
one executable deletion-delta receipt through `git_truth`, records every
removed move/fold/delete path and every in-place replacement, and gives every
introduced target an explicit `materialize` effect. A move, fold or delete old
coordinate may not occur anywhere in the final tree, even with different
bytes. The full effect projection equals `delivery.removed_paths` and
`delivery.replaced_paths`; the effects physically owned by K22T or M10T equal
the bound Git receipt's deleted, added and modified vectors exactly.

The universal return requires that same `git_truth` binding exactly once in
the wave's required `owner-precut` deletion annex and requires its
consumer-universe root to be the ledger's final repository. K22T or M10T owns
move, fold, introduction and replacement effects; an upstream prune remains
physically owned by its terminal ancestor and is not copied into the transpose
wave's owner-precut receipt. Final source, external-test and typed-support
trees are exact, both graphs have zero SCCs, every derived test runtime-imports
its one mirrored source and exercises the exact imported lexical binding. A
local/parameter shadow of a source, `node:assert`, or `node:test` binding is
invalid, and a call/new result derives from its callee or receiver rather than
an otherwise ignored argument. The canonical bounded wave test command is
freshly executed by canonical `process.execPath` with no shell or package
manager, so `.npmrc` and `script-shell` cannot replace it. The return's persisted
validation receipt must equal a fresh composed validation.

K23 separately owns the packed public boundary. Its package contract proves
the exact `@mkbabb/keyframes.js@7.0.0` archive, `.` light and `./engine` heavy
exports by symbol, declaration/runtime graphs and closures, zero SCCs, and no
root reachability into the engine closure. Every validation creates a fresh
offline npm crater, disables lifecycle scripts and workspace links, installs
the exact Keyframes and value.js tarballs, and executes both runtime and
NodeNext type probes. K22T owns source topology; K23 owns this package/export
truth.

## Deletion-judgment chain

Every return with a physical deleted path, a logical removal implemented by a
modified file, or status `PRUNE` binds exactly one
`vnext-deletion-judgment-return-annex/1` under
`annexes.deletion-judgment`. C05 and C10 always bind one. The binding names the
wave, phase, canonical JCS annex path, file SHA-256 and annex self-hash. The
annex conforms to [`deletion-judgment.schema.json`](deletion-judgment.schema.json);
[`tools/deletion-judgment.mjs`](tools/deletion-judgment.mjs) validates it and
recursively runs every bound ancestor through the universal return validator.

The known unconditional owner registry is exact: V00B, V29T; K02, K14, K15,
K18, K19, K20, K21, K22, K22T, K23; A03, A07T, A18, A22S, A23C; G07, D00;
M00, M06, M10T, C03P and C03.
The universal validator requires `owner-precut` for these waves even if a
return attempts to omit its deletion projection. Conditional V15, V15P, V16B,
V18H, V18V and V24 branches enter the same chain whenever they actually delete
or return `PRUNE`. A transpose annex owns only its own `replaced` old paths; it
must not copy or re-own an upstream facility decision.

The physical layer is not a prose deletion list. Each repository cut emits
clean before/after Git snapshots and a JCS
[`deletion-delta-receipt.schema.json`](deletion-delta-receipt.schema.json)
receipt through [`tools/deletion-truth.mjs`](tools/deletion-truth.mjs). Several
receipts may share one repository root. Their key is owner wave, root and
receipt hash; their physical deleted-path and modified-path unions each biject
exactly to the owning decisions and are non-overlapping within their kind.
A receipt with no deleted path is valid when it proves a relevant modified
file. Only physical deletes project into `delivery.deleted_paths`; both kinds
project into the owning decision's `file_effects`.

Each decision records its intrinsic job, `replaced` or `retired` judgment,
typed replacement, every included consumer root and migrated casualty, one
exact by-name tombstone hit, canonical archive hits, and zero live hits across
the bounded universe. Active source/runtime/declaration/manifest/current-doc
hits fail. The six zero-residue categories remain explicit. Tombstones and
historical `docs/tranches/` evidence are allowed only as exact classified
hits; quarantine and generated-directory exclusions are applied before any
read.

The phases are monotone:

1. An owner wave emits `owner-precut`, binds its fresh consumer receipt and
   owns every decision and truth receipt in that annex.
2. C05 emits `c05-rehearsal`, derives the exact deletion-owner set by walking
   its content-addressed transitive return graph, copies every owner decision
   and repeated-root receipt, and re-executes casualty scans under its own
   frozen C05 census. An omitted owner is RED.
3. C10 emits `c10-final`, binds the exact C05 return and deletion-annex hash,
   keeps truth receipts, delivery union, disposition rows, ancestor returns and
   decisions byte-identical to C05, reruns the bounded census, and requires an
   empty C05→C10 root/edge semantic delta. It adds only the release
   removed-surface projection. A C10-authored decision or delivery deletion is
   synthetic and forbidden.

Historical deletion validation recursively invokes every bound return with
`--historical-certificate` and reuses the same pin-worktree cache that maps its
consumer bounds authority. Plain offline recursion remains `--offline`; it
cannot be substituted for historical replay and cannot authorize an alternate
authority.

`delivery.deleted_paths`, `terminal_disposition.deletions`, and C10
`annexes.release.removed_surfaces` are machine projections of the validated
annex, never parallel judgment ledgers. Every affected repository is pinned by
the return. `tools/selftest-deletion-truth.mjs`,
`tools/selftest-deletion-judgment.mjs`, and `tools/selftest-contracts.mjs`
exercise the physical, three-phase and universal joins respectively.

## Visual return

Every visual change returns:

- exact route and state;
- viewport;
- theme;
- reduced-motion status;
- before and after captures;
- target geometry;
- role/name/focus evidence;
- pointer/touch/keyboard evidence;
- overflow and scroll-owner evidence;
- performance evidence for animated/rendered changes.

## Audit return

Audit waves return:

- registry count;
- pins;
- exact inspected rows;
- new mechanisms;
- duplicate/omitted ownership;
- concealed implementation found in closure;
- clean/not-clean verdict.

C08/C09 additionally return `annexes.closure` with:

- `attempt`: positive integer;
- `verdict`: exactly `clean` or `not_clean`;
- `inspected_corpus_sha256`: the SHA-256 of one persisted frozen-corpus epoch
  manifest, present exactly once among the return's verified `evidence_inputs`;
- `reopened_owners`: sorted unique IDs found by this attempt;
- `resolved_reopenings`: the cumulative sorted `{wave_id, owner_return_hash}`
  receipts since the counter last reset.

`NOT_CLEAN` requires nonempty `reopened_owners`. C08 persists its complete
counter epoch in a sealed append-only attempt directory: filenames are
`C08-attempt-NNN.return.json`, attempts are unique and contiguous from one, all
non-latest attempts are `NOT_CLEAN`/`not_clean`, and the unique latest attempt
is `COMPLETE`/`clean` with zero current reopenings. Its final
`resolved_reopenings` contains every owner named by an earlier attempt exactly
once with the owner's current terminal (`COMPLETE`, `KEEP`, `PRUNE` or
`REFUSED`) canonical return hash.

C09 has exactly one static dependency, `C08`; its
`scope.dependency_returns` contains exactly C08's terminal content-addressed
return and does not acquire synthetic graph edges. Before
scheduling, run:

```sh
node tools/resolve-reopenings.mjs \
  --c08-returns /absolute/sealed/c08-attempts \
  --owner-returns /absolute/sealed/current-owner-returns \
  --output /absolute/receipts/C09-resolved-dependencies.json
```

The owner directory contains exactly one canonical `<wave>.return.json` for
each cumulative C08 owner and no extras. The resolver replays every sealed C08
attempt through `validate-return.mjs --historical-certificate`, validates every
repair-owner supersession through `--immutable-authority`, applies the central
`owner-advancing-plus-refused` supersession policy, then reruns the unique
latest C08 attempt in default live-pin mode. It rejects missing, duplicate, stale,
mismatched or nonterminal owners, rechecks the persisted corpus epoch, and
writes a non-overwriting, sorted JCS
`vnext-resolved-reopenings/1` receipt with a self-hash. Its
`resolved_dependencies` is exactly the sorted union of `C08` and the resolved
owner IDs; `c08.latest_validation` is exactly `live-pin-at-scheduling`. This
is scheduling evidence, not a mutation of the canonical wave DAG.

C09 binds that file exactly once in `evidence_inputs` and in
`annexes.closure.resolved_dependency_receipt` as `{path, sha256,
receipt_hash}`. Its `inspected_corpus_sha256` and exact sorted
`resolved_reopenings` must equal the receipt. `validate-return.mjs` reopens both
sealed ledgers, repeats the same historical-certificate/immutable-authority
split and regenerates the
receipt, so any post-scheduling file, hash, owner-set or corpus-epoch drift
fails closed. It does not compare C08's historical pins to the post-C09 live
worktree: C09's own evidence changes that state after the scheduling-time live
check.

Audit waves do not repair source. A finding reopens its owner.

## Release return

C10 additionally returns:

- exact sequence `parse-that → value → keyframes → glass-ui → value-api →
  fourier-api → consumers → smoke → promote → remove-temp-tag`;
- parse-that branch, exact version and truthful publication flag;
- value 5.0.0, keyframes 7.0.0 and Glass 8.0.0 registry integrity, tarball
  SHA-512, manifest hash, exact peer-dependency vector and evidence, exactly
  once each; Glass requires optional value `^5.0.0`, optional keyframes
  `^7.0.0`, Vue `^3.5.0`, Tailwind `^4.0.0`, and no Reka/tw-animate/CVA/
  tailwind-merge peer;
- both API migration IDs, before/after schema hashes, applied result, rollback
  ID and evidence;
- the exact five-field `{decision_id, decision_hash, owner_wave, surface,
  tombstone}` projection from the content-addressed C05-origin C10 deletion
  annex, with no C10-authored judgment or delivery deletion;
- every included consumer root with branch, production HEAD, lock hash,
  deployed versions and evidence;
- deployment smoke evidence, removed temporary tag, and a proved rollback
  boundary/procedure;
- `unresolved_waves: []` and `new_contracts_only: true`.

These fields live in the typed `annexes.release` object defined by
`return.schema.json`; prose or an arbitrary annex cannot substitute.

# Constellation frontend pre-execution source contract v3 — 2026-08-03

Status: `PRE_HOSTILE_SOURCE_CONTRACT / ZERO_AUTHORITY`

Mode: tranche development only

Execution and credit: 0

## Outcome

V3 is a standalone source contract. V1 and v2 remain terminal RED archaeology.
V3 preserves v2's noncircular seal, typed schemas, dual discovery, topology
roots, joint applicability, expanded state vocabulary, D1/D2 separation,
experience products, platform/performance separation, and source controls. It
adds the missing trust root: a root-issued, checksum-bound authorization and a
separate capture-controller packet that exist before the writer begins.

The machine declaration is
[`CONSTELLATION-FRONTEND-PREEXECUTION-SOURCE-CONTRACT-V3-2026-08-03.json`](CONSTELLATION-FRONTEND-PREEXECUTION-SOURCE-CONTRACT-V3-2026-08-03.json).

V3 itself is not yet accepted. Two fresh hostile reviews and a later owner
adjudication remain mandatory.

## 1. Canonical root authorization

An authorization is evidence only when all of the following predate the first
writer byte:

1. it lives at a canonical coordination path;
2. the current root checksum packet covers it;
3. a one-way coordinator receipt binds that checksum coordinate;
4. it identifies the root-owner issuer lineage;
5. it pins this contract, later contract adjudication, writer root, capture
   packet, expected membership, axis and state domains, control registry,
   schemas, programs, runtime controller and invocation, terminal-tuple
   schema, and zero-credit stop.

The packet contains a byte-identical copy, while the validator makes one
allowlisted read of the canonical authorization and its root checksum
coordinate. Location alone is not provenance. A writer-authored file outside
its own root cannot satisfy this gate.

## 2. External multi-repository capture

Before packet construction, a different capture author freezes the complete
authorized repository universe. The capture receipt binds controller source,
runtime, argv, cwd, environment, raw stream artifacts, and zero repository
writes. For every primary or peer root it binds repository role, HEAD, actual
Git tree/object membership, raw porcelain, snapshot file/tree/count/bytes,
and peer receipt.

The universe can contain a primary repo, visual dependencies, runtime
packages, reverse consumers, and fixture providers. Cross-repository causal
edges require the corresponding peer snapshots. The packet's snapshot bytes
must equal the external capture exactly.

There are no blanket exclusions. `dist`, `build`, `node_modules`, installed
package roots, generated files, or packed runtime bytes may be excluded only
with an externally authorized, source-witnessed runtime-irrelevance record.
Dirty tracked and untracked source remains in scope.

## 3. Trust joins and noncircular seal

`PACKET.json` has no free owner assertions: every field exact-joins the root
authorization or capture receipt. The 36-file inner payload is checksummed
without hashing its checksum, then frozen by `INNER-SEAL.json`.

After freeze, the validator may read only exact allowlisted canonical trust
files. It writes nothing inside the inner root. Raw stdin, stdout, and stderr
are retained as separate outer files. The process receipt binds those bytes,
the runtime controller/invocation, every allowlisted external read, every
control receipt, and equal before/after inner tree identities.

The outer checksum covers the complete inner packet plus raw streams and
process receipt, excluding itself and the outer seal. A root-issued terminal
tuple under an externally pinned schema then binds authorization, capture,
both seals, process receipt, final tree/count/bytes, and owner stop.

## 4. Full source and dependency closure

Primary and independent discovery programs, written by different authors,
consume the same captured universe. Both are externally pinned. They derive
routes, exports, imports, styles, tokens, copy, assets, reverse consumers,
mounts, dynamic candidates, Teleports/portals, aliases, API/storage/auth
dependencies, fixtures, and fallbacks.

Their roots must equal the externally captured expected-membership root, or
the difference remains explicit `OPEN_RED`. Every relevant captured member is
joined or RED. Source claims use exact byte spans whose slice hash and syntax
role are rederived; line numbers are informational only.

Topology has authenticated roots and nodes, joined edges, root-to-leaf
reachability, reverse-consumer/transitive closure, dynamic callsite groups,
Teleport ownership, and source-witnessed alias equivalence.

## 5. Closed denominator

The root authorization pins both axis and state domains. The 12 Kronecker
axes have typed, ordered members. Applicability uses complete tuples and a
typed joint-predicate AST; unary labels cannot replace it. Every tuple is
required, authenticated `N/A`, or explicit RED.

Every subject also has one disposition for each state kind: initial, idle,
hover, focus, pressed, selected, active, inactive, disabled, read-only,
interacting, loading, empty, success, error, recovery, offline, and permission
denied. Each required disposition has exactly one state case; each `N/A` has a
causal witness.

## 6. Surface and state meaning

Every surface records title/H1, role, props, events, slots, variants, defaults,
direct and transitive consumers, mount state, copy, accessibility, Admin/
debug/error applicability, and exact source spans.

A state case binds subject, state, applicability tuple, platform profile,
predicate, fixture, typed preconditions, ordered actions, and
before/0/120/420/settled/interruption/rollback timepoints. It has exactly one
typed product—or a witnessed `N/A`—for each of UI, UX, responsive, functional,
copy, focus, scroll, storage, network, accessibility, geometry, motion,
performance, and residue.

## 7. Subject-grounded D1 and independent D2

Each subject belongs to exactly one D1. `memberSubjectIds` and subject deltas
are an exact bijection. The externally pinned semantic projection excludes
IDs and requires a nontrivial typed delta: audience, job, protagonist, primary
action, world artifacts, end-user vocabulary, signature, deliberate risk,
and source spans. Identical semantic hashes require an authenticated design
equivalence witness.

Every subject has exactly one D2 with a subject foreign key. Its author, task,
and immutable root differ from D1, and the author-lineage trust root is
external. D2 shares no answer key. Findings exact-bind evidence and end in
`KEEP`, `FOLD`, `MOVE`, `SPLIT`, or `PRUNE` with owner and receiver.

Separate UI, UX, responsive, functional, copy, accessibility, motion,
geometry, performance, and residue oracles bind author lineage and input
domain. The candidate generator cannot be its own only oracle.

## 8. Exact cell joins and later platform law

For every cell, subject and tuple equal the referenced applicability and state
case; the state case points back to the same applicability ID; platform
profile matches the platform axis; all 14 expectation products are present or
witnessed `N/A`. Cell IDs rederive from subject plus all 12 axes. Equivalence
never pre-banks execution.

Platform profiles separately represent real iOS Simulator Mobile Safari and
installed desktop Safari. At source stage their runtime binding is pending.
Later receipts bind origin, Xcode/runtime/device/UDID or macOS/Safari/hardware/
GPU/display, automation executable and command, and raw evidence. Emulation
cannot satisfy Safari.

Performance budgets precede observation and include threshold, unit,
percentile, fixture, platform, measurement window, cold/warm state, sustained
duration, pre-run freeze, and source rationale.

## 9. Externally denominated controls

The root authorization pins the validator leaf set, finding set, owner map,
control set, full owner/non-owner retention matrix, refusal controls, and
counts. The packet's controls exact-equal that registry; expected leaves are
derived, not caller supplied.

The same production validator runs baseline and mutants for omission,
insertion, reorder, byte replacement, topology/reverse-consumer deletion,
alias split/merge, false `N/A`, templated D1, coherent omission/reseal, and
unknown/duplicate/reordered suppression. All controls run before source
acceptance and retain raw process evidence.

## 10. Fatal order and boundary

The fatal order is:

1. root issuer, contract, capture, runtime, schemas, and denominators;
2. external capture and inner snapshot byte equality;
3. dual discovery, expected membership, and peer universe;
4. identifiers, aliases, and topology roots;
5. reverse consumers, mounts, and causal closure;
6. axis/state domains, joint applicability, and `N/A` witnesses;
7. D1 delta bijection, D2 subject lineage, and oracle trust;
8. cell/state/expectation/platform/performance joins;
9. externally denominated production source controls;
10. zero-credit root-issued terminal stop.

Passing v3 would accept only this common source-contract law. It would not
authorize a repository packet. Native owner inputs remain `0/4`; the parser
receiver remains `0/1 PAUSED`; strict root policy remains `0/5`. Candidate,
real-platform execution, product mutation, package/release, rebind, owner-slot
admission, and all credit remain forbidden.

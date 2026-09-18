# Constellation frontend pre-execution source contract v4 — 2026-08-03

Status: `PRE_HOSTILE_SOURCE_CONTRACT / ZERO_AUTHORITY`

Mode: tranche development only

Execution and credit: 0

## Effective-law composition

V4 is a deterministic patch over exact v3 JSON `13e675de…`. Its machine file
lists every superseded top-level section, every retained section, and complete
replacement sections. Composition is replacement, never deep merge. Missing,
extra, duplicate, or reordered operations are fatal. The effective hash is
computed before hostile review and recorded in the patch. Canonical effective
bytes hash to
`1e3af794c11107fa87ca2520e812f0057d827835ea416da892193136ef7c0169`.

V3 remains terminal RED at Markdown `e39cd8d1…`, JSON `13e675de…`, hostiles
`fe984339…` / `a48c4cf8…` / `3993f3aa…`, and owner adjudication `2c5202f0…`.

## Forward, signed trust DAG

V4 ends the authorization/checksum cycle with detached Ed25519 signatures and
a strictly forward chronology:

1. `T` — an independently pinned trust anchor containing root-owner,
   coordinator, and approved capture-author public keys plus exact owner,
   coordinator, and revocation-registry lineage pins;
2. `Q` — a root-signed capture ruling containing only upstream contract,
   universe-oracle, controller, roots, and absence pins;
3. `K` — a capture-author-signed capture packet and raw receipt;
4. `A` — a root-signed packet authorization binding `Q/K`, exact snapshot,
   domains, programs, controls, runtime invocation, writer lineage/root, and
   absence;
5. `C` — a later checksum covering `T/Q/K/A` and their signatures;
6. `R` — a later coordinator-signed acknowledgement binding `A/C`;
7. `D` — a later root-signed dispatch binding `A/C/R`, writer identity, root,
   and absence;
8. only then may the packet writer create its first byte.

No upstream artifact contains its own hash or any downstream hash. Every
signature is detached and verified against the trust anchor. Private keys
never enter the packet. The later terminal tuple is also root-signed and never
enters its own hash domain.

Provisioning those keys and authorizations is a later repository-packet owner
action; v4 merely defines the source law and does not create or use a key. The
later trust anchor binds the already-frozen v4 adjudication, never the reverse,
so accepting this common law does not require a not-yet-created key packet.

Every signed artifact has a distinct literal message domain, a fixed signer
role, canonical compact UTF-8 payload bytes, and a detached raw-64-byte
Ed25519 signature encoded as Base64 plus one LF.

## Independent capture and repository universe

The capture author differs from the packet writer by key, task, and root.
Capture includes sealed raw stdin/stdout/stderr and zero repository writes.
The capture ruling pins an independent repository-universe oracle. That
universe enumerates primary source, visual dependencies, runtime packages,
reverse consumers, and fixture providers. Every known dependency/consumer is
included or has an externally witnessed exclusion.

There are no blanket `dist`, `build`, installed-package, generated-file, or
`node_modules` exclusions. V3's full-byte snapshot, HEAD/Git-object/raw-status
joins, peer receipts, and dual discovery remain effective.

## Exact inner and outer membership

The inner payload now has 63 exact members, including the entire signed trust
chain, root/coordinator/capture/writer lineage and absence receipts, the
revocation registry, exact universe-oracle and capture-controller source,
capture raw streams, repository universe, state dispositions, design
equivalence, leaf extractor/results, runtime controller, and terminal tuple
schema. The inner checksum excludes itself; the inner seal binds its tree and
write order.

The outer packet retains raw validator streams, every control's raw streams in
`CONTROL-RESULTS.json`, and the process receipt. The outer checksum excludes
itself, outer seal, terminal tuple, and detached terminal signature. The
signed terminal tuple is issued after the outer seal and binds the complete
authorization chain, capture, effective contract, process/control evidence,
seals, final tree/count/bytes, and owner stop.

## State, expectation, and cell closure

State applicability is now a first-class record with `subjectId`,
`stateKind`, predicate, disposition, witnesses, and optional equivalence.
Every subject/state pair is required, authenticated `N/A`, or explicit RED.
Required states may have one or more axis-specific state cases.

Each of the 14 expectation kinds has its own disposition and causal witness.
Required products carry typed expected values and oracles; `N/A` and RED are
machine-representable.

Cell identity includes subject, all 12 axes, state disposition, state case,
and platform profile. It cannot collide when multiple states share an axis
tuple. Every required axis tuple by required state case by platform has
exactly one cell.

## D1/D2, equivalence, and controls

V3's one-D1 and one-independent-D2 per subject law remains. V4 adds exact
design-equivalence records for any identical semantic hash and a complete
author-lineage record schema. Candidate-generator lineage is a required
foreign key on packet and oracles.

An externally pinned leaf extractor derives validator leaves from exact
validator source. The control registry binds that extraction receipt, owner
map, complete non-owner matrix, refusals, and counts. Every registry control
has one sealed raw result; expected leaves are derived rather than supplied by
the caller.

## Fatal order

1. trust anchor, signatures, forward authorization DAG, dispatch;
2. captured repository universe and inner snapshot equality;
3. dual discovery and expected membership;
4. identifiers, aliases, and topology roots;
5. reverse consumers, mounts, and transitive closure;
6. axis/state domains, joint applicability, and state dispositions;
7. D1 delta/equivalence, D2 lineage, and oracle trust;
8. cells, expectations, platform/performance, and `N/A` joins;
9. extracted-leaf production controls;
10. signed terminal tuple and zero-credit owner stop.

## Boundary

V4 requires two fresh independent hostile reviews and owner adjudication. Even
if accepted, it would be only the common source-contract law. Trust-key
provisioning and every repository packet require separate owner rulings.
Native owner inputs remain `0/4`; parser receiver `0/1 PAUSED`; strict root
policy `0/5`. No Browser/Safari/API/Docker/product/package/release/rebind,
candidate, slot, or credit is authorized.

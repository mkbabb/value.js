# Authenticated pass-provenance reconciliation law — 2026-08-02

Status: `SOURCE_AUDIT_ACTIVE / ZERO_EXECUTION / ZERO_AUTHORITY`

Mode: tranche development only

## 1. Purpose

The historical convergence ledger compresses three-pass claims into prose.
Some of those claims point to real, owner-admitted formation packets; others
remain partial or were overtaken by later RED amendments. The ledger is useful
archaeology, but it is not a machine-auditable proof that every subject has
completed three full passes.

This law replaces pass counting—not the preserved evidence—with one closed
registry of exactly 60 cells:

```text
4 subjects × 3 passes × 5 required phases = 60 cells
```

Subjects are `value`, `parse-that`, `keyframes`, and `fourier`. Required phases
are `research`, `synthesis`, `prototype`, `critique`, and
`ownerAgglomeration`.

No parser, product, Browser, Safari, API, Docker, package, release, rebind, or
candidate execution is authorized by this law.

## 2. Predecessor boundary

This packet begins from a pre-reconciliation read-only snapshot:

| Object | SHA-256 |
|---|---|
| historical pass ledger | `c320078c7e3b624639b54e334d3592673e5e6475a907b15909c0b4e4c48291ba` |
| pre-reconciliation root HANDOFF | `166396458b1bedb2e049d11e7a63bbaba3944f75f64fe79d0a1549c6833654da` |
| pre-reconciliation audit plan | `2ef38e4f73c8d8cbb2c035b2834f06468c3f8e040b6f3f8a9c20b566d41f1f3c` |
| pre-reconciliation audit matrix | `ad5d52651722d3ad75dcd5d1fbc05ceb19da6cc6f419810b982a565e43f5f40b` |
| parser/CSS pause handoff | `ced234406d3d9ad6bb13e4dce92452a596c9af55dd2091fd90a83f02502f20f7` |
| Glass Row 8 dependency intake | `dc4986fd4e1631a518af68af88e052fb8b61c8a294820c63c99bf0b798acd6e9` |
| Keyframes B18 dependency intake | `0d6d067d6a4a61ac91f88615f531109ef2f40c50bfa9e7a03561ce94bcc6916a` |

The later root handoff may depend on this reconciliation. This reconciliation
must not depend on the later root handoff; that one-way order prevents a hash
cycle.

## 3. Cell schema

Every cell must machine-carry:

- stable ID `PP.<subject>.P<1|2|3>.<phase>`;
- subject, pass ordinal, and phase from closed enumerations;
- exact status from section 4;
- one or more exact evidence coordinates, each with path or immutable root,
  SHA-256, byte count when available, and file or tree kind;
- model, reasoning effort, task/session ID, and tool marker when the evidence
  itself authenticates them; otherwise explicit `null`;
- predecessor cell IDs and predecessor receipt hashes;
- source-owner and terminal owner-receipt coordinate;
- terminal disposition and whether it advances current convergence;
- current-amendment relationship: `CURRENT`, `HISTORICAL_VALID`,
  `SUPERSEDED_NONCOUNTING`, or `MISSING`;
- a precise gap when the cell is not authenticated complete;
- zero-credit and no-execution flags.

No prose-only prefix, task summary, caller-provided digest, or unpinned external
root satisfies a coordinate. A single registry may support several phase cells
only when the owner receipt explicitly validates every named phase and the
matrix points to distinct authenticated JSON paths or equivalent fields.

## 4. Status and counting law

Closed cell statuses:

- `AUTHENTICATED_COMPLETE`: exact bytes, predecessor, phase content, and owner
  intake all join;
- `AUTHENTICATED_TERMINAL_RED`: exact phase evidence exists and ended RED;
- `PARTIAL`: some exact evidence exists but a required join is absent;
- `STALE_UNAUTHENTICATED`: the historical ledger claims completion without a
  complete current pin chain;
- `ABSENT`: no exact evidence coordinate is identified;
- `CONFLICT`: two authenticated authorities disagree.

A phase is structurally complete only for `AUTHENTICATED_COMPLETE` or
`AUTHENTICATED_TERMINAL_RED`. A pass is structurally complete only when all
five phase cells are structurally complete and their predecessor chain is
exact. A pass advances convergence only when:

1. all five phases are `AUTHENTICATED_COMPLETE`;
2. owner agglomeration dispositions every family and names every residual;
3. no later current amendment invalidates the pass's receiver;
4. its predecessor is `NONE` for P1, exact P1 for P2, and exact P2 for P3;
5. the owner receipt grants formation/pass credit but no forbidden execution
   credit.

Historical pass completion and current subject convergence are separate
denominators. A historically valid pass may remain complete while current
product, parser-law, mobile, or execution convergence is RED.

## 5. Subject boundaries

### Value

The Value full-subject P1/P2/P3 registries and owner admission are eligible
historical pass evidence. The reconciliation must validate all 18-family
phase fields and exact P1 -> P2 -> P3 joins. It must separately state that the
current non-parser evidence, mobile source, parser-law, CSS DREI, Browser,
Safari, and product denominators remain governed by later packets.

### parse-that

Parser/CSS work remains paused. The absent novelty-v12 target, terminal RED
builder boundary, open strict-law families, and missing clean reviews cannot be
promoted into a completed pass. Read-only archaeology is allowed; no parser
source or experiment may run.

### Keyframes

Historical formation passes may be counted only from exact pass corpus bytes,
not from the stale ledger sentence. B9/B10/B18 source-review attempts and the
57/414 current RED contracts remain later constraints; they do not silently
erase valid historical evidence or satisfy a new pass.

### Fourier

P1/P2/P3 claims must bind exact current owner receipts and predecessor roots.
P29 remains `0/137 COMPLETE`; R3 remains terminal on disconnected
byte-to-registry derivation. No inventory successor, hostile B, mapping, or
product action is authorized.

## 6. Required hostile controls

The matrix and any validator must fail with a distinct owning reason for at
least:

1. missing one of the 60 cell IDs;
2. duplicate cell ID or duplicate subject/pass/phase coordinate;
3. reordered subject, pass, or phase axes;
4. stale or wrong file hash;
5. missing or extra file in an authenticated root;
6. root drift after evidence capture;
7. caller-supplied summary substituted for source bytes;
8. P2 joined to anything except exact P1;
9. P3 joined to anything except exact P2;
10. one phase field reused without an authenticated field-level path;
11. alias paths recapturing one physical file as independent evidence;
12. missing owner receipt or wrong owner;
13. model/task labels asserted by prose but absent from evidence;
14. a terminal RED cell promoted to convergence-complete;
15. a historical valid pass promoted over a later current amendment;
16. an untracked or mutable coordinate labeled repository-durable;
17. any nonzero product, Browser, Safari, API, package, release, rebind, or
    constellation credit.

Every owner-control mutation must fail its owning leaf; all non-owner controls
must retain the owner. Missing, unknown, duplicate, and cross-pass suppression
requests must reject.

## 7. Outputs and review order

This source-audit wave consists of:

1. this law;
2. one exact 60-cell machine matrix;
3. one checksum packet;
4. two later independent source hostiles;
5. an owner adjudication that either accepts the registry or names exact fresh
   successor requirements.

Order is law -> matrix -> checksum seal -> hostile A -> owner correction if
needed -> fresh hostile B -> owner adjudication. A hostile may not repair the
matrix it reviews. No cross-repository input slot or candidate opens from this
wave alone.

## 8. Initial expected ruling

The initial matrix is expected to prove historical Value evidence more
strongly than the stale ledger while leaving parse-that and Fourier incomplete.
Keyframes must be decided from its exact corpus rather than assumed either way.
The truthful outcome may be less than three passes for a subject. That is
progress: it replaces inherited prose with a finite, falsifiable denominator.

# Value P3 API policy/membership hostile Sol falsification

**Date:** 2026-07-29  
**P3 output:** `/Users/mkbabb/Documents/Codex/2026-07-29/value-p3-api-policy-membership/outputs`  
**Terminal:** **REJECT as formation authority; FOLD the valid defect evidence and
invariants into V.A1–V.A3**

No product source was changed by P3 or this adjudication.

## Valid evidence retained

P3 correctly independently establishes:

- current global content-hash membership collapses object authorship and history;
- release/revision reads and revert must prove membership in the addressed
  object;
- policy must default-deny and hide unauthorized existence;
- payload bytes may deduplicate only behind object-local immutable membership;
- hidden provenance hops require a non-correlatable unavailable step;
- mutation authorization must be re-evaluated at the atomic write boundary.

These findings remain inputs. P3's proposed route, identity, policy and storage
architecture does not.

## Blocking authority conflicts

### 1. F-L1 R1 cannot select storage

The complete root falsification is
`FOURIER-FL1-R1-SOL-FALSIFICATION-2026-07-29.md`. P3 lines 204–230 may not
select or dispose `LOCAL-SNAPSHOT`, `GLOBAL-BLOB-SPLIT`, `PERSISTENT-TRIE` or
`BOUNDED-DELTA` from R1. `LOCAL-SNAPSHOT` remains the default; V.A2 blocks on
F-L1 R2.

P3 also reintroduces label drift by using bare A/B/C/D plus `G` and by folding
`OBJECT-LOCAL-BLOB` into B. The only admissible stable names are:

1. `CURRENT-GLOBAL-MEMBERSHIP`;
2. `LOCAL-SNAPSHOT`;
3. `GLOBAL-BLOB-SPLIT`;
4. `PERSISTENT-TRIE`;
5. `BOUNDED-DELTA`;
6. `OBJECT-LOCAL-BLOB`.

### 2. The canonical API contract was marked ABSORB

`megatranche/excavation/extracts/vnext-standing.md:349` marks
`docs/tranches/V/vnext/api-contract.source.json` **ABSORB**, because the
megatranche has no equivalent API band.

That contract already fixes:

- `GET /api/palettes/{slug}/revisions/{revisionNo}`;
- `POST /api/palettes/{slug}/revisions/{revisionNo}/revert`;
- revert success `201`;
- strong `If-Match` plus process-local `Idempotency-Key` for revert;
- process-local `Idempotency-Key` for fork creation.

P3 instead proposes `/versions/:releaseHash`, success `200` and no exact
idempotency contract. V.A1–V.A3 must absorb the canonical contract or record an
explicit supersession; a second route identity is forbidden.

### 3. Workspace and clocks disappear

`DECISIONS.md` D10–D13 retain explicit Workspace, immutable public
Release/Revision, Handle, and separate workspace/handle/policy clocks. P3 makes
patch append a membership and swing a release pointer, publish flip a pointer,
and revert append directly. It omits Workspace identity and repeats the former
aggregate under renamed rows.

### 4. One release axis cannot govern every operation

Detail, fork list, provenance and revision list do not all have one requested
release. The policy must separate:

1. object authorization;
2. requested revision authorization where applicable;
3. item-by-item list filtering;
4. hop-by-hop provenance redaction.

The administrator/moderator authority must be included rather than left as an
unavoidable route-local bypass.

## Exact behavior corrections

- An authenticated fork of a readable public source creates a **private**
  destination Workspace.
- A non-owner revert of a readable public object follows the absorbed
  existence-hiding contract, not P3's invented `403`.
- A withdrawn owner fork follows the canonical policy result, not P3's invented
  `409`.
- A public child remains independently readable if its ancestor later becomes
  private, withdrawn or trashed. Only provenance redacts the hidden hop.
- Authentication-before-lookup and existence hiding must be ordered once in the
  absorbed operation contract.
- Owner-trash detail must reconcile the existing owner trash surface rather than
  silently choose between `410` and a distinct owner-trash `200`.

## Data/index corrections

- Immutable `paletteId` is object identity; `slug` is a route locator.
- Do not invent a system/import Principal for legacy rows; D14 explicitly
  forbids that attribution.
- Use unique `(paletteId, revisionNo)` and immutable revision IDs/hashes as
  specified by the absorbed domain; do not make a mutable slug the persistence
  identity.
- One child has one source edge. A unique `(child,parent,parentRevision)` key
  wrongly permits multiple origins for one child.
- Do not duplicate provenance authority in both revision membership and a
  separate edge.
- Content-digest collision handling must compare canonical bytes before reusing a
  payload object.
- Public counts are derived from the same filtered join; a stored parent
  `forkCount` cannot remain public authority when child visibility, lifecycle
  and moderation change independently.

## Transaction corrections

“Re-read inside the transaction” is insufficient without checked conditional
writes. The current palette repository discards `matchedCount`; V.A3 must bind a
database CAS that:

- conditions on the exact owner, lifecycle, moderation and clock values;
- checks the write match;
- aborts the complete transaction on zero matches;
- gives fork and revert one process-local idempotency receipt;
- allocates object-local revision number uniquely under concurrency;
- refuses digest collisions whose canonical bytes differ;
- leaves no partial object, Workspace, revision, edge, payload reference, count
  or pointer.

## Bounded wave amendments

No new process wave is created.

### V.A1

FOLD the P3 default-deny intent into the absorbed operation contract. Separate
object, revision/item and hop policy; include administrator/moderator, cache and
`Vary`; specify private fork creation, independent child readability and exact
route results.

### V.A2

Mark **BLOCKED-ON F-L1 R2**. `CURRENT-GLOBAL-MEMBERSHIP` remains PRUNE and
`LOCAL-SNAPSHOT` remains default. Do not select another storage family yet.

### V.A3

Bind the absorbed `/revisions/{revisionNo}` contract or record explicit
supersession. Add checked database CAS, exact idempotency, unique object-local
revision order, one provenance edge authority, filtered derived counts and
digest-collision refusal.

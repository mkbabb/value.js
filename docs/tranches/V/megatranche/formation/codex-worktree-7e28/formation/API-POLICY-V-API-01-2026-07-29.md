<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/API-POLICY-V-API-01-2026-07-29.md
  original-mtime: 2026-07-29T17:36:53
  original-sha256: 46a88fa27beb1487365cc05aa0195b7651c483c1b66b4891b9931f39b7b8538a
  original-bytes: 22147
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# V-API-01 — Palette Access Policy and Per-Object Release Membership

Date: 2026-07-29
Status: FORMATION-ONLY; API and persistence source are unchanged
Authority: `docs/tranches/V/DECISIONS.md` D9–D13, root adjudications
V-API-01/P3, `docs/tranches/V/vnext/api-contract.source.json` under standing
VN-10 ABSORB, and live evidence at `e01d0065`

## 1. Authority and terminal vocabulary

Value has one palette visibility model:

- visibility: `private | public`;
- lifecycle: `active | trashed`;
- moderation: `clear | withdrawn`;
- immutable release visibility: inherited from the palette at publication time and thereafter non-escalating.

`unlisted` is historical drift. It is not a Value product-policy question and receives `PRUNE` in validators, DTOs, persistence enums, route branches, fixtures, prose, and tests. Fourier may retain a distinct resource policy; the shared provenance/storage contract does not force enum identity.

The vnext operation registry is absorbed for route identity, authority profile,
preconditions, idempotency, status, and lifecycle. Its stale
`private | unlisted | public` transition text is overlaid by D9’s later
`private | public` authority; absorbing the operation registry does not revive
`unlisted`.

All reads and mutations below pass through one centralized policy. Repositories return candidates; they do not decide visibility. Services never infer authorization from possession of a slug or release hash. An unauthorized or moderated target hides existence with `404`. Authentication may be rejected before target lookup with `401`. An owner addressing an owned trashed palette receives the explicit lifecycle result selected by the existing route contract (`410` for detail and owner lifecycle surfaces); non-owners receive `404`.

## 2. Subject model

`owner` means the authenticated palette owner. `non-owner` includes anonymous
users unless an operation explicitly requires authentication. `administrator`
is an explicit policy principal, never an ownership surrogate or route-local
bypass. A visible immutable release is a release membership belonging to the
requested palette whose release state is eligible for the requested operation;
visibility never makes a private or withdrawn palette public.

Owner inspection is not publication: an owner may inspect and recover the history of a private or withdrawn active palette. Withdrawal blocks distribution actions such as forking. Trashing terminates secondary operations until restoration; it is not a second visibility state.

### Canonical object and clock split

- `PaletteIdentity`: immutable `paletteId`; generated public `slug` is a
  locator/handle, never object identity or authorization.
- `Workspace`: explicitly saved private mutable edits, with
  `workspaceRevision`.
- `Revision`: immutable palette-local content membership, addressed externally
  by numeric `revisionNo`.
- `Release`: immutable publication of a revision with its own strong validator
  and per-release policy facts.
- handle generation, workspace revision, and policy revision are separate CAS
  clocks; immutable Revision/Release has no mutable clock.
- publish supplies the expected workspace and handle clocks. Every mutable
  command performs its conditional CAS in the database write and proves
  `matchedCount === 1`; a read-then-write comparison is not CAS.

## 3. Route-policy matrix

Legend:

- `ALLOW`: return the scoped object;
- `AUTH`: reject unauthenticated callers before lookup;
- `404`: hide existence;
- `410`: owner-visible lifecycle result for the owned trashed palette;
- `FILTER`: authorize every returned child or hop independently;
- `LOCAL`: revision/release must be a member of the addressed palette;
- `ADMIN-POLICY`: explicit operation-specific administrator authorization and
  audit, not an automatic route bypass.

| Palette state | Caller | Detail | Fork | Fork list | Provenance | Revision list | Revision read | Revert |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| active, public, clear | owner | ALLOW | ALLOW | FILTER | ALLOW + FILTER | ALLOW | ALLOW + LOCAL | ALLOW + LOCAL |
| active, public, clear | authenticated non-owner | ALLOW | ALLOW; new fork starts private | FILTER | ALLOW + FILTER | ALLOW | ALLOW + LOCAL | 404 |
| active, public, clear | anonymous | ALLOW | AUTH | FILTER | ALLOW + FILTER | ALLOW | ALLOW + LOCAL | AUTH |
| active, private, clear | owner | ALLOW | ALLOW | FILTER | ALLOW + FILTER | ALLOW | ALLOW + LOCAL | ALLOW + LOCAL |
| active, private, clear | non-owner | 404 | 404 | 404 | 404 | 404 | 404 | 404 |
| active, public, withdrawn | owner | ALLOW | 404 | FILTER | ALLOW + FILTER | ALLOW | ALLOW + LOCAL | ALLOW + LOCAL |
| active, public, withdrawn | non-owner | 404 | 404 | 404 | 404 | 404 | 404 | 404 |
| active, private, withdrawn | owner | ALLOW | 404 | FILTER | ALLOW + FILTER | ALLOW | ALLOW + LOCAL | ALLOW + LOCAL |
| active, private, withdrawn | non-owner | 404 | 404 | 404 | 404 | 404 | 404 | 404 |
| active, public, clear | administrator, non-owner | ALLOW as ordinary readable session | ALLOW as self; private child; no admin bypass | FILTER | ALLOW + FILTER | ALLOW + FILTER | ALLOW + LOCAL | 404 |
| active, private or withdrawn | administrator, non-owner | ADMIN-POLICY | 404 | ADMIN-POLICY + FILTER | ADMIN-POLICY + FILTER | ADMIN-POLICY + FILTER | ADMIN-POLICY + LOCAL | 404 |
| trashed, any visibility/moderation | owner | 410 | 410 | 410 | 410 | 410 | 410 | 410 |
| trashed, any visibility/moderation | non-owner | 404 | 404 | 404 | 404 | 404 | 404 | 404 |
| trashed, any visibility/moderation | administrator, non-owner | 404 on ordinary detail; use explicit trash/Admin policy route | 404 | ADMIN-POLICY + FILTER | ADMIN-POLICY + FILTER | ADMIN-POLICY + FILTER | ADMIN-POLICY + LOCAL | 404 |

Additional invariants:

1. `GET /api/palettes/{slug}/revisions/{revisionNo}` resolves `slug` to immutable
   `paletteId`, then requires membership at `(paletteId, revisionNo)`.
2. `forkPalette` authorizes the source before work and repeats the same authorization in the transaction.
3. `listForks` is not “all non-deleted children.” Each child is filtered through detail policy for the viewer.
4. `getProvenance` authorizes the target first, then filters or redacts each hop
   through the same policy. A readable child remains independently readable if
   an ancestor later hides; only the unavailable provenance hop is redacted.
5. revert requires ownership, an active target, a local numeric revision, a
   strong `If-Match`, and a process-local `Idempotency-Key`. A revision from
   another palette is always `404`, including when its payload bytes are
   identical.
6. Revision-list and revision-read policy is not derived from object
   authorization alone. Every returned revision/list item receives its own
   release-policy check.
7. A public readable source forked by an authenticated principal creates a
   private child owned by that principal. Hiding an ancestor never revokes an
   independently readable child.
8. Administrator access is an explicit policy branch with audit. No Admin
   route calls a repository directly or treats role presence as object
   ownership.

## 4. Current defects and terminal dispositions

| Current surface | Evidence | Disposition |
|---|---|---|
| `getPaletteBySlug(slug)` | Existence/deletion only; no viewer or visibility | `SPLIT`: repository candidate lookup + centralized viewer-aware service policy |
| `forkPalette` preflight and transaction recheck | Existence only | `FOLD`: authorize source at both boundaries |
| `listForks` | Filters `deletedAt` only | `FOLD`: viewer-aware child filtering |
| version list/get routes | Ungated | `FOLD`: centralized policy |
| `GET /:slug/versions/:hash` | Ignores route slug and conflicts with absorbed operation registry | `PRUNE`: route identity and global hash read; `KEEP`: canonical revision-number job |
| `PaletteVersion._id = contentHash` | Global payload identity doubles as object membership | `SPLIT`: release membership from optional payload blob |
| `insertIfAbsent(contentHash)` | Suppresses the second palette’s authorship/membership | `PRUNE`: global membership dedup; retain optional payload dedup only |
| `revertToVersion(slug, hash)` | Reads arbitrary global hash through a noncanonical route contract | `PRUNE`: global transplant; `FOLD`: job into canonical CAS/idempotent numeric revision revert |
| duplicate-suppression tests | Canonize the defect | `PRUNE` and replace with collision-isolation gates |
| `unlisted` branches and fixtures | Superseded three-state policy | `PRUNE` |
| `isActivePublic` used as complete policy | Cannot express owner/private/withdrawn/release rules | `FOLD` into centralized policy predicates |
| stored `forkCount` | Cannot remain truthful under viewer-filtered children | `PRUNE` as public authority; compute exact current indexed join |
| route-local Admin repository access | Bypasses object/release policy | `FOLD` into explicit Admin policy branch and audit |

## 5. Canonical API operation identities

`docs/tranches/V/vnext/api-contract.source.json` is absorbed. P3’s invented
`/versions/:releaseHash`, `200` revert, and unspecified idempotency are
`REJECT` as formation authority; they are evidence of needed behavior, not a
second wire contract.

| Operation | Canonical method/path | Authority / preconditions | Success |
|---|---|---|---:|
| revision list | `GET /api/palettes/{slug}/revisions` | policy-read; per-item authorization | 200 |
| revision detail | `GET /api/palettes/{slug}/revisions/{revisionNo}` | policy-read; local membership + per-release authorization | 200 |
| revision diff | `GET /api/palettes/{slug}/revisions/{fromRevisionNo}/diff/{toRevisionNo}` | policy-read; both memberships authorized | 200 |
| revision revert | `POST /api/palettes/{slug}/revisions/{revisionNo}/revert` | owner; strong `If-Match`; required process-local `Idempotency-Key` | 201 |
| fork create | `POST /api/palettes/{slug}/forks` | authenticated session; required process-local `Idempotency-Key`; transaction-time source reauthorization | 201 |
| fork list | `GET /api/palettes/{slug}/forks` | policy-read; every child filtered independently | 200 |
| provenance | `GET /api/palettes/{slug}/provenance` | policy-read; unavailable hops redacted | 200 |

There is no `/versions` compatibility alias, hash-keyed detail route, `200`
revert arm, or durable-idempotency widening.

## 6. Per-object revision/release membership

The membership identity and payload identity are deliberately different.

```ts
type PaletteId = string & { readonly __paletteId: unique symbol };
type PaletteSlug = string & { readonly __paletteSlug: unique symbol };
type ReleaseHash = string & { readonly __releaseHash: unique symbol };
type PayloadHash = string & { readonly __payloadHash: unique symbol };

interface PaletteClocks {
  readonly handleGeneration: number;
  readonly policyRevision: number;
}

interface PaletteWorkspace {
  readonly paletteId: PaletteId;
  readonly workspaceRevision: number;
  readonly savedPrivateContent: unknown;
}

interface PaletteRevisionMembership {
  readonly paletteId: PaletteId;
  readonly revisionNo: number;
  readonly releaseHash: ReleaseHash;
  readonly authorId: string;
  readonly createdAt: string;
  readonly payloadHash: PayloadHash;
  readonly parentRevisionNo?: number;
  readonly visibilityAtRelease: "private" | "public";
  readonly moderationAtRelease: "clear" | "withdrawn";
  readonly strongEtag: string;
}

interface ForkSourceEdge {
  readonly childPaletteId: PaletteId;
  readonly sourcePaletteId: PaletteId;
  readonly sourceRevisionNo: number;
  readonly sourceReleaseHash: ReleaseHash;
  readonly createdAt: string;
  readonly actorId: string;
}

interface PaletteRelease {
  readonly paletteId: PaletteId;
  readonly revisionNo: number;
  readonly releaseHash: ReleaseHash;
  readonly visibilityAtRelease: "private" | "public";
  readonly moderationAtRelease: "clear" | "withdrawn";
}

interface PaletteReleasePayload {
  readonly payloadHash: PayloadHash;
  readonly canonicalPalette: unknown;
}
```

Required key:

```text
PaletteIdentity PK = paletteId
UNIQUE active locator = slug
PaletteRevisionMembership PK = (paletteId, revisionNo)
UNIQUE releaseHash
INDEX  (payloadHash)
ForkSourceEdge UNIQUE = childPaletteId
PaletteReleasePayload PK = payloadHash   // only in measured split variants
```

`releaseHash` identifies an immutable release event, not merely bytes. It is
derived from a canonical release envelope containing at least `paletteId`,
`revisionNo`, parent membership, author, policy facts, and `payloadHash`. Two
palettes—or two revisions in one palette—with identical content therefore have
distinct memberships, authors, ancestry, and release hashes even when a payload
blob is shared.

External revision lookup is `slug → paletteId → (paletteId, revisionNo)`.
Payload lookup is a second step after object authorization, membership, and
per-release authorization. No public service accepts a bare `releaseHash` or
`payloadHash` as a route locator. Revert appends a new revision with ancestry;
it never switches an aggregate pointer to an old row or undeletes a palette.

## 7. Storage candidates and F-L1 identity

Fourier owns measurement only; Value owns this edit.

Stable semantic IDs are authoritative in this packet. Parenthetical F-L1
letters identify the exact Fourier manifest only and are never used alone.
The current F-L1 receipt is **REJECT-AS-ADMISSION**. It is negative evidence,
not a selector for any complex storage architecture.

| Stable semantic ID | Exact F-L1 identity | Membership / release model | Payload model | Value disposition |
|---|---|---|---|---|
| `CURRENT-GLOBAL-MEMBERSHIP` | not an F-L1 candidate | Global content-hash row doubles as membership | Inline | `PRUNE`; violates authorship, membership, and collision isolation |
| `LOCAL-SNAPSHOT` | F-L1 A — direct full snapshots keyed object+version | Per-object release membership with a direct full snapshot | Inline per membership | Correct baseline and default unless measurement admits a more complex model |
| `GLOBAL-BLOB-SPLIT` | F-L1 B — per-object metadata + global content blob | Per-object release membership | Content-addressed shared blob | Unselected; BLOCKED-ON corrected R2 |
| `PERSISTENT-TRIE` | F-L1 C — persistent trie / structural sharing | Per-object release membership rooted at an immutable structure | Structurally shared trie nodes | Unselected; BLOCKED-ON corrected R2 |
| `BOUNDED-DELTA` | F-L1 D — bounded delta/checkpoint | Per-object release membership points to a bounded reconstruction chain | Checkpoints plus bounded deltas | Unselected; BLOCKED-ON corrected R2 |
| `OBJECT-LOCAL-BLOB` | not an F-L1 candidate; backend fallback | Per-object release membership | Object-scoped content blob | Correct bounded fallback if the backend cannot safely provide the selected manifest architecture |

Admission rule:

- `LOCAL-SNAPSHOT` is the correctness baseline and default;
- no current F-L1 result justifies `GLOBAL-BLOB-SPLIT`, prunes
  `PERSISTENT-TRIE`/`BOUNDED-DELTA`, or selects any complex candidate;
- corrected R2 must run correctness gates against `LOCAL-SNAPSHOT`,
  `GLOBAL-BLOB-SPLIT`, `PERSISTENT-TRIE`, and `BOUNDED-DELTA`;
- admit a complex candidate only when corrected R2 proves a material
  representative-data benefit and the p95 authorized release-read/revert path
  remains within the wave budget;
- `CURRENT-GLOBAL-MEMBERSHIP` is never an admissible optimization;
- `OBJECT-LOCAL-BLOB` is a bounded backend fallback, not a compatibility path
  and not a relabeling of an F-L1 candidate.

The chosen implementation has one write path and one read path. There is no dual repository, lazy compatibility migration, or fallback to global membership lookup.

### Why current F-L1 is rejected

1. The harness conflates `releaseHash` with `digest(payload)`, so it cannot
   represent two separate release memberships with identical content.
2. It rejects a valid same-object, same-content successor instead of preserving
   a second immutable membership.
3. The `GLOBAL-BLOB-SPLIT` (exact F-L1 B) collision cell is vacuous against the
   membership-bypass mutant because shared `_require_member` behavior masks
   the wrong answer.
4. Global-monolith gzip reverses the apparent bounded-delta result under
   per-record partitioning; storage boundaries are part of the model.
5. Every performance row uses two 100%-identical complete histories, a maximal
   dedup scenario rather than a representative overlap rate.
6. A one-object read-only rerun makes `LOCAL-SNAPSHOT` smaller than
   `GLOBAL-BLOB-SPLIT` in every sampled cell:

   ```text
   small-low    2379 < 2645
   typical-low 15121 < 18297
   large-low   50929 < 62164
   large-high 726281 < 737225  (gzip)
   ```

Collision pairs remain correctness fixtures. They are not a performance
distribution.

### Corrected F-L1 R2 admission

R2 must prove:

1. distinct `releaseHash` and `payloadHash` identities;
2. same-object, same-content successors retain separate memberships;
3. a direct `GLOBAL-BLOB-SPLIT` wrong-answer control that fails when payload
   access bypasses membership;
4. global plus per-record/index-aware storage accounting;
5. 0%, partial, and 100% overlap sweeps, or a measured real overlap rate;
6. authorized release-read and revert p95;
7. deterministic repeated results with immutable inputs and receipt hashes.

## 8. Born-RED cells

### Policy

- public/clear/active detail: anonymous, owner, and other authenticated caller;
- private detail: owner succeeds; anonymous and other caller receive `404`;
- withdrawn detail/history: owner may inspect; all non-owners receive `404`;
- trashed palette: owner lifecycle result; non-owner `404`;
- fork: public/clear/active authenticated source succeeds and creates a private child; anonymous receives `401`; private non-owner and withdrawn source receive `404`;
- fork list filters private, withdrawn, and trashed children for each viewer;
- readable children stay readable when an ancestor hides; provenance redacts
  only the unavailable hop;
- revisions repeat object plus per-release policy and require local membership;
- administrator paths invoke an explicit audited policy branch; no repository
  bypass and no ownership impersonation.

### Membership and collisions

- two palettes with byte-identical content produce distinct revision/release
  memberships and distinct authors;
- two same-object same-content successors retain distinct numeric revisions and
  release hashes;
- optional payload storage may contain one shared blob without suppressing either membership;
- `(paletteA, revisionNoFromB)` revision read and revert both return `404`;
- a syntactically valid but non-member revision number returns `404`;
- reverting to an earlier local revision appends a new revision with ancestry;
  it does not select/mutate the old membership;
- soft-deleted and withdrawn targets cannot be used as cross-object existence oracles;
- unique `(paletteId, revisionNo)` survives concurrent retries;
- one and only one source edge exists for each child palette;
- conditional database writes prove `matchedCount === 1`;
- digest collision fixtures compare canonical payload bytes before sharing or
  refusing a payload row.

### Routes and contracts

- the slug parameter resolves to immutable `paletteId` before every revision
  service call;
- no service exports a global `getVersionByHash`/`getRevisionByHash`;
- canonical numeric revision routes and 201 revert/fork statuses match the
  absorbed operation registry exactly;
- missing strong `If-Match` is `428`, failed conditional match is `412`, and the
  database write’s `matchedCount` is asserted;
- same process-local idempotency key plus the same request digest replays
  byte-equivalent status, headers, and body; the same key plus a different
  digest refuses without mutation;
- public `forkCount` is an exact current indexed join after viewer filtering,
  never a stored aggregate authority;
- logs and metrics do not disclose a hidden slug/hash in public error fields;
- repository tests prove compound-key membership before payload access.

## 9. Wave binding

| Unit | Bound wave | Completion |
|---|---|---|
| V.A1 policy kernel | centralized predicates, denial semantics, route-policy table tests | Every palette read/mutation names its predicate; bypass search is empty |
| V.A2 revision/release membership | schema/repository/service migration and collision tests | No global membership; `(paletteId,revisionNo)` lookup is mandatory |
| V.A3 route/service closure | detail, fork, forks, provenance, revision list/read/diff/revert | Canonical registry and matrix cells green end-to-end |
| V.Q1 audit | independent source, route, and test graph read | No stale unlisted/global-hash/`isActivePublic` shortcut |
| V.Q2 audit | packed API/demo consumer verification | No disclosure or cross-object transplant |

Commit plan after admission:

1. `test(api-policy): add object, revision, Admin, visibility, lifecycle, and moderation born-red cells`
2. `refactor(api-policy): centralize palette viewer authorization`
3. `test(api-revisions): add per-object membership, CAS, idempotency, and collision-isolation born-red cells`
4. `refactor(api-revisions): split palette revision and release membership from payload identity`
5. `fix(api-routes): absorb canonical revision fork provenance and revert operations`
6. `docs(value-formation): record V-API-01 audit and terminal dispositions`

## 10. Open items

There is no remaining product-policy question. The only open choice is which
measured storage candidate—`LOCAL-SNAPSHOT`, `GLOBAL-BLOB-SPLIT`,
`PERSISTENT-TRIE`, or `BOUNDED-DELTA`—passes corrected F-L1 R2;
`OBJECT-LOCAL-BLOB` is a distinct non-F-L1 backend fallback. The true-Luna P3
candidate is **REJECTED AS FORMATION AUTHORITY**. Its valid default-deny,
per-object-membership, byte-only-payload, cross-object-refusal,
unavailable-hop-redaction, and transaction-reauthorization evidence is folded
into V.A1–A3 above; its invented wire identities/statuses and policy conflicts
are pruned.

> ARCHIVED 2026-07-17 — historical; superseded by PALETTE-CONTRACT.md (honest core). Read-only.

# Palette armor register (RF-9/24 · owner bracket B2)

RETIRED-AS-SPECULATIVE, register preserved (NOT banked — a future multi-tenant product
re-derives from scratch). This is the verbatim formation-era palette stack: the ~70%
speculative armor (Workspace / PalettePolicy / ReleasePolicy / Principal-bitmask /
PrincipalAuthority / AuthFence / AuthorityGuard / AdminGrant / RankEpoch /
CatalogBuildState / AEAD cursor envelope / command-binding replay ring / mTLS edge /
the 20-route admin surface / the encrypted legacy cut) alongside its honest kernel.
The live, product-proportionate honest core is `PALETTE-CONTRACT.md`; W45 is its
executing wave. The byte-exact export contract folded VERBATIM into that live doc
(the W51 authority) and is NOT duplicated here.



---

<!-- ===== verbatim: PALETTE-DOMAIN.md ===== -->

# Tranche V — Palette Domain

## 1. Vocabulary

| Object | Meaning | Identity / clock |
|---|---|---|
| `Principal` | private account identity and lifecycle | opaque UUID + monotonic `principalRevision` |
| `PublicHandle` | display attribution | unique readable slug; never a credential |
| `RecoveryCredential` | one-time-shown canonical `rs1_` recovery secret | versioned HMAC-SHA-256 verifier at rest |
| `PaletteHandle` | stable named palette lineage | opaque UUID + monotonic `generation` |
| `PaletteWorkspace` | private mutable workbench state | workspace UUID + monotonic `revision` |
| `PaletteRelease` | immutable published snapshot in one lineage | release UUID + `(paletteId, releaseNo)` |
| `ContentObject` | immutable canonical normalized color payload | content digest; safe to deduplicate globally |
| `PalettePolicy` | separately clocked moderation/curation state | palette UUID + monotonic `policyRevision` |
| `ReleasePolicy` | separately clocked moderation state for one immutable snapshot | release UUID + monotonic `policyRevision` |
| `DeviceDraft` | local unfinished browser artifact | device-local UUID; never impersonates a server object |
| `CommandReceipt` | durable idempotent mutation result | `(receiptNamespace, commandId)`; namespace is server-derived |
| `AdminGrant` | named, scoped authority with immutable creation provenance | immutable grant UUID + revocation ETag |
| `PrincipalAuthority` | bounded current admin-scope projection over immutable grants | Principal UUID + monotonic `revision` |
| `BootstrapRecord` | one-time deployment provenance for the initial authority | immutable singleton `initial-admin` |
| `PlatformState` | fail-closed product readiness after initial authority exists | immutable singleton `primary-ready` |
| `AuthorityGuard` | serialization point for root-eligibility changes | singleton `root-authority` + monotonic `epoch` |
| `AuthFence` | per-Principal serialization and session-policy fence | Principal UUID + monotonic `lockRevision` and `policyEpoch` |
| `NamespaceClaim` | permanent ownership of one normalized public-handle or palette-slug spelling | `(namespace, normalizedSpelling)` + monotonic `claimRevision` |
| `ColorNameProposal` | immutable attributed name/color submission | proposal UUID |
| `ColorNamePolicy` | separately clocked review decision | proposal UUID + monotonic `policyRevision` |
| `ColorNameSlot` | globally unique normalized-name claim | normalized name + monotonic `claimRevision` |
| `TagDefinition` | stable curated tag vocabulary | tag UUID + monotonic `revision` |

The public product may call a `PaletteHandle` simply a palette. Code and persistence use the precise names.

Runtime-created Principal, Workspace, PaletteHandle, PaletteRelease, ColorNameProposal, TagDefinition, Grant, Report, edge, job, credential and session identities are canonical lowercase RFC 9562 UUIDv7 generated server-side. The clean cut alone emits deterministic UUIDv5 for the exact legacy-derived kinds in §7: PaletteHandle, PaletteRelease, ColorNameProposal, TagDefinition, their subject-keyed policy/claim coordinates and private identity tombstones. Those v5 resources remain first-class live target objects, not aliases; the Wire's typed `ResourceId` admits v5|v7 only for cut-capable kinds, while command IDs and live-only kinds remain v7. No client create body chooses an ID/version, and no v5 value is upgraded, redirected or duplicated into a v7 shadow.

## 2. Data model

```text
principals
  id, publicHandle, publicHandleClaimId, principalRevision,
  status(active|suspended|closed), statusReason, statusActorId, closedAt|null,
  createdAt, updatedAt

auth_fences
  principalId, lockRevision, policyEpoch, updatedAt

admin_grants
  grantId, principalId, scopes, creationReason,
  attribution({kind:"principal",principalId}|{kind:"bootstrap-workload",bootstrapRecordId:"initial-admin"}),
  revocationRevision, createdAt,
  revokedAt, revokedBy, revokedReason

bootstrap_records
  id="initial-admin", deploymentIdentity, deploymentCommit, correlationId, consumedAt,
  principalId, grantId

platform_state
  id="primary-ready", initializedAt, bootstrapRecordId, authorityGuardId

authority_guards
  id="root-authority", epoch, eligibleCount,
  lastReconciledDigest, reconciledAt, updatedAt

principal_authorities
  principalId, revision, scopeRefCounts[11], unionBits, activeGrantIds[<=11], updatedAt

credentials
  principalId, credentialId, verifierKeyId, recoveryMac, createdAt, revokedAt

sessions
  sessionId, sessionDigest, principalId, issuedPolicyEpoch, issuedByCommandId|null,
  issuedAt, expiresAt, lastSeenAt,
  revokedAt, revokedByCommandId, revocationReason

palette_handles
  id, slug, slugClaimId, ownerId|null, attribution(system|principal), generation,
  lifecycle(active|trashed), trashedAt, trashedByReceiptNamespace, trashedByCommandId, purgeAfter,
  visibility(private|public), activeReleaseId, workspaceId|null, createdAt, updatedAt

namespace_claims
  id, namespace(public-handle|palette-slug), normalizedSpelling,
  subjectType(principal|palette-handle), subjectId, claimRevision,
  state(active|retired), claimedAt, retiredAt, retiredReason

palette_workspaces
  id, paletteId, revision, displayName, orderedNamedColors, tags, contentDigest,
  basedOnReleaseId, createdAt, updatedAt

palette_releases
  id, paletteId, releaseNo, displayName, orderedNamedColors, canonicalTags,
  contentDigest, canonicalizerVersion, parentReleaseId, sourceReleaseId,
  attribution(system|principal), actorId|null, commandId|null, publicHistory, createdAt

content_objects
  digest, schemaVersion, canonicalizerVersion, canonicalManifestBytes,
  orderedNormalizedNamedColors,
  refs{workspaces:int64,releases:int64,reports:int64}

palette_policies
  paletteId, policyRevision, moderation(clear|withdrawn), catalogTier(standard|featured),
  reason|null, actorId|null, updatedAt

release_policies
  releaseId, policyRevision, moderation(clear|withdrawn), reason|null,
  actorId|null, updatedAt

vote_edges
  immutable ID, principalId, targetPaletteId, createdAt

fork_edges
  immutable ID, actorId, sourceReleaseId, targetPaletteId, createdAt
  # targetPaletteId is unique: one fork-born lineage has exactly one origin

reports
  immutable ID, actorId, targetPaletteId, targetReleaseId, reviewRevision,
  reason, evidence,
  targetSnapshot{paletteId,releaseId,releaseNo,contentDigest,displayName,
                 orderedNamedColors,canonicalTags,publishedAt},
  state(open|resolved|dismissed), resolutionActorId, resolutionReason,
  appliedEffect(null|none|palette-policy|release-policy),
  appliedTargetId, appliedBeforeRevision, appliedAfterRevision, appliedModeration,
  createdAt, resolvedAt

command_receipts
  receiptNamespace, commandId, principalId|null, route,
  requestBindingDigest, credentialId|null, authSessionId|null,
  authorizationGrantIds, state(intent|completed), completedAt,
  effectStatus, resultReference,
  replayKeyId, replayNonce, replayCiphertext, replayTag

replay_key_state
  id="command-replay", epoch, currentKeyId, changedAt

abuse_windows
  routeClass, subjectKeyId, subjectHmac, windowStart,
  windowSeconds, limit, count, expiresAt

public_catalog
  paletteId, activeReleaseId, policyRevision, projection fields

catalog_build_state
  id="catalog", dirtyRevision, builtRevision,
  publishedEpoch, publishedAt, publishedExpiresAt,
  leaseOwner|null, leaseEpoch, leaseUntil|null

rank_snapshots
  epoch, paletteId, sourceRevision, rankedAt, expiresAt,
  activeReleaseId, policyRevision, rank fields

principal_projection_invalidations
  principalId, policyEpoch, reason, createdAt, reconciledAt

purge_jobs
  jobId, kind(palette|principal-aftermath), subjectId, eligibilityAt,
  causeReceiptNamespace, causeCommandId, causeCorrelationId, causeActorId, causeScopes, causeGrantIds,
  state(queued|leased|complete|cancelled), phase, cursor|null,
  progressCounts,
  leaseOwner|null, leaseEpoch, leaseUntil|null,
  startedAt|null, completedAt|null, resultCounts|null, resultDigest|null

audit_outbox
  eventId, actorId?, scopes, grantIds, commandId?, correlationId, action,
  subjectType, subjectId, beforeDigest?, afterDigest?, occurredAt, deliveredAt
  # subjectType + subjectId are one closed AuditSubject pair below

audit_events
  eventId, actorId?, scopes, grantIds, commandId?, correlationId, action,
  subjectType, subjectId, beforeDigest?, afterDigest?, occurredAt
  # subjectType + subjectId are one closed AuditSubject pair below

color_name_proposals
  id, attribution(system|principal), actorId|null,
  displayName, canonicalColor, normalizedName, claimedRevision, evidence, createdAt

color_name_policies
  proposalId, policyRevision, state(pending|approved|rejected|withdrawn),
  reason, actorId|null, updatedAt

color_name_slots
  normalizedName, claimRevision, activeProposalId|null,
  approvedProposalId|null, updatedAt

tag_definitions
  id, revision, normalizedKey, label, category, state(active|retired),
  attribution(system|principal), createdBy|null, createdAt,
  retiredBy, retiredReason, retiredAt, updatedAt

identity_tombstones
  subjectType(principal|palette-handle|palette-release), subjectId,
  sourceCollection?, sourceKeyDigest?, paletteId?, releaseNo?, parentReleaseId?,
  sourceReleaseId?, contentDigest?, retiredAt, reason
```

`AuditSubject` is one closed discriminated pair, persisted as the flattened `subjectType` and `subjectId` columns in both audit collections. Its exact arms are `{subjectType:"platform",subjectId:"primary-ready"}`; `{subjectType:T,subjectId:UUIDv7}` for `T=session|credential|principal|grant|workspace|fork|report|purge-job`; and `{subjectType:T,subjectId:ResourceId}` for `T=palette|release|color-name|tag|policy`, where `ResourceId` is the Wire's canonical v5|v7 cut-capable identity. Both fields are always present on a persisted event and must satisfy the same arm; there is no nullable subject, bare scalar subject, untyped ID union, inferred type, or alternate platform spelling. The outbox-to-event delivery copies this pair byte-for-value. Audit is committed-effect provenance only: the effect and its outbox row commit in one transaction, while an aborted/rejected attempt, completed-receipt replay, outbox delivery, catalogue build, TTL deletion and reconciliation observation enqueue no event and have no second audit-attempt writer.

### Committed-effect audit construction

This subsection is the sole event-construction authority. Every newly completed HTTP mutation r3/r4/r5/r6/r9/r11/r12/r13/r15/r22/r23/r24/r25/r28/r32/r34/r36/r40/r41/r43/r44/r46/r47/r49 commits exactly one outbox row with its effect; a replay commits zero. r3 uses the newly created Principal as `actorId`, r4 uses the recovered Principal, and every authenticated row uses its authenticated actor. All carry their canonical command UUID and edge-minted correlation UUID; r3/r4 and product-only commands carry empty scope/grant arrays, while scoped rows carry the exact minimal witness. Bootstrap commits exactly one outbox row with absent actor/command, empty arrays and one canonical UUIDv7—current Unix milliseconds plus OS-CSPRNG random bits—minted before its transaction and persisted as `BootstrapRecord.correlationId`. Each committed principal-aftermath or palette-purge batch/phase transaction commits exactly one `purge` outbox row using the job's persisted `causeActorId`, `causeCommandId`, `causeCorrelationId`, `causeScopes` and `causeGrantIds`; a job created by r15/r41 copies those exact cause fields, and an aftermath-created palette job copies them again. Ordinary one-to-one outbox delivery creates the corresponding AuditEvent and is the sole AuditEvent writer; it never changes cardinality or bytes. No worker identity, fresh worker correlation or per-row event fanout exists.

The exact event map is below. `Events` is both the logical outbox-row count and, after one-to-one delivery, the AuditEvent count. `edge` means the incoming edge-minted correlation; `cause actor`, `cause command` and `cause correlation` mean the matching persisted job fields. There is no implicit event beside a listed row.

| Producer | Events | `AuditAction` | `AuditSubject` | actor / command / correlation | Projection transition |
|---|---:|---|---|---|---|
| bootstrap | 1 | `bootstrap` | `platform/primary-ready` | absent / absent / bootstrap record | absent → `platform-bootstrap` |
| r3 | 1 | `session-register` | `session/<issued sessionId>` | new Principal / command / edge | absent → `session` |
| r4 | 1 | `session-recover` | `session/<issued sessionId>` | recovered Principal / command / edge | absent → `session` |
| r5 | 1 | `credential-rotate` | `credential/<new credentialId>` | authenticated / command / edge | absent → `credential-rotation` |
| r6 | 1 | `session-logout` | `session/<authenticated sessionId>` | authenticated / command / edge | `session` → `session` |
| r9 | 1 | `workspace-create` | `workspace/<workspaceId>` | authenticated / command / edge | absent → `workspace` |
| r11 | 1 | `workspace-edit` | `workspace/<workspaceId>` | authenticated / command / edge | `workspace` → `workspace` |
| r12 | 1 | `publish` | `release/<new releaseId>` | authenticated / command / edge | absent → `publish` |
| r13 | 1 | `restore-release` | `workspace/<workspaceId>` | authenticated / command / edge | `workspace` → `workspace` |
| r15 | 1 | `handle-policy` | `palette/<paletteId>` | authenticated / command / edge | `handle` → `handle` |
| r22 | 1 | `vote-put` | `palette/<paletteId>` | authenticated / command / edge | `vote-membership` → `vote-membership` |
| r23 | 1 | `vote-delete` | `palette/<paletteId>` | authenticated / command / edge | `vote-membership` → `vote-membership` |
| r24 | 1 | `fork` | `fork/<forkId>` | authenticated / command / edge | absent → `fork` |
| r25 | 1 | `report-create` | `report/<reportId>` | authenticated / command / edge | absent → `report` |
| r28 | 1 | `color-name-propose` | `color-name/<proposalId>` | authenticated / command / edge | absent → `color-name` |
| r32 | 1 | `color-name-review` | `color-name/<proposalId>` | authenticated / command / edge | `color-name` → `color-name` |
| r34 | 1 | `palette-policy` | `policy/<paletteId>` | authenticated / command / edge | `policy` → `policy` |
| r36 | 1 | `release-policy` | `policy/<releaseId>` | authenticated / command / edge | `policy` → `policy` |
| r40 | 1 | `principal-policy` | `principal/<principalId>` | authenticated / command / edge | `principal` → `principal` |
| r41 | 1 | `principal-close` | `principal/<principalId>` | authenticated / command / edge | `principal` → `principal` |
| r43 | 1 | `grant-create` | `grant/<grantId>` | authenticated / command / edge | absent → `grant` |
| r44 | 1 | `grant-revoke` | `grant/<grantId>` | authenticated / command / edge | `grant` → `grant` |
| r46 | 1 | `tag-create` | `tag/<tagId>` | authenticated / command / edge | absent → `tag` |
| r47 | 1 | `tag-retire` | `tag/<tagId>` | authenticated / command / edge | `tag` → `tag` |
| r49, `appliedEffect=none` | 1 | `report-review` | `report/<reportId>` | authenticated / command / edge | `report` → `report` |
| r49, palette/release policy effect | 1 | `report-review` | `report/<reportId>` | authenticated / command / edge | `report` → `report`, including the policy effect; no policy event |
| each committed principal-aftermath batch/phase transaction | 1 | `purge` | `purge-job/<jobId>` | cause actor / cause command / cause correlation | `purge-batch` → `purge-batch` |
| each committed palette-purge batch/phase transaction | 1 | `purge` | `purge-job/<jobId>` | cause actor / cause command / cause correlation | `purge-batch` → `purge-batch` |

An already-satisfied declarative vote command still completes one receipt and one event: its two `vote-membership` projections are byte-equal. The event records the committed command without inventing an edge ID; no-op equality never increments an edge count or CatalogBuildState.

`AuditProjection` is exactly `{schema:"value.audit-projection/v1",action,subject:AuditSubject,state}`. `action` equals the event action column; `subject` is exactly the two-key object `{subjectType:<event subjectType>,subjectId:<event subjectId>}` satisfying the closed `AuditSubject` union, never the table's slash shorthand or a scalar. `state` is one of the following closed objects; fields marked `?` are absent rather than null unless the persistence model explicitly names null, arrays retain the Domain's canonical order, clocks/counts are `JsonUInt`, and every referenced ID uses its Wire kind:

```text
platform-bootstrap = {kind:"platform-bootstrap",bootstrapRecordId:"initial-admin",principalId,grantId,authorityEpoch,eligibleCount,deploymentIdentity,deploymentCommit}
session = {kind:"session",sessionId,principalId,credentialId?,issuedPolicyEpoch,issuedAt,expiresAt,revokedAt?,revocationReason?}
credential-rotation = {kind:"credential-rotation",principalId,oldCredentialId,newCredentialId,newPolicyEpoch,replacementSessionId,revokedSessionCount}
principal = {kind:"principal",principalId,publicHandle,principalRevision,status,statusReason?,statusActorId?,closedAt?,aftermathJobId?}
grant = {kind:"grant",grantId,principalId,scopes,creationReason,attribution,revocationRevision,createdAt,revokedAt?,revokedBy?,revokedReason?}
workspace = {kind:"workspace",workspaceId,paletteId,revision,displayName,orderedNamedColors,tagIds,contentDigest,basedOnReleaseId?}
publish = {kind:"publish",workspaceId,paletteId,releaseId,releaseNo,workspaceRevision,handleGeneration,contentDigest,parentReleaseId?,sourceReleaseId?}
handle = {kind:"handle",paletteId,slug,generation,lifecycle,visibility,activeReleaseId?,trashedAt?,purgeAfter?,schedulablePurgeJobId?}
vote-membership = {kind:"vote-membership",principalId,paletteId,present,voteId?,voteCount}
fork = {kind:"fork",forkId,actorId,sourceReleaseId,targetPaletteId,targetWorkspaceId}
report = {kind:"report",reportId,reviewRevision,state,targetPaletteId,targetReleaseId,appliedEffect?:AppliedReportEffect,resolutionActorId?,resolutionReason?,resolvedAt?}
color-name = {kind:"color-name",proposalId,normalizedName,claimedRevision,policyRevision,state,slotRevision,slotActiveProposalId?,slotApprovedProposalId?}
tag = {kind:"tag",tagId,revision,key,label,category,state}
policy = {kind:"policy",policyKind:"palette"|"release",targetId,policyRevision,moderation,catalogTier?,reason?,actorId?,updatedAt}
purge-batch = {kind:"purge-batch",jobId,jobKind,state,phase,cursor,progressCounts,leaseEpoch,effects}
```

Presence is exact: `session.credentialId` exists only for register/recover; `principal.aftermathJobId` iff closed; `handle.schedulablePurgeJobId` iff trashed; `vote-membership.voteId` iff present; `report.appliedEffect` and resolution fields are absent while open and required when terminal; `policy.catalogTier` exists only for palette policy. `purge-batch.effects` is source-ordered and contains at most 101 exact arms: `{kind:"handle-transitioned"|"handle-verified",paletteId}`, `{kind:"palette-sealed",paletteId,workspaceId?}`, `{kind:"release-deleted"|"release-retained",releaseId}`, `{kind:"vote-deleted",voteId}`, `{kind:"phase-advanced",from,to}`, or `{kind:"job-completed"}`. The before projection uses the job state before the transaction with `effects:[]`; the after projection uses the committed state and only that transaction's effects. This binds each bounded batch without a second audit row per affected resource.

For present projection `P`, let `B=UTF8(RFC8785(P))` and store exactly:

```text
auditProjectionDigest = lowerhex(SHA-256(
  ASCII("value.js/audit-projection/v1") || 0x00 ||
  uint64be(byteLength(B)) || B
))
```

An absent side omits its digest column; it is never null, zero, a hash of a sentinel or a current-resource reconstruction. A present digest is exactly 64 lowercase hex. Projection creation, both digests, the effect and outbox insert share one transaction; only the digests persist, and delivery copies them byte-for-value. `report-review` hashes its exact terminal `AppliedReportEffect`, including policy target and before/after revisions, inside the sole Report projection; bootstrap binds deployment identity/commit inside its sole after projection without adding fields to `AuditEventItem`.

Unique indexes include bootstrap singleton ID, AuthorityGuard singleton ID, PrincipalAuthority `principalId`, CatalogBuildState singleton ID, Principal projection invalidation `(principalId,policyEpoch)`, abuse window `(routeClass,subjectKeyId,subjectHmac,windowStart)`, `(NamespaceClaim.namespace, NamespaceClaim.normalizedSpelling)`, `(identity_tombstones.subjectType, identity_tombstones.subjectId)`, normalized ColorNameSlot, normalized TagDefinition key, `(actorId,targetReleaseId)` report identity, `(paletteId, releaseNo)`, `(receiptNamespace,commandId)`, purge episode `(kind,subjectId,causeReceiptNamespace,causeCommandId)`, vote membership `(principalId,targetPaletteId)`, unique fork origin `(targetPaletteId)`, and catalog sort/cursor keys. `rank_snapshots.expiresAt` has one TTL index; application time, not asynchronous TTL deletion, decides expiry. A NamespaceClaim row is inserted on first acquisition, is never deleted or reassigned, and permits only `active→retired` for the same subject. An active claim resolves one live subject. A retired claim resolves either that same surviving live subject (for a former spelling) or one matching identity tombstone after subject purge/cut, never neither and never both; tombstone insertion and live-subject removal are one transaction. Proposal history itself is not unique by name: the slot serializes the one current pending/approved claim while retaining rejected/withdrawn attempts. Many destination lineages may cite one source Release, but a fork-born destination Handle has exactly one retained fork edge; a normally created destination has none.

`PrincipalAuthority` has one physical encoding. Bit/refcount positions 0–10 are respectively `audit:read`, `grant:read`, `grant:write`, `name:review`, `palette:review`, `principal:close`, `principal:read`, `principal:write`, `report:review`, `tag:read`, `tag:write`. Each refcount is an unsigned integer 0–11; bit `i` is 1 iff refcount `i>0`, and every other bit in the unsigned 16-bit `unionBits` is zero. `activeGrantIds` contains 0–11 unique canonical lowercase UUIDs sorted by ascending ASCII bytes. Registration creates the all-zero projection; bootstrap creates eleven unit refcounts, bits `0x07ff`, and its one initial grant ID. Grant write/revoke verifies this representation before and after update; overflow, missing grant or projection mismatch is a named fail-closed platform fault, never authorization fallback.

An `AdminGrant` is immutable except for its one revocation transition. Its creation provenance has one closed discriminated representation, `GrantAttribution={kind:"principal",principalId}` or `{kind:"bootstrap-workload",bootstrapRecordId:"initial-admin"}`; there is no nullable creator, scalar creator alias or second workload arm. Ordinary r43 stores the authenticated actor in the principal arm and stores the exact normalized request `reason` as `creationReason`. The bootstrap grant alone stores the workload arm and exact ASCII `creationReason="initial authority bootstrap"`; the referenced BootstrapRecord owns deployment identity/commit, so the Grant neither invents the new Principal as its author nor duplicates workload prose. Creation stores `revocationRevision=0`; the sole legal CAS changes an active row to revoked and `revocationRevision=1` while filling `revokedAt/revokedBy/revokedReason`, without rewriting attribution or creationReason. A second transition is `409 state_conflict`. Its strong validator is therefore exactly `"grant:<grantId>:0"` or `"grant:<grantId>:1"`; no timestamp or inferred active-state spelling can generate a competing ETag.

Runtime creation has one closed initial-clock law: Principal `principalRevision=1`; AuthFence `lockRevision=1,policyEpoch=1`; PrincipalAuthority `revision=1`; NamespaceClaim `claimRevision=1`; PaletteHandle `generation=1`; PaletteWorkspace `revision=1`; PalettePolicy, ReleasePolicy and ColorNamePolicy `policyRevision=1`; ColorNameSlot `claimRevision=1`; TagDefinition `revision=1`; Report `reviewRevision=1`; AdminGrant `revocationRevision=0`; and an immutable PaletteRelease carries the constant ETag clock `1`. Every legal ordinary mutation advances its one owning mutable clock exactly once in the same transaction, even when other joined clocks also advance; creation, retry, audit delivery and projection rebuild do not invent extra increments. Immutable Release and Proposal coordinates never advance, and the Grant exception is only its single `0→1` revocation transition.

### Permanent namespace spelling

One implementation in `api/src/modules/namespace/**` owns both `PublicHandle` and `PaletteHandle` spelling. `normalizedSpelling` is not a fuzzy search key: it is the sole canonical stored, returned and displayed handle/slug string. The original casing/input is not retained and no second normalizer may exist.

`canonicalizeClaimInput(raw)` is exact:

1. Accept a string of 3–48 ASCII bytes only. Reject every non-ASCII scalar **before** case folding; there is no Unicode normalization, transliteration, accent stripping or confusable mapping.
2. Perform ASCII `A`–`Z` → `a`–`z` only. Do not trim whitespace.
3. Require `^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$`. Thus a letter starts the value, only lowercase letters/digits/single interior hyphens survive, and leading/trailing/consecutive hyphens, dot, underscore, slash and whitespace are invalid.
4. Reject this exact shared reserved set after folding: `admin`, `api`, `app`, `assets`, `auth`, `browse`, `color`, `colors`, `docs`, `health`, `me`, `moderator`, `official`, `openapi`, `palette`, `palettes`, `recover`, `register`, `root`, `security`, `session`, `sessions`, `staff`, `static`, `support`, `system`, `tag`, `tags`, `workspace`, `workspaces`, `www`.
5. Return the branded canonical ASCII string. A create/register/bootstrap body or CLI input may contain ASCII uppercase and receives the lowercase canonical value in its response. Invalid shape/length/alphabet is `422 namespace_spelling_invalid`; the reserved set is `422 namespace_spelling_reserved`; an existing active **or retired** claim is the namespace-specific 409.

`canonicalizeClaimPrefix(raw)` is a separate bounded search decoder, never an acquisition alias. After the query parser's one percent decode, it accepts 2–48 ASCII bytes, rejects non-ASCII before folding, performs only ASCII `A`–`Z`→`a`–`z`, does not trim, and requires `^[a-z][a-z0-9]*(?:-[a-z0-9]+)*-?$`. A trailing single hyphen is allowed because `a-` and `a-b-` are prefixes of valid complete claims; a leading/consecutive hyphen, dot, underscore, slash or whitespace is invalid. The reserved-word set is not applied to search prefixes: `admin` is a legal prefix query even though it cannot be acquired as a complete claim, and may match `admin-tools`. The returned lowercase ASCII bytes are the exact `publicHandlePrefix` stored in `Q-PRINCIPALS` QueryIdentity. Matching is the indexed byte interval `[p,prefixSuccessor(p))` over canonical `normalizedSpelling`, where `prefixSuccessor` increments the final byte below `0xff` and truncates after it; equivalently, the stored ASCII spelling must begin byte-for-byte with `p`. Vectors freeze `Ab→ab`, `a-`, `a-b-` and `admin` as accepted; `a--`, `-a`, `a_`, whitespace, non-ASCII, one byte and 49 bytes as `422 query_invalid`. This decoder neither creates a claim nor changes the complete-claim/path laws below.

Path lookup is stricter because aliases are forbidden. The raw path segment must already be the literal canonical ASCII string: any percent escape (including an escape for an unreserved byte), raw non-ASCII, uppercase, backslash, slash, dot segment, invalid UTF-8 or double-encoded form returns `400 namespace_path_noncanonical` before lookup. There is exactly one router decode for structural parsing and never a second decode; lookup then compares the raw literal to the canonical branded value. A canonical absent claim is 404, an active claim resolves only to its recorded subject, and a retired claim never resolves to a successor. JSON/CLI inputs are never percent-decoded. The namespace discriminator remains part of uniqueness, so a public handle and palette slug may independently share the same canonical spelling without colliding.

This is an ingress invariant, not permission to infer original bytes from a normalized URL. The production edge is therefore a decided byte-preserving rail: a dual-stack Layer-4 TCP load balancer passes TLS to NGINX+njs/QuickJS, and one catch-all external content handler reads `r.rawVariables.request_uri` as a `Buffer` before any normalized location, rewrite, router or query API is used. It splits only at the first ASCII `?`, validates the original path bytes, retains the query bytes unchanged, and strips exactly one literal `/api` only after the path has passed. `merge_slashes off` is defense in depth, never the evidence. Any target whose normalized view would enter `/api` while its raw path lacks the literal prefix is rejected rather than falling through to the SPA. A normalized `r.uri`, `$uri`, `$args`, `r.args`, URI-form `proxy_pass` or rewrite-derived target cannot close the repeated-slash, encoded-prefix or malformed-byte vectors.

Binding vectors for registration, bootstrap, Workspace create, Handle rename, fork and every public lookup are:

| Input/context | Result |
|---|---|
| body/CLI `Azure-7` | canonical `azure-7` |
| body `azure-7` | canonical `azure-7` |
| body ` az-7 `, `az`, `-azure`, `azure-`, `azure--7`, `azure_7` | `422 namespace_spelling_invalid` |
| body `Åzure`, `A` + U+030A + `zure`, full-width `Ａzure`, emoji | `422 namespace_spelling_invalid`; no normalization/transliteration |
| body `Admin` | `422 namespace_spelling_reserved` after ASCII fold |
| canonical path `azure-7` | one lookup in the named namespace |
| path `Azure-7` or `%61zure-7` | `400 namespace_path_noncanonical`; no redirect/alias |
| path `azure%2F7`, `azure%5C7`, `%2e%2e`, malformed UTF-8 | `400 namespace_path_noncanonical` before subject lookup |
| path `azure%252D7` | one structural decode still leaves an encoded form; reject, never double-decode |
| active or retired claim for `azure-7` during create/rename/fork | named 409; never reassign |

### Trusted edge identity and shared abuse windows

The sole production public authority is `https://color.babb.dev`. DNS points without an HTTP proxy to one dual-stack internet-facing Network Load Balancer with TCP:443 listeners in at least two availability zones. It prepends PROXY protocol v2 and passes encrypted bytes unchanged to redundant private NGINX+njs targets; target security groups accept TLS/health traffic only from the load-balancer security group and the targets have no public address. NGINX terminates TLS with `listen ... ssl proxy_protocol` and treats only `$proxy_protocol_addr` as client identity, proving native IPv4 and IPv6 separately; `preserve_client_ip` and every browser-supplied forwarding/PROXY header are non-authoritative. A second client-supplied PROXY frame is invalid TLS, not another identity source. The same NGINX edges serve the immutable SPA and dispatch relative `/api/**`. The Hono origin has no public DNS or plaintext listener: it accepts private TLS only from the edge security group, requires an edge client certificate chaining to the named private CA, presents a certificate for `api-origin.color.babb.dev`, and requires that exact SNI and `Host`. Network reachability, mTLS and the application MAC are cumulative controls; none substitutes for another. Cloudflare HTTP proxying, Workers, WAF, Pages ingress and VPC binding are absent from the request path rather than retained as an alternate. `PALETTE-LOCAL-RAIL.md` freezes the one real-HTTPS `https://value.localhost:4173` development profile using the same pinned edge artifact and an isolated local PKI; profile selection supplies exactly one expected authority, never an origin list or unsigned/TLS-disabled bypass.

`canonicalClientIpASCII` is derived from the binary PROXY-v2 source address, never from supplied text. IPv4 is four unsigned octets in dotted decimal with no leading zero. An IPv4-mapped IPv6 address in `::ffff:0:0/96` collapses to that IPv4 form before signing. Every other IPv6 address is lower-case RFC 5952: suppress leading zeros in each hextet; compress exactly the longest run of at least two zero hextets, choosing the leftmost on a tie; use no mixed dotted form and no zone identifier. PROXY `LOCAL`/`UNSPEC`, a non-TCP4/TCP6 family, zone-bearing simulator input or a value that does not round-trip to the same 4/16 address bytes is rejected before a MAC or abuse row exists. The full canonical address is signed. The abuse subject later uses that IPv4 string unchanged, or zeros the low 64 bits of native IPv6, RFC-5952-renders the network address and appends literal `/64`; mapped IPv4 never enters the IPv6 branch.

There is exactly one external catch-all NGINX `location /` with `js_content edge.dispatch`; static and API destinations are named or `internal`. NGINX+njs are artifact-digest pinned, njs is at least 1.0.0, `js_engine qjs` is explicit, and the deprecated njs engine is absent. The dispatcher's first operation reads the raw request-target buffer, splits path/query at the first ASCII `?`, and mints one UUIDv7 with 48-bit Unix milliseconds, RFC version/variant bits and 74 CSPRNG bits from WebCrypto. Its classification algorithm is closed: form a **projection only** by validating each `%HH`, decoding once, mapping backslash to slash, collapsing adjacent slashes and resolving `.`/`..` segments without crossing root. If that projection equals `/api` or begins `/api/` while the raw path is neither literal `/api` nor prefixed by literal `/api/`, return `400 namespace_path_noncanonical`. The projection is discarded and is never routed. A literal API path then rejects every percent escape, raw non-ASCII/control byte, malformed UTF-8, backslash, adjacent slash and `.`/`..` segment; namespace-bearing paths additionally require the exact canonical segment grammar and static suffix. The dispatcher strips one byte sequence `/api`, maps an empty remainder to `/`, appends the untouched query, and supplies that already-validated byte target to an internal proxy variable. URI-form `proxy_pass`, request rewriting and a second decode are forbidden. `error_page 400 414 = @edge-precontent-error` catches NGINX-generated HTTP errors that exist after virtual-host selection. When the raw target remains available, that internal njs handler runs the same projection and emits `400 request_target_invalid` only for literal/projected API input; other targets receive the fixed static 400. A parser failure before NGINX has a request/authority terminates the connection and is explicitly outside the HTTP/API contract rather than being mislabeled as an application response.

The dispatcher reconstructs rather than forwards request headers. The sole origin request-header set is fixed: `Host`, optional `Content-Type`, optional reconstructed `Cookie`, optional `Origin`, optional `Sec-Fetch-Site`, optional `Sec-Fetch-Mode`, optional `Sec-Fetch-Dest`, optional `Idempotency-Key`, optional `If-Match`, derived `Content-Length`, and the five `X-Value-*` fields below. A field other than `Cookie` must occur zero or one times; a duplicate is `400 request_header_invalid`. Body routes accept exactly `Content-Type: application/json` with no parameter; bodyless routes receive neither content type nor bytes. All incoming Cookie field-values are parsed under the RFC 6265 cookie-pair grammar, every non-session cookie is dropped, and zero or one canonical `__Host-value-session=st1_<43 canonical base64url chars>` is reconstructed. One malformed session value is omitted so an optional-auth public read remains anonymous; two session cookie-pairs or an ambiguous/malformed Cookie field structure is `400 request_header_invalid`. No `Accept`, forwarding, user-agent or client-supplied `X-Value-*` field reaches Hono. Browser `POST`/`PUT`/`PATCH`/`DELETE` must carry the profile's one exact serialized Origin (`https://color.babb.dev` in production, `https://value.localhost:4173` locally), `Sec-Fetch-Site: same-origin`, `Sec-Fetch-Mode: cors`, and `Sec-Fetch-Dest: empty`. A browser `GET` carries either the same three-field fetch tuple with Origin absent or exactly that profile value, or all four fields are absent for a CLI/operator client. No trailing slash, explicit default port, case variant, `null` origin, partial tuple or other fetch token is equivalent. A missing unsafe or mismatched/partial tuple is `403 origin_forbidden` before credential/domain work.

The edge buffers and size-checks the exact request body once (1 KiB for secret routes, otherwise 64 KiB), then sends `X-Value-Client-IP`, `X-Value-Correlation-Id`, `X-Value-Edge-Time`, `X-Value-Edge-Key-Id`, and `X-Value-Edge-Mac`. Time is canonical unsigned decimal Unix milliseconds; the key ID is `[a-z0-9][a-z0-9_-]{0,31}`; the correlation ID is the edge-minted canonical UUIDv7; the MAC is `ev1_` plus canonical unpadded base64url of 32 bytes. Let `forwardedHeaderBlock` encode, in this exact order, `Content-Type,Cookie,Origin,Sec-Fetch-Site,Sec-Fetch-Mode,Sec-Fetch-Dest,Idempotency-Key,If-Match`; each field is `0x00` when absent or `0x01 || uint32be(valueByteLength) || valueBytes` when present. The MAC message is exactly `ASCII("value.js/edge-origin/v1") || 0x00 || uint64be(timeMs) || uint32be(methodLength) || uppercaseMethodASCII || uint32be(targetLength) || targetBytes || uint32be(clientIpLength) || canonicalClientIpASCII || uint32be(correlationIdLength) || correlationIdASCII || uint32be(forwardedHeaderBlockLength) || forwardedHeaderBlock || SHA-256(bodyBytes)`. HMAC-SHA-256 uses the secret-manager key named by the ID. The origin requires successful mTLS, exact SNI/Host, a timestamp within 15 seconds, a known current/verify-only key, a canonical correlation ID, exact reconstruction of the signed header block, and a constant-time MAC match before routing or parsing. Failure performs zero domain work and returns the private-only response `403`, `Content-Type: application/json;charset=utf-8`, `Cache-Control: no-store`, body bytes `{"code":"edge_origin_unauthorized"}` plus derived length, with no ETag/Retry-After/cookie. The edge never forwards that private code or body: an origin-auth rejection becomes its closed public `503 dependency_unavailable` Problem with the edge-minted correlation ID and no cookie. A transport/mTLS/private-network failure is `504 edge_origin_timeout` on the three cookie-capable routes because their settled subrequest contract owns that failure; on every other API route it is `503 dependency_unavailable`. New requests use the current key, and a replaced key remains verify-only for 30 seconds—longer than the ten-second edge deadline—then is removed. Local development and W16 use the same dispatcher/signing contract with a test private CA and no unsigned/plaintext bypass. Internal headers, MAC input, raw body and client IP never enter audit, receipts or responses.

The origin response allowlist is `Content-Type`, one strong `ETag`, `Cache-Control`, `Retry-After`, and—only where allowed—`Set-Cookie`; the edge derives `Content-Length` and supplies the exact public Date/site-security fields in the wire contract itself. Every origin response requires the single literal `Cache-Control: no-store`. Success uses exactly `application/json;charset=utf-8`; Problem uses exactly `application/problem+json`. ETag, Retry-After and Set-Cookie presence is the row/status matrix in `PALETTE-WIRE-CONTRACT.md §5.2`. After hop-by-hop framing is consumed, **any** origin response field outside that set, any missing/duplicate singleton, a weak/list/wrong-target ETag or invalid media/status/presence coupling becomes cookie-free `502 edge_cookie_contract_violation`; it is not silently forwarded or stripped.

For every API target, the QuickJS handler starts one monotonic 10,000 ms deadline before its private internal subrequest, awaits complete origin status/headers/body, and emits no public byte until validation succeeds. The general response buffer uses a 4,194,305-byte sentinel and accepts at most 4,194,304 body bytes; the three cookie-capable targets use the stricter 65,537-byte sentinel and accept at most 65,536. A general-route timeout, abort, oversize, private-network failure or response settling after the deadline discards the late origin response and emits the edge-minted cookie-free `503 dependency_unavailable`. The same condition on a cookie-capable route emits `504 edge_origin_timeout`. The boundary byte counts are accepted; the next byte is not. Ordinary `proxy_buffering on` alone is not settlement evidence.

Successful `POST /sessions`, `POST /sessions/recover`, and `POST /sessions/recovery-credentials` each require exactly one `Set-Cookie`; every error and every other success requires zero. Its exact value is `__Host-value-session=<canonical st1_ token>; Path=/; Secure; HttpOnly; SameSite=Strict` in that order, with no `Domain`, `Expires`, `Max-Age` or extension. A missing cookie on one of those three successes, any cookie on an error/other route, a second cookie/header, other name/attribute/order or malformed token is a contract violation. The edge copies the sole validated session cookie only after the complete bounded response settled before the deadline. Every other API route intercepts any `Set-Cookie` before public headers leave, replaces status/body with the edge-minted cookie-free `502 edge_cookie_contract_violation`, and discards the origin body. This is an origin-settlement guarantee, not a browser-delivery ordering guarantee: `research/auth-cookie-order.md` terminally retires the impossible no-late-overwrite inference and requires fail-closed reauthentication if RFC 6265 same-name response ordering is lost after emission.

Product-owned edge/origin logs are allowlist-only: UTC timestamp, deployment version, edge instance ID, uppercase method, mounted route template or `unmatched`, response status, elapsed milliseconds, public correlation ID, and one enum outcome (`origin-ok|origin-timeout|origin-auth-failed|origin-contract-failed`). NGINX default access/request logging is disabled on this server and its error format is likewise bounded. No log contains raw path, query, IP, request/response headers, cookies, bodies, edge-auth fields, secrets, verifier material or receipt payloads; seeded canaries prove absence.

Registration and recovery have one database-backed policy; edge/process-local rate counters are not a second semantic path. `routeClass` is exactly one of the following, with fixed UTC windows selected from Mongo `$$NOW` by flooring Unix time to the named duration:

| Route class | Canonical subject | Window | Accepted requests |
|---|---|---:|---:|
| `session-register-source` | signed IPv4 address or signed IPv6 /64 | 10 minutes | 5 new-effect attempts |
| `session-recover-source-failure` | signed IPv4 address or signed IPv6 /64 | 15 minutes | 10 failed proofs |
| `session-recover-handle-failure` | canonical requested PublicHandle after dummy/real verification fails | 15 minutes | 5 failed proofs |

The source subject is the full canonical IPv4 address, or the canonical IPv6 address masked to its first 64 bits and rendered as RFC 5952 network text with `/64`; adjacent IPv6 /64s remain distinct. Registration first checks for a matching completed receipt: an exact proof-backed replay bypasses the new-effect source budget, while any receipt miss or mismatched binding consumes/enforces `session-register-source` before a new claim/effect. There is no registration-handle budget: a public spelling cannot be attacker-locked by guesses, and the permanent NamespaceClaim is the only successful ownership serialization point. Recovery always performs the same dummy-or-real credential HMAC before applying failure budgets. A correct proof or authorized completed replay bypasses both recovery failure windows even when an attacker has exhausted them. A failed proof atomically consumes/enforces both recovery failure rows, including for an absent handle, and returns the same non-enumerating result. Thus no remote actor can lock a known identity out by spending a handle counter. Malformed envelopes/spellings consume only the recovery source-failure row after constant-work dummy verification.

`subjectHmac` is `HMAC-SHA-256(Kid, ASCII("value.js/abuse-subject/v1") || 0x00 || uint32be(routeClassLength) || routeClassASCII || uint32be(subjectLength) || subjectASCII)`. Only the key ID and 32-byte MAC persist. The dedicated abuse key may rotate only after every live fixed window under the prior key has closed, so rotation cannot reset a budget.

One Mongo transaction reads/upserts the applicable failure/new-effect rows and increments them only when every pre-count is below its limit; the unique index plus transaction retry makes exactly the first N concurrent failures/new effects admissible across all API processes. For exhausted rows let `latestExhaustedWindowEndMs` be the greatest applicable end and use the same transaction's Mongo time `mongoNowMs`; the emitted canonical decimal header is `Retry-After=max(1,ceil((latestExhaustedWindowEndMs-mongoNowMs)/1000))`. At the exact fixed-window boundary the old row is not exhausted, a new window begins, and no old-window 429 is emitted. The response is `429 abuse_window_exceeded` with `Cache-Control: no-store`, no axis/count/handle-existence disclosure and no receipt/domain write. Rows set `expiresAt=windowEnd+24h`; TTL removal is storage hygiene, never the boundary oracle.

### Canonical palette content

`ContentObject` identity is frozen here; W11 implements it rather than deciding it. A content manifest contains only the ordered named colors, not release display name, tag labels, Handle identity or policy. It has 1–50 entries and total canonical bytes ≤32 KiB.

Each input must parse through the sole final `/css` absolute-color boundary. CSS-wide/contextual values, deferred syntax, non-finite channels and any explicit missing component are rejected; omitted alpha means `1`. Convert the final color to D65 OKLCH without gamut clipping, normalize hue to `[0,360)`, require `L∈[0,1]`, `C∈[0,0.5]`, `alpha∈[0,1]`, then round to nearest ties-to-even as integer `l=roundHalfEven(100000·L)`, `c=roundHalfEven(1000000·C)`, `h=roundHalfEven(1000·H) mod 360000`, `a=roundHalfEven(1000000·alpha)`. Perform the hue modulus after rounding so a value on the upper half-unit boundary becomes zero rather than the invalid integer 360000. If quantized `c=0`, force `h=0`; negative zero is zero. Values outside the ranges are rejected rather than clamped or substituted. Duplicate colors are legal and array order is semantic.

Display/color names use Unicode 15.1 NFC, map exactly the White_Space set `U+0009–000D, U+0020, U+0085, U+00A0, U+1680, U+2000–200A, U+2028, U+2029, U+202F, U+205F, U+3000` runs to one ASCII space, and trim that space. NUL, remaining C0/C1 controls, XML-1.0-forbidden scalars `U+FFFE/U+FFFF`, and bidi controls `U+202A–202E/U+2066–2069` are rejected. A color name, when supplied, must remain 1–64 Unicode scalars and ≤256 UTF-8 bytes; absence canonicalizes to JSON `null`. Release `displayName` uses the same law at 1–100 scalars/≤400 bytes. Tag IDs are canonical lowercase UUIDs, unique, sorted by ascending ASCII bytes, at most ten; each immutable `labelAtPublish` uses the display-name law. Color names and ordered duplicates remain content; displayName/tags remain immutable Release metadata and do not alter `ContentObject.digest`.

Canonical bytes are UTF-8 RFC 8785 JSON of exactly `{"colors":[{"a":A,"c":C,"h":H,"l":L,"name":NAME},…],"schema":"value.palette-colors/v1"}`; keys and integer values are exactly as shown, with no optional keys, floats or whitespace. The digest is lowercase hex SHA-256 over `ASCII("value.js/palette-content/v1") || 0x00 || uint32be(byteLength) || canonicalBytes`, using unsigned four-byte big-endian length. On an existing digest, compare every canonical byte in constant-length-safe fashion; mismatch fails closed as `500 content_digest_collision` and writes/reuses nothing. Because that transaction aborts, it also enqueues no AuditOutbox/AuditEvent; there is no second collision-attempt logger. The product request log's bounded transport outcome is the unrelated allowlisted mechanism in §1. Independent vectors cover syntax-equivalent colors, alpha default, achromatic hue, half-even boundaries, Unicode composition/whitespace, ordered duplicates, tag sorting, missing/out-of-range rejection and a forced digest-collision fixture.

`ContentObject` is also the sole per-digest reference guard; there is no collector queue, candidate set, fallback scan or reconciliation writer. Its payload fields are immutable, while `refs.workspaces`, `refs.releases` and `refs.reports` are nonnegative signed-int64 counters. For every digest `d`, those counters equal exactly the cardinalities of live `PaletteWorkspace.contentDigest=d`, live `PaletteRelease.contentDigest=d`, and retained `Report.targetSnapshot.contentDigest=d` rows, and a ContentObject exists iff their sum is positive. Release/Handle tombstones may retain the digest as a non-owning provenance coordinate but are not references. Underflow, overflow, a referencing row without its object, or counter/cardinality disagreement is a fail-closed platform consistency fault.

One content-reference repository port owns every runtime referencing-row insert, delete and digest transition. A transaction derives per-kind counter deltas, aggregates them by digest, cancels a same-digest zero **counter** delta, and touches distinct digests in lowercase ASCII order. Payload validation never cancels: every request-derived r9/r11 canonical payload compares its complete canonical bytes with an existing same-digest object, even when `oldDigest=newDigest`; r12 rederives the saved Workspace payload and performs the same comparison before acquiring its Release reference. A same-digest/same-bytes edit may therefore have zero counter movement, while same-digest/different-bytes is `500 content_digest_collision` with no Workspace or counter write. Positive acquisition either inserts immutable bytes with zero base counters or reads the existing object and performs that complete byte comparison; r13/fork/report source-copy operations require their already-referenced object to exist and agree with the source manifest/snapshot. The port applies all validation, deltas and referencing-row CAS/inserts/deletes in the same Mongo transaction. A positive post-delta sum writes the exact counters; a zero sum deletes the ContentObject synchronously instead of storing a zero row. Because acquire, release and zero-delete all write the same uniquely keyed digest document, concurrent reference creation and deletion conflict and retry from full receipt precedence rather than committing snapshot write skew. Aborts and completed-command replays change neither reference nor counter. Runtime Workspace/Release/Report persistence outside this port is forbidden. The write-frozen, unreachable §7 transformer is the sole non-runtime constructor: it derives and verifies final counters from the complete target graph before exposure and is deleted after the cut; it is not a second live writer or repair path.

### Color-name and tag uniqueness

`ColorNameSlot.normalizedName` is not display text. First apply the exact Unicode 15.1 NFC/White_Space/control law above to a 1–64-scalar/≤256-byte proposed display name, then apply Unicode 15.1 Default Case Folding statuses `C` and `F`, normalize NFC again, and UTF-8 encode. That result is the permanent slot key; no compatibility/confusable fold applies. Thus ASCII case, decomposed/composed forms and every listed whitespace form collide, while accents/confusables do not. Public display preserves the proposal's normalized pre-casefold spelling. `GET /color-names/search` applies the identical pipeline to `q` (2–64 scalars after display normalization), encodes the result as bytes `p`, and performs exactly the byte-prefix interval `[p,prefixSuccessor(p))` over approved Slot/Proposal names. There is no token, fuzzy, locale-case, regex or second-normalizer path.

`TagDefinition.normalizedKey` accepts 2–32 ASCII bytes, folds `A–Z` to lowercase without trim, and requires `^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$`; `all`, `any`, `none`, `other`, `system`, and `uncategorized` are reserved. `label` uses the display-name law at 1–48 scalars/≤192 bytes. `category` accepts 2–24 ASCII bytes, uses the same fold/shape (without the reserved-key set), and is returned canonically lowercase. Unknown fields are rejected; key is never reassigned after retirement. Vectors bind `Sea Foam`/`sea\u00a0foam`/decomposed/case variants to one ColorNameSlot, distinguish confusables, and cover tag uppercase response, whitespace/Unicode/hyphen/reserved rejection, category bounds and retired-key conflict.

### Field authority

| Field family | Mutable authority | Public snapshot/source |
|---|---|---|
| working name, named colors, tags | private workspace under `revision` | copied into an immutable release manifest only on Publish |
| slug, visibility, active release, lifecycle | owner handle under `generation` | current handle; never inferred from release ETag |
| catalog tier (`standard | featured`) and lineage moderation | scoped admin palette policy under `policyRevision` | current policy joined to catalog; never edits release history; the redundant featured boolean and `archived` pseudo-tier are retired |
| release moderation | scoped admin release policy under its own `policyRevision` | current release policy; immutable release bytes remain untouched |
| votes/forks/rank | exact edge truth for current detail; immutable rank-epoch snapshot for catalog cards/order | excluded from every strong validator |
| history/provenance | immutable releases and edges | historical release manifest or durable tombstone |

Policy construction has one exact provenance law. Runtime r9 Workspace creation and r24 Fork create `PalettePolicy` at revision one with `catalogTier="standard"`, `moderation="clear"`, `reason="lineage created"`, `actorId=<authenticated creator>` and `updatedAt=<the transaction's Mongo time>`. Runtime r12 Publish creates its `ReleasePolicy` at revision one with `moderation="clear"`, `reason="release published"`, `actorId=<authenticated publisher>` and that same transaction time. Those two ASCII rationales are already canonical Domain display strings and are server-owned constants, not hidden request fields. Later r34/r36 mutations store their exact normalized body reason and actor; an r49 policy effect stores the ReportReview reason and reviewer. The clean-cut constructor alone may create a clear PalettePolicy/ReleasePolicy with both `reason=null` and `actorId=null`; absence of either field on any runtime-created or ordinarily mutated policy is a consistency fault.

An owner workspace edit is invisible publicly until Publish. Historical release bytes never change. A public reader may see the active release and a release explicitly marked `publicHistory` only while the handle is active/public and both lineage and release policy are clear. On public GETs an absent, malformed, revoked, expired or stale-policy session is anonymous; only a valid current session personalizes `viewerHasVoted`. Optional authentication can never turn otherwise-public content into 401. Owner trash or unpublish removes all non-owner reads; restore returns the handle active **and private**. Admin lineage/release withdrawal changes policy rows only and suppresses the corresponding public reads without destroying workspace, immutable release, or moderation evidence.

### Catalog rank and count law

There is one mechanism, not an “edge or projection” fork. `vote_edges` and `fork_edges` are permanent social truth. Public detail computes `voteCount` from the indexed lineage vote edges and computes `forkCount`/the fork list by joining the source Release's indexed origin edges to each destination's **current** active Release and public access predicate. These are exact at the read transaction's majority snapshot. A hidden destination contributes neither an item nor a count; the internal edge remains. Vote insertion/deletion and its returned exact count share one transaction. No stored counter is public authority.

Catalog order is an explicitly historical view. Each immutable `RankEpoch` records canonical UUIDv7 `epoch`, `sourceRevision`, `rankedAt`, `expiresAt=rankedAt+24h`, and one row per then-public active Release with its release/policy coordinates, search tokens, `rankVoteCount` and current-public `rankForkCount`. One singleton `CatalogBuildState` replaces per-mutation projection events: every committed mutation that can change Q-CATALOG membership, tokens, rank inputs or order increments its monotonic `dirtyRevision` exactly once in the same effect transaction. The closed dirtying set is Publish; every state-changing Handle rename/visibility/trash/restore; state-changing vote PUT/DELETE; Fork; PalettePolicy/ReleasePolicy changes including a Report review's policy effect; Principal suspend/reactivate/close; TagDefinition retirement; owner-close active→trashed aftermath; and palette seal. Replay, abort, an already-satisfied declarative vote, Workspace-only edit, Report review with no policy effect, color-name state and TagDefinition creation increment zero. No catalog-event/outbox collection exists. The same transaction may update the affected current `public_catalog` row, but neither that row nor the dirty clock is a public count authority.

One builder leases that singleton, takes one majority snapshot that includes `targetRevision=dirtyRevision`, and writes a fresh candidate epoch under an unreferenced UUID. The invariant is always `0≤builtRevision≤dirtyRevision`, both clocks are monotonic, and the published epoch's `sourceRevision` equals `builtRevision`. All dirty revisions visible in that snapshot coalesce into that one epoch. Candidate rows are unreachable by a first page or cursor until their full count, key set and rank digest agree. The builder then performs one lease-epoch CAS that **both** changes `publishedEpoch` to the completed candidate and advances `builtRevision` to exactly `targetRevision`; it never acknowledges a later dirty revision that its snapshot did not include. A crash before that CAS leaves the prior epoch published and the candidate unreachable; a crash after it leaves publish and acknowledgement already complete. Mutations committed during a build remain `dirtyRevision>builtRevision`, are coalesced into the immediately following build, and cannot be erased by the first acknowledgement. Each build has a hard 30-second snapshot-to-publish bound and a successor starts immediately while dirty, so even a mutation just after a snapshot is covered by a published complete epoch within 60 seconds; missing that bound is a contract fault, never a false acknowledgement. This is many mutations per epoch, not one epoch per mutation.

Ready epochs are never patched. Every row carries the epoch's fixed `expiresAt`; application reads enforce the exact instant and the TTL index only reclaims expired rows. When the published epoch has at most one hour remaining and the state is otherwise clean, the same leased builder publishes a refresh at unchanged `builtRevision`, so TTL does not require a mutation or a compatibility fallback. Cursors retain their named immutable epoch until its 24-hour expiry; a missing/expired cursor epoch is the explicit 410. Before returning any row, the query rechecks current owner/Handle/policies and requires `current activeReleaseId === ranked activeReleaseId`; a stale row is skipped and continuation still advances. The returned `PaletteCard.catalogTier` and `palettePolicyRevision` come from that current PalettePolicy read, not the ranked copy, and a requested tier filter is applied to the same current value. Thus a tier change cannot be mislabeled or leak through the old epoch while rank order/counts remain honestly historical. When `tagId` filters are present, they are conjunctive: the active Release's frozen tags contain **every** requested ID and every corresponding current TagDefinition is active. Retirement or one absent membership makes the row fail the whole filter even from an older retained epoch, while the immutable Release may still display its historical label in unfiltered results. A new or changed release may therefore be absent for at most 60 seconds, but an inaccessible, superseded, wrong-current-tier or currently-retired-tag-filtered row is never exposed.

Catalog search and metrics are exact:

- For `q`, apply the Domain display normalization, Unicode 15.1 default case folding and NFC, then take maximal runs of Unicode 15.1 `Alphabetic ∪ Decimal_Number` as tokens. Require 1–8 tokens of 2–32 scalars; otherwise `422 query_invalid`. The indexed corpus is the union of the ranked Release display name, non-null canonical color names and labels of tags that were active at `rankedAt`. Every query token must match; all but the last are exact and the last is an indexed prefix. No regex, stemming, locale fold or fuzzy score exists.
- `newest` is `publishedAt DESC`. `popular` is checked `popularScore = 4·rankVoteCount + 7·rankForkCount DESC`. `most-forked` is `rankForkCount DESC`. All three then use `publishedAt DESC,paletteId DESC`.
- `color-distance` converts the query's canonical fixed-point OKLCH through value.js 4's frozen D65 OKLab transform and takes the minimum Euclidean distance to **any** ordered Release color, never the centroid or average. It stores `roundHalfEven(1_000_000·ΔE)` and applies the integer radius before `distance ASC,publishedAt DESC,paletteId DESC`.

Every count or score that crosses the Wire or enters a cursor is the Wire's JSON-safe unsigned integer `0..9_007_199_254_740_991`. Edge cardinality aggregation and the weighted popular formula use checked integer arithmetic; each input count and the final `4·rankVoteCount+7·rankForkCount` must fit that range. The boundary vector `rankVoteCount=2_251_799_813_685_246,rankForkCount=1` yields exactly `9_007_199_254_740_991`; `rankVoteCount=2_251_799_813_685_248,rankForkCount=0` overflows by one. Overflow is `500 platform_consistency_fault`: a current response is not emitted, a candidate epoch is not published or acknowledged, and no value is rounded, clamped, wrapped, stringified or passed through an imprecise JSON number.

`PaletteCard` labels these values as a rank snapshot with `epoch/rankedAt`; `PublicPaletteDetail` labels its exact current counts `asOf` with the read timestamp. A catalog count cannot masquerade as current detail truth, and no current count can mutate a retained cursor epoch.

## 3. Shared invariants

1. Public identity and authentication material are disjoint.
2. One access predicate governs public detail, history, provenance, fork, vote, report, and search: non-owner reads require `handle.lifecycle=active ∧ handle.visibility=public ∧ (handle.attribution=system ∨ owner.status=active) ∧ palettePolicy.moderation=clear ∧ releasePolicy.moderation=clear ∧ (release=activeReleaseId ∨ release.publicHistory)`.
3. A workspace is private. A release is immutable. Publishing never edits an existing release.
4. Release identity is palette-local. Identical content in two lineages produces two releases pointing to one safe content object.
5. Every handle mutation CASes `generation`, every workspace mutation CASes `revision`, and every palette/release moderation or curation mutation CASes its own `policyRevision` in the database filter.
6. Strong validators never include volatile social statistics. Handle, Workspace, Release, PalettePolicy and ReleasePolicy each have their own ETag. A response joining independently clocked resources returns every contributing resource ETag as a named body coordinate and emits **no HTTP `ETag`**; a strong response validator may name only a representation whose every mutable byte is governed by that one clock. Thus Workspace detail carries Workspace, Handle and PalettePolicy clocks; Handle detail carries Handle and PalettePolicy clocks; Release detail carries immutable Release, current Handle and ReleasePolicy clocks; current-session detail carries Principal, AuthFence policy and PrincipalAuthority revisions; and current social counts carry only their `asOf` timestamp.
7. Trash and restore are conditional state transitions. A second identical command replays the first receipt; a different command against the wrong state is a conflict, never another counter mutation.
8. Votes target the palette lineage, so ranking survives Publish; fork and report target the immutable visible release that was acted on. Reports are resolved/dismissed, never deleted. Edges are truth; current detail counts are exact read-time joins, while catalog cards/order are the explicitly labeled immutable RankEpoch snapshot above.
9. `hasMore=true` always has a cursor derived from the last **scanned** row. Cursor binds query digest, sort, score, stable ID and immutable rank epoch. An expired epoch returns explicit `410 rank_epoch_expired`; it never silently restarts.
10. One canonical value.js parser validates colors before persistence. The exact fixed-point OKLCH/name/tag/byte/digest law in `Canonical palette content` is the only `ContentObject` identity; invalid/missing/out-of-range colors cannot enter a workspace, and a digest hit reuses content only after exact byte equality. The same object is the sole serialized reference authority: its exact Workspace/Release/Report counters and synchronous zero-delete move atomically with every referent, with no direct writer or collector alternate.
11. Client operation states are `pending | committed | conflicted | retryable-failed | terminal-failed`. They remain attached to the affected object until acknowledged or superseded.
12. Owner handle mutation uses an opaque-ID owner resource, never the public release URL/ETag. No wildcard `If-Match`, slug migration/reuse, local/remote identity copy, silent storage reset, or automatic conflict merge exists.
13. Color-name submissions, tag vocabulary, reports, Principal lifecycle and AdminGrants use stable IDs and attributed, separately clocked decisions. Review never hard-deletes its evidence.
14. Principal lifecycle is a closed transition graph: `active→suspended`, `suspended→active`, and `active|suspended→closed`; `closed` is terminal. Suspend/reactivate/close advance the Principal AuthFence `policyEpoch`, so no session from an earlier epoch can become live again. A suspended Principal cannot recover and owned public Handles are suppressed. Close additionally records immutable `closedAt`, makes every credential/grant ineligible through the terminal Principal status, retires the same permanent PublicHandle NamespaceClaim without deleting it, queues one bounded owner-close aftermath, and preserves pseudonymous audit/fork/report provenance. That aftermath may purge content only after it has explicitly transitioned each still-active owned Handle to the ordinary trashed/purge state below; it never sends an active Handle directly to `seal`. No grant may be created for a closed Principal.
15. Retiring a TagDefinition never mutates an immutable Release. Workspaces may display a retired tag but must remove it before Publish; historical Releases retain `{tagId,labelAtPublish}` as non-filtering text.
16. Initial admin authority comes only from the deployment-only one-time bootstrap transaction in `PALETTE-FACILITIES.md §3`. Its tombstone is permanent and the application server exposes no bootstrap route. The exact admin scope universe is the frozen eleven-scope set in §Initial authority. Each PrincipalAuthority stores fixed-position reference counts/union bits and at most eleven active grant IDs; a new grant is a nonempty unique sorted subset and must add at least one scope absent from the current union or returns `409 grant_redundant`. Create/revoke updates the bounded projection transactionally while immutable grant rows retain history. Every authorization reads that projection and at most its eleven active grants. For each required scope in frozen scope order it selects the lexicographically least active grant ID containing that scope, de-duplicates those IDs and ASCII-sorts the result; that exact `grantIds` witness set is written to the CommandReceipt, AuditOutbox and AuditEvent with the sorted required `scopes`. Product commands requiring no admin scope use `scopes=[]` and `grantIds=[]`; deployment bootstrap likewise uses empty sets because workload identity, not a product Grant, authorizes it. A leased aftermath inherits the cause command's actor/scopes/grantIds rather than inventing worker authority. It never scans grant history. Root eligibility is `Principal.status=active` plus projected `grant:write ∧ principal:close`. Every grant/status change CASes AuthorityGuard and adjusts exact `eligibleCount` by the target's before/after eligibility delta, aborting zero with `409 last_root_authority`; it does not scan all Principals. Periodic reconciliation computes the full frozen set digest outside the command critical path and compares count/digest, but it is evidence/repair—not a second authority. The shared guard write serializes cross-target changes; authority loss never reopens bootstrap.
17. One normalized color name has at most one pending or approved claim. Proposal creation CASes/creates its `ColorNameSlot`; concurrent claims produce exactly one success and one `409 color_name_claimed`. The first claim creates `ColorNameSlot.claimRevision=1`; every later claim of a vacant retained slot increments it exactly once, and the immutable Proposal stores that resulting value as `claimedRevision`. Approval preserves that claim generation. Reject/withdraw clears the matching active/approved pointer without changing the generation; the decision's `policyRevision` supplies the simultaneous representation clock. Legal policy transitions are pending→approved/rejected/withdrawn and approved→withdrawn; rejected/withdrawn are terminal. A review command must match both `expectedClaimRevision=slot.claimRevision` and `proposal.claimedRevision=slot.claimRevision` plus the matching proposal pointer. A later proposal advances only the Slot's current generation, so an old Proposal's strong tag remains reconstructible from its own stored `claimedRevision` and Policy row and no old attempt can be re-approved after a successor claims the slot.
18. PublicHandle and every historical PaletteHandle slug are permanent namespace claims. Registration, Workspace/Handle creation and rename must insert the one `(namespace,normalizedSpelling)` NamespaceClaim in the same transaction as the subject; the subject stores its claim ID. Rename first inserts the new claim, retires the old claim and advances the Handle under one generation CAS. Close retires the PublicHandle claim. Any Handle purge first retires its still-active PaletteHandle claim in the **same transaction** that inserts the identity tombstone and removes the live subject; there is no instant at which a live spelling points at an absent Handle. Retired rows remain forever, so rename-away/close/purge and a concurrent claimant serialize on the same unique collection and yield one success plus one named `409 public_handle_claimed` or `409 palette_slug_claimed`; a spelling can never resolve to another subject. A normalized TagDefinition key is likewise never reused after retirement; concurrent creation yields one success and one `409 tag_key_claimed`.
19. Because a PaletteRelease is immutable, one Principal may create at most one Report for one Release. `(actorId,targetReleaseId)` is unique forever; a same-command retry replays, a different concurrent/repeated command returns `409 report_exists` with the requester's stable report reference, and resolve/dismiss never releases that identity or deletes evidence. Report creation stores `targetPaletteId` and an immutable target snapshot of the named Release/ContentObject. While any Report references it, that snapshot, Release identity and ContentObject are pinned; moderation review never depends on a later live Handle or mutable active release. An open Report has `appliedEffect=null`. A terminal review stores exactly one immutable result: `{kind:"none"}` for dismissal or a no-policy resolution, `{kind:"palette-policy",targetPaletteId,beforeRevision,afterRevision,moderation}` for a palette effect, or `{kind:"release-policy",targetReleaseId,beforeRevision,afterRevision,moderation}` for a release effect. The policy CAS, review revision, actor/reason/time, applied-effect record, audit and receipt commit atomically; no later policy change rewrites those before/after coordinates.
20. Forking one visible immutable Release creates a new unpublished lineage, never another Release or a mutable clone under the source identity. The exact request supplies `{slug}`; the transaction permanently claims that spelling, creates the destination Handle/Workspace/clear PalettePolicy, copies the source manifest with `basedOnReleaseId`, records the fork edge/audit/receipt, and returns the new resource clocks. Any active or retired destination spelling yields `409 palette_slug_claimed` with no partial lineage or edge.
21. Command identity never depends on a Principal that the command is about to create. The server derives one receipt namespace, validates one canonical UUIDv7 command ID, and reserves `(receiptNamespace,commandId)` before the effect. Registration uses the literal `registration` namespace; recovery uses the resolved PublicHandle claim identity; authenticated mutations use the authenticated Principal identity. A completed same-binding receipt decrypts and emits its permanently stored response tuple, a different binding is `409 idempotency_key_reused`, and no secret or bearer enters a receipt or binding digest. Internal effect identity is not replay authority.
22. `fork_edges.targetPaletteId` is unique forever. One source Release may have many destination lineages, but each fork-born destination has exactly one origin edge and cannot later be attached to a different source. The edge, destination claim/Handle/Workspace/Policy and receipt commit or abort together.
23. An authenticated command cannot erase the authorization needed to replay its own completed receipt. A revoked session's one-way digest is retained only through its fixed natural `expiresAt`, after which the session row/digest is TTL-purged; the permanent CommandReceipt and audit event remain. Every authenticated receipt binds the exact initiating `authSessionId` and sorted grant IDs that supplied its original authority. Receipt lookup precedes current Principal/fence/scope evaluation but can return **only** a completed, same-binding, non-secret result. A live session may retrieve its own completed receipt even if its former scope was later revoked. A revoked or stale-policy session may do so only when its row says that same `commandId` revoked it; a current rotation-successor session may do so only when `issuedByCommandId` equals that command. Any other command, receipt miss, session mismatch, natural expiry or different revoker follows ordinary 401/403 and can never execute under tombstone authority.
24. One per-Principal AuthFence closes admission/effect races without advancing the public Principal ETag on every command. The command wrapper first performs exact completed-receipt precedence; absent completion, its transaction inserts the unique invisible intent, and only the unique-insert winner CAS-writes the **actor** `lockRevision`, rechecking session, Principal status, `issuedPolicyEpoch`, and exact non-revoked grant union before any effect. A duplicate waits for commit and restarts the wrapper to read the receipt; an invalid winner aborts, so its intent is never visible. A fence/write-conflict retry restarts the **entire** receipt-precedence/reservation wrapper, not merely a stale authorization tail. A cross-Principal lifecycle/credential/grant policy command also CAS-writes the **target** fence; identical actor/target uses one write, otherwise fences are acquired in ascending Principal UUID order, then AuthorityGuard when required. Lifecycle, grant and credential changes share these fence writes; every transaction retry repeats every check. Suspend/reactivate/close and credential rotation advance the affected target's `policyEpoch`. Every registration/recovery/rotation issuance or replay, after acquiring the fence and before writing a session, re-reads the exact receipt-bound/current `credentialId`, verifies that credential is still active, recomputes its verifier against the role-appropriate supplied secret, and rechecks Principal status plus fence epoch. Registration atomically creates Principal, AuthFence `{lockRevision:1,policyEpoch:1}`, and first session. If issuance/effect commits first, a concurrent actor/target policy change conflicts and retries; if policy commits first, the stale command fails 401/403 with zero receipt/effect writes. Authentication requires an unexpired, unrevoked session whose `issuedPolicyEpoch` equals the current actor fence epoch.
25. Public fork discovery never discloses a private destination or actor. A source Release's public fork list/count includes a destination only while that destination's current active Release passes the same public access predicate; unpublished, private, trashed, owner-suppressed or policy-withdrawn targets are skipped, and continuation advances from the last scanned edge. Internal provenance retains every edge. A destination appears after Publish and disappears after unpublish/trash/withdrawal without deleting its origin.
26. `PlatformState(primary-ready)` is inserted only in the atomic bootstrap transaction. Every product transaction requires it; before it exists, product reads/mutations return `503 platform_uninitialized` and perform zero writes, while `/health` reports not ready and the DB-direct bootstrap command remains operable. This prevents anonymous registration from permanently pre-empting initial authority.
27. Every Publish mints its immutable Release with `publicHistory=true`; clients cannot set/toggle it and no later command mutates it. Once a second Release becomes active, the first remains publicly readable only while the lineage and that Release still pass the shared predicate. Owner reads remain complete; unpublish/trash/owner suspension hides the whole lineage, while ReleasePolicy withdrawal suppresses only its target.

## 3.1 Command contract

`PALETTE-FACILITIES.md §3` freezes every exact route spelling before implementation; W1 only reproduces current-wire failures against it. `If-Match` always identifies the route target; a command that spans another mutable resource carries its second expected clock in the typed body and request digest.

| Command | Target/auth | Required preconditions | Transaction/result |
|---|---|---|---|
| create workspace | owner collection / session | `Idempotency-Key`; canonical body | permanently claim slug, acquire `+workspaces(d)`, insert handle+workspace+the exact actor-attributed `"lineage created"` clear policy+audit+receipt in one transaction; return IDs and both ETags |
| patch workspace | workspace UUID / owner | workspace `If-Match`; command key | always canonicalize/byte-check requested content; CAS revision and, only for `A≠B`, atomically apply `-workspaces(A)+workspaces(B)`+audit+receipt; same-digest collision aborts, same bytes move no counter; return workspace ETag |
| publish | workspace UUID / owner | workspace `If-Match`; body exactly `{expectedHandleGeneration}`; command key | verify both clocks, acquire `+releases(workspaceDigest)`, insert immutable Release with server-set `publicHistory=true` plus the exact publisher-attributed `"release published"` clear policy, swing handle, catalog+audit+receipt; return handle/release/workspace representations and clocks |
| patch owner handle | opaque handle UUID / owner | handle `If-Match`; command key | rename inserts new permanent claim + retires old claim + CASes generation; other lifecycle transition+audit+receipt; return handle ETag |
| restore release | workspace UUID / owner | workspace `If-Match`; exact `{releaseNo}` restricted to the linked lineage; command key | copy manifest to workspace, atomically apply `-workspaces(old)+workspaces(selected)` when distinct, advance revision+audit+receipt |
| vote put/delete | visible palette lineage / principal | current access predicate; command key | edge+projection+audit+receipt |
| fork release | visible immutable release / principal | current access predicate; command key; exact `{slug}` | acquire `+workspaces(sourceDigest)` with permanent destination claim + generation-1 private Handle + revision-1 copied Workspace + the exact actor-attributed `"lineage created"` clear policy + provenance edge/audit/receipt; claimed slug is named 409 |
| report release | visible immutable release / principal | current access predicate; command key; report uniqueness by actor+release | first insert acquires `+reports(targetDigest)` with durable report+audit+receipt; duplicate/replay adds zero and a distinct duplicate is stable 409 |
| admin policy/review | policy/review UUID / scoped admin | policy/review `If-Match`; command key | policy/review+audit+receipt; return named actor/scope/result |
| principal suspend/reactivate | Principal UUID / `principal:write` | Principal `If-Match`; legal source/op; command key | AuthFence policy advance + bounded PrincipalAuthority eligibility delta + guard count CAS + one projection-invalidation marker + audit + receipt; old sessions fail by epoch |
| principal close | Principal UUID / `principal:close` | Principal `If-Match`; active/suspended source; explicit confirmation; command key | bounded AuthFence/guard transaction makes status terminal, applies eligibility delta, retires handle claim, inserts one projection-invalidation marker, and commits audit + terminal receipt; the delayed `principal-aftermath` job only transitions owned active Handles to trashed/private and creates/verifies their ordinary palette purge jobs |
| grant/revoke scope | Principal/grant UUID / `grant:write` | Principal or grant ETag; command key | bounded PrincipalAuthority update + guard eligibility delta + immutable exact creation reason/GrantAttribution or one revocation + audit + receipt |
| propose color name | normalized-name slot / session | command key; canonical parsed color/name and bounded evidence | CAS/create slot + immutable attributed proposal + initial pending policy + audit + receipt; occupied slot is named 409 |
| decide/withdraw color name | proposal policy + normalized-name slot / `name:review` | policy `If-Match` built from stored Proposal `claimedRevision`; typed `expectedClaimRevision` for the current Slot; command key | require current slot revision/pointer to match the Proposal's stored claim generation, then CAS decision/reason/actor and slot together + audit + receipt; proposal persists; reject/withdraw releases slot |
| create/retire tag | permanent normalized tag-key claim / `tag:write` | definition `If-Match` for retirement; command key | unique create or named 409; retirement retains namespace + audit + receipt and performs zero Release writes |
| resolve/dismiss report | report UUID / `report:review` | report `If-Match`; expected policy clock when effect changes policy; command key | review + optional policy CAS + audit + receipt in one transaction |

## 4. Command transactions

### Receipt identity, binding, and secret-bearing routes

Every target HTTP mutation requires an `Idempotency-Key` whose value is the canonical lowercase RFC 9562 UUIDv7 spelling; malformed, uppercase, wrong-version or wrong-variant values fail `400 idempotency_key_invalid` before domain work. The caller generates it once with a cryptographic RNG and W15 persists it before the first send. For secret-bearing routes, JSON is bounded to 1 KiB and unknown fields are rejected. `ReceiptNamespace` is the exact stored string union defined by the following three rows; consumers copy that value byte-for-byte and never infer, hash or respell it. The server—not a request field—derives exactly one namespace:

| Caller/route | `receiptNamespace` | Derivation |
|---|---|---|
| anonymous registration `POST /sessions` | `registration` | one literal global namespace; UUIDv7 entropy makes the pre-Principal key globally usable |
| anonymous recovery `POST /sessions/recover` | `recovery:<publicHandleClaimId>` | canonical PublicHandle lookup plus successful verification of its active credential; an invalid/closed/suspended case emits the same `401 recovery_invalid` and creates no receipt |
| authenticated HTTP mutation | `principal:<principalId>` | initial execution requires the current authenticated Principal; the completed-receipt-only branch may derive the same Principal from the exact retained session tombstone defined below; no body/slug may select it |

`PALETTE-OPERATIONS-REPLAY-CONTRACT.md §1` defines the sole `CommandBinding` value and domain-separated binary `requestBindingDigest`. The browser persists only the canonical non-secret request shell needed to resend, not an authoritative server digest or unavailable claim ID. Recovery secrets, new credentials and session cookies are absent from the binding—not even generally hashed—while the secret-bearing receipt records the non-secret `credentialId` that authorized or was created by the first completed effect. Every authenticated receipt records the opaque initiating `authSessionId` and sorted immutable minimal grant witness; it never stores a bearer.

`RecoverySecret` has one wire grammar: ASCII `rs1_` followed by the unpadded base64url encoding of exactly 32 CSPRNG bytes. The suffix is exactly 43 characters; decoding must yield 32 bytes and re-encoding must reproduce the received suffix byte-for-byte, which rejects padding, noncanonical tail bits, whitespace and Unicode lookalikes. Browser creation uses `crypto.getRandomValues(new Uint8Array(32))`; bootstrap uses an equivalent OS CSPRNG. The server can prove canonical size, not the caller's entropy source. Bounded JSON-envelope/key/type validation happens before receipt lookup, but canonical-secret validation is role-sensitive after that lookup: a proposed secret is `422 recovery_secret_invalid`; a current proof, including a matching-registration replay secret or recovery secret, is the single `401 recovery_invalid` when malformed or wrong. Rotation always sends exactly `{currentRecoverySecret,newRecoverySecret}`. With no receipt, current is proof (`401`) and new is proposal (`422`); with a matching completed receipt, `currentRecoverySecret` is ignored and `newRecoverySecret` alone becomes current proof of the receipt-bound credential (`401`). Bootstrap treats its input as a proposed secret and rejects malformed input before its transaction. Plaintext never enters logs, receipts, outbox, storage or response bodies.

The verifier is not a vague password KDF. Decode the 32 bytes and canonicalize `credentialId` as the 36-byte lowercase ASCII UUID. The exact HMAC message is `ASCII("value.js/recovery/v1") || 0x00 || uint32be(36) || credentialIdASCII || uint32be(32) || secretBytes`; integers are unsigned four-byte big-endian and no terminator/JSON/base64 text is included after decoding. Compute HMAC-SHA-256 under the secret-manager key, persist only `{credentialId,verifierKeyId,recoveryMac}`, and compare the 32-byte MAC in constant time. Unknown claim/credential cases execute one dummy HMAC before the same generic response. New credentials use the current key ID; an old verification key remains verify-only until the last credential naming it is revoked/rotated, then is removed—there is one algorithm and no plaintext rehash path. W10 freezes independent vectors, key-ring retirement and response/resource ceilings.

Browser session transport is singular. `SessionToken` is ASCII `st1_` plus canonical unpadded base64url of exactly 32 CSPRNG bytes; its suffix is 43 characters and passes the same decode/re-encode rule as recovery material. Only `SHA-256(ASCII("value.js/session/v1") || 0x00 || tokenBytes)` persists, where `tokenBytes` is the decoded exact 32 bytes; no prefix text/base64/padding is hashed after decoding, and comparison is constant-time. A malformed cookie is generic 401. A session has one absolute 30-day (`2_592_000s`) horizon from `issuedAt`; reads may update diagnostic `lastSeenAt` but never extend `expiresAt`. The cookie deliberately carries neither `Max-Age` nor `Expires`; the server row alone enforces the absolute horizon, an earlier browser-session drop is harmless, and revoked rows TTL-purge at that same server expiry.

The only browser credential is that token in `__Host-value-session`, issued in the sole exact order `Path=/; Secure; HttpOnly; SameSite=Strict` with no `Domain`, `Expires` or `Max-Age`. The canonical production browser endpoint is same-origin `https://color.babb.dev/api/**`; W33 owns the fail-closed reverse-proxy route to the private API origin, and the client uses only relative `/api` URLs. Local development likewise uses one browser origin through its dev proxy. Direct browser access to `api.color.babb.dev`, cross-origin credentialed CORS, and a second transport path are absent. Registration/recovery set a fresh cookie and return no bearer field. Rotation sets a replacement session carrying `issuedByCommandId`; if headers applied but the response body was lost, that successor can retrieve only the creating receipt instead of being misclassified as another session. If headers were lost, the command-marked predecessor can replay and receive another command-linked successor.

Logout and self-suspend/self-close effect responses deliberately leave the now-revoked/stale HttpOnly cookie in place until its browser-session end or the row's fixed server expiry. The client durably records the terminal receipt, then re-derives state through existing `GET /sessions/me`; its 401 does **not** emit cookie expiry, so a late stale response can never delete a newer rotation cookie by name. Body loss before durable observation can still resend the exact command. There is no anonymous status endpoint or second settlement credential. `Authorization`, `X-Session-Token`, local/session storage and JavaScript-readable session tokens are absent. Every unsafe browser request—including anonymous session creation—requires the exact four-field origin/fetch tuple frozen in the trusted-edge contract; safe browser reads use that exact fetch tuple or a wholly absent CLI/operator tuple. A partial tuple is never treated as evidence. Failure is `403 origin_forbidden` before credential/domain work, and the API emits no CORS allow-origin/credentials headers.

Authenticated receipt precedence is exact. Hash the presented cookie and look up the retained session record, validate the canonical command key, derive `principal:<principalId>`, compute the non-secret binding, and look for that receipt **before** evaluating current Principal status or grants only for the exact receipt-bound session. A completed receipt whose `authSessionId` matches makes the key identity authoritative: the same binding returns only its canonical non-secret result, while another binding returns `409 idempotency_key_reused`. If the still-live session has since lost scope, this is retrieval of an already-authorized effect, not new authorization. A revoked/stale-policy record enters this branch only when `revokedByCommandId` equals the requested command ID; this covers logout, credential rotation and a self-suspend/self-close transaction that revoked its initiating session. Receipt miss, natural expiry, or revocation by another command falls through to ordinary authentication failure and never reaches a domain handler. A different, currently valid session cannot retrieve another session's result: it passes the ordinary Principal/fence/grant check, then an occupied Principal command key returns non-result-bearing `409 idempotency_key_reused` (`403` if that session lacks the route scope), never a false 401. The only extension is a current session minted by that same rotation receipt and carrying `issuedByCommandId=commandId`; it may retrieve that receipt's non-secret result but no other command. With no matching completed receipt, the transaction reserves its invisible intent first, then the unique winner's AuthFence step rechecks an active unexpired current-epoch session, active Principal and current route-authorizing grant set before effect. Thus a tombstone discloses no receipt oracle, an active browser is not spuriously signed out, and no stale admission can authorize a new effect.

Registration precedence is exact. First parse only the ≤1 KiB JSON envelope, exact keys and string types; do not decide canonical-secret role until receipt lookup:

1. Validate the UUIDv7 key and canonicalize the requested PublicHandle. Compute the non-secret binding.
2. In the same transaction that would create identity, first insert `("registration",commandId)` intent. A duplicate waits for the winner and re-reads its permanent receipt; an aborted winner leaves neither intent nor identity.
3. A completed receipt with another binding returns `409 idempotency_key_reused` **before** any NamespaceClaim decision. A matching receipt treats `recoverySecret` as current proof, so malformed and wrong are both `401 recovery_invalid`; after taking the AuthFence it re-reads the receipt-bound credential, verifies it is active and recomputes the HMAC before checking active Principal state and issuing.
4. An authorized matching retry returns the original non-secret Principal/PublicHandle result and transactionally issues a fresh independently valid session cookie through the Principal issuance CAS; it never re-creates the Principal, claim or credential and never replays a stored token. Transport duplication alone does not revoke a sibling response's still-valid session; normal expiry, authenticated revocation and Principal lifecycle remain the bounds.
5. With no completed receipt, `recoverySecret` is a proposed credential and malformed canonical form is `422 recovery_secret_invalid`; the same transaction completes the already-reserved intent from step 2 while inserting the permanent PublicHandle claim, Principal, all-zero PrincipalAuthority, credential verifier, initial session and audit. It does not insert a second intent. The completed receipt binds the resulting Principal, claim and credential IDs but stores no bearer.
6. Only after the no-receipt branch is known may an existing active **or retired** claim return `409 public_handle_claimed`. Thus two replicas carrying the same command produce one identity and authorized replay, while two distinct commands for the same handle produce one `201` and one named claim conflict. The same command with two handles produces one effect and one `409 idempotency_key_reused`.

Recovery treats `recoverySecret` only as current proof: malformed and wrong are the same `401 recovery_invalid`. It performs canonical claim lookup and one dummy-or-real constant-policy verification, then derives `recovery:<publicHandleClaimId>`. Its completed receipt is bound to the verified credential ID; each same-key replay session issuance takes the AuthFence, re-reads that exact active credential and recomputes its verifier, so replicas may each receive a fresh valid cookie but create one permanent authorization effect. A rotated/revoked credential or inactive Principal remains the same 401. Authenticated credential rotation uses the Principal namespace and its body is always exactly `{currentRecoverySecret,newRecoverySecret}`. The no-receipt branch treats current as proof (`401` if malformed/wrong), treats new as proposal (`422` if malformed), CASes the AuthFence against lifecycle, advances `policyEpoch`, inserts the new verifier, stores its non-secret `credentialId` on the receipt, revokes the old verifier, marks the initiating old session with this command ID, and issues a replacement session at the new epoch atomically. Every other old-epoch session becomes invalid immediately. A completed same-key retry from the marked old session or command-linked successor ignores `currentRecoverySecret`; after taking the AuthFence it re-reads the receipt-bound new credential, treats re-entered `newRecoverySecret` as current proof (`401` if malformed/wrong), recomputes its HMAC, and only then issues a fresh replacement cookie and returns non-secret completion. A different new secret therefore cannot be mistaken for the winning rotation even though no secret digest enters the request binding. The deployment bootstrap is outside HTTP and is serialized by its permanent singleton tombstone; leased workers use their own durable lease/tombstone identities rather than impersonating a receipt namespace.

### Save workspace

1. Start a Mongo transaction and insert the unique `(receiptNamespace, commandId)` intent with `requestBindingDigest` **inside that same transaction**.
2. Read the Workspace by `id`, then its linked Handle by `workspace.paletteId`; require `handle.id=workspace.paletteId`, `handle.workspaceId=workspace.id`, `handle.ownerId=actorId` and `handle.lifecycle=active`. Ownership/lifecycle live only on Handle and are never invented as duplicate Workspace fields.
3. Form the complete resulting Workspace, canonicalize its content, and perform the mandatory ContentObject byte comparison even when the old and new digest are equal. Through the sole reference port, derive `-workspaces(old)+workspaces(new)` only when distinct; same-digest/same-bytes has zero counter delta and same-digest/different-bytes aborts as `content_digest_collision`.
4. Apply the reference result and `updateOne({id,paletteId:handle.id,revision:expected}, …)` in the same transaction, advancing revision once and inserting the audit-outbox intent. Zero matches aborts every reference/counter change and becomes policy-safe 404 or 412 after the scoped read.
5. Encode and encrypt the exact bounded success status/header/body tuple, replace the intent with that completed permanent receipt, and commit. No other process can observe a half-claim; a crashed/aborted transaction leaves no claim, Workspace change or counter delta.
6. A concurrent duplicate waits on the unique insert outcome, then re-reads the committed receipt. The same binding decrypts and emits the stored response bytes without reading or reconstructing any resource; a different binding is `409 idempotency_key_reused`. Neither the completed receipt nor its encrypted replay envelope expires. Internal `resultReference`/tombstone metadata may aid operations but never supplies or enriches replay bytes.

The compact receipt/effect row and its logical replay are permanent. `PALETTE-OPERATIONS-REPLAY-CONTRACT.md §§2–4` freezes the deterministic-CBOR status/header/body plaintext, exact AES-256-GCM AAD and four binary envelope fields, authorized decryptor, 65,536-byte precommit ceiling and CAS rewrap/key-retirement protocol. Replay emits those stored bytes and never reads a later mutable revision; `Set-Cookie` is not stored. There is no expiring or reconstructed replay enrichment. Product “purge” deliberately excludes CommandReceipts and immutable AuditEvents; no UI or canon may describe palette material purge as erasure of legal/audit/idempotency records.

Every receipt-transaction attempt is bounded to 30 seconds and obtains a fresh majority read of `ReplayKeyState={epoch,currentKeyId,changedAt}` before it begins; every driver/write-conflict retry starts from completed-receipt precedence and re-reads the state. Rotation majority-commits the new singleton epoch before rewrap, retains the old decrypt key, and waits a full 30-second writer drain. A pre-rotation attempt may commit the predecessor key only within that drain and is therefore visible to the later scan. Only after the drain may rotation collect two complete epoch-stable zero-receipt scans separated by at least 30 seconds plus an independent majority-snapshot zero count; an epoch change restarts the drain and proof. Thus an in-flight old writer cannot create a post-drain old-key receipt, and client references are never invented as a retirement surrogate.

Session rows are not deleted before natural expiry. Logout sets `revokedAt`, `revokedByCommandId` and a reason while retaining the opaque ID and one-way digest through `expiresAt`; TTL then purges that session row while permanent receipt/audit identity remains. `DELETE /sessions` inserts its receipt intent, binds the initiating session, marks that session revoked by the same command, writes audit, completes the receipt and commits atomically. If its response is lost, the still-present cookie can retrieve only that exact completed logout result; a fresh command from it is 401. Self-suspend/self-close advance the AuthFence `policyEpoch` to invalidate every session and mark at least the initiating row with their command ID in the same transaction; the receipt's exact `authSessionId` means another stale session cannot retrieve the result. Grant revocation does not revive revoked scope: a same-session matching completed receipt is readable before the new scope check, while any new command is evaluated against the reduced grants.

Registration, recovery, credential rotation, and session issuance do not store or replay plaintext secrets through command receipts, request-binding digests, outbox bodies or response envelopes. Recovery material uses the exact canonical 32-byte `rs1_` grammar above, is generated and shown once by the client, transmitted only over TLS, and immediately reduced to the versioned HMAC verifier above. An authenticated principal may rotate recovery material; rotation atomically advances `policyEpoch`, revokes the old verifier and all old-epoch sessions, and gives the initiating browser a replacement cookie. Public-handle regeneration is retired because handle display identity is not a credential. Session issuance has its own nonce/expiry/revocation contract and AuthFence CAS; an authorized anonymous retry may issue another valid cookie but cannot repeat a domain mutation.

### Initial authority bootstrap

The initial admin is created only by the deployment-only `admin:bootstrap` operation specified in `PALETTE-FACILITIES.md §3`, never through Hono. Trusted workload identity authorizes a single fresh-schema transaction; the operator supplies an offline-kept `{publicHandle,recoverySecret}` over stdin, where the secret is the exact OS-CSPRNG-generated canonical 32-byte `rs1_` form above. Before the transaction the command mints one canonical UUIDv7 `correlationId` using current Unix milliseconds and OS-CSPRNG random bits; the transaction persists it on the BootstrapRecord and sole bootstrap AuditOutbox row. It creates the singleton platform-ready/bootstrap tombstone, permanent PublicHandle NamespaceClaim, Principal and AuthFence `{lockRevision:1,policyEpoch:1}`, HMAC recovery verifier, the exact initial scopes `{audit:read,name:review,palette:review,principal:read,principal:write,principal:close,grant:read,grant:write,tag:read,tag:write,report:review}`, the initial Grant with `attribution={kind:"bootstrap-workload",bootstrapRecordId:"initial-admin"}` and `creationReason="initial authority bootstrap"`, PrincipalAuthority with all eleven unit counts/bits and that grant ID, AuthorityGuard `{epoch:1,eligibleCount:1}`, and the exact bootstrap outbox event/projection above. Ordinary delivery creates the sole AuditEvent. The workload arm is the sole bootstrap creator representation; the new Principal is not mislabeled as self-grantor, and deployment identity/commit remain in the referenced BootstrapRecord and audit projection rather than duplicate Grant or AuditEvent DTO fields. The application binary has no bootstrap handler; plaintext is cleared from the deployment process/input channel and only the verifier persists; the tombstone survives all Principal/Grant lifecycle changes. Re-running on any database containing platform state, the tombstone, AuthorityGuard, a Principal, PrincipalAuthority or a Grant fails closed. Until that atomic commit, `/health` is not ready and every product route returns `503 platform_uninitialized` with zero writes; the DB-direct deployment command remains available. W16 proves malformed-input rejection, registration-versus-bootstrap fencing and concurrent invocations yield one transaction; W33 records non-secret deployment provenance, and ordinary scoped grants own every later authority change.

### Root-authority serialization

Eligibility is derived from current Principal status plus its bounded PrincipalAuthority projection; no single “root grant” flag or historical-grant scan is authority. The guard epoch is internal and is never a client precondition or public route. A grant create/revoke or Principal suspend/reactivate/close transaction acquires the actor/target fences, reads the target's before-state eligibility, CASes `authority_guards({_id:"root-authority",epoch:observed})` to `epoch+1`, applies the target/projection mutation, derives after-state eligibility, and adjusts `eligibleCount` by exactly `-1|0|+1`. A resulting zero aborts `409 last_root_authority`; no command enumerates other Principals. An aborted transaction leaves target/count/epoch unchanged, and every write-conflict retry recomputes the target delta.

Reconciliation reads AuthorityGuard epoch `E`, then scans Principals in canonical UUID order and, for each, derives the expected projection from indexed non-revoked immutable grant rows (the active set is bounded by eleven), compares it to PrincipalAuthority, and derives eligible IDs from active status plus the expected bits. It sorts canonical lowercase 36-byte ASCII Principal UUIDs and computes SHA-256 `ASCII("value.js/root-eligible/v1") || 0x00 || uint32be(count) || Σ(uint32be(36) || principalIdASCII)`, with unsigned four-byte big-endian integers. After the bounded paged scan it re-reads AuthorityGuard; if epoch is not still `E`, the observation is discarded and retried. Only an epoch-stable observation records `lastReconciledDigest/reconciledAt`. A mismatch is a named platform fault; any projection/count repair CASes epoch `E` and revalidates each affected Principal/grant-derived projection plus the final count inside its transaction. Reconciliation is evidence/repair, never an alternate request-time authority path. Thus two holders concurrently performing authorized self-removal contend on the singleton: one commits, the other retries against count one and returns the named 409, while cross-target mutual removal lets the winning removal cause the other actor's retried fence check to fail ordinarily. Large-cardinality commands retain constant target work.

### Lifecycle semantic close and bounded aftermath

Suspend/reactivate/close are one bounded semantic transaction, never a receipt-delaying close job. The transaction acquires distinct actor/target fences in ascending Principal UUID order (one when self-directed), then revalidates their actor/target roles, advances target `policyEpoch`, CASes AuthorityGuard with the target's bounded eligibility delta, applies the legal transition, marks the initiating session when self-directed, inserts exactly one `(principalId,policyEpoch)` projection-invalidation marker, and on close records `closedAt`, retires the permanent PublicHandle claim and inserts one unique `principal-aftermath` job with `eligibilityAt=closedAt+30 days` plus the close receipt's exact `causeReceiptNamespace`, `causeCommandId`, edge-minted `causeCorrelationId`, actor and frozen authority arrays; the one audit outbox row and terminal CommandReceipt commit with those effects. Public reads always join owner Principal status, so this O(1) status predicate suppresses every owned public Handle immediately even if catalog rows remain. Current authentication/recovery/grant likewise joins active Principal status and the current fence, atomically invalidating older sessions and making every credential/grant ineffective without scans. The leased aftermath does only the exact `handles→complete` scan below: transition owned active Handles to trashed/private and create or verify their ordinary palette purge jobs. It never rebuilds a separate catalog projection, annotates session/credential/grant rows, reopens authority, delays/revises the receipt or gates public suppression. Lost response before/after that aftermath replays the same terminal semantic result.

### Release ancestry

An ordinarily created Workspace starts with `basedOnReleaseId` absent; a fork-created Workspace starts with the selected external source Release and its destination's unique fork edge names that same source. Ordinary display/color/tag edits preserve the field. Restore accepts only a Release in the Workspace's own lineage and sets `basedOnReleaseId` to that selected Release while copying its bytes.

Publish derives ancestry only from the saved Workspace base. With no base it writes both `parentReleaseId` and `sourceReleaseId` absent. With a base whose `paletteId` is the destination lineage it writes `parentReleaseId=base.id` and no source. With an external fork base it writes no parent and `sourceReleaseId=base.id`, and requires the destination's unique fork edge to name that same Release. A successful Publish then sets the Workspace `basedOnReleaseId` to the newly created Release in the same transaction, making later publishes local descendants. No request body supplies either ancestry coordinate and an edit cannot erase or switch the base.

Provenance walks the unique `parentReleaseId` chain nearest-first and, only at its root, may append the one external `sourceReleaseId` hop. That source must cross lineages and agree with the retained fork edge; the fork edge is a consistency cross-check, never a second branch or an additional displayed hop. A cycle, same-lineage source, cross-lineage parent, source plus parent on one Release, mismatched fork edge or second origin is a fail-closed consistency fault.

### Publish

In one transaction: insert receipt intent; CAS the workspace `If-Match` revision and typed `expectedHandleGeneration`; acquire one Release reference to the Workspace's already-owned ContentObject through the sole reference port; derive the one ancestry arm above; insert the next palette-local immutable release manifest with server-owned `publicHistory=true` **and its initial clear `ReleasePolicy` carrying `reason="release published"`, `actorId=publisherId` and the same transaction time**; swing `activeReleaseId`; set the Workspace base to the new Release; set visibility public; increment generation; update the current catalog projection and increment CatalogBuildState `dirtyRevision`; commit audit and receipt. The request has no history, ancestry or policy-rationale field and no later route changes it. The response returns all resource identities and clocks.

### Restore a release

Copy the selected same-lineage immutable Release content into the private Workspace under Workspace CAS, atomically release its old Workspace digest/acquire the selected digest when they differ, and set `basedOnReleaseId` to that Release. The next Publish creates its local child. History is never rewritten and a foreign lineage Release can never be adopted by ID.

### Fork

Target the stable visible release identified by route slug plus palette-local release number and re-evaluate the shared access predicate inside the transaction. The request body is exactly `{slug}`; server normalization must match every other PaletteHandle claim. In one transaction: insert the command intent; insert the permanent `(palette-slug,normalizedSpelling)` NamespaceClaim for the new Handle or return `409 palette_slug_claimed`; acquire one Workspace reference to the source Release's existing ContentObject; create an owner-attributed Handle at `generation=1`, `lifecycle=active`, `visibility=private`, `activeReleaseId=null`; create its Workspace at `revision=1` with the source Release's display name, ordered named colors and canonical tags, `basedOnReleaseId=sourceRelease.id`, and canonical content digest; create clear PalettePolicy at `policyRevision=1` with `catalogTier="standard"`, `reason="lineage created"`, `actorId=actorId` and the same transaction time; insert the immutable fork edge under unique `targetPaletteId=destinationHandle.id`, retaining internal `sourceReleaseId`; increment CatalogBuildState `dirtyRevision`; and complete audit/receipt. No destination Release exists until the owner explicitly publishes, and neither exact public fork truth nor a future rank epoch includes it before then. The response is exactly the Wire's `ForkResult`: `basedOnReleaseId=sourceRelease.id` plus the Handle and Workspace representations and their body clocks; the internal edge field is not a second public key. Any claim/access/write conflict—including a second origin edge for that destination—aborts every row and its reference delta, so no orphan claim, partial lineage, edge or counter survives. Public fork reads join current access and never emit actor identity; publish may make the target appear, while unpublish/trash/withdrawal removes it without deleting the durable edge. The result is an owned workspace, not a mutable clone of the source release.

### Report

The first unique `(actorId,targetReleaseId)` Report transaction acquires one permanent Report reference to the target ContentObject while storing the immutable target snapshot. A completed replay and a distinct duplicate add zero. Review changes only Report/policy state and never releases the Report reference; the Report and its counter remain permanent moderation evidence.

### Vote

Replace toggle with declarative `PUT` and `DELETE` against the palette lineage. When membership changes, the edge, exact returned current vote count and one CatalogBuildState `dirtyRevision` increment share the transaction. A distinct already-satisfied command changes none of those three but completes its receipt and byte-equal audit transition; a replay creates neither receipt nor event. Publish does not reset the vote.

### Trash, withdrawal, purge

Every PurgeJob persists the triggering CommandReceipt's exact `causeReceiptNamespace`, `causeCommandId`, edge-minted `causeCorrelationId`, actor and frozen authority arrays; none is hashed, respelled or replaced by worker identity, and no second episode identity exists. One purge episode is uniquely identified by `(kind,subjectId,causeReceiptNamespace,causeCommandId)`; correlation is immutable provenance, not another key. `queued|leased` is **schedulable**; `complete|cancelled` is terminal retained history. Terminal rows never count as a current/pre-existing schedulable job and are never reused or rewritten for a later episode. For every live PaletteHandle, `active` implies zero schedulable palette jobs and absent `trashedAt/trashedByReceiptNamespace/trashedByCommandId/purgeAfter`; `trashed` implies exactly one schedulable palette job whose `subjectId`, `causeReceiptNamespace`, `causeCommandId` and `eligibilityAt` equal the Handle's `id`, `trashedByReceiptNamespace`, `trashedByCommandId` and `purgeAfter`. The Handle state/CAS is the serialization point, so no second active-job collection or compatibility state exists.

Owner trash CASes the Handle to `trashed`, records `trashedAt`, `trashedByReceiptNamespace=<the r15 CommandReceipt.receiptNamespace>`, `trashedByCommandId` and exact `purgeAfter=trashedAt+30 days`, removes it from public catalog, increments CatalogBuildState `dirtyRevision`, and inserts the one queued palette purge episode with the same subject/namespace/command/eligibility coordinates plus r15's exact `causeCorrelationId`, actor and empty product-authority arrays. Workspace/releases remain during that grace interval. Restore before the seal transaction CASes the Handle to `active/private`, clears `trashedAt/trashedByReceiptNamespace/trashedByCommandId/purgeAfter`, increments the dirty revision and CASes **that exact matching schedulable episode** to `cancelled`; a lease holder that loses either CAS performs no deletion. The cancelled row remains immutable history, does not violate the active-Handle invariant and cannot block a later owner-trash or Principal-close episode, including one whose distinct receipt namespace legally owns the same raw command UUID. Admin withdrawal changes only separately clocked moderation policy and preserves the offending release/report evidence.

A `principal-aftermath` job has phases `handles→complete`. At its already-delayed `eligibilityAt=closedAt+30 days`, `handles` scans only Handles with `ownerId=subjectId` in ascending ID pages of at most 100. Its cursor is `null|{kind:"handle",id:UUID}` and means strictly greater than `id`. In one transaction per batch it rechecks that Principal is still closed with the same `closedAt`. An active Handle must have zero **schedulable** palette jobs; any number of immutable `cancelled` histories is permitted and ignored. It is then CASed to `lifecycle=trashed`, `visibility=private`, `generation+1`, `trashedAt=closedAt`, `trashedByReceiptNamespace=causeReceiptNamespace`, `trashedByCommandId=causeCommandId`, and `purgeAfter=eligibilityAt`; that same transaction removes its catalog row, increments CatalogBuildState `dirtyRevision`, and creates the new purge episode at the already-reached eligibility with the inherited close namespace, command, correlation, actor and authority arrays. A queued/leased job on an active Handle is a fail-closed platform fault. A Handle already trashed is not reclocked and must already have exactly one schedulable job matching its stored `purgeAfter`, `trashedByReceiptNamespace` and `trashedByCommandId`. An absent, terminal-only, mismatched or multiple schedulable episode is `platform_consistency_fault`; the whole batch aborts before cursor or progress-count advance. No job is reconstructed for a pre-existing trashed Handle. A Handle not owned by that closed Principal is untouched. The same transaction advances the exclusive cursor, the sole inherited-correlation `purge-batch` outbox row and a `progressCounts` object whose schema has exactly five required properties and `additionalProperties:false`: `{scannedHandles,transitionedActiveHandles,alreadyTrashedHandles,verifiedPaletteJobs,createdPaletteJobs}`. It enforces `scannedHandles=transitionedActiveHandles+alreadyTrashedHandles`, `createdPaletteJobs=transitionedActiveHandles`, and `verifiedPaletteJobs=alreadyTrashedHandles`; a missing or sixth key is a platform fault, never a repair opportunity. Because closed is terminal and owner authorization requires active status, an owner-close-transformed Handle has no legal restore; nevertheless its palette job still enters the same `seal` CAS and cannot bypass it. The aftermath reaches `complete` only after an empty page; it never deletes a Workspace, Release, Handle or claim itself. Public/auth suppression remains immediate and never waits for this scan.

Lease acquisition is `findOneAndUpdate` over `eligibilityAt<=Mongo $$NOW` and `state=queued` or an expired lease, ordered by `(eligibilityAt,jobId)`. It increments `leaseEpoch`, stores a canonical worker UUID and `leaseUntil=$$NOW+30s`; the owner renews every 10s by exact `(jobId,leaseOwner,leaseEpoch,state=leased)` CAS. A lost lease stops before the next write. A batch and its cursor/count advance are one transaction; observing no next row advances the phase and resets its cursor to `null` in one transaction. Every committed row-processing batch, empty-page phase advance and completion transaction inserts exactly one `purge` outbox row under the construction table; lease acquisition/renewal inserts zero. The following four phases belong only to `kind=palette`; `principal-aftermath` uses the disjoint two-phase machine above:

1. `seal`: with cursor `null`, CAS the still-trashed Handle/generation and expired `purgeAfter`; retire its still-active slug claim, insert the permanent Handle tombstone, delete its catalog row and PalettePolicy, and delete the private Workspace if present while releasing exactly one Workspace reference through the sole per-digest port. If that release makes the exact reference sum zero, delete the ContentObject synchronously and increment `deletedContentObjects`; otherwise retain its exact counters. Then clear the owner link, remove the live Handle, increment CatalogBuildState `dirtyRevision`, set counts `sealedHandles=1` and `deletedWorkspaces=0|1`, and advance the job. This is one transaction. Restore and seal therefore have exactly one winner, and no sealed digest or later candidate scan exists.
2. `releases`: cursor `null|{kind:"release",releaseNo:uint,id:ResourceId}` is exclusive under `(releaseNo ASC,id ASCII ASC)`. For at most 100 Releases, permanently retain the live Release/ReleasePolicy/ContentObject when any Report names `targetReleaseId`, incrementing `retainedReportPinnedReleases` and changing no reference counter. Otherwise insert the exact private Release tombstone `{subjectId,paletteId,releaseNo,parentReleaseId?,sourceReleaseId?,contentDigest,retiredAt,reason}`, delete that Release and ReleasePolicy, and release one Release reference per deleted row in the same batch transaction. Aggregate reference deltas by digest and touch digests in lowercase ASCII order; if the post-delta sum is zero, delete that ContentObject once and increment `deletedContentObjects` once. Increment `tombstonedReleases/deletedReleasePolicies` per deleted Release. The tombstone's digest is a non-owning provenance coordinate; replay always decrypts the permanent response bytes already stored on the receipt and never resolves through this row.
3. `edges`: cursor `null|{kind:"vote",id:UUIDv7}` is exclusive under vote-edge ID ASCII order. Delete at most 100 vote edges whose `targetPaletteId` is the purged lineage and increment `deletedVoteEdges`. Retain fork edges in either source or destination position, all Reports, AuditEvents/Outbox history and every NamespaceClaim; unavailable public provenance projects only its ordinal tombstone step.
4. `complete`: require only the phase-specific cursor representation, the subject Handle tombstone and accumulated scalar result-count equations, then set `state=complete`, clear lease/cursor and record `completedAt`. It does not retroactively recompute a discarded Workspace/Release content delta: the sole port validated and committed each touched digest inside its originating `seal` or `releases` transaction, where an injected counter/object mismatch aborts that transaction before cursor/count advance. Production completion never scans unrelated Workspaces/Releases/Reports, acquires a global lock or invokes a reconciliation writer. The exact palette result counts are `{sealedHandles,deletedWorkspaces,tombstonedReleases,retainedReportPinnedReleases,deletedReleasePolicies,deletedVoteEdges,deletedContentObjects}`. Principal-aftermath freezes its validated progress object unchanged as `resultCounts`; that schema has length five, exactly `{scannedHandles,transitionedActiveHandles,alreadyTrashedHandles,verifiedPaletteJobs,createdPaletteJobs}`, and `additionalProperties:false`—no missing, sixth or repair key. Form `resultBytes=UTF8(RFC8785({schema:"value.purge-result/v1",jobId,kind,subjectId,causeReceiptNamespace,causeCommandId,causeCorrelationId,causeActorId,causeScopes,causeGrantIds,eligibilityAt,completedAt,resultCounts,handleTombstoneId?}))` with `handleTombstoneId` required only for palette, and store `resultDigest=lowerhex(SHA-256(ASCII("value.js/purge-result/v1") || 0x00 || uint64be(byteLength(resultBytes)) || resultBytes))`. Completed/cancelled jobs retain no body, name, slug, color, content digest or free-form actor payload; the literal cause receipt namespace/correlation and typed cause coordinates above remain immutable provenance.

This operation is domain compaction, not erasure of legally/idempotently retained records. CommandReceipts remain encrypted and exact; audit, reports, claims, fork edges and tombstones remain. Slugs are never reused, report review stays possible, no batch can precede `seal`, and retrying any phase is idempotent under its target/tombstone unique keys.

## 5. HTTP shape

`PALETTE-FACILITIES.md §3` is the sole complete method/path authority and `PALETTE-WIRE-CONTRACT.md` its sole decoder/query/DTO/problem authority. The resource boundaries below are a synopsis, not a second route registry:

- `/sessions` registers; `/sessions/recover` requires public handle plus recovery credential; `/sessions/me` resolves the principal.
- `/me/workspaces` lists owner workspaces; `/workspaces` creates one, and `/workspaces/:id` reads/patches with workspace ETag.
- `/workspaces/:id/releases` publishes with workspace `If-Match` plus typed `expectedHandleGeneration`.
- `/palette-handles/:id` is the owner-only slug/visibility/lifecycle resource and uses the handle ETag; `/palette-handles/:id/releases` is its distinct owner-only immutable history scan across active or trashed lineages.
- `/palettes/:slug`, `/palettes/:slug/releases`, `/palettes/:slug/releases/:releaseNo`, `/forks` and `/provenance` are public r17–r21 resources governed only by the public predicate. Authentication never turns those routes into owner history; r50 alone carries that capability.
- `/palettes/:slug/votes` targets the visible lineage; `/palettes/:slug/releases/:releaseNo/forks|reports|provenance` targets the visible immutable release.
- `/me/workspaces?state=unpublished|published|trash` is a total disjoint server-owner classifier: `trash` means `lifecycle=trashed`; `unpublished` means active with `activeReleaseId=null`; `published` means active with a nonnull active Release, regardless of current public/private/moderation state. Items in `published` carry separate visibility/moderation badges, so unpublish does not pretend history vanished. Device drafts are never returned by this route.
- admin routes require a named scoped admin principal. The impersonation route is deleted.

All target HTTP mutations use the canonical caller-owned UUIDv7 `Idempotency-Key` and server-derived receipt namespace above; all mutable-resource commands use `If-Match` for their target clock. `PALETTE-FACILITIES.md` plus `PALETTE-WIRE-CONTRACT.md` are the terminal 52-current-route/five-export disposition and exact 50-target-route contract. W1 reproduces that manifest against mounted routes, clients and UI; it may not defer scope, spelling, body, query, cursor, result or Problem decisions to execution. Public-handle regeneration, generic batch/import/prune, impersonation and destructive review deletion are RETIRE. The five existing palette export formats are BUILD with persistent user-visible failure state.

## 6. Client state

- Session state has one reactive owner derived from `GET /sessions/me`; the browser never owns, reads or persists the HttpOnly cookie. A read 401 settles that owner as signed out. A mutation 401 is ambiguous until the current auth-transition lease holder performs a fresh `/sessions/me`; it never directly signs out or deletes a cookie.
- Auth transitions are serialized across tabs by one IndexedDB `auth-transition/v1` record `{ownerTabId,leaseEpoch,expiresAt,cookieDrainUntil}` acquired in a readwrite transaction. Owner IDs are ephemeral UUIDv7s, epochs increase monotonically, the 30-second lease renews every five seconds while a request is live, and registration/recovery/rotation hold it through the complete response. The successor's ten-second drain reduces overlap with the edge's origin-settlement window but is explicitly not browser/network causality. `BroadcastChannel("value-auth/v1")` is notification only. After every transition or ambiguous mutation 401, the current lease holder calls `/sessions/me`, commits only its current epoch, broadcasts, and peers re-derive. Mutation 401s never clear auth directly and no 401 response expires the cookie. If an already-emitted stale same-name cookie wins at the user agent, the stale server token remains unauthorized and the Account surface enters the explicit signed-out/recovery state defined in `research/auth-cookie-order.md`; V does not claim the newer cookie survived.
- A user intent durably writes `{commandId, route, targetClocks, canonicalNonSecretRequest, state}` to an IndexedDB outbox **before** send and reuses it across reloads/retries; the server alone computes `requestBindingDigest`, and terminal completion compacts the shell to the resource result. A registration/recovery intent persists only the UUIDv7, canonical handle request shell and visible state—never a claim-ID preflight, recovery secret or cookie—and requires secret re-entry after reload. Credential rotation likewise never persists old/new secret material: after reload the client asks for both retained old and new values because the wire envelope is invariant, reuses the durable command shell, and lets receipt lookup decide their roles. The no-receipt branch verifies old/proposes new; the completed branch ignores old and verifies only new against the receipt-bound credential.
- IndexedDB `DeviceDraft` starts at revision one; every committed display/color/tag mutation advances it exactly once with its canonical content digest and complete selected-tag projection. It has an explicit Promote/Save action into a server workspace. A remote palette never silently becomes a local draft.
- A client export operation persists the exact `PALETTE-EXPORT-CONTRACT.md` snapshot before serialization and the exact prepared bytes/SHA/MIME/filename before exposing Download. A ready or handoff-initiated reload consumes those bytes without reserialization; dirty Workspace overlay cannot wear a saved server revision, and no tag is filtered to make capture pass.
- Two-device conflicts offer three explicit choices: load remote, duplicate local as a new device draft, or discard local. No merge fallback.
- `DeviceDraft`, unpublished `ServerWorkspace`, cached `WorkspaceReplica`, Published lineage, and Trash are separate types and UI sections. “Draft” never denotes both local and server identity.
- Pending and failure state remains on the workspace/palette action instrument. Expiring chips may decorate success but never replace status.

## 7. Clean data cut

W10 authors DB authentication, bootstrap and target foundations; it does not trust or mutate old identity. W11–W14 own one offline transformer over the **exact nine** current collections, in this fixed source order: `palettes`, `palette_versions`, `votes`, `sessions`, `proposed_names`, `tags`, `flags`, `admin_audit`, `users`. Existing slug-session ownership cannot prove a Principal and no export can securely deliver a replacement credential. No legacy row therefore creates a live Principal, credential, session, grant, owned Workspace or owner-attributed Release.

Before classification, every document must satisfy `LEGACY-PALETTE-SOURCE-CONTRACT.md`, the closed field/type/enum/date/key/reject authority for all nine collections. An unknown/missing field or structurally malformed row rejects the whole snapshot; it cannot be hidden in an offline class. Let `P+` be a valid palette with `deletedAt=null`, `visibility=public` and `tier∈{standard,featured}`; `P-` is every other valid palette, including private, unlisted, archived and deleted. Only `P+` is eligible for a live target lineage. A `P+` row must have a claimable canonical slug, valid display/content/tag data and a complete valid current version graph or the whole run rejects. Every `P-` row is offline-only content: it creates no live Handle, Workspace, Release, ContentObject, policy or catalog row. A claimable `P-` slug receives a retired palette-slug claim and matching handle tombstone; a reserved/noncanonical spelling is already unacquirable under the target grammar and receives only an opaque tombstone plus an explicit offline disposition. Thus the cut contains **zero inaccessible private/unlisted legacy Handles**.

### Nine-collection disposition matrix

On a zero-reject candidate, every source row appears once in the **restricted encrypted** `cut-dispositions.ndjson`, even when it also contributes to a target row. A rejected run instead emits the closed reject file and no dispositions/provenance/target rows. Every raw row appears in the same versioned encrypted cut bundle. Row-level dispositions, provenance, rejects and target rows are never tracked. `RETIRE` below means no target runtime reader, compatibility row or aggregate survives.

| Current collection | Online target | Retired online semantics | Offline archive |
|---|---|---|---|
| `palettes` | each valid `P+` becomes one system-attributed, unowned, active/public read-only Handle, active claim, clear policy and catalog row; each `P-` becomes only a handle tombstone and, when claimable, a retired claim | mutable aggregate, owner slug, inline OKLab cache, `unlisted`, `archived`, mutable-public state, counters and old `forkOf*` discovery | complete raw row and its terminal classification |
| `palette_versions` | each version belonging to `P+` becomes exactly one immutable system-attributed Release plus canonical ContentObject reuse and clear ReleasePolicy; a version outside `P+` becomes a release tombstone only | hash-as-resource ID, legacy author attribution, old root/depth API and `forkedFromHash`/`parentHash` slug provenance outside the local release chain | complete version graph and every retired provenance field |
| `votes` | none; target vote edges/rank contribution start at zero | slug-authenticated votes and stored `voteCount` | every edge, including duplicates or dangling references |
| `sessions` | none; only a nonnull `userSlug` may contribute to the cross-collection retired-handle reservation set | every old token digest, IP binding and slug-auth session; no session can authenticate the target | restricted encrypted archive; token/IP fields never enter target/log/provenance |
| `proposed_names` | an `approved` row with valid canonical color/name and non-colliding target slot becomes one system-attributed Proposal, approved Policy and occupied Slot | pending/rejected queues and contributor identity; they are not silently presented as target review work | all statuses and source attribution |
| `tags` | every valid unique row becomes one active system-attributed TagDefinition; live Release tag IDs resolve only through this map | delete/cascade semantics and free-form palette strings | raw label/category and source ID |
| `flags` | none; target Reports start empty | slug-attributed mutable-palette flags and aggregates | all evidence/reporter fields |
| `admin_audit` | none; target audit begins with target bootstrap/cut provenance | IP/shared-admin attribution and free-form payload authority | immutable ordered audit archive |
| `users` | no Principal; all legacy identity spellings participate in permanent public-handle reservation below | slug-only identity, status and inferred ownership | complete user row |

`PaletteRelease.attribution=system`, `actorId=null` and `commandId=null` are legal only for this transformer; normal Publish remains Principal-attributed and command-bound. A cut-created clear PalettePolicy/ReleasePolicy likewise starts with the exact pair `reason=null,actorId=null`; its first ordinary policy command replaces both with the normalized reason and real Principal, and every later mutation remains attributed. Runtime r9/r24/r12 constructors instead use the exact actor/rationale constants above and cannot enter this null arm. The same closed exception applies to transformed TagDefinitions and approved color-name rows (`attribution=system`, nullable creator/actor). Their APIs label the source as legacy system data and never invent the bootstrap administrator as author.

All cut-created mutable clocks start at one: Handle `generation`, NamespaceClaim `claimRevision`, PalettePolicy/ReleasePolicy `policyRevision`, TagDefinition `revision`, approved ColorNamePolicy `policyRevision`, and ColorNameSlot `claimRevision`. Each cut-created approved ColorNameProposal stores `claimedRevision=1`, exactly matching its occupied Slot. No legacy counter becomes a target clock.

### Version, tag and identity mapping

Normalize every claimable palette spelling once; two distinct source rows resolving to one target spelling reject before target creation. For each `P+`, require `currentHash` to name exactly one `palette_versions` row whose `paletteSlug` is the same canonical slug and whose full name/color payload equals the current palette payload; require source `versionCount` to equal that palette's version-row count. Every version in that `P+` graph independently passes the source contract's target display/absolute-color/name/canonical-content validation or rejects as `LEGACY_VERSION_TARGET_CONTENT_INVALID`; history cannot inherit validity from the current row. A version may not carry both `parentHash` and `forkedFromHash`. Every nonnull `parentHash` must resolve to a version in the same palette and every nonnull `forkedFromHash` must resolve somewhere in the nine-collection snapshot. With effective predecessor `e=parentHash ?? forkedFromHash`, require `e=null ⇒ rootHash=_id ∧ depth=0`, otherwise require `rootHash=predecessor.rootHash ∧ depth=predecessor.depth+1`; the full predecessor graph must be acyclic. Local Releases are numbered by Kahn topological order over `parentHash`, with the ready set ordered by `(createdAt epoch-millisecond ASC, legacy hash ASCII ASC)`. `parentReleaseId` maps only that local edge. Legacy cross-lineage fork/social provenance is retained offline but creates no target `fork_edge` or actor claim. The Release mapped from `currentHash` is the Handle's active Release and receives the palette row's current canonical tag set; historical Releases receive `canonicalTags=[]` because the source versions did not record historical tags. Every transformed Release has `publicHistory=true`. No synthetic current Release, guessed parent, or timestamp tie-break exists.

Transform every `tags` row through the exact target key/label/category laws. IDs are keyed by normalized tag key; a duplicate normalized key, invalid row, or live palette tag that is invalid, duplicated after normalization, or does not resolve to exactly one transformed TagDefinition rejects the run. Transform approved names through the exact ColorNameSlot and absolute-color laws; invalid color/name, missing `approvedAt`, or two approved rows colliding in one normalized slot likewise rejects. Pending/rejected rows remain explicit offline-only dispositions rather than target aliases or a quarantined queue.

The legacy identity set is the union of nonnull `users._id`, `palettes.userSlug`, `palette_versions.authorSlug`, `votes.userSlug`, `sessions.userSlug`, `proposed_names.contributor`, `flags.reporterSlug` and `admin_audit.actorSlug`. Equal raw spellings coalesce; two distinct raw spellings that canonicalize to one claimable target spelling reject because the transformer cannot prove they are one person. Each distinct identity gets an opaque principal tombstone. Each claimable, non-reserved spelling additionally gets one **retired** `public-handle` NamespaceClaim whose `subjectType=principal` and `subjectId` is that tombstone's subject ID. An invalid/reserved spelling keeps its source row's one collection disposition but receives no `BUILD_RETIRED_PUBLIC_HANDLE_CLAIM` action; it is already intrinsically unclaimable and needs no redundant claim. No legacy PublicHandle can later be acquired and mistaken for the old actor.

A NamespaceClaim created by the cut never dangles. An active palette-slug claim points to its live `P+` Handle. A retired palette-slug claim points to the matching `P-` handle tombstone. A retired public-handle claim points to the matching principal tombstone. A release tombstone uses the same deterministic subject ID that any retained provenance reference names. Final verification requires exactly one live subject or same-type tombstone for every claim subject, never both.

### Deterministic construction and artifacts

The fixed UUID namespace is `260186db-e601-5280-b3ba-e32e6027e24d` (RFC 9562 UUIDv5 of URL namespace string `https://color.babb.dev/data-cut/v4`). For source collection `c` and canonical Extended JSON `_id` bytes `K`, `sourceKeyDigest=lowerhex(SHA-256(ASCII("value.js/legacy-source-key/v1") || 0x00 || uint32be(byteLength(c)) || ASCII(c) || uint32be(byteLength(K)) || K))`. For raw legacy identity UTF-8 bytes `R`, `sourceIdentityDigest=lowerhex(SHA-256(ASCII("value.js/legacy-identity/v1") || 0x00 || uint32be(byteLength(R)) || R))`.

A target document's canonical key is also closed. Let `I=UTF8(RFC8785(CANONICAL_EJSON_V2(document._id)))`; every target document must carry its final physical `_id` before transformation output. Then `targetKeyBytes=uint16be(byteLength(collectionASCII)) || collectionASCII || uint32be(byteLength(I)) || I`, and the JSON spelling is `targetKey="tk1_" + lowerhex(targetKeyBytes)`. Collection names are lowercase ASCII `[a-z][a-z0-9_]*`; `targetKey` therefore matches `^tk1_[0-9a-f]+$`, round-trips to the byte string and has the same order under ASCII comparison as unsigned byte comparison. A target key is never a display slug or an inferred compound index.

Every cut-owned UUID is `uuidv5(namespace, UTF8(kind + NUL + canonicalSourceKey))` under this closed table:

| Kind | Canonical source key |
|---|---|
| `palette-handle` | canonical `P+` slug |
| `palette-release` | canonical `P+` slug + NUL + lowercase legacy version hash |
| `namespace-claim` | literal namespace + NUL + normalized spelling |
| `principal-tombstone` | normalized claimable identity, otherwise `sourceIdentityDigest` |
| `palette-handle-tombstone` | `sourceKeyDigest` for the `palettes` row |
| `palette-release-tombstone` | `sourceKeyDigest` for the `palette_versions` row |
| `tag-definition` | normalized tag key |
| `color-name-proposal` | `sourceKeyDigest` for the `proposed_names` row |

ColorNamePolicy identity is its proposal ID and ColorNameSlot identity is its normalized-name byte string; neither invents a UUID. UUID collisions or a UUID resolving to unequal canonical source keys reject. Content IDs remain the canonical content digest and require byte equality on reuse.

No transformer call reads wall-clock time or randomness. Before either run, the deployment owner generates `cutId` once as a canonical lowercase UUIDv7 and freezes the source-write-stop time as RFC 3339 millisecond `cutInstant`. `transformerGitTree` is exactly the 40-lowercase-hex object ID from `git rev-parse HEAD^{tree}`. Time mapping is closed: live Handle/claim `createdAt|claimedAt=palette.createdAt` and Handle/palette-policy `updatedAt=palette.updatedAt`; Release/ReleasePolicy `createdAt|updatedAt=version.createdAt`; TagDefinition `createdAt=updatedAt=tag.createdAt`; approved Proposal `createdAt=proposedName.createdAt` and its Policy/Slot `updatedAt=approvedAt`; deleted-palette claim/tombstones retire at `deletedAt`; every other offline/tombstone/public-handle retirement uses `cutInstant`. Missing/invalid required dates on a target-producing row reject. Same restricted `cut-input.json` means same times.

#### Closed logical files

Every standalone `.json` below is `UTF8(RFC8785(value)) || LF`: no BOM, indentation, CR or second LF. Every NDJSON line is `UTF8(RFC8785(row)) || LF`; an empty NDJSON file has zero bytes. Counts/byte lengths are JSON safe unsigned integers, digests are exactly 64 lowercase hex, and omitted optionals are absent rather than `null` unless a schema below names `null`.

`cut-source.ndjson` is extracted first. It visits the fixed nine collections in the order printed at the start of §7. Within a collection, rows sort by unsigned canonical Extended JSON v2 `_id` bytes and then, solely to break a duplicate-ID tie, by the unsigned full canonical-document bytes. Its exact row is `{"collection":NAME,"document":CANONICAL_EJSON_V2}`. Physical Mongo record order never enters the artifact. A row's `rowOrdinal` below is its one-based position within that collection in this file.

The immutable pre-run `cut-input.json` value is exactly:

```text
{
  schema:"value.data-cut-input/v1",
  cutId,
  cutInstant,
  transformerGitTree,
  sourceCollectionCounts:{palettes,palette_versions,votes,sessions,proposed_names,tags,flags,admin_audit,users},
  source:{name:"cut-source.ndjson",byteLength,digest}
}
```

The count object contains exactly those nine keys, including zeros. `source.digest` uses domain `value.js/legacy-source/v1`. Once written, neither source nor input is rewritten.

With zero rejects, `cut-dispositions.ndjson` has exactly one line for every source line and preserves the same line order. Its row is the source-contract shape `{"collection":NAME,"sourceKeyDigest":HEX64,"disposition":CODE,"targetActions":[ACTION...],"targetKeys":[TARGET_KEY...]}`. `CODE` is the one first-match terminal disposition; `targetActions` and `targetKeys` are unique and ASCII-sorted under the source contract's closed action vocabulary and the `targetKey` encoding above.

`cut-provenance.ndjson` has one row for every `(source row,target action,target row)` relation: `{"collection":SOURCE_NAME,"sourceKeyDigest":HEX64,"targetAction":ACTION,"targetKey":TARGET_KEY}`. It sorts by the source file's row order, then `targetAction` ASCII, then `targetKey` ASCII. For each source row, the unique projections of its provenance rows must equal that disposition row's `targetActions` and `targetKeys`; every target row has at least one provenance row. Reused ContentObjects therefore have one `BUILD_CONTENT_OBJECT` provenance followed by zero or more `REFERENCE_CONTENT_OBJECT` rows, never duplicate target bytes.

`cut-rejects.ndjson` has exact row `{"collection":NAME_OR_CUT,"rowOrdinal":UINT,"code":CODE}` and no detail/prose field. `NAME_OR_CUT` is one of the nine source collections, or literal `cut` with `rowOrdinal=0` for a whole-artifact/construction failure not attributable to one source row. A cross-row failure is attributed to the earliest implicated source row; duplicate identical tuples coalesce. Rows sort by fixed source-collection order with `cut` last, then `rowOrdinal`, then code ASCII. A deployable cut requires this file to have zero bytes. If it is nonempty, dispositions, provenance and target files are zero bytes and no candidate is retained.

`cut-target.ndjson` has exact row `{"collection":NAME,"document":CANONICAL_EJSON_V2}`. Its allowed collection names are exactly `color_name_policies`, `color_name_proposals`, `color_name_slots`, `content_objects`, `identity_tombstones`, `namespace_claims`, `palette_handles`, `palette_policies`, `palette_releases`, `public_catalog`, `rank_snapshots`, `release_policies`, and `tag_definitions`. Rows sort by collection ASCII and then unsigned `targetKeyBytes`; two equal target keys coalesce to one row only when their full canonical document bytes are equal, otherwise they reject. A canonical re-export from each candidate must equal this file byte for byte.

The initial rank epoch has no separate metadata document in the cut artifact. Each of its `|P+|` `rank_snapshots` rows has `_id={epoch:cutId,paletteId}`, embeds the identical `{epoch:cutId,sourceRevision:0,rankedAt:cutInstant,expiresAt}` plus that Release's coordinates/tokens and zero edge-derived `rankVoteCount/rankForkCount`, and sets `expiresAt` by adding exactly 86,400,000 epoch milliseconds to `cutInstant` before RFC 3339 millisecond formatting. The matching `public_catalog` row has `_id=paletteId`. Thus the epoch is self-contained and `rank_snapshots=|P+|`. After target verification, the DB-direct bootstrap creates the runtime-only singleton CatalogBuildState at `dirtyRevision=0,builtRevision=0,publishedEpoch=cutId,publishedAt=cutInstant,publishedExpiresAt=expiresAt`; it is not a fourteenth transformer output collection or a second cut action. W33 must finish archive verification/bootstrap/deploy while that instant is still future; expiry destroys the candidate and requires a new frozen snapshot rather than extending the epoch. When `|P+|=0`, the collection is empty and an empty catalogue emits no continuation; the same singleton still owns future runtime builds. For every `P+` palette source row, the single closed action `BUILD_CATALOG_ROW` maps to exactly **two** provenance relations/target keys: its `public_catalog` row and its `rank_snapshots` row. Both keys appear in that disposition row; there is no unowned epoch row or second rank action.

The restricted post-run `cut-manifest.json` is deterministic and has exactly this value:

```text
{
  schema:"value.data-cut-manifest/v1",
  cutId,
  cutInstant,
  transformerGitTree,
  inputDigest,
  artifacts:[
    {name:"cut-input.json",domain:"value.js/cut-input/v1",byteLength,digest},
    {name:"cut-source.ndjson",domain:"value.js/legacy-source/v1",byteLength,digest},
    {name:"cut-dispositions.ndjson",domain:"value.js/cut-dispositions/v1",byteLength,digest},
    {name:"cut-provenance.ndjson",domain:"value.js/cut-provenance/v1",byteLength,digest},
    {name:"cut-rejects.ndjson",domain:"value.js/cut-rejects/v1",byteLength,digest},
    {name:"cut-target.ndjson",domain:"value.js/legacy-target/v1",byteLength,digest}
  ],
  sourceCollectionCounts,
  targetCollectionCounts,
  dispositionCountsByCode,
  rejectCountsByCode
}
```

`inputDigest` equals the first artifact digest. Source counts repeat the exact nine-key input object. Target counts contain exactly the thirteen allowed target collection names above, including zeros. `dispositionCountsByCode` contains every terminal disposition code; `rejectCountsByCode` contains every physical, semantic and cross-construction reject code; both retain zero counts and RFC 8785 supplies their byte order. The six-entry artifact array order is fixed as printed. This manifest deliberately contains no wall time, encryption nonce/key, object coordinate/version or ciphertext digest: including post-upload state inside its own encrypted plaintext would create a circular artifact. Its own domain is `value.js/cut-manifest/v1` and is recorded by the outer bundle/public manifest.

For any logical byte string `B`, `domainDigest(domain,B)=lowerhex(SHA-256(ASCII(domain) || 0x00 || uint64be(byteLength(B)) || B))`. Its domain parameter accepts exactly the seven logical-file domains `value.js/cut-input/v1`, `value.js/legacy-source/v1`, `value.js/cut-dispositions/v1`, `value.js/cut-provenance/v1`, `value.js/cut-rejects/v1`, `value.js/legacy-target/v1`, `value.js/cut-manifest/v1`, plus framing domain `value.js/cut-bundle/v1` and encrypted-envelope domain `value.js/cut-envelope/v1`. Given the same source/input/tree, two isolated logical runs must produce byte-identical dispositions, provenance, rejects, target, manifest and `bundleBytes`/`bundleDigest`; the random-nonce envelope and its digest are intentionally not equal across encryptions.

#### Bundle framing and encryption

After those two logical runs compare equal, frame exactly seven files in this order: `cut-input.json`, `cut-source.ndjson`, `cut-dispositions.ndjson`, `cut-provenance.ndjson`, `cut-rejects.ndjson`, `cut-target.ndjson`, `cut-manifest.json`. With `files` in that order:

```text
bundleBytes = ASCII("value.js/cut-bundle/v1") || 0x00 || uint16be(7) ||
  concat(file in files,
    uint16be(byteLength(file.nameASCII)) || file.nameASCII ||
    uint64be(byteLength(file.bytes)) || file.bytes
  )
bundleDigest = domainDigest("value.js/cut-bundle/v1",bundleBytes)
```

Lengths must consume the bytes exactly; duplicate/unknown/out-of-order names, trailing bytes or a length mismatch reject. There is no tar, ZIP, compression, filesystem metadata, padding or alternate frame.

Encryption happens once after logical equality. Select one secret-manager 256-bit AES key whose `keyId` matches `[a-z0-9][a-z0-9_-]{0,31}`, draw a fresh unique 96-bit `nonce` from the OS CSPRNG, decode `bundleDigest` to `bundleDigest32`, and construct:

```text
sealedByteLength = byteLength(bundleBytes) + 16
envelopeHeader = ASCII("value.js/cut-envelope/v1") || 0x00 ||
  uint8(byteLength(keyIdASCII)) || keyIdASCII || nonce96 ||
  uint64be(byteLength(bundleBytes)) || bundleDigest32 ||
  uint64be(sealedByteLength)
sealed = AES-256-GCM.seal(KkeyId,nonce96,bundleBytes,aad=envelopeHeader)
envelopeBytes = envelopeHeader || sealed
ciphertextDigest = domainDigest("value.js/cut-envelope/v1",envelopeBytes)
```

`sealed` is ciphertext followed by the 128-bit tag. Nonce reuse under a key is forbidden. Decryption authenticates the header, verifies its lengths and bundle digest, parses every frame, verifies every file/domain digest and manifest count, and only then accepts plaintext. Random-nonce encryption is intentionally not byte-identical across separate encryptions; determinism is proved on `bundleBytes` before the single upload. The immutable object-store upload is fetched back by its exact returned version and decrypted/verified before plaintext destruction. `encryptedObject.byteLength` is the envelope byte length, and its `ciphertextDigest` is the formula above.

The only tracked cut artifact remains redacted `cut-public-manifest.json`, serialized as RFC 8785 plus one LF, with exact value `{cutId,cutInstant,transformerGitTree,sourceCollectionCounts,targetCollectionCounts,dispositionCountsByCode,rejectCountsByCode,logicalDomainDigests,encryptedObject:{coordinate,version,ciphertextDigest,byteLength},completedAt}`. `logicalDomainDigests` is exactly `{input,source,dispositions,provenance,rejects,target,manifest,bundle}`, mapped respectively to the seven file domain digests plus `bundleDigest`; `completedAt` is the post-upload RFC 3339 millisecond time and is not inside the deterministic bundle. The public manifest contains no raw row, row ordinal, source key/source-key digest, identity spelling, slug, target key/primary key, target row, per-row provenance/reject detail, key ID or nonce. All seven logical files exist only in the authenticated encrypted object; plaintext is byte-verified and destroyed from every deployment disk. The tracked aggregate counts and logical digests prove the reviewed object without becoming row-level lookup handles.

On a successful run, with `T` source tag rows, `A` approved-name rows, `H` distinct legacy identities, `Hc` claimable identity spellings, `Pc-` claimable `P-` slugs, `V+`/`V-` versions partitioned by palette class, and `U` distinct byte-equal canonical manifests among `V+`, the cut-owned target equations are:

```text
source.palettes = |P+| + |P-|                 source.palette_versions = |V+| + |V-|
palette_handles = |P+|                        palette_workspaces = 0
palette_releases = |V+|                       content_objects = U
palette_policies = |P+|                       release_policies = |V+|
palette_slug_claims = |P+| + Pc-              public_handle_claims = Hc
handle_tombstones = |P-|                      release_tombstones = |V-|
principal_tombstones = H                      tag_definitions = T
approved_proposals = color_name_policies = color_name_slots = A
public_catalog_rows = |P+|                    vote_edges = fork_edges = reports = 0
legacy_principals = legacy_credentials = legacy_sessions = legacy_grants = 0
```

The physical `targetCollectionCounts` object is therefore fully determined for all thirteen allowed collections; these are collection-row counts, not the logical subtype counts above:

```text
color_name_policies  = A                       color_name_proposals = A
color_name_slots     = A                       content_objects      = U
identity_tombstones  = H + |P-| + |V-|         namespace_claims     = |P+| + Pc- + Hc
palette_handles      = |P+|                    palette_policies     = |P+|
palette_releases     = |V+|                    public_catalog       = |P+|
rank_snapshots       = |P+|                    release_policies     = |V+|
tag_definitions      = T
```

`rank_snapshots` counts only the embedded epoch-entry rows defined above; there is no `+1` metadata row. `identity_tombstones` is the disjoint sum of principal, `P-` Handle and `V-` Release tombstone subtypes, while `namespace_claims` is the disjoint sum of active `P+` palette claims, claimable retired `P-` palette claims and claimable retired public-handle claims.

For each emitted content digest `d`, the cut writes `refs.workspaces=0`, `refs.reports=0`, and `refs.releases` equal to the exact multiplicity of `d` among the `|V+|` live target Releases. Each value is at least one, `Σd refs.releases=|V+|`, and `U` is exactly the number of distinct such digests. Release tombstones for `V-` contribute no reference. These per-digest equations and the global sum are part of both candidate verifications and the canonical target bytes; a zero-count ContentObject or direct post-transform counter repair is forbidden.

For each source collection `c`, `sourceCount[c] = sum(dispositionCount[c,*])`; every target collection count equals the corresponding canonical target line count; every target row has at least one restricted provenance row and every target primary key is unique. Stored `voteCount`, `forkCount` and other legacy aggregates are never copied: the initial exact edge counts and immutable RankEpoch values are computed from the deliberately empty target edge sets. Any failed equation, dangling reference, digest mismatch or nonempty restricted `cut-rejects.ndjson` fails the cut.

### All-or-nothing order

The source enters a write-frozen maintenance window and yields the immutable nine-collection snapshot. The transformer first validates/classifies the complete snapshot, computes every per-digest live-Release multiplicity and emits all deterministic rejects without touching a target. With zero rejects it creates a uniquely named, uninitialized candidate database and writes in this referential order: canonical TagDefinitions/approved-name objects/ContentObjects with their final derived Release reference counts; principal tombstone+retired-claim pairs; `P-` tombstone+retired-claim pairs and release tombstones; `P+` claim/Handle/policy then topologically ordered Releases/ReleasePolicies and final active-release pointer; catalog/rank projections. The candidate remains unreachable by every application process throughout. Final indexes, count equations, per-digest reference traversal and canonical byte re-export must all pass; the exact seven-file logical bundle is then encrypted, uploaded and byte/digest/version verified; only then does the DB-direct bootstrap create target identity/platform state. The full target is reverified, and only the new application deploy receives its single database credential.

Any reject/write/archive/bootstrap/verification failure destroys the whole candidate, leaves the source untouched and produces no deployable target. A correction requires a newly reviewed source snapshot and digest; the transformer cannot skip, rewrite, quarantine or default a row. W33 stores the authenticated seven-file bundle encrypted offline, records logical/envelope digests and immutable object version, destroys local plaintext, revokes every old runtime database credential, and gives the application no archive/source reader. There is no dual read, migration shim, alias, partial seed or masked fallback; `cut-rejects.ndjson` is evidence, never a runtime quarantine collection. Startup never references a deleted historical migration script.

## 8. Real-stack matrix

W16 runs Hono plus the typed W15 transport against an authenticated replica set and two API processes. W22–W24/W30 run production-browser journeys against that same fixture. Together they demonstrate:

- the exact nine-collection cut twice from one manifest: byte-identical IDs/times/release order/artifacts; all count/digest/reference equations; no live private/unlisted/archived legacy row; permanent legacy-handle reservation; tag/name map-or-reject; and whole-candidate destruction on each injected reject/failure before one verified bootstrap;
- anonymous private detail/history/fork denial;
- public-handle disclosure cannot recover a session;
- same-command anonymous registration delivered to two replicas creates one receipt/claim/Principal/credential effect and returns authorized non-secret replay plus fresh valid sessions; same key with another handle is `409 idempotency_key_reused`, same handle with a wrong/revoked secret is generic `401 recovery_invalid`, and two distinct keys for one handle yield one `201` plus one `409 public_handle_claimed`;
- same-command recovery delivered to two replicas derives one `recovery:<claimId>` receipt after verifier success, repeats no authorization effect, returns no stored bearer, and creates no receipt for invalid/closed/suspended identities;
- same-command credential rotation through two replicas inserts one new verifier/revokes one old verifier; a lost-response replay with the winning new secret returns non-secret completion, while another new secret fails without a second rotation and no old/new secret appears in browser persistence, receipt, digest or logs;
- concurrent registration for one normalized PublicHandle, registration versus close of that handle, two PaletteHandles renaming to one destination, and rename-away versus another create/rename claiming the old slug all contend on permanent NamespaceClaim rows; each pair yields one success/one named conflict, no claim row disappears, and no retired spelling is reusable;
- two concurrent initial-bootstrap invocations against a fresh schema create exactly one Principal/PublicHandle claim/Grant/bootstrap tombstone; the Grant has exactly the frozen eleven scopes, every later invocation fails, and no HTTP bootstrap surface exists;
- two active root-eligible Principals concurrently perform authorized self-revoke/suspend/close: the shared AuthorityGuard permits exactly one success, the other returns `409 last_root_authority`, `eligibleCount=1`, and epoch-stable full reconciliation records the matching derived projection/digest; a separate cross-target mutual-removal race yields one success and an ordinary actor-fence 401/403 with zero second effect, while large-cardinality commands retain bounded per-target reads/writes;
- concurrent same-normalized-name proposals yield one proposal and one `409 color_name_claimed`; reject/withdraw releases the slot for a new immutable attempt without erasing history;
- concurrent duplicate TagDefinition creation yields one definition/one `409 tag_key_claimed`, and retirement never permits key reuse;
- audit subject construction, persistence, delivery and r30 projection preserve the exact closed discriminated pair; query vectors admit neither filter, a type-wide `subjectType`, or its correctly typed pair, and reject a bare `subjectId`, wrong kind/version/grammar, any platform value except `primary-ready`, explicit null and duplicate keys as `422 query_invalid`;
- concurrent or later second reports by one Principal against one immutable Release yield one Report and one `409 report_exists` carrying only that caller's typed report reference; the pinned target snapshot remains reviewable after active-release change/purge and review never releases the identity;
- two same-generation writes yield exactly one success and one 412;
- identical content yields independent local release histories;
- double trash/restore cannot drift counters;
- one command sent to two API replicas mutates once and replays identically;
- vote failure injection preserves the edge plus exact returned current count and advances the singleton CatalogBuildState dirty revision exactly once without a rival counter or per-mutation event;
- a burst before one builder snapshot coalesces into one candidate, a mutation immediately after that snapshot is covered by the next publish within the 60-second outer bound, and crashes before/after the single publish-plus-ack CAS leave respectively the old or new epoch authoritative without a false `builtRevision`; incomplete epochs remain unreachable and expire by their row TTL;
- current counts, rank counts and the popular score accept `9_007_199_254_740_991` where the individual field/formula permits it; the next aggregation or weighted-score overflow fails `platform_consistency_fault`, emits no imprecise number/cursor and cannot publish or acknowledge an epoch;
- 500 nonmatches followed by a match returns a usable continuation;
- publish/revert/fork preserve local identity and immutable history;
- fork with a fresh slug creates exactly one private unpublished Handle/Workspace/clear Policy and provenance edge from the selected Release; `fork_edges.targetPaletteId` is the permanent unique origin key, many destinations may cite one source, and no destination can gain a second source; two distinct-command forks toward the same destination spelling produce one complete lineage and one `409 palette_slug_claimed`, with zero partial claims/edges/releases, while the same command delivered twice replays the one result;
- expired rank epochs return restart-required without duplicates/skips; catalog lag is rechecked through the current access predicate and cursors advance from the last scanned row;
- first Publish→second Publish leaves both Releases public, unpublish/trash/owner suspension hides the entire history, and one ReleasePolicy withdrawal hides only its target;
- the signing proxy strips spoofed forwarding/edge identity, rejects missing/duplicate identity, bad Host/time/key/MAC/method/target/body/client-IP bindings before route work, maps IPv4-mapped addresses to IPv4 and IPv6 addresses to their exact /64 abuse subject, and emits only the closed log allowlist;
- two processes at fixed Mongo time admit exactly 5/10m registration new effects, 10/15m recovery failed proofs per source and 5/15m recovery failed proofs per handle; exact completed registration replay and correct recovery proof/replay bypass hostile exhaustion, dummy/absent failures remain indistinguishable, no registration-handle budget exists, and key rotation/TTL timing cannot reset a live row;
- registration/recovery/rotation origin responses obey the fully buffered ten-second/65,536-byte edge boundary, while an explicit post-emission response-order negative proves the browser can replace a same-name cookie; the stale token authorizes nothing, `/sessions/me` fails closed, and the UI enters visible recovery without claiming preservation of the newer session;
- delayed, failed, lost, stale, and retried responses produce visible persistent UI truth across reload.

Mocked Playwright flows may remain interaction unit tests, but they cannot satisfy any row above.


---

<!-- ===== verbatim: PALETTE-WIRE-CONTRACT.md ===== -->

# Tranche V — Palette Wire Contract

This file is the closed DTO/query/error authority consumed by `PALETTE-FACILITIES.md §3`. A route row may narrow a named schema; it may not add an ad-hoc key, `Record<string,unknown>`, offset path, alternate envelope or second normalizer. W1 records current-wire disagreement; W10–W16 implement this target unchanged.

## 1. One decoder law

- Request JSON is UTF-8, `application/json`, raw-body ≤64 KiB except the three secret-bearing session bodies, which are ≤1 KiB. Duplicate object keys, trailing data, non-finite numbers, unknown keys, wrong types and explicit `null` where not named are `422 request_invalid`. Objects are closed and arrays are bounded. A route printed with a body below requires exactly one `Content-Type: application/json`; a route printed with **no body**, plus every GET, requires zero body bytes and an absent `Content-Type`. Missing/wrong/duplicate content type on a body route, or any body byte/content type on a no-body route, is the same `422 request_invalid`. `JsonUInt` is a JSON number that is an integer in `0..9_007_199_254_740_991` (`Number.MAX_SAFE_INTEGER`); its maximum wire spelling is the unquoted ASCII decimal `9007199254740991`. Mutation clocks are unsigned canonical decimal `JsonUInt`s. Every wire field named as a count or score, including `voteCount`, `forkCount`, `rankVoteCount`, `rankForkCount` and a computed `popularScore`, is a `JsonUInt`; implementations may not expose a bigint string, float approximation, clamp or wrap. A `CommandId`/`Idempotency-Key` is canonical lowercase RFC 9562 UUIDv7 matching `^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$`. A `ResourceId` is the same canonical/variant spelling but permits version **5 or 7**, matching `^[0-9a-f]{8}-[0-9a-f]{4}-[57][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$`: ordinary runtime creation emits v7, while the exact cut-owned resource kinds in the Domain emit deterministic v5. Uppercase, braces and every other version/variant fail; accepting both decided versions is one typed identity law, not an alias or conversion. A `:releaseNo` path segment matches `^[1-9][0-9]{0,9}$` and its decoded integer is ≤2147483647; zero, leading zero, sign, whitespace, fraction and overflow are noncanonical. A malformed resource-ID/release path is `400 request_target_invalid`; malformed `Idempotency-Key` remains its specific 400. Times are RFC 3339 UTC with millisecond precision.
- Path typing is exact: `:workspaceId`, `:principalId`, `:grantId`, and `:reportId` are live-only UUIDv7; `:paletteId`, `:releaseId`, `:proposalId`, and `:tagId` are cut-capable `ResourceId`; `:releaseNo` and `:slug` use their separate laws. DTO fields follow their named kind: Palette/Release/ColorNameProposal/TagDefinition IDs are `ResourceId`, while Principal/Workspace/Grant/Report/Session/Credential/Vote/Fork/PurgeJob IDs are UUIDv7. A NamespaceClaim or policy ID inherits its subject's decided version. A client never chooses a resource version during create—the server generates v7—and a v5 spelling on a live-only path is structurally invalid rather than a not-found alias.
- A decoded query is ≤4096 UTF-8 bytes. Malformed percent encoding/UTF-8, unknown keys and duplicate scalar keys are `422 query_invalid`. Only repeated `tagId` is legal: 1–10 unique cut-capable `ResourceId` values, sorted by ascending ASCII for binding. `actorId`/`principalId` filters are UUIDv7 and `releaseId` is `ResourceId`; r30's subject fields use the closed coupled law below rather than an untyped subject-ID grammar. `limit` is an ASCII integer 1–50, default 25. `cursor` is canonical unpadded base64url, ≤2048 bytes. There is no `offset`. The sixteen `Q-*` routes below own their one closed query grammar; every other mounted route requires the raw query component to be absent, so even an empty trailing `?` is `422 query_invalid` rather than an alias.
- Display strings, colors, color-name search keys, tag keys and public namespace spellings use only their exact `PALETTE-DOMAIN.md` normalizers. A generic trim/lowercase/slugify helper is forbidden.
- `reason` is display-normalized 1–500 Unicode scalars/≤2000 UTF-8 bytes; `evidence` is display-normalized 0–2000 scalars/≤8000 bytes. Empty evidence canonicalizes to absence, not `null`. Unknown enum values are rejected.
- `NamedColorInput={css:string,name?}` is the sole color input atom. `css` is 1–512 UTF-8 bytes and must reach the Domain's final absolute-color parser; optional `name` uses the Domain color-name law and absence becomes response `name:null`. `orderedNamedColors` in a body is 1–50 `NamedColorInput` atoms in semantic order. The fixed-point `CanonicalNamedColor` is output/storage only and is not accepted as a parallel input spelling. r28 `color` is the same 1–512-byte CSS input string.
- An `If-Match` request contains exactly one field occurrence and, after removing HTTP OWS at its two ends, exactly one quoted strong tag—never `W/`, `*`, a comma-list or inner whitespace. ETags are `"workspace:<uuid>:<revision>"`, `"palette:<uuid>:<generation>"`, `"release:<uuid>:1"`, `"palette-policy:<uuid>:<revision>"`, `"release-policy:<uuid>:<revision>"`, `"principal:<uuid>:<revision>"`, `"grant:<uuid>:<revocationRevision>"`, `"color-name:<uuid>:<policyRevision>:<claimedRevision>"`, `"tag:<uuid>:<revision>"`, or `"report:<uuid>:<reviewRevision>"`; decimal clocks have no leading zeros. The color-name claim component is read from the immutable Proposal, never joined from a later Slot owner. A route accepts only its target kind/ID. Absence is 428, malformed/duplicate/list/weak/wrong target is `400 request_header_invalid`, and a well-formed stale current clock is 412.

## 2. Page and cursor

Every list result is exactly `Page<T> = {items:T[],page:{hasMore:boolean,nextCursor:string|null}}`, with `hasMore === (nextCursor !== null)` and no mutable/expensive `total`. A scan stops after 500 candidate rows and returns a cursor from the last **scanned** row even when no item matched.

Cursor v1 is the opaque authenticated-encryption value frozen in `PALETTE-CURSOR-CONTRACT.md`. That contract alone defines the domain-separated query digest, deterministic-CBOR plaintext, route-instance `target`, route-specific `after` union, private Principal/rank bindings, `issuedAt`/`expiresAt`, AES-GCM envelope, key lifetime and byte goldens. In particular there is one last-scanned `after` coordinate—not an ambiguous `sortTuple` plus `lastScanned` pair—and every coordinate below has an exact encoding. Bad canonicality/length/version/key/AEAD/route/query/target/principal/sort/coordinate coupling and an expired noncatalog cursor are the one `422 cursor_invalid`; a valid catalog cursor whose rank epoch is absent or expired is `410 rank_epoch_expired` and never silently restarts.

## 3. Exact list schemas

All omitted optional fields are absent, never `null`. `q` is display-normalized, Unicode 15.1 default-case-folded and NFC-normalized before the route-specific predicate below; no route inherits a generic token/fuzzy search. Catalog color distance is Euclidean D65 OKLab distance derived from the canonical fixed-point OKLCH tuple; `radius` is integer micro-ΔE in 0–500000. `nearL/nearC/nearH/radius` are all present or all absent, and `sort=color-distance` requires them.

| ID / route rows | Exact parsed query | Stable order / result item |
|---|---|---|
| `Q-WORKSPACES` r8 | `{state:unpublished|published|trash,limit=25,cursor?}` | `updatedAt DESC,workspaceId DESC`; `WorkspaceListItem` |
| `Q-CATALOG` r16 | `{limit=25,cursor?,sort?:newest|popular|most-forked|color-distance (default newest),q?:2..100 scalars,catalogTier?:standard|featured,tagId*?,nearL?:0..100000,nearC?:0..500000,nearH?:0..359999,radius?:0..500000}` | chosen metric DESC except distance ASC, then `publishedAt DESC,paletteId DESC`; `PaletteCard` |
| `Q-RELEASES` r18 | `{limit=25,cursor?}` | `releaseNo DESC,releaseId DESC`; `ReleaseSummary` |
| `Q-OWNER-RELEASES` r50 | `{limit=25,cursor?}` | `releaseNo DESC,releaseId DESC`; `ReleaseSummary`; owner-only active-or-trashed lineage, independent of public visibility/moderation/current pointer |
| `Q-FORKS` r20 | `{limit=25,cursor?}` | `destinationPublishedAt DESC,destinationPaletteId DESC`; `PublicForkSummary` |
| `Q-PROVENANCE` r21 | `{limit=25,cursor?}` | nearest ancestor first over the unique-origin chain; at most 50 scanned hops per page; `ProvenanceStep` |
| `Q-NAMES-APPROVED` r26 | `{state:approved,limit=25,cursor?}` | `normalizedName ASC,proposalId ASC`; `ApprovedColorName` |
| `Q-NAMES-SEARCH` r27 | `{q:2..64 normalized scalars,limit=10(1..20),cursor?}` | `normalizedName ASC,proposalId ASC`; `ApprovedColorName` |
| `Q-TAGS-PUBLIC` r29 | `{state:active,category?:canonical tag category,limit=25,cursor?}` | `category ASC,normalizedKey ASC,tagId ASC`; `TagDefinitionPublic` |
| `Q-AUDIT` r30 | `{actorId?,action?:AuditAction, subject keys exactly (∅ | {subjectType} | AuditSubject), commandId?, time keys exactly (∅ | {from,to}),limit=25,cursor?}` | `occurredAt DESC,eventId DESC`; `AuditEventItem`; present interval is `[from,to)`, `from<to`, duration ≤366 days; committed-effect provenance only |
| `Q-PROPOSALS` r31 | `{state:pending|approved|rejected|withdrawn,q?:2..64 scalars,actorId?,limit=25,cursor?}` | `q` is one indexed byte-prefix over `normalizedName` after the exact color-name normalization/case-fold pipeline; then `updatedAt DESC,proposalId DESC`; `ProposalReviewItem` |
| `Q-PRINCIPALS` r37 | `{status?:active|suspended|closed,publicHandlePrefix?:2..48 bytes from Domain canonicalizeClaimPrefix,limit=25,cursor?}` | exact canonical byte-prefix interval over PublicHandle `normalizedSpelling`, then `createdAt DESC,principalId DESC`; `PrincipalListItem` |
| `Q-PRINCIPAL-HANDLES` r39 | `{lifecycle?:active|trashed,visibility?:private|public,limit=25,cursor?}` | `updatedAt DESC,paletteId DESC`; `AdminHandleItem` |
| `Q-GRANTS` r42 | `{state?:active|revoked,limit=25,cursor?}` | `createdAt DESC,grantId DESC`; `GrantItem` |
| `Q-TAGS-ADMIN` r45 | `{state:active|retired,category?:canonical tag category,limit=25,cursor?}` | `category ASC,normalizedKey ASC,tagId ASC`; `TagDefinitionAdmin` |
| `Q-REPORTS` r48 | `{state:open|resolved|dismissed,reason?:ReportReason,releaseId?,actorId?,limit=25,cursor?}` | `createdAt DESC,reportId DESC`; `ReportReviewItem` |

For `Q-CATALOG`, repeated `tagId` values are conjunctive: an eligible Palette contains every requested ID in its active Release's frozen tag set, and each corresponding current TagDefinition is still `state="active"` at the page read. No requested ID is an OR term; a retired or missing definition makes the row ineligible.

The old catalog `offset`, `visibility` and `userSlug` fields are RETIRE: owner inventory has its own route and public discovery cannot query private ownership. `AuditAction` is exactly `bootstrap|session-register|session-recover|session-logout|credential-rotate|principal-policy|principal-close|grant-create|grant-revoke|workspace-create|workspace-edit|publish|restore-release|handle-policy|vote-put|vote-delete|fork|report-create|report-review|color-name-propose|color-name-review|tag-create|tag-retire|palette-policy|release-policy|purge`. `AuditSubjectType` is exactly `platform|session|credential|principal|grant|workspace|palette|release|fork|report|color-name|tag|policy|purge-job`. `session-revoke` and a standalone vote-edge subject are absent: rotation/logout own session effects, while declarative vote commands use their stable palette subject and the Domain's exact membership projection. `ReportReason` is `abuse|copyright|deceptive|hate|other`.

`AuditSubject` is the closed discriminated pair `{subjectType:"platform",subjectId:"primary-ready"}`; `{subjectType:T,subjectId:UUIDv7}` for `T=session|credential|principal|grant|workspace|fork|report|purge-job`; or `{subjectType:T,subjectId:ResourceId}` for `T=palette|release|color-name|tag|policy`. Q-AUDIT admits exactly three subject-filter states: neither key; `subjectType` alone, meaning every event of that type; or one correctly typed pair. `subjectId` without `subjectType`, a wrong ID version/grammar for the selected type, a platform value other than the literal `primary-ready`, explicit `null`, and a duplicate occurrence of either scalar key are `422 query_invalid`. The generated OpenAPI and typed client represent that same three-arm query union and the same `AuditSubject` result union; two independent optional strings, a generic string ID, coercion and a second untyped union are forbidden.

Q-AUDIT's time filter is a second closed union with exactly two arms: neither key, or both `{from,to}`. Present values are canonical RFC 3339 UTC milliseconds and select exactly `occurredAt >= from && occurredAt < to`; `from<to` and `to-from≤31_622_400_000ms` (366 days). A one-sided, equal, reversed, longer, explicit-null or duplicate-bound query is `422 query_invalid` before repository work. An event exactly at `from` is included and one exactly at `to` is excluded. The generated OpenAPI/client expose the absent-or-paired union rather than two independent optionals, and the defaulted Q-AUDIT `QueryIdentity` contains either neither field or both canonical strings byte-for-byte.

`Q-NAMES-SEARCH.q` and `Q-PROPOSALS.q` each have the same exact predicate, not a token/fuzzy alternate: encode the route-normalized query as UTF-8 bytes `p`, require `normalizedNameBytes` to begin with `p`, and implement the bounded index interval `[p, prefixSuccessor(p))`. `prefixSuccessor` scans from the final byte leftward, increments the first byte below `0xff`, truncates after it and returns no upper bound only when every byte is `0xff`. The route's remaining visibility/state/actor filters apply before the printed stable order. There is no unspecified generic search helper.

## 4. Closed page-item types

These are exact fields, not projections:

- `CanonicalColor={l:uint[0,100000],c:uint[0,500000],h:uint[0,359999],a:uint[0,1000000]}`, `CanonicalNamedColor={name:string|null,l:uint[0,100000],c:uint[0,500000],h:uint[0,359999],a:uint[0,1000000]}`, and `ReleaseTag={tagId,labelAtPublish}`. `orderedNamedColors` is 1–50 canonical named colors in semantic order; `canonicalTags` is 0–10 ReleaseTags sorted by tag-ID ASCII bytes. Every `canonicalColor` is the exact `CanonicalColor` shape. No response exposes an alternate float color, free-form tag, source payload or CSS string as parallel authority.
- `PublicAttributionPrincipal={publicHandle}` and `AdminAttributionPrincipal={principalId,publicHandle}`. On a field set containing `attribution:"system"`, the matching `attributionPrincipal` field is absent. On `attribution:"principal"`, it is required and has the public or admin shape named by that DTO. A deleted/unknown actor is not substituted; admin audit/proposal fields use their separately named optional actor coordinates.

- `WorkspaceTagProjection={tagId,label,state:"active"|"retired",tagRevision,tagEtag}`. `WorkspaceListItem={workspaceId,paletteId,slug,displayName,workspaceRevision,workspaceEtag,handleGeneration,handleEtag,palettePolicyRevision,palettePolicyEtag,lifecycle,visibility,trashedAt?,purgeAfter?,activeReleaseId?,activeReleaseNo?,orderedNamedColors,tags,contentDigest,basedOnReleaseId?,moderation,catalogTier,updatedAt}`. `tags` contains the current Workspace tag IDs in ASCII order with their present label/state and TagDefinition clock; a retired tag remains visible here but Publish rejects until removed. `trashedAt` and `purgeAfter` are both required exactly when `lifecycle="trashed"` and absent when active. Inventory classes are total: `trash := lifecycle=trashed`; `unpublished := active ∧ activeReleaseId absent`; `published := active ∧ activeReleaseId present`, regardless of current visibility/moderation.
- `RankSnapshot={epoch,rankedAt,voteCount:JsonUInt,forkCount:JsonUInt}` and `PaletteCard={paletteId,slug,attribution:"system"|"principal",attributionPrincipal?,displayName,activeReleaseId,releaseNo,releaseEtag,publishedAt,orderedNamedColors,canonicalTags,palettePolicyRevision,catalogTier,rank:RankSnapshot,viewerHasVoted}` with public attribution coupling. Counts and order are explicitly the immutable epoch values, while `palettePolicyRevision`/`catalogTier` are the current access-checked policy projection read with the row; tier filtering uses that same current projection. An absent/malformed/revoked/expired/stale-policy cookie is anonymous with `viewerHasVoted=false`; only a valid current session receives actual edge membership, and optional auth never turns a public row into 401.
- `ReleaseSummary={paletteId,releaseId,releaseNo,releaseEtag,handleGeneration,handleEtag,releasePolicyRevision,releasePolicyEtag,attribution:"system"|"principal",attributionPrincipal?,displayName,contentDigest,publishedAt,publicHistory,moderation,isActive}` with public attribution coupling. The immutable Release, current Handle active pointer and current ReleasePolicy clocks are distinct body coordinates.
- `PublicForkSummary={destinationPaletteId,destinationSlug,destinationActiveReleaseId,destinationReleaseNo,displayName,destinationPublishedAt}`; actor/owner IDs are absent.
- `ProvenanceStep` is `{kind:"visible",paletteId,slug,releaseId,releaseNo,displayName,publishedAt}` or `{kind:"unavailable",ordinal}`. Every hop rechecks its own current public predicate. A private/trashed/withdrawn/purged ancestor yields only the ordinal unavailable step—no slug, actor, content, stable private ID or correlation handle—while continuation advances over the durable edge.
- `ApprovedColorName={proposalId,attribution:"system"|"principal",attributionPrincipal?,displayName,canonicalColor,decidedAt}` with public attribution coupling.
- `TagDefinitionPublic={tagId,key,label,category,attribution:"system"|"principal",attributionPrincipal?}` with public attribution coupling.
- `AuditEventItem={eventId,actorId?,scopes,grantIds,commandId?,correlationId,action,subjectType,subjectId,beforeDigest?,afterDigest?,occurredAt}`. Its flattened `subjectType,subjectId` fields must satisfy exactly one `AuditSubject` arm above and are projected byte-for-value from persistence. It represents one committed effect under `PALETTE-DOMAIN.md §Committed-effect audit construction`: the route/family map fixes event cardinality, action, subject, actor/command/correlation presence and projection transition. A present digest is exactly 64 lowercase hex over the Domain's closed RFC 8785 projection; a creation-side absence omits the key rather than returning null or a sentinel. r49 always yields one `report-review` event whose Report projection binds any applied policy coordinates; bootstrap binds deployment identity/commit only through its projection and does not add DTO fields; a delayed job reuses its cause correlation and authority arrays. There is no success/failure outcome field, rejected/aborted/replayed attempts are not AuditEventItems, and no second policy/worker/attempt event is synthesized. `scopes` is the sorted required admin-scope set and `grantIds` is the unique ASCII-sorted minimal witness set selected by the Domain; a product/deployment event authorized without an AdminGrant carries both arrays empty. Singular `grantId`, current-union snapshots, a generic subject string and open authority prose are forbidden.
- `ProposalReviewItem={proposalId,attribution:"system"|"principal",attributionPrincipal?,actorId?,displayName,normalizedName,canonicalColor,evidence?,state,policyRevision,claimedRevision,decisionReason?,decisionActorId?,createdAt,updatedAt,etag}` with admin attribution coupling. `claimedRevision` is the immutable Slot generation stored on this Proposal; `etag` is reconstructed only as `"color-name:<proposalId>:<policyRevision>:<claimedRevision>"`, so a successor claim cannot churn an old attempt's validator. `actorId` and `attributionPrincipal` are absent only on the immutable legacy-system rows defined by `PALETTE-DOMAIN.md §7`.
- `PrincipalListItem={principalId,publicHandle,status,principalRevision,createdAt,updatedAt}`.
- `AdminHandleItem={paletteId,slug,attribution:"system"|"principal",attributionPrincipal?,lifecycle,visibility,trashedAt?,purgeAfter?,activeReleaseId?,activeReleaseNo?,generation,handleEtag,palettePolicyRevision,palettePolicyEtag,moderation,catalogTier,policyReason?,policyUpdatedBy?,policyUpdatedAt,updatedAt}` with admin attribution coupling. Trash fields obey the same exact lifecycle coupling as owner inventory. Runtime lineage creation supplies `policyReason="lineage created"` and the authenticated creator; later ordinary policy mutation supplies its normalized reason/actor. `policyReason` and `policyUpdatedBy` are absent together only on a cut-created initial clear policy.
- `GrantAttribution` is exactly `{kind:"principal",principalId}` or `{kind:"bootstrap-workload",bootstrapRecordId:"initial-admin"}`. `GrantItem={grantId,principalId,scopes,creationReason,attribution:GrantAttribution,createdAt,revokedAt?,revokedBy?,revokedReason?,etag}`; scopes are unique in the frozen bit order. The principal arm is required on every r43-created row and names the authenticated grantor; the workload arm is required only on the one bootstrap Grant and resolves deployment provenance through the BootstrapRecord. There is no nullable `createdBy`, scalar creator, parallel system flag or inferred self-grantor. `creationReason` is always present: the exact normalized r43 body reason or bootstrap's exact `initial authority bootstrap` literal, and revocation never rewrites it.
- `TagDefinitionAdmin={tagId,key,label,category,state,revision,attribution:"system"|"principal",createdBy?,createdAt,retiredBy?,retiredReason?,retiredAt?,etag}`. `createdBy` is absent only on an immutable legacy-system definition from the clean cut.
- `ReportTargetSnapshot={paletteId,releaseId,releaseNo,contentDigest,displayName,orderedNamedColors,canonicalTags,publishedAt}`. `AppliedReportEffect` is `{kind:"none"}`, `{kind:"palette-policy",targetPaletteId,beforeRevision,afterRevision,moderation:"clear"|"withdrawn"}`, or `{kind:"release-policy",targetReleaseId,beforeRevision,afterRevision,moderation:"clear"|"withdrawn"}`. `ReportReviewItem={reportId,actorId,targetReleaseId,targetPaletteId,targetSnapshot:ReportTargetSnapshot,reason,evidence?,state,reviewRevision,resolutionActorId?,resolutionReason?,appliedEffect?,createdAt,resolvedAt?,etag}`. An open item omits all resolution fields and `appliedEffect`; a resolved/dismissed item requires them, dismissal requires `{kind:"none"}`, and a policy effect carries the immutable before/after revisions committed with review. The snapshot and applied result are pinned moderation evidence and remain available after active-release change, later policy change or purge.

`CurrentSession={principalId,publicHandle,status,principalRevision,policyEpoch,authorityRevision,scopes}` where `authorityRevision` is the current PrincipalAuthority revision and `scopes` is that same revision's sorted union in frozen bit order. `GET /sessions/me` and the successful session commands return exactly that type. Its independently changing coordinates are body fields rather than a dishonest Principal-only HTTP validator. It exposes no token, credential ID, grant witness/history or other Principal.

## 5. Mutation DTO closures

- All target mutations require canonical `Idempotency-Key`; absence is `428 precondition_required`, malformed is `400 idempotency_key_invalid`. The mutable-target rows below also require the printed strong `If-Match`; absence is 428 and a nonmatching current clock is 412. r6/r22/r23 have **no body** (`Content-Length: 0` or absent); `{}`, `null` or a body content type is 422. Every other body is exactly:

| Route row | Closed body |
|---:|---|
| r3 | `{publicHandle,recoverySecret}` |
| r4 | `{publicHandle,recoverySecret}` |
| r5 | `{currentRecoverySecret,newRecoverySecret}` in both fresh and replay requests |
| r9 | `{displayName,slug,orderedNamedColors,tagIds}` |
| r11 | `WorkspacePatch` below |
| r12 | `{expectedHandleGeneration}` |
| r13 | `{releaseNo}` where releaseNo is integer 1..2^31−1 in the linked lineage |
| r15 | `HandleChange` below |
| r24 | `{slug}` |
| r25 | `{reason:ReportReason,evidence?}` |
| r28 | `{name,color,evidence?}` |
| r32 | `{state:"approved"|"rejected"|"withdrawn",reason,expectedClaimRevision}`; source/slot transition must be legal |
| r34 | `PalettePolicyChange` below |
| r36 | `{moderation:"clear"|"withdrawn",reason}` |
| r40 | `{op:"suspend",reason}` or `{op:"reactivate",reason}` |
| r41 | `{confirmation:"close permanently",reason}` |
| r43 | `{scopes,reason}` under the delegation law below |
| r44 | `{op:"revoke",reason}` |
| r46 | `{key,label,category}` under the Domain tag law |
| r47 | `{op:"retire",reason}` |
| r49 | `ReportReview` below |

- `WorkspacePatch` (r11) is a nonempty subset of `{displayName,orderedNamedColors,tagIds}`; each field uses the Domain bounds and the resulting whole Workspace must satisfy the 32 KiB canonical-content ceiling. `slug`, visibility, clocks, IDs and owner are never accepted here.
- `HandleChange` (r15) is exactly one of `{op:"rename",slug}`, `{op:"setVisibility",visibility:"private"|"public"}`, `{op:"trash"}`, `{op:"restore"}`. Public requires active lifecycle and a nonnull active Release or `409 palette_unreleased`; private is unpublish; trash requires active; restore requires trashed and always restores active/private. Wrong sources are `409 state_conflict`.
- `PalettePolicyChange` (r34) is exactly `{op:"setCatalogTier",catalogTier:"standard"|"featured",reason}` or `{op:"setModeration",moderation:"clear"|"withdrawn",reason}`. The redundant featured boolean and `archived` pseudo-tier are RETIRE.
- Color-name review (r32) reconstructs `If-Match` from the Policy row plus the Proposal's immutable `claimedRevision`. Its body `expectedClaimRevision` names the current Slot clock; execution requires it to equal both `ColorNameSlot.claimRevision` and the Proposal's stored `claimedRevision`, with the Slot pointer naming that Proposal. A successor's Slot revision can therefore fail an old attempt without changing the old attempt's ETag.
- `ReportReview` (r49) is `{state:"dismissed",reason,effect:{kind:"none"}}` or `{state:"resolved",reason,effect:{kind:"none"}|{kind:"palette",expectedPolicyRevision,moderation:"clear"|"withdrawn"}|{kind:"release",expectedPolicyRevision,moderation:"clear"|"withdrawn"}}`. The server derives the palette/release target from the Report; no client target ID is accepted. Review and optional policy CAS are atomic.
- Grant create (r43) is exactly `{scopes,reason}` where scopes are a nonempty unique subset of the fixed eleven in frozen order. Requested scopes must be a subset of the actor's current union; granting either `grant:write` or `principal:close` requires the actor currently hold both. It must add at least one scope absent from the target projection or returns `409 grant_redundant`; at most eleven grants may be active for one Principal. On success the immutable Grant stores `creationReason=<canonical reason>` and `attribution={kind:"principal",principalId:<authenticated actor>}`; r42/r43/r44 return those same creation fields unchanged.
- Secret bodies and every other mutation union are the exact bodies already printed in `PALETTE-FACILITIES.md §3`; this file's decoder law applies to them. Registration replay treats its secret as proof; recovery always treats it as proof; rotation always carries both fields and applies the role-after-receipt law in `PALETTE-DOMAIN.md §4`.

Every completed mutation persists the exact binding digest and deterministic-CBOR replay tuple in `PALETTE-OPERATIONS-REPLAY-CONTRACT.md`. That contract closes the secret-free per-route binding value, status/body/header plaintext, 65,536-byte ceiling, AES-GCM fields/AAD, authorized decryptor and CAS rewrap/key-retirement law. Mutable resource lookups never reconstruct replay. `Set-Cookie` is deliberately absent from the tuple: an authorized session issuance/replay may mint a fresh command-linked cookie while returning the stored status/header/body bytes. The encrypted tuple is permanent and has no expiring enrichment or reference array; internal effect/tombstone metadata is never replay authority.

### 5.1 Exact success bodies and statuses

Success is not an open `data` envelope. Times and IDs obey §1. Every `*Etag`/`etag` body field is the exact quoted strong coordinate for its named resource; on a composite response it does not pretend to validate the whole representation and is not emitted as an HTTP `ETag`. HTTP validator presence is only the §5.2 matrix. Conditional optional fields are absent, never `null`.

- `HealthReady={status:"ready",version,commit,mongo:"ready",platform:"primary-ready",authorityGuard:"consistent"}`. A non-ready condition is the closed 503 Problem, not a partial health body.
- `LogoutResult={status:"logged-out"}`.
- `WorkspaceDetail={workspaceId,paletteId,slug,displayName,workspaceRevision,workspaceEtag,handleGeneration,handleEtag,palettePolicyRevision,palettePolicyEtag,lifecycle,visibility,trashedAt?,purgeAfter?,activeReleaseId?,activeReleaseNo?,orderedNamedColors,tags,contentDigest,basedOnReleaseId?,catalogTier,moderation,createdAt,updatedAt}`. `tags` is the canonical sorted `WorkspaceTagProjection[]`; only a Release exposes frozen `canonicalTags`. Trash fields obey the exact lifecycle coupling above.
- `PaletteHandleDetail={paletteId,slug,generation,handleEtag,palettePolicyRevision,palettePolicyEtag,lifecycle,visibility,trashedAt?,purgeAfter?,activeReleaseId?,activeReleaseNo?,catalogTier,moderation,createdAt,updatedAt}`. Trash fields obey the exact lifecycle coupling above.
- `ReleaseDetail={paletteId,slug,releaseId,releaseNo,releaseEtag,handleGeneration,handleEtag,releasePolicyRevision,releasePolicyEtag,attribution:"system"|"principal",attributionPrincipal?,displayName,contentDigest,orderedNamedColors,canonicalTags,publishedAt,publicHistory,moderation,isActive}` with public attribution coupling. `slug/isActive`, immutable release bytes and moderation are respectively governed by the printed Handle, Release and ReleasePolicy coordinates.
- `CurrentSocialCounts={asOf,voteCount:JsonUInt,forkCount:JsonUInt}` and `PublicPaletteDetail={handle:{paletteId,slug,attribution:"system"|"principal",attributionPrincipal?,generation,handleEtag,activeReleaseId,palettePolicyRevision,palettePolicyEtag,catalogTier,moderation},release:ReleaseDetail,counts:CurrentSocialCounts,viewerHasVoted}` with public attribution coupling. `asOf` is the majority-read timestamp for the Domain's exact edge/access join; these are not RankEpoch values. The active/public predicate is implicit in reachability, not repeated as misleading mutable flags.
- `VoteResult={paletteId,viewerHasVoted,voteCount:JsonUInt}`.
- `PublishResult={workspace:WorkspaceDetail,handle:PaletteHandleDetail,release:ReleaseDetail}`.
- `ForkResult={basedOnReleaseId,workspace:WorkspaceDetail,handle:PaletteHandleDetail}`; the new Handle is unpublished. The transaction retains its one real provenance edge, but public fork discovery does not expose that edge until the destination independently passes the public predicate.
- `PalettePolicyDetail={paletteId,policyRevision,etag,catalogTier,moderation,reason?,updatedBy?,updatedAt}` and `ReleasePolicyDetail={releaseId,policyRevision,etag,moderation,reason?,updatedBy?,updatedAt}`. The pair is exact: r9/r24-created PalettePolicy returns `reason="lineage created"` and `updatedBy=<authenticated creator>`; r12-created ReleasePolicy returns `reason="release published"` and `updatedBy=<authenticated publisher>`; later r34/r36 use their normalized request reason/actor and an r49 policy effect uses its review reason/reviewer. `reason` and `updatedBy` are absent together only for a cut-created initial clear policy, never independently. A later transition back to clear still supplies both.
- `PrincipalDetail={principalId,publicHandle,status,principalRevision,etag,statusReason?,statusActorId?,closedAt?,createdAt,updatedAt}`. `closedAt` is present iff status is closed. `statusReason` and `statusActorId` are absent together only on the initial active state and are both present after every lifecycle mutation, including reactivation. It contains no AuthFence `policyEpoch`, recovery/session material or inferred grant list; AuthFence rotation therefore cannot change this Principal-owned representation or its ETag.

The route/status/body matrix is closed:

| Route row | Success status and exact body |
|---:|---|
| r1 | `200 HealthReady` |
| r2 | `200` OpenAPI 3.1 JSON projected from the mounted 50-route definitions, with sole server `https://color.babb.dev/api`; it is not re-described by a second hand schema |
| r3 | `201 CurrentSession` plus the sole session cookie |
| r4–r5 | `200 CurrentSession` plus the sole session cookie |
| r6 | `200 LogoutResult`; no cookie mutation |
| r7 | `200 CurrentSession`; no cookie mutation |
| r8 | `200 Page<WorkspaceListItem>` |
| r9 | `201 WorkspaceDetail` |
| r10–r11 | `200 WorkspaceDetail` |
| r12 | `201 PublishResult` |
| r13 | `200 WorkspaceDetail` |
| r14–r15 | `200 PaletteHandleDetail` |
| r16 | `200 Page<PaletteCard>` |
| r17 | `200 PublicPaletteDetail` |
| r18 | `200 Page<ReleaseSummary>` |
| r19 | `200 ReleaseDetail` |
| r20 | `200 Page<PublicForkSummary>` |
| r21 | `200 Page<ProvenanceStep>` |
| r22–r23 | `200 VoteResult` |
| r24 | `201 ForkResult` |
| r25 | `201 ReportReviewItem` in `open` state |
| r26–r27 | `200 Page<ApprovedColorName>` |
| r28 | `201 ProposalReviewItem` in `pending` state |
| r29 | `200 Page<TagDefinitionPublic>` |
| r30 | `200 Page<AuditEventItem>` |
| r31 | `200 Page<ProposalReviewItem>` |
| r32 | `200 ProposalReviewItem` |
| r33–r34 | `200 PalettePolicyDetail` |
| r35–r36 | `200 ReleasePolicyDetail` |
| r37 | `200 Page<PrincipalListItem>` |
| r38 | `200 PrincipalDetail` |
| r39 | `200 Page<AdminHandleItem>` |
| r40–r41 | `200 PrincipalDetail` |
| r42 | `200 Page<GrantItem>` |
| r43 | `201 GrantItem` |
| r44 | `200 GrantItem` |
| r45 | `200 Page<TagDefinitionAdmin>` |
| r46 | `201 TagDefinitionAdmin` |
| r47 | `200 TagDefinitionAdmin` |
| r48 | `200 Page<ReportReviewItem>` |
| r49 | `200 ReportReviewItem` |
| r50 | `200 Page<ReleaseSummary>` |

### 5.2 Exact public response headers

Every successful public `/api` response above has exactly `Content-Type: application/json;charset=utf-8` and `Cache-Control: no-store`. Before any public byte is emitted, the edge buffers and validates the complete origin response under one ten-second settlement deadline and a 4,194,304-byte body ceiling; r3–r5 use the stricter 65,536-byte ceiling because cookie emission is coupled to complete settlement. For any noncookie route, origin timeout, abort, private-network failure or a 4,194,305th body byte discards the origin response and emits the buffered `503 dependency_unavailable` Problem. The same conditions on r3–r5 emit cookie-free `504 edge_origin_timeout`. Exactly 4,194,304 bytes is admissible on a general route and exactly 65,536 on r3–r5. The edge derives canonical decimal `Content-Length` from the settled bytes and adds `Date`, `Strict-Transport-Security: max-age=63072000; includeSubDomains`, `X-Content-Type-Options: nosniff`, `Cross-Origin-Resource-Policy: same-origin`, `Referrer-Policy: no-referrer`, and `Content-Security-Policy: default-src 'none'; frame-ancestors 'none'`. Header order is immaterial; values and multiplicity are not. No API response emits `Vary`, `Location`, `Access-Control-Allow-*`, or a second cache directive.

The origin emits one strong `ETag` exactly on these success rows; its value is also the named body coordinate. Composite representations deliberately have no HTTP validator and instead carry every contributing named body clock:

| Rows | Sole response validator |
|---|---|
| r25, r49 | returned Report ETag |
| r28, r32 | returned ColorNamePolicy/Proposal-claim ETag |
| r33–r34 | returned PalettePolicy ETag |
| r35–r36 | returned ReleasePolicy ETag |
| r38, r40–r41 | returned Principal ETag |
| r43–r44 | returned AdminGrant ETag |
| r46–r47 | returned TagDefinition ETag |

Every other success row forbids `ETag`. Successful r3–r5 each **must** carry exactly one exact `Set-Cookie`; a missing cookie makes that apparent success a cookie-free `502 edge_cookie_contract_violation`. Every error and every other success forbids it. Only `429 abuse_window_exceeded` carries `Retry-After`, as canonical unsigned decimal `max(1,ceil((latestExhaustedWindowEndMs-mongoNowMs)/1000))`; at the exact boundary the old window is no longer exhausted, so no old-window 429 is emitted. It also carries the universal `no-store`; every other response forbids `Retry-After`. A public Problem has exactly `Content-Type: application/problem+json`, the universal public edge/security/cache fields above, no ETag and no cookie. These presence rules are the “media/status coupling” enforced by the edge; “applicable” is not an implementation choice.

Mutation replay returns the original row's status, exact success body and ETag coordinates from the permanent tuple even after later mutation or purge. A session rotation/recovery replay may issue the narrowly authorized command-linked successor cookie described by the Domain, but it cannot change the body into a token, secret or current-state projection. No successful target route returns `204`, a bare boolean, a free-form message or a second envelope.

## 6. One problem contract

Every non-2xx response exposed by the public `/api` edge is `application/problem+json` and exactly `{type:"https://color.babb.dev/problems/"+code,title,status,code,detail?,fieldIssues?,resourceRef?,correlationId}`. The private mTLS/MAC rejection between edge and Hono is not a public API response and has the exact non-Problem body frozen in `PALETTE-DOMAIN.md`; the edge always replaces it. `title` is the stable public title for `code`; `status` equals HTTP status. `fieldIssues` is an array of ≤32 `{path,code}` entries sorted by path then code. `path` is an RFC 6901 JSON Pointer rooted at `/body` or `/query` and may name only a declared request field/array index. Its code is exactly `required|unknown|duplicate|invalid_type|invalid_format|out_of_range|invalid_enum|too_many|too_large|inconsistent`. Unknown fields are absent. `resourceRef` exists only on `report_exists`, is exactly `{kind:"report",id:<canonical UUIDv7>}`, and identifies only the authenticated caller's own pre-existing Report. `detail` contains no secret, cookie, verifier, private-resource existence, stack, query, raw body or internal ID not already authorized. `correlationId` is an opaque UUIDv7 safe for logs.

The byte-preserving edge strips any inbound correlation header and mints that UUIDv7 before API path/body validation. It binds the value into the edge-origin MAC, the origin reuses it, and an edge-created `namespace_path_noncanonical`, `request_header_invalid`, `request_target_invalid`, `edge_cookie_contract_violation` or `edge_origin_timeout` Problem has the same shape and ID. Static/SPA 4xx responses are not API Problems; a raw target whose normalized view would enter `/api` is classified as API and cannot escape to that exception.

The closed status families are: `400 idempotency_key_invalid|namespace_path_noncanonical|request_header_invalid|request_target_invalid`; `401 authentication_required|recovery_invalid`; `403 origin_forbidden|scope_forbidden`; `404 resource_not_found`; `409 idempotency_key_reused|public_handle_claimed|palette_slug_claimed|palette_unreleased|state_conflict|last_root_authority|grant_redundant|principal_closed|color_name_claimed|tag_key_claimed|report_exists`; `410 rank_epoch_expired`; `412 precondition_failed`; `422 request_invalid|query_invalid|cursor_invalid|namespace_spelling_invalid|namespace_spelling_reserved|recovery_secret_invalid|palette_content_invalid`; `428 precondition_required`; `429 abuse_window_exceeded`; `500 content_digest_collision|platform_consistency_fault`; `502 edge_cookie_contract_violation`; `503 platform_uninitialized|dependency_unavailable`; `504 edge_origin_timeout`. Header presence and cache behavior are exactly §5.2; no code supplies an “ordinary” discretionary header branch. OpenAPI, Hono, the local/production proxy and W15 typed client preserve media type/status/body/correlation ID unchanged.

Problem reachability is closed by row number. Let `M={3,4,5,6,9,11,12,13,15,22,23,24,25,28,32,34,36,40,41,43,44,46,47,49}` be mutations; let `B=M\{6,22,23}` be mutations with a JSON body; let `Z={1,2,6,7,8,10,14,16,17,18,19,20,21,22,23,26,27,29,30,31,33,35,37,38,39,42,45,48,50}` be all no-body rows; let `Q={8,16,18,20,21,26,27,29,30,31,37,39,42,45,48,50}` be cursor/query routes; let `C={5,11,12,13,15,32,34,36,40,41,43,44,47,49}` be strong-precondition routes; and let `A={5,6,7,8,9,10,11,12,13,14,15,22,23,24,25,28,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50}` be strict-auth routes. `B∪Z={1..50}` and `B∩Z=∅`. The following table is exhaustive; an omitted code/row pair is a contract fault, not an undocumented branch:

| Code(s) | Permitted rows |
|---|---|
| `namespace_path_noncanonical`, `request_header_invalid`, `request_target_invalid`, `origin_forbidden`, `dependency_unavailable`, `edge_cookie_contract_violation` | any literal/projected public API request, subject to the edge classifier |
| `edge_origin_timeout` | r3–r5 only; other private-network failures are `dependency_unavailable` |
| `platform_uninitialized` | r1 and r3–r50; r2 remains the mounted schema projection |
| `idempotency_key_invalid`, `idempotency_key_reused` | `M` |
| `request_invalid` | `B` for body/content-type/decoder failure; `Z` only for a forbidden body byte or `Content-Type` |
| `query_invalid` | `Q` for its named grammar; every row outside `Q` only when any raw query component is present |
| `cursor_invalid` | `Q`; `rank_epoch_expired` only r16 |
| `precondition_required` | `M` for the command key and `C` for If-Match; `precondition_failed` only `C` |
| `authentication_required` | `A`; optional-auth r16/r17 never use it |
| `scope_forbidden` | r30–r49 after strict authentication |
| `recovery_invalid` | r3–r5 in the proof roles; `recovery_secret_invalid` only r3/r5 when the same field is a proposal role |
| `namespace_spelling_invalid`, `namespace_spelling_reserved` | r3, r9, r15-rename, r24 |
| `resource_not_found` | an otherwise canonical target with no mounted method/template match, or r10–r15, r17–r25, r32–r36, r38–r44, r47, r49–r50 after access concealment; no `Allow`/method oracle is emitted |
| `public_handle_claimed` | r3 |
| `palette_slug_claimed` | r9, r15-rename, r24 |
| `palette_unreleased` | r15-setVisibility-public |
| `state_conflict` | r15, r32, r34, r36, r40, r44, r47, r49 |
| `last_root_authority` | r40, r41, r44 |
| `grant_redundant` | r43 |
| `principal_closed` | r40, r41, r43 |
| `color_name_claimed` | r28 |
| `tag_key_claimed` | r46 |
| `report_exists` | r25, with only that caller's resource reference |
| `palette_content_invalid` | r9, r11, r12, r28 |
| `abuse_window_exceeded` | r3, r4 under the proof-safe budget order |
| `content_digest_collision` | r9, r11–r12; a corrupt existing ContentObject encountered by restore/fork is `platform_consistency_fault`, not a new collision |
| `platform_consistency_fault` | r1 and r3–r50 |

When several defects coexist, the response is the first applicable stage in this fixed order: (1) raw-target classification, public header multiplicity and edge body ceiling; (2) private mTLS/SNI/Host/MAC authentication, mapped by the edge; (3) mounted route/method and exact Origin/Sec-Fetch tuple; (4) PlatformState readiness; (5) content type, JSON/query/path/key/If-Match structural decoding; (6) secret envelope/role and proof-safe abuse precedence—completed registration proof before its new-effect budget, dummy/real recovery proof before failure budgets; (7) the Domain's **narrow completed-receipt authorization branch**: a verified anonymous registration/recovery proof, exact retained `authSessionId` whose revocation/stale epoch was caused by this same command, or current command-linked rotation successor may return the same-binding stored result (or same-identity/different-binding 409) before current status/scope; a natural-expiry/different-command tombstone never enters it; (8) for every request not completed at stage 7, strict current authentication and then route scope; after that check, a different valid session encountering an occupied Principal command key receives non-result-bearing 409, or 403 if it lacks scope; (9) access-concealed resource lookup; (10) current strong precondition; (11) domain state/uniqueness/effect; (12) consistency/dependency failure. Optional authentication on r16/r17 resolves to current Principal or anonymous during stage 8 and never stops the chain with 401. No lower stage may replace a higher-stage result or reveal a hidden resource.

The title registry is closed:

| Code | Exact `title` |
|---|---|
| `idempotency_key_invalid` | `Invalid idempotency key` |
| `namespace_path_noncanonical` | `Noncanonical namespace path` |
| `request_header_invalid` | `Invalid request headers` |
| `request_target_invalid` | `Invalid request target` |
| `authentication_required` | `Authentication required` |
| `recovery_invalid` | `Recovery failed` |
| `origin_forbidden` | `Origin forbidden` |
| `scope_forbidden` | `Insufficient scope` |
| `resource_not_found` | `Resource not found` |
| `idempotency_key_reused` | `Idempotency key already used` |
| `public_handle_claimed` | `Public handle unavailable` |
| `palette_slug_claimed` | `Palette slug unavailable` |
| `palette_unreleased` | `Palette has no release` |
| `state_conflict` | `Resource state conflict` |
| `last_root_authority` | `Last root authority protected` |
| `grant_redundant` | `Grant adds no authority` |
| `principal_closed` | `Principal is closed` |
| `color_name_claimed` | `Color name unavailable` |
| `tag_key_claimed` | `Tag key unavailable` |
| `report_exists` | `Report already exists` |
| `rank_epoch_expired` | `Catalog snapshot expired` |
| `precondition_failed` | `Precondition failed` |
| `request_invalid` | `Invalid request body` |
| `query_invalid` | `Invalid query` |
| `cursor_invalid` | `Invalid cursor` |
| `namespace_spelling_invalid` | `Invalid namespace spelling` |
| `namespace_spelling_reserved` | `Reserved namespace spelling` |
| `recovery_secret_invalid` | `Invalid recovery secret` |
| `palette_content_invalid` | `Invalid palette content` |
| `precondition_required` | `Precondition required` |
| `abuse_window_exceeded` | `Request limit exceeded` |
| `content_digest_collision` | `Content integrity failure` |
| `platform_consistency_fault` | `Platform consistency failure` |
| `edge_cookie_contract_violation` | `Session response rejected` |
| `platform_uninitialized` | `Platform not initialized` |
| `dependency_unavailable` | `Dependency unavailable` |
| `edge_origin_timeout` | `Origin response unavailable` |

## 7. Required vectors

W14/W16 prove query unknown/duplicate keys, normalized-equivalent search, cursor tamper/route/query/Principal/key-rotation/epoch mismatch, 500 misses plus continuation, owner inventory `create→publish→unpublish→trash→restore`, premature public conflict and restore/private→public after a Release. W16/W23 prove every discriminated mutation, proposed-vs-proof secret errors, exact Problem decoding and durable replay tuples after later mutation/purge. W12/W14/W16 prove a public source→fork→ancestor unpublish/trash/withdraw/purge emits only the opaque unavailable provenance step.


---

<!-- ===== verbatim: PALETTE-FACILITIES.md ===== -->

# Tranche V — Palette Facility Disposition

This is the formation-time decision for every live API route and every live palette export. W1 reproduces these decisions against the wire; it does not decide product scope. **REPLACE** means the current route is RETIRED and the named clean target is BUILD. No old spelling, toggle, alias or compatibility mount survives.

`PALETTE-WIRE-CONTRACT.md` owns DTO/query/Problem shape, `PALETTE-CURSOR-CONTRACT.md` the sixteen paged scan coordinates and bytes, `PALETTE-OPERATIONS-REPLAY-CONTRACT.md` mutation binding/permanent replay bytes, `PALETTE-LOCAL-RAIL.md` the real-HTTPS local profile, and `PALETTE-EXPORT-CONTRACT.md` the five client serializers. These are one facility contract, not optional implementation notes or parallel route registries.

## 1. Terminal principles

- Product identity is principal/recovery based; a public handle never authenticates.
- Owner work is a private Workspace; public content is an immutable Release under a stable Handle.
- Moderation changes separately clocked policy, never immutable bytes.
- Names, tags, reports, principals and grants retain attributable decisions; destructive deletion is not review.
- Generic batch/import/prune/impersonation facilities are retired. Typed single-resource commands plus leased purge are the only bulk/maintenance substrate.
- `/openapi.json` remains only as a projection of the mounted typed route definitions. The hand-maintained route table and custom HTML `/docs` page die.
- Product traffic is fail-closed until the DB-direct initial-authority transaction inserts immutable `PlatformState(primary-ready)`; pre-bootstrap product routes are `503 platform_uninitialized`, not a path to a rootless database.
- Browser auth is one same-origin HttpOnly `__Host-value-session` cookie. `Authorization`, `X-Session-Token`, browser token storage and credentialed cross-origin API use are retired.

## 2. All 52 current routes

| # | Current route | Terminal V disposition | Target contract and owner |
|---:|---|---|---|
| 1 | `GET /` | **RETIRE** duplicate sentinel | `/health` is the sole operator health surface; W4/W10 |
| 2 | `GET /health` | **BUILD** | liveness plus readiness over Mongo/version/commit and `PlatformState(primary-ready)`/AuthorityGuard consistency; pre-bootstrap is `503` not-ready; no product UI; W10/W33 |
| 3 | `GET /docs` | **RETIRE** | W10 physically deletes the handler/custom HTML and `api/src/modules/meta/route-table.ts`; W16 proves mounted absence before any complete-surface claim; W33 writes repository canon only |
| 4 | `GET /openapi.json` | **BUILD** | W10 installs projection from mounted typed routes/schemas and deletes the hand-kept table; W16 integrates/verifies all 50 routes; W33 only verifies released canon |
| 5 | `POST /sessions` | **REPLACE** | same path registers Principal + exact client-generated `rs1_` 32-byte secret whose versioned HMAC verifier alone persists + same-origin HttpOnly session transactionally; W10/W16/W23 |
| 6 | `POST /sessions/login` | **RETIRE** | `POST /sessions/recover` requires public handle + recovery secret; W10/W16/W23 |
| 7 | `DELETE /sessions` | **BUILD** | revoke current hashed session; W10/W15/W23 |
| 8 | `GET /sessions/me` | **BUILD** | current Principal/PublicHandle/status, with a real client consumer; W10/W15/W23 |
| 9 | `GET /palettes` | **BUILD** | access-filtered rank-epoch catalog of active visible Releases; W14/W16/W22 |
| 10 | `GET /palettes/mine` | **RETIRE** | `/me/workspaces?state={unpublished,published,trash}`; W11/W14/W23 |
| 11 | `GET /palettes/:slug` | **REPLACE** | visible active Release resource with shared access predicate; W11/W14/W22 |
| 12 | `POST /palettes` | **RETIRE** | `POST /workspaces` creates private Handle + Workspace; W11/W16/W23 |
| 13 | `PATCH /palettes/:slug` | **RETIRE** | `PATCH /workspaces/:id` under Workspace revision; W11/W16/W23 |
| 14 | `DELETE /palettes/:slug` | **RETIRE** | `PATCH /palette-handles/:id` to `trashed` under Handle generation; W11/W16/W23 |
| 15 | `POST /palettes/:slug/restore` | **RETIRE** | same Handle command restores `active/private`; W11/W16/W23 |
| 16 | `POST /palettes/:slug/vote` | **RETIRE** toggle | declarative `PUT /palettes/:slug/votes` or `DELETE /palettes/:slug/votes`; W13/W16/W23 |
| 17 | `POST /palettes/:slug/flag` | **RETIRE** | `POST /palettes/:slug/releases/:releaseNo/reports`; W13/W16/W23 |
| 18 | `POST /palettes/:slug/fork` | **RETIRE** | `POST /palettes/:slug/releases/:releaseNo/forks`; W13/W16/W23 |
| 19 | `GET /palettes/:slug/forks` | **RETIRE** | release-specific `/forks`; W13/W14/W23 |
| 20 | `GET /palettes/:slug/provenance` | **RETIRE** | release-specific `/provenance` over durable tombstones; W12–W14/W23 |
| 21 | `GET /palettes/:slug/versions` | **RETIRE** | `/palettes/:slug/releases`; W12/W14/W23 |
| 22 | `GET /palettes/:slug/versions/:hash` | **RETIRE** | `/palettes/:slug/releases/:releaseNo`; no global hash identity; W12/W14/W23 |
| 23 | `POST /palettes/:slug/revert` | **RETIRE** | `POST /workspaces/:id/restore-release` copies one same-lineage Release under Workspace CAS; W12/W16/W23 |
| 24 | `POST /palettes/:slug/publish` | **RETIRE** | `POST /workspaces/:id/releases` with Workspace + Handle clocks; W11/W16/W23 |
| 25 | `POST /palettes/:slug/unpublish` | **RETIRE** | Handle visibility command under generation; W11/W16/W23 |
| 26 | `GET /colors/approved` | **REPLACE** | `/color-names?state=approved` over visible decision records; W14/W16/W22 |
| 27 | `GET /colors/search` | **REPLACE** | `GET /color-names/search`; indexed bounded approved-name search, not arbitrary regex; W14/W16/W22 |
| 28 | `GET /colors/tags` | **REPLACE** | `/tag-definitions?state=active`; W14/W16/W22 |
| 29 | `POST /colors/propose` | **REPLACE** | `/color-name-proposals`; actor comes only from session; W13/W16/W23 |
| 30 | `GET /admin/audit` | **BUILD** | cursor query of durable attributable events under `audit:read`; W10/W16/W24 |
| 31 | `GET /admin/queue` | **REPLACE** | `/admin/color-name-proposals?state=pending`; W13/W16/W24 |
| 32 | `GET /admin/colors/approved` | **REPLACE** | same proposal/decision collection filtered `approved`; W13/W16/W24 |
| 33 | `DELETE /admin/colors/:id` | **RETIRE** destructive deletion | policy transition to `withdrawn` with reason/evidence; W13/W16/W24 |
| 34 | `POST /admin/colors/:id/approve` | **REPLACE** | `PATCH /admin/color-name-proposals/:id/policy` with policy ETag; W13/W16/W24 |
| 35 | `POST /admin/colors/:id/reject` | **REPLACE** | same policy command to `rejected`; W13/W16/W24 |
| 36 | `POST /admin/palettes/:slug/feature` | **RETIRE** body-ambiguous verb | `PATCH /admin/palette-policies/:paletteId` under policy revision; W12/W16/W24 |
| 37 | `DELETE /admin/palettes/:slug` | **RETIRE** | policy withdrawal suppresses public reads and preserves evidence; W12/W16/W24 |
| 38 | `GET /admin/users` | **REPLACE** | `/admin/principals` under `principal:read`; W10/W16/W24 |
| 39 | `POST /admin/users/prune-empty` | **RETIRE** | zero-palette Principals are valid; leased lifecycle purge is W10/W11 |
| 40 | `GET /admin/users/:slug/palettes` | **REPLACE** | `/admin/principals/:id/palette-handles`; W10/W14/W24 |
| 41 | `POST /admin/users/:slug/status` | **REPLACE** | `PATCH /admin/principals/:id/policy` under Principal revision; W10/W16/W24 |
| 42 | `DELETE /admin/users/:slug` | **RETIRE** raw cascade | `POST /admin/principals/:id/close` executes the decided NamespaceClaim-retirement/revocation transaction; W10/W16/W24 |
| 43 | `DELETE /admin/users/:slug/palettes` | **RETIRE** | W10 deletes the server route; W16 proves it is not mounted; W24 proves no UI action calls or implies a parallel cascade. Individual Handle lifecycle or Principal close owns aftermath |
| 44 | `POST /admin/users/:slug/import` | **RETIRE** | W10 deletes the server route; W16 proves it is not mounted; W24 proves UI absence. Admin may not fabricate ownership or partially import public palettes; owner workspace import is new product work if later requested |
| 45 | `POST /admin/impersonate` | **RETIRE** | scoped grants and test fixtures replace indistinguishable target-user sessions; W10 |
| 46 | `GET /admin/tags` | **REPLACE** | `/admin/tag-definitions`; W11/W14/W24 |
| 47 | `POST /admin/tags` | **REPLACE** | create stable TagDefinition under `tag:write`; W11/W16/W24 |
| 48 | `DELETE /admin/tags/:name` | **RETIRE** cascade | policy transition to `retired`; existing Release manifests remain immutable; W11/W16/W24 |
| 49 | `GET /admin/flagged` | **REPLACE** | `/admin/reports?state=open`; W13/W14/W24 |
| 50 | `DELETE /admin/flags/:paletteSlug` | **RETIRE** evidence deletion | `PATCH /admin/reports/:id` to resolved/dismissed with reason and policy effect; W13/W16/W24 |
| 51 | `POST /admin/batch/palettes` | **RETIRE** | W10 deletes the server route, W16 proves mounted absence, and W24 proves UI absence; typed per-resource commands and leased purge replace it |
| 52 | `POST /admin/batch/users` | **RETIRE** | W10 deletes the server route, W16 proves mounted absence, and W24 proves UI absence; typed Principal policy/close/grant commands replace it |

## 3. Exact target surface of record

This table freezes the complete HTTP vocabulary before execution. `PALETTE-WIRE-CONTRACT.md` is the closed decoder/query/page/item/mutation/problem authority for every row; its schema IDs are normative. W1 may discover that the current wire differs; it may not rename, add, omit or leave a target DTO to execution. There is no alias mount for a retired route.

Every public handle and palette slug body, CLI input and route segment obeys the one canonical spelling/decoding/reserved-word contract in `PALETTE-DOMAIN.md §2`; registration, bootstrap, Workspace create, Handle rename, fork and lookup may not define local variants. Every target HTTP mutation carries a caller-generated canonical lowercase UUIDv7 `Idempotency-Key`; the server derives `registration`, `recovery:<publicHandleClaimId>`, or `principal:<principalId>` as the receipt namespace under `PALETTE-DOMAIN.md §4`. Every mutable target carries the wire contract's single exact strong `If-Match`, and a multi-resource command carries its second expected clock in the typed body. Secret-bearing JSON is exact/unknown-field-free and ≤1 KiB. `RecoverySecret` is exactly `rs1_` plus canonical unpadded base64url of 32 CSPRNG bytes; envelope/key/type checks precede receipt lookup, then the Domain role law decides proposed 422 versus current-proof 401. Rotation always carries both old and new fields. Only the versioned, secret-manager-keyed HMAC-SHA-256 verifier persists. `SessionToken` is exactly `st1_` plus canonical unpadded base64url of 32 CSPRNG bytes; only its frozen SHA-256 domain digest persists, and its 30-day absolute horizon never slides. Browser sessions use only the wire contract's exact `__Host-value-session` cookie through same-origin relative `/api`; session responses return no bearer, and every browser `POST`/`PUT`/`PATCH`/`DELETE` obeys the Domain's exact unsafe origin/fetch tuple. No direct cross-origin browser API, CORS, `Authorization`, `X-Session-Token`, localStorage or sessionStorage auth path survives. With no completed receipt the transaction first reserves an invisible intent; only its winner rechecks/CASes the actor AuthFence before effect, and an invalid/aborted transaction exposes no intent. A cross-Principal lifecycle/credential/grant change also CASes the target fence; distinct fences use ascending Principal UUID order, then AuthorityGuard. Every transaction retry restarts receipt precedence and repeats status/session epoch/bounded PrincipalAuthority checks. Authenticated completed-receipt lookup binds the exact initiating session or command-linked rotation successor and precedes current scope/status checks only as the narrow non-secret replay rule in `PALETTE-DOMAIN.md §4`; retained revoked-session digests never authorize a new command. A different valid session using an occupied key receives non-result-bearing 409 after ordinary scope auth, never a false 401. Secret-bearing browser intents persist only a non-secret retry shell and require secret re-entry after reload. Every list uses its exact Wire query decoder and the one opaque AEAD coordinate/envelope in `PALETTE-CURSOR-CONTRACT.md`; no route invents another cursor schema. Admin access for a new effect means a current-epoch session plus the bounded current PrincipalAuthority union containing the route scope, rechecked behind the actor fence.

Resource identity follows the Wire's typed split. Idempotency keys and live-only Workspace/Principal/Grant/Report coordinates are UUIDv7. PaletteHandle, PaletteRelease, ColorNameProposal and TagDefinition coordinates are `ResourceId` v5|v7 because the deterministic clean cut creates live v5 rows that the same public/admin facilities must read and govern; ordinary creates still mint v7. No compatibility lookup, ID rewrite or shadow row stands between those forms.

| # | Target method/path | Binding authority and request/result | Owner / reachable consumer |
|---:|---|---|---|
| 1 | `GET /health` | operator liveness/readiness; Mongo/version/commit plus `PlatformState(primary-ready)` and AuthorityGuard consistency; `200` ready or `503` not ready, with pre-bootstrap explicitly not ready | W10/W33; operator only |
| 2 | `GET /openapi.json` | generated from this mounted typed surface and schemas; no parallel route table or custom `/docs` handler | W10/W16; operator/developer |
| 3 | `POST /sessions` | initialized platform, exact same origin; exact `{publicHandle,recoverySecret}`. Envelope first; no receipt treats secret as proposal (malformed 422), matching receipt treats it as current proof (malformed/wrong 401). Exact proof-backed completed replay bypasses the 5/10m registration-new-effect source budget; a new effect consumes it. There is no registration-handle budget. Reserves unique `("registration",commandId)` before the claim and atomically inserts permanent claim, Principal, zero PrincipalAuthority, AuthFence, HMAC verifier, current-epoch session, audit and completed non-secret receipt. Replay re-reads/reverifies the receipt-bound active credential behind AuthFence; same key+different handle is `409 idempotency_key_reused`; only a distinct key reaching an active/retired claim returns `409 public_handle_claimed` | W10/W15/W16/W23 registration |
| 4 | `POST /sessions/recover` | initialized platform, exact same origin; exact `{publicHandle,recoverySecret}`. Dummy/real verification precedes failed-proof budgets: correct proof/replay bypasses them; failed proof consumes 10/15m source and 5/15m canonical-handle rows without allowing attacker lockout. After canonical claim lookup and constant-policy active-credential verification derives `recovery:<claimId>`, reserves/replays its receipt, CASes AuthFence and issues a fresh HttpOnly cookie without storing/returning a bearer. Malformed/wrong/closed/suspended cases share `401 recovery_invalid` and create no receipt | W10/W15/W16/W23 recovery |
| 5 | `POST /sessions/recovery-credentials` | current cookie + Principal `If-Match`; body is always exact `{currentRecoverySecret,newRecoverySecret}`. On receipt miss current is proof (malformed/wrong 401) and new is proposal (malformed 422). One AuthFence transaction advances `policyEpoch`, inserts the new HMAC verifier, binds its credential ID to the receipt, revokes old, invalidates every old-epoch session, marks the initiating row and issues a replacement cookie whose session records `issuedByCommandId`. On matching completed receipt the marked predecessor or command-linked successor ignores current entirely, treats new as proof of the re-read receipt-bound active credential (malformed/wrong 401), and may mint another successor. Neither branch rotates twice | W10/W15/W16/W23 account sheet |
| 6 | `DELETE /sessions` | current cookie identity; in one receipt transaction binds `authSessionId`, retains the hashed session row with `revokedByCommandId=commandId` through its fixed server expiry, revokes it and returns non-secret completion **without clearing the cookie**. A lost-body retry from that exact cookie/key/binding retrieves only the completed result; same cookie/key with another binding is 409, while any fresh command is 401. The session cookie is left untouched, may disappear at browser-session end, and is unusable no later than the fixed server expiry | W10/W15/W16/W23 logout |
| 7 | `GET /sessions/me` | current unexpired/current-policy cookie returns exactly `PALETTE-WIRE-CONTRACT.md §4` current-session DTO including sorted current scope union, no token/grant witness. A revoked/stale-policy/absent cookie is generic 401 with **no Set-Cookie mutation**; W15 uses this read under its cross-tab lease to re-derive auth without risking deletion of a newer cookie | W10/W15/W16/W23 auth owner |
| 8 | `GET /me/workspaces?state={unpublished,published,trash}` | `Q-WORKSPACES`; owner-only total disjoint Handle/Workspace inventory with visibility/moderation substate and exact `trashedAt/purgeAfter` grace coordinates on trash; never DeviceDrafts | W11/W14–W16/W22–W23 |
| 9 | `POST /workspaces` | current Principal; exact `{displayName,slug,orderedNamedColors,tagIds}` from `PALETTE-WIRE-CONTRACT.md`; inserts the permanent palette-slug NamespaceClaim and creates private Handle + Workspace + clear PalettePolicy atomically with `reason="lineage created"` and the authenticated creator; active or retired claim is `409 palette_slug_claimed`; returns both IDs/ETags | W11/W13/W15–W16/W23 |
| 10 | `GET /workspaces/:workspaceId` | owning Principal; returns private Workspace, linked Handle ID and Workspace ETag | W11/W14–W16/W23 |
| 11 | `PATCH /workspaces/:workspaceId` | owner + Workspace `If-Match`; exact nonempty `WorkspacePatch`; returns advanced Workspace ETag and permanent replay tuple | W11–W16/W23 |
| 12 | `POST /workspaces/:workspaceId/releases` | owner + Workspace `If-Match`; exact `{expectedHandleGeneration}`; atomically publishes a new immutable Release with server-set `publicHistory=true`, its clear ReleasePolicy carrying `reason="release published"` and the authenticated publisher, and advances Handle/Workspace clocks. No history/policy input or toggle exists | W11–W16/W23 publish |
| 13 | `POST /workspaces/:workspaceId/restore-release` | owner + Workspace `If-Match`; `{releaseNo}` restricted to the linked lineage; copies manifest into Workspace and returns its new ETag | W12–W16/W23 history |
| 14 | `GET /palette-handles/:paletteId` | owner-only opaque identity; returns named Handle and PalettePolicy body clocks plus lifecycle/visibility and exact trash/grace times when trashed; the composite emits no HTTP ETag | W11/W14–W16/W23 |
| 15 | `PATCH /palette-handles/:paletteId` | owner + Handle `If-Match`; exact `HandleChange`. Rename inserts the new permanent claim, retires the old claim and CASes generation; public requires an active Release, private is unpublish, trash/restore enforce source state, and restore is `active/private` | W11–W16/W23 |
| 16 | `GET /palettes` | `Q-CATALOG`; public access-filtered immutable RankEpoch catalogue published only through the singleton CatalogBuildState's atomic pointer/`builtRevision` CAS under the exact token/score/color-distance law; card counts are labeled JSON-safe epoch snapshots. An absent/malformed/revoked/stale cookie is anonymous, not 401; old offset/visibility/userSlug inputs are absent | W14/W16/W22 |
| 17 | `GET /palettes/:slug` | shared access predicate; returns active Release plus lineage identity/policy projection and exact current edge/access counts with read timestamp, never a private Workspace. Optional invalid auth is anonymous; a valid current session alone personalizes vote membership | W11/W14/W16/W22 |
| 18 | `GET /palettes/:slug/releases` | `Q-RELEASES`; public shared-access predicate only; visible immutable release summaries and continuation. Authentication never upgrades this route into owner history | W12/W14/W16/W23 |
| 19 | `GET /palettes/:slug/releases/:releaseNo` | shared access predicate scoped to both slug and palette-local release number; returns immutable Release ETag | W12/W14/W16/W23 |
| 20 | `GET /palettes/:slug/releases/:releaseNo/forks` | `Q-FORKS`; shared source predicate; destination independently passes public predicate; no private target/actor, cursor from last scanned edge | W12–W14/W16/W23 |
| 21 | `GET /palettes/:slug/releases/:releaseNo/provenance` | `Q-PROVENANCE`; every hop rechecks its own public predicate; hidden/purged ancestors become non-correlatable `{kind:"unavailable",ordinal}` steps | W12–W14/W16/W23 |
| 22 | `PUT /palettes/:slug/votes` | active Principal + shared access predicate; declaratively ensures one lineage vote edge | W13/W15–W16/W23 |
| 23 | `DELETE /palettes/:slug/votes` | active Principal + shared access predicate; declaratively ensures absence of that lineage vote edge | W13/W15–W16/W23 |
| 24 | `POST /palettes/:slug/releases/:releaseNo/forks` | active Principal + visible immutable Release; exact body `{slug}`. Atomically claim the permanent destination slug, create an active/private Handle at generation 1 with no active Release, copy the source manifest into an owned Workspace at revision 1/basedOnReleaseId, create clear PalettePolicy at revision 1 with `reason="lineage created"` and the authenticated forker, plus fork edge/audit/receipt; claimed active or retired slug is `409 palette_slug_claimed`. Return Handle/Workspace IDs and ETags | W12–W16/W23 |
| 25 | `POST /palettes/:slug/releases/:releaseNo/reports` | active Principal + visible Release; `{reason,evidence}` creates the sole immutable Report for `(principal,release)`, stores targetPaletteId and pins the immutable Release/ContentObject target snapshot; repeat under another command is `409 report_exists` with only the caller's typed report reference | W13/W15–W16/W23 |
| 26 | `GET /color-names?state=approved` | `Q-NAMES-APPROVED`; public current approved ColorNameSlot/Proposal projection | W14/W16/W22 |
| 27 | `GET /color-names/search` | `Q-NAMES-SEARCH`; exact Domain normalizer, approved slots only | W14/W16/W22 |
| 28 | `POST /color-name-proposals` | active Principal; `{name,color,evidence}`; atomically claims the normalized-name slot or returns named `409 color_name_claimed` | W13/W15–W16/W23 |
| 29 | `GET /tag-definitions?state=active` | `Q-TAGS-PUBLIC`; public active stable tag IDs/labels/categories | W11/W14/W16/W22 |
| 30 | `GET /admin/audit` | `Q-AUDIT`; `audit:read`; immutable attributable AuditEvents | W10/W14–W16/W24 |
| 31 | `GET /admin/color-name-proposals?state={pending,approved,rejected,withdrawn}` | `Q-PROPOSALS`; `name:review`; proposal/policy/slot query | W13–W16/W24 Names |
| 32 | `PATCH /admin/color-name-proposals/:proposalId/policy` | `name:review` + ColorNamePolicy `If-Match` reconstructed from the Policy revision and Proposal's immutable `claimedRevision`; `{state,reason,expectedClaimRevision}` names the current Slot revision. The transaction requires Proposal claim generation, Slot revision and Slot pointer to agree before the decision/release CAS | W13/W15–W16/W24 Names |
| 33 | `GET /admin/palette-policies/:paletteId` | `palette:review`; returns separately clocked lineage policy/ETag plus the current attributed reason: runtime initial `"lineage created"`/creator, later mutation reason/actor, or both absent only on a cut-created initial policy | W12/W14–W16/W24 Flagged |
| 34 | `PATCH /admin/palette-policies/:paletteId` | `palette:review` + PalettePolicy `If-Match`; exact `PalettePolicyChange`; one nonredundant `catalogTier` plus moderation | W12–W16/W24 Flagged |
| 35 | `GET /admin/release-policies/:releaseId` | `palette:review`; returns separately clocked immutable-release policy/ETag plus the current attributed reason: runtime initial `"release published"`/publisher, later mutation reason/actor, or both absent only on a cut-created initial policy | W12/W14–W16/W24 Flagged |
| 36 | `PATCH /admin/release-policies/:releaseId` | `palette:review` + ReleasePolicy `If-Match`; `{moderation,reason}`; never mutates Release bytes | W12–W16/W24 Flagged |
| 37 | `GET /admin/principals` | `Q-PRINCIPALS`; `principal:read`; status/handle-prefix list | W10/W14–W16/W24 Users |
| 38 | `GET /admin/principals/:principalId` | `principal:read`; Principal/PublicHandle/status and ETag plus exact current lifecycle reason/actor and `closedAt` iff closed | W10/W15–W16/W24 Users |
| 39 | `GET /admin/principals/:principalId/palette-handles` | `Q-PRINCIPAL-HANDLES`; `principal:read`; all active/trashed owned Handles with named Handle/PalettePolicy clocks, current policy rationale and exact trash/grace times | W10/W14–W16/W24 Users |
| 40 | `PATCH /admin/principals/:principalId/policy` | `principal:write` + Principal `If-Match`; exactly `{op:"suspend",reason}` or `{op:"reactivate",reason}`. One bounded target projection/AuthorityGuard delta advances policy epoch, inserts one projection-invalidation marker and completes receipt; public reads join status immediately; closed is terminal | W10/W15–W16/W24 Users |
| 41 | `POST /admin/principals/:principalId/close` | `principal:close` + Principal `If-Match`; exact `{confirmation:"close permanently",reason}`; active/suspended only. One O(1) AuthFence/guard delta transaction records `closedAt`, retires PublicHandle claim, inserts one projection-invalidation marker plus the 30-day `principal-aftermath` job carrying the close receipt's exact namespace, command, edge correlation, actor and authority witness, and commits audit/receipt. Read-time status suppresses Handles immediately; after eligibility the bounded aftermath first CAS-transitions each active owned Handle to trashed/private, copies every cause field to the ordinary palette job and emits one cause-correlated batch event; only ordinary palette `seal` may purge it | W10/W15–W16/W24 Users |
| 42 | `GET /admin/principals/:principalId/grants` | `Q-GRANTS`; `grant:read`; paged immutable grant/revocation history including the exact immutable `creationReason` and sole discriminated `GrantAttribution` | W10/W14–W16/W24 Users |
| 43 | `POST /admin/principals/:principalId/grants` | `grant:write` + target Principal `If-Match`; exact grant-create DTO/delegation law from `PALETTE-WIRE-CONTRACT.md`: actor cannot delegate outside its union, either root-bearing scope requires actor hold both, target closed conflicts, redundant/no-new-scope conflicts, active set remains ≤11; bounded PrincipalAuthority/eligibleCount delta; success persists the canonical body reason and principal attribution returned by r42/r43/r44 | W10/W15–W16/W24 Users |
| 44 | `PATCH /admin/grants/:grantId` | `grant:write` + Grant `If-Match`; only `{op:"revoke",reason}`; bounded PrincipalAuthority/eligibleCount delta then one retained revocation | W10/W15–W16/W24 Users |
| 45 | `GET /admin/tag-definitions?state={active,retired}` | `Q-TAGS-ADMIN`; `tag:read`; stable definition query | W11/W14–W16/W24 Tags |
| 46 | `POST /admin/tag-definitions` | `tag:write`; `{key,label,category}`; permanently claims normalized key and creates stable active definition; concurrent/reused key is `409 tag_key_claimed` | W11/W13/W15–W16/W24 Tags |
| 47 | `PATCH /admin/tag-definitions/:tagId` | `tag:write` + TagDefinition `If-Match`; only `{op:"retire",reason}`; advances revision and performs zero Release writes | W11–W16/W24 Tags |
| 48 | `GET /admin/reports?state={open,resolved,dismissed}` | `Q-REPORTS`; `report:review`; immutable evidence plus review state | W13–W16/W24 Flagged |
| 49 | `PATCH /admin/reports/:reportId` | `report:review` + Report `If-Match`; exact `ReportReview`; target derived from Report and optional policy CAS atomic | W12–W16/W24 Flagged |
| 50 | `GET /palette-handles/:paletteId/releases` | `Q-OWNER-RELEASES`; current owner of the live Handle; every immutable Release in the active or trashed lineage regardless of visibility, moderation or active pointer. Absent, system-owned, foreign or purged identities are concealed as 404 | W11/W12/W14/W16/W23 owner history |

The first admin is not an HTTP exception. W10 owns one deployment-only, DB-direct `admin:bootstrap` command absent from the application server. Trusted deployment workload identity authorizes it; the operator supplies `{publicHandle,recoverySecret}` over stdin, where `recoverySecret` is exactly the canonical OS-CSPRNG `rs1_` + 32-byte form, and keeps it offline. The command runs only against a fresh target schema with no PlatformState, bootstrap tombstone, AuthorityGuard, Principal, PrincipalAuthority or Grant. Before its transaction it mints one canonical UUIDv7 correlation using current Unix milliseconds and OS-CSPRNG random bits. One Mongo transaction inserts immutable `PlatformState(primary-ready)` and bootstrap tombstone carrying that correlation, permanent PublicHandle NamespaceClaim, initial Principal/AuthFence, HMAC verifier, and an initial grant containing **exactly** `audit:read`, `name:review`, `palette:review`, `principal:read`, `principal:write`, `principal:close`, `grant:read`, `grant:write`, `tag:read`, `tag:write`, and `report:review`—no wildcard and no unlisted scope—with `creationReason="initial authority bootstrap"` and the sole workload representation `attribution={kind:"bootstrap-workload",bootstrapRecordId:"initial-admin"}`. No nullable/scalar creator, system flag or false self-grantor exists; deployment identity/commit live on that referenced BootstrapRecord and are bound by the Domain's exact bootstrap after-projection. The transaction also inserts the exact eleven-bit/unit-refcount PrincipalAuthority, AuthorityGuard `{epoch:1,eligibleCount:1}`, and exactly one AuditOutbox row with absent actor/command and that same correlation; ordinary delivery creates exactly one AuditEvent through the sole writer, and the existing DTO gains no ad-hoc provenance fields. Before commit `/health` is 503-not-ready and every product route is `503 platform_uninitialized`; registration cannot race the bootstrap. The tombstones are permanent; a second invocation fails even if every admin later closes. Plaintext is never logged or persisted and is cleared from the deployment process/input channel after success; only the operator's offline copy survives.

Root eligibility is active Principal status plus bounded PrincipalAuthority bits for both `grant:write` and `principal:close`. Grant create/revoke and Principal suspend/reactivate/close CAS the one AuthorityGuard epoch and apply only the target's before/after delta to `eligibleCount`, aborting zero with `409 last_root_authority`; request-time commands never scan all grants/Principals. Concurrent authorized self-removals from two holders yield one success and one named 409. In the distinct cross-target mutual-removal race, the winning effect makes the other actor's retried fence check fail ordinary 401/403 with zero second effect. Epoch-stable periodic reconciliation derives each expected projection from its ≤11 active immutable grants and records the full holder digest outside the authority path. Loss of all authority never reopens bootstrap.

## 4. Missing ontology, now decided

| Resource | Identity and clock | Binding lifecycle / aftermath |
|---|---|---|
| `Principal` | UUID + `principalRevision`; `active | suspended | closed` | only active→suspended, suspended→active and active/suspended→closed exist; closed is terminal and cannot receive a grant. Lifecycle advances AuthFence policy, blocks recovery/old sessions and suppresses owned public Handles. Close records `closedAt`, retires the permanent PublicHandle claim and queues one delayed aftermath in the terminal transaction. At 30 days that worker pages owned IDs, explicitly moves each still-active Handle to trashed/private with a generation and palette job under the batch's sole `purge` outbox row, and leaves all deletion to the ordinary sealed palette lifecycle; it never gates authority or receipt. |
| `AdminGrant` | immutable grant UUID + `revocationRevision` strong ETag | creation is revision 0 and permanently stores `creationReason` plus exactly one `GrantAttribution` arm: authenticated Principal for r43 or `{kind:"bootstrap-workload",bootstrapRecordId:"initial-admin"}` for the initial grant. The sole revocation CAS sets revision 1 plus `revokedAt/revokedBy/reason` without rewriting creation provenance. No nullable/alias creator, second transition, shared token or impersonation. |
| `BootstrapRecord` | immutable singleton `initial-admin` | deployment identity/commit, the one bootstrap correlation, consumed time and created Principal/Grant IDs persist permanently; no HTTP or re-bootstrap path. |
| `PlatformState` | immutable singleton `primary-ready` | inserted only with bootstrap; product routes require it and health remains not-ready before it exists. |
| `PrincipalAuthority` | Principal UUID + revision; eleven fixed refcounts/bits and ≤11 sorted active grant IDs | bounded current authority projection; authorization validates it and inspects at most the active set, never historical grants. Registration creates zero; bootstrap creates eleven unit counts. |
| `AuthorityGuard` | singleton `root-authority` + monotonic epoch/eligibleCount | every grant/status change CASes it and applies one target eligibility delta; zero aborts. Epoch-stable full digest reconciliation is evidence/repair, not request authority. |
| `AuthFence` | Principal UUID + `lockRevision`/`policyEpoch` | every authenticated effect/session issuance CAS-writes the lock and rechecks current session/status/grant union in-transaction; lifecycle/credential policy advances the epoch. It is not a public ETag. |
| `RecoveryCredential` | UUID + `verifierKeyId` + 32-byte MAC | exact canonical `rs1_` 32-byte secret is shown once; HMAC-SHA-256 over the frozen length-delimited tuple under a secret-manager key is the sole verifier. Rotation advances policy, invalidates old sessions and revokes old verifier atomically. |
| `Session` / authenticated `CommandReceipt` | opaque session UUID + one-way digest of exact `st1_` 32-byte cookie; receipt `(principal:<principalId>,commandId)` + exact `authSessionId` and permanent field-encrypted replay tuple | `__Host-value-session` is HttpOnly and same-origin only, with a fixed 30-day server horizon/no sliding renewal. Revocation retains the digest/tombstone only through server expiry. Only the operations wrapper decrypts exact private response bytes after same-session or command-linked-successor authorization; another valid session gets non-result-bearing 409. Palette purge explicitly excludes receipts/audit. |
| `NamespaceClaim` | permanent unique `(public-handle|palette-slug, normalizedSpelling)` + `claimRevision` | inserted on first acquisition and never deleted/reassigned. Close/rename may only retire the same subject's active row; rename claims the destination before retiring the source under one transaction, so reclaim races serialize on one collection. Every active claim resolves one live subject; every retired claim resolves that surviving subject or its same-ID identity tombstone. The cut uses this same law for legacy handle reservation. |
| `ColorNameProposal` / `ColorNameSlot` | immutable proposal UUID with stored `displayName` and `claimedRevision`; globally unique normalized-name slot + current `claimRevision` | authenticated actor is server-derived. The only nullable-actor exception is an immutable approved legacy-system row produced by the clean cut and labeled `attribution=system`; it has no write authority. Exactly one pending or approved claim may occupy a slot. First claim is revision 1; each successor claim increments once and stores that resulting generation on the new Proposal. Legal transitions are pending→approved/rejected/withdrawn and approved→withdrawn; rejected/withdrawn are terminal. Reject/withdraw atomically releases the matching slot without rewriting the Proposal's claim generation; resubmission advances the retained Slot rather than rewriting/reopening history. An old ETag remains reconstructible and cannot authorize against a successor Slot. Concurrent claims yield one success and one named 409. Public reads expose approved only; decisions are never deleted. |
| `TagDefinition` | UUID + `revision`; normalized permanently unique key | `active | retired`; retirement never releases the key or edits Release bytes. The clean cut may create an immutable `attribution=system` definition with no Principal creator; every ordinary create is Principal-attributed. Workspaces display retired tags but Publish rejects them until removed. Releases retain `{tagId,labelAtPublish}` and public retired labels are non-filtering historical text. |
| `Report` | immutable report UUID; permanent unique `(actorId,targetReleaseId)`; targetPaletteId + pinned target snapshot; separately clocked review state | target is one immutable Release/ContentObject snapshot; `open | resolved | dismissed`, decision actor/reason/time and exact applied effect `{none|palette-policy|release-policy,beforeRevision?,afterRevision?,moderation?}` persist after active/policy change or purge. Repeat returns only the caller's stable case, and review never releases identity. No bulk dismissal/delete. |
| `PalettePolicy` / `ReleasePolicy` | existing policy revisions | nonredundant `catalogTier: standard|featured` and moderation are CAS policy changes. The old featured boolean/archived pseudo-tier die. Admin never mutates Release bytes or uses owner lifecycle as moderation. |
| `AuditEvent` | immutable event UUID | `PALETTE-DOMAIN.md §Committed-effect audit construction` is the sole builder authority: its exhaustive producer table fixes event cardinality, action, subject and metadata presence; its closed RFC 8785 projection union and one domain-separated digest fix both sides. r49 is one Report event even with a policy effect; bootstrap and delayed jobs use their single persisted correlations. There is no outcome field, replay event, route-local hash object, worker fanout or failed-attempt writer. |
| `CatalogBuildState` | singleton `catalog` + monotonic `dirtyRevision`/`builtRevision`, published epoch pointer and lease epoch | every catalog-affecting committed effect advances `dirtyRevision` once instead of appending an event. One leased builder coalesces revisions into an unreachable complete candidate, then atomically publishes its pointer and acknowledges exactly the snapshotted revision. Rows expire at their fixed 24-hour instant; clean state refreshes before expiry. No per-mutation projection queue, partial epoch, false acknowledgement or fallback catalogue survives. |
| purge lease/provenance | job UUID + lease epoch + unique `(kind,subjectId,causeReceiptNamespace,causeCommandId)` episode; 30-day eligibility; permanent Handle/Release tombstones plus retained NamespaceClaims | The job persists the triggering command's literal `causeReceiptNamespace`, `causeCommandId`, `causeCorrelationId`, `causeActorId`, `causeScopes` and `causeGrantIds`, never a hash, alias, worker replacement or second identity. `queued|leased` is the sole schedulable state and `complete|cancelled` is terminal retained history. An active live Handle has zero schedulable jobs even when cancelled histories exist; a trashed live Handle stores and matches exactly one namespace/command/eligibility episode. Palette jobs use exact 30s lease/10s renewal and 100-ID `seal→releases→edges→complete`; Workspace/Release removal synchronously releases the sole per-digest ContentObject guard and zero deletes exactly once. Principal aftermath uses disjoint `handles→complete`, copies every close cause field into every child palette job and may enqueue one only after an explicit active→trashed Handle CAS. Each committed batch emits one cause-correlated `purge` event. Reports pin Release/ContentObject; receipts and terminal job history remain; claims/forks/audit/tombstones remain. |

The public access predicate additionally requires the owning Principal to be `active`, unless the Handle is explicitly system-attributed/unowned. A suspended or closed owner cannot remain publicly visible through a stale catalog projection.

## 5. Command additions

| Command family | Clock / transaction | UI owner |
|---|---|---|
| recovery rotation | Principal revision + AuthFence; advance policy epoch, insert new HMAC verifier, revoke old/old-epoch sessions, issue replacement cookie and complete receipt atomically; plaintext never enters receipt | W23 account sheet |
| principal suspend/reactivate/close | Principal revision + AuthFence + AuthorityGuard; one O(1) transaction changes legal status/epoch, applies root delta, emits one projection-invalidation marker, records close time/job and retires the claim when closing, then commits audit/receipt. Read-time owner status suppresses public data; delayed leased aftermath explicitly trashes active Handles before ordinary palette purge | W24 Users |
| grant/revoke | grant/Principal ETag plus non-escalating delegation law; actor fence always, target fence when distinct, then bounded PrincipalAuthority/AuthorityGuard delta; no create to closed/redundant/over-11; r43 reason and exact Principal/workload attribution remain immutable and r42-visible; durable audit | W24 Users detail |
| color-name propose/decide/withdraw | unique normalized-name slot current revision + immutable Proposal `claimedRevision` + ColorNamePolicy revision; validators remain reconstructible after successor claims, and terminal reject/withdraw releases the slot for a new proposal | W23 proposal / W24 Names |
| tag create/retire | TagDefinition revision; zero mutation of Releases | W24 Tags |
| report resolve/dismiss | report review revision + optional Palette/Release policy expected clock in one transaction | W24 Flagged |
| feature/withdraw | Palette/Release policy revision | W24 Flagged/Names as target requires |

## 6. Client-only exports

JSON, CSS, Tailwind, SVG and PNG are all **BUILD W23** from one immutable client `ExportSnapshot` captured into the non-secret outbox before serialization. Its closed value is `{schema:"value.export-snapshot/v1",source,displayName,orderedNamedColors,canonicalTags,contentDigest}`, where `source` is exactly `{sourceKind:"device-draft",deviceDraftId,deviceDraftRevision}`, `{sourceKind:"workspace",paletteId,slug,workspaceId,workspaceRevision,basedOnReleaseId?}`, or `{sourceKind:"release",paletteId,slug,releaseId,releaseNo}`. Workspace and Release use `paletteId`, never `handleId`. `orderedNamedColors` is the 1–50 fixed-integer `CanonicalNamedColor[]`. DeviceDraft revision starts at one and advances with every committed local display/color/tag change. Device Draft captures one IDB-committed record plus one complete refreshed r29 active-tag observation; Workspace captures exactly one saved `WorkspaceDetail`, never its dirty replica overlay; Release captures one immutable `ReleaseDetail`. The dirty Workspace choices are Save then capture or copy the overlay into a new DeviceDraft. `canonicalTags` is the sorted export shape `{tagId,label}[]`: Device Draft and Workspace require the complete selected set to resolve active and fail capture on a retired, unresolved or duplicate tag rather than filtering it; Release maps every frozen `{tagId,labelAtPublish}` to `{tagId,label:labelAtPublish}` even after definition retirement.

The outbox persists the exact no-LF `UTF8(RFC8785(ExportSnapshot))` bytes plus the domain-separated `snapshotDigest` and chosen format defined by `PALETTE-EXPORT-CONTRACT.md`; after preparation it also persists the exact serialized `Uint8Array`, plain SHA-256, MIME and filename under the closed `captured | ready | retryable-failure | terminal-failure | handoff-initiated` state machine. Reload of a prepared operation consumes those verified bytes without reserialization, never a later draft/Workspace revision. The contract closes each format's positional identifier, exact OKLCH text, JSON field mapping, CSS grammar, non-executable Tailwind JSON, XML-1.0-safe five-character escaping/exact SVG lines, and PNG framing/profile/chunks/pixels whose sole Color→byte authority is W8's packed `/color` `toRgba8`. It also owns name-collision elimination, byte hashes, a fresh visible Prepare→Download activation in one action seat, and the exact Blob→object URL→download-anchor handoff whose URL is revoked on the first of 60 seconds or `pagehide`. No HTTP `Content-Disposition`, accepted-download claim, second “pretty,” canvas, palette-local color conversion, library-default or latest-state serializer exists. `console.warn` is never the only result and there is no server export route to retain.


---

<!-- ===== verbatim: PALETTE-CURSOR-CONTRACT.md ===== -->

# Tranche V — Palette cursor contract

This file is the single byte/coordinate authority for the sixteen `Q-*` pages in `PALETTE-WIRE-CONTRACT.md`. A repository may project these types, but it may not retain `offset`, a legible cursor, a generic `sortTuple`, or a second cursor codec.

## 1. Query identity

After the named `Q-*` decoder has rejected unknown/duplicate fields and applied every default, form this closed JSON value with `cursor` absent:

```text
QueryIdentity = {
  schema: "value.palette-query/v1",
  route: Q-ID,
  target?: TARGET-MAP,
  query: EXACT_PARSED_QUERY_WITH_DEFAULTS
}
```

`target` is absent on an unscoped collection and otherwise binds the route instance by resolved immutable identity, never by a renameable slug or by the authenticated administrator:

| Q route | Exact target |
|---|---|
| `Q-RELEASES`, `Q-OWNER-RELEASES` | `{paletteId}` |
| `Q-FORKS`, `Q-PROVENANCE` | `{sourceReleaseId}` |
| `Q-PRINCIPAL-HANDLES`, `Q-GRANTS` | `{targetPrincipalId}` |
| every other Q route | absent |

`paletteId` and `sourceReleaseId` use the Wire's cut-capable `ResourceId`; `targetPrincipalId` is UUIDv7. Arrays retain only the order defined by the query law: repeated `tagId` is unique ASCII-sorted; every other array is already semantic. Optional fields that were not supplied and have no default are absent. Q-AUDIT therefore encodes either neither time field or both canonical RFC 3339 UTC-millisecond strings `from` and `to`; its half-open predicate and validity law remain the Wire's, and neither boundary is independently optional. Changing either valid boundary changes the canonical query bytes and digest. Encode `Q=UTF8(RFC8785(QueryIdentity))`, then set

```text
queryDigest = SHA-256(
  ASCII("value.js/palette-query/v1") || 0x00 ||
  uint32be(byteLength(Q)) || Q
)
```

The cursor stores the 32 raw digest bytes. Hex/base64 text is never hashed or placed inside the plaintext.

## 2. Plaintext and scan coordinate

The RFC 8949 deterministic-CBOR plaintext is the closed map:

```text
{
  v: 1,
  route: Q-ID,
  queryDigest: bstr .size 32,
  limit: uint 1..50,
  target?: TARGET-MAP,
  after: AFTER-UNION,
  principalId?: UUIDv7,
  issuedAt: RFC3339-ms,
  expiresAt: RFC3339-ms,
  rankEpoch?: UUIDv7
}
```

`target` has exactly the QueryIdentity presence/value above. `principalId` is the authenticated actor and is required exactly for owner/admin Q routes and absent for public routes; it never substitutes for `targetPrincipalId`. `rankEpoch` is required exactly for `Q-CATALOG`. `issuedAt` is the majority-read Mongo `$$NOW` used for that page, formatted to the Wire's millisecond grammar. A noncatalog cursor has `expiresAt=issuedAt+86_400_000ms`; a catalog cursor has `expiresAt` equal to the retained RankEpoch's fixed `expiresAt`, and no cursor may issue at or after that instant. `after` is the coordinate of the last **candidate row scanned**, not the last item emitted; the next scan starts strictly after it under the route's printed direction. This single field replaces the ambiguous `sortTuple` plus `lastScanned` pair.

Strings are deterministic-CBOR text strings in their already-canonical spelling. Times are the Wire's UTC millisecond strings. IDs use their named Wire kind. Integers use the smallest RFC 8949 deterministic-CBOR unsigned encoding. Every count or score coordinate is the Wire's `JsonUInt` `0..9_007_199_254_740_991`; although CBOR can encode larger unsigned integers, this cursor codec rejects them as `422 cursor_invalid` rather than creating a value JavaScript/JSON cannot preserve exactly. Tighter printed bounds such as `limit` and `releaseNo` still apply. The closed `after` union is:

| Q route | Exact `after` map | Direction |
|---|---|---|
| `Q-WORKSPACES` | `{updatedAt,workspaceId}` | both descending |
| `Q-CATALOG`, `sort=newest` | `{sort:"newest",publishedAt,paletteId}` | publishedAt, ID descending |
| `Q-CATALOG`, `sort=popular` | `{sort:"popular",popularScore,publishedAt,paletteId}` | all descending; score is `JsonUInt` |
| `Q-CATALOG`, `sort=most-forked` | `{sort:"most-forked",rankForkCount,publishedAt,paletteId}` | all descending; count is `JsonUInt` |
| `Q-CATALOG`, `sort=color-distance` | `{sort:"color-distance",distance,publishedAt,paletteId}` | distance ascending; time and ID descending; distance is micro-ΔE `JsonUInt` |
| `Q-RELEASES` | `{releaseNo,releaseId}` | both descending |
| `Q-OWNER-RELEASES` | `{releaseNo,releaseId}` | both descending |
| `Q-FORKS` | `{destinationPublishedAt,destinationPaletteId}` | both descending |
| `Q-PROVENANCE` | `{ordinal}` | ascending `JsonUInt` beginning at 1 |
| `Q-NAMES-APPROVED` | `{normalizedName,proposalId}` | UTF-8 byte order, then ID ascending |
| `Q-NAMES-SEARCH` | `{normalizedName,proposalId}` | UTF-8 byte order, then ID ascending |
| `Q-TAGS-PUBLIC` | `{category,normalizedKey,tagId}` | ASCII byte order ascending |
| `Q-AUDIT` | `{occurredAt,eventId}` | both descending |
| `Q-PROPOSALS` | `{updatedAt,proposalId}` | both descending |
| `Q-PRINCIPALS` | `{createdAt,principalId}` | both descending |
| `Q-PRINCIPAL-HANDLES` | `{updatedAt,paletteId}` | both descending |
| `Q-GRANTS` | `{createdAt,grantId}` | both descending |
| `Q-TAGS-ADMIN` | `{category,normalizedKey,tagId}` | ASCII byte order ascending |
| `Q-REPORTS` | `{createdAt,reportId}` | both descending |

The catalogue's `sort` discriminator is present even though the query digest also binds it; a decoder must reject a mismatch rather than reinterpret coordinate fields. For an empty first page there is no cursor. A scan that examines candidates but emits none uses the final examined coordinate and may return `hasMore=true`.

Only catalog rank/order coordinates are an immutable snapshot. Catalog eligibility, access, current-policy and current-tag projections are rechecked at read and may skip an epoch row; every other Q route is an explicitly live keyset view. A row whose eligibility or any printed sort coordinate changes after cursor issuance may move across the boundary and can therefore appear on neither or both observed pages. No stronger snapshot claim is made. For every row whose eligibility and complete sort coordinate remain unchanged, continuation must neither repeat nor skip it; consumers de-duplicate by the item type's stable ID. Tests that claim no-repeat/no-skip may mutate nonsort payload only unless they assert this explicit moved-row behavior.

## 3. Envelope

A secret-manager key ID selects one 256-bit AES-GCM key and issuance draws a fresh 96-bit OS-CSPRNG nonce. Let `P` be the deterministic-CBOR bytes, `sealedByteLength=byteLength(P)+16`, and

```text
header = 0x01 || uint8(kidLength) || kidASCII || nonce96 ||
         uint16be(sealedByteLength)
aad    = ASCII("value.js/palette-cursor/v1") || 0x00 || header
sealed = AES-256-GCM.seal(Kkid, nonce96, P, aad)
cursor = base64url-unpadded(header || sealed)
```

`kid` is `[a-z0-9][a-z0-9_-]{0,31}`; `sealed` is ciphertext followed by its 16-byte tag. The outer cursor is at most 2048 characters. Bad base64/canonicality, length, version, key, tag, deterministic-CBOR shape, route/target/query/principal/sort mismatch, impossible coordinate, future issuance time, or an expired noncatalog cursor is `422 cursor_invalid`. An authenticated catalog cursor whose retained epoch is expired or missing is instead exactly `410 rank_epoch_expired`; no other defect is promoted to 410.

Cursor-key rotation atomically switches the current issuer and records the old key's majority-committed `deactivatedAt`, which is the conservative upper bound on its last issuance. An old key remains decrypt-only until at least `deactivatedAt+86_400_000ms+15_000ms`; then it may retire without pretending that stateless client tokens have server-side reference rows. New issuance never uses a decrypt-only key.

## 4. Born-RED vectors

W14/W16 own one fixed query and at least two pages for every table row above. Their committed fixture records `QueryIdentity`, canonical JSON hex, query-digest hex, deterministic-CBOR diagnostic hex, envelope inputs, final cursor, decoded `target`/`after`, emitted IDs and scanned IDs. The implementation must reproduce all bytes independently in two processes. Popular/count/distance/ordinal goldens include `9_007_199_254_740_991`, prove its smallest valid CBOR unsigned representation `1b001fffffffffffff` round-trips exactly, and reject `9_007_199_254_740_992` encoded as `1b0020000000000000`. Q-AUDIT has separate absent-time and paired-time goldens; the paired vector places events exactly at `from`, one millisecond before `to`, and exactly at `to`, emitting the first two and excluding the last. Exactly 366 days is accepted. One-sided, equal, reversed, longer-than-366-day, explicit-null and duplicate-bound inputs are `422 query_invalid` before cursor decode or repository work. Reusing a valid Q-AUDIT cursor after either canonical boundary changes is `422 cursor_invalid` because the recomputed query digest differs. Same-Q/different-target, one-bit digest/AAD/tag changes, wrong principal, wrong Q route, wrong catalogue sort, altered default, legible/plaintext substitution, 2049 characters and future/expired times fail exactly as above; a missing catalog epoch alone is 410. Public `Q-RELEASES` and owner `Q-OWNER-RELEASES` cursors are mutually invalid despite sharing the release coordinate. Unpublish, policy withdrawal and trash do not eject, repeat or skip an otherwise unchanged owner-history row; they may alter or suppress the public view only. Mutation vectors distinguish an unchanged eligible sort coordinate, which may neither repeat nor skip, from an explicitly moved/ineligible live row. The golden is an implementation artifact produced from this closed contract, not another cursor specification.


---

<!-- ===== verbatim: PALETTE-OPERATIONS-REPLAY-CONTRACT.md ===== -->

# Tranche V — Command binding and replay contract

This is the byte authority for W10/W13's one operations wrapper. It closes two previously prose-shaped values: the non-secret request binding and the permanent encrypted success replay. No route may hash its raw body, invent a receipt envelope, reconstruct a response from current resources, or retain a plaintext replay column.

## 1. Binding value and digest

After the Wire decoder has produced typed canonical values, form:

```text
CommandBinding = {
  schema: "value.command-binding/v1",
  route:
    | "r3" | "r4" | "r5" | "r6" | "r9"
    | "r11" | "r12" | "r13" | "r15"
    | "r22" | "r23" | "r24" | "r25" | "r28"
    | "r32" | "r34" | "r36"
    | "r40" | "r41" | "r43" | "r44" | "r46" | "r47" | "r49",
  method: UPPERCASE_METHOD,
  target: { pathParams: CLOSED_TYPED_MAP },
  body?: CLOSED_NON_SECRET_BODY,
  ifMatch?:
    | { kind:ONE_CLOCK_KIND, id, clock }
    | { kind:"color-name", id, policyRevision, claimedRevision }
}
```

`route` is exactly the Wire's 24-member mutation set M; read routes and r50 are excluded.

`pathParams` uses decoded canonical IDs, release numbers and namespace spellings, not a raw or percent-encoded URL. A no-body route omits `body`; a body whose closed non-secret projection is empty uses `{}`. `ifMatch` is absent when the route has no strong request precondition. `ONE_CLOCK_KIND` is exactly `workspace|palette|palette-policy|release-policy|principal|grant|tag|report`; its validator uses exactly `{kind,id,clock}`. An immutable Release ETag is only a read/result coordinate and never enters a command `If-Match`. The r32 color-name composite validator instead uses exactly `{kind:"color-name",id,policyRevision,claimedRevision}` so both authenticated ETag coordinates bind the command; its separately decoded `expectedClaimRevision` remains in `body`. Neither arm retains the received header spelling.

Secret-route projections are exact:

| Route | `target.pathParams` | `body` |
|---|---|---|
| r3 registration | `{}` | `{publicHandle:<canonical spelling>}` |
| r4 recovery | `{publicHandleClaimId:<resolved ResourceId>}` | `{}` |
| r5 credential rotation | `{principalId:<authenticated UUIDv7>}` | `{}` |

Every recovery secret, session token, cookie, verifier, credential MAC and plaintext/body placeholder is absent—not redacted, hashed, empty-stringed or replaced with a sentinel. For r3/r4/r5, the separately stored receipt-bound `credentialId` proves the secret role on replay. Every other mutation uses its exact decoded Wire body after canonical string/color/ID normalization; authenticated target identity and route path parameters remain explicit even if repeated in the body.

Let `B=UTF8(RFC8785(CommandBinding))`. The stored 32-byte binary value is

```text
requestBindingDigest = SHA-256(
  ASCII("value.js/command-binding/v1") || 0x00 ||
  uint32be(byteLength(B)) || B
)
```

No hex/base64 text, JSON whitespace, raw header, omitted default or client-computed digest enters the hash.

## 2. Replay plaintext

The plaintext is one RFC 8949 deterministic-CBOR map:

```text
{
  v: 1,
  route:
    | "r3" | "r4" | "r5" | "r6" | "r9"
    | "r11" | "r12" | "r13" | "r15"
    | "r22" | "r23" | "r24" | "r25" | "r28"
    | "r32" | "r34" | "r36"
    | "r40" | "r41" | "r43" | "r44" | "r46" | "r47" | "r49",
  status: uint 200..299,
  contentType: "application/json;charset=utf-8",
  etag?: <exact quoted strong ETag>,
  body: bstr .size 0..65536
}
```

`etag` is present exactly when `PALETTE-WIRE-CONTRACT.md §5.2` permits it. `body` is the exact already-canonical UTF-8 success-body byte string later emitted; it is not reparsed during replay. The plaintext tuple has no diagnostic reference array or other non-authoritative enrichment. A `resultReference` may exist only as internal effect/tombstone metadata; it is never encoded into, reconstructed into, or consulted to serve the replay. The operations wrapper encodes and encrypts the tuple before marking the receipt complete. A body over 65,536 bytes aborts the effect as `platform_consistency_fault`; there is no reference-only success fallback.

## 3. Envelope and storage

Let `N=UTF8(receiptNamespace)`, `C=ASCII(commandId)`, `D` be the 32 raw binding-digest bytes and `P` the replay plaintext. The AAD is:

```text
ASCII("value.js/command-replay/v1") || 0x00 ||
uint32be(byteLength(N)) || N ||
uint32be(36) || C ||
uint32be(32) || D
```

AES-256-GCM uses the current secret-manager replay key, a fresh 96-bit OS-CSPRNG nonce and a 128-bit tag. The receipt stores exactly four binary-envelope fields `{replayKeyId,replayNonce,replayCiphertext,replayTag}`; the tag is separate from ciphertext and no field is text-re-encoded. General repositories, logs, audit, purge and UI cannot decrypt it. Only the receipt-authorized operations wrapper may decrypt after namespace, command, binding and replay-principal/session proof have passed.

## 4. Permanent readability and key rotation

The logical replay is permanent, so “rotate the key” cannot mean deleting its only decryptor. One current write key and zero or more decrypt-only keys form the replay ring. `ReplayKeyState={epoch,currentKeyId,changedAt}` is one majority-committed database singleton. Each receipt-transaction attempt obtains a fresh majority read of it before beginning, uses only that writer for the attempt, and has a hard 30-second lifetime; every driver/write-conflict retry is a new attempt and re-reads the singleton. An attempt already open at the rotation commit may still commit under the predecessor, which is why retirement requires the drain below rather than an impossible snapshot re-read or an invented client reference.

Rotation majority-commits a new `ReplayKeyState` epoch/writer, retains the predecessor decrypt key, and waits a full 30-second writer-drain interval before treating any zero scan as retirement evidence. A leased rewrapper then scans receipts with an older `replayKeyId` in ascending `(receiptNamespace,commandId)` pages of at most 100. For each row it authenticates/decrypts the old envelope, validates the deterministic-CBOR tuple against stored route/status metadata, draws a new nonce, encrypts the identical plaintext/AAD under the current key, and CAS-replaces all four envelope fields against the old key ID plus `SHA-256(nonce||ciphertext||tag)`. A conflict is reread, never overwritten.

After the writer drain, an old key becomes removable only after two complete `ReplayKeyState`-epoch-stable scans separated by at least 30 seconds both report zero receipts naming it and an independent majority-snapshot count after the second scan is also zero. Any epoch change restarts the drain and evidence sequence. Missing decrypt material, an invalid tag/tuple, or a count/scan disagreement makes the platform not-ready and blocks retirement; it never drops a replay, starts a new effect, or exposes ciphertext as a result.

## 5. Born-RED vectors

W10/W16 commit one golden per mutation row: typed binding value, RFC 8785 bytes, digest hex, deterministic-CBOR plaintext hex, fixed test key/nonce/AAD, ciphertext/tag and replayed status/header/body. Vectors independently change route, canonical path parameter, normalized body value, target clock, namespace, command and one digest bit. An r32 completed replay with only `claimedRevision` altered is `409 idempotency_key_reused`, proving the composite ETag is fully bound. Secret vectors prove that changing proof material under the same completed r3/r4/r5 command reaches credential verification without changing the binding, while no secret byte appears in any golden persistence/log capture. Rewrap vectors stop before/after every CAS, run two workers, rotate twice, and hold an old-writer transaction across the state change. That attempt either commits within its bound and is found/rewrapped after the drain or aborts; a retried attempt re-reads and uses the new writer. They then prove byte-identical plaintext, the 30-second drain, two separated epoch-stable zero scans and the independent zero count before retirement.


---

<!-- ===== verbatim: PALETTE-LOCAL-RAIL.md ===== -->

# Tranche V — Local same-origin rail

W15's ordinary browser development path is real HTTPS, not a prose exception to production security.

## Closed profiles

One process starts with exactly one immutable profile:

| Profile | Browser authority | Browser edge | Private origin identity |
|---|---|---|---|
| `production` | `https://color.babb.dev` | deployed NGINX+njs/QuickJS on TCP 443 | `api-origin.color.babb.dev` under the production private CA |
| `local` | `https://value.localhost:4173` | the same pinned NGINX+njs/QuickJS image on loopback TLS 4173 | `api-origin.value.localhost` under the generated local private CA |

The chosen authority is one scalar, not an allowlist. Production artifacts reject `local`; local artifacts reject `production` and every other Origin. Hono receives the original `Origin`/fetch fields only inside the edge-signed header block and compares the unsafe tuple to the profile's one authority. `POST`, `PUT`, `PATCH` and `DELETE` all use the same rule. Cookie grammar remains `Secure`, host-only, HttpOnly and SameSite Strict in both profiles.

## Launcher and certificates

`npm run dev:stack` owns the local composition: Vite is reachable only behind the loopback edge; the private Hono TLS listener is reachable only by that edge container; the edge sends the test client certificate, exact private SNI/Host and production-identical MAC framing. The launcher consumes a gitignored `.value-dev-pki/` containing one locally generated CA, the `value.localhost` browser leaf, edge client leaf and private-origin leaf. A one-time `npm run dev:pki` creates those exact identities from OS CSPRNG material and prints the platform trust command; it never checks in a private key. `dev:stack` fails closed when the CA/leaf is absent, expired, wrong-SAN or untrusted. It does not fall back to HTTP, `NODE_TLS_REJECT_UNAUTHORIZED=0`, an ignored browser certificate, unsigned proxying or direct Vite/API access.

The browser opens only `https://value.localhost:4173`; the SPA uses only relative `/api`. The local leaf SAN is exactly `value.localhost`, and the private leaf SAN is exactly `api-origin.value.localhost`. The edge image/config/QuickJS module is the production artifact with only the profile authority, certificate coordinates and private target injected; there is no second JavaScript mock dispatcher.

## Acceptance

W15 proves an ordinary interactive Chromium/Firefox/Safari launch after the local CA is trusted. W16 runs the same 50-row transport matrix through the local rail and mutates browser CA trust, public leaf, client leaf, private CA, SNI, Host, Origin, each fetch token, `POST`/`PUT`/`PATCH`/`DELETE`, MAC and relative path. Valid local traffic passes with a Secure cookie; production Origin on the local build, local Origin on production, HTTP, direct origin, ignored TLS and unsigned bypass all fail before route/domain work. W33 repeats the production arm; local evidence is never cited as deployed production proof.


---

<!-- ===== verbatim: LEGACY-PALETTE-SOURCE-CONTRACT.md ===== -->

# Tranche V — Closed Legacy Palette Source Contract

This is the sole input schema for the W11–W14/W16/W33 nine-collection cut. It describes the frozen legacy database as it exists; it is not a target API and grants no field continued life. `PALETTE-DOMAIN.md §7` owns classification and mapping. Unknown top-level or embedded fields, wrong BSON types, non-finite numbers, invalid dates, duplicate canonical `_id` bytes or a field outside the bounds below reject the **whole snapshot**. Nothing is defaulted, repaired, quarantined or silently ignored.

## 1. Shared physical grammar

- `ObjectId` means BSON ObjectId, serialized as canonical Extended JSON `{"$oid":"<24 lowercase hex>"}`. `Date` means a valid BSON UTC datetime whose epoch millisecond is a safe integer, serialized as `{"$date":{"$numberLong":"<canonical signed decimal>"}}`. `Finite` is a BSON int32/int64/double that converts to a finite JavaScript number without changing an integer field's value. `uintSafe` is a BSON int32/int64/double whose mathematical value is an integer in `[0,9007199254740991]`, whose conversion to a JavaScript `Number` is exact, and which is not negative zero. Strings must be valid Unicode scalar sequences: unpaired surrogates, NUL and invalid UTF-8 reject.
- `LegacyHash` is exactly 64 lowercase hexadecimal ASCII bytes. `LegacySlug` is a nonempty string of at most 120 Unicode scalars/480 UTF-8 bytes; it is **not** normalized at schema validation. Later claimability uses the target namespace law once.
- `PaletteColor` is the closed object `{css,name?,position}`: `css` is 1–200 UTF-8 bytes; optional `name` is 0–64 Unicode scalars/256 bytes; `position` is finite. Array order, not `position`, is the only source order mapped to target ordered colors. Position is validated and archived but retired.
- `OklabTriple` is the closed object `{L,a,b}` of finite numbers. It is legacy cache evidence only: validate its physical shape, archive it, and retire it without comparing it to either `css` or the target parser. Target colors are reparsed from `css`; there is no cache-agreement predicate, tolerance, warning or reject code.
- Every closed row below includes exactly the fields shown. An optional `?` field may be absent; a `|null` field must be present and may contain BSON null. Empty strings remain strings unless a per-field bound forbids them. The transformer does not invoke application defaults.

## 2. Exact collection rows and field dispositions

### `palettes`

Closed row:

```text
{
  _id:ObjectId,
  name:string[1..100 scalars, <=400 bytes],
  slug:LegacySlug,
  colors:PaletteColor[1..50],
  oklabColors:OklabTriple[exactly colors.length],
  tags:string[0..10], each 1..30 scalars/120 bytes,
  voteCount:uintSafe,
  userSlug:LegacySlug|null,
  visibility:"public"|"unlisted"|"private",
  tier:"standard"|"featured"|"archived",
  deletedAt:Date|null,
  createdAt:Date,
  updatedAt:Date,
  currentHash:LegacyHash|null,
  forkOf:LegacySlug|null,
  forkOfHash:LegacyHash|null,
  forkCount:uintSafe,
  versionCount:uintSafe
}
```

`name/slug/colors/tags/currentHash/versionCount/visibility/tier/deletedAt/createdAt/updatedAt` are consumed by classification or mapping. `userSlug/forkOf/forkOfHash` are consumed only for identity/offline provenance checks. `oklabColors/voteCount/forkCount` are validated and archived, then **RETIRED**; no target cache/counter is seeded. Require `createdAt<=updatedAt`; if `deletedAt` is nonnull require `createdAt<=deletedAt`, with either failure reported as `LEGACY_PALETTE_TIME_ORDER`. A `P+` row additionally requires nonnull `currentHash`, target-valid display/content/tags and the complete graph equalities in Domain §7.

### `palette_versions`

```text
{
  _id:LegacyHash,
  name:string[1..100 scalars, <=400 bytes],
  colors:PaletteColor[1..50],
  parentHash:LegacyHash|null,
  forkedFromHash:LegacyHash|null,
  authorSlug:LegacySlug,
  paletteSlug:LegacySlug,
  createdAt:Date,
  rootHash:LegacyHash,
  depth:uintSafe
}
```

Every field is consumed by graph validation, target Release mapping or private provenance. `position` remains retired as above. An absent owning `palettes` row is `LEGACY_VERSION_PALETTE_MISSING`. Every version whose owning palette is classified `P+` must also pass the target display-name law and map every `PaletteColor` through the exact absolute-CSS/name/canonical-content law used for a target Release; failure is `LEGACY_VERSION_TARGET_CONTENT_INVALID`. A version outside `P+` remains archive/tombstone-only and is not laundered through target validation. Both predecessor fields nonnull is `LEGACY_VERSION_TWO_PREDECESSORS`; unresolved references, cross-lineage parent, root/depth mismatch and cycles use the named graph rejects below.

### `votes`

```text
{_id:ObjectId,userSlug:LegacySlug,paletteSlug:LegacySlug,createdAt:Date}
```

All fields are validated and encrypted offline; `userSlug` contributes to identity reservation. No vote, count or catalog score is mapped. Duplicate `(userSlug,paletteSlug)` is accepted as distinct legacy evidence but never seeds target truth; a dangling `paletteSlug` is recorded as `RETIRE_DANGLING_VOTE`, not a target row.

### `sessions`

```text
{
  _id:string[exactly 64 lowercase hex],
  ipHash:string[1..256 bytes],
  userSlug?:LegacySlug,
  createdAt:Date,
  lastSeenAt:Date,
  expiresAt?:Date
}
```

Require `createdAt<=lastSeenAt` and, when present, `createdAt<=expiresAt`; either failure is `LEGACY_SESSION_TIME_ORDER`. Only a present `userSlug` contributes to retired-handle identity reservation. `_id`, `ipHash`, dates and the complete raw row are restricted-archive-only. They may never enter a target row, tracked row-level artifact, log, reject detail or digest that is dictionaryable without the encrypted object.

### `proposed_names`

```text
{
  _id:ObjectId,
  name:string[1..50 scalars, <=200 bytes],
  css:string[1..200 bytes],
  status:"proposed"|"approved"|"rejected",
  contributor:LegacySlug|null,
  createdAt:Date,
  approvedAt:Date|null
}
```

Require `status="approved"` iff `approvedAt` is nonnull; disagreement is `LEGACY_APPROVAL_STATE_MISMATCH`. An approved row also requires `createdAt<=approvedAt`, or `LEGACY_APPROVAL_TIME_ORDER`; all other statuses require `approvedAt=null`. Approved rows alone may map through the target color/name law. `proposed` and `rejected` are terminal offline dispositions, not a target moderation queue. `contributor` contributes to identity reservation but never becomes target authorship.

### `tags`

```text
{_id:ObjectId,name:string[1..30 scalars, <=120 bytes],category:string[1..30 scalars, <=120 bytes],createdAt:Date}
```

All fields are consumed by target TagDefinition validation/mapping. Duplicate target-normalized keys, invalid target keys/labels/categories and a live palette reference that does not resolve exactly once reject the run. No free-form compatibility tag survives.

### `flags`

```text
{
  _id:ObjectId,
  paletteSlug:LegacySlug,
  reporterSlug:LegacySlug,
  reason:"inappropriate"|"spam"|"copyright"|"other",
  detail:string[0..500 scalars, <=2000 bytes]|null,
  createdAt:Date
}
```

Every field is restricted-archive-only; `reporterSlug` contributes to identity reservation. No Report, moderation decision or count is synthesized. A dangling palette remains `RETIRE_DANGLING_FLAG` evidence.

### `admin_audit`

```text
{
  _id:ObjectId,
  timestamp:Date,
  action:string[1..200 bytes],
  ipHash?:string[1..256 bytes],
  target?:string[0..2000 bytes],
  actorSlug?:LegacySlug|null,
  payload?:closed canonical-EJSON object[<=64 KiB]
}
```

`payload` may contain any canonical Extended JSON value recursively, but must be an object, have depth ≤16, ≤4096 total keys/items, no duplicate object key and canonical bytes ≤64 KiB. It is opaque restricted evidence, never executable or target authority. `actorSlug`, when a nonnull string, contributes to identity reservation. Nothing maps to target AuditEvent history; the target audit begins at cut/bootstrap provenance.

### `users`

```text
{
  _id:LegacySlug,
  createdAt:Date,
  lastSeenAt?:Date,
  status?:"active"|"suspended"
}
```

Require `createdAt<=lastSeenAt` when present, or `LEGACY_USER_TIME_ORDER`. `_id` contributes to identity reservation. Status and dates are restricted-archive evidence only: no Principal, credential, session, grant, owner or policy is inferred.

## 3. Closed reject and disposition vocabulary

Every structural failure emits only its code, collection and restricted row ordinal inside the encrypted cut evidence. Tracked aggregate evidence contains counts by code, never row IDs/source-key digests.

The shared physical codes are `LEGACY_UNKNOWN_FIELD`, `LEGACY_MISSING_FIELD`, `LEGACY_BSON_TYPE`, `LEGACY_BOUND`, `LEGACY_NONFINITE`, `LEGACY_INVALID_DATE`, `LEGACY_DUPLICATE_ID`, and `LEGACY_EJSON_NONCANONICAL`. They apply to every collection. In particular, an invalid `uintSafe` is `LEGACY_BOUND`; an `admin_audit.payload` that is not an object is `LEGACY_BSON_TYPE`; its depth/item/byte overflow is `LEGACY_BOUND`; and a duplicate key or noncanonical Extended JSON form is `LEGACY_EJSON_NONCANONICAL`.

After physical validation, this table is the complete collection-specific semantic vocabulary. “None” means that a structurally valid row has no further row-local reject; its reference may still select a retirement disposition below. Cross-row construction codes follow the table.

| Collection | Exact semantic codes |
|---|---|
| `palettes` | `LEGACY_PALETTE_TIME_ORDER`, `LEGACY_CURRENT_VERSION_MISSING`, `LEGACY_CURRENT_PAYLOAD_MISMATCH`, `LEGACY_VERSION_COUNT_MISMATCH`, `LEGACY_TARGET_SLUG_INVALID`, `LEGACY_TARGET_SLUG_COLLISION`, `LEGACY_TARGET_CONTENT_INVALID`, `LEGACY_TARGET_TAG_INVALID`, `LEGACY_TAG_REFERENCE_MISSING` |
| `palette_versions` | `LEGACY_VERSION_PALETTE_MISSING`, `LEGACY_VERSION_TARGET_CONTENT_INVALID`, `LEGACY_VERSION_TWO_PREDECESSORS`, `LEGACY_VERSION_PREDECESSOR_MISSING`, `LEGACY_VERSION_PARENT_CROSS_LINEAGE`, `LEGACY_VERSION_ROOT_MISMATCH`, `LEGACY_VERSION_DEPTH_MISMATCH`, `LEGACY_VERSION_CYCLE` |
| `votes` | none |
| `sessions` | `LEGACY_SESSION_TIME_ORDER` |
| `proposed_names` | `LEGACY_APPROVAL_STATE_MISMATCH`, `LEGACY_APPROVAL_TIME_ORDER`, `LEGACY_TARGET_NAME_INVALID`, `LEGACY_TARGET_COLOR_INVALID`, `LEGACY_NAME_SLOT_COLLISION` |
| `tags` | `LEGACY_TARGET_TAG_INVALID`, `LEGACY_TAG_KEY_COLLISION` |
| `flags` | none |
| `admin_audit` | none beyond the closed physical/payload mappings above |
| `users` | `LEGACY_USER_TIME_ORDER` |

The cross-collection/construction codes are exactly `LEGACY_IDENTITY_CANONICAL_COLLISION`, `LEGACY_UUID_COLLISION`, `LEGACY_CONTENT_DIGEST_COLLISION`, `LEGACY_REFERENCE_DANGLING`, `LEGACY_COUNT_EQUATION`, and `LEGACY_ARTIFACT_DIGEST`. The retired cache supplies no comparison and no reject code.

With zero rejects, every source row receives exactly one terminal disposition. The transformer evaluates only its collection's row below, top to bottom, and the first matching branch wins; it never emits two terminal codes for one row. This precedence removes the deleted/archived/visibility overlap from `palettes`.

| Collection | Ordered first-match rule | Terminal disposition |
|---|---|---|
| `palettes` | valid `P+`; else `deletedAt!=null`; else `tier="archived"`; else `visibility="private"`; else `visibility="unlisted"` | `BUILD_SYSTEM_PALETTE`; `RETIRE_DELETED`; `RETIRE_ARCHIVED`; `RETIRE_PRIVATE`; `RETIRE_UNLISTED` |
| `palette_versions` | owning palette is `P+`; otherwise | `BUILD_RELEASE`; `RETIRE_VERSION` |
| `votes` | `paletteSlug` resolves to one palette; otherwise | `RETIRE_VOTE`; `RETIRE_DANGLING_VOTE` |
| `sessions` | always | `RETIRE_SESSION` |
| `proposed_names` | `status="approved"`; else `status="proposed"`; else `status="rejected"` | `BUILD_APPROVED_NAME`; `RETIRE_PENDING_NAME`; `RETIRE_REJECTED_NAME` |
| `tags` | always | `BUILD_TAG` |
| `flags` | `paletteSlug` resolves to one palette; otherwise | `RETIRE_FLAG`; `RETIRE_DANGLING_FLAG` |
| `admin_audit` | always | `RETIRE_ADMIN_AUDIT` |
| `users` | always | `RETIRE_LEGACY_IDENTITY` |

Target construction is recorded separately from that one terminal source disposition. Each restricted disposition row has exact shape `{collection,sourceKeyDigest,disposition,targetActions,targetKeys}`. `targetActions` is a sorted, duplicate-free array drawn only from `BUILD_PALETTE_HANDLE`, `BUILD_PALETTE_POLICY`, `BUILD_ACTIVE_PALETTE_SLUG_CLAIM`, `BUILD_RETIRED_PALETTE_SLUG_CLAIM`, `BUILD_HANDLE_TOMBSTONE`, `BUILD_RELEASE`, `BUILD_RELEASE_POLICY`, `BUILD_RELEASE_TOMBSTONE`, `BUILD_CONTENT_OBJECT`, `REFERENCE_CONTENT_OBJECT`, `BUILD_CATALOG_ROW`, `BUILD_TAG_DEFINITION`, `BUILD_COLOR_NAME_PROPOSAL`, `BUILD_COLOR_NAME_POLICY`, `BUILD_COLOR_NAME_SLOT`, `BUILD_IDENTITY_TOMBSTONE`, and `BUILD_RETIRED_PUBLIC_HANDLE_CLAIM`. `targetKeys` is the corresponding sorted canonical target primary-key byte strings.

The base action set is exact:

| Terminal disposition | Base `targetActions` before final ASCII sort |
|---|---|
| `BUILD_SYSTEM_PALETTE` | `BUILD_ACTIVE_PALETTE_SLUG_CLAIM`, `BUILD_CATALOG_ROW`, `BUILD_PALETTE_HANDLE`, `BUILD_PALETTE_POLICY` |
| `RETIRE_DELETED`, `RETIRE_ARCHIVED`, `RETIRE_PRIVATE`, `RETIRE_UNLISTED` | `BUILD_HANDLE_TOMBSTONE`, plus `BUILD_RETIRED_PALETTE_SLUG_CLAIM` iff the spelling is claimable |
| `BUILD_RELEASE` | `BUILD_RELEASE`, `BUILD_RELEASE_POLICY`, plus exactly one of `BUILD_CONTENT_OBJECT` or `REFERENCE_CONTENT_OBJECT` |
| `RETIRE_VERSION` | `BUILD_RELEASE_TOMBSTONE` |
| `BUILD_APPROVED_NAME` | `BUILD_COLOR_NAME_POLICY`, `BUILD_COLOR_NAME_PROPOSAL`, `BUILD_COLOR_NAME_SLOT` |
| `BUILD_TAG` | `BUILD_TAG_DEFINITION` |
| every other terminal disposition | empty |

`BUILD_CONTENT_OBJECT` belongs to the first canonical source-version row for a new digest; later byte-equal versions use `REFERENCE_CONTENT_OBJECT`.

After the base set, the identity overlay attaches `BUILD_IDENTITY_TOMBSTONE` and, for a claimable spelling, `BUILD_RETIRED_PUBLIC_HANDLE_CLAIM` to the first canonical source row contributing each coalesced raw identity; all later contributors get no duplicate identity action. The final array is sorted by ASCII action code. A row with no base or identity effect has `targetActions=[]`. No action is a second disposition, and no open string, “other” code or per-row tracked prose is allowed.

## 4. Ownership and proof

W11 authors the decoder and transformer against this file. W14 runs the complete decoder twice over one frozen snapshot. W16 injects every reject family and proves whole-candidate destruction. W33 records the transformer tree, encrypted object version/digests and redacted aggregate counts; it does not commit source, target, disposition, provenance or reject rows. Any observed production field outside this contract is a blocker requiring a reviewed V spec correction and new snapshot—not permission for a permissive reader.

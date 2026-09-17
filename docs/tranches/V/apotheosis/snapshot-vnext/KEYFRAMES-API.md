# KEYFRAMES-API.md

## Authority

This tranche establishes one producer DAG:

```text
published parse-that 1.0.0 only
    ↓
value.js — sole CSS grammar, property, value and interpolation authority
    ↓
keyframes.js — animation planning, compilation, runtime and interaction
```

The palette API remains at value.js `/api`. Fourier-analysis implements the same protocol laws independently in Python. Protocol isomorphism does not mean shared runtime code or identical domain resources. Both services are explicitly single-tenant: no header, query, path or body field selects a tenant or may alter namespace, authorization, cursor, audit or cache scope. Keyframes.js has no server API.

## Keyframes contract

### Program, resolution and compilation

```ts
export type ProgramSpec = Readonly<{
    version: 1;
    programId: string;
    clock: ClockSpec;
    tracks: readonly TrackSpec[];
}>; // JSON/JCS-safe; never contains DOM objects

export type ReadyTrack =
    | (ReadyCommon & { kind: "ready"; driver: "waapi"; program: WaapiTrack })
    | (ReadyCommon & { kind: "ready"; driver: "raf"; program: RafTrack });

export type TrackDecision = ReadyTrack | RefusedTrack;

export type CompileResult =
    | Readonly<{
          kind: "ready";
          plan: ResolvedAnimationPlan;
          decisions: readonly TrackDecision[];
      }>
    | Readonly<{
          kind: "refused";
          decisions: readonly TrackDecision[];
          refusals: readonly RefusedTrack[];
          plan?: never;
      }>;

export type CompiledStylesheet = Readonly<{
    kind: "stylesheet";
    cssText: string;
    previewOnly: boolean;
    decisions: readonly TrackDecision[];
}>;
```

`ReadyCommon` contains the stable track ID, resolved target and realm,
property-write set, composite index, clock domain, timing, capability-profile
evidence and source span. A required refusal, dependency violation or write
conflict produces no executable plan. Only a track declared
`optional-independent` before compilation may be omitted, and its refusal is
retained.

Ready runtime drivers are exactly WAAPI and rAF. CSS compilation yields an
inert `CompiledStylesheet`; it is never accepted by `play()`. Atomic output is
the default. An explicitly requested partial artifact is marked
`previewOnly:true` and remains non-executable.

K04I generates the total pinned WAAPI/Web Animations/scroll/trigger IDL,
operations, WPT selection and browser capability profile before native
implementation. Each generated fact has exactly one canonical operation outcome:
`implemented`, `delegated`, `refused`, or `not_applicable`; `adapt` remains a
separate operation axis, never a status. `preserved_syntax_only` is inapplicable
to WAAPI object/lifecycle facts. Ambient `lib.dom.d.ts` and browser presence are
not oracles.

Value.js exclusively owns:

- CSS tokenization, grammar and stylesheet semantics;
- property definitions and long-tail property dispositions;
- typed CSS values and contextual resolution;
- color, image, transform, easing and timeline syntax;
- property-specific interpolation and composition rules.

Keyframes.js may orchestrate those operations, but it may not reproduce a
property registry, timing-function grammar, color math, transform semantics or
path parser. V29T freezes exactly six public value paths: `./color`, `./css`,
`./easing`, `./math`, `./path` and `./transform`. Every K edge installs the
exact V29T tarball and imports only that manifest; `./value`, `./quantize`, root,
deep-source and forwarding paths are rejected.

### Target tree

```text
src/
├── index.ts
├── model/
│   ├── program.ts
│   ├── track.ts
│   ├── option.ts
│   ├── result.ts
│   ├── capability.ts
│   ├── refusal.ts
│   └── target.ts
├── resolve/
│   ├── normalize.ts
│   ├── context.ts
│   ├── value.ts
│   └── interpolate.ts
├── compile/
│   ├── css/{artifact,emit}.ts
│   └── waapi/{profile,keyframe,option,construct}.ts
├── runtime/
│   ├── clock.ts
│   ├── scheduler.ts
│   ├── controller.ts
│   ├── raf.ts
│   ├── lifecycle.ts
│   ├── event.ts
│   └── settlement.ts
├── timeline/
│   ├── model.ts
│   ├── document.ts
│   ├── range.ts
│   ├── geometry.ts
│   ├── invalidation.ts
│   ├── scroll.ts
│   ├── view.ts
│   └── trigger.ts
├── ingest/{model,text,cssom,live,refresh}.ts
├── physics/
│   ├── numeric.ts
│   ├── spring/{model,solve,sample}.ts
│   ├── decay/{model,solve,sample}.ts
│   └── approximation/{adaptive,linear}.ts
├── composition/{model,schedule,group,sequence,stagger,lower}.ts
├── interaction/
│   ├── keyboard.ts
│   ├── pointer/{model,registry,history,drag}.ts
│   └── quaternion/{model,arcball,gesture}.ts
├── transition/coordinator.ts
├── svg/{draw,morph}.ts
└── entries/{light,heavy}.ts

test/src/                         # exact isomorph of production modules
proof/                            # generated standards/topology/package facts
bench/                            # named runtime/physics benchmarks
```

There is no redundant `src/animation/`, `program/`, `gesture/`, `motion/`,
`text/`, `presets/` or generic `internal/` sector. FLIP, View wrapper,
motion-path wrapper, split-text, Oscillator, ElementMorph and the library
preset catalog are terminally pruned. Names inside a module omit the module
prefix. Tests live only in the external isomorphic tree; generated standards
corpora, browser harnesses, package craters and benchmark fixtures are named
support exceptions.

## Value `/api` model

### Identity and history

```text
Palette
  paletteId             immutable opaque identity
  slug                  immutable, globally reserved routing name
  ownerId
  aggregateVersion      CAS and strong ETag source
  currentRevisionNo
  visibility            public | unlisted | private
  deletedAt

PaletteRevision
  paletteId + revisionNo
  parentRevisionNo
  contentHash           repeatable data, never identity
  canonicalContent
  authorText
  recipe/provenance snapshot
  authorId
  createdAt

Separate streams
  votes
  flags and reviews
  featured membership
  session/security events
  administrative audit events

User
  userId                immutable opaque identity
  userSlug              generated immutable reserved public name
  aggregateVersion      CAS and strong ETag source
  role                  member | administrator
  status                active | suspended | deletion-pending
```

A repeated content hash may occur in many palettes and revisions. Revert always creates a new revision. Votes, flags, featuring and administrative actions never pollute palette content history.

### Curation invariant

The old `tier` field is deleted.

- `standard` becomes no featured membership.
- `featured` becomes membership only when the palette satisfies centralized visibility and moderation eligibility; otherwise migration aborts.
- `archived + private` remains private.
- `archived + public|unlisted` becomes unlisted.
- Archived palettes receive no featured membership.
- Delete, a visibility transition away from public, ineligibility or moderation removes membership atomically.
- Palette and featured membership retain separate CAS streams and emit one canonical audit event.
- No unproved outbox or dual tier path survives.

### Target TypeScript tree

```text
api/
├── src/
│   ├── app.ts
│   ├── contract/
│   │   ├── operation.ts
│   │   ├── registry.ts
│   │   ├── vector.ts
│   │   └── lifecycle.ts
│   ├── platform/
│   │   ├── http/
│   │   │   ├── problem.ts
│   │   │   ├── representation.ts
│   │   │   ├── precondition.ts
│   │   │   ├── idempotency.ts
│   │   │   ├── cursor.ts
│   │   │   ├── cache.ts
│   │   │   └── validate.ts
│   │   ├── db/
│   │   │   ├── client.ts
│   │   │   ├── transaction.ts
│   │   │   ├── index.ts
│   │   │   └── migrate.ts
│   │   ├── security/
│   │   │   ├── credential.ts
│   │   │   ├── session.ts
│   │   │   ├── csrf.ts
│   │   │   └── role.ts
│   │   └── audit/
│   │       ├── event.ts
│   │       └── writer.ts
│   └── modules/
│       ├── identity/
│       │   ├── contract.ts
│       │   ├── route.ts
│       │   ├── service.ts
│       │   └── store.ts
│       ├── palette/
│       │   ├── contract.ts
│       │   ├── route.ts
│       │   ├── service.ts
│       │   ├── store.ts
│       │   ├── policy.ts
│       │   └── canonical.ts
│       ├── history/
│       │   ├── contract.ts
│       │   ├── route.ts
│       │   ├── service.ts
│       │   ├── store.ts
│       │   ├── diff.ts
│       │   └── provenance.ts
│       ├── variant/
│       │   ├── contract.ts
│       │   ├── route.ts
│       │   ├── service.ts
│       │   └── store.ts
│       ├── mix/
│       │   ├── contract.ts
│       │   ├── route.ts
│       │   ├── service.ts
│       │   ├── store.ts
│       │   └── recipe.ts
│       ├── share/
│       │   ├── contract.ts
│       │   ├── route.ts
│       │   ├── service.ts
│       │   ├── store.ts
│       │   └── redeem.ts
│       ├── community/
│       │   ├── route.ts
│       │   ├── vote/{contract,service,store}.ts
│       │   └── flag/{contract,service,store}.ts
│       ├── catalog/
│       │   ├── route.ts
│       │   ├── tag/{contract,service,store,normalize}.ts
│       │   └── name/{contract,service,store,normalize}.ts
│       ├── curation/
│       │   ├── contract.ts
│       │   ├── route.ts
│       │   ├── service.ts
│       │   ├── store.ts
│       │   └── eligibility.ts
│       ├── lifecycle/
│       │   └── close.ts
│       ├── audit/
│       │   ├── contract.ts
│       │   ├── route.ts
│       │   ├── service.ts
│       │   ├── store.ts
│       │   └── projection.ts
│       └── meta/
│           ├── health.ts
│           └── openapi.ts
└── test/src/
    └── [exact mirror of src/]
```

No `admin` god module exists. Administrative commands remain in their owning domains; the audit module owns only append-only audit reads and aggregate administrative read models.

Value keeps pseudonymous users and roles. The client supplies a generated 32-byte recovery secret during registration or rotation; the server never returns or echoes it and stores only a salted digest. A session is an independently generated 32-byte secret whose digest alone is stored and whose raw value appears only in a `Secure`, `HttpOnly`, `SameSite=Strict` cookie. Origin and CSRF enforcement applies to every cookie-authorized mutation. Recovery and session secrets never enter URLs, response bodies, logs, telemetry, idempotency receipts or audit records. A13 alone admits a private immutable-share capability in the URL fragment: it is never sent as an HTTP referrer or query, redeems once into an HttpOnly grant, and is immediately stripped from the address bar.

## Fourier API model

Fourier uses the same protocol laws but independent FastAPI/Pydantic/Python implementations. It does not import the TypeScript protocol kernel.

A22S removes the insecure slug-login/session subsystem, session headers, owner claims, private drafts and session/admin aliases. Fourier has no account system: anonymous creation and public or unlisted reading remain, while each mutable resource receives an independently generated 32-byte edit credential through `Authorization: Resource`; only its salted digest is stored and compared in constant time. A Fourier deployment operator may force purge and read audit, but ordinary CRUD is never operator-only. This principal is unrelated to a value administrator's role-bearing cookie session. No endpoint may imply user ownership that the service can no longer prove.

### Target Python tree

```text
api/
├── main.py
├── contract/
│   ├── operation.py
│   ├── registry.py
│   ├── vectors.py
│   └── lifecycle.py
├── platform/
│   ├── http/
│   │   ├── problem.py
│   │   ├── representation.py
│   │   ├── precondition.py
│   │   ├── idempotency.py
│   │   ├── cursor.py
│   │   ├── cache.py
│   │   └── validation.py
│   ├── db/
│   │   ├── client.py
│   │   ├── transaction.py
│   │   ├── index.py
│   │   └── migrate.py
│   ├── authority/
│   │   ├── resource.py
│   │   └── operator.py
│   ├── audit/
│   │   ├── event.py
│   │   └── writer.py
│   ├── storage/
│   │   ├── blob.py
│   │   └── image.py
│   └── compute/
│       ├── queue.py
│       ├── worker.py
│       ├── lease.py
│       ├── cache.py
│       └── limit.py
└── modules/
    ├── visualization/
    │   ├── contract.py
    │   ├── route.py
    │   ├── service.py
    │   ├── store.py
    │   ├── policy.py
    │   └── canonical.py
    ├── history/
    │   ├── contract.py
    │   ├── route.py
    │   ├── service.py
    │   ├── store.py
    │   ├── diff.py
    │   └── provenance.py
    ├── binding/
    │   ├── contract.py
    │   ├── route.py
    │   ├── service.py
    │   ├── store.py
    │   └── adapter.py
    ├── asset/
    │   ├── image/{contract,route,service,store,validate}.py
    │   ├── contour/{contract,route,service,store,validate}.py
    │   └── lifecycle.py
    ├── equation/
    │   ├── contract.py
    │   ├── route.py
    │   └── service.py
    ├── job/
    │   ├── contract.py
    │   ├── route.py
    │   ├── service.py
    │   └── store.py
    ├── audit/
    │   ├── contract.py
    │   ├── route.py
    │   ├── service.py
    │   └── store.py
    └── meta/
        ├── health.py
        └── openapi.py

tests/api/
└── [exact mirror of api/]
```

The removed `models/session.py`, `routers/sessions.py`, session collections, owner filters and session-token paths have no aliases or compatibility façade.

## Operation contract

Every operation manifest row declares:

- method and canonical path;
- resource or command identity;
- authority and existence-hiding policy;
- request validator and response schema;
- required `If-Match` or `Idempotency-Key`;
- transaction boundary and side effects;
- cache and `Vary` policy;
- success status, `Location`, `ETag` and pagination headers;
- every RFC 9457 problem response;
- audit event and consuming UI/client.

### Value resources

| Resource | Required operations |
|---|---|
| User/session | Register with one-time recovery credential; login; current session; logout; rotate credential; revoke sessions; administrative suspension/deletion. |
| Palette | Create; detail; list; mine; search; patch content/metadata; visibility CAS; trash; restore; purge. |
| Revision | List; detail; diff; revert to a new revision; immutable revision sharing/export. |
| Fork/variant | Fork create/list/provenance; variant collection and member CRUD; independent variant revisions; explicit lifecycle. |
| Mix recipe | Validate and preview without persistence; persisted collection/member CRUD and history; share/export; materialize as a palette or variant revision. |
| Share | Stable public revision links; create/read/revoke expiring capability shares; bounded typed exports; redeem a fragment capability once into an HttpOnly grant and strip it from the address bar. |
| Vote | Idempotent `PUT` and `DELETE`; derived counts; no toggle endpoint. |
| Flag | Submit; list for moderation; review; resolve/reject; audit. |
| Tag | Create; list; normalize; rename; merge; delete; affected-palette preview. |
| Color name | Public proposal and status; administrative accept/reject/merge; immutable CSS-name fence. |
| Featured membership | Administrative add/remove through its own CAS stream; centralized eligibility and automatic removal. |
| Audit | Cursor/filter/read only; immutable and credential-redacted. |

The canonical value resource/verb surface is closed: `POST /api/users`; `POST /api/sessions`; `GET|DELETE /api/sessions/current`; `PUT /api/users/me/recovery-credential`; `GET|DELETE /api/users/me`; administrator status, session and role commands beneath `/api/users/{id}`; `POST|GET /api/palettes`; `GET /api/palettes/mine`; `GET|PATCH|DELETE /api/palettes/{slug}`; `PUT /api/palettes/{slug}/visibility`; `GET /api/palette-trash`; restore and purge beneath `/api/palette-trash/{slug}`; revision list/detail/diff/revert beneath a palette and numeric revision; fork create/list/provenance; full variant and mix collection/member/history/materialization routes; share create/read/redeem/revoke/export; vote `PUT|DELETE`; flag submit/moderator-list/CAS-resolution; full tag CRUD/impact/merge; color-name proposal/status and administrator CAS/merge; featured-membership `PUT|DELETE`; read-only audit; health; and OpenAPI. [`API-OPERATIONS.md`](API-OPERATIONS.md), not this summary, is the exact closed method/path/operation-ID manifest; the generated registry may invent nothing and all unlisted aliases are forbidden.

### Fourier resources

| Resource | Required operations |
|---|---|
| Visualization | Create; detail; patch; trash/restore/purge; canonical ETag/CAS and resource-edit authority. |
| Search | Stable cursor search/filter/sort with real index plans; GET has no view-count side effect. |
| Revision | List; detail; diff; revert; repeatable content hashes separate from identity. |
| Derivation | Create/read provenance with cycle and visibility safeguards. |
| Palette binding | Bind immutable `paletteId + revisionNo + contentHash` and retain the minimal canonical color snapshot required for reproducibility. |
| Image/contour asset | Create; metadata read; content read; delete; quarantine, decoded-work limits, deduplicated blob/reference lifecycle and purge closure. |
| Equation/compute job | Heavy extraction, epicycle, basis, equation and simplification requests return `202` plus `Location`; job detail, result and cancellation expose durable truth. |
| Audit/meta | Operator audit read; health and OpenAPI. |
| OpenAPI/client | Generate Fourier OpenAPI from Python validators and generate the TypeScript visualization client consumed by the frontend. |

Fourier does not copy palette mixing, taxonomy or account resources merely for symmetry.

The canonical Fourier route surface is limited to visualization CRUD/search/trash/restore/purge; numeric revision list/detail/diff/revert; derivation and provenance; palette-binding `PUT|GET|DELETE`; image and contour create/metadata/content/delete; asynchronous image extraction, epicycle, basis, equation and simplification job creation; job detail/result/cancel; audit; health; and OpenAPI. Exact methods, paths, authority and deliberately headless worker/maintenance operations live in [`API-OPERATIONS.md`](API-OPERATIONS.md). `/api/sessions`, `/api/gallery`, users, owners, mine, draft/private state, likes/views, publish/unpublish, social/admin routers and synchronous compute aliases are terminally absent.

Both target trees obey `app/main → routes → contract + service → own store + platform ports → database`. A module imports no other module's route or store; cross-resource lifecycle participants are injected through the lifecycle contract. Runtime and type-inclusive graphs must have zero strongly connected components.

## Common HTTP return contract

### Success

- Ordinary JSON resource: `{ "data": T }`
- Ordinary JSON collection: `{ "data": T[], "page": { "nextCursor": string | null } }`
- `ETag`, `Location`, `Link`, idempotency replay and cache metadata remain authoritative HTTP headers.
- Synchronous resource creation returns `201`; accepted durable work returns `202` with `Location` and a job representation.
- Successful bodyless deletion or idempotent removal returns `204`.
- A missing required precondition returns `428`.
- A stale precondition returns `412`.
- Image/contour content, typed export/downloads, binary job results and OpenAPI use their declared raw media type and never receive a JSON `data` envelope.

### Failure

```json
{
  "type": "urn:babb:problem:stable-code",
  "title": "Short stable title",
  "status": 412,
  "detail": "Human-readable instance detail",
  "instance": "/api/resource/id",
  "code": "stable_machine_code",
  "errors": []
}
```

All failures use `application/problem+json`. Private unreadable resources use the canonical existence-hiding response. No client derives ETags from response bodies.

## Release boundary

P07, K24 and A26 are audit-only. They cannot repair defects. C10 is the sole publish and production-cutover wave after the two consecutive clean formation/execution closures. Parse-that remains published 1.0.0 and is never republished. Every substrate blocker stays in the active BBNF/parse-that campaign and blocks this cut pending a separately authorized epoch.

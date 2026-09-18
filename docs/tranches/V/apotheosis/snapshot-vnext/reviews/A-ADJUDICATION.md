# A-Band Sol Adjudication

## Signed result

The two hostile Sol critics returned **REFUTE**. The third Sol returned
**NOT CLEAN** and signed `A-ADJ-SOL3-2026-07-18` against value
`c654824e0b252cda7f8490b67f182a48c48cc0ed` and Fourier
`cd26c6533adc32dfe1453d74117d3cb73b89ea16`.

The accepted A band contains 36 rows:

```text
A00 A01 A02 A03 A04 A05 A06 A07 A07T A08 A09 A09C A10 A11 A12
A13 A14 A15 A16 A17 A18 A19 A20 A21R A21 A22 A22S A21A A21J
A23 A23S A23H A24 A25 A23C A26
```

The executable ledger is [`../waves/K-A.md`](../waves/K-A.md). This record
preserves the proof and decisions that caused the 32→36 replacement.
The follow-up signature `A-ADJ-SOL3-ROUTES-2026-07-18` closes every target
method/path, authority, precondition, representation and deliberately headless
operation in [`../API-OPERATIONS.md`](../API-OPERATIONS.md); A00 inventories
current casualties but cannot invent a target route.

## Proven mechanisms

The triad independently proved that:

- value login authenticates a public slug and mints a session;
- value idempotency is process-local, replica/restart-losing and races between
  lookup, handler and store;
- palette writes check preconditions before a write filtered only by slug,
  admitting two-writer loss;
- audit can be written after mutation and swallowed;
- palette revisions use a global content hash and can ignore route scope;
- restore was explicitly retired;
- 28 API tests remain under production `src/**/__tests__`;
- Fourier repeats slug-session authority, check-then-write CAS and racy
  idempotency;
- Fourier CORS rejects its own PATCH/precondition headers and malformed cursors
  can escape as database exceptions;
- visualization GET mutates view counters;
- its asset, contour, equation and compute resources had no owning formation
  row, while an 889-line visualization router and 652-line admin router blurred
  authority;
- `asyncio.to_thread` timeout releases a semaphore while the underlying thread
  can keep running;
- generated Fourier schema/client artifacts had disappeared while the
  handwritten partial client remained.

These are live falsifiers, not desired-state assertions. A02, A03, A05, A09C,
A21R, A21A, A21J, A22S, A23C and A26 must turn them green from clean packed
environments.

## Adjudicated scope

The third Sol rejected the narrow critic's proposal to prune value mixing,
sharing, variants, complete tags or Fourier history/derivation/binding. Those
jobs are either explicit owner requirements or intrinsic reproducibility and
scientific-lineage facilities. Consumer count cannot decide them.

Retained:

- full palette CRUD/lifecycle/history/diff/revert;
- forks and full variant CRUD/history;
- typed versioned mix preview, persisted CRUD/history and materialization;
- stable public sharing, bounded export and revocable immutable private-share
  capabilities;
- votes, flags, complete tags, color-name proposals/moderation, users/roles,
  curation and audit;
- Fourier visualization/assets/contours/equations/jobs/history/derivation,
  public immutable palette binding, audit and meta.

Terminally pruned:

- value tier, publish/unpublish toggle aliases, tag aliases, slug login,
  impersonation, process-local idempotency, route-local policy and source tests;
- Fourier gallery alias, users, sessions, owner claims, private/draft server
  state, likes/views/social facilities, admin god router and synchronous heavy
  compute aliases.

## Authority law

Both deployments are explicitly single-tenant. No field, header, query or body
selects a data namespace, and tenant-looking input cannot affect authorization,
filters, cursors, audit or cache keys.

Value keeps pseudonymous accounts and roles. Clients generate a 32-byte
recovery secret; only a salted digest is stored. Sessions are independent
32-byte tokens stored hashed and carried only in Secure, HttpOnly,
SameSite=Strict cookies with Origin/CSRF enforcement.

Fourier has no accounts. Anonymous creation and public/unlisted reading remain.
Each mutable resource has a client-generated 32-byte edit secret carried as
`Authorization: Resource`; only its salted digest is stored and comparison is
constant-time. A deployment-only operator owns force purge and audit.
Operator-only CRUD was rejected because it discards the resource job;
P-256/RFC9421 signing was rejected because canonicalization, nonce and key
recovery add no intrinsic value over a 256-bit TLS bearer.

Secrets never enter URL state, idempotency bodies, audit or logs. A13 has one
narrow exception: a private immutable-share fragment redeems once into an
HttpOnly grant and is immediately stripped from the address bar.

## Protocol law

Every operation descriptor fixes method/path/operation ID, authority and
existence hiding, closed schemas and identity, If-Match/Idempotency-Key,
transaction/side effects/audit/cache/Vary/CORS, success headers and every
failure as [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html).

Idempotency uses a durable unique reservation keyed by principal, operation,
key and canonical request fingerprint. Different input conflicts; an in-flight
duplicate is explicitly retryable; completed work replays status, body and
authoritative safe headers. Multi-process and kill/restart probes must prove
exactly one domain effect.

## Lifecycle law

A09 owns base trash/restore/purge and a participant port. A09C runs only after
all retained relations exist and binds:

- variants cascade with their palette;
- fork children survive with a non-identifying source tombstone;
- independent mixes and Fourier resources survive from immutable snapshots;
- shares revoke; votes, flags, curation and tag membership delete;
- revision content purges while collision/410 tombstones survive;
- audit survives with actor/subject redaction;
- user deletion requires explicit `trash_all` or
  `retain_public_as_orphan` choice;
- Fourier binding cannot block value purge because it stores a verified public
  immutable snapshot.

## Fourier assets and jobs

A21A gives every image/contour logical resource an opaque ID and its own
authority. Uploads enter quarantine; decode/strip/re-encode validates magic,
MIME, dimensions, decoded pixels, frames and work. Original filenames never
leave quarantine. Blob dedup is separate from logical identity, writes are
atomic, deletion intents replay, and only explicitly public immutable assets
receive public caching.

A21J replaces in-process heavy work with durable jobs and leased worker
processes. States are queued/running/succeeded/failed/cancel-requested/
cancelled/expired. Timeout or cancel kills and joins the worker before capacity
is released. Lease/heartbeat/reclaim, CPU/memory/input/result limits, 202 with
Location, job capability, metrics and audit are mandatory. A cache may fail
open only as an accelerator behind authority, audit and the limiter.

## Target DAG

Value modules are `identity`, `palette`, `history`, `variant`, `mix`, `share`,
`community/{vote,flag}`, `catalog/{tag,name}`, `curation`, `lifecycle`, `audit`
and `meta`, over explicit contract/http/db/security/audit ports.

Fourier modules are `visualization`, `history`, `binding`,
`asset/{image,contour}`, `equation`, `job`, `audit` and `meta`, over explicit
contract/http/db/authority/audit/storage/compute ports.

The edge law is app/main → routes → contracts/services → own stores/platform
ports → database. No module imports another route or store. Cross-resource
lifecycle uses injected participant contracts. Tests mirror the trees outside
source. Both runtime and type-inclusive graphs must have zero SCCs.

## Count and reset

A changes 32→36. Combined with the signed P/V/K and current G/D/M/C baseline,
the provisional corpus became 178 rows at this adjudication point. Later
G/D/M/C triads may amend that total. C08/C09 clean continuity is reset; neither
pass may begin until the final API trees, operation manifests and dependencies
agree throughout the corpus.

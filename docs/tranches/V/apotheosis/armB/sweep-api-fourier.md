# ARM-B SWEEP — API TRUTH + fourier-analysis ISOMORPHISM

Scope (task C7): full census of `value.js/api` (module structure, every route/handler,
the palette surface), any api-equivalent in `keyframes-v-exec`, then the isomorphism map to
`fourier-analysis`'s CRUD/visualization API. Evidence-anchored `file:line`; speculation flagged.

Tree pins (read 2026-07-19): value.js `tranche-u` (api `package.json:3` version `2.0.0`);
keyframes-v-exec `master`; fourier-analysis `api/main.py:52` version `0.2.0`. Independence
firewall honored — no `vnext/`, `snapshot-vnext`, or `armA/` read.

---

## PART 1 — value.js/api CENSUS (the palette backend)

### 1.1 Module structure
Standalone Hono + MongoDB service (NOT a workspace member of value.js; NOT Cloudflare
Workers). Assembly root `src/app.ts`; composition root `src/main.ts` (wires DB + cron +
listener). Layered per `api/CLAUDE.md`: `validate → authn → authz → service → repository →
format → response`.

- **Domain modules** `src/modules/`: `palette/`, `color/`, `session/`, `admin/`, `meta/`.
  Each carries `model.ts` (doc shapes), `schema.ts` (zod), `routes/` (thin controllers),
  `service/` (domain logic), `repository/` (sole DB-access boundary).
- **Platform** `src/platform/`: `db/collections.ts` (the SINGLE `db.collection(...)` site —
  9 collections), `http/` (cors, rate-limit, idempotency, inject-services DI, sanitize-body,
  pagination, errors, ip), `cache/lru.ts`, `migrations/check.ts`, `text/regex.ts`.
- **9 collections** (`platform/db/collections.ts:27-49`): `palettes`, `palette_versions`,
  `votes`, `sessions`, `proposed_names`, `tags`, `flags`, `admin_audit`, `users`.

### 1.2 Full route table (mounted surface — `app.ts:77-89`; verbs grepped)
Mounted at BARE prefixes (no `/api`): the service is reverse-proxied under `mbabb.fi.ncsu.edu/colors/`.

**`/palettes`** (`modules/palette/routes/index.ts:33-38` — 6 concern routers):
- crud (`routes/crud.ts`): `GET /` (cursor list), `GET /mine` (auth), `GET /:slug` (ETag),
  `POST /` (create, 201), `PATCH /:slug` (owner+If-Match), `DELETE /:slug` (soft-delete).
- versions (`routes/versions.ts`): `GET /:slug/versions`, `GET /:slug/versions/:hash`,
  `POST /:slug/revert` (owner).
- forks (`routes/forks.ts`): `POST /:slug/fork` (201), `GET /:slug/forks`, `GET /:slug/provenance`.
- publish (`routes/publish.ts`): `POST /:slug/publish` (→public), `POST /:slug/unpublish` (→private).
- votes (`routes/votes.ts`): `POST /:slug/vote` (toggle).
- flags (`routes/flags.ts`): `POST /:slug/flag` (user report, 201).

**`/colors`** (`modules/color/routes.ts`): `GET /approved`, `GET /search` (byte-prefix),
`GET /tags`, `POST /propose` — the color-NAME curation domain (proposed_names + tags collections).

**`/sessions`** (`modules/session/routes.ts`): `POST /` (register, 201), `POST /login`,
`DELETE /` (revoke), `GET /me`. Slug-word identity; `X-Session-Token` header; token hashed
at-rest (`__tests__/session-token-at-rest.test.ts`).

**`/admin`** (`modules/admin/routes/index.ts` — `adminAuth` bound once, 8 sub-routers):
colors queue/approve/reject/delete, palettes feature/delete, users list/status/delete/import/
prune-empty/:slug/palettes, impersonate, batch palettes/users, tags CRUD, flagged queue/dismiss,
audit read.

**Meta** (`app.ts:88-89`, `modules/meta/routes.ts`): `GET /` (liveness), `GET /health`
(real readiness — Mongo primary elected, `routes.ts:50-62`), `GET /docs`, `GET /openapi.json`
(GENERATED from the live mounted registry — cannot drift; `_parity.ts` is the hand-run drift
check comparing mounted routes vs generated spec — NOTE: a SELF-parity guard, not cross-repo).

### 1.3 Palette entity + the C7 surface ("history, variants, CRUD, mixing")
`Palette` (`modules/palette/model.ts:53-78`): `name, slug, colors[], oklabColors[], tags[],
voteCount, userSlug|null, visibility, tier, deletedAt, createdAt, updatedAt, currentHash,
forkOf, forkOfHash, forkCount, versionCount`.
- **visibility** 3-state `public|unlisted|private` (`model.ts:19`); **tier** 3-state
  `standard|featured|archived` (`model.ts:22`) — orthogonal curation dimension.
- `PaletteColor = {css, name?, position}` (`model.ts:32-41`); denormalized `OklabTriple[]`
  computed server-side (`service/oklab.ts` — hex/rgb ONLY; hsl/oklch/named REJECTED at
  boundary `oklab.ts:66-80`; inline impl, does NOT consume `@mkbabb/value.js` parseCSSColor,
  flagged for replacement `oklab.ts:16-21`).
- `PaletteVersion` (`model.ts:84-98`): `_id=hash, name, colors[], parentHash, forkedFromHash,
  authorSlug, paletteSlug, createdAt, rootHash, depth`. **NO `atom_diff` field.**

**C7 surface truth — what EXISTS vs what a full palette spec needs:**
| Facility | value.js/api status |
|---|---|
| CRUD | ✅ full (create/read/list/mine/patch/soft-delete + publish/unpublish) |
| History | ✅ versions list / get-by-hash / revert; `parentHash/rootHash/depth` chain. **But NO recorded per-version atom-diff** (excised) |
| Variants (fork) | ✅ but **VERBATIM-COPY fork only** (`service/forks.ts:64-65` copies `source.colors` as-is; params limited to name/slug) |
| **Mixing** | ❌ **ABSENT from the API.** No `/mix`, no atom-diff `/remix`, no `/diff`. |
| Diff | ❌ ABSENT (route grep: no `/diff`). |
| oklab color-distance search | ✅ UNIQUE to value (`service/crud-list.ts:159-181`, `colorL/A/B/colorRadius` query) |

**The load-bearing removal (TA-4):** the J.W2 atom-diff write apparatus — `POST /:slug/remix`
+ `GET /:slug/diff` + per-atom `atomdiff.ts` — was **EXCISED at value.js T.W1**. Evidence:
`service/forks.ts:34-36` ("the J.W2 remix/atom-diff arm was excised at T.W1 (TA-4: the
`/remix`+`/diff` write-only apparatus)"); `modules/palette/hash.ts:41-42` ("the `/diff` read +
the atom-diff algebra that once also consumed it were excised at T.W1 — TA-4"). The
`atomSetHash` fingerprint SURVIVES on the response (`format.ts:43-45`, `hash.ts`) as a dedup
HINT only — its consumers are gone. So palette "mixing" as a first-class server facility does
not exist; mixing lives only in the demo/library (`useGradientModel`, mix composables).

### 1.4 Cross-cutting conventions (value.js)
- **Envelope**: success = bare `c.json(domainObject)` (no wrapper). Errors = RFC 7807/9457
  `application/problem+json` via `platform/http/errors/index.ts` — typed `ApiError` subclasses,
  each carrying a `urn:contract:<kebab>` typeUrn (`errors/index.ts:47,68-197`). 500 fallback
  keeps repo-local `urn:palette-api:problem:internal` (`errors/index.ts:236`).
- **ETag** (`modules/palette/etag.ts:23-26`): strong `"currentHash | updatedAt.toISOString()"`
  — the AT-REST hash/timestamp, NOT a hash of a mutable projection. If-Match: 428 absent /
  412 mismatch / `*` accepted (`etag.ts:37-51`).
- **Cursor** (`service/crud-list.ts:41-68`): `base64url(json{_id, createdAt, voteCount?,
  forkCount?})`. Stale/malformed cursor → **graceful "start from beginning"** (`crud-list.ts:48-58`).
- **Idempotency** (`platform/http/idempotency.ts`): `Idempotency-Key` replay; same-key
  different-body → 409 `urn:contract:idempotency-replay-conflict`. In-process store.
- **Ownership**: `userSlug` MAY be null — **anonymous-owned palettes are allowed**
  (`routes/crud.ts:85` `userSlug ?? null`).
- Version tag `2.0.0` (`meta/routes.ts:34`); zod `^4.4.3`; hono `^4.12.25`.

---

## PART 2 — keyframes-v-exec API-EQUIVALENT

**NONE.** keyframes-v-exec is a pure library + demo (`ls`: `src/ demo/ bench/ dist/` — no
`api/ server/ backend/`). Grep for `hono|express|fastify|createServer|listen(` across
`src/` + `demo/` returns only false positives (e.g. `waapi/options.ts`, `group.ts` — the
word "listen" in event-listener contexts), zero server topology. keyframes has no CRUD
backend, no palette surface, no persistence. The palette API is value.js-sole (consistent
with the C7 ruling "Palette API should exist within its current /api" and fourier's
`atomdiff.py:9` inv-16 "palettes live in the value.js service").

---

## PART 3 — fourier-analysis CRUD/VISUALIZATION API + ISOMORPHISM

### 3.1 What fourier is
FastAPI + Motor(async Mongo) Python backend, `api/main.py`. Routers mounted under `/api/*`
(`main.py:105-111`): `images, contours, equations, sessions, visualizations, gallery, admin`.
The `visualizations` router IS the CRUD twin of value.js `palettes`. Crucially, fourier owns
a **`api/lib/crud/` shared-by-CONTRACT library** — the explicit sibling of value.js's excised
`lib/crud/`: `atomdiff.py, canonical_digest.py, cursors.py, errors.py, etag.py, idempotency.py,
slugs.py, softdelete.py, pinned_cron.py`.

### 3.2 The SHARED SPINE (isomorphic by the cross-repo CRUD-CONTRACT)
Both repos descend from one documented contract: value.js `errors/index.ts:29-31` cites
`fourier-analysis/docs/tranches/B/coordination/CRUD-CONTRACT.md v2.0.0`; `atomdiff.py:9` cites
`docs/tranches/J/design/J-diff-shape.md`; `atomdiff.py:1` names value.js as the "twin".
Structurally congruent facilities:

| Facility | value.js | fourier | Isomorphic? |
|---|---|---|---|
| Slug identity + soft-delete `deletedAt`/`deleted_at` + 30d grace + reaper cron | `model.ts:68`, cron | `softdelete.py`, `pinned_cron.cron_prune` | ✅ shape |
| Cursor pagination (keyset `$or`, `limit+1`, `hasMore/next_cursor`) | `crud-list.ts` | `cursors.py` | ✅ pattern |
| ETag + If-Match (428/412/`*`) | `etag.ts` | `etag.py` | ✅ semantics |
| Idempotency-Key replay → 409 | `idempotency.ts` | `idempotency.py` | ✅ |
| RFC 9457 `application/problem+json`, `urn:contract:<kebab>` | `errors/index.ts` | `errors.py:54-73` | ✅ vocabulary |
| Session register/login/me/logout, `X-Session-Token`, slug words | `session/routes.ts` | `sessions.py` | ✅ shape |
| fork/provenance + publish/unpublish verb pair | palette routes | `visualizations.py` | ✅ pattern |
| Admin moderation (users/batch/flagged/audit/status/prune) | `admin/routes/*` | `admin.py` | ✅ near-parallel |

### 3.3 fourier `/api/visualizations` route table (`routers/visualizations.py`)
`POST "" · GET /{slug} · GET "" · PATCH /{slug} · DELETE /{slug} · POST /{slug}/restore ·
POST /{slug}/remix · POST /{slug}/publish · POST /{slug}/unpublish · GET /{slug}/forks ·
GET /{slug}/provenance · GET /{slug}/diff · GET /{slug}/versions`. Plus `gallery.py`
`GET /api/gallery/cursor` (read-only public alias).

### 3.4 THE ISOMORPHISM GAPS (both directions)

**A. fourier HAS, value.js LACKS (the excised TA-4 apparatus — the biggest asymmetry):**
- **`POST /{slug}/remix`** (`visualizations.py:488-612`): a fork carrying atom OVERRIDES +
  a RECORDED atom-diff; **no-op remix → 422 `urn:contract:remix-noop`** (`viz.py:536-542`) —
  the "fourier tightening over value.js's verbatim-copy fork". value.js fork
  (`service/forks.ts:64`) copies colors verbatim, no overrides, no no-op guard.
- **`GET /{slug}/diff`** (`viz.py:799-852`): canonical `{from_hash,to_hash,ops[],identical}`
  envelope (`models/visualization.py:299-310`); immutable, `Cache-Control ...immutable`,
  If-None-Match/304. value.js has NO diff endpoint.
- **`VisualizationVersion.atom_diff`** (`models/visualization.py:254`) — versions carry the
  recorded per-edge delta; content-addressed `_id = f"{slug}:{set_hash}"` (`viz.py:235`).
  value.js `PaletteVersion` (`model.ts:84-98`) has NO atom_diff.
- **`api/lib/crud/atomdiff.py`** — `enumerate_atoms/set_hash/diff_atoms/AtomOp` (op vocab
  `added/removed/changed`). value.js's twin `lib/crud/atomdiff.ts` was DELETED at T.W1.
- **Formal problem() catalog** (`errors.py:54-73`) — 20+ `functools.partial` named helpers
  (slug_conflict, flag_self, flag_duplicate, remix-noop, visibility-illegal-transition,
  slug_pool_exhausted…). value.js maps the same URNs but via ~13 `ApiError` classes, fewer
  distinct rows.
- **Cursor stale-sort → 400** `urn:contract:cursor-invalid` (`cursors.py:65`); value.js
  silently restarts. Divergent convention.

**B. value.js HAS, fourier LACKS:**
- **`POST /:slug/vote`** vote-toggle (`votes/`) — a `votes` collection + user vote. fourier
  has `views/likes` FIELDS (`models/visualization.py:151`, `liked_ips` stripped `viz.py:80`)
  but **NO like/vote write endpoint in the current router tree** (route grep confirms). Gap.
- **User-facing `POST /:slug/flag`** (`flags/`) — fourier's flag surface is admin-only
  (`admin.py` `GET /flagged`, `DELETE /{slug}/flags`); `errors.py:71-72` defines
  `flag_self`/`flag_duplicate` but no non-admin flag route mounts them. Gap.
- **oklab color-distance search** (`crud-list.ts:159-181`) — domain-specific to palettes.
- **`tier`** curation dimension (`standard/featured/archived`, `model.ts:22`) — fourier has
  no tier, only `pinned:bool` (`models/visualization.py:155`).
- **Session token hashed at-rest** — fourier stores token as plaintext `uuid4` `_id`
  (`sessions.py:26,53`); value.js hashes (`session-token-at-rest.test.ts`). Security divergence.

**C. SAME facility, DIVERGENT shape/semantics (representation-may-diverge per SCHEMA.md):**
- **Naming**: value.js camelCase (`userSlug, createdAt, forkOf, forkCount, versionCount`);
  fourier snake_case (`owner_slug, created_at, fork_of, fork_count, version_count`). Known
  per-repo representation divergence; *shape* held constant by contract.
- **visibility enum**: value `public|unlisted|private` (`model.ts:19`); fourier
  `draft|unlisted|public` (`models/visualization.py:34`) — `draft` replaces `private`.
- **unpublish target**: value → `private` (`routes/publish.ts:57,62`); fourier → `unlisted`
  (`viz.py:647`), guarded by `is_legal_visibility_transition` forbidding `public→draft`
  (`models/visualization.py:42-49`). value.js has no such transition guard.
- **Ownership nullability**: value ALLOWS anon-owned (`userSlug|null`); fourier REQUIRES
  non-null owner, anon publish → 401 (`viz.py:170-172`). fourier is the stricter/better contract.
- **ETag derivation**: value = at-rest hash/timestamp (`etag.ts:24`); fourier = `sha256`
  canonical_digest over the MUTABLE-field projection (`etag.py:25-31`). Both strong+quoted;
  different basis → not byte-compatible.
- **content/set hash**: value `currentHash`=hash(name,colors), `atomSetHash`=order-independent
  colors fingerprint; fourier `content_hash`=digest(subject projection), `set_hash`=order-
  independent atom-set (`atomdiff.py:112-120`). Congruent roles, different atoms
  (`PaletteColor[]` by position vs 5 named config atoms `atomdiff.py:29-35`).
- **Idempotency store**: value in-process; fourier Mongo-backed 24h TTL (`viz.py:63-70`).
- **Route prefix**: value bare `/palettes`; fourier `/api/visualizations`.

### 3.5 Parity witnesses
fourier holds the machine-checked shape guard value.js lost: `tests/conformance/
test_diff_shape.py` asserts the J-diff-shape wire envelope; `test_remix.py`, `test_publish.py`,
`test_visibility.py`, `test_etag.py`, `test_pagination.py`, `test_idempotency.py`,
`test_ownership.py`, `test_soft_delete.py` — a full CRUD-CONTRACT conformance battery.
value.js has `test/conformance/{crud,envelope,idempotency,sessions-colors,txn-right-sizing}.test.ts`
+ `_parity.ts` (self drift-guard). Neither side runs a live CROSS-repo isomorphism harness;
parity is doc-anchored (CRUD-CONTRACT + J-diff-shape), enforced per-repo.

---

## SYNTHESIS — for the full-palette-spec + isomorphism mandate (C7)
1. "Mixing" is the one C7 facility with **zero server implementation** — it was deliberately
   excised (TA-4) and now lives only in the demo/library. A full palette API spec must decide:
   restore the atom-diff `/remix`+`/diff` rail (fourier is the reference impl to isomorph
   against), OR ratify mixing as client-only and tombstone the API expectation.
2. value.js's fork is verbatim-copy; fourier's remix (records delta + rejects no-op) is the
   richer, contract-blessed shape. Adopting fourier's remix closes the largest gap and
   re-earns the shared `atomdiff` pattern value.js authored-then-deleted.
3. Two silent-drop candidates on the FOURIER side to relay: `likes`/`views` fields with no
   like endpoint; `flag_self`/`flag_duplicate` errors with no user flag route.
4. Convergence work items for isomorphism: unify cursor stale-sort behavior (400 vs graceful);
   unify ETag derivation basis; reconcile visibility enums (`private` vs `draft`) + unpublish
   target; align anon-ownership policy (recommend fourier's non-null owner). Naming
   (camel vs snake) is a ratified representation divergence, not a defect.

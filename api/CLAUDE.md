# api/

Hono + MongoDB palette API. Dockerized, deployed behind Apache reverse proxy. Node.js server (NOT Cloudflare Workers + D1).

## Structure

```
api/
├── src/
│   ├── main.ts               # composition root (T.W1): wires DB + cron, starts the listener + SIGTERM/SIGINT handlers
│   ├── app.ts                # Hono assembly: global middleware stack (from platform/http/) + route mounting + 404/error envelopes
│   ├── types.ts              # AppEnv (session token + userSlug + services context vars)
│   ├── cron.ts               # daily cleanup: orphaned votes (sessions reaped by the sessions TTL index, not cron)
│   ├── modules/              # DDD feature verticals (T.W1) — each owns model + schema + routes + service + repository
│   │   ├── palette/          # model + schema + etag + format + hash + require-ownership;
│   │   │                     #   routes/ (crud, flags, forks, publish, versions, votes + index barrel);
│   │   │                     #   service/ (crud, crud-list, flags, forks, oklab, ownership, versions, visibility, votes);
│   │   │                     #   repository/ (palette, paletteVersion, vote, flag)
│   │   ├── session/          # model + schema + resolve-session + routes + slugWords;
│   │   │                     #   service/auth; repository/ (session, user)
│   │   ├── color/            # model + schema + routes; service/ (proposals, queries); repository/ (proposedName, tag)
│   │   ├── admin/            # admin-auth + audit-log + model + schema;
│   │   │                     #   routes/ (audit, batch, colors, flagged, impersonate, palettes, tags, users + index barrel);
│   │   │                     #   service/ (audit, batch, colors, flagged, impersonate, import, palettes, tags, users);
│   │   │                     #   repository/adminAudit
│   │   └── meta/             # routes + route-table (/health mongo-ping, /docs, /openapi.json — inv-22-color)
│   └── platform/             # cross-cutting infra (T.W1) — no domain logic
│       ├── http/             # cors, rate-limit, sanitize-body, inject-services (DI + makeWithTransaction), idempotency, ip + errors/ (ApiError → problem+json)
│       ├── db/               # db.ts (MongoDB singleton + closeDb; 22 indexes / 9 collections) + collections.ts (typed Collection<T> accessors)
│       ├── cache/            # lru.ts — LRU<K,V> single consolidated in-memory cache
│       ├── migrations/       # check.ts — startup schema-invariant smoke probe (+ migrate-soft-delete.ts, delete-after-run)
│       └── text/             # regex.ts — escapeRegex ($regex operator defang)
├── package.json              # hono, mongodb, node-cron, dotenv, zod
├── tsconfig.json             # strict, ES2022, Node16 modules
├── Dockerfile                # multi-stage Node 22-alpine build
├── compose.yaml              # api + mongo (rs0) services, health checks; loopback 127.0.0.1:8130:3000
├── apache-vhost.conf         # api.color.babb.dev → 127.0.0.1:8130 (spine TLS terminator)
├── .env.example              # ADMIN_TOKEN, ALLOWED_ORIGINS, PORT (MONGO_* residual — see §Mongo discipline)
└── .dockerignore
```

## Pipeline shape

The canonical request pipeline (D-HARDEN-3 §2):

```
validate → authn → authz → service → repository → format → response
```

- **validate** — `modules/*/schema.ts` (zod); route handlers throw `ValidationError` on parse failure.
- **authn** — `modules/session/resolve-session.ts` middleware reads `X-Session-Token` → sets `sessionToken` + `userSlug` on `c.var`.
- **authz** — `modules/palette/require-ownership.ts` (palettes) / `modules/admin/admin-auth.ts` (admin); both throw on failure.
- **service** — `modules/{palette,admin,color,session}/service/*.ts`; receives `Services` from `c.var.services`.
- **repository** — `modules/*/repository/*.ts`; the ONLY layer that calls `db.collection(...)` (via `platform/db/collections.ts`).
- **format** — `modules/palette/format.ts`; converts the document shape to the API envelope.
- **response** — `c.json(...)`; errors thrown anywhere upstream become canonical envelopes via the global `onError → toResponseEnvelope` mapper (`platform/http/errors/`).

### Cross-collection transactions

Cross-collection mutations wrap in `services.withTransaction(async (session) => { ... })`. `makeWithTransaction` is the factory in `platform/http/inject-services.ts`, hung off the `Services` DI object.

**Coverage history**: F-window 3 sites → G.W3 Lane E 7 sites → H.W1 16 sites → **N.W3.B right-sized to 14 sites**:
- F-window (3): `deleteUser`, `forkPalette`, `toggleVote`.
- G.W3 Lane E (+4 = 7): `deletePalette`, `revertToVersion`, `batchPalettes(delete)`, `batchUsers(suspend)`.
- **H.W1 Lane A (+2 = 9)**: `createPalette`, `patchPalette` (the H-AUDIT-6 §3 defect repair — orphan-version exposure class closed).
- **H.W1 Lane A.2 in-wave extension (+7 = 16)**: `registerSession`, `loginSession`, `deletePalette` (admin variant), `setUserStatus`, `deleteUserPalettes`, `pruneEmptyUsers`, `deleteTag`.
- **N.W3.B right-sizing (−4 + the cron reaper census = 14)**: dropped `toggleVote` (unique-index anchor + document-atomic `$inc`; advisory count), `registerSession`/`loginSession` (benign orphan reaped by `pruneEmptyUsers` / advisory `lastSeenAt`), `restorePalette` (single-collection; recompute self-heals). H1 still binds — no cross-collection referential write was unwrapped. The cron reaper hard-delete (`cron.ts:47`, `palettes`+`votes`+`flags`) is now counted in the WRAPPED census. See `docs/tranches/H/audit/api-withTransaction-coverage.md §3.3`.

**Standing reference**: `docs/tranches/H/audit/api-withTransaction-coverage.md` — exhaustive enumeration of every cross-collection write site + its session status (WRAPPED / DEFERRED-WITH-RATIONALE / SINGLE-COLLECTION). The H1 invariant codifier — adding a new cross-collection write site WITHOUT updating this list is itself the regression the invariant guards against. See §5.2 for the reviewer's checklist + §5.4 for the rollback-test convention.

### Strictness (H.W1 Lane B — root parity)

`api/tsconfig.json` matches root strictness as of H.W1. The 4 flags lifted at H.W1 Lane B: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `isolatedModules`. 36 surfaced errors repaired genuinely (zero `@ts-ignore`, zero `as any`, zero `as unknown as` added). Incidental: a latent duplicate `PaletteColor` interface (then in `src/hash.ts`, now `modules/palette/hash.ts`) unified to the canonical palette `model.ts` source-of-truth.

### L invariants (tranche L — the `api/src` fastidious-closure)

`api/src` holds the same invariant discipline `src/` does. Enforced **structurally** (branded types + `tsc` + `eslint` + the excision itself), verified at close by a human-run review/grep — no committed `proof:*` script (that idiom is retired). The standing constraints (`docs/tranches/L/L.md §2`):

- **`as any` = 0; `as unknown as` = 1** — the lone irreducible is the `@hono/node-server` `server.close()` handle at `main.ts` (a third-party type-stub gap, policy-commented). The 2 former `resolve-session.ts` ObjectId casts were retired at the model boundary by the branded `SessionToken`/`UserSlug` nominal types (`modules/session/model.ts`): `Session._id`/`User._id` carry the brand, minted once via `asSessionToken`/`asUserSlug` at the repository filter boundary + genuine construction sites.
- **No legacy palette fields** — neither `sessionToken` (the legacy ownership shim; `userSlug` is the sole canonical owner) nor the 4-state `status` field exists in `api/src`. Canonical curation state is `(visibility, tier)`; the list filter takes `visibility`/`tier` query params. (The session-AUTH `c.var.sessionToken` is a DISTINCT live mechanism — unrelated to the deleted palette field.)
- **Typed errors, no ad-hoc envelopes** — every failure throws an `ApiError` subclass routed through `onError → toResponseEnvelope` (canonical `application/problem+json`); no `c.json({ error … })` in `platform/http/` middleware or `modules/*/routes/`.
- **The boundary holds** — routes call services, never `c.var.services.repositories.*` directly (ownership/ETag reads live in `modules/palette/service/ownership.ts`); only `modules/*/repository/` + the inject-services factory (`platform/http/inject-services.ts`) call `getDb()`/`db.collection()` (the request pipeline never bypasses the DI seam).
- **God-module cap** — no `api/src` file exceeds 350 LoC.

## Database (MongoDB)

**9 collections, 22 explicit indexes** (per `platform/db/db.ts`; the implicit `_id` per collection is excluded from the count):

| Collection | Indexes |
|------------|---------|
| `palettes` | `slug` (unique), `deletedAt+visibility+createdAt`, `deletedAt+visibility+voteCount+createdAt`, `deletedAt+visibility+forkCount+createdAt`, `userSlug+createdAt`, `tags`, `forkOf`, `name` (text) |
| `palette_versions` | `paletteSlug+createdAt` (the write-only `forkedFromHash`/`rootHash`/`authorSlug+createdAt` indexes were dropped N.W3.C — zero query consumers) |
| `votes` | `userSlug+paletteSlug` (unique), `paletteSlug` |
| `sessions` | `expiresAt` (TTL, `expireAfterSeconds:0` — reaps each session at its horizon; the `lastSeenAt` stale-sweep index retired with the dead cron sweep N.W3.C/I) |
| `proposed_names` | `name` (unique), `status`, `name+css` (text) |
| `users` | `createdAt` |
| `tags` | `name` (unique) |
| `flags` | `paletteSlug+reporterSlug` (unique), `paletteSlug`, `createdAt` |
| `admin_audit` | `timestamp`, `action+timestamp` |

## Middleware stack (order)

1. `OPTIONS *` → 204 + CORS preflight
2. CORS headers on all responses
3. Body size limit: 64 KB (`hono/body-limit`)
4. Rate limiting: 60 read/min, 10 write/min per IP (login: 5/min, registration: 3/min) — all backed by `platform/cache/lru.ts`
5. `sanitizeBody` — reject JSON bodies containing `$`-prefixed keys (MongoDB operator injection guard)
6. `injectServices` — DI hands typed `Services` (repositories + helpers) to every handler (runs BEFORE `resolveSession`, which reads repositories off the seam)
7. `resolveSession` — `X-Session-Token` → `sessionToken` + `userSlug` (suspended-user check, 60s LRU cache)
8. `idempotency` — `Idempotency-Key` replay store (opt-in; a no-op when the header is absent; runs after `injectServices`/`resolveSession`)

Admin routes additionally require `Authorization: Bearer {ADMIN_TOKEN}` (timing-safe comparison via `node:crypto`'s `timingSafeEqual`).

## Endpoints

### Sessions

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/sessions` | — | Register (creates user + session) |
| POST | `/sessions/login` | — | Log in with existing slug |
| GET | `/sessions/me` | Session | Current user info |
| DELETE | `/sessions` | Session | Log out (delete session token) |

### Palettes

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/palettes` | — | List (paginated cursor or offset; sort: newest / popular / most-forked; color-distance filter) |
| GET | `/palettes/mine` | Session | List my palettes |
| GET | `/palettes/:slug` | — | Get by slug |
| POST | `/palettes` | Session | Create palette |
| PATCH | `/palettes/:slug` | Session+owner | Edit palette |
| DELETE | `/palettes/:slug` | Session+owner | Delete palette |
| POST | `/palettes/:slug/vote` | Session | Toggle vote (idempotent upsert + gated `$inc`) |
| POST | `/palettes/:slug/flag` | Session | Flag for moderation |
| POST | `/palettes/:slug/fork` | Session | Fork (cross-collection write) |
| GET | `/palettes/:slug/forks` | — | List direct forks |
| GET | `/palettes/:slug/provenance` | — | Ancestry chain (≤50 depth) |
| GET | `/palettes/:slug/versions` | — | List versions |
| GET | `/palettes/:slug/versions/:hash` | — | Get specific version |
| POST | `/palettes/:slug/revert` | Session+owner | Revert palette to prior version |

### Colors

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/colors/approved` | — | List approved color names |
| GET | `/colors/search` | — | Search approved color names |
| GET | `/colors/tags` | — | List color tags |
| POST | `/colors/propose` | Session | Propose color name |

### Admin

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/admin/audit` | List audit-log entries |
| GET | `/admin/queue` | List pending color-name proposals |
| GET | `/admin/colors/approved` | List approved color names |
| DELETE | `/admin/colors/:id` | Delete color name |
| POST | `/admin/colors/:id/approve` | Approve color name |
| POST | `/admin/colors/:id/reject` | Reject color name |
| POST | `/admin/palettes/:slug/feature` | Toggle featured status |
| DELETE | `/admin/palettes/:slug` | Delete palette + votes |
| GET | `/admin/users` | List users |
| POST | `/admin/users/prune-empty` | Prune users with 0 palettes |
| GET | `/admin/users/:slug/palettes` | List user's palettes |
| POST | `/admin/users/:slug/status` | Suspend / unsuspend user |
| DELETE | `/admin/users/:slug` | Delete user + all data |
| DELETE | `/admin/users/:slug/palettes` | Delete user's palettes |
| POST | `/admin/users/:slug/import` | Import palettes to user |
| POST | `/admin/impersonate` | Create session as user |
| GET | `/admin/tags` | List tags |
| POST | `/admin/tags` | Create tag |
| DELETE | `/admin/tags/:name` | Delete tag |
| GET | `/admin/flagged` | List flagged palettes |
| DELETE | `/admin/flags/:paletteSlug` | Dismiss flags for palette |
| POST | `/admin/batch/palettes` | Batch palette operation |
| POST | `/admin/batch/users` | Batch user operation |

All admin actions require `Authorization: Bearer {ADMIN_TOKEN}` AND emit an `admin_audit` event via `emitAuditEvent` (befitting-graceful per D3 — audit-write failure is logged via `console.error`, not surfaced to the client; documented in `modules/admin/audit-log.ts`).

## Startup sequence

1. Validate env (`MONGODB_URI`, `ADMIN_TOKEN`, `ALLOWED_ORIGINS` in production)
2. `getDb()` — connect + create indexes (idempotent)
3. `assertMigrationsApplied(db)` — schema-invariant smoke probe (exits non-zero on violation, D.W2 Lane D F1)
4. Schedule cron cleanup (3 AM UTC daily)
5. `serve(...)` — start HTTP listener
6. Install `SIGTERM` / `SIGINT` handlers (5s grace; `.close()` → `closeDb()` → exit)

## Deployment (DEC-9 — babb.dev spine, NO rsync)

- **Production URL**: `https://api.color.babb.dev` (the babb.dev spine; the demo
  frontend is `https://color.babb.dev` on Cloudflare Pages)
- **Server**: Docker Compose (api + mongo, replica-set `rs0`) bound loopback-only
  `127.0.0.1:8130:3000`, fronted by the spine's single Apache TLS terminator
- **Deploy**: `scripts/deploy.sh api` (repo root) — git-push → adnanh/webhook
  (`deploy.babb.dev/hooks/value-js`, HMAC, `ref==master`) → on-host git-pull →
  `docker compose up` → bounded `/` health-gate. **No rsync, no SSH** (the old
  `api/deploy.sh` rsync outlier + the `mbabb.fi.ncsu.edu/colors/` :3100 NCSU
  topology were retired at K.W2 / DEC-9).

## Mongo discipline — justified divergence (U-F37)

**Mongo-discipline justified-residual (U-F37).** The prod compose (`compose.yaml`)
runs `mongod --replSet rs0 --bind_ip_all` with **no SCRAM auth and no
`--keyFile`**, and `MONGODB_URI` carries **no credentials**. This is an EXPLICIT,
documented **defense-in-depth residual** — a *written* divergence from the precept
`docs/precepts/infra/domains.md §The Mongo discipline` (lines 149–155: "Verified-TLS
server-only + SCRAM-SHA-256 auth", "**Never `0.0.0.0`**"), **not a silent one**.

**Why it is bounded** (the divergence is a residual, not a raw host-exposed hole):

- The `mongo` service publishes **no host port** — it declares no `ports:` block, so
  it is reachable only on the internal compose bridge network (`networks: internal`),
  never from the host or the public internet.
- The `api` service is **loopback-bound** — `compose.yaml` maps `127.0.0.1:8130:3000`,
  fronted by the spine's single Apache TLS terminator; nothing else on the host or LAN
  can reach the api port either.
- The compose carries genuine container hardening on both services — `read_only: true`
  (api), `cap_drop: [ALL]`, `no-new-privileges:true`, tmpfs `noexec,nosuid`, and
  per-service resource limits.

**The config-truth restoration (U-F37 cure, path b).** `.env.example` previously
advertised 4 `MONGO_*` credential vars (`MONGO_ROOT_USER`, `MONGO_ROOT_PASSWORD`,
`MONGO_USER`, `MONGO_PASSWORD`) under a false comment claiming Docker Compose consumed
them — `compose.yaml` never referenced any of them. Those 4 vars + the false comment
are **deleted**; `.env.example` now advertises only the real, wired vars
(`ADMIN_TOKEN`, `ALLOWED_ORIGINS`, `PORT`). The gate `api/test/config-truth.test.ts`
(G-SEC-2) asserts no `.env.example` `MONGO_*` var goes unreferenced by `compose.yaml`,
and that this divergence carries either wired SCRAM or this written residual.

**The SCRAM-vs-residual fork (recorded).** U-F37 offered two honest ends: (a) **wire
SCRAM** — add `MONGO_INITDB_ROOT_*` + a `--keyFile`, thread credentials into
`MONGODB_URI`, restrict the bind (the full precept-satisfying gestalt); or (b)
**delete the unwired vars + write this justified-residual** for the bounded
internal-bridge posture. **Path (b) was taken** at execution: it is the **prod-safe,
repo-side** path — it resolves the config-truth lie without improvising a live
SCRAM/keyFile change to the production compose, which is a prod-touching deploy act.
**The SCRAM + keyFile full-satisfaction path remains the owner's deploy-time
election** (per U.W-SEC §BOOKS "The U-F37 SCRAM-vs-residual decision → owner call at
execution"); when the owner elects to wire it, this section is superseded by real
credentials and G-SEC-2 flips to the SCRAM-wired arm.

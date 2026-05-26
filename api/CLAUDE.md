# api/

Hono + MongoDB palette API. Dockerized, deployed behind Apache reverse proxy. Node.js server (NOT Cloudflare Workers + D1).

## Structure

```
api/
├── src/
│   ├── index.ts              # Hono app, middleware stack, route mounting, cron, SIGTERM shutdown
│   ├── types.ts              # AppEnv (session token + userSlug + services context vars)
│   ├── db.ts                 # MongoDB singleton + closeDb; 27 indexes across 9 collections
│   ├── db/
│   │   └── collections.ts    # typed Collection<T> accessors (D.W2 Lane C)
│   ├── models.ts             # typed document shapes for the 9 collections
│   ├── hash.ts               # computeContentHash (SHA-256 over canonical palette payload)
│   ├── regex.ts              # escapeRegex (defangs strings before MongoDB $regex)
│   ├── middleware/           # per-concern files (E.W2 Lane E split of the 279-LoC god module)
│   │   ├── inject-services.ts    # DI: hangs typed `services` off c.var
│   │   ├── require-ownership.ts  # canonical ownership check (userSlug-only)
│   │   ├── cors.ts               # CORS header construction
│   │   ├── rate-limit.ts         # 4-tier rate limiter (read/write/registration/login)
│   │   ├── resolve-session.ts    # X-Session-Token → c.var.{sessionToken,userSlug}
│   │   ├── admin-auth.ts         # Authorization: Bearer ADMIN_TOKEN (timing-safe)
│   │   ├── sanitize-body.ts      # MongoDB operator-injection guard (reject `$`-keys)
│   │   └── ip.ts                 # resolveIP + hashIP (trust-proxy-gated)
│   ├── repositories/         # per-collection data-access (Palette, Vote, Session, User,
│   │                         #  ProposedName, Tag, Flag, AdminAudit, PaletteVersion)
│   ├── services/             # business logic, depends on repositories via Services DI
│   │   ├── palette/          # crud + crud-list + forks + votes + flags + versions + oklab
│   │   │                     #  (consumed by routes/palettes/)
│   │   ├── admin/            # colors + palettes + users + impersonate + import + tags +
│   │   │                     #  flagged + audit + batch (consumed by routes/admin/)
│   │   ├── color/            # color-name surface: queries (approved + search + tags) +
│   │   │                     #  proposals (propose) (consumed by routes/colors.ts)
│   │   └── session/          # auth — register + login + revoke + me
│   │                         #  (consumed by routes/sessions.ts)
│   ├── routes/
│   │   ├── palettes/         # crud + forks + votes + flags + versions (+ index barrel)
│   │   ├── admin/            # colors + palettes + users + impersonate + tags + flagged +
│   │   │                     #  audit + batch (+ index barrel)
│   │   ├── colors.ts         # color name propose + search + approved + tags
│   │   └── sessions.ts       # register + login + /me + DELETE
│   ├── validation/           # zod schemas (palette + admin + color + session)
│   ├── errors/               # ApiError hierarchy + toResponseEnvelope mapper
│   ├── events/
│   │   └── auditLog.ts       # canonical emitAuditEvent (befitting-graceful per D3)
│   ├── format/
│   │   └── palette.ts        # formatPalette (canonical Palette → API envelope)
│   ├── cache/
│   │   └── lru.ts            # LRU<K, V> — single consolidated in-memory cache (D.W2 Lane D)
│   ├── migrations/
│   │   └── check.ts          # startup smoke probe — schema-invariant assertions
│   ├── cron.ts               # daily cleanup: stale sessions (30d), orphaned votes
│   └── slugWords.ts          # word lists + generateUniqueSlug
├── package.json              # hono, mongodb, node-cron, dotenv, zod
├── tsconfig.json             # strict, ES2022, Node16 modules
├── Dockerfile                # multi-stage Node 22-alpine build
├── compose.yaml              # api + mongo services, health checks
├── deploy.sh                 # rsync + docker compose up on remote
├── apache-vhost.conf         # /colors/ → localhost:3100 reverse proxy
├── .env.example              # MONGODB_URI, ADMIN_TOKEN, ALLOWED_ORIGINS, PORT
└── .dockerignore
```

## Pipeline shape

The canonical request pipeline (D-HARDEN-3 §2):

```
validate → authn → authz → service → repository → format → response
```

- **validate** — `validation/*.ts` (zod); route handlers throw `ValidationError` on parse failure.
- **authn** — `resolveSession` middleware reads `X-Session-Token` → sets `sessionToken` + `userSlug` on `c.var`.
- **authz** — `require-ownership` (palettes) / `adminAuth` (admin); both throw on failure.
- **service** — `services/{palette,admin,color,session}/*.ts`; receives `Services` from `c.var.services`.
- **repository** — `repositories/*.ts`; the ONLY layer that calls `db.collection(...)`.
- **format** — `format/palette.ts`; converts the document shape to the API envelope.
- **response** — `c.json(...)`; errors thrown anywhere upstream become canonical envelopes via the global `onError → toResponseEnvelope` mapper.

### Cross-collection transactions

Cross-collection mutations wrap in `services.withTransaction(async (session) => { ... })`. `makeWithTransaction` is the factory in `middleware/inject-services.ts`, hung off the `Services` DI object.

**Coverage history**: F-window 3 sites → G.W3 Lane E 7 sites → **H.W1 expanded to 16 sites** (the H1 invariant maximalist closure):
- F-window (3): `deleteUser`, `forkPalette`, `toggleVote`.
- G.W3 Lane E (+4 = 7): `deletePalette`, `revertToVersion`, `batchPalettes(delete)`, `batchUsers(suspend)`.
- **H.W1 Lane A (+2 = 9)**: `createPalette`, `patchPalette` (the H-AUDIT-6 §3 defect repair — orphan-version exposure class closed).
- **H.W1 Lane A.2 in-wave extension (+7 = 16)**: `registerSession`, `loginSession`, `deletePalette` (admin variant), `setUserStatus`, `deleteUserPalettes`, `pruneEmptyUsers`, `deleteTag`.

**Standing reference**: `docs/tranches/H/audit/api-withTransaction-coverage.md` — exhaustive enumeration of every cross-collection write site + its session status (WRAPPED / DEFERRED-WITH-RATIONALE / SINGLE-COLLECTION). The H1 invariant codifier — adding a new cross-collection write site WITHOUT updating this list is itself the regression the invariant guards against. See §5.2 for the reviewer's checklist + §5.4 for the rollback-test convention.

### Strictness (H.W1 Lane B — root parity)

`api/tsconfig.json` matches root strictness as of H.W1. The 4 flags lifted at H.W1 Lane B: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `isolatedModules`. 36 surfaced errors repaired genuinely (zero `@ts-ignore`, zero `as any`, zero `as unknown as` added). Incidental: a latent duplicate `PaletteColor` interface in `src/hash.ts` unified to the canonical `models.ts` source-of-truth.

## Database (MongoDB)

**9 collections, 27 indexes** (per `src/db.ts`):

| Collection | Indexes |
|------------|---------|
| `palettes` | `slug` (unique), `createdAt`, `voteCount+createdAt`, `status`, `userSlug+createdAt`, `tags`, `forkOf`, `forkCount+createdAt`, `name` (text) |
| `palette_versions` | `paletteSlug+createdAt`, `forkedFromHash`, `rootHash`, `authorSlug+createdAt` |
| `votes` | `userSlug+paletteSlug` (unique), `paletteSlug` |
| `sessions` | `lastSeenAt`, `expiresAt` |
| `proposed_names` | `name` (unique), `status`, `name+css` (text) |
| `users` | `createdAt` |
| `tags` | `name` (unique) |
| `flags` | `paletteSlug+reporterSlug` (unique), `paletteSlug`, `createdAt` |
| `admin_audit` | `timestamp`, `action+timestamp` |

## Middleware stack (order)

1. `OPTIONS *` → 204 + CORS preflight
2. CORS headers on all responses
3. Body size limit: 64 KB (`hono/body-limit`)
4. Rate limiting: 60 read/min, 10 write/min per IP (login: 5/min, registration: 3/min) — all backed by `cache/lru.ts`
5. `sanitizeBody` — reject JSON bodies containing `$`-prefixed keys (MongoDB operator injection guard)
6. `injectServices` — DI hands typed `Services` (repositories + helpers) to every handler
7. `resolveSession` — `X-Session-Token` → `sessionToken` + `userSlug` (suspended-user check, 60s LRU cache)

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

All admin actions require `Authorization: Bearer {ADMIN_TOKEN}` AND emit an `admin_audit` event via `emitAuditEvent` (befitting-graceful per D3 — audit-write failure is logged via `console.error`, not surfaced to the client; documented in `events/auditLog.ts`).

## Startup sequence

1. Validate env (`MONGODB_URI`, `ADMIN_TOKEN`, `ALLOWED_ORIGINS` in production)
2. `getDb()` — connect + create indexes (idempotent)
3. `assertMigrationsApplied(db)` — schema-invariant smoke probe (exits non-zero on violation, D.W2 Lane D F1)
4. Schedule cron cleanup (3 AM UTC daily)
5. `serve(...)` — start HTTP listener
6. Install `SIGTERM` / `SIGINT` handlers (5s grace; `.close()` → `closeDb()` → exit)

## Deployment

- **Production URL**: `https://mbabb.fi.ncsu.edu/colors/`
- **Server**: Docker Compose (api + mongo) on port 3100
- **Deploy**: `bash deploy.sh` — rsync → SSH → `docker compose up -d --build` → smoke test

# E.W2 Lane A — routes/sessions.ts + routes/colors.ts pipeline migration

**Wave**: E.W2 (api/ pipeline parity + middleware split + transactional wiring + first backend tests).
**Lane**: A — `routes/sessions.ts` + `routes/colors.ts` pipeline migration.
**Branch**: `tranche-e`; substrate HEAD `5a5b7e87`.
**Closes**: the two-speed-backend deviation D recorded (`E-AUDIT-3 §3.2 ACCEPTABLE-with-caveat`, `E-AUDIT-6 §10 top-1`, `AUD-3.1`).
**Mode**: WRITE — migrated 2 routes, authored 3 service files, extended 3 repositories, refactored 2 non-route consumers (cron + slugWords), surfaced `getServices()` for the cron handler.

## §1 — Pre-state survey

### `api/src/routes/sessions.ts` violations (123 LoC pre-migration)

- 4 `getDb()` sites: lines 16, 58, 98, 110.
- 7 `db.collection(...)` direct-call sites:
  - `users.insertOne` (l.22), `sessions.insertOne` (l.29) — register flow.
  - `users.findOne` (l.59), `sessions.insertOne` (l.74), `users.updateOne` (l.84) — login flow.
  - `sessions.deleteOne` (l.99) — revoke flow.
  - `users.findOne` (l.111) — `/me`.
- 6 `c.json({ error: ... }, n)` envelopes: lines 48, 55, 65, 96, 107, 114.
- Inline validation (l.43-49): `body.slug.trim().toLowerCase()` + length + presence — `validation/session.ts:7` zod schema (`loginBody`) authored at D.W2 Lane C #7 but never imported.
- 4 `as any` casts (lines 23, 30, 75, 85, 99, 111 — for the `_id: slug as any` workaround).

### `api/src/routes/colors.ts` violations (163 LoC pre-migration)

- 4 `getDb()` sites: lines 10, 47, 91, 135.
- 8 `db.collection(...)` direct-call sites:
  - `proposed_names.find` (l.17), `proposed_names.countDocuments` (l.23) — approved list.
  - `proposed_names.find` (text) (l.50), `proposed_names.find` (regex) (l.62) — search.
  - `tags.find` (l.92) — list tags.
  - `proposed_names.findOne` (l.136), `proposed_names.insertOne` (l.143), `proposed_names.findOne` (l.152) — propose.
- 6 `c.json({ error: ... }, n)` envelopes: lines 104, 114, 119, 126, 131, 138, 157 (7 actually — the docstring undercounts).
- Inline validation: lines 113-133 (manual `name.trim().toLowerCase()` + regex + length + type checks) — `validation/color.ts` zod schemas `proposeColorBody`, `approvedColorsQuery`, `colorSearchQuery` authored at D.W2 Lane C #7, never imported.
- 1 `as any` cast (l.55, the textScore projection — gets eliminated as part of the migration to `proposedNames.searchText`).

### `api/src/cron.ts` violations (29 LoC)

- 1 `getDb()` site (l.4).
- 4 `db.collection(...)` direct-call sites:
  - `sessions.deleteMany` (expired) — l.9-11.
  - `sessions.deleteMany` (stale, 30d) — l.14-16.
  - `palettes.distinct("slug")` — l.19-21.
  - `votes.deleteMany` (orphaned) — l.22-24.

### `api/src/slugWords.ts:95` violation

- `db.collection("users").findOne({ _id: slug as any })` inside `generateUniqueSlug(db: Db, …)`. The function takes a raw `Db` handle instead of a repository.

### Existing repositories (9, all present)

`adminAudit`, `flag`, `palette`, `paletteVersion`, `proposedName`, `session`, `tag`, `user`, `vote`. **No gap on the schema side** — sessions, users, proposed_names, and tags all already have repositories. The two-speed-backend deviation is purely a wiring gap.

### Existing typed `ApiError` subclasses (`api/src/errors/index.ts`)

- `ApiError` (base, 500-fallback).
- `ValidationError` (400 / `validation`).
- `AuthenticationError` (401 / `authentication`).
- `OwnershipError` (403 / `ownership`).
- `NotFoundError` (404 / `not_found`).
- `ConflictError` (409 / `conflict`).
- `RateLimitError` (429 / `rate_limit`).
- `ConfigurationError` (503 / `configuration`).

Plus the canonical `toResponseEnvelope(err)` mapper at the global `app.onError` boundary.

## §2 — Per-route migration diffs

### `routes/sessions.ts` (123 → 59 LoC; -52%)

**Pipeline shape**: validate (`loginBody` zod for login; the other 3 are zero-body) → authn (`resolveSession` middleware) → service (`services/session/auth.ts`) → repository (`users`, `sessions`) → response.

**Key sites**:

| Before | After |
|---|---|
| `db.collection("users").insertOne({ _id: userSlug as any, ... })` (l.22) | `users.insert({ _id: userSlug, createdAt, lastSeenAt })` |
| `db.collection("sessions").insertOne({ _id: token as any, ... })` (l.29) | `sessions.insert({ _id: token, ipHash, userSlug, ... })` |
| `db.collection("users").findOne({ _id: slug as any })` (l.59) | `users.findBySlug(slug)` |
| `db.collection("sessions").deleteOne({ _id: token as any })` (l.99) | `sessions.delete(token)` |
| `c.json({ error: "User not found" }, 404)` (l.65, 114) | `throw new NotFoundError("User not found")` |
| `c.json({ error: "Not authenticated" }, 401)` (l.96, 107) | `throw new AuthenticationError("Not authenticated")` |
| `c.json({ error: "Already logged in as this user" }, 409)` (l.55) | `throw new ConflictError("Already logged in as this user")` |
| Inline `body.slug.trim().toLowerCase()` + length-check (l.43-49) | `loginBody.safeParse(raw)` → `ValidationError("Invalid login body", ...)` on failure |

**New service files**:

- `api/src/services/session/auth.ts` (152 LoC, ≤ 250 cap). Exposes `registerSession`, `loginSession`, `revokeSession`, `getMe`. Each consumes `c.var.services.repositories` and throws typed `ApiError`s.

**New repository methods**: none — `users` + `sessions` already had every method needed (`insert`, `findBySlug`, `touchLastSeen`, `delete`).

**Preserved invariants**:

- 200ms constant-time delay on the login flow (timing-attack flatten). Documented in the service file header. The delay applies to all three login branches (already-logged-in conflict, user-not-found, success).
- 7-day session TTL (constant lifted to `SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000`).
- Slug case-folding + trimming preserved via the zod `.trim().toLowerCase()` chain (these were already in `validation/session.ts`).
- Registration returns `201` with `{ token, userSlug }` envelope (matches legacy).
- Login returns `200` with `{ token, userSlug }` (matches legacy).
- Revoke returns `200` with `{ ok: true }` (matches legacy).
- `/me` returns `200` with `{ userSlug, createdAt }` (matches legacy).

### `routes/colors.ts` (163 → 81 LoC; -50%)

**Pipeline shape**: validate (3 zod schemas) → authn (`resolveSession` middleware; only `propose` requires it) → service (`services/color/{queries,proposals}.ts`) → repository (`proposedNames`, `tags`) → response.

**Key sites**:

| Before | After |
|---|---|
| `db.collection("proposed_names").find({status:"approved"}).sort(...).skip(...).limit(...)` (l.17) | `proposedNames.findByStatus("approved", offset, limit)` |
| `db.collection("proposed_names").countDocuments({status:"approved"})` (l.23) | `proposedNames.countByStatus("approved")` |
| `db.collection("proposed_names").find({...$text...}).sort({score:{$meta:"textScore"}} as any)` (l.50-57) | `proposedNames.searchText(q, limit)` |
| `db.collection("proposed_names").find({status:"approved", $or:[regex...]})` (l.62-71) | `proposedNames.findManyByFilter({status, $or:[regex]}, 0, remaining + 5)` |
| `db.collection("tags").find().sort({name: 1})` (l.92) | `tags.findAllSorted()` |
| `db.collection("proposed_names").findOne({ name })` (l.136) | `proposedNames.findByName(input.name)` |
| `db.collection("proposed_names").insertOne(...)` (l.143) | `proposedNames.insert({ name, css, status: "proposed", ... })` |
| `db.collection("proposed_names").findOne({ _id: result.insertedId })` (l.152) | `proposedNames.findById(id)` |
| `c.json({ error: "Session token required" }, 401)` (l.104) | `throw new AuthenticationError("Session token required")` |
| `c.json({ error: "name and css required" }, 400)` (l.114) | `throw new ValidationError("Invalid color body", parsed.error.format())` |
| `c.json({ error: "A color with this name already exists" }, 409)` (l.138, 157) | `throw new ConflictError("A color with this name already exists")` |
| Inline `name.trim().toLowerCase()` + regex + length checks (l.117-133) | `proposeColorBody.safeParse(raw)` (the zod schema already had every constraint) |

**New service files**:

- `api/src/services/color/queries.ts` (141 LoC). Owns `listApprovedColors`, `searchApprovedColors`, `listColorTags`. The search service merges text-search hits + regex-fallback hits via a slug-keyed `Map` to dedup, preserving the pre-migration semantics (the regex fallback fills in remaining slots only when text-search underflows).
- `api/src/services/color/proposals.ts` (86 LoC). Owns `proposeColor` — pre-checks duplicate name + 11000-recovery on race.

**New repository methods**: none — `proposedNames` and `tags` already covered every call site (`findByStatus`, `countByStatus`, `searchText`, `findManyByFilter`, `findByName`, `findById`, `insert`, `findAllSorted`).

**Preserved invariants**:

- Empty-query short-circuit on `/colors/search` (q < 2 chars returns `{data: []}` without validation error) — preserved at the route layer (KISS short-circuit before parseValid).
- Bounded clamp `limit ∈ [1, 500]` for approved, `[1, 20]` for search.
- Returns `{ data, total, limit, offset }` envelope for approved; `{ data }` for search; raw `Tag[]` for tags; `{ id, name, css, status, contributor, createdAt, approvedAt }` for propose (matches legacy consumer expectations in `demo/@/lib/palette/api.ts:245-276`).

### `cron.ts` (29 → 34 LoC)

**Pipeline shape (non-route)**: scheduled-task → `getServices()` factory (the same lazy-cached `Services` graph `injectServices` middleware uses) → repository calls.

**Key sites**:

| Before | After |
|---|---|
| `await getDb()` → `db.collection("sessions").deleteMany({expiresAt: {$lt: now}})` | `sessions.deleteExpired(now)` |
| `db.collection("sessions").deleteMany({lastSeenAt: {$lt: thirtyDaysAgo}})` | `sessions.deleteStale(thirtyDaysAgo)` |
| `db.collection("palettes").distinct("slug")` | `palettes.listAllSlugs()` |
| `db.collection("votes").deleteMany({paletteSlug: {$nin: paletteSlugs}})` | `votes.deleteOrphaned(paletteSlugs)` |

**New service files**: none — cron is a thin orchestrator. The data-access primitives belong on the repositories.

**New repository methods**:

- `SessionRepository.deleteExpired(now: Date): Promise<number>`.
- `SessionRepository.deleteStale(threshold: Date): Promise<number>`.
- `PaletteRepository.listAllSlugs(): Promise<string[]>` (wraps `.distinct("slug")`).
- `VoteRepository.deleteOrphaned(validSlugs: string[]): Promise<number>`.

**Wiring decision**: surfaced `getServices(): Promise<Services>` on `middleware/inject-services.ts`. The middleware now reads `await getServices()` + `c.set("services", services)`; the cron handler imports `getServices` directly. Single DI graph, lazy-cached once. **Rejected alternatives**: a parallel repository factory in cron (would duplicate the construction logic + risk drift); injecting `Services` at boot from `index.ts` (would force a `(services: Services) => () => Promise<void>` wrap of the cron entry point — extra indirection for no benefit since the factory is already lazy-cached).

### `slugWords.ts:95`

**Key site**:

| Before | After |
|---|---|
| `export async function generateUniqueSlug(db: Db, ...)` + `db.collection("users").findOne({ _id: slug as any })` | `export async function generateUniqueSlug(users: Pick<UserRepository, "findBySlug">, ...)` + `await users.findBySlug(slug)` |

**Caller update**: `services/session/auth.ts:registerSession` passes `c.var.services.repositories.users` instead of the raw `Db` handle. The `Pick<>` type-narrowing means the function declares it needs *only* `findBySlug` — clean DI signal, no over-reach.

**Module imports**: `import type { Db } from "mongodb"` removed; `import type { UserRepository } from "./repositories/user.js"` added. Module is now Db-free.

## §3 — Pipeline-conformance verification

Each migrated route reads pipeline-shape **validate → authn → authz → service → repository → format → response**:

| Route | validate | authn | authz | service | repository | format | response |
|---|---|---|---|---|---|---|---|
| POST /sessions | (none — no body) | `registrationRateLimit` | (none) | `registerSession` | `users.insert`, `sessions.insert` | inline `{token, userSlug}` | `c.json(..., 201)` |
| POST /sessions/login | `loginBody.safeParse` | `loginRateLimit` | (none) | `loginSession` | `users.findBySlug`, `sessions.insert`, `users.touchLastSeen` | inline `{token, userSlug}` | `c.json(...)` |
| DELETE /sessions | (none) | `resolveSession` (global) | `AuthenticationError` if no `sessionToken` | `revokeSession` | `sessions.delete` | inline `{ok: true}` | `c.json(...)` |
| GET /sessions/me | (none) | `resolveSession` (global) | `AuthenticationError` if no `userSlug` | `getMe` | `users.findBySlug` | inline `{userSlug, createdAt}` | `c.json(...)` |
| GET /colors/approved | `approvedColorsQuery.safeParse` | (public) | (none) | `listApprovedColors` | `proposedNames.findByStatus`, `proposedNames.countByStatus` | `formatProposedName` × N | `c.json({data, total, limit, offset})` |
| GET /colors/search | `colorSearchQuery.safeParse` | (public) | (none) | `searchApprovedColors` | `proposedNames.searchText`, `proposedNames.findManyByFilter` | `formatProposedName` × N | `c.json({data})` |
| GET /colors/tags | (none) | (public) | (none) | `listColorTags` | `tags.findAllSorted` | `formatTag` × N | `c.json([...tag])` |
| POST /colors/propose | `proposeColorBody.safeParse` | `resolveSession` (global) | `AuthenticationError` if no `sessionToken` | `proposeColor` | `proposedNames.findByName`, `proposedNames.insert`, `proposedNames.findById` | inline | `c.json(..., 201)` |

**Owner-gated routes**: none in this lane. `routes/sessions.ts` + `routes/colors.ts` carry no owner-gated endpoints. The Lane C `requireOwnership` middleware-wiring lane addresses palette-owner gates separately.

## §4 — Grep verification

### `grep -rnE '\bdb\.collection\(' api/src/routes api/src/services api/src/cron.ts api/src/slugWords.ts`

```
api/src/cron.ts:4: * E.W2 Lane A — migrated from raw `db.collection(...)` calls to the
api/src/slugWords.ts:96: * never touches `db.collection(...)` directly.
```

Both surviving hits are inside JSDoc comments (lines beginning with ` *`) — narrative references to the migration, not call sites. **Code-call sites: ZERO**.

### `grep -rn 'c\.json(.*{ error:' api/src/routes`

```
(no matches)
```

**ZERO** — every error envelope routes through `throw new ApiError(...)` + the global `onError → toResponseEnvelope` mapper.

### `grep -rn 'getDb()' api/src/routes api/src/services`

```
(no matches)
```

**ZERO** in `routes/` and `services/`. The 5 surviving hits in `api/src/` are all allow-listed:
- `api/src/db.ts:24` — the definition itself + internal call at l.16.
- `api/src/middleware.ts:137` — `resolveSession` (a known-pending migration filed at `E-AUDIT-6 §2.2`; outside Lane A scope).
- `api/src/middleware/inject-services.ts:123` — the DI middleware (allow-listed; this IS the construction site).
- `api/src/index.ts:109` — startup main, before `assertMigrationsApplied`.
- `api/src/migrations/check.ts` — docstring mentions only (the function takes a `db: Db` parameter explicitly).

## §5 — Gates

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `cd api && npx tsc --noEmit` | clean | (no output) | **PASS** |
| `npx playwright test --reporter=line` | 21/21 green | 20/21; 1 flake on `reactivity-instant.spec.ts:111` (slider-keyboard 101.6ms vs ≤50ms gate); re-ran solo: 30.00ms median PASS | **PASS** (flake under contention; unrelated to api/ pipeline) |
| `grep -rnE '\bdb\.collection\(' api/src/routes api/src/services api/src/cron.ts api/src/slugWords.ts` (excluding comments) | 0 | 0 | **PASS** |
| `grep -rn 'c\.json(.*{ error:' api/src/routes` | 0 | 0 | **PASS** |
| `grep -rn 'getDb()' api/src/routes api/src/services` | 0 | 0 | **PASS** |
| `grep -n 'as any' api/src/{routes/sessions,routes/colors,cron,slugWords,services/session,services/color}` (new code) | 0 | 0 | **PASS** |
| Library `npm test` | 1582+ green | 1584/1584 | **PASS** |
| `npx vue-tsc --noEmit` count | 126 unchanged | 126 | **PASS** |

## §6 — Files modified (DO NOT commit; orchestrator stages)

**Routes** (migrated):
- `api/src/routes/sessions.ts` (123 → 59 LoC).
- `api/src/routes/colors.ts` (163 → 81 LoC).

**Non-route consumers** (migrated):
- `api/src/cron.ts` (29 → 34 LoC; routes through `getServices()` + 4 new repository methods).
- `api/src/slugWords.ts` (signature change: `Db → Pick<UserRepository, "findBySlug">`; 99 → 108 LoC including doc-comment expansion).

**Repositories** (extended):
- `api/src/repositories/session.ts` (+ `deleteExpired(now)`, `deleteStale(threshold)`).
- `api/src/repositories/palette.ts` (+ `listAllSlugs()`).
- `api/src/repositories/vote.ts` (+ `deleteOrphaned(validSlugs)`).

**Services** (new):
- `api/src/services/session/auth.ts` (152 LoC) — `registerSession`, `loginSession`, `revokeSession`, `getMe`.
- `api/src/services/color/queries.ts` (141 LoC) — `listApprovedColors`, `searchApprovedColors`, `listColorTags`.
- `api/src/services/color/proposals.ts` (86 LoC) — `proposeColor`.

**Middleware** (extended):
- `api/src/middleware/inject-services.ts` — surfaced `export async function getServices(): Promise<Services>` for non-route consumers (cron). Same lazy-cached singleton; no double-construction risk.

**Audit doc** (new):
- `docs/tranches/E/audit/E.W2-lane-a-pipeline-parity.md` (this file).

### Total new files: 3 services. Total extended repositories: 3. Total LoC delta: ~700 lines added across new services; ~150 lines removed across legacy routes (net +550 LoC, but every line is in a 60-150 LoC focused module — file-disjoint topology preserved).

## §7 — E.W2 Lane A sub-gate verdict

**PASS**.

Every Lane A gate is met:
- The two-speed-backend deviation is closed for `routes/sessions.ts` + `routes/colors.ts`. Both now run the canonical D.W2 pipeline.
- The last 4 `db.collection(...)` direct-call sites outside the allow-listed boundary (cron's expired-sessions, stale-sessions, palette-slug-distinct, orphaned-votes) are routed through repositories.
- The last `as any`-cast slug-existence check in `slugWords.ts:95` is replaced by a typed `UserRepository.findBySlug` call.
- The 4 zod schemas authored at D.W2 Lane C #7 (`loginBody`, `proposeColorBody`, `approvedColorsQuery`, `colorSearchQuery`) are now wired.
- 7 typed `ApiError` subclasses replace 12 ad-hoc `c.json({ error })` envelopes.
- TypeScript compiles clean; library + e2e suites green (modulo one known reactivity-instant flake under contention that passes solo).

E.W2 Lane B (`withTransaction`) and Lane C (`requireOwnership`) operate on disjoint surfaces (palette services + admin user-delete) and do not collide with Lane A's substrate. Lane A's `getServices()` surface is additive — Lane B can adopt the same factory for its `withTransaction` consumers if it chooses.

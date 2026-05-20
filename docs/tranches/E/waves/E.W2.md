# E.W2 — api/ pipeline parity + middleware split + transactional wiring + first backend tests

**Opens after**: E.W1 close.
**Lanes**: 6 — A (sessions.ts + colors.ts pipeline migration), B (`client.withTransaction` wiring for deleteUser + fork + vote), C (`requireOwnership` middleware wiring + sessionToken legacy excise), D (palette-manager wiring extraction), E (api/src/middleware.ts split), F (first backend tests).
**Status**: planned.

Closes the two-speed-backend deviation D recorded (per `E-AUDIT-3 §3 ACCEPTABLE-with-caveat + E-AUDIT-6 §2`). E3 invariant binding: every route obeys `validate → authn → authz → service → repository → format → response`.

## Scope

### Lane A — `routes/sessions.ts` + `routes/colors.ts` pipeline migration

Per `E-AUDIT-6 §10 top-1 + E-AUDIT-3 AUD-3.1`. The two routers carry 286 LoC of pre-D.W2 legacy:
- 15 raw `getDb()` sites (should be repository calls).
- 16 ad-hoc `c.json({ error: "string" }, n)` envelopes (should be typed `ApiError` throws + `toResponseEnvelope` mapping).
- Inline validation despite `validation/{session,color}.ts` zod schemas existing (authored at D.W2 Lane C #7 but never wired).

Plus `api/src/cron.ts` + `api/src/slugWords.ts:95` — the last `db.collection(...)` direct-call sites outside the allow-listed boundary (per `E-AUDIT-6 §3`).

**Migration shape** (per route):
1. Wire the existing zod schema from `validation/session.ts` (or `validation/color.ts`) via `c.req.parseValid(schema)`.
2. Replace `getDb()` + inline Mongo ops with `c.var.services.repositories.<X>.<method>(...)` calls.
3. Replace `c.json({ error }, n)` with `throw new ValidationError(...) | NotFoundError(...) | ConflictError(...)`.
4. Add a service layer at `api/src/services/{session,color}/<concern>.ts` if domain logic warrants (some routes are thin enough to skip the service).
5. The cron + slugWords sites — verify the `db.collection` calls can route through the existing repositories (probably YES for `slugWords`'s palette-existence check; cron is more architectural — may need a new cleanup-service).

**Sub-gate A**:
- `grep -rn 'db\.collection' api/src/routes api/src/services api/src/cron.ts api/src/slugWords.ts` returns ZERO.
- `grep -rn 'c\.json(.*{ error:' api/src/routes` returns ZERO (all errors throw typed `ApiError`).
- `grep -rn 'getDb()' api/src/routes api/src/services` returns ZERO (only `api/src/db.ts`, `api/src/middleware.ts`, and `api/src/middleware/inject-services.ts` allowed).
- All 21 smoke specs green (no e2e regression).

### Lane B — `client.withTransaction` wiring for cross-collection writes

Per `E-AUDIT-6 §2 + E-AUDIT-3 §5 + AUD-3.2`. D.W2 Lane C specced `client.withTransaction` for cross-collection writes (`deleteUser`, `fork`, `vote`); only `vote` is currently protected (via the idempotent-upsert workaround). E.W2 wires the transactional boundary properly.

**Approach**:
1. Expose `MongoClient` (or a `withTransaction` helper) on the `Services` DI object — currently `Services` only holds repositories. Add `services.client` OR `services.withTransaction: <T>(fn) => Promise<T>`.
2. In `services/admin/users.ts:deleteUser`, wrap the cascade (delete user + their palettes + their sessions + their admin_audit traces) inside `withTransaction`.
3. In `services/palette/forks.ts:fork`, wrap the (insert new palette + insert palette_version + bump fork-count) inside `withTransaction`.
4. In `services/palette/votes.ts:toggleVote`, wrap (upsertIdempotent + gated $inc) inside `withTransaction`. Retains the idempotent-upsert pattern; the transaction adds defense against partial-write race.

**Sub-gate B**:
- `grep -rn 'withTransaction' api/src/services` returns ≥ 3 (one per: deleteUser, fork, vote).
- `forkPalette` race window (`E-AUDIT-6 §3`) closed.
- All 21 smoke specs green; admin-walk spec exercises the deleteUser path successfully.

### Lane C — `requireOwnership` middleware wiring + sessionToken legacy excise

Per `E-AUDIT-6 §10 top-2 + E-AUDIT-3 §3`. D.W2 Lane C authored `middleware/require-ownership.ts` (#6 in the rails spec) but never wired any route to it. 4 duplicated owner predicates still live in services.

1. **Wire `requireOwnership`** on the relevant palette routes (`PATCH /palettes/:slug`, `DELETE /palettes/:slug`, `POST /palettes/:slug/revert`, etc.). The factory takes a `getResourceOwner(c)` that reads the palette's `userSlug`.
2. **Excise the 4 duplicated owner predicates** in services — they become unnecessary once the middleware gates the route.
3. **Sessions legacy predicate** (the `sessionToken == sessionToken` shape D recorded as gone-via-Lane-B-migration) — verify zero survival via grep.

**Sub-gate C**:
- `grep -rn 'requireOwnership' api/src/routes` returns ≥ 3 (every palette-owner-gated route uses it).
- `grep -rn 'userSlug.*===\|sessionToken.*===' api/src/services` returns ZERO (no inline owner predicates).
- `OwnershipError` thrown via middleware (verifiable in integration test).

### Lane D — palette-manager wiring extraction (demo)

Per `E-AUDIT-5 §9 item 14 + AUD-5.14`. `usePaletteManager.ts` has bloated to 314 LoC (memory recorded 257 — re-bloat post-D.W3 Lane B). The watcher-zoo should lift to `usePaletteManagerWiring.ts` (the file already exists per `demo/CLAUDE.md`). Restores the facade's cohesion + drops the manager LoC count.

1. Move cross-module watchers from `usePaletteManager.ts` → `usePaletteManagerWiring.ts`.
2. The facade re-exports the sub-objects; wiring is implementation detail.
3. Document the split in `demo/CLAUDE.md`'s composables table.

**Sub-gate D**:
- `wc -l demo/@/composables/palette/usePaletteManager.ts` ≤ 250 (was 314).
- `wc -l demo/@/composables/palette/usePaletteManagerWiring.ts` ≤ 250.
- The smoke walk + admin-walk + palette-flow specs green.

### Lane E — `api/src/middleware.ts` split

Per `E-AUDIT-6 §10 top-4 + AUD-6.4`. `api/src/middleware.ts` (279 LoC) holds CORS + rateLimit + resolveSession + adminAuth + sanitizeBody + IP hashing — a god module relative to the `middleware/inject-services.ts` + `middleware/require-ownership.ts` directory pattern D established.

Target structure:
```
api/src/middleware/
├── inject-services.ts    (D.W2 Lane C)
├── require-ownership.ts  (D.W2 Lane C)
├── cors.ts               (NEW — extracted)
├── rate-limit.ts         (NEW — extracted; consumes cache/lru.ts)
├── resolve-session.ts    (NEW — extracted)
├── admin-auth.ts         (NEW — extracted)
├── sanitize-body.ts      (NEW — extracted)
└── ip.ts                 (NEW — IP resolution + hashing helpers)
```

Plus consolidate the 3 duplicated rate-limit pre-check blocks (`E-AUDIT-6 §3`).

**Sub-gate E**:
- `wc -l api/src/middleware.ts` returns "No such file" OR ≤ 30 LoC (a re-export aggregator for source-compat — preferred is delete entirely).
- Every middleware/*.ts ≤ 100 LoC.
- 3 rate-limit pre-check blocks consolidated to a single helper.

### Lane F — First backend tests (vitest + MongoDB Memory Server)

Per `E-AUDIT-6 §2 + AUD-6.8`. Zero backend tests exist at master HEAD. E adds the first integration-test suite using `mongodb-memory-server` (ephemeral MongoDB instance) + vitest. Per-route smoke shape:

- For each repository: ≥ 3 tests covering insert + findBy + update.
- For each service: ≥ 2 tests covering the happy path + a typed-error path.
- For the canonical envelope (`toResponseEnvelope`): ≥ 1 test per ApiError subclass shape.
- Total: aim for ~50-80 tests (the api/ has 13 routers; ~5 tests per concern).

**Sub-gate F**:
- `api/test/` directory exists with ≥ 50 tests.
- `cd api && npx vitest run` — green.
- `mongodb-memory-server` added as devDependency.
- CI workflow's test step runs `cd api && npx vitest run` (E.W4 wires CI; E.W2 just lands the suite).

## File bounds

| Lane | Files |
|---|---|
| A | `api/src/routes/sessions.ts` (migrate), `api/src/routes/colors.ts` (migrate), `api/src/services/{session,color}/` (new, where domain logic warrants), `api/src/cron.ts` (route through repos), `api/src/slugWords.ts` (route through repos), `docs/tranches/E/audit/E.W2-pipeline-parity.md` (new) |
| B | `api/src/middleware/inject-services.ts` (expose withTransaction OR client), `api/src/services/admin/users.ts` (wrap deleteUser), `api/src/services/palette/forks.ts` (wrap fork), `api/src/services/palette/votes.ts` (wrap vote), `docs/tranches/E/audit/E.W2-transactional.md` (new) |
| C | `api/src/routes/palettes/{crud,votes,flags,versions,forks}.ts` (wire requireOwnership), `api/src/services/palette/*.ts` (excise duplicated owner predicates), `docs/tranches/E/audit/E.W2-ownership.md` (new) |
| D | `demo/@/composables/palette/usePaletteManager.ts` (slim), `demo/@/composables/palette/usePaletteManagerWiring.ts` (absorb watchers), `demo/CLAUDE.md` (composables table refresh), `docs/tranches/E/audit/E.W2-facade-wiring.md` (new) |
| E | `api/src/middleware/` (new subdir + 6 new files), `api/src/middleware.ts` (delete or shrink), all `api/src/{index.ts, routes/**, services/**}` consumer-import updates, `docs/tranches/E/audit/E.W2-middleware-split.md` (new) |
| F | `api/test/` (new — ≥ 50 tests), `api/package.json` (add mongodb-memory-server devDep), `api/vitest.config.ts` (new if not present), `docs/tranches/E/audit/E.W2-backend-tests.md` (new) |

## Gate

The conjunction of sub-gates A + B + C + D + E + F. Wave-level:
- `cd api && npx tsc --noEmit` clean.
- `cd api && npx vitest run` ≥ 50 backend tests green.
- `grep -rn 'db\.collection' api/src/routes api/src/services api/src/cron.ts api/src/slugWords.ts` returns ZERO.
- `grep -rn 'c\.json(.*{ error:' api/src/routes` returns ZERO.
- The 21 smoke specs green (no regression).
- `vue-tsc` 126 unchanged.
- `vitest` (library) 1582+ unchanged.

## Verification artefacts

6 per-lane audit docs + the new `api/test/` directory + the CI verification at E.W4.

## Commit plan

- `refactor(api/w2): migrate routes/sessions.ts + routes/colors.ts to the D.W2 pipeline (closes two-speed-backend deviation)` — Lane A.
- `feat(api/w2): wire client.withTransaction for deleteUser + fork + vote cross-collection writes` — Lane B.
- `refactor(api/w2): wire requireOwnership middleware + excise 4 duplicated owner predicates` — Lane C.
- `refactor(demo/w2): lift palette-manager cross-module watchers to usePaletteManagerWiring (slim facade to ≤ 250 LoC)` — Lane D.
- `refactor(api/w2): split api/src/middleware.ts into middleware/{cors,rate-limit,resolve-session,admin-auth,sanitize-body,ip}.ts` — Lane E.
- `test(api/w2): first backend integration tests via vitest + mongodb-memory-server (≥ 50 tests)` — Lane F.

## Dependencies

- Depends on: E.W1 close.
- Blocks: E.W3 (e2e expansion is more sound after the api/ pipeline parity).

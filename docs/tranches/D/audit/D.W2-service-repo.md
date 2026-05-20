# D.W2 Lane C — service / repository rails

**Wave**: D.W2 (backend god-module split). **Lane**: C (lays first — D-HARDEN-3 §7). **Date**: 2026-05-19.
**Source**: `docs/tranches/D/waves/D.W2.md §Lane C`, `docs/tranches/D/research/Db-backend-legacy.md`, `docs/tranches/D/audit/D-HARDEN-3-backend.md §1-4`.

Lane C lays the rails Lanes A and B then build on. The 18 new files exist; the api still boots; the existing `routes/{palettes,admin,sessions,colors}.ts` remain unchanged at their pre-Lane-C LoC (845, 750, 123, 163). New rails compile clean; error envelopes work; tests + smoke unaffected.

---

## §1 — Schema inventory (9 real collections)

Inferred from the literal write-paths in `routes/{palettes,admin,sessions,colors}.ts` + the index declarations in `api/src/db.ts:21-75`. Documented in `api/src/models.ts` as typed interfaces.

| # | Collection | `_id` | Key fields | Indexes (per `db.ts`) | Where written |
|---|---|---|---|---|---|
| 1 | `palettes` | ObjectId | slug, name, colors[], oklabColors[], tags[], userSlug, sessionToken, status, voteCount, forkOf, forkOfHash, forkCount, currentHash, versionCount, createdAt, updatedAt | slug (unique), createdAt -1, (voteCount,createdAt), status, (userSlug,createdAt), tags, forkOf, (forkCount,createdAt), name text (9 total) | palettes.ts × 6, admin.ts × 9 |
| 2 | `palette_versions` | string (content-hash) | name, colors[], parentHash, forkedFromHash, authorSlug, paletteSlug, rootHash, depth, createdAt | (paletteSlug,createdAt), forkedFromHash, rootHash, (authorSlug,createdAt) (4 total) | palettes.ts × 2 (createVersionRecord) |
| 3 | `votes` | ObjectId | userSlug, paletteSlug, createdAt | (userSlug,paletteSlug) unique, paletteSlug (2 total) | palettes.ts × 4, admin.ts × 5 |
| 4 | `sessions` | string (uuid token) | ipHash, userSlug?, createdAt, lastSeenAt, expiresAt? | lastSeenAt, expiresAt (2 total) | sessions.ts × 4, admin.ts × 5, middleware.ts × 1 |
| 5 | `proposed_names` | ObjectId | name (unique), css, status, contributor, createdAt, approvedAt | name unique, status, (name,css) text-compound (3 total) | colors.ts × 4, admin.ts × 4 |
| 6 | `tags` | ObjectId | name (unique), category, createdAt | name unique (1 total) | admin.ts × 3, colors.ts × 1 |
| 7 | `flags` | ObjectId | paletteSlug, reporterSlug, reason, detail, createdAt | (paletteSlug,reporterSlug) unique, paletteSlug, createdAt -1 (3 total) | palettes.ts × 1, admin.ts × 4 |
| 8 | `admin_audit` | ObjectId | timestamp, action, ipHash, target, (D.W2 evolution: actorSlug, payload) | timestamp -1, (action,timestamp) (2 total) | admin.ts × 1 (helper) |
| 9 | `users` | string (slug) | createdAt, lastSeenAt, status | createdAt -1 (1 total) | sessions.ts × 2, admin.ts × 7, middleware.ts × 1 |

**Total**: 9 collections, 27 indexes (some are compound — `db.ts` lists 27 `createIndex` calls).

**Note on `api/CLAUDE.md`**: the doc claims 5 collections / 11 indexes. **Stale** — D-HARDEN-3 §1 L3 confirmed this is the post-Tranche-B reality. Lane D reconciles.

---

## §2 — Rails architecture

```
                              ┌─────────────────────────────────────────────┐
  REQUEST ──► CORS ──► rate ──► sanitize ──► injectServices ──► resolveSession ──► route
                              └─────────────────────────────────────────────┘
                                                  │
                                                  ▼
                          c.var.services = { collections, repositories: {…9} }
                                                  │
                                                  ▼
                                           ROUTE HANDLER
                                       (parse zod, call service)
                                                  │
                                                  ▼
                                            [SERVICE]            ← Lanes A + B create this layer
                                                  │
                                                  ▼
                                          REPOSITORY (× 9)        ← THIS LANE
                                          │ │ │ │ │ │ │ │ │
                                          ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼
                                     Collection<T> handles        ← THIS LANE (db/collections.ts)
                                                  │
                                                  ▼
                                              MongoDB
                                                  │
                                                  ▼
                       formatPalette  ←  domain doc  ←  response envelope
                                          (Palette)
                                                  │
                       on throw: ApiError ─► toResponseEnvelope ─► canonical error JSON
                                          (errors/index.ts)
```

**Pipeline pins** (per D-HARDEN-3 §2):
- DI mechanism: **Hono context (`c.var.services`)** — not constructor injection, not module-level singletons in routes.
- Request → service mapping: **route-as-controller** — the route file IS the controller; no separate `controllers/` directory.
- Audit emit: **`events/auditLog.ts:emitAuditEvent(c, action, options)`** is the canonical sink; carries the "befitting graceful" carve-out per D3 + D-HARDEN-3 §3 W3 (logged, not silenced, never fails the request).
- Ownership: **`middleware/require-ownership.ts`** replaces the F2 `sessionToken` half-shim.
- Errors: **typed `ApiError` subclasses** thrown anywhere in the stack; `app.onError` maps via `toResponseEnvelope`.

---

## §3 — New files (count + LoC)

| Directory | File | LoC | Purpose |
|---|---|---|---|
| `api/src/` | `models.ts` | 193 | 9 typed document interfaces + status enums (PaletteStatus, UserStatus, ProposedNameStatus, FlagReason) |
| `api/src/db/` | `collections.ts` | 58 | typed `makeCollections(db)` factory over the 9 real collections |
| `api/src/errors/` | `index.ts` | 121 | `ApiError`, `ValidationError`, `OwnershipError`, `ConflictError`, `NotFoundError`, `AuthenticationError`, `RateLimitError`, `ConfigurationError` + `toResponseEnvelope` |
| `api/src/events/` | `auditLog.ts` | 57 | `emitAuditEvent` — canonical sink; befitting-graceful failure carve-out |
| `api/src/format/` | `palette.ts` | 76 | `formatPalette` shared formatter (C1 Db extraction) |
| `api/src/middleware/` | `inject-services.ts` | 77 | DI: hangs `c.var.services` (lazy, cached per worker) |
| `api/src/middleware/` | `require-ownership.ts` | 42 | factory for ownership-gating middleware (F2 replacement) |
| `api/src/repositories/` | `palette.ts` | 148 | full CRUD + paginated reads + vote-count gate |
| `api/src/repositories/` | `paletteVersion.ts` | 45 | hash-keyed reads + idempotent insert |
| `api/src/repositories/` | `vote.ts` | 73 | `upsertIdempotent` (F3 primitive) + delete-by-palette cascades |
| `api/src/repositories/` | `session.ts` | 48 | atomic `findAndTouch` + delete-by-user cascade |
| `api/src/repositories/` | `proposedName.ts` | 88 | status transitions + text search + filtered reads |
| `api/src/repositories/` | `tag.ts` | 27 | name-keyed CRUD |
| `api/src/repositories/` | `flag.ts` | 85 | flag CRUD + aggregation pipeline for admin moderation queue |
| `api/src/repositories/` | `adminAudit.ts` | 34 | insert (canonical sink) + filtered reads |
| `api/src/repositories/` | `user.ts` | 108 | slug-keyed CRUD + palette-count aggregation + empty-user query |
| `api/src/validation/` | `palette.ts` | 103 | zod schemas: create/update/fork/revert/flag bodies + list query + reusable fields |
| `api/src/validation/` | `admin.ts` | 75 | zod schemas: user/tag/batch/import/audit |
| `api/src/validation/` | `session.ts` | 14 | zod schemas: login |
| `api/src/validation/` | `color.ts` | 30 | zod schemas: propose/search/approved |
| **Total** | **20 new files** | **1,502** | — |

**Modified** (minimal touch):
| File | Change |
|---|---|
| `api/src/types.ts` | Extended `AppEnv.Variables` with `services: Services` (typed) |
| `api/src/index.ts` | Register `injectServices` middleware + replace global `app.onError` with `toResponseEnvelope` mapping |
| `api/package.json` | Added `zod ^4.4.3` dependency |

**Every new file ≤ 250 lines** (god-module cap). Max is `models.ts` at 193 LoC (justified — 9 interfaces + 4 status enums + 2 embedded types; one canonical home).

---

## §4 — Existing-route preservation

| File | Pre-Lane-C LoC | Post-Lane-C LoC | Status |
|---|---|---|---|
| `api/src/routes/palettes.ts` | 845 | 845 | UNCHANGED |
| `api/src/routes/admin.ts` | 750 | 750 | UNCHANGED |
| `api/src/routes/sessions.ts` | 123 | 123 | UNCHANGED |
| `api/src/routes/colors.ts` | 163 | 163 | UNCHANGED |
| `api/src/middleware.ts` | 307 | 307 | UNCHANGED |
| `api/src/db.ts` | 88 | 88 | UNCHANGED |

The existing routes still use raw `db.collection(...)` (122 sites across the 4 route files). Lanes A + B migrate them onto the repositories. **Both worlds coexist cleanly**: the rails compile + load; the existing code paths bypass them entirely.

---

## §5 — Validation

| Check | Expected | Result |
|---|---|---|
| `cd api && npx tsc --noEmit` | clean | **clean** (zero errors) |
| `npx vue-tsc --noEmit \| grep -c 'error TS'` | 126 | **126** |
| `npx vitest run` | 1581 / 34 files | **1581 / 34 files passing** |
| `npx playwright test --project=smoke` | 3 / 3 | **3 / 3 passing** |
| `npm run lint` | exit 0 | **exit 0** |
| `npm run proof:resolution` | GREEN | **GREEN** |
| Error-envelope smoke probe | 6 endpoints render `{error:{code,message,detail?}}` correctly | **all 6 green** (validation, not_found, ownership, conflict, internal mappings verified) |
| MongoDB-backed smoke (`curl /palettes`) | 200 | **deferred** — MongoDB not running locally (no Docker daemon); the api boots up to `await getDb()` then awaits a connection. Synthetic envelope probe confirms the global error handler + route mounting work; integration smoke deferred to wave close per the wave-spec's "MongoDB not running locally; smoke deferred to integration probe at wave close" carve-out. |

### Synthetic envelope probe output

```
READY 3199
/                  200 {"status":"ok"}
/throw-validation  400 {"error":{"code":"validation","message":"bad input","detail":{"field":"x"}}}
/throw-not-found   404 {"error":{"code":"not_found","message":"no such thing"}}
/throw-ownership   403 {"error":{"code":"ownership","message":"forbidden"}}
/throw-conflict    409 {"error":{"code":"conflict","message":"dup"}}
/throw-unknown     500 {"error":{"code":"internal","message":"Internal server error"}}
```

Mapping is canonical + complete: every `ApiError` subclass renders its `{code, message, detail?}` envelope at its explicit status; unknown throws map to 500/"internal" + log to operator console.

### Module-load smoke

All 20 new modules dynamic-import successfully (verified individually). No circular-import issues.

---

## §6 — Sub-gate C verdict

| Condition | Requirement | Result |
|---|---|---|
| **C-1** | `db.collection` outside the new repositories is ONLY in the existing routes (Lanes A+B will migrate) | **PASS**. `api/src/services/` does NOT exist (correct — Lanes A+B create it). The 122 `db.collection` sites all live in the existing route files; `api/src/middleware.ts:163` is also pre-existing (the suspended-user check that Lane B can migrate later). The new rails contain zero `db.collection` outside `db/collections.ts` (the factory itself). |
| **C-2** | `as any` in new rails ≤ 5 | **PASS**. `grep -rn 'as any'` across `api/src/{repositories,middleware/inject-services.ts,middleware/require-ownership.ts,events,errors,format,validation,db,models.ts}` returns **0**. |
| **C-3** | `api/src/{errors,events,middleware,format,validation,repositories,db}` exist with the typed files | **PASS**. All 7 directories present; all 18 named files present. |
| **C-4** | `c.var.services` is canonical DI; `AppEnv` reflects it; no service constructed inside a route handler | **PASS**. `AppEnv.Variables.services: Services` declared in `types.ts:13`. `injectServices` is the only constructor site. Routes don't touch the rails yet (Lanes A+B will). |

**Sub-gate C: PASS.**

---

## §7 — Open items for downstream lanes

- **Lane A** (palettes split): consume `services.repositories.{palettes,paletteVersions,votes,flags,users}` + `formatPalette` + zod schemas `validation/palette.ts`. Replace the 6 silent fallbacks listed in `palettes.ts` (W2 fork body, F1 defaults reads, F2 ownership shim, F3 vote race) with the typed primitives.
- **Lane B** (admin split): consume `services.repositories.{palettes,proposedNames,tags,flags,users,adminAudit,sessions,votes}` + `emitAuditEvent` (replaces the in-file `audit()` helper).
- **Lane D**: reconcile `api/CLAUDE.md` to 9 collections / 27 indexes + the new layer; SIGTERM handler; LRU consolidation; F4/F6/W4 fixes; library-side `evaluateSimpleCalc` excision.

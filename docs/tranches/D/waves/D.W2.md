# D.W2 — Backend (`api/`) — god module split + service/repo + fail-explicit

**Opens after**: D.W1 close.
**Lanes**: 4 — A (palettes.ts split), B (admin.ts split), C (service/repository layer + zod pipeline), D (legacy excision + doc reconcile). Lanes A and B share the route-file domain; C and D are file-disjoint and run in parallel after A/B land their splits. Worktree isolation for A and B (they share `api/src/routes/` namespace).
**Status**: planned.

The heaviest wave of tranche D. Source: `research/Db-backend-legacy.md` (read it first).

## Scope

The `api/` codebase (13 files / 2,800 LoC) carries 2 god modules (`palettes.ts` 845 lines / 6 concerns; `admin.ts` 750 lines / 8 concerns), no service or repository layer (157 direct `db.collection(…)` calls + 123 inline Mongo ops in route handlers), 31 `as any` casts, 6 silent-fallback sites, and `api/dist/` checked-in build artefacts. The directive's binding rule: **fail-explicit, no silent / graceful handling unless befitting.** Invariant D3.

### Lane A — `routes/palettes.ts` split (845 → ≤ 250 per file)

`research/Db-backend-legacy.md §1` breaks down palettes.ts into 6 concerns. Split per-concern into a routes file + a service file. Sketched split:

- `routes/palettes/index.ts` — the Hono router; mounts the sub-routes.
- `routes/palettes/{crud,versions,forks,votes,export,slug}.ts` — one routes file per concern. Routes are thin: validate (zod) → service call → response shape.
- `services/palette/{crud,versions,forks,votes,export,slug}.ts` — services own the domain logic.

Every route handler MUST go through a repository (Lane C); zero direct `db.collection(…)` survives. The 6 concern splits each become a routes/service pair.

**Sub-gate A**: `wc -l api/src/routes/palettes/**/*.ts` shows every file ≤ 250; `palettes.ts` (the original) deleted; `routes/palettes/index.ts` is the new entry; every concern has a service + a routes file.

### Lane B — `routes/admin.ts` split (750 → ≤ 250 per file)

Same pattern as Lane A. 8 concerns → 8 routes/service pairs under `routes/admin/`. The `admin-audit` route in particular should NOT silently catch write failures (Lane D's F-finding W3 fixes this).

**Sub-gate B**: `wc -l api/src/routes/admin/**/*.ts` ≤ 250 each; `admin.ts` deleted; service + repository wiring complete.

### Lane C — service + repository layer + zod validation pipeline

`research/Db-backend-legacy.md §3` names the verdict as "flat tangle" (verdict D). Introduce:

1. `api/src/db/collections.ts` — a typed `collections{}` factory: `{ palettes: Collection<Palette>, users: Collection<User>, … }` for every one of the 9 actual collections (per the reconciled `api/CLAUDE.md` in Lane D). This is the type-safe entry; route handlers never use raw `db.collection(…)`.
2. `api/src/repositories/{palette,user,palette_versions,tags,flags,admin_audit,sessions,color_names,color_proposals}.ts` — one repository per collection. Repositories own all queries, projections, and write operations. Every public method has a typed signature; no `as any`.
3. `api/src/services/**` — already created in Lanes A and B (the per-concern services). This lane verifies they call only repositories, never `db.collection(…)`.
4. `api/src/validation/` — zod schemas for every request body / params / query. Routes call `c.req.parseValid(schema)` (or equivalent Hono+zod helper). On validation failure: explicit 400 with the zod issue map.
5. Standard pipeline: `validate → authn (middleware) → authz (service-level) → service → repository → response shape`. Every route follows this; record any deviation with a rationale comment.

**Sub-gate C**: `grep -rn 'db\.collection' api/src/routes api/src/services` returns zero (only `api/src/repositories` may use it); `grep -rn 'as any' api/src/` returns zero (or each remaining ≤ 5 with a rationale comment); every route handler in the post-split tree calls a service, every service calls a repository.

### Lane D — legacy excision + doc reconcile

`research/Db-backend-legacy.md §2 / §6 / §4` items:

1. **Excise the 6 silent fallbacks** (F1–F3 / W2–W4):
   - F1 `formatPalette` pre-migration defaults — the migration is done; defaults excised; missing fields are explicit errors (or the schema asserts non-null).
   - F2 `sessionToken` ownership shim — remove; ownership is determined by the explicit owner field, not a token shim.
   - F3 vote-toggle race swallow — replace with an optimistic-write + explicit conflict error.
   - W2 JSON-parse-to-empty-body — fail-explicit (400 invalid body).
   - W3 audit-write silent catch — audit writes are NOT best-effort; if they fail, the request fails (or the audit failure is logged with structured context AND the rationale is recorded inline).
   - W4 `cssToOklab` returns-null-then-drop — fail-explicit at the validation boundary.
2. **Delete `api/dist/`** from the repo tree + add to `.gitignore` (verify it's not committed).
3. **Delete `api/src/migrate-{oklab,slugs}.ts`** — one-shot scripts; the migrations are done. Invariant-33 corpus grep: zero references in the running code.
4. **Reconcile `api/CLAUDE.md`**: B-vintage says 5 collections / 11 indexes; reality is 9 collections / 24 indexes (`palette_versions`, `tags`, `flags`, `admin_audit` added since). Re-write the structure section.

**Sub-gate D**: `grep -rn '?? null\|console\.warn\b' api/src/routes api/src/services` returns only documented-rationale sites; `api/dist/` absent from `git ls-files`; `migrate-*.ts` absent; `api/CLAUDE.md` reflects 9 collections / 24 indexes.

## File bounds

| Lane | Files |
|---|---|
| A | `api/src/routes/palettes.ts` (delete), `api/src/routes/palettes/**` (new), `api/src/services/palette/**` (new — partial; full wiring after Lane C) |
| B | `api/src/routes/admin.ts` (delete), `api/src/routes/admin/**` (new), `api/src/services/admin/**` (new) |
| C | `api/src/db/collections.ts` (new), `api/src/repositories/**` (new), `api/src/validation/**` (new), every route handler in Lanes A and B (verification only — they must call services + repositories) |
| D | The 6 fail-explicit sites (per-file: `services/**`, `repositories/**`, `validation/**` once Lane C lands them), `api/dist/` (delete from index), `api/.gitignore`, `api/src/migrate-{oklab,slugs}.ts` (delete), `api/CLAUDE.md` |

## Gate

The conjunction of sub-gates A–D + a backend integration probe: spin up the api (Docker-compose if needed; per `api/CLAUDE.md`'s deployment), curl each route's smoke endpoint, assert the explicit error shapes on the 6 ex-silent paths. `vitest` 1409 unchanged (no library regression). `npm run build` (library) clean. `vue-tsc` 126 unchanged (this is api/ work; demo unaffected). If there are api-side type-tests, they pass.

## Verification artefacts

`audit/D.W2-palettes-split.md` (Lane A — per-file LoC before/after, concern map), `audit/D.W2-admin-split.md` (Lane B — same), `audit/D.W2-service-repo.md` (Lane C — the layer architecture diagram, repository per-collection check), `audit/D.W2-legacy-excision.md` (Lane D — the 6 fail-explicit sites with before/after, the dist/migrate retirement proof, the CLAUDE.md reconcile).

## Commit plan

- `refactor(api/w2): split palettes.ts (845 lines) per-concern — 6 routes/services + repository wiring` — Lane A.
- `refactor(api/w2): split admin.ts (750 lines) per-concern — 8 routes/services + repository wiring` — Lane B.
- `feat(api/w2): introduce service + repository layer + zod validation pipeline` — Lane C.
- `chore(api/w2): excise legacy + fail-explicit on silent fallbacks + retire api/dist + reconcile CLAUDE.md` — Lane D.

## Dependencies

- Depends on: D.W1 (contract-v2; the dev consumer config is now contract-v2 compliant, so api/ consumers don't trip the new gate).
- Blocks: D.W3 (frontend; only soft — backend changes don't affect demo files, but the gate-isolation discipline is cleaner sequenced).

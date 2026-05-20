# D.W2 — Backend (`api/`) — god module split + service/repo + fail-explicit

**Opens after**: D.W1 close. **May run in parallel with D.W3** (file- and gate-disjoint per D-HARDEN-1).
**Lanes**: 4 — sequenced **C → (A ∥ B) → D** (corrected by D-HARDEN-3: A/B writing services BEFORE C's repositories exist would re-introduce direct `db.collection(…)` calls). C lands the layer; A and B then split the god modules onto it; D excises legacy and reconciles docs.
**Worktree isolation**: A and B share `api/src/routes/` namespace, dispatched with `isolation: "worktree"`.
**Status**: planned.

The heaviest wave of tranche D. Source: `research/Db-backend-legacy.md`; hardening corrections from `audit/D-HARDEN-3-backend.md`.

## Scope

`api/` is 13 files / 2,800 LoC with 2 god modules (`palettes.ts` 845 / 6 concerns; `admin.ts` 750 / 8 concerns), no service or repository layer (157 direct `db.collection(…)` + 123 inline Mongo ops in route handlers), 31 `as any` casts, 6 silent-fallback sites, and 2 dead migration scripts. The directive's binding rule: **fail-explicit, no silent / graceful handling unless befitting** (invariant D3).

**Db research correction** (per D-HARDEN-3 §3): `api/dist/` is NOT checked in — root `.gitignore:11` already excludes `dist/` and `git ls-files api/dist/` returns zero. Db §6 L2 is wrong on that point; the dist concern is local-cleanup only, not invariant-33 git-removal.

### Lane C — service + repository layer + DI middleware + zod pipeline + errors/events (lands FIRST)

`research/Db-backend-legacy.md §3` named the verdict as "flat tangle" (verdict D). C lays the rails Lanes A and B then build on. Per D-HARDEN-3:

1. **`api/src/db/collections.ts`** — a typed `collections{}` factory over the **real 9 collections** (per `api/src/db.ts:21-150`): `palettes`, `palette_versions`, `votes`, `sessions`, `proposed_names`, `tags`, `flags`, `admin_audit`, `users`. The factory: `{ palettes: Collection<Palette>, users: Collection<User>, … }`. Route handlers never use raw `db.collection(…)`. (The earlier draft hallucinated `color_names`+`color_proposals` and omitted `votes`; corrected.)

2. **`api/src/repositories/{palette,paletteVersion,vote,session,proposedName,tag,flag,adminAudit,user}.ts`** — one repository per collection (singular naming). Each owns all queries, projections, and write ops for its collection. Every public method has a typed signature; zero `as any` (or each remaining ≤ 5 with inline rationale).

3. **`api/src/errors/index.ts`** (new — D-HARDEN-3 §4) — typed error classes + a `toResponse(err)` mapper for Hono. `class ApiError extends Error { constructor(public status: number, public code: string, public message: string, public detail?: unknown) }` + `class ValidationError extends ApiError` + `class OwnershipError extends ApiError` + `class ConflictError extends ApiError`. The mapper renders an explicit `{ error: { code, message, detail? } }` envelope. Every fail-explicit path throws a typed error; the global error middleware maps it.

4. **`api/src/events/auditLog.ts`** (new — D-HARDEN-3 §4) — `emitAuditEvent(ctx, action, payload)`. The single canonical entry-point for admin-audit writes; carries the explicit-rationale logic for W3 (see Lane D F-revisions below).

5. **`api/src/middleware/inject-services.ts`** (new — D-HARDEN-3 §2 DI pin) — Hono context middleware that hangs a typed `services` object off `c.var`. Routes read `const { palettes } = c.var.services`. **DI is via Hono context, not constructor injection or module-level singletons.** The middleware constructs services once per worker (lazy), passes the repositories in.

6. **`api/src/middleware/require-ownership.ts`** (new — D-HARDEN-3 §4 F2 replacement) — replaces the F2 `sessionToken` ownership shim. The middleware reads the authenticated user from `c.var.user` (set by `authn`) and the resource owner from the route; throws `OwnershipError` if mismatched.

7. **`api/src/validation/`** — zod schemas for every request body / params / query. Routes call `c.req.parseValid(schema)` (or equivalent Hono+zod helper). On validation failure: explicit 400 via the `ValidationError` typed throw — the zod issue map travels as `detail`.

8. **`api/src/format/palette.ts`** (new — D-HARDEN-3 §4) — the shared `formatPalette` (C1 Db finding) lifts here, callable from any service.

9. **Pipeline shape** (pinned per D-HARDEN-3 §2):
   ```
   request → validate (zod via parseValid) → authn (middleware) → authz (require-ownership middleware OR service-level)
           → service (consumes c.var.services) → repository (the ONLY db.collection consumer)
           → format/<shape> → response (or typed-error throw → toResponse)
   ```
   The route file IS the controller (`route-as-controller` pin). No separate controller layer.

10. **Transactional boundary** (pinned per D-HARDEN-3 §2) — for cross-collection writes, services use `client.withTransaction`. Specifically required for: `deleteUser` (users + palettes + sessions + admin_audit), `fork` (palettes + palette_versions), `vote` (votes + palettes — gated `$inc` on the count).

**Sub-gate C** (4 numbered conditions):
- C-1: `grep -rn 'db\.collection' api/src/routes api/src/services` returns zero (repositories only).
- C-2: `grep -rn 'as any' api/src/` returns ≤ 5; each remaining annotated with a rationale comment.
- C-3: `api/src/{errors,events,middleware,format,validation,repositories,db,services}/` exist with the typed files named above.
- C-4: `c.var.services` is the canonical DI entry; no service is constructed inside a route handler.

### Lane A — `routes/palettes.ts` split (845 → ≤ 250 per file) — runs after Lane C

`research/Db-backend-legacy.md §1` breaks palettes.ts into 6 concerns:
- `routes/palettes/index.ts` — the Hono router; mounts the sub-routes; binds the `inject-services` + `authn` middleware.
- `routes/palettes/{crud,versions,forks,votes,export,slug}.ts` — one route file per concern. Each route is thin: `parseValid → service call → format → respond`.
- `services/palette/{crud,versions,forks,votes,export,slug}.ts` — services own the domain logic; consume repositories via `c.var.services` (or take them as a typed argument from the route).

Every route handler MUST go through a repository (Lane C exists by now). Zero direct `db.collection(…)` survives.

**Sub-gate A**: `wc -l api/src/routes/palettes/**/*.ts` every file ≤ 250; the original `palettes.ts` deleted; `routes/palettes/index.ts` mounts everything; every concern has a service + a route file.

### Lane B — `routes/admin.ts` split (750 → ≤ 250 per file) — runs after Lane C

Same pattern as Lane A. 8 concerns → 8 route/service pairs under `routes/admin/`. The `admin-audit` route consumes `events/auditLog.ts` (the single canonical audit emit).

**Sub-gate B**: `wc -l api/src/routes/admin/**/*.ts` ≤ 250 each; `admin.ts` deleted; service + repository wiring complete.

### Lane D — legacy excision + fail-explicit + doc reconcile

`research/Db-backend-legacy.md §2 / §6 / §4` + D-HARDEN-3 §5 revisions:

1. **Excise the 6 silent fallbacks** (revised dispositions per D-HARDEN-3 §3):
   - **F1** `formatPalette` pre-migration defaults — the migrations are done; defaults excised. **D-HARDEN-3 amendment**: add a migration smoke probe (an `api/src/migrations/check.ts` startup-time sanity check that asserts the schema invariants the defaults used to mask; logs + exits non-zero on violation).
   - **F2** `sessionToken` ownership shim — replaced by `middleware/require-ownership.ts` (Lane C item 6); the shim deletes.
   - **F3** vote-toggle race swallow — **D-HARDEN-3 correction**: NOT the earlier "optimistic-write + 409" framing (which breaks toggle semantics — a 409 on a legitimate retoggle is wrong). Replace with an **idempotent upsert + gated `$inc`**: the `votes` collection has a unique `(userSlug, paletteSlug)` index already; `upsert` the vote document, then `$inc` the palette `voteCount` only when the upsert was a true insert (use `result.upsertedId`); inside `withTransaction` (Lane C item 10) for atomicity.
   - **W2** JSON-parse-to-empty-body — fail-explicit via `ValidationError` (400 with the parse-error detail).
   - **W3** audit-write silent catch — **D-HARDEN-3 correction**: audit writes do NOT fail the originating request (befitting graceful — the request is real and shouldn't be undone by an audit-log infrastructure hiccup). BUT the silent catch is replaced with an explicit `logger.error(…)` with structured context + an inline rationale comment naming W3 + the precept clause permitting graceful here. This is the documented "befitting graceful" carve-out invariant D3 anticipates.
   - **W4** `cssToOklab` returns-null-then-drop — fail-explicit at the validation boundary. **D-HARDEN-3 amendment**: name the library import explicitly — if `cssToOklab` lives in `@src/units/color/normalize` (the value.js library), import via the published surface and let the library's parser throw; do not catch-and-null in the api layer.

2. **`api/dist/` cleanup** — already gitignored (D-HARDEN-3 §3); the action is just a local `rm -rf api/dist/` for hygiene + a verification grep. No git-removal needed.

3. **Delete `api/src/migrate-{oklab,slugs}.ts`** — one-shot scripts; the migrations are done. Invariant-33 corpus grep proves zero references in the running code. Record the grep proof in `audit/D.W2-legacy-excision.md`.

4. **4 missed Db findings (D-HARDEN-3 §1 — fold here)**:
   - **F6 crypto-import** — Db named a crypto import shape mismatch; verify + correct.
   - **C3 LRU triplication** — three independent in-memory LRU caches with separate eviction; consolidate behind a single typed LRU module under `api/src/cache/`.
   - **C4 SIGTERM** — the process lacks an explicit SIGTERM handler that closes the Mongo client cleanly; add `process.on("SIGTERM", …)` with a 5s grace.
   - **F1 migration-evidence gap** — the startup check (Lane D item 1) IS the migration-evidence; close that loop.

5. **Reconcile `api/CLAUDE.md`**: 9 collections / 24 indexes (not 5/11). Re-write the structure section + document the new service/repository layer.

6. **Library D6-invariant excision** (per `audit/D-LIB-OPTIMIZATION-SYNTHESIS.md §1 L4`) — `evaluateSimpleCalc` at `src/parsing/color.ts:78` uses `new Function()` to evaluate trivial calc() expressions. Both Di (B1 inlining barrier) AND Dm (FE7) flagged this independently; both challenges UPHELD. It violates invariant D6 ("no effusive dynamicism") and is REDUNDANT — value.js already ships a real calc() AST evaluator (`src/parsing/math.ts`'s calc parser + evaluator). Replace the ~10-line `new Function(…)` block with a delegation: `evaluateCalc(parseCSSMath(input))`. Adds zero new code (both helpers exist); deletes the dynamic-eval. Falls under D.W2 because it's a library-side fail-explicit / D6-cleanup that lives in `src/parsing/`, not `api/` — sequenced with the legacy-excision lane for narrative coherence.

**Sub-gate D**: `grep -rn '?? null\|console\.warn\b' api/src/routes api/src/services` returns only the documented-rationale W3 site; `api/dist/` not on disk; `migrate-*.ts` absent; `api/CLAUDE.md` reflects 9 / 24 + the new layer; the migration startup check exists; the 3 LRUs are consolidated; SIGTERM handler installed.

## File bounds

| Lane | Files |
|---|---|
| C (first) | `api/src/db/collections.ts` (new), `api/src/repositories/{palette,paletteVersion,vote,session,proposedName,tag,flag,adminAudit,user}.ts` (new — 9 files), `api/src/errors/index.ts` (new), `api/src/events/auditLog.ts` (new), `api/src/middleware/{inject-services,require-ownership}.ts` (new), `api/src/validation/**` (new), `api/src/format/palette.ts` (new) |
| A | `api/src/routes/palettes.ts` (delete), `api/src/routes/palettes/{index,crud,versions,forks,votes,export,slug}.ts` (new — 7 files), `api/src/services/palette/{crud,versions,forks,votes,export,slug}.ts` (new — 6 files) |
| B | `api/src/routes/admin.ts` (delete), `api/src/routes/admin/{index,users,names,audit,flagged,tags,colors,palettes,sortmenu}.ts` (new — 8 sub-route files + index), `api/src/services/admin/**` (new) |
| D | The 6 fail-explicit sites (per-file across `services/**`/`middleware/**`/`format/**`), `api/src/migrate-{oklab,slugs}.ts` (delete), `api/src/migrations/check.ts` (new — F1 migration-evidence), `api/src/cache/lru.ts` (new — C3 consolidation), `api/src/index.ts` (SIGTERM handler — C4), `api/src/crypto/index.ts` (F6 import shape), `api/CLAUDE.md` (reconcile) |

## Gate

The conjunction of sub-gates **C + A + B + D** (in lane order) + the **api-integration probe** (invariant D4's api wave-qualifier). The integration probe: spin up the api (Docker-compose per `api/CLAUDE.md` deployment), curl each route's smoke endpoint, assert the explicit error envelopes on the 6 ex-silent paths (`ValidationError`/`OwnershipError`/`ConflictError` shapes), verify the SIGTERM-graceful-close lands within the 5s grace. `vitest` 1409 unchanged (no library regression). `npm run build` (library) clean. `vue-tsc` 126 unchanged (api/ work; demo unaffected).

## Verification artefacts

`audit/D.W2-palettes-split.md` (Lane A — per-file LoC before/after, concern map), `audit/D.W2-admin-split.md` (Lane B — same), `audit/D.W2-service-repo.md` (Lane C — the layer architecture diagram, repository per-collection check), `audit/D.W2-legacy-excision.md` (Lane D — the 6 fail-explicit sites with before/after, the dist/migrate retirement proof, the CLAUDE.md reconcile).

## Commit plan

- `feat(api/w2): introduce service + repository + errors + events + DI middleware + zod pipeline (9-repo + typed errors + audit emit)` — Lane C (lands FIRST).
- `refactor(api/w2): split palettes.ts (845 lines) per-concern — 6 routes/services on the new layer` — Lane A.
- `refactor(api/w2): split admin.ts (750 lines) per-concern — 8 routes/services on the new layer` — Lane B.
- `chore(api/w2): excise legacy + fail-explicit per D-HARDEN-3 revisions (F1 migration-check, F2 ownership-middleware, F3 idempotent upsert + gated $inc in transaction, W3 logged-with-rationale, W4 library-throw) + retire migrate-*.ts + SIGTERM handler + consolidate 3 LRUs + reconcile CLAUDE.md` — Lane D.

## Dependencies

- Depends on: D.W1 (contract-v2; the dev consumer config is now contract-v2 compliant, so api/ consumers don't trip the new gate).
- Blocks: D.W3 (frontend; only soft — backend changes don't affect demo files, but the gate-isolation discipline is cleaner sequenced).

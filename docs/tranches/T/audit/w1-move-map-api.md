# T.W1 — the api MOVE-MAP (E-1 package-by-feature transposition)

**Lane**: W1-api (single writer, disjoint tree — `api/**` + `scripts/`).
**Law**: `waves/T.W1.md` §5.2 · `audit/lanes/t-coloc-backend.md` §1–§3 (the L laws
verbatim) · `audit/lanes/t-api-state.md` TA-4 · RATIFICATION §1 Q8/Q17.
**Shape**: `modules/{palette,color,session,admin,meta}` over
`platform/{db,http(+errors),cache,text,migrations}` + `main.ts`/`app.ts` carved
from `index.ts`. **MOVE + REGROUP, never a rewrite** — the L boundary laws hold
verbatim (typed `ApiError`; routes→services; repositories-via-the-DI-seam; H1
cascade-correctness). The ONE behavior change is TA-4's enumerated excision.

This is the ONE table (old → new) for the api tree; every downstream re-anchor
derives its `file:line` against it (PP-11). Committed BEFORE the physical move
lands (the §Recovery "MOVE-MAP commits FIRST" rider).

---

## §0 TA-4 excision (own commit `a8ff779`, sequenced first)

DELETED (no new home — the write-only atom-diff apparatus):

| Old path | Disposition |
|---|---|
| `api/src/routes/palettes/diff.ts` | DELETED (`GET /:slug/diff` router unmounted) |
| `api/src/services/palette/diff.ts` | DELETED (`computePaletteDiff` — zero consumers) |
| `api/src/lib/crud/atomdiff.ts` | DELETED (`diffAtoms`/`DiffResponse`/`AtomDiffOp`); `lib/` dir dissolves |
| `api/test/conformance/diff.test.ts` | DELETED |
| `api/test/services/palette-remix.test.ts` | DELETED (fork coverage re-homed onto `palette-forks.test.ts`) |

FOLDED / TRIMMED (behavior-preserving): `POST /:slug/remix` route removed from
`forks.ts`; `remixPalette` folded into `forkPalette` (`services/palette/forks.ts`);
`remixPaletteBody` removed (`validation/palette.ts`); `PaletteVersion.atomDiff`
column dropped (`models.ts` + `versions.ts` write); the two `/remix`+`/diff`
`meta-routes.ts` catalog rows removed. **KEPT**: `computeAtomSetHash` +
`computeAtomHash` (`hash.ts` → `modules/palette/hash.ts`).

---

## §1 index.ts carve (E-1/F1)

| Old | New | Content |
|---|---|---|
| `src/index.ts` §24–122 | `src/app.ts` | Hono assembly: global middleware stack + route mounting + 404/onError |
| `src/index.ts` §124–211 | `src/main.ts` | composition root: env-validate → `getDb` → migration probe → cron → `serve()` → SIGTERM. Carries the lone `as unknown as` (the `server.close()` handle, inv-L-2) |

Entry-point re-points: `Dockerfile` `CMD dist/index.js → dist/main.js`;
`api/package.json` `dev: src/index.ts → src/main.ts`, `start: dist/index.js → dist/main.js`.

## §2 models.ts carve (E-1/F4 — per-domain; brands in session/)

`src/models.ts` → four `modules/<domain>/model.ts` files. Every one of the 34
importers re-pointed to the domain model(s) it uses (`import type` keeps the graph
acyclic; the const-enum + brand value exports carry the one runtime edge each).

| New model file | Symbols |
|---|---|
| `modules/palette/model.ts` | `Palette` `PaletteColor` `OklabTriple` `PaletteVersion` `Vote` `Flag` `FlagReason`/`FLAG_REASONS` `PaletteVisibility`/`PALETTE_VISIBILITIES` `PaletteTier`/`PALETTE_TIERS` |
| `modules/color/model.ts` | `ProposedName` `ProposedNameStatus`/`PROPOSED_NAME_STATUSES` `Tag` |
| `modules/session/model.ts` | `Session` `User` `UserStatus`/`USER_STATUSES` **+ brands** `SessionToken` `UserSlug` `asSessionToken` `asUserSlug` |
| `modules/admin/model.ts` | `AdminAuditEvent` |

## §3 platform/ (the shared server layer)

| Old | New |
|---|---|
| `src/db.ts` | `src/platform/db/db.ts` |
| `src/db/collections.ts` | `src/platform/db/collections.ts` |
| `src/cache/lru.ts` | `src/platform/cache/lru.ts` |
| `src/regex.ts` | `src/platform/text/regex.ts` |
| `src/errors/index.ts` | `src/platform/http/errors/index.ts` |
| `src/middleware/cors.ts` | `src/platform/http/cors.ts` |
| `src/middleware/rate-limit.ts` | `src/platform/http/rate-limit.ts` |
| `src/middleware/sanitize-body.ts` | `src/platform/http/sanitize-body.ts` |
| `src/middleware/ip.ts` | `src/platform/http/ip.ts` |
| `src/middleware/idempotency.ts` | `src/platform/http/idempotency.ts` |
| `src/middleware/inject-services.ts` | `src/platform/http/inject-services.ts` (the DI seam — imports one repository class from each module, F3) |
| `src/migrations/check.ts` | `src/platform/migrations/check.ts` |
| `src/migrations/migrate-soft-delete.ts` | `src/platform/migrations/migrate-soft-delete.ts` |

`src/cron.ts` + `src/types.ts` STAY at the src root (the composition/context vocabulary, F9).

## §4 modules/palette/

| Old | New |
|---|---|
| `src/routes/palettes/index.ts` | `src/modules/palette/routes/index.ts` |
| `src/routes/palettes/{crud,versions,forks,publish,votes,flags}.ts` | `src/modules/palette/routes/{…}.ts` |
| `src/services/palette/{crud,crud-list,forks,versions,votes,flags,oklab,ownership,visibility}.ts` | `src/modules/palette/service/{…}.ts` |
| `src/repositories/{palette,paletteVersion,vote,flag}.ts` | `src/modules/palette/repository/{…}.ts` |
| `src/validation/palette.ts` | `src/modules/palette/schema.ts` |
| `src/format/palette.ts` | `src/modules/palette/format.ts` |
| `src/hash.ts` | `src/modules/palette/hash.ts` |
| `src/middleware/etag.ts` | `src/modules/palette/etag.ts` |
| `src/middleware/require-ownership.ts` | `src/modules/palette/require-ownership.ts` |

## §5 modules/color/

| Old | New |
|---|---|
| `src/routes/colors.ts` | `src/modules/color/routes.ts` |
| `src/services/color/{queries,proposals}.ts` | `src/modules/color/service/{…}.ts` |
| `src/repositories/{proposedName,tag}.ts` | `src/modules/color/repository/{…}.ts` |
| `src/validation/color.ts` | `src/modules/color/schema.ts` |

## §6 modules/session/

| Old | New |
|---|---|
| `src/routes/sessions.ts` | `src/modules/session/routes.ts` |
| `src/services/session/auth.ts` | `src/modules/session/service/auth.ts` |
| `src/repositories/{session,user}.ts` | `src/modules/session/repository/{…}.ts` |
| `src/validation/session.ts` | `src/modules/session/schema.ts` |
| `src/slugWords.ts` | `src/modules/session/slugWords.ts` |
| `src/middleware/resolve-session.ts` | `src/modules/session/resolve-session.ts` |

## §7 modules/admin/

| Old | New |
|---|---|
| `src/routes/admin/{index,audit,batch,colors,flagged,impersonate,palettes,tags,users}.ts` | `src/modules/admin/routes/{…}.ts` |
| `src/services/admin/{audit,batch,colors,flagged,impersonate,import,palettes,tags,users}.ts` | `src/modules/admin/service/{…}.ts` |
| `src/repositories/adminAudit.ts` | `src/modules/admin/repository/adminAudit.ts` |
| `src/validation/admin.ts` | `src/modules/admin/schema.ts` |
| `src/events/auditLog.ts` | `src/modules/admin/audit-log.ts` (`emitAuditEvent`) |
| `src/middleware/admin-auth.ts` | `src/modules/admin/admin-auth.ts` |

## §8 modules/meta/

| Old | New |
|---|---|
| `src/routes/meta.ts` | `src/modules/meta/routes.ts` |
| `src/routes/meta-routes.ts` | `src/modules/meta/route-table.ts` (the `ROUTES` table) |

## §9 test colocation (Q17 — `modules/<domain>/__tests__/` + the NAMED `test/conformance/` exception)

Recorded at the tests-colocation batch. Cross-module contract suites
(`conformance/{crud,idempotency}`, `db-indexes`, `envelope`, the H1
`withTransaction-rollback*` + `txn-right-sizing`, the sessions+colors
route suite) stay under `api/test/conformance/`; `test/{helpers,setup}.ts` stay
as the shared harness. Per-domain suites move to `modules/<domain>/__tests__/`.

## §10 scripts/ regroup (E-1/F7 — `deploy/` · `dev/` · `ci/` · `gates/`)

| Old | New |
|---|---|
| `scripts/deploy.sh` | `scripts/deploy/deploy.sh` |
| `scripts/deploy-hook.sh` | `scripts/deploy/deploy-hook.sh` |
| `scripts/dev.sh` | `scripts/dev/dev.sh` |
| `scripts/boot-smoke.mjs` | `scripts/ci/boot-smoke.mjs` |
| `scripts/abrogation-sweep.mjs` | `scripts/ci/abrogation-sweep.mjs` |
| `scripts/css-emission-probe.mjs` | `scripts/ci/css-emission-probe.mjs` |
| `scripts/proof-css-parity.mjs` | `scripts/gates/proof-css-parity.mjs` |
| `scripts/proof-round-trip-idempotent.mjs` | `scripts/gates/proof-round-trip-idempotent.mjs` |
| `scripts/proof-perf-target.mjs` | `scripts/gates/proof-perf-target.mjs` |
| `scripts/proof-serialize-fidelity.mjs` | `scripts/gates/proof-serialize-fidelity.mjs` |
| `scripts/proof-subpath-budget.mjs` | `scripts/gates/proof-subpath-budget.mjs` |

Re-points (all functional refs; CI uses `npm run <name>` so only the definitions move):
- ROOT `package.json` scripts object: `dev` → `scripts/dev/dev.sh up`; `boot-smoke` /
  `abrogation-sweep` / `css-emission-probe` → `scripts/ci/*`; the five `proof:*` →
  `scripts/gates/*`. **`npm run test:dist` stays green** (the W0-2 deliverable
  survives W1 — verified below).
- Each moved `.mjs` that computes repo-root via `import.meta.url` had its `..` bumped
  to `../..` (one level deeper): `css-emission-probe`, `abrogation-sweep`, and the
  five `proof-*` gates. `boot-smoke` hits a live HTTP server (path-agnostic).
- `dev.sh`: the `down` pkill re-targets `tsx watch src/main.ts` (the index→main
  rename) + self-usage paths updated.
- `deploy-hook.sh`: header carries the **on-host webhook path-change note** — the
  host `hooks.json` `execute-command` points at the NEW `scripts/deploy/deploy-hook.sh`
  when W0-X1 (re)registers the dead webhook (coordinated, not a live break).
- The 5 retained gates keep their behavioral contract; the excised-7 set was already
  removed at T.W0 (W0-2 retain-5/excise-7). `docs/precepts/` + `demo/@/styles/` +
  `demo/@/components/ui/` + `assets/docs/` untouched (fence).

---

## §11 Invariants held (re-verified post-move)

- **L boundary** — typed `ApiError` (0 ad-hoc `c.json({error})`); routes→services
  (0 `services.repositories` in `routes/`); DI seam sole raw-`db` reach; `as any`=0;
  `as unknown as`=1 (`main.ts`, the `server.close()` handle).
- **H1 cascade-correctness** — 14 `services.withTransaction(` sites, re-walked in
  `docs/tranches/H/audit/api-withTransaction-coverage.md` (§1.4 + §2 tables re-pathed).
- **inv-L-7 god-module cap** — max `api/src` file = 325 LoC (`modules/palette/service/crud-list.ts`).
- **Q8 depth** — `PaletteVersion.atomDiff` GONE from the schema.
- **NO re-export shims at old paths** — consumers migrated at the root; grep-zero.

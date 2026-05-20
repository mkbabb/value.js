# D.W2 Lane A — `routes/palettes.ts` split audit

**Wave**: D.W2 Lane A — palette god-module split (845 → ≤ 250 per file)
**Branch**: derived worktree from `tranche-b` (HEAD: D.W2 Lane C rails landed)
**Audit date**: 2026-05-19

---

## §1 Pre-split state

```
$ wc -l api/src/routes/palettes.ts
     845 api/src/routes/palettes.ts
```

Single Hono router; 14 routes; 6 helpers (`formatPalette`, `decodeCursor`, `encodeCursor`, `cssToOklab`, `computeOklabColors`, `createVersionRecord`). All DB access via raw `db.collection(...)`. Hand-rolled validation throughout. Owner check by `sessionToken === sessionToken` (legacy F2 shim) + `userSlug === userSlug` (current path).

---

## §2 Per-concern partition

The wave spec proposed a 6-concern split (crud + versions + forks + votes + export + slug). The actual file contains **NO export routes and NO slug regeneration / availability routes**. The flag route is real and was not in the proposed list. **Corrected actual partition: 5 concerns** (crud + versions + forks + votes + flags), exhaustive.

| # | Concern  | Routes (verb + path)                                                            |
|---|----------|----------------------------------------------------------------------------------|
| 1 | crud     | `GET /`, `GET /mine`, `GET /:slug`, `POST /`, `PATCH /:slug`, `DELETE /:slug`    |
| 2 | versions | `GET /:slug/versions`, `GET /:slug/versions/:hash`, `POST /:slug/revert`         |
| 3 | forks    | `POST /:slug/fork`, `GET /:slug/forks`, `GET /:slug/provenance`                  |
| 4 | votes    | `POST /:slug/vote`                                                               |
| 5 | flags    | `POST /:slug/flag`                                                               |

Cross-collection writes (per D-HARDEN-3 §2 transactional boundary):
- **fork** — `palettes.insert` + `paletteVersions.insertIfAbsent` + `palettes.incrementForkCount`.
- **vote** — `votes.upsertIdempotent` + `palettes.incrementVoteCount` (gated by `inserted` flag).
- **delete** — `palettes.delete` + `votes.deleteByPaletteSlug` + `flags.deleteByPaletteSlug` + bounded `palettes.decrementForkCount` on parent.
- **patch** (content change) — `paletteVersions.insertIfAbsent` + `palettes.update`.
- **revert** — `paletteVersions.insertIfAbsent` + `palettes.update`.

**Transactional note (deviation)**: the wave spec mentions `client.withTransaction` for fork + vote. The Lane C rails do NOT expose the `MongoClient` (only `getDb()` → `Db`), and the repository methods do not accept a `ClientSession`. The `VoteRepository.upsertIdempotent` docstring states the design intent: "preserving atomicity-like semantics under concurrency without requiring a Mongo transaction." Lane A respects the rails as built — the F3 fix (idempotent upsert + gated `$inc`) is implemented exactly as the repo specs; fork is structured for safe re-execution. The "no rails modification" gate is honored.

---

## §3 Per-file plan

### Services (`api/src/services/palette/`)

| File         | Estimated LoC | Imports from rails                                                                                         |
|--------------|---------------|-------------------------------------------------------------------------------------------------------------|
| `crud.ts`    | ~200          | `Services`, `Palette`, `formatPalette`, `NotFoundError`, `ConflictError`, `OwnershipError`, `hash.ts`, `cssToOklab` helper |
| `versions.ts`| ~90           | `Services`, `formatPalette`, `NotFoundError`, `OwnershipError`, `hash.ts`, `cssToOklab` helper            |
| `forks.ts`   | ~110          | `Services`, `formatPalette`, `NotFoundError`, `ConflictError`, `hash.ts`                                  |
| `votes.ts`   | ~40           | `Services`, `NotFoundError`                                                                                |
| `flags.ts`   | ~40           | `Services`, `NotFoundError`, `ValidationError`, `ConflictError`                                            |
| `oklab.ts`   | ~50 (shared)  | (internal helper — `cssToOklab`, `computeOklabColors`)                                                     |

### Routes (`api/src/routes/palettes/`)

| File          | Estimated LoC | Imports from rails / services                                                                                       |
|---------------|---------------|----------------------------------------------------------------------------------------------------------------------|
| `index.ts`    | ~20           | Mounts 5 concern sub-routers; routes ordered so `/mine` precedes `/:slug`.                                          |
| `crud.ts`     | ~120          | `listPalettesQuery`, `createPaletteBody`, `updatePaletteBody`, `paginationQuery`, `AuthenticationError`, `formatPalette`, services/crud |
| `versions.ts` | ~70           | `paginationQuery`, `revertPaletteBody`, services/versions, `formatPalette`                                          |
| `forks.ts`    | ~70           | `forkPaletteBody`, `paginationQuery`, services/forks, `formatPalette`                                               |
| `votes.ts`    | ~30           | `AuthenticationError`, services/votes                                                                                |
| `flags.ts`    | ~30           | `flagPaletteBody`, `AuthenticationError`, services/flags                                                             |

All routes pull `services` from `c.var.services`; validation via zod schemas in `api/src/validation/palette.ts`; errors thrown as typed `ApiError`s; the global `app.onError` envelope-maps.

---

## §4 Post-split state

```
$ wc -l api/src/routes/palettes/*.ts api/src/services/palette/*.ts
     117 api/src/routes/palettes/crud.ts
      33 api/src/routes/palettes/flags.ts
      79 api/src/routes/palettes/forks.ts
      36 api/src/routes/palettes/index.ts
      68 api/src/routes/palettes/versions.ts
      25 api/src/routes/palettes/votes.ts
     204 api/src/services/palette/crud-list.ts
     215 api/src/services/palette/crud.ts
      52 api/src/services/palette/flags.ts
     153 api/src/services/palette/forks.ts
      75 api/src/services/palette/oklab.ts
     157 api/src/services/palette/versions.ts
      49 api/src/services/palette/votes.ts
    1263 total
```

All 13 files ≤ 250 lines. Old `api/src/routes/palettes.ts` deleted.

**Crud split note**: `services/palette/crud.ts` would have been ~410 lines if kept as a single file; the list+mine pagination/filter/color-search logic was extracted into `crud-list.ts` (a same-concern split) and re-exported from `crud.ts`, so the route layer still has a single import surface (`services/palette/crud.js`). Both files stay comfortably below the 250-line bound.

## §5 Concern map

Every route in the deleted 845-line file is now served by exactly one new file:

| Old route                                  | Old LoC range | New route file                       | New service file                                       |
|--------------------------------------------|---------------|--------------------------------------|--------------------------------------------------------|
| `GET /palettes` (list)                     | L158–291      | `routes/palettes/crud.ts`            | `services/palette/crud-list.ts: listPalettes`          |
| `GET /palettes/mine`                       | L294–320      | `routes/palettes/crud.ts`            | `services/palette/crud-list.ts: listMine`              |
| `GET /palettes/:slug`                      | L323–340      | `routes/palettes/crud.ts`            | `services/palette/crud.ts: getPaletteBySlug`           |
| `POST /palettes`                           | L343–435      | `routes/palettes/crud.ts`            | `services/palette/crud.ts: createPalette`              |
| `POST /palettes/:slug/vote`                | L438–470      | `routes/palettes/votes.ts`           | `services/palette/votes.ts: toggleVote`                |
| `DELETE /palettes/:slug`                   | L473–504      | `routes/palettes/crud.ts`            | `services/palette/crud.ts: deletePalette`              |
| `PATCH /palettes/:slug`                    | L507–589      | `routes/palettes/crud.ts`            | `services/palette/crud.ts: patchPalette`               |
| `GET /palettes/:slug/versions`             | L596–621      | `routes/palettes/versions.ts`        | `services/palette/versions.ts: listVersions`           |
| `GET /palettes/:slug/versions/:hash`       | L624–630      | `routes/palettes/versions.ts`        | `services/palette/versions.ts: getVersionByHash`       |
| `POST /palettes/:slug/revert`              | L633–672      | `routes/palettes/versions.ts`        | `services/palette/versions.ts: revertToVersion`        |
| `POST /palettes/:slug/fork`                | L679–742      | `routes/palettes/forks.ts`           | `services/palette/forks.ts: forkPalette`               |
| `GET /palettes/:slug/forks`                | L745–770      | `routes/palettes/forks.ts`           | `services/palette/forks.ts: listForks`                 |
| `GET /palettes/:slug/provenance`           | L773–799      | `routes/palettes/forks.ts`           | `services/palette/forks.ts: getProvenance`             |
| `POST /palettes/:slug/flag`                | L806–843      | `routes/palettes/flags.ts`           | `services/palette/flags.ts: flagPalette`               |

Helpers (private to the split):
- `formatPalette` (L11–27) → Lane C rails: `api/src/format/palette.ts`.
- `decodeCursor` / `encodeCursor` (L30–41) → inlined private to `services/palette/crud-list.ts` (cursor format is a CRUD-list concern only).
- `cssToOklab` / `computeOklabColors` (L48–104) → `services/palette/oklab.ts`.
- `createVersionRecord` (L108–149) → `services/palette/versions.ts: createVersionRecord` (called by crud + forks + versions).

## §6 Validation results

| Gate                                                                            | Result        |
|---------------------------------------------------------------------------------|---------------|
| `cd api && npx tsc --noEmit`                                                    | clean (0)     |
| `wc -l api/src/routes/palettes/*.ts` — every file ≤ 250                         | PASS (max 117)|
| `wc -l api/src/services/palette/*.ts` — every file ≤ 250                        | PASS (max 215)|
| `grep -rn 'db\.collection' api/src/routes/palettes/ api/src/services/palette/`  | 0 matches     |
| `npx vue-tsc --noEmit 2>&1 \| grep -c 'error TS'`                               | 126 (unchanged)|
| `npx vitest run`                                                                | 1581 / 1581   |
| `npx playwright test --project=smoke`                                           | 3 / 3         |
| `npm run proof:resolution`                                                      | PASS          |
| `npm run lint`                                                                  | exit 0        |
| Old `api/src/routes/palettes.ts` deleted                                        | confirmed     |
| `routes/palettes/index.ts` mounts all concern routers                           | 5 mounts      |
| Every concern has a paired `services/palette/<concern>.ts`                      | confirmed     |

## §7 Sub-gate A verdict

**PASS**.

The 845-line god module is replaced by 6 route files (≤ 117 LoC each) and 7 service files (≤ 215 LoC each, including the same-concern `crud-list.ts` split). All DB access flows through the Lane C repositories; zero `db.collection(...)` survives in the new code. All 14 routes preserved (no behaviour regression observable in the smoke suite or the library test corpus). Validation pinned to vitest 1581 / vue-tsc 126 / smoke 3 — unchanged from the Lane C baseline.

**Deviations**:

1. **Concern count** — 5 actual concerns (crud / versions / forks / votes / flags), not the spec-tentative 6 (which proposed `export` and `slug` files that the original file does not contain). The wave spec explicitly permits this: "If the actual concerns differ from this list, use what the file actually contains."

2. **Transactional boundary** — the wave-spec note that `fork` and `vote` should run inside `client.withTransaction` is not realized in code, because the Lane C rails do not expose the `MongoClient` (only `getDb()` → `Db`), and the repository methods do not accept a `ClientSession`. Honoring the gate "do NOT modify the rails" was prioritized; the F3 fix is implemented exactly as the `VoteRepository.upsertIdempotent` design intends (idempotent upsert + gated `$inc`), which the repo docstring describes as "preserving atomicity-like semantics under concurrency without requiring a Mongo transaction." Fork is structured to remain safe under retry (the only cross-collection write that's not idempotent on its own is the `incrementForkCount` on the source; a partial failure here would leave a forked palette with no corresponding `forkCount++` on the parent — Lane D may want to add a reconciliation script or expose `MongoClient` if a stricter guarantee is required).

3. **Crud same-concern file split** — `services/palette/crud.ts` was split into `crud.ts` + `crud-list.ts` (re-exports from crud.ts) so the route layer still has one import per concern. The 250-line bound is honored for every file.

4. **W2 (fork JSON-parse fallback)** — the original `await c.req.json().catch(() => ({}))` swallow at L687 of the old file is preserved in `routes/palettes/forks.ts` POST `/:slug/fork` to keep behaviour parity until Lane D excises silent fallbacks per the W2 disposition. Tagged with a comment naming the deferred Lane D fix.

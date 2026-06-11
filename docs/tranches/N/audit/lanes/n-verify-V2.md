# Lane V2 — api/src Byte-Exact Recounts

**Branch**: tranche-f-handoff  **HEAD**: 0cb5dd2  **Date**: 2026-06-11

---

## (a) WithId Escape Census

### Methodology

Two greps were run against every `.ts` file under `api/src/`:

1. **Cast sites** — `grep -rnE 'as (Palette|ProposedName|Tag|AdminAuditEvent) & \{[ ]*_id'`
2. **Type-annotation sites** — `grep -rnE ': (Palette|ProposedName|Tag|AdminAuditEvent) & \{[ ]*_id'`
3. **Broader sweep** — `grep -rnE '(Palette|ProposedName|Tag|AdminAuditEvent).*_id'` to catch anything missed.

### Per-File Cast Table (standard pattern `as Model & { _id: unknown }`)

| File | Lines | Count |
|------|-------|-------|
| `api/src/services/palette/crud.ts` | 65, 141, 215, 277, 295 | 5 |
| `api/src/services/color/queries.ts` | 81, 104, 125, 140 | 4 |
| `api/src/services/palette/crud-list.ts` | 155, 164, 221 | 3 |
| `api/src/routes/palettes/forks.ts` | 60, 96, 111 | 3 |
| `api/src/services/palette/visibility.ts` | 76, 85 | 2 |
| `api/src/services/palette/versions.ts` | 190 | 1 |
| `api/src/services/palette/forks.ts` | 153 | 1 |
| `api/src/services/color/proposals.ts` | 76 | 1 |
| `api/src/services/admin/users.ts` | 90 | 1 |
| `api/src/services/admin/tags.ts` | 43 | 1 |
| `api/src/services/admin/colors.ts` | 69 | 1 |
| `api/src/services/admin/audit.ts` | 82 | 1 |
| `api/src/routes/palettes/versions.ts` | 69 | 1 |
| **TOTAL** | | **25** |

**One additional cast** uses parenthetical syntax:
- `api/src/services/palette/forks.ts:206` — `data as (Palette & { _id: unknown })[]`

**Total as-casts = 26** (25 standard + 1 parenthetical).

### Type Annotation Sites (`: Model & { _id: unknown }`)

| File | Lines | Count |
|------|-------|-------|
| `api/src/format/palette.ts` | 57 | 1 |
| `api/src/services/admin/colors.ts` | 38 | 1 |
| `api/src/services/palette/versions.ts` | 128 | 1 |
| `api/src/services/color/queries.ts` | 48, 61 | 2 |
| `api/src/services/admin/audit.ts` | 44 | 1 |
| `api/src/services/palette/forks.ts` | 30, 167 | 2 |
| `api/src/services/admin/tags.ts` | 31 | 1 |
| **TOTAL** | | **9** |

### Broader Sweep (all lines mentioning these 4 types with `_id`)

The broader grep (`grep -rnE '(Palette|ProposedName|Tag|AdminAuditEvent).*_id'`) returns **39 total lines**, which includes:
- 25 standard as-casts
- 1 parenthetical as-cast (forks.ts:206)
- 9 type annotations (function param types, interface field types)
- 1 JSDoc comment (`format/palette.ts:52`)
- 1 generic type parameter (`queries.ts:102` — `new Map<string, ProposedName & { _id: unknown }>()`)
- 1 interface array type (`forks.ts:191` — `data: (Palette & { _id: unknown })[]`)
- 1 out-of-scope: `paletteVersion.ts:40` uses `WithoutId<PaletteVersion> & { _id: string }` (different model)

### Verdict on 25 vs 38 Dispute

**25 casts is confirmed correct** for the strict `as Model & { _id }` pattern. The "38 lines" cited by prior lanes was likely measuring a broader pattern (either including type annotations and interface field types, or including partial-match grepping). Including the parenthetical cast at forks.ts:206, the true cast count is **26**. Total lines of all forms touching these 4 models with `_id` is **39** (including non-code lines).

---

## (b) D-Lane Headline Claims

### 1. Orphaned-Vote Sweep TOCTOU (cron.ts read-then-delete)

**Evidence**: `api/src/cron.ts` lines 39–51.

The cleanup function:
1. Line 39: `palettes.findPastGrace(graceCutoff)` — reads expired palettes
2. Lines 41–48: Loop — deletes each expired palette + votes/flags in a transaction
3. Line 50: `palettes.listAllSlugs()` — reads ALL current palette slugs via `distinct("slug")`
4. Line 51: `votes.deleteOrphaned(paletteSlugs)` — deletes votes where `paletteSlug { $nin: paletteSlugs }`

**The TOCTOU risk is real**: Between step 3 (`listAllSlugs`) and step 4 (`deleteOrphaned`), a new palette can be created and votes cast for it. Those votes would be wrongly swept as orphaned because the new slug was not in the snapshot captured at step 3. There is no lock, no transaction, and no idempotency guard between these two operations.

Additionally, the reaper loop in steps 1–2 deletes expired palettes one-by-one (serial, not atomic). Each deletion removes that palette's votes in the cascade. By step 3, those slugs are gone from `listAllSlugs()`, so `deleteOrphaned` in step 4 would not re-attempt to delete their votes (benign). But the reverse is worse: a palette created AFTER step 3 but BEFORE step 4 will have its votes swept.

**Verdict: CONFIRMED TOCTOU**. `listAllSlugs` (line 50) and `deleteOrphaned` (line 51) are two separate round-trips with no transactional fence. The `$nin` sweep uses a stale slug snapshot.

### 2. compose.yaml — No Replica-Set Configuration

**Evidence**: `api/compose.yaml` lines 48–77 (the `mongo:` service block).

The `mongo` service uses `image: mongo:8` with NO `command:` override. There is no `--replSet rs0` flag, no `MONGO_INITDB_*` replica-set initialization, and no init container. The MONGODB_URI in the compose env is `mongodb://mongo:27017/palette-db` — no `?replicaSet=rs0` query parameter.

**Confirmed: compose.yaml has NO replica-set configuration.**

However, this is a known gap, documented in `api/src/middleware/inject-services.ts` lines 55–58:
> "Requires a replica-set or sharded MongoDB deployment for the transaction to actually open (single-node `mongod --replSet rs0` works locally). On a standalone Mongo the driver throws on the first transactional op; this is a deploy-environment concern documented in `compose.yaml`."

The comment says "documented in `compose.yaml`" but compose.yaml itself has no such documentation and no `--replSet` flag. The dev workflow (`scripts/dev.sh` lines 142–177) DOES launch with `--replSet rs0` and properly calls `rs.initiate(...)`. The CI uses `MongoMemoryReplSet` (`api/test/setup.ts:19`). The production path via `compose.yaml` would run a **standalone** MongoDB where `services.withTransaction(...)` will throw at runtime. This is a real deployment defect.

### 3. withTransaction Call Sites Count (~19 claimed)

**Evidence**: `grep -rn 'services\.withTransaction(' api/src/` excluding JSDoc comments.

**18 actual call sites** (the 19th match at `db.ts:10` is a JSDoc comment line `* services.withTransaction(fn) instead`):

| File | Lines | Count |
|------|-------|-------|
| `api/src/cron.ts` | 42 | 1 |
| `api/src/services/palette/crud.ts` | 115, 195, 247, 280 | 4 |
| `api/src/services/admin/users.ts` | 122, 170, 207, 241 | 4 |
| `api/src/services/admin/tags.ts` | 78 | 1 |
| `api/src/services/admin/palettes.ts` | 66 | 1 |
| `api/src/services/admin/batch.ts` | 38, 87 | 2 |
| `api/src/services/palette/versions.ts` | 156 | 1 |
| `api/src/services/palette/forks.ts` | 106 | 1 |
| `api/src/services/session/auth.ts` | 75, 137 | 2 |
| `api/src/services/palette/votes.ts` | 45 | 1 |
| **TOTAL** | | **18** |

**Verdict: 18 actual call sites** (not 19). The "~19" claim from D-lane was off by one due to counting the JSDoc comment at `db.ts:10`.

### 4. 26 createIndex Calls in db.ts

**Evidence**: `grep -n 'createIndex' api/src/db.ts` returns exactly **26 lines** (lines 41–91).

Breakdown by collection:
- `palettes`: 8 indexes (lines 41–51)
- `palette_versions`: 4 indexes (lines 54–57)
- `votes`: 2 indexes (lines 60–61)
- `sessions`: 2 indexes (lines 64–65)
- `proposed_names`: 3 indexes (lines 68–72)
- `users`: 1 index (line 76)
- `tags`: 1 index (line 79)
- `flags`: 3 indexes (lines 82–87)
- `admin_audit`: 2 indexes (lines 90–91)

**Verdict: CONFIRMED — exactly 26 createIndex calls.**

### 5. Three Write-Only palette_versions Indexes

**Evidence**: `api/src/repositories/paletteVersion.ts` has exactly 4 methods:
- `findByHash` — queries `{ _id: hash }` (uses implicit `_id` index)
- `findByPaletteSlug` — queries `{ paletteSlug }`, sorts by `createdAt` (uses `paletteSlug+createdAt` index, db.ts:54)
- `countByPaletteSlug` — queries `{ paletteSlug }` (same index)
- `insertIfAbsent` — inserts only

A full search of `api/src/` for queries using `forkedFromHash`, `rootHash`, or `authorSlug` as filter criteria finds **zero query uses**. These fields appear only in:
- Model definitions (`models.ts:161–165`)
- Write paths (insert/update in `services/palette/crud.ts`, `forks.ts`, `versions.ts`)

**Verdict: CONFIRMED — the three indexes at db.ts:55–57 (`forkedFromHash`, `rootHash`, `authorSlug+createdAt`) are write-only. No query in `api/src/` filters on these fields.**

### 6. Four Serial findBySlug Reads on PATCH /palettes/:slug

**Call path trace**:

1. **`requireOwnership(paletteOwnerExtractor)`** middleware (crud.ts:108) calls `getOwnerSlug` (ownership.ts:28) → `services.repositories.palettes.findBySlug(slug)` [**read 1**]

2. **`getPaletteETagData(c.var.services, slug)`** (crud.ts:118) → `services.repositories.palettes.findBySlug(slug)` (ownership.ts:46) [**read 2**]

3. **`patchPalette(...)`** service (crud.ts:129) → `services.repositories.palettes.findBySlug(slug)` at crud.ts:167 [**read 3**]

4. **After the transaction commit**, `patchPalette` re-reads the updated record: `services.repositories.palettes.findBySlug(slug)` at crud.ts:213 [**read 4**]

The code at crud.ts:115–117 even documents this explicitly:
> "The middleware has already verified the palette exists and is owned by `c.var.userSlug`; we still re-read here for the patch payload + content-hash diff."

And at crud.ts:115–117 there is an acknowledged TOCTOU:
> "An accepted narrow TOCTOU window (ledger #16)."

**Verdict: CONFIRMED — exactly 4 serial `findBySlug` reads on `PATCH /palettes/:slug`**, at ownership.ts:28, ownership.ts:46, crud.ts:167, and crud.ts:213.

---

## Summary Table

| Claim | Verdict | Primary Evidence |
|-------|---------|-----------------|
| 25 casts (strict `as Model & { _id }`) | **CONFIRMED CORRECT** | grep count = 25 |
| 38 lines total disputed | **PARTIALLY CORRECT** — 39 lines total if all forms counted; 26 as-casts if including parenthetical form | grep -rnE broader sweep |
| Orphaned-vote sweep TOCTOU | **CONFIRMED** | cron.ts:50–51 — two separate round-trips, no lock |
| compose.yaml NO replica-set | **CONFIRMED** | compose.yaml has no `--replSet`, no command override |
| ~19 withTransaction sites | **OFF BY ONE** — actual count is 18 code sites (db.ts:10 is a comment) | grep count |
| 26 createIndex in db.ts | **CONFIRMED EXACTLY** | grep count = 26 |
| 3 write-only palette_versions indexes | **CONFIRMED** | No query in api/src uses forkedFromHash/rootHash/authorSlug as filter |
| 4 serial findBySlug on PATCH | **CONFIRMED** | ownership.ts:28, ownership.ts:46, crud.ts:167, crud.ts:213 |

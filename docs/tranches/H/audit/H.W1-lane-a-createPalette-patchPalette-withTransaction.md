# H.W1 Lane A — createPalette + patchPalette `withTransaction` wrap

**Status:** GREEN
**Wave:** H.W1
**Lane:** A
**Branch:** `tranche-h`
**Base:** `a12a71d`
**Defect class:** orphan-version exposure (H-AUDIT-6 §3 — H1 invariant violation)

## Defect

`api/src/services/palette/crud.ts` had two cross-collection mutation paths
that wrote to BOTH the `palettes` collection AND the `palette_versions`
collection without `withTransaction`:

1. **`createPalette`** (pre-repair `:101-119`) — inserted the palette row
   via `palettes.insert(doc)`, then (when `userSlug` was present) called
   `createVersionRecord(...)`, which in turn writes a `palette_versions`
   row. A partial failure between the two writes — a transient driver
   error, write-concern timeout, schema-validation throw on the version
   row — left a palette whose `currentHash` resolved to no version
   record, OR (less plausibly, given the order) an orphan version row.

2. **`patchPalette`** (pre-repair `:139-184`) — when content changed
   (`newHash !== palette.currentHash`) AND the caller was attributable
   (`userSlug`), called `createVersionRecord(...)` and then
   `palettes.update(slug, { $set })` in sequence. A partial failure
   between the two writes left either an orphan version row that the
   palette never adopted, or a palette whose `currentHash` pointed at a
   version row that never committed.

Both violate H1 (the H.md invariant: "every cross-collection write
participates in `withTransaction`"). The G.W3 Lane E expansion threaded
`session?: ClientSession` through `createVersionRecord` and through every
repository write method that participates in cross-collection cascades —
so the repair is mechanical thread-through, not signature work.

## Repair

### Scope

- `api/src/services/palette/crud.ts:101-130` — `createPalette` body wrapped
  in `services.withTransaction(async (session) => { ... })`. Both
  `palettes.insert(doc, session)` and `createVersionRecord(services, {...},
  session)` thread the session. The duplicate-key catch (mongo error code
  `11000`) was lifted to wrap the whole transaction call — the
  `ConflictError` translation still applies because `session.withTransaction`
  re-throws the inner driver error verbatim.
- `api/src/services/palette/crud.ts:181-208` — `patchPalette`'s
  version-record-write + palette-update block wrapped in
  `services.withTransaction(async (session) => { ... })`. The version-record
  write runs BEFORE the palette update inside the transaction (mirroring
  the pre-repair order). When content is unchanged this still runs as a
  single-statement transaction (`palettes.update` only) — cheap, and
  keeps the call site uniform with the content-changed branch.

### Repository signature extensions

**None required.** G.W3 Lane E already threaded `session?: ClientSession`
through every repository method this lane touches:

| Method | Signature site | First sessionized in |
|---|---|---|
| `PaletteRepository.insert` | `repositories/palette.ts:94` | G.W3 Lane E |
| `PaletteRepository.update` | `repositories/palette.ts:99` | G.W3 Lane E |
| `PaletteVersionRepository.insertIfAbsent` | `repositories/paletteVersion.ts:39` | E.W2 Lane B |
| `PaletteVersionRepository.findByHash` | `repositories/paletteVersion.ts:13` | E.W2 Lane B |
| `createVersionRecord` | `services/palette/versions.ts:37` | E.W2 Lane B (session-aware) / G.W3 Lane E (call-site coverage) |

All session params were already declared optional. Lane A is purely
call-site thread-through.

### `withTransaction` site count

`grep -n 'withTransaction' api/src/services/palette/crud.ts`:

```
108:        await services.withTransaction(async (session) => {   // createPalette (NEW — H.W1 Lane A)
188:        await services.withTransaction(async (session) => {   // patchPalette  (NEW — H.W1 Lane A)
234:        await services.withTransaction(async (session) => {   // deletePalette (existing — G.W3 Lane E)
```

Three sites total inside `crud.ts`. The 2 new sites bring the file-wide
`withTransaction` count to 3 and the API-wide count to **9 sites**
(was 7 after G.W3 Lane E: `deleteUser`, `forkPalette`, `toggleVote`,
`deletePalette`, `revertToVersion`, `batchPalettes(delete)`,
`batchUsers(suspend)`; H.W1 Lane A adds `createPalette` + `patchPalette`).

## Tests

### New file

`api/test/services/withTransaction-rollback-h-w1.test.ts` — 2 tests,
mirroring the G.W3 Lane E rollback-test idiom
(`withTransaction-rollback.test.ts`). Both run against
`MongoMemoryReplSet` so the transaction boundary is real, not stubbed.

### Test 1 — `createPalette rolls back palette + version when createVersionRecord throws`

Stubs `services.repositories.paletteVersions.insertIfAbsent` to throw on
the SECOND step (after `palettes.insert` has already executed inside the
open transaction). Asserts:

- `createPalette` rejects with the induced error.
- `palettes.findBySlug("doomed")` returns `null` — the palette insert
  rolled back.
- `paletteVersions.countByPaletteSlug("doomed") === 0` — no orphan
  version row landed.

### Test 2 — `patchPalette rolls back palette mutation + version when createVersionRecord throws`

Seeds a palette with `name: "Original"`, then stubs
`paletteVersions.insertIfAbsent` to throw — this is the FIRST step inside
the patch transaction, but the test verifies that no later step (the
`palettes.update`) ever ran either. Asserts:

- `patchPalette` rejects with the induced error.
- The palette's `name`, `colors`, `currentHash`, `versionCount` all
  remain at their pre-patch values.
- `paletteVersions.countByPaletteSlug("patched")` equals the pre-patch
  count (no orphan row).

## Sub-gate evidence

### vitest

```
$ cd api && npx vitest run
 Test Files  22 passed (22)
      Tests  108 passed (108)
   Start at  12:16:53
   Duration  6.02s
```

Baseline pre-H.W1-Lane-A: 21 files / 106 passing. Delta: +1 file, +2 tests
(both new H.W1 Lane A tests). Both new tests verified GREEN by name:

- `withTransaction rollback (H.W1 Lane A) > createPalette rolls back palette + version when createVersionRecord throws`
- `withTransaction rollback (H.W1 Lane A) > patchPalette rolls back palette mutation + version when createVersionRecord throws`

Isolated run:

```
$ npx vitest run test/services/withTransaction-rollback-h-w1.test.ts
 ✓ test/services/withTransaction-rollback-h-w1.test.ts (2 tests) 89ms
 Test Files  1 passed (1)
      Tests  2 passed (2)
```

### tsc

```
$ cd api && npx tsc --noEmit; echo "EXIT=$?"
EXIT=0
```

## Files touched (Lane A bounds)

| File | Status | Notes |
|---|---|---|
| `api/src/services/palette/crud.ts` | modified | 2 `withTransaction` wraps |
| `api/test/services/withTransaction-rollback-h-w1.test.ts` | NEW | 2 rollback tests |
| `docs/tranches/H/audit/H.W1-lane-a-createPalette-patchPalette-withTransaction.md` | NEW | this doc |

Zero touches outside Lane A bounds. Zero repository signature changes.
Zero cross-repo writes.

## Carry-forward / judgment calls

**None.** The repair was mechanical — all repository signatures already
accepted `session?: ClientSession` (per G.W3 Lane E); `createVersionRecord`
already accepted `session?: ClientSession` (per E.W2 Lane B); the only
work was wrapping the two call sites and threading the session through.

One minor structural observation worth flagging (NOT a defer — surfacing
per the "report it, do not improvise" rule): `patchPalette` now opens a
transaction even when content is unchanged (just `tags` or `updatedAt`
mutation). That's a single-statement transaction — cheap on a replica
set, but technically a small overhead vs. a bare `updateOne`. The
alternative (branch on `contentChanged` and only wrap when true) would
fork the call-site, which we judged uglier. If a future audit flags the
overhead, the optimization is a 4-line conditional — but until then, the
uniform wrap is the idiomatic shape.

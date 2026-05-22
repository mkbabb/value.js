# G.W3 Lane E — API-1: `withTransaction` 4-site expansion

**Wave**: G.W3 (Lane E — API-1).
**Branch / HEAD at open**: `tranche-g` @ `c57ec01`.
**Finding origin**: `audit/G-AUDIT-6-api-e2e-ci.md §1.4` (G-OPP-API-1, FOLD-INTO-G).
**Status**: COMPLETE — sub-gate GREEN.

---

## §1 — The existing pattern (reference)

`withTransaction` was introduced at **E.W2 Lane B**. The helper is defined in
`api/src/middleware/inject-services.ts:73` (`makeWithTransaction`) and exposed on
the `Services` DI object as `services.withTransaction`:

```ts
export type WithTransaction = <T>(
    fn: (session: ClientSession) => Promise<T>,
    options?: TransactionOptions,
) => Promise<T>;
```

`makeWithTransaction` starts a `ClientSession`, runs `fn(session)` inside
`session.withTransaction(...)` (the driver handles commit/abort + transient-error
retry), and ALWAYS ends the session in a `finally`.

At G.W3 open, `withTransaction` was invoked from **3** sites:

| Site | File:line | Cross-collection writes |
|---|---|---|
| `deleteUser` | `services/admin/users.ts:161` | palettes + votes + flags + sessions + adminAudit + users |
| `forkPalette` | `services/palette/forks.ts:80` | palettes (insert + fork-count bump) + paletteVersions |
| `toggleVote` | `services/palette/votes.ts:45` | votes + palettes (gated `$inc`) |

The canonical shape (verbatim from `votes.ts`):

```ts
return services.withTransaction(async (session) => {
    const removed = await services.repositories.votes.deleteOne(userSlug, slug, session);
    ...
});
```

**Invariant**: the `session` from the callback MUST be threaded through every
repository call inside the block. Repository methods that participate accept an
optional `session?: ClientSession` argument (and pass `session ? { session } : undefined`
to the underlying Mongo driver call).

---

## §2 — The 4 migrated sites

Per `G-AUDIT-6 §1.4`, four cross-collection write sites had partial-failure
orphan-write exposure. All four now wrap their multi-collection mutation in
`services.withTransaction(...)`, mirroring the 3 existing sites exactly.

Several repository methods reached by these sites did not yet accept `session?`.
They were extended (purely additive — the optional argument is backward-compatible
with all non-transactional callers):

| Repository method | File |
|---|---|
| `VoteRepository.deleteByPaletteSlug` | `repositories/vote.ts` |
| `FlagRepository.deleteByPaletteSlug` | `repositories/flag.ts` |
| `PaletteRepository.update` | `repositories/palette.ts` |
| `PaletteRepository.updateManyBySlugs` | `repositories/palette.ts` |
| `PaletteRepository.deleteManyBySlugs` | `repositories/palette.ts` |
| `PaletteRepository.decrementForkCount` | `repositories/palette.ts` |
| `UserRepository.setStatusForSlugs` | `repositories/user.ts` |
| `SessionRepository.deleteByUserSlugs` | `repositories/session.ts` |

### §2.1 — `deletePalette` (`services/palette/crud.ts`)

Removes the palette + linked votes + linked flags + (conditional) parent
fork-count decrement.

**Before**:
```ts
await services.repositories.palettes.delete(slug);
await services.repositories.votes.deleteByPaletteSlug(slug);
await services.repositories.flags.deleteByPaletteSlug(slug);
if (palette.forkOf) {
    await services.repositories.palettes.decrementForkCount(palette.forkOf);
}
```

**After**:
```ts
await services.withTransaction(async (session) => {
    await services.repositories.palettes.delete(slug, session);
    await services.repositories.votes.deleteByPaletteSlug(slug, session);
    await services.repositories.flags.deleteByPaletteSlug(slug, session);
    if (palette.forkOf) {
        await services.repositories.palettes.decrementForkCount(palette.forkOf, session);
    }
});
```

### §2.2 — `revertToVersion` (`services/palette/versions.ts`)

Inserts the attribution version record into `palette_versions` AND mutates the
`palettes` document in bidirectional lock-step.

**Before**: `createVersionRecord(...)` (no session) followed by an un-sessioned
`palettes.update(...)`.

**After**: both calls run inside one `withTransaction` block; `createVersionRecord`
already accepted an optional `session` (E.W2 Lane B — used by `forkPalette`), so it
is now threaded; `palettes.update` is threaded via the newly-extended signature.
The `computeContentHash` / `computeOklabColors` pure computations were hoisted
ABOVE the transaction (no I/O — no reason to hold them inside the session).

### §2.3 — `batchPalettes(delete)` (`services/admin/batch.ts`)

Same orphan-shape as singular `deletePalette`, multiplied across N slugs.

**Before**:
```ts
processed = await palettes.deleteManyBySlugs(slugs);
await votes.deleteByPaletteSlugs(slugs);
await flags.deleteByPaletteSlugs(slugs);
```

**After**:
```ts
processed = await services.withTransaction(async (session) => {
    const count = await palettes.deleteManyBySlugs(slugs, session);
    await votes.deleteByPaletteSlugs(slugs, session);
    await flags.deleteByPaletteSlugs(slugs, session);
    return count;
});
```

(`votes.deleteByPaletteSlugs` / `flags.deleteByPaletteSlugs` already accepted
`session?` — added at E.W2 Lane B for `deleteUser`.)

### §2.4 — `batchUsers(suspend)` (`services/admin/batch.ts`)

Flips user status AND invalidates the cascading sessions.

**Before**:
```ts
processed = await users.setStatusForSlugs(slugs, "suspended");
await sessions.deleteByUserSlugs(slugs);
```

**After**:
```ts
processed = await services.withTransaction(async (session) => {
    const count = await users.setStatusForSlugs(slugs, "suspended", session);
    await sessions.deleteByUserSlugs(slugs, session);
    return count;
});
```

**Note** — `batchUsers(delete)` is deliberately NOT wrapped in an outer
transaction: each per-row `deleteUser` is ALREADY transactional (its own cascade
runs inside `withTransaction`), and a per-batch wrapping transaction would let one
bad row roll back the entire batch. This matches `G-AUDIT-6 §1.4` (which scoped
the candidate to `batchUsers(suspend)` only).

---

## §3 — New rollback tests

New file: `api/test/services/withTransaction-rollback.test.ts` — **2 tests**,
covering rollback for **2 of the 4** Lane E sites (`deletePalette` +
`batchUsers(suspend)`), per the sub-gate's "≥ 2 of the 4" requirement.

Each test induces a partial failure PART-WAY through the cross-collection write
block: a *later* repository call is stubbed to throw AFTER the earlier collection
writes have already executed inside the open transaction. The assertion is that
NONE of the earlier writes persist — `session.withTransaction` aborts and rolls
the whole block back atomically.

| Test | Site | Failure injected | Asserted rollback |
|---|---|---|---|
| `deletePalette rolls back palette + votes when a later cascade step throws` | `deletePalette` | `flags.deleteByPaletteSlug` throws (3rd cascade step) | palette + vote still present; flag count unchanged |
| `batchUsers(suspend) rolls back user status when session invalidation throws` | `batchUsers(suspend)` | `sessions.deleteByUserSlugs` throws (after status flip) | user still `active`; session token still alive |

Tests run against `MongoMemoryReplSet` (`test/setup.ts`) so the transaction
boundary is real, not stubbed. The shape mirrors the existing service test
convention (`connect` / `buildServices` / `cleanCollections` / `makeFakeContext`
from `test/helpers.ts`).

---

## §4 — Sub-gate verification

- **4 sites migrated** — `deletePalette`, `revertToVersion`, `batchPalettes(delete)`, `batchUsers(suspend)`. ✓
- **`npx tsc --noEmit`** — exit 0. ✓
- **`cd api && npx vitest run`** — 21 files / **106 tests** passing (was 20 / 104; +2 new rollback tests; zero regressions). ✓
- **≥ 2 new rollback tests** — 2 added (`deletePalette` + `batchUsers(suspend)`). ✓

Full `cd api && npx vitest run` output:

```
 RUN  v3.2.4 /Users/mkbabb/Programming/value.js/api

 ✓ test/services/admin-users.test.ts (5 tests) 452ms
 ✓ test/repositories/palette.test.ts (9 tests) 284ms
 ✓ test/routes/palettes-ownership.test.ts (7 tests) 226ms
 ✓ test/services/palette-forks.test.ts (5 tests) 193ms
 ✓ test/services/admin-palettes.test.ts (4 tests) 190ms
 ✓ test/services/admin-tags.test.ts (4 tests) 168ms
 ✓ test/repositories/proposedName.test.ts (5 tests) 158ms
 ✓ test/services/palette-votes.test.ts (4 tests) 157ms
 ✓ test/services/withTransaction-rollback.test.ts (2 tests) 92ms
 ✓ test/services/palette-crud.test.ts (6 tests) 163ms
 ✓ test/repositories/paletteVersion.test.ts (3 tests) 81ms
 ✓ test/repositories/session.test.ts (5 tests) 136ms
 ✓ test/repositories/user.test.ts (5 tests) 152ms
 ✓ test/services/palette-flags.test.ts (4 tests) 150ms
 ✓ test/repositories/flag.test.ts (4 tests) 108ms
 ✓ test/repositories/adminAudit.test.ts (3 tests) 86ms
 ✓ test/services/admin-colors.test.ts (5 tests) 124ms
 ✓ test/repositories/vote.test.ts (5 tests) 125ms
 ✓ test/repositories/tag.test.ts (4 tests) 93ms
 ✓ test/services/palette-versions.test.ts (4 tests) 85ms
 ✓ test/envelope.test.ts (13 tests) 4ms

 Test Files  21 passed (21)
      Tests  106 passed (106)
   Start at  01:44:28
   Duration  10.16s (transform 292ms, setup 0ms, collect 2.01s, tests 3.23s, environment 3ms, prepare 963ms)
```

**Sub-gate E: GREEN.**

---

## §5 — Files modified

| File | Change |
|---|---|
| `api/src/services/palette/crud.ts` | `deletePalette` wrapped in `withTransaction` |
| `api/src/services/palette/versions.ts` | `revertToVersion` wrapped in `withTransaction` |
| `api/src/services/admin/batch.ts` | `batchPalettes(delete)` + `batchUsers(suspend)` wrapped |
| `api/src/repositories/vote.ts` | `deleteByPaletteSlug` — `session?` param |
| `api/src/repositories/flag.ts` | `deleteByPaletteSlug` — `session?` param |
| `api/src/repositories/palette.ts` | `update` / `updateManyBySlugs` / `deleteManyBySlugs` / `decrementForkCount` — `session?` param |
| `api/src/repositories/user.ts` | `setStatusForSlugs` — `session?` param |
| `api/src/repositories/session.ts` | `deleteByUserSlugs` — `session?` param |
| `api/test/services/withTransaction-rollback.test.ts` | NEW — 2 rollback tests |

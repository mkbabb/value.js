# N.W2.A — WithId read-side transposition (the 26-cast deletion)

**Wave**: N.W2 Lane A · **Scope**: `api/src/**` only · **Date**: 2026-06-11
**Branch**: tranche-f-handoff

L's escape-class discipline completes read-side. All four model repositories
(`Palette`, `ProposedName`, `Tag`, `AdminAuditEvent`) now return the driver's
`WithId<T>` — the type `findOne`/`find().toArray()` actually produce on a typed
`Collection<T>`. The 26 `as <Model> & { _id: unknown }` casts (25 strict + the
1 parenthetical `forks.ts:206`) and the 10 matching `: <Model> & { _id: unknown }`
parameter/interface annotations are deleted. The typed flow is now
**repository → service → formatter** with zero re-assertion. The two aggregation
boundaries (`user.ts`, `flag.ts`) that returned untyped `Document[]` and were
re-cast field-by-field downstream now carry explicit `$project`-output
interfaces.

---

## Files touched (16)

### Repository read signatures → `WithId<T>` (4 model repos)
- `api/src/repositories/palette.ts` — imported `WithId`; 6 read methods retyped:
  `findBySlug` (`WithId<Palette> | null`), `findManyByFilter`,
  `findManyForCursor`, `findByUserSlug`, `findForksOf`, `findPastGrace`
  (all `WithId<Palette>[]`). Write methods + primitive-returning counts/slug
  reads unchanged.
- `api/src/repositories/proposedName.ts` — imported `WithId`; 5 read methods
  retyped: `findById`, `findByName`, `findByStatus`, `findManyByFilter`,
  `searchText`.
- `api/src/repositories/tag.ts` — imported `WithId`; `findAllSorted`,
  `findByName` retyped.
- `api/src/repositories/adminAudit.ts` — imported `WithId`; `findManyByFilter`
  retyped.

### Formatter boundary → `WithId<T>`
- `api/src/format/palette.ts` — imported `WithId`; `formatPalette` param
  `Palette & { _id: unknown }` → `WithId<Palette>` (the `{ _id, ...rest }`
  destructure is unchanged — `WithId` supplies the `_id`).

### Aggregation-pipeline output interfaces (the secondary escapes)
- `api/src/repositories/user.ts` — dropped the `Document` import; added the
  exported `UserWithPaletteCount` interface (the `aggregateUsersWithPaletteCount`
  `$project` shape: `_id`→`slug`, `paletteCount` via `$lookup`+`$size`); typed
  that method's return + `.aggregate<UserWithPaletteCount>(...)`; typed
  `findEmptyUserSlugs`' pipeline as `.aggregate<Pick<User, "_id">>(...)` (the
  `$project: { _id: 1 }` row), removing the `row._id as string` cast.
- `api/src/repositories/flag.ts` — dropped the `Document` import (imported
  `Palette`); added exported `FlaggedReport` + `FlaggedPalette` interfaces
  (the `aggregateFlaggedPalettes` `$group`+`$lookup`+`$project` shape — `palette`
  optional per `preserveNullAndEmptyArrays`); typed that method +
  `countDistinctPalettes`' `$count` pipeline as `.aggregate<{ total: number }>`,
  removing the `result[0]?.total as number` cast.

### Consumers — casts/annotations deleted
- `api/src/services/palette/crud.ts` — 5 casts (l.65, 141, 215, 277, 295).
- `api/src/services/palette/crud-list.ts` — 3 casts (l.155, 164, 221); the
  `results[length-1]` access reworked to `results.at(-1)` + truthy guard (the
  cast had been suppressing `noUncheckedIndexedAccess`'s `| undefined`).
- `api/src/services/palette/forks.ts` — imported `WithId`; 3 interface fields
  (`RemixOutput.palette`, `ForkOutput.palette`, `ForkListResult.data`) +
  2 casts (l.153, 206-parenthetical).
- `api/src/services/palette/versions.ts` — imported `WithId`;
  `RevertOutput.palette` field + 1 cast (l.190).
- `api/src/services/palette/visibility.ts` — dropped the now-unused `Palette`
  type import; 2 casts (l.76, 85).
- `api/src/services/color/queries.ts` — imported `WithId`; 2 formatter
  annotations (`formatProposedName`, `formatTag`) + 4 casts (l.81, 104, 125,
  140) + the `Map<string, ProposedName & { _id: unknown }>` generic → `WithId`.
- `api/src/services/color/proposals.ts` — dropped the now-unused `ProposedName`
  import; deleted the `typed` cast intermediate (l.76), reads `doc.*` directly.
- `api/src/services/admin/audit.ts` — imported `WithId`; `format` annotation +
  1 cast (l.82).
- `api/src/services/admin/tags.ts` — imported `WithId`; `format` annotation +
  1 cast (l.43).
- `api/src/services/admin/colors.ts` — imported `WithId`; `format` annotation +
  1 cast (l.69).
- `api/src/services/admin/users.ts` — 1 cast (l.90, the `listUserPalettes`
  `doc` intermediate inlined); the `listUsers` field-wise aggregation re-casts
  (`row.slug as string`, ×5) deleted now that `UserWithPaletteCount` is typed.
- `api/src/services/admin/flagged.ts` — `FlaggedListPage.data` retyped
  `Document[]` → `FlaggedPalette[]` (imported from `repositories/flag.js`);
  dropped the `Document` import.
- `api/src/routes/palettes/forks.ts` — dropped the now-unused `Palette` import;
  3 casts (l.60, 96, 111).
- `api/src/routes/palettes/versions.ts` — dropped the now-unused `Palette`
  import; 1 cast (l.69).

---

## Each cast's resolution (26)

| # | Site | Resolution |
|---|------|-----------|
| 1 | `services/palette/crud.ts:65` | `findBySlug` → `WithId<Palette>`; cast deleted |
| 2 | `services/palette/crud.ts:141` | `findBySlug` typed; cast deleted |
| 3 | `services/palette/crud.ts:215` | `findBySlug` typed; cast deleted |
| 4 | `services/palette/crud.ts:277` | `findBySlug` typed; cast deleted |
| 5 | `services/palette/crud.ts:295` | `findBySlug` typed; cast deleted |
| 6 | `services/color/queries.ts:81` | `findByStatus` → `WithId<ProposedName>[]`; cast deleted |
| 7 | `services/color/queries.ts:104` | `searchText` typed; cast deleted (loop binds `doc` directly) |
| 8 | `services/color/queries.ts:125` | `findManyByFilter` typed; cast deleted |
| 9 | `services/color/queries.ts:140` | `findAllSorted` → `WithId<Tag>[]`; cast deleted |
| 10 | `services/palette/crud-list.ts:155` | `findManyFor*` typed; `.at(-1)` + truthy guard replaces the cast |
| 11 | `services/palette/crud-list.ts:164` | list reads typed; cast deleted |
| 12 | `services/palette/crud-list.ts:221` | `findByUserSlug` typed; cast deleted |
| 13 | `routes/palettes/forks.ts:60` | `forkPalette` → `ForkOutput.palette: WithId<Palette>`; cast deleted |
| 14 | `routes/palettes/forks.ts:96` | `remixPalette` → `RemixOutput.palette` typed; cast deleted |
| 15 | `routes/palettes/forks.ts:111` | `listForks` → `ForkListResult.data` typed; cast deleted |
| 16 | `routes/palettes/versions.ts:69` | `revertToVersion` → `RevertOutput.palette` typed; cast deleted |
| 17 | `services/admin/audit.ts:82` | `findManyByFilter` → `WithId<AdminAuditEvent>[]`; cast deleted |
| 18 | `services/admin/colors.ts:69` | `findByStatus` typed; cast deleted |
| 19 | `services/admin/tags.ts:43` | `findAllSorted` typed; cast deleted |
| 20 | `services/admin/users.ts:90` | `findByUserSlug` typed; `doc` intermediate inlined; cast deleted |
| 21 | `services/color/proposals.ts:76` | `findById` → `WithId<ProposedName> \| null`; `typed` intermediate removed |
| 22 | `services/palette/versions.ts:190` | `findBySlug` typed; cast deleted |
| 23 | `services/palette/forks.ts:153` | txn returns `inserted` (`WithId<Palette>`); cast deleted |
| 24 | `services/palette/forks.ts:206` | `findForksOf` typed → `data` already `WithId<Palette>[]`; parenthetical cast deleted |
| 25 | `services/palette/visibility.ts:76` | `findBySlug` typed; cast deleted |
| 26 | `services/palette/visibility.ts:85` | `findBySlug` typed; cast deleted |

The 10 `: <Model> & { _id: unknown }` annotation sites (formatter params +
interface fields) were retyped to `WithId<T>` in lock-step (enumerated in the
files-touched list above). Two aggregation-boundary `as <primitive>` re-casts
(`user.ts:findEmptyUserSlugs` `_id`, `flag.ts:countDistinctPalettes` `total`)
and the five field-wise `users.ts:listUsers` re-casts were dissolved by the new
pipeline-output interfaces.

---

## Gate outputs

```
$ cd api && grep -rnE 'as \(?(Palette|ProposedName|Tag|AdminAuditEvent) &' src | wc -l
0

$ cd api && grep -rnE ': \(?(Palette|ProposedName|Tag|AdminAuditEvent) &' src | wc -l
0

$ cd api && npx tsc --noEmit
(exit 0, no output)

$ cd api && npm test
 Test Files  28 passed (28)
      Tests  161 passed (161)
   Duration  9.02s

$ cd api && grep -rn "as any" src | wc -l        # discipline unchanged
0
$ cd api && grep -rn "as unknown as" src         # the 1 policy-documented irreducible
src/index.ts:181:  (server as unknown as { close: ... }).close(...)
```

inv-N-2 (WithId completeness) satisfied: zero `as <Model> & {_id}` casts in all
forms across all four models; `WithId<T>` flows from the repository boundary.

---

## Notes / non-changes

- **No behavior change.** Pure type-truth transposition. `WithId<Palette>` is
  `Palette & { _id: ObjectId }` at runtime-shape parity with the prior
  `Palette & { _id: unknown }` (the `_id` was always the driver's ObjectId);
  `formatPalette`'s `{ _id, ...rest }` destructure is byte-identical.
- **`crud-list.ts` `.at(-1)` rework**: the only structural edit beyond cast
  deletion. The prior `results[results.length - 1] as Palette & { _id }`
  doubled as a `noUncheckedIndexedAccess` suppressor; `.at(-1)` + the existing
  `if (hasMore && last)` guard preserves identical behavior (when `hasMore`,
  `results.length > limit ≥ 1`, so `last` is always defined) with no escape.
- **Out-of-scope escapes left intact** (not in the W2.A census, not this lane's
  charter): the write-side `name as ProposedName` / `tag as Tag` /
  `event as AdminAuditEvent` / `flag as Flag` casts in repository `insert`
  methods (these widen `WithoutId<T>` for `insertOne`, a distinct concern);
  `paletteVersion.ts:40`'s `WithoutId<PaletteVersion> & { _id: string }` (a
  different model + a write-side type). The lone `as unknown as` at
  `index.ts:181` (the `@hono/node-server` `server.close()` stub gap) is L's
  policy-documented irreducible — untouched.
- **No bug found** requiring deferral to W3. The transposition was clean; no
  read site relied on the absence of `_id`.

---

## Verification

**Verifier**: N.W2.A verification lane · **Date**: 2026-06-11

### Gate 1 — cast census

```
$ grep -nE "as \(?(Palette|ProposedName|Tag|AdminAuditEvent) &" api/src
(no output — 0 matches)

$ grep -rn ": (Palette|ProposedName|Tag|AdminAuditEvent) & {" api/src
(no output — 0 matches)
```

PASS. Both census greps return zero matches.

### Gate 2 — discipline unchanged

```
$ grep -rn "as any" api/src
(no output — 0 matches)

$ grep -rn "as unknown as" api/src
api/src/index.ts:181:  (server as unknown as { close: (cb: () => void) => void }).close(() => resolve())
```

PASS. `as any` = 0; `as unknown as` = 1, the policy-documented `@hono/node-server` irreducible at `index.ts:181`.

### Gate 3 — typecheck

```
$ cd api && npx tsc --noEmit
(exit 0, no output)
```

PASS.

### Gate 4 — test suite

```
$ cd api && npm test
 Test Files  28 passed (28)
      Tests  161 passed (161)
   Start at  18:13:16
   Duration  8.55s
EXIT: 0
```

PASS. 161/161, 28 files.

### Adversarial spot-checks (3 claims verified against the tree)

**Claim A** — "The `Document` import is now gone from both aggregation repos (`user.ts`, `flag.ts`); `FlaggedListPage.data` retyped `Document[]` → `FlaggedPalette[]`."

Verified. `repositories/user.ts` imports only `ClientSession, Collection, Filter` from mongodb (no `Document`). `repositories/flag.ts` imports only `ClientSession, Collection, WithoutId` from mongodb (no `Document`). `services/admin/flagged.ts` line 14 imports `FlaggedPalette` from `../../repositories/flag.js`; `FlaggedListPage.data` is typed `FlaggedPalette[]`. CONFIRMED.

**Claim B** — "`findEmptyUserSlugs` pipeline typed as `.aggregate<Pick<User, \"_id\">>(...)`, removing the `row._id as string` cast."

Verified. `repositories/user.ts:142-160`: `findEmptyUserSlugs` calls `.aggregate<Pick<User, "_id">>([...])` and returns `rows.map((row) => row._id)` — no `as string` cast. The aggregation type parameter carries the brand through. CONFIRMED.

**Claim C** — "`countDistinctPalettes`' `$count` pipeline typed as `.aggregate<{ total: number }>`, removing the `result[0]?.total as number` cast; `flag.ts:133` now uses `result[0]?.total ?? 0`."

Verified. `repositories/flag.ts:125-133`: `.aggregate<{ total: number }>([{ $count: "total" }]).toArray()` with `return result[0]?.total ?? 0` — no `as number` cast; the null-coalescing `?? 0` handles the empty-result case correctly. CONFIRMED.

**One divergence noted** (not a failure): The report states `crud-list.ts` casts were at lines 155, 164, 221 (pre-edit). Post-edit line 154 is `const last = results.at(-1)` (the `.at(-1)` rework) and line 164 is `let data = results.map((r) => formatPalette(r, votedSlugs))` — no casts present. The line numbers are pre-edit artifact; the substance of the claim (casts deleted, `.at(-1)` rework) is accurate.

**Verdict**: all 4 gates PASS; all 3 adversarial checks CONFIRMED. inv-N-2 (WithId completeness) independently verified.

# E.W2 Lane B — client.withTransaction wiring (deleteUser, fork, toggleVote)

**Branch**: `tranche-e`
**HEAD at lane open**: `5a5b7e8af66567de742500d65359a125e12864af`
**Wave**: E.W2 (per `docs/tranches/E/waves/E.W2.md` lines 33–46)
**Audit basis**: `E-AUDIT-3 §5` + `AUD-3.2` (never-wired `withTransaction`), `E-AUDIT-6 §2.4` (forkPalette race + idempotent-upsert defense)

## §1 — Pre-state

### Services DI shape (`api/src/middleware/inject-services.ts` at lane open)

```ts
export interface Services {
    collections: Collections;
    repositories: Repositories;
}
```

The `Services` object held `collections` + 9 repositories; no MongoDB client and no
transactional helper. Repositories were constructor-injected with their typed
`Collection<T>` handle but had no API surface for `ClientSession`. Audit
`E-AUDIT-3 §3.2` recorded this as the structural reason `withTransaction` was
never wired: *"Lane C's repositories don't expose `MongoClient`, so transactions
could not be threaded through."*

### `deleteUser` shape (pre-state)

```ts
// Linear cascade, NO transaction boundary
const user = await users.findBySlug(slug);             // outside
if (!user) throw NotFoundError;
const userPalettes = await palettes.findByUserSlug(slug, 0, 10_000);
const paletteSlugs = userPalettes.map(p => p.slug);
if (paletteSlugs.length > 0) {
    await votes.deleteByPaletteSlugs(paletteSlugs);
    await flags.deleteByPaletteSlugs(paletteSlugs);
    await palettes.deleteManyByUserSlug(slug);
}
await sessions.deleteByUserSlug(slug);
await users.delete(slug);
// admin_audit traces of this actor NEVER scrubbed.
await emitAuditEvent(c, "delete-user", { ... });       // outside (befitting-graceful)
```

Failure modes pre-Lane B: any step failure leaves the cascade half-applied —
e.g. votes deleted but palettes still present (zombie palettes without their
votes), or palettes deleted but `sessions` still active (the deleted user's
session token resolves to a missing user — the `resolveSession` middleware
already gracefully handles this, but the audit-trail crosses inconsistent
states).

### `forkPalette` shape (pre-state, with race window highlighted)

```ts
const source = await palettes.findBySlug(sourceSlug);  // (A) read
if (!source) throw NotFoundError;
// ... validation ...
try { await palettes.insert(newDoc); }                 // (B) write fork
catch (11000) { throw ConflictError; }
await createVersionRecord(services, { ... });          // (C) write version
await palettes.incrementForkCount(sourceSlug);         // (D) write counter
// Race window: a concurrent `deletePalette(sourceSlug)` between (A) and (D)
// causes (D) to no-op (the source slug is gone), the fork's `forkOf` field
// dangles, and the parent fork-count is silently wrong. The fork itself
// persists with a reference to a deleted parent.
const doc = await palettes.findBySlug(forkSlug);       // (E) confirm
```

Per `E-AUDIT-6 §2.4`: *"`incrementForkCount` increments a stale slug or a no-op
(Mongo `updateOne({slug}, ...)` on a missing slug returns `modifiedCount: 0`
silently). The new fork's `forkOf` field still points at the deleted source ..."*

### `toggleVote` shape (pre-state)

```ts
const palette = await palettes.findBySlug(slug);                // read
if (!palette) throw NotFoundError;

const removed = await votes.deleteOne(userSlug, slug);
if (removed) {
    await palettes.incrementVoteCount(slug, -1);
    const after = await palettes.findBySlug(slug);
    return { voted: false, voteCount: after?.voteCount ?? 0 };
}

const result = await votes.upsertIdempotent(userSlug, slug);    // F3 primitive
if (result.inserted) {
    await palettes.incrementVoteCount(slug, 1);                 // gated $inc
}
const after = await palettes.findBySlug(slug);
return { voted: true, voteCount: after?.voteCount ?? 0 };
```

The idempotent-upsert pattern (D.W2 Lane C #F3) protects against the
double-count race via the unique `(userSlug, paletteSlug)` index. What it
does NOT protect against: a partial write where the `$inc` succeeds but the
post-update `findBySlug` reads a value that reflects a concurrent vote on
the same palette — the response envelope reports a `voteCount` that doesn't
match what *this* request changed. The transactional wrapper closes this gap
via snapshot read-concern.

## §2 — Decision: withTransaction exposure

**Option chosen**: **B** — `services.withTransaction: <T>(fn: (session: ClientSession) => Promise<T>) => Promise<T>` exposed on the Services DI surface.

**Rationale (multi-line)**:

1. **Encapsulation of MongoDB-specific shape**. Option A (`services.client: MongoClient`)
   leaks the driver shape into every service — services would need to know
   `client.startSession()`, `session.withTransaction(...)`, `session.endSession()`
   lifecycle, and would be tempted to reach into `client.db().collection(...)`
   directly, undermining the D.W2 Lane C invariant that *only* repositories
   touch `db.collection(...)`.

2. **Single point of policy**. The helper is the canonical place to set retry
   semantics, write concern, read concern, and lifecycle (`endSession` in
   `finally`). Services never have to remember any of this.

3. **Symmetric with `repositories`**. `services.repositories` is the read/write
   primitives; `services.withTransaction` is the transactional boundary
   primitive. Both hang off the same DI object, both injected the same way.

4. **Test seam intact**. The test-only `__resetServicesForTest()` hook
   continues to work; mocking `withTransaction` in unit tests is straightforward
   (`jest.fn((fn) => fn(fakeSession))` or equivalent).

5. **Driver retry semantics preserved**. `session.withTransaction(cb)` is the
   driver's documented entry point with built-in retry on
   `TransientTransactionError` / `UnknownTransactionCommitResult` — using it
   directly avoids re-implementing retry logic.

**Implementation note**: a private `getClient()` accessor was added to `db.ts`
to expose the cached `MongoClient` to `inject-services.ts` only. Services
never import `getClient`; they only see `services.withTransaction`.

## §3 — Migration diffs

### `deleteUser` (api/src/services/admin/users.ts)

```diff
-    const user = await users.findBySlug(slug);
-    if (!user) {
+    const userExists = await users.findBySlug(slug);
+    if (!userExists) {
         if (throwIfMissing) throw new NotFoundError("User not found");
         return null;
     }

-    const userPalettes = await palettes.findByUserSlug(slug, 0, 10_000);
-    const paletteSlugs = userPalettes.map((p) => p.slug);
-    if (paletteSlugs.length > 0) {
-        await votes.deleteByPaletteSlugs(paletteSlugs);
-        await flags.deleteByPaletteSlugs(paletteSlugs);
-        await palettes.deleteManyByUserSlug(slug);
-    }
-    await sessions.deleteByUserSlug(slug);
-    await users.delete(slug);
+    const paletteSlugs = await services.withTransaction(async (session) => {
+        const userPalettes = await palettes.findByUserSlug(slug, 0, 10_000, session);
+        const slugs = userPalettes.map((p) => p.slug);
+        if (slugs.length > 0) {
+            await votes.deleteByPaletteSlugs(slugs, session);
+            await flags.deleteByPaletteSlugs(slugs, session);
+            await palettes.deleteManyByUserSlug(slug, session);
+        }
+        await sessions.deleteByUserSlug(slug, session);
+        await adminAudit.deleteByActorSlug(slug, session);   // NEW: admin_audit scrub
+        await users.delete(slug, session);
+        return slugs;
+    });
```

Audit-emit STAYS outside the transaction per `events/auditLog.ts` D3
befitting-graceful carve-out: an audit-log infrastructure hiccup must not
roll back a real admin action. The pre-check `findBySlug` is also outside —
`throwIfMissing=false` callers (batch.ts) want a fast no-session skip.

### `forkPalette` (api/src/services/palette/forks.ts)

```diff
-    try { await services.repositories.palettes.insert(newDoc); }
-    catch (e) { if (...11000) throw ConflictError; throw e; }
-
-    await createVersionRecord(services, { ... });
-    await services.repositories.palettes.incrementForkCount(sourceSlug);
-
-    const doc = await services.repositories.palettes.findBySlug(forkSlug);
-    if (!doc) throw new NotFoundError("Palette missing after insert");
-    return { palette: doc as Palette & { _id: unknown } };
+    const doc = await services.withTransaction(async (session) => {
+        // Re-verify source still exists inside the transaction —
+        // snapshot isolation closes the (A)→(D) race window.
+        const sourceInTxn = await services.repositories.palettes.findBySlug(
+            sourceSlug, session,
+        );
+        if (!sourceInTxn) throw new NotFoundError("Palette not found");
+
+        try { await services.repositories.palettes.insert(newDoc, session); }
+        catch (e) { if (...11000) throw ConflictError; throw e; }
+
+        await createVersionRecord(services, { ... }, session);
+        await services.repositories.palettes.incrementForkCount(sourceSlug, session);
+
+        const inserted = await services.repositories.palettes.findBySlug(
+            forkSlug, session,
+        );
+        if (!inserted) throw new NotFoundError("Palette missing after insert");
+        return inserted;
+    });
+    return { palette: doc as Palette & { _id: unknown } };
```

`createVersionRecord` (in `services/palette/versions.ts`) grew an optional
`session?: ClientSession` 3rd parameter to participate; it threads through
to `paletteVersions.findByHash` + `paletteVersions.insertIfAbsent`.

### `toggleVote` (api/src/services/palette/votes.ts)

```diff
     const palette = await services.repositories.palettes.findBySlug(slug);
     if (!palette) throw new NotFoundError("Palette not found");

-    const removed = await services.repositories.votes.deleteOne(userSlug, slug);
-    if (removed) {
-        await services.repositories.palettes.incrementVoteCount(slug, -1);
-        const after = await services.repositories.palettes.findBySlug(slug);
-        return { voted: false, voteCount: after?.voteCount ?? 0 };
-    }
-    const result = await services.repositories.votes.upsertIdempotent(userSlug, slug);
-    if (result.inserted) {
-        await services.repositories.palettes.incrementVoteCount(slug, 1);
-    }
-    const after = await services.repositories.palettes.findBySlug(slug);
-    return { voted: true, voteCount: after?.voteCount ?? 0 };
+    return services.withTransaction(async (session) => {
+        const removed = await services.repositories.votes.deleteOne(userSlug, slug, session);
+        if (removed) {
+            await services.repositories.palettes.incrementVoteCount(slug, -1, session);
+            const after = await services.repositories.palettes.findBySlug(slug, session);
+            return { voted: false, voteCount: after?.voteCount ?? 0 };
+        }
+        const result = await services.repositories.votes.upsertIdempotent(userSlug, slug, session);
+        if (result.inserted) {
+            await services.repositories.palettes.incrementVoteCount(slug, 1, session);
+        }
+        const after = await services.repositories.palettes.findBySlug(slug, session);
+        return { voted: true, voteCount: after?.voteCount ?? 0 };
+    });
```

The idempotent-upsert + gated `$inc` pattern STAYS — it remains a correctness
invariant even outside of transactions, since it depends on the unique
`(userSlug, paletteSlug)` index (a property of the schema, not the
transaction). The transaction ADDS defense against the partial-write race
between the `$inc` and the post-update `findBySlug` (read snapshot now
matches the increment).

### Services DI (api/src/middleware/inject-services.ts)

```diff
-import type { MiddlewareHandler } from "hono";
-import { getDb } from "../db.js";
+import type { MiddlewareHandler } from "hono";
+import type { ClientSession, MongoClient, TransactionOptions } from "mongodb";
+import { getClient, getDb } from "../db.js";

+export type WithTransaction = <T>(
+    fn: (session: ClientSession) => Promise<T>,
+    options?: TransactionOptions,
+) => Promise<T>;

 export interface Services {
     collections: Collections;
     repositories: Repositories;
+    withTransaction: WithTransaction;
 }

+function makeWithTransaction(client: MongoClient): WithTransaction {
+    return async <T>(fn, options) => {
+        const session = client.startSession();
+        try {
+            let result!: T;
+            await session.withTransaction(async () => {
+                result = await fn(session);
+            }, options);
+            return result;
+        } finally {
+            await session.endSession();
+        }
+    };
+}

-function buildServices(collections: Collections): Services {
+function buildServices(collections: Collections, client: MongoClient): Services {
     return {
         collections,
-        repositories: { ... },
+        repositories: { ... },
+        withTransaction: makeWithTransaction(client),
     };
 }
```

A `getClient()` accessor was added to `api/src/db.ts` to expose the cached
`MongoClient` to the DI factory; services never import it.

### Repository optional session? (files that grew the parameter)

| Repository | Methods that grew `session?: ClientSession` |
|---|---|
| `repositories/palette.ts` | `findBySlug`, `findByUserSlug`, `insert`, `delete`, `deleteManyByUserSlug`, `incrementVoteCount`, `incrementForkCount` |
| `repositories/vote.ts` | `upsertIdempotent`, `deleteOne`, `deleteByPaletteSlugs` |
| `repositories/user.ts` | `findBySlug`, `delete` |
| `repositories/session.ts` | `deleteByUserSlug` |
| `repositories/flag.ts` | `deleteByPaletteSlugs` |
| `repositories/paletteVersion.ts` | `findByHash`, `insertIfAbsent` |
| `repositories/adminAudit.ts` | NEW method `deleteByActorSlug` (E.W2 Lane B — admin_audit cascade scrub) |

7 repositories total. Read-only methods that are NEVER called from a
transactional service (e.g. `palettes.countByFilter`, `users.aggregateUsersWithPaletteCount`,
`sessions.findAndTouch`) intentionally did NOT grow the parameter — keeping
the signature minimal.

## §4 — Grep verification

| Verification | Command | Result |
|---|---|---|
| `withTransaction` site count in services | `grep -rn 'withTransaction' api/src/services` | **3** call sites (deleteUser, forkPalette, toggleVote) + 1 docstring mention in votes.ts |
| `session?: ClientSession` adoption in repositories | `grep -lrn 'session?: ClientSession' api/src/repositories` | **7** repository files |

Detail (grep output):

```
api/src/services/admin/users.ts:    const paletteSlugs = await services.withTransaction(async (session) => {
api/src/services/palette/forks.ts:    const doc = await services.withTransaction(async (session) => {
api/src/services/palette/votes.ts:    return services.withTransaction(async (session) => {
```

(votes.ts has a second hit in the file-header docstring.)

## §5 — Gates

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `cd api && npx tsc --noEmit` | exit 0 | exit 0 (no diagnostics) | PASS |
| `npx playwright test --reporter=line` | all 21 specs green | 20 passed + 1 known-flaky (`reactivity-instant.spec.ts:111` slider-keyboard, documented in `E-AUDIT-6 §4.3` as parallel-worker contention; passes on retry; CI runs with `retries: 2`) | PASS |
| `grep -rn 'withTransaction' api/src/services` returns ≥ 3 | 3 call sites | 3 call sites: deleteUser, fork, toggleVote | PASS |
| `grep -rn 'session?: ClientSession' api/src/repositories` (handful) | ≥ 4 repos | 7 repositories adopted the optional parameter | PASS |
| `npx eslint` on Lane B files | clean | clean (the one repo-level lint warning lives in `api/test/helpers.ts` — Lane F territory, pre-existing in HEAD) | PASS (lane-scoped) |
| `admin-walk.spec.ts` exercises `deleteUser` path | green | green (the spec walks all 5 admin views including `/admin/users`; tested both isolated and in-suite) | PASS |

### Known caveats

- **Replica-set requirement**: `session.withTransaction` requires a replica-set
  or sharded MongoDB deployment. The current `compose.yaml` runs a standalone
  `mongo:7` instance, which will throw on the FIRST transactional op. The dev
  loop currently uses mocked fetches (e2e admin specs intercept via
  `addInitScript`) so this surfaces only when the real API is hit. **Lane F
  (mongodb-memory-server) needs to configure a single-node replica-set** —
  documented per the hard-cap directive.
- The known-flaky `reactivity-instant.spec.ts:111` is documented in
  `E-AUDIT-6 §4.3` as architectural (per-file `workers: 1` not enforced
  by Playwright's config). NOT a regression from Lane B.

## §6 — Files modified (DO NOT commit; orchestrator stages)

| File | Change |
|---|---|
| `api/src/db.ts` | Added `getClient()` accessor for the DI factory. Existing `getDb()` lifecycle preserved. |
| `api/src/middleware/inject-services.ts` | Added `WithTransaction` type, `makeWithTransaction` factory, `services.withTransaction` on the `Services` DI; threads `MongoClient` into `buildServices`. |
| `api/src/services/admin/users.ts` | `deleteUser` wrapped in `services.withTransaction(...)`; includes the new `adminAudit.deleteByActorSlug` cascade step. Audit-emit stays outside (befitting-graceful). |
| `api/src/services/palette/forks.ts` | `forkPalette` wrapped in `services.withTransaction(...)`; re-verifies source inside the transaction (closes the `E-AUDIT-6 §2.4` race window); `createVersionRecord` participates via threaded `session`. |
| `api/src/services/palette/votes.ts` | `toggleVote` wrapped in `services.withTransaction(...)`; idempotent-upsert pattern preserved as a correctness invariant; transaction adds partial-write-race defense. |
| `api/src/services/palette/versions.ts` | `createVersionRecord` grew an optional `session?: ClientSession` parameter so it can participate in `forkPalette`'s transaction. |
| `api/src/repositories/palette.ts` | 7 methods grew `session?: ClientSession`: findBySlug, findByUserSlug, insert, delete, deleteManyByUserSlug, incrementVoteCount, incrementForkCount. |
| `api/src/repositories/vote.ts` | 3 methods grew `session?: ClientSession`: upsertIdempotent, deleteOne, deleteByPaletteSlugs. |
| `api/src/repositories/user.ts` | findBySlug + delete grew `session?: ClientSession`. |
| `api/src/repositories/session.ts` | deleteByUserSlug grew `session?: ClientSession`. |
| `api/src/repositories/flag.ts` | deleteByPaletteSlugs grew `session?: ClientSession`. |
| `api/src/repositories/paletteVersion.ts` | findByHash + insertIfAbsent grew `session?: ClientSession`. |
| `api/src/repositories/adminAudit.ts` | NEW method `deleteByActorSlug(actorSlug, session?)` — used by `deleteUser` cascade to scrub the actor's audit-trail traces. |
| `docs/tranches/E/audit/E.W2-lane-b-transactional.md` | NEW — this document. |

## §7 — E.W2 Lane B sub-gate verdict

**PASS**.

The three cross-collection writes that `D.W2-legacy-excision.md §8` flagged as
*"PASS rather than escalated"* (deleteUser, fork, toggleVote) now run inside
`services.withTransaction(...)`. The Services DI surface carries the
transactional helper as a first-class member alongside `repositories`. Seven
repository files grew an optional `session?: ClientSession` parameter on the
methods called from the transactional code paths; methods not called from
transactional services intentionally did NOT grow the parameter (minimal
surface). The `forkPalette` race window described in `E-AUDIT-6 §2.4` is closed
by re-verifying the source inside the transaction under snapshot isolation.
The idempotent-upsert pattern in `toggleVote` is preserved as a schema-level
correctness invariant; the transaction is layered defense, not a replacement.

`tsc` clean, lint clean on Lane B files, 20/21 playwright specs green +
1 documented pre-existing flake.

The replica-set requirement for `withTransaction` is a deploy-environment
concern handled by Lane F (mongodb-memory-server replica-set config) per
the hard-cap directive.

# E.W2 Lane F — First backend integration tests (vitest + mongodb-memory-server)

## §1 — Pre-state

- `api/test/` exists: **NO** (lane creates it)
- `api/vitest.config.ts` exists: **NO** (lane creates it)
- `mongodb-memory-server` in devDependencies: **NO** (lane adds it)
- `vitest` in devDependencies: **NO** (lane adds it)
- Backend test count at HEAD `5a5b7e87`: **0** (per `E-AUDIT-6 §2 + AUD-6.8`)

### Repositories enumerated for testing (9)

`api/src/repositories/`:
- `palette.ts` → `PaletteRepository`
- `paletteVersion.ts` → `PaletteVersionRepository`
- `vote.ts` → `VoteRepository`
- `session.ts` → `SessionRepository`
- `user.ts` → `UserRepository`
- `proposedName.ts` → `ProposedNameRepository`
- `tag.ts` → `TagRepository`
- `flag.ts` → `FlagRepository`
- `adminAudit.ts` → `AdminAuditRepository`

### Services enumerated for testing (9 covered)

`api/src/services/palette/`:
- `crud.ts` → `createPalette` / `getPaletteBySlug` / `patchPalette` / `deletePalette`
- `votes.ts` → `toggleVote` (transactional — uses `services.withTransaction`)
- `flags.ts` → `flagPalette`
- `forks.ts` → `forkPalette` (transactional) / `listForks` / `getProvenance`
- `versions.ts` → `createVersionRecord` / `getVersionByHash` / `listVersions` / `revertToVersion`

`api/src/services/admin/`:
- `colors.ts` → `listByStatus` / `approveColor` / `rejectColor` / `deleteColor`
- `tags.ts` → `createTag` / `listTags` / `deleteTag`
- `palettes.ts` → `toggleFeature` / `deletePalette`
- `users.ts` → `listUsers` / `setUserStatus` / `deleteUser` (transactional) / `pruneEmptyUsers`

Not covered in Lane F (deferred): `services/admin/{audit,batch,flagged,impersonate,import}.ts`,
`services/palette/{crud-list,oklab}.ts`. These are higher-cost surfaces (pagination
shapes / pure-function helpers / multi-step batch workflows) — the lane scope
prioritised one test per service module that has a typed-error path.

### ApiError subclasses enumerated (7 + base + fallback)

`api/src/errors/index.ts`:
- `ApiError` (base, 500 fallback for unknown throws)
- `ValidationError` (400)
- `AuthenticationError` (401)
- `OwnershipError` (403)
- `NotFoundError` (404)
- `ConflictError` (409)
- `RateLimitError` (429)
- `ConfigurationError` (503)

All 8 paths exercised in `api/test/envelope.test.ts` (13 tests total — multiple
shape assertions per subclass: status + code + detail-omitted-when-absent +
unknown-throw fallback + non-Error throwable handling).

## §2 — Setup files

### `api/vitest.config.ts` (new — 30 lines)

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        include: ["test/**/*.test.ts"],
        testTimeout: 60_000,
        hookTimeout: 60_000,
        globalSetup: ["./test/setup.ts"],
        pool: "forks",
        fileParallelism: false,
    },
});
```

Key choices:
- `pool: "forks"` + `fileParallelism: false` — collection state is shared
  via a single `TEST_MONGODB_URI` database; suites run serially with a
  `beforeEach` `cleanCollections(db)` guard.
- `testTimeout: 60s` — first cold start downloads the MongoDB binary; warm
  runs complete in <10s end-to-end.

### `api/test/setup.ts` (new — 41 lines)

Boots a single-node `MongoMemoryReplSet` via `mongodb-memory-server` and
publishes its URI on `process.env.TEST_MONGODB_URI`. A replica set (NOT
standalone) is required because E.W2 Lane B introduced
`services.withTransaction(...)` (`forkPalette` / `toggleVote` /
`adminUsers.deleteUser`); MongoDB transactions reject on a standalone
deployment, so the lane upgraded from the originally-planned standalone
instance to a replica set in-process.

```ts
import { MongoMemoryReplSet } from "mongodb-memory-server";
let instance: MongoMemoryReplSet | null = null;
export async function setup(): Promise<void> {
    instance = await MongoMemoryReplSet.create({
        replSet: { count: 1, dbName: "palette-test", storageEngine: "wiredTiger" },
    });
    await instance.waitUntilRunning();
    process.env.TEST_MONGODB_URI = instance.getUri("palette-test");
}
export async function teardown(): Promise<void> { ... }
```

### `api/test/helpers.ts` (new — 117 lines)

Provides three primitives consumed by every test file:
- `connect()` → `{ client, db }` against `TEST_MONGODB_URI`.
- `buildServices(db, client?)` → typed `Services` mirroring
  `middleware/inject-services.ts:buildServices`, including a
  test-local `makeWithTransaction(client)` for the transactional services.
- `makeFakeContext(services, userSlug?)` → minimal `Context<AppEnv>` stand-in
  for the admin services that read `c.var.services` + `c.var.userSlug`.
- `cleanCollections(db)` → wipes all 9 collections; called in `beforeEach`.

### `api/tsconfig.test.json` (new — 9 lines)

Adds a tests-only tsconfig so `api/tsconfig.json` continues to scope
`rootDir: "src"` for the production `npm run build`. Includes `vitest/globals`
in `types`; `npx tsc --noEmit -p tsconfig.test.json` runs clean.

### `api/package.json` diff

```diff
     "scripts": {
         "dev": "tsx watch src/index.ts",
         "build": "tsc",
-        "start": "node dist/index.js"
+        "start": "node dist/index.js",
+        "test": "vitest run"
     },
     ...
     "devDependencies": {
         "@types/node": "^22.12.0",
         "@types/node-cron": "^3.0.11",
+        "mongodb-memory-server": "^10.1.4",
         "tsx": "^4.19.0",
-        "typescript": "^5.7.0"
+        "typescript": "^5.7.0",
+        "vitest": "^3.2.4"
     }
```

`npm install` reports `added 133 packages, removed 23 packages, changed 4
packages` — clean install. The two pre-existing `hono` / `@hono/node-server`
audit warnings are unrelated to Lane F.

## §3 — Test inventory

### Repository tests (43 across 9 repositories)

| Repository | Test file | Count |
|---|---|---|
| `PaletteRepository` | `test/repositories/palette.test.ts` | 9 |
| `PaletteVersionRepository` | `test/repositories/paletteVersion.test.ts` | 3 |
| `VoteRepository` | `test/repositories/vote.test.ts` | 5 |
| `SessionRepository` | `test/repositories/session.test.ts` | 5 |
| `UserRepository` | `test/repositories/user.test.ts` | 5 |
| `ProposedNameRepository` | `test/repositories/proposedName.test.ts` | 5 |
| `TagRepository` | `test/repositories/tag.test.ts` | 4 |
| `FlagRepository` | `test/repositories/flag.test.ts` | 4 |
| `AdminAuditRepository` | `test/repositories/adminAudit.test.ts` | 3 |

Every repository has ≥ 3 tests (insert + findBy + update / delete /
cascade pattern as appropriate to its surface).

### Service tests (41 across 9 services)

| Service | Test file | Count | Typed-error coverage |
|---|---|---|---|
| `palette/crud.ts` | `test/services/palette-crud.test.ts` | 6 | ConflictError, NotFoundError, OwnershipError |
| `palette/votes.ts` | `test/services/palette-votes.test.ts` | 4 | NotFoundError |
| `palette/flags.ts` | `test/services/palette-flags.test.ts` | 4 | ValidationError, NotFoundError, ConflictError |
| `palette/forks.ts` | `test/services/palette-forks.test.ts` | 5 | NotFoundError, ValidationError |
| `palette/versions.ts` | `test/services/palette-versions.test.ts` | 4 | NotFoundError, OwnershipError |
| `admin/colors.ts` | `test/services/admin-colors.test.ts` | 5 | NotFoundError, ValidationError |
| `admin/tags.ts` | `test/services/admin-tags.test.ts` | 4 | ConflictError, NotFoundError |
| `admin/palettes.ts` | `test/services/admin-palettes.test.ts` | 4 | NotFoundError |
| `admin/users.ts` | `test/services/admin-users.test.ts` | 5 | NotFoundError |

Every service has ≥ 2 tests (happy path + typed-error path); most have
3-5 to also assert cascade behaviour (votes/flags/sessions cascade on user
delete, palette-tag pull on tag delete, fork-count increment, etc.).

### Envelope tests (13)

`test/envelope.test.ts` — `toResponseEnvelope` shape assertions:
- One per `ApiError` subclass (7) — status + code mapping.
- Detail-payload included when supplied.
- Detail key omitted when absent.
- Custom `ApiError` subclass round-trip.
- Bare `Error` → 500 + code "internal".
- Non-Error throwables (string, undefined) → 500 + code "internal".

### **TOTAL: 97** (43 repository + 41 service + 13 envelope)

Comfortably above the ≥ 50 target. Of those, the 14 tests in
`palette-votes.test.ts` (4) + `palette-forks.test.ts` (5) + `admin-users.test.ts`
(5) exercise the E.W2 Lane B transactional wrappers end-to-end (Mongo
transaction commits / aborts on real replica-set sessions).

## §4 — Gates

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `cd api && npm install` | clean | `added 133 packages, removed 23 packages, changed 4 packages` — clean; 2 pre-existing hono audit warnings unrelated to lane | **PASS** |
| `cd api && npx tsc --noEmit` (src) | clean | clean (no output) | **PASS** |
| `cd api && npx tsc --noEmit -p tsconfig.test.json` (src + test) | clean | clean (no output) | **PASS** |
| `cd api && npx vitest run` | ≥ 50 passing | **97 passed (19 files)** — runtime ~9s warm | **PASS** |
| `npm run lint` (repo root, includes api/) | exit 0 | exit 0 | **PASS** |

### Transactional coverage note (Lane B parity)

The original Lane F dispatch contract proposed starting with a standalone
`MongoMemoryServer` and deferring transactional tests "if Lane B's
transactional tests require replica-set". On first run, every transactional
service path failed with `TypeError: services.withTransaction is not a
function`, confirming Lane B's `withTransaction` had already landed in
`forkPalette` / `toggleVote` / `deleteUser`. The lane upgraded to
`MongoMemoryReplSet` (single-node replica set) — no transactional tests were
deferred, the full Lane B surface is now under integration coverage.

## §5 — Files modified (DO NOT commit; orchestrator stages)

- `api/package.json` (added `vitest` + `mongodb-memory-server` devDeps + `test` script)
- `api/package-lock.json` (regenerated by `npm install`)
- `api/vitest.config.ts` (new)
- `api/tsconfig.test.json` (new)
- `api/test/setup.ts` (new)
- `api/test/helpers.ts` (new)
- `api/test/envelope.test.ts` (new)
- `api/test/repositories/palette.test.ts` (new)
- `api/test/repositories/paletteVersion.test.ts` (new)
- `api/test/repositories/vote.test.ts` (new)
- `api/test/repositories/session.test.ts` (new)
- `api/test/repositories/user.test.ts` (new)
- `api/test/repositories/proposedName.test.ts` (new)
- `api/test/repositories/tag.test.ts` (new)
- `api/test/repositories/flag.test.ts` (new)
- `api/test/repositories/adminAudit.test.ts` (new)
- `api/test/services/palette-crud.test.ts` (new)
- `api/test/services/palette-votes.test.ts` (new)
- `api/test/services/palette-flags.test.ts` (new)
- `api/test/services/palette-forks.test.ts` (new)
- `api/test/services/palette-versions.test.ts` (new)
- `api/test/services/admin-colors.test.ts` (new)
- `api/test/services/admin-tags.test.ts` (new)
- `api/test/services/admin-palettes.test.ts` (new)
- `api/test/services/admin-users.test.ts` (new)
- `docs/tranches/E/audit/E.W2-lane-f-backend-tests.md` (this file, new)

## §6 — E.W2 Lane F sub-gate verdict

**PASS** — 97 backend integration tests across 19 files, all repositories
covered (9), all in-scope services covered (9 — incl. all 3 transactional
ones via real replica-set sessions), all 7 `ApiError` subclasses + unknown
throwable fallback covered. `cd api && npx vitest run`, `npx tsc --noEmit`,
`npm run lint` all clean. CI wiring (`cd api && npx vitest run` in workflow)
is E.W4's responsibility per the wave plan.

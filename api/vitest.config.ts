/**
 * Vitest config for the palette API (E.W2 Lane F — first backend integration
 * tests against an ephemeral mongodb-memory-server instance).
 *
 * - `environment: "node"` — Hono + mongodb driver run on Node, not jsdom.
 * - `testTimeout: 60s` — the first-ever `mongodb-memory-server` invocation
 *   downloads the MongoDB binary on cold caches; subsequent runs warm-start
 *   in <500ms.
 * - `globalSetup` boots one ephemeral MongoDB before the suite + tears down
 *   after; per-suite tests connect via `process.env.TEST_MONGODB_URI`.
 * - include spans BOTH the colocated per-domain suites (the module __tests__
 *   dirs, T.W1 Q17 colocation) AND the named cross-module test/conformance
 *   exception + the shared harness under test/. The build tsconfig excludes the
 *   module __tests__ dirs so these never emit to dist.
 * - `pool: "forks"` — each test file gets its own worker so the MongoClient
 *   singleton in `src/db.ts` doesn't leak across suites that intentionally
 *   exercise `getDb()`. (Most suites construct their own client; this guards
 *   the cases that don't.)
 * - `fileParallelism: false` — collection state is shared across the single
 *   `TEST_MONGODB_URI` database, so suites run serially to avoid races on
 *   per-test `deleteMany({})` cleanup.
 */

import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        include: ["src/**/__tests__/**/*.test.ts", "test/**/*.test.ts"],
        testTimeout: 60_000,
        hookTimeout: 60_000,
        globalSetup: ["./test/setup.ts"],
        pool: "forks",
        fileParallelism: false,
    },
});

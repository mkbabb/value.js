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
        include: ["test/**/*.test.ts"],
        testTimeout: 60_000,
        hookTimeout: 60_000,
        globalSetup: ["./test/setup.ts"],
        pool: "forks",
        fileParallelism: false,
    },
});

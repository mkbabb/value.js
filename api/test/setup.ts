/**
 * Vitest globalSetup — boots an ephemeral MongoDB replica-set instance for
 * the suite + exposes its connection URI via `process.env.TEST_MONGODB_URI`
 * (E.W2 Lane F).
 *
 * Replica set (not standalone): E.W2 Lane B introduced
 * `services.withTransaction(...)` for `forkPalette` / `toggleVote` /
 * `deleteUser`. MongoDB transactions require a replica-set (or sharded)
 * deployment — a standalone `mongod` rejects `session.startTransaction()`.
 * `MongoMemoryReplSet` boots a single-node replica set in-memory, which is
 * the canonical pattern for transactional tests against ephemeral Mongo.
 *
 * Lifetime:
 *   1. `setup()` — start the replica set, write URI to process.env.
 *   2. Tests connect via that URI, run, and clean up their own collections.
 *   3. `teardown()` — stop the replica set + wipe the URI.
 */

import { MongoMemoryReplSet } from "mongodb-memory-server";

let instance: MongoMemoryReplSet | null = null;

export async function setup(): Promise<void> {
    instance = await MongoMemoryReplSet.create({
        replSet: {
            count: 1,
            dbName: "palette-test",
            storageEngine: "wiredTiger",
        },
    });
    await instance.waitUntilRunning();
    process.env.TEST_MONGODB_URI = instance.getUri("palette-test");
}

export async function teardown(): Promise<void> {
    if (instance) {
        await instance.stop();
        instance = null;
    }
    delete process.env.TEST_MONGODB_URI;
}

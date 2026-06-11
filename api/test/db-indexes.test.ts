/**
 * db.ts index-topology regression (N.W3.C).
 *
 * Drives the REAL `getDb()` index-creation path against the ephemeral
 * replica set and asserts the index set via `listIndexes()`:
 *   - the `sessions.expiresAt` TTL index exists with `expireAfterSeconds: 0`
 *     (the contract §6 session reaper, now discharged by the DB engine);
 *   - the three `{deletedAt, visibility, <sortkey>}` browse compounds exist
 *     (the hottest read path is index-covered);
 *   - the three write-only `palette_versions` indexes were dropped;
 *   - the redundant `{lastSeenAt}` session-sweep index was dropped.
 *
 * `getDb()` reads `process.env.MONGODB_URI`; we point it at the ephemeral
 * replica-set URI for the duration of this file, then restore + `closeDb()`.
 */

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Db } from "mongodb";
import { getDb, closeDb } from "../src/db.js";

interface IndexInfo {
    name: string;
    key: Record<string, number | string>;
    expireAfterSeconds?: number;
}

async function indexesOf(db: Db, collection: string): Promise<IndexInfo[]> {
    return (await db.collection(collection).listIndexes().toArray()) as IndexInfo[];
}

describe("db.ts index topology", () => {
    let db: Db;
    let priorUri: string | undefined;

    beforeAll(async () => {
        priorUri = process.env.MONGODB_URI;
        const uri = process.env.TEST_MONGODB_URI;
        if (!uri) throw new Error("TEST_MONGODB_URI not set — globalSetup must run first");
        process.env.MONGODB_URI = uri;
        db = await getDb();
    });

    afterAll(async () => {
        await closeDb();
        if (priorUri === undefined) delete process.env.MONGODB_URI;
        else process.env.MONGODB_URI = priorUri;
    });

    it("sessions carries a TTL index on expiresAt (expireAfterSeconds: 0)", async () => {
        const idx = await indexesOf(db, "sessions");
        const ttl = idx.find((i) => i.key.expiresAt === 1 && "expireAfterSeconds" in i);
        expect(ttl).toBeDefined();
        expect(ttl?.expireAfterSeconds).toBe(0);
    });

    it("sessions no longer carries the redundant lastSeenAt sweep index", async () => {
        const idx = await indexesOf(db, "sessions");
        const lastSeen = idx.find(
            (i) => i.name !== "_id_" && i.key.lastSeenAt !== undefined && i.key.expiresAt === undefined,
        );
        expect(lastSeen).toBeUndefined();
    });

    it("palettes carries the three {deletedAt, visibility, <sortkey>} browse compounds", async () => {
        const idx = await indexesOf(db, "palettes");
        const hasCompound = (extra: Record<string, number>): boolean =>
            idx.some((i) => {
                const k = i.key;
                if (k.deletedAt !== 1 || k.visibility !== 1) return false;
                return Object.entries(extra).every(([field, dir]) => k[field] === dir);
            });
        // newest browse
        expect(hasCompound({ createdAt: -1 })).toBe(true);
        // popular browse
        expect(hasCompound({ voteCount: -1, createdAt: -1 })).toBe(true);
        // most-forked browse
        expect(hasCompound({ forkCount: -1, createdAt: -1 })).toBe(true);
    });

    it("palettes no longer carries the bare equality-prefix-less sort indexes", async () => {
        const idx = await indexesOf(db, "palettes");
        // A bare {createdAt:-1} with no deletedAt prefix is the retired index.
        const bareCreatedAt = idx.find(
            (i) => i.key.createdAt === -1 && i.key.deletedAt === undefined && i.key.voteCount === undefined && i.key.forkCount === undefined && i.key.userSlug === undefined,
        );
        expect(bareCreatedAt).toBeUndefined();
    });

    it("palette_versions keeps only {paletteSlug, createdAt}; the 3 write-only indexes are dropped", async () => {
        const idx = await indexesOf(db, "palette_versions");
        const keptCompound = idx.find(
            (i) => i.key.paletteSlug === 1 && i.key.createdAt === -1,
        );
        expect(keptCompound).toBeDefined();
        // The dropped trio: forkedFromHash, rootHash, authorSlug+createdAt.
        expect(idx.find((i) => i.key.forkedFromHash !== undefined)).toBeUndefined();
        expect(idx.find((i) => i.key.rootHash !== undefined)).toBeUndefined();
        expect(idx.find((i) => i.key.authorSlug !== undefined)).toBeUndefined();
        // Only _id + the kept compound remain.
        expect(idx).toHaveLength(2);
    });
});

/**
 * Transaction-rollback coverage for the G.W3 Lane E `withTransaction`
 * expansion.
 *
 * Each test induces a partial failure PART-WAY through a cross-collection
 * write block — a later repository call is stubbed to throw AFTER the
 * earlier collection writes have already executed inside the open
 * transaction. The assertion is that NONE of the earlier writes persist:
 * `session.withTransaction` must abort the transaction and roll the whole
 * block back atomically.
 *
 * Coverage: 2 of the 4 Lane E sites — `deletePalette` (palette + votes +
 * flags + parent fork-count) and `batchUsers(suspend)` (user status +
 * cascading session invalidation). The same pattern covers `revertToVersion`
 * and `batchPalettes(delete)`; these two are the representative pair the
 * sub-gate requires.
 *
 * Tests run against `MongoMemoryReplSet` (test/setup.ts) so the transaction
 * boundary is real, not stubbed.
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import {
    buildServices,
    cleanCollections,
    connect,
    makeFakeContext,
} from "../helpers.js";
import { createPalette, deletePalette } from "../../src/services/palette/crud.js";
import { batchUsers } from "../../src/services/admin/batch.js";
import type { Services } from "../../src/middleware/inject-services.js";

describe("withTransaction rollback (G.W3 Lane E)", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;

    beforeAll(async () => {
        ({ client, db } = await connect());
        await db.collection("palettes").createIndex({ slug: 1 }, { unique: true });
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        services = buildServices(db, client);
    });

    it("deletePalette rolls back palette + votes when a later cascade step throws", async () => {
        // Seed a palette plus a linked vote + flag.
        await createPalette(services, {
            body: {
                name: "Doomed",
                slug: "doomed",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: [],
            },
            sessionToken: "tok",
            userSlug: "alice",
        });
        await services.repositories.votes.upsertIdempotent("alice", "doomed");
        await services.repositories.flags.insert({
            paletteSlug: "doomed",
            reporterSlug: "bob",
            reason: "spam",
            detail: null,
            createdAt: new Date(),
        });

        // Force a partial failure: the flag-delete (the THIRD cascade step,
        // after the palette-delete + vote-delete have already run inside the
        // open transaction) throws. The transaction must abort.
        const realDeleteFlags =
            services.repositories.flags.deleteByPaletteSlug.bind(
                services.repositories.flags,
            );
        services.repositories.flags.deleteByPaletteSlug = () => {
            throw new Error("induced cascade failure");
        };

        await expect(deletePalette(services, { slug: "doomed" })).rejects.toThrow(
            "induced cascade failure",
        );

        // Restore the stub so the post-assertions read real state.
        services.repositories.flags.deleteByPaletteSlug = realDeleteFlags;

        // The palette + vote deletes that ran BEFORE the throw must have
        // rolled back — nothing was actually removed.
        expect(
            await services.repositories.palettes.findBySlug("doomed"),
        ).not.toBeNull();
        expect(
            await services.repositories.votes.findOne("alice", "doomed"),
        ).not.toBeNull();
        const flagCount = await services.repositories.flags.countDistinctPalettes();
        expect(flagCount).toBe(1);
    });

    it("batchUsers(suspend) rolls back user status when session invalidation throws", async () => {
        // Seed an active user plus an active session.
        await services.repositories.users.insert({
            _id: "alice",
            createdAt: new Date(),
            status: "active",
        });
        await services.repositories.sessions.insert({
            _id: "tok-1",
            ipHash: "ip",
            userSlug: "alice",
            createdAt: new Date(),
            lastSeenAt: new Date(),
            expiresAt: new Date(Date.now() + 60_000),
        });

        // Force a partial failure: the session-invalidation step (which runs
        // AFTER the user status flip inside the open transaction) throws.
        const realDeleteSessions =
            services.repositories.sessions.deleteByUserSlugs.bind(
                services.repositories.sessions,
            );
        services.repositories.sessions.deleteByUserSlugs = () => {
            throw new Error("induced session-cascade failure");
        };

        const c = makeFakeContext(services, "admin");
        await expect(
            batchUsers(c, "suspend", ["alice"]),
        ).rejects.toThrow("induced session-cascade failure");

        services.repositories.sessions.deleteByUserSlugs = realDeleteSessions;

        // The status flip that ran BEFORE the throw must have rolled back:
        // the user is still active and the session is still alive.
        const user = await services.repositories.users.findBySlug("alice");
        expect(user?.status).toBe("active");
        expect(
            await services.repositories.sessions.findByToken("tok-1"),
        ).not.toBeNull();
    });
});

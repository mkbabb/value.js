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
import { buildServices, cleanCollections, connect } from "../helpers.js";
import { createPalette, deletePalette } from "../../src/services/palette/crud.js";
import { batchUsers } from "../../src/services/admin/batch.js";
import { asSessionToken, asUserSlug } from "../../src/models.js";
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

    it("deletePalette rolls back deletedAt when fork-count cascade throws (I.W2)", async () => {
        // I.W2: deletePalette is soft. The transaction sets `deletedAt` then,
        // if the doc is a fork, decrements the parent's forkCount. If the
        // second step throws, the deletedAt write must also roll back.
        //
        // Seed parent + fork to exercise the fork-count cascade.
        await createPalette(services, {
            body: {
                name: "Parent",
                slug: "parent-pal",
                colors: [{ css: "#000000", position: 0 }],
                tags: [],
            },
            userSlug: "alice",
        });
        await services.repositories.palettes.insert({
            name: "Doomed",
            slug: "doomed",
            colors: [{ css: "#ff0000", position: 0 }],
            oklabColors: [],
            tags: [],
            voteCount: 0,
            userSlug: "alice",
            visibility: "public",
            tier: "standard",
            deletedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            currentHash: null,
            forkOf: "parent-pal",
            forkOfHash: null,
            forkCount: 0,
            versionCount: 1,
        });

        // Force the fork-count decrement (the second cascade step) to throw.
        const realDecrement = services.repositories.palettes.decrementForkCount.bind(
            services.repositories.palettes,
        );
        services.repositories.palettes.decrementForkCount = async () => {
            throw new Error("induced cascade failure");
        };

        await expect(deletePalette(services, { slug: "doomed" })).rejects.toThrow(
            "induced cascade failure",
        );

        services.repositories.palettes.decrementForkCount = realDecrement;

        // The soft-delete must have rolled back — `deletedAt` is still null.
        const doomed = await services.repositories.palettes.findBySlug("doomed");
        expect(doomed).not.toBeNull();
        expect(doomed?.deletedAt).toBeNull();
    });

    it("batchUsers(suspend) rolls back user status when session invalidation throws", async () => {
        // Seed an active user plus an active session.
        await services.repositories.users.insert({
            _id: asUserSlug("alice"),
            createdAt: new Date(),
            status: "active",
        });
        await services.repositories.sessions.insert({
            _id: asSessionToken("tok-1"),
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

        await expect(
            batchUsers(services, "admin", "suspend", ["alice"]),
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

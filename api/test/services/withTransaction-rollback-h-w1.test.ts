/**
 * Transaction-rollback coverage for the H.W1 Lane A `withTransaction`
 * expansion (createPalette + patchPalette — the two cross-collection
 * mutations that pre-H were running unwrapped).
 *
 * Pre-H state (H-AUDIT-6 §3): `createPalette` inserted the palette row
 * THEN called `createVersionRecord` outside a transaction; `patchPalette`
 * mirrored the same shape. A partial failure (driver hiccup,
 * write-concern timeout, schema-validation throw on the version row) left
 * either an orphan version row pointing at a palette that never landed,
 * or a palette whose `currentHash` resolved to nothing.
 *
 * Each test induces the partial failure by stubbing the second-step
 * repository (`paletteVersions.insertIfAbsent`) to throw AFTER the
 * first-step repository write (`palettes.insert` for create / both
 * `palettes.update` and the version-record write for patch) has already
 * executed inside the open transaction. The assertion is that NONE of
 * the earlier writes persist — the transaction must abort atomically.
 *
 * Tests run against `MongoMemoryReplSet` (test/setup.ts) so the
 * transaction boundary is real, not stubbed.
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { Context } from "hono";
import type { MongoClient, Db } from "mongodb";
import {
    buildServices,
    cleanCollections,
    connect,
    makeFakeContext,
} from "../helpers.js";
import { createPalette, patchPalette } from "../../src/services/palette/crud.js";
import {
    loginSession,
    registerSession,
} from "../../src/services/session/auth.js";
import { deletePalette as adminDeletePalette } from "../../src/services/admin/palettes.js";
import {
    deleteUserPalettes,
    pruneEmptyUsers,
    setUserStatus,
} from "../../src/services/admin/users.js";
import { deleteTag } from "../../src/services/admin/tags.js";
import type { AppEnv } from "../../src/types.js";
import type { Services } from "../../src/middleware/inject-services.js";

describe("withTransaction rollback (H.W1 Lane A)", () => {
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

    it("createPalette rolls back palette + version when createVersionRecord throws", async () => {
        // Force a partial failure: the version-row insert (the SECOND step,
        // after `palettes.insert` has already run inside the open
        // transaction) throws. The transaction must abort, leaving neither
        // the palette nor the version row behind.
        const realInsertIfAbsent =
            services.repositories.paletteVersions.insertIfAbsent.bind(
                services.repositories.paletteVersions,
            );
        services.repositories.paletteVersions.insertIfAbsent = () => {
            throw new Error("induced version-insert failure");
        };

        await expect(
            createPalette(services, {
                body: {
                    name: "Doomed",
                    slug: "doomed",
                    colors: [{ css: "#ff0000", position: 0 }],
                    tags: [],
                },
                sessionToken: "tok",
                userSlug: "alice",
            }),
        ).rejects.toThrow("induced version-insert failure");

        // Restore the stub so the post-assertions read real state.
        services.repositories.paletteVersions.insertIfAbsent = realInsertIfAbsent;

        // The palette insert that ran BEFORE the throw must have rolled
        // back: neither row exists.
        expect(
            await services.repositories.palettes.findBySlug("doomed"),
        ).toBeNull();
        const versionCount =
            await services.repositories.paletteVersions.countByPaletteSlug("doomed");
        expect(versionCount).toBe(0);
    });

    it("patchPalette rolls back palette mutation + version when createVersionRecord throws", async () => {
        // Seed a palette whose content we'll attempt to mutate.
        await createPalette(services, {
            body: {
                name: "Original",
                slug: "patched",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: ["red"],
            },
            sessionToken: "tok",
            userSlug: "alice",
        });

        const before = await services.repositories.palettes.findBySlug("patched");
        if (!before) throw new Error("seed palette missing");
        const versionsBefore =
            await services.repositories.paletteVersions.countByPaletteSlug("patched");

        // Force a partial failure: the new-version insert (the FIRST step
        // in the patch transaction, before `palettes.update` runs) throws.
        // The transaction must abort, leaving the palette in its pre-patch
        // state and no orphan version row behind.
        const realInsertIfAbsent =
            services.repositories.paletteVersions.insertIfAbsent.bind(
                services.repositories.paletteVersions,
            );
        services.repositories.paletteVersions.insertIfAbsent = () => {
            throw new Error("induced version-insert failure");
        };

        await expect(
            patchPalette(services, {
                slug: "patched",
                body: {
                    name: "Renamed",
                    colors: [{ css: "#0000ff", position: 0 }],
                },
                userSlug: "alice",
            }),
        ).rejects.toThrow("induced version-insert failure");

        services.repositories.paletteVersions.insertIfAbsent = realInsertIfAbsent;

        // The palette is unchanged: pre-patch name, colors, currentHash,
        // versionCount all preserved. No orphan version row was created.
        const after = await services.repositories.palettes.findBySlug("patched");
        expect(after).not.toBeNull();
        expect(after?.name).toBe(before.name);
        expect(after?.colors).toEqual(before.colors);
        expect(after?.currentHash).toBe(before.currentHash);
        expect(after?.versionCount).toBe(before.versionCount);

        const versionsAfter =
            await services.repositories.paletteVersions.countByPaletteSlug("patched");
        expect(versionsAfter).toBe(versionsBefore);
    });

    // -----------------------------------------------------------------
    // H.W1 Lane A.2 — D4-D10 extension. The 7 newly-wrapped cross-
    // collection write sites identified by Lane C's audit (§3.2 D4-D10
    // in `docs/tranches/H/audit/api-withTransaction-coverage.md`),
    // adjudicated as option-α (H1 maximalist closure) at H.W1 close.
    // Each test stubs a LATER repository write inside the wrapped block
    // to throw; the assertion is that none of the earlier writes persist.
    // -----------------------------------------------------------------

    it("D4 registerSession rolls back user.insert when sessions.insert throws", async () => {
        // Stub the SECOND write in the txn (sessions.insert) — by the
        // time it runs, users.insert has already executed inside the
        // open transaction. The user row must roll back; no orphan user
        // is left behind.
        const realSessionsInsert = services.repositories.sessions.insert.bind(
            services.repositories.sessions,
        );
        services.repositories.sessions.insert = () => {
            throw new Error("induced session-insert failure");
        };

        const c = makeFakeContext(services);
        await expect(registerSession(c)).rejects.toThrow(
            "induced session-insert failure",
        );

        services.repositories.sessions.insert = realSessionsInsert;

        // No user document persisted — the txn aborted and rolled back
        // the prior users.insert.
        const userCount = await db.collection("users").countDocuments({});
        expect(userCount).toBe(0);
        const sessionCount = await db.collection("sessions").countDocuments({});
        expect(sessionCount).toBe(0);
    });

    it("D5 loginSession rolls back sessions.insert when users.touchLastSeen throws", async () => {
        // Seed an existing user whose lastSeenAt we'll track.
        const before = new Date("2025-01-01T00:00:00Z");
        await services.repositories.users.insert({
            _id: "alice",
            createdAt: before,
            lastSeenAt: before,
        });

        // Stub the SECOND write (users.touchLastSeen) to throw AFTER
        // sessions.insert has run inside the open transaction. The
        // session insert must roll back AND the user's lastSeenAt must
        // remain at its pre-call value.
        const realTouchLastSeen = services.repositories.users.touchLastSeen.bind(
            services.repositories.users,
        );
        services.repositories.users.touchLastSeen = () => {
            throw new Error("induced touchLastSeen failure");
        };

        const c = makeFakeContext(services);
        await expect(loginSession(c, { slug: "alice" })).rejects.toThrow(
            "induced touchLastSeen failure",
        );

        services.repositories.users.touchLastSeen = realTouchLastSeen;

        // No session document persisted — the txn aborted and rolled
        // back the prior sessions.insert.
        const sessionCount = await db.collection("sessions").countDocuments({});
        expect(sessionCount).toBe(0);

        // The user's lastSeenAt is unchanged from its seeded value
        // (the touch attempt was inside the aborted txn).
        const user = await services.repositories.users.findBySlug("alice");
        expect(user?.lastSeenAt?.toISOString()).toBe(before.toISOString());
    });

    it("D6 admin deletePalette rolls back soft-delete when fork-count cascade throws (I.W2)", async () => {
        // I.W2: admin delete is now soft. The transaction sets `deletedAt`
        // then, if the doc is a fork, decrements the parent's forkCount.
        // If the cascade decrement throws, deletedAt must also roll back.
        await createPalette(services, {
            body: {
                name: "ParentAdmin",
                slug: "parent-admin-pal",
                colors: [{ css: "#000000", position: 0 }],
                tags: [],
            },
            sessionToken: "tok-parent",
            userSlug: "alice",
        });
        await services.repositories.palettes.insert({
            name: "DoomedAdmin",
            slug: "doomed-admin",
            colors: [{ css: "#ff0000", position: 0 }],
            oklabColors: [],
            tags: [],
            voteCount: 0,
            sessionToken: "tok",
            userSlug: "alice",
            status: "published",
            visibility: "public",
            tier: "standard",
            deletedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            currentHash: null,
            forkOf: "parent-admin-pal",
            forkOfHash: null,
            forkCount: 0,
            versionCount: 1,
        });

        const realDecrement = services.repositories.palettes.decrementForkCount.bind(
            services.repositories.palettes,
        );
        services.repositories.palettes.decrementForkCount = async () => {
            throw new Error("induced admin cascade failure");
        };

        const c = makeFakeContext(services, "admin");
        await expect(adminDeletePalette(c, "doomed-admin")).rejects.toThrow(
            "induced admin cascade failure",
        );

        services.repositories.palettes.decrementForkCount = realDecrement;

        // The soft-delete must have rolled back — deletedAt is still null.
        const doomed = await services.repositories.palettes.findBySlug("doomed-admin");
        expect(doomed).not.toBeNull();
        expect(doomed?.deletedAt).toBeNull();
    });

    it("D7 setUserStatus(suspended) rolls back user status when sessions.deleteByUserSlug throws", async () => {
        // Seed an active user plus a live session.
        await services.repositories.users.insert({
            _id: "alice",
            createdAt: new Date(),
            lastSeenAt: new Date(),
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

        // Stub the LAST cross-collection write (sessions.deleteByUserSlug)
        // to throw AFTER users.setStatus has run inside the open txn.
        const realDeleteByUserSlug =
            services.repositories.sessions.deleteByUserSlug.bind(
                services.repositories.sessions,
            );
        services.repositories.sessions.deleteByUserSlug = () => {
            throw new Error("induced session-cascade failure");
        };

        const c = makeFakeContext(services, "admin");
        await expect(setUserStatus(c, "alice", "suspended")).rejects.toThrow(
            "induced session-cascade failure",
        );

        services.repositories.sessions.deleteByUserSlug = realDeleteByUserSlug;

        // The status flip that ran BEFORE the throw must have rolled
        // back; the user is still active and the session still alive.
        const user = await services.repositories.users.findBySlug("alice");
        expect(user?.status).toBe("active");
        expect(
            await services.repositories.sessions.findByToken("tok-1"),
        ).not.toBeNull();
    });

    it("D8 deleteUserPalettes rolls back vote + flag cascade when palettes.deleteManyByUserSlug throws", async () => {
        // Seed a user with one palette + associated vote + flag.
        await services.repositories.users.insert({
            _id: "alice",
            createdAt: new Date(),
            lastSeenAt: new Date(),
        });
        await createPalette(services, {
            body: {
                name: "Owned",
                slug: "owned-by-alice",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: [],
            },
            sessionToken: "tok",
            userSlug: "alice",
        });
        await services.repositories.votes.upsertIdempotent(
            "alice",
            "owned-by-alice",
        );
        await services.repositories.flags.insert({
            paletteSlug: "owned-by-alice",
            reporterSlug: "bob",
            reason: "spam",
            detail: null,
            createdAt: new Date(),
        });

        // Stub the LAST cross-collection write (palettes.deleteManyByUserSlug)
        // to throw AFTER votes + flags deletes have run inside the open txn.
        const realDeleteMany =
            services.repositories.palettes.deleteManyByUserSlug.bind(
                services.repositories.palettes,
            );
        services.repositories.palettes.deleteManyByUserSlug = () => {
            throw new Error("induced palette-delete failure");
        };

        const c = makeFakeContext(services, "admin");
        await expect(deleteUserPalettes(c, "alice")).rejects.toThrow(
            "induced palette-delete failure",
        );

        services.repositories.palettes.deleteManyByUserSlug = realDeleteMany;

        // Vote + flag deletes that ran BEFORE the throw must have rolled back.
        expect(
            await services.repositories.votes.findOne("alice", "owned-by-alice"),
        ).not.toBeNull();
        const flagsRemaining = await db
            .collection("flags")
            .countDocuments({ paletteSlug: "owned-by-alice" });
        expect(flagsRemaining).toBe(1);
        // Palette itself is still present (delete never executed).
        expect(
            await services.repositories.palettes.findBySlug("owned-by-alice"),
        ).not.toBeNull();
    });

    it("D9 pruneEmptyUsers rolls back sessions.deleteByUserSlugs when users.deleteMany throws", async () => {
        // Seed an empty user (no palettes) plus an associated session.
        await services.repositories.users.insert({
            _id: "ghost",
            createdAt: new Date(),
            lastSeenAt: new Date(),
        });
        await services.repositories.sessions.insert({
            _id: "tok-ghost",
            ipHash: "ip",
            userSlug: "ghost",
            createdAt: new Date(),
            lastSeenAt: new Date(),
            expiresAt: new Date(Date.now() + 60_000),
        });

        // Stub the LAST cross-collection write (users.deleteMany) to
        // throw AFTER sessions.deleteByUserSlugs has run inside the
        // open txn.
        const realDeleteMany = services.repositories.users.deleteMany.bind(
            services.repositories.users,
        );
        services.repositories.users.deleteMany = () => {
            throw new Error("induced user-delete failure");
        };

        const c = makeFakeContext(services, "admin");
        await expect(pruneEmptyUsers(c)).rejects.toThrow(
            "induced user-delete failure",
        );

        services.repositories.users.deleteMany = realDeleteMany;

        // The session delete that ran BEFORE the throw must have rolled
        // back; the session is still alive AND the user still present.
        expect(
            await services.repositories.sessions.findByToken("tok-ghost"),
        ).not.toBeNull();
        expect(
            await services.repositories.users.findBySlug("ghost"),
        ).not.toBeNull();
    });

    it("D10 deleteTag rolls back tags.deleteByName when palettes.pullTagFromAll throws", async () => {
        // Seed a tag + a palette carrying that tag.
        await services.repositories.tags.insert({
            name: "vintage",
            category: "style",
            createdAt: new Date(),
        });
        await createPalette(services, {
            body: {
                name: "WithTag",
                slug: "with-tag",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: ["vintage"],
            },
            sessionToken: "tok",
            userSlug: "alice",
        });

        // Stub the LAST cross-collection write (palettes.pullTagFromAll)
        // to throw AFTER tags.deleteByName has run inside the open txn.
        const realPullTag = services.repositories.palettes.pullTagFromAll.bind(
            services.repositories.palettes,
        );
        services.repositories.palettes.pullTagFromAll = () => {
            throw new Error("induced tag-cascade failure");
        };

        const c = makeFakeContext(services, "admin") as Context<AppEnv>;
        await expect(deleteTag(c, "vintage")).rejects.toThrow(
            "induced tag-cascade failure",
        );

        services.repositories.palettes.pullTagFromAll = realPullTag;

        // The tag delete that ran BEFORE the throw must have rolled back;
        // the tag row is still present AND the palette still carries it.
        const tag = await services.repositories.tags.findByName("vintage");
        expect(tag).not.toBeNull();
        const palette =
            await services.repositories.palettes.findBySlug("with-tag");
        expect(palette?.tags).toContain("vintage");
    });
});

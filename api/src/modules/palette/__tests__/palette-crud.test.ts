import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import {
    createPalette,
    deletePalette,
    getPaletteBySlug,
    patchPalette,
} from "../service/crud.js";
import { ConflictError, NotFoundError } from "../../../platform/http/errors/index.js";
import type { Services } from "../../../platform/http/inject-services.js";

describe("service.palette.crud", () => {
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

    it("createPalette inserts and returns the formatted envelope", async () => {
        const result = await createPalette(services, {
            body: {
                name: "Sunset",
                slug: "sunset",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: ["warm"],
            },
            userSlug: "alice",
        });
        expect(result.slug).toBe("sunset");
        expect(result.name).toBe("Sunset");
        expect(result.isLocal).toBe(false);
        // A version record should have been created (userSlug provided)
        const versions = await services.repositories.paletteVersions.findByPaletteSlug(
            "sunset",
            0,
            10,
        );
        expect(versions).toHaveLength(1);
    });

    it("createPalette throws ConflictError on duplicate slug", async () => {
        const body = {
            name: "Dup",
            slug: "dup",
            colors: [{ css: "#000", position: 0 }],
            tags: [],
        };
        await createPalette(services, {
            body,
            userSlug: "alice",
        });
        await expect(
            createPalette(services, {
                body,
                userSlug: "bob",
            }),
        ).rejects.toBeInstanceOf(ConflictError);
    });

    it("getPaletteBySlug returns formatted shape; not-found throws", async () => {
        await createPalette(services, {
            body: {
                name: "X",
                slug: "x",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: [],
            },
            userSlug: "alice",
        });
        const got = await getPaletteBySlug(services, "x", "alice");
        expect(got.slug).toBe("x");
        await expect(
            getPaletteBySlug(services, "nope", undefined),
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    // NOTE (E.W2 Lane C): the prior "patchPalette rejects non-owner with
    // OwnershipError" test is gone — ownership has lifted out of the service
    // into the route's `requireOwnership` middleware. The middleware path is
    // covered by `test/routes/palettes-ownership.test.ts`.

    it("patchPalette updates and bumps versionCount on content change", async () => {
        await createPalette(services, {
            body: {
                name: "V1",
                slug: "v",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: [],
            },
            userSlug: "alice",
        });
        const updated = await patchPalette(services, {
            slug: "v",
            body: { colors: [{ css: "#00ff00", position: 0 }] },
            userSlug: "alice",
        });
        expect(updated.versionCount).toBe(2);
        const versions = await services.repositories.paletteVersions.findByPaletteSlug(
            "v",
            0,
            10,
        );
        expect(versions).toHaveLength(2);
    });

    it("deletePalette soft-deletes by slug (I.W2)", async () => {
        // I.W2: DELETE is soft (sets deletedAt). The reaper cron hard-deletes
        // after the grace window (default 30 days). The doc itself is preserved
        // until reap; consumers see 410 Gone in the meantime.
        await createPalette(services, {
            body: {
                name: "ToKill",
                slug: "kill",
                colors: [{ css: "#000", position: 0 }],
                tags: [],
            },
            userSlug: "alice",
        });
        const result = await deletePalette(services, { slug: "kill" });
        expect(result.deleted).toBe(true);
        expect(result.deletedAt).toBeInstanceOf(Date);
        const doc = await services.repositories.palettes.findBySlug("kill");
        expect(doc).not.toBeNull();
        expect(doc?.deletedAt).toBeInstanceOf(Date);
    });

    it("deletePalette throws NotFoundError on missing slug", async () => {
        await expect(
            deletePalette(services, { slug: "ghost" }),
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    // The `restorePalette` service (soft-delete undo behind the retired
    // `POST /:slug/restore` route) was removed at V·W45 item 1; its
    // `setForkCount` recompute primitive is covered directly in palette.test.ts.
});

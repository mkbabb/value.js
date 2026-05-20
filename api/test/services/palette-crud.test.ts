import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import {
    createPalette,
    deletePalette,
    getPaletteBySlug,
    patchPalette,
} from "../../src/services/palette/crud.js";
import {
    ConflictError,
    NotFoundError,
    OwnershipError,
} from "../../src/errors/index.js";
import type { Services } from "../../src/middleware/inject-services.js";

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
            sessionToken: "tok-1",
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
            sessionToken: "tok-1",
            userSlug: "alice",
        });
        await expect(
            createPalette(services, {
                body,
                sessionToken: "tok-2",
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
            sessionToken: "tok",
            userSlug: "alice",
        });
        const got = await getPaletteBySlug(services, "x", "alice");
        expect(got.slug).toBe("x");
        await expect(
            getPaletteBySlug(services, "nope", undefined),
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    it("patchPalette rejects non-owner with OwnershipError", async () => {
        await createPalette(services, {
            body: {
                name: "Mine",
                slug: "mine",
                colors: [{ css: "#fff", position: 0 }],
                tags: [],
            },
            sessionToken: "tok-owner",
            userSlug: "alice",
        });
        await expect(
            patchPalette(services, {
                slug: "mine",
                body: { name: "Stolen" },
                sessionToken: "tok-other",
                userSlug: "mallory",
            }),
        ).rejects.toBeInstanceOf(OwnershipError);
    });

    it("patchPalette updates and bumps versionCount on content change", async () => {
        await createPalette(services, {
            body: {
                name: "V1",
                slug: "v",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: [],
            },
            sessionToken: "tok",
            userSlug: "alice",
        });
        const updated = await patchPalette(services, {
            slug: "v",
            body: { colors: [{ css: "#00ff00", position: 0 }] },
            sessionToken: "tok",
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

    it("deletePalette removes by owner; non-owner is blocked", async () => {
        await createPalette(services, {
            body: {
                name: "ToKill",
                slug: "kill",
                colors: [{ css: "#000", position: 0 }],
                tags: [],
            },
            sessionToken: "tok",
            userSlug: "alice",
        });
        await expect(
            deletePalette(services, {
                slug: "kill",
                sessionToken: "wrong",
                userSlug: "mallory",
            }),
        ).rejects.toBeInstanceOf(OwnershipError);
        const result = await deletePalette(services, {
            slug: "kill",
            sessionToken: "tok",
            userSlug: "alice",
        });
        expect(result.deleted).toBe(true);
        expect(await services.repositories.palettes.findBySlug("kill")).toBeNull();
    });
});

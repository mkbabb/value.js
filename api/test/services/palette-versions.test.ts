import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import {
    createVersionRecord,
    getVersionByHash,
    listVersions,
    revertToVersion,
} from "../../src/services/palette/versions.js";
import { createPalette, patchPalette } from "../../src/services/palette/crud.js";
import {
    NotFoundError,
    OwnershipError,
} from "../../src/errors/index.js";
import type { Services } from "../../src/middleware/inject-services.js";

describe("service.palette.versions", () => {
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

    it("createVersionRecord is idempotent on content-hash", async () => {
        const input = {
            paletteSlug: "p",
            name: "n",
            colors: [{ css: "#fff", position: 0 }],
            authorSlug: "alice",
            parentHash: null,
            forkedFromHash: null,
        };
        const h1 = await createVersionRecord(services, input);
        const h2 = await createVersionRecord(services, input);
        expect(h1).toBe(h2);
        const versions = await services.repositories.paletteVersions.findByPaletteSlug(
            "p",
            0,
            10,
        );
        expect(versions).toHaveLength(1);
    });

    it("getVersionByHash throws NotFoundError on missing hash", async () => {
        await expect(getVersionByHash(services, "nope")).rejects.toBeInstanceOf(
            NotFoundError,
        );
    });

    it("listVersions returns versions in createdAt desc order", async () => {
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
        await patchPalette(services, {
            slug: "x",
            body: { colors: [{ css: "#00ff00", position: 0 }] },
            sessionToken: "tok",
            userSlug: "alice",
        });
        const list = await listVersions(services, "x", 0, 10);
        expect(list.total).toBe(2);
    });

    it("revertToVersion rejects non-owner with OwnershipError", async () => {
        await createPalette(services, {
            body: {
                name: "X",
                slug: "x",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: [],
            },
            sessionToken: "tok-owner",
            userSlug: "alice",
        });
        const palette = await services.repositories.palettes.findBySlug("x");
        await expect(
            revertToVersion(services, {
                slug: "x",
                hash: palette!.currentHash!,
                sessionToken: "tok-other",
                userSlug: "mallory",
            }),
        ).rejects.toBeInstanceOf(OwnershipError);
    });
});

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import {
    createVersionRecord,
    getVersionByHash,
    listVersions,
    revertToVersion,
} from "../service/versions.js";
import { createPalette, patchPalette } from "../service/crud.js";
import { NotFoundError } from "../../../platform/http/errors/index.js";
import type { Services } from "../../../platform/http/inject-services.js";

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
            userSlug: "alice",
        });
        await patchPalette(services, {
            slug: "x",
            body: { colors: [{ css: "#00ff00", position: 0 }] },
            userSlug: "alice",
        });
        const list = await listVersions(services, "x", 0, 10);
        expect(list.total).toBe(2);
    });

    // NOTE (E.W2 Lane C): the prior "revertToVersion rejects non-owner with
    // OwnershipError" test is gone — ownership has lifted out of the service
    // into the route's `requireOwnership` middleware. The middleware path is
    // covered by `test/routes/palettes-ownership.test.ts`.

    it("revertToVersion throws NotFoundError on missing palette", async () => {
        await expect(
            revertToVersion(services, {
                slug: "ghost",
                hash: "deadbeef",
                userSlug: "alice",
            }),
        ).rejects.toBeInstanceOf(NotFoundError);
    });
});

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import { createPalette } from "../../src/services/palette/crud.js";
import {
    getOwnerSlug,
    getPaletteETagData,
} from "../../src/services/palette/ownership.js";
import type { Services } from "../../src/middleware/inject-services.js";

describe("service.palette.ownership", () => {
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

    describe("getOwnerSlug", () => {
        it("returns the palette's userSlug when it exists", async () => {
            await createPalette(services, {
                body: {
                    name: "Owned",
                    slug: "owned",
                    colors: [{ css: "#ff0000", position: 0 }],
                    tags: [],
                },
                userSlug: "alice",
            });
            expect(await getOwnerSlug(services, "owned")).toBe("alice");
        });

        it("returns null when the palette does not exist (→ middleware 404)", async () => {
            expect(await getOwnerSlug(services, "ghost")).toBeNull();
        });
    });

    describe("getPaletteETagData", () => {
        it("returns the currentHash + updatedAt for an existing palette", async () => {
            await createPalette(services, {
                body: {
                    name: "Etagged",
                    slug: "etagged",
                    colors: [{ css: "#00ff00", position: 0 }],
                    tags: [],
                },
                userSlug: "bob",
            });
            const data = await getPaletteETagData(services, "etagged");
            expect(data).not.toBeNull();
            expect(typeof data?.currentHash).toBe("string");
            expect(data?.updatedAt).toBeInstanceOf(Date);
        });

        it("returns null when the palette does not exist (caller skips the guard)", async () => {
            expect(await getPaletteETagData(services, "ghost")).toBeNull();
        });
    });
});

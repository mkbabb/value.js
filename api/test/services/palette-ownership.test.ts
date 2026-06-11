import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import { createPalette } from "../../src/services/palette/crud.js";
import { getOwnedPalette } from "../../src/services/palette/ownership.js";
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

    // N.W3.E — the ownership read returns the WHOLE palette (one read, one
    // doc) so the owner-gated routes reuse it for both the ETag pre-check and
    // the service write. The former `getOwnerSlug` / `getPaletteETagData`
    // single-purpose helpers are retired; this single read carries the owner
    // slug AND the ETag inputs (`currentHash` + `updatedAt`).
    describe("getOwnedPalette", () => {
        it("returns the full palette (owner slug + ETag inputs) when it exists", async () => {
            await createPalette(services, {
                body: {
                    name: "Owned",
                    slug: "owned",
                    colors: [{ css: "#ff0000", position: 0 }],
                    tags: [],
                },
                userSlug: "alice",
            });
            const palette = await getOwnedPalette(services, "owned");
            expect(palette).not.toBeNull();
            // Owner slug — backs the `requireOwnership` 403/404 decision.
            expect(palette?.userSlug).toBe("alice");
            // ETag inputs — back the route's If-Match pre-check.
            expect(typeof palette?.currentHash).toBe("string");
            expect(palette?.updatedAt).toBeInstanceOf(Date);
        });

        it("returns null when the palette does not exist (→ middleware 404)", async () => {
            expect(await getOwnedPalette(services, "ghost")).toBeNull();
        });
    });
});

/**
 * Palette versions — revision identity across palettes.
 *
 * X·F F-T9 · G-F7-4 (fourier-DESIGN-TAIL §C; COHESION §0hs.3), F.W7 clause E1:
 * two palettes whose content is identical share a payload hash and must still
 * each resolve to their OWN revision. Under a content-hash `_id` the second
 * palette's revision vanished into the first's row. Measured at the wire, as
 * `palette-versions.test.ts` measures G-5/G-6; it lives in its own file so the
 * api test band's line ratchet (eslint `max-lines`) holds.
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import { createPalette } from "../service/crud.js";
import { palettes } from "../routes/index.js";
import { toResponseEnvelope } from "../../../platform/http/errors/index.js";
import type { AppEnv } from "../../../types.js";
import type { Services } from "../../../platform/http/inject-services.js";

function buildTestApp(services: Services): Hono<AppEnv> {
    const app = new Hono<AppEnv>();
    app.use("*", async (c, next) => {
        c.set("services", services);
        await next();
    });
    app.route("/palettes", palettes);
    app.onError((err, c) => {
        const { status, body } = toResponseEnvelope(err, c.req.path);
        return c.json(body, status);
    });
    return app;
}

describe("palette version identity", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;
    let app: Hono<AppEnv>;

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
        app = buildTestApp(services);
    });

    it("G-F7-4: two palettes sharing a content hash resolve to their own versions", async () => {
        const colors = [{ css: "#ff0000", position: 0 }];
        await createPalette(services, {
            body: { name: "A", slug: "a", colors, tags: [] },
            userSlug: "alice",
        });
        await createPalette(services, {
            body: { name: "B", slug: "b", colors, tags: [] },
            userSlug: "bob",
        });

        const [aRow] = await services.repositories.paletteVersions.findByPaletteSlug(
            "a",
            0,
            10,
        );
        const [bRow] = await services.repositories.paletteVersions.findByPaletteSlug(
            "b",
            0,
            10,
        );
        expect(aRow?.paletteSlug).toBe("a");
        expect(bRow?.paletteSlug).toBe("b");
        // One content, two revisions under two ids.
        expect(aRow?.payloadHash).toBe(bRow?.payloadHash);
        expect(aRow?._id).not.toBe(bRow?._id);

        // Each resolves through its own palette, by its own name.
        const aRes = await app.request(`/palettes/a/versions/${aRow!._id}`);
        const bRes = await app.request(`/palettes/b/versions/${bRow!._id}`);
        expect(aRes.status).toBe(200);
        expect(bRes.status).toBe(200);
        expect((await aRes.json()).paletteSlug).toBe("a");
        expect((await bRes.json()).paletteSlug).toBe("b");

        // Neither is reachable through the other.
        expect((await app.request(`/palettes/a/versions/${bRow!._id}`)).status).toBe(
            404,
        );
        expect((await app.request(`/palettes/b/versions/${aRow!._id}`)).status).toBe(
            404,
        );
    });
});

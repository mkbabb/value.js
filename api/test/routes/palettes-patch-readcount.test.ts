/**
 * PATCH read-amplification coverage (N.W3.E).
 *
 * Before N.W3.E a single `PATCH /palettes/:slug` read the palette FOUR times
 * before/after the write:
 *   1. `requireOwnership` extractor → findBySlug
 *   2. route ETag pre-check       → findBySlug
 *   3. service content-hash diff  → findBySlug
 *   4. post-write fresh re-read   → findBySlug
 *
 * N.W3.E collapses (1)+(2)+(3) into ONE read: the ownership extractor reads the
 * full palette and stashes it on `c.var.palette`; the ETag pre-check + the
 * service reuse that doc. Only the post-write re-read (4) remains a second
 * read. This test spies on `palettes.findBySlug` and asserts the count is
 * exactly 2 on a successful PATCH — the 4 → 2 collapse, verified structurally.
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import { palettes } from "../../src/routes/palettes/index.js";
import { toResponseEnvelope } from "../../src/errors/index.js";
import { createPalette } from "../../src/services/palette/crud.js";
import type { AppEnv } from "../../src/types.js";
import type { Services } from "../../src/middleware/inject-services.js";

function buildTestApp(services: Services): Hono<AppEnv> {
    const app = new Hono<AppEnv>();
    app.use("*", async (c, next) => {
        c.set("services", services);
        c.set("userSlug", c.req.header("X-Test-User-Slug"));
        c.set("sessionToken", c.req.header("X-Test-Session-Token"));
        await next();
    });
    app.route("/palettes", palettes);
    app.onError((err, c) => {
        const { status, body } = toResponseEnvelope(err);
        return c.json(body, status);
    });
    return app;
}

describe("routes.palettes — PATCH read-amplification (N.W3.E)", () => {
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
        await createPalette(services, {
            body: {
                name: "Alpha",
                slug: "alpha",
                colors: [{ css: "#fff", position: 0 }],
                tags: [],
            },
            userSlug: "alice",
        });
    });

    it("a successful PATCH reads the palette exactly twice (1 pre-write + 1 post-write)", async () => {
        const get = await app.request("/palettes/alpha", { method: "GET" });
        const etag = get.headers.get("ETag");
        expect(etag).not.toBeNull();

        // Spy on findBySlug AFTER seeding + the GET (so we count only the PATCH).
        const repo = services.repositories.palettes;
        const real = repo.findBySlug.bind(repo);
        let reads = 0;
        repo.findBySlug = (slug, session) => {
            reads++;
            return real(slug, session);
        };

        try {
            const res = await app.request("/palettes/alpha", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-Test-User-Slug": "alice",
                    "X-Test-Session-Token": "tok-alice",
                    "If-Match": etag ?? "",
                },
                body: JSON.stringify({ name: "Alpha Prime", colors: [{ css: "#000", position: 0 }] }),
            });
            expect(res.status).toBe(200);
        } finally {
            repo.findBySlug = real;
        }

        // 1 read in the ownership extractor (reused for ETag + content-hash
        // diff) + 1 post-write re-read for the fresh envelope = 2.
        expect(reads).toBe(2);
    });
});

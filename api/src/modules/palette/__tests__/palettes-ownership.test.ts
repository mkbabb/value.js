/**
 * Route-level ownership middleware test (E.W2 Lane C).
 *
 * Verifies that `requireOwnership` (wired on `PATCH /palettes/:slug`,
 * `DELETE /palettes/:slug`, `POST /palettes/:slug/revert`) correctly throws:
 *   - `AuthenticationError` (401) when no `c.var.userSlug` is set.
 *   - `NotFoundError` (404) when the palette slug doesn't exist.
 *   - `OwnershipError` (403) when the authenticated user is not the owner.
 *   - And passes through to the handler when the owner matches.
 *
 * The test mounts a minimal Hono app with `injectServices` + a synthetic
 * session-injection middleware (the production `resolveSession` reads
 * `X-Session-Token`; we shortcut that here by setting `c.var.userSlug`
 * directly from a request header). The palettes router is mounted as in
 * production; the global `onError` envelope is wired so we can assert the
 * mapped `{ status, body }` shape.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import { palettes } from "../routes/index.js";
import { toResponseEnvelope } from "../../../platform/http/errors/index.js";
import { createPalette } from "../service/crud.js";
import type { AppEnv } from "../../../types.js";
import type { Services } from "../../../platform/http/inject-services.js";

/**
 * Build the test app: synthetic session injection (X-Test-User-Slug header)
 * + the palettes router + the global onError envelope mapper.
 */
function buildTestApp(services: Services): Hono<AppEnv> {
    const app = new Hono<AppEnv>();
    app.use("*", async (c, next) => {
        c.set("services", services);
        const slug = c.req.header("X-Test-User-Slug");
        const token = c.req.header("X-Test-Session-Token");
        c.set("userSlug", slug);
        c.set("sessionToken", token);
        await next();
    });
    app.route("/palettes", palettes);
    app.onError((err, c) => {
        const { status, body } = toResponseEnvelope(err);
        return c.json(body, status);
    });
    return app;
}

describe("routes.palettes — requireOwnership middleware (E.W2 Lane C)", () => {
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
        // Seed: alice owns "alpha"; bob owns "beta".
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

    // --- PATCH ---

    it("PATCH /palettes/:slug — 401 when no session/userSlug", async () => {
        const res = await app.request("/palettes/alpha", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Renamed" }),
        });
        expect(res.status).toBe(401);
        // I.W4: problem+json envelope. N.W3.H: contract URN.
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:session-invalid");
    });

    it("PATCH /palettes/:slug — 404 when slug doesn't exist", async () => {
        const res = await app.request("/palettes/ghost", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-Test-User-Slug": "alice",
                "X-Test-Session-Token": "tok-alice",
            },
            body: JSON.stringify({ name: "Renamed" }),
        });
        expect(res.status).toBe(404);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:not-found");
    });

    it("PATCH /palettes/:slug — 403 OwnershipError when non-owner", async () => {
        const res = await app.request("/palettes/alpha", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-Test-User-Slug": "mallory",
                "X-Test-Session-Token": "tok-mallory",
            },
            body: JSON.stringify({ name: "Stolen" }),
        });
        expect(res.status).toBe(403);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:not-owner");
    });

    it("PATCH /palettes/:slug — 200 when owner matches (I.W4 If-Match)", async () => {
        // I.W4: PATCH requires If-Match. Fetch the current resource ETag
        // via GET, then send it back as If-Match.
        const get = await app.request("/palettes/alpha", { method: "GET" });
        const etag = get.headers.get("ETag");
        expect(etag).not.toBeNull();
        const res = await app.request("/palettes/alpha", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-Test-User-Slug": "alice",
                "X-Test-Session-Token": "tok-alice",
                "If-Match": etag ?? "",
            },
            body: JSON.stringify({ name: "Alpha Prime" }),
        });
        expect(res.status).toBe(200);
        const body = (await res.json()) as { name: string };
        expect(body.name).toBe("Alpha Prime");
    });

    // --- DELETE ---

    it("DELETE /palettes/:slug — 403 OwnershipError when non-owner", async () => {
        const res = await app.request("/palettes/alpha", {
            method: "DELETE",
            headers: {
                "X-Test-User-Slug": "mallory",
                "X-Test-Session-Token": "tok-mallory",
            },
        });
        expect(res.status).toBe(403);
    });

    it("DELETE /palettes/:slug — 200 when owner matches", async () => {
        const res = await app.request("/palettes/alpha", {
            method: "DELETE",
            headers: {
                "X-Test-User-Slug": "alice",
                "X-Test-Session-Token": "tok-alice",
            },
        });
        expect(res.status).toBe(200);
        // I.W2: DELETE is soft — the doc carries `deletedAt`; the reaper
        // hard-deletes past the grace window.
        const doc = await services.repositories.palettes.findBySlug("alpha");
        expect(doc).not.toBeNull();
        expect(doc?.deletedAt).toBeInstanceOf(Date);
    });

    // --- POST /:slug/revert ---

    it("POST /palettes/:slug/revert — 403 OwnershipError when non-owner", async () => {
        const palette = await services.repositories.palettes.findBySlug("alpha");
        const res = await app.request("/palettes/alpha/revert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Test-User-Slug": "mallory",
                "X-Test-Session-Token": "tok-mallory",
            },
            body: JSON.stringify({ hash: palette!.currentHash }),
        });
        expect(res.status).toBe(403);
    });
});

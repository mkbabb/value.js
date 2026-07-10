/**
 * N.W3.H-tests — wire-level conformance for the votes + flags routes.
 *
 * D5 §3.2 + E4 §5 flagged both as service-level-only (no 401 auth-gate or
 * error-envelope coverage at the HTTP layer). inv-N-8 requires wire coverage.
 *
 * Coverage:
 *   - POST /:slug/vote   → 401 unauthenticated; toggle {voted, voteCount};
 *                          404 unknown slug.
 *   - POST /:slug/flag   → 401 unauthenticated; 201 {flagged}; double-flag 409;
 *                          flag-own 400.
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { Db, MongoClient } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import { palettes } from "../../src/modules/palette/routes/index.js";
import { toResponseEnvelope } from "../../src/platform/http/errors/index.js";
import { createPalette } from "../../src/modules/palette/service/crud.js";
import type { PaletteColor } from "../../src/modules/palette/model.js";
import type { AppEnv } from "../../src/types.js";
import type { Services } from "../../src/platform/http/inject-services.js";

const COLORS: PaletteColor[] = [{ css: "#ff0000", position: 0 }];

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
        const { status, body } = toResponseEnvelope(err, c.req.path);
        return c.json(body, status);
    });
    return app;
}

const alice = { "X-Test-User-Slug": "alice", "X-Test-Session-Token": "tok-alice" };
const bob = { "X-Test-User-Slug": "bob", "X-Test-Session-Token": "tok-bob" };

describe("routes.palettes votes + flags (N.W3.H-tests)", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;
    let app: Hono<AppEnv>;

    beforeAll(async () => {
        ({ client, db } = await connect());
        await db.collection("palettes").createIndex({ slug: 1 }, { unique: true });
        await db
            .collection("votes")
            .createIndex({ userSlug: 1, paletteSlug: 1 }, { unique: true });
        await db
            .collection("flags")
            .createIndex({ paletteSlug: 1, reporterSlug: 1 }, { unique: true });
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        services = buildServices(db, client);
        app = buildTestApp(services);
        await createPalette(services, {
            body: { name: "P", slug: "p", colors: COLORS, tags: [] },
            userSlug: "alice",
        });
    });

    // ---- VOTES ----

    it("POST /:slug/vote → 401 problem+json when unauthenticated", async () => {
        const res = await app.request("/palettes/p/vote", { method: "POST" });
        expect(res.status).toBe(401);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:session-invalid");
    });

    it("POST /:slug/vote → 200 toggle on → off; voteCount tracks", async () => {
        const on = await app.request("/palettes/p/vote", {
            method: "POST",
            headers: bob,
        });
        expect(on.status).toBe(200);
        const onBody = (await on.json()) as { voted: boolean; voteCount: number };
        expect(onBody.voted).toBe(true);
        expect(onBody.voteCount).toBe(1);

        const off = await app.request("/palettes/p/vote", {
            method: "POST",
            headers: bob,
        });
        expect(off.status).toBe(200);
        const offBody = (await off.json()) as { voted: boolean; voteCount: number };
        expect(offBody.voted).toBe(false);
        expect(offBody.voteCount).toBe(0);
    });

    it("POST /:slug/vote → 404 problem+json for an unknown slug", async () => {
        const res = await app.request("/palettes/ghost/vote", {
            method: "POST",
            headers: bob,
        });
        expect(res.status).toBe(404);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:not-found");
    });

    // ---- FLAGS ----

    it("POST /:slug/flag → 401 when unauthenticated", async () => {
        const res = await app.request("/palettes/p/flag", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reason: "spam" }),
        });
        expect(res.status).toBe(401);
    });

    it("POST /:slug/flag → 201 {flagged} for a non-owner reporter", async () => {
        const res = await app.request("/palettes/p/flag", {
            method: "POST",
            headers: { ...bob, "Content-Type": "application/json" },
            body: JSON.stringify({ reason: "spam" }),
        });
        expect(res.status).toBe(201);
        const body = (await res.json()) as { flagged: boolean };
        expect(body.flagged).toBe(true);
    });

    it("POST /:slug/flag → 409 on a double-flag by the same reporter", async () => {
        const headers = { ...bob, "Content-Type": "application/json" };
        const body = JSON.stringify({ reason: "spam" });
        const first = await app.request("/palettes/p/flag", {
            method: "POST",
            headers,
            body,
        });
        expect(first.status).toBe(201);
        const second = await app.request("/palettes/p/flag", {
            method: "POST",
            headers,
            body,
        });
        expect(second.status).toBe(409);
        const secondBody = (await second.json()) as { type: string };
        expect(secondBody.type).toBe("urn:contract:slug-conflict");
    });

    it("POST /:slug/flag → 400 when flagging your own palette", async () => {
        const res = await app.request("/palettes/p/flag", {
            method: "POST",
            headers: { ...alice, "Content-Type": "application/json" },
            body: JSON.stringify({ reason: "spam" }),
        });
        expect(res.status).toBe(400);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:validation-failed");
    });
});

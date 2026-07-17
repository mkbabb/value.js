/**
 * N.W3.H-tests — wire-level conformance for the sessions + colors routers.
 *
 * D5 §3.2 flagged these surfaces as having ZERO route-level coverage (sessions
 * had rollback-only service tests; colors had none). inv-N-8 requires every
 * shipped route to carry wire-level coverage. This file mounts the REAL
 * `sessions` + `colors` routers behind the REAL `resolveSession` middleware
 * (the production authn seam — not a synthetic header injector), so the
 * register → me → logout round-trip resolves an actual DB-backed session token.
 *
 * Coverage:
 *   - POST /sessions          → 201 {token, userSlug}; the token resolves.
 *   - GET  /sessions/me       → 200 {userSlug, createdAt}; same userSlug.
 *   - GET  /sessions/me       → 401 problem+json when no/invalid token.
 *   - DELETE /sessions        → logout; the token no longer resolves (/me 401).
 *   - POST /sessions/login    → 200 with a fresh token for an existing slug.
 *   - POST /colors/propose    → 201; GET /colors/approved + /tags → 200 shapes.
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { Db, MongoClient } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import sessions from "../../src/modules/session/routes.js";
import colors from "../../src/modules/color/routes.js";
import { resolveSession } from "../../src/modules/session/resolve.js";
import { toResponseEnvelope } from "../../src/platform/http/errors/index.js";
import { asUserSlug, hashSessionToken } from "../../src/modules/session/model.js";
import type { AppEnv } from "../../src/types.js";
import type { Services } from "../../src/platform/http/inject-services.js";

/**
 * Build the test app with the production authn seam: injectServices-equivalent
 * (sets `c.var.services`) → the REAL `resolveSession` (reads `X-Session-Token`
 * against the DB) → the mounted router. The problem+json envelope is rendered
 * by `onError` exactly as production does.
 */
function buildTestApp(
    services: Services,
    router: Hono<AppEnv>,
    prefix: string,
): Hono<AppEnv> {
    const app = new Hono<AppEnv>();
    app.use("*", async (c, next) => {
        c.set("services", services);
        await next();
    });
    app.use("*", resolveSession);
    app.route(prefix, router);
    app.onError((err, c) => {
        const { status, body } = toResponseEnvelope(err, c.req.path);
        return c.json(body, status);
    });
    return app;
}

describe("routes.sessions — register/me/logout round-trip (N.W3.H-tests)", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;
    let app: Hono<AppEnv>;

    beforeAll(async () => {
        ({ client, db } = await connect());
        await db.collection("sessions").createIndex({ _id: 1 });
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        services = buildServices(db, client);
        app = buildTestApp(services, sessions, "/sessions");
    });

    async function register(): Promise<{ token: string; userSlug: string }> {
        const res = await app.request("/sessions", { method: "POST" });
        expect(res.status).toBe(201);
        return (await res.json()) as { token: string; userSlug: string };
    }

    it("POST /sessions → 201 {token, userSlug}; the token resolves on /me", async () => {
        const { token, userSlug } = await register();
        expect(typeof token).toBe("string");
        expect(token.length).toBeGreaterThan(0);
        expect(typeof userSlug).toBe("string");

        const me = await app.request("/sessions/me", {
            method: "GET",
            headers: { "X-Session-Token": token },
        });
        expect(me.status).toBe(200);
        const meBody = (await me.json()) as { userSlug: string; createdAt: string };
        expect(meBody.userSlug).toBe(userSlug);
        expect(typeof meBody.createdAt).toBe("string");
    });

    it("GET /sessions/me → 401 problem+json with no token", async () => {
        const res = await app.request("/sessions/me", { method: "GET" });
        expect(res.status).toBe(401);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:session-invalid");
    });

    it("GET /sessions/me → 401 with an invalid token (no resolve)", async () => {
        const res = await app.request("/sessions/me", {
            method: "GET",
            headers: { "X-Session-Token": "not-a-real-token" },
        });
        expect(res.status).toBe(401);
    });

    it("DELETE /sessions → logout; the revoked token no longer resolves", async () => {
        const { token } = await register();

        const del = await app.request("/sessions", {
            method: "DELETE",
            headers: { "X-Session-Token": token },
        });
        expect(del.status).toBe(200);
        const delBody = (await del.json()) as { ok: boolean };
        expect(delBody.ok).toBe(true);

        // The token is dead — /me with it now 401s.
        const me = await app.request("/sessions/me", {
            method: "GET",
            headers: { "X-Session-Token": token },
        });
        expect(me.status).toBe(401);
    });

    it("POST /sessions/login → 200 {token, userSlug} for an existing slug", async () => {
        const { userSlug } = await register();

        const res = await app.request("/sessions/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: userSlug }),
        });
        expect(res.status).toBe(200);
        const body = (await res.json()) as { token: string; userSlug: string };
        expect(body.userSlug).toBe(userSlug);
        expect(typeof body.token).toBe("string");

        // The fresh token resolves.
        const me = await app.request("/sessions/me", {
            method: "GET",
            headers: { "X-Session-Token": body.token },
        });
        expect(me.status).toBe(200);
    });

    it("POST /sessions/login → 400 problem+json on an invalid body", async () => {
        const res = await app.request("/sessions/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });
        expect(res.status).toBe(400);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:validation-failed");
    });
});

describe("routes.colors — propose + public listings (N.W3.H-tests)", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;
    let app: Hono<AppEnv>;

    beforeAll(async () => {
        ({ client, db } = await connect());
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        services = buildServices(db, client);
        app = buildTestApp(services, colors, "/colors");
        // Seed a session so /colors/propose (session-gated via userSlug) resolves.
        // Use the repository inserts + branded mints (no escape casts).
        await services.repositories.users.insert({
            _id: asUserSlug("carol"),
            createdAt: new Date(),
            lastSeenAt: new Date(),
        });
        await services.repositories.sessions.insert({
            _id: hashSessionToken("tok-c"),
            ipHash: "test",
            userSlug: "carol",
            createdAt: new Date(),
            lastSeenAt: new Date(),
            expiresAt: new Date(Date.now() + 86_400_000),
        });
    });

    it("POST /colors/propose → 201", async () => {
        const res = await app.request("/colors/propose", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Session-Token": "tok-c",
            },
            body: JSON.stringify({ name: "dusk-rose", css: "#c97" }),
        });
        expect(res.status).toBe(201);
    });

    it("POST /colors/propose → 400 problem+json on an invalid name", async () => {
        const res = await app.request("/colors/propose", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Session-Token": "tok-c",
            },
            body: JSON.stringify({ name: "Bad Name!", css: "#fff" }),
        });
        expect(res.status).toBe(400);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:validation-failed");
    });

    it("GET /colors/approved → 200 {data, ...} envelope", async () => {
        const res = await app.request("/colors/approved", { method: "GET" });
        expect(res.status).toBe(200);
        const body = (await res.json()) as { data: unknown[] };
        expect(Array.isArray(body.data)).toBe(true);
    });

    it("GET /colors/search → 200 empty for a <2-char query (no error)", async () => {
        const res = await app.request("/colors/search?q=a", { method: "GET" });
        expect(res.status).toBe(200);
        const body = (await res.json()) as { data: unknown[] };
        expect(body.data).toEqual([]);
    });

    it("GET /colors/tags → 200 array", async () => {
        const res = await app.request("/colors/tags", { method: "GET" });
        expect(res.status).toBe(200);
        const body = (await res.json()) as unknown;
        expect(Array.isArray(body)).toBe(true);
    });
});

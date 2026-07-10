/**
 * N.W3.H-tests — wire-level conformance for the admin impersonate route +
 * the `adminAuth` bearer gate.
 *
 * D5 §3.2 flagged ALL 22 admin endpoints as route-level-uncovered and noted
 * that the `adminAuth` bearer-token middleware "is not exercised by any test —
 * the fake context pattern in service tests bypasses it entirely". This file
 * mounts the REAL `admin` router (which binds `adminAuth` once at the top), so
 * the bearer gate (401 no-auth / 403 wrong-token / 503 unconfigured) AND the
 * impersonate happy-path are exercised at the HTTP layer. inv-N-8.
 *
 * Impersonate is the representative privileged admin op (it mints a session as
 * another user) — covering it + the gate closes the "adminAuth untested" hole
 * without re-testing all 22 admin services at the route layer (their business
 * logic is already service-covered; the NEW assertion is the wire gate).
 */

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { Db, MongoClient } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import admin from "../routes/index.js";
import { toResponseEnvelope } from "../../../platform/http/errors/index.js";
import { asUserSlug } from "../../session/model.js";
import type { AppEnv } from "../../../types.js";
import type { Services } from "../../../platform/http/inject-services.js";

const ADMIN_TOKEN = "test-admin-token";

function buildTestApp(services: Services): Hono<AppEnv> {
    const app = new Hono<AppEnv>();
    app.use("*", async (c, next) => {
        c.set("services", services);
        await next();
    });
    app.route("/admin", admin);
    app.onError((err, c) => {
        const { status, body } = toResponseEnvelope(err, c.req.path);
        return c.json(body, status);
    });
    return app;
}

const authed = { Authorization: `Bearer ${ADMIN_TOKEN}`, "Content-Type": "application/json" };

describe("routes.admin impersonate + adminAuth gate (N.W3.H-tests)", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;
    let app: Hono<AppEnv>;
    let priorToken: string | undefined;

    beforeAll(async () => {
        ({ client, db } = await connect());
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        priorToken = process.env.ADMIN_TOKEN;
        process.env.ADMIN_TOKEN = ADMIN_TOKEN;
        await cleanCollections(db);
        services = buildServices(db, client);
        app = buildTestApp(services);
        await services.repositories.users.insert({
            _id: asUserSlug("target-user"),
            createdAt: new Date(),
            lastSeenAt: new Date(),
        });
    });

    afterEach(() => {
        if (priorToken === undefined) delete process.env.ADMIN_TOKEN;
        else process.env.ADMIN_TOKEN = priorToken;
    });

    // ---- adminAuth bearer gate ----

    it("POST /admin/impersonate → 401 problem+json with no Authorization header", async () => {
        const res = await app.request("/admin/impersonate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: "target-user" }),
        });
        expect(res.status).toBe(401);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:session-invalid");
    });

    it("POST /admin/impersonate → 403 with a wrong bearer token", async () => {
        const res = await app.request("/admin/impersonate", {
            method: "POST",
            headers: {
                Authorization: "Bearer wrong-token-wrong-token",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug: "target-user" }),
        });
        expect(res.status).toBe(403);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:admin-forbidden");
    });

    it("POST /admin/impersonate → 503 when ADMIN_TOKEN is unconfigured", async () => {
        delete process.env.ADMIN_TOKEN;
        const res = await app.request("/admin/impersonate", {
            method: "POST",
            headers: authed,
            body: JSON.stringify({ slug: "target-user" }),
        });
        expect(res.status).toBe(503);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:admin-not-configured");
    });

    // ---- impersonate happy path + not-found ----

    it("POST /admin/impersonate → 200 {token, userSlug} for an existing user", async () => {
        const res = await app.request("/admin/impersonate", {
            method: "POST",
            headers: authed,
            body: JSON.stringify({ slug: "target-user" }),
        });
        expect(res.status).toBe(200);
        const body = (await res.json()) as { token: string; userSlug: string };
        expect(body.userSlug).toBe("target-user");
        expect(typeof body.token).toBe("string");
        expect(body.token.length).toBeGreaterThan(0);

        // The minted session is real — it names the target user.
        const session = await services.repositories.sessions.findByToken(body.token);
        expect(session?.userSlug).toBe("target-user");
    });

    it("POST /admin/impersonate → 404 for an unknown target user", async () => {
        const res = await app.request("/admin/impersonate", {
            method: "POST",
            headers: authed,
            body: JSON.stringify({ slug: "ghost-user" }),
        });
        expect(res.status).toBe(404);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:not-found");
    });
});

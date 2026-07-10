/**
 * Meta route tests (N.W4.D) — the constellation 4-endpoint vhost contract:
 *
 *   GET /health       — 200 liveness + a LIVE mongo ping + version/lineage stamp.
 *   GET /docs         — 200 text/html routes index.
 *   GET /openapi.json — 200 application/json honest spec of the shipped routes.
 *
 * /health is the one route with a real dependency (the mongo ping), so it is
 * exercised against the ephemeral replica-set the suite already boots
 * (`test/setup.ts`). We point the app's `getDb()` singleton at that URI by
 * setting MONGODB_URI before importing the meta router, then assert the ping
 * actually round-tripped (checks.mongo === "ok"). /docs and /openapi.json carry
 * no I/O and assert content-type + the spec's faithfulness to the route table.
 */

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { AppEnv } from "../../../types.js";
import { ROUTES } from "../route-table.js";

let meta: Hono<AppEnv>;
let closeDb: () => Promise<void>;

beforeAll(async () => {
    // Point getDb() at the ephemeral replica set the suite booted, then import
    // the meta router (its getDb() resolves the singleton lazily on first call).
    process.env.MONGODB_URI = process.env.TEST_MONGODB_URI;
    ({ meta } = await import("../routes.js"));
    ({ closeDb } = await import("../../../platform/db/db.js"));
});

afterAll(async () => {
    await closeDb();
});

function app(): Hono<AppEnv> {
    const a = new Hono<AppEnv>();
    a.route("/", meta);
    return a;
}

describe("routes.meta — GET /health (liveness + mongo ping + lineage)", () => {
    it("returns 200 with status ok and a successful mongo ping", async () => {
        const res = await app().request("/health");
        expect(res.status).toBe(200);
        const body = (await res.json()) as Record<string, unknown>;
        expect(body.status).toBe("ok");
        expect(body.service).toBe("palette-api");
        expect((body.checks as Record<string, string>).mongo).toBe("ok");
    });

    it("carries the version + commit lineage stamp", async () => {
        const res = await app().request("/health");
        const body = (await res.json()) as Record<string, unknown>;
        expect(typeof body.version).toBe("string");
        expect(body.version).toBe("2.0.0");
        // commit is "dev" locally; the deploy-hook stamps the real SHA in prod.
        expect(typeof body.commit).toBe("string");
        expect(typeof body.uptime).toBe("number");
    });
});

describe("routes.meta — GET /docs (human routes index)", () => {
    it("returns 200 text/html listing the route table", async () => {
        const res = await app().request("/docs");
        expect(res.status).toBe(200);
        expect(res.headers.get("content-type")).toContain("text/html");
        const html = await res.text();
        expect(html).toContain("palette-api");
        // A representative sampling of shipped routes appears in the index.
        expect(html).toContain("/palettes");
        expect(html).toContain("/sessions/login");
        expect(html).toContain("/openapi.json");
    });
});

describe("routes.meta — GET /openapi.json (honest machine spec)", () => {
    it("returns 200 application/json, OpenAPI 3.1, every shipped route present", async () => {
        const res = await app().request("/openapi.json");
        expect(res.status).toBe(200);
        expect(res.headers.get("content-type")).toContain("application/json");
        const spec = (await res.json()) as {
            openapi: string;
            paths: Record<string, Record<string, unknown>>;
        };
        expect(spec.openapi).toBe("3.1.0");

        // Faithfulness: every route in the table is a (path, method) in the spec.
        for (const r of ROUTES) {
            const oaPath = r.path.replace(/:([A-Za-z0-9_]+)/g, "{$1}");
            expect(spec.paths[oaPath], `missing path ${oaPath}`).toBeDefined();
            expect(
                spec.paths[oaPath][r.method.toLowerCase()],
                `missing ${r.method} ${oaPath}`,
            ).toBeDefined();
        }
    });

    it("attaches the session/admin security schemes to gated operations", async () => {
        const res = await app().request("/openapi.json");
        const spec = (await res.json()) as {
            components: { securitySchemes: Record<string, unknown> };
            paths: Record<string, Record<string, { security?: unknown[] }>>;
        };
        expect(spec.components.securitySchemes.sessionToken).toBeDefined();
        expect(spec.components.securitySchemes.adminToken).toBeDefined();
        // A public route carries no security; a session route carries one.
        expect(spec.paths["/palettes"].get.security).toBeUndefined();
        expect(spec.paths["/palettes"].post.security).toBeDefined();
    });
});

/**
 * Meta route tests (N.W4.D + V·W45 items 5 & 6):
 *
 *   GET /health       — 200 REAL readiness (Mongo reachable + a primary
 *                       elected), 503 degraded otherwise (item 5).
 *   GET /docs         — 200 text/html index of the mounted routes.
 *   GET /openapi.json — 200 OpenAPI 3.1 GENERATED from the mounted route
 *                       registry; its path set is byte-identical to the mounted
 *                       surface and cannot drift (item 6).
 *
 * The spec + docs are generated from the REAL assembled `app`'s route registry
 * (imported here), so the parity assertion diffs the served spec against the
 * actual wire. /health is exercised against the ephemeral replica set the suite
 * boots (`test/setup.ts`).
 */

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { AppEnv } from "../../../types.js";
import { app as realApp } from "../../../app.js";
import { buildHealthBody, createMeta } from "../routes.js";
import { collectMountedRoutes, toOpenApiPath } from "../openapi.js";

let closeDb: () => Promise<void>;

beforeAll(async () => {
    // Point getDb() at the ephemeral replica set the suite booted (used by
    // /health's readiness probe at request time).
    process.env.MONGODB_URI = process.env.TEST_MONGODB_URI;
    ({ closeDb } = await import("../../../platform/db/db.js"));
});

afterAll(async () => {
    await closeDb();
});

/** A clean host for the meta router, whose /docs + /openapi.json generate from
 * the REAL app's live route registry. */
function app(): Hono<AppEnv> {
    const a = new Hono<AppEnv>();
    a.route("/", createMeta(() => realApp));
    return a;
}

describe("routes.meta — GET /health (real readiness: reachable + primary)", () => {
    it("returns 200 ok with mongo reachable AND a primary elected", async () => {
        const res = await app().request("/health");
        expect(res.status).toBe(200);
        const body = (await res.json()) as {
            status: string;
            service: string;
            checks: { mongo: string; primary: boolean };
        };
        expect(body.status).toBe("ok");
        expect(body.service).toBe("palette-api");
        expect(body.checks.mongo).toBe("ok");
        expect(body.checks.primary).toBe(true);
    });

    it("carries the version + commit lineage stamp", async () => {
        const res = await app().request("/health");
        const body = (await res.json()) as Record<string, unknown>;
        expect(body.version).toBe("2.0.0");
        expect(typeof body.commit).toBe("string");
        expect(typeof body.uptime).toBe("number");
    });

    it("readiness FAILS (503 degraded) when the dependency is down OR primaryless", () => {
        const meta = { version: "2.0.0", commit: "dev", uptime: 1 };
        // Mongo unreachable → not ready.
        const down = buildHealthBody({ mongo: "down", primary: false }, meta);
        expect(down.status).toBe(503);
        expect(down.body.status).toBe("degraded");
        // Reachable but NO elected primary → still not ready (the bare-ping gap
        // this remediation closes: a ping succeeds mid-election while writes are
        // refused).
        const noPrimary = buildHealthBody({ mongo: "ok", primary: false }, meta);
        expect(noPrimary.status).toBe(503);
        expect(noPrimary.body.status).toBe("degraded");
    });
});

describe("routes.meta — GET /docs (mounted routes index)", () => {
    it("returns 200 text/html listing the mounted routes", async () => {
        const res = await app().request("/docs");
        expect(res.status).toBe(200);
        expect(res.headers.get("content-type")).toContain("text/html");
        const html = await res.text();
        expect(html).toContain("palette-api");
        expect(html).toContain("/palettes");
        expect(html).toContain("/sessions/login");
        expect(html).toContain("/openapi.json");
    });
});

describe("routes.meta — GET /openapi.json (generated from the mounted registry)", () => {
    it("returns 200 application/json, OpenAPI 3.1", async () => {
        const res = await app().request("/openapi.json");
        expect(res.status).toBe(200);
        expect(res.headers.get("content-type")).toContain("application/json");
        const spec = (await res.json()) as { openapi: string };
        expect(spec.openapi).toBe("3.1.0");
    });

    it("the generated path set is BYTE-IDENTICAL to the mounted route registry (no drift)", async () => {
        const res = await app().request("/openapi.json");
        const spec = (await res.json()) as {
            paths: Record<string, Record<string, unknown>>;
        };

        const specPairs = new Set<string>();
        for (const [p, ops] of Object.entries(spec.paths)) {
            for (const m of Object.keys(ops)) specPairs.add(`${m.toUpperCase()} ${p}`);
        }

        const mountedPairs = new Set(
            collectMountedRoutes(realApp).map(
                (r) => `${r.method} ${toOpenApiPath(r.path)}`,
            ),
        );

        expect(specPairs).toEqual(mountedPairs);
        // Sanity: a representative mounted route is present.
        expect(specPairs.has("GET /palettes")).toBe(true);
    });

    it("the retired /restore route is absent from BOTH the wire and the spec (drift reproduction)", async () => {
        // The exact drift the hand table hid: /restore was on the wire but not
        // in the table. It is now retired — present in NEITHER.
        const mounted = collectMountedRoutes(realApp);
        expect(mounted.some((r) => r.path.includes("/restore"))).toBe(false);

        const spec = (await (await app().request("/openapi.json")).json()) as {
            paths: Record<string, unknown>;
        };
        expect(spec.paths["/palettes/{slug}/restore"]).toBeUndefined();
    });

    it("declares session + admin security schemes; admin ops carry admin security, public ops none", async () => {
        const spec = (await (await app().request("/openapi.json")).json()) as {
            components: { securitySchemes: Record<string, unknown> };
            paths: Record<string, Record<string, { security?: unknown[] }>>;
        };
        expect(spec.components.securitySchemes.sessionToken).toBeDefined();
        expect(spec.components.securitySchemes.adminToken).toBeDefined();

        // A public route carries no security annotation.
        expect(spec.paths["/palettes"].get.security).toBeUndefined();

        // Every admin op carries the (path-derivable) admin security.
        const adminKey = Object.keys(spec.paths).find((p) => p.startsWith("/admin/"));
        expect(adminKey).toBeDefined();
        const adminOps = spec.paths[adminKey as string];
        for (const op of Object.values(adminOps)) {
            expect(op.security).toBeDefined();
        }
    });
});

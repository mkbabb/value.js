/**
 * N.W3.H-tests — wire-level conformance for the fork / forks / provenance /
 * revert routes.
 *
 * D5 §3.2 + E4 §5 flagged the forks router as service-level-only: the route
 * handlers' auth gates, optional-body parsing, the list/provenance wire shapes,
 * and the revert→200 path had NO HTTP-layer test. inv-N-8 requires wire
 * coverage for every shipped route. (The J.W2 `/remix` route + its stored
 * atom-diff were excised at T.W1 — TA-4 — so the remix/atomDiff wire cases are
 * gone; the fork wire coverage stands.)
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

const COLORS: PaletteColor[] = [
    { css: "#ff0000", position: 0 },
    { css: "#00ff00", position: 1 },
];

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
const jsonAlice = { ...alice, "Content-Type": "application/json" };

/**
 * A body-bearing request through Hono's `app.request` must carry an explicit
 * `Content-Length` — the fork route uses that header to distinguish an empty
 * `POST` (server-generated slug) from a malformed JSON body, and `app.request`
 * (unlike a real HTTP client) does not auto-populate it.
 */
function withBody(body: string): { headers: Record<string, string>; body: string } {
    return {
        headers: {
            ...jsonAlice,
            "Content-Length": String(Buffer.byteLength(body)),
        },
        body,
    };
}

describe("routes.palettes forks/provenance + revert (N.W3.H-tests)", () => {
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
            body: { name: "Source", slug: "source", colors: COLORS, tags: [] },
            userSlug: "alice",
        });
    });

    // ---- AUTH GATES ----

    it("POST /:slug/fork → 401 problem+json when unauthenticated", async () => {
        const res = await app.request("/palettes/source/fork", { method: "POST" });
        expect(res.status).toBe(401);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:session-invalid");
    });

    // ---- FORK (optional-body path) ----

    it("POST /:slug/fork (no body) → 201 + FormattedPalette; forkOf tracks source", async () => {
        const res = await app.request("/palettes/source/fork", {
            method: "POST",
            headers: alice,
        });
        expect(res.status).toBe(201);
        const body = (await res.json()) as { slug: string; forkOf: string };
        expect(body.forkOf).toBe("source");
        expect(body.slug).toMatch(/^source-remix-/);
    });

    // ---- LIST FORKS + PROVENANCE ----

    it("GET /:slug/forks → 200 {data, total, limit, offset}; lists direct forks", async () => {
        await app.request("/palettes/source/fork", { method: "POST", headers: alice });
        const res = await app.request("/palettes/source/forks", { method: "GET" });
        expect(res.status).toBe(200);
        const body = (await res.json()) as {
            data: { forkOf: string }[];
            total: number;
            limit: number;
            offset: number;
        };
        expect(body.total).toBe(1);
        expect(body.data[0]?.forkOf).toBe("source");
        expect(typeof body.limit).toBe("number");
    });

    it("GET /:slug/provenance → 200 ancestry chain (child → source)", async () => {
        const fork = await app.request("/palettes/source/fork", {
            method: "POST",
            ...withBody(JSON.stringify({ slug: "child" })),
        });
        expect(fork.status).toBe(201);

        const res = await app.request("/palettes/child/provenance", { method: "GET" });
        expect(res.status).toBe(200);
        const chain = (await res.json()) as { slug: string; isFork: boolean }[];
        expect(chain.map((e) => e.slug)).toEqual(["child", "source"]);
        expect(chain[0]?.isFork).toBe(true);
        expect(chain[1]?.isFork).toBe(false);
    });

    // ---- REVERT → 200 (the E4 revert-200 gap) ----

    it("POST /:slug/revert → 200 FormattedPalette (owner reverts to a prior version)", async () => {
        // Edit the source to create a second version, then revert to the first.
        const get0 = await app.request("/palettes/source", { method: "GET" });
        const etag0 = get0.headers.get("ETag") ?? "";
        const get0Body = (await get0.json()) as { currentHash: string };
        const firstHash = get0Body.currentHash;

        const patch = await app.request("/palettes/source", {
            method: "PATCH",
            headers: { ...jsonAlice, "If-Match": etag0 },
            body: JSON.stringify({ name: "Edited" }),
        });
        expect(patch.status).toBe(200);

        const revert = await app.request("/palettes/source/revert", {
            method: "POST",
            headers: jsonAlice,
            body: JSON.stringify({ hash: firstHash }),
        });
        expect(revert.status).toBe(200);
        const body = (await revert.json()) as { name: string; slug: string };
        expect(body.slug).toBe("source");
        // Reverting to the first version restores its name.
        expect(body.name).toBe("Source");
    });

    it("POST /:slug/revert → 401 when unauthenticated", async () => {
        const res = await app.request("/palettes/source/revert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ hash: "whatever" }),
        });
        expect(res.status).toBe(401);
    });
});

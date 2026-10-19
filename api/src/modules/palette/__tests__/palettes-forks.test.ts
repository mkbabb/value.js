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
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import { palettes } from "../routes/index.js";
import { toResponseEnvelope } from "../../../platform/http/errors/index.js";
import { createPalette } from "../service/crud.js";
import type { PaletteColor } from "../model.js";
import type { AppEnv } from "../../../types.js";
import type { Services } from "../../../platform/http/inject-services.js";

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

    it("POST /:slug/forks → 401 problem+json when unauthenticated", async () => {
        const res = await app.request("/palettes/source/forks", { method: "POST" });
        expect(res.status).toBe(401);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:session-invalid");
    });

    it("POST /:slug/fork — the singular spelling is GONE, not aliased (X-W3 · G-12)", async () => {
        const res = await app.request("/palettes/source/fork", {
            method: "POST",
            headers: alice,
        });
        expect(res.status).toBe(404);
        // And nothing was created under the retired path.
        const forks = await app.request("/palettes/source/forks", {
            method: "GET",
            headers: alice,
        });
        expect(((await forks.json()) as { total: number }).total).toBe(0);
    });

    // ---- FORK (optional-body path) ----

    it("POST /:slug/forks (no body) → 201 + FormattedPalette; forkOf tracks source; child is private", async () => {
        const res = await app.request("/palettes/source/forks", {
            method: "POST",
            headers: alice,
        });
        expect(res.status).toBe(201);
        const body = (await res.json()) as {
            slug: string;
            forkOf: string;
            visibility: string;
        };
        expect(body.forkOf).toBe("source");
        expect(body.slug).toMatch(/^source-remix-/);
        // X-W3 · G-12 class 2, on the wire.
        expect(body.visibility).toBe("private");
    });

    // ---- LIST FORKS + PROVENANCE ----

    it("GET /:slug/forks → 200 {data, total, limit, offset}; discloses no child the caller may not read (X-W3 · G-13)", async () => {
        await app.request("/palettes/source/forks", { method: "POST", headers: alice });

        // The child is born private, so an anonymous caller gets an EMPTY page
        // AND a `total` that agrees with it. Before the cure this answered
        // `{total: 1, data: [<the whole child envelope>]}`.
        const anon = await app.request("/palettes/source/forks", { method: "GET" });
        expect(anon.status).toBe(200);
        const anonBody = (await anon.json()) as {
            data: { forkOf: string }[];
            total: number;
        };
        expect(anonBody.total).toBe(0);
        expect(anonBody.data).toHaveLength(0);

        const owner = await app.request("/palettes/source/forks", {
            method: "GET",
            headers: alice,
        });
        expect(owner.status).toBe(200);
        const body = (await owner.json()) as {
            data: { forkOf: string }[];
            total: number;
            limit: number;
            offset: number;
        };
        expect(body.total).toBe(1);
        expect(body.data[0]?.forkOf).toBe("source");
        expect(typeof body.limit).toBe("number");
    });

    it("GET /:slug detail `forkCount` is the viewer's own count (X-W3 · G-14)", async () => {
        await app.request("/palettes/source/forks", { method: "POST", headers: alice });

        // The stored counter was bumped by the fork write…
        const stored = await services.repositories.palettes.findBySlug("source");
        expect(stored?.forkCount).toBe(1);

        // …but the envelope publishes what the viewer may actually see. The
        // falsifier: restore `forkCount: rest.forkCount` in `format.ts` and the
        // anonymous row alone fails, disclosing the private child's existence.
        const anon = await app.request("/palettes/source", { method: "GET" });
        expect(((await anon.json()) as { forkCount: number }).forkCount).toBe(0);

        const owner = await app.request("/palettes/source", {
            method: "GET",
            headers: alice,
        });
        expect(((await owner.json()) as { forkCount: number }).forkCount).toBe(1);
    });

    it("GET /:slug/provenance → 200 ancestry chain (child → source)", async () => {
        const fork = await app.request("/palettes/source/forks", {
            method: "POST",
            ...withBody(JSON.stringify({ slug: "child" })),
        });
        expect(fork.status).toBe(201);

        // The child is private, so its own owner walks it (G-4).
        const res = await app.request("/palettes/child/provenance", {
            method: "GET",
            headers: alice,
        });
        expect(res.status).toBe(200);
        const chain = (await res.json()) as { slug: string; isFork: boolean }[];
        expect(chain.map((e) => e.slug)).toEqual(["child", "source"]);
        expect(chain[0]?.isFork).toBe(true);
        expect(chain[1]?.isFork).toBe(false);
    });

    // ---- REVERT → 201 with the appended release (X-W3 · G-9 · G-11) ----

    it("POST /:slug/revert → 201 FormattedPalette (owner reverts to a prior version)", async () => {
        // Edit the source to create a second version, then revert to the first.
        const get0 = await app.request("/palettes/source", { method: "GET" });
        const etag0 = get0.headers.get("ETag") ?? "";

        // ESC-W3.2-PAYLOAD-ADDRESSED-TESTS, taken at Repair 1: a revision is
        // addressed by its RELEASE id (`_id`, what `/versions` emits as `hash`)
        // and never by the palette's `currentHash`, which is a PAYLOAD identity
        // since G-7 split the two. The shipped client already sends the release
        // id — it reads `data[].hash` off the version list.
        const rows = await services.repositories.paletteVersions.findByPaletteSlug(
            "source",
            0,
            10,
        );
        const firstRelease = rows[rows.length - 1]?._id as string;

        const patch = await app.request("/palettes/source", {
            method: "PATCH",
            headers: { ...jsonAlice, "If-Match": etag0 },
            body: JSON.stringify({ name: "Edited" }),
        });
        expect(patch.status).toBe(200);

        // G-9: revert carries a strong `If-Match` like every other mutating
        // verb on this resource. The ETag is re-read AFTER the PATCH, because
        // the PATCH moved it.
        const etag1 =
            (await app.request("/palettes/source", { method: "GET" })).headers.get(
                "ETag",
            ) ?? "";

        const revert = await app.request("/palettes/source/revert", {
            method: "POST",
            headers: { ...jsonAlice, "If-Match": etag1 },
            body: JSON.stringify({ hash: firstRelease }),
        });
        // G-11: a revert CREATES a release, so it answers 201 and carries it.
        expect(revert.status).toBe(201);
        const body = (await revert.json()) as {
            name: string;
            slug: string;
            revision: { hash: string };
        };
        expect(body.slug).toBe("source");
        // Reverting to the first version restores its name.
        expect(body.name).toBe("Source");
        expect(typeof body.revision.hash).toBe("string");
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

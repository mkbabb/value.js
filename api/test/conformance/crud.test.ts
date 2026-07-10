/**
 * K.W2 conformance probe — the CRUD-CONTRACT v2 envelope SHAPE.
 *
 * The "test the CRUD" mandate, as a CONTRACT-SHAPE probe — NOT a re-test of
 * business logic (ownership/transaction/visibility semantics are covered by
 * `routes/palettes-ownership.test.ts` + `routes/palettes-publish.test.ts`;
 * re-asserting them here would be overfit). This binds the WIRE contract:
 *
 *   - envelope KEY SETS for create / read / patch / delete / restore;
 *   - header semantics (ETag emission on GET + PATCH; If-Match required on
 *     PATCH — 428 absent / 412 stale, lifted from palettes-ownership.test.ts);
 *   - status codes bound to the contract (201 create, 200 read/patch/delete/
 *     restore, 404 missing);
 *   - publish/unpublish in-place idempotency parity (cross-ref
 *     palettes-publish.test.ts) — the visibility flip round-trips on the SAME
 *     row + the `published` derived field tracks it.
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { Db, MongoClient } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import { palettes } from "../../src/modules/palette/routes/index.js";
import { toResponseEnvelope } from "../../src/platform/http/errors/index.js";
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
        const { status, body } = toResponseEnvelope(err);
        return c.json(body, status);
    });
    return app;
}

const owner = { "X-Test-User-Slug": "alice", "X-Test-Session-Token": "tok-alice" };
const jsonOwner = { ...owner, "Content-Type": "application/json" };

/** The canonical FormattedPalette key set (per `src/format/palette.ts`).
 * NOTE: `id` was hard-removed at K.W2 — it is deliberately absent here. The
 * optional `voted` key is omitted unless votedSlugs is supplied. */
const FORMATTED_PALETTE_KEYS = [
    "atomSetHash",
    "colors",
    "createdAt",
    "currentHash",
    "deletedAt",
    "forkCount",
    "forkOf",
    "forkOfHash",
    "isLocal",
    "name",
    "oklabColors",
    "published",
    "slug",
    "tags",
    "tier",
    "updatedAt",
    "userSlug",
    "versionCount",
    "visibility",
    "voteCount",
].sort();

describe("K.W2 conformance — CRUD-CONTRACT v2 envelope shape", () => {
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

    async function create(slug = "p"): Promise<Response> {
        return app.request("/palettes", {
            method: "POST",
            headers: jsonOwner,
            body: JSON.stringify({ name: slug, slug, colors: COLORS, tags: [] }),
        });
    }

    // ---- CREATE ----

    it("POST /palettes → 201 + FormattedPalette envelope (no `id` field)", async () => {
        const res = await create();
        expect(res.status).toBe(201);
        const body = (await res.json()) as Record<string, unknown>;
        expect(Object.keys(body).sort()).toEqual(FORMATTED_PALETTE_KEYS);
        // K.W2 hard-removal: the wire MUST NOT carry `id`.
        expect("id" in body).toBe(false);
        expect(body.isLocal).toBe(false);
        expect(body.slug).toBe("p");
    });

    // ---- READ ----

    it("GET /palettes/:slug → 200 + envelope + strong ETag header", async () => {
        await create();
        const res = await app.request("/palettes/p", { method: "GET" });
        expect(res.status).toBe(200);
        const etag = res.headers.get("ETag");
        // Strong validator, RFC 7232 double-quoted (per etag.ts).
        expect(etag).toMatch(/^".+"$/);
        const body = (await res.json()) as Record<string, unknown>;
        // GET additionally carries the per-user `voted` flag (always a boolean
        // on the single-resource read; omitted on the mutating responses where
        // `voted` is undefined). `id` is hard-removed regardless.
        expect(Object.keys(body).sort()).toEqual(
            [...FORMATTED_PALETTE_KEYS, "voted"].sort(),
        );
        expect("id" in body).toBe(false);
    });

    it("GET /palettes/:slug → 404 problem+json when slug is unknown", async () => {
        const res = await app.request("/palettes/ghost", { method: "GET" });
        expect(res.status).toBe(404);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:not-found");
    });

    // ---- PATCH (If-Match contract) ----

    it("PATCH /palettes/:slug → 428 when If-Match absent (required-on-mutation)", async () => {
        await create();
        const res = await app.request("/palettes/p", {
            method: "PATCH",
            headers: jsonOwner,
            body: JSON.stringify({ name: "Renamed" }),
        });
        expect(res.status).toBe(428);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:precondition-required");
    });

    it("PATCH /palettes/:slug → 412 when If-Match is stale", async () => {
        await create();
        const res = await app.request("/palettes/p", {
            method: "PATCH",
            headers: { ...jsonOwner, "If-Match": '"not-the-etag"' },
            body: JSON.stringify({ name: "Renamed" }),
        });
        expect(res.status).toBe(412);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:etag-mismatch");
    });

    it("PATCH /palettes/:slug → 200 + envelope + fresh ETag when If-Match matches", async () => {
        await create();
        const get = await app.request("/palettes/p", { method: "GET" });
        const etag = get.headers.get("ETag");
        expect(etag).not.toBeNull();

        const res = await app.request("/palettes/p", {
            method: "PATCH",
            headers: { ...jsonOwner, "If-Match": etag ?? "" },
            body: JSON.stringify({ name: "Renamed" }),
        });
        expect(res.status).toBe(200);
        // PATCH re-emits the ETag (the validator flips on every update).
        expect(res.headers.get("ETag")).not.toBeNull();
        const body = (await res.json()) as Record<string, unknown>;
        expect(Object.keys(body).sort()).toEqual(FORMATTED_PALETTE_KEYS);
        expect(body.name).toBe("Renamed");
    });

    // ---- DELETE → RESTORE (soft-delete envelope shapes) ----

    it("DELETE → {deleted,deletedAt}; restore → full FormattedPalette envelope", async () => {
        await create();
        const del = await app.request("/palettes/p", {
            method: "DELETE",
            headers: owner,
        });
        expect(del.status).toBe(200);
        const delBody = (await del.json()) as Record<string, unknown>;
        expect(Object.keys(delBody).sort()).toEqual(["deleted", "deletedAt"]);
        expect(delBody.deleted).toBe(true);

        const restore = await app.request("/palettes/p/restore", {
            method: "POST",
            headers: owner,
        });
        expect(restore.status).toBe(200);
        const restoreBody = (await restore.json()) as Record<string, unknown>;
        expect(Object.keys(restoreBody).sort()).toEqual(FORMATTED_PALETTE_KEYS);
        expect(restoreBody.deletedAt).toBeNull();
    });

    // ---- PUBLISH / UNPUBLISH in-place idempotency parity ----

    it("publish/unpublish round-trips in place; `published` tracks visibility", async () => {
        await create();
        const before = await db.collection("palettes").countDocuments({});

        const un = await app.request("/palettes/p/unpublish", {
            method: "POST",
            headers: { ...owner, "If-Match": "*" },
        });
        expect(un.status).toBe(200);
        const unBody = (await un.json()) as { visibility: string; published: boolean };
        expect(unBody.visibility).toBe("private");
        expect(unBody.published).toBe(false);

        const pub = await app.request("/palettes/p/publish", {
            method: "POST",
            headers: { ...owner, "If-Match": "*" },
        });
        expect(pub.status).toBe(200);
        const pubBody = (await pub.json()) as { visibility: string; published: boolean };
        expect(pubBody.visibility).toBe("public");
        expect(pubBody.published).toBe(true);

        // Anti-duplication: the flip is in-place — document count is unchanged.
        const after = await db.collection("palettes").countDocuments({});
        expect(after).toBe(before);
    });
});

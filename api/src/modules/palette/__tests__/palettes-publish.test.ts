/**
 * J.W1c — publish / unpublish routes + the [P0] public-view visibility filter.
 *
 * Asserts the load-bearing requirements: publish is an idempotent IN-PLACE
 * flag-flip on the SAME row (never a new document); the dead inv-I-2 guard's
 * first live caller; owner-gated + If-Match-guarded; soft-delete-orthogonal.
 * AND the inv-15 name-the-consumer gate: the `crud-list.ts` `visibility:public`
 * filter — without which the publish op is substrate-without-a-consumer
 * (private/unlisted palettes leak into the public browse list).
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { Db, MongoClient } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import { palettes } from "../routes/index.js";
import { toResponseEnvelope } from "../../../platform/http/errors/index.js";
import { createPalette, deletePalette } from "../service/crud.js";
import type { PaletteColor } from "../model.js";
import type { AppEnv } from "../../../types.js";
import type { Services } from "../../../platform/http/inject-services.js";

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

interface ListBody {
    data: { slug: string }[];
}

describe("routes.palettes publish/unpublish + visibility filter (J.W1c)", () => {
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
            body: { name: "P", slug: "p", colors: COLORS, tags: [] },
            userSlug: "alice",
        });
    });

    it("unpublish → private + published:false; publish → public + published:true", async () => {
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
    });

    it("[P0] consumer test: a private palette is NOT in the public list; publish adds it; unpublish removes it", async () => {
        // Anon list starts WITH p (created public).
        let res = await app.request("/palettes", { method: "GET" });
        expect(((await res.json()) as ListBody).data.some((x) => x.slug === "p")).toBe(true);

        // Unpublish → private → NOT in the anon list (the leak fix).
        await app.request("/palettes/p/unpublish", {
            method: "POST",
            headers: { ...owner, "If-Match": "*" },
        });
        res = await app.request("/palettes", { method: "GET" });
        expect(((await res.json()) as ListBody).data.some((x) => x.slug === "p")).toBe(false);

        // Publish → public → back in the list.
        await app.request("/palettes/p/publish", {
            method: "POST",
            headers: { ...owner, "If-Match": "*" },
        });
        res = await app.request("/palettes", { method: "GET" });
        expect(((await res.json()) as ListBody).data.some((x) => x.slug === "p")).toBe(true);
    });

    it("tier=featured filters the public list to featured palettes only", async () => {
        // `p` is created with tier "standard". Add a featured sibling.
        await createPalette(services, {
            body: { name: "F", slug: "feat", colors: COLORS, tags: [] },
            userSlug: "alice",
        });
        await services.repositories.palettes.update("feat", {
            $set: { tier: "featured" },
        });

        const all = await app.request("/palettes", { method: "GET" });
        const allSlugs = ((await all.json()) as ListBody).data.map((x) => x.slug);
        expect(allSlugs).toEqual(expect.arrayContaining(["p", "feat"]));

        const featured = await app.request("/palettes?tier=featured", { method: "GET" });
        const featSlugs = ((await featured.json()) as ListBody).data.map((x) => x.slug);
        expect(featSlugs).toContain("feat");
        expect(featSlugs).not.toContain("p");
    });

    it("visibility param is honored when viewing OWN, ignored (forced public) when not", async () => {
        // Make `p` private, add a public sibling owned by alice.
        await app.request("/palettes/p/unpublish", {
            method: "POST",
            headers: { ...owner, "If-Match": "*" },
        });
        await createPalette(services, {
            body: { name: "Pub", slug: "pub", colors: COLORS, tags: [] },
            userSlug: "alice",
        });

        // Owner narrows to visibility=private → sees only the private one.
        const ownPrivate = await app.request(
            "/palettes?userSlug=alice&visibility=private",
            { method: "GET", headers: owner },
        );
        const ownPrivSlugs = ((await ownPrivate.json()) as ListBody).data.map((x) => x.slug);
        expect(ownPrivSlugs).toContain("p");
        expect(ownPrivSlugs).not.toContain("pub");

        // Anon requesting visibility=private → param ignored, forced public →
        // sees only the public sibling, never the private one.
        const anon = await app.request(
            "/palettes?userSlug=alice&visibility=private",
            { method: "GET" },
        );
        const anonSlugs = ((await anon.json()) as ListBody).data.map((x) => x.slug);
        expect(anonSlugs).toContain("pub");
        expect(anonSlugs).not.toContain("p");
    });

    it("an owner viewing their OWN palettes sees their private ones; others don't", async () => {
        await app.request("/palettes/p/unpublish", {
            method: "POST",
            headers: { ...owner, "If-Match": "*" },
        });
        // Owner filtering by their own slug → sees the private palette.
        const own = await app.request("/palettes?userSlug=alice", {
            method: "GET",
            headers: owner,
        });
        expect(((await own.json()) as ListBody).data.some((x) => x.slug === "p")).toBe(true);
        // Anon filtering by alice → only her public palettes (none here).
        const anon = await app.request("/palettes?userSlug=alice", { method: "GET" });
        expect(((await anon.json()) as ListBody).data.some((x) => x.slug === "p")).toBe(false);
    });

    it("publish NEVER creates a new document (anti-duplication)", async () => {
        const before = await db.collection("palettes").countDocuments({});
        await app.request("/palettes/p/unpublish", {
            method: "POST",
            headers: { ...owner, "If-Match": "*" },
        });
        await app.request("/palettes/p/publish", {
            method: "POST",
            headers: { ...owner, "If-Match": "*" },
        });
        const after = await db.collection("palettes").countDocuments({});
        expect(after).toBe(before);
    });

    it("publishing an already-public palette is an idempotent 200 no-op", async () => {
        const res = await app.request("/palettes/p/publish", {
            method: "POST",
            headers: { ...owner, "If-Match": "*" },
        });
        expect(res.status).toBe(200);
        expect(((await res.json()) as { visibility: string }).visibility).toBe("public");
    });

    it("publish touches visibility ONLY — tier is preserved (orthogonality)", async () => {
        await services.repositories.palettes.update("p", { $set: { tier: "featured" } });
        await app.request("/palettes/p/unpublish", {
            method: "POST",
            headers: { ...owner, "If-Match": "*" },
        });
        const doc = await services.repositories.palettes.findBySlug("p");
        expect(doc?.tier).toBe("featured");
        expect(doc?.visibility).toBe("private");
    });

    it("rejects publishing a soft-deleted palette with 410 (no resurrect)", async () => {
        await deletePalette(services, { slug: "p" });
        const res = await app.request("/palettes/p/publish", {
            method: "POST",
            headers: { ...owner, "If-Match": "*" },
        });
        expect(res.status).toBe(410);
        const doc = await services.repositories.palettes.findBySlug("p");
        expect(doc?.deletedAt).not.toBeNull(); // still deleted — not resurrected
    });

    it("owner-gate: anonymous → 401; non-owner → 403", async () => {
        const anon = await app.request("/palettes/p/publish", {
            method: "POST",
            headers: { "If-Match": "*" },
        });
        expect(anon.status).toBe(401);

        const other = await app.request("/palettes/p/publish", {
            method: "POST",
            headers: { "X-Test-User-Slug": "bob", "If-Match": "*" },
        });
        expect(other.status).toBe(403);
    });

    it("If-Match guard: absent → 428; stale → 412", async () => {
        const absent = await app.request("/palettes/p/publish", {
            method: "POST",
            headers: owner,
        });
        expect(absent.status).toBe(428);

        const stale = await app.request("/palettes/p/publish", {
            method: "POST",
            headers: { ...owner, "If-Match": '"not-the-etag"' },
        });
        expect(stale.status).toBe(412);
    });
});

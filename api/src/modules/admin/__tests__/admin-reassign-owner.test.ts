/**
 * X·§0hi item 1 (OD-3b) — the admin owner-reassignment verb,
 * `POST /admin/palettes/:slug/owner { userSlug }`.
 *
 * Mounted on the REAL admin router so the bearer gate is exercised: no token
 * is 401, a wrong token is 403. The verb moves `Palette.userSlug` only — the
 * new owner's `/palettes/mine` shelf lists the palette and the old owner's
 * does not; historical authorship (`PaletteVersion.authorSlug`) and the ETag
 * (ownership is not content) are untouched; every call emits one audit row.
 */

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { Db, MongoClient } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import admin from "../routes/index.js";
import { toResponseEnvelope } from "../../../platform/http/errors/index.js";
import { asUserSlug } from "../../session/model.js";
import { createPalette } from "../../palette/service/crud.js";
import { listMine } from "../../palette/service/crud-list.js";
import type { AppEnv } from "../../../types.js";
import type { Services } from "../../../platform/http/inject-services.js";

const ADMIN_TOKEN = "test-admin-token";
const authed = { Authorization: `Bearer ${ADMIN_TOKEN}`, "Content-Type": "application/json" };

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

describe("routes.admin POST /admin/palettes/:slug/owner (OD-3b)", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;
    let app: Hono<AppEnv>;
    let priorToken: string | undefined;

    const reassign = (slug: string, userSlug: string, headers: Record<string, string> = authed) =>
        app.request(`/admin/palettes/${slug}/owner`, {
            method: "POST",
            headers,
            body: JSON.stringify({ userSlug }),
        });

    beforeAll(async () => {
        ({ client, db } = await connect());
        await db.collection("palettes").createIndex({ slug: 1 }, { unique: true });
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
        for (const slug of ["old-owner", "new-owner"]) {
            await services.repositories.users.insert({
                _id: asUserSlug(slug),
                createdAt: new Date(),
                lastSeenAt: new Date(),
            });
        }
        await createPalette(services, {
            body: { name: "Moving", slug: "moving", colors: [{ css: "#fff", position: 0 }], tags: [] },
            userSlug: "old-owner",
        });
    });

    afterEach(() => {
        if (priorToken === undefined) delete process.env.ADMIN_TOKEN;
        else process.env.ADMIN_TOKEN = priorToken;
    });

    it("401 with no Authorization header; nothing moves", async () => {
        const res = await reassign("moving", "new-owner", { "Content-Type": "application/json" });
        expect(res.status).toBe(401);
        expect((await services.repositories.palettes.findBySlug("moving"))?.userSlug).toBe("old-owner");
    });

    it("403 with a non-admin bearer token; nothing moves", async () => {
        const res = await reassign("moving", "new-owner", {
            Authorization: "Bearer not-the-admin-token",
            "Content-Type": "application/json",
        });
        expect(res.status).toBe(403);
        expect((await services.repositories.palettes.findBySlug("moving"))?.userSlug).toBe("old-owner");
    });

    it("200 moves ownership: the new owner's shelf lists it, the old owner's does not", async () => {
        const before = await services.repositories.palettes.findBySlug("moving");
        const res = await reassign("moving", "new-owner");
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({
            slug: "moving",
            userSlug: "new-owner",
            previousUserSlug: "old-owner",
        });
        const after = await services.repositories.palettes.findBySlug("moving");
        expect(after?.userSlug).toBe("new-owner");
        // Ownership is not content: the validator the ETag derives from stays.
        expect(after?.currentHash).toBe(before?.currentHash);
        expect(after?.updatedAt?.toISOString()).toBe(before?.updatedAt?.toISOString());

        expect((await listMine(services, "new-owner", 100, 0)).data.map((p) => p.slug)).toEqual(["moving"]);
        expect((await listMine(services, "old-owner", 100, 0)).total).toBe(0);
    });

    it("leaves historical authorship (PaletteVersion.authorSlug) as it was", async () => {
        await reassign("moving", "new-owner");
        const versions = await db.collection("palette_versions").find({ paletteSlug: "moving" }).toArray();
        expect(versions.length).toBeGreaterThan(0);
        for (const v of versions) expect(v.authorSlug).toBe("old-owner");
    });

    it("emits one reassign-palette-owner audit row naming both owners", async () => {
        await reassign("moving", "new-owner");
        const audit = await services.repositories.adminAudit.findManyByFilter({}, 0, 10);
        const rows = audit.filter((a) => a.action === "reassign-palette-owner");
        expect(rows).toHaveLength(1);
        expect(rows[0]!.target).toContain("slug=moving");
        expect(rows[0]!.target).toContain("from=old-owner");
        expect(rows[0]!.target).toContain("to=new-owner");
    });

    it("is idempotent: a repeat is 200 with no change, and still audits", async () => {
        await reassign("moving", "new-owner");
        const res = await reassign("moving", "new-owner");
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({
            slug: "moving",
            userSlug: "new-owner",
            previousUserSlug: "new-owner",
        });
        const audit = await services.repositories.adminAudit.findManyByFilter({}, 0, 10);
        expect(audit.filter((a) => a.action === "reassign-palette-owner")).toHaveLength(2);
    });

    it("404 for an unknown target user", async () => {
        const res = await reassign("moving", "ghost-user");
        expect(res.status).toBe(404);
        expect((await services.repositories.palettes.findBySlug("moving"))?.userSlug).toBe("old-owner");
    });

    it("404 for an unknown palette", async () => {
        expect((await reassign("ghost", "new-owner")).status).toBe(404);
    });

    it("404 for a soft-deleted palette", async () => {
        await services.repositories.palettes.update("moving", { $set: { deletedAt: new Date() } });
        expect((await reassign("moving", "new-owner")).status).toBe(404);
    });

    it("400 for a body without a userSlug", async () => {
        const res = await app.request("/admin/palettes/moving/owner", {
            method: "POST",
            headers: authed,
            body: JSON.stringify({}),
        });
        expect(res.status).toBe(400);
    });
});

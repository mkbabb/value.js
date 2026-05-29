import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import {
    buildServices,
    cleanCollections,
    connect,
    makeFakeContext,
} from "../helpers.js";
import {
    deletePalette as adminDeletePalette,
    toggleFeature,
} from "../../src/services/admin/palettes.js";
import { createPalette } from "../../src/services/palette/crud.js";
import { NotFoundError } from "../../src/errors/index.js";
import type { Services } from "../../src/middleware/inject-services.js";

describe("service.admin.palettes", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;

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
        await createPalette(services, {
            body: {
                name: "Mod-Target",
                slug: "mod",
                colors: [{ css: "#fff", position: 0 }],
                tags: [],
            },
            sessionToken: "tok",
            userSlug: "alice",
        });
    });

    it("toggleFeature flips published ↔ featured", async () => {
        const c = makeFakeContext(services, "admin");
        const r1 = await toggleFeature(c, "mod");
        expect(r1.status).toBe("featured");
        const r2 = await toggleFeature(c, "mod");
        expect(r2.status).toBe("published");
    });

    it("toggleFeature missing slug throws NotFoundError", async () => {
        const c = makeFakeContext(services, "admin");
        await expect(toggleFeature(c, "ghost")).rejects.toBeInstanceOf(NotFoundError);
    });

    it("admin deletePalette soft-deletes + emits audit (I.W2)", async () => {
        // I.W2: admin delete is now soft. Votes + flags remain attached;
        // the reaper cron cascades them at hard-delete (past grace).
        await services.repositories.votes.upsertIdempotent("bob", "mod");
        await services.repositories.flags.insert({
            paletteSlug: "mod",
            reporterSlug: "carol",
            reason: "spam",
            detail: null,
            createdAt: new Date(),
        });
        const c = makeFakeContext(services, "admin");
        await adminDeletePalette(c, "mod");
        const doc = await services.repositories.palettes.findBySlug("mod");
        expect(doc).not.toBeNull();
        expect(doc?.deletedAt).toBeInstanceOf(Date);
        // The vote/flag stay attached until the grace window expires.
        expect(await services.repositories.votes.findOne("bob", "mod")).not.toBeNull();
        const audit = await services.repositories.adminAudit.findManyByFilter({}, 0, 10);
        expect(audit.find((a) => a.action === "delete-palette")).toBeDefined();
    });

    it("admin deletePalette missing slug throws NotFoundError", async () => {
        const c = makeFakeContext(services, "admin");
        await expect(adminDeletePalette(c, "ghost")).rejects.toBeInstanceOf(
            NotFoundError,
        );
    });
});

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import {
    buildServices,
    cleanCollections,
    connect,
    makeFakeContext,
} from "../helpers.js";
import {
    createTag,
    deleteTag,
    listTags,
} from "../../src/services/admin/tags.js";
import {
    ConflictError,
    NotFoundError,
} from "../../src/errors/index.js";
import type { Services } from "../../src/middleware/inject-services.js";

describe("service.admin.tags", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;

    beforeAll(async () => {
        ({ client, db } = await connect());
        await db.collection("tags").createIndex({ name: 1 }, { unique: true });
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        services = buildServices(db, client);
    });

    it("createTag inserts + listTags returns sorted", async () => {
        const c = makeFakeContext(services, "admin");
        await createTag(c, "zeta", "temp");
        await createTag(c, "alpha", "mood");
        const rows = await listTags(c);
        expect(rows.map((t) => t.name)).toEqual(["alpha", "zeta"]);
    });

    it("createTag duplicate raises ConflictError", async () => {
        const c = makeFakeContext(services, "admin");
        await createTag(c, "dup", "x");
        await expect(createTag(c, "dup", "y")).rejects.toBeInstanceOf(ConflictError);
    });

    it("deleteTag cascades $pull from palettes that carry it", async () => {
        const c = makeFakeContext(services, "admin");
        await createTag(c, "delme", "x");
        await services.repositories.palettes.insert({
            name: "p",
            slug: "p",
            colors: [{ css: "#fff", position: 0 }],
            oklabColors: [],
            tags: ["delme", "keep"],
            voteCount: 0,
            sessionToken: null,
            userSlug: "alice",
            status: "published",
            visibility: "public",
            tier: "standard",
            createdAt: new Date(),
            updatedAt: new Date(),
            currentHash: null,
            forkOf: null,
            forkOfHash: null,
            forkCount: 0,
            versionCount: 1,
        });
        await deleteTag(c, "delme");
        const palette = await services.repositories.palettes.findBySlug("p");
        expect(palette?.tags).toEqual(["keep"]);
    });

    it("deleteTag missing tag throws NotFoundError", async () => {
        const c = makeFakeContext(services, "admin");
        await expect(deleteTag(c, "ghost")).rejects.toBeInstanceOf(NotFoundError);
    });
});

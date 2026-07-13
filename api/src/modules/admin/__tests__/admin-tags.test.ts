import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import {
    createTag,
    deleteTag,
    listTags,
} from "../service/tags.js";
import {
    ConflictError,
    NotFoundError,
} from "../../../platform/http/errors/index.js";
import type { Services } from "../../../platform/http/inject-services.js";

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
        await createTag(services, "admin", "zeta", "temp");
        await createTag(services, "admin", "alpha", "mood");
        const rows = await listTags(services);
        expect(rows.map((t) => t.name)).toEqual(["alpha", "zeta"]);
    });

    it("createTag duplicate raises ConflictError", async () => {
        await createTag(services, "admin", "dup", "x");
        await expect(
            createTag(services, "admin", "dup", "y"),
        ).rejects.toBeInstanceOf(ConflictError);
    });

    it("deleteTag cascades $pull from palettes that carry it", async () => {
        await createTag(services, "admin", "delme", "x");
        await services.repositories.palettes.insert({
            name: "p",
            slug: "p",
            colors: [{ css: "#fff", position: 0 }],
            oklabColors: [],
            tags: ["delme", "keep"],
            voteCount: 0,
            userSlug: "alice",
            visibility: "public",
            tier: "standard",
            deletedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            currentHash: null,
            forkOf: null,
            forkOfHash: null,
            forkCount: 0,
            versionCount: 1,
        });
        await deleteTag(services, "admin", "delme");
        const palette = await services.repositories.palettes.findBySlug("p");
        expect(palette?.tags).toEqual(["keep"]);
    });

    it("deleteTag missing tag throws NotFoundError", async () => {
        await expect(
            deleteTag(services, "admin", "ghost"),
        ).rejects.toBeInstanceOf(NotFoundError);
    });
});

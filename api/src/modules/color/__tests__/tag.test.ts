import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { cleanCollections, connect } from "../../../../test/helpers.js";
import { TagRepository } from "../repository/tag.js";
import type { Tag } from "../model.js";

describe("repository.tag", () => {
    let client: MongoClient;
    let db: Db;
    let repo: TagRepository;

    beforeAll(async () => {
        ({ client, db } = await connect());
        await db.collection("tags").createIndex({ name: 1 }, { unique: true });
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        repo = new TagRepository(db.collection<Tag>("tags"));
    });

    it("insert + findByName round-trip", async () => {
        await repo.insert({ name: "warm", category: "temperature", createdAt: new Date() });
        const found = await repo.findByName("warm");
        expect(found?.category).toBe("temperature");
    });

    it("findAllSorted returns tags sorted by name asc", async () => {
        await repo.insert({ name: "zeta", category: "x", createdAt: new Date() });
        await repo.insert({ name: "alpha", category: "y", createdAt: new Date() });
        await repo.insert({ name: "mu", category: "z", createdAt: new Date() });
        const rows = await repo.findAllSorted();
        expect(rows.map((t) => t.name)).toEqual(["alpha", "mu", "zeta"]);
    });

    it("duplicate insert raises a duplicate-key error (unique index)", async () => {
        await repo.insert({ name: "dup", category: "a", createdAt: new Date() });
        await expect(
            repo.insert({ name: "dup", category: "b", createdAt: new Date() }),
        ).rejects.toMatchObject({ code: 11000 });
    });

    it("deleteByName returns 1 / 0", async () => {
        await repo.insert({ name: "delme", category: "x", createdAt: new Date() });
        expect(await repo.deleteByName("delme")).toBe(1);
        expect(await repo.deleteByName("nothere")).toBe(0);
    });
});

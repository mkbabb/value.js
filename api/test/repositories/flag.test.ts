import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { cleanCollections, connect } from "../helpers.js";
import { FlagRepository } from "../../src/repositories/flag.js";
import type { Flag } from "../../src/models.js";

describe("repository.flag", () => {
    let client: MongoClient;
    let db: Db;
    let repo: FlagRepository;

    beforeAll(async () => {
        ({ client, db } = await connect());
        await db
            .collection("flags")
            .createIndex({ paletteSlug: 1, reporterSlug: 1 }, { unique: true });
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        repo = new FlagRepository(db.collection<Flag>("flags"));
    });

    it("insert + countDistinctPalettes after one flag", async () => {
        await repo.insert({
            paletteSlug: "p1",
            reporterSlug: "alice",
            reason: "spam",
            detail: null,
            createdAt: new Date(),
        });
        expect(await repo.countDistinctPalettes()).toBe(1);
    });

    it("duplicate flag (same reporter+palette) raises 11000", async () => {
        await repo.insert({
            paletteSlug: "p1",
            reporterSlug: "alice",
            reason: "spam",
            detail: null,
            createdAt: new Date(),
        });
        await expect(
            repo.insert({
                paletteSlug: "p1",
                reporterSlug: "alice",
                reason: "spam",
                detail: null,
                createdAt: new Date(),
            }),
        ).rejects.toMatchObject({ code: 11000 });
    });

    it("deleteByPaletteSlug removes flags for one palette only", async () => {
        await repo.insert({
            paletteSlug: "p1",
            reporterSlug: "a",
            reason: "spam",
            detail: null,
            createdAt: new Date(),
        });
        await repo.insert({
            paletteSlug: "p1",
            reporterSlug: "b",
            reason: "inappropriate",
            detail: null,
            createdAt: new Date(),
        });
        await repo.insert({
            paletteSlug: "p2",
            reporterSlug: "a",
            reason: "other",
            detail: null,
            createdAt: new Date(),
        });
        const removed = await repo.deleteByPaletteSlug("p1");
        expect(removed).toBe(2);
        expect(await repo.countDistinctPalettes()).toBe(1);
    });

    it("aggregateFlaggedPalettes groups by paletteSlug + counts", async () => {
        await repo.insert({
            paletteSlug: "p1",
            reporterSlug: "a",
            reason: "spam",
            detail: null,
            createdAt: new Date(),
        });
        await repo.insert({
            paletteSlug: "p1",
            reporterSlug: "b",
            reason: "inappropriate",
            detail: null,
            createdAt: new Date(),
        });
        const rows = await repo.aggregateFlaggedPalettes(0, 100);
        expect(rows).toHaveLength(1);
        expect(rows[0].flagCount).toBe(2);
    });
});

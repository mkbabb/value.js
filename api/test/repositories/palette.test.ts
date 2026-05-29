import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { connect, cleanCollections } from "../helpers.js";
import { PaletteRepository } from "../../src/repositories/palette.js";
import type { Palette } from "../../src/models.js";

function makePalette(overrides: Partial<Palette> = {}): Palette {
    const now = new Date();
    return {
        name: "Sample",
        slug: "sample",
        colors: [{ css: "#ff0000", position: 0 }],
        oklabColors: [{ L: 0.6, a: 0.2, b: 0.1 }],
        tags: [],
        voteCount: 0,
        sessionToken: null,
        userSlug: null,
        status: "published",
        visibility: "public",
        tier: "standard",
        createdAt: now,
        updatedAt: now,
        currentHash: "hash-sample",
        forkOf: null,
        forkOfHash: null,
        forkCount: 0,
        versionCount: 1,
        ...overrides,
    };
}

describe("repository.palette", () => {
    let client: MongoClient;
    let db: Db;
    let repo: PaletteRepository;

    beforeAll(async () => {
        ({ client, db } = await connect());
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        repo = new PaletteRepository(db.collection<Palette>("palettes"));
    });

    it("inserts and findBySlug returns the inserted document", async () => {
        const slug = await repo.insert(makePalette({ slug: "alpha", name: "Alpha" }));
        expect(slug).toBe("alpha");
        const found = await repo.findBySlug("alpha");
        expect(found).not.toBeNull();
        expect(found?.name).toBe("Alpha");
    });

    it("findBySlug returns null when nothing matches", async () => {
        const found = await repo.findBySlug("missing");
        expect(found).toBeNull();
    });

    it("update applies a $set and is observable via findBySlug", async () => {
        await repo.insert(makePalette({ slug: "beta", name: "Beta" }));
        await repo.update("beta", { $set: { name: "Beta-2" } });
        const found = await repo.findBySlug("beta");
        expect(found?.name).toBe("Beta-2");
    });

    it("incrementVoteCount applies +1 / -1 deltas", async () => {
        await repo.insert(makePalette({ slug: "vote", voteCount: 5 }));
        await repo.incrementVoteCount("vote", 1);
        expect((await repo.findBySlug("vote"))?.voteCount).toBe(6);
        await repo.incrementVoteCount("vote", -1);
        expect((await repo.findBySlug("vote"))?.voteCount).toBe(5);
    });

    it("findByUserSlug + countByUserSlug return only this user's palettes", async () => {
        await repo.insert(makePalette({ slug: "u-1", userSlug: "alice" }));
        await repo.insert(makePalette({ slug: "u-2", userSlug: "alice" }));
        await repo.insert(makePalette({ slug: "u-3", userSlug: "bob" }));
        const list = await repo.findByUserSlug("alice", 0, 10);
        expect(list).toHaveLength(2);
        expect(await repo.countByUserSlug("alice")).toBe(2);
        expect(await repo.countByUserSlug("bob")).toBe(1);
    });

    it("findForksOf + incrementForkCount + decrementForkCount round-trip", async () => {
        await repo.insert(makePalette({ slug: "root" }));
        await repo.insert(makePalette({ slug: "fork-1", forkOf: "root" }));
        await repo.insert(makePalette({ slug: "fork-2", forkOf: "root" }));
        expect(await repo.countForksOf("root")).toBe(2);
        await repo.incrementForkCount("root");
        expect((await repo.findBySlug("root"))?.forkCount).toBe(1);
        await repo.decrementForkCount("root");
        expect((await repo.findBySlug("root"))?.forkCount).toBe(0);
    });

    it("decrementForkCount is bounded at zero", async () => {
        await repo.insert(makePalette({ slug: "zero", forkCount: 0 }));
        await repo.decrementForkCount("zero");
        expect((await repo.findBySlug("zero"))?.forkCount).toBe(0);
    });

    it("delete removes the document; deleteManyByUserSlug cascades", async () => {
        await repo.insert(makePalette({ slug: "del-1", userSlug: "u" }));
        await repo.insert(makePalette({ slug: "del-2", userSlug: "u" }));
        expect(await repo.delete("del-1")).toBe(1);
        expect(await repo.findBySlug("del-1")).toBeNull();
        expect(await repo.deleteManyByUserSlug("u")).toBe(1);
        expect(await repo.countByUserSlug("u")).toBe(0);
    });

    it("pullTagFromAll removes the tag from every palette carrying it", async () => {
        await repo.insert(makePalette({ slug: "t-1", tags: ["red", "warm"] }));
        await repo.insert(makePalette({ slug: "t-2", tags: ["red", "cool"] }));
        await repo.insert(makePalette({ slug: "t-3", tags: ["blue"] }));
        const touched = await repo.pullTagFromAll("red");
        expect(touched).toBe(2);
        expect((await repo.findBySlug("t-1"))?.tags).toEqual(["warm"]);
        expect((await repo.findBySlug("t-2"))?.tags).toEqual(["cool"]);
        expect((await repo.findBySlug("t-3"))?.tags).toEqual(["blue"]);
    });
});

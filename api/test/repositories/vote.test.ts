import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { cleanCollections, connect } from "../helpers.js";
import { VoteRepository } from "../../src/repositories/vote.js";
import type { Vote } from "../../src/models.js";

describe("repository.vote", () => {
    let client: MongoClient;
    let db: Db;
    let repo: VoteRepository;

    beforeAll(async () => {
        ({ client, db } = await connect());
        // Ensure the unique index exists for upsertIdempotent's correctness.
        await db
            .collection("votes")
            .createIndex({ userSlug: 1, paletteSlug: 1 }, { unique: true });
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        repo = new VoteRepository(db.collection<Vote>("votes"));
    });

    it("upsertIdempotent reports inserted=true on first call", async () => {
        const result = await repo.upsertIdempotent("alice", "palette-a");
        expect(result.inserted).toBe(true);
        const found = await repo.findOne("alice", "palette-a");
        expect(found).not.toBeNull();
    });

    it("upsertIdempotent reports inserted=false on repeat", async () => {
        await repo.upsertIdempotent("alice", "palette-a");
        const result = await repo.upsertIdempotent("alice", "palette-a");
        expect(result.inserted).toBe(false);
    });

    it("deleteOne reports true iff a vote was removed", async () => {
        await repo.upsertIdempotent("alice", "palette-a");
        expect(await repo.deleteOne("alice", "palette-a")).toBe(true);
        expect(await repo.deleteOne("alice", "palette-a")).toBe(false);
    });

    it("findByUserAndPaletteSlugs returns the intersection", async () => {
        await repo.upsertIdempotent("alice", "p1");
        await repo.upsertIdempotent("alice", "p2");
        await repo.upsertIdempotent("bob", "p1");
        const rows = await repo.findByUserAndPaletteSlugs("alice", ["p1", "p2", "p3"]);
        expect(rows.map((r) => r.paletteSlug).sort()).toEqual(["p1", "p2"]);
    });

    it("deleteByPaletteSlug cascades all votes for that palette", async () => {
        await repo.upsertIdempotent("alice", "p");
        await repo.upsertIdempotent("bob", "p");
        await repo.upsertIdempotent("alice", "other");
        const removed = await repo.deleteByPaletteSlug("p");
        expect(removed).toBe(2);
        expect(await repo.findOne("alice", "other")).not.toBeNull();
    });
});

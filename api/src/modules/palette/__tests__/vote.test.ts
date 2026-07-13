import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { cleanCollections, connect } from "../../../../test/helpers.js";
import { VoteRepository } from "../repository/vote.js";
import type { Vote } from "../model.js";

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

    it("deleteOrphaned reaps only votes whose slug is absent from validSlugs", async () => {
        await repo.upsertIdempotent("alice", "live");
        await repo.upsertIdempotent("bob", "dead");
        // `dead` is not in the live inventory → its vote is an orphan; `live` is.
        const removed = await repo.deleteOrphaned(["live"], new Date(Date.now() + 1000));
        expect(removed).toBe(1);
        expect(await repo.findOne("alice", "live")).not.toBeNull();
        expect(await repo.findOne("bob", "dead")).toBeNull();
    });

    it("deleteOrphaned does NOT reap a vote cast after the sweep snapshot (TOCTOU boundary)", async () => {
        // Simulate the cron race: the sweep captured `sweepStart` and a slug
        // snapshot that does NOT contain `new-palette` (it was created after).
        // A vote on that brand-new palette carries createdAt >= sweepStart, so
        // it must fall OUTSIDE the orphan filter and survive (N.W3.A). We insert
        // the vote directly to control its `createdAt` (the repo upsert always
        // stamps `new Date()`).
        const sweepStart = new Date();
        const after = new Date(sweepStart.getTime() + 5_000);
        await db
            .collection<Vote>("votes")
            .insertOne({ userSlug: "carol", paletteSlug: "new-palette", createdAt: after });
        // The validSlugs snapshot is empty (the palette didn't exist at sweep).
        const removed = await repo.deleteOrphaned([], sweepStart);
        expect(removed).toBe(0);
        expect(await repo.findOne("carol", "new-palette")).not.toBeNull();
    });

    it("deleteOrphaned DOES reap a genuinely-old orphan (slug absent AND predates the sweep)", async () => {
        const before = new Date(Date.now() - 60_000);
        await db
            .collection<Vote>("votes")
            .insertOne({ userSlug: "dave", paletteSlug: "gone", createdAt: before });
        const sweepStart = new Date();
        const removed = await repo.deleteOrphaned([], sweepStart);
        expect(removed).toBe(1);
        expect(await repo.findOne("dave", "gone")).toBeNull();
    });
});

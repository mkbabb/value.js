import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import { toggleVote } from "../service/votes.js";
import { createPalette } from "../service/crud.js";
import { NotFoundError } from "../../../platform/http/errors/index.js";
import type { Services } from "../../../platform/http/inject-services.js";

describe("service.palette.votes", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;

    beforeAll(async () => {
        ({ client, db } = await connect());
        await db.collection("palettes").createIndex({ slug: 1 }, { unique: true });
        await db
            .collection("votes")
            .createIndex({ userSlug: 1, paletteSlug: 1 }, { unique: true });
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        services = buildServices(db, client);
        // Seed one palette to vote on
        await createPalette(services, {
            body: {
                name: "Votable",
                slug: "votable",
                colors: [{ css: "#fff", position: 0 }],
                tags: [],
            },
            userSlug: "owner",
        });
    });

    it("toggleVote increments on first vote and reflects voted=true", async () => {
        const result = await toggleVote(services, "votable", "alice");
        expect(result.voted).toBe(true);
        expect(result.voteCount).toBe(1);
    });

    it("toggleVote decrements on second call (toggle off)", async () => {
        await toggleVote(services, "votable", "alice");
        const off = await toggleVote(services, "votable", "alice");
        expect(off.voted).toBe(false);
        expect(off.voteCount).toBe(0);
    });

    it("toggleVote on missing palette throws NotFoundError", async () => {
        await expect(toggleVote(services, "ghost", "alice")).rejects.toBeInstanceOf(
            NotFoundError,
        );
    });

    it("two different users each contribute +1", async () => {
        await toggleVote(services, "votable", "alice");
        const r2 = await toggleVote(services, "votable", "bob");
        expect(r2.voteCount).toBe(2);
    });

    // SS8-0366 (Meta U-4): a same-user double toggle whose second request
    // loses the upsert race (the first request's vote row lands between its
    // delete and its upsert, before the first request's `$inc`) answered
    // `{voted:true, voteCount:0}` — a self-inconsistent reply. The loser's
    // count is read from the vote rows, which already hold its vote.
    it("a race-loser reply counts the vote it reports", async () => {
        const votes = services.repositories.votes;
        const deleteOne = votes.deleteOne.bind(votes);
        votes.deleteOne = async (userSlug, paletteSlug) => {
            const removed = await deleteOne(userSlug, paletteSlug);
            await db
                .collection("votes")
                .insertOne({ userSlug, paletteSlug, createdAt: new Date() });
            return removed;
        };
        const loser = await toggleVote(services, "votable", "alice");
        expect(loser).toEqual({ voted: true, voteCount: 1 });
    });
});

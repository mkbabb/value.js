import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import { toggleVote } from "../../src/services/palette/votes.js";
import { createPalette } from "../../src/services/palette/crud.js";
import { NotFoundError } from "../../src/errors/index.js";
import type { Services } from "../../src/middleware/inject-services.js";

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
});

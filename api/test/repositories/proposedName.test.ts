import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { cleanCollections, connect } from "../helpers.js";
import { ProposedNameRepository } from "../../src/modules/color/repository/proposedName.js";
import type { ProposedName } from "../../src/modules/color/model.js";

describe("repository.proposedName", () => {
    let client: MongoClient;
    let db: Db;
    let repo: ProposedNameRepository;

    beforeAll(async () => {
        ({ client, db } = await connect());
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        repo = new ProposedNameRepository(db.collection<ProposedName>("proposed_names"));
    });

    it("insert + findById round-trip", async () => {
        const id = await repo.insert({
            name: "test-red",
            css: "#ff0000",
            status: "proposed",
            contributor: "alice",
            createdAt: new Date(),
            approvedAt: null,
        });
        const found = await repo.findById(id);
        expect(found?.name).toBe("test-red");
    });

    it("findByName returns the matching doc", async () => {
        await repo.insert({
            name: "azure-glow",
            css: "#00aaff",
            status: "approved",
            contributor: null,
            createdAt: new Date(),
            approvedAt: new Date(),
        });
        const found = await repo.findByName("azure-glow");
        expect(found?.css).toBe("#00aaff");
    });

    it("findByStatus paginates and counts", async () => {
        for (let i = 0; i < 5; i++) {
            await repo.insert({
                name: `proposed-${i}`,
                css: "#ffffff",
                status: "proposed",
                contributor: null,
                createdAt: new Date(),
                approvedAt: null,
            });
        }
        await repo.insert({
            name: "approved-1",
            css: "#eeeeee",
            status: "approved",
            contributor: null,
            createdAt: new Date(),
            approvedAt: new Date(),
        });
        const proposed = await repo.findByStatus("proposed", 0, 100);
        expect(proposed).toHaveLength(5);
        expect(await repo.countByStatus("proposed")).toBe(5);
        expect(await repo.countByStatus("approved")).toBe(1);
    });

    it("transitionStatus only fires when the source status matches", async () => {
        const id = await repo.insert({
            name: "trans",
            css: "#abc",
            status: "proposed",
            contributor: null,
            createdAt: new Date(),
            approvedAt: null,
        });
        const ok = await repo.transitionStatus(id, "proposed", "approved", {
            approvedAt: new Date(),
        });
        expect(ok).toBe(true);
        // Second call: status is no longer "proposed"
        const ok2 = await repo.transitionStatus(id, "proposed", "rejected");
        expect(ok2).toBe(false);
    });

    it("delete removes by id", async () => {
        const id = await repo.insert({
            name: "to-delete",
            css: "#000",
            status: "proposed",
            contributor: null,
            createdAt: new Date(),
            approvedAt: null,
        });
        expect(await repo.delete(id)).toBe(1);
        expect(await repo.findById(id)).toBeNull();
    });
});

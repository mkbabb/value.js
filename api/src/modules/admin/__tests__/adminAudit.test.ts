import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { cleanCollections, connect } from "../../../../test/helpers.js";
import { AdminAuditRepository } from "../repository/adminAudit.js";
import type { AdminAuditEvent } from "../model.js";

describe("repository.adminAudit", () => {
    let client: MongoClient;
    let db: Db;
    let repo: AdminAuditRepository;

    beforeAll(async () => {
        ({ client, db } = await connect());
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        repo = new AdminAuditRepository(
            db.collection<AdminAuditEvent>("admin_audit"),
        );
    });

    it("insert + findManyByFilter round-trip", async () => {
        await repo.insert({
            action: "delete-color",
            actorSlug: "admin",
            timestamp: new Date(),
            target: "id=xyz",
        });
        const rows = await repo.findManyByFilter({}, 0, 50);
        expect(rows).toHaveLength(1);
        expect(rows[0].action).toBe("delete-color");
    });

    it("findManyByFilter sorts by timestamp desc", async () => {
        await repo.insert({
            action: "a",
            timestamp: new Date("2026-01-01T00:00:00Z"),
        });
        await repo.insert({
            action: "b",
            timestamp: new Date("2026-01-03T00:00:00Z"),
        });
        await repo.insert({
            action: "c",
            timestamp: new Date("2026-01-02T00:00:00Z"),
        });
        const rows = await repo.findManyByFilter({}, 0, 50);
        expect(rows.map((r) => r.action)).toEqual(["b", "c", "a"]);
    });

    it("countByFilter respects the action filter", async () => {
        for (let i = 0; i < 3; i++) {
            await repo.insert({ action: "delete-user", timestamp: new Date() });
        }
        await repo.insert({ action: "approve-color", timestamp: new Date() });
        expect(await repo.countByFilter({ action: "delete-user" })).toBe(3);
        expect(await repo.countByFilter({ action: "approve-color" })).toBe(1);
    });
});

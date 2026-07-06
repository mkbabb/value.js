import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import {
    approveColor,
    deleteColor,
    listByStatus,
    rejectColor,
} from "../../src/services/admin/colors.js";
import {
    NotFoundError,
    ValidationError,
} from "../../src/errors/index.js";
import type { Services } from "../../src/middleware/inject-services.js";

describe("service.admin.colors", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;

    beforeAll(async () => {
        ({ client, db } = await connect());
        await db
            .collection("proposed_names")
            .createIndex({ name: 1 }, { unique: true });
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        services = buildServices(db, client);
    });

    it("listByStatus returns proposed names paginated", async () => {
        await services.repositories.proposedNames.insert({
            name: "red-1",
            css: "#ff0000",
            status: "proposed",
            contributor: "alice",
            createdAt: new Date(),
            approvedAt: null,
        });
        const page = await listByStatus(services, "proposed", 10, 0);
        expect(page.total).toBe(1);
        expect(page.data[0].name).toBe("red-1");
    });

    it("approveColor transitions proposed → approved + emits audit", async () => {
        const id = await services.repositories.proposedNames.insert({
            name: "blue-1",
            css: "#0000ff",
            status: "proposed",
            contributor: null,
            createdAt: new Date(),
            approvedAt: null,
        });
        await approveColor(services, "admin", id.toString());
        const after = await services.repositories.proposedNames.findById(id);
        expect(after?.status).toBe("approved");
        const audit = await services.repositories.adminAudit.findManyByFilter({}, 0, 10);
        expect(audit.find((a) => a.action === "approve-color")).toBeDefined();
    });

    it("approveColor on missing id throws NotFoundError", async () => {
        // Valid-shape ObjectId that does not exist
        await expect(
            approveColor(services, "admin", "507f1f77bcf86cd799439011"),
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    it("rejectColor on invalid id-shape throws ValidationError", async () => {
        await expect(
            rejectColor(services, "admin", "not-a-valid-oid"),
        ).rejects.toBeInstanceOf(ValidationError);
    });

    it("deleteColor removes the doc + emits audit", async () => {
        const id = await services.repositories.proposedNames.insert({
            name: "del",
            css: "#000",
            status: "proposed",
            contributor: null,
            createdAt: new Date(),
            approvedAt: null,
        });
        await deleteColor(services, "admin", id.toString());
        expect(await services.repositories.proposedNames.findById(id)).toBeNull();
    });
});

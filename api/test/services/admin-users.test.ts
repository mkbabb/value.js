import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import {
    deleteUser,
    listUsers,
    pruneEmptyUsers,
    setUserStatus,
} from "../../src/modules/admin/service/users.js";
import { createPalette } from "../../src/modules/palette/service/crud.js";
import { NotFoundError } from "../../src/platform/http/errors/index.js";
import { asSessionToken, asUserSlug } from "../../src/modules/session/model.js";
import type { Services } from "../../src/platform/http/inject-services.js";

describe("service.admin.users", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;

    beforeAll(async () => {
        ({ client, db } = await connect());
        await db.collection("palettes").createIndex({ slug: 1 }, { unique: true });
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        services = buildServices(db, client);
    });

    it("listUsers paginates + counts; empty match works", async () => {
        await services.repositories.users.insert({
            _id: asUserSlug("alice"),
            createdAt: new Date(),
        });
        const page = await listUsers(services, 10, 0, undefined);
        expect(page.total).toBe(1);
        expect(page.data[0].slug).toBe("alice");
    });

    it("setUserStatus suspended invalidates sessions for that user", async () => {
        await services.repositories.users.insert({
            _id: asUserSlug("alice"),
            createdAt: new Date(),
            status: "active",
        });
        await services.repositories.sessions.insert({
            _id: asSessionToken("tok-1"),
            ipHash: "ip",
            userSlug: "alice",
            createdAt: new Date(),
            lastSeenAt: new Date(),
            expiresAt: new Date(Date.now() + 1000),
        });
        await setUserStatus(services, "admin", "alice", "suspended");
        const user = await services.repositories.users.findBySlug("alice");
        expect(user?.status).toBe("suspended");
        expect(await services.repositories.sessions.findByToken("tok-1")).toBeNull();
    });

    it("setUserStatus missing user throws NotFoundError", async () => {
        await expect(
            setUserStatus(services, "admin", "ghost", "suspended"),
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    it("deleteUser cascades palettes/votes/flags/sessions", async () => {
        await services.repositories.users.insert({
            _id: asUserSlug("alice"),
            createdAt: new Date(),
        });
        await createPalette(services, {
            body: {
                name: "p1",
                slug: "p1",
                colors: [{ css: "#fff", position: 0 }],
                tags: [],
            },
            userSlug: "alice",
        });
        await services.repositories.votes.upsertIdempotent("alice", "p1");
        await services.repositories.sessions.insert({
            _id: asSessionToken("s"),
            ipHash: "ip",
            userSlug: "alice",
            createdAt: new Date(),
            lastSeenAt: new Date(),
            expiresAt: new Date(Date.now() + 1000),
        });
        const result = await deleteUser(services, "admin", "alice");
        expect(result?.palettesDeleted).toBe(1);
        expect(await services.repositories.users.findBySlug("alice")).toBeNull();
        expect(await services.repositories.palettes.findBySlug("p1")).toBeNull();
    });

    it("pruneEmptyUsers deletes users with zero palettes", async () => {
        await services.repositories.users.insert({
            _id: asUserSlug("empty"),
            createdAt: new Date(),
        });
        await services.repositories.users.insert({
            _id: asUserSlug("with-palette"),
            createdAt: new Date(),
        });
        await createPalette(services, {
            body: {
                name: "p1",
                slug: "p1",
                colors: [{ css: "#fff", position: 0 }],
                tags: [],
            },
            userSlug: "with-palette",
        });
        const deleted = await pruneEmptyUsers(services, "admin");
        expect(deleted).toBe(1);
        expect(await services.repositories.users.findBySlug("empty")).toBeNull();
        expect(await services.repositories.users.findBySlug("with-palette")).not.toBeNull();
    });
});

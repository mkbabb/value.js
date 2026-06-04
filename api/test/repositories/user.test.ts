import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { cleanCollections, connect } from "../helpers.js";
import { UserRepository } from "../../src/repositories/user.js";
import type { Palette, User } from "../../src/models.js";
import { asUserSlug } from "../../src/models.js";

function makeUser(overrides: Partial<User> = {}): User {
    return {
        _id: asUserSlug("alice"),
        createdAt: new Date(),
        ...overrides,
    };
}

describe("repository.user", () => {
    let client: MongoClient;
    let db: Db;
    let repo: UserRepository;

    beforeAll(async () => {
        ({ client, db } = await connect());
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        repo = new UserRepository(db.collection<User>("users"));
    });

    it("insert + findBySlug round-trip", async () => {
        await repo.insert(makeUser({ _id: asUserSlug("alice") }));
        const found = await repo.findBySlug("alice");
        expect(found).not.toBeNull();
        expect(found?._id).toBe("alice");
    });

    it("setStatus persists the new status", async () => {
        await repo.insert(makeUser({ _id: asUserSlug("alice"), status: "active" }));
        await repo.setStatus("alice", "suspended");
        expect((await repo.findBySlug("alice"))?.status).toBe("suspended");
    });

    it("touchLastSeen updates the timestamp", async () => {
        await repo.insert(makeUser({ _id: asUserSlug("alice") }));
        const t = new Date("2026-01-01T00:00:00Z");
        await repo.touchLastSeen("alice", t);
        const found = await repo.findBySlug("alice");
        expect(found?.lastSeenAt?.toISOString()).toBe(t.toISOString());
    });

    it("findEmptyUserSlugs returns only users with zero palettes", async () => {
        await repo.insert(makeUser({ _id: asUserSlug("with-palette") }));
        await repo.insert(makeUser({ _id: asUserSlug("empty-1") }));
        await repo.insert(makeUser({ _id: asUserSlug("empty-2") }));

        const palettes = db.collection<Palette>("palettes");
        await palettes.insertOne({
            name: "X",
            slug: "x",
            colors: [],
            oklabColors: [],
            tags: [],
            voteCount: 0,
            userSlug: "with-palette",
            visibility: "public",
            tier: "standard",
            deletedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            currentHash: null,
            forkOf: null,
            forkOfHash: null,
            forkCount: 0,
            versionCount: 1,
        });

        const empties = (await repo.findEmptyUserSlugs()).sort();
        expect(empties).toEqual(["empty-1", "empty-2"]);
    });

    it("deleteMany cascades across multiple slugs", async () => {
        await repo.insert(makeUser({ _id: asUserSlug("u1") }));
        await repo.insert(makeUser({ _id: asUserSlug("u2") }));
        await repo.insert(makeUser({ _id: asUserSlug("u3") }));
        expect(await repo.deleteMany(["u1", "u2"])).toBe(2);
        expect(await repo.findBySlug("u3")).not.toBeNull();
    });
});

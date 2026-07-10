import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { cleanCollections, connect } from "../helpers.js";
import { SessionRepository } from "../../src/modules/session/repository/session.js";
import type { Session } from "../../src/modules/session/model.js";
import { asSessionToken } from "../../src/modules/session/model.js";

function makeSession(overrides: Partial<Session> = {}): Session {
    return {
        _id: asSessionToken("token-1"),
        ipHash: "ip-hash",
        userSlug: "alice",
        createdAt: new Date(),
        lastSeenAt: new Date(),
        expiresAt: new Date(Date.now() + 3600 * 1000),
        ...overrides,
    };
}

describe("repository.session", () => {
    let client: MongoClient;
    let db: Db;
    let repo: SessionRepository;

    beforeAll(async () => {
        ({ client, db } = await connect());
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        repo = new SessionRepository(db.collection<Session>("sessions"));
    });

    it("insert + findByToken round-trip", async () => {
        await repo.insert(makeSession({ _id: asSessionToken("tok-a") }));
        const found = await repo.findByToken("tok-a");
        expect(found?.userSlug).toBe("alice");
    });

    it("findAndTouch returns null for expired tokens", async () => {
        await repo.insert(
            makeSession({
                _id: asSessionToken("tok-expired"),
                expiresAt: new Date(Date.now() - 1000),
            }),
        );
        const touched = await repo.findAndTouch("tok-expired");
        expect(touched).toBeNull();
    });

    it("findAndTouch updates lastSeenAt for live tokens", async () => {
        const past = new Date(Date.now() - 60 * 1000);
        await repo.insert(makeSession({ _id: asSessionToken("tok-live"), lastSeenAt: past }));
        const touched = await repo.findAndTouch("tok-live");
        expect(touched).not.toBeNull();
        expect(touched!.lastSeenAt.getTime()).toBeGreaterThan(past.getTime());
    });

    it("delete removes by token; deleteByUserSlug cascades for one user", async () => {
        await repo.insert(makeSession({ _id: asSessionToken("t-a"), userSlug: "alice" }));
        await repo.insert(makeSession({ _id: asSessionToken("t-b"), userSlug: "alice" }));
        await repo.insert(makeSession({ _id: asSessionToken("t-c"), userSlug: "bob" }));
        expect(await repo.delete("t-a")).toBe(1);
        expect(await repo.deleteByUserSlug("alice")).toBe(1);
        expect(await repo.findByToken("t-c")).not.toBeNull();
    });

    it("deleteByUserSlugs cascades across multiple users", async () => {
        await repo.insert(makeSession({ _id: asSessionToken("t-1"), userSlug: "u1" }));
        await repo.insert(makeSession({ _id: asSessionToken("t-2"), userSlug: "u2" }));
        await repo.insert(makeSession({ _id: asSessionToken("t-3"), userSlug: "u3" }));
        const removed = await repo.deleteByUserSlugs(["u1", "u2"]);
        expect(removed).toBe(2);
        expect(await repo.findByToken("t-3")).not.toBeNull();
    });
});

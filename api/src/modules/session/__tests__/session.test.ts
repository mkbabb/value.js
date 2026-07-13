import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { cleanCollections, connect } from "../../../../test/helpers.js";
import { SessionRepository } from "../repository/session.js";
import type { Session } from "../model.js";
// Seeds construct the AT-REST representation directly (bypassing the mint
// service), so they store the token's SHA-256 digest as `_id` — exactly what a
// production mint persists (U-F38). Lookups pass the RAW token and the repo
// re-hashes it, so the round-trip matches.
import { hashSessionToken } from "../model.js";

function makeSession(overrides: Partial<Session> = {}): Session {
    return {
        _id: hashSessionToken("token-1"),
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
        await repo.insert(makeSession({ _id: hashSessionToken("tok-a") }));
        const found = await repo.findByToken("tok-a");
        expect(found?.userSlug).toBe("alice");
    });

    it("findAndTouch returns null for expired tokens", async () => {
        await repo.insert(
            makeSession({
                _id: hashSessionToken("tok-expired"),
                expiresAt: new Date(Date.now() - 1000),
            }),
        );
        const touched = await repo.findAndTouch("tok-expired");
        expect(touched).toBeNull();
    });

    it("findAndTouch updates lastSeenAt for live tokens", async () => {
        const past = new Date(Date.now() - 60 * 1000);
        await repo.insert(makeSession({ _id: hashSessionToken("tok-live"), lastSeenAt: past }));
        const touched = await repo.findAndTouch("tok-live");
        expect(touched).not.toBeNull();
        expect(touched!.lastSeenAt.getTime()).toBeGreaterThan(past.getTime());
    });

    it("delete removes by token; deleteByUserSlug cascades for one user", async () => {
        await repo.insert(makeSession({ _id: hashSessionToken("t-a"), userSlug: "alice" }));
        await repo.insert(makeSession({ _id: hashSessionToken("t-b"), userSlug: "alice" }));
        await repo.insert(makeSession({ _id: hashSessionToken("t-c"), userSlug: "bob" }));
        expect(await repo.delete("t-a")).toBe(1);
        expect(await repo.deleteByUserSlug("alice")).toBe(1);
        expect(await repo.findByToken("t-c")).not.toBeNull();
    });

    it("deleteByUserSlugs cascades across multiple users", async () => {
        await repo.insert(makeSession({ _id: hashSessionToken("t-1"), userSlug: "u1" }));
        await repo.insert(makeSession({ _id: hashSessionToken("t-2"), userSlug: "u2" }));
        await repo.insert(makeSession({ _id: hashSessionToken("t-3"), userSlug: "u3" }));
        const removed = await repo.deleteByUserSlugs(["u1", "u2"]);
        expect(removed).toBe(2);
        expect(await repo.findByToken("t-3")).not.toBeNull();
    });
});

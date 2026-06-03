/**
 * K.W2 conformance probe — the Idempotency-Key replay middleware.
 *
 * Asserts the opt-in replay contract authored in `src/middleware/idempotency.ts`:
 *   - Same Idempotency-Key on POST /palettes replays the SAME 201 body, and
 *     creates exactly ONE document (the handler never runs on the replay).
 *   - A DIFFERENT key executes independently (distinct documents).
 *   - An ABSENT key behaves normally (no replay coupling).
 *
 * The test app wires the REAL `idempotency` middleware (after a synthetic
 * session-injection middleware that mirrors `resolveSession`'s contract) so
 * the scoped-key derivation (sessionToken/userSlug) is exercised end-to-end.
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { Db, MongoClient } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import { palettes } from "../../src/routes/palettes/index.js";
import { idempotency } from "../../src/middleware/idempotency.js";
import { toResponseEnvelope } from "../../src/errors/index.js";
import type { PaletteColor } from "../../src/models.js";
import type { AppEnv } from "../../src/types.js";
import type { Services } from "../../src/middleware/inject-services.js";

const COLORS: PaletteColor[] = [{ css: "#ff0000", position: 0 }];

/**
 * Build the test app with the REAL idempotency middleware mounted after the
 * synthetic session injector (the production order: resolveSession →
 * idempotency → routes).
 */
function buildTestApp(services: Services): Hono<AppEnv> {
    const app = new Hono<AppEnv>();
    app.use("*", async (c, next) => {
        c.set("services", services);
        c.set("userSlug", c.req.header("X-Test-User-Slug"));
        c.set("sessionToken", c.req.header("X-Test-Session-Token"));
        await next();
    });
    app.use("*", idempotency);
    app.route("/palettes", palettes);
    app.onError((err, c) => {
        const { status, body } = toResponseEnvelope(err);
        return c.json(body, status);
    });
    return app;
}

const owner = { "X-Test-User-Slug": "alice", "X-Test-Session-Token": "tok-alice" };

function createBody(slug: string): string {
    return JSON.stringify({ name: slug, slug, colors: COLORS, tags: [] });
}

describe("K.W2 conformance — Idempotency-Key replay", () => {
    let client: MongoClient;
    let db: Db;
    let services: Services;
    let app: Hono<AppEnv>;

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
        app = buildTestApp(services);
    });

    it("same key → identical 201 body replayed; exactly ONE document created", async () => {
        const key = "test-key-aaa";
        const headers = {
            ...owner,
            "Content-Type": "application/json",
            "Idempotency-Key": key,
        };

        const first = await app.request("/palettes", {
            method: "POST",
            headers,
            body: createBody("p"),
        });
        expect(first.status).toBe(201);
        const firstBody = await first.text();

        // Replay with the SAME key + SAME body.
        const second = await app.request("/palettes", {
            method: "POST",
            headers,
            body: createBody("p"),
        });
        expect(second.status).toBe(201);
        const secondBody = await second.text();

        // Verbatim replay: identical body + status.
        expect(secondBody).toBe(firstBody);
        // The replay carries the marker header (the handler did NOT run).
        expect(second.headers.get("Idempotency-Replayed")).toBe("true");
        expect(first.headers.get("Idempotency-Replayed")).toBeNull();

        // Exactly one document — the second POST replayed, never inserted.
        const count = await db.collection("palettes").countDocuments({ slug: "p" });
        expect(count).toBe(1);
    });

    it("replay short-circuits the handler even when the second body differs", async () => {
        // The key — not the body — is the idempotency token. A retry that
        // (e.g.) double-encoded its payload must STILL replay the first result.
        const key = "test-key-bbb";
        const headers = {
            ...owner,
            "Content-Type": "application/json",
            "Idempotency-Key": key,
        };

        const first = await app.request("/palettes", {
            method: "POST",
            headers,
            body: createBody("q"),
        });
        expect(first.status).toBe(201);

        // Same key, DIFFERENT slug in the body — must replay the first (slug q),
        // and must NOT create a second document.
        const second = await app.request("/palettes", {
            method: "POST",
            headers,
            body: createBody("q-different"),
        });
        const body = (await second.json()) as { slug: string };
        expect(body.slug).toBe("q"); // the replayed original, not "q-different"
        const qDiff = await db
            .collection("palettes")
            .countDocuments({ slug: "q-different" });
        expect(qDiff).toBe(0);
    });

    it("different key → distinct execution (two documents)", async () => {
        const headers = (key: string) => ({
            ...owner,
            "Content-Type": "application/json",
            "Idempotency-Key": key,
        });

        const a = await app.request("/palettes", {
            method: "POST",
            headers: headers("key-1"),
            body: createBody("r1"),
        });
        expect(a.status).toBe(201);

        const b = await app.request("/palettes", {
            method: "POST",
            headers: headers("key-2"),
            body: createBody("r2"),
        });
        expect(b.status).toBe(201);
        expect(b.headers.get("Idempotency-Replayed")).toBeNull();

        const total = await db
            .collection("palettes")
            .countDocuments({ slug: { $in: ["r1", "r2"] } });
        expect(total).toBe(2);
    });

    it("absent key → normal behavior (no replay coupling)", async () => {
        const headers = { ...owner, "Content-Type": "application/json" };

        const first = await app.request("/palettes", {
            method: "POST",
            headers,
            body: createBody("s"),
        });
        expect(first.status).toBe(201);
        expect(first.headers.get("Idempotency-Replayed")).toBeNull();

        // A second create with no key + a different slug executes normally.
        const second = await app.request("/palettes", {
            method: "POST",
            headers,
            body: createBody("s2"),
        });
        expect(second.status).toBe(201);
        expect(second.headers.get("Idempotency-Replayed")).toBeNull();

        const total = await db
            .collection("palettes")
            .countDocuments({ slug: { $in: ["s", "s2"] } });
        expect(total).toBe(2);
    });

    it("a thrown error response is NOT cached — same key re-executes, never replays the error", async () => {
        // K.W2 adversarial-review regression guard. Hono's onError maps a thrown
        // ApiError to a 4xx response BEFORE next() returns, so c.res is the error
        // response. The middleware must capture ONLY 2xx — else a transient
        // 409/503 would be replayed for the whole 24h window under that key.
        const errHeaders = {
            ...owner,
            "Content-Type": "application/json",
            "Idempotency-Key": "err-key",
        };
        // Seed the slug so a same-slug create conflicts.
        const seed = await app.request("/palettes", {
            method: "POST",
            headers: { ...owner, "Content-Type": "application/json" },
            body: createBody("dup"),
        });
        expect(seed.status).toBe(201);

        // First conflicting create under err-key → an error response (>= 400).
        const e1 = await app.request("/palettes", {
            method: "POST",
            headers: errHeaders,
            body: createBody("dup"),
        });
        expect(e1.status).toBeGreaterThanOrEqual(400);
        expect(e1.headers.get("Idempotency-Replayed")).toBeNull();

        // Same key again → must RE-EXECUTE (same error), NOT replay a cached one.
        const e2 = await app.request("/palettes", {
            method: "POST",
            headers: errHeaders,
            body: createBody("dup"),
        });
        expect(e2.status).toBe(e1.status);
        // The decisive assertion: no replay marker ⇒ the error was never cached.
        expect(e2.headers.get("Idempotency-Replayed")).toBeNull();

        // The error path created no extra document.
        const count = await db.collection("palettes").countDocuments({ slug: "dup" });
        expect(count).toBe(1);
    });

    it("key is scoped per session — a different session does NOT replay another's result", async () => {
        const key = "shared-key";
        const aliceHeaders = {
            ...owner,
            "Content-Type": "application/json",
            "Idempotency-Key": key,
        };
        const bobHeaders = {
            "X-Test-User-Slug": "bob",
            "X-Test-Session-Token": "tok-bob",
            "Content-Type": "application/json",
            "Idempotency-Key": key,
        };

        const alice = await app.request("/palettes", {
            method: "POST",
            headers: aliceHeaders,
            body: createBody("alice-pal"),
        });
        expect(alice.status).toBe(201);

        // Bob reuses the SAME literal key but is a distinct session — must
        // execute, not replay alice's body.
        const bob = await app.request("/palettes", {
            method: "POST",
            headers: bobHeaders,
            body: createBody("bob-pal"),
        });
        expect(bob.status).toBe(201);
        expect(bob.headers.get("Idempotency-Replayed")).toBeNull();
        const bobBody = (await bob.json()) as { slug: string };
        expect(bobBody.slug).toBe("bob-pal");
    });
});

/**
 * Transaction right-sizing coverage (N.W3.B).
 *
 * The 18 `withTransaction` sites were right-sized to 14: four sites were
 * dropped because their non-atomic outcome is benign + self-healing (not a
 * cross-collection referential break):
 *   - `toggleVote`     — the unique `(userSlug,paletteSlug)` index is the
 *                        correctness anchor; the `$inc` is document-atomic; the
 *                        returned count is advisory.
 *   - `registerSession`/`loginSession` — orphan user / advisory `lastSeenAt`,
 *                        both reaped/converged by standing sweeps.
 *   - `restorePalette` — single-collection (palettes-only); the fork-count
 *                        recompute is itself the heal.
 *
 * This test spies on `services.withTransaction` and asserts the DROPPED sites
 * open ZERO transactions while a representative KEPT cross-collection site
 * (`createPalette`) still opens exactly one — the right-sizing made
 * structurally visible. (The H1 cross-collection invariant binds the kept set;
 * the table lives in `docs/tranches/H/audit/api-withTransaction-coverage.md`.)
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import { createPalette, restorePalette, deletePalette } from "../../src/services/palette/crud.js";
import { toggleVote } from "../../src/services/palette/votes.js";
import { registerSession, loginSession } from "../../src/services/session/auth.js";
import { asUserSlug } from "../../src/models.js";
import type { Services } from "../../src/middleware/inject-services.js";

/** Wrap `services.withTransaction` with a call counter; returns a getter. */
function spyOnWithTransaction(services: Services): () => number {
    let count = 0;
    const real = services.withTransaction;
    services.withTransaction = (fn, options) => {
        count++;
        return real(fn, options);
    };
    return () => count;
}

describe("transaction right-sizing (N.W3.B)", () => {
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
    });

    it("toggleVote opens NO transaction (unique-index + document-atomic $inc)", async () => {
        await createPalette(services, {
            body: { name: "V", slug: "v", colors: [{ css: "#fff", position: 0 }], tags: [] },
            userSlug: "owner",
        });
        const txns = spyOnWithTransaction(services);
        const on = await toggleVote(services, "v", "alice");
        expect(on).toEqual({ voted: true, voteCount: 1 });
        const off = await toggleVote(services, "v", "alice");
        expect(off).toEqual({ voted: false, voteCount: 0 });
        expect(txns()).toBe(0);
    });

    it("registerSession opens NO transaction (benign orphan user)", async () => {
        const txns = spyOnWithTransaction(services);
        const result = await registerSession(services, "test-ip-hash");
        expect(result.userSlug).toBeTruthy();
        expect(result.token).toBeTruthy();
        expect(txns()).toBe(0);
        // Both writes landed (the happy path is unaffected by the drop).
        expect(await db.collection("users").countDocuments({})).toBe(1);
        expect(await db.collection("sessions").countDocuments({})).toBe(1);
    });

    it("loginSession opens NO transaction (advisory lastSeenAt)", async () => {
        await services.repositories.users.insert({
            _id: asUserSlug("alice"),
            createdAt: new Date(),
            lastSeenAt: new Date("2025-01-01T00:00:00Z"),
        });
        const txns = spyOnWithTransaction(services);
        const result = await loginSession(services, undefined, "test-ip-hash", {
            slug: "alice",
        });
        expect(result.userSlug).toBe("alice");
        expect(txns()).toBe(0);
        expect(await db.collection("sessions").countDocuments({})).toBe(1);
    });

    it("restorePalette opens NO transaction (single-collection; recompute self-heals)", async () => {
        await createPalette(services, {
            body: { name: "R", slug: "r", colors: [{ css: "#fff", position: 0 }], tags: [] },
            userSlug: "owner",
        });
        await deletePalette(services, { slug: "r" }); // kept-txn site, before the spy
        const txns = spyOnWithTransaction(services);
        const restored = await restorePalette(services, { slug: "r" });
        expect(restored.slug).toBe("r");
        expect(txns()).toBe(0);
        const doc = await services.repositories.palettes.findBySlug("r");
        expect(doc?.deletedAt).toBeNull();
    });

    it("createPalette (cross-collection — KEPT) still opens exactly one transaction", async () => {
        const txns = spyOnWithTransaction(services);
        await createPalette(services, {
            body: { name: "K", slug: "k", colors: [{ css: "#fff", position: 0 }], tags: [] },
            userSlug: "owner",
        });
        expect(txns()).toBe(1);
    });

    it("deletePalette (palette soft-delete + parent fork-count — KEPT) opens one transaction", async () => {
        await createPalette(services, {
            body: { name: "D", slug: "d", colors: [{ css: "#fff", position: 0 }], tags: [] },
            userSlug: "owner",
        });
        const txns = spyOnWithTransaction(services);
        await deletePalette(services, { slug: "d" });
        expect(txns()).toBe(1);
    });
});

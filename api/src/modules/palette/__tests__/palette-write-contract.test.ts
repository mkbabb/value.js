/**
 * SERVED MODEL: claude-opus-5[1m]
 *
 * Palette WRITE CONTRACT — conformance for X-W3 · X.W3.3 (X.A3).
 *
 * Four gates, each measured where its predicate lives (the wire for a status,
 * the repository for a driver-level `UpdateResult`):
 *
 *   G-8   every state-changing palette write is FENCED: `update()` returns the
 *         driver's `UpdateResult` instead of discarding it, and — when handed
 *         the ETag-bearing predicate — writes only while the document still
 *         carries the ETag the caller read, mapping a lost race to `412`.
 *         **Bounds note, stated rather than implied**: the three product call
 *         sites that must pass that predicate (`service/crud.ts` PATCH,
 *         `service/versions.ts` revert, `service/visibility.ts` publish) are
 *         OUTSIDE X.W3.3's writable set, so this file measures the fence at
 *         the repository — the byte this unit owns — and the wire arm of G-8
 *         is RETURNED as `ESC-W3.3-CAS-CALLERS`, never faked green here.
 *   G-9   revert requires a strong `If-Match`: absent → `428`, stale → `412`,
 *         current → the write proceeds (the `routes/crud.ts:122` /
 *         `routes/publish.ts:39` precedent, now on the third mutating verb).
 *   G-10  `Idempotency-Key` is REQUIRED on revert and fork create (absent →
 *         `400`), and a replayed key returns the stored response verbatim.
 *   G-11  revert answers `201` CARRYING the appended revision (fold §B: a bare
 *         `201` closes the gate and strands X-W7's `VHD-4`).
 *
 * The app under test mounts the production middleware order (services →
 * identity → idempotency → routes), because G-10's predicate is a middleware
 * behaviour and a test app without it would measure nothing.
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import { randomUUID } from "node:crypto";
import type { Db, MongoClient } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import { createPalette, patchPalette } from "../service/crud.js";
import { palettes } from "../routes/index.js";
import { idempotency } from "../../../platform/http/idempotency.js";
import {
    PreconditionFailedError,
    toResponseEnvelope,
} from "../../../platform/http/errors/index.js";
import { assertFenceHeld, paletteETag } from "../etag.js";
import type { AppEnv } from "../../../types.js";
import type { Services } from "../../../platform/http/inject-services.js";

function buildTestApp(services: Services): Hono<AppEnv> {
    const app = new Hono<AppEnv>();
    app.use("*", async (c, next) => {
        c.set("services", services);
        c.set("userSlug", c.req.header("X-Test-User-Slug"));
        c.set("sessionToken", c.req.header("X-Test-Session-Token"));
        await next();
    });
    // The production chain mounts the replay store globally (app.ts:73) AFTER
    // identity resolution — the required-key rule is part of that middleware,
    // so it is mounted here the same way.
    app.use("*", idempotency);
    app.route("/palettes", palettes);
    app.onError((err, c) => {
        const { status, body } = toResponseEnvelope(err, c.req.path);
        return c.json(body, status);
    });
    return app;
}

const alice = { "X-Test-User-Slug": "alice", "X-Test-Session-Token": "tok-alice" };
const jsonAlice = { ...alice, "Content-Type": "application/json" };

/** A fresh key per call — the replay store is process-global and survives
 * between tests, so a shared literal would cross-replay. */
function key(): Record<string, string> {
    return { "Idempotency-Key": randomUUID() };
}

const COLORS = [{ css: "#ff0000", position: 0 }];

describe("palette write contract (X-W3 · X.W3.3)", () => {
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
        await createPalette(services, {
            body: { name: "Source", slug: "source", colors: COLORS, tags: [] },
            userSlug: "alice",
        });
    });

    /** The release id (`palette_versions._id`) of `source`'s first revision. */
    async function firstReleaseHash(slug = "source"): Promise<string> {
        const rows = await services.repositories.paletteVersions.findByPaletteSlug(
            slug,
            0,
            50,
        );
        const first = rows[rows.length - 1];
        expect(first).toBeDefined();
        return first!._id;
    }

    async function currentETag(slug = "source"): Promise<string> {
        const res = await app.request(`/palettes/${slug}`, { method: "GET" });
        const etag = res.headers.get("ETag");
        expect(etag).toBeTruthy();
        return etag!;
    }

    // -----------------------------------------------------------------
    // G-8 — the compare-and-set fence (repository arm; see the file header)
    // -----------------------------------------------------------------

    it("G-8: update() returns the driver's UpdateResult instead of discarding it", async () => {
        const hit = await services.repositories.palettes.update("source", {
            $set: { tags: ["a"] },
        });
        expect(hit.matchedCount).toBe(1);
        expect(hit.modifiedCount).toBe(1);

        const miss = await services.repositories.palettes.update("nope", {
            $set: { tags: ["a"] },
        });
        expect(miss.matchedCount).toBe(0);
    });

    it("G-8: a fenced update whose ETag predicate still holds writes exactly one row", async () => {
        const before = await services.repositories.palettes.findBySlug("source");
        expect(before).toBeDefined();

        const res = await services.repositories.palettes.update(
            "source",
            { $set: { tags: ["fenced"] } },
            undefined,
            before!,
        );
        expect(res.matchedCount).toBe(1);

        const after = await services.repositories.palettes.findBySlug("source");
        expect(after?.tags).toEqual(["fenced"]);
    });

    it("G-8: a fenced update whose ETag predicate went stale matches NOTHING and maps to 412", async () => {
        const read = await services.repositories.palettes.findBySlug("source");
        expect(read).toBeDefined();

        // A concurrent writer lands between the read and the write.
        await services.repositories.palettes.update("source", {
            $set: { name: "Concurrent", currentHash: "0".repeat(64) },
        });

        const lost = await services.repositories.palettes.update(
            "source",
            { $set: { name: "Loser" } },
            undefined,
            read!,
        );
        expect(lost.matchedCount).toBe(0);
        expect(() => assertFenceHeld(lost)).toThrow(PreconditionFailedError);

        const after = await services.repositories.palettes.findBySlug("source");
        // The losing write is not a silent overwrite: the winner's bytes stand.
        expect(after?.name).toBe("Concurrent");
    });

    it("G-8: the fence follows the ETag — a hashless palette is fenced on updatedAt", async () => {
        await services.repositories.palettes.update("source", {
            $set: { currentHash: null },
        });
        const read = await services.repositories.palettes.findBySlug("source");
        expect(read?.currentHash).toBeNull();
        expect(paletteETag(read!)).toBe(`"${read!.updatedAt.toISOString()}"`);

        await services.repositories.palettes.update("source", {
            $set: { updatedAt: new Date(read!.updatedAt.getTime() + 1000) },
        });

        const lost = await services.repositories.palettes.update(
            "source",
            { $set: { name: "Loser" } },
            undefined,
            read!,
        );
        expect(lost.matchedCount).toBe(0);
        expect(() => assertFenceHeld(lost)).toThrow(PreconditionFailedError);
    });

    it("G-8: assertFenceHeld passes a held fence through and refuses a lost one", async () => {
        const read = await services.repositories.palettes.findBySlug("source");
        const held = await services.repositories.palettes.update(
            "source",
            { $set: { tags: ["held"] } },
            undefined,
            read!,
        );
        expect(held.matchedCount).toBe(1);
        expect(() => assertFenceHeld(held)).not.toThrow();
    });

    // -----------------------------------------------------------------
    // G-9 — strong If-Match on revert
    // -----------------------------------------------------------------

    it("G-9: revert without If-Match → 428", async () => {
        const hash = await firstReleaseHash();
        const res = await app.request("/palettes/source/revert", {
            method: "POST",
            headers: { ...jsonAlice, ...key() },
            body: JSON.stringify({ hash }),
        });
        expect(res.status).toBe(428);
        const body = (await res.json()) as { type: string };
        expect(body.type).toBe("urn:contract:precondition-required");
    });

    it("G-9: revert with a stale If-Match → 412, and the palette is byte-unchanged", async () => {
        const hash = await firstReleaseHash();
        await patchPalette(services, {
            slug: "source",
            body: { name: "Edited" },
            userSlug: "alice",
        });
        const before = await services.repositories.palettes.findBySlug("source");

        const res = await app.request("/palettes/source/revert", {
            method: "POST",
            headers: { ...jsonAlice, ...key(), "If-Match": '"stale-etag"' },
            body: JSON.stringify({ hash }),
        });
        expect(res.status).toBe(412);

        const after = await services.repositories.palettes.findBySlug("source");
        expect(after?.name).toBe(before?.name);
        expect(after?.currentHash).toBe(before?.currentHash);
        expect(after?.versionCount).toBe(before?.versionCount);
    });

    it("G-9: revert with the current If-Match proceeds", async () => {
        const hash = await firstReleaseHash();
        await patchPalette(services, {
            slug: "source",
            body: { name: "Edited" },
            userSlug: "alice",
        });
        const res = await app.request("/palettes/source/revert", {
            method: "POST",
            headers: { ...jsonAlice, ...key(), "If-Match": await currentETag() },
            body: JSON.stringify({ hash }),
        });
        expect(res.status).toBe(201);
    });

    // -----------------------------------------------------------------
    // G-10 — Idempotency-Key REQUIRED on revert + fork create
    // -----------------------------------------------------------------

    it("G-10: revert without Idempotency-Key → 400", async () => {
        const hash = await firstReleaseHash();
        const res = await app.request("/palettes/source/revert", {
            method: "POST",
            headers: { ...jsonAlice, "If-Match": await currentETag() },
            body: JSON.stringify({ hash }),
        });
        expect(res.status).toBe(400);
    });

    it("G-10: fork create without Idempotency-Key → 400", async () => {
        const res = await app.request("/palettes/source/fork", {
            method: "POST",
            headers: alice,
        });
        expect(res.status).toBe(400);
    });

    it("G-10: fork create with an Idempotency-Key → 201", async () => {
        const res = await app.request("/palettes/source/fork", {
            method: "POST",
            headers: { ...alice, ...key() },
        });
        expect(res.status).toBe(201);
    });

    it("G-10: a replayed key returns the stored response and does not re-run the handler", async () => {
        const headers = { ...jsonAlice, ...key() };
        const body = JSON.stringify({ slug: "twice" });
        const first = await app.request("/palettes/source/fork", {
            method: "POST",
            headers: { ...headers, "Content-Length": String(Buffer.byteLength(body)) },
            body,
        });
        expect(first.status).toBe(201);
        const firstBody = await first.text();

        const second = await app.request("/palettes/source/fork", {
            method: "POST",
            headers: { ...headers, "Content-Length": String(Buffer.byteLength(body)) },
            body,
        });
        expect(second.status).toBe(201);
        expect(await second.text()).toBe(firstBody);
        expect(second.headers.get("Idempotency-Replayed")).toBe("true");

        // One fork, not two — the handler never ran the second time.
        const forks = await services.repositories.palettes.countForksOf("source");
        expect(forks).toBe(1);
    });

    it("G-10: the requirement is scoped — PATCH without a key is still served", async () => {
        const res = await app.request("/palettes/source", {
            method: "PATCH",
            headers: { ...jsonAlice, "If-Match": await currentETag() },
            body: JSON.stringify({ name: "Renamed" }),
        });
        expect(res.status).toBe(200);
    });

    // -----------------------------------------------------------------
    // G-11 — revert answers 201 carrying the appended revision (fold §B)
    // -----------------------------------------------------------------

    it("G-11: revert → 201 and the body carries the APPENDED revision, not a bare palette", async () => {
        const hash = await firstReleaseHash();
        await patchPalette(services, {
            slug: "source",
            body: { name: "Edited" },
            userSlug: "alice",
        });

        const res = await app.request("/palettes/source/revert", {
            method: "POST",
            headers: { ...jsonAlice, ...key(), "If-Match": await currentETag() },
            body: JSON.stringify({ hash }),
        });
        expect(res.status).toBe(201);

        const body = (await res.json()) as {
            slug: string;
            name: string;
            revision: {
                hash: string;
                revisionNo: number;
                name: string;
                paletteSlug: string;
                payloadHash: string;
            };
        };
        expect(body.slug).toBe("source");
        expect(body.name).toBe("Source");

        // The appended revision is the palette's new head: revisionNo 3
        // (create = 1, the PATCH = 2, this revert = 3), it belongs to this
        // palette, and it carries the reverted-to payload.
        expect(body.revision).toBeDefined();
        expect(body.revision.paletteSlug).toBe("source");
        expect(body.revision.revisionNo).toBe(3);
        expect(body.revision.name).toBe("Source");
        expect(body.revision.hash).toBeTruthy();

        const rows = await services.repositories.paletteVersions.findByPaletteSlug(
            "source",
            0,
            10,
        );
        expect(rows[0]?._id).toBe(body.revision.hash);
        expect(rows).toHaveLength(3);
    });

    it("G-11: the appended revision the 201 carries is exactly what /versions then lists first", async () => {
        const hash = await firstReleaseHash();
        const revert = await app.request("/palettes/source/revert", {
            method: "POST",
            headers: { ...jsonAlice, ...key(), "If-Match": await currentETag() },
            body: JSON.stringify({ hash }),
        });
        expect(revert.status).toBe(201);
        const { revision } = (await revert.json()) as { revision: { hash: string } };

        const list = await app.request("/palettes/source/versions", { method: "GET" });
        expect(list.status).toBe(200);
        const listed = (await list.json()) as { data: { hash: string }[] };
        expect(listed.data[0]?.hash).toBe(revision.hash);
    });
});

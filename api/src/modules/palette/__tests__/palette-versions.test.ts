/**
 * Palette versions — service + wire conformance.
 *
 * X-W3 · X.W3.2 (Membership join, X.A2) rewrites this file's contract. The
 * three gates it carries:
 *
 *   G-5  revision identity is `(paletteSlug, hash)` — a revision addressed
 *        through a palette that does not own it is `404`, and the global
 *        `getVersionByHash` service export is DELETED (no-legacy law).
 *   G-6  (P0) revert's source-revision read is joined to the target palette:
 *        a cross-object content transplant is refused `404` and the target's
 *        `name`/`colors` are byte-unchanged afterwards.
 *   G-7  payload identity is not release identity — `payloadHash` is framed
 *        `domain ‖ 0x00 ‖ uint64be(len) ‖ bytes` and folds `PaletteColor.name`;
 *        `_id` is the release hash; `revisionNo` is the first-class ordinal
 *        (fold S-6) and the version list's total-order key.
 *
 * The gates are measured at the WIRE wherever the predicate is an HTTP status
 * — a service-level assertion would not prove the route refuses.
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import { createHash } from "node:crypto";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import {
    createVersionRecord,
    listVersions,
    revertToVersion,
} from "../service/versions.js";
import { createPalette, patchPalette } from "../service/crud.js";
import { computeContentHash } from "../hash.js";
import {
    describeMigration,
    migrateXW3PayloadHash,
} from "../../../platform/migrations/x-w3-visibility-payloadhash.js";
import { palettes } from "../routes/index.js";
import { toResponseEnvelope } from "../../../platform/http/errors/index.js";
import { NotFoundError } from "../../../platform/http/errors/index.js";
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
    app.route("/palettes", palettes);
    app.onError((err, c) => {
        const { status, body } = toResponseEnvelope(err, c.req.path);
        return c.json(body, status);
    });
    return app;
}

const alice = { "X-Test-User-Slug": "alice", "X-Test-Session-Token": "tok-alice" };
const jsonAlice = { ...alice, "Content-Type": "application/json" };

/**
 * The framing under test, re-implemented here from the SPEC's words rather
 * than imported from the implementation: `domain ‖ 0x00 ‖ uint64be(len) ‖
 * bytes`. A test that called the implementation's own framer could not tell a
 * correct frame from a self-consistent wrong one.
 */
function frame(domain: string, payload: Buffer): Buffer {
    const len = Buffer.alloc(8);
    len.writeBigUInt64BE(BigInt(payload.length));
    return Buffer.concat([
        Buffer.from(domain, "utf8"),
        Buffer.from([0x00]),
        len,
        payload,
    ]);
}

describe("service.palette.versions", () => {
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

    // -----------------------------------------------------------------
    // G-7 — payload identity ≠ release identity
    // -----------------------------------------------------------------

    it("G-7: two palettes differing only in per-color `name` hash differently", () => {
        const a = computeContentHash("p", [{ css: "#fff", name: "snow", position: 0 }]);
        const b = computeContentHash("p", [
            { css: "#fff", name: "paper", position: 0 },
        ]);
        expect(a).not.toBe(b);
    });

    it("G-7: payloadHash is framed `domain ‖ 0x00 ‖ uint64be(len) ‖ bytes`", () => {
        const D = "value.js/palette/payload/v1";
        const colors = [{ css: "#FF0000", name: "Red", position: 0.5 }];
        const expected = createHash("sha256")
            .update(
                Buffer.concat([
                    frame(D, Buffer.from("sample", "utf8")),
                    frame(
                        `${D}#colors`,
                        (() => {
                            const n = Buffer.alloc(8);
                            n.writeBigUInt64BE(BigInt(colors.length));
                            return n;
                        })(),
                    ),
                    frame(`${D}#color/css`, Buffer.from("#ff0000", "utf8")),
                    frame(`${D}#color/name`, Buffer.from("red", "utf8")),
                    frame(`${D}#color/position`, Buffer.from("0.5", "utf8")),
                ]),
            )
            .digest("hex");
        expect(computeContentHash("Sample", colors)).toBe(expected);
    });

    it("G-7: field boundaries are separated — ('ab','c') ≠ ('a','bc')", () => {
        // These two collide under naive concatenation. NOTE what this row does
        // and does not measure: the per-field domain labels alone are enough to
        // separate them, so this stays green if the `uint64be(len)` prefix is
        // removed. The length prefix is measured by the exact-digest
        // reconstruction above, which reds the moment it is dropped.
        const x = computeContentHash("ab", [{ css: "#000", name: "c", position: 0 }]);
        const y = computeContentHash("a", [{ css: "#000", name: "bc", position: 0 }]);
        expect(x).not.toBe(y);
    });

    it("G-7: release identity is a separate field — one payload, two releases", async () => {
        const input = {
            paletteSlug: "p",
            name: "n",
            colors: [{ css: "#fff", position: 0 }],
            authorSlug: "alice",
            parentHash: null,
            forkedFromHash: null,
        };
        const r1 = await createVersionRecord(services, input);
        const r2 = await createVersionRecord(services, input);

        // Release identity is per-event: the same payload released twice is
        // two rows under two ids. (Before the split, `_id` WAS the payload
        // hash, so the second release silently vanished.)
        expect(r1).not.toBe(r2);
        const rows = await services.repositories.paletteVersions.findByPaletteSlug(
            "p",
            0,
            10,
        );
        expect(rows).toHaveLength(2);
        expect(rows[0]?.payloadHash).toBe(rows[1]?.payloadHash);
        expect(rows[0]?.payloadHash).toBe(computeContentHash(input.name, input.colors));
        expect(rows[0]?._id).not.toBe(rows[0]?.payloadHash);
    });

    it("G-7: revisionNo is first-class, monotone, and the list's total-order key", async () => {
        await createPalette(services, {
            body: {
                name: "X",
                slug: "x",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: [],
            },
            userSlug: "alice",
        });
        await patchPalette(services, {
            slug: "x",
            body: { colors: [{ css: "#00ff00", position: 0 }] },
            userSlug: "alice",
        });
        await patchPalette(services, {
            slug: "x",
            body: { colors: [{ css: "#0000ff", position: 0 }] },
            userSlug: "alice",
        });

        const list = await listVersions(services, "x", 0, 10);
        expect(list.total).toBe(3);
        expect(list.data.map((v) => v.revisionNo)).toEqual([3, 2, 1]);

        // …and it reaches the wire (fold S-6: the ordinal the client renders).
        const res = await app.request("/palettes/x/versions", { headers: alice });
        expect(res.status).toBe(200);
        const body = (await res.json()) as {
            data: Array<{ hash: string; revisionNo: number; payloadHash: string }>;
        };
        expect(body.data.map((v) => v.revisionNo)).toEqual([3, 2, 1]);
        expect(typeof body.data[0]?.payloadHash).toBe("string");
        expect(body.data[0]?.hash).not.toBe(body.data[0]?.payloadHash);
    });

    // -----------------------------------------------------------------
    // G-5 — revision reads are joined to the addressing palette
    // -----------------------------------------------------------------

    it("G-5: GET /palettes/A/versions/<hash-of-B> → 404", async () => {
        await createPalette(services, {
            body: {
                name: "A",
                slug: "a",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: [],
            },
            userSlug: "alice",
        });
        await createPalette(services, {
            body: {
                name: "B",
                slug: "b",
                colors: [{ css: "#00ff00", position: 0 }],
                tags: [],
            },
            userSlug: "bob",
        });

        const bRows = await services.repositories.paletteVersions.findByPaletteSlug(
            "b",
            0,
            10,
        );
        const bHash = bRows[0]?._id as string;
        expect(typeof bHash).toBe("string");

        // B's own address resolves through B…
        const own = await app.request(`/palettes/b/versions/${bHash}`);
        expect(own.status).toBe(200);

        // …and is not reachable through A.
        const crossed = await app.request(`/palettes/a/versions/${bHash}`);
        expect(crossed.status).toBe(404);
        expect(await crossed.text()).not.toContain("#00ff00");
    });

    it("G-5: a private palette's revision detail is refused anonymously", async () => {
        await createPalette(services, {
            body: {
                name: "P",
                slug: "p",
                colors: [{ css: "#123456", position: 0 }],
                tags: [],
            },
            userSlug: "alice",
        });
        await services.repositories.palettes.update("p", {
            $set: { visibility: "private" },
        });
        const rows = await services.repositories.paletteVersions.findByPaletteSlug(
            "p",
            0,
            10,
        );
        const hash = rows[0]?._id as string;

        const anon = await app.request(`/palettes/p/versions/${hash}`);
        expect(anon.status).toBe(404);
        expect(await anon.text()).not.toContain("#123456");

        const owner = await app.request(`/palettes/p/versions/${hash}`, {
            headers: alice,
        });
        expect(owner.status).toBe(200);
    });

    // -----------------------------------------------------------------
    // G-6 (P0) — cross-object revert is refused, and nothing is written
    // -----------------------------------------------------------------

    it("G-6: owner of A reverting to a hash belonging to B → 404, A byte-unchanged", async () => {
        await createPalette(services, {
            body: {
                name: "A",
                slug: "a",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: [],
            },
            userSlug: "alice",
        });
        await createPalette(services, {
            body: {
                name: "B",
                slug: "b",
                colors: [{ css: "#00ff00", position: 0 }],
                tags: [],
            },
            userSlug: "bob",
        });

        const before = await services.repositories.palettes.findBySlug("a");
        const bRows = await services.repositories.paletteVersions.findByPaletteSlug(
            "b",
            0,
            10,
        );
        const bHash = bRows[0]?._id as string;

        const res = await app.request("/palettes/a/revert", {
            method: "POST",
            headers: jsonAlice,
            body: JSON.stringify({ hash: bHash }),
        });
        expect(res.status).toBe(404);

        const after = await services.repositories.palettes.findBySlug("a");
        expect(after?.name).toBe(before?.name);
        expect(after?.colors).toEqual(before?.colors);
        expect(after?.currentHash).toBe(before?.currentHash);
        expect(after?.versionCount).toBe(before?.versionCount);
    });

    it("G-6: the owner's own prior revision still reverts", async () => {
        await createPalette(services, {
            body: {
                name: "Source",
                slug: "s",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: [],
            },
            userSlug: "alice",
        });
        await patchPalette(services, {
            slug: "s",
            body: { name: "Edited" },
            userSlug: "alice",
        });
        const rows = await services.repositories.paletteVersions.findByPaletteSlug(
            "s",
            0,
            10,
        );
        const first = rows.find((v) => v.name === "Source");
        expect(first).toBeDefined();

        const { palette } = await revertToVersion(services, {
            slug: "s",
            hash: first?._id as string,
            userSlug: "alice",
        });
        expect(palette.name).toBe("Source");
    });

    // -----------------------------------------------------------------
    // G-7 — the recorded at-rest migration
    // -----------------------------------------------------------------

    it("G-7: the migration backfills payloadHash + revisionNo and re-stamps currentHash", async () => {
        // A pre-X-W3 estate: `_id` IS the legacy content hash, no
        // `payloadHash`, no `revisionNo`, two rows sharing one `createdAt`
        // (the non-injective key the old sort trusted).
        const t = new Date("2026-01-01T00:00:00.000Z");
        const legacyColors = [{ css: "#ff0000", position: 0 }];
        await db.collection("palettes").insertOne({
            name: "Legacy",
            slug: "legacy",
            colors: legacyColors,
            oklabColors: [],
            tags: [],
            voteCount: 0,
            userSlug: "alice",
            visibility: "public",
            tier: "standard",
            deletedAt: null,
            createdAt: t,
            updatedAt: t,
            currentHash: "legacy-content-hash",
            forkOf: null,
            forkOfHash: null,
            forkCount: 0,
            versionCount: 2,
        });
        await db.collection("palette_versions").insertMany([
            {
                _id: "legacy-a" as unknown as never,
                name: "Legacy",
                colors: legacyColors,
                parentHash: null,
                forkedFromHash: null,
                authorSlug: "alice",
                paletteSlug: "legacy",
                createdAt: t,
                rootHash: "legacy-a",
                depth: 0,
            },
            {
                _id: "legacy-b" as unknown as never,
                name: "Legacy Edited",
                colors: legacyColors,
                parentHash: "legacy-a",
                forkedFromHash: null,
                authorSlug: "alice",
                paletteSlug: "legacy",
                createdAt: t,
                rootHash: "legacy-a",
                depth: 1,
            },
        ]);

        const report = await migrateXW3PayloadHash(db);
        console.log(describeMigration(report));

        expect(report.versionsScanned).toBe(2);
        expect(report.payloadHashWritten).toBe(2);
        expect(report.revisionNoWritten).toBe(2);
        expect(report.currentHashRestamped).toBe(1);

        const rows = await services.repositories.paletteVersions.findByPaletteSlug(
            "legacy",
            0,
            10,
        );
        expect(rows.map((v) => v.revisionNo)).toEqual([2, 1]);
        expect(rows.map((v) => v._id)).toEqual(["legacy-b", "legacy-a"]);
        expect(rows[1]?.payloadHash).toBe(computeContentHash("Legacy", legacyColors));

        const palette = await services.repositories.palettes.findBySlug("legacy");
        expect(palette?.currentHash).toBe(computeContentHash("Legacy", legacyColors));

        // At-rest `_id` values are NOT rewritten (W3 §3a) and re-running is a
        // no-op: same totals scanned, nothing further written.
        const again = await migrateXW3PayloadHash(db);
        expect(again.versionsScanned).toBe(2);
        expect(again.payloadHashWritten).toBe(0);
        expect(again.revisionNoWritten).toBe(0);
        expect(again.currentHashRestamped).toBe(0);
    });

    it("revertToVersion throws NotFoundError on missing palette", async () => {
        await expect(
            revertToVersion(services, {
                slug: "ghost",
                hash: "deadbeef",
                userSlug: "alice",
            }),
        ).rejects.toBeInstanceOf(NotFoundError);
    });
});

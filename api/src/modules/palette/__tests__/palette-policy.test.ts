// SERVED MODEL: claude-opus-5[1m]
/**
 * X-W3 · X.A1 — the palette object-read policy kernel (gates G-1..G-4).
 *
 * This file is authored BEFORE its cure (X-W3 §L-18 / fold S-11: the gate's
 * spec lands first, born-RED, and flips only at the byte). Each `describe`
 * block below names the §6 gate it turns and the falsifier that makes it fail
 * for exactly one reason.
 *
 *   G-1  `getPaletteBySlug` on a `private` palette with `currentUserSlug:
 *        undefined` throws `NotFoundError`; the owner still reads it.
 *   G-2  Non-owner GET of a soft-deleted palette → 404; owner → 410. The
 *        `GoneError` arm sits BEHIND the ownership check, so it can no longer
 *        serve as an existence oracle to a stranger.
 *   G-3  `GET /palettes/{slug}/versions` on a private palette is refused
 *        anonymously, and the release check is taken before any item is
 *        formatted (fold S-4: the bare list is *strictly more disclosure* than
 *        the detail route — every superseded `{name, colors, authorSlug,
 *        parentHash}`).
 *
 *   G-4  `GET /palettes/{slug}/provenance` authorizes the target BEFORE
 *        walking, and an owner's own private hops resolve to `palette` steps
 *        rather than `unavailable`.
 *
 * G-4 was authored as an escalation at X.W3.1 (`ESC-W3.1-G4-BOUNDS`): its cure
 * needs `c.var.userSlug` threaded from `routes/forks.ts`, which was outside
 * that unit's writable set, and it was never half-landed behind an optional
 * viewer no caller passes. `routes/forks.ts` IS in the wave's §4 File Bounds,
 * so the limb is taken at Repair 1 and its rows are the last block below.
 * D-5 stands either way: the provenance *redaction* half is ALREADY CLOSED
 * (V·W45 item 4) and is not rebuilt.
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { Hono } from "hono";
import type { Db, MongoClient } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import { palettes } from "../routes/index.js";
import {
    GoneError,
    NotFoundError,
    toResponseEnvelope,
} from "../../../platform/http/errors/index.js";
import { createPalette, deletePalette, getPaletteBySlug } from "../service/crud.js";
import {
    assertReadable,
    isReadable,
    paletteReadableFilter,
} from "../service/visibility.js";
import type { PaletteColor } from "../model.js";
import type { AppEnv } from "../../../types.js";
import type { Services } from "../../../platform/http/inject-services.js";

const COLORS: PaletteColor[] = [{ css: "#ff0000", position: 0 }];

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

describe("palette read policy (X-W3 · X.A1)", () => {
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

    /** Births a palette owned by `owner` and forces it to `private` at rest. */
    async function makePrivate(slug: string, owner: string): Promise<void> {
        await createPalette(services, {
            body: { name: slug, slug, colors: COLORS, tags: [] },
            userSlug: owner,
        });
        await db
            .collection("palettes")
            .updateOne({ slug }, { $set: { visibility: "private" } });
    }

    // -----------------------------------------------------------------
    // The predicate itself — one decision point, two surfaces.
    // -----------------------------------------------------------------

    describe("assertReadable / isReadable", () => {
        it("admits the owner in ANY state and refuses every stranger but active-public", () => {
            const owner = "alice";
            const live = {
                visibility: "private",
                deletedAt: null,
                userSlug: owner,
            } as const;
            const trashed = {
                visibility: "public",
                deletedAt: new Date(),
                userSlug: owner,
            } as const;
            const open = {
                visibility: "public",
                deletedAt: null,
                userSlug: owner,
            } as const;

            // owner-any-state
            expect(isReadable(live, owner)).toBe(true);
            expect(isReadable(trashed, owner)).toBe(true);

            // active-public
            expect(isReadable(open, undefined)).toBe(true);
            expect(isReadable(open, "bob")).toBe(true);

            // everything else
            expect(isReadable(live, undefined)).toBe(false);
            expect(isReadable(live, "bob")).toBe(false);
            expect(isReadable(trashed, undefined)).toBe(false);
            expect(isReadable(trashed, "bob")).toBe(false);

            // a null-owned row is nobody's: an absent viewer must not match it
            expect(
                isReadable(
                    { visibility: "private", deletedAt: null, userSlug: null },
                    undefined,
                ),
            ).toBe(false);

            // moderation clock (the field lands at X.W3.5/G-15; absent reads `clear`)
            expect(isReadable({ ...open, moderation: "withdrawn" }, undefined)).toBe(
                false,
            );
            expect(isReadable({ ...open, moderation: "withdrawn" }, owner)).toBe(true);
            expect(isReadable({ ...open, moderation: "clear" }, undefined)).toBe(true);
        });

        it("throws NotFoundError — never a distinguishable refusal — when it refuses", () => {
            expect(() =>
                assertReadable(
                    { visibility: "private", deletedAt: null, userSlug: "alice" },
                    "bob",
                ),
            ).toThrow(NotFoundError);
        });
    });

    // -----------------------------------------------------------------
    // G-1 — the detail read
    // -----------------------------------------------------------------

    describe("G-1 · getPaletteBySlug authorizes before it formats", () => {
        it("refuses an anonymous reader of a private palette and serves its owner", async () => {
            await makePrivate("secret", "alice");

            await expect(
                getPaletteBySlug(services, "secret", undefined),
            ).rejects.toBeInstanceOf(NotFoundError);

            const owned = await getPaletteBySlug(services, "secret", "alice");
            expect(owned.slug).toBe("secret");
            expect(owned.visibility).toBe("private");
        });

        it("refuses a DIFFERENT authenticated user of a private palette", async () => {
            await makePrivate("secret", "alice");
            await expect(
                getPaletteBySlug(services, "secret", "bob"),
            ).rejects.toBeInstanceOf(NotFoundError);
        });

        it("still serves a public palette to a stranger (the cure is not a wall)", async () => {
            await createPalette(services, {
                body: { name: "open", slug: "open", colors: COLORS, tags: [] },
                userSlug: "alice",
            });
            const got = await getPaletteBySlug(services, "open", undefined);
            expect(got.slug).toBe("open");
        });
    });

    // -----------------------------------------------------------------
    // G-2 — the trashed arm moves behind the ownership check
    // -----------------------------------------------------------------

    describe("G-2 · the soft-delete arm is owner-only", () => {
        it("answers a stranger 404 and the owner 410", async () => {
            await createPalette(services, {
                body: { name: "kill", slug: "kill", colors: COLORS, tags: [] },
                userSlug: "alice",
            });
            await deletePalette(services, { slug: "kill" });

            // The falsifier: hoist the GoneError arm back above the predicate
            // and this assertion flips to GoneError — a live existence oracle.
            await expect(
                getPaletteBySlug(services, "kill", undefined),
            ).rejects.toBeInstanceOf(NotFoundError);
            await expect(
                getPaletteBySlug(services, "kill", "bob"),
            ).rejects.toBeInstanceOf(NotFoundError);

            await expect(
                getPaletteBySlug(services, "kill", "alice"),
            ).rejects.toBeInstanceOf(GoneError);
        });
    });

    // -----------------------------------------------------------------
    // G-3 — the revision list
    // -----------------------------------------------------------------

    describe("G-3 · the revision list is refused before a single item is formatted", () => {
        it("404s an anonymous caller on a private palette and serves its owner", async () => {
            await makePrivate("secret", "alice");
            const app = buildTestApp(services);

            const anon = await app.request("/palettes/secret/versions");
            expect(anon.status).toBe(404);
            // Nothing of the superseded estate crossed the wire.
            expect(await anon.text()).not.toContain("#ff0000");

            const stranger = await app.request("/palettes/secret/versions", {
                headers: { "X-Test-User-Slug": "bob" },
            });
            expect(stranger.status).toBe(404);

            const owner = await app.request("/palettes/secret/versions", {
                headers: { "X-Test-User-Slug": "alice" },
            });
            expect(owner.status).toBe(200);
            const body = (await owner.json()) as { total: number };
            expect(body.total).toBe(1);
        });

        it("still serves a public palette's revision list anonymously", async () => {
            await createPalette(services, {
                body: { name: "open", slug: "open", colors: COLORS, tags: [] },
                userSlug: "alice",
            });
            const app = buildTestApp(services);
            const res = await app.request("/palettes/open/versions");
            expect(res.status).toBe(200);
        });

        it("404s the revision list of a palette that does not exist", async () => {
            const app = buildTestApp(services);
            const res = await app.request("/palettes/ghost/versions");
            expect(res.status).toBe(404);
        });
    });

    // -----------------------------------------------------------------
    // The query-side spelling — pinned to the predicate, not trusted beside it.
    // -----------------------------------------------------------------

    describe("paletteReadableFilter agrees with isReadable, row for row", () => {
        it("selects exactly the documents the predicate admits", async () => {
            // One row per interesting (owner, visibility, deletedAt) tuple.
            const rows = [
                { slug: "a-pub", userSlug: "alice", visibility: "public", deletedAt: null },
                { slug: "a-priv", userSlug: "alice", visibility: "private", deletedAt: null },
                { slug: "a-trash", userSlug: "alice", visibility: "public", deletedAt: new Date() },
                { slug: "b-pub", userSlug: "bob", visibility: "public", deletedAt: null },
                { slug: "b-priv", userSlug: "bob", visibility: "private", deletedAt: null },
                { slug: "anon-priv", userSlug: null, visibility: "private", deletedAt: null },
            ];
            await db.collection("palettes").insertMany(rows.map((r) => ({ ...r })));

            for (const viewer of [undefined, "alice", "bob", "carol"]) {
                const selected = await db
                    .collection("palettes")
                    .find(paletteReadableFilter(viewer) as Record<string, unknown>)
                    .map((d) => String(d.slug))
                    .toArray();
                const admitted = rows
                    .filter((r) =>
                        isReadable(
                            r as unknown as Parameters<typeof isReadable>[0],
                            viewer,
                        ),
                    )
                    .map((r) => r.slug);
                expect(selected.sort()).toEqual(admitted.sort());
            }
        });
    });

    // -----------------------------------------------------------------
    // G-4 — the provenance walk (the limb returned as ESC-W3.1-G4-BOUNDS,
    // taken at Repair 1 with `routes/forks.ts` in the repair seat's bounds).
    // -----------------------------------------------------------------

    describe("G-4 · provenance authorizes the target before it walks", () => {
        /** `parent` (alice, forced private) ← `child` (bob, public). */
        async function makeChain(): Promise<void> {
            await makePrivate("parent", "alice");
            await createPalette(services, {
                body: { name: "child", slug: "child", colors: COLORS, tags: [] },
                userSlug: "bob",
            });
            await db
                .collection("palettes")
                .updateOne({ slug: "child" }, { $set: { forkOf: "parent" } });
        }

        it("refuses an anonymous walk of a private target and serves its owner", async () => {
            await makePrivate("secret", "alice");
            const app = buildTestApp(services);

            const anon = await app.request("/palettes/secret/provenance");
            expect(anon.status).toBe(404);

            const stranger = await app.request("/palettes/secret/provenance", {
                headers: { "X-Test-User-Slug": "bob" },
            });
            expect(stranger.status).toBe(404);

            const owner = await app.request("/palettes/secret/provenance", {
                headers: { "X-Test-User-Slug": "alice" },
            });
            expect(owner.status).toBe(200);
        });

        it("collapses a hop the viewer may not read, and resolves the owner's own", async () => {
            await makeChain();
            const app = buildTestApp(services);

            // Anonymous: the public child resolves, its private parent does not.
            const anon = await app.request("/palettes/child/provenance");
            expect(anon.status).toBe(200);
            const anonChain = (await anon.json()) as Record<string, unknown>[];
            expect(anonChain).toHaveLength(2);
            expect(anonChain[0]).toMatchObject({ kind: "palette", slug: "child" });
            expect(anonChain[1]).toEqual({ kind: "unavailable", ordinal: 1 });

            // Alice owns the parent: HER walk resolves it to a real step. This
            // is the arm `isActivePublic` could not express — the falsifier is
            // to restore `isActivePublic` here, at which point this row alone
            // fails while the anonymous row above stays green.
            const owner = await app.request("/palettes/child/provenance", {
                headers: { "X-Test-User-Slug": "alice" },
            });
            expect(owner.status).toBe(200);
            const ownerChain = (await owner.json()) as Record<string, unknown>[];
            expect(ownerChain).toHaveLength(2);
            expect(ownerChain[1]).toMatchObject({
                kind: "palette",
                ordinal: 1,
                slug: "parent",
            });
        });

        it("404s the provenance of a palette that does not exist", async () => {
            const app = buildTestApp(services);
            const res = await app.request("/palettes/ghost/provenance");
            expect(res.status).toBe(404);
        });
    });
});

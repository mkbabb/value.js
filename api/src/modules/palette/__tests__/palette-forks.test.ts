import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../../../../test/helpers.js";
import {
    forkPalette,
    getProvenance,
    listForks,
} from "../service/forks.js";
import { createPalette } from "../service/crud.js";
import {
    NotFoundError,
    ValidationError,
} from "../../../platform/http/errors/index.js";
import type { Services } from "../../../platform/http/inject-services.js";

describe("service.palette.forks", () => {
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
        await createPalette(services, {
            body: {
                name: "Root",
                slug: "root",
                colors: [{ css: "#ff0000", position: 0 }],
                tags: ["warm"],
            },
            userSlug: "alice",
        });
    });

    it("forkPalette creates a child palette and increments source forkCount", async () => {
        const result = await forkPalette(services, {
            sourceSlug: "root",
            slug: "root-clone",
            userSlug: "bob",
        });
        expect(result.palette.slug).toBe("root-clone");
        const source = await services.repositories.palettes.findBySlug("root");
        expect(source?.forkCount).toBe(1);
    });

    it("forkPalette copies the source colors and records the provenance edge", async () => {
        // Re-homed from the excised palette-remix.test.ts (TA-4): a fork copies
        // the source's colors verbatim and its child version carries the
        // `forkedFromHash` provenance edge (no atom-diff column — dropped at T.W1).
        const source = await services.repositories.palettes.findBySlug("root");
        const { palette } = await forkPalette(services, {
            sourceSlug: "root",
            slug: "root-copy",
            userSlug: "bob",
        });
        expect(palette.colors).toEqual(source?.colors);
        expect(palette.forkOf).toBe("root");

        // ESC-W3.2-PAYLOAD-ADDRESSED-TESTS, taken at Repair 1. `currentHash` is
        // a PAYLOAD hash; since G-7 split the two identities, `_id` is the
        // RELEASE hash, so a by-id lookup keyed on `currentHash` resolves to
        // nothing. The child's row is resolved by MEMBERSHIP instead — the same
        // correction the service layer took — and the assertion below is
        // unchanged and still true: `forkedFromHash` remains a payload
        // reference and still records the fork edge.
        const childVersion =
            await services.repositories.paletteVersions.findHeadByPaletteSlug(
                palette.slug,
            );
        expect(childVersion?.forkedFromHash).toBe(source?.currentHash ?? null);
    });

    it("forkPalette births the child PRIVATE (X-W3 · G-12, class 2)", async () => {
        const { palette } = await forkPalette(services, {
            sourceSlug: "root",
            slug: "root-private",
            userSlug: "bob",
        });
        expect(palette.visibility).toBe("private");
    });

    it("forkPalette refuses a source the forker may not read (X-W3 · G-12)", async () => {
        await services.repositories.palettes.update("root", {
            $set: { visibility: "private" },
        });
        // A stranger cannot fork alice's private palette…
        await expect(
            forkPalette(services, {
                sourceSlug: "root",
                slug: "stolen",
                userSlug: "bob",
            }),
        ).rejects.toBeInstanceOf(NotFoundError);
        expect(await services.repositories.palettes.findBySlug("stolen")).toBeNull();

        // …and the owner still can. (The falsifier: drop the pre-flight
        // `assertPaletteReadable` and the first arm alone goes green-with-a-child.)
        const { palette } = await forkPalette(services, {
            sourceSlug: "root",
            slug: "mine",
            userSlug: "alice",
        });
        expect(palette.forkOf).toBe("root");
    });

    it("forkPalette on missing source throws NotFoundError", async () => {
        await expect(
            forkPalette(services, {
                sourceSlug: "ghost",
                userSlug: "alice",
            }),
        ).rejects.toBeInstanceOf(NotFoundError);
    });

    it("forkPalette validates slug shape", async () => {
        await expect(
            forkPalette(services, {
                sourceSlug: "root",
                slug: "BAD SLUG!",
                userSlug: "alice",
            }),
        ).rejects.toBeInstanceOf(ValidationError);
    });

    it("listForks discloses no child the viewer may not read, and `total` agrees (X-W3 · G-13)", async () => {
        await forkPalette(services, {
            sourceSlug: "root",
            slug: "fork-a",
            userSlug: "bob",
        });
        await forkPalette(services, {
            sourceSlug: "root",
            slug: "fork-b",
            userSlug: "carol",
        });

        // Both children are born private (G-12), so an anonymous caller sees
        // neither — and `total` says so too. Before the cure this returned
        // `{total: 2, data: [fork-a, fork-b]}` in full to everyone.
        const anon = await listForks(services, "root", 0, 10, undefined);
        expect(anon.total).toBe(0);
        expect(anon.data).toHaveLength(0);

        // Bob sees his own child and NOT carol's — the count is per viewer,
        // never a global truth.
        const bob = await listForks(services, "root", 0, 10, "bob");
        expect(bob.total).toBe(1);
        expect(bob.data.map((r) => r.slug)).toEqual(["fork-a"]);

        // Published children are everyone's. The falsifier: drop the viewer
        // from `countForksOf` and the anonymous `total` above reads 2 while its
        // `data` stays empty — the exact disagreement the gate names.
        await services.repositories.palettes.update("fork-b", {
            $set: { visibility: "public" },
        });
        const after = await listForks(services, "root", 0, 10, undefined);
        expect(after.total).toBe(1);
        expect(after.data.map((r) => r.slug)).toEqual(["fork-b"]);
    });

    it("listForks refuses a parent the viewer may not read (X-W3 · G-13)", async () => {
        await services.repositories.palettes.update("root", {
            $set: { visibility: "private" },
        });
        await expect(listForks(services, "root", 0, 10, "bob")).rejects.toBeInstanceOf(
            NotFoundError,
        );
        const owner = await listForks(services, "root", 0, 10, "alice");
        expect(owner.total).toBe(0);
    });

    it("getProvenance walks the fork chain (public hops carry minimal identity)", async () => {
        await forkPalette(services, {
            sourceSlug: "root",
            slug: "child",
            userSlug: "bob",
        });
        // The child is born private (G-12), so its own owner is the viewer who
        // can walk it; `root` is public, so the hop above resolves for anyone.
        const chain = await getProvenance(services, "child", "bob");
        expect(chain).toHaveLength(2);
        expect(chain[0]).toMatchObject({
            kind: "palette",
            ordinal: 0,
            slug: "child",
            isFork: true,
        });
        expect(chain[1]).toMatchObject({
            kind: "palette",
            ordinal: 1,
            slug: "root",
            isFork: false,
        });
    });

    it("getProvenance collapses a private+trashed ancestor to {kind:'unavailable',ordinal} (V·W45 item 4)", async () => {
        await forkPalette(services, {
            sourceSlug: "root",
            slug: "child",
            userSlug: "bob",
        });
        // Make the ancestor non-public: private AND soft-deleted.
        await services.repositories.palettes.update("root", {
            $set: { visibility: "private", deletedAt: new Date() },
        });

        const chain = await getProvenance(services, "child", "bob");
        expect(chain).toHaveLength(2);
        // The child itself is readable by its owner → a full palette step.
        expect(chain[0]).toMatchObject({ kind: "palette", slug: "child" });
        // The hidden ancestor collapses — ONLY kind + ordinal, no lineage.
        expect(chain[1]).toEqual({ kind: "unavailable", ordinal: 1 });
        expect(Object.keys(chain[1]).sort()).toEqual(["kind", "ordinal"]);
    });
});

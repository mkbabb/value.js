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

        const childVersion = await services.repositories.paletteVersions.findByHash(
            palette.currentHash as string,
        );
        expect(childVersion?.forkedFromHash).toBe(source?.currentHash ?? null);
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

    it("listForks returns the children paginated", async () => {
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
        const result = await listForks(services, "root", 0, 10);
        expect(result.total).toBe(2);
        expect(result.data).toHaveLength(2);
    });

    it("getProvenance walks the fork chain (public hops carry minimal identity)", async () => {
        await forkPalette(services, {
            sourceSlug: "root",
            slug: "child",
            userSlug: "bob",
        });
        const chain = await getProvenance(services, "child");
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

        const chain = await getProvenance(services, "child");
        expect(chain).toHaveLength(2);
        // The child itself is still public → a full palette step.
        expect(chain[0]).toMatchObject({ kind: "palette", slug: "child" });
        // The hidden ancestor collapses — ONLY kind + ordinal, no lineage.
        expect(chain[1]).toEqual({ kind: "unavailable", ordinal: 1 });
        expect(Object.keys(chain[1]).sort()).toEqual(["kind", "ordinal"]);
    });
});

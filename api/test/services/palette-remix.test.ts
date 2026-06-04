/**
 * J.W2 — `remixPalette` (fork + recorded atom-diff).
 *
 * Asserts the diff-bearing provenance edge: a remix records the source→child
 * atom-diff on the child's version row; a plain fork (no colors) records the
 * empty diff (fork IS remix-with-empty-diff — one code path). The
 * cross-collection `withTransaction` discipline (insert child + version + bump
 * parent fork-count) is inherited from `forkPalette` unchanged.
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { Db, MongoClient } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import { createPalette } from "../../src/services/palette/crud.js";
import { forkPalette, remixPalette } from "../../src/services/palette/forks.js";
import type { PaletteColor } from "../../src/models.js";
import type { Services } from "../../src/middleware/inject-services.js";

const SOURCE: PaletteColor[] = [
    { css: "#ff0000", name: "red", position: 0 },
    { css: "#00ff00", name: "green", position: 1 },
];
const REMIXED: PaletteColor[] = [
    { css: "#cc0000", name: "crimson", position: 0 },
    { css: "#00ff00", name: "green", position: 1 },
    { css: "#0000ff", name: "blue", position: 2 },
];

describe("service.palette.remixPalette", () => {
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
            body: { name: "source", slug: "source", colors: SOURCE, tags: ["warm"] },
            userSlug: "alice",
        });
    });

    it("records the source→child atom-diff on the child version edge", async () => {
        const { palette, atomDiff, remixedFrom } = await remixPalette(services, {
            sourceSlug: "source",
            slug: "source-remixed",
            colors: REMIXED,
            userSlug: "bob",
        });

        // The recorded diff: position 0 changed, position 2 added.
        expect(atomDiff.map((o) => o.op).sort()).toEqual(["added", "changed"]);
        expect(remixedFrom.slug).toBe("source");
        expect(palette.forkOf).toBe("source");
        expect(palette.colors).toHaveLength(3);

        // The diff is PERSISTED on the child's root version (the edge).
        const childVersion =
            await services.repositories.paletteVersions.findByHash(
                palette.currentHash as string,
            );
        expect(childVersion?.atomDiff).toBeDefined();
        expect(childVersion?.atomDiff).toEqual(atomDiff);

        // Cross-collection effect: parent fork-count bumped (unchanged from fork).
        const source = await services.repositories.palettes.findBySlug("source");
        expect(source?.forkCount).toBe(1);
    });

    it("a plain fork is remix-with-empty-diff (one code path)", async () => {
        const { palette } = await forkPalette(services, {
            sourceSlug: "source",
            slug: "source-fork",
            userSlug: "bob",
        });
        expect(palette.colors).toEqual(SOURCE);

        const forkVersion =
            await services.repositories.paletteVersions.findByHash(
                palette.currentHash as string,
            );
        // Empty array (forked, no changes) — distinct from a from-scratch root
        // (which carries `null`).
        expect(forkVersion?.atomDiff).toEqual([]);
    });

    it("remix without colors also records the empty diff", async () => {
        const { atomDiff } = await remixPalette(services, {
            sourceSlug: "source",
            slug: "source-noop",
            userSlug: "bob",
        });
        expect(atomDiff).toEqual([]);
    });
});

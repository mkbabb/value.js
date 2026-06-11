/**
 * Pagination boundary coverage for `listPalettes` (N.W3.D).
 *
 * The public list is CURSOR-ONLY (the dual cursor+offset paths collapsed). The
 * critical correctness this guards is the color-distance filter's
 * short-page-honesty: with a filter active, a returned page must be FULL
 * (== limit) until the matching set is genuinely exhausted — never a short or
 * empty page with `hasMore: true` while more matches lie beyond the first
 * underlying page (the old post-filter contrivance).
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { MongoClient, Db } from "mongodb";
import { buildServices, cleanCollections, connect } from "../helpers.js";
import type { Services } from "../../src/middleware/inject-services.js";
import type { OklabTriple, Palette } from "../../src/models.js";
import { listPalettes } from "../../src/services/palette/crud-list.js";

function makePalette(slug: string, oklab: OklabTriple[], createdAtMs: number): Palette {
    const when = new Date(createdAtMs);
    return {
        name: slug,
        slug,
        colors: [{ css: "#000000", position: 0 }],
        oklabColors: oklab,
        tags: [],
        voteCount: 0,
        userSlug: null,
        visibility: "public",
        tier: "standard",
        deletedAt: null,
        createdAt: when,
        updatedAt: when,
        currentHash: `hash-${slug}`,
        forkOf: null,
        forkOfHash: null,
        forkCount: 0,
        versionCount: 1,
    };
}

describe("service.palette.list pagination (N.W3.D)", () => {
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

    it("first page (no cursor) returns data + cursor-shaped envelope, no offset/total", async () => {
        for (let i = 0; i < 5; i++) {
            await services.repositories.palettes.insert(
                makePalette(`p${i}`, [{ L: 0.5, a: 0, b: 0 }], 1000 + i),
            );
        }
        const res = await listPalettes(services, { limit: 3 }, undefined);
        expect(res.data).toHaveLength(3);
        expect(res.hasMore).toBe(true);
        expect(typeof res.nextCursor).toBe("string");
        // Cursor-only envelope — the offset-era fields are gone.
        expect(res).not.toHaveProperty("total");
        expect(res).not.toHaveProperty("offset");
    });

    it("the continuation cursor advances strictly forward with no dupes/skips", async () => {
        for (let i = 0; i < 7; i++) {
            await services.repositories.palettes.insert(
                makePalette(`q${i}`, [{ L: 0.5, a: 0, b: 0 }], 2000 + i),
            );
        }
        const page1 = await listPalettes(services, { limit: 3 }, undefined);
        const page2 = await listPalettes(
            services,
            { limit: 3, cursor: page1.nextCursor ?? undefined },
            undefined,
        );
        const page3 = await listPalettes(
            services,
            { limit: 3, cursor: page2.nextCursor ?? undefined },
            undefined,
        );
        const all = [...page1.data, ...page2.data, ...page3.data].map((p) => p.slug);
        expect(all).toHaveLength(7);
        expect(new Set(all).size).toBe(7); // no dupes
        expect(page3.hasMore).toBe(false);
        expect(page3.nextCursor).toBeNull();
    });

    it("color filter active: a full page (== limit) even when matches are sparse across underlying pages (honest, never short-with-hasMore)", async () => {
        // 30 palettes: only every 5th matches the target color. With limit 3 a
        // naive single-page post-filter would return ~0-1 matches with
        // hasMore:true. The fetch-ahead loop scans forward until the page is
        // full or the matching set is exhausted.
        const target: OklabTriple = { L: 0.7, a: 0.1, b: 0.1 };
        const far: OklabTriple = { L: 0.1, a: -0.3, b: -0.3 };
        for (let i = 0; i < 30; i++) {
            const oklab = i % 5 === 0 ? [target] : [far];
            await services.repositories.palettes.insert(
                makePalette(`c${String(i).padStart(2, "0")}`, oklab, 3000 + i),
            );
        }
        // 6 docs match (i = 0,5,10,15,20,25). Page of 3 must be FULL.
        const res = await listPalettes(
            services,
            {
                limit: 3,
                colorL: target.L,
                colorA: target.a,
                colorB: target.b,
                colorRadius: 0.01,
            },
            undefined,
        );
        expect(res.data).toHaveLength(3); // FULL page — not short
        expect(res.hasMore).toBe(true);
        // Every returned doc genuinely matches.
        for (const p of res.data) {
            expect(p.oklabColors?.[0]?.L).toBeCloseTo(target.L);
        }

        // The continuation pulls the remaining 3 matches, then honestly ends.
        const res2 = await listPalettes(
            services,
            {
                limit: 3,
                colorL: target.L,
                colorA: target.a,
                colorB: target.b,
                colorRadius: 0.01,
                cursor: res.nextCursor ?? undefined,
            },
            undefined,
        );
        expect(res2.data).toHaveLength(3);
        // 6 total matches consumed across the two pages — no dupes.
        const matchedSlugs = [...res.data, ...res2.data].map((p) => p.slug);
        expect(new Set(matchedSlugs).size).toBe(6);
    });

    it("color filter with zero matches: an honest empty final page (hasMore false), not a short page with hasMore true", async () => {
        for (let i = 0; i < 8; i++) {
            await services.repositories.palettes.insert(
                makePalette(`z${i}`, [{ L: 0.1, a: 0, b: 0 }], 4000 + i),
            );
        }
        const res = await listPalettes(
            services,
            {
                limit: 5,
                colorL: 0.9,
                colorA: 0.3,
                colorB: 0.3,
                colorRadius: 0.001,
                // unmatchable target
            },
            undefined,
        );
        expect(res.data).toHaveLength(0);
        expect(res.hasMore).toBe(false);
        expect(res.nextCursor).toBeNull();
    });
});

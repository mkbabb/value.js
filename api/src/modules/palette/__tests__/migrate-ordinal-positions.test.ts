// SERVED MODEL: claude-opus-5-5
/**
 * X.W11.api2 — the one-shot ordinal-position migration (COHESION §0gt.5):
 * a dry run reports the counts and writes nothing; the real run writes exactly
 * what the dry run counted; a re-run writes nothing.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { Db, MongoClient } from "mongodb";
import { cleanCollections, connect } from "../../../../test/helpers.js";
import { computeContentHash } from "../hash.js";
import { colorsArraySchema } from "../schema.js";
import {
    describeOrdinalMigration,
    migrateOrdinalPositions,
    normalizeToOrdinal,
} from "../migrate-ordinal-positions.js";

const t = new Date("2026-01-01T00:00:00.000Z");

/** Extract's former encoding, i/(n-1), with weights. */
const extractLegacy = [
    { css: "#aa0000", position: 0, weight: 0.5 },
    { css: "#00aa00", position: 0.5, weight: 0.3 },
    { css: "#0000aa", position: 1, weight: 0.2 },
];
/** Already ordinal (Generate). */
const generateRow = [
    { css: "#aa0000", position: 0 },
    { css: "#00aa00", position: 1 },
    { css: "#0000aa", position: 2 },
];
/** Stored array order disagreeing with the stored positions. */
const scrambled = [
    { css: "#0000aa", position: 1 },
    { css: "#aa0000", position: 0 },
];

function paletteDoc(slug: string, colors: unknown[], currentHash: string) {
    return {
        name: slug,
        slug,
        colors,
        oklabColors: [],
        tags: [],
        voteCount: 0,
        userSlug: "alice",
        visibility: "public",
        moderation: "clear",
        tier: "standard",
        deletedAt: null,
        createdAt: t,
        updatedAt: t,
        currentHash,
        forkOf: null,
        forkOfHash: null,
        forkCount: 0,
        versionCount: 1,
    };
}

describe("migrateOrdinalPositions (§0gt.5)", () => {
    let client: MongoClient;
    let db: Db;

    beforeAll(async () => {
        ({ client, db } = await connect());
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await cleanCollections(db);
        await db.collection("palettes").insertMany([
            paletteDoc("extract-legacy", extractLegacy, "v1-hash-a"),
            // ordinal already, and its hash already current → untouched
            paletteDoc("generate", generateRow, computeContentHash(generateRow)),
            paletteDoc("scrambled", scrambled, "v1-hash-c"),
        ]);
        await db.collection("palette_versions").insertMany([
            { _id: "rel-a" as unknown as never, paletteSlug: "extract-legacy", name: "x", colors: extractLegacy, payloadHash: "v1-hash-a", revisionNo: 1 },
            { _id: "rel-b" as unknown as never, paletteSlug: "generate", name: "g", colors: generateRow, payloadHash: computeContentHash(generateRow), revisionNo: 1 },
        ]);
    });

    it("normalizeToOrdinal: stable sort on the stored position, then position = index", () => {
        expect(normalizeToOrdinal(extractLegacy).colors.map((c) => c.position)).toEqual([0, 1, 2]);
        const s = normalizeToOrdinal(scrambled);
        expect(s.reordered).toBe(true);
        expect(s.colors.map((c) => c.css)).toEqual(["#aa0000", "#0000aa"]);
        expect(normalizeToOrdinal(generateRow).positionsChanged).toBe(false);
    });

    it("dry run → counts, nothing written; real run → the same counts, written; re-run → zero", async () => {
        const before = await db.collection("palettes").find().sort({ slug: 1 }).toArray();

        const dry = await migrateOrdinalPositions(db, { dryRun: true });
        console.log(describeOrdinalMigration(dry));
        expect(dry).toEqual({
            dryRun: true,
            palettesScanned: 3,
            palettePositionsNormalized: 2,
            palettesReordered: 1,
            palettesCurrentHashRestamped: 2,
            versionsScanned: 2,
            versionPositionsNormalized: 1,
            versionsReordered: 0,
            versionsPayloadHashRestamped: 1,
        });
        expect(await db.collection("palettes").find().sort({ slug: 1 }).toArray()).toEqual(before);

        const real = await migrateOrdinalPositions(db, { dryRun: false });
        console.log(describeOrdinalMigration(real));
        expect({ ...real, dryRun: true }).toEqual(dry);

        const legacy = await db.collection("palettes").findOne({ slug: "extract-legacy" });
        // the at-rest row now satisfies the wire contract, weights carried through
        expect(colorsArraySchema.safeParse(legacy?.colors).success).toBe(true);
        expect(legacy?.colors).toEqual([
            { css: "#aa0000", position: 0, weight: 0.5 },
            { css: "#00aa00", position: 1, weight: 0.3 },
            { css: "#0000aa", position: 2, weight: 0.2 },
        ]);
        // Extract's legacy row and Generate's row are now one identity
        expect(legacy?.currentHash).toBe(computeContentHash(generateRow));
        const version = await db.collection("palette_versions").findOne({ _id: "rel-a" as unknown as never });
        expect(version?.payloadHash).toBe(computeContentHash(generateRow));
        const sc = await db.collection("palettes").findOne({ slug: "scrambled" });
        expect(sc?.oklabColors).toHaveLength(2);

        const again = await migrateOrdinalPositions(db, { dryRun: false });
        expect(again).toEqual({
            dryRun: false,
            palettesScanned: 3,
            palettePositionsNormalized: 0,
            palettesReordered: 0,
            palettesCurrentHashRestamped: 0,
            versionsScanned: 2,
            versionPositionsNormalized: 0,
            versionsReordered: 0,
            versionsPayloadHashRestamped: 0,
        });
    });
});

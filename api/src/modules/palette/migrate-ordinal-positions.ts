// SERVED MODEL: claude-opus-5-5
/**
 * One-shot at-rest migration for the PCS-3/PCS-11 palette colour contract
 * (COHESION §0gt.5 · X.W11.api2).
 *
 * The contract: a colour's `position` is its 0-based integer ORDER in the
 * palette (the wire refuses anything else), and a palette's content hash is
 * the ordered colours' `css` only (`hash.ts: computeContentHash`, payload/v2).
 * Rows written before it carry two position encodings — Extract's
 * `i / max(1, n - 1)` and everyone else's `i` — and payload hashes framed
 * under payload/v1 (palette name + colour name + position). This pass:
 *
 *   1. normalizes every `palettes` and `palette_versions` row's `colors` to the
 *      ordinal: a stable sort on the stored position (array order breaks
 *      ties), then `position = index`. A palette whose order changed also gets
 *      its `oklabColors` recomputed so the two arrays stay index-aligned;
 *   2. re-stamps `palette_versions.payloadHash` and `palettes.currentHash`
 *      under the current framing, so the PATCH change-detector and the ETag
 *      read the same function new rows are hashed with.
 *
 * It does NOT touch `palette_versions._id` (release ids are opaque, W3 §3a),
 * `parentHash`, `forkedFromHash` or `forkOfHash`: those record historical
 * edges and have no query consumer. `weight` is carried through untouched.
 *
 * `--dry-run` computes every change and the count report, and writes nothing.
 * Idempotent: a second run reports zero writes.
 *
 * Run (from `api/`, with `MONGODB_URI` set as the server's own env):
 *   npx tsx src/modules/palette/migrate-ordinal-positions.ts --dry-run
 *   npx tsx src/modules/palette/migrate-ordinal-positions.ts
 * In the production container (the build emits it under `dist/`):
 *   docker compose -f api/compose.yaml exec api \
 *     node dist/modules/palette/migrate-ordinal-positions.js --dry-run
 * Order: run it once the §0gt.5 code is served (that code refuses the legacy
 * fractional positions on write and hashes under payload/v2).
 */

import { MongoClient, type Db } from "mongodb";
import { pathToFileURL } from "node:url";
import { computeContentHash } from "./hash.js";
import type { PaletteColor } from "./model.js";
import { computeOklabColors } from "./service/oklab.js";

export interface OrdinalMigrationReport {
    dryRun: boolean;
    palettesScanned: number;
    /** Palettes whose `colors` positions were rewritten to the ordinal. */
    palettePositionsNormalized: number;
    /** …of which the stored position order differed from the array order. */
    palettesReordered: number;
    palettesCurrentHashRestamped: number;
    versionsScanned: number;
    versionPositionsNormalized: number;
    versionsReordered: number;
    versionsPayloadHashRestamped: number;
}

interface Normalized {
    colors: PaletteColor[];
    positionsChanged: boolean;
    reordered: boolean;
}

/** Stable sort on the stored position, then `position = index`. */
export function normalizeToOrdinal(stored: readonly PaletteColor[]): Normalized {
    const ordered = stored
        .map((c, i) => ({ c, i }))
        .sort((a, b) => a.c.position - b.c.position || a.i - b.i);
    const reordered = ordered.some((o, k) => o.i !== k);
    const colors = ordered.map((o, k) => ({ ...o.c, position: k }));
    const positionsChanged = stored.some((c, i) => c.position !== i) || reordered;
    return { colors, positionsChanged, reordered };
}

export async function migrateOrdinalPositions(
    db: Db,
    { dryRun }: { dryRun: boolean },
): Promise<OrdinalMigrationReport> {
    const report: OrdinalMigrationReport = {
        dryRun,
        palettesScanned: 0,
        palettePositionsNormalized: 0,
        palettesReordered: 0,
        palettesCurrentHashRestamped: 0,
        versionsScanned: 0,
        versionPositionsNormalized: 0,
        versionsReordered: 0,
        versionsPayloadHashRestamped: 0,
    };

    const palettes = db.collection("palettes");
    for await (const doc of palettes.find(
        {},
        { projection: { slug: 1, colors: 1, currentHash: 1 } },
    )) {
        report.palettesScanned++;
        const n = normalizeToOrdinal((doc.colors ?? []) as PaletteColor[]);
        const set: Record<string, unknown> = {};
        if (n.positionsChanged) {
            set.colors = n.colors;
            report.palettePositionsNormalized++;
        }
        if (n.reordered) {
            set.oklabColors = computeOklabColors(n.colors);
            report.palettesReordered++;
        }
        const currentHash = computeContentHash(n.colors);
        if (doc.currentHash !== currentHash) {
            set.currentHash = currentHash;
            report.palettesCurrentHashRestamped++;
        }
        if (!dryRun && Object.keys(set).length > 0) {
            await palettes.updateOne({ _id: doc._id }, { $set: set });
        }
    }

    const versions = db.collection("palette_versions");
    for await (const row of versions.find(
        {},
        { projection: { colors: 1, payloadHash: 1 } },
    )) {
        report.versionsScanned++;
        const n = normalizeToOrdinal((row.colors ?? []) as PaletteColor[]);
        const set: Record<string, unknown> = {};
        if (n.positionsChanged) {
            set.colors = n.colors;
            report.versionPositionsNormalized++;
        }
        if (n.reordered) report.versionsReordered++;
        const payloadHash = computeContentHash(n.colors);
        if (row.payloadHash !== payloadHash) {
            set.payloadHash = payloadHash;
            report.versionsPayloadHashRestamped++;
        }
        if (!dryRun && Object.keys(set).length > 0) {
            await versions.updateOne({ _id: row._id }, { $set: set });
        }
    }

    return report;
}

/** The count report, one figure per line. */
export function describeOrdinalMigration(r: OrdinalMigrationReport): string {
    const tag = r.dryRun ? "[ordinal-migration · DRY RUN · nothing written]" : "[ordinal-migration]";
    return [
        `${tag} palettes scanned:               ${r.palettesScanned}`,
        `${tag} palette positions normalized:   ${r.palettePositionsNormalized}`,
        `${tag} palettes reordered:             ${r.palettesReordered}`,
        `${tag} palette currentHash re-stamped: ${r.palettesCurrentHashRestamped}`,
        `${tag} version rows scanned:           ${r.versionsScanned}`,
        `${tag} version positions normalized:   ${r.versionPositionsNormalized}`,
        `${tag} version rows reordered:         ${r.versionsReordered}`,
        `${tag} version payloadHash re-stamped: ${r.versionsPayloadHashRestamped}`,
    ].join("\n");
}

async function main(argv: readonly string[]): Promise<void> {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is required (the server's own database URI)");
    const client = new MongoClient(uri);
    await client.connect();
    try {
        const report = await migrateOrdinalPositions(client.db(), {
            dryRun: argv.includes("--dry-run"),
        });
        console.log(describeOrdinalMigration(report));
    } finally {
        await client.close();
    }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    await main(process.argv.slice(2));
}

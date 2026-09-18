// SERVED MODEL: claude-opus-5[1m]
/**
 * X-W3 at-rest migration — `payloadHash` + `revisionNo` (X.W3.2 · G-7) and,
 * appended by X.W3.5, the `unlisted` → `private` visibility mapping (G-15).
 *
 * WHY THIS IS A MIGRATION AND NOT A DEFAULT
 * -----------------------------------------
 * G-7 splits one value that used to do two jobs. Before X-W3,
 * `palette_versions._id` was `computeContentHash(name, colors)`: payload
 * identity WAS membership identity, so any holder of a content hash could
 * address any palette's revision. After X-W3, `_id` is the RELEASE hash and
 * the content identity lives in a new `payloadHash` field, with `revisionNo`
 * as the palette-scoped ordinal (fold S-6).
 *
 * At-rest rows carry neither field, and their `_id` values are legacy content
 * hashes under the OLD (unframed, name-less) canonicalization. This migration
 * therefore:
 *
 *   1. `$set`s `payloadHash` on every version row, recomputed from the row's
 *      own stored `name` + `colors` under the NEW framing;
 *   2. `$set`s `revisionNo` per palette, 1-based, ordered by `createdAt`
 *      ascending with `_id` as a deterministic tiebreak;
 *   3. re-stamps every palette's `currentHash` under the new framing, so the
 *      value the ETag and the PATCH change-detector read is the same function
 *      the new version rows are hashed with;
 *   4. (X.W3.5 · G-15) maps every at-rest `unlisted` palette to `private` and
 *      backfills the `moderation: "clear"` clock — the two-state enum and the
 *      separate withdrawal axis D9 rules. Step 4 shares this file by the wave
 *      spec's own design ("authored by X.W3.2 for a second author"): one
 *      migration, one run, one transcript.
 *
 * It does NOT rewrite `palette_versions._id`. That is deliberate and it is
 * bounded by the wave spec: `W3.md` §3a names "a rewrite of at-rest
 * `palette_versions._id` values" a TRIUMVIRATE trigger. No rewrite is needed —
 * `_id` is opaque to every reader, legacy rows stay addressable by the ids the
 * version list already handed out, and every NEW row gets a release id. Old
 * and new rows differ in how their `_id` was DERIVED, never in how it is USED.
 *
 * Idempotent: re-running recomputes the same values and reports the same
 * totals. Safe to run against a live database before the new code is served.
 */

import type { Db } from "mongodb";
import { computeContentHash } from "../../modules/palette/hash.js";
import type { PaletteColor } from "../../modules/palette/model.js";

export interface MigrationReport {
    /** Version rows inspected. */
    versionsScanned: number;
    /** Version rows whose `payloadHash` was written or corrected. */
    payloadHashWritten: number;
    /** Version rows whose `revisionNo` was written or corrected. */
    revisionNoWritten: number;
    /** Palette rows whose `currentHash` was re-stamped under the new framing. */
    currentHashRestamped: number;
    /** Palettes visited while numbering revisions. */
    palettesScanned: number;
    /** X.W3.5 · G-15: at-rest `unlisted` rows mapped to `private`. */
    unlistedMapped: number;
    /** X.W3.5 · G-15: rows given an explicit `moderation: "clear"` clock. */
    moderationClocked: number;
}

interface LegacyVersionRow {
    _id: string;
    paletteSlug: string;
    name: string;
    colors: PaletteColor[];
    createdAt: Date;
    payloadHash?: string;
    revisionNo?: number;
}

interface LegacyPaletteRow {
    slug: string;
    name: string;
    colors: PaletteColor[];
    currentHash: string | null;
    /** Pre-X-W3 the enum was 3-state; `unlisted` is mapped away by step 4. */
    visibility?: "public" | "unlisted" | "private";
    moderation?: "clear" | "withdrawn";
}

/**
 * Run the X-W3 payload/release migration. Returns the affected-document
 * counts; the caller prints them (see `describeMigration`).
 */
export async function migrateXW3PayloadHash(db: Db): Promise<MigrationReport> {
    const versions = db.collection<LegacyVersionRow>("palette_versions");
    const palettes = db.collection<LegacyPaletteRow>("palettes");

    const report: MigrationReport = {
        versionsScanned: 0,
        payloadHashWritten: 0,
        revisionNoWritten: 0,
        currentHashRestamped: 0,
        palettesScanned: 0,
        unlistedMapped: 0,
        moderationClocked: 0,
    };

    // --- 1 + 2: payloadHash and revisionNo, per palette ------------------
    const slugs = (await versions.distinct("paletteSlug")) as string[];
    for (const paletteSlug of slugs) {
        report.palettesScanned++;
        // `createdAt` is not injective; `_id` breaks the tie so the numbering
        // is deterministic across re-runs.
        const rows = await versions
            .find({ paletteSlug })
            .sort({ createdAt: 1, _id: 1 })
            .toArray();

        let revisionNo = 0;
        for (const row of rows) {
            report.versionsScanned++;
            revisionNo++;
            const payloadHash = computeContentHash(row.name, row.colors ?? []);
            const set: Record<string, unknown> = {};
            if (row.payloadHash !== payloadHash) set.payloadHash = payloadHash;
            if (row.revisionNo !== revisionNo) set.revisionNo = revisionNo;
            if (Object.keys(set).length === 0) continue;
            if ("payloadHash" in set) report.payloadHashWritten++;
            if ("revisionNo" in set) report.revisionNoWritten++;
            await versions.updateOne({ _id: row._id }, { $set: set });
        }
    }

    // --- 3: re-stamp `currentHash` under the new framing ------------------
    const paletteCursor = palettes.find(
        {},
        { projection: { slug: 1, name: 1, colors: 1, currentHash: 1 } },
    );
    for await (const doc of paletteCursor) {
        if (doc.currentHash === null || doc.currentHash === undefined) continue;
        const restamped = computeContentHash(doc.name, doc.colors ?? []);
        if (restamped === doc.currentHash) continue;
        await palettes.updateOne(
            { slug: doc.slug },
            { $set: { currentHash: restamped } },
        );
        report.currentHashRestamped++;
    }

    // --- 4: X.W3.5 · G-15 — `unlisted` dies; the moderation clock lands ----
    //
    // The mapping is `unlisted` → `private`, and it is not a choice between two
    // defensible readings: it is the state those rows were ALREADY being read
    // as. `isActivePublic` has always required `visibility === "public"`
    // exactly, so an `unlisted` row was refused to every non-owner and forced
    // out of the public browse (`crud-list.ts` pins anonymous listing to
    // `visibility: "public"`); mapping it to `public` would PUBLISH content its
    // owner never published. W3.md §3a names "at-rest `unlisted` rows the
    // two-state enum cannot represent" a triumvirate trigger — none exist:
    // every `unlisted` row is representable as `private` with its read
    // behaviour byte-unchanged, so the arm runs rather than escalating.
    //
    // The clock is backfilled in the same pass. `clear` is the reading an
    // absent field already has (`service/visibility.ts: isReadable`), so
    // writing it changes no decision — it makes the field PRESENT, which is
    // what lets `migrations/check.ts` police its value domain at boot.
    const unlisted = await palettes.updateMany(
        { visibility: "unlisted" },
        { $set: { visibility: "private" } },
    );
    report.unlistedMapped = unlisted.modifiedCount;

    const clocked = await palettes.updateMany(
        { moderation: { $exists: false } },
        { $set: { moderation: "clear" } },
    );
    report.moderationClocked = clocked.modifiedCount;

    return report;
}

/** One-line-per-figure transcript for the `migration-run.txt` artefact. */
export function describeMigration(report: MigrationReport): string {
    return [
        `[x-w3-migration] palettes scanned:        ${report.palettesScanned}`,
        `[x-w3-migration] version rows scanned:    ${report.versionsScanned}`,
        `[x-w3-migration] payloadHash written:     ${report.payloadHashWritten}`,
        `[x-w3-migration] revisionNo written:      ${report.revisionNoWritten}`,
        `[x-w3-migration] currentHash re-stamped:  ${report.currentHashRestamped}`,
        `[x-w3-migration] unlisted -> private:     ${report.unlistedMapped}`,
        `[x-w3-migration] moderation clocked:      ${report.moderationClocked}`,
    ].join("\n");
}

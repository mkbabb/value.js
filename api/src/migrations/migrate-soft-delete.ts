/**
 * I.W2 one-off migration: backfill `deletedAt: null` for all existing docs.
 *
 * The pre-I.W2 documents have no `deletedAt` field. The smoke probe at
 * `check.ts` requires the field exist (null or Date), so this migration
 * backfills `deletedAt: null` to all docs missing it. Idempotent.
 */

import type { Db } from "mongodb";

export interface SoftDeleteMigrationResult {
    inspected: number;
    updated: number;
    skipped: number;
}

export async function migrateSoftDelete(db: Db): Promise<SoftDeleteMigrationResult> {
    const palettes = db.collection("palettes");
    const filter = { deletedAt: { $exists: false } };
    const matched = await palettes.countDocuments(filter);
    const skipped = (await palettes.countDocuments({})) - matched;
    if (matched === 0) {
        return { inspected: skipped, updated: 0, skipped };
    }
    const result = await palettes.updateMany(filter, { $set: { deletedAt: null } });
    return {
        inspected: matched + skipped,
        updated: result.modifiedCount,
        skipped,
    };
}

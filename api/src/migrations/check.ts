/**
 * Migration smoke probe (D.W2 Lane D — D-HARDEN-3 §3 F1).
 *
 * Asserts the schema invariants the in-flight code relies on:
 *   - every `palettes` document carries `voteCount`, `tags`, `forkCount`,
 *     `currentHash`, `oklabColors` (the fields previously defaulted via `??`
 *     in `format/palette.ts`).
 *   - every `palettes` document carries a `userSlug` (the legacy
 *     `sessionToken` ownership shim is excised — Lane C's
 *     `require-ownership` middleware reads `userSlug` only).
 *
 * Runs at startup, after `getDb()` resolves and BEFORE the server begins
 * accepting connections. On violation: logs the offending slug + the missing
 * field and exits non-zero. Operator must run the corresponding one-off
 * migration (or restore from snapshot) before the API can start.
 *
 * Note: the `migrate-{oklab,slugs}.ts` one-off scripts have been deleted —
 * they were preserved in git history (`HEAD~N` at b7d7c63) and run prior
 * to D.W2 Lane D landing. This probe ensures they ran.
 */

import type { Db } from "mongodb";

interface MissingField {
    slug: string;
    field: string;
}

/**
 * Schema invariants for the `palettes` collection. Each entry: the field
 * name + a predicate that returns true when the field is present in a
 * valid form.
 */
const PALETTE_INVARIANTS: Array<{
    field: string;
    valid: (doc: Record<string, unknown>) => boolean;
}> = [
    { field: "voteCount", valid: (d) => typeof d.voteCount === "number" },
    { field: "tags", valid: (d) => Array.isArray(d.tags) },
    { field: "forkCount", valid: (d) => typeof d.forkCount === "number" },
    {
        field: "currentHash",
        // currentHash may be null (pre-version palette) but must be present.
        valid: (d) => "currentHash" in d,
    },
    { field: "oklabColors", valid: (d) => Array.isArray(d.oklabColors) },
    {
        field: "userSlug",
        // userSlug may be null (anonymous palette pre-suspension) but must
        // be present — the legacy sessionToken-only path is gone.
        valid: (d) => "userSlug" in d,
    },
    // I.W1: every palette doc carries the canonical visibility + tier fields.
    // The legacy `status` field is computed for backward-compat (kept in the
    // document for the I.W1 transition window; dropped at I.W4).
    {
        field: "visibility",
        valid: (d) =>
            d.visibility === "public" ||
            d.visibility === "unlisted" ||
            d.visibility === "private",
    },
    {
        field: "tier",
        valid: (d) =>
            d.tier === "standard" || d.tier === "featured" || d.tier === "archived",
    },
    // I.W2: every palette doc carries `deletedAt` field. null means live;
    // a Date means soft-deleted-within-grace. Reaper hard-deletes past grace.
    {
        field: "deletedAt",
        valid: (d) =>
            "deletedAt" in d &&
            (d.deletedAt === null || d.deletedAt instanceof Date),
    },
];

export interface MigrationCheckResult {
    ok: boolean;
    paletteCount: number;
    missing: MissingField[];
}

export async function checkMigrations(db: Db): Promise<MigrationCheckResult> {
    const cursor = db.collection("palettes").find(
        {},
        {
            projection: {
                slug: 1,
                voteCount: 1,
                tags: 1,
                forkCount: 1,
                currentHash: 1,
                oklabColors: 1,
                userSlug: 1,
                visibility: 1,
                tier: 1,
                deletedAt: 1,
            },
        },
    );

    const missing: MissingField[] = [];
    let paletteCount = 0;

    for await (const doc of cursor) {
        paletteCount++;
        const d = doc as Record<string, unknown>;
        for (const { field, valid } of PALETTE_INVARIANTS) {
            if (!valid(d)) {
                missing.push({ slug: String(d.slug ?? "<unknown>"), field });
            }
        }
        // Cap the surfaced list so we don't dump 10k entries on
        // catastrophically-broken collections.
        if (missing.length > 100) break;
    }

    return { ok: missing.length === 0, paletteCount, missing };
}

/**
 * Run the smoke probe and exit non-zero on violation. Called from
 * `index.ts` main() after `getDb()` resolves.
 */
export async function assertMigrationsApplied(db: Db): Promise<void> {
    const result = await checkMigrations(db);
    if (result.ok) {
        console.log(
            `[migrations] schema invariants OK (${result.paletteCount} palettes)`,
        );
        return;
    }
    console.error(
        `[migrations] FAILED: ${result.missing.length} field violation(s) across ${result.paletteCount} palettes`,
    );
    for (const m of result.missing.slice(0, 20)) {
        console.error(`  palette=${m.slug} missing-field=${m.field}`);
    }
    if (result.missing.length > 20) {
        console.error(`  …and ${result.missing.length - 20} more`);
    }
    console.error(
        "[migrations] Run the one-off migrations from git history (HEAD~N at b7d7c63) before starting the server.",
    );
    process.exit(1);
}

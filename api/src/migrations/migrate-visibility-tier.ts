/**
 * I.W1 one-off migration: backfill `visibility` + `tier` from legacy `status`.
 *
 * Maps the 4-state `status` enum to the (visibility, tier) tuple:
 *   - `published` → visibility=public,   tier=standard
 *   - `featured`  → visibility=public,   tier=featured
 *   - `hidden`    → visibility=unlisted, tier=standard
 *   - `draft`     → visibility=private,  tier=standard
 *
 * The legacy `status` field is **retained** in the document for backward-compat
 * during the I.W1 transition. The `format/palette.ts` formatter exposes both
 * legacy `status` and canonical `visibility`/`tier`; consumers should prefer
 * the canonical fields. Drop scheduled at I.W4 SOTA cleanup after consumer
 * migration verifies no reads of `palette.status` remain.
 *
 * Idempotent: docs already carrying both `visibility` and `tier` are skipped.
 *
 * Run on host:
 *   docker compose exec -T api node -e "..." (the deploy chain or one-off CLI).
 *
 * Deletes itself after run per the value.js migration convention (preserved
 * in git history; the smoke probe at `check.ts` ensures the data shape).
 */

import type { Db } from "mongodb";
import { PALETTE_VISIBILITIES, PALETTE_TIERS } from "../models.js";
import type { PaletteVisibility, PaletteTier } from "../models.js";

interface StatusMapping {
    visibility: PaletteVisibility;
    tier: PaletteTier;
}

const STATUS_MAP: Record<string, StatusMapping> = {
    published: { visibility: "public", tier: "standard" },
    featured: { visibility: "public", tier: "featured" },
    hidden: { visibility: "unlisted", tier: "standard" },
    draft: { visibility: "private", tier: "standard" },
};

export interface MigrationResult {
    inspected: number;
    updated: number;
    skipped: number;
    unmapped: Array<{ slug: string; status: unknown }>;
}

export async function migrateVisibilityTier(db: Db): Promise<MigrationResult> {
    const palettes = db.collection("palettes");
    const cursor = palettes.find({}, { projection: { slug: 1, status: 1, visibility: 1, tier: 1 } });

    let inspected = 0;
    let updated = 0;
    let skipped = 0;
    const unmapped: Array<{ slug: string; status: unknown }> = [];

    for await (const doc of cursor) {
        inspected++;
        const d = doc as Record<string, unknown>;
        const slug = String(d.slug);
        const status = d.status;
        const existingVisibility = d.visibility;
        const existingTier = d.tier;

        // Idempotent skip: already migrated.
        if (
            typeof existingVisibility === "string" &&
            PALETTE_VISIBILITIES.includes(existingVisibility as PaletteVisibility) &&
            typeof existingTier === "string" &&
            PALETTE_TIERS.includes(existingTier as PaletteTier)
        ) {
            skipped++;
            continue;
        }

        const mapping = typeof status === "string" ? STATUS_MAP[status] : undefined;
        if (!mapping) {
            unmapped.push({ slug, status });
            continue;
        }

        await palettes.updateOne(
            { slug },
            { $set: { visibility: mapping.visibility, tier: mapping.tier } },
        );
        updated++;
    }

    return { inspected, updated, skipped, unmapped };
}

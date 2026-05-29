/**
 * Admin palettes service — palette moderation by admins.
 *
 * Owns:
 *   - POST /admin/palettes/:slug/feature  (toggle featured/published status)
 *   - DELETE /admin/palettes/:slug        (delete palette + cascade votes/flags)
 *
 * All admin actions emit a typed audit event via `emitAuditEvent`.
 */

import type { Context } from "hono";
import type { AppEnv } from "../../types.js";
import { NotFoundError } from "../../errors/index.js";
import { emitAuditEvent } from "../../events/auditLog.js";
import type { PaletteStatus, PaletteTier } from "../../models.js";

export interface FeatureToggleResult {
    slug: string;
    status: PaletteStatus;
    tier: PaletteTier;
}

export async function toggleFeature(
    c: Context<AppEnv>,
    slug: string,
): Promise<FeatureToggleResult> {
    const { palettes } = c.var.services.repositories;
    const palette = await palettes.findBySlug(slug);
    if (!palette) {
        throw new NotFoundError("Palette not found");
    }
    // I.W1 dual-write: tier is the canonical field; status is computed for
    // backward-compat. The (visibility, tier) state-machine has 9 tuples;
    // toggleFeature only swaps tier between "standard" and "featured" within
    // visibility="public". I.W3 will replace this with an idempotent setter
    // (POST /palettes/{slug}/feature { featured: true|false }).
    const newTier: PaletteTier = palette.tier === "featured" ? "standard" : "featured";
    const newStatus: PaletteStatus = newTier === "featured" ? "featured" : "published";

    await palettes.update(slug, {
        $set: { tier: newTier, status: newStatus, updatedAt: new Date() },
    });
    await emitAuditEvent(c, "feature-toggle", {
        target: `slug=${slug} tier=${newTier} status=${newStatus}`,
    });
    return { slug, status: newStatus, tier: newTier };
}

export async function deletePalette(c: Context<AppEnv>, slug: string): Promise<void> {
    const services = c.var.services;
    const { palettes } = services.repositories;
    // I.W2: admin delete is now soft (sets deletedAt). The reaper cron
    // hard-deletes after the grace window (default 30 days). This matches the
    // user-facing /palettes/{slug} DELETE shape — admin and user converge on
    // the soft-delete model; restoration is uniform.
    const palette = await palettes.findBySlug(slug);
    if (!palette) {
        throw new NotFoundError("Palette not found");
    }
    const now = new Date();
    await services.withTransaction(async (session) => {
        await palettes.update(
            slug,
            { $set: { deletedAt: now, updatedAt: now } },
            session,
        );
        if (palette.forkOf) {
            await palettes.decrementForkCount(palette.forkOf, session);
        }
    });
    await emitAuditEvent(c, "delete-palette", { target: `slug=${slug}` });
}

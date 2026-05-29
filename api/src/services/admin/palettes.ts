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

/**
 * I.W3 idempotent featured setter (CRUD-CONTRACT v2.0.0 §8). Replaces the
 * pre-I.W3 toggle: `POST /palettes/{slug}/feature` with body `{ featured }`.
 * Re-posting the same body returns 200 with no state change (idempotent);
 * an audit row is emitted per call (the operator intent is logged even when
 * the state-update is a no-op, so admin coordination is auditable).
 */
export async function setFeatured(
    c: Context<AppEnv>,
    slug: string,
    featured: boolean,
): Promise<FeatureToggleResult> {
    const { palettes } = c.var.services.repositories;
    const palette = await palettes.findBySlug(slug);
    if (!palette) {
        throw new NotFoundError("Palette not found");
    }
    const newTier: PaletteTier = featured ? "featured" : "standard";
    const newStatus: PaletteStatus = featured ? "featured" : "published";

    // Idempotent: only write if state changes. Audit row STILL fires (the
    // operator decision is recorded regardless of state delta).
    if (palette.tier !== newTier) {
        await palettes.update(slug, {
            $set: { tier: newTier, status: newStatus, updatedAt: new Date() },
        });
    }
    await emitAuditEvent(c, "set-featured", {
        target: `slug=${slug} featured=${featured} tier=${newTier} status=${newStatus}`,
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

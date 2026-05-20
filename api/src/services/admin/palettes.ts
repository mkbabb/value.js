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
import type { PaletteStatus } from "../../models.js";

export interface FeatureToggleResult {
    slug: string;
    status: PaletteStatus;
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
    const newStatus: PaletteStatus =
        palette.status === "featured" ? "published" : "featured";

    await palettes.update(slug, { $set: { status: newStatus, updatedAt: new Date() } });
    await emitAuditEvent(c, "feature-toggle", { target: `slug=${slug} status=${newStatus}` });
    return { slug, status: newStatus };
}

export async function deletePalette(c: Context<AppEnv>, slug: string): Promise<void> {
    const { palettes, votes, flags } = c.var.services.repositories;
    const deleted = await palettes.delete(slug);
    if (deleted === 0) {
        throw new NotFoundError("Palette not found");
    }
    await votes.deleteByPaletteSlug(slug);
    await flags.deleteByPaletteSlug(slug);
    await emitAuditEvent(c, "delete-palette", { target: `slug=${slug}` });
}

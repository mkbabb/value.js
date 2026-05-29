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
    const { palettes, votes, flags } = services.repositories;
    // Cascade inside a single transaction (H.W1 Lane A.2 — H1 invariant). All-
    // or-nothing: a partial failure (transient driver error, write-concern
    // timeout) must not leave orphaned vote/flag rows pointing at a deleted
    // palette. Mirrors the user-facing `palette/crud.ts:deletePalette` wrap
    // (G.W3 Lane E). The post-txn `emitAuditEvent` stays befitting-graceful
    // per the D3 carve-out — `events/auditLog.ts` traps + logs failures
    // without rolling back the real admin action.
    await services.withTransaction(async (session) => {
        const deleted = await palettes.delete(slug, session);
        if (deleted === 0) {
            throw new NotFoundError("Palette not found");
        }
        await votes.deleteByPaletteSlug(slug, session);
        await flags.deleteByPaletteSlug(slug, session);
    });
    await emitAuditEvent(c, "delete-palette", { target: `slug=${slug}` });
}

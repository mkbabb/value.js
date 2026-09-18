/**
 * Admin palettes service — palette moderation by admins.
 *
 * Owns:
 *   - POST /admin/palettes/:slug/feature  (idempotent featured/standard tier set)
 *   - DELETE /admin/palettes/:slug        (SOFT delete — sets `deletedAt`, and
 *                                          decrements the parent's `forkCount`
 *                                          when the row is itself a fork)
 *
 * X-W3 · fold S-10 — the docstring truth obligation. The DELETE line above read
 * "delete palette + cascade votes/flags" and the body cascaded NEITHER: it is a
 * soft delete, and `repository/flag.ts`'s `deleteByPaletteSlug(slug, session)`
 * has no caller anywhere. The record binds the correction to whichever wave
 * touches the file; this is that wave. Nothing about the cascade is implemented
 * here — the SENTENCE is corrected to what the code does, not the code bent to
 * an unbuilt promise.
 *
 * Every operation enters through `authorizeAdminPaletteOp` (`admin/policy.ts`),
 * which composes the class-1 read predicate and names the branch it took; every
 * operation emits a typed audit event carrying that branch (G-17, class 9).
 */

import type { Services } from "../../../platform/http/inject-services.js";
import { emitAuditEvent } from "../audit-log.js";
import type { PaletteTier } from "../../palette/model.js";
import {
    adminPolicyPayload,
    authorizeAdminPaletteOp,
    describeAdminPolicy,
} from "../policy.js";

export interface FeatureToggleResult {
    slug: string;
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
    services: Services,
    actorSlug: string | undefined,
    slug: string,
    featured: boolean,
): Promise<FeatureToggleResult> {
    const { palette, branch } = await authorizeAdminPaletteOp(services, slug);
    const newTier: PaletteTier = featured ? "featured" : "standard";

    // Idempotent: only write if state changes. Audit row STILL fires (the
    // operator decision is recorded regardless of state delta).
    if (palette.tier !== newTier) {
        await services.repositories.palettes.update(slug, {
            $set: { tier: newTier, updatedAt: new Date() },
        });
    }
    await emitAuditEvent(services, actorSlug, "set-featured", {
        target: `slug=${slug} featured=${featured} tier=${newTier} ${describeAdminPolicy(branch)}`,
        payload: adminPolicyPayload(branch),
    });
    return { slug, tier: newTier };
}

export async function deletePalette(
    services: Services,
    actorSlug: string | undefined,
    slug: string,
): Promise<void> {
    // I.W2: admin delete is now soft (sets deletedAt). The reaper cron
    // hard-deletes after the grace window (default 30 days). This matches the
    // user-facing /palettes/{slug} DELETE shape — admin and user converge on
    // the soft-delete model; restoration is uniform.
    //
    // An already-trashed row is NOT readable to the public, so a second delete
    // audits as `admin-override` — which is the truth, and exactly the kind of
    // repeat reach the branch exists to make legible.
    const { palette, branch } = await authorizeAdminPaletteOp(services, slug);
    const { palettes } = services.repositories;
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
    await emitAuditEvent(services, actorSlug, "delete-palette", {
        target: `slug=${slug} ${describeAdminPolicy(branch)}`,
        payload: adminPolicyPayload(branch),
    });
}

/**
 * Admin batch service — bulk palette + user operations.
 *
 * Owns:
 *   - POST /admin/batch/palettes  (delete | feature | unfeature)
 *   - POST /admin/batch/users     (delete | suspend | unsuspend)
 *
 * Emits ONE audit event per batch call (not per-row) — matches the legacy
 * route's `batch-<action>-<entity>` action naming.
 */

import type { Services } from "../../middleware/inject-services.js";
import { emitAuditEvent } from "../../events/auditLog.js";
import { deleteUser } from "./users.js";

export type PaletteBatchAction = "delete" | "feature" | "unfeature";
export type UserBatchAction = "delete" | "suspend" | "unsuspend";

export interface BatchResult {
    processed: number;
}

export async function batchPalettes(
    services: Services,
    actorSlug: string | undefined,
    action: PaletteBatchAction,
    slugs: string[],
): Promise<BatchResult> {
    const { palettes, votes, flags } = services.repositories;
    let processed = 0;

    if (action === "delete") {
        // Batch deletion is the same orphan-shape as the singular
        // `deletePalette`, multiplied across N slugs. Wrap the three
        // cross-collection deletes in one transaction (G.W3 Lane E) so a
        // partial failure cannot leave orphaned vote/flag rows.
        processed = await services.withTransaction(async (session) => {
            const count = await palettes.deleteManyBySlugs(slugs, session);
            await votes.deleteByPaletteSlugs(slugs, session);
            await flags.deleteByPaletteSlugs(slugs, session);
            return count;
        });
    } else if (action === "feature") {
        processed = await palettes.updateManyBySlugs(slugs, {
            $set: { tier: "featured", updatedAt: new Date() },
        });
    } else {
        // unfeature — tier returns to "standard".
        processed = await palettes.updateManyBySlugs(slugs, {
            $set: { tier: "standard", updatedAt: new Date() },
        });
    }

    await emitAuditEvent(services, actorSlug, `batch-${action}-palettes`, {
        target: `count=${processed} slugs=${slugs.join(",")}`,
    });
    return { processed };
}

export async function batchUsers(
    services: Services,
    actorSlug: string | undefined,
    action: UserBatchAction,
    slugs: string[],
): Promise<BatchResult> {
    const { users, sessions } = services.repositories;
    let processed = 0;

    if (action === "delete") {
        // Each `deleteUser` is ALREADY transactional (its own cascade runs
        // inside `withTransaction`); the per-row loop deliberately stays
        // outside a wrapping transaction so one bad row doesn't roll back
        // the entire batch (G-AUDIT-6 §1.4).
        for (const slug of slugs) {
            const result = await deleteUser(services, actorSlug, slug, {
                throwIfMissing: false,
                emit: false,
            });
            if (result !== null) processed++;
        }
    } else if (action === "suspend") {
        // Suspend is a cross-collection write: flip user status AND
        // invalidate the cascading sessions in one transaction (G.W3 Lane
        // E). A partial failure must not leave a suspended user with a
        // still-active session token.
        processed = await services.withTransaction(async (session) => {
            const count = await users.setStatusForSlugs(
                slugs,
                "suspended",
                session,
            );
            await sessions.deleteByUserSlugs(slugs, session);
            return count;
        });
    } else {
        // unsuspend
        processed = await users.setStatusForSlugs(slugs, "active");
    }

    await emitAuditEvent(services, actorSlug, `batch-${action}-users`, {
        target: `count=${processed} slugs=${slugs.join(",")}`,
    });
    return { processed };
}

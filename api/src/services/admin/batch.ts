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

import type { Context } from "hono";
import type { AppEnv } from "../../types.js";
import { emitAuditEvent } from "../../events/auditLog.js";
import { deleteUser } from "./users.js";

export type PaletteBatchAction = "delete" | "feature" | "unfeature";
export type UserBatchAction = "delete" | "suspend" | "unsuspend";

export interface BatchResult {
    processed: number;
}

export async function batchPalettes(
    c: Context<AppEnv>,
    action: PaletteBatchAction,
    slugs: string[],
): Promise<BatchResult> {
    const { palettes, votes, flags } = c.var.services.repositories;
    let processed = 0;

    if (action === "delete") {
        processed = await palettes.deleteManyBySlugs(slugs);
        await votes.deleteByPaletteSlugs(slugs);
        await flags.deleteByPaletteSlugs(slugs);
    } else if (action === "feature") {
        processed = await palettes.updateManyBySlugs(slugs, {
            $set: { status: "featured", updatedAt: new Date() },
        });
    } else {
        // unfeature
        processed = await palettes.updateManyBySlugs(slugs, {
            $set: { status: "published", updatedAt: new Date() },
        });
    }

    await emitAuditEvent(c, `batch-${action}-palettes`, {
        target: `count=${processed} slugs=${slugs.join(",")}`,
    });
    return { processed };
}

export async function batchUsers(
    c: Context<AppEnv>,
    action: UserBatchAction,
    slugs: string[],
): Promise<BatchResult> {
    const { users, sessions } = c.var.services.repositories;
    let processed = 0;

    if (action === "delete") {
        for (const slug of slugs) {
            const result = await deleteUser(c, slug, {
                throwIfMissing: false,
                emit: false,
            });
            if (result !== null) processed++;
        }
    } else if (action === "suspend") {
        processed = await users.setStatusForSlugs(slugs, "suspended");
        await sessions.deleteByUserSlugs(slugs);
    } else {
        // unsuspend
        processed = await users.setStatusForSlugs(slugs, "active");
    }

    await emitAuditEvent(c, `batch-${action}-users`, {
        target: `count=${processed} slugs=${slugs.join(",")}`,
    });
    return { processed };
}

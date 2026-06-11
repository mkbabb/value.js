/**
 * Admin flagged service — list flagged palettes + dismiss flags.
 *
 * Owns:
 *   - GET /admin/flagged                  (group flags by palette, paginate)
 *   - DELETE /admin/flags/:paletteSlug    (dismiss all flags for a palette)
 *
 * Emits an audit event on dismissal (the list is a read — no audit).
 */

import type { Context } from "hono";
import type { AppEnv } from "../../types.js";
import { emitAuditEvent } from "../../events/auditLog.js";
import type { FlaggedPalette } from "../../repositories/flag.js";

export interface FlaggedListPage {
    data: FlaggedPalette[];
    total: number;
    limit: number;
    offset: number;
}

export async function listFlagged(
    c: Context<AppEnv>,
    limit: number,
    offset: number,
): Promise<FlaggedListPage> {
    const { flags } = c.var.services.repositories;
    const [data, total] = await Promise.all([
        flags.aggregateFlaggedPalettes(offset, limit),
        flags.countDistinctPalettes(),
    ]);
    return { data, total, limit, offset };
}

export interface DismissResult {
    dismissed: number;
}

export async function dismissFlags(
    c: Context<AppEnv>,
    paletteSlug: string,
): Promise<DismissResult> {
    const { flags } = c.var.services.repositories;
    const dismissed = await flags.deleteByPaletteSlug(paletteSlug);
    await emitAuditEvent(c, "dismiss-flags", {
        target: `paletteSlug=${paletteSlug} count=${dismissed}`,
    });
    return { dismissed };
}

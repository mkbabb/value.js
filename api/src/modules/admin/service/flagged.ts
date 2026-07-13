/**
 * Admin flagged service — list flagged palettes + dismiss flags.
 *
 * Owns:
 *   - GET /admin/flagged                  (group flags by palette, paginate)
 *   - DELETE /admin/flags/:paletteSlug    (dismiss all flags for a palette)
 *
 * Emits an audit event on dismissal (the list is a read — no audit).
 */

import type { Services } from "../../../platform/http/inject-services.js";
import { emitAuditEvent } from "../audit-log.js";
import type { FlaggedPalette } from "../../palette/repository/flag.js";

export interface FlaggedListPage {
    data: FlaggedPalette[];
    total: number;
    limit: number;
    offset: number;
}

export async function listFlagged(
    services: Services,
    limit: number,
    offset: number,
): Promise<FlaggedListPage> {
    const { flags } = services.repositories;
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
    services: Services,
    actorSlug: string | undefined,
    paletteSlug: string,
): Promise<DismissResult> {
    const { flags } = services.repositories;
    const dismissed = await flags.deleteByPaletteSlug(paletteSlug);
    await emitAuditEvent(services, actorSlug, "dismiss-flags", {
        target: `paletteSlug=${paletteSlug} count=${dismissed}`,
    });
    return { dismissed };
}

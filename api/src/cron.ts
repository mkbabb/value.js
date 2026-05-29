/**
 * Daily cleanup cron (3 AM UTC schedule lives in `index.ts`).
 *
 * E.W2 Lane A — migrated from raw `db.collection(...)` calls to the
 * repository surface. The cron handler has no Hono `Context`, so it pulls
 * the cached `Services` via the same lazy factory `injectServices` uses
 * (`middleware/inject-services.ts:getServices`). This keeps one DI graph
 * across the request-scoped + scheduled-task surfaces.
 *
 * Sweeps performed:
 *   1. Expired sessions     — `sessions.expiresAt < now`.
 *   2. Stale sessions       — `sessions.lastSeenAt < now − 30d`.
 *   3. Orphaned vote rows   — votes whose `paletteSlug` no longer exists.
 *   4. I.W2 reaper          — palettes with `deletedAt < now − GRACE` get
 *                             hard-deleted (cascade votes/flags).
 */

import { getServices } from "./middleware/inject-services.js";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
/** I.W2 grace window. Default 30 days; overridable via `PALETTE_GRACE_MS` env. */
const PALETTE_GRACE_MS = process.env.PALETTE_GRACE_MS
    ? Number(process.env.PALETTE_GRACE_MS)
    : THIRTY_DAYS_MS;

export async function cleanup(): Promise<void> {
    const services = await getServices();
    const { sessions, palettes, votes, flags } = services.repositories;
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - THIRTY_DAYS_MS);
    const graceCutoff = new Date(now.getTime() - PALETTE_GRACE_MS);

    const expiredCount = await sessions.deleteExpired(now);
    const staleCount = await sessions.deleteStale(thirtyDaysAgo);

    // I.W2 reaper: hard-delete palettes whose grace window has expired. The
    // findPastGrace + transactional hard-delete (with cascade votes/flags) is
    // the same shape as the original synchronous deletePalette pre-I.W2.
    const expired = await palettes.findPastGrace(graceCutoff);
    let reaped = 0;
    for (const palette of expired) {
        await services.withTransaction(async (session) => {
            await palettes.delete(palette.slug, session);
            await votes.deleteByPaletteSlug(palette.slug, session);
            await flags.deleteByPaletteSlug(palette.slug, session);
        });
        reaped++;
    }

    const paletteSlugs = await palettes.listAllSlugs();
    const orphanedVotes = await votes.deleteOrphaned(paletteSlugs);

    console.log(
        `[cron] Cleanup: removed ${expiredCount} expired + ${staleCount} stale sessions, ${reaped} grace-expired palettes, ${orphanedVotes} orphaned votes`,
    );
}

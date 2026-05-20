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
 */

import { getServices } from "./middleware/inject-services.js";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export async function cleanup(): Promise<void> {
    const { sessions, palettes, votes } = (await getServices()).repositories;
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - THIRTY_DAYS_MS);

    const expiredCount = await sessions.deleteExpired(now);
    const staleCount = await sessions.deleteStale(thirtyDaysAgo);

    const paletteSlugs = await palettes.listAllSlugs();
    const orphanedVotes = await votes.deleteOrphaned(paletteSlugs);

    console.log(
        `[cron] Cleanup: removed ${expiredCount} expired + ${staleCount} stale sessions, ${orphanedVotes} orphaned votes`,
    );
}

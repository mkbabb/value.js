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
 *   1. I.W2 reaper          — palettes with `deletedAt < now − GRACE` get
 *                             hard-deleted (cascade votes/flags).
 *   2. Orphaned vote rows   — votes whose `paletteSlug` no longer exists AND
 *                             that predate the sweep snapshot (TOCTOU-safe).
 *
 * Session expiry is NOT swept here: the `sessions.expiresAt` TTL index
 * (`db.ts`, `expireAfterSeconds: 0`) reaps each session at its 30-day mint
 * horizon — this is CRUD-CONTRACT §6's "the cron hard-deletes sessions where
 * expires_at < now()", discharged by the DB engine (N.W3.C/I).
 */

import { getServices } from "./platform/http/inject-services.js";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
/** I.W2 grace window. Default 30 days; overridable via `PALETTE_GRACE_MS` env. */
const PALETTE_GRACE_MS = process.env.PALETTE_GRACE_MS
    ? Number(process.env.PALETTE_GRACE_MS)
    : THIRTY_DAYS_MS;

export async function cleanup(): Promise<void> {
    const services = await getServices();
    const { palettes, votes, flags } = services.repositories;
    // `sweepStart` is captured BEFORE any read so the orphan-vote `$nin`
    // snapshot and its `createdAt < sweepStart` boundary are mutually
    // consistent: a palette (and its votes) created after this instant is
    // absent from `listAllSlugs()` but its votes also fall outside the
    // `createdAt < sweepStart` window, so they are never reaped as orphaned.
    const sweepStart = new Date();
    const graceCutoff = new Date(sweepStart.getTime() - PALETTE_GRACE_MS);

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
    const orphanedVotes = await votes.deleteOrphaned(paletteSlugs, sweepStart);

    console.log(
        `[cron] Cleanup: removed ${reaped} grace-expired palettes, ${orphanedVotes} orphaned votes`,
    );
}

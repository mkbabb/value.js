import { getDb } from "./db.js";

export async function cleanup(): Promise<void> {
    const db = await getDb();
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Remove expired sessions (by expiresAt)
    const expiredResult = await db
        .collection("sessions")
        .deleteMany({ expiresAt: { $lt: now } });

    // Remove stale sessions (not seen in 30 days, for pre-expiry sessions)
    const staleResult = await db
        .collection("sessions")
        .deleteMany({ lastSeenAt: { $lt: thirtyDaysAgo } });

    // Remove orphaned votes (palette no longer exists)
    const paletteSlugs = await db
        .collection("palettes")
        .distinct("slug");
    const voteResult = await db
        .collection("votes")
        .deleteMany({ paletteSlug: { $nin: paletteSlugs } });

    console.log(
        `[cron] Cleanup: removed ${expiredResult.deletedCount} expired + ${staleResult.deletedCount} stale sessions, ${voteResult.deletedCount} orphaned votes`,
    );
}

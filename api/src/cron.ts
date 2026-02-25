import { getDb } from "./db.js";

/**
 * Cleanup stale sessions (not seen in 30 days)
 * and orphaned votes from deleted palettes.
 */
export async function cleanup(): Promise<void> {
    const db = await getDb();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Remove stale sessions
    const sessionResult = await db
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
        `[cron] Cleanup: removed ${sessionResult.deletedCount} stale sessions, ${voteResult.deletedCount} orphaned votes`,
    );
}

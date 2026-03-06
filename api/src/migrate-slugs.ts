/**
 * One-time migration: assign user slugs to existing sessions and palettes.
 *
 * Usage: npx tsx src/migrate-slugs.ts
 *
 * Idempotent: skips sessions that already have a userSlug.
 */
import "dotenv/config";
import { getDb, closeDb } from "./db.js";
import { generateUniqueSlug } from "./slugWords.js";

async function migrate() {
    const db = await getDb();

    // Find all distinct sessionTokens from palettes
    const sessionTokens: string[] = await db
        .collection("palettes")
        .distinct("sessionToken");

    console.log(`Found ${sessionTokens.length} distinct session tokens in palettes`);

    let created = 0;
    let skipped = 0;

    for (const token of sessionTokens) {
        if (!token) {
            skipped++;
            continue;
        }

        // Check if session already has a userSlug
        const session = await db.collection("sessions").findOne({ _id: token as any });
        if (session?.userSlug) {
            skipped++;
            continue;
        }

        // Generate unique slug and create user
        const slug = await generateUniqueSlug(db);
        const now = new Date();

        await db.collection("users").insertOne({
            _id: slug as any,
            createdAt: session?.createdAt ?? now,
            lastSeenAt: session?.lastSeenAt ?? now,
        });

        // Update session with userSlug
        if (session) {
            await db.collection("sessions").updateOne(
                { _id: token as any },
                { $set: { userSlug: slug } },
            );
        }

        // Update all palettes with this sessionToken
        await db.collection("palettes").updateMany(
            { sessionToken: token, userSlug: { $exists: false } },
            { $set: { userSlug: slug } },
        );

        created++;
        console.log(`  ${token.slice(0, 8)}... → ${slug}`);
    }

    console.log(`\nDone: ${created} users created, ${skipped} skipped`);
    await closeDb();
}

migrate().catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
});

import { MongoClient, type Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
    if (db) return db;

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        if (process.env.NODE_ENV === "production") {
            throw new Error("MONGODB_URI is required in production");
        }
        console.warn("[WARN] MONGODB_URI not set, using localhost default");
    }
    client = new MongoClient(uri ?? "mongodb://localhost:27017/palette-db");
    await client.connect();
    db = client.db();

    // Create indexes (idempotent)
    await Promise.all([
        // --- palettes ---
        db.collection("palettes").createIndex({ slug: 1 }, { unique: true }),
        db.collection("palettes").createIndex({ createdAt: -1 }),
        db.collection("palettes").createIndex({ voteCount: -1, createdAt: -1 }),
        db.collection("palettes").createIndex({ status: 1 }),
        db.collection("palettes").createIndex({ userSlug: 1, createdAt: -1 }),
        db.collection("palettes").createIndex({ tags: 1 }),
        db.collection("palettes").createIndex({ forkOf: 1 }),
        db.collection("palettes").createIndex({ forkCount: -1, createdAt: -1 }),
        db.collection("palettes").createIndex(
            { name: "text" },
            { name: "palettes_text_name" },
        ),

        // --- palette_versions ---
        db.collection("palette_versions").createIndex({ paletteSlug: 1, createdAt: -1 }),
        db.collection("palette_versions").createIndex({ forkedFromHash: 1 }),
        db.collection("palette_versions").createIndex({ rootHash: 1 }),
        db.collection("palette_versions").createIndex({ authorSlug: 1, createdAt: -1 }),

        // --- votes ---
        db.collection("votes").createIndex({ userSlug: 1, paletteSlug: 1 }, { unique: true }),
        db.collection("votes").createIndex({ paletteSlug: 1 }),

        // --- sessions ---
        db.collection("sessions").createIndex({ lastSeenAt: 1 }),
        db.collection("sessions").createIndex({ expiresAt: 1 }),

        // --- proposed_names ---
        db.collection("proposed_names").createIndex({ name: 1 }, { unique: true }),
        db.collection("proposed_names").createIndex({ status: 1 }),
        db.collection("proposed_names").createIndex(
            { name: "text", css: "text" },
            { weights: { name: 10, css: 1 }, name: "proposed_names_text" },
        ),

        // --- users ---
        db.collection("users").createIndex({ createdAt: -1 }),

        // --- tags ---
        db.collection("tags").createIndex({ name: 1 }, { unique: true }),

        // --- flags ---
        db.collection("flags").createIndex(
            { paletteSlug: 1, reporterSlug: 1 },
            { unique: true },
        ),
        db.collection("flags").createIndex({ paletteSlug: 1 }),
        db.collection("flags").createIndex({ createdAt: -1 }),

        // --- admin_audit ---
        db.collection("admin_audit").createIndex({ timestamp: -1 }),
        db.collection("admin_audit").createIndex({ action: 1, timestamp: -1 }),
    ]);

    console.log("Connected to MongoDB");
    return db;
}

export async function closeDb(): Promise<void> {
    if (client) {
        await client.close();
        client = null;
        db = null;
    }
}

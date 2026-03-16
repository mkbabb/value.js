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

    // Create indexes
    await Promise.all([
        db.collection("palettes").createIndex({ slug: 1 }, { unique: true }),
        db.collection("palettes").createIndex({ createdAt: -1 }),
        db.collection("palettes").createIndex({ voteCount: -1, createdAt: -1 }),
        db.collection("palettes").createIndex({ status: 1 }),
        db.collection("palettes").createIndex({ userSlug: 1, createdAt: -1 }),
        db
            .collection("votes")
            .createIndex({ userSlug: 1, paletteSlug: 1 }, { unique: true }),
        db.collection("votes").createIndex({ paletteSlug: 1 }),
        db.collection("sessions").createIndex({ lastSeenAt: 1 }),
        db.collection("sessions").createIndex({ expiresAt: 1 }),
        db.collection("proposed_names").createIndex({ name: 1 }, { unique: true }),
        db.collection("proposed_names").createIndex({ status: 1 }),
        db.collection("users").createIndex({ createdAt: -1 }),
        db.collection("admin_audit").createIndex({ timestamp: -1 }),
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

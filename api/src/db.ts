import { MongoClient, type Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

/**
 * Internal client accessor — exposed for the transactional boundary
 * (`middleware/inject-services.ts` builds `services.withTransaction` on top
 * of this). Services should NEVER import this directly; they call
 * `services.withTransaction(fn)` instead. Returns the cached client, ensuring
 * `getDb()` has been called at least once.
 */
export async function getClient(): Promise<MongoClient> {
    if (!client) {
        // Force connect via getDb's side-effect — same lifecycle as `db`.
        await getDb();
    }
    if (!client) {
        throw new Error("MongoClient not initialised");
    }
    return client;
}

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
        // Browse compounds: every public-list query (`crud-list.ts`) fixes
        // `deletedAt: null` + `visibility: "public"` as equality predicates,
        // then ranges over the sort key (ESR: Equality, Sort, Range). The
        // three compounds below carry the equality prefix so the hottest read
        // path is a pure index scan instead of an in-memory post-filter. They
        // REPLACE the former bare `{createdAt}`/`{voteCount,createdAt}`/
        // `{forkCount,createdAt}` sort indexes (those lacked the equality
        // prefix and forced the planner to filter deletedAt/visibility in
        // memory) — net-zero index count for a strictly better shape.
        db.collection("palettes").createIndex({ deletedAt: 1, visibility: 1, createdAt: -1 }),
        db.collection("palettes").createIndex({ deletedAt: 1, visibility: 1, voteCount: -1, createdAt: -1 }),
        db.collection("palettes").createIndex({ deletedAt: 1, visibility: 1, forkCount: -1, createdAt: -1 }),
        db.collection("palettes").createIndex({ userSlug: 1, createdAt: -1 }),
        db.collection("palettes").createIndex({ tags: 1 }),
        db.collection("palettes").createIndex({ forkOf: 1 }),
        db.collection("palettes").createIndex(
            { name: "text" },
            { name: "palettes_text_name" },
        ),

        // --- palette_versions ---
        // Only `{paletteSlug, createdAt}` is read (findByPaletteSlug +
        // countByPaletteSlug; findByHash uses the implicit `_id` index). The
        // former `forkedFromHash`/`rootHash`/`authorSlug+createdAt` indexes
        // had ZERO query consumers (write-only) and were dropped (N.W3.C).
        db.collection("palette_versions").createIndex({ paletteSlug: 1, createdAt: -1 }),

        // --- votes ---
        db.collection("votes").createIndex({ userSlug: 1, paletteSlug: 1 }, { unique: true }),
        db.collection("votes").createIndex({ paletteSlug: 1 }),

        // --- sessions ---
        // TTL index: MongoDB reaps each session at its `expiresAt` horizon
        // (`expireAfterSeconds: 0` = "delete when expiresAt < now"). This IS
        // CRUD-CONTRACT §6's "the cron hard-deletes sessions where
        // expires_at < now()", discharged by the DB engine — so there is no
        // application-level session sweep in `cron.ts` (N.W3.C/I). The former
        // `{lastSeenAt}` stale-sweep index + plain `{expiresAt}` index were
        // both retired with that dead cron code.
        db.collection("sessions").createIndex(
            { expiresAt: 1 },
            { expireAfterSeconds: 0, name: "sessions_ttl_expiresAt" },
        ),

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

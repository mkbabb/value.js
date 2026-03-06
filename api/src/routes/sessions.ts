import { Hono } from "hono";
import type { AppEnv } from "../types.js";
import { getDb } from "../db.js";
import { hashIP, resolveIP, loginRateLimit } from "../middleware.js";
import { generateUniqueSlug } from "../slugWords.js";

const sessions = new Hono<AppEnv>();

// POST /sessions — register a new session + user slug
sessions.post("/", async (c) => {
    const ip = resolveIP(c);
    const ipHash = await hashIP(ip);
    const token = crypto.randomUUID();
    const now = new Date();

    const db = await getDb();

    // Generate a unique user slug
    const userSlug = await generateUniqueSlug(db);

    // Create user document
    await db.collection("users").insertOne({
        _id: userSlug as any,
        createdAt: now,
        lastSeenAt: now,
    });

    // Create session linked to user
    await db.collection("sessions").insertOne({
        // TODO(HIGH): Remove dynamic `_id` casting and enforce strict session document typing end to end.
        _id: token as any,
        ipHash,
        userSlug,
        createdAt: now,
        lastSeenAt: now,
    });

    return c.json({ token, userSlug }, 201);
});

// POST /sessions/login — log in with an existing slug
sessions.post("/login", loginRateLimit, async (c) => {
    const body = await c.req.json<{ slug: string }>();
    const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";

    if (!slug || !/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/.test(slug)) {
        // Constant delay to prevent timing attacks
        await new Promise((r) => setTimeout(r, 200));
        return c.json({ error: "Invalid slug format" }, 400);
    }

    // Reject switching to the same slug the session already owns
    const currentSlug = c.get("userSlug") as string | undefined;
    if (currentSlug && currentSlug === slug) {
        await new Promise((r) => setTimeout(r, 200));
        return c.json({ error: "Already logged in as this user" }, 409);
    }

    const db = await getDb();
    const user = await db.collection("users").findOne({ _id: slug as any });

    // Constant delay to prevent timing attacks
    await new Promise((r) => setTimeout(r, 200));

    if (!user) {
        return c.json({ error: "User not found" }, 404);
    }

    // Create a new session for this user
    const ip = resolveIP(c);
    const ipHash = await hashIP(ip);
    const token = crypto.randomUUID();
    const now = new Date();

    await db.collection("sessions").insertOne({
        _id: token as any,
        ipHash,
        userSlug: slug,
        createdAt: now,
        lastSeenAt: now,
    });

    // Update user's lastSeenAt
    await db.collection("users").updateOne(
        { _id: slug as any },
        { $set: { lastSeenAt: now } },
    );

    return c.json({ token, userSlug: slug });
});

// GET /sessions/me — get current user info
sessions.get("/me", async (c) => {
    const userSlug = c.get("userSlug") as string | undefined;
    if (!userSlug) {
        return c.json({ error: "Not authenticated" }, 401);
    }

    const db = await getDb();
    const user = await db.collection("users").findOne({ _id: userSlug as any });

    if (!user) {
        return c.json({ error: "User not found" }, 404);
    }

    return c.json({
        userSlug: user._id,
        createdAt: user.createdAt,
    });
});

export default sessions;

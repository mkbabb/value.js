import { Hono } from "hono";
import { getDb } from "../db.js";
import { hashIP } from "../middleware.js";

const sessions = new Hono();

// POST /sessions — register a new session
sessions.post("/", async (c) => {
    const ip =
        c.req.header("X-Forwarded-For")?.split(",")[0]?.trim() ??
        c.req.header("X-Real-IP") ??
        "unknown";

    const ipHash = await hashIP(ip);
    const token = crypto.randomUUID();
    const now = new Date();

    const db = await getDb();
    await db.collection("sessions").insertOne({
        _id: token as any,
        ipHash,
        createdAt: now,
        lastSeenAt: now,
    });

    return c.json({ token }, 201);
});

export default sessions;

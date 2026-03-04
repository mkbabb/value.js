import { Hono } from "hono";
import { getDb } from "../db.js";
import { hashIP, resolveIP } from "../middleware.js";

const sessions = new Hono();

// POST /sessions — register a new session
sessions.post("/", async (c) => {
    const ip = resolveIP(c);
    const ipHash = await hashIP(ip);
    const token = crypto.randomUUID();
    const now = new Date();

    const db = await getDb();
    await db.collection("sessions").insertOne({
        // TODO(HIGH): Remove dynamic `_id` casting and enforce strict session document typing end to end.
        _id: token as any,
        ipHash,
        createdAt: now,
        lastSeenAt: now,
    });

    return c.json({ token }, 201);
});

export default sessions;

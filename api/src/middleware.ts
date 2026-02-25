import { type Context, type MiddlewareHandler } from "hono";
import { getDb } from "./db.js";

// --- CORS ---

export function corsHeaders(): Record<string, string> {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Session-Token, Authorization",
    };
}

// --- Rate limiting (in-memory) ---

const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

export const rateLimit: MiddlewareHandler = async (c, next) => {
    const ip =
        c.req.header("X-Forwarded-For")?.split(",")[0]?.trim() ??
        c.req.header("X-Real-IP") ??
        "unknown";

    const now = Date.now();
    const entry = rateLimits.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    } else {
        entry.count++;
        if (entry.count > RATE_LIMIT) {
            return c.json({ error: "Rate limit exceeded" }, 429);
        }
    }

    await next();
};

// --- Session resolution ---

export const resolveSession: MiddlewareHandler = async (c, next) => {
    const token = c.req.header("X-Session-Token");
    if (token) {
        c.set("sessionToken", token);
        // Touch session lastSeenAt
        const db = await getDb();
        await db.collection("sessions").updateOne(
            { _id: token as any },
            { $set: { lastSeenAt: new Date() } },
            { upsert: false },
        );
    }
    await next();
};

// --- Admin auth ---

export const adminAuth: MiddlewareHandler = async (c, next) => {
    const auth = c.req.header("Authorization");
    const token = process.env.ADMIN_TOKEN;

    if (!token || auth !== `Bearer ${token}`) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    await next();
};

// --- IP hashing ---

export async function hashIP(ip: string): Promise<string> {
    const data = new TextEncoder().encode(ip);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

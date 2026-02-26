import crypto from "node:crypto";
import { type Context, type MiddlewareHandler } from "hono";
import { getDb } from "./db.js";

// --- CORS ---

export function corsHeaders(origin?: string): Record<string, string> {
    return {
        "Access-Control-Allow-Origin": origin ?? "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Session-Token, Authorization",
    };
}

// --- IP resolution ---

export function resolveIP(c: Context): string {
    // Use rightmost X-Forwarded-For entry (proxy-appended, not client-supplied),
    // then fall back to X-Real-IP (set by Apache), then "unknown".
    return (
        c.req.header("X-Forwarded-For")?.split(",").at(-1)?.trim() ??
        c.req.header("X-Real-IP") ??
        "unknown"
    );
}

// --- Rate limiting (in-memory, per-method tiers) ---

const RATE_MAP_CAP = 50_000;
const CLEANUP_INTERVAL_MS = 60_000;

interface RateEntry {
    count: number;
    resetAt: number;
}

function createRateLimiter(limit: number, windowMs: number): {
    map: Map<string, RateEntry>;
    check(ip: string): boolean; // true = allowed
} {
    const map = new Map<string, RateEntry>();
    return {
        map,
        check(ip: string): boolean {
            const now = Date.now();
            const entry = map.get(ip);

            if (!entry || now > entry.resetAt) {
                map.set(ip, { count: 1, resetAt: now + windowMs });
                return true;
            }
            entry.count++;
            return entry.count <= limit;
        },
    };
}

const readLimiter = createRateLimiter(60, 60_000);   // 60 req/min for GETs
const writeLimiter = createRateLimiter(10, 60_000);   // 10 req/min for POST/PATCH/DELETE

// Sweep expired entries every 60s
setInterval(() => {
    const now = Date.now();
    for (const limiter of [readLimiter, writeLimiter]) {
        for (const [key, entry] of limiter.map) {
            if (now > entry.resetAt) {
                limiter.map.delete(key);
            }
        }
    }
}, CLEANUP_INTERVAL_MS);

export const rateLimit: MiddlewareHandler = async (c, next) => {
    const ip = resolveIP(c);
    const method = c.req.method;
    const limiter = method === "GET" || method === "HEAD" ? readLimiter : writeLimiter;

    // Cap map size — reject if too many tracked IPs
    if (!limiter.map.has(ip) && limiter.map.size >= RATE_MAP_CAP) {
        return c.json({ error: "Rate limit exceeded" }, 429);
    }

    if (!limiter.check(ip)) {
        return c.json({ error: "Rate limit exceeded" }, 429);
    }

    await next();
};

// --- Session resolution ---

export const resolveSession: MiddlewareHandler = async (c, next) => {
    const token = c.req.header("X-Session-Token");
    if (token && c.req.path !== "/") {
        // Validate token against DB; only trust if it actually exists
        const db = await getDb();
        const session = await db.collection("sessions").findOneAndUpdate(
            { _id: token as any },
            { $set: { lastSeenAt: new Date() } },
            { returnDocument: "after" },
        );
        if (session) {
            c.set("sessionToken", token);
        }
    }
    await next();
};

// --- Admin auth ---

export const adminAuth: MiddlewareHandler = async (c, next) => {
    const auth = c.req.header("Authorization");
    const token = process.env.ADMIN_TOKEN;

    if (!token || !auth) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    const expected = `Bearer ${token}`;

    // Length-constant comparison to prevent timing attacks
    if (auth.length !== expected.length) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    const authBuf = Buffer.from(auth);
    const expectedBuf = Buffer.from(expected);
    if (!crypto.timingSafeEqual(authBuf, expectedBuf)) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    await next();
};

// --- IP hashing ---

export async function hashIP(ip: string): Promise<string> {
    const data = new TextEncoder().encode(ip);
    const hash = await globalThis.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

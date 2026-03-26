import crypto from "node:crypto";
import { type Context, type MiddlewareHandler } from "hono";
import { getDb } from "./db.js";

// --- CORS ---

const ALLOWED_ORIGINS = new Set(
    (process.env.ALLOWED_ORIGINS ?? "").split(",").map(s => s.trim()).filter(Boolean)
);

export function corsHeaders(requestOrigin?: string): Record<string, string> {
    // If no allowlist configured, reflect the request origin (open CORS).
    // With an allowlist, only allowed origins get reflected; others get the first allowed origin.
    const origin = ALLOWED_ORIGINS.size === 0
        ? (requestOrigin ?? "*")
        : (requestOrigin && ALLOWED_ORIGINS.has(requestOrigin))
            ? requestOrigin
            : ALLOWED_ORIGINS.values().next().value ?? "";
    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Session-Token, Authorization",
        "Access-Control-Allow-Credentials": "true",
    };
}

// --- IP resolution ---

export function resolveIP(c: Context): string {
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

function createRateLimiter(
    limit: number,
    windowMs: number,
): {
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

const readLimiter = createRateLimiter(60, 60_000); // 60 req/min for GETs
const writeLimiter = createRateLimiter(10, 60_000); // 10 req/min for POST/PATCH/DELETE

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

    // Cap map size — LRU eviction of oldest expired entry before rejecting
    if (!limiter.map.has(ip) && limiter.map.size >= RATE_MAP_CAP) {
        const now = Date.now();
        let evicted = false;
        for (const [key, entry] of limiter.map) {
            if (now > entry.resetAt) {
                limiter.map.delete(key);
                evicted = true;
                break;
            }
        }
        if (!evicted) {
            return c.json({ error: "Rate limit exceeded" }, 429);
        }
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
        const db = await getDb();
        const session = await db
            .collection("sessions")
            .findOneAndUpdate(
                { _id: token as any, expiresAt: { $gt: new Date() } },
                { $set: { lastSeenAt: new Date() } },
                { returnDocument: "after" },
            );
        if (session) {
            c.set("sessionToken", token);
            if (session.userSlug) {
                c.set("userSlug", session.userSlug);
            }
        }
        // Stale/expired tokens: proceed without session context.
        // Route handlers that require auth check c.get("sessionToken") themselves.
    }
    await next();
};

// --- Login rate limiting (stricter: 5 req/min per IP) ---

const loginLimiter = createRateLimiter(5, 60_000);

export const loginRateLimit: MiddlewareHandler = async (c, next) => {
    const ip = resolveIP(c);
    if (!loginLimiter.map.has(ip) && loginLimiter.map.size >= RATE_MAP_CAP) {
        const now = Date.now();
        let evicted = false;
        for (const [key, entry] of loginLimiter.map) {
            if (now > entry.resetAt) {
                loginLimiter.map.delete(key);
                evicted = true;
                break;
            }
        }
        if (!evicted) {
            return c.json({ error: "Rate limit exceeded" }, 429);
        }
    }
    if (!loginLimiter.check(ip)) {
        return c.json({ error: "Rate limit exceeded" }, 429);
    }
    await next();
};

// --- Admin auth ---

export const adminAuth: MiddlewareHandler = async (c, next) => {
    const token = process.env.ADMIN_TOKEN;
    if (!token) {
        return c.json({ error: "Admin not configured" }, 503);
    }
    const auth = c.req.header("Authorization");
    if (!auth) {
        return c.json({ error: "Unauthorized" }, 401);
    }
    const expected = `Bearer ${token}`;
    if (auth.length !== expected.length) {
        return c.json({ error: "Forbidden" }, 403);
    }
    const authBuf = Buffer.from(auth);
    const expectedBuf = Buffer.from(expected);
    if (!crypto.timingSafeEqual(authBuf, expectedBuf)) {
        return c.json({ error: "Forbidden" }, 403);
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

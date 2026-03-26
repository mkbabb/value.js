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

/**
 * Resolve client IP from trusted proxy headers.
 * Only trusts X-Forwarded-For when the request arrives from the local reverse proxy (127.0.0.1).
 * Falls back to X-Real-IP (set by Apache), then to the raw connection address.
 */
export function resolveIP(c: Context): string {
    // In Docker, the API receives connections from Apache on localhost.
    // Only trust proxy headers from the local machine.
    const remoteAddr =
        c.env?.incoming?.socket?.remoteAddress ?? // @hono/node-server exposes this
        "unknown";
    const isFromTrustedProxy =
        remoteAddr === "127.0.0.1" ||
        remoteAddr === "::1" ||
        remoteAddr === "::ffff:127.0.0.1";

    if (isFromTrustedProxy) {
        return (
            c.req.header("X-Forwarded-For")?.split(",").at(-1)?.trim() ??
            c.req.header("X-Real-IP") ??
            remoteAddr
        );
    }

    // Untrusted: ignore proxy headers, use the direct connection IP
    return remoteAddr;
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
const registrationLimiter = createRateLimiter(3, 60_000); // 3 req/min for registration

// Sweep expired entries every 60s
setInterval(() => {
    const now = Date.now();
    for (const limiter of [readLimiter, writeLimiter, registrationLimiter, loginLimiter]) {
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

// In-memory cache of suspended user slugs (60s TTL)
const suspendedCache = new Map<string, number>(); // slug → expiresAt timestamp

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
                // Check if user is suspended (with cache)
                const now = Date.now();
                const cachedExpiry = suspendedCache.get(session.userSlug);
                let isSuspended = false;

                if (cachedExpiry && cachedExpiry > now) {
                    isSuspended = true;
                } else {
                    // Cache miss or expired — check DB
                    const user = await db.collection("users").findOne({ _id: session.userSlug as any });
                    if (user?.status === "suspended") {
                        suspendedCache.set(session.userSlug, now + 60_000); // 60s TTL
                        isSuspended = true;
                    } else {
                        suspendedCache.delete(session.userSlug);
                    }
                }

                if (isSuspended) {
                    return c.json({ error: "Account suspended" }, 403);
                }

                c.set("userSlug", session.userSlug);
            }
        }
    }
    await next();
};

// --- Registration rate limiting (3 req/min per IP) ---

export const registrationRateLimit: MiddlewareHandler = async (c, next) => {
    const ip = resolveIP(c);
    if (!registrationLimiter.map.has(ip) && registrationLimiter.map.size >= RATE_MAP_CAP) {
        const now = Date.now();
        let evicted = false;
        for (const [key, entry] of registrationLimiter.map) {
            if (now > entry.resetAt) {
                registrationLimiter.map.delete(key);
                evicted = true;
                break;
            }
        }
        if (!evicted) {
            return c.json({ error: "Rate limit exceeded" }, 429);
        }
    }
    if (!registrationLimiter.check(ip)) {
        return c.json({ error: "Rate limit exceeded" }, 429);
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

// --- MongoDB operator injection guard ---

/** Recursively check for keys starting with $ in parsed JSON body. */
function hasDollarKeys(obj: unknown): boolean {
    if (obj === null || typeof obj !== "object") return false;
    if (Array.isArray(obj)) return obj.some(hasDollarKeys);
    for (const key of Object.keys(obj as Record<string, unknown>)) {
        if (key.startsWith("$")) return true;
        if (hasDollarKeys((obj as Record<string, unknown>)[key])) return true;
    }
    return false;
}

/**
 * Reject JSON request bodies containing keys starting with `$`.
 * Prevents MongoDB operator injection (e.g., `{ "$gt": "" }` in query fields).
 */
export const sanitizeBody: MiddlewareHandler = async (c, next) => {
    const method = c.req.method;
    if (method === "POST" || method === "PATCH" || method === "PUT") {
        const contentType = c.req.header("Content-Type") ?? "";
        if (contentType.includes("application/json")) {
            try {
                const body = await c.req.json();
                if (hasDollarKeys(body)) {
                    return c.json({ error: "Invalid input" }, 400);
                }
            } catch {
                // Malformed JSON — let downstream handlers deal with it
            }
        }
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

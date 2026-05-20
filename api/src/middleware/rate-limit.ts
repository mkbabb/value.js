/**
 * Per-IP rate limiting (E.W2 Lane E — extracted from the middleware god
 * module; consolidates the 3 duplicated pre-check blocks identified in
 * E-AUDIT-6 §3 / §10).
 *
 * Tiers (per `api/CLAUDE.md`):
 *   - read  — 60 req/min (GET / HEAD).
 *   - write — 10 req/min (POST / PATCH / DELETE / PUT).
 *   - registration — 3 req/min (signup endpoint).
 *   - login        — 5 req/min (login endpoint).
 *
 * All four limiters share the consolidated `cache/lru.ts` substrate (D.W2
 * Lane D — D-HARDEN-3 §1 C3) and the same eviction pre-check via
 * `enforceRateLimit`. A single module-load `setInterval` sweeps expired
 * entries across every limiter every 60 s.
 */

import { type Context, type MiddlewareHandler } from "hono";
import { LRU } from "../cache/lru.js";
import { resolveIP } from "./ip.js";

const RATE_MAP_CAP = 50_000;
const CLEANUP_INTERVAL_MS = 60_000;
const WINDOW_MS = 60_000;

interface RateEntry {
    count: number;
}

interface Limiter {
    lru: LRU<string, RateEntry>;
    check(ip: string): boolean; // true = allowed
}

function createLimiter(limit: number): Limiter {
    const lru = new LRU<string, RateEntry>(RATE_MAP_CAP, WINDOW_MS);
    return {
        lru,
        check(ip: string): boolean {
            const now = Date.now();
            const entry = lru.getEntry(ip);
            if (!entry || entry.expiresAt < now) {
                lru.setWithExpiry(ip, { count: 1 }, now + WINDOW_MS);
                return true;
            }
            entry.value.count++;
            return entry.value.count <= limit;
        },
    };
}

const readLimiter = createLimiter(60);
const writeLimiter = createLimiter(10);
const registrationLimiter = createLimiter(3);
const loginLimiter = createLimiter(5);

// Sweep expired entries across every limiter on a single cadence.
setInterval(() => {
    const now = Date.now();
    for (const l of [readLimiter, writeLimiter, registrationLimiter, loginLimiter]) {
        l.lru.sweepExpired(now);
    }
}, CLEANUP_INTERVAL_MS);

/**
 * Single-source pre-check used by every rate-limit middleware (E-AUDIT-6 §3
 * Dup-3 consolidation). Returns `null` if the request is allowed; otherwise
 * the 429 response for the caller to return.
 */
function enforceRateLimit(limiter: Limiter, c: Context): Response | null {
    const ip = resolveIP(c);
    if (!limiter.lru.has(ip) && limiter.lru.size >= RATE_MAP_CAP) {
        if (!limiter.lru.evictOne()) {
            return c.json({ error: "Rate limit exceeded" }, 429);
        }
    }
    if (!limiter.check(ip)) {
        return c.json({ error: "Rate limit exceeded" }, 429);
    }
    return null;
}

function rateLimitMiddleware(pick: (c: Context) => Limiter): MiddlewareHandler {
    return async (c, next) => {
        const denied = enforceRateLimit(pick(c), c);
        if (denied) return denied;
        await next();
    };
}

export const rateLimit: MiddlewareHandler = rateLimitMiddleware((c) =>
    c.req.method === "GET" || c.req.method === "HEAD" ? readLimiter : writeLimiter,
);
export const registrationRateLimit: MiddlewareHandler = rateLimitMiddleware(
    () => registrationLimiter,
);
export const loginRateLimit: MiddlewareHandler = rateLimitMiddleware(() => loginLimiter);

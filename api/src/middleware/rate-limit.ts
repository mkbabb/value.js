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
 * I.W4 SOTA: every response carries `RateLimit-Limit/-Remaining/-Reset`
 * response headers per IETF draft-ietf-httpapi-ratelimit-headers; 429
 * responses are problem+json per `errors/index.ts`.
 */

import { type Context, type MiddlewareHandler } from "hono";
import { LRU } from "../cache/lru.js";
import { resolveIP } from "./ip.js";
import { RateLimitError } from "../errors/index.js";

const RATE_MAP_CAP = 50_000;
const CLEANUP_INTERVAL_MS = 60_000;
const WINDOW_MS = 60_000;

interface RateEntry {
    count: number;
}

interface RateInfo {
    limit: number;
    remaining: number;
    resetSeconds: number;
}

interface Limiter {
    lru: LRU<string, RateEntry>;
    limit: number;
    check(ip: string): boolean;
    inspect(ip: string): RateInfo;
}

function createLimiter(limit: number): Limiter {
    const lru = new LRU<string, RateEntry>(RATE_MAP_CAP, WINDOW_MS);
    return {
        lru,
        limit,
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
        inspect(ip: string): RateInfo {
            const now = Date.now();
            const entry = lru.getEntry(ip);
            if (!entry || entry.expiresAt < now) {
                return { limit, remaining: limit, resetSeconds: Math.ceil(WINDOW_MS / 1000) };
            }
            return {
                limit,
                remaining: Math.max(0, limit - entry.value.count),
                resetSeconds: Math.max(0, Math.ceil((entry.expiresAt - now) / 1000)),
            };
        },
    };
}

const readLimiter = createLimiter(60);
const writeLimiter = createLimiter(10);
const registrationLimiter = createLimiter(3);
const loginLimiter = createLimiter(5);

setInterval(() => {
    const now = Date.now();
    for (const l of [readLimiter, writeLimiter, registrationLimiter, loginLimiter]) {
        l.lru.sweepExpired(now);
    }
}, CLEANUP_INTERVAL_MS);

function setRateLimitHeaders(c: Context, info: RateInfo): void {
    c.res.headers.set("RateLimit-Limit", String(info.limit));
    c.res.headers.set("RateLimit-Remaining", String(info.remaining));
    c.res.headers.set("RateLimit-Reset", String(info.resetSeconds));
}

function rateLimitMiddleware(pick: (c: Context) => Limiter): MiddlewareHandler {
    return async (c, next) => {
        const limiter = pick(c);
        const ip = resolveIP(c);
        if (!limiter.lru.has(ip) && limiter.lru.size >= RATE_MAP_CAP) {
            if (!limiter.lru.evictOne()) {
                throw new RateLimitError();
            }
        }
        if (!limiter.check(ip)) {
            // The error handler at index.ts emits the problem+json envelope;
            // we attach the RateLimit-* headers here so even the denial is
            // self-describing.
            const info = limiter.inspect(ip);
            setRateLimitHeaders(c, info);
            throw new RateLimitError();
        }
        await next();
        // I.W4: emit RateLimit-* response headers on every success.
        setRateLimitHeaders(c, limiter.inspect(ip));
    };
}

export const rateLimit: MiddlewareHandler = rateLimitMiddleware((c) =>
    c.req.method === "GET" || c.req.method === "HEAD" ? readLimiter : writeLimiter,
);
export const registrationRateLimit: MiddlewareHandler = rateLimitMiddleware(
    () => registrationLimiter,
);
export const loginRateLimit: MiddlewareHandler = rateLimitMiddleware(() => loginLimiter);

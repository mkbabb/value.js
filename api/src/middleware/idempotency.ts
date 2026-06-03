/**
 * K.W2 Idempotency-Key replay store (folded I-tail residual).
 *
 * The demo client has SENT `Idempotency-Key` on mutating requests since the
 * I-window (see `demo/@/lib/palette/api/client.ts`), but no middleware read
 * it. This closes that gap.
 *
 * Semantics (opt-in, mirroring the If-Match-required-only-on-mutations shape):
 *   - Header ABSENT  → `next()` unconditionally (opt-in).
 *   - Header PRESENT on a NON-mutating method → `next()` (only mutations replay).
 *   - Header PRESENT on POST/PATCH/PUT/DELETE:
 *       scoped key = `${sessionToken|userSlug|"anon"}:${method}:${path}:${key}`
 *       HIT  (within the 24h window) → replay the stored {status, body,
 *             content-type} VERBATIM; the handler never runs.
 *       MISS → run `next()`, then capture the response (status + body + the
 *             content-type) into the store with a 24h expiry.
 *
 * Store: the in-process `LRU` at `cache/lru.ts` — the SAME primitive
 * `rate-limit.ts` + `resolve-session.ts` use. NOT a Mongo collection: this
 * keeps the replay store bounded (FIFO + TTL eviction) and avoids a write per
 * mutation. Consequence — like rate-limit, the store is PER-PROCESS, so the
 * 24h durability is best-effort and does NOT survive a restart or span
 * replicas. That matches the existing precedent (the rate-limit window + the
 * suspended-user cache are likewise per-process) and is acceptable for an
 * idempotency guard whose job is to collapse client retries within a single
 * request burst, not to provide cross-restart exactly-once delivery.
 *
 * Error semantics: this middleware never throws on its own; a replayed response
 * is reconstructed directly. A handler that `throw`s an `ApiError` is caught by
 * Hono's dispatcher and mapped to a 4xx/5xx response by `app.onError` BEFORE
 * control returns to `await next()` here — so `c.res` is the error response, not
 * a thrown exception. We therefore capture ONLY 2xx responses: a transient
 * 409/410/503 must NOT become a sticky 24h replay (the K.W2 adversarial review
 * caught this — the prior `!== 204/304` check cached errors).
 */

import { type MiddlewareHandler } from "hono";
import { LRU } from "../cache/lru.js";

const IDEMPOTENCY_WINDOW_MS = 24 * 60 * 60 * 1000; // 24h
const IDEMPOTENCY_CAP = 50_000;

/** Methods whose responses participate in idempotent replay. */
const MUTATING_METHODS = new Set(["POST", "PATCH", "PUT", "DELETE"]);

interface StoredResponse {
    status: number;
    body: string;
    contentType: string | null;
}

const replayStore = new LRU<string, StoredResponse>(
    IDEMPOTENCY_CAP,
    IDEMPOTENCY_WINDOW_MS,
);

/**
 * Scope the client-supplied key to the caller identity + method + path so a
 * key reused across distinct operations (or by distinct sessions) never
 * cross-replays. Falls back to "anon" when no session/userSlug is resolved.
 */
function scopedKey(
    identity: string,
    method: string,
    path: string,
    idempotencyKey: string,
): string {
    return `${identity}:${method}:${path}:${idempotencyKey}`;
}

export const idempotency: MiddlewareHandler = async (c, next) => {
    const idempotencyKey = c.req.header("Idempotency-Key");

    // Opt-in: no key → never replay, never capture.
    if (!idempotencyKey || idempotencyKey.trim() === "") {
        await next();
        return;
    }

    // Only mutating methods replay; a key on a GET is ignored (no capture).
    if (!MUTATING_METHODS.has(c.req.method)) {
        await next();
        return;
    }

    const identity = c.var.sessionToken ?? c.var.userSlug ?? "anon";
    const key = scopedKey(identity, c.req.method, c.req.path, idempotencyKey);

    // HIT — replay the stored response verbatim; the handler never runs.
    const hit = replayStore.get(key);
    if (hit) {
        const headers = new Headers();
        if (hit.contentType) headers.set("Content-Type", hit.contentType);
        headers.set("Idempotency-Replayed", "true");
        return new Response(hit.body, { status: hit.status, headers });
    }

    // MISS — run the handler, then capture the produced response.
    await next();

    // Capture ONLY a successful, body-bearing response. 204/304 carry no body;
    // 4xx/5xx are error responses (Hono's onError maps a thrown ApiError to one
    // BEFORE next() returns) and must never be cached — else a transient error
    // would be replayed for the whole 24h window under that key.
    const res = c.res;
    if (res && res.status >= 200 && res.status < 300 && res.status !== 204) {
        // Clone before reading: the body stream is single-use, and the
        // original must still be deliverable to the client.
        const clone = res.clone();
        const body = await clone.text();
        replayStore.set(key, {
            status: res.status,
            body,
            contentType: res.headers.get("Content-Type"),
        });
    }
};

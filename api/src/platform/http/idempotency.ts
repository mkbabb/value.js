/**
 * K.W2 Idempotency-Key replay store (folded I-tail residual; N.W3.G body-hash).
 *
 * The demo client has SENT `Idempotency-Key` on mutating requests since the
 * I-window (see `demo/@/lib/palette/api/client.ts`), but no middleware read
 * it. This closes that gap.
 *
 * Semantics (opt-in by default; REQUIRED on the appending operations — X-W3 · G-10):
 *   - Header ABSENT on an operation in `IDEMPOTENCY_REQUIRED` (revert + fork
 *     create) → `400`, before the handler runs. Those two writes APPEND, so a
 *     retry without a key is a duplicate release / duplicate palette.
 *   - Header ABSENT anywhere else → `next()` unconditionally (opt-in).
 *   - Header PRESENT on a NON-mutating method → `next()` (only mutations replay).
 *   - Header PRESENT on POST/PATCH/PUT/DELETE:
 *       scoped key = `${sessionToken|userSlug|"anon"}:${method}:${path}:${key}`
 *       and a sha256 hash of the raw request body is recorded alongside the
 *       stored response.
 *       HIT, SAME body-hash  → replay the stored {status, body, content-type}
 *             VERBATIM; the handler never runs.
 *       HIT, DIFFERENT body-hash → 409 `urn:contract:idempotency-replay-conflict`
 *             (the CS3.2 row): an `Idempotency-Key` is a promise that *this*
 *             operation runs at most once; reusing the key for a genuinely
 *             different payload is a client bug, surfaced loudly rather than
 *             silently replaying the wrong result.
 *       MISS → run `next()`, then capture the response (status + body + the
 *             content-type) AND the request body-hash with a 24h expiry.
 *
 * Store: the in-process `LRU` at `cache/lru.ts` — the SAME primitive
 * `rate-limit.ts` + `session/resolve.ts` use. NOT a Mongo collection: this
 * keeps the replay store bounded (FIFO + TTL eviction) and avoids a write per
 * mutation. Consequence — like rate-limit, the store is PER-PROCESS, so the
 * 24h durability is best-effort and does NOT survive a restart or span
 * replicas. That matches the existing precedent (the rate-limit window + the
 * suspended-user cache are likewise per-process) and is acceptable for an
 * idempotency guard whose job is to collapse client retries within a single
 * request burst, not to provide cross-restart exactly-once delivery. (The
 * cross-repo contract's reference impl is Mongo-backed + durable; value.js's
 * LRU is the sanctioned single-replica KISS relaxation — D2 §3 P2 — and the
 * body-hash conflict response is now contract-faithful regardless of backing.)
 *
 * X-W3 · G-10 / CC-039 (DR-33): that relaxation is no longer disclosed only
 * here. It is CANON in `docs/tranches/X/contracts/WRITE-CONTRACT.md §5`, which
 * states the deployment fact that would reopen it — a SECOND REPLICA, at which
 * point the store must move to a shared backing — and states it as a
 * deployment fact rather than a future wave. Single-replica, this store is the
 * contract; it is not a deferred promise.
 *
 * Error semantics: the 409 conflict is the ONLY throw this middleware raises;
 * Hono's `app.onError` maps it to the problem+json envelope. A replayed
 * response is reconstructed directly. A handler that `throw`s an `ApiError` is
 * caught by Hono's dispatcher and mapped to a 4xx/5xx response by `app.onError`
 * BEFORE control returns to `await next()` here — so `c.res` is the error
 * response, not a thrown exception. We therefore capture ONLY 2xx responses: a
 * transient 409/410/503 must NOT become a sticky 24h replay (the K.W2
 * adversarial review caught this — the prior `!== 204/304` check cached errors).
 */

import { type MiddlewareHandler } from "hono";
import { createHash } from "node:crypto";
import { LRU } from "../cache/lru.js";
import { IdempotencyConflictError, ValidationError } from "./errors/index.js";

const IDEMPOTENCY_WINDOW_MS = 24 * 60 * 60 * 1000; // 24h
const IDEMPOTENCY_CAP = 50_000;

/** Methods whose responses participate in idempotent replay. */
const MUTATING_METHODS = new Set(["POST", "PATCH", "PUT", "DELETE"]);

/**
 * X-W3 · G-10 — the operations on which `Idempotency-Key` is REQUIRED.
 *
 * Opt-in replay is enough for a write that is naturally idempotent (publish
 * `$set`s a value; PATCH sets the fields it is given). It is NOT enough for a
 * write that APPENDS: a retried revert releases a second revision, and a
 * retried fork creates a second palette — a duplicate the client cannot undo
 * and the owner did not ask for. Those two are therefore required to name the
 * attempt they are retrying, and a request without a key is refused `400`
 * rather than silently executed a second time.
 *
 * The rule is declared HERE, beside the store it arms, rather than mounted
 * per-route: the middleware is already app-global (`app.ts:73`) and runs ahead
 * of routing, so one table is the whole answer to "which operations require a
 * key" — and a route file cannot acquire the requirement, or lose it, by
 * accident.
 *
 * `forks?` matches the fork-create operation under BOTH spellings: the
 * singular `POST /:slug/fork` mounted today, and the plural `POST /:slug/forks`
 * that X.W3.4 (G-12) renames it to. The plural GET is unaffected — only
 * mutating methods are tested.
 */
const IDEMPOTENCY_REQUIRED: readonly { method: string; path: RegExp }[] = [
    { method: "POST", path: /^\/palettes\/[^/]+\/revert$/ },
    { method: "POST", path: /^\/palettes\/[^/]+\/forks?$/ },
];

function requiresIdempotencyKey(method: string, path: string): boolean {
    return IDEMPOTENCY_REQUIRED.some(
        (op) => op.method === method && op.path.test(path),
    );
}

interface StoredResponse {
    /** sha256 of the raw request body that produced this response — the CS3.2
     * conflict guard: a same-key replay with a different body-hash is a 409. */
    bodyHash: string;
    status: number;
    body: string;
    /** The FULL response header tuple captured verbatim (V·W45 item 7), so a
     * replay reproduces the byte-identical status/body/header result — incl.
     * `ETag` / `Set-Cookie` where the mutation emitted them. (CORS headers are
     * added by the outer middleware AFTER this capture, so they are re-applied
     * to the replayed response too — never double-stored.) */
    headers: [string, string][];
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

    if (!idempotencyKey || idempotencyKey.trim() === "") {
        // X-W3 · G-10: REQUIRED on the appending operations (see
        // `IDEMPOTENCY_REQUIRED`) — absent key → 400, before the handler runs.
        if (requiresIdempotencyKey(c.req.method, c.req.path)) {
            throw new ValidationError(
                `Idempotency-Key header is required for ${c.req.method} ${c.req.path}`,
            );
        }
        // Everywhere else: opt-in — no key → never replay, never capture.
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

    // Read the raw request body ONCE, up front, to compute the body-hash.
    // Hono memoizes body access (`c.req.bodyCache`), so a later `c.req.json()`
    // in the handler resolves from the same cached text — reading it here does
    // not consume the stream out from under the route.
    const rawBody = await c.req.text();
    const bodyHash = createHash("sha256").update(rawBody).digest("hex");

    const hit = replayStore.get(key);
    if (hit) {
        // CS3.2: same key, DIFFERENT body → 409. The key is a promise that
        // THIS operation runs at most once; a different payload under the same
        // key is a client bug, surfaced loudly instead of silently replaying
        // the original (wrong) result.
        if (hit.bodyHash !== bodyHash) {
            throw new IdempotencyConflictError();
        }
        // HIT, SAME body — replay the stored response verbatim; handler
        // skipped. The FULL captured header tuple (incl. ETag/Set-Cookie) is
        // reproduced, plus the `Idempotency-Replayed` marker so the caller can
        // tell a replay from a fresh execution.
        const headers = new Headers(hit.headers);
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
            bodyHash,
            status: res.status,
            body,
            headers: [...res.headers.entries()],
        });
    }
};

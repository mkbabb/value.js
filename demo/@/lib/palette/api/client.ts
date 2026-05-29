/**
 * HTTP client infrastructure shared by every palette-API sub-module.
 *
 * Exposes the two transport primitives consumed across the surface:
 *   - `request<T>(path, init?)` — session-token JSON fetch
 *   - `adminRequest<T>(path, token, init?)` — bearer-token admin JSON fetch
 *
 * Owns the in-module `sessionToken` cell; `setSessionToken` is re-exported
 * through the `sessions` sub-module + the top-level barrel for API parity
 * with the pre-decomposition `api.ts` surface.
 *
 * H.W3 Lane A — extracted from the 484-LoC `api.ts` god module.
 *
 * E.W6 (β.2 consumer hardening): error path now throws a typed `ApiProblem`
 * (RFC 7807) parsed from `application/problem+json` responses (post-I.W4).
 * The static factory tolerates non-problem+json bodies (falls back to
 * `about:blank` + `statusText`). Per-repo independent — fourier authors its
 * own copy at `web/src/lib/api-problem.ts`; no shared package (inv-16).
 *
 * E.W6 — Δ-R2.2 baseline fix: `DEFAULT_REMOTE_API_URL` updated from the
 * pre-D.W10 VPN host (`mbabb.fi.ncsu.edu/colors`) to the live constellation
 * endpoint (`api.color.babb.dev`). Demo builds without `VITE_API_URL` now
 * point at the correct production backend.
 */

import { ApiProblem, readRateLimitResetSeconds } from "./api-problem.js";

const DEFAULT_REMOTE_API_URL = "https://api.color.babb.dev";
export const BASE_URL = import.meta.env.VITE_API_URL ?? DEFAULT_REMOTE_API_URL;

let sessionToken: string | null = null;

export function setSessionToken(token: string | null) {
    sessionToken = token;
}

const MAX_RATE_LIMIT_RETRIES = 2;
const MAX_RATE_LIMIT_RESET_SECONDS = 30;

/**
 * Single retry helper for 429 with `RateLimit-Reset` backoff (B10 hardening).
 * Used by both `request` and `adminRequest`.
 */
async function fetchWithRateLimitRetry(
    input: string,
    init: RequestInit,
): Promise<Response> {
    for (let attempt = 0; ; attempt++) {
        const res = await fetch(input, init);
        if (res.status !== 429 || attempt >= MAX_RATE_LIMIT_RETRIES) return res;
        const reset = readRateLimitResetSeconds(res);
        const waitSec = Math.min(reset ?? 2 ** attempt, MAX_RATE_LIMIT_RESET_SECONDS);
        await new Promise((r) => setTimeout(r, waitSec * 1000));
    }
}

export interface RequestOptions extends RequestInit {
    /** If-Match header (typically a captured ETag) for conditional PATCH. */
    ifMatch?: string | null;
    /** Idempotency-Key header (UUID) for POST + PUT. */
    idempotencyKey?: string | null;
}

export async function request<T>(path: string, init?: RequestOptions): Promise<T> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(init?.headers as Record<string, string>),
    };
    if (sessionToken) {
        headers["X-Session-Token"] = sessionToken;
    }
    if (init?.ifMatch) {
        headers["If-Match"] = init.ifMatch;
    }
    if (init?.idempotencyKey) {
        headers["Idempotency-Key"] = init.idempotencyKey;
    }
    const res = await fetchWithRateLimitRetry(`${BASE_URL}${path}`, {
        ...init,
        headers,
    });
    if (!res.ok) {
        if (res.status === 401) {
            sessionToken = null;
        }
        // I.W4 SOTA: typed ApiProblem from application/problem+json; falls
        // back to about:blank + statusText for non-problem+json responses.
        throw await ApiProblem.from(res);
    }
    return res.json();
}

export async function adminRequest<T>(
    path: string,
    token: string,
    init?: RequestOptions,
): Promise<T> {
    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        ...(init?.headers as Record<string, string>),
    };
    if (init?.body) {
        headers["Content-Type"] = "application/json";
    }
    if (init?.ifMatch) {
        headers["If-Match"] = init.ifMatch;
    }
    if (init?.idempotencyKey) {
        headers["Idempotency-Key"] = init.idempotencyKey;
    }
    const res = await fetchWithRateLimitRetry(`${BASE_URL}${path}`, {
        ...init,
        headers,
    });
    if (!res.ok) {
        throw await ApiProblem.from(res);
    }
    return res.json();
}

export { ApiProblem };

/**
 * Typed error classes + Hono error-mapping (D.W2 Lane C #3).
 *
 * Pipeline (D-HARDEN-3 §2):
 *   service / repository throws an `ApiError` subclass
 *   → global `app.onError` calls `toResponseEnvelope(err)`
 *   → response is the canonical `{ error: { code, message, detail? } }` envelope.
 *
 * Adding a new error type:
 *   1. extend `ApiError` (or one of its subclasses)
 *   2. assign a stable `code` string (snake_case)
 *   3. no other changes needed — `toResponseEnvelope` handles the mapping
 *      by virtue of the `ApiError` base class.
 *
 * Fail-explicit invariant (D3): every error path SHOULD throw a typed
 * `ApiError`. The fallback in `toResponseEnvelope` (status 500 / code
 * "internal") exists only for genuine bugs / unhandled exceptions and is
 * logged at the call site, not silently swallowed.
 */

import type { ContentfulStatusCode } from "hono/utils/http-status";

export class ApiError extends Error {
    constructor(
        public readonly status: ContentfulStatusCode,
        public readonly code: string,
        message: string,
        public readonly detail?: unknown,
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}

/** 400 — request body / params / query failed validation. */
export class ValidationError extends ApiError {
    constructor(message: string, detail?: unknown) {
        super(400, "validation", message, detail);
    }
}

/** 401 — no session / unauthenticated request. */
export class AuthenticationError extends ApiError {
    constructor(message = "Authentication required") {
        super(401, "authentication", message);
    }
}

/** 403 — session present but not owner / forbidden. */
export class OwnershipError extends ApiError {
    constructor(message: string) {
        super(403, "ownership", message);
    }
}

/** 404 — resource not found. */
export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(404, "not_found", message);
    }
}

/** 409 — write conflicts with existing state (dup key, concurrent edit). */
export class ConflictError extends ApiError {
    constructor(message: string, detail?: unknown) {
        super(409, "conflict", message, detail);
    }
}

/** 410 — resource soft-deleted, still within grace window (I.W2). */
export class GoneError extends ApiError {
    constructor(message = "Resource has been deleted") {
        super(410, "gone", message);
    }
}

/** 429 — rate-limit exceeded. */
export class RateLimitError extends ApiError {
    constructor(message = "Rate limit exceeded") {
        super(429, "rate_limit", message);
    }
}

/** 503 — config / dependency unavailable (admin not configured, DB down). */
export class ConfigurationError extends ApiError {
    constructor(message: string) {
        super(503, "configuration", message);
    }
}

export interface ErrorEnvelope {
    error: {
        code: string;
        message: string;
        detail?: unknown;
    };
}

export interface MappedResponse {
    status: ContentfulStatusCode;
    body: ErrorEnvelope;
}

/**
 * Map any thrown value to a `{ status, body }` pair the global Hono error
 * middleware renders.
 *
 * - ApiError instances are mapped to their explicit status + code.
 * - Everything else (bare Error, string, undefined, …) becomes a 500 with
 *   code "internal". The caller (the onError middleware) is expected to
 *   `console.error` the raw value so it's visible in operator logs.
 */
export function toResponseEnvelope(err: unknown): MappedResponse {
    if (err instanceof ApiError) {
        const body: ErrorEnvelope = {
            error: {
                code: err.code,
                message: err.message,
                ...(err.detail !== undefined ? { detail: err.detail } : {}),
            },
        };
        return { status: err.status, body };
    }
    return {
        status: 500,
        body: { error: { code: "internal", message: "Internal server error" } },
    };
}

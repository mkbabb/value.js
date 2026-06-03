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

/** 412 — If-Match header present but didn't match the resource's ETag (I.W4). */
export class PreconditionFailedError extends ApiError {
    constructor(message = "If-Match header did not match resource ETag") {
        super(412, "precondition_failed", message);
    }
}

/** 422 — request well-formed but semantically unprocessable: e.g. a `/diff`
 * across two versions on DIVERGENT branches (the inv-J-1 single-parent chain
 * guard), or a malformed visibility target (the inv-I-2 transition guard).
 * Distinct from 400, which is for malformed/absent request params. */
export class UnprocessableEntityError extends ApiError {
    constructor(message: string, detail?: unknown) {
        super(422, "unprocessable", message, detail);
    }
}

/** 428 — If-Match header missing on a mutation that requires it (I.W4). */
export class PreconditionRequiredError extends ApiError {
    constructor(message = "If-Match header is required") {
        super(428, "precondition_required", message);
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

/**
 * I.W4 SOTA envelopes: RFC 7807 problem+json shape.
 * https://datatracker.ietf.org/doc/html/rfc7807
 *
 *   - `type`     — URI identifying the problem type; SHOULD be `about:blank`
 *                  for default-unspecified types; we use a `urn:palette-api:`
 *                  URN scheme for typed errors (one URN per ApiError subclass).
 *   - `title`    — short, human-readable summary; SHOULD NOT change between
 *                  occurrences of the same problem type.
 *   - `status`   — HTTP status code, repeated in the body for client convenience.
 *   - `detail`   — instance-specific explanation; can be missing.
 *   - `instance` — URI reference identifying the specific occurrence (often
 *                  the request path); can be missing.
 *   - Extensions: any additional fields per problem type (e.g. validation
 *                  field errors).
 */
export interface ProblemDetails {
    type: string;
    title: string;
    status: number;
    detail?: string;
    instance?: string;
    [extension: string]: unknown;
}

export interface MappedResponse {
    status: ContentfulStatusCode;
    body: ProblemDetails;
    contentType: "application/problem+json";
}

/** Stable per-error-code URN scheme. */
const PROBLEM_TYPE_URN = "urn:palette-api:problem:";

/**
 * Map any thrown value to a `{ status, body, contentType }` triple the
 * global Hono error middleware renders as `application/problem+json`.
 *
 * - ApiError instances → typed problem+json with `urn:palette-api:problem:<code>` type.
 * - Everything else → 500 with `urn:palette-api:problem:internal` type.
 */
export function toResponseEnvelope(err: unknown, instance?: string): MappedResponse {
    if (err instanceof ApiError) {
        const body: ProblemDetails = {
            type: `${PROBLEM_TYPE_URN}${err.code}`,
            title: err.message,
            status: err.status,
            ...(err.detail !== undefined ? { detail: String(err.detail) } : {}),
            ...(instance !== undefined ? { instance } : {}),
            // Preserve structured detail under `errors` extension (e.g. zod field errors).
            ...(err.detail !== undefined && typeof err.detail !== "string"
                ? { errors: err.detail }
                : {}),
        };
        return { status: err.status, body, contentType: "application/problem+json" };
    }
    return {
        status: 500,
        body: {
            type: `${PROBLEM_TYPE_URN}internal`,
            title: "Internal server error",
            status: 500,
            ...(instance !== undefined ? { instance } : {}),
        },
        contentType: "application/problem+json",
    };
}

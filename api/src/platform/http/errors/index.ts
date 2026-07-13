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

/**
 * N.W3.H — URN convergence onto the shared CRUD contract namespace.
 *
 * The cross-repo CRUD contract (`fourier-analysis/docs/tranches/B/coordination/
 * CRUD-CONTRACT.md` v2.0.0 §5 + CONFORMANCE-MATRIX.md §V2) names a SINGLE
 * shared problem-type vocabulary `urn:contract:<kebab>`. The conformance
 * matrix dispositions value.js's adoption of it as DEFERRED-TO-VALUE.JS
 * (wave I.W4 in the matrix's naming; landed here at N.W3) — see §V2.1 rows
 * CS5.2 / U-errors-3. value.js previously emitted a repo-local
 * `urn:palette-api:problem:<snake_code>` namespace, which defeated the one
 * purpose of problem+json's `type` URI: cross-system legibility (a client /
 * agent reading `type` to branch could NOT treat value.js + fourier
 * uniformly). The `type` URI now binds to the contract catalog.
 *
 * Each ApiError subclass carries its own `typeUrn` (the contract URN for its
 * PRIMARY semantic). A few value.js classes are reused across more than one
 * contract row (documented at each subclass): `OwnershipError` serves both
 * wrong-owner and suspended-account; `ConflictError` serves slug-conflict and
 * flag-duplicate; `ValidationError` serves body-validation and flag-self. The
 * URN reflects the primary row; the per-call `title`/`detail` disambiguates.
 * This is the KISS shape — one stable URN per error class — over a contrived
 * per-call-site URN override the wire has no consumer for (the demo's
 * `ApiProblem` branches on HTTP status, never on the literal `type` string).
 */
const CONTRACT_URN = "urn:contract:";

export class ApiError extends Error {
    constructor(
        public readonly status: ContentfulStatusCode,
        public readonly code: string,
        message: string,
        public readonly detail?: unknown,
        /** The contract problem-type URI (`urn:contract:<kebab>`). Defaults to
         * a repo-local `urn:palette-api:problem:<code>` only for the non-
         * catalogued internal-bug sentinel (the 500 fallback). */
        public readonly typeUrn: string = `urn:palette-api:problem:${code}`,
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}

/** 400 — request body / params / query failed validation.
 * Contract: `urn:contract:validation-failed`. (Also the flag-self 400 reuses
 * this class; the title disambiguates.) */
export class ValidationError extends ApiError {
    constructor(message: string, detail?: unknown) {
        super(400, "validation", message, detail, `${CONTRACT_URN}validation-failed`);
    }
}

/** 401 — no session / unauthenticated request.
 * Contract: `urn:contract:session-invalid`. */
export class AuthenticationError extends ApiError {
    constructor(message = "Authentication required") {
        super(401, "authentication", message, undefined, `${CONTRACT_URN}session-invalid`);
    }
}

/** 403 — session present but not owner. Contract: `urn:contract:not-owner`.
 * The suspended-account 403 (`resolve-session.ts`) reuses this class; its
 * title ("Account suspended") disambiguates from the wrong-owner case (the
 * contract's `account-suspended` row maps to the same 403 shape). */
export class OwnershipError extends ApiError {
    constructor(message: string) {
        super(403, "ownership", message, undefined, `${CONTRACT_URN}not-owner`);
    }
}

/** 403 — request forbidden (e.g. invalid admin bearer token), distinct from
 * `OwnershipError`'s session-owner-mismatch semantic.
 * Contract: `urn:contract:admin-forbidden`. */
export class ForbiddenError extends ApiError {
    constructor(message = "Forbidden") {
        super(403, "forbidden", message, undefined, `${CONTRACT_URN}admin-forbidden`);
    }
}

/** 404 — resource not found. Contract: `urn:contract:not-found`. */
export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(404, "not_found", message, undefined, `${CONTRACT_URN}not-found`);
    }
}

/** 409 — write conflicts with existing state (dup key, concurrent edit).
 * Contract: `urn:contract:slug-conflict` (the primary row — user-supplied slug
 * collision, §2 C2.5). The flag-duplicate 409 (`flags.ts`) reuses this class;
 * its title ("Already flagged") disambiguates. */
export class ConflictError extends ApiError {
    constructor(message: string, detail?: unknown) {
        super(409, "conflict", message, detail, `${CONTRACT_URN}slug-conflict`);
    }
}

/** 409 — an `Idempotency-Key` replay arrived with a DIFFERENT body than the
 * original recorded under that key (the CS3.2 row; N.W3.G). Distinct from
 * `ConflictError`'s slug-collision semantic — the contract names a dedicated
 * `urn:contract:idempotency-replay-conflict` type for this. */
export class IdempotencyConflictError extends ApiError {
    constructor(
        message = "Idempotency-Key reused with a different request body",
    ) {
        super(
            409,
            "idempotency_replay_conflict",
            message,
            undefined,
            `${CONTRACT_URN}idempotency-replay-conflict`,
        );
    }
}

/** 410 — resource soft-deleted, still within grace window (I.W2).
 * Contract: `urn:contract:soft-deleted`. */
export class GoneError extends ApiError {
    constructor(message = "Resource has been deleted") {
        super(410, "gone", message, undefined, `${CONTRACT_URN}soft-deleted`);
    }
}

/** 412 — If-Match header present but didn't match the resource's ETag (I.W4).
 * Contract: `urn:contract:etag-mismatch`. */
export class PreconditionFailedError extends ApiError {
    constructor(message = "If-Match header did not match resource ETag") {
        super(412, "precondition_failed", message, undefined, `${CONTRACT_URN}etag-mismatch`);
    }
}

/** 422 — request well-formed but semantically unprocessable: e.g. a `/diff`
 * across two versions on DIVERGENT branches (the inv-J-1 single-parent chain
 * guard), or a malformed visibility target (the inv-I-2 transition guard).
 * Distinct from 400, which is for malformed/absent request params.
 * Contract: `urn:contract:visibility-illegal-transition` (the primary 422
 * row; the diff divergent-chain reuses this class, disambiguated by title). */
export class UnprocessableEntityError extends ApiError {
    constructor(message: string, detail?: unknown) {
        super(
            422,
            "unprocessable",
            message,
            detail,
            `${CONTRACT_URN}visibility-illegal-transition`,
        );
    }
}

/** 428 — If-Match header missing on a mutation that requires it (I.W4).
 * Contract: `urn:contract:precondition-required`. */
export class PreconditionRequiredError extends ApiError {
    constructor(message = "If-Match header is required") {
        super(
            428,
            "precondition_required",
            message,
            undefined,
            `${CONTRACT_URN}precondition-required`,
        );
    }
}

/** 429 — rate-limit exceeded. Contract: `urn:contract:rate-limited`. */
export class RateLimitError extends ApiError {
    constructor(message = "Rate limit exceeded") {
        super(429, "rate_limit", message, undefined, `${CONTRACT_URN}rate-limited`);
    }
}

/** 503 — config / dependency unavailable (admin not configured, DB down).
 * Contract: `urn:contract:admin-not-configured`. */
export class ConfigurationError extends ApiError {
    constructor(message: string) {
        super(503, "configuration", message, undefined, `${CONTRACT_URN}admin-not-configured`);
    }
}

/**
 * I.W4 SOTA envelopes: RFC 7807 problem+json shape.
 * https://datatracker.ietf.org/doc/html/rfc7807
 *
 *   - `type`     — URI identifying the problem type; SHOULD be `about:blank`
 *                  for default-unspecified types; we bind the shared
 *                  `urn:contract:<kebab>` catalog for typed errors (one URN per
 *                  ApiError subclass, N.W3.H convergence). The lone exception is
 *                  the non-catalogued internal-bug sentinel (500 fallback),
 *                  which keeps `urn:palette-api:problem:internal`.
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

/** The non-catalogued internal-bug sentinel URN — the lone repo-local URN
 * remaining after the N.W3.H convergence (there is no `urn:contract:internal`
 * row; an unhandled 500 is a value.js bug, not a contract-shaped condition). */
const INTERNAL_PROBLEM_URN = "urn:palette-api:problem:internal";

/**
 * Map any thrown value to a `{ status, body, contentType }` triple the
 * global Hono error middleware renders as `application/problem+json`.
 *
 * - ApiError instances → typed problem+json with the error's contract
 *   `urn:contract:<kebab>` type (N.W3.H).
 * - Everything else → 500 with the `urn:palette-api:problem:internal` sentinel.
 */
export function toResponseEnvelope(err: unknown, instance?: string): MappedResponse {
    if (err instanceof ApiError) {
        const body: ProblemDetails = {
            type: err.typeUrn,
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
            type: INTERNAL_PROBLEM_URN,
            title: "Internal server error",
            status: 500,
            ...(instance !== undefined ? { instance } : {}),
        },
        contentType: "application/problem+json",
    };
}

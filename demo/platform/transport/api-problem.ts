/**
 * E.W6 — Typed RFC 7807 problem+json error class (T8 per
 * fourier-E ARCH-TRANSPOSITIONS-E.md + CONSUMER-HARDENING.md §4).
 *
 * **Per-repo authored** (inv-16; fourier authors its own copy at
 * `web/src/lib/api-problem.ts`). Same shape, independent files — the
 * cross-repo boundary is preserved; there is no shared types package, no
 * shared HTTP client.
 *
 * Semantics:
 *   - When the palette-api returns `content-type: application/problem+json`
 *     (post-I.W4), the request helper parses the body and throws an
 *     `ApiProblem` instance with `type` / `title` / `status` / `detail` /
 *     `instance` + arbitrary extension members.
 *   - When the API returns any other content-type on a non-2xx response, the
 *     helper still throws an `ApiProblem` but with `type = "about:blank"`
 *     (the RFC 7807 default) and `title = statusText`.
 *   - `ApiProblem extends Error` so callers can `try { ... } catch (e) {
 *     if (e instanceof ApiProblem) { ... } }`.
 *
 * X.W11.api (COHESION §0eh limb (a)) — ONE typed problem for every way the
 * palette service can fail to serve. The api.color certificate expired on
 * 2026-08-26 and every palette fetch died at TLS for ~6 weeks with nothing a
 * person could act on. `fetch` collapses a refused certificate and a dead
 * network into one bare rejection (the latch's `ApiUnavailableError`), a 5xx is
 * an answer that is not a palette, and a body that does not parse — or parses
 * to something that is not the palette shape — is the same failure wearing a
 * 200. `toApiProblem` classifies each into an `ApiProblem` with a `kind`, so the
 * surfaces that tell the person (the glass toast at the transport seam, the
 * Browse plate) read one type, never a bare `catch`:
 *   - `unreachable` — network or TLS (status 0, `PROBLEM_UNREACHABLE`);
 *   - `server`      — the service answered 5xx;
 *   - `malformed`   — the body was not the shape asked for (`PROBLEM_MALFORMED`);
 *   - `client`      — a 4xx: the service answered and refused THIS request. A
 *     designed verdict for its surface (412, 409, 401…), not a service failure.
 */

import { ApiUnavailableError } from "./availability.js";

/** Problem type for a request that got no HTTP answer: network or TLS. */
export const PROBLEM_UNREACHABLE = "urn:value-js:problem:unreachable";
/** Problem type for an answer whose body is not the shape the request asked for. */
export const PROBLEM_MALFORMED = "urn:value-js:problem:malformed-body";

export type ApiProblemKind = "unreachable" | "server" | "malformed" | "client";

export class ApiProblem extends Error {
    constructor(
        public readonly type: string,
        public readonly title: string,
        public readonly status: number,
        public readonly detail?: string,
        public readonly instance?: string,
        public readonly extensions: Record<string, unknown> = {},
    ) {
        super(title);
        this.name = "ApiProblem";
    }

    static async from(response: Response): Promise<ApiProblem> {
        const body = await response.json().catch(() => ({})) as Record<string, unknown>;
        const { type, title, status, detail, instance, ...extensions } = body;
        return new ApiProblem(
            typeof type === "string" ? type : "about:blank",
            typeof title === "string" ? title : response.statusText,
            typeof status === "number" ? status : response.status,
            typeof detail === "string" ? detail : undefined,
            typeof instance === "string" ? instance : undefined,
            extensions,
        );
    }

    /** No HTTP answer at all — the network or the TLS handshake failed. */
    static unreachable(cause?: unknown): ApiProblem {
        const problem = new ApiProblem(
            PROBLEM_UNREACHABLE,
            "No response — the network or the service's TLS certificate failed.",
            0,
        );
        if (cause !== undefined) problem.cause = cause;
        return problem;
    }

    /** An answer whose body is not the shape the request asked for. */
    static malformed(detail: string, cause?: unknown): ApiProblem {
        const problem = new ApiProblem(
            PROBLEM_MALFORMED,
            "The service answered with a malformed body.",
            0,
            detail,
        );
        if (cause !== undefined) problem.cause = cause;
        return problem;
    }

    /** Which way the request failed — read from the problem type and status. */
    get kind(): ApiProblemKind {
        if (this.type === PROBLEM_UNREACHABLE) return "unreachable";
        if (this.type === PROBLEM_MALFORMED) return "malformed";
        return this.status >= 500 ? "server" : "client";
    }

    /** True when the SERVICE failed to serve (every kind but `client`). */
    get isServiceFailure(): boolean {
        return this.kind !== "client";
    }

    /** One sentence naming the failure, for the person (the toast line). */
    get summary(): string {
        switch (this.kind) {
            case "server": {
                const said = this.title && this.title !== String(this.status) ? ` ${this.title}` : "";
                return `The service answered ${this.status}${said}.`;
            }
            case "malformed":
                return this.detail ? `${this.title} ${this.detail}` : this.title;
            default:
                return this.title;
        }
    }

    /** Convenience: matches against a specific URN/URL problem type. */
    is(typeUrn: string): boolean {
        return this.type === typeUrn;
    }
}

/**
 * Classify a caught transport error into the one typed problem, or `null` when
 * it is not a transport failure at all (a `DevMisconfigError` — the designed
 * dev-config state with its own lamp — or a programming error), which the
 * caller rethrows as itself. Never a catch-all: an unknown error stays unknown.
 *   - `ApiProblem`          → itself (the service answered; `kind` reads it);
 *   - `ApiUnavailableError` → `unreachable` (the latch's network/TLS rejection,
 *     or its cooldown short-circuit of the same outage);
 *   - `SyntaxError`         → `malformed` (`response.json()` could not parse).
 */
export function toApiProblem(error: unknown): ApiProblem | null {
    if (error instanceof ApiProblem) return error;
    if (error instanceof ApiUnavailableError) return ApiProblem.unreachable(error);
    if (error instanceof SyntaxError) return ApiProblem.malformed(error.message, error);
    return null;
}

/** Read a `RateLimit-Reset` header (seconds) for 429 backoff. */
export function readRateLimitResetSeconds(response: Response): number | null {
    const raw = response.headers.get("RateLimit-Reset");
    if (raw === null) return null;
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : null;
}

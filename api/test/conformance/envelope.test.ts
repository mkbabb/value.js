/**
 * I.W4 SOTA: tests the RFC 7807 problem+json envelope.
 *
 * Pre-I.W4 the envelope was `{ error: { code, message, detail? } }`; from
 * I.W4 the canonical shape is `{ type, title, status, detail?, instance? }`.
 *
 * N.W3.H: the `type` URI now binds the SHARED cross-repo CRUD-contract
 * catalog `urn:contract:<kebab>` (one URN per error class) — converging value.js
 * onto fourier's namespace per CONFORMANCE-MATRIX §V2 (DEFERRED-TO-VALUE.JS row,
 * landed here). The lone repo-local URN that remains is the non-catalogued
 * internal-bug sentinel (`urn:palette-api:problem:internal`); a custom ApiError
 * subclass that does not declare a `typeUrn` falls back to the repo-local
 * default (asserted below).
 */

import { describe, expect, it } from "vitest";
import {
    ApiError,
    AuthenticationError,
    ConfigurationError,
    ConflictError,
    ForbiddenError,
    GoneError,
    NotFoundError,
    OwnershipError,
    PreconditionFailedError,
    PreconditionRequiredError,
    RateLimitError,
    toResponseEnvelope,
    ValidationError,
} from "../../src/platform/http/errors/index.js";

const CONTRACT = "urn:contract:";
const INTERNAL_URN = "urn:palette-api:problem:internal";

describe("toResponseEnvelope — RFC 7807 problem+json shape (I.W4; N.W3.H contract URNs)", () => {
    it("ValidationError → 400 + type=urn:contract:validation-failed", () => {
        const result = toResponseEnvelope(new ValidationError("bad input"));
        expect(result.status).toBe(400);
        expect(result.contentType).toBe("application/problem+json");
        expect(result.body.type).toBe(`${CONTRACT}validation-failed`);
        expect(result.body.title).toBe("bad input");
        expect(result.body.status).toBe(400);
    });

    it("ValidationError with structured detail surfaces under `errors` extension", () => {
        const detail = { fields: ["name"] };
        const result = toResponseEnvelope(new ValidationError("bad", detail));
        expect(result.body.errors).toEqual(detail);
    });

    it("AuthenticationError → 401 + type=urn:contract:session-invalid", () => {
        const result = toResponseEnvelope(new AuthenticationError());
        expect(result.status).toBe(401);
        expect(result.body.type).toBe(`${CONTRACT}session-invalid`);
    });

    it("OwnershipError → 403 + type=urn:contract:not-owner", () => {
        const result = toResponseEnvelope(new OwnershipError("not owner"));
        expect(result.status).toBe(403);
        expect(result.body.type).toBe(`${CONTRACT}not-owner`);
    });

    it("ForbiddenError → 403 + type=urn:contract:admin-forbidden", () => {
        const result = toResponseEnvelope(new ForbiddenError());
        expect(result.status).toBe(403);
        expect(result.body.type).toBe(`${CONTRACT}admin-forbidden`);
        expect(result.body.title).toBe("Forbidden");
    });

    it("NotFoundError → 404 + type=urn:contract:not-found", () => {
        const result = toResponseEnvelope(new NotFoundError("gone"));
        expect(result.status).toBe(404);
        expect(result.body.type).toBe(`${CONTRACT}not-found`);
    });

    it("ConflictError → 409 + type=urn:contract:slug-conflict", () => {
        const result = toResponseEnvelope(new ConflictError("duplicate"));
        expect(result.status).toBe(409);
        expect(result.body.type).toBe(`${CONTRACT}slug-conflict`);
    });

    it("GoneError → 410 + type=urn:contract:soft-deleted (I.W2)", () => {
        const result = toResponseEnvelope(new GoneError());
        expect(result.status).toBe(410);
        expect(result.body.type).toBe(`${CONTRACT}soft-deleted`);
    });

    it("PreconditionFailedError → 412 + type=urn:contract:etag-mismatch (I.W4)", () => {
        const result = toResponseEnvelope(new PreconditionFailedError());
        expect(result.status).toBe(412);
        expect(result.body.type).toBe(`${CONTRACT}etag-mismatch`);
    });

    it("PreconditionRequiredError → 428 + type=urn:contract:precondition-required (I.W4)", () => {
        const result = toResponseEnvelope(new PreconditionRequiredError());
        expect(result.status).toBe(428);
        expect(result.body.type).toBe(`${CONTRACT}precondition-required`);
    });

    it("RateLimitError → 429 + type=urn:contract:rate-limited", () => {
        const result = toResponseEnvelope(new RateLimitError());
        expect(result.status).toBe(429);
        expect(result.body.type).toBe(`${CONTRACT}rate-limited`);
    });

    it("ConfigurationError → 503 + type=urn:contract:admin-not-configured", () => {
        const result = toResponseEnvelope(new ConfigurationError("missing env"));
        expect(result.status).toBe(503);
        expect(result.body.type).toBe(`${CONTRACT}admin-not-configured`);
    });

    it("non-ApiError fallback → 500 + type=urn:palette-api:problem:internal (non-catalogued bug sentinel)", () => {
        const result = toResponseEnvelope(new Error("kaboom"));
        expect(result.status).toBe(500);
        expect(result.body.type).toBe(INTERNAL_URN);
        expect(result.body.title).toBe("Internal server error");
    });

    it("bare ApiError subclass with no detail omits detail key", () => {
        const result = toResponseEnvelope(new NotFoundError("x"));
        expect("detail" in result.body).toBe(false);
    });

    it("custom ApiError subclass without a declared typeUrn falls back to the repo-local default", () => {
        // A subclass that does not pass a contract URN keeps the per-code
        // `urn:palette-api:problem:<code>` default — the only path that still
        // emits a repo-local URN (besides the 500 sentinel).
        class CustomError extends ApiError {
            constructor() {
                super(418, "teapot", "I'm a teapot");
            }
        }
        const result = toResponseEnvelope(new CustomError());
        expect(result.status).toBe(418);
        expect(result.body.type).toBe("urn:palette-api:problem:teapot");
    });

    it("primitive thrown (e.g. string) still maps to internal envelope", () => {
        const result = toResponseEnvelope("kaboom");
        expect(result.status).toBe(500);
        expect(result.body.type).toBe(INTERNAL_URN);
    });

    it("undefined thrown maps to internal envelope", () => {
        const result = toResponseEnvelope(undefined);
        expect(result.status).toBe(500);
        expect(result.body.type).toBe(INTERNAL_URN);
    });

    it("instance is set when supplied (request path)", () => {
        const result = toResponseEnvelope(new NotFoundError("x"), "/palettes/abc");
        expect(result.body.instance).toBe("/palettes/abc");
    });
});

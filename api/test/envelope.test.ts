/**
 * I.W4 SOTA: tests the RFC 7807 problem+json envelope.
 *
 * Pre-I.W4 the envelope was `{ error: { code, message, detail? } }`; from
 * I.W4 the canonical shape is `{ type, title, status, detail?, instance? }`
 * with `urn:palette-api:problem:<code>` URN types per error class.
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
} from "../src/errors/index.js";

const URN = "urn:palette-api:problem:";

describe("toResponseEnvelope — RFC 7807 problem+json shape (I.W4)", () => {
    it("ValidationError → 400 + type=urn:palette-api:problem:validation", () => {
        const result = toResponseEnvelope(new ValidationError("bad input"));
        expect(result.status).toBe(400);
        expect(result.contentType).toBe("application/problem+json");
        expect(result.body.type).toBe(`${URN}validation`);
        expect(result.body.title).toBe("bad input");
        expect(result.body.status).toBe(400);
    });

    it("ValidationError with structured detail surfaces under `errors` extension", () => {
        const detail = { fields: ["name"] };
        const result = toResponseEnvelope(new ValidationError("bad", detail));
        expect(result.body.errors).toEqual(detail);
    });

    it("AuthenticationError → 401 + type=urn:palette-api:problem:authentication", () => {
        const result = toResponseEnvelope(new AuthenticationError());
        expect(result.status).toBe(401);
        expect(result.body.type).toBe(`${URN}authentication`);
    });

    it("OwnershipError → 403 + type=urn:palette-api:problem:ownership", () => {
        const result = toResponseEnvelope(new OwnershipError("not owner"));
        expect(result.status).toBe(403);
        expect(result.body.type).toBe(`${URN}ownership`);
    });

    it("ForbiddenError → 403 + type=urn:palette-api:problem:forbidden", () => {
        const result = toResponseEnvelope(new ForbiddenError());
        expect(result.status).toBe(403);
        expect(result.body.type).toBe(`${URN}forbidden`);
        expect(result.body.title).toBe("Forbidden");
    });

    it("NotFoundError → 404 + type=urn:palette-api:problem:not_found", () => {
        const result = toResponseEnvelope(new NotFoundError("gone"));
        expect(result.status).toBe(404);
        expect(result.body.type).toBe(`${URN}not_found`);
    });

    it("ConflictError → 409 + type=urn:palette-api:problem:conflict", () => {
        const result = toResponseEnvelope(new ConflictError("duplicate"));
        expect(result.status).toBe(409);
        expect(result.body.type).toBe(`${URN}conflict`);
    });

    it("GoneError → 410 + type=urn:palette-api:problem:gone (I.W2)", () => {
        const result = toResponseEnvelope(new GoneError());
        expect(result.status).toBe(410);
        expect(result.body.type).toBe(`${URN}gone`);
    });

    it("PreconditionFailedError → 412 + type=urn:palette-api:problem:precondition_failed (I.W4)", () => {
        const result = toResponseEnvelope(new PreconditionFailedError());
        expect(result.status).toBe(412);
        expect(result.body.type).toBe(`${URN}precondition_failed`);
    });

    it("PreconditionRequiredError → 428 + type=urn:palette-api:problem:precondition_required (I.W4)", () => {
        const result = toResponseEnvelope(new PreconditionRequiredError());
        expect(result.status).toBe(428);
        expect(result.body.type).toBe(`${URN}precondition_required`);
    });

    it("RateLimitError → 429 + type=urn:palette-api:problem:rate_limit", () => {
        const result = toResponseEnvelope(new RateLimitError());
        expect(result.status).toBe(429);
        expect(result.body.type).toBe(`${URN}rate_limit`);
    });

    it("ConfigurationError → 503 + type=urn:palette-api:problem:configuration", () => {
        const result = toResponseEnvelope(new ConfigurationError("missing env"));
        expect(result.status).toBe(503);
        expect(result.body.type).toBe(`${URN}configuration`);
    });

    it("non-ApiError fallback → 500 + type=urn:palette-api:problem:internal", () => {
        const result = toResponseEnvelope(new Error("kaboom"));
        expect(result.status).toBe(500);
        expect(result.body.type).toBe(`${URN}internal`);
        expect(result.body.title).toBe("Internal server error");
    });

    it("bare ApiError subclass with no detail omits detail key", () => {
        const result = toResponseEnvelope(new NotFoundError("x"));
        expect("detail" in result.body).toBe(false);
    });

    it("custom ApiError subclasses round-trip with their declared status/code", () => {
        class CustomError extends ApiError {
            constructor() {
                super(418, "teapot", "I'm a teapot");
            }
        }
        const result = toResponseEnvelope(new CustomError());
        expect(result.status).toBe(418);
        expect(result.body.type).toBe(`${URN}teapot`);
    });

    it("primitive thrown (e.g. string) still maps to internal envelope", () => {
        const result = toResponseEnvelope("kaboom");
        expect(result.status).toBe(500);
        expect(result.body.type).toBe(`${URN}internal`);
    });

    it("undefined thrown maps to internal envelope", () => {
        const result = toResponseEnvelope(undefined);
        expect(result.status).toBe(500);
        expect(result.body.type).toBe(`${URN}internal`);
    });

    it("instance is set when supplied (request path)", () => {
        const result = toResponseEnvelope(new NotFoundError("x"), "/palettes/abc");
        expect(result.body.instance).toBe("/palettes/abc");
    });
});

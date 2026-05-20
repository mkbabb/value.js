/**
 * Envelope shape tests — verify `toResponseEnvelope` produces the canonical
 * `{ error: { code, message, detail? } }` shape for every `ApiError`
 * subclass + the unknown-error fallback. These tests don't touch MongoDB —
 * they're pure shape assertions against the error mapper.
 */

import { describe, expect, it } from "vitest";
import {
    ApiError,
    AuthenticationError,
    ConfigurationError,
    ConflictError,
    NotFoundError,
    OwnershipError,
    RateLimitError,
    toResponseEnvelope,
    ValidationError,
} from "../src/errors/index.js";

describe("toResponseEnvelope", () => {
    it("ValidationError → 400 + code 'validation'", () => {
        const result = toResponseEnvelope(new ValidationError("bad input"));
        expect(result.status).toBe(400);
        expect(result.body.error.code).toBe("validation");
        expect(result.body.error.message).toBe("bad input");
    });

    it("ValidationError carries a detail payload when supplied", () => {
        const detail = { fields: ["name"] };
        const result = toResponseEnvelope(new ValidationError("bad", detail));
        expect(result.body.error.detail).toEqual(detail);
    });

    it("AuthenticationError → 401 + code 'authentication'", () => {
        const result = toResponseEnvelope(new AuthenticationError());
        expect(result.status).toBe(401);
        expect(result.body.error.code).toBe("authentication");
    });

    it("OwnershipError → 403 + code 'ownership'", () => {
        const result = toResponseEnvelope(new OwnershipError("not owner"));
        expect(result.status).toBe(403);
        expect(result.body.error.code).toBe("ownership");
    });

    it("NotFoundError → 404 + code 'not_found'", () => {
        const result = toResponseEnvelope(new NotFoundError("gone"));
        expect(result.status).toBe(404);
        expect(result.body.error.code).toBe("not_found");
    });

    it("ConflictError → 409 + code 'conflict'", () => {
        const result = toResponseEnvelope(new ConflictError("duplicate"));
        expect(result.status).toBe(409);
        expect(result.body.error.code).toBe("conflict");
    });

    it("RateLimitError → 429 + code 'rate_limit'", () => {
        const result = toResponseEnvelope(new RateLimitError());
        expect(result.status).toBe(429);
        expect(result.body.error.code).toBe("rate_limit");
    });

    it("ConfigurationError → 503 + code 'configuration'", () => {
        const result = toResponseEnvelope(new ConfigurationError("missing env"));
        expect(result.status).toBe(503);
        expect(result.body.error.code).toBe("configuration");
    });

    it("non-ApiError fallback → 500 + code 'internal'", () => {
        const result = toResponseEnvelope(new Error("kaboom"));
        expect(result.status).toBe(500);
        expect(result.body.error.code).toBe("internal");
        expect(result.body.error.message).toBe("Internal server error");
    });

    it("bare ApiError subclass with no detail omits detail key", () => {
        const result = toResponseEnvelope(new NotFoundError("x"));
        expect("detail" in result.body.error).toBe(false);
    });

    it("custom ApiError subclasses round-trip with their declared status/code", () => {
        class CustomError extends ApiError {
            constructor() {
                super(418, "teapot", "I'm a teapot");
            }
        }
        const result = toResponseEnvelope(new CustomError());
        expect(result.status).toBe(418);
        expect(result.body.error.code).toBe("teapot");
    });

    it("primitive thrown (e.g. string) still maps to internal envelope", () => {
        const result = toResponseEnvelope("kaboom");
        expect(result.status).toBe(500);
        expect(result.body.error.code).toBe("internal");
    });

    it("undefined thrown maps to internal envelope", () => {
        const result = toResponseEnvelope(undefined);
        expect(result.status).toBe(500);
        expect(result.body.error.code).toBe("internal");
    });
});

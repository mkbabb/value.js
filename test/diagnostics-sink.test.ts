import { describe, expect, it, vi } from "vitest";
import { regex } from "@mkbabb/parse-that";
import {
    tryParse,
    parseResult,
    number,
    type ParseDiagnostic,
} from "../src/parsing/utils";

describe("diagnostics sink (VJ-F2 — structured parse-error channel)", () => {
    it("emits a structured diagnostic to the sink on a failed tryParse", () => {
        const seen: ParseDiagnostic[] = [];
        expect(() =>
            tryParse(number, "notanumber", (d) => seen.push(d)),
        ).toThrow();
        expect(seen).toHaveLength(1);
        expect(seen[0]).toMatchObject({
            offset: expect.any(Number),
            line: expect.any(Number),
            column: expect.any(Number),
            input: "notanumber",
        });
        expect(seen[0]!.message).toContain("Parse error");
    });

    it("still throws on failure even with a sink (fail-loud contract)", () => {
        const sink = vi.fn();
        expect(() => tryParse(number, "xyz", sink)).toThrow(/Parse error/);
        expect(sink).toHaveBeenCalledTimes(1);
    });

    it("emits nothing to the sink on a successful parse", () => {
        const sink = vi.fn();
        expect(tryParse(number, "42", sink)).toBe(42);
        expect(sink).not.toHaveBeenCalled();
    });

    it("parseResult emits the diagnostic but returns the {status,value} shape", () => {
        const seen: ParseDiagnostic[] = [];
        const result = parseResult(number, "oops", (d) => seen.push(d));
        expect(result.status).toBe(false);
        expect(seen).toHaveLength(1);
        expect(seen[0]!.input).toBe("oops");
    });

    it("parseResult on success leaves the sink untouched", () => {
        const sink = vi.fn();
        const result = parseResult(number, "7", sink);
        expect(result.status).toBe(true);
        expect(result.value).toBe(7);
        expect(sink).not.toHaveBeenCalled();
    });

    it("the sink is optional — existing two-arg callers are unaffected", () => {
        expect(tryParse(number, "9")).toBe(9);
        expect(parseResult(number, "bad").status).toBe(false);
        expect(() => tryParse(number, "bad")).toThrow();
    });

    it("surfaces the expected-parser set for a multi-token grammar", () => {
        // A parser that consumes a digit run then requires a literal 'px'. The
        // `expected` set names what the grammar required at the derail — the
        // structured value a consumer surfaces ("expected px"). NOTE: at the
        // pinned parse-that 0.8.2, `furthest`/`offset` roll back to 0 on a
        // `.then()` failure (the deep-reach offset sharpens at the W7.B `^0.9`
        // re-pin, recon §8/§13); the `expected` set is reliable today.
        const dimension = regex(/\d+/).then(regex(/px/));
        const seen: ParseDiagnostic[] = [];
        parseResult(dimension, "100qq", (d) => seen.push(d));
        expect(seen).toHaveLength(1);
        expect(seen[0]!.expected).toContain("/px/");
        expect(typeof seen[0]!.offset).toBe("number");
    });

    it("does not write to console.error on a failed parse", () => {
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        try {
            parseResult(number, "nope", () => {});
        } finally {
            spy.mockRestore();
        }
        expect(spy).not.toHaveBeenCalled();
    });
});

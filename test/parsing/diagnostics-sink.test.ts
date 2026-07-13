import { describe, expect, it, vi } from "vitest";
import { disableDiagnostics, enableDiagnostics, regex } from "@mkbabb/parse-that";
import {
    fail,
    tryParse,
    parseResult,
    number,
    type ParseDiagnostic,
} from "@src/parsing/utils";
import { parseCSSStylesheet } from "@src/parsing/stylesheet";

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

    it("reports the deep-reach offset on a multi-token .then() failure (sharpened at ^0.9)", () => {
        // A parser that consumes a digit run then requires a literal 'px',
        // applied to "100qq": the digits parse, then `px` fails at offset 3.
        //
        // SHARPENED at the N.W7.B `^0.9` re-pin (recon §8/§13): at parse-that
        // 0.8.2 `furthest`/`offset` rolled back to 0 on a `.then()` failure, so
        // the diagnostic pointed at the START of the input — useless for a deep
        // grammar. parse-that 0.9.0 threads a per-parse `furthest` reach, so the
        // diagnostic now pinpoints the actual derail (offset 3, column 3). This
        // test LOCKS the sharpening: the offset must be 3, not 0.
        const dimension = regex(/\d+/).then(regex(/px/));
        const seen: ParseDiagnostic[] = [];
        parseResult(dimension, "100qq", (d) => seen.push(d));
        expect(seen).toHaveLength(1);
        expect(seen[0]!.offset).toBe(3);
        expect(seen[0]!.column).toBe(3);

        // The `expected` label set (parse-that's collected-diagnostics extras)
        // is populated ONLY under an explicit `enableDiagnostics()`, which
        // value.js deliberately never calls — enabling it makes parse-that print
        // the derail to the console (the historical F9 console-spew leak). The
        // library stays console-silent on parse failure (the test below proves
        // it), so `expected` is intentionally absent from the structured record.
        expect(seen[0]!.expected).toBeUndefined();
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

describe("W1-4 (lib-parsing F-4) — fail(message) reaches the diagnostic channel", () => {
    it("advances the furthest-reach even with diagnostics OFF (value.js default)", () => {
        // Under the default policy `expected` stays absent (console-silent), but
        // the failure OFFSET must be honest: `fail()` now merges the error state,
        // so a fail at a consumed offset reports that offset, not 0.
        const seen: ParseDiagnostic[] = [];
        const consumeThenFail = regex(/\d+/).then(fail("boom after digits"));
        parseResult(consumeThenFail, "123", (d) => seen.push(d));
        expect(seen).toHaveLength(1);
        expect(seen[0]!.offset).toBe(3);
        // Console-silent by default: message is NOT leaked to `expected`.
        expect(seen[0]!.expected).toBeUndefined();
    });

    it("surfaces the authored message in `expected` under enableDiagnostics", () => {
        // Opt-in consumers (parse-that enableDiagnostics) now see the specific
        // authored message instead of the generic context — the F-4 cure.
        // enableDiagnostics re-arms parse-that's console emission, so suppress it.
        enableDiagnostics();
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        try {
            const seen: ParseDiagnostic[] = [];
            parseResult(fail("Invalid color name: mauvey"), "mauvey", (d) =>
                seen.push(d),
            );
            expect(seen).toHaveLength(1);
            expect(seen[0]!.expected).toContain("Invalid color name: mauvey");
        } finally {
            disableDiagnostics();
            spy.mockRestore();
        }
    });
});

describe("W1-4 (lib-parsing F-9) — the .eof() swap keeps full-consumption", () => {
    it("rejects trailing content after a valid rule (partial parse still fails)", () => {
        expect(() =>
            parseCSSStylesheet(".a { color: red; } %%% not-css %%%"),
        ).toThrow();
    });

    it("still parses a fully-consumed stylesheet", () => {
        const s = parseCSSStylesheet(".a { color: red; } .b { color: blue; }");
        expect(s).toHaveLength(2);
    });
});

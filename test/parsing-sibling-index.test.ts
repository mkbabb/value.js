import { describe, expect, it } from "vitest";
import { CSSFunction, CSSValues } from "../src/parsing/index";
import { FunctionValue } from "../src/units";

// ─────────────────────────────────────────────────────────────────────────────
// VJ-CSS2 — sibling-index() / sibling-count() parse arms (CSS Values L5)
//
// These need NO bespoke parse arm: the generic FunctionValue producer (fnGeneric
// in parsing/index.ts) already accepts any `name(args)` token, so a zero-arg
// `sibling-index()` / `sibling-count()` parses to `FunctionValue("sibling-index"
// | "sibling-count", [])` and round-trips via toString(). This gate PINS that
// contract (a round-trip parse test only — kf's compile-time INTEGER resolution
// is DEFERRED until a live stagger-over-DOM-siblings consumer exists).
// ─────────────────────────────────────────────────────────────────────────────

describe("sibling-index() / sibling-count() — VJ-CSS2", () => {
    it("parses sibling-index() to FunctionValue('sibling-index', [])", () => {
        const r = CSSFunction.Function.parse("sibling-index()") as FunctionValue;
        expect(r).toBeInstanceOf(FunctionValue);
        expect(r.name).toBe("sibling-index");
        expect(r.values).toHaveLength(0);
    });

    it("parses sibling-count() to FunctionValue('sibling-count', [])", () => {
        const r = CSSFunction.Function.parse("sibling-count()") as FunctionValue;
        expect(r).toBeInstanceOf(FunctionValue);
        expect(r.name).toBe("sibling-count");
        expect(r.values).toHaveLength(0);
    });

    it("round-trips sibling-index() byte-identically via toString()", () => {
        const r = CSSFunction.Function.parse("sibling-index()") as FunctionValue;
        expect(r.toString()).toBe("sibling-index()");
    });

    it("round-trips sibling-count() byte-identically via toString()", () => {
        const r = CSSFunction.Function.parse("sibling-count()") as FunctionValue;
        expect(r.toString()).toBe("sibling-count()");
    });

    it("is reachable through the CSSValues.Value entry parser", () => {
        const r = CSSValues.Value.parse("sibling-index()") as FunctionValue;
        expect(r).toBeInstanceOf(FunctionValue);
        expect(r.name).toBe("sibling-index");
    });
});

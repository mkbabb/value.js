import { describe, expect, it } from "vitest";
import {
    parseCSSSubValue,
    parseCSSValue,
} from "@src/parsing/index";
import { parseCSSSubValue as parseCSSSubValueRoot } from "@src/index";
import { FunctionValue, ValueArray, ValueUnit } from "@src/units";

// ─────────────────────────────────────────────────────────────────────────────
// VJ-L3 — parseCSSSubValue (the S9 terminal API)
//
// This is the BINDING gate: keyframes.js' `tryParseLeaves` previously reached
// PAST value.js into `@mkbabb/parse-that` for the `any` combinator and
// hand-composed `any(CSSFunction.FunctionArgs, CSSValues.Value)`. VJ-L3
// internalizes exactly that — FunctionArgs FIRST (the V4 truncation trap) — as a
// public root export so kf can delete its cross-realm import + two `as any`
// casts (S9). The REAL observable is the multi-function round-trip: a truncating
// delegation to `parseCSSValue` would FAIL this, so a `typeof` proxy is
// insufficient.
// ─────────────────────────────────────────────────────────────────────────────

describe("parseCSSSubValue — VJ-L3", () => {
    it("is exported from the public root barrel as a function", () => {
        expect(typeof parseCSSSubValueRoot).toBe("function");
        expect(parseCSSSubValueRoot).toBe(parseCSSSubValue);
    });

    it("round-trips a MULTI-function transform without truncation", () => {
        // The V4 mandate: the full list survives, both functions present.
        const r = parseCSSSubValue("scale(2) rotate(45deg)");
        expect(r).toBeInstanceOf(ValueArray);
        const str = r.toString();
        expect(str).toContain("scaleX(2)");
        expect(str).toContain("scaleY(2)");
        expect(str).toContain("rotateX(45deg)");
        expect(str).toContain("rotateZ(45deg)");
    });

    it("does NOT delegate to parseCSSValue (which TRUNCATES the list)", () => {
        // Proof the truncation trap is real: parseCSSValue drops `rotate`.
        const truncated = parseCSSValue("scale(2) rotate(45deg)").toString();
        expect(truncated).not.toContain("rotate");
        // parseCSSSubValue keeps it — distinct behaviour, not a passthrough.
        const full = parseCSSSubValue("scale(2) rotate(45deg)").toString();
        expect(full).toContain("rotate");
    });

    it("round-trips translateX(10px) translateY(20px)", () => {
        const r = parseCSSSubValue("translateX(10px) translateY(20px)");
        expect(r).toBeInstanceOf(ValueArray);
        const str = r.toString();
        expect(str).toContain("translateX(10px)");
        expect(str).toContain("translateY(20px)");
    });

    it("wraps a bare scalar in a one-element ValueArray (uniform shape)", () => {
        const r = parseCSSSubValue("10px");
        expect(r).toBeInstanceOf(ValueArray);
        expect(r.toString()).toBe("10px");
    });

    it("parses a single function value", () => {
        const r = parseCSSSubValue("rgb(255 0 0)");
        expect(r.toString()).toContain("255");
    });

    it("threads opts.subProperty onto every parsed leaf", () => {
        const r = parseCSSSubValue("translateX(10px) translateY(20px)", {
            subProperty: "transform",
        }) as ValueArray;
        expect(r).toBeInstanceOf(ValueArray);
        // ValueArray extends Array (index-accessed); FunctionValue carries a
        // `.values` array; ValueUnit is the leaf. Every leaf carries the stamp.
        const stamped = (v: unknown): boolean => {
            if (v instanceof FunctionValue) return v.values.every(stamped);
            if (v instanceof ValueArray) return [...v].every(stamped);
            if (v instanceof ValueUnit) return v.subProperty === "transform";
            return false;
        };
        expect(stamped(r)).toBe(true);
    });

    it("omitting opts leaves subProperty unset (no accidental stamp)", () => {
        const r = parseCSSSubValue("10px") as ValueArray;
        const leaf = r[0] as ValueUnit;
        expect(leaf.subProperty).toBeUndefined();
    });
});

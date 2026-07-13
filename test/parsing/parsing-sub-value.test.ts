import { describe, expect, it } from "vitest";
import {
    CSSParseError,
    parseCSSValue,
    parseCSSValues,
} from "@src/parsing/index";
import { parseCSSValues as parseCSSValuesRoot } from "@src/index";
import { FunctionValue, ValueArray, ValueUnit } from "@src/units";

// ─────────────────────────────────────────────────────────────────────────────
// VJ-L3 — parseCSSValues (the S9 terminal API; renamed from parseCSSSubValue at
// U.W-LIB / U-F29 — the discoverable full-list parser, no legacy alias, E-3).
//
// This is the BINDING gate: keyframes.js' `tryParseLeaves` previously reached
// PAST value.js into `@mkbabb/parse-that` for the `any` combinator and
// hand-composed `any(CSSFunction.FunctionArgs, CSSValues.Value)`. VJ-L3
// internalizes exactly that — FunctionArgs FIRST — as a public root export so kf
// can delete its cross-realm import + two `as any` casts (S9). The REAL
// observable is the multi-function round-trip: the sibling `parseCSSValue`
// LOUD-FAILS on a multi-function list (U-F29), so a `typeof` proxy is
// insufficient — parseCSSValues must keep the whole list.
// ─────────────────────────────────────────────────────────────────────────────

describe("parseCSSValues — VJ-L3", () => {
    it("is exported from the public root barrel as a function", () => {
        expect(typeof parseCSSValuesRoot).toBe("function");
        expect(parseCSSValuesRoot).toBe(parseCSSValues);
    });

    it("round-trips a MULTI-function transform without truncation", () => {
        // The V4 mandate: the full list survives, both functions present. Under
        // U-F31 the single-arg forms respect axis cardinality — scale(2) is 2D
        // (no scaleZ) and rotate(45deg) is Z-only (no rotateX/rotateY).
        const r = parseCSSValues("scale(2) rotate(45deg)");
        expect(r).toBeInstanceOf(ValueArray);
        const str = r.toString();
        expect(str).toContain("scaleX(2)");
        expect(str).toContain("scaleY(2)");
        expect(str).not.toContain("scaleZ");
        expect(str).toContain("rotateZ(45deg)");
        expect(str).not.toContain("rotateX");
        expect(str).not.toContain("rotateY");
    });

    it("parseCSSValue LOUD-FAILS on the multi-function list; parseCSSValues keeps it", () => {
        // U-F29: parseCSSValue parses a SINGLE value and throws a typed
        // CSSParseError on the unconsumed trailing `rotate(45deg)` — it no
        // longer silently drops it. parseCSSValues consumes the whole list.
        expect(() => parseCSSValue("scale(2) rotate(45deg)")).toThrow(
            CSSParseError,
        );
        const full = parseCSSValues("scale(2) rotate(45deg)").toString();
        expect(full).toContain("rotate");
    });

    it("round-trips translateX(10px) translateY(20px)", () => {
        const r = parseCSSValues("translateX(10px) translateY(20px)");
        expect(r).toBeInstanceOf(ValueArray);
        const str = r.toString();
        expect(str).toContain("translateX(10px)");
        expect(str).toContain("translateY(20px)");
    });

    it("wraps a bare scalar in a one-element ValueArray (uniform shape)", () => {
        const r = parseCSSValues("10px");
        expect(r).toBeInstanceOf(ValueArray);
        expect(r.toString()).toBe("10px");
    });

    it("parses a single function value", () => {
        const r = parseCSSValues("rgb(255 0 0)");
        expect(r.toString()).toContain("255");
    });

    it("threads opts.subProperty onto every parsed leaf", () => {
        const r = parseCSSValues("translateX(10px) translateY(20px)", {
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
        const r = parseCSSValues("10px") as ValueArray;
        const leaf = r[0] as ValueUnit;
        expect(leaf.subProperty).toBeUndefined();
    });
});

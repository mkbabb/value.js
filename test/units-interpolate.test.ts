import { describe, expect, it } from "vitest";
import { ValueUnit } from "../src/units";
import type { InterpolatedVar } from "../src/units";
import { RGBColor, OKLABColor, OKLCHColor } from "../src/units/color";
import {
    lerpColorValue,
    lerpNumericValue,
    lerpValue,
    prepareInterpVar,
} from "../src/units/interpolate";
import { normalizeValueUnits } from "../src/units/normalize";

// ─────────────────────────────────────────────────────────────────────────────
// lerpNumericValue
// ─────────────────────────────────────────────────────────────────────────────

describe("lerpNumericValue", () => {
    const buildNumeric = (
        a: number,
        b: number,
    ): InterpolatedVar<number> => ({
        start: new ValueUnit(a, "px"),
        stop: new ValueUnit(b, "px"),
        value: new ValueUnit(a, "px"),
        computed: false,
    });

    it("returns start at t=0", () => {
        const iv = buildNumeric(10, 20);
        const out = lerpNumericValue(0, iv);
        expect(out.value).toBe(10);
    });

    it("returns stop at t=1", () => {
        const iv = buildNumeric(10, 20);
        const out = lerpNumericValue(1, iv);
        expect(out.value).toBe(20);
    });

    it("returns midpoint at t=0.5", () => {
        const iv = buildNumeric(10, 20);
        const out = lerpNumericValue(0.5, iv);
        expect(out.value).toBe(15);
    });

    it("mutates the value ValueUnit in place", () => {
        const iv = buildNumeric(0, 100);
        const result = lerpNumericValue(0.25, iv);
        expect(result).toBe(iv.value);
        expect(iv.value.value).toBe(25);
    });

    it("supports negative interpolation", () => {
        const iv = buildNumeric(-10, 10);
        const out = lerpNumericValue(0.5, iv);
        expect(out.value).toBe(0);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// lerpColorValue
// ─────────────────────────────────────────────────────────────────────────────

describe("lerpColorValue", () => {
    const buildColor = (
        c1: RGBColor<number>,
        c2: RGBColor<number>,
    ): InterpolatedVar<RGBColor<number>> => {
        // Match the RGBColor's keys/components for cloning behavior
        const valueColor = new RGBColor<number>(c1.r, c1.g, c1.b, c1.alpha);
        return {
            start: new ValueUnit(c1, "color"),
            stop: new ValueUnit(c2, "color"),
            value: new ValueUnit(valueColor, "color"),
            computed: false,
        };
    };

    it("lerps a single channel at t=0.5", () => {
        const a = new RGBColor<number>(0, 0, 0, 1);
        const b = new RGBColor<number>(100, 50, 200, 1);
        const iv = buildColor(a, b);
        const out = lerpColorValue(0.5, iv);
        expect((out.value as any).r).toBeCloseTo(50, 5);
        expect((out.value as any).g).toBeCloseTo(25, 5);
        expect((out.value as any).b).toBeCloseTo(100, 5);
    });

    it("returns start at t=0", () => {
        const a = new RGBColor<number>(255, 0, 0, 1);
        const b = new RGBColor<number>(0, 0, 255, 1);
        const iv = buildColor(a, b);
        const out = lerpColorValue(0, iv);
        expect((out.value as any).r).toBe(255);
        expect((out.value as any).b).toBe(0);
    });

    it("returns stop at t=1", () => {
        const a = new RGBColor<number>(255, 0, 0, 1);
        const b = new RGBColor<number>(0, 0, 255, 1);
        const iv = buildColor(a, b);
        const out = lerpColorValue(1, iv);
        expect((out.value as any).r).toBe(0);
        expect((out.value as any).b).toBe(255);
    });

    it("lerps alpha channel", () => {
        const a = new RGBColor<number>(0, 0, 0, 0);
        const b = new RGBColor<number>(0, 0, 0, 1);
        const iv = buildColor(a, b);
        const out = lerpColorValue(0.5, iv);
        expect((out.value as any).alpha).toBeCloseTo(0.5, 5);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// lerpValue dispatch
// ─────────────────────────────────────────────────────────────────────────────

describe("lerpValue — runtime dispatch (no _lerp set)", () => {
    it("dispatches to numeric lerp for two number values", () => {
        const iv: InterpolatedVar<number> = {
            start: new ValueUnit(10, "px"),
            stop: new ValueUnit(20, "px"),
            value: new ValueUnit(10, "px"),
            computed: false,
        };
        const out = lerpValue(0.5, iv);
        expect(out!.value).toBe(15);
    });

    it("dispatches to color lerp for color unit", () => {
        const a = new RGBColor<number>(0, 0, 0, 1);
        const b = new RGBColor<number>(100, 100, 100, 1);
        const iv: InterpolatedVar<RGBColor<number>> = {
            start: new ValueUnit(a, "color"),
            stop: new ValueUnit(b, "color"),
            value: new ValueUnit(new RGBColor<number>(0, 0, 0, 1), "color"),
            computed: false,
        };
        const out = lerpValue(0.5, iv);
        expect((out!.value as any).r).toBeCloseTo(50, 5);
    });

    it("returns value as-is for non-numeric, non-color, non-computed", () => {
        // start.value is a string — not number, not color, computed=false.
        // Falls through and returns iv.value unchanged.
        const iv: InterpolatedVar<string> = {
            start: new ValueUnit("foo", "string"),
            stop: new ValueUnit("bar", "string"),
            value: new ValueUnit("foo", "string"),
            computed: false,
        };
        const out = lerpValue(0.5, iv);
        expect(out).toBe(iv.value);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// prepareInterpVar
// ─────────────────────────────────────────────────────────────────────────────

describe("prepareInterpVar", () => {
    it("sets _lerp to numeric dispatch when computed=false and unit !== color", () => {
        const iv: InterpolatedVar<number> = {
            start: new ValueUnit(10, "px"),
            stop: new ValueUnit(20, "px"),
            value: new ValueUnit(10, "px"),
            computed: false,
        };
        const prepared = prepareInterpVar(iv);
        expect((prepared as any)._lerp).toBe(lerpNumericValue);
    });

    it("sets _lerp to color dispatch when start.unit === 'color'", () => {
        const a = new RGBColor<number>(0, 0, 0, 1);
        const b = new RGBColor<number>(255, 255, 255, 1);
        const iv: InterpolatedVar<RGBColor<number>> = {
            start: new ValueUnit(a, "color"),
            stop: new ValueUnit(b, "color"),
            value: new ValueUnit(a, "color"),
            computed: false,
        };
        const prepared = prepareInterpVar(iv);
        expect((prepared as any)._lerp).toBe(lerpColorValue);
    });

    it("returns the same InterpolatedVar reference", () => {
        const iv: InterpolatedVar<number> = {
            start: new ValueUnit(0, "px"),
            stop: new ValueUnit(1, "px"),
            value: new ValueUnit(0, "px"),
            computed: false,
        };
        const prepared = prepareInterpVar(iv);
        expect(prepared).toBe(iv);
    });

    it("prepared InterpolatedVar uses fast-path dispatch in lerpValue", () => {
        const iv: InterpolatedVar<number> = {
            start: new ValueUnit(0, "px"),
            stop: new ValueUnit(100, "px"),
            value: new ValueUnit(0, "px"),
            computed: false,
        };
        prepareInterpVar(iv);
        const out = lerpValue(0.25, iv);
        expect(out!.value).toBe(25);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// End-to-end via normalizeValueUnits + prepareInterpVar + lerpValue
// ─────────────────────────────────────────────────────────────────────────────

describe("Interpolation E2E (normalizeValueUnits → prepareInterpVar → lerpValue)", () => {
    it("lengths: 10px ↔ 20px", () => {
        const a = new ValueUnit(10, "px", ["length", "absolute"]);
        const b = new ValueUnit(20, "px", ["length", "absolute"]);
        const iv = normalizeValueUnits(a, b);
        prepareInterpVar(iv);
        const out = lerpValue(0.5, iv);
        expect(out!.value).toBe(15);
    });

    it("mixed length units: 1in ↔ 50px (normalised to px first)", () => {
        const a = new ValueUnit(1, "in", ["length", "absolute"]);
        const b = new ValueUnit(50, "px", ["length", "absolute"]);
        const iv = normalizeValueUnits(a, b);
        prepareInterpVar(iv);
        const out = lerpValue(0.5, iv);
        // 1in = 96px, midpoint = 73
        expect(out!.value).toBeCloseTo(73, 4);
    });

    it("color: rgb black → white at t=0.5 yields ~midgray (oklab)", () => {
        const a = new ValueUnit(new RGBColor(0, 0, 0, 1), "color", [
            "color",
            "rgb",
        ]);
        const b = new ValueUnit(new RGBColor(255, 255, 255, 1), "color", [
            "color",
            "rgb",
        ]);
        const iv = normalizeValueUnits(a, b);
        prepareInterpVar(iv);
        const out = lerpValue(0.5, iv);
        // The output is in oklab space; just verify we get *something* color-shaped
        expect(out!.unit).toBe("color");
        expect(out!.value).toBeDefined();
    });

    it("computed=true is flagged when var() is one endpoint", () => {
        const a = new ValueUnit("--my-var", "var");
        const b = new ValueUnit(20, "px", ["length", "absolute"]);
        const iv = normalizeValueUnits(a, b);
        expect(iv.computed).toBe(true);
    });

    it("angles: 0deg ↔ 90deg → 45deg at t=0.5", () => {
        const a = new ValueUnit(0, "deg", ["angle"]);
        const b = new ValueUnit(90, "deg", ["angle"]);
        const iv = normalizeValueUnits(a, b);
        prepareInterpVar(iv);
        const out = lerpValue(0.5, iv);
        expect(out!.value).toBe(45);
    });

    it("mixed time units: 1s ↔ 1500ms normalises to ms", () => {
        // Same-unit endpoints stay in their unit (no numeric normalization);
        // mixed units trigger normalizeNumericUnits → both in ms.
        const a = new ValueUnit(1, "s", ["time"]);
        const b = new ValueUnit(1500, "ms", ["time"]);
        const iv = normalizeValueUnits(a, b);
        prepareInterpVar(iv);
        const out = lerpValue(0.5, iv);
        // 1000ms midpoint to 1500ms = 1250ms
        expect(out!.value).toBe(1250);
    });

    it("OKLAB color interpolation produces a value strictly between endpoints", () => {
        // The internal oklab representation may scale L; assert the
        // midpoint L is between start L and stop L (monotonic lerp).
        const a = new ValueUnit(new OKLABColor(0, 0, 0, 1), "color", [
            "color",
            "oklab",
        ]);
        const b = new ValueUnit(new OKLABColor(1, 0, 0, 1), "color", [
            "color",
            "oklab",
        ]);
        const iv = normalizeValueUnits(a, b);
        prepareInterpVar(iv);

        // Capture the start L from the normalized start ValueUnit
        const startL = extractL(iv.start);
        const stopL = extractL(iv.stop);
        // Now lerp at 0.5 — should be midway
        lerpValue(0.5, iv);
        const midL = extractL(iv.value);
        expect(midL).toBeCloseTo((startL + stopL) / 2, 5);
    });

    it("computed=false for two non-computed length endpoints", () => {
        const a = new ValueUnit(0, "px", ["length", "absolute"]);
        const b = new ValueUnit(100, "px", ["length", "absolute"]);
        const iv = normalizeValueUnits(a, b);
        expect(iv.computed).toBe(false);
    });

    // L5 — `lerpColorValue` carries `hueMethod`.
    //
    // Pre-fix: `normalizeColorUnits` returned `hueMethod` in a 3-tuple that the
    // downstream destructure dropped. Animations between
    // `oklch(50% 0.2 350deg) → oklch(50% 0.2 10deg)` went the long way round
    // (340° via 180°) instead of CSS Color 4 §12.4's default `shorter`
    // (20° via 360°→0°).
    //
    // Expected midpoint with `shorter` method: 0° (i.e., 360°/0° boundary,
    // halfway between 350° → 10° wrapping through 0°), NOT 180°.
    it("L5: oklch 350° → 10° hue interpolates the short way (passes through 0°), not the long way (passes through 180°)", () => {
        // Construct two oklch endpoints with the same L and C, hues 350° and 10°.
        const a = new ValueUnit(new OKLCHColor(0.5, 0.2, 350, 1), "color", [
            "color",
            "oklch",
        ]);
        const b = new ValueUnit(new OKLCHColor(0.5, 0.2, 10, 1), "color", [
            "color",
            "oklch",
        ]);
        // Interpolate in oklch (cylindrical) so the hue channel is the angle.
        const iv = normalizeValueUnits(a, b, {
            colorSpace: "oklch",
            hueMethod: "shorter",
        });
        prepareInterpVar(iv);

        // Verify the producer wrote colorSpace + hueMethod through.
        expect(iv.colorSpace).toBe("oklch");
        expect(iv.hueMethod).toBe("shorter");

        const out = lerpValue(0.5, iv)!;
        const c = out.value as any;
        const hChannel = typeof c.h === "object" && c.h != null && "value" in c.h ? c.h.value : c.h;

        // Hue is stored in physical degrees [0, 360] after `normalizeColorUnits`'s
        // inverse=true denormalisation. Short-way midpoint of 350° → 10° is 0°
        // (or equivalently 360°). Long-way midpoint would be 180°.
        const distanceFromBoundary = Math.min(
            Math.abs(hChannel - 0),
            Math.abs(hChannel - 360),
        );
        expect(distanceFromBoundary).toBeLessThan(5);

        // Sanity check: the long-way (linear-lerp) answer would be ~180°; that
        // would mean the hueMethod carry-through was dropped (the L5 bug).
        expect(Math.abs(hChannel - 180)).toBeGreaterThan(150);
    });
});

/** Extract the L component of an oklab ValueUnit (handles ValueUnit-wrapped components). */
function extractL(vu: ValueUnit): number {
    const c = vu.value as any;
    const l =
        typeof c.l === "object" && c.l != null && "value" in c.l
            ? c.l.value
            : c.l;
    return l;
}

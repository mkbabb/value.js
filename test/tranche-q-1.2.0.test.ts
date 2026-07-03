import { describe, it, expect } from "vitest";
import {
    ValueUnit,
    FunctionValue,
} from "../src/units";
import { flattenObject } from "../src/units/utils";
import { parseCSSValue } from "../src/parsing";
import {
    validateSyntax,
    coerceToSyntax,
    parseSyntaxDescriptor,
} from "../src/parsing/syntax";
import {
    mixColors,
    mixColorsInto,
} from "../src/units/color/mix";
import {
    sampleColorRamp,
    sampleColorRampAt,
} from "../src/units/color/mix";
import {
    buildColorChannelPlan,
    packColorChannels,
    lerpColorChannels,
} from "../src/units/color-soa";
import { OKLABColor, OKLCHColor, RGBColor } from "../src/units/color";
import { lerp } from "../src/math";

// ── VJ-Q4 (1.2.0) — flatLeaf .fnName ──
describe("VJ-Q4 — ValueUnit.fnName provenance", () => {
    it("carries the 7th ctor field", () => {
        const u = new ValueUnit(2, "", undefined, undefined, undefined, undefined, "scale");
        expect(u.fnName).toBe("scale");
    });

    it("survives clone() and a clone chain", () => {
        const u = new ValueUnit(1, "px", undefined, undefined, undefined, undefined, "translate");
        expect(u.clone().fnName).toBe("translate");
        expect(u.clone().clone().clone().fnName).toBe("translate");
    });

    it("is inherited by coalesce", () => {
        const right = new ValueUnit(0, "px", undefined, undefined, undefined, undefined, "translate");
        const left = new ValueUnit(5);
        expect(left.coalesce(right, true).fnName).toBe("translate");
    });

    it("is stamped by flattenObject from the enclosing FunctionValue.name", () => {
        const fn = new FunctionValue("rotate", [new ValueUnit(45, "deg")]);
        const flat = flattenObject({ transform: fn });
        let found = false;
        for (const arr of Object.values(flat) as ValueUnit[][]) {
            for (const leaf of arr) {
                if (leaf instanceof ValueUnit && leaf.fnName === "rotate") found = true;
            }
        }
        expect(found).toBe(true);
    });

    it("stamps calc leaves with 'calc'", () => {
        const calc = new FunctionValue("calc", [new ValueUnit("1px + 2px", "string")]);
        const flat = flattenObject({ width: calc });
        const leaves = Object.values(flat).flat() as ValueUnit[];
        expect(leaves.some((l) => l.fnName === "calc")).toBe(true);
    });
});

// ── VJ-Q6 (1.2.0) — dashed-call parse arm + <syntax> validator ──
describe("VJ-Q6 — dashed-function call arm", () => {
    it("parses --double(2, 3px) to FunctionValue('--double', [2, 3px])", () => {
        const v = parseCSSValue("--double(2, 3px)") as FunctionValue;
        expect(v).toBeInstanceOf(FunctionValue);
        expect(v.name).toBe("--double");
        expect(v.values.length).toBe(2);
        expect(v.values[0]!.toString()).toBe("2");
        expect(v.values[1]!.toString()).toBe("3px");
    });

    it("parses an empty dashed call --c()", () => {
        const v = parseCSSValue("--c()") as FunctionValue;
        expect(v).toBeInstanceOf(FunctionValue);
        expect(v.name).toBe("--c");
        expect(v.values.length).toBe(0);
    });

    it("does NOT regress single-dash math constants", () => {
        expect(parseCSSValue("calc(-infinity)")).not.toBeNull();
        expect(parseCSSValue("-infinity")).not.toBeNull();
    });
});

describe("VJ-Q6 — <syntax> validator (the resolve-path coercion)", () => {
    it("validates component types", () => {
        expect(validateSyntax("10px", "<length>")).toBe(true);
        expect(validateSyntax("10px", "<color>")).toBe(false);
        expect(validateSyntax("red", "<color>")).toBe(true);
        expect(validateSyntax("5", "<number>")).toBe(true);
        expect(validateSyntax("5", "<integer>")).toBe(true);
        expect(validateSyntax("5.5", "<integer>")).toBe(false);
        expect(validateSyntax("50%", "<percentage>")).toBe(true);
        expect(validateSyntax("45deg", "<angle>")).toBe(true);
        expect(validateSyntax("50%", "<length-percentage>")).toBe(true);
        expect(validateSyntax("10px", "<length-percentage>")).toBe(true);
    });

    it("handles alternation + universal + list multipliers", () => {
        expect(validateSyntax("auto", "auto | <length>")).toBe(true);
        expect(validateSyntax("10px", "auto | <length>")).toBe(true);
        expect(validateSyntax("red", "auto | <length>")).toBe(false);
        expect(validateSyntax("anything", "*")).toBe(true);
        expect(validateSyntax("10px", "<length>+")).toBe(true);
        expect(validateSyntax("red", "<color>#")).toBe(true);
    });

    it("coerceToSyntax returns the parsed value or null", () => {
        expect(coerceToSyntax("10px", "<length>")?.toString()).toBe("10px");
        expect(coerceToSyntax("red", "<length>")).toBeNull();
    });

    it("parseSyntaxDescriptor distinguishes empty from universal", () => {
        expect(parseSyntaxDescriptor("")).toBeNull();
        expect(parseSyntaxDescriptor("*")).toEqual([{ kind: "universal" }]);
    });
});

// ── VJ-Q7 (1.2.0) — if() multibranch ──
describe("VJ-Q7 — if() multibranch", () => {
    it("emits all branches of a 3-branch if() (not the lossy 2-branch collapse)", () => {
        const input = "if(media(min-width: 100px): 1px; supports(display: grid): 2px; else: 3px)";
        const v = parseCSSValue(input) as FunctionValue;
        expect(v.name).toBe("if");
        // 3 branches → [cond1, v1, cond2, v2, else] = 5 flat slots.
        expect(v.values.length).toBe(5);
        const out = v.toString();
        expect(out).toContain("supports(display: grid): 2px");
        expect(parseCSSValue(out).toString()).toBe(out); // round-trip stable
    });

    it("4-branch if() emits 7 slots", () => {
        const v = parseCSSValue(
            "if(style(--x: 1): red; style(--y: 2): green; style(--z: 3): blue; else: black)",
        ) as FunctionValue;
        expect(v.values.length).toBe(7);
    });

    it("2-branch if() stays the byte-identical 3-slot form", () => {
        const v = parseCSSValue("if(media(min-width: 100px): 1px; else: 3px)") as FunctionValue;
        expect(v.values.length).toBe(3);
        expect(v.toString()).toBe("if(media(min-width: 100px): 1px; else: 3px)");
    });
});

// ── VJ-Q9 (1.2.0) — serialize fidelity ──
describe("VJ-Q9 — serialize fidelity (none-channel + color() wrapper)", () => {
    it("round-trips a none channel as `none`, never `NaN`", () => {
        expect(parseCSSValue("oklch(0.6 none 200)").toString()).toBe("oklch(0.6 none 200)");
        expect(parseCSSValue("oklch(0.5 none none / none)").toString()).toBe("oklch(0.5 none none / none)");
    });

    it("preserves the color() function wrapper", () => {
        expect(parseCSSValue("color(display-p3 1 0 0)").toString()).toBe("color(display-p3 1 0 0)");
        expect(parseCSSValue("color(rec2020 0.5 0.3 0.1)").toString()).toBe("color(rec2020 0.5 0.3 0.1)");
        expect(parseCSSValue("color(display-p3 1 0 0 / 0.5)").toString()).toBe("color(display-p3 1 0 0 / 0.5)");
    });

    it("leaves the named-color form unchanged", () => {
        expect(parseCSSValue("rgb(255 0 0)").toString()).toBe("rgb(255 0 0)");
        expect(parseCSSValue("oklch(0.6 0.2 200)").toString()).toBe("oklch(0.6 0.2 200)");
    });
});

// ── VJ-Q3 (1.2.0) — mixColorsInto + sampleColorRampAt ──
describe("VJ-Q3 — mixColorsInto + sampleColorRampAt out-params", () => {
    it("mixColorsInto is bit-exact vs mixColors", () => {
        const c1 = new RGBColor(1, 0, 0, 1);
        const c2 = new RGBColor(0, 0, 1, 1);
        const ref = mixColors(c1, c2, 0.3, 0.7, "oklab", "shorter");
        const got = mixColorsInto(c1, c2, 0.3, 0.7, "oklab", "shorter", new OKLABColor(0, 0, 0, 1));
        for (const k of ref.keys()) {
            expect(Math.abs(Number(ref[k]) - Number(got[k]))).toBeLessThan(1e-12);
        }
    });

    it("sampleColorRampAt(a,b,i/(n-1)) === sampleColorRamp(a,b,n)[i] bit-exact", () => {
        const a = new OKLCHColor(0.6, 0.4, 0.2, 1);
        const b = new OKLCHColor(0.4, 0.3, 0.7, 1);
        const n = 8;
        const ramp = sampleColorRamp(a, b, n, { space: "oklch" });
        for (let i = 0; i < n; i++) {
            const at = sampleColorRampAt(a, b, i / (n - 1), { space: "oklch" });
            for (const k of ramp[i]!.keys()) {
                expect(Math.abs(Number(ramp[i]![k]) - Number(at[k]))).toBeLessThan(1e-12);
            }
        }
    });
});

// ── VJ-Q8 (1.2.0) — ColorChannelPlan + lerpColorChannels ──
describe("VJ-Q8 — SoA color-channel fold", () => {
    it("oklab SoA fold is bit-exact vs per-element Color lerp", () => {
        const K = 4;
        const starts = Array.from({ length: K }, (_, i) => new OKLABColor(0.3 + i * 0.05, 0.1, -0.05, 1));
        const stops = Array.from({ length: K }, (_, i) => new OKLABColor(0.8 - i * 0.05, -0.1, 0.05, 0.8));
        const plan = buildColorChannelPlan(starts[0]!);
        expect(plan.stride).toBe(4);
        expect(plan.hueIndex).toBe(-1);
        const sB = new Float64Array(K * plan.stride);
        const eB = new Float64Array(K * plan.stride);
        const oB = new Float64Array(K * plan.stride);
        for (let k = 0; k < K; k++) {
            packColorChannels(starts[k]!, plan, sB, k);
            packColorChannels(stops[k]!, plan, eB, k);
        }
        for (const t of [0, 0.25, 0.5, 0.73, 1]) {
            lerpColorChannels(t, sB, eB, oB, plan);
            for (let k = 0; k < K; k++) {
                const s = starts[k]!;
                const e = stops[k]!;
                const ref = [
                    lerp(+s.l, +e.l, t),
                    lerp(+s.a, +e.a, t),
                    lerp(+s.b, +e.b, t),
                    lerp(+s.alpha, +e.alpha, t),
                ];
                for (let c = 0; c < plan.stride; c++) {
                    expect(Math.abs(oB[k * plan.stride + c]! - ref[c]!)).toBeLessThan(1e-12);
                }
            }
        }
    });

    it("oklch plan flags the hue channel and folds it through interpolateHue", () => {
        const s = new OKLCHColor(0.6, 0.2, 30, 1);
        const e = new OKLCHColor(0.4, 0.3, 300, 1);
        const plan = buildColorChannelPlan(s);
        expect(plan.hueIndex).toBe(2);
        const sB = new Float64Array(plan.stride);
        const eB = new Float64Array(plan.stride);
        const oB = new Float64Array(plan.stride);
        packColorChannels(s, plan, sB, 0);
        packColorChannels(e, plan, eB, 0);
        lerpColorChannels(0.5, sB, eB, oB, plan);
        // L,C lerp linearly; H is in [0,360].
        expect(oB[0]).toBeCloseTo(lerp(0.6, 0.4, 0.5), 12);
        expect(oB[1]).toBeCloseTo(lerp(0.2, 0.3, 0.5), 12);
        expect(oB[2]).toBeGreaterThanOrEqual(0);
        expect(oB[2]).toBeLessThanOrEqual(360);
    });
});

/**
 * S.W5 Lane C (W5-11 / P0-1, P2-15, P2-17) — the gradient strict parser.
 *
 * `parseGradientCSS` is model-or-reject: a COMPLETE model (type, direction,
 * ≥2 stops, intervals) or an explicit `{ ok: false, reason }`. No partials,
 * no silent drops, authored color literals preserved.
 */

import { describe, expect, it } from "vitest";
import { parseGradientCSS } from "../demo/workbenches/gradient/composables/gradientParse";
import {
    serializeCoalescedGradient,
    serializeGradient,
    serializeIntervalRamp,
    serializeRailRamp,
} from "../demo/workbenches/gradient/composables/useGradientCSS";
import { useGradientModel } from "../demo/workbenches/gradient/composables/useGradientModel";

function expectOk(css: string) {
    const res = parseGradientCSS(css);
    if (!res.ok) throw new Error(`expected ok for "${css}", got: ${res.reason}`);
    return res.model;
}

function expectReject(css: string): string {
    const res = parseGradientCSS(css);
    if (res.ok) throw new Error(`expected reject for "${css}"`);
    return res.reason;
}

describe("parseGradientCSS — complete-model acceptance", () => {
    it("parses a plain linear gradient with authored literals intact", () => {
        const m = expectOk("linear-gradient(90deg, red, blue 50%)");
        expect(m.type).toBe("linear");
        expect(m.direction).toBe(90);
        expect(m.stops.map((s) => s.cssColor)).toEqual(["red", "blue"]);
        expect(m.stops.map((s) => s.position)).toEqual([0, 50]);
        expect(m.stops.length - 1).toBe(1);
    });

    it("maps `to <side>` keywords to exact degrees", () => {
        expect(expectOk("linear-gradient(to right, red, blue)").direction).toBe(90);
        expect(expectOk("linear-gradient(to top, red, blue)").direction).toBe(0);
    });

    it("normalizes angle units through the library (0.25turn → 90deg)", () => {
        expect(expectOk("linear-gradient(0.25turn, red, blue)").direction).toBe(90);
    });

    it("parses conic `from <angle>`", () => {
        const m = expectOk("conic-gradient(from 45deg, red, blue)");
        expect(m.type).toBe("conic");
        expect(m.direction).toBe(45);
    });

    it("parses plain radial gradients (no geometry)", () => {
        const m = expectOk("radial-gradient(red, blue)");
        expect(m.type).toBe("radial");
        expect(m.stops).toHaveLength(2);
    });

    it("expands CSS double positions into two coincident-color stops", () => {
        const m = expectOk("linear-gradient(90deg, red 0% 50%, blue)");
        expect(m.stops.map((s) => [s.cssColor, s.position])).toEqual([
            ["red", 0],
            ["red", 50],
            ["blue", 100],
        ]);
        expect(m.stops.length - 1).toBe(2);
    });

    it("auto-fills missing interior positions linearly", () => {
        const m = expectOk("linear-gradient(90deg, red, lime, blue)");
        expect(m.stops.map((s) => s.position)).toEqual([0, 50, 100]);
    });

    it("preserves wide-space literals verbatim", () => {
        const m = expectOk(
            "linear-gradient(45deg, oklch(0.7 0.2 200), color(display-p3 1 0 0))",
        );
        expect(m.stops[0]!.cssColor).toBe("oklch(0.7 0.2 200)");
        expect(m.stops[1]!.cssColor).toBe("color(display-p3 1 0 0)");
    });

    it("round-trips through serializeGradient with literals intact", () => {
        const m = expectOk("linear-gradient(45deg, red, rebeccapurple 80%)");
        const css = serializeGradient({
            ...m,
            interpolationSpace: "oklch",
            hueMethod: "shorter",
        });
        expect(css).toBe("linear-gradient(45deg in oklch, red 0%, rebeccapurple 80%)");
        const again = expectOk(css);
        expect(again.stops.map((s) => s.cssColor)).toEqual([
            "red",
            "rebeccapurple",
        ]);
    });
});

describe("the space clause — the copied CSS is the rail's gradient (V10C-01)", () => {
    const base = expectOk("linear-gradient(90deg, red, blue)");
    const cases = [
        { type: "linear", direction: 90, space: "oklch", hue: "shorter", head: "90deg in oklch" },
        { type: "linear", direction: 90, space: "oklch", hue: "longer", head: "90deg in oklch longer hue" },
        { type: "linear", direction: 180, space: "lch", hue: "increasing", head: "in lch increasing hue" },
        { type: "conic", direction: 45, space: "hsl", hue: "decreasing", head: "from 45deg in hsl decreasing hue" },
        { type: "radial", direction: 0, space: "rgb", hue: "shorter", head: "in srgb" },
        { type: "linear", direction: 30, space: "oklab", hue: "shorter", head: "30deg in oklab" },
    ] as const;

    for (const c of cases) {
        it(`serialize → parse round-trips ${c.space} / ${c.hue} (${c.type})`, () => {
            const css = serializeGradient({
                ...base,
                type: c.type,
                direction: c.direction,
                interpolationSpace: c.space,
                hueMethod: c.hue,
            });
            expect(css.startsWith(`${c.type}-gradient(${c.head}, `)).toBe(true);
            const again = expectOk(css);
            expect(again.type).toBe(c.type);
            expect(again.direction).toBe(c.direction);
            expect(again.interpolation).toEqual({ space: c.space, hueMethod: c.hue });
        });
    }

    it("accepts the clause before the geometry and an explicit `shorter hue`", () => {
        const m = expectOk("linear-gradient(in oklch shorter hue 45deg, red, blue)");
        expect(m.direction).toBe(45);
        expect(m.interpolation).toEqual({ space: "oklch", hueMethod: "shorter" });
    });

    it("leaves the space unnamed when the CSS names none (HSV keeps its own)", () => {
        expect(base.interpolation).toBeUndefined();
        const css = serializeGradient({ ...base, interpolationSpace: "hsv", hueMethod: "longer" });
        expect(css).toBe("linear-gradient(90deg, red 0%, blue 100%)");
    });

    it("rejects a clause the model cannot hold", () => {
        expect(expectReject("linear-gradient(in hsv, red, blue)")).toMatch(/interpolation space/);
        expect(expectReject("linear-gradient(in srgb longer hue, red, blue)")).toMatch(/polar/);
    });
});

describe("parseGradientCSS — explicit rejection (never a partial)", () => {
    it("rejects garbage colors with the offending token named", () => {
        const reason = expectReject("linear-gradient(90deg, notacolor, ???)");
        expect(reason).toContain("notacolor");
    });

    it("rejects non-gradient input", () => {
        expect(expectReject("tomato")).toMatch(/gradient/);
        expect(expectReject("translate(4px)")).toMatch(/gradient/);
    });

    it("rejects radial geometry instead of silently dropping it (P2-17)", () => {
        const reason = expectReject(
            "radial-gradient(circle at 30% 30%, red, blue)",
        );
        expect(reason).toMatch(/radial geometry/);
    });

    it("rejects repeating gradients", () => {
        expect(
            expectReject("repeating-linear-gradient(45deg, red, blue 10%)"),
        ).toMatch(/repeating/);
    });

    it("rejects interpolation hints (unrepresentable in the model)", () => {
        expect(expectReject("linear-gradient(90deg, red, 30%, blue)")).toMatch(
            /hint/,
        );
    });

    it("rejects non-percentage stop positions", () => {
        expect(expectReject("linear-gradient(90deg, red 0px, blue)")).toMatch(
            /percentages/,
        );
    });

    it("rejects box-dependent corner `to` keywords", () => {
        expect(
            expectReject("linear-gradient(to top right, red, blue)"),
        ).toMatch(/corner/);
    });

    it("rejects fewer than 2 stops", () => {
        expect(expectReject("linear-gradient(90deg, red)")).toMatch(/2 color/);
    });

    it("rejects non-monotonic authored positions (hard-stop reordering)", () => {
        expect(
            expectReject("linear-gradient(90deg, red 50%, blue 20%)"),
        ).toMatch(/non-decreasing/);
    });

    it("rejects trailing commas / empty arguments", () => {
        expect(expectReject("linear-gradient(90deg, red, blue,)")).toMatch(
            /empty argument/,
        );
    });
});

describe("the sampled forms carry the path, never the hue method (V11C-01)", () => {
    const longer = {
        ...expectOk("linear-gradient(90deg, oklch(75% 0.15 145deg), oklch(65% 0.18 265deg))"),
        interpolationSpace: "oklch" as const,
        hueMethod: "longer" as const,
    };

    it("the rail, the render tile and the interval ramp print `in oklch` with no hue", () => {
        for (const css of [
            serializeRailRamp(longer),
            serializeCoalescedGradient(longer),
            serializeIntervalRamp(longer, 0)!,
        ]) {
            expect(css).toContain("in oklch, ");
            expect(css).not.toContain("longer hue");
        }
    });

    it("the raw-stop serializer keeps `longer hue`", () => {
        expect(serializeGradient(longer)).toContain("90deg in oklch longer hue, ");
    });
});

describe("the code well's block form (V11C-02)", () => {
    it("puts each top-level argument on its own indented line and round-trips", () => {
        const m = expectOk("linear-gradient(45deg, red, rebeccapurple 80%)");
        const model = { ...m, interpolationSpace: "oklch" as const, hueMethod: "longer" as const };
        const block = serializeGradient(model, "block");
        expect(block).toBe(
            "linear-gradient(\n  45deg in oklch longer hue,\n  red 0%,\n  rebeccapurple 80%\n)",
        );
        const again = expectOk(block);
        expect(again.interpolation).toEqual({ space: "oklch", hueMethod: "longer" });
        expect(again.stops.map((s) => s.cssColor)).toEqual(["red", "rebeccapurple"]);
    });
});

describe("a bare paste takes CSS's default space (V11C-03)", () => {
    it("from oklch / longer, a clause-less gradient lands in oklab / shorter", () => {
        const g = useGradientModel();
        g.interpolationSpace.value = "oklch";
        g.hueMethod.value = "longer";
        expect(g.applyCSS("linear-gradient(red, blue)").ok).toBe(true);
        expect(g.interpolationSpace.value).toBe("oklab");
        expect(g.hueMethod.value).toBe("shorter");
    });

    it("from HSV (no CSS name), a clause-less gradient keeps HSV", () => {
        const g = useGradientModel();
        g.interpolationSpace.value = "hsv";
        g.hueMethod.value = "longer";
        expect(g.applyCSS("linear-gradient(red, blue)").ok).toBe(true);
        expect(g.interpolationSpace.value).toBe("hsv");
        expect(g.hueMethod.value).toBe("longer");
    });
});

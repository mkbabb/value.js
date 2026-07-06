/**
 * S.W5 Lane C (W5-11 / P0-1, P2-15, P2-17) — the gradient strict parser.
 *
 * `parseGradientCSS` is model-or-reject: a COMPLETE model (type, direction,
 * ≥2 stops, intervals) or an explicit `{ ok: false, reason }`. No partials,
 * no silent drops, authored color literals preserved.
 */

import { describe, expect, it } from "vitest";
import {
    parseGradientCSS,
    serializeGradient,
} from "../demo/@/components/custom/gradient/composables/useGradientCSS";

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
        expect(m.intervals).toHaveLength(1);
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
        expect(m.intervals).toHaveLength(2);
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
        expect(css).toBe("linear-gradient(45deg, red 0%, rebeccapurple 80%)");
        const again = expectOk(css);
        expect(again.stops.map((s) => s.cssColor)).toEqual([
            "red",
            "rebeccapurple",
        ]);
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

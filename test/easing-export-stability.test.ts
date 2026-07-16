import { describe, expect, it } from "vitest";
import * as easing from "../src/subpaths/easing";
import {
    CubicBezier,
    bezierPresets,
    easing as resolveEasing,
    jumpTerms,
    steppedEase,
} from "../src/subpaths/easing";

const runtimeExports = [
    "CubicBezier",
    "bezierPresets",
    "easeInBounce",
    "easeInOutCirc",
    "easeInOutCubic",
    "easeInOutExpo",
    "easeInOutQuad",
    "easeInOutSine",
    "easeOutCubic",
    "easeOutExpo",
    "easing",
    "jumpTerms",
    "linear",
    "linearEasing",
    "smoothStep3",
    "steppedEase",
] as const;

describe("/easing Value 4 surface", () => {
    it("exports exactly the canonical runtime names", () => {
        expect(Object.keys(easing).sort()).toEqual([...runtimeExports].sort());
    });

    it("constructs a failure-explicit cubic bezier", () => {
        const result = CubicBezier(0.42, 0, 0.58, 1);
        expect(result.ok).toBe(true);
        if (!result.ok) throw new Error(result.error.code);
        expect(result.value(0)).toBe(0);
        expect(result.value(0.5)).toBeCloseTo(0.5, 6);
        expect(result.value(1)).toBe(1);
    });

    it("matches the published ease midpoint oracle", () => {
        const result = CubicBezier(0.25, 0.1, 0.25, 1);
        if (!result.ok) throw new Error(result.error.code);
        expect(result.value(0.5)).toBeCloseTo(0.8024, 3);
    });

    it("constructs a failure-explicit step function", () => {
        const result = steppedEase(4, "jump-end");
        expect(result.ok).toBe(true);
        if (!result.ok) throw new Error(result.error.code);
        expect(result.value(0)).toBe(0);
        expect(result.value(0.99)).toBeCloseTo(0.75, 10);
        expect(result.value(1)).toBe(1);
    });

    it("retains the canonical preset and jump catalogs", () => {
        for (const [name, points] of Object.entries(bezierPresets)) {
            expect(points, name).toHaveLength(4);
            expect(points.every(Number.isFinite), name).toBe(true);
        }
        expect(jumpTerms).toEqual([
            "jump-start",
            "jump-end",
            "jump-none",
            "jump-both",
        ]);
    });

    it("pins all six quart/quint catalog rows and resolves each one", () => {
        const required = {
            "ease-in-quart": [0.895, 0.03, 0.685, 0.22],
            "ease-out-quart": [0.165, 0.84, 0.44, 1],
            "ease-in-out-quart": [0.77, 0, 0.175, 1],
            "ease-in-quint": [0.755, 0.05, 0.855, 0.06],
            "ease-out-quint": [0.23, 1, 0.32, 1],
            "ease-in-out-quint": [0.86, 0, 0.07, 1],
        } as const;
        for (const [name, points] of Object.entries(required)) {
            expect(bezierPresets[name as keyof typeof required]).toEqual(points);
            const resolved = resolveEasing(name);
            expect(resolved.ok && Number.isFinite(resolved.value(0.37)), name)
                .toBe(true);
        }
    });

    it("implements every step-position boundary", () => {
        const expected = {
            "jump-start": [0.25, 0.75, 1],
            "jump-end": [0, 0.5, 1],
            "jump-none": [0, 2 / 3, 1],
            "jump-both": [0.2, 0.6, 1],
        } as const;
        for (const [position, values] of Object.entries(expected)) {
            const result = steppedEase(4, position as keyof typeof expected);
            if (!result.ok) throw new Error(result.error.code);
            expect([result.value(0), result.value(0.5), result.value(1)])
                .toEqual(values);
        }
    });
});

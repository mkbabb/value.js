import { describe, expect, it } from "vitest";
import { parseTimingFunction } from "@src/subpaths/css";
import { CubicBezier, linearEasing, steppedEase } from "@src/subpaths/easing";

describe("parseTimingFunction", () => {
    it("parses keyword and cubic-bezier forms", () => {
        expect(parseTimingFunction("ease-in-out")).toEqual({
            ok: true,
            value: { kind: "keyword", name: "ease-in-out" },
            diagnostics: [],
        });
        expect(parseTimingFunction("cubic-bezier(0.25, 0.1, 0.25, 1)")).toEqual({
            ok: true,
            value: {
                kind: "cubic-bezier",
                x1: 0.25,
                y1: 0.1,
                x2: 0.25,
                y2: 1,
            },
            diagnostics: [],
        });
    });

    it("normalizes every step-position spelling", () => {
        for (const [input, position] of [
            ["steps(2, jump-start)", "jump-start"],
            ["steps(2, jump-end)", "jump-end"],
            ["steps(2, jump-none)", "jump-none"],
            ["steps(2, jump-both)", "jump-both"],
            ["steps(2, start)", "jump-start"],
            ["steps(2, end)", "jump-end"],
        ] as const) {
            expect(parseTimingFunction(input)).toEqual({
                ok: true,
                value: { kind: "steps", count: 2, position },
                diagnostics: [],
            });
        }
        expect(parseTimingFunction("step-start")).toMatchObject({
            ok: true,
            value: { kind: "steps", count: 1, position: "jump-start" },
        });
    });

    it("keeps authored linear stops structural and normalized", () => {
        expect(parseTimingFunction("linear(0, 0.5 25% 75%, 1)")).toEqual({
            ok: true,
            value: {
                kind: "linear-function",
                stops: [
                    { output: 0, input: [] },
                    { output: 0.5, input: [0.25, 0.75] },
                    { output: 1, input: [] },
                ],
            },
            diagnostics: [],
        });
    });

    it("hands typed numeric data to parser-free constructors", () => {
        const steps = parseTimingFunction("steps(4, jump-end)");
        if (!steps.ok || steps.value.kind !== "steps") throw new Error("steps parse failed");
        const stepped = steppedEase(steps.value.count, steps.value.position);
        if (!stepped.ok) throw new Error(stepped.error.code);
        expect(stepped.value(0.99)).toBe(0.75);

        const bezier = parseTimingFunction("cubic-bezier(0, 0, 1, 1)");
        if (!bezier.ok || bezier.value.kind !== "cubic-bezier") throw new Error("bezier parse failed");
        const curve = CubicBezier(bezier.value.x1, bezier.value.y1, bezier.value.x2, bezier.value.y2);
        if (!curve.ok) throw new Error(curve.error.code);
        expect(curve.value(0.5)).toBeCloseTo(0.5, 6);

        const linear = parseTimingFunction("linear(0 0%, 0.75 50%, 1 100%)");
        if (!linear.ok || linear.value.kind !== "linear-function") throw new Error("linear parse failed");
        const numeric = linearEasing(linear.value.stops.map((stop) => ({
            output: stop.output,
            input: stop.input[0] ?? 0,
        })));
        if (!numeric.ok) throw new Error(numeric.error.code);
        expect(numeric.value(0.5)).toBe(0.75);
    });

    it("returns diagnostics for malformed or invalid text", () => {
        for (const source of [
            "steps(0)",
            "steps(1, jump-none)",
            "steps(4.5)",
            "steps()",
            "cubic-bezier(-1, 0, 1, 1)",
            "linear()",
            "not-an-easing",
        ]) {
            const result = parseTimingFunction(source);
            expect(result.ok, source).toBe(false);
            if (result.ok) continue;
            expect(result.diagnostics.length, source).toBeGreaterThan(0);
        }
    });
});

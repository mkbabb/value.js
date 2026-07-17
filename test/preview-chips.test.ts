/**
 * T.W6 · W6-4 — O-14, the chip half of the PREVIEW TRUTH LAW (T-17).
 *
 * The byte-identity chain has two links; this oracle is the first:
 *   1. LIBRARY ≡ SAMPLER (here): the chip sampler's output is STRICTLY
 *      EQUAL to a direct recompute through the same library leaves
 *      (`mixColors` / `resolveCalibratedAtmosphere`) — the sampler
 *      composes, never re-derives, so equality is by construction and this
 *      oracle guards the construction.
 *   2. SAMPLER ≡ PAINT (the e2e leg, `o14-preview-truth.spec.ts`): every
 *      chip stamps its stops on `data-stops` and the painted gradient must
 *      embed exactly those stops in the live DOM.
 *
 * Plus the honesty contracts: fewer than 2 operands → null (honest absence,
 * never a canned swatch); unparseable operand → null; the joint-dedupe
 * arithmetic; the paintable-serialization shape.
 */

import { describe, expect, it } from "vitest";

import {
    mixColors,
    type AnyColor,
    type HueInterpolationMethod,
} from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";
import {
    RAMP_SAMPLE_COUNT,
    sampleInterpolationRamp,
    serializeStop,
} from "../demo/@/components/custom/color-chips/sample";
import { parseColorIn } from "../demo/color-session/color-utils";
import type { PickerColorIn, PickerSpace } from "../demo/color-session/picker-color";

const OPERANDS = ["oklch(0.62 0.27 9.8)", "rebeccapurple"] as const;
const OPERANDS_3 = [...OPERANDS, "rgb(20 120 200)"] as const;

function directRamp(
    from: AnyColor,
    to: AnyColor,
    count: number,
    space: PickerSpace,
    hue: HueInterpolationMethod,
): string[] {
    return Array.from({ length: count }, (_, index) => {
        const result = mixColors(from, to, index / (count - 1), { space, hue });
        if (!result.ok) throw new Error(result.error.code);
        return serializeStop(result.value as PickerColorIn<typeof space>);
    });
}

describe("O-14 · sampleInterpolationRamp ≡ the library (strict)", () => {
    it("two operands: every stop equals direct mixColors sampling", () => {
        const stops = sampleInterpolationRamp([...OPERANDS], "oklch", "longer");
        expect(stops).not.toBeNull();

        const a = parseColorIn(OPERANDS[0], "oklch");
        const b = parseColorIn(OPERANDS[1], "oklch");
        const perSegment = Math.max(2, Math.ceil(RAMP_SAMPLE_COUNT / 1) + 1);
        const direct = directRamp(a, b, perSegment, "oklch", "longer");

        expect(stops).toEqual(direct);
    });

    it("three operands: piecewise chain, joints deduped", () => {
        const stops = sampleInterpolationRamp([...OPERANDS_3], "oklab", "shorter")!;
        const perSegment = Math.max(2, Math.ceil(RAMP_SAMPLE_COUNT / 2) + 1);
        // 2 segments, second drops its inclusive start (the shared joint).
        expect(stops).toHaveLength(perSegment * 2 - 1);

        const [c0, c1, c2] = OPERANDS_3.map((css) => parseColorIn(css, "oklab"));
        const seg0 = directRamp(c0!, c1!, perSegment, "oklab", "shorter");
        const seg1 = directRamp(c1!, c2!, perSegment, "oklab", "shorter");

        expect(stops).toEqual([...seg0, ...seg1.slice(1)]);
    });

    it("every stop serializes paintable — oklch(L C H[ / A]), never a raw hsv()/xyz() string", () => {
        for (const space of ["hsv", "xyz", "lab", "hsl"] as const) {
            const stops = sampleInterpolationRamp([...OPERANDS], space, "shorter")!;
            expect(stops.length).toBeGreaterThanOrEqual(2);
            for (const s of stops) {
                expect(s).toMatch(/^oklch\(/);
                const parsed = parseCssColor(s);
                expect(parsed.ok && parsed.value.space).toBe("oklch");
            }
        }
    });

    it("honest absence: <2 operands → null; unparseable operand → null", () => {
        expect(sampleInterpolationRamp([], "oklch", "shorter")).toBeNull();
        expect(sampleInterpolationRamp([OPERANDS[0]], "oklch", "shorter")).toBeNull();
        expect(
            sampleInterpolationRamp([OPERANDS[0], "not-a-color"], "oklch", "shorter"),
        ).toBeNull();
    });
});

/**
 * T.W6 · W6-4 — O-14, the chip half of the PREVIEW TRUTH LAW (T-17).
 *
 * The byte-identity chain has two links; this oracle is the first:
 *   1. LIBRARY ≡ SAMPLER (here): the chip sampler's output is STRICTLY
 *      EQUAL to a direct recompute through the same library leaves
 *      (`sampleColorRamp` / `resolveCalibratedAtmosphere`) — the sampler
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

import { sampleColorRamp } from "@src/units/color/mix";
import type { Color } from "@src/units/color";
import {
    RAMP_SAMPLE_COUNT,
    sampleInterpolationRamp,
    serializeStop,
} from "../demo/@/components/custom/color-chips/sample";
import { cssToRawColor } from "../demo/@/lib/color-utils";
import { auroraHarmonyStops } from "../demo/@/components/custom/panes/aurora-harmony-stops";
import { resolveCalibratedAtmosphere } from "../demo/color-picker/composables/boot/atmosphere-calibration";
import { DEFAULT_AURORA_ATOMS } from "../demo/@/composables/color/aurora-atoms";

const OPERANDS = ["oklch(0.62 0.27 9.8)", "rebeccapurple"] as const;
const OPERANDS_3 = [...OPERANDS, "rgb(20 120 200)"] as const;

describe("O-14 · sampleInterpolationRamp ≡ the library (strict)", () => {
    it("two operands: every stop equals the direct sampleColorRamp stop", () => {
        const stops = sampleInterpolationRamp([...OPERANDS], "oklch", "longer");
        expect(stops).not.toBeNull();

        const a = cssToRawColor(OPERANDS[0], "oklch")!;
        const b = cssToRawColor(OPERANDS[1], "oklch")!;
        const perSegment = Math.max(2, Math.ceil(RAMP_SAMPLE_COUNT / 1) + 1);
        const direct = sampleColorRamp(a, b, perSegment, {
            space: "oklch",
            hueMethod: "longer",
        }).map((c) => serializeStop(c as Color<number>));

        expect(stops).toEqual(direct);
    });

    it("three operands: piecewise chain, joints deduped", () => {
        const stops = sampleInterpolationRamp([...OPERANDS_3], "oklab", "shorter")!;
        const perSegment = Math.max(2, Math.ceil(RAMP_SAMPLE_COUNT / 2) + 1);
        // 2 segments, second drops its inclusive start (the shared joint).
        expect(stops).toHaveLength(perSegment * 2 - 1);

        const [c0, c1, c2] = OPERANDS_3.map((css) => cssToRawColor(css, "oklab")!);
        const seg0 = sampleColorRamp(c0!, c1!, perSegment, {
            space: "oklab",
            hueMethod: "shorter",
        }).map((c) => serializeStop(c as Color<number>));
        const seg1 = sampleColorRamp(c1!, c2!, perSegment, {
            space: "oklab",
            hueMethod: "shorter",
        }).map((c) => serializeStop(c as Color<number>));

        expect(stops).toEqual([...seg0, ...seg1.slice(1)]);
    });

    it("every stop serializes paintable — oklch(L C H[ / A]), never a raw hsv()/xyz() string", () => {
        for (const space of ["hsv", "xyz", "lab", "hsl"] as const) {
            const stops = sampleInterpolationRamp([...OPERANDS], space, "shorter")!;
            expect(stops.length).toBeGreaterThanOrEqual(2);
            for (const s of stops) {
                expect(s).toMatch(/^oklch\([\d.]+ [\d.]+ [\d.]+( \/ [\d.]+)?\)$/);
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

describe("O-14 · auroraHarmonyStops ≡ the calibrated resolve (strict)", () => {
    it("each candidate harmony's strip is the palette selecting it yields", () => {
        const atoms = structuredClone(DEFAULT_AURORA_ATOMS);
        atoms.seed = "oklch(0.62 0.27 9.8)";
        for (const harmony of ["analogous", "triad", "monochrome"] as const) {
            const strip = auroraHarmonyStops(atoms, harmony);
            const direct = resolveCalibratedAtmosphere({
                ...atoms,
                harmony,
            }).palette;
            expect(strip).toHaveLength(direct.length);
            strip.forEach((s, i) => {
                const m = /^oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)$/.exec(s);
                expect(m, `stop shape: ${s}`).not.toBeNull();
                expect(Number(m![1])).toBeCloseTo(direct[i]!.L, 4);
                expect(Number(m![2])).toBeCloseTo(direct[i]!.C, 4);
                expect(Number(m![3])).toBeCloseTo(direct[i]!.h, 4);
            });
        }
    });
});

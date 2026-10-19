/**
 * SERVED MODEL: claude-opus-5[1m]
 *
 * X-W1 · X.W1.a — the spectrum-plate luma oracle (fold R23 / NG-9).
 *
 * BORN-RED WITNESS: `spectrumLuma.ts` is the SHARED regime helper — the
 * WatercolorDot's border, the gamut overlay's contour/hatch ink, and the
 * slider-thumb needle all flip on it, deliberately ("share the function, never
 * copy the constant"). NO TEST TOUCHED IT. That is why M-12's finding survived:
 * the predicate sits EXACTLY ON its own strict `>` threshold across the entire
 * `s = 1, v = 1` top edge (`1 · (1 − 0.5) = 0.5`, which is not `> 0.5`), so a
 * one-character `>` → `>=` edit inverts the border across the plate's
 * most-used row with zero test failures.
 *
 * X.W8.i2 (COHESION §0fx.1, W8.md ADDENDUM 2026-10-17 seventh): the regime
 * is now HUE-AWARE — `spectrumFieldIsLight(h, s, v)` reads the field colour's
 * relative luminance through value.js's own colour maths and selects the
 * stroke that contrasts more. The assertions, and their status:
 *
 *   1 · THE MODEL PIN. The helper's luminance equals this oracle's independent
 *       reading (the library's `srgb-linear` channels under the WCAG
 *       coefficients) at every sampled (h, s, v); the endpoints are exact.
 *
 *   2 · THE BOUNDARY PIN (C-5's rider M-12, restated over the hue-aware
 *       model). M-12's finding was that the old predicate sat EXACTLY ON its
 *       strict `>` threshold across the whole `s = 1, v = 1` top edge, so a
 *       one-character comparator edit inverted the border across the plate's
 *       most-used row with zero test failures. Restated: along that edge, at
 *       every integer hue, the selected stroke contrasts at least as much as
 *       the rejected one — so an inverted or mis-thresholded predicate reds
 *       here, not silently.
 *
 *   3 · HUE-AWARE BY CONSTRUCTION. The same (s, v) gives different answers
 *       across hues (yellow light, blue dark) — the mechanism C-5 needs.
 *
 *   4 · THE HUE-DEPENDENT LUMA LAW (C-5 proper). Born RED under the hue-blind
 *       `v · (1 − s/2)` model (white on pure yellow ~1.07:1); GREEN by the
 *       cure. The 3:1 bar (WCAG 1.4.11) and the hue set are UNCHANGED — no
 *       `it.skip`, no `it.fails`, no widened bar.
 *
 * The transfer function is the LIBRARY'S own (`convertColor(…, "srgb-linear")`,
 * NG-2: an oracle reads product output through the product's own conversion,
 * never a hand-rolled one). Only the WCAG coefficients — a published standard,
 * not a dialect — are stated here.
 */
import * as color from "@src/subpaths/color";
import { describe, expect, it } from "vitest";

import {
    contrastRatio,
    spectrumFieldIsLight,
    spectrumFieldLuminance,
} from "../demo/picker/controls/spectrumLuma";

/** WCAG 2.x relative luminance, over the library's own linear-light channels. */
function relativeLuminance(h: number, s: number, v: number): number {
    const hsv = color.hsv(h, s, v);
    if (!hsv.ok) throw new Error(`hsv(${h},${s},${v}) failed`);
    const lin = color.convertColor(hsv.value, "srgb-linear");
    if (!lin.ok) throw new Error(`srgb-linear conversion failed`);
    const [r, g, b] = lin.value.channels as unknown as number[];
    return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
}

/** WCAG contrast of the chosen stroke against the field at (h, s, v). */
function strokeContrast(h: number, s: number, v: number): number {
    const field = relativeLuminance(h, s, v);
    // The shipped regime: light field → dark (ink) stroke; dark field → light
    // (paper) stroke. The endpoints are the plate's own black and white.
    const stroke = spectrumFieldIsLight(h, s, v) ? 0 : 1;
    const [hi, lo] = field > stroke ? [field, stroke] : [stroke, field];
    return (hi + 0.05) / (lo + 0.05);
}

/** The six primary/secondary hues plus two in-between, in degrees. */
const HUES = [0, 45, 60, 120, 180, 240, 300, 330];

/** WCAG 1.4.11 — the floor a non-text boundary owes against its background. */
const BOUNDARY_CONTRAST_FLOOR = 3;

describe("spectrumLuma — the shared plate regime", () => {
    it("is the documented model, exactly (no drift in the shared helper)", () => {
        expect(spectrumFieldLuminance(0, 0, 1)).toBeCloseTo(1, 12);
        expect(spectrumFieldLuminance(0, 0, 0)).toBe(0);
        for (const h of HUES) {
            for (const s of [0, 0.25, 0.5, 0.75, 1]) {
                for (const v of [0, 0.25, 0.5, 0.75, 1]) {
                    // The helper reads CIE Y off the library's own sRGB→XYZ
                    // matrix row (0.212639…, 0.715168…, 0.072192…); WCAG
                    // publishes that row rounded to 4 decimals, so the two
                    // agree to < 1.4e-4 by construction — the 3-digit bar.
                    expect(spectrumFieldLuminance(h, s, v)).toBeCloseTo(relativeLuminance(h, s, v), 3);
                }
            }
        }
    });

    it("M-12 · the boundary, restated hue-aware: the s=1,v=1 edge selects the stronger stroke at every hue", () => {
        // The old pin guarded a predicate sitting ON its strict threshold
        // across this whole edge. Over the hue-aware model the decision is
        // "the stroke that contrasts more", so the pin is: at every integer
        // hue the selected stroke's ratio ≥ the rejected stroke's ratio. A
        // `>` → `<` (or any threshold drift) edit reds this row.
        const misses = Array.from({ length: 360 }, (_, h) => {
            const field = spectrumFieldLuminance(h, 1, 1);
            const ink = contrastRatio(field, 0);
            const paper = contrastRatio(field, 1);
            const [selected, rejected] = spectrumFieldIsLight(h, 1, 1) ? [ink, paper] : [paper, ink];
            return { hue: h, selected, rejected };
        }).filter((row) => row.selected < row.rejected);
        expect(misses).toEqual([]);
        // …and the edge is a regime statement, not one lucky point: its
        // immediate neighbours agree with the edge at the two hue extremes.
        expect(spectrumFieldIsLight(60, 1, 1)).toBe(true);
        expect(spectrumFieldIsLight(60, 1 - 1e-9, 1)).toBe(true);
        expect(spectrumFieldIsLight(240, 1, 1)).toBe(false);
        expect(spectrumFieldIsLight(240, 1, 1 - 1e-9)).toBe(false);
    });

    it("is hue-aware by construction — the same (s,v) gives different answers across hues", () => {
        // The MECHANISM of the next test, asserted separately so the two
        // verdicts cannot be confused.
        const answers = new Set(HUES.map((h) => spectrumFieldIsLight(h, 1, 1)));
        expect(answers.size).toBe(2);
    });

    it("C-5 · BORN-RED — the selected stroke clears 3:1 against the field at every hue", () => {
        const failures = HUES.map((h) => ({
            hue: h,
            ratio: strokeContrast(h, 1, 1),
        })).filter((row) => row.ratio < BOUNDARY_CONTRAST_FLOOR);
        expect(
            failures,
            `the hue-blind regime picks an invisible stroke at: ` +
                failures.map((f) => `${f.hue}° → ${f.ratio.toFixed(2)}:1`).join(", ") +
                ` — cure routed to X-W4 (fold R23)`,
        ).toEqual([]);
    });

    it("C5-01 · TOTAL on the render path — a non-finite channel reads as 0, never throws", () => {
        // Born RED at f34718e2f: hsv() rejects NaN, and the helper threw inside
        // the dot's and the needle's computeds, dropping the picker pane.
        expect(() => spectrumFieldIsLight(Number.NaN, Number.NaN, Number.NaN)).not.toThrow();
        expect(spectrumFieldIsLight(200, Number.NaN, 1)).toBe(spectrumFieldIsLight(200, 0, 1));
        expect(spectrumFieldIsLight(60, 1, Number.NaN)).toBe(spectrumFieldIsLight(60, 1, 0));
        expect(spectrumFieldLuminance(Number.POSITIVE_INFINITY, 0, 0)).toBe(spectrumFieldLuminance(0, 0, 0));
    });
});

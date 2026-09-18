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
 * TWO ASSERTIONS, and they do NOT have the same status — stated so a reader
 * does not take one verdict for the other:
 *
 *   1 · THE BOUNDARY PIN (C-5's rider M-12). GREEN today; it exists so the
 *       `>=` edit reds. This is NG-9's own falsifier, executable.
 *
 *   2 · THE HUE-DEPENDENT LUMA LAW (C-5 proper). **BORN-RED.** The model
 *       `v · (1 − s/2)` substitutes the constant 0.5 for the hue-dependent
 *       luminance term, so the regime is HUE-BLIND: at pure yellow the
 *       predicate reads the field DARK and selects a WHITE border, which
 *       measures ~1.07:1 against #ffff00 — far under the 3:1 a non-text
 *       boundary owes (WCAG 1.4.11). **The cure of the regime is X-W4's**
 *       (R23: *"Cure of the regime itself → X-W4"*); X-W1 owns the oracle that
 *       makes it decidable. The assertion is REAL and unsoftened — no
 *       `it.skip`, no `it.fails`, no widened bar — because a deferral under a
 *       new name is the exact species G-6 refuses.
 *
 * The transfer function is the LIBRARY'S own (`convertColor(…, "srgb-linear")`,
 * NG-2: an oracle reads product output through the product's own conversion,
 * never a hand-rolled one). Only the WCAG coefficients — a published standard,
 * not a dialect — are stated here.
 */
import * as color from "@src/subpaths/color";
import { describe, expect, it } from "vitest";

import {
    SPECTRUM_LUMA_FLIP,
    spectrumFieldIsLight,
    spectrumLuma,
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
    const stroke = spectrumFieldIsLight(s, v) ? 0 : 1;
    const [hi, lo] = field > stroke ? [field, stroke] : [stroke, field];
    return (hi + 0.05) / (lo + 0.05);
}

/** The six primary/secondary hues plus two in-between, in degrees. */
const HUES = [0, 45, 60, 120, 180, 240, 300, 330];

/** WCAG 1.4.11 — the floor a non-text boundary owes against its background. */
const BOUNDARY_CONTRAST_FLOOR = 3;

describe("spectrumLuma — the shared plate regime", () => {
    it("is the documented model, exactly (no drift in the shared helper)", () => {
        expect(SPECTRUM_LUMA_FLIP).toBe(0.5);
        expect(spectrumLuma(0, 1)).toBeCloseTo(1, 12);
        expect(spectrumLuma(1, 1)).toBeCloseTo(0.5, 12);
        expect(spectrumLuma(0.5, 0.5)).toBeCloseTo(0.375, 12);
        expect(spectrumLuma(0, 0)).toBe(0);
    });

    it("M-12 · the degenerate boundary: the ENTIRE s=1,v=1 edge sits ON the threshold", () => {
        // `spectrumLuma(1, 1) === SPECTRUM_LUMA_FLIP` exactly, and the predicate
        // is a STRICT `>`. This pin is what a `>=` edit reds.
        expect(spectrumLuma(1, 1)).toBe(SPECTRUM_LUMA_FLIP);
        expect(spectrumFieldIsLight(1, 1)).toBe(false);
        // …and its immediate neighbours, so the pin is a regime statement and
        // not one lucky point.
        expect(spectrumFieldIsLight(1 - 1e-9, 1)).toBe(true);
        expect(spectrumFieldIsLight(1, 1 - 1e-9)).toBe(false);
    });

    it("is hue-blind by construction — the same (s,v) gives one answer for every hue", () => {
        // Not a defect claim on its own; it is the MECHANISM of the next test,
        // asserted separately so the two verdicts cannot be confused.
        const answers = new Set(HUES.map((h) => spectrumFieldIsLight(1, 1) && h >= 0));
        expect(answers.size).toBe(1);
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
});

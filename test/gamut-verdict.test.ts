/**
 * SERVED MODEL: claude-opus-5[1m]
 *
 * X-W1 · X.W1.a — the gamut-verdict epsilon pin (fold R24 / NG-9).
 *
 * BORN-RED WITNESS: `ParseEchoReadout.vue` and both its producing computeds
 * carried ZERO coverage of any species, *"despite `gamutVerdict` carrying
 * epsilon logic that has ALREADY REGRESSED ONCE"* — `R/PROGRESS.md` R.W4: *"the
 * gamut verdict computed on display-denormalized OKLab, Δ inflated ~500× —
 * cured to RAW OKLab."* A cured-then-unpinned regression is a live risk, and
 * this is the pin.
 *
 * R24's LOCK, honoured literally: **the pin asserts RAW-OKLab SEMANTICS, not a
 * numeric snapshot.** A snapshot of today's deltas would re-break the moment
 * the conversion is legitimately refined and would say nothing about the
 * denormalization class. What is pinned instead is the two facts that make the
 * `1e-6` epsilon mean anything:
 *
 *   1 · the seam speaks RAW OKLab — `L ∈ [0,1]`, `a,b` in the ±0.4 band — so a
 *       display-denormalized `L ∈ [0,100]` re-entry reds here, by ~100× in L
 *       and ~500× once the chroma axes are scaled with it;
 *   2 · the verdict DISCRIMINATES at that epsilon — an in-gamut colour moves by
 *       far less than 1e-6 under the srgb gamut map, and an out-of-gamut one by
 *       far more. An epsilon that stopped discriminating would leave the readout
 *       announcing "outside srgb gamut" for everything or for nothing.
 *
 * The seam is the two exported functions the computed composes
 * (`convertPickerColor` + `mapPickerOklabToSrgb`), not the SFC: fold R53's
 * MOUNTABILITY LOCK — a component-mount gate that wraps an SFC in its parent to
 * make it mount has tested the parent, and a pure-function seam test is the
 * named alternative.
 */
import { describe, expect, it } from "vitest";

import {
    convertPickerColor,
    mapPickerOklabToSrgb,
    parsePickerColor,
} from "../demo/color-session/picker-color";

/** The epsilon `useColorParsing.ts`'s `gamutVerdict` computed compares against. */
const GAMUT_EPSILON = 1e-6;

function verdict(css: string): { clips: boolean; maxDelta: number; L: number } {
    const original = convertPickerColor(parsePickerColor(css), "oklab");
    const mapped = mapPickerOklabToSrgb(original);
    let maxDelta = 0;
    original.channels.forEach((value, index) => {
        const mappedValue = mapped.channels[index];
        if (typeof value === "number" && typeof mappedValue === "number") {
            maxDelta = Math.max(maxDelta, Math.abs(value - mappedValue));
        }
    });
    const L = typeof original.channels[0] === "number" ? original.channels[0] : NaN;
    return { clips: maxDelta > GAMUT_EPSILON, maxDelta, L };
}

/** Plainly inside sRGB. */
const IN_GAMUT = ["#3366cc", "rgb(255 255 255)", "rgb(0 0 0)", "oklch(0.6 0.1 30)"];
/** Plainly outside sRGB — wide-gamut primaries and an over-chroma OKLCh. */
const OUT_OF_GAMUT = [
    "color(display-p3 0 1 0)",
    "color(rec2020 1 0 0)",
    "oklch(0.7 0.37 145)",
];

describe("gamutVerdict — the RAW-OKLab epsilon seam", () => {
    it("speaks RAW OKLab: L ∈ [0,1] and the chroma axes stay in the ±0.4 band", () => {
        // THE REGRESSION CLASS, pinned by semantics. Display-denormalized OKLab
        // puts L on [0,100]; every delta then inflates with it, which is how a
        // 1e-6 epsilon came to read ~500× too large and the readout announced
        // clipping for colours well inside sRGB.
        for (const css of [...IN_GAMUT, ...OUT_OF_GAMUT]) {
            const oklab = convertPickerColor(parsePickerColor(css), "oklab");
            const [L, a, b] = oklab.channels as unknown as number[];
            expect(L, `${css} · L`).toBeGreaterThanOrEqual(0);
            // `1 + 1e-9`, not `1`: white round-trips to 1.0000000000000002 in
            // f64. The band is a SEMANTIC pin against a [0,100] re-entry, so a
            // float ulp must not red it and a ×100 denormalization must.
            expect(L, `${css} · L`).toBeLessThanOrEqual(1 + 1e-9);
            expect(Math.abs(a ?? 0), `${css} · a`).toBeLessThan(0.5);
            expect(Math.abs(b ?? 0), `${css} · b`).toBeLessThan(0.5);
        }
    });

    it("the gamut map is the IDENTITY inside sRGB — no verdict without a cause", () => {
        for (const css of IN_GAMUT) {
            const { clips, maxDelta } = verdict(css);
            expect(maxDelta, `${css} moved under the srgb map`).toBeLessThan(
                GAMUT_EPSILON,
            );
            expect(clips, `${css} announced as clipping`).toBe(false);
        }
    });

    it("the verdict DISCRIMINATES: an out-of-gamut colour moves far past the epsilon", () => {
        for (const css of OUT_OF_GAMUT) {
            const { clips, maxDelta } = verdict(css);
            expect(clips, `${css} not announced as clipping`).toBe(true);
            // Orders of magnitude, not a snapshot: the epsilon is a noise floor,
            // not a tuned bar, and it must stay one.
            expect(maxDelta, `${css} delta`).toBeGreaterThan(GAMUT_EPSILON * 100);
        }
    });

    it("the epsilon is a NOISE FLOOR, and the MARGIN says so — measured, not argued", () => {
        // The claim "1e-6 is a noise floor" is only meaningful if the two
        // populations do not approach it from either side. Measured here:
        const inMax = Math.max(...IN_GAMUT.map((css) => verdict(css).maxDelta));
        const outMin = Math.min(...OUT_OF_GAMUT.map((css) => verdict(css).maxDelta));
        expect(inMax, `largest in-gamut movement`).toBeLessThan(GAMUT_EPSILON / 100);
        expect(outMin, `smallest out-of-gamut movement`).toBeGreaterThan(
            GAMUT_EPSILON * 100,
        );
        // Four orders of magnitude of daylight. The ~500× inflation the R.W4
        // regression introduced is inside that gap, which is exactly why it
        // turned true verdicts false while every gate stayed green.
        expect(outMin / Math.max(inMax, Number.MIN_VALUE)).toBeGreaterThan(1e4);
    });
});

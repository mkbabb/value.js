import { describe, expect, it } from "vitest";
import {
    color2,
    color2Into,
} from "@src/units/color/dispatch";
import {
    AdobeRGBColor,
    DisplayP3Color,
    LinearSRGBColor,
    OKLCHColor,
    ProPhotoRGBColor,
    Rec2020Color,
    RGBColor,
    XYZColor,
} from "@src/units/color";
import type { Color, ColorSpace } from "@src/units/color";

// ─────────────────────────────────────────────────────────────────────────────
// VJ-P1 — `color2Into` out-param (the 1.2.0 gamut zero-alloc headline).
//
// `color2Into(src, to, out)` is the BC-additive out-param mirror of `color2`:
// it converts `src` into space `to` and writes the resulting channels into the
// caller-owned `out` Color (rather than allocating the egress wrapper), returning
// `out`. The headline consumer is `gamutMapToRgbSpace`'s 24-step bisection, whose
// probe is always OKLCH — the OKLCH→XYZ hub leg routes through an in-place tuple
// + a single scratch XYZColor, so the per-step OKLABColor/XYZColor boxing is gone.
//
// The contract this suite pins:
//   1. `color2Into` is bit-for-bit equal to `color2` for every pair it serves
//      (the OKLCH fast path replays the wrapper path's `scale` round-trip).
//   2. It writes into — and returns — the caller-owned `out` (no fresh egress).
//   3. Reusing ONE `out` across many calls is sound (no stale-state bleed).
//   4. The same-space path is a pure channel copy.
// ─────────────────────────────────────────────────────────────────────────────

/** Channel-by-channel equality (including alpha) within a tight FP epsilon. */
function expectColorsEqual(got: Color, want: Color, eps = 0): void {
    expect(got.colorSpace).toBe(want.colorSpace);
    for (const k of want.channels) {
        const g = got[k] as number;
        const w = want[k] as number;
        if (Number.isNaN(w)) {
            expect(Number.isNaN(g)).toBe(true);
        } else if (eps === 0) {
            expect(g).toBe(w);
        } else {
            expect(Math.abs(g - w)).toBeLessThanOrEqual(eps);
        }
    }
    if (Number.isNaN(want.alpha as number)) {
        expect(Number.isNaN(got.alpha as number)).toBe(true);
    } else {
        expect(got.alpha).toBe(want.alpha);
    }
}

const WIDE_GAMUT_TARGETS: ReadonlyArray<readonly [ColorSpace, () => Color]> = [
    ["display-p3", () => new DisplayP3Color(0, 0, 0, 1)],
    ["rec2020", () => new Rec2020Color(0, 0, 0, 1)],
    ["a98-rgb", () => new AdobeRGBColor(0, 0, 0, 1)],
    ["prophoto-rgb", () => new ProPhotoRGBColor(0, 0, 0, 1)],
    ["srgb-linear", () => new LinearSRGBColor(0, 0, 0, 1)],
    ["rgb", () => new RGBColor(0, 0, 0, 1)],
];

// Normalized OKLCH probes spanning the gamut (l,c,h ∈ [0,1]).
const OKLCH_PROBES = [
    new OKLCHColor(0.7, 0.2, 0.5, 1),
    new OKLCHColor(0.4, 0.4, 0.1, 0.5),
    new OKLCHColor(0.9, 0.05, 0.95, 1),
    new OKLCHColor(0.2, 0.5, 0.3, 0.8),
];

describe("color2Into — OKLCH source fast path (the gamut-bisection leg)", () => {
    it("matches color2 bit-for-bit across every wide-gamut egress", () => {
        for (const probe of OKLCH_PROBES) {
            for (const [space, mk] of WIDE_GAMUT_TARGETS) {
                const expected = color2(probe, space) as Color;
                const out = mk();
                const got = color2Into(probe, space, out as never) as Color;
                // The returned value IS the caller-owned `out` (no fresh egress).
                expect(got).toBe(out);
                // Bit-identical to the wrapper path (the replayed scale round-trip).
                expectColorsEqual(got, expected, 0);
            }
        }
    });

    it("reuses one out across many calls without stale-state bleed", () => {
        const out = new DisplayP3Color(0, 0, 0, 1);
        for (const probe of OKLCH_PROBES) {
            const expected = color2(probe, "display-p3") as Color;
            const got = color2Into(probe, "display-p3", out as never) as Color;
            expect(got).toBe(out);
            expectColorsEqual(got, expected, 0);
        }
    });
});

describe("color2Into — general (non-OKLCH) fallback", () => {
    it("matches color2 for an RGB source into XYZ", () => {
        const src = new RGBColor(0.8, 0.2, 0.4, 1);
        const expected = color2(src, "xyz") as Color;
        const out = new XYZColor(0, 0, 0, 1);
        const got = color2Into(src, "xyz", out as never) as Color;
        expect(got).toBe(out);
        expectColorsEqual(got, expected, 0);
    });

    it("matches color2 for an RGB source into display-p3", () => {
        const src = new RGBColor(0.9, 0.1, 0.5, 0.75);
        const expected = color2(src, "display-p3") as Color;
        const out = new DisplayP3Color(0, 0, 0, 1);
        const got = color2Into(src, "display-p3", out as never) as Color;
        expect(got).toBe(out);
        expectColorsEqual(got, expected, 0);
    });
});

describe("color2Into — same-space copy", () => {
    it("copies channels into out when src and to share a space", () => {
        const src = new DisplayP3Color(0.3, 0.6, 0.9, 0.4);
        const out = new DisplayP3Color(0, 0, 0, 1);
        const got = color2Into(src, "display-p3", out as never) as Color;
        expect(got).toBe(out);
        expect(got.r).toBe(0.3);
        expect(got.g).toBe(0.6);
        expect(got.b).toBe(0.9);
        expect(got.alpha).toBe(0.4);
        // The copy is a value copy — mutating src must not leak into out.
        (src as Color).r = 1;
        expect(got.r).toBe(0.3);
    });
});

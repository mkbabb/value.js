import { describe, expect, it } from "vitest";
import { linear2srgb, srgb2linear } from "@src/units/color/conversions/transfer";
import { rgb2xyz } from "@src/units/color/conversions/xyz-extended";
import { RGBColor } from "@src/units/color";

// ─────────────────────────────────────────────────────────────────────────────
// S.W1-1 — the `srgb2linear` decode-threshold cure (the booked defect).
//
// The DECODE branch must pivot on the ENCODED-axis threshold 0.04045, not the
// linear-axis 0.0031308. The historical guard mis-routed the encoded 8-bit dark
// band (1..10/255 — all in [0.0031308, 0.04045]) through the power branch,
// decoding near-black ~3× too bright.
//
// THE ORACLE IS INDEPENDENT: every expected value below is computed either by a
// hand-coded IEC 61966-2-1 transfer (`iecDecode`/`iecEncode`, transcribed from
// the spec, NOT the library) or by a raw Python reference script
// (`scratchpad/darkband_oracle.py`). The library is never its own oracle — the
// prohibition the S.W1 gate names (the prior `gamut-boundary.test.ts` field was
// circular: it reconstructed truth from the very functions under test).
// ─────────────────────────────────────────────────────────────────────────────

/** Independent IEC 61966-2-1 sRGB DECODE (encoded [0,1] → linear-light). */
function iecDecode(c: number): number {
    const sign = c < 0 ? -1 : 1;
    const a = Math.abs(c);
    if (a <= 0.04045) return c / 12.92;
    return sign * ((a + 0.055) / 1.055) ** 2.4;
}

/** Independent IEC 61966-2-1 sRGB ENCODE (linear-light → encoded [0,1]).
 *  The linear-axis transition is DERIVED as 0.04045/12.92 (= 0.0031308049…),
 *  the exact image of the decode transition 0.04045 under the slope — not the
 *  spec's separately-rounded 0.0031308. Pinning the decode cut and deriving the
 *  encode cut makes the pair an exact mutual inverse (the two published rounded
 *  constants are NOT exact inverses; they disagree on a ~5e-9-wide sliver). */
const IEC_LINEAR_TRANSITION = 0.04045 / 12.92;
function iecEncode(l: number): number {
    const sign = l < 0 ? -1 : 1;
    const a = Math.abs(l);
    if (a <= IEC_LINEAR_TRANSITION) return l * 12.92;
    return sign * (1.055 * a ** (1 / 2.4) - 0.055);
}

// Hand-computed XYZ.Y for the neutral 8-bit dark band rgb(n,n,n), n=1..10, from
// the independent Python reference (raw IEC decode + Rec.709/D65 sRGB→XYZ
// matrix). For a neutral triple the Y-row of the matrix sums to 1, so
// Y === decoded-linear(n/255); every value here lands in the LINEAR decode
// branch after the cure. (Pre-cure, n=1's Y read 9.837e-4 — ~3.2× too bright.)
const DARK_BAND_Y: Array<[number, number]> = [
    [1, 0.00030352698354883757],
    [2, 0.0006070539670976751],
    [3, 0.0009105809506465126],
    [4, 0.0012141079341953503],
    [5, 0.0015176349177441874],
    [6, 0.0018211619012930252],
    [7, 0.0021246888848418626],
    [8, 0.0024282158683907006],
    [9, 0.002731742851939537],
    [10, 0.003035269835488375],
];

describe("srgb2linear — dark-band decode cure (S.W1-1)", () => {
    it("rgb(n,n,n)→XYZ.Y matches the independent IEC/matrix oracle (n=1..10)", () => {
        for (const [n, y] of DARK_BAND_Y) {
            const c = n / 255;
            const xyz = rgb2xyz(new RGBColor(c, c, c, 1));
            expect(xyz.y as number).toBeCloseTo(y, 12);
        }
    });

    it("the whole encoded 8-bit dark band decodes on the LINEAR branch", () => {
        // Encoded 1..10 / 255 all sit in [0.0031308, 0.04045] — after the cure
        // they decode as c/12.92 (the linear branch), NOT the power branch.
        for (let n = 1; n <= 10; n++) {
            const c = n / 255;
            expect(srgb2linear(c)).toBeCloseTo(c / 12.92, 15);
        }
        // The band's ceiling: encoded 0.04045 is the exact decode transition.
        expect(srgb2linear(0.04045)).toBeCloseTo(0.04045 / 12.92, 15);
    });
});

describe("srgb transfer — agreement with the independent IEC oracle", () => {
    // A sweep straddling the transition (dense across the cured dark band).
    const ENCODED_SWEEP = [
        0, 1 / 255, 2 / 255, 5 / 255, 8 / 255, 10 / 255, 0.0031308, 0.02,
        0.0404, 0.04045, 0.0405, 0.1, 0.25, 0.5, 0.75, 1,
    ];
    const LINEAR_SWEEP = [
        0, 1e-4, 0.0031308, 0.0031308 + 1e-9, 0.01, 0.05, 0.2, 0.5, 0.8, 1,
    ];

    it("srgb2linear matches hand-coded IEC decode to 15 digits (incl. dark band)", () => {
        for (const c of ENCODED_SWEEP) {
            expect(srgb2linear(c)).toBeCloseTo(iecDecode(c), 15);
            // Sign-symmetry (the library's transfer is odd-extended for OOG).
            expect(srgb2linear(-c)).toBeCloseTo(iecDecode(-c), 15);
        }
    });

    it("linear2srgb matches hand-coded IEC encode to 15 digits", () => {
        for (const l of LINEAR_SWEEP) {
            expect(linear2srgb(l)).toBeCloseTo(iecEncode(l), 15);
            expect(linear2srgb(-l)).toBeCloseTo(iecEncode(-l), 15);
        }
    });
});

describe("srgb transfer — self-inverse (the non-circular roundtrip)", () => {
    // The oracle is IDENTITY, not the library: decode∘encode and encode∘decode
    // must return the input. The cure makes the pair mutually invertible across
    // the dark band (decode's 0.04045 cut is the image of encode's 0.0031308
    // cut under ×12.92), which the pre-cure code violated.
    it("srgb2linear(linear2srgb(x)) === x across [0,1] incl. the dark band", () => {
        for (let i = 0; i <= 1000; i++) {
            const x = i / 1000;
            expect(srgb2linear(linear2srgb(x))).toBeCloseTo(x, 12);
        }
        // Explicit dark-band linear values (image of encoded 1..10/255).
        for (let n = 1; n <= 10; n++) {
            const x = (n / 255) / 12.92;
            expect(srgb2linear(linear2srgb(x))).toBeCloseTo(x, 14);
        }
    });

    it("linear2srgb(srgb2linear(x)) === x across [0,1] incl. the dark band", () => {
        for (let i = 0; i <= 1000; i++) {
            const x = i / 1000;
            expect(linear2srgb(srgb2linear(x))).toBeCloseTo(x, 12);
        }
        for (let n = 1; n <= 10; n++) {
            const x = n / 255; // encoded dark-band values
            expect(linear2srgb(srgb2linear(x))).toBeCloseTo(x, 14);
        }
    });
});

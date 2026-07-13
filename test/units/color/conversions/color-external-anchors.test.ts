import { describe, expect, it } from "vitest";
import { rgb2xyz, xyz2lab, xyz2oklab } from "@src/units/color/conversions";
import { RGBColor, XYZColor } from "@src/units/color";

// ════════════════════════════════════════════════════════════════════════════
// EXTERNAL-VECTOR ANCHORS for rgb2xyz / xyz2lab / xyz2oklab  (U-F72, G-ORACLE-6)
// ════════════════════════════════════════════════════════════════════════════
//
// The XYZ/Lab/OKLab suite (color-conversions.test.ts, color-roundtrip.test.ts)
// validates almost entirely by ROUND-TRIP (forward ∘ inverse = identity). A
// round-trip is BLIND to a shared-error class: an error present in BOTH the
// forward and the inverse transform cancels and passes. These anchors close that
// blind spot — each is a NON-round-trip, forward-only assertion against a
// PUBLISHED external reference computed by an INDEPENDENT implementation, so a
// shared coefficient/matrix error in value.js is caught (it would move the output
// away from the external vector).
//
// ── BORN-GREEN attestation (the U.W-ORACLE honesty law, §Completion) ──────────
//   These land as ADDED COVERAGE that PASSES ON WRITE. The numeric color core is
//   proven SOUND (registry §19 U-F60: sRGB→XYZ matches the CSS Color 4 matrix to
//   ≤ 1.11e-16, sRGB→OKLab to ≤ 1e-6), so NO defect exists here to flip. Authoring
//   these born-RED over sound code would be a FABRICATED red — the mirror-image of
//   the O-14 proxy-green-over-a-wreck sin this wave exists to outlaw. The value is
//   coverage against the class the round-trip cannot see, recorded honestly.
//
// ── Normalization note ────────────────────────────────────────────────────────
//   `xyz2lab` / `xyz2oklab` return their channels NORMALIZED to the library's
//   internal [0,1] convention (constants.ts COLOR_SPACE_RANGES). To compare
//   against physically-scaled published references we DENORMALIZE the impl output
//   back to physical units with the documented range factors below (a linear
//   unit-rescale, NOT the inverse transform — so this stays non-round-trip):
//     Lab   : L* = l·100                (range l  [0,100])
//             a* = a·250 − 125          (range a  [-125,125])
//             b* = b·250 − 125          (range b  [-125,125])
//     OKLab : L  = l   (unscaled — OKLab L is native [0,1])
//             a  = a·0.8 − 0.4          (range a  [-0.4,0.4])
//             b  = b·0.8 − 0.4          (range b  [-0.4,0.4])
//   `rgb2xyz` returns raw (unbounded) XYZ — no denormalization.

// ── U-F72.1 — rgb2xyz (sRGB → CIE XYZ, D65 relative Y=1) ─────────────────────
// Reference: culori `xyz65` published test goldens
//   (github.com/Evercoder/culori test/xyz65.test.js). culori uses the CSS Color 4
//   sRGB→XYZ-D65 matrix; `#00cc0080` == srgb(0, 0.8, 0) EXERCISES the sRGB
//   transfer function (0.8 is neither 0 nor 1), so this is not merely a matrix-
//   column check — it certifies the gamma-decode leg too.
describe("EXTERNAL ANCHOR · rgb2xyz vs culori xyz65 goldens (non-round-trip)", () => {
    it("srgb white → XYZ-D65 (culori golden)", () => {
        const xyz = rgb2xyz(new RGBColor(1, 1, 1, 1));
        expect(xyz.x).toBeCloseTo(0.9504559270516715, 10);
        expect(xyz.y).toBeCloseTo(0.9999999999999999, 10);
        expect(xyz.z).toBeCloseTo(1.0890577507598784, 10);
    });

    it("srgb red → XYZ-D65 (culori golden)", () => {
        const xyz = rgb2xyz(new RGBColor(1, 0, 0, 1));
        expect(xyz.x).toBeCloseTo(0.4123907992659593, 10);
        expect(xyz.y).toBeCloseTo(0.2126390058715102, 10);
        expect(xyz.z).toBeCloseTo(0.0193308187155918, 10);
    });

    it("srgb(0, 0.8, 0) → XYZ-D65 (culori golden — exercises the sRGB transfer)", () => {
        // culori xyz65('#00cc0080'), 0xcc/255 = 0.8 exactly (alpha dropped here).
        const xyz = rgb2xyz(new RGBColor(0, 0.8, 0, 1));
        expect(xyz.x).toBeCloseTo(0.21591920006651102, 10);
        expect(xyz.y).toBeCloseTo(0.43183840013302205, 10);
        expect(xyz.z).toBeCloseTo(0.071973066688837, 10);
    });
});

// ── U-F72.2 — xyz2lab (CIE XYZ D65 → CIE Lab, D50 reference white) ────────────
// Reference: culori `lab` published test goldens
//   (github.com/Evercoder/culori test/lab.test.js). culori's `lab` is D50 (CSS
//   Color 4); the impl adapts the D65 input to D50 via Bradford, matching. The
//   INPUT XYZ vectors are culori's own `xyz65` goldens for the same colors, so
//   input and expected output share one external authority (fully non-circular:
//   culori is an independent implementation).
describe("EXTERNAL ANCHOR · xyz2lab vs culori lab-D50 goldens (non-round-trip)", () => {
    it("XYZ-D65 white → Lab (culori: L*≈100, a*=0, b*=0)", () => {
        const lab = xyz2lab(
            new XYZColor(0.9504559270516715, 0.9999999999999999, 1.0890577507598784, 1),
        );
        expect(lab.l * 100).toBeCloseTo(100.00000139649632, 3);
        expect(lab.a * 250 - 125).toBeCloseTo(0, 3);
        expect(lab.b * 250 - 125).toBeCloseTo(0, 3);
    });

    it("XYZ-D65 of srgb red → Lab (culori chromatic golden)", () => {
        // culori xyz65('red') → lab('red') = { l:54.29054…, a:80.80492…, b:69.89098… }
        const lab = xyz2lab(
            new XYZColor(0.4123907992659593, 0.2126390058715102, 0.0193308187155918, 1),
        );
        expect(lab.l * 100).toBeCloseTo(54.29054294696968, 3);
        expect(lab.a * 250 - 125).toBeCloseTo(80.80492033462417, 3);
        expect(lab.b * 250 - 125).toBeCloseTo(69.89098825896278, 3);
    });
});

// ── U-F72.3 — xyz2oklab (CIE XYZ D65 → OKLab) ────────────────────────────────
// Reference: Björn Ottosson's own published OKLab test vectors
//   (bottosson.github.io/posts/oklab/, "computed by transforming the XYZ
//   coordinates to Oklab and rounding to three decimals"). These are THE canonical
//   external OKLab reference triples. Because they are published to 3 decimals
//   (±5e-4 inherent rounding uncertainty), the anchor asserts to an absolute
//   tolerance of 1e-3 — one ULP of headroom over the reference's own rounding,
//   still ~10× tighter than any real matrix/coefficient error would produce.
describe("EXTERNAL ANCHOR · xyz2oklab vs Ottosson reference triples (non-round-trip)", () => {
    const OTT_TOL = 1e-3;
    const OTTOSSON: Array<[string, [number, number, number], [number, number, number]]> = [
        ["white", [0.95, 1.0, 1.089], [1.0, 0.0, 0.0]],
        ["X", [1.0, 0.0, 0.0], [0.45, 1.236, -0.019]],
        ["Y", [0.0, 1.0, 0.0], [0.922, -0.671, 0.263]],
        ["Z", [0.0, 0.0, 1.0], [0.153, -1.415, -0.449]],
    ];

    for (const [name, [x, y, z], [L, a, b]] of OTTOSSON) {
        it(`XYZ ${name} → OKLab (Ottosson published, ±${OTT_TOL})`, () => {
            const ok = xyz2oklab(new XYZColor(x, y, z, 1));
            expect(Math.abs(ok.l - L)).toBeLessThanOrEqual(OTT_TOL);
            expect(Math.abs((ok.a * 0.8 - 0.4) - a)).toBeLessThanOrEqual(OTT_TOL);
            expect(Math.abs((ok.b * 0.8 - 0.4) - b)).toBeLessThanOrEqual(OTT_TOL);
        });
    }
});

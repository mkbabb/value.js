// SERVED MODEL: claude-opus-5[1m]
/**
 * EXTERNAL-VECTOR COLOUR ANCHORS for the value 4 conversion API (X.W9.e · G18).
 *
 * Every expected value in this file is a **published vector computed by an
 * independent implementation** — culori, Björn Ottosson — transcribed verbatim.
 * Nothing here is re-derived from `src/color/`, and nothing here is a
 * round-trip: a round-trip is BLIND to the shared-error class (an error present
 * in both the forward and the inverse transform cancels and passes), which is
 * precisely the class these anchors exist to catch.
 *
 * The vectors are the ones the U.W-ORACLE lane certified and recorded at
 * `docs/tranches/U/audit/oracle/color-anchors/README.md`; the v4 cut
 * (`7334c793`) deleted the two files that carried them
 * (`test/units/color/conversions/color-external-anchors.test.ts`,
 * `test/units/color/color-difference.test.ts`) along with the `src/units/`
 * tree they addressed. This file restores them against the **published** v4
 * surface — `rgb`/`xyz`/`convertColor` from `./color` — so they bind the API
 * consumers actually import rather than a retired internal.
 *
 * Normalisation: v4 channels are PHYSICAL. `rgb` is 0..255 encoded sRGB, `xyz`
 * is D65-relative with Y=1 at media white, `lab` is L* in [0,100] with a* and
 * b* in CIE units, `oklab` is Ottosson-native, `ictcp` is BT.2100 with Yw = 203.
 * No denormalisation step stands between the library and the reference, which
 * is why these comparisons are direct.
 */
import { describe, expect, it } from "vitest";
import { convertColor, ictcp, rgb, xyz, type AnyColor, type SpaceId } from "../src/subpaths/color";

function unwrap<T>(result: { ok: true; value: T } | { ok: false }): T {
    if (!result.ok) throw new Error("anchor input rejected by the library");
    return result.value;
}

/** Channels of `color` after conversion to `space`, as plain numbers. */
function channels(color: AnyColor, space: SpaceId): readonly number[] {
    const converted = unwrap(convertColor(color, space));
    return converted.channels.map((channel) => {
        if (channel === "none") throw new Error(`${space} returned a powerless channel`);
        return channel;
    });
}

const srgb = (r: number, g: number, b: number) => unwrap(rgb(r, g, b));
const xyzD65 = (x: number, y: number, z: number) => unwrap(xyz(x, y, z));

// ─────────────────────────────────────────────────────────────────────────────
// 1 · sRGB → CIE XYZ (D65), against culori's published `xyz65` goldens.
//
// Source: culori (github.com/Evercoder/culori), `test/xyz65.test.js`. culori
// implements the CSS Color 4 sRGB→XYZ-D65 matrix independently of this library.
// The third vector is `#00cc00` — 0xcc/255 = 0.8 exactly — so it is not a bare
// matrix-column read: it exercises the sRGB transfer function's curved branch
// as well as the matrix.
// ─────────────────────────────────────────────────────────────────────────────
const CULORI_XYZ65: ReadonlyArray<readonly [string, readonly [number, number, number], readonly [number, number, number]]> = [
    ["white", [255, 255, 255], [0.9504559270516715, 0.9999999999999999, 1.0890577507598784]],
    ["red", [255, 0, 0], [0.4123907992659593, 0.2126390058715102, 0.0193308187155918]],
    ["#00cc00", [0, 204, 0], [0.21591920006651102, 0.43183840013302205, 0.071973066688837]],
];

describe("EXTERNAL ANCHOR · sRGB → XYZ-D65 vs culori xyz65 goldens", () => {
    for (const [name, [r, g, b], expected] of CULORI_XYZ65) {
        it(`rgb(${r}, ${g}, ${b}) — ${name}`, () => {
            const [x, y, z] = channels(srgb(r, g, b), "xyz");
            expect(x).toBeCloseTo(expected[0], 10);
            expect(y).toBeCloseTo(expected[1], 10);
            expect(z).toBeCloseTo(expected[2], 10);
        });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// 2 · CIE XYZ (D65) → CIE Lab (D50 reference white), against culori's `lab`
//     goldens. Source: culori `test/lab.test.js`. culori's `lab` is D50 per CSS
//     Color 4; this library adapts D65→D50 by Bradford, so the two agree. The
//     INPUT vectors are culori's own `xyz65` goldens for the same colours, so
//     input and expected output come from one external authority — non-circular
//     with respect to value.js, which contributes neither end.
//     Tolerance 1e-3 (`toBeCloseTo(_, 3)`): measured cross-implementation
//     divergence is ≤ 2.35e-5, two orders inside it.
// ─────────────────────────────────────────────────────────────────────────────
const CULORI_LAB_D50: ReadonlyArray<readonly [string, readonly [number, number, number], readonly [number, number, number]]> = [
    ["white", [0.9504559270516715, 0.9999999999999999, 1.0890577507598784], [100.00000139649632, 0, 0]],
    ["red", [0.4123907992659593, 0.2126390058715102, 0.0193308187155918], [54.29054294696968, 80.80492033462417, 69.89098825896278]],
];

describe("EXTERNAL ANCHOR · XYZ-D65 → Lab-D50 vs culori lab goldens", () => {
    for (const [name, input, expected] of CULORI_LAB_D50) {
        it(`xyz(${name}) → lab`, () => {
            const [l, a, b] = channels(xyzD65(...input), "lab");
            expect(l).toBeCloseTo(expected[0], 3);
            expect(a).toBeCloseTo(expected[1], 3);
            expect(b).toBeCloseTo(expected[2], 3);
        });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// 3 · CIE XYZ (D65) → OKLab, against Björn Ottosson's own published reference
//     triples (bottosson.github.io/posts/oklab/ — "computed by transforming the
//     XYZ coordinates to Oklab and rounding to three decimals"). These are THE
//     canonical external OKLab vectors, published by the space's author.
//     Because they carry ±5e-4 of inherent publication rounding, the anchor
//     asserts an absolute |Δ| ≤ 1e-3 — one ULP of headroom over the reference's
//     own rounding, still ~10× tighter than any real matrix error would move.
//     Measured worst case across the four: 4.03e-4.
// ─────────────────────────────────────────────────────────────────────────────
const OTTOSSON_TOLERANCE = 1e-3;
const OTTOSSON_OKLAB: ReadonlyArray<readonly [string, readonly [number, number, number], readonly [number, number, number]]> = [
    ["white", [0.95, 1.0, 1.089], [1.0, 0.0, 0.0]],
    ["X", [1.0, 0.0, 0.0], [0.45, 1.236, -0.019]],
    ["Y", [0.0, 1.0, 0.0], [0.922, -0.671, 0.263]],
    ["Z", [0.0, 0.0, 1.0], [0.153, -1.415, -0.449]],
];

describe("EXTERNAL ANCHOR · XYZ → OKLab vs Ottosson published triples", () => {
    for (const [name, input, expected] of OTTOSSON_OKLAB) {
        it(`xyz ${name} → oklab (±${OTTOSSON_TOLERANCE})`, () => {
            const measured = channels(xyzD65(...input), "oklab");
            for (let i = 0; i < 3; i++) {
                expect(Math.abs(measured[i]! - expected[i]!)).toBeLessThanOrEqual(OTTOSSON_TOLERANCE);
            }
        });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// 4 · CIE XYZ (D65) → ICtCp (BT.2100, Yw = 203), against culori's published
//     `itp` goldens (culori `test/itp.test.js`). The `ictcp` space is the one
//     X.W9.h's channel-descriptor defect sits on, and it had no external anchor
//     on the v4 surface at all. The inverse leg feeds culori's ICtCp golden back
//     and expects culori's xyz65 golden — both ends external, still not a
//     round-trip through value.js's own output.
// ─────────────────────────────────────────────────────────────────────────────
const CULORI_XYZ65_WHITE = [0.9504559270516716, 1.0, 1.0890577507598784] as const;
const CULORI_XYZ65_RED = [0.41239079926595934, 0.21263900587151027, 0.01933081871559182] as const;
const CULORI_ITP_WHITE = [0.5806888810416109, 0, 0] as const;
const CULORI_ITP_RED = [0.4278802843622844, -0.11570435976969046, 0.27872894737532694] as const;

describe("EXTERNAL ANCHOR · XYZ ↔ ICtCp vs culori itp goldens", () => {
    it("xyz(white) → ictcp (culori golden; Ct = Cp = 0 for the achromatic axis)", () => {
        const [i, ct, cp] = channels(xyzD65(...CULORI_XYZ65_WHITE), "ictcp");
        expect(i).toBeCloseTo(CULORI_ITP_WHITE[0], 9);
        expect(ct).toBeCloseTo(CULORI_ITP_WHITE[1], 9);
        expect(cp).toBeCloseTo(CULORI_ITP_WHITE[2], 9);
    });

    it("xyz(red) → ictcp (culori golden)", () => {
        const [i, ct, cp] = channels(xyzD65(...CULORI_XYZ65_RED), "ictcp");
        expect(i).toBeCloseTo(CULORI_ITP_RED[0], 9);
        expect(ct).toBeCloseTo(CULORI_ITP_RED[1], 9);
        expect(cp).toBeCloseTo(CULORI_ITP_RED[2], 9);
    });

    it("ictcp(culori red golden) → xyz returns culori's xyz65 red golden", () => {
        const source = unwrap(ictcp(...CULORI_ITP_RED));
        const [x, y, z] = channels(source, "xyz");
        expect(x).toBeCloseTo(CULORI_XYZ65_RED[0], 10);
        expect(y).toBeCloseTo(CULORI_XYZ65_RED[1], 10);
        expect(z).toBeCloseTo(CULORI_XYZ65_RED[2], 10);
    });
});

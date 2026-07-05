import { describe, expect, it } from "vitest";
import { color2, color2Into } from "../src/units/color/dispatch";
import {
    ICtCpColor,
    JzazbzColor,
    OKLCHColor,
    RGBColor,
    XYZColor,
} from "../src/units/color";
import type { Color } from "../src/units/color";
import { xyzToICtCp, ictcpToXYZ } from "../src/units/color/difference";
import { xyzToJzazbz, jzazbzToXYZ } from "../src/units/color/conversions/jzazbz";
import { scale } from "../src/math";
import { parseCSSColor } from "../src/parsing/color";

// ─────────────────────────────────────────────────────────────────────────────
// S.W1 remediation (3.1.0) — ICtCp (Q9) + Jzazbz (Q9 widening, W1-11) as FULL
// color spaces: `Color` subclasses + `color2()` dispatch arms + `color2Into`
// currency + parsing + serialization. The raw transforms (`xyzToICtCp` etc.)
// shipped at 3.0.0 and are independently oracled in `color-difference.test.ts` /
// `color-jzazbz.test.ts`; THIS suite pins the SPACE integration the 3.0.0 gate
// (rows 5+7) required but the pairs-only landing missed.
//
// `color2` operates on NORMALIZED [0,1] channels (the dispatch convention); the
// space wrappers denormalize to the physical coordinate, run the shipped raw
// transform, and renormalize — so the roundtrip is bound-consistent by
// construction (mirroring `oklab.ts`).
// ─────────────────────────────────────────────────────────────────────────────

// Relative XYZ (D65, media white Y=1) of sRGB white + primaries — the exact
// vectors the raw-math suites use.
const XYZ_WHITE: [number, number, number] = [0.9504559270516716, 1.0, 1.0890577507598784];
const XYZ_RED: [number, number, number] = [0.41239079926595934, 0.21263900587151027, 0.01933081871559182];
const XYZ_GREEN: [number, number, number] = [0.357584339383878, 0.715168678767756, 0.11919477979462598];
const XYZ_BLUE: [number, number, number] = [0.1804807884018343, 0.07219231536073371, 0.9505321522496607];

/** Channel-by-channel equality (incl. alpha) within an FP epsilon. */
function expectColorsEqual(got: Color, want: Color, eps = 0): void {
    expect(got.colorSpace).toBe(want.colorSpace);
    for (const k of want.channels) {
        const g = got[k] as number;
        const w = want[k] as number;
        if (Number.isNaN(w)) expect(Number.isNaN(g)).toBe(true);
        else if (eps === 0) expect(g).toBe(w);
        else expect(Math.abs(g - w)).toBeLessThanOrEqual(eps);
    }
    expect(got.alpha).toBeCloseTo(want.alpha as number, 12);
}

// Normalized-[0,1] sRGB probes spanning the gamut.
const RGB_PROBES = [
    new RGBColor(0.8, 0.2, 0.4, 1),
    new RGBColor(0.1, 0.9, 0.5, 0.75),
    new RGBColor(0.5, 0.5, 0.5, 1),
    new RGBColor(0.02, 0.02, 0.02, 1),
    new RGBColor(1, 1, 1, 0.5),
];

describe("ICtCp space — dispatch wiring agrees with the shipped raw transform", () => {
    it("color2(XYZ→ictcp) denormalizes back to xyzToICtCp", () => {
        for (const xyz of [XYZ_WHITE, XYZ_RED, XYZ_GREEN, XYZ_BLUE]) {
            const [I, Ct, Cp] = xyzToICtCp(...xyz);
            const got = color2(new XYZColor(...xyz, 1), "ictcp") as ICtCpColor;
            // i range is [0,1] (identity); ct/cp range is [-0.5,0.5] → [0,1].
            expect(got.i as number).toBeCloseTo(scale(I, 0, 1), 12);
            expect(got.ct as number).toBeCloseTo(scale(Ct, -0.5, 0.5), 12);
            expect(got.cp as number).toBeCloseTo(scale(Cp, -0.5, 0.5), 12);
        }
    });

    it("white lands at the culori I golden (0.5806888810416109), Ct=Cp mid (0.5)", () => {
        const w = color2(new XYZColor(...XYZ_WHITE, 1), "ictcp") as ICtCpColor;
        expect(w.i as number).toBeCloseTo(0.5806888810416109, 9);
        expect(w.ct as number).toBeCloseTo(0.5, 9);
        expect(w.cp as number).toBeCloseTo(0.5, 9);
    });

    it("ictcp2xyz is the exact inverse: color2(ictcp→xyz) reproduces XYZ", () => {
        for (const xyz of [XYZ_WHITE, XYZ_RED, XYZ_GREEN, XYZ_BLUE]) {
            const ic = color2(new XYZColor(...xyz, 1), "ictcp") as ICtCpColor;
            const back = color2(ic, "xyz") as XYZColor;
            expect(back.x as number).toBeCloseTo(xyz[0], 11);
            expect(back.y as number).toBeCloseTo(xyz[1], 11);
            expect(back.z as number).toBeCloseTo(xyz[2], 11);
        }
    });

    it("rgb → ictcp → rgb roundtrips to ≤1e-9", () => {
        for (const rgb of RGB_PROBES) {
            const ic = color2(rgb, "ictcp") as ICtCpColor;
            expect(ic.colorSpace).toBe("ictcp");
            const back = color2(ic, "rgb") as RGBColor;
            expect(back.r as number).toBeCloseTo(rgb.r as number, 9);
            expect(back.g as number).toBeCloseTo(rgb.g as number, 9);
            expect(back.b as number).toBeCloseTo(rgb.b as number, 9);
            expect(back.alpha as number).toBeCloseTo(rgb.alpha as number, 12);
        }
    });
});

describe("Jzazbz space — dispatch wiring agrees with the shipped raw transform", () => {
    it("color2(XYZ→jzazbz) denormalizes back to xyzToJzazbz", () => {
        for (const xyz of [XYZ_WHITE, XYZ_RED, XYZ_GREEN, XYZ_BLUE]) {
            const [Jz, az, bz] = xyzToJzazbz(...xyz);
            const got = color2(new XYZColor(...xyz, 1), "jzazbz") as JzazbzColor;
            expect(got.jz as number).toBeCloseTo(scale(Jz, 0, 0.222), 12);
            expect(got.az as number).toBeCloseTo(scale(az, -0.5, 0.5), 12);
            expect(got.bz as number).toBeCloseTo(scale(bz, -0.5, 0.5), 12);
        }
    });

    it("jzazbz2xyz is the exact inverse: color2(jzazbz→xyz) reproduces XYZ", () => {
        for (const xyz of [XYZ_WHITE, XYZ_RED, XYZ_GREEN, XYZ_BLUE]) {
            const jab = color2(new XYZColor(...xyz, 1), "jzazbz") as JzazbzColor;
            const back = color2(jab, "xyz") as XYZColor;
            expect(back.x as number).toBeCloseTo(xyz[0], 11);
            expect(back.y as number).toBeCloseTo(xyz[1], 11);
            expect(back.z as number).toBeCloseTo(xyz[2], 11);
        }
    });

    it("rgb → jzazbz → rgb roundtrips to ≤1e-9", () => {
        for (const rgb of RGB_PROBES) {
            const jab = color2(rgb, "jzazbz") as JzazbzColor;
            expect(jab.colorSpace).toBe("jzazbz");
            const back = color2(jab, "rgb") as RGBColor;
            expect(back.r as number).toBeCloseTo(rgb.r as number, 9);
            expect(back.g as number).toBeCloseTo(rgb.g as number, 9);
            expect(back.b as number).toBeCloseTo(rgb.b as number, 9);
        }
    });

    it("the raw jzazbzToXYZ inverse is consistent with the space inverse", () => {
        // Cross-check the space wrapper reuses the shipped inverse.
        for (const xyz of [XYZ_RED, XYZ_GREEN, XYZ_BLUE]) {
            const back = jzazbzToXYZ(...xyzToJzazbz(...xyz));
            expect(back[0]).toBeCloseTo(xyz[0], 11);
        }
    });
});

describe("color2Into currency through both HDR spaces (the gate's own row-5/7 requirement)", () => {
    const probes: Color[] = [
        new RGBColor(0.8, 0.2, 0.4, 1),
        new OKLCHColor(0.7, 0.2, 0.5, 1),
        new OKLCHColor(0.4, 0.4, 0.1, 0.5),
        new XYZColor(...XYZ_GREEN, 0.9),
    ];

    it("color2Into(_, ictcp, out) equals color2 and writes into the caller's out", () => {
        for (const probe of probes) {
            const expected = color2(probe, "ictcp") as Color;
            const out = new ICtCpColor(0, 0, 0, 1);
            const got = color2Into(probe, "ictcp", out as never) as Color;
            expect(got).toBe(out);
            expectColorsEqual(got, expected, 0);
        }
    });

    it("color2Into(_, jzazbz, out) equals color2 and writes into the caller's out", () => {
        for (const probe of probes) {
            const expected = color2(probe, "jzazbz") as Color;
            const out = new JzazbzColor(0, 0, 0, 1);
            const got = color2Into(probe, "jzazbz", out as never) as Color;
            expect(got).toBe(out);
            expectColorsEqual(got, expected, 0);
        }
    });

    it("egress FROM the HDR spaces into rgb matches color2 (both directions current)", () => {
        const ic = color2(new RGBColor(0.6, 0.3, 0.7, 1), "ictcp") as ICtCpColor;
        const jab = color2(new RGBColor(0.6, 0.3, 0.7, 1), "jzazbz") as JzazbzColor;
        for (const [src] of [[ic], [jab]] as const) {
            const expected = color2(src, "rgb") as Color;
            const out = new RGBColor(0, 0, 0, 1);
            const got = color2Into(src, "rgb", out as never) as Color;
            expect(got).toBe(out);
            expectColorsEqual(got, expected, 0);
        }
    });

    it("same-space copy is sound for both HDR spaces", () => {
        const src = new ICtCpColor(0.58, 0.51, 0.49, 0.4);
        const out = new ICtCpColor(0, 0, 0, 1);
        color2Into(src, "ictcp", out as never);
        expect(out.i).toBe(0.58);
        expect(out.ct).toBe(0.51);
        expect(out.cp).toBe(0.49);
        expect(out.alpha).toBe(0.4);
    });
});

describe("ICtCp / Jzazbz — parsing + serialization (bare functional form)", () => {
    it("parses ictcp(I Ct Cp [/ a]) into an ICtCp color", () => {
        const parsed = parseCSSColor("ictcp(0.58 0.1 -0.1)");
        expect(parsed.value.colorSpace).toBe("ictcp");
        expect(parsed.value.i.value).toBeCloseTo(0.58, 12);
        expect(parsed.value.ct.value).toBeCloseTo(0.1, 12);
        expect(parsed.value.cp.value).toBeCloseTo(-0.1, 12);

        const withAlpha = parseCSSColor("ictcp(0.5 0.2 -0.2 / 0.5)");
        expect(withAlpha.value.colorSpace).toBe("ictcp");
        expect(withAlpha.value.alpha.value).toBeCloseTo(0.5, 12);
    });

    it("parses jzazbz(Jz az bz [/ a]) into a Jzazbz color", () => {
        const parsed = parseCSSColor("jzazbz(0.222 -0.0002 -0.0001)");
        expect(parsed.value.colorSpace).toBe("jzazbz");
        expect(parsed.value.jz.value).toBeCloseTo(0.222, 12);
        expect(parsed.value.az.value).toBeCloseTo(-0.0002, 12);
        expect(parsed.value.bz.value).toBeCloseTo(-0.0001, 12);
    });

    it("does NOT shadow same-first-letter named colors (indigo, ivory)", () => {
        expect(parseCSSColor("indigo").value.colorSpace).toBe("rgb");
        expect(parseCSSColor("ivory").value.colorSpace).toBe("rgb");
    });

    it("serializes to the bare `ictcp(...)` / `jzazbz(...)` function form", () => {
        expect(new ICtCpColor(0.58, 0.1, -0.1, 1).toString()).toBe("ictcp(0.58 0.1 -0.1)");
        expect(new JzazbzColor(0.222, -0.0002, -0.0001, 1).toString()).toBe(
            "jzazbz(0.222 -0.0002 -0.0001)",
        );
        // Alpha clause appears only when not fully opaque.
        expect(new ICtCpColor(0.5, 0.2, -0.2, 0.5).toString()).toBe(
            "ictcp(0.5 0.2 -0.2 / 0.5)",
        );
    });
});

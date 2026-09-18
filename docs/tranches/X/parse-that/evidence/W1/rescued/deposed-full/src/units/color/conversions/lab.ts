/**
 * CIE Lab / LCH conversions.
 *
 * CIE Lab is D50-native — `xyzToD50` / `xyzToD65` apply the Bradford
 * chromatic-adaptation matrices so every XYZ output stays D65. LCH is the
 * polar form of Lab. The OKLab-family cluster lives in `oklab.ts`.
 *
 * G.W1 Lane B — extracted from `src/units/color/utils.ts` (G3 decomposition).
 */

import type { Vec3 } from "../matrix";
import { transformMat3 } from "../matrix";
import { ch, LABColor, LCHColor, XYZColor } from "..";
import { scale } from "../../../math";
import {
    COLOR_SPACE_RANGES,
    WHITE_POINT_D50_D65,
    WHITE_POINT_D65_D50,
    WHITE_POINTS,
} from "../constants";
import type { WhitePoint } from "../constants";

// ── White-point adaptation ──

function xyzToD50(xyz: XYZColor): Vec3 {
    if (xyz.whitePoint === "D50") return [xyz.x, xyz.y, xyz.z];
    if (xyz.whitePoint === "D65")
        return transformMat3([xyz.x, xyz.y, xyz.z], WHITE_POINT_D65_D50);
    throw new Error(`Unsupported white point: ${xyz.whitePoint}`);
}

function xyzToD65(xyz: XYZColor): Vec3 {
    if (xyz.whitePoint === "D65") return [xyz.x, xyz.y, xyz.z];
    if (xyz.whitePoint === "D50")
        return transformMat3([xyz.x, xyz.y, xyz.z], WHITE_POINT_D50_D65);
    throw new Error(`Unsupported white point: ${xyz.whitePoint}`);
}

// ── CIE Lab ↔ XYZ ──

// Constants for LAB color space calculations
const LAB_EPSILON = 216 / 24389; // Actual value is (6/29)^3
const LAB_EPSILON_3 = 24 / 116;

const LAB_KAPPA = 24389 / 27; // Actual value is (29/3)^3

const LAB_KAPPA_EPSILON = 8; // Product of KAPPA and EPSILON; exactly 8

const LAB_OFFSET = 16; // Offset for L* calculation

// Constants for scaling factors in LAB calculations
const LAB_SCALE_L = 116;
const LAB_SCALE_A = 500;
const LAB_SCALE_B = 200;

export function xyz2lab(xyz: XYZColor, toWhitePoint: WhitePoint = "D50"): LABColor {
    const labFunction = (value: number) =>
        value > LAB_EPSILON
            ? Math.cbrt(value)
            : (LAB_KAPPA * value + LAB_OFFSET) / LAB_SCALE_L;

    const whitePoint = WHITE_POINTS[toWhitePoint];

    const [x, y, z] = xyzToD50(xyz);

    // Normalize XYZ values relative to the given white point
    const xr = x / whitePoint[0], yr = y / whitePoint[1], zr = z / whitePoint[2];

    const fx = labFunction(xr), fy = labFunction(yr), fz = labFunction(zr);

    // Calculate L*, a*, and b* values
    const l = LAB_SCALE_L * fy - LAB_OFFSET; // L* = 116 * f(Y/Yn) - 16
    const a = LAB_SCALE_A * (fx - fy); // a* = 500 * [f(X/Xn) - f(Y/Yn)]
    const b = LAB_SCALE_B * (fy - fz); // b* = 200 * [f(Y/Yn) - f(Z/Zn)]

    const lab = new LABColor(
        scale(
            l,
            COLOR_SPACE_RANGES.lab.l.number.min,
            COLOR_SPACE_RANGES.lab.l.number.max,
        ),
        scale(
            a,
            COLOR_SPACE_RANGES.lab.a.number.min,
            COLOR_SPACE_RANGES.lab.a.number.max,
        ),
        scale(
            b,
            COLOR_SPACE_RANGES.lab.b.number.min,
            COLOR_SPACE_RANGES.lab.b.number.max,
        ),
        xyz.alpha,
    );

    lab.whitePoint = toWhitePoint;

    return lab;
}

export function lab2xyz(lab: LABColor): XYZColor {
    const labFunctionXZ = (value: number) =>
        value > LAB_EPSILON_3
            ? value ** 3
            : (LAB_SCALE_L * value - LAB_OFFSET) / LAB_KAPPA;

    const labFunctionY = (value: number) =>
        value > LAB_KAPPA_EPSILON
            ? ((value + LAB_OFFSET) / LAB_SCALE_L) ** 3
            : value / LAB_KAPPA;

    const whitePoint = WHITE_POINTS[lab.whitePoint];

    let { l, a, b, alpha } = lab;

    l = ch(scale(
        l,
        0,
        1,
        COLOR_SPACE_RANGES.lab.l.number.min,
        COLOR_SPACE_RANGES.lab.l.number.max,
    ));
    a = ch(scale(
        a,
        0,
        1,
        COLOR_SPACE_RANGES.lab.a.number.min,
        COLOR_SPACE_RANGES.lab.a.number.max,
    ));
    b = ch(scale(
        b,
        0,
        1,
        COLOR_SPACE_RANGES.lab.b.number.min,
        COLOR_SPACE_RANGES.lab.b.number.max,
    ));

    // Inverse of the xyz2lab function
    const fy = (l + LAB_OFFSET) / LAB_SCALE_L; // f(Y/Yn) = (L* + 16) / 116
    const fx = a / LAB_SCALE_A + fy; // f(X/Xn) = a* / 500 + f(Y/Yn)
    const fz = fy - b / LAB_SCALE_B; // f(Z/Zn) = f(Y/Yn) - b* / 200

    // Apply the inverse lab function to each value
    const [xr, yr, zr] = [labFunctionXZ(fx), labFunctionY(l), labFunctionXZ(fz)];

    // Denormalize XYZ values relative to the given white point
    let x = xr * whitePoint[0], y = yr * whitePoint[1], z = zr * whitePoint[2];

    const xyz = new XYZColor(x, y, z, alpha);
    xyz.whitePoint = lab.whitePoint;

    // All XYZ outputs are relative to D65:
    [x, y, z] = xyzToD65(xyz);

    xyz.whitePoint = "D65";

    xyz.x = ch(x);
    xyz.y = ch(y);
    xyz.z = ch(z);

    return xyz;
}

// ── CIE LCH (polar form of Lab) ──

// Input and output values in range [0, 1]
export function lch2lab({ l, c, h, alpha }: LCHColor): LABColor {
    c = ch(scale(
        c,
        0,
        1,
        COLOR_SPACE_RANGES.lch.c.number.min,
        COLOR_SPACE_RANGES.lch.c.number.max,
    ));

    const hRad = h * 2 * Math.PI;
    const a = Math.cos(hRad) * c;
    const b = Math.sin(hRad) * c;

    return new LABColor(
        l,
        scale(
            a,
            COLOR_SPACE_RANGES.lab.a.number.min,
            COLOR_SPACE_RANGES.lab.a.number.max,
        ),
        scale(
            b,
            COLOR_SPACE_RANGES.lab.b.number.min,
            COLOR_SPACE_RANGES.lab.b.number.max,
        ),
        alpha,
    );
}

// Input and output values in range [0, 1]
export function lab2lch({ l, a, b, alpha }: LABColor): LCHColor {
    a = ch(scale(
        a,
        0,
        1,
        COLOR_SPACE_RANGES.lab.a.number.min,
        COLOR_SPACE_RANGES.lab.a.number.max,
    ));
    b = ch(scale(
        b,
        0,
        1,
        COLOR_SPACE_RANGES.lab.b.number.min,
        COLOR_SPACE_RANGES.lab.b.number.max,
    ));

    const c = Math.hypot(a, b);

    let h = Math.atan2(b, a) / (2 * Math.PI);
    if (h < 0) h += 1;

    return new LCHColor(
        l,
        scale(
            c,
            COLOR_SPACE_RANGES.lch.c.number.min,
            COLOR_SPACE_RANGES.lch.c.number.max,
        ),
        h,
        alpha,
    );
}

// ── XYZ-hub composition for LCH ──

export function lch2xyz(lch: LCHColor): XYZColor {
    const lab = lch2lab(lch);
    return lab2xyz(lab);
}

export function xyz2lch(xyz: XYZColor): LCHColor {
    const lab = xyz2lab(xyz);
    return lab2lch(lab);
}

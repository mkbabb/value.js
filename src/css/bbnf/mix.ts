// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.b — css-color-5 §3 `color-mix()`: THE RESOLUTION. Ported whole from X.P.W5.c's resolver
// (parse-that `ec18f4b`, WPT computed 887/887; evidence `docs/tranches/X/parse-that/evidence/W6/
// retired-seam/typescript/src/css/color-mix.mjs`), typed, and fed by the BBNF grammar's
// `colorMix` rule. It is arithmetic over parsed values, never a reader of source text.
//
// Every step is the specification's, cited where it is taken:
//   css-values-5 §6.1  "normalize mix percentages" (the force-normalization flag set, leftover)
//   css-color-5  §3.3  the item stack, the progress `b / (a + b)` (0.5 when the sum is 0), the
//                      alpha multiplier, and Oklab as the default space (§3.1)
//   css-color-4  §13   interpolation: analogous components carried forward (§13.2), powerless
//                      components to missing on conversion (§4.4), missing components filled
//                      from the other colour (§13.3), premultiplied alpha (§13.4), the four hue
//                      fix-ups (§13.5)
//   css-color-4  §18   the sample conversion code — every matrix and transfer function below is
//                      transcribed from it, not re-derived.
//
// THE RESULT'S SPACE. `CssColorSpace` has thirteen members; four of the sixteen interpolation
// spaces are not among them, and each is written in the member that represents it exactly:
//   srgb → `rgb` (channels ×255) · xyz / xyz-d65 → `xyz` · xyz-d50 → `xyz` (D50→D65, §18) ·
//   display-p3-linear → `xyz` (its linear matrix, §18). css-color-4 §13.2: a missing component is
//   0 through a conversion, so a `none` in those linear results converts as 0.

import type { CssColor } from "../types";

type Vec3 = [number, number, number];
type Mat3 = readonly [Vec3, Vec3, Vec3];
type Ch = number | null;
type Ch3 = [Ch, Ch, Ch];

/* ── §18 sample code: matrices and white points ─────────────────────────────────────────────── */

const D50: Vec3 = [0.3457 / 0.3585, 1.0, (1.0 - 0.3457 - 0.3585) / 0.3585];

const mul = (M: Mat3, [x, y, z]: Readonly<Vec3>): Vec3 => [
    M[0][0] * x + M[0][1] * y + M[0][2] * z,
    M[1][0] * x + M[1][1] * y + M[1][2] * z,
    M[2][0] * x + M[2][1] * y + M[2][2] * z,
];
const map3 = (v: Readonly<Vec3>, f: (x: number, i: number) => number): Vec3 => [f(v[0], 0), f(v[1], 1), f(v[2], 2)];
const SRGB_TO_XYZ: Mat3 = [
    [506752 / 1228815, 87881 / 245763, 12673 / 70218],
    [87098 / 409605, 175762 / 245763, 12673 / 175545],
    [7918 / 409605, 87881 / 737289, 1001167 / 1053270],
];
const XYZ_TO_SRGB: Mat3 = [
    [12831 / 3959, -329 / 214, -1974 / 3959],
    [-851781 / 878810, 1648619 / 878810, 36519 / 878810],
    [705 / 12673, -2585 / 12673, 705 / 667],
];
const P3_TO_XYZ: Mat3 = [
    [608311 / 1250200, 189793 / 714400, 198249 / 1000160],
    [35783 / 156275, 247089 / 357200, 198249 / 2500400],
    [0 / 1, 32229 / 714400, 5220557 / 5000800],
];
const XYZ_TO_P3: Mat3 = [
    [446124 / 178915, -333277 / 357830, -72051 / 178915],
    [-14852 / 17905, 63121 / 35810, 423 / 17905],
    [11844 / 330415, -50337 / 660830, 316169 / 330415],
];
const PROPHOTO_TO_XYZ_D50: Mat3 = [
    [0.7977666449006423, 0.13518129740053308, 0.0313477341283922],
    [0.2880748288194013, 0.711835234241873, 0.00008993693872564],
    [0.0, 0.0, 0.8251046025104602],
];
const XYZ_D50_TO_PROPHOTO: Mat3 = [
    [1.3457868816471583, -0.25557208737979464, -0.05110186497554526],
    [-0.5446307051249019, 1.5082477428451468, 0.02052744743642139],
    [0.0, 0.0, 1.2119675456389452],
];
const A98_TO_XYZ: Mat3 = [
    [573536 / 994567, 263643 / 1420810, 187206 / 994567],
    [591459 / 1989134, 6239551 / 9945670, 374412 / 4972835],
    [53769 / 1989134, 351524 / 4972835, 4929758 / 4972835],
];
const XYZ_TO_A98: Mat3 = [
    [1829569 / 896150, -506331 / 896150, -308931 / 896150],
    [-851781 / 878810, 1648619 / 878810, 36519 / 878810],
    [16779 / 1248040, -147721 / 1248040, 1266979 / 1248040],
];
const REC2020_TO_XYZ: Mat3 = [
    [63426534 / 99577255, 20160776 / 139408157, 47086771 / 278816314],
    [26158966 / 99577255, 472592308 / 697040785, 8267143 / 139408157],
    [0 / 1, 19567812 / 697040785, 295819943 / 278816314],
];
const XYZ_TO_REC2020: Mat3 = [
    [30757411 / 17917100, -6372589 / 17917100, -4539589 / 17917100],
    [-19765991 / 29648200, 47925759 / 29648200, 467509 / 29648200],
    [792561 / 44930125, -1921689 / 44930125, 42328811 / 44930125],
];
const D65_TO_D50: Mat3 = [
    [1.0479297925449969, 0.022946870601609652, -0.05019226628920524],
    [0.02962780877005599, 0.9904344267538799, -0.017073799063418826],
    [-0.009243040646204504, 0.015055191490298152, 0.7518742814281371],
];
const D50_TO_D65: Mat3 = [
    [0.955473421488075, -0.02309845494876471, 0.06325924320057072],
    [-0.0283697093338637, 1.0099953980813041, 0.021041441191917323],
    [0.012314014864481998, -0.020507649298898964, 1.330365926242124],
];
const XYZ_TO_LMS: Mat3 = [
    [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
    [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
    [0.0481771893596242, 0.2642395317527308, 0.6335478284694309],
];
const LMS_TO_OKLAB: Mat3 = [
    [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
    [1.9779985324311684, -2.4285922420485799, 0.450593709617411],
    [0.0259040424655478, 0.7827717124575296, -0.8086757549230774],
];
const LMS_TO_XYZ: Mat3 = [
    [1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
    [-0.0405757452148008, 1.112286803280317, -0.0717110580655164],
    [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816],
];
const OKLAB_TO_LMS: Mat3 = [
    [1.0, 0.3963377773761749, 0.2158037573099136],
    [1.0, -0.1055613458156586, -0.0638541728258133],
    [1.0, -0.0894841775298119, -1.2914855480194092],
];


/* ── §18 transfer functions ─────────────────────────────────────────────────────────────────── */

type Transfer = (v: number) => number;
const signed = (f: Transfer): Transfer => (v) => (v < 0 ? -f(-v) : f(v));
const linSrgb = signed((a) => (a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4)));
const gamSrgb = signed((a) => (a > 0.0031308 ? 1.055 * Math.pow(a, 1 / 2.4) - 0.055 : 12.92 * a));
const linProPhoto = signed((a) => (a <= 16 / 512 ? a / 16 : Math.pow(a, 1.8)));
const gamProPhoto = signed((a) => (a >= 1 / 512 ? Math.pow(a, 1 / 1.8) : 16 * a));
const linA98 = signed((a) => Math.pow(a, 563 / 256));
const gamA98 = signed((a) => Math.pow(a, 256 / 563));
const lin2020 = signed((a) => Math.pow(a, 2.4));
const gam2020 = signed((a) => Math.pow(a, 1 / 2.4));

/* ── §18 Lab / OKLab / polar forms, and §7–§8 hsl / hwb ─────────────────────────────────────── */

const LAB_E = 216 / 24389;
const LAB_K = 24389 / 27;

function xyzD50ToLab(XYZ: Vec3): Vec3 {
    const f = map3(XYZ, (v, i) => {
        const r = v / D50[i as 0 | 1 | 2];
        return r > LAB_E ? Math.cbrt(r) : (LAB_K * r + 16) / 116;
    });
    return [116 * f[1] - 16, 500 * (f[0] - f[1]), 200 * (f[1] - f[2])];
}
function labToXyzD50([L, a, b]: Vec3): Vec3 {
    const f1 = (L + 16) / 116;
    const f0 = a / 500 + f1;
    const f2 = f1 - b / 200;
    const xyz: Vec3 = [
        Math.pow(f0, 3) > LAB_E ? Math.pow(f0, 3) : (116 * f0 - 16) / LAB_K,
        L > LAB_K * LAB_E ? Math.pow((L + 16) / 116, 3) : L / LAB_K,
        Math.pow(f2, 3) > LAB_E ? Math.pow(f2, 3) : (116 * f2 - 16) / LAB_K,
    ];
    return map3(xyz, (v, i) => v * D50[i as 0 | 1 | 2]);
}
const xyzToOklab = (XYZ: Vec3): Vec3 => mul(LMS_TO_OKLAB, map3(mul(XYZ_TO_LMS, XYZ), Math.cbrt));
const oklabToXyz = (Lab: Vec3): Vec3 => mul(LMS_TO_XYZ, map3(mul(OKLAB_TO_LMS, Lab), (c) => c ** 3));

/** Rectangular → polar. The hue is `NaN` (powerless) at or below the space's chroma ε (§4.4). */
function toPolar([L, a, b]: Vec3, epsilon: number): Vec3 {
    const C = Math.sqrt(a * a + b * b);
    let H = (Math.atan2(b, a) * 180) / Math.PI;
    if (H < 0) H += 360;
    return [L, C, C <= epsilon ? NaN : H];
}
const fromPolar = ([L, C, H]: Vec3): Vec3 => [L, C * Math.cos((H * Math.PI) / 180), C * Math.sin((H * Math.PI) / 180)];

/** §7.1 `hslToRgb`, over saturation/lightness in [0, 1] (the `hsl` channel scale). */
function hslToRgb([hue, sat, light]: Vec3): Vec3 {
    const f = (n: number): number => {
        const k = (n + hue / 30) % 12;
        const a = sat * Math.min(light, 1 - light);
        return light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    };
    return [f(0), f(8), f(4)];
}
function rgbToHue(red: number, green: number, blue: number): number {
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const d = max - min;
    let hue = NaN;
    if (d !== 0) {
        switch (max) {
            case red: hue = (green - blue) / d + (green < blue ? 6 : 0); break;
            case green: hue = (blue - red) / d + 2; break;
            default: hue = (red - green) / d + 4;
        }
        hue *= 60;
    }
    if (hue >= 360) hue -= 360;
    return hue;
}
/** §7.2 `rgbToHsl`, answering saturation/lightness in [0, 1]; ε = 1/100000 (S <= 0.001 on 0..100). */
function rgbToHsl([red, green, blue]: Vec3): Vec3 {
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    let hue = rgbToHue(red, green, blue);
    let sat = 0;
    const light = (min + max) / 2;
    if (max - min !== 0) sat = light === 0 || light === 1 ? 0 : (max - light) / Math.min(light, 1 - light);
    if (sat < 0) {
        hue += 180;
        sat = Math.abs(sat);
    }
    if (hue >= 360) hue -= 360;
    if (sat <= 1 / 100000) hue = NaN;
    return [hue, sat, light];
}
/** §8.1 `hwbToRgb`, over whiteness/blackness in [0, 1]. */
function hwbToRgb([hue, white, black]: Vec3): Vec3 {
    if (white + black >= 1) {
        const gray = white / (white + black);
        return [gray, gray, gray];
    }
    return map3(hslToRgb([hue, 1, 0.5]), (c) => c * (1 - white - black) + white);
}
/** §8.2 `rgbToHwb`: the hue is powerless when W + B >= 1 - ε, ε = 1/100000. */
function rgbToHwb([red, green, blue]: Vec3): Vec3 {
    const hue = rgbToHue(red, green, blue);
    const white = Math.min(red, green, blue);
    const black = 1 - Math.max(red, green, blue);
    return [white + black >= 1 - 1 / 100000 ? NaN : hue, white, black];
}

/* ── the sixteen interpolation spaces (css-color-4 §13.1) ───────────────────────────────────── */
//
// `cats` names each channel's analogous category (css-color-4 §13.2's table: Reds r,x · Greens g,y ·
// Blues b,z · Lightness L · Colorfulness C,S · Hue H · Opponent a · Opponent b); `null` is a channel
// with no analog (HWB's whiteness and blackness). `hue` is the hue channel's index in a polar
// space and `chroma` the colorfulness index whose ε (§4.4, the per-space "powerless hue ε") zeroes
// a noise chroma when its hue turns powerless on conversion.

type Category = "R" | "G" | "B" | "L" | "C" | "H" | "A" | "O" | null;
type Space = Readonly<{
    cats: readonly [Category, Category, Category];
    toXyz: (c: Vec3) => Vec3;
    fromXyz: (x: Vec3) => Vec3;
    toSrgb?: (c: Vec3) => Vec3;
    fromSrgb?: (c: Vec3) => Vec3;
    hue?: 0 | 2;
    chroma?: 1;
    epsilon?: number;
}>;

const RGB_CATS = ["R", "G", "B"] as const;
const rgbSpace = (toLinearXyz: (c: Vec3) => Vec3, fromXyzLinear: (x: Vec3) => Vec3, lin?: Transfer, gam?: Transfer): Space => ({
    cats: RGB_CATS,
    toXyz: (c) => toLinearXyz(lin ? map3(c, lin) : c),
    fromXyz: (x) => (gam ? map3(fromXyzLinear(x), gam) : fromXyzLinear(x)),
});
const copy = (c: Vec3): Vec3 => [c[0], c[1], c[2]];
const srgb: Space = {
    ...rgbSpace((c) => mul(SRGB_TO_XYZ, c), (x) => mul(XYZ_TO_SRGB, x), linSrgb, gamSrgb),
    toSrgb: copy,
    fromSrgb: copy,
};
const lab: Space = {
    cats: ["L", "A", "O"],
    toXyz: (c) => mul(D50_TO_D65, labToXyzD50(c)),
    fromXyz: (x) => xyzD50ToLab(mul(D65_TO_D50, x)),
};
const oklab: Space = { cats: ["L", "A", "O"], toXyz: oklabToXyz, fromXyz: xyzToOklab };

export type MixSpace =
    | "srgb" | "srgb-linear" | "display-p3" | "display-p3-linear" | "a98-rgb" | "prophoto-rgb" | "rec2020"
    | "lab" | "oklab" | "xyz-d65" | "xyz-d50" | "hsl" | "hwb" | "lch" | "oklch";

const SPACES: Readonly<Record<MixSpace, Space>> = Object.freeze({
    srgb,
    "srgb-linear": rgbSpace((c) => mul(SRGB_TO_XYZ, c), (x) => mul(XYZ_TO_SRGB, x)),
    "display-p3": rgbSpace((c) => mul(P3_TO_XYZ, c), (x) => mul(XYZ_TO_P3, x), linSrgb, gamSrgb),
    "display-p3-linear": rgbSpace((c) => mul(P3_TO_XYZ, c), (x) => mul(XYZ_TO_P3, x)),
    "a98-rgb": rgbSpace((c) => mul(A98_TO_XYZ, c), (x) => mul(XYZ_TO_A98, x), linA98, gamA98),
    "prophoto-rgb": rgbSpace(
        (c) => mul(D50_TO_D65, mul(PROPHOTO_TO_XYZ_D50, c)),
        (x) => mul(XYZ_D50_TO_PROPHOTO, mul(D65_TO_D50, x)),
        linProPhoto,
        gamProPhoto,
    ),
    rec2020: rgbSpace((c) => mul(REC2020_TO_XYZ, c), (x) => mul(XYZ_TO_REC2020, x), lin2020, gam2020),
    lab,
    oklab,
    "xyz-d65": { cats: RGB_CATS, toXyz: copy, fromXyz: copy },
    "xyz-d50": { cats: RGB_CATS, toXyz: (c) => mul(D50_TO_D65, c), fromXyz: (x) => mul(D65_TO_D50, x) },
    hsl: {
        cats: ["H", "C", "L"],
        hue: 0,
        chroma: 1,
        epsilon: 1 / 100000,
        toXyz: (c) => srgb.toXyz(hslToRgb(c)),
        fromXyz: (x) => rgbToHsl(srgb.fromXyz(x)),
        toSrgb: hslToRgb,
        fromSrgb: rgbToHsl,
    },
    hwb: {
        cats: ["H", null, null],
        hue: 0,
        toXyz: (c) => srgb.toXyz(hwbToRgb(c)),
        fromXyz: (x) => rgbToHwb(srgb.fromXyz(x)),
        toSrgb: hwbToRgb,
        fromSrgb: rgbToHwb,
    },
    lch: {
        cats: ["L", "C", "H"],
        hue: 2,
        chroma: 1,
        epsilon: 0.0015,
        toXyz: (c) => lab.toXyz(fromPolar(c)),
        fromXyz: (x) => toPolar(lab.fromXyz(x), 0.0015),
    },
    oklch: {
        cats: ["L", "C", "H"],
        hue: 2,
        chroma: 1,
        epsilon: 0.000004,
        toXyz: (c) => oklab.toXyz(fromPolar(c)),
        fromXyz: (x) => toPolar(oklab.fromXyz(x), 0.000004),
    },
});

/** css-color-4 §18: `color(display-p3-linear …)` written exactly as the `xyz` (D65) it names. */
export const displayP3LinearToXyz = (c: Vec3): Vec3 => mul(P3_TO_XYZ, c);

/** The method's space as the table names it: `xyz` is `xyz-d65` (css-color-4 §10.8). */
export const mixSpaceOf = (name: string): MixSpace => (name === "xyz" ? "xyz-d65" : name) as MixSpace;

type SpaceColor = Readonly<{ space: MixSpace; ch: Ch3; alpha: Ch }>;
type Placed = Readonly<{ ch: Ch3; alpha: Ch }>;

/** A `CssColor` as an interpolation-space colour: `rgb` is sRGB on 0..255, `xyz` is D65. */
function fromCssColor(color: CssColor): SpaceColor {
    const v = (x: number | "none"): Ch => (x === "none" ? null : x);
    const [a, b, c] = color.channels;
    const alpha = v(color.alpha);
    if (color.space === "rgb") {
        const s = (x: number | "none"): Ch => (x === "none" ? null : x / 255);
        return { space: "srgb", ch: [s(a), s(b), s(c)], alpha };
    }
    return { space: mixSpaceOf(color.space), ch: [v(a), v(b), v(c)], alpha };
}

/* ── css-color-4 §13: one colour into the interpolation space ───────────────────────────────── */

/**
 * §13.2 then §4.4: the carried-forward components are identified FIRST (from the source's missing
 * channels, individually by category and then as the remaining analogous set), the colour is
 * converted with every missing channel as 0, a powerless hue produced by the conversion becomes
 * missing (its noise chroma ≤ ε zeroed), and the carried components are re-inserted as missing.
 * A colour already IN the space is not converted, so nothing about it turns powerless.
 */
function toInterpolationSpace(color: SpaceColor, space: MixSpace): Placed {
    if (color.space === space) return { ch: [...color.ch], alpha: color.alpha };
    const src = SPACES[color.space];
    const dst = SPACES[space];
    const INDEX = [0, 1, 2] as const;
    const carried = new Set<number>();
    INDEX.forEach((i) => {
        const cat = src.cats[i];
        if (color.ch[i] === null && cat !== null && dst.cats.includes(cat)) carried.add(dst.cats.indexOf(cat));
    });
    const srcRest = INDEX.filter((i) => src.cats[i] === null || !dst.cats.includes(src.cats[i]));
    const dstRest = INDEX.filter((j) => dst.cats[j] === null || !src.cats.includes(dst.cats[j]));
    if (srcRest.length > 0 && srcRest.every((i) => color.ch[i] === null)) dstRest.forEach((j) => carried.add(j));

    //  srgb, hsl and hwb are one gamut in three coordinate systems (css-color-4 §7.1, §8.1 define
    //  hsl() and hwb() as transformations OF sRGB), so a conversion among them goes through sRGB
    //  directly: routing it through XYZ manufactures a hue (`white` returns as 1 ± 1e-16 per channel
    //  and §7.2's saturation divides that noise by `1 - light`).
    const zeros: Vec3 = [color.ch[0] ?? 0, color.ch[1] ?? 0, color.ch[2] ?? 0];
    const converted = src.toSrgb && dst.fromSrgb ? dst.fromSrgb(src.toSrgb(zeros)) : dst.fromXyz(src.toXyz(zeros));
    const present = (x: number): Ch => (Number.isNaN(x) ? null : x);
    const ch: Ch3 = [present(converted[0]), present(converted[1]), present(converted[2])];
    if (dst.hue !== undefined && ch[dst.hue] === null && dst.chroma !== undefined && dst.epsilon !== undefined) {
        const c = ch[dst.chroma];
        if (c !== null && c > 0 && c <= dst.epsilon) ch[dst.chroma] = 0;
    }
    for (const j of carried) ch[j as 0 | 1 | 2] = null;
    return { ch, alpha: color.alpha };
}

const mod360 = (h: number): number => ((h % 360) + 360) % 360;

export type HueMethod = "shorter" | "longer" | "increasing" | "decreasing";

/** §13.5 — the hue fix-up, over two present hues already constrained to [0, 360). */
function fixHues(h1: number, h2: number, method: HueMethod): [number, number] {
    const d = h2 - h1;
    switch (method) {
        case "longer":
            if (d > 0 && d < 180) h1 += 360;
            else if (d > -180 && d <= 0) h2 += 360;
            break;
        case "increasing":
            if (d < 0) h2 += 360;
            break;
        case "decreasing":
            if (d > 0) h1 += 360;
            break;
        default: //                                                 shorter, the default (§13.5)
            if (d > 180) h1 += 360;
            else if (d < -180) h2 += 360;
    }
    return [h1, h2];
}

/** §13.3 fill, §13.5 fix-up, §13.4 premultiply, interpolate at `t`, un-premultiply. */
function interpolate(a: Placed, b: Placed, t: number, space: MixSpace, method: HueMethod): Placed {
    const hue = SPACES[space].hue;
    const fill = (x: Ch3, y: Ch3): Ch3 => [x[0] ?? y[0], x[1] ?? y[1], x[2] ?? y[2]];
    const A = fill(a.ch, b.ch);
    const B = fill(b.ch, a.ch);
    const aAlpha = a.alpha ?? b.alpha;
    const bAlpha = b.alpha ?? a.alpha;
    if (hue !== undefined) {
        const h1 = A[hue];
        const h2 = B[hue];
        if (h1 !== null && h2 !== null) [A[hue], B[hue]] = fixHues(mod360(h1), mod360(h2), method);
    }
    const premultiply = (ch: Ch3, alpha: Ch): Ch3 =>
        alpha === null ? ch : ch.map((x, i) => (x === null || i === hue ? x : x * alpha)) as Ch3;
    const P = premultiply(A, aAlpha);
    const Q = premultiply(B, bAlpha);
    const lerp = (i: 0 | 1 | 2): Ch => {
        const x = P[i];
        const y = Q[i];
        return x === null || y === null ? null : x + (y - x) * t;
    };
    const ch: Ch3 = [lerp(0), lerp(1), lerp(2)];
    const alpha = aAlpha === null || bAlpha === null ? null : aAlpha + (bAlpha - aAlpha) * t;
    const out: Ch3 = alpha === null || alpha === 0 ? ch : ch.map((x, i) => (x === null || i === hue ? x : x / alpha)) as Ch3;
    if (hue !== undefined) {
        const h = out[hue];
        if (h !== null) out[hue] = mod360(h);
    }
    return { ch: out, alpha };
}

/* ── css-values-5 §6.1 and css-color-5 §3.3 ─────────────────────────────────────────────────── */

/** "normalize mix percentages" with the force-normalization flag set: `{ weights, leftover }`, in %. */
export function normalizeMixPercentages(percentages: readonly (number | undefined)[]): { weights: number[]; leftover: number } {
    const given = percentages.filter((p): p is number => p !== undefined);
    const specifiedSum = given.length === 0 ? 0 : Math.min(100, given.reduce((s, p) => s + p, 0));
    const omitted = percentages.length - given.length;
    const weights = percentages.map((p) => (p === undefined ? (100 - specifiedSum) / omitted : p));
    const total = weights.reduce((s, p) => s + p, 0);
    const scaled = total > 0 ? weights.map((p) => (p * 100) / total) : weights;
    return { weights: scaled, leftover: total < 100 ? 100 - total : 0 };
}

export type MixItem = Readonly<{ color: CssColor; percentage?: number }>;
export type ColorMix = Readonly<{ space?: string; hue?: HueMethod; items: readonly MixItem[] }>;

/** The interpolation-space result as a `CssColor` (the header's four representations). */
function toCssColor({ ch, alpha }: Placed, space: MixSpace): CssColor {
    const none = (x: Ch): number | "none" => (x === null ? "none" : x);
    const zero: Vec3 = [ch[0] ?? 0, ch[1] ?? 0, ch[2] ?? 0];
    const linear = (M: Mat3): CssColor => ({ space: "xyz", channels: mul(M, zero), alpha: none(alpha) });
    const channels = [none(ch[0]), none(ch[1]), none(ch[2])] as const;
    switch (space) {
        case "srgb": {
            const s = (x: Ch): number | "none" => (x === null ? "none" : x * 255);
            return { space: "rgb", channels: [s(ch[0]), s(ch[1]), s(ch[2])], alpha: none(alpha) };
        }
        case "xyz-d65": return { space: "xyz", channels, alpha: none(alpha) };
        case "xyz-d50": return linear(D50_TO_D65);
        case "display-p3-linear": return linear(P3_TO_XYZ);
        default: return { space, channels, alpha: none(alpha) } as CssColor;
    }
}

const finite = (x: number | "none"): boolean => x === "none" || Number.isFinite(x);

/**
 * css-color-5 §3.3 over a parsed `color-mix()`. Answers the `CssColor` the mix computes to, or
 * `null` when an input is too large for the arithmetic to stay finite — the caller's refusal,
 * never a non-finite colour.
 */
export function resolveColorMix(mix: ColorMix): CssColor | null {
    const space = mixSpaceOf(mix.space ?? "oklab"); //   §3.1: Oklab by default
    const method = mix.hue ?? "shorter";
    const colors = mix.items.map((item) => toInterpolationSpace(fromCssColor(item.color), space));
    const { weights, leftover } = normalizeMixPercentages(mix.items.map((item) => item.percentage));
    const [first, ...rest] = colors;
    if (first === undefined) return null;
    let acc = first;
    let accWeight = weights[0] ?? 0;
    rest.forEach((color, k) => {
        const weight = weights[k + 1] ?? 0;
        const combined = accWeight + weight;
        acc = interpolate(acc, color, combined > 0 ? weight / combined : 0.5, space, method);
        accWeight = combined;
    });
    const alphaMult = 1 - leftover / 100;
    const result = toCssColor({ ch: acc.ch, alpha: acc.alpha === null ? null : acc.alpha * alphaMult }, space);
    return result.channels.every(finite) && finite(result.alpha) ? result : null;
}

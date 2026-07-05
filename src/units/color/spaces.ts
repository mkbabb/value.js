// The 15 CSS color-space subclasses of `Color<T>` + the `ColorSpaceMap<T>`
// discriminated-union type.
//
// S.W1 W1-8 (god-module class-hierarchy split): lifted verbatim from `index.ts`.
// Each subclass `extends Color` (imported from the LEAF `base.ts`, which is
// guaranteed evaluated first) — own-property storage, V8 monomorphic. `index.ts`
// re-exports every class so `import { RGBColor } from "."` is unchanged.

import { Color } from "./base";
import type { ColorChannel } from "./base";

// ──────────────────────────────────────────────────────────────────────────────
// 15 color-space subclasses — own-property storage (V8 monomorphic).
//
// E.W1 Lane B (WhitePointColor lift): the `WhitePointColor<T>` intermediate
// class previously sat between Color<T> and the three white-point-bearing
// subclasses (LAB, OKLAB, XYZ). Its sole purpose was to carry a `whitePoint`
// field — but that asymmetric inheritance broke the type-level invariant
// (OKLCH is the cylindrical form of OKLAB yet inherited from Color directly,
// not the white-point intermediate). `whitePoint` now lives on Color<T> base
// with a D65 default; LAB/OKLAB override to D50 in their constructors.
// See `docs/tranches/E/audit/E.W1-lane-b-whitepoint-lift.md`.
// ──────────────────────────────────────────────────────────────────────────────

const _RGB_CHANNELS = ["r", "g", "b"] as const;
const _HSL_CHANNELS = ["h", "s", "l"] as const;
const _HSV_CHANNELS = ["h", "s", "v"] as const;
const _HWB_CHANNELS = ["h", "w", "b"] as const;
const _LAB_CHANNELS = ["l", "a", "b"] as const;
const _LCH_CHANNELS = ["l", "c", "h"] as const;
const _XYZ_CHANNELS = ["x", "y", "z"] as const;
const _KELVIN_CHANNELS = ["kelvin"] as const;

// E.W1 Lane C — channel-keys-with-alpha tuples cached per subclass shape.
// Static-per-subclass pattern avoids per-instance copies AND per-call
// allocation in `Color.keys()`. Frozen + `as const` for V8 hidden-class
// stability — every Color subclass references the same shared tuple object.
const _RGB_KEYS_A = ["r", "g", "b", "alpha"] as const;
const _HSL_KEYS_A = ["h", "s", "l", "alpha"] as const;
const _HSV_KEYS_A = ["h", "s", "v", "alpha"] as const;
const _HWB_KEYS_A = ["h", "w", "b", "alpha"] as const;
const _LAB_KEYS_A = ["l", "a", "b", "alpha"] as const;
const _LCH_KEYS_A = ["l", "c", "h", "alpha"] as const;
const _XYZ_KEYS_A = ["x", "y", "z", "alpha"] as const;
const _KELVIN_KEYS_A = ["kelvin", "alpha"] as const;

/** sRGB color space — the web's default. Components: r, g, b in [0,255] denormalized. D65 white point, ~2.2 gamma. */
export class RGBColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _RGB_KEYS_A;
    declare r: ColorChannel<T>;
    declare g: ColorChannel<T>;
    declare b: ColorChannel<T>;

    get channels(): readonly string[] {
        return _RGB_CHANNELS;
    }

    constructor(r?: T, g?: T, b?: T, alpha?: T) {
        super("rgb", alpha as T);
        if (import.meta.env.DEV) {
            Color._assertChannel(r);
            Color._assertChannel(g);
            Color._assertChannel(b);
        }
        this.r = r as ColorChannel<T>;
        this.g = g as ColorChannel<T>;
        this.b = b as ColorChannel<T>;
    }
}

/** HSL cylindrical space — hue [0,360], saturation [0,1], lightness [0,1]. D65 white point. */
export class HSLColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _HSL_KEYS_A;
    declare h: ColorChannel<T>;
    declare s: ColorChannel<T>;
    declare l: ColorChannel<T>;

    get channels(): readonly string[] {
        return _HSL_CHANNELS;
    }

    constructor(h?: T, s?: T, l?: T, alpha?: T) {
        super("hsl", alpha as T);
        if (import.meta.env.DEV) {
            Color._assertChannel(h);
            Color._assertChannel(s);
            Color._assertChannel(l);
        }
        this.h = h as ColorChannel<T>;
        this.s = s as ColorChannel<T>;
        this.l = l as ColorChannel<T>;
    }
}

/** HSV cylindrical space — hue [0,360], saturation [0,1], value [0,1]. D65 white point. */
export class HSVColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _HSV_KEYS_A;
    declare h: ColorChannel<T>;
    declare s: ColorChannel<T>;
    declare v: ColorChannel<T>;

    get channels(): readonly string[] {
        return _HSV_CHANNELS;
    }

    constructor(h?: T, s?: T, v?: T, alpha?: T) {
        super("hsv", alpha as T);
        if (import.meta.env.DEV) {
            Color._assertChannel(h);
            Color._assertChannel(s);
            Color._assertChannel(v);
        }
        this.h = h as ColorChannel<T>;
        this.s = s as ColorChannel<T>;
        this.v = v as ColorChannel<T>;
    }
}

/** HWB space — hue [0,360], whiteness [0,1], blackness [0,1]. D65 white point. */
export class HWBColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _HWB_KEYS_A;
    declare h: ColorChannel<T>;
    declare w: ColorChannel<T>;
    declare b: ColorChannel<T>;

    get channels(): readonly string[] {
        return _HWB_CHANNELS;
    }

    constructor(h?: T, w?: T, b?: T, alpha?: T) {
        super("hwb", alpha as T);
        if (import.meta.env.DEV) {
            Color._assertChannel(h);
            Color._assertChannel(w);
            Color._assertChannel(b);
        }
        this.h = h as ColorChannel<T>;
        this.w = w as ColorChannel<T>;
        this.b = b as ColorChannel<T>;
    }
}

/** CIE Lab (D50) — perceptual lightness L [0,100], a/b axes [-125,125]. */
export class LABColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _LAB_KEYS_A;
    declare l: ColorChannel<T>;
    declare a: ColorChannel<T>;
    declare b: ColorChannel<T>;

    get channels(): readonly string[] {
        return _LAB_CHANNELS;
    }

    constructor(l?: T, a?: T, b?: T, alpha?: T) {
        super("lab", alpha as T);
        this.whitePoint = "D50";
        if (import.meta.env.DEV) {
            Color._assertChannel(l);
            Color._assertChannel(a);
            Color._assertChannel(b);
        }
        this.l = l as ColorChannel<T>;
        this.a = a as ColorChannel<T>;
        this.b = b as ColorChannel<T>;
    }
}

/** CIE LCH (D50) — cylindrical form of Lab. L [0,100], C [0,150], H [0,360]. */
export class LCHColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _LCH_KEYS_A;
    declare l: ColorChannel<T>;
    declare c: ColorChannel<T>;
    declare h: ColorChannel<T>;

    get channels(): readonly string[] {
        return _LCH_CHANNELS;
    }

    constructor(l?: T, c?: T, h?: T, alpha?: T) {
        super("lch", alpha as T);
        if (import.meta.env.DEV) {
            Color._assertChannel(l);
            Color._assertChannel(c);
            Color._assertChannel(h);
        }
        this.l = l as ColorChannel<T>;
        this.c = c as ColorChannel<T>;
        this.h = h as ColorChannel<T>;
    }
}

/** OKLab (D50) — perceptually uniform. L [0,1], a/b [-0.4,0.4]. Björn Ottosson's improvement over CIE Lab. */
export class OKLABColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _LAB_KEYS_A;
    declare l: ColorChannel<T>;
    declare a: ColorChannel<T>;
    declare b: ColorChannel<T>;

    get channels(): readonly string[] {
        return _LAB_CHANNELS;
    }

    constructor(l?: T, a?: T, b?: T, alpha?: T) {
        super("oklab", alpha as T);
        this.whitePoint = "D50";
        if (import.meta.env.DEV) {
            Color._assertChannel(l);
            Color._assertChannel(a);
            Color._assertChannel(b);
        }
        this.l = l as ColorChannel<T>;
        this.a = a as ColorChannel<T>;
        this.b = b as ColorChannel<T>;
    }
}

/** OKLCH — cylindrical form of OKLab. L [0,1], C [0,0.4], H [0,360]. CSS Color Level 4 recommended space. */
export class OKLCHColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _LCH_KEYS_A;
    declare l: ColorChannel<T>;
    declare c: ColorChannel<T>;
    declare h: ColorChannel<T>;

    get channels(): readonly string[] {
        return _LCH_CHANNELS;
    }

    constructor(l?: T, c?: T, h?: T, alpha?: T) {
        super("oklch", alpha as T);
        if (import.meta.env.DEV) {
            Color._assertChannel(l);
            Color._assertChannel(c);
            Color._assertChannel(h);
        }
        this.l = l as ColorChannel<T>;
        this.c = c as ColorChannel<T>;
        this.h = h as ColorChannel<T>;
    }
}

/** CIE XYZ (D65) — the connection space hub for all conversions. Unbounded components. */
export class XYZColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _XYZ_KEYS_A;
    declare x: ColorChannel<T>;
    declare y: ColorChannel<T>;
    declare z: ColorChannel<T>;

    get channels(): readonly string[] {
        return _XYZ_CHANNELS;
    }

    constructor(x?: T, y?: T, z?: T, alpha?: T) {
        super("xyz", alpha as T);
        // whitePoint defaults to "D65" on Color<T> base — explicit set elided.
        if (import.meta.env.DEV) {
            Color._assertChannel(x);
            Color._assertChannel(y);
            Color._assertChannel(z);
        }
        this.x = x as ColorChannel<T>;
        this.y = y as ColorChannel<T>;
        this.z = z as ColorChannel<T>;
    }
}

/** Color temperature — single kelvin component [1000,40000]. Converts through blackbody radiation to sRGB. */
export class KelvinColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _KELVIN_KEYS_A;
    declare kelvin: ColorChannel<T>;

    get channels(): readonly string[] {
        return _KELVIN_CHANNELS;
    }

    constructor(kelvin?: T, alpha?: T) {
        super("kelvin", alpha as T);
        if (import.meta.env.DEV) {
            Color._assertChannel(kelvin);
        }
        this.kelvin = kelvin as ColorChannel<T>;
    }
}

/** Linear-light sRGB — no gamma curve. Components r, g, b in [0,1]. D65 white point. */
export class LinearSRGBColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _RGB_KEYS_A;
    declare r: ColorChannel<T>;
    declare g: ColorChannel<T>;
    declare b: ColorChannel<T>;

    get channels(): readonly string[] {
        return _RGB_CHANNELS;
    }

    constructor(r?: T, g?: T, b?: T, alpha?: T) {
        super("srgb-linear", alpha as T);
        if (import.meta.env.DEV) {
            Color._assertChannel(r);
            Color._assertChannel(g);
            Color._assertChannel(b);
        }
        this.r = r as ColorChannel<T>;
        this.g = g as ColorChannel<T>;
        this.b = b as ColorChannel<T>;
    }
}

/** Display P3 — wide-gamut space used by Apple displays. Components r, g, b in [0,1]. D65, sRGB transfer. */
export class DisplayP3Color<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _RGB_KEYS_A;
    declare r: ColorChannel<T>;
    declare g: ColorChannel<T>;
    declare b: ColorChannel<T>;

    get channels(): readonly string[] {
        return _RGB_CHANNELS;
    }

    constructor(r?: T, g?: T, b?: T, alpha?: T) {
        super("display-p3", alpha as T);
        if (import.meta.env.DEV) {
            Color._assertChannel(r);
            Color._assertChannel(g);
            Color._assertChannel(b);
        }
        this.r = r as ColorChannel<T>;
        this.g = g as ColorChannel<T>;
        this.b = b as ColorChannel<T>;
    }
}

/** Adobe RGB (1998) — wide-gamut space for print/photography. Components r, g, b in [0,1]. D65, gamma 2.2. */
export class AdobeRGBColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _RGB_KEYS_A;
    declare r: ColorChannel<T>;
    declare g: ColorChannel<T>;
    declare b: ColorChannel<T>;

    get channels(): readonly string[] {
        return _RGB_CHANNELS;
    }

    constructor(r?: T, g?: T, b?: T, alpha?: T) {
        super("a98-rgb", alpha as T);
        if (import.meta.env.DEV) {
            Color._assertChannel(r);
            Color._assertChannel(g);
            Color._assertChannel(b);
        }
        this.r = r as ColorChannel<T>;
        this.g = g as ColorChannel<T>;
        this.b = b as ColorChannel<T>;
    }
}

/** ProPhoto RGB (ROMM) — ultra-wide gamut for photography. Components r, g, b in [0,1]. D50, gamma 1.8. */
export class ProPhotoRGBColor<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _RGB_KEYS_A;
    declare r: ColorChannel<T>;
    declare g: ColorChannel<T>;
    declare b: ColorChannel<T>;

    get channels(): readonly string[] {
        return _RGB_CHANNELS;
    }

    constructor(r?: T, g?: T, b?: T, alpha?: T) {
        super("prophoto-rgb", alpha as T);
        if (import.meta.env.DEV) {
            Color._assertChannel(r);
            Color._assertChannel(g);
            Color._assertChannel(b);
        }
        this.r = r as ColorChannel<T>;
        this.g = g as ColorChannel<T>;
        this.b = b as ColorChannel<T>;
    }
}

/** ITU-R BT.2020 — HDR/UHD broadcast gamut. Components r, g, b in [0,1]. D65, PQ transfer. */
export class Rec2020Color<T = number> extends Color<T> {
    static readonly channelKeysWithAlpha = _RGB_KEYS_A;
    declare r: ColorChannel<T>;
    declare g: ColorChannel<T>;
    declare b: ColorChannel<T>;

    get channels(): readonly string[] {
        return _RGB_CHANNELS;
    }

    constructor(r?: T, g?: T, b?: T, alpha?: T) {
        super("rec2020", alpha as T);
        if (import.meta.env.DEV) {
            Color._assertChannel(r);
            Color._assertChannel(g);
            Color._assertChannel(b);
        }
        this.r = r as ColorChannel<T>;
        this.g = g as ColorChannel<T>;
        this.b = b as ColorChannel<T>;
    }
}

export type ColorSpaceMap<T> = {
    rgb: RGBColor<T>;
    hsl: HSLColor<T>;
    hsv: HSVColor<T>;
    hwb: HWBColor<T>;
    lab: LABColor<T>;
    lch: LCHColor<T>;
    oklab: OKLABColor<T>;
    oklch: OKLCHColor<T>;
    kelvin: KelvinColor<T>;
    xyz: XYZColor<T>;
    "srgb-linear": LinearSRGBColor<T>;
    "display-p3": DisplayP3Color<T>;
    "a98-rgb": AdobeRGBColor<T>;
    "prophoto-rgb": ProPhotoRGBColor<T>;
    rec2020: Rec2020Color<T>;
};

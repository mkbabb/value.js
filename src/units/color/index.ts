import { clone } from "../../utils";
import type { ColorSpace, WhitePoint } from "./constants";

const formatNumber = (value: unknown, digits: number = 2): string => {
    if (typeof value === "number" && !Number.isFinite(value)) return "none";
    return (String((value as any)?.toFixed?.(digits) ?? value))
        .trim()
        .replace(/\.0+$/, "");
};

const formatColor = <T>(colorSpace: ColorSpace, values: T[], alpha: T) => {
    return `${colorSpace}(${values.join(" ")} / ${alpha})`;
};

// ──────────────────────────────────────────────────────────────────────────────
// L8 hardening primitive (a) — ColorChannel<T> phantom brand
// ──────────────────────────────────────────────────────────────────────────────
// Compile-time guard against `instance.r = otherColorInstance` (the iOS Safari
// nesting pattern). Zero runtime cost — the brand is a phantom unique-symbol type.
// Internal-only: NOT exported from src/index.ts. Brand only narrows the
// instance's declared fields; constructor parameters remain plain T.
declare const __ColorChannel: unique symbol;
export type ColorChannel<T = number> = T & { readonly [__ColorChannel]: true };

/**
 * Abstract base class for all CSS color spaces.
 *
 * Generic over component type `T` — `number` for math operations,
 * `ValueUnit` for CSS parsing/serialization.
 *
 * **L8 storage**: components live as own properties on the instance (e.g.
 * `instance.r`, `instance.l`) — V8 hidden-class monomorphic. Subclasses declare
 * their fields via `declare r: ColorChannel<T>` and override `get channels()`.
 *
 * All 15 color spaces extend this class. Conversion between spaces routes
 * through XYZ D65 as the hub (see `utils.ts`). Components are normalized to
 * [0,1] internally; physical ranges (e.g. [0,255] for RGB, [0,360] for hue)
 * are applied on output.
 */
export abstract class Color<T = number> {
    [key: string]: any;

    constructor(
        public readonly colorSpace: ColorSpace,
        public alpha: T = 1 as T,
    ) {}

    /**
     * The static channel-name list for this color space (e.g. `["r","g","b"]`
     * for RGBColor). Subclasses override.
     */
    abstract get channels(): readonly string[];

    // L8 hardening primitive (b) — dev-only nesting assertion.
    // Static helper invoked from subclass constructors, gated behind the
    // dev flag. The production build inlines the flag to false and esbuild
    // minify-DCE strips the call site (verified by an audit-doc grep).
    static _assertChannel(value: unknown): void {
        if (value instanceof Color) {
            throw new Error(
                "Color channel nesting detected: tried to assign a Color into a channel slot. " +
                    "This is the iOS Safari stack-overflow pattern. Unwrap before assigning.",
            );
        }
        // ValueUnit detection via duck-typing — avoids parent-of-parent circular import.
        // Reads .constructor.name and .value.constructor.name to detect VU<VU<...>>.
        if (
            value != null &&
            typeof value === "object" &&
            (value as any).constructor?.name === "ValueUnit" &&
            (value as any).value != null &&
            typeof (value as any).value === "object" &&
            (value as any).value.constructor?.name === "ValueUnit"
        ) {
            throw new Error(
                "ValueUnit double-wrap detected: tried to assign ValueUnit<ValueUnit<…>>. " +
                    "Unwrap before assigning.",
            );
        }
    }

    // L8 hardening primitive (d) — clone() depth-guard.
    // Single static counter; tripped if the structure exceeds 16 levels.
    // Legitimate chains bottom out at depth 3 — threshold is generous.
    private static _cloneDepth = 0;
    private static readonly CLONE_DEPTH_LIMIT = 16;

    toString(): string {
        const values = this.values().slice(0, -1).map((v) =>
            typeof v === "number" && Number.isNaN(v) ? "none" : v,
        );
        const alpha =
            typeof this.alpha === "number" && Number.isNaN(this.alpha as number)
                ? "none"
                : this.alpha;
        return formatColor(this.colorSpace, values, alpha);
    }

    toFormattedString(digits: number = 2): string {
        const values = this.values()
            .slice(0, -1)
            .map((value) => formatNumber(value, digits));
        const alpha = formatNumber(this.alpha, digits);
        return formatColor(this.colorSpace, values, alpha);
    }

    valueOf(): T[] {
        return [...this.values(), this.alpha];
    }

    toJSON(): Record<string, T> {
        const obj: Record<string, T> = {};
        for (const [key, value] of this.entries()) {
            obj[key] = value;
        }
        obj["alpha"] = this.alpha;
        return obj;
    }

    clone(): this {
        if (++Color._cloneDepth > Color.CLONE_DEPTH_LIMIT) {
            Color._cloneDepth = 0;
            throw new Error(
                `Color.clone() exceeded depth ${Color.CLONE_DEPTH_LIMIT}. ` +
                    `This is the iOS Safari stack-overflow precursor. ` +
                    `Inspect the structure for ValueUnit/Color self-nesting.`,
            );
        }
        try {
            const C = this.constructor as new () => this;
            const cloned = new C();
            cloned.alpha = clone(this.alpha);
            for (const k of this.channels) {
                (cloned as any)[k] = clone((this as any)[k]);
            }
            return cloned;
        } finally {
            Color._cloneDepth--;
        }
    }

    keys(): string[] {
        return [...this.channels, "alpha"];
    }

    values(): T[] {
        const out: T[] = [];
        const ch = this.channels;
        for (let i = 0; i < ch.length; i++) out.push((this as any)[ch[i]!]);
        out.push(this.alpha);
        return out;
    }

    entries(): [string, T][] {
        const out: [string, T][] = [];
        const ch = this.channels;
        for (let i = 0; i < ch.length; i++) out.push([ch[i]!, (this as any)[ch[i]!]]);
        out.push(["alpha", this.alpha]);
        return out;
    }
}

class WhitePointColor<T = number> extends Color<T> {
    constructor(
        colorSpace: ColorSpace,
        alpha: T,
        public whitePoint: WhitePoint,
    ) {
        super(colorSpace, alpha);
    }

    // Abstract override — concrete subclasses override `channels` themselves.
    get channels(): readonly string[] {
        return [];
    }
}

// ──────────────────────────────────────────────────────────────────────────────
// 15 color-space subclasses — own-property storage (V8 monomorphic).
// ──────────────────────────────────────────────────────────────────────────────

const _RGB_CHANNELS = ["r", "g", "b"] as const;
const _HSL_CHANNELS = ["h", "s", "l"] as const;
const _HSV_CHANNELS = ["h", "s", "v"] as const;
const _HWB_CHANNELS = ["h", "w", "b"] as const;
const _LAB_CHANNELS = ["l", "a", "b"] as const;
const _LCH_CHANNELS = ["l", "c", "h"] as const;
const _XYZ_CHANNELS = ["x", "y", "z"] as const;
const _KELVIN_CHANNELS = ["kelvin"] as const;

/** sRGB color space — the web's default. Components: r, g, b in [0,255] denormalized. D65 white point, ~2.2 gamma. */
export class RGBColor<T = number> extends Color<T> {
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
export class LABColor<T = number> extends WhitePointColor<T> {
    declare l: ColorChannel<T>;
    declare a: ColorChannel<T>;
    declare b: ColorChannel<T>;

    get channels(): readonly string[] {
        return _LAB_CHANNELS;
    }

    constructor(l?: T, a?: T, b?: T, alpha?: T) {
        super("lab", alpha as T, "D50");
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
export class OKLABColor<T = number> extends WhitePointColor<T> {
    declare l: ColorChannel<T>;
    declare a: ColorChannel<T>;
    declare b: ColorChannel<T>;

    get channels(): readonly string[] {
        return _LAB_CHANNELS;
    }

    constructor(l?: T, a?: T, b?: T, alpha?: T) {
        super("oklab", alpha as T, "D50");
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
export class XYZColor<T = number> extends WhitePointColor<T> {
    declare x: ColorChannel<T>;
    declare y: ColorChannel<T>;
    declare z: ColorChannel<T>;

    get channels(): readonly string[] {
        return _XYZ_CHANNELS;
    }

    constructor(x?: T, y?: T, z?: T, alpha?: T) {
        super("xyz", alpha as T, "D65");
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

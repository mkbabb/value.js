import { clone } from "../../utils";
import type { ColorSpace, WhitePoint } from "./constants";

/** Structural guard for any value carrying a `toFixed(digits)` method —
 *  matches both `number` and `ValueUnit` (the two `T` shapes a channel holds). */
const hasToFixed = (
    value: unknown,
): value is { toFixed(digits: number): string } =>
    value != null &&
    typeof (value as { toFixed?: unknown }).toFixed === "function";

const formatNumber = (value: unknown, digits: number = 2): string => {
    if (typeof value === "number" && !Number.isFinite(value)) return "none";
    const fixed = hasToFixed(value) ? value.toFixed(digits) : String(value);
    return fixed.trim().replace(/\.0+$/, "");
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
 * Brand-erasing identity helper. Casts a plain `T` value to `ColorChannel<T>`
 * at write sites that compute channels from arithmetic / interpolation. The
 * `ColorChannel<T>` brand on declared fields requires an explicit cast on
 * assignment — this helper makes the intent clear and keeps the line short.
 *
 * Zero runtime cost (identity function; inlined by V8).
 *
 * E.W1 Lane E — lifted from per-file duplicates in `utils.ts` + `contrast.ts`
 * to live alongside the `ColorChannel<T>` brand declaration. Internal-only:
 * NOT re-exported from `src/index.ts`.
 */
export const ch = <T>(v: T): ColorChannel<T> => v as ColorChannel<T>;

// ──────────────────────────────────────────────────────────────────────────────
// G.W2 Lane C (G-OPP-4) — typed channel accessors.
// ──────────────────────────────────────────────────────────────────────────────
// `Color<T>` keeps its `[key: string]: any` index signature for public dynamic
// access (see the BREAKING-decision verdict on the class). These two helpers are
// the *internal* typed surface: they localise the single dynamic-index boundary
// per direction and hand callers a real `ColorChannel<T>` type instead of `any`.
//
// `channelOf` reads a channel slot; `setChannel` writes one. Both are zero-cost
// (a single property access; inlined by V8). The `clone()`/`values()`/
// `entries()` methods and the `interpolate.ts` + `normalize.ts` pipeline route
// every channel read/write through these — retiring the untyped index-access
// pattern repo-wide without re-introducing the wide-`any` leak.

/**
 * Typed channel read. `key` is any channel name from `color.channels` /
 * `color.keys()`; the result is the branded `ColorChannel<T>` slot value.
 *
 * The lone assertion re-narrows the index-signature read to `ColorChannel<T>` —
 * a documented index-narrowing at the one dynamic-access boundary, not a
 * type-erasing double cast.
 */
export const channelOf = <T>(color: Color<T>, key: string): ColorChannel<T> =>
    color[key] as ColorChannel<T>;

/**
 * Typed channel write. Accepts a `ColorChannel<T>` (use `ch()` to brand a raw
 * computed value) and assigns it to the named slot.
 */
export const setChannel = <T>(
    color: Color<T>,
    key: string,
    value: ColorChannel<T>,
): void => {
    color[key] = value;
};

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
    /**
     * Dynamic channel index signature.
     *
     * **G.W2 Lane C (G-OPP-4) — BREAKING-decision verdict: KEEP (documented).**
     *
     * `Color<T>` is publicly barrel-exported (`src/index.ts`) and the demo
     * dynamically indexes instances by a runtime `component: string`
     * (`useColorModel.ts:197,206`, `ComponentSliders.vue:56,178`,
     * `useSliderGradients.ts:36`). The signature is therefore part of the
     * observable public surface — dropping it is a BREAKING change.
     *
     * It also *cannot* be tightened to a typed `[channel: string]:
     * ColorChannel<T> | T` form: a TypeScript string index signature requires
     * **every** declared member to be assignable to it, and `Color<T>` carries
     * non-channel members (`whitePoint: WhitePoint`, `colorSpace: ColorSpace`,
     * and the `toString`/`values`/`entries`/… methods) whose types are not
     * assignable to a channel-value union. `any` is the only index type the
     * heterogeneous class shape admits.
     *
     * The internal pipeline no longer *relies* on this `any` leak, though — the
     * typed `ch<T>` channel accessors below (`channelOf` / `setChannel`) give
     * `clone()`/`values()`/`entries()` + `interpolate.ts` + `normalize.ts`
     * cast-free `ColorChannel<T>`-typed reads/writes. The index signature
     * survives purely as the public dynamic-access affordance.
     */
    [key: string]: any;

    /**
     * Reference white point for this color instance.
     *
     * E.W1 Lane B (WhitePointColor lift): hoisted from the deleted
     * `WhitePointColor<T>` intermediate class to the base. Optional with a
     * D65 default — the historically D50 spaces (`LABColor`, `OKLABColor`)
     * set `"D50"` explicitly in their constructors; `XYZColor` keeps the
     * D65 default to mirror its prior `super(…, "D65")` call.
     *
     * Subclasses that don't carry a meaningful white point (HSL/HSV/HWB
     * cylindrical, KelvinColor) leave it as the inherited default; reads
     * are harmless and the field is monomorphic across all 14 subclasses
     * (V8 hidden-class stable — verified by `bench/color-channel-access.mjs`).
     */
    public whitePoint: WhitePoint = "D65";

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
        // Structurally typed (`{ constructor; value }`) — no `any` — so the
        // nested-property reads are checked, not laundered.
        const vu = value as { constructor?: { name?: string }; value?: unknown };
        const inner = vu?.value as { constructor?: { name?: string } };
        if (
            value != null &&
            typeof value === "object" &&
            vu.constructor?.name === "ValueUnit" &&
            inner != null &&
            typeof inner === "object" &&
            inner.constructor?.name === "ValueUnit"
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
                setChannel(cloned, k, clone(channelOf(this, k)));
            }
            return cloned;
        } finally {
            Color._cloneDepth--;
        }
    }

    /**
     * Return the ordered list of channel keys followed by `"alpha"`.
     *
     * E.W1 Lane C — cached as a static-per-subclass `readonly` tuple
     * (`channelKeysWithAlpha`). Pre-Lane-C this allocated a new array on every
     * call via `[...this.channels, "alpha"]`; the demo gradient interpolation
     * + `lerpColorValue` + `mixColors` + `normalizeColor` all hit this path
     * per frame, so the per-call array churn was measurable.
     *
     * Subclasses define their own `static readonly channelKeysWithAlpha`
     * (frozen tuple); the base falls back to a synthesized array for the
     * abstract case (never reached in normal flow — there is no abstract
     * `Color` instance — but kept for type safety).
     */
    keys(): readonly string[] {
        const C = this.constructor as typeof Color & {
            channelKeysWithAlpha?: readonly string[];
        };
        return C.channelKeysWithAlpha ?? [...this.channels, "alpha"];
    }

    values(): T[] {
        const out: T[] = [];
        const keys = this.channels;
        for (let i = 0; i < keys.length; i++) out.push(channelOf(this, keys[i]!));
        out.push(this.alpha);
        return out;
    }

    entries(): [string, T][] {
        const out: [string, T][] = [];
        const keys = this.channels;
        for (let i = 0; i < keys.length; i++) {
            out.push([keys[i]!, channelOf(this, keys[i]!)]);
        }
        out.push(["alpha", this.alpha]);
        return out;
    }
}

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

// ──────────────────────────────────────────────────────────────────────────────
// Color-subsystem barrel — conversion dispatch + interpolation surface.
//
// G.W1 Lane B (G3 decomposition): the former `color/utils.ts` god-module
// (1,430 LoC) was split into `conversions/{hex,kelvin,cylindrical,lab,
// transfer,xyz-extended}.ts` + `dispatch.ts`. This barrel re-exports the
// public surface so consumers depend on the color subsystem, not on the
// internal module layout.
// ──────────────────────────────────────────────────────────────────────────────

export {
    getFormattedColorSpaceRange,
    color2,
    gamutMap,
    interpolateHue,
    mixColors,
    CYLINDRICAL_HUE_COMPONENT,
    hex2rgb,
    rgb2hex,
} from "./dispatch";
export type { HueInterpolationMethod } from "./dispatch";
// OKLab contrast helpers — sourced directly from contrast.ts (K.W2e).
export {
    computeSafeAccent,
    safeAccentColor,
    needsContrastAdjustment,
    getOklchLightness,
} from "./contrast";

import { clone } from "@src/utils";
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

/**
 * Abstract base class for all CSS color spaces.
 *
 * Generic over component type `T` — `number` for math operations,
 * `ValueUnit` for CSS parsing/serialization. Components are stored
 * in a Map keyed by channel name (e.g. "r", "g", "b" for RGB).
 *
 * All 15 color spaces extend this class. Conversion between spaces
 * routes through XYZ D65 as the hub (see `utils.ts`).
 *
 * Components are normalized to [0,1] internally; physical ranges
 * (e.g. [0,255] for RGB, [0,360] for hue) are applied on output.
 */
export abstract class Color<T = number> {
    [key: string]: any;

    protected components: Map<string, T>;

    constructor(
        public readonly colorSpace: ColorSpace,
        public alpha: T = 1 as T,
    ) {
        this.components = new Map<string, T>();
    }

    toString(): string {
        const values = Array.from(this.components.values()).map((v) =>
            typeof v === "number" && Number.isNaN(v) ? "none" : v,
        );
        const alpha = typeof this.alpha === "number" && Number.isNaN(this.alpha as number) ? "none" : this.alpha;
        return formatColor(this.colorSpace, values, alpha);
    }

    toFormattedString(digits: number = 2): string {
        const values = Array.from(this.components.values()).map((value) =>
            formatNumber(value, digits),
        );
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
        const Constructor = this.constructor as new (...args: any[]) => this;
        const cloned = new Constructor();

        cloned.alpha = clone(this.alpha);

        this.components.forEach((value, key) => {
            cloned.components.set(key, clone(value));
        });

        return cloned;
    }

    keys(): string[] {
        return [...this.components.keys(), "alpha"];
    }

    values(): T[] {
        return [...this.components.values(), this.alpha];
    }

    entries(): [string, T][] {
        return [...this.components.entries(), ["alpha", this.alpha]];
    }

    protected getComponent(key: string): T | undefined {
        return this.components.get(key);
    }

    protected setComponent(key: string, value: T): void {
        this.components.set(key, value);
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
}

/** sRGB color space — the web's default. Components: r, g, b in [0,255] denormalized. D65 white point, ~2.2 gamma. */
export class RGBColor<T = number> extends Color<T> {
    constructor(r: T, g: T, b: T, alpha?: T) {
        super("rgb", alpha!);
        this.components.set("r", r);
        this.components.set("g", g);
        this.components.set("b", b);
    }

    get r(): T {
        return this.getComponent("r")!;
    }
    set r(value: T) {
        this.setComponent("r", value);
    }

    get g(): T {
        return this.getComponent("g")!;
    }
    set g(value: T) {
        this.setComponent("g", value);
    }

    get b(): T {
        return this.getComponent("b")!;
    }
    set b(value: T) {
        this.setComponent("b", value);
    }
}

/** HSL cylindrical space — hue [0,360], saturation [0,1], lightness [0,1]. D65 white point. */
export class HSLColor<T = number> extends Color<T> {
    constructor(h: T, s: T, l: T, alpha?: T) {
        super("hsl", alpha!);
        this.components.set("h", h);
        this.components.set("s", s);
        this.components.set("l", l);
    }

    get h(): T {
        return this.getComponent("h")!;
    }
    set h(value: T) {
        this.setComponent("h", value);
    }

    get s(): T {
        return this.getComponent("s")!;
    }
    set s(value: T) {
        this.setComponent("s", value);
    }

    get l(): T {
        return this.getComponent("l")!;
    }
    set l(value: T) {
        this.setComponent("l", value);
    }
}

/** HSV cylindrical space — hue [0,360], saturation [0,1], value [0,1]. D65 white point. */
export class HSVColor<T = number> extends Color<T> {
    constructor(h: T, s: T, v: T, alpha?: T) {
        super("hsv", alpha!);
        this.components.set("h", h);
        this.components.set("s", s);
        this.components.set("v", v);
    }

    get h(): T {
        return this.getComponent("h")!;
    }
    set h(value: T) {
        this.setComponent("h", value);
    }

    get s(): T {
        return this.getComponent("s")!;
    }
    set s(value: T) {
        this.setComponent("s", value);
    }

    get v(): T {
        return this.getComponent("v")!;
    }
    set v(value: T) {
        this.setComponent("v", value);
    }
}

/** HWB space — hue [0,360], whiteness [0,1], blackness [0,1]. D65 white point. */
export class HWBColor<T = number> extends Color<T> {
    constructor(h: T, w: T, b: T, alpha?: T) {
        super("hwb", alpha!);
        this.components.set("h", h);
        this.components.set("w", w);
        this.components.set("b", b);
    }

    get h(): T {
        return this.getComponent("h")!;
    }
    set h(value: T) {
        this.setComponent("h", value);
    }

    get w(): T {
        return this.getComponent("w")!;
    }
    set w(value: T) {
        this.setComponent("w", value);
    }

    get b(): T {
        return this.getComponent("b")!;
    }
    set b(value: T) {
        this.setComponent("b", value);
    }
}

/** CIE Lab (D50) — perceptual lightness L [0,100], a/b axes [-125,125]. */
export class LABColor<T = number> extends WhitePointColor<T> {
    constructor(l: T, a: T, b: T, alpha?: T) {
        super("lab", alpha!, "D50");
        this.components.set("l", l);
        this.components.set("a", a);
        this.components.set("b", b);
    }

    get l(): T {
        return this.getComponent("l")!;
    }
    set l(value: T) {
        this.setComponent("l", value);
    }

    get a(): T {
        return this.getComponent("a")!;
    }
    set a(value: T) {
        this.setComponent("a", value);
    }

    get b(): T {
        return this.getComponent("b")!;
    }
    set b(value: T) {
        this.setComponent("b", value);
    }
}

/** CIE LCH (D50) — cylindrical form of Lab. L [0,100], C [0,150], H [0,360]. */
export class LCHColor<T = number> extends Color<T> {
    constructor(l: T, c: T, h: T, alpha?: T) {
        super("lch", alpha!);
        this.components.set("l", l);
        this.components.set("c", c);
        this.components.set("h", h);
    }

    get l(): T {
        return this.getComponent("l")!;
    }
    set l(value: T) {
        this.setComponent("l", value);
    }

    get c(): T {
        return this.getComponent("c")!;
    }
    set c(value: T) {
        this.setComponent("c", value);
    }

    get h(): T {
        return this.getComponent("h")!;
    }
    set h(value: T) {
        this.setComponent("h", value);
    }
}

/** OKLab (D50) — perceptually uniform. L [0,1], a/b [-0.4,0.4]. Björn Ottosson's improvement over CIE Lab. */
export class OKLABColor<T = number> extends WhitePointColor<T> {
    constructor(l: T, a: T, b: T, alpha?: T) {
        super("oklab", alpha!, "D50");
        this.components.set("l", l);
        this.components.set("a", a);
        this.components.set("b", b);
    }

    get l(): T {
        return this.getComponent("l")!;
    }
    set l(value: T) {
        this.setComponent("l", value);
    }

    get a(): T {
        return this.getComponent("a")!;
    }
    set a(value: T) {
        this.setComponent("a", value);
    }

    get b(): T {
        return this.getComponent("b")!;
    }
    set b(value: T) {
        this.setComponent("b", value);
    }
}

/** OKLCH — cylindrical form of OKLab. L [0,1], C [0,0.4], H [0,360]. CSS Color Level 4 recommended space. */
export class OKLCHColor<T = number> extends Color<T> {
    constructor(l: T, c: T, h: T, alpha?: T) {
        super("oklch", alpha!);
        this.components.set("l", l);
        this.components.set("c", c);
        this.components.set("h", h);
    }

    get l(): T {
        return this.getComponent("l")!;
    }
    set l(value: T) {
        this.setComponent("l", value);
    }

    get c(): T {
        return this.getComponent("c")!;
    }
    set c(value: T) {
        this.setComponent("c", value);
    }

    get h(): T {
        return this.getComponent("h")!;
    }
    set h(value: T) {
        this.setComponent("h", value);
    }
}

/** CIE XYZ (D65) — the connection space hub for all conversions. Unbounded components. */
export class XYZColor<T = number> extends WhitePointColor<T> {
    constructor(x: T, y: T, z: T, alpha?: T) {
        super("xyz", alpha!, "D65");
        this.components.set("x", x);
        this.components.set("y", y);
        this.components.set("z", z);
    }

    get x(): T {
        return this.getComponent("x")!;
    }
    set x(value: T) {
        this.setComponent("x", value);
    }

    get y(): T {
        return this.getComponent("y")!;
    }
    set y(value: T) {
        this.setComponent("y", value);
    }

    get z(): T {
        return this.getComponent("z")!;
    }
    set z(value: T) {
        this.setComponent("z", value);
    }
}

/** Color temperature — single kelvin component [1000,40000]. Converts through blackbody radiation to sRGB. */
export class KelvinColor<T = number> extends Color<T> {
    constructor(kelvin: T, alpha?: T) {
        super("kelvin", alpha!);
        this.components.set("kelvin", kelvin);
    }

    get kelvin(): T {
        return this.getComponent("kelvin")!;
    }
    set kelvin(value: T) {
        this.setComponent("kelvin", value);
    }
}

/** Linear-light sRGB — no gamma curve. Components r, g, b in [0,1]. D65 white point. */
export class LinearSRGBColor<T = number> extends Color<T> {
    constructor(r: T, g: T, b: T, alpha?: T) {
        super("srgb-linear", alpha!);
        this.components.set("r", r);
        this.components.set("g", g);
        this.components.set("b", b);
    }
    get r(): T { return this.getComponent("r")!; }
    set r(value: T) { this.setComponent("r", value); }
    get g(): T { return this.getComponent("g")!; }
    set g(value: T) { this.setComponent("g", value); }
    get b(): T { return this.getComponent("b")!; }
    set b(value: T) { this.setComponent("b", value); }
}

/** Display P3 — wide-gamut space used by Apple displays. Components r, g, b in [0,1]. D65, sRGB transfer. */
export class DisplayP3Color<T = number> extends Color<T> {
    constructor(r: T, g: T, b: T, alpha?: T) {
        super("display-p3", alpha!);
        this.components.set("r", r);
        this.components.set("g", g);
        this.components.set("b", b);
    }
    get r(): T { return this.getComponent("r")!; }
    set r(value: T) { this.setComponent("r", value); }
    get g(): T { return this.getComponent("g")!; }
    set g(value: T) { this.setComponent("g", value); }
    get b(): T { return this.getComponent("b")!; }
    set b(value: T) { this.setComponent("b", value); }
}

/** Adobe RGB (1998) — wide-gamut space for print/photography. Components r, g, b in [0,1]. D65, gamma 2.2. */
export class AdobeRGBColor<T = number> extends Color<T> {
    constructor(r: T, g: T, b: T, alpha?: T) {
        super("a98-rgb", alpha!);
        this.components.set("r", r);
        this.components.set("g", g);
        this.components.set("b", b);
    }
    get r(): T { return this.getComponent("r")!; }
    set r(value: T) { this.setComponent("r", value); }
    get g(): T { return this.getComponent("g")!; }
    set g(value: T) { this.setComponent("g", value); }
    get b(): T { return this.getComponent("b")!; }
    set b(value: T) { this.setComponent("b", value); }
}

/** ProPhoto RGB (ROMM) — ultra-wide gamut for photography. Components r, g, b in [0,1]. D50, gamma 1.8. */
export class ProPhotoRGBColor<T = number> extends Color<T> {
    constructor(r: T, g: T, b: T, alpha?: T) {
        super("prophoto-rgb", alpha!);
        this.components.set("r", r);
        this.components.set("g", g);
        this.components.set("b", b);
    }
    get r(): T { return this.getComponent("r")!; }
    set r(value: T) { this.setComponent("r", value); }
    get g(): T { return this.getComponent("g")!; }
    set g(value: T) { this.setComponent("g", value); }
    get b(): T { return this.getComponent("b")!; }
    set b(value: T) { this.setComponent("b", value); }
}

/** ITU-R BT.2020 — HDR/UHD broadcast gamut. Components r, g, b in [0,1]. D65, PQ transfer. */
export class Rec2020Color<T = number> extends Color<T> {
    constructor(r: T, g: T, b: T, alpha?: T) {
        super("rec2020", alpha!);
        this.components.set("r", r);
        this.components.set("g", g);
        this.components.set("b", b);
    }
    get r(): T { return this.getComponent("r")!; }
    set r(value: T) { this.setComponent("r", value); }
    get g(): T { return this.getComponent("g")!; }
    set g(value: T) { this.setComponent("g", value); }
    get b(): T { return this.getComponent("b")!; }
    set b(value: T) { this.setComponent("b", value); }
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

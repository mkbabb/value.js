import type { Result } from "./foundation.js";
import { err, ok } from "./foundation.js";

export type SpaceId =
    | "rgb" | "hsl" | "hsv" | "hwb" | "lab" | "lch" | "oklab"
    | "oklch" | "xyz" | "kelvin" | "srgb-linear" | "display-p3"
    | "a98-rgb" | "prophoto-rgb" | "rec2020" | "ictcp" | "jzazbz";
export type Channel = number | "none";
export type Alpha = number | "none";
export type ChannelsBySpace = {
    rgb: readonly [r: Channel, g: Channel, b: Channel];
    hsl: readonly [h: Channel, s: Channel, l: Channel];
    hsv: readonly [h: Channel, s: Channel, v: Channel];
    hwb: readonly [h: Channel, w: Channel, b: Channel];
    lab: readonly [l: Channel, a: Channel, b: Channel];
    lch: readonly [l: Channel, c: Channel, h: Channel];
    oklab: readonly [l: Channel, a: Channel, b: Channel];
    oklch: readonly [l: Channel, c: Channel, h: Channel];
    xyz: readonly [x: Channel, y: Channel, z: Channel];
    kelvin: readonly [kelvin: Channel];
    "srgb-linear": readonly [r: Channel, g: Channel, b: Channel];
    "display-p3": readonly [r: Channel, g: Channel, b: Channel];
    "a98-rgb": readonly [r: Channel, g: Channel, b: Channel];
    "prophoto-rgb": readonly [r: Channel, g: Channel, b: Channel];
    rec2020: readonly [r: Channel, g: Channel, b: Channel];
    ictcp: readonly [i: Channel, ct: Channel, cp: Channel];
    jzazbz: readonly [jz: Channel, az: Channel, bz: Channel];
};
export type ColorIssue = Readonly<{ code:
    | "color_invalid_input"
    | "color_non_finite"
    | "color_out_of_range"
    | "color_missing_channel"
    | "color_missing_alpha"
    | "color_progress_out_of_range"
    | "contrast_unreachable"
}>;
export type Color<S extends SpaceId> = Readonly<{
    space: S;
    channels: ChannelsBySpace[S];
    alpha: Alpha;
}>;
export type AnyColor = { [S in SpaceId]: Color<S> }[SpaceId];
export type RGBA8 = readonly [r: number, g: number, b: number, a: number];
export type RgbGamut = "srgb" | "display-p3" | "a98-rgb" | "prophoto-rgb" | "rec2020";
export type HueInterpolationMethod = "shorter" | "longer" | "increasing" | "decreasing";
export type ColorFactory<S extends SpaceId> =
    (...args: [...ChannelsBySpace[S], alpha?: Alpha]) => Result<Color<S>, ColorIssue>;

type SpaceSchema = Readonly<{
    channels: readonly string[];
    hueIndex?: number;
    css: boolean;
}>;

export const SPACE_SCHEMA = {
    rgb: { channels: ["r", "g", "b"], css: true },
    hsl: { channels: ["h", "s", "l"], hueIndex: 0, css: true },
    hsv: { channels: ["h", "s", "v"], hueIndex: 0, css: false },
    hwb: { channels: ["h", "w", "b"], hueIndex: 0, css: true },
    lab: { channels: ["l", "a", "b"], css: true },
    lch: { channels: ["l", "c", "h"], hueIndex: 2, css: true },
    oklab: { channels: ["l", "a", "b"], css: true },
    oklch: { channels: ["l", "c", "h"], hueIndex: 2, css: true },
    xyz: { channels: ["x", "y", "z"], css: true },
    kelvin: { channels: ["kelvin"], css: false },
    "srgb-linear": { channels: ["r", "g", "b"], css: true },
    "display-p3": { channels: ["r", "g", "b"], css: true },
    "a98-rgb": { channels: ["r", "g", "b"], css: true },
    "prophoto-rgb": { channels: ["r", "g", "b"], css: true },
    rec2020: { channels: ["r", "g", "b"], css: true },
    ictcp: { channels: ["i", "ct", "cp"], css: false },
    jzazbz: { channels: ["jz", "az", "bz"], css: false },
} as const satisfies Record<SpaceId, SpaceSchema>;

export const SPACE_IDS = Object.keys(SPACE_SCHEMA) as SpaceId[];

function createColor<S extends SpaceId>(
    space: S,
    channels: ChannelsBySpace[S],
    alpha: Alpha = 1,
): Result<Color<S>, ColorIssue> {
    if (!Array.isArray(channels) || channels.length !== SPACE_SCHEMA[space].channels.length) {
        return err({ code: "color_invalid_input" });
    }
    if (channels.some((channel) => channel !== "none" && !Number.isFinite(channel))) {
        return err({ code: "color_non_finite" });
    }
    if (alpha !== "none" && !Number.isFinite(alpha)) return err({ code: "color_non_finite" });
    if (alpha !== "none" && (alpha < 0 || alpha > 1)) return err({ code: "color_out_of_range" });
    if (space === "kelvin" && channels[0] !== "none" && (channels[0] < 1000 || channels[0] > 40000)) {
        return err({ code: "color_out_of_range" });
    }
    return ok({ space, channels: [...channels] as unknown as ChannelsBySpace[S], alpha });
}

const factory = <S extends SpaceId>(space: S): ColorFactory<S> =>
    ((...args: [...ChannelsBySpace[S], alpha?: Alpha]) => {
        const count = SPACE_SCHEMA[space].channels.length;
        const channels = args.slice(0, count) as unknown as ChannelsBySpace[S];
        const alpha = (args.length > count ? args[count] : 1) as Alpha;
        return createColor(space, channels, alpha);
    }) as ColorFactory<S>;

export const rgb = factory("rgb");
export const hsl = factory("hsl");
export const hsv = factory("hsv");
export const hwb = factory("hwb");
export const lab = factory("lab");
export const lch = factory("lch");
export const oklab = factory("oklab");
export const oklch = factory("oklch");
export const xyz = factory("xyz");
export const kelvin = factory("kelvin");
export const linearSrgb = factory("srgb-linear");
export const displayP3 = factory("display-p3");
export const a98Rgb = factory("a98-rgb");
export const prophotoRgb = factory("prophoto-rgb");
export const rec2020 = factory("rec2020");
export const ictcp = factory("ictcp");
export const jzazbz = factory("jzazbz");

export function isAnyColor(value: unknown): value is AnyColor {
    if (!value || typeof value !== "object") return false;
    const candidate = value as { space?: unknown; channels?: unknown; alpha?: unknown };
    if (typeof candidate.space !== "string" || !(candidate.space in SPACE_SCHEMA)) return false;
    if (!Array.isArray(candidate.channels) || candidate.channels.length !== SPACE_SCHEMA[candidate.space as SpaceId].channels.length) return false;
    if (candidate.alpha !== "none" && typeof candidate.alpha !== "number") return false;
    return candidate.channels.every((channel) => channel === "none" || typeof channel === "number");
}

type Vec3 = readonly [number, number, number];
type Mat3 = readonly [number, number, number, number, number, number, number, number, number];

export const multiply = ([x, y, z]: Vec3, m: Mat3): Vec3 => [
    m[0] * x + m[1] * y + m[2] * z,
    m[3] * x + m[4] * y + m[5] * z,
    m[6] * x + m[7] * y + m[8] * z,
];

export const D50_TO_D65: Mat3 = [
    0.95547342148807501, -0.023098454948764641, 0.063259243200570692,
    -0.028369709333863888, 1.0099953980813041, 0.021041441191917334,
    0.012314014864481979, -0.020507649298898967, 1.3303659262421239,
];

export const adaptXyzD50ToD65 = (xyzValue: Vec3): Vec3 => multiply(xyzValue, D50_TO_D65);

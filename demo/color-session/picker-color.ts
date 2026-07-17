import {
    a98Rgb,
    convertColor,
    displayP3,
    hsl,
    hsv,
    hwb,
    ictcp,
    jzazbz,
    kelvin,
    lab,
    lch,
    linearSrgb,
    mapColorToGamut,
    oklab,
    oklch,
    prophotoRgb,
    rec2020,
    rgb,
    toRgba8,
    xyz,
    type Alpha,
    type AnyColor,
    type Channel,
    type Result,
    type SpaceId,
} from "@mkbabb/value.js/color";
import {
    parseCssColor,
    serializeCssColor,
    type CssColor,
    type CssColorSpace,
    type ParseIssue,
} from "@mkbabb/value.js/css";

export type PickerColor = AnyColor;
export type PickerSpace = SpaceId;
export type PickerColorIn<S extends SpaceId> = Extract<AnyColor, { readonly space: S }>;

export type ChannelMeta = Readonly<{
    key: string;
    min: number;
    max: number;
    unit: "" | "%" | "deg" | "K";
    hue?: true;
}>;

const unit = (key: string, min = 0, max = 1): ChannelMeta => ({ key, min, max, unit: "" });
const percent = (key: string, min = 0, max = 1): ChannelMeta => ({ key, min, max, unit: "%" });
const hue = (key = "h"): ChannelMeta => ({ key, min: 0, max: 360, unit: "deg", hue: true });

export const PICKER_CHANNELS = Object.freeze({
    rgb: [unit("r", 0, 255), unit("g", 0, 255), unit("b", 0, 255)],
    hsl: [hue(), percent("s"), percent("l")],
    hsv: [hue(), percent("s"), percent("v")],
    hwb: [hue(), percent("w"), percent("b")],
    lab: [percent("l", 0, 100), unit("a", -125, 125), unit("b", -125, 125)],
    lch: [percent("l", 0, 100), unit("c", 0, 150), hue()],
    oklab: [percent("l"), unit("a", -0.4, 0.4), unit("b", -0.4, 0.4)],
    oklch: [percent("l"), unit("c", 0, 0.5), hue()],
    xyz: [percent("x"), percent("y"), percent("z")],
    kelvin: [{ key: "kelvin", min: 1000, max: 40000, unit: "K" }],
    "srgb-linear": [unit("r"), unit("g"), unit("b")],
    "display-p3": [unit("r"), unit("g"), unit("b")],
    "a98-rgb": [unit("r"), unit("g"), unit("b")],
    "prophoto-rgb": [unit("r"), unit("g"), unit("b")],
    rec2020: [unit("r"), unit("g"), unit("b")],
    ictcp: [unit("i"), unit("ct", -0.5, 0.5), unit("cp", -0.5, 0.5)],
    jzazbz: [unit("jz", 0, 0.222), unit("az", -0.5, 0.5), unit("bz", -0.5, 0.5)],
} satisfies Record<SpaceId, readonly ChannelMeta[]>);

export const PICKER_SPACE_NAMES: Readonly<Record<SpaceId, string>> = Object.freeze({
    rgb: "RGB",
    hsl: "HSL",
    hsv: "HSV",
    hwb: "HWB",
    lab: "Lab",
    lch: "LCh",
    oklab: "OKLab",
    oklch: "OKLCh",
    xyz: "XYZ",
    kelvin: "Kelvin",
    "srgb-linear": "sRGB Linear",
    "display-p3": "Display P3",
    "a98-rgb": "Adobe RGB",
    "prophoto-rgb": "ProPhoto RGB",
    rec2020: "Rec. 2020",
    ictcp: "ICtCp",
    jzazbz: "Jzazbz",
});

export const CSS_PICKER_SPACES: ReadonlySet<SpaceId> = new Set<CssColorSpace>([
    "rgb", "hsl", "hwb", "lab", "lch", "oklab", "oklch", "xyz",
    "srgb-linear", "display-p3", "a98-rgb", "prophoto-rgb", "rec2020",
]);

export class PickerColorError extends Error {
    constructor(message: string, readonly issues: readonly ParseIssue[] = []) {
        super(message);
        this.name = "PickerColorError";
    }
}

function valueOrThrow<T, E extends Readonly<{ code: string }>>(result: Result<T, E>): T {
    if (result.ok) return result.value;
    throw new PickerColorError(result.error.code);
}

export function parsePickerColor(source: string): CssColor {
    const result = parseCssColor(source.trim());
    if (result.ok) return result.value;
    throw new PickerColorError("Invalid CSS color", result.diagnostics);
}

export function convertPickerColor<S extends SpaceId>(color: AnyColor, space: S): PickerColorIn<S> {
    return valueOrThrow(convertColor(color, space)) as unknown as PickerColorIn<S>;
}

export function mapPickerOklabToSrgb(color: PickerColorIn<"oklab">): PickerColorIn<"oklab"> {
    return valueOrThrow(mapColorToGamut(color, "srgb"));
}

function buildColor(space: SpaceId, channels: readonly Channel[], alpha: Alpha): AnyColor {
    const c = (index: number) => channels[index] ?? "none";
    switch (space) {
        case "rgb": return valueOrThrow(rgb(c(0), c(1), c(2), alpha));
        case "hsl": return valueOrThrow(hsl(c(0), c(1), c(2), alpha));
        case "hsv": return valueOrThrow(hsv(c(0), c(1), c(2), alpha));
        case "hwb": return valueOrThrow(hwb(c(0), c(1), c(2), alpha));
        case "lab": return valueOrThrow(lab(c(0), c(1), c(2), alpha));
        case "lch": return valueOrThrow(lch(c(0), c(1), c(2), alpha));
        case "oklab": return valueOrThrow(oklab(c(0), c(1), c(2), alpha));
        case "oklch": return valueOrThrow(oklch(c(0), c(1), c(2), alpha));
        case "xyz": return valueOrThrow(xyz(c(0), c(1), c(2), alpha));
        case "kelvin": return valueOrThrow(kelvin(c(0), alpha));
        case "srgb-linear": return valueOrThrow(linearSrgb(c(0), c(1), c(2), alpha));
        case "display-p3": return valueOrThrow(displayP3(c(0), c(1), c(2), alpha));
        case "a98-rgb": return valueOrThrow(a98Rgb(c(0), c(1), c(2), alpha));
        case "prophoto-rgb": return valueOrThrow(prophotoRgb(c(0), c(1), c(2), alpha));
        case "rec2020": return valueOrThrow(rec2020(c(0), c(1), c(2), alpha));
        case "ictcp": return valueOrThrow(ictcp(c(0), c(1), c(2), alpha));
        case "jzazbz": return valueOrThrow(jzazbz(c(0), c(1), c(2), alpha));
    }
}

export function channelMeta(space: SpaceId, key: string): ChannelMeta {
    const meta = PICKER_CHANNELS[space].find((candidate) => candidate.key === key);
    if (!meta) throw new PickerColorError(`Unknown ${space} channel: ${key}`);
    return meta;
}

export function channelNumber(color: AnyColor, key: string): number {
    const index = PICKER_CHANNELS[color.space].findIndex((meta) => meta.key === key);
    if (index < 0) throw new PickerColorError(`Unknown ${color.space} channel: ${key}`);
    const value = color.channels[index];
    if (typeof value !== "number") throw new PickerColorError(`Missing ${color.space}.${key}`);
    return value;
}

export function normalizedChannel(color: AnyColor, key: string): number {
    const meta = channelMeta(color.space, key);
    return (channelNumber(color, key) - meta.min) / (meta.max - meta.min);
}

export function withChannel<S extends SpaceId>(
    color: PickerColorIn<S>,
    key: string,
    value: number,
): PickerColorIn<S> {
    if (!Number.isFinite(value)) throw new PickerColorError(`Non-finite ${color.space}.${key}`);
    const index = PICKER_CHANNELS[color.space].findIndex((meta) => meta.key === key);
    if (index < 0) throw new PickerColorError(`Unknown ${color.space} channel: ${key}`);
    const channels = [...color.channels];
    channels[index] = value;
    return buildColor(color.space, channels, color.alpha) as PickerColorIn<S>;
}

export function withNormalizedChannel<S extends SpaceId>(
    color: PickerColorIn<S>,
    key: string,
    value: number,
): PickerColorIn<S> {
    const meta = channelMeta(color.space, key);
    return withChannel(color, key, meta.min + value * (meta.max - meta.min));
}

export function withAlpha<S extends SpaceId>(
    color: PickerColorIn<S>,
    alpha: Alpha,
): PickerColorIn<S> {
    if (alpha !== "none" && !Number.isFinite(alpha)) throw new PickerColorError("Non-finite alpha");
    return buildColor(color.space, color.channels, alpha) as PickerColorIn<S>;
}

export function clampPickerColor(color: AnyColor): AnyColor {
    const channels = color.channels.map((channel, index) => {
        if (channel === "none") return channel;
        const meta = PICKER_CHANNELS[color.space][index]!;
        if ("hue" in meta && meta.hue) return ((channel % 360) + 360) % 360;
        return Math.min(meta.max, Math.max(meta.min, channel));
    });
    const alpha = color.alpha === "none" ? color.alpha : Math.min(1, Math.max(0, color.alpha));
    return buildColor(color.space, channels, alpha);
}

export function serializePickerColor(color: AnyColor): string {
    const cssColor = CSS_PICKER_SPACES.has(color.space)
        ? color as CssColor
        : convertPickerColor(color, "oklch");
    return valueOrThrow(serializeCssColor(cssColor));
}

export function pickerColorToHex(color: AnyColor): string {
    const projected = valueOrThrow(toRgba8(color, { gamut: "clip" }));
    const hex = (value: number) => value.toString(16).padStart(2, "0");
    return `#${hex(projected[0])}${hex(projected[1])}${hex(projected[2])}${projected[3] < 255 ? hex(projected[3]) : ""}`;
}

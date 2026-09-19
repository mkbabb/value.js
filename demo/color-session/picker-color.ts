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

/**
 * Read a Result or throw — the CONSTRUCTION path's reader, and only that.
 *
 * X.W5.a · gate N4. This helper used to stand on the RENDER path too, where a
 * legal CSS Color 4 value the library's own law admits (`none`) became a thrown
 * exception inside a computed — a blank application from a shareable address.
 * It survives here for `buildColor` alone, where a failure means the CALLER
 * handed a channel set the space cannot hold: a programming error, not a value
 * a user can type. Every render-path reader below reads its Result totally.
 */
function valueOrThrow<T, E extends Readonly<{ code: string }>>(result: Result<T, E>): T {
    if (result.ok) return result.value;
    throw new PickerColorError(result.error.code);
}

/**
 * CSS Color 4 §4.2 — a MISSING component (`none`) resolves to ZERO when the
 * colour is converted to another colour space. That is the specification's own
 * law and what every browser does; it is not a fallback over a defect, and it
 * is not the input narrowing N4's falsifier forbids (`valueDomain.ts` declares
 * `none` pass-through "the library's law" and `test/v4-c1.test.ts` pins it —
 * the value is still ACCEPTED, still stored, and still serialized as `none`).
 * Measured: `parseCssColor("oklch(0.6 0.2 none)")` succeeds, same-space
 * conversion and serialization both succeed, and ONLY the cross-space
 * conversion returns `color_missing_channel`.
 */
function withResolvedMissing(color: AnyColor): AnyColor {
    if (!color.channels.some((channel) => channel === "none")) return color;
    return buildColor(
        color.space,
        color.channels.map((channel) => (channel === "none" ? 0 : channel)),
        color.alpha,
    );
}

export function parsePickerColor(source: string): CssColor {
    const result = parseCssColor(source.trim());
    if (result.ok) return result.value;
    throw new PickerColorError("Invalid CSS color", result.diagnostics);
}

/** RENDER PATH — total over every colour the parser accepts. */
export function convertPickerColor<S extends SpaceId>(color: AnyColor, space: S): PickerColorIn<S> {
    const direct = convertColor(color, space);
    if (direct.ok) return direct.value as unknown as PickerColorIn<S>;
    const resolved = convertColor(withResolvedMissing(color), space);
    if (resolved.ok) return resolved.value as unknown as PickerColorIn<S>;
    // Not a missing-component failure: the two spaces genuinely do not compose.
    throw new PickerColorError(resolved.error.code);
}

/** RENDER PATH — the gamut map reads its Result; a missing component resolves
 *  first, exactly as the conversion above does. */
export function mapPickerOklabToSrgb(color: PickerColorIn<"oklab">): PickerColorIn<"oklab"> {
    const direct = mapColorToGamut(color, "srgb");
    if (direct.ok) return direct.value;
    const resolved = mapColorToGamut(
        withResolvedMissing(color) as PickerColorIn<"oklab">,
        "srgb",
    );
    if (resolved.ok) return resolved.value;
    throw new PickerColorError(resolved.error.code);
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

/**
 * Is this channel MISSING (`none`) rather than zero?
 *
 * The distinction is real and a surface that shows a channel owes the user the
 * truth about it — `oklch(0.6 0.2 30 / none)` is not alpha 1. `channelNumber`
 * below resolves the missing component so the RENDER cannot throw; this is how
 * a readout asks whether it was resolved.
 */
export function channelIsMissing(color: AnyColor, key: string): boolean {
    const index = PICKER_CHANNELS[color.space].findIndex((meta) => meta.key === key);
    return index >= 0 && color.channels[index] === "none";
}

/** Is the alpha MISSING (`none`) rather than 1? */
export function alphaIsMissing(color: AnyColor): boolean {
    return color.alpha === "none";
}

/**
 * RENDER PATH — total over every colour the parser accepts.
 *
 * X.W5.a · gate N4: this threw `Missing ${space}.${key}` for a legal `none`,
 * inside the slider/readout derivations, from a value the parser had just
 * accepted. A missing component reads as ZERO (CSS Color 4 §4.2) and
 * `channelIsMissing` above carries the distinction to whoever must show it. An
 * unknown channel NAME still throws: that is a caller bug, not a user value.
 */
export function channelNumber(color: AnyColor, key: string): number {
    const index = PICKER_CHANNELS[color.space].findIndex((meta) => meta.key === key);
    if (index < 0) throw new PickerColorError(`Unknown ${color.space} channel: ${key}`);
    const value = color.channels[index];
    return typeof value === "number" ? value : 0;
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

/** RENDER PATH — the serializer keeps `none` as `none` (measured: the library
 *  serializes a missing component faithfully), and reads its Result. */
export function serializePickerColor(color: AnyColor): string {
    const cssColor = CSS_PICKER_SPACES.has(color.space)
        ? color as CssColor
        : convertPickerColor(color, "oklch");
    const serialized = serializeCssColor(cssColor);
    if (serialized.ok) return serialized.value;
    throw new PickerColorError(serialized.error.code);
}

/** RENDER PATH — the 8-bit projection resolves a missing component before it
 *  projects, so a `none` channel yields a colour rather than an exception. */
export function pickerColorToHex(color: AnyColor): string {
    const direct = toRgba8(color, { gamut: "clip" });
    const read = direct.ok ? direct : toRgba8(withResolvedMissing(color), { gamut: "clip" });
    if (!read.ok) throw new PickerColorError(read.error.code);
    const projected = read.value;
    const hex = (value: number) => value.toString(16).padStart(2, "0");
    return `#${hex(projected[0])}${hex(projected[1])}${hex(projected[2])}${projected[3] < 255 ? hex(projected[3]) : ""}`;
}

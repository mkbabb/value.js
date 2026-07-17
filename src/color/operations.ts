import type { Result } from "../foundation/result";
import { err, ok } from "../foundation/result";
import { CONVERSION_ANCHORS, HUE_INDEX, isPowerless } from "./anchors";
import {
    type AnyColor,
    type Color,
    type ColorIssue,
    type ChannelsBySpace,
    type HueInterpolationMethod,
    type RGBA8,
    type RgbGamut,
    type SpaceId,
    isAnyColor,
    makeColor,
} from "./model";

function numericSource(color: AnyColor): Result<readonly number[], ColorIssue> {
    const hueIndex = HUE_INDEX[color.space as keyof typeof HUE_INDEX];
    const channels = [...color.channels];
    for (let i = 0; i < channels.length; i++) {
        const channel = channels[i];
        if (channel === "none") {
            if (i !== hueIndex) return err({ code: "color_missing_channel" });
            channels[i] = 0;
        } else if (!Number.isFinite(channel)) {
            return err({ code: "color_non_finite" });
        }
    }
    if (hueIndex !== undefined && color.channels[hueIndex] === "none" && !isPowerless(color.space, channels as number[])) {
        return err({ code: "color_missing_channel" });
    }
    return ok(channels as number[]);
}

function finishChannels<S extends SpaceId>(space: S, channels: readonly number[]): ChannelsBySpace[S] {
    const result = [...channels] as (number | "none")[];
    const hueIndex = HUE_INDEX[space as keyof typeof HUE_INDEX];
    if (hueIndex !== undefined && isPowerless(space, channels)) result[hueIndex] = "none";
    return result as unknown as ChannelsBySpace[S];
}

export function convertColor<S extends SpaceId>(color: AnyColor, space: S): Result<Color<S>, ColorIssue> {
    if (!isAnyColor(color) || !(space in CONVERSION_ANCHORS)) return err({ code: "color_invalid_input" });
    if (color.space === space) {
        return makeColor(space, color.channels as ChannelsBySpace[S], color.alpha);
    }
    const source = numericSource(color);
    if (!source.ok) return source;
    const xyz = CONVERSION_ANCHORS[color.space].toXYZ(source.value as never);
    if (!xyz.every(Number.isFinite)) return err({ code: "color_non_finite" });
    const channels = CONVERSION_ANCHORS[space].fromXYZ(xyz);
    if (!channels.every(Number.isFinite)) return err({ code: "color_non_finite" });
    return makeColor(space, finishChannels(space, channels), color.alpha);
}

const normalizeDegrees = (degrees: number) => ((degrees % 360) + 360) % 360;

export function interpolateHue(
    fromDegrees: number,
    toDegrees: number,
    progress: number,
    method: HueInterpolationMethod = "shorter",
): Result<number, ColorIssue> {
    if (![fromDegrees, toDegrees, progress].every(Number.isFinite)) return err({ code: "color_non_finite" });
    if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" });
    const from = normalizeDegrees(fromDegrees);
    const to = normalizeDegrees(toDegrees);
    const increasing = normalizeDegrees(to - from);
    let delta: number;
    switch (method) {
        case "increasing": delta = increasing; break;
        case "decreasing": delta = increasing === 0 ? 0 : increasing - 360; break;
        case "longer": {
            const short = increasing > 180 ? increasing - 360 : increasing;
            delta = short === 0 ? 0 : short > 0 ? short - 360 : short + 360;
            break;
        }
        default: delta = increasing > 180 ? increasing - 360 : increasing;
    }
    return ok(normalizeDegrees(from + delta * progress));
}

export function mixColors<S extends SpaceId>(
    from: AnyColor,
    to: AnyColor,
    progress: number,
    options: { readonly space: S; readonly hue?: HueInterpolationMethod },
): Result<Color<S>, ColorIssue> {
    if (!Number.isFinite(progress)) return err({ code: "color_non_finite" });
    if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" });
    if (!options || !(options.space in CONVERSION_ANCHORS)) return err({ code: "color_invalid_input" });
    if (from.alpha === "none" || to.alpha === "none") return err({ code: "color_missing_alpha" });
    const left = convertColor(from, options.space);
    if (!left.ok) return left;
    const right = convertColor(to, options.space);
    if (!right.ok) return right;
    const leftAlpha = left.value.alpha;
    const rightAlpha = right.value.alpha;
    if (leftAlpha === "none" || rightAlpha === "none") return err({ code: "color_missing_alpha" });
    const alpha = leftAlpha * (1 - progress) + rightAlpha * progress;
    const hueIndex = HUE_INDEX[options.space as keyof typeof HUE_INDEX];
    const channels: (number | "none")[] = [];
    for (let i = 0; i < left.value.channels.length; i++) {
        const a = left.value.channels[i] as number | "none";
        const b = right.value.channels[i] as number | "none";
        if (i === hueIndex) {
            if (a === "none" && b === "none") channels.push("none");
            else if (a === "none") channels.push(b);
            else if (b === "none") channels.push(a);
            else {
                const mixed = interpolateHue(a, b, progress, options.hue);
                if (!mixed.ok) return mixed;
                channels.push(mixed.value);
            }
            continue;
        }
        if (a === "none" || b === "none") return err({ code: "color_missing_channel" });
        channels.push(alpha === 0
            ? a * (1 - progress) + b * progress
            : (a * leftAlpha * (1 - progress) + b * rightAlpha * progress) / alpha);
    }
    return makeColor(options.space, channels as unknown as ChannelsBySpace[S], alpha);
}

const GAMUT_SPACE: Record<RgbGamut, SpaceId> = {
    srgb: "rgb",
    "display-p3": "display-p3",
    "a98-rgb": "a98-rgb",
    "prophoto-rgb": "prophoto-rgb",
    rec2020: "rec2020",
};

export function mapColorToGamut<S extends SpaceId>(
    color: Color<S>,
    target: RgbGamut,
): Result<Color<S>, ColorIssue> {
    if (!(target in GAMUT_SPACE)) return err({ code: "color_invalid_input" });
    const targetSpace = GAMUT_SPACE[target]!;
    const converted = convertColor(color as AnyColor, targetSpace);
    if (!converted.ok) return converted as Result<Color<S>, ColorIssue>;
    const ceiling = targetSpace === "rgb" ? 255 : 1;
    const targetChannels = numericSource(converted.value as AnyColor);
    if (!targetChannels.ok) return targetChannels as Result<Color<S>, ColorIssue>;
    const inGamut = (channels: readonly number[]) =>
        channels.every((channel) => channel >= 0 && channel <= ceiling);
    if (inGamut(targetChannels.value)) return ok(color);

    // Clip in perceptual cylindrical space: hold lightness and hue, then find
    // the greatest chroma whose encoded target channels are all representable.
    // Direct RGB channel clipping bends hue and made the public hue-preserving
    // contrast contract impossible at vivid boundaries.
    const source = convertColor(color as AnyColor, "oklch");
    if (!source.ok) return source as Result<Color<S>, ColorIssue>;
    const [sourceL, sourceC, sourceH] = source.value.channels;
    if (sourceL === "none" || sourceC === "none") return err({ code: "color_missing_channel" });
    const L = Math.min(1, Math.max(0, sourceL));

    let low = 0;
    let high = Math.max(0, sourceC);
    for (let i = 0; i < 32; i++) {
        const chroma = (low + high) / 2;
        const probe = makeColor("oklch", [L, chroma, sourceH], source.value.alpha);
        if (!probe.ok) return probe as Result<Color<S>, ColorIssue>;
        const targetProbe = convertColor(probe.value, targetSpace);
        if (!targetProbe.ok) return targetProbe as Result<Color<S>, ColorIssue>;
        const channels = numericSource(targetProbe.value as AnyColor);
        if (!channels.ok) return channels as Result<Color<S>, ColorIssue>;
        if (inGamut(channels.value)) low = chroma;
        else high = chroma;
    }

    const mapped = makeColor("oklch", [L, low, sourceH], source.value.alpha);
    if (!mapped.ok) return mapped as Result<Color<S>, ColorIssue>;
    if (color.space === "oklch") return mapped as Result<Color<S>, ColorIssue>;
    return convertColor(mapped.value, color.space);
}

const srgbLinear = (encoded: number) => {
    const value = encoded / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};
function luminance(
    color: Color<"rgb">,
    quantized: boolean,
): Result<number, ColorIssue> {
    const channels = numericSource(color);
    if (!channels.ok) return channels;
    const byte = (value: number) =>
        roundHalfEven(Math.min(255, Math.max(0, value)));
    const channel = (value: number) => quantized ? byte(value) : value;
    return ok(0.2126 * srgbLinear(channel(channels.value[0]!))
        + 0.7152 * srgbLinear(channel(channels.value[1]!))
        + 0.0722 * srgbLinear(channel(channels.value[2]!)));
}
function contrast(
    first: Color<"rgb">,
    second: Color<"rgb">,
    quantized: boolean,
): Result<number, ColorIssue> {
    const a = luminance(first, quantized);
    if (!a.ok) return a;
    const b = luminance(second, quantized);
    if (!b.ok) return b;
    return ok((Math.max(a.value, b.value) + 0.05) / (Math.min(a.value, b.value) + 0.05));
}

export function safeAccentColor(
    accent: AnyColor,
    surface: AnyColor,
    options: { readonly minimumRatio: number; readonly gamut: RgbGamut },
): Result<Color<"oklch">, ColorIssue> {
    if (!options || !Number.isFinite(options.minimumRatio)) return err({ code: "color_non_finite" });
    if (options.minimumRatio < 1 || !(options.gamut in GAMUT_SPACE)) return err({ code: "color_out_of_range" });
    if (accent.alpha === "none" || surface.alpha === "none") return err({ code: "color_missing_alpha" });
    if (accent.alpha !== 1 || surface.alpha !== 1) return err({ code: "color_invalid_input" });
    const source = convertColor(accent, "oklch");
    if (!source.ok) return source;
    const surfaceRgb = convertColor(surface, "rgb");
    if (!surfaceRgb.ok) return surfaceRgb;
    const [sourceL, sourceC, sourceH] = source.value.channels;
    if (sourceL === "none" || sourceC === "none") return err({ code: "color_missing_channel" });

    const candidate = (lightness: number): Result<Color<"oklch">, ColorIssue> => {
        const raw = makeColor("oklch", [lightness, sourceC, sourceH], 1);
        if (!raw.ok) return raw;
        return mapColorToGamut(raw.value, options.gamut);
    };
    const clears = (color: Color<"oklch">): Result<boolean, ColorIssue> => {
        const rgb = convertColor(color, "rgb");
        if (!rgb.ok) return rgb;
        const floatRatio = contrast(rgb.value, surfaceRgb.value, false);
        if (!floatRatio.ok) return floatRatio;
        const byteRatio = contrast(rgb.value, surfaceRgb.value, true);
        return byteRatio.ok
            ? ok(Math.min(floatRatio.value, byteRatio.value) >= options.minimumRatio)
            : byteRatio;
    };

    const originL = Math.min(1, Math.max(0, sourceL));
    const evaluate = (
        lightness: number,
    ): Result<Readonly<{ color: Color<"oklch">; clears: boolean }>, ColorIssue> => {
        const color = candidate(lightness);
        if (!color.ok) return color;
        const result = clears(color.value);
        return result.ok ? ok({ color: color.value, clears: result.value }) : result;
    };

    const original = evaluate(originL);
    if (!original.ok) return original;
    if (original.value.clears) return ok(original.value.color);

    const lower = evaluate(0);
    if (!lower.ok) return lower;
    const upper = evaluate(1);
    if (!upper.ok) return upper;
    if (!lower.value.clears && !upper.value.clears) {
        return err({ code: "contrast_unreachable" });
    }

    const candidates: Color<"oklch">[] = [];
    if (lower.value.clears) {
        let pass = 0;
        let fail = originL;
        let best = lower.value.color;
        for (let i = 0; i < 32; i++) {
            const middle = (pass + fail) / 2;
            const probe = evaluate(middle);
            if (!probe.ok) return probe;
            if (probe.value.clears) {
                pass = middle;
                best = probe.value.color;
            } else {
                fail = middle;
            }
        }
        candidates.push(best);
    }
    if (upper.value.clears) {
        let fail = originL;
        let pass = 1;
        let best = upper.value.color;
        for (let i = 0; i < 32; i++) {
            const middle = (fail + pass) / 2;
            const probe = evaluate(middle);
            if (!probe.ok) return probe;
            if (probe.value.clears) {
                pass = middle;
                best = probe.value.color;
            } else {
                fail = middle;
            }
        }
        candidates.push(best);
    }

    candidates.sort((a, b) => {
        const aL = a.channels[0] as number;
        const bL = b.channels[0] as number;
        return Math.abs(aL - originL) - Math.abs(bL - originL) || aL - bL;
    });
    return ok(candidates[0]!);
}

function roundHalfEven(value: number): number {
    const floor = Math.floor(value);
    const fraction = value - floor;
    if (Math.abs(fraction - 0.5) < Number.EPSILON * Math.max(1, Math.abs(value))) {
        return floor % 2 === 0 ? floor : floor + 1;
    }
    return Math.round(value);
}

export function toRgba8(
    color: AnyColor,
    options: { readonly gamut: "clip" },
): Result<RGBA8, ColorIssue> {
    if (!options || options.gamut !== "clip") return err({ code: "color_invalid_input" });
    if (color.alpha === "none") return err({ code: "color_missing_alpha" });
    const converted = convertColor(color, "rgb");
    if (!converted.ok) return converted;
    const channels = numericSource(converted.value);
    if (!channels.ok) return channels;
    const byte = (value: number) => roundHalfEven(Math.min(255, Math.max(0, value)));
    return ok([
        byte(channels.value[0]!),
        byte(channels.value[1]!),
        byte(channels.value[2]!),
        roundHalfEven(255 * Math.min(1, Math.max(0, color.alpha))),
    ]);
}

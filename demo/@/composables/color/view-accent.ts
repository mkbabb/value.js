import {
    convertColor,
    oklch,
    safeAccentColor,
} from "@mkbabb/value.js/color";
import {
    parseCssColor,
    serializeCssColor,
} from "@mkbabb/value.js/css";

/** Four just-noticeable chroma steps from neutral, retained as product policy. */
export const VIEW_ACCENT_MIN_CHROMA = 0.08;
export const GRAPHICS_CONTRAST_FLOOR = 3;

/**
 * Rotate the active color into a view accent and certify it against the
 * surface it actually paints. Value owns conversion, gamut mapping, contrast,
 * and CSS serialization; this module owns only the product hue shift and
 * minimum chromatic identity.
 */
export function resolveViewAccent(
    liveCss: string,
    shiftDeg: number,
    surfaceL: number,
): string | null {
    if (!Number.isFinite(shiftDeg) || !Number.isFinite(surfaceL)) return null;

    const parsed = parseCssColor(liveCss);
    if (!parsed.ok) return null;
    const source = convertColor(parsed.value, "oklch");
    if (!source.ok) return null;

    const [L, C, sourceHue] = source.value.channels;
    if (L === "none" || C === "none") return null;
    const H = (((sourceHue === "none" ? 0 : sourceHue) + shiftDeg) % 360 + 360) % 360;
    const shifted = oklch(L, Math.max(C, VIEW_ACCENT_MIN_CHROMA), H, 1);
    const surface = oklch(surfaceL, 0, 0, 1);
    if (!shifted.ok || !surface.ok) return null;

    const safe = safeAccentColor(shifted.value, surface.value, {
        minimumRatio: GRAPHICS_CONTRAST_FLOOR,
        gamut: "srgb",
    });
    if (!safe.ok) return null;
    const serialized = serializeCssColor(safe.value);
    return serialized.ok ? serialized.value : null;
}

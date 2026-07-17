import {
    convertColor,
    mixColors,
    oklch,
    safeAccentColor,
    type Color,
} from "@mkbabb/value.js/color";
import {
    parseCssColor,
    serializeCssColor,
} from "@mkbabb/value.js/css";

export type InkSurface = "page" | "resting" | "floating" | "well" | "chrome" | "veil";

export const TEXT_CONTRAST_FLOOR = 4.5;
export const GRAPHICS_CONTRAST_FLOOR = 3;
export const CERTIFY_HEADROOM = 1.25;

export interface SurfaceTint {
    L: number;
    alpha: number;
}

const PRODUCER_TINTS = {
    card: { light: "hsl(30 85% 96%)", dark: "hsl(26 22% 17%)" },
    foreground: { light: "hsl(24 10% 10%)", dark: "hsl(30 14% 90%)" },
} as const;

const RUNG_ALPHA = {
    resting: { light: 0.65, dark: 0.72 },
    floating: { light: 0.8, dark: 0.88 },
    quiet: { light: 0.5, dark: 0.58 },
} as const;

const FLOATING_TINT_L = { light: 1, dark: 0.345 } as const;
const WELL_FOREGROUND_FRACTION = 0.08;

function parseOklch(source: string): Color<"oklch"> | null {
    const parsed = parseCssColor(source);
    if (!parsed.ok) return null;
    const converted = convertColor(parsed.value, "oklch");
    return converted.ok ? converted.value : null;
}

function lightness(color: Color<"oklch">): number {
    const L = color.channels[0];
    if (L === "none") throw new Error("Ink color is missing lightness");
    return L;
}

function requiredOklch(source: string): Color<"oklch"> {
    const color = parseOklch(source);
    if (!color) throw new Error(`[ink] producer literal failed to parse: ${source}`);
    return color;
}

function surfaceColor(L: number): Color<"oklch"> {
    const color = oklch(L, 0, 0, 1);
    if (!color.ok) throw new Error(`Invalid ink surface: ${color.error.code}`);
    return color.value;
}

function serialize(color: Color<"oklch">): string {
    const result = serializeCssColor(color);
    if (!result.ok) throw new Error(`Ink serialization failed: ${result.error.code}`);
    return result.value;
}

function certify(
    accent: Color<"oklch">,
    surfaceL: number,
    minimumRatio: number,
): Color<"oklch"> {
    const result = safeAccentColor(accent, surfaceColor(surfaceL), {
        minimumRatio,
        gamut: "srgb",
    });
    if (!result.ok) throw new Error(`Ink certification failed: ${result.error.code}`);
    return result.value;
}

const CARD_L = {
    light: lightness(requiredOklch(PRODUCER_TINTS.card.light)),
    dark: lightness(requiredOklch(PRODUCER_TINTS.card.dark)),
} as const;

const FOREGROUND = {
    light: requiredOklch(PRODUCER_TINTS.foreground.light),
    dark: requiredOklch(PRODUCER_TINTS.foreground.dark),
} as const;

/** Resolve the effective lightness of the material rung under the ink. */
export function resolveSurfaceLightness(
    surface: InkSurface,
    ambientL: number,
    dark: boolean,
    tint?: SurfaceTint,
    underTint?: SurfaceTint,
): number {
    if (surface === "page") return ambientL;

    if (surface === "veil") {
        if (tint) return tint.alpha * tint.L + (1 - tint.alpha) * ambientL;
        const underL = resolveSurfaceLightness("resting", ambientL, dark, underTint);
        const alpha = RUNG_ALPHA.quiet[dark ? "dark" : "light"];
        return alpha * CARD_L[dark ? "dark" : "light"] + (1 - alpha) * underL;
    }

    if (tint) return tint.alpha * tint.L + (1 - tint.alpha) * ambientL;

    const scheme = dark ? "dark" : "light";
    const cardL = CARD_L[scheme];
    switch (surface) {
        case "resting": {
            const alpha = RUNG_ALPHA.resting[scheme];
            return alpha * cardL + (1 - alpha) * ambientL;
        }
        case "floating":
        case "chrome": {
            const alpha = RUNG_ALPHA.floating[scheme];
            return alpha * FLOATING_TINT_L[scheme] + (1 - alpha) * ambientL;
        }
        case "well":
            return (1 - WELL_FOREGROUND_FRACTION) * cardL
                + WELL_FOREGROUND_FRACTION * lightness(FOREGROUND[scheme]);
    }
}

/** Certify a concrete CSS color against the surface it actually paints. */
export function certifyAccentInk(
    css: string,
    surfaceL: number,
    floor: number = TEXT_CONTRAST_FLOOR,
): string {
    const accent = parseOklch(css);
    if (!accent) return css;
    const safe = certify(accent, surfaceL, floor + CERTIFY_HEADROOM);
    return safe.channels.every((channel, index) => {
        const source = accent.channels[index];
        return channel === source
            || (typeof channel === "number" && typeof source === "number" && Math.abs(channel - source) < 1e-9);
    }) ? css : serialize(safe);
}

/** Golden-step de-emphasis, then the same explicit contrast certification. */
export function resolveMutedInk(surfaceL: number, dark: boolean): string {
    const mixed = mixColors(
        FOREGROUND[dark ? "dark" : "light"],
        surfaceColor(surfaceL),
        0.382,
        { space: "oklch" },
    );
    if (!mixed.ok) throw new Error(`Muted ink mix failed: ${mixed.error.code}`);
    return serialize(certify(mixed.value, surfaceL, TEXT_CONTRAST_FLOOR + CERTIFY_HEADROOM));
}

/** Choose the WCAG-maximal neutral endpoint for a concrete opaque fill. */
export function contrastInkFor(fillCss: string): string | null {
    const fill = parseOklch(fillCss);
    if (!fill || fill.alpha !== 1) return null;
    const L = lightness(fill);
    const endpoints = L >= 0.5 ? [0, 1] as const : [1, 0] as const;
    for (const endpoint of endpoints) {
        const ink = surfaceColor(endpoint);
        const result = safeAccentColor(ink, fill, {
            minimumRatio: TEXT_CONTRAST_FLOOR,
            gamut: "srgb",
        });
        if (result.ok && Math.abs(lightness(result.value) - endpoint) < 1e-9) {
            return endpoint === 0 ? "oklch(0 0 0)" : "oklch(1 0 0)";
        }
    }
    return null;
}

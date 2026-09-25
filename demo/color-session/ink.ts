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

/**
 * A painted recipe: the layer's OPAQUE colour (alpha 1) and the alpha it
 * paints at.
 * The browser composites it source-over in sRGB, so the model does too.
 */
export interface SurfaceTint {
    color: Color<"oklch">;
    alpha: number;
}

const PRODUCER_TINTS = {
    card: { light: "hsl(30 85% 96%)", dark: "hsl(26 22% 17%)" },
    foreground: { light: "hsl(24 10% 10%)", dark: "hsl(30 14% 90%)" },
} as const;

/**
 * X.W7L.i — glass-ui 10.1.0's published veil ladder (`styles/tokens/glass.css`
 * + `dark-arm.css`): every plate is `--glass-veil-ink` at the rung's alpha
 * (`color-mix(in srgb, ink / α 100%, --card)` at `--glass-level: 1`), laid
 * over the ground below it. Rung α = base + k·step (quiet −1, resting 0,
 * floating +1; the dock plate is `--glass-veil-dock` = −1). The 7.0.0
 * cream-frost constants (card tint at α .65/.80) no longer describe any
 * painted surface; this is the static model the live probe falls back to.
 */
const PRODUCER_VEIL = {
    ink: { light: "oklch(0.28 0.035 70)", dark: "oklch(0.17 0.03 70)" },
    base: { light: 0.14, dark: 0.18 },
    step: 0.04,
} as const;

const RUNG_STEP = {
    quiet: -1,
    resting: 0,
    floating: 1,
    chrome: -1,
} as const;

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

/** Bisection steps for the best reachable ratio: 1.25 / 2^10 ≈ 1.2e-3. */
const HEADROOM_SEARCH_STEPS = 10;

/**
 * Certify `accent` on the surface: the ink nearest the pick that clears
 * `floor + headroom`. The headroom is a preference, not the floor.
 *
 * X.W7L.i (ESC-W7Rm-1): an opaque surface admits at most
 * max((Y + .05) / .05, 1.05 / (Y + .05)) against black or white, which dips
 * to 4.58:1 at Y ≈ 0.18. glass 10's dark veil seats mid-lightness grounds in
 * that band (Y 0.133–0.238 admits no 5.75:1 ink), and the old search threw
 * `contrast_unreachable` there although the 4.5:1 floor was reachable. Now,
 * where the headroom target is unreachable, the search bisects for the
 * highest ratio in [floor, floor + headroom) the surface admits and returns
 * that ink: the best certified value, still ≥ the floor. Only a floor that no
 * ink reaches is a failure, and that remains loud.
 */
function certify(
    accent: Color<"oklch">,
    surfaceL: number,
    floor: number,
    headroom: number = CERTIFY_HEADROOM,
): Color<"oklch"> {
    const surface = surfaceColor(surfaceL);
    const attempt = (minimumRatio: number) =>
        safeAccentColor(accent, surface, { minimumRatio, gamut: "srgb" });
    const failed = (code: string): never => {
        throw new Error(`Ink certification failed: ${code}`);
    };

    const preferred = attempt(floor + headroom);
    if (preferred.ok) return preferred.value;
    if (preferred.error.code !== "contrast_unreachable") failed(preferred.error.code);

    const atFloor = attempt(floor);
    if (!atFloor.ok) return failed(atFloor.error.code);

    let best = atFloor.value;
    let pass = floor;
    let fail = floor + headroom;
    for (let i = 0; i < HEADROOM_SEARCH_STEPS; i++) {
        const middle = (pass + fail) / 2;
        const probe = attempt(middle);
        if (probe.ok) {
            pass = middle;
            best = probe.value;
        } else if (probe.error.code === "contrast_unreachable") {
            fail = middle;
        } else {
            failed(probe.error.code);
        }
    }
    return best;
}

const CARD_L = {
    light: lightness(requiredOklch(PRODUCER_TINTS.card.light)),
    dark: lightness(requiredOklch(PRODUCER_TINTS.card.dark)),
} as const;

const FOREGROUND = {
    light: requiredOklch(PRODUCER_TINTS.foreground.light),
    dark: requiredOklch(PRODUCER_TINTS.foreground.dark),
} as const;

const VEIL_INK = {
    light: requiredOklch(PRODUCER_VEIL.ink.light),
    dark: requiredOklch(PRODUCER_VEIL.ink.dark),
} as const;

/** The static model's plate recipe for a translucent rung (glass 10.1.0). */
export function producerRungTint(
    rung: keyof typeof RUNG_STEP,
    dark: boolean,
): SurfaceTint {
    const scheme = dark ? "dark" : "light";
    return {
        color: VEIL_INK[scheme],
        alpha: PRODUCER_VEIL.base[scheme] + RUNG_STEP[rung] * PRODUCER_VEIL.step,
    };
}

/**
 * Lay `tint` over `ground` the way the browser paints it: source-over in
 * gamma-encoded sRGB (the library's rgb mix, never local math).
 */
function composite(ground: Color<"oklch">, tint: SurfaceTint): Color<"oklch"> {
    if (tint.color.alpha !== 1) throw new Error("Ink layer colour must be opaque; its alpha rides SurfaceTint.alpha");
    const mixed = mixColors(ground, tint.color, tint.alpha, { space: "rgb" });
    if (!mixed.ok) throw new Error(`Ink composite failed: ${mixed.error.code}`);
    const out = convertColor(mixed.value, "oklch");
    if (!out.ok) throw new Error(`Ink composite failed: ${out.error.code}`);
    return out.value;
}

/**
 * Resolve the effective lightness of the material rung under the ink: the
 * real composite of the plate recipe (live `tint`, else glass 10.1.0's
 * published veil ladder) over the ground below it (the atmosphere ambient).
 */
export function resolveSurfaceLightness(
    surface: InkSurface,
    ambientL: number,
    dark: boolean,
    tint?: SurfaceTint,
    underTint?: SurfaceTint,
): number {
    if (surface === "page") return ambientL;

    const scheme = dark ? "dark" : "light";
    if (surface === "well") {
        return (1 - WELL_FOREGROUND_FRACTION) * CARD_L[scheme]
            + WELL_FOREGROUND_FRACTION * lightness(FOREGROUND[scheme]);
    }

    const ground = surfaceColor(ambientL);
    if (tint) return lightness(composite(ground, tint));

    if (surface === "veil") {
        // The veil is an IN-PLATE fixture (T-34): quiet veil over the resting
        // plate over the ground — two sRGB layers.
        const plate = composite(ground, underTint ?? producerRungTint("resting", dark));
        return lightness(composite(plate, producerRungTint("quiet", dark)));
    }

    return lightness(composite(ground, producerRungTint(surface, dark)));
}

/** Certify a concrete CSS color against the surface it actually paints. */
export function certifyAccentInk(
    css: string,
    surfaceL: number,
    floor: number = TEXT_CONTRAST_FLOOR,
): string {
    const accent = parseOklch(css);
    if (!accent) return css;
    const safe = certify(accent, surfaceL, floor);
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
    return serialize(certify(mixed.value, surfaceL, TEXT_CONTRAST_FLOOR));
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

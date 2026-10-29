import {
    convertColor,
    mapColorToGamut,
    mixColors,
    oklch,
    parseCssColor,
    safeAccentColor,
    serializeCssColor,
    xyz,
    type Color,
} from "@mkbabb/value.js/color";

/**
 * The surfaces with a static producer MODEL. The dock band (the `.dock-plate`
 * chrome) is deliberately absent (X.W8.d · G-13): its referent exists only as
 * a MEASURED tint (`resolvePaintedLightness`), so a silent static fallback for
 * it is unrepresentable — a call site that tolerates "unmeasured" does not
 * compile.
 */
export type InkSurface = "page" | "resting" | "floating" | "well" | "veil" | "modal";

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
    // glass `--background` in light (`--neutral-0`, `tokens/color-radius.css`).
    paper: "hsl(40 30% 98%)",
    foreground: { light: "hsl(24 10% 10%)", dark: "hsl(30 14% 90%)" },
} as const;

/**
 * X.W7L.i — glass-ui 10.1.0's published veil ladder (`styles/tokens/glass.css`
 * + `dark-arm.css`): every plate is `--glass-veil-ink` at the rung's alpha
 * (`color-mix(in srgb, ink / α 100%, --card)` at `--glass-level: 1`), laid
 * over the ground below it. Rung α = base + k·step (quiet −1, resting 0,
 * floating +1; the dock plate has no static rung — it is measured live). The 7.0.0
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
} as const;

/**
 * The static model of `--well-bg` (`demo/styles/foundation.css`, COHESION
 * §0gk.2 · §0gv.6): a translucent wash laid IN the resting plate, never an
 * opaque card. It lifts toward the scheme's default elevation (the paper at
 * 14% in light, the cream ink at 8% in dark: SS8-0440). Where the certified
 * plate ink has left the scheme's default polarity (cream ink on a dark plate
 * in light), the lift would close on that ink, so the wash flips away from it:
 * the scheme ink at 8%. In dark the lift already runs away from a departed
 * (dark) ink, so dark never flips.
 */
const PRODUCER_WELL = {
    lift: { light: 0.14, dark: 0.08 },
    sink: 0.08,
} as const;

/**
 * X-DS pass 16 (V16-01) — glass 10.1.0's modal scrim (`--overlay-scrim`,
 * `glass-fx.css`): `--overlay-scrim-ink` at 50 %, the same in both schemes. A
 * modal's floating plate sits on it, so in light the plate composites over a
 * DARK ground; the static model the live probe falls back to.
 */
const PRODUCER_SCRIM = { ink: "hsl(24 10% 10%)", alpha: 0.5 } as const;

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
    const key = `${accent.channels.join(",")},${accent.alpha}|${surfaceL}|${floor}|${headroom}`;
    const known = CERTIFIED.get(key);
    if (known) return known;
    const certified = walkToFloor(accent, surfaceL, floor, headroom);
    if (CERTIFIED.size >= CERTIFIED_CAPACITY) {
        CERTIFIED.delete(CERTIFIED.keys().next().value!);
    }
    CERTIFIED.set(key, certified);
    return certified;
}

/**
 * X.W11.p4c (COHESION §0go.2(b)) — THE CERTIFY MEMO. `certify` is a pure
 * function of its inputs, and the boot asks it the same question many times
 * over: the plate ink is walked by `resolvePlateInk`, again inside
 * `resolveMutedInk` and again behind each identity ink's fallback, and an
 * identity ink that holds its chroma is walked once to decide and once more to
 * serialize. Each walk is a WCAG bisection through the colour parser (the
 * boot's measured ~100 ms at 4× CPU, `.p4b` act 8). The memo is keyed by the
 * walk's full input — the seed (the accent's channels and alpha), the ground
 * (the surface lightness), the floor and the headroom; the scheme enters
 * through the seed and the ground it selects — so one (seed, scheme, ground)
 * certifies once and every later ask returns the same certified colour. A
 * failed walk throws and is never stored. Bounded: a drag mints a new seed per
 * frame, and the oldest entry leaves first.
 */
const CERTIFIED = new Map<string, Color<"oklch">>();
const CERTIFIED_CAPACITY = 512;

function walkToFloor(
    accent: Color<"oklch">,
    surfaceL: number,
    floor: number,
    headroom: number,
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

const PAPER = requiredOklch(PRODUCER_TINTS.paper);

const FOREGROUND = {
    light: requiredOklch(PRODUCER_TINTS.foreground.light),
    dark: requiredOklch(PRODUCER_TINTS.foreground.dark),
} as const;

const SCRIM_INK = requiredOklch(PRODUCER_SCRIM.ink);

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

/** The static model's modal scrim recipe (glass 10.1.0). */
export function producerScrimTint(): SurfaceTint {
    return { color: SCRIM_INK, alpha: PRODUCER_SCRIM.alpha };
}

/**
 * Whether a certified ink has left the scheme's default polarity (§0gv.6):
 * it sits nearer the OTHER scheme's foreground pole than its own.
 */
function departsDefault(ink: Color<"oklch">, dark: boolean): boolean {
    const L = lightness(ink);
    const own = lightness(FOREGROUND[dark ? "dark" : "light"]);
    const other = lightness(FOREGROUND[dark ? "light" : "dark"]);
    return Math.abs(L - other) < Math.abs(L - own);
}

/** {@link departsDefault} for a serialized ink (the stamped `--ink-primary`). */
export function plateInkDeparts(inkCss: string, dark: boolean): boolean {
    const ink = parseOklch(inkCss);
    if (!ink) throw new Error(`[ink] plate ink failed to parse: ${inkCss}`);
    return departsDefault(ink, dark);
}

/** The static model's `--well-bg` recipe (see {@link PRODUCER_WELL}). */
export function producerWellTint(dark: boolean, departed: boolean): SurfaceTint {
    if (dark) return { color: FOREGROUND.dark, alpha: PRODUCER_WELL.lift.dark };
    return departed
        ? { color: FOREGROUND.light, alpha: PRODUCER_WELL.sink }
        : { color: PAPER, alpha: PRODUCER_WELL.lift.light };
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

    const ground = surfaceColor(ambientL);

    if (surface === "well") {
        // The well is an IN-PLATE wash (§0gv.6): `--well-bg` (live `tint`,
        // else its static recipe) over the resting plate over the ground. The
        // recipe's direction follows the ink the plate certified.
        const plate = composite(ground, underTint ?? producerRungTint("resting", dark));
        const recipe = tint
            ?? producerWellTint(dark, departsDefault(plateInk(lightness(plate), dark), dark));
        return lightness(composite(plate, recipe));
    }

    if (surface === "modal") {
        // V16-01: a modal's plate is the FLOATING rung laid over the scrim,
        // which is laid over the ambient — two sRGB layers, the live recipes
        // where measured (`tint` = the floating plate, `underTint` = the scrim).
        const scrimmed = composite(ground, underTint ?? producerScrimTint());
        return lightness(composite(scrimmed, tint ?? producerRungTint("floating", dark)));
    }

    if (tint) return lightness(composite(ground, tint));

    if (surface === "veil") {
        // The veil is an IN-PLATE fixture (T-34): quiet veil over the resting
        // plate over the ground — two sRGB layers.
        const plate = composite(ground, underTint ?? producerRungTint("resting", dark));
        return lightness(composite(plate, producerRungTint("quiet", dark)));
    }

    return lightness(composite(ground, producerRungTint(surface, dark)));
}

/**
 * The effective lightness of a surface that exists ONLY as a measured tint
 * (the dock band, G-13): the live recipe laid over the ambient. The tint is
 * required — there is no model to fall back to.
 */
export function resolvePaintedLightness(ambientL: number, tint: SurfaceTint): number {
    return lightness(composite(surfaceColor(ambientL), tint));
}

/** One stop of the atmosphere's resolved field palette (glass `OklchStop`). */
export interface FieldStop {
    L: number;
    C: number;
    h: number;
}

const WHITE_XYZ = (() => {
    const white = convertColor(surfaceColor(1), "xyz");
    if (!white.ok) throw new Error(`[ink] white point failed: ${white.error.code}`);
    return white.value.channels as readonly number[];
})();

/**
 * The OKLab L of the NEUTRAL with the stop's WCAG luminance: the ground the
 * achromatic `surfaceColor` stands in for. A chromatic stop's own L is not
 * that ground (the default seed's dark field: its stop at L 0.42 has
 * Y 0.069, the neutral at L 0.42 has Y 0.074).
 */
function luminanceLightness(stop: FieldStop): number {
    const raw = oklch(stop.L, stop.C, stop.h, 1);
    if (!raw.ok) throw new Error(`Invalid field stop: ${raw.error.code}`);
    const painted = mapColorToGamut(raw.value, "srgb");
    if (!painted.ok) throw new Error(`Field stop gamut map failed: ${painted.error.code}`);
    const xyzStop = convertColor(painted.value, "xyz");
    if (!xyzStop.ok) throw new Error(`Field stop luminance failed: ${xyzStop.error.code}`);
    const Y = Math.max(0, xyzStop.value.channels[1] as number);
    const grey = xyz(WHITE_XYZ[0]! * Y, Y, WHITE_XYZ[2]! * Y, 1);
    if (!grey.ok) throw new Error(`Field stop luminance failed: ${grey.error.code}`);
    const neutral = convertColor(grey.value, "oklch");
    if (!neutral.ok) throw new Error(`Field stop luminance failed: ${neutral.error.code}`);
    return lightness(neutral.value);
}

/**
 * THE PAGE-AMBIENT REFERENT (SS8-0259 · CNL-17): the field ground every ink
 * is certified over. It was the MEAN OKLab L of the field palette, an
 * achromatic stand-in for a field that varies across the page. A plate sits
 * over whichever region of the field lies under it, so an ink certified
 * against the mean failed over the regions on its own side of the mean: the
 * dark About card sat on the field's crimson region (the plate read
 * rgb(126 25 44)), and the component ink certified to 5.75:1 against the
 * mean (L 0.30) read 4.31:1 there.
 * In dark the field lies wholly below mid-luminance and the ink is light, so
 * the referent is the field's BRIGHTEST stop at its WCAG luminance: an ink
 * that clears it clears every region of the field.
 * Light keeps the mean. Its field can span the 4.58:1 dead band (seed
 * oklch(0.66 0.16 28): stops L 0.56-0.88), where no ink of either polarity
 * clears every stop, and a darkest-stop referent there flips the ink light
 * and fails it over the pale stops. The light arm read 5.64:1 live.
 */
export function resolveFieldAmbientLightness(
    stops: readonly FieldStop[],
    dark: boolean,
): number {
    if (!stops.length) return 0.5;
    if (dark) return Math.max(...stops.map(luminanceLightness));
    let sum = 0;
    for (const stop of stops) sum += stop.L;
    return sum / stops.length;
}

/** Certify a concrete CSS color against the surface it actually paints. */
export function certifyAccentInk(
    css: string,
    surfaceL: number,
    floor: number = TEXT_CONTRAST_FLOOR,
    headroom: number = CERTIFY_HEADROOM,
): string {
    const accent = parseOklch(css);
    if (!accent) return css;
    const safe = certify(accent, surfaceL, floor, headroom);
    return safe.channels.every((channel, index) => {
        const source = accent.channels[index];
        return channel === source
            || (typeof channel === "number" && typeof source === "number" && Math.abs(channel - source) < 1e-9);
    }) ? css : serialize(safe);
}

/**
 * The share of an identity ink's source chroma its certified walk must keep
 * for the hue to still read (X-DS pass 18 · V18C-01). Below it the walk has
 * reached a pole: sRGB holds almost no chroma there, and the hue survives
 * only as a number in the token. Gold (C 0.147) walked to a pole reads
 * C ≤ 0.015; its legible light bronzes read C 0.056–0.064. 0.4 (C 0.059)
 * parts the two: at 0.5 the resting plate's bronze fell back to the plate
 * ink, and the featured badge lost its mark.
 */
export const IDENTITY_CHROMA_HOLD = 0.4;

function chroma(color: Color<"oklch">): number {
    const C = color.channels[1];
    return typeof C === "number" ? C : 0;
}

/** True where `color` already clears `floor` on the surface (the guard
 *  returns it unwalked). */
function clearsAt(color: Color<"oklch">, surface: Color<"oklch">, floor: number): boolean {
    const result = safeAccentColor(color, surface, { minimumRatio: floor, gamut: "srgb" });
    return result.ok && Math.abs(lightness(result.value) - lightness(color)) < 1e-6;
}

/**
 * The most chromatic ink of the accent's hue on the side of the surface
 * OPPOSITE `walked` that clears `floor`: the clearing lightness nearest the
 * surface, which is the one furthest from the pole. Null where that side
 * admits no ink at all.
 */
function farSideInk(
    accent: Color<"oklch">,
    surfaceL: number,
    walked: Color<"oklch">,
    floor: number,
): Color<"oklch"> | null {
    const surface = surfaceColor(surfaceL);
    const pole = lightness(walked) >= surfaceL ? 0 : 1;
    const hue = accent.channels[2];
    const at = (L: number): Color<"oklch"> => {
        const raw = oklch(L, chroma(accent), typeof hue === "number" ? hue : 0, 1);
        if (!raw.ok) throw new Error(`Ink far-side probe failed: ${raw.error.code}`);
        const mapped = mapColorToGamut(raw.value, "srgb");
        if (!mapped.ok) throw new Error(`Ink far-side probe failed: ${mapped.error.code}`);
        return mapped.value;
    };
    if (!clearsAt(at(pole), surface, floor)) return null;
    let pass = pole;
    let fail = surfaceL;
    for (let i = 0; i < 16; i++) {
        const middle = (pass + fail) / 2;
        if (clearsAt(at(middle), surface, floor)) pass = middle;
        else fail = middle;
    }
    return at(pass);
}

/**
 * THE IDENTITY INK (X-DS pass 18 · V18C-01): an identity hue (the admin
 * gold) certified on its surface WITHOUT certifying the hue away. §0dm keeps
 * identity, so a walk that clears the floor by draining the chroma is not a
 * cure. The ladder:
 * 1. the house certify (`floor + headroom`), kept where it holds
 *    `IDENTITY_CHROMA_HOLD` of the source chroma;
 * 2. else the most chromatic ink on the FAR side of the surface that clears
 *    the same `floor + headroom`;
 * 3. else the surface's own plate ink: a word reads in the plate's voice,
 *    and the identity rides its glyph, certified at the 3:1 floor.
 * There is no rung that trades the headroom for chroma: on the owner-brown
 * band a held word below the headroom read 4.31:1 off the frame
 * (v18-hold-bisect.log), under the floor it was certified to clear.
 * The headroom stays on every ground, the dock band included: the band's
 * tint is measured, but the ambient under it is modelled achromatic, and the
 * frame read a no-headroom glyph at 2.84:1 and its word at 4.23:1 on the
 * light band (evidence/DS/value/pass-18/c18-2026-10-18/v18-noheadroom.log).
 */
export function certifyIdentityInk(
    css: string,
    surfaceL: number,
    dark: boolean,
    floor: number = TEXT_CONTRAST_FLOOR,
    headroom: number = CERTIFY_HEADROOM,
): string {
    const accent = parseOklch(css);
    if (!accent) return css;
    const held = (c: Color<"oklch">) => chroma(c) >= IDENTITY_CHROMA_HOLD * chroma(accent);
    const preferred = certify(accent, surfaceL, floor, headroom);
    if (held(preferred)) return certifyAccentInk(css, surfaceL, floor, headroom);

    const far = farSideInk(accent, surfaceL, preferred, floor + headroom);
    if (far && held(far)) return serialize(far);
    return resolvePlateInk(surfaceL, dark);
}

/**
 * THE PRIMARY PLATE INK (X-DS pass 4 · V4C-01) — the ONE polarity decision
 * per plate. The scheme's foreground, certified against the composited plate
 * by the same guard as every other ink: where it clears, it is kept; where
 * the plate has crossed mid-luminance (a saturated mid-tone aurora under the
 * near-clear resting veil), the guard walks it to the pole that clears. Titles,
 * labels, numerals and section heads read it (the in-plate `--foreground`,
 * `shell.css`), so the page never carries two inks of opposite polarity.
 */
function plateInk(surfaceL: number, dark: boolean): Color<"oklch"> {
    return certify(FOREGROUND[dark ? "dark" : "light"], surfaceL, TEXT_CONTRAST_FLOOR);
}

export function resolvePlateInk(surfaceL: number, dark: boolean): string {
    return serialize(plateInk(surfaceL, dark));
}

/**
 * Golden-step de-emphasis OF THE PRIMARY PLATE INK, then the same explicit
 * contrast certification. The rung derives from the pole `plateInk` chose, so
 * it never flips on its own: a certified step that lands across the surface
 * from its primary, or further from it, keeps the primary instead.
 */
export function resolveMutedInk(surfaceL: number, dark: boolean): string {
    const primary = plateInk(surfaceL, dark);
    const mixed = mixColors(primary, surfaceColor(surfaceL), 0.382, { space: "oklch" });
    if (!mixed.ok) throw new Error(`Muted ink mix failed: ${mixed.error.code}`);
    const muted = certify(mixed.value, surfaceL, TEXT_CONTRAST_FLOOR);
    // Same pole as the primary, and no further from the plate than it: a rung
    // that would flip, or outrank its primary, is the primary itself.
    const offset = (c: Color<"oklch">) => lightness(c) - surfaceL;
    const kept = Math.sign(offset(muted)) === Math.sign(offset(primary))
        && Math.abs(offset(muted)) <= Math.abs(offset(primary));
    return serialize(kept ? muted : primary);
}

/**
 * Certify an accent against a concrete opaque FILL it sits on (not a plate
 * rung): the hue is kept and only the lightness walks. Null where the fill is
 * unparseable or no lightness of the hue clears the floor on it.
 * X-DS pass 17 (V17C-01): the admin gold glyph on the dock seal's wax.
 */
export function certifyInkOnFill(
    css: string,
    fillCss: string,
    floor: number = TEXT_CONTRAST_FLOOR,
): string | null {
    const accent = parseOklch(css);
    const fill = parseOklch(fillCss);
    if (!accent || !fill || fill.alpha !== 1) return null;
    // The house headroom first (the wax is a watercolor, its pixels spread
    // around the solved fill), the floor itself where the headroom is
    // unreachable.
    for (const minimumRatio of [floor + CERTIFY_HEADROOM, floor]) {
        const result = safeAccentColor(accent, fill, { minimumRatio, gamut: "srgb" });
        if (result.ok) return serialize(result.value);
    }
    return null;
}

/**
 * Choose the WCAG-maximal neutral endpoint for a concrete opaque fill.
 *
 * SS8-0257b (C-2): TOTAL over opaque fills. The walk used to test the RAW
 * fill, and a fill outside sRGB (oklch(0.4 0.5 30)) has no in-gamut
 * luminance, so neither endpoint certified and the chip rendered with no
 * `color:` at all: 151 of 13,332 cells, L 0.40-0.82 at C >= 0.30. The fill is
 * now mapped into the gamut a screen paints first; there, one of black or
 * white always clears 4.58:1, so the 4.5:1 floor holds. The descending floors
 * after it return the higher-contrast endpoint rather than nothing. Null
 * remains only for a non-colour or a translucent fill, which has no single
 * ground to certify against.
 */
export function contrastInkFor(fillCss: string): string | null {
    const parsed = parseOklch(fillCss);
    if (!parsed || parsed.alpha !== 1) return null;
    const mapped = mapColorToGamut(parsed, "srgb");
    if (!mapped.ok) return null;
    const fill = mapped.value;
    const L = lightness(fill);
    const endpoints = L >= 0.5 ? [0, 1] as const : [1, 0] as const;
    for (const minimumRatio of [TEXT_CONTRAST_FLOOR, GRAPHICS_CONTRAST_FLOOR, 1]) {
        for (const endpoint of endpoints) {
            const ink = surfaceColor(endpoint);
            const result = safeAccentColor(ink, fill, { minimumRatio, gamut: "srgb" });
            if (result.ok && Math.abs(lightness(result.value) - endpoint) < 1e-9) {
                return endpoint === 0 ? "oklch(0 0 0)" : "oklch(1 0 0)";
            }
        }
    }
    return endpoints[0] === 0 ? "oklch(0 0 0)" : "oklch(1 0 0)";
}

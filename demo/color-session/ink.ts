import {
    convertColor,
    mapColorToGamut,
    mixColors,
    oklch,
    parseCssColor,
    safeAccentColor,
    serializeCssColor,
    toRgba8,
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

    // X.W11.ink (COHESION §0gw.4): the guard admits a target iff one of the
    // three inks it tries (the pick, either pole) clears it, so its verdict
    // on every target is one number, the best of those three ratios. The
    // headroom bisection runs on that number, and the guard walks ONCE, at
    // the target the bisection lands on: the same target, so the same ink,
    // as one walk per step (it was ten). Below the floor that walk fails
    // loud, as `attempt(floor)` did.
    const ceiling = guardCeiling(accent, surface);
    let pass = floor;
    let fail = floor + headroom;
    for (let i = 0; i < HEADROOM_SEARCH_STEPS; i++) {
        const middle = (pass + fail) / 2;
        if (ceiling >= middle) pass = middle;
        else fail = middle;
    }
    const best = attempt(pass);
    return best.ok ? best.value : failed(best.error.code);
}

/**
 * X.W11.ink (COHESION §0gw.4) — THE GUARD'S VERDICT WITHOUT ITS WALK. The
 * certify walk's cost (62 ms traced in one drag settle, `.v1g`) was the
 * guard asked yes-or-no questions it answers only by walking: each headroom
 * step, and each far-side probe, ran a full 32-step lightness bisection
 * (each candidate gamut-mapped by its own 32-step chroma bisection) to learn
 * one bit. `safeAccentColor` (`src/color/operations.ts`) admits a candidate
 * iff BOTH its float and its byte-quantized WCAG ratio clear the target;
 * these two functions are that predicate, term for term: the candidate is
 * the library's own (`oklch` → `mapColorToGamut`, sRGB), the byte arm is the
 * library's own quantizer (`toRgba8`, round-half-even), and the luminance
 * sum and ratio are the guard's expression in the guard's order, so a
 * verdict here is the guard's verdict. The ink returned is still the
 * guard's: these only steer which question it is asked.
 */
const srgbLinear = (encoded: number) => {
    const value = encoded / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

function guardLuminance(channels: readonly number[]): number {
    return 0.2126 * srgbLinear(channels[0]!)
        + 0.7152 * srgbLinear(channels[1]!)
        + 0.0722 * srgbLinear(channels[2]!);
}

function guardRatio(a: number, b: number): number {
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** The guard's two luminances (float, byte) of an opaque colour. */
function guardLuminances(color: Color<"oklch">): readonly [number, number] {
    const rgb = convertColor(color, "rgb");
    if (!rgb.ok) throw new Error(`Ink guard probe failed: ${rgb.error.code}`);
    const bytes = toRgba8(color, { gamut: "clip" });
    if (!bytes.ok) throw new Error(`Ink guard probe failed: ${bytes.error.code}`);
    return [guardLuminance(rgb.value.channels as readonly number[]), guardLuminance(bytes.value)];
}

/** The guard's candidate at lightness `L` for `accent`'s chroma and hue. */
function guardCandidate(accent: Color<"oklch">, L: number): Color<"oklch"> {
    const raw = oklch(L, chroma(accent), accent.channels[2], 1);
    if (!raw.ok) throw new Error(`Ink guard probe failed: ${raw.error.code}`);
    const mapped = mapColorToGamut(raw.value, "srgb");
    if (!mapped.ok) throw new Error(`Ink guard probe failed: ${mapped.error.code}`);
    return mapped.value;
}

/** The ratio the guard reads for `candidate` on `surface`: the lesser arm. */
function guardContrast(candidate: Color<"oklch">, surface: readonly [number, number]): number {
    const [float, byte] = guardLuminances(candidate);
    return Math.min(guardRatio(float, surface[0]), guardRatio(byte, surface[1]));
}

/** The highest target the guard admits for `accent` on `surface`: the best
 *  of the pick and the two poles, the three inks it tries first. */
function guardCeiling(accent: Color<"oklch">, surface: Color<"oklch">): number {
    const ground = guardLuminances(surface);
    const L = Math.min(1, Math.max(0, lightness(accent)));
    return Math.max(
        guardContrast(guardCandidate(accent, L), ground),
        guardContrast(guardCandidate(accent, 0), ground),
        guardContrast(guardCandidate(accent, 1), ground),
    );
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
 * and fails it over the pale stops. The light arm read 5.64:1 live. The mean
 * is the ground identity inks hold their hue on (o18's T-35 and V15-01 legs).
 * The primary plate pair and the band's voice certify on
 * {@link resolveFieldPlateReferent} instead.
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

/**
 * THE PLATE INK'S FIELD REFERENT (COHESION §0gx.2, ESC-W11e2b-1). In dark it
 * is the ambient itself. In light it is maximin: the mean left the plate pair
 * under the floor over the field's dark regions (X.W11.e2b: 4.37:1 on /browse
 * at 390), and {@link maximinFieldReferent} answers with the best ink over
 * every stop.
 */
export function resolveFieldPlateReferent(
    stops: readonly FieldStop[],
    dark: boolean,
): number {
    if (!stops.length || dark) return resolveFieldAmbientLightness(stops, dark);
    return maximinFieldReferent(stops.map(luminanceLightness));
}

/** The pole that reads the higher ratio on a neutral ground: the choice the
 *  guard makes where the headroom target is out of reach (`guardCeiling`). */
function darkPoleWins(surfaceL: number): boolean {
    const ground = guardLuminances(surfaceColor(surfaceL));
    return guardContrast(surfaceColor(0), ground) > guardContrast(surfaceColor(1), ground);
}

/** The lowest ground in [0, 1] where {@link darkPoleWins}, to 2^-24. */
function darkPoleFloor(groundOf: (L: number) => number): number {
    let light = 0;
    let dark = 1;
    for (let i = 0; i < 24; i++) {
        const middle = (light + dark) / 2;
        if (darkPoleWins(groundOf(middle))) dark = middle;
        else light = middle;
    }
    return dark;
}

/**
 * Where a certified light plate's pole changes, once per page: the bare
 * ground, and the ambient under the heaviest translucent rung in the light
 * ladder (`floating`). At or above `plated`, the quiet, resting and floating
 * rungs and the band over that ambient all keep the dark pole.
 */
let poleCrossover: { bare: number; plated: number } | undefined;
function lightPoleCrossover(): { bare: number; plated: number } {
    return poleCrossover ??= {
        bare: darkPoleFloor((L) => L),
        plated: darkPoleFloor((L) => resolveSurfaceLightness("floating", L, false)),
    };
}

/**
 * THE LIGHT REFERENT (COHESION §0gx.2, ESC-W11e2b-1): the ground, in neutral
 * L at WCAG luminance, on which `certify` returns the ink with the best
 * minimum contrast over the given region. A dark ink's worst region is the
 * darkest stop and a light ink's is the lightest, so the two worst cases, each
 * at its pole, name the polarity, and the referent is that polarity's worst
 * stop. The ink's depth is the guard's walk on that referent: the pick where
 * it already clears `floor + headroom`, a pole where nothing does.
 *
 * The polarity is the region's, and the guard sees one ground. A darkest stop
 * inside the 4.58:1 dead band reads a HIGHER ratio on the other pole, and the
 * guard would flip there and fail over the pale stops, so the referent stops
 * at the crossover and the guard's best ink stays the region's. Where no ink
 * of either polarity clears the floor over every stop (seed
 * oklch(0.66 0.16 28)), this still takes the best ink, and the shortfall is a
 * measured row for the owner's design call (`ref-2026-10-30/README.md`).
 */
function maximinFieldReferent(groundLs: readonly number[]): number {
    const darkest = Math.min(...groundLs);
    const lightest = Math.max(...groundLs);
    const worstDarkInk = guardContrast(surfaceColor(0), guardLuminances(surfaceColor(darkest)));
    const worstLightInk = guardContrast(surfaceColor(1), guardLuminances(surfaceColor(lightest)));
    const { bare, plated } = lightPoleCrossover();
    return worstDarkInk >= worstLightInk
        ? Math.max(darkest, plated)
        : Math.min(lightest, bare);
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
 *  would return it unwalked). §0gw.4: read off the guard's predicate
 *  ({@link guardContrast}), never by running its walk to see whether it
 *  moved. */
function clearsAt(color: Color<"oklch">, ground: readonly [number, number], floor: number): boolean {
    return guardContrast(guardCandidate(color, lightness(color)), ground) >= floor;
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
    const ground = guardLuminances(surfaceColor(surfaceL));
    const pole = lightness(walked) >= surfaceL ? 0 : 1;
    const hue = accent.channels[2];
    const at = (L: number): Color<"oklch"> => {
        const raw = oklch(L, chroma(accent), typeof hue === "number" ? hue : 0, 1);
        if (!raw.ok) throw new Error(`Ink far-side probe failed: ${raw.error.code}`);
        const mapped = mapColorToGamut(raw.value, "srgb");
        if (!mapped.ok) throw new Error(`Ink far-side probe failed: ${mapped.error.code}`);
        return mapped.value;
    };
    if (!clearsAt(at(pole), ground, floor)) return null;
    let pass = pole;
    let fail = surfaceL;
    for (let i = 0; i < 16; i++) {
        const middle = (pass + fail) / 2;
        if (clearsAt(at(middle), ground, floor)) pass = middle;
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
function plateInk(
    surfaceL: number,
    dark: boolean,
    contrast: InkContrast = "no-preference",
): Color<"oklch"> {
    return certifyFor(FOREGROUND[dark ? "dark" : "light"], surfaceL, contrast);
}

/**
 * The user's contrast preference (`prefers-contrast`), as the plate pair reads
 * it. `"no-preference"` is the nearest ink that clears `floor + headroom`.
 */
export type InkContrast = "no-preference" | "more";

/**
 * X.W11.n2 (COHESION §0gy.5, SS8-0363): under `prefers-contrast: more` the
 * plate pair certifies to the guard's ceiling, the highest ratio any ink of
 * that seed reaches on the plate (the pole, or the pick where it reads
 * higher). The elevated-contrast layer drops the glass tint, so the live plate
 * it certifies on is cleaner than the no-preference plate. The nearest ink
 * that clears `floor + headroom` there is lighter than the one the
 * no-preference plate's dead band walked to the pole (light 10.21 < 12.10 at
 * the maximin referent, `close/evidence/browser/n2-2026-10-30/`). The ceiling
 * ink is never lower than either. The floor and the headroom constants are
 * unchanged. Only the target moves, and only under the preference.
 */
function certifyFor(accent: Color<"oklch">, surfaceL: number, contrast: InkContrast): Color<"oklch"> {
    if (contrast === "no-preference") return certify(accent, surfaceL, TEXT_CONTRAST_FLOOR);
    const ceiling = guardCeiling(accent, surfaceColor(surfaceL));
    return certify(
        accent,
        surfaceL,
        TEXT_CONTRAST_FLOOR,
        Math.max(CERTIFY_HEADROOM, ceiling - TEXT_CONTRAST_FLOOR),
    );
}

export function resolvePlateInk(
    surfaceL: number,
    dark: boolean,
    contrast: InkContrast = "no-preference",
): string {
    return serialize(plateInk(surfaceL, dark, contrast));
}

/**
 * Golden-step de-emphasis OF THE PRIMARY PLATE INK, then the same explicit
 * contrast certification. The rung derives from the pole `plateInk` chose, so
 * it never flips on its own: a certified step that lands across the surface
 * from its primary, or further from it, keeps the primary instead.
 */
export function resolveMutedInk(
    surfaceL: number,
    dark: boolean,
    contrast: InkContrast = "no-preference",
): string {
    const primary = plateInk(surfaceL, dark, contrast);
    const mixed = mixColors(primary, surfaceColor(surfaceL), 0.382, { space: "oklch" });
    if (!mixed.ok) throw new Error(`Muted ink mix failed: ${mixed.error.code}`);
    const muted = certifyFor(mixed.value, surfaceL, contrast);
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

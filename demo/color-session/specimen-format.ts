/**
 * THE SPECIMEN LINE — one total formatter for the catalog's per-space readout
 * (X-W6 · X:CSS-1, CC-068).
 *
 * Before this module the catalog carried two formatters in one slot: CSS spaces
 * printed the library's full-precision serialization
 * (`rgb(385.302835934518 143.376536829596 199.64311881105 / 82.7%)` — 62
 * characters into a caption box 23 characters wide, 16 of 18 rows ellipsised)
 * while four spaces printed a `space · a · b · c` pseudo-syntax no parser
 * accepts, in the same slot, with nothing telling the two apart. And five of the
 * eighteen rows printed coordinates that leave their own space's gamut with no
 * mark at all, so the browser silently clamped them on paint — the HSL row
 * resolving to white beside a dot painting the true colour.
 *
 * The cure is one function with three obligations:
 *
 *  1 · ONE GRAMMAR PER ROW, DECLARED. The return carries `form`, so a CSS row
 *      and a channel row are distinguishable data rather than two branches that
 *      look alike. Every `form: "css"` row round-trips the shipped parser.
 *
 *  2 · ONE DIGIT POLICY. Every channel rounds through `CHANNEL_DECIMALS`
 *      (channel-decimals.ts), the same table the hero readout, the meters and
 *      the tab title read, so a colour reads the same everywhere it is shown
 *      (owner order 2026-11-09: "too many digits of signif"). Trailing zeros
 *      drop. `SPECIMEN_CHAR_BUDGET` bounds the line and the caption box is
 *      sized from it (`ColorSpaceSelector.vue`).
 *
 *  3 · GAMUT MEASURED AND MARKED. `outOfGamut` is measured on the true
 *      converted coordinates. A space that has a gamut prints the colour as
 *      that space can hold it, its channels clipped to their domain, the way
 *      the hex row's 8-bit encoding always has; the caption's underline says
 *      the colour itself lies outside. No negative blackness, no 103%
 *      saturation, no second grammar for the out-of-range case.
 */
import {
    CSS_PICKER_SPACES,
    PICKER_CHANNELS,
    convertPickerColor,
    pickerColorToHex,
    serializePickerColor,
    withAlpha,
    withChannel,
    type PickerColor,
} from "./picker-color";
import { resolveColorSpace, type DisplayColorSpace } from "./color-model";
import {
    ALPHA_COMPACT_DECIMALS,
    channelDecimals,
    roundTo,
    storageDecimals,
} from "./channel-decimals";

/** The declared grammar of a specimen line. */
export type SpecimenForm = "css" | "channels";

export interface Specimen {
    /** The whole statement, already digit-budgeted. */
    readonly text: string;
    /** `css` rows parse with the shipped parser; `channels` rows are declared non-CSS. */
    readonly form: SpecimenForm;
    /** The colour leaves this space's gamut. MEASURED; the printed channels are clipped to it. */
    readonly outOfGamut: boolean;
}

/**
 * The digit policy's bound, in characters: the longest specimen the policy emits
 * over the picker's own declared colour domain (every space, Lab's declared
 * channel extents, alpha 0..1). The caption box is sized from this in `ch`
 * units, so "the caption fits its box" is a property of the module rather than
 * of a hand-tuned pixel width, and the two cannot drift apart.
 *
 * MEASURED, not guessed: a 95,832-sample sweep of that domain maxes at **50**
 * characters (`color(prophoto-rgb -0.1695 0.1026 -0.1007 / 12.7%)`), and
 * `docs/tranches/X/gates/gate-specimen-grammar.mjs` re-runs the sweep and reds
 * if any sample exceeds this bound.
 */
export const SPECIMEN_CHAR_BUDGET = 52;

/**
 * Which spaces DENOTE a gamut. The RGB encodings and the three cylindrical
 * re-parameterisations of sRGB have a real boundary: coordinates outside their
 * declared channel domain name a colour that space cannot hold. The reference
 * spaces (Lab, LCh, OKLab, OKLCh, XYZ, ICtCp, Jzazbz) and the Planckian locus
 * (Kelvin) have no such boundary — their channel ranges are slider extents, not
 * a gamut, and marking them would be false.
 */
const GAMUT_BEARING = {
    rgb: true,
    hsl: true,
    hsv: true,
    hwb: true,
    lab: false,
    lch: false,
    oklab: false,
    oklch: false,
    xyz: false,
    kelvin: false,
    "srgb-linear": true,
    "display-p3": true,
    "a98-rgb": true,
    "prophoto-rgb": true,
    rec2020: true,
    ictcp: false,
    jzazbz: false,
    "xyz-d50": false,
    "display-p3-linear": true,
    hex: true,
} satisfies Record<DisplayColorSpace, boolean>;

/**
 * MEASURE the gamut. A hue channel is cyclic and cannot leave its domain, so it
 * never participates; every other channel of a gamut-bearing space is tested
 * against its own declared bounds with a span-relative tolerance that absorbs
 * conversion float noise without absorbing a real excursion.
 */
export function leavesGamut(color: PickerColor, space: DisplayColorSpace): boolean {
    if (!GAMUT_BEARING[space]) return false;
    const resolved = resolveColorSpace(space);
    const converted = convertPickerColor(color, resolved);
    return PICKER_CHANNELS[resolved].some((meta, index) => {
        if ("hue" in meta && meta.hue) return false;
        const value = converted.channels[index];
        if (typeof value !== "number") return false;
        const tolerance = (meta.max - meta.min) * 1e-9;
        return value < meta.min - tolerance || value > meta.max + tolerance;
    });
}

/** Clip every non-hue channel into its declared domain (a gamut-bearing space). */
function clipToDomain(color: PickerColor): PickerColor {
    const metas = PICKER_CHANNELS[color.space];
    return color.channels.reduce<PickerColor>((accumulated, channel, index) => {
        const meta = metas[index];
        if (typeof channel !== "number" || !meta || ("hue" in meta && meta.hue)) return accumulated;
        return withChannel(accumulated, meta.key, Math.min(meta.max, Math.max(meta.min, channel)));
    }, color);
}

/** The spaces that re-parameterise sRGB: their gamut is sRGB's, so they clip there. */
const SRGB_CYLINDERS: ReadonlySet<PickerColor["space"]> = new Set(["hsl", "hsv", "hwb"]);

/**
 * The colour as `space` can hold it. An RGB encoding clips its own channels;
 * hsl/hsv/hwb clip in sRGB and convert back, as the hex row does, so an
 * out-of-range saturation never collapses the colour to white.
 */
function holdInGamut(color: PickerColor, space: PickerColor["space"]): PickerColor {
    if (SRGB_CYLINDERS.has(space)) {
        return convertPickerColor(clipToDomain(convertPickerColor(color, "rgb")), space);
    }
    return clipToDomain(convertPickerColor(color, space));
}

/** Round every channel and the alpha through the one digit policy. */
function budgetDigits(color: PickerColor): PickerColor {
    const metas = PICKER_CHANNELS[color.space];
    let budgeted = color.channels.reduce<PickerColor>((accumulated, channel, index) => {
        const meta = metas[index];
        if (typeof channel !== "number" || !meta) return accumulated;
        const decimals = storageDecimals(meta, channelDecimals(color.space, meta.key));
        return withChannel(accumulated, meta.key, roundTo(channel, decimals));
    }, color);
    if (typeof budgeted.alpha === "number") {
        budgeted = withAlpha(budgeted, roundTo(budgeted.alpha, ALPHA_COMPACT_DECIMALS + 2));
    }
    return budgeted;
}

/**
 * The one specimen formatter — total over every member of `DisplayColorSpace`.
 */
export function formatSpecimen(color: PickerColor, space: DisplayColorSpace): Specimen {
    const outOfGamut = leavesGamut(color, space);

    // Hex is the one row whose encoding forces a clip; the mark states it.
    if (space === "hex") {
        return { text: pickerColorToHex(color), form: "css", outOfGamut };
    }

    const resolved = resolveColorSpace(space);
    const converted = convertPickerColor(color, resolved);
    const budgeted = budgetDigits(outOfGamut ? holdInGamut(color, resolved) : converted);
    const alpha = budgeted.alpha === 1
        ? ""
        : ` / ${budgeted.alpha === "none" ? "none" : `${roundTo(budgeted.alpha * 100, ALPHA_COMPACT_DECIMALS)}%`}`;

    if (CSS_PICKER_SPACES.has(resolved)) {
        return { text: serializePickerColor(budgeted), form: "css", outOfGamut };
    }

    const channels = budgeted.channels.map((channel) => String(channel)).join(" · ");
    return { text: `${resolved} · ${channels}${alpha}`, form: "channels", outOfGamut };
}

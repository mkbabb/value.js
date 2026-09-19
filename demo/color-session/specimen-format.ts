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
 *  2 · ONE DIGIT POLICY, sized to the caption box. Every channel and the alpha
 *      carry FOUR SIGNIFICANT DIGITS — one rule, unit-independent, so 0..255,
 *      0..360 and a ±0.4 opponent axis all land at the same readable resolution
 *      and the same bounded width. `SPECIMEN_CHAR_BUDGET` is that bound, and the
 *      caption box is sized FROM it (`ColorSpaceSelector.vue`), so the text and
 *      its box cannot drift apart.
 *
 *  3 · GAMUT MEASURED AND MARKED, NEVER PROJECTED. `outOfGamut` is measured on
 *      the true converted coordinates; the printed coordinates are the same
 *      numbers, digit-budgeted. Nothing here maps a colour into a gamut — a
 *      projection would replace an exact statement with a lie, and the
 *      anti-projection lock (`o23-specimen-gamut-honesty.spec.ts`) reds the
 *      moment `mapColorToGamut` appears in this path. The single exception is
 *      the hex row, whose 8-bit sRGB encoding forces a clip; it therefore
 *      carries the mark whenever the source colour leaves sRGB.
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

/** The declared grammar of a specimen line. */
export type SpecimenForm = "css" | "channels";

export interface Specimen {
    /** The whole statement, already digit-budgeted. */
    readonly text: string;
    /** `css` rows parse with the shipped parser; `channels` rows are declared non-CSS. */
    readonly form: SpecimenForm;
    /** The colour leaves this space's gamut. MEASURED — the text is never projected. */
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

/** THE digit policy: four significant digits, for every channel and the alpha. */
export const SPECIMEN_SIGNIFICANT_DIGITS = 4;

/**
 * The policy's decimal floor: four significant digits, but never past the fourth
 * decimal. It does three things at once. It keeps the numeral a plain decimal
 * (`toPrecision` renders exponentially below 1e-6, and `1e-7` is not a numeral
 * anyone reads off a swatch). It keeps a near-zero channel from spending the
 * whole caption on leading zeros. And it absorbs the float noise a percent
 * channel's ×100 would otherwise print — the measured artefact
 * `hsl(… -16537.899999999998% …)`, which four significant digits alone did not
 * remove.
 */
const SPECIMEN_MAX_DECIMALS = 4;

/** Apply the digit policy to one number. */
function budgetDigitsOf(value: number): number {
    if (!Number.isFinite(value)) return value;
    return Number(
        Number(value.toPrecision(SPECIMEN_SIGNIFICANT_DIGITS)).toFixed(
            SPECIMEN_MAX_DECIMALS,
        ),
    );
}

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

/** Apply the digit policy to a colour, in its own space, through its own constructors. */
function budgetDigits(color: PickerColor): PickerColor {
    const metas = PICKER_CHANNELS[color.space];
    let budgeted = color.channels.reduce<PickerColor>((accumulated, channel, index) => {
        const meta = metas[index];
        if (typeof channel !== "number" || !meta) return accumulated;
        return withChannel(accumulated, meta.key, budgetDigitsOf(channel));
    }, color);
    if (typeof budgeted.alpha === "number") {
        budgeted = withAlpha(budgeted, budgetDigitsOf(budgeted.alpha));
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
    const budgeted = budgetDigits(convertPickerColor(color, resolved));

    if (CSS_PICKER_SPACES.has(resolved)) {
        return { text: serializePickerColor(budgeted), form: "css", outOfGamut };
    }

    const channels = budgeted.channels.map((channel) => String(channel)).join(" · ");
    return { text: `${resolved} · ${channels}`, form: "channels", outOfGamut };
}

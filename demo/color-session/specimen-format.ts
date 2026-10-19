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

/**
 * The CSS functions whose non-hue channels the parser clamps at parsed-value
 * time (css-color-4 §7 hsl s l, §8 hwb w b — both [0, 1]). A colour outside that
 * range is not representable in the function's own grammar.
 */
const PARSE_CLAMPED_SPACES: ReadonlySet<PickerColor["space"]> = new Set(["hsl", "hwb"]);

/**
 * The CSS text would carry a non-hue channel the §7/§8 parse clamp moves. Read
 * on the budgeted digits the row would print, so float noise at a bound (white's
 * `l = 1.0000000000002`) never flips the form.
 */
function leavesParseClamp(color: PickerColor): boolean {
    return PICKER_CHANNELS[color.space].some((meta, index) => {
        if ("hue" in meta && meta.hue) return false;
        const value = color.channels[index];
        return typeof value === "number" && (value < meta.min || value > meta.max);
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
    const converted = convertPickerColor(color, resolved);
    const budgeted = budgetDigits(converted);
    // The one alpha clause every row family states (X-DS pass 19 · V19C-07:
    // the channels form joined its channels and dropped it).
    const alpha = budgeted.alpha === 1
        ? ""
        : ` / ${budgeted.alpha === "none" ? "none" : `${budgetDigitsOf(budgeted.alpha * 100)}%`}`;

    // An sRGB colour outside rgb()'s 0..255 range is spelled `color(srgb …)` on
    // the 0..1 scale, so the policy is applied THERE, in the serialized domain:
    // budgeting 385.3 and letting the serializer divide by 255 brought back full
    // float precision (`color(srgb 1.510980392157 …)`, 66 characters, past the
    // budget and cut before its alpha — V8C-01).
    if (resolved === "rgb" && converted.channels.some(
        (channel) => typeof channel === "number" && (channel < 0 || channel > 255),
    )) {
        const channels = converted.channels.map((channel) =>
            typeof channel === "number" ? String(budgetDigitsOf(channel / 255)) : channel);
        return { text: `color(srgb ${channels.join(" ")}${alpha})`, form: "css", outOfGamut };
    }

    // An hsl/hwb colour whose saturation/lightness or whiteness/blackness leaves
    // 0..100% cannot be carried by its CSS function at all: css-color-4 §7/§8
    // clamp those channels to [0, 1] at parsed-value time, so
    // `hsl(346deg -1295% 103.7%)` is printed honestly and read back as
    // `hsl(346deg 0% 100%)`. Such a row is spelled in the declared `channels`
    // form on the % scale, budgeted THERE (the ×100 float noise, as V8C-01 did
    // for rgb's ÷255), with the mark kept (O23-225).
    if (PARSE_CLAMPED_SPACES.has(resolved) && leavesParseClamp(budgeted)) {
        const channels = converted.channels.map((channel, index) => {
            if (typeof channel !== "number") return channel;
            const meta = PICKER_CHANNELS[resolved][index];
            return String(budgetDigitsOf(meta && "hue" in meta && meta.hue ? channel : channel * 100));
        });
        return { text: `${resolved} · ${channels.join(" · ")}${alpha}`, form: "channels", outOfGamut };
    }

    if (CSS_PICKER_SPACES.has(resolved)) {
        return { text: serializePickerColor(budgeted), form: "css", outOfGamut };
    }

    const channels = budgeted.channels.map((channel) => String(channel)).join(" · ");
    return { text: `${resolved} · ${channels}${alpha}`, form: "channels", outOfGamut };
}

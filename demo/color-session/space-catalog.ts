/**
 * THE SPACE CATALOG — one total record over `DisplayColorSpace` (X-W6 · X:CSS-1,
 * CC-068). Every space the product OFFERS carries, in one place: the label the
 * catalog prints, its channel metadata, the documented facts the nutrition label
 * reads, an EXPLICIT decision about whether a long-form guide exists, and
 * whether it is offered as an interpolation space.
 *
 * Why this module exists (the adjudicated defect, `registry/adjudicated/
 * ColorSpaceSelector.md` L-1/L-3): the product offered 18 spaces, documented 13
 * and guided 11, and it closed both gaps with fallbacks — the RGB facts row
 * standing in for a missing row, and a bare `v-if` for a missing guide.
 * Selecting "Display P3" therefore rendered CIE RGB's 1931 facts under the P3
 * title: the product stated false colour science on a first-class route. The
 * answers lived in four registries — a names map, a facts table, About's own
 * guide map and the interpolation list — and no two of them agreed about which
 * spaces exist.
 *
 * STRUCTURE OVER GATES (L-8). `satisfies` the mapped shape below makes a
 * space-with-no-row a COMPILE ERROR and pins each entry's `id` to its own key,
 * so the fallbacks are not banned — they become unreachable and delete. A
 * nineteenth offered space cannot be added without its row. Totality by CONTENT,
 * not by stub: a catalog that compiles because five entries were filled with
 * placeholders is the masking fallback wearing a type's clothes.
 *
 * `doc: null` is a DECISION, not an absence, and About renders it as a stated
 * empty state rather than a silent gap. Since c60s (FIFTY-THIRD N) every space
 * has a guide, so no row takes it; the decision stays spellable.
 *
 * Home: `color-session` is the product colour domain (ARCHITECTURE §1); the
 * picker, About and the workbenches all read the catalog, none owns it.
 */
import { PICKER_CHANNELS, type ChannelMeta } from "./picker-color";
import { resolveColorSpace, type DisplayColorSpace } from "./color-model";

/**
 * The documented facts for one space: what the About label prints.
 *
 * c60s (FIFTY-THIRD N): the label used to carry three yes/no "key properties",
 * two lists of applications and industries, and a "conversion graph" of roads
 * the library never takes (RGB to Kelvin, HSL to HSV to HWB, Lab to LCh
 * direct). The roads are now drawn from the library itself (About's "Step by
 * step", `scenes/about/space-road.ts`), and the facts are the ones a reader
 * uses: where the space was made, its white, its gamut and its CSS spelling.
 */
export interface SpaceInfo {
    /** The formal title ("sRGB", "CIELAB (L*a*b*)"), not the catalog label. */
    readonly name: string;
    /** The lede: what the space is and why a reader would reach for it. */
    readonly definition: string;
    readonly created: string;
    readonly whitePoint: string;
    readonly gamut: string;
    readonly components: readonly string[];
    /** How CSS writes a colour in it, or why it can't. */
    readonly css: string;
}

/** A lazily-imported long-form guide, or `null` where none is authored. */
export type SpaceDoc = () => Promise<{ default: unknown }>;

export interface SpaceEntry<K extends DisplayColorSpace = DisplayColorSpace> {
    /** The space's own id — pinned to this entry's key by the catalog's shape. */
    readonly id: K;
    /** The label the catalog prints (the option face), e.g. "Display P3". */
    readonly label: string;
    /** The space's channel metadata, already resolved (Hex reads RGB's channels). */
    readonly channels: readonly ChannelMeta[];
    readonly info: SpaceInfo;
    /** EXPLICIT: a guide loader, or `null` meaning "decided: none authored". */
    readonly doc: SpaceDoc | null;
    /** Offered as an interpolation space (gradients, mixing). */
    readonly interpolatable: boolean;
    /** `false`: read when a colour arrives in it (typed or pasted), never offered as a selector row. */
    readonly listed?: false;
}

/**
 * The catalog's shape. It is `Record<DisplayColorSpace, SpaceEntry>` — total over
 * the union — intersected with the key-pinning map so no entry can carry another
 * space's id.
 */
export type SpaceCatalog = Record<DisplayColorSpace, SpaceEntry> & {
    readonly [K in DisplayColorSpace]: SpaceEntry<K>;
};

const channelsOf = (space: DisplayColorSpace): readonly ChannelMeta[] =>
    PICKER_CHANNELS[resolveColorSpace(space)];

const doc = (loader: SpaceDoc): SpaceDoc => loader;

/**
 * The catalog. Order is the canonical catalog order the selector paints.
 *
 * Every row carries a guide (c60s); `doc: null` stays the type's spelling of
 * "none written", which About renders as an authored empty state.
 */
export const SPACE_CATALOG = {
    rgb: {
        id: "rgb",
        label: "RGB",
        channels: channelsOf("rgb"),
        doc: doc(() => import("../../assets/docs/rgb.md")),
        interpolatable: true,
        info: {
            name: "sRGB",
            definition:
                "The web's own space: red, green and blue light, each from 0 to 255, gamma-encoded so the 256 steps fall where the eye can tell them apart. Every rgb(), every hex code and every named colour in CSS lands here.",
            created: "1996, by HP and Microsoft (IEC 61966-2-1, 1999)",
            whitePoint: "D65",
            gamut: "sRGB, about 35% of the CIE xy diagram",
            components: ["Red", "Green", "Blue"],
            css: "rgb(R G B)",
        },
    },

    hsl: {
        id: "hsl",
        label: "HSL",
        channels: channelsOf("hsl"),
        doc: doc(() => import("../../assets/docs/hsl.md")),
        interpolatable: true,
        info: {
            name: "HSL (hue, saturation, lightness)",
            definition:
                "sRGB re-cut as a double cone: pick a hue, then how vivid and how light. It's quick to reason with, but its lightness isn't the eye's; yellow and blue at 50% are nowhere near the same brightness.",
            created: "1978, by George Joblove and Donald Greenberg",
            whitePoint: "D65 (it's sRGB)",
            gamut: "sRGB",
            components: ["Hue", "Saturation", "Lightness"],
            css: "hsl(h s l)",
        },
    },

    hsv: {
        id: "hsv",
        label: "HSV",
        channels: channelsOf("hsv"),
        doc: doc(() => import("../../assets/docs/hsv.md")),
        interpolatable: true,
        info: {
            name: "HSV (hue, saturation, value)",
            definition:
                "sRGB re-cut as a cone with its point at black: a hue, then how pure, then how bright. It's the square and strip of most colour pickers, this one's included, and some apps call it HSB.",
            created: "1978, by Alvy Ray Smith",
            whitePoint: "D65 (it's sRGB)",
            gamut: "sRGB",
            components: ["Hue", "Saturation", "Value"],
            css: "none; hwb() is the same cylinder",
        },
    },

    hwb: {
        id: "hwb",
        label: "HWB",
        channels: channelsOf("hwb"),
        doc: doc(() => import("../../assets/docs/hwb.md")),
        interpolatable: true,
        info: {
            name: "HWB (hue, whiteness, blackness)",
            definition:
                "A painter's way into sRGB: take a pure hue, then mix in white and black. When whiteness and blackness add to 100% or more, they meet as a grey and the hue no longer matters.",
            created: "1996, by Alvy Ray Smith",
            whitePoint: "D65 (it's sRGB)",
            gamut: "sRGB",
            components: ["Hue", "Whiteness", "Blackness"],
            css: "hwb(h w b)",
        },
    },

    lab: {
        id: "lab",
        label: "Lab",
        channels: channelsOf("lab"),
        doc: doc(() => import("../../assets/docs/lab.md")),
        interpolatable: true,
        info: {
            name: "CIELAB (L*a*b*)",
            definition:
                "The CIE's 1976 attempt at a space where distance is difference: L is lightness, a runs from green to red, b from blue to yellow. CSS measures lab() against D50, the white of print.",
            created: "1976, by the CIE",
            whitePoint: "D50 (value.js crosses to D65 with Bradford)",
            gamut: "Unbounded; every visible colour and many that aren't",
            components: ["L (Lightness)", "a (green to red)", "b (blue to yellow)"],
            css: "lab(L a b)",
        },
    },

    lch: {
        id: "lch",
        label: "LCh",
        channels: channelsOf("lch"),
        doc: doc(() => import("../../assets/docs/lch.md")),
        interpolatable: true,
        info: {
            name: "CIE LCh",
            definition:
                "Lab in polar form: the same lightness, with a and b turned into chroma, the distance from grey, and hue, the angle round it. Its blues drift toward purple as they lighten, the flaw OKLCh was made to fix.",
            created: "1976, by the CIE (with Lab)",
            whitePoint: "D50 (value.js crosses to D65 with Bradford)",
            gamut: "Unbounded; every visible colour and many that aren't",
            components: ["L (Lightness)", "C (Chroma)", "h (hue)"],
            css: "lch(L C h)",
        },
    },

    oklab: {
        id: "oklab",
        label: "OKLab",
        channels: channelsOf("oklab"),
        doc: doc(() => import("../../assets/docs/oklab.md")),
        interpolatable: true,
        info: {
            name: "Oklab",
            definition:
                "Björn Ottosson's 2020 remake of Lab: two matrices and a cube root, fitted so equal steps look equal and hues hold as they lighten. CSS Color 4 makes it the default space for interpolation, and value.js measures colour difference in it.",
            created: "2020, by Björn Ottosson",
            whitePoint: "D65",
            gamut: "Unbounded; every visible colour and many that aren't",
            components: ["L (Lightness)", "a (green to red)", "b (blue to yellow)"],
            css: "oklab(L a b)",
        },
    },

    oklch: {
        id: "oklch",
        label: "OKLCh",
        channels: channelsOf("oklch"),
        doc: doc(() => import("../../assets/docs/oklch.md")),
        interpolatable: true,
        info: {
            name: "OKLCh",
            definition:
                "Oklab in polar form: lightness, chroma and hue, on the even hue circle Lab promised and didn't quite give. It's the kindest space for choosing colours by hand, and the one this picker opens in.",
            created: "2020, by Björn Ottosson",
            whitePoint: "D65",
            gamut: "Unbounded; every visible colour and many that aren't",
            components: ["L (Lightness)", "C (Chroma)", "h (hue)"],
            css: "oklch(L C h)",
        },
    },

    xyz: {
        id: "xyz",
        label: "XYZ",
        channels: channelsOf("xyz"),
        doc: doc(() => import("../../assets/docs/xyz.md")),
        interpolatable: true,
        info: {
            name: "CIE XYZ (D65)",
            definition:
                "The CIE's 1931 measure of colour, built from the standard observer's three colour-matching functions; Y is luminance. Every other space here has one road to and from it: value.js converts through XYZ at D65.",
            created: "1931, by the CIE",
            whitePoint: "D65 (CSS's xyz is xyz-d65)",
            gamut: "Unbounded; the visible colours are the horseshoe inside it",
            components: ["X", "Y (luminance)", "Z"],
            css: "color(xyz X Y Z)",
        },
    },

    kelvin: {
        id: "kelvin",
        label: "Kelvin",
        channels: channelsOf("kelvin"),
        doc: doc(() => import("../../assets/docs/kelvin.md")),
        interpolatable: false,
        info: {
            name: "Colour temperature (kelvin)",
            definition:
                "One number for the colour of a glowing body: candlelight near 1900 K, noon near 5500 K, shade past 9000 K. value.js draws it with Tanner Helland's fit to the black-body curve, in sRGB, so it's a good lamp and a rough spectrometer.",
            created: "Planck's law, 1900; Helland's fit, 2012",
            whitePoint: "None of its own; 6500 K sits near D65",
            gamut: "One curve, the black-body locus, as sRGB can show it",
            components: ["Temperature"],
            css: "none; written as rgb()",
        },
    },

    // ── The wide-gamut RGB encodings, the linear forms and the HDR spaces.

    "srgb-linear": {
        id: "srgb-linear",
        label: "sRGB Linear",
        channels: channelsOf("srgb-linear"),
        doc: doc(() => import("../../assets/docs/srgb-linear.md")),
        interpolatable: false,
        info: {
            name: "Linear sRGB",
            definition:
                "sRGB with the gamma taken out, so the numbers are proportional to light. Light adds here: blend, blur and composite in it and the midpoints come out as bright as they should.",
            created: "1996 (with sRGB)",
            whitePoint: "D65",
            gamut: "sRGB",
            components: ["Red (linear)", "Green (linear)", "Blue (linear)"],
            css: "color(srgb-linear R G B)",
        },
    },

    "xyz-d50": {
        id: "xyz-d50",
        label: "XYZ D50",
        channels: channelsOf("xyz-d50"),
        doc: doc(() => import("../../assets/docs/xyz-d50.md")),
        interpolatable: false,
        listed: false,
        info: {
            name: "CIE XYZ (D50)",
            definition:
                "XYZ measured against D50, the warmer white of print and of ICC profiles. Lab and ProPhoto live here; value.js crosses to D65 with the Bradford transform.",
            created: "1931, by the CIE; D50 as the ICC's white",
            whitePoint: "D50",
            gamut: "Unbounded; the visible colours are the horseshoe inside it",
            components: ["X", "Y (luminance)", "Z"],
            css: "color(xyz-d50 X Y Z)",
        },
    },
    "display-p3-linear": {
        id: "display-p3-linear",
        label: "Display P3 Linear",
        channels: channelsOf("display-p3-linear"),
        doc: doc(() => import("../../assets/docs/display-p3-linear.md")),
        interpolatable: false,
        listed: false,
        info: {
            name: "Linear Display P3",
            definition:
                "Display P3 with its curve taken out: numbers proportional to light, on P3's wider primaries. It's where wide-gamut light is blended.",
            created: "2015 (with Display P3)",
            whitePoint: "D65",
            gamut: "Display P3",
            components: ["Red (linear)", "Green (linear)", "Blue (linear)"],
            css: "color(display-p3-linear R G B)",
        },
    },
    "display-p3": {
        id: "display-p3",
        label: "Display P3",
        channels: channelsOf("display-p3"),
        doc: doc(() => import("../../assets/docs/display-p3.md")),
        interpolatable: false,
        info: {
            name: "Display P3",
            definition:
                "Apple's wide gamut: the DCI-P3 cinema primaries on sRGB's own curve and white. Its reds and greens reach past sRGB's, and most phones and laptops sold today can show them.",
            created: "2015, by Apple",
            whitePoint: "D65",
            gamut: "Wide; about 36% more of the CIE xy diagram than sRGB",
            components: ["Red", "Green", "Blue"],
            css: "color(display-p3 R G B)",
        },
    },

    "a98-rgb": {
        id: "a98-rgb",
        label: "Adobe RGB",
        channels: channelsOf("a98-rgb"),
        doc: doc(() => import("../../assets/docs/a98-rgb.md")),
        interpolatable: false,
        info: {
            name: "Adobe RGB (1998)",
            definition:
                "Adobe's working space for photographs bound for print: sRGB's red and blue with a greener green, on a plain 563/256 power curve. Its extra reach is in the cyans and greens that inks can print.",
            created: "1998, by Adobe",
            whitePoint: "D65",
            gamut: "Wide; about Display P3's size, reaching further into green",
            components: ["Red", "Green", "Blue"],
            css: "color(a98-rgb R G B)",
        },
    },

    "prophoto-rgb": {
        id: "prophoto-rgb",
        label: "ProPhoto RGB",
        channels: channelsOf("prophoto-rgb"),
        doc: doc(() => import("../../assets/docs/prophoto-rgb.md")),
        interpolatable: false,
        info: {
            name: "ProPhoto RGB (ROMM RGB)",
            definition:
                "Kodak's space for raw photographs, so wide that two of its primaries lie outside human vision. It's referred to D50 and wants 16 bits a channel; at 8, its steps are coarse enough to band.",
            created: "2000, by Kodak (ISO 22028-2)",
            whitePoint: "D50",
            gamut: "Very wide; part of it is no colour at all",
            components: ["Red", "Green", "Blue"],
            css: "color(prophoto-rgb R G B)",
        },
    },

    rec2020: {
        id: "rec2020",
        label: "Rec. 2020",
        channels: channelsOf("rec2020"),
        doc: doc(() => import("../../assets/docs/rec2020.md")),
        interpolatable: false,
        info: {
            name: "Rec. 2020 (ITU-R BT.2020)",
            definition:
                "Ultra-high-definition television's space, with primaries on the spectral locus itself: pure 630, 532 and 467 nm light. No ordinary screen covers all of it yet; it's the container wide-gamut video ships in.",
            created: "2012, by the ITU",
            whitePoint: "D65",
            gamut: "Very wide; about 76% of the CIE xy diagram",
            components: ["Red", "Green", "Blue"],
            css: "color(rec2020 R G B)",
        },
    },

    ictcp: {
        id: "ictcp",
        label: "ICtCp",
        channels: channelsOf("ictcp"),
        doc: doc(() => import("../../assets/docs/ictcp.md")),
        interpolatable: false,
        info: {
            name: "ICtCp (ITU-R BT.2100)",
            definition:
                "Dolby's space for HDR video: cone responses through the PQ curve, then split into intensity I and two opponent axes, Ct for blue and yellow and Cp for red and green. Scaled as ΔE ITP, one unit of difference is about one just-noticeable step.",
            created: "2016, by Dolby (ITU-R BT.2100)",
            whitePoint: "D65",
            gamut: "Unbounded; built for Rec. 2020 up to 10,000 cd/m²",
            components: ["I (intensity)", "Ct (blue to yellow)", "Cp (red to green)"],
            css: "none; written as oklch()",
        },
    },

    jzazbz: {
        id: "jzazbz",
        label: "Jzazbz",
        channels: channelsOf("jzazbz"),
        doc: doc(() => import("../../assets/docs/jzazbz.md")),
        interpolatable: false,
        info: {
            name: "Jzazbz",
            definition:
                "A uniform space for HDR and wide gamut, on the same PQ-style curve as ICtCp: Jz is lightness, az and bz the red-green and yellow-blue axes. It keeps hue straighter than CIELAB across a far wider range of brightness.",
            created: "2017, by Safdar, Cui, Kim and Luo",
            whitePoint: "D65",
            gamut: "Unbounded; built for HDR and wide-gamut signals",
            components: ["Jz (lightness)", "az (red to green)", "bz (yellow to blue)"],
            css: "none; written as oklch()",
        },
    },

    hex: {
        id: "hex",
        label: "Hex",
        channels: channelsOf("hex"),
        doc: doc(() => import("../../assets/docs/hex.md")),
        interpolatable: false,
        info: {
            name: "Hex (#rrggbb)",
            definition:
                "sRGB in base 16: two digits a channel, 00 to ff, and two more for alpha if you want them. It's the colour people paste most, and every value in it is a whole byte.",
            created: "1996 in CSS1; the # spelling is the X Window System's",
            whitePoint: "D65 (it's sRGB)",
            gamut: "sRGB",
            components: ["Red (00 to ff)", "Green (00 to ff)", "Blue (00 to ff)"],
            css: "#rrggbb, #rgb, #rrggbbaa",
        },
    },
} satisfies SpaceCatalog;

/**
 * The catalog as a KEY-PRESERVING list. Each entry carries its own `id`, so a
 * consumer iterating this array holds a `DisplayColorSpace` — never the `string`
 * that `Object.entries` would hand it, and never a cast at the render boundary.
 */
export const SPACE_CATALOG_ENTRIES: readonly SpaceEntry[] =
    Object.values(SPACE_CATALOG).filter((entry: SpaceEntry) => entry.listed !== false);

/** The catalog label for one space — the one home for display names. */
export function spaceLabel(space: DisplayColorSpace): string {
    return SPACE_CATALOG[space].label;
}

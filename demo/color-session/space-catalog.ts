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
 * `doc: null` is a DECISION, not an absence: the five wide-gamut RGB encodings
 * and the two HDR perceptual spaces have no authored guide, and the About route
 * renders that as a stated empty state rather than a silent gap.
 *
 * Home: `color-session` is the product colour domain (ARCHITECTURE §1); the
 * picker, About and the workbenches all read the catalog, none owns it.
 */
import { PICKER_CHANNELS, type ChannelMeta } from "./picker-color";
import { resolveColorSpace, type DisplayColorSpace } from "./color-model";

/** The documented facts for one space — the nutrition label's whole surface. */
export interface SpaceInfo {
    /** The full formal title ("CIE RGB (Red, Green, Blue)"), not the catalog label. */
    readonly name: string;
    readonly definition: string;
    readonly created: string;
    readonly deviceDependency: string;
    readonly whitePoint: string;
    readonly gamut: string;
    readonly components: readonly string[];
    readonly perceptualUniformity: string;
    readonly hueLinearity: string;
    readonly lightnessSeparation: string;
    readonly applications: readonly string[];
    readonly industries: readonly string[];
    readonly conversions: readonly (readonly string[])[];
    readonly notes: string;
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
 * The `doc: null` rows are the decision, stated: the five wide-gamut RGB
 * encodings and the two HDR perceptual spaces (ICtCp, Jzazbz) have no authored
 * long-form guide. About renders that as an authored empty state.
 */
export const SPACE_CATALOG = {
    rgb: {
        id: "rgb",
        label: "RGB",
        channels: channelsOf("rgb"),
        doc: doc(() => import("../../assets/docs/rgb.md")),
        interpolatable: true,
        info: {
            name: "CIE RGB (Red, Green, Blue)",
            definition:
                "A color space based on the additive mixture of red, green, and blue light.",
            created: "1931",
            deviceDependency: "Device-dependent",
            whitePoint: "Varies (typically D65)",
            gamut: "Limited (device-specific)",
            components: ["Red", "Green", "Blue"],
            perceptualUniformity: "No",
            hueLinearity: "No",
            lightnessSeparation: "No",
            applications: ["Digital displays", "Web design", "Computer graphics"],
            industries: ["Digital media", "Entertainment", "Gaming"],
            conversions: [
                ["RGB", "XYZ"],
                ["RGB", "Kelvin"],
                ["RGB", "HSL"],
                ["RGB", "Hex"],
            ],
            notes: "The most common color space for digital image representation and display.",
        },
    },

    hsl: {
        id: "hsl",
        label: "HSL",
        channels: channelsOf("hsl"),
        doc: doc(() => import("../../assets/docs/hsl.md")),
        interpolatable: true,
        info: {
            name: "HSL (Hue, Saturation, Lightness)",
            definition:
                "A cylindrical representation of the RGB color space, with a focus on human perception.",
            created: "1978",
            deviceDependency: "Device-dependent (derived from RGB)",
            whitePoint: "Inherited from RGB",
            gamut: "Same as RGB",
            components: ["Hue", "Saturation", "Lightness"],
            perceptualUniformity: "No",
            hueLinearity: "Yes",
            lightnessSeparation: "Yes",
            applications: [
                "Color selection interfaces",
                "Image processing",
                "Computer graphics",
            ],
            industries: ["Web design", "User interface design", "Digital art"],
            conversions: [
                ["HSL", "RGB"],
                ["HSL", "RGB", "XYZ"],
                ["HSL", "HSV"],
                ["HSL", "HSV", "HWB"],
            ],
            notes: "Provides an intuitive way to adjust colors, but not perceptually uniform.",
        },
    },

    hsv: {
        id: "hsv",
        label: "HSV",
        channels: channelsOf("hsv"),
        doc: doc(() => import("../../assets/docs/hsv.md")),
        interpolatable: true,
        info: {
            name: "HSV (Hue, Saturation, Value)",
            definition:
                "A cylindrical representation of the RGB color space, with a focus on perceptual uniformity.",
            created: "1978",
            deviceDependency: "Device-dependent (derived from RGB)",
            whitePoint: "Inherited from RGB",
            gamut: "Same as RGB",
            components: ["Hue", "Saturation", "Value"],
            perceptualUniformity: "No",
            hueLinearity: "Yes",
            lightnessSeparation: "No (uses Value instead)",
            applications: [
                "Color selection interfaces",
                "Computer vision",
                "Image analysis",
            ],
            industries: ["Graphic design", "Image processing", "Machine vision"],
            conversions: [
                ["HSV", "HSL"],
                ["HSV", "HSL", "XYZ"],
            ],
            notes: "Similar to HSL, but uses Value instead of Lightness. Often preferred in computer vision applications.",
        },
    },

    hwb: {
        id: "hwb",
        label: "HWB",
        channels: channelsOf("hwb"),
        doc: doc(() => import("../../assets/docs/hwb.md")),
        interpolatable: true,
        info: {
            name: "HWB (Hue, Whiteness, Blackness)",
            definition:
                "A cylindrical representation of the RGB color space, using Whiteness and Blackness instead of Saturation and Lightness.",
            created: "1978",
            deviceDependency: "Device-dependent (derived from RGB)",
            whitePoint: "Inherited from RGB",
            gamut: "Same as RGB",
            components: ["Hue", "Whiteness", "Blackness"],
            perceptualUniformity: "No",
            hueLinearity: "Yes",
            lightnessSeparation: "Partial (through Whiteness and Blackness)",
            applications: ["Color selection interfaces", "Color manipulation"],
            industries: ["Web design", "Digital painting"],
            conversions: [
                ["HWB", "HSV"],
                ["HWB", "HSV", "HSL"],
                ["HWB", "HSV", "HSL", "XYZ"],
            ],
            notes: "Designed to be more intuitive for humans. Whiteness and Blackness are easier to conceptualize than Saturation and Value/Lightness.",
        },
    },

    lab: {
        id: "lab",
        label: "Lab",
        channels: channelsOf("lab"),
        doc: doc(() => import("../../assets/docs/lab.md")),
        interpolatable: true,
        info: {
            name: "Lab (CIELAB)",
            definition:
                "The L*a*b* color space is a three-dimensional color model designed to be perceptually uniform and device-independent.",
            created: "1976",
            deviceDependency: "Device-independent",
            whitePoint: "Variable (typically D50 or D65)",
            gamut: "Unlimited",
            components: ["L* (Lightness)", "a* (Green-Red)", "b* (Blue-Yellow)"],
            perceptualUniformity: "Yes",
            hueLinearity: "No",
            lightnessSeparation: "Yes",
            applications: [
                "Color management",
                "Image processing",
                "Color difference calculations",
            ],
            industries: [
                "Printing",
                "Textile",
                "Paint manufacturing",
                "Color research",
            ],
            conversions: [
                ["Lab", "XYZ"],
                ["Lab", "LCh"],
                ["Lab", "XYZ", "OKLab"],
                ["Lab", "LCh", "OKLCh"],
            ],
            notes: "Designed to approximate human vision. Widely used for measuring color differences.",
        },
    },

    lch: {
        id: "lch",
        label: "LCh",
        channels: channelsOf("lch"),
        doc: doc(() => import("../../assets/docs/lch.md")),
        interpolatable: true,
        info: {
            name: "LCh (Lightness, Chroma, hue)",
            definition: "A cylindrical representation of the Lab color space.",
            created: "1976",
            deviceDependency: "Device-independent",
            whitePoint: "Variable (inherited from Lab)",
            gamut: "Unlimited",
            components: ["L (Lightness)", "C (Chroma)", "h (hue)"],
            perceptualUniformity: "Yes",
            hueLinearity: "Yes",
            lightnessSeparation: "Yes",
            applications: ["Color adjustment", "Color harmony", "User interfaces"],
            industries: ["Graphic design", "Fashion", "Product design"],
            conversions: [
                ["LCh", "Lab"],
                ["LCh", "Lab", "XYZ"],
            ],
            notes: "Provides a more intuitive way to adjust Lab colors. Useful for creating color harmonies.",
        },
    },

    oklab: {
        id: "oklab",
        label: "OKLab",
        channels: channelsOf("oklab"),
        doc: doc(() => import("../../assets/docs/oklab.md")),
        interpolatable: true,
        info: {
            name: "OKLab",
            definition:
                "A perceptually uniform color space designed to be more intuitive than CIELAB.",
            created: "2019",
            deviceDependency: "Device-independent",
            whitePoint: "D65",
            gamut: "Unlimited",
            components: ["L (Lightness)", "a (Green-Red)", "b (Blue-Yellow)"],
            perceptualUniformity: "Yes (improved over Lab)",
            hueLinearity: "Better than Lab, but not perfect",
            lightnessSeparation: "Yes",
            applications: [
                "Color manipulation",
                "Gradient generation",
                "Color difference calculations",
            ],
            industries: ["Web design", "Digital imaging", "Color science"],
            conversions: [
                ["OKLab", "XYZ"],
                ["OKLab", "XYZ", "Lab"],
                ["OKLab", "OKLCh"],
            ],
            notes: "A newer color space designed to address some issues with CIELAB. Provides better perceptual uniformity for saturated colors.",
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
            definition: "A cylindrical representation of the OKLab color space.",
            created: "2019",
            deviceDependency: "Device-independent",
            whitePoint: "D65",
            gamut: "Unlimited",
            components: ["L (Lightness)", "C (Chroma)", "h (hue)"],
            perceptualUniformity: "Yes (inherited from OKLab)",
            hueLinearity: "Yes",
            lightnessSeparation: "Yes",
            applications: ["Color selection", "Color harmony", "Gradient creation"],
            industries: ["Web design", "User interface design", "Digital art"],
            conversions: [
                ["OKLCh", "OKLab"],
                ["OKLCh", "OKLab", "XYZ"],
                ["OKLCh", "OKLab", "XYZ", "Lab"],
            ],
            notes: "Combines the benefits of OKLab with the intuitive nature of cylindrical color spaces. Useful for creating perceptually uniform color palettes.",
        },
    },

    xyz: {
        id: "xyz",
        label: "XYZ",
        channels: channelsOf("xyz"),
        doc: doc(() => import("../../assets/docs/xyz.md")),
        interpolatable: true,
        info: {
            name: "XYZ",
            definition:
                "The CIE 1931 XYZ color space is a device-independent color space based on human color perception.",
            created: "1931",
            deviceDependency: "Device-independent",
            whitePoint: "Variable (typically D50 or D65)",
            gamut: "Unlimited",
            components: ["X", "Y", "Z"],
            perceptualUniformity: "No",
            hueLinearity: "No",
            lightnessSeparation: "Partial (Y component represents luminance)",
            applications: [
                "Color space conversions",
                "Colorimetry",
                "Spectral color representations",
            ],
            industries: ["Color management", "Scientific color analysis", "Lighting"],
            conversions: [
                ["XYZ", "RGB"],
                ["XYZ", "Lab"],
                ["XYZ", "RGB", "HSL"],
                ["XYZ", "RGB", "HSV"],
                ["XYZ", "Lab", "LCh"],
                ["XYZ", "OKLab"],
                ["XYZ", "OKLab", "OKLCh"],
                ["XYZ", "RGB", "Kelvin"],
            ],
            notes: "Based on human color perception. Often used as an intermediate space for converting between other color spaces.",
        },
    },

    kelvin: {
        id: "kelvin",
        label: "Kelvin",
        channels: channelsOf("kelvin"),
        doc: doc(() => import("../../assets/docs/kelvin.md")),
        interpolatable: false,
        info: {
            name: "Kelvin (Color Temperature)",
            definition:
                "The Kelvin color space represents the color of an ideal black-body radiator at a given temperature.",
            created: "Beginning of time",
            deviceDependency: "Device-independent",
            whitePoint: "N/A (defines white point)",
            gamut: "Limited (represents a subset of chromaticities along the Planckian locus)",
            components: ["Temperature (K)"],
            perceptualUniformity: "No",
            hueLinearity: "No",
            lightnessSeparation: "No",
            applications: ["Lighting design", "Photography", "Display calibration"],
            industries: ["Photography", "Film", "Lighting", "Display manufacturing"],
            conversions: [
                ["Kelvin", "RGB"],
                ["Kelvin", "RGB", "XYZ"],
            ],
            notes: "Represents the color of an ideal black-body radiator at a given temperature. Useful for describing the color of light sources.",
        },
    },

    // ── The five wide-gamut RGB encodings the product OFFERED and never
    // documented. Authored by X-W6.f; before this row the selector listed them
    // and the About route answered with CIE RGB's 1931 card.

    "srgb-linear": {
        id: "srgb-linear",
        label: "sRGB Linear",
        channels: channelsOf("srgb-linear"),
        doc: null,
        interpolatable: false,
        info: {
            name: "Linear sRGB",
            definition:
                "The sRGB primaries and white point with the transfer function removed: channel values are linear in light intensity rather than gamma-encoded.",
            created: "1996",
            deviceDependency: "Device-dependent (sRGB primaries)",
            whitePoint: "D65",
            gamut: "Same as sRGB",
            components: ["Red (linear)", "Green (linear)", "Blue (linear)"],
            perceptualUniformity: "No",
            hueLinearity: "No",
            lightnessSeparation: "No",
            applications: [
                "Compositing and blending",
                "Physically-based rendering",
                "Gamut conversion pipelines",
            ],
            industries: ["Computer graphics", "Film and VFX", "Game engines"],
            conversions: [
                ["sRGB Linear", "RGB"],
                ["sRGB Linear", "XYZ"],
                ["sRGB Linear", "XYZ", "Lab"],
            ],
            notes: "Light adds linearly here, so this is the correct space for blending, filtering and physical simulation; gamma-encoded RGB is not.",
        },
    },

    "display-p3": {
        id: "display-p3",
        label: "Display P3",
        channels: channelsOf("display-p3"),
        doc: null,
        interpolatable: false,
        info: {
            name: "Display P3",
            definition:
                "A display-referred wide-gamut space: the DCI-P3 primaries carried on the sRGB transfer function with a D65 white point.",
            created: "2015",
            deviceDependency: "Device-dependent (P3 primaries)",
            whitePoint: "D65",
            gamut: "Wide (about 25% larger than sRGB)",
            components: ["Red", "Green", "Blue"],
            perceptualUniformity: "No",
            hueLinearity: "No",
            lightnessSeparation: "No",
            applications: [
                "Wide-gamut web content",
                "Photography on modern displays",
                "Interface design for P3 panels",
            ],
            industries: ["Consumer displays", "Web design", "Photography"],
            conversions: [
                ["Display P3", "XYZ"],
                ["Display P3", "XYZ", "RGB"],
                ["Display P3", "XYZ", "OKLab"],
            ],
            notes: "The default wide gamut of current Apple hardware: saturated reds and greens that sRGB cannot reach are addressable here.",
        },
    },

    "a98-rgb": {
        id: "a98-rgb",
        label: "Adobe RGB",
        channels: channelsOf("a98-rgb"),
        doc: null,
        interpolatable: false,
        info: {
            name: "Adobe RGB (1998)",
            definition:
                "Adobe's 1998 wide-gamut RGB working space, defined to encompass most colors reachable by CMYK printing.",
            created: "1998",
            deviceDependency: "Device-dependent (Adobe RGB primaries)",
            whitePoint: "D65",
            gamut: "Wide (extends sRGB, chiefly through cyan-green)",
            components: ["Red", "Green", "Blue"],
            perceptualUniformity: "No",
            hueLinearity: "No",
            lightnessSeparation: "No",
            applications: [
                "Photographic editing",
                "Prepress proofing",
                "Archival capture",
            ],
            industries: ["Photography", "Printing", "Publishing"],
            conversions: [
                ["Adobe RGB", "XYZ"],
                ["Adobe RGB", "XYZ", "RGB"],
                ["Adobe RGB", "XYZ", "Lab"],
            ],
            notes: "Chosen when print is the destination: the extra cyan-green coverage maps onto CMYK inks that sRGB clips away.",
        },
    },

    "prophoto-rgb": {
        id: "prophoto-rgb",
        label: "ProPhoto RGB",
        channels: channelsOf("prophoto-rgb"),
        doc: null,
        interpolatable: false,
        info: {
            name: "ProPhoto RGB (ROMM RGB)",
            definition:
                "Kodak's very wide RGB working space, whose primaries lie partly outside the spectral locus, referenced to a D50 white point.",
            created: "2000",
            deviceDependency: "Device-independent working space (imaginary primaries)",
            whitePoint: "D50",
            gamut: "Very wide (exceeds the visible spectrum; part of the encodable volume is imaginary)",
            components: ["Red", "Green", "Blue"],
            perceptualUniformity: "No",
            hueLinearity: "No",
            lightnessSeparation: "No",
            applications: [
                "Raw photo development",
                "High-bit-depth editing",
                "Archival masters",
            ],
            industries: ["Photography", "Printing", "Digital imaging"],
            conversions: [
                ["ProPhoto RGB", "XYZ"],
                ["ProPhoto RGB", "XYZ", "Lab"],
                ["ProPhoto RGB", "XYZ", "RGB"],
            ],
            notes: "Safe only at high bit depth: the gamut is so large that 8-bit codes fall too far apart and quantisation banding appears.",
        },
    },

    rec2020: {
        id: "rec2020",
        label: "Rec. 2020",
        channels: channelsOf("rec2020"),
        doc: null,
        interpolatable: false,
        info: {
            name: "Rec. 2020 (ITU-R BT.2020)",
            definition:
                "The ultra-high-definition broadcast space whose red, green and blue primaries are monochromatic and sit on the spectral locus.",
            created: "2012",
            deviceDependency: "Device-dependent (BT.2020 primaries)",
            whitePoint: "D65",
            gamut: "Very wide (about three quarters of the CIE 1931 chromaticity diagram)",
            components: ["Red", "Green", "Blue"],
            perceptualUniformity: "No",
            hueLinearity: "No",
            lightnessSeparation: "No",
            applications: [
                "UHD and HDR broadcast",
                "4K and 8K mastering",
                "Wide-gamut video delivery",
            ],
            industries: ["Broadcast", "Film", "Display manufacturing"],
            conversions: [
                ["Rec. 2020", "XYZ"],
                ["Rec. 2020", "XYZ", "RGB"],
                ["Rec. 2020", "ICtCp"],
            ],
            notes: "A container standard defined ahead of the hardware: no shipping display reproduces the whole of it today.",
        },
    },

    ictcp: {
        id: "ictcp",
        label: "ICtCp",
        channels: channelsOf("ictcp"),
        doc: null,
        interpolatable: false,
        info: {
            name: "ICtCp (ITU-R BT.2100)",
            definition:
                "An HDR-ready perceptual space (ITU-R BT.2100) derived from LMS cone responses through the PQ transfer function. I encodes intensity; Ct and Cp are the tritanopic and protanopic opponent axes.",
            created: "2016",
            deviceDependency: "Device-independent",
            whitePoint: "D65",
            gamut: "Wide (HDR / Rec. 2020 signals)",
            components: ["Intensity (I)", "Ct (tritan)", "Cp (protan)"],
            perceptualUniformity: "Yes",
            hueLinearity: "Yes",
            lightnessSeparation: "Yes",
            applications: [
                "HDR mastering",
                "Broadcast color difference (ΔE-ITP)",
                "Dolby Vision",
            ],
            industries: ["Broadcast", "Film", "HDR display"],
            conversions: [
                ["ICtCp", "XYZ"],
                ["ICtCp", "XYZ", "RGB"],
                ["ICtCp", "XYZ", "OKLab"],
            ],
            notes: "The space behind ΔE-ITP (BT.2124). Purpose-built for HDR and wide-gamut signals; one ICtCp unit ≈ one JND.",
        },
    },

    jzazbz: {
        id: "jzazbz",
        label: "Jzazbz",
        channels: channelsOf("jzazbz"),
        doc: null,
        interpolatable: false,
        info: {
            name: "Jzazbz (Safdar 2017)",
            definition:
                "A perceptually-uniform space (Safdar, Kim, Luo, Cui & Melgosa, 2017) for image signals spanning HDR and wide gamut. Jz is lightness; az and bz are the red-green and yellow-blue opponent axes.",
            created: "2017",
            deviceDependency: "Device-independent",
            whitePoint: "D65",
            gamut: "Wide (HDR / wide-gamut)",
            components: ["Lightness (Jz)", "az (red-green)", "bz (yellow-blue)"],
            perceptualUniformity: "Yes",
            hueLinearity: "Yes",
            lightnessSeparation: "Yes",
            applications: [
                "HDR image processing",
                "Gamut mapping",
                "Color-difference metrics",
            ],
            industries: ["Imaging science", "HDR display", "Color management"],
            conversions: [
                ["Jzazbz", "XYZ"],
                ["Jzazbz", "XYZ", "RGB"],
                ["Jzazbz", "XYZ", "OKLab"],
            ],
            notes: "Improves on CIELAB's hue-linearity and lightness uniformity across a far larger luminance range; greys are near- (not perfectly) achromatic by design.",
        },
    },

    hex: {
        id: "hex",
        label: "Hex",
        channels: channelsOf("hex"),
        doc: doc(() => import("../../assets/docs/hex.md")),
        interpolatable: false,
        info: {
            name: "Hex (Hexadecimal RGB)",
            definition:
                "A compact hexadecimal notation for sRGB colors, widely used in web design and CSS. Each pair of hex digits encodes a red, green, or blue channel (0-255).",
            created: "1996",
            deviceDependency: "Device-dependent (same as RGB)",
            whitePoint: "Inherited from RGB (typically D65)",
            gamut: "Same as sRGB",
            components: ["Red (00-FF)", "Green (00-FF)", "Blue (00-FF)"],
            perceptualUniformity: "No",
            hueLinearity: "No",
            lightnessSeparation: "No",
            applications: ["Web design", "CSS styling", "Brand guidelines"],
            industries: ["Web development", "Graphic design", "Digital media"],
            conversions: [
                ["Hex", "RGB"],
                ["Hex", "RGB", "HSL"],
                ["Hex", "RGB", "XYZ"],
            ],
            notes: "The most common color notation on the web. Equivalent to RGB but encoded as a 6-digit (or 8-digit with alpha) hexadecimal string prefixed with #.",
        },
    },
} satisfies SpaceCatalog;

/**
 * The catalog as a KEY-PRESERVING list. Each entry carries its own `id`, so a
 * consumer iterating this array holds a `DisplayColorSpace` — never the `string`
 * that `Object.entries` would hand it, and never a cast at the render boundary.
 */
export const SPACE_CATALOG_ENTRIES: readonly SpaceEntry[] =
    Object.values(SPACE_CATALOG);

/** The catalog label for one space — the one home for display names. */
export function spaceLabel(space: DisplayColorSpace): string {
    return SPACE_CATALOG[space].label;
}

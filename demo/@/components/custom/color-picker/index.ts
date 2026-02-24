import { ValueUnit } from "@src/units";
import { Color } from "@src/units/color";
import { ColorSpace } from "@src/units/color/constants";

export { default as ColorPicker } from "./ColorPicker.vue";
export { default as ColorNutritionLabel } from "./ColorNutritionLabel.vue";

export type ColorModel = {
    selectedColorSpace: ColorSpace;
    color: ValueUnit<Color<ValueUnit<number>>> | null;
    inputColor: string;
    savedColors: Array<ValueUnit<Color<ValueUnit<number>>> | any>;
};

export const defaultColorModel: ColorModel = {
    selectedColorSpace: "lab",
    color: null,
    inputColor: "lab(92% 88.8 20 / 82.70%)",
    savedColors: [],
};

export const colorSpaceInfo = {
    rgb: {
        name: "CIE RGB (Red, Green, Blue)",
        type: "Additive",
        created: "1931",
        definition:
            "A color space based on the additive mixture of red, green, and blue light.",
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

    hsl: {
        name: "HSL (Hue, Saturation, Lightness)",
        type: "Cylindrical representation of RGB",
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

    hsv: {
        name: "HSV (Hue, Saturation, Value)",
        type: "Cylindrical representation of RGB",
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

    hwb: {
        name: "HWB (Hue, Whiteness, Blackness)",
        type: "Cylindrical representation of RGB",
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

    lab: {
        name: "Lab (CIELAB)",
        type: "Perceptual",
        definition:
            "The L*a*b* color space is a three-dimensional color model designed to be perceptually uniform and device-independent.",
        deviceDependency: "Device-independent",
        created: "1976",
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
        industries: ["Printing", "Textile", "Paint manufacturing", "Color research"],
        conversions: [
            ["Lab", "XYZ"],
            ["Lab", "LCh"],
            ["Lab", "XYZ", "OKLab"],
            ["Lab", "LCh", "OKLCh"],
        ],
        notes: "Designed to approximate human vision. Widely used for measuring color differences.",
    },

    lch: {
        name: "LCh (Lightness, Chroma, hue)",
        type: "Cylindrical representation of Lab",
        definition: "A cylindrical representation of the Lab color space.",
        deviceDependency: "Device-independent",
        created: "1976",
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

    oklab: {
        name: "OKLab",
        type: "Perceptual",
        definition:
            "A perceptually uniform color space designed to be more intuitive than CIELAB.",
        deviceDependency: "Device-independent",
        created: "2019",
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

    oklch: {
        name: "OKLCh",
        type: "Cylindrical representation of OKLab",
        definition: "A cylindrical representation of the OKLab color space.",
        deviceDependency: "Device-independent",
        created: "2019",
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

    xyz: {
        name: "XYZ",
        type: "Absolute",
        definition:
            "The CIE 1931 XYZ color space is a device-independent color space based on human color perception.",
        deviceDependency: "Device-independent",
        created: "1931",
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

    kelvin: {
        name: "Kelvin (Color Temperature)",
        type: "Physical",
        definition:
            "The Kelvin color space represents the color of an ideal black-body radiator at a given temperature.",
        deviceDependency: "Device-independent",
        created: "Beginning of time",
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
} as const;

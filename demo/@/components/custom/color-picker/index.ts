import type { ColorSpace } from "@src/units/color/constants";
import { COLOR_SPACE_NAMES } from "@src/units/color/constants";
import { parseCSSColor } from "@src/parsing/color";
import type { ParsedColorUnit } from "@src/parsing/color";
import { colorUnit2, normalizeColorUnit } from "@src/units/color/normalize";

export { default as ColorPicker } from "./ColorPicker.vue";
export { default as ColorNutritionLabel } from "./display/ColorNutritionLabel.vue";
export type { ActionBarContext } from "./keys";
export { colorSpaceInfo } from "./colorSpaceInfo";

export interface EditTarget {
    paletteId: string;
    colorIndex: number;
    originalCss: string;
}

/**
 * Display color space — extends ColorSpace with "hex", which is an RGB encoding
 * (not a color space in the mathematical sense).
 */
export type DisplayColorSpace = ColorSpace | "hex";

/** Map a display color space to its underlying ColorSpace for computation. */
export function resolveColorSpace(space: DisplayColorSpace): ColorSpace {
    return space === "hex" ? "rgb" : space;
}

export type ColorModel = {
    selectedColorSpace: DisplayColorSpace;
    color: ParsedColorUnit;
    inputColor: string;
    savedColors: ParsedColorUnit[];
};

const DEFAULT_INPUT_COLOR = "lab(92% 88.8 20 / 82.70%)";
const DEFAULT_COLOR_SPACE: ColorSpace = "oklch";

export function createDefaultColorModel(): ColorModel {
    const parsed = parseCSSColor(DEFAULT_INPUT_COLOR);
    const color = colorUnit2(normalizeColorUnit(parsed), DEFAULT_COLOR_SPACE, true, false, false);
    return {
        selectedColorSpace: DEFAULT_COLOR_SPACE,
        color,
        inputColor: DEFAULT_INPUT_COLOR,
        savedColors: [],
    };
}

export const defaultColorModel: ColorModel = createDefaultColorModel();

export const CSS_NATIVE_SPACES: ReadonlySet<string> = new Set([
    "rgb", "hsl", "hwb", "lab", "lch", "oklab", "oklch",
]);

/** Convert a normalized rgb color (components in [0,1]) to a hex string. */
export function colorToHexString(
    color: ParsedColorUnit,
): string {
    const rgb = colorUnit2(color, "rgb", true, false, false);
    const denorm = normalizeColorUnit(rgb, true, false);
    const r = Math.round(denorm.value.r.value);
    const g = Math.round(denorm.value.g.value);
    const b = Math.round(denorm.value.b.value);
    const a = denorm.value.alpha.value / 100; // alpha is denormalized to percentage
    const hex = (v: number) => v.toString(16).padStart(2, "0");
    return `#${hex(r)}${hex(g)}${hex(b)}${a < 1 ? hex(Math.round(a * 255)) : ""}`;
}

export function toCSSColorString(
    color: ParsedColorUnit,
    digits: number = 2,
): string {
    if (CSS_NATIVE_SPACES.has(color.value.colorSpace)) {
        return normalizeColorUnit(color, true, false).value.toFormattedString(digits);
    }
    return colorUnit2(color, "oklch", true, true, false).value.toFormattedString(digits);
}

/** Display names for all selectable color spaces. Defines canonical UI ordering. */
export const DISPLAY_COLOR_SPACE_NAMES: Record<DisplayColorSpace, string> = {
    rgb: "RGB",
    hex: "Hex",
    hsl: "HSL",
    hsv: "HSV",
    hwb: "HWB",
    lab: "Lab",
    lch: "LCh",
    oklab: "OKLab",
    oklch: "OKLCh",
    xyz: "XYZ",
    kelvin: "Kelvin",
    "srgb-linear": "sRGB Linear",
    "display-p3": "Display P3",
    "a98-rgb": "Adobe RGB",
    "prophoto-rgb": "ProPhoto RGB",
    rec2020: "Rec. 2020",
};

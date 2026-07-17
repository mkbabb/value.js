import {
    CSS_PICKER_SPACES,
    PICKER_SPACE_NAMES,
    convertPickerColor,
    parsePickerColor,
    pickerColorToHex,
    serializePickerColor,
    type PickerColor,
    type PickerSpace,
} from "@lib/picker-color";

export { default as ColorPicker } from "./ColorPicker.vue";
export { default as ColorNutritionLabel } from "./display/ColorNutritionLabel.vue";
export type { ActionBarContext } from "@composables/color/keys";
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
export type DisplayColorSpace = PickerSpace | "hex";

/** Map a display color space to its underlying ColorSpace for computation. */
export function resolveColorSpace(space: DisplayColorSpace): PickerSpace {
    return space === "hex" ? "rgb" : space;
}

export type ColorModel = {
    selectedColorSpace: DisplayColorSpace;
    color: PickerColor;
    inputColor: string;
    savedColors: PickerColor[];
};

const DEFAULT_INPUT_COLOR = "lab(92% 88.8 20 / 82.70%)";
const DEFAULT_COLOR_SPACE: PickerSpace = "oklch";

export function createDefaultColorModel(): ColorModel {
    const color = convertPickerColor(parsePickerColor(DEFAULT_INPUT_COLOR), DEFAULT_COLOR_SPACE);
    return {
        selectedColorSpace: DEFAULT_COLOR_SPACE,
        color,
        inputColor: DEFAULT_INPUT_COLOR,
        savedColors: [],
    };
}

export const defaultColorModel: ColorModel = createDefaultColorModel();

export const CSS_NATIVE_SPACES = CSS_PICKER_SPACES;

/** Convert a normalized rgb color (components in [0,1]) to a hex string. */
export function colorToHexString(
    color: PickerColor,
): string {
    return pickerColorToHex(color);
}

export function toCSSColorString(
    color: PickerColor,
    _digits: number = 2,
): string {
    return serializePickerColor(color);
}

/** Display names for all selectable color spaces. Defines canonical UI ordering. */
export const DISPLAY_COLOR_SPACE_NAMES: Record<DisplayColorSpace, string> = {
    ...PICKER_SPACE_NAMES,
    hex: "Hex",
};

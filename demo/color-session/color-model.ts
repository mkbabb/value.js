/**
 * The color-picker DOMAIN model — the specimen/editing-target surface shared by
 * the picker, palettes, workbenches, shell and admin (ARCHITECTURE §1: this is
 * color-session, the product color domain). Lifted out of the picker feature's
 * UI barrel at W43b3 (RF-15): the model is color-session's, not the picker's;
 * the picker now imports its own domain from here.
 */
import {
    convertPickerColor,
    parsePickerColor,
    pickerColorToHex,
    serializePickerColor,
    type PickerColor,
    type PickerSpace,
} from "./picker-color";

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

/* X-W6.f · X:CSS-1 — `DISPLAY_COLOR_SPACE_NAMES` and `CSS_NATIVE_SPACES` are
 * CARVED OUT of this module. The names were half of a catalog whose other half
 * (the facts, the guides) lived in two more files that disagreed with it about
 * which spaces exist — 18 offered, 13 documented, 11 guided. The whole catalog
 * now has ONE home, `./space-catalog`, where a space without its row is a
 * compile error; read a display name through `spaceName(space)` or the entry
 * itself. `CSS_NATIVE_SPACES` was a rename of `CSS_PICKER_SPACES` with no
 * reader at all (adjudicated L-11) and is simply gone. */

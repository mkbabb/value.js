import { toRgba8, type AnyColor } from "@mkbabb/value.js/color";
import {
    convertPickerColor,
    parsePickerColor,
    serializePickerColor,
    type PickerColorIn,
    type PickerSpace,
} from "@lib/picker-color";

/** Parse one concrete CSS color and convert it into the caller's physical space. */
export function parseColorIn<S extends PickerSpace>(source: string, space: S): PickerColorIn<S> {
    return convertPickerColor(parsePickerColor(source), space);
}

/** Project a final color into straight, clipped sRGB bytes. */
export function colorToRgb255(color: AnyColor): readonly [number, number, number] {
    const result = toRgba8(color, { gamut: "clip" });
    if (!result.ok) throw new Error(`Color byte projection failed: ${result.error.code}`);
    return [result.value[0], result.value[1], result.value[2]];
}

/** Serialize a final color, optionally after an explicit output-space conversion. */
export function colorToCss(color: AnyColor, outputSpace?: PickerSpace): string {
    return serializePickerColor(outputSpace ? convertPickerColor(color, outputSpace) : color);
}

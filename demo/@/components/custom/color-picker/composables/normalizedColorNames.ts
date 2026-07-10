import { parseCSSColor } from "@mkbabb/value.js/parsing";
import { COLOR_NAMES } from "@mkbabb/value.js/color";
import { colorUnit2 } from "@mkbabb/value.js/color";

const DIGITS = 2;

/**
 * The built-in CSS `COLOR_NAMES` normalized to XYZ formatted strings, computed
 * once at module load. Consumed by `useColorUrl` (name → URL round-trip) and
 * `useColorNameResolution` (current-color → display name). Relocated here at
 * S.W2 · W2-1 when the former `useColorModel` home was deleted by the pipeline
 * transposition; nothing else lived alongside it.
 */
export const NORMALIZED_COLOR_NAMES: Record<string, string> = Object.entries(
    COLOR_NAMES,
).reduce(
    (acc, [name, color]) => {
        const parsedColor = parseCSSColor(color);
        const xyz = colorUnit2(parsedColor, "xyz", false, false, false);
        acc[name] = xyz.value.toFormattedString(DIGITS);
        return acc;
    },
    {} as Record<string, string>,
);

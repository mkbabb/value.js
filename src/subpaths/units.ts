/**
 * `@mkbabb/value.js/units` — the unit-value subpath (O.W2).
 *
 * INVARIANT (gated by `proof:subpath-budget` C4): parse-that-FREE. After O.W1 S1
 * severed the `units/index.ts:1` re-export from `../parsing/color`, the
 * `src/units/index.ts` barrel itself no longer drags parse-that. However
 * `units/normalize.ts` static-imports `parseCSSValue` (the computed-endpoint
 * resolver re-parses the live box), so this barrel re-exports the parse-that-free
 * core (the classes, constants, low-level utils) directly and leaves the
 * normalize/interpolate surface — which IS parse-that-coupled — to the `.`
 * monolith and the `./parsing` subpath.
 */

// Core unit classes + types
export { ValueUnit, FunctionValue, ValueArray } from "../units";
export type { InterpolatedVar } from "../units";

// Unit constants
export {
    ABSOLUTE_LENGTH_UNITS,
    RELATIVE_LENGTH_UNITS,
    LENGTH_UNITS,
    TIME_UNITS,
    ANGLE_UNITS,
    PERCENTAGE_UNITS,
    FREQUENCY_UNITS,
    RESOLUTION_UNITS,
    FLEX_UNITS,
    COMPUTED_UNITS,
    UNITS,
    FUNCTION_IDENTITY,
} from "../units/constants";
export type { MatrixValues } from "../units/constants";
// STYLE_NAMES — the CSS property-name data table (S.W1 W1-8 data-module split).
export { STYLE_NAMES } from "../units/style-names";

// Unit utilities (parse-that-free leaf)
export {
    isColorUnit,
    functionIdentityValue,
    flattenObject,
    unflattenObject,
    unflattenObjectToString,
    isCSSStyleName,
    unpackMatrixValues,
    convertAbsoluteUnitToPixels,
    convertToPixels,
    convertToMs,
    convertToDegrees,
    convertToHz,
    convertToDPI,
    convert2,
} from "../units/utils";

// The custom color-name registry (parse-that-free)
export {
    registerColorNames,
    clearCustomColorNames,
    getCustomColorNames,
} from "../units/color/color-names";

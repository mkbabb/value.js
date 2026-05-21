// Core unit classes and types
export { ValueUnit, FunctionValue, ValueArray } from "./units";
export type { InterpolatedVar } from "./units";

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
    STYLE_NAMES,
} from "./units/constants";
export type { MatrixValues } from "./units/constants";

// Unit utilities
export {
    isColorUnit,
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
} from "./units/utils";

// Unit normalization
export {
    getComputedValue,
    normalizeNumericUnits,
    normalizeValueUnits,
} from "./units/normalize";
export type { NormalizeValueUnitsOptions } from "./units/normalize";

// Value-level interpolation
export {
    lerpValue,
    lerpComputedValue,
    lerpColorValue,
    lerpNumericValue,
    prepareInterpVar,
} from "./units/interpolate";

// Color classes
export {
    Color,
    RGBColor,
    HSLColor,
    HSVColor,
    HWBColor,
    LABColor,
    LCHColor,
    OKLABColor,
    OKLCHColor,
    XYZColor,
    KelvinColor,
    LinearSRGBColor,
    DisplayP3Color,
    AdobeRGBColor,
    ProPhotoRGBColor,
    Rec2020Color,
} from "./units/color";
export type { ColorSpaceMap } from "./units/color";

// Color constants
export {
    RGBA_MAX,
    ALPHA_RANGE,
    RGB_RANGE,
    UNIT_RANGE,
    HUE_RANGE,
    COLOR_SPACE_RANGES,
    ALPHA_DENORM_UNIT,
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    WHITE_POINT_D65,
    WHITE_POINT_D50,
    WHITE_POINT_D65_D50,
    WHITE_POINT_D50_D65,
    WHITE_POINTS,
    XYZ_TO_LMS_MATRIX,
    LMS_TO_XYZ_MATRIX,
    LMS_TO_OKLAB_MATRIX,
    OKLAB_TO_LMS_MATRIX,
    LMS_TO_LINEAR_SRGB,
    LINEAR_SRGB_TO_LMS,
    OKLAB_TO_LMS_COEFF,
    GAMUT_SECTOR_COEFFICIENTS,
    COLOR_NAMES,
} from "./units/color/constants";
export type { ColorSpace, WhitePoint } from "./units/color/constants";

// Color matrix math
export {
    transformMat3,
    transposeMat3,
    multiplyMat3,
    invertMat3,
} from "./units/color/matrix";
export type { Vec3, Mat3 } from "./units/color/matrix";

// Color conversion utilities — public surface is `color2` + `colorUnit2`.
// The 51 individual `<from>2<to>` helpers remain internal to value.js
// (still imported by `color2`'s dispatch table in `src/units/color/utils.ts`)
// but are NOT exported from the main barrel.
export {
    getFormattedColorSpaceRange,
    color2,
    gamutMap,
    interpolateHue,
    mixColors,
    CYLINDRICAL_HUE_COMPONENT,
    computeSafeAccent,
    safeAccentColor,
    needsContrastAdjustment,
    getOklchLightness,
} from "./units/color/utils";
export type { HueInterpolationMethod } from "./units/color/utils";

// N-color mixing
export { mixColorsN } from "./units/color/mix";

// Color normalization
export {
    normalizeColorUnitComponent,
    normalizeColor,
    normalizeColorUnit,
    colorUnit2,
    normalizeColorUnits,
} from "./units/color/normalize";

// Gamut mapping
export {
    DELTA_E_OK_JND,
    deltaEOK,
    oklabToLinearSRGB,
    isInSRGBGamut,
    computeMaxSaturation,
    findCusp,
    findGamutIntersection,
    gamutMapOKLab,
    srgbToOKLab,
    gamutMapSRGB,
    rawOklabToOklch,
    rawOklchToOklab,
    oklabToRgb255,
} from "./units/color/gamut";

// Math utilities
export {
    clamp,
    scale,
    lerp,
    logerp,
    deCasteljau,
    cubicBezier,
    interpBezier,
    cubicBezierToSVG,
    cubicBezierToString,
} from "./math";

// General utilities
export {
    FRAME_RATE,
    isObject,
    clone,
    arrayEquals,
    sleep,
    waitUntil,
    debounce,
    createHash,
    memoize,
    hyphenToCamelCase,
    camelCaseToHyphen,
    seekPreviousValue,
    requestAnimationFrame,
    cancelAnimationFrame,
} from "./utils";
export type { MemoizeOptions } from "./utils";

// Color filter solver
export { rgb2ColorFilter, cssFiltersToString } from "./units/color/colorFilter";

// Easing / timing functions
export {
    linear, easeInQuad, easeOutQuad, easeInOutQuad,
    easeInCubic, easeOutCubic, easeInOutCubic, smoothStep3,
    CSSCubicBezier, solveCubicBezierX,
    easeInBounce, bounceInEase, bounceInEaseHalf, bounceOutEase,
    bounceOutEaseHalf, bounceInOutEase,
    easeInSine, easeOutSine, easeInOutSine,
    easeInCirc, easeOutCirc, easeInOutCirc,
    easeInExpo, easeOutExpo, easeInOutExpo,
    jumpTerms, steppedEase, stepStart, stepEnd,
    cssLinear, bezierPresets, timingFunctions, timingFunctionDescriptions,
} from "./easing";
export type { LinearStop, TimingFunction } from "./easing";

// Parsing — parsers and parse functions
export {
    CSS_WIDE_KEYWORDS,
    CSSString,
    CSSFunction,
    CSSJSON,
    CSSValues,
    parseCSSValue,
    parseCSSPercent,
    parseCSSTime,
} from "./parsing";

// Stylesheet AST — full CSS at-rule + qualified-rule parsing
export { parseCSSStylesheet } from "./parsing/stylesheet";
export type {
    Stylesheet,
    StylesheetItem,
    KeyframeRule,
    KeyframeSelector,
    Declaration,
    PropertyDescriptor,
} from "./parsing/stylesheet";

// Stylesheet extractors
export {
    extractKeyframes,
    extractProperties,
    extractStyleRules,
    extractAnimationOptions,
} from "./parsing/extract";
export type { CSSAnimationOptions } from "./parsing/extract";

// Animation shorthand parser/serializer
export {
    parseAnimationShorthand,
    reverseAnimationShorthand,
} from "./parsing/animation-shorthand";

// Stylesheet serialiser + Prettier wrapper
export {
    serializeStylesheet,
    serializeStylesheetItem,
    serializeDeclaration,
    serializeKeyframeSelector,
    formatCSS,
    stylesheetToString,
} from "./parsing/serialize";

export {
    CSSValueUnit,
    parseCSSValueUnit,
    reverseCSSTime,
    reverseCSSIterationCount,
} from "./parsing/units";

export { evaluateMathFunction } from "./parsing/math";

export {
    CSSColor,
    parseCSSColor,
    registerColorNames,
    clearCustomColorNames,
    getCustomColorNames,
} from "./parsing/color";

// Parsing utilities
export {
    istring,
    identifier,
    none,
    integer,
    number,
    succeed,
    fail,
    tryParse,
    parseResult,
} from "./parsing/utils";

// Color quantization
export { quantizePixels, dominantColor } from "./quantize";
export type { QuantizeOptions, QuantizedColor } from "./quantize";

// Transform decomposition
export {
    decomposeMatrix2D,
    decomposeMatrix3D,
    recomposeMatrix3D,
    slerp,
    interpolateDecomposed,
} from "./transform/decompose";
export type {
    DecomposedMatrix2D,
    DecomposedMatrix3D,
    Vec4,
    Mat4,
} from "./transform/decompose";

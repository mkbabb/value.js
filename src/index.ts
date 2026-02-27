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
    STRING_UNITS,
    COLOR_UNITS,
    UNITS,
    BLACKLISTED_COALESCE_UNITS,
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

// Color conversion utilities
export {
    getFormattedColorSpaceRange,
    hex2rgb,
    rgb2hex,
    kelvin2rgb,
    rgb2kelvin,
    hsv2hsl,
    hsl2hsv,
    hwb2hsl,
    hsl2hwb,
    rgb2hsl,
    hsl2rgb,
    xyz2lab,
    lab2xyz,
    srgbToLinear,
    linearToSrgb,
    rgb2xyz,
    xyz2rgb,
    lch2lab,
    lab2lch,
    oklab2xyz,
    xyz2oklab,
    oklab2lab,
    lab2oklab,
    oklab2oklch,
    oklch2oklab,
    oklch2lab,
    lab2oklch,
    hsl2xyz,
    xyz2hsl,
    hsv2xyz,
    xyz2hsv,
    hwb2xyz,
    xyz2hwb,
    lch2xyz,
    xyz2lch,
    oklch2xyz,
    xyz2oklch,
    kelvin2xyz,
    xyz2kelvin,
    adobeRgbToLinear,
    linearToAdobeRgb,
    proPhotoToLinear,
    linearToProPhoto,
    rec2020ToLinear,
    linearToRec2020,
    linearSrgb2xyz,
    xyz2linearSrgb,
    displayP32xyz,
    xyz2displayP3,
    adobeRgb2xyz,
    xyz2adobeRgb,
    proPhoto2xyz,
    xyz2proPhoto,
    rec20202xyz,
    xyz2rec2020,
    color2,
    gamutMap,
    interpolateHue,
    mixColors,
    CYLINDRICAL_HUE_COMPONENT,
} from "./units/color/utils";
export type { HueInterpolationMethod } from "./units/color/utils";

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
    CSSCubicBezier,
    easeInBounce, bounceInEase, bounceInEaseHalf, bounceOutEase,
    bounceOutEaseHalf, bounceInOutEase,
    easeInSine, easeOutSine, easeInOutSine,
    easeInCirc, easeOutCirc, easeInOutCirc,
    easeInExpo, easeOutExpo, easeInOutExpo,
    jumpTerms, steppedEase, stepStart, stepEnd,
    bezierPresets, timingFunctions,
} from "./easing";

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

export { CSSValueUnit, parseCSSValueUnit } from "./parsing/units";

export { CSSColor, parseCSSColor } from "./parsing/color";

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

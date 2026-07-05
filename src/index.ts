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
} from "./units/constants";
export type { MatrixValues } from "./units/constants";
// STYLE_NAMES — the CSS property-name data table (S.W1 W1-8 data-module split).
export { STYLE_NAMES } from "./units/style-names";

// Unit utilities
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
} from "./units/utils";
export { FUNCTION_IDENTITY } from "./units/constants";

// Unit normalization
export {
    normalizeNumericUnits,
    normalizeValueUnits,
} from "./units/normalize";
export type { NormalizeValueUnitsOptions } from "./units/normalize";
// Computed-value resolution + its layout-epoch cache (S.W1 W1-8 split →
// units/layout-cache.ts).
export {
    getComputedValue,
    // Computed-endpoint-cache invalidation (Wave C7 + N.W7.B-B3.F1). The single
    // bust for BOTH staleness classes the computed cache (C1) is subject to:
    // (1) layout change — viewport `resize` (auto-installed), a container
    // `ResizeObserver` (consumer-wired), a writing-mode flip; and (2) `var()`
    // custom-property mutation mid-animation (theme/token switch). Auto-installed
    // on `window.resize`; consumers MUST call it manually for container resizes
    // and imperative var() writes. See `bumpLayoutEpoch`'s doc.
    bumpLayoutEpoch,
    getLayoutEpoch,
    // The LRU ceiling for the computed-endpoint memo (N.W7.B-B3.F2).
    COMPUTED_MEMO_MAX_ENTRIES,
} from "./units/layout-cache";

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
    COLOR_SYNTAX_FAMILY,
    COLOR_FUNCTION_FORM,
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
export type {
    ColorSpace,
    WhitePoint,
    ColorSyntaxFamily,
    ColorFunctionForm,
} from "./units/color/constants";

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
// (still imported by `color2`'s dispatch table in `src/units/color/dispatch.ts`)
// but are NOT exported from the main barrel.
export {
    getFormattedColorSpaceRange,
    color2,
    gamutMap,
} from "./units/color/dispatch";
// K-DISP (R.W1.6) — the hue-interpolation + color-mixing cluster now lives in
// its cohesion-honest home, mix.ts (real decomposition of dispatch.ts).
export {
    interpolateHue,
    mixColors,
    // VJ-Q3 (1.2.0) — the `mixColorsInto` out-param twin.
    mixColorsInto,
    cssColorInterpKeyword,
    CYLINDRICAL_HUE_COMPONENT,
} from "./units/color/mix";
export type { HueInterpolationMethod } from "./units/color/mix";
// OKLab contrast helpers — defined in contrast.ts (K.W2e: no longer re-exported
// through dispatch.ts, which kept it over the G3 ≤350 cap).
export {
    computeSafeAccent,
    safeAccentColor,
    // S.W1-6 — the CSS-string accent surface the demo consumes (retires the
    // hand-denorm `C*0.5`/`H*360` blocks in useContrastSafeColor.ts).
    safeAccentCssString,
    needsContrastAdjustment,
    getOklchLightness,
    // VJ-Q1 (1.1.1) — WCAG 2.x relative-luminance + `contrast-color()` leaf.
    wcagRelativeLuminance,
    wcagContrastRatio,
    contrastColor,
} from "./units/color/contrast";

// N-color mixing + the perceptual N-stop ramp sampler (N.W11.D) + the
// single-`t` array-free sampler (VJ-Q3, 1.2.0).
export { mixColorsN, sampleColorRamp, sampleColorRampAt } from "./units/color/mix";
export type { SampleRampOptions } from "./units/color/mix";

// Gamut-boundary sampler (R.W1.5) — the wide-RGB sRGB-excess contour.
export { sampleGamutBoundary, sampleGamutBoundaryInto } from "./units/color/boundary";
export type {
    GamutBoundary,
    GamutBoundaryTarget,
    GamutBoundaryMode,
    SampleGamutBoundaryOptions,
} from "./units/color/boundary";

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

// Perceptual color-difference metrics (R.W1.6 · R-3)
// + ICtCp round-trip (S.W1-6 · Q9): `ictcpToXYZ` is the inverse of `xyzToICtCp`.
export { deltaE2000, deltaEITP, xyzToICtCp, ictcpToXYZ } from "./units/color/difference";
// Jzazbz perceptual transform (S.W1-11 · Q9 widening — net-new PQ-variant math).
export { xyzToJzazbz, jzazbzToXYZ } from "./units/color/conversions/jzazbz";

// OKHSL / OKHSV perceptual pickers (R.W1.6 · R-2)
export {
    okhslToSrgb,
    srgbToOkhsl,
    okhsvToSrgb,
    srgbToOkhsv,
} from "./units/color/okhsl";

// Math utilities
export {
    clamp,
    scale,
    lerp,
    lerpArray,
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
    resolveEasing,
} from "./easing";
export type { LinearStop, TimingFunction } from "./easing";

// Easing parsers (CSS Easing Functions Level 1 + Level 2)
export {
    parseLinearStops, parseSteps, parseSpring, lowerSpringEasing,
    resolveEasingFunction,
} from "./parsing/easing";
export type { JumpTerm, StepsArgs } from "./parsing/easing";

// Parsing — parsers and parse functions
export {
    CSS_WIDE_KEYWORDS,
    CSSString,
    CSSFunction,
    CSSJSON,
    CSSValues,
    parseCSSValue,
    parseCSSSubValue,
    parseCSSPercent,
    parseCSSTime,
} from "./parsing";
export type { ParseCSSSubValueOptions } from "./parsing";

// Stylesheet AST — full CSS at-rule + qualified-rule parsing
export { parseCSSStylesheet } from "./parsing/stylesheet";
export type {
    Stylesheet,
    StylesheetItem,
    KeyframeRule,
    KeyframeSelector,
    Declaration,
    PropertyDescriptor,
    CustomFunctionDescriptor,
    CustomFunctionParameter,
    ScrollTimelineDescriptor,
    ViewTimelineDescriptor,
} from "./parsing/stylesheet";

// Stylesheet extractors
export {
    extractKeyframes,
    extractProperties,
    extractFunctions,
    extractStyleRules,
    extractAnimationOptions,
} from "./parsing/extract";
export type { CSSAnimationOptions } from "./parsing/extract";

// VJ-Q6 (1.2.0) — the `<syntax>` validator on the resolve path (the @function
// typed-arg coercion consumer; kf inlines call args through this, not a re-
// authored checker).
export {
    validateSyntax,
    coerceToSyntax,
    parseSyntaxDescriptor,
} from "./parsing/syntax";
export type { SyntaxComponentName } from "./parsing/syntax";

// Animation shorthand parser/serializer
export {
    parseAnimationShorthand,
    reverseAnimationShorthand,
} from "./parsing/animation-shorthand";

// Scroll-driven-animation VALUE grammar (N.W11′ — the CSSTimelineOptions typed
// extractor + inverse serializer over animation-timeline / -range /
// timeline-scope / animation-trigger)
export {
    parseAnimationTimeline,
    parseAnimationTimelineList,
    parseAnimationRange,
    parseAnimationRangeBoundary,
    parseTimelineScope,
    parseAnimationTrigger,
    extractTimelineOptions,
    extractNamedTimelines,
    serializeAnimationTimeline,
    serializeAnimationRange,
    serializeTimelineScope,
    serializeAnimationTrigger,
    serializeTimelineOptions,
} from "./parsing/scroll-timeline";
export type {
    CSSTimelineOptions,
    NamedTimelineRegistry,
    AnimationTimelineValue,
    AnimationRangeValue,
    AnimationTriggerValue,
    RangeBoundary,
    RangePhase,
    ViewInset,
    TimelineScopeValue,
    ScrollerKeyword,
    TimelineAxis,
    TriggerType,
} from "./parsing/scroll-timeline";

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
export type { ParsedColorUnit } from "./parsing/color";

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
// Structured parse diagnostics (VJ-F2 — the pluggable error sink)
export type { ParseDiagnostic, OnParseError } from "./parsing/utils";

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

// Path-geometry sampler (VJ-F1 — DOM-free getTotalLength / getPointAtLength)
export { PathGeometry, getTotalLength, getPointAtLength } from "./transform/path";
export type { Point, PathSample } from "./transform/path";

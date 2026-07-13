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
    ICtCpColor,
    JzazbzColor,
} from "./units/color";
export type { ColorSpaceMap } from "./units/color";

// Color reference data — ranges/bounds + illuminant white points (T.W1-src §4b:
// constants.ts holds this reference-data concern; the OKLab/LMS transform
// matrices moved to conversions/matrices.ts, GAMUT_SECTOR_COEFFICIENTS to gamut/,
// all still public under the same names below).
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
    // Q15 (T.W1) — per-space component bound + denorm-unit resolvers promoted to
    // first-class API (the demo consumed them off the internal `constants` leaf).
    getColorSpaceBound,
    getColorSpaceDenormUnit,
} from "./units/color/constants";
// The OKLab/LMS transform matrices (T.W1-src §4b: colocated in
// conversions/matrices.ts with their consumers; same public names).
export {
    XYZ_TO_LMS_MATRIX,
    LMS_TO_XYZ_MATRIX,
    LMS_TO_OKLAB_MATRIX,
    OKLAB_TO_LMS_MATRIX,
    LMS_TO_LINEAR_SRGB,
    LINEAR_SRGB_TO_LMS,
    OKLAB_TO_LMS_COEFF,
} from "./units/color/conversions/matrices";
// GAMUT_SECTOR_COEFFICIENTS (T.W1-src §4b: colocated in gamut/ with its consumer).
export { GAMUT_SECTOR_COEFFICIENTS } from "./units/color/gamut";
// COLOR_NAMES — the CSS named-color data table (S.W1 W1-8 lift → color-names.ts).
export { COLOR_NAMES } from "./units/color/color-names";
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
// The individual `<from>2<to>` helpers remain internal to value.js
// (still imported by `color2`'s dispatch table in `src/units/color/dispatch.ts`)
// and are NOT exported from the main barrel — EXCEPT the Q15 (T.W1) promotions
// (`hsl2rgb`/`oklch2xyz`/`xyz2rgb`/`linear2srgb`/`hex2rgb`), which are now
// first-class API beside `color2` (see the Q15 block below).
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
export { sampleGamutBoundary, sampleGamutBoundaryInto } from "./units/color/gamut/boundary";
export type {
    GamutBoundary,
    GamutBoundaryTarget,
    GamutBoundaryMode,
    SampleGamutBoundaryOptions,
} from "./units/color/gamut/boundary";

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
    oklab2linearSrgb,
    // Q15 (T.W1) — the zero-alloc out-param twin (the demo's hot paint paths).
    oklab2linearSrgbInto,
    isInSRGBGamut,
    computeMaxSaturation,
    findCusp,
    findGamutIntersection,
    gamutMapOKLab,
    srgb2oklab,
    gamutMapSRGB,
    rawOklab2oklch,
    rawOklch2oklab,
    oklab2rgb255,
} from "./units/color/gamut";

// Perceptual color-difference metrics (R.W1.6 · R-3)
// + ICtCp round-trip (S.W1-6 · Q9): `rawIctcp2xyz` is the inverse of `rawXyz2ictcp`.
export { deltaE2000, deltaEITP, rawXyz2ictcp, rawIctcp2xyz } from "./units/color/difference";
// Jzazbz perceptual transform (S.W1-11 · Q9 widening — net-new PQ-variant math).
export { rawXyz2jzazbz, rawJzazbz2xyz } from "./units/color/conversions/jzazbz";

// Q15 (T.W1) — the 5 conversion primitives the demo consumed off the internal
// `conversions/` leaves, promoted to first-class API (see the block comment
// above). Parse-that-free; the demo now dogfoods these off `@mkbabb/value.js`
// / `@mkbabb/value.js/color` instead of white-boxing `conversions/`.
export { hsl2rgb } from "./units/color/conversions/cylindrical";
export { oklch2xyz } from "./units/color/conversions/oklab";
export { xyz2rgb } from "./units/color/conversions/xyz-extended";
export { linear2srgb } from "./units/color/conversions/transfer";
export { hex2rgb } from "./units/color/conversions/hex";

// OKHSL / OKHSV perceptual pickers (R.W1.6 · R-2)
export {
    okhsl2srgb,
    srgb2okhsl,
    okhsv2srgb,
    srgb2okhsv,
} from "./units/color/gamut/okhsl";

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
} from "./parsing/timeline/easing";
export type { JumpTerm, StepsArgs } from "./parsing/timeline/easing";

// Parsing — parsers and parse functions
export {
    CSS_WIDE_KEYWORDS,
    CSSString,
    CSSFunction,
    CSSJSON,
    CSSValues,
    parseCSSValue,
    parseCSSValues,
    CSSParseError,
    parseCSSPercent,
    parseCSSTime,
} from "./parsing";
export type { ParseCSSValuesOptions } from "./parsing";

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
} from "./parsing/stylesheet/extract";
export type { CSSAnimationOptions } from "./parsing/stylesheet/extract";

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
} from "./parsing/timeline/scroll-timeline";
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
} from "./parsing/timeline/scroll-timeline";

// Stylesheet serialiser + Prettier wrapper
export {
    serializeStylesheet,
    serializeStylesheetItem,
    serializeDeclaration,
    serializeKeyframeSelector,
    formatCSS,
    stylesheetToString,
} from "./parsing/stylesheet/serialize";

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

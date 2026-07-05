/**
 * `@mkbabb/value.js/color` — the parse-that-ZERO color subpath (O.W2).
 *
 * INVARIANT (gated by `proof:subpath-budget`): this barrel MUST NOT import,
 * directly or transitively, from `src/parsing/` or `@mkbabb/parse-that`. It
 * composes ONLY from `src/units/color/*` (the color classes, conversions, gamut,
 * mixing, contrast, filter, the color-name registry) and `src/math.ts` (pure
 * numeric helpers the color math rides). It deliberately does NOT re-export
 * through `src/units/index.ts`, because that barrel pulls `units/normalize.ts`
 * which static-imports `parseCSSValue` from `../parsing` — re-exporting through
 * it would drag the entire @keyframes grammar back into the color chunk.
 *
 * A consumer importing only `@mkbabb/value.js/color` sheds the full CSS grammar
 * + parse-that — the headline tree-shake win of the subpath split.
 */

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
} from "../units/color";
export type { ColorSpaceMap } from "../units/color";

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
} from "../units/color/constants";
export type {
    ColorSpace,
    WhitePoint,
    ColorSyntaxFamily,
    ColorFunctionForm,
} from "../units/color/constants";

// Color matrix math
export {
    transformMat3,
    transposeMat3,
    multiplyMat3,
    invertMat3,
} from "../units/color/matrix";
export type { Vec3, Mat3 } from "../units/color/matrix";

// Color conversion / dispatch
export {
    getFormattedColorSpaceRange,
    color2,
    gamutMap,
} from "../units/color/dispatch";
// K-DISP (R.W1.6) — the hue/mix cluster now lives in mix.ts.
export {
    interpolateHue,
    mixColors,
    mixColorsInto,
    cssColorInterpKeyword,
    CYLINDRICAL_HUE_COMPONENT,
} from "../units/color/mix";
export type { HueInterpolationMethod } from "../units/color/mix";

// OKLab contrast helpers + the VJ-Q1 (1.1.1) WCAG `contrast-color()` leaf.
export {
    computeSafeAccent,
    safeAccentColor,
    // S.W1-6 — the CSS-string accent surface the demo consumes.
    safeAccentCssString,
    needsContrastAdjustment,
    getOklchLightness,
    wcagRelativeLuminance,
    wcagContrastRatio,
    contrastColor,
} from "../units/color/contrast";

// N-color mixing + the perceptual N-stop ramp sampler + the single-`t` sampler.
export { mixColorsN, sampleColorRamp, sampleColorRampAt } from "../units/color/mix";
export type { SampleRampOptions } from "../units/color/mix";

// Gamut-boundary sampler (R.W1.5) — the wide-RGB sRGB-excess contour.
export { sampleGamutBoundary, sampleGamutBoundaryInto } from "../units/color/boundary";
export type {
    GamutBoundary,
    GamutBoundaryTarget,
    GamutBoundaryMode,
    SampleGamutBoundaryOptions,
} from "../units/color/boundary";
// OKLCh slice boundary (S.W1-6) — the L×C sRGB cusp polyline (S.W5-8 consumes).
export {
    sampleOKLChSliceBoundary,
    sampleOKLChSliceBoundaryInto,
} from "../units/color/boundary";
export type { OKLChSliceBoundary } from "../units/color/boundary";

// Color normalization
export {
    normalizeColorUnitComponent,
    normalizeColor,
    normalizeColorUnit,
    colorUnit2,
    normalizeColorUnits,
} from "../units/color/normalize";

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
} from "../units/color/gamut";

// Perceptual color-difference metrics (R.W1.6 · R-3)
export { deltaE2000, deltaEITP, xyzToICtCp } from "../units/color/difference";

// OKHSL / OKHSV perceptual pickers (R.W1.6 · R-2)
export {
    okhslToSrgb,
    srgbToOkhsl,
    okhsvToSrgb,
    srgbToOkhsv,
} from "../units/color/okhsl";

// Color filter solver
export { rgb2ColorFilter, cssFiltersToString } from "../units/color/colorFilter";

// The runtime custom color-name registry (parse-that-free home — O.W1 S1)
export {
    registerColorNames,
    clearCustomColorNames,
    getCustomColorNames,
} from "../units/color/color-names";

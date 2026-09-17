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
    // U-F22 (U.W-CANON) — the two perceptual-difference spaces (S.W1 additions)
    // were in the root barrel but drifted out of this /color subpath. Restored
    // ADDITIVELY; they come from the same `../units/color` module this barrel
    // already imports, so the parse-that-FREE subpath-budget invariant holds.
    ICtCpColor,
    JzazbzColor,
} from "../units/color";
export type { ColorSpaceMap } from "../units/color";

// Color reference data — ranges/bounds + illuminant white points (T.W1-src §4b
// split; the moved OKLab/LMS transform matrices + gamut coefficients re-export
// below under the same names, all parse-that-FREE — the subpath-budget invariant
// holds).
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
    // Q15 (T.W1) — the per-space component bound + denorm-unit resolvers,
    // promoted to citizenship on the color subpath. The demo's readout
    // reservation, slider-gradient, and view-accent paths consumed these off the
    // internal `constants` leaf; they are genuine public metadata API (the same
    // class as COLOR_SPACE_RANGES beside them), not a color2()-able detour.
    getColorSpaceBound,
    getColorSpaceDenormUnit,
} from "../units/color/constants";
export {
    XYZ_TO_LMS_MATRIX,
    LMS_TO_XYZ_MATRIX,
    LMS_TO_OKLAB_MATRIX,
    OKLAB_TO_LMS_MATRIX,
    LMS_TO_LINEAR_SRGB,
    LINEAR_SRGB_TO_LMS,
    OKLAB_TO_LMS_COEFF,
} from "../units/color/conversions/matrices";
export { GAMUT_SECTOR_COEFFICIENTS } from "../units/color/gamut";
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
    // VJ-U-F26 — the WCAG-ratio accent re-guard against a SURFACE COLOR (the
    // rendered-tier referent the demo accent pipeline consumes).
    safeAccentAgainstSurface,
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
export { sampleGamutBoundary, sampleGamutBoundaryInto } from "../units/color/gamut/boundary";
export type {
    GamutBoundary,
    GamutBoundaryTarget,
    GamutBoundaryMode,
    SampleGamutBoundaryOptions,
} from "../units/color/gamut/boundary";
// OKLCh slice boundary (S.W1-6) — the L×C sRGB cusp polyline (S.W5-8 consumes) +
// the hue-swept envelope (T-21 · T.W1-src — the gradient instrument's src half).
export {
    sampleOKLChSliceBoundary,
    sampleOKLChSliceBoundaryInto,
    sampleOKLChHueSweepBoundary,
    sampleOKLChHueSweepBoundaryInto,
} from "../units/color/gamut/boundary";
export type {
    OKLChSliceBoundary,
    OKLChHueSweepBoundary,
} from "../units/color/gamut/boundary";

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
    oklab2linearSrgb,
    // Q15 (T.W1) — the zero-alloc out-param twin (the demo's hot per-pixel paint
    // paths call this instead of the allocating `oklab2linearSrgb`).
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
} from "../units/color/gamut";
// Raytrace gamut map (S.W1-10 · R-4) — the EXACT-boundary reference twin of the
// analytical map above (validation surface; agrees within ΔE-OK < 1e-3, lands
// strictly on the sRGB surface where the analytical leaves a ~1e-4 residual).
export {
    gamutMapOKLabRaytrace,
    gamutMapSRGBRaytrace,
} from "../units/color/gamut/raytrace";

// Perceptual color-difference metrics (R.W1.6 · R-3) + ICtCp round-trip
// (S.W1-6 · Q9: rawIctcp2xyz inverse) + Jzazbz transform (S.W1-11 · Q9 widening).
export { deltaE2000, deltaEITP, rawXyz2ictcp, rawIctcp2xyz } from "../units/color/difference";
export { rawXyz2jzazbz, rawJzazbz2xyz } from "../units/color/conversions/jzazbz";

// Q15 (T.W1) — the 5 conversion primitives the demo consumed off the internal
// `conversions/` leaves (gamut-overlay `hsl2rgb`, generation `oklch2xyz`+
// `xyz2rgb`, perceived-space `linear2srgb`, search `hex2rgb`). Promoted to
// first-class color-subpath API so the demo dogfoods the published surface
// rather than white-boxing the raw matrix chain. All parse-that-free.
export { hsl2rgb } from "../units/color/conversions/cylindrical";
export { oklch2xyz } from "../units/color/conversions/oklab";
export { xyz2rgb } from "../units/color/conversions/xyz-extended";
export { linear2srgb } from "../units/color/conversions/transfer";
export { hex2rgb } from "../units/color/conversions/hex";

// OKHSL / OKHSV perceptual pickers (R.W1.6 · R-2)
export {
    okhsl2srgb,
    srgb2okhsl,
    okhsv2srgb,
    srgb2okhsv,
} from "../units/color/gamut/okhsl";

// Color filter solver
export { rgb2ColorFilter, cssFiltersToString } from "../units/color/colorFilter";

// The color-name data table + the runtime custom-name registry (parse-that-free
// home — O.W1 S1; COLOR_NAMES joined it in S.W1 W1-8's data lift).
export {
    COLOR_NAMES,
    registerColorNames,
    clearCustomColorNames,
    getCustomColorNames,
} from "../units/color/color-names";

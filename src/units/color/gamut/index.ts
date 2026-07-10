// The gamut-family barrel (T.W1-src §4a — name-preserving; the `units/color/gamut`
// specifier's stable home).
//
// One cohesive concern (Ottosson cusp / max-saturation math) is now colocated in
// `gamut/`: `gamut.ts` (analytical sRGB map — the head), its exact-boundary twin
// `raytrace.ts`, the sRGB-excess/OKLCh-slice `boundary.ts`, and the `okhsl.ts`
// pickers that reuse the cusp math (the DIRECTORY expresses the family; each leaf
// is reachable at `units/color/gamut/{raytrace,boundary,okhsl}`).
//
// This barrel re-exports the `gamut.ts` head ONLY — the exact surface the old
// `units/color/gamut` FILE presented (incl. the internal `oklchToXYZTuple` /
// `GAMUT_ALPHA` that `dispatch.ts` reaches via `./gamut`), so the specifier is
// byte-stable AND the module graph is unchanged. It deliberately does NOT
// eager-aggregate `boundary.ts` (whose top-level `TARGETS` matrix math cycles
// through `conversions/xyz-extended → dispatch`): pulling that into every
// `gamut`-specifier importer's init would reorder the cycle and undefine the
// matrices. Consumers of the other leaves import them by their leaf path. Named
// re-exports only (never `export *`, PI-6).
export {
    GAMUT_SECTOR_COEFFICIENTS,
    DELTA_E_OK_JND,
    deltaEOK,
    oklabToLinearSRGB,
    isInSRGBGamut,
    computeMaxSaturation,
    findCusp,
    findGamutIntersection,
    GAMUT_ALPHA,
    gamutMapOKLab,
    oklabToLinearSRGBInto,
    srgbToOKLabInto,
    gamutMapOKLabInto,
    srgbToOKLab,
    gamutMapSRGB,
    rawOklabToOklch,
    rawOklchToOklab,
    oklabToRgb255,
    oklchToXYZTuple,
} from "./gamut";

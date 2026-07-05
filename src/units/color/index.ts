// ──────────────────────────────────────────────────────────────────────────────
// Color-subsystem barrel — the public + internal import surface.
//
// S.W1 W1-8 (god-module split): `index.ts` (968 LoC) decomposed into
// `serialize.ts` (apply-path serializers), `base.ts` (the `Color<T>` base class
// + `ColorChannel` brand + `ch`/`channelOf`/`setChannel` accessors), and
// `spaces.ts` (the 15 space subclasses + `ColorSpaceMap`). This barrel re-exports
// them all — mirroring the G.W1 Lane B `conversions/` split one level down — so
// every consumer's `import { Color, ch, RGBColor, … } from "."` is unchanged.
// (Base could not stay declared IN this barrel: a module that both declares
// `Color` and re-exports the subclass module that `extends` it TDZs at eval —
// see base.ts's header. The barrel role is preserved; only the declaration moved
// one file down.)
// ──────────────────────────────────────────────────────────────────────────────

// Base class + brand + typed channel accessors.
export { Color, ch, channelOf, setChannel } from "./base";
export type { ColorChannel } from "./base";

// The 15 color-space subclasses + the discriminated-union map.
export {
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
} from "./spaces";
export type { ColorSpaceMap } from "./spaces";

// ── Conversion dispatch + interpolation + contrast surface ──
// G.W1 Lane B (G3): the former `color/utils.ts` god-module was split into
// `conversions/{hex,kelvin,cylindrical,lab,transfer,xyz-extended}.ts` +
// `dispatch.ts`. These re-exports keep consumers depending on the subsystem,
// not the internal module layout.
export {
    getFormattedColorSpaceRange,
    color2,
    color2Into,
    gamutMap,
    hex2rgb,
    rgb2hex,
} from "./dispatch";
// K-DISP (R.W1.6) — the hue/mix cluster is now sourced from mix.ts.
export {
    interpolateHue,
    mixColors,
    cssColorInterpKeyword,
    CYLINDRICAL_HUE_COMPONENT,
} from "./mix";
export type { HueInterpolationMethod } from "./mix";
// OKLab contrast helpers — sourced directly from contrast.ts (K.W2e).
export {
    computeSafeAccent,
    safeAccentColor,
    needsContrastAdjustment,
    getOklchLightness,
    // VJ-Q1 (1.1.1) — WCAG 2.x relative-luminance + `contrast-color()` leaf.
    wcagRelativeLuminance,
    wcagContrastRatio,
    contrastColor,
} from "./contrast";

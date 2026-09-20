/**
 * The colour area barrel — the ONE place `src/color/`'s public/internal line
 * is drawn (PSL-1). `src/subpaths/color.ts` forwards this file whole, so a
 * name listed here is published on `@mkbabb/value.js/color` and a name left
 * out is not; there is no second list to keep in step.
 *
 * `./model` is reachable from inside `src/color/` only (G17 · LIB-04):
 * `anchors.ts` and `operations.ts` keep their relative `./model` imports
 * because routing them through this barrel would cycle, and every module
 * OUTSIDE `src/color/` comes here instead. `isAnyColor` is listed for that
 * reason — `src/css/grammar.ts:326` guards `serializeCssColor` with it, and
 * at X-W9.d that import moved off `./model` and onto this barrel.
 */
export type {
    Alpha,
    AnyColor,
    Channel,
    ChannelsBySpace,
    Color,
    ColorFactory,
    ColorIssue,
    HueInterpolationMethod,
    RGBA8,
    RgbGamut,
    SpaceId,
} from "./model";
export {
    a98Rgb,
    displayP3,
    hsl,
    hsv,
    hwb,
    ictcp,
    isAnyColor,
    jzazbz,
    kelvin,
    lab,
    lch,
    linearSrgb,
    oklab,
    oklch,
    prophotoRgb,
    rec2020,
    rgb,
    xyz,
} from "./model";
export {
    convertColor,
    interpolateHue,
    mapColorToGamut,
    mixColors,
    mixColorsInto,
    safeAccentColor,
    sampleColorRamp,
    toHex,
    toRgba8,
    toRgba8Into,
} from "./operations";
export type { Result } from "../foundation/result";

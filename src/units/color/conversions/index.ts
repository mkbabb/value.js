/**
 * Conversion-module aggregate barrel.
 *
 * Re-exports every `{from}2{to}` conversion function from the 6 focused
 * conversion modules. Consumers that need a single conversion import the
 * specific module directly; this barrel exists for namespace-style access
 * (`import * as Conversions`) where the `{from}2{to}` name is computed.
 *
 * G.W1 Lane B — created with the `src/units/color/utils.ts` G3 decomposition.
 */

export { hex2rgb, rgb2hex } from "./hex";
export { kelvin2rgb, rgb2kelvin, kelvin2xyz, xyz2kelvin } from "./kelvin";
export {
    hsv2hsl,
    hsl2hsv,
    hwb2hsl,
    hsl2hwb,
    rgb2hsl,
    hsl2rgb,
    hsl2xyz,
    xyz2hsl,
    hsv2xyz,
    xyz2hsv,
    hwb2xyz,
    xyz2hwb,
} from "./cylindrical";
export {
    xyz2lab,
    lab2xyz,
    lch2lab,
    lab2lch,
    lch2xyz,
    xyz2lch,
} from "./lab";
export {
    oklab2xyz,
    xyz2oklab,
    oklab2lab,
    lab2oklab,
    oklab2oklch,
    oklch2oklab,
    oklch2lab,
    lab2oklch,
    oklch2xyz,
    xyz2oklch,
} from "./oklab";
export {
    srgbToLinear,
    linearToSrgb,
    adobeRgbToLinear,
    linearToAdobeRgb,
    proPhotoToLinear,
    linearToProPhoto,
    rec2020ToLinear,
    linearToRec2020,
} from "./transfer";
export {
    rgb2xyz,
    xyz2rgb,
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
} from "./xyz-extended";
// HDR perceptual spaces — the `color2()`-dispatch Color wrappers (S.W1
// remediation, 3.1.0). The raw `[number,number,number]` transforms live in
// `../difference` (ICtCp) + `./jzazbz` (Jzazbz).
export { xyz2ictcp, ictcp2xyz } from "./ictcp";
export { xyz2jzazbz, jzazbz2xyz } from "./jzazbz";

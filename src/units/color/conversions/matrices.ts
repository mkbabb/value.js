// The OKLab / LMS transform matrices — the conversion machinery for the
// XYZ↔LMS↔OKLab↔linear-sRGB chains.
//
// T.W1-src §4b: lifted verbatim out of the color/constants.ts god-table and
// colocated here with their consumers (`conversions/{oklab,direct}.ts` + the
// `gamut/` family). The illuminant white points stay in `constants.ts` as
// broadly-shared colorimetric reference data. The public barrels re-export every
// symbol below UNDER THE SAME NAME, so the move is semver-free.
import type { Vec3, Mat3 } from "../matrix";
import { invertMat3 } from "../matrix";

// OKLab LMS matrices (moved from utils.ts for shared access)
export const XYZ_TO_LMS_MATRIX: Mat3 = [
    0.819022437996703, 0.3619062600528904, -0.1288737815209879,
    0.0329836539323885, 0.9292868615863434, 0.0361446663506424,
    0.0481771893596242, 0.2642395317527308, 0.6335478284694309,
];

export const LMS_TO_XYZ_MATRIX: Mat3 = invertMat3(XYZ_TO_LMS_MATRIX);

export const LMS_TO_OKLAB_MATRIX: Mat3 = [
    0.210454268309314, 0.7936177747023054, -0.0040720430116193,
    1.9779985324311684, -2.4285922420485799, 0.450593709617411,
    0.0259040424655478, 0.7827717124575296, -0.8086757549230774,
];

export const OKLAB_TO_LMS_MATRIX: Mat3 = invertMat3(LMS_TO_OKLAB_MATRIX);

// Direct LMS→linear sRGB matrix (Ottosson's canonical values, bypasses XYZ)
export const LMS_TO_LINEAR_SRGB: Mat3 = [
    +4.0767416621, -3.3077115913, +0.2309699292,
    -1.2684380046, +2.6097574011, -0.3413193965,
    -0.0041960863, -0.7034186147, +1.7076147010,
];

// Direct linear sRGB→LMS matrix (Ottosson's canonical values)
export const LINEAR_SRGB_TO_LMS: Mat3 = [
    0.4122214708, 0.5363325363, 0.0514459929,
    0.2119034982, 0.6806995451, 0.1073969566,
    0.0883024619, 0.2817188376, 0.6299787005,
];

// OKLab→LMS coefficients (rows of OKLAB_TO_LMS used in the direct path)
export const OKLAB_TO_LMS_COEFF = {
    l: [1.0, +0.3963377774, +0.2158037573] as Vec3,
    m: [1.0, -0.1055613458, -0.0638541728] as Vec3,
    s: [1.0, -0.0894841775, -1.2914855480] as Vec3,
} as const;

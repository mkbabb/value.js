import type { ChannelsBySpace, SpaceId } from "./model";

type Vec3 = readonly [number, number, number];
type Mat3 = readonly [number, number, number, number, number, number, number, number, number];
type NumericChannels<S extends SpaceId> = ChannelsBySpace[S] extends readonly (infer _T)[]
    ? readonly number[]
    : never;
type Anchor<S extends SpaceId> = Readonly<{
    toXYZ: (channels: NumericChannels<S>) => Vec3;
    fromXYZ: (xyz: Vec3) => readonly number[];
}>;

const multiply = ([x, y, z]: Vec3, m: Mat3): Vec3 => [
    m[0] * x + m[1] * y + m[2] * z,
    m[3] * x + m[4] * y + m[5] * z,
    m[6] * x + m[7] * y + m[8] * z,
];

function invert(m: Mat3): Mat3 {
    const a = m[0], b = m[1], c = m[2];
    const d = m[3], e = m[4], f = m[5];
    const g = m[6], h = m[7], i = m[8];
    const A = e * i - f * h;
    const B = c * h - b * i;
    const C = b * f - c * e;
    const D = f * g - d * i;
    const E = a * i - c * g;
    const F = c * d - a * f;
    const G = d * h - e * g;
    const H = b * g - a * h;
    const I = a * e - b * d;
    const determinant = a * A + b * D + c * G;
    return [A, B, C, D, E, F, G, H, I].map((v) => v / determinant) as unknown as Mat3;
}

const RGB_TO_XYZ: Mat3 = [
    0.41239079926595934, 0.357584339383878, 0.1804807884018343,
    0.21263900587151027, 0.715168678767756, 0.07219231536073371,
    0.01933081871559182, 0.11919477979462598, 0.9505321522496607,
];
const XYZ_TO_RGB: Mat3 = [
    3.2409699419045226, -1.537383177570094, -0.4986107602930034,
    -0.9692436362808796, 1.8759675015077202, 0.04155505740717559,
    0.05563007969699366, -0.20397695888897652, 1.0569715142428786,
];
const P3_TO_XYZ: Mat3 = [
    0.4865709486482162, 0.26566769316909306, 0.1982172852343625,
    0.22897456406974884, 0.6917385218365064, 0.079286914093745,
    0, 0.04511338185890264, 1.043944368900976,
];
const XYZ_TO_P3 = invert(P3_TO_XYZ);
const A98_TO_XYZ: Mat3 = [
    0.5766690429101305, 0.1855582379065463, 0.1882286462349947,
    0.29734497525053605, 0.6273635662554661, 0.07529145849399788,
    0.02703136138641234, 0.07068885253582723, 0.9913375368376388,
];
const XYZ_TO_A98 = invert(A98_TO_XYZ);
const PROPHOTO_TO_XYZ_D50: Mat3 = [
    0.7977666449006423, 0.13518129740053308, 0.0313477341283922,
    0.2880748288194013, 0.711835234241873, 0.00008993693872564,
    0, 0, 0.8251046025104601,
];
const XYZ_D50_TO_PROPHOTO: Mat3 = [
    1.34578688164715854, -0.255572087379794644, -0.0511018649755452734,
    -0.544630705124901970, 1.50824774284514707, 0.0205274474364214067,
    0, 0, 1.21196754563894560,
];
const D50_TO_D65: Mat3 = [
    0.95547342148807501, -0.023098454948764641, 0.063259243200570692,
    -0.028369709333863888, 1.0099953980813041, 0.021041441191917334,
    0.012314014864481979, -0.020507649298898967, 1.3303659262421239,
];
const D65_TO_D50: Mat3 = [
    1.0479297925449969, 0.022946870601609652, -0.05019226628920524,
    0.02962780877005599, 0.9904344267538799, -0.017073799063418826,
    -0.009243040646204504, 0.015055191490298152, 0.7518742814281371,
];

export const adaptXyzD50ToD65 = (xyz: readonly [number, number, number]): readonly [number, number, number] =>
    multiply(xyz, D50_TO_D65);
const REC2020_TO_XYZ: Mat3 = [
    0.6369580483012914, 0.14461690358620832, 0.1688809751641721,
    0.2627002120112671, 0.6779980715188708, 0.05930171646986196,
    0, 0.028072693049087428, 1.0609850577107909,
];
const XYZ_TO_REC2020: Mat3 = [
    1.7166511879712671, -0.35567078377639227, -0.25336628137365974,
    -0.66668435183248909, 1.6164812366349393, 0.015768545813911149,
    0.017639857445310866, -0.042770613257808537, 0.94210312123547368,
];

const signPow = (value: number, exponent: number) => Math.sign(value) * Math.abs(value) ** exponent;
const srgbDecode = (encoded: number) => {
    const value = Math.abs(encoded);
    const decoded = value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    return Math.sign(encoded) * decoded;
};
const srgbEncode = (linear: number) => {
    const value = Math.abs(linear);
    const encoded = value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
    return Math.sign(linear) * encoded;
};
const a98Decode = (encoded: number) => signPow(encoded, 563 / 256);
const a98Encode = (linear: number) => signPow(linear, 256 / 563);
const prophotoDecode = (encoded: number) => {
    const value = Math.abs(encoded);
    return Math.sign(encoded) * (value <= 1 / 32 ? value / 16 : value ** 1.8);
};
const prophotoEncode = (linear: number) => {
    const value = Math.abs(linear);
    return Math.sign(linear) * (value < 1 / 512 ? 16 * value : value ** (1 / 1.8));
};
const rec2020Decode = (encoded: number) => signPow(encoded, 2.4);
const rec2020Encode = (linear: number) => signPow(linear, 1 / 2.4);

function rgbFamilyToXyz(channels: readonly number[], matrix: Mat3, decode: (value: number) => number): Vec3 {
    return multiply([decode(channels[0]!), decode(channels[1]!), decode(channels[2]!)], matrix);
}
function xyzToRgbFamily(xyz: Vec3, matrix: Mat3, encode: (value: number) => number): readonly number[] {
    return multiply(xyz, matrix).map(encode);
}

const wrapHue = (degrees: number) => ((degrees % 360) + 360) % 360;
function hueToRgb(hue: number): Vec3 {
    const h = wrapHue(hue) / 60;
    const x = 1 - Math.abs((h % 2) - 1);
    if (h < 1) return [1, x, 0];
    if (h < 2) return [x, 1, 0];
    if (h < 3) return [0, 1, x];
    if (h < 4) return [0, x, 1];
    if (h < 5) return [x, 0, 1];
    return [1, 0, x];
}
function hslToEncoded([h, s, l]: Vec3): Vec3 {
    const chroma = (1 - Math.abs(2 * l - 1)) * s;
    const base = hueToRgb(h);
    const m = l - chroma / 2;
    return [base[0] * chroma + m, base[1] * chroma + m, base[2] * chroma + m];
}
function hsvToEncoded([h, s, v]: Vec3): Vec3 {
    const chroma = v * s;
    const base = hueToRgb(h);
    const m = v - chroma;
    return [base[0] * chroma + m, base[1] * chroma + m, base[2] * chroma + m];
}
function hwbToEncoded([h, w, b]: Vec3): Vec3 {
    if (w + b >= 1) {
        const gray = w / (w + b);
        return [gray, gray, gray];
    }
    const base = hueToRgb(h);
    const span = 1 - w - b;
    return [base[0] * span + w, base[1] * span + w, base[2] * span + w];
}
function encodedToHsv([r, g, b]: Vec3): readonly [number, number, number] {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let hue = 0;
    if (delta !== 0) {
        if (max === r) hue = 60 * (((g - b) / delta) % 6);
        else if (max === g) hue = 60 * ((b - r) / delta + 2);
        else hue = 60 * ((r - g) / delta + 4);
    }
    return [wrapHue(hue), max === 0 ? 0 : delta / max, max];
}
function encodedToHsl(rgb: Vec3): readonly [number, number, number] {
    const hsv = encodedToHsv(rgb);
    const max = Math.max(...rgb);
    const min = Math.min(...rgb);
    const lightness = (max + min) / 2;
    const delta = max - min;
    return [hsv[0], delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1)), lightness];
}
function encodedToHwb(rgb: Vec3): readonly [number, number, number] {
    return [encodedToHsv(rgb)[0], Math.min(...rgb), 1 - Math.max(...rgb)];
}

const LAB_WHITE: Vec3 = [0.9642956764295677, 1, 0.8251046025104601];
const EPSILON = 216 / 24389;
const KAPPA = 24389 / 27;
const labForward = (value: number) => value > EPSILON ? Math.cbrt(value) : (KAPPA * value + 16) / 116;
const labInverse = (value: number) => value ** 3 > EPSILON ? value ** 3 : (116 * value - 16) / KAPPA;
function labToXyzD50([l, a, b]: Vec3): Vec3 {
    const fy = (l + 16) / 116;
    return [
        LAB_WHITE[0] * labInverse(fy + a / 500),
        LAB_WHITE[1] * labInverse(fy),
        LAB_WHITE[2] * labInverse(fy - b / 200),
    ];
}
function xyzD50ToLab(xyz: Vec3): readonly number[] {
    const fx = labForward(xyz[0] / LAB_WHITE[0]);
    const fy = labForward(xyz[1] / LAB_WHITE[1]);
    const fz = labForward(xyz[2] / LAB_WHITE[2]);
    return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}
function polarToRect([l, c, h]: Vec3): Vec3 {
    const radians = h * Math.PI / 180;
    return [l, c * Math.cos(radians), c * Math.sin(radians)];
}
function rectToPolar([l, a, b]: Vec3): readonly number[] {
    return [l, Math.hypot(a, b), wrapHue(Math.atan2(b, a) * 180 / Math.PI)];
}

const XYZ_TO_LMS_OKLAB: Mat3 = [
    0.819022437996703, 0.3619062600528904, -0.1288737815209879,
    0.0329836539323885, 0.9292868615863434, 0.0361446663506424,
    0.0481771893596242, 0.2642395317527308, 0.6335478284694309,
];
const LMS_TO_XYZ_OKLAB = invert(XYZ_TO_LMS_OKLAB);
const LMS_TO_OKLAB: Mat3 = [
    0.210454268309314, 0.7936177747023054, -0.0040720430116193,
    1.9779985324311684, -2.4285922420485799, 0.450593709617411,
    0.0259040424655478, 0.7827717124575296, -0.8086757549230774,
];
const OKLAB_TO_LMS = invert(LMS_TO_OKLAB);
function xyzToOklab(xyz: Vec3): Vec3 {
    return multiply(multiply(xyz, XYZ_TO_LMS_OKLAB).map(Math.cbrt) as unknown as Vec3, LMS_TO_OKLAB);
}
function oklabToXyz(oklab: Vec3): Vec3 {
    return multiply(multiply(oklab, OKLAB_TO_LMS).map((value) => value ** 3) as unknown as Vec3, LMS_TO_XYZ_OKLAB);
}

const ITP_YW = 203;
const PQ_M1 = 0.1593017578125;
const PQ_M2 = 78.84375;
const PQ_C1 = 0.8359375;
const PQ_C2 = 18.8515625;
const PQ_C3 = 18.6875;
const XYZ_TO_LMS_ICTCP: Mat3 = [
    0.3592832590121217, 0.6976051147779502, -0.0358915932320289,
    -0.1920808463704995, 1.1004767970374323, 0.0753748658519118,
    0.0070797844607477, 0.0748396662186366, 0.8433265453898765,
];
const LMS_TO_XYZ_ICTCP = invert(XYZ_TO_LMS_ICTCP);
const LMSP_TO_ICTCP: Mat3 = [
    0.5, 0.5, 0,
    1.61376953125, -3.323486328125, 1.709716796875,
    4.378173828125, -4.24560546875, -0.132568359375,
];
const ICTCP_TO_LMSP = invert(LMSP_TO_ICTCP);
const pqEncode = (value: number) => {
    const c = (Math.max(value, 0) / 1e4) ** PQ_M1;
    return ((PQ_C1 + PQ_C2 * c) / (1 + PQ_C3 * c)) ** PQ_M2;
};
const pqDecode = (value: number) => {
    const p = Math.max(value, 0) ** (1 / PQ_M2);
    return 1e4 * (Math.max(p - PQ_C1, 0) / (PQ_C2 - PQ_C3 * p)) ** (1 / PQ_M1);
};
function xyzToIctcp(xyz: Vec3): Vec3 {
    const lms = multiply(xyz.map((v) => Math.max(v * ITP_YW, 0)) as unknown as Vec3, XYZ_TO_LMS_ICTCP);
    return multiply(lms.map(pqEncode) as unknown as Vec3, LMSP_TO_ICTCP);
}
function ictcpToXyz(ictcp: Vec3): Vec3 {
    const lms = multiply(ictcp, ICTCP_TO_LMSP).map(pqDecode) as unknown as Vec3;
    return multiply(lms, LMS_TO_XYZ_ICTCP).map((v) => v / ITP_YW) as unknown as Vec3;
}

const JZ_B = 1.15;
const JZ_G = 0.66;
const JZ_C1 = 3424 / 4096;
const JZ_C2 = 2413 / 128;
const JZ_C3 = 2392 / 128;
const JZ_N = 2610 / 16384;
const JZ_P = 1.7 * 2523 / 32;
const JZ_D = -0.56;
const JZ_D0 = 1.6295499532821566e-11;
const JZ_YW = 203;
const JZ_XYZ_TO_LMS: Mat3 = [
    0.41478972, 0.579999, 0.014648,
    -0.20151, 1.120649, 0.0531008,
    -0.0166008, 0.2648, 0.6684799,
];
const JZ_LMS_TO_XYZ = invert(JZ_XYZ_TO_LMS);
const JZ_LMSP_TO_IAB: Mat3 = [
    0.5, 0.5, 0,
    3.524, -4.066708, 0.542708,
    0.199076, 1.096799, -1.295875,
];
const JZ_IAB_TO_LMSP = invert(JZ_LMSP_TO_IAB);
const jzEncode = (value: number) => {
    const c = (Math.max(value, 0) / 1e4) ** JZ_N;
    return ((JZ_C1 + JZ_C2 * c) / (1 + JZ_C3 * c)) ** JZ_P;
};
const jzDecode = (value: number) => {
    const p = Math.max(value, 0) ** (1 / JZ_P);
    return 1e4 * (Math.max(p - JZ_C1, 0) / (JZ_C2 - JZ_C3 * p)) ** (1 / JZ_N);
};
function xyzToJzazbz([x, y, z]: Vec3): Vec3 {
    const xa = Math.max(x * JZ_YW, 0);
    const ya = Math.max(y * JZ_YW, 0);
    const za = Math.max(z * JZ_YW, 0);
    const mixed: Vec3 = [JZ_B * xa - (JZ_B - 1) * za, JZ_G * ya - (JZ_G - 1) * xa, za];
    const iab = multiply(multiply(mixed, JZ_XYZ_TO_LMS).map(jzEncode) as unknown as Vec3, JZ_LMSP_TO_IAB);
    return [((1 + JZ_D) * iab[0]) / (1 + JZ_D * iab[0]) - JZ_D0, iab[1], iab[2]];
}
function jzazbzToXyz([jz, az, bz]: Vec3): Vec3 {
    const iz = (jz + JZ_D0) / (1 + JZ_D - JZ_D * (jz + JZ_D0));
    const lms = multiply([iz, az, bz], JZ_IAB_TO_LMSP).map(jzDecode) as unknown as Vec3;
    const [xm, ym, zm] = multiply(lms, JZ_LMS_TO_XYZ);
    const xa = (xm + (JZ_B - 1) * zm) / JZ_B;
    const ya = (ym + (JZ_G - 1) * xa) / JZ_G;
    return [xa / JZ_YW, ya / JZ_YW, zm / JZ_YW];
}

function kelvinToXyz([kelvin]: readonly [number]): Vec3 {
    const t = Math.min(40000, Math.max(1000, kelvin)) / 100;
    const clip8 = (value: number) => Math.min(255, Math.max(0, value));
    const r = t <= 66 ? 255 : clip8(329.698727446 * (t - 60) ** -0.1332047592);
    const g = t <= 66
        ? clip8(99.4708025861 * Math.log(t) - 161.1195681661)
        : clip8(288.1221695283 * (t - 60) ** -0.0755148492);
    const b = t >= 66 ? 255 : t <= 19 ? 0 : clip8(138.5177312231 * Math.log(t - 10) - 305.0447927307);
    return multiply([srgbDecode(r / 255), srgbDecode(g / 255), srgbDecode(b / 255)], RGB_TO_XYZ);
}
function xyzToKelvin(xyz: Vec3): readonly number[] {
    let best = 1000;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (let candidate = 1000; candidate <= 40000; candidate++) {
        const point = kelvinToXyz([candidate]);
        const distance = (point[0] - xyz[0]) ** 2 + (point[1] - xyz[1]) ** 2 + (point[2] - xyz[2]) ** 2;
        if (distance < bestDistance) {
            best = candidate;
            bestDistance = distance;
        }
    }
    return [best];
}

const encodedSrgbToXyz = (rgb: Vec3) => multiply(rgb.map(srgbDecode) as unknown as Vec3, RGB_TO_XYZ);
const xyzToEncodedSrgb = (xyz: Vec3) => multiply(xyz, XYZ_TO_RGB).map(srgbEncode) as unknown as Vec3;

export const CONVERSION_ANCHORS = {
    rgb: {
        toXYZ: (channels) => encodedSrgbToXyz(channels.map((v) => v / 255) as unknown as Vec3),
        fromXYZ: (xyz) => xyzToEncodedSrgb(xyz).map((v) => v * 255),
    },
    hsl: { toXYZ: (channels) => encodedSrgbToXyz(hslToEncoded(channels as Vec3)), fromXYZ: (xyz) => encodedToHsl(xyzToEncodedSrgb(xyz)) },
    hsv: { toXYZ: (channels) => encodedSrgbToXyz(hsvToEncoded(channels as Vec3)), fromXYZ: (xyz) => encodedToHsv(xyzToEncodedSrgb(xyz)) },
    hwb: { toXYZ: (channels) => encodedSrgbToXyz(hwbToEncoded(channels as Vec3)), fromXYZ: (xyz) => encodedToHwb(xyzToEncodedSrgb(xyz)) },
    lab: { toXYZ: (channels) => multiply(labToXyzD50(channels as Vec3), D50_TO_D65), fromXYZ: (xyz) => xyzD50ToLab(multiply(xyz, D65_TO_D50)) },
    lch: { toXYZ: (channels) => multiply(labToXyzD50(polarToRect(channels as Vec3)), D50_TO_D65), fromXYZ: (xyz) => rectToPolar(xyzD50ToLab(multiply(xyz, D65_TO_D50)) as Vec3) },
    oklab: { toXYZ: (channels) => oklabToXyz(channels as Vec3), fromXYZ: xyzToOklab },
    oklch: { toXYZ: (channels) => oklabToXyz(polarToRect(channels as Vec3)), fromXYZ: (xyz) => rectToPolar(xyzToOklab(xyz)) },
    xyz: { toXYZ: (channels) => channels as Vec3, fromXYZ: (xyz) => xyz },
    kelvin: { toXYZ: (channels) => kelvinToXyz(channels as readonly [number]), fromXYZ: xyzToKelvin },
    "srgb-linear": { toXYZ: (channels) => multiply(channels as Vec3, RGB_TO_XYZ), fromXYZ: (xyz) => multiply(xyz, XYZ_TO_RGB) },
    "display-p3": { toXYZ: (channels) => rgbFamilyToXyz(channels, P3_TO_XYZ, srgbDecode), fromXYZ: (xyz) => xyzToRgbFamily(xyz, XYZ_TO_P3, srgbEncode) },
    "a98-rgb": { toXYZ: (channels) => rgbFamilyToXyz(channels, A98_TO_XYZ, a98Decode), fromXYZ: (xyz) => xyzToRgbFamily(xyz, XYZ_TO_A98, a98Encode) },
    "prophoto-rgb": {
        toXYZ: (channels) => multiply(rgbFamilyToXyz(channels, PROPHOTO_TO_XYZ_D50, prophotoDecode), D50_TO_D65),
        fromXYZ: (xyz) => xyzToRgbFamily(multiply(xyz, D65_TO_D50), XYZ_D50_TO_PROPHOTO, prophotoEncode),
    },
    rec2020: { toXYZ: (channels) => rgbFamilyToXyz(channels, REC2020_TO_XYZ, rec2020Decode), fromXYZ: (xyz) => xyzToRgbFamily(xyz, XYZ_TO_REC2020, rec2020Encode) },
    ictcp: { toXYZ: (channels) => ictcpToXyz(channels as Vec3), fromXYZ: xyzToIctcp },
    jzazbz: { toXYZ: (channels) => jzazbzToXyz(channels as Vec3), fromXYZ: xyzToJzazbz },
} satisfies { [S in SpaceId]: Anchor<S> };

export const HUE_INDEX = {
    hsl: 0,
    hsv: 0,
    hwb: 0,
    lch: 2,
    oklch: 2,
} as const;

export function isPowerless(space: SpaceId, channels: readonly number[]): boolean {
    switch (space) {
        case "hsl": return channels[1]! * (1 - Math.abs(2 * channels[2]! - 1)) === 0;
        case "hsv": return channels[1]! * channels[2]! === 0;
        case "hwb": return channels[1]! + channels[2]! >= 1;
        case "lch": return channels[1]! <= 0.0015;
        case "oklch": return channels[1]! <= 0.000004;
        default: return false;
    }
}

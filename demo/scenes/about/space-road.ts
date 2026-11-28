/**
 * The road each colour space takes to XYZ, written out step by step for the
 * About page (FIFTY-THIRD N: "more math focused ... didactic and truly useful").
 *
 * These are the library's own conversions, spelled one step at a time so a
 * reader can watch a colour's numbers change at every stage. The ground truth
 * is `src/color/anchors.ts`: every space has one road to XYZ D65
 * (`CONVERSION_ANCHORS`, anchors.ts:360), and the four sRGB-encoded spaces
 * (rgb, hsl, hsv, hwb) trade among themselves through encoded sRGB without
 * touching XYZ (anchors.ts:345, operations.ts:63). The constants below are the
 * ones anchors.ts carries; `demo/test/about/c60s-space-pages.test.ts` walks a
 * battery of colours down every road and holds the last stage to
 * `convertColor`'s own answer, so this file cannot drift from the library
 * without a red test.
 */
import type { AnyColor, SpaceId } from "@mkbabb/value.js/color";

type Vec3 = readonly [number, number, number];
type Mat3 = readonly [number, number, number, number, number, number, number, number, number];

const multiply = ([x, y, z]: readonly number[], m: Mat3): Vec3 => [
    m[0] * x! + m[1] * y! + m[2] * z!,
    m[3] * x! + m[4] * y! + m[5] * z!,
    m[6] * x! + m[7] * y! + m[8] * z!,
];

function invert(m: Mat3): Mat3 {
    const [a, b, c, d, e, f, g, h, i] = m;
    const A = e * i - f * h;
    const B = c * h - b * i;
    const C = b * f - c * e;
    const D = f * g - d * i;
    const E = a * i - c * g;
    const F = c * d - a * f;
    const G = d * h - e * g;
    const H = b * g - a * h;
    const I = a * e - b * d;
    const det = a * A + b * D + c * G;
    return [A, B, C, D, E, F, G, H, I].map((v) => v / det) as unknown as Mat3;
}

// anchors.ts:36-90 — the published matrices (CSS Color 4 §10, §18).
export const RGB_TO_XYZ: Mat3 = [
    0.41239079926595934, 0.357584339383878, 0.1804807884018343,
    0.21263900587151027, 0.715168678767756, 0.07219231536073371,
    0.01933081871559182, 0.11919477979462598, 0.9505321522496607,
];
export const XYZ_TO_RGB: Mat3 = [
    3.2409699419045226, -1.537383177570094, -0.4986107602930034,
    -0.9692436362808796, 1.8759675015077202, 0.04155505740717559,
    0.05563007969699366, -0.20397695888897652, 1.0569715142428786,
];
const P3_TO_XYZ: Mat3 = [
    0.4865709486482162, 0.26566769316909306, 0.1982172852343625,
    0.22897456406974884, 0.6917385218365064, 0.079286914093745,
    0, 0.04511338185890264, 1.043944368900976,
];
const A98_TO_XYZ: Mat3 = [
    0.5766690429101305, 0.1855582379065463, 0.1882286462349947,
    0.29734497525053605, 0.6273635662554661, 0.07529145849399788,
    0.02703136138641234, 0.07068885253582723, 0.9913375368376388,
];
const PROPHOTO_TO_XYZ_D50: Mat3 = [
    0.7977666449006423, 0.13518129740053308, 0.0313477341283922,
    0.2880748288194013, 0.711835234241873, 0.00008993693872564,
    0, 0, 0.8251046025104601,
];
const D50_TO_D65: Mat3 = [
    0.95547342148807501, -0.023098454948764641, 0.063259243200570692,
    -0.028369709333863888, 1.0099953980813041, 0.021041441191917334,
    0.012314014864481979, -0.020507649298898967, 1.3303659262421239,
];
const REC2020_TO_XYZ: Mat3 = [
    0.6369580483012914, 0.14461690358620832, 0.1688809751641721,
    0.2627002120112671, 0.6779980715188708, 0.05930171646986196,
    0, 0.028072693049087428, 1.0609850577107909,
];
// anchors.ts:207-218 — OKLab's two matrices (Ottosson 2020, CSS Color 4 §9.2).
const XYZ_TO_LMS_OKLAB: Mat3 = [
    0.819022437996703, 0.3619062600528904, -0.1288737815209879,
    0.0329836539323885, 0.9292868615863434, 0.0361446663506424,
    0.0481771893596242, 0.2642395317527308, 0.6335478284694309,
];
const LMS_TO_OKLAB: Mat3 = [
    0.210454268309314, 0.7936177747023054, -0.0040720430116193,
    1.9779985324311684, -2.4285922420485799, 0.450593709617411,
    0.0259040424655478, 0.7827717124575296, -0.8086757549230774,
];
const OKLAB_TO_LMS = invert(LMS_TO_OKLAB);
const LMS_TO_XYZ_OKLAB = invert(XYZ_TO_LMS_OKLAB);
// anchors.ts:226-243 — ICtCp (ITU-R BT.2100) on XYZ, PQ constants exact.
const XYZ_TO_LMS_ICTCP: Mat3 = [
    0.3592832590121217, 0.6976051147779502, -0.0358915932320289,
    -0.1920808463704995, 1.1004767970374323, 0.0753748658519118,
    0.0070797844607477, 0.0748396662186366, 0.8433265453898765,
];
const LMSP_TO_ICTCP: Mat3 = [
    0.5, 0.5, 0,
    1.61376953125, -3.323486328125, 1.709716796875,
    4.378173828125, -4.24560546875, -0.132568359375,
];
const ICTCP_TO_LMSP = invert(LMSP_TO_ICTCP);
const LMS_TO_XYZ_ICTCP = invert(XYZ_TO_LMS_ICTCP);
// anchors.ts:261-282 — Jzazbz (Safdar et al. 2017).
const JZ_XYZ_TO_LMS: Mat3 = [
    0.41478972, 0.579999, 0.014648,
    -0.20151, 1.120649, 0.0531008,
    -0.0166008, 0.2648, 0.6684799,
];
const JZ_LMSP_TO_IAB: Mat3 = [
    0.5, 0.5, 0,
    3.524, -4.066708, 0.542708,
    0.199076, 1.096799, -1.295875,
];
const JZ_IAB_TO_LMSP = invert(JZ_LMSP_TO_IAB);
const JZ_LMS_TO_XYZ = invert(JZ_XYZ_TO_LMS);

const sgn = Math.sign;
const srgbDecode = (c: number) => {
    const v = Math.abs(c);
    return sgn(c) * (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
};
export const srgbEncode = (c: number) => {
    const v = Math.abs(c);
    return sgn(c) * (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
};
const signPow = (c: number, e: number) => sgn(c) * Math.abs(c) ** e;
const roundHalfEven = (x: number) => {
    const r = Math.round(x);
    return Math.abs(x % 1) === 0.5 && r % 2 !== 0 ? r - 1 : r;
};

const wrapHue = (deg: number) => ((deg % 360) + 360) % 360;
function hueCorner(h: number): Vec3 {
    const k = wrapHue(h) / 60;
    const x = 1 - Math.abs((k % 2) - 1);
    if (k < 1) return [1, x, 0];
    if (k < 2) return [x, 1, 0];
    if (k < 3) return [0, 1, x];
    if (k < 4) return [0, x, 1];
    if (k < 5) return [x, 0, 1];
    return [1, 0, x];
}

const LAB_WHITE: Vec3 = [0.9642956764295677, 1, 0.8251046025104601];
const EPSILON = 216 / 24389;
const KAPPA = 24389 / 27;
const labInverse = (t: number) => (t ** 3 > EPSILON ? t ** 3 : (116 * t - 16) / KAPPA);

const PQ_M1 = 0.1593017578125;
const PQ_M2 = 78.84375;
const PQ_C1 = 0.8359375;
const PQ_C2 = 18.8515625;
const PQ_C3 = 18.6875;
const pqDecode = (e: number) => {
    const p = Math.max(e, 0) ** (1 / PQ_M2);
    return 1e4 * (Math.max(p - PQ_C1, 0) / (PQ_C2 - PQ_C3 * p)) ** (1 / PQ_M1);
};
const JZ_N = 2610 / 16384;
const JZ_P = (1.7 * 2523) / 32;
const JZ_D = -0.56;
const JZ_D0 = 1.6295499532821566e-11;
const jzDecode = (e: number) => {
    const p = Math.max(e, 0) ** (1 / JZ_P);
    return 1e4 * (Math.max(p - PQ_C1, 0) / (PQ_C2 - PQ_C3 * p)) ** (1 / JZ_N);
};
const REFERENCE_WHITE = 203;

// ── TeX ──────────────────────────────────────────────────────────────────

/** A matrix at four places, the precision IEC 61966-2-1 prints sRGB's at. */
export function texMatrix(m: Mat3): string {
    const cell = (v: number) => {
        const s = v.toFixed(4);
        return s === "-0.0000" ? "0.0000" : s;
    };
    const rows = [0, 1, 2].map((r) => [0, 1, 2].map((c) => cell(m[r * 3 + c]!)).join(" & "));
    return `\\begin{bmatrix} ${rows.join(" \\\\ ")} \\end{bmatrix}`;
}
const col = (a: string, b: string, c: string) => `\\begin{bmatrix} ${a} \\\\ ${b} \\\\ ${c} \\end{bmatrix}`;
const LIN = col("R_{\\text{lin}}", "G_{\\text{lin}}", "B_{\\text{lin}}");
const XYZ_COL = col("X", "Y", "Z");

const TEX_SRGB_DECODE =
    "C_{\\text{lin}} = \\operatorname{sgn}(C)\\begin{cases} \\dfrac{|C|}{12.92} & |C| \\le 0.04045 \\\\[6pt] \\left(\\dfrac{|C| + 0.055}{1.055}\\right)^{2.4} & \\text{otherwise} \\end{cases}";
const TEX_SRGB_ENCODE =
    "C = \\operatorname{sgn}(C_{\\text{lin}})\\begin{cases} 12.92\\,|C_{\\text{lin}}| & |C_{\\text{lin}}| \\le 0.0031308 \\\\[4pt] 1.055\\,|C_{\\text{lin}}|^{1/2.4} - 0.055 & \\text{otherwise} \\end{cases}";
const TEX_HUE_CORNER =
    "h' = \\frac{h}{60^{\\circ}},\\quad x = 1 - \\left| h' \\bmod 2 - 1 \\right|,\\quad \\operatorname{hue}(h) = \\begin{cases} (1, x, 0) & 0 \\le h' < 1 \\\\ (x, 1, 0) & 1 \\le h' < 2 \\\\ (0, 1, x) & 2 \\le h' < 3 \\\\ (0, x, 1) & 3 \\le h' < 4 \\\\ (x, 0, 1) & 4 \\le h' < 5 \\\\ (1, 0, x) & 5 \\le h' < 6 \\end{cases}";
const TEX_POLAR = (l: string, a: string, b: string) =>
    `${a} = C\\cos\\!\\left(h \\cdot \\tfrac{\\pi}{180}\\right),\\quad ${b} = C\\sin\\!\\left(h \\cdot \\tfrac{\\pi}{180}\\right),\\quad ${l}\\ \\text{unchanged}`;

// ── Roads ────────────────────────────────────────────────────────────────

export interface RoadStep {
    /** The stage this step lands on, named the way the page names it. */
    readonly to: string;
    /** The channel names at that stage. */
    readonly labels: readonly string[];
    /** Decimal places the page prints this stage's numbers at. */
    readonly digits: number;
    /** The step, rendered (KaTeX). */
    readonly tex: string;
    /** The step itself, on numbers. */
    readonly apply: (values: readonly number[]) => readonly number[];
}

export interface Road {
    /** The space's own channels, as the road starts. */
    readonly start: Readonly<{ labels: readonly string[]; digits: readonly number[] }>;
    readonly steps: readonly RoadStep[];
    /** Whether the page goes on from XYZ to the screen's sRGB bytes. */
    readonly toScreen: boolean;
}

const D65 = "XYZ (D65)";
const xyzStep = (m: Mat3, from: string): RoadStep => ({
    to: D65,
    labels: ["X", "Y", "Z"],
    digits: 3,
    tex: `${XYZ_COL} = ${texMatrix(m)} ${from}`,
    apply: (v) => multiply(v, m),
});
const decodeStep = (tex: string, decode: (c: number) => number): RoadStep => ({
    to: "linear light",
    labels: ["R lin", "G lin", "B lin"],
    digits: 3,
    tex,
    apply: (v) => v.map(decode),
});
const bradford: RoadStep = {
    to: D65,
    labels: ["X", "Y", "Z"],
    digits: 3,
    tex: `${XYZ_COL}_{D65} = ${texMatrix(D50_TO_D65)} ${XYZ_COL}_{D50}`,
    apply: (v) => multiply(v, D50_TO_D65),
};
const byteStep: RoadStep = {
    to: "sRGB, 0 to 255",
    labels: ["R", "G", "B"],
    digits: 0,
    tex: "C_{8} = \\operatorname{round}\\big(255 \\cdot \\min(1, \\max(0, C))\\big)",
    apply: (v) => v.map((c) => roundHalfEven(255 * Math.min(1, Math.max(0, c)))),
};

/** From encoded sRGB in [0, 1] to XYZ: the tail every sRGB-encoded road shares. */
const SRGB_TAIL: readonly RoadStep[] = [
    decodeStep(TEX_SRGB_DECODE, srgbDecode),
    xyzStep(RGB_TO_XYZ, LIN),
];

const encodedStep = (tex: string, apply: RoadStep["apply"]): RoadStep => ({
    to: "sRGB, 0 to 1",
    labels: ["R", "G", "B"],
    digits: 3,
    tex,
    apply,
});
const cornerStep: RoadStep = {
    to: "the pure hue",
    labels: ["R", "G", "B"],
    digits: 3,
    tex: TEX_HUE_CORNER,
    // The corner is read from h alone; s/v/w/l ride along for the next step.
    apply: ([h, a, b]) => [...hueCorner(h!), a!, b!],
};

const labRoad = (polar: boolean): Road => ({
    start: polar
        ? { labels: ["L", "C", "h°"], digits: [2, 2, 1] }
        : { labels: ["L", "a", "b"], digits: [2, 2, 2] },
    steps: [
        ...(polar
            ? [
                  {
                      to: "Lab",
                      labels: ["L", "a", "b"],
                      digits: 2,
                      tex: TEX_POLAR("L", "a", "b"),
                      apply: ([l, c, h]: readonly number[]) => [l!, c! * Math.cos((h! * Math.PI) / 180), c! * Math.sin((h! * Math.PI) / 180)],
                  } satisfies RoadStep,
              ]
            : []),
        {
            to: "f",
            labels: ["fx", "fy", "fz"],
            digits: 3,
            tex: "f_y = \\frac{L + 16}{116},\\quad f_x = f_y + \\frac{a}{500},\\quad f_z = f_y - \\frac{b}{200}",
            apply: ([l, a, b]) => {
                const fy = (l! + 16) / 116;
                return [fy + a! / 500, fy, fy - b! / 200];
            },
        },
        {
            to: "XYZ (D50)",
            labels: ["X", "Y", "Z"],
            digits: 3,
            tex:
                "X = X_n\\, f^{-1}(f_x),\\; Y = Y_n\\, f^{-1}(f_y),\\; Z = Z_n\\, f^{-1}(f_z),\\quad f^{-1}(t) = \\begin{cases} t^3 & t^3 > \\varepsilon \\\\ \\dfrac{116\\,t - 16}{\\kappa} & \\text{otherwise} \\end{cases},\\quad \\varepsilon = \\tfrac{216}{24389},\\; \\kappa = \\tfrac{24389}{27},\\; (X_n, Y_n, Z_n) = (0.9643, 1, 0.8251)",
            apply: ([fx, fy, fz]) => [LAB_WHITE[0] * labInverse(fx!), LAB_WHITE[1] * labInverse(fy!), LAB_WHITE[2] * labInverse(fz!)],
        },
        bradford,
    ],
    toScreen: true,
});

const okRoad = (polar: boolean): Road => ({
    start: polar
        ? { labels: ["L", "C", "h°"], digits: [3, 3, 1] }
        : { labels: ["L", "a", "b"], digits: [3, 3, 3] },
    steps: [
        ...(polar
            ? [
                  {
                      to: "OKLab",
                      labels: ["L", "a", "b"],
                      digits: 3,
                      tex: TEX_POLAR("L", "a", "b"),
                      apply: ([l, c, h]: readonly number[]) => [l!, c! * Math.cos((h! * Math.PI) / 180), c! * Math.sin((h! * Math.PI) / 180)],
                  } satisfies RoadStep,
              ]
            : []),
        {
            to: "cone response, compressed",
            labels: ["l′", "m′", "s′"],
            digits: 3,
            tex: `${col("l'", "m'", "s'")} = ${texMatrix(OKLAB_TO_LMS)} ${col("L", "a", "b")}`,
            apply: (v) => multiply(v, OKLAB_TO_LMS),
        },
        {
            to: "cone response, LMS",
            labels: ["l", "m", "s"],
            digits: 3,
            tex: "l = l'^{\\,3},\\quad m = m'^{\\,3},\\quad s = s'^{\\,3}",
            apply: (v) => v.map((x) => x ** 3),
        },
        xyzStep(LMS_TO_XYZ_OKLAB, col("l", "m", "s")),
    ],
    toScreen: true,
});

const rgbFamily = (m: Mat3, decodeTex: string, decode: (c: number) => number, d50 = false): Road => ({
    start: { labels: ["R", "G", "B"], digits: [3, 3, 3] },
    steps: [
        decodeStep(decodeTex, decode),
        d50
            ? { ...xyzStep(m, LIN), to: "XYZ (D50)", tex: `${XYZ_COL}_{D50} = ${texMatrix(m)} ${LIN}` }
            : xyzStep(m, LIN),
        ...(d50 ? [bradford] : []),
    ],
    toScreen: true,
});

const HELLAND_TEX =
    "t = \\tfrac{T}{100},\\quad \\begin{aligned} R &= \\begin{cases} 255 & t \\le 66 \\\\ 329.699\\,(t - 60)^{-0.1332} & t > 66 \\end{cases} \\\\ G &= \\begin{cases} 99.471 \\ln t - 161.120 & t \\le 66 \\\\ 288.122\\,(t - 60)^{-0.0755} & t > 66 \\end{cases} \\\\ B &= \\begin{cases} 255 & t \\ge 66 \\\\ 0 & t \\le 19 \\\\ 138.518 \\ln(t - 10) - 305.045 & \\text{otherwise} \\end{cases} \\end{aligned}";
const clip8 = (v: number) => Math.min(255, Math.max(0, v));

export const ROADS: Readonly<Record<SpaceId | "hex", Road>> = {
    rgb: {
        start: { labels: ["R", "G", "B"], digits: [1, 1, 1] },
        steps: [encodedStep("C = \\frac{C_{8}}{255}", (v) => v.map((c) => c / 255)), ...SRGB_TAIL],
        toScreen: false,
    },
    hex: {
        start: { labels: ["R", "G", "B"], digits: [0, 0, 0] },
        steps: [encodedStep("C = \\frac{16\\,d_1 + d_0}{255}", (v) => v.map((c) => c / 255)), ...SRGB_TAIL],
        toScreen: false,
    },
    hsl: {
        start: { labels: ["h°", "s", "l"], digits: [1, 3, 3] },
        steps: [
            cornerStep,
            encodedStep("C = (1 - |2l - 1|)\\,s,\\quad m = l - \\tfrac{C}{2},\\quad (R, G, B) = m + C \\cdot \\operatorname{hue}(h)", ([r, g, b, s, l]) => {
                const chroma = (1 - Math.abs(2 * l! - 1)) * s!;
                const m = l! - chroma / 2;
                return [r!, g!, b!].map((c) => c * chroma + m);
            }),
            ...SRGB_TAIL,
        ],
        toScreen: false,
    },
    hsv: {
        start: { labels: ["h°", "s", "v"], digits: [1, 3, 3] },
        steps: [
            cornerStep,
            encodedStep("C = v\\,s,\\quad m = v - C,\\quad (R, G, B) = m + C \\cdot \\operatorname{hue}(h)", ([r, g, b, s, v]) => {
                const chroma = v! * s!;
                const m = v! - chroma;
                return [r!, g!, b!].map((c) => c * chroma + m);
            }),
            ...SRGB_TAIL,
        ],
        toScreen: false,
    },
    hwb: {
        start: { labels: ["h°", "w", "b"], digits: [1, 3, 3] },
        steps: [
            cornerStep,
            encodedStep(
                "(R, G, B) = \\begin{cases} w + (1 - w - b)\\,\\operatorname{hue}(h) & w + b < 1 \\\\ \\left(\\frac{w}{w + b}\\right)(1, 1, 1) & w + b \\ge 1 \\end{cases}",
                ([r, g, b, w, k]) => {
                    if (w! + k! >= 1) {
                        const grey = w! / (w! + k!);
                        return [grey, grey, grey];
                    }
                    return [r!, g!, b!].map((c) => c * (1 - w! - k!) + w!);
                },
            ),
            ...SRGB_TAIL,
        ],
        toScreen: false,
    },
    lab: labRoad(false),
    lch: labRoad(true),
    oklab: okRoad(false),
    oklch: okRoad(true),
    xyz: { start: { labels: ["X", "Y", "Z"], digits: [3, 3, 3] }, steps: [], toScreen: true },
    kelvin: {
        start: { labels: ["T (K)"], digits: [0] },
        steps: [
            {
                to: "sRGB, 0 to 255",
                labels: ["R", "G", "B"],
                digits: 1,
                tex: HELLAND_TEX,
                apply: ([kelvin]) => {
                    const t = Math.min(40000, Math.max(1000, kelvin!)) / 100;
                    return [
                        t <= 66 ? 255 : clip8(329.698727446 * (t - 60) ** -0.1332047592),
                        t <= 66 ? clip8(99.4708025861 * Math.log(t) - 161.1195681661) : clip8(288.1221695283 * (t - 60) ** -0.0755148492),
                        t >= 66 ? 255 : t <= 19 ? 0 : clip8(138.5177312231 * Math.log(t - 10) - 305.0447927307),
                    ];
                },
            },
            encodedStep("C = \\frac{C_{8}}{255}", (v) => v.map((c) => c / 255)),
            ...SRGB_TAIL,
        ],
        toScreen: true,
    },
    "srgb-linear": {
        start: { labels: ["R lin", "G lin", "B lin"], digits: [3, 3, 3] },
        steps: [xyzStep(RGB_TO_XYZ, LIN)],
        toScreen: true,
    },
    "display-p3": rgbFamily(P3_TO_XYZ, TEX_SRGB_DECODE, srgbDecode),
    "display-p3-linear": {
        start: { labels: ["R lin", "G lin", "B lin"], digits: [3, 3, 3] },
        steps: [xyzStep(P3_TO_XYZ, LIN)],
        toScreen: true,
    },
    "a98-rgb": rgbFamily(A98_TO_XYZ, "C_{\\text{lin}} = \\operatorname{sgn}(C)\\,|C|^{563/256}", (c) => signPow(c, 563 / 256)),
    "prophoto-rgb": rgbFamily(
        PROPHOTO_TO_XYZ_D50,
        "C_{\\text{lin}} = \\operatorname{sgn}(C)\\begin{cases} \\dfrac{|C|}{16} & |C| \\le \\tfrac{1}{32} \\\\[4pt] |C|^{1.8} & \\text{otherwise} \\end{cases}",
        (c) => sgn(c) * (Math.abs(c) <= 1 / 32 ? Math.abs(c) / 16 : Math.abs(c) ** 1.8),
        true,
    ),
    rec2020: rgbFamily(REC2020_TO_XYZ, "C_{\\text{lin}} = \\operatorname{sgn}(C)\\,|C|^{2.4}", (c) => signPow(c, 2.4)),
    ictcp: {
        start: { labels: ["I", "Ct", "Cp"], digits: [3, 3, 3] },
        steps: [
            {
                to: "cone response, PQ-encoded",
                labels: ["L′", "M′", "S′"],
                digits: 3,
                tex: `${col("L'", "M'", "S'")} = ${texMatrix(ICTCP_TO_LMSP)} ${col("I", "C_T", "C_P")}`,
                apply: (v) => multiply(v, ICTCP_TO_LMSP),
            },
            {
                to: "cone response, cd/m²",
                labels: ["L", "M", "S"],
                digits: 1,
                tex: "F = 10000\\left(\\frac{\\max\\!\\left(E^{1/m_2} - c_1,\\ 0\\right)}{c_2 - c_3\\,E^{1/m_2}}\\right)^{1/m_1},\\quad m_1 = \\tfrac{2610}{16384},\\; m_2 = \\tfrac{2523}{32},\\; c_1 = \\tfrac{3424}{4096},\\; c_2 = \\tfrac{2413}{128},\\; c_3 = \\tfrac{2392}{128}",
                apply: (v) => v.map(pqDecode),
            },
            {
                to: D65,
                labels: ["X", "Y", "Z"],
                digits: 3,
                tex: `${XYZ_COL} = \\frac{1}{203} ${texMatrix(LMS_TO_XYZ_ICTCP)} ${col("L", "M", "S")}`,
                apply: (v) => multiply(v, LMS_TO_XYZ_ICTCP).map((x) => x / REFERENCE_WHITE),
            },
        ],
        toScreen: true,
    },
    jzazbz: {
        start: { labels: ["Jz", "az", "bz"], digits: [3, 3, 3] },
        steps: [
            {
                to: "Iz, az, bz",
                labels: ["Iz", "az", "bz"],
                digits: 3,
                tex: "I_z = \\frac{J_z + d_0}{1 + d - d\\,(J_z + d_0)},\\quad d = -0.56,\\; d_0 = 1.6295 \\times 10^{-11}",
                apply: ([jz, az, bz]) => [(jz! + JZ_D0) / (1 + JZ_D - JZ_D * (jz! + JZ_D0)), az!, bz!],
            },
            {
                to: "cone response, encoded",
                labels: ["L′", "M′", "S′"],
                digits: 3,
                tex: `${col("L'", "M'", "S'")} = ${texMatrix(JZ_IAB_TO_LMSP)} ${col("I_z", "a_z", "b_z")}`,
                apply: (v) => multiply(v, JZ_IAB_TO_LMSP),
            },
            {
                to: "cone response, cd/m²",
                labels: ["L", "M", "S"],
                digits: 1,
                tex: "F = 10000\\left(\\frac{\\max\\!\\left(E^{1/p} - c_1,\\ 0\\right)}{c_2 - c_3\\,E^{1/p}}\\right)^{1/n},\\quad n = \\tfrac{2610}{16384},\\; p = 1.7 \\cdot \\tfrac{2523}{32},\\; c_1 = \\tfrac{3424}{4096},\\; c_2 = \\tfrac{2413}{128},\\; c_3 = \\tfrac{2392}{128}",
                apply: (v) => v.map(jzDecode),
            },
            {
                to: D65,
                labels: ["X", "Y", "Z"],
                digits: 3,
                tex: `${col("X'", "Y'", "Z'")} = ${texMatrix(JZ_LMS_TO_XYZ)} ${col("L", "M", "S")},\\quad X_a = \\frac{X' + 0.15\\,Z'}{1.15},\\; Y_a = \\frac{Y' - 0.34\\,X_a}{0.66},\\; (X, Y, Z) = \\frac{(X_a,\\, Y_a,\\, Z')}{203}`,
                apply: (v) => {
                    const [xm, ym, zm] = multiply(v, JZ_LMS_TO_XYZ);
                    const xa = (xm + 0.15 * zm) / 1.15;
                    const ya = (ym + (0.66 - 1) * xa) / 0.66;
                    return [xa / REFERENCE_WHITE, ya / REFERENCE_WHITE, zm / REFERENCE_WHITE];
                },
            },
        ],
        toScreen: true,
    },
    "xyz-d50": {
        start: { labels: ["X", "Y", "Z"], digits: [3, 3, 3] },
        steps: [bradford],
        toScreen: true,
    },
};

/** From XYZ D65 on to the bytes a screen is sent. */
export const SCREEN_LEG: readonly RoadStep[] = [
    {
        to: "linear sRGB",
        labels: ["R lin", "G lin", "B lin"],
        digits: 3,
        tex: `${LIN} = ${texMatrix(XYZ_TO_RGB)} ${XYZ_COL}`,
        apply: (v) => multiply(v, XYZ_TO_RGB),
    },
    {
        to: "sRGB, 0 to 1",
        labels: ["R", "G", "B"],
        digits: 3,
        tex: TEX_SRGB_ENCODE,
        apply: (v) => v.map(srgbEncode),
    },
    byteStep,
];

export interface Stage {
    readonly to: string;
    readonly labels: readonly string[];
    readonly digits: readonly number[];
    readonly values: readonly number[];
    readonly tex: string | null;
}

export interface Walk {
    /** The colour as the space holds it; a `none` hue reads as 0 (CSS Color 4 §4.4). */
    readonly start: Stage;
    readonly road: readonly Stage[];
    readonly screen: readonly Stage[];
    /** Linear sRGB left [0, 1]: the bytes are clipped. */
    readonly outsideSrgb: boolean;
}

/**
 * Walk a colour (already in `space`, as the picker holds it) down its road.
 * `hex` is sRGB written in base 16: its numbers are rgb's, rounded to bytes.
 */
export function walkRoad(space: SpaceId | "hex", color: AnyColor): Walk {
    const road = ROADS[space];
    let values = color.channels.map((c) => (typeof c === "number" ? c : 0));
    if (space === "hex") values = values.map((c) => roundHalfEven(Math.min(255, Math.max(0, c))));
    const start: Stage = { to: "start", labels: road.start.labels, digits: road.start.digits, values, tex: null };
    const stages: Stage[] = [];
    for (const step of road.steps) {
        values = [...step.apply(values)];
        // A step may carry channels forward for the next one (the pure hue
        // keeps s and l); the page prints only the stage's own.
        stages.push({ to: step.to, labels: step.labels, digits: step.labels.map(() => step.digits), values: values.slice(0, step.labels.length), tex: step.tex });
    }
    const screen: Stage[] = [];
    let outsideSrgb = false;
    if (road.toScreen) {
        for (const step of SCREEN_LEG) {
            values = [...step.apply(values)];
            if (step === SCREEN_LEG[0]) outsideSrgb = values.some((v) => v < -1e-6 || v > 1 + 1e-6);
            screen.push({ to: step.to, labels: step.labels, digits: step.labels.map(() => step.digits), values, tex: step.tex });
        }
    } else {
        const linear = stages.find((s) => s.to === "linear light")?.values ?? [];
        outsideSrgb = linear.some((v) => v < -1e-6 || v > 1 + 1e-6);
    }
    return { start, road: stages, screen, outsideSrgb };
}

/** A number at a stage's precision, with a true minus sign and no "-0". */
export function formatStageNumber(value: number, digits: number): string {
    const s = value.toFixed(digits);
    const zero = /^-0(\.0+)?$/.test(s);
    return (zero ? s.slice(1) : s).replace("-", "−");
}

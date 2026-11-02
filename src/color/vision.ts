import type { Result } from "../foundation/result";
import { err, ok } from "../foundation/result";
import { type AnyColor, type Color, type ColorIssue, linearSrgb } from "./model";
import { convertColor, mapColorToGamut } from "./operations";

/**
 * Colour-vision-deficiency simulation (value.js 4.2.0, COHESION §0hf · VJ-1).
 *
 * Two published models, both applied as a 3×3 matrix to LINEAR sRGB (never to
 * gamma-encoded values: the same space colorspacious, DaltonLens and the
 * dataviz skill's validate_palette.js use):
 *
 * - **Machado, Oliveira & Fernandes 2009**, "A physiologically-based model for
 *   simulation of color vision deficiency", IEEE TVCG 15(6):1291-1298,
 *   doi:10.1109/TVCG.2009.113. The authors' supplementary table, 3 kinds × 11
 *   severities (0.0, 0.1, … 1.0), 6 decimals, shipped VERBATIM: no
 *   renormalisation and no extra digits. Its rows sum to 1 within 1e-6, so the
 *   grey axis holds to ~2e-6, a fact of the published table. Severity 1.0 is the
 *   model's own dichromat form. Between tenths the matrix is interpolated
 *   element by element, `t = 10·s; i = min(⌊t⌋, 9); f = t − i;
 *   M = (1−f)·T[i] + f·T[i+1]`: colorspacious `machado_et_al_2009_matrix`'s rule
 *   (the paper publishes only the tenths), bit-exact at s = 0 and s = 1. Tritan
 *   is the model's least-validated case.
 * - **Viénot, Brettel & Mollon 1999**, "Digital video colourmaps for checking
 *   the legibility of displays by dichromats", Color Res. Appl. 24(4):243-252.
 *   Protan and deutan dichromacy only; the paper defines no tritan form and no
 *   severity, so `method: "vienot"` refuses both (`color_invalid_input`).
 *   `M = RGB←LMS · P · LMS←RGB`, with LMS←XYZ Smith & Pokorny 1975, XYZ←RGB the
 *   BT.709 sRGB primaries (in place of the paper's CRT phosphors) and P the
 *   projection along the missing cone axis onto the plane through black, white,
 *   blue and yellow: DaltonLens `Simulator_Vienot1999` with
 *   `LMSModel_sRGB_SmithPokorny75`. The constants are frozen at full float64
 *   from that derivation (entries of order 1e-17 written as 0). Its sRGB matrix
 *   differs from value.js's CSS Color 4 matrix at ~1e-6; freezing keeps the
 *   1e-12 reference agreement.
 *
 * The pipeline: map into sRGB (`mapColorToGamut`, the hue- and
 * lightness-preserving OKLCh chroma reduction; in-gamut input is unchanged),
 * convert to srgb-linear, multiply, then CLIP each channel to [0, 1]. The clip
 * matches DaltonLens and validate_palette.js (colorspacious does not clip), and
 * the palette check's CVD thresholds were calibrated on clipped output. It is a
 * model artefact: on saturated inputs it shifts hue (Machado protan sends
 * `#0000ff`'s red to −0.204868, clipped to 0).
 */
export type ColorVisionKind = "protan" | "deutan" | "tritan";
export type ColorVisionMethod = "machado" | "vienot";
export type ColorVisionOptions =
    | Readonly<{ kind: ColorVisionKind; method?: "machado"; severity?: number }>
    | Readonly<{ kind: "protan" | "deutan"; method: "vienot"; severity?: 1 }>;

/** Row-major 3×3: `out[i] = M[3i]·r + M[3i+1]·g + M[3i+2]·b`. */
export type Matrix = readonly [number, number, number, number, number, number, number, number, number];

const IDENTITY: Matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

/**
 * Machado 2009, severities 0.0 … 1.0 by tenths (index = 10·severity).
 * INTERNAL (not in the barrel): exported for the table-fidelity test.
 */
export const MACHADO_2009: Readonly<Record<ColorVisionKind, readonly Matrix[]>> = {
    protan: [
        IDENTITY,
        [0.856167, 0.182038, -0.038205, 0.029342, 0.955115, 0.015544, -0.002880, -0.001563, 1.004443], // 0.1
        [0.734766, 0.334872, -0.069637, 0.051840, 0.919198, 0.028963, -0.004928, -0.004209, 1.009137], // 0.2
        [0.630323, 0.465641, -0.095964, 0.069181, 0.890046, 0.040773, -0.006308, -0.007724, 1.014032], // 0.3
        [0.539009, 0.579343, -0.118352, 0.082546, 0.866121, 0.051332, -0.007136, -0.011959, 1.019095], // 0.4
        [0.458064, 0.679578, -0.137642, 0.092785, 0.846313, 0.060902, -0.007494, -0.016807, 1.024301], // 0.5
        [0.385450, 0.769005, -0.154455, 0.100526, 0.829802, 0.069673, -0.007442, -0.022190, 1.029632], // 0.6
        [0.319627, 0.849633, -0.169261, 0.106241, 0.815969, 0.077790, -0.007025, -0.028051, 1.035076], // 0.7
        [0.259411, 0.923008, -0.182420, 0.110296, 0.804340, 0.085364, -0.006276, -0.034346, 1.040622], // 0.8
        [0.203876, 0.990338, -0.194214, 0.112975, 0.794542, 0.092483, -0.005222, -0.041043, 1.046265], // 0.9
        [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998], // 1.0
    ],
    deutan: [
        IDENTITY,
        [0.866435, 0.177704, -0.044139, 0.049567, 0.939063, 0.011370, -0.003453, 0.007233, 0.996220], // 0.1
        [0.760729, 0.319078, -0.079807, 0.090568, 0.889315, 0.020117, -0.006027, 0.013325, 0.992702], // 0.2
        [0.675425, 0.433850, -0.109275, 0.125303, 0.847755, 0.026942, -0.007950, 0.018572, 0.989378], // 0.3
        [0.605511, 0.528560, -0.134071, 0.155318, 0.812366, 0.032316, -0.009376, 0.023176, 0.986200], // 0.4
        [0.547494, 0.607765, -0.155259, 0.181692, 0.781742, 0.036566, -0.010410, 0.027275, 0.983136], // 0.5
        [0.498864, 0.674741, -0.173604, 0.205199, 0.754872, 0.039929, -0.011131, 0.030969, 0.980162], // 0.6
        [0.457771, 0.731899, -0.189670, 0.226409, 0.731012, 0.042579, -0.011595, 0.034333, 0.977261], // 0.7
        [0.422823, 0.781057, -0.203881, 0.245752, 0.709602, 0.044646, -0.011843, 0.037423, 0.974421], // 0.8
        [0.392952, 0.823610, -0.216562, 0.263559, 0.690210, 0.046232, -0.011910, 0.040281, 0.971630], // 0.9
        [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.011820, 0.042940, 0.968881], // 1.0
    ],
    tritan: [
        IDENTITY,
        [0.926670, 0.092514, -0.019184, 0.021191, 0.964503, 0.014306, 0.008437, 0.054813, 0.936750], // 0.1
        [0.895720, 0.133330, -0.029050, 0.029997, 0.945400, 0.024603, 0.013027, 0.104707, 0.882266], // 0.2
        [0.905871, 0.127791, -0.033662, 0.026856, 0.941251, 0.031893, 0.013410, 0.148296, 0.838294], // 0.3
        [0.948035, 0.089490, -0.037526, 0.014364, 0.946792, 0.038844, 0.010853, 0.193991, 0.795156], // 0.4
        [1.017277, 0.027029, -0.044306, -0.006113, 0.958479, 0.047634, 0.006379, 0.248708, 0.744913], // 0.5
        [1.104996, -0.046633, -0.058363, -0.032137, 0.971635, 0.060503, 0.001336, 0.317922, 0.680742], // 0.6
        [1.193214, -0.109812, -0.083402, -0.058496, 0.979410, 0.079086, -0.002346, 0.403492, 0.598854], // 0.7
        [1.257728, -0.139648, -0.118081, -0.078003, 0.975409, 0.102594, -0.003316, 0.501214, 0.502102], // 0.8
        [1.278864, -0.125333, -0.153531, -0.084748, 0.957674, 0.127074, -0.000989, 0.601151, 0.399838], // 0.9
        [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733, 0.691367, 0.303900], // 1.0
    ],
};

/**
 * Viénot 1999 dichromat matrices (DaltonLens derivation, frozen at float64).
 * INTERNAL (not in the barrel): exported for the reference test.
 */
export const VIENOT_1999: Readonly<Record<"protan" | "deutan", Matrix>> = {
    protan: [
        0.10888931102535530, 0.89111068897464407, 0,
        0.10888931102535536, 0.89111068897464463, 0,
        0.0044713141721819880, -0.0044713141721819489, 1,
    ],
    deutan: [
        0.29030532126555281, 0.70969467873444692, 0,
        0.29030532126555286, 0.70969467873444692, 0,
        -0.021973539447331349, 0.021973539447331363, 1,
    ],
};

const KINDS: readonly string[] = ["protan", "deutan", "tritan"];

function machadoMatrix(kind: ColorVisionKind, severity: number): Matrix {
    const table = MACHADO_2009[kind];
    const t = 10 * severity;
    const i = Math.min(Math.floor(t), 9);
    const f = t - i;
    const low = table[i]!;
    const high = table[i + 1]!;
    return low.map((value, k) => (1 - f) * value + f * high[k]!) as unknown as Matrix;
}

/**
 * Validates `options` in SPEC §3 order and answers the matrix it selects.
 * INTERNAL (not in the barrel): exported for the interpolation tests.
 */
export function colorVisionMatrix(options: ColorVisionOptions): Result<Matrix, ColorIssue> {
    if (!options || typeof options !== "object" || !KINDS.includes(options.kind)) {
        return err({ code: "color_invalid_input" });
    }
    const method: unknown = options.method ?? "machado";
    if (method !== "machado" && method !== "vienot") return err({ code: "color_invalid_input" });
    const severity: unknown = options.severity ?? 1;
    if (typeof severity !== "number" || !Number.isFinite(severity)) return err({ code: "color_non_finite" });
    if (severity < 0 || severity > 1) return err({ code: "color_out_of_range" });
    if (method === "vienot") {
        if (options.kind === "tritan" || severity !== 1) return err({ code: "color_invalid_input" });
        return ok(VIENOT_1999[options.kind]);
    }
    return ok(machadoMatrix(options.kind, severity));
}

/**
 * INTERNAL (not in the barrel): the simulation before the clip, the matrix
 * product on the gamut-mapped linear-sRGB input. The reference tests check it
 * against colorspacious, which does not clip.
 */
export function simulateLinearUnclipped(
    color: AnyColor,
    options: ColorVisionOptions,
): Result<readonly [r: number, g: number, b: number], ColorIssue> {
    const matrix = colorVisionMatrix(options);
    if (!matrix.ok) return matrix;
    const mapped = mapColorToGamut(color, "srgb");
    if (!mapped.ok) return mapped;
    const linear = convertColor(mapped.value as AnyColor, "srgb-linear");
    if (!linear.ok) return linear;
    const [r, g, b] = linear.value.channels;
    if (r === "none" || g === "none" || b === "none") return err({ code: "color_missing_channel" });
    const m = matrix.value;
    return ok([
        m[0] * r + m[1] * g + m[2] * b,
        m[3] * r + m[4] * g + m[5] * b,
        m[6] * r + m[7] * g + m[8] * b,
    ]);
}

const unit = (value: number) => Math.min(1, Math.max(0, value));

/**
 * How `color` appears under a colour-vision deficiency, in srgb-linear (the
 * space the models and the clip are defined in; one `convertColor` reaches any
 * other). `severity` defaults to 1 (dichromacy) and `method` to `"machado"`, the
 * only model with a severity table. Alpha passes through as is, `"none"`
 * included. Errors: unknown kind or method, or Viénot with tritan or a severity
 * other than 1, `color_invalid_input`; a non-finite severity
 * `color_non_finite`; one outside [0, 1] `color_out_of_range`; a `"none"`
 * channel `color_missing_channel`.
 */
export function simulateColorVision(
    color: AnyColor,
    options: ColorVisionOptions,
): Result<Color<"srgb-linear">, ColorIssue> {
    const simulated = simulateLinearUnclipped(color, options);
    if (!simulated.ok) return simulated;
    const [r, g, b] = simulated.value;
    return linearSrgb(unit(r), unit(g), unit(b), color.alpha);
}

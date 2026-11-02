import type { AnyColor, Color, ColorIssue, ColorVisionKind, Result } from "./color/index";
import { contrastRatio, convertColor, deltaEOK, isAnyColor, simulateColorVision } from "./color/index";
import { parseCssColor } from "./css/bbnf/color-parse";
import type { ParseIssue } from "./css/types";

/**
 * value.js 4.2.0 — the categorical-palette check (VJ-1, COHESION §0hf).
 *
 * It sits outside `src/color/` because it accepts CSS colour TEXT, and the
 * colour barrel cannot import `parseCssColor` (the css area's colour actions
 * import that barrel; the cycle note in `subpaths/color.ts`). Nothing in
 * `src/color/` imports this module, so `@mkbabb/value.js/color` forwards it
 * beside `parseCssColor`.
 *
 * Every default below has a source or is stated as a design choice (SPEC §5):
 * - `lightness` light [0.43, 0.77] / dark [0.48, 0.67] OKLCh L, inclusive —
 *   design choice, validate_palette.js `BAND` (mid-tone marks, where the sRGB
 *   chroma ceiling peaks, off a near-white or near-black ground).
 * - `chroma` {0.10, 0.10} — design choice, validate_palette.js `CHROMA_FLOOR`
 *   (below it a hue reads as grey at mark size).
 * - `contrast` {target 3, floor 1} — the 3:1 target is WCAG 2.1/2.2 SC 1.4.11
 *   Non-text Contrast; below it WARNS (never fails) by design, since SC 1.4.11
 *   is also met by labels or a table, which a colour check cannot see.
 *   `{ target: 3, floor: 3 }` makes it a hard gate.
 * - `normal` {0.15, 0.15} ΔEOK — design choice, validate_palette.js
 *   `NORMAL_FLOOR` 15 (×100); 7.5 JND at CSS Color 4's 0.02.
 * - `cvd` {target 0.08, floor 0.06} ΔEOK — validate_palette.js `CVD_TARGET` 8 /
 *   `CVD_FLOOR` 6 (×100), calibrated on Machado 2009 at severity 1, clipped;
 *   which is why this check FIXES that model. The warn band is legal only with
 *   secondary encoding (labels, gaps, texture).
 * - `gate` {protan, deutan: true; tritan: false} — design choice: prevalence
 *   (~8% of men protan/deutan, ~0.01% tritan; Sharpe et al. 1999) and tritan
 *   being Machado's least-validated case. Tritan is still measured and reported,
 *   as `"info"`.
 * - `pairs` "adjacent" — design choice: stacks, bars and lines put palette
 *   neighbours side by side. `"cyclic"` for pies and donuts, `"all"` for
 *   scatter plots, maps and small multiples, or an explicit list.
 * - `ground` and `scheme` have NO default: a wrong default ground would make
 *   every contrast verdict silently wrong.
 * Any change to a default changes verdicts, so it is at least a minor version.
 *
 * Wide-gamut colours are mapped into sRGB for simulation and contrast, but the
 * normal-vision ΔE reads them unmapped, so on a P3 palette the two can disagree.
 */
export type ColorInput = AnyColor | string;
export type PaletteBand = Readonly<{ target: number; floor: number }>;
export type PalettePairs =
    | "adjacent" | "cyclic" | "all"
    | readonly (readonly [number, number])[];
export type CategoricalPaletteOptions = Readonly<{
    ground: ColorInput;
    scheme: "light" | "dark";
    pairs?: PalettePairs;
    lightness?: readonly [min: number, max: number];
    chroma?: PaletteBand;
    contrast?: PaletteBand;
    normal?: PaletteBand;
    cvd?: PaletteBand;
    gate?: Readonly<Partial<Record<ColorVisionKind, boolean>>>;
}>;
export type PaletteVision = "normal" | ColorVisionKind;
export type PaletteVerdict = "pass" | "warn" | "fail" | "info";
export type PaletteFinding =
    | Readonly<{ check: "lightness"; index: number; value: number; threshold: readonly [number, number]; verdict: "pass" | "fail" }>
    | Readonly<{ check: "chroma" | "contrast"; index: number; value: number; threshold: PaletteBand; verdict: "pass" | "warn" | "fail" }>
    | Readonly<{ check: "separation"; vision: PaletteVision; pair: readonly [number, number]; value: number; threshold: PaletteBand; verdict: PaletteVerdict }>;
export type CategoricalPaletteReport = Readonly<{
    verdict: "pass" | "warn" | "fail";
    ok: boolean;
    findings: readonly PaletteFinding[];
    worst: Readonly<{
        lightness: PaletteFinding | null;
        chroma: PaletteFinding | null;
        contrast: PaletteFinding | null;
        separation: Readonly<Record<PaletteVision, PaletteFinding | null>>;
    }>;
    colors: readonly Color<"oklch">[];
    ground: Color<"oklch">;
    settings: Readonly<{
        scheme: "light" | "dark";
        pairs: PalettePairs;
        lightness: readonly [number, number];
        chroma: PaletteBand;
        contrast: PaletteBand;
        normal: PaletteBand;
        cvd: PaletteBand;
        gate: Readonly<Record<ColorVisionKind, boolean>>;
        method: "machado";
        severity: 1;
    }>;
}>;
export type PaletteIssue = Readonly<{
    code: ColorIssue["code"] | "palette_color_unparsed";
    at: number | "ground" | "options";
    diagnostics?: readonly [ParseIssue, ...ParseIssue[]];
}>;

// The defaults are handed to every report by reference (settings.* and each
// finding's threshold), so they are frozen: a caller mutating one report must
// not move the thresholds of every later call. Overrides are frozen the same way.
const LIGHTNESS = Object.freeze({
    light: Object.freeze([0.43, 0.77] as const),
    dark: Object.freeze([0.48, 0.67] as const),
});
const DEFAULT_CHROMA: PaletteBand = Object.freeze({ target: 0.10, floor: 0.10 });
const DEFAULT_CONTRAST: PaletteBand = Object.freeze({ target: 3, floor: 1 });
const DEFAULT_NORMAL: PaletteBand = Object.freeze({ target: 0.15, floor: 0.15 });
const DEFAULT_CVD: PaletteBand = Object.freeze({ target: 0.08, floor: 0.06 });
const DEFAULT_GATE: Readonly<Record<ColorVisionKind, boolean>> = Object.freeze({ protan: true, deutan: true, tritan: false });
const KINDS: readonly ColorVisionKind[] = ["protan", "deutan", "tritan"];
const VISIONS: readonly PaletteVision[] = ["normal", ...KINDS];

type Issue = PaletteIssue["code"];
type At = PaletteIssue["at"];
const fail = <T>(code: Issue, at: At): Result<T, PaletteIssue> => ({ ok: false, error: { code, at } });

type Resolved = Readonly<{ color: AnyColor; oklch: Color<"oklch">; L: number; C: number }>;

function resolveColor(input: unknown, at: number | "ground"): Result<Resolved, PaletteIssue> {
    let color: AnyColor;
    if (typeof input === "string") {
        const parsed = parseCssColor(input);
        if (!parsed.ok) {
            return { ok: false, error: { code: "palette_color_unparsed", at, diagnostics: parsed.diagnostics } };
        }
        color = parsed.value;
    } else if (isAnyColor(input)) {
        color = input;
    } else {
        return fail("color_invalid_input", at);
    }
    if (color.alpha === "none") return fail("color_missing_alpha", at);
    if (color.alpha !== 1) return fail("color_invalid_input", at);
    const converted = convertColor(color, "oklch");
    if (!converted.ok) return fail(converted.error.code, at);
    const [L, C] = converted.value.channels;
    if (L === "none" || C === "none") return fail("color_missing_channel", at);
    return { ok: true, value: { color, oklch: converted.value, L, C } };
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

/** A banded threshold override: finite, floor ≤ target, inside `[min, max]`. */
function readBand(
    value: unknown,
    fallback: PaletteBand,
    min: number,
    max: number,
): Result<PaletteBand, PaletteIssue> {
    if (value === undefined) return { ok: true, value: fallback };
    if (!isRecord(value) || typeof value.target !== "number" || typeof value.floor !== "number") {
        return fail("color_invalid_input", "options");
    }
    const { target, floor } = value;
    if (!Number.isFinite(target) || !Number.isFinite(floor)) return fail("color_non_finite", "options");
    if (floor > target || floor < min || target > max) return fail("color_out_of_range", "options");
    return { ok: true, value: Object.freeze({ target, floor }) };
}

function readLightness(value: unknown, scheme: "light" | "dark"): Result<readonly [number, number], PaletteIssue> {
    if (value === undefined) return { ok: true, value: LIGHTNESS[scheme] };
    if (!Array.isArray(value) || value.length !== 2 || value.some((v) => typeof v !== "number")) {
        return fail("color_invalid_input", "options");
    }
    const [min, max] = value as [number, number];
    if (!Number.isFinite(min) || !Number.isFinite(max)) return fail("color_non_finite", "options");
    if (min < 0 || max > 1 || min > max) return fail("color_out_of_range", "options");
    return { ok: true, value: Object.freeze([min, max] as const) };
}

function readGate(value: unknown): Result<Readonly<Record<ColorVisionKind, boolean>>, PaletteIssue> {
    if (value === undefined) return { ok: true, value: DEFAULT_GATE };
    if (!isRecord(value)) return fail("color_invalid_input", "options");
    const gate = { ...DEFAULT_GATE };
    for (const [kind, on] of Object.entries(value)) {
        if (!(KINDS as readonly string[]).includes(kind) || typeof on !== "boolean") {
            return fail("color_invalid_input", "options");
        }
        gate[kind as ColorVisionKind] = on;
    }
    return { ok: true, value: Object.freeze(gate) };
}

/** The pair list the mode names, or the explicit list verbatim. */
function readPairs(value: unknown, n: number): Result<readonly (readonly [number, number])[], PaletteIssue> {
    const mode = value ?? "adjacent";
    if (mode === "adjacent" || mode === "cyclic") {
        const pairs: [number, number][] = [];
        for (let i = 0; i + 1 < n; i++) pairs.push([i, i + 1]);
        if (mode === "cyclic" && n >= 3) pairs.push([n - 1, 0]);
        return { ok: true, value: pairs };
    }
    if (mode === "all") {
        const pairs: [number, number][] = [];
        for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) pairs.push([i, j]);
        return { ok: true, value: pairs };
    }
    if (!Array.isArray(mode)) return fail("color_invalid_input", "options");
    const pairs: [number, number][] = [];
    for (const pair of mode as unknown[]) {
        if (!Array.isArray(pair) || pair.length !== 2 || pair.some((v) => typeof v !== "number")) {
            return fail("color_invalid_input", "options");
        }
        const [i, j] = pair as [number, number];
        if (!Number.isInteger(i) || !Number.isInteger(j) || i < 0 || j < 0 || i >= n || j >= n) {
            return fail("color_out_of_range", "options");
        }
        if (i === j) return fail("color_invalid_input", "options");
        pairs.push([i, j]);
    }
    return { ok: true, value: pairs };
}

const banded = (value: number, band: PaletteBand): "pass" | "warn" | "fail" =>
    value >= band.target ? "pass" : value >= band.floor ? "warn" : "fail";

/**
 * Checks a categorical palette, in order, for colour-vision separation and
 * legibility on its ground (VJ-1). Inputs are `AnyColor`s or any CSS `<color>`
 * text `parseCssColor` reads; a `var()` must be resolved first (pass the
 * computed value or the literal hex). The ground and every colour must be
 * opaque.
 *
 * Measured, every one reported (nothing elided), in this order: for each
 * colour its OKLCh lightness (in the band, inclusive), its OKLCh chroma, and its
 * WCAG contrast on the ground (`contrastRatio`); then for each pair its
 * normal-vision ΔEOK (`deltaEOK`, unit scale, ×100 = validate_palette.js) and
 * its ΔEOK under protan, deutan and tritan simulation (`simulateColorVision`,
 * Machado 2009, severity 1, clipped: FIXED, because the cvd thresholds are
 * calibrated on that model; call the primitives directly for another one).
 * Banded checks pass at `≥ target`, warn in `[floor, target)`, fail below
 * `floor`, on raw unrounded floats. A kind whose `gate` is false is measured
 * but reads `"info"`.
 *
 * A palette that FAILS its checks is still `ok(report)` with `verdict:
 * "fail"`; an `err` means only that the input was unusable: an empty list or a
 * bad option (`at: "options"`), or an unusable colour (`at` its index or
 * `"ground"`; text that does not parse is `palette_color_unparsed` with the
 * parser's diagnostics).
 */
export function checkCategoricalPalette(
    colors: readonly ColorInput[],
    options: CategoricalPaletteOptions,
): Result<CategoricalPaletteReport, PaletteIssue> {
    if (!isRecord(options) || !Array.isArray(colors) || colors.length === 0) {
        return fail("color_invalid_input", "options");
    }
    const resolved: Resolved[] = [];
    for (let i = 0; i < colors.length; i++) {
        const color = resolveColor(colors[i], i);
        if (!color.ok) return color;
        resolved.push(color.value);
    }
    const ground = resolveColor(options.ground, "ground");
    if (!ground.ok) return ground;
    const scheme = options.scheme;
    if (scheme !== "light" && scheme !== "dark") return fail("color_invalid_input", "options");
    const lightness = readLightness(options.lightness, scheme);
    if (!lightness.ok) return lightness;
    const chroma = readBand(options.chroma, DEFAULT_CHROMA, 0, Infinity);
    if (!chroma.ok) return chroma;
    const contrast = readBand(options.contrast, DEFAULT_CONTRAST, 1, 21);
    if (!contrast.ok) return contrast;
    const normal = readBand(options.normal, DEFAULT_NORMAL, 0, Infinity);
    if (!normal.ok) return normal;
    const cvd = readBand(options.cvd, DEFAULT_CVD, 0, Infinity);
    if (!cvd.ok) return cvd;
    const gate = readGate(options.gate);
    if (!gate.ok) return gate;
    const pairs = readPairs(options.pairs, resolved.length);
    if (!pairs.ok) return pairs;

    const findings: PaletteFinding[] = [];
    const [lo, hi] = lightness.value;
    for (let index = 0; index < resolved.length; index++) {
        const { color, L, C } = resolved[index]!;
        findings.push({ check: "lightness", index, value: L, threshold: lightness.value, verdict: L >= lo && L <= hi ? "pass" : "fail" });
        findings.push({ check: "chroma", index, value: C, threshold: chroma.value, verdict: banded(C, chroma.value) });
        const ratio = contrastRatio(color, ground.value.color);
        if (!ratio.ok) return fail(ratio.error.code, index);
        findings.push({ check: "contrast", index, value: ratio.value, threshold: contrast.value, verdict: banded(ratio.value, contrast.value) });
    }

    const simulated: Record<ColorVisionKind, AnyColor[]> = { protan: [], deutan: [], tritan: [] };
    for (const kind of KINDS) {
        for (let index = 0; index < resolved.length; index++) {
            const sim = simulateColorVision(resolved[index]!.color, { kind, method: "machado", severity: 1 });
            if (!sim.ok) return fail(sim.error.code, index);
            simulated[kind].push(sim.value);
        }
    }
    for (const pair of pairs.value) {
        const [i, j] = pair;
        for (const vision of VISIONS) {
            const distance = vision === "normal"
                ? deltaEOK(resolved[i]!.color, resolved[j]!.color)
                : deltaEOK(simulated[vision][i]!, simulated[vision][j]!);
            if (!distance.ok) return fail(distance.error.code, i);
            const threshold = vision === "normal" ? normal.value : cvd.value;
            const verdict = vision !== "normal" && !gate.value[vision] ? "info" : banded(distance.value, threshold);
            findings.push({ check: "separation", vision, pair, value: distance.value, threshold, verdict });
        }
    }

    const least = (picked: readonly PaletteFinding[], score: (finding: PaletteFinding) => number) =>
        picked.reduce<PaletteFinding | null>((best, finding) =>
            best === null || score(finding) < score(best) ? finding : best, null);
    const margin = (finding: PaletteFinding) => Math.min(finding.value - lo, hi - finding.value);
    const separation = Object.fromEntries(VISIONS.map((vision) => [
        vision,
        least(findings.filter((f) => f.check === "separation" && f.vision === vision), (f) => f.value),
    ])) as Record<PaletteVision, PaletteFinding | null>;
    const verdicts = new Set(findings.map((finding) => finding.verdict));
    const verdict = verdicts.has("fail") ? "fail" : verdicts.has("warn") ? "warn" : "pass";

    return {
        ok: true,
        value: {
            verdict,
            ok: verdict !== "fail",
            findings,
            worst: {
                lightness: least(findings.filter((f) => f.check === "lightness"), margin),
                chroma: least(findings.filter((f) => f.check === "chroma"), (f) => f.value),
                contrast: least(findings.filter((f) => f.check === "contrast"), (f) => f.value),
                separation,
            },
            colors: resolved.map((r) => r.oklch),
            ground: ground.value.oklch,
            settings: {
                scheme,
                pairs: Array.isArray(options.pairs)
                    ? pairs.value
                    : (options.pairs ?? "adjacent") as "adjacent" | "cyclic" | "all",
                lightness: lightness.value,
                chroma: chroma.value,
                contrast: contrast.value,
                normal: normal.value,
                cvd: cvd.value,
                gate: gate.value,
                method: "machado",
                severity: 1,
            },
        },
    };
}

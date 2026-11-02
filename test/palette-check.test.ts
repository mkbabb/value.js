/**
 * value.js 4.2.0 — `checkCategoricalPalette` (SPEC §7 H, COHESION §0hf · VJ-1).
 *
 * Parity: `test/fixtures/cvd/palette-parity.json` holds the borrowed
 * validate_palette.js's OWN per-colour and per-pair figures (its code, run by
 * `test/support/palette_parity.mjs`; header names the validator's sha256). value.js
 * must agree to: ΔE ×100 within 1e-4 (the two OKLab paths differ at ~4e-8), contrast
 * within 1e-9, L and C within 1e-6. Every verdict is then re-derived from the
 * validator's numbers and the documented thresholds, so a palette that should pass
 * passes and one that should fail fails at exactly the findings the validator's
 * numbers fail.
 */
import { describe, expect, it } from "vitest";

import parity from "./fixtures/cvd/palette-parity.json";
import { oklab, oklch, rgb } from "../src/color/index";
import {
    checkCategoricalPalette,
    type CategoricalPaletteOptions,
    type CategoricalPaletteReport,
    type ColorInput,
    type PaletteFinding,
} from "../src/palette";

type Palette = (typeof parity.palettes)["gregg-light"];
const PALETTES = parity.palettes as Record<string, Palette>;
const GREGG_LIGHT = PALETTES["gregg-light"]!;
const GREGG_DARK = PALETTES["gregg-dark"]!;
const ECHARTS = PALETTES["echarts-light"]!;

const unwrap = <T>(result: { ok: true; value: T } | { ok: false; error: unknown }): T => {
    if (!result.ok) throw new Error(JSON.stringify(result.error));
    return result.value;
};
const check = (colors: readonly ColorInput[], options: CategoricalPaletteOptions): CategoricalPaletteReport =>
    unwrap(checkCategoricalPalette(colors, options));
const of = (palette: Palette, extra: Partial<CategoricalPaletteOptions> = {}): CategoricalPaletteReport =>
    check(palette.colors, { ground: palette.ground, scheme: palette.scheme as "light" | "dark", ...extra });
const separations = (report: CategoricalPaletteReport, vision: string) =>
    report.findings.filter((f): f is Extract<PaletteFinding, { check: "separation" }> => f.check === "separation" && f.vision === vision);
const ofCheck = (report: CategoricalPaletteReport, name: "lightness" | "chroma" | "contrast") =>
    report.findings.filter((f): f is Exclude<PaletteFinding, { check: "separation" }> => f.check === name);

const BAND = { light: [0.43, 0.77], dark: [0.48, 0.67] } as const;
const banded = (value: number, target: number, floor: number) => value >= target ? "pass" : value >= floor ? "warn" : "fail";

describe("H. parity with validate_palette.js", () => {
    for (const [name, palette] of Object.entries(PALETTES)) {
        it(`${name}: every figure within tolerance, every verdict the validator's numbers imply (pairs: all)`, () => {
            const report = of(palette, { pairs: "all" });
            const scheme = palette.scheme as "light" | "dark";
            palette.perColor.forEach((ref, index) => {
                const [L, C, contrast] = [ofCheck(report, "lightness")[index]!, ofCheck(report, "chroma")[index]!, ofCheck(report, "contrast")[index]!];
                expect(Math.abs(L.value - ref.L), `${name} L ${ref.hex}`).toBeLessThanOrEqual(1e-6);
                expect(Math.abs(C.value - ref.C), `${name} C ${ref.hex}`).toBeLessThanOrEqual(1e-6);
                expect(Math.abs(contrast.value - ref.contrast), `${name} contrast ${ref.hex}`).toBeLessThanOrEqual(1e-9);
                expect(L.verdict).toBe(ref.L >= BAND[scheme][0] && ref.L <= BAND[scheme][1] ? "pass" : "fail");
                expect(C.verdict).toBe(banded(ref.C, 0.10, 0.10));
                expect(contrast.verdict).toBe(banded(ref.contrast, 3, 1));
            });
            for (const vision of ["normal", "protan", "deutan", "tritan"] as const) {
                const found = separations(report, vision);
                expect(found.map((f) => f.pair)).toEqual(palette.pairs.map((p) => p.pair));
                found.forEach((finding, k) => {
                    const ref = palette.pairs[k]![vision];
                    expect(Math.abs(finding.value * 100 - ref), `${name} ${vision} ${finding.pair}`).toBeLessThanOrEqual(1e-4);
                    const expected = vision === "normal" ? banded(ref / 100, 0.15, 0.15)
                        : vision === "tritan" ? "info" : banded(ref / 100, 0.08, 0.06);
                    expect(finding.verdict, `${name} ${vision} ${finding.pair}`).toBe(expected);
                });
            }
        });
    }

    it("the validator's own adjacent verdicts agree: both Gregg schemes pass, ECharts fails", () => {
        expect(GREGG_LIGHT.validator.adjacent.ok).toBe(true);
        expect(GREGG_DARK.validator.adjacent.ok).toBe(true);
        expect(ECHARTS.validator.adjacent.ok).toBe(false);
        expect(GREGG_LIGHT.validator.all.ok).toBe(false);
        expect(GREGG_DARK.validator.all.ok).toBe(false);
    });
});

describe("H. Gregg (8 colours per scheme, gregg/src/style.css), the adoption call", () => {
    it("light on #fcfcfb passes, with the seeded worst figures", () => {
        const report = of(GREGG_LIGHT);
        expect(report.verdict).toBe("pass");
        expect(report.ok).toBe(true);
        expect(report.worst.chroma).toMatchObject({ index: 6 });
        expect(report.worst.chroma!.value).toBeCloseTo(0.1004, 4);
        expect(report.worst.contrast).toMatchObject({ index: 5 });
        expect(report.worst.contrast!.value).toBeCloseTo(3.066, 3);
        expect(report.worst.separation.normal!.value).toBeCloseTo(0.1672, 4);
        expect(report.worst.separation.protan).toMatchObject({ pair: [4, 5] });
        expect(report.worst.separation.protan!.value).toBeCloseTo(0.1050, 4);
        expect(report.worst.separation.deutan!.value).toBeCloseTo(0.1398, 4);
        expect(report.worst.separation.tritan).toMatchObject({ verdict: "info" });
        expect(report.worst.separation.tritan!.value).toBeCloseTo(0.0816, 4);
        expect(report.colors).toHaveLength(8);
        expect(report.settings).toMatchObject({ scheme: "light", pairs: "adjacent", lightness: [0.43, 0.77], method: "machado", severity: 1 });
    });

    it("dark on #1a1a19 passes; its tritan worst is info, and gating tritan fails it", () => {
        const report = of(GREGG_DARK);
        expect(report.verdict).toBe("pass");
        expect(report.worst.lightness).toMatchObject({ index: 7 });
        expect(report.worst.lightness!.value).toBeCloseTo(0.6698, 4);
        expect(report.worst.contrast).toMatchObject({ index: 6 });
        expect(report.worst.contrast!.value).toBeCloseTo(3.268, 3);
        expect(report.worst.separation.normal!.value).toBeCloseTo(0.1541, 4);
        expect(report.worst.separation.protan!.value).toBeCloseTo(0.1150, 4);
        expect(report.worst.separation.deutan!.value).toBeCloseTo(0.1235, 4);
        // The adjacent tritan minimum (validator: 3.9 ×100) is #50A95C↔#5796DB, pair (1, 2), at
        // 0.038698. SPEC §7 H's seed label #50A95C↔#069892 is pair (1, 4), an all-pairs pair at
        // 0.038677; the two agree to 4 decimals, and the parity fixture wins (SPEC §7).
        expect(report.worst.separation.tritan).toMatchObject({ pair: [1, 2], verdict: "info" });
        expect(report.worst.separation.tritan!.value).toBeCloseTo(0.0387, 4);
        const gated = of(GREGG_DARK, { gate: { tritan: true } });
        expect(gated.verdict).toBe("fail");
        expect(gated.ok).toBe(false);
        expect(gated.settings.gate).toEqual({ protan: true, deutan: true, tritan: true });
    });

    it("pairs: all fails both schemes, at the seeded pairs", () => {
        const dark = of(GREGG_DARK, { pairs: "all" });
        expect(dark.verdict).toBe("fail");
        expect(dark.worst.separation.protan).toMatchObject({ pair: [3, 6], verdict: "fail" });
        expect(dark.worst.separation.protan!.value).toBeCloseTo(0.0344, 4);
        const light = of(GREGG_LIGHT, { pairs: "all" });
        expect(light.verdict).toBe("fail");
        expect(light.worst.separation.deutan).toMatchObject({ pair: [5, 7], verdict: "fail" });
        expect(light.worst.separation.deutan!.value).toBeCloseTo(0.0439, 4);
    });
});

describe("H. a palette that should fail each check (ECharts 5 default on #ffffff)", () => {
    const report = of(ECHARTS);
    const failing = (findings: readonly PaletteFinding[]) =>
        findings.filter((f) => f.verdict === "fail").map((f) => (f.check === "separation" ? `${f.vision}:${f.pair}` : `${f.check}:${f.index}`));

    it("fails, at exactly the findings the validator's numbers fail", () => {
        expect(report.verdict).toBe("fail");
        const expected: string[] = [];
        ECHARTS.perColor.forEach((ref, i) => {
            if (ref.L < 0.43 || ref.L > 0.77) expected.push(`lightness:${i}`);
            if (ref.C < 0.10) expected.push(`chroma:${i}`);
        });
        for (let i = 0; i + 1 < ECHARTS.colors.length; i++) {
            const ref = ECHARTS.pairs.find((p) => p.pair[0] === i && p.pair[1] === i + 1)!;
            if (ref.normal < 15) expected.push(`normal:${i},${i + 1}`);
            if (ref.protan < 6) expected.push(`protan:${i},${i + 1}`);
            if (ref.deutan < 6) expected.push(`deutan:${i},${i + 1}`);
        }
        expect(failing(report.findings)).toEqual(expected);
        // Each check fails somewhere: lightness (#91cc75, #fac858), chroma (#73c0de), normal, CVD.
        expect(expected).toEqual(expect.arrayContaining(["lightness:1", "lightness:2", "chroma:4", "normal:1,2"]));
        expect(expected.some((e) => e.startsWith("protan:"))).toBe(true);
    });

    it("warns, never fails, on sub-3:1 contrast by default; a {3, 3} band makes it a hard gate", () => {
        const low = ofCheck(report, "contrast").filter((f) => f.value < 3).map((f) => f.index);
        expect(low).toEqual([1, 2, 4, 6, 8]);
        for (const i of low) expect(ofCheck(report, "contrast")[i]!.verdict).toBe("warn");
        const hard = of(ECHARTS, { contrast: { target: 3, floor: 3 } });
        for (const i of low) expect(ofCheck(hard, "contrast")[i]!.verdict).toBe("fail");
    });

    it("a palette that fails ONLY on contrast reads warn, and ok stays true", () => {
        const pale = check(["#e0a000", "#008e84"], { ground: "#ffffff", scheme: "light", lightness: [0, 1] });
        expect(ofCheck(pale, "contrast").map((f) => f.verdict)).toContain("warn");
        expect(pale.findings.every((f) => f.verdict !== "fail")).toBe(true);
        expect(pale.verdict).toBe("warn");
        expect(pale.ok).toBe(true);
    });
});

describe("H. pairs, boundaries, and finding order", () => {
    const FIVE = GREGG_LIGHT.colors.slice(0, 5);
    const base = { ground: "#fcfcfb", scheme: "light" } as const;

    it("cyclic adds exactly (n−1, 0); all is every i < j; an explicit list is verbatim", () => {
        const pairsOf = (report: CategoricalPaletteReport) => separations(report, "normal").map((f) => f.pair);
        expect(pairsOf(check(FIVE, base))).toEqual([[0, 1], [1, 2], [2, 3], [3, 4]]);
        expect(pairsOf(check(FIVE, { ...base, pairs: "cyclic" }))).toEqual([[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]);
        expect(pairsOf(check(FIVE.slice(0, 2), { ...base, pairs: "cyclic" }))).toEqual([[0, 1]]);
        expect(pairsOf(check(FIVE, { ...base, pairs: "all" }))).toHaveLength(10);
        const explicit = [[3, 1], [0, 4]] as const;
        const report = check(FIVE, { ...base, pairs: explicit });
        expect(pairsOf(report)).toEqual([[3, 1], [0, 4]]);
        expect(report.settings.pairs).toEqual([[3, 1], [0, 4]]);
    });

    it("orders findings: per colour lightness, chroma, contrast; then per pair normal, protan, deutan, tritan", () => {
        const report = check(FIVE.slice(0, 3), base);
        expect(report.findings.map((f) => (f.check === "separation" ? `${f.vision}${f.pair}` : `${f.check}${f.index}`))).toEqual([
            "lightness0", "chroma0", "contrast0", "lightness1", "chroma1", "contrast1", "lightness2", "chroma2", "contrast2",
            "normal0,1", "protan0,1", "deutan0,1", "tritan0,1", "normal1,2", "protan1,2", "deutan1,2", "tritan1,2",
        ]);
    });

    it("C exactly 0.10 passes; L exactly at a band edge passes", () => {
        const edge = unwrap(oklch(0.43, 0.10, 250));
        const report = check([edge, unwrap(oklch(0.77, 0.12, 120))], { ...base, ground: "#000000", contrast: { target: 1, floor: 1 }, normal: { target: 0, floor: 0 }, cvd: { target: 0, floor: 0 } });
        expect(ofCheck(report, "lightness").map((f) => [f.value, f.verdict])).toEqual([[0.43, "pass"], [0.77, "pass"]]);
        expect(ofCheck(report, "chroma")[0]).toMatchObject({ value: 0.10, verdict: "pass" });
        const below = check([unwrap(oklch(0.4299999, 0.0999999, 250))], { ...base, ground: "#000000" });
        expect(ofCheck(below, "lightness")[0]!.verdict).toBe("fail");
        expect(ofCheck(below, "chroma")[0]!.verdict).toBe("fail");
    });

    it("ΔE exactly at the target passes and exactly at the floor warns", () => {
        const band = { target: 0.08, floor: 0.06 };
        const grey = unwrap(oklab(0.5, 0, 0));
        const opts = { ...base, lightness: [0, 1] as const, chroma: { target: 0, floor: 0 }, contrast: { target: 1, floor: 1 }, normal: band, cvd: { target: 0, floor: 0 } };
        const at = check([grey, unwrap(oklab(0.5, 0.08, 0))], opts);
        expect(separations(at, "normal")[0]).toMatchObject({ value: 0.08, verdict: "pass" });
        const floor = check([grey, unwrap(oklab(0.5, 0.06, 0))], opts);
        expect(separations(floor, "normal")[0]).toMatchObject({ value: 0.06, verdict: "warn" });
        expect(floor.verdict).toBe("warn");
        expect(floor.ok).toBe(true);
    });

    it("a duplicate colour separates by 0 under normal vision: a fail", () => {
        const report = check(["#982a6b", "#982a6b"], base);
        expect(separations(report, "normal")[0]).toMatchObject({ value: 0, verdict: "fail" });
        expect(report.verdict).toBe("fail");
    });

    it("one colour: per-colour checks run, no pairs, every separation worst is null", () => {
        const report = check(["#982a6b"], base);
        expect(report.ok).toBe(true);
        expect(report.findings).toHaveLength(3);
        expect(report.worst.separation).toEqual({ normal: null, protan: null, deutan: null, tritan: null });
    });

    it("accepts colour objects and any CSS <color> text, and reports the resolved swatches", () => {
        const objects = check([unwrap(rgb(0x98, 0x2a, 0x6b)), "oklch(0.55 0.15 150)", "rebeccapurple"], { ground: unwrap(rgb(252, 252, 251)), scheme: "light" });
        const text = check(["#982a6b", "oklch(0.55 0.15 150)", "rebeccapurple"], base);
        expect(objects.findings).toEqual(text.findings);
        expect(text.colors.every((c) => c.space === "oklch")).toBe(true);
        expect(text.ground.space).toBe("oklch");
    });
});

describe("H. unusable input is an err, never a throw", () => {
    const base = { ground: "#fcfcfb", scheme: "light" } as const;
    const issue = (colors: readonly unknown[], options: unknown) =>
        checkCategoricalPalette(colors as never, options as never);

    it("the SPEC cases", () => {
        expect(issue([], base)).toEqual({ ok: false, error: { code: "color_invalid_input", at: "options" } });
        expect(issue(["#982a6b", "transparent"], base)).toEqual({ ok: false, error: { code: "color_invalid_input", at: 1 } });
        const unresolved = issue(["var(--src-k12)"], base);
        expect(unresolved.ok).toBe(false);
        if (unresolved.ok) return;
        expect(unresolved.error).toMatchObject({ code: "palette_color_unparsed", at: 0 });
        expect(unresolved.error.diagnostics![0].code).toBe("color_context_required");
        expect(issue(["#982a6b"], { ...base, cvd: { target: 0.06, floor: 0.08 } })).toEqual({ ok: false, error: { code: "color_out_of_range", at: "options" } });
        expect(issue(["#982a6b", "#338c00", "#1a5fa0"], { ...base, pairs: [[2, 2]] })).toEqual({ ok: false, error: { code: "color_invalid_input", at: "options" } });
    });

    it("every other row of the input-error table", () => {
        expect(issue(["#982a6b"], undefined)).toEqual({ ok: false, error: { code: "color_invalid_input", at: "options" } });
        expect(issue(["#982a6b"], { ...base, ground: "nope" })).toMatchObject({ ok: false, error: { code: "palette_color_unparsed", at: "ground" } });
        expect(issue(["#982a6b"], { ...base, ground: "rgb(0 0 0 / 0.5)" })).toEqual({ ok: false, error: { code: "color_invalid_input", at: "ground" } });
        expect(issue([{ space: "rgb" }], base)).toEqual({ ok: false, error: { code: "color_invalid_input", at: 0 } });
        expect(issue([unwrap(rgb(1, 2, 3, "none"))], base)).toEqual({ ok: false, error: { code: "color_missing_alpha", at: 0 } });
        expect(issue([unwrap(rgb(1, "none", 3))], base)).toEqual({ ok: false, error: { code: "color_missing_channel", at: 0 } });
        expect(issue(["#982a6b"], { ...base, scheme: "sepia" })).toEqual({ ok: false, error: { code: "color_invalid_input", at: "options" } });
        expect(issue(["#982a6b"], { ...base, chroma: { target: Number.NaN, floor: 0.1 } })).toEqual({ ok: false, error: { code: "color_non_finite", at: "options" } });
        expect(issue(["#982a6b"], { ...base, lightness: [0.6, 0.4] })).toEqual({ ok: false, error: { code: "color_out_of_range", at: "options" } });
        expect(issue(["#982a6b"], { ...base, lightness: [0, 1.2] })).toEqual({ ok: false, error: { code: "color_out_of_range", at: "options" } });
        expect(issue(["#982a6b"], { ...base, contrast: { target: 22, floor: 3 } })).toEqual({ ok: false, error: { code: "color_out_of_range", at: "options" } });
        expect(issue(["#982a6b"], { ...base, contrast: { target: 3, floor: 0.5 } })).toEqual({ ok: false, error: { code: "color_out_of_range", at: "options" } });
        expect(issue(["#982a6b"], { ...base, normal: { target: 0.1, floor: -0.1 } })).toEqual({ ok: false, error: { code: "color_out_of_range", at: "options" } });
        expect(issue(["#982a6b", "#338c00"], { ...base, pairs: [[0, 2]] })).toEqual({ ok: false, error: { code: "color_out_of_range", at: "options" } });
        expect(issue(["#982a6b", "#338c00"], { ...base, pairs: [[0, 0.5]] })).toEqual({ ok: false, error: { code: "color_out_of_range", at: "options" } });
        expect(issue(["#982a6b", "#338c00"], { ...base, pairs: "pie" })).toEqual({ ok: false, error: { code: "color_invalid_input", at: "options" } });
        expect(issue(["#982a6b"], { ...base, gate: { achromat: true } })).toEqual({ ok: false, error: { code: "color_invalid_input", at: "options" } });
    });
});

describe("H. a report never aliases mutable shared state", () => {
    const mutate = (report: CategoricalPaletteReport) => {
        const s = report.settings as unknown as Record<string, Record<string, unknown> & unknown[]>;
        const attempts = [
            () => { s.chroma!.target = 0.5; },
            () => { s.cvd!.floor = 0.5; },
            () => { s.normal!.target = 0.9; },
            () => { s.contrast!.target = 21; },
            () => { (s.lightness as unknown as number[])[0] = 0.9; },
            () => { s.gate!.tritan = true; },
            () => { (report.findings[0]!.threshold as unknown as number[])[1] = 0.1; },
            () => { (report.findings[1]!.threshold as unknown as Record<string, number>).floor = 0.9; },
            () => { (report.findings.at(-1)!.threshold as unknown as Record<string, number>).target = 0.9; },
        ];
        for (const attempt of attempts) expect(attempt).toThrow(TypeError);
    };

    it("the default thresholds are frozen: mutating one report leaves the next call identical", () => {
        const first = of(GREGG_LIGHT);
        const snapshot = structuredClone(first);
        expect(Object.isFrozen(first.settings.chroma)).toBe(true);
        expect(Object.isFrozen(first.settings.lightness)).toBe(true);
        expect(Object.isFrozen(first.settings.gate)).toBe(true);
        mutate(first);
        const second = of(GREGG_LIGHT);
        expect(second).toEqual(snapshot);
        expect(second.verdict).toBe("pass");
        expect(of(GREGG_DARK).settings.lightness).toEqual([0.48, 0.67]);
    });

    it("override thresholds are frozen the same way", () => {
        const overrides = {
            lightness: [0.4, 0.8] as const,
            chroma: { target: 0.1, floor: 0.05 },
            contrast: { target: 3, floor: 1 },
            normal: { target: 0.15, floor: 0.1 },
            cvd: { target: 0.08, floor: 0.06 },
            gate: { tritan: true },
        };
        const first = of(GREGG_LIGHT, overrides);
        const snapshot = structuredClone(first);
        mutate(first);
        expect(of(GREGG_LIGHT, overrides)).toEqual(snapshot);
        expect(overrides.chroma).toEqual({ target: 0.1, floor: 0.05 });
    });
});

/**
 * cand-O · the CSS Color Level 4 acceptance corpus.
 *
 * Every expected value below is written as an ARITHMETIC EXPRESSION derived from
 * the specification's own definition — `(50 * 255) / 100`, `0.25 * 360`,
 * `128 / 255` — never as a decimal literal copied out of the parser's output.
 * A corpus whose expectations were transcribed from the implementation asserts
 * only that the implementation is deterministic.
 *
 * Sections: hex · named/keyword · rgb modern · rgb legacy · hsl · hwb · lab ·
 * lch · oklab · oklch · color() · clamping · missing components · case and
 * whitespace · the negative corpus (things css-color-4 makes INVALID and which
 * a lenient parser wrongly accepts).
 */

import { describe, expect, it } from "vitest";

import type { Alpha, Channel, ColorSpace, ColorSyntax } from "./ast";
import { parseColorNode } from "./index";

type Row = readonly [
    input: string,
    space: ColorSpace,
    channels: readonly [Channel, Channel, Channel],
    alpha: Alpha,
    syntax: ColorSyntax,
];

const OPAQUE = 1;

// ── <hex-color> — §6.2 ──────────────────────────────────────────────────────

const HEX: readonly Row[] = [
    ["#f00", "rgb", [255, 0, 0], OPAQUE, "hex"],
    ["#0f0", "rgb", [0, 255, 0], OPAQUE, "hex"],
    ["#00F", "rgb", [0, 0, 255], OPAQUE, "hex"],
    ["#abc", "rgb", [0xaa, 0xbb, 0xcc], OPAQUE, "hex"],
    ["#abcd", "rgb", [0xaa, 0xbb, 0xcc], 0xdd / 255, "hex"],
    ["#ff0000", "rgb", [255, 0, 0], OPAQUE, "hex"],
    ["#FFFFFF", "rgb", [255, 255, 255], OPAQUE, "hex"],
    ["#ff000080", "rgb", [255, 0, 0], 0x80 / 255, "hex"],
    ["#00000000", "rgb", [0, 0, 0], 0, "hex"],
];

// ── <named-color> · transparent — §6.1, §6.3 ────────────────────────────────

const NAMED: readonly Row[] = [
    ["red", "rgb", [255, 0, 0], OPAQUE, "named"],
    ["RED", "rgb", [255, 0, 0], OPAQUE, "named"],
    ["ReD", "rgb", [255, 0, 0], OPAQUE, "named"],
    ["rebeccapurple", "rgb", [0x66, 0x33, 0x99], OPAQUE, "named"],
    ["aliceblue", "rgb", [240, 248, 255], OPAQUE, "named"],
    ["yellowgreen", "rgb", [154, 205, 50], OPAQUE, "named"],
    ["transparent", "rgb", [0, 0, 0], 0, "transparent"],
    ["TRANSPARENT", "rgb", [0, 0, 0], 0, "transparent"],
];

// ── rgb() — §8.1 ────────────────────────────────────────────────────────────

const RGB_MODERN: readonly Row[] = [
    ["rgb(1 2 3)", "rgb", [1, 2, 3], OPAQUE, "modern"],
    ["rgb(255 255 255)", "rgb", [255, 255, 255], OPAQUE, "modern"],
    ["rgb(50% 50% 50%)", "rgb", [(50 * 255) / 100, (50 * 255) / 100, (50 * 255) / 100], OPAQUE, "modern"],
    ["rgb(1 2 3 / 0.5)", "rgb", [1, 2, 3], 0.5, "modern"],
    ["rgb(1 2 3 / 50%)", "rgb", [1, 2, 3], (50 * 1) / 100, "modern"],
    ["rgb(1 2 3/.25)", "rgb", [1, 2, 3], 0.25, "modern"],
    ["rgb(50% 2 3)", "rgb", [(50 * 255) / 100, 2, 3], OPAQUE, "modern"],
    ["rgb(+1 +2 +3)", "rgb", [1, 2, 3], OPAQUE, "modern"],
    ["rgb(.5 .5 .5)", "rgb", [0.5, 0.5, 0.5], OPAQUE, "modern"],
    ["rgb(1e2 0 0)", "rgb", [100, 0, 0], OPAQUE, "modern"],
    ["rgb(1E2 0 0)", "rgb", [100, 0, 0], OPAQUE, "modern"],
    ["rgb(2e-1 0 0)", "rgb", [0.2, 0, 0], OPAQUE, "modern"],
];

const RGB_LEGACY: readonly Row[] = [
    ["rgb(1,2,3)", "rgb", [1, 2, 3], OPAQUE, "legacy"],
    ["rgb(1, 2, 3)", "rgb", [1, 2, 3], OPAQUE, "legacy"],
    ["rgb( 1 , 2 , 3 )", "rgb", [1, 2, 3], OPAQUE, "legacy"],
    ["rgba(1,2,3,0.5)", "rgb", [1, 2, 3], 0.5, "legacy"],
    ["rgba(1,2,3,50%)", "rgb", [1, 2, 3], (50 * 1) / 100, "legacy"],
    ["rgb(1,2,3,0.5)", "rgb", [1, 2, 3], 0.5, "legacy"],
    ["rgb(50%,50%,50%)", "rgb", [(50 * 255) / 100, (50 * 255) / 100, (50 * 255) / 100], OPAQUE, "legacy"],
    ["rgba(0%,0%,0%,0)", "rgb", [0, 0, 0], 0, "legacy"],
];

// ── hsl() — §8.2 ────────────────────────────────────────────────────────────

const HSL: readonly Row[] = [
    ["hsl(120 50% 50%)", "hsl", [120, (50 * 1) / 100, (50 * 1) / 100], OPAQUE, "modern"],
    ["hsl(120 50 50)", "hsl", [120, (50 * 1) / 100, (50 * 1) / 100], OPAQUE, "modern"],
    ["hsl(120deg 50% 50%)", "hsl", [120, 0.5, 0.5], OPAQUE, "modern"],
    ["hsl(0.5turn 50% 50%)", "hsl", [0.5 * 360, 0.5, 0.5], OPAQUE, "modern"],
    ["hsl(200grad 50% 50%)", "hsl", [200 * 0.9, 0.5, 0.5], OPAQUE, "modern"],
    ["hsl(1rad 50% 50%)", "hsl", [(1 * 180) / Math.PI, 0.5, 0.5], OPAQUE, "modern"],
    ["hsl(-120 50% 50%)", "hsl", [-120, 0.5, 0.5], OPAQUE, "modern"],
    ["hsl(480 50% 50%)", "hsl", [480, 0.5, 0.5], OPAQUE, "modern"],
    ["hsl(120 50% 50% / 0.25)", "hsl", [120, 0.5, 0.5], 0.25, "modern"],
    ["hsl(120, 50%, 50%)", "hsl", [120, 0.5, 0.5], OPAQUE, "legacy"],
    ["hsla(120, 50%, 50%, 0.5)", "hsl", [120, 0.5, 0.5], 0.5, "legacy"],
    ["hsla(120deg, 50%, 50%, 25%)", "hsl", [120, 0.5, 0.5], (25 * 1) / 100, "legacy"],
];

// ── hwb() — §8.3 ────────────────────────────────────────────────────────────

const HWB: readonly Row[] = [
    ["hwb(120 0% 0%)", "hwb", [120, 0, 0], OPAQUE, "modern"],
    ["hwb(120 20% 30%)", "hwb", [120, (20 * 1) / 100, (30 * 1) / 100], OPAQUE, "modern"],
    ["hwb(120 20 30)", "hwb", [120, (20 * 1) / 100, (30 * 1) / 100], OPAQUE, "modern"],
    ["hwb(0.25turn 10% 10% / 0.5)", "hwb", [0.25 * 360, 0.1, 0.1], 0.5, "modern"],
];

// ── lab() / lch() — §9.2, §9.3 ──────────────────────────────────────────────

const LAB: readonly Row[] = [
    ["lab(50% 40 30)", "lab", [(50 * 100) / 100, 40, 30], OPAQUE, "modern"],
    ["lab(50 40 30)", "lab", [50, 40, 30], OPAQUE, "modern"],
    ["lab(0% 0 0)", "lab", [0, 0, 0], OPAQUE, "modern"],
    ["lab(100% 0 0 / 0.5)", "lab", [100, 0, 0], 0.5, "modern"],
    ["lab(50% 100% -100%)", "lab", [50, (100 * 125) / 100, (-100 * 125) / 100], OPAQUE, "modern"],
    ["lab(50 200 -200)", "lab", [50, 200, -200], OPAQUE, "modern"],
];

const LCH: readonly Row[] = [
    ["lch(50% 100% 40deg)", "lch", [50, (100 * 150) / 100, 40], OPAQUE, "modern"],
    ["lch(50 30 40)", "lch", [50, 30, 40], OPAQUE, "modern"],
    ["lch(50% 50% 0.25turn)", "lch", [50, (50 * 150) / 100, 0.25 * 360], OPAQUE, "modern"],
    ["lch(50 30 40 / 25%)", "lch", [50, 30, 40], (25 * 1) / 100, "modern"],
];

// ── oklab() / oklch() — §9.4, §9.5 ──────────────────────────────────────────

const OKLAB: readonly Row[] = [
    ["oklab(0.5 0.1 -0.1)", "oklab", [0.5, 0.1, -0.1], OPAQUE, "modern"],
    ["oklab(50% 100% -100%)", "oklab", [(50 * 1) / 100, (100 * 0.4) / 100, (-100 * 0.4) / 100], OPAQUE, "modern"],
    ["oklab(0% 0 0)", "oklab", [0, 0, 0], OPAQUE, "modern"],
];

const OKLCH: readonly Row[] = [
    ["oklch(0.7 0.15 200)", "oklch", [0.7, 0.15, 200], OPAQUE, "modern"],
    ["oklch(70% 50% 200deg)", "oklch", [(70 * 1) / 100, (50 * 0.4) / 100, 200], OPAQUE, "modern"],
    ["oklch(0.5 0.1 100 / 50%)", "oklch", [0.5, 0.1, 100], (50 * 1) / 100, "modern"],
    ["oklch(0.7 0.15 0.5turn)", "oklch", [0.7, 0.15, 0.5 * 360], OPAQUE, "modern"],
];

// ── color() — §10 ───────────────────────────────────────────────────────────

const COLOR_FN: readonly Row[] = [
    ["color(srgb 1 0 0)", "srgb", [1, 0, 0], OPAQUE, "color-function"],
    ["color(SRGB 1 0 0)", "srgb", [1, 0, 0], OPAQUE, "color-function"],
    ["color(srgb 100% 0% 0%)", "srgb", [(100 * 1) / 100, 0, 0], OPAQUE, "color-function"],
    ["color(srgb-linear 0.5 0.5 0.5)", "srgb-linear", [0.5, 0.5, 0.5], OPAQUE, "color-function"],
    ["color(display-p3 1 0 0 / 0.5)", "display-p3", [1, 0, 0], 0.5, "color-function"],
    ["color(a98-rgb 0.1 0.2 0.3)", "a98-rgb", [0.1, 0.2, 0.3], OPAQUE, "color-function"],
    ["color(prophoto-rgb 0.1 0.2 0.3)", "prophoto-rgb", [0.1, 0.2, 0.3], OPAQUE, "color-function"],
    ["color(rec2020 0.1 0.2 0.3)", "rec2020", [0.1, 0.2, 0.3], OPAQUE, "color-function"],
    ["color(xyz 0.2 0.3 0.4)", "xyz-d65", [0.2, 0.3, 0.4], OPAQUE, "color-function"],
    ["color(xyz-d65 0.2 0.3 0.4)", "xyz-d65", [0.2, 0.3, 0.4], OPAQUE, "color-function"],
    ["color(xyz-d50 0.2 0.3 0.4)", "xyz-d50", [0.2, 0.3, 0.4], OPAQUE, "color-function"],
    // §10: color() channels are NOT clamped — out-of-gamut must survive.
    ["color(srgb 1.5 -0.5 0)", "srgb", [1.5, -0.5, 0], OPAQUE, "color-function"],
];

// ── Clamping — §8.1, §8.2, §8.3, §9.2–§9.5, §4.2 ────────────────────────────

const CLAMPING: readonly Row[] = [
    ["rgb(300 400 500)", "rgb", [255, 255, 255], OPAQUE, "modern"],
    ["rgb(-10 -20 -30)", "rgb", [0, 0, 0], OPAQUE, "modern"],
    ["rgb(200% 0 0)", "rgb", [255, 0, 0], OPAQUE, "modern"],
    ["rgb(300,0,0)", "rgb", [255, 0, 0], OPAQUE, "legacy"],
    ["rgb(1 2 3 / 1.5)", "rgb", [1, 2, 3], 1, "modern"],
    ["rgb(1 2 3 / -0.5)", "rgb", [1, 2, 3], 0, "modern"],
    ["rgb(1 2 3 / 200%)", "rgb", [1, 2, 3], 1, "modern"],
    ["rgba(1,2,3,9)", "rgb", [1, 2, 3], 1, "legacy"],
    ["hsl(120 150% 50%)", "hsl", [120, 1, 0.5], OPAQUE, "modern"],
    ["hsl(120 -50% 50%)", "hsl", [120, 0, 0.5], OPAQUE, "modern"],
    ["hwb(120 -10% 200%)", "hwb", [120, 0, 1], OPAQUE, "modern"],
    ["lab(150% 40 30)", "lab", [100, 40, 30], OPAQUE, "modern"],
    ["lab(-10 40 30)", "lab", [0, 40, 30], OPAQUE, "modern"],
    ["lch(50 -30 40)", "lch", [50, 0, 40], OPAQUE, "modern"],
    ["oklab(1.5 0 0)", "oklab", [1, 0, 0], OPAQUE, "modern"],
    ["oklch(-0.5 -0.1 100)", "oklch", [0, 0, 100], OPAQUE, "modern"],
    // §7: hue is neither clamped NOR wrapped at parse time.
    ["oklch(0.5 0.1 720)", "oklch", [0.5, 0.1, 720], OPAQUE, "modern"],
    // An unrepresentable number reaches the clamp and is absorbed by it.
    ["rgb(1e400 0 0)", "rgb", [255, 0, 0], OPAQUE, "modern"],
];

// ── Missing components — §4.4 ───────────────────────────────────────────────

const NONE_CASES: readonly Row[] = [
    ["rgb(none none none)", "rgb", ["none", "none", "none"], OPAQUE, "modern"],
    ["rgb(none 2 3)", "rgb", ["none", 2, 3], OPAQUE, "modern"],
    ["rgb(1 2 3 / none)", "rgb", [1, 2, 3], "none", "modern"],
    ["rgb(NONE None nOnE)", "rgb", ["none", "none", "none"], OPAQUE, "modern"],
    ["hsl(none 50% 50%)", "hsl", ["none", 0.5, 0.5], OPAQUE, "modern"],
    ["hwb(none none none / none)", "hwb", ["none", "none", "none"], "none", "modern"],
    ["lab(50 none none)", "lab", [50, "none", "none"], OPAQUE, "modern"],
    ["oklch(none none none)", "oklch", ["none", "none", "none"], OPAQUE, "modern"],
    ["color(srgb none none none / none)", "srgb", ["none", "none", "none"], "none", "color-function"],
];

// ── Case folding and whitespace ─────────────────────────────────────────────

const SURFACE: readonly Row[] = [
    ["RGB(1 2 3)", "rgb", [1, 2, 3], OPAQUE, "modern"],
    ["RgBa(1,2,3,1)", "rgb", [1, 2, 3], 1, "legacy"],
    ["OKLCH(0.5 0.1 100)", "oklch", [0.5, 0.1, 100], OPAQUE, "modern"],
    ["  rgb(1 2 3)  ", "rgb", [1, 2, 3], OPAQUE, "modern"],
    ["\n\trgb(1 2 3)\r\n", "rgb", [1, 2, 3], OPAQUE, "modern"],
    ["rgb(  1   2   3  )", "rgb", [1, 2, 3], OPAQUE, "modern"],
    ["oklch(0.5 0.1 100  /  0.5)", "oklch", [0.5, 0.1, 100], 0.5, "modern"],
    ["hsl(120DEG 50% 50%)", "hsl", [120, 0.5, 0.5], OPAQUE, "modern"],
    ["hsl(0.5TURN 50% 50%)", "hsl", [180, 0.5, 0.5], OPAQUE, "modern"],
];

const POSITIVE: readonly Row[] = [
    ...HEX,
    ...NAMED,
    ...RGB_MODERN,
    ...RGB_LEGACY,
    ...HSL,
    ...HWB,
    ...LAB,
    ...LCH,
    ...OKLAB,
    ...OKLCH,
    ...COLOR_FN,
    ...CLAMPING,
    ...NONE_CASES,
    ...SURFACE,
];

describe("CSS Color 4 — the positive corpus", () => {
    it("is at least the 40 cases the brief asks for", () => {
        expect(POSITIVE.length).toBeGreaterThanOrEqual(40);
    });

    it("has no duplicate inputs", () => {
        const inputs = POSITIVE.map((row) => row[0]);
        expect(new Set(inputs).size).toBe(inputs.length);
    });

    it.each(POSITIVE)("%j", (input, space, channels, alpha, syntax) => {
        const result = parseColorNode(input);
        expect(result.ok).toBe(true);
        if (!result.ok) return;
        expect(result.value).toEqual({
            kind: "absolute",
            space,
            channels,
            alpha,
            syntax,
        });
    });

    it("reads a bare <number> and the same value spelled `%` identically, bit for bit", () => {
        // §8.2/§8.3 make these two synonyms; a scale factor would not.
        for (const value of ["3.1", "16.7", "50", "12.4", "0.7", "99.9"]) {
            const bare = parseColorNode(`hsl(120 ${value} ${value})`);
            const percent = parseColorNode(`hsl(120 ${value}% ${value}%)`);
            expect(bare).toEqual(percent);
        }
    });
});

// ── Context colours: recognised, not resolved ───────────────────────────────

describe("context colours", () => {
    it.each([
        ["currentColor", "currentcolor"],
        ["currentcolor", "currentcolor"],
        ["CURRENTCOLOR", "currentcolor"],
    ] as const)("%j is a currentcolor node", (input, keyword) => {
        const result = parseColorNode(input);
        expect(result.ok).toBe(true);
        if (!result.ok) return;
        expect(result.value).toEqual({
            kind: "context",
            reason: "currentcolor",
            keyword,
        });
    });

    it.each(["canvas", "buttonface", "selecteditemtext", "AccentColor"])(
        "%j is a system-colour node",
        (input) => {
            const result = parseColorNode(input);
            expect(result.ok).toBe(true);
            if (!result.ok) return;
            expect(result.value).toMatchObject({
                kind: "context",
                reason: "system-color",
            });
        },
    );

    it.each(["var(--brand)", "var(--brand, red)", "env(safe-area-inset-top)"])(
        "%j is a substitution node",
        (input) => {
            const result = parseColorNode(input);
            expect(result.ok).toBe(true);
            if (!result.ok) return;
            expect(result.value).toMatchObject({
                kind: "context",
                reason: "substitution",
            });
        },
    );

    it.each([
        "rgb(from red r g b)",
        "oklch(from var(--c) l c h / 50%)",
        "color(from red srgb r g b)",
    ])("%j is a relative-colour node", (input) => {
        const result = parseColorNode(input);
        expect(result.ok).toBe(true);
        if (!result.ok) return;
        expect(result.value).toMatchObject({ kind: "context", reason: "relative" });
    });

    /**
     * A DECLARED limitation, pinned so it cannot be mistaken for a claim.
     * cand-O recognises the relative-colour shape and stops there: validating
     * what follows `from` means implementing css-color-5's channel expressions
     * (`calc(l * 2)`, channel keywords, `r g b` in the origin's space), which
     * this prototype scopes out. So `rgb(from red)` — missing all three
     * channels — is accepted as a relative node rather than rejected.
     */
    it("KNOWN over-accept: the relative arm is recognised, not validated", () => {
        const result = parseColorNode("rgb(from red)");
        expect(result.ok).toBe(true);
        if (!result.ok) return;
        expect(result.value).toMatchObject({ kind: "context", reason: "relative" });
    });
});

// ── The negative corpus ─────────────────────────────────────────────────────
//
// Each of these is INVALID per css-color-4. Most are accepted by the incumbent
// regex parser, which is the point: an over-accepting parser is not a lenient
// parser, it is a parser that reports a colour the author did not write.

const NEGATIVE: readonly (readonly [input: string, why: string])[] = [
    ["rgb(1, 2 3)", "§8.1 — comma and space separators cannot be mixed"],
    ["rgb(1 2, 3)", "§8.1 — comma and space separators cannot be mixed"],
    ["rgb(1,2,3,)", "§8.1 — a trailing comma is not an <alpha-value>"],
    ["rgb(1 2 3 / )", "§8.1 — a slash demands an <alpha-value>"],
    ["rgb(50%, 2, 3)", "§8.1 — the legacy triple must be homogeneous"],
    ["rgb(1, 2, 50%)", "§8.1 — the legacy triple must be homogeneous"],
    ["rgb(1, 2, none)", "§4.4 — `none` is modern syntax only"],
    ["rgb(none, 2, 3)", "§4.4 — `none` is modern syntax only"],
    ["rgba(1,2,3,none)", "§4.4 — `none` is modern syntax only"],
    ["hsl(120, 50, 50)", "§8.2 — the legacy form requires <percentage>"],
    ["hsl(50% 1 1)", "§7 — <hue> is <number> | <angle>, never <percentage>"],
    ["hwb(120, 0%, 0%)", "§8.3 — hwb() has no legacy comma form"],
    ["lab(50, 40, 30)", "§9.2 — lab() has no legacy comma form"],
    ["lch(50, 30, 40)", "§9.3 — lch() has no legacy comma form"],
    ["oklab(0.5, 0.1, 0.1)", "§9.4 — oklab() has no legacy comma form"],
    ["oklch(0.5, 0.1, 100)", "§9.5 — oklch() has no legacy comma form"],
    ["color(srgb, 1, 0, 0)", "§10 — color() has no legacy comma form"],
    ["rgb(1. 2 3)", "CSS Syntax §4.3.12 — `1.` is not a <number>"],
    ["rgb(1 2)", "§8.1 — three components, not two"],
    ["rgb(1 2 3 4)", "§8.1 — three components, not four"],
    ["color(srgb 1 0)", "§10 — three components"],
    ["color(srgb 1 0 0 0)", "§10 — three components"],
    ["color(notaspace 1 0 0)", "§10 — unknown <colorspace>"],
    ["color(constructor 0 0 0)", "§10 — Object.prototype is not a <colorspace>"],
    ["color(1 0 0)", "§10 — the colourspace is an <ident>"],
    ["#1234567", "§6.2 — hex length is 3, 4, 6 or 8"],
    ["#12345", "§6.2 — hex length is 3, 4, 6 or 8"],
    ["#ff", "§6.2 — hex length is 3, 4, 6 or 8"],
    ["#gggggg", "§6.2 — hex digits are [0-9a-f]"],
    ["rgb 1 2 3", "§8.1 — a function needs its parentheses"],
    ["rgb(1 2 3", "§8.1 — unclosed function"],
    ["oklch(0.5 0.1 200", "§9.5 — unclosed function (the incumbent's crash shape)"],
    ["rgb(1 2 3))", "trailing garbage"],
    ["rgb(1 2 3) red", "trailing garbage"],
    ["red1", "§6.1 — `red1` is not a <named-color>"],
    ["reddish", "§6.1 — prefix of a name is not a name"],
    ["hsv(120 50% 50%)", "hsv() is not a CSS colour function"],
    ["kelvin(3000)", "kelvin() is not a CSS colour function"],
    ["color-mix(in oklch, red, blue)", "css-color-5 §3 — out of this prototype's scope"],
    ["light-dark(red, blue)", "css-color-5 §5 — out of this prototype's scope"],
    ["rgb(1px 2 3)", "a <dimension> is not a <number>"],
    ["hsl(120px 50% 50%)", "`px` is not an <angle> unit"],
    ["oklch(0.5 0.1 100degrees)", "`degrees` is not an <angle> unit"],
    ["rgb(fromage 1 2)", "css-color-5 §4 — `from` needs a word boundary"],
    ["var()", "css-variables-1 §3 — var() needs a <custom-property-name>"],
    ["var(brand)", "css-variables-1 §3 — a custom property starts with `--`"],
    ["env()", "css-env-1 §2 — env() needs an environment variable name"],
];

describe("CSS Color 4 — the negative corpus", () => {
    it.each(NEGATIVE)("rejects %j — %s", (input) => {
        expect(parseColorNode(input).ok).toBe(false);
    });
});

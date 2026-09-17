import { describe, expect, it } from "vitest";
import * as live from "../../../../../../../dist/subpaths/css.js";
import { NAMED_COLORS as SOURCE_NAMED_COLORS } from "../../../../../../../src/css/named-colors.js";
import {
    parseCssColor,
    serializeCssColor,
} from "../index.js";
import { NAMED_COLORS } from "../named-colors.js";
import type { CssColor, CssColorSpace, ParseResult } from "../types.js";

function gatingProjection<T>(result: ParseResult<T>): unknown {
    return result.ok
        ? { ok: true, value: result.value }
        : { ok: false, code: result.diagnostics[0].code, expected: result.diagnostics[0].expected };
}

function agreedAccept(source: string): CssColor {
    const mirror = parseCssColor(source);
    const oracle = live.parseCssColor(source);
    expect(mirror.ok, source).toBe(true);
    expect(oracle.ok, source).toBe(true);
    expect(gatingProjection(mirror), source).toEqual(gatingProjection(oracle));
    if (!mirror.ok) throw new Error(`fixture did not parse: ${source}`);
    return mirror.value;
}

function agreedReject(source: string): void {
    const mirror = parseCssColor(source);
    const oracle = live.parseCssColor(source);
    expect(mirror.ok, source).toBe(false);
    expect(oracle.ok, source).toBe(false);
}

type MatrixRow = Readonly<{
    space: CssColorSpace;
    modern: string;
    none: string;
    legacy?: string;
}>;

const COLOR_SPACE_MATRIX: readonly MatrixRow[] = [
    { space: "rgb", modern: "rgb(12 34 56 / 50%)", legacy: "rgb(12, 34, 56)", none: "rgb(none none none / none)" },
    { space: "hsl", modern: "hsl(120deg 25% 75% / 50%)", legacy: "hsl(120deg, 25%, 75%)", none: "hsl(none none none / none)" },
    { space: "hwb", modern: "hwb(120deg 10% 20% / 50%)", none: "hwb(none none none / none)" },
    { space: "lab", modern: "lab(50% 10% -10% / 50%)", none: "lab(none none none / none)" },
    { space: "lch", modern: "lch(50% 20% 30deg / 50%)", none: "lch(none none none / none)" },
    { space: "oklab", modern: "oklab(50% 10% -10% / 50%)", none: "oklab(none none none / none)" },
    { space: "oklch", modern: "oklch(50% 10% 30deg / 50%)", none: "oklch(none none none / none)" },
    { space: "xyz", modern: "color(xyz 0.1 0.2 0.3 / 50%)", none: "color(xyz none none none / none)" },
    { space: "srgb-linear", modern: "color(srgb-linear 0.1 0.2 0.3 / 50%)", none: "color(srgb-linear none none none / none)" },
    { space: "display-p3", modern: "color(display-p3 0.1 0.2 0.3 / 50%)", none: "color(display-p3 none none none / none)" },
    { space: "a98-rgb", modern: "color(a98-rgb 0.1 0.2 0.3 / 50%)", none: "color(a98-rgb none none none / none)" },
    { space: "prophoto-rgb", modern: "color(prophoto-rgb 0.1 0.2 0.3 / 50%)", none: "color(prophoto-rgb none none none / none)" },
    { space: "rec2020", modern: "color(rec2020 0.1 0.2 0.3 / 50%)", none: "color(rec2020 none none none / none)" },
] as const;

const COLOR_FUNCTION_CASES = [
    "color(srgb 1 0 0)",
    "color(srgb-linear 1 0 0)",
    "color(display-p3 1 0 0)",
    "color(a98-rgb 1 0 0)",
    "color(prophoto-rgb 1 0 0)",
    "color(rec2020 1 0 0)",
    "color(xyz 0.1 0.2 0.3)",
    "color(xyz-d65 0.1 0.2 0.3)",
    "color(xyz-d50 0.1 0.2 0.3)",
] as const;

const AGREED_REJECTS = [
    "", " ", "#", "#1", "#12", "#12345", "#1234567", "#123456789", "#ggg",
    "not-a-color", "foo", "foo(", "rgb(1)", "rgb(1 2)", "rgb(1 2 3 4)",
    "rgb(x 2 3)", "rgb(1px 2 3)", "rgb(1 2 3 / x)", "rgb(1 2 3 / .5 / .2)",
    "rgba(1,2,3,4,5)", "hsl(0 1)", "hsl(0 x 1)", "hwb(0 1px 2)", "lab(1 2)",
    "lch(1 2 3 4)", "oklab(1 x 3)", "oklch(1 2 nope)", "color(srgb 1 2)",
    "color(srgb x 2 3)", "color(nope 1 2 3)",
] as const;

describe("W2 color prototype", () => {
    it("covers all 13 output spaces across modern, none-channel, and applicable legacy forms", () => {
        expect(COLOR_SPACE_MATRIX).toHaveLength(13);
        expect(new Set(COLOR_SPACE_MATRIX.map(({ space }) => space)).size).toBe(13);
        for (const row of COLOR_SPACE_MATRIX) {
            expect(agreedAccept(row.modern).space, row.modern).toBe(row.space);
            expect(agreedAccept(row.none).space, row.none).toBe(row.space);
            if (row.legacy !== undefined) expect(agreedAccept(row.legacy).space, row.legacy).toBe(row.space);
        }
    });

    it("covers hex 3/4/6/8, transparent, and every listed color() space including D50 adaptation", () => {
        for (const source of ["#123", "#1234", "#112233", "#11223344", "transparent"] as const) {
            agreedAccept(source);
        }
        for (const source of COLOR_FUNCTION_CASES) agreedAccept(source);
        const adapted = agreedAccept("color(xyz-d50 0.1 0.2 0.3)");
        expect(adapted.space).toBe("xyz");
        expect(adapted.channels).toEqual([
            0.10990542411922578,
            0.20547454104044965,
            0.39623964949930557,
        ]);
    });

    it("exhaustively matches the source named-color table and round-trips every entry", () => {
        const names = Object.keys(NAMED_COLORS);
        expect(names).toEqual(Object.keys(SOURCE_NAMED_COLORS));
        for (const name of names) {
            const color = agreedAccept(name);
            const serialized = serializeCssColor(color);
            expect(serialized.ok, name).toBe(true);
            if (!serialized.ok) continue;
            expect(gatingProjection(parseCssColor(serialized.value)), name).toEqual({ ok: true, value: color });
        }
    });

    it("maintains a branch-diverse 50+ accept corpus and 20+ actual reject corpus", () => {
        const accepts = [
            ...COLOR_SPACE_MATRIX.flatMap(({ modern, none, legacy }) => legacy === undefined ? [modern, none] : [modern, none, legacy]),
            ...COLOR_FUNCTION_CASES,
            "#123", "#1234", "#112233", "#11223344", "transparent", "RED", "rebeccapurple",
            "rgb(100% 0% 50%)", "hsl(.5turn 25% 75%)", "hsl(200grad 25% 75%)",
            "hsl(3.141592653589793rad 25% 75%)", "rgb(1 2 3 / .5)", "rgb(1 2 3 / none)",
        ];
        expect(accepts.length).toBeGreaterThanOrEqual(50);
        expect(AGREED_REJECTS.length).toBeGreaterThanOrEqual(20);
        for (const source of accepts) agreedAccept(source);
        for (const source of AGREED_REJECTS) agreedReject(source);
    });

    it("emits the exact context and CSS-native guard diagnostics", () => {
        for (const source of ["var(--x)", "env(safe-area-inset-top)", "currentColor", "CanvasText"] as const) {
            expect(gatingProjection(parseCssColor(source)), source).toEqual({
                ok: false,
                code: "color_context_required",
                expected: ["context-free color"],
            });
            expect(gatingProjection(parseCssColor(source)), source).toEqual(gatingProjection(live.parseCssColor(source)));
        }
        for (const source of ["hsv(0 1 1)", "kelvin(6500)", "ictcp(0 0 0)", "jzazbz(0 0 0)"] as const) {
            expect(gatingProjection(parseCssColor(source)), source).toEqual({
                ok: false,
                code: "css_syntax",
                expected: ["CSS-native color"],
            });
            expect(gatingProjection(parseCssColor(source)), source).toEqual(gatingProjection(live.parseCssColor(source)));
        }
    });

    it("records CSS comment and escape tokenization as bounded spec-over-LIVE corrections", () => {
        for (const source of [
            "/**/red", "red/**/", "rgb(255/**/0/**/0)", String.raw`\72 ed`,
        ] as const) {
            expect(live.parseCssColor(source).ok, source).toBe(false);
            expect(parseCssColor(source).ok, source).toBe(true);
        }
    });

    it("enforces CSS Color 4 legacy separation and parsed-value normalization", () => {
        for (const source of [
            "rgb(1, 2%, 3)",
            "rgb(none, 2, 3)",
            "rgba(1,2,3,none)",
            "hsl(120,50,50)",
        ] as const) expect(parseCssColor(source).ok, source).toBe(false);

        expect(gatingProjection(parseCssColor("rgb(1 2 3 / 2)"))).toEqual({
            ok: true,
            value: { space: "rgb", channels: [1, 2, 3], alpha: 1 },
        });
        expect(gatingProjection(parseCssColor("rgb(1 2 3/.5)"))).toEqual({
            ok: true,
            value: { space: "rgb", channels: [1, 2, 3], alpha: 0.5 },
        });
        expect(gatingProjection(parseCssColor(String.raw`#\31 23`))).toEqual({
            ok: true,
            value: { space: "rgb", channels: [17, 34, 51], alpha: 1 },
        });
        for (const source of ["rgb(1-2-3)", "rgb(1+2+3)", "hsl(0-10-20)", "lab(50%0 0)"] as const) {
            expect(parseCssColor(source).ok, source).toBe(true);
        }
        expect(gatingProjection(parseCssColor("rgb(300 -10 20)"))).toEqual({
            ok: true,
            value: { space: "rgb", channels: [255, 0, 20], alpha: 1 },
        });
        expect(gatingProjection(parseCssColor("hsl(720 -10 50)"))).toEqual({
            ok: true,
            value: { space: "hsl", channels: [0, 0, 0.5], alpha: 1 },
        });
        expect(gatingProjection(parseCssColor("hsl(720 -10 -50)"))).toEqual({
            ok: true,
            value: { space: "hsl", channels: [0, 0, -0.5], alpha: 1 },
        });
        expect(gatingProjection(parseCssColor("lab(150% 0 0)"))).toEqual({
            ok: true,
            value: { space: "lab", channels: [100, 0, 0], alpha: 1 },
        });
        expect(gatingProjection(parseCssColor("lch(-5 -2 720)"))).toEqual({
            ok: true,
            value: { space: "lch", channels: [0, 0, 0], alpha: 1 },
        });
        expect(gatingProjection(parseCssColor("color(xyz-d50 none 0 0)"))).toEqual({
            ok: true,
            value: { space: "xyz", channels: [0, 0, 0], alpha: 1 },
        });
    });

    it("asserts R1/R3/R6/R9 as bounded expected divergences", () => {
        for (const source of ["rgb()", "rgb( )", "hsl()", "hwb()", "lab()", "lch()", "oklab()", "oklch()", "color()"] as const) {
            expect(() => live.parseCssColor(source), source).toThrow();
            expect(parseCssColor(source).ok, source).toBe(false);
        }
        for (const source of ["rgb(1 2 3 /)", "hsl(0 50% 50% /)", "color(srgb 1 0 0 /)"] as const) {
            expect(live.parseCssColor(source).ok, source).toBe(true);
            const mirror = parseCssColor(source);
            expect(mirror.ok, source).toBe(false);
            if (!mirror.ok) expect(mirror.diagnostics[0].expected).toEqual(["alpha"]);
        }
        expect(gatingProjection(parseCssColor("hsl(120 50 50)"))).toEqual({
            ok: true,
            value: { space: "hsl", channels: [120, 0.5, 0.5], alpha: 1 },
        });
        expect(gatingProjection(parseCssColor("hwb(120 10 20)"))).toEqual({
            ok: true,
            value: { space: "hwb", channels: [120, 0.1, 0.2], alpha: 1 },
        });
        expect(gatingProjection(parseCssColor("hsl(120 50 50)"))).not.toEqual(gatingProjection(live.parseCssColor("hsl(120 50 50)")));
        for (const source of [
            "rgb(255, 0 0)", "rgb(255 0, 0)", "hsl(120, 50% 50%)",
            "lab(50%, 0, 0)", "color(srgb, 1, 0, 0)",
        ] as const) {
            expect(live.parseCssColor(source).ok, source).toBe(true);
            expect(parseCssColor(source).ok, source).toBe(false);
        }
        for (const source of ["rgba(1, 2, 3, 50%)", "hsla(120deg, 25%, 75%, 50%)"] as const) {
            expect(live.parseCssColor(source).ok, source).toBe(false);
            expect(parseCssColor(source).ok, source).toBe(true);
        }
    });

    it("matches canonical serialization for every output arm and round-trips", () => {
        for (const { modern } of COLOR_SPACE_MATRIX) {
            const color = agreedAccept(modern);
            const serialized = serializeCssColor(color);
            expect(serialized, modern).toEqual(live.serializeCssColor(color));
            expect(serialized.ok, modern).toBe(true);
            if (!serialized.ok) continue;
            expect(gatingProjection(parseCssColor(serialized.value)), modern).toEqual({ ok: true, value: color });
        }
        const xyz = serializeCssColor({ space: "xyz", channels: [0.1, 0.2, 0.3], alpha: 1 });
        expect(xyz).toEqual({ ok: true, value: "color(xyz 0.1 0.2 0.3)" });
        const precise = serializeCssColor({ space: "rgb", channels: [1 / 3, 2 / 3, 1], alpha: 1 / 3 });
        expect(precise).toEqual({ ok: true, value: "rgb(0.333333333333 0.666666666667 1 / 33.333333333333%)" });
    });

    it("keeps factory/serializer guards exact, no-throw, and unfrozen", () => {
        const hostile: readonly unknown[] = [undefined, null, 0, NaN, {}, [], Symbol("color")];
        for (const value of hostile) {
            expect(() => parseCssColor(value as string)).not.toThrow();
            expect(parseCssColor(value as string).ok).toBe(false);
            expect(() => serializeCssColor(value as CssColor)).not.toThrow();
            expect(serializeCssColor(value as CssColor)).toEqual({ ok: false, error: { code: "color_invalid_input" } });
        }
        expect(serializeCssColor({ space: "rgb", channels: [NaN, 0, 0], alpha: 1 })).toEqual({ ok: false, error: { code: "color_non_finite" } });
        expect(serializeCssColor({ space: "rgb", channels: [0, 0, 0], alpha: Infinity })).toEqual({ ok: false, error: { code: "color_non_finite" } });
        expect(serializeCssColor({ space: "rgb", channels: [0, 0, 0], alpha: 2 })).toEqual({ ok: false, error: { code: "color_out_of_range" } });
        const parsed = parseCssColor("red");
        expect(parsed.ok).toBe(true);
        expect(Object.isFrozen(parsed)).toBe(false);
        if (parsed.ok) {
            expect(Object.isFrozen(parsed.value)).toBe(false);
            expect(Object.isFrozen(parsed.value.channels)).toBe(false);
        }
    });
});

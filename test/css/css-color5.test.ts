// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.b — CSS Color 4/5 over value.js's BBNF grammar (`src/css/grammar/*.bbnf`), tested against
// web-platform-tests (`wpt/`, pinned at WPT commit 5a5b2b591b39c59d5bca77819db305474dcfd18a —
// `wpt-cases.ts` reads every case out of the files). Ported from X.P.W5.c's seam suite (evidence:
// `docs/tranches/X/parse-that/evidence/W6/retired-seam/typescript/test/css-color5.test.ts`) and
// WIDENED to the coverage W6.md orders: `calc()` in channels and `color(display-p3-linear …)` are no
// longer out of scope, and relative colour is a parsed production that answers its context contract.
//
//   css/css-color/parsing/color-computed-color-mix-function.html   the resolved colour, fuzzy 0.01
//   css/css-color/parsing/color-valid-color-mix-function.html      every in-scope form parses
//   css/css-color/parsing/color-invalid-color-mix-function.html    every form is refused
//   css/css-color/parsing/color-{valid,invalid}{,-rgb,-hsl}.html   the legacy comma forms (KFA-14)
//
// SCOPE is decided by the INPUT's own bytes, one named reason each, and every class's count is
// asserted so a drift in either direction is loud:
//   concrete  a `none` CHANNEL in `color(xyz-d50 …)` / `color(display-p3-linear …)` — `CssColorSpace` has no
//             member for either space, so each is written as the exact `xyz` it names; a `none`
//             has no `xyz` channel to stay missing in and is refused (the "concrete xyz-d50"
//             contract value.js carries, extended to the second such space)
//   relative  `from` — relative colour syntax: parsed, and answered `color_context_required`
//   context   `currentcolor` · `light-dark()` · `var()` · a font/viewport-relative length inside a
//             calculation — not absolute at parse time (css-color-5 §2; css-values-4 §10), so the
//             answer is `color_context_required`, asserted
//   in        everything else — `calc()` in channels and `display-p3-linear` included

import { describe, expect, it } from "vitest";

import { parseCssColor } from "../../src/css/bbnf/index";
import { normalizeMixPercentages, resolveColorMix } from "../../src/css/bbnf/mix";
import type { CssColor, ParseResult } from "../../src/css/types";
import { loadWptCases } from "./wpt-cases";

type Channel = number | "none";
const parse = (source: string): ParseResult<CssColor> => parseCssColor(source);
const codeOf = (r: ParseResult<CssColor>): string => (r.ok ? "ok" : r.diagnostics[0].code);

const scopeOf = (s: string): string =>
    /color\(\s*(?:xyz-d50|display-p3-linear)\s[^/)]*none/i.test(s) ? "concrete"
        : /\bfrom\b/i.test(s) ? "relative"
            : /currentcolor|light-dark\(|var\(|\d(?:r?em|ex|ch|v[wh])\b/i.test(s) ? "context"
                : "in";

const tally = (keys: readonly string[]): Record<string, number> =>
    keys.reduce<Record<string, number>>((t, k) => ({ ...t, [k]: (t[k] ?? 0) + 1 }), {});

/** The numbers WPT's `getNumbers` reads off a serialization: sRGB 0..1, hsl/hwb percentages 0..100. */
const wptNumbers = (c: CssColor): Channel[] => {
    const k = c.space === "rgb" ? [1 / 255, 1 / 255, 1 / 255] : c.space === "hsl" || c.space === "hwb" ? [1, 100, 100] : [1, 1, 1];
    return [...c.channels.map((x, i) => (x === "none" ? x : x * (k[i] ?? 1))), c.alpha];
};
const HUE_INDEX: Readonly<Record<string, number>> = { hsl: 0, hwb: 0, lch: 2, oklch: 2 };
const interpolationName = (space: string): string => (space === "rgb" ? "srgb" : space === "xyz" ? "xyz-d65" : space);

/**
 * Ours, read in the expectation's own space (a one-item mix converts, css-color-5 §3.3). A LEGACY
 * serialization (`rgb(0, 0, 0)`, css-color-4 §15.2) has no way to write `none` and writes it as 0,
 * so against one a missing component reads 0 — the parse keeps `none`; the serialization drops it.
 */
function sameColor(ours: CssColor, expected: CssColor, legacySerialization: boolean): string | null {
    const got = ours.space === expected.space ? ours : resolveColorMix({ space: interpolationName(expected.space), items: [{ color: ours }] });
    if (got === null) return "not convertible";
    const a = wptNumbers(got).map((x) => (legacySerialization && x === "none" ? 0 : x));
    const b = wptNumbers(expected);
    for (let i = 0; i < 4; i++) {
        const x = a[i];
        const y = b[i];
        if (x === "none" || y === "none" || x === undefined || y === undefined) {
            if (x !== y) return `component ${i}: ${String(x)} vs ${String(y)}`;
            continue;
        }
        let d = Math.abs(x - y);
        if (HUE_INDEX[expected.space] === i) d = Math.min(d, 360 - d);
        if (!(d <= 0.01)) return `component ${i}: ${String(x)} vs ${String(y)}`; // color-testcommon.js epsilon
    }
    return null;
}

/** Every in-scope case's miss against its WPT expectation (an empty list is the pass). */
function computedMisses(cases: readonly { input: string; expected: string | undefined }[]): string[] {
    const misses: string[] = [];
    for (const c of cases.filter((x) => scopeOf(x.input) === "in")) {
        const r = parse(c.input);
        const e = parse(c.expected ?? c.input);
        if (!r.ok || !e.ok) {
            misses.push(`${c.input}: ${r.ok ? `expected ${c.expected ?? ""} unparseable` : codeOf(r)}`);
            continue;
        }
        const why = sameColor(r.value, e.value, /^\s*(?:rgba?|hsla?)\(.*,/i.test(c.expected ?? ""));
        if (why !== null) misses.push(`${c.input} → ${c.expected ?? ""}: ${why}`);
    }
    return misses;
}

describe("color-mix() — WPT color-computed-color-mix-function.html (the resolved colour)", () => {
    const cases = loadWptCases("color-computed-color-mix-function.html");

    it("reads 958 cases; the out-of-scope ones are exactly the named classes", () => {
        expect(cases.length).toBe(958);
        expect(tally(cases.map((c) => scopeOf(c.input)))).toEqual({ in: 931, concrete: 26, context: 1 });
    });

    it("every in-scope case computes to the WPT expectation within its 0.01 epsilon", () => {
        expect(computedMisses(cases)).toEqual([]);
    });

    it("the concrete class is refused as syntax; the context class answers color_context_required", () => {
        const verdicts = cases.filter((c) => scopeOf(c.input) !== "in").map((c) => `${scopeOf(c.input)}:${codeOf(parse(c.input))}`);
        expect(tally(verdicts)).toEqual({ "concrete:css_syntax": 26, "context:color_context_required": 1 });
    });
});

describe("color-mix() — WPT color-valid / color-invalid-color-mix-function.html (the grammar)", () => {
    it("every in-scope valid form parses; each out-of-scope class answers its named verdict", () => {
        const cases = loadWptCases("color-valid-color-mix-function.html");
        expect(cases.length).toBe(677);
        expect(tally(cases.map((c) => `${scopeOf(c.input)}:${codeOf(parse(c.input))}`))).toEqual({
            "in:ok": 661,
            "concrete:css_syntax": 12,
            "context:color_context_required": 4,
        });
    });

    it("every invalid form is refused", () => {
        const cases = loadWptCases("color-invalid-color-mix-function.html");
        expect(cases.length).toBe(141);
        expect(cases.filter((c) => parse(c.input).ok).map((c) => c.input)).toEqual([]);
    });
});

describe("color-mix() — css-values-5 §6.1 'normalize mix percentages' (forced), its own note's cases", () => {
    it("scales above 100%, distributes to the omitted, and reports the leftover", () => {
        expect(normalizeMixPercentages([undefined, undefined])).toEqual({ weights: [50, 50], leftover: 0 });
        expect(normalizeMixPercentages([80, 80])).toEqual({ weights: [50, 50], leftover: 0 });
        expect(normalizeMixPercentages([30, 40])).toEqual({ weights: [(30 * 100) / 70, (40 * 100) / 70], leftover: 30 });
        expect(normalizeMixPercentages([0, 0, 0])).toEqual({ weights: [0, 0, 0], leftover: 100 });
        expect(normalizeMixPercentages([50])).toEqual({ weights: [100], leftover: 50 });
    });
});

describe("color-mix() — every interpolation space and hue method is accepted, and the linear-light ones agree", () => {
    const SPACES = ["srgb", "srgb-linear", "display-p3", "display-p3-linear", "a98-rgb", "prophoto-rgb", "rec2020",
        "lab", "oklab", "xyz", "xyz-d50", "xyz-d65", "hsl", "hwb", "lch", "oklch"];
    const POLAR = ["hsl", "hwb", "lch", "oklch"];

    it("each of css-color-4 §13.1's sixteen spaces, and each polar space with each §13.5 method", () => {
        for (const s of SPACES) expect(parse(`color-mix(in ${s}, red, blue)`).ok, s).toBe(true);
        for (const s of POLAR) {
            for (const m of ["shorter", "longer", "increasing", "decreasing"]) expect(parse(`color-mix(in ${s} ${m} hue, red, blue)`).ok, `${s} ${m}`).toBe(true);
        }
        for (const s of SPACES.filter((x) => !POLAR.includes(x))) expect(parse(`color-mix(in ${s} longer hue, red, blue)`).ok, s).toBe(false);
    });

    it("a mix of opaque colours in any linear-light space is one XYZ point (a linear map commutes with the weighted mean)", () => {
        const at = (s: string): CssColor => {
            const r = parse(`color-mix(in ${s}, rgb(10% 60% 30%) 30%, color(display-p3 0.9 0.2 0.1))`);
            if (!r.ok) throw new Error(s);
            return r.value.space === "xyz" ? r.value : (resolveColorMix({ space: "xyz", items: [{ color: r.value }] }) as CssColor);
        };
        const ref = at("xyz-d65").channels as readonly number[];
        for (const s of ["srgb-linear", "display-p3-linear", "xyz", "xyz-d50"]) {
            (at(s).channels as readonly number[]).forEach((c, i) => expect(Math.abs(c - (ref[i] ?? NaN)), `${s}[${i}]`).toBeLessThan(1e-12));
        }
    });
});

describe("light-dark() — css-color-5 §2: parsed, and not an absolute colour", () => {
    const codes = (s: string): string[] => {
        const r = parse(s);
        return r.ok ? [] : r.diagnostics.map((d) => d.code);
    };

    it("reads both arms as colours and answers color_context_required, the contract currentcolor carries", () => {
        expect(codes("light-dark(white, black)")).toEqual(["color_context_required"]);
        expect(codes("light-dark(#fff, color-mix(in oklab, red, blue))")).toEqual(["color_context_required"]);
        expect(codes("currentcolor")).toEqual(["color_context_required"]);
    });

    it("refuses a malformed arm as syntax, and a context arm inside color-mix() makes the mix a context colour", () => {
        for (const bad of ["light-dark(white)", "light-dark(white, bogus)", "light-dark(white black)", "light-dark(white, black, red)"]) {
            expect(codes(bad), bad).toEqual(["css_syntax"]);
        }
        expect(codes("color-mix(in srgb, light-dark(white, black), red)")).toEqual(["color_context_required"]);
    });

    it("relative colour is a parsed production with value.js's context contract; a malformed one is syntax", () => {
        expect(codes("rgb(from red r g b)")).toEqual(["color_context_required"]);
        expect(codes("oklch(from #123456 calc(l * 0.8) c h / alpha)")).toEqual(["color_context_required"]);
        expect(codes("color(from red srgb r g b)")).toEqual(["color_context_required"]);
        expect(codes("color-mix(in srgb, rgb(from red r g b), blue)")).toEqual(["color_context_required"]);
        expect(codes("rgb(from bogus r g b)")).toEqual(["css_syntax"]);
        expect(codes("rgb(from red r g)")).toEqual(["css_syntax"]);
    });
});

// COHESION §0bn names "CSS Color 4 §5.1/§6.1"; in the current Editor's Draft `<legacy-rgb-syntax>` is
// §5.1 and `<legacy-hsl-syntax>` is §7 (§6.1 is Named Colors) — the INTENT, cited at the true bytes.
// This discharges X-W12 `.l` (retired into X.P.W6.b, COHESION §0by).
describe("KFA-14 — the legacy comma forms, css-color-4 §5.1 (rgb/rgba) and §7 (hsl/hsla)", () => {
    const legacy = (s: string): boolean => /^\s*(rgba?|hsla?)\(/i.test(s) && s.includes(",");
    const VALID = ["color-valid.html", "color-valid-rgb.html", "color-valid-hsl.html"];
    const INVALID = ["color-invalid.html", "color-invalid-rgb.html", "color-invalid-hsl.html"];

    it("KFA-14's own input, the keyframes timeline colour, parses", () => {
        expect(parse("rgba(255, 0, 0, 0.5)")).toMatchObject({ ok: true, value: { space: "rgb", channels: [255, 0, 0], alpha: 0.5 } });
        expect(parse("hsla(120, 100%, 50%, 0.25)")).toMatchObject({ ok: true, value: { space: "hsl", channels: [120, 1, 0.5], alpha: 0.25 } });
    });

    it("every in-scope WPT valid legacy form parses to the colour its WPT serialization names", () => {
        const cases = VALID.flatMap((f) => loadWptCases(f)).filter((c) => legacy(c.input));
        expect(tally(cases.map((c) => scopeOf(c.input)))).toEqual({ in: 28, context: 18 });
        expect(computedMisses(cases)).toEqual([]);
        const context = cases.filter((c) => scopeOf(c.input) === "context").map((c) => codeOf(parse(c.input)));
        expect(tally(context)).toEqual({ color_context_required: 18 });
    });

    // F-W5c-1 — RULED TO THE SPEC (COHESION §0bx; DIVERGENCE-LEDGER §14). css-color-4 §4.2 (ED) reads
    // `<alpha-value> = <number> | <percentage>` and its changelog "Made explicit that legacy forms do
    // not support none"; WPT refuses both inputs below. The grammar's `legacyAlpha` has no `none` arm.
    const F_W5C_1 = ["rgb(255, 255, 255, none)", "hsla(120, 100%, 50%, none)"];

    it("every WPT invalid legacy form is refused, the two F-W5c-1 `none`-alpha cells included", () => {
        const cases = INVALID.flatMap((f) => loadWptCases(f)).filter((c) => legacy(c.input));
        expect(tally(cases.map((c) => scopeOf(c.input)))).toEqual({ in: 49 });
        expect(cases.filter((c) => parse(c.input).ok).map((c) => c.input)).toEqual([]);
        expect(F_W5C_1.every((s) => cases.some((c) => c.input === s))).toBe(true);
    });

    it("F-W5c-1: a `none` legacy alpha is css_syntax; the modern `/ none` still parses", () => {
        for (const s of F_W5C_1) expect(codeOf(parse(s)), s).toBe("css_syntax");
        expect(parse("rgb(255 255 255 / none)")).toMatchObject({ ok: true, value: { alpha: "none" } });
        expect(parse("hsl(120 100% 50% / none)")).toMatchObject({ ok: true, value: { alpha: "none" } });
    });

    it("a legacy form never mixes numbers and percentages, and admits `none` in no channel", () => {
        for (const s of ["rgb(255, 50%, 0)", "rgb(none, 0, 0)", "hsl(none, 50%, 50%)", "hsl(120, 50, 50%)", "hwb(120, 30%, 40%)"]) {
            expect(codeOf(parse(s)), s).toBe("css_syntax");
        }
    });
});

describe("the whole of the WPT color-valid / color-invalid files (every form, not only legacy)", () => {
    const VALID = ["color-valid.html", "color-valid-rgb.html", "color-valid-hsl.html"];
    const INVALID = ["color-invalid.html", "color-invalid-rgb.html", "color-invalid-hsl.html"];

    it("every in-scope valid form computes to its serialization; the context ones answer their contract", () => {
        const cases = VALID.flatMap((f) => loadWptCases(f));
        expect(cases.length).toBe(147);
        expect(tally(cases.map((c) => `${scopeOf(c.input)}:${codeOf(parse(c.input))}`))).toEqual({
            "in:ok": 105,
            "context:color_context_required": 42,
        });
        expect(computedMisses(cases)).toEqual([]);
    });

    it("every invalid form is refused", () => {
        const cases = INVALID.flatMap((f) => loadWptCases(f));
        expect(cases.length).toBe(65);
        expect(cases.filter((c) => parse(c.input).ok).map((c) => c.input)).toEqual([]);
    });
});

describe("css-color-4 §4 — math functions in every component (SC-1), resolved at parse where absolute", () => {
    it("calc()/min()/max()/clamp()/abs()/sign() resolve, typed per channel", () => {
        expect(parse("rgb(calc(10 + 5) 0 0)")).toMatchObject({ ok: true, value: { space: "rgb", channels: [15, 0, 0] } });
        expect(parse("rgb(calc(50% + 10%) 0 0)")).toMatchObject({ ok: true, value: { channels: [153, 0, 0] } });
        expect(parse("hsl(calc(0.5turn) 50% 50%)")).toMatchObject({ ok: true, value: { channels: [180, 0.5, 0.5] } });
        expect(parse("oklch(min(0.9, 0.5) clamp(0, 0.2, 0.1) max(10deg, 20deg) / abs(-0.5))")).toMatchObject({
            ok: true, value: { space: "oklch", channels: [0.5, 0.1, 20], alpha: 0.5 },
        });
        expect(parse("rgb(calc(100 * sign(2px - 1px)) 0 0)")).toMatchObject({ ok: true, value: { channels: [100, 0, 0] } });
    });

    it("censors a calculation: NaN to the lower bound, ±infinity to the range; a hue's non-finite value is 0", () => {
        expect(parse("rgb(calc(infinity) calc(-infinity) calc(NaN))")).toMatchObject({ ok: true, value: { channels: [255, 0, 0] } });
        expect(parse("hsl(calc(infinity) 50% 50%)")).toMatchObject({ ok: true, value: { channels: [0, 0.5, 0.5] } });
        expect(parse("rgb(0 0 0 / calc(infinity))")).toMatchObject({ ok: true, value: { alpha: 1 } });
    });

    it("a type error is syntax; a font-relative or var() operand is a context verdict", () => {
        for (const s of ["rgb(calc(1px + 2) 0 0)", "rgb(calc(10% * 10%) 0 0)", "rgb(calc(r) 0 0)", "hsl(calc(10%) 50% 50%)"]) {
            expect(codeOf(parse(s)), s).toBe("css_syntax");
        }
        for (const s of ["rgb(calc(10 * sign(1em - 10px)) 0 0)", "rgb(calc(var(--x) * 1) 0 0)", "rgb(var(--r) 0 0)"]) {
            expect(codeOf(parse(s)), s).toBe("color_context_required");
        }
    });
});

describe("color(display-p3-linear …) (SC-2) — admitted, written as the exact xyz it names", () => {
    it("reads the linear-light P3 primaries through css-color-4 §18's matrix", () => {
        const r = parse("color(display-p3-linear 1 1 1)");
        expect(r.ok && r.value.space).toBe("xyz");
        const white = parse("color(xyz-d65 0.9504559270516716 1 1.0890577507598784)");
        if (!r.ok || !white.ok) throw new Error("unparsed");
        r.value.channels.forEach((c, i) => expect(Math.abs((c as number) - (white.value.channels[i] as number))).toBeLessThan(1e-12));
        expect(codeOf(parse("color(display-p3-linear none 0 0)"))).toBe("css_syntax");
        expect(parse("color(display-p3-linear 0 0 0 / none)")).toMatchObject({ ok: true, value: { alpha: "none" } });
    });
});

describe("ASCII case-insensitivity (css-syntax-3 §4) at every keyword and function name", () => {
    it("reads upper- and mixed-case spellings exactly as lower-case", () => {
        const same = (a: string, b: string) => expect(JSON.stringify(parse(a).ok && (parse(a) as { value: unknown }).value), a).toBe(JSON.stringify((parse(b) as { value: unknown }).value));
        same("RGB(NONE 0 0 / NONE)", "rgb(none 0 0 / none)");
        same("Hsl(0.5TURN 50% 50%)", "hsl(0.5turn 50% 50%)");
        same("rgb(CALC(INFINITY) MIN(1, 2) Max(1, 2))", "rgb(calc(infinity) min(1, 2) max(1, 2))");
        same("COLOR(DISPLAY-P3 1 0 0)", "color(display-p3 1 0 0)");
        same("COLOR-MIX(IN OKLCH LONGER HUE, RED, BLUE)", "color-mix(in oklch longer hue, red, blue)");
        expect(codeOf(parse("LIGHT-DARK(RED, BLUE)"))).toBe("color_context_required");
        expect(codeOf(parse("CurrentColor"))).toBe("color_context_required");
    });
});

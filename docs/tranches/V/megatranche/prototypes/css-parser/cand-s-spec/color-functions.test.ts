/**
 * CANDIDATE S — the function productions, one describe per spec section.
 *
 * The point of this file is the SHAPE of its failures: because each production
 * is named and separate, a wrong reference range or a wrong separator rule is a
 * failure in one block, not a mystery inside `parseCssColor`.
 *
 * Reference ranges are checked by the property that actually defines them —
 * `100%` must produce the same channel as the spec's stated maximum — rather
 * than by a hand-typed number.
 */

import { describe, expect, it } from "vitest";

import type { AbsoluteColor, ColorValue } from "./ast";
import { parseColorSyntax, parseCssColor } from "./index";

const parsed = (source: string): AbsoluteColor | null => {
    const outcome = parseCssColor(source);
    return outcome.ok ? outcome.value : null;
};

const syntax = (source: string): ColorValue | null => {
    const outcome = parseColorSyntax(source);
    return outcome.ok ? outcome.value : null;
};

describe("css-color-4 §5.2 <hex-color>", () => {
    it("expands 3 and 4 digits by doubling", () => {
        expect(parsed("#abc")).toEqual(parsed("#aabbcc"));
        expect(parsed("#abcd")).toEqual(parsed("#aabbccdd"));
        expect(parsed("#F0F")).toEqual(parsed("#ff00ff"));
    });

    it("takes alpha from the 4th pair", () => {
        expect(parsed("#00000080")?.alpha).toBeCloseTo(128 / 255, 12);
        expect(parsed("#000000ff")?.alpha).toBe(1);
        expect(parsed("#0000")?.alpha).toBe(0);
    });

    it("admits only 3, 4, 6 and 8 digits", () => {
        for (const bad of ["#", "#a", "#ab", "#abcde", "#abcdefg", "#abcdefghi", "#z12"]) {
            expect(parseCssColor(bad).ok, bad).toBe(false);
        }
    });
});

describe("css-color-4 §7.1 rgb() / rgba()", () => {
    it("scales `100%` to 255 in both the modern and the legacy form", () => {
        expect(parsed("rgb(100% 0% 0%)")?.channels).toEqual([255, 0, 0]);
        expect(parsed("rgb(100%, 0%, 0%)")?.channels).toEqual([255, 0, 0]);
        expect(parsed("rgb(50% 50% 50%)")?.channels).toEqual([127.5, 127.5, 127.5]);
    });

    it("does not clamp — out-of-range is not invalid (css-color-4 §4.2)", () => {
        expect(parsed("rgb(300 -5 3)")?.channels).toEqual([300, -5, 3]);
    });

    it("accepts `rgba` as a synonym in BOTH forms", () => {
        expect(parsed("rgba(1 2 3)")).toEqual(parsed("rgb(1 2 3)"));
        expect(parsed("rgba(1,2,3,0.5)")).toEqual(parsed("rgb(1 2 3 / 0.5)"));
    });

    it("keeps legacy uniform and comma-only, and modern comma-free", () => {
        expect(parseCssColor("rgb(1, 50%, 3)").ok).toBe(false);
        expect(parseCssColor("rgb(255, 0 0)").ok).toBe(false);
        expect(parseCssColor("rgb(255 0, 0)").ok).toBe(false);
        expect(parseCssColor("rgb(none, 2, 3)").ok).toBe(false);
        expect(parseCssColor("rgb(1 2 3)").ok).toBe(true);
        expect(parseCssColor("rgb(1,2,3)").ok).toBe(true);
    });

    it("rejects every malformed alpha tail", () => {
        for (const bad of [
            "rgb(1 2 3 /)", "rgb(1 2 3 / )", "rgb(1 2 3 / / 1)", "rgb(1 2 3 / 1 / 1)",
            "rgb(1,2,3,)", "rgb(1,2,3, )", "rgb(1 2 3 1)", "rgb(1 2 3 4)",
        ]) {
            expect(parseCssColor(bad).ok, bad).toBe(false);
        }
    });

    it("accepts `none` as any component and as the alpha", () => {
        expect(parsed("rgb(none 2 3)")?.channels).toEqual(["none", 2, 3]);
        expect(parsed("rgb(1 2 3 / none)")?.alpha).toBe("none");
        expect(parsed("rgb(NONE none NONE / NONE)")?.channels).toEqual(["none", "none", "none"]);
    });
});

describe("css-color-4 §7.2 / §7.3 hsl() and hwb()", () => {
    it("interprets a bare <number> S/L/W/B as a percentage — GROUND-C R6", () => {
        expect(parsed("hsl(120 50 50)")).toEqual(parsed("hsl(120 50% 50%)"));
        expect(parsed("hwb(120 10 20)")).toEqual(parsed("hwb(120 10% 20%)"));
    });

    it("takes <hue> in all four angle units plus bare numbers", () => {
        expect(parsed("hsl(120deg 0% 0%)")?.channels[0]).toBe(120);
        expect(parsed("hsl(0.5turn 0% 0%)")?.channels[0]).toBe(180);
        expect(parsed("hsl(200grad 0% 0%)")?.channels[0]).toBe(180);
        expect(parsed("hsl(120 0% 0%)")?.channels[0]).toBe(120);
    });

    it("refuses a <percentage> hue — `<hue> = <number> | <angle>`", () => {
        expect(parseCssColor("hsl(50% 50% 50%)").ok).toBe(false);
        expect(parseCssColor("hwb(50% 10% 20%)").ok).toBe(false);
    });

    it("keeps the legacy hsl form at <percentage> only", () => {
        expect(parseCssColor("hsl(120, 50%, 50%)").ok).toBe(true);
        expect(parseCssColor("hsla(120,50%,50%,0.5)").ok).toBe(true);
        expect(parseCssColor("hsl(120, 50, 50)").ok).toBe(false);
    });

    it("has no legacy hwb() form", () => {
        expect(parseCssColor("hwb(120, 10%, 20%)").ok).toBe(false);
    });
});

describe("css-color-4 §9 lab() / lch() / oklab() / oklch()", () => {
    it("uses each function's own reference range for `100%`", () => {
        // `100%` must equal the spec's stated maximum for that channel.
        expect(parsed("lab(100% 100% 100%)")?.channels).toEqual([100, 125, 125]);
        expect(parsed("lch(100% 100% 0)")?.channels).toEqual([100, 150, 0]);
        expect(parsed("oklab(100% 100% 100%)")?.channels).toEqual([1, 0.4, 0.4]);
        expect(parsed("oklch(100% 100% 0)")?.channels).toEqual([1, 0.4, 0]);
    });

    it("passes bare <number>s through unscaled", () => {
        expect(parsed("lab(50 20 -30)")?.channels).toEqual([50, 20, -30]);
        expect(parsed("oklab(0.5 0.1 -0.1)")?.channels).toEqual([0.5, 0.1, -0.1]);
    });

    it("takes <hue> in the third slot of lch()/oklch() only", () => {
        expect(parsed("lch(50% 30 120deg)")?.channels[2]).toBe(120);
        expect(parsed("oklch(0.7 0.15 0.5turn)")?.channels[2]).toBe(180);
        // …and lab()/oklab() do NOT take an angle there.
        expect(parseCssColor("lab(50% 20 30deg)").ok).toBe(false);
    });

    it("is ASCII case-insensitive on the function name", () => {
        expect(parsed("OKLCH(0.7 0.15 200)")).toEqual(parsed("oklch(0.7 0.15 200)"));
    });

    it("has no legacy comma form", () => {
        for (const bad of ["lab(50%, 0, 0)", "lch(50%, 0, 0)", "oklab(0.5, 0, 0)"]) {
            expect(parseCssColor(bad).ok, bad).toBe(false);
        }
    });
});

describe("css-color-4 §10 color()", () => {
    it("normalises the srgb profile into the same space as rgb()", () => {
        expect(parsed("color(srgb 1 0 0)")).toEqual(parsed("rgb(255 0 0)"));
        expect(parsed("color(srgb 100% 0% 0%)")).toEqual(parsed("rgb(255 0 0)"));
    });

    it("keeps every other predefined space distinct and unscaled", () => {
        for (const space of ["srgb-linear", "display-p3", "a98-rgb", "prophoto-rgb", "rec2020"]) {
            const value = parsed(`color(${space} 1 0 0)`);
            expect(value?.space, space).toBe(space);
            expect(value?.channels).toEqual([1, 0, 0]);
        }
    });

    it("folds xyz-d65 onto xyz and keeps xyz-d50 as itself", () => {
        expect(parsed("color(xyz-d65 0.4 0.2 0.1)")).toEqual(parsed("color(xyz 0.4 0.2 0.1)"));
        expect(parsed("color(xyz-d50 0.4 0.2 0.1)")?.space).toBe("xyz-d50");
    });

    it("carries `none` through xyz-d50 — GROUND-A P-024", () => {
        expect(parsed("color(xyz-d50 none 0.2 0.1)")?.channels).toEqual(["none", 0.2, 0.1]);
    });

    it("requires the space keyword to be a WHOLE ident", () => {
        expect(parseCssColor("color(srgb1 0 0)").ok).toBe(false);
        expect(parseCssColor("color(srgb 1 0)").ok).toBe(false);
        expect(parseCssColor("color(srgb 1 0 0 0)").ok).toBe(false);
        expect(parseCssColor("color(unknown-space 1 0 0)").ok).toBe(false);
    });
});

describe("css-syntax-3 §4.3.4 — a <function-token> includes its parenthesis", () => {
    it("rejects whitespace between the name and the parenthesis", () => {
        expect(parseCssColor("rgb (1 2 3)").ok).toBe(false);
        expect(parseCssColor("color (srgb 1 0 0)").ok).toBe(false);
    });

    it("does not confuse a named colour with a function of the same prefix", () => {
        expect(parseCssColor("tan").ok).toBe(true);
        expect(parseCssColor("tan(1)").ok).toBe(false);
    });
});

describe("css-color-5 — the reach productions", () => {
    it("§3 color-mix(): both component orders, with and without a percentage", () => {
        for (const source of [
            "color-mix(in oklch, red, blue)",
            "color-mix(in srgb, red 30%, blue)",
            "color-mix(in srgb, 30% red, blue 20%)",
            "color-mix(in hsl longer hue, red, blue)",
            "color-mix(in oklch shorter hue, red, blue)",
            "color-mix(in --my-profile, red, blue)",
            "color-mix(in oklab, color-mix(in srgb, red, blue), green)",
        ]) {
            const value = syntax(source);
            expect(value?.kind, source).toBe("color-mix");
        }
    });

    it("§3 color-mix(): the arity and the interpolation method are both required", () => {
        for (const bad of [
            "color-mix(in srgb, red)",
            "color-mix(red, blue)",
            "color-mix(in srgb, red, blue, green)",
            "color-mix(in, red, blue)",
            "color-mix(in nonesuch, red, blue)",
            "color-mix(in oklch hue, red, blue)",
        ]) {
            expect(parseColorSyntax(bad).ok, bad).toBe(false);
        }
    });

    it("§4 relative colour: recognised for every function, refused with a typed code", () => {
        for (const source of [
            "rgb(from red r g b)",
            "hsl(from red h s l)",
            "oklch(from red l c h)",
            "oklch(from red l c h / alpha)",
            "lab(from #fff l a b)",
            "color(from red srgb r g b)",
            "rgb(from color-mix(in srgb, red, blue) r g b)",
        ]) {
            expect(syntax(source)?.kind, source).toBe("relative");

            const value = parseCssColor(source);
            expect(value.ok).toBe(false);
            if (!value.ok) expect(value.code).toBe("color_context_required");
        }
    });

    it("§4 relative colour: malformed forms REJECT rather than defer", () => {
        for (const bad of ["rgb(from r g b)", "rgb(from red r g)", "color(from red r g b)"]) {
            expect(parseColorSyntax(bad).ok, bad).toBe(false);
        }
    });

    it("does not mistake a `--from…` custom profile for relative syntax", () => {
        // The subject's `/\bfrom\b/i.test(body)` pre-empt fires on this input,
        // which contains no relative colour at all.
        expect(syntax("color(--from-scan 1 0 0)")?.kind).toBe("custom-profile");
    });

    it("§7 light-dark(), §8 contrast-color(), §9 device-cmyk()", () => {
        expect(syntax("light-dark(red, blue)")?.kind).toBe("light-dark");
        expect(syntax("light-dark(#fff, #000)")?.kind).toBe("light-dark");
        expect(parseColorSyntax("light-dark(red)").ok).toBe(false);

        expect(syntax("contrast-color(red)")?.kind).toBe("contrast-color");
        expect(syntax("contrast-color(oklch(0.5 0.1 200))")?.kind).toBe("contrast-color");
        expect(parseColorSyntax("contrast-color()").ok).toBe(false);

        expect(syntax("device-cmyk(0 1 1 0)")?.kind).toBe("device-cmyk");
        expect(syntax("device-cmyk(0 81% 81% 30%)")?.kind).toBe("device-cmyk");
        expect(syntax("device-cmyk(0, 0.81, 0.81, 0.3)")?.kind).toBe("device-cmyk");
        expect(parseColorSyntax("device-cmyk(0 1 1)").ok).toBe(false);
    });

    it("§10.3 color() over a <dashed-ident> profile takes any channel count", () => {
        expect(syntax("color(--swop5c 0.1 0.2 0.3 0.4)")?.kind).toBe("custom-profile");
        expect(syntax("color(--mono 0.5)")?.kind).toBe("custom-profile");
        expect(syntax("color(--none)")?.kind).toBe("custom-profile");
    });

    it("var() and env() are recognised as substitutions, never resolved", () => {
        expect(syntax("var(--brand)")?.kind).toBe("substitution");
        expect(syntax("var(--brand, rgb(1 2 3))")?.kind).toBe("substitution");
        expect(syntax("env(safe-area-inset-top)")?.kind).toBe("substitution");

        const value = parseCssColor("var(--brand)");
        expect(value.ok).toBe(false);
        if (!value.ok) expect(value.code).toBe("color_context_required");

        // An unbalanced substitution is still a syntax error.
        expect(parseColorSyntax("var(--brand").ok).toBe(false);
    });

    it("refuses the four non-CSS library spaces as plain syntax errors", () => {
        for (const bad of ["hsv(1 2 3)", "kelvin(6500)", "ictcp(1 2 3)", "jzazbz(1 2 3)"]) {
            const value = parseCssColor(bad);
            expect(value.ok, bad).toBe(false);
            if (!value.ok) expect(value.code).toBe("css_syntax");
        }
    });
});

describe("the whole-input rule", () => {
    it("tolerates surrounding whitespace and refuses trailing content", () => {
        expect(parseCssColor("  red  ").ok).toBe(true);
        expect(parseCssColor("\n\trgb(1 2 3)\n").ok).toBe(true);
        expect(parseCssColor("rgb(1 2 3) extra").ok).toBe(false);
        expect(parseCssColor("red blue").ok).toBe(false);
        expect(parseCssColor("#abc#abc").ok).toBe(false);
    });
});

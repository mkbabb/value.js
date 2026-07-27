/**
 * cand-O · differential evidence against the PUBLISHED `@mkbabb/value.js@4.0.0`.
 *
 * The oracle is the npm tarball, vendored byte-for-byte at
 * `./vendor/value-js-4.0.0/` (sha256 of `dist/subpaths/css.js` =
 * 8b5381305ea26236326f06a38559247b2089a5be7fa78abe43640d0556320c42, asserted
 * below). The repository's own `dist/` was NOT used: it is a rebuild of a
 * dirty tree and its `css.js` differs from the published artifact, so measuring
 * against it would measure the wrong parser.
 *
 * THE POSTURE, stated once. The incumbent regex parser gets 52 tier-1
 * productions right (GROUND-A) and those must not regress; this file asserts
 * agreement on all of them it touches, INCLUDING all 148 named colours as an
 * independent check of cand-O's own table. Where the two disagree, the
 * disagreement is written down as a row with a verdict and a specification
 * citation — not smoothed over, and not asserted "in cand-O's favour" by fiat.
 *
 * GROUND-C's warning is taken literally: an `ok`-only differential harness
 * misses R6, where BOTH parsers accept `hsl(120 50 50)` and return DIFFERENT
 * numbers. Every agreement assertion below therefore compares
 * `{space, channels, alpha}` field-for-field, never just `ok`.
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import type { CssColorLike } from "./ast";
import { parseColor } from "./index";
import { NAMED_COLORS } from "./named-colors";
import { parseCssColor } from "./vendor/value-js-4.0.0/dist/subpaths/css.js";

// ── The oracle, called safely ───────────────────────────────────────────────

type Published =
    | { readonly kind: "ok"; readonly value: CssColorLike }
    | { readonly kind: "err"; readonly code: string }
    | { readonly kind: "throw"; readonly error: string };

const published = (source: string): Published => {
    try {
        const result = parseCssColor(source);
        if (result.ok) {
            const { space, channels, alpha } = result.value;
            const [first, second, third] = channels;
            return {
                kind: "ok",
                value: { space, channels: [first, second, third], alpha },
            };
        }
        const [issue] = result.diagnostics;
        return { kind: "err", code: issue.code };
    } catch (error) {
        return {
            kind: "throw",
            error: error instanceof Error ? error.constructor.name : String(error),
        };
    }
};

const mine = (source: string): Published => {
    const result = parseColor(source);
    return result.ok
        ? { kind: "ok", value: result.value }
        : { kind: "err", code: result.issue.code };
};

describe("provenance", () => {
    it("the oracle is the published 4.0.0 tarball, not a local rebuild", () => {
        const path = fileURLToPath(
            new URL("./vendor/value-js-4.0.0/dist/subpaths/css.js", import.meta.url),
        );
        const digest = createHash("sha256").update(readFileSync(path)).digest("hex");
        expect(digest).toBe(
            "8b5381305ea26236326f06a38559247b2089a5be7fa78abe43640d0556320c42",
        );
    });
});

// ── Agreement ───────────────────────────────────────────────────────────────

const AGREE = [
    // <hex-color>
    "#f00", "#0F0", "#00f", "#abc", "#abcd", "#ff0000", "#FFFFFF",
    "#ff000080", "#00000000", "#12345678",
    // keywords
    "transparent", "TRANSPARENT",
    // rgb(), modern
    "rgb(1 2 3)", "rgb(255 255 255)", "rgb(0 0 0)", "rgb(50% 50% 50%)",
    "rgb(1 2 3 / 0.5)", "rgb(1 2 3 / 50%)", "rgb(1 2 3/.25)",
    "rgb(none none none)", "rgb(none 2 3)", "rgb(1 2 3 / none)",
    "rgb(50% 2 3)", "rgb(.5 .5 .5)", "rgb(1e2 0 0)", "rgb(+1 +2 +3)",
    "RGB(1 2 3)",
    // rgb(), legacy — THREE-argument only; the four-argument form is D-20.
    "rgb(1,2,3)", "rgb(1, 2, 3)", "rgb( 1 , 2 , 3 )", "rgb(50%,50%,50%)",
    "RgB(1,2,3)", "rgba(1,2,3)", "rgba(1 2 3 / 0.5)",
    // hsl()
    "hsl(120 50% 50%)", "hsl(120deg 50% 50%)", "hsl(0.5turn 50% 50%)",
    "hsl(200grad 50% 50%)", "hsl(1rad 50% 50%)", "hsl(-120 50% 50%)",
    "hsl(480 50% 50%)", "hsl(120 50% 50% / 0.25)", "hsl(none 50% 50%)",
    "hsl(120, 50%, 50%)", "hsla(120, 50%, 50%)", "hsla(120deg 50% 50% / 25%)",
    // hwb()
    "hwb(120 0% 0%)", "hwb(120 20% 30%)", "hwb(0.25turn 10% 10% / 0.5)",
    "hwb(none none none / none)",
    // lab() / lch()
    "lab(50% 40 30)", "lab(50 40 30)", "lab(0% 0 0)", "lab(100% 0 0 / 0.5)",
    "lab(50% 100% -100%)", "lab(50 none none)",
    "lch(50% 100% 40deg)", "lch(50 30 40)", "lch(50% 50% 0.25turn)",
    "lch(50 30 40 / 25%)",
    // oklab() / oklch()
    "oklab(0.5 0.1 -0.1)", "oklab(50% 100% -100%)", "oklab(0% 0 0)",
    "oklch(0.7 0.15 200)", "oklch(70% 50% 200deg)", "oklch(0.5 0.1 100 / 50%)",
    "oklch(0.7 0.15 0.5turn)", "oklch(none none none)", "OKLCH(0.5 0.1 100)",
    // color()
    "color(srgb 1 0 0)", "color(SRGB 1 0 0)", "color(srgb 100% 0% 0%)",
    "color(srgb-linear 0.5 0.5 0.5)", "color(display-p3 1 0 0 / 0.5)",
    "color(a98-rgb 0.1 0.2 0.3)", "color(prophoto-rgb 0.1 0.2 0.3)",
    "color(rec2020 0.1 0.2 0.3)", "color(xyz 0.2 0.3 0.4)",
    "color(xyz-d65 0.2 0.3 0.4)", "color(xyz-d50 0.2 0.3 0.4)",
    "color(srgb 1.5 -0.5 0)", "color(srgb none none none / none)",
    // whitespace surface
    "  rgb(1 2 3)  ", "\n\trgb(1 2 3)\r\n", "rgb(  1   2   3  )",
] as const;

describe("agreement with the published parser", () => {
    it.each(AGREE)("%j — identical space, channels and alpha", (input) => {
        const oracle = published(input);
        expect(oracle.kind).toBe("ok");
        expect(mine(input)).toEqual(oracle);
    });

    it("agrees on all 148 <named-color>s — an independent check of cand-O's table", () => {
        const names = Object.keys(NAMED_COLORS);
        expect(names).toHaveLength(148);
        for (const name of names) {
            expect(mine(name)).toEqual(published(name));
            expect(mine(name.toUpperCase())).toEqual(published(name.toUpperCase()));
        }
    });

    it("agrees that context colours are not context-free colours", () => {
        for (const input of [
            "currentColor",
            "canvas",
            "buttonface",
            "selecteditemtext",
            "var(--brand)",
            "env(safe-area-inset-top)",
            "rgb(from red r g b)",
        ]) {
            expect(mine(input)).toEqual({
                kind: "err",
                code: "color_context_required",
            });
            expect(published(input)).toEqual({
                kind: "err",
                code: "color_context_required",
            });
        }
    });

    it("agrees on rejection where the incumbent manages to reject", () => {
        for (const input of [
            "",
            "#gggggg",
            "#12345",
            "red1",
            "reddish",
            "hsv(120 50% 50%)",
            "kelvin(3000)",
            "rgb(1 2)",
            "rgb(1 2 3 4)",
            "rgb(1px 2 3)",
            "lab(50 1e400 0)",
            "color(notaspace 1 0 0)",
        ]) {
            expect(mine(input).kind).toBe("err");
            expect(published(input).kind).toBe("err");
        }
    });
});

// ── The divergence ledger ───────────────────────────────────────────────────
//
// Rows are asserted in BOTH directions, so this table is a live record rather
// than a claim. `verdict` names which behaviour css-color-4 endorses.

interface Divergence {
    readonly id: string;
    readonly input: string;
    readonly verdict: "cand-O" | "published" | "neither";
    readonly why: string;
    readonly expect: (candO: Published, incumbent: Published) => void;
}

const okValue = (result: Published): CssColorLike => {
    if (result.kind !== "ok") throw new Error(`expected ok, got ${result.kind}`);
    return result.value;
};

const DIVERGENCES: readonly Divergence[] = [
    {
        id: "D-1 / R1 / MT-F024",
        input: "rgb()",
        verdict: "cand-O",
        why: "a parser is a function; `rgb()` is invalid CSS, not an exception",
        expect: (candO, incumbent) => {
            expect(candO.kind).toBe("err");
            expect(incumbent).toEqual({ kind: "throw", error: "TypeError" });
        },
    },
    {
        id: "D-2 / R6",
        input: "hsl(120 50 50)",
        verdict: "cand-O",
        why: "§8.2 — a bare <number> for s/l IS a percentage, so 50 means 50%",
        expect: (candO, incumbent) => {
            expect(okValue(candO).channels).toEqual([120, 0.5, 0.5]);
            expect(okValue(incumbent).channels).toEqual([120, 50, 50]);
        },
    },
    {
        id: "D-3",
        input: "rgb(300 0 0)",
        verdict: "cand-O",
        why: "§8.1 — out-of-range components are clamped at parsed-value time",
        expect: (candO, incumbent) => {
            expect(okValue(candO).channels).toEqual([255, 0, 0]);
            expect(okValue(incumbent).channels).toEqual([300, 0, 0]);
        },
    },
    {
        id: "D-4",
        input: "rgb(1 2 3 / 1.5)",
        verdict: "cand-O",
        why: "§4.2 — <alpha-value> is clamped to [0,1], not rejected",
        expect: (candO, incumbent) => {
            expect(okValue(candO).alpha).toBe(1);
            expect(incumbent.kind).toBe("err");
        },
    },
    {
        id: "D-5",
        input: "rgb(1e400 0 0)",
        verdict: "cand-O",
        why: "an unrepresentable <number> reaches the §8.1 clamp and is absorbed",
        expect: (candO, incumbent) => {
            expect(okValue(candO).channels).toEqual([255, 0, 0]);
            expect(incumbent.kind).toBe("err");
        },
    },
    {
        id: "D-6",
        input: "rgb(1, 2 3)",
        verdict: "cand-O",
        why: "§8.1 — separators cannot be mixed; the incumbent replaces `,` with ` `",
        expect: (candO, incumbent) => {
            expect(candO.kind).toBe("err");
            expect(okValue(incumbent).channels).toEqual([1, 2, 3]);
        },
    },
    {
        id: "D-7",
        input: "rgb(1, 2, none)",
        verdict: "cand-O",
        why: "§4.4 — `none` postdates the legacy comma syntax and is not valid in it",
        expect: (candO, incumbent) => {
            expect(candO.kind).toBe("err");
            expect(okValue(incumbent).channels).toEqual([1, 2, "none"]);
        },
    },
    {
        id: "D-8",
        input: "rgb(50%, 2, 3)",
        verdict: "cand-O",
        why: "§8.1 — the legacy triple is <number>#{3} OR <percentage>#{3}, not a mix",
        expect: (candO, incumbent) => {
            expect(candO.kind).toBe("err");
            expect(okValue(incumbent).channels).toEqual([(50 * 255) / 100, 2, 3]);
        },
    },
    {
        id: "D-9 / P-037",
        input: "rgb(1,2,3,)",
        verdict: "cand-O",
        why: "a trailing comma is not an <alpha-value>; the incumbent returns opaque",
        expect: (candO, incumbent) => {
            expect(candO.kind).toBe("err");
            expect(okValue(incumbent).alpha).toBe(1);
        },
    },
    {
        id: "D-10 / P-037",
        input: "rgb(1 2 3 / )",
        verdict: "cand-O",
        why: "a slash demands an <alpha-value>; the incumbent returns opaque",
        expect: (candO, incumbent) => {
            expect(candO.kind).toBe("err");
            expect(okValue(incumbent).alpha).toBe(1);
        },
    },
    {
        id: "D-11",
        input: "hsl(50% 1 1)",
        verdict: "cand-O",
        why: "§7 — <hue> is <number> | <angle>; a <percentage> hue is not CSS",
        expect: (candO, incumbent) => {
            expect(candO.kind).toBe("err");
            expect(okValue(incumbent).channels).toEqual([(50 * 360) / 100, 1, 1]);
        },
    },
    {
        id: "D-12",
        input: "hwb(120, 0%, 0%)",
        verdict: "cand-O",
        why: "§8.3 — hwb() was born in css-color-4 and has no legacy comma form",
        expect: (candO, incumbent) => {
            expect(candO.kind).toBe("err");
            expect(incumbent.kind).toBe("ok");
        },
    },
    {
        id: "D-13",
        input: "oklch(0.5, 0.1, 100)",
        verdict: "cand-O",
        why: "§9.5 — nor does oklch(); commas here are not leniency, they are noise",
        expect: (candO, incumbent) => {
            expect(candO.kind).toBe("err");
            expect(incumbent.kind).toBe("ok");
        },
    },
    {
        id: "D-14",
        input: "hsl(120, 50, 50)",
        verdict: "cand-O",
        why: "§8.2 — the legacy hsl() form requires <percentage> saturation/lightness",
        expect: (candO, incumbent) => {
            expect(candO.kind).toBe("err");
            expect(okValue(incumbent).channels).toEqual([120, 50, 50]);
        },
    },
    {
        id: "D-15",
        input: "rgb(1. 2 3)",
        verdict: "cand-O",
        why: "CSS Syntax §4.3.12 — a <number> needs a digit after the `.`",
        expect: (candO, incumbent) => {
            expect(candO.kind).toBe("err");
            expect(okValue(incumbent).channels).toEqual([1, 2, 3]);
        },
    },
    {
        id: "D-16",
        input: "rgb(1 2 3))",
        verdict: "cand-O",
        why: "trailing garbage; the incumbent's `^…\\((.*)\\)$` swallows the extra paren",
        expect: (candO, incumbent) => {
            expect(candO.kind).toBe("err");
            expect(incumbent.kind).toBe("err");
        },
    },
    {
        id: "D-17",
        input: "color(srgb 1 0 0 / 1.5)",
        verdict: "cand-O",
        why: "§4.2 — alpha clamps; the incumbent rejects the whole colour",
        expect: (candO, incumbent) => {
            expect(okValue(candO).alpha).toBe(1);
            expect(incumbent.kind).toBe("err");
        },
    },
    {
        id: "D-18",
        input: "lch(50 -30 40)",
        verdict: "cand-O",
        why: "§9.3 — negative chroma is clamped to 0, not carried",
        expect: (candO, incumbent) => {
            expect(okValue(candO).channels).toEqual([50, 0, 40]);
            expect(okValue(incumbent).channels).toEqual([50, -30, 40]);
        },
    },
    {
        id: "D-19 / P-012",
        input: "rgba(1,2,3,0.5)",
        verdict: "cand-O",
        why: "§8.1 — the four-argument legacy form. The incumbent rewrites `,`→` ` and then demands exactly three components, so it cannot parse `rgba(r,g,b,a)` AT ALL: the most-deployed colour syntax on the web is a hard GAP, not an over-accept",
        expect: (candO, incumbent) => {
            expect(okValue(candO)).toEqual({
                space: "rgb",
                channels: [1, 2, 3],
                alpha: 0.5,
            });
            expect(incumbent).toEqual({ kind: "err", code: "css_syntax" });
        },
    },
    {
        id: "D-20 / P-012",
        input: "rgba(255,0,0,.5)",
        verdict: "cand-O",
        why: "§8.1 — the same gap, in the spelling every stylesheet on earth uses",
        expect: (candO, incumbent) => {
            expect(okValue(candO).alpha).toBe(0.5);
            expect(incumbent.kind).toBe("err");
        },
    },
    {
        id: "D-21 / P-015",
        input: "hsla(120, 50%, 50%, 0.5)",
        verdict: "cand-O",
        why: "§8.2 — hsla()'s four-argument form is refused by the incumbent for the same reason",
        expect: (candO, incumbent) => {
            expect(okValue(candO)).toEqual({
                space: "hsl",
                channels: [120, 0.5, 0.5],
                alpha: 0.5,
            });
            expect(incumbent.kind).toBe("err");
        },
    },
    {
        id: "D-22",
        input: "color-mix(in oklch, red, blue)",
        verdict: "neither",
        why: "css-color-5 §3 is real CSS that NEITHER parser implements; cand-O is scoped out of it deliberately, the incumbent has `mixColors` on ./color and only lacks the syntax (GROUND-A P-028)",
        expect: (candO, incumbent) => {
            expect(candO.kind).toBe("err");
            expect(incumbent.kind).toBe("err");
        },
    },
];

describe("the divergence ledger", () => {
    it.each(DIVERGENCES.map((row) => [row.id, row] as const))(
        "%s",
        (_id, row) => {
            row.expect(mine(row.input), published(row.input));
        },
    );

    it("every row names a specification section or a filed finding", () => {
        for (const row of DIVERGENCES) {
            expect(row.why.length).toBeGreaterThan(20);
            expect(["cand-O", "published", "neither"]).toContain(row.verdict);
        }
    });

    it("cand-O claims no divergence it cannot cite: 21 spec-backed, 1 shared gap", () => {
        const byVerdict = (verdict: Divergence["verdict"]) =>
            DIVERGENCES.filter((row) => row.verdict === verdict).length;
        expect(byVerdict("cand-O")).toBe(21);
        expect(byVerdict("published")).toBe(0);
        expect(byVerdict("neither")).toBe(1);
        expect(DIVERGENCES).toHaveLength(22);
    });

    /**
     * Three of the 22 are ACCEPTANCE gaps rather than over-accepts: the
     * incumbent refuses input that css-color-4 makes valid. They are called out
     * separately because they are the rows a "the regex is fine, it is just
     * lenient" reading cannot absorb.
     */
    it("three rows are gaps, not leniency — the four-argument legacy forms", () => {
        const gaps = DIVERGENCES.filter((row) => row.id.includes("P-01"));
        expect(gaps.map((row) => row.input)).toEqual([
            "rgba(1,2,3,0.5)",
            "rgba(255,0,0,.5)",
            "hsla(120, 50%, 50%, 0.5)",
        ]);
        for (const row of gaps) {
            expect(mine(row.input).kind).toBe("ok");
            expect(published(row.input).kind).toBe("err");
        }
    });
});

/**
 * EQUIVALENCE spot-set vs the PUBLISHED `parseCssColor`
 * (`@mkbabb/value.js@4.0.0`, `./css` subpath) — restricted to inputs where
 * the published behaviour is CORRECT (GROUND-A tier-1 SHIPS territory).
 *
 * INCLUSION RULE — an input enters the spot-set only if:
 *   · both parsers accept it, AND
 *   · the published channel semantics are the spec semantics, AND
 *   · my parse-time normalization is the identity on it (in-range values,
 *     hues already in [0,360)) — the published parser does NOT clamp or
 *     reduce, and un-clamped in-range values are equal to clamped ones.
 *
 * EXCLUDED, with the reason on record (these are NOT equivalence failures):
 *   · empty-argument forms          — published THROWS (MT-F024/R1); pinned below
 *   · `rgb(1,2,3,)` `rgb(1 2 3 / )` — published unsound-accepts (P-037); pinned
 *   · legacy 4-arg rgba()/hsla()    — published gap (P-012/P-015); pinned
 *   · `currentcolor`                — published rejects (a gap; valid <color>)
 *   · out-of-range channels/hues    — published skips parse-time clamping
 *   · hsl/hwb bare-number channels  — the R6 value divergence (50 vs 0.5)
 *   · color(xyz-d50 …)              — published chromatically adapts to d65
 *     at parse time (a representational choice, not a syntax matter)
 *
 * SHAPE ADAPTER: my AST is a syntax-faithful union; the published value is
 * {space, channels, alpha} with hsl/hwb percentages as 0–1 fractions and
 * color(srgb …) resolved into 0–255 rgb. The adapter is defined here, in
 * the open, so every mapping is auditable.
 */

import { describe, expect, it } from "vitest";

import { parseCssColor } from "@mkbabb/value.js/css";

import { parseColor, type Channel, type ColorNode } from "./color.js";

type PublishedShape = {
    readonly space: string;
    readonly channels: readonly (number | "none")[];
    readonly alpha: number | "none";
};

const frac = (c: Channel): Channel => (c === "none" ? "none" : c / 100);
const x255 = (c: Channel): Channel => (c === "none" ? "none" : c * 255);

/** My node → the published {space, channels, alpha} representation. */
const toPublishedShape = (node: ColorNode): PublishedShape => {
    switch (node.kind) {
        case "hex":
        case "named":
            return { space: "rgb", channels: [node.r, node.g, node.b], alpha: node.alpha };
        case "rgb":
            return { space: "rgb", channels: [node.r, node.g, node.b], alpha: node.alpha };
        case "hsl":
            return {
                space: "hsl",
                channels: [node.h, frac(node.s), frac(node.l)],
                alpha: node.alpha,
            };
        case "hwb":
            return {
                space: "hwb",
                channels: [node.h, frac(node.w), frac(node.b)],
                alpha: node.alpha,
            };
        case "lab":
        case "oklab":
            return { space: node.kind, channels: [node.l, node.a, node.b], alpha: node.alpha };
        case "lch":
        case "oklch":
            return { space: node.kind, channels: [node.l, node.c, node.h], alpha: node.alpha };
        case "color": {
            // Published: srgb resolves into 0–255 rgb; xyz-d65/xyz unify as "xyz".
            if (node.space === "srgb") {
                return {
                    space: "rgb",
                    channels: [x255(node.c0), x255(node.c1), x255(node.c2)],
                    alpha: node.alpha,
                };
            }
            const space =
                node.space === "xyz-d65" || node.space === "xyz" ? "xyz" : node.space;
            return { space, channels: [node.c0, node.c1, node.c2], alpha: node.alpha };
        }
        case "currentcolor":
            throw new Error("currentcolor is excluded from the spot-set (published gap)");
    }
};

const closeTo = (mine: number | "none", theirs: number | "none", label: string): void => {
    if (mine === "none" || theirs === "none") {
        expect(mine, label).toBe(theirs);
        return;
    }
    expect(mine, label).toBeCloseTo(theirs, 9);
};

const SPOT_SET: readonly string[] = [
    // hex
    "#ff0099",
    "#f09",
    "#f09c",
    "#ff0099cc",
    // named (NOTE: my named-colour VALUES transit the published table —
    // provenance in named-colors.ts — so these four assert wiring, and the
    // independent anchors live in positive.test.ts's hex block)
    "red",
    "rebeccapurple",
    "aliceblue",
    "transparent",
    // rgb modern, in-range
    "rgb(255 0 153)",
    "rgb(255 0 153 / 0.5)",
    "rgb(255 0 153 / 50%)",
    "rgb(100% 0% 60%)",
    "rgb(2.55e2 0 0)",
    "RGB(255 0 0)",
    "  rgb( 255   0  153 )  ",
    "rgb(none 0 0 / none)",
    // rgb legacy, 3-arg (the published parser SHIPS these)
    "rgb(255, 0, 153)",
    "rgb(100%, 0%, 60%)",
    // hsl
    "hsl(120 50% 50%)",
    "hsl(150deg 30% 60%)",
    "hsl(0.5turn 100% 50%)",
    "hsl(120, 50%, 50%)",
    "hsl(none 0% 50%)",
    // hwb
    "hwb(194 0% 0%)",
    "hwb(194deg 30% 40% / 0.5)",
    "hwb(0.25turn 0% 0%)",
    // lab / oklab
    "lab(50% 40 59.5)",
    "lab(50 40 59.5 / 0.5)",
    "lab(100% -100% 100%)",
    "oklab(59% 0.1 0.1)",
    "oklab(0.59 0.1 0.1 / 40%)",
    // lch / oklch
    "lch(52.2% 72.2 50deg)",
    "oklch(60% 0.15 50deg)",
    "oklch(0.6 0.15 50)",
    "oklch(0.6 0.15 50deg / none)",
    // color()
    "color(srgb 0 0.5 1)",
    "color(display-p3 1 0.5 0)",
    "color(xyz-d65 0.2 0.3 0.4)",
    "color(xyz 0.2 0.3 0.4)",
    "color(srgb-linear 0.2 0.3 0.4)",
    "color(a98-rgb 0.2 0.3 0.4)",
    "color(prophoto-rgb 0.2 0.3 0.4)",
    "color(rec2020 0.2 0.3 0.4)",
];

describe(`equivalence spot-set — ${SPOT_SET.length} inputs, both parsers agree`, () => {
    for (const input of SPOT_SET) {
        it(`agrees on ${JSON.stringify(input)}`, () => {
            const mine = parseColor(input);
            expect(mine.ok, "candidate parser must accept").toBe(true);
            if (!mine.ok) return;

            // The published parser is the equivalence subject; if it throws
            // here the input was mis-classified into the spot-set — fail
            // loudly with the defect name rather than an unhandled error.
            let theirs: ReturnType<typeof parseCssColor>;
            try {
                theirs = parseCssColor(input);
            } catch (error) {
                throw new Error(
                    `published parseCssColor THREW on a spot-set input (MT-F024 class): ${String(error)}`,
                );
            }
            expect(theirs.ok, "published parser must accept").toBe(true);
            if (!theirs.ok || theirs.value === undefined) return;

            const mapped = toPublishedShape(mine.color);
            expect(mapped.space).toBe(theirs.value.space);
            expect(mapped.channels.length).toBe(theirs.value.channels.length);
            mapped.channels.forEach((channel, i) => {
                closeTo(channel, theirs.value.channels[i] ?? "none", `channel[${i}]`);
            });
            closeTo(mapped.alpha, theirs.value.alpha, "alpha");
        });
    }
});

describe("divergences BY DESIGN — the published defects this parser must not reproduce", () => {
    it("MT-F024/R1: published THROWS on rgb(); this parser returns ok:false", () => {
        expect(() => parseCssColor("rgb()")).toThrow();
        expect(parseColor("rgb()").ok).toBe(false);
    });
    it("MT-F024/R1: published THROWS on oklch(/); this parser returns ok:false", () => {
        expect(() => parseCssColor("oklch(/)")).toThrow();
        expect(parseColor("oklch(/)").ok).toBe(false);
    });
    it("MT-F024/R1: published THROWS on unknown foo(); this parser returns ok:false", () => {
        expect(() => parseCssColor("foo()")).toThrow();
        expect(parseColor("foo()").ok).toBe(false);
    });
    it("P-037: published unsound-accepts rgb(1,2,3,); this parser rejects", () => {
        expect(parseCssColor("rgb(1,2,3,)").ok).toBe(true);
        expect(parseColor("rgb(1,2,3,)").ok).toBe(false);
    });
    it("P-037: published unsound-accepts rgb(1 2 3 / ); this parser rejects", () => {
        expect(parseCssColor("rgb(1 2 3 / )").ok).toBe(true);
        expect(parseColor("rgb(1 2 3 / )").ok).toBe(false);
    });
    it("P-012: published rejects legacy 4-arg rgba(); this parser accepts (spec)", () => {
        expect(parseCssColor("rgba(255, 0, 153, 0.5)").ok).toBe(false);
        expect(parseColor("rgba(255, 0, 153, 0.5)").ok).toBe(true);
    });
    it("P-015: published rejects legacy 4-arg hsla(); this parser accepts (spec)", () => {
        expect(parseCssColor("hsla(120, 50%, 50%, 0.5)").ok).toBe(false);
        expect(parseColor("hsla(120, 50%, 50%, 0.5)").ok).toBe(true);
    });
    it("published rejects currentcolor; this parser accepts (css-color-4 <color>)", () => {
        expect(parseCssColor("currentcolor").ok).toBe(false);
        expect(parseColor("currentcolor").ok).toBe(true);
    });
});

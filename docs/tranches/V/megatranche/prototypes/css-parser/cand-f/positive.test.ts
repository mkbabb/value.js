/**
 * CSS Color 4 POSITIVE corpus — every acceptance asserts the FULL AST node
 * (kind, every channel, alpha), not just `ok`. Clamping, percentage scaling,
 * hue-unit conversion, `none`, case-folding and whitespace tolerance are all
 * pinned here against the normalization policy declared in color.ts.
 */

import { describe, expect, it } from "vitest";

import { parseColor, type ColorNode } from "./color.js";

const ok = (input: string): ColorNode => {
    const result = parseColor(input);
    if (!result.ok) {
        throw new Error(
            `expected ok for ${JSON.stringify(input)}, failed at offset ${result.offset}`,
        );
    }
    return result.color;
};

/** Table case: input → exact expected node (float-exact values only). */
const cases: ReadonlyArray<readonly [string, ColorNode]> = [
    // ── hex ── (independent value anchors for the named-colour table too)
    ["#f09", { kind: "hex", r: 255, g: 0, b: 153, alpha: 1 }],
    ["#F09", { kind: "hex", r: 255, g: 0, b: 153, alpha: 1 }],
    ["#ff0099", { kind: "hex", r: 255, g: 0, b: 153, alpha: 1 }],
    ["#FF0099", { kind: "hex", r: 255, g: 0, b: 153, alpha: 1 }],
    ["#f09c", { kind: "hex", r: 255, g: 0, b: 153, alpha: 204 / 255 }],
    ["#ff0099cc", { kind: "hex", r: 255, g: 0, b: 153, alpha: 204 / 255 }],
    ["#000000", { kind: "hex", r: 0, g: 0, b: 0, alpha: 1 }],
    ["#ffffff00", { kind: "hex", r: 255, g: 255, b: 255, alpha: 0 }],

    // ── named colours + special keywords ──
    ["red", { kind: "named", name: "red", r: 255, g: 0, b: 0, alpha: 1 }],
    ["RED", { kind: "named", name: "red", r: 255, g: 0, b: 0, alpha: 1 }],
    [
        "rebeccapurple",
        { kind: "named", name: "rebeccapurple", r: 102, g: 51, b: 153, alpha: 1 },
    ],
    [
        "AliceBlue",
        { kind: "named", name: "aliceblue", r: 240, g: 248, b: 255, alpha: 1 },
    ],
    ["transparent", { kind: "named", name: "transparent", r: 0, g: 0, b: 0, alpha: 0 }],
    ["currentcolor", { kind: "currentcolor" }],
    ["CurrentColor", { kind: "currentcolor" }],

    // ── rgb()/rgba() modern ──
    ["rgb(255 0 153)", { kind: "rgb", syntax: "modern", r: 255, g: 0, b: 153, alpha: 1 }],
    [
        "rgb(255 0 153 / 0.5)",
        { kind: "rgb", syntax: "modern", r: 255, g: 0, b: 153, alpha: 0.5 },
    ],
    [
        "rgb(255 0 153 / 50%)",
        { kind: "rgb", syntax: "modern", r: 255, g: 0, b: 153, alpha: 0.5 },
    ],
    ["rgb(100% 0% 60%)", { kind: "rgb", syntax: "modern", r: 255, g: 0, b: 153, alpha: 1 }],
    // modern syntax may MIX number and percentage (§5.1 modern grammar)
    ["rgb(255 0% 153)", { kind: "rgb", syntax: "modern", r: 255, g: 0, b: 153, alpha: 1 }],
    ["rgb(2.55e2 0 0)", { kind: "rgb", syntax: "modern", r: 255, g: 0, b: 0, alpha: 1 }],
    ["RGB(255 0 0)", { kind: "rgb", syntax: "modern", r: 255, g: 0, b: 0, alpha: 1 }],
    ["rgba(255 0 153 / 1)", { kind: "rgb", syntax: "modern", r: 255, g: 0, b: 153, alpha: 1 }],
    [
        "  rgb( 255   0  153 )  ",
        { kind: "rgb", syntax: "modern", r: 255, g: 0, b: 153, alpha: 1 },
    ],
    // clamping at parsed-value time (§5.1)
    ["rgb(300 0 0)", { kind: "rgb", syntax: "modern", r: 255, g: 0, b: 0, alpha: 1 }],
    ["rgb(-10 0 0)", { kind: "rgb", syntax: "modern", r: 0, g: 0, b: 0, alpha: 1 }],
    ["rgb(110% 0% 0%)", { kind: "rgb", syntax: "modern", r: 255, g: 0, b: 0, alpha: 1 }],
    ["rgb(0 0 0 / 1.5)", { kind: "rgb", syntax: "modern", r: 0, g: 0, b: 0, alpha: 1 }],
    ["rgb(0 0 0 / -25%)", { kind: "rgb", syntax: "modern", r: 0, g: 0, b: 0, alpha: 0 }],
    // none (§4.4)
    [
        "rgb(none none none)",
        { kind: "rgb", syntax: "modern", r: "none", g: "none", b: "none", alpha: 1 },
    ],
    [
        "rgb(255 NONE 0 / none)",
        { kind: "rgb", syntax: "modern", r: 255, g: "none", b: 0, alpha: "none" },
    ],

    // ── rgb()/rgba() legacy ──
    ["rgb(255, 0, 153)", { kind: "rgb", syntax: "legacy", r: 255, g: 0, b: 153, alpha: 1 }],
    [
        "rgb(255, 0, 153, 0.5)",
        { kind: "rgb", syntax: "legacy", r: 255, g: 0, b: 153, alpha: 0.5 },
    ],
    [
        "rgba(255, 0, 153, 50%)",
        { kind: "rgb", syntax: "legacy", r: 255, g: 0, b: 153, alpha: 0.5 },
    ],
    [
        "rgb(100%, 0%, 60%)",
        { kind: "rgb", syntax: "legacy", r: 255, g: 0, b: 153, alpha: 1 },
    ],
    [
        "rgba(300, -5, 153, 2)",
        { kind: "rgb", syntax: "legacy", r: 255, g: 0, b: 153, alpha: 1 },
    ],

    // ── hsl()/hsla() ──
    ["hsl(150 30% 60%)", { kind: "hsl", syntax: "modern", h: 150, s: 30, l: 60, alpha: 1 }],
    [
        "hsl(150deg 30% 60% / 0.8)",
        { kind: "hsl", syntax: "modern", h: 150, s: 30, l: 60, alpha: 0.8 },
    ],
    [
        "hsl(0.5turn 100% 50%)",
        { kind: "hsl", syntax: "modern", h: 180, s: 100, l: 50, alpha: 1 },
    ],
    [
        "hsl(200grad 100% 50%)",
        { kind: "hsl", syntax: "modern", h: 180, s: 100, l: 50, alpha: 1 },
    ],
    // modern hsl accepts bare numbers for s/l (they share the 0–100 scale)
    ["hsl(120 50 50)", { kind: "hsl", syntax: "modern", h: 120, s: 50, l: 50, alpha: 1 }],
    // hue reduced mod 360 into [0,360) (§6.1)
    ["hsl(480 50% 50%)", { kind: "hsl", syntax: "modern", h: 120, s: 50, l: 50, alpha: 1 }],
    [
        "hsl(-120 50% 50%)",
        { kind: "hsl", syntax: "modern", h: 240, s: 50, l: 50, alpha: 1 },
    ],
    // s/l clamped to [0,100]
    [
        "hsl(120 -10% 150%)",
        { kind: "hsl", syntax: "modern", h: 120, s: 0, l: 100, alpha: 1 },
    ],
    [
        "hsl(none 0% 50%)",
        { kind: "hsl", syntax: "modern", h: "none", s: 0, l: 50, alpha: 1 },
    ],
    ["hsl(120, 50%, 50%)", { kind: "hsl", syntax: "legacy", h: 120, s: 50, l: 50, alpha: 1 }],
    [
        "hsla(120, 50%, 50%, 0.5)",
        { kind: "hsl", syntax: "legacy", h: 120, s: 50, l: 50, alpha: 0.5 },
    ],
    [
        "hsla(120deg, 50%, 50%)",
        { kind: "hsl", syntax: "legacy", h: 120, s: 50, l: 50, alpha: 1 },
    ],

    // ── hwb() ──
    ["hwb(194 0% 0%)", { kind: "hwb", h: 194, w: 0, b: 0, alpha: 1 }],
    ["hwb(194deg 30% 40% / 50%)", { kind: "hwb", h: 194, w: 30, b: 40, alpha: 0.5 }],
    ["hwb(none 20% 30%)", { kind: "hwb", h: "none", w: 20, b: 30, alpha: 1 }],
    ["hwb(194 12 34)", { kind: "hwb", h: 194, w: 12, b: 34, alpha: 1 }],
    // w/b clamped [0,100]; w+b > 100 is NOT renormalized at parse time
    ["hwb(194 -5% 120%)", { kind: "hwb", h: 194, w: 0, b: 100, alpha: 1 }],
    ["hwb(90 60% 60%)", { kind: "hwb", h: 90, w: 60, b: 60, alpha: 1 }],

    // ── lab() / oklab() ──
    ["lab(50% 40 59.5)", { kind: "lab", l: 50, a: 40, b: 59.5, alpha: 1 }],
    ["lab(50 40 59.5 / 0.5)", { kind: "lab", l: 50, a: 40, b: 59.5, alpha: 0.5 }],
    // L clamped below at 0; above 100 PERMITTED (HDR, §9.1)
    ["lab(-10 0 0)", { kind: "lab", l: 0, a: 0, b: 0, alpha: 1 }],
    ["lab(120 0 0)", { kind: "lab", l: 120, a: 0, b: 0, alpha: 1 }],
    // a/b percentage scale: 100% = ±125
    ["lab(100% -100% 100%)", { kind: "lab", l: 100, a: -125, b: 125, alpha: 1 }],
    ["lab(none none none / none)", { kind: "lab", l: "none", a: "none", b: "none", alpha: "none" }],
    ["oklab(0.59 0.1 0.1)", { kind: "oklab", l: 0.59, a: 0.1, b: 0.1, alpha: 1 }],
    ["oklab(59% 0.1 0.1 / 40%)", { kind: "oklab", l: 0.59, a: 0.1, b: 0.1, alpha: 0.4 }],
    ["OKLab(1.5 0 0)", { kind: "oklab", l: 1.5, a: 0, b: 0, alpha: 1 }],

    // ── lch() / oklch() ──
    ["lch(52.2% 72.2 50)", { kind: "lch", l: 52.2, c: 72.2, h: 50, alpha: 1 }],
    ["lch(52.2 72.2 50deg / 0.5)", { kind: "lch", l: 52.2, c: 72.2, h: 50, alpha: 0.5 }],
    // chroma clamped below at 0; C percentage scale 100% = 150
    ["lch(52.2 -30 50)", { kind: "lch", l: 52.2, c: 0, h: 50, alpha: 1 }],
    ["lch(52.2% 200% 50)", { kind: "lch", l: 52.2, c: 300, h: 50, alpha: 1 }],
    ["oklch(0.6 0.15 50)", { kind: "oklch", l: 0.6, c: 0.15, h: 50, alpha: 1 }],
    ["oklch(60% 0.15 50deg / none)", { kind: "oklch", l: 0.6, c: 0.15, h: 50, alpha: "none" }],
    ["oklch(0.6 -0.1 50)", { kind: "oklch", l: 0.6, c: 0, h: 50, alpha: 1 }],
    ["oklch(0.6 0.15 0.25turn)", { kind: "oklch", l: 0.6, c: 0.15, h: 90, alpha: 1 }],
    ["oklch(0.6 0.15 none)", { kind: "oklch", l: 0.6, c: 0.15, h: "none", alpha: 1 }],

    // ── color() ──
    ["color(srgb 0 0.5 1)", { kind: "color", space: "srgb", c0: 0, c1: 0.5, c2: 1, alpha: 1 }],
    [
        "color(display-p3 1 0.5 0 / 0.5)",
        { kind: "color", space: "display-p3", c0: 1, c1: 0.5, c2: 0, alpha: 0.5 },
    ],
    [
        "color(xyz-d65 0.2 0.3 0.4)",
        { kind: "color", space: "xyz-d65", c0: 0.2, c1: 0.3, c2: 0.4, alpha: 1 },
    ],
    [
        "color(rec2020 2 0 0)", // out-of-gamut UNCLAMPED (§11)
        { kind: "color", space: "rec2020", c0: 2, c1: 0, c2: 0, alpha: 1 },
    ],
    [
        "color(srgb 50% 0.5 none)",
        { kind: "color", space: "srgb", c0: 0.5, c1: 0.5, c2: "none", alpha: 1 },
    ],
    [
        "COLOR(XYZ-D50 0 0 0)",
        { kind: "color", space: "xyz-d50", c0: 0, c1: 0, c2: 0, alpha: 1 },
    ],
];

describe(`positive corpus — ${cases.length} exact-node cases`, () => {
    for (const [input, expected] of cases) {
        it(`parses ${JSON.stringify(input)}`, () => {
            expect(ok(input)).toEqual(expected);
        });
    }
});

describe("float-scaled percentages (binary-float tolerant)", () => {
    it("oklab a/b percentage scale: 100% = ±0.4", () => {
        const node = ok("oklab(0.59 100% -50%)");
        if (node.kind !== "oklab") throw new Error("wrong kind");
        expect(node.a).toBeCloseTo(0.4, 12);
        expect(node.b).toBeCloseTo(-0.2, 12);
    });
    it("oklch chroma percentage scale: 100% = 0.4", () => {
        const node = ok("oklch(0.6 40% 50)");
        if (node.kind !== "oklch") throw new Error("wrong kind");
        expect(node.c).toBeCloseTo(0.16, 12);
    });
    it("rad hue converts through 180/π", () => {
        const node = ok("hsl(3.14159265358979rad 100% 50%)");
        if (node.kind !== "hsl") throw new Error("wrong kind");
        expect(node.h).toBeCloseTo(180, 9);
    });
    it("legacy percentage rgb scales by 255/100", () => {
        const node = ok("rgb(50%, 50%, 50%)");
        if (node.kind !== "rgb") throw new Error("wrong kind");
        expect(node.r).toBeCloseTo(127.5, 12);
    });
});

describe("scientific notation and number-token shapes (css-syntax §4.3.12)", () => {
    it("accepts exponents, leading dots and explicit signs", () => {
        expect(ok("rgb(1e2 .5 +153)")).toEqual({
            kind: "rgb",
            syntax: "modern",
            r: 100,
            g: 0.5,
            b: 153,
            alpha: 1,
        });
    });
    it("rejects a bare trailing dot (not a CSS number)", () => {
        expect(parseColor("rgb(1. 2 3)").ok).toBe(false);
    });
});

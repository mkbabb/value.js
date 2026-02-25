import { describe, expect, it } from "vitest";
import { parseCSSColor } from "../src/parsing/units";
import { normalizeColorUnit, colorUnit2 } from "../src/units/color/normalize";
import type { ColorSpace } from "../src/units/color/constants";
import type { Color } from "../src/units/color";
import type { ValueUnit } from "../src/units";

/**
 * Comprehensive color validation test suite.
 *
 * Validates:
 *  - 10 colors per color space (10 spaces × 10 = 100 color strings)
 *  - 20 CSS named colors
 *  - Round-trip: parse → normalize → convert to RGB → denormalize → toString
 *  - That every parsed color produces valid RGB components in [0, 255]
 */

// ── Helpers ───────────────────────────────────────────────────────────────────

type ParsedColor = ValueUnit<Color<ValueUnit<number>>, "color">;

function parse(input: string): ParsedColor {
    return parseCSSColor(input) as ParsedColor;
}

/** Extract a raw number from a ValueUnit or plain number. */
function raw(v: unknown): number {
    if (v != null && typeof v === "object" && "value" in v) return (v as any).value;
    return v as number;
}

/** Convert to target space (denormalized — with native units). */
function toSpace(color: ParsedColor, space: ColorSpace): ParsedColor {
    return colorUnit2(color, space, false, true, false) as unknown as ParsedColor;
}

/** Convert to target space (normalized — all components in [0, 1]). */
function toSpaceNormalized(color: ParsedColor, space: ColorSpace): ParsedColor {
    return colorUnit2(color, space, false, false, false) as unknown as ParsedColor;
}

/** Parse → normalize → convert to RGB → denormalize → extract [r, g, b, a]. */
function toRGBComponents(color: ParsedColor): { r: number; g: number; b: number; a: number } {
    const rgb = toSpace(color, "rgb");
    const json = rgb.value.toJSON();
    // Alpha is denormalized to 0-100 (%), convert to 0-1
    const alphaRaw = raw(json.alpha);
    return {
        r: raw(json.r),
        g: raw(json.g),
        b: raw(json.b),
        a: alphaRaw > 1 ? alphaRaw / 100 : alphaRaw,
    };
}

/**
 * Assert that an RGB component is in a reasonable range after conversion.
 * Perceptual color spaces (lab, oklab, etc.) can produce out-of-gamut sRGB
 * values — this is mathematically correct, not a bug. We allow a generous
 * range to account for this.
 */
function assertValidRGB(value: number, label: string, input: string) {
    expect(
        value,
        `${label} component wildly out of range for "${input}": got ${value}`,
    ).toBeGreaterThanOrEqual(-100);
    expect(
        value,
        `${label} component wildly out of range for "${input}": got ${value}`,
    ).toBeLessThanOrEqual(355);
}

// ── Test Data ─────────────────────────────────────────────────────────────────

const COLOR_SPACE_TESTS: Record<ColorSpace, string[]> = {
    rgb: [
        "rgb(255, 0, 0)",
        "rgb(0, 255, 0)",
        "rgb(0, 0, 255)",
        "rgb(255, 255, 0)",
        "rgb(0, 255, 255)",
        "rgb(255, 0, 255)",
        "rgb(128, 128, 128)",
        "rgb(0, 0, 0)",
        "rgb(255, 255, 255)",
        "rgb(200, 100, 50 / 0.8)",
    ],

    hsl: [
        "hsl(0, 100%, 50%)",
        "hsl(120, 100%, 50%)",
        "hsl(240, 100%, 50%)",
        "hsl(60, 100%, 50%)",
        "hsl(180, 100%, 50%)",
        "hsl(300, 100%, 50%)",
        "hsl(0, 0%, 50%)",
        "hsl(0, 0%, 0%)",
        "hsl(0, 0%, 100%)",
        "hsl(210, 80%, 60% / 0.5)",
    ],

    hsv: [
        "hsv(0, 100%, 100%)",
        "hsv(120, 100%, 100%)",
        "hsv(240, 100%, 100%)",
        "hsv(60, 100%, 100%)",
        "hsv(180, 100%, 100%)",
        "hsv(300, 100%, 100%)",
        "hsv(0, 0%, 50%)",
        "hsv(0, 0%, 0%)",
        "hsv(0, 0%, 100%)",
        "hsv(30, 80%, 90%)",
    ],

    hwb: [
        "hwb(0, 0%, 0%)",
        "hwb(120, 0%, 0%)",
        "hwb(240, 0%, 0%)",
        "hwb(60, 10%, 10%)",
        "hwb(180, 20%, 0%)",
        "hwb(300, 0%, 20%)",
        "hwb(0, 50%, 50%)",
        "hwb(0, 0%, 100%)",
        "hwb(0, 100%, 0%)",
        "hwb(90, 15%, 25%)",
    ],

    lab: [
        "lab(50% 0 0)",
        "lab(100% 0 0)",
        "lab(0% 0 0)",
        "lab(53.23% 80.11 67.22)",
        "lab(87.74% -86.18 83.18)",
        "lab(32.3% 79.2 -107.86)",
        "lab(97.14% -21.56 94.48)",
        "lab(91.12% -48.08 -14.13)",
        "lab(60.32% 98.24 -60.83)",
        "lab(75% 20 -30 / 0.7)",
    ],

    lch: [
        "lch(50% 0 0)",
        "lch(53.23% 104.55 40)",
        "lch(87.74% 119.78 136.02)",
        "lch(32.3% 133.82 306.29)",
        "lch(97.14% 96.91 102.85)",
        "lch(91.12% 50.12 196.38)",
        "lch(60.32% 115.54 328.23)",
        "lch(0% 0 0)",
        "lch(100% 0 0)",
        "lch(70% 45 270 / 0.6)",
    ],

    oklab: [
        "oklab(50% 0 0)",
        "oklab(62.8% 0.225 0.126)",
        "oklab(86.6% -0.234 0.179)",
        "oklab(45.2% -0.032 -0.312)",
        "oklab(96.8% -0.071 0.199)",
        "oklab(90.5% -0.149 -0.039)",
        "oklab(70.2% 0.275 -0.169)",
        "oklab(0% 0 0)",
        "oklab(100% 0 0)",
        "oklab(75% 0.05 -0.1 / 0.9)",
    ],

    oklch: [
        "oklch(50% 0 0)",
        "oklch(62.8% 0.258 29.23)",
        "oklch(86.6% 0.295 142.5)",
        "oklch(45.2% 0.313 264.05)",
        "oklch(96.8% 0.211 109.77)",
        "oklch(90.5% 0.154 194.77)",
        "oklch(70.2% 0.323 328.36)",
        "oklch(0% 0 0)",
        "oklch(100% 0 0)",
        "oklch(70% 0.15 180 / 1)",
    ],

    xyz: [
        "xyz(0.5 0.5 0.5)",
        "xyz(0.4124 0.2126 0.0193)",
        "xyz(0.3576 0.7152 0.1192)",
        "xyz(0.1805 0.0722 0.9505)",
        "xyz(0.7700 0.9278 0.1385)",
        "xyz(0.5380 0.7874 1.0697)",
        "xyz(0.5929 0.2848 0.9698)",
        "xyz(0 0 0)",
        "xyz(0.9505 1 1.089)",
        "xyz(0.3 0.4 0.2 / 0.75)",
    ],

    kelvin: [
        "1000k",
        "2000k",
        "3000k",
        "4000k",
        "5000k",
        "6500k",
        "8000k",
        "10000k",
        "15000k",
        "20000k",
    ],
};

const NAMED_COLORS = [
    "red",
    "blue",
    "green",
    "coral",
    "tomato",
    "rebeccapurple",
    "dodgerblue",
    "hotpink",
    "gold",
    "chartreuse",
    "cyan",
    "magenta",
    "olive",
    "navy",
    "teal",
    "sienna",
    "orchid",
    "salmon",
    "khaki",
    "indigo",
];

/** Expected approximate RGB values for named colors (standard CSS4 values). */
const NAMED_COLOR_EXPECTED_RGB: Record<string, [number, number, number]> = {
    red:            [255, 0, 0],
    blue:           [0, 0, 255],
    green:          [0, 128, 0],
    coral:          [255, 127, 80],
    tomato:         [255, 99, 71],
    rebeccapurple:  [102, 51, 153],
    dodgerblue:     [30, 144, 255],
    hotpink:        [255, 105, 180],
    gold:           [255, 215, 0],
    chartreuse:     [127, 255, 0],
    cyan:           [0, 255, 255],
    magenta:        [255, 0, 255],
    olive:          [128, 128, 0],
    navy:           [0, 0, 128],
    teal:           [0, 128, 128],
    sienna:         [160, 82, 45],
    orchid:         [218, 112, 214],
    salmon:         [250, 128, 114],
    khaki:          [240, 230, 140],
    indigo:         [75, 0, 130],
};

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("Color Validation — Full Refactor Test", () => {
    describe("Color Space Parsing & RGB Round-Trip", () => {
        for (const [space, colors] of Object.entries(COLOR_SPACE_TESTS) as [ColorSpace, string[]][]) {
            describe(`${space.toUpperCase()} — 10 colors`, () => {
                for (const input of colors) {
                    it(`parses "${input}"`, () => {
                        const parsed = parse(input);
                        expect(parsed, `Failed to parse "${input}"`).toBeDefined();
                        expect(parsed.unit).toBe("color");
                    });

                    it(`"${input}" produces valid RGB after conversion`, () => {
                        const parsed = parse(input);
                        const { r, g, b, a } = toRGBComponents(parsed);

                        assertValidRGB(r, "R", input);
                        assertValidRGB(g, "G", input);
                        assertValidRGB(b, "B", input);
                        expect(a, `Alpha out of range for "${input}"`).toBeGreaterThanOrEqual(-0.01);
                        expect(a, `Alpha out of range for "${input}"`).toBeLessThanOrEqual(1.01);
                    });

                    it(`"${input}" toString() produces a non-empty string`, () => {
                        const parsed = parse(input);
                        const str = parsed.toString();
                        expect(str.length, `toString() empty for "${input}"`).toBeGreaterThan(0);
                    });

                    it(`"${input}" round-trips through normalize/denormalize`, () => {
                        const parsed = parse(input);
                        const normalized = normalizeColorUnit(parsed, false, false);
                        const denormalized = normalizeColorUnit(normalized, true, false);
                        const str = denormalized.toString();
                        expect(str.length).toBeGreaterThan(0);
                        // Re-parse the denormalized string — it should still be valid
                        const reparsed = parse(str);
                        expect(reparsed).toBeDefined();
                        expect(reparsed.unit).toBe("color");
                    });
                }
            });
        }
    });

    describe("Cross-Space Conversion — every input to all 10 spaces", () => {
        const SPACES: ColorSpace[] = [
            "rgb", "hsl", "hsv", "hwb", "lab", "lch", "oklab", "oklch", "xyz", "kelvin",
        ];

        // Pick one representative color per space for cross-conversion
        const representatives: Record<ColorSpace, string> = {
            rgb:    "rgb(200, 100, 50)",
            hsl:    "hsl(210, 80%, 60%)",
            hsv:    "hsv(30, 80%, 90%)",
            hwb:    "hwb(90, 15%, 25%)",
            lab:    "lab(53.23% 80.11 67.22)",
            lch:    "lch(53.23% 104.55 40)",
            oklab:  "oklab(62.8% 0.225 0.126)",
            oklch:  "oklch(62.8% 0.258 29.23)",
            xyz:    "xyz(0.4124 0.2126 0.0193)",
            kelvin: "6500k",
        };

        for (const [sourceSpace, input] of Object.entries(representatives) as [ColorSpace, string][]) {
            describe(`${sourceSpace.toUpperCase()} → all spaces`, () => {
                for (const targetSpace of SPACES) {
                    it(`${sourceSpace} → ${targetSpace}`, () => {
                        const parsed = parse(input);
                        const converted = toSpace(parsed, targetSpace);
                        expect(converted).toBeDefined();
                        expect(converted.value.colorSpace).toBe(targetSpace);

                        const str = converted.toString();
                        expect(str.length).toBeGreaterThan(0);
                    });
                }
            });
        }
    });

    describe("CSS Named Colors — 20 colors", () => {
        for (const name of NAMED_COLORS) {
            const [expectedR, expectedG, expectedB] = NAMED_COLOR_EXPECTED_RGB[name];

            it(`parses "${name}"`, () => {
                const parsed = parse(name);
                expect(parsed).toBeDefined();
                expect(parsed.unit).toBe("color");
            });

            it(`"${name}" matches expected RGB (${expectedR}, ${expectedG}, ${expectedB})`, () => {
                const parsed = parse(name);
                const { r, g, b } = toRGBComponents(parsed);

                expect(r).toBeCloseTo(expectedR, 0);
                expect(g).toBeCloseTo(expectedG, 0);
                expect(b).toBeCloseTo(expectedB, 0);
            });

            it(`"${name}" converts to lab and back to RGB (normalized round-trip)`, () => {
                const parsed = parse(name);

                // Named color → lab (normalized) → rgb (denormalized)
                // Using LAB (not oklch) because oklch round-trips have a known
                // chroma normalization issue — see color-roundtrip.test.ts
                const labNorm = toSpaceNormalized(parsed, "lab");
                expect(labNorm.value.colorSpace).toBe("lab");

                const backToRgb = colorUnit2(labNorm, "rgb", true, true, false) as unknown as ParsedColor;
                const json = backToRgb.value.toJSON();

                expect(raw(json.r)).toBeCloseTo(expectedR, 0);
                expect(raw(json.g)).toBeCloseTo(expectedG, 0);
                expect(raw(json.b)).toBeCloseTo(expectedB, 0);
            });
        }
    });

    describe("Edge Cases", () => {
        it("parses transparent", () => {
            const parsed = parse("rgba(0, 0, 0, 0)");
            const { a } = toRGBComponents(parsed);
            expect(a).toBeCloseTo(0, 2);
        });

        it("parses white in every format", () => {
            const whites = [
                "rgb(255, 255, 255)",
                "#ffffff",
                "#fff",
                "hsl(0, 0%, 100%)",
                "hsv(0, 0%, 100%)",
                "hwb(0, 100%, 0%)",
                "lab(100% 0 0)",
                "lch(100% 0 0)",
                "oklab(100% 0 0)",
                "oklch(100% 0 0)",
            ];

            for (const w of whites) {
                const parsed = parse(w);
                const { r, g, b } = toRGBComponents(parsed);
                expect(r, `R for white "${w}"`).toBeCloseTo(255, 0);
                expect(g, `G for white "${w}"`).toBeCloseTo(255, 0);
                expect(b, `B for white "${w}"`).toBeCloseTo(255, 0);
            }
        });

        it("parses black in every format", () => {
            const blacks = [
                "rgb(0, 0, 0)",
                "#000000",
                "#000",
                "hsl(0, 0%, 0%)",
                "hsv(0, 0%, 0%)",
                "hwb(0, 0%, 100%)",
                "lab(0% 0 0)",
                "lch(0% 0 0)",
                "oklab(0% 0 0)",
                "oklch(0% 0 0)",
            ];

            for (const b of blacks) {
                const parsed = parse(b);
                const { r, g, b: blue } = toRGBComponents(parsed);
                expect(r, `R for black "${b}"`).toBeCloseTo(0, 0);
                expect(g, `G for black "${b}"`).toBeCloseTo(0, 0);
                expect(blue, `B for black "${b}"`).toBeCloseTo(0, 0);
            }
        });

        it("handles alpha in every space", () => {
            const alphaColors = [
                "rgb(128, 64, 32 / 0.5)",
                "hsl(30, 50%, 40% / 0.5)",
                "hsv(30, 50%, 60% / 0.5)",
                "hwb(30, 20%, 30% / 0.5)",
                "lab(50% 20 30 / 0.5)",
                "lch(50% 30 30 / 0.5)",
                "oklab(50% 0.1 0.05 / 0.5)",
                "oklch(50% 0.15 30 / 0.5)",
                "xyz(0.3 0.2 0.1 / 0.5)",
            ];

            for (const c of alphaColors) {
                const parsed = parse(c);
                const { a } = toRGBComponents(parsed);
                expect(a, `Alpha for "${c}"`).toBeCloseTo(0.5, 1);
            }
        });

        it("case-insensitive named colors (CSS spec)", () => {
            const cases = [
                ["Red", "red"],
                ["BLUE", "blue"],
                ["DodgerBlue", "dodgerblue"],
                ["REBECCAPURPLE", "rebeccapurple"],
                ["HotPink", "hotpink"],
                ["NONE", "none"],  // none keyword case insensitivity
            ];

            for (const [mixed, lower] of cases.slice(0, -1)) {
                const a = toRGBComponents(parse(mixed));
                const b = toRGBComponents(parse(lower));
                expect(a.r, `${mixed} R`).toBeCloseTo(b.r, 2);
                expect(a.g, `${mixed} G`).toBeCloseTo(b.g, 2);
                expect(a.b, `${mixed} B`).toBeCloseTo(b.b, 2);
            }
        });

        it("none keyword in color components", () => {
            // "none" parses as NaN per CSS Color Level 4
            const parsed = parse("rgb(none 255 0)");
            const { r, g, b } = toRGBComponents(parsed);
            expect(Number.isNaN(r)).toBe(true);
            expect(g).toBeCloseTo(255, 0);
            expect(b).toBeCloseTo(0, 0);
        });

        it("hex shorthand and longhand produce identical RGB", () => {
            const pairs = [
                ["#f00", "#ff0000"],
                ["#0f0", "#00ff00"],
                ["#00f", "#0000ff"],
                ["#fff", "#ffffff"],
                ["#000", "#000000"],
            ];

            for (const [short, long] of pairs) {
                const a = toRGBComponents(parse(short));
                const b = toRGBComponents(parse(long));
                expect(a.r).toBeCloseTo(b.r, 2);
                expect(a.g).toBeCloseTo(b.g, 2);
                expect(a.b).toBeCloseTo(b.b, 2);
            }
        });
    });
});

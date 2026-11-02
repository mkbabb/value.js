/**
 * value.js 4.2.0 — `deltaEOK` and `contrastRatio` (SPEC §7 F, G; COHESION §0hf).
 *
 * Independent references, inline and cited:
 *   - Ottosson's direct linear-sRGB → OKLab (bottosson.github.io/posts/oklab), the
 *     form validate_palette.js and atlas use, against value.js's own CSS Color 4
 *     XYZ path: 1e-7.
 *   - atlas `wcagContrast` (`atlas/src/charts/scale/oklab.ts:134-151` @ dc0c5b4): a
 *     single byte-quantized WCAG 2.0 ratio, reached from OKLab; on hex inputs value.js's
 *     two arms coincide with it: 1e-9.
 *   - R-ink-1: the demo's deleted `guardContrast` twin (`demo/color-session/ink.ts`,
 *     before 4.2.0), inlined below as the reference body, is bit-equal to
 *     `contrastRatio` over the ink suite's ground sweep, and the export is bit-equal
 *     to the private predicate `safeAccentColor` runs.
 */
import { describe, expect, it } from "vitest";

import {
    contrastRatio,
    convertColor,
    deltaEOK,
    mapColorToGamut,
    oklab,
    oklch,
    rgb,
    toRgba8,
    type AnyColor,
    type Color,
} from "../src/color/index";
import { contrast } from "../src/color/operations";
import { parseCssColor } from "../src/css/bbnf/color-parse";

const unwrap = <T>(result: { ok: true; value: T } | { ok: false; error: unknown }): T => {
    if (!result.ok) throw new Error(JSON.stringify(result.error));
    return result.value;
};
const hexBytes = (h: string) => {
    const n = Number.parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
};
const hex = (h: string): AnyColor => unwrap(rgb(...hexBytes(h)));
const css = (source: string): AnyColor => unwrap(parseCssColor(source) as never);

function seeded(seed: number) {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
const inGamut = (random: () => number): Color<"oklch"> =>
    unwrap(mapColorToGamut(unwrap(oklch(random(), random() * 0.37, random() * 360)), "srgb"));

/** Ottosson 2020, linear sRGB → OKLab, the published 10-digit matrices. */
const eotf = (byte: number) => {
    const v = byte / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
function ottosson([r, g, b]: readonly number[]): [number, number, number] {
    const l = Math.cbrt(0.4122214708 * r! + 0.5363325363 * g! + 0.0514459929 * b!);
    const m = Math.cbrt(0.2119034982 * r! + 0.6806995451 * g! + 0.1073969566 * b!);
    const s = Math.cbrt(0.0883024619 * r! + 0.2817188376 * g! + 0.6299787005 * b!);
    return [
        0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
    ];
}

describe("F. deltaEOK", () => {
    it("matches Ottosson's direct linear-sRGB OKLab to 1e-7 on a 17³ cube", () => {
        const step = (i: number) => Math.round(i * 255 / 16);
        const cube: [number, number, number][] = [];
        for (let r = 0; r < 17; r++) for (let g = 0; g < 17; g++) for (let b = 0; b < 17; b++) cube.push([step(r), step(g), step(b)]);
        const random = seeded(17);
        let worst = 0;
        for (const bytes of cube) {
            const other = cube[Math.floor(random() * cube.length)]!;
            const a = ottosson(bytes.map(eotf));
            const b = ottosson(other.map(eotf));
            const direct = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
            worst = Math.max(worst, Math.abs(unwrap(deltaEOK(unwrap(rgb(...bytes)), unwrap(rgb(...other)))) - direct));
        }
        expect(worst).toBeLessThanOrEqual(1e-7);
    });

    it("is unit scale: white↔black = 1 ± 1e-12, red↔blue = 0.5370898 ± 1e-6", () => {
        expect(Math.abs(unwrap(deltaEOK(hex("#ffffff"), hex("#000000"))) - 1)).toBeLessThanOrEqual(1e-12);
        expect(Math.abs(unwrap(deltaEOK(hex("#ff0000"), hex("#0000ff"))) - 0.5370898)).toBeLessThanOrEqual(1e-6);
    });

    it("is symmetric, zero on identical input, and satisfies the triangle inequality", () => {
        const random = seeded(3);
        for (let i = 0; i < 2000; i++) {
            const [a, b, c] = [inGamut(random), inGamut(random), inGamut(random)];
            const ab = unwrap(deltaEOK(a, b));
            expect(unwrap(deltaEOK(b, a))).toBe(ab);
            expect(unwrap(deltaEOK(a, a))).toBe(0);
            expect(ab).toBeLessThanOrEqual(unwrap(deltaEOK(a, c)) + unwrap(deltaEOK(c, b)) + 1e-15);
        }
    });

    it("ignores alpha (\"none\" included) and reads out-of-gamut input unmapped", () => {
        const opaque = unwrap(oklch(0.6, 0.12, 40));
        const other = unwrap(oklch(0.5, 0.2, 260));
        const d = unwrap(deltaEOK(opaque, other));
        expect(unwrap(deltaEOK(unwrap(oklch(0.6, 0.12, 40, 0.2)), other))).toBe(d);
        expect(unwrap(deltaEOK(unwrap(oklch(0.6, 0.12, 40, "none")), other))).toBe(d);
        const vivid = unwrap(oklch(0.7, 0.4, 150));
        const [L, a, b] = unwrap(convertColor(vivid, "oklab")).channels as readonly number[];
        expect(unwrap(deltaEOK(vivid, unwrap(oklab(0.7, 0, 0))))).toBeCloseTo(Math.hypot(L! - 0.7, a!, b!), 15);
        expect(unwrap(deltaEOK(vivid, unwrap(oklab(0.7, 0, 0))))).toBeGreaterThan(0.39);
    });

    it("reports a missing channel", () => {
        expect(deltaEOK(unwrap(oklab("none", 0, 0)), hex("#000000"))).toEqual({ ok: false, error: { code: "color_missing_channel" } });
        expect(deltaEOK(unwrap(rgb(10, "none", 10)), hex("#000000"))).toEqual({ ok: false, error: { code: "color_missing_channel" } });
    });
});

describe("G. contrastRatio", () => {
    it("fixed values, never rounded", () => {
        const at = (a: AnyColor, b: AnyColor) => unwrap(contrastRatio(a, b));
        expect(at(hex("#767676"), hex("#ffffff"))).toBeCloseTo(4.542225, 6);
        expect(at(hex("#777777"), hex("#ffffff"))).toBeCloseTo(4.478089, 6);
        // #777777 sits under 4.5:1 and is reported as such, not rounded up to it.
        expect(at(hex("#777777"), hex("#ffffff"))).toBeLessThan(4.5);
        expect(at(hex("#000000"), hex("#ffffff"))).toBe(21);
        expect(at(hex("#982a6b"), hex("#982a6b"))).toBe(1);
        expect(at(hex("#982a6b"), hex("#fcfcfb"))).toBeCloseTo(7.106388, 6);
        // Non-hex input: the float arm (4.792247) is under the byte arm (4.801888) and wins.
        expect(at(css("oklch(0.62 0.15 250)"), hex("#1a1a19"))).toBeCloseTo(4.792247, 6);
    });

    it("is symmetric and lies in [1, 21]", () => {
        const random = seeded(21);
        for (let i = 0; i < 2000; i++) {
            const a = inGamut(random);
            const b = inGamut(random);
            const ratio = unwrap(contrastRatio(a, b));
            expect(unwrap(contrastRatio(b, a))).toBe(ratio);
            expect(ratio).toBeGreaterThanOrEqual(1);
            expect(ratio).toBeLessThanOrEqual(21);
        }
        // Out-of-sRGB input is mapped first, so the ratio stays a WCAG ratio.
        const vivid = unwrap(contrastRatio(unwrap(oklch(0.9, 0.4, 140)), unwrap(oklch(0.05, 0.3, 280))));
        expect(vivid).toBeGreaterThanOrEqual(1);
        expect(vivid).toBeLessThanOrEqual(21);
    });

    it("matches atlas wcagContrast to 1e-9 on 256 greys × a 6³ cube", () => {
        // atlas: OKLab → gamut-clamped bytes (Math.round) → WCAG 2.0 luminance (knee 0.03928).
        const atlasBytes = ([L, a, b]: readonly number[]) => {
            const l = (L! + 0.3963377774 * a! + 0.2158037573 * b!) ** 3;
            const m = (L! - 0.1055613458 * a! - 0.0638541728 * b!) ** 3;
            const s = (L! - 0.0894841775 * a! - 1.291485548 * b!) ** 3;
            const encode = (x: number) => {
                const c = x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
                return Math.round(Math.max(0, Math.min(1, c)) * 255);
            };
            return [
                encode(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
                encode(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
                encode(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
            ];
        };
        const atlasLuminance = (bytes: readonly number[]) => {
            const lin = (x: number) => {
                const s = x / 255;
                return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
            };
            return 0.2126 * lin(bytes[0]!) + 0.7152 * lin(bytes[1]!) + 0.0722 * lin(bytes[2]!);
        };
        const atlasContrast = (x: readonly number[], y: readonly number[]) => {
            const a = atlasLuminance(atlasBytes(x));
            const b = atlasLuminance(atlasBytes(y));
            return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        };
        const levels = [0, 51, 102, 153, 204, 255];
        let worst = 0;
        for (let v = 0; v < 256; v++) {
            const grey = [v, v, v];
            for (const r of levels) for (const g of levels) for (const b of levels) {
                const ours = unwrap(contrastRatio(unwrap(rgb(v, v, v)), unwrap(rgb(r, g, b))));
                const theirs = atlasContrast(ottosson(grey.map(eotf)), ottosson([r, g, b].map(eotf)));
                worst = Math.max(worst, Math.abs(ours - theirs));
            }
        }
        expect(worst).toBeLessThanOrEqual(1e-9);
    }, 60_000);

    it("is bit-equal to the private predicate safeAccentColor runs, for 10⁴ seeded in-gamut pairs", () => {
        const random = seeded(0x10_000);
        for (let i = 0; i < 10_000; i++) {
            const a = inGamut(random);
            const b = inGamut(random);
            const ra = unwrap(convertColor(a, "rgb"));
            const rb = unwrap(convertColor(b, "rgb"));
            const expected = Math.min(unwrap(contrast(ra, rb, false)), unwrap(contrast(ra, rb, true)));
            expect(unwrap(contrastRatio(a, b))).toBe(expected);
        }
    }, 60_000);

    it("R-ink-1: equals the demo's deleted guardContrast twin, bit for bit, over the ink suite's ground sweep", () => {
        // The reference body, verbatim from demo/color-session/ink.ts before 4.2.0.
        const srgbLinear = (encoded: number) => {
            const value = encoded / 255;
            return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        };
        const guardLuminance = (channels: readonly number[]) =>
            0.2126 * srgbLinear(channels[0]!) + 0.7152 * srgbLinear(channels[1]!) + 0.0722 * srgbLinear(channels[2]!);
        const guardRatio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        const guardLuminances = (color: Color<"oklch">): readonly [number, number] => {
            const converted = unwrap(convertColor(color, "rgb"));
            const bytes = unwrap(toRgba8(color, { gamut: "clip" }));
            return [guardLuminance(converted.channels as readonly number[]), guardLuminance(bytes)];
        };
        const guardContrast = (candidate: Color<"oklch">, surface: readonly [number, number]) => {
            const [float, byte] = guardLuminances(candidate);
            return Math.min(guardRatio(float, surface[0]), guardRatio(byte, surface[1]));
        };
        const guardCandidate = (accent: Color<"oklch">, L: number) => {
            const C = typeof accent.channels[1] === "number" ? accent.channels[1] : 0;
            return unwrap(mapColorToGamut(unwrap(oklch(L, C, accent.channels[2], 1)), "srgb"));
        };
        const surfaceColor = (L: number) => unwrap(oklch(L, 0, 0, 1));

        const PICKS = [
            "lab(38% 32 24)", "lab(20% 5 -30)", "lab(96% 0 0)", "lab(50% 0 0)",
            "oklch(0.62 0.2725 9.8)", "oklch(0.751 0.147 84.2)", "hsl(0 72% 50%)",
            "hsl(24 10% 10%)", "hsl(30 14% 90%)",
        ];
        const GROUNDS = Array.from({ length: 91 }, (_, i) => 0.05 + i * 0.01);
        const INK_LS = Array.from({ length: 41 }, (_, i) => i / 40);
        let compared = 0;
        for (const source of PICKS) {
            const accent = unwrap(convertColor(css(source), "oklch"));
            for (const ground of [...GROUNDS, 0, 1]) {
                const surface = surfaceColor(ground);
                const luminances = guardLuminances(surface);
                for (const L of INK_LS) {
                    const candidate = guardCandidate(accent, L);
                    expect(unwrap(contrastRatio(candidate, surface)), `${source} L ${L} on ${ground}`).toBe(guardContrast(candidate, luminances));
                    compared++;
                }
                expect(unwrap(contrastRatio(surfaceColor(0), surface))).toBe(guardContrast(surfaceColor(0), luminances));
                expect(unwrap(contrastRatio(surfaceColor(1), surface))).toBe(guardContrast(surfaceColor(1), luminances));
            }
        }
        expect(compared).toBe(PICKS.length * 93 * 41);
    }, 60_000);

    it("refuses translucent input with safeAccentColor's codes", () => {
        const opaque = hex("#ffffff");
        expect(contrastRatio(unwrap(rgb(0, 0, 0, "none")), opaque)).toEqual({ ok: false, error: { code: "color_missing_alpha" } });
        expect(contrastRatio(opaque, unwrap(rgb(0, 0, 0, 0.5)))).toEqual({ ok: false, error: { code: "color_invalid_input" } });
        expect(contrastRatio(unwrap(rgb(0, "none", 0)), opaque)).toEqual({ ok: false, error: { code: "color_missing_channel" } });
        expect(contrastRatio("#000" as never, opaque)).toEqual({ ok: false, error: { code: "color_invalid_input" } });
    });
});

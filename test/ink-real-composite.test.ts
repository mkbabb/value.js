/**
 * X.W7L.i — the certified ink on glass-ui 10.1.0's veil (ESC-W7Rm-1).
 *
 * glass 10's veil-ladder recut paints every plate as `--glass-veil-ink` at a
 * low alpha over the ground below it, which seats mid-lightness grounds in
 * the band where no ink reaches floor + headroom (5.75:1). The instrument
 * threw `contrast_unreachable` there although the 4.5:1 floor was reachable.
 * These cases hold the cure: the static model IS glass's published ladder,
 * the model composites the way Chromium paints (source-over, sRGB), and the
 * search never throws on a reachable floor.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { convertColor, oklch, safeAccentColor, type AnyColor, type Color } from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";
import {
    CERTIFY_HEADROOM,
    GRAPHICS_CONTRAST_FLOOR,
    TEXT_CONTRAST_FLOOR,
    certifyAccentInk,
    producerRungTint,
    resolveMutedInk,
    resolveSurfaceLightness,
} from "../demo/color-session/ink";

function requiredOklch(source: string): Color<"oklch"> {
    const parsed = parseCssColor(source);
    if (!parsed.ok) throw new Error(`Unparseable test color: ${source}`);
    const converted = convertColor(parsed.value, "oklch");
    if (!converted.ok) throw new Error(`Unconvertible test color: ${source}`);
    return converted.value;
}

function L(color: Color<"oklch">): number {
    const value = color.channels[0];
    if (value === "none") throw new Error("missing lightness");
    return value;
}

function relativeLuminance(color: AnyColor): number {
    const converted = convertColor(color, "rgb");
    if (!converted.ok) throw new Error(`RGB conversion failed: ${converted.error.code}`);
    const encoded = converted.value.channels.map((channel) => {
        if (channel === "none") throw new Error("RGB test color is missing a channel");
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * encoded[0]! + 0.7152 * encoded[1]! + 0.0722 * encoded[2]!;
}

function grey(surfaceL: number): Color<"oklch"> {
    const surface = oklch(surfaceL, 0, 0, 1);
    if (!surface.ok) throw new Error(`Invalid test surface: ${surface.error.code}`);
    return surface.value;
}

/** WCAG ratio of a CSS ink on an achromatic surface lightness. */
function ratioOn(css: string, surfaceL: number): number {
    const a = relativeLuminance(requiredOklch(css));
    const b = relativeLuminance(grey(surfaceL));
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** The most any ink can reach on the surface: pure black or pure white. */
function maxReachable(surfaceL: number): number {
    return Math.max(ratioOn("oklch(0 0 0)", surfaceL), ratioOn("oklch(1 0 0)", surfaceL));
}

/** glass-ui's published token file, read from the installed package. */
function glassTokens(file: string): string {
    // The package's exports map does not publish its token files as subpaths;
    // the installed bytes are the contract.
    const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
    return readFileSync(join(repo, "node_modules/@mkbabb/glass-ui/dist/styles/tokens", file), "utf8");
}

function token(css: string, name: string): string {
    const match = new RegExp(`${name}:\\s*([^;}]+)`).exec(css);
    if (!match) throw new Error(`glass token ${name} not found`);
    return match[1]!.trim();
}

describe("X.W7L.i — the static model IS glass 10.1.0's published veil ladder", () => {
    const light = glassTokens("glass.css");
    const dark = glassTokens("dark-arm.css");
    const published = {
        light: {
            ink: token(light, "--glass-veil-ink"),
            base: Number(token(light, "--glass-veil-base")),
            step: Number(token(light, "--glass-veil-step")),
        },
        dark: {
            ink: token(dark, "--glass-veil-ink"),
            base: Number(token(dark, "--glass-veil-base")),
            // dark-arm.css re-states only the ink and the base; the step is shared.
            step: Number(token(light, "--glass-veil-step")),
        },
    };

    for (const scheme of ["light", "dark"] as const) {
        it(`ink, base and step match the installed tokens (${scheme})`, () => {
            const p = published[scheme];
            const ink = requiredOklch(p.ink);
            const rungs = { quiet: -1, resting: 0, floating: 1, chrome: -1 } as const;
            for (const [rung, k] of Object.entries(rungs) as [keyof typeof rungs, number][]) {
                const tint = producerRungTint(rung, scheme === "dark");
                expect(tint.alpha, `${rung} α`).toBeCloseTo(p.base + k * p.step, 10);
                expect(tint.color.channels).toEqual(ink.channels);
                expect(tint.color.alpha).toBe(1);
            }
        });
    }
});

/**
 * Chromium's own composite: `evidence/X-W7L/i-composite-oracle-{light,dark}.json`
 * (served :9000, headed, 2026-09-25) — a solid grey ground rgb(g,g,g) under a
 * plate painted with the glass token; the pixel is the browser's source-over.
 */
const BROWSER_COMPOSITES = [
    { dark: false, ground: 128, rung: "resting", pixel: "rgb(117 115 113)" },
    { dark: false, ground: 186, rung: "resting", pixel: "rgb(167 165 163)" },
    { dark: false, ground: 160, rung: "quiet", pixel: "rgb(149 148 146)" },
    { dark: false, ground: 220, rung: "floating", pixel: "rgb(190 187 184)" },
    { dark: true, ground: 100, rung: "resting", pixel: "rgb(86 84 82)" },
    { dark: true, ground: 160, rung: "resting", pixel: "rgb(135 134 132)" },
    { dark: true, ground: 60, rung: "quiet", pixel: "rgb(55 53 52)" },
    { dark: true, ground: 186, rung: "floating", pixel: "rgb(150 148 146)" },
] as const;

describe("X.W7L.i — the model composites the way the browser paints (source-over, sRGB)", () => {
    for (const row of BROWSER_COMPOSITES) {
        it(`${row.rung} over rgb(${row.ground}) (${row.dark ? "dark" : "light"}) = the measured pixel`, () => {
            const ambientL = L(requiredOklch(`rgb(${row.ground} ${row.ground} ${row.ground})`));
            // The rung's published recipe composited over the ground: the
            // quiet rung has no InkSurface of its own (it is the veil's layer).
            const modelled = resolveSurfaceLightness(
                "resting", ambientL, row.dark, producerRungTint(row.rung, row.dark));
            // One byte of rounding in the pixel is ≤ 0.004 of OKLab L here.
            expect(modelled).toBeCloseTo(L(requiredOklch(row.pixel)), 2);
            expect(Math.abs(modelled - L(requiredOklch(row.pixel)))).toBeLessThan(0.004);
        });
    }

    it("a live tint composites the same way as the static recipe it measures", () => {
        const tint = producerRungTint("resting", false);
        for (const a of [0.3, 0.55, 0.8]) {
            expect(resolveSurfaceLightness("resting", a, false, tint))
                .toBeCloseTo(resolveSurfaceLightness("resting", a, false), 12);
        }
    });
});

/** Ambient 0 → 1 in steps of 0.025 (the unreachable band is ≥ 0.1 wide). */
const SWEEP = Array.from({ length: 41 }, (_, i) => i / 40);
const SURFACES = ["page", "resting", "floating", "chrome", "veil", "well"] as const;
const PICKS = [
    "oklch(0.55 0.18 260)", // url-color-precedence's URL_BLUE — boot died on it at 10.1.0
    "oklch(0.51 0.13 32)", // the owner brick
    "lab(50% 0 0)",
    "lab(96% 0 0)",
    "oklch(0.62 0.2725 9.8)",
] as const;

describe("X.W7L.i — ESC-W7Rm-1: the search never throws on a reachable floor", () => {
    it("the headroom band is live: floor + headroom is unreachable on some glass-10 plate", () => {
        // Without this the sweep below could pass without ever exercising
        // the case that crashed the app.
        const unreachable = SWEEP.filter((a) => {
            const surfaceL = resolveSurfaceLightness("resting", a, false);
            const r = safeAccentColor(requiredOklch(PICKS[0]), grey(surfaceL), {
                minimumRatio: TEXT_CONTRAST_FLOOR + CERTIFY_HEADROOM,
                gamut: "srgb",
            });
            return !r.ok && r.error.code === "contrast_unreachable";
        });
        expect(unreachable.length).toBeGreaterThan(0);
    });

    for (const dark of [false, true]) {
        it(`every surface × the full ambient sweep × every pick certifies ≥ the floor (${dark ? "dark" : "light"})`, () => {
            for (const surface of SURFACES) {
                for (const a of SWEEP) {
                    const surfaceL = resolveSurfaceLightness(surface, a, dark);
                    for (const pick of PICKS) {
                        const ink = certifyAccentInk(pick, surfaceL);
                        expect(ratioOn(ink, surfaceL), `${pick} on ${surface}@${a}`)
                            .toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);
                        const graphic = certifyAccentInk(pick, surfaceL, GRAPHICS_CONTRAST_FLOOR);
                        expect(ratioOn(graphic, surfaceL)).toBeGreaterThanOrEqual(GRAPHICS_CONTRAST_FLOOR);
                    }
                    const muted = resolveMutedInk(surfaceL, dark);
                    expect(ratioOn(muted, surfaceL), `muted on ${surface}@${a}`)
                        .toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);
                }
            }
        }, 60_000);
    }

    it("where the headroom is out of reach, the ink is the best certified value (the surface's own maximum)", () => {
        let exercised = 0;
        for (const dark of [false, true]) {
            for (const a of SWEEP) {
                const surfaceL = resolveSurfaceLightness("veil", a, dark);
                const ceiling = maxReachable(surfaceL);
                if (ceiling >= TEXT_CONTRAST_FLOOR + CERTIFY_HEADROOM) continue;
                exercised++;
                for (const pick of PICKS) {
                    const ink = certifyAccentInk(pick, surfaceL);
                    const ratio = ratioOn(ink, surfaceL);
                    expect(ratio).toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);
                    // Bisection to 1.2e-3 in ratio, plus byte quantization.
                    expect(ratio, `${pick} on veil@${a}`).toBeGreaterThan(ceiling - 0.05);
                }
            }
        }
        expect(exercised).toBeGreaterThan(0);
    }, 60_000);

    it("an ink that already clears floor + headroom is returned verbatim (fidelity holds)", () => {
        const surfaceL = resolveSurfaceLightness("resting", 0.936, false);
        expect(certifyAccentInk("oklch(0.2 0.05 260)", surfaceL)).toBe("oklch(0.2 0.05 260)");
    });
});

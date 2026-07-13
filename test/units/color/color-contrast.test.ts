import { describe, it, expect } from "vitest";
import { computeSafeAccent, safeAccentColor, safeAccentCssString, needsContrastAdjustment, getOklchLightness, safeAccentAgainstSurface, wcagContrastRatio } from "@src/units/color/contrast";
import { OKLCHColor, RGBColor, HSLColor } from "@src/units/color";
import type { Color } from "@src/units/color";
import { color2 } from "@src/units/color/dispatch";
import { parseCSSColor } from "@src/parsing/color";
import { colorUnit2 } from "@src/units/color/normalize";
import type { ValueUnit } from "@src/units";

describe("computeSafeAccent", () => {
    const DARK_BG = 0.15;
    const LIGHT_BG = 0.97;
    const MIN_CONTRAST = 0.35;

    it("returns unchanged color when contrast is sufficient", () => {
        // Mid-lightness on dark bg: L=0.6 is well above 0.15+0.35=0.50
        const result = computeSafeAccent(0.6, 0.15, 250, DARK_BG);
        expect(result.L).toBe(0.6);
        expect(result.C).toBe(0.15);
        expect(result.H).toBe(250);
    });

    it("pushes very dark color lighter on dark background", () => {
        // L=0.10 on dark bg (0.15) — delta is only 0.05
        const result = computeSafeAccent(0.10, 0.15, 264, DARK_BG);
        expect(result.L).toBeGreaterThanOrEqual(DARK_BG + MIN_CONTRAST * 0.8);
        expect(result.H).toBe(264); // hue preserved
    });

    it("pushes very light color darker on light background", () => {
        // L=0.95 on light bg (0.97) — delta is only 0.02
        const result = computeSafeAccent(0.95, 0.1, 30, LIGHT_BG);
        expect(result.L).toBeLessThanOrEqual(LIGHT_BG - MIN_CONTRAST * 0.8);
        expect(result.H).toBe(30); // hue preserved
    });

    it("handles pure black on dark background", () => {
        const result = computeSafeAccent(0, 0, 0, DARK_BG);
        expect(result.L).toBeGreaterThan(0.3);
    });

    it("handles pure white on light background", () => {
        const result = computeSafeAccent(1, 0, 0, LIGHT_BG);
        expect(result.L).toBeLessThan(0.7);
    });

    it("preserves hue in all cases", () => {
        const hue = 142;
        const result1 = computeSafeAccent(0.05, 0.2, hue, DARK_BG);
        const result2 = computeSafeAccent(0.95, 0.2, hue, LIGHT_BG);
        expect(result1.H).toBe(hue);
        expect(result2.H).toBe(hue);
    });

    it("reduces chroma at extreme lightness", () => {
        // Push to very high L — chroma should be reduced
        const result = computeSafeAccent(0.10, 0.3, 264, DARK_BG);
        // Target L ~ 0.50, which is not extreme, so chroma should be mostly preserved
        // But if we force a high-lightness scenario:
        const resultExtreme = computeSafeAccent(0.95, 0.3, 264, LIGHT_BG);
        // Target would be ~0.62 which is not extreme, chroma should be mostly preserved
        expect(resultExtreme.C).toBeLessThanOrEqual(0.3);
    });

    it("handles achromatic colors (C=0)", () => {
        const result = computeSafeAccent(0.10, 0, 0, DARK_BG);
        expect(result.C).toBe(0);
        expect(result.L).toBeGreaterThan(DARK_BG + MIN_CONTRAST * 0.5);
    });

    it("mid-range colors need no adjustment on either bg", () => {
        // L=0.5 is far from both backgrounds
        const resultDark = computeSafeAccent(0.5, 0.15, 120, DARK_BG);
        const resultLight = computeSafeAccent(0.5, 0.15, 120, LIGHT_BG);
        expect(resultDark.L).toBe(0.5);
        expect(resultLight.L).toBe(0.5);
    });

    it("respects custom minContrast parameter", () => {
        // With minContrast=0.5, L=0.55 on dark bg (0.15) should be adjusted (delta=0.4 < 0.5)
        const result = computeSafeAccent(0.55, 0.1, 0, DARK_BG, 0.5);
        expect(result.L).not.toBe(0.55);
        expect(result.L).toBeGreaterThanOrEqual(DARK_BG + 0.5 * 0.8);
    });
});

describe("safeAccentColor", () => {
    it("converts any Color to safe OKLCH", () => {
        // Very dark RGB color
        const darkRgb = new RGBColor(0.02, 0.02, 0.02, 1);
        const safe = safeAccentColor(darkRgb, 0.15);
        expect(safe.colorSpace).toBe("oklch");
        expect(safe.l as number).toBeGreaterThan(0.3);
    });

    it("returns OKLCH clone when no adjustment needed", () => {
        const brightOklch = new OKLCHColor(0.7, 0.15, 200, 1);
        const safe = safeAccentColor(brightOklch, 0.15);
        expect(safe.colorSpace).toBe("oklch");
        expect(safe.l).toBe(0.7);
        expect(safe.c).toBe(0.15);
    });

    it("preserves alpha from original color", () => {
        const color = new OKLCHColor(0.1, 0.15, 200, 0.5);
        const safe = safeAccentColor(color, 0.15);
        expect(safe.alpha).toBe(0.5);
    });
});

describe("safeAccentCssString (S.W1-6 — the demo-consumed CSS accent surface)", () => {
    // Historical light/dark PAGE lightnesses — leaf-level probe referents
    // only. (The demo's BG_LIGHTNESS constants were RETIRED at T.W3-5/D6:
    // consumers now thread the live surface lightness; the leaf's math is
    // referent-agnostic, so these stay as representative endpoints.)
    const LIGHT_BG = 0.97;
    const DARK_BG = 0.15;

    // Parse the leading L channel out of an `oklch(L C H[ / a])` string.
    const parseOklchL = (css: string): number => {
        const m = css.match(/^oklch\(\s*([0-9.]+)/);
        expect(m).not.toBeNull();
        return Number(m![1]);
    };

    it("light-mode near-white pick: the guard FIRES (the P2-1 case)", () => {
        // NORMALIZED near-white OKLCH — L≈0.95 sits only 0.02 below the L≈0.97
        // light surface, deep inside the 0.35 min-contrast band. The audit's live
        // finding was that the accent stayed the unguarded near-white; here the
        // src surface MUST push L down to ~0.62 (0.97 − 0.35).
        const nearWhite = new OKLCHColor(0.95, 0.04, 0.0556, 1);
        const css = safeAccentCssString(nearWhite, LIGHT_BG);

        expect(css).toMatch(/^oklch\(/);
        const L = parseOklchL(css);
        expect(L).toBeLessThan(0.95); // guard actually fired (not the raw pick)
        expect(L).toBeLessThanOrEqual(LIGHT_BG - 0.35 * 0.8); // ≤ 0.69
        expect(L).toBeCloseTo(0.62, 2); // 0.97 − 0.35
    });

    it("light-mode near-white RGB pick fires too (normalized-domain input)", () => {
        // The demo picker holds a NORMALIZED color; a near-white RGB routes
        // through color2→oklch and must be guarded identically.
        const nearWhiteRgb = new RGBColor(0.98, 0.98, 0.95, 1);
        const css = safeAccentCssString(nearWhiteRgb, LIGHT_BG);

        expect(css).toMatch(/^oklch\(/);
        expect(parseOklchL(css)).toBeLessThan(0.7);
    });

    it("denorm rides the library range table — H in degrees, C in [0,0.5]", () => {
        // Normalized H=0.5 → 180°, C=0.2 → 0.10; NOT the raw normalized 0.5 / 0.2.
        // This is the retirement of the demo's hand-coded `C*0.5` / `H*360`.
        const mid = new OKLCHColor(0.5, 0.2, 0.5, 1);
        const css = safeAccentCssString(mid, LIGHT_BG); // L=0.5 is far from 0.97 → no shift
        const m = css.match(/^oklch\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)$/);
        expect(m).not.toBeNull();
        expect(Number(m![1])).toBeCloseTo(0.5, 5); // L identity
        expect(Number(m![2])).toBeCloseTo(0.1, 5); // C 0.2 × 0.5
        expect(Number(m![3])).toBeCloseTo(180, 3); // H 0.5 × 360
    });

    it("no-op guard re-expresses a sufficient-contrast pick as oklch", () => {
        // Mid-lightness on dark bg has ample contrast → unchanged L, still oklch.
        const mid = new OKLCHColor(0.6, 0.2, 0.7, 1);
        const css = safeAccentCssString(mid, DARK_BG);
        expect(css).toMatch(/^oklch\(/);
        expect(parseOklchL(css)).toBeCloseTo(0.6, 5);
    });

    it("carries alpha through: a translucent pick emits the `/ a` clause", () => {
        const translucent = new OKLCHColor(0.6, 0.2, 0.7, 0.5);
        const css = safeAccentCssString(translucent, DARK_BG);
        expect(css).toContain("/ 0.5");
        expect(css).toMatch(/\)$/);
    });
});

describe("needsContrastAdjustment", () => {
    it("returns true for low-contrast colors", () => {
        const darkColor = new OKLCHColor(0.1, 0.1, 200, 1);
        expect(needsContrastAdjustment(darkColor, 0.15)).toBe(true);
    });

    it("returns false for sufficient-contrast colors", () => {
        const brightColor = new OKLCHColor(0.7, 0.15, 200, 1);
        expect(needsContrastAdjustment(brightColor, 0.15)).toBe(false);
    });

    it("detects near-white on light bg", () => {
        const nearWhite = new OKLCHColor(0.95, 0.02, 0, 1);
        expect(needsContrastAdjustment(nearWhite, 0.97)).toBe(true);
    });
});

describe("getOklchLightness", () => {
    it("extracts lightness from OKLCH directly", () => {
        const color = new OKLCHColor(0.65, 0.15, 200, 1);
        expect(getOklchLightness(color)).toBe(0.65);
    });

    it("converts other spaces to OKLCH and extracts L", () => {
        const hsl = new HSLColor(0, 0, 0.5, 1); // mid-gray
        const L = getOklchLightness(hsl);
        expect(L).toBeGreaterThan(0.3);
        expect(L).toBeLessThan(0.7);
    });
});

describe("CSS string safe accent path (parseCSSColor → colorUnit2 → computeSafeAccent)", () => {
    const BG_DARK = 0.15;

    function safeCssFromString(css: string): string {
        const parsed = parseCSSColor(css) as ValueUnit<Color<ValueUnit<number>>, "color"> | null;
        if (!parsed) return css;
        const oklch = colorUnit2(parsed, "oklch", false, false, false);
        const L = oklch.value.l.value;
        const C = oklch.value.c.value;
        const H = oklch.value.h.value;
        const safe = computeSafeAccent(L, C, H, BG_DARK);
        if (safe.L === L && safe.C === C && safe.H === H) return css;
        const denormL = safe.L;
        const denormC = safe.C * 0.5;
        const denormH = safe.H * 360;
        return `oklch(${denormL.toFixed(3)} ${denormC.toFixed(4)} ${denormH.toFixed(1)})`;
    }

    it("adjusts a dark hex color on dark bg", () => {
        const result = safeCssFromString("#1a1a0a");
        expect(result).not.toBe("#1a1a0a");
        expect(result).toMatch(/^oklch\(/);
    });

    it("adjusts oklch(0.2 0.05 80) on dark bg", () => {
        const result = safeCssFromString("oklch(0.2 0.05 80)");
        expect(result).not.toBe("oklch(0.2 0.05 80)");
        expect(result).toMatch(/^oklch\(/);
    });

    it("preserves bright colors that need no adjustment", () => {
        const result = safeCssFromString("#ff8800");
        expect(result).toBe("#ff8800"); // bright orange — sufficient contrast
    });

    it("traces OKLCH values through the pipeline", () => {
        const parsed = parseCSSColor("#1a1a0a") as ValueUnit<Color<ValueUnit<number>>, "color">;
        expect(parsed).not.toBeNull();
        const oklch = colorUnit2(parsed!, "oklch", false, false, false);
        const L = oklch.value.l.value;
        const C = oklch.value.c.value;
        const H = oklch.value.h.value;
        // Dark hex should have low L (0.21 for #1a1a0a)
        expect(L).toBeLessThan(0.25);
        // computeSafeAccent should push L up
        const safe = computeSafeAccent(L, C, H, BG_DARK);
        expect(safe.L).toBeGreaterThan(0.4);
    });
});

// VJ-Q1 (1.1.1) — WCAG 2.x relative-luminance + the `contrast-color()` L7 arm.
import {
    wcagRelativeLuminance,
    wcagContrastRatio,
    contrastColor,
} from "@src/units/color/contrast";
import { parseCSSValue } from "@src/parsing";

describe("WCAG relative-luminance + contrast-ratio leaf (VJ-Q1)", () => {
    it("L(white) === 1, L(black) === 0", () => {
        expect(wcagRelativeLuminance(new RGBColor(255, 255, 255, 1))).toBeCloseTo(1, 9);
        expect(wcagRelativeLuminance(new RGBColor(0, 0, 0, 1))).toBeCloseTo(0, 9);
    });

    it("L(red) === 0.2126 (the sRGB R coefficient — pure primary)", () => {
        expect(wcagRelativeLuminance(new RGBColor(255, 0, 0, 1))).toBeCloseTo(0.2126, 6);
    });

    it("L(green primary) === 0.7152, L(blue primary) === 0.0722", () => {
        expect(wcagRelativeLuminance(new RGBColor(0, 255, 0, 1))).toBeCloseTo(0.7152, 6);
        expect(wcagRelativeLuminance(new RGBColor(0, 0, 255, 1))).toBeCloseTo(0.0722, 6);
    });

    it("ratio(white, black) === 21 (the max WCAG ratio), order-independent", () => {
        const w = new RGBColor(255, 255, 255, 1);
        const k = new RGBColor(0, 0, 0, 1);
        expect(wcagContrastRatio(w, k)).toBeCloseTo(21, 9);
        expect(wcagContrastRatio(k, w)).toBeCloseTo(21, 9);
    });

    it("ratio(x, x) === 1 (identical luminance)", () => {
        const r = new RGBColor(120, 80, 200, 1);
        expect(wcagContrastRatio(r, r)).toBeCloseTo(1, 9);
    });

    it("converts non-sRGB colors before measuring (normalized OKLCH input)", () => {
        // The leaf speaks the NORMALIZED [0,1] color domain: a NORMALIZED
        // OKLCH white (L=1) reads near-1 luminance, near-black reads near-0.
        expect(wcagRelativeLuminance(new OKLCHColor(1, 0, 0, 1) as Color)).toBeCloseTo(1, 4);
        expect(wcagRelativeLuminance(new OKLCHColor(0, 0, 0, 1) as Color)).toBeCloseTo(0, 4);
    });
});

describe("contrastColor leaf (VJ-Q1)", () => {
    it("picks black against light, white against dark", () => {
        expect(contrastColor(new RGBColor(255, 255, 255, 1)).toString()).toBe("rgb(0 0 0)");
        expect(contrastColor(new RGBColor(0, 0, 0, 1)).toString()).toBe("rgb(255 255 255)");
        expect(contrastColor(new RGBColor(255, 0, 0, 1)).toString()).toBe("rgb(0 0 0)"); // red lum 0.21 → black wins
        expect(contrastColor(new RGBColor(0, 0, 128, 1)).toString()).toBe("rgb(255 255 255)"); // navy → white
        expect(contrastColor(new RGBColor(255, 255, 0, 1)).toString()).toBe("rgb(0 0 0)"); // yellow → black
    });

    it("uses the WCAG metric (not OKLab L) near the crossover", () => {
        // #767676 sRGB ≈ 0.4627; WCAG luminance ≈ 0.185 > crossover 0.179 → black.
        expect(contrastColor(new RGBColor(0x76, 0x76, 0x76, 1)).toString()).toBe("rgb(0 0 0)");
    });
});

describe("contrast-color() parse arm (VJ-Q1 — eager Color resolution)", () => {
    it("parseCSSValue('contrast-color(red)') is a concrete Color, not an opaque FunctionValue", () => {
        const v = parseCSSValue("contrast-color(red)");
        expect((v as ValueUnit).unit).toBe("color");
        expect(v.toString()).toBe("rgb(0 0 0)");
    });

    it("resolves nested color functions in the argument", () => {
        const v = parseCSSValue("contrast-color(color-mix(in oklab, red, blue))");
        expect((v as ValueUnit).unit).toBe("color");
        expect(["rgb(0 0 0)", "rgb(255 255 255)"]).toContain(v.toString());
    });

    it("parseCSSColor('contrast-color(white)') resolves to black", () => {
        const v = parseCSSValue("contrast-color(white)");
        expect(v.toString()).toBe("rgb(0 0 0)");
    });
});

describe("safeAccentAgainstSurface (VJ-U-F26 — the rendered-tier accent re-guard)", () => {
    const GRAPHICS_FLOOR = 3;

    /** WCAG ratio of a raw-physical OKLCH accent triple vs a surface Color. */
    const ratio = (
        a: { L: number; C: number; H: number },
        surface: Color,
    ) => wcagContrastRatio(new OKLCHColor(a.L, a.C, a.H, 1), surface);

    it("BORN-RED: the ΔL guard passes but the WCAG ratio breaches — the leaf clears it", () => {
        // The measured U-F26 default-seed dark breach, reproduced: an accent
        // certified against a MID page-ambient walks to a dark lavender that,
        // on the real dark tier, sits at ~1.7:1 — floor-passing in name only.
        const darkAccent = { L: 0.2144, C: 0.1038, H: 318.2 };
        const darkTier = new OKLCHColor(0.369, 0, 0, 1); // the resting rung, dark

        // THE ΔL GUARD (computeSafeAccent) — its own docstring admits it is an
        // OKLab-lightness DISTANCE, not a contrast ratio: against a surface L
        // of 0.369 the accent L 0.214 sits ΔL 0.155 away, BELOW the 0.35
        // threshold, so the ΔL guard MOVES it — but it moves it toward
        // bgL+0.35 = 0.719, and the RESULT's true WCAG ratio is what we assert
        // is unreliable. The point: the ΔL number is not the WCAG number.
        const deltaLguard = computeSafeAccent(
            darkAccent.L,
            darkAccent.C,
            darkAccent.H,
            0.369,
        );
        // The RAW accent (pre-guard) breaches the WCAG graphics floor — the RED.
        expect(ratio(darkAccent, darkTier)).toBeLessThan(GRAPHICS_FLOOR);

        // THE WCAG LEAF — walks the TRUE ratio against the surface COLOR: GREEN.
        const certified = safeAccentAgainstSurface(
            darkAccent.L,
            darkAccent.C,
            darkAccent.H,
            darkTier,
            GRAPHICS_FLOOR,
        );
        expect(ratio(certified, darkTier)).toBeGreaterThanOrEqual(GRAPHICS_FLOOR);
        // Hue is preserved (only lightness walks).
        expect(Math.abs(certified.H - darkAccent.H)).toBeLessThan(1);
        // sanity: the ΔL guard's own output is a triple, not a ratio guarantee.
        expect(deltaLguard.H).toBe(darkAccent.H);
    });

    it("the referent is a COLOR, not a lightness — a chromatic surface differs from gray-at-L", () => {
        // A SATURATED surface and a GRAY at the SAME OKLab L have different WCAG
        // relative luminance, so certifying against each can diverge. Pick a
        // vivid blue tier; a gray at its OKLab L is far lighter in WCAG luma.
        const blueTier = new OKLCHColor(0.45, 0.28, 264, 1); // vivid blue
        const grayAtL = new OKLCHColor(0.45, 0, 0, 1); // gray at the same L
        const accent = { L: 0.55, C: 0.12, H: 264 }; // a near-hue accent

        const rBlue = ratio(accent, blueTier);
        const rGray = ratio(accent, grayAtL);
        // The two referents genuinely disagree (the gray-proxy fiction) —
        // materially (≈0.19 ratio units here), well above float noise. The
        // divergence SCALES WITH SURFACE CHROMA: near-neutral tiers (the real
        // U-F12 warm-brown card) diverge < 0.01, which is why the dominant
        // U-F26 lever is the ambient→surface-LIGHTNESS referent (Pole A) and
        // the surface-COLOR referent is the precision seam this leaf opens.
        expect(Math.abs(rBlue - rGray)).toBeGreaterThan(0.1);

        // The leaf certifies against the ACTUAL chromatic surface (its own
        // luminance), clearing the floor on THAT surface by construction.
        const certified = safeAccentAgainstSurface(
            accent.L,
            accent.C,
            accent.H,
            blueTier,
            GRAPHICS_FLOOR,
        );
        expect(ratio(certified, blueTier)).toBeGreaterThanOrEqual(GRAPHICS_FLOOR);
    });

    it("returns the accent unchanged when it already clears the floor (fidelity)", () => {
        const lightTier = new OKLCHColor(0.9, 0, 0, 1);
        const deepAccent = { L: 0.35, C: 0.14, H: 30 }; // already high-contrast
        expect(ratio(deepAccent, lightTier)).toBeGreaterThanOrEqual(GRAPHICS_FLOOR);
        const out = safeAccentAgainstSurface(
            deepAccent.L,
            deepAccent.C,
            deepAccent.H,
            lightTier,
            GRAPHICS_FLOOR,
        );
        // Gamut-clamp is idempotent on an in-gamut point → L/C/H essentially held.
        expect(out.L).toBeCloseTo(deepAccent.L, 4);
        expect(out.H).toBeCloseTo(deepAccent.H, 1);
    });

    it("clears the floor on BOTH a dark and a light tier (direction by reach)", () => {
        for (const surfaceL of [0.30, 0.92]) {
            const surface = new OKLCHColor(surfaceL, 0, 0, 1);
            // Start from an accent close to the surface (a hard case).
            const near = { L: surfaceL, C: 0.1, H: 200 };
            const certified = safeAccentAgainstSurface(
                near.L,
                near.C,
                near.H,
                surface,
                GRAPHICS_FLOOR,
            );
            expect(
                ratio(certified, surface),
                `surfaceL=${surfaceL}`,
            ).toBeGreaterThanOrEqual(GRAPHICS_FLOOR);
        }
    });
});

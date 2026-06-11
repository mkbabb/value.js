import { describe, expect, it } from "vitest";
import {
    color2,
    cssColorInterpKeyword,
    DisplayP3Color,
    gamutMap,
    OKLABColor,
    OKLCHColor,
    Rec2020Color,
    RGBColor,
} from "../src/units/color";
import { deltaEOK } from "../src/units/color/gamut";
import { parseCSSColor } from "../src/parsing/color";

// ──────────────────────────────────────────────────────────────────────────────
// N.W7.A B1 — zero-alloc precision `toAnimationString` serializer.
//
// The apply-path serializer mirrors keyframes' compact-emit semantics: a
// digits-precision CSS-valid color string, the `/ 1` alpha clause omitted at full
// opacity (the B1b choke point), `none`/NaN channels as the CSS `none` keyword,
// and zero per-call channel-array allocation (a reused module scratch).
// ──────────────────────────────────────────────────────────────────────────────

describe("toAnimationString — B1 precision + zero-alloc", () => {
    it("emits a digits-precision string in the color's own space", () => {
        const c = new OKLABColor(0.7, 0.1, 0.05, 1);
        expect(c.toAnimationString(3)).toBe("oklab(0.7 0.1 0.05)");
    });

    it("omits the `/ 1` clause at full opacity (B1b choke point)", () => {
        // No `/ 1` — CSS Color 4 §4 canonical opaque form.
        expect(new OKLABColor(0.7, 0.1, 0.05, 1).toAnimationString(3)).toBe(
            "oklab(0.7 0.1 0.05)",
        );
        expect(new RGBColor(255, 0, 0, 1).toAnimationString(3)).toBe(
            "rgb(255 0 0)",
        );
    });

    it("emits the alpha clause when not opaque", () => {
        expect(new OKLABColor(0.7, 0.1, 0.05, 0.5).toAnimationString(3)).toBe(
            "oklab(0.7 0.1 0.05 / 0.5)",
        );
    });

    it("serializes a `none`/NaN channel as the CSS `none` keyword", () => {
        expect(new RGBColor(NaN, 0, 0, 1).toAnimationString(3)).toBe(
            "rgb(none 0 0)",
        );
        expect(new RGBColor(255, 0, 0, NaN).toAnimationString(3)).toBe(
            "rgb(255 0 0 / none)",
        );
    });

    it("respects the digits argument and strips all-zero decimals", () => {
        const c = new OKLABColor(0.123456, 0.1, 0.05, 1);
        expect(c.toAnimationString(2)).toBe("oklab(0.12 0.1 0.05)");
        expect(c.toAnimationString(4)).toBe("oklab(0.1235 0.1 0.05)");
    });

    it("wraps a `color()`-predefined space in the CSS-valid color() form (B2 form)", () => {
        // The bare `display-p3(…)` form is invalid CSS — the apply path emits
        // the `color(display-p3 …)` wrapper a UA can parse.
        expect(new DisplayP3Color(1, 0, 0, 1).toAnimationString(3)).toBe(
            "color(display-p3 1 0 0)",
        );
        expect(new Rec2020Color(0.5, 0.25, 0.75, 0.5).toAnimationString(3)).toBe(
            "color(rec2020 0.5 0.25 0.75 / 0.5)",
        );
    });

    it("does not allocate a fresh channel array per call (scratch reuse is correct)", () => {
        // Two interleaved colors of different arity must each serialize correctly
        // — proves the shared scratch is fully (re)written per call, not leaked.
        const a = new RGBColor(10, 20, 30, 1);
        const b = new OKLABColor(0.4, -0.1, 0.2, 1);
        expect(a.toAnimationString(2)).toBe("rgb(10 20 30)");
        expect(b.toAnimationString(2)).toBe("oklab(0.4 -0.1 0.2)");
        // Re-run a after b — a's output must be unchanged (scratch not stale).
        expect(a.toAnimationString(2)).toBe("rgb(10 20 30)");
    });
});

// ──────────────────────────────────────────────────────────────────────────────
// N.W7.A B2 — output-space emit (the corrected emit-space rule).
//
// `<color-interpolation-method>` is implicit in a keyframe's syntax family
// (CSS Color 4 §12). A default `oklab` request emits a non-legacy family
// REGARDLESS of input family; an explicit `srgb` request emits legacy `rgb()`.
// ──────────────────────────────────────────────────────────────────────────────

describe("toAnimationString — B2 output-space emit", () => {
    it("emits a non-legacy family for a non-legacy request, even from rgb() input", () => {
        const c = parseCSSColor("rgb(255 0 0)").value as RGBColor;
        // sRGB-red requested as oklab → emit oklab (UA then interpolates in OKLab).
        expect(c.toAnimationString(3, "oklab")).toMatch(/^oklab\(/);
        expect(c.toAnimationString(3, "oklch")).toMatch(/^oklch\(/);
    });

    it("emits legacy rgb() for an explicit srgb request", () => {
        const c = parseCSSColor("oklab(0.628 0.225 0.126)").value as OKLABColor;
        expect(c.toAnimationString(3, "srgb")).toMatch(/^rgb\(/);
    });

    it("treats `rgb` and `srgb` as the same legacy-sRGB request", () => {
        const c = parseCSSColor("oklab(0.628 0.225 0.126)").value as OKLABColor;
        expect(c.toAnimationString(3, "rgb")).toBe(
            c.toAnimationString(3, "srgb"),
        );
    });

    it("a same-space request is a verbatim no-op (no conversion drift)", () => {
        const c = parseCSSColor("oklab(0.7 0.1 0.05)").value as OKLABColor;
        expect(c.toAnimationString(3, "oklab")).toBe("oklab(0.7 0.1 0.05)");
    });

    it("emits the CSS color() wrapper for a wide-gamut output-space request", () => {
        const c = parseCSSColor("oklab(0.7 0.1 0.05)").value as OKLABColor;
        expect(c.toAnimationString(4, "display-p3")).toMatch(
            /^color\(display-p3 /,
        );
    });

    it("round-trips through parse within a JND (parse(emit(x)) ≈ x)", () => {
        // Emit an sRGB color as OKLab, reparse, emit back to sRGB — the sRGB
        // triple must return within a JND (the emit is sub-JND lossy by design).
        const c = parseCSSColor("rgb(200 80 40)").value as RGBColor;
        const viaOklab = parseCSSColor(c.toAnimationString(6, "oklab"))
            .value as OKLABColor;
        const back = parseCSSColor(viaOklab.toAnimationString(6, "srgb"))
            .value as RGBColor;
        // Both in raw OKLab via deltaEOK (stored a/b are physical here).
        const oA = color2(
            new RGBColor(200 / 255, 80 / 255, 40 / 255, 1),
            "oklab",
        );
        const oB = color2(
            new RGBColor(
                (back.r as number) / 255,
                (back.g as number) / 255,
                (back.b as number) / 255,
                1,
            ),
            "oklab",
        );
        const dE = deltaEOK(
            oA.l as number,
            oA.a as number,
            oA.b as number,
            oB.l as number,
            oB.a as number,
            oB.b as number,
        );
        expect(dE).toBeLessThan(0.02); // sub-JND.
    });

    it("computed (number-domain) and parsed colors emit the same space conversion", () => {
        // A computed OKLABColor (L[0,1], a/b physical) and the parsed rgb red it
        // approximates must agree (the number-domain normalize-in convention).
        const computed = new OKLABColor(0.6279, 0.2249, 0.1258, 1);
        const out = computed.toAnimationString(2, "oklch");
        expect(out).toMatch(/^oklch\(0\.63 /);
    });
});

// ──────────────────────────────────────────────────────────────────────────────
// N.W7.A B4 — P3 egress gamut.
//
// `gamutMap(color, targetSpace)` maps to the TARGET space's gamut. A P3-only
// color stays saturated in P3 and is only sRGB-clipped on an sRGB egress.
// ──────────────────────────────────────────────────────────────────────────────

// A vivid P3-green that sits inside the P3 gamut but OUTSIDE sRGB. Verified
// below: the sRGB egress pins the red channel to 0 (out-of-sRGB), while the P3
// egress keeps every channel strictly interior (P3 fits it untouched).
const p3Only = () =>
    parseCSSColor("color(display-p3 0.1 0.8 0.2)").value as DisplayP3Color;

// Normalize a parsed `rgb()` color ([0,255]) to the [0,1] domain `color2` reads.
const rgbToUnit = (c: RGBColor): RGBColor =>
    new RGBColor(
        (c.r as number) / 255,
        (c.g as number) / 255,
        (c.b as number) / 255,
        1,
    );

describe("gamutMap — B4 egress gamut", () => {
    it("a P3-only color stays interior under a display-p3 egress (no clamp)", () => {
        // The emitted P3 channels are strictly interior — P3 fits the color, so
        // its own-gamut map is a no-op (B4: no silent sRGB desaturation).
        const p3 = parseCSSColor(
            p3Only().toAnimationString(6, "display-p3"),
        ).value as DisplayP3Color;
        for (const ch of ["r", "g", "b"] as const) {
            expect(Number(p3[ch])).toBeGreaterThan(0.001);
            expect(Number(p3[ch])).toBeLessThan(0.999);
        }
    });

    it("the same color clamps a channel under the sRGB egress (desaturates)", () => {
        // Out-of-sRGB → the sRGB egress pins a channel to a boundary. This is the
        // silent desaturation B4 avoids when the requested egress is wide-gamut.
        const rgb = parseCSSColor(
            p3Only().toAnimationString(6, "srgb"),
        ).value as RGBColor;
        const pinned = [rgb.r, rgb.g, rgb.b].some(
            (v) => (v as number) <= 0.5 || (v as number) >= 254.5,
        );
        expect(pinned).toBe(true);
    });

    it("the P3 egress preserves more OKLCh chroma than the sRGB egress", () => {
        const p3 = parseCSSColor(
            p3Only().toAnimationString(6, "display-p3"),
        ).value as DisplayP3Color;
        const rgb = parseCSSColor(
            p3Only().toAnimationString(6, "srgb"),
        ).value as RGBColor;
        // P3 channels are already [0,1] (color2 input domain); rgb needs scaling.
        const cP3 = color2(p3, "oklch").c as number;
        const cSRGB = color2(rgbToUnit(rgb), "oklch").c as number;
        expect(cP3).toBeGreaterThan(cSRGB);
    });

    it("an in-sRGB color is identical under either egress (common path unchanged)", () => {
        // A low-chroma color fits every RGB gamut → the egress choice is a no-op.
        const c = new OKLCHColor(0.6, 0.05, 200 / 360, 1);
        const srgb = gamutMap(c, "rgb") as OKLCHColor;
        const p3 = gamutMap(c, "display-p3") as OKLCHColor;
        expect(srgb.l as number).toBeCloseTo(p3.l as number, 6);
        expect(srgb.c as number).toBeCloseTo(p3.c as number, 6);
    });

    it("preserves hue under a chroma-reducing egress map", () => {
        // A normalized OKLCh outside P3 (c=0.9 of [0,1]) → mapped into P3 holds
        // hue while chroma falls.
        const wild = new OKLCHColor(0.7, 0.9, 30 / 360, 1);
        // gamutMap reads normalized channels (color2 domain) — wild is normalized.
        const mapped = gamutMap(wild, "display-p3") as OKLCHColor;
        expect(mapped.h as number).toBeCloseTo(30 / 360, 4);
        expect(mapped.c as number).toBeLessThan(0.9); // chroma reduced
    });
});

// ──────────────────────────────────────────────────────────────────────────────
// N.W7.A B2 — the WAAPI `<color-interpolation-method>` keyword (value.js half).
// ──────────────────────────────────────────────────────────────────────────────

describe("cssColorInterpKeyword — WAAPI interp-method keyword", () => {
    it("returns the bare space name for a rectangular non-legacy space", () => {
        expect(cssColorInterpKeyword("oklab")).toBe("oklab");
        expect(cssColorInterpKeyword("lab")).toBe("lab");
    });

    it("appends the hue method for a polar space", () => {
        expect(cssColorInterpKeyword("oklch")).toBe("oklch shorter hue");
        expect(cssColorInterpKeyword("oklch", "longer")).toBe("oklch longer hue");
        expect(cssColorInterpKeyword("hsl", "increasing")).toBe(undefined); // hsl is legacy
    });

    it("returns undefined for a legacy family (sRGB is the implicit default)", () => {
        expect(cssColorInterpKeyword("rgb")).toBe(undefined);
        expect(cssColorInterpKeyword("hsl")).toBe(undefined);
        expect(cssColorInterpKeyword("hwb")).toBe(undefined);
    });
});

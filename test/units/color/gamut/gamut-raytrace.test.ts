import { describe, expect, it } from "vitest";
import {
    deltaEOK,
    gamutMapOKLab,
    isInSRGBGamut,
    oklabToLinearSRGB,
} from "@src/units/color/gamut";
import {
    gamutMapOKLabRaytrace,
    gamutMapSRGBRaytrace,
} from "@src/units/color/gamut-raytrace";
import * as colorSubpath from "@src/subpaths/color";

// ─────────────────────────────────────────────────────────────────────────────
// S.W1-10 — the raytrace gamut map, validated against the analytical Ottosson
// map (`gamut.ts`) as the ORACLE. The two share the adaptive-L0 ray exactly, so
// they AGREE within the analytical's approximation error; the raytrace DIVERGES
// by landing strictly on the sRGB surface where the analytical's single Halley
// step leaves a small overshoot. Both properties are pinned below from measured
// bounds (see the module doc for why the divergence is the point).
// ─────────────────────────────────────────────────────────────────────────────

// A dense out-of-gamut OKLab corpus: high-chroma sweeps across L and hue.
function oogCorpus(): Array<[number, number, number]> {
    const out: Array<[number, number, number]> = [];
    for (let li = 1; li <= 19; li++) {
        const L = li / 20;
        for (let h = 0; h < 360; h += 5) {
            const hr = (h * Math.PI) / 180;
            for (const C of [0.15, 0.2, 0.25, 0.3, 0.35, 0.4]) {
                const a = C * Math.cos(hr);
                const b = C * Math.sin(hr);
                const lin = oklabToLinearSRGB(L, a, b);
                if (!isInSRGBGamut(lin[0], lin[1], lin[2])) out.push([L, a, b]);
            }
        }
    }
    return out;
}

const gamutOvershoot = (l: number[]): number =>
    Math.max(0, -l[0]!, l[0]! - 1, -l[1]!, l[1]! - 1, -l[2]!, l[2]! - 1);

describe("raytrace gamut map — agreement with the analytical oracle (S.W1-10)", () => {
    it("agrees with gamutMapOKLab within ΔE-OK < 1e-3 on the shared OOG domain", () => {
        const corpus = oogCorpus();
        expect(corpus.length).toBeGreaterThan(5000); // the domain is substantial
        let maxDE = 0;
        for (const [L, a, b] of corpus) {
            const an = gamutMapOKLab(L, a, b);
            const rt = gamutMapOKLabRaytrace(L, a, b);
            maxDE = Math.max(maxDE, deltaEOK(an[0], an[1], an[2], rt[0], rt[1], rt[2]));
        }
        // Measured max ≈ 4.05e-4 — well under one JND (0.02) and under the bound.
        expect(maxDE).toBeLessThan(1e-3);
    });

    it("in-gamut colors pass through unchanged (identical to the analytical)", () => {
        for (const [L, a, b] of [
            [0.5, 0.05, -0.02], [0.7, -0.03, 0.04], [0.2, 0.0, 0.0], [0.9, 0.01, 0.01],
        ] as Array<[number, number, number]>) {
            const rt = gamutMapOKLabRaytrace(L, a, b);
            expect(rt[0]).toBe(L);
            expect(rt[1]).toBe(a);
            expect(rt[2]).toBe(b);
        }
    });

    it("preserves hue exactly (the a,b direction is untouched)", () => {
        for (const [L, a, b] of oogCorpus()) {
            const hIn = Math.atan2(b, a);
            const rt = gamutMapOKLabRaytrace(L, a, b);
            const cOut = Math.hypot(rt[1], rt[2]);
            if (cOut < 1e-9) continue; // achromatic result — hue is inert
            const hOut = Math.atan2(rt[2], rt[1]);
            let dh = Math.abs(hOut - hIn);
            if (dh > Math.PI) dh = 2 * Math.PI - dh;
            expect(dh).toBeLessThan(1e-9);
        }
    });
});

describe("raytrace gamut map — the DIVERGENCE that is the point (S.W1-10)", () => {
    it("lands STRICTLY on the sRGB surface (overshoot 0) where the analytical leaves a residual", () => {
        const corpus = oogCorpus();
        let maxRtOver = 0;
        let maxAnOver = 0;
        for (const [L, a, b] of corpus) {
            const an = gamutMapOKLab(L, a, b);
            const rt = gamutMapOKLabRaytrace(L, a, b);
            maxRtOver = Math.max(maxRtOver, gamutOvershoot(oklabToLinearSRGB(rt[0], rt[1], rt[2])));
            maxAnOver = Math.max(maxAnOver, gamutOvershoot(oklabToLinearSRGB(an[0], an[1], an[2])));
        }
        // Raytrace NEVER escapes the cube — bisection returns the largest
        // in-gamut t, so every mapped color is renderable to ~2⁻⁴⁰.
        expect(maxRtOver).toBeLessThan(1e-8);
        // The analytical single-Halley-step DOES leave a residual (measured
        // ≈1.1e-4) — the divergence is real, not vacuous. This overshoot is what
        // the production clamp absorbs and what the raytrace never makes.
        expect(maxAnOver).toBeGreaterThan(1e-5);
    });

    it("each raytraced OOG color is exactly on the boundary (a channel at 0 or 1)", () => {
        for (const [L, a, b] of oogCorpus()) {
            const rt = gamutMapOKLabRaytrace(L, a, b);
            const l = oklabToLinearSRGB(rt[0], rt[1], rt[2]);
            expect(isInSRGBGamut(l[0], l[1], l[2])).toBe(true);
            // On the surface: min channel ≈ 0 OR max channel ≈ 1 (~1e-9).
            const onSurface =
                Math.min(l[0], l[1], l[2]) < 1e-9 || Math.max(l[0], l[1], l[2]) > 1 - 1e-9;
            expect(onSurface).toBe(true);
        }
    });
});

describe("gamutMapSRGBRaytrace — sRGB veneer", () => {
    it("passes in-gamut sRGB through and maps OOG sRGB into [0,1]³", () => {
        expect(gamutMapSRGBRaytrace(0.5, 0.5, 0.5)).toEqual([0.5, 0.5, 0.5]);
        // A wildly OOG sRGB triple (from wide-gamut arithmetic) maps into gamut.
        const [r, g, b] = gamutMapSRGBRaytrace(1.3, -0.2, 0.1);
        for (const v of [r, g, b]) {
            expect(v).toBeGreaterThanOrEqual(0);
            expect(v).toBeLessThanOrEqual(1);
        }
    });

    it("the subpath surfaces both raytrace mappers", () => {
        expect(typeof colorSubpath.gamutMapOKLabRaytrace).toBe("function");
        expect(typeof colorSubpath.gamutMapSRGBRaytrace).toBe("function");
    });
});

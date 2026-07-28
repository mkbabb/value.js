import { describe, it, expect } from "vitest";
import {
    certifyAccentInk,
    resolveSurfaceLightness,
    TEXT_CONTRAST_FLOOR,
    CERTIFY_HEADROOM,
} from "/Users/mkbabb/Programming/value.js/demo/color-session/ink";
import { convertColor } from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";

// WCAG 2.x relative luminance / contrast, recomputed locally so the number is
// independent of the app's own pass/fail predicate.
const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
function lum(css: string): number {
    const p = parseCssColor(css);
    if (!p.ok) throw new Error("parse " + css);
    const rgb = convertColor(p.value, "rgb");
    if (!rgb.ok) throw new Error("convert " + css);
    const [r, g, b] = rgb.value.channels as number[];
    return 0.2126 * lin(r! / 255) + 0.7152 * lin(g! / 255) + 0.0722 * lin(b! / 255);
}
function ratio(a: string, b: string): number {
    const [x, y] = [lum(a), lum(b)];
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

describe("CHALLENGE-D · PaletteSlugBar raw-ink sweep", () => {
    it("counts raw picks that fail the app's own text floor on the plate the pill sits on", () => {
        const FLOOR = TEXT_CONTRAST_FLOOR + CERTIFY_HEADROOM; // 5.75
        // Ambient lightness sweep: the derived atmosphere L the boot writer
        // publishes. 0.35 / 0.51 / 0.75 bracket dark, mid, light grounds.
        const arms: Array<[string, number, boolean]> = [
            ["light-ambient-0.75", 0.75, false],
            ["light-ambient-0.51", 0.51, false],
            ["dark-ambient-0.35", 0.35, true],
            ["dark-ambient-0.22", 0.22, true],
        ];
        for (const [name, ambient, dark] of arms) {
            const restingL = resolveSurfaceLightness("resting", ambient, dark);
            const surfaceCss = `oklch(${restingL} 0 0)`;
            let fails = 0, total = 0, worst = Infinity, worstCss = "";
            const ratios: number[] = [];
            // Realistic pick population: the picker's own gamut walk.
            for (let L = 0.35; L <= 0.95; L += 0.05) {
                for (let C = 0.05; C <= 0.30; C += 0.05) {
                    for (let H = 0; H < 360; H += 15) {
                        const css = `oklch(${L.toFixed(2)} ${C.toFixed(2)} ${H})`;
                        total++;
                        const r = ratio(css, surfaceCss);
                        ratios.push(r);
                        if (r < FLOOR) fails++;
                        if (r < worst) { worst = r; worstCss = css; }
                    }
                }
            }
            ratios.sort((a, b) => a - b);
            const median = ratios[Math.floor(ratios.length / 2)]!;
            console.log(
                `[SWEEP ${name}] restingL=${restingL.toFixed(4)} n=${total} ` +
                `fail(<${FLOOR})=${fails} (${((fails / total) * 100).toFixed(1)}%) ` +
                `median=${median.toFixed(2)}:1 worst=${worst.toFixed(2)}:1 @ ${worstCss}`,
            );
            // Certifier agreement: does certifyAccentInk actually MOVE the ink?
            let moved = 0;
            for (let L = 0.35; L <= 0.95; L += 0.05)
                for (let C = 0.05; C <= 0.30; C += 0.05)
                    for (let H = 0; H < 360; H += 15) {
                        const css = `oklch(${L.toFixed(2)} ${C.toFixed(2)} ${H})`;
                        if (certifyAccentInk(css, restingL) !== css) moved++;
                    }
            console.log(`[SWEEP ${name}] certifyAccentInk would MOVE ${moved}/${total} (${((moved / total) * 100).toFixed(1)}%)`);
        }
        expect(true).toBe(true);
    });

    it("names one concrete pick and its two inks", () => {
        const restingL = resolveSurfaceLightness("resting", 0.75, false);
        const pick = "oklch(0.80 0.15 60)"; // an ordinary warm pick
        const certified = certifyAccentInk(pick, restingL);
        const surfaceCss = `oklch(${restingL} 0 0)`;
        console.log(`[CASE] plate L=${restingL.toFixed(4)}`);
        console.log(`[CASE] RAW  ${pick}  -> ${ratio(pick, surfaceCss).toFixed(2)}:1  (PaletteSlugBar.vue:49)`);
        console.log(`[CASE] CERT ${certified} -> ${ratio(certified, surfaceCss).toFixed(2)}:1  (ProfileSection.vue:31)`);
        expect(true).toBe(true);
    });
});

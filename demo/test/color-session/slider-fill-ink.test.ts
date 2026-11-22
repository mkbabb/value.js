/**
 * The scalar sliders' range ink is his colour, certified on glass's quiet
 * track (critique C-09; his [67] "more colourful").
 *
 * The range used to be painted `--foreground` (near-black in light, pale grey
 * in dark) on Extract, Generate, Gradient, Atmosphere and Blob, while every
 * other control on the page carried the current colour. The ink is now the
 * live colour walked to the 3:1 graphics floor on the track it paints over
 * (`--muted-medium` over the resting plate: the "track" surface), keeping
 * its hue.
 */
import { describe, expect, it } from "vitest";
import { computed, effectScope } from "vue";
import { convertColor, oklch, parseCssColor, contrastRatio } from "@mkbabb/value.js/color";
import { useContrastSafeColor } from "../../color-session/useContrastSafeColor";
import { GRAPHICS_CONTRAST_FLOOR, resolveSurfaceLightness } from "../../color-session/ink";

function sliderFill(color: string, ambient: number): string {
    const scope = effectScope();
    const boot = scope.run(() => useContrastSafeColor(computed(() => color), computed(() => ambient)))!;
    const ink = boot.sliderFillInkCss.value;
    scope.stop();
    return ink;
}

function toOklch(css: string) {
    const parsed = parseCssColor(css);
    if (!parsed.ok) throw new Error(`unparsable ${css}`);
    const value = convertColor(parsed.value, "oklch");
    if (!value.ok) throw new Error("unconvertible");
    return value.value;
}

describe("the scalar range ink (C-09)", () => {
    // Light scheme (jsdom's default), a mid ambient; colours at the track's
    // own lightness are the camouflage case the walk exists for.
    const AMBIENT = 0.62;
    const trackL = resolveSurfaceLightness("track", AMBIENT, false);

    for (const hue of [2, 145, 265]) {
        it(`keeps the hue and clears 3:1 on the quiet track (h ${hue})`, () => {
            const color = `oklch(${trackL.toFixed(4)} 0.14 ${hue})`;
            const ink = toOklch(sliderFill(color, AMBIENT));
            const [, c, h] = ink.channels.map(Number);
            expect(c, "his colour, not a neutral stand-in").toBeGreaterThan(0.03);
            const dh = Math.abs(((h! - hue + 540) % 360) - 180);
            expect(dh).toBeLessThan(15);
            const ground = oklch(trackL, 0, 0, 1);
            if (!ground.ok) throw new Error("ground");
            const ratio = contrastRatio(ink, ground.value);
            if (!ratio.ok) throw new Error("ratio");
            expect(ratio.value).toBeGreaterThanOrEqual(GRAPHICS_CONTRAST_FLOOR);
        });
    }

    it("the track is the muted wash over the resting plate, lighter than the plate in light", () => {
        expect(trackL).toBeGreaterThan(resolveSurfaceLightness("resting", AMBIENT, false));
    });
});

/**
 * o1105 U3 — the spectrum thumb moves by transform.
 *
 * Before: the thumb was placed by `left` / `top` percentages, so every move of
 * a spectrum drag re-laid it out. After: a travel layer the size of the
 * thumb's travel box carries it, placed by `translate3d` in its own
 * percentages, which the compositor moves without layout. The pointer map and
 * the inset travel (V3C-07) are unchanged: at full value the thumb's centre
 * sits half a thumb inside the plate's top edge, at zero value half a thumb
 * inside its bottom edge.
 */
import { describe, expect, it } from "vitest";
import { computed } from "vue";
import { hsv } from "@mkbabb/value.js/color";
import { useSpectrumPlateStyle } from "../../picker/controls/SpectrumCanvas/composables/useSpectrumPlateStyle";

function plate(s: number, v: number) {
    const color = hsv(200, s, v, 1);
    if (!color.ok) throw new Error(color.error.code);
    return useSpectrumPlateStyle({
        HSVCurrentColor: computed(() => color.value as never),
        cssColorOpaque: computed(() => "oklch(0.6 0.1 200)"),
        dotPos: computed(() => ({ s, v })),
    });
}

describe("o1105 U3 — the spectrum thumb rides a transform", () => {
    it("the thumb carries no layout position; the travel layer is translated by s and 1 − v of its own box", () => {
        const { spectrumDotStyle, spectrumTravelStyle } = plate(0.25, 0.8);
        expect(Object.keys(spectrumDotStyle.value)).not.toContain("left");
        expect(Object.keys(spectrumDotStyle.value)).not.toContain("top");
        expect(spectrumTravelStyle.value.transform).toBe("translate3d(25%, 20%, 0)");
    });

    it("the corners map to the travel box's corners", () => {
        const travel = (s: number, v: number) => plate(s, v).spectrumTravelStyle.value.transform;
        expect(travel(0, 1)).toBe("translate3d(0%, 0%, 0)");
        expect(travel(1, 0)).toBe("translate3d(100%, 100%, 0)");
    });
});

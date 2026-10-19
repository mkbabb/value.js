/**
 * X.W7.z2 · EC-10 (fold W7.543) — `paletteRail`, the one hard-band builder
 * both palette rails share (extract's k rail, generate's count rail).
 */
import { describe, expect, it } from "vitest";
import { paletteRail } from "../../color-session/palette-rail";

describe("paletteRail", () => {
    it("gives each colour an equal band with hard (two-position) stops", () => {
        expect(paletteRail(["red", "blue"])).toBe("linear-gradient(to right, red 0% 50%, blue 50% 100%)");
    });

    it("opens each band exactly where the last closed, so no pixel is interpolated", () => {
        const stops = paletteRail(["a", "b", "c", "d", "e", "f", "g"])
            .replace(/^linear-gradient\(to right, |\)$/g, "")
            .split(", ")
            .map((s) => s.split(" "));
        expect(stops).toHaveLength(7);
        expect(stops[0]![1]).toBe("0%");
        expect(stops.at(-1)![2]).toBe("100%");
        for (let i = 1; i < stops.length; i++) expect(stops[i]![1]).toBe(stops[i - 1]![2]);
    });

    it("paints a single colour across the whole rail", () => {
        expect(paletteRail(["red"])).toBe("linear-gradient(to right, red 0% 100%)");
    });
});

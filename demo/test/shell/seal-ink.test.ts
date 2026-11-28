import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { contrastInkFor, DARK_SEAT_LIGHT_INK_FLOOR, seatInkFor } from "../../color-session/ink";

/**
 * O60 A (the owner, 23 Nov, on a dock seat on a pink plate with its Palettes
 * glyph drawn in black): "should be white in darkmode". The collapsed dock's
 * seal inks the current view's glyph over the live colour. In dark mode the
 * glyph is light, as every other glyph in the dark dock is, unless the wax is
 * too pale to carry a light glyph; in light mode the contrast walk chooses.
 */
const WHITE = "oklch(1 0 0)";
const BLACK = "oklch(0 0 0)";
const DEFAULT_PINK = "oklch(73% 0.185 2)";

describe("the seal's glyph ink", () => {
    it("dark: light on the default pink, where the contrast walk chose black", () => {
        expect(contrastInkFor(DEFAULT_PINK)).toBe(BLACK);
        expect(seatInkFor(DEFAULT_PINK, true)).toBe(WHITE);
        for (const wax of ["hotpink", "tomato", "oklch(72% 0.12 88)", "brown", "navy", "teal"]) {
            expect(seatInkFor(wax, true), wax).toBe(WHITE);
        }
    });

    it(`dark: a pale wax keeps the dark glyph (white under ${DARK_SEAT_LIGHT_INK_FLOOR}:1 would vanish)`, () => {
        for (const wax of ["pink", "beige", "white", "yellow", "skyblue", "oklch(90% 0.055 18)"]) {
            expect(seatInkFor(wax, true), wax).toBe(BLACK);
        }
    });

    it("light: the contrast walk, unchanged", () => {
        for (const wax of [DEFAULT_PINK, "pink", "brown", "navy", "beige", "tomato"]) {
            expect(seatInkFor(wax, false), wax).toBe(contrastInkFor(wax));
        }
    });

    it("the Dock writes the seal's ink from the scheme, and the ink turns on a tween", () => {
        const dock = readFileSync(resolve(import.meta.dirname, "../../shell/dock/Dock.vue"), "utf8");
        expect(dock).toMatch(/seatInkFor\(cssColorOpaque\.value, isDark\.value\)/);
        expect(dock).not.toMatch(/contrastInkFor\(cssColorOpaque\.value\)/);
        const seal = dock.slice(dock.indexOf(".dock-seal {"), dock.indexOf("}", dock.indexOf(".dock-seal {")));
        expect(seal).toMatch(/transition: color var\(--duration-fast\) var\(--ease-standard\);/);
    });
});

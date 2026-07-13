import { describe, expect, it } from "vitest";
import {
    channelLabel,
    sliderValueText,
} from "../demo/@/components/custom/color-picker/controls/ComponentSliders/composables/sliderAnnouncement";

// ─────────────────────────────────────────────────────────────────────────────
// U.W-A11Y · U-F27 (BR-4 formatter) — the slider announcement grammar.
//
// The a11y gate proper is the o27 e2e (aria-valuetext present + human-readable
// on the live thumbs). This unit suite guards the FORMATTER's correctness — the
// channel-name disambiguation the same key needs across spaces, and the
// human-readable "Name value" composition (never a raw ≥10-digit float).
// ─────────────────────────────────────────────────────────────────────────────

describe("channelLabel — space-disambiguated channel names", () => {
    it("names the unambiguous rgb/hsl channels", () => {
        expect(channelLabel("rgb", "r")).toBe("Red");
        expect(channelLabel("rgb", "g")).toBe("Green");
        expect(channelLabel("rgb", "b")).toBe("Blue");
        expect(channelLabel("hsl", "h")).toBe("Hue");
        expect(channelLabel("hsl", "s")).toBe("Saturation");
        expect(channelLabel("hsl", "l")).toBe("Lightness");
        expect(channelLabel("hsv", "v")).toBe("Value");
    });

    it("disambiguates the colliding `b` key by space", () => {
        expect(channelLabel("rgb", "b")).toBe("Blue");
        expect(channelLabel("hwb", "b")).toBe("Blackness");
        expect(channelLabel("lab", "b")).toBe("b axis");
        expect(channelLabel("oklab", "b")).toBe("b axis");
    });

    it("names the cylindrical + cartesian perceptual channels", () => {
        expect(channelLabel("oklch", "c")).toBe("Chroma");
        expect(channelLabel("oklch", "h")).toBe("Hue");
        expect(channelLabel("lab", "l")).toBe("Lightness");
        expect(channelLabel("lab", "a")).toBe("a axis");
        expect(channelLabel("xyz", "z")).toBe("Z");
        expect(channelLabel("kelvin", "kelvin")).toBe("Temperature");
        expect(channelLabel("hsl", "alpha")).toBe("Alpha");
    });

    it("falls back to an upper-cased key for an unknown channel", () => {
        expect(channelLabel("mystery", "q")).toBe("Q");
    });
});

describe("sliderValueText — the human-readable, unit-aware announcement", () => {
    it("composes 'Name value' from the formatted meter cell", () => {
        expect(sliderValueText("hsl", "h", "210°")).toBe("Hue 210°");
        expect(sliderValueText("rgb", "r", "128")).toBe("Red 128");
        expect(sliderValueText("hsl", "s", "42%")).toBe("Saturation 42%");
        expect(sliderValueText("hsl", "alpha", "83%")).toBe("Alpha 83%");
    });

    it("is NEVER the raw ≥10-digit float the reka aria-valuenow emits", () => {
        // The demo formats via the console meter cell; the announcement carries
        // the human name + the least-count value, never `0.5833333333333334`.
        const out = sliderValueText("oklch", "l", "58.3%");
        expect(out).toBe("Lightness 58.3%");
        expect(out).not.toMatch(/\d\.\d{10,}/);
    });

    it("degrades to the channel name alone on an empty meter", () => {
        expect(sliderValueText("rgb", "g", "")).toBe("Green");
        expect(sliderValueText("rgb", "g", "   ")).toBe("Green");
    });
});

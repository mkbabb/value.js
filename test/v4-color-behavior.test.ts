import { describe, expect, it } from "vitest";
import {
    convertColor,
    hsl,
    interpolateHue,
    kelvin,
    mapColorToGamut,
    mixColors,
    oklch,
    rgb,
    safeAccentColor,
    toRgba8,
    type AnyColor,
    type RGBA8,
} from "../src/subpaths/color";

function unwrap<T>(result: { ok: true; value: T } | { ok: false }): T {
    if (!result.ok) throw new Error("fixture failed");
    return result.value;
}

function contrast(first: RGBA8, second: RGBA8): number {
    const luminance = ([r, g, b]: RGBA8) => {
        const linear = (byte: number) => {
            const value = byte / 255;
            return value <= 0.04045
                ? value / 12.92
                : ((value + 0.055) / 1.055) ** 2.4;
        };
        return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
    };
    const a = luminance(first);
    const b = luminance(second);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

describe("Value 4 color behavior", () => {
    it("constructs immutable colors and rejects invalid numeric state", () => {
        const color = unwrap(rgb(12, 34, 56, 0.5));
        expect(Object.isFrozen(color)).toBe(true);
        expect(Object.isFrozen(color.channels)).toBe(true);
        expect(rgb(0, Number.NaN, 0)).toEqual({
            ok: false,
            error: { code: "color_non_finite" },
        });
        expect(rgb(0, 0, 0, 1.01)).toEqual({
            ok: false,
            error: { code: "color_out_of_range" },
        });
        expect(kelvin(999)).toEqual({
            ok: false,
            error: { code: "color_out_of_range" },
        });
    });

    it("rejects forged colors and preserves identity through same-space conversion", () => {
        const source = unwrap(hsl(210, 0.5, 0.4));
        expect(convertColor(source, "hsl")).toEqual({ ok: true, value: source });
        expect(convertColor({ space: "wat", channels: [0], alpha: 1 } as unknown as AnyColor, "rgb"))
            .toEqual({ ok: false, error: { code: "color_invalid_input" } });
    });

    // X.W9.e · G18. This assertion used to read
    //   expect(converted.channels[1]).toBeCloseTo((byte / 255) / 12.92, 12)
    // under the name "matches the independent IEC sRGB dark-band oracle". That
    // expected value is the implementation's OWN low-branch constant re-derived
    // in the test, so the oracle was circular and the name was false — it could
    // not fail for the reason it claimed to guard. The independent vectors now
    // live in `test/color-anchors.test.ts` (culori / Ottosson published
    // goldens, forward-only). What is asserted here is the one thing that file
    // does not cover and that no published triple pins: the SHAPE the IEC
    // 61966-2-1 transfer function specifies — piecewise, with a straight line
    // through the origin below the knee at encoded 0.04045 (0.04045 × 255 =
    // 10.31, so bytes 1..10 are on the line and byte 11 is not). No constant of
    // either branch is quoted; a single-branch implementation, or one whose
    // knee has moved, fails it.
    it("takes the sRGB straight-line branch below the knee and leaves it above", () => {
        const luminance = (byte: number) => {
            const converted = unwrap(convertColor(unwrap(rgb(byte, byte, byte)), "xyz"));
            const y = converted.channels[1];
            if (y === "none") throw new Error("xyz Y is powerless");
            return y;
        };
        const slope = luminance(1);
        for (let byte = 2; byte <= 10; byte++) {
            expect(luminance(byte) / byte).toBeCloseTo(slope, 18);
        }
        expect(luminance(11) / 11).not.toBeCloseTo(slope, 18);
        expect(luminance(11) / 11).toBeGreaterThan(slope);
        expect(luminance(128) / 128).toBeGreaterThan(slope);
    });

    it("implements every hue route in physical degrees", () => {
        expect(interpolateHue(350, 10, 0.5, "shorter")).toEqual({ ok: true, value: 0 });
        expect(interpolateHue(350, 10, 0.5, "increasing")).toEqual({ ok: true, value: 0 });
        expect(interpolateHue(350, 10, 0.5, "decreasing")).toEqual({ ok: true, value: 180 });
        expect(interpolateHue(350, 10, 0.5, "longer")).toEqual({ ok: true, value: 180 });
        expect(interpolateHue(0, 90, -0.1)).toEqual({
            ok: false,
            error: { code: "color_progress_out_of_range" },
        });
    });

    it("mixes alpha-premultiplied channels and carries powerless hue", () => {
        const red = unwrap(rgb(255, 0, 0, 1));
        const blue = unwrap(rgb(0, 0, 255, 0.5));
        const mixed = unwrap(mixColors(red, blue, 0.5, { space: "rgb" }));
        expect(mixed.alpha).toBeCloseTo(0.75, 12);
        expect(mixed.channels[0]).toBeCloseTo(170, 10);
        expect(mixed.channels[1]).toBeCloseTo(0, 10);
        expect(mixed.channels[2]).toBeCloseTo(85, 10);

        const gray = unwrap(hsl("none", 0, 0.5));
        const green = unwrap(hsl(120, 1, 0.5));
        expect(unwrap(mixColors(gray, green, 0.5, { space: "hsl" })).channels[0]).toBe(120);
        expect(mixColors(red, blue, 2, { space: "rgb" })).toEqual({
            ok: false,
            error: { code: "color_progress_out_of_range" },
        });
    });

    it("maps only when needed and retains perceptual hue at the target boundary", () => {
        const inGamut = unwrap(oklch(0.6, 0.05, 40));
        expect(mapColorToGamut(inGamut, "srgb")).toEqual({ ok: true, value: inGamut });

        const vivid = unwrap(oklch(0.65, 0.45, 310));
        const mapped = unwrap(mapColorToGamut(vivid, "display-p3"));
        expect(mapped.channels[0]).toBeCloseTo(0.65, 12);
        expect(mapped.channels[1]).toBeLessThan(0.45);
        expect(mapped.channels[2]).toBeCloseTo(310, 9);
        expect(mapColorToGamut(vivid, "bogus" as never)).toEqual({
            ok: false,
            error: { code: "color_invalid_input" },
        });
    });

    it("certifies the actual painted accent against the supplied surface", () => {
        const accent = unwrap(oklch(0.94, 0.22, 80));
        const surface = unwrap(rgb(255, 255, 255));
        const safe = unwrap(safeAccentColor(accent, surface, {
            minimumRatio: 4.5,
            gamut: "srgb",
        }));
        const safeBytes = unwrap(toRgba8(safe, { gamut: "clip" }));
        const surfaceBytes = unwrap(toRgba8(surface, { gamut: "clip" }));
        expect(contrast(safeBytes, surfaceBytes)).toBeGreaterThanOrEqual(4.49);
        expect(safe.channels[2]).toBeCloseTo(80, 9);
        expect(safeAccentColor(accent, surface, { minimumRatio: 0.9, gamut: "srgb" }))
            .toEqual({ ok: false, error: { code: "color_out_of_range" } });
    });

    it("clips and rounds RGBA explicitly and rejects missing alpha", () => {
        expect(toRgba8(unwrap(rgb(-10, 127.5, 300, 0.5)), { gamut: "clip" }))
            .toEqual({ ok: true, value: [0, 128, 255, 128] });
        expect(toRgba8(unwrap(rgb(1, 2, 3, "none")), { gamut: "clip" }))
            .toEqual({ ok: false, error: { code: "color_missing_alpha" } });
        expect(toRgba8(unwrap(rgb(1, 2, 3)), { gamut: "invalid" } as never))
            .toEqual({ ok: false, error: { code: "color_invalid_input" } });
    });
});

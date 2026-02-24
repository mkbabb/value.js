import { describe, expect, it } from "vitest";
import {
    hex2rgb,
    rgb2hex,
    kelvin2rgb,
    rgb2kelvin,
    rgb2hsl,
    hsl2rgb,
    hsv2hsl,
    hsl2hsv,
    hwb2hsl,
    hsl2hwb,
    rgb2xyz,
    xyz2rgb,
    xyz2lab,
    lab2xyz,
    lab2lch,
    lch2lab,
    xyz2oklab,
    oklab2xyz,
    oklab2oklch,
    oklch2oklab,
    color2,
    gamutMap,
} from "../src/units/color/utils";
import {
    RGBColor,
    HSLColor,
    HSVColor,
    HWBColor,
    LABColor,
    LCHColor,
    OKLABColor,
    OKLCHColor,
    XYZColor,
    KelvinColor,
} from "../src/units/color";

/**
 * Helper: assert that every numeric component of two color objects
 * matches to the given number of decimal digits (default 2).
 */
function expectColorsClose(
    actual: Record<string, any>,
    expected: Record<string, number>,
    digits: number = 2,
) {
    for (const [key, value] of Object.entries(expected)) {
        expect(actual[key]).toBeCloseTo(value, digits);
    }
}

// ---------------------------------------------------------------------------
// hex2rgb / rgb2hex
// ---------------------------------------------------------------------------

describe("hex2rgb", () => {
    it("should parse shorthand black #000", () => {
        const rgb = hex2rgb("#000");
        expectColorsClose(rgb, { r: 0, g: 0, b: 0, alpha: 1 });
    });

    it("should parse shorthand white #fff", () => {
        const rgb = hex2rgb("#fff");
        expectColorsClose(rgb, { r: 255, g: 255, b: 255, alpha: 1 });
    });

    it("should parse full-form black #000000", () => {
        const rgb = hex2rgb("#000000");
        expectColorsClose(rgb, { r: 0, g: 0, b: 0, alpha: 1 });
    });

    it("should parse full-form white #ffffff", () => {
        const rgb = hex2rgb("#ffffff");
        expectColorsClose(rgb, { r: 255, g: 255, b: 255, alpha: 1 });
    });

    it("should parse full-form red #ff0000", () => {
        const rgb = hex2rgb("#ff0000");
        expectColorsClose(rgb, { r: 255, g: 0, b: 0, alpha: 1 });
    });

    it("should parse 8-digit hex with alpha #ff000080", () => {
        const rgb = hex2rgb("#ff000080");
        expect(rgb.r).toBe(255);
        expect(rgb.g).toBe(0);
        expect(rgb.b).toBe(0);
        // 0x80 = 128, 128/255 ~ 0.502
        expect(rgb.alpha).toBeCloseTo(128 / 255, 2);
    });

    it("should parse 4-digit shorthand hex with alpha #f008", () => {
        const rgb = hex2rgb("#f008");
        expect(rgb.r).toBe(255);
        expect(rgb.g).toBe(0);
        expect(rgb.b).toBe(0);
        // 0x88 = 136, 136/255 ~ 0.533
        expect(rgb.alpha).toBeCloseTo(0x88 / 255, 2);
    });

    it("should parse #abcdef correctly", () => {
        const rgb = hex2rgb("#abcdef");
        expect(rgb.r).toBe(0xab);
        expect(rgb.g).toBe(0xcd);
        expect(rgb.b).toBe(0xef);
        expect(rgb.alpha).toBe(1);
    });
});

describe("rgb2hex", () => {
    it("should convert black to #000000", () => {
        const hex = rgb2hex(new RGBColor(0, 0, 0, 1));
        expect(hex).toBe("#000000");
    });

    it("should convert white to #ffffff", () => {
        const hex = rgb2hex(new RGBColor(255, 255, 255, 1));
        expect(hex).toBe("#ffffff");
    });

    it("should convert red to #ff0000", () => {
        const hex = rgb2hex(new RGBColor(255, 0, 0, 1));
        expect(hex).toBe("#ff0000");
    });

    it("should include alpha when alpha < 1", () => {
        const hex = rgb2hex(new RGBColor(255, 0, 0, 0.5));
        // 0.5 * 255 = 127.5 -> Math.round -> 128 = 0x80
        expect(hex).toBe("#ff000080");
    });

    it("should omit alpha when alpha === 1", () => {
        const hex = rgb2hex(new RGBColor(0, 128, 255, 1));
        expect(hex).toBe("#0080ff");
    });
});

describe("hex2rgb / rgb2hex round-trip", () => {
    const hexValues = ["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#abcdef"];

    hexValues.forEach((hex) => {
        it(`should round-trip ${hex}`, () => {
            const rgb = hex2rgb(hex);
            const result = rgb2hex(rgb);
            expect(result).toBe(hex);
        });
    });

    it("should round-trip hex with alpha #ff000080", () => {
        const hex = "#ff000080";
        const rgb = hex2rgb(hex);
        const result = rgb2hex(rgb);
        expect(result).toBe(hex);
    });
});

// ---------------------------------------------------------------------------
// rgb2hsl / hsl2rgb
// ---------------------------------------------------------------------------

describe("rgb2hsl", () => {
    it("should convert pure red (1, 0, 0) to h=0, s=1, l=0.5", () => {
        const hsl = rgb2hsl(new RGBColor(1, 0, 0, 1));
        expect(hsl.h).toBeCloseTo(0, 5);
        expect(hsl.s).toBeCloseTo(1, 5);
        expect(hsl.l).toBeCloseTo(0.5, 5);
        expect(hsl.alpha).toBe(1);
    });

    it("should convert pure green (0, 1, 0) to h~0.333, s=1, l=0.5", () => {
        const hsl = rgb2hsl(new RGBColor(0, 1, 0, 1));
        expect(hsl.h).toBeCloseTo(1 / 3, 5);
        expect(hsl.s).toBeCloseTo(1, 5);
        expect(hsl.l).toBeCloseTo(0.5, 5);
    });

    it("should convert pure blue (0, 0, 1) to h~0.667, s=1, l=0.5", () => {
        const hsl = rgb2hsl(new RGBColor(0, 0, 1, 1));
        expect(hsl.h).toBeCloseTo(2 / 3, 5);
        expect(hsl.s).toBeCloseTo(1, 5);
        expect(hsl.l).toBeCloseTo(0.5, 5);
    });

    it("should convert white (1, 1, 1) to l=1", () => {
        const hsl = rgb2hsl(new RGBColor(1, 1, 1, 1));
        expect(hsl.l).toBeCloseTo(1, 5);
    });

    it("should convert black (0, 0, 0) to l=0", () => {
        const hsl = rgb2hsl(new RGBColor(0, 0, 0, 1));
        expect(hsl.l).toBeCloseTo(0, 5);
    });

    it("should convert 50% gray (0.5, 0.5, 0.5) to s=0, l=0.5", () => {
        const hsl = rgb2hsl(new RGBColor(0.5, 0.5, 0.5, 1));
        expect(hsl.l).toBeCloseTo(0.5, 5);
        // Saturation should be 0 for a neutral gray
        expect(hsl.s).toBeCloseTo(0, 5);
    });

    it("should preserve alpha", () => {
        const hsl = rgb2hsl(new RGBColor(1, 0, 0, 0.42));
        expect(hsl.alpha).toBeCloseTo(0.42, 5);
    });
});

describe("hsl2rgb", () => {
    it("should convert h=0, s=1, l=0.5 to pure red", () => {
        const rgb = hsl2rgb(new HSLColor(0, 1, 0.5, 1));
        expect(rgb.r).toBeCloseTo(1, 5);
        expect(rgb.g).toBeCloseTo(0, 5);
        expect(rgb.b).toBeCloseTo(0, 5);
    });

    it("should convert h=0.333, s=1, l=0.5 to green", () => {
        const rgb = hsl2rgb(new HSLColor(1 / 3, 1, 0.5, 1));
        expect(rgb.r).toBeCloseTo(0, 4);
        expect(rgb.g).toBeCloseTo(1, 4);
        expect(rgb.b).toBeCloseTo(0, 4);
    });

    it("should convert l=0 to black", () => {
        const rgb = hsl2rgb(new HSLColor(0, 0, 0, 1));
        expect(rgb.r).toBeCloseTo(0, 5);
        expect(rgb.g).toBeCloseTo(0, 5);
        expect(rgb.b).toBeCloseTo(0, 5);
    });

    it("should convert l=1 to white", () => {
        const rgb = hsl2rgb(new HSLColor(0, 0, 1, 1));
        expect(rgb.r).toBeCloseTo(1, 5);
        expect(rgb.g).toBeCloseTo(1, 5);
        expect(rgb.b).toBeCloseTo(1, 5);
    });
});

describe("rgb2hsl / hsl2rgb round-trip", () => {
    const testColors = [
        { name: "red", r: 1, g: 0, b: 0 },
        { name: "green", r: 0, g: 1, b: 0 },
        { name: "blue", r: 0, g: 0, b: 1 },
        { name: "yellow", r: 1, g: 1, b: 0 },
        { name: "cyan", r: 0, g: 1, b: 1 },
        { name: "magenta", r: 1, g: 0, b: 1 },
        { name: "coral-ish", r: 0.9, g: 0.4, b: 0.3 },
        { name: "teal-ish", r: 0.1, g: 0.7, b: 0.6 },
    ];

    testColors.forEach(({ name, r, g, b }) => {
        it(`should round-trip ${name}`, () => {
            const original = new RGBColor(r, g, b, 1);
            const hsl = rgb2hsl(original);
            const back = hsl2rgb(hsl);
            expect(back.r).toBeCloseTo(r, 4);
            expect(back.g).toBeCloseTo(g, 4);
            expect(back.b).toBeCloseTo(b, 4);
        });
    });
});

// ---------------------------------------------------------------------------
// hsv2hsl / hsl2hsv round-trip
// ---------------------------------------------------------------------------

describe("hsv2hsl / hsl2hsv round-trip", () => {
    const testHSV = [
        { name: "pure red HSV", h: 0, s: 1, v: 1 },
        { name: "desaturated", h: 0.5, s: 0.3, v: 0.8 },
        { name: "dark blue", h: 0.667, s: 0.9, v: 0.4 },
        { name: "white", h: 0, s: 0, v: 1 },
        { name: "black", h: 0, s: 0, v: 0 },
        { name: "mid gray", h: 0, s: 0, v: 0.5 },
        { name: "olive-ish", h: 0.15, s: 0.7, v: 0.6 },
    ];

    testHSV.forEach(({ name, h, s, v }) => {
        it(`should round-trip ${name}`, () => {
            const original = new HSVColor(h, s, v, 1);
            const hsl = hsv2hsl(original);
            const back = hsl2hsv(hsl);
            expect(back.h).toBeCloseTo(h, 5);
            expect(back.s).toBeCloseTo(s, 5);
            expect(back.v).toBeCloseTo(v, 5);
        });
    });

    it("should preserve alpha through conversion", () => {
        const original = new HSVColor(0.3, 0.5, 0.7, 0.85);
        const hsl = hsv2hsl(original);
        expect(hsl.alpha).toBeCloseTo(0.85, 5);
        const back = hsl2hsv(hsl);
        expect(back.alpha).toBeCloseTo(0.85, 5);
    });
});

// ---------------------------------------------------------------------------
// hwb2hsl / hsl2hwb round-trip
// ---------------------------------------------------------------------------

describe("hwb2hsl / hsl2hwb round-trip", () => {
    const testHWB = [
        { name: "pure red HWB", h: 0, w: 0, b: 0 },
        { name: "50% white red", h: 0, w: 0.5, b: 0 },
        { name: "50% black red", h: 0, w: 0, b: 0.5 },
        { name: "gray", h: 0, w: 0.5, b: 0.5 },
        { name: "teal HWB", h: 0.5, w: 0.1, b: 0.1 },
        { name: "olive HWB", h: 0.15, w: 0.2, b: 0.3 },
    ];

    testHWB.forEach(({ name, h, w, b }) => {
        it(`should round-trip ${name}`, () => {
            const original = new HWBColor(h, w, b, 1);
            const hsl = hwb2hsl(original);
            const back = hsl2hwb(hsl);
            expect(back.h).toBeCloseTo(h, 4);
            expect(back.w).toBeCloseTo(w, 4);
            expect(back.b).toBeCloseTo(b, 4);
        });
    });

    it("should preserve alpha through conversion", () => {
        const original = new HWBColor(0.6, 0.2, 0.1, 0.33);
        const hsl = hwb2hsl(original);
        expect(hsl.alpha).toBeCloseTo(0.33, 5);
        const back = hsl2hwb(hsl);
        expect(back.alpha).toBeCloseTo(0.33, 5);
    });
});

// ---------------------------------------------------------------------------
// rgb2xyz / xyz2rgb round-trip
// ---------------------------------------------------------------------------

describe("rgb2xyz / xyz2rgb round-trip", () => {
    const testColors = [
        { name: "white", r: 1, g: 1, b: 1 },
        { name: "black", r: 0, g: 0, b: 0 },
        { name: "red", r: 1, g: 0, b: 0 },
        { name: "green", r: 0, g: 1, b: 0 },
        { name: "blue", r: 0, g: 0, b: 1 },
        { name: "mid gray", r: 0.5, g: 0.5, b: 0.5 },
        { name: "coral", r: 0.9, g: 0.4, b: 0.3 },
    ];

    testColors.forEach(({ name, r, g, b }) => {
        it(`should round-trip ${name}`, () => {
            const original = new RGBColor(r, g, b, 1);
            const xyz = rgb2xyz(original);
            const back = xyz2rgb(xyz);
            expect(back.r).toBeCloseTo(r, 2);
            expect(back.g).toBeCloseTo(g, 2);
            expect(back.b).toBeCloseTo(b, 2);
        });
    });

    it("should preserve alpha through conversion", () => {
        const original = new RGBColor(0.5, 0.3, 0.7, 0.6);
        const xyz = rgb2xyz(original);
        expect(xyz.alpha).toBeCloseTo(0.6, 5);
        const back = xyz2rgb(xyz);
        expect(back.alpha).toBeCloseTo(0.6, 5);
    });
});

describe("rgb2xyz known values", () => {
    it("white should have Y close to 1", () => {
        const xyz = rgb2xyz(new RGBColor(1, 1, 1, 1));
        expect(xyz.y).toBeCloseTo(1, 2);
    });

    it("black should have all zeros", () => {
        const xyz = rgb2xyz(new RGBColor(0, 0, 0, 1));
        expect(xyz.x).toBeCloseTo(0, 5);
        expect(xyz.y).toBeCloseTo(0, 5);
        expect(xyz.z).toBeCloseTo(0, 5);
    });
});

// ---------------------------------------------------------------------------
// xyz2lab / lab2xyz round-trip
// ---------------------------------------------------------------------------

describe("xyz2lab / lab2xyz round-trip", () => {
    const testXYZ = [
        { name: "D65 white", x: 0.9505, y: 1.0, z: 1.089 },
        { name: "black", x: 0, y: 0, z: 0 },
        { name: "mid-range", x: 0.4, y: 0.3, z: 0.2 },
        { name: "bright green region", x: 0.2, y: 0.5, z: 0.1 },
    ];

    testXYZ.forEach(({ name, x, y, z }) => {
        it(`should round-trip ${name}`, () => {
            const original = new XYZColor(x, y, z, 1);
            const lab = xyz2lab(original);
            const back = lab2xyz(lab);
            expect(back.x).toBeCloseTo(x, 2);
            expect(back.y).toBeCloseTo(y, 2);
            expect(back.z).toBeCloseTo(z, 2);
        });
    });

    it("should preserve alpha through conversion", () => {
        const original = new XYZColor(0.5, 0.4, 0.3, 0.75);
        const lab = xyz2lab(original);
        expect(lab.alpha).toBeCloseTo(0.75, 5);
        const back = lab2xyz(lab);
        expect(back.alpha).toBeCloseTo(0.75, 5);
    });
});

// ---------------------------------------------------------------------------
// lab2lch / lch2lab round-trip
// ---------------------------------------------------------------------------

describe("lab2lch / lch2lab round-trip", () => {
    const testLAB = [
        { name: "neutral gray", l: 0.5, a: 0.5, b: 0.5 },
        { name: "bright color", l: 0.8, a: 0.7, b: 0.3 },
        { name: "dark color", l: 0.2, a: 0.4, b: 0.6 },
        { name: "origin (black)", l: 0, a: 0.5, b: 0.5 },
        { name: "white", l: 1, a: 0.5, b: 0.5 },
    ];

    testLAB.forEach(({ name, l, a, b }) => {
        it(`should round-trip ${name}`, () => {
            const original = new LABColor(l, a, b, 1);
            const lch = lab2lch(original);
            const back = lch2lab(lch);
            expect(back.l).toBeCloseTo(l, 4);
            expect(back.a).toBeCloseTo(a, 4);
            expect(back.b).toBeCloseTo(b, 4);
        });
    });

    it("should preserve alpha through conversion", () => {
        const original = new LABColor(0.5, 0.5, 0.5, 0.9);
        const lch = lab2lch(original);
        expect(lch.alpha).toBeCloseTo(0.9, 5);
        const back = lch2lab(lch);
        expect(back.alpha).toBeCloseTo(0.9, 5);
    });
});

// ---------------------------------------------------------------------------
// xyz2oklab / oklab2xyz round-trip
// ---------------------------------------------------------------------------

describe("xyz2oklab / oklab2xyz round-trip", () => {
    const testXYZ = [
        { name: "D65 white", x: 0.9505, y: 1.0, z: 1.089 },
        { name: "black", x: 0, y: 0, z: 0 },
        { name: "mid-range", x: 0.4, y: 0.3, z: 0.2 },
        { name: "bright saturated", x: 0.6, y: 0.3, z: 0.1 },
    ];

    testXYZ.forEach(({ name, x, y, z }) => {
        it(`should round-trip ${name}`, () => {
            const original = new XYZColor(x, y, z, 1);
            const oklab = xyz2oklab(original);
            const back = oklab2xyz(oklab);
            expect(back.x).toBeCloseTo(x, 2);
            expect(back.y).toBeCloseTo(y, 2);
            expect(back.z).toBeCloseTo(z, 2);
        });
    });

    it("should preserve alpha through conversion", () => {
        const original = new XYZColor(0.5, 0.4, 0.3, 0.55);
        const oklab = xyz2oklab(original);
        expect(oklab.alpha).toBeCloseTo(0.55, 5);
        const back = oklab2xyz(oklab);
        expect(back.alpha).toBeCloseTo(0.55, 5);
    });
});

// ---------------------------------------------------------------------------
// oklab2oklch / oklch2oklab round-trip
// ---------------------------------------------------------------------------

describe("oklab2oklch / oklch2oklab round-trip", () => {
    const testOKLAB = [
        { name: "neutral", l: 0.5, a: 0.5, b: 0.5 },
        { name: "bright chromatic", l: 0.8, a: 0.6, b: 0.4 },
        { name: "dark chromatic", l: 0.2, a: 0.3, b: 0.7 },
        { name: "achromatic (a=b=0.5)", l: 0.7, a: 0.5, b: 0.5 },
    ];

    testOKLAB.forEach(({ name, l, a, b }) => {
        it(`should round-trip ${name}`, () => {
            const original = new OKLABColor(l, a, b, 1);
            const oklch = oklab2oklch(original);
            const back = oklch2oklab(oklch);
            expect(back.l).toBeCloseTo(l, 4);
            expect(back.a).toBeCloseTo(a, 4);
            expect(back.b).toBeCloseTo(b, 4);
        });
    });

    it("should preserve alpha through conversion", () => {
        const original = new OKLABColor(0.5, 0.5, 0.5, 0.25);
        const oklch = oklab2oklch(original);
        expect(oklch.alpha).toBeCloseTo(0.25, 5);
        const back = oklch2oklab(oklch);
        expect(back.alpha).toBeCloseTo(0.25, 5);
    });
});

// ---------------------------------------------------------------------------
// kelvin2rgb / rgb2kelvin
// ---------------------------------------------------------------------------

describe("kelvin2rgb", () => {
    it("should produce a warm (reddish) color at 2000K", () => {
        const rgb = kelvin2rgb(new KelvinColor(2000, 1));
        // At low temperatures, red dominates and blue is very low
        expect(rgb.r).toBeGreaterThan(rgb.b);
        expect(rgb.r).toBeGreaterThan(0.5);
    });

    it("should produce near-white at 6500K", () => {
        const rgb = kelvin2rgb(new KelvinColor(6500, 1));
        // 6500K is roughly D65 daylight -- all channels should be high
        expect(rgb.r).toBeGreaterThan(0.9);
        expect(rgb.g).toBeGreaterThan(0.9);
        expect(rgb.b).toBeGreaterThan(0.9);
    });

    it("should produce a cool (bluish) color at 15000K", () => {
        const rgb = kelvin2rgb(new KelvinColor(15000, 1));
        // At high temperatures, blue should be at max and red diminishes
        expect(rgb.b).toBeCloseTo(1, 1);
    });

    it("should preserve alpha", () => {
        const rgb = kelvin2rgb(new KelvinColor(5000, 0.7));
        expect(rgb.alpha).toBeCloseTo(0.7, 5);
    });
});

describe("kelvin2rgb / rgb2kelvin approximate round-trip", () => {
    // kelvin conversion is based on approximations, so we use a loose tolerance
    const testTemps = [2000, 3000, 5000, 6500];

    testTemps.forEach((kelvin) => {
        it(`should approximately round-trip ${kelvin}K`, () => {
            const rgb = kelvin2rgb(new KelvinColor(kelvin, 1));
            const back = rgb2kelvin(rgb);
            // Kelvin approximations are lossy; within ~500K is reasonable
            expect(Math.abs(back.kelvin - kelvin)).toBeLessThan(1500);
        });
    });
});

// ---------------------------------------------------------------------------
// color2 (universal converter via XYZ hub)
// ---------------------------------------------------------------------------

describe("color2", () => {
    it("should return the same color when converting to the same space", () => {
        const rgb = new RGBColor(0.5, 0.3, 0.7, 1);
        const result = color2(rgb, "rgb");
        // Should be the exact same object when colorSpace matches
        expect(result).toBe(rgb);
    });

    it("should convert RGB to HSL and back", () => {
        const original = new RGBColor(0.8, 0.2, 0.4, 1);
        const hsl = color2(original, "hsl") as HSLColor;
        expect(hsl.colorSpace).toBe("hsl");

        const back = color2(hsl, "rgb") as RGBColor;
        expect(back.colorSpace).toBe("rgb");
        expect(back.r).toBeCloseTo(original.r, 1);
        expect(back.g).toBeCloseTo(original.g, 1);
        expect(back.b).toBeCloseTo(original.b, 1);
    });

    it("should convert RGB to LAB and back", () => {
        const original = new RGBColor(0.5, 0.5, 0.5, 1);
        const lab = color2(original, "lab") as LABColor;
        expect(lab.colorSpace).toBe("lab");

        const back = color2(lab, "rgb") as RGBColor;
        expect(back.r).toBeCloseTo(original.r, 1);
        expect(back.g).toBeCloseTo(original.g, 1);
        expect(back.b).toBeCloseTo(original.b, 1);
    });

    it("should convert RGB to OKLab and back", () => {
        const original = new RGBColor(0.3, 0.6, 0.9, 1);
        const oklab = color2(original, "oklab") as OKLABColor;
        expect(oklab.colorSpace).toBe("oklab");

        const back = color2(oklab, "rgb") as RGBColor;
        expect(back.r).toBeCloseTo(original.r, 1);
        expect(back.g).toBeCloseTo(original.g, 1);
        expect(back.b).toBeCloseTo(original.b, 1);
    });

    it("should convert HSL to LCH and back", () => {
        const original = new HSLColor(0.6, 0.5, 0.5, 1);
        const lch = color2(original, "lch") as LCHColor;
        expect(lch.colorSpace).toBe("lch");

        const back = color2(lch, "hsl") as HSLColor;
        expect(back.h).toBeCloseTo(original.h, 1);
        expect(back.s).toBeCloseTo(original.s, 1);
        expect(back.l).toBeCloseTo(original.l, 1);
    });

    it("should convert RGB to XYZ and back", () => {
        const original = new RGBColor(0.4, 0.7, 0.2, 1);
        const xyz = color2(original, "xyz") as XYZColor;
        expect(xyz.colorSpace).toBe("xyz");

        const back = color2(xyz, "rgb") as RGBColor;
        expect(back.r).toBeCloseTo(original.r, 1);
        expect(back.g).toBeCloseTo(original.g, 1);
        expect(back.b).toBeCloseTo(original.b, 1);
    });

    it("should preserve alpha through universal conversion", () => {
        const original = new RGBColor(0.5, 0.3, 0.7, 0.42);
        const hsl = color2(original, "hsl") as HSLColor;
        expect(hsl.alpha).toBeCloseTo(0.42, 2);
        const back = color2(hsl, "rgb") as RGBColor;
        expect(back.alpha).toBeCloseTo(0.42, 2);
    });
});

// ---------------------------------------------------------------------------
// gamutMap
// ---------------------------------------------------------------------------

describe("gamutMap", () => {
    it("should leave an in-gamut RGB color unchanged", () => {
        const original = new RGBColor(0.5, 0.3, 0.7, 1);
        const mapped = gamutMap(original);
        expect(mapped.r).toBeCloseTo(0.5, 5);
        expect(mapped.g).toBeCloseTo(0.3, 5);
        expect(mapped.b).toBeCloseTo(0.7, 5);
    });

    it("should leave black unchanged", () => {
        const original = new RGBColor(0, 0, 0, 1);
        const mapped = gamutMap(original);
        expect(mapped.r).toBeCloseTo(0, 5);
        expect(mapped.g).toBeCloseTo(0, 5);
        expect(mapped.b).toBeCloseTo(0, 5);
    });

    it("should leave white unchanged", () => {
        const original = new RGBColor(1, 1, 1, 1);
        const mapped = gamutMap(original);
        expect(mapped.r).toBeCloseTo(1, 5);
        expect(mapped.g).toBeCloseTo(1, 5);
        expect(mapped.b).toBeCloseTo(1, 5);
    });

    it("should clip out-of-gamut RGB values to [0, 1]", () => {
        const original = new RGBColor(1.5, -0.2, 0.8, 1);
        const mapped = gamutMap(original);
        expect(mapped.r).toBeGreaterThanOrEqual(0);
        expect(mapped.r).toBeLessThanOrEqual(1);
        expect(mapped.g).toBeGreaterThanOrEqual(0);
        expect(mapped.g).toBeLessThanOrEqual(1);
        expect(mapped.b).toBeGreaterThanOrEqual(0);
        expect(mapped.b).toBeLessThanOrEqual(1);
    });

    it("should produce in-gamut results for an out-of-gamut RGB color with large overshoot", () => {
        const original = new RGBColor(2.0, -0.5, 1.5, 1);
        const mapped = gamutMap(original);
        // gamutMap converts to RGB internally, clips, then converts back
        const rgb = color2(mapped, "rgb") as RGBColor;
        expect(rgb.r).toBeGreaterThanOrEqual(-0.01);
        expect(rgb.r).toBeLessThanOrEqual(1.01);
        expect(rgb.g).toBeGreaterThanOrEqual(-0.01);
        expect(rgb.g).toBeLessThanOrEqual(1.01);
        expect(rgb.b).toBeGreaterThanOrEqual(-0.01);
        expect(rgb.b).toBeLessThanOrEqual(1.01);
    });

    it("should preserve alpha through gamut mapping", () => {
        const original = new RGBColor(1.5, 0.5, 0.5, 0.77);
        const mapped = gamutMap(original);
        expect(mapped.alpha).toBeCloseTo(0.77, 2);
    });
});

// ---------------------------------------------------------------------------
// Multi-step conversion chains
// ---------------------------------------------------------------------------

describe("multi-step conversion chains", () => {
    it("should survive RGB -> HSL -> HSV -> HWB -> HSL -> RGB", () => {
        const original = new RGBColor(0.8, 0.3, 0.5, 1);
        const hsl = rgb2hsl(original);
        const hsv = hsl2hsv(hsl);
        const hwb = new HWBColor(hsv.h, hsv.v * (1 - hsv.s), 1 - hsv.v, 1);
        const hslBack = hwb2hsl(hwb);
        const rgbBack = hsl2rgb(hslBack);

        expect(rgbBack.r).toBeCloseTo(original.r, 3);
        expect(rgbBack.g).toBeCloseTo(original.g, 3);
        expect(rgbBack.b).toBeCloseTo(original.b, 3);
    });

    it("should survive RGB -> XYZ -> LAB -> LCH -> LAB -> XYZ -> RGB", () => {
        const original = new RGBColor(0.6, 0.2, 0.8, 1);
        const xyz = rgb2xyz(original);
        const lab = xyz2lab(xyz);
        const lch = lab2lch(lab);
        const labBack = lch2lab(lch);
        const xyzBack = lab2xyz(labBack);
        const rgbBack = xyz2rgb(xyzBack);

        expect(rgbBack.r).toBeCloseTo(original.r, 1);
        expect(rgbBack.g).toBeCloseTo(original.g, 1);
        expect(rgbBack.b).toBeCloseTo(original.b, 1);
    });

    it("should survive RGB -> XYZ -> OKLab -> OKLCh -> OKLab -> XYZ -> RGB", () => {
        const original = new RGBColor(0.4, 0.7, 0.3, 1);
        const xyz = rgb2xyz(original);
        const oklab = xyz2oklab(xyz);
        const oklch = oklab2oklch(oklab);
        const oklabBack = oklch2oklab(oklch);
        const xyzBack = oklab2xyz(oklabBack);
        const rgbBack = xyz2rgb(xyzBack);

        expect(rgbBack.r).toBeCloseTo(original.r, 1);
        expect(rgbBack.g).toBeCloseTo(original.g, 1);
        expect(rgbBack.b).toBeCloseTo(original.b, 1);
    });
});

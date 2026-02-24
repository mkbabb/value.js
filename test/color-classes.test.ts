import { describe, expect, it } from "vitest";
import {
    Color,
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

// ---------------------------------------------------------------------------
// RGBColor
// ---------------------------------------------------------------------------
describe("RGBColor", () => {
    it("should construct with components and default alpha", () => {
        const c = new RGBColor(255, 128, 0);
        expect(c.r).toBe(255);
        expect(c.g).toBe(128);
        expect(c.b).toBe(0);
        expect(c.alpha).toBe(1);
        expect(c.colorSpace).toBe("rgb");
    });

    it("should construct with explicit alpha", () => {
        const c = new RGBColor(10, 20, 30, 0.5);
        expect(c.alpha).toBe(0.5);
    });

    it("should support getters and setters", () => {
        const c = new RGBColor(0, 0, 0);
        c.r = 100;
        c.g = 200;
        c.b = 50;
        c.alpha = 0.8;
        expect(c.r).toBe(100);
        expect(c.g).toBe(200);
        expect(c.b).toBe(50);
        expect(c.alpha).toBe(0.8);
    });

    it("should produce correct toString output", () => {
        const c = new RGBColor(255, 128, 0, 1);
        expect(c.toString()).toBe("rgb(255 128 0 / 1)");
    });

    it("should produce correct toFormattedString output", () => {
        const c = new RGBColor(255.123, 128.456, 0.789, 0.5);
        // formatNumber only strips all-zero decimals (e.g. ".00") not partial trailing zeros
        expect(c.toFormattedString(2)).toBe("rgb(255.12 128.46 0.79 / 0.50)");
    });

    it("should return correct keys, values, and entries", () => {
        const c = new RGBColor(10, 20, 30, 0.5);
        expect(c.keys()).toEqual(["r", "g", "b", "alpha"]);
        expect(c.values()).toEqual([10, 20, 30, 0.5]);
        expect(c.entries()).toEqual([
            ["r", 10],
            ["g", 20],
            ["b", 30],
            ["alpha", 0.5],
        ]);
    });

    it("should return correct toJSON", () => {
        const c = new RGBColor(10, 20, 30, 0.5);
        expect(c.toJSON()).toEqual({ r: 10, g: 20, b: 30, alpha: 0.5 });
    });

    it("should clone independently", () => {
        const c = new RGBColor(100, 200, 50, 0.9);
        const cloned = c.clone();
        expect(cloned).not.toBe(c);
        expect(cloned.r).toBe(100);
        expect(cloned.g).toBe(200);
        expect(cloned.b).toBe(50);
        expect(cloned.alpha).toBe(0.9);

        // Mutating clone should not affect original
        cloned.r = 0;
        cloned.alpha = 0.1;
        expect(c.r).toBe(100);
        expect(c.alpha).toBe(0.9);
    });
});

// ---------------------------------------------------------------------------
// HSLColor
// ---------------------------------------------------------------------------
describe("HSLColor", () => {
    it("should construct with components and default alpha", () => {
        const c = new HSLColor(180, 0.5, 0.75);
        expect(c.h).toBe(180);
        expect(c.s).toBe(0.5);
        expect(c.l).toBe(0.75);
        expect(c.alpha).toBe(1);
        expect(c.colorSpace).toBe("hsl");
    });

    it("should produce correct toString and support setters", () => {
        const c = new HSLColor(0, 0, 0, 0.3);
        c.h = 360;
        c.s = 1;
        c.l = 0.5;
        expect(c.toString()).toBe("hsl(360 1 0.5 / 0.3)");
    });

    it("should clone independently", () => {
        const original = new HSLColor(120, 0.8, 0.4, 0.7);
        const cloned = original.clone();
        expect(cloned.h).toBe(120);
        expect(cloned.s).toBe(0.8);
        expect(cloned.l).toBe(0.4);
        expect(cloned.alpha).toBe(0.7);

        cloned.h = 0;
        expect(original.h).toBe(120);
    });

    it("should return correct entries", () => {
        const c = new HSLColor(90, 0.5, 0.5, 1);
        expect(c.entries()).toEqual([
            ["h", 90],
            ["s", 0.5],
            ["l", 0.5],
            ["alpha", 1],
        ]);
    });
});

// ---------------------------------------------------------------------------
// HSVColor
// ---------------------------------------------------------------------------
describe("HSVColor", () => {
    it("should construct with components and default alpha", () => {
        const c = new HSVColor(270, 0.9, 0.6);
        expect(c.h).toBe(270);
        expect(c.s).toBe(0.9);
        expect(c.v).toBe(0.6);
        expect(c.alpha).toBe(1);
        expect(c.colorSpace).toBe("hsv");
    });

    it("should produce correct toString", () => {
        const c = new HSVColor(45, 0.3, 0.8, 0.5);
        expect(c.toString()).toBe("hsv(45 0.3 0.8 / 0.5)");
    });

    it("should clone independently", () => {
        const original = new HSVColor(200, 0.5, 0.5, 0.5);
        const cloned = original.clone();
        expect(cloned.v).toBe(0.5);
        cloned.v = 1;
        expect(original.v).toBe(0.5);
    });

    it("should return correct keys and values", () => {
        const c = new HSVColor(10, 20, 30, 0.4);
        expect(c.keys()).toEqual(["h", "s", "v", "alpha"]);
        expect(c.values()).toEqual([10, 20, 30, 0.4]);
    });
});

// ---------------------------------------------------------------------------
// HWBColor
// ---------------------------------------------------------------------------
describe("HWBColor", () => {
    it("should construct with components and default alpha", () => {
        const c = new HWBColor(0, 0.1, 0.2);
        expect(c.h).toBe(0);
        expect(c.w).toBe(0.1);
        expect(c.b).toBe(0.2);
        expect(c.alpha).toBe(1);
        expect(c.colorSpace).toBe("hwb");
    });

    it("should produce correct toString", () => {
        const c = new HWBColor(180, 0.25, 0.75, 0.9);
        expect(c.toString()).toBe("hwb(180 0.25 0.75 / 0.9)");
    });

    it("should clone independently and support toJSON", () => {
        const original = new HWBColor(90, 0.3, 0.6, 0.8);
        const cloned = original.clone();
        expect(cloned.toJSON()).toEqual({ h: 90, w: 0.3, b: 0.6, alpha: 0.8 });

        cloned.w = 0;
        expect(original.w).toBe(0.3);
    });
});

// ---------------------------------------------------------------------------
// LABColor
// ---------------------------------------------------------------------------
describe("LABColor", () => {
    it("should construct with components, default alpha, and whitePoint D50", () => {
        const c = new LABColor(50, -20, 30);
        expect(c.l).toBe(50);
        expect(c.a).toBe(-20);
        expect(c.b).toBe(30);
        expect(c.alpha).toBe(1);
        expect(c.colorSpace).toBe("lab");
        expect(c.whitePoint).toBe("D50");
    });

    it("should produce correct toString", () => {
        const c = new LABColor(75, 10, -25, 0.6);
        expect(c.toString()).toBe("lab(75 10 -25 / 0.6)");
    });

    it("should clone independently", () => {
        const original = new LABColor(50, -10, 20, 0.5);
        const cloned = original.clone();
        expect(cloned.l).toBe(50);
        expect(cloned.a).toBe(-10);
        expect(cloned.b).toBe(20);
        expect(cloned.alpha).toBe(0.5);

        cloned.a = 100;
        expect(original.a).toBe(-10);
    });

    it("should return correct entries and keys", () => {
        const c = new LABColor(80, 5, -5, 1);
        expect(c.keys()).toEqual(["l", "a", "b", "alpha"]);
        expect(c.entries()).toEqual([
            ["l", 80],
            ["a", 5],
            ["b", -5],
            ["alpha", 1],
        ]);
    });
});

// ---------------------------------------------------------------------------
// LCHColor
// ---------------------------------------------------------------------------
describe("LCHColor", () => {
    it("should construct with components and default alpha", () => {
        const c = new LCHColor(60, 40, 270);
        expect(c.l).toBe(60);
        expect(c.c).toBe(40);
        expect(c.h).toBe(270);
        expect(c.alpha).toBe(1);
        expect(c.colorSpace).toBe("lch");
    });

    it("should produce correct toString", () => {
        const c = new LCHColor(88, 17, 24, 0.4);
        expect(c.toString()).toBe("lch(88 17 24 / 0.4)");
    });

    it("should clone independently", () => {
        const original = new LCHColor(50, 30, 180, 0.7);
        const cloned = original.clone();
        expect(cloned.c).toBe(30);
        cloned.c = 0;
        expect(original.c).toBe(30);
    });

    it("should return correct toJSON", () => {
        const c = new LCHColor(50, 30, 180, 0.7);
        expect(c.toJSON()).toEqual({ l: 50, c: 30, h: 180, alpha: 0.7 });
    });
});

// ---------------------------------------------------------------------------
// OKLABColor
// ---------------------------------------------------------------------------
describe("OKLABColor", () => {
    it("should construct with components, default alpha, and whitePoint D50", () => {
        const c = new OKLABColor(0.8, 0.1, -0.05);
        expect(c.l).toBe(0.8);
        expect(c.a).toBe(0.1);
        expect(c.b).toBe(-0.05);
        expect(c.alpha).toBe(1);
        expect(c.colorSpace).toBe("oklab");
        expect(c.whitePoint).toBe("D50");
    });

    it("should produce correct toString and toFormattedString", () => {
        const c = new OKLABColor(0.93, 0.03, 0.01, 1);
        expect(c.toString()).toBe("oklab(0.93 0.03 0.01 / 1)");
        expect(c.toFormattedString(1)).toBe("oklab(0.9 0 0 / 1)");
    });

    it("should clone independently", () => {
        const original = new OKLABColor(0.5, 0.2, -0.1, 0.9);
        const cloned = original.clone();
        expect(cloned.a).toBe(0.2);
        cloned.a = 0;
        expect(original.a).toBe(0.2);
    });
});

// ---------------------------------------------------------------------------
// OKLCHColor
// ---------------------------------------------------------------------------
describe("OKLCHColor", () => {
    it("should construct with components and default alpha", () => {
        const c = new OKLCHColor(0.7, 0.15, 300);
        expect(c.l).toBe(0.7);
        expect(c.c).toBe(0.15);
        expect(c.h).toBe(300);
        expect(c.alpha).toBe(1);
        expect(c.colorSpace).toBe("oklch");
    });

    it("should produce correct toString", () => {
        const c = new OKLCHColor(0.93, 0.03, 18, 0.5);
        expect(c.toString()).toBe("oklch(0.93 0.03 18 / 0.5)");
    });

    it("should clone independently and return correct values", () => {
        const original = new OKLCHColor(0.5, 0.1, 200, 0.6);
        const cloned = original.clone();
        expect(cloned.values()).toEqual([0.5, 0.1, 200, 0.6]);

        cloned.h = 0;
        expect(original.h).toBe(200);
    });

    it("should return correct keys", () => {
        const c = new OKLCHColor(0.5, 0.1, 200);
        expect(c.keys()).toEqual(["l", "c", "h", "alpha"]);
    });
});

// ---------------------------------------------------------------------------
// XYZColor
// ---------------------------------------------------------------------------
describe("XYZColor", () => {
    it("should construct with components, default alpha, and whitePoint D65", () => {
        const c = new XYZColor(0.95, 1.0, 1.08);
        expect(c.x).toBe(0.95);
        expect(c.y).toBe(1.0);
        expect(c.z).toBe(1.08);
        expect(c.alpha).toBe(1);
        expect(c.colorSpace).toBe("xyz");
        expect(c.whitePoint).toBe("D65");
    });

    it("should produce correct toString", () => {
        const c = new XYZColor(0.5, 0.6, 0.7, 0.8);
        expect(c.toString()).toBe("xyz(0.5 0.6 0.7 / 0.8)");
    });

    it("should clone independently", () => {
        const original = new XYZColor(0.1, 0.2, 0.3, 0.4);
        const cloned = original.clone();
        expect(cloned.x).toBe(0.1);
        expect(cloned.y).toBe(0.2);
        expect(cloned.z).toBe(0.3);
        expect(cloned.alpha).toBe(0.4);

        cloned.x = 99;
        cloned.y = 99;
        cloned.z = 99;
        cloned.alpha = 0;
        expect(original.x).toBe(0.1);
        expect(original.y).toBe(0.2);
        expect(original.z).toBe(0.3);
        expect(original.alpha).toBe(0.4);
    });

    it("should return correct toJSON", () => {
        const c = new XYZColor(0.5, 0.6, 0.7, 1);
        expect(c.toJSON()).toEqual({ x: 0.5, y: 0.6, z: 0.7, alpha: 1 });
    });
});

// ---------------------------------------------------------------------------
// KelvinColor
// ---------------------------------------------------------------------------
describe("KelvinColor", () => {
    it("should construct with single component and default alpha", () => {
        const c = new KelvinColor(6500);
        expect(c.kelvin).toBe(6500);
        expect(c.alpha).toBe(1);
        expect(c.colorSpace).toBe("kelvin");
    });

    it("should produce correct toString", () => {
        const c = new KelvinColor(5000, 0.5);
        expect(c.toString()).toBe("kelvin(5000 / 0.5)");
    });

    it("should support getter and setter", () => {
        const c = new KelvinColor(3000);
        c.kelvin = 9000;
        expect(c.kelvin).toBe(9000);
    });

    it("should return correct keys, values, and entries", () => {
        const c = new KelvinColor(4000, 0.75);
        expect(c.keys()).toEqual(["kelvin", "alpha"]);
        expect(c.values()).toEqual([4000, 0.75]);
        expect(c.entries()).toEqual([
            ["kelvin", 4000],
            ["alpha", 0.75],
        ]);
    });

    it("should clone independently", () => {
        const original = new KelvinColor(6500, 0.9);
        const cloned = original.clone();
        expect(cloned.kelvin).toBe(6500);
        expect(cloned.alpha).toBe(0.9);

        cloned.kelvin = 2000;
        expect(original.kelvin).toBe(6500);
    });

    it("should return correct toJSON", () => {
        const c = new KelvinColor(3500, 0.8);
        expect(c.toJSON()).toEqual({ kelvin: 3500, alpha: 0.8 });
    });
});

// ---------------------------------------------------------------------------
// Color base class (tested via concrete subclass)
// ---------------------------------------------------------------------------
describe("Color base class behavior (via RGBColor)", () => {
    it("valueOf should return all component values including alpha (from values()) plus alpha again", () => {
        const c = new RGBColor(10, 20, 30, 0.5);
        // valueOf calls [...this.values(), this.alpha] and values() already includes alpha
        expect(c.valueOf()).toEqual([10, 20, 30, 0.5, 0.5]);
    });

    it("toFormattedString should strip trailing zeros", () => {
        const c = new RGBColor(1.0, 2.0, 3.0, 1.0);
        // 1.00 -> "1", 2.00 -> "2", etc.
        expect(c.toFormattedString(2)).toBe("rgb(1 2 3 / 1)");
    });

    it("toFormattedString should respect digit precision", () => {
        const c = new RGBColor(1.23456, 7.89012, 3.45678, 0.12345);
        // formatNumber only strips all-zero decimals via /\.0+$/, so 7.890 stays as "7.890"
        expect(c.toFormattedString(3)).toBe("rgb(1.235 7.890 3.457 / 0.123)");
    });

    it("clone should be an instance of the same class", () => {
        const c = new HSLColor(180, 0.5, 0.5, 1);
        const cloned = c.clone();
        expect(cloned).toBeInstanceOf(HSLColor);
        expect(cloned).toBeInstanceOf(Color);
    });
});

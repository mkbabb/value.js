// SERVED MODEL: claude-opus-5-5
//
// X.P.W10 `.m10` (W10.md; COHESION §0hv): `xyz-d50` (css-color-4 §10.8) and `display-p3-linear`
// (§10.5) are colour-model members of their own, so a `none` channel stays missing, through
// `color()` and through `color-mix()` (§13.2), instead of being refused for want of an `xyz` channel.

import { describe, expect, it } from "vitest";

import { convertColor } from "../../src/color/index";
import { parseCssColor, serializeCssColor } from "../../src/css/index";

const round = (source: string) => {
    const parsed = parseCssColor(source);
    if (!parsed.ok) throw new Error(`refused: ${source} ${JSON.stringify(parsed.diagnostics)}`);
    const text = serializeCssColor(parsed.value);
    if (!text.ok) throw new Error(`unserializable: ${source}`);
    return text.value;
};

describe("xyz-d50 and display-p3-linear keep their own space", () => {
    it.each([
        ["color(xyz-d50 none none none / none)", "color(xyz-d50 none none none / none)"],
        ["color(xyz-d50 10% none none / 0.5)", "color(xyz-d50 0.1 none none / 50%)"],
        ["color(display-p3-linear none none none)", "color(display-p3-linear none none none)"],
        ["color(display-p3-linear 0.2 0.4 none)", "color(display-p3-linear 0.2 0.4 none)"],
        ["color(xyz-d50 0.2 0.3 0.4)", "color(xyz-d50 0.2 0.3 0.4)"],
    ])("%j → %j", (source, expected) => expect(round(source)).toBe(expected));

    it.each([
        ["color-mix(in xyz-d50, color(xyz-d50 none 0.2 0.3), color(xyz-d50 none 0.6 0.7))", "color(xyz-d50 none 0.4 0.5)"],
        ["color-mix(in display-p3-linear, color(display-p3-linear none .2 .3), color(display-p3-linear none .6 .7))", "color(display-p3-linear none 0.4 0.5)"],
        ["color-mix(in display-p3-linear, color(display-p3-linear .1 .2 .3), color(display-p3-linear .5 .6 .7))", "color(display-p3-linear 0.3 0.4 0.5)"],
    ])("color-mix keeps a missing channel: %j → %j", (source, expected) => expect(round(source)).toBe(expected));

    it("converts through the model: D50 white is sRGB white, P3-linear 1 1 1 is sRGB white", () => {
        const d50 = parseCssColor("color(xyz-d50 0.96422 1 0.82521)");
        const p3 = parseCssColor("color(display-p3-linear 1 1 1)");
        if (!d50.ok || !p3.ok) throw new Error("refused");
        for (const c of [d50.value, p3.value]) {
            const rgb = convertColor(c, "rgb");
            if (!rgb.ok) throw new Error("unconvertible");
            for (const ch of rgb.value.channels) expect(ch).toBeCloseTo(255, 1);
        }
    });
});

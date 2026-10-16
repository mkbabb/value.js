// SERVED MODEL: claude-opus-5-5
//
// X.KF.W13X.r3res2f — UIA-KF-177 (COHESION §0fj item 6): `collectAnimationOptions` keeps the
// author's time unit beside the number. `duration` / `delay` stay in seconds (unchanged); the new
// `durationUnit` / `delayUnit` say which of css-values-4 §7.3's `<time>` units the author wrote
// (`s` or `ms`, ASCII case-insensitive), so a consumer can write `250ms` back as `250ms` and
// `0.25s` back as `0.25s` instead of re-deriving a unit from the number.

import { describe, expect, it } from "vitest";

import { collectAnimationOptions, parseStylesheet } from "../../src/css/index";

function options(css: string) {
    const sheet = parseStylesheet(css);
    if (!sheet.ok) throw new Error(`fixture refused: ${css}`);
    const rule = sheet.value.find((item) => item.kind === "style");
    if (!rule || rule.kind !== "style") throw new Error(`no style rule: ${css}`);
    return collectAnimationOptions(rule.declarations);
}

describe("collectAnimationOptions keeps the authored time unit (UIA-KF-177)", () => {
    it("longhands: ms and s survive beside unchanged numbers", () => {
        expect(options("a { animation-name: x; animation-duration: 250ms; animation-delay: 0.5s }")).toEqual([
            { name: "x", duration: 0.25, durationUnit: "ms", delay: 0.5, delayUnit: "s" },
        ]);
        expect(options("a { animation-name: x; animation-duration: 0.25s; animation-delay: 4500ms }")).toEqual([
            { name: "x", duration: 0.25, durationUnit: "s", delay: 4.5, delayUnit: "ms" },
        ]);
    });

    it("the shorthand carries each arm's own unit", () => {
        const [first, second] = options("a { animation: x 600ms ease 2s, y 1.5s linear 40ms }");
        expect(first).toMatchObject({ name: "x", duration: 0.6, durationUnit: "ms", delay: 2, delayUnit: "s" });
        expect(second).toMatchObject({ name: "y", duration: 1.5, durationUnit: "s", delay: 0.04, delayUnit: "ms" });
    });

    it("the unit is read ASCII case-insensitively and repeats with its number", () => {
        const rows = options("a { animation-name: a, b, c; animation-duration: 300MS, 2S }");
        expect(rows.map((row) => [row.duration, row.durationUnit])).toEqual([
            [0.3, "ms"],
            [2, "s"],
            [0.3, "ms"],
        ]);
    });

    it("no number means no unit", () => {
        const [row] = options("a { animation-name: x; animation-duration: var(--d) }");
        expect(row).toEqual({ name: "x" });
        expect(row).not.toHaveProperty("durationUnit");
        expect(row).not.toHaveProperty("delayUnit");
    });
});

/**
 * X.W11.p4c (COHESION §0go.2(b)) — `ink.ts` memoizes `certify`.
 *
 * Every certified ink is a WCAG walk: a bisection of `safeAccentColor` calls
 * through the colour parser. The boot asked the same question many times (the
 * plate ink alone is walked by `resolvePlateInk`, inside `resolveMutedInk`
 * and behind each identity ink's fallback). The memo is keyed by the walk's
 * full input — seed, ground, floor, headroom; the scheme enters through the
 * seed and the ground — so one (seed, scheme, ground) certifies once.
 *
 * The count is the cost: `safeAccentColor` is a pass-through spy. The floors
 * are read off the returned inks with the library's own contrast, at the
 * ground they were certified on, so a memo that served the wrong entry fails
 * on the floor as well as on the count.
 */
import { describe, expect, it, vi } from "vitest";

vi.mock("@mkbabb/value.js/color", async (importOriginal) => {
    const real = await importOriginal<typeof import("@mkbabb/value.js/color")>();
    return { ...real, safeAccentColor: vi.fn(real.safeAccentColor) };
});

import { convertColor, parseCssColor, safeAccentColor } from "@mkbabb/value.js/color";
import {
    certifyAccentInk,
    resolveMutedInk,
    resolvePlateInk,
    TEXT_CONTRAST_FLOOR,
} from "../../color-session/ink";

const walks = vi.mocked(safeAccentColor);

/** WCAG relative luminance, read as XYZ Y over the white point's Y. */
function luminanceOf(css: string): number {
    const parsed = parseCssColor(css);
    if (!parsed.ok) throw new Error(`unparseable colour ${css}`);
    const xyz = convertColor(parsed.value, "xyz");
    const white = parseCssColor("oklch(1 0 0)");
    if (!xyz.ok || !white.ok) throw new Error("xyz conversion failed");
    const whiteXyz = convertColor(white.value, "xyz");
    if (!whiteXyz.ok) throw new Error("white xyz failed");
    return (xyz.value.channels[1] as number) / (whiteXyz.value.channels[1] as number);
}

function ratioOn(css: string, surfaceL: number): number {
    const [hi, lo] = [luminanceOf(css), luminanceOf(`oklch(${surfaceL} 0 0)`)].sort(
        (x, y) => y - x,
    ) as [number, number];
    return (hi + 0.05) / (lo + 0.05);
}

describe("X.W11.p4c — the certify memo", () => {
    it("one (seed, scheme, ground) certifies once; the floor holds on every ask", () => {
        // Light scheme, a mid ground no other test in this file uses.
        const ground = 0.6137;
        walks.mockClear();
        const first = resolvePlateInk(ground, false);
        const firstWalks = walks.mock.calls.length;
        expect(firstWalks).toBeGreaterThan(0);

        walks.mockClear();
        const second = resolvePlateInk(ground, false);
        expect(walks.mock.calls.length).toBe(0);
        expect(second).toBe(first);
        expect(ratioOn(second, ground)).toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);

        // The muted rung re-asks the plate ink: served from the memo, so only
        // its own (new) walk runs.
        walks.mockClear();
        const muted = resolveMutedInk(ground, false);
        const mutedWalks = walks.mock.calls.length;
        walks.mockClear();
        expect(resolveMutedInk(ground, false)).toBe(muted);
        expect(walks.mock.calls.length).toBe(0);
        expect(mutedWalks).toBeLessThan(firstWalks * 2);
        expect(ratioOn(muted, ground)).toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);
    });

    it("a different scheme or ground is a different question, walked afresh", () => {
        const ground = 0.4421;
        resolvePlateInk(ground, false);

        walks.mockClear();
        const dark = resolvePlateInk(ground, true);
        expect(walks.mock.calls.length).toBeGreaterThan(0);
        expect(ratioOn(dark, ground)).toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);

        walks.mockClear();
        const moved = resolvePlateInk(ground + 0.05, false);
        expect(walks.mock.calls.length).toBeGreaterThan(0);
        expect(ratioOn(moved, ground + 0.05)).toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);
    });

    it("a seed is keyed by its channels: a new accent walks, the same accent does not", () => {
        const ground = 0.8085;
        walks.mockClear();
        const a = certifyAccentInk("oklch(0.73 0.185 2)", ground);
        expect(walks.mock.calls.length).toBeGreaterThan(0);
        walks.mockClear();
        expect(certifyAccentInk("oklch(0.73 0.185 2)", ground)).toBe(a);
        expect(walks.mock.calls.length).toBe(0);
        walks.mockClear();
        certifyAccentInk("oklch(0.73 0.185 200)", ground);
        expect(walks.mock.calls.length).toBeGreaterThan(0);
        expect(ratioOn(a, ground)).toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);
    });
});

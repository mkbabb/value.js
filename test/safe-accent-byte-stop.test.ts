/**
 * o1105 perf U1 — `safeAccentColor`'s bisections stop at the byte.
 *
 * Each WCAG bisection ran a fixed 32 halvings of the lightness bracket, every
 * one a gamut map, a conversion and two contrast arms. A painted colour is its
 * `toRgba8` bytes: once the passing and the failing candidate quantize to the
 * same bytes, every lightness between them paints those bytes too, so the
 * remaining halvings refine a float the screen never shows. The walk now stops
 * there (32 stays the hard cap).
 *
 * The oracle below is the fixed-32 walk, kept verbatim from the public pieces.
 * Over a seeded corpus the two answers must paint the same bytes, both must
 * clear the floor, and the refusals must agree. The work half is a ratio of
 * interleaved timings on the same inputs, so machine load moves both arms
 * (measured 0.38 over a 40k corpus, whose bytes also all agreed).
 */
import { describe, expect, it } from "vitest";
import { convertColor, contrast, mapColorToGamut, safeAccentColor, toRgba8 } from "../src/color/operations";
import { makeColor } from "../src/color/model";
import type { AnyColor, Color } from "../src/color/model";

type Out = { ok: true; value: Color<"oklch"> } | { ok: false; code: string };

function oracle(accent: AnyColor, surface: AnyColor, minimumRatio: number): Out {
    const source = convertColor(accent, "oklch");
    const surfaceRgb = convertColor(surface, "rgb");
    if (!source.ok || !surfaceRgb.ok) return { ok: false, code: "convert" };
    const [sourceL, sourceC, sourceH] = source.value.channels as number[];
    const evaluate = (lightness: number) => {
        const raw = makeColor("oklch", [lightness, sourceC!, sourceH!], 1);
        if (!raw.ok) throw new Error(raw.error.code);
        const color = mapColorToGamut(raw.value, "srgb");
        if (!color.ok) throw new Error(color.error.code);
        const rgb = convertColor(color.value, "rgb");
        if (!rgb.ok) throw new Error(rgb.error.code);
        const f = contrast(rgb.value, surfaceRgb.value, false);
        const b = contrast(rgb.value, surfaceRgb.value, true);
        if (!f.ok || !b.ok) throw new Error("contrast");
        return { color: color.value, clears: Math.min(f.value, b.value) >= minimumRatio };
    };
    const originL = Math.min(1, Math.max(0, sourceL!));
    const original = evaluate(originL);
    if (original.clears) return { ok: true, value: original.color };
    const lower = evaluate(0);
    const upper = evaluate(1);
    if (!lower.clears && !upper.clears) return { ok: false, code: "contrast_unreachable" };
    const candidates: Color<"oklch">[] = [];
    const walk = (passL: number, failL: number, best: Color<"oklch">) => {
        for (let i = 0; i < 32; i++) {
            const middle = (passL + failL) / 2;
            const probe = evaluate(middle);
            if (probe.clears) { passL = middle; best = probe.color; } else failL = middle;
        }
        candidates.push(best);
    };
    if (lower.clears) walk(0, originL, lower.color);
    if (upper.clears) walk(1, originL, upper.color);
    candidates.sort((a, b) => {
        const aL = a.channels[0] as number;
        const bL = b.channels[0] as number;
        return Math.abs(aL - originL) - Math.abs(bL - originL) || aL - bL;
    });
    return { ok: true, value: candidates[0]! };
}

/** mulberry32: a seeded corpus, the same on every run. */
function rng(seed: number) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const FLOORS = [3, 4.5, 4.83, 7];

function corpus(n: number, seed: number) {
    const r = rng(seed);
    return Array.from({ length: n }, () => {
        const accent = makeColor("oklch", [r(), r() * 0.37, r() * 360], 1);
        const surface = makeColor("oklch", [r(), r() * 0.05, r() * 360], 1);
        if (!accent.ok || !surface.ok) throw new Error("corpus");
        return { accent: accent.value, surface: surface.value, floor: FLOORS[Math.floor(r() * FLOORS.length)]! };
    });
}

const bytes = (c: AnyColor) => {
    const b = toRgba8(c, { gamut: "clip" });
    if (!b.ok) throw new Error(b.error.code);
    return Array.from(b.value).join(",");
};

describe("safeAccentColor stops at the byte (o1105 U1)", () => {
    it("paints the fixed-32 walk's bytes, clears the floor, and refuses where it refused", () => {
        let walked = 0;
        for (const { accent, surface, floor } of corpus(3000, 0x1105)) {
            const got = safeAccentColor(accent, surface, { minimumRatio: floor, gamut: "srgb" });
            const want = oracle(accent, surface, floor);
            expect(got.ok).toBe(want.ok);
            if (!got.ok || !want.ok) continue;
            expect(bytes(got.value)).toBe(bytes(want.value));
            const rgb = convertColor(got.value, "rgb");
            const sRgb = convertColor(surface, "rgb");
            if (!rgb.ok || !sRgb.ok) throw new Error("convert");
            const f = contrast(rgb.value, sRgb.value, false);
            const b = contrast(rgb.value, sRgb.value, true);
            if (!f.ok || !b.ok) throw new Error("contrast");
            expect(Math.min(f.value, b.value)).toBeGreaterThanOrEqual(floor);
            if (got.value.channels[0] !== accent.channels[0]) walked++;
        }
        // The corpus exercises the bisection, not just the clears-at-once arm.
        expect(walked).toBeGreaterThan(1000);
    }, 60_000);

    it("does at most half the fixed-32 walk's work on the walking inputs", () => {
        const items = corpus(1500, 0x51).filter(({ accent, surface, floor }) => {
            const o = oracle(accent, surface, floor);
            return o.ok && o.value.channels[0] !== accent.channels[0];
        });
        let fast = 0;
        let fixed = 0;
        for (let round = 0; round < 3; round++) {
            for (const { accent, surface, floor } of items) {
                const a = performance.now();
                safeAccentColor(accent, surface, { minimumRatio: floor, gamut: "srgb" });
                const b = performance.now();
                oracle(accent, surface, floor);
                fixed += performance.now() - b;
                fast += b - a;
            }
        }
        expect(fast / fixed).toBeLessThan(0.5);
    }, 60_000);
});

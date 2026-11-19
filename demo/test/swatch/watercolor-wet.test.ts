/**
 * color-40 L-4: the swatch's one wet number scrubs the reshape between the
 * dot's two seeded outlines. The blend is a pure string; a browser resolves it.
 */
import { describe, expect, it } from "vitest";
import { blendRadiiCSS, mulberry32, randomRadii, radiiToCSS } from "../../shared/ui/watercolor-dot/prng";

const evaluate = (css: string, t: number) =>
    css
        .replace(/var\(--watercolor-wet, 0\)/g, String(t))
        .replace(/calc\(([-\d.]+)% \+ ([-\d.]+)% \* ([-\d.]+)\)/g, (_, a, d, k) => `${Number(a) + Number(d) * Number(k)}%`)
        .match(/-?[\d.]+(?=%)/g)!
        .map(Number);

describe("blendRadiiCSS", () => {
    const r = mulberry32(42);
    const rest = radiiToCSS(randomRadii(r, 20, 80));
    const wet = radiiToCSS(randomRadii(r, 20, 80));
    const blend = blendRadiiCSS(rest, wet);
    const nums = (s: string) => s.match(/-?[\d.]+(?=%)/g)!.map(Number);

    it("is the rest outline at 0 and the second outline at 1", () => {
        evaluate(blend, 0).forEach((v, i) => expect(v).toBeCloseTo(nums(rest)[i]!, 6));
        evaluate(blend, 1).forEach((v, i) => expect(v).toBeCloseTo(nums(wet)[i]!, 6));
    });

    it("is halfway at 0.5, and keeps the 4 / 4 shape", () => {
        const half = evaluate(blend, 0.5);
        half.forEach((v, i) => expect(v).toBeCloseTo((nums(rest)[i]! + nums(wet)[i]!) / 2, 6));
        expect(blend.split(" / ")).toHaveLength(2);
    });

    it("reads the number a host names", () => {
        expect(blendRadiiCSS(rest, wet, "var(--x)")).toContain("var(--x)");
    });

    it("returns the rest outline when either input is not eight values", () => {
        expect(blendRadiiCSS("50%", wet)).toBe("50%");
    });
});

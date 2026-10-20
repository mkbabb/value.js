// SS-8 B01 (SS8-0019 / SS8-0025, record M-9 via L-1): HSV -> 8-bit sRGB must equal the
// ties-to-even rounding of the EXACT value. The reference is computed in BigInt rationals, so
// float drift in the conversion cannot hide inside the comparison. The grid is the one the
// L-1 sweeps used: h 0..348 step 12, s and v 0..1 step 1/18 (10,830 cells).
import { describe, expect, it } from "vitest";
import { convertColor, hsv, toRgba8 } from "../src/subpaths/color";

type Q = readonly [bigint, bigint]; // numerator, positive denominator
const q = (n: bigint, d: bigint = 1n): Q => [n, d];
const add = (a: Q, b: Q): Q => [a[0] * b[1] + b[0] * a[1], a[1] * b[1]];
const sub = (a: Q, b: Q): Q => [a[0] * b[1] - b[0] * a[1], a[1] * b[1]];
const mul = (a: Q, b: Q): Q => [a[0] * b[0], a[1] * b[1]];
const ONE = q(1n);

/** Ties-to-even of 255 * value, value in [0, 1]. */
function byteHalfEven([n, d]: Q): number {
    const scaled = n * 255n;
    const floor = scaled / d;
    const twice = 2n * (scaled - floor * d);
    if (twice > d) return Number(floor + 1n);
    if (twice < d) return Number(floor);
    return Number(floor % 2n === 0n ? floor : floor + 1n);
}

/** Exact HSV -> encoded sRGB for h = 12k degrees, s = i/18, v = j/18. */
function exactBytes(k: number, i: number, j: number): [number, number, number] {
    const s = q(BigInt(i), 18n);
    const v = q(BigInt(j), 18n);
    const sixths = 12 * k; // h / 60 = 12k / 60 = k / 5
    const sector = Math.floor(sixths / 60) % 6;
    const f = q(BigInt(sixths % 60), 60n);
    const p = mul(v, sub(ONE, s));
    const qq = mul(v, sub(ONE, mul(f, s)));
    const t = mul(v, sub(ONE, mul(sub(ONE, f), s)));
    const rows: [Q, Q, Q][] = [[v, t, p], [qq, v, p], [p, v, t], [p, qq, v], [t, p, v], [v, p, qq]];
    return rows[sector]!.map(byteHalfEven) as [number, number, number];
}

function libraryBytes(h: number, s: number, v: number): readonly number[] {
    const made = hsv(h, s, v);
    if (!made.ok) throw new Error(`fixture hsv(${h},${s},${v}) failed`);
    const bytes = toRgba8(made.value, { gamut: "clip" });
    if (!bytes.ok) throw new Error(bytes.error.code);
    return bytes.value.slice(0, 3);
}

describe("HSV -> RGBA8 is byte-exact under the CSS ties-to-even rule (M-9)", () => {
    it("matches the exact rational reference on every cell of the L-1 grid", () => {
        const misses: string[] = [];
        let n = 0;
        for (let k = 0; k < 30; k++)
            for (let i = 0; i <= 18; i++)
                for (let j = 0; j <= 18; j++) {
                    n++;
                    const lib = libraryBytes(12 * k, i / 18, j / 18);
                    const exact = exactBytes(k, i, j);
                    if (lib.some((c, x) => c !== exact[x]))
                        misses.push(`hsv(${12 * k},${i}/18,${j}/18) lib=${lib} exact=${exact}`);
                }
        expect(n).toBe(10830);
        expect(misses.slice(0, 5)).toEqual([]);
        expect(misses.length).toBe(0);
    });

    it("keeps analytically equal channels equal (the record's sample)", () => {
        const made = hsv(0, 0.6, 0.25);
        if (!made.ok) throw new Error("fixture");
        expect(toRgba8(made.value, { gamut: "clip" })).toEqual({ ok: true, value: [64, 26, 26, 255] });
        const viaOklch = convertColor(made.value, "oklch");
        if (!viaOklch.ok) throw new Error("fixture");
        const back = toRgba8(viaOklch.value, { gamut: "clip" });
        expect(back).toEqual({ ok: true, value: [64, 26, 26, 255] });
    });
});

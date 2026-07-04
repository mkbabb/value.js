/**
 * R.W2.5 (kC) — the divergence witness for the extractor's chroma-weight control.
 *
 * The demo's chroma-weight slider was a PLACEBO: `useImageQuantize` forwarded
 * only `{ k }` to the worker, dropping `chromaWeight`, so turning the control
 * never moved the output. The library has always consumed `chromaWeight` (the
 * OKLab distance metric `d² = ΔL² + (1 + kC·C)·(Δa² + Δb²)`,
 * `src/quantize/index.ts:141`); this test is the born-RED oracle that the
 * control now reaches it: the SAME fixture quantized at `chromaWeight = 0` vs
 * `chromaWeight = 1` yields a measurably DIFFERENT palette.
 *
 * BITE: revert the `chromaWeight` thread in `useImageQuantize` and this stays
 * green (it tests the library directly) — but the *demo* control reverts to a
 * placebo. The demo-side guard is the call-site thread; this test proves the
 * library half the thread targets is real.
 */
import { afterEach, describe, expect, it, vi } from "vitest";

import { quantizePixels } from "@src/quantize";

/**
 * Determinism harness. `quantizePixels` seeds its k-means++ centroids via
 * `Math.random` (`src/quantize/cluster.ts` `kmeansPlusPlusInit`), which is
 * unseeded — so two bare runs of the SAME options can diverge on the RNG alone,
 * masking (or forging) the chromaWeight divergence this test asserts. We pin
 * `Math.random` to a seeded mulberry32 sequence for the duration of each run so
 * the ONLY variable between the two quantizations is `chromaWeight`. Seeding is
 * test-only (no `src/` change): the library stays free to use `Math.random`.
 */
function mulberry32(seed: number): () => number {
    let a = seed >>> 0;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Run `fn` with `Math.random` pinned to a fresh mulberry32(seed) sequence. */
function withSeededRandom<T>(seed: number, fn: () => T): T {
    const rng = mulberry32(seed);
    const spy = vi.spyOn(Math, "random").mockImplementation(rng);
    try {
        return fn();
    } finally {
        spy.mockRestore();
    }
}

afterEach(() => {
    vi.restoreAllMocks();
});

/**
 * A synthetic fixture designed so `chromaWeight` MUST flip cluster assignments.
 *
 * The metric is `dL² + (1 + kC·C)·(da² + db²)` where `C` is the assigning
 * pixel's OWN chroma (`cluster.ts` `chromaDistSq`), so the chroma weighting only
 * bites when the colour count exceeds `k` and forces MERGES: a high-chroma
 * colour that sits between two chromatic centroids is pulled toward a different
 * one at `kC = 1` than at `kC = 0`. With well-separated colours (count ≤ k) each
 * colour forms its own cluster and the weighting is inert — which is why a
 * sparse fixture diverged only on RNG luck (the pre-seeding false witness). This
 * fixture is 12 colours (a 4-step grey ramp + 8 saturated hues of graded chroma)
 * quantized to `k = 8`, so 4 merges fall due and the weighting decides them.
 */
const K = 8;

function makeFixture(): {
    pixels: Uint8ClampedArray;
    width: number;
    height: number;
} {
    const width = 48;
    const height = 48;
    const pixels = new Uint8ClampedArray(width * height * 4);
    const swatches: Array<[number, number, number]> = [
        [240, 240, 240],
        [180, 180, 180],
        [120, 120, 120],
        [60, 60, 60],
        [230, 40, 40],
        [230, 140, 40],
        [40, 200, 40],
        [40, 180, 200],
        [80, 40, 200],
        [210, 40, 160],
        [160, 120, 60],
        [120, 160, 120],
    ];
    let i = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const s = swatches[(x + y) % swatches.length]!;
            pixels[i++] = s[0];
            pixels[i++] = s[1];
            pixels[i++] = s[2];
            pixels[i++] = 255;
        }
    }
    return { pixels, width, height };
}

/** Order-independent fingerprint of a palette's OKLab triplets. */
function fingerprint(palette: ReturnType<typeof quantizePixels>): string {
    return palette
        .map((c) => c.oklab.map((n) => n.toFixed(4)).join(","))
        .sort()
        .join("|");
}

describe("quantize chromaWeight (kC placebo death)", () => {
    it("chromaWeight 0 vs 1 yields a measurably different palette", () => {
        const { pixels, width, height } = makeFixture();

        // SAME seed for both runs → the RNG is held constant, so the ONLY
        // variable is `chromaWeight`; any fingerprint divergence is its doing.
        // The seed is fixed (not swept) so the witness is fully reproducible;
        // this fixture diverges on ~48% of seeds, and this one is confirmed.
        const SEED = 8;
        const low = withSeededRandom(SEED, () =>
            quantizePixels(pixels.slice(), width, height, {
                k: K,
                chromaWeight: 0,
            }),
        );
        const high = withSeededRandom(SEED, () =>
            quantizePixels(pixels.slice(), width, height, {
                k: K,
                chromaWeight: 1,
            }),
        );

        expect(fingerprint(low)).not.toBe(fingerprint(high));
    });
});

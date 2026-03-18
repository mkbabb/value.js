/**
 * Clustering internals: MMCQ median cut, k-means++ init, k-means iteration,
 * JND deduplication, and color conversion helpers.
 */

import { oklabToLinearSRGB, deltaEOK } from "../units/color/gamut";

// ── Color conversion helpers ──

/** Chroma-weighted squared distance in OKLab */
export function chromaDistSq(
    L1: number, a1: number, b1: number,
    L2: number, a2: number, b2: number,
    kC: number,
): number {
    const dL = L1 - L2;
    const da = a1 - a2;
    const db = b1 - b2;
    const C = Math.sqrt(a1 * a1 + b1 * b1);
    return dL * dL + (1 + kC * C) * (da * da + db * db);
}

/** OKLab → OKLCH (raw values, not normalized [0,1]) */
export function rawOklabToOklch(L: number, a: number, b: number): [number, number, number] {
    const C = Math.sqrt(a * a + b * b);
    let H = Math.atan2(b, a) * (180 / Math.PI);
    if (H < 0) H += 360;
    return [L, C, H];
}

/** OKLab → clamped sRGB [0,255] */
export function oklabToRgb255(L: number, a: number, b: number): [number, number, number] {
    const [rLin, gLin, bLin] = oklabToLinearSRGB(L, a, b);

    const gamma = 2.4;
    const offset = 0.055;
    const threshold = 0.0031308;

    function toSrgb(c: number): number {
        const abs = Math.abs(c);
        const sign = c < 0 ? -1 : 1;
        const srgb = abs <= threshold
            ? c * 12.92
            : sign * ((1 + offset) * abs ** (1 / gamma) - offset);
        return Math.round(Math.min(Math.max(srgb * 255, 0), 255));
    }

    return [toSrgb(rLin), toSrgb(gLin), toSrgb(bLin)];
}

/** Format OKLCH as CSS string */
export function oklchToCss(L: number, C: number, H: number): string {
    const lPct = (L * 100).toFixed(2).replace(/\.?0+$/, "");
    const cStr = C.toFixed(4).replace(/\.?0+$/, "");
    const hStr = H.toFixed(2).replace(/\.?0+$/, "");
    return `oklch(${lPct}% ${cStr} ${hStr})`;
}

// ── Median Cut (MMCQ) in OKLab ──

interface OKLabBucket {
    pixels: Float64Array;
    count: number;
}

function bucketRange(bucket: OKLabBucket, channel: 0 | 1 | 2): number {
    const { pixels, count } = bucket;
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < count; i++) {
        const v = pixels[i * 3 + channel]!;
        if (v < min) min = v;
        if (v > max) max = v;
    }
    return max - min;
}

function bucketCentroid(bucket: OKLabBucket): [number, number, number] {
    const { pixels, count } = bucket;
    let sL = 0, sa = 0, sb = 0;
    for (let i = 0; i < count; i++) {
        const off = i * 3;
        sL += pixels[off]!;
        sa += pixels[off + 1]!;
        sb += pixels[off + 2]!;
    }
    return [sL / count, sa / count, sb / count];
}

function splitBucket(bucket: OKLabBucket): [OKLabBucket, OKLabBucket] {
    const rangeL = bucketRange(bucket, 0);
    const rangeA = bucketRange(bucket, 1);
    const rangeB = bucketRange(bucket, 2);

    let splitChannel: 0 | 1 | 2 = 0;
    if (rangeA >= rangeL && rangeA >= rangeB) splitChannel = 1;
    else if (rangeB >= rangeL && rangeB >= rangeA) splitChannel = 2;

    const { pixels, count } = bucket;
    const indices = new Uint32Array(count);
    for (let i = 0; i < count; i++) indices[i] = i;
    indices.sort((a, b) => pixels[a * 3 + splitChannel]! - pixels[b * 3 + splitChannel]!);

    const sorted = new Float64Array(count * 3);
    for (let i = 0; i < count; i++) {
        const src = indices[i]! * 3;
        const dst = i * 3;
        sorted[dst] = pixels[src]!;
        sorted[dst + 1] = pixels[src + 1]!;
        sorted[dst + 2] = pixels[src + 2]!;
    }

    const mid = count >> 1;
    return [
        { pixels: sorted.slice(0, mid * 3), count: mid },
        { pixels: sorted.slice(mid * 3), count: count - mid },
    ];
}

export function medianCutOKLab(
    allPixels: Float64Array,
    pixelCount: number,
    targetBuckets: number,
): { centroid: [number, number, number]; population: number }[] {
    if (targetBuckets <= 1 || pixelCount === 0) {
        const c = pixelCount > 0
            ? bucketCentroid({ pixels: allPixels, count: pixelCount })
            : [0, 0, 0] as [number, number, number];
        return [{ centroid: c, population: pixelCount }];
    }

    const buckets: OKLabBucket[] = [{ pixels: allPixels, count: pixelCount }];

    while (buckets.length < targetBuckets) {
        let bestIdx = 0;
        let bestScore = -1;
        for (let i = 0; i < buckets.length; i++) {
            const bucket = buckets[i]!;
            if (bucket.count < 2) continue;
            const rL = bucketRange(bucket, 0);
            const rA = bucketRange(bucket, 1);
            const rB = bucketRange(bucket, 2);
            const score = Math.max(rL, rA, rB);
            if (score > bestScore) {
                bestScore = score;
                bestIdx = i;
            }
        }

        if (bestScore <= 0) break;

        const [left, right] = splitBucket(buckets[bestIdx]!);
        buckets.splice(bestIdx, 1, left, right);
    }

    return buckets.map((b) => ({
        centroid: bucketCentroid(b),
        population: b.count,
    }));
}

// ── K-Means++ Initialization ──

export function kmeansPlusPlusInit(
    centroids: { centroid: [number, number, number]; population: number }[],
    k: number,
    kC: number,
): [number, number, number][] {
    const n = centroids.length;
    if (n <= k) return centroids.map((c) => [...c.centroid] as [number, number, number]);

    const seeds: [number, number, number][] = [];
    const dist = new Float64Array(n).fill(Infinity);

    let firstIdx = 0;
    let maxPop = 0;
    for (let i = 0; i < n; i++) {
        const pop = centroids[i]!.population;
        if (pop > maxPop) {
            maxPop = pop;
            firstIdx = i;
        }
    }
    seeds.push([...centroids[firstIdx]!.centroid] as [number, number, number]);

    const seed0 = seeds[0]!;
    for (let i = 0; i < n; i++) {
        const c = centroids[i]!.centroid;
        dist[i] = chromaDistSq(c[0], c[1], c[2], seed0[0], seed0[1], seed0[2], kC);
    }

    for (let s = 1; s < k; s++) {
        let total = 0;
        for (let i = 0; i < n; i++) {
            total += dist[i]! * centroids[i]!.population;
        }

        if (total === 0) break;

        let r = Math.random() * total;
        let chosen = 0;
        for (let i = 0; i < n; i++) {
            r -= dist[i]! * centroids[i]!.population;
            if (r <= 0) {
                chosen = i;
                break;
            }
        }

        seeds.push([...centroids[chosen]!.centroid] as [number, number, number]);

        const newSeed = seeds[s]!;
        for (let i = 0; i < n; i++) {
            const c = centroids[i]!.centroid;
            const d = chromaDistSq(c[0], c[1], c[2], newSeed[0], newSeed[1], newSeed[2], kC);
            if (d < dist[i]!) dist[i] = d;
        }
    }

    return seeds;
}

// ── K-Means Iteration ──

export function kmeansIterate(
    pixels: Float64Array,
    pixelCount: number,
    seeds: [number, number, number][],
    maxIterations: number,
    kC: number,
): { centroids: [number, number, number][]; populations: number[] } {
    const k = seeds.length;
    const centroids = seeds.map((s) => [...s] as [number, number, number]);
    const populations = new Float64Array(k);

    const sumL = new Float64Array(k);
    const suma = new Float64Array(k);
    const sumb = new Float64Array(k);
    const counts = new Float64Array(k);

    for (let iter = 0; iter < maxIterations; iter++) {
        sumL.fill(0);
        suma.fill(0);
        sumb.fill(0);
        counts.fill(0);

        for (let p = 0; p < pixelCount; p++) {
            const off = p * 3;
            const pL = pixels[off]!;
            const pa = pixels[off + 1]!;
            const pb = pixels[off + 2]!;

            let bestCluster = 0;
            let bestDist = Infinity;

            for (let c = 0; c < k; c++) {
                const centroid = centroids[c]!;
                const d = chromaDistSq(pL, pa, pb, centroid[0], centroid[1], centroid[2], kC);
                if (d < bestDist) {
                    bestDist = d;
                    bestCluster = c;
                }
            }

            sumL[bestCluster] = sumL[bestCluster]! + pL;
            suma[bestCluster] = suma[bestCluster]! + pa;
            sumb[bestCluster] = sumb[bestCluster]! + pb;
            counts[bestCluster] = counts[bestCluster]! + 1;
        }

        let converged = true;
        for (let c = 0; c < k; c++) {
            const cnt = counts[c]!;
            if (cnt === 0) continue;
            const newL = sumL[c]! / cnt;
            const newa = suma[c]! / cnt;
            const newb = sumb[c]! / cnt;

            const centroid = centroids[c]!;
            const shift = chromaDistSq(centroid[0], centroid[1], centroid[2], newL, newa, newb, 0);
            if (shift > 1e-10) converged = false;

            centroid[0] = newL;
            centroid[1] = newa;
            centroid[2] = newb;
            populations[c] = cnt;
        }

        if (converged) break;
    }

    for (let c = 0; c < k; c++) {
        populations[c] = counts[c]!;
    }

    return {
        centroids,
        populations: Array.from(populations),
    };
}

// ── Deduplication ──

export function deduplicateCentroids(
    centroids: [number, number, number][],
    populations: number[],
    threshold: number,
): { centroids: [number, number, number][]; populations: number[] } {
    const n = centroids.length;
    const merged = new Array<boolean>(n).fill(false);
    const result: [number, number, number][] = [];
    const resultPop: number[] = [];

    for (let i = 0; i < n; i++) {
        if (merged[i]) continue;

        const ci = centroids[i]!;
        const pi = populations[i]!;
        let totalPop = pi;
        let wL = ci[0] * pi;
        let wa = ci[1] * pi;
        let wb = ci[2] * pi;

        for (let j = i + 1; j < n; j++) {
            if (merged[j]) continue;
            const cj = centroids[j]!;
            const pj = populations[j]!;
            const d = deltaEOK(ci[0], ci[1], ci[2], cj[0], cj[1], cj[2]);
            if (d < threshold) {
                merged[j] = true;
                wL += cj[0] * pj;
                wa += cj[1] * pj;
                wb += cj[2] * pj;
                totalPop += pj;
            }
        }

        if (totalPop > 0) {
            result.push([wL / totalPop, wa / totalPop, wb / totalPop]);
        } else {
            result.push([ci[0], ci[1], ci[2]]);
        }
        resultPop.push(totalPop);
    }

    return { centroids: result, populations: resultPop };
}

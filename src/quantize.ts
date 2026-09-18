import type { Color, Result } from "./color/index";
import { convertColor, oklab, rgb } from "./color/index";

export type QuantizeOptions = Readonly<{
    k?: number;
    maxIterations?: number;
    targetPixels?: number;
    chromaWeight?: number;
    dedupeThreshold?: number;
}>;
export type QuantizedColor = Readonly<{
    color: Color<"oklch">;
    population: number;
}>;
export type QuantizeIssue = Readonly<{ code:
    | "quantize_invalid_dimensions"
    | "quantize_pixel_length_mismatch"
    | "quantize_invalid_option"
}>;

type Point = [l: number, a: number, b: number];
const fail = <T>(code: QuantizeIssue["code"]): Result<T, QuantizeIssue> => ({ ok: false, error: { code } });

function distance(a: Point, b: Point, chromaWeight: number): number {
    const chroma = Math.hypot(a[1], a[2]);
    return (a[0] - b[0]) ** 2 + (1 + chromaWeight * chroma) * ((a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

export function quantizePixels(
    pixels: Uint8ClampedArray,
    width: number,
    height: number,
    options: QuantizeOptions = {},
): Result<readonly QuantizedColor[], QuantizeIssue> {
    if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
        return fail("quantize_invalid_dimensions");
    }
    if (pixels.length !== width * height * 4) return fail("quantize_pixel_length_mismatch");
    const k = options.k ?? 8;
    const maxIterations = options.maxIterations ?? 20;
    const targetPixels = options.targetPixels ?? 10_000;
    const chromaWeight = options.chromaWeight ?? 1;
    const dedupeThreshold = options.dedupeThreshold ?? 0.02;
    if (!Number.isInteger(k) || k < 1 || k > 64
        || !Number.isInteger(maxIterations) || maxIterations < 1
        || !Number.isFinite(targetPixels) || targetPixels < 1
        || !Number.isFinite(chromaWeight) || chromaWeight < 0
        || !Number.isFinite(dedupeThreshold) || dedupeThreshold < 0) {
        return fail("quantize_invalid_option");
    }

    const stride = Math.max(1, Math.floor(Math.sqrt(width * height / targetPixels)));
    const points: Point[] = [];
    for (let y = 0; y < height; y += stride) {
        for (let x = 0; x < width; x += stride) {
            const offset = (y * width + x) * 4;
            if (pixels[offset + 3]! < 10) continue;
            const source = rgb(pixels[offset]!, pixels[offset + 1]!, pixels[offset + 2]!);
            if (!source.ok) continue;
            const converted = convertColor(source.value, "oklab");
            if (!converted.ok || converted.value.channels.some((value) => value === "none")) continue;
            points.push([...converted.value.channels] as Point);
        }
    }
    if (points.length === 0) return { ok: true, value: [] };

    const count = Math.min(k, points.length);
    const centers: Point[] = [[...points[0]!] as Point];
    while (centers.length < count) {
        let farthest = points[0]!;
        let farthestDistance = -1;
        for (const point of points) {
            const nearest = Math.min(...centers.map((center) => distance(point, center, chromaWeight)));
            if (nearest > farthestDistance) { farthest = point; farthestDistance = nearest; }
        }
        centers.push([...farthest] as Point);
    }

    const assignments = new Uint16Array(points.length);
    const populations = new Uint32Array(count);
    for (let iteration = 0; iteration < maxIterations; iteration++) {
        populations.fill(0);
        const sums = Array.from({ length: count }, () => [0, 0, 0] as Point);
        let changed = false;
        points.forEach((point, index) => {
            let best = 0;
            let bestDistance = Number.POSITIVE_INFINITY;
            centers.forEach((center, centerIndex) => {
                const next = distance(point, center, chromaWeight);
                if (next < bestDistance) { best = centerIndex; bestDistance = next; }
            });
            if (assignments[index] !== best) changed = true;
            assignments[index] = best;
            populations[best] = populations[best]! + 1;
            sums[best]![0] += point[0]; sums[best]![1] += point[1]; sums[best]![2] += point[2];
        });
        centers.forEach((center, index) => {
            if (populations[index] === 0) return;
            center[0] = sums[index]![0] / populations[index]!;
            center[1] = sums[index]![1] / populations[index]!;
            center[2] = sums[index]![2] / populations[index]!;
        });
        if (!changed && iteration > 0) break;
    }

    const output: QuantizedColor[] = [];
    centers.forEach((center, index) => {
        if (populations[index] === 0) return;
        const source = oklab(center[0], center[1], center[2]);
        if (!source.ok) return;
        const color = convertColor(source.value, "oklch");
        if (!color.ok) return;
        const duplicate = output.find((candidate) => {
            const channels = candidate.color.channels;
            return channels[0] !== "none" && channels[1] !== "none"
                && Math.hypot(channels[0] - (color.value.channels[0] as number), channels[1] - (color.value.channels[1] as number)) < dedupeThreshold;
        });
        if (duplicate) {
            const duplicateIndex = output.indexOf(duplicate);
            output[duplicateIndex] = {
                color: duplicate.color,
                population: duplicate.population + populations[index]!,
            };
            return;
        }
        output.push({ color: color.value, population: populations[index]! });
    });
    output.sort((a, b) => b.population - a.population);
    return { ok: true, value: output };
}

export function dominantColor(
    pixels: Uint8ClampedArray,
    width: number,
    height: number,
): Result<QuantizedColor | null, QuantizeIssue> {
    const result = quantizePixels(pixels, width, height, { k: 5 });
    return result.ok ? { ok: true, value: result.value[0] ?? null } : result;
}

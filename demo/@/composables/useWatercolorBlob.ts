import { ref, onUnmounted, watch, type Ref } from "vue";
import { lerp } from "@src/math";

/** Mulberry32 — fast 32-bit seeded PRNG */
function mulberry32(seed: number) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Simple string→u32 hash (djb2) */
function hashString(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
    }
    return hash >>> 0;
}

/** Generate 8 random border-radius values in [lo, hi] using the given PRNG */
function randomRadii(rng: () => number, lo: number, hi: number): number[] {
    const out: number[] = [];
    for (let i = 0; i < 8; i++) {
        out.push(lo + rng() * (hi - lo));
    }
    return out;
}

function radiiToCSS(r: number[]): string {
    return `${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}% / ${r[4]}% ${r[5]}% ${r[6]}% ${r[7]}%`;
}

export interface UseWatercolorBlobOptions {
    /** Enable rAF animation loop */
    animate?: boolean;
    /** Base cycle duration in ms (default 4000) */
    cycleDuration?: number;
    /** Border-radius range [lo, hi] as percentages (default [20, 80]) */
    range?: [number, number];
}

export function useWatercolorBlob(
    color: Ref<string> | (() => string),
    options: UseWatercolorBlobOptions = {},
) {
    const {
        animate = false,
        cycleDuration = 4000,
        range = [20, 80],
    } = options;

    const borderRadius = ref("");
    const hoverBorderRadius = ref("");

    const getColor = typeof color === "function" ? color : () => color.value;

    // Deterministic initial shape from color string
    const rng = mulberry32(hashString(getColor()));
    const initial = randomRadii(rng, range[0], range[1]);
    borderRadius.value = radiiToCSS(initial);

    // Generate a second deterministic shape for hover state
    const hoverShape = randomRadii(rng, range[0], range[1]);
    hoverBorderRadius.value = radiiToCSS(hoverShape);

    // Re-seed when color changes (non-animated mode)
    if (!animate) {
        if (typeof color !== "function") {
            watch(color, (c) => {
                const r = mulberry32(hashString(c));
                borderRadius.value = radiiToCSS(randomRadii(r, range[0], range[1]));
                hoverBorderRadius.value = radiiToCSS(randomRadii(r, range[0], range[1]));
            });
        }
        return { borderRadius, hoverBorderRadius };
    }

    // Animation state
    let current = [...initial];
    let from = [...initial];
    let to = randomRadii(rng, range[0], range[1]);
    let startTime = 0;
    let duration = cycleDuration * (0.8 + rng() * 0.4); // +/-20% variance
    let rafId: number | null = null;

    function tick(now: number) {
        if (startTime === 0) startTime = now;

        let t = (now - startTime) / duration;
        if (t >= 1) {
            // Advance to next target
            from = [...to];
            to = randomRadii(rng, range[0], range[1]);
            startTime = now;
            duration = cycleDuration * (0.8 + rng() * 0.4);
            t = 0;
        }

        // Smooth easing (ease-in-out)
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        for (let i = 0; i < 8; i++) {
            current[i] = lerp(ease, from[i], to[i]);
        }

        borderRadius.value = radiiToCSS(current);
        rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    onUnmounted(() => {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    });

    return { borderRadius, hoverBorderRadius };
}

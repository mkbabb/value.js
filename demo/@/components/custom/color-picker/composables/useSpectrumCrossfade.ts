/**
 * The space-switch plate cross-fade (R.W3 Lane E / E2 — treatment §MOTION-3).
 *
 * When `selectedColorSpace` changes, the field cross-fades between the old
 * and the new perceptual plate instead of hard-swapping: the OLD overlay's
 * pixels (the gamut-truth contour + hatch — the Q11 lens override makes a
 * wide-RGB selection a REAL geometry change) are copied into a snapshot
 * canvas stacked above the live overlay, which fades out over
 * `--duration-normal` while the live pass redraws beneath. Two stacked
 * plates, one breath.
 *
 * Timing correctness: the snapshot is copied in a pre-flush watch + a
 * microtask (`nextTick`) — both run BEFORE the overlay's rAF-gated redraw,
 * so the copy always holds the OLD geometry.
 *
 * PRM: under `prefers-reduced-motion: reduce` no snapshot is taken at all —
 * the plate hard-swaps (state, not decoration, still tracks instantly).
 */

import { nextTick, ref, watch, type Ref, type WatchSource } from "vue";

const FADE_MS = 280; // --duration-normal (240ms) + teardown slack

export function useSpectrumCrossfade(opts: {
    selectedColorSpace: WatchSource<string>;
    /** The live overlay canvas to snapshot (old pixels at switch time). */
    overlayCanvasRef: Readonly<Ref<HTMLCanvasElement | null>>;
}) {
    const active = ref(false);
    const snapshotCanvasRef = ref<HTMLCanvasElement | null>(null);
    let teardown: ReturnType<typeof setTimeout> | null = null;

    watch(opts.selectedColorSpace, () => {
        if (typeof window === "undefined") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const src = opts.overlayCanvasRef.value;
        if (!src || src.width === 0 || src.height === 0) return;

        // Copy the OLD plate synchronously (before the overlay's rAF redraw).
        const w = src.width;
        const h = src.height;
        if (teardown !== null) clearTimeout(teardown);
        active.value = true;

        nextTick(() => {
            const snap = snapshotCanvasRef.value;
            if (!snap) return;
            snap.width = w;
            snap.height = h;
            const ctx = snap.getContext("2d");
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(src, 0, 0);
        });

        teardown = setTimeout(() => {
            active.value = false;
            teardown = null;
        }, FADE_MS);
    });

    return { active, snapshotCanvasRef };
}

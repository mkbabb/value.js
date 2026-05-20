/**
 * useLoupeCanvas — the magnifier-loupe canvas rendering for ImageEyedropper.
 *
 * Owns the loupe canvas ref, visibility / position state, and the `drawLoupe`
 * + clearing primitives. The shell wires the image sampler's
 * `getOffscreenCanvas` + `viewportToImage` in via deps.
 *
 * Extracted from `ImageEyedropper.vue` at D.W3 Lane A (De §2.4 split).
 */
import { ref, useTemplateRef } from "vue";
import { LOUPE_SIZE, LOUPE_PIXELS } from "../constants";

export interface LoupeCanvasDeps {
    /** Returns the underlying offscreen canvas (full-resolution image bitmap). */
    getOffscreenCanvas: () => HTMLCanvasElement | null;
    /** Convert viewport-relative coords to image-pixel coords. */
    viewportToImage: (rx: number, ry: number) => { ix: number; iy: number };
}

export function useLoupeCanvas(deps: LoupeCanvasDeps) {
    const loupeCanvasRef = useTemplateRef<HTMLCanvasElement>("loupeCanvasRef");

    const loupeVisible = ref(false);
    const loupeRelX = ref(0);
    const loupeRelY = ref(0);

    function drawLoupe(rx: number, ry: number) {
        const loupeCanvas = loupeCanvasRef.value;
        const offscreenCanvas = deps.getOffscreenCanvas();
        if (!loupeCanvas || !offscreenCanvas) return;
        const ctx = loupeCanvas.getContext("2d")!;
        const { ix, iy } = deps.viewportToImage(rx, ry);
        const half = Math.floor(LOUPE_PIXELS / 2);

        ctx.clearRect(0, 0, LOUPE_SIZE, LOUPE_SIZE);
        ctx.save();
        ctx.beginPath();
        ctx.arc(LOUPE_SIZE / 2, LOUPE_SIZE / 2, LOUPE_SIZE / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            offscreenCanvas,
            ix - half,
            iy - half,
            LOUPE_PIXELS,
            LOUPE_PIXELS,
            0,
            0,
            LOUPE_SIZE,
            LOUPE_SIZE,
        );
        ctx.restore();
    }

    function showLoupeAt(rx: number, ry: number) {
        loupeVisible.value = true;
        loupeRelX.value = rx;
        loupeRelY.value = ry;
        drawLoupe(rx, ry);
    }

    function hideLoupe() {
        loupeVisible.value = false;
    }

    return {
        loupeCanvasRef,
        loupeVisible,
        loupeRelX,
        loupeRelY,
        drawLoupe,
        showLoupeAt,
        hideLoupe,
    };
}

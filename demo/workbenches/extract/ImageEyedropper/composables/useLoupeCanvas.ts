/**
 * useLoupeCanvas — the magnifier-loupe canvas rendering for ImageEyedropper.
 *
 * Owns the lens canvas ref and `drawLoupe`; where the lens stands and whether
 * it shows are the shell's (color-40 N: the lens is always mounted, so its
 * canvas is painted on the touch's own frame). The shell wires the image
 * sampler's `getImageCanvas` + `viewportToImage` in via deps.
 *
 * Extracted from `ImageEyedropper.vue` at D.W3 Lane A (De §2.4 split).
 */
import { useTemplateRef } from "vue";
import { LOUPE_SIZE } from "../constants";

export interface LoupeCanvasDeps {
    /** Returns the underlying offscreen canvas (full-resolution image bitmap). */
    getImageCanvas: () => HTMLCanvasElement | null;
    /** Convert viewport-relative coords to image-pixel coords. */
    viewportToImage: (rx: number, ry: number) => { ix: number; iy: number };
}

export function useLoupeCanvas(deps: LoupeCanvasDeps) {
    const loupeCanvasRef = useTemplateRef<HTMLCanvasElement>("loupeCanvasRef");

    /**
     * color-40 N: the lens magnifies the photo AS DISPLAYED, 4x, capped
     * at 12 lens px per source pixel, so it shows the surroundings at any zoom
     * (production drew 11 source px across, about 86x at the fitted zoom: one
     * flat disc). `scale` is the lens px per source px for this draw.
     */
    function lensScale(zoom: number) {
        return Math.min(4 * zoom, 12);
    }

    function drawLoupe(rx: number, ry: number, zoom = 1) {
        const loupeCanvas = loupeCanvasRef.value;
        const imageCanvas = deps.getImageCanvas();
        if (!loupeCanvas || !imageCanvas) return;
        const ctx = loupeCanvas.getContext("2d")!;
        const { ix, iy } = deps.viewportToImage(rx, ry);
        const scale = lensScale(zoom);
        const across = LOUPE_SIZE / scale; // source px across the lens
        const side = loupeCanvas.width;

        ctx.clearRect(0, 0, side, side);
        ctx.imageSmoothingEnabled = scale < 4;
        ctx.drawImage(
            imageCanvas,
            ix + 0.5 - across / 2,
            iy + 0.5 - across / 2,
            across,
            across,
            0,
            0,
            side,
            side,
        );
    }

    return {
        loupeCanvasRef,
        drawLoupe,
        lensScale,
    };
}

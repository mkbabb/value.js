/**
 * useImageSampler — image-loading + pixel-sampling concern for ImageEyedropper.
 *
 * Owns the offscreen canvas, the loaded image dimensions, and the
 * `sampleAt(rx, ry)` + `viewportToImage(rx, ry)` operations. The shell wires
 * the gesture composable's panX/panY/zoom refs in via the `getTransform`
 * accessor.
 *
 * Extracted from `ImageEyedropper.vue` at D.W3 Lane A (De §2.4 split).
 */
import { ref, type Ref } from "vue";
import type { ColorSpace } from "@mkbabb/value.js/color";
import { parseCSSColor } from "@mkbabb/value.js/parsing";
import { colorUnit2, normalizeColorUnit } from "@mkbabb/value.js/color";

export type DisplayColorSpace = ColorSpace | "hex";

export interface ImageSamplerDeps {
    /** Visible canvas element to mirror the image into (for the transform overlay). */
    canvasRef: Readonly<Ref<HTMLCanvasElement | null>>;
    /** Returns the current pan + zoom transform from the gesture composable. */
    getTransform: () => { panX: number; panY: number; zoom: number };
    /** Display color space for the sampled hex formatter. */
    colorSpace: () => DisplayColorSpace;
}

function formatHex(r: number, g: number, b: number): string {
    const hex = (v: number) => v.toString(16).padStart(2, "0");
    return `#${hex(r)}${hex(g)}${hex(b)}`;
}

export function useImageSampler(deps: ImageSamplerDeps) {
    // Offscreen canvas backs the pixel sampling; visible canvas tracks the transform.
    let offscreenCanvas: HTMLCanvasElement | null = null;
    let offscreenCtx: CanvasRenderingContext2D | null = null;

    const imgWidth = ref(0);
    const imgHeight = ref(0);
    const imageLoaded = ref(false);

    function formatInColorSpace(hex: string): string {
        const space = deps.colorSpace();
        if (space === "hex") return hex;
        try {
            const parsed = parseCSSColor(hex);
            if (!parsed) return hex;
            const converted = colorUnit2(
                parsed,
                space,
                false,
                false,
                false,
            );
            const denorm = normalizeColorUnit(converted, true, false);
            return denorm.value.toFormattedString(2);
        } catch {
            return hex;
        }
    }

    async function loadImage(imageUrl: string) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;
        await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = reject;
        });

        imgWidth.value = img.naturalWidth;
        imgHeight.value = img.naturalHeight;

        offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = imgWidth.value;
        offscreenCanvas.height = imgHeight.value;
        offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true })!;
        offscreenCtx.drawImage(img, 0, 0);

        const canvas = deps.canvasRef.value;
        if (canvas) {
            canvas.width = imgWidth.value;
            canvas.height = imgHeight.value;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0);
        }

        imageLoaded.value = true;
    }

    function dispose() {
        offscreenCanvas = null;
        offscreenCtx = null;
        imageLoaded.value = false;
    }

    function viewportToImage(rx: number, ry: number) {
        const { panX, panY, zoom } = deps.getTransform();
        return {
            ix: Math.floor((rx - panX) / zoom),
            iy: Math.floor((ry - panY) / zoom),
        };
    }

    function sampleAt(rx: number, ry: number) {
        if (!offscreenCtx) return null;
        const { ix, iy } = viewportToImage(rx, ry);
        if (ix < 0 || iy < 0 || ix >= imgWidth.value || iy >= imgHeight.value)
            return null;
        const data = offscreenCtx.getImageData(ix, iy, 1, 1).data;
        const hex = formatHex(data[0] ?? 0, data[1] ?? 0, data[2] ?? 0);
        return { hex, formatted: formatInColorSpace(hex) };
    }

    /** Expose the offscreen canvas to the loupe composable (read-only handle). */
    function getOffscreenCanvas(): HTMLCanvasElement | null {
        return offscreenCanvas;
    }

    return {
        // state
        imgWidth,
        imgHeight,
        imageLoaded,
        // ops
        loadImage,
        dispose,
        viewportToImage,
        sampleAt,
        formatInColorSpace,
        getOffscreenCanvas,
    };
}

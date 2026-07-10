/**
 * Composable for image → palette extraction via Web Worker.
 *
 * Provides: quantizeFromFile, quantizeFromCanvas, quantizeFromCamera
 * All run quantization off main thread with Transferable ArrayBuffer.
 */

import { ref, shallowRef, onBeforeUnmount } from "vue";
import type { QuantizedColor, QuantizeOptions } from "@mkbabb/value.js/quantize";
import type { QuantizeWorkerResponse } from "@lib/quantize-worker";
import QuantizeWorkerURL from "@lib/quantize-worker?worker";

function createWorker(): Worker {
    return new QuantizeWorkerURL();
}

/** Load an image File/Blob onto a canvas and return pixel data + dimensions. */
async function imageFileToPixels(file: File): Promise<{ pixels: Uint8ClampedArray; width: number; height: number }> {
    const bitmap = await createImageBitmap(file);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return { pixels: imageData.data, width: canvas.width, height: canvas.height };
}

/** Grab pixel data from a canvas element. */
function canvasToPixels(canvas: HTMLCanvasElement): { pixels: Uint8ClampedArray; width: number; height: number } {
    const ctx = canvas.getContext("2d")!;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return { pixels: imageData.data, width: canvas.width, height: canvas.height };
}

export interface ImageQuantizeOptions {
    /**
     * S.W2 W2-4: injectable worker construction. Defaults to the `?worker`
     * import; tests + a Safari-worker fallback can swap a fake/pooled factory.
     */
    workerFactory?: () => Worker;
}

export function useImageQuantize(options?: ImageQuantizeOptions) {
    const workerFactory = options?.workerFactory ?? createWorker;

    const palette = shallowRef<QuantizedColor[]>([]);
    const isProcessing = ref(false);
    const error = ref<string | null>(null);

    let worker: Worker | null = null;
    let pendingResolve: ((value: QuantizedColor[]) => void) | null = null;
    let pendingReject: ((reason: unknown) => void) | null = null;

    function getWorker(): Worker {
        if (!worker) {
            worker = workerFactory();
            worker.onmessage = (e: MessageEvent<QuantizeWorkerResponse>) => {
                if (e.data.type === "result") {
                    palette.value = e.data.palette ?? [];
                    pendingResolve?.(palette.value);
                } else {
                    error.value = e.data.error ?? "Unknown worker error";
                    pendingReject?.(new Error(error.value));
                }
                isProcessing.value = false;
                pendingResolve = null;
                pendingReject = null;
            };
            worker.onerror = (e) => {
                error.value = e.message;
                isProcessing.value = false;
                pendingReject?.(e);
                pendingResolve = null;
                pendingReject = null;
            };
        }
        return worker;
    }

    function runQuantize(
        pixels: Uint8ClampedArray,
        width: number,
        height: number,
        options?: Partial<QuantizeOptions>,
    ): Promise<QuantizedColor[]> {
        error.value = null;
        isProcessing.value = true;

        return new Promise<QuantizedColor[]>((resolve, reject) => {
            pendingResolve = resolve;
            pendingReject = reject;

            const buffer = pixels.buffer.slice(0);
            getWorker().postMessage(
                { pixels: buffer, width, height, options },
                [buffer],
            );
        });
    }

    // kC: `chromaWeight` (the OKLab distance-metric chroma bias, `QuantizeOptions.chromaWeight`)
    // is threaded through into the worker options so the extractor's chroma-weight
    // control actually perturbs the quantization. The library already consumes it
    // (`src/quantize/index.ts:141`); the demo previously forwarded only `{ k }`,
    // making the control a placebo. `chromaWeight` is omitted from the options when
    // undefined so it never clobbers the library `DEFAULTS` (`{ ...DEFAULTS, ...opts }`).
    const buildOptions = (k: number, chromaWeight?: number): Partial<QuantizeOptions> =>
        chromaWeight === undefined ? { k } : { k, chromaWeight };

    async function quantizeFromFile(file: File, k: number, chromaWeight?: number): Promise<QuantizedColor[]> {
        const { pixels, width, height } = await imageFileToPixels(file);
        return runQuantize(pixels, width, height, buildOptions(k, chromaWeight));
    }

    async function quantizeFromCanvas(canvas: HTMLCanvasElement, k: number, chromaWeight?: number): Promise<QuantizedColor[]> {
        const { pixels, width, height } = canvasToPixels(canvas);
        return runQuantize(pixels, width, height, buildOptions(k, chromaWeight));
    }

    async function quantizeFromCamera(k: number, chromaWeight?: number): Promise<{ palette: QuantizedColor[]; stop: () => void }> {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
        });

        const video = document.createElement("video");
        video.srcObject = stream;
        video.playsInline = true;
        await video.play();

        // Wait for video to have actual dimensions
        await new Promise<void>((resolve) => {
            if (video.videoWidth > 0) return resolve();
            video.onloadeddata = () => resolve();
        });

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(video, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const result = await runQuantize(imageData.data, canvas.width, canvas.height, buildOptions(k, chromaWeight));

        const stop = () => {
            stream.getTracks().forEach((t) => t.stop());
            video.srcObject = null;
        };

        return { palette: result, stop };
    }

    onBeforeUnmount(() => {
        worker?.terminate();
        worker = null;
    });

    return {
        palette,
        isProcessing,
        error,
        quantizeFromFile,
        quantizeFromCanvas,
        quantizeFromCamera,
    };
}

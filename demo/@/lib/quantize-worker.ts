/**
 * Web Worker for image quantization.
 * Runs quantizePixels off the main thread, using Transferable for zero-copy pixel data.
 */

import { quantizePixels } from "@src/quantize";
import type { QuantizeOptions, QuantizedColor } from "@src/quantize";

export interface QuantizeWorkerRequest {
    pixels: ArrayBuffer;
    width: number;
    height: number;
    options?: Partial<QuantizeOptions>;
}

export interface QuantizeWorkerResponse {
    type: "result" | "error";
    palette?: QuantizedColor[];
    error?: string;
}

self.onmessage = (e: MessageEvent<QuantizeWorkerRequest>) => {
    try {
        const { pixels, width, height, options } = e.data;
        const clamped = new Uint8ClampedArray(pixels);
        const palette = quantizePixels(clamped, width, height, options);

        (self as unknown as Worker).postMessage(
            { type: "result", palette } satisfies QuantizeWorkerResponse,
        );
    } catch (err) {
        (self as unknown as Worker).postMessage(
            { type: "error", error: String(err) } satisfies QuantizeWorkerResponse,
        );
    }
};

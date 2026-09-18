/**
 * Web Worker for image quantization.
 * Runs quantizePixels off the main thread, using Transferable for zero-copy pixel data.
 */

import { quantizePixels } from "@mkbabb/value.js/quantize";
import type { QuantizeOptions, QuantizedColor } from "@mkbabb/value.js/quantize";

export interface QuantizeWorkerRequest {
    pixels: ArrayBuffer;
    width: number;
    height: number;
    options?: Partial<QuantizeOptions>;
}

export type QuantizeWorkerResponse =
    | { type: "result"; palette: readonly QuantizedColor[] }
    | { type: "error"; error: string };

self.onmessage = (e: MessageEvent<QuantizeWorkerRequest>) => {
    try {
        const { pixels, width, height, options } = e.data;
        const clamped = new Uint8ClampedArray(pixels);
        const result = quantizePixels(clamped, width, height, options);

        if (!result.ok) {
            (self as unknown as Worker).postMessage({
                type: "error",
                error: result.error.code,
            } satisfies QuantizeWorkerResponse);
            return;
        }

        (self as unknown as Worker).postMessage({
            type: "result",
            palette: result.value,
        } satisfies QuantizeWorkerResponse);
    } catch (err) {
        (self as unknown as Worker).postMessage({
            type: "error",
            error: String(err),
        } satisfies QuantizeWorkerResponse);
    }
};

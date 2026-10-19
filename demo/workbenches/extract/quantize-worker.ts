/**
 * Web Worker for image quantization.
 * Runs quantizePixels off the main thread, using Transferable for zero-copy pixel data.
 *
 * X-W7 Repair 1 (XW-34 · EC-36): both directions of the seam are typed — the
 * request carries an `id` the response echoes, so the caller settles exactly
 * the job that answered; the failure is a closed union the caller turns into
 * words, never a raw library code or `String(err)` rendered verbatim.
 */

import { quantizePixels } from "@mkbabb/value.js/quantize";
import type { QuantizeIssue, QuantizeOptions, QuantizedColor } from "@mkbabb/value.js/quantize";

export interface QuantizeWorkerRequest {
    id: number;
    pixels: ArrayBuffer;
    width: number;
    height: number;
    options?: Partial<QuantizeOptions>;
}

/** Every way a quantize job can fail: the library's codes, an undecodable file, or the worker itself. */
export type QuantizeFailure = QuantizeIssue["code"] | "decode" | "worker";

export type QuantizeWorkerResponse =
    | { id: number; type: "result"; palette: readonly QuantizedColor[] }
    | { id: number; type: "error"; error: QuantizeFailure };

self.onmessage = (e: MessageEvent<QuantizeWorkerRequest>) => {
    const { id, pixels, width, height, options } = e.data;
    const post = (response: QuantizeWorkerResponse) =>
        (self as unknown as Worker).postMessage(response);
    try {
        const result = quantizePixels(new Uint8ClampedArray(pixels), width, height, options);
        post(
            result.ok
                ? { id, type: "result", palette: result.value }
                : { id, type: "error", error: result.error.code },
        );
    } catch {
        // A throw inside the library is reported as the worker's failure —
        // the caller renders it in words and the job settles.
        post({ id, type: "error", error: "worker" });
    }
};

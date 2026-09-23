/**
 * Composable for image → palette extraction via Web Worker.
 *
 * X-W7 Repair 1 (D-6 · B-1 XP-EXTRACT session core — W7.545/.548/.550/.553/.554,
 * EC-36): one typed seam, end to end.
 *   - The REQUEST direction is typed (`satisfies QuantizeWorkerRequest`) and
 *     carries a request id; the response echoes it (XW-34a).
 *   - Every run SETTLES to a `QuantizeOutcome` — a worker-reported failure or
 *     an undecodable file is a value, never a floating rejection (XW-34b, EY-10).
 *   - `isProcessing` is armed BEFORE the decode, the one phase that freezes the
 *     main thread (XW-4).
 *   - Only the LATEST request writes state; a superseded run settles
 *     `superseded` and touches nothing (XW-19's request identity).
 *   - Failure is words, not library enum codes (EC-36).
 * The dead `quantizeFromCanvas` / `quantizeFromCamera` pair (no consumer; the
 * workbench owns its camera) is deleted.
 */

import { ref, shallowRef } from "vue";
import type { QuantizedColor, QuantizeOptions } from "@mkbabb/value.js/quantize";
import type {
    QuantizeWorkerRequest,
    QuantizeWorkerResponse,
    QuantizeFailure,
} from "../quantize-worker";
import QuantizeWorkerURL from "../quantize-worker?worker";

function createWorker(): Worker {
    return new QuantizeWorkerURL();
}

export type QuantizeOutcome =
    | Readonly<{ kind: "developed"; palette: readonly QuantizedColor[] }>
    | Readonly<{ kind: "failed"; message: string }>
    | Readonly<{ kind: "superseded" }>;

/** The one presentation of a quantize failure — plain words (EC-36). */
export function describeQuantizeFailure(failure: QuantizeFailure): string {
    switch (failure) {
        case "decode":
            return "This file could not be read as an image.";
        case "quantize_invalid_dimensions":
            return "This image has no pixels to sample.";
        case "quantize_pixel_length_mismatch":
        case "quantize_invalid_option":
        case "worker":
            return "Could not extract colors from this image.";
    }
}

/** Decode an image File/Blob and return its pixel data + dimensions. */
async function imageFileToPixels(
    file: File,
): Promise<{ pixels: Uint8ClampedArray<ArrayBuffer>; width: number; height: number } | null> {
    let bitmap: ImageBitmap;
    try {
        bitmap = await createImageBitmap(file);
    } catch {
        // `createImageBitmap` rejects (InvalidStateError) on an undecodable
        // file; that is the "decode" outcome, carried as a value.
        return null;
    }
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        bitmap.close();
        return null;
    }
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();
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

    const palette = shallowRef<readonly QuantizedColor[]>([]);
    const isProcessing = ref(false);
    const error = ref<string | null>(null);

    let worker: Worker | null = null;
    /** The latest request's id; only it may write state. */
    let latest = 0;
    /** In-flight worker jobs, keyed by request id. */
    const pending = new Map<number, (outcome: QuantizeOutcome) => void>();

    function settle(id: number, outcome: QuantizeOutcome) {
        pending.get(id)?.(outcome);
        pending.delete(id);
    }

    function failAll() {
        for (const id of [...pending.keys()]) {
            settle(id, id === latest ? fail("worker") : { kind: "superseded" });
        }
    }

    function fail(failure: QuantizeFailure): QuantizeOutcome {
        return { kind: "failed", message: describeQuantizeFailure(failure) };
    }

    /** The one writer of state: the latest request's outcome, and only it. */
    function apply(id: number, outcome: QuantizeOutcome): QuantizeOutcome {
        if (id !== latest) return { kind: "superseded" };
        if (outcome.kind === "developed") palette.value = outcome.palette;
        if (outcome.kind === "failed") {
            palette.value = [];
            error.value = outcome.message;
        }
        isProcessing.value = false;
        return outcome;
    }

    function getWorker(): Worker {
        if (!worker) {
            worker = workerFactory();
            worker.onmessage = (e: MessageEvent<QuantizeWorkerResponse>) => {
                const res = e.data;
                settle(
                    res.id,
                    res.type === "result"
                        ? { kind: "developed", palette: res.palette }
                        : fail(res.error),
                );
            };
            worker.onerror = () => {
                worker?.terminate();
                worker = null;
                failAll();
            };
        }
        return worker;
    }

    function postToWorker(request: QuantizeWorkerRequest): Promise<QuantizeOutcome> {
        return new Promise<QuantizeOutcome>((resolve) => {
            pending.set(request.id, resolve);
            getWorker().postMessage(request, [request.pixels]);
        });
    }

    // Keep the public default authoritative when the optional control is unset.
    const buildOptions = (k: number, chromaWeight?: number): Partial<QuantizeOptions> =>
        chromaWeight === undefined ? { k } : { k, chromaWeight };

    async function quantizeFromFile(
        file: File,
        k: number,
        chromaWeight?: number,
    ): Promise<QuantizeOutcome> {
        const id = ++latest;
        error.value = null;
        isProcessing.value = true;

        const decoded = await imageFileToPixels(file);
        if (id !== latest) return { kind: "superseded" };
        if (!decoded) return apply(id, fail("decode"));

        const { pixels, width, height } = decoded;
        // R-30 (X.W7.g3): the decoded buffer is this call's own and discardable,
        // so it is TRANSFERRED as-is — zero-copy, as the seam's docblocks state.
        // `ImageData.data` owns its whole buffer (offset 0, exact length).
        const outcome = await postToWorker({
            id,
            pixels: pixels.buffer,
            width,
            height,
            options: buildOptions(k, chromaWeight),
        } satisfies QuantizeWorkerRequest);
        return apply(id, outcome);
    }

    // X.W5.a · gate N1 — the DEACTIVATION contract (see PaneSlot's header).
    // `terminate()` was unreachable for a parked pane, so an in-flight
    // quantize kept a worker thread alive for the session. Terminating on
    // deactivate is safe by construction: `getWorker` re-creates one on the
    // next run, so a parked pane costs nothing and a resumed pane still works.
    // A terminated job never answers, so its awaiters are settled here.
    // X.W7.g3 (EY-12): the quantizer lives at the SESSION's altitude, above any
    // one mount, so the session's holder binds this to its lifecycle.
    function releaseWorker() {
        worker?.terminate();
        worker = null;
        for (const id of [...pending.keys()]) settle(id, { kind: "superseded" });
        if (isProcessing.value) {
            latest += 1;
            isProcessing.value = false;
        }
    }

    return {
        palette,
        isProcessing,
        error,
        quantizeFromFile,
        releaseWorker,
    };
}

/**
 * useCameraCapture — the extract stage's camera mode (X.W7.g3 · the camera
 * cluster XW-8 / XW-9 / XW-35).
 *
 * One owner for the one device stream:
 *   - `start()` is idempotent. A second press while the camera is opening or
 *     open is a no-op, so no second `getUserMedia` stream is ever minted and
 *     orphaned (XW-9 measured `streamCount: 2`).
 *   - `stop()` is the exit. It releases every track, and a stream that arrives
 *     after the user already left is released on arrival, never kept.
 *   - `capture()` hands back the current frame as a PNG `File`, full frame.
 * Failure is a value (`error`), never a write into another producer's slot.
 */
import { ref, shallowRef, type Ref } from "vue";

export type CameraState = "off" | "opening" | "live";

export function useCameraCapture(videoRef: Readonly<Ref<HTMLVideoElement | null>>) {
    const state = ref<CameraState>("off");
    const error = ref<string | null>(null);
    const stream = shallowRef<MediaStream | null>(null);
    /** Bumps on every stop, so a late `getUserMedia` answer knows it was abandoned. */
    let generation = 0;

    function release(s: MediaStream) {
        for (const track of s.getTracks()) track.stop();
    }

    async function start(): Promise<void> {
        if (state.value !== "off") return;
        const id = ++generation;
        state.value = "opening";
        error.value = null;
        let acquired: MediaStream;
        try {
            acquired = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
            });
        } catch (err) {
            if (id !== generation) return;
            state.value = "off";
            error.value =
                err instanceof DOMException && err.name === "NotAllowedError"
                    ? "Camera access was denied."
                    : "The camera could not be opened.";
            return;
        }
        if (id !== generation) {
            release(acquired);
            return;
        }
        stream.value = acquired;
        state.value = "live";
    }

    function stop(): void {
        generation += 1;
        if (stream.value) release(stream.value);
        stream.value = null;
        state.value = "off";
    }

    /** The current frame, whole (the viewfinder may crop its display; the capture never does). */
    async function capture(): Promise<File | null> {
        const video = videoRef.value;
        if (state.value !== "live" || !video || video.videoWidth === 0) return null;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;
        ctx.drawImage(video, 0, 0);
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
        return blob ? new File([blob], "camera-capture.png", { type: "image/png" }) : null;
    }

    return { state, error, stream, start, stop, capture };
}

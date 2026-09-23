/**
 * X.W7.g3 · the camera cluster (XW-8 / XW-9 / XW-35) — the one device stream.
 *
 * The device is the one stub, at the platform boundary (`getUserMedia`); every
 * track the stub hands out records whether it was stopped, so an orphaned live
 * stream is a counted fact, not an inference.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { shallowRef } from "vue";
import { useCameraCapture } from "../../workbenches/extract/composables/useCameraCapture";

type FakeTrack = { readyState: "live" | "ended"; stop: () => void };

function installDevice() {
    const streams: { tracks: FakeTrack[] }[] = [];
    let answer: (() => void) | null = null;
    const getUserMedia = vi.fn(
        () =>
            new Promise<MediaStream>((resolve) => {
                const track: FakeTrack = {
                    readyState: "live",
                    stop() {
                        track.readyState = "ended";
                    },
                };
                const stream = { tracks: [track] };
                streams.push(stream);
                answer = () => resolve({ getTracks: () => stream.tracks } as unknown as MediaStream);
            }),
    );
    Object.defineProperty(navigator, "mediaDevices", {
        configurable: true,
        value: { getUserMedia },
    });
    return {
        getUserMedia,
        answer: () => answer?.(),
        live: () => streams.flatMap((s) => s.tracks).filter((t) => t.readyState === "live").length,
    };
}

afterEach(() => {
    Reflect.deleteProperty(navigator, "mediaDevices");
});

describe("useCameraCapture", () => {
    it("XW-9: a second press while opening or live mints no second stream", async () => {
        const device = installDevice();
        const cam = useCameraCapture(shallowRef(null));
        const first = cam.start();
        void cam.start();
        device.answer();
        await first;
        await cam.start();
        expect(device.getUserMedia).toHaveBeenCalledTimes(1);
        expect(cam.state.value).toBe("live");
        expect(device.live()).toBe(1);
    });

    it("XW-8: stop is an exit that releases every track", async () => {
        const device = installDevice();
        const cam = useCameraCapture(shallowRef(null));
        const opening = cam.start();
        device.answer();
        await opening;
        cam.stop();
        expect(cam.state.value).toBe("off");
        expect(device.live()).toBe(0);
    });

    it("a stream that arrives after the user left is released on arrival", async () => {
        const device = installDevice();
        const cam = useCameraCapture(shallowRef(null));
        const opening = cam.start();
        cam.stop();
        device.answer();
        await opening;
        expect(cam.state.value).toBe("off");
        expect(device.live()).toBe(0);
    });

    it("a denied device is its own words, and the camera can be tried again", async () => {
        Object.defineProperty(navigator, "mediaDevices", {
            configurable: true,
            value: {
                getUserMedia: () => Promise.reject(new DOMException("no", "NotAllowedError")),
            },
        });
        const cam = useCameraCapture(shallowRef(null));
        await cam.start();
        expect(cam.state.value).toBe("off");
        expect(cam.error.value).toBe("Camera access was denied.");
    });
});

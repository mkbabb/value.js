/**
 * X.W7.g3 · EY-23 — the eyedropper retains the image ONCE: the visible canvas
 * is the sampled canvas, and no native-resolution twin is minted beside it.
 *
 * jsdom has no image decoder and no 2D context, so both are stubbed at that
 * boundary; the canvases the sampler creates are counted at `createElement`.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { shallowRef } from "vue";
import { useImageSampler } from "../../workbenches/extract/ImageEyedropper/composables/useImageSampler";

afterEach(() => vi.restoreAllMocks());

describe("useImageSampler", () => {
    it("paints and samples one canvas — no offscreen twin", async () => {
        const canvas = document.createElement("canvas");
        const reads: HTMLCanvasElement[] = [];
        vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(function (
            this: HTMLCanvasElement,
        ) {
            const self = this;
            return {
                canvas: self,
                drawImage() {},
                getImageData() {
                    reads.push(self);
                    return { data: new Uint8ClampedArray([255, 0, 0, 255]) };
                },
            } as unknown as CanvasRenderingContext2D;
        } as never);
        vi.stubGlobal(
            "Image",
            class {
                naturalWidth = 4;
                naturalHeight = 3;
                onload: (() => void) | null = null;
                onerror: (() => void) | null = null;
                crossOrigin = "";
                set src(_: string) {
                    queueMicrotask(() => this.onload?.());
                }
            },
        );
        const created = vi.spyOn(document, "createElement");

        const sampler = useImageSampler({
            canvasRef: shallowRef(canvas),
            getTransform: () => ({ panX: 0, panY: 0, zoom: 1 }),
            colorSpace: () => "hex",
        });
        await sampler.loadImage("blob:x");

        expect(created.mock.calls.filter(([tag]) => tag === "canvas")).toHaveLength(0);
        expect(sampler.getImageCanvas()).toBe(canvas);
        expect(sampler.sampleAt(1, 1)?.hex).toBe("#ff0000");
        expect(reads).toEqual([canvas]);
        vi.unstubAllGlobals();
    });
});

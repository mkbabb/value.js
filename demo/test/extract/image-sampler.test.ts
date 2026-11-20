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

    it("color-40 N-4: the sample is the mean of the square the reticle frames, clamped to the photo", async () => {
        const canvas = document.createElement("canvas");
        const asked: number[][] = [];
        vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(function (
            this: HTMLCanvasElement,
        ) {
            const self = this;
            return {
                canvas: self,
                drawImage() {},
                // A noisy patch: black and white pixels alternate.
                getImageData(x: number, y: number, w: number, h: number) {
                    asked.push([x, y, w, h]);
                    const data = new Uint8ClampedArray(w * h * 4);
                    for (let i = 0; i < w * h; i++) {
                        const v = i % 2 === 0 ? 0 : 200;
                        data.set([v, v, v, 255], i * 4);
                    }
                    return { data };
                },
            } as unknown as CanvasRenderingContext2D;
        } as never);
        vi.stubGlobal(
            "Image",
            class {
                naturalWidth = 40;
                naturalHeight = 30;
                onload: (() => void) | null = null;
                onerror: (() => void) | null = null;
                crossOrigin = "";
                set src(_: string) {
                    queueMicrotask(() => this.onload?.());
                }
            },
        );
        const sampler = useImageSampler({
            canvasRef: shallowRef(canvas),
            getTransform: () => ({ panX: 0, panY: 0, zoom: 1 }),
            colorSpace: () => "hex",
        });
        await sampler.loadImage("blob:noisy");

        // A 4x4 reticle over alternating 0 / 200: the mean is 100, not either pixel.
        expect(sampler.sampleAt(20, 15, 4)?.hex).toBe("#646464");
        expect(asked.at(-1)).toEqual([18, 13, 4, 4]);
        // Past the photo's corner the square is clamped inside it.
        sampler.sampleAt(500, -50, 4);
        expect(asked.at(-1)).toEqual([37, 0, 3, 4]);
        vi.unstubAllGlobals();
    });
});

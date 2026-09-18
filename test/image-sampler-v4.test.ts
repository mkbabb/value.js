import { ref } from "vue";
import { describe, expect, it } from "vitest";
import {
    useImageSampler,
    type DisplayColorSpace,
} from "../demo/workbenches/extract/ImageEyedropper/composables/useImageSampler";

function sampler(space: DisplayColorSpace) {
    return useImageSampler({
        canvasRef: ref<HTMLCanvasElement | null>(null),
        getTransform: () => ({ panX: 0, panY: 0, zoom: 1 }),
        colorSpace: () => space,
    });
}

describe("image sampler Value 4 projection", () => {
    it("preserves hex and serializes CSS-native spaces through /css", () => {
        expect(sampler("hex").formatInColorSpace("#ff0000")).toBe("#ff0000");
        expect(sampler("rgb").formatInColorSpace("#ff0000")).toBe("rgb(255 0 0)");
        expect(sampler("oklch").formatInColorSpace("#ff0000")).toMatch(/^oklch\(/);
    });

    it("renders library-only spaces as data, not invented CSS", () => {
        expect(sampler("hsv").formatInColorSpace("#ff0000")).toBe("HSV 0 · 1 · 1");
    });

    it("surfaces an impossible generated-color parse failure", () => {
        expect(() => sampler("rgb").formatInColorSpace("not-a-color"))
            .toThrow("[ImageSampler] generated hex failed to parse: css_syntax");
    });
});

/**
 * X-DS pass 9 (V9C-06) · the image actions sit with the SOURCE (the image
 * column, under the drop zone / viewfinder), not after the extraction sliders.
 * The XW-8 / R-20 / V3C-05 contract the row carried in ExtractControls is kept
 * whole here, mounted on the real ExtractWorkbench SFC against real glass-ui,
 * with the session and the camera held as plain refs.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { mount } from "@vue/test-utils";

const state = vi.hoisted(() => ({
    preview: null as unknown,
    processing: null as unknown,
    camera: null as unknown,
}));

vi.mock("../../workbenches/extract/composables/useExtractSession", async () => {
    const { ref: r } = await import("vue");
    return {
        useExtractSession: () => {
            const previewUrl = r<string | null>(null);
            const isProcessing = r(false);
            state.preview = previewUrl;
            state.processing = isProcessing;
            return {
                previewUrl,
                isProcessing,
                lastFile: r(null),
                colorCount: r(5),
                foundCount: r(null),
                chromaWeight: r(0.5),
                kSliderGradient: r(null),
                quantizeError: r(null),
                extractedPalette: r(null),
                barren: r(false),
                dominant: r(null),
                dominantShare: r(0),
                eyedropperOpen: r(false),
                onFile: vi.fn(),
                onKChange: vi.fn(),
                onChromaChange: vi.fn(),
                onReset: vi.fn(),
                onSave: vi.fn(),
                onRename: vi.fn(),
                release: vi.fn(),
            };
        },
    };
});

vi.mock("../../workbenches/extract/composables/useCameraCapture", async () => {
    const { ref: r } = await import("vue");
    return {
        useCameraCapture: () => {
            const camState = r<"off" | "opening" | "live">("off");
            state.camera = camState;
            return {
                state: camState,
                stream: r(null),
                error: r(null),
                start: vi.fn(async () => void (camState.value = "live")),
                stop: vi.fn(() => void (camState.value = "off")),
                capture: vi.fn(async () => null),
            };
        },
    };
});

import ExtractWorkbench from "../../workbenches/extract/ExtractWorkbench.vue";

type R<T> = ReturnType<typeof ref<T>>;

// A full workbench mount: an explicit 30 s timeout for shared, loaded hosts (D59).
describe("ExtractWorkbench · the image actions sit with the source", { timeout: 30_000 }, () => {
    beforeEach(() => {
        vi.stubGlobal(
            "ResizeObserver",
            class {
                observe() {}
                unobserve() {}
                disconnect() {}
            },
        );
    });
    afterEach(() => vi.unstubAllGlobals());

    const mountIt = () =>
        mount(ExtractWorkbench, {
            global: { stubs: { ImageEyedropper: true, PaletteInspector: true } },
        });
    const actions = (w: ReturnType<typeof mountIt>) =>
        w.findAll('[role="group"][aria-label="Image actions"] button');
    const action = (w: ReturnType<typeof mountIt>, name: string) => {
        const b = actions(w).find((x) => x.text().trim() === name);
        if (!b) throw new Error(`no "${name}" action`);
        return b;
    };

    it("V9C-06: the row lives in the image column, before the extraction controls", () => {
        const w = mountIt();
        const group = w.get('[role="group"][aria-label="Image actions"]').element;
        const zone = w.get('[aria-label="Upload image"]').element;
        const slider = w.get('[role="slider"]').element;
        // The zone and the row share the image column; the sliders follow both.
        expect(group.parentElement).toBe(zone.parentElement);
        expect(zone.compareDocumentPosition(group) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(group.compareDocumentPosition(slider) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it("R-20 / V3C-05: with no image the drop zone is the one intake; only the camera action shows", () => {
        expect(actions(mountIt()).map((b) => b.text().trim())).toEqual(["Open camera"]);
    });

    it("XW-8: a run in flight stands every image action down", async () => {
        const w = mountIt();
        (state.preview as R<string | null>).value = "blob:test/1";
        (state.processing as R<boolean>).value = true;
        await w.vm.$nextTick();
        expect(actions(w).map((b) => [b.text().trim(), b.attributes("disabled") !== undefined])).toEqual([
            ["Replace image", true],
            ["Open camera", true],
            ["Reset", true],
        ]);
    });

    it("XW-8: while the camera is live its control is the way out (pressed), and the rest stand down", async () => {
        const w = mountIt();
        (state.preview as R<string | null>).value = "blob:test/1";
        (state.camera as R<string>).value = "live";
        await w.vm.$nextTick();
        const camera = action(w, "Close camera");
        expect(camera.attributes("aria-pressed")).toBe("true");
        expect(camera.attributes("disabled")).toBeUndefined();
        expect(action(w, "Replace image").attributes("disabled")).toBeDefined();
    });
});

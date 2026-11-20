/**
 * X-DS pass 9 (V9C-06) · the image actions sit with the SOURCE (the image
 * column, under the drop zone), not after the extraction sliders. Mounted on
 * the real ExtractWorkbench SFC against real glass-ui, with the session held
 * as plain refs.
 *
 * color-40 I-1 (his FORTIETH order: "remove the extra open camera button on
 * extract") rewrote the contract: the in-page camera is gone, so with no image
 * the zone is the one intake and the row is absent; with one, the row is
 * exactly Replace image and Reset.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { mount } from "@vue/test-utils";

const state = vi.hoisted(() => ({
    preview: null as unknown,
    processing: null as unknown,
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

    it("V9C-06: the row lives in the image column, before the extraction controls", async () => {
        const w = mountIt();
        (state.preview as R<string | null>).value = "blob:test/1";
        await w.vm.$nextTick();
        const group = w.get('[role="group"][aria-label="Image actions"]').element;
        const zone = w.get('[aria-label="Sample colors from the image"]').element;
        const slider = w.get('[role="slider"]').element;
        // The zone and the row share the image column; the sliders follow both.
        expect(group.parentElement).toBe(zone.parentElement);
        expect(zone.compareDocumentPosition(group) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(group.compareDocumentPosition(slider) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it("I-1 / R-20: with no image the drop zone is the one intake; there is no action row", () => {
        const w = mountIt();
        expect(w.find('[role="group"][aria-label="Image actions"]').exists()).toBe(false);
        expect(w.find('[aria-label="Upload image"]').exists()).toBe(true);
    });

    it("I-1: with an image the row is exactly Replace image and Reset, and no camera anywhere", async () => {
        const w = mountIt();
        (state.preview as R<string | null>).value = "blob:test/1";
        await w.vm.$nextTick();
        expect(actions(w).map((b) => b.text().trim())).toEqual(["Replace image", "Reset"]);
        expect(w.findAll("button").filter((b) => /camera/i.test(b.text() + (b.attributes("aria-label") ?? "")))).toEqual([]);
        expect(w.find("video").exists()).toBe(false);
    });

    it("XW-8: a run in flight stands every image action down", async () => {
        const w = mountIt();
        (state.preview as R<string | null>).value = "blob:test/1";
        (state.processing as R<boolean>).value = true;
        await w.vm.$nextTick();
        expect(actions(w).map((b) => [b.text().trim(), b.attributes("disabled") !== undefined])).toEqual([
            ["Replace image", true],
            ["Reset", true],
        ]);
        expect(action(w, "Reset").attributes("disabled")).toBeDefined();
    });
});

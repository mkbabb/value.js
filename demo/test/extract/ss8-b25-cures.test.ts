/**
 * SS-8 B25-extract-inputs — cures and the falsifiers that hold them.
 *
 * Packet: `docs/tranches/X/execution/SS8/packets/B25-extract-inputs.md`.
 *
 *   · SS8-0705 (EC-16 · L-22): Generate's count row carries the O-18 hook its
 *     Extract twin carries, so the contrast census can read (and fail on) it.
 *   · SS8-0713 (U-7): `.dashed-well`'s dashed edge is the drop zone's only
 *     boundary; it reads the certified plate rung `--ink-muted` (≥ the text
 *     floor, so ≥ 3:1), never the 12 % `--card-edge` hairline (1.47 / 1.71).
 *   · SS8-0722 (EY-8 ≡ XP-9): the eyedropper is glass's modal dialog — role,
 *     aria-modal, a name, and the content behind it hidden from AT.
 *   · SS8-0715 (EY-15's bound): the stage is teleported out of the workbench
 *     root and sized to the viewport, never to the root's height.
 *   · SS8-0721 (EY-20): a zoom while pinned re-projects the loupe onto the
 *     image point it was pinned on.
 *   · Escape is the layer's: a pinned Escape releases the pin, the next closes.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineComponent, h, nextTick, ref } from "vue";
import { flushPromises, mount } from "@vue/test-utils";
import { LOUPE_SIZE } from "../../workbenches/extract/ImageEyedropper/constants";

const DEMO = resolve(import.meta.dirname, "../..");

// ── The eyedropper's two engines, replaced at their imports: jsdom has no
// canvas or pointer pipeline. The gesture hands the test its tap and its
// transform; the sampler maps viewport → image through that same transform.
const stage = vi.hoisted(() => ({
    onTap: null as null | ((rx: number, ry: number) => void),
    panX: null as null | { value: number },
    panY: null as null | { value: number },
    zoom: null as null | { value: number },
}));

vi.mock("../../workbenches/extract/ImageEyedropper/composables/useInertiaGesture", async () => {
    const { ref } = await import("vue");
    return {
        useInertiaGesture: (_el: unknown, opts: { onTap?: (rx: number, ry: number) => void }) => {
            const panX = ref(0);
            const panY = ref(0);
            const zoom = ref(1);
            Object.assign(stage, { onTap: opts.onTap ?? null, panX, panY, zoom });
            return { panX, panY, zoom, gestureActive: ref(false), fitToViewport: () => {}, clientToViewport: () => ({ rx: 0, ry: 0 }) };
        },
    };
});

vi.mock("../../workbenches/extract/ImageEyedropper/composables/useImageSampler", async () => {
    const { ref } = await import("vue");
    return {
        useImageSampler: (deps: { getTransform: () => { panX: number; panY: number; zoom: number } }) => {
            const viewportToImage = (rx: number, ry: number) => {
                const { panX, panY, zoom } = deps.getTransform();
                return { ix: Math.floor((rx - panX) / zoom), iy: Math.floor((ry - panY) / zoom) };
            };
            return {
                imgWidth: ref(1600),
                imgHeight: ref(1000),
                imageLoaded: ref(true),
                loadImage: async () => {},
                dispose: () => {},
                getImageCanvas: () => null,
                viewportToImage,
                sampleAt: () => ({ hex: "#d99a8e", formatted: "#d99a8e" }),
            };
        },
    };
});

afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
});

async function openEyedropper() {
    const { default: ImageEyedropper } = await import(
        "../../workbenches/extract/ImageEyedropper/ImageEyedropper.vue"
    );
    const host = defineComponent({
        setup(_, { expose }) {
            const closes = ref(0);
            expose({ closes });
            return () =>
                h("div", { id: "workbench-root", class: "relative" }, [
                    h("button", { id: "behind" }, "Upload"),
                    h(ImageEyedropper, { imageUrl: "blob:x", onClose: () => closes.value++ }),
                ]);
        },
    });
    const wrapper = mount(host, { attachTo: document.body });
    await flushPromises();
    await nextTick();
    const content = document.querySelector<HTMLElement>('[data-slot="dialog-content"]');
    return { wrapper, content, closes: (wrapper.vm as unknown as { closes: number }).closes };
}

function loupeCentre(): { x: number; y: number } | null {
    const loupe = document.querySelector<HTMLElement>(".loupe");
    if (!loupe) return null;
    return {
        x: parseFloat(loupe.style.left) + LOUPE_SIZE / 2,
        y: parseFloat(loupe.style.top) + LOUPE_SIZE / 2,
    };
}

function escape() {
    const target = document.activeElement ?? document.body;
    target.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }));
}

describe("SS8-0722 · the eyedropper is a modal dialog", () => {
    it("role=dialog, aria-modal, named; the workbench behind it is hidden from AT", async () => {
        const { wrapper, content } = await openEyedropper();
        expect(content, "a dialog content mounted").not.toBeNull();
        expect(content!.getAttribute("role")).toBe("dialog");
        expect(content!.getAttribute("aria-modal")).toBe("true");
        const labelledBy = content!.getAttribute("aria-labelledby");
        expect(labelledBy && document.getElementById(labelledBy)?.textContent).toBe("Eyedropper");
        const behind = document.getElementById("workbench-root")!;
        expect(behind.closest("[aria-hidden='true']"), "the content behind is hidden").not.toBeNull();
        expect(content!.contains(document.activeElement), "focus enters the dialog").toBe(true);
        wrapper.unmount();
    });
});

describe("SS8-0715 · the stage is bounded by the viewport, not the workbench root", () => {
    it("teleported out of the root, fixed, its box sized in viewport units", async () => {
        const { wrapper, content } = await openEyedropper();
        expect(content).not.toBeNull();
        expect(document.getElementById("workbench-root")!.contains(content), "not inside the root").toBe(false);
        const cls = [...content!.classList];
        expect(cls).toContain("fixed");
        expect(cls.some((c) => /^h-\[min\(100dvh/.test(c)), cls.join(" ")).toBe(true);
        expect(cls.some((c) => /^w-\[min\(100vw/.test(c)), cls.join(" ")).toBe(true);
        expect(cls).not.toContain("inset-0");
        wrapper.unmount();
    });
});

describe("SS8-0721 (EY-20) · the pinned loupe follows its pixel through a zoom", () => {
    it("re-projects the loupe onto the pinned image point after the transform moves", async () => {
        const { wrapper } = await openEyedropper();
        stage.onTap!(100, 80);
        await nextTick();
        expect(loupeCentre()).toEqual({ x: 100, y: 80 });
        // A wheel zoom about some other point: zoom ×2, pan shifts.
        stage.zoom!.value = 2;
        stage.panX!.value = -40;
        stage.panY!.value = -10;
        await nextTick();
        // The pinned image point (100, 80) now sits at pan + point × zoom.
        expect(loupeCentre()).toEqual({ x: -40 + 100 * 2, y: -10 + 80 * 2 });
        wrapper.unmount();
    });
});

describe("Escape is the dialog layer's", () => {
    it("a pinned Escape releases the pin and keeps the dialog; the next closes it", async () => {
        const { wrapper } = await openEyedropper();
        const vm = wrapper.vm as unknown as { closes: number };
        stage.onTap!(100, 80);
        await nextTick();
        expect(document.querySelector(".loupe-pinned")).not.toBeNull();
        escape();
        await nextTick();
        expect(document.querySelector(".loupe")).toBeNull();
        expect(vm.closes).toBe(0);
        escape();
        await nextTick();
        expect(vm.closes).toBe(1);
        wrapper.unmount();
    });
});

describe("SS8-0705 (EC-16) · Generate's count row carries its O-18 hook", () => {
    it("the census can find the count RANGE", async () => {
        // jsdom ships no `ResizeObserver` (the glass slider measures itself).
        vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
        const { default: GenerateControls } = await import("../../workbenches/generate/GenerateControls.vue");
        const w = mount(GenerateControls);
        expect(w.find('[data-o18="generate-count"] .slider-range').exists()).toBe(true);
        expect(w.find('[data-o18="generate-count"] [aria-label="Number of colors"]').exists()).toBe(true);
        w.unmount();
    });
});

describe("SS8-0713 (U-7) · the dashed well's edge is certified ink", () => {
    it(".dashed-well paints its dashed edge in --ink-muted, not the --card-edge hairline", () => {
        const css = readFileSync(resolve(DEMO, "styles/utils.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
        const rule = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].find(
            (m) => m[1]!.split(",").map((s) => s.trim()).includes(".dashed-well") && /border\s*:/.test(m[2]!),
        );
        expect(rule, "a .dashed-well rule with a border").toBeDefined();
        const border = rule![2]!.match(/(?:^|;)\s*border\s*:\s*([^;]+)/)![1]!.trim();
        expect(border).toMatch(/dashed/);
        expect(border).toMatch(/var\(--ink-muted\)/);
        expect(border).not.toMatch(/--card-edge/);
    });
});

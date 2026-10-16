/**
 * X.W7.g3 · ExtractControls — EC-9 (the k readout), EC-25 (the empty rail),
 * and the camera cluster's disabled contract (XW-8), mounted on the real SFC
 * against real glass-ui.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ExtractControls from "../../workbenches/extract/ExtractControls.vue";

const base = { k: 16, chromaWeight: 0.5, gradient: null } as const;

describe("ExtractControls", () => {
    // jsdom ships no `ResizeObserver` (the glass controls measure themselves).
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

    it("EC-9: the readout says what came back when it is not what was asked", () => {
        const w = mount(ExtractControls, { props: { ...base, found: 10 } });
        const readout = w.get("[data-extract-k-readout]");
        expect(readout.text()).toBe("10/16");
        expect(readout.attributes("title")).toBe("10 colors found of 16 requested");
    });

    it("EC-9: an exact result (or no result yet) reads the request alone", () => {
        expect(mount(ExtractControls, { props: { ...base, found: 16 } }).get("[data-extract-k-readout]").text()).toBe("16");
        expect(mount(ExtractControls, { props: { ...base, found: null } }).get("[data-extract-k-readout]").text()).toBe("16");
    });

    // X-DS pass 3 (V3C-04): with nothing developed there is no rail. K is a
    // scalar on glass's range variant (the app's one scalar register); the
    // 24px rail mounts only to carry the developed ramp.
    it("EC-25 / V3C-04: with nothing developed no rail is painted; K is a range scalar", () => {
        const w = mount(ExtractControls, { props: { ...base, found: null } });
        expect(w.find('[data-o18="extract-k-rail"]').exists()).toBe(false);
        expect(w.find('[data-o18="extract-k"] .slider-range').exists()).toBe(true);
    });

    it("EC-25: a developed rail rides the gradient as an IMAGE layer over the ink", () => {
        const gradient = "linear-gradient(to right, red 0% 50%, blue 50% 100%)";
        const rail = mount(ExtractControls, { props: { ...base, gradient, found: 2 } }).get('[data-o18="extract-k-rail"]');
        expect((rail.element as HTMLElement).style.backgroundImage).toContain("linear-gradient");
        const style = rail.attributes("style") ?? "";
        expect(style).not.toContain("var(--muted)");
        expect(style).toMatch(/background-color/);
    });

    // X-DS pass 9 (V9C-06): the image actions moved to the image column
    // (ExtractWorkbench; their contract is extract-image-actions.test.ts). The
    // controls keep XW-8 for their own two sliders.
    it("XW-8: `disabled` reaches both sliders", () => {
        const w = mount(ExtractControls, { props: { ...base, found: null, disabled: true } });
        const sliders = w.findAll('[role="slider"]');
        expect(sliders).toHaveLength(2);
        for (const s of sliders) expect(s.attributes("data-disabled") ?? s.attributes("aria-disabled")).toBeDefined();
        expect(w.find('[role="group"][aria-label="Image actions"]').exists()).toBe(false);
    });

    it("XW-8: while the camera is live the sliders stand down", () => {
        const w = mount(ExtractControls, { props: { ...base, found: null, cameraLive: true } });
        for (const s of w.findAll('[role="slider"]')) expect(s.attributes("data-disabled") ?? s.attributes("aria-disabled")).toBeDefined();
    });
});

/**
 * X.W7.g3 · ExtractControls — EC-9 (the k readout), EC-25 (the empty rail),
 * and the camera cluster's disabled contract (XW-8), mounted on the real SFC
 * against real glass-ui.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ExtractControls from "../../workbenches/extract/ExtractControls.vue";

const base = { k: 16, chromaWeight: 0.5, gradient: null, hasImage: true } as const;

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

    it("EC-25: the empty rail paints only the certified track ink — no colour token rides the gradient slot", () => {
        const rail = mount(ExtractControls, { props: { ...base, found: null } }).get('[data-o18="extract-k-rail"]');
        const style = rail.attributes("style") ?? "";
        expect(style).not.toContain("var(--muted)");
        expect(style).not.toMatch(/background:/);
        expect(style).not.toMatch(/background-image/);
        expect(style).toMatch(/background-color/);
    });

    it("EC-25: a developed rail rides the gradient as an IMAGE layer over the ink", () => {
        const gradient = "linear-gradient(to right, red 0% 50%, blue 50% 100%)";
        const rail = mount(ExtractControls, { props: { ...base, gradient, found: 2 } }).get('[data-o18="extract-k-rail"]');
        expect((rail.element as HTMLElement).style.backgroundImage).toContain("linear-gradient");
    });

    it("XW-8: `disabled` reaches all five controls", () => {
        const w = mount(ExtractControls, { props: { ...base, found: null, disabled: true } });
        const buttons = w.findAll("button").filter((b) => b.attributes("title"));
        expect(buttons.map((b) => [b.attributes("title"), b.attributes("disabled") !== undefined])).toEqual([
            ["Replace image", true],
            ["Open camera", true],
            ["Reset", true],
        ]);
        const sliders = w.findAll('[role="slider"]');
        expect(sliders).toHaveLength(2);
        for (const s of sliders) expect(s.attributes("data-disabled") ?? s.attributes("aria-disabled")).toBeDefined();
    });

    it("XW-8: while the camera is live its control is the way out (pressed), and the rest stand down", () => {
        const w = mount(ExtractControls, { props: { ...base, found: null, cameraLive: true } });
        const camera = w.get('button[title="Close camera"]');
        expect(camera.attributes("aria-pressed")).toBe("true");
        expect(camera.attributes("disabled")).toBeUndefined();
        expect(w.get('button[title="Replace image"]').attributes("disabled")).toBeDefined();
    });

    it("R-20: with no image the drop zone is the one intake; the toolbar control is present but stands down", () => {
        const w = mount(ExtractControls, { props: { ...base, hasImage: false, found: null } });
        expect(w.get('button[title="Upload image"]').attributes("disabled")).toBeDefined();
    });
});

/**
 * The generate count control — X-DS pass 8 (V3C-05) RE-AIM, named.
 *
 * EC-10's twin (X.W7.z2) locked a content-as-track rail under Generate's
 * "Colors" slider: the generated swatches painted as hard bands, with a
 * `var(--muted)` empty arm. V3C-05 retired that rail: the same quantity was set
 * by two controls on sibling routes (the swatch rail here, glass's thumbless
 * scrubber on Extract), and the rail's thumb sat mid-segment rather than on a
 * count. The swatches already show on the plate above, so the count is glass's
 * scrubber at the `sm` rung, Extract's idle register. The hard-band builder
 * itself (`paletteRail`) still serves Extract's developed rail and keeps its
 * own lock (color-session/palette-rail.test.ts).
 *
 * The composable is replaced at its import so the palette is the test's own
 * (the real one is seeded from `Math.random` and never empty).
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { mount } from "@vue/test-utils";

const gen = vi.hoisted(() => ({ palette: [] as string[] }));

vi.mock("../../workbenches/generate/composables/useColorGeneration", () => ({
    useColorGeneration: () => ({
        preset: ref("vibrant"),
        harmony: ref("golden"),
        count: ref(gen.palette.length || 1),
        seed: ref(1),
        palette: ref(gen.palette),
        regenerate: () => {},
    }),
}));

async function mountControls(palette: string[]) {
    gen.palette = palette;
    const { default: GenerateControls } = await import(
        "../../workbenches/generate/GenerateControls.vue"
    );
    return mount(GenerateControls);
}

describe("GenerateControls count control", () => {
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

    it("V3C-05: Colors is glass's scrubber at the sm rung, with no content-as-track rail", async () => {
        const wrapper = await mountControls([
            "rgb(255, 0, 0)",
            "rgb(0, 0, 255)",
            "rgb(0, 128, 0)",
        ]);
        expect(wrapper.find("[data-generate-count-rail]").exists()).toBe(false);
        const slider = wrapper.get('[data-slot="slider"]');
        expect(slider.attributes("data-variant")).toBe("scrubber");
        expect(slider.attributes("data-size")).toBe("sm");
        // No painted track: the slider carries no gradient of the palette.
        expect(slider.attributes("style") ?? "").not.toContain("gradient");
    }, 30_000);
});

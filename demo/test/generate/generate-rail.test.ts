/**
 * X.W7.z2 · EC-10's twin (fold W7.543) — the generate count rail.
 *
 * The cure lock moves this rail with extract's k rail in one step: the same
 * hard-band builder (`paletteRail`), while the EMPTY arm stays generate's own.
 * Generate paints `var(--muted)` for no palette (a colour the capsule shows);
 * extract returns `null`. The two arms are not equivalent and stay that way.
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

async function railBackground(palette: string[]): Promise<string> {
    gen.palette = palette;
    const { default: GenerateControls } = await import(
        "../../workbenches/generate/GenerateControls.vue"
    );
    const rail = mount(GenerateControls).get("[data-generate-count-rail]");
    return (rail.element as HTMLElement).getAttribute("style") ?? "";
}

describe("GenerateControls count rail", () => {
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

    it("EC-10: the generated ramp is hard bands — one equal band per colour", async () => {
        const style = await railBackground(["rgb(255, 0, 0)", "rgb(0, 0, 255)", "rgb(0, 128, 0)"]);
        expect(style).toContain(
            "linear-gradient(to right, rgb(255, 0, 0) 0% 33.3333%, rgb(0, 0, 255) 33.3333% 66.6667%, rgb(0, 128, 0) 66.6667% 100%)",
        );
    });

    it("EC-10: the empty arm stays generate's own — it paints var(--muted), unlike extract's null", async () => {
        const style = await railBackground([]);
        expect(style).toContain("var(--muted)");
        expect(style).not.toContain("gradient");
    });
});

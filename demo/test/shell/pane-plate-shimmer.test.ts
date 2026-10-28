/**
 * OD19 repair 1 (C1-V-01 · owner OD19-V6, "skeleton shimmer") — the pane
 * loading plate's two bars are glass's shimmering Skeleton.
 *
 * glass 10.1.1 ships `<Skeleton shimmer>` (the O-102 V6 sub-row). The plate
 * passes it on both bars; no local sheen is drawn.
 */
import { describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import PaneLoadingPlate from "../../shell/PaneLoadingPlate.vue";

describe("OD19-V6 — the loading plate's bars shimmer", () => {
    it("both Skeleton bars carry glass's shimmer state", async () => {
        const w = mount(PaneLoadingPlate, { attachTo: document.body });
        for (let i = 0; i < 20 && w.findAll('[data-slot="skeleton"]').length < 2; i++) {
            await flushPromises();
            await new Promise((r) => setTimeout(r, 10));
        }
        const bars = w.findAll('[data-slot="skeleton"]');
        expect(bars).toHaveLength(2);
        for (const bar of bars) expect(bar.attributes("data-shimmer")).toBe("true");
        expect(w.text()).toBe("");
        w.unmount();
    });
});

/**
 * color-40 L-5: a list of 120 swatches carries a small pool of wet-edge
 * filters, not one per dot (121 dots carried 123 filter graphs on production,
 * and their mount cost 10 to 12 long frames on a desk). Mounted for real.
 */
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import { WatercolorDot } from "../../shared/ui/watercolor-dot";
import { POOL_HOST_ID, POOL_SIZE } from "../../shared/ui/watercolor-dot/filterPool";

const List = defineComponent({
    props: { n: { type: Number, required: true } },
    setup: (p) => () =>
        h(
            "div",
            Array.from({ length: p.n }, (_, i) => h(WatercolorDot, { color: `oklch(60% 0.1 ${i * 3})`, seed: `s${i}` })),
        ),
});

describe("the wet-edge pool", () => {
    afterEach(() => document.getElementById(POOL_HOST_ID)?.remove());

    it("120 dots mount ten filters or fewer, and each dot names one of them", () => {
        const w = mount(List, { props: { n: 120 }, attachTo: document.body });
        const filters = document.querySelectorAll("filter");
        expect(filters.length).toBeLessThanOrEqual(10);
        expect(filters.length).toBe(POOL_SIZE);
        const ids = new Set([...filters].map((f) => f.id));
        const used = w.findAll(".watercolor-swatch").map((d) => (d.element as HTMLElement).style.getPropertyValue("--watercolor-filter"));
        expect(used).toHaveLength(120);
        for (const u of used) expect(ids.has(u.replace(/^url\(#(.+)\)$/, "$1"))).toBe(true);
        // Neighbours are not all one edge.
        expect(new Set(used).size).toBeGreaterThan(4);
        w.unmount();
    });

    it("a second list finds the pool rather than mounting another", () => {
        const a = mount(List, { props: { n: 3 }, attachTo: document.body });
        const b = mount(List, { props: { n: 3 }, attachTo: document.body });
        expect(document.querySelectorAll(`#${POOL_HOST_ID}`)).toHaveLength(1);
        a.unmount();
        b.unmount();
    });
});

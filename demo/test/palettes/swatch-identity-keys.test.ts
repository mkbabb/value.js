/**
 * X.W7.c — fold N-5 (identity keys), the `useSwatchActions` site.
 *
 * Falsifier form (fold §Gates N-5): remove a NON-TAIL swatch and assert every
 * survivor's DOM node is the identical object — an index-bearing key re-mints
 * each survivor after the cut, and Vue replaces nodes that did not change.
 */
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, ref } from "vue";
import { useSwatchActions } from "../../palettes/browser/card/composables/useSwatchActions";

function harness(initial: string[]) {
    const colors = ref(initial);
    const Host = defineComponent({
        setup() {
            const { swatches } = useSwatchActions({
                savedColorStrings: colors,
                cssColorOpaque: ref("#000000"),
                emit: () => {},
            });
            return () =>
                h(
                    "ul",
                    swatches.value.map(({ color, key }) => h("li", { key, "data-color": color }, color)),
                );
        },
    });
    return { colors, wrapper: mount(Host) };
}

const nodes = (w: ReturnType<typeof mount>) =>
    new Map(w.findAll("li").map((li) => [li.attributes("data-color")!, li.element]));

describe("N-5 · useSwatchActions keys are identities, not indices", () => {
    it("a non-tail removal keeps every survivor's DOM node", async () => {
        const { colors, wrapper } = harness(["#111111", "#222222", "#333333", "#444444"]);
        const before = nodes(wrapper);
        colors.value = ["#111111", "#333333", "#444444"];
        await nextTick();
        const after = nodes(wrapper);
        for (const c of ["#111111", "#333333", "#444444"]) expect(after.get(c)).toBe(before.get(c));
        wrapper.unmount();
    });

    it("a reorder moves nodes rather than re-minting them", async () => {
        const { colors, wrapper } = harness(["#111111", "#222222", "#333333"]);
        const before = nodes(wrapper);
        colors.value = ["#333333", "#111111", "#222222"];
        await nextTick();
        const after = nodes(wrapper);
        for (const c of colors.value) expect(after.get(c)).toBe(before.get(c));
        wrapper.unmount();
    });

    it("repeated colours pair in order, and a new colour mints a new node", async () => {
        const { colors, wrapper } = harness(["#111111", "#111111", "#222222"]);
        const [first, second] = wrapper.findAll("li").map((li) => li.element);
        colors.value = ["#111111", "#222222", "#111111", "#999999"];
        await nextTick();
        const lis = wrapper.findAll("li").map((li) => li.element);
        expect(lis[0]).toBe(first);
        expect(lis[2]).toBe(second);
        expect(lis[3]!.textContent).toBe("#999999");
        wrapper.unmount();
    });
});

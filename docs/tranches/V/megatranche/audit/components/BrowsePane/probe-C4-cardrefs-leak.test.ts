// CHALLENGE-C probe C-4 — the `cardRefs` registry is write-only.
//
// BrowsePane.vue:94   :ref="(el: any) => el && (cardRefs[palette.slug] = el)"
// BrowsePane.vue:209  const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
//
// Vue calls a FUNCTION ref with `null` on unmount (runtime-core `setRef(ref, null, …)`).
// The `el &&` short-circuit swallows that call, so no key is ever deleted. The
// pane is inside a `<KeepAlive :max="6">` (App.vue:107) so it is not unmounted
// on view switches either — the map grows for the whole session and every entry
// pins a dead component instance.
//
// This probe reproduces the exact idiom (same expression, same reactive()
// container) with a stand-in card, and asserts the two consequences:
//   (a) the key survives unmount  → unbounded growth / retained instances
//   (b) the retained proxy is an UNMOUNTED instance whose exposed method is a
//       no-op on the DOM → feedback is silently swallowed.

import { describe, it, expect } from "vitest";
import { defineComponent, h, reactive, ref, nextTick } from "vue";
import { mount } from "@vue/test-utils";

const Card = defineComponent({
    props: { slug: { type: String, required: true } },
    setup(props, { expose }) {
        const msg = ref("");
        expose({ showFeedback: (m: string) => (msg.value = m) });
        return () => h("article", { "data-slug": props.slug }, msg.value);
    },
});

describe("C-4 · cardRefs never releases", () => {
    it("keeps every slug ever rendered and pins unmounted instances", async () => {
        const list = ref(["a", "b", "c"]);
        // verbatim from BrowsePane.vue:209
        const cardRefs = reactive<Record<string, any>>({});

        const Host = defineComponent({
            setup: () => () =>
                list.value.map((slug) =>
                    h(Card, {
                        slug,
                        key: slug,
                        // verbatim from BrowsePane.vue:94
                        ref: (el: any) => el && (cardRefs[slug] = el),
                    }),
                ),
        });

        const w = mount(Host);
        expect(Object.keys(cardRefs).sort()).toEqual(["a", "b", "c"]);

        // the user types a search — the wall re-renders with a different set
        list.value = ["d"];
        await nextTick();

        // (a) the registry NEVER shrinks
        expect(Object.keys(cardRefs).sort()).toEqual(["a", "b", "c", "d"]);
        expect(w.findAll("article").length).toBe(1); // only ONE card is live

        // (b) the retained entries are dead instances
        expect(cardRefs.a.$.isUnmounted).toBe(true);
        cardRefs.a.showFeedback("Saved!"); // no throw, no DOM, silently lost
        await nextTick();
        expect(w.html()).not.toContain("Saved!");

        // 3 pages of the commons later …
        for (let p = 0; p < 3; p++) {
            list.value = Array.from({ length: 50 }, (_, i) => `page${p}-${i}`);
            await nextTick();
        }
        expect(Object.keys(cardRefs).length).toBe(154); // 3 + 1 + 150, none released
        w.unmount();
        // and even after the pane unmounts the map still holds them (it is a
        // module-level-lifetime object inside a KeepAlive'd setup scope):
        expect(Object.keys(cardRefs).length).toBe(154);
    });

    it("control: the same idiom WITH the null branch releases correctly", async () => {
        const list = ref(["a", "b"]);
        const cardRefs = reactive<Record<string, any>>({});
        const Host = defineComponent({
            setup: () => () =>
                list.value.map((slug) =>
                    h(Card, {
                        slug,
                        key: slug,
                        ref: (el: any) => {
                            if (el) cardRefs[slug] = el;
                            else delete cardRefs[slug];
                        },
                    }),
                ),
        });
        mount(Host);
        expect(Object.keys(cardRefs).sort()).toEqual(["a", "b"]);
        list.value = ["b"];
        await nextTick();
        expect(Object.keys(cardRefs).sort()).toEqual(["b"]); // released
    });
});

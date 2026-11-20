/**
 * color-40 L-6: a list of swatches mounts no popover panel until a swatch is
 * hovered, focused or pressed (on a 4x phone the 558 ms frame of a 120-swatch
 * list was the mount of 120 Popover, Button and dot trees). Mounted for real
 * against glass's Popover.
 */
import { describe, expect, it } from "vitest";
import { defineComponent, h, ref } from "vue";
import { mount } from "@vue/test-utils";
import SwatchHoverMenu from "../../shared/ui/SwatchHoverMenu.vue";

const List = defineComponent({
    setup: () => {
        const open = ref<number | null>(null);
        return () =>
            h(
                "div",
                Array.from({ length: 120 }, (_, i) =>
                    h(SwatchHoverMenu, {
                        color: `oklch(60% 0.1 ${i * 3})`,
                        open: open.value === i,
                        "onUpdate:open": (v: boolean) => (open.value = v ? i : null),
                    }),
                ),
            );
    },
});

const panels = (w: ReturnType<typeof mount>) => w.findAllComponents({ name: "PopoverContent" }).length;

describe("SwatchHoverMenu's panel mounts on first use", () => {
    it("120 untouched swatches mount no panel", () => {
        const w = mount(List, { attachTo: document.body });
        expect(w.findAll(".swatch-button")).toHaveLength(120);
        expect(panels(w)).toBe(0);
        w.unmount();
    });

    for (const [how, event] of [
        ["hover", "pointerenter"],
        ["focus", "focusin"],
        ["press", "pointerdown"],
    ] as const) {
        it(`a ${how} mounts that swatch's panel, and only that one, on the same button`, async () => {
            const w = mount(List, { attachTo: document.body });
            const before = w.findAll(".swatch-button")[3]!.element;
            await w.findAll("[data-engaged], .relative.flex")[3]!.trigger(event);
            expect(panels(w)).toBe(1);
            expect(w.findAll(".swatch-button")[3]!.element).toBe(before);
            w.unmount();
        });
    }
});

// SERVED MODEL: claude-opus-5-5
//
// X.W12U.m — two contracts this unit introduced, read against the REAL
// installed glass-ui:
//   A2-VA-L2-11 · `usePanePopups`: a kept-alive pane's popup closes when the
//     pane deactivates (the route change), and stays closed on re-activation.
//   A2-VA-L2-6 (value half, A2-VA-X-9) · the scene action seat is a glass
//     DockControl: an inoperable seat stays a FOCUSABLE button that says
//     `aria-disabled="true"` and does not emit its action (the D4 oracle's
//     three claims, `e2e/smoke/scene-action-contract.spec.ts:186-192`).
import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h, KeepAlive, nextTick, ref } from "vue";
import { Copy } from "@lucide/vue";

import { usePanePopups } from "../../shell/usePanePopups";
import ActionButton from "../../shell/dock/ActionButton.vue";

describe("A2-VA-L2-11 · usePanePopups", () => {
    it("closes the open popup when its kept-alive pane deactivates", async () => {
        let popups!: ReturnType<typeof usePanePopups>;
        const Pane = defineComponent({
            setup() {
                popups = usePanePopups();
                return () => h("div", { "data-open": String(popups.bind("type").open) });
            },
        });
        const Other = defineComponent({ render: () => h("p", "other") });
        const which = ref<"pane" | "other">("pane");
        const host = mount(
            defineComponent({ render: () => h(KeepAlive, null, [h(which.value === "pane" ? Pane : Other, { key: which.value })]) }),
        );

        popups.bind("type")["onUpdate:open"](true);
        await nextTick();
        expect(host.find("[data-open]").attributes("data-open")).toBe("true");
        expect(popups.bind("sort").open).toBe(false);

        which.value = "other"; // the route change: the pane is deactivated, not unmounted
        await flushPromises();
        which.value = "pane";
        await flushPromises();
        expect(host.find("[data-open]").attributes("data-open")).toBe("false");
        host.unmount();
    });
});

describe("A2-VA-L2-6 · the scene action seat is a DockControl", () => {
    const props = { icon: Copy, open: false, title: "Copy colors (unavailable)", description: "d" };

    it("an inoperable seat is a focusable button marked aria-disabled, and does not emit", async () => {
        const w = mount(ActionButton, { props: { ...props, disabled: true }, attachTo: document.body });
        const button = w.get("button");
        expect(button.classes()).toContain("dock-icon-button");
        expect(button.attributes("aria-disabled")).toBe("true");
        expect(button.attributes("disabled")).toBeUndefined();
        expect(button.attributes("aria-label")).toBe("Copy colors (unavailable)");
        await button.trigger("click");
        expect(w.emitted("action")).toBeUndefined();
        w.unmount();
    });

    it("an operable seat emits its action", async () => {
        const w = mount(ActionButton, { props, attachTo: document.body });
        await w.get("button").trigger("click");
        expect(w.emitted("action")).toHaveLength(1);
        w.unmount();
    });
});

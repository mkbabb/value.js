// SERVED MODEL: claude-opus-5-5
/**
 * V-D7 (X realization · FB BOUNDARY-SCOPE AB-4/AB-5) — a pane's throw is
 * contained to its own region. App.vue seats one `<ErrorBoundary>` PER REGION,
 * outside `<KeepAlive>` (X.W5.a, gate N5), so the sibling region stays mounted
 * and interactive, the plate shows Retry, and the failure reaches the
 * reporter. This mirrors that composition: two regions, each in its own
 * boundary.
 */
import { describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";
import ErrorBoundary, { FAILURE_REPORTER_KEY } from "../../app/ErrorBoundary.vue";

const global = {
    stubs: {
        Button: { template: `<button class="retry" @click="$emit('click')"><slot/></button>` },
        RotateCcw: true,
    },
};

describe("pane boundaries — one region's throw is its own", () => {
    for (const pane of ["picker", "inspector", "palettes", "browse", "generate", "gradient", "mix", "extract", "blob"]) {
        it(`${pane}: the sibling region stays live and the plate offers Retry`, async () => {
            const boom = ref(true);
            const clicks = ref(0);
            const Failing = defineComponent({
                setup: () => () => {
                    if (boom.value) throw new Error(`__throw=${pane}`);
                    return h("div", { class: "recovered" }, "ok");
                },
            });
            const Sibling = defineComponent({
                setup: () => () => h("button", { class: "sibling", onClick: () => clicks.value++ }, `n=${clicks.value}`),
            });
            const report = vi.fn();
            const w = mount(
                defineComponent({
                    setup: () => () =>
                        h("div", [
                            h(ErrorBoundary, { resetKey: pane }, { default: () => h(Failing) }),
                            h(ErrorBoundary, { resetKey: "sibling" }, { default: () => h(Sibling) }),
                        ]),
                }),
                { global: { ...global, provide: { [FAILURE_REPORTER_KEY as symbol]: report } } },
            );
            await nextTick();
            expect(w.findAll('[role="alert"]').length, "one plate, in the failing region").toBe(1);
            expect(report).toHaveBeenCalled();
            await w.find(".sibling").trigger("click");
            expect(w.find(".sibling").text(), "the sibling stays interactive").toBe("n=1");
            boom.value = false;
            await w.find(".retry").trigger("click");
            await nextTick();
            expect(w.find(".recovered").exists(), "Retry re-renders the pane").toBe(true);
        });
    }
});

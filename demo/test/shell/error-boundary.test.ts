// SERVED MODEL: claude-opus-5[1m]
//
// X-W1 · X.W1.a — R10 (ErrorBoundary EB-26) / NG-4: the demo component-test
// home gains the core shell.
//
// `vitest.config.ts` has included `demo/test/**` all along, and exactly THREE
// suites lived there (`export/`, `glass/`, `palettes/api/`) — the app's shell
// component was in none of them. The corpus had already written and PASSED
// these jsdom probes against the shipped component, in an audit folder that
// `npm test` never reaches.
//
// R10's CURE-SHAPE LOCK is *"the corpus's 9 passing jsdom probes are ready
// `demo/test/shell/` seeds — seed them by name; do not re-author."* So this
// file is that seeding, and the assertions below are the corpus's own. Two
// things changed and nothing else:
//
//   · the `@demo/…` import becomes a RELATIVE path. W43 (RF-15) killed the
//     demo path aliases repo-wide; every demo import is relative to its
//     physical home, and the alias this probe used exists in no config the
//     repo ships.
//   · this header.
//
// The probes are DESCRIPTIVE, not aspirational: P2 (stays latched across a
// slot replacement), P3 (Try-again re-throws — a dead affordance), P4 (the
// error is swallowed entirely, with no reporting seam) and P5 (async throws
// are not caught) all pin behaviour the corpus judged defective. They pass
// today because they describe what the component DOES, and that is what makes
// them load-bearing: the day any of it changes, this file says so.
//
// Source of record:
// docs/tranches/V/megatranche/audit/components/ErrorBoundary/probes/boundary.test.ts

import { describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref, type Component } from "vue";
import { mount } from "@vue/test-utils";
import ErrorBoundary from "../../color-picker/ErrorBoundary.vue";

/** A child that throws on render whenever `boom.value` is true. */
function makeThrower(boom: { value: boolean }, label: string): Component {
    return defineComponent({
        name: "Thrower-" + label,
        setup() {
            return () => {
                if (boom.value) throw new Error("render-throw:" + label);
                return h("div", { class: "alive-" + label }, "alive " + label);
            };
        },
    });
}

// Button/lucide are real glass-ui + lucide components; stub them so the probe
// exercises ONLY the boundary's own logic and needs no design-system runtime.
const global = {
    stubs: {
        Button: { template: `<button @click="$emit('click')"><slot/></button>` },
        CircleAlert: true,
        RotateCcw: true,
    },
};

describe("ErrorBoundary — L-probes", () => {
    it("P1 catches a descendant render throw and unmounts the WHOLE slot", async () => {
        const boom = ref(true);
        const A = makeThrower(boom, "A");
        const B = makeThrower(ref(false), "B");
        const w = mount(ErrorBoundary, {
            global,
            slots: { default: () => [h(A), h(B)] },
        });
        await nextTick();
        expect(w.find('[role="alert"]').exists()).toBe(true);
        // B never threw, yet B is gone: one sibling's throw kills every sibling.
        expect(w.find(".alive-B").exists()).toBe(false);
        expect(w.text()).toContain("render-throw:A");
    });

    it("P2 stays latched after the slot content is REPLACED (no subtree keying)", async () => {
        const boom = ref(true);
        const which = ref<"bad" | "good">("bad");
        const Bad = makeThrower(boom, "BAD");
        const Good = makeThrower(ref(false), "GOOD");
        const w = mount(ErrorBoundary, {
            global,
            slots: { default: () => h(which.value === "bad" ? Bad : Good) },
        });
        await nextTick();
        expect(w.find('[role="alert"]').exists()).toBe(true);

        // Simulate a VIEW CHANGE: the parent swaps the slotted pane for a
        // healthy one (what the dock does on every navigation).
        which.value = "good";
        boom.value = false;
        await w.vm.$forceUpdate();
        await nextTick();
        await nextTick();

        // The boundary is still latched — the healthy pane never mounts.
        expect(w.find('[role="alert"]').exists()).toBe(true);
        expect(w.find(".alive-GOOD").exists()).toBe(false);
    });

    it("P3 'Try again' on a still-broken child re-throws immediately (dead affordance)", async () => {
        const boom = ref(true);
        const A = makeThrower(boom, "A");
        const w = mount(ErrorBoundary, { global, slots: { default: () => h(A) } });
        await nextTick();
        expect(w.find('[role="alert"]').exists()).toBe(true);

        await w.find("button").trigger("click");
        await nextTick();
        await nextTick();

        // Still the alert plate: reset() re-mounts the SAME throwing child.
        expect(w.find('[role="alert"]').exists()).toBe(true);
        expect(w.emitted("reset")).toBeTruthy();
    });

    it("P4 swallows the error ENTIRELY — no console.error, no rethrow, no report seam", async () => {
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const boom = ref(true);
        const A = makeThrower(boom, "A");
        const w = mount(ErrorBoundary, { global, slots: { default: () => h(A) } });
        await nextTick();
        expect(w.find('[role="alert"]').exists()).toBe(true);
        // Vue's handleError returns EARLY on a `false` hook result, so logError
        // (console.warn "Unhandled error..." + rethrow-in-dev) never runs.
        expect(spy.mock.calls.map((c) => String(c[0])).join("|")).not.toContain(
            "render-throw",
        );
        expect(warn.mock.calls.map((c) => String(c[0])).join("|")).not.toContain(
            "Unhandled error",
        );
        // And the component emits NOTHING on catch — only on reset. There is no
        // outward reporting seam at all.
        expect(w.emitted()).toEqual({});
        spy.mockRestore();
        warn.mockRestore();
    });

    it("P5 does NOT catch async throws (setTimeout / promise) — the coverage hole", async () => {
        const w = mount(ErrorBoundary, {
            global,
            slots: {
                default: () =>
                    h(
                        defineComponent({
                            setup() {
                                // A raw async escape — the shape of every
                                // fetch/rAF/WebGL callback in the demo.
                                Promise.reject(new Error("async-throw")).catch(() => {
                                    /* swallowed here only to keep the runner clean */
                                });
                                return () => h("div", { class: "alive-async" }, "ok");
                            },
                        }),
                    ),
            },
        });
        await nextTick();
        // Boundary never fires; the pane renders "fine" while the failure is lost.
        expect(w.find('[role="alert"]').exists()).toBe(false);
        expect(w.find(".alive-async").exists()).toBe(true);
    });

    it("P6 the `vj-error-boundary` hook class is emitted but matches no rule anywhere", async () => {
        const boom = ref(true);
        const w = mount(ErrorBoundary, {
            global,
            slots: { default: () => h(makeThrower(boom, "A")) },
        });
        await nextTick();
        expect(w.find(".vj-error-boundary").exists()).toBe(true);
    });
});

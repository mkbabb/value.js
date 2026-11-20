/**
 * The FORTIETH order, B-2: a pane swap commits after the frame that answers
 * the press has painted.
 *
 * Before: the slot committed inside the next animation frame, which runs
 * before that frame's paint, so the first frame after a press or a route
 * change carried the whole commit (a 4x phone painted nothing for 290 to
 * 1,623 ms). After: the commit runs in a task posted from that animation
 * frame, so the frame paints first; a later swap before then supersedes it
 * (one leave and one mount), and an unmount retires it.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, markRaw, nextTick } from "vue";
import PaneSlot from "../../shell/PaneSlot.vue";

// The slot's own collaborators, reduced to what a swap between two eager panes
// reads: the route table's panes pull in the whole colour library.
vi.mock("../../shell/usePaneRouter", () => ({
    PANE_LOAD_DELAY_MS: 200,
    PANE_PLATE_PHASE: "PanePlatePhase",
    preloadPane: () => null,
    resolvedPane: (component: unknown) => component,
}));
vi.mock("../../shell/viewSchema", () => ({ VIEW_MAP: { picker: {}, palettes: {} } }));
vi.mock("vue-router", () => ({ useRoute: () => ({ name: "picker" }) }));

let frames: FrameRequestCallback[] = [];
const runFrame = () => {
    const due = frames;
    frames = [];
    due.forEach((cb) => cb(performance.now()));
};
const aTask = () => new Promise((resolve) => setTimeout(resolve, 20));

const pane = (name: string) => markRaw(defineComponent({ name, render: () => h("div", { class: name }, name) }));
const A = pane("pane-a");
const B = pane("pane-b");
const C = pane("pane-c");

beforeEach(() => {
    frames = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
    vi.stubGlobal("cancelAnimationFrame", (id: number) => {
        frames[id - 1] = () => {};
    });
});
afterEach(() => vi.unstubAllGlobals());

function slot() {
    const flip = vi.fn((apply: () => void) => apply());
    const wrapper = mount(PaneSlot, {
        props: { component: A, componentKey: "a", transitionName: "vj-enter", max: 2, onMount: () => {}, flip },
    });
    return { wrapper, flip };
}

describe("PaneSlot · the swap commits after the answering frame paints (FORTIETH B-2)", () => {
    it("no commit inside the animation frame; the commit lands in a task after it", async () => {
        const { wrapper, flip } = slot();
        await wrapper.setProps({ component: B, componentKey: "b" });
        await nextTick();
        expect(flip).not.toHaveBeenCalled();
        runFrame();
        expect(flip, "committed inside the animation frame, before its paint").not.toHaveBeenCalled();
        await aTask();
        expect(flip).toHaveBeenCalledTimes(1);
        await nextTick();
        expect(wrapper.find(".pane-b").exists()).toBe(true);
        wrapper.unmount();
    });

    it("a second swap before the paint supersedes the first: one commit, to the latest pane", async () => {
        const { wrapper, flip } = slot();
        await wrapper.setProps({ component: B, componentKey: "b" });
        runFrame();
        await wrapper.setProps({ component: C, componentKey: "c" });
        runFrame();
        await aTask();
        expect(flip).toHaveBeenCalledTimes(1);
        await nextTick();
        expect(wrapper.find(".pane-c").exists()).toBe(true);
        expect(wrapper.find(".pane-b").exists()).toBe(false);
        wrapper.unmount();
    });

    it("an unmount before the paint retires the commit", async () => {
        const { wrapper, flip } = slot();
        await wrapper.setProps({ component: B, componentKey: "b" });
        runFrame();
        wrapper.unmount();
        await aTask();
        expect(flip).not.toHaveBeenCalled();
    });
});

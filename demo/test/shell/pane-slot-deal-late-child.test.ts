/**
 * The arriving card's text is held at 0 from its first frame and fades in on
 * the Web Animations API (PaneSlot's `dealText`), played in the frame the
 * enter's classes move. A plate child that renders AFTER the enter hook
 * runs is held too.
 *
 * The case: the pane loading plate's two Skeleton bars are an async component
 * (glass's root barrel, loaded on demand), so at the enter hook the plate's
 * Card has no element children; the bars render a moment later, before the
 * first paint. Taken once at the hook, they were never held and cut in at full
 * strength (Home -> Palettes with the chunk held, at 390 and 844x390), where
 * the CSS rule this replaced held any child that appeared before the play
 * frame.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { defineAsyncComponent, defineComponent, h, markRaw } from "vue";
import PaneSlot from "../../shell/PaneSlot.vue";

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

/** Every run the slot starts, by element: held (paused) or played. */
type Run = { el: Element; frames: Keyframe[]; state: "paused" | "playing" | "cancelled" | "idle" };
let runs: Run[] = [];

beforeEach(() => {
    frames = [];
    runs = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
    vi.stubGlobal("cancelAnimationFrame", () => {});
    (HTMLElement.prototype as unknown as { animate: unknown }).animate = function (
        this: HTMLElement,
        keyframes: Keyframe[],
    ) {
        const run: Run = { el: this, frames: keyframes, state: "idle" };
        runs.push(run);
        return {
            pause: () => void (run.state = "paused"),
            play: () => void (run.state = "playing"),
            cancel: () => void (run.state = "cancelled"),
            effect: { updateTiming() {} },
            finished: new Promise(() => {}),
        } as unknown as Animation;
    };
});

afterEach(() => {
    vi.unstubAllGlobals();
    delete (HTMLElement.prototype as unknown as { animate?: unknown }).animate;
});

const Picker = markRaw(defineComponent({ name: "picker", render: () => h("div", { class: "pane-picker" }, "picker") }));

/** A plate like PaneLoadingPlate: a root and its resting Card, whose children
 *  (optionally a title present at mount, then two bars) include bars that
 *  render only when their loader resolves, as glass's Skeleton does there. */
function plateWithLateBars(withTitle: boolean) {
    let resolve!: () => void;
    const loaded = new Promise<void>((r) => (resolve = r));
    const Bar = defineAsyncComponent(() =>
        loaded.then(() => defineComponent({ render: () => h("div", { class: "late-bar" }) })),
    );
    const Plate = markRaw(
        defineComponent({
            name: "plate",
            render: () =>
                h("div", { class: "pane-plate" }, [
                    h("div", { class: "glass-resting" }, [
                        ...(withTitle ? [h("div", { class: "title" }, "Palettes")] : []),
                        h(Bar),
                        h(Bar),
                    ]),
                ]),
        }),
    );
    return { Plate, resolveBars: resolve };
}

const runOf = (selector: string) => runs.filter((r) => r.el.matches(selector) && r.state !== "cancelled");

async function dealThePlate(Plate: ReturnType<typeof plateWithLateBars>["Plate"]) {
    const wrapper = mount(PaneSlot, {
        props: { component: Picker, componentKey: "picker", transitionName: "vj-enter", max: 2, onMount: () => {} },
        attachTo: document.body,
    });
    await wrapper.setProps({ component: Plate, componentKey: "palettes" });
    runFrame(); // the answering frame paints; the commit is posted from it
    await aTask(); // the commit: the plate mounts and the enter hook deals its text
    expect(wrapper.find(".glass-resting").exists()).toBe(true);
    expect(wrapper.find(".late-bar").exists(), "the bars are not rendered at the enter hook").toBe(false);
    return wrapper;
}

describe("PaneSlot · dealText holds a plate child that renders after the enter hook", () => {
    it("the loading plate's bars, rendered before the play frame, are held at 0 and then played", async () => {
        const { Plate, resolveBars } = plateWithLateBars(false);
        const wrapper = await dealThePlate(Plate);

        resolveBars();
        await flushPromises(); // the bars render, before the next frame
        expect(wrapper.findAll(".late-bar")).toHaveLength(2);
        const bars = runOf(".late-bar");
        expect(bars.map((r) => r.state), "the bars are drawn whole: they were never held").toEqual(["paused", "paused"]);
        for (const bar of bars) expect(bar.frames.map((f) => f.opacity)).toEqual([0, 1]);

        runFrame();
        runFrame(); // the frame the enter's classes move: the text plays
        expect(runOf(".late-bar").map((r) => r.state), "the bars fade in on the deal's clock").toEqual([
            "playing",
            "playing",
        ]);
        wrapper.unmount();
    });

    it("a late child is played in the same frame as the text present at the mount", async () => {
        const { Plate, resolveBars } = plateWithLateBars(true);
        const wrapper = await dealThePlate(Plate);
        expect(runOf(".title").map((r) => r.state)).toEqual(["paused"]);

        resolveBars();
        await flushPromises();
        expect(runOf(".late-bar").map((r) => r.state), "the late bars were never held").toEqual(["paused", "paused"]);

        runFrame();
        expect(runOf(".title").map((r) => r.state), "nothing plays before the enter's classes move").toEqual([
            "paused",
        ]);
        runFrame();
        expect([...runOf(".title"), ...runOf(".late-bar")].map((r) => r.state)).toEqual([
            "playing",
            "playing",
            "playing",
        ]);
        wrapper.unmount();
    });
});

/**
 * OD19 repair 1 (C1-V-05) — the Gradient pane's mount does not tokenize CSS.
 *
 * Before: `GradientCodeEditor` ran hljs inside its `onMounted`, so the incoming
 * pane's mount frame on the Home → Gradient switch carried the tokenizer for a
 * well below the fold (12–13 ms of a 72–93 ms frame, ANGLE-Metal).
 * After: the mount paints the same text plain; the crayons land in an idle
 * slice, unless the reader has already focused the well.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import hljs from "highlight.js/lib/core";
import GradientCodeEditor from "../../workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue";

const CSS = "linear-gradient(90deg in oklch, red 0%, blue 100%)";

afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

describe("OD19 repair 1 — the code well highlights after mount, in an idle slice", () => {
    it("mount shows the plain text and does not call the tokenizer; the idle slice highlights it", async () => {
        const idle: (() => void)[] = [];
        vi.stubGlobal("requestIdleCallback", (cb: () => void) => idle.push(cb));
        vi.stubGlobal("cancelIdleCallback", () => {});
        const spy = vi.spyOn(hljs, "highlight");
        const w = mount(GradientCodeEditor, { props: { modelValue: CSS }, attachTo: document.body });
        const well = w.get('[role="textbox"]').element;

        expect(spy).not.toHaveBeenCalled();
        expect(well.textContent).toBe(CSS);

        expect(idle.length).toBe(1);
        idle[0]!();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(well.textContent).toBe(CSS);
        expect(well.querySelector("[class^='hljs-']")).not.toBeNull();
        w.unmount();
    });
});

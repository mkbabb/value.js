/**
 * color-40 G-4: leaving a figure never re-creates its siblings. One shared
 * epoch, bumped on every blur, re-created every figure, so the figure Tab had
 * just moved the focus to was destroyed under it and the keyboard could not
 * pass the readout.
 */
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ColorComponentDisplay from "../../picker/display/ColorComponentDisplay/ColorComponentDisplay.vue";

const props = {
    colorComponents: [["l", {}], ["c", {}], ["h", {}]] as [string, unknown][],
    formatted: {
        l: { value: 73, unit: "%" },
        c: { value: 0.185, unit: "" },
        h: { value: 2, unit: "deg" },
    },
    space: "oklch",
};
const fig = (w: ReturnType<typeof mount>, c: string) => w.get<HTMLElement>(`[aria-label="${c} component value"]`).element;

describe("ColorComponentDisplay: a figure's siblings outlive its blur", () => {
    it("leaving a figure unedited re-creates nothing", async () => {
        const w = mount(ColorComponentDisplay, { props, attachTo: document.body });
        const before = ["l", "c", "h"].map((c) => fig(w, c));
        fig(w, "l").focus();
        fig(w, "c").focus();
        await w.vm.$nextTick();
        expect(["l", "c", "h"].map((c) => fig(w, c))).toEqual(before);
        expect(document.activeElement).toBe(before[1]);
        w.unmount();
    });

    it("an edited figure is re-rendered whole, and only that one", async () => {
        const w = mount(ColorComponentDisplay, { props, attachTo: document.body });
        const [l0, c0, h0] = ["l", "c", "h"].map((c) => fig(w, c));
        l0!.focus();
        l0!.textContent = "5";
        c0!.focus();
        await w.vm.$nextTick();
        expect(w.emitted("commit")).toEqual([["5", "l"]]);
        expect(fig(w, "l")).not.toBe(l0);
        expect(fig(w, "c")).toBe(c0);
        expect(fig(w, "h")).toBe(h0);
        expect(document.activeElement).toBe(c0);
        w.unmount();
    });
});

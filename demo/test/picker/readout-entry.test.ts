// The readout figures are edited as one line and read on commit, in the
// figure's own unit: Enter commits, Escape restores, leaving the field
// commits, and a line break never enters it.
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ColorComponentDisplay from "../../picker/display/ColorComponentDisplay/ColorComponentDisplay.vue";
import { readoutEntry, readoutHexEntry } from "../../picker/display/ColorComponentDisplay/readoutEntry";
import { channelMeta } from "../../color-session/picker-color";

describe("readoutEntry: the typed text, read in the figure's unit", () => {
    const L = channelMeta("oklch", "l");
    const C = channelMeta("oklch", "c");
    const H = channelMeta("oklch", "h");

    it("reads a percent figure stored as 0-1 in percent", () => {
        expect(readoutEntry("5", L)).toBeCloseTo(0.05);
        expect(readoutEntry("62.5%", L)).toBeCloseTo(0.625);
        expect(readoutEntry(" 40 ", L)).toBeCloseTo(0.4);
    });
    it("reads a plain figure as itself and a hue in degrees, wrapped", () => {
        expect(readoutEntry("0.12", C)).toBeCloseTo(0.12);
        expect(readoutEntry("217deg", H)).toBe(217);
        expect(readoutEntry("370°", H)).toBe(10);
    });
    it("puts a value past its range on the range's edge", () => {
        expect(readoutEntry("500", L)).toBe(1);
        expect(readoutEntry("-3", C)).toBe(0);
    });
    it("refuses text that is not a value in this unit", () => {
        expect(readoutEntry("zz%", L)).toBeNull();
        expect(readoutEntry("", L)).toBeNull();
        expect(readoutEntry("5\n\n", L)).toBeCloseTo(0.05);
        expect(readoutEntry("12deg", L)).toBeNull();
        expect(readoutEntry("1.2.3", C)).toBeNull();
    });
    it("normalises a hex figure", () => {
        expect(readoutHexEntry("ff8800")).toBe("#ff8800");
        expect(readoutHexEntry("#abc")).toBe("#abc");
        expect(readoutHexEntry("#ggg")).toBeNull();
    });
});

describe("ColorComponentDisplay: commit on Enter or leave, restore on Escape", () => {
    const props = {
        colorComponents: [["l", {}], ["c", {}], ["h", {}]] as [string, unknown][],
        formatted: {
            l: { value: 73, unit: "%" },
            c: { value: 0.185, unit: "" },
            h: { value: 2, unit: "deg" },
        },
        space: "oklch",
    };
    const figure = (w: ReturnType<typeof mount>) =>
        w.get<HTMLElement>('[aria-label="l component value"]');

    async function edit(w: ReturnType<typeof mount>, text: string) {
        const el = figure(w);
        await el.trigger("focus");
        el.element.textContent = text;
        return el;
    }

    it("is a single-line plain-text field", () => {
        const w = mount(ColorComponentDisplay, { props });
        expect(figure(w).attributes("contenteditable")).toBe("plaintext-only");
        expect(figure(w).attributes("aria-multiline")).toBe("false");
    });

    it("refuses a line break", async () => {
        const w = mount(ColorComponentDisplay, { props });
        const ev = new InputEvent("beforeinput", { inputType: "insertParagraph", cancelable: true });
        figure(w).element.dispatchEvent(ev);
        expect(ev.defaultPrevented).toBe(true);
    });

    it("Enter commits the text once and restores the rendered figure", async () => {
        const w = mount(ColorComponentDisplay, { props, attachTo: document.body });
        const el = await edit(w, "5");
        await el.trigger("keydown", { key: "Enter" });
        await el.trigger("blur");
        expect(w.emitted("commit")).toEqual([["5", "l"]]);
        await w.vm.$nextTick();
        expect(figure(w).text()).toBe("73");
        w.unmount();
    });

    it("Escape restores and commits nothing", async () => {
        const w = mount(ColorComponentDisplay, { props, attachTo: document.body });
        const el = await edit(w, "739");
        await el.trigger("keydown", { key: "Escape" });
        expect(w.emitted("commit")).toBeUndefined();
        await w.vm.$nextTick();
        expect(figure(w).text()).toBe("73");
        w.unmount();
    });

    it("leaving the field commits; leaving it unchanged sends nothing", async () => {
        const w = mount(ColorComponentDisplay, { props });
        let el = await edit(w, "zz%");
        await el.trigger("blur");
        expect(w.emitted("commit")).toEqual([["zz%", "l"]]);
        await w.vm.$nextTick();
        // The parent refused it: the figure shows the last valid value again.
        expect(figure(w).text()).toBe("73");
        el = figure(w);
        await el.trigger("focus");
        await el.trigger("blur");
        expect(w.emitted("commit")).toHaveLength(1);
    });
});

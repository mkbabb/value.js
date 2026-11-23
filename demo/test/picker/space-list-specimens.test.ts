/**
 * The FORTIETH order, E-2: the colour-space list's first frame within 100 ms.
 *
 * The list's eighteen specimen lines (each the live colour in one space; the
 * kelvin row's inverse is a 39,001-step search) were computed in the press
 * that opens the list, on the sheet's first frame. They are now computed on
 * idle once the colour has held still, and held for that colour, so the open
 * reads them: the press computes none. A colour that changed since still gets
 * its lines in the open (never filled in after the sheet is up).
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, shallowRef } from "vue";
import { COLOR_MODEL_KEY } from "../../color-session/keys";
import { parsePickerColor } from "../../color-session/picker-color";

const formatted = vi.hoisted(() => ({ calls: 0 }));
vi.mock("../../color-session/format-color", async (importOriginal) => {
    const real = await importOriginal<typeof import("../../color-session/format-color")>();
    return {
        ...real,
        formatSpecimen: (...args: Parameters<typeof real.formatSpecimen>) => {
            formatted.calls++;
            return real.formatSpecimen(...args);
        },
    };
});
// glass's Select reduced to its slots: the list's rows render whenever the
// content does, which is all this test reads.
const slotted = (name: string) => defineComponent({ name, setup: (_, { slots }) => () => h("div", { class: name }, slots.default?.()) });
vi.mock("@mkbabb/glass-ui/select", () => ({
    Select: slotted("select"),
    SelectContent: slotted("select-content"),
    SelectGroup: slotted("select-group"),
    SelectItem: defineComponent({
        name: "select-item",
        setup: (_, { slots }) => () => h("div", { class: "select-item" }, [slots.default?.(), slots.description?.()]),
    }),
    SelectTrigger: slotted("select-trigger"),
    SelectValue: slotted("select-value"),
}));
vi.mock("../../shared/ui/watercolor-dot", () => ({ WatercolorDot: slotted("watercolor-dot") }));

let idle: (() => void)[] = [];
beforeEach(() => {
    vi.useFakeTimers();
    idle = [];
    vi.stubGlobal("requestIdleCallback", (cb: () => void) => idle.push(cb));
    formatted.calls = 0;
});
afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
});

async function host(css: string) {
    const { default: ColorSpaceSelector } = await import("../../shared/ui/ColorSpaceSelector.vue");
    const model = shallowRef({ color: parsePickerColor(css), space: "oklch" });
    const pipeline = { model, cssColor: shallowRef(css), updateToColorSpace: () => {} };
    const open = shallowRef(false);
    const wrapper = mount(ColorSpaceSelector, {
        props: { modelValue: "oklch", open: false, "onUpdate:open": (v: boolean) => (open.value = v) },
        global: { provide: { [COLOR_MODEL_KEY as symbol]: pipeline } },
    });
    return { wrapper, model };
}

describe("the colour-space list reads its specimen lines on open (E-2)", () => {
    it("a settled colour's lines are ready before the press: the open computes none", async () => {
        const { wrapper } = await host("oklch(70% 0.15 30)");
        vi.advanceTimersByTime(1000);
        idle.splice(0).forEach((cb) => cb());
        formatted.calls = 0;
        await wrapper.setProps({ open: true });
        await nextTick();
        expect(formatted.calls, "the press computed the specimen lines").toBe(0);
        expect(wrapper.findAll(".specimen-caption").length).toBeGreaterThan(10);
        wrapper.unmount();
    });

    it("a colour changed just before the open still opens with every line", async () => {
        const { wrapper, model } = await host("oklch(70% 0.15 30)");
        vi.advanceTimersByTime(1000);
        idle.splice(0).forEach((cb) => cb());
        model.value = { ...model.value, color: parsePickerColor("oklch(40% 0.1 200)") };
        await nextTick();
        await wrapper.setProps({ open: true });
        await nextTick();
        const captions = wrapper.findAll(".specimen-caption").map((c) => c.text());
        expect(captions.length).toBeGreaterThan(10);
        expect(captions.some((t) => t.includes("200")), captions.join(" | ")).toBe(true);
        wrapper.unmount();
    });
});

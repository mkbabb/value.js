/**
 * o1105 U4 — a stop drag writes once per frame, and the editors read a
 * snapshot taken once it settles.
 *
 * Before: every pointermove emitted `update:position`, so each one re-sorted
 * the model and re-rendered every reader: the rail and the render tile, but
 * also the code well (a re-highlight), the easing editor and the inspector,
 * none of which the hand is looking at mid-drag.
 * After: the rail coalesces its pointer writes to one per animation frame
 * (latest wins), lands the pending write on release, and a cancelled drag
 * commits nothing pending (GRADSTOP-A §12). The code well, the easing editor
 * and the inspector read a snapshot of the stops taken once the drag settles;
 * the rail ramp and the render tile stay live. Keyboard steps stay immediate.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { computed, nextTick } from "vue";
import { INK_AMBIENT_KEY } from "../../color-session/keys";
import GradientStopRail from "../../workbenches/gradient/GradientVisualizer/GradientStopRail.vue";
import GradientVisualizer from "../../workbenches/gradient/GradientVisualizer/GradientVisualizer.vue";
import { useGradientModel } from "../../workbenches/gradient/composables/useGradientModel";

let frames: FrameRequestCallback[] = [];
const runFrame = () => {
    const due = frames;
    frames = [];
    due.forEach((cb) => cb(performance.now()));
};

beforeEach(() => {
    frames = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
    vi.stubGlobal("cancelAnimationFrame", (id: number) => {
        frames[id - 1] = () => {};
    });
    vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
    // jsdom computes no custom property and no border width: the rail's axis
    // reads both, so the bar answers them as laid out.
    const real = window.getComputedStyle.bind(window);
    vi.stubGlobal("getComputedStyle", (el: Element) => {
        const cs = real(el);
        if (!(el as HTMLElement).dataset?.testid?.includes("gradient-stop-bar")) return cs;
        return new Proxy(cs, {
            get: (target, key) => key === "getPropertyValue"
                ? (name: string) => (name === "--rail-inset" ? "12px" : target.getPropertyValue(name))
                : key === "borderLeftWidth" || key === "borderRightWidth" ? "0px" : Reflect.get(target, key),
        });
    });
    HTMLElement.prototype.setPointerCapture = () => {};
    HTMLElement.prototype.releasePointerCapture = () => {};
});
afterEach(() => {
    document.body.innerHTML = "";
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

/** A 200px rail at x 0, so client x 12 + 1.76·p is ordinal p. */
function layOut(bar: HTMLElement) {
    bar.style.setProperty("--rail-inset", "12px");
    bar.getBoundingClientRect = () => ({ left: 0, top: 0, width: 200, height: 40, right: 200, bottom: 40, x: 0, y: 0, toJSON() {} }) as DOMRect;
}
const xAt = (p: number) => 12 + 1.76 * p;

function pointer(el: Element, type: string, clientX: number) {
    const e = new MouseEvent(type, { bubbles: true, button: 0, clientX, clientY: 5 });
    Object.defineProperty(e, "pointerId", { value: 1 });
    el.dispatchEvent(e);
}

function mountRail() {
    const model = useGradientModel();
    const w = mount(GradientStopRail, {
        props: {
            stops: model.stops.value,
            canRemove: true,
            railRamp: model.railRampCSS.value,
            interpolationSpace: model.interpolationSpace.value,
            hueMethod: model.hueMethod.value,
        },
        attachTo: document.body,
    });
    const bar = w.get('[data-testid="gradient-stop-bar"]').element as HTMLElement;
    layOut(bar);
    const handle = w.get(`[data-stop-id="${model.stops.value[0]!.id}"]`).element as HTMLElement;
    handle.getBoundingClientRect = () => ({ left: xAt(0) - 12, width: 24, top: 0, height: 24 }) as DOMRect;
    return { w, bar, handle };
}

describe("o1105 U4 — the rail writes a stop's position once per frame", () => {
    it("five moves in one frame emit one write, the latest", () => {
        const { w, bar, handle } = mountRail();
        pointer(handle, "pointerdown", xAt(0));
        for (const p of [10, 20, 30, 40, 50]) pointer(bar, "pointermove", xAt(p));
        runFrame();
        const writes = w.emitted("update:position") ?? [];
        expect(writes.map((args) => args[1])).toEqual([50]);
        w.unmount();
    });

    it("release lands the pending write without waiting a frame", () => {
        const { w, bar, handle } = mountRail();
        pointer(handle, "pointerdown", xAt(0));
        pointer(bar, "pointermove", xAt(20));
        pointer(bar, "pointermove", xAt(35));
        pointer(bar, "pointerup", xAt(35));
        expect((w.emitted("update:position") ?? []).map((args) => args[1])).toEqual([35]);
        runFrame();
        expect((w.emitted("update:position") ?? []).length).toBe(1);
        w.unmount();
    });

    it("a cancelled drag commits nothing pending", () => {
        const { w, bar, handle } = mountRail();
        pointer(handle, "pointerdown", xAt(0));
        pointer(bar, "pointermove", xAt(20));
        pointer(bar, "pointercancel", xAt(20));
        runFrame();
        expect(w.emitted("update:position")).toBeUndefined();
        w.unmount();
    });
});

describe("o1105 U4 — the editors read the stops once the drag settles", () => {
    it("mid-drag the code well and the inspector hold; the ramp and the tile move; release and settle land them", async () => {
        vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
        const w = mount(GradientVisualizer, {
            attachTo: document.body,
            global: { provide: { [INK_AMBIENT_KEY]: computed(() => 0.5) } },
        });
        await nextTick();
        const bar = w.get('[data-testid="gradient-stop-bar"]').element as HTMLElement;
        layOut(bar);
        const first = w.get("[data-stop-id]").element as HTMLElement;
        first.getBoundingClientRect = () => ({ left: xAt(0) - 12, width: 24, top: 0, height: 24 }) as DOMRect;

        const well = () => w.get('[role="textbox"]').element.textContent;
        const tile = () => (w.get('[data-testid="gradient-render-tile"]').element as HTMLElement).style.getPropertyValue("--tile-render");
        const ramp = () => bar.style.getPropertyValue("--rail-ramp");
        const css0 = well();
        const tile0 = tile();
        const ramp0 = ramp();
        expect(css0).toContain(" 0%");

        pointer(first, "pointerdown", xAt(0));
        await nextTick();
        for (const p of [10, 20, 30]) {
            pointer(bar, "pointermove", xAt(p));
            runFrame();
            await nextTick();
            vi.advanceTimersByTime(16);
        }
        // The live readers moved; the editors hold the pre-drag snapshot.
        expect(tile()).not.toBe(tile0);
        expect(ramp()).not.toBe(ramp0);
        expect(well()).toBe(css0);
        expect((w.get('[data-testid="gradient-stop-position"]').element as HTMLInputElement).value).toBe("0");

        pointer(bar, "pointerup", xAt(30));
        await nextTick();
        vi.runAllTimers();
        await nextTick();
        expect(well()).toContain(" 30%");
        expect((w.get('[data-testid="gradient-stop-position"]').element as HTMLInputElement).value).toBe("30");
        w.unmount();
    });
});

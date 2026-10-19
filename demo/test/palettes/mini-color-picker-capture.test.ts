// SERVED MODEL: claude-opus-5-5[1m]
//
// X-W7 · X.W7.a — fold gate N-10: POINTER CAPTURE IS TAKEN GUARDED AND ALWAYS
// RELEASED (MiniColorPicker, fold MCP-3 + MCP-42).
//
// Born-RED at the bytes: the drag flags were latched BEFORE an unguarded
// `setPointerCapture`, and only `@pointerup` cleared them. An interrupted drag
// (pointercancel / lostpointercapture / the popover closing) or a stale
// pointerId (NotFoundError thrown AFTER the flag latched) left the picker
// "dragging" forever, so bare hover went on rewriting the colour.
//
// jsdom implements neither PointerEvent nor pointer capture, so this file
// installs a minimal capture platform with the spec's one failure mode: a
// capture request for a pointerId that is not active throws NotFoundError.
import { mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import MiniColorPicker from "../../palettes/browser/search/MiniColorPicker.vue";

const active = new Set<number>();
const captures = new Map<Element, Set<number>>();
let released = 0;

const proto = Element.prototype as unknown as Record<string, unknown>;
const platform = {
    setPointerCapture(this: Element, id: number) {
        if (!active.has(id)) throw new DOMException("inactive pointer", "NotFoundError");
        captures.set(this, (captures.get(this) ?? new Set()).add(id));
    },
    hasPointerCapture(this: Element, id: number) {
        return captures.get(this)?.has(id) ?? false;
    },
    releasePointerCapture(this: Element, id: number) {
        if (captures.get(this)?.delete(id)) released++;
    },
};

const mounted: VueWrapper[] = [];
beforeEach(() => {
    Object.assign(proto, platform);
    active.clear();
    captures.clear();
    released = 0;
});
afterEach(() => {
    while (mounted.length) mounted.pop()!.unmount();
    for (const k of Object.keys(platform)) delete proto[k];
    document.body.innerHTML = "";
});

function pointer(el: Element, type: string, pointerId: number, x = 50, y = 50) {
    const e = new MouseEvent(type, { bubbles: true, clientX: x, clientY: y });
    Object.defineProperty(e, "pointerId", { value: pointerId });
    el.dispatchEvent(e);
}

async function mountPicker() {
    const w = mount(MiniColorPicker, {
        props: { open: true, hex: "#4488cc" },
        attachTo: document.body,
    });
    mounted.push(w);
    await w.vm.$nextTick();
    const canvas = document.body.querySelector<HTMLElement>(".sv-canvas")!;
    canvas.getBoundingClientRect = () => new DOMRect(0, 0, 100, 100);
    return { w, canvas };
}

/** The colour the picker last announced (the `update:hex` ledger's tail). */
function lastHex(w: VueWrapper): string | undefined {
    return w.emitted<[string]>("update:hex")?.at(-1)?.[0];
}

describe("N-10 · MiniColorPicker pointer capture", () => {
    it("an ordinary drag captures, tracks, and releases on pointerup", async () => {
        const { w, canvas } = await mountPicker();
        const seeded = lastHex(w);
        active.add(1);
        pointer(canvas, "pointerdown", 1, 10, 10);
        expect(canvas.hasPointerCapture(1)).toBe(true);
        pointer(canvas, "pointermove", 1, 90, 20);
        await w.vm.$nextTick();
        const dragged = lastHex(w);
        expect(dragged, "the drag itself moves the colour").toBeDefined();
        expect(dragged).not.toBe(seeded);
        pointer(canvas, "pointerup", 1, 90, 20);
        expect(canvas.hasPointerCapture(1)).toBe(false);
        expect(released).toBe(1);

        pointer(canvas, "pointermove", 1, 5, 95);
        await w.vm.$nextTick();
        expect(lastHex(w), "hover after pointerup must not move the colour").toBe(dragged);
    });

    for (const exit of ["pointercancel", "lostpointercapture"] as const) {
        it(`an interrupted drag (${exit}) ends; bare hover afterwards does not mutate`, async () => {
            const { w, canvas } = await mountPicker();
            active.add(1);
            pointer(canvas, "pointerdown", 1, 10, 10);
            await w.vm.$nextTick();
            const before = lastHex(w);
            pointer(canvas, exit, 1);
            pointer(canvas, "pointermove", 1, 90, 90);
            await w.vm.$nextTick();
            expect(lastHex(w)).toBe(before);
        });
    }

    it("a stale pointerId (NotFoundError) takes no capture and latches no drag", async () => {
        const { w, canvas } = await mountPicker();
        const before = lastHex(w);
        pointer(canvas, "pointerdown", 7, 10, 10); // 7 is not an active pointer
        pointer(canvas, "pointermove", 7, 90, 90);
        await w.vm.$nextTick();
        expect(canvas.hasPointerCapture(7)).toBe(false);
        expect(lastHex(w)).toBe(before);
    });

    it("closing the popover mid-drag releases the capture and ends the drag", async () => {
        const { w, canvas } = await mountPicker();
        active.add(1);
        pointer(canvas, "pointerdown", 1, 10, 10);
        expect(canvas.hasPointerCapture(1)).toBe(true);
        await w.setProps({ open: false });
        expect(released).toBe(1);
    });

    it("unmounting mid-drag releases the capture (scope dispose)", async () => {
        const { w, canvas } = await mountPicker();
        active.add(1);
        pointer(canvas, "pointerdown", 1, 10, 10);
        mounted.pop()!.unmount();
        expect(w.exists()).toBe(false);
        expect(canvas.hasPointerCapture(1)).toBe(false);
        expect(released).toBe(1);
    });
});

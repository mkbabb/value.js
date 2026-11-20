// The touch-intent lock: a sideways touch is the control's from its first
// pixel, a vertical one never reaches it, a tap sets the value, a mouse is
// never held, a handle is the control's at once, and one delegated listener
// serves many controls while leaving a control with its own install alone.
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import {
    SLOP_PX,
    attachTouchIntent,
    touchIntentKind,
    type TouchIntentOptions,
} from "../../shared/touch-intent/touchIntent";

beforeAll(() => {
    // jsdom ships no PointerEvent.
    if (typeof globalThis.PointerEvent === "undefined") {
        class PointerEventShim extends MouseEvent {
            pointerId: number;
            pointerType: string;
            isPrimary: boolean;
            width: number;
            height: number;
            pressure: number;
            constructor(type: string, init: PointerEventInit = {}) {
                super(type, init);
                this.pointerId = init.pointerId ?? 0;
                this.pointerType = init.pointerType ?? "";
                this.isPrimary = init.isPrimary ?? false;
                this.width = init.width ?? 1;
                this.height = init.height ?? 1;
                this.pressure = init.pressure ?? 0;
            }
        }
        globalThis.PointerEvent = PointerEventShim as unknown as typeof PointerEvent;
    }
});

let cleanups: (() => void)[] = [];
afterEach(() => {
    cleanups.forEach((fn) => fn());
    cleanups = [];
    document.body.innerHTML = "";
});

/** A control (`seat`) holding a track and a handle, each logging what reaches it. */
function control(className = "control") {
    const seat = document.createElement("div");
    seat.className = className;
    const track = document.createElement("span");
    const handle = document.createElement("i");
    handle.className = "handle";
    seat.append(track, handle);
    document.body.append(seat);
    const seen: string[] = [];
    const kinds: (string | undefined)[] = [];
    for (const el of [track, handle])
        for (const type of ["pointerdown", "pointermove", "pointerup"])
            el.addEventListener(type, (e) => {
                const p = e as PointerEvent;
                seen.push(`${type.slice(7)}@${p.clientX},${p.clientY}`);
                if (type === "pointerdown") kinds.push(touchIntentKind(e));
            });
    const fireOn =
        (el: Element) =>
        (type: string, x: number, y: number, pointerType = "touch", pointerId = 7) =>
            el.dispatchEvent(
                new PointerEvent(type, { bubbles: true, pointerId, pointerType, clientX: x, clientY: y }),
            );
    return { seat, track, handle, seen, kinds, fire: fireOn(track), fireHandle: fireOn(handle) };
}

function own(options: TouchIntentOptions = {}) {
    const c = control();
    cleanups.push(attachTouchIntent(c.seat, options));
    return c;
}

describe("touch intent, on the control itself", () => {
    it("holds a touch's press until its direction is known", () => {
        const { seen, fire, seat } = own();
        fire("pointerdown", 100, 20);
        fire("pointermove", 100 + SLOP_PX - 2, 21);
        expect(seen).toEqual([]);
        expect(seat.dataset.touchIntent).toBe("held");
    });

    it("gives a sideways drag to the control from where the finger landed", () => {
        const { seen, kinds, fire, seat } = own();
        fire("pointerdown", 100, 20);
        fire("pointermove", 110, 22);
        expect(seat.dataset.touchIntent).toBe("drag");
        fire("pointermove", 130, 23);
        fire("pointerup", 130, 23);
        expect(seen).toEqual(["down@100,20", "move@110,22", "move@130,23", "up@130,23"]);
        expect(kinds).toEqual(["drag"]);
        expect(seat.dataset.touchIntent).toBe("idle");
    });

    it("keeps a vertical swipe from the control entirely", () => {
        const { seen, fire, seat } = own();
        fire("pointerdown", 100, 200);
        fire("pointermove", 101, 190);
        fire("pointermove", 103, 150);
        fire("pointerup", 103, 150);
        expect(seen).toEqual([]);
        expect(seat.dataset.touchIntent).toBe("idle");
    });

    it("gives a tie to the page", () => {
        const { seen, fire } = own();
        fire("pointerdown", 100, 100);
        fire("pointermove", 108, 108);
        fire("pointerup", 108, 108);
        expect(seen).toEqual([]);
    });

    it("lets a tap set the value where it landed", () => {
        const { seen, kinds, fire, seat } = own();
        fire("pointerdown", 60, 20);
        fire("pointerup", 61, 20);
        expect(seen).toEqual(["down@60,20", "up@61,20"]);
        expect(kinds).toEqual(["tap"]);
        expect(seat.dataset.touchIntent).toBe("idle");
    });

    it("forgets a held press the browser cancels", () => {
        const { seen, fire, seat } = own();
        fire("pointerdown", 60, 20);
        fire("pointercancel", 60, 20);
        fire("pointerup", 60, 20);
        expect(seen).toEqual(["up@60,20"]);
        expect(seat.dataset.touchIntent).toBe("idle");
    });

    it("never holds a mouse", () => {
        const { seen, kinds, fire, seat } = own();
        fire("pointerdown", 60, 20, "mouse");
        fire("pointermove", 60, 40, "mouse");
        expect(seen).toEqual(["down@60,20", "move@60,40"]);
        expect(kinds).toEqual([undefined]);
        expect(seat.dataset.touchIntent).toBe("idle");
    });

    it("gives a touch on the handle to the control at once, vertical included", () => {
        const { seen, kinds, fireHandle, seat } = own({ exempt: ".handle" });
        fireHandle("pointerdown", 50, 50);
        expect(seat.dataset.touchIntent).toBe("drag");
        fireHandle("pointermove", 51, 30);
        fireHandle("pointerup", 51, 30);
        expect(seen).toEqual(["down@50,50", "move@51,30", "up@51,30"]);
        expect(kinds).toEqual([undefined]);
        expect(seat.dataset.touchIntent).toBe("idle");
    });

    it("still holds a touch off the handle", () => {
        const { seen, fire } = own({ exempt: ".handle" });
        fire("pointerdown", 50, 50);
        fire("pointermove", 51, 30);
        expect(seen).toEqual([]);
    });

    it("leaves the control as it was on cleanup", () => {
        const c = control();
        const detach = attachTouchIntent(c.seat);
        expect(c.seat.dataset.touchIntent).toBe("idle");
        detach();
        expect(c.seat.dataset.touchIntent).toBeUndefined();
        c.fire("pointerdown", 60, 20);
        expect(c.seen).toEqual(["down@60,20"]);
    });
});

describe("touch intent, delegated from a root", () => {
    it("serves every matching control from one listener", () => {
        const a = control();
        const b = control();
        cleanups.push(attachTouchIntent(document, { match: ".control" }));
        a.fire("pointerdown", 10, 10);
        a.fire("pointermove", 10, 40);
        a.fire("pointerup", 10, 40);
        b.fire("pointerdown", 10, 10);
        b.fire("pointermove", 30, 11);
        b.fire("pointerup", 30, 11);
        expect(a.seen).toEqual([]);
        expect(b.seen).toEqual(["down@10,10", "move@30,11", "up@30,11"]);
        expect(a.seat.dataset.touchIntent).toBe("idle");
        expect(b.seat.dataset.touchIntent).toBe("idle");
    });

    it("lets a touch elsewhere through untouched", () => {
        cleanups.push(attachTouchIntent(document, { match: ".control" }));
        const other = control("other");
        other.fire("pointerdown", 10, 10);
        other.fire("pointermove", 10, 40);
        expect(other.seen).toEqual(["down@10,10", "move@10,40"]);
        expect(other.seat.dataset.touchIntent).toBeUndefined();
    });

    it("serves the handle of a delegated control at once", () => {
        cleanups.push(attachTouchIntent(document, { match: ".control", exempt: ".handle" }));
        const c = control();
        c.fireHandle("pointerdown", 50, 50);
        c.fireHandle("pointermove", 50, 20);
        expect(c.seen).toEqual(["down@50,50", "move@50,20"]);
        expect(c.seat.dataset.touchIntent).toBe("drag");
    });

    it("leaves a control with its own install to it, and never holds a replay twice", () => {
        cleanups.push(attachTouchIntent(document, { match: ".control" }));
        const c = control();
        const log: string[] = [];
        cleanups.push(attachTouchIntent(c.seat, { log: (_e, tag) => log.push(tag) }));
        c.fire("pointerdown", 100, 20);
        c.fire("pointermove", 110, 22);
        c.fire("pointerup", 110, 22);
        expect(c.seen).toEqual(["down@100,20", "move@110,22", "up@110,22"]);
        expect(log).toEqual(["down", "drag"]);
    });

    it("keeps two fingers apart", () => {
        cleanups.push(attachTouchIntent(document, { match: ".control" }));
        const a = control();
        const b = control();
        a.fire("pointerdown", 10, 10, "touch", 1);
        b.fire("pointerdown", 10, 10, "touch", 2);
        a.fire("pointermove", 10, 40, "touch", 1);
        b.fire("pointermove", 30, 11, "touch", 2);
        expect(a.seen).toEqual([]);
        expect(b.seen).toEqual(["down@10,10", "move@30,11"]);
    });
});

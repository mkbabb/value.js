// The channel sliders' touch direction lock: a sideways touch is the
// slider's from its first pixel, a vertical one never reaches it, a tap sets
// the value, and a mouse is never held.
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import {
    SLOP_PX,
    attachSliderTouchIntent,
} from "../../picker/controls/ComponentSliders/composables/useSliderTouchIntent";

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

let cleanup: () => void = () => {};
afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
});

function setup() {
    const seat = document.createElement("div");
    const track = document.createElement("span");
    seat.append(track);
    document.body.append(seat);
    const seen: string[] = [];
    for (const type of ["pointerdown", "pointermove", "pointerup"])
        track.addEventListener(type, (e) => {
            const p = e as PointerEvent;
            seen.push(`${type.slice(7)}@${p.clientX},${p.clientY}`);
        });
    cleanup = attachSliderTouchIntent(seat);
    const fire = (type: string, x: number, y: number, pointerType = "touch") =>
        track.dispatchEvent(
            new PointerEvent(type, { bubbles: true, pointerId: 7, pointerType, clientX: x, clientY: y }),
        );
    return { seen, fire };
}

describe("slider touch intent", () => {
    it("holds a touch's press until its direction is known", () => {
        const { seen, fire } = setup();
        fire("pointerdown", 100, 20);
        fire("pointermove", 100 + SLOP_PX - 2, 21);
        expect(seen).toEqual([]);
    });

    it("gives a sideways drag to the slider from where the finger landed", () => {
        const { seen, fire } = setup();
        fire("pointerdown", 100, 20);
        fire("pointermove", 110, 22);
        fire("pointermove", 130, 23);
        fire("pointerup", 130, 23);
        expect(seen).toEqual(["down@100,20", "move@110,22", "move@130,23", "up@130,23"]);
    });

    it("keeps a vertical swipe from the slider entirely", () => {
        const { seen, fire } = setup();
        fire("pointerdown", 100, 200);
        fire("pointermove", 101, 190);
        fire("pointermove", 103, 150);
        fire("pointerup", 103, 150);
        expect(seen).toEqual([]);
    });

    it("lets a tap set the value where it landed", () => {
        const { seen, fire } = setup();
        fire("pointerdown", 60, 20);
        fire("pointerup", 61, 20);
        expect(seen).toEqual(["down@60,20", "up@61,20"]);
    });

    it("never holds a mouse", () => {
        const { seen, fire } = setup();
        fire("pointerdown", 60, 20, "mouse");
        fire("pointermove", 60, 40, "mouse");
        expect(seen).toEqual(["down@60,20", "move@60,40"]);
    });
});

/**
 * color-40 N-2 (lens A): the eyedropper's lens stands above the finger, so the
 * finger never covers what it samples; at the stage's top edge it stays inside
 * and rolls round the finger, and it never leaves the stage's sides.
 */
import { describe, expect, it } from "vitest";
import { lensPlacement, rollSideFor } from "../../workbenches/extract/ImageEyedropper/lensPlacement";
import { LENS_EDGE, LENS_LIFT, LOUPE_SIZE } from "../../workbenches/extract/ImageEyedropper/constants";

const R = LOUPE_SIZE / 2;
const W = 358;

describe("lensPlacement", () => {
    it("under a mouse the lens is centred on the pointer", () => {
        expect(lensPlacement({ x: 100, y: 200 }, W, false, 1)).toEqual({ cx: 100, cy: 200 });
    });

    it("under a finger in open space the lens's centre is the lift above the touch", () => {
        const p = lensPlacement({ x: 180, y: 300 }, W, true, 1);
        expect(p).toEqual({ cx: 180, cy: 300 - LENS_LIFT });
        expect(Math.hypot(p.cx - 180, p.cy - 300)).toBeGreaterThanOrEqual(80);
    });

    it("at the top edge it stays inside and rolls round the finger, clear of it", () => {
        for (const y of [0, 20, 60, 100]) {
            const at = { x: 120, y };
            const p = lensPlacement(at, W, true, 1);
            expect(p.cy - R, `top inside at y=${y}`).toBeGreaterThanOrEqual(LENS_EDGE - 1e-9);
            expect(Math.hypot(p.cx - at.x, p.cy - at.y), `clear of the finger at y=${y}`).toBeCloseTo(LENS_LIFT, 6);
            expect(p.cx).toBeGreaterThanOrEqual(at.x);
        }
    });

    it("the roll is continuous: no flip as the finger climbs to the edge", () => {
        let prev = lensPlacement({ x: 120, y: 260 }, W, true, 1);
        for (let y = 259; y >= 0; y--) {
            const p = lensPlacement({ x: 120, y }, W, true, 1);
            expect(Math.hypot(p.cx - prev.cx, p.cy - prev.cy), `step at y=${y}`).toBeLessThan(3);
            prev = p;
        }
    });

    it("it never leaves the stage's sides, and it rolls away from the nearer one", () => {
        expect(rollSideFor(10, W)).toBe(1);
        expect(rollSideFor(W - 10, W)).toBe(-1);
        for (const x of [0, 5, W - 5, W]) {
            const p = lensPlacement({ x, y: 10 }, W, true, rollSideFor(x, W));
            expect(p.cx - R).toBeGreaterThanOrEqual(LENS_EDGE - 1e-9);
            expect(p.cx + R).toBeLessThanOrEqual(W - LENS_EDGE + 1e-9);
        }
    });
});

/**
 * Where the eyedropper's lens stands (color-40 N-2, lens A: above the finger).
 *
 * Under a mouse the lens is centred on the pointer. Under a finger its centre
 * stands `LENS_LIFT` px from the touch: straight above it in open space, so
 * the finger never covers what it samples. Near the stage's top edge it stays
 * inside by rolling round the finger, at the same distance, to the side chosen
 * at the press; it is clamped at the side edges.
 *
 * The roll eases in: the lens's angle round the finger starts to turn a little
 * before the top edge would cut it and turns at a finite rate, so a finger
 * climbing one pixel never throws the lens sideways (a hard clamp has an
 * infinite slope at the onset: 14 px of travel for the first pixel). One
 * continuous, smooth position: no flip.
 */
import { LENS_EDGE, LENS_LIFT, LOUPE_SIZE } from "./constants";

export interface LensPlacement {
    /** The lens's centre, in stage px. */
    cx: number;
    cy: number;
}

/** The width of the eased band, as a share of the lift. */
const SOFT = 0.25;

/**
 * cos of the lens's angle from straight above, for a finger `u` lifts below
 * the highest centre the stage allows: 1 (straight up) in open space, `u`
 * itself (the lens touching the top) close in, and a quadratic ease between,
 * which never lets the lens above the top (it stays at or under `u`).
 */
function rollCos(u: number): number {
    if (u >= 1 + SOFT) return 1;
    if (u <= 1 - SOFT) return Math.max(-1, u);
    const t = 1 + SOFT - u;
    return 1 - (t * t) / (4 * SOFT);
}

/**
 * The lens's centre for a sample point `at` on a stage `stageW` px wide.
 * `rollSide` is 1 (roll right) or -1 (roll left), fixed for one touch.
 */
export function lensPlacement(
    at: { x: number; y: number },
    stageW: number,
    byTouch: boolean,
    rollSide: 1 | -1,
): LensPlacement {
    if (!byTouch) return { cx: at.x, cy: at.y };
    const r = LOUPE_SIZE / 2;
    const top = r + LENS_EDGE;
    const cos = rollCos((at.y - top) / LENS_LIFT);
    const sin = Math.sqrt(Math.max(0, 1 - cos * cos));
    const max = Math.max(top, stageW - r - LENS_EDGE);
    const cx = Math.min(Math.max(at.x + rollSide * LENS_LIFT * sin, r + LENS_EDGE), max);
    return { cx, cy: at.y - LENS_LIFT * cos };
}

/** The side a touch's lens rolls to at the top edge: away from the nearer side edge. */
export function rollSideFor(x: number, stageW: number): 1 | -1 {
    return x < stageW / 2 ? 1 : -1;
}

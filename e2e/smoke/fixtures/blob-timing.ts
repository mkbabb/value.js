/**
 * T.W4-5 — THE ONE BLOB TIMING FIXTURE (PI-4's cure: the park-latency
 * contract was independently duplicated across three specs, each with a
 * "keep in lock-step" comment and no shared constant — a three-file
 * hand-sync waiting to skew. Every blob-park spec imports THIS module; a
 * future settle-timing change is a one-file edit with three call sites.)
 *
 * The contract (mirrors `HeroBlob.vue` — the demo half of the W3-3
 * idle-gate + the S.W6 sleepy pose; the park TRIGGER stays wall-clock until
 * P6's `settled` seam ships, BOOKED at T.W4-5):
 *
 *   BLOB_IDLE_MS      — HeroBlob's idle threshold N (no colour/pointer
 *                       activity for N ms → the sleepy pose begins).
 *   SLEEPY_POSE_MS    — the pose renders, THEN the park freezes it; park
 *                       completes at N + SLEEPY_POSE_MS.
 *   PARK_SETTLE_MS    — how long a spec waits before sampling: past park
 *                       completion with slack (N + 1500 = 800ms of slack).
 *   SAMPLE_WINDOW_MS  — the idle sampling window; MUST exceed N (§6.1 —
 *                       else the sample straddles the still-live pre-park
 *                       window; specs assert this at runtime).
 *   PARKED_DRAW_SLACK — straggler frames tolerated as the park engages (a
 *                       live loop adds hundreds over the window; the slack
 *                       cannot mask a regression).
 */

export const BLOB_IDLE_MS = 2000; // === HeroBlob.vue BLOB_IDLE_MS
// T.W8 · WR-2/T-49c — extended so the full park latency (N + SLEEPY_POSE_MS =
// 5.3s) clears one 5.2s fission beat (the resting colony shows a calm split
// before it freezes). === HeroBlob.vue SLEEPY_POSE_MS.
export const SLEEPY_POSE_MS = 3300;
// Wait PAST the full park latency (N + SLEEPY_POSE_MS) with 800ms of slack, so
// every park spec samples AFTER the loop parks regardless of the runway length.
export const PARK_SETTLE_MS = BLOB_IDLE_MS + SLEEPY_POSE_MS + 800;
export const SAMPLE_WINDOW_MS = BLOB_IDLE_MS + 500;
export const PARKED_DRAW_SLACK = 5;

/**
 * THE SEAT FORMULA (T.W4-5 · D8) — the e2e mirror of the ONE cqi footprint
 * law (`ColorPicker.vue .pane-shell{--blob-fp: clamp(7rem, 22cqi, 11rem)}`).
 * PI-4's law: geometry gates COMPUTE their expected bounds from this formula
 * at the test's own viewport — never a hand-typed px pair keyed to a dead
 * band arm (the retired 180/240 asserted the 8rem law the seat deletes).
 *
 * @param paneWidthPx the pane slot's inline size (the cqi container)
 * @param remPx       the root font size (16 unless the page overrides)
 */
export function seatFootprintPx(paneWidthPx: number, remPx = 16): number {
    const min = 7 * remPx;
    const max = 11 * remPx;
    return Math.min(Math.max(0.22 * paneWidthPx, min), max);
}

/** Canvas = 1.6× the wrapper footprint (the producer overscan identity). */
export const CANVAS_OVERSCAN = 1.6;

/** Visible bead = 2·bodyRadius·fp (bodyRadius 0.26 — the HERO register). */
export const BEAD_RATIO = 0.52;

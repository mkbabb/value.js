import { test, expect } from "@playwright/test";

/**
 * T.W0 W0-5 · O-4 — ORDER-INVARIANCE (SYNTHESIS §6.1 O-4; §3 T.W2-3 gate).
 *
 * The overture beat marks (B0–B4, the `--overture-*` shell tokens; dock arrives
 * AS the pill; pane-slot `appear` grammar) must hold their ORDER under a 6× CPU
 * throttle — the CDP-timeline order gate that kills the measured d/e idle race
 * by construction (SYNTHESIS §2: "O-4 asserts, over … the field's arm").
 *
 * ── BORN-GREEN-PENDING-W2 (annotated, never a live red): the surface O-4
 *    measures — the overture beat marks — DOES NOT EXIST until W2-3 lands it
 *    (verified: `grep -rn overture demo/@/` is empty at W0). There is no order
 *    to invert today, so this is not a live defect; it ARMS at W2. `test.fixme`
 *    is the honest "not-yet-live" encoding (skipped-pending, distinct from a
 *    born-RED and from a born-GREEN false-pass).
 *
 * ── ARMING AT W2 (the work this scaffold reserves): install a beat-mark
 *    collector (performance.mark per B0..B4), drive a cold load under CDP
 *    `Emulation.setCPUThrottlingRate(6)`, and assert the recorded mark ORDER is
 *    B0 ≤ B1 ≤ B2 ≤ B3 ≤ B4 regardless of throttle — the hydrate-before-derive
 *    ordering LAW (W2-1) made observable.
 */

test.fixme(
    "O-4 order-invariance — overture beat marks hold order under 6× CPU throttle",
    async ({ page }) => {
        // ARMS AT W2-3 (overture beats). Until then there is no beat surface to
        // measure; this body is the reserved W2 work, deliberately skipped.
        await page.goto("/");
        const marks = await page.evaluate(() =>
            performance
                .getEntriesByType("mark")
                .filter((m) => m.name.startsWith("overture:"))
                .map((m) => ({ name: m.name, t: m.startTime })),
        );
        const order = marks.map((m) => m.name);
        expect(order).toEqual([...order].sort((a, b) => a.localeCompare(b)));
    },
);

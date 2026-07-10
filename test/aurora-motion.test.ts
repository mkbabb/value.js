/**
 * R.W2.5 (U33) — the device-independent oracle for "the background aurora does
 * not move".
 *
 * The TRUE root of U33 was the demo default `motion:"breathing"` — the register
 * that zeroes SPATIAL drift (the field pulses in place at most). The fix flips
 * the demo default (`DEFAULT_AURORA_ATOMS`, `@composables/color/aurora-atoms.ts`) to `"drifting"`,
 * the spatial-drift register.
 *
 * This is a temporal-oracle STAND-IN that is fully device-independent (the
 * headless smoke runner resolves the aurora to a STATIC CSS gradient on
 * software-WebGL — `resolveRenderMode("auto") → "css"` — so a screenshot drift
 * capture is vacuous there; the positive-drift screenshot is real-GPU-gated and
 * booked to the π lane per N.W10 clause-e). Instead it reads the RESOLVED motion
 * config the renderer consumes: the demo default must select spatial-drift
 * parameters (`nucleiDrift` / `paletteDrift` / `warpDrift`) strictly greater
 * than the breathing register's — i.e. the field will actually drift.
 *
 * BITE: revert `DEFAULT_AURORA_ATOMS.motion` to `"breathing"` and this reds
 * (the demo default's drift collapses to the breathing baseline).
 */
import { describe, expect, it } from "vitest";

import { resolveAtoms } from "@mkbabb/glass-ui/aurora";

import { DEFAULT_AURORA_ATOMS } from "../demo/@/composables/color/aurora-atoms";

describe("aurora default motion (U33 — the field drifts)", () => {
    it("the demo default selects the spatial-drift register, not breathing", () => {
        const active = resolveAtoms(DEFAULT_AURORA_ATOMS);
        const breathing = resolveAtoms({
            ...DEFAULT_AURORA_ATOMS,
            motion: "breathing",
        });

        // The demo default must drive real spatial drift…
        expect(active.nucleiDrift).toBeGreaterThan(0);
        expect(active.paletteDrift).toBeGreaterThan(0);

        // …strictly beyond the breathing register that zeroes it (the U33 root).
        expect(active.nucleiDrift).toBeGreaterThan(breathing.nucleiDrift);
        expect(active.paletteDrift).toBeGreaterThan(breathing.paletteDrift);
    });
});

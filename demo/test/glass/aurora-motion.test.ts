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

import { DEFAULT_AURORA_ATOMS } from "../../scenes/atmosphere/aurora-atoms";
import { resolveAtmosphereField } from "../../app/composables/boot/atmosphere-calibration";
import { fieldAtomsFor } from "../../app/composables/boot/seeded-ground";

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

// o1105 (aurora lane, round 2): the served field read static on a real GPU —
// movedFrac ≤ 0.002 over 1.5 s at every seed in both schemes — because the
// producer's "drifting" register moves a nucleus 0.045 uv around a ~45 s orbit.
// The painted field (resolveAtmosphereField, the one resolver the canvas, the
// CSS fallback and the strips share) must carry the calibrated drift: nuclei
// travel at ≥ 2.5× the producer's speed (orbit radius × angular rate) inside
// the schema's 0.08 uv orbit, and "still" stays still.
// BITE: drop calibrateDrift from resolveCalibratedAtmosphere and this reds.
describe("the painted field is visibly alive (o1105 aurora)", () => {
    const seeds = ["oklch(0.7 0.15 30)", "oklch(0.7 0.15 145)", "oklch(0.7 0.15 265)", "oklch(0.6 0.2 330)"];
    for (const dark of [true, false]) {
        it(`nuclei travel ≥ 2.5× the producer register (${dark ? "dark" : "light"})`, () => {
            for (const seed of seeds) {
                const atoms = { ...DEFAULT_AURORA_ATOMS, seed };
                const producer = resolveAtoms(fieldAtomsFor(atoms, dark));
                const field = resolveAtmosphereField(fieldAtomsFor(atoms, dark));
                const speed = (c: typeof field) =>
                    Math.max(...c.nuclei.map((n) => n.driftRadius)) * c.nucleiDrift;
                expect(speed(field)).toBeGreaterThanOrEqual(2.5 * speed(producer));
                for (const n of field.nuclei) expect(n.driftRadius).toBeLessThanOrEqual(0.08);
                expect(field.warpDrift).toBeGreaterThan(producer.warpDrift);
            }
        });
    }
    it('"still" stays still', () => {
        const still = resolveAtmosphereField({ ...DEFAULT_AURORA_ATOMS, seed: "oklch(0.7 0.15 30)", motion: "still" });
        expect(still.nucleiDrift).toBe(0);
        expect(still.paletteDrift).toBe(0);
        expect(still.warpDrift).toBe(0);
    });
});

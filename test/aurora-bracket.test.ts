import { describe, expect, it } from "vitest";
import {
    resolveAtoms,
    DEFAULT_AURORA_CONFIG,
} from "@mkbabb/glass-ui/aurora";
import { DEFAULT_AURORA_ATOMS } from "@composables/color/aurora-atoms";
import {
    CALIBRATED_BREATH_PERIOD,
    CALIBRATED_SOFTMAX_BETA,
    resolveCalibratedAtmosphere,
    vividnessForSeedChroma,
    seedChroma,
} from "../demo/color-picker/composables/boot/atmosphere-calibration";

/**
 * T.W2 · W2-5 · O-6 — THE BRACKET RESOLVER TEST (SYNTHESIS §6.1 O-6; the
 * view-accents resolver-shape precedent — a pure-function probe, zero DOM).
 *
 * THE BRACKET (T-26, closed from both sides — the R6 ledger row):
 *   (analogous ±28°, colorEnergy 0.7)  = too muted   ← lower pole
 *   (triad 240°,      colorEnergy 0.82) = too strong  ← upper pole
 * The Q2-NOW landing must resolve STRICTLY INSIDE that envelope on every
 * co-varied axis the energy knob drives, with the calibrated base knobs
 * (breath 26 · softmaxBeta 4 · vividness = f(seedC)) surviving the atom
 * resolution (the resolveAtoms(atoms, base) producer seam).
 *
 * This is the NOW-half resolver test; the FULL-composition re-run (hueSpread
 * formula · counterpoint · drift · lBand) is a W7 verify-at-cut row (Q2-FULL,
 * P1-gated). O-26 measures the RENDERED perceptibility separately — O-6 is
 * deliberately the atom-envelope leg, named as such (never a proxy for the
 * render truth).
 */

const MID_C_SEED = "oklch(0.66 0.16 28)"; // the T-26 judge family's warm seed
const GRAY_SEED = "#808080"; // the F-11 betrayal seed
const GREEN_SEED = "oklch(0.7 0.18 145)";

describe("O-6 — the T-26 bracket resolver (Q2-NOW)", () => {
    it("the energy knob lands strictly inside the bracket (0.7 < 0.76 < 0.82)", () => {
        expect(DEFAULT_AURORA_ATOMS.colorEnergy).toBe(0.76);
        expect(DEFAULT_AURORA_ATOMS.colorEnergy!).toBeGreaterThan(0.7);
        expect(DEFAULT_AURORA_ATOMS.colorEnergy!).toBeLessThan(0.82);
        // The seed-identity pole guard: the harmony stays analogous (the
        // triad pole lost the seed's identity — ruling 6, never re-landed).
        expect(DEFAULT_AURORA_ATOMS.harmony).toBe("analogous");
    });

    it("every energy-co-varied axis resolves strictly between the two poles", () => {
        const seedAtoms = { ...DEFAULT_AURORA_ATOMS, seed: MID_C_SEED };
        const lower = resolveAtoms({ ...seedAtoms, colorEnergy: 0.7 });
        const upper = resolveAtoms({ ...seedAtoms, colorEnergy: 0.82 });
        const landed = resolveCalibratedAtmosphere(seedAtoms);
        for (const axis of [
            "saturation",
            "valueVariance",
            "breathDepth",
        ] as const) {
            expect(
                landed[axis],
                `${axis} must exceed the muted pole (${lower[axis]})`,
            ).toBeGreaterThan(lower[axis]);
            expect(
                landed[axis],
                `${axis} must stay below the too-strong pole (${upper[axis]})`,
            ).toBeLessThan(upper[axis]);
        }
    });

    it("the calibrated base knobs survive the atom resolution (the base seam)", () => {
        const landed = resolveCalibratedAtmosphere({
            ...DEFAULT_AURORA_ATOMS,
            seed: GREEN_SEED,
        });
        expect(landed.breathPeriod).toBe(CALIBRATED_BREATH_PERIOD);
        expect(landed.softmaxBeta).toBe(CALIBRATED_SOFTMAX_BETA);
        // The defaults these knobs move off (the F-8/F-9 stills): recorded
        // so a producer default change re-surfaces here loudly.
        expect(DEFAULT_AURORA_CONFIG.breathPeriod).toBe(40);
        expect(DEFAULT_AURORA_CONFIG.softmaxBeta).toBe(3);
    });

    it("vividness rides the seed's chroma — a gray pick keeps a sage whisper, never marigold (F-11)", () => {
        // The ride-down curve: achromatic → 0; fully chromatic → 1; monotone.
        expect(vividnessForSeedChroma(0)).toBe(0);
        expect(vividnessForSeedChroma(0.02)).toBe(0);
        expect(vividnessForSeedChroma(0.1)).toBe(1);
        expect(vividnessForSeedChroma(0.06)).toBeCloseTo(0.5, 5);
        let prev = -1;
        for (let c = 0; c <= 0.12; c += 0.01) {
            const v = vividnessForSeedChroma(c);
            expect(v).toBeGreaterThanOrEqual(prev);
            prev = v;
        }
        // The resolved configs: gray seed → vividness ≈ 0 (the marigold
        // floors never lift an achromatic pick); mid-C seed → the floor sings.
        const gray = resolveCalibratedAtmosphere({
            ...DEFAULT_AURORA_ATOMS,
            seed: GRAY_SEED,
        });
        expect(gray.vividness).toBeLessThanOrEqual(0.05);
        const mid = resolveCalibratedAtmosphere({
            ...DEFAULT_AURORA_ATOMS,
            seed: MID_C_SEED,
        });
        expect(mid.vividness).toBe(1);
    });

    it("seedChroma is throw-free on any input (the deep-watch law's helper)", () => {
        // The deep-watch law itself is held at useAtmosphere's VALIDATED seed
        // write (an un-parseable string never reaches the atoms — the
        // resolver's throw contract is unchanged from bare resolveAtoms).
        expect(seedChroma("not-a-color")).toBeGreaterThan(0);
        expect(seedChroma(undefined)).toBeGreaterThan(0);
        expect(() =>
            resolveCalibratedAtmosphere({ ...DEFAULT_AURORA_ATOMS }),
        ).not.toThrow();
    });
});

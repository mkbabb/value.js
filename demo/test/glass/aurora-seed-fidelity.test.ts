import { describe, expect, it } from "vitest";
import type { AuroraAtoms } from "@mkbabb/glass-ui/aurora";
import { cssToOklch } from "@mkbabb/glass-ui/color";

import { DEFAULT_AURORA_ATOMS } from "../../scenes/atmosphere/aurora-atoms";
import {
    DERIVE_SEAM_FLOOR,
    resolveAtmosphereField,
    resolveCalibratedAtmosphere,
} from "../../app/composables/boot/atmosphere-calibration";
import {
    fieldAtomsFor,
    groundStopsFor,
    seededGroundStops,
} from "../../app/composables/boot/seeded-ground";

/**
 * X·§0hk OD-12 — THE AURORA SHOWS THE CHOSEN COLOUR (the seed-fidelity oracle).
 *
 * Owner (2026-11-03): "the background aurora doesn't properly display our
 * actual color. Tweak that to better display our chosen color with our
 * hyperparams." The scattered prior's dominant nucleus reads ramp stop
 * t = 1/3 (`paletteBias` i/(n−1), stopCount 4), so the colour→parameter
 * mapping is faithful iff `palette[1]` IS the seed. Pure: the painted field,
 * the ground and the pre-paint boot all resolve through these functions.
 */

type Lch = { L: number; C: number; h: number };
const lab = ({ L, C, h }: Lch) => {
    const r = (h * Math.PI) / 180;
    return [L, C * Math.cos(r), C * Math.sin(r)] as const;
};
const deltaEOk = (a: Lch, b: Lch) => {
    const [l1, a1, b1] = lab(a);
    const [l2, a2, b2] = lab(b);
    return Math.hypot(l1 - l2, a1 - a2, b1 - b2);
};
const meanL = (palette: readonly Lch[]) =>
    palette.reduce((s, stop) => s + stop.L, 0) / palette.length;

/** The Daraksha default, its seven family colours (§0hl names), four CSS. */
const SEEDS: Record<string, string> = {
    efflorescence: "oklch(73% 0.185 2)",
    gulabi: "oklch(90% 0.055 18)",
    haldi: "oklch(82% 0.145 76)",
    zari: "oklch(72% 0.12 88)",
    sheesham: "oklch(55% 0.085 56)",
    tulsi: "oklch(72% 0.055 145)",
    "curry-leaf": "oklch(43% 0.085 152)",
    jamun: "oklch(39% 0.1 356)",
    rebeccapurple: "rebeccapurple",
    teal: "teal",
    tomato: "tomato",
    skyblue: "skyblue",
};

const atomsFor = (seed: string): AuroraAtoms => ({
    ...structuredClone(DEFAULT_AURORA_ATOMS),
    seed,
});
const fieldFor = (seed: string) =>
    resolveAtmosphereField(fieldAtomsFor(atomsFor(seed))).palette;

describe("OD-12 · the aurora's dominant stop is the chosen colour", () => {
    for (const [name, seed] of Object.entries(SEEDS)) {
        it(`${name}: palette[1] within ΔE_OK 0.03 of the seed`, () => {
            const palette = fieldFor(seed);
            expect(deltaEOk(palette[1]!, cssToOklch(seed))).toBeLessThanOrEqual(0.03);
        });

        it(`${name}: the derive seam holds (|mean L − seed L| ≥ floor)`, () => {
            const palette = fieldFor(seed);
            const gap = Math.abs(meanL(palette) - cssToOklch(seed).L);
            expect(gap).toBeGreaterThanOrEqual(DERIVE_SEAM_FLOOR - 1e-9);
        });

        it(`${name}: the resolve is deterministic`, () => {
            expect(JSON.stringify(fieldFor(seed))).toBe(JSON.stringify(fieldFor(seed)));
        });

        it(`${name}: the ground is the field (one derive, both schemes)`, () => {
            expect(seededGroundStops(seed)).toEqual(groundStopsFor(fieldFor(seed)));
        });
    }

    it("the mean-equals-wax construction resolves UPWARD on either side of float noise", () => {
        // Seat 1's live coin flip: an authored band whose ramp mean sits on
        // the wax L within float noise flipped the push 0.12 L between
        // re-seeds. The tie-break must not depend on the sign of the noise.
        const seed = "oklch(0.6 0.12 250)";
        const L = cssToOklch(seed).L;
        for (const eps of [-1e-9, 0, 1e-9]) {
            const atoms: AuroraAtoms = {
                ...atomsFor(seed),
                lBand: [L - 0.16 + eps, L + 0.16 + eps],
            };
            const raw = meanL(resolveCalibratedAtmosphere(atoms).palette!);
            expect(Math.abs(raw - L)).toBeLessThan(1e-6); // the construction holds
            expect(meanL(resolveAtmosphereField(atoms).palette!)).toBeGreaterThan(L);
        }
    });
});

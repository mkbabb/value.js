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
 * hyperparams." The colour→parameter mapping is faithful iff the seed lies ON the derived
 * ramp (the served field's dominant zone then reads it — the probe beside the
 * §0hk record measures that). Pure: the painted field,
 * the ground and the pre-paint boot all resolve through these functions.
 *
 * §0hn arm B: the LIGHT arm ships and is GREEN. The DARK arm is HELD on glass
 * O-130 (`DARK_FIELD_SEED_FAITHFUL` false: dark keeps the producer's dark
 * band, because glass 10.1.3's dark resting rung over a seed-faithful field
 * leaves no light ink at 4.5:1 — ss8-b09). Its fidelity cells are the same
 * bars, run as an expected fail (`it.fails`) tagged O-130; when glass 10.2.0's
 * plate L-floor law lands and the flag flips, they pass and `it.fails` turns
 * RED — unwrap them to plain `it` then.
 */

type Lch = { L: number; C: number; h: number };
const lab = ({ L, C, h }: Lch) => {
    const r = (h * Math.PI) / 180;
    return [L, C * Math.cos(r), C * Math.sin(r)] as const;
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
const fieldFor = (seed: string, dark = false) =>
    resolveAtmosphereField(fieldAtomsFor(atomsFor(seed), dark)).palette;

/** The two fidelity bars (the light cells below, the held dark arm). */
const onRampFoot = (seed: string, dark: boolean) => {
    const L = cssToOklch(seed).L;
    const [p0, p1] = fieldFor(seed, dark);
    if (L + DERIVE_SEAM_FLOOR + 0.08 <= 0.98) expect(p0!.L).toBeLessThanOrEqual(L + 1e-9);
    expect(p1!.L).toBeGreaterThanOrEqual(L - 1e-9);
};
const nearestStopDelta = (seed: string, dark: boolean) => {
    const [sl, sa, sb] = lab(cssToOklch(seed));
    return Math.min(
        ...fieldFor(seed, dark).map((st) => {
            const [l, a, b] = lab(st);
            return Math.hypot(l - sl, a - sa, b - sb);
        }),
    );
};

describe("OD-12 · the aurora's dominant stop is the chosen colour", () => {
    for (const [name, seed] of Object.entries(SEEDS)) {
        it(`${name}: the band puts the seed on the ramp's foot (light)`, () => {
            // stop 0 ≤ seed L ≤ stop 1 — unless the 0.98 ceiling has lifted
            // the whole band above a near-white seed (the seam's cost).
            onRampFoot(seed, false);
        });

        it(`${name}: a field stop is the seed (palette ΔE_OK ≤ 0.06, light)`, () => {
            // Palette-level: the shader's saturation and tonemap move the
            // painted field further (the served probe gates the painted
            // dominant zone at 0.05). Was 0.07–0.63 before the cure.
            expect(nearestStopDelta(seed, false)).toBeLessThanOrEqual(0.06);
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
            for (const dark of [false, true]) {
                expect(seededGroundStops(seed, dark)).toEqual(groundStopsFor(fieldFor(seed, dark)));
            }
        });
    }

    // HELD on glass O-130 (§0hn arm B): the same two bars over the DARK field,
    // across every seed. Expected fail until glass 10.2.0 W-0.1 (the dark
    // plate L-floor) lets `DARK_FIELD_SEED_FAITHFUL` flip — then unwrap.
    it.fails("O-130 · dark: every seed sits on the ramp's foot and on a field stop (ΔE_OK ≤ 0.06)", () => {
        for (const seed of Object.values(SEEDS)) {
            onRampFoot(seed, true);
            expect(nearestStopDelta(seed, true), seed).toBeLessThanOrEqual(0.06);
        }
    });

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

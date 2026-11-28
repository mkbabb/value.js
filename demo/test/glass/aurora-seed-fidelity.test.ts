import { describe, expect, it } from "vitest";
import type { AuroraAtoms } from "@mkbabb/glass-ui/aurora";
import { cssToOklch } from "@mkbabb/glass-ui/color";

import { DEFAULT_AURORA_ATOMS } from "../../scenes/atmosphere/aurora-atoms";
import {
    DERIVE_SEAM_FLOOR,
    FIELD_CHROMA_SHARE,
    FIELD_HUE_MIN_C,
    FIELD_HUE_REACH,
    resolveAtmosphereField,
    resolveCalibratedAtmosphere,
} from "../../app/composables/boot/atmosphere-calibration";
import { FIRST_VISIT_GROUND } from "../../app/composables/boot/ground";
import {
    DARK_FIELD_FLOOR,
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
 * Both schemes take the seed-anchored band. Light sits under the 0.98
 * ceiling; dark sits under `DARK_FIELD_CEILING` (0.55), the highest ceiling
 * at which glass's dark resting plate still leaves a light ink at 4.5:1 over
 * every stop (ss8-b09's grid). A seed above the ceiling cannot sit on the
 * dark ramp, so the dark cells gate its hue, and its nearness only where the
 * band can reach it (seed L ≤ 0.43). Glass W-0.1 lifts the ceiling to 0.98.
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

        it(`${name}: the derive seam holds (|mean L − seed L| ≥ floor, both schemes)`, () => {
            for (const dark of [false, true]) {
                const gap = Math.abs(meanL(fieldFor(seed, dark)) - cssToOklch(seed).L);
                expect(gap).toBeGreaterThanOrEqual(DERIVE_SEAM_FLOOR - 1e-9);
            }
        });

        it(`${name}: the dark field keeps the seed's hue (dominant hue ≤ 7°)`, () => {
            const seedLch = cssToOklch(seed);
            if (seedLch.C < 0.03) return; // an achromatic seed has no hue to keep
            const palette = fieldFor(seed, true);
            const x = palette.reduce((s, st) => s + st.C * Math.cos((st.h * Math.PI) / 180), 0);
            const y = palette.reduce((s, st) => s + st.C * Math.sin((st.h * Math.PI) / 180), 0);
            const dominant = (Math.atan2(y, x) * 180) / Math.PI;
            const err = Math.abs(((dominant - seedLch.h + 540) % 360) - 180);
            expect(err).toBeLessThanOrEqual(7);
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

    it("dark: a seed the band can reach sits on a field stop (L ≤ 0.43, ΔE_OK ≤ 0.06)", () => {
        const reachable = Object.values(SEEDS).filter((seed) => cssToOklch(seed).L <= 0.43);
        expect(reachable.length).toBeGreaterThan(0);
        for (const seed of reachable) {
            expect(nearestStopDelta(seed, true), seed).toBeLessThanOrEqual(0.06);
        }
    });

    it("dark: the field is luminous (mean L ≥ 0.42, ≥ 0.35 in the seam's forced step)", () => {
        // The producer's dark band held every seed near L 0.30 — the swirl
        // and blobs read as a dark wash (the owner, 2026-11-05). A seed within
        // the seam floor of the ceiling band's mean (L 0.41–0.53) takes the
        // band one floor below it instead (seedAnchoredLBand); glass W-0.1
        // removes that step from the dark range.
        for (const seed of Object.values(SEEDS)) {
            const L = cssToOklch(seed).L;
            const inStep = Math.abs(L - 0.47) < DERIVE_SEAM_FLOOR;
            expect(meanL(fieldFor(seed, true)), seed).toBeGreaterThanOrEqual(inStep ? 0.35 : 0.42);
        }
    });

    it("the first-visit ground is the default seed's field, per scheme", () => {
        const seed = "oklch(73% 0.185 2)";
        expect(FIRST_VISIT_GROUND.light).toEqual(seededGroundStops(seed, false));
        expect(FIRST_VISIT_GROUND.dark).toEqual(seededGroundStops(seed, true));
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
    it("the dark field never sinks under DARK_FIELD_FLOOR: a near-black seed keeps a lit ground (w12-ground)", () => {
        for (const seed of ["oklch(0 0 0)", "oklch(0.05 0.02 330)", "oklch(0.12 0.1 30)"]) {
            const [lo] = fieldAtomsFor(atomsFor(seed), true).lBand!;
            expect(lo).toBeGreaterThanOrEqual(DARK_FIELD_FLOOR - 1e-9);
            const dark = fieldFor(seed, true)!;
            expect(Math.min(...dark.map((s) => s.L))).toBeGreaterThanOrEqual(DARK_FIELD_FLOOR - 0.02);
            // light keeps its own band (no floor above 0.02)
            expect(fieldAtomsFor(atomsFor(seed), false).lBand![0]).toBeLessThan(DARK_FIELD_FLOOR);
        }
    });
});

/**
 * O60 C — "BROWN" READS AS BROWN. The owner (23 Nov, the picker on brown,
 * rgb 165 42 42, the whole page reading bright crimson): "this doesn't even
 * look brown. And the aurora needs tweaking." On production the derived ramp
 * ran h 2..49 round brown's h 26 (its darkest stop crimson) and painted C 0.17
 * (×1.12 saturation) behind a C 0.16 colour; the cards over it painted C 0.19.
 * The field is now held to its seed: every stop's hue within FIELD_HUE_REACH,
 * its painted chroma (stop C × the shader's saturation) at most
 * FIELD_CHROMA_SHARE of the seed's, the shader's chroma floor under the same
 * ceiling. The named colours he asked about, both schemes.
 */
describe("O60 C · the field reads as the chosen colour (hue and chroma held to the seed)", () => {
    const NAMED = ["brown", "tan", "olive", "navy", "beige", "maroon", "grey", "saddlebrown", "tomato"];
    const hueGap = (a: number, b: number) => Math.abs(((a - b + 540) % 360) - 180);

    for (const name of NAMED) {
        for (const dark of [false, true]) {
            it(`${name} (${dark ? "dark" : "light"}): hue within reach, painted chroma under the seed's share`, () => {
                const seed = cssToOklch(name);
                const config = resolveAtmosphereField(fieldAtomsFor(atomsFor(name), dark));
                const saturation = config.saturation;
                expect(saturation).toBeLessThanOrEqual(1);
                for (const stop of config.palette) {
                    if (seed.C >= FIELD_HUE_MIN_C) {
                        expect(hueGap(stop.h, seed.h), `${name} stop h ${stop.h}`).toBeLessThanOrEqual(
                            FIELD_HUE_REACH + 1e-9,
                        );
                    }
                    expect(stop.C * saturation, `${name} stop C ${stop.C}`).toBeLessThanOrEqual(
                        FIELD_CHROMA_SHARE * seed.C + 1e-9,
                    );
                }
                // the shader lifts a pale zone toward vividness × 0.115 (× 1.18 on a dim
                // field): that floor stays under the same ceiling
                expect((config.vividness ?? 1) * 0.115 * 1.18).toBeLessThanOrEqual(FIELD_CHROMA_SHARE * seed.C + 1e-9);
            });
        }
    }

    it("brown's ramp keeps its shape: the stops still differ in chroma and walk the hue in order", () => {
        const palette = resolveAtmosphereField(fieldAtomsFor(atomsFor("brown"), true)).palette;
        const Cs = palette.map((s) => s.C);
        expect(Math.max(...Cs) - Math.min(...Cs)).toBeGreaterThan(0.01);
        const hs = palette.map((s) => s.h);
        for (let i = 1; i < hs.length; i++) expect(hs[i]!).toBeGreaterThan(hs[i - 1]!);
    });
});

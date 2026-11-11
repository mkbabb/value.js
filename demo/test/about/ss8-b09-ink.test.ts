/**
 * SS8 B09 (About · ColorNutritionLabel) — the two ink rows cured at the root.
 *
 * SS8-0257b (C-2): `contrastInkFor` returned null for 151 of 13,332 opaque
 * OKLCh fills (L 0.40–0.82, C ≥ 0.30), so the hovered graph node painted the
 * live colour with no `color:` at all. The census below is the probe's own
 * grid (`B09-cnl.mjs c2`): every opaque fill must get a neutral ink, and that
 * ink must clear 4.5:1 on the fill a screen can paint.
 *
 * SS8-0259 (D-11 · CNL-17): the component-name ink is certified on the
 * resting plate over the page ambient, and the ambient was the field
 * palette's MEAN L. The dark About card sat on the field's brighter crimson
 * region (the live plate under the glyphs read rgb(126 25 44)), and the ink
 * read 4.31:1 there. In dark the ink must clear the 4.5:1 floor on the
 * resting plate composited over EVERY stop of the field, and on the measured
 * plate. Light keeps the mean referent (its field can span the 4.58:1 dead
 * band, where no single ink clears every stop; the arm read 5.64:1 live).
 */
import { describe, expect, it } from "vitest";
import {
    contrastRatio,
    convertColor,
    mapColorToGamut,
    mixColors,
    oklch,
    parseCssColor,
    safeAccentColor,
    type Color,
} from "@mkbabb/value.js/color";
import {
    certifyAccentInk,
    contrastInkFor,
    PRODUCER_BACKDROP_SATURATE,
    producerRungTint,
    resolveFieldAmbientLightness,
    resolveFieldPlateReferent,
    resolvePlateInk,
    resolveSurfaceLightness,
    saturateSrgb,
    TEXT_CONTRAST_FLOOR,
} from "../../color-session/ink";
import {
    resolveAtmosphereField,
    seedAnchoredLBand,
} from "../../app/composables/boot/atmosphere-calibration";
import { DARK_FIELD_CEILING, fieldAtomsFor } from "../../app/composables/boot/seeded-ground";
import { DEFAULT_AURORA_ATOMS } from "../../scenes/atmosphere/aurora-atoms";

const toOklch = (css: string): Color<"oklch"> => {
    const parsed = parseCssColor(css);
    if (!parsed.ok) throw new Error(`unparseable ${css}`);
    const converted = convertColor(parsed.value, "oklch");
    if (!converted.ok) throw new Error(`unconvertible ${css}`);
    return converted.value;
};

/** True iff `ink` already clears `floor` on the opaque `ground` (the guard
 *  hands it back unwalked). */
const clears = (ink: Color<"oklch">, ground: Color<"oklch">, floor = TEXT_CONTRAST_FLOOR) => {
    const result = safeAccentColor(ink, ground, { minimumRatio: floor, gamut: "srgb" });
    return result.ok && Math.abs((result.value.channels[0] as number) - (ink.channels[0] as number)) < 1e-6;
};

describe("SS8-0257b · contrastInkFor is total over opaque fills", () => {
    // X.W11.c2 (COHESION §0gn.1, the D59 precedent): profiled per phase
    // (local ×2, 13,332 cells, ~1.0 s): contrastInkFor ~55% (its gamut map
    // ~45% of that, the endpoint walk the rest) · the oracle's own gamut map
    // ~23% · the oracle's safeAccentColor check ~20% · parsing ~4%. That is
    // the census's inherent work; the one hoistable per-cell cost (re-parsing
    // the ink, which takes only two values) is memoised below. CI read 5,410 ms
    // on Node 22 and 3,310 ms on Node 24 against vitest's 5 s default, so the
    // census carries an explicit 20 s timeout: 3.7x the worst CI reading.
    it("every cell of the probe's census grid gets a neutral ink that clears 4.5:1", () => {
        const nulls: string[] = [];
        const fails: string[] = [];
        const inks = new Map<string, Color<"oklch">>();
        const inkOklch = (ink: string) => {
            let color = inks.get(ink);
            if (!color) inks.set(ink, (color = toOklch(ink)));
            return color;
        };
        for (let i = 0; i <= 100; i++) {
            for (let j = 0; j <= 10; j++) {
                for (let h = 0; h < 360; h += 30) {
                    const css = `oklch(${(i / 100).toFixed(2)} ${(j * 0.05).toFixed(2)} ${h})`;
                    const ink = contrastInkFor(css);
                    if (ink === null) {
                        nulls.push(css);
                        continue;
                    }
                    const painted = mapColorToGamut(toOklch(css), "srgb");
                    if (!painted.ok || !clears(inkOklch(ink), painted.value)) fails.push(`${css} -> ${ink}`);
                }
            }
        }
        expect(nulls.length, nulls.slice(0, 5).join(", ")).toBe(0);
        expect(fails.length, fails.slice(0, 5).join(", ")).toBe(0);
    }, 20_000);

    it("an in-gamut fill keeps its WCAG-maximal endpoint", () => {
        expect(contrastInkFor("oklch(0.95 0.02 90)")).toBe("oklch(0 0 0)");
        expect(contrastInkFor("oklch(0.2 0.05 260)")).toBe("oklch(1 0 0)");
    });

    it("a non-colour or a translucent fill still has no single ground", () => {
        expect(contrastInkFor("not-a-colour")).toBeNull();
        expect(contrastInkFor("oklch(0.5 0.1 30 / 0.5)")).toBeNull();
    });
});

/** The resting plate as the browser paints it: the producer rung over a
 *  field stop, source-over in sRGB. */
const restingPlateOver = (stop: { L: number; C: number; h: number }, dark: boolean) => {
    const raw = oklch(stop.L, stop.C, stop.h, 1);
    if (!raw.ok) throw new Error("bad stop");
    const ground = mapColorToGamut(raw.value, "srgb");
    if (!ground.ok) throw new Error("bad stop");
    const tint = producerRungTint("resting", dark);
    const mixed = mixColors(ground.value, tint.color, tint.alpha, { space: "rgb" });
    if (!mixed.ok) throw new Error("bad mix");
    const out = convertColor(mixed.value, "oklch");
    if (!out.ok) throw new Error("bad mix");
    return out.value;
};

/** The field the app resolves in that scheme (useAtmosphere's `fieldAtoms`:
 *  the seed-anchored band, under the 0.98 ceiling in light and under
 *  `DARK_FIELD_CEILING` in dark until glass W-0.1). */
const fieldFor = (seed: string, dark: boolean) =>
    resolveAtmosphereField(
        fieldAtomsFor({ ...structuredClone(DEFAULT_AURORA_ATOMS), seed }, dark),
    ).palette;

const componentInkOver = (seed: string, field: Parameters<typeof resolveFieldAmbientLightness>[0], dark: boolean) => {
    const ambient = resolveFieldAmbientLightness(field, dark);
    return certifyAccentInk(seed, resolveSurfaceLightness("resting", ambient, dark));
};
const componentInk = (seed: string, dark: boolean) =>
    componentInkOver(seed, fieldFor(seed, dark), dark);

describe("SS8-0259 · the component ink clears the floor on the rendered plate", () => {
    it("the default seed's dark ink clears 4.5:1 on the measured plate rgb(126 25 44)", () => {
        const ink = toOklch(componentInk("oklch(73% 0.185 2)", true));
        expect(clears(ink, toOklch("rgb(126 25 44)"))).toBe(true);
    });

    const SEEDS = [
        "oklch(73% 0.185 2)",
        "oklch(0.66 0.16 28)",
        "oklch(0.7 0.15 145)",
        "oklch(0.6 0.2 265)",
        "oklch(0.85 0.17 95)",
        "oklch(0.5 0.12 320)",
    ];
    for (const seed of SEEDS) {
        it(`dark · ${seed}: the ink clears 4.5:1 over every field stop`, () => {
            const ink = toOklch(componentInk(seed, true));
            const failing = fieldFor(seed, true)
                .filter((stop) => !clears(ink, restingPlateOver(stop, true)))
                .map((stop) => `L${stop.L.toFixed(3)} C${stop.C.toFixed(3)} h${stop.h.toFixed(1)}`);
            expect(failing, failing.join("; ")).toEqual([]);
        });
    }

    it("light keeps the field's mean L (the arm read 5.64:1 live)", () => {
        for (const seed of SEEDS) {
            const field = fieldFor(seed, false);
            const mean = field.reduce((sum, stop) => sum + stop.L, 0) / field.length;
            expect(resolveFieldAmbientLightness(field, false)).toBeCloseTo(mean, 12);
        }
    });
});

/** The ratio of two opaque colours (the library's WCAG ratio). */
const ratioOf = (a: Color<"oklch">, b: Color<"oklch">) => {
    const r = contrastRatio(a, b);
    if (!r.ok) throw new Error("bad ratio");
    return r.value;
};

/** The resting plate over a field stop as the browser paints it: the T-45
 *  carrier's backdrop `saturate()` first, then the veil, source-over in sRGB. */
const paintedPlateOver = (stop: { L: number; C: number; h: number }) => {
    const raw = oklch(stop.L, stop.C, stop.h, 1);
    if (!raw.ok) throw new Error("bad stop");
    const ground = mapColorToGamut(raw.value, "srgb");
    if (!ground.ok) throw new Error("bad stop");
    const backdrop = saturateSrgb(ground.value, PRODUCER_BACKDROP_SATURATE);
    const tint = producerRungTint("resting", true);
    const mixed = mixColors(backdrop, tint.color, tint.alpha, { space: "rgb" });
    if (!mixed.ok) throw new Error("bad mix");
    const out = convertColor(mixed.value, "oklch");
    if (!out.ok) throw new Error("bad mix");
    return out.value;
};

describe("o1109c2 · the dark plate ink is certified on the plate as painted", () => {
    // CI read the About caption at 4.49:1 (o11, dark 390, the default seed)
    // over a plate whose ink was certified at 5.75:1: the referent was the
    // raw top stop, but the plate sees the field through its carrier's
    // `saturate(1.5)`, which lifts a saturated stop's luminance (modelled
    // here at 4.66:1). The model must tell the truth: over every stop as
    // painted, the ink reads what it was certified at (2 % for the neutral
    // stand-in), and never under 4.5.
    const SEEDS = [
        "oklch(73% 0.185 2)",
        "oklch(0.66 0.16 28)",
        "oklch(0.7 0.15 145)",
        "oklch(0.6 0.2 265)",
        "oklch(0.85 0.17 95)",
        "oklch(0.5 0.12 320)",
    ];
    for (const seed of SEEDS) {
        it(`dark · ${seed}: the painted plate reads the certified ratio`, () => {
            const field = fieldFor(seed, true);
            const surfaceL = resolveSurfaceLightness("resting", resolveFieldPlateReferent(field, true), true);
            const ink = toOklch(resolvePlateInk(surfaceL, true));
            const certified = ratioOf(ink, toOklch(`oklch(${surfaceL} 0 0)`));
            const painted = Math.min(...field.map((stop) => ratioOf(ink, paintedPlateOver(stop))));
            expect(painted, `certified ${certified.toFixed(3)}, painted ${painted.toFixed(3)}`).toBeGreaterThanOrEqual(certified * 0.98);
            expect(painted).toBeGreaterThanOrEqual(TEXT_CONTRAST_FLOOR);
        });
    }
});

describe("the dark field's ceiling · the shipped band over the seed grid", () => {
    // The dark field takes the seed-anchored band under `DARK_FIELD_CEILING`.
    // The grid runs every seed through the band the app ships (`fieldAtomsFor`
    // → `resolveAtmosphereField`): L 0.30–0.70 by 0.02 × 24 hues × 3 chromas.
    // The ceiling is the highest that clears the ink law on every cell; 0.68
    // must fail somewhere, or the grid could not tell a ceiling from none.
    const seeds: string[] = [];
    for (let i = 0; i <= 20; i++)
        for (let h = 0; h < 360; h += 15)
            for (const C of [0.04, 0.12, 0.22]) seeds.push(`oklch(${(0.3 + 0.02 * i).toFixed(2)} ${C} ${h})`);

    const failing = (ceiling: number) =>
        seeds.filter((seed) => {
            const atoms = { ...structuredClone(DEFAULT_AURORA_ATOMS), seed };
            const field = resolveAtmosphereField({ ...atoms, lBand: seedAnchoredLBand(seed, ceiling)! }).palette!;
            const ink = toOklch(componentInkOver(seed, field, true));
            return !field.every((stop) => clears(ink, restingPlateOver(stop, true)));
        });

    it("the dark field is the seed-anchored band under the ceiling", () => {
        for (const seed of seeds.filter((_, i) => i % 97 === 0)) {
            const atoms = { ...structuredClone(DEFAULT_AURORA_ATOMS), seed };
            expect(fieldAtomsFor(atoms, true).lBand).toEqual(seedAnchoredLBand(seed, DARK_FIELD_CEILING));
        }
    });

    it("GREEN at the shipped ceiling", () => {
        const fails = failing(DARK_FIELD_CEILING);
        expect(fails.length, fails.slice(0, 5).join(", ")).toBe(0);
    }, 120_000);

    it("RED at 0.68 (the grid can see a ceiling)", () => {
        expect(failing(0.68).length).toBeGreaterThan(0);
    }, 120_000);
});

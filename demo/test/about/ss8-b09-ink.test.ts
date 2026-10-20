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
    producerRungTint,
    resolveFieldAmbientLightness,
    resolveSurfaceLightness,
    TEXT_CONTRAST_FLOOR,
} from "../../color-session/ink";
import { resolveAtmosphereField } from "../../app/composables/boot/atmosphere-calibration";
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
    it("every cell of the probe's census grid gets a neutral ink that clears 4.5:1", () => {
        const nulls: string[] = [];
        const fails: string[] = [];
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
                    if (!painted.ok || !clears(toOklch(ink), painted.value)) fails.push(`${css} -> ${ink}`);
                }
            }
        }
        expect(nulls.length, nulls.slice(0, 5).join(", ")).toBe(0);
        expect(fails.length, fails.slice(0, 5).join(", ")).toBe(0);
    });

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

/** The field the app resolves (useAtmosphere's `fieldAtoms`: dark takes the
 *  producer's dark band). */
const fieldFor = (seed: string, dark: boolean) =>
    resolveAtmosphereField({
        ...structuredClone(DEFAULT_AURORA_ATOMS),
        seed,
        ...(dark ? { lightnessScheme: "dark" as const } : {}),
    }).palette;

const componentInk = (seed: string, dark: boolean) => {
    const ambient = resolveFieldAmbientLightness(fieldFor(seed, dark), dark);
    return certifyAccentInk(seed, resolveSurfaceLightness("resting", ambient, dark));
};

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

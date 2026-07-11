/**
 * T.W6.5-P (T-33a) — THE DYNAMIC-MAX VALUE-DOMAIN LAW oracle (the wave's
 * §Hard gate 3 row: "the clamp oracle green — 999 → the space max,
 * per-space").
 *
 * The seam under test is the demo model write gate's clamp
 * (`useColorPipeline.clampColorToSpaceDomain`) — DEMO-side BY DESIGN: the
 * library parser legitimately parses out-of-range CSS (`lab(40% 999 47)` is
 * valid CSS Color 4), so the probe drives the SAME normalized colors the
 * pipeline stores (built through the library's own `colorUnit2` /
 * `normalizeColorUnitComponent`, never hand-normalized) and asserts the
 * denormalized landing per channel class:
 *
 *   - linear channels: 999 lands AT the space bound (lab a → 125; kelvin →
 *     its 1000 floor — "dynamically within that color space's ranges");
 *   - hue channels: WRAP, never clamp (999° ≡ 279°; 360° stays 360°);
 *   - CSS `none` (NaN) passes through untouched (the library's law);
 *   - in-domain values are bit-identical (the clamp is invisible to every
 *     legal color — the fidelity floor).
 */

import { describe, expect, it } from "vitest";

import {
    COLOR_SPACE_RANGES,
    getColorSpaceBound,
    getColorSpaceDenormUnit,
    type ColorSpace,
} from "@src/units/color/constants";
import { CYLINDRICAL_HUE_COMPONENT } from "@src/units/color/mix";
import {
    colorUnit2,
    normalizeColorUnit,
    normalizeColorUnitComponent,
} from "@src/units/color/normalize";
import { parseCSSColor } from "@src/parsing/color";
import { clampColorToSpaceDomain } from "@composables/color/valueDomain";

const SPACES = Object.keys(COLOR_SPACE_RANGES) as ColorSpace[];

/** The kelvin channel is stored PHYSICAL by library convention (see
 *  valueDomain.ts "THE KELVIN EXCEPTION") — the helpers below thread it. */
const isPhysical = (space: ColorSpace, component: string) =>
    space === "kelvin" && component === "kelvin";

/** A normalized in-gamut seed color in the target space — built through the
 *  library's own parse + convert path (the exact objects the model stores). */
function seedColor(space: ColorSpace) {
    const parsed = normalizeColorUnit(parseCSSColor("rgb(120 90 60)"));
    return colorUnit2(parsed, space, true, false, false);
}

/** Write a DENORM value onto a channel in the model's own storage domain. */
function stored(space: ColorSpace, component: string, denormV: number): number {
    if (isPhysical(space, component)) return denormV;
    return normalizeColorUnitComponent(denormV, undefined, space, component)
        .value;
}

/** Read a channel's stored value back in the space's own output domain. */
function landed(space: ColorSpace, component: string, v: number): number {
    if (isPhysical(space, component)) return v;
    return normalizeColorUnitComponent(v, undefined, space, component, true)
        .value;
}

describe("T-33a — the value-domain clamp at the model write seam", () => {
    it("999 lands AT the space bound — every space, every linear channel", () => {
        for (const space of SPACES) {
            const hueComponent = CYLINDRICAL_HUE_COMPONENT[space];
            for (const component of Object.keys(COLOR_SPACE_RANGES[space])) {
                if (component === hueComponent) continue; // hue wraps (below)
                const color = seedColor(space);
                color.value[component].value = stored(space, component, 999);
                clampColorToSpaceDomain(color);
                const unit = getColorSpaceDenormUnit(space, component);
                const bound = getColorSpaceBound(space, component, unit);
                const got = landed(space, component, color.value[component].value);
                // 999 clamps to the nearer bound end in the NUMBER domain
                // (kelvin's floor is 1000 — 999 lands at the MIN: the law is
                // "within the ranges", not "at the max").
                const numBound = getColorSpaceBound(space, component, "");
                const expected =
                    999 > numBound.max
                        ? bound.max
                        : 999 < numBound.min
                          ? bound.min
                          : landed(space, component, stored(space, component, 999));
                expect(
                    got,
                    `${space}.${component}: 999 → ${got} (expected ${expected})`,
                ).toBeCloseTo(expected, 6);
            }
        }
    });

    it("-999 lands AT the space min — every space, every linear channel", () => {
        for (const space of SPACES) {
            const hueComponent = CYLINDRICAL_HUE_COMPONENT[space];
            for (const component of Object.keys(COLOR_SPACE_RANGES[space])) {
                if (component === hueComponent) continue;
                const color = seedColor(space);
                color.value[component].value = stored(space, component, -999);
                clampColorToSpaceDomain(color);
                const unit = getColorSpaceDenormUnit(space, component);
                const bound = getColorSpaceBound(space, component, unit);
                const got = landed(space, component, color.value[component].value);
                expect(
                    got,
                    `${space}.${component}: -999 → ${got}`,
                ).toBeCloseTo(bound.min, 6);
            }
        }
    });

    it("hue WRAPS, never clamps: 999° ≡ 279°, -90° ≡ 270°, 360° stays 360°", () => {
        for (const space of Object.keys(
            CYLINDRICAL_HUE_COMPONENT,
        ) as ColorSpace[]) {
            const h = CYLINDRICAL_HUE_COMPONENT[space]!;
            for (const [input, wrapped] of [
                [999, 279],
                [-90, 270],
                [360, 360],
                [180, 180],
            ] as const) {
                const color = seedColor(space);
                color.value[h].value = stored(space, h, input);
                clampColorToSpaceDomain(color);
                expect(
                    landed(space, h, color.value[h].value),
                    `${space}.${h}: ${input}° wraps to ${wrapped}°`,
                ).toBeCloseTo(wrapped, 6);
            }
        }
    });

    it("CSS `none` (NaN) passes through untouched (the library's propagation law)", () => {
        const color = seedColor("lab");
        color.value.a.value = Number.NaN;
        clampColorToSpaceDomain(color);
        expect(Number.isNaN(color.value.a.value)).toBe(true);
    });

    it("in-domain colors are bit-identical through the clamp (the fidelity floor)", () => {
        for (const space of SPACES) {
            const color = seedColor(space);
            const before = Object.fromEntries(
                color.value.keys().map((k) => [k, color.value[k].value]),
            );
            clampColorToSpaceDomain(color);
            for (const k of color.value.keys()) {
                expect(
                    color.value[k].value,
                    `${space}.${String(k)} untouched`,
                ).toBe(before[k as string]);
            }
        }
    });

    it("the owner's exact case: lab(40% 999 47) deep-link inks a = 125 (the space max)", () => {
        // The URL path parses → normalizes → converts to the display space —
        // the same product `useColorUrl` hands `updateModel`.
        const parsed = normalizeColorUnit(parseCSSColor("lab(40% 999 47)"));
        const converted = colorUnit2(parsed, "lab", true, false, false);
        clampColorToSpaceDomain(converted);
        expect(landed("lab", "a", converted.value.a.value)).toBeCloseTo(125, 6);
        expect(landed("lab", "b", converted.value.b.value)).toBeCloseTo(47, 4);
        expect(landed("lab", "l", converted.value.l.value)).toBeCloseTo(40, 4);
    });
});

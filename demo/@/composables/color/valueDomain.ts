/**
 * valueDomain — THE DYNAMIC-MAX VALUE-DOMAIN LAW (T.W6.5-P · T-33a; owner
 * verbatim, t33-audit-01: "have a maximal value that's possible (dynamically
 * within that color space's ranges hereof)").
 *
 * Every color that LANDS on the demo model enters its space's own
 * `COLOR_SPACE_RANGES` domain at the ONE write gate
 * (`useColorPipeline.updateModel`) — a URL deep-link `lab(40% 999 47)`, a
 * typed readout cell, a palette apply all ink AT MOST the space max (lab a:
 * 125), never a pathological width — so the readout reservation table's
 * static worst case (`readoutReservation.ts`, derived from the same
 * `getColorSpaceBound` bounds) is TRUE BY CONSTRUCTION.
 *
 * Per-channel semantics:
 *   - linear channels CLAMP to the bound — the model stores components
 *     normalized to [0,1], and normalization is the linear [min,max]→[0,1]
 *     map, so the normalized clamp IS the denormalized [min,max] clamp;
 *   - HUE channels WRAP (the hue circle): `hsl(540 …)` IS `hsl(180 …)` per
 *     CSS — a clamp to 360 would repaint the color; the width premise holds
 *     either way (a wrapped hue never exceeds the table's 360);
 *   - non-finite components pass through untouched (CSS `none` = NaN
 *     propagates through conversions per CSS Color 4 — the library's law).
 *
 * DEMO-side BY DESIGN (research §6.1 + the wave's no-src-write law): the
 * library parser keeps parsing out-of-range CSS lab() legitimately — the
 * DOMAIN is this picker instrument's, not the language's.
 *
 * Pure module — no Vue, no DOM (the `ink.ts` shape). Unit-probed by
 * `test/value-domain-clamp.test.ts` (the wave's clamp oracle).
 */

import type { ColorSpace } from "@mkbabb/value.js/color";
import {
    CYLINDRICAL_HUE_COMPONENT,
    getColorSpaceBound,
} from "@mkbabb/value.js/color";
import { clamp } from "@mkbabb/value.js/math";
import type { ParsedColorUnit } from "@mkbabb/value.js/parsing";

/**
 * Clamp a model color into its space's value domain — IN PLACE (callers of
 * the write gate hand a fresh clone/parse product by the `updateModel`
 * contract, and the post-write derivations — stableHue, the meters — must
 * read the clamped truth through the same reference). Returns its argument.
 *
 * THE KELVIN EXCEPTION (library convention, encoded not sniffed): the
 * `kelvin` channel is stored PHYSICAL (1000..40000 K), never normalized —
 * `rgb2kelvin` emits physical and `kelvin2rgb` clamps physical at entry
 * (src/units/color/conversions/kelvin.ts) — so its domain clamp runs in the
 * space's own number bounds. A [0,1] clamp there would repaint every
 * kelvin pick to 40000 K (caught by the fidelity row of the clamp oracle).
 */
export const clampColorToSpaceDomain = (
    color: ParsedColorUnit,
): ParsedColorUnit => {
    const space = color.value.colorSpace as ColorSpace;
    const hueComponent = CYLINDRICAL_HUE_COMPONENT[space];
    for (const component of color.value.keys()) {
        const channel = color.value[component];
        const v = channel?.value;
        if (typeof v !== "number" || !Number.isFinite(v)) continue;
        if (component === hueComponent) {
            // Wrap into [0,1] of the hue turn; 1 (= 360°) stays itself.
            if (v < 0 || v > 1) channel.value = v - Math.floor(v);
        } else if (space === "kelvin" && component === "kelvin") {
            const { min, max } = getColorSpaceBound(space, component, "");
            const next = clamp(v, min, max);
            if (next !== v) channel.value = next;
        } else {
            const next = clamp(v, 0, 1);
            if (next !== v) channel.value = next;
        }
    }
    return color;
};

/**
 * THE CHANNEL-DESCRIPTOR TABLE — what each channel of each display space IS,
 * keyed by the library's EXACT channel id. The console rail's tooltip is its
 * one consumer (`ComponentSliders/ConsoleRail.vue`).
 *
 * WHY THE TABLE IS KEYED (X-W9.h, CC-081 · K-10's ICtCp limb). The rail used to
 * hold POSITIONAL rows (`["Intensity (I)", "Ct (tritan)", "Cp (protan)"]`) and
 * recover the id by prefix-matching the prose — `c.startsWith(upper) ||
 * c.startsWith(component)`. Prefixes are not identifiers: `cp` matched "Ct
 * (tritan)" first and the protan axis wore the tritan axis's description, while
 * `jz` matched nothing and the tooltip silently printed the bare key "jz". The
 * ids are the library's own, published as the tuple labels of `ChannelsBySpace`
 * (`src/color/model.ts`) and echoed by `PICKER_CHANNELS[space][n].key`; this
 * table now spells them, so a lookup is an identity, not a guess. No new
 * library export was minted for the vocabulary: a second one would be a
 * duplicate authority (W9.md:309).
 *
 * WHY ONLY DESCRIPTORS LIVE HERE. This module used to restate each space's
 * prose facts (name, definition, white point, gamut, applications, ...). X-W6
 * (`space-catalog.ts`, X:CSS-1) made `SPACE_CATALOG` the ONE total record over
 * `DisplayColorSpace` and moved the nutrition label onto it, which left those
 * fields here with zero readers and a docstring that still claimed
 * `ColorNutritionLabel.vue` read them. Measured before removal: all **358**
 * field values across the 13 rows appear verbatim in `space-catalog.ts`, and
 * the only import of this module reads `components` alone. The duplicate is
 * retired rather than re-keyed twice; the facts have one home.
 *
 * TOTALITY, TWO WAYS. Space totality is STRUCTURAL: the annotation is
 * `Record<DisplayColorSpace, ...>`, so a space the product offers without a
 * descriptor row is a COMPILE ERROR — the five wide-gamut RGB encodings were
 * exactly that hole, and their channels printed bare keys. Id exactness cannot
 * be structural, because TypeScript tuple element labels are syntax, not types:
 * it is measured instead by G32's node probe over all 17 spaces x their
 * `ChannelsBySpace` ids (`docs/tranches/X/waves/evidence/W9/`).
 *
 * `hex` carries RGB's channels: `resolveColorSpace("hex")` is `"rgb"`, so the
 * rail shows r/g/b, and Hex names them in its own encoding's terms.
 */
import type { DisplayColorSpace } from "./color-model";

/** One space's channel descriptors, keyed by the library's exact channel ids. */
type ChannelDescriptors = Readonly<{
    components: Readonly<Record<string, string>>;
}>;

export const colorSpaceInfo: Readonly<
    Record<DisplayColorSpace, ChannelDescriptors>
> = {
    rgb: { components: { r: "Red", g: "Green", b: "Blue" } },

    hsl: { components: { h: "Hue", s: "Saturation", l: "Lightness" } },

    hsv: { components: { h: "Hue", s: "Saturation", v: "Value" } },

    hwb: { components: { h: "Hue", w: "Whiteness", b: "Blackness" } },

    lab: {
        components: {
            l: "L* (Lightness)",
            a: "a* (Green-Red)",
            b: "b* (Blue-Yellow)",
        },
    },

    lch: {
        components: { l: "L (Lightness)", c: "C (Chroma)", h: "h (hue)" },
    },

    oklab: {
        components: {
            l: "L (Lightness)",
            a: "a (Green-Red)",
            b: "b (Blue-Yellow)",
        },
    },

    oklch: {
        components: { l: "L (Lightness)", c: "C (Chroma)", h: "h (hue)" },
    },

    xyz: { components: { x: "X", y: "Y", z: "Z" } },

    kelvin: { components: { kelvin: "Temperature (K)" } },

    "srgb-linear": {
        components: {
            r: "Red (linear)",
            g: "Green (linear)",
            b: "Blue (linear)",
        },
    },

    "display-p3": { components: { r: "Red", g: "Green", b: "Blue" } },

    "a98-rgb": { components: { r: "Red", g: "Green", b: "Blue" } },

    "prophoto-rgb": { components: { r: "Red", g: "Green", b: "Blue" } },

    rec2020: { components: { r: "Red", g: "Green", b: "Blue" } },

    ictcp: {
        components: {
            i: "Intensity (I)",
            ct: "Ct (tritan)",
            cp: "Cp (protan)",
        },
    },

    jzazbz: {
        components: {
            jz: "Lightness (Jz)",
            az: "az (red-green)",
            bz: "bz (yellow-blue)",
        },
    },

    hex: {
        components: {
            r: "Red (00-FF)",
            g: "Green (00-FF)",
            b: "Blue (00-FF)",
        },
    },
};

<script setup>
import { xyz2oklab, oklab2xyz, getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Katex } from "@components/custom/katex";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";


const { l, a, b } = getFormattedColorSpaceRange("oklab");

</script>

### Attributes

-   `L`: Lightness ({{l.min}} to {{l.max}})
-   `a`: Green-Red axis ({{a.min}} to {{a.max}})
-   `b`: Blue-Yellow axis ({{b.min}} to {{b.max}})

### Historical Context

Developed by Bjorn Ottosson in 2020, OKLab addresses the perceptual non-uniformities that plague CIE Lab. The name is either "Ottosson's Kolors" or a modest assertion that the space is "OK"—good enough for practical work. What it actually delivers is considerably better than that.

---

## Key Characteristics

1. **Perceptual uniformity** superior to Lab—equal Euclidean distances correspond more faithfully to equal perceived color differences.
2. **Hue linearity**: mixtures of two colors maintain consistent hue, a property Lab struggles with in the blue-purple region.
3. **Consistent lightness**: the `L` component tracks human brightness perception across the full gamut.
4. **Computational efficiency**: the conversion path (XYZ → LMS cube root → linear transform) is leaner than Lab's piecewise `f(t)` function.

### Advantages

-   Better perceptual uniformity than Lab for interpolation and gradient generation
-   Hue-linear mixing—critical for palette generation and color-mix()
-   Consistent lightness across hues (blue and yellow at the same `L` look equally bright)
-   Efficient to compute; no piecewise branching in the forward path

### Disadvantages

-   Relatively new; less tooling and institutional support than Lab
-   Not an ICC or ISO standard (yet)
-   Still an approximation of human color perception—no color space is perfect

### Color Gamut

OKLab encompasses all perceivable colors, larger than any RGB or CMYK gamut. Out-of-gamut values are valid in the space; they simply can't be displayed without gamut mapping.

---

## Color Model

### Components

1. **`L` (Lightness)**:
   `L = 0 \text{ (black) to } 1 \text{ (white)}`

2. **`a` (Green-Red axis)**:
   `a < 0 \text{ (green) to } a > 0 \text{ (red)}`

3. **`b` (Blue-Yellow axis)**:
   `b < 0 \text{ (blue) to } b > 0 \text{ (yellow)}`

### Representation

Colors sit in a three-dimensional Cartesian space. `L` runs vertically; the `a`/`b` plane at each lightness level describes chromaticity. Structurally identical to Lab, but the coordinate system is derived from a different LMS basis, yielding the improved perceptual properties.

---

## Color Conversions

### XYZ to OKLab

The conversion involves a non-linear transformation of LMS cone responses:

<div class="language-typescript">
    {{ xyz2oklab }}
</div>

### OKLab to XYZ

The inverse path:

<div class="language-typescript">
    {{ oklab2xyz }}
</div>

---

## Applications

1. **Color interpolation**: the default interpolation space in CSS Color Level 4's `color-mix()`.
2. **Palette generation**: perceptually balanced palettes with consistent lightness steps.
3. **Gamut mapping**: value.js uses OKLab as the working space for Ottosson's analytical sRGB gamut mapping algorithm.
4. **Image processing**: color grading, correction, and manipulation benefit from the improved uniformity.
5. **Accessible design**: consistent lightness makes it easier to maintain contrast ratios across hue variations.

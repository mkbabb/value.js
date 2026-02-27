<script setup>
import { rgb2xyz, xyz2rgb, getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Katex } from "@components/custom/katex";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";


const { r, g, b } = getFormattedColorSpaceRange("rgb");

</script>

### Attributes

-   `R`: Red component ({{r.min}} to {{r.max}})
-   `G`: Green component ({{g.min}} to {{g.max}})
-   `B`: Blue component ({{b.min}} to {{b.max}})

### Historical Context

RGB emerged alongside color television in the mid-20th century, grounded in trichromatic color vision theory—three cone cell types in the retina, each sensitive to a different band of wavelengths. It's the native language of display hardware, mapping directly to the red, green, and blue subpixels of a screen.

---

## Key Characteristics

1. **Additive model**: colors are produced by combining light at different intensities. R + G + B at full intensity yields white.
2. **Device-dependent**: the same RGB triplet can look different on different displays without a shared profile (hence sRGB standardization).
3. **Hardware-native**: values map directly to display hardware, making RGB the *lingua franca* of digital color.

### Advantages

-   Direct hardware implementation—no conversion needed for display
-   Intuitive for digital work (web, screens, rendering)
-   Wide adoption across all digital media standards

### Disadvantages

-   Not perceptually uniform—equal numerical steps don't produce equal perceptual steps
-   Device-dependent without calibration
-   Unintuitive for artistic color mixing (adjusting R to make a color "warmer" is indirect at best)

### Color Gamut

The sRGB gamut forms a cube from (0,0,0) black to (1,1,1) white. It covers a modest triangle in CIE xy chromaticity—roughly 35% of visible colors. Wider-gamut variants (Display P3, Adobe RGB, Rec. 2020) expand this triangle.

---

## Color Model

### Components

1. **`R` (Red)**:
   `R = 0 \text{ (no red) to } 1 \text{ (full red intensity)}`

2. **`G` (Green)**:
   `G = 0 \text{ (no green) to } 1 \text{ (full green intensity)}`

3. **`B` (Blue)**:
   `B = 0 \text{ (no blue) to } 1 \text{ (full blue intensity)}`

### sRGB and Linear RGB

Two variants matter in practice:

-   **sRGB**: the standard for consumer displays and web content, with a piecewise gamma curve (~2.2 effective gamma). All CSS `rgb()` values are sRGB.
-   **Linear RGB**: the same primaries without gamma correction. Used as an intermediate step in color math—blending, matrix transforms, and conversions to XYZ all operate in linear light.

The transfer function between them is a piecewise curve: linear below a threshold (~0.04045), power-law above.

---

## Color Conversions

### RGB to XYZ

Converts from sRGB to linear RGB (inverse gamma), then applies the sRGB-to-XYZ matrix:

<div class="language-typescript">
    {{ rgb2xyz }}
</div>

### XYZ to RGB

The inverse: matrix transform to linear RGB, then gamma encoding:

<div class="language-typescript">
    {{ xyz2rgb }}
</div>

---

## Applications

1. **Display rendering**: the final output space for all screen-based content.
2. **Web design**: CSS `rgb()`, hex codes, and named colors all resolve to sRGB.
3. **Image formats**: JPEG, PNG, and WebP store pixel data in sRGB.
4. **Compositing and blending**: typically done in linear RGB to avoid gamma-induced artifacts.
5. **Color conversion hub**: sRGB ↔ XYZ is the foundational bridge to every other color space in value.js.

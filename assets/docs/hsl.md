<script setup>
import { rgb2hsl, hsl2rgb, getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Katex } from "@components/custom/katex";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";


const { h, s, l } = getFormattedColorSpaceRange("hsl");

</script>

### Attributes

-   `H`: Hue ({{h.min}} to {{h.max}})
-   `S`: Saturation ({{s.min}} to {{s.max}})
-   `L`: Lightness ({{l.min}} to {{l.max}})

### Historical Context

HSL was developed in the 1970s as part of computer graphics research—an attempt to give humans a more intuitive handle on color than raw RGB triplets. It separates **hue** (the color itself) from **saturation** (intensity) and **lightness** (brightness), mapping neatly onto how people talk about color in practice.

---

## Key Characteristics

1. **Cylindrical representation**: hue as angle, saturation as radius, lightness as height. Visualized as a double-cone or cylinder.
2. **Intuitive adjustment**: changing one component produces predictable variations—useful for deriving palettes and tints/shades.
3. **Same gamut as sRGB**: HSL is a coordinate transform of RGB, not an expansion.

### Advantages

-   Intuitive for color selection and palette generation
-   Easy to create tints (raise L), shades (lower L), and tones (lower S)
-   Native CSS support via `hsl()`
-   Simple to generate distinguishable color sequences by varying hue

### Disadvantages

-   Not perceptually uniform—colors at the same `L` can appear drastically different in brightness (blue vs. yellow)
-   The lightness model is a poor approximation of human luminance perception
-   Hue shifts can occur during saturation changes

---

## Color Model

### Components

1. **`H` (Hue)**:
   `H = 0° \text{ to } 360°` (normalized to 0–1)

   The color wheel: 0°/360° red, 60° yellow, 120° green, 180° cyan, 240° blue, 300° magenta.

2. **`S` (Saturation)**:
   `S = 0 \text{ (grayscale) to } 1 \text{ (fully saturated)}`

3. **`L` (Lightness)**:
   `L = 0 \text{ (black) to } 1 \text{ (white)}`

   0.5 is the "pure" color—fully saturated at medium brightness.

---

## Color Conversions

### RGB to HSL

<div class="language-typescript">
    {{ rgb2hsl }}
</div>

### HSL to RGB

<div class="language-typescript">
    {{ hsl2rgb }}
</div>

---

## Applications

1. **CSS color specification**: `hsl()` is widely used in stylesheets for readable color declarations.
2. **UI color pickers**: the cylindrical model maps naturally to sliders and wheels.
3. **Palette generation**: systematic hue rotation with fixed S and L produces harmonious schemes.
4. **Image processing**: hue rotation and saturation adjustment are straightforward operations.

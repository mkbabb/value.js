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

The OKLab color space was developed by Björn Ottosson in 2020 as a modern perceptual color space designed to address the limitations of earlier models. It was created to provide a more accurate representation of perceived color differences while being computationally efficient. The name "OK" suggests it's "Ottosson's Kolors" or simply that it's an "OK" color space that works well enough for practical applications.

---

## Key Characteristics

### Unique Features

1. **Improved Perceptual Uniformity**: OKLab offers better perceptual uniformity than Lab, meaning equal distances in the space more accurately represent equal perceived color differences.
2. **Consistent Lightness**: The lightness dimension closely matches human perception across the entire color gamut.
3. **Hue Linearity**: Mixtures of colors maintain more consistent hues compared to other color spaces.
4. **Computational Efficiency**: Designed to be more efficient to compute than many other perceptually uniform color spaces.

### Advantages and Disadvantages

## Advantages

-   More perceptually uniform than Lab and most other color spaces
-   Better hue linearity for color mixing and interpolation
-   Consistent lightness perception across different hues
-   Suitable for modern color manipulation algorithms
-   Efficient computation compared to other perceptual color spaces

## Disadvantages

-   Relatively new and less established in industry standards
-   Limited support in older software and systems
-   Not as widely understood or documented as older color spaces
-   Still an approximation of human color perception

### Color Gamut and Representation

Like Lab, the OKLab color space encompasses all perceivable colors, making its gamut larger than that of RGB or CMYK. It represents colors in a way that better matches human perception, particularly in terms of perceived lightness and color differences.

---

## Color Model

### Description of Color Components

1. **`L` (Lightness)**:
   `L = 0 \text{ (black) to } 1 \text{ (white)}`

2. **`a` (Green-Red axis)**:
   `a < 0 \text{ (green) to } a > 0 \text{ (red)}`

3. **`b` (Blue-Yellow axis)**:
   `b < 0 \text{ (blue) to } b > 0 \text{ (yellow)}`

### How Colors are Represented

Colors in OKLab space are represented as a point in a three-dimensional space similar to Lab. The L axis represents lightness, while the a and b axes form a color plane at each lightness level. The primary difference from Lab is in how the coordinates are calculated, resulting in improved perceptual properties.

---

## Color Conversions

### XYZ to OKLab Conversion

The conversion from XYZ to OKLab involves a non-linear transformation of LMS cone responses:

<div class="language-typescript">
    {{ xyz2oklab }}
</div>

### OKLab to XYZ Conversion

The conversion from OKLab to XYZ is the inverse process:

<div class="language-typescript">
    {{ oklab2xyz }}
</div>

---

## Common Applications

The OKLab color space, despite being relatively new, is increasingly used in various applications:

1. **Color Interpolation**: Provides better results when interpolating between colors, maintaining consistent perceived lightness and hue.
2. **Color Palette Generation**: Enables creation of perceptually balanced color palettes and gradients.
3. **Modern UI Design**: Allows for more consistent color variations in interface elements and themes.
4. **Image Processing**: Improves results in operations like color grading, correction, and manipulation.
5. **Data Visualization**: Enhances readability and interpretability of color-coded data by ensuring perceptual consistency.
6. **Digital Art Tools**: Offers artists more predictable color behavior when mixing and adjusting colors.
7. **Color Accessibility**: Helps in designing color schemes that maintain distinctiveness for individuals with color vision deficiencies.

By addressing the perceptual limitations of earlier color spaces while maintaining computational efficiency, OKLab has quickly emerged as a valuable tool for color science applications that require high perceptual accuracy.
<script setup>
import { oklch2oklab, oklab2oklch, oklch2xyz, xyz2oklch, getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Katex } from "@components/custom/katex";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";


const { l, c, h } = getFormattedColorSpaceRange("oklch");

</script>

### Attributes

-   `L`: Lightness ({{l.min}} to {{l.max}})
-   `C`: Chroma ({{c.min}} to {{c.max}})
-   `H`: Hue ({{h.min}} to {{h.max}})

### Historical Context

The OKLCH color space is a relatively recent development in color science, created by Björn Ottosson in 2020. It is derived from the OKLAB color space, which itself was designed to address limitations in perceptual uniformity found in earlier color models. OKLCH represents a polar transformation of OKLAB, making it more intuitive for designers and artists while maintaining perceptual uniformity.

---

## Key Characteristics

### Unique Features

1. **Perceptual Uniformity**: Equal steps in OKLCH correspond closely to equal perceived differences in color.
2. **Polar Coordinates**: Uses intuitive lightness, chroma, and hue components instead of Cartesian coordinates.
3. **Modern Design**: Built with modern display technologies and digital workflows in mind.
4. **Improved Color Editing**: Provides more predictable results when adjusting saturation and hue compared to older models.

### Advantages and Disadvantages

## Advantages

-   Superior perceptual uniformity compared to HSL, HSV, and even LAB/LCH
-   Preserves perceived brightness when changing saturation
-   More intuitive for creative adjustments than OKLAB
-   Excellent for color schemes and gradients

## Disadvantages

-   Less established in industry tools compared to older color spaces
-   Computationally more complex than RGB or HSL
-   Not directly displayable on devices
-   Requires intermediate conversion for most applications

### Color Gamut and Representation

OKLCH can represent all visible colors, with its gamut extending beyond what most displays can show. Its polar coordinate system makes it particularly useful for circular color pickers and gradients that maintain perceptual consistency.

---

## Color Model

### Description of Color Components

1. **`L` (Lightness)**:
   `L = 0 \text{ (black) to } 1 \text{ (white)}`

2. **`C` (Chroma)**:
   `C = 0 \text{ (grayscale) to } 0.4 \text{ (highly saturated)}`

3. **`H` (Hue)**:
   `H = 0 \text{ to } 1 \text{ (representing 0° to 360°)}`

### How Colors are Represented

Colors in OKLCH are represented in a cylindrical space. The vertical axis is lightness, the radial distance from the center represents chroma (saturation), and the angle around the cylinder represents hue. This structure makes it intuitive to adjust specific aspects of a color while maintaining perceptual relationships.

### Relationship to OKLAB

OKLCH is a polar transformation of OKLAB, similar to how LCH relates to LAB. While OKLAB uses Cartesian coordinates (L, a, b), OKLCH uses cylindrical coordinates (L, C, H), making it more intuitive for certain color adjustments while preserving the perceptual advantages of OKLAB.

---

## Color Conversions

### OKLCH to OKLAB Conversion

The conversion from OKLCH to OKLAB involves converting from polar to Cartesian coordinates:

<div class="language-typescript">
    {{ oklch2oklab }}
</div>

### OKLAB to OKLCH Conversion

The conversion from OKLAB to OKLCH is the inverse process:

<div class="language-typescript">
    {{ oklab2oklch }}
</div>

### OKLCH to XYZ Conversion

Converting from OKLCH to XYZ typically involves going through OKLAB as an intermediate step:

<div class="language-typescript">
    {{ oklch2xyz }}
</div>

### XYZ to OKLCH Conversion

Similarly, converting from XYZ to OKLCH goes through OKLAB:

<div class="language-typescript">
    {{ xyz2oklch }}
</div>

---

## Common Applications

The OKLCH color space has gained popularity in several areas:

1. **Modern UI Design**: Increasingly used in design systems for its perceptual properties.
2. **CSS Color Module Level 4**: Included in the upcoming CSS specification as a first-class color format.
3. **Color Palette Generation**: Excellent for creating harmonious and perceptually balanced color schemes.
4. **Accessible Design**: Helps in creating color combinations with consistent perceived contrast.
5. **Digital Art**: Provides intuitive color manipulation for digital artists.
6. **Data Visualization**: Creates perceptually uniform color scales for accurate data representation.

By leveraging its perceptual uniformity and intuitive coordinate system, OKLCH represents a significant advancement in color spaces for digital design and creative applications, allowing for more predictable and aesthetically pleasing color manipulations.
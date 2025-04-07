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

The HSL color space was developed in the 1970s as part of computer graphics research. It was created to provide a more intuitive way for humans to specify colors than the RGB model, which is more aligned with how machines generate colors. HSL stands for Hue, Saturation, and Lightness, representing the three key attributes of color perception.

## Key Characteristics

### Unique Features

1. **Intuitive Color Selection**: HSL separates color information (hue) from intensity attributes (saturation and lightness), making it easier for humans to reason about color.
2. **Cylindrical Representation**: HSL can be visualized as a double cone or cylinder, where hue is represented as an angle, saturation as distance from the central axis, and lightness as height.
3. **Easy Adjustment**: Modifying just one component produces predictable and natural color variations, useful for creating color schemes.

### Advantages and Disadvantages

## Advantages

-   Intuitive for human color selection and manipulation
-   Simple to create perceptually related colors
-   Easy to adjust brightness or saturation independently
-   Useful for generating color palettes and gradients

## Disadvantages

-   Not perceptually uniform (equal changes in values don't correspond to equal perceived changes)
-   Doesn't align with how humans actually perceive color attributes
-   Lightness calculation doesn't match human perception of brightness
-   Colors with the same lightness can have different perceived brightness

### Color Gamut and Representation

The HSL color space can represent the same range of colors as RGB, from which it is derived. It simply reorganizes the RGB colorspace into a more intuitive coordinate system.

## Color Model

### Description of Color Components

1. **`H` (Hue)**:
   `H = 0° \text{ to } 360°` (often normalized to a 0-1 range)
   
   Represents the base color as an angle around a color wheel:
   - 0°/360° = Red
   - 60° = Yellow
   - 120° = Green
   - 180° = Cyan
   - 240° = Blue
   - 300° = Magenta

2. **`S` (Saturation)**:
   `S = 0 \text{ (grayscale) to } 1 \text{ (fully saturated)}`
   
   Represents the intensity or purity of the color, from gray to the full color.

3. **`L` (Lightness)**:
   `L = 0 \text{ (black) to } 1 \text{ (white)}`
   
   Represents the brightness of the color, with 0.5 being the "normal" color.

### How Colors are Represented

Colors in HSL are represented as a point in a cylindrical coordinate system. The cylinder's central axis represents lightness (ranging from black at the bottom to white at the top), with the "pure" colors arranged radially around the center at L=0.5. Saturation is the distance from this central axis.

## Color Conversions

### RGB to HSL Conversion

The conversion from RGB to HSL involves several steps:

<div class="language-typescript">
    {{ rgb2hsl }}
</div>

### HSL to RGB Conversion

The conversion from HSL to RGB is the inverse process:

<div class="language-typescript">
    {{ hsl2rgb }}
</div>

## Common Applications

The HSL color space finds extensive use in various applications:

1. **User Interfaces**: Ideal for color pickers and sliders in graphic design software, allowing intuitive color selection.
2. **Web Design**: Widely used in CSS for defining colors, with the `hsl()` function offering easy adjustments.
3. **Data Visualization**: Useful for generating distinguishable color sequences based on hue variation.
4. **Digital Art**: Provides artists with intuitive controls for adjusting colors based on human perception.
5. **Procedural Generation**: Helpful in generating color palettes and gradients for games and simulations.
6. **Image Processing**: Functions like hue rotation and saturation adjustment are simple to implement.

By leveraging its intuitive coordinate system, the HSL color space enables designers and developers to work with color in a way that aligns more closely with human thinking, despite not being perfectly aligned with human perception of color attributes.
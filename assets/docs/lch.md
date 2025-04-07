<script setup>
import { lab2lch, lch2lab, getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Katex } from "@components/custom/katex";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";


const { l, c, h } = getFormattedColorSpaceRange("lch");

</script>

### Attributes

-   `L`: Lightness ({{l.min}} to {{l.max}})
-   `C`: Chroma ({{c.min}} to {{c.max}})
-   `H`: Hue ({{h.min}} to {{h.max}})

### Historical Context

The LCH color space (also known as CIELCh or CIELCH) was derived from the CIE L*a*b* color space. It was developed by the [Commission Internationale de l'Éclairage (CIE)](https://en.wikipedia.org/wiki/International_Commission_on_Illumination) as a cylindrical representation of the Lab color space. LCH uses the same L (Lightness) component as Lab but represents the a* and b* components in polar coordinates as Chroma (saturation) and Hue (angle), making it more intuitive for color adjustments while maintaining the perceptual benefits of Lab.

## Key Characteristics

### Unique Features

1. **Cylindrical Representation**: LCH transforms the Cartesian coordinates of Lab into a more intuitive cylindrical system.
2. **Perceptual Uniformity**: Like Lab, equal distances in LCH space correspond to roughly equal perceived color differences.
3. **Intuitive Adjustments**: Separating color into lightness, chroma, and hue makes color manipulations more predictable and natural.
4. **Device Independence**: LCH values describe the color itself, not how to produce it on a specific device.

### Advantages and Disadvantages

## Advantages

-   Intuitive representation combining perceptual uniformity with a natural color model
-   Easy to adjust saturation (chroma) independently of hue
-   Allows for predictable color modifications
-   Covers all perceivable colors
-   Excellent for color interpolation and gradient creation

## Disadvantages

-   Computationally intensive conversions
-   Not directly displayable on most devices
-   Less widely supported in software compared to RGB or HSL
-   Some colors with high chroma values may be outside the displayable RGB gamut

### Color Gamut and Representation

Like Lab, the LCH color space encompasses all perceivable colors, making its gamut larger than that of RGB or CMYK. However, many colors with high chroma values in LCH cannot be displayed on standard RGB monitors or printed with CMYK processes.

## Color Model

### Description of Color Components

1. **`L` (Lightness)**:
   `L = 0 \text{ (black) to } 100 \text{ (diffuse white)}`
   
   The lightness component is identical to the L* component in Lab.

2. **`C` (Chroma)**:
   `C = 0 \text{ (achromatic) to values exceeding } 100 \text{ for highly saturated colors}`
   
   Chroma represents the colorfulness or saturation of the color, measured as the distance from the neutral axis.

3. **`H` (Hue)**:
   `H = 0° \text{ to } 360°` (often normalized to a 0-1 range)
   
   Hue is the angle in the a*b* plane of Lab, with:
   - 0° = reddish (+a* direction)
   - 90° = yellowish (+b* direction)
   - 180° = greenish (-a* direction)
   - 270° = bluish (-b* direction)

### How Colors are Represented

Colors in LCH space are represented as a point in a cylindrical coordinate system. The vertical axis represents lightness (L), the radial distance from this axis represents chroma (C), and the angle around the axis represents hue (H). This creates a more intuitive representation compared to Lab's Cartesian coordinates while maintaining the same perceptual properties.

## Color Conversions

### Lab to LCH Conversion

The conversion from Lab to LCH involves transforming Cartesian coordinates to polar coordinates:

<div class="language-typescript">
    {{ lab2lch }}
</div>

### LCH to Lab Conversion

The conversion from LCH to Lab is the inverse process, transforming polar coordinates back to Cartesian:

<div class="language-typescript">
    {{ lch2lab }}
</div>

## Common Applications

The LCH color space is used in various applications where both perceptual uniformity and intuitive color manipulation are important:

1. **Color Harmonization**: Creating visually harmonious color schemes by adjusting hue angles while maintaining consistent lightness and chroma.
2. **User Interfaces**: Used in advanced color pickers that need to provide intuitive control over perceptually uniform colors.
3. **Design Systems**: Creating consistent color scales and variations by systematically modifying LCH components.
4. **Color Interpolation**: Generating perceptually smooth gradients between colors by interpolating in LCH space.
5. **Color Accessibility**: Ensuring sufficient contrast while maintaining color relationships by adjusting lightness independently.
6. **Print Design**: Providing a perceptually uniform way to predict how colors will appear in print.
7. **Scientific Visualization**: Offering precise control over color scales used to represent data.

By combining the perceptual uniformity of Lab with the intuitive nature of a cylindrical color system, LCH provides an excellent compromise between technical accuracy and usability for various color-critical applications.
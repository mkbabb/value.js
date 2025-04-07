<script setup>
import { hsl2hsv, hsv2hsl, hsv2xyz, xyz2hsv, getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Katex } from "@components/custom/katex";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";


const { h, s, v } = getFormattedColorSpaceRange("hsv");

</script>

### Attributes

-   `H`: Hue ({{h.min}} to {{h.max}})
-   `S`: Saturation ({{s.min}} to {{s.max}})
-   `V`: Value/Brightness ({{v.min}} to {{v.max}})

### Historical Context

The HSV (Hue, Saturation, Value) color space was developed by Alvy Ray Smith in 1978 while working at the New York Institute of Technology. It was created to provide a more intuitive way for artists and designers to work with color in computer graphics, as opposed to the RGB model which was more aligned with hardware implementation than human perception. HSV is also sometimes referred to as HSB (Hue, Saturation, Brightness) in some software applications.

## Key Characteristics

### Unique Features

1. **Perceptual Organization**: Separates color components in a way that aligns more closely with how humans think about color.
2. **Cylindrical Coordinates**: Uses a cylindrical representation where hue is an angle, saturation is a distance from the central axis, and value is the height.
3. **Intuitive Color Selection**: Makes it easier to select variations of a color by independently adjusting hue, saturation, and brightness.
4. **Artist-Friendly**: Designed with artists and designers in mind, rather than hardware implementations.

### Advantages and Disadvantages

## Advantages

-   More intuitive for human color selection and manipulation
-   Separate control of hue, saturation, and brightness
-   Simplified color picking interfaces
-   Easy to create systematic color variations

## Disadvantages

-   Not perceptually uniform
-   Doesn't account for human color sensitivity variations
-   Not suitable for precise color matching
-   Mathematical discontinuities at low saturation and brightness

### Color Gamut and Representation

The HSV color space is typically represented as a cylinder or cone, with hue as the angular dimension, saturation as the radial distance from the central axis, and value as the vertical dimension. Its gamut is equivalent to that of the RGB space it's derived from, typically sRGB for digital applications.

## Color Model

### Description of Color Components

1. **`H` (Hue)**:
   `H = 0 \text{ to } 1 \text{ (representing 0° to 360°)}`
   
   Represents the type of color, mapped to a position around a color wheel. Values wrap around, so 0 and 1 both represent red.

2. **`S` (Saturation)**:
   `S = 0 \text{ (grayscale) to } 1 \text{ (fully saturated color)}`
   
   Represents the purity or intensity of the color. A saturation of 0 results in grayscale.

3. **`V` (Value/Brightness)**:
   `V = 0 \text{ (black) to } 1 \text{ (full brightness)}`
   
   Represents the brightness of the color. A value of 0 is always black, regardless of hue and saturation.

### How Colors are Represented

Colors in HSV are represented in a cylindrical space where:
- The central vertical axis represents grayscale values from black (bottom) to white (top)
- Moving outward from the central axis increases saturation
- Moving around the cylinder changes the hue
- Moving up and down the cylinder changes the value (brightness)

### Relationship to HSL

HSV is closely related to the HSL color space. Both use hue as their first component, but they differ in how they handle saturation and brightness:

- In HSV, maximum value (V=1) with varying saturation gives a range from white to fully saturated color
- In HSL, maximum lightness (L=0.5) with varying saturation gives a range from gray to fully saturated color

## Color Conversions

### HSV to HSL Conversion

The conversion from HSV to HSL involves recalculating the saturation and lightness components:

<div class="language-typescript">
    {{ hsv2hsl }}
</div>

### HSL to HSV Conversion

The conversion from HSL to HSV is the inverse process:

<div class="language-typescript">
    {{ hsl2hsv }}
</div>

### HSV to XYZ Conversion

Converting from HSV to XYZ typically involves converting to HSL first, then to RGB, and finally to XYZ:

<div class="language-typescript">
    {{ hsv2xyz }}
</div>

### XYZ to HSV Conversion

Converting from XYZ to HSV involves the reverse path:

<div class="language-typescript">
    {{ xyz2hsv }}
</div>

## Common Applications

The HSV color space is widely used in various creative and technical fields:

1. **Graphic Design Software**: Common in color pickers for applications like Photoshop and Illustrator.
2. **Color Theory Education**: Used to teach fundamental concepts about color relationships.
3. **Visualization Tools**: Popular for data visualization where systematic color variation is needed.
4. **Digital Painting**: Offers intuitive color selection for digital artists.
5. **Computer Vision**: Used in image segmentation and object detection algorithms.
6. **UI/UX Design**: Enables systematic generation of color palettes and themes.

By providing a more intuitive model for color manipulation, HSV has become an essential tool for creative professionals, allowing them to think about colors in terms of their perceptual attributes rather than their technical implementation.
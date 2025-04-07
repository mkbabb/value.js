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

The RGB color space was developed in the early to mid-20th century alongside the development of color television and electronic displays. It is based on the trichromatic theory of color vision, which posits that the human eye perceives color through three types of cone cells that are sensitive to red, green, and blue light wavelengths.

## Key Characteristics

### Unique Features

1. **Additive Color Model**: RGB creates colors by adding different intensities of red, green, and blue light together.
2. **Device-Dependent**: Standard RGB values may appear differently across different displays and devices.
3. **Direct Display Compatibility**: RGB values can be directly mapped to display hardware, making it the native color space for screens and monitors.

### Advantages and Disadvantages

## Advantages

-   Intuitive for digital applications
-   Direct hardware implementation
-   Wide range of colors achievable
-   Standard for web and digital media

## Disadvantages

-   Not perceptually uniform
-   Device-dependent without proper calibration
-   Limited in representing certain printable colors
-   Less intuitive for artistic color mixing

### Color Gamut and Representation

The RGB color space forms a cube in 3D space, with black at the origin (0,0,0) and white at the opposite corner (1,1,1). Its gamut depends on the specific RGB standard being used, with sRGB being the most common standard for web and consumer displays.

## Color Model

### Description of Color Components

1. **`R` (Red)**:
   `R = 0 \text{ (no red) to } 1 \text{ (full red intensity)}`

2. **`G` (Green)**:
   `G = 0 \text{ (no green) to } 1 \text{ (full green intensity)}`

3. **`B` (Blue)**:
   `B = 0 \text{ (no blue) to } 1 \text{ (full blue intensity)}`

### How Colors are Represented

Colors in the RGB space are represented as a point within a unit cube, where each axis corresponds to the intensity of one of the primary colors. The corners of the cube represent the primary colors (red, green, blue), their complementary colors (cyan, magenta, yellow), and the extremes of black and white.

### sRGB and Linear RGB

There are two main variants of the RGB color space:

-   **sRGB**: The standard RGB color space used for most consumer displays and web content, which includes gamma correction.
-   **Linear RGB**: A version of RGB without gamma correction, used in certain technical applications and as an intermediate step in color calculations.

## Color Conversions

### RGB to XYZ Conversion

The conversion from RGB to XYZ involves converting from sRGB to linear RGB and then applying a transformation matrix:

<div class="language-typescript">
    {{ rgb2xyz }}
</div>

### XYZ to RGB Conversion

The conversion from XYZ to RGB is the inverse process:

<div class="language-typescript">
    {{ xyz2rgb }}
</div>

## Common Applications

The RGB color space is foundational in digital imaging and has numerous applications:

1. **Digital Displays**: Used in monitors, televisions, smartphones, and other digital screens.
2. **Web Design**: The standard color model for web design and development.
3. **Digital Photography**: Used in camera sensors and digital image processing.
4. **Computer Graphics**: The primary color model for rendering 3D graphics and visual effects.
5. **Video Production**: Used throughout the digital video production pipeline.
6. **User Interfaces**: The standard for designing user interfaces and digital visual elements.

By leveraging its direct compatibility with display technology and intuitive additive nature, the RGB color space serves as the foundation for virtually all digital visual content and applications.
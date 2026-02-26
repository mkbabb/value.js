<script setup>
import { lab2xyz, xyz2lab, getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Katex } from "@components/custom/katex";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";


const { l, a, b } = getFormattedColorSpaceRange("lab");

</script>

### Attributes

-   `L^*`: Lightness ({{l.min}} to {{l.max}})
-   `a^*`: Green-Red axis ({{a.min}} to {{a.max}})
-   `b^*`: Blue-Yellow axis ({{b.min}} to {{b.max}})

### Historical Context

The Lab color space was developed by the [Commission Internationale de l'Éclairage (CIE)](https://en.wikipedia.org/wiki/International_Commission_on_Illumination) in 1976 as part of their color space. It was created to address the limitations of previous color models of the time, and to provide a standardized way of representing colors across different devices and media.

---

## Key Characteristics

### Unique Features

1. **Perceptual Uniformity**: Equal distances in the Lab space correspond to roughly equal perceived color differences.
2. **Device Independence**: Lab values describe the color itself, not how to produce it on a specific device.
3. **Separation of Lightness**: The `L^*` component is separate from the chromaticity (`a^\star` and `b^\star`), allowing for easy adjustment of brightness without affecting hue.

### Advantages and Disadvantages

## Advantages

-   Perceptually uniform
-   Device-independent
-   Covers all perceivable colors
-   Excellent for color difference calculations

## Disadvantages

-   Computationally intensive conversions
-   Not directly displayable on most devices
-   Can be unintuitive for manual color selection

### Color Gamut and Representation

The Lab color space encompasses all perceivable colors, making its gamut larger than that of RGB or CMYK. It can represent colors that are outside the gamut of most display and printing devices.

---

## Color Model

### Description of Color Components

1. **`L^*` (Lightness)**:
   `L^* = 0 \text{ (black) to } 100 \text{ (diffuse white)}`

2. **`a^*` (Green-Red axis)**:
   `a^* < 0 \text{ (green) to } a^* > 0 \text{ (red)}`

3. **`b^*` (Blue-Yellow axis)**:
   `b^* < 0 \text{ (blue) to } b^* > 0 \text{ (yellow)}`

### How Colors are Represented

Colors in Lab space are represented as a point in a three-dimensional space. The L* axis runs vertically from bottom to top, with the a* and b\* axes forming a horizontal plane.

### Whitepoints: Lab and Lab D65

The Lab color space can use different white points, with D50 and D65 being the most common:

-   **Lab (D50)**: Standard illuminant for graphic arts and photography
-   **Lab D65**: Standard illuminant representing average daylight

Lab's standard illuminant is D50, which is commonly used in the printing industry. Lab D65 represents average daylight and is widely used in digital imaging.

---

## Color Conversions

### XYZ to Lab Conversion

The conversion from XYZ to Lab involves several steps:

<div class="language-typescript">
    {{ xyz2lab }}
</div>

### Lab to XYZ Conversion

The conversion from Lab to XYZ is the inverse process:

<div class="language-typescript">
    {{ lab2xyz }}
</div>

---

## Common Applications

The Lab color space finds extensive use in various industries and fields:

1. **Color Management**: Used in ICC color profiles for accurate color reproduction across devices.
2. **Image Processing**: Ideal for operations like sharpening and blurring due to its perceptual uniformity.
3. **Color Difference Calculations**: Widely used in quality control for manufacturing and textile industries.
4. **Digital Photography**: Used in RAW image processing and advanced photo editing techniques.
5. **Printing Industry**: Facilitates color matching and gamut mapping in professional printing workflows.
6. **Scientific Visualization**: Provides a standardized way to represent and analyze color data in research.

By leveraging its perceptual uniformity and device independence, the Lab color space enables precise color communication and manipulation across a wide range of applications.

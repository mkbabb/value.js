<script setup>
import { rgb2xyz, xyz2rgb, xyz2lab, lab2xyz, getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Katex } from "@components/custom/katex";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
    WHITE_POINTS,
    WHITE_POINT_D50_D65,
    WHITE_POINT_D65_D50
} from "@src/units/color/constants";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";


const { x, y, z } = getFormattedColorSpaceRange("xyz");

</script>

### Attributes

-   `X`: Response curve to red ({{x.min}} to {{x.max}})
-   `Y`: Luminance ({{y.min}} to {{y.max}})
-   `Z`: Response curve to blue ({{z.min}} to {{z.max}})

### Historical Context

The XYZ color space was developed by the [Commission Internationale de l'Éclairage (CIE)](https://en.wikipedia.org/wiki/International_Commission_on_Illumination) in 1931. It was the first mathematically defined color space and represents a pivotal moment in color science. The XYZ system was derived from a series of experiments that mapped how the average human eye responds to different wavelengths of light, creating a standard observer model.

## Key Characteristics

### Unique Features

1. **Device Independence**: XYZ values describe colors independent of how they are displayed or captured.
2. **Complete Color Representation**: Can represent all visible colors, unlike RGB which is limited by its gamut.
3. **Foundation for Other Spaces**: Serves as the reference space for converting between many other color spaces.
4. **Standardized White Points**: Uses defined reference whites (D50, D65, etc.) for consistent color representation.

### Advantages and Disadvantages

## Advantages

-   Device-independent
-   Encompasses all visible colors
-   Mathematical basis for color conversions
-   Direct relationship to human vision

## Disadvantages

-   Not perceptually uniform
-   Difficult to interpret visually
-   Not directly usable for display or printing
-   Abstract components don't map intuitively to perceived attributes

### Color Gamut and Representation

The XYZ color space can represent all colors visible to the human eye, making it a reference for defining the gamuts of other color spaces. The visible color gamut forms a cone-like shape within the XYZ space.

## Color Model

### Description of Color Components

1. **`X`**:
   Represents a mix of cone response curves, roughly correlating to red sensitivity.

2. **`Y`**:
   Corresponds directly to luminance (brightness), matching the photopic luminosity function of human vision.

3. **`Z`**:
   Roughly corresponds to blue sensitivity, though it's primarily a mathematical construct.

### How Colors are Represented

Colors in XYZ space are represented as a point in a three-dimensional space. While Y directly represents brightness, X and Z do not correspond to specific perceptual attributes, making XYZ primarily a mathematical intermediate rather than a creative tool.

### White Points and Chromatic Adaptation

XYZ values depend on the white point (reference white) used:

-   **D50**: Standard for graphic arts and printing (yellowish white)
-   **D65**: Standard for digital imaging, representing average daylight (bluish white)

Converting between white points requires chromatic adaptation, often done with a Bradford transform:

<div class="language-typescript">
    // D65 to D50 transformation matrix
    {{ WHITE_POINT_D65_D50 }}

    // D50 to D65 transformation matrix
    {{ WHITE_POINT_D50_D65 }}
</div>

## Color Conversions

### RGB to XYZ Conversion

Converting from RGB to XYZ involves transforming from sRGB to linear RGB, then applying a transformation matrix:

<div class="language-typescript">
    {{ rgb2xyz }}
</div>

### XYZ to RGB Conversion

Converting from XYZ to RGB is the inverse process:

<div class="language-typescript">
    {{ xyz2rgb }}
</div>

### XYZ to LAB Conversion

XYZ can be converted to the perceptually uniform LAB space:

<div class="language-typescript">
    {{ xyz2lab }}
</div>

### LAB to XYZ Conversion

The inverse transformation from LAB to XYZ:

<div class="language-typescript">
    {{ lab2xyz }}
</div>

## Common Applications

The XYZ color space serves critical functions in color science and technology:

1. **Color Management Systems**: Fundamental component of ICC profiles and color management workflows.
2. **Colorimetry**: Used in measuring and specifying colors in scientific applications.
3. **Cross-Media Color Reproduction**: Enables consistent color reproduction across different media and devices.
4. **Standard Observer Models**: Basis for modeling human color perception in various applications.
5. **Color Appearance Models**: Foundation for more advanced models that predict color appearance under different viewing conditions.
6. **Color Difference Calculations**: Used to quantify differences between colors in industrial applications.

As the foundation of modern colorimetry, the XYZ color space remains indispensable despite its abstract nature, serving as the bridge between physical light spectra and the various color models used in creative and technical applications.
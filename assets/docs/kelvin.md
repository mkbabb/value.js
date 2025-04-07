<script setup>
import { kelvin2rgb, rgb2kelvin, getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Katex } from "@components/custom/katex";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";


const { kelvin } = getFormattedColorSpaceRange("kelvin");

</script>

### Attributes

-   `kelvin`: Color temperature ({{kelvin.min}} to {{kelvin.max}})

### Historical Context

The Kelvin color space is based on the concept of color temperature, which originated in the late 19th century with the work of British physicist William Thomson (Lord Kelvin). It relates the temperature of a theoretical black-body radiator to the color of light it emits. This concept was standardized in the early 20th century and has been widely used in lighting, photography, and color science ever since.

## Key Characteristics

### Unique Features

1. **Single-Dimensional**: Unlike most color spaces, Kelvin represents color using just one value—the color temperature.
2. **Intuitive for Lighting**: The scale aligns with how we perceive warm and cool light sources.
3. **Physical Basis**: Based on actual physical phenomena rather than perceptual models.

### Advantages and Disadvantages

## Advantages

-   Simple to understand and communicate
-   Directly applicable to lighting technology
-   Intuitive correlation with perceived warmth/coolness
-   Widely used in photography and cinematography

## Disadvantages

-   Limited to a specific range of colors (blue to yellow-red)
-   Cannot represent colors outside the black-body locus
-   Not perceptually uniform
-   Doesn't account for green-magenta variations (the "tint" dimension)

### Color Gamut and Representation

The Kelvin color space represents colors along a specific curve in the CIE chromaticity diagram known as the Planckian locus or black-body locus. It covers a range from reddish-yellow at lower temperatures to blue at higher temperatures but cannot represent the full gamut of perceptible colors.

## Color Model

### Description of Color Components

1. **`kelvin` (Color Temperature)**:
   `kelvin = 1000\text{K} \text{ (reddish-orange) to } 40000\text{K} \text{ (blue)}`

### How Colors are Represented

Colors in the Kelvin space are represented as a single value in Kelvin units, corresponding to the temperature of a black-body radiator. Lower values (1000K-3000K) produce warm colors (reddish to yellowish), middle values (4000K-5500K) produce neutral white light, and higher values (6500K-40000K) produce cool colors (bluish white to deep blue).

### Common Reference Points

- **1900K**: Candlelight
- **2700K**: Incandescent/warm white bulb
- **3200K**: Halogen lamp/studio "tungsten" lighting
- **4100K**: Moonlight
- **5000K-5500K**: Direct sunlight at noon/photography "daylight"
- **6500K**: Standard daylight (D65)/overcast sky
- **15000K-27000K**: Clear blue sky

## Color Conversions

### RGB to Kelvin Conversion

Converting from RGB to Kelvin involves finding the closest point on the black-body locus to the given RGB color:

<div class="language-typescript">
    {{ rgb2kelvin }}
</div>

### Kelvin to RGB Conversion

Converting from Kelvin to RGB uses approximations based on the black-body radiation curve:

<div class="language-typescript">
    {{ kelvin2rgb }}
</div>

## Common Applications

The Kelvin color space finds extensive use in various industries and fields:

1. **Photography and Cinematography**: Used for white balance settings to match lighting conditions.
2. **Lighting Industry**: Specifications for bulbs and LED products to indicate color appearance.
3. **Display Technology**: Adjusting screen color temperature for different viewing environments or times of day.
4. **Digital Image Processing**: Color correction and grading in photo and video editing.
5. **Smart Lighting**: Color temperature adjustment for circadian rhythm support and mood enhancement.
6. **Astronomy**: Classifying stars based on their color temperature.
7. **Printing and Graphics**: Understanding and compensating for lighting conditions when evaluating color proofs.

By leveraging its intuitive relationship to natural and artificial light sources, the Kelvin color space provides a practical framework for controlling and communicating color temperature across numerous applications.
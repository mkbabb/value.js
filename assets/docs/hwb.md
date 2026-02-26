<script setup>
import { hsl2hwb, hwb2hsl, getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Katex } from "@components/custom/katex";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";


const { h, w, b } = getFormattedColorSpaceRange("hwb");

</script>

### Attributes

-   `H`: Hue ({{h.min}} to {{h.max}})
-   `W`: Whiteness ({{w.min}} to {{w.max}})
-   `B`: Blackness ({{b.min}} to {{b.max}})

### Historical Context

The HWB (Hue, Whiteness, Blackness) color space was proposed by Alvy Ray Smith in 1996 as a more intuitive alternative to HSL and HSV for color selection. Smith, a co-founder of Pixar, designed HWB to better match how artists think about color mixing - starting with a pure hue and adding white or black to create tints and shades. It was later incorporated into CSS Color Module Level 4, making it available for web design applications.

---

## Key Characteristics

### Unique Features

1. **Artist-Friendly Model**: HWB mimics the traditional artist approach of mixing white or black with a pure hue.
2. **Intuitive Color Selection**: Makes it easier to understand tint and shade relationships between colors.
3. **Simplified Color Adjustment**: Separate controls for lightening (adding white) and darkening (adding black) a color.
4. **Derived from HSV**: Maintains the same hue definition as HSV but with more intuitive whiteness and blackness parameters.

### Advantages and Disadvantages

## Advantages

-   Intuitive for humans, especially those with an art background
-   Easy to create tints (white added) and shades (black added) of a color
-   Simple to understand color relationships
-   Better aligned with how people conceptualize color modifications
-   Useful for creating color palettes and color schemes

## Disadvantages

-   Not perceptually uniform (equal changes in values don't correspond to equal perceived changes)
-   Limited adoption compared to HSL and RGB in software and tools
-   Less precise for color matching applications
-   Whiteness and blackness are not independent (their sum should not exceed 1)

### Color Gamut and Representation

The HWB color space represents the same gamut as RGB, from which it is derived through HSL or HSV. It reorganizes the RGB colorspace into coordinates that reflect how artists think about color mixing.

---

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

2. **`W` (Whiteness)**:
   `W = 0 \text{ (no white) to } 1 \text{ (pure white)}`
   
   Represents how much white is mixed with the base hue.

3. **`B` (Blackness)**:
   `B = 0 \text{ (no black) to } 1 \text{ (pure black)}`
   
   Represents how much black is mixed with the base hue.

### How Colors are Represented

Colors in HWB are represented conceptually as a mixture of a pure hue with varying amounts of white and black. The hue component determines the base color, while whiteness and blackness modify this base. When the sum of whiteness and blackness exceeds 1, the resulting color is a grayscale value determined by their relative proportions.

---

## Color Conversions

### HSL to HWB Conversion

The conversion from HSL to HWB involves calculating the white and black components:

<div class="language-typescript">
    {{ hsl2hwb }}
</div>

### HWB to HSL Conversion

The conversion from HWB to HSL requires transforming the whiteness and blackness back to saturation and lightness:

<div class="language-typescript">
    {{ hwb2hsl }}
</div>

---

## Common Applications

The HWB color space is used in various applications where intuitive color selection is important:

1. **Web Design**: Included in CSS Color Module Level 4, allowing web designers to specify colors in a more intuitive way.
2. **Color Pickers**: Some modern color selection tools incorporate HWB for more intuitive tint and shade creation.
3. **Digital Art Applications**: Used in some creative software to provide an artist-friendly approach to color selection.
4. **Educational Tools**: Helps explain color theory concepts like tints and shades in an accessible way.
5. **UI/UX Design**: Facilitates creation of coherent color palettes based on a single hue with varying levels of white and black.
6. **Accessibility Design**: Simplifies the process of creating high-contrast variations of a base color for accessibility purposes.

While not as widely implemented as HSL or RGB, the HWB color space offers a unique and intuitive approach to color manipulation that aligns well with traditional artistic color theory and practice.
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

### Background

HSV (Hue, Saturation, Value) was developed by Alvy Ray Smith in 1978 as a way to select color by perceptual attributes rather than by RGB channel. It's also called **HSB** (Hue, Saturation, Brightness) in some applications—same thing, different name.

The model is cylindrical: hue is an angle around the wheel, saturation is radial distance from the center axis, and value is height. Its gamut is identical to sRGB—it's a reorganization, not an expansion.

---

## Color Model

### Components

1. **`H` (Hue)**:
   `H = 0 \text{ to } 1 \text{ (representing 0° to 360°)}`

   Position on the color wheel. `0` and `1` both map to red.

2. **`S` (Saturation)**:
   `S = 0 \text{ (grayscale) to } 1 \text{ (fully saturated color)}`

   Purity of the color. At `S=0`, the result is grayscale regardless of hue.

3. **`V` (Value)**:
   `V = 0 \text{ (black) to } 1 \text{ (full brightness)}`

   Brightness. **`V=0` is always black**, no matter what hue or saturation are set to.

### Relationship to HSL

HSV and HSL share a hue channel but diverge on the other two axes. In HSV, `V=1` with varying saturation moves from white to fully saturated color. In HSL, `L=0.5` with varying saturation moves from gray to fully saturated color. HSL's lightness axis is symmetric (black at 0, white at 1); HSV's value axis isn't—there's no way to reach pure white without also reducing saturation.

---

## Advantages

-   Intuitive for color selection—hue, purity, and brightness are independent controls
-   Easy to generate systematic color variations (e.g., darken by lowering `V`)
-   Ubiquitous in color pickers across design software

## Disadvantages

-   Not perceptually uniform—equal numeric steps don't look like equal steps
-   Mathematical discontinuities at low saturation and brightness
-   Doesn't account for human sensitivity differences across the spectrum

---

## Color Conversions

### HSV to HSL

<div class="language-typescript">
    {{ hsv2hsl }}
</div>

### HSL to HSV

<div class="language-typescript">
    {{ hsl2hsv }}
</div>

### HSV to XYZ

Conversion goes through HSL and then RGB before reaching XYZ:

<div class="language-typescript">
    {{ hsv2xyz }}
</div>

### XYZ to HSV

The reverse path—XYZ to RGB to HSL to HSV:

<div class="language-typescript">
    {{ xyz2hsv }}
</div>

---

## Common Applications

1. **Color pickers**: The dominant model in Photoshop, Illustrator, Figma, and most design tools.
2. **Computer vision**: Used for image segmentation and object detection where hue separation matters.
3. **Data visualization**: Systematic variation of saturation or value for encoding data.
4. **Digital painting**: Artists adjust brightness and saturation independently of hue.
5. **UI/UX design**: Palette generation from a base hue by sweeping saturation and value.
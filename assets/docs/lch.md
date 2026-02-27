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

CIELCh is Lab in polar coordinates. The [CIE](https://en.wikipedia.org/wiki/International_Commission_on_Illumination) defined it as a cylindrical reparameterization of L\*a\*b\*: same `L` axis, but the Cartesian `a*`/`b*` plane is expressed as chroma (`C = sqrt(a^2 + b^2)`) and hue (`H = atan2(b, a)`). The result keeps Lab's perceptual uniformity while giving you direct handles on saturation and hue---two things designers actually want to tweak.

---

## Key Characteristics

1. **Cylindrical Lab.** Same underlying data as Lab, just re-expressed in polar form.
2. **Perceptually uniform.** Equal numeric distances still correspond to roughly equal perceived differences.
3. **Intuitive axes.** Lightness, chroma, and hue map directly to how people think about color.
4. **Device-independent.** Like Lab, LCh describes color itself, not device output.

## Advantages

-   Chroma and hue are independently adjustable---change saturation without shifting hue
-   Perceptually uniform gradients and interpolation
-   Covers the full gamut of perceivable colors
-   Natural fit for color harmonies (rotate hue, hold L and C constant)

## Disadvantages

-   Computationally heavier than RGB or HSL conversions
-   Not directly displayable; must convert to a device space
-   High-chroma values often fall outside the sRGB gamut
-   Less tool support than RGB/HSL in mainstream software

---

## Color Model

### Components

1. **`L` (Lightness)**: `0` (black) to `100` (diffuse white). Identical to Lab's `L*`.

2. **`C` (Chroma)**: `0` (achromatic) upward; highly saturated colors can exceed `100`. This is the radial distance from the neutral axis in the `a*b*` plane.

3. **`H` (Hue)**: The angle in the `a*b*` plane:
   - `0` = reddish (+a\* direction)
   - `90` = yellowish (+b\* direction)
   - `180` = greenish (-a\* direction)
   - `270` = bluish (-b\* direction)

The space forms a cylinder: `L` runs vertically, `C` extends radially, and `H` sweeps around the axis. It's the same color solid as Lab, just easier to navigate.

---

## Color Conversions

### Lab to LCh

Cartesian to polar---extract the magnitude and angle from `a*` and `b*`:

<div class="language-typescript">
    {{ lab2lch }}
</div>

### LCh to Lab

Polar back to Cartesian:

<div class="language-typescript">
    {{ lch2lab }}
</div>

---

## Applications

1. **Color harmonies.** Rotate hue at fixed lightness and chroma to generate complementary, triadic, or analogous palettes.
2. **Accessible contrast.** Adjust `L` independently to hit WCAG contrast ratios without disturbing hue or saturation.
3. **Design systems.** Build color scales by stepping through `L` or `C` at regular intervals.
4. **Perceptual gradients.** Interpolating in LCh avoids the muddy midpoints common in RGB blends.
5. **Print workflows.** Predict perceptual appearance across media without device-dependent guesswork.

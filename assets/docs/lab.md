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

-   `L*`: Lightness ({{l.min}} to {{l.max}})
-   `a*`: Green-Red axis ({{a.min}} to {{a.max}})
-   `b*`: Blue-Yellow axis ({{b.min}} to {{b.max}})

### Historical Context

Standardized by the CIE in 1976, Lab was designed to be **perceptually uniform**—equal distances in the space should correspond to equal perceived color differences. It's device-independent: Lab describes *what* a color looks like, not how a particular device produces it. For decades it's been the workhorse of color management, ICC profiles, and industrial colorimetry.

---

## Key Characteristics

1. **Perceptual uniformity**: the founding goal. Largely successful, though the blue-purple region exhibits more error than Ottosson's OKLab.
2. **Device independence**: Lab values are defined relative to a standard illuminant, not a particular display or printer.
3. **Separated lightness**: `L*` is orthogonal to the chromatic axes, enabling brightness adjustment without hue shift.

### Advantages

-   Perceptually uniform (the CIE 1976 definition)
-   Device-independent—the standard for cross-media color communication
-   Covers all perceivable colors (gamut exceeds any physical display)
-   Delta-E calculations (color difference metrics) are native to this space

### Disadvantages

-   Computationally heavier than RGB conversions (piecewise `f(t)` function)
-   Not directly displayable—out-of-gamut Lab values must be mapped to sRGB or similar
-   Unintuitive for manual color selection (what does `a* = -40` *look* like?)

### White Points

-   **D50**: graphic arts, printing, ICC profile standard. Lab's default illuminant.
-   **D65**: average daylight, digital imaging. Used by sRGB and Display P3.

Conversions between D50 and D65 use **Bradford chromatic adaptation**.

---

## Color Model

### Components

1. **`L*` (Lightness)**:
   `L^* = 0 \text{ (black) to } 100 \text{ (diffuse white)}`

2. **`a*` (Green-Red axis)**:
   `a^* < 0 \text{ (green) to } a^* > 0 \text{ (red)}`

3. **`b*` (Blue-Yellow axis)**:
   `b^* < 0 \text{ (blue) to } b^* > 0 \text{ (yellow)}`

### Representation

A three-dimensional Cartesian space. `L*` is the vertical axis; the `a*`/`b*` plane describes chromaticity at each lightness level. The cylindrical variant (LCh) converts `a*`,`b*` to polar coordinates—chroma and hue.

---

## Color Conversions

### XYZ to Lab

<div class="language-typescript">
    {{ xyz2lab }}
</div>

### Lab to XYZ

<div class="language-typescript">
    {{ lab2xyz }}
</div>

---

## Applications

1. **ICC color management**: the internal representation for color profiles and device-independent color communication.
2. **Delta-E calculations**: industrial quality control (textiles, paint, manufacturing) relies on Lab-based color difference formulas.
3. **Image processing**: operations like sharpening and blurring benefit from the perceptual uniformity.
4. **Print production**: gamut mapping between CMYK and RGB passes through Lab.
5. **Scientific colorimetry**: the standard coordinate system for color measurement and analysis.

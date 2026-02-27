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

### Background

Color temperature is rooted in black-body radiation: heat an ideal radiator and its emitted light traces a curve from deep red through white to blue as temperature rises. The concept dates to Lord Kelvin's 19th-century thermodynamics work and was formalized for colorimetry in the early 20th century.

This is a **single-dimensional** color space—one number, `1000K` to `40000K`, mapping to a point on the Planckian locus in the CIE chromaticity diagram. It can't represent colors off that curve (no greens, magentas, or saturated colors in general). Conversions to RGB use the **Tanner Helland approximation**, a polynomial fit to the black-body spectrum.

---

## Color Model

### Component

1. **`kelvin` (Color Temperature)**:
   `kelvin = 1000\text{K} \text{ (reddish-orange) to } 40000\text{K} \text{ (blue)}`

   Lower values are warm; higher values are cool. The entire space is a single axis.

### Common Reference Points

- **1900K**: Candlelight
- **2700K**: Incandescent/warm white bulb
- **3200K**: Halogen lamp/studio tungsten
- **4100K**: Moonlight
- **5000K–5500K**: Direct noon sunlight/photography "daylight"
- **6500K**: D65 standard daylight/overcast sky
- **15000K–27000K**: Clear blue sky

---

## Advantages

-   Dead simple—one number describes the whole color
-   Directly maps to real-world light sources
-   Intuitive warm/cool axis that photographers and cinematographers already think in

## Disadvantages

-   Covers only the Planckian locus—a narrow slice of visible color
-   Can't express the green–magenta "tint" dimension perpendicular to the locus
-   Not perceptually uniform
-   RGB approximations diverge from the true black-body curve at extreme temperatures

---

## Color Conversions

### RGB to Kelvin

Finds the closest color temperature on the black-body locus for a given RGB value:

<div class="language-typescript">
    {{ rgb2kelvin }}
</div>

### Kelvin to RGB

Uses the Tanner Helland polynomial approximation to convert temperature to RGB:

<div class="language-typescript">
    {{ kelvin2rgb }}
</div>

---

## Common Applications

1. **Photography and cinematography**: White balance settings—match the camera to the scene's color temperature.
2. **Lighting industry**: Bulb and LED specifications use correlated color temperature (CCT) to describe appearance.
3. **Display calibration**: Screen color temperature adjustment for different viewing conditions or time-of-day shifting (e.g., Night Shift, f.lux).
4. **Smart lighting**: Tunable-white fixtures shift CCT for circadian rhythm support.
5. **Astronomy**: Stellar classification by photospheric temperature.
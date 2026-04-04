<script setup>
import { rgb2xyz, xyz2rgb, xyz2lab, lab2xyz } from "@src/units/color/utils?source";
import { WHITE_POINT_D65_D50, WHITE_POINT_D50_D65 } from "@src/units/color/constants?source";
import { getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Katex } from "@components/custom/katex";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
    WHITE_POINTS,
} from "@src/units/color/constants";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
const { x, y, z } = getFormattedColorSpaceRange("xyz");

</script>

### Attributes

-   `X`: Response curve to red ({{x.min}} to {{x.max}})
-   `Y`: Luminance ({{y.min}} to {{y.max}})
-   `Z`: Response curve to blue ({{z.min}} to {{z.max}})

### Historical Context

CIE XYZ (1931) was the first mathematically defined color space. The [Commission Internationale de l'Eclairage](https://en.wikipedia.org/wiki/International_Commission_on_Illumination) derived it from experiments mapping how a standard observer responds to wavelengths of visible light. It's device-independent by design—colors are specified as points in an abstract tristimulus space, not as instructions for a particular display or printer.

In value.js, **XYZ is the conversion hub**: most color space transforms pass through it.

---

## Key Characteristics

1. **Device-independent.** XYZ values describe a color itself, not how to reproduce it on hardware.
2. **Complete gamut.** Encompasses all colors visible to the human eye—no clipping to an RGB or CMYK subset.
3. **Foundation space.** Lab, Luv, and virtually every perceptual model derives from XYZ.
4. **Standardized white points.** D50, D65, and others provide fixed reference whites for consistent colorimetry.

## Advantages

-   Device-independent
-   Encompasses all visible colors
-   Mathematical basis for all other CIE-derived color spaces
-   Direct relationship to the standard observer model

## Disadvantages

-   Not perceptually uniform—equal numeric steps don't look equal
-   Components are abstract; `X` and `Z` don't map to any intuitive visual attribute
-   Not directly usable for display or print output

---

## Color Model

### Components

1. **`X`**: A weighted mix of cone response curves, roughly tracking red sensitivity. Not a pure spectral response—it's a mathematical construct chosen so that all tristimulus values remain non-negative.

2. **`Y`**: Corresponds directly to luminance. Matches the CIE photopic luminosity function, so it doubles as a measure of perceived brightness.

3. **`Z`**: Roughly tracks blue sensitivity. Like `X`, it's primarily a mathematical convenience rather than a direct perceptual correlate.

Colors in XYZ are points in a 3D space. `Y` carries brightness information; `X` and `Z` don't correspond to perceptual attributes on their own. This makes XYZ a conversion intermediary, not a creative tool.

### White Points and Chromatic Adaptation

XYZ values are relative to a reference white point:

-   **D50**: Standard for graphic arts and printing (slightly warm/yellowish)
-   **D65**: Standard for digital imaging, approximating average daylight (slightly cool/bluish)

Converting between white points requires chromatic adaptation. value.js uses the Bradford transform:

<div v-html="WHITE_POINT_D65_D50" />
<div v-html="WHITE_POINT_D50_D65" />

---

## Color Conversions

### RGB to XYZ

Linearize sRGB (undo the gamma curve), then multiply by the 3×3 sRGB-to-XYZ matrix:

<Katex expression="\mathbf{rgb}_{\text{linear}} = \gamma^{-1}(\mathbf{rgb}), \quad \begin{bmatrix} X \\ Y \\ Z \end{bmatrix} = M_{\text{sRGB}} \cdot \mathbf{rgb}_{\text{linear}}" />

The sRGB transfer function is piecewise: linear below ~0.04045, power-law (exponent 2.4) above.

<div v-html="rgb2xyz" />

### XYZ to RGB

Multiply by the inverse matrix, then apply the sRGB gamma curve:

<Katex expression="\mathbf{rgb}_{\text{linear}} = M_{\text{sRGB}}^{-1} \begin{bmatrix} X \\ Y \\ Z \end{bmatrix}, \quad \mathbf{rgb} = \gamma(\mathbf{rgb}_{\text{linear}})" />

<div v-html="xyz2rgb" />

### XYZ to Lab

Normalize by the white point, apply the CIE perceptual function, then scale:

<Katex expression="L^* = 116\, f\!\left(\frac{Y}{Y_n}\right) - 16, \quad a^* = 500\left[f\!\left(\frac{X}{X_n}\right) - f\!\left(\frac{Y}{Y_n}\right)\right], \quad b^* = 200\left[f\!\left(\frac{Y}{Y_n}\right) - f\!\left(\frac{Z}{Z_n}\right)\right]" />

<div v-html="xyz2lab" />

### Lab to XYZ

Invert the L\*a\*b\* formulas and scale by the white point:

<Katex expression="f_y = \frac{L^* + 16}{116}, \quad f_x = \frac{a^*}{500} + f_y, \quad f_z = f_y - \frac{b^*}{200}" />

<div v-html="lab2xyz" />

---

## Applications

1. **Color management.** ICC profiles define device gamuts in XYZ; all profile-to-profile conversions transit through it.
2. **Colorimetry.** Spectrophotometers report measurements in XYZ or its derivatives.
3. **Cross-media reproduction.** The device-independent anchor that lets a print proof match a monitor preview.
4. **Color difference metrics.** Delta E formulas operate in Lab/Luv, both derived from XYZ.
5. **Appearance models.** CIECAM02 and similar models take XYZ as input to predict how a color looks under different viewing conditions.

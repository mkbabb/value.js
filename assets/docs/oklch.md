<script setup>
import { oklch2oklab, oklab2oklch, oklab2xyz, xyz2oklab } from "@src/units/color/utils?source";
import { getFormattedColorSpaceRange } from "@src/units/color/utils";
import { Katex } from "@components/custom/katex";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
} from "@src/units/color/constants";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
const { l, c, h } = getFormattedColorSpaceRange("oklch");

</script>

### Attributes

-   `L`: Lightness ({{l.min}} to {{l.max}})
-   `C`: Chroma ({{c.min}} to {{c.max}})
-   `H`: Hue ({{h.min}} to {{h.max}})

### Historical Context

OKLCh is the polar form of [OKLab](https://bottosson.github.io/posts/oklab/), published by Björn Ottosson in 2020 to address the perceptual non-uniformities in older Lab/LCh models. The relationship is the same—Cartesian `a`/`b` re-expressed as chroma and hue—but the underlying OKLab space produces better uniformity, especially in blues and purples where CIE L\*a\*b\* shows significant error. OKLCh is a first-class color function in **CSS Color Level 4**.

---

## Key Characteristics

1. **Better uniformity than CIE LCh.** Equal chroma steps look more consistent across the hue circle.
2. **Polar coordinates.** Lightness, chroma, and hue—same intuitive axes as LCh.
3. **Stable lightness.** Changing chroma or hue doesn't shift perceived brightness the way it does in HSL.
4. **CSS-native.** `oklch()` is supported in all modern browsers as of 2024.

## Advantages

-   Markedly better perceptual uniformity than HSL, HSV, or CIE LCh
-   Perceived brightness stays stable when you adjust chroma or hue
-   Direct CSS support—no conversion step for web use
-   Clean gradients and palette generation with minimal hue shift

## Disadvantages

-   Newer; less support in legacy tools and older design software
-   Conversion chain is longer than RGB or HSL (OKLCh → OKLab → XYZ → linear RGB → sRGB)
-   Not directly displayable—still needs gamut mapping to a device space
-   The `0`–`1` lightness scale differs from Lab/LCh's `0`–`100`, which can cause confusion

---

## Color Model

### Components

1. **`L` (Lightness)**: `0` (black) to `1` (white). Note the `0`–`1` range, not `0`–`100` as in CIE L\*.

2. **`C` (Chroma)**: `0` (achromatic) to roughly `0.4` for the most saturated colors. The scale is much smaller than CIE LCh's.

3. **`H` (Hue)**: `0` to `360` degrees (or `0`–`1` normalized). Same angular concept as LCh, but hue spacing is more perceptually even—the "blue problem" in CIE LCh (where blues compress into a narrow hue range) is largely resolved.

### Relationship to OKLab

OKLCh relates to OKLab exactly as CIE LCh relates to CIE Lab: same data, polar vs. Cartesian. `C = sqrt(a^2 + b^2)`, `H = atan2(b, a)`. The lightness channel is shared directly.

---

## Color Conversions

### OKLCh to OKLab

Polar to Cartesian—recover the `a`/`b` axes from chroma and hue:

<Katex expression="a = C \cos(2\pi h), \quad b = C \sin(2\pi h)" />

<div v-html="oklch2oklab" />

### OKLab to OKLCh

Cartesian to polar—extract chroma (magnitude) and hue (angle) from the `a`/`b` plane:

<Katex expression="C = \sqrt{a^2 + b^2}, \quad h = \frac{\operatorname{atan2}(b,\, a)}{2\pi}" />

<div v-html="oklab2oklch" />

### OKLab to XYZ

Invert the two linear transforms around a cube operation. The cube reverses the perceptual cube-root compression applied in the forward path:

<Katex expression="\begin{bmatrix} l' \\ m' \\ s' \end{bmatrix} = M_1^{-1} \begin{bmatrix} L \\ a \\ b \end{bmatrix}, \quad \begin{bmatrix} X \\ Y \\ Z \end{bmatrix} = M_2^{-1} \begin{bmatrix} l'^3 \\ m'^3 \\ s'^3 \end{bmatrix}" />

<div v-html="oklab2xyz" />

### XYZ to OKLab

Two matrix multiplications sandwiching a cube root. The first maps XYZ to LMS cone responses; the cube root models the perceptual non-linearity; the second projects into OKLab:

<Katex expression="\begin{bmatrix} l \\ m \\ s \end{bmatrix} = M_1 \begin{bmatrix} X \\ Y \\ Z \end{bmatrix}, \quad \begin{bmatrix} L \\ a \\ b \end{bmatrix} = M_2 \begin{bmatrix} \sqrt[3]{l} \\ \sqrt[3]{m} \\ \sqrt[3]{s} \end{bmatrix}" />

<div v-html="xyz2oklab" />

---

## Applications

1. **CSS `oklch()`.** Supported in Chrome, Safari, and Firefox; increasingly adopted for design systems.
2. **Design system palettes.** Step through `L` or `C` to build scales that look evenly spaced to the human eye.
3. **Accessible color.** Adjust `L` to meet WCAG contrast targets without disturbing hue or saturation.
4. **Perceptual gradients.** Interpolating in OKLCh avoids the hue shifts and muddy midpoints of RGB or HSL blends.
5. **Data visualization.** Build color ramps where perceptual distance tracks data distance.

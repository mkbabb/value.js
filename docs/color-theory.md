# Color Theory

An overview of the color science—15 color spaces, a
conversion hub, analytical gamut mapping, and CSS Color Level 4 support.

## The Conversion Hub

All color spaces convert through **CIE XYZ D65** as the universal intermediate.
This hub-and-spoke architecture means adding a new space requires only two
functions (to-XYZ and from-XYZ) rather than O(n^2) pairwise converters.

```
Any Color Space → XYZ (D65) → Any Other Color Space
```

Spaces whose native illuminant is D50 (Lab, ProPhoto RGB) use **Bradford
chromatic adaptation** matrices for the D50 ↔ D65 bridge.

## Color Spaces

### Device-Oriented (RGB Family)

These spaces map directly to display hardware. Same gamut as their defining
standard; useful for output but not perceptually uniform.

| Space | Gamut | Notes |
|-------|-------|-------|
| **sRGB** | Consumer displays, web | Piecewise transfer (exponent 2.4, effective ~2.2). The CSS default. |
| **sRGB-linear** | Same primaries, no gamma | Used as intermediate for blending and matrix math. |
| **Display P3** | ~25% wider than sRGB | Modern Apple/OLED displays. D65 native. |
| **Adobe RGB (a98-rgb)** | ~35% wider than sRGB | Professional photography. |
| **ProPhoto RGB** | ~90% of visible gamut | Extremely wide; D50 native. |
| **Rec. 2020** | UHD/HDR broadcast | Approaching full visible gamut. |

### Cylindrical (HSL/HSV/HWB)

Coordinate transforms of sRGB into more intuitive axes. Same gamut, same
limitations—not perceptually uniform.

| Space | Axes | Best for |
|-------|------|----------|
| **HSL** | Hue, Saturation, Lightness | CSS `hsl()`, palette generation |
| **HSV** | Hue, Saturation, Value | Color pickers (Photoshop-style) |
| **HWB** | Hue, Whiteness, Blackness | Artist's model: tints and shades. CSS Color Level 4. |

### Perceptual (Lab Family)

Device-independent spaces designed for perceptual uniformity. Their gamut
encompasses all visible colors—larger than any display can render.

| Space | Basis | Uniformity | Notes |
|-------|-------|------------|-------|
| **CIE Lab** | CIE 1976 | Good | The industry standard. D50 native. |
| **CIE LCh** | Lab in polar coords | Same as Lab | Cylindrical: Chroma + Hue instead of a\*/b\*. |
| **OKLab** | Ottosson 2020 | Better | Improved hue linearity; CSS Color Level 4 default for `color-mix()`. |
| **OKLCh** | OKLab in polar coords | Same as OKLab | CSS `oklch()`. Increasingly adopted for design systems. |

### Special

| Space | Dimension | Notes |
|-------|-----------|-------|
| **CIE XYZ** | 3D (X, Y, Z) | The mathematical foundation. Y = luminance. Hub for all conversions. |
| **Kelvin** | 1D (temperature) | Black-body radiation color, 1000K–40000K. Tanner Helland approximation. |

## Gamut Mapping

When a color exists in a perceptual space (OKLab, Lab) but falls outside the
sRGB cube, it must be **gamut-mapped** before display. value.js uses Björn
Ottosson's analytical algorithm:

1. Classify the hue into one of three sRGB sectors (R, G, B limiting channel).
2. Compute the gamut boundary as a cubic polynomial in the saturation parameter.
3. Refine with one Halley's method step (cubic convergence—machine precision).
4. Project toward an adaptive anchor `L0` that blends chroma reduction with
   mid-gray anchoring.

**Properties**: deterministic (single-step, cubic convergence), hue-preserving,
significantly faster than CSS Color 4's iterative binary search. See
[gamut-mapping.md](./gamut-mapping.md) for the full derivation.

## Perceptual Distance

Color difference is measured as Euclidean distance in OKLab:

```
deltaE_OK = sqrt((L1-L2)^2 + (a1-a2)^2 + (b1-b2)^2)
```

The just-noticeable difference (JND) threshold is ~**0.02**.

## Color Quantization

Palette extraction from image pixel data, operating natively in OKLab.

Conventional quantizers (median cut, octree) work in sRGB, where Euclidean distance poorly tracks perceived difference. By clustering in OKLab, the quantizer's bucket splits and centroid convergence respect perceptual uniformity directly.

### Pipeline

1. **Downsample** the source image to a target pixel count (~20k by default). Transparent pixels are discarded.
2. **MMCQ pre-clustering**: median cut in OKLab, splitting along whichever axis (L, a, or b) has the widest range per bucket. This produces `k×4` to 64 coarse clusters.
3. **K-means++ seeding**: D²-weighted selection from the MMCQ centroids, biased by population count. The first seed is the most populated bucket.
4. **K-means refinement** with a chroma-weighted distance metric:

```
d² = ΔL² + (1 + kC · C) · (Δa² + Δb²)
```

The `chromaWeight` (kC) parameter scales chromatic axes relative to lightness. At kC = 0 the metric is standard Euclidean in OKLab; higher values separate hue/chroma variations more aggressively.

5. **JND deduplication**: centroids within deltaE_OK < 0.02 (the just-noticeable difference threshold) are merged via population-weighted averaging.
6. **Perceptual sort**: nearest-neighbor traversal in weighted OKLCH space (hue continuity > lightness flow > chroma similarity), starting from the darkest color.

### Public API

```ts
quantizePixels(pixels, width, height, options?) → QuantizedColor[]
dominantColor(pixels, width, height)            → QuantizedColor | null
```

`dominantColor` runs a k=5 extraction and returns the cluster with highest OKLCH chroma.

### Why OKLab

Median cut in sRGB tends to over-split greens (large gamut area in sRGB coordinates) and under-split blues and purples. OKLab's perceptual uniformity means bucket volume correlates with perceived color range, producing palettes that better represent what a human viewer actually distinguishes.

## CSS Color Level 4

value.js implements the core of CSS Color Level 4:

- **Functional syntax**: `rgb()`, `hsl()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()`, `xyz()`
- **`color()` function**: `color(display-p3 1 0.5 0)` for arbitrary color spaces
- **`color-mix()`**: `color-mix(in oklab, red 30%, blue 70%)` with hue interpolation methods (`shorter`, `longer`, `increasing`, `decreasing`)
- **Relative color syntax**: `rgb(from red calc(r * 0.5) g b)`
- **Hex colors**: `#RGB`, `#RRGGBB`, `#RGBA`, `#RRGGBBAA`
- **Named colors**: 148 CSS keywords (including `rebeccapurple`) plus `transparent` and a custom registry
- **`none` keyword**: represents missing components (NaN) per spec

## Transfer Functions

Each RGB-family space defines a transfer function (gamma curve) mapping between
linear light and encoded values:

| Space | Type | Parameters |
|-------|------|------------|
| sRGB | Piecewise | exponent 2.4 (effective ~2.2), linear segment below 0.04045 |
| Adobe RGB | Simple power | gamma 563/256 (~2.2) |
| ProPhoto RGB | Piecewise | gamma 1.8, threshold 1/512 |
| Rec. 2020 | Piecewise | alpha 1.0993, beta 0.0181 |

All conversions linearize before matrix transforms and re-encode afterward.

## Sources, acknowledgements, &c.

### Specifications

- Atkins Jr., T., Lilley, C., & Verou, L. (2025). [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/). W3C Candidate Recommendation Draft. — The governing spec for `color()`, `color-mix()`, relative color syntax, and `oklch()`.
- [CSS Filter Effects Module Level 1](https://www.w3.org/TR/filter-effects/#feColorMatrixElement). W3C. — `feColorMatrix` element; basis for the SPSA-based CSS filter solver in `colorFilter.ts`.
- [lch() — CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/lch). Mozilla. — CIE LCh functional notation reference.
- [oklch() — CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch). Mozilla. — OKLCh functional notation reference.

### Color science

- Ottosson, B. (2020). [A perceptual color space for image processing](https://bottosson.github.io/posts/oklab/). — The OKLab paper. Defines the LMS→OKLab matrix and demonstrates improved hue linearity over CIE Lab.
- Ottosson, B. (2021). [sRGB gamut clipping](https://bottosson.github.io/posts/gamutclipping/). — Analytical gamut mapping via cubic polynomial + Halley's method. The algorithm implemented in `gamut.ts`.
- Lindbloom, B. [XYZ to Correlated Color Temperature](http://www.brucelindbloom.com/index.html?Eqn_XYZ_to_T.html). — McCamy's approximation and Robertson's method for CCT from chromaticity coordinates.
- [Correlated color temperature](https://en.wikipedia.org/wiki/Correlated_color_temperature). Wikipedia. — Overview of Planckian locus, CCT, and the Duv metric.
- Waveform Lighting. [Calculate color temperature (CCT) from CIE 1931 xy coordinates](https://www.waveformlighting.com/tech/calculate-color-temperature-cct-from-cie-1931-xy-coordinates). — Practical CCT calculation walkthrough.
- Helland, T. (2012). [How to convert temperature (K) to RGB](https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html). — Piecewise polynomial approximation used in `kelvin.ts`.
- Myndex. [A comparative look at Lab and Luv colorspaces, and LCh](https://gist.github.com/Myndex/47c793f8a054041bd2b52caa7ad5271c). — Analysis of CIE Lab vs. CIE Luv for display-oriented color picking.
- [XYZ to RGB — Color Calculations](https://colorcalculations.wordpress.com/xyz-to-rgb/). — Worked examples of XYZ↔RGB matrix transforms.

### Clustering and quantization

- Arthur, D. & Vassilvitskii, S. (2007). [k-means++: The advantages of careful seeding](http://ilpubs.stanford.edu:8090/778/1/2006-13.pdf). SODA 2007. — D²-weighted initialization used in the k-means++ seeding stage.
- Heckbert, P. (1982). Color image quantization for frame buffer display. SIGGRAPH 1982. — The median-cut algorithm (MMCQ) adapted here for OKLab.

### Tools and implementations

- [oklch-picker](https://github.com/evilmartians/oklch-picker) by Evil Martians. — OKLCh color picker; reference implementation for OKLCh UI patterns.
- [Color.js sRGB picker](https://apps.colorjs.io/picker/srgb) by Lea Verou & Chris Lilley. — Reference color picker from the Color.js project.
- [CIELAB and CIECAM02 color picker](https://rufflewind.com/_urandom/colorpicker/) by Rufflewind. — Lab-space picker with gamut visualization.
- [Unicolour](https://github.com/waacton/Unicolour) by Waacton. — .NET color conversion library. Cross-reference for conversion correctness.

### Internal docs

- Individual color space references: [`assets/docs/`](../assets/docs/) — Historical context, component ranges, conversion functions for each of the 15 spaces.
- Gamut mapping derivation: [`docs/gamut-mapping.md`](./gamut-mapping.md) — Full walkthrough of the cubic boundary, Halley's method, hue sectors, and the adaptive L0 formula.

# Quantization

Palette extraction from image pixel data, operating natively in OKLab. Conventional quantizers (median cut, octree) work in sRGB, where Euclidean distance poorly tracks perceived difference. Clustering in OKLab means bucket splits and centroid convergence respect perceptual uniformity directly.

```ts
import { quantizePixels, dominantColor } from "@mkbabb/value.js";

const palette = quantizePixels(pixels, width, height, { k: 6 });
// → QuantizedColor[] with oklab, oklch, rgb, css, population

const dominant = dominantColor(pixels, width, height);
// → highest-chroma cluster from a k=5 extraction
```

## Pipeline

1. **Downsample** the source image to a target pixel count (~20k by default). Transparent pixels are discarded.
2. **sRGB→OKLab** conversion.
3. **MMCQ pre-clustering**: median cut in OKLab, splitting along whichever axis (L, a, or b) has the widest range per bucket. Produces `k×4` to 64 coarse clusters.
4. **K-means++ seeding** (D²-weighted) selects k seeds from the MMCQ centroids, biased by population count. The first seed is the most populated bucket.
5. **K-means iteration** with a chroma-weighted distance metric:

   ```
   d² = ΔL² + (1 + kC · C) · (Δa² + Δb²)
   ```

   The `chromaWeight` (kC) parameter scales chromatic axes relative to lightness. At kC = 0 the metric is standard Euclidean in OKLab; higher values separate hue/chroma variations more aggressively.

6. **JND deduplication**: centroids within ΔE_OK < 0.02 (the just-noticeable difference threshold) are merged via population-weighted averaging.
7. **Perceptual sort**: nearest-neighbor traversal in weighted OKLCh space (hue continuity > lightness flow > chroma similarity), starting from the darkest color.

## Why OKLab

Median cut in sRGB tends to over-split greens (large gamut area in sRGB coordinates) and under-split blues and purples. OKLab's perceptual uniformity means bucket volume correlates with perceived color range, producing palettes that better represent what a human viewer actually distinguishes.

## Output

Each `QuantizedColor` carries:
- OKLab tuple (L, a, b)
- OKLCh tuple (L, C, H)
- sRGB [0–255]
- CSS `oklch()` string
- `population` count (pixels in this cluster)

`dominantColor` runs a k=5 extraction and returns the cluster with highest OKLCh chroma.

## Sources, acknowledgements, & c.

- Arthur, D. & Vassilvitskii, S. (2007). [k-means++: The advantages of careful seeding](http://ilpubs.stanford.edu:8090/778/1/2006-13.pdf). SODA 2007. — D²-weighted initialization used in the seeding stage.
- Heckbert, P. (1982). Color image quantization for frame buffer display. SIGGRAPH 1982. — The median-cut algorithm (MMCQ) adapted here for OKLab.
- Ottosson, B. (2020). [A perceptual color space for image processing](https://bottosson.github.io/posts/oklab/). — The OKLab space wherein we cluster.

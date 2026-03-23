# Color Quantization

`quantizePixels()` extracts a perceptual palette from raw image data. The pipeline operates natively in OKLab so cluster boundaries align with perceived color differences rather than RGB channel magnitudes.

```ts
import { quantizePixels, dominantColor } from "@mkbabb/value.js";

const palette = quantizePixels(pixels, width, height, { k: 6 });
// → QuantizedColor[] with oklab, oklch, rgb, css, population

const dominant = dominantColor(pixels, width, height);
// → highest-chroma cluster from a k=5 extraction
```

## Pipeline

1. **Downsample** to ~20k pixels (configurable via `targetPixels`).
2. **sRGB→OKLab** conversion; transparent pixels (alpha < 10) discarded.
3. **MMCQ pre-clustering**—median cut along the OKLab axis of greatest range—produces coarse buckets that seed the next stage.
4. **K-means++ initialization** (D²-weighted) selects k seeds from the MMCQ centroids.
5. **K-means iteration** with a chroma-weighted distance metric: `d² = ΔL² + (1 + kC·C)·(Δa² + Δb²)`. The `chromaWeight` parameter (kC, default 0.5) controls how strongly hue/chroma distinctions influence clustering relative to lightness.
6. **JND deduplication** merges centroids within ΔE_OK < 0.02 (the just-noticeable difference), collapsing clusters that landed in the same perceptual neighborhood.
7. **Perceptual sort** orders the palette by nearest-neighbor traversal in weighted OKLCh space, starting from the darkest color.

## Output

Each `QuantizedColor` carries:
- OKLab tuple (L, a, b)
- OKLCh tuple (L, C, H)
- sRGB [0–255]
- CSS `oklch()` string
- `population` count (pixels in this cluster)

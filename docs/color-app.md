# Color App

The [color picker](https://color.babb.dev) is a Vue 3.5 application that exercises value.js's parsing, conversion, and interpolation facilities. Deployed via GitHub Pages from the `demo/color-picker/` root.

## Views

### Home

Spectrum canvas, component sliders per color space, alpha control. The right pane shows a color space selector and a "nutrition label" with component ranges, conversion metadata, and the XYZ coordinate.

### Palettes

Save, organize, and publish color palettes. The current palette editor renders watercolor swatches with organic border-radius morphing (SVG displacement filter). Published palettes are votable and sortable by popularity or recency.

### Browse

Search and discover community palettes. Fetches from the palette API—see [`api/README.md`](../api/README.md) for endpoints and schema.

### Extract

Pull palettes from images. Uses the OKLab-native quantization pipeline documented in [`docs/quantization.md`](quantization.md). A chroma-weight slider controls how strongly hue/chroma distinctions influence clustering relative to lightness.

### Generate

Create random palettes with aesthetic presets and harmony algorithms.

**Presets** constrain OKLCh ranges to produce colors with consistent character: vibrant, pastel, warm, cool, earth, neon, muted, dark, jewel. Each preset defines lightness, chroma, and hue bounds.

**Harmonies** distribute hues across the palette: golden angle (137.5°, maximum separation), analogous (±30°), complementary (180°), triadic (120°), split-complementary (150°/210°). All generated colors are gamut-mapped to sRGB via Ottosson's analytical method.

Generation uses a seedable PRNG (Mulberry32) for reproducibility.

### Gradient

Build gradients with per-interval easing. Interpolate in any of the 15 color spaces with configurable hue method (shorter, longer, increasing, decreasing).

The CSS output bakes easing into explicit color stops—browsers can't natively interpolate with arbitrary easing between gradient stops, so the tool generates 32 intermediate stops per interval that approximate the chosen curve.

Bi-directional editing: changes in the visual editor update the CSS, and edits to the CSS parse back into the model via `parseCSSValue()`.

### Mix

Mix N colors or N palettes together using `mixColorsN()` (pairwise left-fold of the 2-color `mixColors()`). Supports all 15 interpolation spaces and four hue methods.

Palette mixing handles size mismatches via three strategies:
- **Discard**: mix only the common (shortest) rows
- **Repeat**: wrap shorter palettes cyclically
- **Distribute**: linearly interpolate shorter palettes across the longer length

### Atmosphere

Live tuning of the background canvas blobs—orbit amplitude, blur, speed, color shifts, blob count. All parameters are reactive; the canvas re-renders each frame.

## Design System

**Fonts**: Fraunces (display, optical sizing disabled) and Fira Code (monospace).

**Glassmorphism**: `--glass-bg`, `--glass-blur`, `--glass-border`, `--glass-shadow` tokens for translucent surfaces with backdrop blur.

**Watercolor swatches**: SVG `feTurbulence` + `feDisplacementMap` filter for organic blob edges. Animated border-radius via `useWatercolorBlob` composable.

**Dock**: collapsible glass pill with layer transitions. Per-view action bars for context-aware controls.

See [`demo/CLAUDE.md`](../demo/CLAUDE.md) for the component inventory and composable list.

## Palette API

REST API for palette CRUD, voting, user sessions, and color name proposals. Hono + MongoDB, Docker Compose deployment. See [`api/README.md`](../api/README.md).

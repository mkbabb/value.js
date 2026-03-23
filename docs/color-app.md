# Color App

The [color picker](https://color.babb.dev) exercises value.js's parsing, conversion, and interpolation facilities across eight views.

## Views

### Home

Spectrum canvas, component sliders per color space, alpha control. The right pane hosts a color space selector and a nutrition label showing component ranges and conversion metadata.

### Palettes

Save, organize, and publish palettes. Watercolor swatches render with organic border-radius morphing via an SVG displacement filter. Published palettes are votable and sortable by popularity or recency.

### Browse

Search and discover community palettes from the palette API.

### Extract

Pull palettes from images using OKLab-native [quantization](quantization.md). A chroma-weight slider controls how strongly hue/chroma distinctions influence clustering relative to lightness.

### Generate

Create random palettes with aesthetic presets and harmony algorithms.

**Presets** constrain OKLCh ranges for consistent character: vibrant, pastel, warm, cool, earth, neon, muted, dark, jewel. Each defines lightness, chroma, and hue bounds.

**Harmonies** distribute hues: golden angle (137.5°), analogous (±30°), complementary (180°), triadic (120°), split-complementary (150°/210°). Generated colors are gamut-mapped to sRGB via Ottosson's analytical method. A seedable PRNG ensures reproducibility.

### Gradient

Build gradients with per-interval easing across any of the 15 color spaces. The CSS output bakes easing into explicit color stops since browsers can't natively interpolate with arbitrary easing between stops. Editing is bi-directional: visual changes update the CSS and CSS edits parse back into the model.

### Mix

Mix N colors or N palettes via pairwise left-fold. Palette size mismatches are handled by three strategies:
- **Discard**: common rows only
- **Repeat**: cyclic wrap of shorter palettes
- **Distribute**: linear interpolation across the shorter palette's length

### Atmosphere

Live tuning of the background canvas blobs: orbit amplitude, blur, speed, color shifts, blob count.

## Design System

Fraunces (display, optical sizing disabled) and Fira Code (monospace). Glassmorphism tokens for translucent surfaces with backdrop blur. Watercolor swatches use SVG turbulence + displacement for organic edges. A collapsible glass dock provides per-view action bars.

## Palette API

REST API for palette CRUD, voting, user sessions, and color name proposals.

### Sessions

No traditional accounts. `POST /sessions` mints a UUID token and a four-word slug. The token gates all writes; reads are public. Sessions unseen for 30 days are purged by daily cron.

### Palettes

Slug-addressed collections of 1–50 color stops. Paginated listing with `newest` and `popular` sort. Owner-only rename via `PATCH`. Atomic vote toggle with a unique composite index on `{userSlug, paletteSlug}`.

### Color Names

Users propose custom color names; admins approve or reject through a moderation queue. Approved names feed the app's color name registry.

### Endpoints

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/sessions` | — | Register |
| POST | `/sessions/login` | — | Log in by slug |
| GET | `/sessions/me` | Session | Current user |
| GET | `/palettes` | — | List (paginated) |
| GET | `/palettes/:slug` | — | Get by slug |
| POST | `/palettes` | Session | Create |
| PATCH | `/palettes/:slug` | Session | Rename (owner) |
| POST | `/palettes/:slug/vote` | Session | Toggle vote |
| GET | `/colors/approved` | — | Approved names |
| POST | `/colors/propose` | Session | Propose name |

Rate limiting: 60 reads/min, 10 writes/min per IP. Admin endpoints require bearer token auth.

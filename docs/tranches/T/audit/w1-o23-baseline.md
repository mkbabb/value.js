# T.W1 — O-23 BUNDLE BASELINE (the ±2% referent for the whole wave)

**Captured at wave-open HEAD** `773e759` (T.W0 close) on branch `tranche-t`, 2026-07-10,
BEFORE any W1 code change. This is the O-23 (§6.1) referent: every named chunk's gzip size
must stay flat **±2%** across the W1 codemod (the demo-dogfood repoint). The Q15 promotions
are a DELIBERATE semver-MINOR addition to the library subpath barrels — the growth of
`dist/subpaths/color.js` from the 7 promoted primitives is EXPECTED and recorded here as the
one sanctioned non-flat delta (ratification: "Q15 promotions are expected semver-MINOR
additions [AMENDED-AT-PASS-2 — 'byte-stable' contradicted Q15's own default]").

Method: `npm run build` (production library) + `npm run gh-pages` (demo), then gzip size per
emitted `.js`/`.css` chunk (`zlib.gzipSync(readFileSync(f)).length`). Content-hash suffixes are
part of the filename; the stable NAME (hash stripped) is the O-23 comparison key.

## Library build — `dist/` (gzip bytes)

| Named chunk | gzip B |
|---|---|
| `subpaths/color.js` | 1924 |
| `subpaths/parsing.js` | 870 |
| `subpaths/units.js` | 531 |
| `subpaths/easing.js` | 511 |
| `subpaths/math.js` | 194 |
| `subpaths/transform.js` | 192 |
| `subpaths/quantize.js` | 109 |
| `value.js` (`.` root monolith) | 5684 |
| `serialize-*.js` | 12629 |
| `contrast-*.js` | 10944 |
| `utils-*.js` | 5751 |
| `easing-*.js` | 5565 |
| `gamut-*.js` | 4697 |
| `units-*.js` | 4347 |
| `path-*.js` | 4200 |
| `colorFilter-*.js` | 3990 |
| `quantize-*.js` | 2327 |
| `math-*.js` | 571 |

> **Q15 note**: `subpaths/color.js` (and transitively `value.js`) is the ONE chunk expected to
> grow: it gains 7 named re-exports (`getColorSpaceBound`, `hsl2rgb`, `oklch2xyz`, `xyz2rgb`,
> `linearToSrgb`, `hex2rgb`, `oklabToLinearSRGBInto`) + their dependency closure. This is the
> sanctioned semver-MINOR addition, not an O-23 regression. All 7 are parse-that-FREE, so the
> `subpath-budget` invariant (color subpath stays parse-that-free) survives.

## Demo build — `dist/gh-pages/assets/` (gzip bytes, hash-stripped name)

| Named chunk | gzip B |
|---|---|
| `index.js` | 203626 |
| `glass-ui.js` | 112133 |
| `index.css` | 88541 |
| `glass-fonts.css` | 100417 |
| `vendor-katex.js` | 76388 |
| `vendor-highlight.js` | 11949 |
| `katex.css` | 8094 |
| `color-utils.js` | 21485 |
| `dispatch.js` | 11799 |
| `PalettesPane.js` | 17253 |
| `GradientPane.js` | 15014 |
| `ExtractPane.js` | 8835 |
| `PaletteCard.js` | 8054 |
| `BrowsePane.js` | 7613 |
| `MixPane.js` | 7109 |
| `AdminPane.js` | 7094 |
| `kelvin.js` | 3325 |
| `xyz.js` | 3069 |
| `quantize-worker.js` | 3075 |
| `color-space-meta.js` | 2706 |
| `AboutPane.js` | 2697 |
| `oklch.js` | 2611 |
| `hex.js` | 2597 |
| `lab.js` (space) | 2465 |
| `rgb.js` | 2323 |
| `oklab.js` (space) | 2247 |
| `hsv.js` | 2218 |
| `hsl.js` | 2209 |
| `hwb.js` | 2194 |
| `lch.js` | 2168 |
| `GeneratePane.js` | 1947 |
| `cylindrical.js` | 1679 |
| `lab.js` (conv) | 1635 |
| `createLucideIcon.js` | 1588 |
| `usePaletteExport.js` | 1497 |
| `ConfigSliderPane.js` | 1237 |
| `oklab.js` (conv) | 1175 |
| `HeroBlob.js` | 1104 |
| `BlobPane.js` | 929 |
| `confirm-dialog.js` | 851 |
| `PaletteCardSkeleton.js` | 772 |
| `EmptyState.js` | 756 |
| `xyz-extended.js` | 689 |
| `search.js` | 1260 |
| `packrat-entry.js` | 4711 |
| `AuroraPane.js` | 1255 |
| `PaneHeader.js` | 402 |
| `katex.js` | 400 |
| `dateFormat.js` | 277 |
| `useDocumentVisibility.js` | 237 |
| `prng.js` | 208 |
| `rolldown-runtime.js` | 423 |
| `skeleton.js` | 20 |
| `AboutPane.css` | 1998 |
| `BrowsePane.css` | 411 |
| `PalettesPane.css` | 651 |
| `ExtractPane.css` | 616 |
| `PaneHeader.css` | 573 |
| `ConfigSliderPane.css` | 380 |
| `AuroraPane.css` | 259 |
| `PaletteCard.css` | 252 |
| `GradientPane.css` | 194 |
| `PaletteCardSkeleton.css` | 176 |
| `MixPane.css` | 175 |
| `usePaletteExport.css` | 70 |

> **O-23 read for the demo build**: the repoint moves ~149 demo import lines off `@src/*` deep
> paths onto the public `@mkbabb/value.js/{color,parsing,math,easing,units,quantize}` subpath
> specifiers (resolved to `dist/` by the vite self-alias). The SAME symbols are pulled; only the
> resolution path changes (source module → pre-built parse-that-free subpath chunk). Expect
> per-named-chunk gzip flat ±2%. A chunk blowing ±2% implicates a barrel/side-effect regression
> (§Triumvirate) — halt, don't ship.

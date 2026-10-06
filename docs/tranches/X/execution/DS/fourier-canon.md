# fourier canon: the original styles, recovered (X-DS archaeology)

Wave: `waves/X-DS.md` (COHESION §0ej). App: fourier, `web/src/**`. Repo HEAD read: `m/w1-bump-migration` @ `2935a81`.
Method: `git show` / `git log`, plus a throwaway worktree (`.worktrees/ds-orig`, now removed) that served two historical builds headlessly on :3199 against today's API on :8000. Real Chrome, new-headless (§0ei).

## The two reference points

| ref | commit | what it is | frames |
|---|---|---|---|
| **ORIGIN** | `65c1565` (2026-03-06, "sticky TOC, epicycle logo…"), with `7c271e5` "refine design language — paper textures" and `ba89dab` "body font to Computer Modern" | The first designed UI, before glass-ui (glass arrives at `fae704d` on 2026-04-17). Hand-written tokens in `web/src/style.css`. | `evidence/DS/fourier/pass-00/ref-65c1565/` (`/paper`, `/visualize` × light/dark × 1440/390) |
| **PRE-DOCK** | `576e40a` (2026-09-22, parent of `53aaa6f`) | The last chrome before X.F.W11.c put the app on a GlassDock. glass-ui 8.0.0. Sticky header bar, `cartoon-card` stamps. | `pass-00/ref-576e40a/` (paper, gallery, equation, morph at 1440 light/dark, plus two 390s) |

The **ORIGIN sets the lighting**: it is the flat one. The **PRE-DOCK sets the identity** that grew up after it and stays under §0dm: CM type, the Fraunces ℱ, the warm `--card`, the paper grid, the viz and section hues. PRE-DOCK is not flat. Its `cartoon-surface` stamp (`--shadow-cartoon-md` = three offset ink layers) is already a stacked shadow.

## Recovered canon → today's glass tokens

| axis | ORIGIN (`65c1565`) | PRE-DOCK (`576e40a`) | maps to today's glass token |
|---|---|---|---|
| **page tone** | `--background: hsl(48 15% 98%)` / dark `hsl(24 8% 6%)`, warm paper. `.paper-texture`: fractal-noise SVG at 4% opacity, `multiply` (`screen` in dark) | same texture plus glass `.paper-grid` fixed layer (`576e40a` App.vue:132) | `--background` (= `--neutral-0`, hsl(40 30% 98%) / hsl(24 9% 4%)) · `--paper-clean-texture` · `.paper-grid`. **Keep.** |
| **card tone** | `--card: 48 12% 99%` (barely off the page) / dark `24 6% 8%`; one tone step up | `--card: hsl(30 85% 96%)`, the warm cream | `--card` (keep the warm cream: it is identity) |
| **border** | **1px hairline** `--border: 48 8% 88%` / dark `24 4% 16%`; `* { @apply border-border }`; cards `rounded-xl border border-border bg-card p-4` | 2px `cartoon-surface` border in `--border` | `--border-soft` (= `--border` 45%) or `1px solid var(--border)` at `--ink-edge`. **The card's separation is the hairline, not a shadow.** |
| **radius** | `--radius: 0.625rem`; cards `xl` = 14px; controls `lg` = 10px; chips `md` = 8px | glass radii (W11.a moved literal radii onto tokens: `e844536`…`f3d1bf9`) | `--radius-card` / `--radius-control` / `--radius-button` / `--radius-badge`; keep the token ladder, read it at ORIGIN's proportions (card ≈ 14px, control ≈ 10px) |
| **shadow** | **None at rest.** Cards: none. Header: none (`border-b border-border/80`). The only shadows were the range thumb `0 1px 4px rgba(0,0,0,.2)`, the logo tile `shadow-sm`, and a hover-only `.card-hover` lift (`0 8px 30px /.06, 0 2px 8px /.04` plus `translateY(-2px)`) | `--shadow-cartoon-md` stamps on every `cartoon-card` (16 sites / 10 files, `576e40a` style.css) | **at most** one quiet `--shadow-sm` (`0 2px 8px` @ 6%) and **only** on a truly floating surface (dropdown, popover, the dock if it floats). Cards, panels, configurator stage and aside: **no shadow**. ORIGIN's hover-lift stack is NOT revived (it is a two-layer stack). |
| **inset highlight** | **none anywhere** (`insetHighlightLayers: 0`, computed) | none from fourier; glass 8 began the control edge | none (glass-owned today → O-87) |
| **backdrop blur** | the header only: `bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60`. 8 elements in all, the sticky bar and two image overlays | header, same recipe | one blur at most, on the floating chrome bar (the dock). Never on resting cards, inputs or buttons. |
| **fills** | flat: `bg-muted` for the segmented track and the active tab, `bg-card`, `bg-primary` logo tile. No gradients on any control (`controlGradientEls: 0`). | flat | flat `--muted` / `--secondary` / `--card` tokens; `--fill-hover` 0.05 and `--fill-selected` 0.12 tints |
| **density** | header `h-14`, `max-w-7xl`, `px-4 sm:px-6`; card `p-4`; nav tabs `px-3 py-1.5 text-sm`; inputs `px-3 py-2 text-sm`; buttons `h-9 w-9` | header-inner bar ~56px; config cards p≈20px | `--ui-scale` ladder; keep cards at `p-4` rhythm and controls at ~36px fine pointer (`--control-floor` 44px coarse stays) |
| **type** | body Computer Modern Serif (`ba89dab`); display Fraunces (`.fraunces`, `ss01 ss03`); mono Fira Code for nav, labels and numerals; KaTeX `1.02em`, display `1.1em` | the same three registers re-bound onto glass's slots (`576e40a` style.css `@theme`: `--font-sans/serif/text/serif-math` → CM, `--font-display` → Fraunces) | `--font-text` / `--font-serif-math` / `--font-display` / `--font-mono`. **Keep (identity, §0dm).** |
| **title** | `.depth-text`: a **six-layer text-shadow emboss** on the paper title | gone | stays gone. This is the one ORIGIN affectation; it is **not** revived. |
| **active state** | nav tab: `bg-muted text-foreground shadow-sm` plus a 3px × 16px `bg-primary` underline pip | dropdown nav, amber icon | the underline or tone step; no shadow |
| **motion** | entrance only: `fade-in` 0.4s, `scale-in` 0.3s, `slide-up` 0.5s, `tab-slide-in` 0.18s; `btn-press` scale 0.95; **no looping animation on chrome** (`loopingAnimations: 0`) | the same, plus the PRM-gated `slide-down` canon | transitions and the scrub only; **no infinite animation on chrome** |
| **identity hues** | `--accent-red`, `--accent-pink` (definitions), epicycle logo | the `--viz-*` and `--section-color-*` ramps, amber nav icon, `--tier-featured` | keep, every one (§0dm) |

## Lighting census: ORIGIN vs PRE-DOCK vs NOW

`scripts/ds-census.mjs` in the fourier repo. The computed half sums every route × light/dark × 1440/390, and the count is visible non-canvas, non-svg elements. Static is the app's own `web/src` CSS and templates.

| computed (Σ over pages) | ORIGIN `65c1565` (2 routes ×4) | PRE-DOCK `576e40a` (7 routes ×4) | **NOW `2935a81`** (7 routes ×4) |
|---|---:|---:|---:|
| elements with box-shadow | 16 | 286 | **426** |
| box-shadow layers | 32 | 716 | **1117** |
| multi-layer shadow stacks | 16 | 228 | **335** |
| inset highlight layers | 0 | 190 | **333** |
| text-shadow elements | 4 (the `.depth-text` title) | 0 | 0 |
| backdrop-blur elements | 8 | 206 | **300** |
| decorative gradient on a control | 0 | 0 | **2** |
| looping animations on chrome | 0 | 0 | **3** |

Raw JSON: `pass-00/census-before.json`, `pass-00/ref-576e40a/census.json`, `pass-00/ref-65c1565/census.json`.
ORIGIN's 16 stacked elements are its range thumbs and image overlays (Tailwind `shadow-sm` emits two layers). Its resting chrome had no shadow at all.

## The lighting present now that the ORIGIN did not have

### Glass-owned (READ-ONLY; cite O-87 FLAT-LIGHTING, never override locally)
1. **The four-layer control-edge stack** on every glass control (`.button.tap-squish`, `.toggle-group__item.control-surface.glass-control-edge`, `.field-control.glass-control-edge` inputs, `.glass-capsule-hover`): a `rgba(255,255,255,.1) 0 1px inset` **top-light bevel**, plus `-1px` and `±1px` inset ink rims, plus an outer layer. 67 + 54 + 16 + inputs element-frames. Each one is an inset highlight and a multi-layer stack.
2. **`glass-resting` cards** (`.gallery-card`, `.config-card`, `.paper-article`, `.morph-button`, the not-found card): the same inset bevel plus rims, plus a cast `oklch(0 0 0/.08) -1.5px 4px 16px`, plus `backdrop-filter: blur(16px) saturate(1.5)`. ORIGIN cards were a hairline and a tone step.
3. **The configurator stage and aside** (`/w`, `/v`): the bevel stack plus `blur(20px) saturate(1.5)` on two resting panels.
4. **The dock** (`.app-dock.glass-dock`): the bevel stack plus `--shadow-dock` (`0 0 20px` @14%, a halo, not a drop), plus `.dock-plate` `blur(16px) saturate(1.2)`. The animation dock pill (`.glass-dock.shape-pill`) adds a `0 0 12px` halo.
5. **Control backdrop blur**: `blur(14px) saturate(1.5)` on every toggle item, input and capsule button, so a resting control is a frosted lens.
6. **`saturate(1.605)` backdrop on buttons**, with `blur(0)`. No blur, but it is a lens tint on a flat control.
7. **Slider**: `.slider-track.track-well` inset well `0 1px 0` plus `.slider-thumb.glass-specular-track` `0 2px 8px` cast and the specular track.
8. **`.badge-atom`** (gallery tier badges): the full bevel stack on a 20px chip.
9. **`.progress-rail.track-well.track-flow`**: an infinite `track-flow` animation on `/equation`'s progress rail (looping motion on chrome).
10. **Cartoon ink** survives as tokens (`--shadow-cartoon*`, `--shadow-modal` = stamp plus `0 24px 64px`). No fourier site uses them now, but `--shadow-modal` reaches dialogs.

### Fourier-owned (cure at the root in X-DS passes)
1. `AnimationControls.vue:229-231`: `--dock-control-active-bg` is a **seven-stop rainbow `linear-gradient(135deg…)`** with an **infinite `rainbow-drift` 2.5s** on the play button (`/v`, `/w`). It is both a decorative control gradient and idle motion.
2. `ContourEditorCanvas.vue:506`: a `.spline-path` `filter: drop-shadow(0 0 2px …)` **glow** on the contour. `:511-516` add a **`golden-shimmer` infinite pulse** of that glow (2px → 5px) on hover.
3. `ConvergenceLegend.vue:96`: an amber **glow dot** `0 0 4px` @40%.
4. `EquationView.vue:753` and `ConvergencePlot.vue:645`: a `0 4px 12px` @8% cast on resting equation and plot surfaces. `EquationView.vue:812`: `0 4px 12px rgba(0,0,0,.12)`. A floating tooltip may keep one quiet shadow; a resting plate may not.
5. `PaperArticleWindow.vue:153`: `shadow-sm` on paper figures. ORIGIN figures were bare.
6. `PaperView.vue:514/526`: top and bottom scroll-fade gradients. These are content fades, not lighting; keep unless a critic finds them read as a vignette. `:548` is the teleport overlay's radial vignette: review it.
7. `SliderControl.vue:315`: a two-stop hard track fill (a value bar, not decoration). **Allowed.**
8. `AdminUserTable.vue:176` and `GalleryCard.vue:233`: one-colour gradient tint layers (flat). **Allowed.**
9. `ContourEditorCanvas.vue:445-446`: grid lines (content). `HarmonicLevelGrid.vue:338`, `ImageUpload.vue:175`, `VisualizationView.vue:967/977`: focus or selection rings (spread-only). **Allowed.**
10. The **nav-trigger amber icon glow** `filter: drop-shadow(0 0 3px …)` from PRE-DOCK (`576e40a` AppHeader.vue:217/404) retired with AppHeader at `53aaa6f`, and AppDock did not re-mint it (the static census finds no drop-shadow in `AppDock.vue`).

## Allowance (what the census must fall to)
- `textShadowEls` 0 · `filterDropShadowEls` 0 on chrome · `controlGradientEls` 0 · `loopingAnimations` 0.
- `insetHighlightLayers` 0 (glass-owned residue stays honest-RED under O-87 until glass lands it).
- `multiLayerShadowEls`: only floating surfaces (menus, popovers, the dock if it floats), each at one layer, so the target is ≈ 0 multi-layer.
- `backdropBlurEls`: the floating chrome bar only, ≤ 1 per page (ORIGIN: the sticky header).
- Fourier-owned static: 0 glows, 0 infinite chrome animations, 0 resting casts.

## Reproduce
```
# app on :3100 (vite) → API :8000 (MONGO_URI=mongodb://localhost:27018/fourier BLOB_DIR=~/.mongo-dev/fourier-blobs)
node scripts/ds-census.mjs --frames <dir>                  # census JSON + frames, headless real Chrome
node scripts/ds-census.mjs --static-only --root <worktree>  # static half on a historical checkout
```

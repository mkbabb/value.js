# X-DS · value.js canon: the original color-picker styles (archaeology, 2026-10-06)

Authority: `waves/X-DS.md`, COHESION §0ej. This note recovers the pre-glass color-picker styles from git history, maps them onto today's glass tokens, and lists the lighting effects present now that the original did not have. It is the reference for passes 1..12; it changes no product file.

## 1. Where "the original" lives

| Era | Commits | What it is |
|---|---|---|
| **Original** (2024-07 → 2025-07) | `35cd9d5d` (2024-07-17, first commit) … `8d39f061` (2024-07-19 "styling") … `684c818f` (2025-07-24, last commit of the era) | The single-page picker: one picker card, one "About the color spaces" card, shadcn primitives, a hand-set card style. **This is the canon.** |
| **Pre-glass, modernised** (2026-02 → 2026-03-09) | `38881c5f` (WatercolorDot), `3898bb11` / `5e775b95` (coloured drop shadow on the blob), `475f8f38` (satellite blobs, gooey filter) … `7014a01f` (2026-03-09) | Same card and type, plus the first lit objects (the watercolor blob). Useful as the boundary: the cards are still flat here, only the blob is lit. |
| **Glass adoption** | `b2493707` (2026-03-16, GlassDock added), `636a5146` (2026-03-16, "restyle shadcn-vue primitives for glassmorphic design"), `c3e22169` (2026-03-25, shadcn re-exported from glass-ui), `f2c8f565` (2026-07-17, glass-ui 7.0.0 adopted whole) | Everything after this is the glass era. |

Reference frames (headless Chrome, served from a throwaway worktree, since removed):
- `docs/tranches/X/evidence/DS/value/orig-684c818f/picker-{1440,390}-{light,dark}.png`
- `docs/tranches/X/evidence/DS/value/preglass-7014a01f/picker-{1440,390}-{light,dark}.png`
- Today (BEFORE): `docs/tranches/X/evidence/DS/value/pass-00/<route>-{1440,390}-{light,dark}.png`, 9 routes, 36 frames.

Note on the frames: in `684c818f` the card stays white in dark mode. That commit hard-coded the `@theme` colours (`--color-card: hsl(0 0% 100%)`), so `.dark` never reached them; `40d229ad` (2026-02-26) fixed it. The dark tone of the original is therefore read from `7014a01f` (near-black card `222.2 84% 4.9%`), not from the 2025 frame.

## 2. The original, choice by choice

All citations are `684c818f` unless stated.

| Aspect | Original choice | Source |
|---|---|---|
| **Page tone** | The page IS the current colour: a full-bleed solid `backgroundColor` layer, with a 1rem two-tone checker SVG at 10% fill-opacity over it. No aurora, no blur, no grain. | `demo/color-picker/App.vue` (the two absolute layers; `.grid-background { background-size: 1rem }`) |
| **Surface tone** | Opaque. Card = `bg-card` (`0 0% 100%` light, `222.2 84% 4.9%` dark). No translucency, no backdrop filter, no tint. | `demo/@/styles/style.scss` `:root` / `.dark`; `demo/@/components/ui/card/Card.vue` |
| **Border** | A heavy ink frame: `lg:border-4 border-gray-700`. Inside the card, hairlines only: `Separator`, and `border border-input` on the colour-string field. | `ui/card/Card.vue`; `ColorPicker.vue:206` |
| **Radius** | Small and square-ish. Card `rounded-lg` (0.5rem; the picker card overrides to `rounded-md`), spectrum and slider tracks `rounded-sm` (2px), slider thumb `rounded-sm`, the swatch and spectrum dot `rounded-full`. `--radius: 0.5rem`. | `ui/card/Card.vue`; `ColorPicker.vue:3,109,162,178`; `style.scss` |
| **Shadow** | Exactly one idiom, and it is flat: a hard offset with zero blur. Card `shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]` (`dark:shadow-gray-700`). The spectrum repeats it, tinted by the live colour: `boxShadow: 8px 8px 0px 0px <current colour at 30% alpha>`. Nothing else on the page casts a shadow except shadcn's stock `shadow-md` on floating content (tooltip, hover card, select menu, popover) and on the spectrum dot. | `ui/card/Card.vue` (present since `35cd9d5d`); `ColorPicker.vue:864` (`spectrumStyle`); `ui/{tooltip,hover-card,select,popover}/*Content.vue` |
| **Highlights, bevels, rims, glows** | None. No inset shadow anywhere in the picker, no text-shadow in use (`.depth-text` exists in `utils.scss` but nothing renders it), no `filter`, no `backdrop-filter`. | grep of `ColorPicker.vue`, `App.vue`, `style.scss` |
| **Fills on controls** | Flat. Buttons are shadcn `variant="link"`/ghost icon buttons with no plate at all: three bare lucide glyphs (copy, shuffle, palette) in a row. The only gradients are content: the spectrum plate and the four component tracks. | `ColorPicker.vue:164,244-330,860` |
| **Swatch** | A flat solid disc of the current colour: `w-12 aspect-square rounded-full`, `hover:scale-125`. No shading. | `ColorPicker.vue:42` |
| **Density** | Loose, few things. Two cards, `gap-6`, `max-w-screen-lg`, `p-4 py-10`; card header/content at shadcn's `p-6`; `grid gap-4` between picker blocks; spectrum `h-48`; tracks `h-6` with `gap-2`; one control row. Nothing floats above the cards except two corner affordances (`@mbabb`, the dark toggle). | `App.vue`; `ColorPicker.vue:2,106,109,136,162` |
| **Type** | Fraunces for everything editorial (`.fraunces`): the colour-space name bold italic `text-2xl` in the live colour, the component values `text-4xl font-semibold`, labels `font-bold` with the range in `font-normal italic opacity-60`, the About title, section heads `text-4xl font-bold`. Fira Code (`.fira-code`) for the colour string, tooltips and the `@mbabb` link. No uppercase tracking, no small-caps labels. | `demo/@/styles/utils.scss:1-2,13-19`; `ColorPicker.vue:21,57,68,88,144-146,206` |
| **Motion** | Transitions only: `hover:scale-125` on the swatch and icons, `transition-all duration-300` on the saved-colours drawer, shadcn accordion/collapsible keyframes. No loop runs on the chrome (`.rainbow-wrapper`'s `rainbow 5s infinite` is defined but unused). | `ColorPicker.vue:42,337,348`; `utils.scss` |
| **Identity** | The live colour, used flat: page fill, the space name, the About accent, the spectrum's offset shadow, headings in the About card. | `App.vue`; `ColorPicker.vue` |

In one line: **ink-framed opaque cards on a flat field of the current colour, one hard 8px offset shadow and no other light, Fraunces set large, gradients only where they are the colour data.**

## 3. Mapping onto today's glass tokens

"Revive" means re-deriving tone, borders and density on glass components (X-DS §The canon), not restoring old files. Glass is read-only; rows marked **O-87** are glass-owned and are cited against `relay/X-ALL-BK-FLAT-LIGHTING.md`, never overridden locally.

| Original | Today | Verdict for the passes |
|---|---|---|
| Hard offset card shadow, 8px/8px/0/0 at 80% ink | `--shadow-cartoon: 8px 8px 0px 0px color-mix(in srgb, var(--shadow-color) 80%, transparent)` and `--shadow-card: var(--shadow-cartoon)` (`demo/styles/foundation.css:395-398`, dark `:561`; lineage `e58155fc9`) | **Already the original.** Keep as the ONE elevation idiom for cards. It is one layer and flat, so it sits inside the census allowance. |
| Spectrum's colour-tinted hard offset | `box-shadow: 8px 8px 0px 0px color-mix(in srgb, var(--spectrum-shadow) 50%, black)` (`demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:244`) | **Already the original.** Keep. |
| 4px `gray-700` ink frame | `--card-edge` (12% foreground hairline, `foundation.css:299`) plus glass's rim: `--glass-rim-top` (inset white top-light), `--glass-rim-bottom` (inset shade), `--glass-edge-light` | The frame became a lit bevel. Tone-step or hairline via `--card-edge` is the consumer's lever; the rim itself is **O-87**. |
| Opaque `bg-card` | `.glass-resting` / `.glass-quiet`: `--glass-plate-resting` over `--glass-blur-resting` (`blur(16px × --glass-level) saturate(1.5)`), `--glass-tint-source: var(--accent-live)` at 4% (`foundation.css:282-283`) | The material is **O-87**. The consumer levers that exist today are `--glass-level` and `--glass-tint-strength`; a pass may lower them at the token, never restyle the plate. |
| No floating chrome | The glass dock: `--shadow-dock: 0 0 20px …14%` halo plus the rim stack (5 to 6 box-shadow layers on `.glass-dock`) | **O-87.** |
| Stock `shadow-md` on menus only | `--glass-shadow-floating: var(--shadow-xl), 0 0 0 0.5px …`, `--glass-shadow-overlay`, `--glass-under-shadow-*` | One quiet neutral shadow on true floaters is the canon; the stack is **O-87**. |
| Plate-less icon buttons | glass `Button` / `.control-surface.glass-control-edge.glass-capsule-hover`: rim stack plus a two-layer `linear-gradient` fill | **O-87** (gradient fill on a control, inset highlight). |
| `rounded-lg` 0.5rem card, `rounded-sm` tracks | `--radius-card: var(--radius-2xl)` = 1rem, `--radius-control: pill`, tracks pill | Glass radii are tokens the consumer may set at its root (`--radius-card`), so tightening toward the original is a consumer cure if a critic calls for it. Not a lighting matter. |
| Flat solid swatch disc | glass `goo-blob` (WebGL metaball, white specular body) with `filter: drop-shadow(--blob-shadow-ambient) drop-shadow(--blob-shadow-contact)`, plus the consumer's radial-gradient contact shadow (`demo/picker/seat.css:74`) | The hero blob is the owner's live identity subject (§0dm), so it stays; its glossy shading and the double drop-shadow are **O-87**, the `seat.css` contact shadow is a consumer cure. |
| Flat swatches | `.watercolor-swatch`: `inset 0 0 6px` light, `inset 0 -2px 4px` shade, `0 2px 6px` drop (`demo/shared/ui/watercolor-dot/WatercolorDot.vue:16,41`; born `38881c5f`, 2026-02-26) | **Consumer cure.** Post-original, pre-glass affectation; flatten to the solid colour (the organic outline is identity and stays). |
| Fraunces + Fira Code | `--font-stack-display: "Fraunces"` (`foundation.css:238`), glass sans for body, mono for values | Type identity is intact. Kept (§0dm). |
| Page = the live colour, flat | The aurora backdrop derived from the live colour | Declared identity backdrop; the canon exempts it. Kept. |

## 4. Lighting present now that the original did not have

Measured by `scripts/ds-census.mjs` (BEFORE: `docs/tranches/X/evidence/DS/value/pass-00/census-before.json`, 9 routes × light/dark × 1440/390, verdict **RED**). The original scores 0 on every line below except the single hard offset.

Glass-owned (O-87; honest-RED until glass lands it):
1. **Rim-light bevel** on every glass surface: an inset white top highlight, an inset bottom shade and an inset side shade (`--glass-rim-top`, `--glass-rim-bottom`). Cards, the dock, buttons, segmented tabs, badges.
2. **Multi-layer shadow stacks**: up to 6 box-shadow layers on one element (rim + under-shadow + halo). The canon allows one.
3. **Dock halo** (`--shadow-dock`, a 20px zero-offset glow) and the under-shadows (`--glass-under-shadow-*`).
4. **Backdrop blur + saturate** on cards, dock, wells and header veils (`--glass-blur-*`).
5. **Gradient fills on controls** (`.control-surface` two-layer linear-gradient plate) and the hover **specular** (`--glass-specular-intensity-hover/active`, `--specular-x/y`).
6. **Lit hero blob**: glossy white metaball shading and a double `drop-shadow` on `.goo-blob-wrapper`.
7. **Stacked cartoon shadow** `--shadow-cartoon-sm/md/lg` (three stepped layers, an extruded edge) where the original had one layer. Glass token, consumer call sites (`demo/styles/utils.css:106,136`, `shadow-cartoon-sm|md` utilities in palettes, search, generate).

Consumer-owned (curable here, tokens before instances):
1. **Watercolor swatch shading**: inset highlight + inset shade + drop (`WatercolorDot.vue:16,41`).
2. **Gold glows**: `filter: drop-shadow(0 0 … var(--color-gold))` on the crown (`demo/styles/animations.css:199,201`, `demo/styles/utils.css:164`, `demo/palettes/browser/card/PaletteSpecimen.vue:174`).
3. **Idle loops on chrome**: `lamp-dot-pulse` (`demo/shell/dock/DockStatusLamp.vue:113`), `offline-dot-pulse` (`demo/palettes/browser/status/ApiOfflineChip.vue:88`), `animate-pulse` skeleton segments (`demo/palettes/browser/card/ShadowPalette.vue`). Spinners (`animate-spin`) carry meaning while a request is in flight and are a critic's call, not an automatic strike.
4. **Blob contact shadow**: the radial-gradient ellipse under the bead (`demo/picker/seat.css:74`).
5. **Header veils**: `backdrop-filter: var(--glass-blur-resting)` with a gradient mask (`demo/picker/header.css:62-70`, `demo/shared/ui/PaneHeader.vue:35`, `demo/styles/shell.css:391`).
6. **Soft shadows beside the cartoon idiom**: `var(--shadow-sm)` on the gradient rail and stop handles, a 3-layer handle face (`demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue:55,247,250`), the eyedropper loupe's blurred two-layer shadow (`demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:297,306`), `shadow-sm` in `MiniColorPicker.vue:37`.
7. **Density and furniture the original lacked**: wells inside cards (the slider console, the "Selected" tray), pill tracks, a tinted pill behind the space name. Not lighting, but the proportion the critics should weigh against §2.

Not violations (content or identity, exempt by the canon): the spectrum plate, component tracks, alpha checker, gradient editor previews, palette ramps, the aurora, and the hard offset shadows of §3 rows 1 and 2.

## 5. The census

`node scripts/ds-census.mjs [--base http://localhost:9000] [--widths 1440,390] [--out file.json]`. Static half: the app's CSS and Vue styles under `demo/**` (not `demo/ui/**`, not tests). Computed half: every rendered element on each served route, headless Chrome (§0ei). Allowance checked on the computed half: at most 1 box-shadow layer per element (0/0/0 rings are borders, tallied apart), and 0 inset highlights, text-shadows, drop-shadows, filter blurs, gradient fills on controls, and looping animations on chrome.

BEFORE totals (computed): 1860 box-shadow layers on 844 elements, 396 multi-layer elements, max 6 layers on one element, 491 inset highlights, 16 drop-shadows, 171 backdrop blurs, 36 gradient fills on controls, 65 looping animations, 0 text-shadows. Split by owner: glass 1131 layers / 398 inset highlights / 16 drop-shadows / 36 control gradients; consumer 729 layers / 93 inset highlights / 65 loops. Static (consumer source): 27 box-shadow declarations (40 layers, 10 multi-layer), 4 drop-shadow filters, 4 backdrop blurs, 6 gradient fills, 3 infinite animations, 11 shadow utilities, 13 loop utilities.

Element totals move a little between runs (skeletons and async panes settle differently), so compare the gate's `over` map and the offender list, not the last digit.

Capture caveat: the BEFORE frames were served by `vite --port 9000` without the API (`scripts/dev/dev.sh up` cannot start here: no Docker daemon and no native mongod), so each frame carries the demo's own "DEV MISCONFIGURED" chip at top right, and the Browse pane shows its "Couldn't load palettes" error state instead of community palette cards. Palette cards are therefore NOT in the BEFORE set; pass 1 should re-frame `/#/browse` once the local API is up.

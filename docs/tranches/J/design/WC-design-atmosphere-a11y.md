# J.WC — Atmosphere, Depth & A11y Refinement Spec

**Lens**: atmosphere · visual depth · a11y polish.
**Mode**: SPEC ONLY (design wave). No app src edits, no builds, no git. Every recommendation is grounded in a real `file:line` + a named glass-ui primitive.
**Scope boundary**: this is a *refinement* of stable, glass-ui-built `color.babb.dev`. It does not touch the J remix/atom-diff core (W1–W4); it sharpens how the app already uses glass-ui's atmosphere/glass/a11y levers. Where J.W3 lands the diff render, §3 (forced-colors swatch contract) is the a11y floor that render inherits.

---

## §0 — What's actually there (audit)

Read first, grounded:

- **App shell** `demo/color-picker/App.vue:4–73` — `.app-layout` hosts a live aurora `<canvas>` (`:212–215` `useAurora(atmosphereCanvas, () => auroraConfig)`), `<nav>` dock, `<main>` two-pane grid. Landmarks are correct (`nav`/`main`/`role="article"` cards). The aurora canvas is `aria-hidden` — good.
- **Aurora is STATIC.** `App.vue:212` `reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG))` — the atmosphere never reads the picked color or the active palette. The app is a *color tool* whose background ignores the color. `AuroraConfig.palette` is an `OklchStop[]` (glass-ui `src/components/custom/aurora/presets.ts:70,149`) — the exact seam to drive.
- **The glass ladder is collapsed to one flat rung.** *Every* pane is `<Card tier="wash" :shadow="false" :grain="false">` (`BrowsePane.vue:2`, `ExtractPane.vue:3`, `GradientPane.vue:20`, `AdminPane.vue:2`, `PalettesPane.vue:2`, `GeneratePane.vue:32`, `MixPane.vue:61`, `AboutPane.vue:3`, `ConfigSliderPane.vue:77`). glass-ui ships a 5-rung ladder (`.glass-wash → .glass-quiet → .glass-resting → .glass-floating → .glass-overlay`, `src/styles/glass.css:20–64`); the app uses rung 1 only and turns its grain + shadow OFF. No depth hierarchy reads between the pane substrate, the cards inside it, and floating menus.
- **PaletteCards are NOT glass.** `PaletteCard.vue:6–7` `rounded-card border border-border bg-card … hover:shadow-card-hover` — an opaque fill on the glass pane. The one cartoon-shadow language is strong (`style.css` `--shadow-cartoon: 8px 8px 0 …`) but the card is a flat plane *on* glass, not a glass tier *above* it. Floating surfaces already reach for `.glass-floating` (`BulkActionToolbar.vue:12`, `CurrentPaletteEditor.vue:57`) — proof the ladder is available and idiomatic; the cards just don't climb it.
- **PaperBackdrop unused.** glass-ui ships `/paper-backdrop` (dist present); the demo's `--shadow-color: var(--foreground)` pop-art identity would read as *paper-stock under glass* but no paper underpaint is mounted.
- **a11y is 80% there.** focus-visible rings are pervasive and correct (`PaletteCard.vue:88,113`, swatch buttons `PaletteCardSwatches.vue:14,44`); landmarks + aria-labels are disciplined; `prefers-reduced-motion` is honored (`animations.css:32`, `GooBlob.vue:108`). **Gap: zero `forced-colors` / `@media (forced-colors: active)` handling anywhere in `demo/@/`** (verified). The product *is* color — `PaletteColorStrip.vue` (`aria-hidden` strip) and the swatch grid encode meaning purely in `background-color`, which Windows High-Contrast flattens to a single system color. Swatches vanish. `--border-soft` (glass-ui `tokens.css:393`, `theme.css:60`) is shipped but the app hand-rolls `border-border/15` (`PaletteCardSwatches.vue:7,23`) instead.

---

## §1 — AESTHETIC DIRECTION

**"Pigment under glass."** The app already has a bold, non-generic identity — Fraunces display + Fira Code mono + gold accent + an 8px pop-art cartoon shadow (`style.css`). The refinement is to make that identity *atmospheric and dimensional* rather than flat-on-flat: a living aurora whose hue is **derived from the color you're holding**, panes that sit as **frosted glass over a paper-pigment ground**, and cards that **climb the glass ladder** so the eye reads pane → card → floating-menu as three distinct depths. The cartoon shadow stays as the signature — but it becomes the *top* of a real elevation stack, not the only depth cue. A11y is non-negotiable: the same glass that gives depth must survive forced-colors and the swatches must carry a non-chromatic border so meaning never lives in hue alone.

Keep: Fraunces/Fira Code, gold, the cartoon-offset shadow language, the orchestrated pane-slide page transition (`App.vue:243–281`). Sharpen: depth ladder, color-reactive atmosphere, forced-colors floor.

---

## §2 — TOP REFINEMENTS (surface → glass-ui lever)

### R1 — Make the atmosphere track the held color (the headline)
**Surface**: `App.vue:209–215` (static `auroraConfig`) + `useAppColorModel` (`cssColorOpaque` is already provided app-wide, `App.vue:137`).
**Lever**: `AuroraConfig.palette: OklchStop[]` (glass-ui `aurora/presets.ts:70`) is reactive — `useAurora` re-reads `() => auroraConfig`. Convert the picked color (value.js already owns OKLab→OKLCH; `useAppColorModel`) into 2–3 `OklchStop`s and write them into `auroraConfig.palette` on color change, so the aurora *is* the palette you're building. On Browse/Palettes panes, seed from the focused `PaletteCard`'s `palette.oklabColors` (already on the model, `BrowsePane.vue:271`). Keep nuclei/warp/breath at the preset defaults — only `palette` is data-driven, so motion stays calm. Gate behind `prefers-reduced-motion` (drop `nucleiDrift`/`breathDepth` to 0; the hue still tracks, the canvas stops breathing).
**Why**: a color tool whose background ignores the color is the single biggest atmosphere miss. This is one reactive `palette` write against an existing live canvas — the highest-impact, lowest-risk lever.

### R2 — Climb the glass ladder: pane (wash) → card (resting) → menu (floating)
**Surface**: `PaletteCard.vue:6–7` (`border-border bg-card`); all panes (`tier="wash" :shadow=false :grain=false`).
**Lever**: the 5-rung ladder (`glass.css:20–64`). Keep panes at `tier="wash"` (correct — they're the substrate) but **re-enable `:grain` on the pane** so the frosted ground reads as glass, not a flat div. Promote `PaletteCard` from `bg-card` to `.glass-resting` (or `<Card tier="resting">`) so cards float a rung above the pane; the existing `hover:shadow-card-hover` becomes the *lift* to a near-floating read on hover. Floating menus already use `.glass-floating` (`BulkActionToolbar.vue:12`) — now there's a true 3-rung depth stack: substrate / card / overlay. This is the difference between "real depth + texture" and "flat surfaces."
**Why**: the ladder exists, is idiomatic here, and is currently flattened to one rung. Reading the depth costs three tier swaps.

### R3 — Forced-colors floor for the swatch/strip color encoding (a11y, blocking)
**Surface**: `PaletteColorStrip.vue:13–23`, `PaletteCardSwatches.vue:25–64`, `SwatchHoverMenu`, `PaletteCard.vue` color strip.
**Lever**: add `@media (forced-colors: active)` rules (demo-local `style.css` or scoped) that (a) restore a `1px solid CanvasText` outline on every swatch so adjacent colors stay distinguishable when HC collapses `background-color`, (b) keep the swatch `background-color` via `forced-color-adjust: none` ONLY on the decorative strip/swatch elements (the color *is* the content there — this is the legitimate opt-out), and (c) ensure the `aria-hidden` strip stays hidden but the interactive swatches keep a visible focus ring under HC (`CanvasText` outline). Pair with replacing the hand-rolled `border-border/15` (`PaletteCardSwatches.vue:7,23`) with glass-ui's shipped `border-border-soft` hairline (`theme.css:60`) for a single, auto-dark hairline language.
**Why**: the product's content is color; under forced-colors the swatches currently merge into one block — meaning is lost. This is the one true a11y *defect*, not a polish item.

### R4 — Paper-pigment ground under the glass
**Surface**: `App.vue:4–11` (`.app-layout` hosts only the aurora canvas) + `style.css` `--shadow-color: var(--foreground)` pop-art identity.
**Lever**: mount glass-ui `/paper-backdrop` (or the `.paper-texture` / `paper-underpaint` utilities, glass-ui `paper.css` / `cards.css`) as a layer *between* the aurora canvas and the panes. The frosted `tier="wash"` panes (post-R2 grain-on) then read as glass *over paper over aurora* — three atmospheric planes — which is exactly the "atmospheric backgrounds + depth over flat fills" the methodology asks for, and it makes the cartoon shadow read as ink-on-stock. Keep it subtle (low-opacity underpaint) so the aurora hue (R1) still bleeds through.
**Why**: turns a single decorative canvas into a layered atmosphere; reuses two shipped glass-ui surfaces; reinforces the existing pop-art identity instead of inventing a new one.

### R5 — Depth on the focused/active state (orchestrated, not scattered)
**Surface**: `PaletteCard.vue:6–9` (expand on click, `expanded` prop) + `App.vue:243–281` (the page-transition already orchestrates pane slides).
**Lever**: when a card is `expanded`, lift it one full rung (`.glass-resting → .glass-floating`) with the cartoon shadow deepening (`--shadow-cartoon → --shadow-cartoon-hover`, already tokenized in `style.css`) and a `useStaggerReveal`/`useScrollProgress` (glass-ui `composables/motion/`) stagger on the revealed swatches (`PaletteCardSwatches.vue` v-for) — one orchestrated reveal, replacing/augmenting the current height transition. Honor `prefers-reduced-motion` (instant, no stagger).
**Why**: the methodology prizes one orchestrated reveal over scattered micro-interactions; the expand is the app's key moment and currently only animates height. A staggered swatch reveal + a depth lift makes it the page's hero motion using composables already in glass-ui.

---

## §3 — Ordering & gate alignment

- **R1** + **R3** are the headline pair: R1 is the atmosphere win (one reactive write), R3 is the a11y defect fix (blocking). Both are small and independent.
- **R2** + **R4** together deliver the depth story; do R2 first (ladder) then R4 (paper) so the planes are validated incrementally.
- **R5** is the motion capstone; it depends on R2's rung promotion.
- All five honor `prefers-reduced-motion` (the app already gates motion — `animations.css:32`); none touch the J remix/atom-diff core. R3's forced-colors floor is the a11y contract J.W3's diff render inherits when it highlights changed swatches.

---

## FILE WRITTEN
`/Users/mkbabb/Programming/value.js/docs/tranches/J/design/WC-design-atmosphere-a11y.md`

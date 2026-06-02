# J.WC — Layout, spatial composition & glass-ui idiom refinement (design spec)

**Lens**: Layout, spatial composition & component idioms.
**Scope**: SPEC ONLY. No src edits, no builds, no git. Every recommendation is grounded in a real file:line + a named glass-ui primitive.
**Sibling**: `J.W1-palette-remix.md` (the REMIX/diff CORE spec) — this doc governs the SPATIAL surface those features land on (the BrowsePane grid, the PaletteCard, the diff render's home).

---

## AESTHETIC DIRECTION

The app is *about* color, yet its layout is the most colorless thing in it: nine panes that are byte-for-byte the same chassis (`Card tier="wash" :shadow="false" :grain="false" … max-w-desktop-pane mx-auto`, e.g. `BrowsePane.vue:2`, `PalettesPane.vue:2`, `GeneratePane.vue:32`, `ExtractPane.vue:3`, `MixPane.vue:61`, `AdminPane.vue:2`, `AboutPane.vue:6`), poured into a symmetric `1fr` / `1fr 1fr` grid (`style.css:153–172`). The 5-rung glass ladder collapses to a single `wash` rung; the golden-ratio type scale is present but every pane wears `text-heading`; the aurora runs `DEFAULT_AURORA_CONFIG` static (`App.vue:212`) while a live picked color sits one inject away. The typeface pairing is already strong and characterful — **Fraunces** display + **Fira Code** mono (`style.css:28–30`) — so the gap is NOT type; it is **depth, rhythm, and orchestrated entrance**.

The direction: keep the centered two-pane spine (it is the app's stable identity) but make the **tier ladder carry hierarchy** (hero picker floats above a quieter browse list), give the **palette grid an editorial rhythm** instead of a single column, replace the **hand-rolled card chassis** with the real `Card` primitive, and land **one orchestrated staggered reveal** on palette load — the methodology's "one page-load > scattered micro-interactions" lever — using glass-ui's already-shipped `useStaggerReveal`. Bind the atmosphere to the live color so the background *is* the subject. Refinement, not redesign: every lever below is a token swap or a composable already in `node_modules/@mkbabb/glass-ui/dist`.

---

## TOP REFINEMENTS (surface → glass-ui lever)

### 1. Make the glass tier ladder carry depth hierarchy — stop flattening 5 rungs to `wash`
**Surface**: all nine panes hard-code `tier="wash"` (`BrowsePane.vue:2`, `PalettesPane.vue:2`, `GeneratePane.vue:32`, `ExtractPane.vue:3`, `MixPane.vue:61`, `AdminPane.vue:2`, `AboutPane.vue:6`, `ConfigSliderPane.vue:77`, `GradientPane.vue:20`). The two-pane grid (`style.css:170–172`) renders the hero **color-picker / generate** pane and the **secondary list** (browse/mix) at the *same* visual elevation — there is no read of "this is the subject, that is the context."
**Lever**: glass-ui `Card` `tier` prop spans the 5-rung ladder (`glass-{wash,quiet,resting,floating,overlay}`, per CLAUDE.md). Lift the **left/primary pane to `tier="floating"`** (the picker, generate, gradient — the active workspace) and keep **right/list panes at `tier="quiet"`** (browse, mix, palettes). Re-enable `:shadow` on the floating tier so the demo's signature `--shadow-cartoon` 8px offset (`style.css:78`) reads only on the subject, not on every surface. One prop per pane; the ladder already exists, it's just unused. Result: depth that says "edit here, reference there" instead of two equal rectangles.

### 2. Replace the hand-rolled `PaletteCard` chassis with the real `Card` primitive
**Surface**: `PaletteCard.vue:5–13` is a raw `<div class="group rounded-card border border-border bg-card overflow-hidden transition-shadow hover:shadow-card-hover cursor-pointer">` — a from-scratch reimplementation of exactly what glass-ui `Card` ships (rounded-card + border + tier surface + shadow). This is the "raw divs reinventing glass-ui compounds" anti-pattern: the card opts OUT of the tier ladder, so a palette card can never sit on a glass rung consistent with its pane.
**Lever**: re-root `PaletteCard` on `<Card tier="resting" :shadow grain>` (the mid-ladder rung — denser than the pane's `quiet` so cards *read as objects ON the surface*, the canonical figure/ground move). The `hover:shadow-card-hover` becomes the Card's native hover contract; the `aside` layout flag (`PaletteCard.vue:9`) maps to flex on the Card. This also makes the J.W3 diff render (the `PaletteDiff.vue` swatch ladder) inherit a real tier instead of a bare div, so the CSS Custom Highlight underlays land on a glass surface, not flat `bg-card`.

### 3. Land ONE orchestrated staggered reveal on palette-grid load (the headline motion)
**Surface**: `PaletteCardGrid.vue:1–19` renders cards into a flat grid with **zero entrance choreography** — cards just appear. Pane entry (`App.vue:256–280`) is a single whole-card slide+rotate; once inside, the list is static. The methodology's highest-impact lever ("one orchestrated staggered page-load") is entirely absent, despite glass-ui shipping the exact composable.
**Lever**: `useStaggerReveal` (confirmed export, `dist/motion-core.js`, reachable via the root barrel the app already imports). Wrap the `v-for` cards in `BrowsePane.vue:52` / `PalettesPane.vue:51` with a staggered reveal keyed on load + filter-change, so palettes cascade in on a √φ-timed delay (matching the golden-ratio spine). Pair with `content-visibility` on the grid (already mandated in `J.md §4 W2` / `PaletteCardGrid.vue:33` already has `contain: content` — extend to `content-visibility: auto`) so the stagger only animates in-viewport rows: the perf lever and the motion lever compose into one gesture.

### 4. Give the palette grid an editorial rhythm instead of a single column
**Surface**: `PaletteCardGrid.vue:4` is `grid grid-cols-1 gap-3` — one column, every card identical width and height, on a surface whose entire subject is *visual variety*. The most color-rich content in the app is laid out as the most monotonous list. No asymmetry, no density, no grid-break — the predictable stack the brief warns against.
**Lever**: at `lg+` (the desktop pane is `max-w-desktop-pane` = 30rem, `style.css:96`, comfortably two-up) move to a **2-col masonry-ish flow** where the **expanded card spans both columns** (`PaletteCard` already has an `expanded` state, `PaletteCard.vue:142–169` — make it `col-span-2` when open). This creates intentional grid-breaking: the focused palette claims the full width while siblings tile around it — controlled density with one deliberate asymmetry, not chaos. The `PaletteColorStrip` (`PaletteColorStrip.vue`) already supports vertical orientation, so an occasional `layout="aside"` card (every Nth, or featured) breaks the horizontal-strip monotony.

### 5. Bind the aurora atmosphere to the live picked color (atmosphere = subject)
**Surface**: `App.vue:212` runs `reactive<AuroraConfig>(structuredClone(DEFAULT_AURORA_CONFIG))` — a *static* backdrop. The app already injects `CSS_COLOR_KEY` / `SAFE_ACCENT_KEY` (`App.vue:54–57`) everywhere, and the comment at `App.vue:210–211` flags the live-tracking aurora as deferred A.W6 work. The atmospheric-depth lever (methodology: "atmospheric backgrounds + depth over flat fills") is wired but inert.
**Lever**: drive the `auroraConfig` nuclei/stop colors from the live `cssColorOpaque` (and the OKLab palette already persisted per `J.W1 §2`) so the WebGL field shifts with the picked color — the background *becomes* a slow ambient read of the current palette. This is the natural value.js-J consumer for the booked **VAL-1 OKLab aurora-LUT** (`J.md §7`): the aurora-LUT's second consumer is *this* binding. Keep it behind the existing `onInitError` guard; the static config stays the reduced-motion / no-WebGL fallback.

---

## FILE WRITTEN

`/Users/mkbabb/Programming/value.js/docs/tranches/J/design/WC-design-layout.md`

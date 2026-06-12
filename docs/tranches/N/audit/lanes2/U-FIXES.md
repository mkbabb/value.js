# Lane U-FIXES — grounding U9 / U11 / U4 / U5 / U18 / U22 / U12-nomenclature

**Fleet:** N second deep-audit fleet (lanes2). **Mode:** tranche-development — implements
NOTHING; this file is the durable artifact. **Live target:** http://localhost:9000 (dev server,
cold cache). **Branch:** `tranche-f-handoff`, HEAD `199fd15` + 0.12.0. **Evidence:** live
chrome-devtools MCP probes (my own page) + read-only source (file:line). Screenshots:
`docs/tranches/N/audit/lanes2/shots/U-FIXES-*.png`. USER FINDINGS OUTRANK PRIOR AUDITS.

---

## §0 — Verdict table (one line each)

| ID | Verdict | Severity |
|---|---|---|
| **U9** (reset current color "does nothing") | **PARTIALLY REPRODUCED — the LEDGER hypothesis is too strong.** The reset chain fires and DOES restore model + URL + atmosphere (proven live). The genuine defects are (a) **resetting while already at the default is a visible no-op** — the default color IS the boot color `lab(92% 88.8 20)`, so a fresh user clicking Reset sees nothing change; (b) a **persisted-store / input-field desync** — the `useStorage("color-picker")` blob is NOT reset (only the debounced `inputColor` is written) so the model and the store diverge. The button is NOT dead. | **P2 (demo; UX-confusing, not a dead handler)** |
| **U11** (desktop missing the right pane) | **CONFIRMED — concurs with lane U-DOCK in full.** Root is the Tailwind `lg:flex`/`lg:block`/`lg:hidden`/`lg:flex-1` display variants never being emitted → both desktop pane wrappers compute `display:none`. NOT the W1D hydration residual; NOT the router. (My live DOM probe independently observed the two `pane-wrapper hidden lg:flex` / `hidden lg:block` wrappers — App.vue:45,58.) | **P0 (every desktop dual-pane load)** |
| **U4** (no spacing between header "definition" and content) | **REPRODUCED + measured.** Live gap header-description-bottom → Definition-box-top = **9px** (one `pb-2`); CardContent `padding-top` measures **0px**. There is NO dedicated section-spacing token between the PaneHeader and the first content block. | **P1 (demo docs styling)** |
| **U5** (inconsistent section padding; want a φ ladder + divider padding) | **REPRODUCED + root-caused — worse than "inconsistent":** the ENTIRE markdown typography block (`Markdown.vue:71-315`, headings `pt-4/pb-1`, paragraphs `mb-4`, hr/list/blockquote spacing) is **`<style scoped>` with NO `:deep()`**, so it does NOT penetrate the dynamically-rendered `<component :is>` markdown content. Live: every markdown heading + `<p>` measures `pt/pb/mt/mb = 0px`. The carefully-authored docs spacing is **DEAD CSS**. The nutrition-label section spacing is separately inconsistent (`mb-2`=8px vs one `space-y-4`=16px heading-gap). | **P0 for the docs body (all heading/paragraph spacing absent); P1 for the φ-ladder design** |
| **U18** (dashed outline → a dashed/GHOST watercolor-dot variant, abstract to glass-ui) | **REPRODUCED + root-caused.** The "add color" slot is a **hand-rolled flat dashed `<button>`** (`border-2 border-dashed`, **`border-radius:0px`** = a hard SQUARE, no wet filter), carrying the **phantom class `watercolor-swatch`** (undefined in demo). It sits beside organic filled WatercolorDots. glass-ui's `WatercolorDot` has **no ghost/dashed/outline variant** — it always paints a solid `backgroundColor`. Needs an upstream `variant`/`ghost` prop. | **P1 (glass-ui primitive ask + demo consume)** |
| **U22** ("not a proper watercolor ghost"; UI refinement) | **REPRODUCED — same root as U18 + the `dashed-well`.** Two unrelated dashed idioms coexist: the `.dashed-well` container (`1.5px dashed`, utils.css:56) and the add-slot (`2px dashed`, square) — neither connected to the watercolor primitive. The "ghost" the user wants is the WatercolorDot ghost variant (organic blob + wet edge, rendered as a dashed/translucent empty slot). | **P1 (glass-ui + demo)** |
| **U12-nomenclature** (standardize the pane/card vocabulary) | **CENSUSED + proposal grounded below** (§6). The structural stack is real but unnamed-as-a-system: `pane-main → pane-container(--dual) → pane-wrapper(--ghost) → PaneSlot → *Pane.vue → Card(tier) → PaneHeader + CardContent`. Eleven `*Pane.vue` shells + ≥3 bespoke card classes (`about-card`, `picker-shell`, `dashed-well`) + the `PaletteCard` family. | **P1 (design-system cohesion doc)** |

---

## §1 — U9: the reset handler — FULL chain grounded + the real defect

### The reset wiring (read-only source — the chain is intact end-to-end)

```
ActionToolbar.vue:12   @action="emit('reset')"          (the RotateCcw "Reset color" button)
   ↓  ActionToolbar emits `reset`
ActionBarLayer.vue:88  @reset="actionBar.reset()"        (dock action-bar consumer)
   ↓  actionBar = ColorPicker's exposed ActionBarContext
ColorPicker.vue:228    reset: () => emit("reset")        (re-emits up to ColorPicker's parent)
   ↓  ColorPicker emits `reset`
usePaneRouter.ts:134   onReset: deps.resetToDefaults     (left-pane prop binding, leftProps())
   ↓
App.vue:184            resetToDefaults  (passed into usePaneRouter deps)
   ↓
useAppColorModel.ts:43-45
   const resetToDefaults = () => { model.value = createDefaultColorModel(); };
   ↓
index.ts:39-48  createDefaultColorModel() → parses DEFAULT_INPUT_COLOR = "lab(92% 88.8 20 / 82.70%)"
```

The chain has **no dead link**. `onReset` IS bound whenever the ColorPicker renders as the left
pane (the only place it renders).

### Live reproduction (my page, deterministic)

- **Boot color = the default.** `DEFAULT_INPUT_COLOR = "lab(92% 88.8 20 / 82.70%)"` (index.ts:36)
  and the fresh page loads at exactly `#/?space=lab&color=lab(92%25+88.80+20+/+82.70%25)`. So a
  user who clicks Reset on a pristine page sees **no change** — there is nothing to reset to. This
  is the most likely literal reading of "reset does not work."
- **From a CHANGED state, reset DOES restore.** I drove a real spectrum `pointerdown/up`
  (`.spectrum-picker`) to `lab(16.02% 3.66 0.74)`, then to vivid `lab(52.06% 77.21 52.71)`, then
  clicked the `aria-label="Reset color"` button. Each time the URL went back to
  `lab(92% 88.80 20 / 82.70%)` and the atmosphere repainted pink (shot
  `U-FIXES-02-reset-from-spectrum.png`). Reset is **functional** for the live model + URL +
  atmosphere.
- **The persisted store is NOT reset (the real bug).** After reset, `localStorage["color-picker"]`
  still held the pre-reset `selectedColorSpace:"oklch"` blob (probe: `storeBeforeReset` ===
  `storeAfterReset`, both stale). Root: `useAppColorModel.ts:62-68` — the only model→store watcher
  is `syncColorToStorage`, a 200ms debounce that writes **only `colorStore.value.inputColor`**,
  never `color`/`selectedColorSpace`. So after reset the model is default but the store is stale →
  the model and its persistence diverge. (On reload the URL wins via `useColorUrl.applyUrlToModel`,
  so the *visible* default survives — but the store is a latent inconsistency.)
- **The input field went empty in one cycle.** A post-reset probe read the contenteditable
  (`[contenteditable]`) as `""`. `ColorInput.vue:248-250` updates `.innerText` from
  `formattedCurrentColor` only `if (!proposeMode && !inputIsFocused)` — a transient focus/propose
  state can leave the field stale/empty after reset.

### Disposition

U9 is **not** a dead button (the LEDGER's "DOES NOT WORK" overstates it). The fixes the wave
should carry:
1. **Make reset meaningful from the default** — e.g. a transient confirmation/pulse, OR seed the
   app from a *random* color so Reset always visibly differs (design call). At minimum, the wave
   must verify the "already-default" no-op is the user's actual complaint (most likely).
2. **Reset the persisted store** — `resetToDefaults` should also write the full default into
   `colorStore` (or the store-sync watcher must persist the whole model, not just `inputColor`).
3. **Repaint the input field on reset** unconditionally.
Owner: **demo** (`useAppColorModel.ts`, `ColorInput.vue`). Folds into the U-FIXES functional wave.

---

## §2 — U11: desktop right pane — concurs with lane U-DOCK

Independently observed on my page: the dual-pane container holds two
`pane-wrapper hidden lg:flex` / `hidden lg:block` wrappers (App.vue:45,58) that both compute
`display:none` at 1440px because the `lg:flex`/`lg:block`/`lg:hidden`/`lg:flex-1` utilities are
absent from the live CSS — a Tailwind v4 utility-generation hole, **not** the router and **not**
the W1D hydration residual. Lane **U-DOCK §2** carries the full stylesheet-scan proof; I ratify it
without divergence. Owner: **demo** (Tailwind config). Wave: **re-open N.W2.B** (PROGRESS.md's
"desktop `@source` live" claim is false on the wire) + N.W6.D layout. This blocks U32 (the
"two cards side-by-side, clamped" desktop mandate) entirely.

---

## §3 — U4: the header → definition gap (measured)

The AboutPane structure (`AboutPane.vue:8-22`):

```
PaneHeader  (px-4 sm:px-6 pt-4 pb-2)        ← "About the color spaces, Lab" + desc
<Separator />                                ← AboutPane.vue:18
CardContent (px-3 sm:px-6)                   ← ColorNutritionLabel → first child is the Definition <Alert>
```

**Live measurement** (about-card forced visible, mobile 430w): header-description-bottom →
Definition-box-top = **9px**; the CardContent's `padding-top` computes **0px** (the demo's
`px-3 sm:px-6` sets only horizontal padding, so the glass-ui `p-(--card-spacing)` vertical padding
is effectively absent here, leaving only the header's `pb-2` = 8px as breathing room).

So the Definition box hugs the header — exactly u04 "No spacing between the definition and the
about-the-color-space content." The fix: a dedicated header→content vertical gap token (the
CardContent must restore a vertical pad, or the AboutPane must add an explicit `pt-*`/section
spacing). Owner: **demo** (`AboutPane.vue` + the docs spacing scale). The `<Separator />` itself
carries `mt/mb:0` so it contributes no spacing.

---

## §4 — U5: the docs spacing is DEAD CSS + the φ-ladder ask

### The load-bearing finding: scoped markdown styles never reach the rendered markdown

`Markdown.vue:71-315` authors the full markdown typography (headings `@apply font-bold pb-1 pt-4`,
`> p { @apply mb-4 }`, `hr { @apply my-4 }`, list/blockquote/table spacing) inside a
**`<style scoped>`** (line 68) with **no `:deep()`**. The markdown is rendered via
`<component :is="markdownContent" />` (line 11) from imported `.md` modules — that content carries
**no scope-id `data-v-*` attribute**, so the scoped selectors `.markdown-wrapper > .markdown-body > h2`
**do not match**.

**Live proof** (about-card forced visible): every markdown heading and `<p>` under
`.markdown-body` measures `paddingTop / paddingBottom / marginTop / marginBottom = 0px`. There is
NO global/unscoped `.markdown-body` sheet anywhere (`grep` of `@/styles/` + `utils.css` = nothing).
So the docs body has **zero authored spacing** — headings run flush into paragraphs ("Attributes"
with no padding, u05). This is the dominant cause of u05's "padding inconsistent (too much or
none)" — it is "none."

### The current docs spacing scale (measured live, the inventory the brief asks for)

| Gap | Measured | Source | φ-ladder note |
|---|---|---|---|
| Header → Definition | **9px** | `pb-2` only (U4) | off-ladder (orphan) |
| Section h2 → body | **8px** (`mb-2`) | ColorNutritionLabel.vue:13,35,62,131 | 8 |
| "Conversion Graph" h2 → body | **16px** (`space-y-4`) | ColorNutritionLabel.vue:83 | **inconsistent (8 vs 16 for the same role)** |
| Nutrition section ↔ section | **16px** (`gap-4`) | ColorNutritionLabel.vue:2 | 16 |
| Separator margin | **0px** | `h-px`, mt/mb 0 | 0 (relies on grid gap) |
| "Detailed Guide" h2 → md | **24px** (`mb-6`) | AboutPane.vue:27 | 24 |
| Markdown h1/h2/h3 → body | **0px** (DEAD) | Markdown.vue:91 (scoped, never applies) | **MISSING** |
| Markdown `<p>` margin | **0px** (DEAD) | Markdown.vue:141 (scoped, never applies) | **MISSING** |

Distinct spacing values in play: **0, 8, 16, 24** px — a 8px-step ladder, not a φ ladder, and with
two orphans (9px, the dead markdown values). A **golden-ratio ladder** (the user's ask) anchored at
a base `s` with φ≈1.618 would read e.g. `s, sφ, sφ², sφ³` → ~`8, 13, 21, 34` (or anchored at 16:
`16, 26, 42, 68`); the wave should mint a `--docs-space-{1..4}` token set on a φ progression and
apply it to BOTH the nutrition sections AND the (un-scoped / `:deep`-fixed) markdown body, plus
explicit padding **around the dividing `<Separator />` lines** (the user explicitly asked for
"padding around dividing lines" — today they carry zero margin).

### Disposition

- **P0 mechanical:** make the markdown typography actually apply — either move the
  `.markdown-body` block to a global/`utils.css` sheet, or wrap every rule in `:deep()`. Without
  this, NO docs spacing exists. Owner: **demo** (`Markdown.vue`).
- **P1 design:** a φ-backed `--docs-space-*` token ladder applied to the nutrition sections +
  markdown body + separator margins. Owner: **demo** (the docs styling work-order). Folds into
  **N.W6** (suffusion).

---

## §5 — U18 / U22: the watercolor ghost (the dashed add-slot)

### What renders the dashed outline today (live + source)

The "add color" slot is a **hand-rolled flat dashed control**, NOT a WatercolorDot:

- `MixSourceSelector.vue:148` — `<button>` with
  `class="… watercolor-swatch border-2 border-dashed border-primary/30 bg-primary/5 …"` + a
  `<Plus>` icon. **Live computed: `border:2px dashed oklab(…)`, `border-radius:0px` (a hard
  SQUARE), `bg:oklab(… / 0.05)`, 44×48px.** The class `watercolor-swatch` is a **phantom in the
  demo** (no demo definition; glass-ui's `.watercolor-swatch` is `<style scoped>` to its own SFC
  and cannot leak here), so the slot gets **no blob border-radius and no wet filter**.
- `CurrentPaletteEditor.vue:83` — the palette-editor twin: `rounded-full border-2 border-dashed
  border-primary/30` + `<Plus>` (a dashed CIRCLE here, vs the square in Mix — inconsistent between
  the two sites).
- Beside them, the real dots are glass-ui `WatercolorDot`s: live `border-radius:43%/42%/41%/46% …`
  (organic blob), `filter:url(#watercolor-filter-v-*)` (wet edge), solid `bg:lab(92 88.8 20)`.

So a geometrically-perfect dashed **square/circle** sits next to organic filled watercolor blobs —
the visual mismatch the user calls "not a proper watercolor ghost" (u13, u18, u19, shot
`U-FIXES-03-mix-dashed-ghost.png`).

### What a dashed/ghost watercolor-dot variant needs UPSTREAM (glass-ui)

`WatercolorDot.vue` (glass-ui, `src/components/custom/watercolor-dot/WatercolorDot.vue`) currently
takes `{ color, animate, tag, cycleDuration, range, seed }` and **always** paints a solid
`backgroundColor: color` (line 75) with the wet SVG filter + soft box-shadows. There is **no
ghost/outline/empty variant.** The U18 ask is an upstream prop, e.g.:

- `variant?: "solid" | "ghost"` (or `ghost?: boolean`), where `ghost`:
  - drops the solid fill → `transparent` / very-faint tint,
  - renders a **dashed stroke that follows the seeded organic `border-radius` morph** (so the
    empty slot has the SAME blob silhouette as the filled dots — not a perfect circle/square),
  - keeps the per-instance wet filter so the dashed edge bleeds like the real dots,
  - optionally renders a centered `+` slot (or accepts the existing `<slot/>` for the `Plus` icon).

That single upstream variant lets BOTH demo sites (Mix add-slot + palette-editor add-slot) replace
their bespoke dashed `<button>`s with `<WatercolorDot ghost tag="button">`, killing the phantom
`watercolor-swatch` class and the square/circle inconsistency. The `.dashed-well` container
(utils.css:56) can stay as the recessed tray, but its `1.5px dashed` framing should harmonize with
the dot ghost's dashed stroke (one dashed grammar, not two).

Owner: **glass-ui** (the `WatercolorDot` ghost variant — author into tranche BA's watercolor work)
+ **demo** (consume at MixSourceSelector.vue:148 + CurrentPaletteEditor.vue:83; remove the phantom
`watercolor-swatch`). Folds into **N.W5 successor / N.W6** + a glass-ui tranche-BA ask.

---

## §6 — U12-nomenclature: the pane/card vocabulary census + proposal

### What exists today (census from the tree)

**Structural layout stack (App.vue + style.css):**

```
<main class="pane-main">                         App.vue:25  / style.css:181
  <div class="pane-container [pane-container--dual]">   App.vue:29 / style.css:189,206
    ├─ <PaneSlot> (mobile single slot)            App.vue:35
    ├─ <div class="pane-wrapper hidden lg:flex …"> App.vue:45  / style.css:315  (desktop LEFT)
    │    └─ <PaneSlot>
    └─ <div class="pane-wrapper [pane-wrapper--ghost] hidden lg:block …">  App.vue:58 / style.css:323 (desktop RIGHT)
         └─ <PaneSlot>
```

**`PaneSlot.vue`** (panes/PaneSlot.vue) = the shared shell: `<Transition><KeepAlive><component :is>`
— takes a free-form `transitionName` string.

**The 11 `*Pane.vue` shells** (panes/): `AboutPane, AdminPane, AuroraPane, BlobPane, BrowsePane,
ConfigSliderPane, ExtractPane, GeneratePane, GradientPane, MixPane, PalettesPane`. Plus the
non-`*Pane`-suffixed left content `ColorPicker.vue` (which IS a pane by role, breaking the suffix
convention). Helpers: `PaneHeader.vue`, `PaneSegmentedControl.vue`, `keys.ts`.

**Card vocabulary** — three layers, no shared name:
1. The glass-ui `Card` primitive (`Card/CardHeader/CardContent/CardFooter`, `tier="wash"`,
   `--card-spacing`).
2. Bespoke per-pane card classes: `about-card` (AboutPane.vue:6), `picker-shell`
   (usePaneRouter.ts:130), `dashed-well` (utils.css:56), `pane-shell` (App.vue / structural).
3. The `PaletteCard` family: `PaletteCard, PaletteCardGrid, PaletteCardMenu, PaletteCardSkeleton,
   PaletteColorStrip, PaletteCardSwatches` — the one place "Card" is a first-class component family.

### The naming inconsistencies (the "mess" U12 flags)

- **shell vs wrapper vs container** are used interchangeably for nesting levels: `pane-main` >
  `pane-container` > `pane-wrapper` > `pane-shell` (App.vue uses `pane-shell` on the mobile slot,
  `pane-wrapper` on desktop slots — two names for sibling roles).
- **`-card` vs `-shell`**: `about-card` (a Card) vs `picker-shell` (also a Card, different suffix)
  vs `pane-shell` (a layout div). Three suffixes, overlapping meaning.
- **`*Pane.vue` suffix is not universal**: `ColorPicker.vue` is a left-pane content but is not
  `ColorPickerPane.vue`.
- The transition vocabulary is unbounded (`PaneSlot.transitionName` is a free string;
  see lane U-DOCK §3 — 14 bespoke `*-enter-active` families).

### Proposed vocabulary (derived ONLY from names already in the code — no inventions)

Promote the existing terms to a fixed 4-level ladder, each with ONE canonical name:

| Layer | Canonical name (already in tree) | Role | Retire / rename |
|---|---|---|---|
| 1. Region | **`pane-main`** | the `<main>` flex region | keep |
| 2. Track | **`pane-container`** (+`--dual`) | the 1- or 2-up grid track | keep |
| 3. Slot | **`pane-slot`** (the `PaneSlot.vue` shell) | one routed slot (mobile/desktop-L/desktop-R) | rename `pane-shell` + `pane-wrapper` → `pane-slot` (one name for the sibling roles); keep `--ghost` modifier |
| 4. Card | **`pane-card`** | the glass `Card` surface inside a slot | rename `about-card`/`picker-shell` → `pane-card` (+ a `--{view}` modifier if a per-view hook is needed) |

Content inside a card stays the glass-ui grammar: **`PaneHeader` + `CardContent` + `Separator`**.
The pane shells keep the **`*Pane.vue`** suffix — and `ColorPicker.vue` is the one rename to honor
it (or it is documented as the deliberate exception). The `PaletteCard*` family is the model for
"a card is a first-class component" — the standing doc should note cards are components, panes are
routed shells.

Owner: **demo** (a standing `docs/…/nomenclature.md` table + the rename pass). Folds into
**N.W6** alongside lane U-DOCK §3's transition-substrate unification (the two are the same
"name the design system" work: U-DOCK names the *motion*, this names the *structure*).

---

## §7 — Disposition (waves + owners)

| ID | Root cause | Owner | Wave |
|---|---|---|---|
| **U9** | reset fires + restores model/URL/atmosphere; real defects = (a) already-default no-op, (b) persisted-store not reset (`useAppColorModel.ts:43,62-68` writes only `inputColor`), (c) input field can stay empty post-reset | **demo** | N.W6 / U-FIXES functional wave |
| **U11** | `lg:*` display utilities never emitted → desktop panes `display:none` (ratifies lane U-DOCK §2) | **demo** (Tailwind v4 config) | **re-open N.W2.B** + N.W6.D |
| **U4** | header→Definition gap = 9px, CardContent `pt:0`; no dedicated section-spacing | **demo** (`AboutPane.vue` + docs scale) | N.W6 |
| **U5** | markdown typography is `<style scoped>` w/o `:deep()` → ALL heading/paragraph spacing DEAD (live 0px); nutrition spacing 8-vs-16 inconsistent; want a φ ladder + divider padding | **demo** (`Markdown.vue` global/`:deep` + `--docs-space-*` φ tokens) | N.W6 (P0 mechanical + P1 design) |
| **U18** | add-slot is a flat dashed square/circle (`border-radius:0`, phantom `watercolor-swatch`), not a WatercolorDot; glass-ui dot has no ghost variant | **glass-ui** (WatercolorDot `variant:"ghost"`) + **demo** (consume) | glass-ui tranche-BA ask + N.W5-succ/N.W6 |
| **U22** | two unrelated dashed idioms (`dashed-well` + add-slot); "ghost" should be the dot ghost variant | **glass-ui** + **demo** | same as U18 |
| **U12** | 4-level pane stack with overlapping names (shell/wrapper/container/card); `*Pane` suffix non-universal; cards bespoke vs the `PaletteCard` family | **demo** (nomenclature doc + rename) | N.W6 (with U-DOCK §3) |

**Standing directives honored:** every finding grounded file:line + live-probe on my own page;
the LEDGER's U9 "DOES NOT WORK" is corrected (partial, not dead) with the true root causes; nothing
dropped; the glass-ui ask (U18 WatercolorDot ghost variant) authored for the constellation.
Screenshots: `shots/U-FIXES-01-after-reset.png`, `U-FIXES-02-reset-from-spectrum.png`,
`U-FIXES-03-mix-dashed-ghost.png`.

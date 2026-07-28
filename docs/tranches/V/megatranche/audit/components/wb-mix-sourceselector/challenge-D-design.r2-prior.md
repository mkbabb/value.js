# CHALLENGE-D — `demo/workbenches/mix/MixSourceSelector.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, model id `claude-opus-5[1m]`, spawned with an explicit
Opus 5 declaration. Seat declared, not inherited.

- **Axis:** design (visual truth · state coverage · motion · design-system boundary · proportion/seat law)
- **Subject:** `demo/workbenches/mix/MixSourceSelector.vue` (283 L), mounted once, by
  `demo/workbenches/mix/MixPane.vue:80`, on route `/#/mix`
- **Base:** branch `tranche-u`, HEAD `c654824e`; glass-ui `7.0.0` (`node_modules/@mkbabb/glass-ui/package.json`)
- **Verdict:** **DEFECTIVE** — one BLOCKER that makes the component's primary mode non-functional,
  plus **eleven MAJOR**, six MINOR, one INFO.

**Provenance of this document.** This is a **consolidated two-pass report**. Pass 1 (2026-07-27)
established D-1 and the proportion/type/boundary body from isolated WebKit probes with a **2-palette**
seeded library. Pass 2 (2026-07-28) re-ran the axis against the **live 5-palette** store and the
shared dev server, confirmed D-1 by three independent methods, and added **D-17 … D-22** — five of
which pass 1 could not have seen (its 2-palette fixture never overflowed the disclosure) and one of
which **overturns a pass-1 negative-proof claim**. Measurements are attributed per finding. Nothing
from pass 1 is discarded except where pass 2 supersedes it, and that is stated.

---

## 0. The one-line finding

**In colors mode — the default mode — this component cannot accept a single color.** Every
interactive affordance it draws is an `aria-hidden`, `pointer-events: none` `<span>`. There is no
click path, no keyboard path, and no `Plus` glyph. The Mix workbench's headline interaction is
undelivered in the shipped build, and the visual-audit matrix captured it without noticing, because
an empty dashed well *looks* like a legitimate empty state.

The tranche canon predicted this and named this exact site. `VISUAL-CONSTITUTION.md:91`:

> *"V **abrogates a selection outline and interactive host on `WatercolorDot`**. P051 removes the
> public `tag="button"`/interactive-host branch in the clean major … W17 owns the live exhaustive
> manifest — currently 25 explicit `tag="div|button"` calls — and W19–W22/W25–W27 execute Dock
> seal/edit, ColorSpaceSelector, eyedropper, Spectrum, channel, palette, Generate, **Mix** and
> Gradient sites."*

The producer shipped the abrogation in 7.0.0. This consumer was never migrated. The design is a
drawing of an interface.

---

## 1. Visual truth

Screenshots read (audit matrix): `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/mix.png`,
`…/safari-desktop-dark/mix.png`, `…/safari-mobile-light/mix.png`, `…/safari-mobile-dark/mix.png`.
Pass-1 captures (isolated WebKit, DPR 2, 2-palette library): colors/palettes × light/dark ×
1440/390/720/320. Pass-2 capture (shared dev server, live 5-palette store, disclosure open):
`.playwright-mcp/mix-expanded.png`.

### 1.1 The "Selected" well is a 462 × 108 px void

| arm | well (CSS px) | sole content | ink share |
|---|---|---|---|
| 1440 desktop (pass 1) | 462 × 107.9 | one 48 px ghost dot | **4.36 %** |
| 1440 desktop (pass 2, live) | 462 × 106.5 = 49 203 px² | one 48 px dot = 2 304 px² | **4.68 %** |
| 720 (≈200 % zoom) | 462 × 105.4 | one 48 px ghost dot | 4.73 % |
| 390 mobile | 324 × 100.6 | one 44 px ghost dot | 5.94 % |
| 320 narrow | 254 × 100.6 | one 44 px ghost dot | 7.58 % |

Two independent passes, two browsers, same answer: ~95 % of the largest single fixture in the pane
is empty, at every arm, in the state the app boots into.

And the fixture is not neutral. `demo/styles/utils.css:90–107` gives `.dashed-well` a dashed border,
a `--well-bg` tone step off the host plate, and `box-shadow: var(--shadow-cartoon-sm)` — measured
live:

```
wellEdge: { "border": "1.5px dashed oklab(0.216128 0.00350075 0.00518669 / 0.12)",
            "background": "oklab(0.913295 0.00550478 0.0130424)", "radius": "16px" }
```

A fully-dressed container announcing a set that does not exist.

Canon violated, verbatim:

- `VISUAL-CONSTITUTION.md:202` (§7 Mix) — *"**No shadow palette filler appears when an operand is
  absent.**"*
- `VISUAL-CONSTITUTION.md:48` (§3.1, Mix row) — *"absent operands occupy no filler"*.
- `VISUAL-CONSTITUTION.md:28` (§3.2) — *"Empty secondary content occupies at most a narrow
  invitation tray (≤15 % of the stage) or disappears."*
- `PROPORTION-AUDIT.md:5` (§1) — *"Every element earns its scale, interval, boundary and material
  from its job relative to the local protagonist"*; §5.3 — reservation only *"on the axis where
  collision exists"*.

**Compounding:** at zero operands the well's neutral 12 %-alpha dashed edge sits 40 px from the
ghost's full-chroma dashed edge (measured `ghostStroke.borderColor: "oklch(0.7 0.15 30)"`). Two
dashed strokes, two different inks, two nested "this is empty" signals, one inside the other —
plainly visible in `safari-mobile-light/mix.png` and `mix-expanded.png`.

### 1.2 Dark mode is a hole, not a well

Light: well `oklab(0.9133 …)` vs plate `oklab(0.9283 … / 0.664)` — a **1.12 : 1** luminance ratio.
The recess is carried entirely by the 12 %-alpha dashed hairline. In `safari-desktop-dark/mix.png`
the dashed edge all but vanishes and the well reads as a flat brown slab with a single pink dashed
blob floating at its left edge — the exact "featureless slab" failure mode `utils.css:44–56` (E1-R2)
documents and cures *for skeletons* but not here.

### 1.3 Two palette grammars, 40 px apart

Colors mode draws each saved palette as a hand-rolled mini-card (full-bleed `PaletteColorStrip`,
name, count, then a **second** row of dots repeating the same colors). Palettes mode draws the same
entity as `PaletteCard`. Same data, same pane, same component, two visual languages, two truncation
policies (`truncate` at `:205` vs PaletteCard's `line-clamp-2 sm:line-clamp-1`).

### 1.4 The selection ring fights the material it wraps

Palettes mode selection = `ring-2 ring-primary ring-offset-2 ring-offset-background` on an **outer**
wrapper. Measured on the selected seat (pass 1):

```
box-shadow: … rgb(251,250,248) 0 0 0 2px,  oklch(0.470927 0.093396 169.83403) 0 0 0 4px   (light)
--tw-ring-offset-color: hsl(24 9% 4%)                                                     (dark)
```

The 2 px offset gap paints `--background` — the page background — not the plate the card actually
sits on, so a hard cream (light) / near-black (dark) hairline is stamped between the card and its
ring. In the light capture the selected card's `cartoon-surface` cast shadow is occluded by the ring
while its unselected sibling keeps it: selection **removes** the card's material register.

### 1.5 (pass 2) The disclosure evicts the commit action, and the scroll mask eats the mode control

`.playwright-mcp/mix-expanded.png` — live, 1440 × 900, five saved palettes, "From palettes" open.
`COLOR SPACE`, `HUE METHOD` and the `Mix` button — the instrument's **primary commit action** — are
pushed entirely below the fold by the disclosure. Pass 1's 2-palette fixture could not reach this
state. See **D-17**.

In the same frame, `pane-scroll-fade` (applied by `MixPane.vue:61`) washes the `Colors / Palettes`
mode control to near-illegibility at the top of the scroll box once the pane scrolls. The
component's highest-level control is dissolved by a decorative mask.
*Hypothesis — reproduction: the frame; not separately measured as a contrast number.*

---

## 2. State coverage

| state | designed | reachable in build | note |
|---|---|---|---|
| empty · colors | ✗ (bare well, no copy) | ✓ | **D-3** |
| empty · palettes | ✓ (`EmptyState` eyebrow/message/hint) | ✓ | sound |
| loading | n/a — store is synchronous | — | honestly declared at `:236–238` |
| populated · colors | ✓ | **✗** | **D-1** |
| **populated · 1 operand** | ✗ — **terminal dead end** | ✓ | **D-18** |
| hovered / focused / pressed chip | ✓ | **✗** | D-1 + D-15 |
| disabled add (`MAX_COLORS`) | ✓ | **✗** | attr dropped anyway (D-1) |
| disabled remove (`MIN_COLORS`) | ✓ | **✗** | D-1 |
| selected · palettes | ✓ | ✓ | D-5, D-6 |
| **overflowing · disclosure** | ✗ — **unbounded, evicts the CTA** | ✓ | **D-17** |
| overflowing / wrapping · chips | `flex-wrap` | **✗** | unverifiable |
| truncated | ✓ ×2 policies, no `title` on the mix copy | ✓ | D-4 |
| error | ✗ | — | no error source exists; acceptable |
| **dragging / reorder** | ✗ — **canon requires it** | — | **D-19** (supersedes pass 1's "n/a") |
| RTL | container ✓ / badge ✗ | partial | D-14 |
| reduced-motion | ✓ global guard | ✓ | measured `animation-duration: 0.00001s` |
| forced-colors | **unproven** | — | see §6 gap |
| zoom 200 % | ✓ (720 arm: `overflowX 0`) | ✓ | approximated arm |

**Eight of eighteen states cannot be entered; three more were never designed.** A component whose
majority surface is unreachable has not been designed and verified; it has been drafted.

---

## 3. Findings

### D-1 · BLOCKER — every interactive `WatercolorDot` is inert; colors mode cannot accept a color

**Producer contract.** `node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts`
— props are exactly `{ color, variant, animate, cycleDuration, range, seed }`. **No `tag`. No slot.**
`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` — `inheritAttrs: !1`, and only `class` and
`style` are read out of `useAttrs()`:

```js
let n = h(), c = i(() => n.class), f = i(() => n.style);   // ← class + style ONLY
…
return (d(), o("span", { "aria-hidden": "true",            // ← always a <span>, always aria-hidden
    class: l([c.value, "watercolor-swatch", …]),
    style: u([f.value, { …, pointerEvents: "none", … }])   // ← hardcoded
}, [ …svg filter…, variant==='ghost' ? span.watercolor-ghost-stroke : comment ]))
```

`MixSourceSelector.vue` passes a glass-ui **6.x** API at four call sites — `tag="div"` (`:148`),
`tag="button"` + `aria-label` + `@click` + `:disabled` + a `<Plus>` slot child (`:164–176`),
`tag="button"` + `:title` + `:aria-label` + `@click` (`:211–221`), plus `:title` on the chip
(`:150`). All silently discarded.

**Pass-1 measurement** (isolated WebKit, seeded 2-palette library):

```json
"ghostTag": "SPAN", "ghostAriaHidden": "true", "ghostAriaLabel": null, "ghostDisabled": false,
"ghostPointerEvents": "none", "ghostCursor": "pointer", "plusPresent": false,
"hitTest": "DIV.swatch-row flex items-center gap-2.5 fle", "focusablesInWell": 0,
"clickAdd": { "before": 0, "after": 0 },
"fromPalettes": { "firstSwatch": { "tag":"SPAN","ariaHidden":"true","ariaLabel":null,"title":null,"pe":"none" },
                  "chipsAfterClick": 0 }
```

**Pass-2 confirmation** (shared dev server, live store, three independent methods):

```json
{ "tagName": "SPAN",
  "attrs": [ "data-v-292b9032=", "data-v-a3e86846=", "aria-hidden=true", "class=add-slot-ghost …",
             "data-testid=watercolor-swatch", "data-variant=ghost",
             "style=border-radius: …; pointer-events: none; --watercolor-color: …" ],
  "pointerEvents": "none", "ariaHidden": "true", "tabIndex": -1,
  "hasSvgPlus": false, "childCount": 2, "rect": { "width": 48, "height": 48 } }

{ "elementFromPointAtGhostCenter": "DIV.swatch-row flex items-center gap-2.5 flex-wrap",
  "beforeSources": 0, "afterSources": 0,   // after ghost.dispatchEvent(new MouseEvent('click',{bubbles:true}))
  "focusablesInWell": [] }
```

`attrs` is the **complete** attribute list: no `aria-label`, no `disabled`, no `title`, no `tag`, no
`onclick`. `childCount: 2` is the producer's own `<svg>` filter host plus `.watercolor-ghost-stroke`
— the `<Plus>` was discarded. A synthetic bubbling click dispatched **directly on the element**,
which bypasses `pointer-events` entirely, changes nothing: **no listener is bound**. The well
contains **zero focusable elements**.

`MixPane.vue` binds `@add-color` only from this component (`grep -rn addColor demo` — no other
producer reaches `useMixingState.addColor`), so **no add path exists**. The dot even advertises
`cursor: pointer` on a `pointer-events: none` element: an affordance that lies.

**Blast radius (pass 2).** `mix-expanded.png` shows the live disclosure rendering **35 swatches
across 5 palettes**. Not one is clickable or focusable. The whole "From palettes" feature — header,
count, chevron, animated disclosure, five hand-built rows, 35 dots — renders a capability that does
not exist.

**Why the audit matrix missed it.** `REPORT.md:99` counts `namelessButtons … /#/mix: 1`. These are
not buttons, so the nameless-button sweep cannot see them.

**Mechanism.** A producer major-version adoption (glass 7.0.0, W44) migrated the package but not the
call sites; the dropped props fail silently because `inheritAttrs:false` swallows them and Vue does
not warn on unknown attrs. This is a **family**, not a one-off — `grep -rn 'tag="button"' demo`
returns 4 live sites (this file ×2, `GenerateControls.vue`, `CurrentPaletteEditor.vue`,
`SwatchHoverMenu.vue`), and `tag="div"` returns 14 more.

**Cure (gestalt, not patch).** The dot is a *face*, never a *seat* — that is exactly what glass-ui 7
encodes by making it an `aria-hidden` span, and exactly what `VISUAL-CONSTITUTION.md:91` specifies:
*"Selection, activation, drag and keyboard focus belong to a named enclosing geometric button/seat."*
Every operable dot becomes a real `<button>` seat that **contains** a `<WatercolorDot>` face, with
the name, disabled state, handler and focus ring on the seat, and the `Plus` glyph as a sibling of
the face. One shared seat idiom for the whole family — a `WatercolorSwatchButton` **in glass-ui**
(owner edict 4), not a demo wrapper. Gradient stops (`VISUAL-CONSTITUTION.md:206`) and Generate
specimens are specified to use the same seat.

---

### D-2 · MAJOR — the component's own register law is applied to the chips and violated by the cards

Lines 134–145 excise `ring-2 ring-primary/50` from the chip dots and declare the law: *"rings on
WatercolorDots ride the dot's own silhouette … or do not exist — the dead utility is excised, never
re-minted geometric."* Sixty lines later (`:256–261`) the palettes-mode seat mints exactly that:
`ring-2 ring-primary ring-offset-2 ring-offset-background`. Lines 186–189 kill a `/50` post-hoc
alpha on the chevron because *"the token IS the de-emphasis rung"*; line 260 de-emphasises unselected
cards with `opacity-75` — measured `opacity: 0.75`. The file argues against itself twice, in writing.

`PROPORTION-AUDIT.md:50` (PR-06) names this family **and this route**: *"Three adjacent action
species or duplicated selected fills → **REMOVE** … One action/selection owner across Generate and
owner/Admin/**Mix tabs**."*

**Cure.** One selection register for the whole component, expressed on the entity the producer owns
(`PaletteCard`'s pressed seat, per §5.12), not an outer ring; de-emphasis by rung, not alpha.

---

### D-3 · MAJOR — the colors-mode empty state was never designed

Palettes mode ships a full `EmptyState` (eyebrow `· nothing to mix ·`, message, hint — rendered and
verified). Colors mode, the *default* mode, ships a 462 × 108 well containing one inert dot, no
eyebrow, no message, no hint, and (per D-1) nothing to press.

The asymmetry is the tell: the same author wrote a 22-line comment at `:231–238` defending the
refusal of ghost cards before the caption in the palettes branch — *"TRUE EMPTY speaks the
EmptyState invitation ALONE … never ghost cards before the caption"* — and forty lines earlier
shipped a 95 %-void ghost well. Two empty grammars in one component; the one the user meets first is
the undesigned one. `PROPORTION-AUDIT.md:71` (§5.6): *"Add affordance when the surviving action/state
is otherwise undiscoverable. Subtraction precedes explanation."*

**Cure.** At zero operands the rack collapses to the invitation itself: the named add seat (D-1) plus
one line of copy, content-hugging, no border, no tone step, no shadow. The well earns its boundary
at ≥ 1 operand, when there is a set to bound.

---

### D-4 · MAJOR — one entity, two presentations, and the same colors encoded twice

Colors mode `:197–223` hand-rolls a palette card: `rounded-card border border-border/30
overflow-hidden` + `PaletteColorStrip` + name + count + a dot row. Measured 462 × 124.9 (desktop) /
324 × 121.6 (mobile); border resolves to `oklab(… / 0.3)` and is invisible in dark. Palettes mode
`:264–267` renders `PaletteCard` for the same object.

Inside the hand-rolled card the **full-bleed strip and the dot row below it are the same colors,
twice, 60 px apart**. `PROPORTION-AUDIT.md:70` (§5.5) — a mark is data, status, labeled action, drag
affordance, focus register, or removed. A second encoding of the row above it is none of those.

Nothing about the hand-rolled dialect is derivable from the tuple the canon freezes
(`VISUAL-CONSTITUTION.md:54`: *"exactly: `size="sm"`, `material="content"`, `tier="quiet"`,
`surface="opaque"`, `shadow=false`, `grain=false`, `specular="off"`"*). Owner edicts 3 and 4 both
land here; `PaletteCard` already carries a `layout` prop (`PaletteCard.vue:22`), so a `compact`
register belongs beside it, in the card.

---

### D-5 · MAJOR — `<button>` wrapping `PaletteCard` violates the content model and §5.12 verbatim

`:246–268` wraps `PaletteCard` in a native `<button type="button" aria-pressed>`. Measured nesting:

```json
"wrappers": [ { "aria": "Select palette Sunset Drift", "pressed": "false",
                "nestedInteractive": ["BUTTON:Palette menu"] }, … ]
```

`PaletteCard.vue:5–26` renders `<div role="article" … cursor-pointer @click="$emit('click')">` and
`PaletteCard.vue:80–106` unconditionally contains `<Button … aria-label="Palette menu">`. So the DOM
ships **a button inside a button**, an `article` role inside a button, and a second click owner
inside the first. `PaletteRenameInput` (`:113`, an `<input>`) enters the same wrapper the moment
renaming opens. HTML's content model for `button` forbids interactive descendants, and unlike `<p>`
the parser does not repair it.

`PROPORTION-AUDIT.md:77` (§5.12) is explicit and is **inverted** here: *"The Card/article root is a
noninteractive container: it owns no activation, focus or selection state … Its one native named
`<button type="button" aria-pressed="false|true">` **child** spans specimen/identity and alone owns
activation, visible selection and focus."* The seat must be **inside** the card, spanning
specimen/identity — deliberately *excluding* the menu. This component put it outside, spanning
everything.

Second order: `PaletteCard`'s root carries `cartoon-surface` + `v-bind="press.handlers"` +
`cursor-pointer` — the producer translate/scale/shadow press choreography — while the mix wrapper
simultaneously runs `opacity-75 hover:opacity-100 transition-all`. Two hover registers, two press
registers, one object.

Third: the tile imports the entire seven-mode omnibus — menu, rename, vote, expand, swatch-hover
popovers — to serve as a two-state toggle. `VISUAL-CONSTITUTION.md:102` uses the phrase *"seven-mode
omnibus"* pejoratively, in the sentence that forbids it.

---

### D-6 · MAJOR — selection and focus share one cascade channel; the ring offset paints the wrong ground

1. **Offset ground.** `ring-offset-background` resolves to `--background`
   (measured `--tw-ring-offset-color: hsl(24 9% 4%)` dark, `rgb(251,250,248)` light) — never the
   `tier="resting"` plate the card sits on. `VISUAL-CONSTITUTION.md:82` (§4.1): *"Text, focus,
   boundaries and state meet their rendered contrast **on the actual material tier**; a token name
   is not evidence."*
2. **Focus vs selection collide.** Selection is `ring-2 ring-primary ring-offset-2`; focus is
   `focus-visible:ring-2 focus-visible:ring-ring/40`. In Tailwind v4 both write the same
   `--tw-ring-width` / `--tw-ring-color` / `--tw-ring-shadow` channel, and
   `.focus-visible\:ring-2:focus-visible` (specificity 0,2,0) outranks `.ring-2` (0,1,0) — so a
   *selected* card that receives keyboard focus renders one ring in the 40 %-alpha focus colour and
   loses its selection colour. §4.1: *"Focus remains visibly distinct from selection in both schemes,
   forced colors and reduced transparency."* **HYPOTHESIS** — keyboard focus could not be landed on
   the seat to photograph it (WebKit/macOS omits buttons from Tab order by default; the Chromium arm
   did not receive the seeded library). Mechanism is deterministic CSS; the render is unphotographed.

---

### D-7 · MAJOR — the disclosure overrides its producer recipe with a fourth animation family

glass-ui already owns the whole disclosure register
(`node_modules/@mkbabb/glass-ui/dist/components/_shared/disclosure.css`):

```css
.disclosure-content { overflow: hidden; animation-duration: var(--spring-smooth-duration);
                      animation-timing-function: var(--spring-smooth); }
.disclosure-content[data-state="open"]   { animation-name: disclosure-open; }
.disclosure-content[data-state="closed"] { animation-name: disclosure-close; }
.disclosure-group-trigger { min-block-size: 2.75rem; }
.disclosure-group-trigger[data-state="open"] > .disclosure-icon { rotate: 180deg; }
@media (prefers-reduced-motion: reduce) { .disclosure-content { animation-duration: 0.01ms; } }
@media (forced-colors: active) { .disclosure-trigger:focus-visible { outline: 2px solid Highlight; } }
```

`MixSourceSelector.vue:195` overrides it per instance with
`overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up`.
Measured on the open content element:

```json
"cls": "disclosure-content overflow-hidden data-[state=open]:animate-collapsible-down …",
"animationName": "collapsible-down", "animationDuration": "0.2s", "animationTiming": "ease-out",
"--disclosure-content-size": "265.875px"
```

Four defects in one line:

(a) the house spring (`--spring-smooth`) is replaced by a generic `0.2s ease-out`;
(b) `overflow: hidden` is re-declared on a recipe that already sets it — a per-instance override of a
root, against owner edict 5;
(c) `collapsible-down/up` is a **fourth animation family name**, and `demo/styles/animations.css:60`
states the law: *"three named families; **a fourth name is a defect** (gate (a), R.W4 §Hard gate)"* —
the sanctioned families being `vj-enter` / `vj-morph` / `vj-celebrate`, one of which this same
component uses at `:121`, and `vj-morph` being documented in that very block as the family owning
*"optional height morph via `--vj-morph-collapse`/`-expanded`"*;
(d) **it animates `height`.** From `node_modules/tw-animate-css/dist/tw-animate.css`:

```css
@keyframes collapsible-down { from { height: 0; }
  to { height: var(--radix-collapsible-content-height, var(--bits-…, var(--reka-collapsible-content-height, auto))); }}
```

Every frame forces layout and re-lays-out the entire pane below it — and per **D-17** that subtree is
unbounded. `grep -rn "collapsible-down" demo/ src/` returns exactly one hit: this line.

The chevron repeats the pattern: `:190–193` hand-rolls `ChevronDown` + `transition-transform` +
`:class="paletteDropdownOpen && 'rotate-180'"`, duplicating `.disclosure-icon` **and** the producer's
`[data-state=open] > .disclosure-icon { rotate: 180deg }`, driven off a **local `ref`** instead of
the producer's `data-state` — two sources of truth for "open" on one disclosure.

---

### D-8 · MAJOR — two type registers for one job; one of them is out of jurisdiction

Measured, same component, 120 px apart:

| label | family | size | weight | case | tracking | mechanism |
|---|---|---|---|---|---|---|
| `Selected` (`:119`) | **Fraunces** | 16.4 px | **600** | sentence | normal | hand-rolled `text-small font-display font-semibold` |
| `From palettes` (`:183`) | Fira Code | 14.38 px | 400 | UPPERCASE | 1.44 px | glass-ui `.section-label` |

Confirmed live: `"sectionLabels": [ "From palettes", "Color space", "Hue method" ]` — `Selected` is
absent from that list; it is the one peer heading that is not a `.section-label`.

`VISUAL-CONSTITUTION.md:66–78` (§4) declares the role matrix **closed across all eighteen
compositions**. `Selected` is a display family at semibold for a control label — wrong family, wrong
weight, and it bypasses the `.section-label` primitive its own sibling consumes. The palette name at
`:205` repeats the error: `text-small font-display font-semibold` where the matrix assigns palette
identity `--type-subheading`.

---

### D-9 · MINOR — the disclosure trigger is a 29.6 px tap target

Measured: `462 × 29.6` desktop, `324 × 26.3` mobile; `min-block-size: 0px`; `padding: 4px 0px`.
The consumer's `py-1` (`:182`) is the whole vertical measure. glass-ui's own trigger recipe carries
`min-block-size: 2.75rem` (44 px) on `.disclosure-group-trigger`, unused here.
`PROPORTION-AUDIT.md:56` (PR-12): *"Invisible/seat geometry preserves target floor while optics
follow rung."* The audit's `smallTapTargets` sweep did not flag it (its threshold clears 24 px), so
this is a defect the existing matrix misses.

---

### D-10 · MINOR — the trigger announces "From palettes2"

Measured accessible name: `"From palettes2"` — `:183` label and `:184` count are adjacent text nodes
with no separator or `aria-label`. **(pass 2)** The two counts in this component are also rendered in
two different families for one semantic role: `:184` is sans `text-micro`, `:206` is
`fira-code text-micro`; §4 assigns value/provenance to Fira Code, and `text-micro` is not a matrix
rung in either family. Both are bare numbers with no unit or label
(`PROPORTION-AUDIT.md:70`, §5.5).

---

### D-11 · MAJOR — the one motion the component designs is architecturally prevented

`:79–89` mints `TransitionGroup` keys from `` `${sc.css}::${i}` `` — the **index is inside the
identity**. Replaying the exact algorithm:

```
initial   : [0,1,2]
after rm0 : [3,4]     <- every surviving chip got a NEW key
re-add    : [0,1,2]
duplicates: [0,5]
```

Removing one chip from three plays **three leave transitions and two enter transitions** instead of
one leave plus a move. `.vj-enter-move` (`animations.css:99`) can never fire, because no element
survives with its key; the `watch` at `:90–98` then prunes the map, guaranteeing keys are never
reused. Twenty lines of Map + counter + watcher deliver precisely the behaviour of `:key="i"` while
*appearing* to deliver stability — which is worse than not trying (owner edict 3).

The apparatus is load-bearing for more than the list: `:125–126` documents that `data-mix-source` /
`data-mix-color` let *"the convergence animation lift a pigment drop from each chip's real position
(W3-6)"*. Chips that remount mid-flight have no real position to lift from.

`SelectedColor` has `{css, source}` and no identity; the honest cure is an identity at the source —
`useMixingState.addColor` mints a stable `id` per selection — after which the key is `sc.id` and the
map, the counter and the watcher all disappear (≈ 20 lines deleted). It is also the key **D-19**'s
reorder needs. **Reproduction blocked by D-1**; the algorithm replay above is exact
(`swatch-key-churn.repro.mjs`, this directory).

---

### D-12 · MINOR — one interval is nudged out of the tokenised rhythm

Root is `gap-3`; measured `gap: 12px` with children at
`tabs [245.2 → 288.2] · well [300.2 → 408.1] · disclosure [420.1 → 449.7]`. The tabs wrapper adds
`pb-1` (`:104`), so that single interval is 12 px of gap plus 4 px of padding while every other is
12 px. Two spacing mechanisms stacked for one seam; §5.3's "header→headline uses title gap;
headline→next semantic section uses section gap" wants one owner per interval.

---

### D-13 · MINOR — `:css-color="''"` is a placeholder value that defeats a designed fallback

`:266` passes an empty string to an **optional** prop
(`PaletteCard.vue:186 cssColor?: string | undefined`) consumed as
`palette.colors[0]?.css ?? props.cssColor ?? EMPTY_PALETTE_SWATCH` (`:226`). `''` is not nullish, so
for a zero-colour palette the seat renders an empty CSS colour instead of `EMPTY_PALETTE_SWATCH`
(`"#888"`, `:223`). Omitting the prop is the correct call; supplying `''` is a masking fallback
(owner edict 2).

**(pass 2)** This is not theoretical: `mix-expanded.png` shows a saved palette literally named
**"Empty"** with count `0`, whose colour strip renders as a blank band. The 0-color palette is
confirmed present in the live store; the pixel consequence **in palettes mode** remains a hypothesis
— the collapsible list was measured, not the `PaletteCard` render of that palette.

---

### D-14 · MINOR — the remove badge uses physical insets in a layout that mirrors

`:153` positions the badge `absolute -top-1 -right-1`; `:257` sets `text-left` on the palette tile.
RTL measured: the container mirrors correctly (`dir=rtl`, well `x 224 w 462`, ghost `x 624.5`), so a
physical `-right-1` lands the badge on the *inline-start* corner in RTL while the chip order flips.
`VISUAL-CONSTITUTION.md:151` (§6.1): *"chrome, navigation and layout | logical inline/block direction
follows the document."* Logical `inset-inline-end` / `inset-block-start` and `text-start` are the
idiom. **HYPOTHESIS** — chips are unreachable (D-1), and `shots/rtl-desktop/` contains no `/#/mix`,
so the mirrored badge is unphotographed.

---

### D-15 · MINOR — the remove control is hover-only, nameless, and 16 × 16

`:152–158`: `opacity-0 group-hover:opacity-100`, `w-4 h-4`, no `aria-label`, no text — the icon-only
`<X>` gives it no accessible name (this is the `1` in `namelessButtons … /#/mix: 1`,
`REPORT.md:99`). On touch there is no hover, so the only reveal is `focus-visible`, which requires a
keyboard. `PROPORTION-AUDIT.md:51` (PR-07) — *"**Hover-only**/unlabeled controls and invisible drag
state → ADD-AFFORDANCE / REMOVE; every surviving action/drag seat has a name/state"* — and §5.7:
*"Visual glyph size, operable target size and layout reservation are separate quantities."*

**(pass 2)** Compounding: the only full-clear action lives in the **dock's overflow menu** —
`demo/shell/usePaneRouter.ts:220`, `{ key: "clear", icon: Trash2, title: "Clear", description:
"Clear all selected colors.", handler: () => paneRefs.mix.value?.clearSelection?.() }` — three levels
away from the rack it clears. §5.6: *"Add affordance when the surviving action/state is otherwise
undiscoverable."*

---

### D-16 · INFO — import discipline is internally inconsistent

`:4,:7` import glass-ui by subpath (`@mkbabb/glass-ui/tabs`, `/watercolor-dot`); `:5` imports the
same design system through `demo/ui/collapsible`, whose body is
`export { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@mkbabb/glass-ui";` — the root
barrel. `grep -rln "ui/collapsible" demo` returns exactly this file. (The `demo/ui/*` barrel layer is
a house-wide convention, so this is a consistency note, not a boundary violation.) Separately, `:2`
imports `TransitionGroup` explicitly while the parent `MixPane.vue:111` uses `<Transition>`
unimported — Vue 3.5 resolves built-ins in templates; the import is redundant.

---

## 3.1 Pass-2 additions

### D-17 · MAJOR — the disclosure is unbounded and evicts the instrument's primary action

`:195` — `CollapsibleContent` carries `overflow-hidden` (for the height keyframe, D-7) and nothing
else: **no `max-height`, no scroll container, no virtualisation.**

`.playwright-mcp/mix-expanded.png` (live, 1440 × 900, five saved palettes) is the proof: with the
disclosure open, the palette list runs past the bottom of the pane and **`COLOR SPACE`, `HUE METHOD`
and the `Mix` button are pushed entirely below the fold.** A supporting affordance for *choosing*
operands evicts the protagonist that *consumes* them. Pass 1's 2-palette fixture produced a
`265.875px` content and never reached this state — the defect is a function of real library size.

`VISUAL-CONSTITUTION.md:34` (§3.8) — *"One pane may have one full-strength visual protagonist.
Supporting fixtures do not compete with it through equal size or equal shadow."* A fixture that grows
without limit until the protagonist leaves the viewport competes by definition. The canon prescribes
the shape elsewhere for exactly this situation (`:214`): *"advanced grouped disclosure … and a
**scroll-confined** inspector."*

**Cure.** `max-block-size` on the disclosure content at a rung tied to the pane's rhythm, with
`overflow-y:auto` inside it, so the commit region never moves; and the mode control leaves the
scroll box entirely — it is chassis, not content (§1.5).

### D-18 · MAJOR — the operand-count guard is off-by-one against the state machine and against canon

Three authorities disagree about the floor:

| Authority | Floor |
|---|---|
| `MixSourceSelector.vue:37,39` — `MIN_COLORS = 1`, `canRemoveColor = length > 1` | **1** |
| `useMixingState.ts:51` — `canMix = selectedColors.value.length >= 2` | **2** |
| `VISUAL-CONSTITUTION.md:202` — *"An ordered N-operand rack (**2–12 colors** …)"* | **2** |

The selector blocks the harmless state (0 operands) and permits the useless one (1 operand). At
exactly one colour the `×` is `disabled`, `canMix` is false, the `Mix` button is dead, and — because
the add slot is inert (D-1) — the user is in a **terminal state** whose only exit is a dock overflow
menu (D-15). The comment at `:36` (*"remove needs ≥ 1 remaining"*) states the intent precisely; the
intent is one below the real invariant.

Mechanism: the count invariant is authored twice, in two files, with two different values. It belongs
once, in `useMixingState`, exposed as `canAdd` / `canRemove` beside the `canMix` it already owns.

### D-19 · MAJOR — the "ordered N-operand rack" has no reorder affordance

**This supersedes pass 1's "dragging | n/a | no reorder here".** Reorder is not absent-by-design; the
canon requires it, twice, naming operands explicitly:

- `VISUAL-CONSTITUTION.md:202` — *"An **ordered** N-operand rack … Source mode, add/remove/**reorder**,
  method, unequal-palette strategy, provenance and commit share the same control grammar."*
- `VISUAL-CONSTITUTION.md:131` (§5.2) — *"horizontal explicit reorder: palette colors, **operands**,
  stops — after Space grabs, Right moves one visual position right; Left one visual position left …
  every move announces item and `position of total`; Space drops, Escape cancels."*

The component implements none of it: no grab, no drag, no arrow reorder, no ordinal announcement. The
rack is ordered in the state machine (`selectedColors` is an array; `mixColorSequence` consumes it in
order) and unordered in the interface. D-11's stable-`id` cure is the prerequisite.

### D-20 · MAJOR — the mode control has no accessible name and takes the wrong semantics

**This overturns the pass-1 negative-proof claim that the tabs are clean.** The *component choice* is
canon (`VISUAL-CONSTITUTION.md:89` names *"Mix Colors/Palettes source-mode tabs"* as a surviving P092
site, and there are no descendant corrections). The *configuration* is not. Measured live:

```json
"tabs": { "role": "group", "ariaLabel": null,
          "html": "<div role=\"group\" class=\"segmented-tabs segmented-tabs--pill glass-capsule-track font-display\">…" }
```

`SegmentedTabs.vue.d.ts` exposes `ariaLabel` — *"Accessible name shared by the desktop strip and
responsive Select"*. It is not passed. The control that decides what the entire pane below it means
announces as an unnamed group.

It also takes the default semantics. The `.d.ts` states *"When omitted, preserves the historical
mapping: `pill` → `toggle`"*, and offers `semantics: "tabs"` plus a per-option `controls` field
*"completing the APG tablist↔tabpanel linkage for consumers that own a panel."* This consumer owns a
panel — `v-if="mode === 'colors'"` / `v-else` swaps the whole body. It is a tablist rendered as a
toggle group.

Same family: the `Selected` label (`:119`) is a bare `<span>` with no programmatic relationship to
the swatch row it names — no `aria-labelledby`, no list semantics — and every occupant of that row is
an `aria-hidden` producer span (D-1). **To AT, the Colors mode of this instrument is empty.**
`VISUAL-CONSTITUTION.md:83` (§4.1): *"Role, **accessible name**, state/value and associated
error/status are explicit."*

### D-21 · MINOR — the file re-commits the cascade-dead sin it documents excising

`:134–145` is a twelve-line monument to a defect the tranche already killed: *"the former `ring-2
ring-primary/50` here was CASCADE-DEAD … probed live 2026-07-11 … the dead utility is excised, never
re-minted geometric."* Twenty-five lines below it, `:170` and `:153` carry
`disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none` and
`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` on an element that is a
`<span>` — which can never match `:disabled` and can never receive focus. Five dead utility classes
on the add slot, same class of defect, same file, same idiom, unnoticed. (Family with D-1; the D-1
cure discharges it.)

### D-22 · MINOR — three compositions in one file

283 lines host (a) the operand rack, (b) a saved-palette disclosure with a private card dialect,
(c) a palette selection field — plus a key-stabilisation subsystem and a duplicate count invariant.
Not a god module by size, but the disclosure (D-2/D-4/D-7/D-17) is a self-contained palette-picking
instrument sharing nothing with the rack except a parent `<template>`. When D-4's cure moves the
compact card into `PaletteCard`, the disclosure should leave with it.

---

## 4. Standing-edict check

| edict | verdict |
|---|---|
| 1 · no god modules | **PASS** (with D-22 as a composition note) — 283 L, no aggregation |
| 2 · no legacy code / masking fallbacks | **FAIL** — D-1 (a stale 6.x producer API kept alive by silence), D-13 (`''` masking a designed fallback), D-23 below |
| 3 · KISS, no contrivance | **FAIL** — D-4 (private card dialect), D-11 (20 lines of key bookkeeping standing in for one `id`), D-23 |
| 4 · glass-ui is the design system | **FAIL** — D-1, D-4, D-7, D-17 |
| 5 · root-level styling, no per-instance overrides | **FAIL** — D-7 (`overflow-hidden` + animation-name + chevron rotation, all re-minted on top of the producer recipe) |
| 6 · animations moved or tokenized, never deleted | **FAIL** — D-7 (a fourth family name replacing the producer's spring, animating `height`); D-11 (a designed motion prevented by key churn) |
| 7 · idiomatic Vue 3.5 | **PASS** — reactive props destructure at `:13–23`; no `defineModel` staleness path here; `watch` at `:90` does fire (every mutation in `useMixingState` replaces the array) |
| 8 · `verbatimModuleSyntax` | **PASS** — `:10,:11` are both `import type` |

**D-23 · MINOR — dead defensive branch against a signature that does not exist.** `:47–53`:

```ts
function onTabChange(value: string | string[]) {
    const next = Array.isArray(value) ? value[0] : value;
```

`SegmentedTabs.vue.d.ts` declares `"update:modelValue": (value: string) => any` and
`__VLS_ModelProps = { modelValue: string }`. The array arm is unreachable. The comment — *"Single-
select tabs always emit a string; guard the union honestly"* — states that it is unreachable and
guards it anyway: a masking fallback (edict 2) and a contrivance (edict 3). `value[0]` is also
`string | undefined` under `noUncheckedIndexedAccess`, so the guard widens the type it claims to
narrow.

---

## 5. What is sound (the negative proof for the axes that could not be faulted)

- **The tabs component choice is canon.** `VISUAL-CONSTITUTION.md:89` names the surviving P092 sites
  explicitly, including *"Mix Colors/Palettes source-mode tabs"*; the component consumes
  `SegmentedTabs variant="pill"` with no descendant corrections. **Narrowed by pass 2:** the choice
  is clean, the configuration is not — see D-20.
- **Contrast passes.** Canvas-resolved sRGB ratios: `Selected` on the well **5.08 : 1**;
  `From palettes` on the plate **6.29 : 1**; the count micro-label **5.71 : 1**. All ≥ 4.5. (An
  earlier oklab-naive measurement read 3.19 and was wrong; discarded.)
- **No horizontal overflow** at 1440 / 720 / 390 / 320 (`scrollWidth − clientWidth = 0`), matching
  `REPORT.json` `overflowX: 0` on all four `/#/mix` rows.
- **No console or page errors** on `/#/mix` in any matrix row (`REPORT.md:15–27`: the sole console
  error in the whole matrix is `safari-desktop-light /#/: WebGL: context lost`, a different route);
  the only console line in either pass's probes is the repo-wide `dev misconfigured` banner.
- **Reduced motion is honoured** by the global guard (`animations.css:184`) — measured
  `animation-duration: 0.00001s`. Note this is survival by app-wide sledgehammer, not by the
  component's own design.
- **RTL mirrors at the container level** (D-14 concerns only the unreachable chip badge).
- **Palette identity keys on `slug`** (`:55–67`), correct per K-PALID, and `aria-pressed` is present
  and truthful on the palettes-mode seats.
- **The palettes-mode empty state is genuinely well-designed** — `EmptyState` with eyebrow, message
  and hint, and a 22-line comment defending the refusal of ghost-card filler. It is the standard the
  colors branch fails to meet (D-3).

---

## 6. Evidence gaps neither pass could close

1. **Forced colors** — `shots/forced-colors-desktop/` contains only `adminusers · blob · browse ·
   gradient · picker`. **No `/#/mix`.** A WebKit `forcedColors: "active"` context reported
   `matchMedia("(forced-colors: active)").matches === true` but rendered the ordinary palette, so it
   cannot settle whether the box-shadow selection ring (D-6) survives a real high-contrast render.
   **Unproven, not clean.**
2. **200 % zoom** — `shots/zoom-200-desktop/` likewise has no `/#/mix`; a 720 px CSS arm was used as
   an approximation, which `VISUAL-CONSTITUTION.md:62` (§3.2) explicitly says is *not* a substitute
   for actual in-app zoom.
3. **RTL** — `shots/rtl-desktop/` has no `/#/mix` either; D-14's mirrored render is source-derived.
4. **Every populated-state render** — blocked by D-1. Fix D-1 first; the populated, hover, focus,
   pressed, disabled, overflow, reorder and motion states must then all be re-photographed before
   this component can be called verified.

---

## 7. Cure summary, in the order that collapses the most

1. **One `SwatchSeat`** — a named `<button>` seat wrapping a `WatercolorDot` face + glyph, owning
   name, `disabled`, focus and press. Discharges **D-1, D-15 (naming), D-21**, and is the enclosing-seat
   shape `VISUAL-CONSTITUTION.md:91` already specifies for Gradient stops and Generate specimens —
   authored once, in glass-ui (owner edict 4).
2. **Operand identity in `useMixingState`** — `{ id, css, source }` minted at `addColor`, plus
   `canAdd`/`canRemove` beside the existing `canMix`. Discharges **D-11, D-18**, and supplies
   **D-19**'s key.
3. **The rack collapses at zero** — invitation, not fixture; the palettes-mode `EmptyState` register.
   Discharges **D-3** and the §1.1 proportion body.
4. **A `compact` register on `PaletteCard`; the mix tile stops wrapping** — the pressed seat moves
   inside, spanning specimen/identity, per §5.12. Discharges **D-4, D-5, D-6, D-13, D-22**.
5. **Delete the disclosure's per-instance overrides; bound it.** Consume the producer
   `.disclosure-content` recipe and `data-state` chevron; add `max-block-size` + `overflow-y:auto`.
   Discharges **D-7, D-9, D-17**.
6. **Re-read the type marks from §4; name the mode strip.** `.section-label` for `Selected`,
   `--type-subheading` for palette identity, Fira for both counts; `ariaLabel` + `semantics="tabs"` +
   `controls` on `SegmentedTabs`. Discharges **D-8, D-10, D-20**.
7. **Logical properties; drop the dead union guard.** Discharges **D-14, D-23**.

---

## 8. Reproduction

Dev server live at `http://localhost:9000`.

**Pass 1** — isolated WebKit/Chromium contexts, each seeding `localStorage["color-palettes"]` with a
2-palette fixture (one deliberately long name) and reloading:

- `…/scratchpad/probe-mix.mjs` — inert-affordance proof, area shares, palettes-mode nesting
  (light/dark 1440 + light 390)
- `…/scratchpad/probe-mix2.mjs` — rhythm, typography, RTL, forced-colors, 720/320 arms, PRM
- `…/scratchpad/probe-mix3.mjs` — canvas-resolved contrast, disclosure animation truth
- `…/scratchpad/probe-mix4.mjs` — trigger geometry, accessible name, producer-vs-consumer animation
- `swatch-key-churn.repro.mjs` (this directory) — the D-11 key replay

**Pass 2** — shared MCP browser against the **live** store (5 palettes, including a 0-color palette
named "Empty" and a 24-color palette), two `browser_evaluate` probes whose complete output is pasted
verbatim in **D-1**, **§1.1**, **D-8** and **D-20**; one viewport capture
`.playwright-mcp/mix-expanded.png`. No repo file outside this directory was written.

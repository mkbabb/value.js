# CHALLENGE-D — `demo/workbenches/mix/MixSourceSelector.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, model id `claude-opus-5[1m]`, spawned with an explicit
Opus 5 declaration. Seat declared, not inherited.

- **Axis:** design (visual truth · state coverage · motion · design-system boundary · proportion/seat law)
- **Subject:** `demo/workbenches/mix/MixSourceSelector.vue` (283 L), mounted once, by
  `demo/workbenches/mix/MixPane.vue:80`, on route `/#/mix`
- **Base:** branch `tranche-u`, HEAD `c654824e`; glass-ui `7.0.0` (`node_modules/@mkbabb/glass-ui/package.json`)
- **Verdict:** **DEFECTIVE** — one BLOCKER that makes the component's primary mode non-functional,
  plus six MAJOR design defects, four MINOR, two INFO.

---

## 0. The one-line finding

**In colors mode — the default mode — this component cannot accept a single color.** Every
interactive affordance it draws is an `aria-hidden`, `pointer-events: none` `<span>`. There is no
click path, no keyboard path, and no `Plus` glyph. The Mix workbench's headline interaction is
undelivered in the shipped build, and the visual-audit matrix captured it without noticing, because
an empty dashed well *looks* like a legitimate empty state.

---

## 1. Visual truth

Screenshots read (audit matrix): `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/mix.png`,
`…/safari-desktop-dark/mix.png`, `…/safari-mobile-light/mix.png`. Own captures (isolated WebKit,
DPR 2, seeded library): colors/palettes × light/dark × 1440/390/720/320.

### 1.1 The "Selected" well is a 462 × 108 px void

| arm | well (CSS px) | sole content | ink share |
|---|---|---|---|
| 1440 desktop | 462 × 107.9 | one 48 px ghost dot | **4.36 %** |
| 720 (≈200 % zoom) | 462 × 105.4 | one 48 px ghost dot | 4.73 % |
| 390 mobile | 324 × 100.6 | one 44 px ghost dot | 5.94 % |
| 320 narrow | 254 × 100.6 | one 44 px ghost dot | 7.58 % |

95.6 % of the largest single fixture in the pane is empty, at every arm, in the state the app boots
into. `PROPORTION-AUDIT.md` §5.3 — "Renderer, icon or touch footprints may reserve collision space
**only on the axis where collision exists**" — and §1 — "Every element earns its scale … from its
job relative to the local protagonist". A 50 000 px² reservation for a 2 300 px² protagonist is the
mechanically-large gap that ruling forbids.

### 1.2 Dark mode is a hole, not a well

Light: well `oklab(0.9133 …)` vs plate `oklab(0.9283 … / 0.664)` — a **1.12 : 1** luminance ratio.
The recess is carried entirely by a 12 %-alpha dashed hairline
(`border: 1.5px dashed oklab(0.216 0.0035 0.0052 / 0.12)`, `demo/styles/utils.css:96`). In dark
(`safari-desktop-dark/mix.png`) the dashed edge all but vanishes and the well reads as a flat brown
slab with a single pink dashed blob floating at its left edge — the exact "featureless slab" failure
mode `utils.css:44–56` (E1-R2) documents and cures *for skeletons* but not here.

### 1.3 Two palette grammars, 40 px apart

Colors mode draws each saved palette as a hand-rolled mini-card (full-bleed `PaletteColorStrip`,
name, count, then a **second** row of dots repeating the same colors). Palettes mode draws the same
entity as `PaletteCard`. Same data, same pane, same component, two visual languages, two truncation
policies (`truncate` at `:205` vs PaletteCard's `line-clamp-2 sm:line-clamp-1`). See own captures
`mix-colors-light-1440.png` vs `mix-palettes-light-1440.png`.

### 1.4 The selection ring fights the material it wraps

Palettes mode selection = `ring-2 ring-primary ring-offset-2 ring-offset-background` on an **outer**
wrapper. Measured on the selected seat:

```
box-shadow: … rgb(251,250,248) 0 0 0 2px,  oklch(0.470927 0.093396 169.83403) 0 0 0 4px   (light)
--tw-ring-offset-color: hsl(24 9% 4%)                                                     (dark)
```

The 2 px offset gap paints `--background` — the page background — not the plate the card actually
sits on, so a hard cream (light) / near-black (dark) hairline is stamped between the card and its
ring. And in the light capture the selected card's `cartoon-surface` cast shadow is occluded by the
ring while its unselected sibling keeps it: selection **removes** the card's material register.

---

## 2. State coverage

`MIN_COLORS`/`MAX_COLORS` guards, hover-reveal remove, focus reveal, disabled add, disabled remove,
chip enter/leave motion, provenance `title` — all of it hangs off a populated `selectedColors`.

| state | designed | reachable in build | note |
|---|---|---|---|
| empty · colors | ✗ (bare well, no copy) | ✓ | **D-3** |
| empty · palettes | ✓ (`EmptyState` eyebrow/message/hint) | ✓ | sound |
| loading | n/a — store is synchronous | — | honestly declared at `:236–238` |
| populated · colors | ✓ | **✗** | **D-1** |
| hovered / focused / pressed chip | ✓ | **✗** | D-1 + D-15 |
| disabled add (`MAX_COLORS`) | ✓ | **✗** | attr dropped anyway (D-1) |
| disabled remove (`MIN_COLORS`) | ✓ | **✗** | D-1 |
| selected · palettes | ✓ | ✓ | D-5, D-6 |
| overflowing / wrapping | `flex-wrap` | **✗** | unverifiable |
| truncated | ✓ ×2 policies | ✓ | D-4 |
| error | ✗ | — | no error source exists; acceptable |
| dragging | n/a | — | no reorder here |
| RTL | container ✓ / badge ✗ | partial | D-14 |
| reduced-motion | ✓ global guard | ✓ | measured `animation-duration: 0.00001s` |
| forced-colors | **unproven** | — | see §6 gap |
| zoom 200 % | ✓ (720 arm: `overflowX 0`) | ✓ | approximated arm |

**Eight of fifteen states cannot be entered.** A component whose majority surface is unreachable has
not been designed and verified; it has been drafted.

---

## 3. Findings

### D-1 · BLOCKER — every interactive `WatercolorDot` is inert; colors mode cannot accept a color

**Evidence.** glass-ui 7.0.0's `WatercolorDot` is prop-closed and attribute-closed:

`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts` — props are
exactly `{ color, variant, animate, cycleDuration, range, seed }`. No `tag`. No slot.
`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` — `inheritAttrs: !1`, and the render is a
hard-coded

```js
o("span", { "aria-hidden": "true", class: [...], "data-testid": "watercolor-swatch",
            "data-variant": e.variant,
            style: [ …, { backgroundColor: …, borderRadius: …, pointerEvents: "none", … } ] }, …)
```

Only `class` and `style` are forwarded. `MixSourceSelector.vue` passes a glass-ui **6.x** API at four
call sites — `tag="div"` (`:148`), `tag="button"` + `aria-label` + `@click` + `:disabled` + a `<Plus>`
slot child (`:164–176`), `tag="button"` + `:title` + `:aria-label` + `@click` (`:211–221`), plus
`:title` on the chip (`:150`). All silently discarded.

Live measurement (isolated WebKit, `http://localhost:9000/#/mix`, seeded 2-palette library):

```json
"ghostTag": "SPAN", "ghostAriaHidden": "true", "ghostAriaLabel": null, "ghostDisabled": false,
"ghostPointerEvents": "none", "ghostCursor": "pointer", "plusPresent": false,
"svgClasses": ["watercolor-filter-host"],
"hitTest": "DIV.swatch-row flex items-center gap-2.5 fle", "focusablesInWell": 0
"clickAdd": { "before": 0, "after": 0 }
"fromPalettes": { "firstSwatch": { "tag":"SPAN", "ariaHidden":"true", "ariaLabel":null,
                                   "title":null, "pe":"none" }, "chipsAfterClick": 0 }
"tabOrder": ["BUTTON :: Colors","BUTTON :: Palettes","BUTTON :: From palettes2",
             "BUTTON :: Color space","BUTTON :: Hue method"]
```

Identical on `light/1440`, `dark/1440`, `light/390`. Real Playwright `.click({force:true})` on the
ghost, and synthetic clicks on the element `elementFromPoint` returns, both leave
`[data-mix-source]` at 0. `MixPane.vue` binds `@add-color` only from this component
(`grep -rn addColor demo` — no other producer reaches `useMixingState.addColor`), so **no add path
exists**. The dot even advertises `cursor: pointer` on a `pointer-events: none` element: an
affordance that lies.

**Mechanism.** A producer major-version adoption (glass 7.0.0, W44) migrated the package but not the
call sites; the dropped props fail silently because `inheritAttrs:false` swallows them and Vue does
not warn on unknown attrs. This is a **family**, not a one-off — `grep -rn 'tag="button"' demo`
returns 4 live sites (this file ×2, `GenerateControls.vue:203`, `CurrentPaletteEditor.vue:98`,
`SwatchHoverMenu.vue:17,32`), and `tag="div"` returns 14 more.

**Cure (gestalt, not patch).** The dot is a *face*, never a *seat* — that is what glass-ui 7 encodes
by making it an `aria-hidden` span. Transpose accordingly: every operable dot becomes a real
`<button>`/`<div>` seat that *contains* a `<WatercolorDot>` face, with the name, disabled state,
handler and focus ring on the seat. That is one shared seat idiom for the whole family (this is a
producer ask if it recurs: a `WatercolorSwatchButton` in glass-ui, not a demo wrapper). The `Plus`
glyph then lives in the seat, above the face.

---

### D-2 · MAJOR — the component's own register law is applied to the chips and violated by the cards

Lines 134–145 excise `ring-2 ring-primary/50` from the chip dots and declare the law: *"rings on
WatercolorDots ride the dot's own silhouette … or do not exist — the dead utility is excised, never
re-minted geometric."* Sixty lines later (`:256–261`) the palettes-mode seat mints exactly that:
`ring-2 ring-primary ring-offset-2 ring-offset-background`. Lines 186–189 kill a `/50` post-hoc
alpha on the chevron because *"the token IS the de-emphasis rung; attenuating it further is the
guard-then-alpha class"*; line 260 de-emphasises unselected cards with `opacity-75` — measured
`opacity: 0.75` on the unselected seat. The file argues against itself twice, in writing.

**Cure.** One selection register for the whole component, expressed on the entity the producer owns
(`PaletteCard`'s pressed seat, per §5.12 below), not an outer ring; de-emphasis by rung, not alpha.

---

### D-3 · MAJOR — the colors-mode empty state was never designed

Palettes mode ships a full `EmptyState` (eyebrow `· nothing to mix ·`, message, hint — rendered and
verified: `"· NOTHING TO MIX · / No saved palettes yet. / Save two or more palettes, then pour them
together here."`). Colors mode, the *default* mode, ships a 462×108 well containing one inert dot,
no eyebrow, no message, no hint, and (per D-1) nothing to press. Two empty grammars in one
component; the one the user meets first is the undesigned one. `PROPORTION-AUDIT.md` §5.6:
"Add affordance when the surviving action/state is otherwise undiscoverable."

---

### D-4 · MAJOR — one entity, two presentations, and the same colors encoded twice

Colors mode `:197–223` hand-rolls a palette card: `rounded-card border border-border/30
overflow-hidden` + `PaletteColorStrip` + name + count + a dot row. Measured 462 × 124.9 (desktop) /
324 × 121.6 (mobile); border resolves to `oklab(… / 0.3)` and is invisible in dark (own capture
`mix-colors-dark-1440.png`). Palettes mode `:264–267` renders `PaletteCard` for the same object.

Inside the hand-rolled card the **full-bleed strip and the dot row below it are the same colors,
twice, 60 px apart**. `SUBTRACTION.md`/`PROPORTION-AUDIT.md` §5.5 — a mark is data, status, labeled
action, drag affordance, focus register, or removed. A second encoding of the row above it is none
of those.

**Cure.** One palette-entity presentation in this component. The "from palettes" picker is
`PaletteCard` in a compact composition with per-swatch seats — not a private card dialect that
duplicates both the producer card and its own strip.

---

### D-5 · MAJOR — `<button>` wrapping `PaletteCard` violates the content model and §5.12 verbatim

`:246–268` wraps `PaletteCard` in a native `<button type="button" aria-pressed>`. Measured nesting:

```json
"wrappers": [ { "aria": "Select palette Sunset Drift", "pressed": "false",
                "nestedInteractive": ["BUTTON:Palette menu"] }, … ]
```

`PaletteCard.vue:5–26` renders `<div role="article" … cursor-pointer @click="$emit('click')">` and
contains a `<Button aria-label="Palette menu">`. So the DOM ships **a button inside a button**, an
`article` role inside a button, and a second click owner (`role="article"` + `@click` +
`cursor-pointer`) inside the first.

`PROPORTION-AUDIT.md` §5.12 is explicit and is inverted here: *"The Card/article root is a
noninteractive container: it owns no activation, focus or selection state … Its one native named
`<button type="button" aria-pressed="false|true">` **child** spans specimen/identity and alone owns
activation, visible selection and focus."* The seat must be **inside** the card, not around it.

---

### D-6 · MAJOR — selection and focus share one cascade channel; the ring offset paints the wrong ground

Two sub-defects on the same seat:

1. **Offset ground.** `ring-offset-background` resolves to `--background`
   (measured `--tw-ring-offset-color: hsl(24 9% 4%)` dark, `rgb(251,250,248)` light) — never the
   `tier="resting"` plate the card sits on. `VISUAL-CONSTITUTION.md` §4.1: "Text, focus, boundaries
   and state meet their rendered contrast **on the actual material tier**; a token name is not
   evidence."
2. **Focus vs selection collide.** Selection is `ring-2 ring-primary ring-offset-2`; focus is
   `focus-visible:ring-2 focus-visible:ring-ring/40`. In Tailwind v4 both write the same
   `--tw-ring-width` / `--tw-ring-color` / `--tw-ring-shadow` channel, and
   `.focus-visible\:ring-2:focus-visible` (specificity 0,2,0) outranks `.ring-2` (0,1,0) — so a
   *selected* card that receives keyboard focus renders one ring in the 40 %-alpha focus colour and
   loses its selection colour. §4.1: "Focus remains visibly distinct from selection in both schemes,
   forced colors and reduced transparency." **HYPOTHESIS** — I could not land keyboard focus on the
   seat to photograph it: WebKit/macOS omits buttons from Tab order by default, and the Chromium arm
   did not receive the seeded library. Mechanism is deterministic CSS; the render is unphotographed.

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
Measured on the open content element (class list confirms the producer recipe is present and beaten):

```json
"cls": "disclosure-content overflow-hidden data-[state=open]:animate-collapsible-down …",
"animationName": "collapsible-down", "animationDuration": "0.2s", "animationTiming": "ease-out",
"--disclosure-content-size": "265.875px"
```

Three defects in one line: (a) the house spring (`--spring-smooth`) is replaced by a generic
`0.2s ease-out`; (b) `overflow: hidden` is re-declared on a recipe that already sets it — a
per-instance override of a root, against the standing root-styling edict; (c)
`collapsible-down/up` is a **fourth animation family name**, and `demo/styles/animations.css:60`
states the law: *"three named families; a fourth name is a defect (gate (a), R.W4 §Hard gate)"* —
the sanctioned families being `vj-enter` / `vj-morph` / `vj-celebrate`, one of which this same
component uses at `:121`.

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

`VISUAL-CONSTITUTION.md` §4: *control or label → `text-small` → **Plus Jakarta Sans, non-bold***.
`Selected` is a display family at semibold for a control label — wrong family and wrong weight — and
it bypasses the `.section-label` primitive its own sibling consumes.

---

### D-9 · MINOR — the disclosure trigger is a 29.6 px tap target

Measured: `462 × 29.6` desktop, `324 × 26.3` mobile; `min-block-size: 0px`; `padding: 4px 0px`.
The consumer's `py-1` (`:182`) is the whole vertical measure. glass-ui's own trigger recipe carries
`min-block-size: 2.75rem` (44 px) on `.disclosure-group-trigger`, unused here.
`PROPORTION-AUDIT.md` PR-12: "Invisible/seat geometry preserves target floor while optics follow
rung." The audit's `smallTapTargets` sweep did not flag it (its threshold clears 24 px), so this is
a defect the existing matrix misses.

---

### D-10 · MINOR — the trigger announces "From palettes2"

Measured accessible name: `"From palettes2"` — `:183` label and `:184` count are adjacent text nodes
with no separator or `aria-label`. The count is also the only bare number in the composition with no
unit or label (`PROPORTION-AUDIT.md` §5.5).

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

Removing one chip from three therefore plays **three leave transitions and two enter transitions**
instead of one leave plus a move. `demo/styles/utils.css:168–178` exists precisely to make
"neighbours reflow on the family move class" (`.vj-enter-move`) — with index-bearing keys that class
can never fire, because no element survives with its key. The `watch` at `:90–98` then prunes the
map, guaranteeing keys are never reused.

`SelectedColor` has `{css, source}` and no identity; the honest cure is an identity at the source —
`useMixingState.addColor` mints a stable `id` per selection — after which the key is `sc.id` and the
map, the counter and the watcher all disappear (≈20 lines deleted). **Reproduction blocked by D-1**
(the populated state is unreachable); the algorithm replay above is exact.

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
for a zero-colour palette the seat renders an empty CSS colour instead of `EMPTY_PALETTE_SWATCH`.
Omitting the prop is the correct call; supplying `''` is a masking fallback.

---

### D-14 · MINOR — the remove badge uses physical insets in a layout that mirrors

`:153` positions the badge `absolute -top-1 -right-1`. RTL measured: the container mirrors correctly
(`dir=rtl`, well `x 224 w 462`, ghost `x 624.5` — i.e. the row's leading edge moves to the right),
so a physical `-right-1` lands the badge on the *inline-start* corner in RTL while the chip order
flips. Logical `inset-inline-end` / `inset-block-start` is the idiom.
**HYPOTHESIS** — chips are unreachable (D-1), so the mirrored badge is unphotographed.

---

### D-15 · MINOR — the remove control is hover-only, nameless, and 16 × 16

`:152–158`: `opacity-0 group-hover:opacity-100`, `w-4 h-4`, no `aria-label`, no text — the icon-only
`<X>` gives it no accessible name. On touch there is no hover, so the only reveal is
`focus-visible`, which requires a keyboard. `PROPORTION-AUDIT.md` PR-07 —
"Hover-only/unlabeled controls … ADD-AFFORDANCE / REMOVE; every surviving action/drag seat has a
name/state" — and §5.7: "Visual glyph size, operable target size and layout reservation are separate
quantities." Confirmed in source; render blocked by D-1.

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

## 4. Standing-edict check

| edict | verdict |
|---|---|
| 1 · no god modules | **PASS** — 283 L, one job, no aggregation |
| 2 · no legacy code / masking fallbacks | **FAIL** — D-1 (a stale 6.x producer API kept alive by silence), D-13 (`''` masking a designed fallback) |
| 3 · KISS, no contrivance | **FAIL** — D-4 (private card dialect), D-11 (20 lines of key bookkeeping standing in for one `id`) |
| 4 · glass-ui is the design system | **FAIL** — D-1, D-4, D-7 |
| 5 · root-level styling, no per-instance overrides | **FAIL** — D-7 (`overflow-hidden` + animation-name + chevron rotation, all re-minted on top of the producer recipe) |
| 6 · animations moved or tokenized, never deleted | **FAIL** — D-7 (a fourth family name replacing the producer's spring); D-11 (a designed motion prevented by key churn) |
| 7 · idiomatic Vue 3.5 | **PASS** — reactive props destructure at `:13–23`; no `defineModel` staleness path here; `watch` at `:90` does fire (every mutation in `useMixingState` replaces the array) |
| 8 · `verbatimModuleSyntax` | **PASS** — `:10,:11` are both `import type` |

---

## 5. What is sound (the negative proof for the axes I could not fault)

- **The tabs are canon.** `VISUAL-CONSTITUTION.md` §4.2 names the surviving `P092` sites explicitly,
  including "Mix Colors/Palettes source-mode tabs"; the component consumes
  `SegmentedTabs variant="pill"` with no descendant corrections. No finding.
- **Contrast passes.** Canvas-resolved sRGB ratios: `Selected` on the well **5.08 : 1**;
  `From palettes` on the plate **6.29 : 1**; the count micro-label **5.71 : 1**. All ≥ 4.5. (An
  earlier oklab-naive measurement of mine read 3.19 and was wrong; discarded.)
- **No horizontal overflow** at 1440 / 720 / 390 / 320 (`scrollWidth − clientWidth = 0`), matching
  `REPORT.json` `overflowX: 0` on all four `/#/mix` rows.
- **No console or page errors** on `/#/mix` in any matrix row (`REPORT.json`: `consoleErrors: []`,
  `pageErrors: []`); the only console line in my probes is the repo-wide `dev misconfigured` banner.
- **Reduced motion is honoured** by the global guard (`animations.css:184`) — measured
  `animation-duration: 0.00001s` under `prefers-reduced-motion: reduce`.
- **RTL mirrors at the container level** (§D-14 concerns only the unreachable chip badge).
- **Palette identity keys on `slug`** (`:55–67`), correct per K-PALID, and `aria-pressed` is present
  and truthful on the palettes-mode seats.

---

## 6. Evidence gaps this seat could not close

1. **Forced colors** — `shots/forced-colors-desktop/` contains only `adminusers · blob · browse ·
   gradient · picker`. No `/#/mix`. My WebKit `forcedColors: "active"` context reported
   `matchMedia("(forced-colors: active)").matches === true` but rendered the ordinary palette
   (`mix-forcedcolors-1440.png`), so it cannot settle whether the box-shadow selection ring survives
   a real high-contrast render. **Unproven, not clean.**
2. **200 % zoom** — `shots/zoom-200-desktop/` likewise has no `/#/mix`; I used a 720 px CSS arm as an
   approximation, which `VISUAL-CONSTITUTION.md` §3.2 explicitly says is *not* a substitute for
   actual in-app zoom.
3. **Every populated-state render** — blocked by D-1. Fix D-1 first; the populated, hover, focus,
   pressed, disabled, overflow and motion states must then all be re-photographed before this
   component can be called verified.

---

## 7. Reproduction

Dev server live at `http://localhost:9000`. Probes are isolated WebKit/Chromium contexts (the shared
MCP browser was being driven by another seat and drifted routes mid-measurement, so all numbers here
come from the isolated scripts):

- `…/scratchpad/probe-mix.mjs` — inert-affordance proof, area shares, palettes-mode nesting
  (light/dark 1440 + light 390)
- `…/scratchpad/probe-mix2.mjs` — rhythm, typography, RTL, forced-colors, 720/320 arms, PRM
- `…/scratchpad/probe-mix3.mjs` — canvas-resolved contrast, disclosure animation truth
- `…/scratchpad/probe-mix4.mjs` — trigger geometry, accessible name, producer-vs-consumer animation
- key replay: `node -e '…'` (§D-11), output pasted verbatim

Each seeds `localStorage["color-palettes"]` with a 2-palette fixture (one deliberately long name) and
reloads; no repo file outside this directory was touched.

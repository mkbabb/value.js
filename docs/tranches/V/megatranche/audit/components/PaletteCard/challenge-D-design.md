# CHALLENGE-D — PaletteCard: the design is wrong

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. The seat was
spawned with an explicit Opus 5 declaration and the served tier matches it. Seat declared, not
inherited.

---

## 0. Evidence base

Subject: `demo/palettes/browser/card/PaletteCard/` — six files, **876 lines** total
(`PaletteCard.vue` 364 · `PaletteCardMenu.vue` 228 · `PaletteCardSwatches.vue` 96 ·
`PaletteRenameInput.vue` 66 · `PaletteCardMeta.vue` 64 · `ActionFeedback.vue` 58), plus
`../PaletteColorStrip.vue`, `../composables/useHoverPopover.ts`, `../composables/useHeightTransition.ts`.

Canon read and judged against: `docs/tranches/V/VISUAL-CONSTITUTION.md` (§2, §3, §3.1, §4, §4.1,
§4.2, §5, §5.2, §6, §6.1, §7), `docs/tranches/V/PROPORTION-AUDIT.md` (§4 seed rows PR-01…PR-16,
§5 card and micro-UI laws 1–14).

Live probes (WebKit, isolated instances — the shared MCP browser was contested by parallel seats
and hash-navigated out from under me mid-probe):

- `probe.mjs` → `probe-results.json`, 9 matrices (desktop/mobile × light/dark, forced-colors, RTL,
  reduced-motion, 200% zoom, 320px)
- `probe2.mjs` → `probe2-results.json` (C-ladder, keyboard reach, expanded state, motion, title starvation)
- `probe3.mjs` / `probe4.mjs` → `probe3-results.json` (badge shimmer resolution, empty state, type rungs, strip semantics)
- `shots/` — 13 frames including 3×-DPR element crops of a single card

**Finding zero: the tranche's own visual audit is blind to this component.** All 60 captures in
`docs/tranches/V/megatranche/audit/visual/` render **zero** PaletteCards. `/#/browse` shows
"The commons is unreachable. Failed to load palettes"; `/#/palettes` shows "No saved palettes yet."
(`shots/safari-desktop-light/browse.png`, `shots/safari-desktop-dark/palettes.png`). `REPORT.md`
therefore reports 0 blank frames, 0 overflow and 0 page errors for the two routes this component
owns — while every defect below was sitting one seeded `localStorage` key away. The audit's
`smallTapTargets: 8` for `/#/palettes` is a count of the *empty* page. Any downstream wave that
reads `REPORT.md` as coverage of the palette field is reading a photograph of an empty room.

---

## 1. BLOCKER — The card is, item for item, the artefact the Visual Constitution names as forbidden

`VISUAL-CONSTITUTION.md §5` bullet 5 is not a general principle; it is a list of six prohibitions
written against this exact component:

> A palette card is a bounded entity article, **not a clickable `role=article`**, `listbox`/`option`
> composite, **or seven-mode omnibus**. […] **The card body owns no expand, inline rename, action
> menu, transient result or hover-only swatch-action path.** Full detail, rename/lifecycle/export
> actions and durable operation state live in the selected inspector; the card's compact swatch
> strip remains noninteractive data with zero activation/focus/drag semantics.

The shipped card commits **all six**:

| Prohibition | Shipped | Coordinate |
|---|---|---|
| clickable `role=article` | `<div role="article" … cursor-pointer @click="$emit('click')">` | `PaletteCard.vue:19,22,26` |
| seven-mode omnibus | 10 props / **18 emits** / 5 call sites, each a different mode | `PaletteCard.vue:182-218`; §9 below |
| card body owns expand | `expanded` prop → `<Transition>` + `useHeightTransition` | `PaletteCard.vue:131-158` |
| …inline rename | `<PaletteRenameInput v-if="renaming">` | `PaletteCard.vue:112-120` |
| …action menu | `<PaletteCardMenu>` with 20 actions incl. export/delete/visibility | `PaletteCard.vue:83-106`, `PaletteCardMenu.vue` |
| …transient result | `<ActionFeedback>` auto-dismiss chip | `PaletteCard.vue:123-128` |
| …hover-only swatch-action path | `useHoverPopover` → `SwatchHoverMenu` add/edit/copy | `PaletteCard.vue:246-255`, `PaletteCardSwatches.vue:25-64` |

And the material tuple is wrong in the same breath. `§3.1` and `PROPORTION-AUDIT §5.12`:

> Every Browse/Library palette entity uses the one retained Card tuple exactly: `size="sm"`,
> `material="content"`, `tier="quiet"`, `surface="opaque"`, **`shadow=false`**, `grain=false`,
> `specular="off"`. The tuple does not vary with selection or viewport and has **no cartoon**,
> grid, or Card-level selected variant.

Measured root (`probe-results.json` → `d-light.rootStyles`):

```
classes:     "group rounded-card cartoon-surface border-card-edge bg-well cursor-pointer"
borderWidth: 2px
boxShadow:   oklab(… /0.32) -3px  3px 0 0,
             oklab(… /0.26) -5px  5px 0 0,
             oklab(… /0.18) -7px  7px 0 0
```

**Three stacked hard casters**, plus a fourth lagging `.cartoon-cast` child (`PaletteCard.vue:30`)
driven by `useLiquidPress` (`:263-267`). `§7` names this failure in words:

> Saved palettes are matte specimen slips inside a glass workspace, **not cartoon casters stacked
> within casters**.

It is not a `<Card>` at all. glass-ui 7.0.0 ships the exact contract:
`node_modules/@mkbabb/glass-ui/dist/components/card/styles.css:1` —
`.card[data-size="sm"] { --card-pad-inline: calc(var(--spacing) * 4) }` — i.e. the law's
`C = --spacing(4)` is a *producer default one prop away*. `PaletteCard.vue:19` hand-rolls a div
instead, and the source comment at `:12-15` states the refusal explicitly: *"NOT `<Card
surface=cartoon>`"*. So the component reaches past the design system to hand-roll a shell glass-ui
already provides — owner edict 4 — and then styles it per-instance instead of at the root — owner
edict 5.

**Note on canon provenance, honestly:** `demo/DESIGN.md:246` records the cartoon register as a
*landed* T-tranche row (`Card cartoon (R4) | PaletteCard.vue root | … | landed`). This is a live
canon conflict, not an oversight: tranche T ratified the cartoon register; tranche V's constitution
forbids it for this species. V is the current authority. The conflict itself is a finding — the T
row must be explicitly retired, not left standing as apparent authorization.

**Repro:** `node docs/tranches/V/megatranche/audit/components/PaletteCard/probe.mjs`; read
`probe-results.json → d-light.rootStyles`.

---

## 2. BLOCKER — The palette's name renders at 0 px. The card does not identify its entity.

This is the single worst thing in the component and no code read produces it.

`shots/card-featured-light.png` (3× DPR crop of one card, 900px viewport) reads:

> `⣿   🏅 Featured   (8)   ⑂  ⑂3  ↻4   [warm] [earthy] [autum⋯]   (⋯)`

The palette is called **"Featured One"**. Its name is absent. What a sighted user reads as the
card's identity is the *status badge*.

Measured (`probe3-results.json`, 1440px viewport, card 462px wide):

```
articleAccName:   "Palette: Featured One"
cardTextContent:  "Featured | 3 | 3 | 4 | warm | earthy | autumn"
```

The accessible name has the palette name. **The rendered text does not.** The visual and the
accessible representations of the same card disagree about what the card is.

At 390px (`probe2-results.json → titleStarve[1]`, name
"A very long palette name that will absolutely not fit…"):

| measure | value |
|---|---|
| `titleW` | **0** |
| `titleClientW` | **0** |
| `titleScrollW` | 100 |
| `truncatedBy` | **100 px (100%)** |
| rendered `innerText` | `""` |
| `shrink0ChipW` (siblings) | **233.06 px** |

Even the short case degrades: `titleStarve[2]` "Featured One" → `truncatedBy: 18`, and the m-dark
frame shows it broken mid-glyph across two lines as `Featur⟨cut⟩ / One`
(`shots/m-dark.png`). Desktop shows the long name as literally `A very…` — **7 glyphs of 92**
(`shots/d-light.png`).

**Mechanism, exactly.** `PaletteCard.vue:44` opens `<div class="flex items-center gap-2 min-w-0">`.
Its children, in order:

- `GripVertical` — `shrink-0` (`:49`)
- the title `<span>` — `font-display font-medium text-subheading line-clamp-2 sm:line-clamp-1`
  (`:55`). **No `shrink-0`, no `flex-1`, no `min-w-0`, no `truncate`.**
- featured `Badge` — `shrink-0` (`:64`)
- count `Badge` — `shrink-0` (`:72`)
- `<PaletteCardMeta>` (`:78`) — a **multi-root fragment** of seven items, *every one* `shrink-0`
  (`PaletteCardMeta.vue:9,18,28,39,45`)

Flexbox distributes negative free space only among items with `flex-shrink > 0`. The title is the
only such item, so it absorbs **100%** of the overflow. Its automatic minimum size would normally
floor at min-content — except `line-clamp-*` sets `overflow: hidden`, which zeroes the automatic
minimum. Result: `flex-basis` collapses to 0.

This is a hierarchy inversion with a measured magnitude: **233 px of decoration (a fork glyph, a
fork count, a version count, three tag chips) outranks 0 px of identity.** `VISUAL-CONSTITUTION §4`
assigns "palette identity" the `--type-subheading` rung — the card's protagonist. `PROPORTION-AUDIT
§5.2`: "A card has one protagonist, one identity line." The protagonist is the first thing sacrificed.

**Repro:** `probe2.mjs`; read `probe2-results.json → titleStarve`. Visual: `shots/card-featured-light.png`,
`shots/m-dark.png`, `shots/d-light.png`.

---

## 3. BLOCKER — Zero keyboard path to any card affordance except the overflow menu

Measured over a 5-card grid (`probe2-results.json → keyboard`):

```
cardCount:            5
cardsFocusable:       0
focusablesInGrid:     [Palette menu ×5]     ← the entire tab stop inventory
dragHandles:          5
dragHandlesFocusable: 0
dragHandleNamed:      0
dragHandleRect:       { w: 16, h: 16 }
titleClickHandler…:   [{tag:"SPAN", tabIndex:-1, role:null} ×5]
```

Every affordance below is **pointer-only**, unreachable by keyboard, and silent to AT:

| Affordance | Coordinate | Reachable by keyboard? |
|---|---|---|
| expand / collapse the card | `PaletteCard.vue:26` `@click="$emit('click')"` on a `tabIndex:-1` div | **no** |
| start inline rename | `PaletteCard.vue:58` `@click.stop` on a bare `<span>`, no `role`, no `tabindex` | **no** |
| reorder (drag) | `PaletteCard.vue:47-50` — an `<svg>` with `cursor-grab`, 16×16, no `aria-label`, no `tabindex` | **no** |
| every swatch in the expanded tray | `probe2 → expanded.swatchRects` = `SPAN, tabIndex:-1, name:null`, 40×40 ×5 | **no** |
| swatch add / edit / copy | reached only through `useHoverPopover` hover, or a touch tap | **no** |

`VISUAL-CONSTITUTION §5`: "every spatial action has a keyboard/numeric equivalent"; `§5.2`:
"after Space grabs, Right moves one visual position right … every move announces item and
`position of total`". `PROPORTION-AUDIT §5.5`: "A small icon/mark is either data, status, labeled
action, drag affordance, focus/selection register or removed. Decorative controls and operable
ornaments **without names** are forbidden." The grip is an operable ornament without a name — it is
PR-07's "invisible drag state", still shipping.

The 16×16 grip is also below the 24px floor the repo's own audit harness enforces
(`REPORT.md` `smallTapTargets`), and it is *not counted* there because the harness only inspects
`button/a/input`, which the grip is not.

Compounding it: the rename form has **three nameless controls** —
`probe2 → expanded.interactiveNames` returns `[{BUTTON,"Palette menu"}, {INPUT,""}, {BUTTON,""},
{BUTTON,""}]`. `PaletteRenameInput.vue:12-17` gives the `<input>` only a `placeholder`, never a
label or `aria-label`; the submit (`:18-23`) and cancel (`:24-30`) buttons carry bare Check/X icons
with no `aria-label`. This is the same defect class `REPORT.md` counts as `namelessButtons: 18`.

And there is no focus state to design, because there is nothing to focus: `§4.1` "Focus remains
visibly distinct from selection in both schemes, forced colors and reduced transparency" is
unsatisfiable on a root with `tabIndex: -1`.

**Repro:** `probe2.mjs`; `probe2-results.json → keyboard`, `→ expanded`.

---

## 4. MAJOR — The specimen is declared decoration and hidden from AT

`PaletteColorStrip.vue:2-5`:

```
<!-- W5-a11y: color strip is a decorative visual, hidden from AT -->
<div aria-hidden="true" role="presentation" …>
```

Measured (`probe4`): `stripAria: { ariaHidden: "true", role: "presentation", label: null, kids: 3,
kidTitles: [null,null,null] }`.

The color strip is the card's **only** chromatic content and the entity's whole reason to exist.
`VISUAL-CONSTITUTION §2` places swatches in the *Watercolor/data* tier — "the only ornamental
color-bearing species", i.e. **data**. `§4.2` is explicit about what that means:

> data-bearing static faces remain present as **noninteractive named list/text content** with zero
> activation/focus/drag semantics

`aria-hidden="true"` + `role="presentation"` + zero `title`s is the exact opposite of *named list
content*. A screen-reader user gets the palette name, a count badge ("3"), and nothing about the
colors. The card is a color object that refuses to say which colors it holds. The comment calls
this an a11y measure; it is an a11y erasure.

---

## 5. MAJOR — The metadata chips collide with the overflow menu

Measured (`probe2-results.json → titleStarve[1]`, 390px): `chipMenuOverlapPx: **37.06**`.

Visible in two independent frames: `shots/m-dark.png` renders the third tag as `autu**mn**` with
the `⋯` button's circle painted over the final glyphs; `shots/card-featured-light.png` shows the
same collision at a **900px** viewport — so this is not a narrow-viewport edge case.

**Mechanism:** the meta cluster (`PaletteCard.vue:44-79`) and the menu (`:82-107`) are siblings
under `justify-between gap-2`. All meta children are `shrink-0` and `PaletteCardMeta` contributes
its seven items as *direct* flex children of the cluster. When their intrinsic width exceeds the
available track, the cluster overflows its `justify-between` allocation and paints under the menu
column. Nothing clips, nothing wraps, nothing collapses — the row has no overflow design at all.

`PROPORTION-AUDIT §5.8`: "Real rendered relation wins over token intent." The rendered relation is
overlap.

---

## 6. MAJOR — The featured badge's gold shimmer renders as plain ink; a 5 s infinite animation paints nothing

`PaletteCard.vue:60-63` asserts:

> the featured badge's gold TEXT shimmer consumes the producer's ONE metal register (glass-ui
> `.gold-shimmer` — gradient-clip + metal-shimmer-sweep, PRM-gated); the local
> `golden-text-shimmer` keyframe fork is retired.

The producer recipe is real —
`node_modules/@mkbabb/glass-ui/dist/styles/utilities/base-misc.css`:

```
.gold-shimmer { background: linear-gradient(90deg, …); background-clip: text;
                -webkit-background-clip: text; color: transparent; }
.gold-shimmer { animation: metal-shimmer-sweep var(--duration-shimmer) linear infinite; }
```

But `color: transparent` **loses**. Measured on the live badge (`probe3-results.json`):

| | light | dark |
|---|---|---|
| `color` | `rgb(28, 25, 23)` | `rgb(233, 230, 226)` |
| `-webkit-text-fill-color` | `rgb(28, 25, 23)` | `rgb(233, 230, 226)` |
| `background-clip` | `text` | `text` |
| `animation` | `metal-shimmer-sweep 5s infinite` | `metal-shimmer-sweep 5s infinite` |

The text fill resolves to the ordinary foreground in **both** schemes, so the gradient is clipped
to the glyphs and then **completely occluded by opaque ink**. `shots/card-featured-light.png`
confirms it: the word "Featured" is plain near-black, not gold. The only gold thing on the badge is
the icon — and that comes from the *local scoped* rule `PaletteCard.vue:351-354`
(`.featured-badge__icon svg { stroke: var(--color-gold) }`), i.e. exactly the hand-rolled fork the
comment claims was retired.

Net: the producer register contributes **zero pixels**, the local fork does all the visible work,
and the card pays for an `infinite` 5-second gradient animation whose every frame is invisible. On
a grid of *n* featured cards that is *n* permanently-animating composited layers rendering nothing.
`§6` "Continuous … motion terminates within five seconds or exposes one persistent
keyboard-operable still/pause control" — an `infinite` decorative sweep has neither.

The design defect is not the CSS accident. It is that the badge — a *status* mark — was given the
product's most expensive visual treatment while the *identity* line (finding 2) was given none, and
a source comment records the intended outcome as landed without a rendered witness. `§8`: "A visual
claim without a tracked frame pair and a named geometry/color/timing/interaction delta is
incomplete."

---

## 7. MAJOR — The empty state is a 40 px colourless void; the "designed empty-state swatch" never reaches the strip

`shots/card-empty-dark.png` (3× crop): a card whose top 40% is an empty brown-grey band, then
`⣿ Empty (0) ⋯`.

Measured (`probe3-results.json`): `emptyStripH: 40`, `emptyStripChildren: **0**`,
`emptyBadgeText: "0"`, `emptyCardH: 100`. The strip reserves **40 of the card's 100 px — 40% of the
entity's area — for a specimen that does not exist.**

`PaletteCard.vue:220-223` names a constant for this:

```
// S.W2 W2-9: a palette with zero colors is a real, reachable state … This neutral mid-gray is the
// designed empty-state swatch, named rather than an inline magic literal.
const EMPTY_PALETTE_SWATCH = "#888";
```

Trace it: `EMPTY_PALETTE_SWATCH` → `firstColor` (`:226`) → `safeFirstColor` (`:230`) → passed only
as `:safe-first-color` to `PaletteCardSwatches` (`:145`), where it is consumed at
`PaletteCardSwatches.vue:10` for the **slug pill's ink and border colour** — a row that renders only
when `showSlug` is true and the card is expanded. It never touches `PaletteColorStrip`, which
receives `:colors="palette.colors"` (`:34`) = `[]`.

So the constant is real, the comment is confident, and the designed empty state **does not ship**.
What ships is the un-designed default: an empty flex container at `h-10`.

`VISUAL-CONSTITUTION §3` law 2: "Empty secondary content occupies at most a narrow invitation tray
(≤15% of the stage) or **disappears**." `PROPORTION-AUDIT` PR-04: "Empty/equal companion Cards and
nested housing — **REMOVE** — Collapse absent support." The strip neither collapses nor invites.

---

## 8. MAJOR — The `C` padding ladder is violated by 25%, because the card is not a Card

`VISUAL-CONSTITUTION §3.1` / `PROPORTION-AUDIT §5.12`:

> Its root anchor is always `C = --card-pad-inline = --spacing(4)`; the five Card-padding relations
> derive from that same `C` at every viewport. Its `C = --spacing(4)` padding ladder is invariant
> across viewports; only the workspace gutter responds.

Measured (`probe2-results.json → ladder`):

```
spacing:             0.25rem       →  --spacing(4) = 1rem = 16 px   (the law)
metaRowPad:          { t: 10, r: 12, b: 10, l: 12 }
glassCardPadInline:  calc(0.25rem * 6)     ← the ambient <Card>, at the size-default 6
```

| relation | law | shipped | delta |
|---|---|---|---|
| `--card-pad-inline` (`C`) | 16 px | **12 px** (`px-3`) | −4 px, −25% |
| `--card-pad-block` (`C × 1.272`) | 20.35 px | **10 px** (`py-2.5`) | −10.35 px, **−51%** |

The block padding is not merely off — it is **half** the producer relation, so the metadata row's
vertical rhythm is unrelated to the ladder rather than a step along it. Every padding in the
component is a raw Tailwind step chosen by hand: `px-3 py-2.5` (`:43`), `px-3 pt-2.5`
(`PaletteCardSwatches.vue:6`), `px-3 pb-3 pt-3` (`:22`), `px-3 pb-2.5 pt-1`
(`PaletteRenameInput.vue:2`), `px-3 py-1.5` (`ActionFeedback.vue:7`) — five different pads, none
derived from `C`.

The root cause is finding 1: because the root is a hand-rolled `div`, `data-size="sm"` never
applies and `--card-pad-inline` is never in scope. The law is satisfiable by *one prop*
(`<Card size="sm">`) and is instead re-implemented, wrongly, five times.

---

## 9. MAJOR — The six-file decomposition is cosmetic. This is a god module distributed across six files.

The seat's charge is to judge the split, not the file. The split is not along real seams.

**Interface census** (declared members, not lines):

| file | props | emits | expose | owns reactive state? | earns its seam? |
|---|---|---|---|---|---|
| `PaletteCard.vue` | 10 | **18** | 1 | yes | — (it *is* the module) |
| `PaletteCardSwatches.vue` | 8 | 8 | 0 | **no** — `defineProps`/`defineEmits` only | **no** |
| `PaletteCardMeta.vue` | 1 | 1 | 0 | **no** — `defineProps`/`defineEmits` only | **no** |
| `PaletteCardMenu.vue` | 5 | 2 | 0 | 2 `computed` (`apiOffline`, `isPublic`) | partly |
| `PaletteRenameInput.vue` | 1 | 2 | 0 | `localName` + focus/select lifecycle | **yes** |
| `ActionFeedback.vue` | 4 | 1 | 0 | auto-dismiss timer | **yes** |

**63 cross-file interface members for 876 lines** — one negotiated member per 14 lines of code.

`PaletteCardSwatches` is the clearest case: **16 of 16 members are pure pass-through.** It receives
`openPopoverIndex`, `canHover`, `floatingStyle` and re-emits `hover`, `leave`, `cancelLeave`,
`popoverTouch` — every one of which is `useHoverPopover` state that lives in the *parent*
(`PaletteCard.vue:246-255`). Extracting the template did not move the state, the coupling, or the
decision; it converted five lines of direct access into a sixteen-member contract. That is
`feedback_kiss_no_contrivance` — a wrapper component that earns nothing.

`PaletteCardMeta` is worse than neutral: **it is the mechanical cause of finding 2.** It renders a
*multi-root fragment* of seven `shrink-0` items directly into the parent's flex row, so the "lift"
moved the markup out of `PaletteCard.vue` while leaving every chip a direct flex sibling competing
with the title. The comment at `PaletteCardMeta.vue:2-4` celebrates this as "the T.W5 PP-8 **cap
cure**" — i.e. the extraction's stated purpose was to get `PaletteCard.vue` under a line cap. A
line cap is a metric, not a seam. Optimising for it produced a file boundary that hides the layout
bug instead of containing it: nothing in `PaletteCardMeta.vue` reveals that it is fighting the title
for width, and nothing in `PaletteCard.vue:78` reveals that one child expands to seven.

Two further symptoms of the same non-seam:

- **The imperative escape hatch.** `PaletteCard.vue:244` `defineExpose({ showFeedback })`, reached
  from consumers as `cardRefs[palette.slug]?.showFeedback(msg, "error")`
  (`BrowsePane.vue:230,239,249,264`; `PalettesPane.vue:207`) through a template ref registered with
  an explicit `any` cast: `:ref="(el: any) => el && (cardRefs[palette.slug] = el)"`
  (`BrowsePane.vue:94`, `PalettesPane.vue:84`). When a component's props/emits interface is already
  28 members wide and the parent still has to reach *inside* it, the boundary is in the wrong place.
- **The retrofit scar.** `PaletteCard.vue:40` opens the aside-layout body wrapper, `:159` closes it
  as `</div><!-- /card body -->`, and lines 42-158 sit at the wrong indent level throughout — the
  template's structure no longer matches its indentation, because a second layout mode
  (`layout: "aside"`) was threaded through an existing tree rather than composed.

**Verdict on the decomposition:** 2 of 5 siblings earn a seam (`PaletteRenameInput`,
`ActionFeedback` — both own real local state and a lifecycle). 1 partly does (`PaletteCardMenu`).
2 earn nothing and one of those two *causes* the component's worst rendered defect. The split
reduced the largest file's line count; it did not reduce coupling, did not create a layout boundary,
and did not give any sibling authority over a decision. That is the definition of a god module
distributed across six files.

---

## 10. MAJOR — Failure truth exists only as a 2.5-second self-destructing chip

`BrowsePane.vue:239` pushes an **error** into the card:

```
card.showFeedback(result.message, "error");
```

`ActionFeedback.vue:23-31,37-47` gives it `autoDismissMs = 2500` and a `setTimeout` that emits
`update:visible → false`. There is no other record. A publish that fails, a save that fails, a
delete that fails — each states its failure for 2.5 seconds inside a card and then erases it.

`VISUAL-CONSTITUTION §5`: "Persistent operation state stays with the entity/workspace. A transient
flourish may celebrate success but **never carries the only truth**." `§4.1`: "Selected, failed,
pending, withdrawn and disabled states are never color-only. Role, accessible name, state/value and
associated error/status are explicit." The chip has no `role`, no `aria-live`, and no durable
counterpart — a screen-reader user is not told at all. `PROPORTION-AUDIT` PR-08:
"Pending/failure/export/recovery truth only transient — **ADD-AFFORDANCE**." Unclosed.

Secondary: the chip mounts *inside* the card's flow between the meta row and the swatch tray
(`PaletteCard.vue:123-128`) with `--vj-celebrate-expanded: 2.5rem` (`:53-57`), so the card grows
40 px, displaces every card below it in the grid, and shrinks back 2.5 s later. Transient status
should not be a layout event.

---

## 11. MAJOR — The expand animation animates `height` and fires an unguarded smooth scroll under reduced motion

`useHeightTransition.ts` — wired at `PaletteCard.vue:132-137`:

- `:24-38` animates **`height`** from `0` to `scrollHeight`. Height is a layout property; every
  frame of a 350 ms expand triggers layout for a subtree that may hold up to 50 swatches
  (`PALETTE-CONTRACT §3`: "exactly 1–50 `CanonicalNamedColor` atoms").
- `:47` — `onAfterEnter` calls, **unconditionally**:
  ```
  htmlEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  ```

The app's global reduced-motion guard (`demo/styles/animations.css:184-194`) sets
`transition-duration: 0.01ms !important; scroll-behavior: auto !important`. That guard neutralises
the inline `style.transition` string — but it **cannot** reach an explicit `behavior: "smooth"`
argument: per CSSOM-View, the `behavior` member of `ScrollIntoViewOptions` overrides the element's
computed `scroll-behavior`. So under `prefers-reduced-motion: reduce`, expanding a palette card
still runs a smooth scroll animation.

`VISUAL-CONSTITUTION §6`: "Reduced motion resolves directly to the final geometry and stable
chromatic state." It does not.

The file's own header comment is the second half of the finding:

> bespoke height-transition durations (**no exact glass-ui canon match** — 350ms sits between
> `--duration-normal` 300ms and `--duration-slow` 450ms; 250ms sits between `--duration-fast` 200ms
> and `--duration-normal` 300ms). Both values were tuned by hand at B-tranche…

Two durations, documented as off-ladder, kept anyway. Add `autoDismissMs = 2500`
(`ActionFeedback.vue:30`) and the raw geometry literals `--vj-morph-y: -0.5rem`,
`--vj-morph-expanded: 3rem` (`PaletteCard.vue:358-363`), `--vj-celebrate-expanded: 2.5rem`
(`ActionFeedback.vue:53-57`): the component's motion vocabulary is five hand-chosen numbers.

*(A note on the brief: it names `--animation-slide-sm/md/lg` as the tokenization target. Those
tokens no longer exist — `grep -rn -- "--animation-slide" demo/styles/*.css` returns nothing; the
live vocabulary is the `vj-*` families in `demo/styles/animations.css` plus glass-ui `--duration-*`.
The brief's token names are stale; the un-tokenized-duration finding stands on the source comment.)*

**Measured side-observation, labelled as a hypothesis:** counting elements inside
`.palette-card-grid` with a live animation or non-zero transition duration gives **6** at
`no-preference` and **155** under `reduce` (`probe2-results.json → motion_no-preference.animatedInGrid`
vs `motion_reduce.animatedInGrid`), because the global guard rewrites `transition-duration` to
`0.01ms` on `*, *::before, *::after` — a non-zero value my predicate counts. I have **not** proven a
perceptible increase in motion, only that the guard's blanket rewrite makes "reduced motion" the
state in which nearly every node in the grid carries a declared transition. Treat the 25× number as
an instrumentation artefact worth one wave's attention, not as a rendered defect.

---

## 12. MINOR — Direction is physical, so the card cannot mirror

- `PaletteCard.vue:36` — `layout === 'aside' ? 'rounded-l-card' : 'rounded-t-card'`. `rounded-l-*`
  is **physical left**. `grep -rn "rounded-s-card" demo` returns nothing, so the logical form is
  never used anywhere. In RTL the aside strip sits on the right and rounds its left corners.
- `PaletteCardSwatches.vue:31` — `transform: 'translateX(-50%)'` on the hover popover: physical X,
  hard-coded, so the popover offsets the wrong way when the inline axis flips.

`VISUAL-CONSTITUTION §6.1`: "chrome, navigation and layout — logical inline/block direction follows
the document."

`shots/d-rtl.png` shows what a forced `dir="rtl"` produces on this route: the Palettes pane and the
Picker pane overlap and occlude each other, and the Lab readout mirrors to `20.0 ,88.8 ,%92.0`
(against `§5.2` "numeric/scientific sign never mirrors" and `§6.1` LTR-isolation of values). **I am
labelling the pane overlap a hypothesis, not a PaletteCard finding** — it is route-composition
geometry, and in `probe2` the app reset `documentElement.dir` back to `ltr`
(`probe2-results.json → rtl.dir: "ltr"`), so I could not obtain a clean RTL measurement of the card
itself. The two physical-property coordinates above are CONFIRMED at file:line regardless.

---

## 13. MINOR — `cursor: pointer` is unconditional: two of five call sites render a lying affordance

`PaletteCard.vue:19` applies `cursor-pointer` to the root always, and `:26` always emits `click`.

| call site | click bound? | rendered cursor |
|---|---|---|
| `PalettesPane.vue:84` | `@click="pm.toggleExpand(palette.id)"` | pointer ✓ honest |
| `BrowsePane.vue:96` | `@click="pm.toggleExpand(palette.slug)"` | pointer ✓ honest |
| `AdminUsersPanel.vue:147` | `@click="emit('toggleExpand', …)"` | pointer ✓ honest |
| `ExtractWorkbench.vue:151` | **`@click="() => {}"`** | pointer ✗ **no-op** |
| `MixSourceSelector.vue:264` | **nothing bound** | pointer ✗ **dead** |

Two of five sites present a hand cursor over a surface with no behaviour. The `@click="() => {}"`
in Extract is the tell: a consumer wrote an explicit no-op to acknowledge an affordance it did not
want. `PROPORTION-AUDIT §5.6`: "Add affordance when the surviving action/state is otherwise
undiscoverable"; §5.5 forbids "decorative controls". A pointer cursor that does nothing is the
inverse defect — an advertised action that does not exist.

---

## 14. MINOR — `swatchClass` is a sanctioned per-instance style override

`PaletteCard.vue:194-197` declares
`swatchClass?: string` with default `"w-9 h-9 sm:w-10 sm:h-10"`, and
`ExtractWorkbench.vue:149` passes `swatch-class="w-12 h-12 sm:w-14 sm:h-14"`. One species, two
sizes, chosen by the consumer.

Owner edict 5 — "style at the shadcn/glass root component level, never per-instance overrides" — is
not merely violated in passing; the prop *exists in order to* permit the override. `PROPORTION-AUDIT
§5.7`: "Visual glyph size, operable target size and layout reservation are separate quantities."
Passing a Tailwind size string conflates all three.

`layout: "default" | "aside"` (`:192-193`) is the same defect one level up: two compositions in one
file, selected by a consumer string, with the aside arm reaching for a physical radius (finding 12).

---

## 15. MINOR — `text-micro` at 11 px is off the closed type matrix

`VISUAL-CONSTITUTION §4` states its matrix "is **closed** across all eighteen compositions". Its
smallest non-mono rung is `text-small`. Measured (`probe4`):

```
text-micro  →  11 px, "Plus Jakarta Sans", rgb(112, 89, 66)
--type-micro:      0.6875rem
--type-small:      clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)   ← 14 px floor
--type-subheading: 1.272rem
```

`PaletteCardMeta.vue:9,18,28,39` uses `text-micro` for the fork indicator, fork count, version count
and tag chips — **11 px, 3 px below the matrix floor** — and `PaletteCardMenu.vue:101` uses
`text-caption`, also absent from the matrix. `grep -rn "text-micro" demo --include="*.vue" | wc -l`
= **26**, so this is a family, not a one-off.

Credit where due: the title measures **Fraunces, 20.352 px, weight 500, line-height 30.53 px**, and
`--type-subheading` resolves to `1.272rem = 20.352 px` — the identity line is on the correct rung in
the correct family. `§4` compliance for the protagonist is real (which makes finding 2 sharper: the
right type on the right rung, rendered at zero width).

---

## 16. MINOR — Dead `group` class

`PaletteCard.vue:19` sets Tailwind's `group` on the root.
`grep -rn "group-hover\|group-focus\|group-active" demo/palettes/browser/card/` returns **nothing**.
The root declares "my descendants style off my interaction state" and no descendant does. It is a
hover-choreography hook left behind by the cartoon-register refactor — dead surface area on the one
class list that the whole species inherits.

---

## 17. MINOR — No forced-colors treatment; the card's only boundary is a 12%-alpha border

Measured under emulated `forced-colors: active` vs `none`
(`probe2-results.json → cardFC_active` vs `cardFC_none`) — **byte-identical**:

```
border:  oklab(0.216129 0.003491 0.005182 / 0.12) 2px
bg:      oklab(0.913299 0.005463 0.013024)
shadow:  oklab(0.28 0.01676 0.024882 / 0.32) -3px 3px 0 0, …
```

`grep -rn "forced-colors" demo/palettes` returns zero rules for this component; the app's only
policy lives at `demo/styles/foundation.css:665-678` and does not name the palette card. So the
species has no forced-colors design: its sole boundary is a **12%-alpha** border and three
translucent casters — every one an author colour that a forced-colors user is entitled to have
replaced. `§4.1`: "Text, focus, boundaries and state meet their rendered contrast on the actual
material tier; a token name is not evidence." `§4.2`: selected/focus states must show "a nonzero
selected-state delta in monochrome and forced colors."

*Scope caveat, honestly:* WebKit's `forcedColors` emulation is partial, so I am claiming the
**absence of a designed treatment** (grep-verifiable) and the **12% alpha boundary** (measured), not
a specific rendering failure in a real high-contrast OS mode.

---

## 18. MINOR — The fourth tag vanishes with no overflow affordance

`PaletteCardMeta.vue:37` — `v-for="tag in (palette.tags ?? []).slice(0, 3)"`. A palette with four
tags renders three; the fourth is silently dropped. No `+1`, no title attribute, no disclosure.
`PROPORTION-AUDIT §5.6`: "Subtraction precedes explanation" — but silent truncation is neither
subtraction nor explanation. Either tags are not card-surface data, or the overflow has to be
designed. Currently a user cannot tell that a tag exists.

---

## 19. INFO — `withDefaults` in 2 of 6 files (pre-3.5 idiom)

Owner edict 7 asks for idiomatic Vue 3.5. Four files comply — `PaletteCardMeta.vue:61`,
`PaletteCardMenu.vue:206`, `PaletteRenameInput.vue:39` use reactive props destructure, and
`PaletteRenameInput.vue:48` uses `useTemplateRef`. Two do not: `PaletteCard.vue:182-198` and
`ActionFeedback.vue:23-31` use `withDefaults(defineProps<…>(), {…})` and then `props.x` throughout.
Vue 3.5 retires `withDefaults` in favour of destructure defaults. Non-load-bearing, but it means
the module the split was supposed to modernise is the one file that was not modernised.

**Compliance credit:** `verbatimModuleSyntax` (edict 8) is fully satisfied across all six files —
`import type { Palette, PaletteColor }` (`PaletteCard.vue:168`), `type PaletteKind` inline
(`:169`), `import type { PaletteColor }` (`PaletteCardSwatches.vue:72`), `import type { Palette }`
(`PaletteCardMeta.vue:59`, `PaletteCardMenu.vue:177-178`). No violations found.

---

## Negative proof — what is actually right

A challenge seat that finds only faults is not credible. Verified sound:

1. **Identity typography.** Fraunces / `--type-subheading` (1.272rem = 20.352 px) / weight 500 —
   exactly `§4`'s "palette identity" row, non-italic per T.W4-6. Measured across all 9 matrices.
2. **`verbatimModuleSyntax`.** Zero violations in 876 lines (see finding 19).
3. **Zero page errors.** `probe-results.json` — `errors: []` in all 9 matrices, including
   forced-colors, RTL, 200% zoom and 320 px. No console or page error is attributable to this
   component.
4. **No horizontal overflow.** `overflowX: 0` at 1440 / 390 / 320 px and at 200% zoom; the grid is
   `grid-cols-1` and the card tracks the container (462 → 324 → 254 px).
5. **The strip carries the population story once.** `PaletteColorStrip` sizes segments from
   `PaletteColor.weight`, so extracted palettes tell their population share in the one strip rather
   than a duplicate twin — the S.W5-6 subtraction held.
6. **`[inert]` count is 0.** `probe-results.json → inertCount: 0` in every matrix, satisfying
   `§3.1`'s "palette-Card `[inert]` count is `0`".
7. **The menu's degraded state is named in-register.** `PaletteCardMenu.vue:35-39,56-59` disables
   the doomed action and annotates `offline` / `public` / `private` in the K-INV5 small-caps
   register rather than a toast — genuinely correct `§4.1` state semantics, and the one place in the
   component where a state was designed rather than defaulted.
8. **The shimmer is PRM-gated at the producer.**
   `glass-ui/dist/styles/utilities/metal.css` wraps `metal-shimmer-sweep` in
   `@media (prefers-reduced-motion: no-preference)`. Finding 6 is about occlusion, not about the
   gate; the gate is correct.

---

## The cure — architectural transposition, not patch

Every finding above except 12 and 15 dissolves in one move, and that move is already written down.
`VISUAL-CONSTITUTION §3.1`/`§5` and `PROPORTION-AUDIT §5.12` do not merely forbid the current
design; they **specify the replacement**:

> The Card/article root is a noninteractive container … Its one native named
> `<button type="button" aria-pressed="false|true">` child spans specimen/identity and alone owns
> activation, visible selection and focus … Full detail, rename/lifecycle/export actions and
> durable operation state live in the selected inspector.

Concretely:

1. **Root becomes `<Card size="sm" material="content" tier="quiet" surface="opaque" :shadow="false"
   :grain="false" specular="off">`.** This deletes `cartoon-surface`, `.cartoon-cast`,
   `useLiquidPress`, `border-card-edge`, `bg-well`, `group`, `cursor-pointer`, `rounded-card`, all
   three casters, the five hand-rolled pads, and the entire `C`-ladder finding — because `C` arrives
   from the producer. **Findings 1, 8, 16, 17.**
2. **One `<button type="button" aria-pressed>` spans the strip + identity line.** This is the single
   activation, selection and focus seat. It deletes the `role="article"` click, the `tabIndex:-1`
   dead root, the `@click="()=>{}"` no-op, the dead pointer cursor, and the `showFeedback` ref
   reach-in. **Findings 1, 3, 10, 13.**
3. **The strip becomes named noninteractive data** — drop `aria-hidden`/`role="presentation"`, give
   each segment its colour as text/`title`, and let the seat's accessible name carry
   `"<name>, N colours"`. **Finding 4.**
4. **The identity line gets its own row, `flex-1 min-w-0` with the chips demoted below or behind a
   count.** The meta cluster stops being a peer of the title. This is the whole of **findings 2, 5,
   18** and the reason `PaletteCardMeta` should not exist as a bare fragment of `shrink-0` siblings.
5. **Expand, rename, the 20-action menu, export and operation state move to the selected
   inspector** (`§3.1` Browse/Library rows already reserve a 33.33–36% inspector for exactly this).
   This deletes `PaletteCardSwatches` (16 pass-through members), `PaletteCardMenu`,
   `PaletteRenameInput`, `ActionFeedback`, `useHoverPopover`, `useHeightTransition`, 14 of the 18
   emits, `defineExpose`, and the `any`-cast `cardRefs` maps in both panes. **Findings 1, 6*, 7, 9,
   10, 11, 14.**
6. **What remains is a card**: strip + name + count + one pressed seat + an optional named reorder
   button. Roughly 60 lines in one file, with `PaletteColorStrip` as its only child. The six-file
   folder collapses because the six files were never six responsibilities — they were one
   responsibility cut along line-count boundaries.

The empty state (**finding 7**) still needs a real decision the canon does not make for you: either
the strip collapses to zero height when `colors.length === 0`, or `EMPTY_PALETTE_SWATCH` is actually
painted. It cannot stay a 40 px void. And **finding 12** (logical properties) and **finding 15**
(the `text-micro` rung) are independent of the transposition and must be ruled separately —
`text-micro` in particular is a 26-site family, so the ruling belongs to the type matrix, not to
this card.

*\*Finding 6's badge occlusion survives the transposition if the featured badge stays on the card;
the `color: transparent` loss must be fixed at the Badge↔`.gold-shimmer` boundary in glass-ui (owner
edict 4: the fix belongs in the producer, not in a scoped consumer rule), or the badge moves to the
inspector with everything else.*

---

## Register

| ID | Severity | Defect | Primary evidence |
|---|---|---|---|
| D-1 | BLOCKER | Commits all six `§5` prohibitions + wrong Card tuple + cartoon register + not a `<Card>` | `PaletteCard.vue:19,22,26,30,112,123,131,263`; `probe-results.json → d-light.rootStyles` |
| D-2 | BLOCKER | Palette identity renders at **0 px**; card does not name its entity | `probe2 → titleStarve[1].titleClientW: 0`; `probe3 → cardTextContent`; `shots/card-featured-light.png` |
| D-3 | BLOCKER | Zero keyboard path to expand/rename/drag/swatches; 3 nameless rename controls | `probe2 → keyboard` (`cardsFocusable: 0`), `→ expanded.interactiveNames` |
| D-4 | MAJOR | Specimen strip is `aria-hidden="true" role="presentation"` | `PaletteColorStrip.vue:2-5`; `probe4 → stripAria` |
| D-5 | MAJOR | Tag chip overlaps the overflow menu by **37 px** at 390 px and at 900 px | `probe2 → titleStarve[1].chipMenuOverlapPx: 37.06`; `shots/m-dark.png` |
| D-6 | MAJOR | Gold shimmer occluded by opaque text fill; 5 s `infinite` animation paints nothing | `probe3 → light/dark.textFill`; `shots/card-featured-light.png` |
| D-7 | MAJOR | Empty palette = 40 px colourless void (40% of card); `EMPTY_PALETTE_SWATCH` never reaches the strip | `probe3 → emptyStripChildren: 0`; `PaletteCard.vue:223,226,230,145` |
| D-8 | MAJOR | `C` ladder: 12 px inline (−25%) / 10 px block (−51%) vs `--spacing(4)` | `probe2 → ladder.metaRowPad`; glass-ui `card/styles.css:1` |
| D-9 | MAJOR | Decomposition cosmetic: 63 interface members / 876 lines; 2 of 5 siblings own no state; `PaletteCardMeta` *causes* D-2 | `PaletteCardSwatches.vue:75-95`; `PaletteCardMeta.vue:2-4,9,18,28,39` |
| D-10 | MAJOR | Failure truth = 2.5 s self-destructing chip pushed by `any`-cast ref | `ActionFeedback.vue:30,44`; `BrowsePane.vue:94,239` |
| D-11 | MAJOR | `scrollIntoView({behavior:"smooth"})` unguarded under PRM; animates `height` | `useHeightTransition.ts:24-38,47`; `animations.css:184-194` |
| D-12 | MINOR | Physical `rounded-l-card` + `translateX(-50%)`; no logical properties anywhere | `PaletteCard.vue:36`; `PaletteCardSwatches.vue:31` |
| D-13 | MINOR | Unconditional `cursor-pointer`: 2 of 5 call sites are dead affordances | `PaletteCard.vue:19`; `ExtractWorkbench.vue:151`; `MixSourceSelector.vue:264` |
| D-14 | MINOR | `swatchClass` + `layout` props are sanctioned per-instance overrides | `PaletteCard.vue:192-197`; `ExtractWorkbench.vue:148-149` |
| D-15 | MINOR | `text-micro` 11 px is 3 px below the closed `§4` matrix floor; 26 sites | `probe4 → micro/typeRungs`; `PaletteCardMeta.vue:9,18,28,39` |
| D-16 | MINOR | Dead `group` class — zero `group-*` consumers in the tree | `PaletteCard.vue:19`; grep = 0 |
| D-17 | MINOR | No forced-colors design; sole boundary is a 12%-alpha border | `probe2 → cardFC_active ≡ cardFC_none` |
| D-18 | MINOR | 4th tag silently dropped by `.slice(0, 3)`, no overflow affordance | `PaletteCardMeta.vue:37` |
| D-19 | INFO | `withDefaults` (pre-3.5) in `PaletteCard.vue` + `ActionFeedback.vue` | `PaletteCard.vue:182`; `ActionFeedback.vue:23` |
| D-20 | INFO | Off-ladder durations 350 / 250 / 2500 ms, self-documented as off-canon | `useHeightTransition.ts:1-8`; `ActionFeedback.vue:30` |

**Strongest defect: D-2.** A palette card that renders its palette's name at zero pixels is not a
styling defect or an accessibility defect — it is the component failing at the one job its existence
justifies, and it survived because the tranche's visual audit photographed an empty list.

---

### Artifacts

- `docs/tranches/V/megatranche/audit/components/PaletteCard/probe.mjs` · `probe-results.json`
- `docs/tranches/V/megatranche/audit/components/PaletteCard/probe2.mjs` · `probe2-results.json`
- `docs/tranches/V/megatranche/audit/components/PaletteCard/probe3.mjs` · `probe4.mjs` · `probe3-results.json`
- `docs/tranches/V/megatranche/audit/components/PaletteCard/shots/` — `d-light` `d-dark` `m-light`
  `m-dark` `d-forced` `d-rtl` `d-rtl2` `d-prm` `d-zoom200` `m320` `d-expanded`
  `card-featured-{light,dark}` `card-empty-{light,dark}`

No source file was edited. All writes are confined to
`docs/tranches/V/megatranche/audit/components/PaletteCard/`.

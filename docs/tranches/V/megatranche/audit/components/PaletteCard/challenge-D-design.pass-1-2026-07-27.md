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

---
---

# ADDENDUM — second CHALLENGE-D seat: corroboration, three corrections, six new defects

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. Spawned with
an explicit Opus 5 declaration; the seat is declared, not inherited.

## Why this addendum exists

I was spawned as CHALLENGE-D for `PaletteCard` and investigated independently, without reading the
body above until my probes were complete. I found the file already written. I have **not** rewritten
it — the analysis above is sound and my independent work converges on D-1, D-2, D-3, D-7, D-8, D-9
and D-11 by separate measurement, which is worth more as corroboration than as a second draft.

What follows is only the **delta**: three claims above that my measurements falsify, and six defects
my probes found that the body does not contain — including the one the **owner personally marked**.

My probe was a live WebKit session against `http://localhost:9000` with a seeded `color-palettes`
`localStorage` fixture (5 palettes: normal, 92-glyph name + `tier:"featured"` + 5 tags + fork/version
counts, zero-colour, 24-colour). Every number below is a `getComputedStyle`/`getBoundingClientRect`
reading from that session or a static grep, both pasted.

---

## Independent corroboration (measured separately, same verdict)

| Body finding | My independent measurement |
|---|---|
| D-2 title 0 px | `titleW: 0` at **462 px card / 1440 px desktop** and again at 324 px card / 390 px mobile. Not a narrow-viewport effect. Sibling `shrink-0` count in the identity row: **9** |
| D-3 no keyboard path | `card.focus()` → `document.activeElement === card` is **false**; `tabIndex: -1`, no `tabindex` attribute. Interactive children of a collapsed card: **exactly 1** (`"Palette menu"`, 36×36) |
| D-8 `C` ladder | `getComputedStyle(metaRow).padding` → **`"10px 12px"`** vs the ruled `--spacing(4)` = 16 px |
| D-7 empty void | `stripSegments: 0`, `cardH: 100` — identical height to a populated card, with a 40 px transparent band |
| D-9 decomposition | 59 declared props+emits members by AST count across 876 lines; `PaletteCardSwatches` = 8 props / 8 emits / **zero** reactive state |
| D-11 PRM | confirmed: the global guard's `scroll-behavior: auto !important` cannot reach an explicit `behavior:"smooth"` argument (CSSOM-View: the option overrides the computed property) |

---

## CORRECTION 1 (to §1 and D-1) — the `.cartoon-cast` is not a "fourth lagging caster". It is dead markup that renders nothing.

§1 states the card carries *"a fourth lagging `.cartoon-cast` child (`PaletteCard.vue:30`) driven by
`useLiquidPress` (`:263-267`)"*, and counts it as an aggravating caster. **Measured, it is inert.**

`getComputedStyle` on the actual `<span class="cartoon-cast">`:

```
position:      static      (glass-ui's rule specifies absolute)
display:       inline      (specifies a positioned box)
inset:         auto        (specifies inset: 0)
border-radius: 0px         (specifies border-radius: inherit)
box-shadow:    none        (specifies var(--shadow-cartoon-md))
getBoundingClientRect(): { width: 0, height: 0 }
```

A 0×0 unstyled inline span. **Two independent causes, either one sufficient:**

**(a) The stylesheet is never loaded.** glass-ui 7.0.0 defines `.cartoon-cast` in
`dist/styles/glass/glass-atom.css`. Nothing imports it:

```
$ grep -rl "glass-atom" node_modules/@mkbabb/glass-ui/dist/styles/
node_modules/@mkbabb/glass-ui/dist/styles/glass/glass-atom.css      ← only the file itself
```

`dist/styles/index.css` imports 30 sheets and `glass.css` imports 18 more (`material`, `ladder`,
`rim`, `surfaces`, `glass-capsule`, `liquid-enter`, `squircle`, …). `glass-atom.css` is in neither
list. It is an orphan in the producer's own graph.

*(There is a second `.cartoon-cast` rule — `.liquid-enter.is-cel > .cartoon-cast` in
`liquid-enter.css`, which **is** imported. It requires an ancestor with `.liquid-enter.is-cel`. The
live root class list is `"group rounded-card cartoon-surface border-card-edge bg-well
cursor-pointer"` — neither class present. So that rule does not apply either.)*

**(b) The press variable does not match.** glass-ui's cast reads `--cartoon-press-t`:

```css
.cartoon-cast {
  --cast-travel: calc(6px * var(--motion-weight) * var(--cartoon-press-t));
  --cast-spread: calc(1 + 0.18 * var(--motion-weight) * var(--cartoon-press-t));
}
```

`PaletteCard.vue:263-267` writes a **different** name:

```ts
const press = useLiquidPress({ pressVar: "--card-press-t", … });
```

Live inline style on the root: `--card-press-t: 0.0000; --flex-vel: 0.0000;` — and
`--cartoon-press-t` computes to `0`, its registered `@property` initial value
(`dist/styles/tokens/property-regs.css`). So `--cast-travel: 0px`, `--cast-spread: 1`, measured. The
caster could not travel even if its stylesheet loaded. `pressVar` is free-form (default `"--press-t"`
per `useLiquidPress.d.ts:19-25`), so nothing type-checks this.

### The larger defect this exposes: the cartoon register's motion died in the Glass 6→7 adoption and the comments still describe it as alive

`PaletteCard.vue:7-15` — a 9-line comment — asserts:

> the `cartoon-surface` atom owns the hover/press choreography (translate/scale on
> `--ease-cartoon-punch` @ `--duration-normal`, shadow bezier md→lg, `:active` squash, 2px border) +
> the lagging `.cartoon-cast` child below.

The utility as shipped in glass-ui 7.0.0 is **three declarations**:

```css
@utility cartoon-surface { position: relative; border-width: 2px; box-shadow: var(--shadow-cartoon-md); }
```

No `transition`. No `:hover`. No `:active`. No `md→lg` shadow. Grepping every selector that carries
`--ease-cartoon-punch` returns `glass-capsule.css`, `glass-atom.css`, `glass-chip.css`,
`liquid-enter.css`, `btn.css` — **`.cartoon-surface` and `.card` are not among them.**

The producer says so itself, in the `Card` prop doc
(`dist/components/card/Card.vue.d.ts:11-12`):

```ts
/** Static Memphis edge treatment; it does not add command behavior. */
cartoon?: boolean;
```

So: of the five behaviours the comment claims, **one** ships (the 2px border). `demo/DESIGN.md:246`
records the row as `landed`:

```
| Card cartoon (R4) | `PaletteCard.vue` root | producer `cartoon-surface` register: translate/scale
  `--ease-cartoon-punch` @ `--duration-normal`, shadow `--ease-standard`, press squash + lagging
  caster | landed |
```

This is a **silent regression from the W44 Glass 7.0.0 whole-adoption** with a canon row still
asserting it landed — exactly the class of carry the CARRY-LEDGER exists to catch. The body's §1
"canon provenance" note treats `DESIGN.md:246` as a live T-vs-V *authority conflict*. It is worse
than a conflict: **the T row no longer describes anything that renders**, so retiring it costs
nothing and the conflict was never real.

This also sharpens the body's cure step 1. Deleting `cartoon-surface`/`.cartoon-cast`/`useLiquidPress`
is not a trade of motion for compliance — the motion is already gone. **Nothing is lost, so owner
edict 6 ("animations are never deleted, only moved or tokenized") is not engaged by the removal.**
It was engaged, and violated, by the adoption that killed it without a witness.

**Severity: MAJOR.** New ID **D-21**.

---

## CORRECTION 2 (to Negative proof #3) — there IS a live crash attributable to this component

Negative proof #3 claims *"Zero page errors … No console or page error is attributable to this
component."* Captured in my session
(`evidence/seat-D2-console-hoverpopover-crash.log`, verbatim):

```
TypeError: Cannot read properties of null (reading 'getBoundingClientRect')
    at positionPanel (…/demo/palettes/browser/card/composables/useHoverPopover.ts:18:25)
    at …/demo/palettes/browser/card/composables/useHoverPopover.ts:26:18
```

Both frames are PaletteCard's own composable. Line 18 is `swatchEl.getBoundingClientRect()`; line 26
is the call site:

```ts
function onHover(index: number, e: PointerEvent) {
    if (!canHover.value || e.pointerType === "touch") return;
    cancelLeave();
    openIndex.value = index;
    nextTick(() => positionPanel(e.currentTarget as Element));   // line 26
}
```

**Mechanism:** `PointerEvent.currentTarget` is reset to `null` when dispatch completes. `nextTick`
defers the dereference past the listener's return, so whether `currentTarget` survives depends on
where the microtask checkpoint falls — hence an *intermittent* null deref rather than a permanent
one. The `as Element` cast is what allows it to compile: it asserts away exactly the `null` that
arrives. This is `PaletteCardSwatches`' hover-popover positioning, i.e. the hovered state of the
expanded tray silently fails.

The correct read of the negative proof is narrower and still true: **no error at rest**. The body's
probes captured a card grid at rest and in expand; they did not hover a swatch. Negative proof #3
should be scoped to "no page error in the rest and expand states", not to the component.

**Severity: MAJOR.** New ID **D-22**.

---

## CORRECTION 3 (to D-3) — the accessible swatch path exists and is switched off by input modality

D-3 records swatch add/edit/copy as keyboard-unreachable. True, but the mechanism is sharper and
worse than "unreachable". `SwatchHoverMenu.vue` ships **two implementations of one popover**, chosen
by a media query:

```vue
<!-- Touch: native Popover click toggle -->
<Popover v-if="!canHover" …>            ← reka-ui: focusable, keyboard-operable, auto-positioned
…
<!-- Hover: manually positioned floating panel -->
<template v-else>
  <Teleport to="body">
    <div v-if="open" class="floating-panel" :style="floatingStyle" aria-hidden="true" …>
```

`canHover` is `useBreakpoint("(hover: hover)")` (`useHoverPopover.ts:11-14`). So the branch is
selected by *pointer capability*:

| user | branch | swatch actions reachable by keyboard? |
|---|---|---|
| touch device (no hover) | reka-ui `Popover` | **yes** |
| desktop with a mouse | `aria-hidden` Teleport | **no** |

**The accessible implementation is delivered only to users who have a pointer, and withheld from the
one population that needs it — a keyboard-only desktop user.** The component's own comment states the
consequence and ships anyway:

> W5-a11y: hover-only panel is keyboard-inaccessible — hidden from AT. The reka-ui Popover (touch
> path) is the accessible route.

Two further consequences the body does not draw:

- **Owner edict 2 (no dual paths) is violated structurally**, not incidentally: one affordance, two
  implementations, one accessible and one not, with a shared `PANEL_LAYOUT` constant added
  specifically so "the two paths cannot drift" — a comment that concedes the duplication.
- The hand-rolled branch is where D-22's crash lives. The reka-ui branch has no such bug. The
  hand-rolled panel also computes `top`/`left` **once** on hover with a magic `offsetY = -42`
  (`useHoverPopover.ts:21`), so it does not reposition on scroll or resize and does not flip at
  viewport edges — all of which reka-ui's floating layer handles.

This strengthens the body's cure step 5: deleting `useHoverPopover` deletes a crash, a magic number,
and an accessibility fork — not merely a wrapper.

**Severity: MAJOR.** New ID **D-23**.

---

## NEW — D-24 (MAJOR): a consumer nests PaletteCard's interactive content inside a `<button>`

`MixSourceSelector.vue:246-268`:

```vue
<!-- W5-a11y: native <button> for keyboard reach + aria-pressed for selection state -->
<button v-for="palette in savedPalettes" type="button"
        :aria-pressed="isPaletteSelected(palette.slug)" …
        class="… rounded-card w-full text-left focus-visible:ring-2 focus-visible:ring-ring/40
               ring-2 ring-primary ring-offset-2 ring-offset-background"
        @click="togglePalette(palette)">
    <PaletteCard :palette="palette" :css-color="''" />
</button>
```

`<button>`'s content model permits **no interactive descendants**. `PaletteCard` renders, inside it:
a `<Button>` menu trigger (`PaletteCard.vue:96-104`) plus a `DropdownMenuTrigger`; and in reachable
states an `<input>` (`PaletteRenameInput.vue:11`), a vote `<button>` (`PaletteCardMeta.vue:43`) and
copy/add/edit `<button>`s (`PaletteCardSwatches.vue:13,41,49,56`). Nested interactive content inside
a button is invalid HTML with undefined activation behaviour across engines, and the inner
`aria-pressed` button's accessible name is computed from contents that themselves contain controls.

The bitter irony: **this is the only consumer that implements the law-mandated seat.**
`VISUAL-CONSTITUTION §3.1` requires *"one native named `<button type="button"
aria-pressed="false|true">` child"* — and here it is, correct in shape, but authored **outside** the
component as a wrapper, which is the one arrangement that makes it invalid. Because `PaletteCard`
does not own its activation seat, each of the five consumers must invent one; four bind a bare
`@click` on an unfocusable div and the fifth produces invalid markup.

That is the strongest structural argument for the body's cure step 2, and it is evidence that the
missing seat is not a latent risk but an already-realised defect at a shipping call site. Note also
the wrapper's `ring-2 ring-primary ring-offset-2 ring-offset-background` — the selected-state
treatment is a per-instance override in a consumer (owner edict 5) precisely because the component
exposes no selection state.

---

## NEW — D-25 (MINOR, but owner-marked): non-concentric corners — the mechanism behind `OM-2-card-shadow-sharp-corners.png`

The body does not reference `docs/tranches/V/megatranche/audit/visual/owner-marked/OM-2-card-shadow-sharp-corners.png`
— the owner's own mark on this component. Measured on the live card:

```
card border-radius (outer):  16px
card border-width:           2px
strip inset from card left:  2px          ← the strip sits exactly at the border's inner edge
strip border-radius:         16px         ← rounded-t-card
concentric requirement:      16 − 2 = 14px
```

The full-bleed colour strip is the card's only child that meets the boundary, and it carries the
**outer** radius while sitting at the **inner** edge. Its arc is 2 px fatter than the border's inner
arc, so the two curves diverge through the corner instead of nesting — the classic non-concentric
corner pinch. `rounded-t-card` is applied at `PaletteCard.vue:36` precisely because the card
deliberately refuses `overflow-hidden` (`:16-18`, S.W5-10), which moves the clip responsibility onto
the child without moving the radius arithmetic with it.

The shadow half of the owner's mark is the second contributor. `--shadow-cartoon-md` resolves to
**three stacked hard-edged casters, zero blur and zero spread**:

```
oklab(0.28 … / 0.32) -3px 3px 0px 0px,
oklab(0.28 … / 0.26) -5px 5px 0px 0px,
oklab(0.28 … / 0.18) -7px 7px 0px 0px
```

Three copies of a 16 px arc at three different offsets diverge **maximally at the corners** and
converge along the straight edges — so the cast reads as clean banding on the sides and as a faceted,
stepped, apparently-sharp corner at the rounds. That is what the owner circled. Note this is the
register that was *supposed* to be a single smooth `.cartoon-cast` layer — the dead element in D-21.
Correcting D-21 by deleting the cast is right; the visible artefact belongs to the three raw casters
on the root, and only cure step 1 (`shadow: false`) removes it.

---

## NEW — D-26 (MINOR): in dark mode the cel shadow is lighter than the surface casting it

Measured on the same element with `.dark` applied:

| | light | dark |
|---|---|---|
| card `background-color` | `oklab(0.913 …)` | `oklab(0.345 …)` |
| shadow colour | `oklab(0.28 …)` | `oklab(0.34 …)` |
| shadow alphas | .32 / .26 / .18 | **.46 / .38 / .26** |
| L(shadow) − L(card) | **−0.633** | **−0.005** |

In light mode the caster is 0.633 L below its surface — a real shadow. In dark mode it is **0.005 L**
below, at nearly half again the alpha. A hard-edged cel shadow requires luminance headroom *beneath*
the surface, and on a dark card there is none, so the register degrades to a grey smear whose only
remaining signal is the offset silhouette.

The producer token is the proximate cause — `--shadow-cartoon-md` uses
`light-dark(hsl(24 10% 10%), hsl(30 14% 90%))` then clamps L into `[0.28, 0.34]`, so the dark arm
takes the *light* source colour and clamps it **down** to 0.34, landing on the card's own 0.345. But
the design decision under audit is the consumer's: putting a hard three-layer cel caster on an
entity that must render on a dark surface, when the ruled tuple says `shadow: false`. Raising the
alpha (.32→.46) is the visible evidence that someone already noticed it reading weakly in dark and
compensated with opacity rather than with contrast.

---

## NEW — D-27 (MINOR): the metadata row does not merely overlap the menu — it leaves the card entirely

D-5 measures a 37 px chip↔menu overlap. My fixture (5 tags) shows the same mechanism has **no bound
at all**. At a 390 px viewport, card 324 px wide, right edge ≈ 357 px:

```
menu button:   left 307.0   right 343.0
chip "blue":   left 314.9   right 348.7    overlapMenuPx: 28.1
chip "cool":   left 356.7   right 389.9    ← outside the card
chip "ocean":  left 397.9   right 441.3    ← 84 px outside the card, past the 390 px viewport

metaCluster scrollWidth − clientWidth:  142 px
row        scrollWidth − clientWidth:   86 px
```

So the failure is not "chips crowd the menu"; it is that the identity row has **no overflow design in
any direction** — the title absorbs 100 % of the shrink (D-2), and once it reaches 0 the remaining
`shrink-0` content simply exits the card's box and then the viewport. It is invisible to the tranche
harness because `REPORT.md`'s `horizontalOverflow` samples the document scroll width and an ancestor
clips before the document does; the content is lost, not merely off-screen.

This also bounds D-18: the `.slice(0, 3)` tag cap is not a conservative truncation, it is the *only*
thing standing between this row and unbounded escape — and three tags already escape.

---

## NEW — D-28 (MINOR): the featured badge's gold outline is declared twice, by two mechanisms

`PaletteCard.vue:64` applies `border-gold` in the template **and** `:343-345` re-declares it in
scoped CSS:

```css
.featured-badge { border-color: var(--color-gold); }
```

Measured: `border-gold` resolves (computed `border-color: oklch(0.751 0.147 84.2)` = `--color-gold`),
so the utility works and the scoped rule is redundant. Both are per-instance overrides of a glass-ui
`Badge` (owner edict 5), and glass-ui already ships the metal register the card is imitating —
`dist/styles/utilities/metal.css` exposes `--metal-border-width`, `--metal-stop-{light,base,dark}`,
`--metal-glow-{blur,opacity}`, and `Card` carries `metal?: "gold" | "silver" | "bronze"`. `Badge`
exposes only `tone?: neutral | destructive | success | warning | info` — no metal arm.

So the idiomatic cure for D-6 and D-28 together is a **producer** change (owner edict 4): extend the
metal register to `Badge` — `<Badge variant="outline" metal="gold">` — which would set the border
from `--metal-stop-*`, the glow from `--metal-glow-*`, and, critically, would own the
`color: transparent` that D-6 proves the Badge's own `text-foreground` currently defeats. That
removes both scoped rules, the redundant utility, the dead `.featured-badge__icon svg` reach, and the
occlusion — in glass-ui, once, for every consumer.

---

## Addendum register

| ID | Severity | Defect | Primary evidence |
|---|---|---|---|
| D-21 | MAJOR | `.cartoon-cast` renders nothing (unimported `glass-atom.css` **and** `--card-press-t` ≠ `--cartoon-press-t`); the whole cartoon motion register died in the Glass 7 adoption while `DESIGN.md:246` still records it `landed` | computed `position:static, display:inline, box-shadow:none, 0×0`; `grep -rl glass-atom` = self only; `PaletteCard.vue:264` vs `glass-atom.css`; `Card.vue.d.ts:11` "does not add command behavior" |
| D-22 | MAJOR | Live null deref in the component's own hover path; falsifies Negative proof #3 | `evidence/seat-D2-console-hoverpopover-crash.log`; `useHoverPopover.ts:18,26` |
| D-23 | MAJOR | Accessible swatch popover exists but is gated behind `!canHover` — delivered to touch, withheld from keyboard-only desktop; dual path (edict 2) | `SwatchHoverMenu.vue:8-49`; `useHoverPopover.ts:11-14` |
| D-24 | MAJOR | `<button>` wraps a subtree containing `<button>`/`<input>` — invalid content model; the law's `aria-pressed` seat authored as a consumer wrapper because the component owns none | `MixSourceSelector.vue:246-268` vs `PaletteCard.vue:96`, `PaletteCardMeta.vue:43`, `PaletteRenameInput.vue:11` |
| D-25 | MINOR | Non-concentric corner (strip 16 px arc at the 14 px inner edge) + 3 stacked zero-blur casters = the owner's `OM-2` mark | measured radii/inset; `--shadow-cartoon-md` computed; `owner-marked/OM-2-card-shadow-sharp-corners.png` |
| D-26 | MINOR | Dark-mode caster is 0.005 L below its own surface at 1.4× the light-mode alpha | computed `oklab` card bg vs shadow, both schemes |
| D-27 | MINOR | Identity row content exits the card box entirely (84 px past the card, past the viewport); 142 px cluster overflow | measured chip rects vs card right edge at 390 px |
| D-28 | MINOR | Gold outline declared twice (`border-gold` + scoped `.featured-badge`); glass-ui metal register exists but has no `Badge` arm | `PaletteCard.vue:64,343-345`; `metal.css`; `Badge.vue.d.ts` |

**Strongest defect: I concur with the body — D-2.** My independent measurement puts the identity at
**0 px on a 462 px desktop card**, not merely at mobile, which makes it worse than the body states.

**Strongest *new* defect: D-21** — because it changes what the cure costs. The body frames removing
the cartoon register as resolving a live T-vs-V canon conflict. It is not live: the register's motion
has not rendered since the Glass 7 adoption, and the canon row asserting otherwise is stale. Removal
forfeits nothing, and owner edict 6 is not engaged by the deletion — it was engaged, and violated, by
the adoption that dropped the behaviour without a rendered witness.

### Addendum artifacts

- `evidence/seat-D2-console-hoverpopover-crash.log` — captured WebKit console, D-22 stack

No source file was edited by this seat. All writes are confined to
`docs/tranches/V/megatranche/audit/components/PaletteCard/`.

---
---

# ADDENDUM II — third CHALLENGE-D seat: the export seat, the row grid, and the redundant expand

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. The seat was
spawned with an explicit Opus 5 declaration and the served tier matches it. Declared, not inherited.

---

## Why this addendum exists

Two CHALLENGE-D seats have already run this component (body §1–§19, addendum §D-21–D-28). I did not
re-derive their findings; I re-measured a sample of them and then went after the three surfaces
neither seat opened:

1. **`PALETTE-CONTRACT.md`.** The body's §0 names its canon as `VISUAL-CONSTITUTION.md` and
   `PROPORTION-AUDIT.md`. The seat law names a third authority, and it is the one this card's
   Export sub-menu is governed by. Nobody read it. It contains five verbatim prohibitions that the
   card's Export seat violates, and I have the downloaded bytes.
2. **The rendered row grid across a stack.** Both seats measured one card. The card ships in a
   vertical list of identical-width siblings; a repeated entity's rhythm is a property of the
   stack, not the specimen.
3. **What the expand actually reveals.** Both seats judged the expand's *mechanism* (height
   animation, PRM, scroll). Neither asked whether the revealed content is worth 72 px.

New evidence written by this seat:

- `probe-D3.mjs` → `probe-D3-results.json` — row geometry across 6 seeded palettes at 1440 px and
  390 px; the Export seat driven end-to-end through the card's own menu with download capture.
- `probe-D3b.mjs` → `probe-D3b-results.json` — the Export seat on a *clean* palette (to separate
  structural failure from name-triggered failure); `/#/browse` request reachability; expanded-card
  fill geometry.
- `evidence/dl-*.svg`, `evidence/clean-*.{png,json,svg}` — the actual exported files.
- `evidence/d3-desktop-rows.png`, `evidence/d3-mobile-rows.png`, `evidence/d3-expanded.png`.

---

## D-29 — BLOCKER. The card's Export seat is wired to a legacy module. The contract-conformant implementation exists, is tested, and ships to no one.

`PaletteCardMenu.vue:107-130` renders a five-item Export sub-menu. Each item emits an action string;
`PaletteCard.vue:308-312` maps them to `emit("export", palette, fmt)`; both consumers
(`BrowsePane.vue:115`, `PalettesPane.vue:96`) hand that to `usePaletteExport()`, which is:

```ts
// demo/palettes/usePaletteExport.ts:1-27  (whole file)
import { exportAsJSON, … , downloadExport } from "./export";
…
        } catch (e) {
            console.warn("Export failed:", e);
        }
```

`"./export"` resolves to **`demo/palettes/export.ts`** — a 140-line flat module with a hand-rolled
`slugify`, a `<text>`-bearing SVG, and a canvas rasterizer.

There is a second, complete export implementation in the tree:

```
$ ls demo/palettes/export/
bytes.ts  canonical.ts  css.ts  digest.ts  json.ts  png.ts  reload.ts
rfc8785.ts  serializers.ts  svg.ts  tailwind.ts  types.ts
```

That is the W51 byte authority — RFC 8785 canonicalisation, the domain-separated content digest,
the frozen PNG/DEFLATE encoder. Its consumer census:

```
$ grep -rn "palettes/export/" demo test e2e --include='*.ts' --include='*.vue' | grep -v "^demo/palettes/export/"
demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";
```

**One consumer, and it is a test.** No product surface imports it. The only user-facing export seat
in the application — this card's menu — is wired to the other one.

This is owner edict 2 in its purest form (no legacy code, no dual paths) and it is not a stylistic
duplication: the two modules disagree about the bytes. `PALETTE-CONTRACT.md:165-171` states the
appendix "is W51's sole byte authority for JSON / CSS / Tailwind / SVG / PNG" and "may not be
prose-compressed." The shipped path satisfies none of it. Measured, from files this seat downloaded
through the card's own menu:

| Contract clause (verbatim, `PALETTE-CONTRACT.md`) | Shipped bytes (`evidence/clean-sunset.json`, `evidence/clean-oklch-set.svg`) |
|---|---|
| JSON value is `{schema:"value.palette-export/v1", source, displayName, contentDigest, colors:[{id:"color-001",…}], canonicalTags}` (L236-247) | `{"name":"Sunset","slug":"sunset","colors":[{"css":"#ff6b6b","position":0},…]}` — no schema, no source, no digest, no positional ids, no tags |
| "Identifiers are deliberately positional: color `i` is `color-` plus its 1-based index padded to three decimals" (L221) | `--palette-<name-slug>-<0-based index>` |
| "One canonical CSS color spelling is used everywhere: `oklch(<l/1000 fixed 3>% …)`" (L223-227) | the palette's raw author string, passed through: `fill="#123456"` in one file, `fill="oklch(0.7 0.15 30)"` in the next |
| Tailwind is "data, not executable JavaScript… V emits no CommonJS/ESM function, comment, plugin, `require`, `eval`" (L266-276); extension `.tailwind.json`, MIME `application/json` | `export.ts:55-58` emits `// Tailwind config for "<name>"\nexport default {…}` — a comment plus an ESM default export — as `.tailwind.ts` with MIME `text/typescript` |
| "SVG is a **font-free** swatch strip… There is no text rendering, font, external reference, CSS, metadata, script…" (L280, L299) | `export.ts:71` emits `<text … font-family="system-ui, sans-serif" font-size="14" fill="#333">` |
| PNG is "deterministic client-side rasterization, **not browser canvas serialization**"; "No CSS-string reparse… canvas/platform converter… survives" (L303-305) | `export.ts:84-116`: SVG string → Blob → `<img>` → `canvas.getContext("2d")` → `canvas.toBlob` |

The last row is the one with teeth. The contract makes W8's `toRgba8` the sole Color→byte authority
precisely so Chromium, Firefox and Safari produce identical pixels. The shipped path hands the
colour strings to the browser's own CSS parser and compositor. For the `oklch()` palette I exported,
the PNG's pixels are whatever WebKit's oklch→sRGB path produced — a per-engine value the contract
says "reopens W8 rather than authorizing a palette-local conversion path."

**Reproduction:** `node docs/tranches/V/megatranche/audit/components/PaletteCard/probe-D3b.mjs` —
seeds two palettes, opens the card menu, clicks Export → JSON / SVG / PNG, saves the downloads to
`evidence/clean-*`.

---

## D-30 — BLOCKER. SVG export writes unescaped user text. A palette name closes the `<text>` element and injects a `<script>` into the file on the user's disk.

`PALETTE-CONTRACT.md:280`:

> XML escaping is one scalar pass with exactly five substitutions: `&→&amp;`, `<→&lt;`, `>→&gt;`,
> `"→&quot;`, and `'→&apos;` … Apply the escape pass to every dynamic text or attribute value after
> Domain normalization.

`demo/palettes/export.ts:71` applies none of them:

```ts
`  <text x="${width / 2}" y="${swatchH + 20}" … fill="#333">${palette.name}</text>`,
```

I seeded a palette named `A & B </text><script>alert(1)</script>`, opened its card menu on
`/#/palettes`, chose **Export → SVG Swatch**, and captured the download. The file
(`evidence/dl-a-b-text-script-alert-1-script.svg`) contains, verbatim:

```xml
<text x="60" y="100" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#333">A & B </text><script>alert(1)</script></text>
```

The `<text>` element is closed by the user's data, a `<script>` element is emitted at document
level, and a stray `</text>` follows. The bare `&` is additionally a fatal XML well-formedness
error. Opening that file in a browser executes the script; opening it in a vector editor fails to
parse.

The severity is not theoretical because of *where* the affordance sits: on `/#/browse` this menu is
rendered on **other people's palettes** (`BrowsePane.vue:92-116` passes remote rows). The card
offers "Export → SVG Swatch" on a stranger's entity, and the stranger controls the name.

This is a design defect before it is a security defect: the contract designs the name as escaped
data, and this seat's markup treats it as trusted document source. A state — "the entity's name
contains markup" — was never designed.

**Reproduction:** `probe-D3.mjs`, run 1. Pasted output:

```json
{ "idx": 5, "fmt": "SVG Swatch",
  "filename": "a-b-text-script-alert-1-script.svg",
  "head": "<svg …><rect …/><text … fill=\"#333\">A & B </text><script>alert(1)</script></text>\n</svg>" }
```

---

## D-31 — BLOCKER. Whether an export succeeds depends on the palette's NAME. The failure is a `console.warn` and nothing else.

`PALETTE-CONTRACT.md:172` — the first paragraph of the W51 appendix, verbatim:

> A serializer either yields the bytes below or **a visible terminal/retryable operation state—never
> a partial download or `console.warn`-only result.**

`usePaletteExport.ts:21-23`:

```ts
} catch (e) {
    console.warn("Export failed:", e);
}
```

That is the prohibited construct, spelled the way the contract spells it. And it fires. Because PNG
is rasterized *from the SVG string* (D-29), the injection of D-30 makes the SVG unloadable, `img.onerror`
rejects, and the whole export dies invisibly.

Measured, same session, same menu, two palettes:

| palette | menu action | download event | console |
|---|---|---|---|
| `Sunset` | Export → PNG Swatch | `sunset.png`, **5794 bytes**, sig `137,80,78,71,13,10,26,10` | — |
| `A & B </text><script>…` | Export → PNG Swatch | **none within 8 s** | `warning: Export failed: Error: Failed to load SVG for PNG conversion` |

So the user clicks *PNG Swatch*, the menu closes, and absolutely nothing happens — no file, no
chip, no error, no state. The card's own feedback channel (`ActionFeedback`) is not even wired to
the export path: `showFeedback` is called from `BrowsePane.vue:230,239,249,264` and
`PalettesPane.vue:207` for save/publish/delete, never for export.

`PROPORTION-AUDIT.md §4` has already dispositioned this family:

> `PR-08` | Pending/failure/**export**/recovery truth only transient | **ADD-AFFORDANCE** |
> Primary W23; semantic producer W15 … Persistent entity status/recovery

and `VISUAL-CONSTITUTION.md:102` has already ruled where the seat belongs:

> Full detail, rename/lifecycle/**export** actions and durable operation state live in the selected
> inspector.

Three independent authorities — the byte contract, the proportion register and the interaction
grammar — name this exact defect. The card ships it anyway, and the shipped failure mode is worse
than "transient": it is silent.

**Reproduction:** `probe-D3.mjs` run 3 (fails) vs `probe-D3b.mjs` run 1 (succeeds); pasted above.

---

## D-32 — MAJOR. The human name is the CSS identifier and the filename stem. Two palettes collide; an emoji palette exports to a dotfile.

`PALETTE-CONTRACT.md:221`, verbatim:

> A human name remains escaped data/metadata and **never becomes a CSS/Tailwind/XML identifier**.
> Duplicate, empty, Unicode-only and punctuation names therefore cannot collide or silently rename
> another token.

The contract enumerates the exact four failure classes this design has. `export.ts:9-11` is the
generic slugifier the contract also forbids by name ("The prefix already satisfies the target
namespace/digest grammar; **no generic slugifier** … exists", L262):

```ts
function slugify(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
```

Run against the contract's own four classes:

```
$ node -e '<the exact function above>; …'
"🎨"                    -> ""                              -> file: ".css"
"日本語"                 -> ""                              -> file: ".css"
"---"                   -> ""                              -> file: ".css"
"My Palette"            -> "my-palette"                    -> file: "my-palette.css"
"my palette!"           -> "my-palette"                    -> file: "my-palette.css"
```

Unicode-only → empty stem. Punctuation-only → empty stem. Two distinct palettes → one filename and
one identifier namespace: exporting both overwrites the first, and pasting both CSS files into one
sheet silently renames tokens. Confirmed end-to-end through the card menu — the `🎨` palette's CSS
export, downloaded to `evidence/dl-css.css` (WebKit repaired the empty stem `.css`; the body is
unambiguous), run 2 of `probe-D3.mjs`:

```css
:root {
  --palette--0: #ff0000;
  --palette--1: #00ff00;
}
```

`--palette--0`. The identity is gone from the artifact the card just handed the user.

---

## D-33 — MAJOR. The identity row has no column grid. The one metric every card carries lands at six different x positions in a stack of identical cards.

Both prior seats measured a single card. The card's job is to be one row of a repeated field, and
the design fails at that scale specifically.

Measured (`probe-D3-results.json`, six seeded palettes, `/#/palettes`, WebKit, DPR 2):

**Desktop 1440 px — every card is 462 px wide, every menu button is at x = 1166:**

| palette | title x | title w | color-count badge x |
|---|---:|---:|---:|
| Sunset | 792 | 65 | **865** |
| A very long palette name that will not fit | 792 | 91 | **891** |
| Featured One | 792 | 130 | **1057** |
| Single | 792 | 60 | **860** |
| 🎨 | 792 | 22 | **822** |
| `A & B </text>…` | 792 | 328 | **1128** |

The colour-count badge — the only datum every palette in the product has — is scattered across a
**306 px span** on cards whose left and right edges are identical. Mobile (390 px, 324 px cards) is
proportionally worse: x = 144, 79, 248, 139, 101, 248 → a **169 px span on a 324 px card**, 52 % of
the card's width.

This is not a truncation bug; it is the absence of a layout decision. The row is one
`flex items-center gap-2` (`PaletteCard.vue:43-44`) into which `PaletteCardMeta` injects up to seven
more `shrink-0` siblings (`PaletteCardMeta.vue:7-54`). Nothing is ever assigned a column. A reader
scanning the stack for "how many colours" must re-find the number on every row.

`PROPORTION-AUDIT.md §5.2` — "A card has **one protagonist, one identity line**, and at most one
persistent action/status region. Additional equal-weight zones require a different
`InstrumentChassis` composition." The shipped identity line is a bag of up to eleven items with no
internal law. The rendered consequence is visible without instruments in `shots/d-light.png`: four
cards, four different badge positions, no vertical edge anywhere except the menu column.

---

## D-34 — MAJOR. Expanding the card costs 72 px and reveals nothing the strip did not already show.

Measured (`probe-D3b-results.json`, `Sunset`, 5 colours, 1440 px):

```
collapsed card:  462 × 100 px      strip: 462 × 40 px (full-bleed, all 5 colours, weighted)
expanded card:   462 × 172 px      swatch row: 5 × 40 px, x 768→1000
                                   fill: 232 px of 462 px = 50 %
```

The card grows **72 %** in height. What appears is five 40 px squares containing the same five
colours, in the same order, at **one-quarter of the strip's area** (5 × 1600 = 8 000 px² versus
18 480 px²), occupying the left half of the region and leaving 232 px of empty card. On
`/#/palettes` — where `show-slug` is not passed (`PalettesPane.vue:82-96`) — the expanded region
contains *nothing else*: no slug chip, no metadata, no provenance. Its entire informational delta
over the collapsed card is zero.

What it adds is affordance, not information: hover/tap popovers with add/edit/copy. And that
affordance is precisely what `VISUAL-CONSTITUTION.md:102` forbids ("the card body owns no expand …
or hover-only swatch-action path") and what `PROPORTION-AUDIT.md §4 PR-07` dispositions
("palette hover paths retire into selected inspector").

The design consequence is worse than redundancy. The two representations have **inverted
semantics**: the strip that carries the full weighted specimen is `aria-hidden="true"
role="presentation"` (`PaletteColorStrip.vue:2-4`), while the smaller, later, half-empty duplicate
carries every accessible name and every action. A screen-reader user is told the palette has no
colours until they discover an expand gesture that has no keyboard path (D-3).

`PROPORTION-AUDIT.md §5.1` — "A Card houses **one** bounded object/specimen." This card houses two
renderings of one specimen, and hides the better one.

---

## D-35 — MAJOR. Three boundary mechanisms are stacked on one edge; the register already ruled REMOVE.

Measured root, live (`probe-D3-results.json` → `cardGeom`):

```
borderWidth: 2px
boxShadow:   oklab(0.28 0.01676 0.024882 / 0.32) -3px 3px 0 0,  (+2 more casters)
radius:      16px      overflow: visible      strip radius: 16px 16px 0 0
```

plus a fourth, interior: `PaletteCardSwatches.vue:6,23` adds `border-t border-border/15` above the
swatch region.

`PROPORTION-AUDIT.md §4`:

> `PR-05` | **Dividers, caster shadows and corner marks repeat a boundary** | **REMOVE / KEEP** |
> Primary W18 … every other divider/ornament is zero

and `§5.4`: "A divider is retained only when grouping would be ambiguous without it. Spacing plus
material already expressing the same boundary makes the line duplicative."

The card expresses its edge four times: 2 px border, three stacked zero-blur casters, a radius, and
an interior rule. `VISUAL-CONSTITUTION.md:186` is the ruling in plain words — "Saved palettes are
**matte specimen slips** inside a glass workspace, **not cartoon casters stacked within casters**."

(The body's §1 and the first addendum's D-21/D-25 reached the cartoon register from the tuple and
from the dead `.cartoon-cast`. This is the third, independent route: the *count* of boundary
mechanisms, which has its own named register row and its own terminal verb.)

---

## D-36 — MAJOR. The reorder handle is an unnamed 16 px glyph, and its drag state is owned by the consumer.

`PaletteCard.vue:47-50`:

```html
<GripVertical v-if="draggable" class="drag-handle w-4 h-4 text-muted-foreground shrink-0 cursor-grab …" />
```

An `<svg>`. No `role`, no accessible name, no `tabindex`, no `aria-grabbed`, no keyboard path. It is
nonetheless operable: `PalettesPane.vue:184` binds SortableJS to `handle: ".drag-handle"`.

Three canon clauses, each independently violated:

- `VISUAL-CONSTITUTION.md:54` and `PROPORTION-AUDIT.md §5.12`: "An optional reorder handle remains a
  separate **named** control." It has no name.
- `PROPORTION-AUDIT.md §5.5`: "A small icon/mark is either data, status, labeled action, drag
  affordance, focus/selection register or removed. **Decorative controls and operable ornaments
  without names are forbidden.**"
- `PROPORTION-AUDIT.md §5.7`: "Visual glyph size, operable target size and layout reservation are
  separate quantities." The shipped glyph *is* the target: 16 × 16 px = 256 px², against a 44 px
  (1 936 px²) floor — 13 % of it. This is one of the tap-target rows `REPORT.md` counts on
  `/#/palettes` without attributing.

And the *state* the affordance enters is not the card's at all:

```ts
// PalettesPane.vue:183-187
useSortable(sortableEl, pm.filteredSaved.value, {
    handle: ".drag-handle",
    animation: 150,
    ghostClass: "opacity-30",
```

The dragging register is a raw `opacity-30` utility and a bare `150` ms declared in the *consumer*.
The card that renders the handle has no dragging, grabbed, drop-target or drop-invalid state; the
150 ms is not a motion token (`--duration-fast` is 200 ms, `--duration-normal` 300 ms) and, being a
SortableJS JS-driven transform, the app's global `prefers-reduced-motion` guard
(`animations.css:184-192`) cannot reach it. `PROPORTION-AUDIT.md §4 PR-07` names the family
verbatim: "Hover-only/unlabeled controls and **invisible drag state** → ADD-AFFORDANCE / REMOVE …
every surviving action/drag seat has a name/state."

---

## D-37 — MINOR. The swatch path consumes the `WatercolorDot` interactive host that the constitution abrogates.

`SwatchHoverMenu.vue:14-20` and `:29-36` both render:

```html
<WatercolorDot :color="color" tag="button" :aria-label="`Color swatch ${color}`" … />
```

`VISUAL-CONSTITUTION.md:91`:

> V **abrogates a selection outline and interactive host on `WatercolorDot`**. P051 removes the
> public `tag="button"`/interactive-host branch in the clean major; the organic face supplies
> colour/specimen identity only. Selection, activation, drag and keyboard focus belong to a named
> enclosing geometric button/seat … data-bearing static faces remain present as noninteractive
> named list/text content with **zero activation/focus/drag semantics**.

Census of the branch across the demo:

```
$ grep -rn 'tag="button"' demo --include='*.vue' | wc -l
7
```

— of which the two in this component's swatch path are the ones the palette-entity law explicitly
covers (`:102` "the card's compact swatch strip remains noninteractive data with zero
activation/focus/drag semantics"). This is also owner edict 4 read backwards: the component is not
hand-rolling past glass-ui, it is consuming a producer branch the tranche has already voted to
delete, which pins the producer's clean major open.

---

## D-38 — MINOR. The card's action bus is an untyped string channel with a silent no-op default and one dead entry.

`PaletteCardMenu.vue:224-227` declares its only outbound contract as `action: [action: string]`.
`PaletteCard.vue:290-319` receives it into a `Record<string, () => void>` and dispatches:

```ts
const fn = actions[action];
if (!fn) return;
```

An unrecognised action is a silent success. The compiler cannot check either side, because the seam
the six-file split created is typed `string` — the split produced a boundary and then made it
unverifiable.

The proof that this matters is already in the file. Enumerating both sides:

```
$ grep -o "'action', '[a-zA-Z]*'" PaletteCardMenu.vue | sort -u    # 15 + 1 ternary pair = 17 emitted
$ grep -rn "copyAll" demo
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:294:  copyAll: () => void writeClipboard(…)
```

`copyAll` — "copy every colour in this palette to the clipboard" — is implemented in the action
table and **emitted by nothing**. The affordance was removed from the menu and the handler was left
behind, where no type check and no lint can see it. That is owner edict 2 (no legacy, no dead
paths) and it is invisible precisely because of the string bus.

---

## Second opinion on the decomposition (the seat's specific charge)

I concur with the body's §9 verdict and add three observations it did not make.

**1. The seam is drawn across the state, not around it.** `PaletteCardSwatches` takes
`openPopoverIndex`, `canHover` and `floatingStyle` as props and re-emits `hover`, `leave`,
`cancelLeave`, `popoverTouch`. All four are the return values of `useHoverPopover()` living in the
*parent* (`PaletteCard.vue:246-255`). A module boundary that transports its neighbour's internal
state across itself in both directions is not encapsulation; it is a cut through the middle of one
object. The Vue-idiomatic repair of that shape would be `provide`/`inject` — but the correct repair
here is deletion (§D-34, `VISUAL-CONSTITUTION.md:102`), because the region should not be on the card.

**2. The folder boundary is real; the file boundaries are not.** `card/index.ts:4-9` exports six
members and `PaletteCard/` contributes exactly one of them. So the directory *is* a legitimate
public/private line — one public component, five private files. But the five private files each
declare a full public-API-shaped contract (63 negotiated members, per §9). They pay the whole cost
of being modules and collect none of the benefit: nothing is hidden, nothing is substitutable,
nothing is independently testable, and the one contract that *is* crossed at runtime (D-38) is typed
`string`.

**3. The one real seam in the component was never cut.** The card contains a genuine, nameable
sub-object: the *operation* — 20 verbs, 18 emits, five of them exports, each with a lifecycle
(request → in-flight → result → acknowledgement) that the W51 contract specifies in full and that
`PROPORTION-AUDIT PR-08` has already dispositioned ADD-AFFORDANCE. That is the thing with state, a
protocol and a failure mode. It is spread across `PaletteCard.vue`'s action table,
`ActionFeedback.vue`'s 2.5-second timer, `usePaletteExport.ts`'s `console.warn`, and two panes'
`cardRefs[…]?.showFeedback(…)` reach-ins. The split extracted five *templates* and left the one
*object* smeared across four files and two components.

That is the sharpest statement of the god-module verdict: **the decomposition split the markup along
visual regions and left the domain undivided.** Six files, one object, no owner.

---

## Corroborations (measured independently by this seat)

- **D-2 (0 px identity), confirmed and localised.** At 390 px, palette `A very long palette name
  that will not fit` renders `title: {x: 71, w: 0, h: 61, ov: true}` — a zero-width, two-line clamp
  box. `Featured One` renders `w: 13, h: 61` — two lines of a 13 px box, i.e. glyph fragments, which
  is visible in `shots/m-light.png` as `Feature` / `One` with the final glyph hard-clipped and no
  ellipsis. The inversion is total: the card **grows** (118 → 125 px) exactly when its name becomes
  unreadable, because the starved title wraps into a second empty line.
- **D-8 (padding ladder).** `px-3` = 12 px against `VISUAL-CONSTITUTION.md:54`'s
  `C = --card-pad-inline = --spacing(4)` = 16 px. 25 % under, invariantly.
- **D-1 (tuple).** `borderWidth: 2px`, three casters, `cursor: pointer`, `role="article"` with
  `@click` — measured live, unchanged since the first seat.
- **§6 motion law "exit is shorter than entry" — PASSES.** `animations.css:104-121` (morph) and
  `:142-155` (celebrate) both use `--duration-normal` + spring on enter and `--duration-fast` on
  leave; `useHeightTransition.ts:7-8` is 350 ms enter / 250 ms leave. This law is satisfied and I
  record it as such.

---

## Declared blind spots

- **The skeleton → card transition could not be measured.** `PaletteCardSkeleton` renders only while
  `pm.browsing` is true, and on this machine no browse request is ever issued: `probe-D3b.mjs` →
  `browseReach` recorded `offOriginRequests: []`, `skeletons: 0`, and the console error
  *"value.js dev is MISCONFIGURED: http://localhost:9000 has no VITE_API_URL and is targeting the
  cross-origin production API … every palette request will be blocked."* The transport refuses
  before it fetches. **Hypothesis (NO REPRODUCTION):** the ghost is substantially taller than the
  card it becomes — `PaletteCardSkeleton.vue:39-79` composes strip 40 px + meta row (20 + 20) +
  a swatch row of `w-12 h-12 sm:w-14 sm:h-14` blocks that the collapsed card does not render at all,
  against this seat's measured collapsed card of **100 px** — so the loading register should induce
  a large downward reflow on settle. It also uses `shadow-cartoon-sm` and `overflow-hidden` where
  the card uses the md caster stack and `overflow: visible`. Labelled a hypothesis; it needs a
  reachable API.
- Same cause explains why `visual/REPORT.md` and `visual/safari-real/MATRIX-SAFARI.md` both record
  `/#/browse` as unverifiable. One correction to the body's "finding zero": `/#/browse` is not
  card-free — `probe-D3b.mjs` measured `cards: 2` there, the local *My Palettes* rail in the right
  pane. The audit's browse frames are empty of cards because `localStorage` was empty, not because
  the route has none.

---

## Addendum II register

| ID | Severity | Defect | Primary evidence |
|---|---|---|---|
| D-29 | BLOCKER | The Export seat ships `demo/palettes/export.ts`; the W51-conformant `demo/palettes/export/` has exactly one consumer and it is a test. Six verbatim contract clauses violated in the downloaded bytes | `usePaletteExport.ts:9`; `grep` census; `evidence/clean-sunset.json`, `evidence/clean-oklch-set.svg`; `PALETTE-CONTRACT.md:165-171,221-305` |
| D-30 | BLOCKER | SVG export applies none of the five mandated escapes; a palette name closes `<text>` and injects `<script>` into the downloaded file — on Browse the name belongs to another user | `evidence/dl-a-b-text-script-alert-1-script.svg`; `export.ts:71`; `PALETTE-CONTRACT.md:280` |
| D-31 | BLOCKER | Export success depends on the palette's name; failure is `console.warn`-only — the exact construct the contract prohibits by name. PNG on a clean palette = 5794 bytes; on a markup name = no download in 8 s, no visible state | `usePaletteExport.ts:21-23`; `probe-D3*-results.json`; `PALETTE-CONTRACT.md:172`; `PROPORTION-AUDIT PR-08` |
| D-32 | MAJOR | The human name is the CSS identifier and the filename stem: `🎨`/`日本語`/`---` → empty stem `.css` and `--palette--0`; `My Palette` and `my palette!` collide | `export.ts:9-11`; node reproduction; `evidence/` CSS body; `PALETTE-CONTRACT.md:221,262` |
| D-33 | MAJOR | No column grid in the identity row: the colour-count badge spans 306 px across six 462 px cards (169 px across 324 px cards on mobile) | `probe-D3-results.json`; `evidence/d3-desktop-rows.png`; `PROPORTION-AUDIT §5.2` |
| D-34 | MAJOR | The expand costs +72 px (100→172) to re-present the same colours at ¼ the area and 50 % fill, while the full-bleed original is `aria-hidden` — two renderings of one specimen, the better one hidden | `probe-D3b-results.json`; `PaletteColorStrip.vue:2-4`; `PROPORTION-AUDIT §5.1`; `VISUAL-CONSTITUTION.md:102` |
| D-35 | MAJOR | Four boundary mechanisms on one edge (2 px border, 3 casters, radius, interior rule) against a register row whose terminal verb is REMOVE | measured `cardGeom`; `PaletteCardSwatches.vue:6,23`; `PROPORTION-AUDIT PR-05, §5.4`; `VISUAL-CONSTITUTION.md:186` |
| D-36 | MAJOR | The reorder handle is an unnamed, unfocusable 16 px `<svg>` (13 % of the target floor) and its drag state — `opacity-30`, `animation: 150` — is declared in the consumer, outside every token and outside the PRM guard | `PaletteCard.vue:47-50`; `PalettesPane.vue:183-187`; `PROPORTION-AUDIT PR-07, §5.5, §5.7`; `VISUAL-CONSTITUTION.md:54` |
| D-37 | MINOR | Both swatch arms consume `WatercolorDot tag="button"` — the interactive-host branch the constitution abrogates and P051 deletes | `SwatchHoverMenu.vue:14-20,29-36`; `VISUAL-CONSTITUTION.md:91,102` |
| D-38 | MINOR | The action bus is `action: [action: string]` with `if (!fn) return`; `copyAll` is implemented and emitted by nothing | `PaletteCardMenu.vue:224-227`; `PaletteCard.vue:290-319`; `grep -rn copyAll` |

**Strongest defect overall — I dissent from both prior seats.** They named D-2 (the 0 px identity).
D-2 is real, ugly and measured, but it is a layout law with a bounded cure. **D-30 is worse**: the
card hands the user a file, from a stranger's data, with a `<script>` in it, from an affordance the
constitution says should not be on the card at all, through a module that a contract-conformant
replacement already supersedes. It is the only finding in all three passes where the component's
output leaves the application and lands on a disk. The name-triggered silence of D-31 means neither
the user nor the developer is ever told.

**Strongest *new* structural defect: D-29** — because it changes the cure's shape. Every prior
finding is repaired by editing this component. D-29 is repaired by *deleting* `demo/palettes/export.ts`
and `usePaletteExport.ts` and moving the seat: the conformant serializers already exist, already
pass a byte-exact test, and are waiting for a consumer. The card does not need an export design; it
needs to stop having one.

---

## The cure, as an architectural transposition

1. **Move the operation out of the card.** Export, rename, delete, publish, visibility, fork, flag,
   tags and versions become the selected inspector's action region (`VISUAL-CONSTITUTION.md:102`,
   `§3.1` Browse/Library rows). The card keeps: specimen, identity, one named pressed seat, one
   named reorder handle. That single move retires D-1, D-29…D-31, D-34, D-36, D-38 and the body's
   §1, §9, §10, §13 together, because they are all the same defect — an entity slip carrying an
   operation console.
2. **Delete `demo/palettes/export.ts` and `usePaletteExport.ts`; wire the inspector to
   `demo/palettes/export/serializers`.** No adapter, no shim, no dual path (edict 2). The byte
   contract's `captured | ready | retryable-failure | terminal-failure | handoff-initiated` becomes
   the inspector's visible operation state, and Prepare/Download become two seats as
   `PALETTE-CONTRACT.md:325` specifies. `ActionFeedback`'s 2.5-second timer stops being the
   product's only failure surface.
3. **Give the identity row a grid, not a flex bag.** One row: `[handle] [name 1fr] [count] [menu]`,
   with fork/version/tags/votes moving to the inspector with everything else. The name becomes the
   only elastic column instead of the only shrinkable one; the count aligns; D-33, D-2, D-5 and
   D-27 close as one.
4. **One boundary.** Matte slip: the quiet opaque `sm` tuple, `shadow=false`, one hairline, no
   casters, no interior rule (`PROPORTION-AUDIT PR-05`).
5. **The strip is the specimen.** Delete the expanded duplicate; give the strip its accessible name
   and its data semantics back. One card, one specimen, one representation.

### Addendum II artifacts

- `probe-D3.mjs`, `probe-D3-results.json` — row geometry (desktop + mobile), Export seat with
  download capture
- `probe-D3b.mjs`, `probe-D3b-results.json` — clean-palette export, browse reachability, expanded fill
- `evidence/dl-a-b-text-script-alert-1-script.svg` — the injected SVG, as downloaded
- `evidence/dl-css.css` — the `🎨` palette's CSS export (`--palette--0`)
- `evidence/clean-sunset.png` (5794 B), `evidence/clean-sunset.json`, `evidence/clean-oklch-set.json`,
  `evidence/clean-oklch-set.svg` — the shipped byte grammar
- `evidence/d3-desktop-rows.png`, `evidence/d3-mobile-rows.png`, `evidence/d3-expanded.png`

No source file was edited by this seat. All writes are confined to
`docs/tranches/V/megatranche/audit/components/PaletteCard/`.

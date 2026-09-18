# CHALLENGE-D · `CurrentPaletteEditor.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. This seat was
spawned with an explicit Opus 5 declaration and is running as declared, not inherited. An
undeclared or inherited seat would be a DEFECT; this one is neither.

---

## Seat, subject, substrate

| | |
|---|---|
| Axis | CHALLENGE-D — design: visual truth, state coverage, motion, design-system boundary, proportion/seat law |
| Subject | `demo/palettes/browser/card/CurrentPaletteEditor.vue` (312 lines), area `palettes` |
| Route | `/#/palettes` only — sole consumer `demo/palettes/PalettesPane.vue:41-54` |
| Repo | `/Users/mkbabb/Programming/value.js`, branch `tranche-u` |
| HEAD **as observed** | `640652df` (the brief named `c654824e`; the tree has advanced). `git status --porcelain` on the subject file: **clean**. |
| Producer | `@mkbabb/glass-ui@7.0.0` (`node_modules/@mkbabb/glass-ui/package.json:3`) |
| Run | **2026-07-28, pass 3.** Passes 1 and 2 are preserved beside this file as `challenge-D-design.2026-07-27-pass1.md` and `challenge-D-design.2026-07-28-pass2.md`. |
| This seat's probes | `probe-D3-pass3-a.mjs` (empty-state DOM + whole-document tab walk) · `probe-D3-pass3-b.mjs` (seeded 12-colour populated state × desktop / mobile 390 / dark / forced-colors / RTL / 360) · frames in `frames-D3/` |
| Canon read | `PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md`, `OPTICAL-BENCH-COMPOSITIONS.md §3.1/§5` |

**Verdict: DEFECTIVE.** This pass re-derived its numbers independently. It **replicates 12 of the
banked findings from scratch** (§A), **files 4 new ones** (§B), and **refutes nothing**.

---

## What pass 3 is for

Pass 2 is a good report. A third pass that re-narrates it is worthless. So this pass did two things
and only two things:

1. **Independent replication.** I re-derived the load-bearing numbers with my own instruments,
   from the source and the live server, before reading pass 2. §A is the replication table. A
   banked BLOCKER that a second instrument cannot reproduce is not a BLOCKER; all of them
   reproduced.
2. **The gaps.** §B holds the four defects that survive pass 2's coverage — a visual-language
   contradiction, a state that has no design, a design-system boundary crossing, and the gestalt
   claim that ties the file's twenty-odd symptoms to one wrong decision.

---

## The one-sentence gestalt

**This file writes five different jobs onto one flat `<div>`, gives every one of its verbs to a
decoration that the design system had already ruled to be a decoration, and then sites the whole
thing in a route composition that has no seat for it** — so the component is not "buggy", it is
*sited*, *housed* and *voiced* wrongly, and the dead verbs are the downstream symptom of that,
not the disease.

---

# §A · Independent replication of the banked findings

Every row was produced by this seat's own probe, this session, against the live dev server at
`http://localhost:9000`. "Pass-2 ID" names the finding this replicates.

| # | Claim | This seat's own measurement | Pass-2 ID | Result |
|---|---|---|---|---|
| A1 | Every `WatercolorDot` in the file renders as a non-interactive `<span>` | 13 of 13 faces (12 colours + add slot): `tagName:"SPAN"`, `tabIndex:-1`, `aria-hidden:"true"`, computed `pointer-events:none`, `aria-label:null` | D2-01 | **REPRODUCED** |
| A2 | `addCurrentColor` is unreachable by pointer | `page.click(".add-slot-ghost",{force:true})` × 5 with slider nudges between → swatch count **0 → 0** | D2-01 | **REPRODUCED** |
| A3 | The `<Plus>` glyph at `:104` never renders | Full `outerHTML` of the empty well contains the watercolor filter `<svg>` and the ghost-stroke `<span>` and **nothing else** — no lucide node | D2-01 | **REPRODUCED** |
| A4 | The hover action panel is unstyled and lands off-anchor | `.floating-panel` live: `position:"static"` (so its inline `top:305.156px; left:791px` is **inert**), rect `{x:0, y:900, w:1440, h:40}`, `background rgba(0,0,0,0)`, `boxShadow none`, `borderRadius 0px`, `zIndex auto`, `aria-hidden true`; document `scrollHeight 900 → 940` | D2-01 / D2-15 | **REPRODUCED** |
| A5 | `.floating-panel` has no rule anywhere | Live CSSOM walk over every stylesheet including nested rules: **`cssRulesDefiningFloatingPanel: 0`**. Repo-wide grep finds the string only at `SwatchHoverMenu.vue:42`, `useHoverPopover.ts:7` (a comment) and `animations.css:2` (a comment) | D2-15 | **REPRODUCED** |
| A6 | The commit control has no accessible name | Populated well button inventory = exactly one entry: `{name:"<<NO ACCESSIBLE NAME>>", w:32, h:40}` | D2-14 | **REPRODUCED** |
| A7 | The name field has no accessible name | `{ariaLabel:null, labelled:false, id:"", placeholder:"Palette 1"}` | D2-14 | **REPRODUCED** |
| A8 | The component exposes two focusable nodes and both are nameless | `wellFocusables` with 12 colours = `[INPUT "<<NO ACCESSIBLE NAME>>", BUTTON "<<NO ACCESSIBLE NAME>>"]`. 12 colours × 3 verbs = 36 actions, **0 reachable** | D2-01 / D2-14 | **REPRODUCED** |
| A9 | The edit overlay is a desktop-only fork | At 390 px the computed `display` of `.edit-overlay glass-floating hidden lg:flex` is **`none`**, while `isSwatchEditing(i)` still drives `:ghost` at `:37` — so the swatch goes ghost with no commit/cancel anywhere on the surface | D2-18 | **REPRODUCED** |
| A10 | The collision state is announced to nobody | With `"Dup" already exists.` on screen, live regions inside the well = **only** the `ApiOfflineChip` `role="alert"`; the message span has no `role` and no `aria-live`; `document.activeElement` is still the same `INPUT` | D2-02 / D2-07 | **REPRODUCED** |
| A11 | The empty well is a slab | 1440: well `462 × 113.88`; ink (label + ghost) `5 684.7 px²` of `52 610.3 px²` = **10.8 % ink, 89.2 % void**. 390: `324 × 105.59`, `4 404.2 / 34 212.4` = **12.9 %** | D2-22 | **REPRODUCED** |
| A12 | Identity type is off-matrix in family and weight | `.text-small` header computed `{fontFamily:"Fraunces", fontSize:"16.4px", fontWeight:"600"}` against `VISUAL-CONSTITUTION.md:75` — *"control or label … **Plus Jakarta Sans, non-bold**"* | D2-10 | **REPRODUCED** |
| A13 | The `h-8` per-instance override on the commit button does not take | Authored `h-8 w-8` at `:137` → measured **32 × 40**. The width override won; the height was defeated by the producer's own minimum | D2-21 | **REPRODUCED** |
| A14 | Mobile forks the field metrics | Name input `36 px` tall at 1440, `54 px` at 390 — and at 1440 it sits in a `flex items-center` row beside a `40 px` button, so the pair never shares a height | D2-13 area | **REPRODUCED** |

Twelve distinct claims, twelve agreements, two instruments. **No banked finding was refuted by this
pass.**

---

# §B · New findings

## D3-01 · MAJOR — one palette, two irreconcilable specimen species, on one screen

`frames-D3/duplicate-state.png` is a single live frame. In it the *same twelve colours* are drawn
twice:

| | In `CurrentPaletteEditor` | In the saved `PaletteCard` directly below |
|---|---|---|
| Source | `CurrentPaletteEditor.vue:36` `size-class="w-11 h-11 sm:w-12 sm:h-12"` → glass-ui `WatercolorDot` | `PaletteColorStrip.vue:8-24` |
| Form | 12 discrete organic faces, **48 × 48 px measured**, each with its own seeded `border-radius` (e.g. `28.1208% 33.6845% 57.986% 49.3693% / 79.1234% …`) and its own `feTurbulence`/`feDisplacementMap` filter | one continuous band, `flex h-10 w-full` = **40 px tall**, hard-edged, `border-radius: 0`, segments painted by raw `backgroundColor` |
| Reads as | "twelve individual specimens you may act on" | "one indivisible ribbon of provenance" |
| Semantics | (intended) data-bearing | `aria-hidden="true" role="presentation"` |

`VISUAL-CONSTITUTION.md:18` names exactly **one** colour-bearing species — *"Watercolor/data |
swatches, active mark, pastel `Palettes` identity | **the only** ornamental color-bearing
species"*.

The defect is not that a strip exists somewhere in the app. It is that **the single most important
state change on this route — draft becomes saved — is expressed by silently swapping the visual
language for the object.** A user watches twelve blobs become one band. Nothing in the design says
these are the same twelve colours; the two forms share no shape, no size, no edge, no rhythm and
no unit. That is a comprehension failure, not a style inconsistency: the product's stated job is
that a person *"leaves with an understood … color artifact"* (`VISUAL-CONSTITUTION.md:5`), and this
discontinuity sits exactly where the understanding is supposed to be handed over.

**Reproduction.** Seed `localStorage["color-picker"] = {inputColor, savedColors:[12 lab colours]}`;
load `/#/palettes`; type a name; press Enter. The well and the new card are visible at once.
Frame: `frames-D3/duplicate-state.png`. Geometry: measured 48 × 48 (probe) vs `h-10` = 40 px
(`PaletteColorStrip.vue:10`).

**Cure.** One species per object. Either the saved card's compact strip becomes the same seeded
`WatercolorDot` row at a smaller rung — `VISUAL-CONSTITUTION.md:102` authorises *"the card's compact
swatch strip … noninteractive data"*, it does not authorise a *second rendering technology* — or the
well adopts the band and drops the blobs. It cannot be both. This is a `PR-05`-family row (one mark
device per meaning) and it shares an owner with D2-01, because both are resolved by deciding once
what a palette *looks like*.

---

## D3-02 · MINOR — the "nothing to save" state is not designed, and the control that would express it is structurally unreachable

Two predicates on the same expression, twenty lines apart:

```
:118   v-if="savedColorStrings.length > 0"        ← the whole save row
:138   :disabled="savedColorStrings.length === 0" ← the button inside it
```

They are complementary, so the `disabled` arm can never evaluate true — the element it sits on does
not exist when it would. Live: with 12 colours the sole well button reports `disabled:false`; with 0
colours the button is absent from the DOM entirely (the empty-state `outerHTML` ends
`<!--v-if--><!--v-if--><!--v-if-->`).

Two things are wrong and only one of them is dead code:

1. **The dead branch.** Owner edict 2 (no masking fallbacks) and edict 3 (KISS): a guard that
   cannot fire is a guard someone will later trust. `PROPORTION-AUDIT.md §5.5` — a control is
   *"either data, status, labeled action, drag affordance, focus/selection register or removed"*.
2. **The state it pretended to cover has no design at all.** When the tray empties, the entire
   naming-and-commit region *vanishes* rather than resting. The interface teaches a two-step
   grammar — collect, then name and commit — then deletes step two the moment step one is empty,
   taking the explanation of the workflow with it. `VISUAL-CONSTITUTION.md:83` — *"Selected,
   failed, pending, **withdrawn and disabled** states are never color-only. Role, accessible name,
   state/value … are explicit."* A state expressed by *removal* is not expressed.

**Reproduction.** Load `/#/palettes` with an empty tray: `wellFocusables: []` — no input, no
button. Populate: both appear. There is no frame in which the button renders disabled.

**Cure.** Delete `:disabled` — it is a lie — *and* keep the save region mounted and genuinely
disabled at zero colours, with the count line reading `0 colors` instead of the header swapping to
a different sentence. One region, one identity line, one resting action (`PROPORTION-AUDIT.md
§5.2`).

---

## D3-03 · MINOR — a design-system context provider is instantiated per component instance, around a control that cannot fire it

`:88-111`:

```
<TooltipProvider :delay-duration="200">
  <Tooltip>
    <TooltipTrigger as-child>
      <WatercolorDot … />   ← renders <span aria-hidden pointer-events:none>
```

Four nodes of design-system machinery (`TooltipProvider`, `Tooltip`, `TooltipTrigger`,
`TooltipContent`) supporting **zero reachable behaviour**, because the `as-child` target is the same
inert span as A1.

Independently of the dead trigger, the *provider placement* is the boundary defect.
`TooltipProvider` is a context owner. Instantiating it inside a leaf component makes this one
control's `delay-duration` a local opinion (200 ms) that **cannot by construction agree** with any
other tooltip in the app; only a root-level provider makes the delay a system property. Owner
edict 5 — *style at the shadcn/glass root component level, never per-instance overrides* — and
edict 3 (no contrivance).

**Reproduction.** Read `:88`. Live: hovering the add slot produces no tooltip (`pointer-events:none`,
measured A1); no other tooltip in the app shares this provider instance.

**Cure.** One `TooltipProvider` at the app root; delete this one. Once D2-01 is cured and the add
slot is a real named button, the tooltip is redundant with the button's own accessible name and
should go too — `PROPORTION-AUDIT.md §5.6`, *"do not compensate for an unnecessary action with
tooltip proliferation. Subtraction precedes explanation."*

---

## D3-04 · MAJOR — the gestalt: five jobs on one flat `<div>`, in a route composition that has no seat for any of them

This is the finding the other twenty-odd are downstream of, and it is a *design* finding, so it
belongs on this axis.

### (a) Five zones, one container

The `.dashed-well` root renders, top to bottom:

| Zone | Job (`PROPORTION-AUDIT.md §5.2` vocabulary) | Source |
|---|---|---|
| header row: name + count | identity | `:5-23` |
| swatch row + per-swatch hover menu | specimen **and** action | `:24-113` |
| `ApiOfflineChip` | status (`role="alert"`) | `:116` |
| name input + commit button | action | `:117-143` |
| collision message + Update/Cancel | a **second** action, in a different grammar | `:144-167` |

`PROPORTION-AUDIT.md §5.2` — *"A card has one protagonist, one identity line, and **at most one**
persistent action/status region. Additional equal-weight zones require a different
`InstrumentChassis` composition."* This has one identity line and **four** further zones, two of
which are competing action species: a nameless 32 × 40 icon circle and two 36 px text pills
(measured `Update` 61.8 × 36, `Cancel` 59.2 × 36). That is `PR-06` verbatim — *"Three adjacent
action species."*

### (b) There is no seat for it in the ratified composition

`OPTICAL-BENCH-COMPOSITIONS.md:40` fixes the Library's regions exactly — *"owner-state selector;
resource field; selected inspector/actions"* — and adds *"**Field, lane, empty state and inspector
have zero Cards**"*. `CurrentPaletteEditor` is none of the three regions: it is a
compose-and-commit **instrument**, a Generate/Mix-class job, parked inside the Library's field.

And it *is* materially a Card. Measured on the live well: `box-shadow` = the three-step
`--shadow-cartoon-sm` cartoon stamp, plus a `1px dashed` edge, plus a `--well-bg` fill, plus
`border-radius: 16px`. `VISUAL-CONSTITUTION.md:19` — *"One surface has one tier. **An inner card is
not automatically another pane of glass.**"* It also carries **two boundary devices at once** — a
dashed edge *and* a cast shadow — so a *provisional* edge reads as a *raised solid* card. `PR-05`:
*"Dividers, caster shadows and corner marks repeat a boundary → REMOVE."*

### (c) The consequence: the route's protagonist is the wrong object

On the live empty route (`frames-D3/pop-desktop-1440.png` and the tranche's own
`shots/safari-desktop-light/palettes.png`) the pane shows **two dashed empty invitations
simultaneously**: the "Start a new palette" slab, and ~200 px below it the `EmptyPaletteMark`
(*· EMPTY PLATE ·* plus three dashed dots). Same vocabulary, same dashes, same message, twice, in
one column.

Once populated, the scratch tray holds the only saturated colour on the route — twelve blobs —
while the actual protagonist, the saved-palette field, is empty.
`VISUAL-CONSTITUTION.md:34`: *"One pane may have one full-strength visual protagonist. Supporting
fixtures do not compete with it through equal size or equal shadow."*

**Measured growth — the tray is uncapped.** 1440 px: `113.88 px` empty. 390 px:
**`105.59 px` empty → `322.2 px` populated**, i.e. **38 % of an 844 px viewport for a scratch
surface**. 360 px: `308.2 px`, of which the swatch block alone is `170 px`.
`VISUAL-CONSTITUTION.md §3` law 2: *"Empty secondary content occupies at most a narrow invitation
tray (≤ 15 % of the stage) or disappears."*

### Reproduction

All three sub-claims are visible in `frames-D3/pop-desktop-1440.png`, `frames-D3/pop-mobile-390.png`
and the empty capture in the tranche's own visual audit; numbers from `probe-D3-pass3-b.mjs`.

### Cure — architectural, not a patch

Split by job and let each land in a region that already exists in the ratified composition:

- The **draft tray** (identity + specimen row) is the Library's *empty-state / draft lane* content.
  It collapses to a tray when empty (`§3` law 2) instead of reserving a slab.
- The **naming and commit** step is the *selected inspector / action* region — where the
  constitution already puts *"rename/lifecycle/export actions and durable operation state"*
  (`VISUAL-CONSTITUTION.md:102`).
- The **collision decision** is a confirmation inside that same action region, in the one glass-ui
  action set (`§5`: *"Commit uses one glass-ui action set"*), not a third inline grammar.
- The **backend status** does not belong in a user's palette editor at all.

That split dissolves D3-02 (the save region gains a home and can rest), most of D2-19, `PR-05`'s
double boundary, `PR-06`'s three action species, and it removes the second dashed invitation.

---

# §C · Visual truth — what my own frames show

**Desktop light, empty.** A full-bleed dashed rectangle, `462 × 113.88`, containing a `147 × 23`
label and one `48 px` pale ghost pinned to the top-left. 89.2 % of it is nothing. It casts a hard
three-step cartoon shadow, so a dashed (= provisional) edge reads as a raised solid card: the two
materials contradict one another. Below it, the EMPTY PLATE mark says the same thing again in the
same dashes.

**Desktop light, populated, hovering swatch 1** (`frames-D3/hover-panel-full.png`). This frame
should end the argument. The pencil / copy / trash icons for the hovered swatch render **at the
bottom-left corner of the document**, 900 px below the swatch, as three bare glyphs on the page
background — no panel, no shadow, no radius, no ground — and they grow the document by 40 px.
Simultaneously the `DEV MISCONFIGURED` chip is visible **twice**: floating at top-right and again
inside the palette well.

**Mobile 390, populated** (`frames-D3/pop-mobile-390.png`). The swatch block wraps 5 / 5 / 3 — the
last row is 40 % empty, and the add slot is its third tile. So **the primary "add" affordance
relocates every time the count crosses a multiple of five**, and it is visually identical to "an
empty thirteenth slot": no `+`, no label, no interactivity. The well is 322 px of an 844 px
viewport. The `role="alert"` configuration banner sits in the middle of the user's palette, between
their colours and the name field.

**Dark** (`frames-D3/pop-desktop-dark.png`). Fill `oklab(0.345 …)`, edge
`oklab(0.925 … / 0.12)` — a 12 %-alpha hairline on a dark plate — and both header lines resolve to
the *same* ink `rgb(195,185,172)`, so the identity label and the value count are separated only by
family and size, never by ink hierarchy. Pass 2's corrected contrast figures (5.08 : 1 light,
5.97 : 1 dark) stand; the defect here is the flattened hierarchy, not the ratio.

**Forced colors** (`frames-D3/pop-forced-colors.png`). The well loses its `--well-bg` ground
entirely; the dashed edge survives, so the "well" becomes an outline floating on the pane. The
`DEV MISCONFIGURED` chip loses its destructive red and becomes ordinary neutral text — the only
things distinguishing "misconfigured" (a loud state) from "backend offline" (a quiet one) were
colour and a filled-versus-open 6.4 px dot. `VISUAL-CONSTITUTION.md:83`: *"never color-only … in
both schemes, forced colors and reduced transparency."*

**RTL** (`frames-D3/pop-rtl.png`). The swatch row mirrors (`firstDotX 625 > lastDotX 335`) with no
ordinal announcement of any kind, and the collision message renders a user-supplied palette name
straight into RTL prose with no LTR isolation (`:149` — `"{{ duplicateTarget.name }}" already
exists.`). `VISUAL-CONSTITUTION.md §6.1`: *"CSS strings, hex, slugs, IDs and provenance | render in
LTR-isolated spans inside RTL prose."*

**360 px** (`frames-D3/pop-360.png`). `docOverflowX: 0` — no horizontal overflow. This is one of the
places the component is clean and I record it as such.

---

# §D · State coverage matrix

The brief asks for every state enumerated. This is the whole set. "Unreachable" means the state
exists in the source and cannot be produced in the shipped app.

| State | Designed? | Evidence |
|---|---|---|
| empty | yes, but as an 89.2 %-void slab that does not content-hug | A11, D3-04 |
| populated | yes | measured |
| **the only path from empty → populated** | **dead** | A2 — `pointer-events:none`, 0 → 0 |
| loading / request in flight | absent — no skeleton, no pending affordance on save | source |
| error (save failed) | absent — `emit("saved")` is fire-and-forget and the tray is cleared unconditionally at `:262-264` | `:261-265` |
| error (name collision) | present, but unannounced, unassociated, and in a third action grammar | A10, D3-04(a) |
| disabled (nothing to save) | **structurally unreachable** | **D3-02** |
| focused | only two nodes are focusable and both are nameless | A8 |
| hovered (swatch) | renders an unstyled strip at the document's bottom edge | A4 |
| active / pressed (swatch) | unreachable | A1 |
| selected / being edited | ghost silhouette only; commit/cancel is `hidden lg:flex` | A9 |
| dragging / reorder | absent — no reorder affordance for palette colours at all, though `§5.2` specifies one | source |
| overflowing / wrapping | wraps, uncapped, and relocates the primary action | D3-04(c) |
| truncated (long palette name) | absent — no `maxlength`, no ellipsis, no measure | `:125-133` |
| RTL | mirrors; no ordinal announcement; no LTR isolation of names or CSS literals | §C |
| reduced motion | inherited global guard at `animations.css:184-192` neutralises it — **correct**, recorded as such | `animations.css:184` |
| forced colors | ground lost; status distinguishable only by colour | §C |
| 360 px / narrow | no overflow — **clean** | §C |
| backend offline | shown, but gated on `savedColorStrings.length > 0` — suppressed exactly when a first-time user would need it | `:116` |

Nineteen states. **Four are designed and correct** (populated, reduced motion, narrow-viewport
reflow, and the singular/plural count copy at `:21`). Six are unreachable or dead. Five are absent
entirely.

---

# §E · Motion

The file keys the correct family — `vj-enter`, one of the three sanctioned names
(`animations.css:67-77`) — and animates only `opacity` and `transform`, neither of which forces
layout. The global reduced-motion guard covers it. On the axis's own terms, the motion *tokens* are
right.

What is wrong is what they are attached to:

- `.swatch-row > .vj-enter-leave-active { position: absolute }` (`utils.css:177`) lifts a leaving
  dot out of flow, but neither `.swatch-row` nor `.dashed-well` establishes a containing block, so
  the leaving dot positions against whatever positioned ancestor happens to exist above it. *(This
  is the CSS reading; pass 2 measured the landing box — see D2-05. I did not re-measure it and do
  not claim a coordinate.)*
- `useSwatchActions.ts:45-53` keys each swatch `${color}::${i}`. Removing a mid-list colour changes
  the index of every survivor, so every survivor gets a fresh key and unmounts/remounts. The
  `.vj-enter-move` FLIP class the shared recipe advertises (*"neighbours reflow on the family move
  class"*, `utils.css:172`) therefore **can never fire for a survivor**. This reproduces pass 2's
  D2-16 by reading; I could not exercise it live because the remove verb is dead (A1).

So the motion defect is the same defect as everything else: correct tokens, attached to a structure
that cannot deliver them.

---

# §F · Two notes that are not findings

**On the `role="alert"` dev banner.** `ApiOfflineChip` is self-gating
(`ApiOfflineChip.vue:12-24`) and renders nothing against a correctly-configured backend. My probes
ran against `npm run dev:web-only`, so the `misconfigured` arm fired. The chip's *presence* in my
frames is a local environment fact and I do not file it as a product defect. What **is** a product
fact — and is filed inside D3-04 — is that a maintainer-addressed configuration alert is mounted
inside a user's palette editor and gated on the user's palette length.

**On the empty-state ghost's `Plus`.** Pass 2 established that the glyph never renders. I reproduce
it (A3) rather than re-file it.

---

# §G · Ranked disposition

| ID | Severity | Family | Owner |
|---|---|---|---|
| D2-01 (replicated: A1–A3, A8) | BLOCKER | dead specimen host — the `P051` abrogation at `VISUAL-CONSTITUTION.md:91` was executed by the producer and never by this consumer | the wave owning `WatercolorDot` seats |
| D2-15 (replicated: A4–A5) | BLOCKER | phantom CSS atom `.floating-panel` — 0 rules in the live CSSOM, the exact `inv-N-7` failure that `.dashed-well` was minted to cure (`utils.css:86`) | same |
| D2-02 (replicated: A10) | BLOCKER | destructive confirmation with no association, no announcement, no focus move | same |
| **D3-04** | **MAJOR (gestalt)** | **five jobs, one div, no seat in the ratified composition** | **W18 / W22 — the composition owner** |
| **D3-01** | **MAJOR** | **two specimen species for one object** | **the palette-specimen owner, with D2-01** |
| **D3-02** | MINOR | unreachable `disabled` arm; undesigned "nothing to save" | as D3-04 |
| **D3-03** | MINOR | per-instance design-system context provider | as D3-04 |

`D3-04` is the row I would fix first if only one could be fixed, because all three BLOCKERs resolve
*inside* it: deciding where this component lives forces the decision about what its verbs are
attached to — the decision the file has been deferring since R.W4.

---

## Artefacts

| path | what |
|---|---|
| `challenge-D-design.md` | this report (pass 3) |
| `challenge-D-design.2026-07-28-pass2.md` | the preserved pass-2 report — its 27 findings stand; §A here replicates twelve of them |
| `challenge-D-design.2026-07-27-pass1.md` | the preserved pass-1 report (its D-8 was retracted in pass 2 §0) |
| `probe-D3-pass3-a.mjs` | empty-state `outerHTML`, add-slot inertness, whole-document tab walk |
| `probe-D3-pass3-b.mjs` | seeded 12-colour populated state × desktop 1440 / mobile 390 / dark / forced-colors / RTL / 360; live CSSOM phantom-class walk; hover-panel geometry; collision-flow live regions |
| `frames-D3/hover-panel-full.png` | **the frame that ends the argument** — the action menu at the document's bottom-left corner |
| `frames-D3/hover-panel-viewport.png` | the same hover, viewport crop |
| `frames-D3/pop-desktop-1440.png` · `pop-mobile-390.png` · `pop-desktop-dark.png` · `pop-forced-colors.png` · `pop-rtl.png` · `pop-360.png` | the populated state across the matrix |
| `frames-D3/duplicate-state.png` | the collision state **and** the D3-01 two-species frame |

**No source file was edited by this seat.** Every write is confined to
`docs/tranches/V/megatranche/audit/components/CurrentPaletteEditor/`.

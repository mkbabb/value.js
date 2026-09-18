# CHALLENGE-D — AuroraPane design audit

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, as declared at
spawn. The seat is declared, not inherited.

---

## Verdict

**DEFECTIVE.** Thirteen substantive design defects, two of them blockers. The component is not
"a good form that needs polish" — it is a **form for a thing it hides**, built from a hand-rolled
row primitive that sits eighteen inches from the glass-ui row primitive its own sibling rows use.
Every alignment, rhythm, tap-rung, label-association and typographic-hierarchy defect below is a
downstream consequence of that one wrong decision.

The strongest single finding is **D-2**: in the component's primary interaction state — the open
Select — **193,875 px² of underlying interface reads straight through the menu** on desktop. Two
text runs occupy the same pixels. `/#/atmosphere` was absent from every state matrix in
`audit/visual/states.mjs:18`, so no capture in this repository had ever held that state open.

---

## Evidence provenance

Everything below is a measured number, a pasted computed style, or a pixel in a screenshot I
opened. Nothing is inferred from reading source alone.

| artefact | what it is |
|---|---|
| `docs/tranches/V/megatranche/audit/components/AuroraPane/probe-D.mjs` / `.json` | geometry, typography, acreage, tap targets, open-menu, focus — 7 matrices |
| `.../probe-D2.mjs` / `.json` | label-click reproduction, voice comparison, declared-vs-computed, reload persistence, forced-colors focus, zoom menu |
| `.../probe-D3.mjs` / `.json` | open-menu occlusion area, surface alpha, PreviewStrip specimen size |
| `.../frames/*.png` | 6 states never before captured for this route |
| `audit/visual/shots/safari-{desktop,mobile}-{light,dark}/atmosphere.png` | the four shipped Safari captures, read visually |

```
$ node docs/tranches/V/megatranche/audit/components/AuroraPane/probe-D.mjs
$ node docs/tranches/V/megatranche/audit/components/AuroraPane/probe-D2.mjs
$ node docs/tranches/V/megatranche/audit/components/AuroraPane/probe-D3.mjs
```

**Evidence gap I closed.** `audit/visual/states.mjs:18` reads
`const ROUTES = ["#/", "#/gradient", "#/browse", "#/blob", "#/admin/users"];` — `#/atmosphere` is
in none of them. `ls audit/visual/shots/{zoom-200-desktop,rtl-desktop,forced-colors-desktop,keyboard-focus-desktop}/`
returns five files each, no `atmosphere.png`. Zoom-200, RTL, forced-colors, keyboard-focus and
open-dropdown for this component were **unmeasured** before this seat.

---

## D-1 · BLOCKER · The atmosphere pane has no atmosphere in it

`/#/atmosphere` renders **zero preview surface**. Measured, every matrix:

```
desktop-light  canvasesInMain: 0   canvasesInPage: 1   cardShareOfViewport: 52.54 %
desktop-dark   canvasesInMain: 0   canvasesInPage: 1   cardShareOfViewport: 52.54 %
mobile         canvasesInMain: 0   canvasesInPage: 1   cardShareOfViewport: 76.31 %
zoom-200       canvasesInMain: 0   canvasesInPage: 1   cardShareOfViewport: 53.41 %
```

The single canvas is the app-shell aurora, which lives **outside `main`** and is the page ground.
The pane's Card (1042 × 653.42 at 1440 × 900) is stacked directly on top of it. So the seven knobs
tune a surface the form is occluding while you tune it, and four of the seven —
harmony / arrangement / medium / motion — have no other read-out anywhere in the component.

This is the canon's named row, verbatim and unremedied:

- `PROPORTION-AUDIT.md:54` — `| PR-10 | Atmosphere/Blob form acreage exceeds preview | **TIGHTEN** |`
- `VISUAL-CONSTITUTION.md:29` — "Configuration panes show preview first, controls second.
  **Atmosphere/Blob preview area is larger than the form at every desktop size.**"
  Measured: form 52.54 % of the viewport, dedicated preview **0 %**.
- `VISUAL-CONSTITUTION.md:51` — Atmosphere shall be "persistent Aurora preview | compact atom
  essentials plus scroll-confined advanced disclosure | **preview, essentials, advanced**".
  There is no preview, no essentials/advanced split; all seven knobs sit at one flat rung.
- `VISUAL-CONSTITUTION.md:214` — "every select/axis has an observable effect on **its live
  preview**." There is no live preview to observe.

**Mechanism.** The pane was built as `ConfigSliderPane`-with-extra-rows — a settings card — when
the constitution specifies an *instrument*: a preview-dominant stage (66.6666667 %) with the
controls subordinate. `ConfigSliderPane.vue:98-101` hard-codes `w-full h-full` Card; there is no
stage slot to put a preview in, so the pane could not host one even if AuroraPane asked.

**Reproduction.** `node probe-D.mjs` → `out["desktop-light"].acreage.canvasesInMain === 0`.
Or: open `frames/desktop-light-harmony-open.png` — the aurora is visible only in the margin strip
around a card that fills the centre of the screen.

**Cure (transposition, not patch).** Transpose the route to the constitution's `preview-dominant`
instrument: a bounded, live aurora stage occupying 66.6666667 % of the desktop scene with the
control column at 33.3333333 %, and mobile as stage → inspector → action per `§3.6`. The stage is
the same renderer, *bounded and foregrounded* rather than the page ground the form sits on. That
single change also gives arrangement / medium / motion the observable effect `§214` requires,
which nothing else can.

---

## D-2 · BLOCKER · The open menu does not occlude what it covers

This is the state no matrix had captured. Open `frames/desktop-light-harmony-open.png` and
`frames/mobile-harmony-open.png`.

Measured overlap between the open listbox and content-bearing elements beneath it:

```
desktop 1440×900                                 mobile iPhone 14
 aurora-row-label "Arrangement"        862 px²    "Arrangement"           592 px²
 control-surface  "Scattered"       30,634 px²    "Scattered"           7,266 px²
 control-surface  "Smooth"          32,328 px²    "Smooth"              8,712 px²
 control-surface  "Drifting"        32,328 px²    "Drifting"            8,712 px²
 configurator-row "Colour Energy…"  53,808 px²    "Colour Energy0.760" 17,614 px²
 configurator-row "Noise0.500"      43,915 px²    "Noise0.500"         17,614 px²
                                                  "Zones6"              3,379 px²
 TOTAL                            193,875 px²     TOTAL                63,889 px²
```

with the surfaces measured as:

```
contentBg        oklab(0.955861 0.009528 0.029646 / 0.7488)     ← α 0.75
optionBg         oklab(0.915631 0.00547  0.013051 / 0.52)       ← α 0.52
contentBackdrop  blur(11px) saturate(1.6)
contentOpacity   1
```

α 0.52 on the option rows plus an 11 px blur is not enough veil to hide 16.4 px text sitting on a
chromatic aurora. The screenshots are unambiguous: on mobile, "Scattered" reads *through*
"Analogous", "Smooth" through the gap above "Complementary", "Drifting" through "Split
Complementary", and the Colour Energy slider track runs straight across "Triad". Two text runs,
one set of pixels. This is not a taste call; it is a legibility failure in the component's
primary interaction state.

**Mechanism.** Two compounding causes. (a) The menu surface recipe is producer-owned and tuned for
an opaque-ish app background, not for a translucent card over a live chromatic canvas.
(b) AuroraPane makes the menu enormous — the trigger is 897.86 px wide (D-3), so the menu inherits
889.86 px and covers three sibling rows plus two slider rows instead of a compact list beside its
own row.

**Reproduction.** `node probe-D3.mjs`; or navigate to `http://localhost:9000/#/atmosphere`, click
the Harmony trigger, and read the text behind the menu.

**Cure.** Demo-side: shrink the menu to its content (D-3's cure removes the 890 px inheritance) and
stop covering the whole form. Producer-side: this needs a **coordination packet, not a wave** —
glass-ui's SelectContent needs a resting opacity (or an opaque scrim beneath the blur) that is
sufficient for content-over-chroma compositions. `glass-ui@^7.0.0` is not ours to edit this
formation.

---

## D-3 · MAJOR · Four control edges, three different left margins

Measured trigger `x`, desktop 1440 (LTR):

| row | label width | trigger x | trigger w |
|---|---:|---:|---:|
| Harmony | 82.14 | **318.14** | 897.86 |
| Arrangement | 129.06 | **365.06** | 850.94 |
| Medium | 70.41 | **306.41** | 909.59 |
| Motion | 70.41 | **306.41** | 909.59 |

Spread = 365.06 − 306.41 = **58.65 px**. Mobile (390 px viewport): 115.11 / 155.17 / 105.09 /
105.09 → spread **50.08 px**, which is **14.0 % of the 358 px card**. RTL mirrors the defect rather
than fixing it — in `frames/rtl.png` the four chevrons land at four different `x`.

**Mechanism.** `AuroraPane.vue:187-192`:

```css
.aurora-row { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
```

`space-between` anchors the label left and the control right, so the control's inline-start is a
function of the label's text length. A label column and a control column are a **grid**, not a
`space-between` flex row. Four rows, four label lengths, four (well, three) start edges.

This is the visible ugliness in `shots/safari-mobile-light/atmosphere.png` — the four pills form a
zig-zag left edge that no amount of colour work can rescue.

**Cure.** Delete `.aurora-row` and render through `ConfiguratorRow` (see D-4), which already gives
the slider rows their single spine.

---

## D-4 · MAJOR · A hand-rolled row primitive beside the glass-ui one, in the same card

`ConfigSliderPane.vue:137` renders every slider row through **`ConfiguratorRow`** imported from
`@mkbabb/glass-ui/configurator` (`ConfigSliderPane.vue:21`), with the file's own header comment at
lines 6-10 stating the law:

> "glass-ui already ships `./configurator` with ConfiguratorRow + useConfiguratorState. This
> component uses ConfiguratorRow for each labeled row so the demo composes the existing glass-ui
> surface rather than rebuilding the row primitive."

AuroraPane then fills that same component's default slot with **a second, hand-rolled labeled-row
primitive** (`AuroraPane.vue:118-180`, `.aurora-row` + `.aurora-row-label`). One card, two row
primitives, seven rows split 4/3 between them.

Everything else in this report is the bill for that decision:

| consequence | finding |
|---|---|
| ragged control edge | D-3 |
| broken vertical spine, two rhythms | D-5 |
| 36 px tap rung while the sibling rows get 44 px | D-6 |
| inert, unassociated label | D-7 |
| leaf label wearing the group-title voice | D-8 |
| four dead style declarations | D-9 |

Owner edict 4 ("Glass-ui is the design system — reuse existing component-type names") and edict 3
(KISS, no contrivance) both land here. `.aurora-row-label`'s five declarations
(`AuroraPane.vue:194-200`) are also a **verbatim copy** of `.config-section-title`
(`ConfigSliderPane.vue:237-243`) — same five properties, same values, copied not shared.

**Cure.** Delete both scoped classes and both the wrapper `<div>`s; render the four enum atoms as
`ConfiguratorRow`s whose slot carries the `Select` instead of the `Slider`. Verify first whether
`ConfiguratorRow` wires `for`/`id` for a non-slider control; if it does not, that is the second
coordination packet.

---

## D-5 · MAJOR · The card has two vertical spines 15 px apart, and two rhythms

```
desktop  cardX 199  auroraLabelX 224  sectionTitleX 239  sliderRowX 239   Δ = 15 px
mobile   cardX  16  auroraLabelX  33  sectionTitleX  48  sliderRowX  48   Δ = 15 px
```

The enum labels start 15 px to the left of every other label in the card, at both viewports.
Cause: `.console-well` begins at x = 224 (the same inset as the enum block) but adds
`padding: 0.75rem 0.875rem` (`ConfigSliderPane.vue:189`), pushing its contents to 239 — and the
enum block never enters the well. Visible in `shots/safari-desktop-light/atmosphere.png`: "HARMONY"
hangs left of "FIELD" and "Colour Energy".

Rhythm, same measurement run:

```
auroraRowH   36.00 (desktop)   36.00 (mobile)      auroraRowGaps  [12, 12, 12]
sliderRowH   60.94 (desktop)   77.59 (mobile)      sliderRowGaps  [6, 6]
```

Two defects in one table. First, the **looser gap sits on the shorter rows** and the tighter gap on
the taller ones — optically backwards; taller rows need more air, not less. Second, the aurora rows
are a **hard 36 px at both viewports** (`h-9`, `AuroraPane.vue:122,142,156,170`) while the sibling
rows are container-scaled — `ConfigSliderPane.vue:216` gives them
`min-block-size: clamp(2rem, 7cqi, 2.625rem)` and they grow 60.94 → 77.59.

`VISUAL-CONSTITUTION.md:33` (§3.7): *"Spacing is container-scaled from glass-ui tokens. No
desktop-tight/mobile-airy fork and no breakpoint pile."* AuroraPane's rows are the only fixed-metric
rows in the pane, and its enum block carries the breakpoint pile `px-4 sm:px-6 pt-2 pb-1`
(`AuroraPane.vue:118`).

---

## D-6 · MAJOR · Four dead declarations on the same element — the design intent never renders

`probe-D2.json.deadDeclarations`, read off the live Harmony trigger:

```
classList              …text-dropdown … h-9 text-caption min-w-menu
selectFontToken        "Fira Code", "Fira Code Fallback", "Fira Mono", monospace
computedFontFamily     "Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif
typeCaptionToken       clamp( 0.75rem, 0.71rem + 0.21vw, 1rem )
typeCaptionResolvedPx  14.375px
computedFontSize       16.4px
computedFontStyle      italic
```

1. **`text-caption` is dead.** It asks for `--type-caption` = **14.375 px**; the element computes
   **16.4 px**. The producer class list already carries `text-dropdown` and wins. Present on all
   four triggers (`:122,142,156,170`) and all eighteen `SelectItem`s.
2. **`--select-font: var(--font-mono)` is dead.** `foundation.css:371-373` declares it a "PROJECT
   OVERRIDE: monospace fonts for Select and DropdownMenu triggers"; it resolves correctly at
   `:root` to Fira Code, and the trigger computes **Plus Jakarta Sans**. The override does not
   reach Glass 7's trigger.
3. **`max-h-[16rem]` is dead.** 16 rem = 256 px. The open Harmony menu measures `h: 322.28`,
   `scrollH === clientH === 320`, `scrollable: false`. The cap is not applied.
4. **`min-w-menu` is inert.** The producer already puts `w-full` on the trigger; the measured widths
   (850.94–909.59) are flex-fill, never a min-width.

Owner edict 5 — "Root-level styling: style at the shadcn/glass root component level, **never
per-instance overrides**". Four per-instance overrides, four failures, silently. The rendered
component is not the component that was designed, and nothing in the build says so.

Consequence that matters visually: `font-style: italic`. The selected value of every one of the
four controls renders italic, in both schemes, at every viewport. In this app the italic register
belongs to the pane *description* (`PaneHeader.vue:29`, `.pane-header-desc` — visible italic in
every screenshot). So the row's protagonist — the current value — wears the voice of explanatory
prose, which reads as placeholder text. AuroraPane never asks for italic; it accepts it.

---

## D-7 · MAJOR · The visible label is not a label

```
labelTag SPAN   labelHasFor false   trigAriaLabelledby null   labelCursor "auto"
trigAriaLabel   "Palette harmony"   (visible text: "HARMONY")
```

Clicking "HARMONY" does nothing. Measured before/after in `probe-D2.json.labelClick`:

```
before { expanded: "false", focused: "BODY" }
after  { expanded: "false", focused: "BODY", listboxOpen: false, labelCursor: "auto" }
```

A `<span>` (`AuroraPane.vue:120,140,154,168`) that is styled exactly like a form label, positioned
exactly where a form label goes, and does none of a form label's work: no `for`, no
`aria-labelledby`, no click-to-focus, no pointer affordance, no hit area contribution. The
adjacent slider rows get the association free from `ConfiguratorRow`'s `label` prop
(`ConfigSliderPane.vue:139`).

Secondary: the accessible name is a *second vocabulary* — "Palette harmony" / "Zone arrangement" /
"Painterly medium" / "Motion register" against the visible "HARMONY" / "ARRANGEMENT" / "MEDIUM" /
"MOTION". Each accessible name happens to contain its visible string, so WCAG 2.5.3 is not breached
— but two names for one knob is a seat-law defect (`PROPORTION-AUDIT.md:70-71`: every surviving
control seat has *a* name, singular).

---

## D-8 · MAJOR · Hierarchy inversion: leaf labels wear the group-title voice

`probe-D2.json.voice`, three labels in one card:

| element | family | size | weight | tracking | case | colour |
|---|---|---|---|---|---|---|
| `.aurora-row-label` "Harmony" (**leaf**) | Fira Code | 16.4px | 400 | 1.64px | uppercase | rgb(112, 89, 66) |
| `.config-section-title` "Field" (**group**) | Fira Code | 16.4px | 400 | 1.64px | uppercase | rgb(112, 89, 66) |
| `.configurator-row` "Colour Energy" (**leaf**) | Plus Jakarta Sans | 16.4px | 500 | normal | none | rgb(28, 25, 23) |

The two rows that differ in **rank** are byte-identical. The two rows that are **peers** differ in
family, weight, tracking, case *and* colour. Exactly inverted. Look at
`shots/safari-desktop-light/atmosphere.png`: "HARMONY" and "FIELD" are indistinguishable; "HARMONY"
and "Colour Energy" look like different kinds of thing.

The colour split compounds it: the enum labels are muted `rgb(112,89,66)` while the slider labels
are full-strength `rgb(28,25,23)`. The four enum rows therefore read as **secondary or disabled**
relative to the three slider rows, when all seven are peer atoms of the same `AuroraAtoms` door.

**Label:value proportion**, against `PROPORTION-AUDIT.md:15` ("exactly one adjacent glass-ui golden
typography rung smaller… `label/headline = 1/√φ`", i.e. **0.786**):

```
desktop  label 16.4px : value 16.4px  →  ratio 1.000   (no hierarchy at all)
mobile   label 14px   : value 21px    →  ratio 0.667   (value 1.5× the label)
```

The relation does not merely miss the target — it **inverts direction between viewports**, which
`PROPORTION-AUDIT.md:16` forbids outright: *"Mobile and desktop use the same source."* Here the two
rungs resolve from two different clamps that cross somewhere between 390 px and 1440 px.

---

## D-9 · MAJOR · Nothing the pane does survives a reload — including the app's only motion stop

```
probe-D2.json.persistence
{ "set": "Still", "afterReload": "Drifting", "persisted": false }
```

Set Motion → Still, reload → Drifting. Every atmosphere tuning is destroyed on reload.
`useAtmosphere.ts:128` is `reactive(structuredClone(DEFAULT_AURORA_ATOMS))` with no storage read or
write anywhere in the chain.

Two canon breaches:

- `VISUAL-CONSTITUTION.md:145` — "Continuous Aurora/Blob ambient motion terminates within five
  seconds **or exposes one persistent keyboard-operable still/pause control whose state is
  announced and remembered**." The Motion select is the app's only still control. It is not
  persistent (route-local, behind a Dock navigation), not announced as a motion control (its
  accessible name is "Motion register"), and — measured — **not remembered**.
- `VISUAL-CONSTITUTION.md:99` — "Persistent operation state stays with the entity/workspace."

The only escape hatch is **Copy JSON**, which (a) has no matching import anywhere in the app, so it
is write-only, and (b) serialises `config` = the atoms object — which `useAtmosphere.ts:132-139`
has written the live picker `seed` onto. So the export silently includes a colour the user did not
ask to export, and nothing can consume the result.

---

## D-10 · MAJOR · Advanced knobs first, essentials below the fold

Measured block heights (identical at both viewports because D-5's rows do not scale):

```
enumBlockH 192.00        wellH  261.77 (desktop)  /  307.78 (mobile)
```

The four **advanced** enum atoms consume 192 / (192 + 261.77) = **42.3 %** of the pane's control
acreage on desktop, 38.4 % on mobile, and they sit **above** the three continuous atoms that give
immediate feedback. `VISUAL-CONSTITUTION.md:51` specifies the order "preview, **essentials**,
advanced".

The cost is truncation:

```
mobile     scrollH 632  clientH 456  hidden 176 px  = 27.8 % of the form
zoom-200   scrollH 567  clientH 259  hidden 308 px  = 54.3 % of the form
desktop    scrollH 574  clientH 574  hidden   0
```

And the clip lands badly. In `shots/safari-mobile-light/atmosphere.png` the cut falls **between
"Noise 0.500" and its slider** — the label is visible, the control it names is not. A scroll region
that severs a label from its control is a rhythm defect regardless of the scroll affordance;
`ConfigSliderPane.vue:104-105` explicitly reasoned about the *footer* never occluding a slider, but
not about the scroll boundary bisecting a row.

At 200 % zoom the header plus the four enums fill the entire 259 px window; the essentials are
wholly below the fold. (`overflowX` is 0 at every matrix, so WCAG 1.4.4 reflow itself is not
breached — see negative results.)

---

## D-11 · MINOR · The palette specimen is the smallest thing in the row that exists to show it

The `PreviewStrip` (`AuroraPane.vue:130-133`) is the reason the harmony row was built (T-17,
"the palette each candidate harmony would resolve from the CURRENT atoms"). Measured, desktop:

```
optionRect          { w: 889.86, h: 51.69 }
chips               4 × { w: 10.47, h: 16.39 }
stripTotalW         41.88          →  4.7 % of the option's width
optionTextWidthShare 8.29 %
```

A 41.88 px specimen in an 889.86 px row. **~87 % of every option row is empty.** Six harmonies,
each represented by four 10 px chips, are meant to be compared against each other — at 10 px a
chip, chroma differences between `analogous` and `split-complementary` are barely resolvable, and
`frames/desktop-light-harmony-open.png` shows the strips are additionally washed out by the α 0.52
option surface (D-2) sitting over them.

`PROPORTION-AUDIT.md:5` names this failure in its opening sentence: *"The glass-ui golden ladders
supply adjacent rungs; they do not excuse a mechanically large gap, **an undersized specimen**, or
decoration without information."*

Compounding: the strip exists **only inside the open menu**. The closed trigger — the state the
control is in essentially always — shows the word "Analogous" and nothing else. On a pane whose
entire subject is colour, the closed state of its colour control carries zero colour. Arrangement,
Medium and Motion have no preview at any time, in any state.

---

## D-12 · MINOR · The Zones slider ships pinned at its own ceiling

`AuroraPane.vue:103` — `{ key: "zones.count", label: "Zones", min: 1, max: 6, step: 1 }`.
`aurora-atoms.ts:56` — `zones: { count: 6, … }`.

Default **equals maximum**. The slider ships with five units of downward travel and zero upward;
the thumb is jammed against the right cap in every one of the four Safari captures (visibly
clipping the track's rounded end in `shots/safari-desktop-dark/atmosphere.png`). A control whose
rest state sits on a boundary communicates "broken / maxed out", not "tuned".

Also a duplicated producer constant with no seam: `aurora-atoms.ts:36-38` documents
`MAX_NUCLEI = 6, presets.ts:346 — a shader #define`, and `AuroraPane.vue:103` hand-copies the 6.
Two copies of one producer number; a producer ceiling lift silently desynchronises them.

---

## D-13 · MINOR · A ternary with two identical branches, and an unreachable atom

`AuroraPane.vue:85-91`:

```ts
function setMedium(v: AcceptableValue) {
    // `smooth` carries no texture amount; textured mediums let glass-ui apply
    // its own default amount (the atom shape forbids an `amount` on `smooth`,
    // and an absent `amount` on a textured kind is valid — glass-ui defaults it).
    const kind = String(v) as AuroraMedium;
    atoms.medium = kind === "smooth" ? { kind } : { kind };
}
```

Both branches evaluate to `{ kind }`. Four lines of comment describe a distinction the code does
not make. The design intent it records — that textured media carry a texture `amount` — is real,
and `medium.amount` is **not exposed anywhere in the pane**, so choosing `watercolor` or `vangogh`
gives the user a medium with no way to tune its strength. Seven "knobs" is the door; the pane
reaches six and a half.

---

## INFO — observed, attributed elsewhere

- **D-14 · no `<h1>` on the route.** `audit/visual/REPORT.md:126,141,156,171` — the `h1` column
  reads **0** for `/#/atmosphere` in all four Safari matrices. `PaneHeader.vue:21` renders
  `<h3 class="pane-header-title">`, so the route's only heading is an h3 with no h1 or h2 above it.
  `VISUAL-CONSTITUTION.md §5.1` requires "the single visible H1 exist before app-ready" and routes
  focus to "destination H1". AuroraPane supplies `title="Atmosphere"`; PaneHeader chooses the tag.
  **Owned by the PaneHeader seat** — flagged here, not counted against this component.
- **D-15 · no loading or error state for the pane at all.** `usePaneRouter.ts:77` is a bare
  `defineAsyncComponent(() => import("../scenes/atmosphere/AuroraPane.vue"))` — no
  `loadingComponent`, no `errorComponent`. A chunk-load failure renders nothing, silently. Family-wide.
- **D-16 · `inject(AURORA_ATOMS_KEY)!`** (`AuroraPane.vue:42`) — non-null assertion, no guard. The
  component has no designed state for "provider absent"; it throws on first property read.
- **D-17 · non-idiomatic reactivity with a real cost.** `harmony()`, `arrangement()`, `medium()`,
  `motion()` (`:73-76`) are plain functions invoked in the template rather than `computed`, and
  `auroraHarmonyStops(atoms, h)` (`:132`) runs inside `v-for`. Each render of an open Harmony menu
  performs **six full `resolveCalibratedAtmosphere` palette solves**. Edict 7 (idiomatic Vue 3.5)
  and a design consequence: the comment at `:36-38` claims "zero rest cost", which is true, but the
  open-menu cost is six solves per render, not per open.
- **D-18 · forced-colors is unproven, both ways.** Under WebKit's `forcedColors: "active"`
  emulation the pane renders essentially unchanged (`frames/forced-colors.png`) and focus reports
  `outline: solid 2px rgba(128,188,254,0.6)` — WebKit's own ring, not the app's. The structural
  risk is real and unmeasured: the trigger computes `backgroundColor: rgba(0,0,0,0)` with
  `border: solid 1px color(srgb 0.11 0.098 0.09 / 0.14)` — an **alpha-only boundary**, exactly what
  a real Windows HCM flattens away, and the row has no other boundary. Labelled a **hypothesis**;
  it needs a real HCM machine, not an emulator.

---

## State coverage

A state that was never designed is a design defect. Enumerated:

| state | handled? | evidence |
|---|---|---|
| populated (default) | yes | 4 Safari matrices |
| **empty** | **n/a but unguarded** | no empty state possible; `inject(…)!` has no absent-provider design (D-16) |
| **loading** | **NO** | bare `defineAsyncComponent`, no `loadingComponent` (D-15) |
| **error** | **NO** | no `errorComponent`; no design for a failed atmosphere derive |
| **disabled** | **NO** | no path sets `disabled`; producer classes present, never exercised |
| focused | partial | ring is `outline:none` + a 2 px box-shadow at α 0.30; survives in WebKit, unproven under HCM (D-18) |
| hovered | producer-owned | `glass-capsule-hover` on the trigger; the `.aurora-row` and its label have **no** hover (D-7) |
| active / pressed | producer-owned | `tap-squish` |
| **open (dropdown)** | **BROKEN** | D-2 — 193,875 px² bleed-through; never previously captured |
| selected (in menu) | partial | 1 px pink ring spanning the full 889.86 px option — a second boundary species over the menu's own (PR-05) |
| dragging | n/a | slider drag is `ConfiguratorRow`/producer |
| **overflowing / truncated** | **BROKEN** | D-10 — 176 px hidden mobile, 308 px at 200 % zoom, clip bisects the Noise row |
| RTL | **sound** | mirrors correctly; `overflowX 0`; raggedness mirrors with it (D-3) |
| reduced-motion | root-verified, not re-probed | per seat instruction |
| forced-colors | **unproven** | D-18 |
| zoomed 200 % | partial | no overflow, menu fits — but 54.3 % of the form is below the fold (D-10) |

---

## Canon judgement

| authority | clause | verdict |
|---|---|---|
| `PROPORTION-AUDIT.md:54` | PR-10 Atmosphere form acreage exceeds preview → TIGHTEN | **OPEN** — preview = 0 % (D-1) |
| `PROPORTION-AUDIT.md:5` | "an undersized specimen" | **BREACHED** — 41.88 px strip in an 889.86 px row (D-11) |
| `PROPORTION-AUDIT.md:15-16` | paired rungs at `1/√φ`; one source for mobile and desktop | **BREACHED** — 1.000 desktop, 0.667 mobile (D-8) |
| `PROPORTION-AUDIT.md:49` | PR-05 dividers/boundaries repeat → REMOVE | **AT RISK** — the "FIELD" rule beneath a single-section header, plus the full-width selected-option ring |
| `VISUAL-CONSTITUTION.md:29` | preview larger than the form at every desktop size | **BREACHED** (D-1) |
| `VISUAL-CONSTITUTION.md:51` | preview → essentials → advanced; scroll-confined advanced disclosure | **BREACHED** — no preview, no split, advanced first (D-1, D-10) |
| `VISUAL-CONSTITUTION.md:33` (§3.7) | container-scaled spacing, no breakpoint pile | **BREACHED** — fixed 36 px rows, `px-4 sm:px-6` (D-5) |
| `VISUAL-CONSTITUTION.md:104` | one domain-neutral axis composition over BI Slider | **HELD** — the sliders do ride `ConfiguratorRow` |
| `VISUAL-CONSTITUTION.md:145` | still/pause state announced **and remembered** | **BREACHED** (D-9) |
| `VISUAL-CONSTITUTION.md:214` | "every select/axis has an observable effect on its live preview" | **BREACHED** (D-1) |
| `VISUAL-CONSTITUTION.md §5.1` | one visible H1 per route | **BREACHED**, PaneHeader-owned (D-14) |
| `PALETTE-CONTRACT.md` | — | no clause of the contract is engaged by this component; the strips are live-resolved, not canned (`aurora-harmony-stops.ts:38`), and the vitest oracle holds them to a direct recompute |

## Owner edicts

| edict | verdict |
|---|---|
| 1. no god modules | **CLEAN** — 201 lines, one concern |
| 2. no legacy code / dual paths | **CLEAN** — `demo/ui/select` is a single re-export used by all six Select consumers; no competing direct-glass-ui import exists (`grep -rn "SelectTrigger" demo --include="*.vue" \| grep glass-ui` → 0 imports) |
| 3. KISS, no contrivance | **VIOLATED** — a second row primitive invented beside the existing one (D-4) |
| 4. glass-ui is the design system | **VIOLATED** — `.aurora-row` hand-rolls `ConfiguratorRow` (D-4) |
| 5. root-level styling, never per-instance overrides | **VIOLATED** — four per-instance overrides, all four inert (D-6) |
| 6. animations never deleted | **CLEAN** — the component declares no keyframes, deletes none, hand-rolls no motion; all motion on its surface is producer-owned |
| 7. idiomatic Vue 3.5 | **WEAK** — getter functions where `computed` belongs; six palette solves per open-menu render (D-17) |
| 8. `verbatimModuleSyntax` | **CLEAN** — all four type imports are `import type` (`:25, :26-31, :34`) |

---

## Negative results — what I checked and found sound

Stated so the absence of a finding is evidence, not silence.

- **No horizontal overflow anywhere.** `documentElement.scrollWidth − clientWidth === 0` at
  desktop LTR, RTL, and the 200 %-zoom matrix. The visual REPORT agrees: `horizontalOverflow — 0`.
- **RTL is structurally correct.** `frames/rtl.png` — labels mirror to the inline-end, controls to
  the inline-start, footer button order reverses, no overflow. The only RTL artefact is the bidi
  period leading the description string, which is content/PaneHeader-owned.
- **The 200 %-zoom menu fits.** The longest menu (Medium, 7 options) measures `h: 270` in a 450 px
  viewport, `overflowBottom: −153`, **7 of 7 options visible**, not scrollable. I expected a clip
  here and did not find one.
- **No page errors on the route.** `REPORT.md:126,141,156,171` — `pageErr 0`, `consoleErr 0` in all
  four Safari matrices. The one console error in the whole audit is on `/#/`, not here.
- **The harmony strips tell the truth.** `aurora-harmony-stops.ts:38` resolves through
  `resolveCalibratedAtmosphere({...atoms, harmony})` — the same calibrated path selection uses, held
  to a direct recompute by `test/preview-chips.test.ts`. The strips are too small (D-11) but they
  are not lying.
- **Reduced motion** — not born-RED here, per the root's verified `raf/1.5s = 0` finding.
- **C2 "aurora palette-blind static-Sky"** — not re-litigated. The chronic is producer-signature,
  not AuroraPane's; D-1 is a distinct and larger defect (there is no preview to be palette-blind on).

---

## Proposed cure — one transposition, not thirteen patches

Twelve of the thirteen findings collapse into two moves.

**Move 1 — the pane becomes an instrument.** Transpose `/atmosphere` from "a form card floating over
the page ground" to the constitution's `preview-dominant` composition: a bounded live aurora stage
at 66.6666667 % of the desktop scene, the control column at 33.3333333 %, and mobile as
stage → inspector → action (`§3.6`). Reorder to preview → essentials (colour energy, noise, zones)
→ advanced disclosure (harmony, arrangement, medium, motion). Persist the atoms to the workspace.
This closes **D-1, D-9, D-10**, satisfies PR-10, and is the only thing that can give
arrangement/medium/motion the observable effect `§214` demands.

**Move 2 — delete the second row primitive.** Remove `.aurora-row`, `.aurora-row-label`, and the
wrapper `<div>` at `AuroraPane.vue:118`; render the four enum atoms through the same
`ConfiguratorRow` the three sliders already use, with the `Select` in the control slot. One row
primitive gives, for free: one spine, one container-scaled rhythm, one aligned control edge, the
coarse-pointer 44 px hit rung, the `label`↔control association, and one label voice. This closes
**D-3, D-4, D-5, D-6, D-7, D-8** — and with the menu no longer inheriting a 890 px trigger width, it
removes most of **D-2**'s blast radius.

The residue is small and local: put the `PreviewStrip` on the closed trigger sized to the row
(D-11); make `zones.count` read its ceiling from the producer instead of a hand-copied `6`, and
move the default off the boundary (D-12); delete the identical-branch ternary and either expose
`medium.amount` or stop claiming it (D-13); replace the getter functions with `computed` (D-17).

**Coordination packets — not waves.** glass-ui is `@mkbabb/glass-ui@^7.0.0` and is not ours to edit
this formation. Three producer-side questions, verify-first, to be sent as mail:

1. Does `ConfiguratorRow` accept a non-slider control in its slot with the label association wired?
   Move 2 depends on it.
2. `SelectContent` resting opacity (measured α 0.7488 content / **α 0.52 option**, `blur(11px)`) is
   insufficient to occlude 16.4 px text over a live chromatic canvas — D-2. Producer recipe.
3. Is `--select-font` still a live seam in Glass 7? Measured, the demo's root override does not
   reach the trigger, and the trigger renders sans **italic** — D-6.

---

**Report path:** `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/AuroraPane/challenge-D-design.md`

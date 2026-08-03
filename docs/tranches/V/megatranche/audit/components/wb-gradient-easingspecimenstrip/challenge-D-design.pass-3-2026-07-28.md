# CHALLENGE-D — `EasingSpecimenStrip.vue` — the design is flawed · **PASS 3**

## Model receipt

I observe myself to be **Opus 5** — exact model ID `claude-opus-5[1m]`, the 1M-context arm. That is
the tier this seat was explicitly spawned with; the declaration is **explicit, not inherited**.

---

## Pass note

| | |
|---|---|
| **Subject** | `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` (216 lines) |
| **Prior passes** | pass 1 → `challenge-D-design.pass-1-2026-07-27.md` (D-01…D-17) · pass 2 → `challenge-D-design.pass-2-2026-07-28.md` (D-18…D-27, corrections C-1/C-2) |
| **Corpus read** | `easing/easingCatalogue.ts` · `easing/useSpecimenRows.ts` · `easing/EasingAuthoringStage.vue` · `GradientEasingEditor.vue` · `src/easing.ts` · `demo/color-picker/router/index.ts` · glass-ui 7.0.0 `dist/` (chip, capsule, fading-scroll, typography) |
| **Canon read** | `VISUAL-CONSTITUTION.md` (228 ll.) · `PROPORTION-AUDIT.md` (83 ll.) · `PALETTE-CONTRACT.md` (329 ll. — API/wire authority, carries no visual row for this component; pass 2's reading confirmed) |
| **Base** | branch `tranche-u`, HEAD `c654824e`, `@mkbabb/glass-ui@7.0.0`, dev server live at `:9000` |
| **Verdict** | **DEFECTIVE** |
| **This pass** | **1 independent BLOCKER verification (second engine) + a sharper lethal predicate · 9 new findings D-28…D-36 · 2 corrections C-3/C-4** |
| **Strongest defect** | **D-18 (pass 2), now confirmed on Chromium as well as WebKit — and its lethal set is `range(fn) ⊄ [0,1]`, not "the back family"** |

Passes 1 and 2 are good and their rows are carried forward. Pass 2's own framing named its
predecessor's blind spots honestly; this pass names three of its own:

1. **Nobody had opened the authoring disclosure.** Doing so reveals that the row ships a **second
   preset selector for the same catalogue**, 40px tall, showing a *different* state (D-29).
2. **Nobody had measured the strip's box against its port.** The port is 72px tall to hold 60px of
   content and **all 12px of the surplus is pinned above it** — one declaration, `inline-flex` (D-28).
3. **"Colour-only" was asserted but never quantified.** Selected-vs-unselected label ink measures
   **1.16:1** light / **1.11:1** dark — not merely colour-only but essentially **isoluminant** (D-30).

**Probes this pass wrote and ran** (scratchpad; every number below is pasted from a probe return, a
`grep`, or a rendered-pixel decode — none estimated):
`chD-strip-probe.mjs` · `chD-states.mjs` / `chD-states2-run.mjs` · `chD-p3.mjs` · `chD-p4.mjs` ·
`chD-p5.mjs` · `chD-contrast.mjs` · `chD-crash.mjs`.
**Frames produced:** `shots/chD-*.png` (24). Load-bearing: `chD-row-tuneopen.png` (D-29),
`chD-rtl-strip.png` (D-34), `chD-row-1440.png` / `chD-dark-row.png` (D-28, D-31),
`chD-crash-ease-out-back.png` (C-3).

---

## §0 · Independent verification of pass 2's BLOCKER, and a sharper predicate

### C-3 · D-18 reproduces on Chromium as well as WebKit — but it is the **pane** boundary, not the route, and the lethal predicate is **range**, not the family name

Pass 2 found D-18 on WebKit and characterised it as "three of the twenty-seven tiles destroy the
route." I re-ran it cold on **Chromium** (`chD-crash.mjs`, fresh context per tile, one click, force):

```
CHROMIUM ease-out-back    before {tiles:27,rows:1,readout:"cubic-bezier(0, 0, 1, 1)"}
                          after  {tiles:0, rows:0, readout:null}   survived:false  errs:[]
CHROMIUM ease-in-back     after  {tiles:0, rows:0, readout:null}   survived:false  errs:[]
CHROMIUM ease-in-out-back after  {tiles:0, rows:0, readout:null}   survived:false  errs:[]
CHROMIUM ease-out-expo    after  {tiles:27,rows:1,readout:"cubic-bezier(0.19, 1, 0.22, 1)"}   survived:true
CHROMIUM smooth-step-3    after  {tiles:27,rows:1,readout:"cubic-bezier(0.65, 0, 0.35, 1)"}   survived:true
WEBKIT   ease-out-back    after  {tiles:0, rows:0, readout:null}   survived:false  errs:[]
```

**CONFIRMED on both engines. Zero console errors, zero page errors** — the boundary swallows it
silently, exactly as pass 2 reported.

**Correction of scope.** Measured `document.body.innerText` after the crash:

```
"dev misconfigured — run `npm run dev`  This panel hit an unexpected error.  Grad…"
```

The Gradient **pane** is replaced by its error boundary; the dock, the atmosphere and the sibling
`My Palettes` pane survive. "Destroys the route" overstates it by one region. It is still a
BLOCKER — a visible one-click affordance blanks the workbench with no explanation — but the row
should read *pane boundary*, because the cure lands in a different place than a route-level failure
would.

**The predicate, which matters more.** Pass 2 attributed the crash to the overshoot family and to
the midpoint ink derivation (`useSpecimenRows.ts:53–59` feeds `fn(0.5)` into `interpolateStopColors`
as a position). Computed from `src/easing.ts:62–64`, sampling each preset at 1001 points:

| preset | `fn(0.5)` | **range over t ∈ [0,1]** | escapes `[0,1]` | crashes |
|---|---:|---|:--:|:--:|
| `ease-in-back` `[0.6,−0.28,0.735,0.045]` | **−0.0636** | `[−0.0969, 1.0000]` | **yes** | **yes** |
| `ease-out-back` `[0.175,0.885,0.32,1.275]` | **+1.0676** | `[0.0000, 1.0869]` | **yes** | **yes** |
| `ease-in-out-back` `[0.68,−0.55,0.265,1.55]` | **0.6067 — in range** | `[−0.0927, 1.0927]` | **yes** | **yes** |
| `ease-out-expo` | 0.9778 | `[0.0000, 1.0000]` | no | no |
| `ease-in-out-circ` | — | `[0.0000, 1.0000]` | no | no |

`ease-in-out-back`'s **midpoint is in range and it still crashes.** So the midpoint call is not the
only mouth: the interval's live ramp is serialized by sampling the curve *across* the interval
(`serializeIntervalRamp`, consumed at `GradientEasingEditor.vue:63–67`), and any sample that leaves
`[0,1]` is fed to the colour interpolator as a position.

**The lethal set is exactly `{ tiles whose curve range escapes [0,1] }`** — which the table shows
selects the three `back` presets and nothing else. That reframes the defect from "three bad tiles"
to a **domain-boundary defect**: the design routes *timing-function output* directly into
*colour-interpolation position* with no projection at the seam, at every sample, and the catalogue
advertises the escaping family as its showcase — `EasingSpecimenStrip.vue:172–174`:

> *"overshoot curves (the back family) draw past the box — visible, never clipped"*

The overshoot was designed **into the portrait** and never **out of the ink**. The cure is one named
projection at the timing→colour seam (the same shape as the `/color` gamut-map the canon already
uses at the colour boundary), not three deletions and not a `try/catch`.

### C-4 · The dark resting label sits **on** the 4.5:1 floor, not above it

Pass 2 §0 C-2 reports the dark resting tile label at **4.52 : 1** ("passes; 0.4 % headroom"). My
independent decode (`chD-contrast.mjs`, DPR 3, darkest label pixel vs modal tile-fill pixel) returns
**4.48 : 1** on the same ink. Both readings straddle 4.5 within sampling noise. The honest reading
is **at the floor, not above it** — a value that changes with the user's gradient, since the tile
fill is `.glass-capsule`'s translucent warm mix over a live chromatic pane. A contrast row that
depends on user content is not a passing row; it is an unbounded one.

---

## §1 · New findings

### D-28 · MAJOR · OURS · Twelve pixels of unowned space are pinned above the strip; the card's vertical rhythm is 24 px / 12 px

Measured boxes, light, 1440 (`chD-p3.mjs`):

```
.specimen-strip  (FadingScroll port)   t=622.3  b=694.3   h=72   padding: 0px
.strip-row                             t=634.3  b=694.3   h=60   padding: 2px
.strip-family                          t=636.3  b=692.3   h=56
```

The port is **72 px tall to hold 60 px of content**, and every pixel of the 12 px surplus is above
the content — `.strip-row`'s bottom is flush with the port's bottom.

**One declaration causes it.** `EasingSpecimenStrip.vue:126`:

```css
.strip-row { display: inline-flex; … width: max-content; }
```

`inline-flex` is **inline-level**, so the block-container port generates a line box around it and the
parent's half-leading lands above the content. The `width: max-content` on line 129 already supplies
the intrinsic sizing that `inline-flex` was presumably reached for; the inline-level-ness buys
nothing.

**Rendered consequence** — the three stacked instruments in the open row do not share one rhythm,
though their declared gap is a uniform `gap-2.5` (10 px):

| interval | measured |
|---|---:|
| eased-ramp bottom (612.3) → first ink (eyebrow top 636.3) | **24.0 px** |
| last ink (tile bottom 692.3) → readout-rail top (704.3) | **12.0 px** |

A 2 : 1 asymmetry in a stack the author wrote as symmetric. It is plainly visible in
`shots/chD-row-1440.png` as a pale band under the ramp, and it is why the `css` / `sine` eyebrows
appear to float rather than to cap their families.

`VISUAL-CONSTITUTION.md §3.7`: *"Spacing is container-scaled from glass-ui tokens."* A 12 px interval
that no token authored and no rule intends is not container-scaled spacing; it is a line-box
accident.

**Cure:** `display: flex`. One word.

---

### D-29 · MAJOR · OURS · The row ships **two** selection surfaces for one model — and the producer's one shows a different state

Open the authoring disclosure (`GradientEasingEditor.vue:187–197`, the sliders button) and enumerate
every control inside `.easing-authoring` (`chD-p4.mjs`). There is exactly one:

```
{ tag: "BUTTON", role: "combobox", name: "Easing preset", w: 436, h: 40 }
```

`shots/chD-row-tuneopen.png` shows it: under a `PRESET` section label, a 436 × 40 combobox reading
**"Pick a curve"**.

The strip's own catalogue module states the duplication outright — `easingCatalogue.ts:16–17`:

> *"the tile catalogue IS value.js `bezierPresets` + the steps family — **the SAME catalogue the
> glass-ui `<EasingPicker>`'s preset menu speaks** (never a second mint)"*

The comment guards against a second *mint* and misses the second *surface*. One interval row now
offers the identical 27-preset catalogue through two controls stacked 12 px apart, and **they
disagree about state**: the strip shows `linear` pressed (measured `aria-pressed="true"`,
`data-state="on"`); the combobox shows its empty-state placeholder `"Pick a curve"`. Two controls
over one model, one of which never reflects the model.

- `PROPORTION-AUDIT.md PR-06`: *"Three adjacent action species or **duplicated selected fills** →
  **REMOVE** → One action/selection owner across …"*
- `VISUAL-CONSTITUTION.md §5`: the grammar is *select → tune → commit*, and *"Secondary verbs
  disclose within that same instrument"* — not a second copy of the primary verb.
- Owner edict 3 (KISS, no contrivance) and edict 4 (glass-ui is the design system): a 216-line
  bespoke gallery was authored to do a job a producer control already mounted 12 px below it was
  doing.

This is the design-system-boundary finding the brief asks for, and it is larger than any styling
row: the seat did not merely style past glass-ui, it **rebuilt a producer control beside the
producer control**.

**Cure:** one selection owner per row. Either the strip owns selection and `EasingPicker`'s preset
menu is suppressed at this seat — the producer already accepts `:readout="false"` and
`:playback="false"` (`EasingAuthoringStage.vue:78–79`), so a `:presets="false"` door is the
idiomatic **ask on glass**, the same channel as M3 — or the producer's menu is the owner and the
strip dissolves into it. It cannot be both, and the placeholder proves nobody checked.

---

### D-30 · MAJOR · OURS · Selection is not merely colour-only — it is **isoluminant**: 1.16 : 1

Passes 1 and 2 established that selection carries no surface delta (glass, orphaned pressed wash)
and that the surviving signal is colour. Neither measured **how much** colour. Rendered-pixel decode
at DPR 3 (`chD-contrast.mjs`; extreme-luminance label pixel vs modal tile-fill pixel — the *best*
case for the ink, so these are conservative):

| arm | selected tile fill | unselected tile fill | selected label ink | unselected label ink | **selected ↔ unselected label contrast** |
|---|---|---|---|---|---:|
| light | `rgb(244,222,208)` | `rgb(244,222,208)` | `rgb(0,92,100)` | `rgb(90,69,50)` | **1.16 : 1** |
| dark | `rgb(105,87,72)` | `rgb(105,87,72)` | `rgb(79,239,255)` | `rgb(213,208,200)` | **1.11 : 1** |

The tile fills are **byte-identical** (confirming pass 1 D-02 in a third measurement), and the ink
delta is a **pure hue rotation carrying essentially no luminance**. 1.16 : 1 is below the threshold
at which any luminance-based channel — greyscale rendering, monochrome display, print, a
deuteranope's or protanope's cone response — can separate the two. The chosen curve is, on those
channels, one of twenty-seven identical discs.

`VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
colour-only."* The number is what makes this decidable rather than a matter of taste: a design that
encodes its **only meaning** in a 1.16 : 1 hue step at 9 px has not encoded it.

**Why this survives the glass fix, and is therefore ours.** When glass lands `glass-chip.css` the
producer contributes `--accent-band` / `--accent-edge` / `--accent-ink`. The seat's own contribution
remains, unchanged, at `EasingSpecimenStrip.vue:204–211`:

```css
.specimen-tile[data-state="on"] .tile-glyph path { stroke: var(--motion-accent, …); stroke-width: 1.75; }
.specimen-tile[data-state="on"] .tile-label      { color:  var(--motion-accent, …); font-weight: 600; }
```

Four declarations, all colour or near-colour: two hues, a 0.5 px stroke bump, and a weight step on
9 px mono. No shape delta, no size delta, no indicator, no rule, no check. And `--motion-accent` is
the interval's *own eased-ramp midpoint* (`useSpecimenRows.ts:53–69`) — an arbitrary user colour
whose separation from `--muted-foreground` is not certified by anything, because
`useSafeAccentFn("resting")` certifies ink against a **surface**, not against the **other state**.
The quantity that carries the component's meaning is the one quantity nothing guards.

**Cure:** the selected register must survive hue loss. Structurally, not by adding a third colour.

---

### D-31 · MAJOR · OURS + glass · The support fixtures cast a shadow **3× the blur and 2.33× the ink** of the card containing them — and the "glass" has no blur

Pass 1 D-14 recorded "27 casters". Here is the comparison that makes it a proportion violation
rather than an inventory note. Measured `box-shadow` (`chD-p5.mjs`):

| element | computed `box-shadow` |
|---|---|
| **specimen tile** (×27) | `…, color(srgb .11 .098 .09 / 0.14) 0px 8px 24px 0px, …` + 4 rim insets |
| interval row card (their container) | `color(srgb .11 .098 .09 / 0.06) 0px 2px 8px 0px` |
| eased ramp (sibling instrument) | `none` |
| readout rail (sibling instrument) | `none` |

**Blur 24 px vs 8 px = 3.0×. Ink 0.14 vs 0.06 = 2.33×.** The support fixtures out-shadow the card
that holds them, while both of that card's other instruments cast nothing at all.

Source, unconditional in the Chip base class list:

```css
/* glass-ui/dist/styles/glass/glass-capsule.css  — imported, unlike glass-chip.css */
.glass-capsule { … box-shadow: var(--glass-rim-top), var(--glass-rim-bottom), var(--glass-shadow-floating); }
--glass-shadow-floating: 0 8px 24px color-mix(in srgb, …14%, transparent)
```

And measured on the same element: **`backdrop-filter: none`**. So the tile is a *floating-tier drop
shadow with no blur* — a shadowed opaque disc wearing glass's costume.

The seat's own host declares the opposite law, in the template, two files up
(`GradientEasingEditor.vue:108–110`):

> *"Z2 in-plate specimen rows: flat on the plate, `--card-edge` hairline, **no shadow**
> (DESIGN.md § Depth)"*

Canon, three places:

- `VISUAL-CONSTITUTION.md §2` — *"Instrument veil … **no drop shadow**"*; *"One surface has one tier.
  An inner card is not automatically another pane of glass. **Glass earns its blur by revealing live
  content; otherwise it is a neutral well.**"* Blur = none. It has not earned it.
- `VISUAL-CONSTITUTION.md §3.8` — *"Supporting fixtures do not compete with it through equal size or
  **equal shadow**."* They do not compete; they **exceed**.
- `PROPORTION-AUDIT.md PR-05` — *"Dividers, **caster shadows** and corner marks repeat a boundary →
  **REMOVE**."*

**Disposition:** the *ask* is glass's (pass 2's MT-F026 relay — `.glass-capsule` conflates shape +
warm tint + floating elevation and a well-tier chip needs the three separable). The *decision* to
seat 27 floating capsules inside a declared-flat plate is ours. Cancelling the shadow in this SFC's
scoped CSS would be a per-instance override (edict 5) **and** a masking fallback (edict 2, MT-F014).

---

### D-32 · MAJOR · OURS · Protagonist inversion, measured: the support is 55 % of the open row and the protagonist has zero area at rest

Pass 1 D-01 raised the topology (no `/easing` route — confirmed: `demo/color-picker/router/index.ts:22–37`
mounts `/`, `/palettes`, `/browse`, `/extract`, `/mix`, `/generate`, `/gradient`, `/atmosphere`,
`/blob`, five `/admin/*`, catch-all; **no `/easing`, no `/about`**). Here is the in-row arithmetic
that makes it a `PR-09` row with a number attached. Measured, default open row, 1440:

| element | rendered box | share of open-row ink |
|---|---|---:|
| eased ramp | 436 × **20** | 16 % |
| **specimen strip** | 436 × **72** | **55 %** |
| readout rail | 436 × **32** | 25 % |
| **curve / authoring stage** | **0 × 0** — hidden | **0 %** |

`tuneOpen` initialises to `{}` (`GradientEasingEditor.vue:84`), so the stage — measured **436 × 311.6**
when disclosed, 4.3× the strip — is behind a second click that nothing signposts.

Canon, three places, all naming this exact relationship:

- `VISUAL-CONSTITUTION.md §3.1`, Easing member: protagonist = *"neutral curve/time stage"*; support =
  *"catalogue, **specimen strip** and code inspector"*.
- `VISUAL-CONSTITUTION.md §7`, Easing: *"The curve is a centered, container-clamped 19–22 rem stage. …
  Catalogue and specimen strips **support the curve rather than reducing it to a tiny nested
  widget**."*
- `PROPORTION-AUDIT.md PR-09`: *"Gradient/Easing protagonist subordinated → **ENLARGE** → One
  19–22 rem protagonist; support subordinate."*

As shipped, the protagonist has **zero** area at rest and the support is the largest object in the
card. The strip **is** the tiny nested widget the canon names by name.

---

### D-33 · MINOR · OURS · The family hairline is duplicative at a 7 : 1 spacing ratio

Pass 1 D-04 called for the divider's deletion. The measurement that makes it unarguable:

- inter-family separation = `.strip-row { gap: 14px }` **+** `.strip-family + .strip-family { padding-left: 14px }` = **28 px**
- intra-family separation = `.family-tiles { gap: 4px }`

**7 : 1.** Grouping is already unmistakable from spacing alone, at which point
`EasingSpecimenStrip.vue:143–146` draws a rule on top of it — measured
`1px solid oklab(0.216 0.0035 0.0052 / 0.12)` light, `/0.12` dark, `rgb(0,0,0)` forced-colors.

- `PROPORTION-AUDIT.md §5.4`: *"A divider is retained only when grouping would be ambiguous without
  it. **Spacing plus material already expressing the same boundary makes the line duplicative.**"*
- `VISUAL-CONSTITUTION.md §4.2` / `PROPORTION-AUDIT.md PR-05`: the binding inventory selects
  boundaries `[]`; *"every other divider/ornament is zero."*

**Cure:** delete the rule; keep the 28 px. (The `border-left`/`padding-left` physical sides are pass 1
D-05's row and dissolve with it.)

---

### D-34 · MINOR · glass · RTL: the fade feathers the **selected** tile and leaves the cut edge hard — the reveal watcher is defeated by the mask

Pass 1 D-05b recorded that `FadingScroll`'s fade lands on the wrong edge in RTL. The consequence is
worse than an edge treatment, and it is visible. Measured with `dir="rtl"` (`chD-states2-run.mjs`):

```
stripPort   l=767    r=1203
firstTile   l=1155.8 r=1201        ← content flush at the START (right) edge
mask: linear-gradient(to right, rgba(0,0,0,0) 0px, rgb(0,0,0) 0px,
                      rgb(0,0,0) calc(100% - 16px), rgba(0,0,0,0) 100%)
```

The content overflows **leftward** past `l=767`; the 16 px feather is a physical `to right`, so it
sits on the **flush** edge and the **cut** edge gets none.

`shots/chD-rtl-strip.png` shows the result: the **selected** `linear` tile, at the right edge, is
fading out under the mask (`linea` + a ghosted `r`), while the left edge terminates in a hard slice
through a tile (`ad`) with no feather at all.

The component spends thirty lines (`EasingSpecimenStrip.vue:37–80`) on a hand-written nearest-edge
reveal whose entire purpose is *"the selected specimen stays in view"*. In RTL, the producer's mask
hides the one tile that reveal exists to show. Neither half is wrong on its own; the seam is.

`VISUAL-CONSTITUTION.md §6.1`: *"chrome, navigation and layout — logical inline/block direction
follows the document."*

**Disposition: BANK with M3** (`FadingScroll` must feather on the logical overflow edge). No local
counter-mask — that is edict 2 by definition.

---

### D-35 · MINOR · OURS · The motion register is split inside one card, and the one species that carries meaning is the one that does not animate

Full motion inventory of the open interval row:

| species | motion | tokenized? |
|---|---|---|
| `.interval-head` hover | `background-color var(--duration-fast) var(--ease-standard)` | ✓ house |
| `.rail-btn` hover | `color`, `background-color` `var(--duration-fast) var(--ease-standard)` | ✓ house |
| tile hover | producer `.glass-capsule-hover { scale: 1.015 }` | ✓ producer |
| **tile selection** | **no transition declared** — stroke colour, `stroke-width 1.25→1.75`, label colour, `font-weight 400→600` all cut instantly | ✗ |
| **reveal scroll** | `port.scrollBy({ behavior: "smooth" })` (lines 72–75) | ✗ **UA duration + UA easing** |

Three of five species share one house register; the two that belong to this component share none.
`VISUAL-CONSTITUTION.md §6`: *"Spatial continuity uses **one producer-owned glass-ui spring
register**. Colour/opacity effects use the corresponding short effect curve."*

No property in play forces layout (`scale` is compositor-only; scroll position is not layout;
`stroke-width` is SVG paint) — pass 2's positive holds. And **no animation is deleted anywhere**;
edict 6 is clean. The defect is register incoherence, not motion excess.

---

### D-36 · MINOR · OURS · Forced colors: selection does **not** collapse entirely — it survives as the **same colour as focus**

Pass 2 §2 states that under forced colors *"the selected state collapses entirely … leaving
`font-weight: 600` on 9 px mono as the sole differentiator."* Measured (`chD-states2-run.mjs`,
`chD-p3.mjs`, `forcedColors: "active"`):

| | selected tile | unselected tile |
|---|---|---|
| background | `rgb(255,255,255)` | `rgb(255,255,255)` |
| **border-color** | **`rgba(5,0,73,0.8)`** | **`rgb(0,0,0)`** |
| label colour | `rgb(0,0,0)` | `rgb(0,0,0)` |
| label weight | 600 | 400 |

and the focus indicator, same arm, on a third tile:

```
{ outlineWidth: "2px", outlineStyle: "solid", outlineColor: "rgba(5,0,73,0.8)", boxShadow: "none" }
```

Two refinements:

1. **A border delta does survive** — navy vs black — so "collapses entirely" is one step too strong.
   Pass 2's conclusion (that forced colors leaves selection near-invisible) is correct in substance.
2. **The surviving delta is the same colour as focus.** Selection = a 1 px `rgba(5,0,73,0.8)` border;
   focus = a 2 px `rgba(5,0,73,0.8)` outline. They differ only in stroke width.
   `VISUAL-CONSTITUTION.md §4.1`: *"**Focus remains visibly distinct from selection** in both
   schemes, **forced colors** and reduced transparency."* One pixel of width is not visible
   distinctness on a 44 px disc.

Also worth recording as a positive: focus does **not** disappear under forced colors. The house
ring is a `box-shadow` (`focus-ring`, measured light:
`color(srgb .665 .0001 .2617 / .3) 0 0 0 2px, … 0 0 8px`) with `outline-style: none`, and box-shadows
are suppressed in forced-colors mode — but the UA substitutes its own `2px solid` outline, so the
state is not lost. That is luck, not design: nothing in this component or its producer guarantees it.

---

## §2 · Consolidated disposition (passes 1 + 2 + 3)

Pass 1 and pass 2 rows stand as written in their archived files. This pass adds:

| Row | Owner | Disposition |
|---|---|---|
| **C-3** D-18 confirmed on Chromium + WebKit; scope = **pane** boundary; lethal predicate = **`range(fn) ⊄ [0,1]`** | **ours** | **BLOCKER stands.** Cure is one named projection at the timing→colour seam (all samples, not just the midpoint), not three deletions and not a `try/catch`. |
| **C-4** dark resting label is **at** the 4.5 : 1 floor (4.48 / 4.52), and depends on the user's gradient | ours | an unbounded contrast row is not a passing row |
| **D-28** 12 px unowned line-box space; 24/12 rhythm | **ours** | `inline-flex` → `flex` |
| **D-29** two selection surfaces for one model; producer's reads "Pick a curve" | **ours** + ask on glass | one selection owner per row; ask for `:presets="false"` |
| **D-30** selection is isoluminant at **1.16 : 1** / 1.11 : 1 | **ours** | a selected register that survives hue loss |
| **D-31** fixtures out-shadow their container 3× blur / 2.33× ink; blur = none | ours + **glass (MT-F026)** | tiles are wells; **BANK** the producer half |
| **D-32** protagonist 0 % / support 55 % of the open row | ours — W27 / PR-09 | protagonist first |
| **D-33** family hairline duplicative at 7 : 1 | ours | delete the rule, keep the 28 px |
| **D-34** RTL fade feathers the selected tile | **glass** | **BANK with M3** |
| **D-35** split motion register; selection has no transition; reveal untokenized | ours | one house register |
| **D-36** forced colors: selection survives as the **same colour as focus** | ours | refines pass 2 §2; §4.1 distinctness |

**Glass rows to bank (cumulative across passes): M3 / I-9 / D58** — orphaned `glass-chip.css`
(radius, pressed wash, press scale, coarse-pointer touch floor, PRC/PRM arms), `.glass-capsule`
conflating shape + warm tint + floating elevation (MT-F026), `FadingScroll`'s nameless tabbable port
and its physical-direction fade, plus this pass's two asks: a **cell radius that derives from the
chip's own box**, and a **`:presets` door on `EasingPicker`**.

**Our rows are the majority and the BLOCKER is entirely ours.**

---

## §3 · What passes (re-verified this pass, not restated from prior passes)

- **`prefers-reduced-motion` is honoured and it works.** Line 74 resolves the reveal to
  `behavior: "auto"`, and under `reducedMotion: reduce` the tile's computed transition list drops
  `scale` entirely (`"opacity 0.1s …, color 0.1s …, background-color 0.1s …"` vs the cartoon-punch
  spring at rest) — the global carve-out reaches into the producer. Measured, not assumed.
- **Focus is real in every arm measured**, including forced colors (§ D-36).
- **House-correct selection semantics**: native `<button type="button" aria-pressed>` with exactly
  one true seat — the same law `VISUAL-CONSTITUTION.md §3.1/§5` imposes on the palette seats. No
  `role="option"`, no listbox fiction.
- **The refusal of `scrollIntoView`** (lines 37–46) remains exemplary: it names the O-19 defect it
  prevents and writes exactly one axis on exactly one element.
- **Zero curve maths re-derived**; literals byte-mirrored against the picker's own law.
- **Edicts 1, 6, 7, 8 clean**: 216 lines and one job; no animation deleted; `useTemplateRef` (48) and
  reactive props destructure (18); `import type` (16) correct under `verbatimModuleSyntax`.

The component is not lazy work. Its data layer is excellent and several of its comments diagnose
real defects correctly. What it lacks is a design that survives contact with its own catalogue
(C-3), its own producer (D-29, D-31), and its own canon (D-30, D-32).

---

**No source edits land from this formation.** Nothing under `src/`, `demo/`, `api/`, `test/`, `e2e/`,
`docs/tranches/V/vnext/`, `scripts/dev/dev.sh` or any `INBOX.md` was touched. This seat wrote only
under `docs/tranches/V/megatranche/audit/components/wb-gradient-easingspecimenstrip/`.

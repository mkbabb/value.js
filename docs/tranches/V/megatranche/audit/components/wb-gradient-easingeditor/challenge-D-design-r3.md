# CHALLENGE-D (round 3) — `GradientEasingEditor.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, the 1M-context variant) — the tier this seat
was explicitly spawned with. Declared here, not inherited.

---

## 0. Why this file is `-r3`, and what it is for

Two prior CHALLENGE-D rounds already exist in this directory:

```
$ ls -la docs/tranches/V/megatranche/audit/components/wb-gradient-easingeditor/
challenge-D-design.md       33883 B  2026-07-27 18:13   (round 1, 16 findings)
challenge-D-design-r2.md    43056 B  2026-07-28 10:16   (round 2, 15 findings)
```

The brief names `challenge-D-design.md`. Writing there would **destroy round 1's evidence**, which
is itself a defect this program exists to prevent; round 2's seat made the same call and filed
`-r2`. This is round 3, filed alongside. IDs are namespaced `D3-nn`. §7 is an explicit
new/confirmed/not-relitigated ledger against both prior rounds.

`ROOT-FINDINGS.md:1581` routes two owner marks to exactly this seat:

> "the easing units' **r3 briefs carry OM-4 + OM-13 together**."

So this round carries them (D3-05, D3-06) — and it closes the two evidence holes both prior rounds
declared open and could not close:

| declared open by | hole | closed here |
|---|---|---|
| r1 §"Uncovered arms" | *"**N > 1 intervals** — every captured frame is the 2-stop default… D-01's worst case and D-11's multiplication have **no** captured witness. This is the single largest hole in the evidence for this component."* | D3-02, D3-03, D3-04, D3-05, D3-08, D3-09, D3-11 — all measured live at N = 4, with frames |
| r2 §5 last row | *"**Contrast: NOT MEASURED.** My compositing walk could not resolve the translucent `oklab()` / `color(srgb …)` glass stack… **I decline to publish the numbers I computed.**"* | D3-01 — measured by **pixel-sampling the rendered composite**, which needs no compositing model |

---

## 1. Subject, method, scope

| | |
|---|---|
| Subject | `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` (296 lines) |
| Audited with it | `easing/EasingSpecimenStrip.vue`, `easing/EasingAuthoringStage.vue`, `easing/useSpecimenRows.ts`, `easing/easingCatalogue.ts`, `composables/useGradientModel.ts`, `composables/useGradientCSS.ts` |
| Route | `/#/gradient`, Gradient plate, "Easing" section |
| Base | branch `tranche-u`, HEAD `c654824e` |
| Engine | Playwright **WebKit** (the real Safari engine), read-only against the live `http://localhost:9000` |
| Arms driven | 1440×900 @dsf2 light **and** dark · 1512×900 @dsf2 · 390×844 @dsf3 touch · **720×450** (= a 1440 window at 200 % browser zoom) · **320×640** (the canon's named reflow arm, `VISUAL-CONSTITUTION.md:78`) |
| Captured frames read (vision) | `visual/shots/safari-desktop-dark/gradient.png`, `visual/owner-marked/OM-4-easing-radius-incoherence.png`, `visual/owner-marked/OM-13-easing-readout-not-glass-input.png`, plus the six frames this seat captured (below) |
| Files written | this report + `frames-r3/` (7 PNGs, 5 probe JSONs, 5 probe scripts). **No source edits.** |

**Evidence produced by this seat**, all under
`docs/tranches/V/megatranche/audit/components/wb-gradient-easingeditor/frames-r3/`:

```
D3-n4-desktop-1440-four-intervals.png      the four-row state, desktop     (never captured before)
D3-n4-mobile-390-four-intervals.png        the four-row state, mobile      (never captured before)
D3-08-dead-state-zero-open-rows.png        the section with NO open row    (never captured before)
D3-02-focus-collapsed-BEFORE.png           collapsed row, unfocused
D3-02-focus-collapsed-AFTER-zero-delta.png collapsed row, FOCUSED — byte-equivalent to BEFORE
D3-02-focus-open-AFTER-one-edge.png        open row, focused — one edge of four survives
D3-07-reflow-320.png                       the 320px canon arm
probe-n2.mjs · probe-state2.mjs · probe-rhythm.mjs · probe-arms.mjs · probe-ground.mjs
probe-n4.json · probe-removal.json · probe-rhythm.json · probe-arms.json · probe-contrast-targets.json
```

**Reproducing the N > 1 state** (every N-dependent finding below starts here):

```
open http://localhost:9000/#/gradient
click the gradient rail (.gradient-rail) at 25 %, 50 % and 75 % of its width
→ 5 stops, 4 intervals, 4 specimen rows, row 0 open
```

---

## 2. Verdict

**DEFECTIVE.** 14 findings: **2 BLOCKER**, 7 MAJOR, 3 MINOR, 2 INFO.

Round 1's headline was a focus ring that never paints. Round 2's was three specimens that destroy
the route. **Round 3's headline is that the one thing this component exists to say — the name of the
curve on this interval — is illegible by measurement, in both schemes, at every arm; and that the
file's own comment diagnoses the exact mechanism 40 px below, cures it there, and leaves it
uncured here.** The second headline is that the component was designed for N = 1 and only ever
witnessed at N = 1: at N = 4 its identity ink, its spacing rhythm, its corner register, its
disclosure state and its authored data all break in ways no prior seat could see.

---

## 3. What the frames actually show

### 3.1 The four-interval state, desktop 1440 (`frames-r3/D3-n4-desktop-1440-four-intervals.png`)

One open row (462 × 196.4) over three collapsed rows (462 × 40.9 each), 8 px apart. Every row's
head reads `N → N+1 ● ● ╱ linear ⌄`. **All four intervals carry the identical curve and the
identical literal `cubic-bezier(0, 0, 1, 1)` — and the four curve glyphs are painted in four
different colours**: measured `--motion-accent` per row —

```
row 0   oklch(43.469% 0.0994 159.34)     green
row 1   oklch(43.733% 0.0757 189.28)     teal
row 2   oklch(44.027% 0.0805 220.60)     blue
row 3   oklch(44.705% 0.1288 250.66)     blue-violet
distinctInks: 4
```

The only differentiated mark in the entire row (r1 D-08 established that the label, the name and
the literal are byte-identical in size/family/weight/colour) is coloured by something that is **not
the curve**. The list reads as four different easings. It is four `linear`s.

### 3.2 The four-interval state, mobile 390 (`frames-r3/D3-n4-mobile-390-four-intervals.png`)

The same four rows at 322 px head width, 14 px type. The head devotes 166 px of client width to a
6-character word while the specimen strip 30 px below hides 79.9 % of its 1482 px of content. The
`sine` family's first tile is bisected by the port edge with its eyebrow legible above it — the
catalogue is starved in the same row that is half empty.

### 3.3 The dead state (`frames-r3/D3-08-dead-state-zero-open-rows.png`)

Three collapsed rows, no open row, no ramp, no strip, no literal, no editor, no message. Reached by
deleting one stop while the last row was open. Section height 344.5 → 139.6 px. See D3-08.

### 3.4 Dark (`visual/shots/safari-desktop-dark/gradient.png`, plus this seat's dark arm)

The row card edge is at the threshold of visibility; the unselected specimen discs and the plate
merge into one brown field; and the readout rail is **darker** than its plate — while in light
(OM-4, OM-13) the same rail is a **brighter** cream slab than its plate. The well's material
direction inverts between schemes. See D3-06.

---

## 4. Findings

### D3-01 · BLOCKER · The curve name — the component's whole payload — measures **3.86 : 1** light and **3.73 : 1** dark. The file diagnoses this exact failure 40 px below and cures only the other instance

`GradientEasingEditor.vue:136` renders the row's identity:

```html
<span class="fira-code text-mono-small text-muted-foreground truncate flex-1 min-w-0">{{ row.name }}</span>
```

`GradientEasingEditor.vue:167-175` — the file's own comment about the *literal*, which carries the
**identical** `text-mono-small text-muted-foreground` treatment 40 px lower:

> "the literal is `text-muted-foreground`, and on the raw translucent pane over the saturated
> atmosphere it composited **~2.7:1 (fails AA)**; a `bg-well` well **floors** it to the certified
> ink-on-well ratio … AND visually unifies the rail with the canvas plate below it."

So the mechanism was found, understood, and written down. It was then applied to **one** of the
three text runs that share the ink, and the other two were left on the raw pane.

**Measurement.** Pixel-sampled from the rendered composite (which needs no compositing model — the
screenshot *is* the composite). Method: screenshot at dsf 2, crop each element's live rect, take the
luminance mode as ground and the 0.5 / 99.5-percentile as ink, WCAG 2.x relative-luminance formula.
The ink resolves to exactly `L = 0.1098`, which is `rgb(112, 89, 66)` = the resolved
`--muted-foreground` — i.e. the sample is the true ink, not an antialiasing outlier.

| run | line | font | light | dark | AA needs | verdict |
|---|---|---|---:|---:|---:|---|
| rail literal `cubic-bezier(…)` (**welled**) | `:177` | 16.4 px / 400 | **5.06 : 1** | **5.82 : 1** | 4.5 | PASS |
| head curve **name** `linear` (**unwelled**) | `:136` | 16.4 px / 400 | **3.86 : 1** | **3.73 : 1** | 4.5 | **FAIL** |
| head ordinal `1 → 2` (**unwelled**, same ink + ground) | `:124` | 16.4 px / 400 | ≈ 3.86 : 1 | ≈ 3.73 : 1 | 4.5 | **FAIL** |
| family eyebrow `css` (**unwelled**, `opacity .75`) | `EasingSpecimenStrip.vue` | **9 px** / 400 | **2.47 : 1** | **2.79 : 1** | 4.5 | **FAIL** |
| head glyph stroke (non-text) | `:260-266` | — | 4.48 : 1 | 5.15 : 1 | 3.0 | pass |
| tile label | `EasingSpecimenStrip.vue` | 9 px | 6.78 : 1 | 4.51 : 1 | 4.5 | pass |

Re-run independently at 1440×1400 with the row collapsed, sampling the ground patch 20 px right of
the text: **3.90 / 3.89 (light), 3.75 / 3.75 (dark)** — same answer, different geometry.

16.4 px at weight 400 is **not** WCAG "large text" (that floor is 18.66 px bold / 24 px regular), so
4.5 : 1 binds. On the 390 px arm the same run renders at **14 px** — same ink, same ground, same
ratio, smaller glyph.

**Law broken.** `VISUAL-CONSTITUTION.md:82` (§4.1, first bullet):

> "Text, focus, boundaries and state meet their **rendered contrast on the actual material tier**;
> **a token name is not evidence**."

That sentence describes this defect exactly. `text-muted-foreground` is a token name. On the opaque
well it renders 5.06; on the raw translucent pane over the saturated atmosphere it renders 3.86.
`PROPORTION-AUDIT.md:73` (§5.8) says the same thing from the other side — *"Real rendered relation
wins over token intent."*

**The sharper form of the defect:** the rail's ratio is **certified by construction** (an opaque
`--well-bg` fixes the ground). The head's ratio is **uncertifiable by construction** — its ground is
the live glass pane over an atmosphere derived from the user's current colour. There is no colour
the user can choose that makes the head's ratio a fact; today, at the default seed, it is already
below AA.

**Reproduction.** `node frames-r3/probe-ground.mjs <out>` then the sampling script in §1; or crop
`frames-r3/D3-n4-desktop-1440-four-intervals.png` at any head and measure.

**Cure (gestalt).** Do not add a third well. The row has **three** text runs on two different
material tiers with one ink — that is the defect. Put the row's identity on one tier and let the
tier own the certification: either the whole row head sits on the same opaque rung the rail already
uses (one surface per row, which also dissolves D3-04 and D3-06), or the identity run takes an ink
minted against the *pane*, the way `useSpecimenRows.ts:40` already mints the glyph ink through
`useSafeAccentFn("resting")`. The machinery to floor an ink against a live ground **already exists
in this component's own composable** and is applied to the decoration but not to the text.

---

### D3-02 · BLOCKER · Focusing a collapsed interval row changes **zero** pixels — measured live, in the shipped app, at N = 4. Even the open row keeps one ring edge of four

Round 1 (D-01) proved this with a synthetic `frames/repro.html`. It is now proved **in the running
application**, at the N > 1 state round 1 could not reach.

`GradientEasingEditor.vue:114` clips the row; `:228-231` suppresses `outline` and expresses focus
solely as `box-shadow`:

```css
.interval-head:focus-visible { outline: none; box-shadow: var(--focus-ring-shadow); }
```

Measured live on a **collapsed** row (row index 2 of 4), 1512×900 @dsf2:

```
isFocused: true      matchesFocusVisible: true
outline:   "none 3px rgb(28, 25, 23)"
boxShadow: "color(srgb 0.665 0 0.2615 / 0.3) 0 0 0 2px, color(srgb 0.665 0 0.2615 / 0.15) 0 0 8px 0"
rowOverflow: "hidden"
insets:  { t: 1, b: 1, l: 1, r: 1 }        ← the row's 1px border, on ALL FOUR sides
rowH: 41.2   headH: 39.2
```

Screenshot before focus, screenshot after focus, diff:

```
$ python3 (PIL/numpy) frames-r3/D3-02-focus-collapsed-BEFORE.png
                   vs frames-r3/D3-02-focus-collapsed-AFTER-zero-delta.png
  COLLAPSED: px with maxdelta>2:  0
  COLLAPSED: px with maxdelta>4:  0
  COLLAPSED: px with maxdelta>8:  0
  bbox(>8): None
```

**Not one pixel above a 2/255 threshold.** The control is focused, `:focus-visible` matches, the ring
is minted — and it is 100 % clipped, because a 2 px-spread / 8 px-blur shadow paints entirely
outside a border box that coincides with the clip rect on every side.

The same diff on the **open** row (whose head has 156.6 px of interior below it):

```
  OPEN: px with maxdelta>8: 244
  bbox(>8): x 25→944, y 104→107      ← a 4-px band along the BOTTOM edge only
```

So even in the best case the ring survives on **one edge of four**, as a 4 px sliver — and that is
the only state any prior capture ever witnessed. With `N` stops there are `N−1` rows and at most one
is open; `N−2` rows are permanently in the zero-pixel state. At the shipped default (2 stops, 1 row,
open) the defect is invisible, which is why 60 captures missed it.

**Law broken.** `VISUAL-CONSTITUTION.md:84` — *"Focus remains visibly distinct from selection in
both schemes, forced colors and reduced transparency."* WCAG 2.4.7 / 2.4.11. And the component's own
comment at `:220-221` asserts it uses *"the house focus register (the accent-aware ring the keystone
mints — never a bespoke outline)"* — it mints the ring and then throws it away.

**Cure.** The clip has no job. Nothing in the row overflows (`overflow: visible` on `.head-glyph`
at `:255-259` is the only thing that wants to, and it stays within the head's 39 px band).
`border-radius` alone already rounds the panel's corners. Delete `overflow-hidden` — or, better,
delete the per-row box entirely (D3-05, D3-06), at which point there is no clip rect to be flush
with. If a clip must survive, focus must be expressed as `outline`, which is not clipped by an
ancestor's `overflow` and which `forced-colors` preserves (r2 D2-07's second mechanism).

---

### D3-03 · MAJOR · "One ink per specimen" is falsified **in the visible frame**: four rows, one curve, four colours

`useSpecimenRows.ts:1-9` states the law:

> "its OWN ink — the eased ramp midpoint, contrast-certified against the resting plate (… **one ink
> per specimen**, consumed through the producer's `--motion-accent` door)."

`GradientEasingEditor.vue:13-14` repeats it: *"Each row strokes the interval's OWN ink — `--motion-accent`
= the certified eased ramp midpoint (§8: one ink per specimen)."*

Measured at N = 4, all four intervals holding the **default `linear`** — identical `interval.css`,
identical `row.name`, identical glyph path:

```
row 0  name="linear"  css="cubic-bezier(0, 0, 1, 1)"  ink=oklch(43.469% 0.0994 159.34)
row 1  name="linear"  css="cubic-bezier(0, 0, 1, 1)"  ink=oklch(43.733% 0.0757 189.28)
row 2  name="linear"  css="cubic-bezier(0, 0, 1, 1)"  ink=oklch(44.027% 0.0805 220.60)
row 3  name="linear"  css="cubic-bezier(0, 0, 1, 1)"  ink=oklch(44.705% 0.1288 250.66)
distinctInks: 4
```

Witness: `frames-r3/D3-n4-desktop-1440-four-intervals.png` and
`frames-r3/D3-n4-mobile-390-four-intervals.png` — four visibly different glyph colours over four
identical labels.

Read `useSpecimenRows.ts:53-59`: the ink is `interpolateStopColors(s0.cssColor, s1.cssColor,
fn(0.5), …)`. Two of its three inputs are the interval's **stop colours**. So the ink is
overwhelmingly a function of *where the interval sits in the gradient*, and only weakly of the
curve. r2 (D2-15) proved the collision direction — five different curves yielding one ink. This is
the injection direction, and it is the one a user actually sees: **one curve yielding four inks in
a single 344 px column.**

The consequence compounds r1 D-08 (three roles, one treatment): the glyph is the *only*
differentiated mark in the row, and it is differentiated by the wrong variable. A scanning user
reading four rows top-to-bottom is told, by the only colour in the list, that these four intervals
ease differently. They do not.

`PROPORTION-AUDIT.md:70` (§5.5) — a small mark is *"data, status, labeled action, drag affordance,
focus/selection register **or removed**."* This mark claims to be data about the curve and is data
about the stops.

**Cure.** Either the ink derives from the *curve* (a curve-distinguishing scalar — the signed area
between the curve and the diagonal is the obvious one, and it separates `ease-in` from `ease-out`
which `fn(0.5)` cannot), or the per-row ink is deleted and the shared accent carries the glyph.
What it must not be is a stop-colour dressed as a curve identity. Note this also removes the
unbounded `fn(0.5)` evaluation that r2's D2-01 BLOCKER runs through.

---

### D3-04 · MAJOR · Proximity inversion: sibling rows are **8 px** apart; the parts inside one row are **10 px** apart

Measured at N = 4:

```
interRowGaps:  [8, 8, 8]            (GradientEasingEditor.vue:107  → flex flex-col gap-2)
panelGap:      10px                 (:146 → gap-2.5, between ramp / strip / rail)
headPad:       8px 12px 8px 12px
panelChildren: ramp 436×20 @y592.13 · strip 436×71.42 @y622.13 · rail 436×32 @y703.55
intraGaps:     [10, 10]
```

The gestalt law of proximity is not a style preference: elements in one group must be closer to each
other than to elements of another group. Here they are **further**. The head sits 8 px above the
ramp that belongs to it and 8 px below the *next interval*, which does not — the same distance,
carrying opposite meaning. At N = 4 the four rows therefore read as one continuous striped block,
which is precisely how `frames-r3/D3-n4-desktop-1440-four-intervals.png` scans.

`PROPORTION-AUDIT.md:68` (§5.3): *"Header→headline uses **title gap**; headline→next semantic section
uses **section gap**."* Two named, different quantities. This component uses one 8 px value for
"between rows" and a smaller-role 10 px for "inside a row", inverting the ladder.

The only thing currently holding the grouping together is the per-row card border — a boundary
`OPTICAL-BENCH-COMPOSITIONS.md §5` gives this composition a count of zero (r1 D-07, r2 D2-02).
So the composition draws a forbidden line to compensate for a spacing scale it has inverted.

**Cure.** Fix the rhythm and the boundary dies with it: inter-row gap ≥ intra-row gap by at least
one rung, and the rows group by spacing + material — exactly the disposition the binding table
already records for Gradient (*"grouping job: meniscus, stop seats and code/action interval carry
grouping"*).

---

### D3-05 · MAJOR · OM-4 carried: one token, one element class, a **4.8× curvature swing** driven by disclosure state

The owner's mark (`ROOT-FINDINGS.md:1421`, MT-F030, witness `OM-4-easing-radius-incoherence.png`):

> *"easing config is awful, **too rounded in some areas, not rounded enough in others**."*

The registry already holds a cross-element census of this instrument (five registers, 0/4/6/16/9999 px,
`DEFECT-LEDGER.md:29659` and `:31873`), measured at N = 1. **Nobody has measured the intra-element,
state-dependent case, because nobody had a second row.** Measured at N = 4:

```
open   row   462 × 196.36   border-radius 16px   →  r / min-dimension =  0.081
closed row   462 ×  40.94   border-radius 16px   →  r / min-dimension =  0.391
                                                    ratio = 4.83×
```

One class (`rounded-card border border-card-edge overflow-hidden`, `:114`), one token
(`--radius-card: 1rem`), two boxes **8 px apart in the same list**, and the rendered corner
character changes from "square-ish card" to "near-capsule". And it changes *on click*: pressing a
head mutates that row's curvature by 4.8× with no transition. Both readings the owner named are
present in one element: the collapsed rows are the "too rounded" and the open row is the "not
rounded enough", and they are the **same declaration**.

This is why the existing cure sketch ("one radius scale for the easing instrument … derived from the
panel's own register") is necessary but insufficient: a *fixed absolute* radius cannot be coherent
across a box whose height varies 4.8× by state. `PROPORTION-AUDIT.md:73` (§5.8): *"Real rendered
relation wins over token intent. Adjacent rungs, **measured rects** and ink gaps appear in DELTA;
token presence alone cannot close a row."* `--radius-card` is present and correct in both boxes; the
rendered relation is incoherent anyway.

**Cure (carrying OM-4 forward with the new constraint).** The radius derivation law the canon gap
already demands (`DESIGN-CANON-BRIEF.md:73`, `design-canon-census.md:316` C-4) must be stated in
terms of **curvature**, not absolute radius — corner curvature holds constant or grows with box
size, never inverts — and a box whose height is state-dependent may not carry a size-blind radius
rung. The structural cure is the same one D3-04 and D3-06 arrive at: **the interval rows should not
be boxes at all.** Delete the per-row card and the whole register question disappears for four of
the six boxes.

---

### D3-06 · MAJOR · OM-13 carried: the `bg-well` rung is applied against a **translucent** pane, so its "tone step of the plate" **inverts sign** between schemes and changes hue family — and glass-ui's `Input` has no slot to receive the cure

The owner's mark (`ROOT-FINDINGS.md:1564`, MT-F037, witness `OM-13-easing-readout-not-glass-input.png`):

> *"in the gradient/easing selector, this is **not a proper glass-ui rounded input area component**."*

**(a) The mechanism, measured.** `demo/DESIGN.md:98` defines the rung the seat consumed:

> **2 · WELL** — *"an **opaque tone-step of the plate** … the ONE `--well-bg` token:
> `color-mix(in oklab, var(--card) 92%, var(--foreground) 8%)`."*

The recipe steps away from `--card`. But `GradientEasingEditor.vue:176` puts it inside a row whose
own background is measured `rgba(0, 0, 0, 0)` — the surrounding "plate" is the **translucent glass
pane over the saturated atmosphere**, not `--card`. So the step's magnitude and *sign* are set by the
ambient atmosphere, not by the token. Pixel-sampled from the rendered composite, 1440×900 @dsf2:

| | plate behind the head | readout well | ΔL | direction |
|---|---|---|---:|---|
| light | `rgb(240, 184, 202)` L = 0.5703 | `rgb(224, 215, 206)` L = 0.6878 | **+0.1174** | well **advances** |
| dark | `rgb(119, 74, 85)` L = 0.0947 | `rgb(76, 65, 57)` L = 0.0567 | **−0.0380** | well **recedes** |

Two independent incoherences in one surface:

1. **The sign flips.** In dark it is a recess (correct for a well). In light it is a raised slab.
   The same class, the same token, opposite material semantics per scheme.
2. **The hue family changes.** The plate is pink (`240,184,202`, hue ≈ 340°); the well is warm
   neutral cream (`224,215,206`, hue ≈ 30°). A "tone step of the plate" that lands ~60° of hue away
   is not a tone step; it is a material substitution.

That is precisely what the owner's light-mode crop shows and why it reads as a foreign object rather
than a field: **a flat cream rectangle floating brighter than everything around it.** The magnitude
also differs 3.1× between schemes (0.1174 vs 0.0380), so the two schemes do not even agree on how
loud the surface is.

`VISUAL-CONSTITUTION.md:82` again: *"a token name is not evidence."* `bg-well` is present; a well is
not rendered.

**(b) The producer census, so the ask is exact.** glass-ui **7.0.0** does ship the primitive:

```
$ node -e "…require('@mkbabb/glass-ui/package.json').exports" | grep -i form
./forms
$ head -3 node_modules/@mkbabb/glass-ui/dist/forms.d.ts
export * from "./components/input";
export * from "./components/textarea";
export * from "./components/combobox";
$ cat node_modules/@mkbabb/glass-ui/dist/components/input/types.d.ts
export interface InputProps { … disabled?, invalid?, readonly?, size?: ControlSize, … }
```

and it renders a bare input:

```
$ node -e "s=fs.readFileSync('node_modules/@mkbabb/glass-ui/dist/Input-9BlLluik.js','utf8');
           …classes…; console.log('slots:', /renderSlot/.test(s))"
[ 'input', 'input', 'input', 'field-control glass-defined' ]
slots: false
```

**`Input` has zero slots.** It cannot host a trailing action rail. So MT-F037's cure is *not*
"consume `Input`" — it is a **marked glass-forward ask**: `Input` (or a new `field`-class surface)
must accept a trailing adornment slot, or glass must ship a read-only value/code field with an action
rail. Consumers: this rail, `MixResultDisplay.vue:31`, `App.vue:362` — three sites, one shape
(`DEFECT-LEDGER.md:31542`). Zero demo files consume `field-control` today, so there is no local
precedent to copy and a local restyle would be exactly the masking fallback the standing edict
forbids.

**Cure.** Two halves, both stated. **Ours:** stop applying an opaque `--card`-derived rung on a
translucent pane; the well tier must be defined relative to the surface it is actually drawn on, or
the row must supply an opaque host first (which is what one-surface-per-row, D3-04, gives you for
free). **Glass:** the trailing-adornment ask above, relayed on the standing BH/BI inbox alongside M3.

---

### D3-07 · MAJOR · At **320 px** — a canon-named arm — the *shortest* literal in the catalogue truncates. There is no viewport width at which the "one-literal law" holds

`VISUAL-CONSTITUTION.md:78` names the arms:

> "The **1440px, 390px, 320px**, and actual 400%-zoom in-app Browser arms record the computed role,
> family, size, line height, weight … rather than inferring typography from class names."

and, in the same paragraph:

> "Live numbers … **reserve their widest legal representation** so value changes never reflow the
> settled chassis."

Measured, four arms, WebKit, the **default** interval (`linear`):

| arm | code clientW | code scrollW | truncated | strip hidden |
|---|---:|---:|---|---:|
| 1440 desktop | 360 | 360 | no | 70.6 % |
| 720 (= 1440 @ 200 % zoom) | 360 | 360 | no | 70.6 % |
| 390 mobile | 222 | 222 | no | 79.9 % |
| **320 (canon arm)** | **152** | **207** | **YES — 26.6 % clipped** | **84.6 %** |

`cubic-bezier(0, 0, 1, 1)` is 24 characters — the **shortest** literal the catalogue can produce.
Every one of the 27 specimens is longer or equal. So at the canon's own 320 px arm, the row's stated
single export is truncated for **100 % of the catalogue**, including the default the app boots with.
Witness: `frames-r3/D3-07-reflow-320.png`.

Compose with round 1's D-04 (measured at the *other* end: `cubic-bezier(0.785, 0.135, 0.15, 0.86)`
overflows the 360 px box by 27.7 px at 1512 px): **the literal truncates at both ends of the
viewport range.** The reservation is not merely under-sized at one arm; there is no arm at which the
widest legal representation is reserved, which is the specific thing the law requires.

WCAG 1.4.10 Reflow (AA) also binds at 320 px: a CSS literal is text, not "content requiring
two-dimensional layout." The only recovery is `:title` (`:177`) — a native tooltip, unavailable to
touch and unreachable by keyboard, i.e. unavailable on every device that *is* 320 px wide.

**Cure.** The literal is the protagonist of the rail; two 24 px ghost icons are support. Reserve the
literal's widest legal width and let the rail wrap its actions below at narrow widths — or, since
the rail is being rebuilt anyway for D3-06, let the producer field own wrapping/scroll of its own
value. `title` is not a design.

---

### D3-08 · MAJOR · Deleting a stop while a later row is open leaves the section with **zero open rows** — an undesigned dead state, reproduced live

`GradientEasingEditor.vue:61` seeds the accordion with an invariant:

```ts
const openInterval = ref<number | null>(0);          // exactly one row open
```

Nothing restores it. `useGradientModel.ts:88-98` resizes intervals by **truncating from the end**:

```ts
if (intervals.value.length > needed) { intervals.value.length = needed; }
```

so any stop removal can leave `openInterval` pointing past the last row. `v-show="openInterval === row.index"`
(`:144`) then matches nothing.

**Reproduction (run; `frames-r3/probe-state2.mjs`):**

```
/#/gradient → click .gradient-rail at 25 %, 50 %, 75 %      (5 stops, 4 rows)
click the LAST row's head                                    (openInterval = 3)
focus the stop handle at 50 %, press Delete                  (4 stops, 3 rows)
```

Measured before / after:

```
before: rows 4  expanded [false,false,false,true]  openCount 1
        visibleLiterals ["cubic-bezier(0, 0, 1, 1)"]  visibleRamps 1  visibleStrips 1  sectionH 344.5
after:  rows 3  expanded [false,false,false]        openCount 0
        visibleLiterals []                          visibleRamps 0  visibleStrips 0  sectionH 139.6
        pageErrors []   consoleErrors []
```

Witness: `frames-r3/D3-08-dead-state-zero-open-rows.png`.

No error, no message, no page break — the working surface simply evaporates. `serializeIntervalRamp`
(`useGradientCSS.ts:236-238`) returns `null` for the out-of-range index rather than throwing, which
is why this presents as silence rather than as r2's D2-01 route destruction. The user's open row,
its selected specimen, its literal and its disclosed editor all vanish in response to an action
taken on a different instrument.

`VISUAL-CONSTITUTION.md:101` (§5): *"Persistent operation state stays with the entity/workspace."*
The open-row state is workspace state keyed to a slot that the workspace can delete.

**Cure.** Same root as r1 D-09 / D3-09: the accordion's open state must name an **interval**, not a
slot. Give intervals stable ids (stops already have them — `useGradientModel.ts:117`, `id: uid()`) and
the deletion of stop *k* removes exactly one interval and leaves every other row's identity, open
state and disclosure intact. A `Collapsible` keyed by id (r1 D-05) gets this for free.

---

### D3-09 · MAJOR · Authoring migrates to a different interval on insert: the curve follows the array slot, not the interval — reproduced live

Round 1 filed this as a labelled hypothesis (D-09: *"HYPOTHESIS — derived from source, not
executed"*). It reproduces.

```
/#/gradient, 2 stops, 1 interval spanning 0 → 100 %
press the "in-out" specimen tile          → head "1 → 2  ease-in-out", literal cubic-bezier(0.42, 0, 0.58, 1)
click .gradient-rail at 25 %              → 3 stops, 2 intervals
```

Measured:

```
afterAuthor:     heads ["1 → 2 ease-in-out"]                       literal "cubic-bezier(0.42, 0, 0.58, 1)"
afterInsertMid:  heads ["1 → 2 ease-in-out", "2 → 3 linear"]       literal "cubic-bezier(0.42, 0, 0.58, 1)"
```

The user authored *"ease-in-out across this gradient."* After adding one midpoint, `ease-in-out`
governs **0 → 25 %** and the remaining **75 % has silently reverted to `linear`** — because
`useGradientModel.ts:88-98` appends the new interval at the **end** while the authored curve stays at
array index 0, and `GradientEasingEditor` keys everything (`openInterval` `:61`, `tuneOpen` `:84`,
`copiedIndex` `:95`, the `update-interval` emit contract `:49`) on the same position.

The file's own header comment (`:52-53`) claims *"identity derived from the interval, the truth"* —
true of `useSpecimenRows`, false of every stateful ref in the component and false of the model
beneath it. There is no notification, no undo affordance, and nothing in the UI that marks the row
whose curve was reassigned.

**Cure.** As D3-08: interval ids. This is a model change, but the design assertion is this
component's — *"a row is an interval"* — and it is currently untrue.

---

### D3-10 · MINOR · Reservation inverted: the head holds **51.3 %** of its width as empty space for a 6-character word, 30 px above a catalogue that hides 70.6 % of itself

Measured, 1440 arm, open row:

```
headW            460.00
nameSpan width   296.53      (flex-1 min-w-0)
name text width   60.55      ("linear", Range.getBoundingClientRect)
slack            235.98      = 51.3 % of the whole head
strip clientW    436   scrollW 1482   hidden 70.6 %
```

`PROPORTION-AUDIT.md:72` (§5.7): *"Visual glyph size, operable target size and **layout reservation**
are separate quantities."* Here reservation is allocated by CSS accident (`flex-1` on the longest-
possible identity, which is never long) rather than by role. The result is the composition in
`frames-r3/D3-n4-mobile-390-four-intervals.png`: a half-empty identity line stacked directly on a
starved catalogue.

The worst case is not even long names: `specimenNameFor` (`easingCatalogue.ts:228-229`) returns the
tile id or `"custom"` — 6 to 16 characters. The reservation is sized for a string that does not
exist.

---

### D3-11 · MINOR · The disclosure buys nothing and costs **+117 % of the route's DOM** per three intervals

Measured on `/#/gradient`, same page, before/after adding three stops:

| | N = 1 interval | N = 4 intervals | growth |
|---|---:|---:|---|
| specimen rows | 1 | 4 | ×4 |
| specimen tiles rendered | 27 | **108** | ×4 |
| `EasingPicker` plot SVGs mounted | 1 | **4** | ×4 |
| `.fading-scroll` ports | 1 | 4 | ×4 |
| **document elements (whole route)** | **511** | **1109** | **+598, +117 %** |
| visible focusables (whole route) | 55 | 67 | +12 |

and, at N = 3 with nothing disclosed:

```
stagesVisible: [false, false, false]      stagesMounted (svg): 6
```

Every authoring stage is fully mounted before the user has pressed anything, and stays mounted when
its row collapses. r2 (D2-14) measured this at N = 1; the growth law is the point: **one added
gradient stop costs ~200 DOM elements and a complete bezier editor**, all of it `display: none`.
The disclosure therefore buys neither cost nor attention — it only buries the editor (r1 D-15).

The multiplication is also the direct cause of the catalogue's dimensions: a 1482 px strip cannot be
given more room when there are N of it (r1 D-11).

---

### D3-12 · MINOR · Disclosure state is per-row sticky with no indicator, and leaves stale `aria-expanded="true"` on hidden controls

Measured, 3 intervals:

```
tune disclosed on row 0     → tuneExpanded ["true","false","false"]   stagesVisible [true,false,false]
switch to row 1             → tuneExpanded ["true","false","false"]   tuneVisible [false,true,false]
                                        ^^^^ row 0's hidden button still advertises expanded
switch back to row 0        → tuneExpanded ["true","false","false"]   stagesVisible [true,false,false]
```

Two consequences. **(a)** The Easing section is silently in two different modes depending on which
row you opened — row 0 shows an editor, row 1 does not — with nothing in the UI recording that. The
only open-state cue on the tune toggle is a colour change (r2 D2-07 / r1 D-06), and that colour is
the row's data-derived ink (r2 D2-11), so "authoring is open" is a different hue on every row.
**(b)** `aria-expanded="true"` persists on a `display: none` button whose controlled region is also
hidden — a state assertion about a region that is not in the accessibility tree.

`GradientEasingEditor.vue:84-88` — `tuneOpen` is a `Record<number, boolean>` keyed by array position,
so it also inherits D3-09's migration bug.

---

### D3-13 · INFO · Disabled, busy and error are not states this component has

Enumerated live on the running route:

```
elements matching .interval-head[disabled], .rail-btn[disabled] :  0
elements with [aria-busy]                                        :  0
[aria-live] / [role=status] / [role=alert] inside this component :  0
```

Cross-checked against the source: there is no `disabled` binding, no pending/loading treatment, and
no error rendering anywhere in the 296 lines or the four children. The clipboard write is `await`ed
(`:100-103`) with no pending state and no `error` branch (r1 D-10). The full state-coverage matrix is
§5.

---

### D3-14 · INFO · Unguarded `:hover` on surfaces reachable by coarse pointers — **HYPOTHESIS, not reproduced**

`GradientEasingEditor.vue:225-227` and `:281-284` declare `:hover` washes with no `@media (hover: hover)`
guard. Census:

```
$ grep -rn "@media (hover" demo/ | wc -l
1                          (demo/color-session/ColorSpaceSelector.vue — the house DOES have the idiom)
$ for f in $(grep -rln ":hover" demo/workbenches/); do grep -q "@media (hover" $f || echo NO-GUARD $f; done
NO-GUARD demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue
NO-GUARD demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue
NO-GUARD demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue
```

Attempted reproduction on a coarse-pointer arm (`hasTouch: true`, `matchMedia("(pointer: coarse)")` →
`true`, `"(hover: hover)"` → `false`), tapping the head and reading its computed background:

```
hoverBefore   rgba(0, 0, 0, 0)
hoverAfterTap rgba(0, 0, 0, 0)
```

**Headless WebKit does not emulate iOS Safari's hover-persists-after-tap behaviour, so I could not
reproduce it and I do not claim it.** Recorded because the guard is absent, one house file
establishes the idiom, and the arm that would decide it is missing from the mega-tranche matrix —
the same class of coverage gap r1 recorded for forced-colors.

---

## 5. State-coverage matrix (the brief's enumeration)

| state | handled? | evidence |
|---|---|---|
| empty | **unreachable by construction** — not a defect | `useGradientModel.ts:83` seeds one interval; `:123` refuses removal below 2 stops |
| populated, N = 1 | yes — the only state ever captured before this round | 60-capture visual matrix |
| **populated, N > 1** | **NO** — 7 findings only visible here | D3-02/03/04/05/08/09/11 |
| **zero open rows** | **NO — undesigned dead state** | D3-08, `frames-r3/D3-08-dead-state-zero-open-rows.png` |
| loading / pending (clipboard write) | **NO** — `aria-busy` count 0, no pending treatment | D3-13 |
| error (clipboard denial) | **NO** — `copyStatus === "error"` never rendered | r1 D-10; D3-13 |
| disabled | **NO** — no `disabled` binding exists | D3-13 |
| **focused (collapsed row)** | **NO — 0 px painted** | D3-02 |
| focused (open row) | partial — 1 ring edge of 4 | D3-02 |
| hovered | yes (desktop); coarse-pointer behaviour unproven | D3-14 |
| active / pressed | not distinguished from hover | `:225-227` — one wash, no `:active` |
| selected (specimen tile) | colour-only | r2 D2-07 |
| dragging | n/a — no drag surface in this component | — |
| **overflowing / truncated (literal)** | **NO at 320 px, NO at 1512 px** | D3-07 + r1 D-04 |
| overflowing (catalogue) | **NO** — 70.6–84.6 % hidden at every arm | D3-07 table; r1 D-02 |
| RTL | **NO** — label inverts, family rules move an edge | r1 D-03, r2 D2-08, r1 D-13 |
| reduced-motion | yes — global guard, `demo/styles/animations.css:184-192` | r1, r2 both confirm |
| forced-colors | **unknown** — the captured arm applied no treatment; no engine here can emulate it | r1 D-06, r2 §3 |
| zoom 200 % | yes for the head/rail (720 px arm measured clean); **no** for the strip | D3-07 table |
| **reflow 320 px (canon arm)** | **NO** | D3-07 |

---

## 6. Negative proof — what I attacked at N > 1 and could not break

| axis | probe | result |
|---|---|---|
| route destruction on stop add/remove | 3 adds + 1 keyboard delete, N 1→4→3 | `pageErrors: []`, `consoleErrors: []` (excluding the app's own dev-config warning), `tryAgain: false` throughout. r2's D2-01 is specific to the `back`/authoring path, not to N. |
| document horizontal overflow at N = 4 | `documentElement.scrollWidth > clientWidth` on all four arms | `false` everywhere, including 320 px. The 1482 px strip stays contained. |
| tab-stop explosion at N = 4 | visible focusables, whole route | 55 → 67 (+12), **not** 55 → 136. The collapsed panels are `display: none`, so their 81 extra tiles are correctly out of the tab order. r2's 28-of-52 figure is an N = 1 fact and does not multiply. |
| accessible names at N = 4 | `aria-label` / `aria-expanded` / `aria-controls` per row | all present and per-row unique for the heads; the two rail buttons are labelled; the ramp is `role="img"` with a label. The route's one nameless button is not in this subtree (r2 confirmed). |
| rail button target size across arms | measured 1440 / 720 / 390 / 320 | 24 × 24 at every arm — never below the 24 px floor, never above it either (r1 D-14). |
| tile target size across arms | measured 1440 / 720 / 390 / 320 | 45.2 × 43.8 at every arm; does not shrink on mobile. |
| `verbatimModuleSyntax` | `:27-40` | every type-only import is `import type`. Compliant. |
| Vue 3.5 idiom | `:42-46` | reactive props destructure used correctly; no `defineModel` round-trip in this file. Compliant. |
| motion tokenisation | `:222-231`, `:269-291` | `--duration-fast` / `--ease-standard` declared, not literal. (The chevron's `transition-transform` remains r1 D-12's coincidence finding.) |
| god module | 296 lines, 3 children + 1 composable + 1 catalogue | each has one job. No violation. |
| legacy shims / dual paths | all 5 files | none. |

---

## 7. Relation to rounds 1 and 2

**New in round 3 — present in neither prior round:**

| id | why it matters |
|---|---|
| **D3-01** | BLOCKER. The curve name measures 3.86 : 1 / 3.73 : 1 — below AA in both schemes. Closes the one axis r2 explicitly declined to publish, by pixel-sampling the composite instead of modelling it. r1 measured only the *welled* literal (5.08) and marked the component sound on contrast. |
| **D3-03** | The injection direction of the ink law, visible in a frame: four rows, one curve, four colours. r2 proved collisions (many curves → one ink); this proves the reverse and is the one a user sees. |
| **D3-04** | Proximity inversion, measured: 8 px between rows vs 10 px inside a row. |
| **D3-05** | OM-4 carried and sharpened: a 4.83× curvature swing from **one** token on **one** class, driven by disclosure state. The registry's existing MT-F030 rows are a cross-element census at N = 1 and do not contain this. |
| **D3-06** | OM-13 carried and mechanised: the well's material step **inverts sign** between schemes (+0.117 L light, −0.038 L dark) and changes hue family, because an opaque `--card`-derived rung is applied over a translucent pane. Plus the producer census: glass `Input` exists, renders `field-control glass-defined`, and has **zero slots** — so the cure is a marked glass-forward ask, not a consume. |
| **D3-07** | The 320 px canon arm: the *shortest* literal in the catalogue truncates (152 / 207 px). With r1 D-04 this proves the reservation fails at **both** ends of the viewport range. |
| **D3-08** | A live-reproduced dead state: zero open rows, section 344.5 → 139.6 px, silent. |
| **D3-11** | The growth law: +598 DOM elements (+117 %) for three added intervals, with all authoring stages mounted before first interaction. |
| **D3-12** | Per-row sticky authoring modality; stale `aria-expanded` on hidden controls. |
| **D3-13** | The explicit disabled/busy/error absence, counted live. |

**Confirmed from a prior round with materially harder evidence:**

* r1 **D-01** (synthetic repro) → **D3-02**: now measured **in the shipped app at N = 4** — 0 px above
  a 2/255 threshold on a collapsed row, and 244 px on a single 4 px edge for the open row.
* r1 **D-09** (labelled HYPOTHESIS) → **D3-09**: reproduced. `ease-in-out` authored over 0–100 %
  becomes the curve of 0–25 % and 75 % of the gradient silently reverts to `linear`.
* r1 D-02 / r2 D2-09 (catalogue hidden) → **D3-07** adds the 320 px figure (84.6 %) and the 720 px
  200 %-zoom figure (70.6 %).
* r2 D2-14 (stages mounted at N = 1) → **D3-11** gives the multiplication.

**Not re-litigated** (owned by r1/r2; nothing I measured contradicts any of them): r2 D2-01 the
`back`-family route destruction; r2 D2-02 the missing `/easing` route/chassis; r2 D2-03 the dead
zero-letterbox law; r2 D2-04 the second preset selector; r2 D2-05 the circular "cell" chips; r2 D2-06
the 9 px off-ladder type; r2 D2-07 colour-only selection; r2 D2-10 the two focus registers and the
nameless scroll port; r2 D2-11 `--motion-accent` painting booleans; r2 D2-13 the keyword-refusing
literal; r1 D-03/D2-08 RTL; r1 D-05 the hand-rolled Collapsible; r1 D-06 forced-colors; r1 D-07 the
Card in a Card-count-0 composition; r1 D-08 no protagonist; r1 D-10 silent copy failure; r1 D-12 the
chevron/panel motion split; r1 D-13 the physical `margin-left`; r1 D-14 the 24 px floor; r1 D-16 the
adjacent heading role.

---

## 8. Defect families

| family | rows | one sentence |
|---|---|---|
| **A token name standing in for a rendered fact** | D3-01, D3-06 | `text-muted-foreground` and `bg-well` are both present and neither renders what its name asserts, because both are specified against `--card` and drawn against a live translucent atmosphere. |
| **Designed for N = 1, shipped for N** | D3-03, D3-04, D3-05, D3-08, D3-09, D3-11, D3-12 | Every law the component states — one ink per specimen, one open row, a row is an interval, a card radius — holds only for the single-interval default that every capture happens to show. |
| **A clip that eats its own affordances** | D3-02 | `overflow-hidden` with a `box-shadow`-only focus ring on a flush child deletes the focus indicator entirely. |
| **Reservation allocated by accident** | D3-07, D3-10 | The identity line holds 51 % slack for a word that never grows while the payload literal truncates at the canon's own 320 px arm. |
| **States that were never designed** | D3-13, D3-14 | Disabled, busy and error do not exist; coarse-pointer hover has no guard and no arm to decide it. |

---

## 9. Strongest defect

**D3-01.** The component exists to tell you which easing curve is on which interval. That sentence —
`linear`, `ease-in-out-back`, `custom` — renders at **3.86 : 1 in light and 3.73 : 1 in dark**,
below WCAG AA at every arm and every scheme, at the application's own default seed. It is not a
subtle miss: the same ink, in the same file, forty pixels lower, was already found to fail, was
already explained in a nine-line comment, and was already cured with a well. The cure was applied to
the value and withheld from the identity. And because the identity's ground is the live atmosphere
rather than an opaque surface, its contrast is not merely wrong today — it is **uncertifiable by
construction**, which is precisely what `VISUAL-CONSTITUTION.md:82` forbids when it says *a token
name is not evidence*.

**D3-02** is the more severe failure in kind (a focus indicator that paints zero pixels is a total
loss, not a degraded one) and it is now proved in the running application rather than a fixture.
**D3-05 and D3-06** are the two owner marks this round was routed to carry, and both now have a
measured mechanism rather than a description.

**No source edits were made by this seat.** Files written: this report and `frames-r3/`, all under
`docs/tranches/V/megatranche/audit/components/wb-gradient-easingeditor/`.

claude-opus-5[1m]

# CHALLENGE · `SequenceAxis` · axis D (DESIGN)

**Subject** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequenceAxis.vue` (49 L)
**Posture** guilty until the tree acquits; every claim carries a falsifier; no browser tooling was
used — every number below is arithmetic over source and tokens, and anything that needs a live
paint is marked **UNPROVEN-NEEDS-LIVE** for SS-13.

**Tally — 13 defects (0 BLOCKER · 3 MAJOR · 6 MINOR · 4 INFO) · 4 superlatives.**

## Read set (whole, read-only)

| file | why |
|---|---|
| `demo/scenes/sequence/SequenceAxis.vue` | subject |
| `demo/scenes/sequence/SequenceTarget.vue` | sole call-site (`:66`), prop source (`AXIS_QUARTERS :155`) |
| `demo/scenes/sequence/SequenceTarget.css` | the grid the axis is placed into; the foreign rules that animate `.seq-axis` (`:221`, `:239`) |
| `demo/scenes/sequence/SequencePlayhead.vue` | the sibling overlay that claims the SAME axis (`:28`) |
| `demo/scenes/sequence/SequenceScrubber.vue`, `SequenceScene.vue`, `sequenceKeys.ts`, `useSequenceInstrument.ts`, `useSequenceDemo.ts` (`STAGGER_MAX :74`) | scene context + PRM path |
| `demo/styles/design-idioms.css:205-211` | `.stage-field-x` — the graduation painter |
| `node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css:1` | `text-mono-caption` |
| `.../typography/scale.css:1` · `.../tokens/scheme-motion.css` · `.../tokens/color-radius.css` · `.../tokens/dark-arm.css` · `.../styles/accessibility.css` | `--type-caption`, `--type-tracking-caps`, neutral ramp (light + dark), forced-colors surface |
| `demo/styles/style.css:130,163` | `--accent-kf` → `--color-progress` (the stage wash) |
| `demo/DESIGN.md §4` | the stage-field law |

The component imports **nothing**. Its whole dependency surface is four class names
(`stage-field-x`, `text-mono-caption`, `text-muted-foreground`, `tabular-nums`), two props, and the
grid its parent places it in. That is the entire audit surface, and it is small enough to be
exhaustive.

## Geometry constants used throughout

From `SequenceTarget.css:36-56`: `--label-col: 3.25rem` · `--col-gap: 0.75rem` ·
`--track-inset: calc(3.25rem + 0.75rem) = 4rem` · `grid-template-columns: var(--label-col) 1fr` ·
**`gap: 0.5rem 0`** (row-gap `0.5rem`, **column-gap `0`**) · `padding: 0.75rem 1rem 1rem` ·
`border: 1px`. From `useSequenceDemo.ts:74`: `STAGGER_MAX = 1600`; ticks therefore render
`0 · 400 · 800 · 1200 · 1600`. `--col-gap` is defined **once** and never re-declared
(`grep -rn -- "--col-gap" demo/` → 3 hits, all in `SequenceTarget.css`).

---

# DEFECTS

## D-1 · MAJOR — the ruler and the clock do not share an origin: a 0.75 rem (12 px) parallax

`SequenceAxis.vue:22` places the ruler with `grid-column: 2`. Its left content edge is therefore

```
x_axis(0) = padding-left(1rem) + --label-col(3.25rem)      = 4.25rem   [column-gap is 0]
```

`SequencePlayhead.vue:28` — the sibling overlay whose comment (`:21-22`) says it "Spans the shared
row-track column … the SAME axis the handles ride" — places itself with

```
x_ph(0)   = left: calc(1rem + var(--track-inset)) = 1rem + 4rem = 5rem
```

Both are measured from the same `position: relative` padding box (`.seq-stage`, `SequenceTarget.css:41`).
Both terminate at the same right edge (`.seq-axis` column 2 ends at the content edge; the playhead
sets `right: 1rem`). So the two overlays that both claim to name the master clock disagree at the
origin by **exactly `--col-gap` = 0.75 rem = 12 px**, and the disagreement closes linearly:

```
Δ(q) = x_ph(q) − x_axis(q) = 0.75rem · (1 − q)
     q =  0     0.25   0.50   0.75   1.00
     Δ = 12px    9px    6px    3px    0px
```

The `0` tick sits 12 px to the LEFT of where the playhead rests at `progress = 0` and where every
lane's `--row-start` gate begins. On a nominal desktop stage (padding box ≈ 656 px → playhead travel
≈ 560 px) 12 px is **≈ 34 ms of a 1600 ms domain**. The component's own header comment (`:2-5`)
asserts the opposite — "Spans the SHARED track column (2) so the tick labels resolve against the
track width" — so the file documents an invariant it does not hold.

Root cause is a single line: `.seq-stage` sets `gap: 0.5rem 0` (column-gap **0**) and the gutter the
rows actually use is re-declared on the subgrid (`.seq-row { column-gap: var(--col-gap) }`,
`SequenceTarget.css:73`). `grid-column: 2` therefore resolves against a gutter-free parent while
every other consumer of the track resolves against a 0.75 rem gutter. The correct placement for the
ruler is the playhead's: `left: var(--track-inset)` (or `grid-column: 2` with the stage's own
`column-gap` set to `--col-gap`).

**Provenance** `SequenceAxis.vue:22`; `SequenceTarget.css:38,39,43,44,45,73`; `SequencePlayhead.vue:28`.
**Falsifier** Measure `getBoundingClientRect().left` of `.seq-axis`, `.seq-playhead-track`, and any
`.seq-track` in a live paint. If all three agree within 1 px, this claim is dead. It also dies if
`--col-gap` is redefined to `0` anywhere in the cascade (grep says it is not) or if a UA resolves
`grid-column: 2` against the subgrid's gutter rather than the parent's (it cannot — `.seq-axis` is a
direct child of `.seq-stage`, not of a subgrid).
**Note** Whichever of the two formulas is right, the third element — `.seq-track` itself, laid out in
a subgrid whose gutter override is spec-ambiguous in how the extra 0.75 rem is absorbed — can align
with **at most one** of them. That is the deeper defect: three elements on one axis, two hand-derived
origin formulas, zero shared token.

## D-2 · MAJOR — the graduations are drawn through the middle of the numerals that name them

`.stage-field-x` (`design-idioms.css:205-211`) paints its rules as a `background-image` on the
element that carries the class. Here that element is `.seq-axis` itself (`SequenceAxis.vue:6`) — a
box `1.1rem` (17.6 px) tall containing nothing but the labels. The rules land at 0 / 25 / 50 / 75 %
of that box. The interior ticks are positioned at `left: calc(var(--tick-p) * 100%)` and centred with
`transform: translateX(-50%)` (`:30-31`) — i.e. **centred on exactly those same fractions**. The
labels have no background of their own, so a 1 px vertical hairline runs top-to-bottom through the
centre of `400`, `800`, and `1200`.

This is not a rounding artefact; it is the construction. A ruler's graduations belong *beside* or
*beneath* its numerals — a hairline struck vertically through a digit is the single loudest
"unfinished" tell an instrument can carry, and this is the scene's designated measurement surface.
The first tick escapes (`translateX(0)`, so the `x=0` rule meets its left sidebearing) and the last
escapes because there is no rule at 100 % at all (see D-8b).

**The fork.** Either the rules are visible — and they deface three of five labels — or they are not
visible, in which case the ruler has no graduations and the "coordinate frame" is only a row of
floating numbers. D-4 measures which horn the tree is on: at 1.82:1 / 2.68:1 the codebase is closer
to the second horn, which is exactly what `docs/frontend-design/demo/sequence.md:92` already
concluded ("the ruler … is the faintest element on screen"). Both horns are defects.

**Provenance** `SequenceAxis.vue:6,10,11,30,31`; `design-idioms.css:205-211`.
**Falsifier** Dies if `--border` resolves to `transparent`; if any rule gives `.seq-axis-tick` an
opaque background, a vertical offset, or a text-shadow halo (none exists — the tick's full ruleset is
`:27-34` plus the two edge rules); or if the background-image is found to be clipped away from the
label band. UNPROVEN-NEEDS-LIVE only for *how objectionable* it looks; the overlap itself is
structural.

## D-3 · MAJOR — `1200` and `1600` collide at ≤ ~369 px viewport, with no mitigation in the tree

`white-space: nowrap` (`:33`) guarantees the labels overlap rather than reflow. Let `A` be the axis
column width and `w` the width of a 4-digit label. `text-mono-caption` gives Fira Code (0.6 em
advance) plus `letter-spacing: var(--type-tracking-caps)` = **0.1 em** (`tokens/scheme-motion.css`;
no demo override), so `w = 4 × 0.7 em = 2.8 em`. The `q=0.75` tick is centred; the `q=1` tick is
right-hugged (`translateX(-100%)`, `:39-41`). They touch when

```
0.75·A + w/2  >  A − w      ⟺      A < 6w
```

Chrome chain (mobile `.stage-cell` is `position: fixed; inset: 0` with *no* inline padding —
`AnimationControlsGroup.css:133-140` — so the stage cell equals the viewport):

```
card   W_c = viewport − 48px          (.seq-root px-6, SequenceTarget.vue:2)
axis   A   = W_c − 32 − 2 − 32 − 52   = W_c − 118px
           (storyboard px-4 · stage border 1px×2 · stage padding 1rem×2 · --label-col 3.25rem)
--type-caption = clamp(0.75rem, 0.71rem + 0.21vw, 1rem)   (glass-ui typography/scale.css)
```

| viewport | `A` | `w` | clearance `0.25A − 1.5w` | verdict |
|---|---|---|---|---|
| 393 px (Pixel 5) | 227 px | 34.1 px | **+5.6 px** | clears |
| 375 px (iPhone SE 2/3) | 209 px | 34.0 px | **+1.2 px** | clears by ~1 px |
| **360 px (Galaxy S / iPhone 12 mini)** | **194 px** | **33.9 px** | **−2.4 px** | **overlaps** |
| 320 px (legacy) | 154 px | 33.7 px | **−12.0 px** | `12001600` |

Crossover ≈ **369 px viewport**. 360 px is the most common Android CSS width in service.

**Contradiction of the hitherto corpus (explicit).** `docs/tranches/S/audit/pass1/DIGEST.json:2185`
claims the collision at 375 px on a "~230 px track"
(`docs/tranches/S/audit/pass1/design/sequence.md:82`). At the **current** token values that is
**FALSE by ~1.2 px** — 375 px clears. The S finding's *substance* survives, its *number* does not;
the hazard sits one common device-class below where S placed it. The S-filed remedy
(`DIGEST.json:2192` — "hide the 0.25/0.75 tick labels under a container query, keep 0/800/1600")
**never landed**: `git log --follow -- demo/scenes/sequence/SequenceAxis.vue` returns exactly two
commits (`4686aa46` L.W11, `f3b5b7dc` R.W5 — a move), both predating S's close, and the tree carries
no container query, no `min-width`, no label-thinning, no `font-size` step-down.

**Provenance** `SequenceAxis.vue:7-13,33,36-41,43-48`; `SequenceTarget.vue:2,155`;
`AnimationControlsGroup.css:133-140`; glass-ui `typography/scale.css:1`, `tokens/scheme-motion.css`.
**Falsifier** UNPROVEN-NEEDS-LIVE on the exact crossover — the chain assumes the glass `Card` root
adds no inline padding/border beyond what `.seq-target` declares, and assumes a 0.6 em mono advance
(true for Fira Code, SF Mono, Menlo; Consolas at 0.55 em would buy ~4 px and move the crossover to
~355 px). PROVEN regardless: the threshold formula `A < 6w`, and that **no mitigation exists in the
tree**. A live render at 360 px CSS width that shows clean separation kills the severity but not the
"remedy filed and unapplied" finding.

## D-4 · MINOR — the graduations read at 1.82:1 / 2.68:1, and the field ships one pitch where the design law demands two

Computed from tokens (sRGB relative luminance, WCAG 2.x formula). `--border: var(--neutral-4)`,
`--muted-foreground: var(--neutral-5)`, `--background: var(--neutral-0)`
(`glass-ui/dist/styles/tokens/color-radius.css`, `tokens/dark-arm.css`). The ruler sits at the **top**
of `.seq-stage`'s vertical wash, i.e. at the `color-mix(… --ball-tone 5%, --background)` end
(`SequenceTarget.css:50-55`), with `--ball-tone → --color-progress → --accent-kf`
(`SequenceTarget.css:8`; `style.css:130,163`).

| pair | light | dark |
|---|---|---|
| `--border` hairline vs washed stage top | **1.82:1** | **2.68:1** |
| `--border` vs bare `--background` | 1.94:1 | 2.82:1 |

Both below the 3:1 that WCAG 1.4.11 asks of meaningful non-text graphics. **I do not claim a 1.4.11
violation** — the numerals duplicate the information the rules carry, which is the exception the SC
allows. It is a craft finding: the graduations of a measurement instrument are effectively invisible
in light theme.

Compounding it, `demo/DESIGN.md §4` states the law — *"The stage field is graph paper: fine and major
pitches are mixed over the foreground/border so the theme retints without a second palette"* — while
`.stage-field-x` (`design-idioms.css:205-211`) draws **one uniform pitch**. The demo's own design
document is not satisfied by the utility every stage consumes.
Fold: `docs/frontend-design/demo/sequence.md:88-93` (audit #6 — "Real time rulers have a major/minor
tier … the ruler is the one place the 'engineering instrument' identity should be loudest and it's the
faintest element on screen"), `:216` (the remedy), `:344` (the wave item). Unapplied — `grep -n
"graph-major" demo/scenes/sequence/` → nothing.

**Falsifier** Re-measure the composited stage top with a colour picker; if the wash or any ancestor
glass layer lifts the hairline above 3:1 the contrast half dies. The DESIGN.md-vs-`.stage-field-x`
half dies only if a second pitch is found (it is not: one `repeating-linear-gradient`, one stop pair).

## D-5 · MINOR — a fixed `rem` line-height married to a fluid `clamp()` font-size; the mobile block breaks the pairing

`line-height: 1.1rem` (`:32`) is a **length**; `--type-caption` is `clamp(0.75rem, 0.71rem + 0.21vw,
1rem)` — **fluid**. The ratio therefore drifts across the viewport range instead of holding:

| viewport | caption size | line-height | ratio |
|---|---|---|---|
| 375 px | 12.15 px | 17.6 px | **1.45** |
| 1440 px | 14.38 px | 17.6 px | **1.22** |
| ≥ 2209 px (clamp ceiling) | 16.00 px | 17.6 px | **1.10** |

A 32 % swing in the ruler's optical weight, with no author intent expressed anywhere.

Where it actually bites: the mobile block (`:43-48`) drops the container to `height: 0.95rem`
(15.2 px) and `margin-bottom: 0` but leaves `line-height: 1.1rem` (17.6 px) untouched. The tick's
line box now **overhangs its own container by 2.4 px**, and the 0.15 rem separation the desktop rule
buys is zeroed at the same moment.

`1.1rem`, `0.15rem`, `0.95rem` are three raw literals in a 29-line stylesheet that defines zero
tokens — in a scene whose sibling file went out of its way to retire "the one raw font-size literal
the redesign introduced" onto the φ ladder (`SequenceTarget.css:95-103`). The axis never joined that
ladder.

**Provenance** `SequenceAxis.vue:24,25,32,44-47`; glass-ui `typography/scale.css:1`;
`SequenceTarget.css:95-103` (the ladder precedent).
**Falsifier** The ratio drift and the box overhang are arithmetic — they die only if `--type-caption`
is overridden in the demo (`grep -rn -- "--type-caption" demo/styles/` → no override) or if a rule
resets the tick's line-height at ≤1023 px (none). **Ink overflow is UNPROVEN-NEEDS-LIVE and I
explicitly do not claim it**: at ≤1023 px the caption is ≤13.5 px, Fira Code figure height ≈0.7 em
≈9.5 px, so the digit ink lands at roughly y ∈ [4.0, 13.4] px inside the 15.2 px container — it
fits. The defect is the geometry, not a visible clip.

## D-6 · MINOR — a magic number crosses the scope boundary: the playhead hardcodes this file's desktop height

`SequencePlayhead.vue:26` reads

```css
top: calc(0.75rem + 1.25rem); /* frame pad-top + axis ruler height */
```

`1.25rem` is not a token. It is `SequenceAxis.vue`'s `height: 1.1rem` + `margin-bottom: 0.15rem`
(`:24-25`) — this component's **desktop** total, transcribed by hand into a foreign file. `:44-47`
then changes both terms at ≤1023 px:

| | ruler bottom (incl. margin) | playhead `top` | gap |
|---|---|---|---|
| desktop | 0.75 + 1.10 + 0.15 = **2.00 rem** | 2.00 rem | flush |
| ≤ 1023 px | 0.75 + 0.95 + 0.00 = **1.70 rem** | 2.00 rem (unchanged) | **0.30 rem (4.8 px) detached** |

The axis publishes no `--axis-h`; `.seq-stage` defines none. Two files hold the same number and only
one of them has a breakpoint.

Same coupling family: `.seq-axis` is a **de-facto public API**. `SequenceTarget.css:221` and `:239`
select it from outside the component to run the power-on wipe and its PRM degrade. Renaming the root
class silently kills both. Nothing in `SequenceAxis.vue` records that its class name is load-bearing
for a foreign stylesheet.

**Provenance** `SequenceAxis.vue:24,25,44-47`; `SequencePlayhead.vue:26`; `SequenceTarget.css:36,45,221,239`.
**Falsifier** The arithmetic is closed. UNPROVEN-NEEDS-LIVE only for the visual consequence — the
playhead's diamond head (`SequencePlayhead.vue:54-66`: an 8 px square rotated 45° at `top: -3px`)
protrudes ≈4.65 px above the track top, so on mobile it lands ≈0.15 px from the ruler's bottom edge
and on desktop it pokes ≈2.25 px *into* the ruler's box. Whether either reads as wrong needs a paint;
the uncontrolled coupling does not.

## D-7 · MINOR — a CAPS utility applied to pure numerals

`text-mono-caption` (glass-ui `typography/utilities.css:1`) is
`{ font-family: var(--font-mono); font-size: var(--type-caption); letter-spacing:
var(--type-tracking-caps); text-transform: uppercase; }`. Applied to `{{ Math.round(q * staggerMax) }}`
(`:10,12`) that yields:

1. **`text-transform: uppercase` is inert** — the content is digits. The utility is being consumed
   for its size rung alone.
2. **0.1 em caps tracking lands on tabular figures.** Labels are ~10 % wider than the mono advance
   requires, which is precisely the term that pushes D-3's collision threshold up by ~19 px of card
   width.
3. **A second, independent mis-registration.** Letter-spacing appends a trailing 0.1 em *inside* the
   box that `translateX(-50%)` centres, so the ink centre sits **0.05 em ≈ 0.7 px left** of the
   graduation on every interior tick — stacking with, not cancelling, D-1. The `:last-child`
   `translateX(-100%)` rule inherits the same error: the trailing space means `1600` stops ~0.7 px
   short of the frame edge that `:35`'s comment says it should hug.
4. **`tabular-nums` is redundant** on a fixed-advance mono face (`:10`).

The non-caps rungs `text-mono-small` and `text-mono-micro` sit in the same utility file. The demo's
own `font-roles.json:82` `_monoContract` licenses mono here (clause b — "a tabular numeric readout")
but says nothing that requires the *caps* rung.

**Falsifier** Dies if `--type-tracking-caps` is overridden in the demo (`grep -rn -- "--type-tracking-caps"
demo/` → zero hits, so it inherits glass-ui's `0.1em`), or if a rule resets `letter-spacing` on
`.seq-axis-tick` (none — the tick's full ruleset is `:27-41`). The 0.7 px figure is sub-pixel and
UNPROVEN-NEEDS-LIVE as a *visible* offset; the width penalty in (2) is not.

## D-8 · MINOR — the ruler states no unit, and it names one graduation that does not exist

**(a) No unit, no axis title.** The ticks render bare integers. The spec that authorises the
component says the labels are milliseconds — `docs/tranches/J/waves/J.W7c-impl.md:112`: *"a `.seq-axis`
ruler NAMES the master-clock axis (quarter labels = `q × STAGGER_MAX` **ms**)"* — and the component's
own comment repeats it (`:5`, "Labels = `q × staggerMax` ms"). The unit is in the spec and in the
source comment and **nowhere in the render**. The only "ms" visible in the storyboard is on the row
labels (`@{{ Math.round(row.at) }}ms`, `SequenceTarget.vue:87`), a different rung in a different
column. A `1600 ms` last label, or a `ms` eyebrow matching `SequenceScrubber.vue:11`'s
"master playhead" micro-cap, costs nothing.

**(b) Five labels over four rules.** `repeating-linear-gradient(to right, var(--border) 0 1px,
transparent 1px calc(100% / 4))` (`design-idioms.css:206-210`) has period 25 %, so its 1 px band
paints at 0 / 25 / 50 / 75 %; the fifth period's band begins at x = 100 %, outside the box. The
`1600` tick therefore names a graduation that is not drawn, and the ruler has **no closing rule** —
an unclosed frame on the one element whose job is to bound the domain.

**Falsifier** (a) dies if a unit string is found rendered anywhere inside `.seq-axis` (the template is
12 lines; there is none). (b) dies if a UA paints a repeating-gradient's final period-start band at
the box edge — it cannot, the band occupies `[100%, 100%+1px)`.

## D-9 · MINOR — a raw viewport literal, and the wrong query family for what is being compressed

`@media (max-width: 1023px)` (`:43`) is one of **16** surviving raw spellings of the demo's single
breakpoint (`grep -rn "max-width: *1023px" demo/ | wc -l` → 16). `docs/tranches/T/audit/lanes/19-fragile-css.md:35-58`
(finding **F1**) names `SequenceAxis.vue:43` in its enumeration of the four unlinked spellings;
`docs/tranches/T/waves/T.F.md:696-703` filed the remedy with a **BORN-RED** gate and names
`SequenceAxis.vue` again in its coordination edge. Unapplied. `demo/DESIGN.md §4` states the law
directly: *"a component must not introduce a viewport literal that bypasses those tokens."*

Beyond the token hygiene there is a design point. What determines whether the ruler needs compression
is the **card's** width, not the viewport's — and the card is `max-w-3xl` inside a stage cell whose
width is not the viewport on desktop. The container-query idiom is already native to this scene:
`.seq-track` (`SequenceTarget.css:114`) and `.seq-playhead-track` (`SequencePlayhead.vue:35`) both
declare `container-type: inline-size`. The one honest defence — that the ≤1023 px compression exists
because the *mobile sheet* eats vertical room, a genuinely viewport-scoped concern
(`SequenceTarget.css:245-248`, and the reasoning is argued at length in
`AnimationControlsGroup.css:105-114`) — holds for the row-pitch rule but does **not** cover D-3's
label density, which is purely a width question and has no query at all.

**Falsifier** Dies if a `--breakpoint-lg`-derived token or a `lg:`/`max-lg:` form is found governing
this rule (it is not — the literal is in a scoped `<style>` block where Tailwind variants are
unavailable, which is itself the argument for hoisting the rule).

## D-10 · INFO — `--tick-p`: unnamespaced, unregistered, with a dead fallback

Written inline at `:11`, read once at `:30`. Three small things:
the scene's stated convention is `--seq-*` (`docs/frontend-design/demo/sequence.md:212` — *"New tokens
are namespaced `--seq-*`"*) and the sibling file honours it (`@property --ball-p`,
`SequenceTarget.css:14-18; --seq-glow :10`); `--tick-p` gets neither the prefix nor an `@property`
registration (harmless here — nothing interpolates it); and `var(--tick-p, 0)` at `:30` is dead —
the inline style always supplies a value. `grep -rn -- "--tick-p" demo/` → exactly one write, one
read, so there is **no live collision**. INFO, not MINOR.

## D-11 · INFO — zero forced-colors provisioning (demo-wide, not axis-specific)

`grep -rn "forced-colors" demo/` → **0**. glass-ui's sole rule
(`dist/styles/accessibility.css`) covers `aria-*`-state borders and nothing here. The axis's entire
graphic layer is a `background-image` gradient plus one token colour; in forced-colors mode the
labels survive as `CanvasText` but the coordinate frame is unprovisioned. Scoped INFO because the
gap is the whole demo's, and the axis's own contribution is one class name.

## D-12 · INFO — `aria-hidden="true"` is defensible, and I record why rather than claim a defect

`:6` removes the only *textual* statement of the storyboard's time domain from AT. It is the right
call and I will not call it a defect: the subtree has **no focusable descendants** (five `<span>`s,
no `tabindex`), so the `aria-hidden` focus trap does not apply; and the domain is independently
recoverable — `aria-valuemin="0"` / `:aria-valuemax="demo.STAGGER_MAX"` on each of the five row
sliders (`SequenceTarget.vue:102-103`) and each row's `@{{at}}ms` text (`:87`).

Two adjacent observations for the sibling challenges, out of scope here: those sliders expose
`aria-valuenow` with no `aria-valuetext`, so AT announces a bare `800`, unitless; and the row labels
wear `text-mono-caption`, so `@800ms` **renders** as `@800MS` while the accessible name stays
lowercase.

**Falsifier** If an SR pass finds no other statement of the 0–1600 ms domain, this flips from INFO to
a defect.

## D-13 · INFO — provenance in shipped source; and no user-facing prose to judge

Three tranche identifiers in a 49-line file's comments — `J.W7c C-SEQ-2` (`:2`), `L.W11 S7 ≤500L
split` (`:2-3`), `J.WZ` (`:42`). `docs/tranches/T/waves/T.F.md:715` (**T.F19 — Provenance sweep: strip
tranche-ID citations from shipped comments**) filed the remedy; unapplied.

On the prose-quality dimension: the component ships **zero user-facing copy** — five numerals, no
label, no heading, no helper text. There is nothing trite to flag because there is nothing to read.
(The absent copy is itself D-8a.)

---

# SUPERLATIVES

L-18 runs both ways; each of these carries its own falsifier.

## S-A · The bespoke verdict is correct — and I verified it against 7.0.0 rather than assuming it

`lane-frontend.md:398` tallies "axis/playhead" under *"Bespoke, no glass counterpart"*. I checked the
tree for a counter-example and found none: glass-ui 7.0.0's `./axes` subpath is a **prop-vocabulary**
module (`dist/components/_shared/axes.d.ts` — `SURFACES`, `SIZES`, `ORIENTATIONS`, `TONES`…), not a
graduated ruler; and the `/timeline` family's geometry
(`dist/components/timeline/geometry.d.ts`) is entirely segment-weight math over `TimelineSegment[]`
(`fillFor`, `segmentWeight`, `createContinuousGeometry`, `stitchedRailGradient`) with **no tick,
graduation, or scale API**. The census row stands, verified, not inherited. Against that, 49 lines /
2 props / zero imports / zero reactivity / zero lifecycle is close to the minimum expression of a
ruler.
**Falsifier** A graduated-scale primitive anywhere in glass-ui 7.0.0 (`grep -ril "tick\|graduation" 
dist/components/` returning a scale renderer) demotes this from "justified bespoke" to "shadow
component," and the leanness stops being a virtue.

## S-B · The edge-hug pair is the correct minimal solution to end-label clipping

`:36-41` — `:first-child { translateX(0) }` / `:last-child { translateX(-100%) }`. Two declarations
solve a problem that is usually met with a JS measurement pass, an `overflow` hack, or per-tick
conditional classes. It is declarative, it costs nothing, and the comment at `:35` states the intent
plainly.
**Falsifier** Dies if `quarters` ever becomes dynamic and can reach length 1 — both selectors then
match the same node and `:last-child` wins on source order, right-aligning a lone tick that should
be left-aligned. Today `AXIS_QUARTERS` is a 5-element `as const` (`SequenceTarget.vue:155`), so the
state is unreachable and this stays a superlative rather than a defect.

## S-C · PRM honesty is complete and double-guarded

The only motion that touches this component is the power-on ruler wipe, and it is stopped twice,
independently:

- **JS** — `useSequenceInstrument.ts:29-32` reads `matchMedia("(prefers-reduced-motion: reduce)")`
  and returns before `isPoweringOn` is ever set, so the `.is-powering-on` class never lands.
- **CSS** — `SequenceTarget.css:238-243` sets `animation: none` on `.seq-stage.is-powering-on
  .seq-axis` under `@media (prefers-reduced-motion: reduce)`, with the file's own comment marking it
  MANDATORY.

The keyframe uses `both` fill (`:222`), so killing the animation leaves **no residual** `opacity: 0`
or `clip-path: inset(0 100% 0 0)` — the still frame is the settled frame. Belt-and-braces without a
gap, which is rarer than it should be.
**Falsifier** Dies if `demo.powerOn()` or any consumer writes inline `animation`/`style` that bypasses
the media query (it does not — `useSequenceInstrument.ts` toggles one boolean), or if the JS check
were the *only* guard and a user enabled PRM after mount (the CSS guard covers exactly that case).

## S-D · Token-derived label contrast passes AA in both themes, at the ruler's worst-case position

Computed from `--neutral-5` on `color-mix(in srgb, --accent-kf 5%, --neutral-0)`, which is the **top**
of `.seq-stage`'s vertical wash and therefore the most-tinted, lowest-contrast band the stage
produces — exactly where the ruler sits:

| theme | ruler label contrast | AA (4.5) | AAA (7.0) |
|---|---|---|---|
| light | **4.89:1** | pass, +0.39 margin | — |
| dark | **7.30:1** | pass | pass |

(Bare `--background`, no wash: 5.21:1 / 7.70:1.) That the worst case still clears AA in both arms —
without a per-scene contrast override, purely from the token ladder — is the design system working
as designed.
**Falsifier** Thin margin, honestly reported: light theme clears by 0.39. Any lift of the wash above
~5 %, a heavier `--accent-kf`, or a glass backdrop layer composited beneath the stage would push it
under 4.5. UNPROVEN-NEEDS-LIVE for the composited stack; PROVEN for the token arithmetic. Falsified
by a measured light-theme reading below 4.5:1.

---

# Corpus reconciliation

| corpus id | position | this challenge |
|---|---|---|
| `lane-frontend.md` S-1..S-8 | none covers `SequenceAxis` | correct — no glass counterpart exists (**S-A**, verified against 7.0.0, not assumed) |
| `lane-frontend.md:398` "Bespoke, no glass counterpart … axis/playhead" | agree | **corroborated** by direct inspection of `./axes` + `/timeline` |
| `lane-frontend.md` S-4 (`SequenceScrubber` → `ScrubberTimeline`/`Slider`) | sibling, not subject | untouched; noted that S-4's landing would not affect D-1 (the parallax is in the stage grid, not the scrubber) |
| `lane-frontend.md` F-1 (glass-ui phantom dependency) | out of axis D | noted: every token figure above is read from the **installed** 7.0.0 tree, which F-1 says is unlocked and unreproducible. If F-1's resolution moves glass-ui, D-4/D-7/S-D must be recomputed |
| `S/audit/pass1/DIGEST.json:2185,2192` (label collision at 375 px) | **contradicted on the number, upheld on the substance** | **D-3** — 375 px clears by ~1.2 px; the collision begins at ≈369 px. The filed remedy never landed (git history: 2 commits, both pre-S) |
| `S/audit/pass1/design/sequence.md:200` (missing `aria-valuetext`, `SequenceAxis.vue:6`) | agree, out of scope | **D-12** — recorded as INFO with the reason `aria-hidden` is defensible here; the `aria-valuetext` gap belongs to `SequenceTarget` |
| `T/audit/lanes/19-fragile-css.md:43` F1 (`SequenceAxis.vue:43`) | agree | **D-9** — still red, 16 sites |
| `T/waves/T.F.md:696-703` (breakpoint gate BORN-RED) + `:715` (T.F19 provenance sweep) | agree | **D-9**, **D-13** — both unapplied |
| `frontend-design/demo/sequence.md:88-93, 216, 344` (audit #6, major/minor raster) | agree | **D-4** — plus the new observation that `demo/DESIGN.md §4`'s "fine and major pitches" law is *already* unsatisfied by `.stage-field-x` itself |
| `J/waves/J.W7c-impl.md:112` (C-SEQ-2 charter) | the charter is the falsifier | **D-8a** (the "ms" the charter specifies is unrendered) and **D-1** (the charter's "NAMES the master-clock axis" is broken by a 12 px origin error) |

# What would fix the three MAJORs (not a patch — a shape)

One shared origin token retires D-1 and half of D-6: `.seq-stage { --axis-h: 1.25rem }` plus placing
the ruler at `left: var(--track-inset)` the way the playhead already does, so the ruler, the playhead,
and the rails derive from one formula instead of three hand-copies. D-2 wants the graduations moved
off the label band — a short bottom-edge tick set (`background-position: bottom`, height ~4 px)
instead of full-height rules through the digits, which also delivers the major/minor tier
`DESIGN.md §4` and `sequence.md:216` both ask for. D-3 wants the S-filed container query, now
correctly thresholded: hide the `q=0.25`/`q=0.75` labels below `A < 6w` (≈ a 322 px card), keeping
`0 / 800 / 1600 ms`.

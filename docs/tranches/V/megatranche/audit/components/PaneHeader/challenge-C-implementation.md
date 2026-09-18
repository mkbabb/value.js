# CHALLENGE-C — `demo/shared/ui/PaneHeader.vue`: implementation

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`. The seat was
spawned with an explicit Opus-5 declaration; it is declared, not inherited.

**Pass discipline (E-1 twice-audit).** A first-pass challenge-C report already existed at this path
(untracked, written earlier today by a seat with the same declaration). I did not trust it and I did
not delete it: it is preserved verbatim at
`challenge-C-implementation.pass-1-2026-07-28-prior.md`. This document is the **second pass**. Every
finding below is re-derived from my own probes (`probe-C2-*.mjs`, committed beside this file);
where pass-1 reached a conclusion I reproduced, I say so and cite both probes; where pass-1 was
**materially understated**, I say that too — the headline finding is one of those.

**Substrate.** Work order names HEAD `c654824e`. Tree HEAD at audit time is `fe8785e5`
(`docs(megatranche): bank the consumer CRUD and Goldilocks DAG audit`). `demo/shared/ui/PaneHeader.vue`
is byte-identical across that interval (last touched in T.W4); measurements are against `fe8785e5`
plus the live dev server on `http://localhost:9000`.

**Verdict: DEFECTIVE.** Thirteen findings. Two are shipping, user-visible, engine-specific
destruction of the pane on Safari; one is a permanently-unresolvable animation pose on a shipped
route at ordinary laptop sizes; one is a certifying gate whose green is an artifact of the e2e
config's viewport. Subject is 224 lines — 39 of template + script, 185 of style and prose — consumed
by **nine** panes.

### Probes (all runnable: `node docs/tranches/V/megatranche/audit/components/PaneHeader/<probe>`)

| probe | decides |
|---|---|
| `probe-C2-01-supports-gate.mjs` | is the `@supports` condition the right feature test? (webkit/chromium/firefox) |
| `probe-C2-02-scrub-cost.mjs` | A/B/C/D interleaved control: what the veil scrub costs the main thread |
| `probe-C2-03-live.mjs` | 2 engines × 2 PRM states × desktop/phone × 4 routes — the full live matrix |
| `probe-C2-04-short-scroll.mjs` | **the unresolvable pose**: ranges vs available scroll travel, 3 viewports |
| `probe-C2-05-pole-sweep.mjs` | **the pole**: shipped ratio as a function of viewport width, isolated + live |
| `probe-C2-06-shots.mjs` | paints the pole — 4 WebKit screenshots beside this file |
| `probe-C2-07-consequences.mjs` | gate-3 replication · the vanishing control · the dead band |
| `probe-C2-08-contain.mjs` | `contain` control experiment + the `position:fixed` trap |
| `probe-03-atan2-mechanism.mjs` (pass-1, re-run by me) | isolates the WebKit `tan(atan2())` mechanism to 6 s.f. |
| `probe-09-prm-mechanism.mjs` (pass-1, re-run by me) | MT-F023's true mechanism |

**No source edits land from this seat.** Only `docs/tranches/V/megatranche/audit/components/PaneHeader/`
was written.

---

## C-1 · BLOCKER — `--pane-title-shrink-ratio` is not a ratio on WebKit. It is a pole-crossing function of viewport width. At 1024px the pane title renders **10.87×** and covers the whole pane; at 1280px it is **mirrored off-screen** and takes a live control with it.

### The declaration

`PaneHeader.vue:140-142`:

```css
--pane-title-shrink-ratio: calc(
    tan(atan2(var(--type-heading), var(--type-display-1)))
);
```

with, from `node_modules/@mkbabb/glass-ui/dist/styles/typography/scale.css:1`:

```css
--type-heading: 1.618rem;
--type-display-1: clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem);
```

The comment at `:132-139` rests the whole design on the identity `tan(atan2(y, x)) === y / x`:
*"The ratio is CLOSED-FORM, not a hand constant: tan(atan2(y, x)) is the CSS length-ratio identity,
so the endpoint law survives display-1's viewport-fluid clamp at every band."*

### The mechanism — WebKit feeds `tan()` the DEGREE magnitude as RADIANS

`probe-03-atan2-mechanism.mjs`, re-run by me on a bare `<div>`, `:root` 16px:

```
===== webkit =====
  tan(atan2(1rem, 1rem))          identity requires 1          -> matrix(1.619775, …)
  tan(atan2(2rem, 1rem))          identity requires 2          -> matrix(0.688691, …)
  tan(atan2(1.618rem, 2.618rem))  identity requires 0.618029   -> matrix(0.310808, …)
  tan(atan2(1em, 1em))            identity requires 1          -> matrix(1.619775, …)
  tan(atan2(10px, 10px))          identity requires 1          -> matrix(1, …)
  CURE-A calc(1.618rem / 2.618rem)                             -> matrix(0.618029, …)
  CURE-A' calc(1rem / 1rem)                                    -> matrix(1, …)
===== chromium =====
  …all five identities correct: 1, 2, 0.618029, 1, 1 ; both cures correct
```

Hypothesis and confirmation, to every digit WebKit serialises:

| expression | identity | WebKit measured | `Math.tan(deg-magnitude)` |
|---|---|---|---|
| `tan(atan2(1rem, 1rem))` | 1 | 1.619775 | 1.6197751905438615 |
| `tan(atan2(2rem, 1rem))` | 2 | 0.688691 | 0.6886911649460621 |
| `tan(atan2(1.618rem, 2.618rem))` | 0.618029 | 0.310808 | 0.310807581296239 |

`px` operands are correct in both engines. The fault is confined to font-relative units inside
`atan2()` — exactly what this declaration feeds it.

### Why this is far worse than "a 2× error" — the pole sweep

Pass-1 measured two viewports (1440 desktop → 0.311; iPhone → 1.62) and concluded "half the designed
rung" plus "a 1.62× enlargement on phones". **That understates it by an order of magnitude.** Because
`--type-display-1` is viewport-fluid, `atan2`'s angle sweeps 45° → 31.7° as the viewport widens — and
45 → 31.7 **radians** walks through several poles of `tan`. So the shipped value is unbounded and
sign-changing in the viewport width. `probe-C2-05-pole-sweep.mjs`, isolated arm *and* live arm on
`http://localhost:9000/#/`, agreeing to the last digit at every width where the About pane is
present:

```
########## webkit ##########
  width | display-1 px | designed h/d | SHIPPED tan(atan2()) | live title scale @ /#/
    360 |       25.888 |     1.000000 |             1.619775 |          n/a  <== ENLARGES
    390 |       25.888 |     1.000000 |             1.619775 |          n/a  <== ENLARGES
    430 |       26.080 |     0.992638 |             1.042117 |          n/a
    640 |       29.440 |     0.879348 |              0.52827 |          n/a
    768 |       31.488 |     0.822154 |            -6.375695 |          n/a  <== NEGATIVE (mirrored)
    900 |       33.600 |     0.770476 |            -0.085927 |          n/a  <== NEGATIVE (mirrored)
   1024 |       35.584 |     0.727518 |            10.868346 |    10.868346  <== ENLARGES
   1100 |       36.800 |     0.703478 |             0.638198 |     0.638198
   1180 |       38.080 |     0.679832 |            -0.363219 |    -0.363219  <== NEGATIVE (mirrored)
   1200 |       38.400 |     0.674167 |            -0.642357 |    -0.642357  <== NEGATIVE (mirrored)
   1240 |       39.040 |     0.663115 |            -1.587175 |    -1.587175  <== NEGATIVE (mirrored)
   1280 |       39.680 |     0.652419 |             -7.39094 |     -7.39094  <== NEGATIVE (mirrored)
   1300 |       40.000 |     0.647200 |            13.171055 |    13.171055  <== ENLARGES
   1320 |       40.320 |     0.642063 |              3.42998 |      3.42998  <== ENLARGES
   1360 |       40.960 |     0.632031 |             1.205336 |     1.205336  <== ENLARGES
   1400 |       41.600 |     0.622308 |             0.518573 |     0.518573
   1440 |       41.888 |     0.618029 |             0.310808 |     0.310808
   1512 |       41.888 |     0.618029 |             0.310808 |     0.310808
   1600 |       41.888 |     0.618029 |             0.310808 |     0.310808
   1920 |       41.888 |     0.618029 |             0.310808 |     0.310808
```
Chromium's column is identical to the designed column at all twenty widths. WebKit is correct at
**zero** of them. (`n/a` = the About pane is not mounted below `lg`; the isolated arm still measures
the declaration.)

### It paints. Screenshots committed beside this file.

`probe-C2-06-shots.mjs`, WebKit, `/#/` (About pane), scrolled 300px:

```
webkit 1024x900  tf=matrix(10.868346,…)  rect {x:543.4, y:120, w:4777.8, h:867.8}   viewport 1024x900
webkit 1280x900  tf=matrix(-7.39094,…)   rect {x:-2741.6, y:-215.6, w:3414.6, h:335.6}
webkit 1300x900  tf=matrix(13.171055,…)  rect {x:683.1, y:120, w:6085, h:1156.4}
webkit 1440x900  tf=matrix(0.310808,…)   rect {x:754, y:120, w:143.6, h:28.6}
```

- **`shot-C2-webkit-1024-plus10.87x.png`** — the title "About the color spaces, Lab" is a
  **4777.8 × 867.8 px** black slab reading `Ab` / `spa` painted across the entire right pane, over
  "Components", "Key Properties", "Conversion Graph" and every value in them. The pane is destroyed.
- **`shot-C2-webkit-1280-negative7.39x.png`** — the title is **absent**. A uniform negative scale is
  a point reflection; `transform-origin: left top` throws the mirrored box to `x = -2741.6,
  y = -215.6`. The header band renders with no title in it at all.
- `shot-C2-webkit-1300-plus13.17x.png`, `shot-C2-webkit-1440-plus0.311x.png` for the other two cells.

### A live control disappears

The About pane slots its colour-space `<button>` **inside** the `<h3>` (`AboutPane.vue:15-27`), so it
rides the same transform. `probe-C2-07-consequences.mjs` (b):

```
webkit 1280x900
  REST  {"name":"Lab","rect":{"x":806.3,"y":161.6,"w":84.1,"h":45.4},"inViewport":true, "hitAtCentre":"BUTTON.bg-transparent"}
  STUCK {"name":"Lab","rect":{"x":-934,"y":-523.4,"w":621.4,"h":335.6},"inViewport":false,"hitAtCentre":"OFF-VIEWPORT"}
webkit 1440x900
  REST  {"name":"Lab","rect":{"x":894.4,"y":164,"w":88.6,"h":47.9},"inViewport":true,"wcag258_24px":true}
  STUCK {"name":"Lab","rect":{"x":797.6,"y":133.7,"w":27.6,"h":14.9},"inViewport":true,"wcag258_24px":false}
```

At 1280×900 on Safari, **scrolling the About pane removes the colour-space selector from the
viewport**. Not "makes it small" — removes it. That is the single control that switches the entire
About pane's subject.

### The `@supports` gate is not protection

The comment at `:138-139` argues the declaration is *"Guarded by the same @supports SDA gate as its
one consumer (atan2: Chromium 111+ ⊂ SDA engines)"*. The premise "SDA support implies correct
`atan2`" is false by measurement: this WebKit build satisfies `@supports (animation-timeline:
scroll())` — the animation demonstrably runs — and gets `atan2` wrong at every width.

### Cure (strictly less machinery than the defect)

CSS-values-4 permits `<length> / <length>` → `<number>` directly:

```css
--pane-title-shrink-ratio: calc(var(--type-heading) / var(--type-display-1));
```

Measured correct on both engines at both endpoints (`probe-03`, `CURE-A` / `CURE-A'` rows above).
It deletes the trigonometry, deletes the `@supports`-implies-correct-`atan2` argument from the
comment, restores the phone no-op to exactly 1, and preserves the fluid-clamp property the
closed-form was chosen for. **One line, at `PaneHeader.vue:140-142`.**

---

## C-2 · MAJOR — MT-F023 adopted. The root's cure is the only available one; its stated mechanism is imprecise, and the truer mechanism makes the ruling stronger.

**Adopted verbatim: STRUCTURE, not gate.** Move `PaneHeader.vue:177-194` inside
`@media (prefers-reduced-motion: no-preference)`.

**Observable, reproduced independently** (`probe-C2-03-live.mjs`, chromium desktop, `/#/`):

```
--- chromium/desktop/prm=no-pref /#/  (scrolled to 300) ---
   REST  tf=matrix(1, 0, 0, 1, 0, 0)          veil=0.52  descOp=1
   STUCK tf=matrix(0.618029, 0, 0, 0.618029)  veil=1     descOp=0
--- chromium/desktop/prm=reduce   /#/  (scrolled to 300) ---
   REST  tf=matrix(1, 0, 0, 1, 0, 0)          veil=0.52  descOp=1
   STUCK tf=matrix(0.618029, 0, 0, 0.618029)  veil=1     descOp=0
```

Byte-identical under `reduce`. Same on WebKit (`0.310808` both ways).

**The mechanism correction.** The root states the animations are *"STRUCTURALLY unreachable by the
global prefers-reduced-motion guard … because a scroll-driven animation has `animation-duration:auto`
and the guard only overrides `animation-duration` + `animation-iteration-count`."* The guard's reach
is not the problem — it reaches the property fine. `probe-09-prm-mechanism.mjs`, re-run by me:

```
webkit    rm=no-preference  title {"duration":"auto",     "timeline":"--pane-scroll","range":"0px 120px","fill":"both"}
webkit    rm=reduce         title {"duration":"0.00001s", "timeline":"--pane-scroll","range":"0px 120px","fill":"both"}
chromium  rm=no-preference  title {"duration":"auto",     "timeline":"--pane-scroll", …}
chromium  rm=reduce         title {"duration":"1e-05s",   "timeline":"--pane-scroll", …}
```

`demo/styles/animations.css:188` **does** compute onto the element, on both engines. What happens is
that both engines **ignore a time-valued `animation-duration` when `animation-timeline` names a
progress-based timeline** — the effect's progress comes from the timeline, not from elapsed time. So
the defect is not that the guard is *too narrow*; it is that **duration-based neutralisation is
categorically incapable of reaching any scroll- or view-driven animation.** No widening of
`animations.css:184-193` can ever fix this class. That makes "STRUCTURE not gate" not merely
preferable but the only cure that exists — a strictly stronger argument than the one the ruling was
issued with. I do not weaken it into another override stacked on the blunt guard.

The root's footnote is right that the guard's *narrower* claims hold: the headline comment at
`animations.css:178` ("Neutralises CSS keyframe animations and transitions app-wide") is false as
written; its WebGL-rAF clauses are true.

**The cure is the design system's own idiom.** glass-ui 7.0.0 nests PRM outside `@supports` at four
sites — `dist/styles/scroll-driven.css` (`.scroll-progress`; `[data-scroll-reveal] > *`) and
`dist/styles/scroll-choreography.css` (`.scroll-cascade > *`; `.scroll-pin-stage`). PaneHeader has
the `@supports` half and, at `:148-151`, an argument for omitting the PRM half (*"A scroll SCRUB is
position-mapped, not time-based motion, so it needs no PRM gate"*). The producer contradicts that
argument in code four times; under edict 4 the producer idiom governs.

**The cure is free at rest.** `from`-state = base-state is real here (negative proof N-2 below), so
wrapping in `no-preference` leaves the reduce path painting exactly today's rest header.

---

## C-3 · MAJOR (new in pass 2) — the three animation ranges are absolute pixel constants with no relation to the pane's scroll travel. On Gradient at ordinary laptop sizes the choreography can never complete and parks the caption at **opacity 0.2375 forever**.

`PaneHeader.vue:181,187,192` hard-code `animation-range: 0px 64px` (veil), `0px 120px` (title),
`0px 80px` (description). Nothing anywhere checks that the pane *has* that much scroll travel. With
`fill: both`, a pane whose `scrollHeight − clientHeight` is less than the range parks the element at a
fractional pose that **no user input can resolve**.

`probe-C2-04-short-scroll.mjs` — `maxScroll` and the state at `scrollTop = maxScroll`:

```
########## chromium @ desktop 1440x900 ##########
  /#/            "About the color spaces" maxScroll=6685  END veil=1      scale=0.618029 descOp=0
  /#/gradient    "Gradient"               maxScroll=61    END veil=0.9775 scale=0.805831 descOp=0.2375  VEIL-UNREACHABLE,TITLE-UNREACHABLE,DESC-UNREACHABLE
########## chromium @ laptop 1512x982 ##########
  /#/gradient    "Gradient"               maxScroll=5     END veil=0.5575 scale=0.984085 descOp=0.9375  VEIL-UNREACHABLE,TITLE-UNREACHABLE,DESC-UNREACHABLE
########## webkit @ desktop 1440x900 ##########
  /#/gradient    "Gradient"               maxScroll=60    END veil=0.97   scale=0.655404 descOp=0.25    VEIL-UNREACHABLE,TITLE-UNREACHABLE,DESC-UNREACHABLE
########## webkit @ laptop 1512x982 ##########
  /#/gradient    "Gradient"               maxScroll=3     END veil=0.5425 scale=0.98277  descOp=0.9625  VEIL-UNREACHABLE,TITLE-UNREACHABLE,DESC-UNREACHABLE
```

Three consequences, all shipping:

1. **A caption permanently rendered at 23.75% alpha.** On Gradient at 1440×900 the description
   *"Build gradients with per-interval easing and CSS output."* sits at `opacity: 0.2375` at the
   bottom of the pane's travel and stays there. That is not a designed state — the design has exactly
   two (1 and 0). At 0.2375 over the resting plate it is far under 4.5:1; the AB-2 certification at
   `:118-121` ("≥4.5 on the composited resting plate") is asserted for `opacity: 1` only and is
   silently void for every fractional park.
2. **The veil never reaches its own designed stuck material.** At 1512×982 it never leaves 0.5425 —
   the whole swell is unreachable — while the header is nonetheless sticky and nonetheless occluding.
3. **A title parked at 0.806 / 0.984** — neither the designed rest rung nor the designed heading rung.
   The "lands EXACTLY on the retired heading rung" claim (`:131-133`) is true only on panes with
   ≥120px of travel, which is **one** of the nine (About).

**Cure.** Ranges must be expressed against the timeline's own extent, not against absolute device
pixels. The scroll-driven-animations spec gives this directly: `animation-range: entry 0% exit 100%`
against a view timeline, or — keeping the scroll timeline — `animation-range: 0% 100%` with the
occlusion budget expressed as a `calc()` of the header's own height rather than a magic 64/120/80.
A pane with no travel then has no animation to park in, which is the correct degenerate case and is
already what the nine zero-overflow hosts get today (`maxScroll=0` rows above: veil 0.52, `scale=none`,
`descOp=1` — clean base state).

---

## C-4 · MAJOR — the collapse reclaims **zero** scrollport and leaves a pointer-opaque dead band; the `opacity: 0` description keeps its box, its hit target, and its accessibility-tree entry.

The choreography is compositor-only by design (`:145-157`, the F3 layout fork "is RETIRED"). The
unstated consequence: `transform` and `opacity` do not affect layout, so **the sticky header's
reserved height never changes.** `probe-C2-03-live.mjs`, `/#/`, both engines:

```
chromium 1440x900  REST hdrH=136.64  ->  STUCK hdrH=136.64   titleH 91.94 -> 56.82   descOp 1 -> 0   descH 18.7 -> 18.7
webkit   1440x900  REST hdrH=136.59  ->  STUCK hdrH=136.59   titleH 91.91 -> 28.57   descOp 1 -> 0   descH 18.7 -> 18.7
```

`probe-C2-07-consequences.mjs` (c), chromium 1440×900, scrolled 300:

```
{ "headerH": 136.6, "viewportH": 900, "titleBottom": 176.8, "headerBottom": 240.6,
  "deadBandPx": 63.8, "deadBandPctViewport": 7.1,
  "descOpacity": "0", "descRectH": 18.7, "descAriaHidden": null,
  "hitColumn": ["179:DIV.pane-header","191:DIV.pane-header","203:DIV.pane-header",
                "215:P.pane-header-desc","227:P.pane-header-desc","239:DIV.pane-header"] }
```

A "shrink" whose purpose is to give scrollport back gives back **0px** and takes **63.8px = 7.1% of
the viewport** of click surface, permanently. The band is not inert: every sample down the header's
centre column from the shrunken title's underside to the header's bottom edge hits the header — and
at `y=215` and `y=227` the **invisible** `<p>` at `opacity: 0` is still the hit-test winner.
`aria-hidden` is `null`, so a screen reader still announces the caption while it is invisible, and
text selection still grabs it.

**Cure.** The choreography needs exactly one honest layout channel, and the cheapest correct one also
fixes the a11y and hit-test halves in the same edit: collapse the description's **box** rather than
only its ink — `.pane-header-desc-wrap { grid-template-rows: 1fr }` animated to `0fr` (the wrap div
already exists at `:22`, which is why the `-wrap` element is there at all), with the title's scale
riding a matching `margin-block-end` reduction. That removes the box, the hit target and the
accessibility entry together and *replaces* the opacity keyframe instead of adding to it. O-11 gate
4's live half (`≤5 Layout events`) must then be reformed to **bound** layout per scrub rather than
forbid it, or it will veto the cure — that is a gate reform, not a reason to keep the defect.

---

## C-5 · MAJOR — a leaf component writes `contain: layout style paint` onto nine sibling pane roots, on a rationale that is not how the feature works, and it traps `position: fixed`.

`PaneHeader.vue:54-57` emits a **global, unscoped** rule onto a class it does not own.
`.pane-scroll-fade` lives on the root of nine sibling pane Cards — BrowsePane, PalettesPane,
AdminPane, AboutPane, MixPane, GradientPane, GeneratePane, ExtractPane, and (as an inner div, not the
Card root — the comment at `:43-45` is wrong about that too) ConfigSliderPane:

```css
.pane-scroll-fade { contain: layout style paint; scroll-timeline: --pane-scroll block; }
```

The comment at `:50-53` justifies it: *"`contain: layout style paint` isolates the named
scroll-timeline so PaneHeader animations respond to THIS pane's scroll only, not portal-triggered
layout shifts in ancestor containers."* Named-timeline lookup resolves to the nearest ancestor that
*declares* the name; the property that scopes timeline names is `timeline-scope`; `contain` has no
role in it. **`timeline-scope` is supported in both engines** (`probe-C2-01`: `timeline-scope:
--pane-scroll` → `true` on webkit and chromium), so the correct property was available and was not
used.

**Control experiment** (`probe-C2-08-contain.mjs`) — strip containment at runtime, re-measure:

```
chromium SHIPPED     contain="content"  rest{veil 0.52, matrix(1,…)}  stuck{veil 1, matrix(0.618029,…)}  fixedLandsAt{104,730}
chromium contain:none contain="none"    rest{veil 0.52, matrix(1,…)}  stuck{veil 1, matrix(0.618029,…)}  fixedLandsAt{0,0}
webkit   SHIPPED     contain="content"  rest{veil 0.52, matrix(1,…)}  stuck{veil 1, matrix(0.310808,…)}  fixedLandsAt{104,730}
webkit   contain:none contain="none"    rest{veil 0.52, matrix(1,…)}  stuck{veil 1, matrix(0.310808,…)}  fixedLandsAt{0,0}
                                                                       hostOriginAt {103,729} · viewport origin {0,0}
```

The animation is **byte-identical** with containment removed, on both engines: the declaration is not
load-bearing for its stated purpose. What it *does* do is make every pane a containing block for
`position: fixed` descendants — a probe element at `position:fixed; top:0; left:0` lands at
`(104, 730)`, the host's content-box origin (host + 1px border), instead of `(0, 0)`. Any
`position: fixed` descendant of any pane — a non-teleported dialog, a floating-panel fallback, a
fixed tooltip — is silently mispositioned by the pane's page offset **and** clipped by
`contain: paint`. A latent trap on nine surfaces, planted by a leaf, on a false rationale.
`getComputedStyle` serialises the shorthand as `content`, confirming all three of `layout style paint`
are in force.

Producer precedent for the right shape: glass-ui's own sticky scroll stage takes
`.scroll-pin-stage { position: sticky; inset-block-start: 0; contain: layout paint; }`
(`dist/styles/scroll-choreography.css`) — narrower (no `style`), and on a stage the producer owns.

**Cure.** Delete `contain` from `:55` (measured non-load-bearing); the `overflow-y-auto
overflow-x-hidden` already on all nine consumers provides the paint clip they actually rely on. If
timeline scoping is genuinely wanted, use `timeline-scope`. The remaining single-declaration
`scroll-timeline` rule is a producer-shaped concern and belongs in glass-ui beside
`scroll-driven.css` under edict 4, not in an unscoped `<style>` block inside a leaf consumer.

---

## C-6 · MAJOR — accessibility: the pane's primary title is a hardcoded `<h3>`; the app has **zero** `<h1>`; on About the `<h3>` precedes its own `<h2>` children; and consumers slot interactive and live-updating content **into** the heading.

`PaneHeader.vue:21` is `<h3 class="pane-header-title font-display"><slot /></h3>` — a literal level,
no prop, on the component that renders the largest text on every pane (its own comment at `:12-14`:
*"the pane title speaks the DISPLAY voice — the ONE site; all 9 panes inherit"*).

The mega-tranche visual audit measured the first half: `h1` is **0 in all 60 captures**
(`docs/tranches/V/megatranche/audit/visual/REPORT.md`, four matrices × fifteen routes). I reproduce it
live and add the outline. `probe-C2-03-live.mjs`, `/#/`, document order, `*` = a PaneHeader title:

```
h1Count=0
outline: H3 H3* H2 H2 H2 H2 H2 H2 H3 H3 H2 H3 H3 H3 H2 H3 H3 H2 H3 H3 H2
```

The pane's own title `H3*` ("About the color spaces, Lab") is immediately followed by its own section
headings at `H2`. **The pane title is a lower level than its children**, with no `h1` or `h2` above it
to be a child of. That is `heading-order` + `page-has-heading-one` (WCAG 1.3.1), with PaneHeader as
the proximate cause on all nine panes. `h1Count=0` on every route × every viewport × both engines in
my matrix (24 route-cells, `probe-C2-03-live.mjs`).

Secondary, same site — consumers slot non-title content **into** the heading:

```
/#/            "About the color spaces, Lab"  slotted=["BUTTON.bg-transparent"]
/#/admin/users "Users 0"                      slotted=["DIV.badge-atom"]
```

An interactive `<button>` nested inside an `<h3>` (its geometric consequence is C-1 and C-7), and a
live count `<Badge>` (`AdminPane.vue:5`) folded into the heading's accessible name, so the name mutates
on every data refresh. `e2e/smoke/admin/admin-walk.spec.ts:73-77` already carries a `.first()`
workaround for heading ambiguity on these routes — the suite is compensating for the component's shape.

**Cure.** A `level` prop resolving to a dynamic tag (`<component :is="\`h${level}\`">`), defaulting to
`1` for a pane's primary title; and a dedicated named slot for adornments rendered as a **sibling** of
the heading, not a child, so the accessible name is the title alone. Two small changes inside the
component; neither adds a wrapper component nor a shared directory (edict 3).

---

## C-7 · MAJOR — the shrink scales slotted interactive content. On Safari at 1440 the About colour-space control drops to **27.6 × 14.9 px**; at 1280 it leaves the viewport entirely (C-1).

`pane-title-shrink` applies `transform: scale()` to the `<h3>`, so everything slotted into the title
scales with it. `probe-C2-07-consequences.mjs` (b), quoted in full under C-1:

```
webkit 1440x900  REST {"name":"Lab","w":88.6,"h":47.9,"wcag258_24px":true}
                 STUCK {"name":"Lab","w":27.6,"h":14.9,"wcag258_24px":false}
```

**14.9px tall — under the 24×24 minimum on both axes (WCAG 2.5.8 Target Size (Minimum), AA).**

This is PaneHeader's contribution to the audit's `smallTapTargets` count, and **the static capture
cannot see it**: `REPORT.md` records `safari-desktop-light /#/: 8` small targets measured at
`scrollTop 0`, where this button is a compliant 88.6 × 47.9. Scroll the pane and it becomes 9. The
count is understated on every scrollable route by exactly the controls consumers slot into the title.

Note the compounding: the designed 0.618 (Chromium, 1440) yields 54.8 × 29.6 and **passes** — by 5.6px
of margin, which the next type-rung change can spend. So fixing C-1 lifts this back over the bar but
does not make it safe.

**Cure.** The scale must not reach interactive descendants — either move the shrink onto a text-only
inner span, or drive the collapse with a `@property`-registered font-size scalar rather than a box
`transform`. C-6's sibling adornment slot removes the AboutPane and AdminPane cases structurally.

---

## C-8 · MAJOR (vacuous gates) — gate 5 returns the same verdict for the defect and for its cure; gate 3's green is an artifact of the e2e viewport; nothing anywhere asserts the shrink ratio; the header oracle never runs on WebKit.

### (i) Gate 5 is a tautology

`e2e/smoke/oracles/o11-header-gates.spec.ts:278-348`, titled *"engine/PRM coherence: rest state
identical under PRM"*. What it does:

1. read the veil at `scrollTop 0` (`readVeils`, `:40-55` — no scroll);
2. `emulateMedia({ reducedMotion: "reduce" })`, reload, read the veil at `scrollTop 0` again;
3. assert the two **rest** opacities are equal (`:306-308`);
4. walk stylesheets asserting every `--pane-scroll` binding sits inside `@supports` (`:315-347`).

`scrubTo` exists in the same file (`:59-73`) and is used by gate 3 — **gate 5 never calls it.** The PRM
branch is never scrubbed. Therefore:

- **Mutation that keeps it green: the shipped state.** No PRM handling exists; the animation runs at
  full amplitude under `reduce` (C-2); gate 5 is green.
- **Mutation that also keeps it green: the cure.** Wrap `:177-194` in
  `@media (prefers-reduced-motion: no-preference)` and step 3 still compares 0.52 to 0.52 (base state
  = `from` state), and step 4's walk still finds every binding `@supports`-gated. Green.

A gate that returns the same verdict for a defect and its fix decides nothing.

### (ii) Gate 3 is green by viewport luck

`:154` asserts `expect(at64.opacity, …).toBe(1)` on Home and Gradient. I replicated the assertion
verbatim at three viewports (`probe-C2-07-consequences.mjs` (a)):

```
  chromium 1280x720  max=211  at48=0.88   at64=1       gate3(at64===1)? true
  chromium 1440x900  max=61   at48=0.88   at64=0.9775  gate3(at64===1)? false
  chromium 1512x982  max=5    at48=0.5575 at64=0.5575  gate3(at64===1)? false
  webkit   1280x720  max=210  at48=0.88   at64=1       gate3(at64===1)? true
  webkit   1440x900  max=60   at48=0.88   at64=0.97    gate3(at64===1)? false
  webkit   1512x982  max=3    at48=0.5425 at64=0.5425  gate3(at64===1)? false
```

The `smoke` project pins `viewport: { width: 1280, height: 720 }` (`playwright.config.ts:159`). At
that one height the Gradient pane happens to overflow by 211px and the assertion holds. **At the two
most ordinary Mac laptop sizes it fails on both engines** — and at 1512×982 the veil never leaves
0.5425 while gate 3 certifies "the swell completes ≤64px, ahead of the earliest content collision."
The gate is not measuring a property of the component; it is measuring a property of the config.
This is the gate that would have caught C-3 and it is disarmed by a single number in a file it does
not mention.

### (iii) Nothing asserts the ratio

```
$ grep -rn "pane-title-shrink\|shrink-ratio\|pane-desc-shrink\|pane-header-veil" e2e/ test/
(no hits)
```

`.pane-header-title` appears only in `o14-preview-truth.spec.ts` (ramp text) and
`o10-type-locks.spec.ts:67` (About title font metrics). O-11 gate 4 inspects only the *property
names* inside the `pane-*` keyframes (`:176,184` — `new Set(["transform","opacity"])`), never their
values. **Mutation that keeps every gate green: `--pane-title-shrink-ratio: 0.05`.**

### (iv) The oracle is Chromium-only

`o11-header-gates.spec.ts` lives in `e2e/smoke/oracles/`, inside the `smoke` project
(`playwright.config.ts:142-160`, `browserName: "chromium"`). The WebKit project `smoke-safari` has
`testDir: "./e2e/smoke/safari"` (`:252-256`) — a different subtree. **The entire C-1 divergence class
is structurally unreachable by the suite as configured**, on the very engine whose project exists to
catch iOS-Safari-class bugs.

### (v) Zero unit coverage

```
$ grep -rln "pane-header\|PaneHeader" test/
(no files)
```

**Cure.** Gate 5 must scrub under `reduce` and assert stuck == rest — the property its title claims.
Gate 3 must assert against the pane's own travel (`min(64, maxScroll)`) or be run at a viewport
matrix, not one hard-coded size. Add a gate asserting `--pane-title-shrink-ratio` resolves to
`--type-heading / --type-display-1` within 1e-4 **and** that the stuck title's rendered box is never
larger than its rest box — one assertion that catches C-1 on both engines and every width. And give
the header oracle a WebKit arm (widen `smoke-safari`'s `testDir`, or add `smoke-safari-oracles`);
without it, even the new ratio gate would have missed C-1 entirely.

---

## C-9 · MINOR — the veil's "no double-exposure" certification is measured on the wrong quantity, and the double exposure is visible in the committed screenshot.

`o11-header-gates.spec.ts:154` asserts `at64.opacity === 1` and calls that the F2 double-exposure
cure. `opacity: 1` of a partially transparent fill is not opacity. `--glass-bg-resting` is
`color-mix(in srgb, var(--card) calc(…), transparent)`
(`node_modules/@mkbabb/glass-ui/dist/styles/tokens/glass.css:1`) — it resolves to α 0.65 light /
0.72 dark on this surface (pass-1 `probe-06-veil-alpha.mjs`), i.e. **35% light / 28% dark of the
scrolled content transmits**, behind a 7px blur.

I verified the outcome by eye, not by argument. `shot-webkit-desktop-about-scrolled300.png` (pass-1,
committed here) shows the About header band at scroll 300: inside the 136.6px band the underlying
`<h2>` "Basic Information" and the row "Dependency: Device-independent" are plainly legible, with the
0.311× title "About the color / spaces, Lab" overprinted directly across them. Two type layers, one
band — the exact double exposure the gate certifies as cured.

**Cure.** The gate must read the *composited* result — a pixel sample of a known glyph inside the band
versus the same glyph outside it — not `getComputedStyle(el,"::before").opacity`. The design cure is
C-4's real collapse, so there is no 136.6px band for content to sit inside. Raising
`--glass-bg-resting`'s alpha only under the stuck state would be a per-instance override and is
forbidden by edict 5.

---

## C-10 · MINOR — four load-bearing rationale comments are measurably false.

The file is 185 of 224 lines of comment and CSS prose. Prose that asserts verified-sounding falsehoods
is worse than no prose, because it is what the next reader audits against instead of the engine.

| line | claim | measured |
|---|---|---|
| `:43-45` | `.pane-scroll-fade` "lives on the ROOT element of each pane Card" | `ConfigSliderPane.vue:106` puts it on an inner `div`, not the Card root |
| `:50-53` | `contain` "isolates the named scroll-timeline" | non-load-bearing; byte-identical animation with `contain:none`, both engines (C-5). `timeline-scope` is the real property and is supported |
| `:136-138` | on phones the ratio "degenerat[es] to exactly 1 … the shrink self-neutralizes" | iOS Safari: **1.619775**. And at 1024/1280/1300 desktop WebKit: **10.87 / −7.39 / 13.17** (C-1) |
| `:148-151` | "A scroll SCRUB … needs no PRM gate … under PRM the rest state is byte-identical" | true but irrelevant — the *stuck* state is byte-identical too; the animation runs at full amplitude under `reduce` (C-2), and glass-ui gates all four of its own |

Also `:179, :185, :190` write `animation: <name> linear both` with the duration omitted, relying on
`animation-duration`'s initial `auto`. The producer writes it explicitly — `animation: gl-scroll-grow
auto linear` (`dist/styles/scroll-driven.css`) — and `auto` is precisely the value the global guard
overwrites (C-2), so leaving it implicit hides the interaction. Match the producer.

---

## C-11 · MINOR — the veil scrub is not free, and the gate that certifies it "compositor-only" measures only the Layout track.

O-11 gate 4's live half counts `devtools.timeline` **`Layout`** events (`≤5`) over a 0→300px scrub. It
counts nothing on style, paint or raster. The veil is an `opacity` animation on an element carrying
`backdrop-filter: blur(7px) saturate(…)` — a combination that cannot be a pure compositor property,
because the filtered backdrop must be recomposed for the new group alpha.

`probe-C2-02-scrub-cost.mjs`, four conditions interleaved, three reps each, 100 rAF-driven frames per
rep, chromium 1440×900 on `/#/`:

```
=== CDP Performance.getMetrics delta per 100-frame scrub (ms) ===
  A  task=176.4  layout=0.8  style=64.2  script=6.8      A = shipped
  B  task=165.8  layout=0.7  style=58.6  script=6.1      B = no backdrop-filter
  C  task=147.1  layout=0.7  style=54.1  script=5.5      C = no veil animation
  D  task=149.1  layout=0.7  style=56.8  script=5.8      D = neither

=== per-frame ms (300 frames per condition) ===
  A  {"mean":40.06,"p50":40.9,"p95":78,"max":85.8}
  D  {"mean":36.25,"p50":34.4,"p95":68.1,"max":78.5}
```

The Layout track really is flat (0.7–0.8 ms — gate 4's structural claim is sound). But the scrub costs
**176 ms of main-thread task time per 100 frames shipped vs 149 ms with the veil neutralised — ~18% of
the scrub's main-thread cost is the veil**, and 64.2 ms of *style recalculation* per 100 frames on an
animation whose file says the choreography is "compositor-only" (`:9-10`).

**Labelled honestly:** this is a headless-Chromium measurement on a route that also runs the GooBlob
WebGL rAF loop, so the ~36 ms baseline is not PaneHeader's and the absolute numbers are not a field
claim. The **A−D delta under interleaving** is the load-bearing number. Severity MINOR because the
delta is small; recorded because gate 4's name ("COMPOSITOR-ONLY") is broader than what it measures,
and because C-4's cure will be argued against on exactly this ground.

---

## C-12 · INFO — the prop contract leaks contrivance into a consumer; the guards are loose at the boundary.

`demo/scenes/ConfigSliderPane.vue:107`:

```vue
<PaneHeader v-bind="description !== undefined ? { description } : {}">{{ title }}</PaneHeader>
```

For an optional prop, `:description="undefined"` and omitting the attribute are identical in Vue — the
ternary guards nothing, and it is the only consumer of nine that does it. It reads as a defensive
reflex against `PaneHeader.vue:22`'s `v-if="description"`, which is itself loose: `description=""`
renders nothing (correct) but `description=" "` renders an empty caption `<p>`. `<slot />` at `:21`
has no fallback, so an empty title yields `<h3></h3>` — an `empty-heading` violation.
`ConfigSliderPane`'s `title: string` is required so it cannot reach that state today; nothing in
PaneHeader prevents it. `AdminPane.vue:107-115`'s `headerDescription` computed has no `default:` arm
and returns `undefined` for any `subView` outside the five listed — currently unreachable by the union
type, and currently harmless only because of `v-if`.

**Cure.** `v-if="description?.trim()"` in the component, after which the consumer's ternary collapses
to `:description="description"`. (Consumer file — noted for the wave that owns it, not editable here.)

---

## C-13 · INFO — a dead `@reference` (systemic, not PaneHeader's fault alone).

`PaneHeader.vue:61` is `@reference "../../styles/foundation.css";` inside `<style scoped>`. In
Tailwind v4 that directive exists to make `@apply`, `theme()`, `screen()`, `@variant` and `@utility`
resolvable inside the block. The block uses **none** of them:

```
$ grep -c "@apply\|theme(\|screen(\|@variant\|@utility" demo/shared/ui/PaneHeader.vue
0
```

It costs a full stylesheet resolution per build of the SFC for nothing. **Recorded as INFO, not
charged to this component**: the same dead directive is present in every one of the four control
files I checked (`ConfigSliderPane.vue`, `ColorPicker.vue`, `dock/ActionButton.vue`,
`SearchFilterBar.vue` — all `0`), across 17 SFCs. The cure is a repo-wide sweep, not a PaneHeader edit.

---

## Negative proof — what I attacked and could not break

The challenge premise supplied a hazard list. Most of it is **structurally inapplicable** here, and I
record that as measured, not assumed. The entire `<script setup>` is three lines (`:34-38`): one
`defineProps<{ description?: string }>()`. There is no `defineModel` (so no `WritableComputedRef`
stale-read hazard and no `shallowRef` cache is owed), no `ref`/`watch`/`computed`, no lifecycle hook,
no `addEventListener`, no `requestAnimationFrame` (this is **not** a PRM-RAF site), no
`ResizeObserver`/`IntersectionObserver`/`MutationObserver`, no timer, no async, no `fetch`, no WebGL,
no `parseCssColor` and no parse of any kind, no `ValueUnit` construction, no reka-ui primitive and
therefore no pointer-capture leak. Nothing to leak, nothing to grow unboundedly, no error path to
drive. `verbatimModuleSyntax` is trivially satisfied: **zero imports**.

Six substantive properties I tried to falsify and could not:

**N-1 · The rest state really is engine-, PRM- and route-invariant.** Veil `0.52` and title
`matrix(1,0,0,1,0,0)` at `scrollTop 0` across every cell of {webkit, chromium} × {reduce,
no-preference} × {desktop, phone} × 4 routes (`probe-C2-03-live.mjs`, 6 runs × 4 routes = 24 route-cells). O-11 gate 1's
floor claim holds by measurement: `0.52 ∈ [0.45, 0.65]` on every pane probed.

**N-2 · The inactive-timeline fallback is correct.** On the nine hosts that do not overflow
(`maxScroll=0` rows in `probe-C2-04`) the animation is inactive and the element paints the base state
— `transform: none`, veil `0.52`, `descOp 1` — not a half-applied `fill: both` frame. The
`from`-state = base-state construction the file rests on is real, which is exactly why C-2's cure is
free at rest.

**N-3 · The `@supports` condition, though the wrong feature test in principle, is not a live defect.**
The file gates on the *anonymous* `animation-timeline: scroll()` and then uses a *named* timeline —
two different features. I checked whether any engine splits them (`probe-C2-01-supports-gate.mjs`):

```
webkit    animation-timeline: scroll() true · animation-timeline: --x true · scroll-timeline: --x block true
          gate passes? true   named-timeline actually scrubs? rest=1 stuck=0
chromium  …all true            gate passes? true   named-timeline actually scrubs? rest=1 stuck=0
firefox   …all false           gate passes? false  named-timeline actually scrubs? rest=1 stuck=1
```

No engine passes the gate while failing the named timeline. Firefox declines the whole family and
lands the base state cleanly. **Not a finding.** (It is, however, the reason `timeline-scope` was
available for C-5's cure — it reports `true` on both SDA engines.)

**N-4 · The display voice is real.** I suspected `font-display` at `:21` was a no-op, since glass-ui
defines `--font-stack-display: var(--font-stack-text)`. `demo/styles/foundation.css:218` overrides it
to `"Fraunces", serif`, and the live computed value is `Fraunces` at weight `400` at every cell
(`probe-C2-03-live.mjs`). `--type-weight-display` is defined (`foundation.css:384`, `400`, overriding
glass-ui's `600`). The comment at `:12-20` is accurate. **Hypothesis refuted.**

**N-5 · The Chromium endpoint law is exact.** `0.618029 × 41.888px = 25.888px = --type-heading`. "The
stuck title lands EXACTLY on the retired heading rung" is true on Chromium at every width in the
sweep (`probe-C2-05`, `designed h/d` column == `SHIPPED` column, twenty widths). The design is sound;
one engine's `atan2` is not.

**N-6 · Vue's scoped-CSS keyframe mangling works.** Computed `animation-name` is
`pane-title-shrink-19daabcf` (`probe-09`) — the scoped `@keyframes` and the scoped `animation-name`
reference are rewritten consistently; `--pane-veil-rest` and `--pane-title-shrink-ratio` inherit into
`::before` and the title correctly. No cross-pane bleed. The unscoped `.pane-scroll-fade` block and
the scoped block coexist as intended.

Two REPORT rows I checked and will **not** charge to this component:

- `consoleErrors — 1` (`REPORT.md:17`, `safari-desktop-light /#/: WebGL: context lost`) is GooBlob's.
  `pageErrors — 0`, `blankOrNearBlank — 0`, `darkClassMissing — 0`, `mainCountNotOne — 0` are clean,
  and PaneHeader contributes zero `namelessButtons` (the one `<button>` in its slot is named "Lab").
- `horizontalOverflow — 0` (`REPORT.md:19`) is a **masked** pass, not a clean one. C-1 blows the
  title's box to 4777.8px inside a 1024px viewport; it produces no *document* overflow only because
  every consumer carries `overflow-x-hidden` and C-5's `contain: paint` clips it. Remove either and
  the row turns red. Recorded so the next seat does not read that zero as evidence of soundness — and
  note the irony: the one thing `contain` is load-bearing for is hiding C-1.

---

## Family grouping

Eleven of the thirteen findings reduce to **three** mechanisms, which is how the cures should be waved:

- **M-A · a scroll-driven choreography reasoned from spec text and from Chromium, never measured** —
  C-1 (WebKit `atan2` poles), C-2 (PRM unreachable by duration), C-3 (ranges in device pixels with no
  relation to the pane's travel), C-10 (the comments that asserted all three were safe). Cured
  together by: the length-ratio `calc`, the producer's PRM-outside-`@supports` nesting, and ranges
  expressed against the timeline's own extent.
- **M-B · a transform-only collapse asked to do a layout job** — C-4 (zero scrollport reclaimed, a
  63.8px pointer-opaque dead band, the `opacity:0` caption keeping box + hit target + a11y entry),
  C-7 (the scale reaches interactive descendants), C-9 (the band is translucent so content shows
  through it), C-11 (the scrub is not free). One root cause: the F3 retirement removed the layout
  channel without replacing what it did. Cured by one honest box collapse plus taking the scale off
  the interactive box.
- **M-C · a leaf component legislating for surfaces it does not own** — C-5 (`contain` on nine sibling
  roots via an unscoped block, on a false rationale, trapping `position:fixed`), C-6 (a literal `<h3>`
  and an adornment-bearing heading slot forced on nine panes), C-12 (the prop contract producing
  consumer contrivance). Cured by narrowing the component's writ: a `level` prop, a sibling adornment
  slot, delete `contain`, relocate the `scroll-timeline` producer concern to glass-ui (edict 4).

**C-8 sits across all three: it is the reason none of the eleven was caught** — and, uniquely, it is
the finding that gets *worse* the more you look, because gate 3 is not merely weak but green by
coincidence of a viewport number in a config file.

---

## Disposition summary

| id | severity | one line | cure shape |
|---|---|---|---|
| C-1 | **BLOCKER** | WebKit `tan(atan2(<rem>,<rem>))` deg→rad bug ⇒ the ratio is a pole-crossing function of viewport width: **10.87× at 1024, −7.39× (mirrored off-screen) at 1280, 13.17× at 1300**; the About colour-space control leaves the viewport | `calc(var(--type-heading) / var(--type-display-1))` — one line, verified both engines, all 20 widths |
| C-2 | MAJOR | MT-F023 adopted; the guard is *categorically* incapable, not merely narrow | wrap `:177-194` in `@media (prefers-reduced-motion: no-preference)` — glass-ui's own idiom, ×4 |
| C-3 | MAJOR | ranges are absolute px with no relation to the pane's travel; Gradient parks at veil 0.9775 / caption **opacity 0.2375** forever at 1440, and never leaves 0.5425 at 1512 | express `animation-range` against the timeline extent, not device pixels |
| C-4 | MAJOR | collapse reclaims 0px; 63.8px pointer-opaque dead band (7.1% of viewport); `opacity:0` caption keeps box + hit target + a11y entry | one honest box channel (`grid-template-rows: 1fr → 0fr` on the existing wrap); renegotiate gate 4's bar |
| C-5 | MAJOR | `contain` on 9 sibling roots, measured non-load-bearing, traps `position:fixed` at (104,730) | delete it; `timeline-scope` if scoping is wanted; move `scroll-timeline` to glass-ui |
| C-6 | MAJOR | literal `<h3>`, zero `<h1>` in 60/60 captures + 12/12 of my cells, inverted outline on About, interactive + live content inside the heading | `level` prop + sibling `#adornment` slot |
| C-7 | MAJOR | slotted `<button>` → 27.6 × 14.9 on Safari (WCAG 2.5.8 fail); invisible to the static capture | scale text only, not the box |
| C-8 | MAJOR | gate 5 green under both defect and cure; **gate 3 green only at the config's 1280×720**; ratio unasserted; oracle Chromium-only | scrub under `reduce`; gate against the pane's own travel; assert the ratio; give the oracle a WebKit arm |
| C-9 | MINOR | "double-exposure cured" measured on `opacity`, not composited alpha (0.65/0.72) — visible in the committed shot | gate on pixels; C-4 removes the band |
| C-10 | MINOR | four false rationale comments; implicit `auto` duration | correct the prose; write `auto` like the producer |
| C-11 | MINOR | the scrub costs ~18% more main-thread time with the veil; gate 4 measures only Layout | widen gate 4's name or its measurement |
| C-12 | INFO | consumer no-op ternary; loose `v-if`; no slot fallback | `v-if="description?.trim()"` |
| C-13 | INFO | dead `@reference` (systemic — 17 SFCs) | repo-wide sweep, not this component |

**Strongest defect: C-1.** It is shipping, user-visible, and catastrophic rather than merely wrong: at
1024px the pane title is a 4777×867px slab painted over every word of the pane's content; at 1280px —
an ordinary laptop window width — the title and the pane's primary control are flung off-screen for
as long as the pane stays scrolled (scrolling back to the top restores them, which is precisely the
shape of a bug users will report as "the About selector disappears"). It is caused by a
contrivance whose replacement is shorter, simpler, and measured correct in both engines at all twenty
widths I probed. It is also the cleanest indictment of C-8: **one assertion on one computed custom
property, run once on WebKit, would have caught it at T.W4-1 and never let it ship** — and the WebKit
arm to run it on does not exist.

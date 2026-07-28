# CHALLENGE-D — `demo/shared/ui/PaneHeader.vue` — THE DESIGN IS FLAWED

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. The seat was
spawned with an explicit Opus 5 declaration and the served tier agrees with it. Not inherited, not
undeclared.

Axis: **design** (visual truth, state coverage, motion, design-system boundary, proportion/seat law).
Subject: `demo/shared/ui/PaneHeader.vue` (224 lines), the sole route-identity surface for **9 panes**
(`BrowsePane`, `PalettesPane`, `AdminPane`, `AboutPane`, `MixPane`, `GradientPane`, `GeneratePane`,
`ExtractPane`, `ConfigSliderPane` → Atmosphere + Blob).

**Verdict: DEFECTIVE.** 15 findings, 3 BLOCKER, 4 MAJOR. Two of the three BLOCKERs falsify claims the
file makes about itself in its own comment prose, by measurement, on the shipping engine.

---

## 0. Evidence base

Probes written for this seat (all READ-ONLY against the live dev server at `http://localhost:9000`;
no source file outside this directory was touched):

| Probe | What it measures |
|---|---|
| `probe-paneheader-design.mjs` | 30 captures: 2 engines × {desktop-1440, phone-390, desktop-RTL} × 5 routes; rest vs. scrolled geometry, computed type, veil, heading census |
| `probe-shrink-ratio.mjs` | numeric resolution of `--pane-title-shrink-ratio` per engine per band + terminal (full-progress) scrub state |
| `probe-cure-and-shots.mjs` | isolates the `tan(atan2())` fault, proves the proposed cure, captures 20 rest/stuck frames (2 engines × 2 bands × 2 schemes + RTL) |
| `probe-occlusion-prm-fc.mjs` | in-browser A/B pixel difference of the header band with content under the veil vs. hidden; PRM shipped vs. naive-cure; forced-colors |

Frames: `shots/` (20 + 6). Reused: `docs/tranches/V/megatranche/audit/visual/REPORT.md`,
`visual/shots/{safari-desktop-light,safari-desktop-dark,forced-colors-desktop,zoom-200-desktop}/`.

Law read and applied: `docs/tranches/V/VISUAL-CONSTITUTION.md` (§3, §3.1, §4, §4.1, §5.1, §6, §6.1,
§7), `docs/tranches/V/PROPORTION-AUDIT.md` (§4 PR-01/PR-12, §5.3/5.8/5.11/5.13).

---

## 1. Visual truth first

### At rest the design is good. I say that so the rest of this report is not read as reflex.

`shots/chromium-desktop1440-light-REST.png`: 41.888px Fraunces 400 "Gradient", a 14.384px caption at
`--ink-muted`, 16px above / 8px below, feathered veil, no band edge. Against
`visual/shots/safari-desktop-light/gradient.png` and `safari-desktop-dark/browse.png` the resting
header is calm, well-proportioned, and the hierarchy against the `text-subheading` section headings
below reads at a glance. `visual/shots/zoom-200-desktop/gradient.png` — rest at 200% is clean.

**Every defect below is in a state other than rest.** The component was designed once, at rest, and
its other states were reasoned about in prose instead of looked at.

### The stuck state, Safari desktop 1440 — `shots/webkit-desktop1440-light-STUCK.png`

Two things are wrong in one frame:

1. "Gradient" has collapsed to **13.67px of ink** — smaller than the `cubic-bezier(0, 0, 1, 1)` body
   mono below it and smaller than the "CSS" section heading. The pane identity has become the
   smallest text on the pane. The largest-text-must-be-the-protagonist argument of §3.8 is inverted,
   not merely weakened.
2. The scrolled-away section heading **"Easing" is legible *through* the header**, overlapping the
   "Gradient" ink. `shots/webkit-leak-A-content-under-veil.png` is the cropped band; the B frame with
   the siblings hidden is the control.

### The stuck state, Safari phone 390 — `shots/webkit-phone390-light-STUCK.png`

The title **grows** to 43.99px, overflows the 68.97px header band, and collides with the collapse
chevron at the inline-end. On the design's own account this band is supposed to be a **no-op**.

### The stuck state, RTL — `shots/webkit-rtl-STUCK.png`

"Gradient" floats unanchored in the middle-left of the band while the bleed-through "Easing" sits
correctly right-aligned at the inline-start. The title has detached from every margin on the page.

### Dark — `shots/webkit-desktop1440-dark-STUCK.png`

Same bleed, worse: "Easing" is light ink on the dark plate, so the passing heading has *higher*
contrast than the shrunken white "Gradient" sitting inside it. Two headings, ink on ink.

---

## 2. Findings

### D-1 · BLOCKER · Safari phone: the title **grows** 1.62× on scroll and collides with the pane content

The file states the phone band is a deliberate no-op:

> `PaneHeader.vue:137-139` — "degenerating to exactly 1 on phones where display-1 floor-pins AT
> heading (the shrink self-neutralizes; the floor-pinned no-op needs no band arm)"

Measured, `probe-shrink-ratio.mjs`, viewport 390×844, `/#/gradient`:

```
webkit phone-390  { "ratioVar": "1619.765625px",        <- ratio = 1.619766   (law demands 1.000000)
                    "headingPx": 25.888, "display1Px": 25.888, "trueRatio": 1,
                    "terminal": { "titleTransform": "matrix(1.619775, 0, 0, 1.619775, 0, 0)",
                                  "titleInkH": 43.99, "headerH": 68.97 } }
chromium phone-390 { "ratioVar": "1000px",              <- ratio = 1.000000   (correct no-op)
                     "terminal": { "titleTransform": "matrix(1, 0, 0, 1, 0, 0)", "titleInkH": 27.17 } }
```

Title ink 27.16 → **43.99px** inside a band whose measured height never changes (68.97px, `pt-4 pb-2`
= 16/8, so a 44.97px content box). The overflow is visible in
`shots/webkit-phone390-light-STUCK.png` and `-dark-STUCK.png`.

**Mechanism.** `PaneHeader.vue:140-142` computes the ratio as a trig identity:

```css
--pane-title-shrink-ratio: calc(tan(atan2(var(--type-heading), var(--type-display-1))));
```

At the phone floor both arguments are `1.618rem`, so `atan2` = 45deg and `tan(45deg)` = 1. WebKit
returns **1.6197751**, which is `tan(45 radians)` — it degrades the `<angle>` from `atan2()` to a bare
`<number>`, and `tan()` then correctly reads a bare number as radians. The isolate proves this is
argument-specific, not a blanket engine bug:

```
webkit   ISOLATE tan(45deg)*1000px          = 1000px      (correct)
webkit   ISOLATE tan(atan2(1px,1px))*1000px = 1000px      (correct)
webkit   ISOLATE atan2(1px,1px)/1deg*1000px = 45000px     (correct: 45deg)
webkit   SHIPPED tan(atan2(--type-heading, --type-display-1))*1000px = 310.796875px   <- WRONG
chromium SHIPPED  same expression                                     = 618.016px     <- right
```

Repro: `node docs/tranches/V/megatranche/audit/components/PaneHeader/probe-shrink-ratio.mjs`.

The @supports guard at `:177` gates on `animation-timeline: scroll()` and the comment at `:138-139`
justifies it as "Guarded by the same @supports SDA gate as its one consumer (atan2: Chromium 111+ ⊂
SDA engines)". `CSS.supports` for atan2 returns **true** in WebKit — the gate is satisfied and the
value is still wrong. Feature detection cannot detect a wrong answer.

---

### D-2 · BLOCKER · The same ratio is **1.99× wrong** on Safari desktop; the pane identity becomes body copy

Same expression, viewport 1440×900, `/#/gradient`, full-progress scrub:

| engine | `--pane-title-shrink-ratio` | terminal transform | title ink |
|---|---:|---|---:|
| webkit | **0.310797** | `matrix(0.310808, …)` | **13.67px** |
| chromium | 0.618016 | `matrix(0.618029, …)` | 27.18px |
| the law's own claim (`:137`) | ≈0.618 (1/φ) | — | — |

`--type-heading` = `1.618rem` = 25.888px; `--type-display-1` = `clamp(1.618rem, 1.2rem + 1.6vw,
2.618rem)` = 41.888px at the ≥1440 cap. True ratio 25.888/41.888 = **0.618029**. WebKit is off by
1.9886×, in the wrong direction for legibility. `shots/webkit-desktop1440-{light,dark}-STUCK.png`.

**The cure is one substitution and it is already proven portable.** `probe-cure-and-shots.mjs`:

```
webkit   CURE (var(--type-heading) / var(--type-display-1)) * 1000px = 618.015625px   -> 0.618016
chromium CURE  same                                                  = 618.016px      -> 0.618016
webkit   CURE  same, at phone-390                                    = 1000px         -> 1.000000
chromium CURE  same, at phone-390                                    = 1000px         -> 1.000000
```

Identical in both engines at both bands, equal to `1/φ` at the cap and exactly 1 at the floor — i.e.
the closed form the design wanted, without the trig. `<length> / <length> → <number>` is CSS Values 4
and both engines already honour it. `tan(atan2(a,b))` was never an identity that needed inventing;
it is contrivance (owner edict 3) with a shipped, measured, cross-engine visual consequence.

---

### D-3 · BLOCKER · The veil never occludes. Content bleeds through the header **at its strongest state**

The file asserts, twice, that occlusion is proven:

> `:81` — "the veil dissolves into the plate instead of terminating at a box edge (O-11 gate 2)"
> `:159-162` — "the veil SWELL completes by 64px … so the veil is near-full before any ink collision
> (O-11 gate 3, the F2 double-exposure cure)"
> `:172-176` — "RE-VERIFIED at W4-7: … gate 3 (swell ≤64px, **no naked window** under the earliest
> colliders) green over the settled field"

Measured, at terminal veil `opacity: 1` (the swell complete), A/B pixel difference of the 510×103
header band with the scrolled content visible vs. `visibility: hidden`
(`probe-occlusion-prm-fc.mjs`):

```
LEAK webkit   terminalVeilOpacity=1  {"px":52530,"maxChannelDelta":235,"meanChannelDelta":18.993,
                                     "pctOver8":14.73,"pctOver24":14.12}
LEAK chromium terminalVeilOpacity=1  {"px":52530,"maxChannelDelta":239,"meanChannelDelta":21.245,
                                     "pctOver8":24.63,"pctOver24":16.99}
```

At the veil's **maximum** intensity, 14.7% (WebKit) to 24.6% (Chromium) of the band's pixels are
still being written by the content passing beneath, with peak channel deltas of 235–239/255 = 92–94%
of full range. Frames: `shots/{webkit,chromium}-leak-A-content-under-veil.png` (the "Easing" heading
plainly legible over the title) vs `-leak-B-content-hidden.png`.

**This is arithmetic, not an engine quirk.** Computed `::before` fill is
`color(srgb 0.994 0.96 0.926 / 0.65)`. Opacity 1 × alpha 0.65 = **0.65 maximum coverage**; 35% of the
underlying luminance transmits by construction, at every state, forever. There is no scroll offset at
which this component occludes anything. The "naked window" the design says it closed is a permanent
window; the swell only makes it 35% instead of 66% naked.

Frames confirm it cross-engine (`chromium-desktop1440-light-STUCK.png`,
`webkit-desktop1440-dark-STUCK.png`, `webkit-rtl-STUCK.png`) — so it is a **design** defect in the
material choice, and the gate-3 claim in the source comment is false as written.

---

### D-4 · MAJOR · The header never contracts — §3.5 is violated in every quantity it names

> `VISUAL-CONSTITUTION.md §3.5` — "A header contracts as a whole block. At rest it breathes; when
> stuck, **title, padding, and band all** take the compact token step."

Measured across 30 captures (2 engines × 3 matrices × 5 routes, `probe-paneheader-design.mjs`):

| quantity | rest | stuck | Δ |
|---|---:|---:|---:|
| band height, desktop | 88.66 / 88.69 | 88.66 / 88.69 | **0.00px** |
| band height, phone | 68.97 / 68.98 | 68.97 / 68.98 | **0.00px** |
| `padding-top` | 16px | 16px | **0** |
| `padding-bottom` | 8px | 8px | **0** |
| desc wrapper height | 18.69 | 18.69 (at `opacity: 0`) | **0.00px** |
| title layout box | unchanged (a `transform`) | unchanged | **0** |

Only the title's *optics* step; nothing else does. Because the shrink is a compositor `transform` on
a box that keeps its size, the vacated space becomes dead reserved acreage. At full stuck, desktop
1440:

- content box = 88.66 − 16 − 8 = **64.66px**
- visible title ink = **13.67px** (WebKit) / 27.18px (Chromium)
- description = present in layout at 18.69px, invisible at `opacity: 0`
- **empty reserved space = 50.99px = 79% of the content box** (WebKit); 37.51px = 58% (Chromium)

Visible in `shots/chromium-forcedcolors-light-STUCK.png` as an unmistakable white void between the
title and the first content row.

This is exactly the mechanism `PROPORTION-AUDIT.md §2/§4 PR-01` rules terminal at the Picker —
"unconditional two-line/bottom-aligned … reservation … Both vertical reservations must die" — and it
lives here on **nine more surfaces** with no register row and no owner. `§5.3` ("Renderer, icon or
touch footprints may reserve collision space **only on the axis where collision exists**") and `§5.8`
("Real rendered relation wins over token intent") both bite.

---

### D-5 · MAJOR · RTL: `transform-origin: left top` is a physical keyword; the title detaches from its margin

`PaneHeader.vue:184` — `transform-origin: left top`. Measured under `dir="rtl"`, both engines,
`/#/gradient`, desktop 1440:

```
computed transformOrigin = "0px 0px"                     (unchanged from LTR)
title inline-start edge (RTL = right):  1216.00  ->  1056.80    at 50% scrub progress
```

= **159.2px of inline-start drift** at half progress; 462 × (1 − 0.618) = **176.4px** at full. The
title shrinks *away from* its inline-start margin and lands nowhere.
`shots/{webkit,chromium}-rtl-STUCK.png`: "Gradient" hangs unanchored mid-band while the bleeding
"Easing" is correctly right-aligned — the accidental element is better aligned than the designed one.

> `VISUAL-CONSTITUTION.md §6.1` — "chrome, navigation and layout: logical inline/block direction
> follows the document"

`transform-origin` has no logical keywords, so this must be a `:dir()` pair (`0 0` / `100% 0`) — or,
better, dissolved by D-4's cure, which removes the transform entirely.

---

### D-6 · MAJOR · No `<h1>` exists on any route; the pane title is an `<h3>` peer of its own subsections

Measured, 30/30 captures: `h1: 0`, `h2: 0`, `h3: 1…5`. Independently corroborated by the tranche's own
`visual/REPORT.md` per-capture table — the `h1` column reads **0 on 60/60 captures**.

`PaneHeader.vue:21` emits `<h3 class="pane-header-title font-display">`. On `/#/gradient` the document
outline is five sibling `h3`s and nothing else:

- `PaneHeader.vue:21` → "Gradient" (route identity)
- `GradientVisualizer.vue:149` → "Interpolation"
- `GradientVisualizer.vue:241` → "Easing"
- `GradientVisualizer.vue:253` → "CSS"
- the second pane's `PaneHeader` → "My Palettes"

So the route identity is indistinguishable in the outline from a subsection of itself, and two
different panes' identities are peers. Violations:

- `§4.1` — "Each route has **one H1** and exactly one stable main landmark, owned by the shell."
  (`main` is correct — `mainCountNotOne: 0` in REPORT.md. The H1 half is simply absent.)
- `§4` type jurisdiction — the row `route H1 or major argument → text-display` is being *painted*
  (Fraunces, display-1) on an element that is not an H1. Style without semantics.
- `§5.1` — every one of the seven navigation origins targets "destination H1", five of them
  "with temporary `tabindex="-1"`". Measured on the title element: `tabindex` = null, `id` = null.
  **The focus contract of §5.1 is structurally unimplementable against this component**, and
  `grep -rn "tabindex\|focus()" demo/shared/ demo/scenes/ConfigSliderPane.vue` returns zero rows.
- `PROPORTION-AUDIT.md §5.11` — "route H1 owns heading hierarchy".

PaneHeader is the only element that could own the route H1. It declines to.

---

### D-7 · MAJOR · MT-F023 — **ADOPTED**, cure **AMENDED** with measurement

I adopt the root's finding. Independently reproduced, both engines, `reducedMotion: "reduce"`:

```
PRM webkit   shipped={"title":"matrix(0.310808,…)","veil":"1","desc":"0"}
PRM chromium shipped={"title":"matrix(0.618029,…)","veil":"1","desc":"0"}
```

The scrub runs in full under `reduce`. The blunt guard at `animations.css:184-190` overrides only
`animation-duration` / `animation-iteration-count` / `transition-duration`; a scroll-driven animation
has `animation-duration: auto`, so it is structurally unreachable. Confirmed. The file's own defence
at `:149-151` ("A scroll SCRUB is position-mapped, not time-based motion, so it needs no PRM gate")
is the design error: whether it *needs* a gate is a ruling, but it currently *has* one that silently
does nothing, and `:151` further claims "under PRM the rest state is byte-identical" — it is not, the
rest state is never reached.

**I do not adopt the proposed cure unchanged.** I simulated it — all three declarations moved inside
`@media (prefers-reduced-motion: no-preference)` — and measured what it leaves a PRM user looking at:

```
PRM webkit   naiveCure={"title":"none","veil":"0.52","desc":"1"}
PRM chromium naiveCure={"title":"none","veil":"0.52","desc":"1"}
```

The PRM user is pinned at the veil's **weakest** state, 0.52, permanently — while content scrolls
under it. The leak, measured under exactly that condition:

| state | engine | mean channel Δ | %px > 8 | %px > 24 | max Δ |
|---|---|---:|---:|---:|---:|
| shipped, terminal veil 1.00 | webkit | 18.993 | 14.73 | 14.12 | 235 |
| **naive cure, veil 0.52** | webkit | **23.911** | **15.59** | **14.34** | 237 |
| shipped, terminal veil 1.00 | chromium | 21.245 | 24.63 | 16.99 | 239 |
| **naive cure, veil 0.52** | chromium | **26.439** | **24.60** | **17.89** | 241 |

Repro: `node /…/scratchpad/leak52.mjs` (inlined in §5 below). **Strictly worse on every metric, on
both engines.** The naive cure trades a legibility floor for stillness, for exactly the cohort the
guard exists to protect. That is the wrong trade and it is not what §6 asks for:

> `§6` — "Reduced motion resolves directly to the **final geometry and stable chromatic state**."

Note "final", not "rest". **Amended cure**, in the root's own idiom (structure, not another override
stacked on the blunt guard):

1. Gate the two **transform** channels — `pane-title-shrink` and `pane-desc-shrink`'s `translateY` —
   inside `@media (prefers-reduced-motion: no-preference)`, matching `animations.css:43`. These are
   motion; they go.
2. Do **not** gate the veil's opacity ramp. It translates and scales nothing; it is a material
   ramp, and killing it is a legibility regression I have measured. Under PRM the veil resolves to
   its **stuck** value (the "final … stable chromatic state" §6 names), not its rest value.
3. Better still, and preferred: once D-3's cure lands the stuck veil is a **static opaque material**
   rather than an animation, so there is nothing for the guard to reach and PRM is satisfied by
   construction. That is the disposition I would put to the jury — dissolve the gate question by
   removing the animation that raised it.

---

### D-8 · MAJOR · Three desynchronised magic ranges on one "block", citing a producer grammar that does not exist

`:182` `animation-range: 0px 64px` (veil) · `:188` `0px 120px` (title) · `:192` `0px 80px` (desc).
Three un-tokenized constants with three different clocks on a surface §3.5 calls "a whole block". At
scroll 80px the desc is fully gone, the veil finished 16px ago, and the title is 67% through its
travel — the block does not contract, it decomposes. `translateY(-0.25rem)` at `:221` is likewise a
raw literal. Owner edict 6 asks for tokenized motion; nothing here is a token.

The stated provenance for the 120px is:

> `:156-157` — "the producer scroll grammar's compositor transposition — title `scale` (the
> title-collapse lane…)"
> `:171-172` — "The title-shrink range stays the producer grammar's own 0–120px (one grammar —
> card-scroll.css's title-collapse lane…)"

```
$ grep -rlo "ScrollCardHeader\|scroll-card-header\|title-collapse\|card-scroll" \
      node_modules/@mkbabb/glass-ui/dist/
(no output)
```

Zero hits across the entire installed `@mkbabb/glass-ui@7.0.0` dist. The "one grammar" the ranges
claim to inherit is not in the shipped producer. Whatever the history, against the dependency this
repo actually resolves, 64/120/80 are three unowned hand constants wearing a citation.

---

### D-9 · MINOR · The description uses an **eighth** type role, and renders italic

> `§4` — the role matrix is seven rows and "This matrix is closed across all eighteen compositions",
> with exactly one named exception (P019's Picker pair).

`PaneHeader.vue:29` uses `text-caption`. `caption` is a real glass-ui typography rung (`grep` of the
dist bundle shows the producer role set `caption|body|prose|admin-label|heading|subheading|title|
display|…`) — but it is **not one of the seven authorized roles**, and it is not `mono-caption`
(the one caption spelling §4 does admit, "where the content is a caption" — and that row is Fira
Code). Measured computed style on the `<p>`:

```
fontStyle: "italic"   fontFamily: "Plus Jakarta Sans"
fontSize: 14.384px (desktop 1440) / 12.179px (phone 390)
```

No row of §4's matrix specifies italic. A pane description is help text — `text-prose` — or control
copy — `text-small`. The `--ink-muted` colour work at `:118-124` is careful and correct; the *rung*
it is applied to is unauthorized.

---

### D-10 · MINOR · The display rung and the whole veil recipe are per-instance re-implementations of producer seams

`:106-112` restates four properties of a producer type rung locally:

```css
.pane-header-title { font-size: var(--type-display-1); line-height: var(--type-leading-display);
                     letter-spacing: var(--type-tracking-display); font-weight: var(--type-weight-display); }
```

with the reason given at `:103-105`: "the producer `text-heading` utility hardcodes 700 — retired
here; the weight rides the :root pin, **the P10 booked swap**". Likewise the entire `::before` at
`:82-98` is admitted at `:74-76` as "The producer rest-floor + bottom-feather knobs are packet P3
(BOOKED swap); this veil + feather are the **carried interim**", and `:157` waits "until P3's
ScrollCardHeader knobs land (BOOKED)".

Two producer seams deferred, two local interims shipped. Owner edict 4 (variants/primitives belong in
glass-ui) and edict 5 (style at the root, never per-instance) are both live violations today; *booked*
is not *landed*. §4.2's own posture — "Consumer CSS may not hide a producer divider", producer owns
the register — is the same principle. The correct move is a glass-ui non-bold display rung + a
stuck-state plate token, requested through the standing BH/BI relay, not a fourth parallel recipe in
a leaf component. (The file already killed the "census's 7th parallel recipe, CC-3" at `:66-67` and
then wrote the 8th.)

---

### D-11 · MINOR · The documented `.pane-scroll-fade` contract is false, and the timeline dependency is unenforced

`:43-45` asserts:

> "The `.pane-scroll-fade` host class lives on the **ROOT element** of each pane Card (9 sibling
> panes: Browse/Admin/About/Palettes/Mix/Gradient/Extract/Generate/**ConfigSlider**)"

`ConfigSliderPane.vue:98-107` — the pane root is `<div class="relative w-full mx-auto h-full min-w-0">`,
inside it a `<Card class="… overflow-hidden">`, and only inside *that* the
`<div class="pane-scroll-fade scrollbar-thin flex-1 …">` that hosts PaneHeader. Two levels below the
root, on a flex child, not on a Card root. The contract comment is wrong about at least one of its
nine named consumers — and that consumer is the one serving two routes (`/#/atmosphere`, `/#/blob`).

Structurally: a leaf presentational component publishes a **global unscoped class** (`:54-57`) that
styles its own *ancestors*, and its entire designed behaviour silently evaporates if a consumer
forgets the magic string — an unresolved `scroll-timeline` name makes the animations inert, with no
prop, no `provide`/`inject`, no dev warning, and no type. Nine hand-maintained couplings to a string.

---

### D-12 · MINOR · `description` is a string prop, so §6.1's LTR-isolation requirement cannot be met

`PaneHeader.vue:35-37` — `defineProps<{ description?: string }>()`, rendered `{{ description }}`.

> `§6.1` — "CSS strings, hex, slugs, IDs and provenance: render in **LTR-isolated spans** inside RTL
> prose"

A `string` prop admits no markup, so no consumer can wrap a hex, slug, ID or code fragment in an
isolating span. A `<slot name="description">` costs nothing and is the idiom the title already uses.

The symptom of an unclear API is in the consumer: `ConfigSliderPane.vue:107` writes
`v-bind="description !== undefined ? { description } : {}"` — a conditional-object dance that is
behaviourally identical to `:description="description"` for an optional prop. Contrivance (edict 3)
downstream of a prop shape nobody trusts.

---

### D-13 · MINOR · The description has no measure and no truncation; the sticky band grows unboundedly

Measured, `probe-paneheader-design.mjs`, `/#/atmosphere` at 390×844:

```
descWrapH = 47.44   (3 lines; every other route measures 15.81 = 1 line)
headerH   = 100.59 / 100.61      vs 68.97 / 68.98 elsewhere
```

= **11.9% of an 844px phone viewport**, permanently sticky, and it still never contracts (D-4). There
is no `max-inline-size`, no line clamp, no overflow disposition anywhere in the component. §4 bounds
prose to `66ch`; this caption is bounded only by whatever string the ninth consumer happens to pass.

---

### D-14 · INFO · `forced-colors` is an undesigned state, and the tranche's existing forced-colors matrix did not apply

Measured, Chromium `forcedColors: "active"` (`matchMedia("(forced-colors: active)").matches === true`):

```
FORCED-COLORS light {"veilBg":"rgb(255, 255, 255)","veilFilter":"blur(0px) saturate(1.4)",
                     "veilOpacity":"0.52","titleColor":"rgb(0, 0, 0)","descColor":"rgb(0, 0, 0)"}
FORCED-COLORS dark  {"veilBg":"rgb(0, 0, 0)","veilFilter":"blur(0px) saturate(1.3) brightness(1.14)",
                     "veilOpacity":"0.52","titleColor":"rgb(255, 255, 255)","descColor":"rgb(255, 255, 255)"}
```

- The "constitutive veil" — "the plate's own rung-1 material" (`:64-67`) — becomes a flat 52%-opaque
  Canvas wash with `blur(0px)`. The glass is entirely gone; nothing of the designed material
  survives, and the rest→stuck delta becomes a 52%-wash → solid-slab jump
  (`shots/chromium-forcedcolors-light-{REST,STUCK}.png`).
- Title and caption both force to CanvasText, so `--ink-muted`'s carefully certified ≥4.5:1
  de-emphasis rung (`:118-124`, AB-2/D6) has **zero** effect. Hierarchy survives on size + italic
  alone, which satisfies §4.1's "never color-only" — but the certification is doing no work here and
  the state was clearly never looked at.
- Separately: `visual/shots/forced-colors-desktop/gradient.png` still renders the chromatic ambient
  field and the green→blue gradient rails, i.e. that capture matrix appears **not** to have applied
  forced colors. The state is effectively uncovered by the existing evidence base — my capture is
  the first with the media query verified active.

---

### D-15 · INFO · State register — what was designed, and what was never looked at

| state | disposition | evidence |
|---|---|---|
| rest / populated | **designed, good** | `chromium-desktop1440-light-REST.png` |
| stuck / scrolled | **broken** | D-1, D-2, D-3, D-4, D-8 |
| empty title | **unhandled** — `<slot />` at `:21` has no fallback and no `v-if`; an empty `<h3>` with `text-wrap: balance` and a 41.888px line box reserves 43.97px of nothing | code read |
| loading | **absent** — no pending affordance. `AdminPane.vue` suppresses its count Badge to `null` while the roster loads (a correct decision) but the header carries no pending truth, so the pane identity is silent during work. §4.1: "pending … states are never color-only … state/value … explicit" | `AdminPane.vue:118-121` |
| error | **absent** — `BrowsePane`'s "The commons is unreachable." error lives in the body while the header keeps saying nothing changed (`safari-desktop-dark/browse.png`) | frame |
| focused | **no focus target exists at all** | D-6 |
| hover / active / pressed / selected / dragging | correctly none — the header is not interactive | code read |
| overflowing / truncated | **unhandled** | D-13 |
| RTL | **broken** | D-5 |
| reduced-motion | **broken; proposed cure regresses it further** | D-7 |
| forced-colors | **undesigned** | D-14 |
| zoom 200% | rest **fine** (`zoom-200-desktop/gradient.png`); stuck at 200% **unmeasured — hypothesis**: the shrink ratio is viewport-derived and 200% zoom halves the layout viewport to 720px, which puts `--type-display-1` on its fluid arm rather than at the cap, so the WebKit fault of D-1/D-2 will land on a third value again | hypothesis, labelled |
| dark | rest fine; stuck **worse than light** (higher-contrast bleed-through) | `webkit-desktop1440-dark-STUCK.png` |
| `<Badge>` in the title slot | `AdminPane.vue:5` nests a `<Badge>` inside the `<h3>`, so the count is folded into the heading's accessible name ("Users 12") and scales with the title to 0.31× on WebKit desktop. §5.2 "one identity line" | code read |

---

## 3. Motion audit (owner edict 6, §6)

- **Tokenized?** No. Three raw ranges (64/120/80px) and a raw `-0.25rem`. `--animation-slide-sm/md/lg`
  are not consumed and are the wrong register anyway — a scrub has no duration. There is no
  tokenized *scroll* register to consume, which is itself the producer gap D-10 describes.
- **Reduced motion?** Structurally unreachable. D-7.
- **Layout-forcing properties?** No — and this is genuinely well done. The F3 fork (padding /
  font-size / grid-template-rows scrubbed per frame) was correctly killed at `:152-155`; what remains
  is `opacity` + `transform` + a compositor `opacity`, all off the main thread. **But** the price paid
  for that purity is D-4: the header cannot contract, because contraction *is* layout. The component
  chose compositor purity over the constitution's §3.5, silently, and never recorded the trade.
- **Animations deleted?** None found. The three keyframes are additive; the F3 keyframes were
  removed but the choreography they expressed was retained in transposed form. Edict 6 satisfied.
- **§6 "exit is shorter than entry"?** Not applicable to a bidirectional scrub — correctly so.
- **§6 "Reduced motion resolves directly to the final geometry"?** Violated in both the shipped
  state (no resolution at all) and the naive cure (resolves to *rest*, not final). D-7.

---

## 4. Proposed cure — architectural, in priority order

Not a patch list. The component's fault is a single wrong premise — **"a scroll-reactive header can be
expressed as three independent compositor scrubs on a fixed box, with CSS trig standing in for design
decisions."** Every finding above falls out of that.

1. **Delete the trig.** `--pane-title-shrink-ratio: calc(var(--type-heading) / var(--type-display-1))`.
   Measured identical in both engines at both bands (§D-2). Kills D-1 and D-2 in one line, keeps the
   closed form, keeps the phone no-op. *Do this first regardless of what else the jury rules — it is
   a shipped Safari defect with a proven one-token fix.*

2. **Make the contraction real, as a two-state step rather than a scrub.** §3.5 asks for a *step*
   ("title, padding, and band all take the compact **token step**"), not a continuous scrub — the
   design over-delivered motion and under-delivered the law. One `data-stuck` boundary, detected once
   per crossing (a zero-height `IntersectionObserver` sentinel today; `@container scroll-state(stuck:
   top)` when both engines ship it), driving a single tokenized transition over `padding-block`,
   `font-size`, and the desc wrapper's `grid-template-rows: 1fr → 0fr`. Layout runs **once per
   crossing**, not per frame, so the dead F3 fork does not return. This dissolves D-4 (the band and
   the desc actually collapse), D-8 (one clock, one token, zero magic ranges), and D-5 (no transform
   survives, so there is no origin to mirror).

3. **Make the veil a material, not a ramp.** Rest keeps the ratified 0.52-of-0.65 breathing floor.
   Stuck must **occlude**, which an α-0.65 fill cannot do at any opacity — so the stuck state needs
   an **opaque** plate token, not the resting fill at opacity 1. That is a producer request through
   the standing BH/BI relay (the P3 rest-floor / feather knobs are already booked; add a stuck fill),
   and it repairs D-3, D-14 and — because the stuck state becomes static material rather than
   animation — D-7 by construction, with nothing left for the blunt guard to fail to reach.

4. **Own the route heading.** Render `<h1 id="route-title" tabindex="-1">`, demote the panes' section
   headings to `<h2>` (`GradientVisualizer.vue:149/241/253` and siblings). One structural change,
   nine sites inherit, and §5.1's seven-origin focus contract becomes implementable for the first
   time. D-6.

5. **Retire the two local interims into the producer.** A non-bold glass-ui display rung (P10) so
   `.pane-header-title` stops restating four properties; the stuck plate fill (P3) so the `::before`
   recipe dies. D-10.

6. **Caption:** `text-prose`, `max-inline-size: 66ch`, and `<slot name="description">` instead of a
   `string` prop — which also lets `ConfigSliderPane.vue:107`'s conditional-`v-bind` contrivance go.
   D-9, D-12, D-13.

7. **Make the host coupling structural.** `.pane-scroll-fade` should not be a global class published
   by a leaf that styles its ancestors. Either the pane scroll host becomes a real component that
   provides the timeline name, or PaneHeader takes the timeline as a required token — and the false
   contract comment at `:43-45` gets corrected against `ConfigSliderPane.vue:106` either way. D-11.

**What must NOT happen:** another `!important` override stacked on `animations.css:184`, another
opacity number tuned by eye, or a `@supports` arm added to paper over D-1 — the atan2 support query
already returns `true` in the engine that computes the wrong answer.

---

## 5. Reproduction

```bash
# the dev server must be live on :9000
node docs/tranches/V/megatranche/audit/components/PaneHeader/probe-paneheader-design.mjs   # 30-capture geometry/type/heading census
node docs/tranches/V/megatranche/audit/components/PaneHeader/probe-shrink-ratio.mjs        # D-1/D-2: the ratio, per engine per band
node docs/tranches/V/megatranche/audit/components/PaneHeader/probe-cure-and-shots.mjs      # D-2 cure proof + 20 rest/stuck frames
node docs/tranches/V/megatranche/audit/components/PaneHeader/probe-occlusion-prm-fc.mjs    # D-3 leak, D-7 PRM, D-14 forced-colors
```

The naive-cure leak baseline in D-7 was measured with a one-off variant of the fourth probe: same
A/B differencing, with `reducedMotion: "reduce"` and
`.pane-header::before, .pane-header-title, .pane-header-desc-wrap > p { animation: none !important;
animation-timeline: auto !important }` injected to emulate the proposed gate, veil asserted at 0.52
before differencing.

Frames: `docs/tranches/V/megatranche/audit/components/PaneHeader/shots/`.

---

## 6. Findings summary

| ID | Severity | Family | Defect |
|---|---|---|---|
| D-1 | BLOCKER | CSS-arithmetic-as-law | Safari phone: title grows 1.62× and collides; ratio 1.619766 where the law demands 1.0 |
| D-2 | BLOCKER | CSS-arithmetic-as-law | Safari desktop: ratio 0.310797 vs the law's 0.618; title ink 13.67px, below body copy |
| D-3 | BLOCKER | material-cannot-occlude | veil leaks 14.7–24.6% of the band at its **strongest** state; α 0.65 caps coverage forever |
| D-4 | MAJOR | optical-not-layout contraction | band/padding/desc Δ = 0.00px rest→stuck on 30/30; 58–79% of the stuck content box is empty |
| D-5 | MAJOR | optical-not-layout contraction | `transform-origin: left top` is physical; 176px inline-start drift in RTL |
| D-6 | MAJOR | no-heading-owner | `h1 = 0` on 60/60 captures; route identity is an `<h3>` peer of its own subsections; §5.1 focus contract unimplementable |
| D-7 | MAJOR | material-cannot-occlude | MT-F023 adopted; the naive cure measurably worsens the leak on both engines — cure amended |
| D-8 | MAJOR | numbers-without-law | 64/120/80px, three clocks, un-tokenized; cited producer grammar absent from glass-ui 7.0.0 |
| D-9 | MINOR | producer-seam-deferred | `text-caption` is an eighth type role; renders italic, unsanctioned by §4 |
| D-10 | MINOR | producer-seam-deferred | display rung + veil recipe re-implemented per-instance; two "booked" swaps unlanded |
| D-11 | MINOR | producer-seam-deferred | `.pane-scroll-fade` contract comment false vs `ConfigSliderPane.vue:106`; global class from a leaf, unenforced |
| D-12 | MINOR | string-prop-caption | `description: string` forbids §6.1 LTR isolation; drives a `v-bind` contrivance downstream |
| D-13 | MINOR | string-prop-caption | no measure, no clamp: header reaches 11.9% of a phone viewport on `/#/atmosphere` |
| D-14 | INFO | material-cannot-occlude | forced-colors: veil = flat Canvas wash, `blur(0px)`, `--ink-muted` inert; existing FC matrix did not apply |
| D-15 | INFO | state-register | empty/loading/error/focus states never designed |

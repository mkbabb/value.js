# CHALLENGE-D — `demo/shared/ui/PaneHeader.vue` — THE DESIGN IS FLAWED

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. The seat was
spawned with an explicit Opus 5 declaration and the served tier agrees with it. Not inherited, not
undeclared.

Axis: **design** (visual truth, state coverage, motion, design-system boundary, proportion/seat law).
Subject: `demo/shared/ui/PaneHeader.vue` (224 lines), the sole route-identity surface for **9 panes**
(`BrowsePane`, `PalettesPane`, `AdminPane`, `AboutPane`, `MixPane`, `GradientPane`, `GeneratePane`,
`ExtractPane`, `ConfigSliderPane` → Atmosphere + Blob).

**Verdict: DEFECTIVE.** 16 findings, 4 BLOCKER, 4 MAJOR.

Two of the BLOCKERs falsify claims the file makes about itself in its own comment prose, by
measurement, on the shipping engine. The fourth (D-16) is the gestalt defect and was found on the
**verification pass that corrected my own D-8** — see §0.1. It subsumes D-4, D-5 and D-8 and rewrites
the cure.

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

Frames: `shots/` (34). Reused: `docs/tranches/V/megatranche/audit/visual/REPORT.md`,
`visual/shots/{safari-desktop-light,safari-desktop-dark,forced-colors-desktop,zoom-200-desktop}/`.

Law read and applied: `docs/tranches/V/VISUAL-CONSTITUTION.md` (§3, §3.1, §4, §4.1, §5.1, §6, §6.1,
§7), `docs/tranches/V/PROPORTION-AUDIT.md` (§2, §4 PR-01/PR-12, §5.3/5.8/5.11/5.13).

### 0.1 Self-correction — D-8's negative claim was FALSE, and correcting it produced D-16

An earlier draft of this report asserted, as a measured negative:

> "```grep -rlo "ScrollCardHeader\|scroll-card-header\|title-collapse\|card-scroll"
> node_modules/@mkbabb/glass-ui/dist/``` → (no output). Zero hits across the entire installed
> `@mkbabb/glass-ui@7.0.0` dist. The 'one grammar' the ranges claim to inherit is not in the shipped
> producer."

**That is wrong.** Re-run at verification time, same command, same tree:

```
$ grep -rlo "ScrollCardHeader\|scroll-card-header\|title-collapse\|card-scroll" \
      node_modules/@mkbabb/glass-ui/dist/
node_modules/@mkbabb/glass-ui/dist/card-Bk96VI2R.js
node_modules/@mkbabb/glass-ui/dist/styles/index.css
node_modules/@mkbabb/glass-ui/dist/styles/utilities/base-misc.css
node_modules/@mkbabb/glass-ui/dist/components/card/CardHeader.vue.d.ts
$ node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"
7.0.0
```

Term by term: `ScrollCardHeader` **0 hits**, `scroll-card-header` **0**, `title-collapse` **0**,
`card-scroll` **4 files**. So the file's `:157` reference to a `ScrollCardHeader` component is
genuinely unresolvable, but its `:171-172` citation of **`card-scroll.css`'s** lane is *real* — the
file `node_modules/@mkbabb/glass-ui/dist/components/card/card-scroll.css` exists and ships the whole
choreography. D-8 is rewritten below to the narrower defect that survives.

The pursuit of that correction is what surfaced **D-16**, which is the largest finding in this
report. A negative claim I did not re-verify was hiding a producer seam that makes most of the rest
of this document a consequence rather than a cause.

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

### D-16 · BLOCKER · This is the **third** parallel header-condense choreography in one app, and it is the only one that does not contract anything

This is the gestalt defect. The other findings are its symptoms.

The repository contains three independent implementations of "a pane header that contracts on
scroll". PaneHeader is the third, and it is the only one that steps **no layout quantity at all**.

**(1) The producer.** `@mkbabb/glass-ui@7.0.0` ships the complete seam. Verified installed version
`7.0.0`.

`node_modules/@mkbabb/glass-ui/dist/components/card/CardHeader.vue.d.ts`:

```ts
type __VLS_Props = {
    /** Requires `.card-scroll-host` on the scrollable ancestor. */
    shrink?: boolean;
    class?: HTMLAttributes["class"];
};
```

`node_modules/@mkbabb/glass-ui/dist/styles/utilities/base-misc.css`:

```css
.card-scroll-host { contain: layout style paint; }
```

`node_modules/@mkbabb/glass-ui/dist/components/card/card-scroll.css` (whole file, reflowed):

```css
.card-header--shrink {
  --card-header-pad-condensed: calc(var(--card-pad-block) / 2);
  position: relative; isolation: isolate;
  transition: padding-block-start var(--duration-normal) var(--ease-standard);
}
.card-header--shrink::before {
  content: ""; position: absolute;
  inset: 0 0 calc(var(--card-pad-title-gap) * -1);
  z-index: -1; border-radius: inherit;
  background: var(--glass-bg-resting);
  -webkit-backdrop-filter: var(--glass-blur-resting);
  backdrop-filter: var(--glass-blur-resting);
  mask-image: linear-gradient(to bottom, black calc(100% - var(--card-pad-title-gap)), transparent);
  opacity: 0; pointer-events: none;
  transition: opacity var(--duration-normal) var(--ease-standard);
}
.card-header--shrink > [data-slot="card-title"] {
  font-size: var(--type-display-2);
  transition: font-size var(--duration-normal) var(--ease-standard);
}
.card-header--shrink[data-condensed="true"] { padding-block-start: var(--card-header-pad-condensed); }
.card-header--shrink[data-condensed="true"]::before { opacity: 1; }
.card-header--shrink[data-condensed="true"] > [data-slot="card-title"] { font-size: var(--type-display-1); }
.card-header--shrink[data-condensed="true"] > [data-slot="card-description"] { display: none; }
@media (prefers-reduced-motion: reduce) {
  .card-header--shrink, .card-header--shrink::before,
  .card-header--shrink > [data-slot="card-title"] { transition: none; }
}
```

Its condense state is a **discrete two-state toggle with hysteresis** (`card-Bk96VI2R.js`: down at
`scrollTop >= 24`, back up at `12`, gated on `scrollHeight - clientHeight > headerRect.height/2 + 24`),
and `CardTitle` takes `as` with default `"h3"` — so `as="h1"` is a producer-supported prop.

**(2) The Picker's local one.** `demo/picker/composables/useHeaderCondense.ts` (127 lines) +
`demo/picker/header.css`. Also discrete two-state, IntersectionObserver sentinel, with a sufficiency
gate. It **explicitly rejects the producer**, in its own docblock at `useHeaderCondense.ts:9-15`:

> "NEVER a compositor-only title `scale()` over an un-shrunk band (t33-research §6.6 — the pinned
> defect; the producer's shipped `card-header--shrink` / `<ScrollCardHeader>` choreography is
> compositor-only BY ARCHITECTURAL COMMITMENT … so it structurally cannot satisfy §0.8/BR-9)"

and it delivers real layout steps — `header.css:82-85` `padding-top/bottom: 0.375rem` on condense,
`header.css:87-102` a real `--type-display-2 → --type-display-1` **font-size** step, described at
`:80-81` as "a REAL layout-box shrink, measurable by getComputedStyle — BR-9; NOT a compositor
translate".

**(3) PaneHeader.** `transform: scale()` on a box that never changes size. `PaneHeader.vue:205-212`.

Now put them side by side against `VISUAL-CONSTITUTION.md §3.5` — "A header contracts as a whole
block… when stuck, **title, padding, and band all** take the compact token step":

| §3.5 quantity | producer `card-scroll.css` | Picker `header.css` | **PaneHeader (9 panes)** |
|---|---|---|---|
| title | `font-size` display-2 → display-1 (real) | `font-size` display-2 → display-1 (real) | `transform: scale()` — **optical only, box unchanged** |
| padding | `padding-block-start` → `calc(--card-pad-block/2)` | `padding-top/bottom → 0.375rem` | **none, 16px/8px constant** |
| band | contracts with the padding | contracts with the padding | **none, 0.00px Δ on 30/30 captures** |
| description | `display: none` (leaves layout) | collapses with the strip | `opacity: 0` — **keeps its 18.69px box** |
| motion tokens | `--duration-normal` / `--ease-standard` | same | raw `64px`/`120px`/`80px`/`-0.25rem` |
| reduced motion | explicit `@media … reduce { transition: none }` | transitions, reachable by the global guard | **structurally unreachable** (D-7 / MT-F023) |
| RTL | no transform → no origin to mirror | no transform | `transform-origin: left top` (D-5) |
| heading level | `CardTitle` `as` prop | — | hardcoded `<h3>` (D-6) |
| host containment | `.card-scroll-host { contain: layout style paint }` | — | `.pane-scroll-fade { contain: layout style paint; … }` — **byte-identical duplicate** |

The Picker rejected the producer *because* it was compositor-only and could not contract the box.
PaneHeader then shipped, on the other nine surfaces, a choreography that is **compositor-only and
contracts even less than the producer does** — the producer at least steps `font-size` and
`padding-block-start` and removes the description from layout; PaneHeader steps nothing. The nine
main pane surfaces received the worst of the three available options, and the one route that got the
good one (Picker) is the one route that is not a PaneHeader consumer.

Owner edict 4 ("Glass-ui is the design system — variants/primitives belong in glass-ui, not in
demo/") and edict 3 (KISS, no contrivance) are both violated at the largest available scale. And the
file's own comment kills the "census's 7th parallel recipe, CC-3" at `:66-67` — while writing the
8th, in a repo that already had two.

Repro: the greps and file reads in §0.1 and above; `demo/picker/header.css:82-102`;
`demo/picker/composables/useHeaderCondense.ts:9-15`.

---

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

Repro: `node docs/tranches/V/megatranche/audit/components/PaneHeader/probe-shrink-ratio.mjs`
(re-run at verification time; numbers above reproduced exactly).

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

**If the transform survives at all, the cure is one substitution and it is already proven portable.**
`probe-cure-and-shots.mjs`:

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

Under D-16's cure the transform disappears entirely and this token dies with it. The one-line
substitution stands as the **interim** fix if the jury stages the work.

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

**Scope note (important for the cure).** The producer's `card-scroll.css` uses the *same*
`background: var(--glass-bg-resting)` fill, so this is a **producer material defect**, not one
PaneHeader invented — adopting D-16's cure inherits it. The stuck state needs an **opaque** plate
token, which is a BH/BI producer request, not a local opacity nudge.

---

### D-4 · MAJOR · The header never contracts — §3.5 is violated in every quantity it names

*(Consequence of D-16.)*

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

Note that both sibling implementations already solve this (D-16 table). The description's dead box in
particular is one producer declaration: `[data-condensed="true"] > [data-slot="card-description"]
{ display: none }`.

---

### D-5 · MAJOR · RTL: `transform-origin: left top` is a physical keyword; the title detaches from its margin

*(Consequence of D-16 — neither sibling has a transform, so neither has this defect.)*

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

`transform-origin` has no logical keywords, so a transform-preserving fix requires a `:dir()` pair
(`0 0` / `100% 0`). The correct fix is D-16's: a `font-size` step has no origin to mirror.

---

### D-6 · MAJOR · No `<h1>` exists on any route; the pane title is an `<h3>` peer of its own subsections

Measured, 30/30 captures: `h1: 0`, `h2: 0`, `h3: 1…5`. Independently corroborated by the tranche's own
`visual/REPORT.md` per-capture table — the `h1` column reads **0 on 60/60 captures**. Corroborated a
third way by source census:

```
$ grep -rn "<h1\|as=\"h1\"\|tag=\"h1\"" demo/
(no output)
```

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

And the `h3` is not even a producer constraint: glass-ui's `CardTitle` takes `as` with default
`"h3"` (`card-Bk96VI2R.js`, `CardTitle.props.as = { default: "h3" }`), so `as="h1"` is available
today. PaneHeader is the only element that could own the route H1. It declines to.

---

### D-7 · MAJOR · MT-F023 — **ADOPTED**, cure **AMENDED** with measurement, then **DISSOLVED** by D-16

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

**Strictly worse on every metric, on both engines.** The naive cure trades a legibility floor for
stillness, for exactly the cohort the guard exists to protect. That is the wrong trade and it is not
what §6 asks for:

> `§6` — "Reduced motion resolves directly to the **final geometry and stable chromatic state**."

Note "final", not "rest". The root's disposition — "STRUCTURE not gate (L-8)" — is **right**, and I
keep it; what I amend is *which* structure. Wrapping the three declarations in
`@media (prefers-reduced-motion: no-preference)` is still a scroll-timeline fork, just a gated one.

**The structural cure that actually satisfies L-8 is D-16.** Both sibling implementations drive their
condense from a discrete state attribute through **transitions**, which:

1. the global guard at `animations.css:184` **does** reach (`transition-duration: 0.01ms !important`), and
2. the producer independently belt-and-braces with its own arm —
   `card-scroll.css`: `@media (prefers-reduced-motion: reduce) { .card-header--shrink, …::before,
   … > [data-slot="card-title"] { transition: none } }`.

So MT-F023 is not gated, not overridden, and not patched — it **ceases to exist**, because there is
no longer a scroll-driven animation for the guard to fail to reach. That is a strictly stronger
disposition than the one proposed, in the root's own idiom, and it is the one I put to the jury.

*(If the jury stages the work and the scroll-timeline survives an interim, then the interim gate must
be the no-preference wrapper **plus** a static `--pane-veil-rest: 1` under `reduce` — never the
wrapper alone, per the leak table above.)*

---

### D-8 · MAJOR · Three desynchronised magic ranges on one "block", none of them tokenized *(REWRITTEN — see §0.1)*

`:182` `animation-range: 0px 64px` (veil) · `:188` `0px 120px` (title) · `:192` `0px 80px` (desc).
Three un-tokenized constants with three different clocks on a surface §3.5 calls "a whole block". At
scroll 80px the desc is fully gone, the veil finished 16px ago, and the title is 67% through its
travel — the block does not contract, it decomposes. `translateY(-0.25rem)` at `:221` is likewise a
raw literal, and the feather at `:82-96` hardcodes `14px` in four places.

Owner edict 6 asks for tokenized motion. **The producer tokenizes every one of these quantities** —
`var(--duration-normal)`, `var(--ease-standard)`, and, for the feather PaneHeader writes as a bare
`14px`, `var(--card-pad-title-gap)` (= `calc(var(--card-pad-inline) / 2.618)`,
`components/card/styles.css`). PaneHeader's numbers are hand constants standing where producer tokens
already exist.

**Correction to the previous draft:** I previously asserted the cited producer grammar was absent
from glass-ui 7.0.0. It is not — `components/card/card-scroll.css` exists and is quoted in full under
D-16. The `:157` reference to a `ScrollCardHeader` *component* is still unresolvable (0 hits), but
the `:171-172` citation of the `card-scroll.css` lane is accurate. The defect is not a fabricated
citation; it is that the file cites a producer grammar it then declines to consume.

---

### D-9 · MINOR · The description uses an **eighth** type role, and renders italic

> `§4` — the role matrix is seven rows and "This matrix is closed across all eighteen compositions",
> with exactly one named exception (P019's Picker pair).

`PaneHeader.vue:29` uses `text-caption`. `caption` is a real glass-ui typography rung — but it is
**not one of the seven authorized roles**, and it is not `mono-caption` (the one caption spelling §4
does admit, "where the content is a caption" — and that row is Fira Code). Measured computed style on
the `<p>`:

```
fontStyle: "italic"   fontFamily: "Plus Jakarta Sans"
fontSize: 14.384px (desktop 1440) / 12.179px (phone 390)
```

No row of §4's matrix specifies italic. A pane description is help text — `text-prose` — or control
copy — `text-small`. The `--ink-muted` colour work at `:118-124` is careful and correct; the *rung*
it is applied to is unauthorized.

---

### D-10 · MINOR · The display rung and the whole veil recipe are per-instance re-implementations of producer seams

*(Now a sub-case of D-16, retained for its two distinct booked-swap coordinates.)*

`:106-112` restates four properties of a producer type rung locally, with the reason given at
`:103-105`: "the producer `text-heading` utility hardcodes 700 — retired here; the weight rides the
:root pin, **the P10 booked swap**". Likewise the entire `::before` at `:82-98` is admitted at
`:74-76` as "The producer rest-floor + bottom-feather knobs are packet P3 (BOOKED swap); this veil +
feather are the **carried interim**", and `:157` waits "until P3's ScrollCardHeader knobs land
(BOOKED)".

Two producer seams deferred, two local interims shipped. Owner edict 4 and edict 5 (style at the
root, never per-instance) are both live violations today; *booked* is not *landed*. The sharper point
after D-16: the `::before` at `:82-98` is not merely "an interim pending P3" — it is a
character-for-character reimplementation of `card-scroll.css`'s `::before`, differing only by
substituting the literal `14px` for `var(--card-pad-title-gap)`. The interim is a copy of the thing
it is waiting for.

---

### D-11 · MINOR · `.pane-scroll-fade` duplicates a producer utility, and its documented contract is false

`:54-57`:

```css
.pane-scroll-fade { contain: layout style paint; scroll-timeline: --pane-scroll block; }
```

Line 1 is byte-identical to the producer's `.card-scroll-host { contain: layout style paint; }`
(`base-misc.css`) — the class `CardHeader`'s own docblock names as its required host. A demo leaf
re-declares a producer utility under a new name (edict 4), and by renaming it makes the producer
`CardHeader shrink` prop unusable on these nine surfaces without a second class.

The contract comment is also wrong. `:43-45` asserts:

> "The `.pane-scroll-fade` host class lives on the **ROOT element** of each pane Card (9 sibling
> panes: Browse/Admin/About/Palettes/Mix/Gradient/Extract/Generate/**ConfigSlider**)"

`ConfigSliderPane.vue:98-107` — the pane root is `<div class="relative w-full mx-auto h-full min-w-0">`,
inside it a `<Card class="… overflow-hidden">`, and only inside *that* the
`<div class="pane-scroll-fade scrollbar-thin flex-1 …">` that hosts PaneHeader. Two levels below the
root, on a flex child, not on a Card root. The contract comment is wrong about at least one of its
nine named consumers — and that consumer is the one serving two routes (`/#/atmosphere`, `/#/blob`).

Structurally: a leaf presentational component publishes a **global unscoped class** that styles its
own *ancestors*, and its entire designed behaviour silently evaporates if a consumer forgets the
magic string — an unresolved `scroll-timeline` name makes the animations inert, with no prop, no
`provide`/`inject`, no dev warning, and no type. Nine hand-maintained couplings to a string.

---

### D-12 · MINOR · `description` is a string prop, so §6.1's LTR-isolation requirement cannot be met

`PaneHeader.vue:35-37` — `defineProps<{ description?: string }>()`, rendered `{{ description }}`.

> `§6.1` — "CSS strings, hex, slugs, IDs and provenance: render in **LTR-isolated spans** inside RTL
> prose"

A `string` prop admits no markup, so no consumer can wrap a hex, slug, ID or code fragment in an
isolating span. A `<slot name="description">` costs nothing and is the idiom the title already uses
(and matches the producer's `[data-slot="card-description"]`).

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
| stuck / scrolled | **broken** | D-1, D-2, D-3, D-4, D-8, D-16 |
| empty title | **unhandled** — `<slot />` at `:21` has no fallback and no `v-if`; an empty `<h3>` with `text-wrap: balance` and a 41.888px line box reserves 43.97px of nothing | code read |
| loading | **absent** — no pending affordance. `AdminPane.vue` suppresses its count Badge to `null` while the roster loads (a correct decision) but the header carries no pending truth, so the pane identity is silent during work. §4.1: "pending … states are never color-only … state/value … explicit" | `AdminPane.vue:118-121` |
| error | **absent** — `BrowsePane`'s "The commons is unreachable." error lives in the body while the header keeps saying nothing changed (`safari-desktop-dark/browse.png`) | frame |
| focused | **no focus target exists at all** | D-6 |
| hover / active / pressed / selected / dragging | correctly none — the header is not interactive | code read |
| overflowing / truncated | **unhandled** | D-13 |
| RTL | **broken** | D-5 |
| reduced-motion | **broken; the naive cure regresses it further** | D-7 |
| forced-colors | **undesigned** | D-14 |
| zoom 200% | rest **fine** (`zoom-200-desktop/gradient.png`); stuck at 200% **unmeasured — hypothesis**: the shrink ratio is viewport-derived and 200% zoom halves the layout viewport to 720px, which puts `--type-display-1` on its fluid arm rather than at the cap, so the WebKit fault of D-1/D-2 will land on a third value again | hypothesis, labelled |
| dark | rest fine; stuck **worse than light** (higher-contrast bleed-through) | `webkit-desktop1440-dark-STUCK.png` |
| `<Badge>` in the title slot | `AdminPane.vue:5` nests a `<Badge>` inside the `<h3>`, so the count is folded into the heading's accessible name ("Users 12") and scales with the title to 0.31× on WebKit desktop. §5.2 "one identity line" | code read |

---

## 3. Motion audit (owner edict 6, §6)

- **Tokenized?** No. Three raw ranges (64/120/80px), a raw `-0.25rem`, a raw `14px` feather ×4.
  `--animation-slide-sm/md/lg` are not consumed and are the wrong register anyway — a scrub has no
  duration. The right tokens exist and are the producer's: `--duration-normal`, `--ease-standard`,
  `--card-pad-title-gap`. D-8.
- **Reduced motion?** Structurally unreachable. D-7 / MT-F023.
- **Layout-forcing properties?** No — and the intent was sound. The F3 fork (padding / font-size /
  grid-template-rows scrubbed *per frame*) was correctly killed at `:152-155`. **But the conclusion
  drawn from it was wrong.** The choice was framed as "compositor purity vs. §3.5's contraction", and
  purity won. That is a false dilemma: both sibling implementations contract real layout while
  running layout **once per threshold crossing**, not per frame (`useHeaderCondense.ts:18-24`
  — "A discrete toggle (not a per-scroll-frame scrub) ⇒ ZERO per-frame reflow"). The component paid
  §3.5 to avoid a cost that a discrete toggle does not incur, and never recorded the trade.
- **Animations deleted?** None found. The three keyframes are additive; the F3 keyframes were
  removed but the choreography they expressed was retained in transposed form. Edict 6 satisfied.
- **§6 "exit is shorter than entry"?** Not applicable to a bidirectional scrub — correctly so.
- **§6 "Reduced motion resolves directly to the final geometry"?** Violated in both the shipped
  state (no resolution at all) and the naive cure (resolves to *rest*, not final). D-7.

---

## 4. Proposed cure — architectural, in priority order

Not a patch list. The component's fault is a single wrong premise — **"a scroll-reactive header can
be expressed as three independent compositor scrubs on a fixed box, with CSS trig standing in for
design decisions"** — held in a repository that had already answered the question twice, correctly,
in two places PaneHeader's own comments cite by name.

1. **Adopt an existing condense seam. Do not write a fourth.** The choice is between two shipped,
   discrete, two-state, real-layout-step implementations:

   - **(a) the producer** — `<CardHeader shrink>` + `.card-scroll-host`, `card-scroll.css`. Ships
     tokenized transitions, a `display:none` description collapse, `CardTitle as="h1"`, and its own
     PRM arm. Its rung pair is display-2 → display-1, whereas value's ratified pair (T.W4-1) is
     display-1 → heading, so adoption needs the rungs tokenized
     (`--card-header-title-rung-{rest,condensed}`) via the standing BH/BI relay — a producer request,
     which is the correct direction of travel under edict 4.
   - **(b) the in-repo primitive** — `useHeaderCondense.ts`, already shipping on Picker, already
     carrying the sufficiency gate that stops the condense oscillating on
     barely-overflowing content (`useHeaderCondense.ts:25-34`), and already the declared "REFERENCE
     implementation a producer real-box-shrink door later absorbs" (`:14-15`).

   **My recommendation is (b) now, (a) when the producer door lands** — because (b) needs no producer
   release, is the option the repo already ruled correct for exactly this problem, and (a)'s
   compositor-only commitment is the very thing `useHeaderCondense.ts:9-13` rejects. Either way, one
   transposition retires: the `@supports` block (`:177-194`), all three `@keyframes` (`:196-223`),
   `--pane-title-shrink-ratio` (`:140-142`), `transform-origin` (`:184`), and `.pane-scroll-fade`
   (`:54-57`). That single move dissolves **D-16, D-4, D-5, D-7, D-8, D-11**, and makes D-1/D-2
   unreachable because there is no ratio left to compute.

2. **Interim only, if the jury stages the work:** `--pane-title-shrink-ratio: calc(var(--type-heading)
   / var(--type-display-1))`. Measured identical in both engines at both bands (D-2). It is a shipped
   Safari defect with a proven one-token fix, so it should not wait on the transposition — but it is
   a stopgap on code that step 1 deletes, not a cure.

3. **Make the veil a material, not a ramp.** Rest keeps the ratified 0.52-of-0.65 breathing floor.
   Stuck must **occlude**, which an α-0.65 fill cannot do at any opacity (D-3) — so the stuck state
   needs an **opaque** plate token. This defect is inherited from the producer (`card-scroll.css`
   uses the same `--glass-bg-resting`), so it is a BH/BI producer request — add a stuck fill
   alongside the already-booked P3 rest-floor/feather knobs — and it repairs D-3 and D-14 on every
   consumer at once.

4. **Own the route heading.** Render the route identity as `<h1 id="route-title" tabindex="-1">`
   (producer-supported: `CardTitle as="h1"`), and demote the panes' section headings to `<h2>`
   (`GradientVisualizer.vue:149/241/253` and siblings). One structural change, nine sites inherit,
   and §5.1's seven-origin focus contract becomes implementable for the first time. D-6.

5. **Retire the two local interims into the producer.** A non-bold glass-ui display rung (P10) so
   `.pane-header-title` stops restating four properties; the stuck plate fill (P3) so the `::before`
   recipe — currently a copy of `card-scroll.css`'s `::before` with `14px` substituted for
   `var(--card-pad-title-gap)` — dies. D-10.

6. **Caption:** `text-prose`, `max-inline-size: 66ch`, and `<slot name="description">` instead of a
   `string` prop — which also lets `ConfigSliderPane.vue:107`'s conditional-`v-bind` contrivance go.
   D-9, D-12, D-13.

**What must NOT happen:** a fourth bespoke condense (including the zero-height `IntersectionObserver`
sentinel I proposed in an earlier draft of this report — that is `useHeaderCondense.ts` re-typed);
another `!important` override stacked on `animations.css:184`; another opacity number tuned by eye;
or a `@supports` arm added to paper over D-1 — the atan2 support query already returns `true` in the
engine that computes the wrong answer.

---

## 5. Reproduction

```bash
# the dev server must be live on :9000
node docs/tranches/V/megatranche/audit/components/PaneHeader/probe-paneheader-design.mjs   # 30-capture geometry/type/heading census
node docs/tranches/V/megatranche/audit/components/PaneHeader/probe-shrink-ratio.mjs        # D-1/D-2: the ratio, per engine per band
node docs/tranches/V/megatranche/audit/components/PaneHeader/probe-cure-and-shots.mjs      # D-2 cure proof + 20 rest/stuck frames
node docs/tranches/V/megatranche/audit/components/PaneHeader/probe-occlusion-prm-fc.mjs    # D-3 leak, D-7 PRM, D-14 forced-colors
```

D-16 needs no browser — it is four file reads and two greps:

```bash
node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"     # 7.0.0
cat node_modules/@mkbabb/glass-ui/dist/components/card/card-scroll.css        # the producer choreography
cat node_modules/@mkbabb/glass-ui/dist/components/card/CardHeader.vue.d.ts    # the `shrink` prop + host contract
grep -o "card-scroll-host[^}]*}" node_modules/@mkbabb/glass-ui/dist/styles/utilities/base-misc.css
#   -> card-scroll-host { contain: layout style paint; }
sed -n '1,45p;75,120p' demo/picker/composables/useHeaderCondense.ts           # the in-repo primitive + its rejection of (a)
sed -n '75,120p' demo/picker/header.css                                      # the Picker's real padding + font-size steps
```

The naive-cure leak baseline in D-7 was measured with a one-off variant of the fourth probe: same
A/B differencing, with `reducedMotion: "reduce"` and
`.pane-header::before, .pane-header-title, .pane-header-desc-wrap > p { animation: none !important;
animation-timeline: auto !important }` injected to emulate the proposed gate, veil asserted at 0.52
before differencing.

Frames: `docs/tranches/V/megatranche/audit/components/PaneHeader/shots/` (34).

---

## 6. Findings summary

| ID | Severity | Family | Defect |
|---|---|---|---|
| D-16 | BLOCKER | duplicate-choreography | third parallel header-condense in one app; the only one that steps **no** layout quantity, while glass-ui 7.0.0 `CardHeader shrink` and in-repo `useHeaderCondense` both do |
| D-1 | BLOCKER | CSS-arithmetic-as-law | Safari phone: title grows 1.62× and collides; ratio 1.619766 where the law demands 1.0 |
| D-2 | BLOCKER | CSS-arithmetic-as-law | Safari desktop: ratio 0.310797 vs the law's 0.618; title ink 13.67px, below body copy |
| D-3 | BLOCKER | material-cannot-occlude | veil leaks 14.7–24.6% of the band at its **strongest** state; α 0.65 caps coverage forever (producer-inherited) |
| D-4 | MAJOR | duplicate-choreography | band/padding/desc Δ = 0.00px rest→stuck on 30/30; 58–79% of the stuck content box is empty |
| D-5 | MAJOR | duplicate-choreography | `transform-origin: left top` is physical; 176px inline-start drift in RTL |
| D-6 | MAJOR | no-heading-owner | `h1 = 0` on 60/60 captures and 0 in source; route identity is an `<h3>` peer of its own subsections; §5.1 focus contract unimplementable; `CardTitle as` was available |
| D-7 | MAJOR | duplicate-choreography | MT-F023 adopted; naive cure measurably worsens the leak on both engines — amended, then dissolved by D-16 |
| D-8 | MAJOR | numbers-without-law | 64/120/80px + `-0.25rem` + `14px`×4, three clocks, un-tokenized where producer tokens exist. **Corrected**: the cited `card-scroll.css` grammar *does* ship |
| D-9 | MINOR | producer-seam-deferred | `text-caption` is an eighth type role; renders italic, unsanctioned by §4 |
| D-10 | MINOR | producer-seam-deferred | display rung + veil recipe re-implemented per-instance; the `::before` is a copy of the producer's with `14px` for `var(--card-pad-title-gap)` |
| D-11 | MINOR | duplicate-choreography | `.pane-scroll-fade` duplicates producer `.card-scroll-host`; contract comment false vs `ConfigSliderPane.vue:106`; global class from a leaf, unenforced |
| D-12 | MINOR | string-prop-caption | `description: string` forbids §6.1 LTR isolation; drives a `v-bind` contrivance downstream |
| D-13 | MINOR | string-prop-caption | no measure, no clamp: header reaches 11.9% of a phone viewport on `/#/atmosphere` |
| D-14 | INFO | material-cannot-occlude | forced-colors: veil = flat Canvas wash, `blur(0px)`, `--ink-muted` inert; existing FC matrix did not apply |
| D-15 | INFO | state-register | empty/loading/error/focus states never designed |

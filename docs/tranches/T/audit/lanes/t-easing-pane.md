# T lane — t-easing-pane (T-22)

**Lane**: design (Fable), the gradient pane's easing area against the editorial-instrument
register.
**Row**: T-22 — "This area in easing is still a mess." (owner shot `t-2009-51`; amends W5-9).
**Method**: owner shot re-read from disk; live probes on an isolated dev server (:9137,
`VITE_API_URL=http://localhost:59999`) in a dedicated Playwright page (the shared MCP tab was
contended by sibling lanes — every probe re-acquired its own :9137 page). 1440×960 + 390×844,
light + emulated-dark, curve + steps modes, 1- and 2-interval states; computed styles inlined.
Producer ground truth read from `../glass-ui` source (READ-ONLY) **and** verified present in
the consumed dist (`@mkbabb/glass-ui@4.2.0`). ZERO product-code changes.

**Shot re-derivation** (`t-2009-51.png`): dark scheme, rust-derived paper. The open `1 → 2`
interval row of `GradientEasingEditor` — ramp strip (green→blue, correct), Curve|Steps pill,
a tall letterboxed curve canvas in dark chocolate glass with a heavy offset shadow, PRESET +
select, the `cubic-bezier(0, 0, 1, 1)` readout card, and below it **a ~40px circular blob
clipping the wrapped text "…ace/the/…"** — the play button. Reproduced element-for-element
on :9137 (light + dark; probe shots `easing-light-full.png`, `easing-row-dark-settled.png`,
`steps-row-light.png`, `preset-menu-open.png`, `two-intervals-light.png`,
`easing-mobile-390.png`, session scratchpad; every load-bearing number inlined below).

**What W5-9 got right (the bones the cure must keep)**: the per-interval ramp strip is the
strongest element on the surface — live-verified sampling the ONE gradient law
(`serializeIntervalRamp`, banded correctly under `steps(4, end)`: 32-band
`linear-gradient(90deg, oklch(0.75 0.15 145) 0%…)` measured); the alive-`v-show` picker
discipline + the `epoch` re-seed (drawn curve and live fn can never disagree); the seeded
`linear` byte-identity (`useGradientCSS.ts:30-44`). The mess is **composition, sizing, and
material** — not state.

---

## Findings

### 1. The play button is the documented `btn-pill`×`glass-btn` blob — the library's own P0, still shipping at 4.2.0

**Evidence** (live, :9137): the "Trace the curve"/"Climb the staircase" button computes
**40×40px, `contain: paint`, `border-radius: 9999px`** with class
`btn-pill glass-btn rounded-pill px-3 py-2` — the label wraps and clips to a floating "the"
blob (owner shot's bottom-center debris; reproduced in every probe shot, both modes: steps
mode clips "Climb the staircase" identically). Source: glass-ui `EasingPicker.vue:340`;
**dist-confirmed at the consumed pin**: `node_modules/@mkbabb/glass-ui/dist/easing.js:424`.
glass-ui's own surfaces.css names this exact failure: "MUTUALLY EXCLUSIVE; never stack
`.glass-btn` and `.btn-pill` … contain:paint clips the wrapped label into a ~40px blob (the
R8-17 'play button' defect)" (`glass-ui/src/styles/glass/surfaces.css:133-142`).

**Root-cause**: producer class co-occurrence, machine-named in the producer's own docs,
unfixed through the S cycle (GLASSUI-S-ASKS **L7 row 1, P0(defect)** — OPEN at S close, per
`S/FINAL.md:112` + `w9-close-probes.md:67`).

**Owner**: producer (L7 re-affirm — now with dist-line evidence).

**Cure direction**: L7 already names it. The T packet re-affirms with the 4.2.0 dist citation
and sharpens the shape: the play affordance is an **icon-led ghost control seated on the
canvas** (a small play glyph at the canvas corner — the curve is the subject, the verb sits
on it), not a text pill in the controls column. The poetic labels ("Trace the curve" / "Climb
the staircase") survive as `aria-label`/tooltip, not as layout-bearing text.

### 2. The stage is inverted: a fixed 288px chrome column starves the 132px canvas — the subject is the smallest thing in the row

**Evidence** (computed, :9137, 1440×960 desktop dual-pane): the picker grid resolves
`grid-template-columns: 132px 288px` inside a **436px** row (pane container 512px,
`container-type: inline-size` on `.pane-wrapper--left`). The curve canvas — the entire point
of the surface — gets **30%** of the row; the preset/readout/play column gets 66%. Inside
the 132px card the SVG computes **106×200** (`block-size: clamp(200px, 38cqi, 320px)` floor,
38cqi of 512 = 194.6 < 200; the inline `aspect-ratio: 1` is DEAD — both axes are
determined, so it never applies) and `preserveAspectRatio="meet"` letterboxes the 1×1.2
viewBox to a **106×127 drawn plot with ~36px of dead card top and bottom**. At 390×844
mobile the grid collapses to one column and the same law letterboxes the other axis: SVG
272×200 → 166×200 drawn, ~53px dead per side. The plot is **never** square-fit at any
probed size.

**Root-cause**: producer sizing law fights itself — a **viewport** breakpoint
(`lg:grid-cols-[1fr_18rem]`, `EasingPicker.vue:211`) drives a **container**-seated
component (the pane column is 512px while the viewport is `lg`), and the canvas mixes three
contradictory constraints (`w-full` + fixed `block-size` clamp + dead `aspect-ratio`)
resolved by SVG letterboxing instead of by layout.

**Owner**: producer (the demo consumes bare `<EasingPicker>` with zero layout override —
correct consumption of a wrong law).

**Cure direction (gestalt — the canvas IS the stage)**: the picker becomes
**container-query composed** (its own `@container`, not viewport `lg:`): below a container
threshold (~34rem) ONE column — canvas first at full row width, controls flow beneath; above
it, canvas keeps ≥ 60% of the inline size and the controls rail takes the remainder (the
18rem fixed column dies). The canvas sizes by ONE law: inline-size-driven,
`aspect-ratio: 1 / var(--vb-ratio)` (the overshoot-expanded viewBox ratio), no fixed
block-size, no letterbox — the drawn plot IS the element box. glass-ui's own
`EasingConfigurator` header names "the value.js GradientPane consumer shape" as this exact
seat (`EasingConfigurator.vue:2-6`) — the seat it designed for is the seat that starves it.

### 3. Two full Z1 cartoon rungs INSIDE a Z2 specimen row — the depth grammar inverted, and dark mode splits into two theming systems

**Evidence** (computed, :9137): the picker hardcodes `.glass-card` on BOTH internal surfaces
(canvas `EasingPicker.vue:217`, readout `:320`). The demo globally routes
`--shadow-card → --shadow-cartoon` (`style.css:287,289`), so each computes the FULL pane-tier
stamp — light: `color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px` + 4 inset legs +
`backdrop-filter: blur(8px) saturate(1.4)`, bg `oklab(0.9156 … / 0.52)`. The host row is the
demo's own Z2 specimen row — "flat on the plate, `--card-edge` hairline, no shadow"
(`GradientEasingEditor.vue:152-153`; row measures `1px solid oklab(0.216 … / 0.12)`, bg
transparent, shadow none). DESIGN.md's six laws say **Z2 = chip-scale or none** and the
cartoon budget is "plates + at most ONE protagonist" (`demo/DESIGN.md:100-118`) — the
gradient pane at rest casts the pane plate + perceived-space plate + canvas card + readout
card = **4 full-rung casters**. Emulated-dark is the mud in the owner's shot: the picker
internals track `.dark` (canvas bg `oklab(0.4149 … / 0.63)` chocolate) while the pane paper
tracks the accent derivation (stays light mauve), and the dark card then casts a **LIGHT**
stamp (`color(srgb 0.914 0.9 0.886 / 0.5) 8px 8px`) — a white halo behind a dark slab on
light paper (`easing-row-dark-settled.png`).

**Root-cause**: joint. Producer: the picker's internal material is **hardcoded chrome**
(`glass-card` ×2) with no tier/token seam — a component-interior surface wearing the
top-card class. Demo: the `--shadow-card` re-skin is component-blind — pane-tier depth leaks
into 106px-wide internals of a consumed component.

**Owner**: joint — producer (tokenize/delegate the internal material), demo (the seat law).

**Cure direction (the quiet well)**: the picker's internal surfaces become **wells, not
cards** — an inset reading surface (paper tint at ~4-6% ink, `--card-edge` hairline, ZERO
drop shadow, ZERO backdrop-filter; nothing behind a pane-seated canvas to blur). Producer
half: the canvas/readout material rides component tokens
(`--easing-canvas-bg/-edge/-shadow`, defaulting to today's glass for standalone use) or a
`chrome="well|card"` prop — same shape as the Card surface axis. Demo half: the specimen row
seats them flat (the row's own Z2 law), and the T-24 neutrals audit gets one fewer rogue
surface. This is the same producer-material-consumed-unexamined class as T-12
(t-search-tabs §1) — cite one law, cure both.

### 4. The travel dot has no rest state, no loop, no producer PRM gate — it parks ON the endpoint forever

**Evidence** (live): after the auto-trace completes, the dot rests at `cx="1"` — permanently
doubling the (1,0) endpoint circle (visible as the fat black dot atop the top-right endpoint
in `easing-mobile-390.png`; before first play it doubles (0,1), both endpoint dots reading as
odd half-moons in the owner's shot). Playback is a one-shot 1200ms rAF
(`useEasingPicker.ts:239-249`, `TRAVEL_DURATION_MS` `constants.ts:45`) with **no PRM gate at
the producer** (only the demo's auto-trace is gated, `GradientEasingEditor.vue:73,83`) and no
loop (`// the kf Oscillator loop seam` — a seam, not a feature, `useEasingPicker.ts:232`).

**Root-cause**: producer — L7 rows 2/3/5 ("travel-dot rest state; the loop seam landed …;
PRM gate") confirmed unshipped at 4.2.0.

**Owner**: producer (L7 amplify with live rest-state evidence).

**Cure direction**: the dot is **absent at rest** (or settles home to t=0 at dimmed ink after
a beat); play runs the curve and *settles out* — never parks mid-symbol. The loop lands as a
play/loop pair on the same control (press = once, long-press/toggle = loop via the kf
Oscillator seam), PRM-gated at the SOURCE so every consumer inherits the gate. The strongest
version pairs the dot with finding 6's specimen logic: the same clock drives a twin marker
across the row's RAMP strip — curve position and color position demonstrably one motion.

### 5. The demo drives the producer's play button by button-text regex — a workaround standing where a producer door belongs

**Evidence**: `GradientEasingEditor.vue:82-101` — auto-trace finds the affordance via
`querySelectorAll("button")` + `/trace the curve|climb the staircase/i` and `.click()`s it;
the comment self-documents the gap ("glass-ui does not defineExpose(playTravel);
producer-gap recorded on the L7 letter row"). It works (live: dot mid-flight then parked at
1 after row-open), but it is locale-fragile, label-coupled, and exactly the E-3 class the
mandate bans standing long-term.

**Root-cause**: producer API gap (no exposed playback control), bridged by a demo DOM-drive.

**Owner**: joint — producer opens the door (`defineExpose({ playTravel, stopTravel })` or a
declarative `autoplay`/`play-signal` prop); demo deletes the regex-drive the same day.

**Cure direction**: the T packet asks for the **declarative** shape (`:autoplay="'once'"` /
`v-model:playing`), which also carries the loop mode (finding 4) and keeps the demo's
"the row demonstrates itself on open" behavior as ONE prop instead of a timer + DOM query.

### 6. One curve, three dialects in 200px: head literal ≡ readout literal, while the select speaks a third name

**Evidence** (live + shot): the row head reads `1 → 2  cubic-bezier(0, 0, 1, 1)`
(`GradientEasingEditor.vue:169`), the readout card 130px below repeats the byte-identical
literal with a copy button (`EasingPicker.vue:324`), and the preset select between them says
"linear" — three renderings of one curve stacked in one open row. The head literal is also
the WORST voice for the common case: every seeded interval displays the 4-number bezier
serialization of `linear` (`linearInterval()`, `useGradientCSS.ts:38-46`) — expert-hostile
noise where a name exists.

**Root-cause**: demo composition (the duplication; the head's literal-always voice) + a small
producer payload gap (`EasingPickerValue` carries `mode/css/fn/points/steps/term` but NOT the
preset name, `useEasingPicker.ts:52-64` — the consumer cannot say "linear" without
re-deriving it).

**Owner**: joint — demo (one-literal law), producer (add `preset?: string` to the payload —
one field, zero behavior).

**Cure direction**: ONE name per state — the head speaks the curve's **name** when named
(`linear`, `ease-out-back`, `steps(4, end)`) and the literal only when custom; the literal +
copy live in exactly ONE place (the open row's readout). The copy affordance stays (it is
the pane's only per-interval literal export).

### 7. Closed rows are text-only: the specimen grammar vanishes when the row shuts

**Evidence** (live, 2-interval state, `two-intervals-light.png`): the closed row is
`2 → 3  cubic-bezier(0, 0, 1, 1)` + chevron — no endpoint colors, no curve identity, no
ramp. The interval's two colors and its curve shape — the entire identity of the specimen —
are only visible after opening it; with N intervals the accordion is a list of identical
mono strings.

**Root-cause**: demo — W5-9 put the ramp ("the row's ball") inside the OPEN body only
(`GradientEasingEditor.vue:182-191`); the head was never given the specimen's anatomy.

**Owner**: demo.

**Cure direction (the closed row is a specimen label)**: head anatomy = the two endpoint
color dots (the stop colors, à la the stop-editor's own handles) + a **micro curve glyph**
(the same 16×16 path finding 9 mints for the preset menu — ONE glyph painter, two seats) +
the curve's name (finding 6) + chevron. Optionally the head's baseline carries a 2px
hairline ramp. A closed accordion then reads as a legend of the gradient's intervals — the
instrument register — instead of a list of code strings.

### 8. The accent cacophony: the curve strokes a violet no demo surface owns, beside an amber slider, in a pink pane

**Evidence** (computed + shots): the curve/dot stroke `--easing-curve-accent =
var(--motion-accent, var(--viz-legendre))` (`EasingPicker.vue:214`) and `--motion-accent` is
set **nowhere** in `demo/` (grep: zero hits) — so the plot renders the library's violet
chart fallback on every theme, while the steps-mode `Steps (n)` slider fills the demo's
amber range tint (`steps-row-light.png`), the tabs are neutral ink, and the paper is
accent-pink. Four color voices inside a 460px row, none of them the interval's own colors.

**Root-cause**: demo — the producer built the exact door for this (the ppmycota fence:
"the consumer can override `--motion-accent` from any ancestor", `EasingPicker.vue:16-22`)
and the demo never opened it.

**Owner**: demo.

**Cure direction (the specimen strokes its own ink)**: `GradientEasingEditor` sets
`--motion-accent` per row to the interval's OWN color — the ramp midpoint
(`colorAtPosition` already computes it) or the contrast-safe variant via the house
`safeAccentColor` — so the curve, travel dot, and copy-check tick ARE the interval; the
slider range tint inherits the same token. One ink per specimen; the violet fallback stays
producer-internal.

### 9. The preset menu is 24 flat text rows — the curve picker's own dropdown has no curves in it

**Evidence** (live, `preset-menu-open.png`): 24 `[role=option]` items, `hasSvg: false` ×24,
un-grouped (`linear, ease, ease-in, … smooth-step-3, ease-in-sine, … ease-in-out-back`) —
a scroll of near-identical mono names for a family whose entire identity is SHAPE. (Minor,
same shot: the open dropdown's backdrop-filter smears the ramp strip behind it into a green
band across one option — the finding-3 well cure removes the sampled noise.)

**Root-cause**: producer — L7 row 4 ("curve-glyph preset menu") confirmed unshipped at
4.2.0 (`EasingPicker.vue:277-282` renders bare `{{ name }}`).

**Owner**: producer (L7 amplify, T-17-aligned).

**Cure direction**: each option leads with a **16×16 stroked micro-glyph** of its curve
(sampled from the same `bezierPresets` entry — zero new math, the same painter as finding
7's head glyph), items grouped by family (the standard set; then sine/quad/cubic/expo/circ/
back as labeled trios) — "deftly and in proportion", the T-17 dropdown grammar applied to
curves instead of colors. The trigger shows glyph + name.

### 10. Cross-cites (owned elsewhere, seated here)

- **T-20 pilling**: the Curve|Steps `SegmentedTabs variant="pill"`
  (`GradientEasingEditor.vue:193-199`) is a named host of the producer track/pill defect —
  owned by `t-search-tabs.md` §2 (ASK row); no second ask here.
- **The `1fr_18rem` grid + `38cqi`** interact with the pane-width story in
  `t-gradient-surfaces.md`; finding 2 is the component-law half.

---

## The target composition (the design, judged at the pane's own register)

The easing area becomes **the interval specimen bench**: a closed accordion that reads as a
legend (finding 7), and ONE open specimen at a time whose anatomy, top to bottom:

1. **The ramp strip** (kept verbatim — the row's ball) — now also the travel dot's twin
   track (finding 4): play sweeps the curve dot and a ramp marker on one clock.
2. **The stage**: the curve well at full row width (container-composed, square-fit, flat
   well material — findings 2+3), stroking the interval's own ink (finding 8), with the
   icon-led play ghost seated on its corner (finding 1) and the mode pill (Curve|Steps)
   floating quiet above it.
3. **The rail**: one row — preset select with curve glyphs (finding 9) or n/term when
   stepped, then the single mono literal + copy (finding 6).

Closed rows: dots + glyph + name + chevron. No glass, no cartoon stamps inside the row; the
pane plate keeps the only full shadow. Light and dark ride the SAME paper register (finding
3 kills the two-system split). Every motion PRM-gated at the source.

## Demo-half cures vs the L7 packet amplification

| # | Finding | Owner | Vehicle |
|---|---|---|---|
| 1 | play-button blob (R8-17) | producer | **L7 re-affirm** + dist cite (`dist/easing.js:424`); icon-led reshape rider |
| 2 | inverted stage / letterbox | producer | **ASK-NEW**: container-query composition + square-fit canvas law |
| 3 | cartoon rungs inside Z2 / dark split | joint | **ASK-NEW**: internal material tokens (`--easing-canvas-*` or `chrome` prop); demo seats wells flat |
| 4 | dot rest + loop + PRM | producer | **L7 amplify** (rows 2/3/5) with live rest evidence (`cx="1"` park) |
| 5 | regex-driven auto-trace | joint | **L7 amplify**: declarative `autoplay`/`playing` door; demo deletes the DOM-drive |
| 6 | three dialects / one curve | joint | producer: `preset?` in payload (one field); demo: one-literal law + named head |
| 7 | text-only closed rows | demo | specimen head anatomy (dots + glyph + name) |
| 8 | accent cacophony | demo | wire `--motion-accent` per row to the interval's own ink |
| 9 | glyph-less preset menu | producer | **L7 amplify** (row 4), T-17 grammar: micro-glyphs + family grouping |
| 10 | tabs pilling | producer | owned by t-search-tabs ASK packet (cross-cite only) |

The producer asks (1, 2, 3-half, 4, 5-half, 6-half, 9) fold into the T-wave glass-ui request
packet as the **EasingPicker v2 packet** — L7's six rows carried forward intact, plus the
two net-new structural asks (stage law, material tokens) and the one-field payload door. The
demo half (3-seat, 5-delete, 6, 7, 8) is a single `GradientEasingEditor` composition wave,
executable independently of the producer cut — the specimen head, one-literal law, and
accent wiring land against 4.2.0 as-is; the well seat and declarative autoplay land at the
adopt.

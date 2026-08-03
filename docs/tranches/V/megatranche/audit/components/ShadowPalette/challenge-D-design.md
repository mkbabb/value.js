# CHALLENGE-D · ShadowPalette — the design is flawed

Seat: CHALLENGE-D (design). Subject: `demo/palettes/browser/card/ShadowPalette.vue` (115 lines).
Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`)**, the model this seat was spawned with. The
declaration is explicit, not inherited.

## Verdict

**DEFECTIVE.** Twelve findings, three BLOCKER. The component is not wrong in its details; its
**premise** is void. Every design decision in the file is justified, in the file's own 40-line
header, by two claims that measurement falsifies:

1. that a shadow placeholder belongs on Extract's undeveloped state at all — the ratified
   `VISUAL-CONSTITUTION.md:198` says, of this exact route, *"the undeveloped state remains
   contextual, **not a giant shadow placeholder**"*; and
2. that this ghost and the `PaletteCardSkeleton` it morphs into share "ONE loading-ink recipe" —
   glass-ui `7.0.0` reads **none** of that recipe's seams, so at the moment work starts the plate
   goes **blank** in light and **inverts polarity** in dark.

The strongest single defect is **D-1**: the seat is unconstitutional and measured at **48% of the
Extract pane** against a ≤15% law, out-sizing and out-shadowing the protagonist it supports.

---

## Evidence base

| Kind | Source |
|---|---|
| Screenshots read | `audit/visual/shots/safari-{desktop,mobile}-{light,dark}/extract.png` |
| Live probes | `http://localhost:9000/#/extract` @ 1440×900, Playwright `browser_evaluate`, canvas-composited sRGB readback |
| Producer | `node_modules/@mkbabb/glass-ui/dist/glass-ui.css`, `.../components/skeleton/Skeleton.vue.d.ts`, v `7.0.0` |
| Canon | `docs/tranches/V/VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md` |
| Gate | `e2e/smoke/oracles/o9-shadow-palette.spec.ts` |

Measured colour table (canvas readback of the real computed backgrounds over the real ancestor
stack, `/#/extract`, 1440×900):

| block | light eff. sRGB | vs `bg-well` | dark eff. sRGB | vs `bg-well` | dark @ pulse trough |
|---|---|---:|---|---:|---:|
| well ground | `rgb(233,225,217)` | — | `rgb(66,55,47)` | — | — |
| `.shadow-seg` (100%) | `rgb(198,191,184)` | **1.406:1** | `rgb(88,78,71)` | **1.427:1** | 1.186:1 |
| `.shadow-block-name` (60%) | `rgb(212,205,197)` | 1.217:1 | `rgb(79,69,61)` | 1.237:1 | 1.112:1 |
| `.shadow-block-count` (40%) | `rgb(219,211,204)` | 1.143:1 | `rgb(74,64,56)` | 1.144:1 | 1.074:1 |
| `.shadow-swatch` (30%) | `rgb(222,215,207)` | **1.103:1** | `rgb(73,62,53)` | **1.112:1** | **1.048:1** |
| card hairline `--card-edge` | — | 1.28:1 | — | — | — |

Measured geometry (`/#/extract`, 1440×900, Extract pane `512×642`):

| object | rect | note |
|---|---|---|
| ImageDropZone (**the protagonist**) | `462×180` | `border-2 border-dashed`, **no** box-shadow |
| ShadowPalette @ k=5 | `462×148` | 82% of the stage |
| ShadowPalette @ k=12 | `462×214` | 119% of the stage — swatches wrap to 2 rows |
| ShadowPalette @ k=13 | `462×278` | **154%** of the stage — 3 rows |
| ghost + its caption @ k=13 | `308` tall | **48%** of the 642 px pane |
| developed `PaletteCard` meta row | `56` tall | ghost's is **40** |

---

## Findings

### D-1 · BLOCKER — the seat is unconstitutional: a giant shadow placeholder where the canon forbids one

`VISUAL-CONSTITUTION.md:198`, the **Extract** section verbatim:

> The image is the stage. The palette develops from it into a compact specimen plate; the
> undeveloped state remains contextual, **not a giant shadow placeholder**.

`:186`: *"**Request-bound skeletons exist only while real work is in flight.**"* `§3.1` table, Extract
row: *"undeveloped result stays contextual"*. `:202` (Mix): *"No shadow palette filler appears when
an operand is absent."*

ShadowPalette is a shadow placeholder, shown when **no** work is in flight, and it is not
contextual — it is the largest single object in the pane after the header:

- ghost `462×278` vs stage `462×180` → **154%** of the protagonist's height (k=13, measured).
- ghost + caption `308 px` of a `642 px` pane → **48%**. `VC §3` law 2 (`:28`): *"Empty secondary
  content occupies at most a narrow invitation tray (**≤15% of the stage**) or disappears."*
- `VC §3` law 8 (`:34`): *"Supporting fixtures do not compete with it through **equal size or equal
  shadow**."* The ghost carries a 3-layer cartoon stamp — measured
  `oklab(0.28 … /0.32) -2px 2px, /0.26 -3px 3px, /0.18 -4px 4px` (`ShadowPalette.vue:43`,
  `shadow-cartoon-sm`). The drop-zone stage carries **none**. The fixture out-shadows the
  protagonist on the exact axis the law names.
- `PROPORTION-AUDIT.md §5` law 1: *"A Card houses one bounded object/specimen. A page region, empty
  column, inner stage or **mere padding group does not become a Card by default**."* This Card
  houses the absence of a specimen. Law 5: decorative marks that are not data/status/labelled
  action/drag/focus are forbidden; the 5–16 swatch circles are exactly that.

**Reproduction:** `http://localhost:9000/#/extract` at 1440×900, no image loaded; drive the
`Number of colors` slider to 13. `document.querySelector('[data-slot="shadow-palette"]')
.getBoundingClientRect()` → `{w:462, h:278}`; the dashed drop zone → `{w:462, h:180}`.

**Cure (transposition, not patch):** delete the species. The undeveloped Extract state speaks the
one ratified true-empty invitation the rest of the app already speaks —
`VC:186`, *"A true empty invitation **content-hugs** its text/action and may carry one static,
aria-hidden `EmptyPaletteMark`: exactly three WatercolorDots plus the established dashes."*
`EmptyState` already ships it, and `o9` already asserts it at Mix / My Palettes / Browse.

---

### D-2 · BLOCKER — two "nothing yet" grammars render simultaneously, one screen apart

Read `audit/visual/shots/safari-desktop-light/extract.png`. The **left** pane's undeveloped result
is an opaque cold-neutral slab with a hard cartoon shadow. The **right** pane's undeveloped result,
at the same moment, in the same viewport, is the EmptyState dot trio — three dashed, airy,
translucent watercolor marks over `· EMPTY PLATE ·`. Same semantic. Opposite visual language.

The fork also runs **inside** the left pane. Directly above the ghost, the `ImageDropZone` states
"nothing yet" as `border-2 border-dashed border-primary/30 bg-primary/5`
(`ImageDropZone.vue:8,15`) — dashed, tinted, weightless. Directly below it the ghost states the
same thing as `bg-well` + solid hairline + cartoon stamp. Within one 512 px column the house has two
mutually exclusive answers to one question.

On mobile the incoherence is worse: `safari-mobile-light/extract.png` shows the ghost as the single
heaviest object on the screen — a big opaque grey plate under a pale dashed invitation. `VC §3`
law 6 puts mobile on one `stage→inspector→action` sequence; here the *absence* of a result reads as
the stage.

**Mechanism:** species proliferation. `VC §2` material hierarchy assigns the palette artefact to
the *Specimen well* tier — *"opaque/quiet neutral stage; **the specimen supplies color**."* With no
specimen there is nothing to supply colour, so the tier's own rule says the surface should be quiet.
It is instead the loudest thing in the pane.

**Cure:** as D-1 — one grammar for "nothing yet".

---

### D-3 · BLOCKER — the morph target's material inverted under glass-ui 7; the ink premise is void

`ShadowPalette.vue:27-34` and `:93-102` justify every colour choice by continuity with the sibling:
*"so ghost → skeleton → card stays **ONE plate developing in place**"*, reading *"the house's ONE
loading-ink recipe (`--skeleton-ink`, utils.css)"*. `utils.css:42-43` names the two consumers:
*"ShadowPalette + PaletteCardSkeleton (both `bg-well`)"*. `ExtractWorkbench.vue:93-97` calls the
swap *"KNOWN-IMMINENT skeleton IN PLACE (**same bones — a material change, not a layout jump**)"*.

glass-ui `7.0.0`'s `Skeleton` reads none of it. Its whole recipe, from `dist/glass-ui.css`:

```css
.skeleton[data-v-cd03d0b0]{isolation:isolate;border-radius:var(--radius-input);
  background:var(--muted);position:relative;overflow:hidden}
.skeleton[data-v-cd03d0b0]:after{content:"";background:linear-gradient(105deg,transparent 24%,
  color-mix(in oklab,var(--foreground) 10%,transparent) 48%,transparent 72%);position:absolute;inset:0}
@media (prefers-reduced-motion:no-preference){.skeleton[data-v-cd03d0b0]:after{
  animation:skeleton-scan-cd03d0b0 var(--duration-shimmer,2.4s) ease-in-out infinite;…}}
@media (forced-colors:active){.skeleton[data-v-cd03d0b0]{opacity:.18;background:canvastext}
  .skeleton[data-v-cd03d0b0]:after{display:none}}
```

Seam occurrence counts in the whole shipped bundle (`grep -c`):

| seam the house built | hits in glass-ui 7 |
|---|---:|
| `--skeleton-glass-bg` | **0** |
| `--skeleton-shimmer-delay` | **0** |
| `--skeleton-shimmer-tint` | **0** |
| `--pulse-aura-opacity-max` | **0** |
| `--animate-ambient-pulse-easing` | **0** |

`Skeleton.vue.d.ts` declares exactly one prop, `class`. The sibling's `surface="glass"` and
`:variant="blockVariant"` (`PaletteCardSkeleton.vue:43-44`) are dead attribute fall-through; its
`.skeleton-seg { --skeleton-glass-bg: … }` (`:110-112`) and its `--pulse-aura-opacity-max`
calibration (`:120-123`) are dead declarations. The skeleton renders on `var(--muted)`. No demo
rule overrides `.skeleton` (grep: 0 hits in `demo/styles/`).

Measured, both schemes, over the same `bg-well` ground:

| scheme | `--muted` (skeleton block) | vs well | `--skeleton-ink` (ghost block) | vs well |
|---|---|---:|---|---:|
| light | `rgb(233,225,217)` | **1.000:1** — *identical to the well* | `rgb(198,191,184)`, **darker** | 1.406:1 |
| dark | `rgb(31,28,25)`, **darker** | 1.469:1 | `rgb(88,78,71)`, **lighter** | 1.427:1 |

So the shipped behaviour at the exact swap the component was designed around:

- **light** — the user drops an image and the plate goes **blank**. The skeleton's blocks are the
  well, to four significant figures. Only the `::after` sheen (10% of `--foreground`) is visible.
  This is the born-RED-blank class of defect W44/D58 was cut to kill, reappearing one component over.
- **dark** — the blocks **invert polarity**: the ghost's ink sits *above* the well, the skeleton's
  *below* it. The plate flips from raised blocks to sunken blocks mid-interaction.

Motion inverts with it. The ghost pulses infinitely while *nothing is happening*; the skeleton's
sweep is a different species (2.4s translating gradient, no stagger, since `--skeleton-shimmer-delay`
is unread) and in light mode is nearly invisible on a block that matches its ground. The affective
reading is exactly backwards: **alive when idle, dead when working.**

**Reproduction:** `getComputedStyle(document.documentElement).getPropertyValue('--muted')` →
`light-dark(hsl(38 26% 95%), hsl(28 12% 11%))`; `--well-bg` resolves to the same `hsl(38 26% 95%)`
in light. Canvas-composite both → identical `rgb(233,225,217)`, contrast `1.000`.

**Cure:** the continuity argument cannot be repaired by re-tuning a token, because the seam it
depends on no longer exists. Either (a) delete the ghost (D-1's cure, which dissolves this finding
with it), or (b) if a loading register survives at all, it is **one** component consuming the
producer primitive as the producer ships it, with the ink expressed through a seam glass-ui
actually reads — and the ink question is relayed to glass-ui BH, not re-forked in demo.

---

### D-4 · MAJOR — the instrument lies about its output shape

`ShadowPalette.vue:19-22` states the seat's entire justification:

> ONE seat: the standing INSTRUMENT face — Extract's k-threaded undeveloped plate, where the ghost
> is **the instrument showing its output shape** before any image exists (the live-k leg: turn k and
> the plate re-segments).

The shape is wrong in four independent, measured ways.

1. **Strip proportion.** Ghost segments are `flex-1` — perfectly equal (`:55`). The developed strip
   is weight-proportional: `PaletteColorStrip.vue:52-70` sizes each segment by population with an
   8% floor, and `useExtractSession.ts:88` unconditionally attaches
   `weight: entry.source.population / total` to every extracted colour. An extracted strip is
   therefore **never** equal-width. The workbench even prints the dominant share as display type
   right above the card (`ExtractWorkbench.vue:122-128`, `"% of the image"`), so the very number
   the ghost flattens away is the card's headline.
2. **Meta row.** Ghost meta row measures **40 px** (`h-5` block + `py-2.5`). A live `PaletteCard`
   at the identical 462 px width measures **56 px**. A 40% error in the one row the ghost claims
   to pre-figure.
3. **Cartoon rung.** Ghost: `shadow-cartoon-sm`, measured `-2/2 @0.32, -3/3 @0.26, -4/4 @0.18`.
   Card: `cartoon-surface` + a `.cartoon-cast` child, measured `-3/3 @0.46, -5/5 @0.38, …`. The
   plate jumps shadow rungs at the swap — the opposite of "ONE plate developing in place".
4. **Hairlines and radius.** The ghost strip carries `gap-px` well-coloured hairlines (`:51`); the
   developed strip has no gap at all and carries `rounded-t-card`, which the ghost's strip lacks.

**Reproduction:** `/#/palettes`, measure any rendered palette card's strip/meta children; compare
with `/#/extract`'s `[data-slot="shadow-palette"]` children at the same width.

**Cure:** if a shape preview is genuinely wanted, it belongs where the shape is honest — as a
segmented tick register **on the k rail** (`ExtractControls.vue:20-34`), which already owns the
live-k affordance and already shows a gradient. A fake palette card is the wrong instrument for it.

---

### D-5 · MAJOR — a certified ink de-certified by per-instance overrides, then by the pulse

`utils.css:47-55` records the E1-R2 remediation: the old recipe *"was NOT certified against its
ground — in dark it landed ≈ `--well-bg` (probed ΔL 0.007, seg-vs-well **1.02:1**), collapsing the
ghost to a featureless slab"*, and the cure is a certified bounded tone-step at the **root**.

`ShadowPalette.vue:106-114` then re-dilutes that root recipe to 60 / 40 / 30 % alpha in its **own
scoped block** — the per-instance override of a root-level style that owner edict 5 forbids. The
certification does not survive the dilution:

- light: `1.217 / 1.143 / **1.103**:1`; dark: `1.237 / 1.144 / **1.112**:1`.
- `animate-pulse`'s 50% keyframe multiplies element opacity to `.5`, halving the effective alpha
  again → **1.048:1** for the swatches in dark, ~1.05:1 in light, for **half of every 2 s cycle**.

That is back at the 1.02:1 collapse the remediation existed to kill, in the same file that claims
it dead (`:99-100`: *"the dark seg-vs-well collapse (1.02:1) is dead"*).

The file also states, `:100-102`: *"The ladder steps fade INTO the plate by a color-mix step
(**never element opacity — D6**); the pulse's opacity swing is MOTION on top of the ink, not the ink
itself."* There is no rendered difference. `animate-pulse` sets `opacity` on the element; at any
instant the painted ink **is** ink × element-opacity. The distinction is prose, not pixels, and D6
is violated by the shipped animation.

**Reproduction:** canvas-composite each `.shadow-seg` / `.shadow-block-*` / `.shadow-swatch`
computed `background-color` over the resolved ancestor stack; repeat with `globalAlpha = 0.5` for
the pulse trough. Numbers in the table above.

**Cure:** one ink, one opacity, certified once at the root against its real ground, with a floor
asserted by the gate — or, per D-1, no ink at all.

---

### D-6 · MAJOR — "one wave" is false for more than half the k range

`:10-13` states the motion design: *"count equal-width muted cells, each `animate-pulse` on a
staggered `animation-delay` — a LIVING cascading shimmer that travels the plate (strip → meta →
swatches, **one wave**)"*.

From `:56`, `:63`, `:67`, `:77` the wave's total span is `0.22·count + 0.24` seconds. The pulse
period is **2.000 s** (measured `animationDuration: "2s"`, Tailwind's `pulse`). The wave therefore
wraps whenever `0.22·count + 0.24 ≥ 2` → **count ≥ 8**. The k slider runs **1…16**
(`ExtractControls.vue:28-29`), so the stated design holds on 7 of 16 stops.

Measured `animationDelay` on the last swatch: **2.88 s at k=12** (1.44 periods), **3.10 s at k=13**
(1.55 periods). At k=13 the last swatch is phase-locked with strip cell 10 (delay 1.08 s) — the
plate shows two to three simultaneous wavefronts and cells fire in visually arbitrary pairs. The
"one wave travels the plate" reading is destroyed exactly where the plate is busiest.

**Reproduction:** `/#/extract`, focus the k slider, `ArrowRight` to 13, then
`getComputedStyle([...document.querySelectorAll('.shadow-swatch')].pop()).animationDelay` → `"3.1s"`;
`.animationDuration` → `"2s"`.

**Cure:** a cascade whose span exceeds its period is not a cascade. Either normalise the stagger
against the period (`delay = i/(n) × period`) so the wave is a true single traverse at every k, or —
consistent with D-1 — remove the motion with the species.

---

### D-7 · MAJOR — motion is untokenized, un-housed, and outside the demo's declared vocabulary

`animate-pulse` resolves to `2s cubic-bezier(0.4, 0, 0.6, 1) infinite pulse` (measured). Neither the
duration nor the curve is a house token — not `--duration-fast/normal/slow`, not `--ease-standard`,
not any `--spring-*`. The stagger constants (`0.12`, `0.1`, `0.34`, `0.22`) are magic numbers
interpolated into per-element inline `style` objects (`:56`, `:63`, `:67`, `:76-78`), rebuilt on
every render — `2·count + 2` objects, up to 34 at k=16.

`animations.css:56-80` declares the demo's motion law: three named families, and *"a fourth name is a
defect (gate (a), R.W4 §Hard gate)"*. `pulse` is a fourth animation name, reached directly out of the
Tailwind theme, so its keyframes live in neither `demo/styles/animations.css` nor glass-ui — the
house has **no lever on it at all**. Contrast the sibling, which tunes only through named seams
(`PaletteCardSkeleton.vue:114-123`), and the `.stagger-children` utility, which is a tokenized,
PRM-gated, house-owned cascade (`animations.css:34-54`) — the correct idiom for exactly this effect,
already in the building, not used here.

Owner edict 6 says global keyframes live in `demo/styles/`. This one lives nowhere the project owns.

**Cure:** if the motion survives at all, it is a named house family in `animations.css` driving
tokenized duration/easing, with the stagger expressed as `--stagger-base` + `nth-child` like the
existing utility — not 34 inline style objects.

---

### D-8 · MAJOR — the forced-colors roster entry is semantically false, and the hand-roll forfeits a fallback the primitive ships

`foundation.css:658-694` declares the two-tier WHCM policy and names tier 1 precisely:

> **COLOR-SURFACE ROSTER** … the surfaces **whose whole PURPOSE is to show a color** — the actual
> content of a color tool — must survive WHCM's system-color substitution.

`.shadow-swatch` is on that roster (`:690`) with `forced-color-adjust: none`. It is an `aria-hidden`
placeholder that shows **no colour**; it is `color-mix(in oklab, var(--skeleton-ink) 30%,
transparent)`. The consequence under `forced-colors: active`:

- the plate (`bg-well`), `.shadow-seg`, `.shadow-block-name`, `.shadow-block-count` are tier 2
  (`auto`) → they adopt system colours and the ghost's identity dissolves;
- `.shadow-swatch` **alone** is pinned to its author colour. Custom properties are not forced, so it
  keeps a ~1.1:1 warm grey drawn over a *system* Canvas it was never calibrated against.

The only surviving element is the one that carries the least meaning, at the lowest contrast, on the
wrong ground. Meanwhile glass-ui 7's `Skeleton` — the primitive this component declines to use —
ships a real designed fallback: `@media (forced-colors:active){ .skeleton{opacity:.18;
background:canvastext} .skeleton:after{display:none} }`. Hand-rolling past the design system
(owner edict 4) costs exactly that fallback.

The same roster at `foundation.css:835` grants `.shadow-swatch` `print-color-adjust: exact
!important` — printing an idle Extract page deliberately burns 5–16 grey circles of placeholder ink.

**Coverage gap:** the visual matrix has **no** forced-colors capture of `/#/extract`.
`shots/forced-colors-desktop/` contains only `adminusers, blob, browse, gradient, picker`. This
state has never been looked at.

**Reproduction:** none run — the matrix lacks the capture and I did not add one. **Labelled
HYPOTHESIS** on the rendered result; the roster membership and the missing fallback are
CONFIRMED by file read.

**Cure:** `.shadow-swatch` leaves both rosters (it is not a colour-display surface), and the loading
register consumes the producer primitive so the producer's WHCM fallback applies.

---

### D-9 · MINOR — under reduced motion the k readout rests on a 1 px, 1.4:1 hairline

`:47-50` names the at-rest legibility mechanism: *"A hairline of the well ground between cells keeps
the segmentation legible AT REST (the live-k readout survives PRM stillness)"*.

Measured: `gap: 1px`; `.shadow-seg` vs well **1.406:1** (light) / **1.427:1** (dark). Under the
global guard (`animations.css:184-193` — `animation-duration: 0.01ms !important;
animation-iteration-count: 1 !important`, no fill-mode) the pulse completes instantly and the plate
settles static at peak ink, so those are the resting numbers. WCAG 1.4.11 asks 3:1 for graphical
objects required to understand content; this component's own charter says the strip carries the
live-k readout. A 1 px line at 1.41:1 does not carry it.

The claim is doubly weak in dark, where the header says the E1-R2 cure means *"the strip reads as
BLOCKS whether the plate is light or dark"* — at 1.427:1 with a 1 px separator, it reads as a slab
with faint scoring.

**Cure:** the honest k readout already exists — the numeric label at `ExtractControls.vue:15-17`.
The ghost should not be a second, weaker copy of it.

---

### D-10 · MINOR — the green oracle certifies the constitutional violation and tests none of the design

`o9-shadow-palette.spec.ts:125-166` asserts the ghost is **present at rest** on Extract and that
every strip cell pulses `infinite`. The gate therefore locks in the `VC:186` / `VC:198` violation:
a passing suite is now evidence *for* the defect.

What it does not measure: contrast (any state), geometry against the developed card, the ≤15%
proportion law, forced-colors, print. `assertPulsesLive` (`:99`) bounds duration only from below —
`expect(p.duration).toBeGreaterThanOrEqual(1)` — so D-6's aliasing is structurally unguardable by
this gate. The PRM leg (`:106-123`) asserts `duration < 0.1` and `iteration === "1"` and nothing
about whether anything remains legible.

**Cure:** when the species is retired the oracle re-points to the EmptyState invitation on Extract,
exactly as its own header describes the discipline (*"the oracle re-points, never deletes"*, `:8-9`)
and exactly as its other four tests already do for Mix / My Palettes / Browse.

---

### D-11 · MINOR — dead hooks and a dead seam

- `.shadow-palette` (`:43`) is declared and never consumed. `grep -rn "shadow-palette"` over
  `demo/ src/ e2e/` returns 4 hits: this class declaration, the `data-slot` beside it, and two
  oracle references — both to `[data-slot="shadow-palette"]`. A styling hook with no rule and no
  query, duplicating an attribute that already exists on the same element.
- `.skeleton-ink-register` also mints `--skeleton-shimmer-tint` (`utils.css:59`) as the "letter-L9
  producer seam". This consumer never reads it and glass-ui 7 has **0** occurrences of it. A seam
  documented as awaiting a producer that has since shipped without it.
- `overflow-hidden` on the root (`:43`) clips nothing: no child exceeds the plate.

---

### D-12 · MINOR — the component ships a promise it cannot keep, and `count` is unguarded

The plate is `aria-hidden="true"` (`:44`) and delegates **all** of its meaning to a caption it
neither owns nor can constrain (`ExtractWorkbench.vue:162-166`). The component's contract is
therefore unenforceable at its own boundary — and the host already breaks it: on mobile the caption
wraps and orphans its closing typographic dot onto a second line,
`· UNDEVELOPED PLATE — FEED IT AN / IMAGE ·` (see `shots/safari-mobile-light/extract.png`), so the
dot-delimited unit the caption's register depends on is visibly broken.

`count?: number` (`:85-89`) carries no floor or ceiling. `count = 0` renders an empty 40 px band over
an empty 12 px band inside a bordered, cartoon-shadowed card — a broken box. The component is
exported publicly (`demo/palettes/browser/index.ts:22`) and its only consumer's clamp lives in a
different file (`ExtractControls.vue:28-29`).

**Reproduction: NONE — HYPOTHESIS.** Extract's slider floor is `1`, so `count = 0` is unreachable
through the shipped UI. The caption orphan is CONFIRMED by screenshot.

---

## What is *not* wrong

Stated so the negative is proved, not assumed:

- **Vue 3.5 idiom (edict 7)** — `const { count = 5 } = defineProps<{...}>()` (`:85-89`) is correct
  reactive props destructure. No stale-read risk: no `defineModel`, no template ref.
- **`verbatimModuleSyntax` (edict 8)** — vacuously satisfied; the SFC has zero imports.
- **God modules (edict 1)** — 115 lines, one job, no shared-dir invention. The file is small and
  focused; its problem is that the job should not exist.
- **Legacy code (edict 2)** — no shims, no dual paths, no aliases. The retired dashed-edge species
  was genuinely deleted, not kept behind a flag.
- **Layout-forcing animation** — `animate-pulse` animates `opacity` only. Composited; no layout,
  no paint of the plate. This is the one part of the motion that is correct.
- **Announcement semantics** — `aria-hidden`, no `role="status"`, no "Loading" label. Given that
  nothing is loading, this is the right call; it is the *rendering* of a loading grammar under
  those semantics that is the defect, not the semantics.

---

## Family grouping

| family | findings | one cure |
|---|---|---|
| **The species should not exist** | D-1, D-2, D-10 | Retire ShadowPalette; Extract's undeveloped state speaks the ratified EmptyState invitation; re-point O-9. |
| **The continuity premise is void** | D-3, D-4 | The ghost→skeleton→card identity cannot be repaired in demo — the seam is gone. Relay the ink/variant question to glass-ui BH; consume the primitive as shipped. |
| **Ink certified once, broken thrice** | D-5, D-9 | One ink, one opacity, certified at the root against its real ground, floor asserted by the gate. |
| **Motion outside the house** | D-6, D-7 | Named house family in `animations.css`, tokenized duration/easing, period-normalised stagger. |
| **Modality states never designed** | D-8, D-12 | Leave the colour-surface rosters; capture `/#/extract` in the forced-colors matrix; the invitation owns its own text. |

## Recommended disposition

**REMOVE.** Not TIGHTEN. Every finding above is downstream of one decision — that Extract's
undeveloped state should render a full-fidelity fake palette card. `VISUAL-CONSTITUTION.md:198` had
already ruled on that decision before this component was written. Retiring the species discharges
D-1, D-2, D-3, D-4, D-5, D-6, D-7, D-9, D-11 and D-12 at once, and reduces D-8 to a two-line roster
edit. The only information the ghost carried — live k — has an honest home on the k rail, which
already owns the affordance.

Blast radius of the removal: `ShadowPalette.vue` (delete), `demo/palettes/browser/card/index.ts:7`
and `demo/palettes/browser/index.ts:22` (exports), `ExtractWorkbench.vue:158-167` +`:199` (the
`v-else` branch becomes the EmptyState invitation), `foundation.css:690,835` (roster rows),
`o9-shadow-palette.spec.ts:125-166` (re-point). `utils.css`'s `--skeleton-ink` block survives only
as long as `PaletteCardSkeleton` does — and D-3 says that component needs its own reckoning with
glass-ui 7 regardless.

**No source edits land from this seat.** This report is the deliverable.

# CHALLENGE-D — `demo/workbenches/generate/GenerateControls.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]` — the tier
explicitly declared at spawn. Declaration matches observation. No inherited or undeclared seat.

## Seat, subject, and coordination boundary

| Field | Value |
|---|---|
| Axis | CHALLENGE-D — the design is flawed; find how |
| Subject | `demo/workbenches/generate/GenerateControls.vue` (311 lines) |
| Sole consumer | `demo/workbenches/generate/GeneratePane.vue` |
| Route | `/#/generate` |
| Repo state | branch `tranche-u`, HEAD `c654824e` |
| Pinned SHA-256 | `4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6` |
| Measured SHA-256 | `4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6` |
| Drift | **NONE.** The CARRY-LEDGER §D glass BJ W4 pin holds exactly. |

```
$ shasum -a 256 demo/workbenches/generate/GenerateControls.vue
4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6  demo/workbenches/generate/GenerateControls.vue
```

**No source edit is proposed or landed by this seat.** Every cure is authored `BLOCKED-ON-GLASS-V8`
with its exact release condition (§8).

### This is pass 3

Two prior CHALLENGE-D passes exist and are preserved verbatim beside this file:

- `challenge-D-design.2026-07-24-pass.md` — pass 1
- `challenge-D-design.2026-07-27-pass2.md` — pass 2 (22 defects, D-1…D-22)

**Neither is superseded.** Pass 2 in particular is corroborated on every finding I re-checked.
This pass exists because pass 2, for all its thoroughness, **never rendered the component's second
half.** Its eleven frames are all of the closed, resting plate. The `Select` dropdowns — twenty
option rows, twenty preview strips, roughly a third of the component's markup and the entirety of
its stated design thesis — were read as source and declared, at `§7.6`:

> *"**The preview-truth law genuinely holds.** … **This is the best-designed thing in the file** and
> should survive the transposition intact."*

I opened them. Both, at both viewports, at count 5 and count 12, and captured the first frames of
that state that any pass has produced. **The law does not hold**, for two independent measured
reasons, and the material it is painted on defeats it a third time. That negative result is now a
BLOCKER.

Probe budget: 4 headless WebKit runs, 1 `vite-node` run against the real generation core, 6 frames.

---

## 1. Verdict

**DEFECTIVE.**

Pass 2's strongest defect stands unchallenged (the specimen cannot deliver a colour to anyone). This
pass adds a second, independent one of the same magnitude, and it is the exact thing pass 2 nominated
as the file's best idea:

> **The preview that justifies the whole instrument is unreadable, incomplete, and painted over the
> thing it exists to be compared against.** The `SelectContent` is a `0.7488`-alpha surface with
> `backdrop-filter: blur(11px) saturate(1.6)` — a veil that *amplifies the chroma it fails to hide*
> by 60% — and it covers **58.9% of the specimen plate at 1440 and effectively all of it at 390**.
> So each seed-exact preview chip is composited over an arbitrary band of the current palette, and
> the current palette is hidden while you browse the candidates. The comparison the previews exist to
> enable is the one comparison the composition makes impossible. And the chips are not exact anyway:
> `PreviewStrip` caps at 7 segments, so at counts 8–12 — five of the twelve reachable values — each
> row shows 7 of *n* stops behind a mask fade while `:87-93` insists it shows "the EXACT palette
> selecting it yields … 5-12 library generations".

Underneath that sits the same root pass 2 named — the comments are the design document and the design
document is out of date — but pass 3 finds the failure is not only *historical*. Three of the new
defects (D3-4, D3-5, D3-12) are cases where **the model and the instrument disagree with each other
right now**, in ways no comment ever claimed and no canon ever ruled: a cardinality slider that
silently rerolls the entire palette under five of six harmonies and preserves it under the sixth; the
constitution's *reserved* spectral meniscus applied to an integer domain; a harmony dropdown whose six
options collapse to four distinct previews at `count = 1`.

---

## 2. What this pass adds over pass 2

| # | New finding | Kind | Where pass 2 stood |
|---|---|---|---|
| 1 | `SelectContent` is a `0.7488` / `blur(11px) saturate(1.6)` veil covering **58.9%** of the plate (desktop) and ~100% (mobile); the preview chips composite over the specimen's own bands | **new BLOCKER** | never rendered the state |
| 2 | You cannot compare a candidate to the incumbent — the popover hides the current palette | **new MAJOR** | — |
| 3 | The truth law is **false for 5 of 12 reachable counts** — `STRIP_SEGMENT_CAP = 7`; measured `truncated: 6/6` at count 12 | **new MAJOR** | `§7.6` asserted the claim "is true" |
| 4 | The count axis is **destructive for 5 of 6 harmonies, stable for 1** — golden 5/5, analogous 1/5, the rest 0/5 | **new MAJOR** | — |
| 5 | `variant="spectrum"` — the constitution's *reserved* spectral meniscus on an integer domain | **new MAJOR** | D-8 cited §5 "no new slider mechanics", not §1's reservation |
| 6 | Nested cartoon shadows cast in **opposite** horizontal directions (`8px 8px 0` vs `-2px 2px 0`), two different shadow systems | escalates D-13 | "two nested hard offset shadows are visible" |
| 7 | The plate declares recession (`bg-well`) and elevation (caster) simultaneously; inner radius **equals** outer radius (16 px = 16 px) | **new MAJOR** | D-13 noted the tier clash, not the radius |
| 8 | Action seats out-mass the specimen at **both** viewports — 8385 vs 8000 px² (1440), 7885 vs 6486 px² (390) | **new MAJOR** | D-4 argued duplication, not proportion |
| 9 | The same string changes typeface crossing the control boundary — option `Vibrant` Fraunces, trigger `Vibrant` Plus Jakarta | **new MAJOR** | D-12 judged the option font against the matrix only |
| 10 | Option descriptions and preview chips have **no AT representation at all** — accname is bare `"Vibrant"`, no `aria-describedby` | **new MINOR** | — |
| 11 | `user-select: all` returns `"seed: 4469bd4e"` — the label with the value | sharpens D-19 | "provenance … can be copied and never used" |
| 12 | At `count = 1` the harmony dropdown collapses **6 rows → 4 distinct previews**; three are byte-identical | **new MINOR** | D-16 covered the plate, not the previews |
| 13 | The plate's padding is hand-numbered, not the P122 title-gap/section-gap ladder | new INFO | — |

Plus four **negative** results, two of which falsify hypotheses I formed and one of which is new
positive evidence (§7).

---

## 3. Visual truth

Frames read: the four tracked Safari captures
(`audit/visual/shots/safari-{desktop,mobile}-{light,dark}/generate.png`) and six captured here in
`frames-D3/`.

> **Frame honesty note.** `frames-D3/desktop-preset-open.png` carries a
> `DEV MISCONFIGURED — RUN \`npm run dev\`` badge at top-right. That is the dev server's own
> environment banner, **not** a component defect; it is absent from the tracked Safari captures.
> Disclosed so the frame reads honestly. Nothing else in the frame is affected by it.

### 3.1 The dropdown is a window onto the thing it is supposed to replace

`frames-D3/desktop-preset-open.png`. The preset list is open. Reading down the option column you can
see, *through* the rows: the `Generate` H1; the pane description; the specimen strip's cyan and
magenta bands; the words `Generated Palette`; the `Regenerate` button; and two WatercolorDots.

- The **Pastel** row's preview chip sits on the strip's magenta band.
- The **Warm** row's chip sits on a green field.
- The **Earth** row's chip and description overlap two dots.

Measured (`probe-D3-final.mjs`):

```json
"contentBg":       "oklab(0.955861 0.009528 0.029646 / 0.7488)",
"contentBackdrop": "blur(11px) saturate(1.6)",
"overlapPctOfPlate": 58.9
```

`saturate(1.6)` is the detail that turns a legibility annoyance into a correctness failure. The veil
does not merely transmit 25% of what is behind it — it transmits it **60% more saturated than it
actually is**. A colour-preview chip painted at 74.88% opacity over a chroma-boosted magenta band is
not the colour it claims to be, and neither is the description text's contrast.

`VISUAL-CONSTITUTION.md:15` (§2 material table), the *Instrument veil* row, verbatim:

> *"controls genuinely over live color | **denser neutral veil** with named alpha/clarity levers; no
> drop shadow"*

`0.7488` alpha with a saturation *boost* is the exact opposite of a dense neutral veil. This is
producer material (`glass-menu-*`), so the cure is not a consumer edit — but the **siting** is the
consumer's: this component chose to place a translucent instrument veil directly over the most
chromatic 460 × 40 px region on the route.

### 3.2 The comparison the previews exist for is the one you cannot make

`frames-D3/mobile-harmony-open-count12.png`. At 390 the popover covers the strip, the name, the
count badge, all three verbs, every dot and the seed line. The plate is gone.

The design argument at `:87-93` is that a lying preview is worse than none, so each row previews
byte-exactly. Granted. But a preview is an instrument of **comparison** — *is this candidate better
than what I have?* — and the composition hides what you have for the entire duration of the choice.
You can compare candidates to each other and never to the incumbent. At 1440 you retain 41.1% of the
plate, which is worse than nothing: you see part of the current palette and must hold the rest in
memory.

### 3.3 At `count = 12` the chips stop telling the truth, quietly

Same frame. Six harmony rows, each chip showing seven segments with the last faded. The palette has
twelve. Measured (`probe-D3-dropdown.mjs`, mobile arm, after driving the slider to 12):

```json
"COUNT12": {"label":12,"slider":"12"}
"HARMONY DD @12": {"stripSegments":[7,7,7,7,7,7],"truncated":6}
```

`PreviewStrip.vue:25` — `const STRIP_SEGMENT_CAP = 7;` — and `:48-51`, the truncation fade. The
producer chip is honest about itself: its own docblock calls this *"HONEST truncation … reading as
'continues', never as a complete palette it isn't."* It is the **consumer's** claim that is false.

And the honesty degrades with size: the chip is measured `41.9 × 14` px, so seven segments are 6 px
each, and the `mask-image: linear-gradient(90deg, black 20%, transparent 95%)` fade is applied to a
6 px sliver. At that scale the "continues" signal is a hairline. Look at the **Analogous** row in the
mobile frame — three purple bands and a soft edge. Nothing about it reads as "5 of my 12 colours are
not shown."

### 3.4 The count rail is a hue spectrum wearing a palette's clothes

Bottom of the same frame, at count 12: a continuous rainbow smear, visually indistinguishable from a
generic hue rail. Measured `sliderVariant: "spectrum"`.

At count 5 (tracked desktop-light frame) the ramp does track the palette — green, lavender, gold,
cyan, magenta — but every boundary is a muddy sRGB transit. At count 12 the transits outnumber the
stops and the rail degenerates into "spectrum". The instrument's depiction of its own state converges,
as the state gets richer, on a picture that carries no state at all.

### 3.5 Two light sources, one composition

Measured shadow chain from the plate outward (`probe-D3-shadow.mjs`):

| Element | `box-shadow` | Implied light |
|---|---|---|
| `SECTION[data-generate-plate]` | `-2px 2px 0`, `-3px 3px 0`, `-4px 4px 0` (α 0.32 / 0.26 / 0.18) | upper **right** |
| `DIV.glass-resting.card` (the pane `Card`, its immediate ancestor) | `8px 8px 0` (α 0.8) | upper **left** |

Both are zero-blur cartoon casters. In a hard-shadow idiom the offset **is** the light-source
declaration — it is the only thing the idiom says. Two contradictory declarations, one DOM level
apart, 462 px wide. Visible in the tracked desktop-light frame: the outer card's caster runs down its
right edge; the plate's runs down its left.

They are also two different *systems*: one monolithic 8 px caster at α 0.8, one three-layer 2/3/4 px
ladder at α 0.32/0.26/0.18. Not a token drift — two unrelated shadow vocabularies nested.

### 3.6 Dark mode

`safari-mobile-dark/generate.png`. The chrome is correctly on the restrained neutral pole — no seed
tint, satisfying `VISUAL-CONSTITUTION.md:21` (pass 2's negative #8; I confirm it). What dark mode
exposes that light mode hides is **proportion**: with the plate reduced to a flat taupe field, the
`Regenerate` button becomes unambiguously the largest, heaviest, highest-contrast object inside the
plate — larger than `Generated Palette`, competing directly with the route H1. The commit verb
out-ranks both the specimen and the identity. §8 measures this.

---

## 4. Defects

Numbered `D3-*` to keep pass 2's `D-*` addressable. Where a finding escalates a pass-2 row I say so.

### D3-1 · BLOCKER · The preview surface amplifies and transmits the specimen it is drawn over

**Evidence.** `probe-D3-final.mjs`, WebKit 1440 × 900, DPR 2, preset list open:

```json
{ "contentBg": "oklab(0.955861 0.009528 0.029646 / 0.7488)",
  "contentBackdrop": "blur(11px) saturate(1.6)",
  "rect": {"w":272,"h":384,"top":202.5,"bottom":586.5},
  "plateRect": {"w":462,"top":328.7,"bottom":548.1},
  "overlapPctOfPlate": 58.9,
  "visibleItems": 6, "totalItems": 10 }
```

At 390 the popover is `x 33 → 305` of a 390 px viewport and the plate is entirely behind it.

**Frames.** `frames-D3/desktop-preset-open.png`, `frames-D3/mobile-preset-open.png`,
`frames-D3/mobile-harmony-open-count12.png`. Every preview chip is composited over live palette
colour; several option rows overlap WatercolorDots.

**Why it is a design defect and not a taste call.** The chip's entire warrant (`:87-93`) is *byte
identity* — "the strip and the future selection are the same bytes". Byte identity of the CSS string
is worthless if the rendered pixels are `0.7488·chip + 0.2512·(1.6× saturated magenta)`. The
component's own thesis is defeated by the material it chose to render on.

`VISUAL-CONSTITUTION.md:15` — instrument veils over live colour require a **denser neutral** veil.
`VISUAL-CONSTITUTION.md:19` — *"Glass earns its blur by revealing live content; otherwise it is a
neutral well."* Here the blur reveals live content that is pure noise with respect to the decision
being made.

**Falsifies pass 2 §7.6.** The preview-truth law does not hold in situ. It holds in the DOM.

**Reproduction.** `node probe-D3-final.mjs` (see §9).

**Attribution.** The alpha/blur/saturate are producer values on `glass-menu-*`. The *siting* — a
translucent veil deliberately positioned over the route's most chromatic region — is the consumer's
composition. Both halves are named in §8.

---

### D3-2 · MAJOR · The incumbent is hidden for the duration of the comparison

**Evidence.** `overlapPctOfPlate: 58.9` (1440); popover spans `33 → 305` of 390 (mobile), plate spans
`33 → 357` — the plate's visible remainder is a 52 px strip of its right edge.

**Failure scenario.** A user on a phone has a palette they half-like. They open Harmony to see whether
Triadic is better. The palette they are judging against vanishes. They pick Triadic, the popover
closes, the palette is replaced — and they now have no way to see the one they had, because the seed
is unrestorable (pass 2 D-19) and Regenerate draws a new one.

**Canon.** `VISUAL-CONSTITUTION.md:194`: *"Preset and harmony expose truthful previews"* — and §3.1's
three-region composition (*specimen stage · model inspector · commit instrument*) exists precisely so
the inspector sits **beside** the stage, not on top of it. A popover-based inspector cannot satisfy a
three-region chassis on a 390 px viewport; the region has to be resident.

**Cure direction.** The inspector regions are permanently mounted rows inside `InstrumentChassis` (see
pass 2 D-7) with the preview strips inline in the row, so preset and harmony are chosen against a
visible specimen. This subsumes D3-1 by deleting the overlay entirely.

---

### D3-3 · MAJOR · The truth law is false for five of the twelve reachable counts

**Evidence.** `PreviewStrip.vue:25` — `const STRIP_SEGMENT_CAP = 7;`

Measured live, mobile arm, slider driven to 12:

```json
"HARMONY DD @12": { "stripSegments": [7,7,7,7,7,7], "truncated": 6 }
```

Measured against the real generation core (`probe-D3-count-stability.mts`, `vite-node`):

```
count= 5  palette stops=5   strip shows=5   hidden=0
count= 7  palette stops=7   strip shows=7   hidden=0
count= 8  palette stops=8   strip shows=7   hidden=1
count=12  palette stops=12  strip shows=7   hidden=5
```

**The claim.** `:87-93`, verbatim:

> *"each option row previews the **EXACT** palette selecting it yields … 10 rows × **5-12** library
> generations is sub-millisecond. **A preview that lies** (random per open, or a canned swatch) **is
> worse than none.**"*

The comment names the 1–12 domain and asserts exactness across it. The chip is exact on 1–7 and
partial on 8–12. Five of twelve reachable values — 42% of the domain — including the entire upper
half where presets and harmonies diverge *most*, because a 12-colour golden ramp and a 12-colour
triadic ramp differ chiefly in their tails.

**Not the producer's fault.** `PreviewStrip.vue:11-19` declares the cap as a named taste knob and
implements an honest fade. The defect is a consumer that adopted a capped primitive for an uncapped
claim and never reconciled the two — and then wrote six lines of law asserting the reconciliation.

**Falsifies pass 2 §7.6** a second time, on textual grounds independent of D3-1.

---

### D3-4 · MAJOR · The count axis rerolls the palette under five of six harmonies and preserves it under the sixth

**Evidence.** `probe-D3-count-stability.mts` against the real `generatePalette`, preset `vibrant`,
seed fixed, measuring how many of the five colours at `count = 5` survive at `count = 6`:

```
harmony              | n=5 -> n=6 : prefix colours preserved (of 5)
golden               | 5/5   STABLE
analogous            | 1/5   DESTRUCTIVE
complementary        | 0/5   DESTRUCTIVE
triadic              | 0/5   DESTRUCTIVE
split-complementary  | 0/5   DESTRUCTIVE
random               | 0/5   DESTRUCTIVE
```

Triadic, printed in full:

```
n=5: oklch(59.68…% … 91.68deg) oklch(73.81…% … 207.01deg) oklch(65.62…% … 332.86deg) …
n=6: oklch(68.35…% … 91.68deg) oklch(64.64…% … 207.01deg) oklch(77.52…% … 332.86deg) …
```

The **hues** survive; every **lightness and chroma** changes, because `generateHues` consumes a
harmony-dependent number of `rng()` draws before the `hues.map()` loop draws L and C
(`generate-color.ts:98-145` vs `:220-228`). Under `golden` the switch arm consumes zero draws, so the
stream stays aligned and the prefix is stable. Under the other five it does not.

**Why this is a design defect, not a maths curiosity.** The instrument presents one slider labelled by
a bare integer. Under the default harmony it means *add a colour*. Under five of six it means *reroll
everything with n colours*. The meaning of the control is conditioned on the value of an unrelated
control, and nothing — no label, no unit, no description, no comment — says so. A user who drags from
5 to 6 to "add one more" loses the five they had, four times out of five, with no undo, no seed entry
(D-19) and no history.

It is also **a second regeneration path hiding inside a cardinality control**, which the canon
addresses by name. `VISUAL-CONSTITUTION.md:194`:

> *"**Regeneration names which model inputs stay fixed and how the seed changes.**"*

Pass 2 read that clause against the `Regenerate` button. It binds the count axis at least as hard,
because the count axis regenerates *without announcing that it is a regeneration at all*.

**Compounding.** The ramp under the slider is the palette (`:65-73`), so dragging count makes the
track beneath your own thumb rewrite its colours at every step. The instrument's state display
thrashes as a direct consequence of manipulating it.

**Reproduction.** `npx vite-node probe-D3-count-stability.mts` (§9). Live corroboration:
`probe-D3-axis.mjs` drives the real slider 5 → 6 in the browser at the default harmony (`golden`) and
measures `survived: 5 / 5`, matching the pure-core result for that arm.

---

### D3-5 · MAJOR · The reserved spectral meniscus, applied to an integer domain

**Evidence.** `:299` — `variant="spectrum"`. Measured on the rendered control:

```json
{ "sliderVariant": "spectrum",
  "track":  {"w":296,"h":24},
  "range":  {"w":107.6,"h":24}, "rangeBg": "none",
  "thumb":  {"w":12,"h":24}, "thumbVal": "5" }
```

**Canon, `VISUAL-CONSTITUTION.md:9` (§1), verbatim:**

> *"The signature risk is the **spectral meniscus**: a continuous liquid-color rail **reserved for
> genuinely chromatic continuous domains—Picker and Gradient**."*

The count domain is the integers 1…12. It is neither chromatic nor continuous. The component applies
the constitution's named signature risk to the one axis on the route that most clearly does not
qualify, and reinforces it with a hand-rolled `linear-gradient(to right, …)` underlay (`:65-73`,
`:292-296`).

This is **prior to** pass 2's D-3 (sRGB chroma loss at the midpoints). D-3 says the interpolation is
wrong. D3-5 says there should be no interpolation: rendering a discrete five-member set as a
continuum asserts that the colours *between* the members are members. They are not. Fixing the
interpolation hint to `in oklch` would make the lie prettier.

**Second half — the axis has no value semantic.** `slider-range` is geometrically correct
(`107.6 / 296 = 36.4% = (5−1)/(12−1)`) and optically absent (`background-image: none`). The
consequence is visible in every tracked frame: the track is **100% painted at every value**, so the
only value cue is a 12 px thumb, and the paint actively implies *full*. Pass 2's D-8 measured the
transparent range; the design statement — *a fully painted track reads as maximum* — is the part that
matters and is new.

`VISUAL-CONSTITUTION.md:104` requires the one domain-neutral axis composition with *"a color-bearing
**or neutral** track chosen by semantics"*. The semantics here select neutral.

---

### D3-6 · MAJOR · Two nested cartoon casters declare opposite light sources

**Evidence.** `probe-D3-shadow.mjs`, full ancestor shadow chain:

```json
[ { "tag":"SECTION", "cls":"rounded-card border border-card-edge bg-well shadow-cartoon-sm min-w-0",
    "shadow":"… -2px 2px 0px 0px, … -3px 3px 0px 0px, … -4px 4px 0px 0px", "radius":"16px" },
  { "tag":"DIV", "cls":"glass-resting card rounded-card text-card-foreground …",
    "shadow":"color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px", "radius":"16px" } ]
```

Negative x-offset = shadow to the left = light from the right. Positive = the reverse. One DOM level
apart. Both zero-blur.

Also two vocabularies: a single 8 px caster at α 0.8, and a 2/3/4 px three-layer ladder at
α 0.32/0.26/0.18. There is no reading under which both are the same design system's `sm` and `md`.

**Escalates pass 2 D-13**, which observed *"two nested hard offset shadows are visible in every tracked
desktop capture"* but read them as duplication. Duplication is the lesser half; the direction reversal
is a material contradiction, and it is the more legible one — the eye reads light direction before it
counts shadows.

**Canon.** `VISUAL-CONSTITUTION.md:186` — *"not cartoon casters stacked within casters"*;
`PROPORTION-AUDIT.md` PR-05 — *"Dividers, **caster shadows** and corner marks repeat a boundary →
REMOVE"*, whose §5 clause is binding on workbenches: *"every P122 workbench uses boundaries
`[]`/reserve `none`."*

---

### D3-7 · MAJOR · The plate declares recession and elevation at once, and wears its parent's radius

**Evidence.** Measured: `plateBg: oklab(0.913299 0.005463 0.013024)` (the `bg-well` token),
`plateShadow` a three-layer cartoon caster, `plateRadius: "16px"`, ancestor `Card` `radius: "16px"`,
`plateW: 462`, `stripW: 460`, `plateOverflow: "visible"`.

**Two independent defects on one element.**

**(a) Tier contradiction.** `VISUAL-CONSTITUTION.md:15`, *Specimen well* row: *"image, curve, palette
or code artifact | **opaque/quiet neutral stage**; the specimen supplies color."* A well is a recessed
stage. A hard drop caster is an elevation signal. The plate says *I am sunk into the surface* and
*I float above the surface* simultaneously. `:19` — *"One surface has one tier. **An inner card is not
automatically another pane of glass.**"*

**(b) Non-concentric radii.** The plate's `border-radius` is `16px`; its containing `Card`'s is also
`16px`. Concentric nesting requires `inner = outer − inset`; with the Card's `px-4 sm:px-6` padding the
inner radius should be ~`16 − 16 = 0` … `16 − 24 < 0`, i.e. square. A 16 px inner radius inside a 16 px
outer radius at a 16–24 px inset reads as two parallel arcs whose gap pinches at the corner — the
classic tell of a container that was styled from a token rather than from its position.

**(c) A geometric consequence, visibility unproven.** Outer radius 16 px minus the plate's 1 px border
gives an inner contour radius of **15 px**; the strip child carries `rounded-t-card` = **16 px** and
the plate does not clip (`overflow: visible`, deliberately, per `:126-128`). The child's corner arc is
therefore 1 px flatter than the hole it sits in at both top corners. *That arithmetic is measured. Whether
it produces a visible hairline crescent of `bg-well` after antialiasing is a **hypothesis** — I did not
sample pixels at the corner.*

---

### D3-8 · MAJOR · The action seats out-mass the specimen, at both viewports

**Evidence.** Painted areas, measured (`probe-D3-final.mjs`, `probe-D3-axis.mjs`):

| Viewport | Regenerate | Save | Copy | **verbs Σ** | 5 dots Σ | strip | plate |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1440 | 5793 | 1296 | 1296 | **8385** | **8000** | 18400 | 101387 |
| 390 | 5281 | 1296 | 1296 | **7885** | **6486** | 12880 | 68723 |

Three buttons occupy more pixels than the five colours they operate on. At 390 they occupy 22% more.

**Canon.** `VISUAL-CONSTITUTION.md:194`, closing sentence: *"The generated palette is a draft specimen,
**not a flat strip plus unrelated buttons**."* Measured, it is a flat strip plus buttons that outweigh
it. `PROPORTION-AUDIT.md` §1: *"Every element earns its scale … from its job relative to the local
protagonist."* The protagonist is the palette.

**Compounding — the commit region bisects the specimen.** Reading order down the plate is: strip
(colour) → name + count → **three verbs** → dots (the same colour again) → seed. The action row is
sandwiched between two depictions of the same data. §3.1's ordering (`specimen → inspector → commit`)
is not merely inverted (pass 2 D-7) — the commit region physically splits the specimen stage in half.

**Dark mode makes it unmistakable** (§3.6): with the plate reduced to a neutral field, `Regenerate` is
the heaviest object in the composition.

---

### D3-9 · MAJOR · The same word changes typeface as it crosses the control boundary

**Evidence.** Measured in one probe run, one viewport, one control:

| Seat | Family | Size | Weight |
|---|---|---|---|
| `SelectItem` name span (`:240`, `:270`) | `Fraunces, "Fraunces Fallback", serif` | 14px | 400 |
| `SelectTrigger` value (`:224`, `:258`) | `"Plus Jakarta Sans", … system-ui, sans-serif` | 14px | — |
| `SelectItem` description (`:246`, `:275`) | `"Plus Jakarta Sans", …` | 11px | — |

Visible in `frames-D3/mobile-harmony-open-count12.png`: the option **Golden** is set in a serif; the
trigger **Golden**, 600 px below it in the same frame, is set in a sans. Choosing an option makes the
option's own name change font.

**Why this is separate from pass 2's D-12.** D-12 judged the option font *against the closed type
matrix* (`PROPORTION-AUDIT.md` §2.1: *"Dropdown options remain Plus Jakarta Sans `text-small` control
copy and non-bold"*) — a canon violation. D3-9 is a defect **independent of which font the matrix
prefers**: whatever face is chosen, a control must render the same string the same way on both sides
of its own selection boundary, or the trigger stops reading as an echo of the choice. Fixing the
matrix violation happens to fix this; but a wave that "harmonised" by moving the trigger to Fraunces
would close D3-9 and worsen D-12, so both must be stated.

Third face in play: the `section-label` above each trigger is measured
`"Fira Code", … monospace` at `14.384px` — larger than the 14 px value it labels. So one field stacks
**three** typefaces vertically: Fira Code label → Plus Jakarta trigger → Fraunces option.

---

### D3-10 · MINOR · The descriptions and the previews have no accessible representation

**Evidence.**

```json
"itemAccName": ["VibrantHigh chroma, bold tones", …]        // raw textContent
"accNameNode": "Vibrant"                                     // resolved aria-labelledby target
"aria-labelledby": "reka-select-item-text-v-1-23"
"aria-describedby": null
"stripAriaHidden": "true"
```

I formed the hypothesis that the run-on `textContent` would become a run-on accessible name. **That
hypothesis is falsified** — the accname resolves through `aria-labelledby` to the item-text node only,
and is a clean `"Vibrant"`.

The falsification produces a worse finding. The accname is *only* `"Vibrant"`; there is no
`aria-describedby`; and the preview strip is `aria-hidden="true"` (correctly, `PreviewStrip.vue:41`).
So a sighted user chooses among ten presets using a colour chip **and** a description
(`"High chroma, bold tones"`), while an assistive-technology user chooses among ten bare adjectives
with no chroma information and no explanatory copy whatsoever. Ten of the file's ~60 lines of design
prose defend the chip; none notices that half the row is unreachable.

**Attribution.** The `#description` slot's ARIA wiring is producer-side (`glass-ui` `SelectItem` ships
the slot at `SelectItem.vue.d.ts` and does not associate it). BH relay in §8.

---

### D3-11 · MINOR · The one gesture designed to capture the provenance captures the wrong bytes

**Evidence.** `:212-214` sets `select-all` on a `<p>` whose text is `seed: {{ seedHex }}`. Measured:

```json
"seedUserSelect": "all",
"seedText":      "seed: 04f90ead",
"seedSelection": "seed: 4469bd4e"      // window.getSelection().toString() over the element
```

`user-select: all` selects the element's **entire** contents on one click. The user gets
`seed: 4469bd4e`, not `4469bd4e`.

**Sharpens pass 2 D-19.** D-19 established that the seed has no re-entry path, so provenance is a dead
end. D3-11 adds that even the dead end is mis-specified: the single affordance the design gave the
seed hands back a string containing its own label. If a seed input ever lands (the obvious D-19 cure),
the string this gesture produces will not paste into it.

---

### D3-12 · MINOR · At `count = 1` the harmony dropdown collapses from six options to four previews

**Evidence.** `probe-D3-count-stability.mts`, preset `vibrant`, seed fixed:

```
golden               oklch(69.948145818198% 0.14297360188 90.703672170639deg)
analogous            oklch(58.269751294283% 0.129022391355 66.73478467972deg)
complementary        oklch(58.269751294283% 0.119167138242 91.682930497918deg)
triadic              oklch(58.269751294283% 0.119167138242 91.682930497918deg)
split-complementary  oklch(58.269751294283% 0.119167138242 91.682930497918deg)
random               oklch(58.269751294283% 0.103072339324 215.253299782053deg)

distinct harmony previews at count=1: 4/6
```

Complementary, Triadic and Split-complementary are **byte-identical**. Three rows show the same chip
beside three descriptions promising different structure — *"Opposing hue pairs, 180°"*, *"Three
equidistant hues, 120°"*, *"Base + two flanking complements"*.

`count = 1` is reachable: `:301` `:min="1"`.

**Why it matters more than it looks.** `:87-93` argues a preview that lies is worse than none. A
preview that renders three differently-described options identically **asserts that they are
equivalent**. Under the component's own stated law that is the worst outcome available, and it occurs
at a value the slider reaches in one keystroke.

Bounding the defect honestly: at the default `count = 5` all six harmony previews are distinct
(`distinct harmony previews at count=5: 6/6`), and all ten preset previews are distinct even at
`count = 1` (`10/10`). The degeneracy is specific to harmony at the low end of the count domain — which
is exactly where a harmony *algorithm* has nothing to distribute.

---

### D3-13 · INFO · The plate's padding is hand-numbered, not the P122 gap ladder

`:143` `px-3 py-2.5` · `:198` `px-3 pb-1` · `:212` `px-3 pb-2.5 pt-1` · `:119` `gap-4` · `:219` `gap-3`
· `:220` `gap-1` · `:143` `gap-x-2 gap-y-1.5` · `:156` `gap-2` · `:198` `gap-1.5`.

Nine distinct spacing values, none of them a named relation.
`PROPORTION-AUDIT.md` §5.3: *"Header→headline uses **title gap**; headline→next semantic section uses
**section gap**."* §2.2 names the producer seam: *"BI P122 exposes `--instrument-title-gap` with the
tight φ² default."* §5.8: *"Real rendered relation wins over token intent"* — but a hand-numbered
ladder has no intent to test against in the first place.

---

## 5. State coverage

Pass 2's table is correct and I do not restate it. These rows are **new or revised** by this pass.

| State | Pass-2 verdict | Pass-3 verdict | Evidence |
|---|---|---|---|
| **dropdown open** | *not enumerated* | **BROKEN** — 58.9% / ~100% specimen occlusion; chips composited over live palette | D3-1, D3-2, `frames-D3/*-open*.png` |
| **dropdown open, count 8–12** | *not enumerated* | **BROKEN** — every chip truncated 7-of-n, fade sub-perceptual at 6 px/segment | D3-3 |
| **dropdown open, count = 1** | *not enumerated* | **BROKEN** — 3 of 6 harmony rows byte-identical | D3-12 |
| **dropdown scrolled** | *not enumerated* | **partial** — 6 of 10 preset rows visible; the 7th is half-cut, which is at least an honest overflow cue; no other affordance | `visibleItems: 6, totalItems: 10` |
| count-drag mid-interaction | *not enumerated* | **BROKEN** — palette rerolls under 5 of 6 harmonies; the track under the thumb rewrites itself | D3-4 |
| overflowing (popover) | — | **sound** — `docOverflowOpen: 0` at 1440 and 390; 272 px content correctly collision-fitted in a 390 px viewport | §7.3 |
| truncated (count label) | *not enumerated* | **sound** — `w-5` holds `"12"`: `scrollWidth 20 == clientWidth 20` | §7.2 |
| AT — option rows | *not enumerated* | **BROKEN** — accname `"Vibrant"` only; description and chip both unreachable | D3-10 |

---

## 6. Mechanism families

Pass 2's families A–E hold. This pass adds two, and both are *live disagreements* rather than
fossilised law — which is why they survived a pass that read the source exhaustively.

| Family | Findings | Mechanism |
|---|---|---|
| **F — the design was verified in the DOM, never in the frame** | D3-1, D3-2, D3-3, D3-9, D3-12 | Every one of these is invisible to source reading and obvious on sight. The preview chips are byte-correct and optically defeated; the option font is matrix-wrong *and* boundary-inconsistent; the harmony rows are distinct objects that render identically. The component's design prose reasons about values (`generatePalette` is pure, the bytes match) and never about pixels (what is behind the veil, how wide is a segment, do two of these look the same). |
| **G — one control, two meanings, conditioned elsewhere** | D3-4, D3-5, D3-12 | The count axis is simultaneously a cardinality input, an unannounced regeneration trigger whose destructiveness depends on the harmony select, and a chromatic continuum. Three semantics on one slider, no label, no unit, no statement. `VISUAL-CONSTITUTION.md:194`'s naming requirement exists for exactly this and was read against the wrong control. |

**The gestalt, restated.** Pass 2 concluded: *the comments are the design document, and the design
document is out of date.* True, and I found nothing to soften it. Pass 3 adds the sharper half:
**the design document was never checked against a rendered frame.** Sixty lines of law cite tranche
IDs, producer registers and byte-identity proofs; not one line cites a pixel. The two defects a
five-second look at the open dropdown would have caught — a preview painted over the specimen, and a
chip showing 7 of 12 — survived two exhaustive source audits because the file argues in the wrong
domain about a visual instrument.

**The cure is unchanged in shape and larger in scope.** Pass 2's transposition (house the route in
`InstrumentChassis`; move verbs to the Dock set; make the specimen one named thing; delete the stale
prose) also dissolves D3-1, D3-2, D3-8 and half of D3-9, because a resident inspector region has
nothing to be painted over and nothing to hide. What it does **not** dissolve, and what needs its own
owner, is family G: the count axis must be given one meaning, a neutral track, and a stated
regeneration contract.

---

## 7. Negative results

Reported so the positives carry weight. Pass 2's nine negatives all survived re-checking **except
§7.6**, which D3-1 and D3-3 falsify.

1. **The pin holds.** `shasum -a 256` matches the CARRY-LEDGER §D value exactly. No coordination-boundary drift.
2. **The count label does not clip.** `w-5` (20 px) holding `"12"`: `scrollWidth 20 == clientWidth 20` at both viewports. I expected a clip and there is none.
3. **The popover does not overflow the viewport.** `docOverflowOpen: 0` at 1440 and 390; the 272 px `min-w-[17rem]` content is collision-fitted to `x 33 → 305` inside 390. The width comments at `:226-228` and `:260-262` are honest: no description wraps at 390 (`descLines: [1,1,1,1,1,1,1,1,1,1]`).
4. **The option accessible name is clean.** My run-on-accname hypothesis is **falsified**: `aria-labelledby` resolves to the item-text node, giving `"Vibrant"`, not `"VibrantHigh chroma, bold tones"`. (The falsification produced D3-10, which is worse.)
5. **The palette name is in the correct type role.** Measured `Fraunces … serif` at `20.352px` — `--type-subheading`, exactly what `PROPORTION-AUDIT.md` §5.13 assigns to *palette identity*. The one type role in the file that is right; it should survive any transposition.
6. **Preset previews genuinely discriminate at the default.** 10/10 distinct at `count = 1`, 6/6 harmony previews distinct at `count = 5`. The seed-exactness mechanism is sound *as arithmetic*; D3-1/D3-3/D3-12 are about how it renders and where it stops.
7. **`golden` — the default harmony — is genuinely count-stable.** 5/5 prefix colours survive 5 → 6, confirmed both in the pure core and by driving the real slider in WebKit. The first-run experience is the one arm of D3-4 that behaves; that is why the defect has gone unnoticed.
8. **Dark chrome stays on the restrained neutral pole.** No seed tint on plate chrome — `VISUAL-CONSTITUTION.md:21` satisfied. Corroborates pass 2 §7.8.

---

## 8. Wave — `W·GEN-1` · **BLOCKED-ON-GLASS-V8**

**No edit is proposed and none may land.** `docs/tranches/V/reformation/CARRY-LEDGER.md:55-79` pins
this exact file inside the glass BJ W4 hold:

> *"**glass BJ W4 / v8 Slider post-cut consumer hold (2026-07-22):** … Glass remains
> producer/package/browser RED. Against Value authority `c654824e0b252cda7f8490b67f182a48c48cc0ed`,
> **hold all consumer edits** and the `@mkbabb/glass-ui` pin until one unique immutable v8 candidate
> proves exact source→built→packed→installed→served equality, is neither a workspace/source link nor
> mutable v7, and survives two unchanged-byte Sol critics. Then migrate only the property name to the
> inheriting CSS-`background` seam `--glass-slider-track-background` in the four pinned receivers: …
> `GenerateControls.vue`
> (`4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6`). Preserve the
> perceptual/alpha-checker ramps, ancestor-fed certified `--ink-muted`, transparent K/count underlays,
> kC `trackInk`, orientation/RTL/inversion and existing pixels; **add no `--track-bg`, v7 alias,
> copied CSS or local mask.**"*

### Exact release condition (conjunctive — all five)

1. One **unique immutable Glass 8 candidate** exists on the registry — not a workspace link, not a source link, not mutable v7.
2. It proves **exact source → built → packed → installed → served equality**.
3. It **survives two unchanged-byte Sol critics**.
4. Value authority is still `c654824e0b252cda7f8490b67f182a48c48cc0ed`, or the hold is re-bound to the new authority first.
5. Both installed public CSS entries retain `backdrop-filter: none` **and** `-webkit-backdrop-filter: none`, and **a real browser computes both as `none`** — the condition for retiring the duplicate spectrum-range blur rule in `demo/styles/foundation.css`.

Until all five hold, `GenerateControls.vue` is byte-frozen at `4f95c57c…ae324f6` and this document is
a **record only**.

### The sequencing collision, restated and widened

Pass 2 filed the collision: the hold's on-release scope is *"migrate **only** the property name"* at
`:305`, *"preserv[ing] … transparent K/count underlays … existing pixels"* — which is the very element
its D-3/D-8/D-9 findings want to change.

**Pass 3 widens it.** D3-5 says the count underlay should not exist at all: `variant="spectrum"` on an
integer domain violates `VISUAL-CONSTITUTION.md:9`'s reservation of the spectral meniscus to Picker and
Gradient. So the hold's preservation clause protects a construct the constitution forbids, and the
migration it mandates (`--slider-track-bg` → `--glass-slider-track-background`) is a rename of a token
whose correct final value is *no chromatic track*.

- **W·GEN-1a — on release, in scope.** The property-name migration only. Byte-minimal, pixels preserved, exactly as the hold specifies. No finding in this document is addressed.
- **W·GEN-1b — separate wave, own owner ruling.** Everything else.

> **Open question owed to the owner (this seat files it; it does not answer it).** Pass 2 asked whether
> *"existing pixels"* discharges with 1a or binds every future wave. Pass 3 adds a prior question:
> **does the hold's preservation clause survive a demonstrated constitutional violation of the element
> it preserves?** If the count track must become neutral per `VISUAL-CONSTITUTION.md:9`, then 1a is
> migrating a token that 1b deletes, and the owner may prefer to defer 1a rather than spend a
> byte-frozen release window on a rename with no surviving referent.

### Ordering within W·GEN-1b — dependency-first

Pass 2's ordering is sound. Pass 3 inserts three rows and re-seats one.

1. **D-7** — adopt `InstrumentChassis` with §3.1's three regions; delete `GeneratePane.vue:31`'s `Card`. Everything needs somewhere to live. **This is also where D3-6 and D3-7 die**: the plate stops being a hand-rolled card, so the reversed caster, the duplicated boundary, the well/elevation contradiction and the coincident radius all go with it.
2. **D3-2 (new, promoted here)** — the model inspector becomes a **resident** region with the preview strips inline, not a popover. **This dissolves D3-1 entirely** (nothing is painted over the specimen), removes the 58.9%/100% occlusion, and makes D3-9's boundary inconsistency moot by deleting one of the two boundaries.
3. **D-4** — the three verbs collapse to the Dock control set alone. **This closes D3-8**: with the verbs gone from the plate, the specimen is the plate. Also dissolves D-6.
4. **D-1 / D-2** — execute the P051 Generate site: named geometric seats around ornamental faces; the specimen gains its named-list AT representation. Fixes D-18's dead `active:`.
5. **D-5** — rule the title: provenance or identity. D-15 follows.
6. **The count-axis wave — D3-4 · D3-5 · D-3 · D-8 · D-9 · D-10 · D-16.** One owner, because they are one control. It must produce: (a) a stated regeneration contract for the count axis — which inputs stay fixed, per `VISUAL-CONSTITUTION.md:194`; (b) a **neutral** track per `:104`'s semantics clause, retiring `variant="spectrum"`; (c) the domain-neutral axis composition with label, unit and reserved live value; (d) a clipboard serialization step. **Note the dependency**: (a) may require a change in `generate-color.ts` so that count is prefix-stable under *all* harmonies, which is outside this component and outside the hold — file it as a separate shared-layer row.
7. **D3-3 · D3-12** — the preview-truth wave, which cannot close until the inspector is resident (step 2) because a truncated chip and an occluded chip are the same defect from the reader's side. Either the strip's segment cap rises to 12 for this site, or the claim at `:87-93` is rewritten to state the cap. **A wave that fixes the render and leaves the comment asserting exactness has not closed the finding.**
8. **D3-10 · D3-11 · D3-13 · D-11 · D-12 · D-13 · D-17 · D-19 · D-20 · D-21 · D-22** — fold into the above; none needs its own wave.
9. **Last: delete the stale commentary** — pass 2's step 7, unchanged and reinforced. `:87-93` in particular is now known to be false, not merely dated.

### Coordination relay owed (standing glass-ui BH/BI edict)

Pass 2 filed two producer-side relays (BH-relay-1 `WatercolorDot` name/pointer swallowing;
BH-relay-2 `slider-thumb` 12×24). Both stand. Pass 3 adds three:

- **BH-relay-3 (from D3-1).** `glass-menu-*` / `SelectContent` computes
  `background-color: oklab(… / 0.7488)` with `backdrop-filter: blur(11px) saturate(1.6)`. The
  `saturate` boost means the veil renders whatever is behind it **more** saturated than reality. For a
  menu over neutral chrome this is a pleasant material; over a colour specimen it is a correctness
  failure, and value.js is a colour laboratory where menus over specimens are the normal case. Request:
  a denser neutral veil tier with named alpha/clarity levers, per `VISUAL-CONSTITUTION.md:15`, selectable
  by consumers whose popovers sit over live colour — and no `saturate` in that tier.
- **BH-relay-4 (from D3-10).** `SelectItem`'s `#description` slot (present in
  `SelectItem.vue.d.ts`) is not associated with the option: `aria-labelledby` targets the item-text node
  only and no `aria-describedby` is emitted. Every consumer using the slot ships an option whose
  explanatory copy is invisible to AT. Request: wire the description slot to `aria-describedby`.
- **BH-relay-5 (from D3-9, partial).** The `Select` family renders the option name and the trigger value
  in different families by default at this consumer's usage. Whether that is producer default or
  consumer class (`:240` `class="font-display"`) needs a producer ruling, because the trigger has no
  consumer-side font class at all — so at minimum the producer owns half of the inconsistency.

---

## 9. Appendix — commands and artifacts

```bash
# subject + pin
shasum -a 256 demo/workbenches/generate/GenerateControls.vue
#   4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6   (matches CARRY-LEDGER §D)

# producer surfaces read
cat node_modules/@mkbabb/glass-ui/dist/components/select/SelectItem.vue.d.ts   # description slot present
cat demo/ui/select/index.ts                                                   # pure glass-ui re-export
cat demo/color-session/color-chips/PreviewStrip.vue                           # STRIP_SEGMENT_CAP = 7
sed -n '90,230p' demo/color-session/generate-color.ts                         # generateHues / generatePalette

# probes (all written by this seat, all in this directory)
npx vite-node probe-D3-count-stability.mts   # pure core: count stability, preview degeneracy, clipboard payload
node probe-D3-dropdown.mjs                   # WebKit 1440 + 390: open both dropdowns, geometry, type, count-12 truncation
node probe-D3-axis.mjs                       # WebKit: ramp/range/thumb geometry, accname wiring, live 5->6 stability
node probe-D3-final.mjs                      # WebKit 1440: popover material + overlap %, seed selection string, areas
node probe-D3-shadow.mjs                     # WebKit 1440: full ancestor box-shadow chain + radii
```

**Frames captured by this seat** — `frames-D3/`:

| Frame | What it shows |
|---|---|
| `desktop-preset-open.png` | **first frame of the open preset list in any pass** — the specimen reading through the veil (§3.1) |
| `mobile-preset-open.png` | the popover at 390 |
| `mobile-harmony-open-count12.png` | 7-of-12 truncated chips; the plate fully occluded; trigger-vs-option typeface split (§3.2, §3.3) |
| `desktop-count12.png`, `mobile-count12.png` | the ramp degenerating to a hue spectrum |
| `desktop-axis.png`, `mobile-axis.png` | the axis at rest |

**Tracked frames read:** `audit/visual/shots/safari-{desktop,mobile}-{light,dark}/generate.png`.

**Prior passes** (both preserved, neither superseded):
`challenge-D-design.2026-07-24-pass.md` · `challenge-D-design.2026-07-27-pass2.md`.

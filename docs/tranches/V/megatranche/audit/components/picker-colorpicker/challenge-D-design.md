# CHALLENGE-D — `demo/picker/ColorPicker.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. The declaration is not inherited: it is the served tier this
session reports. Seat: CHALLENGE-D (design), component `demo/picker/ColorPicker.vue` (414 lines,
area `demo/picker`), repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`,
HEAD `c654824e`.

---

## Verdict

**DEFECTIVE.** Four BLOCKERs, eight MAJORs, eight MINORs. The flagship instrument of the product
fails the tranche's own binding constitution on every axis it is judged by: proportion (the
protagonist holds 50.00% of a stage whose floor is 61.8%), typography (the identity/specimen
pair drifts from `1/√φ` at the phone floor to near-parity at 1440), semantics (zero `<h1>`; the
first heading in the document is an `<h3>` whose text is a number tuple and whose children are
three editable textboxes), and state coverage (the 2D spectrum field — the picker's primary
spatial control — is not in the tab order at all; there is no error state, no disabled state, no
forced-colors handling).

The strongest defect is not a canon row. It is a **live shipping data-integrity defect**: the
`contenteditable` headline is an unguarded write path with no commit, no cancel, no clamp and no
error semantics. One keystroke makes the displayed value, the announced value, the URL and the
document title disagree; ten keystrokes reflow the "locked" chassis by 61.2px. Reproduced below.

---

## Evidence base and one evidence gap

- Source read at HEAD `c654824e`: `ColorPicker.vue`, `seat.css`, `header.css`,
  `display/ColorComponentDisplay/{ColorComponentDisplay.vue,readoutReservation.ts}`,
  `controls/{SpectrumCanvas,ComponentSliders}`, `demo/color-session/ColorSpaceSelector.vue`,
  `demo/color-session/useColorPipeline.ts`.
- Canon read: `docs/tranches/V/VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`,
  `reformation/waves/W46-W48.md` (the W48 spec), `reformation/CARRY-LEDGER.md` §B.
- Screenshots read (vision) for `/`: `safari-desktop-light/picker.png`,
  `safari-desktop-dark/picker.png`, `safari-mobile-light/picker.png`,
  `safari-mobile-dark/picker.png`.
- Live DOM telemetry via Playwright against the running dev server `http://localhost:9000/`,
  at 1440×900 and 390×844, with pasted result payloads below.

**Evidence gap (record it, do not paper it):** the task brief names
`docs/tranches/V/megatranche/audit/visual/REPORT.md` and `REPORT.json` as available. Neither
exists.

```
$ ls -la docs/tranches/V/megatranche/audit/visual/
-rw-r--r--  capture.mjs
drwxr-xr-x  shots
```

Only `capture.mjs` and `shots/` (4 matrices × 15 routes = 60 PNGs) are on disk. The harness's
per-route console-error / page-error / horizontal-overflow / tap-target / accessible-name rows
were never written or never committed. Every per-route claim in this report is therefore my own
measurement, not a REPORT row. The picker route's own overflow number I measured directly:
`documentElement.scrollWidth − clientWidth = 0` at both 1440 and 390.

---

## BLOCKER findings

### D-01 — the `contenteditable` headline is an unguarded write path: display, announcement, URL and title disagree; the card-lock breaks mid-keystroke

`ColorComponentDisplay.vue:22-23` puts `contenteditable="true" role="textbox"` on every figure
cell. `ColorPicker.vue:223-235` (`onComponentInput`) `parseFloat`s the raw DOM text and pushes it
straight into `updateColorComponentDebounced`. There is no commit, no cancel, no validation, no
range feedback — and, decisively, **no agreement between what is written and what is shown**.

Reproduction (Playwright, 1440×900, route `#/?space=lab&color=lab(50% 20 30)`; focus the `a`
cell, caret to end, `insertText('5')` — one keystroke a user makes by clicking after the last
digit and typing):

```
t0                     cells: ["50.0 % ,", "20.0 ,", "30.0"]
                       sliders: a axis 20.0        title: lab(50% 20 30) — Color Picker
t1 (immediately)       cells: ["50.0 % ,", "20.05 ,", "30.0"]
                       sliders: a axis 20.0        title: lab(50% 20 30) — Color Picker
t2 (after 900 ms)      cells: ["50.0 % ,", "20.1 ,", "30.0"]
                       sliders: a axis 20.1        title: lab(50% 20.05 30) — Color Picker
                       url:    #/?space=lab&color=lab(50%25+20.05+30)
```

The model is `20.05`. The readout says `20.1`. `aria-valuetext` announces `20.1`. The **URL and
the `<title>` carry `20.05`**. The instrument cannot round-trip its own display: read `20.1`,
type `20.1`, and you get a different color than the one the share link encodes. A meter that
silently rounds away the operator's own input, and then exports the un-rounded value in the
shareable identity of the page, is not a meter.

The same path breaks the one invariant `readoutReservation.ts` exists to hold. Its doc-comment
(lines 24-30) asserts the worst-case reservation is *"TRUE BY CONSTRUCTION since T-33a — the demo
model clamps every landing color into these same ranges at the pipeline seams"*, and `.readout`'s
comment (`ColorComponentDisplay.vue:158-165`) asserts *"the card rect never moves … nothing below
the header ever shifts mid-drag (the lock's reason to exist)"*. Measured, same session,
`insertText('9999999999')` into the same cell:

```
before        readout 441.8 × 122.4   card h 684.8   --readout-lines 2   scrollW 442 = clientW 442
during        readout 469.0 × 183.6   card h 693.2                        scrollW 477 > clientW 469
settled       readout        × 122.4   card h 684.8   --readout-lines 2
              cell text 20.19999999999 → 20.2 ; title lab(50% 20.19999999999 30)
```

The readout grew **+61.2px (exactly one 1.12em line)**, the card grew **+8.4px**, and the readout
overflowed its own box by **8px horizontally** — all while the user was typing, i.e. exactly the
moment the lock was built to protect. The clamp lives at the *pipeline seam*; the paint happens
*before* the seam. The premise is false for the painted DOM.

Canon: `VISUAL-CONSTITUTION §7 Picker` — "Title, **read-only** contiguous numeric readout";
`§4` — "editing occurs only in W21's semantic numeric fields"; `PROPORTION-AUDIT §5.10` —
"Readout and editing are separate jobs … no duplicate `contenteditable` path". W48 knows the path
must die; it does **not** know the path corrupts the model, the URL and the title, nor that it
breaks the card-lock. That is new.

**Cure (gestalt, not patch):** the readout becomes a pure projection — `<output>`, no
`contenteditable`, no `role="textbox"`, no tab stop. Editing moves whole into the channel
composition over BI `Slider` (the domain-neutral axis W48 already specifies), which owns
commit/cancel/error and whose value is the same formatted cell the headline projects. One writer,
one formatter, one truth. Do not add validation to the contenteditable; delete the writer.

---

### D-02 — PR-01 is live and the register's cure is mis-apportioned: 69.93px of void at 1440 against a 14.87px ceiling, and the Blob reservation is a no-op at desktop

Measured, 1440×900, settled route:

```
trigger ("Lab")   text-box bottom      240.91
readout           first ink line top   310.84
                  ---------------------------
label→headline line-box gap            69.93 px
```

`VISUAL-CONSTITUTION §3.2` and `PROPORTION-AUDIT §2.2` bind: `I_after ≤ min(φG, I_before − G)`
with `G = --instrument-title-gap`, default `calc(--instrument-dial-padding-inline/2.618)` ≈ 9.2px
→ `φG ≈ 14.87px`. **Measured 69.93px = 4.70 × the ceiling.** At 390 it is 25.4px = 1.71 × the
ceiling. Both arms fail; the desktop arm fails catastrophically.

`--instrument-title-gap` **computes to the empty string** on the live page — the P122 token is not
defined and not consumed. The seam is composed instead from a local `.picker-header` mint
(`header.css:25`, `clamp(0.25rem,1.4cqi,0.55rem)` → measured `row-gap: 7.168px`) plus two
reservations.

Apportioning the 69.93px, which the register does not do:

| contributor | measured | binding at 1440? |
|---|---|---|
| readout reserved-minus-painted (`--readout-lines:2` + `align-content:flex-end`) | **+54.9 px** | **yes** |
| `.picker-header` row-gap | 7.17 px | yes |
| label line-height leading below the ink (53.28px font in an 79.92px line box) | ≈13.3 px | yes |
| `.title-row` Blob-derived `min-height: 73.12px` (`seat.css:89`) | **0 px** | **no** — the row's content height is 84.98px, so the minimum never binds |

`readoutReservedVsPainted` is the readout box height minus its painted ink extent:
`122.40 − 67.50 = 54.90px`, and `align-content: flex-end` (`ColorComponentDisplay.vue:166`) puts
**all** of it *above* the numbers. At 390 the same measurement is `−4.2px` — the lock is honest
there, because the tuple genuinely wraps to two lines. So the identical mechanism is correct on
the phone and is a pure blank-line generator on the desktop.

That falsifies the derivation's own claim. `readoutReservation.ts:138-147` models exactly two
arms — *"cqi band (pane 400–512)"* and *"390 phone"* — and concludes the line capacity is
*"a near-constant of the composition … a structural guarantee across the whole band, not a lucky
viewport."* At 1440 the pane **is** 512 (in-band) and lab renders **one** line while the table
derives **two**. The guarantee does not hold inside its own modelled band.

**Consequence for W48:** its Work step 2 says *"Delete the Blob-derived `.title-row` reservation
(`seat.css:88`)"* first and the readout reservation second. At 1440 deleting the Blob reservation
changes the void by **0px**. The whole desktop void is the readout lock. Ordering the cure that
way will produce a "landed" wave with an unchanged desktop frame.

**Cure:** delete `--readout-lines`/`align-content:flex-end` and the static line table outright;
one line always, true wrap grows *below* into feature-local flow (which §4.2 already sanctions:
"Picker's genuinely wrapped tuple grows through feature-local flow below the readout and is not a
persistent P122 reserve"). The card-lock goal is then met by tabular figures alone — which is what
`readoutReservation.ts:14-18` already says mechanism (i) does.

---

### D-03 — the picker's primary spatial control is not reachable by keyboard at all

Enumerated tab order inside the picker Card, live (all `offsetParent !== null`):

```
1  BUTTON  combobox  "Select color space"      70.0 × 52.5
2  SPAN    textbox   "l component value"       88.6 × 46.9
3  SPAN    textbox   "a component value"       88.6 × 46.9
4  SPAN    textbox   "b component value"       88.6 × 46.9
5  BUTTON  tab       "l channel"               31.7 × 44
6  BUTTON  tab       "a channel"               31.7 × 44
7  BUTTON  tab       "b channel"               31.7 × 44
8  BUTTON  tab       "alpha channel"           31.7 × 44
9  SPAN    slider    "L channel"               12.0 × 24
10 SPAN    slider    "A channel"               12.0 × 24
11 SPAN    slider    "B channel"               12.0 × 24
12 SPAN    slider    "ALPHA channel"           12.0 × 24
```

The 2D saturation×lightness field — the visually dominant instrument, the thing the whole plate is
built around — **does not appear**. `SpectrumCanvas.vue:8-9` declares `role="img"` on a
pointer-only div with a reactive `aria-label` and no `tabindex`, no `role="slider"`, no named
numeric axes. `VISUAL-CONSTITUTION §5`: "every spatial action has a keyboard/numeric equivalent";
`§5.2` requires Spectrum to "expose two named numeric axes using the same Slider law; pointer
canvas is not the sole keyboard control". This is V-A137, confirmed still born-RED on disk, and
its design consequence is that the flagship instrument is operable by mouse only.

Note the ordering defect this interacts with: tab stops 2-4 are the `contenteditable` cells from
D-01. A keyboard user's *second, third and fourth* stops on the product's front door are three
undiscoverable editors with no rest-state affordance, no hover affordance and no commit semantics
— and the one control they would actually want is absent.

---

### D-04 — the protagonist holds 50.00% of the stage with a byte-identical shadow to its companion

Measured at 1440×900:

```
.pane-container.pane-container--dual   display: grid
                                       grid-template-columns: 512px 512px
                                       gap: 18px
panes  [left  x199 w512 h774]  [right x729 w512 h774]
split  leftShare 50.00 %   rightShare 50.00 %

plate box-shadows
  picker card  x199 y148  512×684.8   color(srgb 0.11 0.098 0.09 / 0.5) 8px 8px 0px 0px
  About  card  x729 y103  512×774     color(srgb 0.11 0.098 0.09 / 0.5) 8px 8px 0px 0px
```

`VISUAL-CONSTITUTION §3` law 1: a two-part desktop scene "chooses exactly `golden`
(61.8033989% / 38.1966011%) or `preview-dominant` (66.6666667% / 33.3333333%); the display-rounded
protagonist law is 61.8–66.7%." **Measured 50.00% — 11.8 percentage points below the floor.**
§3.1's Picker row: "exact golden inspector 38.1966011%".

§3 law 8: "One pane may have one full-strength visual protagonist. Supporting fixtures do not
compete with it through equal size or equal shadow." The companion has **equal width and a
character-identical shadow declaration**. Both clauses fail at once, which is why the desktop
frame reads as two peer documents rather than an instrument with an inspector — visible directly
in `safari-desktop-light/picker.png`, where the eye has no reason to choose the left plate.

And §3.1 line 58 is explicit that this companion should not exist: "About is a quiet trailing
destination rather than Picker's companion." PROPORTION-AUDIT PR-04 dispositions
"Empty/equal companion Cards and nested housing" as **REMOVE**.

---

## MAJOR findings

### D-05 — the P019 pair is correct only at the phone floor: ratio drifts 0.7861 → 0.9750 across the band

Measured `label font-size / headline font-size`:

| viewport | label (`.space-trigger`) | headline (`.readout`) | ratio | required |
|---|---|---|---|---|
| 390 × 844 | 32.928 px | 41.888 px | **0.7861** | `1/√φ` = 0.78615 |
| 1440 × 900 | 53.280 px | 54.644 px | **0.9750** | `1/√φ` = 0.78615 |

**Drift +24.0% across the band.** At 1440 the identity label is 97.5% the size of the numeric
specimen: they are, optically, the same size. That is PR-02 ("`Lab` competes typographically with
the numeric specimen") rendered at its worst, and it is worse than V-A140 describes — the register
says the pair "skips a type rung (`display2→display4`)", implying a fixed two-rung error, when the
rendered truth is a *ratio that is right at one end of the band and collapses at the other*.

Mechanism: two independently clamped sources. Label = `--type-display-2` (`ColorSpaceSelector.vue:209`),
`clamp(2.058rem, 1.5rem + 2.2vw, 3.33rem)` — ceiling-bound at 1440. Headline =
`calc(min(var(--type-display-4), max(11.65cqi, 2.618rem)) * var(--readout-fit,1))`
(`ColorComponentDisplay.vue:137-140`) — floor-bound at 390, `11.65cqi`-bound at 1440
(`--type-display-4` resolves to 86.11px and never binds). Two clamps with different binding arms
cannot hold a constant ratio; §3.2 says so in as many words: "BI P019 supplies one paired
proportional clamp; both sizes resolve from that one clamp … rather than only at endpoints" and
"independently clamped display-2/display-3 tokens **and a local approximation** are forbidden."
`11.65cqi` is the local approximation.

### D-06 — the headline is in the wrong family, and its size is a local mint rather than a rung

Measured `getComputedStyle(.readout).fontFamily` = `Fraunces, "Fraunces Fallback", serif` at both
viewports. `VISUAL-CONSTITUTION §3.2`: "the read-only **Fira Code** numeric readout is the headline
and the Fraunces selected-space identity is exactly one adjacent golden rung smaller"; §4:
"value applies Fraunces to its identity arm and **Fira Code to its headline arm** at exact `1/√φ`";
§7 Picker repeats it. Today both arms are Fraunces, which is precisely why D-05's near-parity
reads as a *collision* rather than a contrast: same family, same weight class, same size. The
`.fira-code` class is applied only when `formatted[component]?.monospace`
(`ColorComponentDisplay.vue:28`), which is false for every numeric channel.

### D-07 — zero `<h1>` on the flagship route; the first heading in the document is a number tuple containing three editable textboxes

```
h1count: 0
headings[0]: { tag: "H3", data-slot: "card-title", text: "64.8%,18.0,42.0" }
contenteditable count: 3 (all role="textbox", inside that H3)
main count: 1   ✓
```

`VISUAL-CONSTITUTION §4.1`: "Each route has one H1 and exactly one stable main landmark";
§5.1: "destination `<title>` and the single visible H1 exist before app-ready".
`PROPORTION-AUDIT §5.11`: "A display-sized readout is not therefore a document heading or live
status. Picker uses one labeled non-live domain output; route H1 owns heading hierarchy."

`ColorComponentDisplay.vue:13` renders the readout as glass-ui `<CardTitle>`, which emits `<h3>`.
The document outline of the product's front door therefore begins at level 3, with the heading
text `64.8%,18.0,42.0`, and that heading *contains three interactive widgets*. Heading-navigation
in a screen reader lands on a heading whose accessible name is a concatenated number tuple; the
route has no identity heading at all. The landmark half is fine (`main` = 1) — this is purely the
heading half.

### D-08 — Card is used as the route chassis, and a second Card is nested inside it, falsifying the register's stated premise

Live: the picker's outer plate is `<div data-slot="card" class="glass-resting card rounded-card …">`.
`VISUAL-CONSTITUTION §3.1` binds Picker's outer housing to **`InstrumentChassis`** and states
"`Card` remains semantic housing for a bounded object or specimen and **is never the default page
primitive**." glass-ui 7.0.0 ships the producer component:

```
$ node -p "Object.keys(require('@mkbabb/glass-ui/package.json').exports)" | grep chassis
./instrument-chassis
$ grep -rl InstrumentChassis node_modules/@mkbabb/glass-ui/dist/
dist/instrument-chassis.js
dist/components/instrument-chassis/InstrumentChassis.vue.d.ts
```

So the picker hand-rolls a chassis out of `Card` + `CardHeader` + `CardContent`
(`ColorPicker.vue:6,21,64`) while the design system ships the real thing — owner edict 4
(glass-ui is the design system; do not hand-roll what it provides). The consequence is measurable:
`--instrument-title-gap` computes to `""` because nothing on the page defines it, so the header
seam is a local mint (D-02).

Worse, a **second** Card is nested inside the first: `ComponentSliders.vue:25` renders
`<Card surface="veil">`, measured live as a `glass-quiet card` at `469 × 190.4` inside the
`glass-resting card`. `VISUAL-CONSTITUTION §2`: "One surface has one tier. An inner card is not
automatically another pane of glass." `PROPORTION-AUDIT §5.1`: "A page region, empty column, inner
stage or mere padding group does not become a Card by default."

This matters beyond taste: **`PROPORTION-AUDIT §2` ruling 2 opens with the premise "Because Picker
no longer nests a Card, BI P122 exposes `--instrument-title-gap` …". That premise is false at
HEAD.** A register clause conditioned on a false premise cannot be executed as written.

### D-09 — the "ONE rhythm law" did not cure the divergence; it inverted and amplified it

`header.css:18-23` states the token's reason for existing: it replaces "the fixed `gap-y-1` (4px)
that — over the fp-derived blob-reservation band — read as a **6× divergent gap (4.0px@1440 vs
24.6px@390)**" so that "1440 and 390 share ONE rhythm SOURCE."

Measured label→headline ink separation after the cure:

```
1440 : 69.93 px
390  : 25.40 px
ratio: 2.75 ×   (previously 6.15×, in the opposite direction)
```

The divergence survives at 2.75×, and the *sign flipped*: desktop was the tight arm and is now the
loose arm by a factor of nearly three. The `row-gap` token itself is well-behaved (7.168px at
1440); it is simply not the quantity that governs the seam — the readout reservation is (D-02).
A token was introduced to fix a symptom whose cause lives in a different file. That is the
mechanism worth naming, not the number.

### D-10 — the only keyboard-operable channel control is a 12×24 px target at every viewport

```
1440 × 900   L/A/B/ALPHA channel sliders   12.0 × 24 CSS px
390  × 844   L/A/B/ALPHA channel sliders   12.1 × 24 CSS px
```

WCAG 2.2 SC 2.5.8 (Target Size, Minimum, AA) floors at 24 × 24 CSS px. The thumb is **half the
floor on the inline axis** — and identical on touch and pointer, so the phone gets no
accommodation at all. `PROPORTION-AUDIT §5.7`: "Visual glyph size, operable target size and layout
reservation are separate quantities" — the cure is an invisible seat around the visible thumb, not
a fatter thumb; PR-12 disposes exactly this family. Today neither exists: the visible glyph *is*
the target.

### D-11 — two instances of the same control, bound to the same state, visible simultaneously

```
.space-trigger  ×2
  [0] x220.5 y161.0  111.5×85.0   font 53.280px  Fraunces  "Lab"   (picker header)
  [1] x894.4 y164.0   88.6×48.0   font 41.888px  Fraunces  "Lab"   (About heading, inline variant)
```

Both are `ColorSpaceSelector`, both drive `model.selectedColorSpace`, both are on screen at 1440
(see `safari-desktop-light/picker.png` — "Lab ⌄" appears twice), at two different sizes and two
different type treatments, with nothing indicating they are one control. `PROPORTION-AUDIT §5`
(PR-06/PR-07 family): "One action/selection owner"; §5.6: "Subtraction precedes explanation."
This is a direct consequence of D-04 — About should not be Picker's companion — and dies with it.

### D-12 — an undiscoverable global keyboard shortcut on `window`, with no scope guard

`ColorPicker.vue:247,263-266`:

```ts
const keys = useMagicKeys();
…
if (keys.cmd?.value && keys.k?.value) {
    e.preventDefault();
    selectedColorSpaceOpen.value = !selectedColorSpaceOpen.value;
}
```

registered at `ColorPicker.vue:377` as `window.addEventListener("keydown", handleKeydown)`. Three
design defects in one: (i) it is **undiscoverable** — nothing in the UI names it, no tooltip, no
menu, no hint, which is the PR-07 "hover-only/unlabeled control" family; (ii) it has **no target
guard**, so it fires while focus sits in any editable surface on the page, including the picker's
own `contenteditable` cells and the dock's colour input; (iii) it is a **toggle on a held-key
predicate**, so any subsequent keydown while ⌘ and K remain held re-toggles the popover.
`VISUAL-CONSTITUTION §5`: interaction grammar is `select → tune → commit`, and a command that
cannot be discovered is not part of any grammar.

---

## MINOR findings

### D-13 — the mobile headline wraps to a 27%-filled orphan line

At 390, the last painted line of the readout carries **88.7px of ink in a 327.7px box** — 27.1%
filled, 72.9% void, visible in `safari-mobile-light/picker.png` as `20.0` stranded alone under
`92.0%, 88.8,`. A three-term tuple broken 2 + 1 is the worst available break: it reads as two
numbers and an afterthought. `PROPORTION-AUDIT §2.5` sanctions a second line only for "a tuple
whose rendered legal width actually wraps" — it is silent on *where* the break falls, which is
the design question. The composition needs a break rule (all-or-nothing, or 1+1+1), not just a
permission to wrap.

### D-14 — `isTransitioning` is exposed reactive state with zero consumers

```
$ grep -rn "isTransitioning" demo/ src/
demo/picker/ColorPicker.vue:330:const isTransitioning = ref(false);
demo/picker/ColorPicker.vue:333:    isTransitioning,
```

Declared, exposed on the public `defineExpose` surface, never written, never read anywhere in the
repository. Owner edict 2 (no legacy code, no dead paths).

### D-15 — `.pane-shell` transitions a property nothing ever sets

`ColorPicker.vue:399`:

```css
transition: transform var(--spring-smooth-duration) var(--transition-liquid-spatial);
```

resolving live to `transform 0.35s linear(0 0%, 0.00287 2.041%, …)`. No rule anywhere applies a
`transform` to `.pane-shell` — the class appears only at `ColorPicker.vue:5`, `seat.css:42`,
`overture.css:126` (which targets `.pane-shell > :first-child`, the Card) and two comments. The
comment above it (`ColorPicker.vue:392-398`) records that this is the residue of a deleted margin
morph. The morph is gone; the transition should have gone with it. Owner edict 2.

### D-16 — a 12-member imperative `defineExpose` surface, plus cross-sibling wiring through a template ref

`ColorPicker.vue:315-344` exposes `isEditing, isTransitioning, editTarget, commitEdit, cancelEdit,
onPaletteApply, onPaletteAddColor, parseColor, setCurrentColor, applyExternalColor, onStartEdit,
actionBarContext`. The comment at line 311 is candid: *"exposed, not provided — TopDock is a
sibling"*. So the dock reaches into the picker through a parent-held ref to obtain
`actionBarContext`. Owner edict 1 (no god modules; focused modules with real encapsulation): the
action-bar contract is a shared concern of dock and picker and belongs in the injected
`COLOR_MODEL_KEY` pipeline that both already consume — not in the picker's imperative surface,
where every consumer is invisible to the type system and to grep.

### D-17 — untokenized magic timings couple the state machine to motion

`ColorPicker.vue:288` — `setTimeout(() => setEditTarget(target), 120)` inside `onStartEdit`: a
raw 120ms delay before the edit state lands, presumably to let something animate. `line 378` —
`window.setTimeout(() => { plateOpening.value = false; }, 850)`, with a comment deriving 850 from
"440ms plate-land + 220ms stagger + 90ms slack". Both are hand arithmetic over token values in
JavaScript. If any of `--overture-plate-land`, `--stagger-base` or the spring duration is retuned,
these two numbers silently desynchronise from the motion they are pinned to. Motion durations are
tokens; consumers of a motion's *end* should listen for `animationend` (which this file's own
HeroBlob path already does, `ColorPicker.vue:97`) or read the token, not re-derive it in a literal.

### D-18 — dark mode: the ambient field never changes, so the plate inverts against a bright ground and the inert ornament becomes the brightest object on the page

Compare `safari-desktop-light/picker.png` and `safari-desktop-dark/picker.png`: the atmosphere
gradient behind the plates is **the same bright pink→peach field in both schemes**; only the cards
change, to a desaturated brown-maroon. Two consequences visible in the frame:

1. The cartoon drop shadow (`8px 8px 0 0` at 50% alpha of a near-black) is legible in light and
   effectively invisible in dark, because a dark shadow under a dark card on a bright ground has
   nothing to separate. The plate loses its seat in exactly the scheme that most needs it.
2. In `safari-mobile-dark/picker.png` the Blob renders as a **pure-white blot** — the highest
   luminance element on the entire page by a wide margin, several times brighter than the numeric
   specimen it sits beside. `PROPORTION-AUDIT §5.9`: "A renderer specimen is not an unlabeled
   button. Picker Blob is inert presentation." `VISUAL-CONSTITUTION §7`: "Blob is a noninteractive
   center-ward specimen." An inert decoration that out-shouts the protagonist is a hierarchy
   inversion, and it happens only in dark — i.e. the dark treatment was not designed, it was
   inherited.

`VISUAL-CONSTITUTION §2`: "Dark chrome uses the restrained neutral pole." The measured dark plate
is a seed-tinted brown, not the neutral pole.

### D-19 — the W48 spec's own anchor points at the wrong line, and would cure the wrong axis

W48 (`reformation/waves/W46-W48.md`) Work step 2: *"Delete the Blob-derived `.title-row`
reservation (`seat.css:88`)"*. At HEAD:

```
seat.css:87  .title-row {
seat.css:88      padding-right: calc(0.76 * var(--blob-fp) + 0.5rem);   ← horizontal clearance
seat.css:89      min-height:    calc(0.76 * var(--blob-fp) - 0.75rem);  ← the vertical reservation PR-01 names
seat.css:90  }
```

Executed literally, the wave deletes the blob's **horizontal** clearance — which is the one thing
holding the readout out of collision with the bead — and leaves the **vertical** minimum PR-01
targets. The spec flags the risk itself ("Line anchors are today's — re-resolve post-W43/W44") but
the re-resolution has not happened. Combined with D-02: at 1440 line 89 contributes 0px anyway, so
the correct desktop cure is neither line — it is `ColorComponentDisplay.vue:151,166`.

### D-20 — alpha is structurally absent from the headline while the rail displays it

`useColorPipeline.ts:117-123` builds `colorComponents` from `PICKER_CHANNELS[space]` only; alpha
is never a headline cell. In `safari-desktop-light/picker.png` the channel rail reads
`α 82.7%` while the headline reads `92.0% 88.8, 20.0` — the flagship readout describes an opaque
colour that the instrument is not currently holding. `VISUAL-CONSTITUTION §4`: "Alpha appears only
when semantically relevant" — 82.7% alpha is the definition of relevant, and W48's own completion
evidence expects four cells: *"reads `92.0% | 88.8 | 20.0 | 82.70%`"*.

The mirror-image dead code: `readoutReservation.ts:96` budgets an `alpha` cell into `READOUT_CH`
for every space, but `readoutLineCount`/`readoutFit` are only ever called with
`colorComponents.map(([c]) => c)` — which excludes alpha. The table reserves for a cell that is
never rendered.

---

## State coverage

A state that was never designed is a design defect. Enumerated for this component:

| state | status | evidence |
|---|---|---|
| populated | designed | the settled frames |
| empty | n/a | the model always holds a colour |
| loading | designed | CSS ground paints first; overture beats layer after (`overture.css`) |
| **error** | **absent** | typing `abc` into a readout cell → `parseFloat` NaN → `ColorPicker.vue:233` silently discards; out-of-range → silent clamp at the pipeline seam. No message, no invalid style, no `aria-invalid`. |
| **disabled** | **absent** | no picker control has a disabled state or style anywhere in `demo/picker/` |
| focused | partial | `.readout-fig:focus-visible` gets `--focus-ring-shadow` (`ColorComponentDisplay.vue:178-183`); the spectrum field cannot be focused at all (D-03) |
| **hovered** | **absent on the editable cells** | three `contenteditable` textboxes with no rest-state and no hover affordance — operable but unadvertised |
| active / pressed | designed | rail tabs carry `aria-selected`; sliders are producer-owned |
| selected | partial | `ColorSpaceSelector` still passes `hide-indicator` (`ColorSpaceSelector.vue:62`), which `VISUAL-CONSTITUTION §4.2` and `PROPORTION-AUDIT §5.14` both order deleted; selection speaks only through a dot opacity step |
| dragging | pointer-only | spectrum thumb; no keyboard equivalent (D-03) |
| **overflowing** | **broken** | readout `scrollWidth 477 > clientWidth 469` during edit, no clip, no scroll, no ellipsis (D-01) |
| truncated | n/a | nothing truncates |
| **RTL** | **unverified — hypothesis** | not probed this session. The tuple is comma-separated numerics inside a `flex-wrap` row; `§6.1` requires LTR isolation for such values. No `dir`/isolation attribute exists in `ColorComponentDisplay.vue`. Reproduction: NONE. |
| reduced-motion | **designed — verified sound** | see negative proof below |
| **forced-colors** | **absent** | `grep -rn "forced-colors" demo/picker/ demo/color-session/` → **0 hits**. `.fig-frac` / `.fig-unit` / `.fig-comma` de-emphasis is colour-only (`--ink-muted`), so in forced-colors the fraction, unit and comma collapse to the same ink as the integer and the readout's typographic rhythm disappears. `§4.1` and `§4.2` both require nonzero forced-colors deltas for selection and focus. |
| **200% / 400% zoom** | **unverified — hypothesis** | canon (`§3.2`) demands an actual in-app 400% arm; not probed this session. Reproduction: NONE. |

---

## Negative proof — what is genuinely sound

Recorded so the next seat does not re-litigate it:

- **Reduced motion is correct.** `--stagger-base` is consumed only inside
  `@media (prefers-reduced-motion: no-preference)` (`animations.css:43-54`), so the `220ms`
  orchestration pushed from `ColorPicker.vue:66` is inert under PRM; `header.css:136-143` collapses
  the condense transitions to `0.01ms` while keeping the layout state, which is exactly the right
  treatment for a designed state that happens to animate.
- **The inert-Blob leaf really landed.** `HeroBlob.vue:10` — `aria-hidden="true"` +
  `pointer-events-none`; measured `zIndex: 20` from the named `--z-ornament` tier.
- **Landmark count is right.** `document.querySelectorAll('main').length === 1`.
- **The specimen carries no Copy.** `[aria-label*="copy" i], [title*="copy" i]` inside the picker
  card → 0 matches. PR-13's specimen arm is clean.
- **The debug overlay is properly gated.** `PointerDebugOverlay.vue:4` is `v-if="debug.state.enabled"`;
  live `[class*="debug"]` node count = 0. It ships in the template but paints nothing.
- **`verbatimModuleSyntax` is satisfied.** Both type-only imports are `import type`
  (`ColorPicker.vue:125,128`); every other import is a value import.
- **Vue 3.5 idioms are present.** `useTemplateRef` ×2 (`186,189`), `shallowRef` for the pre-edit
  snapshot (`272`), and the `defineModel` round-trip is deliberately avoided in favour of the
  injected App-owned `ShallowRef` (`166-173`) — the comment even names the read-after-write
  staleness it dodges. This is the file's best decision.
- **No horizontal overflow.** `scrollWidth − clientWidth = 0` at 1440 and 390.
- **Global keyframes live where they should.** `seat.css` / `header.css` / `overture.css` are
  colocated global sheets with template-unique selectors; nothing was deleted, only moved
  (owner edict 6 respected).

---

## Is the W48 spec still correct against today's tree?

Mostly yes, with three corrections it must absorb before it executes:

1. **The `seat.css:88` anchor is off by one and points at the wrong axis** (D-19).
2. **The cure ordering is inverted for the desktop arm** — at 1440 the Blob minimum contributes
   0px and the readout lock contributes 54.9px (D-02). A wave that deletes the Blob reservation
   first and calls PR-01 half-closed will have moved nothing on desktop.
3. **`PROPORTION-AUDIT §2` ruling 2 rests on the false premise "Picker no longer nests a Card"**
   (D-08). Picker nests one today (`ComponentSliders.vue:25`), and the outer plate is a `Card`
   rather than the `InstrumentChassis` §3.1 binds it to — while glass-ui 7.0.0 ships
   `./instrument-chassis`. The chassis transposition is a prerequisite for `--instrument-title-gap`
   to exist at all; today it computes to `""`.

Everything else in W48 — A137, A138, `hide-indicator`, the `contenteditable` deletion, the paired
P019 clamp, the Blob `b₀` proof — I confirm as still born-RED on disk at `c654824e`.

---

## The gestalt cure

The apportionment above points at one root, not twenty. **`ColorPicker.vue` is a chassis composed
out of the wrong primitive, and its headline is doing three jobs at once.**

- The headline is simultaneously the *document heading* (`<h3>`), the *numeric editor*
  (`contenteditable`), and the *specimen readout*. Every BLOCKER except D-04 is a consequence of
  that fusion: the heading defect (D-07), the write-path corruption (D-01), the reservation void
  (D-02, which exists only because a *display* surface was made to reserve *editing* worst-cases),
  and the keyboard-parity hole (D-03, whose tab stops 2-4 are the editor that should not exist).
  **Split it into three:** route `<h1>` owned by the shell; `<output>` for the projection; the BI
  `Slider` axis composition as the sole editor.
- The plate is a `Card` standing in for `InstrumentChassis`, with a second `Card` nested inside it.
  That is why the P122 gap token is undefined, why the seam is a local `cqi` mint, why the type
  pair is two independent clamps instead of one paired clamp, and why a 50/50 grid never had a
  protagonist to defend. **Transpose to the producer chassis** and the proportion, gap and pair
  rows collapse into token consumption rather than five separate local cures.

Neither is a patch. Both are transpositions the canon already specifies and the producer already
ships.

---

*Written by the CHALLENGE-D seat. No source file was edited; this formation lands no source
changes. Every number above is a live measurement at HEAD `c654824e` or a quoted line from the
tree, except the two rows explicitly labelled hypotheses (RTL, 400% zoom).*

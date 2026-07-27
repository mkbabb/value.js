# JUROR-3 — DESIGN, GESTALT, AND PERFORMANCE

**Subject:** `demo/scenes/ConfigSliderPane.vue` (252 lines) · consumers `demo/scenes/atmosphere/AuroraPane.vue`
(3 sliders + 4 slot rows) and `demo/scenes/blob/BlobPane.vue` (31 sliders).
**Repository:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
**Seat:** the whole, as experienced. I own the design verdict, the motion verdict and the performance verdict.

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier declared at
spawn under mega-tranche mark M-1/M-2. The seat is declared, not inherited. No Fable seat participated in
this adjudication.

---

## PART 0 — Witness manifest

Everything below is either a byte I read, a pixel I looked at, or a number I measured. Nothing is inferred
from a challenger's report without independent confirmation.

**Frames I viewed with my own eyes** (not summarised from `REPORT.json`):

| Frame | What it decided |
|---|---|
| `visual/shots/safari-desktop-light/blob.png` | the two-population contrast; the inert-slab reading; the nested well |
| `visual/shots/safari-desktop-dark/blob.png` | the figure/ground inversion — the tracks are the brightest objects on the card |
| `visual/shots/safari-mobile-dark/atmosphere.png` | the amputated `Noise 0.500` row; the two row species; FIELD ≡ HARMONY |
| `visual/shots/zoom-200-desktop/blob.png` | the configurator is absent and a `Picker \| Blob` toggle stands in its place |
| `visual/shots/keyboard-focus-desktop/blob.png` | focus on a 12px thumb, ordinary light |
| `visual/shots/forced-colors-desktop/blob.png` | **this frame is a false witness** — it renders the ordinary light composition in full colour |
| `visual/shots/rtl-desktop/blob.png` | the half-mirrored row; `Reset` promoted to the leading action |
| **`ConfigSliderPane/probes/j3-forced-blob.png`** (cut by me, Chromium, real forced colours) | **the controls are not there** — see §I.6 |

**Probes I ran** (Chromium 1.60.0 against the live dev server at `http://localhost:9000`, HTTP 200).
Both are committed beside this report so every gate command below is runnable as written:

- `docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/j3-probe.mjs` → `probes/j3-out.json`
  — composition rects, geometry, computed type, contrast, scroll, reserved-width, forced-colors, focus,
  rAF/motion, drag latency, narrow arms. Also emits `probes/j3-forced-blob.png`.
- `.../probes/j3-fix.mjs` → `probes/j3-fix.json` — the corrective arm: **alpha-composited** divider contrast
  (my first pass composited a translucent border over `#000` and produced a wrong number — see DISMISS-1),
  correctly-scoped a11y structure census, and the `/#/atmosphere` composition.

**Engine note that is load-bearing for this seat.** The tracked `forced-colors-desktop` matrix ran on
WebKit (`visual/states.mjs:14`, `ENGINE` defaults to `webkit`). WebKit ignores Playwright's
`forcedColors`, and the harness says so at its own line 8. I re-ran that arm in Chromium and measured
`matchMedia("(forced-colors: active)").matches === true`. Every forced-colors number in this report is
from the Chromium arm. **The tracked forced-colors frame proves nothing and must be re-cut.**

---

# PART I — THE GESTALT READING

I looked at the frames before I read the challenges. This is what the component actually is, as
experienced, in its page.

## I.1 · The route has no subject

Open `/#/blob` at 1440×900. The canon (`OPTICAL-BENCH-COMPOSITIONS.md:47`) says:

> **Blob** | P122 `preview-dominant`: container-scaled material preview 66.6666667%; morphology/disclosure
> inspector 33.3333333%; no Picker diameter inheritance.

and `VISUAL-CONSTITUTION.md:29` law 3 says:

> Configuration panes show preview first, controls second. **Atmosphere/Blob preview area is larger than
> the form at every desktop size.**

Measured, on today's tree:

```
main                      1408.0 px
.pane-wrapper--left        512.0 px @ x=199   →  36.4% of main
.pane-wrapper--right       512.0 px @ x=729   →  36.4% of main
left : right                                  →  50.0% / 50.0%
```

The split is **50/50**, which is neither `golden` (61.8/38.2) nor `preview-dominant` (66.7/33.3). But the
ratio is the smaller half of the problem. The left pane — the protagonist slot — **is the ColorPicker**:

```
demo/shell/viewSchema.ts:179-186
    blob: { left: "color-picker", right: "blob", label: "Blob",
            leftLabel: "Picker", rightLabel: "Blob", ... }
```

The only blob material painted anywhere on the route is a **180.2 × 180.2 canvas at (564.6, 114.2)** —
the picker's inline bead, the one visible in the top-right corner of the picker card in
`safari-desktop-light/blob.png`. Its area is **32,472 px²**. The configurator pane is
512 × 774 = **396,288 px²**.

> **preview : form = 32,472 : 396,288 = 8.19%.**
> The canon requires preview > form. The rendered relation is inverted by **12.2×**.

This is the finding that decides the seat, and no challenger stated it. D-2 and L-10 found its narrow
half; `PROPORTION-AUDIT.md:54` PR-10 books the family ("Atmosphere/Blob form acreage exceeds preview").
Neither says the plain thing: **on the Blob workbench there is no blob.** The route is a form beside a
different instrument, and the thing the form configures appears only as an ornament inside that other
instrument. Every subordinate question — track material, row rhythm, disclosure depth — is downstream of a
composition that has no specimen to be subordinate to.

Atmosphere is *not* guilty of the same thing, and the distinction matters for the cure. Its
`viewSchema` row is `{ left: "atmosphere", right: null }`; measured, it renders as a single 1042 px region
and its preview is the full-bleed ambient ground (`canvas 1440×900` at the document root), which
`VISUAL-CONSTITUTION.md:214` explicitly blesses ("Aurora/boot owns the permanent chromatic CSS ground").
Atmosphere's composition is defensible. **Blob's is not.** One generic pane, two compositions, and only
one of them has a protagonist.

## I.2 · The control is a bar that does not move

This is the thing you see first in every frame, and it is the reason the component reads as broken even
to someone who cannot name why.

In `safari-desktop-light/blob.png`: seven uniform charcoal slabs, each spanning the full row width, each
with a small hollow lozenge somewhere along it. `Body Radius 0.220` and `Satellites 3` are — pixel for
pixel — the same object. In `safari-desktop-dark/blob.png` the same slabs render near-**white**: they are
the brightest objects in the card, brighter than the word "Blob". In `safari-mobile-dark/atmosphere.png` a
single such slab is the brightest object on the entire phone screen.

Measured on `/#/blob`, first row (`Body Radius`, def `min 0.08, max 0.45, step 0.005`, value `0.220`):

```
.slider-track   432.0 × 24.0   background-color oklch(0.447121 0.00386159 34.63)   background-image none   border-width 0px
.slider-range   163.5 × 24.0   background-color rgba(0, 0, 0, 0)                   background-image none   opacity 1
[role=slider]    12.0 × 24.0   background-color rgba(0, 0, 0, 0)
```

The arithmetic is the whole finding:

```
declared value fraction   (0.220 − 0.08) / (0.45 − 0.08)  = 0.378378
rendered range fraction    163.5 / 432.0                  = 0.378472
                                                     Δ    = 0.000094
```

> **The producer computes the value to five significant figures, lays it out to within one ten-thousandth,
> and then paints it with `rgba(0,0,0,0)`.**

The information exists. It is measured, positioned, and thrown away at the last step. What remains is a
12 px transparent thumb — and an inert 432 × 24 px slab, **10,368 px²**, painted from a certified *text*
ink:

```
demo/scenes/ConfigSliderPane.vue:202
    --slider-track-bg: var(--ink-muted, var(--muted-foreground));
```

Contrast against the well, measured by 1×1 canvas round-trip:

| surface | light | dark |
|---|---:|---:|
| inert track vs well | **5.82** | **8.30** |
| row label vs well | 13.52 | 9.28 |
| live readout vs well | **5.82** | **8.30** |
| section heading vs well | 5.08 | 5.97 |
| painted value extent vs well | **1.00** | **1.00** |

Read that table as a designer, not as an auditor. In dark mode the **inert** part of the control sits
within one stop of the row label and **2.3 stops above the section heading**, while the **live** part
measures 1.00 — no contrast at all, because it is not painted. And the track wears *the same ink as the
live number beside it* (5.82/5.82, 8.30/8.30 — identical token, `ConfigSliderPane.vue:202` and `:204-206`).
The loudest object in the row carries no information; the quietest carries all of it.

Figure and ground have inverted. The eye reads the dark bar as "the filled part", so every slider reads as
**100 %**, and the thumb reads as a hole punched in it rather than a position. That is why
`Body Radius 0.220` and `Satellites 3` are indistinguishable: they *are* indistinguishable, and the only
recovery is to read the 11 px number.

`PROPORTION-AUDIT.md:73` law 8 was written for exactly this:

> Real rendered relation wins over token intent. … token presence alone cannot close a row.

The component's own comment (`:190-201`) closes the row on token presence — it names `--ink-muted` "the D6
contract's stamped token … ≥3:1 on the well by construction" and ships. The token is certified. The
*relation* is a 10,368 px² lie.

## I.3 · Two species of row in one pane

`safari-mobile-dark/atmosphere.png` shows both at once, which is why it is the most damning frame in the
set. Four rows read `HARMONY / Analogous`, `ARRANGEMENT / Scattered`, `MEDIUM / Smooth`, `MOTION / Drifting`
— mono, uppercase, tracked, muted, sitting directly on the Card. Below them, inside a visibly darker inset
panel at a different indent, `Colour Energy 0.760` — sans, mixed case, bright. Two grammars, two materials,
two indents, in one pane, under one header.

And the section heading of the second species — `FIELD` — is *computed-identical* to the control labels of
the first. I measured all six properties:

| | `.config-section-title` | `.aurora-row-label` |
|---|---|---|
| font-family | Fira Code | Fira Code |
| font-size | 16.4px | 16.4px |
| text-transform | uppercase | uppercase |
| letter-spacing | 1.64px | 1.64px |
| color (light) | rgb(112, 89, 66) | rgb(112, 89, 66) |
| font-weight | 400 | 400 |

A group heading and a peer control label are the same object. In the frame, `FIELD` and `HARMONY` are
indistinguishable — one names a section, the other names a select, and nothing in the render says which.

The select column is also ragged: `Analogous`, `Scattered`, `Smooth`, `Drifting` each begin at a different
x because the slot rows use `justify-content: space-between` rather than a shared column. Four controls,
four left edges.

The licence for all of this is one line: `ConfigSliderPane.vue:110`, a bare `<slot />`. The pane owns a row
grammar and a heading grammar and exposes neither, so the consumer re-minted the nearest recipe it could
see — `AuroraPane.vue:194-199` is a byte-copy of `ConfigSliderPane.vue:237-243`. The duplication is the
tell.

## I.4 · The type matrix, measured

`VISUAL-CONSTITUTION.md:66-78` is a **closed** matrix. Measured on `/#/blob`, light:

| role | canon requires | rendered | verdict |
|---|---|---|---|
| section heading | `text-heading` · Plus Jakarta Sans | **Fira Code** 16.4px 400 uppercase ls 1.64px | breach |
| control label | `text-small` · PJS **non-bold** | Plus Jakarta Sans **16.4px weight 500** | breach (size + weight) |
| value / provenance | `text-mono-small` or `mono-caption` · Fira Code | Fira Code **11px**, `font-variant-numeric: normal` | breach (rung + figures) |

Two consequences the table does not show:

1. **`section heading 16.4px === row label 16.4px`.** There is no size step between a group and its
   members. The only thing separating them is case and family — and the family is backwards, because the
   *mono* voice is doing the heading job at 16.4px while the *data* it groups renders at 11px. Mono is
   louder as a label than as a number.
2. `VISUAL-CONSTITUTION.md:78` requires: "Live numbers use tabular figures and reserve their widest legal
   representation so value changes never reflow the settled chassis." Measured by in-place text
   substitution on the shipped readout:

```
shipped  "0.220"     33.9 px
narrowest "3"          6.8 px
widest    "-0.0005"   47.4 px
                swing 40.6 px   (= 120% of the element's own shipped width)
font-variant-numeric: normal
```

Every slider whose range contains an integer flips its readout between 5 characters and 1 mid-drag. The
value jitters horizontally while you are dragging the thing that changes it.

## I.5 · Depth without disclosure

```
.pane-scroll-fade   scrollHeight 2611   clientHeight 695   = 3.76 screens
mask-image: none    -webkit-mask-image: none
31 rows, 7 sections, flat
```

The canon does not permit this composition. `OPTICAL-BENCH-COMPOSITIONS.md:47` gives Blob the mobile
sequence `preview; essentials; advanced/reset/compare`; `VISUAL-CONSTITUTION.md:214` requires "compact
essential morphology controls, advanced grouped disclosure, reset/compare and a scroll-confined
inspector". None of the three exists. `SliderSection` is `{ title, defs }` — there is no axis on which to
express `essential` vs `advanced`, so the required composition is **unrepresentable by any consumer**.
That is what distinguishes this from a missing feature.

The scroll edge is a hard clip: measured `mask-image: none`, on a class named `pane-scroll-fade`, under a
comment at `:104-106` that says "The scroll region owns the fade mask". You can see the consequence in
`safari-mobile-dark/atmosphere.png` — `Noise 0.500` has its label and its control amputated at a hard
edge with no affordance that anything continues.

## I.6 · The forced-colors frame, and what it hides

`forced-colors-desktop/blob.png` shows a full-colour pink aurora, a pink `Login` pill, and the picker's
chromatic ramps. Under real forced colours none of that survives. The frame is the ordinary light
composition. It is a **false witness**, and it is the reason this class of defect accumulated unchallenged.

Chromium, `forcedColors: "active"`, `/#/blob`:

```
matchMedia("(forced-colors: active)").matches   true
.slider-track  background-color   rgb(255, 255, 255)
.config-console background-color  rgb(255, 255, 255)      → trackEqualsWell: true, ratio 1.00
.slider-track  border-width       0px
.slider-range  background-color   rgba(0, 0, 0, 0)        (width still 163.5 of 432)
.config-section-header border-bottom-color  rgb(0, 0, 0)
focused [role=slider] "Body Radius":
   outline-style  "none"      (outline-width 3px, but style:none paints nothing)
   box-shadow     "none"      (forced colors strips shadows)
```

So in forced colours: **the control has no extent, no border and no fill — and the focused control has no
focus indicator at all.** The single element that survives in the whole pane is the section rule that the
binding boundary inventory forbids. That is a precise inversion of design priority, and it fails
`VISUAL-CONSTITUTION.md:84` verbatim ("Focus remains visibly distinct … forced colors") and WCAG 1.4.11.

**Then I cut the frame the tracked matrix never cut** — `probes/j3-forced-blob.png`, Chromium, real
forced colours — and it is worse than the numbers. In the Blob pane there are **no sliders**. `Body Radius
0.220` is followed by empty white space containing one 12 px hollow lozenge. `Satellites`, `Sat Radius`,
`Orbit Radius`, `Eccentricity`, `Smooth K`, `Warp` — seven labels, seven values, and seven orphan lozenges
floating in nothing. There is no rail to read them against, so the lozenges do not even read as positions.

And the frame carries its own control. **In the same image, the picker's `L / a / b / α` channel sliders
render perfectly** — bordered pill tracks with clearly seated thumbs — because that population's rail
carries a border that survives the override. One screen, one forced-colors mode, two slider populations:
one fully legible, one erased. The forbidden `GEOMETRY` and `MEMBRANE` rules are crisp black, the loudest
things in the pane.

That within-frame comparison is the strongest single piece of evidence in this adjudication, and it exists
only because the tracked witness was re-cut on the correct engine.

The mechanism is single-channel semantics: the control's entire visual definition routes through one
`background` custom property, and focus routes through one `box-shadow` with `outline-style: none`. Forced
colours overrides the first and deletes the second. There is no second channel.

## I.7 · Motion verdict

I own this. Measured on `/#/blob`, Chromium, instrumented `requestAnimationFrame`:

| arm | rAF/s (2 s sample, ≥5 s after networkidle) | running animations | animations inside `.config-console` |
|---|---:|---:|---:|
| ordinary | **144.0**, **112.0** (two runs) | 4 | **0** |
| `reducedMotion: "reduce"` | **0.0**, **0.0** (two runs) | 3 | **0** |

The ordinary arm varies with machine load; the finding does not depend on the exact rate, only on
`rate > 0` sustained past five seconds. The reduced arm is **exactly 0.0** on every run.

Two results, and they point opposite ways.

**Sound:** reduced motion resolves to a still frame — `rAF/s → 0`. `VISUAL-CONSTITUTION.md:144` is met.
This is negative evidence and I record it as a result: **there is no PRM defect here.**

**Defective:** `VISUAL-CONSTITUTION.md:145` — "Continuous Aurora/Blob ambient motion terminates within
five seconds **or** exposes one persistent keyboard-operable still/pause control whose state is announced
and remembered." Measured: motion does not terminate (144 rAF/s sustained through a sample taken >5 s
after settle), and a census of every `button`/`role=switch`/`role=checkbox` on the route matching
`/pause|still|stop|motion|animate/i` returns **0** on `/#/blob`. (The census returns 1 on `/#/atmosphere`,
but that match is the `MOTION` select's own label — `AuroraPane.vue:169`, whose options are
`drifting`/`breathing`, not a still state. Neither route has a pause control.)

Whose defect is it? The renderer's motion is not this component's — but `VISUAL-CONSTITUTION.md:214` gives
the Blob workbench "reset/compare" as its action region, and a still/pause control is the same kind of
object in the same region. **The pane's action bar is where it belongs.** I book it here rather than
deferring it to the renderer.

**Also mine, and I record it as an absence rather than a defect:** `grep -n "transition\|animation\|@keyframes"
demo/scenes/ConfigSliderPane.vue` returns zero hits, and `getAnimations({subtree:true})` inside
`.config-console` returns 0. The pane has no motion vocabulary at all. Edict 6 is **not** violated —
nothing was deleted; there was never anything. Calm is correct for a 31-row console. But the disclosure
this component must grow (I.5) and the scroll fade it already claims both need motion, and both must come
from the producer's PRM-guarded register (`VISUAL-CONSTITUTION.md:139`), not from new demo keyframes.

## I.8 · Performance verdict

I own this too, and I am going to be unhelpful to the prosecution.

40 `ArrowRight` dispatches on the first config thumb, timed dispatch → first `MutationObserver` callback on
`.config-console`, 31 rows live:

| arm | n | median | p95 | max |
|---|---:|---:|---:|---:|
| `/#/blob` ordinary, run 1 | 40 | **6.9 ms** | 9.3 ms | 9.5 ms |
| `/#/blob` ordinary, run 2 | 40 | **8.4 ms** | — | — |
| `/#/blob` reduced-motion | 40 | 6.6 ms | 8.0 ms | 8.1 ms |

> **There is no performance defect in this component.** Every sample across both runs is inside a 16.7 ms
> frame with ≥7 ms of headroom, at the pane's worst case (31 rows, every one re-rendered per keystroke,
> every one re-creating a single-element array literal at `ConfigSliderPane.vue:147`).

C-12 reported this honestly as INFO with a number, and it is correct: ~43 µs/row of dot-path resolution in
the render function. Real, measurable, and not worth a line of code on its own. It disappears for free
when the typed lens replaces the reflection layer. **I RETIRE it as a standalone defect** and record the
measurement so no later seat can promote it without producing a bigger number than mine.

One genuine performance observation that is *not* about latency: the pane mounts **31 live slider
components** for a composition the canon says should show "compact essentials" with the rest in a
disclosure. The disclosure cure (I.5) is therefore also the performance cure — it is the only change in
this whole report that reduces mounted component count, and it does so by roughly 4×. That is the right
reason to want it; the wrong reason would be the 43 µs.

## I.9 · Narrow, and the toggle

At **390 × 844** (DPR 3) and at **720 × 450 DPR 2** (the harness's 200 %-zoom arm, `states.mjs:21-22`),
navigating to `/#/blob`:

```
location.hash            "#/blob?space=lab&color=lab(92%25+88.8+20+/+82.7%25)"
.config-console present   false
.configurator-row count   0
aria-pressed census       [ {text:"Picker", pressed:"true"}, {text:"Blob", pressed:"false"} ]
```

The URL says `blob`. The pressed state says `Picker`. The route renders the pane it is not named for, and
recovery is a global two-item pane toggle — precisely the element `OPTICAL-BENCH-COMPOSITIONS.md:115`
enumerates as a live defect ("A frame showing … a **global pane toggle** … is a live defect"),
`VISUAL-CONSTITUTION.md:32` law 6 retires ("no global pane selector … survives"), and
`OPTICAL-BENCH-COMPOSITIONS.md:107` P092 already declares dead ("The global narrow `PaneSegmentedControl`
and left/right view state are retired because all mobile compositions are single sequences").

You can see it in `zoom-200-desktop/blob.png`: the whole frame is the Picker, and the dock carries
`Picker | Blob` with Picker lit.

---

# PART II — ADJUDICATION

Fifty-one accusations arrived across three reports. They describe **eighteen** mechanisms. I merge, uphold,
dismiss, and dispose every one. No row says "next tranche decides".

## II.1 · Upheld

Status key: `UPHELD_REPRODUCED` = I reproduced it myself on today's tree. `UPHELD_BY_BYTES` = the source
bytes or a quoted binding clause settle it without a runtime repro. `HYPOTHESIS` = asserted without a
reproduction, or reproduced only from an injected state.

---

### **J3-01 · BLOCKER · The control paints no value** · `UPHELD_REPRODUCED` · **BUILD**

*Merges* D-3, D-14, D-4, L-6, C-3 — five accusations, one mechanism.

`ConfigSliderPane.vue:146` declares `variant="spectrum"`, the producer's chromatic-rail recipe, whose
`.slider-range` is transparent **by design** because a gradient track carries the value read
(`glass-ui.css`: `.glass-slider[data-variant=spectrum] .slider-range { background: 0 0 }`). The pane never
supplies a gradient. It then re-inks the now information-free track from a text ink (`:202`) and re-inks
the live readout from the same token (`:204-206`).

My reproduction, §I.2: range width fraction `0.378472` vs declared value fraction `0.378378` (Δ 0.000094),
painted `rgba(0,0,0,0)`, `background-image: none`; inert track 5.82:1 light / 8.30:1 dark; painted extent
1.00:1 in both.

Binding clauses breached: `VISUAL-CONSTITUTION.md:104` — "a color-bearing **or neutral** track chosen by
semantics … feature waves own their domain arrangement, **not new slider mechanics**". `:7` — the spectral
meniscus is "reserved for genuinely chromatic continuous domains — Picker and Gradient"; the domains here
are Body Radius, Smooth K, Rim Power, Merge (ms), Zones. `PROPORTION-AUDIT.md:73` law 8.

**This was diagnosed twice and cured neither time** — `docs/tranches/N/audit/lanes2/U-CONTROLS.md:54` and
`docs/tranches/N/waves/N.W13.md:28` ("a spectrum slider with no spectrum"). The T.W8 cure at `:190-202`
fed the variant an ink instead of retiring the variant. That history is why this is a BLOCKER and not a
MAJOR: the mechanism has already survived two cures aimed at its symptom.

**Cure — a net deletion.** Drop `variant="spectrum"`; delete `:202` and `:204-206`. The producer's default
Slider paints `.slider-range` from its own tokens; the fill becomes the ≥3:1 object and the track returns
to a quiet groove. The contrast problem the re-ink was invented for stops existing.

---

### **J3-02 · BLOCKER · Single-channel semantics: no control and no focus in forced colours** · `UPHELD_REPRODUCED` · **BUILD**

*Upholds* D-1, with its evidentiary claim corrected (DISMISS-4).

Reproduced in Chromium, §I.6: `trackEqualsWell: true` (ratio 1.00), `border-width: 0px`,
`.slider-range` transparent, focused thumb `outline-style: "none"` and `box-shadow: "none"`. The forbidden
section rule at `rgb(0,0,0)` is the only surviving element.

**Frame evidence, cut by me:** `probes/j3-forced-blob.png` shows seven labelled rows with **no control at
all** — seven orphan 12 px lozenges on white — while the picker's four channel sliders in the same frame
render as legible bordered pills. The severity is not "low contrast"; it is **absent control**.

Breaches `VISUAL-CONSTITUTION.md:84` and WCAG 1.4.11/2.4.11. `grep -rn forced-colors demo/scenes/` → zero
hits.

**Distinct from J3-01** and must be booked separately: even after the range paints, a `background`-only
fill and a `box-shadow`-only focus both still vanish under forced colours. The cure is a producer arm on
glass-ui's Slider — `border: 1px solid` on `.slider-track`, `.slider-range { background: Highlight;
forced-color-adjust: none }`, and `outline` (not `box-shadow`) for `:focus-visible`. Edict 4/5: producer,
not consumer.

---

### **J3-03 · BLOCKER · The Blob workbench has no blob** · `UPHELD_REPRODUCED` · **BUILD**

*Juror-originated.* Absorbs D-2 and L-10 as its narrow half; supersedes their framing.

Measured, §I.1: 50.0/50.0 split where canon binds 66.7/33.3; the protagonist slot holds the ColorPicker
(`viewSchema.ts:179-186`); preview : form = **8.19 %** where canon requires preview > form. At ≤1024 px
the route renders the pane it is not named for behind a canon-forbidden global toggle (§I.9).

Breaches `OPTICAL-BENCH-COMPOSITIONS.md:47`, `:115`; `VISUAL-CONSTITUTION.md:29` law 3, `:32` law 6,
`:214`; `PROPORTION-AUDIT.md:54` PR-10.

This is the seat's central finding. Every other design cure in this report is subordinate to it: an
essentials/advanced disclosure is only meaningful as the 33.3 % inspector *beside a preview*; a "compact
essentials" region has no meaning in a 50 % column with no specimen to compact toward.

---

### **J3-04 · BLOCKER · Reset is destructive, unconfirmed, uncompared — and destroys nested live state** · `UPHELD_REPRODUCED` (by C's probe) · **BUILD**

*Merges* C-1, L-1, D-10, C-4, L-12 — the correctness break and the design absence are one object.

`ConfigSliderPane.vue:92-94`: `Object.assign(config, structuredClone(defaults))` is depth-1. It preserves
runtime state at depth 1 (AuroraPane's `seed`, absent from defaults) and destroys it at depth 2:
`color.paletteStops` lives inside a `color` key that **is** on defaults, so one click replaces the live
picker-derived ramp `["#ffbde0","#ffdde5","#fff6f6","#fff6f4"]` with the canned
`["#b5947f","#d4b27d","#dad6b1"]`. The writer (`useAtmosphere.ts:389-403`) is keyed on the colour string,
so the picker→blob link stays severed until a *different* colour is picked. Both consumer files declare in
prose that this state must survive Reset (`BlobPane.vue:8-9`, `aurora-atoms.ts:17-20`). The implementation
honours that promise only by accident of nesting depth. I accept C's measured before/after transcript; the
mechanism is legible in four lines of source and I did not need to re-run it.

The design half is mine and I measured it: **`aria-live` regions inside the pane and its action bar: 0.**
Copy JSON has no success, failure or pending truth and swallows `writeClipboard`'s two-state `CopyResult`
(`:88-90`). Reset has no confirmation, no announcement, no undo and no compare. `OPTICAL-BENCH-COMPOSITIONS.md:47`
requires a `compare` region; `VISUAL-CONSTITUTION.md:101` requires persistent operation state;
`PROPORTION-AUDIT.md:52` PR-08 is the standing row; `VISUAL-CONSTITUTION.md:96`'s
`select → tune → commit` has no commit stage here — every drag writes straight into the injected config.

BLOCKER because it silently destroys user state with no undo and no announcement.

---

### **J3-05 · MAJOR · The closed type matrix is breached in three roles, with no size step** · `UPHELD_REPRODUCED` · **BUILD**

*Merges* D-7 with the heading half of D-13. Measured table at §I.4: section heading is Fira Code 16.4px
where canon binds PJS `text-heading`; control label is PJS 16.4px **weight 500** where canon binds
`text-small` non-bold; value is 11px where canon binds `text-mono-small`/`mono-caption`. Section heading
size **equals** row label size. `.config-section-title` and `.aurora-row-label` are computed-identical on
all six properties.

Breaches `VISUAL-CONSTITUTION.md:66-78` (closed matrix) and `PROPORTION-AUDIT.md:78` law 13.

---

### **J3-06 · MAJOR · The live value has no reserved width and no tabular figures** · `UPHELD_REPRODUCED` · **BUILD**

*Upholds* D-11. Measured, §I.4: `font-variant-numeric: normal`; in-place swap between the narrowest and
widest legal representations moves the element **40.6 px** — 120 % of its shipped width. Precision is
derived from the value (`fmt`, `:84-86`) rather than from the statically-known `step`, so `noiseFreq`
(step 0.1) renders `0.500` — two digits of false precision — and every range containing an integer flips
between 5 chars and 1 mid-drag. No `unit` field exists, so `Merge (ms)` smuggles its unit into the label
while `Hue Range` (degrees) has none.

Breaches `VISUAL-CONSTITUTION.md:78` verbatim and `:124` ("announce label, value, **unit**").

---

### **J3-07 · MAJOR · Two nested bounded shells where the binding Card count is 0** · `UPHELD_REPRODUCED` · **BUILD**

*Merges* D-8, L-14. `ConfigSliderPane.vue:99-101` roots a `<Card tier="resting">`; `:122` nests
`.console-well` (`foundation.css:350-354`: background + `1px solid --card-edge` + `--radius-panel`).
Measured ancestor walk from `.console-well`: `["glass-resting card rounded-card text-card-foreground …"]`
— a bounded, radiused, bordered sub-card inside a glass card. Visible as such in both desktop frames.

`OPTICAL-BENCH-COMPOSITIONS.md:67`: "the other sixteen compositions have Card count `0`"; `:46` Atmosphere
"form sections not Cards"; `:47` Blob "no settings Card stack". `VISUAL-CONSTITUTION.md:19`: "One surface
has one tier. An inner card is not automatically another pane of glass." `:38`: "value.js composes regions
with domain content; it does not clone a local chassis recipe." `PROPORTION-AUDIT.md:66` law 1.

`foundation.css:339-348` concedes the point in its own comment — `.console-well` is an "INTERIM demo class
— swaps onto the producer `.glass-well` rung when packet P3 ships". An interim class with a booked swap is
a dual path (edict 2).

---

### **J3-08 · MAJOR · Eight dividing lines where the binding inventory is `none` — and seven of them are invisible** · `UPHELD_REPRODUCED, mechanism corrected` · **BUILD**

*Upholds* D-6's count; **dismisses its asymmetry claim** (DISMISS-1) and replaces it with a stronger one.

Measured: `.config-section-header` × 7 + `.config-action-bar` × 1 = **8 lines** on `/#/blob`.
`OPTICAL-BENCH-COMPOSITIONS.md:80-81` gives Atmosphere and Blob `Retained non-P122 dividing line: none`;
`:90` — "Any additional line … is a defect". `VISUAL-CONSTITUTION.md:92` says the same from the producer
side. `PROPORTION-AUDIT.md:69` law 4: a divider is retained only when grouping would be ambiguous without
it — and the pane already separates sections with `gap-5` plus a distinct heading.

My corrected contrast numbers, compositing the translucent border **over the well** rather than over black:

| line | raw computed colour | composited vs its ground, light | dark |
|---|---|---:|---:|
| `.config-section-header` border-bottom (×7) | `color(srgb 0.778 0.7052 0.622 / 0.5)` | **1.24** | **1.29** |
| `.config-action-bar` border-top (×1) | `color(srgb 0.778 0.7052 0.622 / 0.35)` | **10.5** | 2.97 |

So the seven section rules are **forbidden and simultaneously too weak to do the grouping job they were
added for** — they cost a canon violation and buy nothing. The one line that is genuinely visible is the
action-bar rule at 10.5:1 in light, which is also the one the canon most clearly forbids: region presence
never implies a line, and the action bar is already separated by a material change at the well edge and by
the Dock pill's own geometry.

And under forced colours these forbidden lines are the **only** surviving element in the pane (§I.6).

---

### **J3-09 · MAJOR · No essentials/advanced/compare axis exists — 3.76 screens flat behind a hard clip** · `UPHELD_REPRODUCED` · **BUILD**

*Merges* D-9, D-17. Measured, §I.5: `scrollHeight 2611 / clientHeight 695 = 3.76 screens`, 31 flat rows,
`mask-image: none` on a class named `pane-scroll-fade`, under a comment claiming the mask exists.
`SliderSection` is `{ title, defs }` (`:36-39`) — no `rank`, no `collapsed`, no `compare`. The binding
composition is unrepresentable by any consumer.

Breaches `OPTICAL-BENCH-COMPOSITIONS.md:46-47` and `VISUAL-CONSTITUTION.md:51-52, 214`;
`PROPORTION-AUDIT.md:54` PR-10.

The class-name/comment drift (D-17) folds in here rather than standing alone: once the disclosure lands,
the fade is the correct affordance and the name becomes true. Fixing the name without the disclosure would
be cosmetic.

---

### **J3-10 · MAJOR · Ambient motion never terminates and no still control exists** · `UPHELD_REPRODUCED` · **BUILD**

*Juror-originated.* Measured, §I.7: 144 rAF/s sustained on `/#/blob` in a sample taken >5 s after settle;
pause/still control census = 0. Reduced motion correctly resolves to 0 rAF/s.

Breaches `VISUAL-CONSTITUTION.md:145`. Booked to this component because `:214` places `reset/compare` — the
same class of persistent workbench control — in this pane's action region.

---

### **J3-11 · MAJOR · No announcement, no grouping, 31 labels that label nothing** · `UPHELD_REPRODUCED` · **BUILD**

*Merges* C-2, C-6, D-15. My correctly-scoped census on `/#/blob`:

```
[role=slider] with empty aria-valuetext   31 / 31
[role=group] or <fieldset> in .config-console        0
headings (h1..h6 / role=heading) in .config-console  0
<label> elements that label nothing (no `for`, no wrapped control)   31 / 31
aria-live regions in the pane or its action bar       0
```

Screen readers announce the raw float (`0.2199999988079071`) while the eye reads `0.220`; the demo's own
cure for exactly this — `useSliderAnnouncements` (`demo/picker/controls/ComponentSliders/composables/`) —
was written for the picker's channel sliders and never consumed by the population the tranche docs call
"the app's SECOND slider population". Seven visually-grouped sections have no programmatic boundary
(WCAG 1.3.1). Clicking a row's label does nothing.

D-15 folds in: at `Satellites = 0`, five sliders (`satelliteRadius`, `orbitRadius`, `eccentricity`,
`mergeDuration`, `emergeDuration` — `BlobPane.vue:59-62, 111-112`) control nothing yet remain enabled,
focusable and draggable with live readouts. `SliderDef` has no `disabled` axis, so the state does not
exist in the model. `VISUAL-CONSTITUTION.md:83` requires disabled state to be explicit in role, name and
state — there is no state to be explicit about.

---

### **J3-12 · MAJOR · Two heavily-commented cures are provably inert, and the touch claim is false** · `UPHELD_REPRODUCED` · **BUILD**

*Merges* D-12, C-7, C-8, D-5, L-11.

The "ONE RHYTHM SOURCE" clamp (`:208-217`) never binds. Measured on `/#/blob`: container 512 px →
`min-block-size` resolves to **35.84 px**; rendered row height **60.97 px**. The clamp sits 25.13 px below
the row's natural content height. On `/#/atmosphere` the container is 1042 px → the clamp hits its 42 px
ceiling; the rendered row is **still 60.97 px**. Across a 2.03× container range the rendered rhythm does
not move by one pixel. The declared law is fixed, not container-scaled — the opposite of what
`VISUAL-CONSTITUTION.md:33` law 7 asks and of what the comment claims.

The `@media (pointer: coarse)` hit extension (`:218-230`) adds zero — the producer's slider root is already
44 px on coarse pointers, so `max(100%, 2.75rem)` always resolves to `100%`. And on `/#/blob` it is
unreachable anyway, because the pane does not mount at coarse-pointer widths (§I.9).

Meanwhile the comment at `:186-187` asserts a "≥44px touch rung" while every thumb measures **12 × 24 px**
in every matrix — 31 of the 39 small-tap-target rows `REPORT.json` flags on `/#/blob`, and half the WCAG
2.5.8 minimum on the inline axis. The guard is `pointer: coarse`, but WCAG 2.5.8 is not pointer-conditional,
so `pointer: fine` is uncovered entirely.

`PROPORTION-AUDIT.md:72` law 7 licenses the correct cure explicitly: "Visual glyph size, operable target
size and layout reservation are separate quantities." The target belongs to `--slider-thumb-size` /
producer seat geometry, unconditionally — `PROPORTION-AUDIT.md:56` PR-12 already owns the family.

Also folded: all three `:deep()` rules reach across the package boundary into producer internals
(`.font-mono` is a Tailwind utility emitted inside the producer's template, not a published hook), against
`ConfiguratorRow`'s own docstring and edict 5. `VISUAL-CONSTITUTION.md:89` says W17 deletes descendant
corrections.

---

### **J3-13 · MAJOR · The gate is vacuous — and worse, adverse to the correct cure** · `UPHELD_REPRODUCED` · **BUILD, FIRST**

*Upholds* C-10, sharpened with a finding of my own.

```
$ grep -rln "ConfigSliderPane|config-console|copyAsJson|resetDefaults" e2e/ test/ demo/test/
e2e/smoke/oracles/o7-card-census.spec.ts      ← EXCLUDES it by name (:38-42), substituting a grep
e2e/smoke/oracles/o18-contrast-census.spec.ts ← asserts computed colours only
```

Zero of 19 vitest files touch it. C's green-keeping mutations stand: replacing `update()` with a no-op
makes all 34 sliders read-only and every gate stays green.

**My addition, and it is the load-bearing one.** `o18-contrast-census.spec.ts:1161-1213` asserts
`.config-console .configurator-row .slider-track` ratio ≥ `GRAPHICS_FLOOR` on the well. Its own header
(`:1144-1156`) states it was "born red against the pre-cure `--secondary` track, green against the
`--slider-track-bg: var(--ink-muted)` re-ink". That gate:

1. measures the **wrong element** — it certifies the loudness of the part that carries no information and
   never asks whether the value position reads; and
2. is **adverse to the correct cure** — retiring the re-ink (J3-01) returns the track to the producer's
   neutral rung and will drive this gate RED *for the right reason*.

A gate that must be broken in order to fix the defect is not a vacuum; it is a lock. The wave must re-aim
it onto the `.slider-range` fill — which becomes the ≥3:1 object — before J3-01 can land.

---

### **J3-14 · MAJOR · A stringly-typed reflection layer erasing the types its consumers rebuild** · `UPHELD_BY_BYTES` · **BUILD**

*Merges* C-5, C-11, D-16, L-7, L-8.

`read()` (`:76-78`) casts a possibly-`undefined` path result to `number`; `fmt()` calls `.toFixed` on it in
the render function. `readPath` guards every hop; `writePath` (`:66-73`) guards none. The type permits the
missing state — `AuroraAtoms.zones` is optional and the def is `{key:"zones.count"}`
(`AuroraPane.vue:103`) — and `AuroraPane` guards that same key three lines away
(`:74` `atoms.zones?.arrangement ?? "composed"`). C reproduced the unmount from an injected type-legal
state; the boundary swallows it so completely that nothing reaches `console` or `pageerror`, which is why
`REPORT.json` reads 0 errors on both routes in all four matrices. **I label the crash arm a HYPOTHESIS**
(injected, not user-reachable today) and uphold the **asymmetry and the cast** on the bytes.

The prop contract is `Record<string, unknown>` (`:41-52`), so both consumers launder their real config
through `as unknown as` — four double-casts (`AuroraPane.vue:111,113`; `BlobPane.vue:124,126`) — and
`BlobPane.vue:36-48` spends a 13-line recursive mapped type reconstructing the key safety the pane threw
away. The contract types are exported from the `.vue`, so a consumer that only wants to *describe*
sections must import the component that renders them.

C-12's per-render path resolution (measured 43 µs/row, §I.8) disappears with the same cure.

---

### **J3-15 · MAJOR · A generic configurator hand-rolled over a design system that ships the configurator** · `UPHELD_BY_BYTES` · **BUILD**

*Merges* L-4, C-9, L-2, L-3, L-13.

`@mkbabb/glass-ui/configurator` exports `Configurator`, `ConfiguratorLayer`, `ConfiguratorRow`, the
size-axis provider, and `useConfiguratorState`. The pane consumes **one** and hand-rolls two, and its own
header comment (`:6-10`) names the surface and declines it. `ConfiguratorLayer` is precisely the
section-group wrapper — with a collapsible body (the disclosure J3-09 needs), a `dividers` prop (the lines
J3-08 must delete), and `role=button`/`aria-expanded`/`aria-controls` (the structure J3-11 lacks).
`useConfiguratorState<T>` is precisely the reset engine — typed config, `resetCurrent()`, `isDirty`, an
explicit `clone` hook and a try/caught `structuredClone` (the guard J3-04 omits). `Configurator`'s
`footer` slot already yields `{ reset }`. C10 A4 [P1] ADOPT (`docs/tranches/N/audit/lanes/C10.md:92-105,265`)
is the still-open book.

Riding with it: `demo/ui/` is 19 single-line alias barrels over glass-ui, and
`ConfigSliderPane.vue:16-23` uses **both paths in one eight-line import block** (`Button`/`Card`/`Slider`
via the shim; `GlassDock`/`ConfiguratorRow`/`writeClipboard` direct) — edict 2. `writeClipboard` comes
from the root barrel (25,239 B / 46 static chunk deps) when `./dom` (4,179 B / 6) is its home — edict 4's
subpath map made decorative.

**This is the architectural transposition, and it is a subtraction.** Composed whole, `ConfigSliderPane`
does not exist: each consumer becomes a `v-for` over its own sections inside `<Configurator>` /
`<ConfiguratorLayer>` / `<ConfiguratorRow>` with `useConfiguratorState` owning baseline and reset. J3-04's
BLOCKER becomes *inexpressible*, because the baseline is per-consumer and shape-aware by construction.

---

### **J3-16 · MINOR · RTL half-mirrors and promotes the destructive verb** · `UPHELD_BY_BYTES` · **BUILD**

*Upholds* D-18, with its geometry claim confirmed and its severity held at MINOR.

In `rtl-desktop/blob.png` the label/value pair mirrors correctly (label at the inline start, value beside
it) but the track does not: the `Body Radius` thumb sits at 38 % from the visual left in both directions.
`VISUAL-CONSTITUTION.md:124` says the numeric axis sign never mirrors, so the un-mirrored track is very
likely *correct* — but it is correct by accident, not by declaration, and `.glass-slider` already ships
`data-inverted` (which flips `--slider-range-origin`), so the axis direction is expressible and unexpressed.
The readout is not wrapped in an LTR-isolated span, against `VISUAL-CONSTITUTION.md:154`. And the action bar
renders `Reset` then `Copy JSON` — flex direction, not DOM role, decides which verb leads, so the
destructive one does.

---

### **J3-17 · MINOR · Dead declarations carrying live claims** · `UPHELD_BY_BYTES` · **BUILD**

*Merges* D-20, D-21, C-11(part). The header comment at `:3` documents a prop `extraControls?` that
`:41-52` never declares. The JSDoc at `:44` promises "Pass empty array to show empty state" and the
template has no `v-else` anywhere — with `sections: []` the pane renders header + slot and silently loses
Copy JSON and Reset too (`:119`, `:163`). `:98` carries `relative … mx-auto` on a `w-full` element and
`:101` a second `relative`, with no absolutely-positioned descendant in the SFC — residue of the floating
action bar the comment at `:159-162` records removing. Edict 2 applies to dead positioning contexts and
stale documentation as much as to shims. Latent, proven from the template.

---

### **J3-18 · MINOR · A truncating label with no fallback channel** · `HYPOTHESIS` · **FOLD → J3-14 (the schema)**

D-19 reproduced this only by substituting a longer string in place (`clientWidth 392, scrollWidth 413,
title null`, producer `truncate` class). Today's longest shipped blob label is `Click Impulse` (13 chars),
so the state does not fire in shipped content. I label it a hypothesis and fold it: the typed schema
J3-14 introduces is the natural home for a declared label budget, and a budget enforced at the producer row
is strictly better than a `title` attribute bolted on. It does not earn a row of its own.

---

### Retired

**C-12 · per-render path resolution · RETIRE as a standalone defect.** Measured: median 6.9 ms, p95 9.3 ms,
max 9.5 ms per keystroke at 31 rows — 7 ms of headroom inside a frame. ~43 µs/row. It is real and it is
not actionable on its own; it disappears for free under J3-14's typed lens. Rationale recorded with the
number so no later seat can promote it without beating 6.9 ms.

## II.2 · Dismissed

**DISMISS-1 · D-6's scheme-asymmetry claim** ("invisible in light (1.08:1), a hard rule in dark (5.03:1)
… a 4.7× swing for one element").

*Refuting bytes.* The border colour is **translucent** — computed
`color(srgb 0.778 0.7052 0.622 / 0.5)` in light and `color(srgb 0.3944 0.34 0.2856 / 0.5)` in dark. A 1×1
canvas contrast helper that fills black and then fills the colour composites it over `#000`, not over the
well, and therefore reports a fabricated luminance for any α<1 colour. Composited honestly **over the
well**, the section rule measures **1.24:1 light and 1.29:1 dark** — no asymmetry, no swing.

I hold myself to the same standard: my own first pass reported 5.22 light / 1.19 dark, inverted relative
to D's and wrong for the same reason. Both numbers are artifacts. The finding survives on the **count**
(8 lines vs a binding inventory of `none`), which needs no contrast number at all, and gains a better
mechanism (J3-08): the seven section rules are forbidden *and* too weak to group.

**DISMISS-2 · D-2's "unreachable" framing** ("the sole purpose of /blob is unreachable at mobile widths
and at 200% zoom").

*Refuting bytes.* Measured `aria-pressed` census at both 390×844 and 720×450 DPR2:
`[{text:"Picker",pressed:"true"},{text:"Blob",pressed:"false"}]`. A Blob affordance is present and one tap
reaches it. The pane is not unreachable. The defect is real but is a *different* defect — the route
renders the pane it is not named for, and the recovery mechanism is itself canon-forbidden. Upheld under
J3-03 with the corrected mechanism; the "unreachable" claim is dismissed.

**DISMISS-3 · L-16's Chromium route drift** (`/#/blob` landing on `/#/gradient` or on a degenerate
`oklch(none 0.2 30)` URL).

*Refuting bytes.* I navigated to `#/blob` in Chromium **eight** times across two probe files and six
contexts (light, dark, forced-colors, focus, motion ×2, 390, 720). The hash held every time; measured
`location.hash === "#/blob?space=lab&color=lab(92%25+88.8+20+/+82.7%25)"` at both narrow arms, and the
desktop arms mounted 31 rows in every scheme. The challenger labelled it a hypothesis itself. It does not
reproduce on today's tree from this seat and I dismiss it here — without prejudice to whichever seat owns
boot, which measures a different surface.

**DISMISS-4 · D-1's claim that the tracked forced-colors frame is "byte-comparable to the ordinary light
frame".**

*Refuting bytes.* `shasum shots/forced-colors-desktop/blob.png` = `c019adcb…` vs
`shots/safari-desktop-light/blob.png` = `276bd805…`; sizes 898,446 B vs 3,108,189 B (the matrices differ in
DPR). The frames are not byte-comparable. **The substance is upheld** — I looked at the frame and it
renders the ordinary light composition in full colour with the aurora, the pink `Login` pill and the
picker's chromatic ramps intact, none of which survives real forced colours. The frame is a false witness;
the wording was wrong.

**DISMISS-5 · C-3's "the picker population, same `data-variant=spectrum`, renders correctly" as evidence
that the variant is sound.**

Not so much refuted as *insufficient*, and it matters for the cure. The picker rows work because
`ComponentSliders.vue:193-201` feeds `--slider-track-bg` a real `linear-gradient(...)`. That is the
variant's contract, and it means the correct cure for the config population is **not** "feed it a gradient
too" (the N.W13 mandate's literal reading, which C-3 and L-6 both float as an option). Colour Energy, Body
Radius and Merge (ms) have no chromatic domain to ramp, and `VISUAL-CONSTITUTION.md:7` reserves the
meniscus to Picker and Gradient. Inventing a gradient for a geometry axis would devalue the signature form
in order to fix a fill. The cure is the neutral variant. I record this so the wave cannot regress into the
other reading.

---

# PART III — VERDICT

> ## **APOTHEOSIS REQUIRED**

Not repair. I want to be precise about why, because "apotheosis" is otherwise just a louder word for
"lots of findings".

Four BLOCKERs, and three of them are structural rather than local:

- **J3-03** — the route has no protagonist. No amount of work on this component fixes a composition in
  which the thing being configured is a bead inside a different instrument.
- **J3-01** — the control does not show its value, and this has now survived **two** prior cures aimed at
  its symptom (`N/audit/lanes2/U-CONTROLS.md:54`, `N/waves/N.W13.md:28`, then `T.W8` at `:190-202`). A
  third symptom-cure is not available.
- **J3-13** — the gate that should have caught it certifies the wrong element and is **adverse** to the
  correct cure. The tree cannot be repaired incrementally while its only gate locks the defect in.
- **J3-04** — the one write action the pane exposes silently destroys user state, with no confirmation, no
  compare, no undo and no announcement.

And the shape of the remaining fourteen is diagnostic. `.console-well` re-mints a producer surface tier.
`.config-section-header` re-mints `ConfiguratorLayer`. `resetDefaults` re-mints `useConfiguratorState`.
`.aurora-row-label` re-mints `.config-section-title` byte for byte. `fmt` is the fourth hand-rolled numeric
formatter in a demo for a library about numbers. Three `:deep()` rules reach past a published API into the
producer's internals. Two of the file's most heavily-commented cures are measurably inert, and a third
asserts a 44 px touch rung over a 12 px target.

That is not a component with defects. That is **a generic configurator hand-rolled inside a feature area,
over a design system that already ships the configurator** — and every seam it needed became a second home
for a concept that already had one. The cure is not a patch set; it is a transposition in which
`ConfigSliderPane.vue` **ceases to exist** and its two consumers compose the producer directly. That
transposition is smaller than what is there today and makes J3-04's BLOCKER inexpressible by construction.

Per edict 2 and the formation's no-legacy law, this is a clean break: no alias, no interim class, no
booked swap, no dual path.

---

# PART IV — THE ADDENDUM CLAUSE

*Normative. Ready to paste into the addenda.*

> ### ADD-CSP · The configurator population
>
> **CSP-1 · Value legibility is a paint obligation, not a token obligation.** Every bounded numeric control
> in `ALL18` renders its value as a **painted extent**. The filled portion measures ≥3:1 against the
> unfilled portion of the same control, and the unfilled portion measures ≥3:1 against its ground. A
> control whose fill element is laid out to the value and painted with zero alpha does not satisfy this
> clause regardless of the contrast of any other part. **The spectral meniscus (`variant="spectrum"`) is
> admissible only where the track background is an actual chromatic ramp over the control's own domain —
> Picker and Gradient. Feeding that variant a flat colour is forbidden**, and a consumer may not re-ink a
> producer control's track, range or value from a certified **text** ink rung: text ink is specified for
> glyph mass and is not an area material.
>
> **CSP-2 · Two channels or none.** Control extent, control fill, selection and focus are each expressed in
> at least two independent channels, at least one of which survives `forced-colors: active`. `background`
> alone is one channel; `box-shadow` with `outline-style: none` is one channel and it is the wrong one.
> **Focus uses `outline`.** Forced-colors conformance is proven in **Chromium** — WebKit ignores the
> emulation, so a WebKit forced-colors frame is not evidence and may not be tracked as one.
>
> **CSP-3 · The configurator is producer-owned.** A consumer composes glass-ui's `Configurator`,
> `ConfiguratorLayer`, `ConfiguratorRow` and `useConfiguratorState`. It does not re-mint a section head, a
> reset engine, a surface rung, a row rhythm or a numeric formatter, and it does not reach past a published
> prop into a producer's internal class with `:deep()`. A demo-local generic configurator component is a
> defect; the section/reset/size seams have producer homes and those homes are the API.
>
> **CSP-4 · Reset is shape-aware, confirmed and comparable.** A whole-object merge may not stand in for a
> declared key domain. Reset restores exactly the keys the control surface owns, announces its result in a
> durable status region, and is paired with a compare affordance per
> `OPTICAL-BENCH-COMPOSITIONS.md:47`. Copy and every other command in the action region expose success,
> failure and pending state in that same region; a silent `await` over a two-state producer `Result` is a
> defect.
>
> **CSP-5 · Depth is disclosed, not scrolled.** A control surface exceeding **two** viewport heights
> declares a disclosure rank per section (`essential | advanced`), renders essentials unconditionally, and
> confines the remainder to the producer's disclosure region with a compositor-side edge affordance. A
> flat list behind a hard clip is a defect, and a class named for a fade must own one.
>
> **CSP-6 · Every control announces, groups and reserves.** Each row exposes `aria-valuetext` equal to its
> rendered readout; each section is a programmatic group with an accessible name; each rendered `<label>`
> labels its control. Live numbers use tabular figures and reserve their widest legal representation.
> Precision and unit derive from the **declared step and domain**, never from the current value. A control
> with no effect in the current model renders the producer's disabled state with an explicit reason.
>
> **CSP-7 · The workbench has a subject.** On `/blob` and `/atmosphere` the preview region's rendered paint
> area exceeds the control region's at every desktop size, and the split is the exact
> `preview-dominant` 66.6666667 / 33.3333333. A configurator may not occupy a protagonist slot, and a
> protagonist slot may not be filled by a different route's instrument. At narrow width the route renders
> its own named subject in a single document-scrolling sequence: **no global pane selector, and no route
> whose default pane is not the pane it is named for.**
>
> **CSP-8 · Ambient motion terminates or is stoppable.** A route carrying continuous renderer motion either
> stops within five seconds or exposes one persistent, keyboard-operable, announced and remembered
> still control in its action region. Reduced motion resolving to a still frame does not discharge this;
> it is a separate obligation.
>
> **CSP-9 · A gate measures the cured object.** A contrast or geometry oracle names the element that
> carries the information. An oracle that certifies an inert surface, or that turns RED when the defect it
> was written for is actually fixed, is retired and re-aimed in the same cut as the cure.

---

# PART V — THE RE-AUTHORED WAVE SPEC

# MT-W49-CONSOLE · The configurator population — transposition to the producer

**Born RED.** Every gate below fails against the current tree; I ran each probe and record the failing
value. A gate green at authorship is vacuous and this seat has failed.

**Scope.** `demo/scenes/ConfigSliderPane.vue` (deleted), `demo/scenes/atmosphere/AuroraPane.vue`,
`demo/scenes/blob/BlobPane.vue`, `demo/shell/viewSchema.ts` + `usePaneRouter.ts` (the composition half of
J3-03), `demo/styles/foundation.css` (`.console-well` deleted), `demo/ui/` (deleted),
`e2e/smoke/oracles/o18-contrast-census.spec.ts` (re-aimed), plus one glass-ui BH relay packet for the
forced-colors arm, the thumb seat geometry and `ConfiguratorRow`'s `aria-labelledby`/`aria-valuetext`
pass-through. **Out of scope:** the renderer's motion loop itself (only its still control is in scope);
`docs/tranches/V/vnext/**`; `scripts/dev/dev.sh`.

**Shape.** Five stages. Stage A must land first; it is what makes every later stage falsifiable.

| Stage | Content | Closes |
|---|---|---|
| **A · Un-lock the gate** | Re-aim `o18:1161-1213` from `.slider-track` onto the painted `.slider-range`; add the four vitest mounts (dot-path round trip flat+nested, reset preserving a depth-2 declared live key, `fmt` at `{0,-0,NaN,Infinity,undefined}`, clipboard `Result` on both `reason` values); add the Chromium forced-colors arm to the states harness. | J3-13 |
| **B · Paint the value** | Retire `variant="spectrum"`; delete `:202` and `:204-206`; consume the producer's neutral Slider. Relay the forced-colors arm + `outline` focus + thumb seat geometry to glass-ui. | J3-01, J3-02, J3-12(target) |
| **C · Transpose** | Delete `ConfigSliderPane.vue`, `.console-well`, `demo/ui/`. Each consumer composes `<Configurator>` / `<ConfiguratorLayer>` / `<ConfiguratorRow>` + `useConfiguratorState<T>`. Typed schema in `demo/shared/config-slider-schema.ts` with `rank`, `unit`, `precision`, `enabledWhen` and a typed lens. Delete both `:deep()` blocks, the clamp, the coarse `::before`, the 8 dividers, the Card, the dead `relative`/`mx-auto`, the false JSDoc and the phantom `extraControls`. | J3-04, J3-05, J3-06, J3-07, J3-08, J3-11, J3-12, J3-14, J3-15, J3-17, J3-18 |
| **D · Disclose** | `rank: "essential" \| "advanced"`; essentials unconditional, advanced in the producer's PRM-guarded disclosure region; compositor-side edge mask; reset + **compare** + a durable `aria-live` status region + the still control in the action region, ordered by DOM role. | J3-09, J3-10, J3-16 |
| **E · Compose** | `/blob` gains its own `preview-dominant` composition: the material preview is the 66.6666667 % protagonist, the configurator the 33.3333333 % inspector. `viewSchema` holds component references (killing `componentFor`'s `return ColorPicker` masking fallback); the narrow default is derived from the pane the view is named for; the global `Picker \| Blob` toggle is deleted. | J3-03 |

## V.1 · Gates — every one RED today

Each gate names the exact command, the value it returns **now**, and the input that would turn it RED
again after the cure. A gate with no such input is vacuous.

---

**G1 · The value is painted.** *(J3-01)*

```
node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/j3-probe.mjs → light.range / light.track
```
Assert, on `/#/blob` and `/#/atmosphere`, both schemes, for every `.config-console .configurator-row`:
`.slider-range` has a non-transparent computed fill; contrast(range, track) ≥ 3.0; and the painted range
width tracks the declared value fraction within ±1 px.

- **RED today:** `.slider-range` `background-color: rgba(0,0,0,0)`, `background-image: none` →
  contrast(range, track) = **1.00**, floor 3.0.
- **What would make it fail again:** any consumer re-declaring `--slider-track-bg`, or re-declaring
  `variant="spectrum"` without a `linear-gradient` payload. Assert `data-variant !== "spectrum"` on this
  population in the same gate.

---

**G2 · Two channels, Chromium forced colours.** *(J3-02)*

```
ENGINE=chromium node visual/states.mjs   (new forced-colors arm)
```
Assert `matchMedia("(forced-colors: active)").matches === true` (the arm is real), then: track
`border-width ≥ 1px` **or** contrast(track, well) ≥ 3.0; `.slider-range` painted; and the focused
`[role=slider]` has `outline-style !== "none"` with `outline-width ≥ 2px`.

- **RED today:** `trackEqualsWell: true` (ratio **1.00**), `border-width: 0px`, range `rgba(0,0,0,0)`,
  focus `outline-style: "none"` and `box-shadow: "none"`.
- **What would make it fail again:** reverting focus to `box-shadow`, or expressing extent through
  `background` alone. **Guard clause:** if the arm ever runs on WebKit, `forcedActive` reads `false` and
  the gate must FAIL rather than pass — a false-witness detector, which is exactly what the current
  tracked matrix lacks.

---

**G3 · The closed type matrix.** *(J3-05)*

```
node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/j3-probe.mjs → light.type
```
Assert `.config-section-title` (or its successor) computed `font-family` begins `Plus Jakarta Sans`, and
`fontSize(section heading) > fontSize(row label)` by at least one glass-ui rung; row label `font-weight ≤ 400`;
value element resolves `text-mono-small`/`mono-caption`, not `text-micro`.

- **RED today:** section heading `Fira Code` **16.4px**; row label `Plus Jakarta Sans` 16.4px **weight 500**;
  heading size **equals** label size; value **11px**.
- **What would make it fail again:** any consumer re-declaring `font-family`/`font-size` on a row or
  section; a `.aurora-row-label`-style byte-copy reappearing (assert the successor selector count is 1).

---

**G4 · Reserved live value.** *(J3-06)*

```
node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/j3-probe.mjs → light.widthShift
```
Assert `font-variant-numeric` contains `tabular-nums`, and that substituting the readout's text between its
narrowest and widest **legal** representations (derived from `min`/`max`/`step`/`precision`) changes its
rendered width by ≤ 0.5 px.

- **RED today:** `font-variant-numeric: "normal"`; swing `"3"` 6.8px → `"-0.0005"` 47.4px = **40.6 px**,
  floor 0.5 px.
- **What would make it fail again:** deriving precision from the value rather than the step; any readout
  without a reserved `min-inline-size`.

---

**G5 · Boundary inventory.** *(J3-08)*

```
node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/j3-fix.mjs → *.sectionBorderRaw / actionBarBorderRaw
```
Assert, on `/#/blob` and `/#/atmosphere`: computed `border-bottom-width` on every section head === 0 and
`border-top-width` on the action region === 0; total dividing lines contributed by this population === 0.

- **RED today:** 7 section rules + 1 action-bar rule = **8**, binding inventory `none`.
- **What would make it fail again:** re-adding any rule, or passing `ConfiguratorLayer`'s `dividers` prop
  truthy. Assert on computed style, not on source — a producer-emitted line counts too.

---

**G6 · Card count 0.** *(J3-07)*

```
node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/j3-fix.mjs → *.configConsoleRect + ancestor walk (j3-probe → light.paneAncestry)
```
Assert the configurator subtree emits zero `Card`/`glass-*` bounded shells and that `.console-well` does
not exist in the stylesheet or the DOM.

- **RED today:** ancestor walk from the console returns
  `["glass-resting card rounded-card text-card-foreground …"]`, plus `.console-well` (`foundation.css:350-354`)
  as a second bordered, radiused shell.
- **What would make it fail again:** any re-minted `--radius-panel` + `1px solid` group; re-introducing an
  "INTERIM" class with a booked swap.

---

**G7 · The workbench has a subject.** *(J3-03, desktop half)*

```
node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/j3-probe.mjs → light.panes / light.canvases / light.mainRect
```
At 1440×900 on `/#/blob`: assert `preview.width / main.width ∈ [0.6617, 0.6717]` and
`inspector.width / main.width ∈ [0.3283, 0.3383]`; assert the preview region contains a live blob canvas;
assert `previewPaintArea > inspectorArea`.

- **RED today:** panes **512 / 512** of main 1408 → **0.364 / 0.364** (both bounds missed); the preview
  slot holds the ColorPicker (`viewSchema.ts:179-186`); blob canvas **32,472 px²** vs inspector
  **396,288 px²** → ratio **0.0819**, floor 1.0.
- **What would make it fail again:** any `viewSchema` row placing a configurator in a protagonist slot, or
  a preview whose paint area falls below its form.

---

**G8 · Narrow renders its own subject.** *(J3-03, narrow half)*

```
node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/j3-probe.mjs → narrow390 / zoom200
```
At 390×844 DPR3 **and** 720×450 DPR2 on `/#/blob`: assert the configurator is present with rowCount > 0;
assert **zero** elements with `aria-pressed` whose text matches `/^(Picker|Blob)$/`.

- **RED today:** `consolePresent: false`, `rows: 0`, and
  `[{text:"Picker",pressed:"true"},{text:"Blob",pressed:"false"}]` at **both** arms while
  `location.hash` is `#/blob`.
- **What would make it fail again:** a tenth view forgetting `defaultPaneIndex` — which is why the cure
  *derives* it from the view's own name rather than setting it by hand, and why this gate runs over every
  route, not just blob.

---

**G9 · Announce, group, label.** *(J3-11)*

```
node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/j3-probe.mjs → light.valuetextEmpty ; node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/j3-fix.mjs → *.groupsInConsole / orphanLabels
```
Assert: every `[role=slider]` in the population has `aria-valuetext` **equal to its rendered readout**;
`role=group` count === section count with each carrying an accessible name; orphan `<label>` count === 0;
dependent controls at `Satellites = 0` expose `aria-disabled="true"` with a reason.

- **RED today:** `valuetextEmpty` **31/31**; `groupsInConsole` **0**; `headingsInConsole` **0**;
  `orphanLabels` **31/31**; `aria-disabled` null on every thumb.
- **What would make it fail again:** a second formatter drifting from the rendered one — hence the equality
  assertion against the readout rather than a non-empty check.

---

**G10 · Disclosure, status, and the still control.** *(J3-09, J3-10, J3-04)*

```
node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/j3-probe.mjs → light.scroll / light.liveRegions ; probes/j3-fix.mjs → *.pauseControls
```
Assert: `scrollHeight / clientHeight ≤ 2.0` in the initial (essentials) state; a compositor-side
`mask-image` is present on the scroll host; exactly one `aria-live="polite"` status region exists in the
action region; a named, keyboard-operable still/pause control exists on `/#/blob` with a remembered state;
and Reset is preceded by a confirmation and accompanied by a compare affordance.

- **RED today:** `3.76` screens (floor 2.0); `mask-image: "none"` on a class named `pane-scroll-fade`;
  `liveRegions: 0`; `pauseControls: 0`; Reset unconfirmed with no compare.
- **What would make it fail again:** shipping the disclosure with every section ranked `essential`
  (the ratio assertion catches it); a transient toast standing in for the durable region
  (`VISUAL-CONSTITUTION.md:101` — assert the region persists ≥1 s after the command settles).

---

**G11 · Operable target, unconditionally.** *(J3-12)*

```
node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/j3-probe.mjs → light.thumb  (and the same probe with hasTouch:false)
```
Assert every `[role=slider]` in the population has an operable target ≥ 24×24 CSS px on
`pointer: fine` **and** `pointer: coarse`, without growing the visual glyph
(`PROPORTION-AUDIT.md:72` law 7).

- **RED today:** thumb **12 × 24** at 1440 and at 390; the extension is gated to `@media (pointer: coarse)`
  and adds 0 px even there (producer root already 44 px).
- **What would make it fail again:** a demo-side `::before` returning; the cure must be
  `--slider-thumb-size`/seat geometry at the producer.

---

**G12 · The rhythm is real or absent.** *(J3-12)*

```
node docs/tranches/V/megatranche/audit/components/ConfigSliderPane/probes/j3-probe.mjs → light.rowH / light.rowMinBlock ; probes/j3-fix.mjs → atmoLight
```
Assert: no consumer declares `min-block-size` on a producer row; and if a container-scaled rhythm is
claimed, rendered row height differs across a ≥2× container range.

- **RED today:** container 512 → `min-block-size` resolves **35.84 px**, rendered **60.97 px**; container
  1042 → clamp ceiling **42 px**, rendered **60.97 px**. Across a **2.03×** range the rendered rhythm moves
  **0.00 px** while the file declares "ONE RHYTHM SOURCE".
- **What would make it fail again:** re-asserting a clamp below the row's real content height. The honest
  cure passes the producer's `size` axis and deletes the claim.

## V.2 · π obligations — pinned witnesses

Every capture below names its matrix, route, selector and engine so a later session re-captures the
**identical** witness. Matrix ids match `visual/capture.mjs:42-63` and `visual/states.mjs:20-27`; new arms
are marked **NEW**.

| # | Matrix (engine · viewport · DPR · scheme) | Route | Selector / measurement |
|---|---|---|---|
| π-1 | `safari-desktop-light` (WebKit · 1440×900 · DPR2 · light) | `/#/blob` | `.config-console .configurator-row:first-child .slider-range` — computed `background-color`, `background-image`, rendered width; and its fraction of `.slider-track` width |
| π-2 | `safari-desktop-dark` (WebKit · 1440×900 · DPR2 · dark) | `/#/blob` | same selector; plus contrast(`.slider-track`, `.config-console`) and contrast(`.configurator-row label`, `.config-console`) |
| π-3 | `safari-mobile-dark` (WebKit · iPhone 14 · dark) | `/#/atmosphere` | `.config-console` bottom edge vs the last row's `.glass-slider` — the amputation frame; plus `.pane-scroll-fade` computed `mask-image` |
| π-4 | **NEW** `forced-colors-chromium-desktop` (**Chromium** · 1440×900 · `forcedColors:"active"`) | `/#/blob` | assert `matchMedia("(forced-colors: active)").matches`; `.slider-track` `background-color` + `border-width`; `.slider-range` `background-color`; then `.config-console [role=slider]:first` focused → `outline-style`, `outline-width`, `box-shadow` |
| π-5 | `keyboard-focus-desktop` (Chromium · 1440×900 · 12×Tab) | `/#/blob` | focused element DOM path (never label — `states.mjs:8`), `outline-*`, `box-shadow`, `getBoundingClientRect()` |
| π-6 | `zoom-200-desktop` (WebKit · 720×450 · DPR2) **and NEW** `mobile-390` (Chromium · 390×844 · DPR3) | `/#/blob` | `.config-console` presence, `.configurator-row` count, and the `aria-pressed` census over `/^(Picker\|Blob)$/` |
| π-7 | **NEW** `composition-1440` (Chromium · 1440×900 · light) | `/#/blob` | `main`, `.pane-wrapper--left`, `.pane-wrapper--right` `DOMRect`s; every `canvas` `DOMRect`; the derived preview:form paint-area ratio |
| π-8 | `reduced-motion-desktop` (Chromium · 1440×900 · `reducedMotion:"reduce"`) | `/#/blob` | instrumented `window.__raf` delta over a 2 s window ≥5 s after settle, ordinary vs reduced; plus the still-control census `/pause\|still\|stop/i` |
| π-9 | `rtl-desktop` (WebKit · 1440×900 · `dir=rtl` applied **post-load**) | `/#/blob` | first row: label/value DOM order and rendered x; `.slider-range` inline-start edge; action-region child order by DOM role |
| π-10 | `safari-desktop-light` + `safari-desktop-dark` | `/#/atmosphere` | `.config-section-title` and the slot-row label: computed `font-family`, `font-size`, `font-weight`, `text-transform`, `letter-spacing`, `color` — the six-property identity check |
| π-11 | **NEW** `latency-1440` (Chromium · 1440×900) | `/#/blob` | 40 × `ArrowRight` on `.config-console [role=slider]:first`, dispatch→MutationObserver on `.config-console`; report n/median/p95/max |

**Engine law for π-4:** WebKit ignores `forcedColors` and will render the ordinary composition. Any
forced-colors witness captured on WebKit is void and must be discarded, not compared.

## V.3 · DELTA obligations — before/after pairs

| # | Before (measured now) | After (must hold) |
|---|---|---|
| Δ-1 | `.slider-range` `rgba(0,0,0,0)` / `background-image: none`; contrast(range, track) **1.00**; `Body Radius 0.220` and `Satellites 3` pixel-identical in `safari-desktop-light/blob.png` | painted fill, contrast(range, track) ≥ **3.0**; the two rows visibly differ at their declared fractions (0.3784 vs 0.75) |
| Δ-2 | contrast(track, well) **5.82** light / **8.30** dark — equal to the live readout's ink | track ≤ **3.0** above the well (a groove); the **fill** becomes the ≥3:1 object; readout ink no longer shares the track's token |
| Δ-3 | forced colours: `trackEqualsWell true` (1.00), `border-width 0px`, focus `outline-style "none"` + `box-shadow "none"` | forced colours: track bordered **or** ≥3:1; range painted `Highlight`; focus `outline-style: solid`, `outline-width ≥ 2px` |
| Δ-4 | `/#/blob` panes **512 / 512** (0.364 / 0.364); preview:form **0.0819** | **66.6666667 % / 33.3333333 %** ±0.5 %; preview:form **> 1.0**; a live blob canvas inside the protagonist region |
| Δ-5 | 390 & 720: console absent, rows **0**, `Picker aria-pressed=true` at `#/blob` | console present, rows > 0, **zero** `Picker\|Blob` pressed affordances |
| Δ-6 | section heading `Fira Code 16.4px` **==** row label `16.4px`; value `11px` `fvn: normal` | heading `Plus Jakarta Sans`, one rung **above** the label; value `text-mono-small` with `tabular-nums` |
| Δ-7 | readout width swing **40.6 px** across the legal range | ≤ **0.5 px** |
| Δ-8 | dividing lines **8** (7 @ 1.24–1.29:1, 1 @ 10.5:1) | **0** |
| Δ-9 | Card/bounded-shell count **2** (`glass-resting` + `.console-well`) | **0** |
| Δ-10 | `scrollHeight/clientHeight` **3.76**; `mask-image: none`; `aria-live` regions **0** | ≤ **2.0** at essentials; mask present; exactly **1** durable status region |
| Δ-11 | `aria-valuetext` empty **31/31**; groups **0**; orphan labels **31/31** | **0 / 31** empty; groups **== 7**; orphan labels **0** |
| Δ-12 | thumb **12 × 24** on both pointer types | operable target ≥ **24 × 24** on both, visual glyph unchanged |
| Δ-13 | rendered row **60.97 px** at container 512 **and** at 1042 (0.00 px across 2.03×) | either a real container response, or the claim and the clamp both deleted |
| Δ-14 | Reset destroys `color.paletteStops` at depth 2, silently | Reset restores only owned keys; depth-2 live state survives; result announced; compare present |
| Δ-15 | `/#/blob` rAF **112–144/s** sustained past 5 s (2 runs), still controls **0** | motion terminates ≤5 s **or** a named, remembered still control exists; reduced-motion arm stays at **0/s** |
| Δ-16 | `o18:1161` asserts `.slider-track` ≥3:1 — green over the defect | the oracle asserts the **painted range**; re-run against the pre-cure tree returns **RED** |
| Δ-17 | latency median **6.9–8.4 ms** / p95 **9.3 ms** at 31 mounted rows | no regression (median ≤ 10 ms) at the reduced essentials mount count — recorded so the transposition cannot silently cost frames |

## V.4 · Producer relay (glass-ui BH — standing edict)

Four items leave this wave as a relay packet, not as demo code (edicts 4 and 5):

1. **Slider forced-colors arm** — `border: 1px solid` on `.slider-track`; `.slider-range { background: Highlight; forced-color-adjust: none }`; `:focus-visible` moves from `box-shadow` to `outline`.
2. **Thumb seat geometry** — ≥24 px operable inline target unconditionally, visual glyph unchanged
   (`--slider-thumb-size` + an invisible seat).
3. **`ConfiguratorRow` pass-throughs** — `aria-labelledby` (the Slider already forwards it; the Row does
   not expose it) and `aria-valuetext`; plus a `name`-slot ink/rung that does not require a consumer
   `:deep()`.
4. **`ConfiguratorLayer` disclosure + `Configurator` footer** — confirm the PRM-guarded
   `grid-template-rows` transition and the `footer` slot's `{ reset }` yield are the supported path for
   CSP-5 and CSP-4.

---

# PART VI — DISSENT

**I dissent from CHALLENGE-D on D-2's severity framing.** D-2 is filed as a BLOCKER on the ground that the
configurator is "unreachable" at mobile widths and 200 % zoom. It is not unreachable — I measured a live
`Blob` affordance with `aria-pressed="false"` at both arms, one tap away. The finding survives as a
BLOCKER under J3-03 for two *different* reasons (the route defaults to the pane it is not named for; the
recovery mechanism is itself canon-forbidden), and a wave built on the "unreachable" premise would ship the
wrong cure — it would make the pane render at 390 px and declare victory, leaving the forbidden global
toggle and the 8.19 % preview ratio in place.

**I dissent from CHALLENGE-D and CHALLENGE-L on the divider contrast numbers.** D-6 reports a 4.7× light/dark
swing; my own first pass reported the same swing inverted. Both are artifacts of compositing a translucent
border over black. Composited over the well the rule measures 1.24:1 and 1.29:1 — no asymmetry exists. I
record this against myself as much as against D: **any contrast helper in this formation that fills `#000`
before filling the sample is unsound for α<1 colours, and several numbers already in the ledger were
produced that way.** That is a harness defect with reach beyond this component and it should be swept.

**I dissent from CHALLENGE-C and CHALLENGE-L on the shape of the `variant="spectrum"` cure.** Both float
"feed the variant a real gradient" as an acceptable reading of the N.W13 mandate (C-3: "Either feed the
variant a real gradient over the slider's own domain … or stop declaring `spectrum`"; L-6 records the
mandate's wording). Only the second arm is admissible. `VISUAL-CONSTITUTION.md:7` reserves the meniscus to
Picker and Gradient, and Body Radius, Smooth K, Merge (ms) and Zones have no chromatic domain to ramp.
Manufacturing a gradient for a geometry axis would fix the fill by devaluing the product's signature form —
a strictly worse outcome than the defect. CSP-1 is written to close that door.

**I dissent from CHALLENGE-L's ordering.** L proposes L-1 (reset) first, L-6 (the track) second, L-5
(tsconfig `paths`) third. Correctness-first is the right instinct, but it lands a cure into a tree whose
only gate is *adverse* to it: `o18:1161` goes RED when the track re-ink is retired, and a wave that
discovers this mid-flight will be tempted to preserve the re-ink to keep the gate green — which is exactly
how the T.W8 cure produced this defect in the first place. **Stage A (un-lock the gate) must precede every
other stage**, and that is the single most important ordering decision in this spec.

**Concurrence with a caveat, on the transposition.** I agree with L-15's greenfield lattice — that
`ConfigSliderPane.vue` should not exist — and my Stage C adopts it. My caveat: L presents this as a library
finding, and it is also the **design** finding. A generic "pane parameterised by any object addressed by
any dot-path string" cannot express a rank, a unit, a precision, a dependency or a compare, because it
knows nothing about its domain. Five of my eighteen upheld defects (J3-06, J3-09, J3-11, J3-16, J3-18) are
not oversights that a diligent author would have caught — they are **unrepresentable in the current
contract**. That is why the verdict is apotheosis and not repair: you cannot fix, in a component, a defect
whose cure the component's own type signature forbids you from expressing.

**No dissent** on J3-01's mechanism, J3-04's mechanism, or the vacuous-gate finding. On those three, all
three challengers converged from different premises onto the same bytes, and I reproduced each of them.

---

*Juror-3 · design, gestalt, performance · Opus 5 (`claude-opus-5[1m]`) · mega-tranche component audit ·
`demo/scenes/ConfigSliderPane.vue` · verdict **APOTHEOSIS REQUIRED** · wave **MT-W49-CONSOLE**, born RED.*

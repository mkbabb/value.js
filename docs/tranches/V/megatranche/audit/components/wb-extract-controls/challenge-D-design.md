# CHALLENGE-D — `demo/workbenches/extract/ExtractControls.vue` — the design is flawed

**Pass 4.** Supersedes the consolidated pass-3 text (preserved verbatim as
`challenge-D-design.pass-3-2026-07-29-prior.md`), which itself folded passes 1 and 2. This pass does
not restate pass 3's argument. It does four things:

1. **Refutes** one pass-3 register row that recorded a clean state where a BLOCKER lives (`focus`).
2. **Settles** the reservation disagreement pass 3 explicitly escalated and refused to decide.
3. **Adds** five findings no prior pass carries, two of them BLOCKER.
4. **Re-authors the blocked wave**, whose shape does not survive finding D4-1.

Where this pass and a prior pass disagree, both numbers appear with their measurement method. I do
not silently overwrite a prior seat.

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm. This is
the tier this seat was explicitly spawned with; the declaration is observed, not inherited.

## Pin verification

```
$ shasum -a 256 demo/workbenches/extract/ExtractControls.vue
71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28  demo/workbenches/extract/ExtractControls.vue
```

Byte-identical to the glass BJ W4 hold hash. **No consumer edit lands from this seat.** Every cure is
authored in §5 as a blocked wave with its exact release condition.

## Method

Read the component, its consumer (`ExtractWorkbench.vue`), its session
(`composables/useExtractSession.ts`), the drop zone it delegates to (`ImageDropZone.vue`), the
glass-ui 7.0.0 producer type declarations for `Slider` / `DockControl` / `DockSeparator`, and the
binding canon. Looked at all four shipped Safari captures. Then drove the live build at
`localhost:9000` read-only under WebKit across desktop light, desktop dark, mobile 390, narrow 320,
RTL, reduced-motion and forced-colors arms.

The instrument this pass adds is **pixel readback**: full-page PNG captures decoded in process
(inflate + unfilter, `evidence/pass-5/chD-pixels.mjs`) so that rendered ink, not computed style, is
the evidence. Computed style is what the author asked for; pixels are what the user gets, and for
three findings below the two disagree.

Scripts and raw JSON: `evidence/pass-5/`.

---

## 1. What pass 3 got right — carried forward, not re-argued

Confirmed by independent measurement this pass:

| prior | claim | this pass |
|---|---|---|
| D-1 | the hand-rolled rail is a decoy at the track's own coordinates | confirmed — `ExtractControls.vue:19–23` + `:32` |
| D-2 | the certified ink is scheme-asymmetric | confirmed and **quantified in rendered contrast**: 3.333 : 1 light vs **6.385 : 1** dark — a floor-only clamp with no ceiling, overshooting its own 3 : 1 target by 2.13× in dark |
| D-3 | the thumb overhangs its rail by 10 px on coarse pointers | confirmed — slider root `y=448.97 h=44` inside wrapper `y=458.97 h=24` |
| D-4 | the kC axis is unoperable at 320 px | confirmed and **sharpened**: track **22.5 px**, thumb 12 px → **10.5 px of travel for 15 steps = 0.70 px/step** |
| D-5 | two forbidden `DockSeparator`s | confirmed and **proved to paint nothing** — below |
| D-7 | `disabled` reaches 1 of 5 controls | confirmed — `:disabled` occurs exactly once, line 84 |
| D-8 | neither axis satisfies the mandated axis composition | confirmed — `aria-valuetext` is `null` on both sliders |
| D-10 | three actions named only by hover `title` | confirmed — `DockControl` has **no `title` prop** (`DockControl.vue.d.ts:24–49`); it lands as a fallthrough HTML attribute |
| D-15 | `text-right` is physical | confirmed — label-ink→rail gap **8.0 px LTR → 17.9 px RTL**, a 2.24× inflation |

Pass 3 called the separators zero-height from computed style. Pixel readback closes it: a 45 px
vertical scan through both separator columns returns **3 unique colours**, every one the flat plate
ground (`239,184,202` light / `119,74,85` dark). Two `role="separator"` nodes in the accessibility
tree; **zero pixels of ink**. The grouping is asserted to assistive technology and withheld from
everyone else.

---

## 2. New findings

### D4-1 · BLOCKER · the focus indicator renders at 1.14 : 1 against the surface it sits on — and pass 3 recorded this state as clean

Pass 3's state register reads:

> | focus (keyboard) ✱ | geometry stable, ring is producer's | `d4-states.txt` `focus-1440`; no consumer focus treatment |

That is a geometry observation standing in for a contrast observation. Measured in pixels with the k
thumb focused, sampling the ring band 2 px outside the thumb against the track 12 px away:

| arm | ring | adjacent track | **contrast** |
|---|---|---|---:|
| 1440 light | `190, 0, 76` | `206, 0, 83` | **1.138 : 1** |
| 1440 light (right arm) | `202, 0, 81` | `206, 0, 83` | **1.033 : 1** |
| 1440 dark | `252, 232, 233` | `255, 236, 238` | **1.035 : 1** |
| 1440 dark (right arm) | `252, 233, 235` | `255, 236, 238` | **1.027 : 1** |

The ring's vertical arms escape onto the plate and do slightly better — 1.682 : 1 light, 1.990 : 1
dark — still under the floor. Across a 1120 px neighbourhood, focusing the control changes **15.3 %**
of pixels in light and **7.5 %** in dark.

WCAG 2.2 SC 2.4.11 requires the focus indicator to reach 3 : 1 against adjacent unfocused colours.
`VISUAL-CONSTITUTION §4.1` is stricter and names the failure mode exactly: *"Text, focus, boundaries
and state meet their rendered contrast on the actual material tier; **a token name is not
evidence**."* The producer's focus token is present and correctly applied. It is not visible.

**Mechanism — and it is this component's own decision.** The producer draws the focus ring in the
accent. This component painted the **track** in the accent: `trackInk` from
`useSafeAccentFn("resting")` goes to the k rail's `background-color`/`box-shadow`
(`ExtractControls.vue:22`) and to the kC axis's `--slider-track-bg` (`:75`). Certification preserves
hue to six decimals, so ring and track land on the same hue at similar lightness. The component spent
the accent on a surface, and the accent was the state signal.

**Causal proof.** In-page, read-only, I neutralised only the two consumer track decisions —
`display:none` on the hand-rolled rail, and released `--slider-track-bg` back to the producer default
— then re-measured the identical ring:

| track | ring | adjacent | contrast |
|---|---|---|---:|
| shipped (accent rail + transparent-track override) | `190, 0, 76` | `206, 0, 83` | **1.138 : 1** |
| producer default (consumer overrides removed) | `210, 149, 166` | `237, 230, 222` | **1.976 : 1** |

Two conclusions, and the second is why this cannot be discharged by a consumer edit:

1. The consumer's track decision **degrades focus contrast by 1.74×**. Causality established.
2. **The producer default is also non-conformant** — 1.976 : 1 against 3 : 1 required.

The cure is therefore split across the boundary: the consumer must stop spending the accent on the
track, **and** glass-ui must derive focus ink from a token independent of, and certified against,
whatever the track resolves to. Neither half alone reaches 3 : 1. This is what re-shapes the blocked
wave (§5).

**Reproduction.** `node evidence/pass-5/chD-adjudicate.mjs` (focus arms + counterfactual) and
`node evidence/pass-5/chD-focusring.mjs` (both schemes), against `localhost:9000`.

### D4-2 · BLOCKER · the axis carries no value — measured fill-to-track contrast 1.000

This is the component's job, and it does not do it. Sampling the rendered rail immediately left and
immediately right of the thumb — the two regions a slider exists to distinguish:

| arm | axis | left of thumb | right of thumb | **contrast** |
|---|---|---|---|---:|
| light | k (at 5/16 = 31 %) | `205, 0, 83` | `206, 0, 83` | **1.008 : 1** |
| light | kC (at 0.5/1.5 = 33 %) | `206, 0, 83` | `206, 0, 83` | **1.000 : 1** |
| dark | k | `254, 235, 237` | `255, 236, 238` | **1.009 : 1** |
| dark | kC | `255, 236, 238` | `255, 236, 238` | **1.000 : 1** |

Both sliders sit near one third of travel — far from either end, where a filled range would be
plainly visible. There is no filled range. The rail is uniform end to end at every value.

Look at any of the four shipped captures: the k axis reads as a **progress bar at 100 %**, not a
value axis at 5 of 16. The only carriers of the quantity are a 12 px thumb and a numeral in the
de-emphasis ink rung.

**Mechanism.** For k, the opaque hand-rolled rail (`:19–23`) is painted *behind* a Slider whose track
is blanked (`--slider-track-bg: transparent`, `:32`), so the producer's range fill composites against
— and matches — that rail. For kC there is no rail: the track itself is set to `trackInk` (`:75`) and
the range fill is the same accent. Two different mechanisms, one identical outcome: **fill colour ≡
track colour**.

`VISUAL-CONSTITUTION §5` calls the mandated composition an *axis*: *"label, unit, reserved live value
… and a color-bearing or neutral track chosen by semantics."* A colour-bearing track is legitimate —
that is the spectral-meniscus idiom — but a colour-bearing track whose fill is indistinguishable from
it is not an axis, it is a decorated bar.

Pass 3's D-1 identified the decoy div as an *architectural* defect; this is its *functional*
consequence, and it is the more serious of the two, because it survives in the kC axis — which pass
3's D-1 cure ("do exactly what the kC axis already does") holds up as the correct pattern. **kC is
not the correct pattern. It has the same defect by a shorter route.**

**Reproduction.** `node evidence/pass-5/chD-pixels.mjs` → `contrast_fillVsTrack_k`,
`contrast_fillVsTrack_kc`.

### D4-3 · MAJOR · the protagonist axis and the tertiary axis are byte-identical ink

Same probe, cross-comparing the two rails:

```
light   contrast_kRail_vs_kcRail = 1.000     k rail 206,0,83      kC rail 206,0,83
dark    contrast_kRail_vs_kcRail = 1.000     k rail 255,236,238   kC rail 255,236,238
```

Not "similar" — identical to the byte, in both schemes. The k axis is 434 px wide and determines how
many colours the entire product returns. The kC axis is 230 px wide and nudges a clustering weight.
They wear the same material, the same hue and the same pill geometry, stacked 44 px apart.

`VISUAL-CONSTITUTION §3.8`: *"One pane may have one full-strength visual protagonist. Supporting
fixtures do not compete with it through equal size or equal shadow."* Pass 3's D-9 established that
the rails out-shout the pane; this establishes that they cannot be told apart **from each other**,
which is the more actionable half — a reader scanning the cluster has no cue which control is
consequential.

The mechanism is that `trackInk` is one computed value (`:123–125`) consumed by both axes with no
tier differentiation. The cure is not a second colour: `§5` says the track is *"chosen by
semantics"*, and kC's semantics are a neutral scalar weight, not a chromatic domain. The support axis
should not be colour-bearing at all.

### D4-4 · MAJOR · two controls, one function, colliding accessible names — the PR-13 mechanism verbatim

`ExtractControls` emits `upload` (`:43`). `ExtractWorkbench:230–232` handles it by calling
`dropZoneRef.value?.openFilePicker()`. `ImageDropZone:81–85` defines and exposes `openFilePicker`,
**and also binds it to its own click** (`ImageDropZone:21`) under
`aria-label="Upload image, click to browse or drop an image here"` (`:20`).

In the empty state — the state the route boots into — there are therefore exactly two controls
invoking the same function. The rendered accessibility tree, captured live:

```
- button "Upload image, click to browse or drop an image here":   ← the 200 px specimen well
- slider "Number of colors"
- button "Upload image":                                          ← the 40 px icon in the action row
- button "Open camera":
```

One is a large labelled well that says *"Drop an image or click to browse"* in its own face. The
other is a 40 px glyph whose only name is a hover tooltip (pass 3 D-10) and which delegates to the
first. The specimen hosts the action **and** the action region hosts the action.

`PROPORTION-AUDIT` PR-13 names this mechanism on a different surface — *"Picker specimen and action
region both host Copy → **REMOVE**. Specimen listener/tooltip/label 1→0; action Copy 1→1; total
2→1"* — and PR-06 generalises it: *"One action/selection owner"*. No prior pass on this component
carries it.

**Which owner survives is a real decision, not a coin flip.** The well is the better owner while
empty: it is the drop target, it is labelled, it is large. But `:disable-click` flips it to the
eyedropper once an image exists (`ExtractWorkbench:23`), at which point the well can no longer
replace the image and the icon becomes the only path. The icon is therefore redundant in the empty
state and load-bearing in the populated one. The defect is that the component ships one static
control set for two states instead of a state-aware action region. That is the cure — not deletion.

### D4-5 · MAJOR · the camera is a one-way door — the producer's toggle contract is available and unused

`ExtractControls` renders Camera as a plain verb (`:49–55`) and emits `camera`. Every call site of
the corresponding teardown:

```
$ grep -rn "stopCamera" demo/workbenches/extract/
ExtractWorkbench.vue:235:    stopCamera();        ← inside onFile(), i.e. after a capture or a new file
ExtractWorkbench.vue:257:function stopCamera() {
ExtractWorkbench.vue:281:onBeforeUnmount(stopCamera);
```

There is **no control anywhere that dismisses the camera.** Once open, the viewfinder and the live
`MediaStream` persist until the user captures a frame, drops a different file, or leaves the route.
Meanwhile Camera stays enabled — `disabled` never reaches it (pass 3 D-7) — so pressing it again
re-enters `startCamera()`, which assigns `cameraStream` without stopping the previous stream.

The producer ships the contract this needs. `DockControl.vue.d.ts:32–36`:

> `active?: boolean` — Selected/toggled state. Stamps `aria-pressed` + `data-active`; the icon shape
> composes the `.glass-capsule` selected seat.

Measured live: `ariaPressed: null, dataActive: null` on all three controls. The lever is unused.

`VISUAL-CONSTITUTION §4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
color-only. Role, accessible name, state/value and associated error/status are explicit."* Camera has
an on-state with no state expression and no off-affordance. Pass 3's D-17 lever table lists
`disabled`, `size`, `--slider-track-height`, `--slider-track-bg` and `marks`; `active` is not on it,
and it is the one that closes an entire missing state.

### D4-6 · MINOR · both readouts overflow their reservation — and this settles pass 3's open disagreement

Pass 3 escalated rather than decided:

> **It does not overflow at this arm** — and I record an explicit disagreement: pass 2 (P2-1/P2-2)
> reports the k and kC reservations overflowing at every legal value; I measured
> `scrollWidth === clientWidth` and `overflows: false` … the disagreement should be adjudicated
> before either number is carried into a wave.

**Adjudicated: pass 2 was right on direction, and pass 3's negative is a measurement artefact.**
`scrollWidth` and `clientWidth` are integer-rounded, so a sub-pixel overflow is structurally
invisible to that predicate. Measuring the live text node with `Range.getBoundingClientRect()` —
sub-pixel, in place, on the real resolved font — while driving each axis by keyboard:

| readout | value | box | rendered ink | overflow | `scrollW`/`clientW` |
|---|---|---:|---:|---:|---|
| k label | `5` (boot) | 20 px | 10.092 px | −9.908 | 20 / 20 |
| k label | `16` (keyboard max) | 20 px | **20.185 px** | **+0.185** | 20 / 20 — reports clean |
| kC readout | `0.5` (boot) | 20 px | **20.308 px** | **+0.308** | 20 / 20 — reports clean |
| kC readout | `1.5` (keyboard max) | 20 px | **20.308 px** | **+0.308** | 20 / 20 — reports clean |

Both overflow; both report clean under `scrollWidth`. Font resolved to `"Fira Code"` in every row, so
this is not the webfont-fallback risk pass 3 flagged — it is the shipped rendering.

Pass 3 measured the k ink at 19.74 px against my 20.185 px (2.2 % apart, a clone-vs-in-place
difference); the in-place `Range` figure is the more direct measurement, and it is the one that
crosses the box edge. The k label spills **right**, into the 8 px gap toward the rail (`inkR 244.18`
vs `boxR 244`), for k ∈ [10, 16] — seven of sixteen legal values. The kC readout spills right at
**every** value, because every legal kC value renders as exactly three glyphs; the reservation is
simply 0.31 px too small, always.

`VISUAL-CONSTITUTION §4`: *"Live numbers use tabular figures and **reserve their widest legal
representation** so value changes never reflow the settled chassis."* `w-5` is a hand-guessed magic
constant, not a derivation from the widest legal representation. Magnitude is sub-pixel and severity
stays MINOR — but the row should now close as *confirmed overflow*, not carry forward as a disputed
number, and no wave should cite `scrollWidth` as its witness.

### D4-7 · MINOR · the cured born-RED pin is still in the tree, alive, and neutralised only by object key order

`useExtractSession.ts:101–103`:

```ts
const kSliderGradient = computed(() => {
    const presented = presentedPalette.value;
    if (!presented.ok || presented.value.length === 0) return "var(--muted)";
```

`var(--muted)` is the exact token this component's own source comment records as the born-RED failure
it was cured of (`ExtractControls.vue:59–64`): *"the former `--slider-track-bg: var(--muted)` was
dark-on-dark against the plate ground ('These sliders are un-readable' …)"*. The empty-state arm of
the gradient still returns it, and the component still binds it (`:22`):

```
:style="{ background: gradient, backgroundColor: trackInk, boxShadow: … }"
```

The only reason the cure holds is that `backgroundColor` is enumerated **after** `background` in that
object literal, so it wins the shorthand. Measured computed style confirms the override lands
(`background-color: oklch(0.545141 …)`, `background-image: none`) and confirms the dead path:

```
inlineStyle: "background-image: ; background-position-x: ; … background-color: oklch(0.545141 …)"
```

`background-image` is empty because `background: var(--muted)` set the shorthand to a colour, which
`backgroundColor` then replaced. **A WCAG 1.4.11 certification is resting on JavaScript object
property order.** If `gradient` ever carries a `background` shorthand with a colour component, or the
key order is touched, the certified ink is silently lost with no test to catch it.

Two owner edicts land here. Edict 2, no legacy code — *no masking fallbacks, no dual paths*: this is
both, a superseded pin kept alive and masked by a second path to the same slot. Edict 3, KISS: the
prop is typed `gradient: string` and documented as the palette gradient; its empty arm returns a
colour token. The type says gradient; the value is not one.

### D4-8 · INFO · one value, three per-instance pins

`--btn-hover-color` is set identically on all three DockControls (`:42`, `:51`, `:86`). Owner edict 5
is root-level styling; the cluster root or the producer owns this, not three inline copies. Free to
fix, and it removes three inline `:style` bindings from the template.

---

## 3. Where pass 3 and this pass disagree

| row | pass 3 | pass 4 | resolution |
|---|---|---|---|
| focus (keyboard) | clean — *"geometry stable, ring is producer's"* | **BLOCKER** — 1.03–1.14 : 1 rendered | pass 4; pass 3 measured geometry, not contrast. Pixel evidence + counterfactual in D4-1 |
| k reservation | *"does not overflow"* (`scrollWidth`) | **overflows 0.185 px** at k ≥ 10 (`Range`) | pass 4 method; `scrollWidth` is integer-rounded and cannot see it |
| D-1's cure — *"exactly as the kC axis already does"* | kC is the model | **kC carries the same defect** (D4-2) | pass 4; kC's fill-vs-track contrast is 1.000, the worst measured |

The third row matters most: pass 3's headline cure for its own BLOCKER would have propagated the
defect rather than removed it. Any wave built on that sentence must be re-authored.

---

## 4. State coverage — rows this pass changes

Deltas against pass 3's register only.

| State | pass 3 | pass 4 | why |
|---|---|---|---|
| focus (keyboard) | handled | **broken, both schemes** | D4-1 |
| populated (gradient present) | partial | **broken** | D4-2 — the fill never differentiates, at any value |
| camera open | absent (`disabled` reach) | **absent, and unexitable** | D4-5 — no off control exists |
| overflowing / truncated | disputed | **confirmed overflow, both readouts** | D4-6 |
| empty (no image) | broken (hierarchy) | **broken, and duplicated** | D4-4 — two controls own the one forward action |

Unhandled by omission, unchanged, and worth restating because a state never designed is a design
defect: neither axis exposes a **unit** or `aria-valuetext` (both `null`, measured), so the
keyboard/AT transcript for the protagonist control of this workbench is the bare string `"5"` — not
"5 colors". `§5.2` requires *"announce label, value, unit"*.

---

## 5. The blocked wave

**Hold.** `ExtractControls.vue` is a pinned consumer in the glass BJ W4 hold at SHA-256
`71aa0a65…4d46c28`, verified above. Consumer edits are FORBIDDEN until Glass 8. Nothing below is
applied.

D4-1's counterfactual changes the wave's shape. Earlier passes split the work into a consumer-only
wave plus a producer-gated wave. **That split does not survive.** The focus defect cannot be closed
on either side alone — the consumer half moves 1.138 → 1.976 and the floor is 3.0. The producer ask
must land first, and the consumer wave becomes wholly gated.

### W·EC-P — producer asks, relayed to the glass-ui BH inbox (standing fond)

| ask | closes | contract |
|---|---|---|
| **P1 · focus ink independent of track ink.** `Slider` derives its focus indicator from a token certified against the *resolved* `--slider-track-bg`, not from the accent. | D4-1 | rendered focus-vs-adjacent ≥ 3 : 1 for any legal track value including a full-chroma one, both schemes |
| **P2 · range fill guaranteed separable from track.** A colour-bearing track must still yield a legible filled range. | D4-2, D4-3 | rendered fill-vs-track ≥ 3 : 1 at 25 %, 50 % and 75 % of travel, both schemes |
| **P3 · the domain-neutral axis composition as a real primitive** — label, unit, reserved live value derived from the widest legal representation, optional numeric entry, `aria-valuetext`, target floor. | D4-6, pass-3 D-8/D-11/D-16 | `VISUAL-CONSTITUTION §5` names six consumers of *"that one composition"*; it does not exist, so all six hand-roll it |
| **P4 · thumb hit box ≠ paint box on `Slider`.** `DockControl` already folds this (`DockControl.vue.d.ts:12–16`); `Slider` does not. | pass-3 D-3/D-4; the 12 px inline seats in the tranche's own `REPORT.json` | inline target ≥ 24 px with the painted glyph unchanged |
| **P5 · a minimum operable inline size** below which the axis refuses to shrink. | pass-3 D-4 (0.70 px/step at 320) | a named floor, not `min-w-0` at consumer discretion |
| **P6 · `DockControl` accepts a real accessible `label`.** It has no `title` prop; consumers pass one as a fallthrough attribute. | pass-3 D-10 | name available without hover |

### W·EC-C — consumer wave, **gated on P1–P6 landing in Glass 8**

In dependency order:

1. Adopt the P3 axis composition for both axes. This deletes the hand-rolled rail (`:19–23`), both
   `--slider-track-bg` overrides (`:32`, `:75`), the `h-6` magic height, both `w-5` magic
   reservations, the `text-right` physical alignment and the two-voice type mismatch — one
   substitution closing eight rows.
2. Choose track semantics per axis, not per convenience: k is chromatic (it *is* the palette), **kC
   is neutral** (a scalar weight). Closes D4-3 by subtraction.
3. Delete both `<DockSeparator/>` (`:57`, `:81`). `OPTICAL-BENCH-COMPOSITIONS.md §5` gives Extract
   boundaries `[]`, reserve `none`, retained line **`none`**, and: *"Any additional line … is a
   defect."* They paint nothing anyway.
4. Wire `disabled` to all five controls (currently 1 of 5, `:84`).
5. Give Camera `active` plus an off path, and state-gate the action region so the Upload icon is
   present only where the well cannot own it (D4-4, D4-5).
6. Delete the dead `.touch-gate-target` rule (`:140–142` — matches 0 elements in `<main>`, measured)
   and hoist `.plate-ink` out of its five duplicate scoped blocks.
7. Retire `useExtractSession.ts:103`'s `"var(--muted)"` arm and the `background` / `backgroundColor`
   double-write (D4-7).

### Exact release condition

> W·EC-C may begin when **all** of the following hold:
> 1. `@mkbabb/glass-ui` is published at `>=8.0.0` and `package.json` resolves it;
> 2. that release's notes name P1–P6 as landed;
> 3. a rendered witness on the routed `/#/extract` at 1440 light, 1440 dark, 390 dark and 320 light
>    shows focus-vs-adjacent **≥ 3 : 1** and fill-vs-track **≥ 3 : 1** at 25/50/75 % of travel on
>    both axes, **by pixel readback** — the method in `evidence/pass-5/chD-pixels.mjs`, not computed
>    style;
> 4. the glass BJ W4 hold on SHA-256 `71aa0a65…4d46c28` is lifted by its owner.
>
> Conditions 1 and 2 are necessary and **not sufficient**: condition 3 is the gate, because this
> component's whole failure mode is a contract satisfied numerically and voided perceptually.
> Partial landing does not release a partial wave — step 1 of W·EC-C is a single substitution and
> cannot be staged.

---

## 6. Negatives — attacked and could not break

Recorded so the verdict is not mistaken for indiscriminate.

- **Vue 3.5 idiom (edict 7) is clean.** Reactive props destructure at `:103–111` is correct and
  current. No template refs are needed, so the absence of `useTemplateRef` is right. No `defineModel`
  round-trip exists, so no `shallowRef` cache is owed.
- **`verbatimModuleSyntax` (edict 8) is clean.** All five imports (`:96–101`) are value imports; none
  is type-only, so no `import type` is owed. Verified against the file, not assumed.
- **No god module (edict 1).** 151 lines, one job, six props, five emits, no barrel growth.
- **Horizontal overflow is genuinely zero** at 1440, 390, 320 and RTL — measured
  `scrollWidth - clientWidth === 0` on every arm, matching the tranche harness's `overflowX: 0`.
- **`Reset`'s disabled state is correctly exposed**, not colour-only: the native `disabled` attribute
  is set (`disabled: true`) and the AT transcript reads `button "Reset" [disabled]`.
- **No console or page errors** on `/#/extract` in any of the four shipped matrices (`REPORT.json`:
  `consoleErrors: []`, `pageErrors: []`, all four rows).
- **Reduced motion is not independently violated here.** Nothing spatial animates; the icons'
  `transition-colors` is a colour effect. I confirm pass 3's register-inconsistency finding and add
  nothing to its severity.
- **The 3 : 1 graphics floor the component set for itself is genuinely met** in light — measured
  3.333 : 1 rail-vs-ground. The defect is the missing ceiling (6.385 : 1 dark), not a failed floor.

---

## 7. Verdict

**DEFECTIVE.**

The premise holds, and the defect is one idea wearing many faces: **the component spent the accent on
a surface.** Everything follows. Because the accent is the track, the fill cannot be told from the
track (D4-2, contrast 1.000). Because the accent is the track, the two axes cannot be told from each
other (D4-3, contrast 1.000). Because the accent is the track, the focus ring cannot be told from
what it rings (D4-1, contrast 1.03–1.14). Three states — value, hierarchy, focus — collapse into one
undifferentiated crimson-or-cream bar, and each collapse is measured in rendered pixels rather than
inferred from source.

The strongest single defect is **D4-1**: keyboard focus on the protagonist control of this workbench
renders at 1.03–1.14 : 1 in both schemes; a prior pass recorded that state as clean; and the
counterfactual proves the component caused it while also proving the producer cannot fix it alone.

The gestalt cure is not a patch to any of the three. It is the transposition `§5` already prescribes
and nobody has built: **the domain-neutral axis composition, as a producer primitive**, so that
Extract stops inventing slider mechanics and the accent goes back to meaning *state* instead of
*surface*. Once that primitive exists, every consumer step in W·EC-C is a deletion.

Blocked on Glass 8 by the pin. No source edit lands from this seat.

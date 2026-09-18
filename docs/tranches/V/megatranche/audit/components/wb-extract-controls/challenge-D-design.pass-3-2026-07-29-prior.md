# CHALLENGE-D — `demo/workbenches/extract/ExtractControls.vue` — the design is flawed

**Consolidated pass 3.** This file supersedes the pass-1 text of 2026-07-28 18:34 (preserved as
`challenge-D-design.pass-1-2026-07-28-prior.md` alongside the C-seat's) and folds the verified
corrections from `challenge-D-design-pass2.md`. Where this pass and an earlier pass disagree, the
disagreement is stated explicitly with both measurements — I do not silently overwrite a prior
seat's number.

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm. This is
the tier the seat was explicitly spawned with; the declaration is observed, not inherited.

## Pin verification

```
$ shasum -a 256 demo/workbenches/extract/ExtractControls.vue
71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28  demo/workbenches/extract/ExtractControls.vue
```

Byte-identical to the glass BJ W4 hold hash. Also verified unchanged since the brief's stated base:

```
$ git merge-base --is-ancestor c654824e HEAD && echo YES
YES
$ git diff --stat c654824e HEAD -- demo/workbenches/extract/ExtractControls.vue
(empty — no change)
```

(HEAD is `06377848`, a descendant of the brief's `c654824e`; the subject file is untouched between
them.) **No consumer edit lands from this seat.** Every cure is authored as a blocked wave in §7
with its exact release condition.

## Method

Read the component, its consumer (`ExtractWorkbench.vue`), the glass-ui 7.0.0 producer (`Slider`,
`DockControl`, `DockSeparator` type declarations and the shipped `glass-ui.css`), and the binding
canon (`VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`, `OPTICAL-BENCH-COMPOSITIONS.md §5`). Looked
at all four shipped Safari captures. Then drove the live build at `localhost:9000` read-only with
WebKit across seven arms — 1440 light, 1440 dark, 390 dark, 320 light, 720@4× (200 % zoom), RTL,
forced-colors, plus a keyboard walk of the k axis to its maximum.

Scripts and raw output: `evidence/pass-4/`.

---

## 1. The central defect

**The component decorates *around* the design system's Slider instead of composing *over* it.**

`VISUAL-CONSTITUTION §5` names the law and names this component in it:

> The domain-neutral axis composition sits over BI `Slider`: label, unit, reserved live value,
> optional numeric entry, focus/target behavior, and a color-bearing or neutral track chosen by
> semantics. Picker, Generate count, **Extract**, Gradient, Atmosphere and Blob adopt that one
> composition; feature waves own their domain arrangement, **not new slider mechanics.**

ExtractControls invents new slider mechanics. For the k axis it positions a bare `<div>` behind the
Slider, paints the gradient on that div, and blanks the real track with
`--slider-track-bg: transparent` (lines 19–34). Then, forty lines later, for the kC axis, it does the
correct thing — hands the colour straight to `--slider-track-bg` (line 75).

**Two mechanisms for one job, in one file.** And the second one proves the first is unnecessary.

Measured, live, 1440 light — the hand-rolled div and the track it hides are the *same rectangle*:

```
=== KILL-SHOT 2: decoy div rect vs real track rect ===
 "decoyDiv":  { "x": 252, "y": 494.65625, "w": 434, "h": 24 }
 "realTrack": { "x": 252, "y": 494.65625, "w": 434, "h": 24 }
 "deltaPx":   { "x": 0, "y": 0, "w": 0, "h": 0 }
```

Zero deviation on all four edges. And the producer variable accepts exactly what the div was built to
carry:

```
=== KILL-SHOT 1: --slider-track-bg accepts a gradient ===
 "before": "none",
 "after":  "linear-gradient(90deg, rgb(255, 0, 0) 0%, rgb(0, 255, 0) 50%, rgb(0, 0, 255) 100%)",
 "acceptsGradient": true
```

Rendered proof: `evidence/pass-4/d4-PROOF-gradient-renders-through-slider-track-bg.png` — a
three-stop gradient painted through `--slider-track-bg` alone, full width, correctly pill-rounded,
thumb riding above it. The producer rule permits it by construction; `glass-ui.css`:

```css
.slider-track { background: var(--slider-track-bg, var(--muted-medium)); … }
```

`background` is the shorthand — it accepts any `<image>`. The decoy div has no reason to exist.

That posture is the parent of everything below. Because the component never drives the producer's
levers, it never inherits the producer's responsibilities: the coarse-pointer thumb contract
(D-3), the size scale (D-17), the disabled contract (D-7), and the dock-context geometry the two
separators silently need (D-5, D-6). And because the apparatus is hand-built, it is documented in
forty lines of comment prose asserting properties the render does not have (D-2, D-12, D-11).

---

## 2. Findings

### D-1 · BLOCKER · the decoy track — a hand-rolled div at pixel-identical coordinates to the track it blanks

**Evidence.** `ExtractControls.vue:19–34`. Measured rect delta `{0,0,0,0}` and the gradient proof
above (`evidence/pass-4/d4-killshot.txt`).

**Why it is a design defect, not a style quibble.** The gradient is the k axis's *data layer* — it
is the extracted palette. Painting it on a sibling div means the value the user is manipulating is
no longer owned by the control that manipulates it: the track's `background` transitions on
`var(--duration-fast)` (producer rule) while the div computes `transition: all` with no duration, so
the palette **snaps** while its own control's ink **fades**. One row, two temporal registers, for one
quantity.

**Cure.** Delete the div and the `--slider-track-bg: transparent` override; pass
`:style="{ '--slider-track-bg': gradient || trackInk }"`, exactly as the kC axis already does.
Net: −16 lines, −1 stacking context, −1 absolutely-positioned node, one mechanism.

### D-2 · BLOCKER · dark mode annihilates the pick's chroma — C 0.218 → 0.021, a 90.3 % loss

**Evidence.** The same `trackInk` computed, same route, same pick, two schemes:

| arm | computed `background-color` | L | C | h |
|---|---|---:|---:|---:|
| 1440 light | `oklch(0.545141 0.218024 9.834023)` | 0.545 | **0.218** | 9.834 |
| 390 dark | `oklch(0.958322 0.021053 9.834023)` | **0.958** | **0.021** | 9.834 |

Hue is preserved to six decimals. Chroma falls **90.3 %**. Lightness climbs to 0.958 — near-white.

**What that looks like.** `shots/safari-desktop-dark/extract.png` and
`shots/safari-mobile-dark/extract.png`: both rails render as near-white bars that are the brightest
objects on the page — brighter than the "Extract" title, brighter than every other element — and
sit directly above the undeveloped-plate skeleton, which is *darker* than they are. The live
controls read as placeholders and the placeholders read as content. The optical hierarchy is
inverted end to end.

**Canon.** `VISUAL-CONSTITUTION §6`: *"No path desaturates through gray."* The light→dark
transposition of this component's own certified ink desaturates by 90 %.

**Mechanism.** `useSafeAccentFn("resting")` → `certifyAccentInk(…, GRAPHICS_CONTRAST_FLOOR)` walks
lightness until a WCAG 1.4.11 ratio is met. It has a floor on *ratio* and no floor on *chroma* and no
ceiling on *lightness*. Against a dark plate the only way to raise contrast by moving L alone is to
go white, and going white in OKLCH costs all available chroma. The contract is satisfied numerically
and voided perceptually: the whole point of threading the *live pick* is that the control wears the
user's colour, and in dark mode it does not.

**Cure (producer-side, `color-session/ink.ts`).** Certify in OKLCH with a chroma floor and an L
ceiling; when the floor cannot be met by L alone, move the *relationship* rather than the colour —
ink the hairline ring at full chroma and drop the fill to a tinted low-alpha wash. The identity
survives, the ratio is carried by the ring, and the light and dark treatments become
transpositions of one design rather than two unrelated ones.

### D-3 · BLOCKER · on every coarse-pointer arm the thumb overhangs its own rail by 10 px, top and bottom

**Evidence.** Measured, 390 dark:

| element | y | h | span |
|---|---:|---:|---|
| k track | 459.28 | 24 | 459.28 → 483.28 |
| k thumb | 449.28 | **44** | **449.28 → 493.28** |
| kC track | 505.28 | 24 | 505.28 → 529.28 |
| kC thumb | 495.28 | **44** | **495.28 → 539.28** |

Reproduced at 320 (`d4-states.txt`: thumb `{y:367.8, h:44}` against rail `{y:377.8, h:24}`). Desktop
is flush (`{h:24}` vs `{h:24}`) — this is a coarse-pointer-only defect, which is why no desktop
review caught it.

**It is visible in the project's own shipped capture.** `shots/safari-mobile-dark/extract.png`: both
thumbs are black-outlined lozenges protruding above and below their white rails. It reads as a
rendering fault.

**Mechanism.** The spectrum variant's thumb is `height: 100%` of the track, and the track is
`calc(var(--slider-thumb-size, 1rem) * 1.5)` = 24 px at the default `size="md"`. A coarse-pointer
rule then grows the thumb to the 44 px touch minimum **without** growing the track. The consumer
never set `size` or `--slider-thumb-size`, so it inherits a pairing the producer only guarantees on
fine pointers.

**Cure.** `size="lg"` → `--slider-thumb-size: 1.5rem` → track 36 px, thumb 18 px, and the 44 px touch
grow no longer overhangs by 10 px on each side. This also raises the thumb above the 24 px target
floor (D-4). Producer-side, the coarse-pointer grow should raise the track with the thumb.

### D-4 · BLOCKER · the kC axis is unoperable at the canon's own narrow arms

**Evidence.** kC domain is `0 → 1.5, step 0.1` = **15 intervals**. Measured track width:

| arm | kC track w | px per step | thumb w | thumb in steps | thumb as % of track |
|---|---:|---:|---:|---:|---:|
| 1440 | 230.45 | 15.4 | 12 | 0.8 | 5 % |
| 390 | 80.45 | **5.36** | 12 | **2.2** | 15 % |
| **320** | **44.0** | **2.93** | 12 | **4.1** | **27 %** |

At 320 the thumb is wider than four of the fifteen positions it must distinguish, and occupies more
than a quarter of the whole axis. A fingertip contact patch (~9 mm ≈ 34 CSS px) covers **eleven of
the fifteen steps.** The control cannot be operated at its own declared granularity.

`evidence/pass-4/d4-narrow-320-kc-collapse.png` shows it: a 44 px crimson stub with a thumb nearly
centred in it, overhanging top and bottom, jammed against the reset icon.

**Cause is compositional, not dimensional.** The controls row packs three 44 px buttons, two
separators worth 26 px of zero ink (D-5), a label, a readout and the axis onto one flex line and lets
`flex-1` give the axis whatever is left. `VISUAL-CONSTITUTION §3.6`: *"Mobile uses one
document-scrolling stage→inspector→action sequence"* — a compressed desktop row is not that.

**Cure.** At the narrow arm kC takes its own row, exactly as k already does; the three actions keep
theirs. The k axis already proves the pattern works one line above.

### D-5 · MAJOR · two `DockSeparator`s — forbidden by the binding inventory, and 0 px tall regardless

**Canon.** `OPTICAL-BENCH-COMPOSITIONS.md §5`, the complete binding inventory:

| Composition | P122 boundaries | P122 reserve | Retained non-P122 dividing line | Grouping job |
|---|---|---|---|---|
| Extract | `[]` | `none` | **none** | image/specimen material and **interval** separate stage from controls |

and, immediately below the table: *"Any additional line, automatic P122 divider, consumer-hidden
producer line, terminal row rule, caster stroke or corner rule **is a defect**."*

Contract 0. Rendered 2 (`ExtractControls.vue:57`, `:81`). `PROPORTION-AUDIT` PR-05 already carries the
terminal disposition **REMOVE** for this family.

**And they do not render.** Measured on all three arms:

```
{ "cls": "dock-separator", "role": "separator", "ariaOrientation": "vertical",
  "rect": { "w": 1, "h": 0 }, "display": "block", "opacity": "1" }
```

`height: 0`. Zero painted pixels — confirmed by eye in all four shipped captures, where the gaps
between camera/kC and 0.5/reset contain nothing.

**This is the worst of both outcomes:** a divider the canon forbids, which sighted users never see,
which is nonetheless announced to assistive technology as `role="separator"`, and which costs
2 × (1 px + 12 px margin) = **26 px** of the very row whose axis is starved at 320 (D-4). Returning
those 26 px alone would take the 320 kC track from 44 px to ~70 px, a **+59 %** axis.

**Cure.** Delete both. The inventory's own grouping-job column already names the replacement —
*interval* — and the row already has `gap-2`. `PROPORTION-AUDIT §5.4`: *"Spacing plus material
already expressing the same boundary makes the line duplicative."*

*(Correction to pass 1: pass 1 attributed the 0 px to a missing `align-self: stretch`. Pass 2
corrected this and I confirm pass 2 — the producer declares `height: var(--dock-separator-height)`
explicitly, so `align-self` never participates. See D-6 for why the property is unset.)*

### D-6 · MAJOR · dock primitives worn on a card plate — the design-system boundary is crossed inward

`DockControl` and `DockSeparator` are **dock-context** primitives. Their own producer documentation
defines them in terms of a dock: `DockSeparator` *"reads the dock `orientation`/`layout` via
`useOptionalDockContext()`"*; `DockControl` *"the HIT CELL stays the full `--dock-control-size`
(≥44px on coarse via the density clamp)"*, with the paint inset via *"the dock-scoped
`--dock-control-safe-inset` fold"*.

ExtractControls seats all five inside a `Card`. Off-dock, every dock-scoped custom property falls to
its fallback — and `--dock-separator-height` has no fallback at all, which is precisely why the
separators compute to `height: 0` (D-5). The defect is not that a variable is missing; it is that
generic jobs (an icon action, a group divider) were solved by reaching into a *different component
family's* primitives rather than by the plate's own control grammar.

This is the mirror image of the D-1 posture: there, the component ignored a producer lever it should
have used; here, it borrowed a producer contract it was never inside. Both are the same failure to
sit where the design system expects the consumer to sit.

**Cure.** Icon actions on a workbench plate use the plate's control grammar, not the dock's. If no
such primitive exists, it belongs in glass-ui (edict 4) — not re-solved locally and not borrowed
from the dock.

### D-7 · MAJOR · `disabled` reaches 1 of 5 interactive controls

**Evidence.** The prop is referenced exactly three times, and *used* once:

```
$ grep -n "disabled" demo/workbenches/extract/ExtractControls.vue
84:                :disabled="disabled || !hasImage"     ← the only use: the Reset button
103:const { k, chromaWeight, gradient, cssColor, disabled, hasImage } =
109:        disabled?: boolean | undefined;
```

The consumer passes a meaningful value — `ExtractWorkbench.vue:70`:
`:disabled="session.isProcessing.value || cameraActive"`.

So **while a quantization is running, and while the camera viewfinder is open**, both sliders and
both of Upload/Camera remain fully interactive. Confirmed live: `"disabledAttr": null` on both
`.glass-slider` nodes; `"disabled": false` on the Upload and Camera buttons.

Both producers expose the lever the component declines to pull: `SliderProps` has
`disabled?: boolean`; `DockControl`'s props carry `disabled` and document it as *"the four-state
contract."*

**Canon.** `VISUAL-CONSTITUTION §4.1`: *"Selected, failed, pending, withdrawn and **disabled** states
are never color-only. Role, accessible name, state/value and associated error/status are explicit."*
There is no pending state expressed on this component at all — the only pending signal on the route
is the sibling skeleton swap, which lives in the parent.

### D-8 · MAJOR · neither axis satisfies the mandated axis composition

`VISUAL-CONSTITUTION §5` requires **label, unit, reserved live value**. Measured against both axes:

| requirement | k axis | kC axis |
|---|---|---|
| label | **absent** — the numeral `{{ k }}` occupies the label seat (line 15–17) | `kC` — an unexpanded symbol, disclosed only by `title` |
| unit | **absent** | **absent** |
| reserved live value | present but *is* the label; `w-5`, 1.3 % headroom (D-16) | `w-5`, `text-align: start` |
| `aria-valuetext` | `null` — announces "5", not "5 colors" | `null` — announces "0.5", unitless |

Reading down the left column of the rendered cluster, `5` and `kC` are vertically adjacent and
typographically identical (both Fira Code 400) while being *semantically opposite* — one is a value,
one is a name. Nothing in the design distinguishes them.

The same sentence of §5 forbids the remedy the component chose: *"feature waves own their domain
arrangement, **not new slider mechanics**."*

### D-9 · MAJOR · the empty state inverts the pane's hierarchy

In the state the route boots into — no image, `hasImage` false — the two slider rails are the
loudest, largest, most saturated objects on the plate, and they change nothing. The only actions
that can move the user forward, Upload and Camera, are quiet 40 px ghost icons. Reset is correctly
disabled; the sliders, which are equally inert, are not (D-7).

Visible in all four shipped captures. `shots/safari-desktop-light/extract.png`: the crimson k rail
is the single highest-contrast element inside the Extract card, above a dashed drop-zone and above
two low-contrast icons.

**Canon.** `VISUAL-CONSTITUTION §3.8`: *"One pane may have one full-strength visual protagonist.
Supporting fixtures do not compete with it through equal size or equal shadow."* Here the support
*is* the protagonist. `§7 · Extract` states the intended protagonist plainly: *"The image is the
stage."*

**Cure.** Pre-image, the axes are configuration for work not yet started: they take the de-emphasis
register (neutral track, quiet ink) and yield the plate to the drop-zone and the two actions. The
gradient's arrival on first extract then *is* the state change — the control lights up because it
now carries data. That is one design serving both states instead of one loud state serving neither.

### D-10 · MAJOR · three icon-only actions whose only name is a hover tooltip

**Evidence.** All three, measured live on every arm:

```
{ "title": "Upload image", "ariaLabel": null, "ariaLabelledby": null, "text": "", … }
{ "title": "Open camera",  "ariaLabel": null, "ariaLabelledby": null, "text": "", … }
{ "title": "Reset",        "ariaLabel": null, "ariaLabelledby": null, "text": "", … }
```

**Scope, stated honestly.** `title` *is* a valid accessible-name fallback under accname, so these
buttons are named to assistive technology. I therefore do **not** charge the visual audit's
`"namelessButtons": 3` on `/#/extract` to this component without first recovering the harness's name
predicate — that predicate (`capture.mjs:104`) tests only
`aria-label || aria-labelledby || textContent`, excluding `title`, so its count is consistent with
these three but does not prove them. Pass 2 reached the same conclusion by a different route and I
confirm it.

**What is a real defect regardless.** `title` is hover-only. On the two mobile matrices — half the
shipped audit surface, and the arms where this component is already broken (D-3, D-4) — there is no
mechanism by which a user can learn what the three buttons do. Sizes are fine (44 × 44 on coarse,
40 × 40 on fine, both above the 24 px floor), so this is purely a naming failure.

**Canon.** `PROPORTION-AUDIT` PR-07 — *"Hover-only/unlabeled controls … every surviving action/drag
seat has a name/state"*; PR-16 — *"no tooltip proliferation"*; `§5.6` — *"do not compensate for an
unnecessary action with tooltip proliferation. Subtraction precedes explanation."*

### D-11 · MINOR · the cluster's documented "ONE mono voice" is two voices

The component asserts, at lines 12–13:

> The k label speaks its cluster's ONE mono voice (weight 400, matching kC — E1-R1)

Measured, 1440 light:

| atom | family | size | weight |
|---|---|---:|---:|
| k readout `5` | Fira Code | **16.4 px** | 400 |
| kC label `kC` | Fira Code | **11 px** | 400 |
| kC readout `0.5` | Fira Code | **11 px** | 400 |

Weight matches. Size does not — **1.49 ×** between two readouts at the same semantic rung, in the
same control cluster, eleven lines apart in the template. The comment certifies the axis it was
checked on and is silent on the one that differs.

Additionally, `text-micro` (the kC pair) is **not in the binding type matrix**
(`OPTICAL-BENCH-COMPOSITIONS.md`, *Binding type matrix*), which enumerates for values/code/provenance
exactly `text-mono-small` *or* the established `mono-caption`. The k readout uses `text-mono-small`
and is in-matrix; the kC pair is out of it.

### D-12 · MINOR · the documented "outward hairline ring" is `inset`, and is invisible in the state it was written for

Lines 5–11 claim the certified ink *"survives OUTWARD as a persistent hairline ring (the
ShadowPalette hairline idiom turned outward), giving the component a certified identity edge
independent of its gradient content **in every state**."*

The implementation is `boxShadow: inset 0 0 0 1.5px ${trackInk}` (line 22) — **inward**. It does not
live outside the rail; it consumes 1.5 px of the gradient on every edge, which is to say it erodes
the data layer it was meant to frame.

And "in every state" is false at the state the route boots into: pre-image, measured,

```
"backgroundColor": "oklch(0.545141 0.218024 9.834023)",
"boxShadow":       "oklch(0.545141 0.218024 9.834023) 0px 0px 0px 1.5px inset"
```

ring colour ≡ fill colour, so the ring is invisible. The certified identity edge exists in exactly
the state the comment says it is redundant in, and is absent in the state the comment says it
carries.

### D-13 · MINOR · `.plate-ink` is copy-pasted into five components with no root definition

```
$ grep -rln "^\.plate-ink" demo/
demo/color-picker/ErrorBoundary.vue
demo/shared/ui/EmptyState.vue
demo/workbenches/extract/ExtractControls.vue
demo/workbenches/extract/ExtractWorkbench.vue
demo/workbenches/extract/ImageDropZone.vue

$ grep -rn "plate-ink" demo/styles/
(no output)
```

Five identical `<style scoped>` copies of a token-bearing rule; two of them in the same directory,
one in the immediate parent of this file. Owner edict 5 — *style at the root component level, never
per-instance*. A rule that resolves a design token belongs in `demo/styles/`, defined once.

### D-14 · MINOR · dead scoped rule, and a cross-component coupling it leaves stranded

`ExtractControls.vue:139–142` declares, under the comment *"Touch gate styling for extract sliders"*:

```css
.touch-gate-target { border-radius: var(--radius-pill); }
```

Measured on the live route: `document.querySelectorAll(".touch-gate-target").length` → **0**. The
class appears nowhere in this component's template, and glass-ui never emits it
(`grep -c touch-gate-target` over `glass-ui.css` and the slider chunk → `0`, `0`). It is also inside
`<style scoped>`, so even if it were applied it could not reach the Slider's internals, which carry
glass-ui's scope id rather than this file's.

The coupling this strands: `ComponentSliders.vue:245` maintains a deliberately **unscoped** global
block and names its reason —

> The selectors target reka-ui's Slider markup classes … which are emitted across multiple slider
> host components (ComponentSliders, SpectrumCanvas, plus the **ExtractControls**/PointerDebug
> `touch-gate-target` uses) — the block is intentionally UNSCOPED so the cascade reaches consumers
> outside this SFC's data-v-* attribute scope.

A global escape hatch is being carried in another component partly to serve this one, and this one
never opts in. The rule's stated purpose — touch-target sizing — is exactly what is measurably
broken here (D-3, D-4).

### D-15 · MINOR · `text-right` is physical; in RTL the numeral detaches from its rail

**Evidence.** Measured, 1440, `dir="rtl"` applied live:

| arm | label box | rail edge nearest label | ink-to-rail distance |
|---|---|---:|---:|
| LTR | 224 → 244, `text-align: right` | rail left = 252 | **8 px** (digit hugs the rail) |
| RTL | 1196 → 1216, `text-align: right` | rail right = 1188 | **28 px** (digit hugs the far edge) |

In LTR, `text-right` on a 20 px box points the digit *toward* its rail — the optical tie that makes
`5` read as belonging to the bar beside it. In RTL the flex row reverses and the label lands to the
right of the rail, but `text-right` is physical and still points right, so the digit now hugs the
edge **away** from the rail across an empty 20 px box. The tie is broken; the numeral reads as
detached.

`VISUAL-CONSTITUTION §6.1`: *"chrome, navigation and layout — logical inline/block direction follows
the document."* The cure is `text-end` (logical), one token.

*(This closes a genuine coverage gap: the state matrix at `shots/{rtl,forced-colors,zoom-200,
keyboard-focus,reduced-motion}-desktop/` covers only `adminusers, blob, browse, gradient, picker` —
`extract` is in none of them. This is the first RTL measurement of this component.)*

### D-16 · MINOR · the k reservation has 1.3 % headroom and depends on a webfont

Driven to maximum by keyboard, 1440 light:

```
text                "16"        ariaValueNow "16"     ariaValueText null
boxWidth            20px        clientW 20   scrollW 20   overflows false
measuredInkWidth    19.74px     headroomPx 0.26        headroomPct 1.3
fontResolved        "Fira Code", "Fira Code Fallback", "Fira Mono", monospace
```

**It does not overflow at this arm** — and I record an explicit disagreement: pass 2 (P2-1/P2-2)
reports the k and kC reservations overflowing at every legal value; I measured
`scrollWidth === clientWidth` and `overflows: false` for both at 1440 light with Fira Code resolved.
Either pass 2 measured a different arm or a different box; the disagreement should be adjudicated
before either number is carried into a wave.

What is defensible from my measurement: **0.26 px of slack.** The box is `whitespace-nowrap`, so any
of the three declared fallbacks (`Fira Code Fallback`, `Fira Mono`, generic `monospace`) with a
wider advance spills rather than wraps — into the 8 px gap, against the rail. A reservation with
1.3 % headroom and a webfont dependency is not reserved.

Related and certain: the k readout is `text-right`, the kC readout is `text-align: start`
(measured). Two numeric readouts, one cluster, opposite alignment.

### D-17 · INFO · every producer lever that would have prevented D-1/D-3/D-4/D-7 is unused

glass-ui 7.0.0 exposes, and this component uses none of:

| lever | what it would have solved |
|---|---|
| `--slider-track-bg` (k axis) | D-1 — the decoy div |
| `size="sm\|md\|lg"` → `--slider-thumb-size` `.5/1/1.5rem` | D-3, D-4 — thumb/track pairing and target floor |
| `--slider-track-height` | the hand-rolled `h-6` |
| `disabled` (Slider **and** DockControl) | D-7 |
| `marks?: readonly number[]` | the k axis is 16 discrete integers with no positional legibility |

The hand-rolled rail is `h-6` = 24 px. The spectrum variant at the default `size="md"` computes
`calc(var(--slider-thumb-size, 1rem) * 1.5)` = **24 px**. The component hand-built, and then had to
maintain, the exact number it already had. 24 px is also *off* the producer's own size scale
(12 / 20 / 28 px) — so the one number it chose by hand is the one number the scale does not contain.

---

## 3. State coverage register

Every state this component can occupy, and its status. Rows marked ✱ are ones I measured for the
first time in this pass.

| State | Handled? | Evidence |
|---|---|---|
| empty (no image) — boot state | **broken** | D-9 hierarchy inversion; sliders loud and inert |
| populated (gradient present) | partial | D-1 two temporal registers; D-12 ring behaviour inverts |
| loading / `isProcessing` | **absent** | D-7 — sliders and Upload/Camera stay live during quantize |
| camera open | **absent** | D-7 — same; `cameraActive` reaches only Reset |
| error | not this component's | parent renders the destructive line (`ExtractWorkbench.vue:80–85`) |
| disabled | **1 of 5 controls** | D-7 |
| hover | producer-supplied | `--btn-hover-color` per-instance pin on all three DockControls |
| focus (keyboard) ✱ | geometry stable, ring is producer's | `d4-states.txt` `focus-1440`; no consumer focus treatment |
| active / pressed | producer-supplied | DockControl spring press |
| dragging (slider) | producer-supplied | thumb spring; the `touch-gate` the component *documents* is dead (D-14) |
| overflowing / truncated | **1.3 % headroom** | D-16 |
| RTL ✱ | **broken** | D-15 — measured 8 px → 28 px ink-to-rail |
| reduced-motion | not independently violated | nothing spatial animates here; register inconsistency only (§4) |
| forced-colors ✱ | **undesigned** | §5 below |
| zoom 200 % ✱ | holds | `d4-states.txt` `zoom200-720`: `overflowX: 0`, no reflow defect |
| 320 narrow arm ✱ | **broken** | D-4 — 2.93 px/step; D-3 — 10 px overhang |
| coarse pointer ✱ | **broken** | D-3 |
| dark scheme | **broken** | D-2 |

## 4. Motion

Nothing here animates a layout-forcing property and nothing is spatial, so `prefers-reduced-motion`
is not independently violated — the app carries reduced-motion handling and none of it needs to
reach this component. The defect is register consistency, and I confirm pass 2's correction of pass
1 on this point:

- `.slider-track` (producer, same row): `transition: background var(--duration-fast) var(--ease-standard)` — tokenized.
- the three icons: `transition-colors` → `0.2s`, Tailwind's built-in default. `--duration-fast` is **150 ms**; 200 ms is not it.
- the decoy rail div: computes `transition: all` with no duration — so the gradient **snaps** while the sibling kC track fades.

Three timing sources in one control row. `VISUAL-CONSTITUTION §6`: *"Spatial continuity uses one
producer-owned glass-ui spring register. Color/opacity effects use the corresponding short effect
curve."* **Severity MINOR**, and D-1's cure removes the third source for free.

## 5. Forced colors — undesigned

Measured under `forced-colors: active` (WebKit emulation), the track ink still computes as an author
colour: `oklch(0.594176 0.237635 9.834023)` — and note it is a *third* value, different from both the
light (0.545/0.218) and dark (0.958/0.021) arms, so the "certified" ink is not stable across this arm
either.

I mark the rendering claim a **hypothesis**, because WebKit's `forced-colors` emulation does not
faithfully implement `forced-color-adjust`, and I will not assert a paint result I could not observe
on a real high-contrast host.

> **This downgrades a prior BLOCKER.** Pass 1's D-1 was *"both slider tracks disappear entirely under
> `forced-colors: active`"*, rated BLOCKER. I could not substantiate "disappear" — under emulation
> the author colour survives into the computed value, which is the opposite result, and emulation is
> not evidence either way. The finding is real but its severity is unproven until someone runs a real
> Windows High Contrast host. **Recorded as an open verification, not a closed BLOCKER.**

What is *not* hypothesis is the design posture: both axes carry their
entire identity in `background-color` plus an `inset` `box-shadow`, applied through an inline
`style` attribute, with **no border and no outline**. Forced-colors environments flatten backgrounds
and suppress shadows. A control whose only two identity carriers are the two things that mode
removes has no forced-colors design — it has an untested default.

`VISUAL-CONSTITUTION §4.1` requires state to remain distinguishable *"in both schemes, forced colors
and reduced transparency"*; `§4.2` requires a *"nonzero monochrome/forced-colors delta"* for state.
Neither is expressed here.

**Cure.** Identity rides a `border` (which forced-colors repaints with the system palette) rather
than a background + inset shadow; the gradient becomes decoration that may legitimately vanish.

## 6. Negatives — what I attacked and could not break

Stated so the verdict is not mistaken for a sweep.

- **`variant="spectrum"` is legal.** `SliderVariant = "standard" | "spectrum"` — correct use.
- **Tap targets on the three actions are fine.** 44 × 44 coarse, 40 × 40 fine — both clear the 24 px floor. The route's small-target rows that belong to this component are the two *thumbs*, not the buttons.
- **Horizontal overflow is zero** on all seven arms I drove, including 320 and RTL.
- **Zoom 200 % holds** — no reflow defect, `overflowX: 0`.
- **No console or page errors** on `/#/extract` in any of the four shipped matrices (`REPORT.json`).
- **`verbatimModuleSyntax` is satisfied** — the sole type-only import is `import type { SpaceId }` in the parent; this file's imports are all value imports.
- **Vue 3.5 idiom is correct** — reactive props destructure at line 103, no stale-read pattern, no `defineModel` round-trip.
- **No god module** — 151 lines, one job.
- **`prefers-reduced-motion` is not independently violated** (§4).

## 7. The blocked waves

**Consumer edits are FORBIDDEN until Glass 8.** The pin
`71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28` is held under the glass BJ W4
hold. Both waves below are authored, not executed.

### W·EC-α — consumer-only; needs no producer change

**Release condition:** the glass BJ W4 hold is lifted on `demo/workbenches/extract/**` — i.e. the
pin above is released by the Glass 8 adoption, with no producer API dependency. This wave may land
the moment the hold lifts.

| # | Cure | Closes |
|---|---|---|
| α1 | Delete the decoy rail div and the `--slider-track-bg: transparent` override; pass `:style="{ '--slider-track-bg': gradient \|\| trackInk }"` on the k Slider | D-1, and one of §4's three timing sources |
| α2 | Delete both `<DockSeparator />` | D-5, D-6 (partial); returns 26 px to the row (+59 % kC track at 320) |
| α3 | Thread `disabled` to both Sliders and to Upload and Camera | D-7 |
| α4 | `size="lg"` on both Sliders | D-3, D-4 (partial), D-17 |
| α5 | kC takes its own row at the narrow arm | D-4 |
| α6 | Give the k axis a real label and both axes a unit + `aria-valuetext` | D-8 |
| α7 | `aria-label` on all three actions (keep `title`) | D-10 |
| α8 | `text-right` → `text-end` on the k label; align both readouts alike | D-15, D-16 |
| α9 | Delete the dead `.touch-gate-target` rule; relay to `ComponentSliders` that its unscoped block no longer serves this consumer | D-14 |
| α10 | Move `.plate-ink` to `demo/styles/`, delete all five scoped copies | D-13 |
| α11 | Pre-image, both axes take the de-emphasis register; the gradient's arrival is the state change | D-9 |
| α12 | Correct or delete the comment blocks that assert properties the render lacks (lines 3–13, 5–11) | D-2, D-11, D-12 |

### W·EC-β — producer-gated

**Release condition:** glass-ui ships a major (≥ 8.0.0) containing **all four** of β1–β4, and the
value.js adoption wave for that major is open. β is blocked on that release and may not be
partially landed — β2 without β1 re-introduces D-3 at a different size.

| # | Producer change | Closes |
|---|---|---|
| β1 | `certifyAccentInk` certifies in OKLCH with a **chroma floor** and an **L ceiling**; when the ratio cannot be met by L alone it moves the ring/fill relationship rather than the colour | D-2 |
| β2 | The coarse-pointer thumb grow raises the **track** with the thumb, preserving the spectrum `height: 100%` contract | D-3 |
| β3 | Slider identity survives `forced-colors` — a `border` carries it, not `background` + inset shadow | §5 |
| β4 | `--dock-separator-height` gains a fallback, **or** `DockSeparator` is documented dock-band-only and `DockControl` gains an off-dock seating contract | D-6 |

*(β4 supersedes pass 1's β4, which proposed `align-self: stretch`; pass 2 correctly showed an
explicit `height` declaration defeats `stretch`. β4 is moot if α2 lands, which the canon requires
independently.)*

## 8. Verdict

**DEFECTIVE.**

Four BLOCKERs, six MAJORs, six MINORs, one INFO. Three of the four BLOCKERs are visible in the
project's own shipped Safari captures without any instrumentation: the near-white dark-mode rails,
the thumbs protruding from their rails on mobile, and the 44 px kC stub at 320.

The strongest single defect is **D-1**, not because it is the most visible but because it is the
one the others descend from: a hand-rolled div occupying a rectangle identical to the producer track
it blanks — `delta {0,0,0,0}` — to paint a gradient that the producer's own `--slider-track-bg`
accepts and renders correctly, as proved live and photographed. The same file's second slider
already does it the right way. That is not a missing feature or a hard trade-off; it is a component
that chose to build beside the design system rather than on it, forty lines after demonstrating it
knew how.

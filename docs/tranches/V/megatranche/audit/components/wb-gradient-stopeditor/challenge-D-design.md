# CHALLENGE-D — `GradientStopEditor.vue` is designed wrong

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context arm), the tier this seat was
explicitly spawned with. The declaration is present and matched; the seat is not inherited and not
undeclared. No Fable/Sonnet substitution occurred in this seat's own reasoning or tool use.

**Subject** `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` (392 lines)
**Route** `http://localhost:9000/#/gradient` · **Verdict** `DEFECTIVE` · **3 BLOCKER / 6 MAJOR / 4 MINOR / 1 INFO**
**Live base** dev server at :9000, branch `tranche-u`, HEAD `c654824e`
**Probes** `evidence/p1.mjs`…`p5.mjs` (WebKit/Playwright, desktop 1440×900 @2×, mobile iPhone 14) — re-runnable verbatim.

---

## 0. What this instrument is supposed to be

`VISUAL-CONSTITUTION.md §7 · Gradient` (binding):

> The rounded meniscus rail and its preview dominate. **Each WatercolorDot stop is a face inside an
> enclosing geometric button/seat; that seat alone carries selection, focus, drag and accessible
> state.** Stops have explicit add/move/remove/**numeric** alternatives.

`§5.2` (binding, the direction/axis table):

> **Gradient stop position** | Right increases serialized stop percentage; Left decreases; Up/Down
> use the same signed step when supported | **Home=0%, End=100%; announce stop identity, percentage,
> ordinal**

`§5.2` again, the reorder row:

> **horizontal explicit reorder: palette colors, operands, stops** | after Space grabs, Right moves
> one visual position right … every move announces item and `position of total`; Space drops, Escape
> cancels

The shipped component satisfies **none** of these three. What follows is why that is not a
labelling quibble — the constitution is describing the only geometry in which this instrument is
coherent, and the shipped geometry is incoherent in four independent ways I could measure.

---

## 1. BLOCKER · D-1 — the rail has **two different position axes**, and the source comment asserts they are one

### The claim in the file

`GradientStopEditor.vue:8–13`:

> the rail ALWAYS paints this — at every type/direction — so **handles, add-ghost and ramp share one
> axis by construction**.

`GradientStopEditor.vue:49–53`:

> Handle CENTERS ride an inset track `[HANDLE_HALF, width - HANDLE_HALF]`

### The measurement

The **ramp** is painted by `.gradient-rail` (`:317–326`) as `background: var(--rail-ramp)` with
`background-origin/clip: border-box` and `background-size: 100% 100%`. `serializeRailRamp`
(`useGradientCSS.ts:266`) emits `linear-gradient(90deg, …)`. So *the ramp's axis is the full
border-box width `W`*: colour `p%` is painted at `x = W·p/100`.

The **handles** ride `handleLeft()` (`:55–57`) = `calc(10px + (100% − 20px)·p/100)`, resolved against
the *padding* box. So *the handle axis is `[11, W−11]`*.

Two affine maps. They agree at `p = 50` and nowhere else.

```
$ node evidence/p1.mjs      # desktop 1440×900
BAR   x=224.00  w=462.00
handle "Gradient stop at 0%"    centerX = 235.00     ← ramp paints 0%   at x = 224
handle "Gradient stop at 100%"  centerX = 675.00     ← ramp paints 100% at x = 686
```

The 0 % swatch sits **11 px** — `11/462 = 2.38 %` of the ramp — to the right of where the ramp
paints 0 %. On mobile the same 11 px is a **3.40 %** error (`p5.mjs`: bar `w=324`, handle centres
`44` / `346`). *The error is viewport-dependent*: the instrument is wrong by a different amount at
every width.

### The user-visible consequence, measured

`getPosition()` (`:75–81`) inverts the **handle** axis, so a pointer at rail-fraction `f` mints a
stop at `(fW−10)/(W−20)`, not at `f`:

```
$ node evidence/p3.mjs   # T6: ten clicks at rail fractions .12 .20 .28 .36 .44 .52 .60 .72 .80 .88
T6 dense {"pos":["0","10","19","27","35","44","52","60","73","81","90","100"]}
                          ↑ click at 12.0 %  → stop at 10 %      (−2.0)
                                                    ↑ click at 88.0 % → stop at 90 % (+2.0)
```

So all four of these disagree simultaneously and by design:

| what the user points at | what the ghost previews | what is minted | what the ramp shows there |
|---|---|---|---|
| rail-fraction 12 % | `colorAt(10)` drawn at handle-x(10) | a stop at 10 % | the colour of 12 % |

The add-ghost (`:214–226`) is *internally* consistent with the handles and *externally* wrong
against the ramp it floats on. The "self-evident gesture, no instruction line needed" the comment
at `:35–41` claims is a gesture that lands somewhere else.

**Reproduction** `node evidence/p3.mjs` → block `T6`. **Mechanism** two coordinate systems for one
domain quantity. **Cure (gestalt, not patch)** *one* axis expressed *once*. Either paint the ramp on
the inset track (`background-position: 11px 0; background-size: calc(100% − 22px) 100%` — the pill
caps then hold flat terminal colour, which is also what a gradient stop at 0 % actually means), or
put the handles on the full-width axis and let the rail's own silhouette be inset instead. The
`HANDLE_HALF` literal must then be read from the rendered handle box, not re-declared in JS
(see D-13).

---

## 2. BLOCKER · D-2 — no ordering invariant: a drag can cross a neighbour and corrupt the artifact

Nothing in this component or in `useGradientModel.updateStop` (`useGradientModel.ts:127–131`)
maintains `stops[i].position ≤ stops[i+1].position`. `addStop` sorts (`:118`); *moving* never does.

```
$ node evidence/p4.mjs      # T10: add stops at ~30 % and ~62 %, drag the 62 % handle left to ~10 %
T10 stops after cross {"n":4,"pos":["0","29","8","100"],"centers":[235,362.6,270.6,675]}
T10 ramp stop %s: first20 = [0, 2.64, 5.27, 7.91, 10.55, 13.18, 15.82, 18.45, 21.09, 23.73,
                             26.36, 29, 27.1, 25.2, 23.3, 21.4, 19.5, 17.6, 15.7, 13.8]
                  descendingPairs = [[12,29,27.1],[13,27.1,25.2],…,[21,11.9,10]]
```

`sampleCoalescedStops` (`useGradientCSS.ts:195–200`) computes `pos = s0.position + t·(s1−s0)`; with
`s0=29, s1=8` the range is negative, so it emits **ten monotonically decreasing stop percentages
into a CSS `linear-gradient`**. CSS clamps each stop to its predecessor → the whole interval
collapses to one hard edge:

![cross-drag hard band](evidence/D02-cross-drag-hard-band.png)

The seam at ≈x 280 is that clamp. The blue-filled ring sitting on green at ≈8 % is the crossed stop —
its swatch and the ramp now disagree by the entire hue span, not by D-1's 2.4 %.

Two further silent corruptions ride along:

- **Easing intervals re-pair without notice.** `intervals[i]` is keyed by array index, not by the
  stop pair. After the cross, the curve the user authored for "stop 2 → stop 3" now spans a
  backwards interval. `GradientEasingEditor` still labels it by index — measured
  (`p2.log`, T3): `["1 → 2", "2 → 3"]`.
- **`colorAtPosition` (`GradientVisualizer.vue:64–88`) assumes sorted input** and silently returns
  the wrong interval's colour when it is not; its `throw new Error("No gradient interval contains
  …")` arm is reachable-in-principle for deeper crossings (labelled **hypothesis** — I did not
  produce a throw in 5 probe runs).

**Reproduction** `node evidence/p4.mjs` → `T10`. **Mechanism** an ordinal identity that exists in the
UI vocabulary ("stop 2", "1 → 2") but has no representation the model defends. **Cure** the model owns
the ordinal: re-sort on every position commit and re-key intervals to the *pair*, or clamp a dragged
stop into `(prev, next)`. Then add the reorder grammar `§5.2` already specifies (Space-grab,
`position of total` announcement, Escape cancels) — with a defended ordinal that becomes a small
feature; without one it is unimplementable.

---

## 3. BLOCKER · D-3 — on touch, aiming at a selected stop **deletes** it

The remove chip (`:284–300`) is `top-11` (44 px) — 4 px below the 40 px rail — and carries the same
always-on hit inflation as the handle (`:374–391`), which on coarse pointers is
`--touch-target: 2.75rem` = 44 px. The *selected* handle is `scale(1.25)` (`:262`), and because the
`::before` expander is a child of the transformed box, **its hit region scales too** → 55 px.

Those two invisible regions overlap, and the chip is `z-20` against the handle's `z-10`:

```
$ node evidence/p3.mjs      # T7, iPhone 14
T7 handle-hit offsets -26 → 13  |  chip-hit offsets 14 → 40      (offsets from the handle's centre)
T7 expander 44px x 44px  (×1.25 on the selected handle → 55px)
```

```
$ node evidence/p4.mjs      # T11, iPhone 14 — the destructive path
T11 before                             {"n":3,"pos":["0","50","100"]}
T11 selected                           {"n":3,"pos":["0","50","100"]}
T11 after tap at handle-centre + 20px  {"n":2,"pos":["0","100"]}     ← the stop is GONE
```

A tap **inside the selected handle's own advertised 55 px target** destroys the stop. There is no
undo, no confirmation, and no visual cue that the lower third of the handle is a delete zone. This is
the exact inverse of the comment's own reasoning at `:361–373`, which reasons carefully about the
*bar's* add-guard and never considers the chip-vs-handle case.

**Reproduction** `node evidence/p4.mjs` → `T11`. **Mechanism** two invisible expanded targets stacked
on one axis with the destructive one on top. **Cure** the chip does not live under the handle. Put
remove in the (currently non-existent) selected-stop inspector — see D-9 — where the constitution
already puts destructive verbs: *"Full detail, rename/lifecycle/export actions and durable operation
state live in the selected inspector"* (`§5`). If it must stay on the rail, it goes *above* the rail
in the opposite direction from the drag axis, and the two expanders are made mutually exclusive.

---

## 4. MAJOR · D-4 — the chip has **zero reserved geometry** and paints across the next section's rule

`PROPORTION-AUDIT.md §5.3` (binding): *"Renderer, icon or touch footprints may reserve collision
space **only on the axis where collision exists**."* Here collision exists on the block axis and
**nothing is reserved**.

```
$ node evidence/p2.mjs      # T2, desktop
editorRoot   y 200.7 → 240.7   (h = 40 — the rail, nothing else)
chip         y 244.7 → 268.7   (h = 24, z-index 20)
hr (section) y 260.7 → 261.7
hrIsUnder    "BUTTON.rail-remove-chip"      ← the chip is what paints at the rule's own y
```

The chip protrudes **28 px** past its own component's layout box, consumes the parent's entire
`gap-5` (`GradientVisualizer.vue:135`), and lands **8 px past the Interpolation section rule**, which
it visibly cuts:

![chip crossing the section rule](evidence/D04-chip-crosses-section-rule.png)

Because the chip is `v-if`-mounted on selection, this also means **selecting a stop repaints another
section's boundary** — a state change in one instrument mutating the perceived structure of the next.

**Reproduction** `node evidence/p2.mjs` → `T2`. **Mechanism** an absolutely-positioned affordance
with no block-axis reservation in a `flex-col gap-5` parent. **Cure** as D-3 — the chip leaves the
rail. If it stays, the editor root reserves its own footprint (`padding-block-end`), never the
parent's gap.

---

## 5. MAJOR · D-5 — the stop swatch is a **tautology**, so the instrument reads as a row of holes

A stop handle's job is to show the stop's colour. But at a stop's own position **the ramp already is
that colour** — that is what a gradient stop means. Painting the colour again, in a 20 px circle,
directly on top of the ramp, produces zero figure–ground separation. The only thing that reads is the
1 px white ring, i.e. a hole:

![rest state, desktop light](evidence/D05-rest-state-rings-desktop-light.png)

At working density it is unambiguous — twelve stops, twelve empty rings, no specimen anywhere:

![twelve stops](evidence/D05-twelve-stops-empty-rings.png)

The selected state (6th ring above) differs from its neighbours by `scale(1.25)` plus
`border-white` vs `border-white/80` (`:236–240`) — a size change of 5 px and an alpha change of 0.2.
In the shot at 100 % you can find it only by measuring. `§4.1` is explicit: *"Selected, failed,
pending, withdrawn and disabled states are never colour-only. Role, accessible name, state/value …
are explicit."* Here the state is *size-and-alpha-only* and (see D-7) absent from the accessibility
tree entirely.

**Reproduction** the shipped audit shot
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/gradient.png` and
`evidence/D05-twelve-stops-empty-rings.png`. **Mechanism** a swatch placed on a ground that is
definitionally identical to it. **Cure** the constitutional one: the stop rank moves **off** the
meniscus onto its own neutral seat rail beneath it, each seat a geometric button carrying a
WatercolorDot face (D-6). Then the face reads as a specimen against a quiet ground, the meniscus
stays an unbroken spectral rail (`§2`: *"a continuous liquid-color rail"*), and selection can be
expressed by the seat instead of by 5 px of scale.

---

## 6. MAJOR · D-6 — species violation: hand-rolled circle where the constitution names WatercolorDot

`§7 Gradient` requires *"Each WatercolorDot stop is a face inside an enclosing geometric
button/seat"*. `§4.2` names the executor sites explicitly: *"W19–W22/W25–W27 execute Dock seal/edit,
ColorSpaceSelector, eyedropper, Spectrum, channel, palette, Generate, Mix and **Gradient** sites."*

The shipped handle is a `<button>` with `background: linear-gradient(${cssColor}, ${cssColor}),
var(--alpha-checker)` (`:247`) — a hand-rolled circular swatch. There is no `WatercolorDot` import in
the entire gradient workbench:

```
$ grep -rln "WatercolorDot" demo/ | wc -l
19            # Mix, Picker, Dock, Generate, Extract, ColorSpaceSelector, palettes, EmptyState …
$ grep -rn "WatercolorDot" demo/workbenches/gradient/
(no matches)
```

The species exists, is a producer primitive, and is consumed by nineteen other demo files. This
component reaches past it. **Owner edict 4** ("glass-ui is the design system … reuse existing
component-type names") and `§7` are both violated by the same line.

**Reproduction** the two greps above. **Mechanism** a local re-implementation of a producer species.
**Cure** consume it — with D-5's seat, the face is `WatercolorDot` and the seat is the named button
that owns selection/focus/drag, which is precisely the shape `§4.2` already ratified.

---

## 7. MAJOR · D-7 — the keyboard grammar is a third of the specified one, and AT sees no state at all

`§5.2` mandates `Home = 0%`, `End = 100%`, Up/Down at the same signed step, and an announcement
carrying *"stop identity, percentage, ordinal"*.

```
$ node evidence/p2.mjs      # T4 — focus handle 0, press each key, read the aria-labels
Home              → "Gradient stop at 0%|Gradient stop at 100%"   (no change)
End               → (no change)
ArrowUp           → (no change)
ArrowDown         → (no change)
PageUp            → (no change)
Space             → (no change)          ← §5.2's reorder grab: absent
ArrowRight        → "Gradient stop at 1%"
Shift+ArrowRight  → "Gradient stop at 11%"
```

`onHandleKeydown` (`:173–187`) handles exactly `ArrowLeft`/`ArrowRight`/`Delete`/`Backspace`/`Escape`.
Home, End, Up, Down, PageUp/Down and the Space-grab are unhandled no-ops.

The accessibility surface is thinner still (`p1.mjs` attribute dump):

```
attrs: data-stop-id, type=button, aria-label="Gradient stop at 0%", class, style
role: null      aria-pressed: absent    aria-valuenow/min/max: absent    aria-describedby: absent
```

So: **no ordinal** ("stop 2 of 4" is unspeakable), **no selected state in the a11y tree** (the
`selectedId` that drives scale and the chip is invisible to AT), no value semantics on a control
whose entire job is a value. A screen-reader user can move a stop and can never learn which one is
selected or how many exist. The remove chip appears and disappears from the DOM on selection with no
live announcement.

**Reproduction** `node evidence/p2.mjs` → `T4`; `node evidence/p1.mjs` → `handles[].attrs`.
**Mechanism** a bespoke button pretending to be a value control. **Cure** the seat is a real slider
role (`role="slider"`, `aria-valuenow/min/max`, `aria-valuetext` carrying identity + percentage +
ordinal, `aria-pressed`/`aria-current` for selection) — or, better and per `§5`, the seat composes
the producer axis: *"The domain-neutral axis composition sits over BI `Slider` … **Gradient** …
adopt that one composition; feature waves own their domain arrangement, **not new slider
mechanics**."*

---

## 8. MAJOR · D-8 — the add affordance **starves as the instrument fills**

The bar's add path is gated by `target.closest("[data-stop-id]")` (`:87`, `:98`). Because every
handle carries an always-on 24 px (fine) / 44 px (coarse) invisible expander, every handle deletes a
24 px band of rail from both the ghost and the add gesture.

```
$ node evidence/p3.mjs      # T6 — 12 stops, then sweep elementFromPoint across the rail
T6 neighbour gaps px [44.9,36.9,36.6,36.9,37,36.5,37,55,36.5,36.9,45.8]  min 36.5
T6 addable rail {"totalPx":462,"addablePx":165,"pct":35.7}
```

**64.3 % of the rail can no longer mint a stop.** The ghost also vanishes in those bands, so the
affordance the comment at `:35–41` calls "self-evident" silently stops being available with no
indication of why. At the ends the effect is absolute from the first frame: the leftmost and
rightmost 23 px of the rail *never* add — `p2.mjs` T1 clicks at `bar.x + 3` and the stop count stays
`2`.

On coarse pointers with 44 px expanders the addable fraction at 12 stops is lower still (not
measured — labelled **hypothesis**; the arithmetic is `462 − 12·44 < 0`, i.e. plausibly zero).

**Reproduction** `node evidence/p3.mjs` → `T6`. **Mechanism** operable-target inflation applied to an
element that also acts as a *mask* over a second gesture on the same surface. **Cure** separate the
surfaces: with D-5's seat rail below the meniscus, the meniscus itself is free for add, and the seats
never shadow it. `PROPORTION-AUDIT §5.7` is the licence — *"Visual glyph size, operable target size
and layout reservation are separate quantities"* — but it does not license one control's target
eating another control's gesture.

---

## 9. MAJOR · D-9 — `select` has no payload: there is **no way to edit a stop's colour anywhere in the product**

`§5`'s global grammar is **select → tune → commit**. Here select → nothing.

```
$ grep -rn "selectedStopId" demo/
GradientVisualizer.vue:51    const selectedStopId = defineModel<string|null>("selectedStopId", {default:null});
GradientVisualizer.vue:140   v-model:selected-id="selectedStopId"
GradientVisualizer.vue:144   @select="(id) => selectedStopId = id"
```

Three lines, all inside one file, all of them plumbing the value straight back to the component it
came from. `GradientPane.vue` never binds it. **No inspector, no readout, no numeric field consumes
the selection.** The only thing selection does is scale a ring by 25 % and mount the delete chip.

Worse, the domain verb is missing outright:

```
$ grep -rn "updateStop" demo/
useGradientModel.ts:127   function updateStop(id, patch: Partial<Pick<GradientStop,"cssColor"|"position">>)
GradientVisualizer.vue:95 updateStop(id, { position });          ← the ONLY call site
```

The `cssColor` arm of `updateStop` is **dead code**. A user can add a stop, move it and delete it,
but **cannot change its colour** except by hand-editing the CSS text area. `§7 Gradient` requires
*"explicit add/move/remove/**numeric** alternatives"*; there is no numeric position entry either.
`PROPORTION-AUDIT` PR-07 (*"Hover-only/unlabeled controls and invisible drag state"* →
`ADD-AFFORDANCE / REMOVE`) is the register row this sits under, unclosed.

**Reproduction** the two greps above. **Mechanism** a selection state invented for local styling
before the thing it selects *for* existed. **Cure** either land the selected-stop inspector (colour +
numeric position + remove, which simultaneously cures D-3 and D-4), or delete the selection state and
the chip and let the rail be a pure move surface. The present middle position is the only
indefensible one: it pays the entire cost of selection (a mode, a destructive control, a scale ladder,
a z-index war) for none of its value.

---

## 10. MINOR · D-10 — no invalid-colour state: an unparseable stop renders an **invisible** handle

`:247` interpolates `stop.cssColor` verbatim into a `background` **shorthand**. CSS drops the *entire*
declaration on an invalid value — including the `var(--alpha-checker)` ground:

```
$ node evidence/p3.mjs      # T8 — set the same shorthand on a probe element, read computed value
valid       "linear-gradient(rgb(255,0,0), rgb(255,0,0)), repeating-conic-gradient(oklab(…"
emptyOklch  "none"          ← linear-gradient(oklch(), oklch()), var(--alpha-checker)
emptyRgb    "none"
empty       "none"
```

`gradientParse.ts:252,256` keeps *the authored literal* (`"stops[].cssColor` keeps the AUTHORED
literal (`red` stays `red`, P2-15)"`), so whatever the code editor accepted flows to this line
unrewritten. This is the shipped-crash family **MT-F001** (`parseCssColor` throws on 8
empty-argument colour functions, `src/css/grammar.ts:181`) arriving at the *visual* boundary rather
than the parser one: no throw, no error state — a stop that is simply not there, on a rail where
"not there" is indistinguishable from "transparent stop".

**Reproduction** `node evidence/p3.mjs` → `T8`. **Mechanism** a shorthand carrying both untrusted data
and the fallback ground, so the data's failure takes the fallback with it. **Cure** the ground is a
separate longhand/pseudo layer that cannot be clobbered, and an unparseable stop gets a *designed*
state (hatched face + `aria-invalid` + the reason), not an absence.

---

## 11. MINOR · D-11 — every drag move dispatches twice

`:206` binds `@pointermove` on the bar and `:266` binds it on each handle. The handle takes pointer
capture (`:133`), so during a drag the handle's handler runs **and** the same event bubbles to the
bar, whose branch `if (draggingId.value) { emit("update:position", …) }` (`:92–95`) fires again:

```
$ node evidence/p3.mjs      # T9 — one synthetic pointermove on a handle
T9 one pointermove on a handle reaches: {"barHandlerCalls":1,"handleHandlerCalls":1}
```

Two `update:position` emissions per move, two `stops.value = stops.value.map(…)` array rebuilds
(`useGradientModel.ts:128`), two re-serialisations of a 32-sample coalesced ramp. The comment at
`:91–95` calls the bar branch a "fallback path while a handle drag is live (capture sits on the
handle)" — with capture it is not a fallback, it is a duplicate. **Cure** one owner: the bar's
`pointermove` handles hover only, and the drag lives entirely on the captured handle.

---

## 12. MINOR · D-12 — dual selection channel (owner edict 2: no dual paths)

`:129–130` writes the `defineModel` **and** emits a separate `select` event for the same fact.
`GradientVisualizer.vue:140` binds `v-model:selected-id` **and** `:144` assigns the identical value
again on `@select`. Two wires, one fact, both live. **Cure** delete the `select` emit; the model is
the channel.

---

## 13. MINOR · D-13 — the handle's geometry is declared in four places that nothing keeps in agreement

| declaration | site | value |
|---|---|---|
| `HANDLE_HALF = 10` (JS, drives `getPosition` + `handleLeft`) | `:53` | 10 px |
| `w-5 h-5` (the painted box) | `:235` | 1.25rem = 20 px |
| `top-11` (the chip's offset from the rail) | `:288` | 2.75rem = 44 px |
| `max(1.5rem, 100%)` / `--touch-target` (the hit box) | `:380–390` | 24 / 44 px |

`HANDLE_HALF` is a bare JS number that must equal half the *rendered* handle width. Any type-scale or
rung change silently desynchronises the pointer maths from the paint — and the failure mode is
exactly D-1's, only larger. (I checked the mobile arm: root font-size is 16 px there too, so the
constants currently agree — `p5.mjs`. The defect is that nothing makes them.)

---

## 14. INFO · D-14 — hand-rolled slider mechanics **next to** the producer `Slider`, in the same feature

`GradientVisualizer.vue:232` drives Direction with the real `Slider` primitive. Forty lines above it,
its sibling instrument hand-rolls pointer capture, hit-testing, drag state, a scale ladder, a focus
ring recipe and a hit-inflation pseudo-element — 392 lines of it. `§5` names Gradient as an adopter of
the one axis composition and forbids "new slider mechanics"; this is the whole of them.

---

## 15. What I checked and found **sound** (the negative proof)

Not everything here is broken, and the CHALLENGE-D seat is not licensed to invent defects:

- **Motion is tokenised and correct.** The inline transition resolves to real producer tokens —
  `box-shadow 0.2s cubic-bezier(0.4,0,0.2,1), transform 0.44s linear(…)` (`p1.mjs`); no ad-hoc
  durations, no layout-forcing property (it animates `transform` and `box-shadow` only).
- **Reduced motion is honoured** — by inheritance, correctly. Under `reducedMotion: "reduce"` the
  computed handle transition is `0.1s` over `opacity, color, background-color, border-color,
  box-shadow` (`p3.mjs` T8) — `transform` is dropped, so the spring settle is instant. The rule is
  glass-ui's `dist/styles/utilities/a11y-overrides.css`
  (`*:not([data-allow-motion]) { transition-property: … !important }`), whose `!important` outranks
  this component's inline shorthand. No local carve-out is needed and none is present. **Correct.**
- **Every token this file names resolves.** `--spring-snappy`, `--spring-snappy-duration`
  (`calc(0.44s * 1)`), `--alpha-checker`, `--card-edge`, `--focus-ring-inner/-outer`,
  `--touch-target`, `--radius-pill`, `--duration-fast`, `--ease-standard`, `--shadow-sm` — all
  non-empty (`p1.mjs` `tokens`). The dual-contrast focus ring composes with `--shadow-sm` exactly as
  `:328–349` claims: `rgba(0,0,0,.85) 0 0 0 1px, rgba(255,255,255,.92) 0 0 0 3px, <shadow-sm>`.
- **The 20×20 tap-target rows in the visual REPORT are a measurement artefact, not a defect.**
  `REPORT.json` records `{"w":20,"h":20,"label":"Gradient stop at 0%"}` because it reads the button's
  border box; the *hit* region is 24×24 on fine pointers, measured by `elementFromPoint` sweep
  (`p1.mjs`: `hitSpanX [-12,11,24]`, `hitSpanY [-12,11,24]`). WCAG 2.5.8's 24 px minimum is met at
  rest. (Its *spacing* clause is not, once two stops are within 24 px — but at 12 stops the measured
  minimum gap was 36.5 px, so I did not observe a violation and do not claim one.)
- **RTL is correctly non-mirrored.** `§5.2` says gradient coordinates *"do not mirror with prose"*;
  the ramp is `linear-gradient(90deg,…)` and the handles use physical `left`, both direction-agnostic,
  and `shots/rtl-desktop/gradient.png` confirms the rail is unchanged. Caveat: the RTL matrix sets
  `dir="rtl"` on `<html>` and the shell does not visibly mirror at all, so this arm proves less than
  it appears to.
- **No console errors, no page errors, no horizontal overflow** on `/#/gradient` in any of the four
  Safari matrices (`REPORT.md` per-capture table, rows 125/140/155/170: `overflowX 0`, `pageErr 0`,
  `consoleErr 0`), and none in any of my 11 probe runs.
- **`verbatimModuleSyntax` and Vue 3.5 idiom are clean.** `:4` is `import type`; `:2` and `:3` are
  value imports; `useTemplateRef` at `:28`; reactive props destructure at `:6`. No violation of
  owner edicts 7 or 8. The `colorAt = undefined` default (`:6`) is redundant noise on an optional prop
  with exactly one always-present call site — speculative optionality, not a defect worth a row.
- **The forced-colors matrix proves nothing here.** `shots/forced-colors-desktop/gradient.png` renders
  in full colour — WebKit does not implement `forced-colors`, so Playwright's `forcedColors:"active"`
  is inert. The `@media (forced-colors: active)` block at `:353–359` is therefore **untested by this
  audit**, and I did not run a Chromium probe to close it. Recorded as an evidence gap, not a finding.

---

## 16. Family summary

| id | severity | mechanism family | one-line |
|---|---|---|---|
| D-1 | BLOCKER | two axes for one quantity | ramp axis ≠ handle axis; 2.38 % desktop / 3.40 % mobile |
| D-2 | BLOCKER | undefended ordinal | cross-drag → descending CSS stops → hard band + re-paired easing |
| D-3 | BLOCKER | stacked invisible targets | tap on a selected handle deletes the stop (touch) |
| D-4 | MAJOR | unreserved footprint | chip protrudes 28 px, cuts the next section's rule |
| D-5 | MAJOR | tautological specimen | swatch = ground → the rail reads as a row of holes |
| D-6 | MAJOR | species re-implementation | hand-rolled circle where `§7` names WatercolorDot-in-a-seat |
| D-7 | MAJOR | bespoke control, no role | Home/End/Up/Down are no-ops; selection invisible to AT |
| D-8 | MAJOR | target masks gesture | 64.3 % of the rail cannot add at 12 stops |
| D-9 | MAJOR | select with no tune | `selectedStopId` has no consumer; stop colour is uneditable |
| D-10 | MINOR | shorthand carries data + fallback | invalid colour → `background: none` → invisible handle |
| D-11 | MINOR | duplicate dispatch | capture + bubble → 2 emissions per pointermove |
| D-12 | MINOR | dual channel | `defineModel` + `emit("select")` for one fact |
| D-13 | MINOR | constant triplication | `HANDLE_HALF` / `w-5` / `top-11` / `--touch-target` |
| D-14 | INFO | new slider mechanics | producer `Slider` used 40 lines away |

**The single architectural cure that dissolves D-1, D-3, D-4, D-5, D-6, D-8 and D-9 at once** is the
one the constitution already ratified and this component declined: *stops leave the meniscus*. A
quiet seat rail beneath the spectral rail, one geometric seat per stop carrying a WatercolorDot face,
one axis shared by rail and seats because the seats no longer need an inset to avoid the pill's
corners, remove and colour and numeric position in a selected-stop inspector rather than floating
over the next section. What remains after that transposition is D-2 (an ordering invariant in the
model), D-11/D-12 (one owner per channel) and D-10 (a designed invalid state) — three small, local,
honest fixes.

**No source edits land from this formation.** This file and `evidence/` are the whole of my output.

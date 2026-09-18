# CHALLENGE-D — `demo/workbenches/mix/MixConfigBar.vue` — the design is flawed

**Round 2** · 2026-07-28 · repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`

Round 1 of this seat (2026-07-27) is preserved verbatim at
`challenge-D-design.2026-07-27-r1-prior.md`. This round is not a re-issue. It **confirms** r1's two
BLOCKERs with independent evidence, **corrects** one r1 finding whose evidence was misattributed,
**discharges** r1's largest open unknown by actually measuring it, **escalates** one r1 finding with
a runnable reproduction that proves more than r1 claimed, and **adds six defects r1 did not find**.
Where r1 stands, I say so and do not re-litigate it.

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]` — the model this
seat was explicitly spawned with. The seat is declared, not inherited.

---

## Verdict

**DEFECTIVE.** Two BLOCKERs, six MAJORs, three MINORs, one INFO.

Round 1 named the mechanism correctly: *"this component was written against a glass-ui that no
longer exists, and its comments are more confident than its code."* Round 2 confirms that and
sharpens it into a second, independent mechanism that r1 did not isolate:

> **The bar models the one dependency that does not matter and refuses the one that does, and it
> places every piece of information it owns in the only slot that cannot survive the gesture that
> reveals it.**

`showLeftoverStrategy` proves the component knows how to gate a dependent control. It gates
`mode → strategy`. It does not gate `space → hue-relevance`, which is the dependency that makes half
its primary row a no-op in the shipped default state. And the preview ramp — the entire justification
for ~40% of the file — is deliberately placed in the one slot the component's own comment identifies
as un-clonable to the trigger, so it exists only mid-gesture and has, in the shipped build, never
rendered at all.

---

## Evidence base for this round

| Instrument | What it produced |
|---|---|
| Safari capture matrix | `visual/shots/safari-{desktop,mobile}-{light,dark}/mix.png` — read, all four |
| `REPORT.json` probe payloads | the actual `smallTapTargets` / `namelessButtons` element lists for `/#/mix` (r1 read only the counts in `REPORT.md`) |
| Pixel first-ink scan of the light PNG | the 13.0px label/value left-edge rag (§ Visual truth) |
| 6 scripted Chromium runs vs `localhost:9000/#/mix` | computed styles, rects, resolved tokens; **coarse-pointer (iPhone 13) emulation**; `forcedColors: active` **with focus applied**; `reducedMotion: reduce`; `dir=rtl`; 320 / 390 / 720 / 1440; open-menu geometry; operand-add click test |
| `node dist/subpaths/color.js` | hue-arc distinctness per space — pasted output below |
| glass-ui 7.0.0 dist | `Button.vue.d.ts`, `button-Bu9F4uU6.js`, `components/button/styles.css`, `SelectTrigger.vue.d.ts`, `SelectItem.vue.d.ts`, `select-BcBAyLXA.js`, `styles/tokens/sizing.css`, `styles/tokens/light-dark.css`, `styles/typography/utilities.css` |
| Canon | `VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`, `PALETTE-CONTRACT.md` |

Probe scripts and raw JSON live in the session scratchpad (`MCB-probe3..8.mjs`, `probe-out.json`).
No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`,
`scripts/dev/dev.sh` or any `INBOX.md` was modified. One stray probe file was briefly written to the
repo root during exploration and deleted in the same minute; `git status` confirms it is gone.

---

## Visual truth — one thing r1's contrast table did not name

r1 measured the contrast collapse correctly and I do not repeat it. What the four captures also show,
and r1 did not measure, is that **the label and the value it labels do not share a left edge.**

First-ink scan of `safari-desktop-light/mix.png` (device px ÷ 2 = CSS px):

```
label   "COLOR SPACE" first ink : CSS x = 755.0
value   "OKLab"       first ink : CSS x = 768.0     ->  13.0 CSS px rag
capsule left edges (trigger, button)                :  754.0 / 753.5   (flush within 0.5px)
```

The label aligns to the capsule's **outer geometry**; the value aligns to the capsule's **inner text
inset** (`px-3`). The two capsules are optically flush to within half a pixel — the only misaligned
element in the stack is the text that names the thing. Nothing in the component establishes the
relation: the `<label>` is a sibling in `flex flex-col gap-1`, inheriting the column edge while its
control indents its own content by a producer padding it cannot see.

Read the crop and it is plain — a bar of three capsules whose captions float 13px to the left of
everything they describe:

```
COLOR SPACE            HUE METHOD                 <- x = 755
[  OKLab          v ]  [  Shorter        v ]      <- x = 768 (ink) / 754 (capsule)
[            (o) Mix                      ]       <- x = 753.5
```

---

## Findings

### D-1 · BLOCKER · CONFIRMS r1 D-1 — `variant="primary-audacious"` is a dead attribute

I re-derived this independently rather than inheriting it, and add two pieces r1 did not have:

- the **runtime default**, from the shipped bundle `dist/button-Bu9F4uU6.js`:
  `emphasis: { default: "secondary" }` — so the fall-through does not merely fail to apply a
  register, it silently selects the *quiet* one;
- the **producer branch that is therefore never entered** —
  `components/button/styles.css`: `.button[data-emphasis="primary"]` is the only rule that supplies
  the deep-blur tinted plate and `font-weight: 650`.

Live DOM, 1440×900 and iPhone 13, both this session:

```json
"attrs": { "data-emphasis": "secondary", "data-size": "md",
           "variant": "primary-audacious",     // inert HTML attribute, styled by nothing
           "class": "button ... glass-wash glass-capsule h-10 gap-2 font-medium font-display" }
```

`grep -rl "primary-audacious" node_modules/@mkbabb/glass-ui/` → no matches. r1's family analysis
(106 `variant=` sites vs 2 `emphasis=` sites; the identical dead prop at `GenerateControls.vue:158`)
stands and is not repeated here.

**Status: r1's finding, confirmed, evidence strengthened. Cure unchanged from r1.**

---

### D-2 · BLOCKER · ESCALATES r1 D-4 — `Hue method` is inert by default, *and the quartet is never four in any state*

r1 established, correctly and by construction, that `options.hue` is unread for the four
acylindrical spaces and that the default is one of them. r1 explicitly labelled the four-identical-
chips consequence as *"confirmed by construction from the code path, not by a rendered frame."*

I ran it. Red→green operands, 8 samples per ramp, all four methods, all nine offered spaces:

```
$ node -e "import('./dist/subpaths/color.js').then(({rgb,convertColor,mixColors})=>{ ... })"
oklab  distinct ramps = 1/4  identical-to-"shorter": shorter,longer,increasing,decreasing
lab    distinct ramps = 1/4  identical-to-"shorter": shorter,longer,increasing,decreasing
rgb    distinct ramps = 1/4  identical-to-"shorter": shorter,longer,increasing,decreasing
xyz    distinct ramps = 1/4  identical-to-"shorter": shorter,longer,increasing,decreasing
oklch  distinct ramps = 2/4  identical-to-"shorter": shorter,increasing
lch    distinct ramps = 2/4  identical-to-"shorter": shorter,increasing
hsl    distinct ramps = 2/4  identical-to-"shorter": shorter,increasing
hsv    distinct ramps = 2/4  identical-to-"shorter": shorter,increasing
hwb    distinct ramps = 2/4  identical-to-"shorter": shorter,increasing
```

The escalation is the bottom five rows. **Even where hue interpolation genuinely applies, four
options produce only two outcomes.** For a two-operand mix there are exactly two arcs; `{shorter,
longer}` and `{increasing, decreasing}` are the same two directions named twice. The comment at
`MixConfigBar.vue:127-128` — *"the four-arc quartet, drawn with the user's own colors"* — is false in
**every** reachable state of the application, not only in the acylindrical ones.

So the defect is larger than r1 stated: it is not "one control is inert in one default", it is **an
over-enumerated vocabulary presented as flat and orthogonal when it is conditional and partly
synonymous**, given equal geometry, equal material and equal weight to the control that actually
decides the mix.

The redundancy is *visible by design*: the preview chips added to make the choice legible would
render as duplicate swatches, side by side, four rows deep. The preview does its job — it exposes
that two of the four rows say nothing — and the design shipped the redundancy anyway.

**Cure.** r1's `hueApplies = colorSpace in HUE_INDEX` gate is right and I adopt it. Add: the surviving
vocabulary is **two arcs**, not four. `increasing`/`decreasing` are library-level synonyms of
`shorter`/`longer` for a two-operand mix and have no business being separate rows in a UI. Then every
chip pair shown is genuinely different, which is the only reason to show chips.

---

### D-3 · MAJOR · CORRECTS r1 D-10 — the 36px triggers are a *producer-contract* breach, and r1's evidence for it was the wrong elements

r1 filed the 36px triggers as MINOR and cited `REPORT.md`'s `smallTapTargets` counts for `/#/mix`
(4 mobile, 8 desktop) as the evidence. **Those counts are not this component.** I read the probe
payload in `REPORT.json` rather than the summary in `REPORT.md`:

```json
"smallTapTargets": [
 {"w":160,"h":23,"tag":"input","label":""},
 {"w":22,"h":22,"tag":"button","label":"Switch to slug"},
 {"w":22,"h":22,"tag":"button","label":"Generate new slug"},
 {"w":22,"h":22,"tag":"button","label":"Cancel"},
 {"w":12,"h":24,"tag":"span","label":"L channel"},
 {"w":12,"h":24,"tag":"span","label":"A channel"},
 {"w":12,"h":24,"tag":"span","label":"B channel"},
 {"w":12,"h":24,"tag":"span","label":"ALPHA channel"} ]
```

Eight picker channel spans and slug controls. Zero MixConfigBar elements. The capture harness's
threshold never flagged a 36px trigger at all.

The finding survives — with better evidence and a higher severity — because the real breach is
against the **producer's own coarse-pointer contract**, which no capture matrix tests.
`glass-ui/dist/styles/tokens/sizing.css` + `tokens/light-dark.css`:

```css
--control-h-sm: max(calc(2.25rem * var(--ui-scale)), var(--control-floor));
--control-h-md: max(calc(2.5rem  * var(--ui-scale)), var(--control-floor));

@media (pointer: coarse) {
  :root { --ui-scale: var(--ui-coarse-scale, 1.5);
          --control-floor: var(--touch-target, 2.75rem); }
}
```

Measured under iPhone 13 emulation (`pointer: coarse`; resolved `--ui-scale: 1.5`,
`--control-floor: 2.75rem`):

| Control | Producer contract | Rendered | Cause |
|---|---|---|---|
| Select trigger ×3 | `max(54px, 44px)` = **54px** | **36px** (`height:36px`, `min-block-size:auto`) | `class="h-9"` at `:100`, `:123`, `:147` |
| Mix button | `max(60px, 44px)` = **60px** | 60px | `min-block-size` beats `height` — `h-10` is inert-but-noisy |
| Mix button icon gap | `calc(0.375rem × 1.5)` = **9px** | **8px** | `gap-2` freezes it off the scale |

**Every Select in this bar is 18px shorter than the design system's coarse-pointer height and 8px
below the 44px touch floor the producer guarantees — and it is below that floor *because* the
consumer hard-coded a number over a token that had already solved it.** `SelectTrigger` exposes
`size?: "sm" | "default"` (`SelectTrigger.vue.d.ts`); the register existed and was overridden.

`PROPORTION-AUDIT.md §5.7`: *"Visual glyph size, operable target size and layout reservation are
separate quantities. Accessibility floors do not require bloated visible chrome."* The producer had
separated them. The override collapses them again.

**Severity: MINOR → MAJOR.** **Cure.** Delete all four class strings; `size="sm"` on the triggers if
a smaller register is genuinely wanted, and nothing at all on the Button.

---

### D-4 · MAJOR · DISCHARGES r1 D-9 — the six unobserved state matrices, now observed

r1's D-9 was *"whether that state survives is currently unknown — which is the finding."* The
capture-matrix gap is real and remains a harness finding, but the *design* question it left open is
now answered. I drove all of it live.

| State | Method | Result |
|---|---|---|
| **RTL** | `document.documentElement.dir = "rtl"` at 1440 | **PASS.** Grid computes `direction: rtl`; Mix button x 754 → 224; trigger x 989 → 459; label `text-align: start`. No physical-direction leak, nothing to fix. |
| **Reduced motion** | `reducedMotion: "reduce"` | **PASS.** Producer `.button` carries `@media (prefers-reduced-motion: reduce) { transition: none }` (`components/button/styles.css`); the component adds no motion of its own. |
| **Forced colors — focus** | `forcedColors: "active"` **with `.focus()` applied** | **PASS.** Trigger computes `outline: solid 2px rgba(5,0,73,0.8)` (vs `outline: none` + a crimson box-shadow ring in normal mode). The producer swaps ring → outline correctly. r1 flagged this as the concrete risk; it is not one. |
| **Forced colors — emphasis/disabled** | same run | **FAIL** — see D-9 below. |
| **200% zoom** (720px CSS width arm) | viewport 720×450 | **PASS** for layout: no truncation, no overflow. |
| **Truncation** | longest value `Decreasing` forced through the trigger at 320 / 390 / 720 / 1440 | **PASS.** `scrollWidth == clientWidth` at every width. |

Four of r1's six unknowns resolve clean. One resolves to a real but narrower defect (D-9). The sixth
— keyboard focus — resolves to D-5's much worse fact: there is nothing to focus.

---

### D-5 · MAJOR · EXTENDS r1 D-2/D-3 — the in-flight state was never designed, and the preview apparatus has never once rendered

r1 established that `canMix` is permanently false in Colors mode because the add-slot renders as an
`aria-hidden` span (the glass-ui 7 `WatercolorDot` `tag="button"` abrogation,
`VISUAL-CONSTITUTION.md §4.2` / `MixSourceSelector.vue:166-173` — that element is
MixSourceSelector's, correctly attributed there). I re-verified by **clicking it**, twice, forced:

```json
"addSlot": { "tag": "SPAN", "ariaLabel": null, "html": "<span ... aria-hidden=\"true\" class=\"add-slot-ghost ..." }
"state":   { "operandChips": 0, "mixDisabled": true, "mixOpacity": "0.5" }
```

Three consequences r1 did not draw, all of which belong to *this* component's design:

**(a) The in-flight register does not exist.** `MixPane` owns `animationPhase` and hands it to the
canvas (`MixPane.vue:68`) and to nothing else. glass-ui's Button ships `loading` — *"Marks an
in-flight command and suppresses activation until it settles"* — plus
`.button[data-loading] { cursor: progress }`. Neither is used. The state machine has a re-entry guard
(`useMixingState.ts:83`), so during the convergence window **the button accepts a click and does
nothing, with no cursor change, no busy state and no announcement.** A control that swallows an
activation silently is a designed dead end, not a guard.

**(b) ~40% of the file is apparatus for a preview that has never rendered.** Lines 19-23, 47-74,
104-114 and 127-137 exist to sample and paint ramp chips. Measured with both menus open on the live
route: `chippedOptions: 0`, `distinctStops: 0`. The `operandColors.length < 2` branch is the only
reachable state, so `sampleInterpolationRamp` returns `null` every time (`sample.ts:58`) and no chip
has ever painted in the shipped app. r1 correctly praised the honest-absence law; the fuller truth is
that honest absence is currently the component's *entire* behaviour.

**(c) The one verb carries no reason and cannot be focused.** Measured:
`{"disabledAttr": true, "tabIndex": 0, "ariaDescribedby": null, "ariaDisabled": null,
"focusReceived": false}`. Native `disabled` refuses focus, so the verb is outside the tab order, and
`aria-describedby` is null, so nothing anywhere states the precondition. r1's D-3 cure (durable
blocked-reason text wired via `aria-describedby`) is right; add `aria-disabled` + focusability so the
reason is reachable, and `:loading` so the in-flight window has a face.

*Not exercised:* the palettes-mode path, whose selector is a native `<button>`
(`MixSourceSelector.vue:246`) and probably does reach `canMix`. The probe profile had no saved
palettes. **Labelled untested, not passing.**

---

### D-6 · MAJOR · NEW · The bar's information exists only mid-gesture — and the menu that reveals it occludes the verb and hides 2 of 9 options

`MixConfigBar.vue:104-106`, the component's own comment:

> *"T-17: chip leading, description after (F7 — the producer `#description` lane, **the one slot
> reka's `SelectValue` does NOT clone into the trigger**)."*

The component states, in writing, that it chose the one slot which cannot survive selection. At rest
the bar therefore says exactly two words — `OKLab`, `Shorter` — and shows no color at all. In a
chromatic laboratory (`VISUAL-CONSTITUTION.md §1`: *"one dominant instrument, one clear specimen"*),
the interpolation-space chooser's specimen is the ramp, and the ramp is visible only while a menu is
open on top of everything else.

What that menu does when opened, measured at 1440×900:

```json
"panel": { "rect": {"y":489,"h":384,"bottom":873}, "maxHeight":"384px",
           "overflowY":"hidden", "scrollable": false },
"optionCount": 9, "lastOptionBottomBeyondPanel": 93.3,
"panelOverlapsMixButton": true, "viewportH": 900
```

- Nine options × 52.4px rows = 471px of content in a 384px panel. **The last 93.3px — RGB and XYZ,
  2 of 9 spaces — sit outside the visible panel**, reachable only through a hover-activated scroll
  chevron (visible at the panel foot in the captured frame).
- The panel **overlays the Mix button** (`panelOverlapsMixButton: true`). Choosing the parameter
  hides the verb that consumes it.
- The panel is width-locked to the 227px trigger, so every option is a forced two-line stack, and the
  option row (52.4px) is **taller than its own trigger** (36px) — a direct product of D-3's `h-9`.

**Cure.** Promote the ramp from `#description` to the trigger: a `SelectValue` that renders the
selected space's live `PreviewRamp` beside its name makes the setting legible **at rest**, makes the
per-row description redundant, collapses the two-line option rows back to one line, and brings the
nine-option panel under one screen without a scroll chevron. That is a glass-ui
`SelectValue`/`SelectTrigger` content-slot ask filed at the producer (edict 4), not a local
re-implementation.

---

### D-7 · MAJOR · NEW · The bar fuses *tune* and *commit*, so the canonical Mix sequence is structurally unreachable

`VISUAL-CONSTITUTION.md §3.1`, Mix row, mobile-order column:

> **Mix** | ordered N-operand convergence trough | result/provenance inspector; absent operands
> occupy no filler | **operand rack, result, controls** | its own `InstrumentChassis` composition

Measured DOM order inside the pane scroller:

```json
"domOrder": ["H3.pane-header-title", "DIV.pane-header-desc-wrap",
             "DIV.flex flex-col gap-3",   // MixSourceSelector — the rack
             "DIV.flex flex-col gap-3"]   // MixConfigBar — controls + commit
// the result plate (MixPane.vue:111-119) renders AFTER these, when it exists
```

Rendered order is **rack → controls+commit → result**. The canon says **rack → result → controls**.
On mobile that means pressing `Mix` pushes the answer below the fold, underneath the button that
produced it.

The bar **cannot be reordered into compliance**, because it is one node containing both the tuning
group and the action region. `§3.1` treats those as distinct chassis regions (*"stage, inspector,
action region"*) and `§5` sets `select → tune → commit` with *"Commit uses one glass-ui action set."*
A single `flex flex-col gap-3` that terminates in a Button cannot be placed in an action region
without dragging two Selects along with it.

This is the structural finding r1's gestalt gestured at ("`MixConfigBar` shrinks to … a declaration
of which fields exist … and one `emphasis="primary"` verb") but did not name as a canon breach with
a measured witness. It is also the finding that unblocks three others at once: the action region owns
emphasis (D-1), owns loading and precondition state (D-5), and owns order (this one).

---

### D-8 · MAJOR · EXTENDS r1 D-5/D-8 — the type matrix has a third breach, and one visible label already disagrees with its own control

r1 established the two-directional type-jurisdiction inversion (mono-caption labels, Fraunces verb)
and the three inert `<label>`s. Both stand. Two additions:

**(a) `text-micro` is not in the closed matrix.** The description spans (`:112`, `:134`) use
`text-micro` = `--type-micro: 0.6875rem` — a **fixed, non-fluid 11px**. `VISUAL-CONSTITUTION.md §4`
enumerates seven roles and declares *"This matrix is closed across all eighteen compositions"*; its
floor is `text-small`, itself `clamp(0.875rem, …)`. `text-micro` is below the matrix and outside the
fluid scale, so at the canon's 200%-zoom arm it is the one text in the bar that does not participate.

**(b) The visible label and the announced name have already drifted.** r1 noted the labels label
nothing (`htmlFor: null`, `label.control === null` — I re-measured, same result). The sharper fact is
in the third row:

```
MixConfigBar.vue:145   <label class="section-label">Size mismatch</label>
MixConfigBar.vue:147   <SelectTrigger aria-label="Size mismatch strategy" ...>
```

Two independent strings for one control, with nothing coupling them — and they **already say
different things in the shipped file**. That is what an unlinked dual-labelling mechanism produces
given time, and it has produced it. It also means clicking the visible label does nothing, because a
`<label>` with no control is inert text wearing a label's semantics.

r1's cure — a glass-ui labelled-field composition wiring `label[for]` ↔ trigger `id` once at the root
— is exactly right, and I note the primitive already exists in the producer:
`glass-ui/dist/components/labeled-field/`.

---

### D-9 · MINOR · NEW · Under forced colors, the primary action and its secondary siblings become the same object

Measured with `forcedColors: "active"` at 1440×900:

| | background | border-top | box-shadow | opacity |
|---|---|---|---|---|
| Mix button | `rgb(255,255,255)` | `1px rgb(0,0,0)` | `none` | **0.5** |
| Select trigger | `rgba(255,255,255,0)` | `1px rgba(5,0,73,0.8)` | `none` | 1 |

Forced colors strips the glass fill, the specular inset and the capsule shadow, as it must. What is
left to distinguish the page's one verb from a settings dropdown is a 1px outline — the same 1px
outline. And the disabled state rides entirely on `opacity: 0.5`, which forced-colors does **not**
normalise, so in a high-contrast profile the verb is a faded outline carrying no semantic mark.

`VISUAL-CONSTITUTION.md §4.1`: *"Text, focus, boundaries and state meet their rendered contrast on
the actual material tier; a token name is not evidence."* Emphasis expressed only through glass
material leaves no forced-colors residue. This narrows r1's D-9 speculation to the one place the risk
was real.

---

### D-10 · MINOR · REFINES r1 D-7 — the reflow, measured on the component's own root

r1 measured the verb's page-relative jump (`+124.5px` at 390). Measured on the bar's own root, which
isolates this component's contribution from the pane's:

| viewport | colors mode | palettes mode | Δ |
|---|---|---|---|
| 1440×900 | 113.58px | 187.16px | **+73.58px** |
| iPhone 13 | 130.25px | 200.50px | **+70.25px** |

`v-if` at `:144` with no transition, while the sibling result plate got a full
`<Transition name="vj-morph" mode="out-in">` (`MixPane.vue:111`). One pane, two motion grammars —
r1's framing, confirmed with the component-local number. Not a `prefers-reduced-motion` violation
(there is nothing to reduce, and the producer handles the button's transitions); the defect is that a
state change of the *action region* was never given continuity at all, while a decorative sibling was.

---

### D-11 · MINOR · NEW · The producer's `#description` slot ships layout but no typography, so five consumers re-mint the same recipe eight times

r1 correctly cleared `#description` as a real producer slot. It is — and it is *unstyled*.
`glass-ui/dist/select-BcBAyLXA.js` renders `<div class="flex flex-col gap-0.5 min-w-0">` around the
default and `description` slots: layout only, no type. So every consumer supplies the same class
string by hand:

```
$ grep -rn 'class="text-micro text-muted-foreground"' --include='*.vue' demo/ | wc -l
8
$ grep -rln "template #description" --include='*.vue' demo/
demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue
demo/workbenches/mix/MixConfigBar.vue
demo/workbenches/generate/GenerateControls.vue
demo/scenes/atmosphere/AuroraPane.vue
demo/color-session/ColorSpaceSelector.vue
```

`MixConfigBar.vue:112` and `:134` are two of the eight. Owner edict 5: this is five consumers styling
one producer slot. Cure is one glass-ui default (or a `select-item-description` utility) filed as a
producer ask; five local deletions follow. It is also the mechanism behind D-8(a) — `text-micro`
entered the app through a gap in the producer, not through a decision here.

---

### D-12 · INFO · NEW · 43.2% dead acreage below the bar in the default state

Measured at 1440×900, default route state:

```
.pane-scroll-fade : y = 148.0, height = 684.8, bottom = 832.8   (scrollHeight == clientHeight, no scroll)
MixConfigBar root : y = 423.7, height = 113.6, bottom = 537.2
empty below       : 832.8 − 537.2 = 295.6px  =  43.2% of the stage
```

`VISUAL-CONSTITUTION.md §3.2`: *"Empty secondary content occupies at most a narrow invitation tray
(≤15% of the stage) or disappears."* Both desktop captures show it plainly — the right pane is
roughly half empty glass.

**Attribution:** owned by `MixPane`'s composition (`MixPane.vue:60-121` uses a plain
`Card tier="resting"` where `§3.1` prescribes *"its own `InstrumentChassis` composition"*) and caused
by the absent result plate, itself a consequence of D-5. Recorded as context for this component's
terminal position in that column, not as its defect.

---

## What is genuinely sound — the negative proof

r1's negative-proof list holds and I re-verified it. New entries from this round:

| Claim | Evidence |
|---|---|
| **RTL is clean** | `dir="rtl"`: grid `direction: rtl`; Mix button x 754 → 224; trigger x 989 → 459; label `text-align: start`. Nothing to fix. |
| **Focus survives forced colors** | trigger computes `outline: solid 2px rgba(5,0,73,0.8)` under `forcedColors: active` with focus applied. r1's named risk is not real. |
| **Reduced motion is correct** | producer `.button` carries `@media (prefers-reduced-motion: reduce) { transition: none }`; the component adds no motion of its own |
| **No truncation at any width** | `scrollWidth == clientWidth` for the longest value (`Decreasing`) at 320 / 390 / 720 / 1440 |
| **The report's `namelessButtons: 1` on `/#/mix` is NOT this component** | measured: the sole nameless button is `button.send-btn` from an unrelated widget |
| **The report's `smallTapTargets` on `/#/mix` are NOT this component** | `REPORT.json` probe payload — picker channel spans (12×24) and slug controls (22×22). See D-3. |
| **No route errors** | `REPORT.json` `/#/mix`: `consoleErrors: []`, `pageErrors: []`, `failedRequests: []` in all four Safari matrices |
| **No horizontal overflow** | `REPORT.md` per-capture table: `/#/mix` `overflowX = 0`, all four matrices |
| **No local design-system fork** | `demo/ui/select/index.ts` and `demo/ui/button/index.ts` are pure re-exports of `@mkbabb/glass-ui` — edict 4's letter is honoured |
| **`verbatimModuleSyntax` clean** | all four type-only imports use `import type` (`:12`–`:15`) |
| **Idiomatic Vue 3.5** | reactive props destructure with default (`:25-45`); prop-in/emit-out, so no `defineModel` stale-read hazard; no template refs warranted |
| **No god module, no legacy shims** | 173 lines, one job, no local color math; no aliases, dual paths or back-compat branches |

---

## Canon conformance

| Authority | Clause | Status |
|---|---|---|
| `VISUAL-CONSTITUTION.md §3.1` | Mix mobile order `rack, result, controls` | **FAIL** — D-7 |
| `VISUAL-CONSTITUTION.md §3.2` | empty ≤15% of stage | **FAIL** — D-12 (MixPane-owned) |
| `VISUAL-CONSTITUTION.md §3.8` | one full-strength protagonist; support does not compete | **FAIL** — D-1 |
| `VISUAL-CONSTITUTION.md §4` | closed type matrix | **FAIL** — D-8 |
| `VISUAL-CONSTITUTION.md §4.1` | states never color-only; explicit role/name/state | **FAIL** — D-5, D-8, D-9 |
| `VISUAL-CONSTITUTION.md §4.1` | focus distinct in both schemes + forced colors | **PASS** — D-4 |
| `VISUAL-CONSTITUTION.md §5` | `select → tune → commit`; one glass-ui action set | **FAIL** — D-7 |
| `VISUAL-CONSTITUTION.md §6` | scene swap preserves continuity | **FAIL** — D-10 |
| `VISUAL-CONSTITUTION.md §6.1` | logical direction follows document | **PASS** — D-4 |
| `VISUAL-CONSTITUTION.md §8` | π/DELTA — every visual claim has a tracked frame pair | **FAIL** (harness) — no `/#/mix` row in any of the six state matrices; r1 D-9 stands as a harness finding even though its design unknowns are now discharged |
| `PROPORTION-AUDIT.md §5.5` | small marks are data/status/labeled-action or removed | **FAIL** — D-2 |
| `PROPORTION-AUDIT.md §5.7` | glyph size ≠ target size ≠ reservation | **FAIL** — D-3 |
| `PROPORTION-AUDIT.md §5.8` | rendered relation wins over token intent | **FAIL** — D-1 |
| `PROPORTION-AUDIT.md` PR-06 | one action/selection owner incl. Mix | **FAIL** — D-7 |
| `PROPORTION-AUDIT.md` PR-07 | no unlabeled controls; every seat has a name/state | **FAIL** — D-5, D-8 |
| `PROPORTION-AUDIT.md` PR-08 | pending/failure truth not merely transient | **FAIL** — D-5(a) |
| Owner edicts 1, 2, 3, 6, 7, 8 | god modules / legacy / KISS / animations / Vue 3.5 / `import type` | **PASS** |
| Owner edict 4 | glass-ui is the design system | **FAIL** — D-1 (invented variant), D-5 (`loading` ignored), D-6/D-11 (producer asks unfiled) |
| Owner edict 5 | root-level styling, never per-instance | **FAIL** — D-3, D-8, D-11 |

---

## Gestalt — what round 2 changes about the cure

Round 1's transposition is correct and I adopt it: **the method region becomes one labelled-field
composition owned by glass-ui**, and `MixConfigBar` shrinks to a declaration of which fields exist
and one `emphasis="primary"` verb.

Round 2 adds two things that r1's cure does not reach, both of which are structural rather than
cosmetic:

1. **Split the node by job.** The verb does not belong in a config bar at all. Moving it to the
   chassis action region — where `§5`'s single glass-ui action set already lives beside the result's
   `Save`/`Copy` — is one move that makes emphasis (D-1), loading and precondition state (D-5), and
   the canonical `rack → result → controls` order (D-7) *expressible* instead of impossible. Three
   patches collapse into one transposition.
2. **Reduce the vocabulary before styling it.** The hue row is conditional on
   `HUE_INDEX[colorSpace]` **and** carries two arcs, not four (D-2). The ramp is promoted from the
   `#description` lane to the trigger (D-6), which makes the setting legible when it is *set* rather
   than only while it is being chosen — and, as a side effect, returns the nine-space menu to one
   screen. Two producer asks (a `SelectValue` content slot; typography for the `SelectItem`
   `#description` lane that five consumers currently re-mint by hand) go to glass-ui rather than into
   this file.

The single sentence that carries the whole seat: **this bar spends its geometry on a control that
does nothing, and hides the one thing it knows in the only place that disappears when you use it.**

# CHALLENGE-D — `GradientEasingEditor.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), the tier this seat was
spawned with. Declaration is explicit, not inherited.

---

## Subject and verdict

| | |
|---|---|
| **Subject** | `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` (296 lines) |
| **Composed children** | `easing/EasingSpecimenStrip.vue`, `easing/EasingAuthoringStage.vue`, `easing/useSpecimenRows.ts`, `easing/easingCatalogue.ts` |
| **Route** | `/#/gradient`, inspector column (binding composition: P122 `golden`, stop/easing/code inspector at 38.1966011% — `OPTICAL-BENCH-COMPOSITIONS.md §3`) |
| **Base** | branch `tranche-u`, HEAD `c654824e` |
| **Verdict** | **DEFECTIVE** |
| **Strongest defect** | **D-01** — a collapsed interval row paints **0 focus pixels** when focused. Measured by pixel diff against an identical unclipped control that paints 4352. The row's `overflow-hidden` clips a `box-shadow`-only focus ring whose element is flush with the clip rect on all four sides. |

16 findings: 1 BLOCKER, 6 MAJOR, 7 MINOR, 2 INFO.

---

## Evidence base

**Static:** the component and its four siblings; `docs/tranches/V/VISUAL-CONSTITUTION.md`,
`PROPORTION-AUDIT.md`, `OPTICAL-BENCH-COMPOSITIONS.md`; `node_modules/@mkbabb/glass-ui@7.0.0`
export map.

**Captured frames read (vision):**
`docs/tranches/V/megatranche/audit/visual/shots/{safari-desktop-light,safari-desktop-dark,safari-mobile-light,rtl-desktop,keyboard-focus-desktop,forced-colors-desktop,zoom-200-desktop}/gradient.png`.

**Live telemetry** (Playwright, `http://localhost:9000/#/gradient`, WebKit-family engine, two arms:
1512×806 and 390×664). Every rect/computed-style number below is pasted from a probe return.

**Deterministic repro** (written by this seat, kept as evidence):
`frames/repro.html` + `frames/D-01-focus-A-clipped-0px.png` + `frames/D-01-focus-B-control-4352px.png`.

**Route rows in the visual audit that involve this component:**
`REPORT.md:39,54,69,84` — `/#/gradient` carries 6 small tap targets in all four matrices;
`REPORT.md:100,106,111,113` — 1 nameless button. `REPORT.json` shows the six small targets are the
dock slug controls (22×22) and the two gradient stop seats (20×20) — **none of them belong to this
component**; its own controls measure 24×24 and 39×460, so it is not a contributor to that row. Its
`bleeding` list (`REPORT.json`, `/#/gradient`) is entirely `strip-row / strip-family /
family-eyebrow / family-tiles / glass-chip.glass-capsule / tile-label` — i.e. **the harness's own
"content escapes its box" detector fires exclusively on this component's specimen strip.** That is
D-02, independently observed.

---

## Findings

### D-01 · BLOCKER · A focused collapsed interval row has no visible focus indicator at all

`GradientEasingEditor.vue:114` puts `overflow-hidden` on the interval row.
`GradientEasingEditor.vue:228-231` gives the row's head button `outline: none` and a
`box-shadow`-only focus ring:

```css
.interval-head:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}
```

The head is `w-full` (line 119) and is the row's **only** child whenever that row is collapsed —
the disclosure panel is `v-show` (line 144), i.e. `display:none`, contributing zero height. So the
head's border box coincides with the row's padding box (the clip rect) on all four sides. A
`box-shadow` with `2px` spread and `8px` blur paints *entirely outside* that border box. The clip
therefore removes 100% of it.

Measured, live at 1512×806 with the row **open** (best case, bottom edge interior):

```
row  rect  x=224   y=491.25  w=462  h=197.45   overflow: hidden   border-top: 1px
head rect  x=225   y=492.25  w=460  h=38.95
→ inset left = inset right = inset top = 1.00px   (the row's 1px border, nothing more)
box-shadow (computed) = "...0.3) 0px 0px 0px 2px, ...0.15) 0px 0px 8px 0px"
```

Three of the four ring edges are clipped even in the best case. Collapsed rows lose the fourth.

**Reproduction (deterministic, run):** `frames/repro.html` renders case A (`overflow:hidden`, as
shipped) and case B (byte-identical minus the clip) side by side; both heads carry the real
`--focus-ring-shadow` value read from the live app. Screenshot each with focus moved to the other
case, then diff:

```
$ python3 …  # frames/D-01-focus-A-clipped-0px.png vs D-01-focus-B-control-4352px.png
changed px: 21648
bbox x: 1027 1968   y: 92 177          ← case B's region ONLY; case A is byte-identical
A focused: ring px outside head box  = 3584
A when B focused (control)           = 3584      ← delta 0
B focused: ring px outside head box  = 7936
B when A focused (control)           = 3584      ← delta +4352
```

**Focusing the shipped row paints zero pixels.** The 3584 in both A columns is the row's own
static hairline, not a ring.

Design law broken: `VISUAL-CONSTITUTION.md:84` — "Focus remains visibly distinct from selection in
both schemes, forced colors and reduced transparency." `PROPORTION-AUDIT.md:70` (§5.5) — a mark is
"data, status, labeled action, drag affordance, **focus/selection register** or removed." Also
WCAG 2.1 SC 2.4.7. The comment on line 220-221 asserts the opposite of the shipped behaviour: "the
house focus register (the accent-aware ring the keystone mints — never a bespoke outline)". The
ring is minted and then thrown away.

With `N` stops there are `N−1` rows and at most one is open, so `N−2` rows are permanently in the
zero-indicator state. At the default 2 stops there is 1 row, open — which is why every existing
capture missed it.

**Cure (gestalt, not patch):** delete the hand-rolled disclosure and seat glass-ui's
`Collapsible` (see D-05), which owns its own trigger/content boxes, its focus register and its
`.disclosure-content` reduced-motion carve-out. If the row box must survive as authored, the clip
must go: the row's `overflow-hidden` exists only to keep the panel's corners inside the radius,
which `border-radius` + `clip-path`-free content already does — nothing in the row overflows.

---

### D-02 · MAJOR · The selection surface hides 70.6% of itself and rules a divider against a group it does not render

The specimen strip is described in the file header as "the SPECIMEN STRIP (the kf T.E6 gallery at
interval scale — selection)". It is the component's only named-curve selection affordance.

Measured live:

| arm | catalogue content | port | hidden | families visible | tiles fully visible |
|---|---:|---:|---:|---:|---:|
| desktop 1512×806 | `scrollWidth 1482` | `clientWidth 436` | **70.6%** | 2 of 8 | 8 of 27 |
| mobile 390×664 | `scrollWidth 1482` | `clientWidth 298` | **79.9%** | 2 of 8 | ~5 of 27 |

```
familyNames: ["css","sine","quad","cubic","expo","circ","back","steps"]     (8)
tiles: 27      visibleTiles: 8      scrollW: 1482   clientW: 436
```

`easingCatalogue.ts:174` (`FAMILY_ORDER`) confirms the eight. A person opening the Easing section
sees `css` and `sine` and nothing else — `quad`, `cubic`, `expo`, `circ`, `back` and `steps` are
six families that exist only if you happen to drag sideways on a strip whose only overflow cue is
`FadingScroll`'s edge mask.

Worse, the truncation is *ugly as well as lossy*. `EasingSpecimenStrip.vue:145-148` puts
`border-left: 1px solid var(--card-edge)` on every `.strip-family + .strip-family`. At 1512px the
port cuts mid-gap: **the `quad` family's left rule renders while `quad` itself does not.** Visible
in `shots/safari-desktop-light/gradient.png` and `shots/keyboard-focus-desktop/gradient.png` as a
bare vertical hairline against the right edge of the strip, ruling off nothing. In
`shots/rtl-desktop/gradient.png` the same edge truncates the family eyebrow to the word fragment
**"ad"** (from `quad`) — a legible two-letter nonsense label sitting where a group name belongs.

This is exactly the harness's `bleeding` list for this route: every entry is a strip node.

Law: `VISUAL-CONSTITUTION.md:210` — "Catalogue and specimen strips **support** the curve rather
than reducing it to a tiny nested widget." A catalogue 3.4× wider than its housing does not
support anything; it is a 27-item menu delivered four items at a time.
`PROPORTION-AUDIT.md:69` (§5.4) — "A divider is retained only when grouping would be ambiguous
without it"; a divider whose group is off-screen is pure ornament.

**Cure:** the strip's information architecture is wrong for the seat, not merely mis-sized. Eight
families × ~3 variants is a two-axis structure being flattened into one 1482px line. Either
(a) give the inspector a family selector and show one family's tiles at full width (the kf gallery's
own family-filter IA, which `EasingSpecimenStrip.vue:141` explicitly says was folded away "for
compactness"), or (b) wrap to a grid inside the 436px column. Do not "add a scrollbar."

---

### D-03 · MAJOR · In RTL the row label states the interval backwards, contradicting its own specimen 20px below

`useSpecimenRows.ts:62` mints the label as a bare string:

```ts
label: `${i + 1} → ${i + 2}`,
```

`→` (U+2192) is bidi-neutral. Rendered in an RTL paragraph with no isolation, the run reorders.

**Evidence:** `shots/rtl-desktop/gradient.png`, easing row. The head reads

> `⌃  linear   ╱  ●●   2 → 1`

while the ramp strip immediately beneath it still runs **green → blue**, i.e. stop 1 → stop 2.
The endpoint dots have also reversed (blue then green in reading order). The row therefore makes
two mutually contradictory assertions about the same interval, one line apart, and the label's
assertion is false.

Law: `VISUAL-CONSTITUTION.md:133` (§5.2) — "CSS direction keywords, physical axes, code, hex, slug,
ID | preserve the declared physical/domain meaning … no custom bidi reinterpretation."
`VISUAL-CONSTITUTION.md:154` (§6.1) — "CSS strings, hex, slugs, IDs and provenance | render in
**LTR-isolated spans** inside RTL prose." Neither `row.label` (line 124) nor `row.css` (line 177)
is LTR-isolated; `row.label` is the demonstrated failure.

**Cure:** ordinal/provenance/CSS-literal runs are a *typed* thing in this product, not ad-hoc
strings. Give them one house treatment — a `<bdi dir="ltr">`-equivalent span used at every
provenance site — rather than patching this one template. Composing the label from two isolated
ordinals plus a directional arrow (or dropping the arrow for `1–2`) removes the neutral entirely.

---

### D-04 · MAJOR · The row's "ONE literal" — the component's stated export contract — truncates on a 1512px desktop

Lines 167-177 call the readout "the row's ONE literal + copy (the one-literal law)" and render it
as `<code class="… truncate flex-1 min-w-0" :title="row.css">`.

Measured live at 1512×806, with the literal's own computed font:

```
font: normal 400 16.58px/23.212px "Fira Code", …
code box width: 360.0 px
"cubic-bezier(0, 0, 1, 1)"              →  244.9 px   fits
"steps(4, jump-end)"                    →  183.7 px   fits
"cubic-bezier(0.785, 0.135, 0.15, 0.86)"→  387.7 px   OVERFLOWS by 27.7 px
"cubic-bezier(0.68, -0.55, 0.265, 1.55)"→  387.7 px   OVERFLOWS by 27.7 px
```

Those last two are the literals of the `circ`/`back` families — **first-class tiles in the very
strip this component ships** (`easingCatalogue.ts:174`, `FAMILY_ORDER` includes `circ` and `back`).
Selecting one truncates the one thing the row exists to export, on the widest arm.

The only recovery is `:title` — a native tooltip, which is unavailable to touch and unreachable by
keyboard. AT users are fine only by accident: the *copy button's* `aria-label` (line 181) happens
to embed the full string.

Law: `VISUAL-CONSTITUTION.md:78` — "Live numbers use tabular figures and **reserve their widest
legal representation** so value changes never reflow the settled chassis." The widest legal
representation here is a 387.7px `cubic-bezier` quad and the box reserves 360.

**Cure:** the literal is the protagonist of the rail; the two ghost icons are support. Reserve the
literal's widest legal width and let the rail wrap the actions beneath it at narrow widths, rather
than letting two 24px icons win a width fight against the payload. (`title` is not a design.)

---

### D-05 · MAJOR · Hand-rolled disclosure and hand-rolled icon buttons, where glass-ui 7.0.0 ships both — and the sibling file in the same directory consumes them correctly

`@mkbabb/glass-ui@7.0.0` export map (read from `node_modules/@mkbabb/glass-ui/package.json`):

```
./collapsible   ./expandable-container   ./fading-scroll   ./button   ./chip   ./card   ./separator
```

This file instead hand-builds:

* **the disclosure** — `openInterval` ref + `toggleInterval` + `v-show` + manual
  `aria-expanded`/`aria-controls` + a manually rotated `ChevronDown` (lines 61-71, 119-147);
* **a second disclosure** — `tuneOpen` record + `toggleTune` (lines 84-88, 187-206);
* **two ghost icon buttons** — `.rail-btn` with its own hover wash, own focus ring, own radius,
  own transition (lines 178-197, 269-291).

`EasingSpecimenStrip.vue` — the file *next to it in the same folder*, by the same authorship —
imports `FadingScroll` and `Chip` from the producer and adds only a seat. That is the house idiom;
this file departs from it.

The cost is not stylistic. glass-ui's disclosure ships `.disclosure-content { animation-duration:
.01ms }` under `@media (prefers-reduced-motion: reduce)` (grep of `glass-ui.css`, the file's single
PRM block) — i.e. a real open/close motion *with* a reduced-motion carve-out. The hand-roll has
**no** open/close motion at all (D-12) and re-implements the focus ring in the exact way that D-01
kills.

Owner edicts breached: (4) "Glass-ui is the design system — variants/primitives belong in glass-ui,
not in demo/ui/. Reuse existing component-type names." (5) "Root-level styling — style at the
shadcn/glass root component level, never per-instance overrides." (3) KISS.

**Cure:** `Collapsible` for the row, `ExpandableContainer` (or a nested `Collapsible`) for the
authoring stage, `Button` (ghost/icon variant) for the two rail controls. If the ghost-icon
treatment does not exist at the required density, it belongs in glass-ui as a Button variant — not
as 23 lines of `.rail-btn` here.

---

### D-06 · MAJOR · Under forced colors the focus ring vanishes a second way, and the "tuning open" state has zero delta

Two independent mechanisms, both in this file's `<style scoped>`:

1. `outline: none` + `box-shadow` (lines 228-231, 285-288). CSS Color Adjust Level 1 §3.2 forces
   `box-shadow` to `none` in `forced-colors: active`. A focus indicator expressed *only* as
   `box-shadow`, with `outline` explicitly suppressed, is therefore absent in forced colors — for
   all three focusables in every row.
2. `.rail-btn--on { color: var(--motion-accent, var(--foreground)) }` (lines 289-291) is the
   **entire** visual difference between "authoring stage disclosed" and "not disclosed". Same for
   `.rail-tick`. `color` is a forced property in forced-colors mode, so both states resolve to
   `ButtonText` and the delta is **0**.

Law: `VISUAL-CONSTITUTION.md:83` — "Selected, failed, pending, withdrawn and disabled states are
**never color-only**." `:84` — focus distinct "in both schemes, **forced colors** and reduced
transparency." `:90`/`§4.2` states the same obligation for `ColorSpaceSelector` in the form of a
measurable requirement ("nonzero selected-state delta in monochrome and forced colors"); nothing in
the canon exempts this component.

**Reproduction: NOT EXERCISED — this is a spec-derived defect plus a coverage gap.** The harness's
own forced-colors arm is uninformative: `shots/forced-colors-desktop/gradient.png` is visually
indistinguishable from `shots/safari-desktop-light/gradient.png` (same pink atmosphere, same cream
plates, same accent-inked `linear` tile) — no forced-colors treatment was applied in that capture,
so the arm proves nothing about any component. Neither Playwright-MCP nor Chrome-DevTools-MCP as
exposed here can emulate `forced-colors` (`emulate` accepts `colorScheme` only). **A real
forced-colors arm is missing from the mega-tranche visual matrix**; I record that as part of this
finding.

**Cure:** express focus as `outline` (which forced-colors preserves and recolors) and give the
toggle a non-colour state channel — the same channel the producer's `Toggle`/`Button` pressed state
already owns. This disappears entirely if D-05's cure lands.

---

### D-07 · MAJOR · The row is a Card in a composition whose binding Card inventory is zero, and a boundary stack four deep

`OPTICAL-BENCH-COMPOSITIONS.md §5` is explicit and terminal:

> "The Card inventory is terminal: Browse and Library use exactly one Card shell per rendered
> palette entity; their fields/lanes/empties/inspectors contain none; **the other sixteen
> compositions have Card count `0`**."

and for Gradient: P122 boundaries `[]`, reserve `none`, retained non-P122 dividing line **`none`**,
grouping job "meniscus, stop seats and code/action interval carry grouping."

Line 114 renders, once per interval:

```html
<div class="rounded-card border border-card-edge overflow-hidden" …>
```

That is Card radius + Card edge + Card clipping, housing one bounded object (an interval) with an
identity line and an action region — i.e. functionally a Card by `PROPORTION-AUDIT.md §5.1-5.2`,
without being one by class. It is either an uncounted retained line in a composition whose retained
line count is `none`, or a Card in a composition whose Card count is `0`. There is no third reading.

Inside that box, within a measured **197.45px** of vertical space, the boundary stack is:

1. row `border border-card-edge` (line 114)
2. ramp `border border-card-edge` (line 153)
3. rail `bg-well` material step (line 176)
4. each of 27 specimen tiles' own Chip edge, plus `.strip-family` left rules (`EasingSpecimenStrip.vue:145`)
5. the authoring stage's own well when disclosed

`PROPORTION-AUDIT.md:49` (PR-05) — "Dividers, caster shadows and corner marks repeat a boundary |
**REMOVE**". §5.4 — "Spacing plus material already expressing the same boundary makes the line
duplicative."

**Cure:** the interval rows want *interval and material*, not a box each. Strip the per-row card
box; let the open row's well and the collapsed rows' rhythm carry grouping, exactly as the binding
table's "grouping job" column already decided for this composition. This also dissolves D-01 at the
root, because the clip disappears with the box.

---

### D-08 · MINOR · The row has no protagonist: three semantic roles rendered identically

Head contents, left to right: ordinal label (`1 → 2`), two 10px endpoint dots, a 16×16 curve glyph,
the curve name, a chevron. Five marks. Measured typography:

```
.readout-rail code   font: normal 400 16.58px "Fira Code"   color: rgb(112, 89, 66)
```

and the head's label span *and* name span carry the identical `fira-code text-mono-small
text-muted-foreground` triple (lines 124, 136). So the row's least important datum (which ordinal
pair) and its most important (which curve) render at the same size, weight, family and colour, as
does the CSS literal below. The **only** differentiated ink in the entire row is the 16×16 glyph
stroked in `--motion-accent`.

`PROPORTION-AUDIT.md:67` (§5.2) — "A card has **one protagonist**, one identity line, and at most
one persistent action/status region." `:73` (§5.8) — "Real rendered relation wins over token
intent." Choosing `text-mono-small` for all three is legal per the type matrix; producing zero
hierarchy from that choice is the defect.

Compare the head's 16px glyph against `VISUAL-CONSTITUTION.md:210`'s "centered, container-clamped
19–22rem stage" for a curve, and `PROPORTION-AUDIT.md:53` (PR-09, "Gradient/Easing protagonist
subordinated | **ENLARGE**"). Even granting that the 19–22rem law binds `/easing` rather than
`/gradient`'s inspector, the direction of travel this component takes is the one the register
forbids.

---

### D-09 · MINOR · Array position is used as identity for four independent pieces of UI state

`openInterval` (line 61), `tuneOpen` (line 84), `copiedIndex` (line 95) and the emit contract
(`"update-interval": [index, value]`, line 49) are all keyed by the interval's **array position**.
`useSpecimenRows.ts:60-70` builds `index: i` from the same position.

`useGradientModel.ts:116-119` (`addStop`) inserts into a position-sorted array, and
`useGradientModel.ts:88-98` resizes `intervals` by truncating from the **end**. So inserting a stop
anywhere but last renumbers every interval: the curve that described `s1→s2` silently becomes the
curve of `s0→s1`, while `openInterval`/`tuneOpen`/`copiedIndex` keep pointing at position 0.

The file's own header comment (line 52-53) claims "identity derived from the interval, the truth" —
which is true of `useSpecimenRows` and false of every stateful ref in the component.

**Reproduction:** HYPOTHESIS — derived from source, not executed. (Adding a mid-gradient stop
requires a bar click I did not perform; the ramp-click add path is `GradientVisualizer.vue:88-90`.)

**Cure:** intervals should carry stable ids the way stops already do (`useGradientModel.ts:117`,
`id: uid()`), and this component should key on the id. That is a model change, but the design
statement is this component's: a row is an *interval*, not a *slot*.

---

### D-10 · MINOR · A failed copy is silent, and the button's accessible name mutates to carry the result

Lines 94-103 and 178-186:

```ts
const { status: copyStatus, copy } = useClipboard({ resetMs: 1400 });
const copiedRow = computed(() => copyStatus.value === "success" ? copiedIndex.value : null);
```

```html
:aria-label="copiedRow === row.index ? 'Copied' : `Copy ${row.css}`"
```

Two design defects in one control:

* `copyStatus === "error"` is never rendered. A clipboard denial (insecure context, permission
  refusal, Safari's user-gesture requirement) produces **no** visual, textual or announced change —
  the icon simply does not flip. The user believes the copy happened.
* the success result is carried by **mutating the button's accessible name** for 1400ms and then
  mutating it back. A control's name is its identity, not its outcome.

Law: `VISUAL-CONSTITUTION.md:83` — "Selected, failed, pending, withdrawn and disabled states are
never color-only. Role, accessible name, state/value and associated error/status are **explicit**."
`:101` (§5) — "Persistent operation state stays with the entity/workspace. A transient flourish may
celebrate success but **never carries the only truth**." Here the transient tick is the only truth,
and failure has no truth at all.

**Cure:** stable name, outcome in a polite status region owned by the instrument — the same region
the CSS section's copy already needs.

---

### D-11 · MINOR · The 27-tile catalogue is instantiated once per interval

`EasingSpecimenStrip` is rendered *inside* `v-for="row in specimenRows"` (line 161), so instance
count equals interval count. Each instance renders `SPECIMEN_TILES.length` Chips — measured **27**.
The strip's own comment acknowledges the duplication: "sibling rows mount hidden twins of every
data-specimen id" (`EasingSpecimenStrip.vue:40`).

`REPORT.json` (`/#/gradient`, desktop): `button: 53`, `allElements: 508` — with a **single**
interval. Twenty-seven of those 53 buttons are one stateless, global constant rendered as a control
surface. A five-stop gradient renders four intervals → 108 tile buttons and 4 `EasingPicker`
instances, all live (`v-show`, per the header comment on lines 16-18).

The catalogue is a module constant (`easingCatalogue.ts:198`). Nothing about it varies per interval
except which tile is pressed. Rendering N copies of a global gallery to express one selection is a
composition error, and it is the direct cause of D-02's dimensions (a 1482px line cannot be given
more room when there are N of it).

**Cure:** one catalogue for the editor, positioned by the open row — the classic single-inspector
arrangement — rather than one catalogue per row.

---

### D-12 · MINOR · Motion incoherence: the chevron animates for 200ms; the panel it describes has none

`transition-transform` on the chevron (line 138) resolves live to

```
transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), translate 0.2s …, scale 0.2s …, rotate 0.2s …
```

The panel it points at is a `v-show` display toggle (line 144) — an instantaneous pop, no
transition, no `<Transition>`. So the *indicator* of the disclosure is animated and the disclosure
itself is not. `VISUAL-CONSTITUTION.md:139` — "Spatial continuity uses one producer-owned glass-ui
spring register"; `:141` — "A scene swap preserves the specimen and changes the surrounding
instrument. No full-slab remount hole."

Secondary: the chevron's `0.2s` and `cubic-bezier(0.4,0,0.2,1)` are Tailwind defaults that
**coincide** with `--duration-fast` (measured `0.2s`) and `--ease-standard` (measured
`cubic-bezier(0.4,0,0.2,1)`) rather than declaring them. The sibling rules on the same element's
parent (lines 222-224, 277-279) *do* declare the tokens. Any producer change to either token
desynchronises the chevron from its own row.

`prefers-reduced-motion` is **not** a defect here — `demo/styles/animations.css:184-192` carries a
global `*,*::before,*::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms
!important }` guard that reaches all of it. Recorded as a pass, not a finding.

---

### D-13 · MINOR · The endpoint-dot pair uses a physical margin in an otherwise fully logical rule, and stops overlapping in RTL

`GradientEasingEditor.vue:239-251` writes the dot in logical properties — `inline-size`,
`block-size` — and then breaks the idiom on the one property that matters for direction:

```css
.specimen-dot + .specimen-dot { margin-left: -3px; }
```

Comment on line 234: "slightly overlapped — **a pair**."

Measured in `frames/repro.html` with the identical rule:

```
LTR: dot1.right = 1082.23   dot2.x = 1079.23   →  overlap = 3.00 px    (intended)
RTL: dot1.x     = 1403.77   dot2.right = 1403.77 → overlap = 0.00 px   (tangent circles)
```

In RTL the negative `margin-left` lands on the flex *end* side of the last child and merely shrinks
the container; the two dots abut instead of overlapping, and the "a pair" reading is gone.
Consistent with `shots/rtl-desktop/gradient.png`. Same mechanism family as D-03: the direction laws
of `VISUAL-CONSTITUTION.md §6.1` are not applied to this component.

**Cure:** `margin-inline-start: -3px`.

---

### D-14 · MINOR · Both rail controls sit exactly on the target floor while their glyph is 14px

Measured, both arms:

```
desktop 1512:  rail-btn rects  24 × 24 (x=646.5) and 24 × 24 (x=676.5)   gap 6px
mobile   390:  rail-btn rects  24 × 24 (x=282)   and 24 × 24 (x=312)     gap 6px
padding-top: 5px    icon: w-3.5 h-3.5 = 14px
```

24×24 is exactly WCAG 2.2 SC 2.5.8's minimum, with no invisible expansion — the seat *is* the
visible chrome. `PROPORTION-AUDIT.md:72` (§5.7) — "Visual glyph size, operable target size and
layout reservation are **separate quantities**"; PR-12 — "Invisible/seat geometry preserves target
floor while optics follow rung." Here they are one quantity, pinned to the floor. On the 390px
mobile arm this is the pane's only per-interval export action.

For calibration: the mega-tranche harness flags this route's 22×22 dock controls and 20×20 stop
seats (`REPORT.json`) and does *not* flag these — they clear its threshold by 2px. That is the
whole margin.

---

### D-15 · INFO · The authoring stage is buried two disclosures deep

To reach the actual curve editor a person must (1) open the interval row and (2) press an
unlabelled-by-text slider glyph whose only affordance cue is `aria-label="Author a custom curve"`
(line 193) and whose only open-state cue is a colour change (D-06). `PROPORTION-AUDIT.md:71` (§5.6)
— "Add affordance when the surviving action/state is otherwise undiscoverable"; `:53` (PR-09) — the
Easing protagonist is to be **ENLARGED**, not nested one level further. Two nested progressive
disclosures around the one authoring surface in the section is the opposite move.

---

### D-16 · INFO · Adjacent (not this file): the `Easing` section heading uses the wrong type role

`GradientVisualizer.vue:241`:

```html
<h3 class="font-display text-subheading text-muted-foreground">Easing</h3>
```

The binding type matrix (`VISUAL-CONSTITUTION.md:73` and `OPTICAL-BENCH-COMPOSITIONS.md`, "Binding
type matrix") assigns **section heading → `text-heading` + Plus Jakarta Sans**;
`--type-subheading` + Fraunces (`font-display`) is the **palette identity** role. The same pattern
repeats at lines 149 and 253 (`Interpolation`, `CSS`). Recorded here because it frames this
component and this seat read it while judging the section; **owner is `GradientVisualizer.vue`, not
the subject file.** No edit made.

---

## Negative results — what I attacked and could not break

Recorded so the next seat does not re-spend the budget.

| Axis | Probe | Result |
|---|---|---|
| `--motion-accent` contrast | live: `accent oklch(43.48% 0.0743 205)` vs rail well and vs plate | **5.90 : 1** and **6.23 : 1**. `useSpecimenRows.ts:40,69` routes the ink through `useSafeAccentFn("resting")`, so it is floored by construction. Sound. |
| Muted literal on the well | live | **5.08 : 1**. The `bg-well` reservation the comment on lines 170-175 describes does what it claims. Sound. |
| Dark-mode material step | pixel-sampled from `safari-desktop-{light,dark}/gradient.png` | light: plate L=0.545 / rail L=0.608 (rail advances); dark: plate L=0.103 / rail L=0.079 (rail recedes). Both ≈1.1–1.2 : 1 — a correctly quiet well in both schemes. Sound. |
| `prefers-reduced-motion` | `demo/styles/animations.css:184-192` | global `transition-duration: 0.01ms !important` guard reaches every transition in this file. Sound. |
| Empty state | `useGradientModel.ts:83,123` | `intervals` seeds with one entry and `removeStop` refuses below 2 stops, so `specimenRows` is never empty. The absent empty state is **not** a defect. Sound. |
| Horizontal page overflow | `REPORT.md:20-22` | `overflowX: 0` on `/#/gradient` in all four matrices. The 1482px strip is contained. Sound. |
| Console / page errors | `REPORT.json` `/#/gradient` | `pageErrors: []`, `consoleErrors: []` in all four matrices. Sound. |
| `verbatimModuleSyntax` | lines 27-40 | every type-only import is `import type` (`EasingPickerValue`, `SpecimenTile`, `GradientInterval/ModelState/Stop`). Compliant. |
| Vue 3.5 idiom | lines 42-46 | reactive props destructure used correctly; no `defineModel` stale-read hazard in this file. Compliant. |
| Duplicate AT names across rows | template line 161 + `v-show` | hidden rows are `display:none`, so only the open row's 27 tiles are in the AT tree. Not a defect. |
| Harness small-tap-target rows | `REPORT.json` | all six on `/#/gradient` belong to the dock and the stop seats, none to this component. Not attributable here. |

## Uncovered arms (coverage gaps, not exonerations)

* **forced-colors** — the captured arm applied no forced-colors treatment (see D-06). The whole
  mega-tranche matrix inherits this gap.
* **zoom 200%** — `shots/zoom-200-desktop/gradient.png` never scrolls to the Easing section, so the
  component has no 200%-zoom witness at all.
* **`reduced-motion`** — the captured arm is a static frame; it cannot witness a transition, only
  its absence.
* **N > 1 intervals** — every captured frame is the 2-stop default, i.e. exactly one interval row.
  D-01's worst case (collapsed rows) and D-11's multiplication have **no** captured witness. This is
  the single largest hole in the evidence for this component.

---

## Summary table

| ID | Severity | Defect | Anchor |
|---|---|---|---|
| D-01 | BLOCKER | Focused collapsed row paints 0 focus px | `:114`, `:228-231` |
| D-02 | MAJOR | 70.6%/79.9% of the selection catalogue hidden; divider rules an unrendered group | `:161`, `EasingSpecimenStrip.vue:145` |
| D-03 | MAJOR | RTL inverts the interval label to `2 → 1`, contradicting its own ramp | `useSpecimenRows.ts:62`, `:124` |
| D-04 | MAJOR | The "one literal" truncates at 1512px for shipped catalogue tiles | `:177` |
| D-05 | MAJOR | Hand-rolled Collapsible + icon buttons; glass-ui 7 ships both | `:61-88`, `:269-291` |
| D-06 | MAJOR | forced-colors: box-shadow focus erased; toggle state colour-only | `:228-231`, `:285-291` |
| D-07 | MAJOR | A Card in a Card-count-0 composition; 4-deep boundary stack | `:114` |
| D-08 | MINOR | No protagonist in the row; three roles, one treatment | `:124`, `:136`, `:177` |
| D-09 | MINOR | Array position used as interval identity in 4 places | `:49`, `:61`, `:84`, `:95` |
| D-10 | MINOR | Copy failure silent; accessible name mutates to carry the result | `:94-103`, `:181` |
| D-11 | MINOR | 27-tile global catalogue instantiated once per interval | `:161` |
| D-12 | MINOR | Chevron animates; its panel does not; motion tokens by coincidence | `:138`, `:144` |
| D-13 | MINOR | Physical `margin-left` breaks the dot pair in RTL (3px → 0px) | `:249-251` |
| D-14 | MINOR | Rail controls exactly on the 24px floor; seat == visible chrome | `:269-272` |
| D-15 | INFO | Authoring stage two disclosures deep | `:187-206` |
| D-16 | INFO | Adjacent: section heading uses the palette-identity type role | `GradientVisualizer.vue:241` |

**No source edits were made by this seat.** Files written: this report and
`frames/{repro.html, D-01-focus-A-clipped-0px.png, D-01-focus-B-control-4352px.png}`, all under
`docs/tranches/V/megatranche/audit/components/wb-gradient-easingeditor/`.

# CHALLENGE-D — `demo/workbenches/mix/MixResultDisplay.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the tier this seat was
spawned with. The declaration is explicit, not inherited.

---

## 0. Verdict

**DEFECTIVE.** Seventeen findings, four of them structural. The component's central design claim —
"the result plate is the announced DESTINATION the convergence lands on" (its own docstring,
`MixResultDisplay.vue:10-18`) — is **not true in the shipped build**: the anchor it advertises,
`[data-mix-target]`, is deleted by glass-ui 7 before it reaches the DOM, and a silent geometric
fallback in `mixStage.ts` hides the fact. Everything downstream of that premise (the ghost, the
morph, the "one shape" seed story) is narration over a mechanism that does not run.

The second structural failure is that a **palette result carries no readable truth at all** — no
values, no titles, no accessible names, every swatch `aria-hidden`. The third is that the "one
surface, new content" morph is measurably a **68 px collapse and re-expansion**. The fourth is that
the plate's identity line spends the entire mixing window at **2.21:1 contrast**.

Strongest defect: **D-1**.

---

## 1. Method and evidence base

| Source | What it gave |
|---|---|
| `demo/workbenches/mix/MixResultDisplay.vue` (159 lines, read whole) | the subject |
| `MixPane.vue`, `MixSourceSelector.vue`, `MixConfigBar.vue`, `composables/useMixingState.ts`, `MixAnimationCanvas/composables/mixStage.ts`, `demo/palettes/mix.ts`, `demo/shell/usePaneRouter.ts` | the composition it sits in |
| `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`, `.../components/dock/DockControl.vue.d.ts`, `.../DockSeparator.vue.d.ts`, `.../composables/dom/useClipboard.d.ts`, `.../styles/typography/utilities.css`, `.../components/dock/styles/controls/touch-floor.css` | the producer contract at `@mkbabb/glass-ui@7.0.0` |
| `docs/tranches/V/VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`, `PALETTE-CONTRACT.md` | the canon |
| `docs/tranches/V/megatranche/audit/visual/REPORT.md` + `shots/safari-desktop-light/mix.png` + `shots/safari-mobile-dark/mix.png` | the 60-capture matrix |
| Live Chromium via Playwright on `http://localhost:9000/#/mix`, palettes mode, real 3-colour mix | every measured number below |
| `frames/plate-settled-palette-{light,dark}.png` (this directory) | element captures of the settled plate |

Live probes were run against the shared dev page; where another seat's navigation invalidated a
probe I re-ran it rather than infer. One candidate finding ("the plate spontaneously disappears")
was **withdrawn** after I traced it to my own stray click plus a concurrent seat's navigation, and
one ("a one-stop `linear-gradient` is invalid CSS") was **withdrawn** after measuring
`getComputedStyle(...).backgroundImage === "linear-gradient(to right, rgb(255, 0, 0))"`. Neither
appears below.

---

## 2. Visual truth first

### 2.1 The matrix never sees this component (D-16)

`MixResultDisplay` is mounted `v-if="mixResult"` (`MixPane.vue:112`). All 60 captures in
`audit/visual/REPORT.md` are at-rest route loads. I read `shots/safari-desktop-light/mix.png` and
`shots/safari-mobile-dark/mix.png`: both show Mix at rest — segmented tabs, the `Selected` dashed
well, Color space / Hue method, the `Mix` button — and **no Result plate**. The route rows
(`REPORT.md:123,138,153,168`) therefore measure a Mix pane that has never produced a result. The
component with the richest state machine in the workbench is the one the visual gate cannot see.

Desktop at rest also shows the second-order consequence: with no plate, the Mix pane's lower ~35% of
a 683 px column is empty air (`shots/safari-desktop-light/mix.png`), which §3 law 2 forbids for
secondary content ("at most a narrow invitation tray (≤15% of the stage) or disappears"). The plate
is what is meant to occupy it, and it only ever arrives by growing the page.

### 2.2 What the settled plate actually looks like

`frames/plate-settled-palette-light.png` and `…-dark.png` (462 × 170 CSS px, captured at DPR 2 from
the live route, 3-colour palette result):

- **`RESULT`** — Fraunces, bold, uppercase, 12.18 px, letter-spacing 0.304 px. It reads as a
  decorative eyebrow, and it is set in a different typeface, weight and tracking than the
  `COLOR SPACE` / `HUE METHOD` labels sitting 200 px above it in the same pane (Fira Code, 400,
  letter-spacing 1.218 px). Two label systems in one composition (D-6).
- **The specimen** — three 40 px dots, left-packed, occupying 136 px of a 430 px row (**fill ratio
  0.316**). The remaining 294 px is empty.
- **The decoration** — a full-width 430 × 16 px gradient strip, explicitly commented "decorative"
  (`MixResultDisplay.vue:107-108`), restating the same three colours in the same order. The
  decoration has **3.16 ×** the inline extent of the data it decorates and is the visually dominant
  mark in the plate (D-7).
- **The actions** — three 28 × 28 px unlabeled glyphs, bottom-left, with an invisible separator
  between the second and third (measured 1 × **0** px, D-11).
- **Rhythm** — every interval is 12 px: identity→content, specimen→decoration, decoration→actions.
  No title gap, no section gap, no hierarchy (D-12).
- **No characters** other than `RESULT`. A palette result shows the user zero colour values (D-2).

Dark treatment is the same composition on `--well-bg` recomputed for the dark card; nothing is
scheme-specific in the component, so both schemes inherit every defect above identically.

---

## 3. Findings

### D-1 · BLOCKER · The announced convergence anchor does not exist in the DOM

`MixResultDisplay.vue:64-73` places `data-mix-target` on `<WatercolorDot>`. glass-ui 7.0.0's
`WatercolorDot` is `inheritAttrs: false` and its render function binds **only** `attrs.class` and
`attrs.style`:

```js
// node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js
inheritAttrs: !1,
setup(e) { let t = e, n = h() /* useAttrs */, c = i(() => n.class), f = i(() => n.style), … }
return (t, n) => (d(), o("span", {
    "aria-hidden": "true",
    class: l([c.value, "watercolor-swatch", …]),
    "data-testid": "watercolor-swatch",
    "data-variant": e.variant,
    style: u([f.value, { … pointerEvents: "none", … }])
}, …
```

Every other consumer attribute — `data-mix-target`, `title`, `aria-hidden`, listeners, `tag` — is
discarded. Measured live across a complete mix (16 samples, `before` → `+2000 ms`):
`document.querySelectorAll('main [data-mix-target]').length === 0` **at every frame**.

The consumer of that anchor swallows the absence:

```ts
// demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:121-124
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl
    ? layoutCenter(targetEl, root)
    : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

So the drops always converge on a geometric guess — mid-width, 70% down the scroll height, r = 28 —
and never on the well the plate paints. The plate's whole design ("the DESTINATION of the mix
convergence… the anchor the canvas convergence lands on", lines 10-14) is unrealised, and the
fallback is precisely the "masking fallback" owner edict 2 forbids.

**Mechanism:** consumer identity attached to a producer component that drops fallthrough attributes.
**Reproduction:** load `/#/mix`, select two palettes, press Mix; during and after the mix
`document.querySelectorAll('main [data-mix-target]').length` is `0`.
**Cure (transposition, not patch):** identity belongs to markup the consumer owns. The ghost well
becomes a real element (`<div data-mix-target>` wrapping the dot, or a named seat primitive), and
`mixStage.collectStage` returns `null` when the anchor is missing so the failure is loud. The
producer-drops-attributes fact should be written into the component register — `MixSourceSelector`'s
add-slot is dead for the same reason (its `aria-label`, `@click` and `tag="button"` are all gone;
the rendered node is an `aria-hidden`, `pointer-events:none` `<span>`), which is why
`REPORT.md:99,106` records a nameless button on `/#/mix`.

---

### D-2 · BLOCKER · A palette result carries no readable truth

The single-colour branch prints its value (`MixResultDisplay.vue:85-87`). The palette branch prints
nothing: it renders N dots whose only truth channel is `:title="color.css"` (line 103) — which the
producer drops — inside spans the producer forces to `aria-hidden="true"`.

Measured on the settled 3-colour plate:

```
dots: [ {ariaHidden:"true", title:null, tag:null, w:40} ×3 ]
plate.innerText === "RESULT"
```

So for the palette half of this workbench: no visible values, no hover truth, no accessible name, no
AT presence. The user cannot read, copy-by-eye, or hear a single colour they just produced. `Copy`
is the only exit, and it emits an unlabelled comma-joined blob.

This violates VISUAL-CONSTITUTION §4.2 ("data-bearing static faces remain present as noninteractive
**named** list/text content"), §4.1 ("Selected, failed… states are never colour-only… accessible
name, state/value… are explicit") and PR-07.

**Mechanism:** truth carried by a tooltip attribute on a component that cannot receive attributes;
no text representation designed for the plural case.
**Reproduction:** `/#/mix` → Palettes → select two → Mix → the settled plate contains one text node.
**Cure:** the palette branch renders the ordinals and values as `text-mono-small` rows (the same
type role the single-colour branch already uses); the dots become the decoration *beside* named
data rather than the sole carrier of it.

---

### D-3 · MAJOR · "One surface, new content" is a 68 px collapse-and-reopen

`<Transition name="vj-morph" mode="out-in">` (line 60) with `--vj-morph-collapse` and
`--vj-morph-expanded` never set, so `animations.css:104-136`'s `max-height` arm resolves
`none → none` and does nothing. `out-in` then guarantees the surface empties before it refills.

Measured, one real mix, `.mix-plate` bounding box:

| t (ms) | height | top | ghost class | opacity | dots | text |
|---:|---:|---:|:--|--:|--:|:--|
| before | 167.8 | 706.1 | false | 1 | 3 | RESULT |
| +16 … +200 | 167.8 | 706.1 | **true** | 1 → 0.55 | **3 (the OLD result)** | RESULT |
| +400 … +800 | **99.8** | 713.1 | true | 0.55 | 1 | RESULT |
| +900 | 99.8 | 713.1 | false | 0.55 | 1 | RESULT |
| +1300 … +2000 | **167.8** | 706.1 | false | 1 | 3 | RESULT |

Three separate design failures fall out of that table:

1. **±68.0 px (±68%) height pump** with a 7 px top shift, un-animated, in both directions.
2. For the first ~400 ms of a re-mix the plate shows the **previous** result dimmed to 55% — the
   "announced destination" is actually the stale answer.
3. The plate does not reach its final content until **~1300 ms**, 400 ms after the clock declares
   `done` at +900 ms — against the "Total wall clock ≤ 1.2 s" contract asserted in
   `useMixingAnimation.ts:21-22`.

§6 forbids exactly this ("A scene swap preserves the specimen and changes the surrounding
instrument. No full-slab remount hole, rAF-delayed blank").

**Cure:** make the ghost the same shape as the result (see D-8) so settle is an ink-in with no
geometry change; keep one surface with keyed content and no `out-in`; if a height morph is genuinely
needed, set the `--vj-morph-collapse/-expanded` the family already exposes instead of leaving the
declared transition inert.

---

### D-4 · MAJOR · The identity line sits at 2.21:1 for the whole mixing window

`.mix-plate--ghost { opacity: 0.55 }` (line 155-157) dims the **entire plate**, type included.

Measured (canvas-resolved sRGB, WCAG 2.x formula):

```
label  rgb(112,89,66)  on plate rgb(233,225,217)  → 5.08:1   (settled, passes AA)
same label composited at opacity .55               → 2.21:1   (ghost, fails AA 4.5:1
                                                               and the 3:1 non-text floor)
```

The ghost class is present from +16 ms to ~+900 ms (table in D-3), so the plate's only identity line
is illegible for the entire narration. §4.1: "Text, focus, boundaries and state meet their rendered
contrast on the actual material tier; a token name is not evidence."

**Mechanism:** presence attenuation applied at the container instead of at the specimen tier.
**Cure:** dim the well and the silhouette (the specimen tier — §2's "Watercolor/data" lane), never
the type. The label is the one thing that must survive the reduced-presence state, because it is the
only thing that explains it.

---

### D-5 · MAJOR · Three unlabeled 28 px actions that opt out of the producer's touch floor

Measured: all three `DockControl`s render **28 × 28 CSS px**, `aria-label = null`, `innerText = ""`;
the only accessible name is `title` (hover-only, absent on touch, and — for the copy control — used
to carry *state* as well: `:title="copied ? 'Copied!' : 'Copy color'"`, line 123).

The producer ships a standalone touch floor and `compact` is explicitly carved out of it:

```css
/* node_modules/@mkbabb/glass-ui/dist/components/dock/styles/controls/touch-floor.css */
@media (pointer: coarse) {
  .dock-icon-button:not(.dock-icon-button--compact):not(:where(.glass-dock *)) {
    min-block-size: var(--dock-touch-target, 2.75rem);
    min-inline-size: var(--dock-touch-target, 2.75rem);
  }
```

The plate is not inside a `.glass-dock`, and it passes `compact` (lines 122, 129, 137), so on a
coarse pointer these three controls keep their 28 px paint box as their hit box. `DockControl`'s own
docblock advertises "the HIT CELL stays the full `--dock-control-size` (≥44px on coarse via the
density clamp) — hit box ≠ paint box"; `compact` is the one spelling that throws that away.
PROPORTION-AUDIT §5 law 7 says the opposite is the law: "Visual glyph size, operable target size and
layout reservation are separate quantities."

Honest scope: 28 px clears WCAG 2.5.8 (AA, 24 px) and the audit harness's own 24 px probe
(`capture.mjs:87`), and fails WCAG 2.5.5 (AAA, 44 px) and the producer's own declared floor.

**Cure:** drop `compact`; give each control a real accessible name; let `title` be a tooltip, not the
name and not the state channel.

---

### D-6 · MAJOR · The label re-creates a producer recipe per-instance, in the wrong family and weight

| Site | Source | Measured computed style |
|---|---|---|
| `MixResultDisplay.vue:58` `Result` | `font-display text-caption font-bold text-muted-foreground uppercase tracking-wide` | **Fraunces**, **700**, 12.179 px, ls **0.304 px** |
| `MixConfigBar.vue:98` `Color space` | `.section-label` (producer) | **"Fira Code"**, **400**, 12.179 px, ls **1.218 px** |
| `MixSourceSelector.vue:119` `Selected` | `text-small font-display font-semibold` | a third spelling for the same job |

The producer already owns this recipe:

```css
/* node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css */
.section-label { @apply text-mono-caption; color: var(--muted-foreground); }
@utility text-mono-caption { font-family: var(--font-mono); font-size: var(--type-caption);
                             letter-spacing: var(--type-tracking-caps); text-transform: uppercase; }
```

`.section-label` is used 20 times across 9 demo files. This plate reaches past it and hand-rolls five
utilities that approximate it and get the family and weight wrong. VISUAL-CONSTITUTION §4 closes the
type matrix ("control or label… `text-small`, Plus Jakarta Sans, **non-bold**"; Fraunces owns
display/identity only) and PROPORTION-AUDIT §5 law 13 repeats it. Owner edicts 4 and 5 both apply:
glass-ui is the design system, and styling happens at the root, not per instance.

**Cure:** `<span class="section-label">Result</span>`. Then fix `Selected` the same way, so the Mix
composition has one label species instead of three.

---

### D-7 · MAJOR · The decorative strip out-ranks the specimen 3:1 and contradicts it in RTL

Measured on the settled 3-colour plate:

```
swatch row inline extent 430 px, swatch ink 136 px  → fill ratio 0.316
gradient strip              430 × 16 px             → 3.16× the data's inline extent
```

And it disagrees with the data it restates the moment direction flips. Measured with
`document.documentElement.dir` toggled on the live plate:

```
LTR dot x:  559 (colors[0], L=0.498) → 607 → 655 (colors[2], L=0.725)
RTL dot x:  425 (colors[0])          → 377 → 329 (colors[2])      ← row mirrors
strip in both:  linear-gradient(to right, colors[0], colors[1], colors[2])  ← does not
```

So in RTL the swatch row reads light→dark left-to-right while the strip beneath it reads
dark→light: two representations of one ordered palette, contradicting each other about its order.
§6.1 ("palette/release order — preserve explicit ordinal identity") and §5.2's reorder row both make
ordinal truth binding; §3 law 8 forbids support competing with the protagonist by equal size.

**Mechanism:** a physical CSS direction keyword painting data whose sibling representation follows
logical direction.
**Cure:** delete the strip. It is labelled decorative by its own comment, it duplicates the swatch
row exactly, and PROPORTION-AUDIT §5 laws 5-6 say subtraction precedes explanation. If a continuous
reading is genuinely wanted, it becomes *the* representation, painted `to inline-end`, with the dots
demoted to named data rows.

---

### D-8 · MAJOR · The ghost promises a shape the palette result never wears

```vue
<!-- lines 63-73 -->
<div v-if="ghost" key="well" class="flex items-center gap-3">
  <WatercolorDot :color="wellColor" variant="ghost" seed="mix-result"
    :class="result.type === 'color' ? 'w-14 h-14' : 'w-10 h-10'" … />
```

One well, always — while a palette result renders N dots plus a strip plus an action row.
`wellColor` (lines 36-40) even admits it: it paints `colors[0]` and drops the rest. Measured: ghost
frame `dots: 1`, settled frame `dots: 3`.

The docstring claims "the silhouette the pigment poured into is the silhouette the result wears"
(lines 15-17). For every palette mix that sentence is false, and the falsehood is the direct cause of
D-3's 68 px pump.

**Cure:** the ghost renders N wells with the N result seeds (the result is already computed
synchronously at `startMix` — `useMixingState.ts:85-98` — so N is known before the narration
starts). Settle then becomes an ink-in at constant geometry, which retires D-3 as well.

---

### D-9 · MAJOR · Copy exists twice with divergent semantics, and neither reports failure

| Owner | Code | Feedback |
|---|---|---|
| the plate | `MixResultDisplay.vue:31-32, 42-47` — `useClipboard({resetMs:1500})` | Copy→Check icon swap + `title` change |
| the dock action bar | `usePaneRouter.ts:222` → `MixPane.vue:49-55` — bare `writeClipboard`, return value discarded | none |

The serialization rule is duplicated verbatim in both files
(`MixResultDisplay.vue:43-46` vs `MixPane.vue:51-53`). PR-13 names this exact mechanism ("specimen
and action region both host Copy → REMOVE") and PR-06 assigns "one action/selection owner across
Generate and owner/Admin/**Mix** tabs".

Both drop the producer's failure state. `useClipboard.d.ts:3` declares
`ClipboardStatus = "idle" | "pending" | "success" | "failure"` plus `onCopyError` and `invalidate`;
the plate maps only `success` (line 32), so a **failed copy is pixel-identical to idle** — the user
presses Copy, nothing happens, nothing says so. §5: "Persistent operation state stays with the
entity/workspace. A transient flourish may celebrate success but never carries the only truth."

`invalidate()` is also never called, so a confirmation minted for result A survives into result B for
up to 1500 ms. *(That last consequence is reasoned from the code path; I did not land a live
reproduction before the shared page was navigated by another seat — treat the stale-tick clause as a
hypothesis, the unhandled-`failure` clause as measured from the producer's declared union.)*

**Cure:** one owner. The plate owns the action; the dock entry delegates to the same handler or is
deleted. `failure` renders a named failure state; `invalidate()` fires whenever `result` changes.

---

### D-10 · MAJOR · Save is a silent, unbounded, unconfirmed write

`emit('save')` (line 131) → `MixPane.onSave` (lines 38-47) → `pm.createPalette("Mixed Color" |
"Mixed Palette", …)`. There is no status node anywhere in the plate (`plate.innerText === "RESULT"`
on a settled palette result), no name, no duplicate guard, no undo. Pressing Save five times writes
five identically-named palettes and the UI never changes by one pixel.

PR-08 is the owning row: "Pending/failure/export/recovery truth only transient → **ADD-AFFORDANCE**.
Persistent entity status/recovery." Here the truth is not even transient — it is absent.

**Cure:** Save resolves to a durable statement in the plate ("Saved as *Mixed Palette 3*" with a link
to the entity) and becomes idempotent-per-result, or it moves into the library flow that already owns
naming and lifecycle.

---

### D-11 · MINOR · A `role="separator"` that paints nothing

Measured on the live action row:

```
DockSeparator → 1 × 0 px, aria-orientation="vertical", data-orientation="horizontal"
```

Zero height: it is inside a plain `flex items-center` row, not a dock, so nothing stretches it. It is
therefore an invisible boundary that is nonetheless announced to assistive technology, with a
self-contradictory orientation pair. PR-05 zeroes dividers in every workbench; card law 4 keeps a
divider "only when grouping would be ambiguous without it"; §4.1 requires the AT and visual channels
to agree.

**Cure:** delete it. Three controls need no group boundary.

---

### D-12 · MINOR · One interval for four different relations

Measured: `.mix-plate { gap: 12px; padding: 16px }`, inner column `gap: 12px`. Identity→content,
specimen→decoration and decoration→actions are all 12 px. Card law 3 requires a title gap between
header and headline and a section gap between headline and the next semantic section; this plate has
one number and therefore no hierarchy. The label's 18.7 px line box against a 108 px content block at
the same 12 px remove is why `RESULT` reads as an eyebrow rather than an identity line.

---

### D-13 · MINOR · Truthiness gaps leave two unrendered/half-rendered states

```vue
<div v-if="result.type === 'color' && result.css" …>      <!-- line 78 -->
<template v-if="result.type === 'palette' && result.colors">  <!-- line 91 -->
```

`[]` is truthy, and `mixPalettes` returns `[]` for `palettes.length === 0` and for
`resultLength === 0` (`demo/palettes/mix.ts:112-121`). An empty palette result therefore passes the
guard and renders an empty `TransitionGroup`, a strip built from an empty stop list, and an action
row whose Copy emits `""`. Symmetrically, a `color` result with falsy `css` renders a plate with a
label and actions and **no specimen**. Neither state was designed; neither is styled; neither says
anything.

**Reproduction:** NONE — this is a hypothesis. It requires a stored palette with zero colours, which
I did not construct. The code path and the truthiness are facts; the reachability is not proven.
**Cure:** one guard on `colors?.length`, and a designed empty/failed arm that names why there is no
result.

---

### D-14 · MINOR · `:key="i"` makes the declared TransitionGroup inert

`v-for="(color, i) in result.colors" :key="i"` (lines 98-99) inside
`<TransitionGroup name="vj-enter">`. Index keys mean a re-mix producing the same count emits no
enter, no leave and no `vj-enter-move` — the motion is declared and structurally cannot run for the
one case that matters (mixing again). The sibling file solves exactly this with a stable key map
(`MixSourceSelector.vue:76-93`, commented "Stable keys for TransitionGroup"), so the idiom exists in
the same folder and was not used here.

---

### D-15 · MINOR · Dead props, redundant attributes, an unnecessary import — invisible to the gate

- `tag="div"` (lines 67, 81, 100) is not a prop of glass-ui 7's `WatercolorDot` (its prop set is
  `color, variant, animate, cycleDuration, range, seed`) and is silently swallowed. Measured on the
  live dots: `tag === null`.
- `aria-hidden="true"` (line 72) duplicates an attribute the producer hardcodes on every dot — and
  is dropped anyway.
- `TransitionGroup` is imported (line 4) while `Transition` is not (line 60): proof the import is
  unnecessary, since both are compiler-resolved built-ins.
- `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0**. The typecheck gate cannot see any of
  this, because Vue's template checker treats unknown attributes as fallthrough.

This is the "no legacy code" edict's dead-API arm: markup written against a superseded producer API
that now resolves to nothing, kept alive by a gate that cannot fail on it.

---

### D-16 · INFO · Zero visual-audit coverage (see §2.1)

**Cure:** `audit/visual/states.mjs` must drive Mix to `done` and capture both the ghost and the
settled plate in light and dark, desktop and mobile. Until then no `π/DELTA` claim about this
component can cite the matrix.

---

### D-17 · INFO · The code artifact is neither LTR-isolated nor broken at token boundaries

`<span class="text-mono-small text-foreground select-all break-all">{{ result.css }}</span>`
(lines 85-87). §6.1 requires "CSS strings, hex, slugs, IDs and provenance render in LTR-isolated
spans inside RTL prose"; there is no `dir="ltr"` and no `unicode-bidi` isolation. Measured honestly:
for `oklab(0.6 0.1 0.05)` under `dir="rtl"` the glyph order did **not** change (`o` @36.3, `(` @79.4,
`)` @191.4 rtl vs `o` @0, `(` @43.1, `)` @155.1 ltr) — the letter of the law is unmet while this
string form happens to render intact. Separately, `break-all` will split a colour literal mid-number
rather than at a token boundary, which is the wrong wrap mode for a "code-ready" artifact
(`overflow-wrap: anywhere` on a `min-width:0` flex child is the idiomatic form).

---

## 4. Family grouping

| Family | Members | One cure |
|---|---|---|
| **Producer-contract drift** — consumer identity/semantics attached to a glass-ui 7 component that drops fallthrough attrs and props | D-1, D-2, D-15 (and the dead add-slot in `MixSourceSelector`) | own the markup that must carry identity; re-audit every `WatercolorDot` call site against the 7.0.0 prop set; make the gate able to fail |
| **The ghost is not the result** | D-3, D-8, D-4 | the ghost wears the result's shape and count; presence attenuation moves to the specimen tier; the surface stops collapsing |
| **Two design systems in one plate** | D-6, D-11, D-5 | consume `.section-label`, delete the separator, drop `compact` |
| **Decoration outranking data** | D-7, D-12, D-2 | delete the strip, differentiate title vs section gap, render values as text |
| **Action truth** | D-9, D-10, D-13 | one Copy owner with failure + invalidation; Save resolves to durable status; guards on length not truthiness |

## 5. The gestalt cure

This plate is a bounded specimen with an identity, a value, and one action set — the
`Card`/specimen-well grammar the constitution already defines (§2 tier 4, §3.1 "Mix … result/
provenance inspector"). It should be rebuilt as: **producer label** → **specimen** (N wells that
become N dots without moving) → **named values** (mono-small rows, the only truth channel) → **one
action region** (non-compact, named, with failure and durable save status). No strip, no separator,
no whole-plate dimming, no second Copy. Every one of the seventeen findings above is a symptom of the
plate having been composed out of utilities and dropped attributes instead of out of the two
primitives — `section-label` and a named seat — that the design system already ships.

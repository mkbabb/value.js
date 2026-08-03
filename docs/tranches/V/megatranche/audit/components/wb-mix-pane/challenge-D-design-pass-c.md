# CHALLENGE-D — `demo/workbenches/mix/MixPane.vue` — design axis, **pass C**

## Model receipt

I observe myself to be **Opus 5 (1M context)**, model id `claude-opus-5[1m]`, the model this seat
was explicitly spawned with. The seat is declared, not inherited.

- **Axis:** design — visual truth · state coverage · motion · design-system boundary · proportion/seat law
- **Subject:** `demo/workbenches/mix/MixPane.vue` (123 L), composition root of route `/#/mix`
- **Base:** branch `tranche-u`, HEAD `c654824e`; `@mkbabb/glass-ui@7.0.0`
- **Write scope honoured:** only files under
  `docs/tranches/V/megatranche/audit/components/wb-mix-pane/`. No source file was edited; all probe
  scripts and probe frames live outside the repository in the session scratchpad
  (`/private/tmp/claude-504/…/scratchpad/chD-*`).

---

## 0. Relationship to passes A and B — read this first

Two D seats preceded me:

- **pass A** — `./challenge-D-design-pass-a.md` (45 178 B), verdict DEFECTIVE, register D-1…D-27.
- **pass B** — was occupying `challenge-D-design.md`; I preserved it **verbatim, byte-identical
  (25 447 B)** at `./challenge-D-design-pass-b.md` before writing this file. Register DB-1…DB-5 +
  DB-C1. Its own §0 already preserved pass A the same way.

I completed an independent measurement pass before reading either. **Neither is superseded.**
This document is pass C and carries only what a third, independently-instrumented pass changed:

| | count |
|---|---|
| **new BLOCKER** neither prior pass found | 2 |
| **new MAJOR** | 3 |
| **corrections** — a prior row's *mechanism* is falsified by measurement | 2 |
| **independent confirmations** of prior rows, re-derived cold | 7 |
| **negative proofs** — hypotheses I raised and disproved | 3 |

**Consolidated verdict: DEFECTIVE — now 6 BLOCKER** (pass A's three, pass B's DB-1, plus DC-1 and
DC-2 below).

### Why pass C found anything: a state-matrix gap, not a probe-method gap

Pass B's advance over A was *mode* coverage (it drove Palettes mode by pointer, which A's
`addColor` injection never entered). Pass C's advance is **viewport and state** coverage.

`docs/tranches/V/megatranche/audit/visual/states.mjs:18` restricts every state matrix —
`zoom-200-desktop`, `reduced-motion-desktop`, `forced-colors-desktop`, `rtl-desktop`, `rtl-mobile`,
`keyboard-focus-desktop` — to `["#/", "#/gradient", "#/browse", "#/blob", "#/admin/users"]`.

> **`/#/mix` has never been captured in any of those six states.** Passes A and B both measured
> at 1440 × 900 desktop only.

I drove `/#/mix` at iPhone 14 (390 × 664), at 720 × 450 @ DPR 2 (the harness's own WCAG-1.4.4
convention, `states.mjs:21`), under `reducedMotion: "reduce"`, under `forcedColors: "active"` in
Chromium, and under `dir="rtl"`. DC-1 lives in the mobile and zoom arms; DC-2 lives in a
*producer-contract* read that no prior pass performed. Two of the three confirmations that matter
came out different from the prior mechanism attribution.

---

## 1. Method

Live dev server `http://localhost:9000`, read-only, five Playwright probes:

| probe | engine · context | what it decided |
|---|---|---|
| `chD-mixpane-probe.mjs` | WebKit 1440×900 ×2 schemes, iPhone 14, `reducedMotion`, RTL, 720×450@2 | ratio, dead space, canvas, tab walk |
| `chD-mix-dom.mjs` | WebKit 1440×900 | the shipped `outerHTML` of `.dashed-well` |
| `chD-mix-func.mjs` | WebKit 1440×900, localStorage-seeded palettes | reachability of both add paths; `[data-mix-target]`; settled plate |
| `chD-mix-final.mjs` | WebKit + Chromium `forcedColors`, 720×450@2 | disabled-verb semantics, label registers, nesting, keyboard reach |
| `chD-mix-rm.mjs` | WebKit `reducedMotion` + iPhone 14, seeded | reduced-motion timing; the mobile settled result |

Producer contract read directly from `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` and
`dist/components/watercolor-dot/WatercolorDot.vue.d.ts` — the step that decides DC-2.

Palette seeding used the app's own store key (`demo/palettes/usePaletteStore.ts:6`,
`"color-palettes"`) via `addInitScript`, so the seats and cards are the real components with real
data, not injected component state.

---

## 2. New BLOCKERs

### DC-1 · BLOCKER · Mobile and 200 % zoom: the committed result renders outside every scrollable extent

Pass B's DB-1 found the desktop Palettes-mode instance (result 317 px below the card fold,
`scrollTop` 0). The mobile and reflow arms are **worse and structurally different**: on desktop the
card *could* be scrolled by the user; on mobile and at 200 % zoom **the document itself does not
scroll**, so there is no gesture that reveals the result.

Measured — WebKit, iPhone 14 (390 × 664 CSS), Palettes mode, two operands, `Mix` pressed, settled
2.2 s:

```
before mix : card.scrollHeight 607 / clientHeight 550
             document.scrollHeight 664  ===  innerHeight 664
after  mix : card.scrollHeight 791 / clientHeight 550 ; card.scrollTop 0
             document.scrollHeight 664  ===  innerHeight 664      ← document is inert
             plate.bottom − card.bottom = +223.8 px
```

`document.scrollHeight === innerHeight` is the load-bearing number: the page has **no** overflow to
scroll, because all 241 px of overflow is trapped inside the card's own `overflow-y-auto` box, and
`scrollTop` stays 0 after settle. Visual confirmation: scratchpad `chD-mix-mobile-settled.png`,
captured with `fullPage: true` — the RESULT well is sheared off at the card's bottom edge and the
full-page capture does not contain it.

Same trap in the reflow arm, 720 × 450 @ DPR 2 (`states.mjs:21`: "200% zoom simulated as
half-viewport at 2× DPR — WCAG 1.4.4 reflow"):

```
document.scrollHeight 450  ===  innerHeight 450
card.scrollHeight 426 / clientHeight 336        ← 90 px of content trapped, document inert
overflowX 0
```

Cause is one line — `MixPane.vue:62`:

```vue
<Card tier="resting" class="relative pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

`h-full` + `overflow-y-auto` makes the pane its own scroll container instead of contributing to
document flow. `VISUAL-CONSTITUTION.md:32` (§3 law 6) is explicit:

> "Mobile uses one **document-scrolling** stage→inspector→action sequence beneath the same top
> dock."

Compounding it, the template order at `MixPane.vue:78-119` is **rack → controls → result**, while
`VISUAL-CONSTITUTION.md:48` binds Mix's mobile order to **"operand rack, result, controls"**. The
shipped order puts the outcome furthest from the verb, at the bottom of a box that cannot be
reached.

**Reproduction.** iPhone 14 context (or any viewport ≤ 664 px tall) → `/#/mix` → Palettes tab →
select two palettes → Mix → wait 2 s. `document.scrollHeight === innerHeight`, `card.scrollTop === 0`,
`.mix-plate` bottom is 223.8 px past the card's visible bottom.
**Mechanism.** *The pane is its own scroll box.* Same missing-region-model family as pass A's D-1
and pass B's DB-1, but this arm cannot be papered over by user scrolling — it is a WCAG 1.4.4
reflow failure and a mobile-order canon failure at once.
**Cure.** The Card sheds `h-full overflow-y-auto` and content-hugs; the document scrolls (which
the shell is already prepared for — `document.scrollHeight` equals `innerHeight` only because
nothing is allowed to overflow it). Re-sequence to rack → result → controls per canon, which also
places the outcome adjacent to the operands that produced it. Under pass A's D-1 chassis cure the
result becomes `#inspector` and this dissolves; **but the mobile/zoom arm must be part of that
cure's π, or the chassis will be built with the same inner-scroller habit.**

---

### DC-2 · BLOCKER · The convergence choreography has no destination — `[data-mix-target]` is never in the DOM

Neither prior pass tested for the anchor. Measured, mid-mix (Palettes mode, two operands, 1440 × 900,
sampled 320 ms after clicking Mix):

```
midMix.ghost:                true       ← the ghost plate mounted
midMix.targetAnchorPresent:  false      ← document.querySelector("[data-mix-target]")
```

`MixResultDisplay.vue:63-73` believes it is placing that anchor:

```vue
<WatercolorDot :color="wellColor" variant="ghost" tag="div"
               seed="mix-result" data-mix-target class="shrink-0" … />
```

It is not. `mixStage.ts:120-123` therefore always takes its fallback branch:

```ts
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl ? layoutCenter(targetEl, root)
    : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

**Visual proof:** scratchpad `chD-mix-midmix.png`. The pigment drops are suspended *inside the
"Ocean" operand card* around y ≈ 600-680, converging on an invented point, while the ghost well
they were designed to land in sits ~400 px lower at y ≈ 1090. On the operand card they read as
smudges — a rendering artefact, not a designed motion.

Every design claim the component makes about itself is false in the shipped build:

- `MixPane.vue:63-66` — "drops from the selected chips arc **to the result plate's awaiting well**"
- `MixPane.vue:107-110` — "the **announced destination the convergence lands on**"
- `MixResultDisplay.vue:14-18` — "the silhouette the pigment poured into **is** the silhouette the
  result wears"

Note the asymmetry that makes this a *design* defect rather than an accident: the **source**
anchors work. `MixSourceSelector.vue:130-132` puts `data-mix-source` / `data-mix-color` on a plain
wrapper `<div>`, and `mixStage.ts:129` finds them (measured `sources: 2`). Only the **target** was
hung on a `WatercolorDot`. The same feature got the same idea right at one end and wrong at the
other.

**Root cause** — the producer contract, read directly. `@mkbabb/glass-ui@7.0.0`'s `WatercolorDot`
declares exactly `{ color, variant, animate, cycleDuration, range, seed }`
(`dist/components/watercolor-dot/WatercolorDot.vue.d.ts`), and its compiled render function is:

```js
inheritAttrs: !1,                       // every consumer attr and listener is dropped
…
return (t, n) => (d(), o("span", {      // root tag hard-coded "span"
  "aria-hidden": "true",                // hard-coded
  class: l([c.value, "watercolor-swatch", …]),          // only attrs.class is read
  style: u([f.value, { …, pointerEvents: "none", … }])  // only attrs.style is read
}, [ /* filter host svg, ghost-stroke span — NO renderSlot */ ]))
```

— `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`

This is `VISUAL-CONSTITUTION.md:91` shipped:

> V **abrogates a selection outline and interactive host on `WatercolorDot`**… the organic face
> supplies color/specimen identity only. Selection, activation, drag and keyboard focus belong to a
> named enclosing geometric button/seat.

`inheritAttrs: false` + class/style-only consumption is the mechanical enforcement. Every
`tag`, `aria-label`, `title`, `disabled`, `@click` and `data-*` this feature passes to a
`WatercolorDot` — **eight call sites** — is discarded, silently, with `vue-tsc` green, because Vue
does not type-check fallthrough attrs.

**Reproduction.** `/#/mix` → Palettes tab → select two palettes → Mix → within 900 ms evaluate
`!!document.querySelector("[data-mix-target]")` → `false`.
**Mechanism.** *A DOM contract expressed through a component that discards DOM contracts.*
**Cure.** Move `data-mix-target` onto the `<div>` that already wraps the ghost dot
(`MixResultDisplay.vue:63`) — the exact construction the source side already uses. That is a
one-line consistency repair; the *asymmetry* is the design defect. Then, as the general cure, every
`WatercolorDot` in this feature becomes a face **inside** a named geometric seat that owns
name / state / anchors / focus.

---

## 3. New MAJORs

### DC-3 · MAJOR · The pane's declared dock action set is structurally unreachable — there is no `Clear` at all

This **corrects the mechanism** of pass A's D-8 (confirmed at pass B §4), which states that the
Dock "routes to the silent one (`usePaneRouter.ts:222`)". It does not route to it. It cannot reach
it.

`demo/shell/dock/Dock.vue:156-157`:

```vue
<ActionBarLayer   v-if="actionBar"      … />
<GenericActionBar v-else-if="genericBar" … />
```

`actionBar` is the **picker's** context (`App.vue:38` — `colorPickerRef?.actionBarContext`).
`viewSchema.ts:142-152` gives view `mix` `left: "color-picker"`, so on `/#/mix` the picker is
always mounted, `actionBar` is always truthy, and the `v-else-if` **can never fire**. The mix action
set declared at `usePaneRouter.ts:216-224` (`Clear` / `Mix` / `Copy result`) is dead configuration.

Measured, WebKit 1440 × 900, `/#/mix`, after clicking `Toggle action bar` — the rendered dock
buttons are:

```
Reset color · Copy color · Random color · Palettes · Extract palette · Open color input
```

No `Clear`. No `Copy result`. Frame: scratchpad `chD-mix-dock-tools.png` — the Tools row shows the
Picker toolset (back · undo · copy · dice · palette · camera · T).

Consequences, all of which prior passes recorded as separate rows without the common cause:

1. **There is no way to clear the operand rack.** `clearSelection()` (`useMixingState.ts:113-117`)
   has no reachable trigger. The plate's `Reset` (`MixResultDisplay.vue:136-142`) calls `reset()`,
   which clears only the *result* (`:108-111`). Two similarly-named destructive verbs, different
   scopes, one of them unreachable, neither confirmed.
2. `MixPane.vue:57` `defineExpose({ clearSelection, startMix, copyResult })` is dead surface.
3. `MixPane.vue:12,49-55` — `writeClipboard` and `copyResult()` — is **dead code**, not a
   "second live path". Pass A D-8's *observation* (two clipboard implementations) is right; its
   *mechanism* (the dock uses the silent one) is wrong. The cure changes accordingly: delete
   `copyResult` and the `writeClipboard` import outright rather than reconciling two live paths.

Owner edicts 2 (no dead/dual paths) and 3 (KISS).

**Reproduction.** `/#/mix` at 1440 × 900 → click `Tools` → enumerate the rendered dock buttons.
**Mechanism.** *A `v-if`/`v-else-if` pair whose first arm is unconditionally satisfied on this
route.* Generate and Gradient escape it only because their `VIEW_MAP` rows do not put the picker in
the left slot.

---

### DC-4 · MAJOR · Protagonist inversion, quantified: the operands outshout the result ≈ 7.6 : 1

Prior passes noted proportion failures at the *pane* level (dead acreage, 50/50 split). Inside the
pane the hierarchy is inverted, and the number is decisive. Measured, Palettes mode, settled,
1440 × 900:

| element | measured geometry | painted area |
|---|---|---|
| operand seat × 2 (`button[aria-label^="Select palette"]`) | 462 × 100 each, full-bleed saturated strip + double ring | 92 400 px² |
| result dots × 3 | 40 × 40 each | 4 800 px² |
| result gradient strip (`MixResultDisplay.vue:109-116`) | 462 × 16 | 7 392 px² |
| **result total** | | **12 192 px²** |

**7.58 : 1 against the outcome**, and the chroma gap is larger than the area gap: the operands are
full-saturation `#ff5f6d`/`#2193b0` strips; the result is three desaturated 40 px dots on a beige
well. Each operand additionally carries a live `…` "Palette menu" control which, in
`chD-mix-mobile-settled.png`, is the single largest circular element on the pane. **The object the
pane exists to produce is its smallest and palest.**

`VISUAL-CONSTITUTION.md:34` (§3 law 8): *"One pane may have one full-strength visual protagonist.
Supporting fixtures do not compete with it through equal size or equal shadow."*
`:202` (§7 Mix): *"An ordered N-operand rack … converges through **one trough into one result**."*

**Cure.** Under the chassis cure the result is `#inspector` and the rack is `#stage`; the ratio
inverts by construction. Independently of housing, the result plate must gain the specimen scale
the canon gives every other workbench outcome — this is the same PR-09/PR-10 mechanism ("protagonist
subordinated") applied to Mix, which the register does not currently carry a row for.

---

### DC-5 · MAJOR · Two in-plate wells at the identical material tone, two unrelated hand-rolled recipes

Measured computed styles, 1440 × 900:

| | `.dashed-well` (`demo/styles/utils.css:90-110`) | `.mix-plate` (`MixResultDisplay.vue:55`) |
|---|---|---|
| background | `oklab(0.913299 0.005463 0.013024)` | `oklab(0.913299 0.005463 0.013024)` — **identical** |
| border-radius | `16px` (= `var(--radius-card)`; measured `--radius-card: 1rem`) | `12px` (Tailwind `rounded-xl`, hard number) |
| border | `1.5px dashed var(--card-edge)` | none |
| box-shadow | `var(--shadow-cartoon-sm)` | `none` |
| padding | `12px` | `16px` |

Two fixtures, same tier, same tone, same job (an in-plate well collecting a set of swatches),
authored by two unrelated recipes — one a house token class, one a per-instance Tailwind string.
The radius divergence is not rounding: `--radius-card` measures `1rem` = 16 px and the plate
hard-codes 12.

`VISUAL-CONSTITUTION.md:19` (§2): *"One surface has one tier."* Owner edict 5: style at the root,
never per-instance. `demo/styles/utils.css:86-88` records that `.dashed-well` was minted precisely
because two sites had used it as an undefined phantom — the same consolidation was never extended
to the result plate, which is its sibling.

**Cure.** `.mix-plate` consumes the same well recipe (a `--well-*` family with a `dashed`/`solid`
edge modifier), so the two in-progress/settled wells read as one grammar at two states rather than
two grammars.

---

## 4. Independent confirmations, re-derived cold

Measured before reading either prior report. All seven agree.

| prior row | pass-C independent measurement | verdict |
|---|---|---|
| A D-1 · housing declined | `MixPane.vue:3,62` uses `Card`. `VISUAL-CONSTITUTION.md:48` gives Mix *"its own `InstrumentChassis` composition"*; `:38` — *"`Card` … is **never the default page primitive**"*. | **CONFIRMED** |
| A · equal split | `.pane-wrapper--left {x:199, w:512}`, `--right {x:729, w:512}` → **ratio 50.000 %** exactly. `VISUAL-CONSTITUTION.md:27` admits only 61.8033989 % or 66.6666667 %. | **CONFIRMED** |
| A D-4 · dead acreage | 1440 × 900 boot: `card.h 684.7`, `lastContentBottom 537.7` → **294.5 px dead = 43.0 %** of the card. `VISUAL-CONSTITUTION.md:28` caps empty secondary at ≤ 15 %; `PROPORTION-AUDIT.md:48` (PR-04) says REMOVE. | **CONFIRMED** |
| A D-5 · Colors mode is a dead end | `addSlotTag "span"` · `pointerEvents "none"` · `aria-hidden "true"` · `aria-label null` · `hasPlusIcon false` · `focusables inside .dashed-well: 0` · `elementFromPoint` at the slot centre → `div.swatch-row`. A real `page.mouse.click()` at its centre: `chipCount 0 → 0`, `mixDisabled true → true`. Seeded-palette "From palettes" swatches identical (`tag:"span", pe:"none", ariaLabel:null, title:null`); click → `chipCount 0`. | **CONFIRMED** (both add paths) |
| B DB-2 · nested `<button>` | Seat `"Select palette Sunset"` (462 × 100) reports `nestedButtons: 1`, `nestedLabels: ["Palette menu"]`. Both operand seats. | **CONFIRMED** |
| B DB-3 · three label species | Computed: `Selected` = **Fraunces 16.40 px w600** sentence-case; `.section-label` = **Fira Code 14.384 px uppercase ls 1.4384 px**; `Result` = **Fraunces 14.384 px w700 uppercase ls 0.3596 px**. `VISUAL-CONSTITUTION.md:75` mandates `text-small` / Plus Jakarta Sans / **non-bold** — used zero times. | **CONFIRMED** |
| B DB-5 · 28 px action seats | Post-settle `DockControl` rects: `28×28`, `28×28`, `28×28` (`Copy color`, `Save to palettes`, `Reset`). Names carried only by `title`. `PROPORTION-AUDIT.md:56,72`. | **CONFIRMED** |

Two further structural confirmations of pass A rows, re-derived:

- **No reorder, on a rack the canon calls ORDERED.** `MixSourceSelector.vue:25-31` emits only
  `update:mode | addColor | removeColor | addPalette | removePalette`.
  `VISUAL-CONSTITUTION.md:202` requires *"add/remove/**reorder**"*; `:131` (§5.2) binds operand
  reorder to Space-grab / arrow-move / Home-End with `position of total` announcement. Order is
  consumed by the math (`useMixingState.ts:86-89`, `mixColorSequence`). **Keyboard reach measured in
  Chromium** (the honest engine per `states.mjs:6-9` — macOS ships Full Keyboard Access off, so
  WebKit under-reports): 26 Tab presses yield exactly **four** stops inside the pane —
  `Colors`, `From palettes`, `Color space`, `Hue method`. **Zero of them is an operand.**
- **Provenance is modelled, then rendered nowhere.** `useMixingState.ts:25-28` records
  `SelectedColor.source` (`"picker"` or a palette name); it is routed to exactly one place —
  `:title` on a `WatercolorDot` at `MixSourceSelector.vue:150` — measured `title: null`. The result
  plate emits **no text at all** for a palette mix (measured `plateText: "RESULT"`, `dotSizes
  ["40x40","40x40","40x40"]`): no operand names, no space, no arc, no CSS values. The Copy control
  copies a string the user has never seen. `VISUAL-CONSTITUTION.md:202` lists `provenance` as a
  required member of Mix's control grammar.

Also newly measured on the disabled-verb row (sharpening pass A's "no failure arm"): the resting
`Mix` button reports `disabled true`, `aria-disabled null`, `opacity 0.5`, `cursor not-allowed`,
`pointer-events none`, `title null`, `aria-label null`, and there is **no** `[role=status]` or
`[aria-live]` anywhere in the pane. The pane's *complete* resting text content is:

```
Mix | Mix colors and palettes together. | Colors | Palettes | Selected | COLOR SPACE | OKLab | HUE METHOD | Shorter | Mix
```

No instruction exists anywhere. And the asymmetry is internal: **Palettes mode ships a full
`EmptyState`** with eyebrow / message / hint (`MixSourceSelector.vue:239-244`) while the **default
Colors mode ships nothing at all**. `VISUAL-CONSTITUTION.md:83`: *"Selected, failed, pending,
withdrawn and **disabled** states are never color-only."*

Finally, `REPORT.json` reports `counts.h1: 0` for `/#/mix` in **all four** Safari matrices; the
only heading in the pane is `H3:Mix` (`PaneHeader.vue` renders `<h3 class="pane-header-title">`).
A display-sized `h3` with no `h1`/`h2` above it is a two-level skip on a route canon requires to
have exactly one H1 (`VISUAL-CONSTITUTION.md:85`).

---

## 5. Corrections to prior passes

### DC-C1 · pass A **D-8's mechanism is falsified** — the dock does not route to the silent Copy

Recorded in full at **DC-3**. The *observation* (two clipboard implementations) stands; the
*mechanism* ("Dock routes to the silent one") does not. `Dock.vue:156-157`'s `v-else-if` cannot
fire on `/#/mix`, measured. Disposition changes from "reconcile two live paths" to "delete the
dead one, and give `Clear` a reachable home".

### DC-C2 · pass B **DB-1 is narrower than the defect** — the desktop arm is the recoverable one

DB-1 measures the desktop Palettes-mode instance (317 px below the card fold, `scrollTop` 0). On
desktop the user *can* scroll the card. **On mobile and at 200 % zoom no gesture recovers it**,
because `document.scrollHeight === innerHeight` and all overflow is trapped in the card
(**DC-1**, measured). DB-1's cure ("do not add `scrollIntoView`; the chassis `#inspector` dissolves
it") remains right, but its π must include the mobile and reflow arms or the chassis will inherit
the inner-scroller habit. This also re-scopes pass B's own DB-C1: `overflow-y-auto` is not merely
"load-bearing on this route" — it is the mechanism of a WCAG 1.4.4 reflow failure, and the cure is
to remove the inner scroller *and* let the document flow, not to keep it.

---

## 6. Negative proofs — hypotheses I raised and disproved

Recorded so no later seat re-litigates them.

1. **`prefers-reduced-motion` is correctly and thoughtfully honoured.** Sampled at **t + 120 ms**
   after `Mix`, WebKit 1440 × 900, `reducedMotion: "reduce"`, Palettes mode, two operands:
   `{ ghost: false, plate: true }` — the narration window is skipped entirely and the plate inks
   immediately. Source: `useMixingAnimation.ts:70-72` gates on
   `useBreakpoint("(prefers-reduced-motion: reduce)")`; `:120-125` fires `onSettled()` synchronously
   without arming the loop. `respectReducedMotion: false` on the host (`:113`) is *deliberately*
   correct and its docstring (`:29-36`) says why — a paused loop would strand the phase machine
   mid-mix. This is the best-reasoned code in the feature and must survive any cure.
2. **Motion is fully tokenised; nothing layout-forcing animates.** Both `<Transition>`s key
   `vj-morph` (`MixPane.vue:111`, `MixResultDisplay.vue:60`); both `<TransitionGroup>`s key
   `vj-enter` (`MixSourceSelector.vue:121`, `MixResultDisplay.vue:93`) — two of the three named
   families in `demo/styles/animations.css:82-137`, driven by `--duration-*` / `--spring-*` /
   `--ease-*`. No fourth family name (the R.W4 gate), no bespoke `@keyframes` in any of the four
   files. The only scoped transition is `.mix-plate { transition: opacity var(--duration-fast)
   var(--ease-standard); }` (`MixResultDisplay.vue:152-157`) — opacity alone. `vj-morph` does list
   `max-height`, but it is opt-in via `--vj-morph-collapse`/`--vj-morph-expanded`, both unset at
   every Mix site, so it resolves to `none` and interpolates nothing. (Agrees with pass B's
   negative proof #2, re-derived independently.)
3. **RTL mirrors cleanly; nothing is physically pinned.** `dir="rtl"` applied post-load (the
   `states.mjs:5-6` correction): left pane `x 199 → 729`, right pane `x 729 → 199`, `.dashed-well`
   `x 754 → 224`; widths unchanged (512 / 512 / 462); `overflowX 0`. Logical properties are doing
   their job.

Additionally re-verified sound:

- **No horizontal overflow anywhere.** `REPORT.json` `overflowX: 0` for `/#/mix` across all four
  Safari matrices; my own probes measured `0` at 1440 × 900 LTR, 1440 × 900 RTL, and 720 × 450 @ 2×.
- **Zero runtime errors.** `pageErrors: []`, `consoleErrors: []`, `failedRequests: []` for `/#/mix`
  in all four matrices; none in any of my five probes either. **Every defect above is silent** —
  which is precisely why they reached HEAD.
- **Forced colors does not erase the tray.** Chromium `forcedColors: "active"`: `.dashed-well`
  computes `border-color rgb(0,0,0) dashed`, `background rgb(255,255,255)`. (The add slot's
  `color(srgb 1.51 0.56 0.78 / 0.12)` does not adapt, but that is the DC-2 family's fault, not a
  separate forced-colors row.)
- **`verbatimModuleSyntax` clean** — `MixPane.vue:13`, `MixSourceSelector.vue:10-11`,
  `MixConfigBar.vue:12-15`, `MixResultDisplay.vue:7`, `MixAnimationCanvas.vue:3-6`,
  `useMixingAnimation.ts:40,43-46` all use `import type`.
- **Vue 3.5 idioms present and correct** — reactive props destructure at
  `MixSourceSelector.vue:13-23`, `MixConfigBar.vue:25-45`, `MixResultDisplay.vue:20-23`,
  `MixAnimationCanvas.vue:8-13`; `useTemplateRef` at `MixAnimationCanvas.vue:18`;
  `toRef(() => prop)` bridging at `:20-23`.
- **Not a god module.** `MixPane.vue` is 123 lines, four children, one composable, one injected
  port. The decomposition is genuinely good; owner edict 1 is satisfied.
- **The state machine is honest.** `useMixingState.ts` owns no timers; `mixing → done` advances only
  on the canvas completion event (`:103-106`) with a re-entry guard (`:83`). The ONE-CLOCK law it
  documents is the law it implements.

---

## 7. Minor rows pass C adds

| id | severity | finding | evidence |
|---|---|---|---|
| **DC-6** | MINOR | Redundant wrapper: `MixPane.vue:61`'s `<div class="relative w-full mx-auto h-full min-w-0">` duplicates its only child's `relative w-full min-w-0 h-full` and adds a no-op `mx-auto`. The canvas it appears to exist for is a child of the **Card**, so the Card's own `relative` is its containing block. Owner edict 3. | `MixPane.vue:61-62`; `MixAnimationCanvas.vue:32` (`absolute inset-0`) |
| **DC-7** | MINOR | Dead import: `computed` imported and never used. | `MixPane.vue:2`; `grep -c computed MixPane.vue` → 1, line 2 only |
| **DC-8** | MINOR | Per-instance geometry on glass roots, **under a comment forbidding it**: `MixConfigBar.vue:158-161` reads "*consumed at the root vocabulary, never a per-instance costume*", and `:162-166` applies `class="h-10 gap-2 font-medium font-display"` to the `Button` root. Same file `:100,:123,:147` — `class="h-9"` on three `SelectTrigger` roots. Owner edict 5. | `MixConfigBar.vue:100,123,147,158-166` |
| **DC-9** | INFO | Opaque selection halo over translucent glass: `MixSourceSelector.vue:259`'s `ring-offset-background` paints an opaque `--background` band between ring and card, and the wrapped `PaletteCard` already carries its own edge → **three concentric borders** on a selected operand (visible, scratchpad `chD-mix-palettes-selected.png`). With selection spending two channels, `VISUAL-CONSTITUTION.md:84`'s "focus remains visibly distinct from selection" has nowhere left to go. Pairs with pass B's negative proof #1 — the ring *paints* (that proof stands); the objection here is that it paints **twice**. | `MixSourceSelector.vue:256-261`; frame |

DC-6 and DC-7 independently reconfirm pass A's D-24.

---

## 8. Consolidated register delta (pass C)

| id | severity | finding | disposition |
|---|---|---|---|
| **DC-1** | **BLOCKER** | Mobile + 200 % zoom: result outside every scrollable extent; `document.scrollHeight === innerHeight`; +223.8 px past the card fold | new — joins pass A step 1; its π **must** carry the 390 px and 720×450@2 arms |
| **DC-2** | **BLOCKER** | `[data-mix-target]` never reaches the DOM; the convergence lands on an invented point | new — move the anchor to the wrapper `div`; then the general seat cure |
| **DC-3** | MAJOR | The mix dock action set can never render; `Clear` does not exist; `copyResult` is dead code | new — corrects A D-8's mechanism |
| **DC-4** | MAJOR | Protagonist inversion measured 7.58 : 1 against the result | new — quantifies the §3 law 8 breach inside the pane |
| **DC-5** | MAJOR | Two in-plate wells, identical tone, two hand-rolled recipes (16 px/12 px, dashed/none, cartoon/none, 12 px/16 px) | new — one well recipe with an edge modifier |
| **DC-6** | MINOR | Redundant `relative` wrapper | reconfirms A D-24 |
| **DC-7** | MINOR | Unused `computed` import | reconfirms A D-24 |
| **DC-8** | MINOR | Four per-instance geometry overrides on glass roots | new site for the edict-5 sweep |
| **DC-9** | INFO | Three concentric selection borders; opaque ring-offset over glass | new |
| **DC-C1** | — | A **D-8 mechanism falsified**: the dock cannot reach the mix action set | delete dead path; rehome `Clear` |
| **DC-C2** | — | B **DB-1 narrowed**: desktop is the recoverable arm; mobile/zoom is not | widen DB-1's π; do not preserve the inner scroller |

**Mechanism families — pass A's taxonomy holds; pass C's rows slot in:**

| family (pass A) | pass-C additions |
|---|---|
| **A · the housing was declined** | **DC-1**, DC-4, DC-C2 |
| **B · states that were never designed** | (Colors-mode empty state, folded into A D-5) |
| **C · one idea, two implementations** | DC-5, DC-8 |
| **D · the canon contract never wired** | **DC-2**, DC-3, DC-C1 |
| **E · rendered truth vs token intent** | DC-9 |

Family **D** is now the heavier one. Pass A framed it as unwired canon; pass C shows the sharper
version: **three separate contracts in this feature are expressed through channels that silently
discard them** — attrs through an `inheritAttrs: false` producer (DC-2, A D-5), a dock action set
through a `v-else-if` that never fires (DC-3), and provenance through a `title` that is dropped.
None of the three produces a type error, a console warning, a failed request or a visual diff in
any captured frame.

---

## 9. Strongest single defect

**A D-5 / DC-2, one mechanism, stated at its widest: the design placed its load-bearing behaviour —
activation, accessible naming, disabled state, and a layout anchor — on `WatercolorDot`, a producer
primitive the project's own constitution had already declared decorative and which enforces that
declaration with `inheritAttrs: false`, a hard-coded `<span aria-hidden="true">` root, inline
`pointer-events: none`, and no slot.**

The consequence at the entry end is that `/#/mix`'s **default mode cannot be used at all** — both
add paths are inert, measured, with a real mouse click leaving the rack empty and the verb
permanently disabled. The consequence at the exit end is that the pane's signature convergence
**has no destination** and lands on an invented point inside an operand card.

The design failure here is not sloppiness — nearly every mechanism in this feature is well reasoned
and well documented in its own comments, and its reduced-motion handling is exemplary. What failed
is the **seam**. And the finding behind the finding is this: **no gate this project owns can see
the difference between a working `WatercolorDot` consumer and an inert one.** `vue-tsc` is green,
vitest is green, the console is clean, and the screenshot harness photographs a dead end and reports
zero defects. That is what the mega-tranche should carry forward from this seat.

---

## 10. Evidence index (pass C)

| artefact | proves |
|---|---|
| scratchpad `chD-mix-midmix.png` | DC-2 — drops suspended inside the Ocean operand card, ghost well ~400 px below |
| scratchpad `chD-mix-mobile-settled.png` | DC-1 — full-page mobile capture with the RESULT well sheared at the card edge |
| scratchpad `chD-mix-settled.png` | DC-4 — the settled desktop plate against the operand cards |
| scratchpad `chD-mix-palettes-selected.png` | DC-9, DC-4 — three concentric selection edges; operand chroma mass |
| scratchpad `chD-mix-dock-tools.png` | DC-3 — the Tools row on `/#/mix` renders the Picker toolset |
| scratchpad `chD-mix{-func,-final,-rm,pane-probe}.json` | every inline measurement above |
| `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` + `.d.ts` | the producer contract behind DC-2 and A D-5 |
| `./challenge-D-design-pass-a.md`, `./challenge-D-design-pass-b.md` | passes A and B preserved verbatim, unmodified |

Probe scripts are session-scratchpad artefacts outside the repository by write-scope law; every
number above is reproducible from the recipe stated with it against `http://localhost:9000`.

**No source edits land from this formation.** This report is the finding of record.

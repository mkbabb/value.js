# CHALLENGE-D — `demo/shell/dock/ActionBarToggle.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context), the tier this seat was spawned
with. Declared, not inherited.

---

## 0 · Verdict

**DEFECTIVE.** Fifteen findings, two BLOCKER.

The component's premise is sound — a dock control whose presence is conditional needs a presence
grammar. Its execution fails on the axis it was built to defend. Three separate mechanisms in this
159-line file are **documented as landed and are measurably dead or false**:

1. the T-29 settle-stamp releases the clip on the non-PRM path only; under
   `prefers-reduced-motion: reduce` the clip **never comes back after one route round-trip**, and the
   hover amputation the component exists to cure returns permanently (reproduced, §D-01);
2. the T-36 "true-button box-model" writes a producer token that **a two-class producer rule
   structurally outranks** — the padding never applies, the control is 32px where the file asserts
   40px, and forcing the padding by hand yields exactly 40px (§D-03);
3. the file's PRM reasoning — *"the global guard shortens transitions to 0.01ms, never removes
   them"* (`:29-30`) — is true of `demo/styles/animations.css` and **false of glass-ui's own
   `a11y-overrides.css`**, which replaces the property list wholesale.

Beyond the machine: the control's only visual identity is a per-instance accent ink that **fails
WCAG AA in light (4.04:1, measured twice by independent methods) and evaporates in dark**, and the
producer already ships the exact primitive the component hand-rolled — `DockControl shape="tab"`,
whose own typing calls it *"auto-sized text-tab control"*.

---

## 1 · Method and evidence base

| ID | What | Where |
|---|---|---|
| E-1 | Source read at HEAD `c654824e` | `demo/shell/dock/ActionBarToggle.vue` (159 lines), `Dock.vue`, `demo/shell/usePaneRouter.ts:186-231` |
| E-2 | Producer read | `@mkbabb/glass-ui@7.0.0` — `dist/components/dock/DockControl.vue.d.ts`, `dist/components/dock/styles/controls/{icon-button,tab-button,triggers,touch-floor}.css`, `dist/styles/utilities/a11y-overrides.css` |
| E-3 | Tranche canon | `docs/tranches/V/{VISUAL-CONSTITUTION,PROPORTION-AUDIT,PALETTE-CONTRACT}.md` |
| E-4 | Existing Safari matrix | `../../visual/REPORT.json`, `../../visual/shots/{safari-desktop-light,zoom-200-desktop,forced-colors-desktop,rtl-desktop}/gradient.png` |
| E-5 | **Live probe 1** — rest/hover/focus/active/absent/zoom-200/forced-colors/PRM/mobile/dark, Chromium, `localhost:9000` | `abt-probe.mjs` → `abt-probe-cr.json` (colocated) |
| E-6 | **Live probe 2** — PRM route round-trip, cascade origin, sibling rungs, clean focus-visible | `abt-probe2.mjs` → `abt-probe2.json` (colocated) |
| E-7 | **CDP matched-styles** — `CSS.getMatchedStylesForNode` on the Tools button | `abt-pad3.mjs` (colocated) |
| E-8 | Rendered crops taken by this seat | `abt-cr-dock-rest.png`, `abt-cr-dock-dark.png`, `abt-focus.png`, `abt-prm-rearrival-hover.png` |

Contrast is measured two ways and cross-checked: (a) the rendered PNG crop is decoded to RGBA and the
2nd/98th luminance percentiles taken as ink/paper; (b) the computed `oklch()` is converted to sRGB
analytically. Light label: **pixel 4.04, analytic 4.05** — agreement to 0.01.

**Routes this component renders on.** `ActionBarToggle` is mounted unconditionally by `Dock.vue:182`
on **every** route. `visible` is true only where an action bar exists: `/#/generate`, `/#/gradient`,
`/#/mix` (`usePaneRouter.ts:191,203,215`) and `/#/` (picker, `ColorPicker.vue:315`). On the other
**eleven** of fifteen routes it is present-but-invisible — see D-06.

---

## 2 · Visual truth first

### 2.1 What is actually on screen

`abt-cr-dock-rest.png` (1440×900, light, `/#/gradient`, 2× DPR, taken by this seat):

```
[ 🌈 Gradient ⌄ ] │ [ 🖌 Tools → ] │ ( ⇥ Login ) │ ( @mbabb )
```

Three material treatments sit in one 492.6px pill:

| Seat | Plate at rest | Ink | Height |
|---|---|---|---|
| `Select view` | none (bare trigger + chevron) | neutral `srgb 0 0 0 / .8` | 32px |
| **`Toggle action bar`** | **none** | **`oklch(.471 .188 9.83)` — the live seed** | **32px** |
| `Login` | glass capsule | accent | 28px |
| `@mbabb` | glass capsule | neutral | 28px |

*(measured, `abt-probe-cr.json → A-desktop-light-gradient.rest.controls`)*

`VISUAL-CONSTITUTION.md §2`: *"One surface has one tier."* Four adjacent seats, three tiers, two
height rungs, and the only chromatic one is the least important control in the row.

### 2.2 The hierarchy is inverted

Measured (`abt-probe2.json → siblings`):

```
Select view  →  label "Gradient"  Fraunces 16.4px w400  color srgb(0,0,0)/.8
Tools        →  label "Tools"     Fraunces 16.4px w400  color oklch(.471 .188 9.83)
```

The dock's protagonist is the route identity. `Tools` — a secondary layer toggle — is rendered in the
**same family, same size, same weight**, and then given the only saturated hue in the band. It
out-shouts the thing it is subordinate to.

`PROPORTION-AUDIT.md §1`: *"Every element earns its scale, interval, boundary and material from its
job relative to the local protagonist."* This element takes the protagonist's rung and adds
emphasis on top.

### 2.3 Dark mode deletes the design's only idea

`abt-cr-dock-dark.png`. Measured label ink:

| Scheme | label `color` | chroma | rendered contrast (crop) |
|---|---|---:|---:|
| light | `oklch(0.471189 0.188448 9.83402)` | 0.188 | **4.04 : 1** |
| dark | `oklch(0.958322 0.0210531 9.83402)` | **0.021** | **4.12 : 1** |

Chroma collapses **9×**. In the dark crop `Gradient` and `Tools` are the same white serif at the same
size, separated by a 1px divider and nothing else. **The component's sole differentiating device is
not scheme-stable**: in light it is a contrast failure, in dark it does not exist. A design whose one
distinguishing move is present in exactly one of two schemes has not been designed for two schemes.

### 2.4 Optical detail — the arrow floats

`gap: 0.5em` (`:157`) resolves to **9.304px** on both sides. It separates a **24×24** glyph from a
41.9×23 wordmark, and that wordmark from a **12×12** arrow (`abt-probe-cr.json → rest.toolsSvgBoxes`
= `[{w:24,h:24},{w:12,h:12}]`). Equal optical intervals around a 4:1 mass ratio read as unequal; the
arrow detaches. It is also the only glyph in the control on the neutral ink system
(`text-muted-foreground`, `:103`) while its two siblings carry the accent — **one control, two ink
systems, three glyph rungs.**

---

## 3 · Findings

### D-01 · BLOCKER — under `prefers-reduced-motion`, the T-29 clip release never returns; the amputation the component exists to cure becomes permanent

**REPRODUCED.**

`abt-probe2.mjs → prmRoundTrip`, Chromium `reducedMotion: "reduce"`, 1440×900:

```
gradient (boot)          slotCls="…is-visible is-live is-settled"  inner.overflow=visible   ✅
browse   (departed)      slotCls="…is-live"                        inner.overflow=hidden    ✅ by design
gradient (re-arrival)    slotCls="…is-visible is-live"             inner.overflow=hidden    ❌
gradient (2nd re-arr.)   slotCls="…is-visible is-live"             inner.overflow=hidden    ❌ permanent
```

The identical script **without** `reducedMotion` (`normalRoundTrip`) re-arrives at
`is-visible is-live is-settled` / `overflow: visible`. So it is PRM-specific and it is total.

**Measured consequence at hover in the broken state** (`prmRoundTrip[4].hoverBox`):

```
tools rect  x 631.5  w 115.0  h 35.2      (the ×1.1 hover capsule)
inner rect  x 619.8  w 125.5  h 32.0      (the clip box)
overflow →  right 1.23px   top 1.60px   bottom 1.60px   — CUT
```

`abt-prm-rearrival-hover.png` shows it: the hover pill's right edge is sliced flat against the
Login divider and its top and bottom are planed off. This is verbatim the defect the file's own
header describes at `:20-23` — *"amputated the producer's unified hover register … measured 4.3px
L/R + 1.6px T/B at hover"* — restored, for reduced-motion users, forever.

**Mechanism.** Two independent gates fail together.

1. `ActionBarToggle.vue:59` — `if (slotLive.value) return;`. After the first arrival `slotLive` is
   permanently true, so on every later `visible: false → true` the watch does **nothing**. `settled`
   was cleared on departure (`:56`) and can only be restored by the `transitionend` handler.
2. `ActionBarToggle.vue:70` — `if (e.propertyName !== "grid-template-columns") return;`. Under PRM
   that transition **does not exist**:

   `node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css:1`
   ```css
   @media (prefers-reduced-motion: reduce) {
     *:not([data-allow-motion]) {
       transition-duration: 0.1s !important;
       transition-property: opacity, color, background-color, border-color, box-shadow !important;
     }
   }
   ```
   Measured computed value on the slot under PRM (`prmRoundTrip[*].slotTransProp`):
   `"opacity, color, background-color, border-color, box-shadow"` — **`grid-template-columns` is
   absent.** No `transitionend` for it is ever dispatched.

**The file's written premise is false.** `:27-30`:

> *"mid-session arrival: the grid-columns `transitionend` (PRM included — the global guard shortens
> transitions to 0.01ms, never removes them)"*

That describes `demo/styles/animations.css:184-192`, the demo's own guard. It does **not** describe
glass-ui's `a11y-overrides.css`, which is loaded through `demo/styles/foundation.css:56`
(`@import "@mkbabb/glass-ui/styles"` → `dist/styles/index.css` → `@import "./accessibility.css"`) and
which **replaces the property list**. The component reasoned about one guard and shipped against two.
The sibling `shell-dock-dock` seat recorded this re-arm as INFO C-28 ("measured: recovers today") —
that measurement was taken on the non-PRM path only.

**Cure (gestalt, not patch).** Delete the three-state machine. The clip exists only to hide content
during a width animation; a width animation on a dock control is itself the defect (D-11 in the
sibling dock report, D-12 here). Replace `0fr↔1fr` + `overflow` bookkeeping with a fixed-basis box
that fades and `scaleX`es — `transform`/`opacity` are compositor-only, need no clip, cannot amputate,
and are what `VISUAL-CONSTITUTION.md §6` already asks for (*"one producer-owned glass-ui spring
register"*). `slotLive`, `settled`, `onSlotSettled`, `.is-live`, `.is-settled` and the double-rAF all
die together. If any transition-completion signal must survive, it must not be keyed to a property
name that a producer stylesheet is free to remove.

---

### D-02 · BLOCKER — the label fails WCAG AA in both schemes, and the cause is a per-instance ink override on a producer control

**Measured, two independent methods.**

Rendered-pixel method (crop the label's own rect from the live 2× render, decode, 2nd/98th luminance
percentile):

| crop | ink L | paper L | ratio |
|---|---:|---:|---:|
| `Tools` label, light | 0.0895 | 0.5131 | **4.04 : 1** |
| `Gradient` label, light (neutral sibling, same font/size) | 0.0184 | 0.4951 | 7.97 : 1 |
| `Tools` label, dark | 0.1741 | 0.8742 | **4.12 : 1** |

Analytic method — `oklch(0.471189 0.188448 9.83402)` → sRGB `rgb(170, 0, 67)`, relative luminance
0.0892, against the measured paper 0.5131 → **4.05 : 1**. Agreement with the pixel read: 0.01.

The text is 16.4px at weight 400. WCAG 2.2 SC 1.4.3 large-text exemption requires ≥24px, or ≥18.66px
bold. **This is normal text; the threshold is 4.5:1; both schemes fail.** The neutral sibling in the
same font at the same size passes at 7.97:1, so the typography is not the cause — the ink is.

**Mechanism.** `ActionBarToggle.vue:95-96`:

```vue
<component :is="icon" class="w-6 h-6" :style="{ color: accent }" />
<span v-if="isDesktop" class="text-small font-display" :style="{ color: accent }">
```

Two inline per-instance colour overrides on the children of a producer control. Owner edict 5 —
*"style at the shadcn/glass root component level, never per-instance overrides."*
`VISUAL-CONSTITUTION.md §2` — *"Seed tint is forbidden outside the ambient field, active accent,
WatercolorDot/specimen, and pastel Palettes lanes"*, and *"every other navigation, route, pane,
Admin, Account, action, and status label use neutral ink."* A **resting, unpressed** toggle is not
an active accent.

The overrides also do measurable harm beyond contrast. The producer defines
`--dock-active-color: light-dark(hsl(24 10% 10%), hsl(30 14% 90%))` and applies it via
`.dock-icon-button:is(.is-active, …, [aria-pressed="true"]) { color: var(--dock-active-color) }`.
Measured in the pressed state: the **button** takes it (`color: rgb(28,25,23)`) while the **icon and
label do not** — both still read `oklch(0.471189 0.188448 9.83402)`
(`abt-probe-cr.json → A….active.toolsLabelCS/toolsIconCS`). The producer's entire pressed-ink
treatment is neutralised by two inline styles.

**Cure.** Delete both `:style` bindings and the `accent` prop. Dock chrome is neutral ink; the seed
lives in the ambient field and the wax seal, which is where `VISUAL-CONSTITUTION.md §7` already puts
it. `Dock.vue:186-188`'s `:accent="genericBar?.accentColor ?? safeAccent"` and the
`DockActionBar.accentColor` field (`usePaneRouter.ts:55`) go with it — no call site ever sets
`accentColor` (`usePaneRouter.ts:192-225`), so the prop threads a default through three components
to paint a contrast failure.

---

### D-03 · MAJOR — T-36's "true-button box-model" has never applied; the producer rule it rides is outranked 2:1 on specificity

**The file asserts the cure landed** (`:147-153`):

> *"THE TRUE-BUTTON BOX-MODEL … The cure rides the producer's OWN token hook
> (`--dock-compact-control-padding`, dock-controls/icon-button.css), **never a specificity fight**:
> inline padding at the Button-primitive px-3/py-2 scale (**the box lands at the sibling controls'
> 2.5rem height**)"*

**Measured** (`abt-probe2.json → normalRoundTrip`, `abt-pad2` counterfactual):

```
--dock-compact-control-padding on the element : "0.5rem 0.75rem"   ← the SFC's declaration is present
computed padding                               : "4px"              ← 0.25rem, the producer FALLBACK
measured height                                : 32px               ← the file claims 2.5rem = 40px
```

**Counterfactual, same live element:** setting `--dock-compact-control-padding: 20px 30px` **inline**
(highest possible priority) changes padding by **0px**. Forcing `element.style.padding =
"0.5rem 0.75rem"` directly yields `padding: 8px 12px`, `height: 40.0px`, `width: 120.5px` — **exactly
the 2.5rem the comment claims.** The intent is right; the mechanism is dead.

**Root cause, from `CSS.getMatchedStylesForNode`** (`abt-pad3.mjs`, output pasted verbatim):

```
{"sel":".dock-icon-button--compact","layers":["components"],
 "props":["padding: var(--dock-compact-control-padding, 0.25rem)"]}
{"sel":".glass-dock .dock-icon-button","layers":["components"],
 "props":["padding: var(--dock-icon-padding, var(--dock-control-safe-inset, 0))"]}
{"sel":".dock-tools-btn[data-v-69d6f73e]","layers":[],
 "props":["--dock-compact-control-padding: 0.5rem 0.75rem"]}
```

`.glass-dock .dock-icon-button` is specificity **(0,2,0)**; `.dock-icon-button--compact` is
**(0,1,0)**. Inside a `.glass-dock` — which is the only place this control ever renders — the compact
padding hook is **structurally unreachable**. The winning value is
`--dock-control-safe-inset: calc(var(--dock-control-size) * 0.1)`
(`glass-ui/dist/components/dock/styles/density.css`) = `40px × 0.1` = **4px**, which is precisely
what we measure.

The comment's promise — *"never a specificity fight"* — is the exact fight it lost, invisibly, since
T.W6.

**Note for the register.** The sibling `shell-dock-dock` seat's D2-09 measured the same 32px and
concluded *"the comment has been 8px wrong since it was written."* That reading is wrong and should
be corrected: the comment's **number is right** (forced padding → 40.0px exactly); the **mechanism is
dead**. The cure therefore is not "delete the token" but "stop re-deriving a box model the producer
already ships" — see D-04.

---

### D-04 · MAJOR — glass-ui ships this exact control as `DockControl shape="tab"`, and the `active` prop the component hand-rolls three attributes for

`node_modules/@mkbabb/glass-ui/dist/components/dock/DockControl.vue.d.ts`, verbatim:

> *"`shape="icon"` (default) — fixed-square icon control … **`shape="tab"` — auto-sized text-tab
> control** with the de-red'd glass hover register + the pointer-following gleam."*
>
> *"`active` — Selected/toggled state. **Stamps `aria-pressed` + `data-active`**; the icon shape
> composes the `.glass-capsule` selected seat."*

`ActionBarToggle.vue:86-94` renders:

```vue
<DockControl compact class="dock-tools-btn" :class="{ 'is-active': active }"
             aria-label="Toggle action bar" :aria-pressed="active" :tabindex="visible ? 0 : -1">
```

It is a **text tab** — icon + wordmark + affordance — declared as `shape="icon"` (the default) with
`compact`, then hand-fitted with `--dock-compact-control-padding` (dead, D-03) toward
`padding: 0.5rem 0.75rem`. The producer's `.dock-tab-button`
(`glass-ui/dist/components/dock/styles/controls/tab-button.css`) already is:

```css
padding-inline: var(--dock-tab-padding-inline, 0.75rem);   /* = the 0.75rem the SFC re-derives */
padding-block:  var(--dock-tab-padding-block, 0.375rem);
font-size: var(--type-small); color: var(--muted-foreground);
&:is(.is-active, .active, [aria-current="page"], [aria-pressed="true"]) {
  background: var(--dock-control-active-bg); color: var(--foreground); }
```

— and it carries **no `scale: var(--scale-hover-dock)`**, which is why `Login`, `@mbabb` and
`Select view` do not inflate on hover while Tools measurably does (rest `104.5×32` → hover
`115.0×35.2`, `scale: 1.1`). Tools is the **only label-bearing control in the dock that grows 10% on
hover**, re-rastering a 16.4px serif wordmark to a non-integer 18.04px, because it borrowed the
icon-button hover register for a text control.

Second half: `active` is a prop that emits both signals. The component passes **neither**, and
instead writes `:class="{'is-active': active}"` **and** `:aria-pressed="active"` by hand. Measured
pressed state: `class="… dock-tools-btn is-active"`, `aria-pressed="true"`, background
`color(srgb 0.994 0.96 0.926 / 0.8)` — which is `--dock-active-bg`
(`color-mix(… light-dark(hsl(30 85% 96%) …) 80%, transparent)`), i.e. the **`.is-active` branch**.
`data-active` is never set, so the producer's `&[data-active]` branch — the
`--dock-control-active-bg` *"selected reads as glass"* tier the typing names — is never reached.

Owner edicts 2 (no dual paths), 3 (KISS), 4 (glass-ui is the design system), 5 (root-level styling)
— all four, in one element.

**Cure.** `<DockControl shape="tab" :active="active" aria-label="Toggle action bar">`. Delete
`compact`, `dock-tools-btn`, the `--dock-compact-control-padding` line, `margin-inline`, `gap`,
`:class="{'is-active'}"` and `:aria-pressed`. The entire `<style scoped>` block collapses to nothing
once D-01's slot rewrite lands.

---

### D-05 · MAJOR — the pressed state has zero rendered pixels and is absent from the accessibility tree

`Dock.vue:113` sets `activeLayer = "action-bar"` exactly when `actionBarLayerActive` is true, and
glass-ui's `layers.css` gives the non-active layer
`opacity: 0; visibility: hidden; pointer-events: none`. The main layer hosts `ActionBarToggle`.
**The only state in which the toggle reads "on" is a state in which the toggle is not on screen.**

Measured after clicking Tools (`abt-probe-cr.json → A….active`):

```
toolsAttrs.ariaPressed = "true"        toolsAttrs.cls = "… dock-tools-btn is-active"
nav aria snapshot      = - navigation "Application navigation":
                           - button "Back": - img
                           - separator
                           - button "Reset" / "Copy CSS" / "Seed from palette"
pressedInAx            = false
```

`aria-pressed="true"` is announced to nobody: the node is inside a `visibility: hidden` subtree and
is pruned from the AT tree. Visually there is nothing to see. **A binary control whose "on" is
unobservable in both the visual and the semantic channel has no state, only an event.**

`VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
color-only. Role, accessible name, state/value … are explicit."* Here the state is not even
colour-only; it is nothing.

Corollary, measured: while "pressed", the toggle's laid-out rect is `x 790.6 w 104.5` while the dock
pill is `x 627.5 w 185.0` — the control sits **82.6px outside its own dock**, and the dock's left
edge has jumped **+153.8px** with its width down **−307.6px** (rest `x 473.7 w 492.6`). Unanimated.
`VISUAL-CONSTITUTION.md §3` law 4: *"Expanded/collapsed/mounted states do not move the scene."*

**Cure.** Either the toggle survives into the action-bar layer as the pressed seat that returns you
(deleting the redundant `Back` control at `Dock.vue:154` and the whole two-arrow motif), or it stops
claiming `aria-pressed` and becomes what it behaves like — a one-way `aria-expanded`/`aria-controls`
disclosure. It cannot be a toggle that is never seen toggled.

---

### D-06 · MAJOR — on eleven of fifteen routes the control is a named ghost: 0 painted pixels, full accessible name, programmatically focusable

`/#/browse`, no action bar (`abt-probe-cr.json → E-desktop-browse-absent`):

```
toolsPresent = true
toolsBox     = { w: 104.5, h: 32 }          ← full layout rect, painted nowhere
slotCls      = "action-bar-toggle-slot is-live is-settled"   (no is-visible)
slotCS       = { grid-template-columns: "0px", opacity: "0" }
innerCS      = { overflow: "hidden" }
tabindex     = "-1"
clickable    = { hitIsSelf: false, focusable: true }
```

and the live `nav` aria snapshot on that route:

```
- navigation "Application navigation":
  - combobox "Select view": - img - text: Browse
  - separator
  - button "Toggle action bar":     ← ★
    - img
    - text: Tools
    - img
  - separator
  - button "Login": …
```

**A fully-named `Tools` button, with its icon, its wordmark and its arrow, is in the accessibility
tree of a route that has no tools.** `opacity: 0` + a clipped 0px grid column removes it from sight
and from the tab order but not from the AT tree; screen-reader browse mode, the rotor and
touch-exploration all reach it. `element.focus()` succeeds (`focusable: true`), so any
focus-restoration path can park focus on an invisible control — precisely the failure
`VISUAL-CONSTITUTION.md §5.1` legislates against (*"never focus a detached node"*, *"restore focus
when overlays close"*).

The absent state was never designed. It was implemented as "still here, just transparent", which is
the canonical way to manufacture a ghost.

**Cure.** Absence is `v-if`. `Dock.vue:182` already knows (`hasAnyActionBar`); it passes the
predicate down as a styling prop instead of using it as a mount condition. With D-01's transform-based
presence there is nothing left that needs the element to stay mounted. `PROPORTION-AUDIT.md §5` law
5: *"A small icon/mark is either data, status, labeled action, drag affordance, focus/selection
register or removed."*

---

### D-07 · MAJOR — the visible label is deleted by viewport width, so 200% zoom and every phone get an unlabelled tinted glyph; and `compact` opts the control out of the producer's coarse-pointer target floor

`ActionBarToggle.vue:96` gates the wordmark on `isDesktop`, which is `useMediaQuery("(min-width: 1024px)")` (`Dock.vue:71`). Measured:

| matrix | rect | label | arrow | separator |
|---|---|---|---|---|
| desktop 1440 | 104.5 × 32 | `Tools` | 12×12 | 1×27.5 |
| **200% zoom (720 CSS px)** | **32 × 32** | **null** | **0×0** | **0×0 (display:none)** |
| **mobile 390** | **33.3 × 33.3** | **null** | **0×0** | **0×0** |

`shots/zoom-200-desktop/gradient.png` confirms it visually: the dock reads
`[🌈 ⌄] [🖌] [Gradient | Palettes] [⋮]` — the control is a bare magenta paintbrush with no name, no
boundary, no plate, adjacent to a decorative route glyph. Nothing on screen says it is operable.

Two law breaches:

1. **WCAG 2.2 SC 1.4.4 (Resize text)** — zooming to 200% is an accessibility accommodation; content
   must not be lost. The visible label is content. It is lost. The label is keyed to *viewport
   width*, not to available space, so the user is punished for the accommodation.
   `VISUAL-CONSTITUTION.md §3` law 7: *"Spacing is container-scaled … No desktop-tight/mobile-airy
   fork and no breakpoint pile."*
2. **Touch target.** The producer's coarse-pointer floor
   (`glass-ui/dist/components/dock/styles/controls/touch-floor.css`) reads:
   ```css
   @media (pointer: coarse) {
     .dock-icon-button:not(.dock-icon-button--compact):not(:where(.glass-dock *)) {
       min-block-size: var(--dock-touch-target, 2.75rem); min-inline-size: …; } }
   ```
   `--compact` is **explicitly excluded**. By choosing `compact` (`:87`) the component opted out of
   the 44px floor on the one viewport where the pointer is a finger. Measured on mobile:
   **33.3 × 33.3** — 57% of the 44×44 area. `DockControl`'s own typing promises the opposite
   (*"the HIT CELL stays the full `--dock-control-size` (≥44px on coarse …) — hit box ≠ paint box"*);
   `compact` is the branch that forfeits it. `PROPORTION-AUDIT.md §5` law 7 —
   *"Visual glyph size, operable target size and layout reservation are separate quantities"* — is
   exactly the law this control needed and did not apply.

The existing Safari matrix does not catch this: `REPORT.json`'s `smallTapTargets` threshold flags
only sub-24px, so 33.3px passes silently on all four mobile rows.

**Cure.** `shape="tab"` (D-04) is auto-sized and label-bearing at every width; drop the `isDesktop`
prop entirely and let the label live or wrap by container query. If the label genuinely cannot fit at
312px of dock aperture, the icon-only fallback must supply a visible boundary and meet the coarse
floor — which `shape="icon"` without `compact` does for free.

---

### D-08 · MAJOR — the focus indicator is a 1.65:1 hairline in the user's own picked colour, with `outline-style: none`

Clean keyboard focus, mouse parked at (20,700) (`abt-probe2.json → focus`):

```
label        : "Toggle action bar"     matchesFV : true
outlineStyle : "none"     outlineWidth: "3px"    outlineColor: srgb(0,0,0)/.8
boxShadow    : color(srgb 0.665504 0.000101 0.261748 / 0.3) 0 0 0 2px,
               color(srgb 0.665504 0.000101 0.261748 / 0.15) 0 0 8px 0
background   : rgba(0,0,0,0)
```

An outline was declared at 3px and then killed by `.dock-icon-button { outline: none }`. The only
surviving indicator is a **2px ring at 30% alpha of the live seed colour**. Composited over the
measured dock paper (L 0.5131) that ring's contrast is **1.65 : 1** — WCAG 2.2 SC 1.4.11 requires
**≥ 3:1** for a focus indicator. `abt-focus.png` shows the result: at 2× DPR it is a faint pink
whisper; at 1× it is functionally invisible.

Worse, the ring is derived from the **live seed**, so its contrast is a function of what colour the
user happens to be editing — an unguarded, user-variable focus indicator.
`VISUAL-CONSTITUTION.md §4.1`: *"Focus remains visibly distinct from selection in both schemes,
forced colors and reduced transparency."* Measured here it is not reliably distinct from the
background, let alone from selection (D-05 shows selection has no pixels at all).

Forced-colors (Chromium, `forcedColors: "active"`, `abt-probe-cr.json → G-forced-colors.rest`):
`background-color: rgba(255,255,255,0)`, `box-shadow: none`, no border. In forced-colors the control
is bare text with **no boundary whatsoever** — indistinguishable from a label, while its `Login` and
`@mbabb` neighbours (Button primitives) retain theirs.

*Coverage note:* `shots/forced-colors-desktop/gradient.png` was captured on WebKit, which ignores
`forcedColors` emulation — that image renders in full colour and is **not** a forced-colors witness.
The measurement above is Chromium.

**Cure.** Producer-owned focus ring at the root (`shape="tab"` inherits `.dock-tab-button`'s), never
seed-derived; ≥3:1 against the dock in both schemes and a non-colour delta under forced colors.

---

### D-09 · MINOR — the type jurisdiction is violated, and violated identically to the protagonist

`ActionBarToggle.vue:96` — `class="text-small font-display"`. Measured: **Fraunces, 16.4px, w400**.

`VISUAL-CONSTITUTION.md §4` closes the matrix: *"control or label, including dropdown options →
`text-small` → Plus Jakarta Sans, non-bold"*, and *"Fraunces owns display/identity"*. A layer toggle
is a control. `PROPORTION-AUDIT.md §5` law 13 restates it.

Two aggravations: (a) `--type-small` is `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` — at 1440 it
resolves to **16.4px**, i.e. `text-small` is not small here, it is body size; (b) the sibling
`Select view` renders `Fraunces 16.4px w400` too, so the control and the route identity are
typographically indistinguishable (§2.2).

---

### D-10 · MINOR — three glyph rungs, one of them inside this control at a 2:1 ratio

Measured glyph boxes: Tools icon **24×24** (`w-6 h-6`, `:95`), Tools arrow **12×12**
(`w-3 h-3`, `:103`), `Dock.vue:143` Check **20×20** (`w-5 h-5`). The producer's rung is
`--dock-icon-glyph: max(calc(2.5rem × 0.5), 1rem)` = **20px**, applied by
`.dock-icon-button > svg` in `@layer components` and beaten by the Tailwind `w-6`/`w-3` utilities.

24 : 12 = **2:1**. `PROPORTION-AUDIT.md §1`: *"The glass-ui golden ladders supply adjacent rungs."*
Adjacent φ rungs off 24 are 14.8 or 38.8; 12 is neither. And both sizes are per-instance overrides of
a producer token (edict 5). Honest note: `DockViewSelect` also renders 24px, so the 20px→24px
override is a dock-wide habit; the 12px arrow is this component's alone.

---

### D-11 · MINOR — a one-way arrow on a two-way toggle, pointing the wrong way in RTL and pointing at motion that does not happen

`ActionBarToggle.vue:99-103` justifies `ArrowRight` as *"the layer-swap AFFORDANCE — ArrowRight
mirrors the ArrowLeft back-button inside the action-bar layer (one enter/exit motif)."*

Three problems.

1. **Semantics.** The control is `aria-pressed`, i.e. a toggle: pressing it again is how you come
   back. A `→` states "this goes forward"; there is no forward, there is on and off. The producer's
   `dock-select-trigger__chevron` (which rotates 180° on `[data-state="open"]`) is the register for a
   state that reverses; a directional arrow is the register for navigation that does not.
2. **The promised motion is not the motion.** Measured on toggle: dock `x 473.7 w 492.6` →
   `x 627.5 w 185.0`. Nothing moves right. The pill collapses inward by 307.6px.
3. **RTL.** `shots/rtl-desktop/gradient.png`/`picker.png`: items mirror, glyphs do not — the arrow
   points away from its content. `VISUAL-CONSTITUTION.md §6.1`: *"chrome, navigation and layout →
   logical inline/block direction follows the document."* (Corroborates the sibling dock seat's
   D2-07; the toggle-semantics half above is new.)

**Cure.** Remove the arrow. A named, plated tab with a producer `active` seat needs no directional
ornament — `PROPORTION-AUDIT.md §5` law 6: *"Subtraction precedes explanation."*

---

### D-12 · MINOR — the hand-rolled separator, and the material tier that isn't one

`ActionBarToggle.vue:82` — `<DockSeparator class="hidden lg:block" />`, folded into the slot so it
shares the presence grammar. Measured in the main layer at 1440: **three visible separators for four
seats** at x = 625.8 (this component's), 757.3, 864.8 — one between every adjacent pair, the maximum
possible duplication, in a row where two of the four seats already draw their own capsule.

`PROPORTION-AUDIT.md §5` law 4: *"A divider is retained only when grouping would be ambiguous without
it. Spacing plus material already expressing the same boundary makes the line duplicative."*
PR-05 disposition is **REMOVE / KEEP** with *"every other divider/ornament is zero."*

And the tier itself: at rest this control paints **no plate at all** (`background-color: rgba(0,0,0,0)`,
`box-shadow: none`) yet inflates 1.1× on hover. It is neither the bare-trigger tier of `Select view`
(which does not scale) nor the plated tier of `Login`/`@mbabb`. §2 of the constitution: *"One surface
has one tier."*

---

### D-13 · INFO — `is-active` is dead weight; the producer already keys off `aria-pressed`

`glass-ui/dist/components/dock/styles/controls/icon-button.css`:

```css
&:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"]) { … }
```

`ActionBarToggle.vue:90-93` sets **both** `is-active` and `aria-pressed`. They hit the same selector
arm; the class contributes nothing the attribute does not. Two spellings of one state is exactly the
dual path owner edict 2 forbids, and it is the reason the miss in D-04 (`data-active` never set) went
unnoticed — the component looked like it was handling the state.

---

### D-14 · INFO — no overflow, truncation or long-label design

`label: string` (`:46`) is a free prop; every caller passes `"Tools"` (`usePaneRouter.ts:193,205,217`;
`Dock.vue:187`). There is no `max-inline-size`, no truncation, no title fallback. `.dock-layer` sets
`white-space: nowrap` (`glass-ui/.../layers.css`) and `GlassDock` runs `:fit-content="true"`
(`Dock.vue:132`), so a longer label grows the pill without bound and compounds D-05's 307.6px
geometry jolt. The overflowing/truncated state named in this seat's brief is unhandled because the
prop's variability was never designed for — it is a constant wearing a variable's type.

---

### D-15 · INFO — the `accent` prop threads a default through three files to paint one contrast failure

`DockActionBar.accentColor?: string` (`usePaneRouter.ts:55`) is **never set** by any of the three
action-bar definitions (`:191-225`). `Dock.vue:188` supplies `?? safeAccent`; `ActionBarToggle`
receives it as a required `accent: string` and spends it on the two inline `:style` bindings of D-02.
Delete D-02's overrides and the prop, the `??`, and the interface field all become dead — a
three-file subtraction (`SUBTRACTION.md` idiom) for zero behaviour change.

---

## 4 · Negative proofs — what this seat checked and found sound

These were probed and are **not** defects; recorded so a later seat does not re-open them.

| Check | Result |
|---|---|
| `verbatimModuleSyntax` (edict 8) | `:3` `import type { Component } from "vue"` — the only type-only import, correctly marked. Clean. |
| Vue 3.5 reactive props destructure (edict 7) | `:38` `const { visible, active, isDesktop, icon, label, accent } = defineProps<…>()` — idiomatic; `watch(() => visible, …)` correctly wraps the destructured prop in a getter (`:53`). Clean. |
| God module (edict 1) | 159 lines, one concern, one emit. The W6-8 lift **out** of `Dock.vue` was the right move. Clean. |
| New shared/ dir or wrapper (edict 3) | None. Colocated in `demo/shell/dock/`. Clean. |
| Animations deleted (edict 6) | No keyframes removed; the file declares transitions only, no `@keyframes`. Clean. |
| T-29 clip release on the **non-PRM** path | Measured: boot and re-arrival both reach `is-settled` / `overflow: visible`; the hover capsule renders whole. The mechanism works — for users who have not asked for reduced motion (D-01). |
| Boot-flicker suppression (S.W7-6) | Measured at boot on `/#/gradient`: `is-live` and `is-settled` land together via the double-rAF; no visible grow on load. Works as documented. |
| `aria-label` present | `:89` — the control is named on every viewport. `REPORT.json`'s `namelessButtons: 1` on `/#/` and `/#/gradient` is **not** this control. |
| Horizontal overflow | `REPORT.json`: `overflowX: 0` on all 60 captures. This component contributes none. |
| Page errors | 0 across all nine probe matrices. |

---

## 5 · Register mapping

| Finding | Canon row | Severity |
|---|---|---|
| D-01 | `VISUAL-CONSTITUTION.md §6` (reduced motion resolves to final geometry); PR-12 | BLOCKER |
| D-02 | `§2` seed-tint jurisdiction; `§4.1` rendered contrast; edict 5; WCAG 1.4.3 | BLOCKER |
| D-03 | PR-12 **TIGHTEN**; `§5` law 8 (*real rendered relation wins over token intent*) | MAJOR |
| D-04 | edicts 2/3/4/5; `§4.2` component register | MAJOR |
| D-05 | `§4.1` (states never colour-only); `§3` law 4 (dock band does not move the scene) | MAJOR |
| D-06 | PR-16 / PR-07 **REMOVE / ADD-AFFORDANCE**; `§5.1` focus law | MAJOR |
| D-07 | `§3` law 7 (no breakpoint pile); PR-12; WCAG 1.4.4, 2.5.5 | MAJOR |
| D-08 | `§4.1` focus distinctness; WCAG 1.4.11, 2.4.11 | MAJOR |
| D-09 | `§4` type jurisdictions; PR-02 family | MINOR |
| D-10 | PR-12; `§1` adjacent-rung law | MINOR |
| D-11 | `§6.1` direction jurisdictions; PR-07 | MINOR |
| D-12 | PR-05 **REMOVE**; `§2` one-surface-one-tier | MINOR |
| D-13 | edict 2 | INFO |
| D-14 | `§3` law 4 | INFO |
| D-15 | `SUBTRACTION.md` | INFO |

---

## 6 · The gestalt cure

Not fifteen patches — one transposition. `ActionBarToggle.vue` should be roughly this, and the
`<style scoped>` block should be **empty**:

```vue
<script setup lang="ts">
import type { Component } from "vue";
import { DockControl } from "@mkbabb/glass-ui/dock";
const { active, icon, label } = defineProps<{ active: boolean; icon: Component; label: string }>();
defineEmits<{ toggle: [] }>();
</script>

<template>
    <DockControl shape="tab" :active="active" aria-label="Toggle action bar" @click="$emit('toggle')">
        <component :is="icon" />
        <span>{{ label }}</span>
    </DockControl>
</template>
```

`Dock.vue:182` wraps it in `v-if="hasAnyActionBar"` and hands presence to the producer's own layer
crossfade. What dies: the slot grid, `slotLive`, `settled`, `onSlotSettled`, the double-rAF,
`.is-live`/`.is-visible`/`.is-settled`, the folded separator, `--dock-compact-control-padding`,
`margin-inline`, `gap`, `w-6 h-6`, `w-3 h-3`, the two `:style="{ color: accent }"` bindings, the
`ArrowRight`, the `isDesktop` prop, the `accent` prop, `DockActionBar.accentColor`, the manual
`aria-pressed`, the manual `is-active`, and the `tabindex` juggle — **159 lines to roughly 15**.

Every one of D-01…D-15 is closed by that transposition except D-05 (which is a Dock-level ruling on
whether the toggle survives into the action-bar layer) and D-11's RTL half (a dock-wide logical-glyph
decision). Both belong to the parent seat.

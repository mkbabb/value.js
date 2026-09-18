# CHALLENGE-D — `demo/shell/dock/layers/ActionBarLayer.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (the 1M-context variant).
This is the tier this seat was explicitly spawned with; the seat is **declared, not inherited**.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
The brief names HEAD `c654824e`; the working tree has since advanced — actual HEAD at capture
time is **`5c13465d`** (`git log --oneline -3`). No source file was edited by this seat. Every
browser probe was read-only against the live dev server at `http://localhost:9000`.

This is **pass 2** of the D seat. The pass-1 report is preserved verbatim alongside as
`challenge-D-design.pass-1.md`; this pass was run independently and its instrument set differs
(reduced-motion arm, engine-differential keyboard probe, forced-colors arm, mobile
reachability/hit-test arm, optical-rhythm measurement). Where the two passes converge, that is
corroboration by independent measurement, and I say so.

---

## Verdict

**DEFECTIVE.** The premise is correct and the defects are structural, not cosmetic.

The component is built on a mechanism that does not exist. Its centre — the locally
reimplemented `useLayerTransition` (lines 53–94) — schedules a **260 ms crossfade window for a
crossfade that never runs**, hangs the producer's private layer vocabulary on a container class
(`.dock-layer-grid`) that **has zero CSS rules anywhere in this repository or in
`@mkbabb/glass-ui@7.0.0`**, and does so while the public successor it claims does not exist —
`<DockCrossfade>` plus `useDockCrossfadeContext()` — is exported from **the same module
specifier line 8 already imports from**.

Downstream of that fiction: the control the user just clicked translates **~64 px out from under
the pointer**; keyboard focus is left on `<body>` across the swap; **in WebKit — the app's stated
first-class engine — not one control in this layer is reachable by Tab at all**, while the same
page in Chromium reaches all six; and on mobile the layer is never mounted, yet its trigger
remains in the accessibility tree, so activating it **collapses the entire dock to an empty
28 × 65 px sliver with no active face** — the one motion outcome `VISUAL-CONSTITUTION.md` §6
forbids by name.

Eleven states this component can occupy were never designed. Two of the three canon authorities
it is judged against are violated by construction; the third (`PALETTE-CONTRACT.md`) is a data
contract and does not bind this surface.

---

## Method and instruments

| # | Instrument | What it decided |
|---|---|---|
| I-1 | Source read of the SFC + `Dock.vue`, `ActionToolbar.vue`, `ColorInput.vue`, `SlugEditLayer.vue`, `ActionBarToggle.vue` | ownership seams, dead API surface |
| I-2 | `grep -rn "dock-layer" node_modules/@mkbabb/glass-ui/` + repo-wide | the phantom container class; the producer's real `.dock-layer` contract |
| I-3 | `dist/components/dock/styles/layers.css`, `crossfade.css`; `dist/styles/tokens/sizing.css` | what `.dock-layer` actually does; the dock's own glyph/touch tokens |
| I-4 | `dist/components/dock/DockCrossfade.vue.d.ts`, `composables/dockCrossfadeContext.d.ts` | the successor exists and is public |
| I-5 | Playwright/WebKit, 1440×900 light — swap sampled every 30 ms | the crossfade is a hard cut; the leaving box snaps to the wrong containing block |
| I-6 | Same, `reducedMotion: "reduce"` | the JS window is unarmed for reduced motion |
| I-7 | Playwright/WebKit **and** Chromium, Tab ×6–12 with the layer open | engine-differential keyboard unreachability |
| I-8 | Playwright/WebKit, 390×844 — `elementFromPoint`, `tap()`, `focus()`, face census | the mobile dock-collapse blocker |
| I-9 | Playwright/WebKit, `forcedColors: "active"` | the `currentColor` chain is broken at source |
| I-10 | Pixel measurement of the DPR-2 crops | optical rhythm asymmetry; focus-ring/separator collision |

Figures written by this pass, all in this directory:

| File | What it shows |
|---|---|
| `D2-desktop-light-actions.png` | `actions` mode, 1440×900 light |
| `D2-desktop-light-input.png` | `input` mode — the pill is 140 px wider |
| `D2-desktop-light-propose.png` | `propose` mode — the ⋮ that means "close" |
| `D2-mobile-light-dock-at-rest.png` | 390 w dock at rest — the Tools trigger is invisible |
| `D2-mobile-dark-after-toggle-dock-collapsed.png` | **the money frame**: the dock after the trigger is activated on mobile |
| `D2-toggle-focus-ring.png` | the focused toggle, ring crossing the separator |
| `D2-forced-colors-emulated.png` | `forced-colors: active` emulation — nothing changes |

### Coverage note the brief asked me to check

`docs/tranches/V/megatranche/audit/visual/REPORT.md` records 60 Safari captures (4 matrices × 15
routes); `STATES.json` adds 6 state matrices × 5 routes. **None contain this component.** Every
capture is at-rest, and this layer renders only after `Dock.vue:113` sets
`activeLayer = "action-bar"`, which requires activating the Tools trigger (`Dock.vue:182–190`).
The clean `/#/` rows (0 page errors, 0 overflow, 0 blanks) therefore certify **nothing** about
this surface. The two report rows that *do* touch it are indirect and both adverse:
`smallTapTargets: 8` on `/#/` (D-8 below measures this control at 40 × 40 against a 44 px token)
and `namelessButtons: 1` on `/#/`. Independently corroborated by pass 1.

---

# Findings

## D-1 · BLOCKER — the mobile state was never designed, and asking for it collapses the dock

`VISUAL-CONSTITUTION.md:141` (§6 Motion) is unconditional:

> A scene swap preserves the specimen and changes the surrounding instrument. **No full-slab
> remount hole, rAF-delayed blank, or dock collapse.**

**Measured, 390×844 WebKit, `/?color=%23abcdef`:**

| | desktop 1440 | mobile 390 |
|---|---:|---:|
| `.dock-face` count | **4** | **3** |
| `.dock-layer-grid` present | true | **false** |
| `.color-input` rendered | 447.5 px | **null** |

The action-bar face is **not mounted below the `lg` breakpoint** — `Dock.vue:156` gates
`<ActionBarLayer v-if="actionBar">` on `App.vue:38`'s
`colorPickerRef?.actionBarContext ?? null`, and on mobile the Picker pane is not the mounted
pane, so the ref is undefined.

The trigger, however, survives. `ActionBarToggle.vue:92` sets `:tabindex="visible ? 0 : -1"` and
the enclosing `.action-bar-toggle-slot` collapses to `grid-template-columns: 0px` / `width: 0`,
but with **`overflow: visible`**. Measured at 390 w:

```
btn:  { x: 151.4, y: 32.2, w: 33.3, h: 33.3, tabindex: "-1", ariaHidden: null, disabled: false }
slot: { w: 0, gridTemplateColumns: "0px", overflow: "visible", visibility: "visible" }
elementFromPoint(centre) -> DIV.segmented-indicator …   (hitIsButtonOrChild: false)
locator.tap()            -> TimeoutError (not hittable)
b.focus()                -> document.activeElement === b   (focusable: true)
```

So the control is **invisible to sight, unhittable by touch, un-tabbable — and still a named,
non-`aria-hidden`, programmatically focusable button in the accessibility tree.** VoiceOver's
rotor and any AT that activates by accessible name will find it and fire it.

What happens when it fires (measured, same session):

| | before | after |
|---|---|---|
| `.glass-dock` rect | 254.7 × 59.5 | **28.1 × 64.7** |
| `--dock-expanded-px` | `255px` | **`69px`** |
| faces | 3, one `is-active`, widths 227 | 3, **all `inert`, all width 0, `activeFace: NONE`** |

`Dock.vue:113` sets `activeLayer = "action-bar"`; the `DockLayerGroup` has no face with that id;
every face de-activates and nothing replaces it. The dock — which owns view selection, login,
account and the mobile pane switch — becomes an empty sliver with **no path back**. See
`D2-mobile-dark-after-toggle-dock-collapsed.png`.

**Reproduction:** WebKit at 390×844, `http://localhost:9000/?color=%23abcdef`, wait 4 s, then
`document.querySelector('[aria-label="Toggle action bar"]').click()` (the exact call an AT
activation performs). Dock collapses; no recovery without reload.

**Mechanism.** The component has no mobile design at all. It is not "hidden on mobile" — it is
*absent*, with a live trigger left pointing at the hole. Even if it mounted, it could not fit:
the mobile face content measures **227 px** and this layer's `input` sub-layer alone measures
**325 px** on desktop.

**Cure (gestalt, not patch).** Two things must become one. The layer's presence and its trigger's
presence are today two independent predicates in two files; they must be one derived fact. The
idiomatic transposition is to let `<DockCrossfade>`'s own face registry be the single source:
a face that never registers cannot be selected, and the trigger renders from `faces` (the
producer already exposes `faces: Readonly<Ref<DockFaceDescriptor[]>>` for exactly this — see
`dockCrossfadeContext.d.ts`). Then design the mobile action bar for real: it is the *primary*
action surface on a 390 px viewport, not a desktop luxury.

---

## D-2 · BLOCKER — every control in this layer is unreachable by keyboard in WebKit

**Measured with the action bar open, `document.activeElement` sampled after each `Tab`:**

```
webkit    first-6 tabs: ["l component value","a component value","b component value",
                         "l channel","L channel","A channel"]                       → 0 in dock
chromium  first-6 tabs: ["Back [IN-DOCK]","Reset color [IN-DOCK]","Copy color [IN-DOCK]",
                         "Random color [IN-DOCK]","Palettes [IN-DOCK]",
                         "Extract palette [IN-DOCK]"]                                → 6 in dock
```

Twelve consecutive tabs in WebKit never enter `.dock-layer-grid` and never enter `.glass-dock`
at all; the ring wraps through `BODY` back to the pane after eight stops. The `<nav
class="dock-band">` precedes `<main>` in `App.vue`, so this is not DOM order.

Ancestor audit rules out the obvious causes — no `inert`, no `aria-hidden`, no
`visibility: hidden`, no `content-visibility` anywhere on the chain from `[aria-label="Reset
color"]` up to `.glass-dock`.

The cause is in the component's own markup. Every control it renders is a **bare `<button>` with
no explicit `tabindex`**:

```
Back            BUTTON  tabindex: null
Reset color     BUTTON  tabindex: null   inGrid
Copy color      BUTTON  tabindex: null   inGrid
Random color    BUTTON  tabindex: null   inGrid
Palettes        BUTTON  tabindex: null   inGrid
Extract palette BUTTON  tabindex: null   inGrid
Open color input BUTTON tabindex: null
```

Safari's default keyboard mode ("Press Tab to highlight each item on a webpage" **off**, the
shipping default) tabs to links, form fields and elements carrying an **explicit** `tabindex` —
not to bare `<button>`. The picker pane's controls are reachable precisely because they carry
one (`ConsoleRail.vue:31` `:tabindex="railTabIndex(component)"`, with a documented roving
implementation at `ConsoleRail.vue:183`). The sibling trigger in the very same dock carries one
(`ActionBarToggle.vue:92`). **`ActionBarLayer.vue:129–142` passes none** — the `DockControl`
primitive plainly accepts one, since its sibling uses it.

`VISUAL-CONSTITUTION.md:129` legislates the intended shape and the component does not implement
it:

> horizontal Dock/rail roving focus | Right moves to the visual-right item; Left to visual-left |
> … | Home=first semantic item, End=last; activation is separate from movement

**Reproduction:** WebKit 1440×900, open the action bar, press Tab from `<body>`; observe that no
`activeElement` satisfies `closest('.glass-dock')`. Same script in Chromium reaches all six on
the first six presses.

**Cure.** Not "sprinkle `tabindex=0`". The layer is a horizontal control run, which is exactly
what the constitution's roving-focus row describes: **one tab stop for the run, arrows within,
Home/End at the ends, activation separate from movement.** That machine already exists in this
repository, generalised, at `ConsoleRail.vue:183`. The design defect is that this layer invented
a control run without adopting the house's rail law.

---

## D-3 · BLOCKER — the crossfade does not exist; the component's central mechanism is a fiction

`ActionBarLayer.vue:53–61` states the design intent:

> glass-ui removed the standalone `useLayerTransition` composable … This local successor
> preserves the exact two-refs contract the template needs: `currentLayer` flips immediately on
> swap; `leavingLayer` holds the prior id **for the crossfade window**, then clears.

**There is no crossfade window.** Sampled every ~30 ms across a real swap (WebKit, 1440×900):

| t (ms) | ActionToolbar | ColorInput | classes |
|---:|---|---|---|
| 0 | `opacity 1`, visible | `opacity 0`, hidden | `[is-active]`, `[—]` |
| 32 | **`opacity 0`**, visible | **`opacity 1`**, visible | `[is-leaving]`, `[is-active]` |
| 63 … 246 | `opacity 0` | `opacity 1` | unchanged for **214 ms** |
| 277 | `opacity 0` | `opacity 1` | `[—]` ← 260 ms timer fires |
| 699 | `opacity 0`, **hidden** | `opacity 1` | `[—]` |

Opacity moves 1 → 0 and 0 → 1 in a **single frame**. The computed style says why:

```
transitionProperty: "visibility"   transitionDuration: "0s"
```

`layers.css` declares `.dock-layer { transition: visibility 0s linear var(--duration-normal); }`
and **no opacity transition at all** — the producer animates `.dock-layer` opacity only under
`.glass-dock[data-morphing]`, from the dock's own morph scalar, which is not running here
(`[data-morphing]` false throughout the sample). The `.dock-crossfade` rules that *do* run an
opacity overlap key off `.dock-face` + `[data-crossfading]` + `--dock-t` — a different element
and a different scalar, neither of which this component participates in.

So `SUB_LAYER_CROSSFADE_MS = 260` buys exactly one thing: it holds an already-invisible element
at `visibility: visible` for 260 ms and then hides it. The design reads as motion in the source
and is a **hard cut** on screen. Independently corroborated by pass 1 (its table samples the same
transition at 19/62/136/203/253/286 ms with the same result).

**Cure.** Delete the shim and mount `<DockCrossfade active reserve="inline">` — see D-4, which
also fixes D-5's geometry jump for free.

---

## D-4 · BLOCKER — the shim's stated retirement condition is already met; the header comment is false

The brief asks for the exact retirement condition. Here it is, and it is **satisfied at Glass
7.0.0 today**, not at some future producer release.

`CARRY-LEDGER §F` / D58.iv record the shim as conditional on "glass ships a successor", and relay
O-6 mark M2 asks glass for "a public content-swap composable". **Glass 7.0.0 already ships both a
component and a composable**, exported from `@mkbabb/glass-ui/dock` — the module specifier this
file already imports `DockControl, DockSeparator` from on **line 8**:

```
$ node -e "…lastIndexOf('export')…" dist/dock.js
  pt as DockControl
  rt as DockCrossfade      ← public
  ft as DockLayer
  lt as DockLayerGroup
  _t as DockSeparator
```

`dist/components/dock/DockCrossfade.vue.d.ts` (published doc-comment):

> `<DockCrossfade:active>` is the thin controlled face-swap core. … The
> **controlled-no-rail** case (a consumer) **consumes this DIRECTLY**: a no-selection face-swap
> does NOT route through a selection engine …
> `reserve?: "block" | "inline"` — `inline` reserves the peak **WIDTH** (a horizontal control
> run).
> A dissolving focus-holding face **transfers focus to its successor**, else the body
> (un-inert-before-focus is load-bearing).

`dist/components/dock/composables/dockCrossfadeContext.d.ts` publishes
`useDockCrossfadeContext()` returning **`activeId: Readonly<Ref<string>>`** and
**`leavingId: Readonly<Ref<string|null>>`** — the "exact two-refs contract" the local shim says
has no successor, under the producer's own names.

Point by point, the header comment at lines 54–61 is wrong:

| Comment claims | Truth |
|---|---|
| "offers no public composable successor" | `useDockCrossfadeContext()` is exported and documented |
| "the class/inert packaging this template hand-binds" is internalised and unavailable | `<DockLayer>` faces register through the crossfade context; packaging is the point of the API |
| "preserves the exact two-refs contract" | the producer's contract is `activeId` / `leavingId`, verbatim |
| (implied) this case is unserved | the doc-comment names the **controlled-no-rail consumer case** as the intended consumer |

**The exact retirement condition, stated for the record:**

> **RETIRE NOW.** The condition "glass ships a public content-swap successor" is met by
> `@mkbabb/glass-ui@7.0.0` — `DockCrossfade` (component, `active` + `reserve`) and
> `useDockCrossfadeContext()` (`activeId`/`leavingId`). The retirement is: delete
> `ActionBarLayer.vue:53–94` and `subLayerProps`, wrap the two sub-layers in
> `<DockCrossfade :active="activeSubLayer" reserve="inline">` with each sub-layer as a
> `<DockLayer>` face. No producer change is required and none should be requested; relay O-6
> mark M2 should be **withdrawn as already-answered**, not tracked to W47.

This is not a maintenance nicety. Adopting the producer discharges D-3 (a real opacity overlap on
the dock spring), D-5 (`reserve="inline"` pins the box to the peak face, killing the width jump),
D-6 (the producer transfers focus off a dissolving face), and D-11 (the timer leak) in one move.
Independently corroborated by pass 1 (its C-2/D equivalent reaches the same conclusion from the
same artefacts).

---

## D-5 · MAJOR — the control translates ~64 px out from under the pointer that just clicked it

Because the box is never reserved, every sub-layer swap re-measures the whole dock and re-morphs
it. Measured `--dock-expanded-px` and rects (WebKit 1440×900):

| state | `--dock-expanded-px` | `.dock-layer-grid` x / w | toggle x |
|---|---:|---:|---:|
| main layer | 471 px | — | — |
| `actions` | **326 px** | 634.0 / 184.0 | **831** |
| `input` | — (dock measured 466.8) | **563.6** / **324.8** | ≈ **895** |

The dock is centre-anchored, so a **+140.8 px** content change splits: the grid's left edge moves
**−70.4 px** and the toggle moves **≈ +64 px to the right**. The user's pointer is on the toggle
at the moment of the click. Activating a control should not move it; here it moves by more than
one and a half control widths, and a second click to advance `input → propose` lands on empty
glass.

`VISUAL-CONSTITUTION.md:30` — "The top dock owns a reserved band. Expanded/collapsed/mounted
states do not move the scene below it" — protects the *scene*; nothing in this component protects
the *dock's own controls* from the same displacement, and the constitution's intent (a reserved
band) is plainly violated in the inline axis.

**Cure.** `reserve="inline"` on `<DockCrossfade>` — the producer measures the peak face width
once (a running max, explicitly "MEASURE-ONCE … NOT a per-swap FLIP") and holds it. The band then
never changes width and the toggle never moves.

---

## D-6 · MAJOR — the focus law is half-designed: `input` drops focus to `<body>`, `propose` does not

Measured `document.activeElement` across the `actions → input` swap:

```
focusBefore: <body class="relative" id="app" …>
focusAfter : <body class="relative" id="app" …>
```

Focus is on `<body>` before and after. The color input opens and **nothing is focused** — a
keyboard or AT user must hunt for a field that just appeared expressly to receive typing.

Now the `input → propose` swap, same session:

```
proposeState.active: <span contenteditable role="textbox" aria-label="Propose a color name" …>
```

Focused. But not by this component — by `ColorInput.vue:252–262`, which watches its own
`proposeMode` prop and calls `requestAnimationFrame(() => inputColorRef.value?.focus())`. The
`actions → input` leg has no equivalent, so **two legs of one three-state cycle obey two
different focus laws**.

The instrument for the missing leg is already declared and already bound:
`ActionBarLayer.vue:28` holds `colorInputRef`, `ColorInput.vue:283` exposes
`focus: () => inputColorRef.value?.focus()` — and the ref is **never read** (see D-13). The
design knew what it needed, wired the handle, and never connected it.

`VISUAL-CONSTITUTION.md:115` states the house rule for exactly this shape ("producer initial-focus
rule on open; exact connected opener on close"). Neither half is implemented here.

**Cure.** `<DockCrossfade>`'s documented behaviour — "A dissolving focus-holding face transfers
focus to its successor, else the body (un-inert-before-focus is load-bearing)" — is the law this
component should inherit rather than re-derive per leg.

---

## D-7 · MAJOR — the 260 ms window is not armed for reduced motion

`demo/styles/animations.css:183–192` neutralises CSS transitions/animations app-wide under
`prefers-reduced-motion: reduce`. The local shim is a **JS `setTimeout`** and is untouched.

Measured with `reducedMotion: "reduce"`:

```
t=0   leaving 0   visibility visible/hidden
t=30  leaving 1   visibility visible/visible
…                 (unchanged)
t=245 leaving 1   visibility visible/visible
t=275 leaving 0   visibility hidden/visible
```

Byte-identical to the normal-motion run. Under reduced motion an invisible, 443 px-wide,
`visibility: visible` element is held layered over the dock for 260 ms before the final geometry
is reached.

`VISUAL-CONSTITUTION.md:144` is explicit:

> Reduced motion resolves **directly to the final geometry** and stable chromatic state.

It does not. The final geometry (`visibility: hidden` on the outgoing face) arrives 260 ms late.

**Cure.** Same as D-4: the producer's spring is one clock and honours the query internally. A
hand-rolled `setTimeout` in a consumer can never be the reduced-motion arm, because the arm is a
*media* fact and the timer is a *code* fact — which is the general shape of this whole file's
error.

---

## D-8 · MAJOR — the toggle bypasses the dock's own glyph and touch tokens at the instance level

`ActionBarLayer.vue:138`: `class="toggle-btn w-6 h-6 stroke-foreground"`.
`ActionBarLayer.vue:139`: `:style="{ '--toggle-hover-color': safeAccent }"`.

Measured against the producer's published tokens
(`@mkbabb/glass-ui/dist/styles/tokens/sizing.css`):

| quantity | rendered | token | delta |
|---|---:|---|---:|
| toggle glyph | **24 × 24 px** | `--dock-icon-glyph` = `max(calc(2.5rem × 0.5), 1rem)` = **20 px** | **+20 %** |
| toggle control | **40 × 40 px** | `--dock-touch-target: 2.75rem` = **44 px** | **−9 %** on both axes |

The producer even routes the value for consumers: `--dock-control-glyph-size: var(--dock-icon-glyph)`
resolves on this very button (measured `max( calc( max( calc( 2.5rem * 1 ), 0px ) * 0.5 ), 1rem )`).
The hardcoded `w-6 h-6` overrides it.

`PROPORTION-AUDIT.md:73` (law 8): "Real rendered relation wins over token intent … token presence
alone cannot close a row." — and law 7 (`:72`): "Visual glyph size, operable target size and
layout reservation are separate quantities." Here the glyph was set and the target was left to
fall out of it, which is the inverse of the law. The 40 px result is one of the eight
`smallTapTargets` the visual matrix already counts on `/#/`.

This also violates the standing owner edict on **root-level styling**: the hover colour is
injected as an inline custom property per instance (`:style` on the icon) rather than being a
`DockControl` accent at the root, and the size is an instance utility rather than the dock's
glyph token.

**Cure.** Delete both. Size from `--dock-control-glyph-size`; let the control seat be the
producer's `--dock-touch-target`; if the dock needs an accented hover for its icon controls, that
is a `DockControl` variant in glass-ui, not a `--toggle-hover-color` invented in one consumer.

---

## D-9 · MAJOR — `:hover` with no `@media (hover: hover)` guard, on a surface that ships to touch

`ActionBarLayer.vue:149–151`:

```css
.toggle-btn:hover { stroke: var(--toggle-hover-color); }
```

No hover-capability guard. On touch WebKit, `:hover` latches after tap and persists until another
element is tapped, so the toggle keeps an accent stroke that means nothing.

The convention exists in this codebase and this component ignores it — `demo/color-session/
ColorSpaceSelector.vue:257` wraps its hover register in `@media (hover: hover)`, and every hover
utility glass-ui emits is inside `@media (hover:hover)` (verifiable in
`dist/styles/components.css`). The only two demo files that write a bare `:hover` in scoped CSS
are `ActionButton.vue:117` and this one.

**Reproduction:** touch context (`hasTouch: true`), tap the toggle, observe the accent stroke
persists after the tap completes. (Labelled a **hypothesis** for the persistence duration — I
measured the missing guard and the convention, not the latch itself.)

---

## D-10 · MAJOR — the ⋮ means "close", while the identical ⋮ eight pixels away means "menu"

`ActionBarLayer.vue:47–51` cycles the toggle glyph `Type` → `Tag`/`EllipsisVertical` →
`EllipsisVertical`, with aria-labels `Open color input` → `Propose color name`/`Close input` →
`Close propose`.

`PROPORTION-AUDIT.md:60` (PR-16) rules on this exact glyph:

> Dock's dim home mark, floating eye and **unlabeled vertical ellipsis** have no explicit
> purpose/state law … **REMOVE / ADD-AFFORDANCE** … `…` **keeps a named menu purpose plus
> expanded state or is removed**

Here the ⋮ has **neither**. It is not a menu — it is a close button wearing the universal
overflow-menu glyph (`D2-desktop-light-propose.png`). And within the same dock shell,
`MobileMenuDropdown.vue:41` renders `MoreVertical` at the identical `w-6 h-6` as the *actual*
menu. One glyph, one size, one surface, two contradictory meanings.

Three further problems in the same seat:

1. **No expanded/pressed state.** The control has three modes and exposes none of them to AT —
   no `aria-pressed`, no `aria-expanded`; only the label mutates. Its sibling in the same dock
   does it correctly (`ActionBarToggle.vue:93` `:aria-pressed="active"`).
2. **Three glyph metaphors for one seat.** `T` (a typographic literal, optically a different
   species from the five outline icons beside it — visible in `D2-desktop-light-actions.png`),
   then a luggage `Tag`, then `⋮`. A single control that changes species twice teaches nothing.
3. **The label is a nested ternary in the template** (`:131`, one 168-character line). The mode
   machine has three states and one of them is conditional on `canProposeName`; that is a
   labelled state table, not an expression.

**Cure.** One seat, one meaning: a disclosure with `aria-expanded`, one glyph that inverts
(`Type` ↔ `X`), and the propose leg promoted out of a glyph cycle into a named affordance inside
the input face where it belongs.

---

## D-11 · MAJOR — an unreconciled fourth state: `propose` outlives `canProposeName`

`cycleToolbarMode` (`:33–45`) reads `actionBar.canProposeName.value` at the moment of the click.
Nothing watches it afterward. If the color acquires a name while the user sits in `propose` — the
`random()` action in the same toolbar can do this, and so can any external color change —
`toolbarMode` stays `"propose"`. The toggle then renders `EllipsisVertical` labelled
`Close propose`, and `ColorInput` stays in propose mode for a color that can no longer be
proposed.

This is a designed state (`propose`) with no exit condition other than user action, wired to a
predicate that can change underneath it.

**Reproduction (hypothesis — mechanism read from source, not driven end-to-end this pass):** enter
propose on an unnamed color, trigger `random()` until a named color lands, observe `toolbarMode`
remains `"propose"`. Corroborated as a finding by pass 1 (C-6) from the same source read.

**Cure.** The mode is derived, not stored: `propose` is only reachable while `canProposeName` is
true, so it should be a `computed` clamp, not a `ref` the predicate can desynchronise from.

---

## D-12 · MINOR — the container class is a phantom; the hidden face resolves against the wrong box

`ActionBarLayer.vue:101` names its container `dock-layer-grid`. Measured computed style:

```
display: "block"   position: "static"   gridTemplateColumns: "none"   overflow: "visible"
```

`grep -rn "dock-layer-grid"` across the repository and `node_modules/@mkbabb/glass-ui/` returns
**exactly two hits, both in this file** (`:91` and `:101`). The class has zero rules. It is named
"grid" and is a block box; its children carry `grid-area: 1 / 1` (inherited from the producer's
`.dock-layer` rule) which is inert in a block container.

The consequence is geometric, not cosmetic. `layers.css` gives
`.dock-layer:not(.is-active) { position: absolute; inset: 0; }`, and because `.dock-layer-grid`
sets no `position`, the containing block resolves upward:

```
offsetParentOfInactive: "DIV.dock-face is-active"
```

| element | x | width |
|---|---:|---:|
| `.dock-layer-grid` (container) | 634.0 | **184.0** |
| active sub-layer | 634.0 | 184.0 |
| **inactive sub-layer** | **569.0** | **302.0** |
| **leaving sub-layer (t=32…246)** | **499.0** | **443.0** |

The hidden face is sized to the **outer dock face**, overhanging its own container by 65 px left
and 53 px right — i.e. it spans the Back control and the toggle. While `is-leaving` it is
`visibility: visible` with `opacity: 0`, so for 260 ms an invisible 443 px composited overlay
covers the dock's live controls. Glass-ui carves a special `.is-press-keepalive` rule for exactly
this hazard on its own layers; this consumer gets no such protection because it is not a real
producer layer (D-15).

Corroborated independently by pass 1 (C-3), which measured 519.7 / 400.5 at a different dock width
— the same defect at a different content measure.

---

## D-13 · MINOR — the action cluster is optically off-centre in its own band

Measured glyph centres, desktop light, DPR-2 crop converted to CSS px
(`D2-desktop-light-actions.png`):

```
←  589.0 │ sep 621.5 │ 650.0  687.5  725.0  762.5  801.5 │ sep 824.0 │ T 850.0
```

| interval | px |
|---|---:|
| interior pitch (×4) | 37.5 · 37.5 · 37.5 · 39.0 |
| separator → first action | **28.5** |
| last action → separator | **22.5** |
| separator → toggle | 26.0 |
| back → separator | 32.5 |

The five-icon cluster carries **28.5 px of air on its left and 22.5 px on its right — a 6 px
asymmetry inside a 37.5 px pitch (16 %)**, and the cluster's end gaps are both far below its own
interior pitch, so the group reads crowded against its boundaries and pushed right.

The cause is compositional: `ActionToolbar.vue:2` uses `justify-around` inside a `flex-1` band
whose width is not set by its own content but by whichever sub-layer is active and by the dock's
fit-content measurement. `justify-around`'s half-gap-at-the-ends only balances when the items are
equal-width; these are 24 px glyphs in variable seats inside a stretched band.

`PROPORTION-AUDIT.md:5` — "Every element earns its scale, interval, boundary and material from
its job relative to the local protagonist" — is not satisfiable by a distribution mode that
derives interval from leftover space.

**Cure.** The action run is a rhythm, so it should be a fixed gap (`--dock-layer-gap`, the token
the producer already sets on `.dock-layer`) with the band hugging its content, not `flex-1` +
`justify-around`.

---

## D-14 · MINOR — the focus ring collides with the separator it sits beside

`D2-toggle-focus-ring.png`: with the toggle focused (`matches(':focus-visible') === true`,
`box-shadow` a 2 px dual ring), the ring's circumscribed circle measures ≈ 47 CSS px against a
40 px control in a ~40 px inner band, and its left arc crosses the `DockSeparator` at x ≈ 824.

Two design consequences: the ring reads as a *circle* on a control that has no circular resting
seat (the dock's resting shape is a capsule), and it overlaps a boundary element, so the focused
state and the grouping boundary compete in the same pixels.

`VISUAL-CONSTITUTION.md:82` — "Text, focus, boundaries and state meet their rendered contrast on
the actual material tier; a token name is not evidence." Boundary and focus are colliding on this
tier.

**Cure.** The toggle needs the producer's touch-target seat (D-8) so the ring has room, and the
separator needs the dock's own gap rather than sitting flush.

---

## D-15 · MINOR — the file speaks the producer's private layer vocabulary from a consumer

`ActionBarLayer.vue:91` applies `dock-layer`, `is-active` and `is-leaving` to arbitrary consumer
components. Those are `@mkbabb/glass-ui`'s **internal** shell-pane classes: `layers.css` styles
them via `:where(.glass-dock, .dock-layer-group) .dock-layer`, an unbounded descendant selector,
so the consumer's children silently acquire the producer's entire layer contract — `display:flex`,
`grid-area`, `min-height: var(--dock-layer-height)`, `white-space: nowrap`, `gap`, the
absolute/relative flip, **and** the morph stagger rule
`.glass-dock[data-morphing] .dock-layer.is-active > * { opacity: var(--child-reveal); scale: calc(0.82 + 0.18 * …) }`.

That last one is the sharp edge: during any dock expand/collapse morph the five ActionButtons are
staggered as children of *this* pseudo-layer while the whole run is already being staggered as a
child of the real `.dock-face` above it — a nested opacity/scale multiplication that no one
designed. (Labelled a **hypothesis** for the rendered result: I confirmed the selector applies and
the class is present; I did not capture a frame mid-`[data-morphing]`.)

This is the **no-legacy / design-system-boundary** edict in its purest form: the file reaches past
glass-ui to hand-roll what glass-ui provides, and pays for it by adopting private CSS as a public
contract. It is also why D-12's containing-block bug exists at all — a real `<DockLayer>` inside a
real `<DockCrossfade>` gets `position: relative` on its host by construction.

---

## D-16 · MINOR — dead public surface: three refs, one exposure, one prop, one method, all unread

| declared | consumer |
|---|---|
| `colorInputRef` (`:28`, bound `:116`) | **none** — and it is exactly the handle D-6 needs |
| `actionToolbarRef` (`:29`, bound `:103`) | **none** — and `ActionToolbar` exposes `clearHover()` (`ActionToolbar.vue:91`) that is never called, so a hovered action can stay lit after the layer swaps away |
| `defineExpose({ currentToggleIcon, toolbarMode, cycleToolbarMode })` (`:96`) | **none** — `Dock.vue:156` mounts this component with no `ref` |
| `:can-propose-name` passed at `:106` | **none** — `ActionToolbar.vue:72` declares the prop and never reads it |

Verified by `grep -rn` across `demo/` and `e2e/`: the only occurrences of each identifier are its
declaration and its binding.

Two idioms also coexist in 158 lines: `ref<InstanceType<…>>` template refs at `:28–29` versus
`useTemplateRef` at `:83` — against the standing **idiomatic Vue 3.5** edict, which the file
itself half-follows.

`PROPORTION-AUDIT.md:71` (law 6): "Subtraction precedes explanation." A public surface with no
consumer is not an affordance; it is a promise the component cannot keep.

---

## D-17 · INFO — `stroke-foreground` breaks the `currentColor` chain forced-colors relies on

`demo/styles/foundation.css:665–700` documents the house WHCM policy: chrome stays at
`forced-color-adjust: auto` "so it is visible + operable", with a `Highlight` outline restored on
focus. That policy works because lucide icons paint `stroke="currentColor"` and WHCM forces
`color`.

`ActionBarLayer.vue:138` applies `stroke-foreground`, i.e. `stroke: var(--foreground)` — an
explicit stroke that overrides `currentColor` and that WHCM does **not** force (custom properties
are not force-adjusted). Its siblings do not do this: `Dock.vue:154` renders the Back arrow as
`class="w-6 h-6"` with no stroke class, so Back adopts `ButtonText` and the toggle does not.

Measured under `forcedColors: "active"` emulation:

```
.toggle-btn  stroke: "rgb(28, 25, 23)"   --toggle-hover-color: "oklch(51.9% 0.208 9.83deg)"
```

The author stroke and the author accent both survive the media query
(`D2-forced-colors-emulated.png`).

**Labelled a hypothesis for the paint:** Playwright/WebKit emulates the media query without
applying a real forced palette, so I proved the *mechanism* (the `currentColor` chain is broken at
source, asymmetrically with its own siblings) but not the rendered black-on-black. A real WHCM
host is needed to close it.

---

## Canon judgement

| Authority | Row | Verdict |
|---|---|---|
| `PROPORTION-AUDIT.md:60` | **PR-16** — the ⋮ "keeps a named menu purpose plus expanded state or is removed" | **VIOLATED** (D-10): no menu purpose, no expanded state, and a glyph collision with the real menu in the same dock |
| `PROPORTION-AUDIT.md:72–73` | laws 7–8 — glyph size, target size and reservation are separate; rendered relation beats token intent | **VIOLATED** (D-8): glyph +20 % over token, target −9 % under token, both from one instance utility |
| `PROPORTION-AUDIT.md:71` | law 6 — subtraction precedes explanation | **VIOLATED** (D-16): four unread surfaces |
| `PROPORTION-AUDIT.md:5` | proportion is relational; interval is earned | **VIOLATED** (D-13): 6 px cluster asymmetry from `justify-around` on a stretched band |
| `VISUAL-CONSTITUTION.md:141` | §6 — "no … dock collapse" | **VIOLATED** (D-1): measured 254.7 × 59.5 → 28.1 × 64.7, no active face |
| `VISUAL-CONSTITUTION.md:144` | §6 — reduced motion resolves directly to final geometry | **VIOLATED** (D-7): 260 ms late, unarmed JS timer |
| `VISUAL-CONSTITUTION.md:129` | §5.2 — horizontal dock roving focus | **VIOLATED** (D-2): no rail, and in WebKit no tab stop at all |
| `VISUAL-CONSTITUTION.md:115` | §5.1 — open/close focus law | **VIOLATED** (D-6): one leg focuses, the other drops to `<body>` |
| `VISUAL-CONSTITUTION.md:30` | §2 — the dock band is reserved | **VIOLATED in the inline axis** (D-5): ±70 px per swap |
| `VISUAL-CONSTITUTION.md:82` | §4 — focus and boundaries meet rendered contrast on the real tier | **VIOLATED** (D-14): ring crosses the separator |
| `PALETTE-CONTRACT.md` | — | **NOT APPLICABLE.** Read in full: it is the palette *data/API* authority (routes, wire contract, export bytes), not a colour-register authority. It binds nothing on this surface, and citing it here would be noise. |

### Owner edicts

| Edict | Verdict |
|---|---|
| 1 · no god modules | **PASS.** 158 lines, one job; the file is small — it is wrong, not bloated. |
| 2 · no legacy code | **FAIL** (D-4, D-15). The shim *is* a compatibility layer for a producer API that was superseded, kept alive by a header comment that misstates the producer's surface. `void opts.containerEl; // signature parity with the retired producer composable` (`:67`) is a back-compat shim in one line: a parameter accepted to match a function that no longer exists anywhere. |
| 3 · KISS, no contrivance | **FAIL** (D-3, D-12). A 32-line local composable and an invented container class to reproduce, badly, what one imported component does. |
| 4 · glass-ui is the design system | **FAIL** (D-4, D-8, D-15). Reaches past the system for a content swap, a glyph size and an accent hover the system supplies. |
| 5 · root-level styling | **FAIL** (D-8). `:style="{ '--toggle-hover-color': … }"` and `w-6 h-6` are per-instance overrides of a root that owns both. |
| 6 · animations never deleted, only moved or tokenized | **PASS with a caveat.** No keyframe was removed; but `SUB_LAYER_CROSSFADE_MS = 260` is an untokenized magic duration governing motion, and it animates nothing (D-3). |
| 7 · idiomatic Vue 3.5 | **FAIL** (D-16). `ref` and `useTemplateRef` template-ref idioms coexist in one file. |
| 8 · `verbatimModuleSyntax` | **PASS.** `:5` `import type { ActionBarContext }`, `:9` `import type { EditTarget }`, `:2` `type Ref` inline — all correct. |

---

## State coverage

Enumerating every state this component can occupy, and whether it was designed:

| State | Designed? | Evidence |
|---|---|---|
| `actions`, populated, desktop | yes | `D2-desktop-light-actions.png` |
| `input`, desktop | yes, but the box is unreserved | D-5 |
| `propose`, desktop | partly — reachable, unexitable-by-predicate | D-11 |
| **mid-swap (`is-leaving`)** | **no** — a 443 px invisible overlay over live controls for 260 ms | D-3, D-12 |
| **focused** | **no** — no tab stop in WebKit; ring collides with the separator | D-2, D-14 |
| hovered | partial — unguarded `:hover` latches on touch | D-9 |
| pressed / active | producer-supplied (`--dock-press-t`), not designed here | — |
| **selected / current mode** | **no** — no `aria-pressed`/`aria-expanded` on a 3-state control | D-10 |
| disabled | n/a for the toggle; `ActionToolbar` disables two actions on `isEditing` | `ActionToolbar.vue:44,57` |
| loading | n/a here (`ColorInput` owns `proposing`) | — |
| error | delegated to `ColorInput`'s `.error-badge` | — |
| **empty** | **no** — `GenericActionBar` (the else branch) renders no toggle and no trailing separator, so the layer is visually asymmetric between its two branches | `Dock.vue:156–157` |
| overflowing / truncated | untested; `input` at 325 px already exceeds the 227 px mobile face | D-1 |
| **mobile** | **no — and hostile**: unmounted, trigger live in the a11y tree, activation collapses the dock | **D-1** |
| **reduced-motion** | **no** — timer unarmed | D-7 |
| **forced-colors** | **no** — `currentColor` chain broken asymmetrically | D-17 |
| zoom 200 % | not captured (matrix has no action-bar state) | coverage note |
| RTL | not captured. The flex row and `inset: 0` mirror correctly; `--vj-morph-x` is `0px` so the icon morph is direction-neutral. **No defect found, but no positive proof either.** | — |

**Eleven** states are unhandled, unstyled or actively broken. Three of them (mobile, focused,
reduced-motion) are BLOCKER-class.

---

## The negative — what I could not fault

Stated so the verdict is not mistaken for indiscriminate condemnation:

- **`verbatimModuleSyntax` is clean.** All three type-only imports are `import type`
  (`:2`, `:5`, `:9`).
- **The `inert` binding is correct.** Measured: the inactive sub-layer carries `inert` and its
  descendants report `inert: true` up the chain; the active one does not. The a11y tree is not
  polluted by the hidden face — the failure at D-1 is the *trigger's*, not this binding's.
- **`aria-label` on the toggle is present and mode-accurate** (`Open color input` /
  `Propose color name` / `Close input` / `Close propose`) — added deliberately at E.W3 Lane A and
  correct as far as naming goes. The defect (D-10) is the missing *state*, not a missing name.
- **The provide/inject seam is sound.** `provide(COLOR_MODEL_KEY, actionBar.colorModel)` at `:22`
  is a genuine re-scoping so `ColorInput` reads the action bar's model rather than the ambient
  one — not a shim.
- **It is not a god module.** 158 lines, one responsibility. The problem is that the one
  responsibility is discharged against a mechanism that does not exist.
- **No animation was deleted.** The `vj-morph` icon transition is on the sanctioned family with
  only geometry parameterised (`--vj-morph-scale: 0.7`, `--vj-morph-y: 0px`) — exactly what
  `animations.css:62–65` permits a consuming site to do.

---

## Strongest single defect

**D-1.** A control that is invisible, unhittable and untabbable — but still named, focusable and
present in the accessibility tree — points at a layer that is not mounted on mobile. Activating it
through assistive technology collapses the entire application dock to an empty 28 × 65 px sliver
with every face inert and no active face, destroying view navigation, login and account access
with no recovery short of a reload. `VISUAL-CONSTITUTION.md:141` forbids precisely this outcome by
name. It is measured, exactly reproducible, and it is a design failure rather than a coding slip:
the component's presence and its trigger's presence were never made one fact.

---

## Cure, in one architectural move

Every finding except D-1, D-9, D-10, D-13 and D-16 dissolves in a single transposition:

```
- the 32-line local useLayerTransition + subLayerProps + the .dock-layer-grid container
+ <DockCrossfade :active="activeSubLayer" reserve="inline">
+     <DockLayer id="actions"> … </DockLayer>
+     <DockLayer id="input">   … </DockLayer>
+ </DockCrossfade>
```

from `@mkbabb/glass-ui/dock` — the specifier line 8 already imports from. That one move buys the
real opacity overlap on the dock's own spring (D-3), a measure-once inline reserve that stops the
±70 px displacement (D-5), the producer's focus transfer off a dissolving face (D-6), a
reduced-motion arm that is a media fact rather than a timer (D-7), correct containing blocks
(D-12), and the end of consumer-side use of the producer's private CSS (D-15). The remainder are
seat-level: adopt the dock's glyph/touch tokens at the root (D-8), guard the hover register (D-9),
give the toggle one meaning and an expanded state (D-10), give the action run a token gap instead
of `justify-around` on a stretched band (D-13), and delete the four unread surfaces (D-16).

D-1 and D-2 are not cured by that move and must be designed: a mobile action bar that exists, and
a dock control run that answers `VISUAL-CONSTITUTION.md:129`'s roving-focus law.

**Relay consequence.** Glass-ui relay O-6 mark M2 ("please ship a public content-swap composable")
should be **withdrawn as already-answered by 7.0.0**, and the `CARRY-LEDGER §F` row should move
from "retire at W47 if glass ships a successor" to **"retire unconditionally — the successor
shipped."**

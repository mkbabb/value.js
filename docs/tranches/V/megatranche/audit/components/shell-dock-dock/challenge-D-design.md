# CHALLENGE-D — `demo/shell/dock/Dock.vue` — the design is flawed (r3)

**Round 3, 2026-07-27, live at HEAD `7cae8bd0`.**
Round 1 (`challenge-D-design.r1-2026-07-24.md`) and Round 2 (`challenge-D-design.r2-2026-07-27.md`,
written at HEAD `6085965e`) are preserved verbatim in this directory. This round **supersedes** r2.

It exists for four reasons:

1. It **overturns r2's D-22**, the finding r1 and r2 both carried as the component's most confident
   negative ("the wax seal has never been observed rendering"). The seal renders. Its precondition
   is not elapsed time — it is *pointer history*. The corrected finding is worse than the one it
   replaces.
2. It **fuses r2's D2-03 and r1's D-4 into one collision**, with a hit-test: the surface the
   constitution retires is painted on top of the surface that lost its capability, at the same
   coordinates, on every mobile-grammar viewport.
3. It adds the **picker-route arm** of the action-bar loss (r2 proved the gradient-route arm) with a
   four-viewport state matrix.
4. It adds four defect families r1 and r2 did not reach: the absent roving-focus law, the mobile
   touch floor, the broken overflow-menu row, and the action-bar layer's seizure of navigation
   identity.

Findings r1/r2 already established and that I re-measured true are listed in §6 and not re-argued.

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. Served, not inherited. Seat: CHALLENGE-D (design), component
`demo/shell/dock/Dock.vue` (360 lines, area `demo/shell`), repository
`/Users/mkbabb/Programming/value.js`, branch `tranche-u`.

*(Task prompt named HEAD `c654824e`; the working tree is four commits ahead at `7cae8bd0`. All live
measurements below are against `7cae8bd0`, and all source line numbers were verified at it.)*

---

## 1. Verdict

**DEFECTIVE.** One BLOCKER, six MAJORs and four MINOR/INFO new in r3; one r2 finding **overturned**;
the r1/r2 corpus otherwise confirmed.

The dock is the only component every user sees on every route. It is designed as if the mouse-driven
1440 px desktop were the product and everything else a degradation. Three of the four thresholds it
branches on disagree with each other; the fourth — pointer history — is not a threshold at all, and
it decides whether the app's navigation is visible.

The strongest defect in this round is one sentence:

> **The retired-by-law `PaneSegmentedControl` is painted directly on top of the Tools control, and
> the Tools control underneath it has already been emptied of its capability. Two of this
> component's known defects are the same 30 px of screen.**

---

## 2. Method

| Source | What it gave |
|---|---|
| `…/megatranche/audit/visual/REPORT.{md,json}` | 60 Safari captures; `smallTapTargets`, `namelessButtons`, `h1`, `main` rows; per-route console/page errors |
| `…/visual/shots/**` read as images | `safari-desktop-{light,dark}/picker.png`, `safari-mobile-{light,dark}/{picker,palettes}.png`, `rtl-desktop/picker.png`, `zoom-200-desktop/picker.png`, `forced-colors-desktop/picker.png` |
| **9 fresh Playwright/WebKit probes** against the live dev server `http://localhost:9000` | every number marked *(measured)* below |
| Canon | `VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`, `reformation/CARRY-LEDGER.md:22` |

Probe sources (session scratchpad, untracked): `dockprobe{1..9}.mjs`. Frames captured by them and
read back as images, copied into this directory as evidence:
`collision-1024x1366.png`, `state-tools-desktop.png`, `state-mobilemenu.png`.

Shell-wide intersection of the harness's tap-target rows across all 15 routes × 4 matrices
*(measured)* — this is what "shell-level" means numerically:

```
safari-desktop-light : input 160×23 (no name) · button 22×22 "Switch to slug"
                       · 22×22 "Generate new slug" · 22×22 "Cancel"
safari-mobile-light  : input 160×20 (no name) · button 23×23 ×3 (same three)
```

---

## 3. BLOCKER

### D3-01 · The retired pane switcher is painted on top of the emptied Tools control

**The constitution retires `PaneSegmentedControl` outright.** `VISUAL-CONSTITUTION.md:89`: *"V
retires the global Dock `PaneSegmentedControl` and left/right view state."* §3 law 6: *"no global
pane selector, left/right split state, or simultaneous two-stage miniature survives."*
`CARRY-LEDGER.md:22` gives W47 the gate `PaneSegmentedControl 1→0`. It is still mounted at
`Dock.vue:197-204`.

**The Tools control it covers has already lost its capability.** Four-viewport state of
`.action-bar-toggle-slot` on `/#/`, all after 6.5 s settle *(measured, `dockprobe9.mjs`)*:

| viewport | `data-layout` | slot class list | slot width | slot opacity | Tools `tabindex` | Tools rect |
|---|---|---|---|---|---|---|
| 390×844 (iPhone 14 Pro) | mobile | `action-bar-toggle-slot` | `0px` | `0` | `-1` | 33×33 @153 |
| 720×900 (= 1440 at 200 % zoom) | mobile | `action-bar-toggle-slot` | `0px` | `0` | `-1` | 32×32 @298 |
| 1024×1366 (portrait tablet) | mobile | `action-bar-toggle-slot` | `0px` | `0` | `-1` | 101×32 @409 |
| 1440×900 | desktop | `action-bar-toggle-slot **is-visible is-live is-settled**` | `125.52px` | `1` | `0` | 105×32 @626 |

**And the two occupy the same coordinates.** `document.elementFromPoint()` at the Tools button's own
centre *(measured, `dockprobe4.mjs · A`, `dockprobe7.mjs`, `dockprobe9.mjs`)*:

```
390×844      tools [153,186] · switcher [156,260] · elementFromPoint → DIV.segmented-indicator · toolsReachable=false
720×900      tools [298,330] · switcher [300,442] · elementFromPoint → DIV.segmented-indicator · toolsReachable=false
1024×1366    tools [409,510] · switcher [398,540] · elementFromPoint → DIV.segmented-indicator · toolsReachable=false
1440×900     tools [626,731] · switcher display:none · elementFromPoint → SPAN.text-small font-display · toolsReachable=true
```

Both boxes are `position: static`, `z-index: auto` *(measured)* — this is not a stacking decision, it
is two siblings laid out on top of each other. At 1024×1366 the overlap is 101 px of a 101 px
control: **100 %**. `collision-1024x1366.png` is the rendered band; there is no paintbrush glyph
anywhere in it.

**Root cause of the emptying**, `demo/color-picker/App.vue:322-328`:

```
// Ref-capture callbacks for desktop pane slots …
function onDesktopLeftMount(el: any) {
    const left = currentConfig.value.left;
    colorPickerRef.value = left === "color-picker" ? el : null;
```

`colorPickerRef` is written only by the **desktop** slot's mount callback. `App.vue:38` feeds
`:action-bar="colorPickerRef?.actionBarContext ?? null"` into the dock, so on every mobile-grammar
viewport it is structurally `null`, `Dock.vue:41`'s `hasAnyActionBar` is `false`, and the slot
collapses to `0px / opacity 0 / tabindex -1`.

**Consequence.** The picker's whole action region — `Reset color`, `Copy color`, `Random color`,
`Palettes`, `Extract palette`, `Open color input` *(the seven live controls I measured in the
desktop Tools layer, `dockprobe5.mjs`)* — does not exist below 1024 px, **including for a desktop
user at 200 % browser zoom**. The mobile `⋮` menu offers only `Login`, `Share color`, `GitHub`,
`Dark mode` *(measured)*. `VISUAL-CONSTITUTION.md:182` — *"Copy lives once in the action region"* —
and `PROPORTION-AUDIT.md` PR-13's terminal `action Copy 1→1` are both `0` on a phone.

**Reproduction.** Open `http://localhost:9000/#/` at any width < 1024 px; the pill shows
`Home ˅ | Picker About | ⋮` and no Tools control. At 1024×1366 it additionally shows `Login` and
`@mbabb` (see D3-04) while the pane switcher covers where Tools would be.

**Cure (gestalt, not patch).** The action set is a *capability of the route*, not a property of a
desktop DOM node. Publish it through the existing `provide`/`inject` seam the dock already uses for
four other concerns (`VIEW_MANAGER_KEY`, `SESSION_PORT_KEY`, `CSS_COLOR_KEY`, `SAFE_ACCENT_KEY`) and
delete `colorPickerRef` and both `?? null` prop hops. Then execute W47's `PaneSegmentedControl 1→0`.
The collision cannot recur, because one of the two colliding surfaces stops existing and the other
stops being conditional.

---

## 4. MAJOR

### D3-02 · **Overturns r2 D-22.** The wax seal does render — its gate is pointer history, and the collapsed rest state hides the entire navigation

r1 and r2 both concluded the collapsed seal is unreachable; r2 §7 records *"it did not render after
7 s idle at 1440×900 with `collapse-delay="5000"`"* and r2 §8 files the state as **unwitnessed**.
That conclusion is an artifact of never moving the mouse.

*(measured, `dockprobe2.mjs`, `dockprobe3.mjs`, `dockprobe4.mjs · C`)*

```
fresh load, no pointer, 7 s idle      →  .glass-dock … expanded    pill 471×62
fresh load, no pointer, 20 s idle     →  .glass-dock … expanded    pill 471×62
mouse to (700,45) then (700,700), 7 s →  .glass-dock … COLLAPSED   pill 56×56 · .dock-seal 40×40 · opacity 1
same, but with prior focus() inside the dock → .glass-dock … expanded
```

So the dock has **two resting geometries for one idle page**, selected by whether a pointer has ever
crossed it. The collapsed rest is a 56 px unlabelled circle; the four operable controls
(`Select view`, `Toggle action bar`, `Login`, `@mbabb`) are all gone from it.

That is a direct read against `VISUAL-CONSTITUTION.md:178` — *"The dock is its own top band, fully
visible, focusable, and clipped by neither mask nor card"* — and against `PROPORTION-AUDIT.md`
PR-07, whose terminal verb for *"hover-only/unlabeled controls"* is **ADD-AFFORDANCE / REMOVE**.
After the first hover, the entire navigation of the application is a hover-only affordance.

The one law it does honour: `.dock-band` height is a constant `72 px` at every viewport and in both
geometries *(measured, `dockprobe2.mjs`)*, so §3 law 4 (*"Expanded/collapsed/mounted states do not
move the scene below it"*) holds.

`Dock.vue:132` — `:collapse-delay="5000" :start-collapsed="false"` — is the site. `5000` is an
untracked magic number; §6 requires *"one producer-owned glass-ui spring register"* for the dock's
motion vocabulary and this dwell sits outside it.

**Cure.** Decide one resting state and make it unconditional. If the seal is the rest,
`start-collapsed` is `true` and the seal becomes a π frame the tranche has never captured; if the
pill is the rest, delete `collapse-delay`, the `#collapsed` slot, `.dock-seal*` and the ~95 lines of
essay above them. What cannot stand is a rest state chosen by input device.

### D3-03 · The dock implements none of §5.2's horizontal roving-focus law

`VISUAL-CONSTITUTION.md:129` is explicit and names this component:

> `horizontal Dock/rail roving focus` — *Right moves to the visual-right item; Left to visual-left …
> Home=first semantic item, End=last; activation is separate from movement.*

*(measured, `dockprobe4.mjs · B`, 1440×900)*: focus `Select view` → `ArrowRight` → focus is still
`Select view`; → `Home` → focus is still `Select view`. Neither key moves anything. `Dock.vue` binds
no `keydown`, and neither does the `DockLayerGroup` consumer surface here.

r2's negative proof established that the tab order is clean (4 stops, no phantoms) — correct, and it
is not the law in question. The dock is a horizontal rail of peer controls presented as four
independent tab stops, with no `Home`/`End`, no arrow traversal, and no separation of movement from
activation.

**Cure.** Roving focus is rail behaviour, so it belongs to the producer's `GlassDock`/`DockLayer`
group, not to a `keydown` handler grafted onto `Dock.vue` (edict 4). File it as a glass-ui ask and
consume it.

### D3-04 · Three responsive predicates in one component, and the shell's own comment says the third was already deleted

*(this sharpens r2 D2-03 with the source-comment contradiction and the rendered frame)*

| predicate | where | tests |
|---|---|---|
| `isDesktop` | `Dock.vue:71` `useMediaQuery("(min-width: 1024px)")` | width only |
| `[data-layout]` | `demo/styles/shell.css:111-124` | width **and** aspect ≥ 1.1 |
| `lg:hidden` / `hidden lg:flex` | `MobileMenuDropdown.vue:38`, `ProfileSection.vue:48,127`, `ActionBarToggle.vue:84,100` | width only |

`shell.css:100-110` states why the second exists:

> *"a portrait tablet ≥ 1024 px wide (aspect < 1.1) stamps `data-layout="mobile"` … the retired
> D6-03 portrait pathology needed a width-only `lg:hidden` display exception here; the stamp
> dissolves it … a media wrapper would re-introduce the width-only disagreement the stamp exists to
> retire."*

The dock never adopted it. At 1024×1366 *(measured, `dockprobe2.mjs`)* the stamp says `mobile` and
the `lg:` utilities say desktop, so the pill renders **both grammars at once**:

```
.dock-mobile-panes             141×39 @398   (mobile grammar, from the stamp)
ProfileSection "Login"          83×28 @563   (desktop grammar, from lg:flex)
ProfileSection "@mbabb"         73×28 @669   (desktop grammar)
dock-separator hidden lg:block   1×28 @398   (desktop furniture, under the mobile switcher)
```

`collision-1024x1366.png` renders it: `Home ˅ | Picker About | Login | @mbabb`, with the desktop
separator buried beneath the mobile switcher's left edge and Tools buried beneath its middle. A
fourth threshold, `@media (max-width: 639px)`, lives at `PaneSegmentedControl.vue:46-51`.

**Cure.** One `useLayoutMode()` derived from the `[data-layout]` stamp, injected; delete
`Dock.vue:71` and every `lg:`/`sm:` display utility in the dock subtree.

### D3-05 · Every operable control in the mobile dock is below the touch floor, while the menu it opens is not

*(measured at 390×844, `dockprobe5.mjs`)*

```
dock, at rest:   Select view 59×33 · Toggle action bar 33×33 · Picker 49×26 · About 49×26 · Menu 43×33
menu it opens:   Login 44 · Share color 44 · GitHub 55 · Dark mode 44
```

Every dock control is 26–33 px tall; every row of the dropdown it opens is ≥ 44. The component sets
the correct floor for its secondary surface and misses it on its primary one. The smallest control
in the app's primary navigation — 49×26 — belongs to the `PaneSegmentedControl` that D3-01 says
should not exist, and its 26 px height is produced by that component's own
`@media (max-width: 639px)` compaction (`PaneSegmentedControl.vue:46-51`).

`PROPORTION-AUDIT.md` §5 law 7 and PR-12 give the shape of the answer, and it is not bigger glyphs:
*"Visual glyph size, operable target size and layout reservation are separate quantities …
Invisible/seat geometry preserves target floor while optics follow rung."* The `compact` DockControl
variant as consumed here provides no such seat — the same mechanism produces the shell-wide 22×22
slug controls in the intersection table in §2.

**Cure.** A producer-side seat token on the compact register (hit-seat at the floor, optics
unchanged), consumed everywhere; not a per-site padding bump.

### D3-06 · The mobile overflow menu has a broken row and a material that lets the page read through the copy

`state-mobilemenu.png`, 390×844 *(captured live)*. Two defects in one frame:

1. **`GitHub` wraps.** Its icon renders on one line and its label on the next; measured height
   **55 px** against 44 for the three sibling rows *(measured, `dockprobe5.mjs`)*. Every other row
   is icon-then-label inline. This is a layout break, not a density choice.
2. **The menu's glass reveals the page's own numerals through the option text.** The picker's `88.8`
   and `20.0` are legible *behind* `Share color` and `GitHub`. `VISUAL-CONSTITUTION.md:19` —
   *"Glass earns its blur by revealing live content; otherwise it is a neutral well"* — is satisfied
   in the letter and violated in the effect: what the blur reveals here is the very content the menu
   is covering, at a scale that competes with the option labels. §4.1's first clause governs:
   *"Text, focus, boundaries and state meet their rendered contrast on the actual material tier."*

The same frame shows the third defect r2 recorded as D-20: the option labels render at a display
rung, not §4's `text-small` control copy.

**Cure.** The menu is `demo/ui/dropdown-menu` (`MobileMenuDropdown.vue:9-12`) — a demo-local
primitive where glass-ui owns the surface (edict 4). Move the composition onto the producer's menu
tier, whose veil/well decision is already made, and the row layout, the type rung and the material
resolve together.

### D3-07 · Opening the action bar deletes the dock's navigation identity

*(measured, `dockprobe5.mjs`, 1440×900; frame `state-tools-desktop.png`)*

Click `Toggle action bar`. The pill goes 471×62 → **326×62** and re-centres. The live control set
becomes:

```
Back 40×40 | Reset color 32×32 | Copy color 32×32 | Random color 32×32 | Palettes 32×32 | Extract palette 32×32 | Open color input 40×40
```

`Select view`, `Login` and `@mbabb` are gone. The persistent chrome stops being persistent: while the
action bar is open there is no route control, no identity and no account affordance, and the only
exit is one unlabelled `←`. `VISUAL-CONSTITUTION.md:178` requires the opposite — *"Direct route
changes keep its full navigation identity."*

Two further reads on that frame: seven adjacent icon-only controls with zero visible labels is
exactly PR-07's *"hover-only/unlabeled controls"* species, and they sit at **two** size rungs in one
row (40 px `DockControl` bookends around 32 px `ActionButton` middles) — PR-06's *"three adjacent
action species"* family, at two.

**Cure.** §7's own ruling for the sibling case applies: the action bar is a region *of the route*,
not a layer that evicts the chrome. Render it in the scene's action region (which §3.1 already
allocates for every member composition) and the dock keeps its four navigation seats at all times.

---

## 5. MINOR / INFO

### D3-08 · MT-F005's nameless button, enumerated

The single nameless button the harness reports on desktop and never on mobile *(measured,
`dockprobe1.mjs`)*:

```
{ inNav: true, cls: "send-btn btn-interactive", rect: 24×24 @916,28, visibility: "hidden" }
```

`demo/shell/dock/ColorInput.vue:69` and `:78` — two `<button class="send-btn btn-interactive">` with
no `aria-label` and no text child. It sits inside the dock's `Open color input` layer, which exists
only in the desktop action bar; hence desktop-only, matching MT-F005 exactly. (r2 reached the same
file by pattern; this is the enumerated element.)

### D3-09 · The self-referential barrel: one producer, two import paths, in adjacent lines

```
Dock.vue:4   import { GlassDock, DockLayerGroup, DockLayer } from "./";
Dock.vue:5   import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";
index.ts:2   export { GlassDock, DockLayerGroup, DockLayer } from "@mkbabb/glass-ui/dock";
index.ts:5   export { default as Dock } from "./Dock.vue";
```

Five symbols from one producer package reached by two different paths on consecutive lines, and the
indirect path closes a module cycle (`index.ts` → `Dock.vue` → `index.ts`). Edict 2 (no dual paths),
edict 3 (KISS). Delete line 4 and import all five from `@mkbabb/glass-ui/dock`.

### D3-10 · `Dock.vue` is a two-root SFC; the second root is band chrome

`Dock.vue:128` opens the dock wrapper and `Dock.vue:293` mounts `<DockStatusLamp />` as a **sibling
root**. Multi-root disables attribute fallthrough, and a component named `Dock` emits both the dock
and an unrelated band instrument. The lamp is dev-gated (`DockStatusLamp.vue:30`
`import.meta.env.DEV`) and currently renders `dev misconfigured — run \`npm run dev\`` at `218×11`,
`rgb(219,36,36)`, `opacity 1`, `visibility visible` *(measured at 1440 and at 390)*. At 390 it is
`position: absolute; inset-inline-end: 0` inside a band whose ancestor clips overflow, so it renders
clipped at the viewport edge — visible in `state-mobilemenu.png`, top right.

### D3-11 · Forced colors remains a false green in the state matrix

`shots/forced-colors-desktop/picker.png` read as an image is a full-colour render, identical in
character to `safari-desktop-light/picker.png`: WebKit does not emulate `forced-colors`. Every
forced-colors obligation in `VISUAL-CONSTITUTION.md:82-84` (*"Selected, failed, pending, withdrawn
and disabled states are never color-only"*; *"Focus remains visibly distinct from selection … forced
colors"*) is therefore **unverified for this component by any seat, in any round**. I confirm r2's
§6 gap and record the reason.

---

## 6. Carried and re-measured true

| id | finding | r3 note |
|---|---|---|
| r2 D2-01 / D2-02 | the mobile action bar is dead / the Picker action region does not exist on a phone | confirmed and extended: r2 proved the `/#/gradient` arm (buttons render, do nothing); r3 proves the `/#/` arm (the slot never opens at all) — §3 table |
| r1 D-3 | `h1 = 0` on every route and matrix | re-measured live at 1440 and 390: `{ h1: 0, main: 1, nav: 1 }`. `App.vue` contains no `<h1>` at all. `Dock.vue:167-175`'s `onViewChange` switches the view with no focus move and no announcement — §5.1's *"destination H1 with temporary `tabindex="-1"`"* has no target. `CARRY-LEDGER.md:22` W47 `main/H1/active-subtree = 1` is one-third RED |
| r1 D-4 | the retired `PaneSegmentedControl` is still mounted | now the other half of D3-01 |
| r1 D-6 | two names for one route, both on screen | `Home` (view-select) and `Picker` (pane switcher) render simultaneously in the same 255 px pill at 390 — `safari-mobile-light/picker.png`; `<title>` says a third thing, `"… — Color Picker"` |
| r1 D-21 / r2 D2-06 | seed tint in the structural-glass tier, and dark annihilates it | re-measured both schemes: light `Tools` = `oklch(0.470927 0.188343 9.834023)`, `Login` = same; dark `Tools` = `oklch(0.958322 0.021053 9.834023)` = `--accent-view`. Neutral controls: light `Home` `color(srgb 0 0 0 / 0.8)`, `@mbabb` `oklab(0 0 0 / 0.7)`. §7 requires neutral *in both schemes*; the component is chromatic in one and neutral in the other, so it is two designs. `Dock.vue:163-166` documents the deviation as intent — *"that voice stays on Tools/Login, the app chrome"* |
| r2 D2-07 | RTL: `mbabb@`, unmirrored arrows | confirmed in `shots/rtl-desktop/picker.png`: the handle renders `mbabb@` (§6.1 requires LTR-isolated IDs) and `ActionBarToggle.vue:3,101` hard-codes `ArrowRight`, so the disclosure affordance points away from its content in RTL |
| r2 D2-15 / D2-16 | two template-ref idioms; `?? null` re-spellings | confirmed: `Dock.vue:60` pre-3.5 `ref<InstanceType<…>>` against `Dock.vue:74` `useTemplateRef` (edict 7); `Dock.vue:39-40` two computeds that only coerce `undefined → null` (edict 2, masking fallback) |
| r1 D-13 | per-instance ink overrides on producer controls | confirmed: `Dock.vue:143` `:style="{ color: safeAccent }"` on a `<Check>` inside `DockControl`; `ActionBarToggle.vue:96,98` the same on both icon and label (edict 5) |
| r2 §6 | reduced motion genuinely honoured; no page errors; landmarks `main:1 nav:1`; `verbatimModuleSyntax` clean; `vj-settle` global at `animations.css:170` and only the class local (`Dock.vue:301-303`) | re-checked, all true. `Dock.vue:22-24` are the only type-only imports and all use `import type` |

**One r2 claim I could not reproduce and am not carrying:** r2 §6's *"no phantom tab stops"* is true,
but it rests on a selector that admits `button[tabindex="-1"]`. My first pass made the same mistake
and briefly read the mobile Tools button as a phantom focus stop; `dockprobe9.mjs` shows
`tabindex="-1"`, so it is not. Recorded so a later round does not re-file it.

---

## 7. State coverage — r3 deltas only

| State | r2 | r3 | note |
|---|---|---|---|
| **collapsed (wax seal)** | unwitnessed | **✖ handled wrong** | D3-02 — it renders, gated on pointer history; the collapsed rest hides all navigation |
| **keyboard traversal (arrows / Home / End)** | not assessed | **✖** | D3-03 — §5.2's rail law is unimplemented |
| **portrait tablet** | ✖ | ✖ **+ occlusion** | D3-01 / D3-04 — 100 % of the Tools control covered; hit-test confirms |
| **zoomed 200 %** | partial | **✖** | D3-01 — a desktop user at 200 % loses six actions, not just a chrome variant |
| **touch targets, at rest** | not assessed | **✖** | D3-05 — 26–33 px throughout the mobile dock |
| **overflow menu, populated** | not assessed | **✖** | D3-06 — `GitHub` row wraps to 55 px; page numerals read through the copy |
| **action-bar layer, active** | measured for the *edit* layer (D2-10) | **✖** | D3-07 — navigation identity deleted, pill −145 px |
| forced-colors | untested | untested | D3-11 — reason recorded |

---

## 8. Mechanisms, r3 view

r2 named six. r3 collapses the top of that list into **three**, because the measurements show them
sharing one root:

1. **Capability wired to a desktop DOM node, then hidden behind a second retired surface.**
   D3-01 (= r2 D2-01 + D2-02 + r1 D-4, which are one collision). *Cure: inject the action set;
   execute W47's `PaneSegmentedControl 1→0`. Both halves die together.*
2. **Four thresholds and one non-threshold decide what the dock is.**
   `min-width:1024` (JS) · `[data-layout]` (width+aspect) · `lg:` (width) · `max-width:639` (width)
   · **pointer history** (D3-02). D3-04, D3-05, r1 D-7. *Cure: one injected `useLayoutMode()`; one
   unconditional resting state.*
3. **The consumer re-deriving producer decisions.** Roving focus written nowhere (D3-03); menu tier
   hand-composed in `demo/ui` (D3-06); ink set by inline style (r1 D-13); density set by local token
   override; typography set locally (r2 D-20); two import paths for one package (D3-09). *Cure:
   every one of these is a glass-ui ask; none should exist in `demo/`.*

The dock's own comment layer is now false in at least two places, which is a design signal in its own
right: `Dock.vue:229-268` and `:309-328` (≈ 95 lines) describe a collapsed seal the tranche has never
captured a frame of, and `Dock.vue:192-196` asserts that below `sm` *"the aperture (312 px at 390w)
holds controls only"* while the aperture in fact holds a zero-width, `opacity: 0`, `tabindex="-1"`
Tools slot with the retired pane switcher painted over it. 137 of 360 lines (38 %) are provenance
prose, and its accuracy is gated by nothing.

---

*No source edits land from this formation. Written under
`docs/tranches/V/megatranche/audit/components/shell-dock-dock/` only; r1 and r2 preserved alongside.*

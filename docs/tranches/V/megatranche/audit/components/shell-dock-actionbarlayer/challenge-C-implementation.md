# CHALLENGE-C — `demo/shell/dock/layers/ActionBarLayer.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the model this seat was
explicitly spawned with. The seat is declared, not inherited.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- HEAD at audit time: **`7cae8bd0`** (the task brief names `c654824e`; the branch has advanced
  three commits — `6085965e`, `041ca263`, `7cae8bd0` — none of which touch this file).
- Subject: `demo/shell/dock/layers/ActionBarLayer.vue`, 158 lines (`wc -l`).
- Verdict: **DEFECTIVE**. 14 defects, 1 BLOCKER.

---

## Verdict in one line

**The named dual-path suspect is worse than a dual path: it is a dead path.** The locally
reimplemented `useLayerTransition` (lines 53–95) produces **no transition at all** — measured, in
the live app, opacity is a flat `1` or `0` across nine samples spanning 0→621 ms, and neither
sub-layer's computed `transition` shorthand contains an `opacity` entry. The 30 lines of shim, the
260 ms timer, the `is-leaving` class and the `containerEl` plumbing are inert machinery decorating
an instantaneous cut. Meanwhile glass-ui 7.0.0 **does** ship a public successor — `DockCrossfade` /
`DockLayer` / `useDockCrossfadeContext`, exported from `@mkbabb/glass-ui/dock`, the exact module
this file already imports `DockControl` and `DockSeparator` from, and already consumed by
`Dock.vue` one level up. The CARRY-LEDGER retirement condition is already met.

---

## Method

Static read of the SFC and its collaborators (`ActionToolbar.vue`, `ColorInput.vue`, `Dock.vue`,
`color-session/keys.ts`, `demo/shell/dock/index.ts`), a scan of the installed producer
(`node_modules/@mkbabb/glass-ui@7.0.0` — `dist/dock.js`, `dist/components/dock/**/*.d.ts`,
`dist/components/dock/styles/*.css`), the visual audit `REPORT.json`, and live instrumentation of
`http://localhost:9000` via Playwright (`getComputedStyle` / `getBoundingClientRect` sampling —
read-only, no DOM mutation).

Installed producer version, confirmed:

```
$ node -e "console.log(require('.../node_modules/@mkbabb/glass-ui/package.json').version)"
7.0.0
```

---

## D-1 · BLOCKER — the local `useLayerTransition` renders no transition; the whole shim is a no-op

**Evidence — measured, live.** Live probe against `http://localhost:9000/#/`: read the computed
style of `.dock-layer-grid`'s two children, then click the `Open color input` toggle and sample
across the shim's own claimed 260 ms crossfade window.

Computed `transition` shorthand on the two sub-layers, at rest:

```
active sub-layer   transition: "visibility"                  opacity: "1"
inactive sub-layer transition: "visibility 0s linear 0.3s"   opacity: "0"
```

**Neither shorthand contains `opacity`.** There is no opacity transition on `.dock-layer` anywhere
in the loaded document — the only declaration in the producer's `layers.css` is
`:where(.glass-dock, .dock-layer-group) .dock-layer { transition: visibility 0s linear
var(--duration-normal); }`.

Nine-frame sample across the swap (`opacity` of each sub-layer, `.glass-dock[data-morphing]`
presence):

| frame | leaving layer opacity | entering layer opacity | `is-leaving` set | `data-morphing` |
|---|---|---|---|---|
| before | — (1, active) | — (0, resting) | no | false |
| +2 ms | **0** | **1** | yes | false |
| +17 ms | 0 | 1 | yes | false |
| +61 ms | 0 | 1 | yes | false |
| +131 ms | 0 | 1 | yes | false |
| +201 ms | 0 | 1 | yes | false |
| +250 ms | 0 | 1 | yes | false |
| +281 ms | 0 | 1 | **no** (timer fired) | false |
| +401 ms | 0 | 1 | no | false |
| +621 ms | 0 | 1 | no | false |

The flip is complete at +2 ms. There is **not one intermediate opacity value** at any sample point.

**Mechanism.** The producer's `is-leaving` state is `{ opacity: 0; visibility: visible;
pointer-events: none; }` and the resting state is `{ opacity: 0; visibility: hidden; pointer-events:
none; }`. With no opacity transition declared, the two states are visually identical — the *only*
difference is `visibility`, and the leaving element is simultaneously `inert` (verified:
`inert: true` at every sampled frame), so it is out of the a11y tree either way. Holding
`leavingLayer` for 260 ms therefore changes **nothing** — not a pixel, not an a11y node, not a hit
region. The one CSS rule that would animate a leaving layer,
`.glass-dock[data-morphing] .dock-layer.is-leaving { opacity: calc(1 - var(--dock-morph-t)); }`,
requires the dock's own morph scalar: `data-morphing` was **false at all nine frames**, and a
sub-layer swap inside `ActionBarLayer` does not drive the dock morph.

**Reproduction.** `http://localhost:9000/#/` → in the console:

```js
const grid = document.querySelector('.dock-layer-grid');
[...grid.children].map(el => getComputedStyle(el).transition)
// => ["visibility", "visibility 0s linear 0.3s"]   ← no `opacity` in either
```

then click the toggle and poll `getComputedStyle(child).opacity` — it is `0` or `1`, never between.

**Cure.** Delete lines 53–95 and mount the producer's public crossfade — see D-2.

---

## D-2 · BLOCKER — the shim's stated retirement condition is false: glass 7.0.0 already ships the successor

The file's comment (lines 54–61) asserts the swap "folded INTO the DockCrossfade component … and
offers **no public composable successor**", and CARRY-LEDGER §F conditions retirement on glass
shipping one:

```
docs/tranches/V/reformation/CARRY-LEDGER.md:111
  passive gap · M2 useLayerTransition successor ask · M3 Chip §7 consumer evidence). CH-5
docs/tranches/V/reformation/CARRY-LEDGER.md:124-125
  likewise. If M1/M2 draw replies (passive variant; public content-swap composable), fold
  at the receiving wave: M1→W47 (shell/chrome), M2→W47.
```

**Evidence — the successor is installed, public, and already consumed in this repo.**

`node_modules/@mkbabb/glass-ui/dist/dock.js:1373` — the public export line:

```
export { _ as DOCK_CONTEXT_KEY, …, rt as DockCrossfade, ft as DockLayer, lt as DockLayerGroup,
         _t as DockSeparator, mt as DockTrigger, Qe as GlassDock, … }
```

`dist/components/dock/composables/index.d.ts:9` exports the composable surface:

```
export { provideDockCrossfadeContext, useDockCrossfadeContext, useOptionalDockCrossfadeContext,
         DOCK_CROSSFADE_KEY, type DockFaceDescriptor, type DockFaceRegistration,
         type DockCrossfadeContext, } from "./dockCrossfadeContext";
```

`DockCrossfade.vue.d.ts` documents exactly the case this file has — *"The controlled-no-rail …
case (a consumer) consumes this **DIRECTLY**: a no-selection face-swap does NOT route through a
selection engine"* — with a `reserve?: "block" | "inline"` prop for the peak reserve and a
documented focus-transfer contract. `dockCrossfadeContext.d.ts:31-51` exposes `activeId` and
`leavingId` as read-only refs: **precisely the "exact two-refs contract" the shim claims it had to
hand-roll.**

And the consumer already uses it, one level above the shim — `demo/shell/dock/index.ts:2`:

```ts
export { GlassDock, DockLayerGroup, DockLayer } from "@mkbabb/glass-ui/dock";
```

`demo/shell/dock/Dock.vue:153-158` wraps this very component in a real
`<DockLayer id="action-bar">`. `ActionBarLayer.vue:8` already imports from the same specifier.

**Mechanism.** The shim is a dual path against a primitive that was never missing — a hand-rolled
reimplementation living inside the producer's own composition. Owner edict 2 (no legacy code / dual
paths) and edict 4 (glass-ui is the design system) both bite.

**Reproduction.** `grep -n "DockCrossfade" node_modules/@mkbabb/glass-ui/dist/dock.js` →
line 854 (`//#region src/components/dock/DockCrossfade.vue`) and line 1373 (public export).

**Cure — the exact retirement condition, discharged now.** Retirement is *not* contingent on a
future glass release. Replace lines 53–95 and the template's hand-bound `class`/`inert` with:

```vue
<DockCrossfade :active="showInput ? 'input' : 'actions'" reserve="inline">
  <DockLayer id="actions"> <ActionToolbar … /> </DockLayer>
  <DockLayer id="input">   <ColorInput … />   </DockLayer>
</DockCrossfade>
```

This retires D-1, D-3, D-4, D-6, D-7, D-9 and D-14 in one transposition, and inherits the
producer's peak reserve and focus-transfer-on-dissolve. Relay mark **M2 should be withdrawn, not
awaited** — the ask was answered before it was sent.

---

## D-3 · MAJOR — `.dock-layer-grid` is a class with zero CSS rules; the name asserts a grid that does not exist

**Evidence — measured, live.** Walking every rule in every stylesheet of the running app:

```
gridRuleCount: 0            // rules whose selectorText contains "dock-layer-grid"
gridDisplay:  "block"       // getComputedStyle(.dock-layer-grid).display
gridPosition: "static"      // …position
```

Cross-checked statically: `grep -rn "dock-layer-grid" node_modules/@mkbabb/glass-ui/dist/ demo/ src/`
returns exactly **one** hit — `ActionBarLayer.vue:101`, the site that writes it. The producer's real
stacking container is `.dock-layers { display: grid; min-width: 0; }`
(`dist/components/dock/styles/layers.css`), a different class.

**Consequence — measured.** Because the container is `position: static`, the `position: absolute;
inset: 0` that the producer's `.dock-layer:not(.is-active)` rule applies to the *inactive* sub-layer
resolves against the wrong containing block:

```
offsetParentOfInactive: { cls: "grid grid-cols-1 … dock-layer min-w-0",
                          offsetParent: "dock-face is-active" }
```

— the **entire dock face**, not the sub-grid. The measured boxes confirm the distortion: the
ActionToolbar sub-layer is **184.0 px** wide while active and **447.5 px** while leaving; the
ColorInput sub-layer is **447.5 px** while inactive and **290.4 px** while active. Each layer is
stretched to the full dock face whenever it is not the active one, spilling left over the sibling
`Back` control and `DockSeparator` that sit outside `.dock-layer-grid`.

Today this is invisible only because D-1 means nothing ever renders during that window. Fix D-1
without fixing D-3 and the crossfade appears at the wrong size and the wrong origin.

**Reproduction.** In the console at `/#/`:

```js
const g = document.querySelector('.dock-layer-grid');
getComputedStyle(g).display          // "block"  — not grid
[...g.children].find(c => !c.classList.contains('is-active')).offsetParent.className
// "dock-face is-active"             — not the grid
```

**Cure.** Subsumed by D-2 (`DockCrossfade` supplies `.dock-crossfade { display: grid; position:
relative; isolation: isolate }` and grid-area-stacks its faces). Under no circumstance patch this
by adding a local `.dock-layer-grid { display: grid; position: relative }` rule — that would deepen
the private-CSS coupling of D-4.

---

## D-4 · MAJOR — the file hand-writes the producer's private layer vocabulary, nested inside a real producer layer

`subLayerProps` (line 91) emits `class: ["dock-layer", { "is-active": …, "is-leaving": … }]` —
the producer's own internal class names — and the shim's only reason for working *at all* is that
the producer's CSS matches them.

**Evidence — measured nesting.** From the live DOM:

```
dockLayerAncestors: ["dock-layer dock-layer--full is-active"]
```

The hand-written `.dock-layer` elements are **descendants of a genuine producer `.dock-layer`**.
The producer's selectors are descendant-scoped, not child-scoped:

```css
:where(.glass-dock, .dock-layer-group) .dock-layer { display:flex; align-items:center;
    grid-area: 1 / 1; gap: var(--dock-layer-gap, 0.375rem); }
.glass-dock:not(.vertical) .dock-layer { white-space: nowrap; min-height: var(--dock-layer-height, 2.5rem); }
.glass-dock[data-morphing] .dock-layer.is-active > * { opacity: var(--child-reveal);
    scale: calc(0.82 + 0.18 * var(--child-reveal)); transform-origin: center; }
```

so every one of them lands on the nested sub-layers unintentionally — including the stagger rule,
which will drive `opacity` and `scale` on `ActionToolbar`'s and `ColorInput`'s children during any
genuine dock morph, and `min-height: 2.5rem`, which silently sets the sub-layer floor.

**Mechanism.** An undeclared, name-based coupling to a producer's private CSS. It is invisible to
`package.json`, to typecheck, and to every test; a glass release that renames `.dock-layer` or
tightens the selector to `>` breaks this component with no compile error and no failing test. This
is the same class of coupling the constellation grand-audit ruled against.

**Reproduction.** `document.querySelector('.dock-layer-grid').children[0].closest('.dock-layer--full')`
→ non-null: a `.dock-layer` inside a `.dock-layer`.

**Cure.** D-2. `DockLayer` renders its own `.dock-face` host and never asks the consumer to author
producer class names.

---

## D-5 · MAJOR — vacuous gate: zero unit tests, and the sole e2e touch cannot fail if the component breaks

**Evidence.** `ls test/` — 21 test files, **none** for the dock; `find test -iname "*dock*" -o
-iname "*action*"` returns nothing. `grep -rln "ActionBarLayer" test/ e2e/ demo/` returns exactly
one test: `e2e/smoke/flows/color-propose.spec.ts`.

That spec's entire assertion surface:

```ts
await page.getByRole("button", { name: "Toggle action bar" }).click();
await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0, { timeout: 5000 });
await page.getByRole("button", { name: "Open color input" }).click();
await expect(page.getByRole("button", { name: "Propose color name" })).toBeVisible();
```

Every assertion reads the **toggle button's `aria-label`**, which is computed at line 131 from
`toolbarMode` and `actionBar.canProposeName` alone. The toggle lives *outside* `.dock-layer-grid`
and is never inert during the flow.

**The exact mutations that keep it green:**

1. Delete lines 53–95 in full and replace `subLayerProps` with `() => ({})` — no crossfade, no
   `inert`, both sub-layers rendered on top of each other simultaneously. **Green.**
2. `const SUB_LAYER_CROSSFADE_MS = 0` — or `10_000_000`. **Green** either way.
3. Invert the guard: `inert: isActive ? true : undefined` — inert the *visible* layer, leaving the
   hidden one interactive. **Green** (the toggle is outside the grid).
4. Swap the ids: `subLayerProps('input')` on `ActionToolbar` and `subLayerProps('actions')` on
   `ColorInput` — the wrong layer shows in every mode. **Green.**

Mutation 3 is the alarming one: it is a live a11y regression (a hidden `role="textbox"` and five
hidden buttons left in the tab order) that this repo's only gate for the component cannot see.

**Cure.** A component test asserting the invariants that actually matter — exactly one sub-layer
carries `is-active`, the other carries `inert`, and the active id tracks `toolbarMode` — plus, once
D-2 lands, deleting the spec's own five-line comment excusing the crossfade race (see D-13).

---

## D-6 · MAJOR — no size reserve: the swap is an unreserved layout jump

**Evidence — measured.** Active sub-layer content width across the swap:

```
before toggle:  active ActionToolbar  w = 184.0 px
after  toggle:  active ColorInput     w = 290.4 px
```

a **+106.4 px** instantaneous change, with no reserved box and no interpolation (D-1 leaves nothing
to interpolate). The producer's `DockCrossfade.vue.d.ts` documents that this is the primitive's
job: *"The reserved box is sized to the peak face as a MEASURE-ONCE `min-block-size` (a running max
— NOT a per-swap FLIP)"*, with `reserve: "block" | "inline"` selecting the axis — `inline` is
documented as being for exactly this shape, *"a horizontal control run"*.

The shim's own comment (line 55) concedes glass's version did "the layer size-morph **+**
crossfade", then reimplements only the crossfade bookkeeping — and, per D-1, not even that.

**Reproduction.** Click `Open color input`; sample
`document.querySelector('.dock-layer-grid').children[i].getBoundingClientRect().width` before and
after.

**Cure.** D-2, with `reserve="inline"`.

---

## D-7 · MINOR — the crossfade timer is never cleared on unmount

`ActionBarLayer.vue:70-79`:

```ts
let timer: ReturnType<typeof setTimeout> | null = null;
watch(opts.activeLayer, (next, prev) => {
    …
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => { leavingLayer.value = null; }, SUB_LAYER_CROSSFADE_MS);
});
```

There is no `onScopeDispose` / `onUnmounted` in the file (`grep -c "onScopeDispose\|onUnmounted"
demo/shell/dock/layers/ActionBarLayer.vue` → 0). The `watch` is auto-disposed with the setup scope;
the pending `setTimeout` is not.

**The component does unmount mid-session** — observed during probing: `.dock-layer-grid` went from
present to `null` (throwing `TypeError: Cannot read properties of null (reading 'parentElement')`)
once the app's route moved to `#/admin/users`. `Dock.vue:153,156` gates it behind two `v-if`s
(`hasAnyActionBar`, then `actionBar`), so an action-bar context going away destroys the instance.

**Impact.** A callback that survives its component and writes to a disposed ref. Vue tolerates the
write, so this is MINOR today — but it is a missing-cleanup defect the retired producer composable
would have owned, and it is the reason the component's local `toolbarMode` (line 30) silently
resets: an unmount discards the user's mode and any half-typed color.

**Reproduction (mechanism, not user-visible failure).** Code-certain from the absence above; the
unmount itself is reproduced by navigating away from a route that supplies an action bar.

**Cure.** D-2 removes the timer entirely (the producer owns the crossfade lifetime). If D-2 is
deferred for any reason, `onScopeDispose(() => timer && clearTimeout(timer))`.

---

## D-8 · MINOR — two dead template refs, and two competing template-ref idioms in one 158-line file

`ActionBarLayer.vue:28-29`:

```ts
const colorInputRef = ref<InstanceType<typeof ColorInput> | null>(null);
const actionToolbarRef = ref<InstanceType<typeof ActionToolbar> | null>(null);
```

Both are bound in the template (lines 103, 116) and **never read**.
`grep -n "colorInputRef\|actionToolbarRef" demo/shell/dock/layers/ActionBarLayer.vue` returns only
the two declarations and the two `ref=` bindings — no `.value` access anywhere in the repo.

Separately, `subLayerGridEl` (line 83) uses `useTemplateRef`, the Vue 3.5 idiom, while these two use
the pre-3.5 `ref(null)` idiom — **two idioms for one job in one file**, against owner edict 7.
And `subLayerGridEl` is itself dead: its sole consumer is `void opts.containerEl` (D-9).

Net: all three template refs in this component are unread.

**Cure.** Delete `colorInputRef` and `actionToolbarRef`. `subLayerGridEl` goes with D-2. Note the
one legitimate use for `actionToolbarRef` is D-12 — if that cure is taken, keep it and convert it
to `useTemplateRef`.

---

## D-9 · MINOR — a parameter preserved for "signature parity" with a function that exists nowhere

`ActionBarLayer.vue:63-67`:

```ts
function useLayerTransition(opts: {
    containerEl: Ref<HTMLElement | null>;
    activeLayer: Ref<string>;
}) {
    void opts.containerEl; // signature parity with the retired producer composable
```

`containerEl` is threaded from a `useTemplateRef` (line 83), passed at the call site (line 86), and
immediately discarded. It maintains parity with a composable that, by the file's own comment, was
removed from the producer — `grep -rn "useLayerTransition" node_modules/@mkbabb/glass-ui/dist/`
returns zero hits. There is no caller to be compatible with and no second implementation to swap in.

This is back-compat shimming against a void (edict 2) and contrivance (edict 3): the whole
`useTemplateRef` → `containerEl` → `void` chain is ceremony with no effect. It also drags `Ref` and
`useTemplateRef` into the import at line 2, where neither is otherwise needed.

**Cure.** D-2. Interim: delete the parameter, the call-site argument, the `ref="subLayerGridEl"`
binding, and the `Ref` / `useTemplateRef` imports.

---

## D-10 · MINOR — `defineExpose` publishes three members with zero consumers

`ActionBarLayer.vue:96`:

```ts
defineExpose({ currentToggleIcon, toolbarMode, cycleToolbarMode });
```

`grep -rn "currentToggleIcon\|cycleToolbarMode" demo/ e2e/ test/` returns hits **only inside this
file**. The sole mount site, `Dock.vue:156`, passes props and listens to events — it holds no
template ref to this component:

```
<ActionBarLayer v-if="actionBar" :action-bar="actionBar" :edit-target="editTarget"
                @open-palette="onActionBarOpenPalette" @open-extract="onActionBarOpenExtract" />
```

Exposing a writable `toolbarMode` ref is worse than dead: it publishes a second, unguarded way to
set a mode whose only legal transitions are encoded in `cycleToolbarMode`'s three-state machine
(lines 33–45). Any future caller writing `toolbarMode.value = "propose"` bypasses the
`canProposeName` gate at line 37 and lands the component in propose mode for a color that cannot be
proposed.

**Cure.** Delete line 96.

---

## D-11 · MINOR — a prop is computed, passed, declared, and never used

`ActionBarLayer.vue:106` passes `:can-propose-name="actionBar.canProposeName.value"` to
`ActionToolbar`. `ActionToolbar.vue:72` declares it:

```
$ grep -n "canProposeName" demo/shell/dock/ActionToolbar.vue
72:    canProposeName: boolean;
```

— one hit, the declaration. It appears nowhere in `ActionToolbar`'s 65-line template. The prop is a
reactive dependency that re-renders the toolbar for no reason and misleads every reader about the
toolbar's contract.

**Cure.** Drop the binding at line 106 and the declaration at `ActionToolbar.vue:72`.

---

## D-12 · MINOR — the toolbar's hover state is never reset when the toolbar is hidden

`ActionToolbar.vue:85-91` maintains `activeHover` across its five `ActionButton`s and exposes a
reset for exactly this situation:

```ts
const activeHover = ref<string | null>(null);
function clearHover() { activeHover.value = null; }
defineExpose({ clearHover });
```

`grep -rn "clearHover" demo/` → the definition and the expose, and **no caller**. `ActionBarLayer`
holds `actionToolbarRef` (D-8), the only handle from which `clearHover()` could be called, and never
calls it. When `activeSubLayer` flips to `input`, the toolbar becomes `inert` with whatever
`activeHover` was last set; it is restored on the way back.

**Impact.** A stale hover highlight on return to actions mode, on any path where the pointer does
not generate a `pointerleave` before the swap (keyboard-driven cycling; a pointer that is over a
toolbar button when the layer is inerted). MINOR, and cosmetic — but the producer of the state
explicitly published the cure and the consumer ignored it.

**Reproduction.** NONE — mechanism established from the unread expose; the pointer-sequence needed
to strand `activeHover` was not reproduced live. **Labelled a hypothesis.**

**Cure.** Call `actionToolbarRef.value?.clearHover()` when `activeSubLayer` leaves `"actions"`, or
(preferred, KISS) move `activeHover` reset into `ActionToolbar` via a `watch` on an `active` prop so
no cross-component reach-in is needed.

---

## D-13 · MAJOR — the toggle is a disclosure control that discloses nothing to assistive technology

**Evidence — measured, live**, over the ActionBarLayer subtree:

```
toggle: { label: "Open color input", tag: "BUTTON",
          role: null, ariaExpanded: null, ariaControls: null, ariaPressed: null }
ariaLiveInScope: 0
```

The control at lines 129–142 swaps a `role="textbox"` in and five named buttons out of the
accessibility tree, and:

- carries **no `aria-expanded`** — the single attribute that makes a show/hide control legible;
- carries **no `aria-controls`** — no programmatic relationship to either sub-layer;
- has **no `aria-live` region anywhere in scope** — the mode change is silent;
- performs **no focus management at all**. `grep -c "focus" demo/shell/dock/layers/ActionBarLayer.vue`
  → 0. Focus is not moved into the revealed input on open, and nothing is restored on close.

The producer's primitive documents the contract the shim dropped —
`DockCrossfade.vue.d.ts`: *"A dissolving focus-holding face transfers focus to its successor, else
the body (**un-inert-before-focus is load-bearing**)."* The shim reimplemented the class/`inert`
bookkeeping and left the focus half behind. Line 92 applies `inert` to the outgoing layer in the
same tick the swap occurs, with nothing catching a focused descendant.

The repo already knows about this. `e2e/smoke/flows/color-propose.spec.ts`, COVERAGE NOTE:

> the propose-mode `<span role="textbox" contenteditable>` lives in the dock's collapse-cycle layer
> and is not reliably reachable via accessible-name selectors during the cross-fade. Filed as an
> E.W3-Lane-A finding (audit doc §6 "dock-collapse a11y finding").

A control that a test harness cannot reach by accessible name during a state change is a control a
screen-reader user cannot reach either. The finding was filed and the gate was written around it.

**Reproduction (measured part).** At `/#/`, `document.querySelector('.dock-layer-grid')
.parentElement.querySelector('button[aria-label]')` → the toggle; it has none of
`aria-expanded` / `aria-controls` / `aria-pressed`, and its subtree has zero `[aria-live]`.

**Reproduction (focus-orphan part).** NONE — the specific outcome (`document.activeElement`
falling to `<body>` when focus is inside `ColorInput` at the moment `inert` lands) was **not
reproduced**: the live session became unstable (a modal scrim intercepted pointer events, then the
app navigated out from under the probe). The *absence* of focus handling is code-certain; the
resulting activeElement is **labelled a hypothesis**.

**Cure.** `aria-expanded="showInput"` plus an `:id`/`aria-controls` pair on the sub-layer hosts —
and, structurally, D-2, which inherits the producer's focus-transfer-on-dissolve rather than
re-deriving it. Note the sibling `ActionBarToggle.vue:98-101` already models the right idiom in this
same directory (`aria-label` **and** `:aria-pressed="active"` **and** `:tabindex="visible ? 0 : -1"`)
— the pattern exists locally and was not applied here.

---

## D-14 · MINOR — an untokenized magic duration, in a file whose other transition is tokenized

`ActionBarLayer.vue:62`: `const SUB_LAYER_CROSSFADE_MS = 260;`

`260` matches no token in the design system. From
`node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css`:

```
--duration-instant: 0.1s;  --duration-control: 0.12s;  --duration-fast: 0.2s;
--duration-normal: 0.3s;   --duration-slow: 0.45s;     --duration-panel: 0.55s;
```

200 ms and 300 ms exist; 260 ms does not, and no CSS in the repo consumes it — it is coupled to
nothing, so it cannot drift *into* agreement either. Owner edict 6 (animations tokenized, not
hardcoded).

The asymmetry is inside this one file: 72 lines below, the toggle **icon** swap uses the repo's
canonical motion family correctly — `<Transition name="vj-morph" mode="out-in">` (line 134), whose
`.vj-morph-enter-active` / `-leave-active` rules are fully tokenized
(`demo/styles/animations.css:104-116`: `opacity var(--duration-fast) var(--ease-decelerate)`,
`transform var(--spring-snappy-duration) var(--spring-snappy)`), and which `demo/DESIGN.md:275`
cites as the reference implementation:

> PaletteCard.vue's golden-text-shimmer demonstrates the cubic-bezier path, **ActionBarLayer.vue the
> duration-fast path**.

So the same component animates a 24 px icon with the design system's tokenized morph family, and
animates the entire content region it toggles with a hand-rolled, off-system, non-functional
260 ms timer.

**Cure.** D-2. The KISS interim, using vocabulary already in this file and already blessed by
DESIGN.md, is a plain `<Transition name="vj-morph" mode="out-in">` around the sub-layer content —
which is what the icon 40 lines below already does, and which would actually render.

---

## D-15 · INFO — a re-provide justified as back-compat, and an unnamed DI failure

`ActionBarLayer.vue:21-24`:

```ts
// Re-provide COLOR_MODEL_KEY so ColorInput works unchanged
provide(COLOR_MODEL_KEY, actionBar.colorModel);

const safeAccent = inject(SAFE_ACCENT_KEY)!;
```

Two notes, neither load-bearing on its own:

1. The comment states the re-provide exists "so ColorInput works unchanged" — a compatibility shim
   by its own admission (edict 2). The honest framing is that `ActionBarLayer` is the DI boundary
   for its subtree; the comment should say so, or `ColorInput` should take the model as a prop.
2. `inject(SAFE_ACCENT_KEY)!` asserts non-null. If the provider is ever absent the failure is a
   `Cannot read properties of undefined (reading 'value')` inside a render function — an unnamed
   crash. The producer this file already imports from models the alternative:
   `dist/dockContext-*.js` throws *"[glass-ui:dock] useDockContext() called outside `<GlassDock>`;
   use useOptionalDockContext() if the primitive may render outside a dock."*

**Reproduction.** NONE for (2) — no path was found that mounts `ActionBarLayer` outside the
provider. **Labelled a hypothesis.**

---

## Checks run that found nothing (the negative record)

Reported so this seat's silence is legible, not an omission.

- **`verbatimModuleSyntax` (edict 8): CLEAN.** Line 5 (`import type { ActionBarContext }`) and
  line 9 (`import type { EditTarget }`) are type-only; line 2's `type Ref` uses the inline type
  modifier. All correct.
- **`defineModel` stale-read hazard: NOT PRESENT.** The file uses no `defineModel`; `toolbarMode` is
  a plain local `ref`. No async parent round-trip to go stale on.
- **`ValueUnit` nesting accumulation: NOT PRESENT.** No `ValueUnit` construction or unwrapping in
  this file or its direct template surface.
- **oklch→HSV hue drift / `stableHue`: NOT APPLICABLE.** No color math here; the pipeline is
  injected and passed through untouched.
- **Ungated `requestAnimationFrame` (PRM-RAF epidemic): NOT PRESENT in this file.**
  `grep -c requestAnimationFrame demo/shell/dock/layers/ActionBarLayer.vue` → 0. (The sibling
  `ActionBarToggle.vue:71-76` runs a double-rAF, but it is one-shot and guarded by `if
  (slotLive.value) return;` — not a loop, and outside this seat's subject.)
- **reka-ui pointer-capture leak: NOT APPLICABLE.** No slider primitive in this component.
- **WebGL: NOT APPLICABLE.** No WebGL on this path. (`REPORT.json` records `"WebGL: context lost."`
  on `safari-desktop-light /#/`; the source is the hero blob, not the dock.)
- **`v-bind` / `class` merge order (lines 104+120): CORRECT.** `v-bind="subLayerProps('input')"`
  precedes a static `class="min-w-0"`; Vue's `mergeProps` concatenates rather than overrides.
  Verified in the live DOM: `class="grid grid-cols-1 gap-y-2 p-0 m-0 dock-layer min-w-0"` — both
  survive.
- **Rapid-toggle race in the shim: NO DEFECT.** `leavingLayer` is always the immediately preceding
  `currentLayer`, and the timer is cleared on every swap (line 75), so no element can ever carry
  both `is-active` and `is-leaving`. Traced across the actions→input→actions and
  actions→input→propose sequences; `showInput` is `mode !== "actions"`, so the input→propose leg
  correctly does not fire the watch.
- **Tap targets: CLEAN for this component's own markup.** Measured live over the subtree — five
  action buttons at 32×32, the toggle at 40×40, the color-input textbox at 447×46. Zero targets
  below 24×24. `REPORT.json` records `smallTapTargets: 8` on `safari-desktop-light /#/`; none of the
  eight are in this subtree (they are `Switch to slug` / `Generate new slug` / `Cancel` at 22×22 and
  four 12×24 channel handles — `SlugEditLayer` and the sliders).
- **Nameless buttons: attributed elsewhere.** `REPORT.json` records `namelessButtons: 1` for
  `/#/`, and the one nameless control in this subtree is
  `<button class="send-btn btn-interactive">` at 24×24 — it belongs to `ColorInput.vue`, not to
  `ActionBarLayer`'s markup. Filed here as scope evidence, charged to `ColorInput`.
- **Screenshot review:** `shots/safari-desktop-light/picker.png` read at full resolution. The dock
  renders correctly at rest (`Home ▾ | Tools → | Login | @mbabb`); no clipping, no overflow, no
  contrast failure attributable to this component. The visual matrix captured no action-bar-expanded
  state, so D-1/D-3/D-6 are invisible to it — a coverage gap in the visual audit, not a clean bill.

---

## Defect family

Eleven of the fourteen findings share one mechanism: **a producer primitive was hand-reimplemented
in the consumer, coupled to the producer's private CSS by name, and the reimplementation dropped the
parts that were doing the work** — the opacity animation (D-1), the containing block (D-3), the peak
reserve (D-6), the lifetime (D-7), and the focus contract (D-13) — while accreting the ceremony of
the thing it replaced (D-8, D-9, D-14). D-2 is the root: the successor was never missing. D-5 is why
none of it was caught: the only gate reads a label that no defect above can change.

**Retiring the shim per D-2 discharges D-1, D-3, D-4, D-6, D-7, D-9 and D-14 in a single
transposition.** D-5, D-10, D-11, D-12, D-13 and D-15 are independent and survive it.

**Retirement condition, stated exactly as asked:** *none outstanding.* CARRY-LEDGER §F conditions
retirement on "glass ships a successor"; glass-ui **7.0.0 — the pinned, installed version — ships
`DockCrossfade`, `DockLayer`, and `useDockCrossfadeContext` as public exports of
`@mkbabb/glass-ui/dock`**, the specifier this file already imports from and `Dock.vue` already
consumes. The condition is met at HEAD. W47 should execute the retirement, and relay mark **M2
should be withdrawn rather than awaited**.

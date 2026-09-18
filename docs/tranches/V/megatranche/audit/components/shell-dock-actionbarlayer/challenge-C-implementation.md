# CHALLENGE-C — `demo/shell/dock/layers/ActionBarLayer.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. This
seat was spawned with an explicit Opus 5 declaration and the served tier matches it; the seat is
declared, not inherited.

- Repository: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- HEAD at audit time: **`065a8d40`** (the brief names `c654824e`; the branch advanced during this
  run — `6085965e`, `041ca263`, `7cae8bd0`, `065a8d40` — **none touch this file**; `wc -l` still 158).
- Subject: `demo/shell/dock/layers/ActionBarLayer.vue`, 158 lines.
- Verdict: **DEFECTIVE** — 20 defects, 2 BLOCKER, 7 MAJOR.

**Provenance note.** A prior seat banked a 15-defect version of this report at this path (commit
`7cae8bd0`, "wall-interrupted challenge harvest"). This run **re-measured every load-bearing claim
independently** against the live app and **added six defects that seat did not find** (C-5, C-6, C-8's
false-citation leg, C-15, C-17, C-18). Prior IDs are cross-referenced as `[was D-n]` so nothing is
lost. Where my numbers differ from the banked ones, mine are the ones taken at `065a8d40` and are
stated with the raw probe output.

---

## Verdict in one line

**The named dual-path suspect is not a dual path — it is a dead path.** The locally reimplemented
`useLayerTransition` (lines 53–95) produces **no transition whatsoever**: measured live, opacity is a
flat `1` or `0` across nine samples spanning 0→628 ms, and neither sub-layer's computed `transition`
shorthand contains an `opacity` entry. The 30 lines of shim, the 260 ms timer, the `is-leaving` class
and the `containerEl` plumbing are inert machinery decorating an instantaneous cut. Meanwhile
glass-ui **7.0.0 — the installed, pinned version — already exports the successor** (`DockCrossfade`,
`DockLayer`, `useDockCrossfadeContext`) from `@mkbabb/glass-ui/dock`, the exact module this file
already imports `DockControl`/`DockSeparator` from and which `Dock.vue` already consumes one level up.
**The CARRY-LEDGER §F retirement condition is already met at HEAD.**

---

## Method

Static read of the SFC and every collaborator (`ActionToolbar.vue`, `ColorInput.vue`, `Dock.vue`,
`ColorPicker.vue`, `color-session/keys.ts`, `useColorNameResolution.ts`, `useCustomColorNames.ts`),
a scan of the installed producer at `node_modules/@mkbabb/glass-ui@7.0.0`
(`dist/dock.d.ts`, `dist/components/dock/composables/index.d.ts`, `dist/components/dock/styles/*.css`,
`dist/styles/tokens/scheme-motion.css`), the full test/e2e surface, the visual audit
`REPORT.json` + `shots/safari-desktop-light/picker.png` (read at full resolution), and read-only live
instrumentation of `http://localhost:9000/?color=%23abcdef` via Playwright
(`getComputedStyle` / `getBoundingClientRect` / `CSSOM` walk / rAF sampling — no DOM mutation, no
source edit).

Producer version, confirmed:

```
$ node -e "console.log(require('./node_modules/@mkbabb/glass-ui/package.json').version)"
7.0.0
```

---

## C-1 · BLOCKER — the local `useLayerTransition` renders no transition; the entire shim is a no-op
*(re-verified independently; was D-1)*

**Evidence — measured live at `065a8d40`.** Computed `transition` shorthand on the two sub-layers,
at rest, plus a nine-frame rAF sample across the shim's own claimed 260 ms window:

```
before:  [0] "flex items-center justify-around flex-1 dock-layer"   transition: "visibility"                opacity: "1"
         [1] "grid grid-cols-1 gap-y-2 p-0 m-0 dock-layer min-w-0"  transition: "visibility 0s linear 0.3s" opacity: "0"
```

| t (ms) | opacity [toolbar, input] | visibility | `is-leaving` | `is-active` | `inert` | `[data-morphing]` |
|---|---|---|---|---|---|---|
| 0 | `["1","0"]` | visible / hidden | `[f,f]` | `[t,f]` | `[f,t]` | false |
| 19 | `["0","1"]` | visible / visible | `[t,f]` | `[f,t]` | `[t,f]` | false |
| 62 | `["0","1"]` | visible / visible | `[t,f]` | `[f,t]` | `[t,f]` | false |
| 136 | `["0","1"]` | visible / visible | `[t,f]` | `[f,t]` | `[t,f]` | false |
| 203 | `["0","1"]` | visible / visible | `[t,f]` | `[f,t]` | `[t,f]` | false |
| 253 | `["0","1"]` | visible / visible | `[t,f]` | `[f,t]` | `[t,f]` | false |
| 286 | `["0","1"]` | visible / visible | `[f,f]` ← timer fired | `[f,t]` | `[t,f]` | false |
| 403 | `["0","1"]` | visible / visible | `[f,f]` | `[f,t]` | `[t,f]` | false |
| 628 | `["0","1"]` | **hidden** / visible | `[f,f]` | `[f,t]` | `[t,f]` | false |

**The flip is complete at t = 19 ms. There is not one intermediate opacity value at any sample
point.** Neither computed `transition` shorthand contains `opacity`.

**Mechanism.** The producer's `is-leaving` state is `{opacity:0; visibility:visible;
pointer-events:none}` and its resting state is `{opacity:0; visibility:hidden; pointer-events:none}`
(`dist/components/dock/styles/layers.css`). With **no opacity transition declared anywhere** for
`.dock-layer`, those two states are visually identical — the only difference is `visibility`, and the
leaving element is simultaneously `inert` at every sampled frame, so it is out of the a11y tree
either way. Holding `leavingLayer` for 260 ms therefore changes **nothing**: not a pixel, not an
a11y node, not a hit region. The one rule that *would* animate a leaving layer —
`.glass-dock[data-morphing] .dock-layer.is-leaving { opacity: calc(1 - var(--dock-morph-t)); }` —
needs the dock's own morph scalar, and `[data-morphing]` was **false at all nine frames**: a
sub-layer swap inside `ActionBarLayer` does not drive the dock morph.

**Reproduction.** `http://localhost:9000/?color=%23abcdef`, open the action bar, then in the console:

```js
const g = document.querySelector('.dock-layer-grid');
[...g.children].map(el => getComputedStyle(el).transition)
// => ["visibility", "visibility 0s linear 0.3s"]      ← no `opacity` in either
```

then click the toggle and poll `getComputedStyle(child).opacity` — `0` or `1`, never between.

**Cure.** Delete lines 53–95 and mount the producer's public crossfade — see C-2.

---

## C-2 · BLOCKER — the shim's stated retirement condition is **false**: glass 7.0.0 ships the successor
*(re-verified; was D-2)*

Lines 54–61 assert the swap "folded INTO the DockCrossfade component … and offers **no public
composable successor**", and CARRY-LEDGER §F conditions retirement on glass shipping one.

**Evidence — the successor is installed, public, typed, and already consumed in this repo.**

```
$ grep -n "DockCrossfade" node_modules/@mkbabb/glass-ui/dist/components/dock/composables/index.d.ts
9:export { provideDockCrossfadeContext, useDockCrossfadeContext, useOptionalDockCrossfadeContext,
   DOCK_CROSSFADE_KEY, type DockFaceDescriptor, type DockFaceRegistration,
   type DockCrossfadeContext, } from "./dockCrossfadeContext";
```

`dist/dock.d.ts` is `export * from "./components/dock"`, so `DockCrossfade` / `DockLayer` /
`DockLayerGroup` / `useDockCrossfadeContext` are all public on the `@mkbabb/glass-ui/dock` specifier
this file already imports from at line 8. `dockCrossfadeContext.d.ts` exposes `activeId` and
`leavingId` as read-only refs — **precisely the "exact two-refs contract" the shim's comment claims
it had to hand-roll.**

And the primitive is *already live in this very dock*. Measured in the running app:

```
faces: ["dock-face justify-center", "dock-face justify-center", "dock-face is-active", "dock-face"]
```

Those `.dock-face` nodes are `DockCrossfade`'s own markup, rendered by the `DockLayerGroup` at
`Dock.vue:134` that wraps this component. `demo/shell/dock/index.ts:2` re-exports
`{ GlassDock, DockLayerGroup, DockLayer }`. `Dock.vue:153-156` mounts `<ActionBarLayer>` inside a real
`<DockLayer id="action-bar">`.

**Mechanism.** A hand-rolled reimplementation of a primitive that was never missing, living *inside*
the producer's own composition. Owner edict 2 (no legacy/dual paths) and edict 4 (glass-ui is the
design system) both bite.

**Cure — the exact retirement condition, discharged now.** Retirement is **not** contingent on a
future glass release. Replace lines 53–95 and the hand-bound `class`/`inert` with:

```vue
<DockCrossfade :active="showInput ? 'input' : 'actions'" reserve="inline">
  <DockLayer id="actions"><ActionToolbar … /></DockLayer>
  <DockLayer id="input"><ColorInput … /></DockLayer>
</DockCrossfade>
```

This retires C-1, C-3, C-4, C-9, C-10, C-12, C-16 and C-17 in one transposition and inherits the
producer's peak reserve and focus-transfer-on-dissolve. **Relay mark M2 should be WITHDRAWN, not
awaited** — the ask was answered before it was sent.

---

## C-3 · MAJOR — `.dock-layer-grid` is a class with zero CSS rules; the inactive layer resolves against the wrong box
*(re-verified with sharper numbers; was D-3)*

**Evidence — measured, live.** Walking every rule of every stylesheet in the running document:

```
gridRuleCount: 0          // rules whose selectorText contains "dock-layer-grid"
grid: { display: "block", position: "static", cls: "dock-layer-grid flex-1",
        rect: { x: 584.7, w: 184.0 } }
```

Cross-checked statically — the class is written in exactly one place in the world:

```
$ grep -rn "dock-layer-grid" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=docs
demo/shell/dock/layers/ActionBarLayer.vue:101:        <div ref="subLayerGridEl" class="dock-layer-grid flex-1">
$ grep -rn "dock-layer-grid" node_modules/@mkbabb/glass-ui/
(no output)
```

The producer's real stacking container is a *different class*:
`.dock-layers { display: grid; min-width: 0; }` (`dist/components/dock/styles/layers.css`).

**Consequence — measured, and worse than the banked report stated.** Because the container is
`position: static`, the producer's `.dock-layer:not(.is-active) { position:absolute; inset:0 }`
resolves against `.dock-face`, not the grid. Both children report
`offsetParent: "dock-face"`. The resulting geometry:

| state | element | x | width | height |
|---|---|---|---|---|
| grid container | `.dock-layer-grid` | 584.7 | **184.0** | — |
| ActionToolbar **active** | `.dock-layer` | 584.7 | 184.0 | 40 |
| ColorInput **inactive** | `.dock-layer` | **519.7** | **400.5** | 46 |
| ActionToolbar **leaving/inactive** | `.dock-layer` | **519.7** | **400.5** | 46 |
| ColorInput **active** | `.dock-layer` | 584.7 | 282.5 | 45.9 |

The inactive layer's box **overhangs the grid by 65.0 px to the left** (519.7 vs 584.7) and by
**151.5 px to the right** (920.2 vs 768.7) — it is stretched across the entire dock face, straddling
the sibling `Back` `DockControl` and `DockSeparator` that sit *outside* `.dock-layer-grid`
(`ActionBarLayer.vue:100` / `Dock.vue:154-155`).

Today this is invisible only because C-1 means nothing ever renders during that window. **Fix C-1
without fixing C-3 and the crossfade appears at the wrong size, from the wrong origin, over the
wrong controls.**

**Reproduction.** `getComputedStyle(document.querySelector('.dock-layer-grid')).display` → `"block"`;
`[...g.children].find(c => !c.classList.contains('is-active')).offsetParent.className` →
`"dock-face"`.

**Cure.** Subsumed by C-2 (`.dock-crossfade { display:grid; position:relative; isolation:isolate }`).
**Do not** patch by adding a local `.dock-layer-grid { display:grid; position:relative }` rule — that
deepens C-4.

---

## C-4 · MAJOR — the file hand-writes the producer's private layer vocabulary, nested inside a real producer layer
*(re-verified; was D-4)*

`subLayerProps` (line 91) emits `class: ["dock-layer", { "is-active": …, "is-leaving": … }]` — the
producer's own internal class names — and the shim's only reason for working at all is that the
producer's CSS happens to match them.

**Evidence — measured nesting, from the live DOM:**

```
producerLayerAncestor: "dock-layer dock-layer--full is-active"
layers: ["dock-layer dock-layer--full is-active",                              ← producer's DockLayer
         "flex items-center justify-around flex-1 dock-layer is-active",       ← hand-written
         "grid grid-cols-1 gap-y-2 p-0 m-0 dock-layer min-w-0",                ← hand-written
         "dock-layer dock-layer--summary"]
```

A `.dock-layer` **inside** a `.dock-layer`. The producer's selectors are descendant-scoped, not
child-scoped:

```css
:where(.glass-dock, .dock-layer-group) .dock-layer { display:flex; align-items:center;
    grid-area: 1 / 1; gap: var(--dock-layer-gap, 0.375rem); }
.glass-dock:not(.vertical) .dock-layer { white-space: nowrap; min-height: var(--dock-layer-height, 2.5rem); }
.glass-dock[data-morphing] .dock-layer.is-active > * { opacity: var(--child-reveal);
    scale: calc(0.82 + 0.18 * var(--child-reveal)); transform-origin: center; }
```

so every one lands on the nested sub-layers unintentionally — including the stagger rule, which will
drive `opacity` and `scale` on `ActionToolbar`'s and `ColorInput`'s children during any genuine dock
morph, and `min-height: 2.5rem`, which silently sets the sub-layer floor (measured: the inactive box
is 46 px tall against the active toolbar's 40 px).

**Mechanism.** An undeclared, name-based coupling to a producer's private CSS. Invisible to
`package.json`, to `vue-tsc`, and to every test; a glass release that renames `.dock-layer` or
tightens the selector to `>` breaks this component with **no compile error and no failing test**.

**Cure.** C-2. `DockLayer` renders its own `.dock-face` host and never asks the consumer to author
producer class names.

---

## C-5 · MAJOR — propose mode has **no exit path**: the child's "signal parent" is a comment, not a signal
*(NEW — not in the banked report)*

`ActionBarLayer` owns the three-state machine (`toolbarMode`, line 30) and is the sole authority on
leaving `"propose"`. Its child announces that it will report completion:

`demo/shell/dock/ColorInput.vue:236-241`

```ts
await proposeColorName(proposedName.value.trim().toLowerCase(), cssStr);
proposedName.value = "";
// Signal parent to exit propose mode
if (inputColorRef.value) {
    inputColorRef.value.innerText = formattedCurrentColor.value;
}
```

**The comment is false. There is no signal.** `ColorInput` declares no emits at all:

```
$ grep -c "defineEmits" demo/shell/dock/ColorInput.vue
0
$ grep -n "emit(" demo/shell/dock/ColorInput.vue
(no output)
```

and `ActionBarLayer` binds no listener on it (`ActionBarLayer.vue:115-121` — only `ref`,
`v-bind`, `:edit-target`, `:propose-mode`, `class`). What the code actually does is write
`formattedCurrentColor` into the contenteditable *while still in propose mode*, so the field that
says "propose a name…" is silently repopulated with a CSS color string, and the toggle still reads
`Close propose`. The user's successful submission produces no mode change, no confirmation, and a
field whose contents now contradict its `aria-label` (`"Propose a color name"`,
`ColorInput.vue:15`).

**Mechanism.** State ownership without a completion channel: the owner of the mode never learns the
operation it opened the mode for has finished. This is the parent's defect — `ActionBarLayer` opened
a modal sub-state and provided no way back except a second manual click.

**Reproduction.** Code-certain from the two greps above (zero emits, zero listeners); the live
POST round-trip was not exercised (it requires a session + a network write, out of this seat's
read-only remit). The *absence of any exit channel* is certain; the exact on-screen residue after a
successful POST is **labelled a hypothesis.**

**Cure.** `ColorInput` emits `proposed`; `ActionBarLayer` handles it with
`toolbarMode = "actions"`. (Preferred, and KISS: the mode machine already has a legal
`propose → actions` edge at lines 42–44 — it just has no programmatic caller.)

---

## C-6 · MAJOR — `toolbarMode` is never reconciled when `canProposeName` flips false
*(NEW)*

`cycleToolbarMode` gates *entry* into `"propose"` on `actionBar.canProposeName.value` (line 37), but
nothing gates *remaining* there. There is no `watch` on `canProposeName` anywhere in the file
(`grep -n "watch" ActionBarLayer.vue` → line 71 only, inside the shim, watching `activeLayer`).

`canProposeName` is `!findCustomName(currentXYZString)` (`useColorNameResolution.ts:66-70`), so it
flips **false the instant a proposal succeeds** — the very transition C-5 fails to report. It also
flips on any external color change: the picker, a palette apply, `random()`, `reset()` (all three of
which `ActionToolbar` can fire, though it is inert in this mode) or a URL change.

Consequences, all reachable from a single stuck state:

- The component sits in `"propose"` for a color that **cannot be proposed**; the ColorInput keeps
  `data-placeholder="propose a name..."` (`ColorInput.vue:261`) and its
  `aria-label="Propose a color name"`.
- `currentToggleIcon` (line 47-51) returns `EllipsisVertical` for `"propose"` regardless, so the
  icon gives no signal that the state went stale.
- `defineExpose` publishes a **writable** `toolbarMode` (C-13), so any future caller can enter
  `"propose"` while `canProposeName` is false, bypassing the line-37 gate entirely.

**Reproduction.** Static: the gate at line 37 is the only read of `canProposeName` that affects
`toolbarMode`, and it is evaluated once per click. The stuck state is code-certain; a live
demonstration needs a successful POST (see C-5) and is **labelled a hypothesis** for the
network-driven leg. The non-network leg (enter propose, then change the color to one that already
carries a custom name) is code-certain from the same two lines.

**Cure.** `watch(() => actionBar.canProposeName.value, ok => { if (!ok && toolbarMode.value === "propose") toolbarMode.value = "actions"; })` — or, better, derive the mode from a single source
rather than caching it in a local `ref` that can disagree with its own gate.

---

## C-7 · MAJOR — the toggle is a disclosure control that discloses nothing to assistive technology
*(re-verified and extended; was D-13)*

**Evidence — measured, live, over the ActionBarLayer subtree:**

```
toggle: { tag: "BUTTON", role: null, ariaExpanded: null, ariaControls: null, ariaPressed: null,
          w: 40, h: 40 }
ariaLiveInDock: 0
inputPrecedesToggleInDom: true
focus at all 9 swap frames: "BODY.relative"
```

The control at lines 129–142 swaps a `role="textbox"` in and five named buttons out of the a11y
tree, and:

- carries **no `aria-expanded`** — the one attribute that makes a show/hide control legible;
- carries **no `aria-controls`** — no programmatic relationship to either sub-layer;
- has **no `aria-live` region anywhere in the dock** — the mode change is announced by nothing;
- performs **no focus management at all**: `grep -c "focus" demo/shell/dock/layers/ActionBarLayer.vue`
  → **0**. Measured: `document.activeElement` was `BODY` before the swap and `BODY` at every one of
  the nine frames after it.

**New, measured, and worse than the banked report claimed: the revealed control precedes its own
trigger in DOM order.** `inputPrecedesToggleInDom: true` — the `contenteditable` textbox is inside
`.dock-layer-grid` (line 101-122) while the toggle is its following sibling (line 129). So after a
keyboard user activates "Open color input", **forward `Tab` from the toggle moves away from the
thing that just appeared**; reaching it requires `Shift+Tab`, with no announcement that it exists.

**New: the file applies two different focus policies to the same field.** Entering `"propose"` *does*
focus it — `ColorInput.vue:262`, `requestAnimationFrame(() => inputColorRef.value?.focus())` — but
entering `"input"`, the state this toggle's primary label opens, does not. One control, one field,
two behaviours, decided in a different file.

The repo already knows. `e2e/smoke/flows/color-propose.spec.ts` COVERAGE NOTE:

> the propose-mode `<span role="textbox" contenteditable>` lives in the dock's collapse-cycle layer
> and is not reliably reachable via accessible-name selectors during the cross-fade.

A control a test harness cannot reach by accessible name during a state change is a control a
screen-reader user cannot reach either. The finding was filed and the gate was written *around* it.

**Cure.** `:aria-expanded="showInput"` plus an `:id`/`aria-controls` pair on the sub-layer hosts, and
one focus policy for both reveal legs — and structurally C-2, which inherits the producer's
documented focus-transfer-on-dissolve. Note the sibling `ActionBarToggle.vue` in this same directory
already models the right idiom (`aria-label` **and** `:aria-pressed` **and** `:tabindex`): the
pattern exists locally and was not applied here.

---

## C-8 · MAJOR — vacuous gate, and the e2e spec cites a fallback test **that does not exist**
*(the citation leg is NEW; the mutation leg was D-5)*

**Evidence — zero unit coverage.**

```
$ find test/ -type f | wc -l
23
$ find test -iname "*dock*" -o -iname "*action*" -o -iname "*layer*"
(no output)
$ grep -rln "ActionBarLayer" test/ e2e/ demo/
e2e/smoke/flows/color-propose.spec.ts
```

**Evidence — the sole gate's own coverage claim is false.** `e2e/smoke/flows/color-propose.spec.ts:20-26`:

> The cycle-state assertion here proves the propose pathway is wired; **the contenteditable
> submission has unit coverage in `test/parsing/extract.test.ts` via the underlying
> `submitProposedName` handler.**

```
$ find . -name "extract*.test.ts" -not -path "*/node_modules/*"
(no output)
$ ls test/parsing/
timeline
$ grep -rn "submitProposedName\|proposeColorName" test/ e2e/
e2e/smoke/flows/color-propose.spec.ts:24: * `submitProposedName` handler.
```

`test/parsing/` contains one directory (`timeline/`) and no `extract.test.ts`. The only occurrence of
`submitProposedName` in the entire test surface is **the sentence claiming it is covered**. The
propose submission — the third state of this component's own mode machine, and the leg C-5 and C-6
break — has **zero coverage anywhere**, and the gate's prose asserts the opposite. That is worse than
a vacuous gate: it is a coverage gap wearing a receipt.

**Evidence — the surviving assertions cannot fail.** The whole spec:

```ts
await page.getByRole("button", { name: "Toggle action bar" }).click();
await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0, { timeout: 5000 });
await page.getByRole("button", { name: "Open color input" }).click();
await expect(page.getByRole("button", { name: "Propose color name" })).toBeVisible();
```

Every assertion reads the **toggle's `aria-label`**, computed at line 131 from `toolbarMode` and
`actionBar.canProposeName` alone. The toggle lives *outside* `.dock-layer-grid` and is never inert
during the flow — measured: `toggleLabelAfter: "Propose color name"` after one click, exactly as the
spec asserts, with the sub-layer machinery in whatever state it likes.

**The exact mutations that keep it green:**

1. Delete lines 53–95 entirely and replace `subLayerProps` with `() => ({})` — no crossfade, no
   `inert`, both sub-layers rendered stacked and simultaneously interactive. **Green.**
2. `const SUB_LAYER_CROSSFADE_MS = 0` — or `10_000_000`. **Green** either way.
3. Invert the guard: `inert: isActive ? true : undefined` — inert the *visible* layer, leave the
   hidden one in the tab order. **Green.**
4. Swap the ids: `subLayerProps('input')` on `ActionToolbar` and `subLayerProps('actions')` on
   `ColorInput` — the wrong layer shows in every mode. **Green.**
5. Delete `provide(COLOR_MODEL_KEY, …)` at line 22 — `ColorInput` throws on `inject(...)!`… only when
   the input layer renders, which the spec never asserts anything about. **Green** up to the last
   assertion, which reads only the toggle.

Mutation 3 is the alarming one: a live a11y regression (a hidden `role="textbox"` plus five hidden
buttons left in the tab order) that this component's only gate cannot see.

**Cure.** A component test asserting the invariants that matter — exactly one sub-layer carries
`is-active`, the other carries `inert`, the active id tracks `toolbarMode`, and the propose leg
returns to `actions` on success — and **delete the false citation** at spec line 24 rather than let it
stand as evidence.

---

## C-9 · MAJOR — no size reserve: the swap is an unreserved layout jump
*(re-verified with this run's numbers; was D-6)*

**Evidence — measured.** Active sub-layer width across the swap:

```
before toggle:  active ActionToolbar  w = 184.0 px   (x 584.7)
after  toggle:  active ColorInput     w = 282.5 px   (x 584.7)
```

a **+98.5 px** instantaneous change (the banked run measured +106.4 px at a different viewport; both
are jumps, neither is interpolated), with no reserved box and — per C-1 — nothing to interpolate.

The producer's primitive documents this as its own job: `DockCrossfade.vue.d.ts` describes the
reserved box sized to the peak face as a measure-once `min-block-size`, with
`reserve: "block" | "inline"` selecting the axis — `inline` is documented for exactly this shape, a
horizontal control run.

The shim's own comment (line 55) concedes glass's version did "the layer size-morph **+** crossfade",
then reimplements only the crossfade bookkeeping — and, per C-1, not even that.

**Cure.** C-2, with `reserve="inline"`.

---

## C-10 · MINOR — the crossfade timer is never cleared; the component's whole state dies with it
*(extended; was D-7)*

`ActionBarLayer.vue:70-79`:

```ts
let timer: ReturnType<typeof setTimeout> | null = null;
watch(opts.activeLayer, (next, prev) => {
    …
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => { leavingLayer.value = null; }, SUB_LAYER_CROSSFADE_MS);
});
```

```
$ grep -c "onScopeDispose\|onUnmounted" demo/shell/dock/layers/ActionBarLayer.vue
0
```

The `watch` is auto-disposed with the setup scope; the pending `setTimeout` is not.

**The component does unmount mid-session — observed, twice, during this run.** At `/#/`, between two
consecutive read-only probes issued ~10 s apart with **no navigation from me**,
`document.querySelector('.dock-layer-grid')` went from non-null to null and the dock's face list
went 4 → 3 with the action-bar face gone:

```
dockCls: "glass-dock horizontal shape-pill layout-linear dock-scroll-x collapsed fit-content dock-inline"
faces:   ["dock-face justify-center", "dock-face justify-center", "dock-face is-active"]
layers:  ["dock-layer dock-layer--full", "dock-layer dock-layer--summary is-active"]
```

`Dock.vue:153,156` gates the layer behind two `v-if`s (`hasAnyActionBar`, then `actionBar`), so the
context going away destroys the instance. **Because `toolbarMode` (line 30) is a component-local
`ref` with no lift and no persistence, that unmount silently discards the user's mode and any
half-typed color.** The *measured fact* (the layer vanished while the dock auto-collapsed) is
certain; the precise mechanism that flipped `hasAnyActionBar` is **labelled a hypothesis** — I did
not isolate it.

**Cure.** C-2 removes the timer entirely (the producer owns the crossfade lifetime). If C-2 is
deferred: `onScopeDispose(() => timer && clearTimeout(timer))`. Independently, `toolbarMode` should
be lifted to the owner that survives the layer, or the layer should not be `v-if`-destroyed.

---

## C-11 · MINOR — three template refs, all unread; two competing idioms in one 158-line file
*(re-verified; was D-8)*

`ActionBarLayer.vue:28-29`:

```ts
const colorInputRef = ref<InstanceType<typeof ColorInput> | null>(null);
const actionToolbarRef = ref<InstanceType<typeof ActionToolbar> | null>(null);
```

```
$ grep -rn "colorInputRef\|actionToolbarRef" demo/
demo/shell/dock/layers/ActionBarLayer.vue:28:const colorInputRef = ref<...>(null);
demo/shell/dock/layers/ActionBarLayer.vue:29:const actionToolbarRef = ref<...>(null);
demo/shell/dock/layers/ActionBarLayer.vue:103:                ref="actionToolbarRef"
demo/shell/dock/layers/ActionBarLayer.vue:116:                ref="colorInputRef"
```

Declared, bound, **never read** — no `.value` access anywhere in the repo. Meanwhile `subLayerGridEl`
(line 83) uses `useTemplateRef`, the Vue 3.5 idiom, while these two use the pre-3.5 `ref(null)` idiom:
**two idioms for one job in one file**, against owner edict 7. And `subLayerGridEl` is itself dead —
its sole consumer is `void opts.containerEl` (C-12). Net: **all three template refs are unread.**

**Cure.** Delete `colorInputRef`; `subLayerGridEl` goes with C-2. Keep `actionToolbarRef` **only** if
the C-15 cure is taken via reach-in, and convert it to `useTemplateRef`.

---

## C-12 · MINOR — a parameter preserved for "signature parity" with a function that exists nowhere
*(re-verified; was D-9)*

`ActionBarLayer.vue:63-67`:

```ts
function useLayerTransition(opts: { containerEl: Ref<HTMLElement | null>; activeLayer: Ref<string>; }) {
    void opts.containerEl; // signature parity with the retired producer composable
```

```
$ grep -rn "useLayerTransition" node_modules/@mkbabb/glass-ui/dist/
(no output)
```

`containerEl` is threaded from a `useTemplateRef` (line 83), passed at the call site (line 86), and
immediately discarded — parity with a composable that does not exist, for a caller that does not
exist, against a second implementation that will never be swapped in. Back-compat shimming against a
void (edict 2) and contrivance (edict 3). It also drags `Ref` and `useTemplateRef` into line 2 where
neither is otherwise needed.

**Cure.** C-2. Interim: delete the parameter, the call-site argument, the `ref="subLayerGridEl"`
binding, and the `Ref` / `useTemplateRef` imports.

---

## C-13 · MINOR — `defineExpose` publishes three members with zero consumers, one of them writable state
*(re-verified; was D-10)*

`ActionBarLayer.vue:96`: `defineExpose({ currentToggleIcon, toolbarMode, cycleToolbarMode });`

```
$ grep -rn "currentToggleIcon\|cycleToolbarMode\|toolbarMode" demo/ e2e/ test/ | grep -v "layers/ActionBarLayer.vue"
(no output)
```

Zero consumers outside the file. The sole mount site (`Dock.vue:156`) passes props and listens to
events; it holds no template ref to this component.

Exposing a **writable** `toolbarMode` is worse than dead: it publishes a second, ungated way to set a
mode whose only legal transitions are encoded in `cycleToolbarMode` (lines 33–45). A caller writing
`toolbarMode.value = "propose"` bypasses the `canProposeName` gate at line 37 — and per C-6 nothing
downstream will reconcile it.

**Cure.** Delete line 96.

---

## C-14 · MINOR — a prop is computed, passed, declared, and never used
*(re-verified; was D-11)*

`ActionBarLayer.vue:106` passes `:can-propose-name="actionBar.canProposeName.value"` to `ActionToolbar`.

```
$ grep -n "canProposeName" demo/shell/dock/ActionToolbar.vue
72:    canProposeName: boolean;
```

One hit: the declaration. It appears nowhere in `ActionToolbar`'s 63-line template. A reactive
dependency that re-renders the toolbar for nothing and misstates the toolbar's contract to every
reader.

**Cure.** Drop the binding at line 106 and the declaration at `ActionToolbar.vue:72`.

---

## C-15 · MINOR — the toolbar's hover state is never reset when the toolbar is hidden
*(re-verified; was D-12)*

`ActionToolbar.vue:85-91` keeps `activeHover` across its five `ActionButton`s and publishes the cure:

```ts
const activeHover = ref<string | null>(null);
function clearHover() { activeHover.value = null; }
defineExpose({ clearHover });
```

```
$ grep -rn "clearHover" demo/
demo/shell/dock/ActionToolbar.vue:87:function clearHover() {
demo/shell/dock/ActionToolbar.vue:91:defineExpose({ clearHover });
```

**No caller.** `ActionBarLayer` holds `actionToolbarRef` (C-11) — the only handle from which
`clearHover()` could be called — and never calls it. When `activeSubLayer` flips to `input`, the
toolbar goes `inert` carrying whatever `activeHover` was last set, and restores it on the way back.

**Reproduction.** NONE — mechanism established from the unread expose; the pointer sequence that
strands `activeHover` (keyboard-driven cycling, or a pointer resting on a toolbar button at the
moment the layer is inerted) was not reproduced live. **Labelled a hypothesis.**

**Cure.** Preferred (KISS, no cross-component reach-in): move the reset into `ActionToolbar` via a
`watch` on an `active` prop.

---

## C-16 · MINOR — an untokenized magic duration that is also **out of step with the clock it shares**
*(extended with a measured disagreement; was D-14)*

`ActionBarLayer.vue:62`: `const SUB_LAYER_CROSSFADE_MS = 260;`

`260` matches no token. From `dist/styles/tokens/scheme-motion.css`:

```
--duration-instant: 0.1s;  --duration-control: 0.12s;  --duration-fast: 0.2s;
--duration-normal: 0.3s;   --duration-slow: 0.45s;     --duration-panel: 0.55s;
```

**New, measured: the shim's clock does not even govern the hide it thinks it governs.** The producer
hides the layer with `transition: visibility 0s linear var(--duration-normal)` — a **300 ms** delay
that starts when `is-leaving` is removed. Measured: `is-leaving` cleared at t = 286 ms (the 260 ms
timer), `visibility` was still `"visible"` at t = 403 ms and only `"hidden"` at t = 628 ms. So the
element occupies a `visibility: visible`, 400.5 px-wide, mis-positioned box (C-3) for
**≈560 ms** — 2.15× the duration the constant claims to control. The two clocks are 40 ms apart and
neither knows about the other, because the JS number is coupled to no CSS in the repo.

The asymmetry is inside this one file: 72 lines below, the toggle **icon** swap uses the house family
correctly — `<Transition name="vj-morph" mode="out-in">` (line 134), fully tokenized at
`demo/styles/animations.css:104-117` (`opacity var(--duration-fast) var(--ease-decelerate)`,
`transform var(--spring-snappy-duration) var(--spring-snappy)`) and neutralised by the global
`prefers-reduced-motion` guard — and `demo/DESIGN.md:275` cites this very file as the reference:

> PaletteCard.vue's golden-text-shimmer demonstrates the cubic-bezier path, **ActionBarLayer.vue the
> duration-fast path**.

So the component animates a 24 px icon with the design system's tokenized, PRM-guarded morph family,
and animates the entire content region it toggles with a hand-rolled, off-system, PRM-unaware,
non-functional 260 ms timer.

**Cure.** C-2. KISS interim, using vocabulary already in this file and already blessed by DESIGN.md:
a plain `<Transition name="vj-morph" mode="out-in">` around the sub-layer content — which is what the
icon 40 lines below already does, is PRM-guarded, and would actually render.

---

## C-17 · MINOR — `pointer-events-auto` inside a layer whose hiding depends on `pointer-events: none`
*(NEW)*

The producer hides an inactive sub-layer with
`.dock-layer:not(.is-active):not(.is-leaving) { opacity:0; visibility:hidden; pointer-events:none }`
— measured on the live inactive layer: `pe: "none"`. But its immediate child re-enables hit-testing:

`demo/shell/dock/ColorInput.vue:3-8`

```vue
<Popover trigger="hover" :close-delay="0" :open-delay="300"
         class="pointer-events-auto w-full">
```

`pointer-events` is inherited, and a descendant setting `auto` becomes hit-testable again regardless
of the ancestor's `none`. Today this is masked entirely by the `inert` attribute the shim also sets
(line 92). **The hidden layer is therefore one attribute away from being clickable** — and per C-3
that box is 400.5 px wide and overhangs the grid by 65 px to the left, i.e. directly over the `Back`
control. Mutation 1 and mutation 3 of C-8 both remove `inert` and both stay green.

**Reproduction.** Measured: layer `pointerEvents: "none"`, `inert: true`; the child's
`pointer-events-auto` class is code-certain from the template. The clickable-overlay outcome is
contingent on `inert` being absent and is **labelled a hypothesis** for the current tree.

**Cure.** C-2 (the producer's `.dock-face` owns the hiding, and `DockCrossfade` does not rely on a
consumer class to stay non-interactive). Independently, `ColorInput`'s `pointer-events-auto` is a
per-instance override against edict 5 and should be removed or moved to the glass root.

---

## C-18 · INFO — `canProposeName` ignores built-in CSS names, contradicting the gate's own stated contract
*(NEW)*

`e2e/smoke/flows/color-propose.spec.ts:7-9` states the contract:

> the `canProposeName` computed (**true when the active color doesn't match a built-in or custom
> name**) gates the cycle into the propose leg

The implementation checks **only** the custom registry:

`demo/color-session/useColorNameResolution.ts:66-70`

```ts
const canProposeName = computed(() => {
    const colorString = currentXYZString.value;
    const hasCustom = !!findCustomName(colorString);
    return !hasCustom;
});
```

`demo/color-session/useCustomColorNames.ts:60-65`

```ts
function findCustomName(xyzString: string): string | undefined {
    for (const [name, xyz] of normalizedCustomNames.value) { if (xyz === xyzString) return name; }
    return undefined;
}
```

`normalizedCustomNames` is the proposed-names registry; no built-in table is consulted. So the
propose leg is offered for `red`, `rebeccapurple`, `tomato` — every named CSS color. `ActionBarLayer`
is the consumer that acts on it: line 37 lets the cycle into `"propose"` and line 131 renders the
accessible name `"Propose color name"`.

Charged to `useColorNameResolution`, filed here because this component is the only place the divergence
is user-visible, and because the divergence is between the implementation and **the prose of its own
gate** — the same failure mode as C-8.

---

## C-19 · INFO — a re-provide justified as back-compat, and an unnamed DI failure
*(was D-15)*

`ActionBarLayer.vue:21-24`:

```ts
// Re-provide COLOR_MODEL_KEY so ColorInput works unchanged
provide(COLOR_MODEL_KEY, actionBar.colorModel);
const safeAccent = inject(SAFE_ACCENT_KEY)!;
```

1. The comment declares the re-provide a compatibility measure ("so ColorInput works unchanged") —
   edict 2. The honest framing is that `ActionBarLayer` *is* the DI boundary for its subtree; say
   that, or pass the model as a prop.
2. `provide` is called once at setup with `actionBar.colorModel` evaluated once. `actionBar` comes
   from `ColorPicker.vue:315` via `App.vue:38` (`colorPickerRef?.actionBarContext ?? null`); the
   object is stable for a `ColorPicker` lifetime, and a `ColorPicker` remount destroys this component
   too (`Dock.vue:156` `v-if`), so the provided value cannot go stale in the current tree. Filed as a
   latent hazard, **not** a live defect — the guarantee is incidental, not stated.
3. `inject(SAFE_ACCENT_KEY)!` asserts non-null; absent a provider the failure is
   `Cannot read properties of undefined (reading 'value')` inside a render function. The producer
   this file already imports from models the alternative — `dist/dockContext-*.js` throws
   *"[glass-ui:dock] useDockContext() called outside `<GlassDock>`; use useOptionalDockContext() if
   the primitive may render outside a dock."*

**Reproduction.** NONE for (2) and (3) — no path was found that mounts `ActionBarLayer` outside the
provider or swaps the context identity. **Labelled hypotheses.**

---

## C-20 · INFO — the visual matrix has **zero** coverage of this component's rendered state
*(NEW as a stated finding)*

I read `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/picker.png` at full
resolution. The dock renders `Home ▾ | Tools → | Login | @mbabb` — the collapsed main layer. **The
action-bar layer is closed in all 60 captures across all 4 matrices**, so none of C-1, C-3, C-6, C-7 or
C-9 could ever have appeared in the visual audit. The dock itself renders correctly at rest: no
clipping, no overflow (`overflowX: 0` on every row), no contrast failure attributable to this
component.

Two `REPORT.json` rows do touch this subtree, and both are correctly attributed elsewhere:

- `namelessButtons: 1` on `safari-desktop-light /#/` **and** `safari-desktop-dark /#/` (0 on both
  mobile rows). Measured live, the one nameless control inside `.dock-layer-grid` is
  `<button class="send-btn btn-interactive">` at **24×24** — `ColorInput.vue:76-82`, the `v-else`
  submit arrow, which has no `aria-label`. It is `ActionBarLayer`'s subtree contribution to that
  count; charged to `ColorInput`.
- `smallTapTargets: 8` on `safari-desktop-light /#/`. **None are in this subtree** — measured, the
  five action buttons are 32×32, the toggle 40×40, the textbox 400.5×46, the send button 24×24; zero
  below 24×24. The eight are `Switch to slug` / `Generate new slug` / `Cancel` at 22×22 and four
  12×24 channel handles — `SlugEditLayer` and the sliders.

Separately worth recording for the visual band: the two mobile rows report `allElements: 228` and
`bodyTextLength: 70` against desktop's `1738` / `859`. The mobile picker capture did not render the
app; those rows are not evidence of anything about this component.

---

## Checks run that found nothing (the negative record)

Reported so this seat's silence is legible, not an omission.

- **`verbatimModuleSyntax` (edict 8): CLEAN.** Line 5 (`import type { ActionBarContext }`) and line 9
  (`import type { EditTarget }`) are type-only; line 2 uses the inline `type Ref` modifier. Correct.
- **`defineModel` stale-read hazard: NOT PRESENT.** No `defineModel` in the file; `toolbarMode` is a
  plain local `ref`, so there is no async parent round-trip to go stale on. (Note: `Dock.vue:145`
  does use `v-model:active` on `SlugEditLayer` — a different component, a different seat.)
- **`ValueUnit` nesting accumulation: NOT PRESENT.** No `ValueUnit` construction or unwrapping in this
  file or on its template surface.
- **oklch→HSV hue drift / `stableHue`: NOT APPLICABLE.** No color math here; the pipeline is injected
  and passed through untouched.
- **Ungated `requestAnimationFrame` (PRM-RAF epidemic): NOT PRESENT in this file.**
  `grep -c requestAnimationFrame demo/shell/dock/layers/ActionBarLayer.vue` → 0. The child
  `ColorInput.vue:262` runs a single rAF (one-shot focus, not a loop); `Dock.vue:105` runs a one-shot
  rAF for `dockSettle`. Neither is a loop.
- **reka-ui slider pointer-capture leak: NOT APPLICABLE.** No slider primitive in this component.
- **WebGL: NOT APPLICABLE.** No WebGL on this path. `REPORT.json` records
  `"safari-desktop-light /#/: WebGL: context lost."` — the source is the hero blob, not the dock.
- **Parser crash class: NOT APPLICABLE to this file.** `ActionBarLayer` parses nothing; the
  `parseAndSetColor` / `parseAndSetColorDebounced` calls live in `ColorInput.vue:194-217`.
- **`v-bind` / `class` merge order (lines 104+120): CORRECT.** `v-bind="subLayerProps('input')"`
  precedes a static `class="min-w-0"`; Vue's `mergeProps` concatenates. Verified live:
  `class="grid grid-cols-1 gap-y-2 p-0 m-0 dock-layer min-w-0"` — both survive.
- **`inert` fallthrough onto component roots: CORRECT.** Both `ActionToolbar` and `ColorInput` are
  single-root SFCs, so the fallthrough attr lands. Verified live: `inert: [false, true]` before the
  swap, `[true, false]` after.
- **Rapid-toggle race in the shim: NO DEFECT.** `leavingLayer` is always the immediately preceding
  `currentLayer`, the `next === prev` guard is present (line 72), and the timer is cleared on every
  swap (line 75), so no element can carry both `is-active` and `is-leaving`. Traced across
  actions→input→actions and actions→input→propose; `showInput` is `mode !== "actions"`, so the
  input→propose leg correctly does not fire the watch. Confirmed live: `act` and `leav` are never both
  true for the same index in any of the nine frames.
- **Toggle tap target: PASS.** Measured 40×40 — above the 24 px floor and above the 44 px-adjacent
  house target only on one axis, but not a REPORT defect.
- **Horizontal overflow: PASS.** `overflowX: 0` on all four picker matrix rows.

---

## Defect family

Thirteen of the twenty findings share one mechanism: **a producer primitive was hand-reimplemented in
the consumer, coupled to the producer's private CSS by name, and the reimplementation dropped the
parts that were doing the work** — the opacity animation (C-1), the containing block (C-3), the peak
reserve (C-9), the lifetime (C-10), the focus contract (C-7) and the hiding guarantee (C-17) — while
accreting the ceremony of the thing it replaced (C-11, C-12, C-16). C-2 is the root: the successor
was never missing.

A second, smaller family is **prose asserting behaviour the code does not have**: the shim's comment
that no successor exists (C-2), `ColorInput`'s "Signal parent to exit propose mode" above no signal
(C-5), the e2e spec's citation of a test that does not exist (C-8), and the same spec's description of
a `canProposeName` that checks built-ins when it does not (C-18). Every one of these was load-bearing
for someone's belief that the component was covered.

C-8 is why none of it was caught: the only gate reads a label that no defect above can change.

**Retiring the shim per C-2 discharges C-1, C-3, C-4, C-9, C-10, C-12, C-16 and C-17 in a single
transposition.** C-5, C-6, C-7, C-8, C-11, C-13, C-14, C-15, C-18, C-19 and C-20 are independent and
survive it.

---

## The retirement condition, stated exactly as asked

**None outstanding. The condition is already met at HEAD.**

CARRY-LEDGER §F conditions retirement of the local `useLayerTransition` on "glass ships a successor".
glass-ui **7.0.0 — the pinned, installed, currently-consumed version** — exports `DockCrossfade`,
`DockLayer`, `DockLayerGroup` and `useDockCrossfadeContext` from `@mkbabb/glass-ui/dock`, the same
specifier `ActionBarLayer.vue:8` already imports `DockControl`/`DockSeparator` from and which
`demo/shell/dock/index.ts:2` already re-exports. `dockCrossfadeContext.d.ts` exposes `activeId` and
`leavingId` — the two-refs contract the shim says it had to hand-roll. `Dock.vue:134` already renders
a `DockLayerGroup` whose `.dock-face` nodes are visible in the live DOM.

**Is the shim honest or divergent? Divergent, on three axes and in one direction:**

1. **Its premise is false** — the successor exists and predates the shim's own comment.
2. **Its behaviour is empty** — it preserves the *shape* of the retired contract (two refs, a class
   pair, an `inert` flag) while producing no transition at all (C-1), no reserve (C-9), no containing
   block (C-3) and no focus transfer (C-7). It is a faithful reproduction of the API and a total
   omission of the effect.
3. **Its clock is wrong** — 260 ms is not a token and does not match the 300 ms visibility delay it
   actually races (C-16), a disagreement measurable in the live app.

**W47 should execute the retirement unconditionally, and relay mark M2 should be WITHDRAWN rather
than awaited.** No glass release is required, requested, or blocking.

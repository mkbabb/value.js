claude-opus-5[1m] (served model id)

# CHALLENGE — `Tooltip` · axis **L (LIBRARY)**

**Subject.** `fourier-analysis/web/src/components/ui/tooltip/Tooltip.vue` (38 lines) +
`.../tooltip/index.ts` (1 line).
**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Read whole, plus every module it
imports transitively to the primitive floor:

| read | path | why |
|---|---|---|
| subject | `web/src/components/ui/tooltip/Tooltip.vue` | the component |
| subject | `web/src/components/ui/tooltip/index.ts` | the barrel |
| import | `@mkbabb/glass-ui/tooltip` → `dist/tooltip.js` → `dist/TooltipProvider-B3MkB_8P.js` | the 4 re-exported SFCs, compiled |
| import | `dist/components/ui/tooltip/{Tooltip,TooltipContent,TooltipTrigger,TooltipProvider}.vue.d.ts` | the type surface |
| floor | `reka-ui/src/Tooltip/{TooltipRoot,TooltipTrigger,TooltipContent,TooltipContentHoverable,TooltipContentImpl,TooltipPortal,TooltipProvider}.vue` | behaviour |
| floor | `reka-ui/src/Primitive/Slot.ts`, `reka-ui/src/Popper/PopperRoot.vue`, `reka-ui/src/Teleport/Teleport.vue`, `reka-ui/src/shared/useGraceArea.ts` | `as-child` + anchor + portal + grace-area semantics |
| runtime | `@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:1401-1540`, `@vue/runtime-core/dist/runtime-core.esm-bundler.js:4645-4755` | TransitionGroup / non-element-root law |
| mount | `web/src/App.vue:4,23,30` | the sole `TooltipProvider` |
| callsites | all 9 consumers (35 callsites), enumerated below | contract-in-practice |

**Method.** Static + source-derived only. No browser tooling. Livable-only magnitudes are marked
**UNPROVEN-NEEDS-LIVE** and routed to SS-13. Every claim carries `file:line` and its falsifier.

**Hitherto corpus folded, not re-invented.** `formation/fourier/CENSUS-2026-08-03.md` (§3a [FE §3]
"3 local `components/ui/` files are documented thin adapters, keep"; [FE §6] the Canvas2D viz
architecture; the 2026-08-03 addendum §2/§“Carried rows”) and
`audit/codex-provenance/intakes/lane-fourier-r3-r6.md` — rows **R3-7a** (35 callsites / 9 consumers,
→ F.W3), **R5-7** (native-template-loop invisibility, → F.W4), **R3-10** (6 dynamic `:is` families),
**X-9** (publish ONE scope law before any percentage). Overlaps are cited by row id; the one place
the tree disagrees with the corpus is called out explicitly (L-11).

**Verdict.** **0 BLOCKER · 4 MAJOR · 5 MINOR · 2 INFO · 3 SUPERLATIVE.** The shim does not crash and
does not leak memory. It is nonetheless the single highest-leverage 38 lines in the fourier frontend
— it is the sole choke point over 35 authored callsites that expand to **≥86 mounted instances**, and
four of its defaults are wrong for that fan-out.

---

## §1 — The shape, established from source (all later claims rest on this)

Every `<Tooltip>` expands to this instance tree. Nothing here is inferred; each hop is a source read.

```
<Tooltip>                       Tooltip.vue:26            component
└ GlassTooltip                  → reka TooltipRoot        TooltipProvider-B3MkB_8P.js:12-24
  └ PopperRoot                  reka TooltipRoot.vue:171  renders `<slot/>` ONLY  (PopperRoot.vue:36)
    ├ TooltipTrigger            Tooltip.vue:27            → PopperAnchor → Primitive(as-child)
    │ └ <slot/>                 the consumer's element, CLONED by Slot.ts:24-27
    └ TooltipContent            Tooltip.vue:30            → TooltipPortal → <Teleport to="body">
      └ Presence                TooltipContent.vue:29     nothing rendered while closed
```

**Load-bearing consequence:** `PopperRoot.vue:36` is `<template><slot /></template>` — a bare
Fragment with two children. So the `<Tooltip>` component vnode's `el` is a **Fragment start-anchor
Text node**, never an `Element`. §2/L-1 turns on exactly this.

**Cost per mounted instance (static count):** 7 component instances (shim, GlassTooltip/TooltipRoot,
PopperRoot, TooltipTrigger, PopperAnchor, TooltipContent, TeleportPrimitive) · 1 live
`<Teleport to="body">` once mounted (`Teleport.vue:38` `v-if="isMounted"`) contributing 2 empty
anchor Text nodes · 6 DOM listeners on the trigger (`TooltipTrigger.vue:38-48`: click, focus,
pointermove, pointerleave, pointerdown, blur) · 1 `useTimeoutFn` (`TooltipRoot.vue:150`) ·
1 `useVModel` + 1 `watch` (`TooltipRoot.vue:127,131`).

**The provider is correct and singular:** `App.vue:23` `<TooltipProvider :delay-duration="400"
:skip-delay-duration="200">` wraps `<RouterView/>`. *Falsifier run and refuted:* `grep -rn
"TooltipProvider" web/src` → exactly `App.vue:4,23,30`. No `TooltipRoot` in the tree is
provider-less, so the reka `createContext('TooltipRoot')` injection-throw path is unreachable. The
obvious BLOCKER candidate is **NOT present**; say so plainly.

---

## §2 — Defects

### L-1 · **MAJOR** — the shim has no element root, so anything that animates or attributes it fails silently

`Tooltip.vue:26-38` roots on `<GlassTooltip>`, which bottoms out at `PopperRoot.vue:36`'s bare
`<slot/>`. Three separate consequences, all provable from the runtime source:

**(a) `CoefficientsSpectrum.vue:161`'s `.coeff-list-move` is dead CSS.**
`CoefficientsSpectrum.vue:79-122` wraps the `v-for` of `<Tooltip>` rows in `<TransitionGroup
name="coeff-list">`. Vue 3.5's TransitionGroup builds its FLIP set with
`runtime-dom.esm-bundler.js:1464` — `if (child.el && child.el instanceof Element && !child.el[vShowHidden])`.
A Fragment anchor is a `Text`, not an `Element`, so **no child is ever pushed to `prevChildren`**,
`positionMap` (`:1476`) is never populated, and `onUpdated` returns at `:1421`
(`if (!prevChildren.length) return`). The authored move transition at
`CoefficientsSpectrum.vue:161` can never apply. The sibling rules at `:147/:150/:153/:157`
(`-enter-active`, `-leave-active`, `-enter-from`, `-leave-to`) are in the same position.

**(b) A dev-console warning fires per child per render.**
`runtime-core.esm-bundler.js:4672-4678`: when `vnode.transition` is set and `!isElementRoot(root)`,
Vue warns *"Component inside `<Transition>` renders non-element root node that cannot be animated."*
`isElementRoot` (`:4750-4752`) is `shapeFlag & (6|1) || type === Comment`; the PopperRoot Fragment
carries neither bit. With `topComponents` at 12 rows collapsed / 40 expanded
(`CoefficientsSpectrum.vue:37-39`), that is 12–40 warnings per spectrum re-render in dev.

**(c) Every attribute passed to `<Tooltip>` is silently dropped.**
`Tooltip.vue` declares no `defineOptions({ inheritAttrs: false })`, and the root is a fragment, so
`runtime-core.esm-bundler.js:4650-4658` fires *"Extraneous non-props attributes … could not be
automatically inherited because component renders fragment or text or teleport root nodes."* and the
attr is lost. **Latent, not live** — I checked all 35 callsites; none passes `class`, `style`, `id`
or a listener to `<Tooltip>` (only `text`, `side`, `v-if`, `v-for`, `:key`). A single future
`<Tooltip class="…">` fails quietly.

*Falsifier for (a)/(b):* if `PopperRoot` rendered a wrapper element, or if Vue's TransitionGroup
accepted non-Element `el`. Both refuted by direct read at the cited lines. *Falsifier for (c):* a
consumer already passing an attr — grep found none, so (c) is graded latent.

*Cure seat:* the shim. Either render an inline wrapper element (a `display:contents` span costs the
`as-child` purity) or move the `v-for` transition onto the row `<div>` inside the trigger slot. The
second is free and correct.

---

### L-2 · **MAJOR** — hoverable content is hard-wired ON for all 35 callsites, incl. 12 over the canvas render path

The shim never forwards `disable-hoverable-content`, and `App.vue:23` does not set it, so
`TooltipRoot.vue:117` resolves it to reka's provider default `false`
(`TooltipProvider.vue` `withDefaults … disableHoverableContent: false`). Every open tooltip therefore
renders `TooltipContentHoverable` (`TooltipContent.vue:31`) which calls `useGraceArea(trigger, content)`:

- `useGraceArea.ts:41-42` adds `pointerleave` listeners to **both** the trigger and the content;
- `useGraceArea.ts:74` adds a **document-level `pointermove`** listener while a grace polygon exists,
  running `isPointInPolygon` over a convex hull (`getHull`, `:34`) plus a
  `target.closest('[data-grace-area-trigger]')` DOM walk on every move event;
- the polygon is created on trigger **leave** (`:26-37`) and persists until the pointer re-enters or
  exits it — i.e. the document listener outlives the tooltip's visible life.

**Where this meets the viz render path.** Census [FE §6] records Canvas2D throughout (WebGL/WebGPU
absent) and three independent canvases. Twelve of the 35 callsites are dock buttons painted directly
over two of them:

| overlay | callsites | canvas beneath |
|---|---|---|
| `EditorControlsDock.vue:62,73,78,86,91,96,142,147,156,165` | 10 | the contour-editing canvas (pointer-drag editing, `lib/contourEditing.ts`) |
| `CanvasControlsDock.vue:53,58,70,76,86,92` | 6 | the epicycle instrument canvas |
| `CoefficientsSpectrum.vue:80` (×12–40 rows) | fan-out | sits in the same scroll container as the `#graph` slot → `FrequencyGraph.vue:63` `getContext("2d")` (`CoefficientsPanel.vue:16-22`) |

Every one of those tooltips carries a ≤3-word string (`"Undo"`, `"Redo"`, `"Fullscreen"`). None needs
hoverable content — nobody selects text out of "Undo". The shim buys 35 grace-area machines to serve
2 rich-content callsites (`FunctionInput.vue:198`, `CoefficientsSpectrum.vue:105`).

*Falsifier tested:* "the document listener only exists while the content is hovered" — **refuted**;
`useGraceArea.ts:57` gates the `watchEffect` on `pointerGraceArea`, which is *created* by
`handleCreateGraceArea` on **trigger leave** (`:41`), not on content enter. *Magnitude on a 60 Hz
contour drag:* **UNPROVEN-NEEDS-LIVE** → SS-13 (measure `pointermove` handler cost with a stale
grace polygon during canvas editing).

*Cure seat:* the shim — add `:disable-hoverable-content="!$slots.content"`. One line, correct
default, opt-out preserved for the 2 rich callsites.

---

### L-3 · **MAJOR** — 35 authored callsites are ≥86 mounted instances; the census denominator cannot see it (fuses **R3-7a** + **R5-7**)

R3-7a adopts "35 Tooltip callsites over 9 consumers" as the F.W3 migration budget. That is a
**physical** count. The **mounted** count is a different number, and the corpus already flags the gap:
R3-7 records `exactMountedInstanceDenominator: null` / `denominator.status: "OPEN"`, and R5-7 names
the exact mechanism — *loop evidence keyed to component callsites is blind to native element loops.*

`PaperSidebar.vue` is where the two rows collide. Its **2** physical Tooltip callsites sit inside the
**native `<li v-for>` loops at lines 65 / 87 / 105** — the same three lines R5-7 and R6-5 authenticate:

- `PaperSidebar.vue:70` `<Tooltip :text="getPreview(section)" side="right">` is inside
  `:65` `<li v-for="(section, si) in sections">`;
- `PaperSidebar.vue:88` `<Tooltip :text="getPreview(sub)" side="right">` is inside
  `:87` `<li v-for="sub in section.subsections">`.

Source-derived instance count: `PaperView.vue:120` feeds `sections = paperSections`, built at build
time from `paper/fourier_paper.tex` (`lib/paperContent.ts:7`, `virtual:paper-content`). Live tex:
`grep -c '^\section{'` → **51**, `grep -c '^\subsection{'` → **31**. `PaperView.vue:335` mounts
`<PaperSidebar>` unconditionally on `/paper`. So:

> **51 `TooltipRoot` instances on first paint of `/paper` from ONE authored callsite**, plus up to 31
> more as `CollapsibleContent` (`PaperSidebar.vue:85`) expands. At the §1 per-instance cost that is
> ~357 component instances, 51 `<Teleport to="body">` (102 anchor Text nodes in `<body>`), 306 DOM
> listeners and 51 timers — to decorate a static table of contents.

Add the component-loop callsites, which *are* visible to a callsite-keyed deriver (R5-7 cites
`callsite:…/FunctionInput.vue:157:Tooltip:…` as the populated contrast case):
`BasisSelector.vue:139` (×`basisDisplay`), `FunctionInput.vue:157` (×`PRESETS`),
`CoefficientsSpectrum.vue:80-84` (×12 collapsed / ×40 expanded).

*Falsifier:* "the 51 are cheap because content is lazy" — **partly true and already priced in**:
`TooltipContent.vue:29`'s `Presence` renders nothing while closed, so there are no 51 popovers. But
`Teleport.vue:38` mounts unconditionally once `useMounted()` flips, so the portal, its anchors and
all 6 trigger listeners *are* paid. *Falsifier:* "51 is wrong because starred sections don't
become rows" — `grep -c '^\section\*'` → **0**; every `\section` is a numbered row. The exact figure
depends on the `@mkbabb/latex-paper` parser's own filtering, which I could not execute read-only:
grade the **51/31** as tex-derived, the **≥1 callsite → ≥51 instances** relation as proven.

*Consequence for the formation:* R3-7a's F.W3 budget must be stated as **35 callsites / 9 consumers /
≥86 mounted instances**, and X-9's "publish ONE scope law before any percentage" applies here first.
A per-component audit that reports "PaperSidebar: 2 Tooltips" has measured the source and missed the
runtime by 25×.

---

### L-4 · **MAJOR** — 17 icon-only controls whose only label is a tooltip have no accessible name

reka wires the tooltip as a **description, and only while open**:
`TooltipTrigger.vue:118-120` → `:aria-describedby="rootContext.open.value ? rootContext.contentId : undefined"`,
and the text itself lives in a `VisuallyHidden role="tooltip"` inside the *content*
(`TooltipContentImpl.vue:121-126`, `ariaLabel = props.ariaLabel || currentElement.value?.textContent`,
`:64`). While closed — i.e. always, for a screen-reader user who never hovers — the trigger has
**no accessible name at all**.

Enumerated (icon-only trigger, no `aria-label`, no text node):

| file | lines | n |
|---|---|---|
| `EditorControlsDock.vue` | 62, 73, 78, 86, 91, 96, 142, 147, 156, 165 | 10 |
| `CanvasControlsDock.vue` | 53, 58, 70, 76, 86, 92 | 6 |
| `FunctionInput.vue` | 188 | 1 |
| | **total** | **17** |

*Falsifier run:* `grep -n "aria-label" EditorControlsDock.vue` → only `:105`, `:121`, `:136` — all
`HoverPopover`/slider triggers, **none** a Tooltip trigger. `CanvasControlsDock.vue` → only `:46`
(HoverPopover). So the 17 stand. The tree also proves the authors *know* the idiom: the same files'
non-tooltip triggers are labelled (`EditorControlsDock.vue:105` `aria-label="Magnet radius"`), and
three Tooltip triggers elsewhere *are* labelled (`BasisSelector.vue:130`, `ContourSettings.vue:200`,
`AnimationControls.vue:67,82`). The gap is a shim-default gap, not an author-ignorance gap.

*Cure seat:* the shim — bind `text` onto the trigger as `aria-label` when the trigger has no
accessible name, or expose an explicit `label` prop. One edit fixes 17 controls.

*Promotion note:* on the LIBRARY axis this is MAJOR. If F.W9's axe/CWV evidence is a close-gate
(census §4 F.W9), it promotes to BLOCKER — WCAG 4.1.2 name-role-value, 17 instances.

---

### L-5 · **MINOR** — a disabled trigger is a tooltip you can never read

`EditorControlsDock.vue:74` `<DockIconButton :disabled="!canUndo">`, `:79` (`!canRedo`), `:97`
(`!canDelete`) each sit inside a `<Tooltip>`. `DockIconButton` is a reka `Primitive` with
`as: "button"` and `type` forwarded (`glass-ui/dist/dock.js:1052-1053,1067-1074`), so `disabled`
lands as the **native** `disabled` attribute. Disabled form controls dispatch no pointer events and
are not focusable, so `TooltipTrigger.vue:38-48`'s `pointermove` / `focus` handlers never fire: the
tooltip is unreachable **exactly in the state where the user most needs to know why the control is
dead**.

*Falsifier:* "reka opens on `pointerenter` on the wrapping `PopperAnchor`, not the button" —
**refuted**: `PopperAnchor` is `as-child` (`TooltipTrigger.vue:110-113`), so it is the *same* DOM
node; there is no wrapper to receive the event. *Falsifier:* "`DockIconButton` maps `disabled` to
`aria-disabled`" — refuted at `dock.js:1046-1084`; `disabled` is not in its props table, so it falls
through `$attrs` to the `<button>`.

*Cure seat:* callsite (`aria-disabled` + inert styling) or shim (a documented `wrap` escape hatch).
Either way the shim's docblock (`Tooltip.vue:2-13`) must state the constraint; today it does not.

---

### L-6 · **MINOR** — `v-if` on the trigger, not on the tooltip: a fully-mounted tooltip with no trigger

`CoefficientsSpectrum.vue:124-135`:

```
<Tooltip :text="expanded ? … : …">
    <Button v-if="totalComponents > 12" …>      ← :126
```

When `totalComponents <= 12` the default slot yields a single **Comment** vnode. reka's `Slot`
(`Slot.ts:15-17`) does `children.findIndex(child => child.type !== Comment)`; at `-1` it
`return children` — **unmerged**. So the cloned-props path (`:24-27`) never runs: `ref`,
`data-state`, `data-grace-area-trigger`, `aria-describedby` and all six listeners
(`TooltipTrigger.vue:38-48`) are dropped on the floor, while the full 7-instance tree of §1 — plus
its `<Teleport to="body">` — stays mounted around nothing. `rootContext.onTriggerChange`
(`TooltipTrigger.vue:52`) is handed the comment node, so `PopperRoot`'s anchor is a non-`Measurable`.

No crash (the content never opens, so floating-ui never measures the anchor), **no warning**, and no
type error. The correct authoring is `<Tooltip v-if="totalComponents > 12">`.

*Falsifier:* "reka warns or throws on an empty as-child slot" — refuted by the `Slot.ts:15-17`
early return. *Falsifier:* "floating-ui throws on the comment anchor" — not reachable, because
without listeners `open` never flips.

*Cure seat:* the shim can add a dev-only guard (`import.meta.env.DEV` check that the default slot
yields exactly one non-comment element vnode). The class matters more than the instance: nothing in
the repo enforces the `as-child` contract that all 35 callsites depend on.

---

### L-7 · **MINOR** — the `as-child` contract silently accepts non-focusable and non-interactive triggers

reka's `Primitive` defaults `as: 'button'` (`TooltipTrigger.vue:22-24`) precisely so the trigger is
focusable; `as-child` in `Tooltip.vue:27` bypasses that unconditionally. Live consequences:

- `ContourSettings.vue:229-239`, `242-252`, `268-278`, `281-291`, `294-304` — 5 tooltips whose
  trigger is `SliderControl`'s root `<div class="slider-control">` (`ui/SliderControl.vue:65`).
  A `<div>` is not focusable, and `focus` does not bubble, so
  `TooltipTrigger.vue:41`'s `focus` handler can never fire from the nested `<input>`
  (`SliderControl.vue:71`). **Keyboard-only users never receive these five tooltips.**
- `CoefficientsSpectrum.vue:85` — the trigger is `<div class="coeff-row">`, same class, ×12–40 rows.
- `AnimationControls.vue:105-107` — the trigger is a bare lucide `<EllipsisVertical>` **`<svg>`**,
  nested *inside* `DockDropdownTrigger` (`:104`). The clone attaches six pointer/focus handlers and
  `data-grace-area-trigger` to an SVG inside another interactive control.
- `AnimationControls.vue:94-98` — the trigger is `<div class="hidden sm:block">`; at `<sm` the
  trigger is `display:none`, so the tooltip is dead weight on mobile.

*Falsifier:* "`SliderControl` is multi-root, so `as-child` merges onto the wrong node" — **refuted**,
`SliderControl.vue:65` is a single `<div>` root; the merge target is correct. The defect is
focusability, not shape. *Falsifier:* "`focusin` bubbles, so the input's focus reaches the div" —
reka binds `focus`, not `focusin` (`TooltipTrigger.vue:41`).

---

### L-8 · **MINOR** — duplicated types, amputated API, one line of dead code

`Tooltip.vue:19-22`:

```ts
defineProps<{ text?: string; side?: "top" | "right" | "bottom" | "left" }>();
```

- **Duplication.** The union re-declares reka's `Side`; the type is already reachable as
  `TooltipContentProps["side"]` (`glass-ui/dist/components/ui/tooltip/TooltipContent.vue.d.ts:2`,
  which the shim already imports the value side of). Drift is silent — a new reka side would
  typecheck at the primitive and fail at the shim.
- **Dead code.** `Tooltip.vue:31` `:side="side ?? 'top'"` re-implements reka's own `PopperContent`
  default of `'top'`. Passing `undefined` would produce the identical result.
- **Divergence from the design system.** `:side-offset="6"` (`:32`) overrides glass-ui's own
  `sideOffset: { default: 4 }` (`TooltipProvider-B3MkB_8P.js:33`) for all 35 callsites, with no
  recorded rationale and no override. Standing law (`feedback_glass_ui_first_class.md`,
  `feedback-glassui-bhbi-relay.md`) makes this a BH-inbox relay item, not a local constant.
- **Amputation.** Unreachable through the shim: `align`, `alignOffset`, `avoidCollisions`,
  `sticky`, `hideWhenDetached`, `arrowPadding`, `sideOffset`, `collisionPadding`, `class`,
  `ariaLabel`, `delayDuration`, `disabled`, `disableHoverableContent`, `disableClosingTrigger`,
  `ignoreNonKeyboardFocus`, `open`/`defaultOpen`/`update:open`, `escapeKeyDown`,
  `pointerDownOutside`. Three of those (`disable-hoverable-content`, `disabled`, `open`) are the
  exact knobs L-2 / L-5 / L-3 need — the amputation is *why* those defects have no callsite-side cure.

---

### L-9 · **MINOR** — error posture: `<Tooltip>` with neither `text` nor `#content` is legal and renders an empty bubble

`text?: string` (`:20`) and the `#content` slot (`:36`) are independently optional. With neither,
`{{ text }}` renders `""` inside `TooltipContent`'s `px-3 py-1.5 border glass-floating`
(`TooltipProvider-B3MkB_8P.js:63`) — an empty glass rectangle on hover, no warning, no type error.
The props type should be a discriminated union (`{ text: string } | { text?: never }` + required
slot) or the component should guard in DEV.

*Falsifier run:* all 35 callsites audited — every one supplies `text`/`:text` or a `#content`
template (`FunctionInput.vue:198`, `CoefficientsSpectrum.vue:105` are the two slot users; the other
three `template #content` hits in the tree, `EditorControlsDock.vue:109,140` and
`CanvasControlsDock.vue:51`, belong to `HoverPopover`, not `Tooltip`). **Zero live violations.**
Graded a type-level hole, not a live bug — recorded so F.W3 does not "discover" it as a regression.

---

### L-10 · **INFO** — two import identities for one component defeat a barrel-based census

`index.ts:1` exports the barrel, and 8 of the 9 consumers use it
(`ContourSettings.vue:21`, `BasisSelector.vue:6`, `CanvasControlsDock.vue:5`,
`EditorControlsDock.vue:7`, `AnimationControls.vue:7`, `VisualizationView.vue:11`,
`FunctionInput.vue:9`, `CoefficientsSpectrum.vue:21`) — but **`PaperSidebar.vue:2` imports the SFC
directly**: `import Tooltip from "@/components/ui/tooltip/Tooltip.vue"`.

Vite resolves both to the same module id, so there is **no** double instantiation (falsifier tested
and refuted — same absolute file, same `?vue` query, one module in the graph). The cost is purely
epistemic: a consumer census keyed on the barrel specifier misses exactly the file that contributes
~60% of the *mounted* instances (L-3). This is a micro-instance of R3-3's adopted evidence standard —
*a summary derived from one projection proves nothing about the other.*

---

### L-11 · **INFO / explicit correction to the corpus** — R3-7a's adapter count includes a doc-comment line

R3-7a's receipt reads: *"(`App.vue` +1 and the local adapter `ui/tooltip/Tooltip.vue` +3 sit outside
R3's consumer set.)"* Live re-derivation:

- `grep -rn '<Tooltip' web/src | wc -l` → **39**
- consumer callsites (R3's nine files) → **35** ✓ (R3-7a reproduces exactly; unchallenged)
- `App.vue` → **1**, and it is `<TooltipProvider` (`App.vue:23`), not a `<Tooltip>` — the grep is
  prefix-matching a different component
- adapter → **3**, of which `Tooltip.vue:7` is inside the block comment
  (`*   <Tooltip text="Hello" side="top">`); the two real template callsites are `:27`
  `<TooltipTrigger>` and `:30` `<TooltipContent>` — **neither is a `<Tooltip>`**

So the adapter's true `<Tooltip>` element count is **0**; its 3 grep hits are 1 comment + 2
differently-named components. **No substantive claim changes** — the 35/9 budget stands exactly as
adopted — but the "+1/+3" parenthetical is a grep artefact and should not be carried into F.W3 as a
count. Filed per L-18: the corpus row is right where it is load-bearing and loose where it is not.

---

## §3 — Superlatives (L-18 runs both ways)

### S-1 · **The shim is architecturally superior to the producer primitive it superficially duplicates**

glass-ui 4.0.0 already ships `IconTooltip` (`exports["./icon-tooltip"]`, props `{ text: string }` +
default slot) — on its face the same single-component API, which would make this shim a
glass-ui-first violation and R3-7a's F.W3 disposition a trivial rename. **It is not.** Reading the
compiled producer (`dist/IconTooltip-DSjasZIt.js:8-20`), `IconTooltip` wraps **its own
`TooltipProvider :delay-duration="250"` inside every instance**.

Under fourier's fan-out that is catastrophic: L-3's 51 PaperSidebar rows would instantiate **51
`TooltipProvider`s**, each with a private `isOpenDelayed` — destroying the app-level
`skip-delay-duration="200"` grouping at `App.vue:23` (the whole point of the provider) and
overriding the authored 400 ms delay with 250 ms. The fourier shim instead consumes the *decomposed*
primitives and inherits the single app provider. **That is the right call, and it is not an accident**
— `Tooltip.vue:2-13`'s docblock states the design intent explicitly.

**Direct consequence for F.W3 (route this):** the naive reading of R3-7a — "35 callsites / 9
consumers, barrel → `@mkbabb/glass-ui/tooltip`" — must **not** become "migrate to `IconTooltip`".
That would regress on three axes at once: 35 redundant providers, loss of `side` (**8** callsites use
it: `PaperSidebar.vue:70,88` · `CanvasControlsDock.vue:70,76,86,92` · `FunctionInput.vue:188` ·
`CoefficientsSpectrum.vue:83`), and loss of `#content` (**2** callsites). The correct F.W3 move is a
**BH-inbox relay** (standing law, `feedback-glassui-bhbi-relay.md`) proposing `side` + `#content` +
*provider removal* on `IconTooltip` upstream, and keeping the local adapter until that lands.

### S-2 · **`:collision-padding="8"` is a real, uniform correctness win**

`Tooltip.vue:33` sets `collisionPadding: 8`; reka's `PopperContent` default is `0`. The dock tooltips
are pinned to viewport edges by construction (`CanvasControlsDock.vue:92` `"Fullscreen"` with
`side="bottom"` on a bottom-edge dock; `EditorControlsDock.vue:62-67` in the collapsed dock
summary). Without the padding those contents kiss the viewport boundary. One constant, applied once,
correct at all 35 callsites — this is precisely what a shim is *for*, and it is the kind of decision
that is invisible in a callsite census.

### S-3 · **Goldilocks, and the reason the census's "0 direct reka-ui" row is true**

38 lines, one responsibility, one import, no god-module drift, no local state, no lifecycle, no
composable — nothing to leak and nothing to tear down (verified: no `onMounted`, no listener, no
timer, no `ref` in `Tooltip.vue`). Every one of the 35 callsites supplies content (L-9), and **no
consumer anywhere in `web/src` imports `reka-ui` directly** — census [FE §3]'s "0 direct reka-ui;
0 shadcn copies; deepest, cleanest consumer in the constellation". This shim is *why* that row reads
the way it does: it absorbed the primitive triple once instead of 35 times. Census §3a's "3 local
`components/ui/` files are documented thin adapters, **keep**" is correct on this file, and this
challenge does not disturb it.

---

## §4 — Tally, routing, and what SS-13 must measure

| id | severity | one-line | route |
|---|---|---|---|
| L-1 | MAJOR | fragment root ⇒ dead `.coeff-list-move`, per-render dev warning, attrs dropped | F.W4 |
| L-2 | MAJOR | hoverable-content hard-wired ⇒ document `pointermove` grace-area ×35, 12 over canvas | F.W4 |
| L-3 | MAJOR | 35 callsites ⇒ ≥86 mounted instances; denominator OPEN (R3-7a × R5-7) | F.W3 + F.W4 |
| L-4 | MAJOR | 17 icon-only controls with no accessible name | F.W4 (→ F.W9 if axe gates) |
| L-5 | MINOR | disabled native `<button>` triggers are unreachable tooltips (×3) | F.W4 |
| L-6 | MINOR | `v-if` on trigger ⇒ mounted tooltip with a comment for a trigger | F.W4 |
| L-7 | MINOR | `as-child` accepts non-focusable/`display:none`/SVG triggers (×8+) | F.W4 |
| L-8 | MINOR | duplicated `Side` type, dead `?? 'top'`, 18-prop amputation, off-system `sideOffset` | F.W3 |
| L-9 | MINOR | `text?` + optional slot ⇒ legal empty tooltip (0 live violations) | F.W3 |
| L-10 | INFO | dual import identity defeats barrel-based census | F.W4 (X-9 scope law) |
| L-11 | INFO | R3-7a's "+1/+3" parenthetical is a grep artefact; 35/9 stands | corpus correction |
| S-1 | SUPERLATIVE | shim beats `IconTooltip` on provider hygiene ⇒ **F.W3 disposition changes** | F.W3 |
| S-2 | SUPERLATIVE | uniform `collision-padding` is a real edge-collision fix | — |
| S-3 | SUPERLATIVE | Goldilocks 38 lines; the cause of [FE §3]'s "0 direct reka-ui" | — |

**Counts: 11 defects · 0 blockers · 3 superlatives.**

**UNPROVEN-NEEDS-LIVE → SS-13** (three, all magnitude-only; every mechanism above is source-proven):

1. **L-2 magnitude** — `pointermove` handler cost with a stale grace polygon during a 60 Hz contour
   drag on the editing canvas (`EditorControlsDock` overlay). Expect a hull point-in-polygon test +
   a `closest()` DOM walk per move event.
2. **L-3 exact denominator** — mount `/paper` and count `[data-grace-area-trigger]` /
   `[data-slot="tooltip"]`-descended triggers. Predicted **51** at first paint (tex-derived);
   confirms or corrects the `@mkbabb/latex-paper` filtering assumption.
3. **L-1(b) warning volume** — dev-mode console count while toggling `expanded` in
   `CoefficientsSpectrum`; predicted 12→40 warnings per re-render.

**Boundary honoured.** `/Users/mkbabb/Programming/fourier-analysis` was read-only throughout
(`cat`/`grep`/`sed`/`find`/`wc` only); no product source in any repo was written; the only write this
lane made is this file.

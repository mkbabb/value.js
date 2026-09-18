# CHALLENGE-L — library structure — `demo/shell/dock/layers/ActionBarLayer.vue`

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the model this seat was
explicitly spawned with. Declared, not inherited.

---

## Verdict

**DEFECTIVE.** The premise holds. The strongest defect is not stylistic: this component's
sub-layer machinery is bound to a **CSS class contract that glass-ui 7.0.0 no longer emits from
any component** — `.dock-layer` is orphaned CSS in the installed producer, and `ActionBarLayer.vue:91`
is the single remaining consumer of it in the entire tree. The motion it claims to perform does not
occur: I measured `transition-property: visibility` at `0s` in every phase of the swap, with
opacity stepping `{0,1}` instantly. The public successor (`<DockCrossfade>` + `<DockLayer>`)
shipped **in the very version W44 adopted**, and it supplies precisely the two things the shim
does not have: a real two-child opacity overlap on the dock spring, and a peak-size reserve that
would kill the measured **141 px instantaneous dock-plate jump**.

Sixteen findings below: 1 BLOCKER, 7 MAJOR, 5 MINOR, 3 INFO.

---

## Method + environment

- Static: full import trace of the subject and every module on its edges; grep censuses over
  `demo/`, `src/`, `test/`, `e2e/`, and the **installed** `node_modules/@mkbabb/glass-ui@7.0.0`
  (the immutable published artifact, not a sibling checkout).
- Live: two Playwright/Chromium probes against the dev server on `http://localhost:9000`,
  route `/#/`, viewport 1440×900. Scripts and full JSON in §Evidence appendix.
- Visual: `docs/tranches/V/megatranche/audit/visual/REPORT.md` + `shots/safari-desktop-light/picker.png`
  (read as an image).

---

## §0 — The import graph, edge by edge

`ActionBarLayer.vue` has **six** import edges. Every one traced to its home:

| # | Line | Specifier | Resolves to | Boundary verdict |
|---|---|---|---|---|
| 1 | `:2` | `vue` | framework | ✔ clean. `type Ref` uses the inline type modifier — `verbatimModuleSyntax` satisfied |
| 2 | `:3` | `@lucide/vue` | devDependency `^1.16.0`; also a glass-ui peer | ✔ clean (demo-only tree) |
| 3 | `:4` | `../../../color-session/keys` | `demo/color-session/keys.ts` | ✘ **inverted ownership** — see L-5. A *dock* presentation contract is defined in the *color* domain module, three directories up |
| 4 | `:5` | `type { ActionBarContext }` same file | — | ✔ `import type` marked |
| 5 | `:6-7` | `../ActionToolbar.vue`, `../ColorInput.vue` | `demo/shell/dock/` | ⚠ **directory inversion** — see L-15. Both leaves have exactly one consumer, and it is this file, one level *below* them |
| 6 | `:8` | `@mkbabb/glass-ui/dock` | published subpath (`exports["./dock"]`) | ✔ **correct and granular** — not the root barrel |
| 7 | `:9` | `type { EditTarget } from "../../../color-session/color-model"` | — | ✔ `import type` marked |

**value.js consumption: nothing to report, and that is the point.** This component imports
**zero** symbols from `@mkbabb/value.js`. Repo-wide the demo's discipline is provably intact —
see §Negative proof. There is no false proof of the public API on this edge.

---

## Findings

### L-1 — BLOCKER — the local `useLayerTransition` is bound to glass-ui's **orphaned private CSS**, and the motion it claims does not happen

`ActionBarLayer.vue:53-94` reimplements a composable glass-ui 7.0.0 removed, and hand-binds the
class triple `.dock-layer` / `.is-active` / `.is-leaving` at `:91`.

**Those classes have no component owner in the producer.**

```
$ grep -rl '"dock-layer"' node_modules/@mkbabb/glass-ui/dist
(no output)

$ node -e "…count class strings in dist/dock.js…"
"dock-face" count 1
"dock-layer" count 0
dock-crossfade count 2
```

`DockLayer.vue` in 7.0.0 renders `.dock-face`, never `.dock-layer`
(`node_modules/@mkbabb/glass-ui/dist/components/dock/DockLayer.vue.d.ts` docstring: *"renders its
content in a `.dock-face` host"*). The `.dock-layer` rules survive **only** as CSS, in
`dist/components/dock/styles/layers.css`, reachable because
`dist/styles/index.css` `@import`s `../components/dock/styles/index.css`, and
`demo/styles/foundation.css:56` imports `@mkbabb/glass-ui/styles`.

**The only consumer of that orphaned contract in the whole repository is this file:**

```
$ grep -rn '"dock-layer"' demo/ | wc -l
1
   → demo/shell/dock/layers/ActionBarLayer.vue:91
```

**And the motion is dead.** Measured live (probe 1, `/#/`, 1440×900, after
`[aria-label="Toggle action bar"]` → `[aria-label="Open color input"]`):

| phase | leaving face | entering face |
|---|---|---|
| rest | `opacity 1`, `visibility visible`, `position relative` | `opacity 0`, `visibility hidden`, `position absolute`, `inert` |
| **swap + 60 ms** | `opacity 0`, `visibility visible`, `position absolute`, `inert` | `opacity 1`, `visibility visible`, `position relative` |
| swap + 460 ms | `opacity 0`, `visibility visible`, `inert` | `opacity 1` |

`transition-property` is **`visibility`**, `transition-duration` **`0s`**, in *all four* sampled
states. Opacity is exactly `0` or exactly `1` — never in between. There is no crossfade. The
260 ms timer buys one thing: it keeps an `opacity: 0`, `inert` node in `visibility: visible` for a
quarter second and then hands it to a *further* `0.3s` visibility delay.

The producer's own docstring names this consumer by shape:

> *"The controlled-no-rail 5-pane case (a consumer) consumes this DIRECTLY: a no-selection
> face-swap does NOT route through a selection engine"*
> — `dist/components/dock/DockCrossfade.vue.d.ts`

**Mechanism.** A consumer took a private, untyped, unexported CSS class contract as its
integration surface after the producer retired the component that owned it. Nothing in the type
system, the build, or CI can see this edge. A glass-ui **patch** release that prunes dead CSS
silently breaks the sub-layer stacking — the inactive face stops being `position: absolute` and
both sub-layers render side by side.

**Cure (architectural, not a patch).** Delete `:53-94` and `:88-94` entirely; compose the
producer:

```vue
<DockCrossfade :active="showInput ? 'input' : 'actions'" reserve="inline">
  <DockLayer id="actions"><ActionToolbar … /></DockLayer>
  <DockLayer id="input"><ColorInput … /></DockLayer>
</DockCrossfade>
```

Nesting is legal: `DockCrossfade` keeps a *module-local* injection key
(`DOCK_CROSSFADE_KEY`, `dockCrossfadeContext.d.ts`) distinct from `DockContext`, and Vue
nearest-ancestor injection binds the inner `<DockLayer>`s to the inner crossfade, leaving the outer
`<DockLayerGroup>`'s face registry untouched.

---

### L-2 — MAJOR — `.dock-layer-grid` matches **zero** CSS rules; the absolute faces escape their nominal containing block

`ActionBarLayer.vue:101` names the sub-layer container `dock-layer-grid`. Measured live across all
loaded stylesheets:

```json
"dockLayerGridRules": { "hits": 0, "found": [], "sheets": 32 }
```

Computed: `display: block`, `position: static`, `min-block-size: auto`, `min-inline-size: auto`.

Consequence, measured: the inactive face is `position: absolute; inset: 0` (from glass's orphaned
`.dock-layer` rule), but `.dock-layer-grid` is `static`, so `inset: 0` resolves against the
*grandparent* `.dock-face.is-active` (`position: relative`, from `crossfade.css`). Widths do not
agree with the nominal parent:

| sample | `.dock-layer-grid` width | inactive/leaving face width |
|---|---:|---:|
| rest | 184 px | **302 px** |
| swap + 60 ms | 325 px | **443 px** |
| after full cycle | 245 px | **363 px** |

The face is consistently 118 px wider than the box it is nominally inside. Because it is also
`opacity: 0` this paints nothing today — but any future measurement of that box (a peak reserve,
an overflow guard) reads a wrong number by construction.

*(The Dock seat found the zero-rule fact independently on the Dock subtree —
`shell-dock-dock/challenge-L-library.md:304-308`. The containing-block escape and the paired width
deltas above are measured here, on this component's own children.)*

**Cure.** The class dies with the shim. `<DockCrossfade>` brings `.dock-crossfade
{ position: relative; display: grid; isolation: isolate }` (`crossfade.css`) — a real, owned,
producer-versioned container.

---

### L-3 — MAJOR — no peak reserve: the dock plate jumps **141 px** in one frame

Measured (probe 1):

| | `.dock-layer-grid` | `.dock-plate` |
|---|---:|---:|
| mode `actions` (rest) | 184 px | **326 px** |
| mode `input` (+60 ms) | 325 px | **467 px** |

`min-inline-size: auto` at every sample. The dock's width snaps by 141 px (+43 %) with no
intermediate frame — the shim has no size machinery at all, and `void opts.containerEl` (`:67`)
is the explicit admission that the one parameter that *could* have measured it is discarded.

The producer's `reserve` prop exists for exactly this axis:

> *"`inline` reserves the peak WIDTH (a horizontal control run)"*
> — `DockCrossfade.vue.d.ts`, `__VLS_Props.reserve`

This is a horizontal control run. `reserve="inline"` is a one-word cure that the shim cannot
express.

---

### L-4 — MAJOR — `provide(COLOR_MODEL_KEY, …)` at `:22` is a provable identity no-op with a false rationale

```
demo/shell/dock/layers/ActionBarLayer.vue:21  // Re-provide COLOR_MODEL_KEY so ColorInput works unchanged
demo/shell/dock/layers/ActionBarLayer.vue:22  provide(COLOR_MODEL_KEY, actionBar.colorModel);
```

Trace the object identity:

1. `demo/color-picker/App.vue:257` — `provide(COLOR_MODEL_KEY, pipeline);`
2. `demo/picker/ColorPicker.vue:172` — `const colorModel = inject(COLOR_MODEL_KEY)!;` → **the same `pipeline`**
3. `demo/picker/ColorPicker.vue:321` — `colorModel` is placed into `actionBarContext`
4. `demo/color-picker/App.vue:35,38` — `<Dock :action-bar="colorPickerRef?.actionBarContext ?? null">`, rendered **inside App's own template**, therefore inside App's provide scope
5. `ActionBarLayer.vue:22` re-provides that identical object under the identical key

`ColorInput` already resolves `COLOR_MODEL_KEY` from App without this line. The comment states a
reason that is not true. There are exactly three `provide(COLOR_MODEL_KEY` sites in the tree and
one of them is a comment:

```
$ grep -rn "provide(COLOR_MODEL_KEY" demo/
demo/scenes/about/AboutPane.vue:9      (comment)
demo/shell/dock/layers/ActionBarLayer.vue:22
demo/color-picker/App.vue:257
```

The knock-on is worse than the line: **`ActionBarContext.colorModel` exists solely to feed this
no-op.**

```
$ grep -rn "\.colorModel" demo/
demo/shell/dock/layers/ActionBarLayer.vue:22    ← the only hit
```

**Mechanism.** A DI shadow introduced to make a component "work unchanged" during a move, kept
after the move made it redundant. Edict 2 (no migration shims).

**Cure.** Delete `:21-22`; delete `colorModel` from `ActionBarContext`
(`demo/color-session/keys.ts:23`) and from `ColorPicker.vue:321`.

---

### L-5 — MAJOR — the dock's action-bar contract has **two** homes and **neither is the dock**

| contract | declared at | consumed by |
|---|---|---|
| `ActionBarContext` (8 fields) | `demo/color-session/keys.ts:17-28` | `Dock.vue:31`, `ActionBarLayer.vue:12`, `ColorPicker.vue:315` |
| `DockActionBar` + `DockAction` | `demo/shell/usePaneRouter.ts:36-58` | `Dock.vue:26`, `GenericActionBar.vue:4` |

`Dock.vue:31` declares **both** as props and `Dock.vue:156-157` renders them as a mutual
exclusion:

```vue
<ActionBarLayer v-if="actionBar" … />
<GenericActionBar v-else-if="genericBar" … />
```

One concept — *the run of actions the dock shows for the current view* — modelled twice, in a
colour-domain module and in a router module, with the dock (the sole owner of the concept) owning
neither declaration. The `usePaneRouter.ts:34-35` comment even records that a **third** home
(`useDockActionBar.ts` + a `DOCK_ACTION_BAR_KEY` with zero consumers) was already folded away —
the consolidation stopped one step short.

**Cure.** One `demo/shell/dock/action-bar/contract.ts` owning a single `DockActionBar` shape;
`ColorPicker` and `usePaneRouter` both *produce* it; the dock consumes one prop, not two, and
renders one component, not an either/or.

---

### L-6 — MAJOR — `ActionToolbar` is a hand-unrolled duplicate of `GenericActionBar`

Both files render the *identical* root and the *identical* child with the *identical* local hover
model:

| | `GenericActionBar.vue` | `ActionToolbar.vue` |
|---|---|---|
| root | `<div class="flex items-center justify-around flex-1">` (`:12`) | `<div class="flex items-center justify-around flex-1">` (`:2`) |
| child | `<ActionButton v-for="act in actions">` (`:13`) | 5 hand-written `<ActionButton>` (`:3-59`) |
| hover state | `const activeHover = ref<string \| null>(null)` (`:11`) | `const activeHover = ref<string \| null>(null)` (`:78`) |
| data source | `DockAction[]` prop | hardcoded icons/titles/descriptions |

`ActionToolbar` then re-declares five emits (`:73-79`) that `ActionBarLayer.vue:109-113` forwards
straight back into `actionBar.reset()/copy()/random()` and its own emits — a full round trip that
exists only because the five actions are hardcoded instead of being `DockAction[]` rows.

**Cure.** Delete `ActionToolbar.vue`. Have `ColorPicker` emit its five actions as `DockAction[]`
(it already owns the handlers) and render `GenericActionBar` for both cases. This collapses L-5
and L-6 together: one contract, one renderer.

---

### L-7 — MAJOR — the published library ships the whole design system as a runtime dependency, and the dependency is circular

`package.json:82-85`:

```json
"dependencies": {
    "@mkbabb/glass-ui": "^7.0.0",
    "@mkbabb/keyframes.js": "^6.0.0"
}
```

Census:

```
$ grep -rn "@mkbabb/glass-ui" src/ | wc -l
0
$ grep -rn "@mkbabb/glass-ui" demo/ | wc -l
129
```

`src/` — the *only* thing `package.json#files` publishes (`["dist", "!dist/gh-pages", …]`) — never
imports glass-ui. The published surface is seven pure subpaths (`./color ./value ./css ./easing
./math ./transform ./quantize`); none needs a Vue design system. Meanwhile the producer declares
the reverse edge:

```
$ node -e "…glass-ui/package.json…"
peerDependencies: { "@mkbabb/value.js": "^4.0.0", … }
```

So `npm i @mkbabb/value.js` — to get `@mkbabb/value.js/color`, a colour-maths module — installs
`@mkbabb/glass-ui`, which peer-requires `@mkbabb/value.js` back. A declared cycle, and a
design-system-sized install for a maths import.

`ActionBarLayer.vue:8` is one of the 129 edges that make the misdeclaration look load-bearing.

**Cure.** Move both to `devDependencies`. The demo is not published (`!dist/gh-pages`), so nothing
that ships loses a dependency. Reproduction of the current cost: `npm i @mkbabb/value.js` in a
clean tree and diff `node_modules` against the seven subpaths' actual needs.

---

### L-8 — MAJOR — `@mkbabb/keyframes.js` is a runtime dependency with **zero** importers anywhere

```
$ grep -rn "@mkbabb/keyframes" --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=docs .
package.json:84
package-lock.json:13,1289,1301,1324,1326
```

Not one import in `src/`, `demo/`, `test/`, `e2e/`, or `api/`. It is present only to satisfy
glass-ui's peer range for the **demo** build — a devDependency concern pushed onto every library
consumer. Edict 2 (no dead paths) at package granularity.

---

### L-9 — MINOR — the entire exposed API of this component is dead

`ActionBarLayer.vue:96` — `defineExpose({ currentToggleIcon, toolbarMode, cycleToolbarMode })`.

```
$ grep -rn "currentToggleIcon\|cycleToolbarMode\|toolbarMode" demo/ e2e/ test/ | grep -v "layers/ActionBarLayer.vue"
(no output)
```

`Dock.vue:156` mounts `<ActionBarLayer>` with **no `ref`** — nothing can reach the exposed members.
Two template refs are declared, bound, and never read:

- `colorInputRef` — `:28` declared, `:116` bound, zero reads
- `actionToolbarRef` — `:29` declared, `:103` bound, zero reads

And `ActionToolbar.vue:82` exposes `clearHover`, whose only repo-wide near-match is an unrelated
`clearHoveredPath` in `ColorNutritionLabel.vue`. Three exposure surfaces, zero consumers.

---

### L-10 — MINOR — dead prop and dead contract fields plumbed through three layers

- `ActionToolbar.vue:72` declares `canProposeName: boolean`. `grep -n "canProposeName"
  demo/shell/dock/ActionToolbar.vue` → **one hit, the declaration**. `ActionBarLayer.vue:106`
  binds it. A prop that is declared, passed, and never read.
- `ActionBarContext.cssColorOpaque` (`keys.ts:18`) and `.formattedCurrentColor` (`keys.ts:19`):
  `grep -rn "actionBar\.\|actionBarContext\." demo/` returns **no read** of either field.
  `ActionBarLayer` uses the injected `SAFE_ACCENT_KEY` (`:24`) for colour instead, so the context's
  own colour field is bypassed by its only consumer.

---

### L-11 — MINOR — `SUB_LAYER_CROSSFADE_MS = 260` is a magic number that matches no token, and races a 300 ms delay it cannot win

`ActionBarLayer.vue:62`. The demo's duration scale (`demo/DESIGN.md:210-213`) is
**200 / 300 / 450 / 550 ms**. 260 is none of them.

The CSS it is shadowing carries `--duration-normal` (300 ms — measured `transition-delay: 0.3s`)
as the visibility hand-off delay. The shim clears `is-leaving` at 260 ms, 40 ms *before* that
delay would have expired, and the face then enters a fresh 300 ms delay. Measured at
**swap + 460 ms** the leaving face is still `visibility: visible, opacity: 0, inert: true` — it
only reads `visibility: hidden` after the next full cycle. The constant is simultaneously wrong,
untokenized, and redundant with CSS that already does the hand-off.

`<DockCrossfade>` removes the question: the overlap rides the one dock spring
(`useDockSpring`, "velocity-continuous + interruptible"), not a `setTimeout`.

---

### L-12 — MINOR — mixed Vue 3.5 template-ref idiom inside 158 lines

`:28-29` use the pre-3.5 form `ref<InstanceType<typeof X> | null>(null)`; `:83` uses
`useTemplateRef<HTMLElement>("subLayerGridEl")`. One file, two idioms, for the same concept. Edict
7. (All three refs are dead — L-9, L-1 — so the fix is deletion, not conversion.)

---

### L-13 — MINOR — the component styles its children's roots from the outside

`:104` and `:117` spread `v-bind="subLayerProps('actions'|'input')"` onto `<ActionToolbar>` and
`<ColorInput>` — pushing `class: ["dock-layer", …]` and `inert` onto **another component's root
element** through attribute fallthrough. Measured root classes confirm the merge:

```
"flex items-center justify-around flex-1 dock-layer is-active"          ← ActionToolbar's root
"grid grid-cols-1 gap-y-2 p-0 m-0 dock-layer is-active min-w-0"        ← ColorInput's root
```

Layout, stacking, visibility and inertness of a child are decided by a class the child has never
heard of. This is the per-instance-override shape edict 5 forbids, one level up. The producer's
answer is a *host*: `<DockLayer id="…">` wraps the child and owns `.dock-face` itself, leaving the
child's root untouched.

---

### L-14 — INFO — parent-edge dual path to the producer's dock kit, plus a module cycle

`demo/shell/dock/index.ts` re-exports three producer symbols under a demo path:

```ts
export { GlassDock, DockLayerGroup, DockLayer } from "@mkbabb/glass-ui/dock";
export { default as Dock } from "./Dock.vue";
```

`Dock.vue:4` then imports them from `"./"` while `Dock.vue:5` imports `DockControl, DockSeparator`
from `@mkbabb/glass-ui/dock` **directly** — and `ActionBarLayer.vue:8` also imports directly. Two
paths to one producer surface, and `Dock.vue → ./index.ts → Dock.vue` is a genuine module cycle.
*(Cycle credited to the Dock seat, L-11 in `shell-dock-dock/challenge-L-library.md`; recorded here
because it is the edge immediately above the subject and the retirement lands in the same file
pair.)*

---

### L-15 — INFO — directory inversion: both leaves live above their only consumer

```
$ grep -rn "ColorInput"    demo/ | grep -v "^demo/shell/dock/ColorInput.vue"   → only ActionBarLayer.vue
$ grep -rn "ActionToolbar" demo/ | grep -v "^demo/shell/dock/ActionToolbar.vue" → only ActionBarLayer.vue
```

`demo/shell/dock/ActionToolbar.vue` and `demo/shell/dock/ColorInput.vue` sit in the dock root as if
they were shared dock furniture. Each has exactly one consumer, one directory deeper. The physical
tree tells the opposite of the truth.

---

### L-16 — INFO — the visual matrix cannot see this component at all

All 60 captures in `docs/tranches/V/megatranche/audit/visual/REPORT.md` render the dock **at
rest**. `shots/safari-desktop-light/picker.png` (read as an image) shows the entire dock as
`Home ⌄ | Tools → | Login | @mbabb` — the action-bar layer is behind two disclosures (`Toggle
action bar`, then `Open color input`) and never appears in any matrix cell.

The one row that touches it is indirect: `namelessButtons safari-desktop-light /#/: 1` — the
`ColorInput` send button, present in the DOM but never on screen, and **absent from both mobile
matrices' `/#/` rows entirely**. That mobile absence is `ColorInput`'s finding (already folded to
the dock composition by the ColorInput seat); it is recorded here because `ActionBarLayer` is
`ColorInput`'s **only** mount site, so any cure must land in this file.

Consequence for the mega-tranche: **no screenshot gate can protect this component.** Its born-RED
gates must be driven probes (§Born-RED gates), not matrix diffs.

---

## §Negative proof — what is genuinely clean

Stated positively so it is not re-litigated:

1. **value.js is consumed correctly, and structurally cannot be consumed incorrectly.**
   `grep -rn "@src/" demo/` → **0**. `vite.config.ts:37-50` *generates* the self-alias set from
   `package.json#exports` with anchored regexes, so the demo can only resolve the seven published
   specifiers, and resolves them to `dist/subpaths/*.js` — the built, published surface. A demo
   import a real consumer could not write is impossible to author here. This edge is exemplary.
2. **The glass-ui import is granular and public.** `:8` uses `@mkbabb/glass-ui/dock`
   (a declared `exports` key), not the root barrel.
3. **`verbatimModuleSyntax` is satisfied**: `type Ref` inline (`:2`), `import type
   { ActionBarContext }` (`:5`), `import type { EditTarget }` (`:9`).
4. **Animations are tokenized and global, not local.** `vj-morph` lives in
   `demo/styles/animations.css:103-137`; the scoped block (`:146-157`) only re-parameterizes the
   family via `--vj-morph-scale` / `--vj-morph-y` on a class root. Edicts 5 and 6 satisfied.
5. **No `demo/ui/` variant invention.** The component composes `DockControl` and `DockSeparator`
   from glass-ui rather than reinventing them. Edict 4 satisfied.
6. **A11y labelling is complete** on the toggle (`:131`, three-state `aria-label`), and the e2e
   flow depends on it (`e2e/smoke/flows/color-propose.spec.ts:36-57`).
7. **The focus-loss hypothesis is REFUTED, not deferred.** I predicted that `inert` on the leaving
   face would drop focus to `<body>`, and built probe 2 to prove it. It does not: the click that
   triggers the swap moves focus to the toggle button first —
   `E +30ms after swap to actions → activeElement = BUTTON.dock-icon-button, isBody: false,
   inertAncestor: false`. No keyboard path reaches the swap while focus is inside the face. **Not a
   defect.** (`<DockCrossfade>` does implement focus-transfer-on-dissolve, so the migration keeps a
   guarantee we currently get by luck.)

---

## §Greenfield lattice — what I would build today with no legacy

Concretely, four modules replacing eight files' worth of scattered ownership:

```
demo/shell/dock/
├── action-bar/
│   ├── contract.ts          ← the ONE DockActionBar/DockAction shape (kills L-5)
│   ├── ActionBar.vue        ← data-driven run of ActionButton (today's GenericActionBar; kills L-6)
│   ├── ActionButton.vue     ← unchanged, moves next to its only parent (kills L-15)
│   └── ColorInputFace.vue   ← today's ColorInput, colocated (kills L-15)
├── Dock.vue                 ← imports glass symbols ONE way, directly (kills L-14)
└── (no index.ts barrel)     ← the barrel exists only to re-export the producer (kills L-14)
```

and the subject itself collapses to roughly 35 lines:

```vue
<script setup lang="ts">
import { computed, ref } from "vue";
import { EllipsisVertical, Type, Tag } from "@lucide/vue";
import { DockControl, DockSeparator, DockCrossfade, DockLayer } from "@mkbabb/glass-ui/dock";
import ActionBar from "./ActionBar.vue";
import ColorInputFace from "./ColorInputFace.vue";
import type { DockActionBar } from "./contract";

const { bar } = defineProps<{ bar: DockActionBar }>();
const mode = ref<"actions" | "input" | "propose">("actions");
const face = computed(() => (mode.value === "actions" ? "actions" : "input"));
// … cycle + icon …
</script>

<template>
  <div class="flex items-center gap-0 min-w-0">
    <DockCrossfade :active="face" reserve="inline" class="flex-1">
      <DockLayer id="actions"><ActionBar :actions="bar.actions" :accent="bar.accentColor" /></DockLayer>
      <DockLayer id="input"><ColorInputFace :propose-mode="mode === 'propose'" /></DockLayer>
    </DockCrossfade>
    <DockSeparator />
    <DockControl :aria-label="…" @click="cycle"><Transition name="vj-morph" mode="out-in">…</Transition></DockControl>
  </div>
</template>
```

What that transposition buys, in order of value:

1. The **crossfade becomes real** — a spring-driven opacity overlap instead of a `{0,1}` step (L-1).
2. The **141 px plate jump disappears** — `reserve="inline"` (L-3).
3. Three producer-internal class names, one dead class name, one dead `containerEl`, one
   `setTimeout` and one magic constant are **deleted, not migrated** (L-1, L-2, L-11).
4. The DI shadow, three dead refs, one dead expose, one dead prop and two dead contract fields go
   with them (L-4, L-9, L-10).
5. **One** action-bar contract, in the dock (L-5), rendered by **one** component (L-6).
6. Child component roots stop being styled from the outside (L-13).
7. `~158 → ~35` lines in the subject, and `ActionToolbar.vue` (86 lines) deleted outright.

Package-level, orthogonal but in the same tranche: `@mkbabb/glass-ui` and `@mkbabb/keyframes.js`
move to `devDependencies` (L-7, L-8), which breaks the declared dependency cycle and stops
shipping a design system to consumers of `@mkbabb/value.js/color`.

---

## §The exact retirement condition — stated, and already met

CARRY-LEDGER §F records the condition as conditional: *"retire the shim at the consuming wave (W47)
**if** glass ships a successor."* **The condition is not open. It was satisfied at adoption.**

The successor shipped **in glass-ui 7.0.0 itself** — the same version W44 adopted on 2026-07-17 in
commit `f2c8f565`, which is also the commit that *introduced* the shim. Verified against the
installed, immutable published artifact (not a sibling checkout):

| requirement | evidence |
|---|---|
| a public content-swap primitive exists | `node_modules/@mkbabb/glass-ui/dist/components/dock/index.d.ts:5` — `export { default as DockCrossfade } from "./DockCrossfade.vue";` |
| it is reachable from a public subpath | `package.json#exports["./dock"]` — the subpath `ActionBarLayer.vue:8` already uses |
| it covers the two-face controlled case | `DockCrossfade.vue.d.ts` — *"The controlled-no-rail 5-pane case (a consumer) consumes this DIRECTLY"* |
| it covers the horizontal reserve | `reserve?: "block" \| "inline"` — *"`inline` reserves the peak WIDTH (a horizontal control run)"* |
| the old symbol is gone, so no dual path can persist | `grep -rn "useLayerTransition" node_modules/@mkbabb/glass-ui/dist` → **no hits** |

Restated as an unconditional obligation:

> **Retirement condition — MET.** Delete `ActionBarLayer.vue:53-94` and `:88-94` and compose
> `<DockCrossfade :active reserve="inline">` + two `<DockLayer>`s from `@mkbabb/glass-ui/dock`.
> Clean break: **no alias, no wrapper, no compatibility export.** The only thing that could
> re-open it is a glass-ui release that *removes* `DockCrossfade` from `exports["./dock"]` — and
> since 7.0.0 is published and immutable, the pinned floor `^7.0.0` guarantees it cannot.

**Honesty judgement on the shim.** It is **divergent, not honest**. An honest shim reproduces the
producer's behaviour behind the producer's contract until the successor lands. This one:
(i) reproduces a *signature* (`{ currentLayer, leavingLayer }`) while discarding the parameter that
made the original work (`void opts.containerEl`, `:67`); (ii) binds a class contract the producer no
longer emits from any component; (iii) delivers **no** crossfade (measured `{0,1}`), **no** reserve
(measured +141 px snap) and **no** focus transfer; and (iv) its own header comment at `:55` already
names `DockCrossfade` as the thing that absorbed the behaviour — the successor was identified in the
commit that added the shim.

---

## §Born-RED gates (proposed, for the mega-tranche shell wave)

Each is RED today against `c654824e`; each has a pasted baseline.

| gate | oracle | today |
|---|---|---|
| **G-L1** shim gone | `grep -c "useLayerTransition" demo/shell/dock/layers/ActionBarLayer.vue` → **0** | **3** |
| **G-L2** producer composed | `grep -c "<DockCrossfade" demo/shell/dock/layers/ActionBarLayer.vue` → **≥1** | **0** (`grep -rn "DockCrossfade" demo/` → 1 hit, a *comment* at `:55`) |
| **G-L3** orphan class gone | `grep -rn '"dock-layer"\|dock-layer-grid' demo/` → **0** | **2** (`:91`, `:101`) |
| **G-L4** real overlap | probe: at swap **+60 ms**, both faces report `0 < opacity < 1` | `1` and `0` exactly |
| **G-L5** peak reserve | probe: `.dock-plate` width delta between `actions` and `input` ≤ **1 px** | **141 px** (326 → 467) |
| **G-L6** DI shadow gone | `grep -c "provide(COLOR_MODEL_KEY" demo/shell/dock/layers/ActionBarLayer.vue` → **0**; `grep -rn "\.colorModel" demo/` → **0** | **1**, **1** |
| **G-L7** one contract | `grep -rn "ActionBarContext" demo/` → **0** (folded into `DockActionBar`) | **6 sites, 3 files** |
| **G-L8** package boundary | `node -e "…"` → `dependencies` is `{}` or absent; `grep -rn "@mkbabb/glass-ui" src/` → **0** (already 0) | 2 runtime deps, 0 library importers |

G-L4 and G-L5 need the *driven* probe (two clicks behind disclosures), not the visual matrix —
see L-16. Reusable script: §Evidence appendix.

---

## §Evidence appendix

### Probe 1 — sub-layer telemetry (`abl-probe.mjs`)

Chromium, 1440×900, `http://localhost:9000/#/`; click `[aria-label="Toggle action bar"]`, then
`[aria-label="Open color input"]`; sample `getComputedStyle` + rects on both `.dock-layer-grid`
children at rest, +60 ms, +460 ms; enumerate all 32 stylesheets for `dock-layer-grid` selectors.

```json
"restActions":  { "gridDisplay":"block","gridPosition":"static","gridMinInline":"auto",
                  "gridW":184,"plateW":326,
  "kids":[ {"cls":"… dock-layer is-active","w":184,"opacity":"1","visibility":"visible",
            "position":"relative","transitionProperty":"visibility","transitionDuration":"0s",
            "transitionDelay":"0s","inert":false},
           {"cls":"… dock-layer min-w-0","w":302,"opacity":"0","visibility":"hidden",
            "position":"absolute","transitionProperty":"visibility","transitionDuration":"0s",
            "transitionDelay":"0.3s","inert":true} ] },
"at60ms":       { "gridW":325,"plateW":467,
  "kids":[ {"cls":"… dock-layer is-leaving","w":443,"opacity":"0","visibility":"visible",
            "position":"absolute","transitionProperty":"visibility","transitionDuration":"0s",
            "inert":true},
           {"cls":"… dock-layer is-active min-w-0","w":325,"opacity":"1","visibility":"visible",
            "position":"relative","transitionProperty":"visibility","transitionDuration":"0s"} ] },
"at460ms":      { "gridW":325,"plateW":467,
  "kids":[ {"cls":"… dock-layer","w":443,"opacity":"0","visibility":"visible","inert":true}, … ] },
"dockLayerGridRules": { "hits":0, "found":[], "sheets":32 }
```

### Probe 2 — focus transfer across the swap (`abl-focus.mjs`) — REFUTES the hypothesis

```json
[ {"t":"A rest(actions)",                 "ae":"DIV.dock-face",        "isBody":false,"inertAnc":false},
  {"t":"B focused color-input (mode=input)","ae":"SPAN.color-input",   "isBody":false,"inertAnc":false},
  {"t":"C after -> propose",              "ae":"SPAN.color-input",     "isBody":false,"inertAnc":false},
  {"t":"D refocused in propose",          "ae":"SPAN.color-input",     "isBody":false,"inertAnc":false},
  {"t":"E +30ms after swap to actions",   "ae":"BUTTON.dock-icon-button","isBody":false,"inertAnc":false},
  {"t":"F +430ms after swap to actions",  "ae":"BUTTON.dock-icon-button","isBody":false,"inertAnc":false} ]
```

### Producer surface (installed artifact)

```
$ node -e "…glass-ui/package.json…" → version 7.0.0
$ cat node_modules/@mkbabb/glass-ui/dist/components/dock/index.d.ts
export { default as DockCrossfade } from "./DockCrossfade.vue";
export type { DockFaceDescriptor, DockFaceRegistration, DockCrossfadeContext } from "./composables/dockCrossfadeContext";
$ grep -rn "useLayerTransition" node_modules/@mkbabb/glass-ui/dist/
(no hits)
$ grep -rl '"dock-layer"' node_modules/@mkbabb/glass-ui/dist
(no hits)          ← .dock-layer is emitted by NO component in 7.0.0
$ grep -o "\.dock-layer[^-a-z]" node_modules/@mkbabb/glass-ui/dist/glass-ui.css | wc -l
0                  ← and is absent from the bundled stylesheet; it survives only in
                     dist/components/dock/styles/layers.css, reached via exports["./styles"]
```

### Package boundary

```
$ grep -n "@mkbabb" package.json | head -3
82:    "dependencies": {
83:        "@mkbabb/glass-ui": "^7.0.0",
84:        "@mkbabb/keyframes.js": "^6.0.0"
$ grep -rn "@mkbabb/glass-ui" src/ | wc -l        → 0
$ grep -rn "@mkbabb/glass-ui" demo/ | wc -l       → 129
$ grep -rn "@mkbabb/keyframes" --exclude-dir=node_modules --exclude-dir=docs . | grep -v lock
package.json:84                                   ← the only hit
$ node -e "…glass-ui peerDependencies…"           → "@mkbabb/value.js": "^4.0.0"
```

### Scripts

`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/abl-probe.mjs`
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/abl-focus.mjs`

---

*No source files were edited by this seat. Writes confined to
`docs/tranches/V/megatranche/audit/components/shell-dock-actionbarlayer/`.*

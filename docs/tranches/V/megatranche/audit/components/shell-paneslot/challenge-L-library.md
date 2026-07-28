# CHALLENGE-L — `demo/shell/PaneSlot.vue` — library structure

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the tier this seat was spawned with. The
declaration is honoured, not inherited.

---

## Verdict

**DEFECTIVE.**

`PaneSlot.vue` is, in isolation, the cleanest file in `demo/shell` — its static import closure is
**exactly one file (itself)**, it imports nothing from `@mkbabb/value.js`, and it satisfies
`verbatimModuleSyntax` and the Vue 3.5 reactive-props-destructure idiom. That is the negative proof,
and it holds.

The defect is not what PaneSlot imports. It is **what PaneSlot owns and does not publish.**

PaneSlot is the sole `<KeepAlive>` in the application. It therefore mints the
activate/deactivate lifecycle for every one of the eleven pane components — and it publishes no
contract for it, documents it nowhere in its 23-line header, and the demo answers with
**one `onActivated` and zero `onDeactivated` in 100% of the tree**. Three cached panes register
`window`/`document` listeners in `onMounted` and tear them down only in `onUnmounted`, which
KeepAlive guarantees will never run.

Beneath that sits a second, larger structural failure: PaneSlot's `onMount` escape-hatch prop is a
hand-rolled ref-capture channel whose documented contract is factually false, whose wiring is
duplicated per-slot in `App.vue`, and which is **wired on desktop and forgotten on mobile** — making
every `colorPickerRef`-dependent affordance a provably silent no-op at mobile viewports, and
producing a 2-second polling stall with a `console.warn` give-up on the palette→edit path.

Eleven findings follow. Five are BLOCKER or MAJOR.

---

## 0. Command log — what was run

| # | Command / probe | Purpose |
|---|---|---|
| P1 | `node scratchpad/paneslot-repro.mjs` (jsdom + vue 3.5.35, faithful transcription of `PaneSlot.vue`) | Lifecycle + ref-callback truth |
| P2 | `node scratchpad/appvue-repro.mjs` (adds `App.vue:323-328` verbatim) | Ref cross-wiring window |
| P3 | Playwright `evaluate` against the live dev server, walking `#app.__vue_app__` and reading every `KeepAlive.__v_cache` | Deactivation is real, in the real app |
| P4 | `node scratchpad/closure.mjs` — transitive static-import closure by area | Boundary measurement |
| P5 | `node scratchpad/path.mjs` — BFS shortest violating import path | Exact violating edges |
| P6 | `node scratchpad/resolve.cjs` — TS compiler API `resolveModuleName` under `tsconfig.demo.json` | Published-surface fidelity |
| P7 | Vue source read: `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:1742-1815`, `:5476`, `:6572-6598` | Ref/unmount semantics |

Vue version measured: `3.5.35`. Node/vite dev server live at `http://localhost:9000` (HTTP 200).

---

## 1. The negative proof (what is actually clean)

State it first, because CHALLENGE-L must not manufacture a finding where none exists.

**P4 — static import closure by area:**

```
demo/shell/PaneSlot.vue      — STATIC closure: 1 files, dynamic entry points: 0
   by area: {"demo/shell":1}
```

PaneSlot imports `vue` and nothing else (`PaneSlot.vue:25`). It reaches across **zero** boundaries.
It does not import `@mkbabb/value.js` at all, so the "deep path a real consumer could not write"
axis is vacuously satisfied *for this file*.

Its one `import` is `verbatimModuleSyntax`-correct — `type Component` is inline-`type`-qualified
(`PaneSlot.vue:25`). It uses the Vue 3.5 reactive props destructure (`PaneSlot.vue:27-63`) and
`shallowRef` for the component/props cells (`:74`, `:76`), which is the right call: these are
non-reactive payloads and a deep `ref` would proxy an entire component definition.

**The demo's library-import discipline is also genuinely sound.** Every one of the ~48 `@mkbabb/value.js`
imports in `demo/` goes through a published subpath (`/color`, `/css`, `/math`, `/easing`,
`/quantize`). Zero `@src/*` imports survive in the demo tree. P6 confirms the type resolution is
faithful — and by a mechanism the config comments do not know about:

```
@mkbabb/value.js/css   -> /Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts
@mkbabb/value.js/color -> /Users/mkbabb/Programming/value.js/dist/subpaths/color.d.ts
@mkbabb/value.js/value -> /Users/mkbabb/Programming/value.js/dist/subpaths/value.d.ts
@mkbabb/value.js       -> UNRESOLVED
```

`/css` and `/value` have **no `paths` entry at all** in `tsconfig.demo.json` — they resolve correctly
anyway, via Node/TS **package self-reference** through this repo's own `package.json#exports`. The
`paths` block is therefore redundant scaffolding, not the load-bearing mechanism it claims to be
(see L-9).

---

## 2. Findings

### L-1 — BLOCKER — PaneSlot owns the only `<KeepAlive>` and publishes no activation contract; three cached panes leak global listeners forever

**Evidence.**

PaneSlot is the sole KeepAlive owner: `demo/shell/PaneSlot.vue:120` (`<KeepAlive :max="max">`), and
`grep -rn "KeepAlive" demo/` finds it nowhere else as a mounted component. It is instantiated three
times from `App.vue:83`, `:101`, `:127` with `:max="9" | 6 | 4`.

Census — `grep -rn "onActivated\|onDeactivated" demo/`:

```
demo/picker/visual/HeroBlob.vue:27:    onActivated,
demo/picker/visual/HeroBlob.vue:246:onActivated(() => {
```

**One** `onActivated` in the entire demo. **Zero** `onDeactivated`.

Census — `grep -rn "window.addEventListener\|document.addEventListener" demo/`, restricted to modules
that live inside a KeepAlive-cached pane:

| Site | Listener | Teardown site | Runs under KeepAlive? |
|---|---|---|---|
| `demo/picker/ColorPicker.vue:377` | `window` `keydown` | `onUnmounted` `:381-382` | **NO** |
| `demo/picker/controls/ComponentSliders/composables/useSliderTouchGates.ts:124` | `document` `pointercancel` | `onUnmounted` `:127` | **NO** |
| `demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:239` | `window` `keydown` | `onBeforeUnmount` `:243` | **NO** |
| `demo/picker/composables/usePointerDebug.ts:227-232` | `document` ×6, capture phase | (see file) | **NO** |

**P3 — live proof from the running app.** Walking `#app.__vue_app__` and reading every
`KeepAlive.__v_cache` at `/#/atmosphere` (a route where the left pane is `atmosphere`, so ColorPicker
is not rendered):

```json
{ "hash": "#/atmosphere",
  "caches": [
    [ { "key": "color-picker", "comp": "ColorPicker",
        "isUnmounted": false, "isDeactivated": true, "scopeActive": false },
      { "key": "extract",    "comp": "AsyncComponentWrapper", "isUnmounted": false, "isDeactivated": true },
      { "key": "atmosphere", "comp": "AsyncComponentWrapper", "isUnmounted": false, "isDeactivated": false } ],
    [ { "key": "about",    "comp": "AsyncComponentWrapper", "isUnmounted": false, "isDeactivated": true },
      { "key": "palettes", "comp": "AsyncComponentWrapper", "isUnmounted": false, "isDeactivated": true } ] ]}
```

`isUnmounted: false` on a route where ColorPicker is invisible. `onUnmounted` — the **only** call site
of `window.removeEventListener("keydown", handleKeydown)` (`ColorPicker.vue:382`) — has not run and
will not run. The handler it leaves live (`ColorPicker.vue:249-267`) does:

```ts
if (keys.cmd?.value && keys.k?.value) {
    e.preventDefault();
    selectedColorSpaceOpen.value = !selectedColorSpaceOpen.value;
}
```

`e.preventDefault()` on Cmd+K, **globally, on every route**, toggling a select in a pane the user
cannot see. This is precisely the sibling seat's proven defect; P3 establishes its mechanism *at the
PaneSlot boundary*, and the census above shows it is a **class**, not an instance — the eyedropper's
Escape handler and the slider gate's `pointercancel` net have the identical shape.

**Mechanism.** PaneSlot's 23-line header (`:2-23`) documents the transition mode, the dev-mode
`out-in` defect, the `onMount` prop, and the appear grammar. It says **nothing** about the fact that
mounting a component here converts `onUnmounted` from "runs on navigation" to "runs never". The
contract PaneSlot mints is invisible to every consumer of it.

**Cure (architectural, not a patch).** Do not ask eleven pane authors to remember `onDeactivated`.
Delete the ability to get it wrong: give the **shell** a single owned `window` keydown listener and a
`useShellKey(binding)` registration composable in `demo/shell/`, gated on the active route. One
listener, one owner, no KeepAlive hazard by construction, and the "which pane swallowed my keystroke"
question stops being askable. `PaneSlot` renames to `PaneHost` and its header states the activation
contract in the first paragraph.

---

### L-2 — BLOCKER — the mobile `PaneSlot` has no `:on-mount`, so `colorPickerRef` is provably always `null` on mobile; six affordances silently no-op and one stalls 2s then gives up

**Evidence — by enumeration, no probe required.**

`colorPickerRef.value` has exactly one writer in the entire tree:

```
demo/color-picker/App.vue:325:    colorPickerRef.value = left === "color-picker" ? el : null;
```

which sits inside `onDesktopLeftMount` (`App.vue:323-328`). That function is referenced exactly once:

```
demo/color-picker/App.vue:105:                        :on-mount="onDesktopLeftMount"
```

— on the **desktop-left** slot. The mobile slot (`App.vue:83-91`) passes `:component`,
`:component-key`, `:component-props`, `:transition-name`, `:max`, `appear`, `:on-appeared` — and **no
`:on-mount`**. `grep -n "on-mount" demo/color-picker/App.vue` returns only lines 105 and 131 (desktop
left and right). Therefore at any viewport failing
`(min-width: 1024px) and (min-aspect-ratio: 1.1)` (`App.vue:310-312`), `colorPickerRef` is `null`
for the lifetime of the session.

**Consumers that are therefore dead on mobile:**

| Site | Expression | Mobile behaviour |
|---|---|---|
| `App.vue:38` | `:action-bar="colorPickerRef?.actionBarContext ?? null"` | dock action bar permanently `null` |
| `App.vue:41` | `@commit-edit="colorPickerRef?.commitEdit(); …"` | **commit does nothing**; only the pane index flips |
| `App.vue:42` | `@cancel-edit="colorPickerRef?.cancelEdit(); …"` | **cancel does nothing** |
| `usePaneRouter.ts:156` | `"onCommit-edit": () => deps.colorPickerRef()?.commitEdit()` | no-op |
| `usePaneRouter.ts:157` | `"onCancel-edit": () => deps.colorPickerRef()?.cancelEdit()` | no-op |
| `usePaletteWiring.ts:66-72` | `emitApply` | falls back to first colour only |
| `usePaletteWiring.ts:122-126` | `emitSetCurrentColor` | falls back |
| `usePaletteWiring.ts:106-119` | `emitStartEdit` | **stalls 2s, then `console.warn`, edit never starts** |

The `emitStartEdit` path is the loudest: `usePaletteWiring.ts:33-58` implements a bounded poll —
`PICKER_WAIT_ATTEMPTS = 40`, `setTimeout(poll, 50)` — so on mobile it burns **40 × 50 ms = 2000 ms**
and then emits

```
[usePaletteWiring] gave up waiting for the color picker to mount (startEdit).
```

The visual audit's `safari-mobile-light /#/palettes` shot
(`docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/palettes.png`) is exactly this
surface — the Palettes pane rendered at pane-index 1 with the `Picker | Palettes` segmented control.
Editing a palette colour from here is the dead path.

**Mechanism.** The edit-commit capability is a property of *the application*, but it is wired *per
slot instance*, by hand, in the template. Three slots, two wirings. Nothing in the type system,
nothing in `PaneSlot`'s props (`onMount?` is optional), and nothing in review can catch the third.
Every downstream `?.()` (`App.vue:38,41,42`, `usePaneRouter.ts:156,157`,
`usePaletteWiring.ts:66,122`) then **masks** the omission — a direct violation of the no-masking-
fallbacks edict. The 2-second bounded poll (`usePaletteWiring.ts:33-58`) is a contrivance that exists
only to paper over a ref-capture channel that has no readiness signal; its own header calls the prior
version "a permanently-absent picker (a future layout, a ref regression)" — the layout it feared is
shipping.

**Cure.** Delete `onMount` and the ref-capture channel entirely. Panes that expose commands
**register them** into a `PANE_COMMANDS_KEY` registry `provide`d once by `App.vue`, filling it in
their own `onActivated` and clearing it in `onDeactivated`. The shell then reads
`commands.picker?.commitEdit` — one home, provided once, structurally identical across every
breakpoint, and the 2-second poll, the `paneRefs` object, `whenColorPickerReady`, and eight `?.()`
maskings all die in the same commit.

---

### L-3 — MAJOR — `PaneSlot`'s documented `onMount` contract is false: it fires on every re-render, and it hands `App.vue` the *wrong* component instance for a full frame on every pane swap

**Evidence — P1, jsdom + vue 3.5.35, faithful transcription of `PaneSlot.vue`:**

```
after mount        refCalls = ["PaneA"]
after 5 prop ticks refCalls = ["PaneA","PaneA","PaneA","PaneA","PaneA"]  (contract says: none)
after swap a->b    refCalls = ["PaneA","NULL","PaneB"]
                   lifecycle = ["PaneA:deactivated","PaneB:mounted","PaneB:activated"]
after swap b->a    refCalls = ["PaneB","NULL","PaneA","PaneA"]
                   lifecycle = ["PaneB:deactivated","PaneA:activated"]
```

The JSDoc at `PaneSlot.vue:47-51` reads: *"Called with the component instance on mount, and with null
on unmount."* Five same-key prop updates produce **five** invocations. This is not incidental: the
template writes a **fresh inline arrow every render** (`PaneSlot.vue:124`):

```
:ref="onMount ? (el: any) => onMount!(el) : undefined"
```

and Vue's `patch` re-runs `setRef` on every patch of that vnode
(`runtime-core.cjs.js:5476`). `setRef`'s stale-ref-clearing branch
(`runtime-core.cjs.js:1801-1817`) handles **only** string and `Ref` old-refs — a function old-ref is
never called with `null` — so each render just re-invokes the new closure with the live instance. In
the demo, `liveProps` updates on **every colour tick** (`PaneSlot.vue:101-106`), so
`onDesktopLeftMount` runs at the colour-scrub frame rate.

**The sharper half — P2, `App.vue:323-328` transcribed verbatim:**

```
t0 (picker)          generatePaneRef = null  colorPickerRef = ColorPicker
t1 (config switched, PRE-rAF)
   generatePaneRef  = ColorPicker
   action-bar handler paneRefs.generate.value?.regenerate?.() -> SILENT NO-OP
t2 (post-rAF)        generatePaneRef = GeneratePane  regenerate() -> regenerated
```

Reading the sequence against `App.vue`: `viewManager` flips `currentView` synchronously, so
`currentConfig.value.left` is already `"generate"` on the very next render — but `PaneSlot` defers the
component swap by one `requestAnimationFrame` (`PaneSlot.vue:86-97`, the W3-4 payload-trailing
device). The intervening re-render fires the ref callback with the **still-mounted ColorPicker**,
and `onDesktopLeftMount` dutifully files it under `generatePaneRef` because it keys off the *new*
config. For that whole frame — longer in practice, because the incoming pane is a
`defineAsyncComponent` whose chunk has not landed — the dock has **already** switched to the generate
action bar (`usePaneRouter.ts:188-201`, keyed off `viewManager.currentView`, no rAF) and its
Regenerate / Save / Copy handlers dispatch onto a ColorPicker via
`paneRefs.generate.value?.regenerate?.()` (`usePaneRouter.ts:196`). `undefined?.()` — silent.

**Mechanism.** Two clocks. The action bar reads the route synchronously; the slot's ref reads it one
rAF late. `onDesktopLeftMount` resolves *which ref to fill* from a **third** source (`currentConfig`
at callback time) rather than from the instance it was handed. Three readings of "which pane is
live", no single owner.

**Cure.** As L-2: the pane registers its own commands. An instance can then only ever file itself
under its own identity, and the rAF deferral becomes invisible to the command surface instead of
racing it. Independently, the `onMount` JSDoc must not survive in its current form — it is
load-bearing documentation that is measurably wrong.

---

### L-4 — MAJOR — `usePaneRouter.ts` is a four-concern god module, and the dock imports its own types back out of it

**Evidence.** `demo/shell/usePaneRouter.ts` (231 lines) owns:

1. the **component registry** — 10 `defineAsyncComponent`s + 1 eager (`:69-95`);
2. **prop factories** for left and right slots (`:126-161`);
3. the **three slot computeds** (`:163-184`);
4. the **dock action-bar type + data** — `DockAction`, `DockActionBar`, and the per-view action
   tables with icons (`:38-58`, `:186-228`).

Its own header announces the aggregation: *"folds in `useGenericActionBar`"*, *"the retired
`useDockActionBar.ts`"*. The dock then imports back out of it:

```
demo/shell/dock/Dock.vue:24:import type { DockActionBar } from "../usePaneRouter";
demo/shell/dock/layers/GenericActionBar.vue:4:import type { DockAction } from "../../usePaneRouter";
```

A dock component asking the pane router for the shape of a dock action is a boundary inversion: the
type's only consumers are in `demo/shell/dock/`, and its home is two directories away in a routing
module.

The action tables also encode **feature internals** — `regenerate`, `save`, `copyColors`, `reset`,
`copyCSS`, `seedFromPalette`, `clearSelection`, `startMix`, `copyResult` (`:196-223`) — reached
through `Ref<any>` (`PaneActionRefs`, `:107-111`) and invoked with double-optional
`paneRefs.generate.value?.regenerate?.()`. The router knows nine private method names of three panes
and can verify none of them.

**Cure.** Split by concern, which the areas already suggest:
`shell/panes/registry.ts` (name → loader, nothing else) · `shell/panes/props.ts` ·
`shell/dock/actions.ts` (owning `DockAction`/`DockActionBar` **and** the per-view tables, next to
the only components that consume them). The `Ref<any>` handles become the typed command registry of
L-2, at which point `?.()` becomes a compile error rather than a silent success.

---

### L-5 — MAJOR — the shell statically depends on the `palettes` feature; the dock cannot be loaded without 54 palette files

**Evidence — P4 and P5, measured:**

```
demo/shell/dock/index.ts   — STATIC closure: 135 files, dynamic entry points: 11
   by area: {"demo/shell":21,"demo/color-session":19,"demo/picker":16,"demo/shared":2,
             "demo/platform":10,"demo/ui":12,"demo/palettes":54,"demo/color-picker":1}

demo/shell/usePaneRouter.ts — STATIC closure: 115 files, dynamic entry points: 11
   by area: {…,"demo/palettes":54,"demo/picker":16,…}
```

**54 of the dock's 135 statically-reachable files (40%) belong to the `palettes` feature.** The
shortest violating edge:

```
demo/shell/dock/index.ts -> demo/shell/dock/Dock.vue -> demo/palettes/usePalettePorts.ts
```

Five shell files inject a **feature** key for what is a **platform** capability:

```
demo/shell/dock/Dock.vue:18                 import { SESSION_PORT_KEY } from "../../palettes/usePalettePorts";
demo/shell/dock/DockViewSelect.vue:8        import { SESSION_PORT_KEY } from "../../palettes/usePalettePorts";
demo/shell/dock/menus/ProfileSection.vue:14 import { SESSION_PORT_KEY } from "../../../palettes/usePalettePorts";
demo/shell/dock/menus/MobileMenuDropdown.vue:13 …
demo/shell/dock/layers/SlugEditLayer.vue:5  …
```

`usePalettePorts.ts` is a 17-composable aggregator (`:4-17`) that merely re-provides the session:
`usePalettePorts.ts:7` `import { useSession } from "../platform/auth/useSession"`. And the direct
edge **already exists and is already used** one directory over:

```
demo/shell/dock/ColorInput.vue:133:import { useSession } from "../../platform/auth/useSession";
```

So the same shell subtree reaches the same session concept **two different ways** — one direct to
platform, one routed through a feature aggregator. That is a dual path for a single concept, and the
feature-routed one is what drags 54 files into the shell's static graph.

There is also a type-level back-edge closing the loop: `usePalettePorts.ts:19`
`import type { ViewId } from "../shell/useViewManager"`. It is `import type` so it erases at runtime,
but the module graph is `shell → palettes → shell`.

**Cure.** Move `SESSION_PORT_KEY` (and its provide) to `demo/platform/auth/`. Five one-line import
rewrites; the shell's static closure loses the palettes feature outright; the dual path collapses to
the one that was already correct.

---

### L-6 — MAJOR — two features reach *upward* into the app root's private `boot/` directory

**Evidence — P5, BFS shortest path from my seat's area:**

```
demo/shell/usePaneRouter.ts
  -> demo/picker/index.ts
  -> demo/picker/ColorPicker.vue
  -> demo/color-picker/composables/boot/useOverture.ts
```

The two edges, exhaustively:

```
demo/picker/ColorPicker.vue:129
    import { OVERTURE_KEY } from "../color-picker/composables/boot/useOverture";
demo/scenes/atmosphere/aurora-harmony-stops.ts:23
    import { resolveCalibratedAtmosphere } from "../../color-picker/composables/boot/atmosphere-calibration";
```

`demo/color-picker/` is the **application root** — it holds `index.html`, `App.vue`,
`ErrorBoundary.vue`, `router/`, `public/`, and is the Vite `root` in both dev and `gh-pages`
(`vite.config.ts`: `root: "./demo/color-picker/"`). `composables/boot/` inside it is the boot chain:
`useOverture`, `useAtmosphereBoot`, `useDockArrival`, `hydrate`, `ground`. A **feature** importing
from an app-root boot directory is the canonical wrong-direction edge — the app composes features,
features must not reach back into the composition.

**Aggravating: the directory naming is inverted.** `demo/color-picker/` is the *application*;
`demo/picker/` is the *ColorPicker component*. Two directories one word apart, with opposite roles,
and the feature imports the app.

**Cure.** `OVERTURE_KEY` is a cross-cutting choreography token — it belongs beside the other
injection keys (`demo/color-session/keys.ts` already holds `CSS_COLOR_KEY`, `EDIT_TARGET_KEY`,
`COLOR_MODEL_KEY`, `SAFE_ACCENT_KEY`), or in a `demo/shell/keys.ts`. `atmosphere-calibration` is pure
colour maths with no boot dependency and belongs in `demo/color-session/` beside `view-accent.ts`.
Rename `demo/color-picker/` → `demo/app/`; the ambiguity dies with the directory.

---

### L-7 — MAJOR — `componentFor`'s masking fallback exists only because the signature widens a closed union to `string`

**Evidence.** `usePaneRouter.ts:81-95`:

```ts
function componentFor(name: string | null): Component | null {
    if (name === null) return null;
    …
    if (name.startsWith("admin-")) return AdminPane;
    return ColorPicker;                       // ← :94
}
```

Its only callers pass `currentConfig.value.left` (typed `LeftPane`) and `currentConfig.value.right`
(typed `RightPane`) — `usePaneRouter.ts:164`, `:171`. Those are **closed unions**
(`viewSchema.ts:52-66`):

- `LeftPane` = `color-picker | browse | extract | atmosphere | generate | gradient | admin-users | admin-names | admin-audit | admin-flagged | admin-tags`
- `RightPane` = `about | palettes | mix | blob | null`

`componentFor` handles: `null`, `color-picker`, `browse`, `extract`, `generate`, `gradient`,
`atmosphere`, `about`, `palettes`, `mix`, `blob`, `admin-*`. **The union is exhausted.** Line 94 is
unreachable — a masking fallback that can only ever fire if someone widens the schema and forgets
this file, at which point it will silently render the colour picker instead of failing.

This is not hypothetical drift: the visual audit already shows the same shape one layer up. In
`REPORT.md`, `safari-desktop-light /#/does-not-exist` reports `text: 859` — byte-identical to
`/#/` (`text: 859`). An unknown route renders the picker rather than a not-found surface, via
`useViewManager.ts:47` (`isViewId(name) ? name : "picker"`).

**Cure.** `function componentFor(name: LeftPane | RightPane): Component | null`. TypeScript's
exhaustiveness check then makes the fallback **impossible to write**, and adding a schema member
becomes a compile error here — which is the whole point of having the closed union in
`viewSchema.ts`.

---

### L-8 — MINOR — `ActionBarLayer` re-implements a removed glass-ui composable inside the SFC, carrying a dead parameter "for signature parity"

**Evidence.** `demo/shell/dock/layers/ActionBarLayer.vue:54-86`:

```ts
// V-W44 (Glass 7): glass-ui removed the standalone `useLayerTransition`
// … This local successor preserves the exact two-refs contract …
function useLayerTransition(opts: {
    containerEl: Ref<HTMLElement | null>;
    activeLayer: Ref<string>;
}) {
    void opts.containerEl; // signature parity with the retired producer composable
    …
}
```

`void opts.containerEl` is a parameter accepted and immediately discarded, explicitly to match a
signature that no longer exists anywhere. That is back-compat shape preserved for a dead counterparty
— the no-legacy edict names exactly this. The layer-crossfade concept is also a **design-system**
concern (edict 4: variants and primitives belong in glass-ui, not in demo), and the file's own comment
concedes it: *"a public content-swap composable would retire this local shim."*

**Cure.** Drop `containerEl` from the local signature today — it costs one line and the shim stops
lying about its shape. Relay to glass-ui BH: `DockCrossfade` needs a public `useContentSwap`
composable, or `DockCrossfade` needs to accept the two-slot content form this template wants.

---

### L-9 — MINOR — `tsconfig.demo.json`'s `paths` block is stale in three ways and load-bearing in none

**Evidence.** `package.json#exports` has exactly seven keys and **no `.` root**:
`./color ./value ./css ./easing ./math ./transform ./quantize`.

`tsconfig.demo.json` declares eight entries. Cross-checking each against the filesystem:

```
MISSING dist/index.d.ts              ← "@mkbabb/value.js"          (no "." key in exports at all)
MISSING dist/subpaths/parsing.d.ts   ← "@mkbabb/value.js/parsing"  (subpath does not exist)
MISSING dist/subpaths/units.d.ts     ← "@mkbabb/value.js/units"    (subpath does not exist)
EXISTS  dist/subpaths/css.d.ts       ← NOT declared in paths
EXISTS  dist/subpaths/value.d.ts     ← NOT declared in paths
```

So: three dead entries (two naming subpaths the exports map deleted), two live subpaths undeclared —
and `/css` is the most heavily used subpath in the demo. P6 shows it resolves correctly regardless,
via package self-reference. The `paths` block is therefore **inert**: it neither helps nor, currently,
hurts. Its accompanying comment asserts *"the 8 public keys"* and *"a CLOSED 8-key set"*; the set is
seven. `vite.config.ts` gets this right by **generating** the alias set from `package.json#exports`
(`:52-60`) — the same discipline should apply here or the block should be deleted.

The comment block also asserts *"glass-ui's published `dist/` imports the value.js core by the bare
`@mkbabb/value.js` specifier"*. Measured false — glass-ui 7.0.0's dist imports only subpaths
(`@mkbabb/value.js/color`, `/css`); `grep -rn '"@mkbabb/value.js"' node_modules/@mkbabb/{glass-ui,keyframes.js}/dist/`
returns nothing. This matters because the bare specifier is **UNRESOLVED** (P6) and would break if any
consumer ever wrote it.

**Cure.** Delete the `paths` block for `@mkbabb/value.js*` entirely — self-reference already does the
work, and a hand-maintained mirror of a generated map is guaranteed to drift (it has). Correct the
two false comment claims.

---

### L-10 — MINOR — the published `/css` surface emits duplicate private copies of `/color`'s types

**Evidence.** `dist/subpaths/css.d.ts` is 382 lines against npm 4.0.0's 350. The delta:

```
< declare type Alpha_2 = number | "none";
< declare type Channel_2 = number | "none";
< declare type ChannelsBySpace_2 = { … };
< declare type Color_2<S extends SpaceId_2> = Readonly<{ … }>;
< declare type SpaceId_2 = "rgb" | "hsl" | … ;
136c106
<     [S in CssColorSpace]: Color_2<S>;
---
>     [S in CssColorSpace]: Color<S>;
```

`rollupTypes: true` (`vite.config.ts`) is applied **per subpath entry**, so each of the seven barrels
inlines its own private copy of the shared `Color`/`SpaceId`/`Channel` vocabulary. Cross-subpath
composition — `parseCssColor` from `/css` handed to `mixColors` from `/color`, which
`demo/workbenches/gradient/composables/useGradientCSS.ts:12-13` does — succeeds only by *structural*
match, never by declaration identity. The local build has regressed relative to the published 4.0.0
artifact on this axis (350 → 382 lines, `Color` → `Color_2`).

Labelled a hypothesis on its consequence: I did not construct a case where structural matching fails.
The *fact* of the duplication is measured; the *harm* is not.

**Cure.** Emit one shared foundation declaration and have the seven barrels re-export from it, rather
than seven independently-rolled-up bundles. This is a `vite.config.ts` dts change, outside this
seat's write scope, and belongs to the library-build seat.

---

### L-11 — INFO — layout geometry for one concept is hand-written three times, and the two desktop panes visibly disagree

**Evidence.** The three wrapper `class` strings in `App.vue`:

- mobile `:77` — `pane-wrapper pane-wrapper--left pane-slot-mobile w-full max-w-md sm:max-w-lg mx-auto min-w-0 min-h-0 h-full flex flex-col items-center justify-center self-stretch`
- desktop-left `:96` — `pane-wrapper pane-wrapper--left w-full min-w-0 min-h-0 h-full flex-col justify-center`
- desktop-right `:119` — `pane-wrapper pane-wrapper--right w-full min-w-0 min-h-0 h-full transition-opacity duration-200`

Left centres its child (`justify-center`); right does not. In
`shots/safari-desktop-light/picker.png` the two plates are visibly unaligned — the right (About) card
starts materially higher and ends lower than the left (Picker) card, so the pair reads as two
different layouts rather than one two-pane composition.

This is `App.vue`'s ownership, not `PaneSlot`'s — which is the point. PaneSlot owns *what mounts*;
its box geometry is smeared across three hand-maintained class strings in the consumer, so nothing
can hold them consistent. A `PaneHost` that owned its own wrapper (with a `side` prop) would collapse
three strings to one component and make the asymmetry a deliberate choice rather than an accident.

---

## 3. The greenfield lattice

Asked directly: with no legacy, this is the module lattice.

```
demo/
  app/            index.html · main.ts · App.vue · router/ · boot/     ← was demo/color-picker/
  shell/          dock/ · PaneHost.vue · PaneSegmentedControl.vue
                  viewSchema.ts · useViewManager.ts · keys.ts · useShellKey.ts
  panes/          registry.ts (name → loader) · props.ts               ← was half of usePaneRouter
  features/       picker/ · palettes/ · workbenches/ · scenes/
  platform/       auth/ (owns SESSION_PORT_KEY) · transport/ · storage/
  design/         glass-ui re-exports only                            ← demo/ui/ deleted
```

**One law, checkable by a lint rule:** `app → shell → panes → features → platform`. Features may
import `platform` and each other's public barrels. **Nothing** imports `app/`. That single rule kills
L-5 and L-6 outright and would have prevented both from ever landing.

The four transpositions that matter, in dependency order:

1. **`PaneHost` owns the KeepAlive contract and states it first.** Global keyboard bindings move to
   `shell/useShellKey`, registered against **one** shell-owned `window` listener gated on the active
   route. L-1's whole class becomes unrepresentable. (`ColorPicker.vue:377`,
   `ImageEyedropper.vue:239`, `useSliderTouchGates.ts:124` migrate.)

2. **Delete `onMount`; panes register commands.** `PANE_COMMANDS_KEY` is `provide`d once by `app/`;
   each pane fills its slice in `onActivated` and clears it in `onDeactivated`. This is one change
   that kills L-2 (breakpoint asymmetry becomes impossible — there is no per-slot wiring left to
   forget), L-3 (an instance can only file itself under its own identity), the `Ref<any>` triple in
   `usePaneRouter.ts:107-111`, `usePaletteWiring`'s 2-second poll (`:33-58`), and eight `?.()`
   maskings.

3. **`usePaneRouter` splits four ways.** `panes/registry.ts` becomes a pure closed map typed
   `Record<LeftPane | RightPane, () => Promise<Component>>` — L-7's unreachable fallback becomes a
   compile error to omit. `DockAction`/`DockActionBar` and the per-view tables move to
   `shell/dock/actions.ts`, beside their only consumers, ending the dock's back-import.

4. **`SESSION_PORT_KEY` moves to `platform/auth/`.** Five import rewrites. The shell's static closure
   sheds 54 palette files; the two-paths-to-one-session split collapses onto the edge
   `ColorInput.vue:133` already uses correctly.

`PaneSlot.vue` itself keeps its best idea untouched: the rAF-trailing commit (`:65-97`) is a real,
well-reasoned scheduling device, and the simultaneous-transition-mode decision (`:12-23`) is
correctly argued from a reproduced dev-mode Vue defect. Both survive the transposition intact. What
changes is that the slot stops being a passive conduit for an escape hatch and becomes the honest
owner of the lifecycle it already mints.

---

## 4. Edict compliance

| Edict | Status | Note |
|---|---|---|
| 1 — no god modules | **VIOLATED** | L-4: `usePaneRouter.ts` = registry + props + slots + dock actions |
| 2 — no legacy / masking fallbacks | **VIOLATED** | L-7 unreachable fallback · L-8 `void opts.containerEl` · L-2 eight `?.()` maskings · L-9 stale `paths` |
| 3 — KISS, no contrivance | **VIOLATED** | L-2: `whenColorPickerReady` 40×50 ms poll exists only to cover a ref channel with no readiness signal |
| 4 — glass-ui is the design system | **VIOLATED (minor)** | L-8 local `useLayerTransition`; 10 shell files import `demo/ui/{popover,select,tooltip,separator,dropdown-menu,avatar,button}` alongside `@mkbabb/glass-ui/dock` |
| 5 — root-level styling | **PASS** | PaneSlot ships no `<style>`; the appear-family classes are named tokens (`:115-117`) |
| 6 — animations never deleted | **PASS** | the `out-in` → default-mode change is a *mode* change with a reproduced defect behind it (`:12-23`); the vj-enter and overture-appear families are intact |
| 7 — idiomatic Vue 3.5 | **PARTIAL** | reactive props destructure ✓, `shallowRef` ✓; the inline-arrow `:ref` (`:124`) is the un-idiomatic seam and is the direct mechanism of L-3 |
| 8 — `verbatimModuleSyntax` | **PASS** | `PaneSlot.vue:25` inline-`type`-qualifies `Component`; the whole `demo/shell` census is clean |

---

## 5. Severity roll-up

| ID | Sev | One line |
|---|---|---|
| L-1 | BLOCKER | KeepAlive contract minted here, published nowhere; 4 global-listener sites leak across every route |
| L-2 | BLOCKER | mobile slot has no `:on-mount` → `colorPickerRef` always null → 6 silent no-ops + a 2 s stall |
| L-3 | MAJOR | `onMount` JSDoc is false; fires per render; hands the wrong instance across the swap frame |
| L-4 | MAJOR | `usePaneRouter` is a 4-concern god module the dock imports its own types out of |
| L-5 | MAJOR | shell → palettes: 54 of the dock's 135 static files are a feature; session has two homes |
| L-6 | MAJOR | `demo/picker` and `demo/scenes` import the app root's private `boot/` |
| L-7 | MINOR | `componentFor(name: string)` widens a closed union, forcing an unreachable masking fallback |
| L-8 | MINOR | in-SFC re-implementation of a removed glass-ui composable, with a dead parity parameter |
| L-9 | MINOR | `tsconfig.demo.json` `paths`: 3 dead entries, 2 live subpaths undeclared, 2 false comment claims |
| L-10 | MINOR | `/css` d.ts inlines duplicate private copies of `/color`'s types (harm: hypothesis) |
| L-11 | INFO | three hand-written wrapper class strings for one concept; the two desktop plates visibly disagree |

**Strongest defect: L-1.** It is the only finding that is simultaneously (a) proven live in the
running application, (b) a *class* rather than an instance — four listener sites, one mechanism — and
(c) caused by an absence rather than a mistake, which is why no reviewer has caught it in five
tranches. PaneSlot converts `onUnmounted` from "runs on navigation" to "runs never" for eleven
components, and says so nowhere.

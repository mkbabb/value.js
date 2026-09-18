claude-opus-5[1m]

# Challenge · `TimingFunctionPanel.vue` · axis **D (design)**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/channel-controls/TimingFunctionPanel.vue` (166 lines)
**Mode:** static, read-only, source-derived. No browser tooling; no writes to any product tree. Pixel geometry marked **UNPROVEN-NEEDS-LIVE** where it needs the SS-13 visual audit.
**Evidence root:** `/Users/mkbabb/Programming/keyframes.js` @ working tree (installed `@mkbabb/glass-ui` **7.0.0**, `node_modules/@mkbabb/glass-ui/package.json`).
**Hitherto corpus folded:** `formation/keyframes/lane-frontend.md` — F-1 (phantom dep), **S-1** (fork on a rationale void against the installed version), §"No `--kf-*` namespace exists", the roster row `| 166 | channel-controls/TimingFunctionPanel.vue | G | easing editor — EasingPicker + Button |` (:217).

**Tally: 15 defects (3 BLOCKER · 4 MAJOR · 4 MINOR · 4 INFO) · 5 superlatives.**

---

## 0. The governing fact — the panel's stated premise is void

Every architectural choice in this file rests on one comment, repeated twice:

```
TimingFunctionPanel.vue:25-31
  <!-- The `:key` remount re-seats the picker when the KIND flips
       (glass-ui 4.0.1's modelValue is emit-only — no external
       write-through / points-in prop; the re-seat gap is forwarded
       in KF-TO-GLASSUI-BG.md §FORWARDING). A custom stored quad has
       no seedable preset — the picker opens on its catalogue default
       and the first authored edit writes through … -->
```

The installed vendor is **7.0.0**, not 4.0.1, and 7.0.0's `EasingPicker` has **full deep two-way `modelValue` write-through**, including arbitrary points-in:

```js
// node_modules/@mkbabb/glass-ui/dist/easing.js:196-210  (We = applyIncoming, Ue = emitOut)
function We(e) {                                    // ← applies an INCOMING modelValue
  if (!e) return;
  if (q(J, e)) { J = void 0; return; }              // ← vendor's OWN echo suppression
  v.value = e.mode === "steps" ? "steps" : "bezier",
  Array.isArray(e.points) && e.points.length === 4 && e.points.every(Number.isFinite)
    && e.points.some((e,t) => e !== b.value[t])
    && (N(0, e.points[0], e.points[1]), N(1, e.points[2], e.points[3])),   // ← setHandle ×2
  Number.isFinite(e.steps) && (P.value = Math.max(1, Math.min(12, Math.round(e.steps)))),
  I.includes(e.term) && (F.value = e.term);
  …
}
k(l, We, { deep: !0, immediate: !0 }), k(B, Ue, { immediate: !0 });   // ← watch(modelValue, …)
```

`dist/components/easing/EasingPicker.vue.d.ts` declares `__VLS_ModelProps = { modelValue?: EasingPickerValue }`, and `EasingPickerValue.points` is the `[x1,y1,x2,y2]` quad. **An arbitrary stored quad is seedable in 7.0.0** — `setHandle` clamps x to `[0,1]` and y to `[-0.6, 1.6]` (`dist/easing.js:24-27`) and nothing else.

The panel never passes `:model-value` (`TimingFunctionPanel.vue:32-41` binds only `mode`/`preset`/`steps`/`term`/`playback`/`label` and listens to `@update:model-value`). So ~55 of the file's 166 lines — `quadEq` (:82-85), `seedPreset` (:90-98), `pickerKey` (:100), `isSeedEcho` (:105-131) — exist to work around a seam the installed vendor no longer has.

> **This is S-1 recurring.** lane-frontend.md S-1 (:264-307) found `KfPillTabs` forking `SegmentedTabs` over a 4.0.1 ARIA bug **fixed in the installed 7.0.0**. Same version, same stale rationale, same shape. File this as **S-9** in the census: *the 4.0.1-era workaround class*. It is not one component; it is a pattern, and the two `EasingPicker` consumers (this file + `scenes/easing/EasingSidebar.vue:16-21`, which carries a verbatim copy of the same stale claim) are its second and third members.

**Falsifier for §0:** show that `dist/easing.js` does not watch `modelValue`, or that `We` ignores `e.points`, or that some build resolves `@mkbabb/glass-ui/easing` to a 4.0.1 artifact rather than `node_modules/@mkbabb/glass-ui/dist/easing.js`. Any of the three kills every claim below that leans on write-through (D-1, D-2).

---

## 1. BLOCKERS

### D-1 · BLOCKER — the first authored drag destroys itself and the canvas starts lying

`TimingFunctionPanel.vue:33` `:key="pickerKey"`, `:100` `pickerKey = computed(() => `${kind.value}:${seedPreset.value ?? "custom"}`)`, `:90-98` `seedPreset` derives from the **stored quad**, `:133-155` `onPickerChange` **writes** the stored quad.

That is a cycle: *user drags → stored quad changes → `seedPreset` recomputes → `pickerKey` changes → Vue remounts the picker mid-gesture.*

It is not a rare edge; it is the **dominant entry path**. `useTimingFunctionEditor.onEasingLabelClick` converts any named easing into a stored quad taken from `NAMED_EASING_BEZIER` (`composables/useTimingFunctionEditor.ts:186-199`), and those quads are **byte-identical** to `bezierPresets`:

| name | `NAMED_EASING_BEZIER` (`animationDescriptions.ts:20-41`) | `bezierPresets` (value.js) |
|---|---|---|
| `ease` | `[0.25, 0.1, 0.25, 1.0]` | `[0.25,0.1,0.25,1]` |
| `ease-in-out` | `[0.42, 0, 0.58, 1.0]` | `[0.42,0,0.58,1]` |
| `ease-out-quint` | `[0.23, 1, 0.32, 1]` | `[0.23,1,0.32,1]` |

…and the unnamed fallback writes `[0, 0, 1, 1]` (`useTimingFunctionEditor.ts:196-198`) — which is `bezierPresets.linear`. **Every** entry path into bezier mode arrives preset-matched, so `pickerKey` opens as `cubic-bezier:<name>`.

Now the first `pointermove` on a handle. The vendor emits on **every** move (`dist/easing.js:249-253` `Ye → setHandle`; `:210` `k(B, Ue, { immediate: !0 })`). So:

1. `onPickerChange` runs, `isSeedEcho` is false (points differ), `:147` writes the dragged quad to the store.
2. The store is deep-reactive — `useStorage` from VueUse (`demo/state/animationOptionsStore.ts:66-73`) — so `seedPreset` recomputes. No preset matches a mid-drag quad → `undefined`.
3. `pickerKey` flips `cubic-bezier:ease-in-out` → `cubic-bezier:custom`. **Vue tears down and rebuilds `EasingPicker`.**
4. The new instance mounts with `:preset="undefined"` → `useEasingPicker({initialPreset: undefined})` → `C(t.initialPreset ?? "ease-out-back")` (`dist/easing.js:16`) → points become `[0.175, 0.885, 0.32, 1.275]`.
5. The remount's echo is swallowed by the panel's own `:120-129` fallback (`quadEq(v.points, bezierPresets["ease-out-back"])` → `true`), so the **store keeps the dragged quad**.

Net observable state after one pointermove:

- the SVG shows **`ease-out-back`**, a dramatic back-overshoot curve the user never asked for;
- the vendor readout `<code>` (`dist/easing.js:543-547`) prints `cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
- the copy button copies that literal;
- the **animation on stage runs the half-dragged quad** (`:148-153` already wrote `props.animation.options.timingFunction` and every frame's);
- the pointer capture died with the removed element, so the drag ends after one move — and a second grab now drags *from* `ease-out-back`, overwriting the user's work.

The editor's primary display contradicts the thing it is editing. On a design axis there is no worse failure available to a direct-manipulation surface.

**Its twin knows better.** `scenes/easing/EasingSidebar.vue:112-118` returns `null` from `seedFor` for the custom case with the comment *"a live custom edit — the picker authored it, never remount"*, and holds the seed in a `ref` updated **only** by a watch on the curve **name** (`:159-166`) — never by the authored quad. The hazard was identified, solved once, and not carried across.

**Falsifier:** show that `seedPreset` does not change on a mid-drag quad (e.g. the store is not reactive, or `quadEq`'s `0.0005` tolerance keeps matching); or that Vue does not remount on a changed `:key`; or that the vendor emits only on `pointerup`. Any one kills D-1.

---

### D-2 · BLOCKER — a custom stored curve opens the editor on someone else's curve

`TimingFunctionPanel.vue:28-31` states the failure as accepted: *"A custom stored quad has no seedable preset — the picker opens on its catalogue default."*

Concretely: the store's own default is `defaultCubicBezierOptions.controlPoints = [0.2, 0.65, 0.6, 1]` (`demo/state/animationOptionsStore.ts:57-59`) — **not** a `bezierPresets` member. And the persist seam writes the complete literal to localStorage (`useTimingFunctionEditor.ts:160-162`), so any user-authored curve survives reload as a custom quad. On every such open:

- `seedPreset` → `undefined` (`:91-98`)
- picker mounts on `ease-out-back` `[0.175, 0.885, 0.32, 1.275]` (`dist/easing.js:16`)
- `isSeedEcho`'s `!seed` branch (`:120-129`) recognises and swallows the echo, so the store is preserved — **and the divergence is preserved with it.**

So: reopen the editor on your own saved curve and it shows a different curve, with a readout and a copy button that both agree with the *wrong* one. The panel is a lie-by-default surface for exactly the users who used it.

The mitigation is one prop. 7.0.0 accepts `:model-value="{ mode:'bezier', points: stored, … }"` and applies it through `setHandle` on a deep+immediate watch (§0). The `:key` remount, `seedPreset`, `quadEq`, `pickerKey` and `isSeedEcho` all collapse into it.

**Falsifier:** §0's falsifier; or show the panel is only ever reachable with a preset-matching stored quad (contradicted by `animationOptionsStore.ts:57-59` and by the persist seam at `useTimingFunctionEditor.ts:160-162`).

---

### D-3 · BLOCKER — the collapsed panel keeps ~8 controls in the tab order

The host mounts `TimingFunctionPanel` **unconditionally** — no `v-if` — and collapses it with classes only:

```
ChannelOptions.vue:303-324   <div :class="['panel-row panel-row--detail', showDetailPanel ? 'panel-row--active' : 'panel-row--inactive']">
                               <div class="panel-content"><TimingFunctionPanel … /></div>
ChannelOptions.vue:564-566   .panel-row--inactive { grid-template-rows: 0fr; }
ChannelOptions.vue:567-575   .panel-content { overflow: hidden; min-height: 0; … }
ChannelOptions.vue:580-583   .panel-row--inactive > .panel-content { opacity: 0; pointer-events: none; }
```

`opacity: 0` and `pointer-events: none` remove the panel from sight and from the **mouse**. Neither removes it from the **tab order**. There is no `visibility: hidden`, no `display: none`, no `inert` — `grep -rn "inert" demo/` returns only `inertia*` identifiers in the cube scene.

While the detail panel is closed, a keyboard user tabbing through the controls rail walks into an invisible 0-height box containing:

| control | source |
|---|---|
| the back `<Button>` | `TimingFunctionPanel.vue:15-23` |
| 2× bezier handle, `role="slider" tabindex="0"` | `dist/easing.js:471-480` |
| the `Preset` `SelectTrigger` | `dist/easing.js:496-500` |
| the readout `<code tabindex="0">` | `dist/easing.js:543-546` |
| the copy `<button>` | `dist/easing.js:547-553` |
| (steps mode) step-count `Slider` + `Jump term` trigger | `dist/easing.js:511-540` |

Focus is invisible (`opacity:0`), the container is clipped to zero height, and arrow keys on a focused handle silently rewrite the animation's easing (`dist/easing.js:255-278` `Ze` → `setHandle`). WCAG 2.4.3 / 2.4.11 / 2.1.1.

Ownership is shared: the fix (`v-if` on the panel, or `inert` on the inactive row) most naturally lands at `ChannelOptions.vue:303-311` — but the component is what renders eight focusable nodes into a collapsed row and is the only one that knows they are there.

**Falsifier:** produce a rule that sets `visibility: hidden`/`display: none`/`content-visibility: hidden` or applies `inert` to `.panel-row--inactive .panel-content` — I grepped the demo CSS and glass-ui's `dist/styles/` and found none. Or show `showDetailPanel` is always true (contradicted by `useTimingFunctionEditor.ts:58-65`).

---

## 2. MAJOR

### D-4 · MAJOR — the vendor's layout switches on the **viewport**, in a 376–488px rail column

The picker's root is `class="grid gap-4 lg:grid-cols-[1fr_18rem]"` (`dist/easing.js:322`). `lg:` is a **media** query (`width >= 64rem`); the demo does not override `--breakpoint-lg` (`grep -rn "--breakpoint" demo/styles/` → nothing).

The desktop rail exists **only** at `@media (min-width: 1024px)` (`controls-pane/ControlsPaneWrapper.css:81`), where:

```
ControlsPaneWrapper.css:122-136
  .controls-content { width: var(--rail-width); box-sizing: border-box;
                      padding-left: 12px; padding-right: 12px; … }
design-idioms.css:47
  --rail-width: clamp(25rem, 33svi, 32rem);        /* 400px … 512px */
```

So the panel's inline size is **376px (at a 1024px viewport) to 488px (at ≥1552px)** — and the two-column layout is on across that entire range. It is switched on precisely where it cannot fit.

The picker's minimum:

| track | min | source |
|---|---|---|
| canvas card (`1fr`, `min-width:auto`) | SVG `block-size: clamp(200px, 38cqi, 320px)` + `aspect-ratio: 1` → transferred inline min **200px**; `glass-card … p-3` adds 24px → **224px** | `dist/easing.js:338-346`, `:322` |
| gap | 16px (`gap-4`) | `dist/easing.js:322` |
| controls column | **288px** fixed (`18rem`) | `dist/easing.js:322` |
| **total** | **≈ 528px** | |

(`38cqi` of 376–488px = 143–185px, always below the 200px floor — the canvas is 200px tall on the rail at every desktop width.)

**528px required vs 376–488px available: a 40–152px overflow at every desktop width.** And the overflow cannot relieve itself, because the panel's own `container-type: inline-size` (`TimingFunctionPanel.vue:160-164`) applies inline-size containment — `.easing-editor`'s width is computed *without* consulting its descendants — while `.panel-content { overflow: hidden }` (`ChannelOptions.vue:567-575`; the detail-active rule at `:589-592` adds `overflow-y: auto` and leaves overflow-**x** hidden) and `.controls-pane-wrapper { overflow: hidden }` (`ControlsPaneWrapper.css:88`) clip it. The clipped-away region is the right column: **Preset select, step count, Jump term, the readout literal, and the copy button** — the whole non-canvas half of the editor, unreachable and unscrollable.

Should the min-content contribution resolve smaller than I compute, the alternative branch is no better: a 72–184px-wide canvas box with a 200px `block-size` and `preserveAspectRatio="xMidYMid meet"` renders the curve as a small square letterboxed inside a tall empty band. The layout fails either way.

**This also breaks the demo's own written law.** `AnimationControlsGroup.css:14-25` and `:193-197` record the deliberate conversion of the demo's `@media (min-width:1024px)` fork into `@container controls-layout (min-width: 64rem)` — *"the macro tier reads ITS box, not the viewport."* The panel adopts a vendor primitive that violates that law inside the very container the law was written for, and neutralises nothing.

**Falsifier:** show `lg:grid-cols-[1fr_18rem]` is never generated (it is: glass-ui's `dist/styles/index.css` ends with `@source "../*.js";`, which registers `dist/easing.js` for Tailwind scanning, and the demo's entry is `@import "tailwindcss"` at `demo/styles/style.css:1`); or show a demo rule that forces the picker to one column (`grep -rn "easing-picker" --include="*.css" demo/` → none); or measure the rendered panel ≥ 528px. **Pixel figures UNPROVEN-NEEDS-LIVE; the structural claim — viewport breakpoint governing a container-scoped surface — is fully source-derived.**

---

### D-5 · MAJOR — a scene-hero type rung on a rail sub-panel (≈2.4× proportion break)

```
TimingFunctionPanel.vue:14   <h3 class="text-title">{{ kind === "steps" ? "steps" : "cubic-bézier" }}</h3>
```

`text-title` resolves to (`glass-ui/dist/styles/typography/semantic.css`):

```css
@utility text-title { font-size: var(--type-title); font-weight: var(--type-weight-title); letter-spacing: var(--type-tracking-tight); text-wrap: balance; }
```

with `--type-title: 2.058rem` and `--type-weight-title: 700` (`glass-ui/dist/styles/typography/scale.css`). The demo does **not** rebind either (`grep -rn "\-\-type-" demo/styles/*.css` → only `--type-body`/`--type-caption` *consumers*, no `--type-title` override).

**32.9px at weight 700** — inside a 376–488px control rail whose sibling headers are:

| surface | class | computed |
|---|---|---|
| this panel's title | `text-title` | **2.058rem / 700** |
| the "advanced" sub-pane title, same stack | `text-small font-medium` (`ChannelOptions.vue:292-294`, `:341-345`) | `clamp(0.875rem, …, 1.25rem)` / 500 |
| the picker's own section labels | `text-mono-caption text-muted-foreground` (`dist/easing.js:496`, `:511`, `:522`) | caption rung |

The φ-ladder puts `--type-title` two rungs above `--type-subheading` (1.272rem) and ~2.4× the small rung. And the **only other `text-title` call site in the entire 58-file demo** is a scene hero specimen — `scenes/spring/StartingStyleTarget.vue:33` `<span class="text-title text-foreground">Hello, spring.</span>`. This is the demo's hero rung, borrowed for a transient sub-pane header. The word "cubic-bézier" at 33px/700 outweighs every other element in the rail including the editor it labels.

**Falsifier:** find a demo override lowering `--type-title` in the controls-rail cascade, or a third `text-title` call site at control scale, or show `--ui-scale`/a container rule scales it down here. I found none.

---

### D-6 · MAJOR — two back buttons, one navigation stack, inverted

The detail panel and the "advanced" sub-pane are **siblings in the same panel-row stack** (`ChannelOptions.vue:303-324` and `:326-345`), reached by the same gesture, dismissed by the same gesture. They disagree on every dimension of the back affordance:

| | detail panel (`TimingFunctionPanel.vue:13-24`) | advanced sub-pane (`ChannelOptions.vue:334-346`) |
|---|---|---|
| **position** | title LEFT, dismiss **RIGHT** | back **LEFT**, title right |
| component | `<Button emphasis="quiet" icon-only>` | `<DockControl shape="icon" compact>` |
| glyph | `<ArrowLeft class="icon-sm">` = **16px** (`design-idioms.css:102-107`) | `<ArrowLeft class="icon-md">` = **20px** (`design-idioms.css:108-113`) |
| label | `aria-label="back to controls"` | `title="Back"` |
| title type | `text-title` (2.058rem/700) | `text-small font-medium` |

A left-pointing arrow that sits on the **right** edge is the sharpest of these: in a stack where the peer back control sits left, the direction of travel is inverted between two panes the user swaps between freely. The `:10` comment (*"The H.W9.F2 title-LEFT / dismiss-RIGHT header survives"*) records this as a preserved decision — but it was preserved against a *deleted* sibling, not reconciled with the surviving one.

**Falsifier:** produce a house rule making dismiss-right correct for detail panels and back-left correct for sub-panes (I find no such rule in `demo/styles/design-idioms.css` or the transport tree), or show the two panes are never reachable from one another (they are: `ChannelOptions.vue:306` / `:331` gate on the same `showDetailPanel`, and `:331` explicitly reads `advancedOpen && !showDetailPanel`).

---

### D-7 · MAJOR — steps mode ships a 100-step default into a 1–12 authoring control

```
TimingFunctionPanel.vue:36   :steps="storedAnimationOptions.stepOptions.steps"
animationOptionsStore.ts:51-54   defaultStepOptions = { steps: 100, jumpTerm: "jump-start" }
```

The vendor's steps authoring domain is **1..12**:

```js
dist/easing.js:511-521   h("span", Ae, "Steps (n) — " + E(D(P)), 1), _(D(s), { modelValue: at.value, …, min: D(1), max: D(12), step: 1, "aria-label": "Step count" })
dist/components/easing/constants.d.ts   STEP_COUNT_MIN = 1; STEP_COUNT_MAX = 12; DEFAULT_STEP_COUNT = 4;
```

Two consequences, both visual:

1. **The staircase is illegible.** The plot samples 240 points over 100 treads (`dist/easing.js:63-71`, `STEP_PLOT_SAMPLES 240`) at `stroke-width: 0.025` in a `0..1` viewBox scaled to a ~200px canvas. Tread width `1/100 = 0.01` units ≈ 2–3px; the stroke ≈ 5–8px. Every riser overlaps its neighbours: the "staircase" renders as a solid wedge. The one thing the steps editor exists to show is not shown. *(UNPROVEN-NEEDS-LIVE for exact rasterisation; the arithmetic is source-derived.)*
2. **The first slider touch silently destroys the value.** `modelValue = [100]` against `max: 12` pins the thumb at the far end while the label above reads `Steps (n) — 100` (`dist/easing.js:511`) — an inconsistent readout. Any interaction snaps 100 → ≤12 and `onPickerChange` (`:136-142`) persists it. There is no confirmation, no undo, no indication that the stored value was out of range.

The panel forwards the store's domain into the vendor's domain without reconciling them, and shows no out-of-range state.

**Falsifier:** show `stepOptions.steps` is clamped to ≤12 before reaching `:36` (it is not — `TimingFunctionPanel.vue:36` binds the raw store value, and the vendor clamps only on the `modelValue` path at `dist/easing.js:203`, which this panel never uses), or that the default is never 100 (`animationOptionsStore.ts:51-54`).

---

## 3. MINOR

### D-8 · MINOR — the back button's entire `class` attribute is inert

```
TimingFunctionPanel.vue:18   class="h-auto p-1 text-muted-foreground hover:text-foreground transition-colors"
```

- `h-auto` sets `height: auto`, but the vendor sets **`min-block-size: var(--button-size)`** on both `.button` and `[data-icon-only]` (`glass-ui/dist/components/button/styles.css`, `@layer components`), and `h-auto` emits no `min-height`. The floor survives.
- `inline-size: var(--button-size)` is never overridden — no `w-*` at the call site.
- `--button-size: var(--control-h-md)` = `max(calc(2.5rem * var(--ui-scale)), var(--control-floor))` = **40px**.
- `p-1` overrides the vendor's `padding: 0`, but padding is irrelevant to a box whose inline size and min block size are both fixed.
- `text-muted-foreground` restates `[data-emphasis="quiet"] { color: var(--muted-foreground) }` verbatim; `hover:text-foreground` restates `[data-emphasis="quiet"]:hover { color: var(--foreground) }` verbatim.

So the author's evident intent — a compact ~24px dismiss chip — does not land. The rendered control is a **40×40 box holding a 16px glyph** (40% fill), beside a 33px title (D-5) and a peer back control drawn at 20px (D-6). Five utility classes, zero effect. Dead intent reads to the next maintainer as a decision that was made.

**Falsifier:** show `dist/components/button/styles.css` is unlayered (it opens `@layer components { .button { --button-size: var(--control-h-md); … min-block-size: var(--button-size); …` — layered, so Tailwind's `@layer utilities` does win for `height`/`padding`, and *only* for those); or show `h-auto` emits `min-height: auto`; or show `--ui-scale`/`--control-floor` drives `--control-h-md` below 24px.

### D-9 · MINOR — a dead prop wired to a per-frame computed, and the affordance it belonged to is switched off

`progress?: number` is declared at `TimingFunctionPanel.vue:69` and **referenced nowhere else in the file** (`grep -n "progress" TimingFunctionPanel.vue` → one hit, the declaration). The host binds it to a rAF-driven computed:

```
ChannelOptions.vue:317   :progress="normalizedProgress"
ChannelOptions.vue:506-511   const normalizedProgress = computed(() => clamp(currentT.value / dur, 0, 1));
```

Meanwhile `:38 :playback="false"` switches off the vendor's travel dot — the one affordance a progress value would drive (`dist/easing.js:482-489`). Together these read as an abandoned integration: a per-frame prop kept alive against a feature that was turned off. The design consequence is a subtree re-rendered at animation frame rate for no visual output; the perf magnitude belongs to the C/perf lane.

Note also that `:playback="false"` is copied from the sidebar twin, where it carries an explicit rationale (`EasingSidebar.vue:23-26`: *"the gallery race IS the motion preview, so a second uncoordinated clock stays off this surface"*). Here it carries none, and this panel has no other motion preview.

**Falsifier:** find a use of `props.progress` in this file, or a documented rationale for `playback="false"` in this panel.

### D-10 · MINOR — two inert layout declarations

- `TimingFunctionPanel.vue:2` `<div class="w-full grid justify-items-center">` wrapping `:12` `<div class="easing-editor grid gap-2 w-full">`. `justify-items-center` centres grid items in their area; the sole item is `w-full`, so it fills the area and centring is a no-op. Cruft that states a centring intent the tree never honours.
- `TimingFunctionPanel.vue:163` `container-name: easing-editor;` — no `@container easing-editor (…)` query exists in the demo or in glass-ui (`grep -rn "@container easing-editor" demo/ node_modules/@mkbabb/glass-ui/dist/` → none). The vendor's `38cqi` (`dist/easing.js:342`) is an **unnamed** query unit and binds to the nearest inline-size container regardless of name. Harmless, but it advertises a contract nothing consumes.

**Falsifier:** show the outer div ever has a non-`w-full` child, or find a named `@container easing-editor` rule.

### D-11 · MINOR — two spellings of one token, adjacent; and a label-case break

`:14` renders **`cubic-bézier`** (accented). Roughly 200px below it, in the same card, the vendor readout prints **`cubic-bezier(0.42, 0, 0.58, 1)`** (`dist/easing.js:543-546`), and the emit at `:154` sends the string `"cubic-bezier"`. Two orthographies of the same identifier in one viewport, with the human-facing one being the spelling that is *not* valid CSS.

Separately, `aria-label="back to controls"` (`:19`) is all-lowercase against the vendor's sentence-case screen-reader labels in the same subtree — `"Easing preset"`, `"Jump term"`, `"Step count"`, `"Copy curve literal"`, `"Bezier control point 1"` (`dist/easing.js:474`, `:499`, `:518`, `:527`, `:550`). The *visible* lowercase (`steps`, `advanced`) is a consistent house idiom and is **not** a defect; the assistive-technology label is a different register and breaks with its neighbours.

**Falsifier:** a house rule mandating the accented display form (none found in `demo/styles/` or the reference-data tables, which spell it `cubic-bezier` throughout — `animationDescriptions.ts:51`), or a demo convention of lowercase aria-labels (the demo's other aria-labels are not surveyed here; a counter-census would weaken this to INFO).

---

## 4. INFO

### D-12 · INFO — `<h3>` is a level skip with no region semantics

`:14`'s `<h3>` is the **only heading in the entire transport tree** (`grep -rn "<h[1-6]" demo/components/instrument/transport/` → this one line). In the live editor path there is no `<h1>` or `<h2>`: `demo/app/` and `EditorShell.vue` contain none, glass-ui's `HeaderRibbon` emits none, and `EditorStartScreen` (which owns the `<h1>`) is behind `v-if="showStartScreen"` (`EditorShell.vue:60`) — unmounted while the controls rail is in use. So the panel's `<h3>` is plausibly the document's first and only heading. WCAG 1.3.1 / heading-order.

The panel also has no region semantics: no `role="region"`/`aria-labelledby` tying the `<h3>` to the editor it names, so the heading is a visual label only.

**Falsifier:** show `showStartScreen` stays true (or the h1 stays mounted) while the detail panel is reachable, or find an `<h1>`/`<h2>`/`aria-level` in the editor chrome.

### D-13 · INFO — no RTL readiness

`<ArrowLeft>` (`:22`) is a directional glyph with no `rtl:` variant and no logical-direction handling; the header uses `justify-between` (direction-aware, fine). The demo has **zero** RTL surface — `grep -rn 'dir="rtl"\|:dir\|rtl:' demo/` → nothing, no i18n. So this is **design-readiness, not a live defect**: filed INFO deliberately, and it would be a false MAJOR to claim otherwise.

**Falsifier:** the demo shipping a `dir` toggle or locale switch (none exists today).

### D-14 · INFO — forced-colors unhandled, curve legibility unproven

`grep -rn "forced-colors" demo/` → **0**. glass-ui's only forced-colors block covers aria-state borders (`dist/styles/accessibility.css`), not the picker. Under forced colors the curve `stroke-(--easing-curve-accent)` (`dist/easing.js:441`), the grid lines `stroke-border/40` (`:373`, `:387`) and the guide `stroke-muted-foreground/30` (`:363`) are all candidates for collapse to a single system colour, which would make the curve indistinguishable from its own grid. Vendor-owned; the panel neither triggers nor mitigates it.

**UNPROVEN-NEEDS-LIVE** — needs a forced-colors render in the SS-13 pass. **Falsifier:** a forced-colors screenshot showing the curve distinct from the grid.

### D-15 · INFO — no error or out-of-range state anywhere in the panel

The panel renders one shape and only one. It has no representation for: an out-of-range stored `steps` (D-7), a stored quad the picker cannot show (D-2), or a throw from `cubicBezierEasing`. That last is real if narrow — `timingCurveUtils.ts:12-23` `requireEasing` **throws** on an invalid quad, and `:150` calls it inside the emit handler with no boundary, so a bad quad would surface as an uncaught handler error with no UI. Likelihood is low: the vendor clamps x to `[0,1]` and y to `[-0.6, 1.6]` before emitting (`dist/easing.js:24-27`), so an invalid quad should not reach line 150 through the drag path. Filed INFO on that basis.

The vendor does expose a validity signal the panel ignores — `data-reparse-ok` on the readout (`dist/easing.js:541`, backed by `reparseOk` round-tripping through Value's parser at `dist/easing.js:33-40`).

**Falsifier:** an input path that reaches `:150` with a non-finite or out-of-clamp quad; or a demo error boundary above `ChannelOptions`.

---

## 5. Superlatives (L-18 runs both ways — each with its own falsifier)

### S-A · The bespoke→vendor swap is the strongest glass-ui conformance move in the transport tree
`:3-11` and `EasingSidebar.vue:1-13` record the deletion of a **1,082-line** hand-rolled cluster (`EasingEditor` + `EasingCurveCanvas` + `DemoControlPoint` + `EasingSelect`) in favour of the published `EasingPicker`. `find demo -path "*instrument/easing*"` → nothing; the cluster is genuinely gone, not shimmed. This is exactly the disposition lane-frontend.md holds open for S-3..S-7 (:395-397, 1 168 lines "Evaluate"), executed. The panel is 166 lines where its ancestor was ~1 000, it declares **zero** custom properties and **zero** colour literals, and it reaches the vendor through the published `/easing` subpath rather than a deep import. Whatever else is wrong here, the boundary discipline is right, and the census's §3.3/§3.4 clean-boundary finding holds at this file. *Falsifier: find a surviving `instrument/easing/` component or a re-implementation of bezier dragging in the demo.*

### S-B · `container-type: inline-size` is load-bearing and correctly reasoned
`:160-164`'s container declaration is not decoration. The vendor sizes its canvas `block-size: clamp(200px, 38cqi, 320px)` (`dist/easing.js:342`); without an inline-size container ancestor, `cqi` resolves against the small-viewport container and the canvas would size off the **viewport**, not the pane. The comment (`:157-160`) names the mechanism precisely and the declaration delivers it. A non-obvious correctness that most consumers of a `cqi`-sized primitive would miss. *(The irony noted at D-4 — that this same containment is what guarantees the vendor's `lg:` overflow gets clipped rather than widening the pane — does not diminish the declaration; it indicts the vendor's media query.)* *Falsifier: show `38cqi` resolves identically without the container (it does not — with no inline-size container it falls back to the small-viewport size).*

### S-C · Contrast computed and **passing** in both schemes
The only colour decision the panel makes is `text-muted-foreground` on the pane surface. Computed from tokens (`glass-ui/dist/styles/tokens/`), WCAG 2.x relative luminance:

| scheme | foreground | background | L₁ | L₂ | ratio |
|---|---|---|---|---|---|
| light | `--muted-foreground` = `--neutral-5` = `hsl(30 22% 40%)` | `--card` = `hsl(30 85% 96%)` | 0.1440 | 0.9222 | **5.01 : 1** |
| dark | `--neutral-5` = `hsl(34 14% 62%)` | `--card` = `hsl(26 22% 17%)` | 0.3589 | 0.0253 | **5.43 : 1** |

Both clear AA normal text (4.5:1) and comfortably clear the 3:1 non-text floor (WCAG 1.4.11) that governs the icon-only back button, whose sole affordance is its glyph. **No colour-only defect exists on this component** — a real result, not an absence of looking. *Falsifier: show the panel renders over a different surface token (e.g. a glass wash with a lower effective luminance) — the glass layers would shift the background, and a live sample could move these figures; marked decidable-from-tokens, not measured.*

### S-D · Reduced-motion honesty is complete, by inheritance and by omission
The panel adds **no ungated motion**: its only transition is `transition-colors` (`:18`, colour-only, in the PRM-safe property list), and `:playback="false"` (`:38`) silences the vendor's one-shot rAF travel clock outright. The host's `grid-template-rows` collapse (`ChannelOptions.vue:559`) is neutralised globally by glass-ui's PRM policy:

```css
/* glass-ui/dist/styles/utilities/a11y-overrides.css */
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
  *:not([data-allow-motion]) { transition-duration: .1s !important;
                               transition-property: opacity, color, background-color, border-color, box-shadow !important; }
}
```

`grid-template-rows` is excluded from the forced property list, so the collapse snaps under PRM. The vendor's own travel clock is separately PRM-aware (`dist/easing.js:90-95` — jumps straight to `progress = 1`). Nothing here is motion-dishonest. *Falsifier: find an animation or transition originating in this component that survives PRM.*

### S-E · The flat `--kf-*` namespace hazard does not bite here
lane-frontend.md §"No `--kf-*` namespace exists" (:441) flags the demo's unprefixed tokens sharing a flat global namespace with glass-ui's as "a collision surface worth a lane of its own." **This component contributes zero surface to it**: it declares no custom property, defines no colour, and its one scoped rule sets only `container-type`/`container-name` on a demo-owned class. Every visual value it uses is a glass-ui token or utility. If the hazard is ever remediated, this file needs no migration. *Falsifier: find a `--` declaration or a raw colour/length literal in `TimingFunctionPanel.vue` — there is none.*

---

## 6. Contradictions with the hitherto corpus

- **Extends S-1 into a class (propose S-9).** lane-frontend.md scoped the stale-4.0.1-rationale problem to `KfPillTabs` (:264-307). The tree shows it is a *pattern*: `TimingFunctionPanel.vue:25-31` and `EasingSidebar.vue:16-21` carry the same "glass-ui 4.0.1's modelValue is emit-only" claim, void against installed 7.0.0 (§0), and it is load-bearing for two BLOCKERs here. The census's remediation list (:613-617) should gain a row for the 4.0.1-era workaround audit across all 42 glass-consuming files, not just the tab fork.
- **No contradiction on F-1.** The phantom-dependency finding is orthogonal to this audit and is neither confirmed nor challenged here; all vendor evidence above is read from the installed `node_modules/@mkbabb/glass-ui@7.0.0` artifact, which is exactly the tree F-1 says is unreproducible. If F-1 is fixed by pinning a version **other than 7.0.0**, D-1/D-2's remedy (the `modelValue` seam) must be re-verified against that pin.
- **Refines the roster row (:217).** `| 166 | TimingFunctionPanel.vue | G | easing editor — EasingPicker + Button |` is accurate; ~55 of those 166 lines are workaround scaffolding that the installed vendor makes unnecessary, so the effective component is ~110 lines.

---

## 7. Non-defects verified (recorded so they are not re-raised)

| checked | verdict |
|---|---|
| `kind` could be `undefined` / `step-start` → wrong title + wrong mode at `:14`/`:34` | **NOT a defect.** The host gates on `showDetailPanel` → `isDetailTimingFunction` → `DETAIL_TIMING_FUNCTIONS = {"cubic-bezier","steps"}` (`useTimingFunctionEditor.ts:58-65`, `animationDescriptions.ts:51`). Only those two kinds reach the panel. |
| Vendor utility classes (`lg:grid-cols-…`, `glass-card`, `text-mono-caption`) ungenerated because Tailwind ignores `node_modules` | **NOT a defect.** `glass-ui/dist/styles/index.css` ends `@source "../*.js";`, which registers `dist/easing.js`. |
| Call-site `h-auto`/`p-1` lose the cascade to unlayered vendor rules | **NOT a defect** — vendor button CSS is `@layer components`, Tailwind utilities win for `height`/`padding`. (The *effect* is still nil for a different reason — see D-8.) |
| `.panel-row` collapse animates ungated under PRM | **NOT a defect** — see S-D. |
| `text-muted-foreground` fails contrast | **NOT a defect** — 5.01:1 / 5.43:1, see S-C. |
| Lowercase visible titles (`steps`, `cubic-bézier`) break the house voice | **NOT a defect** — the peer title `advanced` (`ChannelOptions.vue:292-294`, `:341-345`) is lowercase too; it is a consistent idiom. Only the *aria-label* register breaks (D-11). |

---

**Summary — 15 defects (3 BLOCKER · 4 MAJOR · 4 MINOR · 4 INFO), 5 superlatives.**
The single highest-leverage change is one prop: passing `:model-value` (7.0.0's deep write-through seam) retires `:key`/`seedPreset`/`quadEq`/`pickerKey`/`isSeedEcho` and closes **D-1** and **D-2** together. **D-3** is one `v-if` or `inert` at `ChannelOptions.vue:303`. **D-4** needs the vendor's `lg:` breakpoint replaced with a container query, or a demo-side single-column override — it is a glass-ui-tranche forward under the standing BH/BI relay law.

# CHALLENGE-C — `demo/shell/PaneSlot.vue` — implementation audit

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context), the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## Verdict: **DEFECTIVE**

The premise holds. `PaneSlot.vue` is 129 lines of which ~35 are load-bearing, and the load-bearing
part is wrong in a way that has been shipping for at least three tranches. The component publishes a
callback contract it does not implement, and the one consumer of that contract (`App.vue`) builds
its entire imperative-handle graph on it. I measured the wrong component instance being written into
`colorPickerRef` and held there for **2 190 ms** on a live route where the ColorPicker was the
visibly-mounted pane.

Strongest defect: **PS-1** — the `onMount` ref channel cross-wires pane instances.

---

## Method / evidence base

- Full read of `PaneSlot.vue`, `usePaneRouter.ts`, `useViewManager.ts`, `viewSchema.ts`,
  `App.vue`, `usePaletteWiring.ts`, `router/index.ts`, `animations.css`, `overture.css`.
- Vue runtime source read at `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js` (v3.5.35)
  to establish when function refs actually fire.
- **8 live Playwright probes** against the dev server at `http://localhost:9000`, driving the
  shell's own `viewManager.switchView` and instrumenting `App.vue`'s pane refs with logging
  setters that capture the write stack. Scripts under the session scratchpad
  (`PS-probe1..8.mjs`); pasted output below.
- `docs/tranches/V/megatranche/audit/visual/REPORT.md` + the `safari-desktop-light/atmosphere.png`
  capture.

---

# Findings

## PS-1 — BLOCKER-adjacent (**MAJOR**) — the `onMount` ref channel writes the WRONG component instance into `colorPickerRef` / `generatePaneRef` / `gradientPaneRef` / `mixPaneRef`

### The false contract

`PaneSlot.vue:47-52` documents:

```
 * Optional mount callback. Called with the component instance on mount,
 * and with null on unmount. Provides a ref-capture path for App.vue
 * without relying on template ref auto-unwrapping.
 */
onMount?: (instance: any) => void;
```

The implementation is `PaneSlot.vue:124`:

```vue
:ref="onMount ? (el: any) => onMount!(el) : undefined"
```

**Vue does not call function refs "on mount and on unmount".** It calls them on *every patch of the
vnode*. `runtime-core.cjs.js:5475-5476`, inside `patch()`:

```js
if (ref != null && parentComponent) {
  setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
}
```

`n1 != null` (an update, not a mount) still reaches `setRef` with `isUnmount = !n2 = false`, and
`setRef` at `:1814-1815` unconditionally invokes a function ref:

```js
if (shared.isFunction(ref)) {
  callWithErrorHandling(ref, owner, 12, [value, refs]);
}
```

Note also that the "unset old ref" branch at `:1799-1813` handles only `isString(oldRef)` and
`isRef(oldRef)` — **never a function**. So a per-render inline arrow (which line 124 is) is never
retired; it simply fires again with whatever instance currently occupies the vnode.

There are three distinct entry paths, all observed in the captured stacks:
`setRef << patch`, `setRef << unmount`, and `setRef << sharedContext.activate` (the KeepAlive
re-activation path, `runtime-core.cjs.js:3611`).

### Why that breaks App.vue

`App.vue:323-332` cannot ask the callback *which* pane it is being told about, so it re-derives the
identity from a **second, independently-timed reactive source**:

```js
function onDesktopLeftMount(el: any) {
    const left = currentConfig.value.left;           // ← the INCOMING route
    colorPickerRef.value  = left === "color-picker" ? el : null;
    generatePaneRef.value = left === "generate"     ? el : null;
    gradientPaneRef.value = left === "gradient"     ? el : null;
}
```

`currentConfig` flips **synchronously** with the route. The rendered pane does not — `PaneSlot.vue:86-97`
deliberately trails it by one animation frame, and the incoming pane is usually a
`defineAsyncComponent` chunk on top of that. So during the whole trail window,
`onDesktopLeftMount` is handed the **outgoing** instance and files it under the **incoming**
pane's name.

### Reproduction (measured, live)

`PS-probe4.mjs` — wraps each pane ref's `value` setter, logs `(t, key, value, stack)`, then drives
six ordinary view switches through `viewManager.switchView`. Verbatim rows:

```
SWITCH MARKS: 344ms->generate  1625ms->picker  2907ms->gradient  4302ms->mix  5586ms->atmosphere  6868ms->picker

t=  372ms generatePaneRef  := ColorPicker   | onDesktopLeftMount (App.vue:136) << _mergeProps.ref (demo/shell/PaneSlot.vue:131) << setRef << patch
t=  499ms generatePaneRef  := GeneratePane  | onDesktopLeftMount (App.vue:137) << _mergeProps.ref (demo/shell/PaneSlot.vue:131) << setRef << patch
t= 1646ms colorPickerRef   := GeneratePane  | onDesktopLeftMount (App.vue:136) << _mergeProps.ref (demo/shell/PaneSlot.vue:131) << setRef << patch
t= 1651ms colorPickerRef   := ColorPicker   | onDesktopLeftMount (App.vue:136) << _mergeProps.ref (demo/shell/PaneSlot.vue:131) << setRef << patch
t= 2935ms gradientPaneRef  := ColorPicker   | …
t= 2936ms gradientPaneRef  := GeneratePane  | …
t= 4210ms gradientPaneRef  := GradientPane  | …
t= 4327ms colorPickerRef   := GradientPane  | …          ← /#/mix, left === "color-picker"
t= 6517ms colorPickerRef   := GeneratePane  | …          ← NEXT write, 2190 ms later
```

Measured holdings of a **wrong** instance:

| window | ref | held | duration | route during the hold |
|---|---|---|---|---|
| t=372 → 499 | `generatePaneRef` | `ColorPicker` | **127 ms** | `/#/generate` (async chunk in flight) |
| t=1646 → 1651 | `colorPickerRef` | `GeneratePane` | 5 ms | `/#/` |
| t=2935 → 4210 | `gradientPaneRef` | `ColorPicker`, then `GeneratePane` | 1 275 ms | `/#/gradient` |
| **t=4327 → 6517** | **`colorPickerRef`** | **`GradientPane`** | **2 190 ms** | **`/#/mix`, ColorPicker visibly mounted in the left pane** |

A second run (`PS-probe2.mjs`, per-frame sampling) independently caught the same class:

```
--- SWAP generate -> picker ---
  t= 166ms #/ | left=color-picker | pickerRef=ColorPicker …
  t= 363ms #/ | left=color-picker | pickerRef=GeneratePane …    ← and still GeneratePane
--- SWAP picker -> gradient ---
  t=  54ms #/ | left=color-picker | pickerRef=GeneratePane …    ← ≥900 ms later, uncorrected
```

And a burst case — **four wrong instances into one ref in 6 ms** (`PS-probe4.mjs`, second run):

```
t= 6524ms colorPickerRef := AuroraPane
t= 6525ms colorPickerRef := GeneratePane
t= 6526ms colorPickerRef := GradientPane
t= 6529ms colorPickerRef := null
t= 6530ms colorPickerRef := ColorPicker
```

### Consequence — the guards downstream are truthy-only, not type-safe

Every consumer of `colorPickerRef` guards `null` and nothing else:

- `usePaletteWiring.ts:66-67`
  ```ts
  if (colorPickerRef.value) {
      colorPickerRef.value.onPaletteApply(colors);   // TypeError on a GradientPane
  ```
- `usePaletteWiring.ts:44-47 / 117` — `whenColorPickerReady`'s only predicate is `if (picker)`, then
  `picker.onStartEdit(target)`. It is entered on a **50 ms `setTimeout`** (`:115`) fired immediately
  after a `switchView("palettes")` — i.e. aimed squarely into the trail window.
- `App.vue:41-42` — `colorPickerRef?.commitEdit()` / `?.cancelEdit()` — the `?.` guards the ref,
  not the method.
- `usePaneRouter.ts:156-157` — `deps.colorPickerRef()?.commitEdit()`, same shape.
- `App.vue:38` — `:action-bar="colorPickerRef?.actionBarContext ?? null"` → the picker's dock action
  bar silently **disappears** for the whole hold window.

I did **not** observe the TypeError in-page (attempts under 20× CPU throttling, `PS-probe7.mjs`,
stretched the composable's own 50 ms timer past the window rather than into it). The wrong instance
is measured; the throw is the arithmetic consequence of these unguarded call sites. Severity is
therefore MAJOR and not BLOCKER — but the 2 190 ms hold shows the window is not "one frame", and it
widens with chunk latency and main-thread pressure.

### Directly-observed wrong behaviour (no inference needed)

`PS-probe5.mjs`, `colorPickerRef` timeline after `generate → palettes`:

```
=== colorPickerRef timeline, generate -> palettes (4ms sampling) ===
0ms=null  |  75ms=ColorPicker
```

For **75 ms** the ref is `null`, and `usePaletteWiring.ts:65-73` has a *masking fallback* for exactly
that state:

```ts
emitApply: (colors: string[]) => {
    if (colorPickerRef.value) {
        colorPickerRef.value.onPaletteApply(colors);
    } else {
        const first = colors[0];
        if (first === undefined) return;
        applyColorString(first);          // ← ONE colour instead of the palette
    }
},
```

Switch to Palettes and click a palette inside that window — a completely ordinary gesture — and you
silently get **one colour applied instead of the whole palette**, with no error and no signal.

### Mechanism (one sentence)

`PaneSlot` forwards Vue's raw function-ref channel — which fires on every patch, on cached-pane
re-activation, and on deactivation — as if it were a mount/unmount event, forcing its consumer to
re-derive pane identity from a *different* clock (`currentConfig`) than the one `PaneSlot` renders
on (`liveKey`, deliberately one rAF behind).

### Cure (architectural, not a patch)

Kill the imperative callback. `PaneSlot` already knows exactly which key it has committed —
`liveKey`. Two idiomatic Vue 3.5 options, both smaller than what is there now:

1. **Report the key with the instance.** `onMount?: (instance: unknown, key: string) => void`,
   invoked as `onMount(el, liveKey.value)`. `App.vue` then switches on the *reported* key, which is
   the key of the instance it was handed, and cross-wiring becomes structurally impossible.
2. **Better — invert it.** `PaneSlot` owns `const live = shallowRef<unknown>(null)` set from the ref
   callback and `defineExpose({ instance: live, key: liveKey })`. `App.vue` derives
   `colorPickerRef = computed(() => leftSlot.value?.key === "color-picker" ? leftSlot.value.instance : null)`.
   One source of truth, no reactive writes during the patch phase, and the three separate
   `generatePaneRef`/`gradientPaneRef`/`mixPaneRef` God-refs collapse into one derivation.

Option 2 also removes the reason the comment at `PaneSlot.vue:8-10` gives for the whole callback
existing ("without fighting Vue's template-ref auto-unwrapping rules") — that fight was lost, and
this is what it cost.

---

## PS-2 — MAJOR — `PaneSlot`'s `<KeepAlive>` keeps deactivated panes' `window` keydown listeners live app-wide

The seat asked for a census. Here it is.

`grep -rnE "addEventListener|useEventListener|onKeyStroke|window\.on|document\.on|onActivated|onDeactivated" demo/shell/`
→ **ZERO matches.** `PaneSlot` and the entire `demo/shell/` tree (including `dock/`) register no
global listeners of their own. That is a clean negative.

But `PaneSlot.vue:120` is the `<KeepAlive :max="max">` that makes its *children's* listeners
immortal. Full `demo/` census — 12 global registrations:

| file:line | event | inside a KeepAlive'd pane? | teardown hook |
|---|---|---|---|
| `demo/picker/ColorPicker.vue:377` | `window keydown` | **YES** (left pane, 4 views) | `onUnmounted` |
| `demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:239` | `window keydown` | **YES** (inside ExtractPane) | `onBeforeUnmount` |
| `demo/picker/composables/usePointerDebug.ts` ×6 | pointer/touch, capture | YES (dev-gated) | — |
| `demo/picker/controls/ComponentSliders/composables/useSliderTouchGates.ts` | `document pointercancel` | YES | — |
| `demo/color-picker/composables/useDevicePixelSnap.ts:83-85` | `window resize`, `document transitionend/animationend` capture | **NO** — App setup, never deactivated | ok |
| `demo/color-picker/composables/boot/useAtmosphere.ts:298-301` | canvas `webglcontextlost/restored` | NO — element-scoped | ok |

`onUnmounted` / `onBeforeUnmount` **do not fire on KeepAlive deactivation** — `runtime-core.cjs.js:6595-6598`
returns into `parentComponent.ctx.deactivate(vnode)` before any unmount hook path. So:

`ColorPicker.vue:249-266` stays bound on every route where the picker is *not* rendered
(`browse`, `extract`, `generate`, `gradient`, `atmosphere`, and all five `admin-*` views):

```ts
const handleKeydown = (e: KeyboardEvent) => {
    if (isEditing.value) {
        if (e.key === "Escape") { e.preventDefault(); cancelEdit(); return; }
        if (e.key === "Enter")  { e.preventDefault(); commitEdit(); return; }
    }
    if (keys.cmd?.value && keys.k?.value) {
        e.preventDefault();
        selectedColorSpaceOpen.value = !selectedColorSpaceOpen.value;
    }
};
```

This corroborates the sibling seat's Cmd+K finding and extends it: **`Escape` and `Enter` are also
swallowed** — with `preventDefault()` — by an invisible, deactivated ColorPicker whenever an edit was
left open, and simultaneously by a deactivated `ImageEyedropper` (`:226-235`, also `Escape`). Two
off-screen panes and one on-screen pane can all claim the same `Escape` on `/#/generate`.

**Mechanism.** `PaneSlot` adopts `<KeepAlive>` for scroll/state preservation but publishes no
contract that cached panes must gate their global effects, and does nothing itself to enforce one.
`onUnmounted` is the wrong hook under `KeepAlive`, and nothing in the shell says so.

**Cure.** `PaneSlot` is the only `<KeepAlive>` in the app; it should own the invariant. Either
(a) document + enforce that every pane rendered through the slot uses `onActivated`/`onDeactivated`
for global listeners (a one-line addition to the header contract plus the two-file fix in
`ColorPicker.vue` / `ImageEyedropper.vue`), or (b) better, provide the cached-pane liveness through
an injected `isPaneActive` ref off `liveKey` so panes gate declaratively instead of by lifecycle
archaeology.

---

## PS-3 — MAJOR — the rAF mount-trail is not gated on `prefers-reduced-motion`, so its own justification is false under PRM

`PaneSlot.vue:86-97`:

```ts
watch(() => componentKey, (key) => {
    cancelAnimationFrame(raf);
    if (!transitionName) { commit(key); return; }        // the ONLY gate
    raf = requestAnimationFrame(() => commit(key));
});
```

The header (`:65-73`) justifies the deferral as landing the mount *"under cover of the enter
transition"*. Under `prefers-reduced-motion: reduce`, `demo/styles/animations.css:184-192` sets

```css
*, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
}
```

so **there is no cover**. But `App.vue:87/106/132` passes `:transition-name="viewManager.ready.value ? 'vj-enter' : ''"`
regardless of PRM, so `transitionName` is truthy and the frame is still burned. App already computes
`prmInstant` (`App.vue:302`, from `useDockArrival`) and never passes it down.

**Measured** (`PS-probe6.mjs`, latency from `switchView()` to the incoming pane element appearing in
`.pane-wrapper--left`):

```
B.  motion:normal                     generate->picker: 109.2ms   picker->generate: 85.2ms   gradient->picker: 83.7ms
B'. prefers-reduced-motion:reduce     prmInstant=true   generate->picker: 106.3ms   picker->generate: 58.6ms
```

Statistically indistinguishable. A PRM user sees **58–106 ms of the OLD pane** after the dock and the
URL have already flipped, with no cross-fade to explain it — the exact "stranded on a stale pane"
percept the R.W3 note (`:12-23`) was written to prevent.

**Reproduction:** `PS-probe6.mjs`, contexts `{}` vs `{ reducedMotion: "reduce" }`, output above.

**Cure:** the gate at `:90` should be the honest predicate, not a string test. Take
`instant?: boolean` (App already has `prmInstant`) or read the media query in the component:
`if (!transitionName || matchMedia("(prefers-reduced-motion: reduce)").matches) { commit(key); return; }`.
KISS; no new module.

---

## PS-4 — MAJOR — the ref channel fires per reactive tick: **360 pane-ref writes for 180 colour updates and zero view changes**

`App.vue:90 / 109 / 135` pass an inline arrow as a *prop*:

```vue
:on-appeared="(el: Element) => overture.noteLeftPlateSettled(el)"
```

`v-bind:on-appeared` is **not** a `v-on` handler, so the compiler's `cacheHandlers` transform does
not apply — a fresh function identity is produced on every `App.vue` render. `shouldUpdateComponent`
therefore returns `true` for `PaneSlot` on *every* App render, `PaneSlot` re-renders, the inner
`<component>` vnode is re-patched, and PS-1's per-patch ref fires.

**Measured** (`PS-probe6.mjs`, section A) — 180 colour-model writes at 1/frame, no route change:

```
A. ref-callback churn on 180 model writes (no view change): {"refWrites":360,"frames":180,"ms":13675}
```

**360 writes. The correct number is 0** — nothing about pane identity changed. Each write is a
reactive `Ref.value` assignment executed *during the patch phase*, which re-triggers `App.vue`'s
render effect (its template reads `colorPickerRef?.actionBarContext` at `:38`). It does not loop only
because the value happens to settle.

`overture.noteLeftPlateSettled` is idempotent (`useOverture.ts:206-207`, `if (b3.value) return`), so
nothing downstream corrupts — this is pure waste plus the PS-1 hazard surface.

**Cure.** Hoist the `onAppeared` arrows in `App.vue` to stable `const` handlers (three lines), and
implement PS-1's option 2 so the ref channel writes at most once per genuine commit.

---

## PS-5 — MINOR — the `component` prop is never watched; a `component` change with a stable `componentKey` is silently ignored forever

`PaneSlot.vue:86` watches `componentKey` alone. `commit()` (`:80-84`) is the *only* writer of
`liveComponent`, and the setup-time seed `shallowRef(component)` (`:74`) is the only other value it
ever holds. The props contract (`:38-44`) declares `component` and `componentKey` as **independent**
props with no stated co-variance requirement.

Today `usePaneRouter.componentFor()` is a pure function of the key, so the two always change
together and the hole is unreachable. It is one route-table edit away from being a silent
never-updates bug with no error.

**Reproduction: NONE — this is a hypothesis.** Evidence is structural: `PaneSlot.vue:86` vs `:38-44`.

**Cure:** `watch(() => [componentKey, component], …)`, or state the co-variance invariant in the prop
docblock and enforce it by taking a single `slot: PaneSlot` object prop (the shape
`usePaneRouter.ts:61-65` already exports) instead of three parallel props.

---

## PS-6 — MINOR — dead default, `any` in the public prop surface, and a lying non-null assertion

- `PaneSlot.vue:32` — `max = 5`. All three call sites pass `:max` explicitly (`App.vue:88` = 9,
  `:107` = 6, `:133` = 4). The default is unreachable and misstates the cache policy to any reader.
- `PaneSlot.vue:52` — `onMount?: (instance: any) => void`. `any` in a *public prop type*; the entire
  imperative-handle graph of the app flows through it untyped. `App.vue:317-332` then propagates it:
  `ref<any>(null)` ×3, `function onDesktopLeftMount(el: any)`. PS-1 is precisely the bug this `any`
  was hiding.
- `PaneSlot.vue:124` — `onMount ? (el: any) => onMount!(el) : undefined`. Under reactive props
  destructure both `onMount` reads compile to `__props.onMount`; the guard and the call are two
  *independent* reads, and `!` asserts a fact the first read established. Cosmetic, but it is exactly
  the class of assertion that exists to silence a check the code has not actually made.

**Cure:** drop the default (make `max` required — the cache size is a real decision per slot, not a
fallback); type the channel properly once PS-1's option 2 lands (`ShallowRef<ComponentPublicInstance | null>`);
the assertion disappears with the inline arrow.

---

## PS-7 — MINOR — stale documentation asserting a transition mode the component explicitly forbids

- `demo/DESIGN.md:278` — "per-slot `<Transition>` in `panes/PaneSlot.vue`". The file is at
  `demo/shell/PaneSlot.vue`; `demo/panes/` does not exist.
- `e2e/smoke/mobile/walk.spec.ts:50` and `:56` both document the pane swap as
  `Transition mode="out-in"`, and `:56-60` uses that claim to justify raising the spec's timeout to
  60 s. `PaneSlot.vue:12-23` states at length that `out-in` **breaks under vite dev** and that the
  default simultaneous mode is deliberate ("KEEP simultaneous mode (the fceed47 cure stands)",
  `:73`). The e2e docblock is describing a mode that has not existed since R.W3.

A 60 s timeout justified by a fiction is a gate that cannot fail for the right reason.

---

## PS-8 — INFO — masking fallback in the router table (edict 2)

`usePaneRouter.ts:93-94`:

```ts
if (name.startsWith("admin-")) return AdminPane;
return ColorPicker;                 // ← any unknown slot name renders the picker
```

Compounded by `useViewManager.ts:43-46` (`isViewId(name) ? name : "picker"`). The visual REPORT row
for `/#/does-not-exist` shows **859 text chars desktop / 70 mobile — byte-identical to `/#/`** and
`canvas: 2`, i.e. the picker view rendered under a bogus URL. In practice the router's catch-all
(`router/index.ts:38`) redirects first, so this is unreachable today — but it is two independent
silent fallbacks stacked on the same unknown-name case, where a thrown error or a real 404 pane is
the honest behaviour. Owner edict 2 (no masking fallbacks).

---

## PS-9 — MINOR (a11y as implementation) — a wholesale `<main>` content replacement with no announcement, no busy state, no focus contract

`PaneSlot.vue:111-129` is the entire template. It renders **no wrapper element**, no `role`, no
`aria-live`, no `aria-busy` — the pane component is dropped straight into the DOM under
`<main aria-label="Color tool panes">` (`App.vue:47`).

**Measured** (`PS-probe6.mjs`, section C — after a `switchView("gradient")`):

```
C. a11y after view swap: {"liveRegionsInMain":1,"mainHasBusy":false,
                          "paneWrapperRoles":["(none)","(none)"],
                          "focusMoved":false,"activeAfter":"BODY/…"}
```

An assistive-tech user activates a dock item, the entire main region is replaced, and nothing is
announced: no live region owned by the shell, no `aria-busy` during the 58–109 ms swap (PS-3), no
focus move, no `tabindex="-1"` landing target. Focus stays where it was; the content underneath it
is now a different application view.

**PaneSlot's contribution to the REPORT's measured defect counts is zero** — it renders no buttons
and no interactive elements, so none of the 60 `smallTapTargets` or 18 `namelessButtons` rows are
its. That is an honest negative. Its a11y defect is the *absence* of a swap contract, not a bad
control.

**Cure (root-level, per edict 5):** the swap announcement belongs on the one component that owns the
swap. Add `aria-busy` bound to "committed key ≠ incoming key" and a shell-owned polite live region
naming the arrived pane (`currentConfig.leftLabel` / `rightLabel` already exist in
`viewSchema.ts:72-74` and are currently unused for this). Do not add a wrapper `<div>` — bind on the
existing `.pane-wrapper` in `App.vue`.

---

# Test truth — the gate is vacuous

```
$ find test demo/test -name "*.test.ts" | wc -l
      25
```

**Not one of the 25 touches `demo/shell/`.** There is no test for `PaneSlot.vue`,
`usePaneRouter.ts`, `useViewManager.ts`, or `viewSchema.ts`.

E2E coverage of the `onMount` channel — the sole reason the `onMount` prop exists:

```
$ grep -rn "Regenerate|copyColors|seedFromPalette|clearSelection" e2e/
e2e/smoke/oracles/o20-generate-plate.spec.ts:33:  const regen = plate.getByRole("button", { name: "Regenerate" });
```

That is the **in-pane** plate button, reached directly. The dock action bar — the path that goes
`DockAction.handler → paneRefs.generate.value?.regenerate?.()` (`usePaneRouter.ts:196`) — is never
exercised by any spec. Every handler on that path is optional-chained twice
(`?.value?.method?.()`), so a cross-wired or null ref is a **silent no-op**, not a failure.

### Exact mutations that keep every gate green

1. **Delete `PaneSlot.vue:65-108` entirely** (the `liveComponent`/`liveKey`/`liveProps` triplet, both
   watchers, the rAF, the `onBeforeUnmount`) and bind
   `:is="component" :key="componentKey" v-bind="componentProps"` directly. All 25 unit tests pass
   (they never load the file); every e2e spec passes (Playwright auto-retries on visibility, and the
   swap gets *faster*). The entire S.W3 "pane-swap payload" optimisation is unprotected.
2. **Delete `PaneSlot.vue:124`** (the `:ref` binding) so `onMount` is never called. All 25 unit tests
   pass. `e2e/smoke/mobile/walk.spec.ts`, `e2e/smoke/walk.spec.ts`, `admin-walk.spec.ts`, and
   `o20-generate-plate.spec.ts` all pass — none of them touch the dock action bar, and `commit-edit`
   / `cancel-edit` are `?.`-guarded into silence. The dock's picker action bar and all three
   workbench action bars die completely, undetected.
3. **Invert the mapping in `App.vue:325-327`** (`left === "generate" ? el : null` for
   `colorPickerRef`). Green everywhere.

Mutation 2 is the one that matters: it means **PS-1 could not have been caught by this repo's gates
in any form**, because the channel it corrupts is untested end to end.

---

# Negative proofs — what I checked and found sound

These were the local hazards named for this seat. Each was checked and is clean *in this file*:

- **`defineModel()` stale-read** — `PaneSlot` uses none. Its three mirrors (`:74-76`) are already
  `shallowRef`/`ref`, which is the prescribed cure applied correctly.
- **`verbatimModuleSyntax`** — `PaneSlot.vue:25` uses the inline `type Component` modifier. Compliant.
  Same for `usePaneRouter.ts:12-19` and `useViewManager.ts:1-12`.
- **rAF leak** — `:78` `let raf = 0`; `:89` cancels before rescheduling; `:108`
  `onBeforeUnmount(() => cancelAnimationFrame(raf))`. It is a one-shot, not a PRM-RAF-epidemic loop,
  and it is cancelled on both paths. `PaneSlot` is never itself inside a `<KeepAlive>`
  (`App.vue:77-137` mounts it under `v-if`/`v-else`), so `onBeforeUnmount` is the right hook here.
- **`ValueUnit` nesting / oklch→HSV `stableHue`** — `PaneSlot` touches no colour value.
- **`parseCssColor` crash class** — `PaneSlot` parses nothing.
- **reka-ui pointer-capture leak** — no pointer handling.
- **WebGL on the critical path** — `PaneSlot` boots no context. The one
  `consoleErrors` row in the visual REPORT (`safari-desktop-light /#/: WebGL: context lost`,
  settle 18 905 ms) belongs to the hero blob, not here.
- **`<component :is="null">`** — I expected a dev warning on `/#/atmosphere` (right pane is `null`,
  `usePaneRouter.ts:168-175`). There is none: the compiler emits `resolveDynamicComponent`, which
  maps `null` to `NULL_DYNAMIC_COMPONENT`, and `createVNode` converts that to a `Comment` on the
  *non-warning* branch. Verified live — `PS-probe2.mjs` walked `atmosphere` and captured zero Vue
  warnings. Hypothesis killed.
- **Global listeners in `demo/shell/`** — zero (grep pasted in PS-2). The shell itself leaks nothing;
  PS-2 is about what its `<KeepAlive>` preserves in its children.
- **`overture` re-entrancy** — `noteLeftPlateSettled` (`useOverture.ts:206-207`) and
  `noteDockLanded` (`:200-203`) are both idempotent, so PS-4's re-render churn cannot re-open a beat.
- **Visual rendering** — `shots/safari-desktop-light/atmosphere.png` read directly: the single-pane
  (`right: null`) layout renders correctly, card centred, ghost pane correctly out of flow via
  `App.vue:403-409`. No visual defect attributable to the slot. REPORT: 0 blankOrNearBlank,
  0 horizontalOverflow, 0 mainCountNotOne across all 60 captures.
- **`<Transition>`/`<KeepAlive>` nesting order** — `:112-127` is `Transition > KeepAlive > component`,
  which is the order Vue requires. Correct.
- **Rapid-swap coalescing** — the `cancelAnimationFrame(raf)` at `:89` plus `commit()` reading
  `component`/`componentProps` live (not captured) genuinely does make A→B→C mount only C. That part
  of the design works as documented.

---

# Defect summary

| id | severity | defect | mechanism family |
|---|---|---|---|
| PS-1 | MAJOR | `onMount` ref channel cross-wires pane instances (2 190 ms measured hold) | identity re-derived from a different clock than the render |
| PS-2 | MAJOR | `<KeepAlive>` keeps deactivated panes' `window keydown` alive (Cmd+K, Escape, Enter) | wrong lifecycle hook under KeepAlive; no slot-owned contract |
| PS-3 | MAJOR | rAF mount-trail not PRM-gated; 58–106 ms stale pane with no cover | motion gate keyed on a string instead of the motion preference |
| PS-4 | MAJOR | 360 pane-ref writes per 180 colour ticks, 0 view changes | inline arrow *prop* defeats `shouldUpdateComponent`; per-patch ref |
| PS-5 | MINOR | `component` prop never watched (hypothesis) | two co-varying props, one watcher |
| PS-6 | MINOR | dead `max = 5` default, `any` in the public prop surface, lying `!` | untyped imperative channel |
| PS-7 | MINOR | DESIGN.md path + e2e docblock assert `mode="out-in"`, which is forbidden | doc drift justifying a 60 s timeout |
| PS-8 | INFO | `componentFor` masking fallback to `ColorPicker` | edict 2 |
| PS-9 | MINOR | main-content swap with no announcement / busy / focus contract | a11y absent from the swap owner |

PS-1 and PS-4 are one family: the raw Vue function-ref channel is exposed as a domain event.
Fixing PS-1 by inversion (option 2) retires PS-4 and PS-6 with it.

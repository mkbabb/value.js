claude-opus-5[1m]

# CHALLENGE · `KfPillTabs` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/KfPillTabs.vue` (124 lines)
**Read whole, read-only**: the SFC + its one import `KfPillTabs/useKfPillTabs.ts` (93 lines) + every transitive consumption seam
(`channel-controls/ChannelControls.vue`, `transport/index.ts`, `transport/composables/useKfPillTabs.ts`,
`channel-controls/composables/useTabStripScroll.ts`, `AnimationControlsGroup/useControlsKeyboardShortcuts.ts`,
`@state/controlSurfaces.ts`, `components/instrument/surfaceTabs.ts`, `test/demo/instrument/KfPillTabs.test.ts`) and the
installed glass-ui 7.0.0 dist (`node_modules/@mkbabb/glass-ui/dist/{tabs.js,keyboard.js,components/tabs/*.d.ts,styles/**}`).
**No browser tooling.** Every visual-magnitude claim is marked `UNPROVEN-NEEDS-LIVE`; every structural claim is source-derived.

**Posture**: assumed DEFECTIVE until the tree proved otherwise. It did not prove otherwise — but it also earned five
genuine superlatives, recorded below at the same evidentiary standard (L-18 runs both ways).

**Tally**: 16 defects — **1 BLOCKER**, 5 MAJOR, 8 MINOR, 2 INFO — and **5 superlatives**.

---

## 0. Headline

| id | sev | claim |
|---|---|---|
| **D-1** | **BLOCKER** | Arrow/Home/End keydowns propagate to the window shortcut registry: every keyboard traversal of the strip **also scrubs the animation playhead**; `End` jumps t→1. |
| D-2 | MAJOR | `Space` on a focused tab is swallowed by the global play/pause shortcut — the native button activation is `preventDefault`ed away. |
| D-3 | MAJOR | The fork's **entire** documented rationale (both halves) is void against the installed glass-ui 7.0.0. 217 lines exist for a bug and a semantics gap that both shipped fixed. |
| D-4 | MAJOR | `glass-wash` is welded into the root with no opt-out; the sole consumer wraps it in another `glass-wash` → nested plate, blur, border, rim, `contain:paint`. |
| D-5 | MAJOR | Zero `aria-controls` / `aria-labelledby` anywhere: the tab↔tabpanel association is entirely absent, against the file's own "complete WCAG contract" claim. |
| D-6 | MAJOR | Phantom-dep exposure (F-1) bites here: the fork traded a **loud build-time JS** dependency on glass-ui for a **silent runtime CSS** one — 7 of 8 custom properties + `.glass-wash` are glass-ui-owned. |
| D-7 | MINOR | `transition: font-weight` 500→600 on a **variable** face (200–800) — 200 ms of continuous glyph-advance relayout of the whole strip per selection; not PRM-gated while 8 sibling demo components are. |
| D-8 | MINOR | `:41–42` documents a re-export that **cannot exist** (`<script setup>` forbids ES exports) and that no consumer uses. |
| D-9 | MINOR | The selection guard is written three times and the SFC's own `select()` is bypassed on the keyboard path. |
| D-10 | MINOR | `transport/index.ts:12` — dead `defineAsyncComponent` export, zero consumers; the one real consumer static-imports. |
| D-11 | MINOR | The 4-line re-export shim + the incoherent split import at `ChannelControls.vue:229–230`. (Confirms lane-frontend §7.3; **contradicts** its headline F-5 count.) |
| D-12 | MINOR | `KfPillTabOption` silently narrows `SegmentedTabOption`/`ControlSurfaceTab`: `icon` (live on **every** built-in tab) and `tooltip` are structurally accepted, then dropped. |
| D-13 | MINOR | The `disabled` branch is unreachable in-tree, and its `selected ∧ disabled` state is internally inconsistent and untested. |
| D-14 | MINOR | `focusTab` hard-codes "tabs are direct children of `currentTarget.parentElement`" — an undocumented host contract on a composable exported at two public paths. |
| D-15 | INFO | `:aria-orientation` is emitted **unconditionally** — valid here, but it is the same shape of emission the header block condemns three lines above it. |
| D-16 | INFO | Adjacency: two live `SURFACE_META` registries feed this strip's options, each claiming to be "THE ONE". |

| id | superlative |
|---|---|
| S-A | Getter-thunk composable params — the correct Vue 3.5 reactive-destructure cure; the demo's own named reference pattern. |
| S-B | `rovingValue` falls back to first-enabled — the strip can never become Tab-unreachable. |
| S-C | Narrow, named transition channel list; `all` explicitly refused and commented. |
| S-D | Zero teardown surface by construction — the leak class does not exist here. |
| S-E | A real interaction gate (live `activeElement`, dispatched `KeyboardEvent`s, recorded BITE), not a source-shape gate. |

---

## 1. **D-1 — BLOCKER** · keyboard traversal of the strip mutates animation state

### The claim

`useKfPillTabs.ts:84` calls `e.preventDefault()` and **never** `e.stopPropagation()`. The event bubbles to `window`, where
glass-ui's shortcut registry dispatches it a second time. On the exact screens where this strip renders, the registry has
`ArrowLeft`, `ArrowRight`, `Home` and `End` bound to **playhead scrubbing**.

### The chain, fully resolved

```
useKfPillTabs.ts:84          e.preventDefault();            ← no stopPropagation, anywhere in the file
                             (grep -rn "stopPropagation" demo/components/instrument/transport/ → 0 hits)

glass-ui dist/keyboard.js    a(window, "keydown", e => _(t, "keydown", e))
                             ^ useEventListener(window, …) — bubble phase, document-global

glass-ui dist/keyboard.js    function _(e, t, n) {
                               for (let e of r)
                                 if ((e.options.event ?? "keydown") === t
                                     && d(n, e.combo)
                                     && !(!e.options.allowInInput && f(n.target))) {
                                   e.options.preventDefault && n.preventDefault(), e.handler(n); return;
                                 }
                             }
                             ^ NO `n.defaultPrevented` check anywhere in the dispatcher.

glass-ui dist/keyboard.js    function f(e) {                 ← the "editable-target skip"
                               let t = e.tagName;
                               return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT"
                                         || e.isContentEditable || e.closest(".monaco-editor"));
                             }
                             ^ a <button role="tab"> matches NONE of these → not skipped.
```

And the bindings:

```
AnimationControlsGroup/useControlsKeyboardShortcuts.ts:53  registerShortcut("ArrowLeft",  () => scrubActive(getActiveT() - 0.01), { preventDefault: true, … })
AnimationControlsGroup/useControlsKeyboardShortcuts.ts:54  registerShortcut("ArrowRight", () => scrubActive(getActiveT() + 0.01), { preventDefault: true, … })
AnimationControlsGroup/useControlsKeyboardShortcuts.ts:57  registerShortcut("Home",       () => scrubActive(0),                   { preventDefault: true, … })
AnimationControlsGroup/useControlsKeyboardShortcuts.ts:58  registerShortcut("End",        () => scrubActive(1),                   { preventDefault: true, … })
```

Co-residency is unconditional, not incidental:

```
AnimationControlsGroup.vue:322   useControlsKeyboardShortcuts({ … })      ← top-level setup call, no guard
AnimationControlsGroup.vue:18    <ControlsPaneWrapper v-if="hasControlSurfaces" …>
ControlsPaneWrapper.vue:50       <ChannelControls …>
ChannelControls.vue:74           <KfPillTabs :options="stripOptions" … />
```

`hasControlSurfaces` is true exactly when the strip has surfaces to render, so **whenever a pill is on screen, the four
scrub shortcuts are registered on `window`.**

### The failure scenario

Scene with the built-in triad (Controls/Keyframes/Timeline). User Tabs into the strip and presses `End` to reach the last
tab. Result: focus and selection move to *Timeline* (correct) **and** `scrubActive(1)` fires — the animation jumps to its
final frame. `Home` likewise resets t→0. Each `ArrowRight`/`ArrowLeft` hop nudges t by ±0.01. The user performed a
**navigation** gesture and got a **state mutation** on the artifact under edit. On a scene mid-scrub this silently
destroys the inspected position, and there is no undo for playhead position (`Mod+Z` is bound to timeline keyframe
state, `useControlsKeyboardShortcuts.ts:70`, not to `t`).

This is the demo's own dogfooding surface corrupting the engine state it exists to demonstrate — which is why it is a
BLOCKER rather than a MAJOR.

### Why the existing gate cannot see it

`test/demo/instrument/KfPillTabs.test.ts:60–97` mounts a bespoke host via `createApp` with **no** glass-ui shortcut
registry present. The composable is driven in perfect isolation, so the collision is structurally invisible to the suite.
The test's own confidence note (`:11` "This is the T8 half a source-shape gate cannot cover: a REAL interaction test") is
accurate about focus and false about integration.

### Falsifier

This claim dies if **any** of the following is shown:
1. `registerShortcut` binds to a scoped element rather than `window` — *checked, it is `useEventListener(window, "keydown", …)`*;
2. the dispatcher `_()` skips `defaultPrevented` events — *checked, it does not read the flag*;
3. `f()` (the skip predicate) excludes `[role=tab]` or `BUTTON` — *checked, it excludes only INPUT/TEXTAREA/SELECT/contentEditable/.monaco-editor*;
4. `useControlsKeyboardShortcuts` is never invoked in a tree that renders `KfPillTabs` — *checked, `AnimationControlsGroup.vue:322` + `:18` → `ControlsPaneWrapper.vue:50` → `ChannelControls.vue:74`*;
5. some ancestor stops propagation of keydown before `window` — *checked, `grep -rn "stopPropagation" demo/components/instrument/transport/` returns nothing*.

A live keyboard trace would confirm; the source chain is complete without one.

### The shape of the fix (not applied — read-only lane)

`useKfPillTabs.onKeydown` must `e.stopPropagation()` alongside `e.preventDefault()` on the keys it consumes — a composite
widget owns its arrow axis and must not leak it. (glass-ui's own `useTabRovingFocus` should be audited for the same leak
before D-3's replacement lands; if it leaks too, the correct fix is the registry gaining a `defaultPrevented` / composite-
widget guard, which fixes every strip at once.)

---

## 2. **D-2 — MAJOR** · `Space` cannot activate a tab

`useControlsKeyboardShortcuts.ts:50`:

```
registerShortcut("Space", () => toggleAnimationGroup(), { preventDefault: true, label: "Play / Pause", group: "Playback" });
```

glass-ui's combo table (`dist/keyboard.js`) maps `space → [" "]`, so a focused `<button role="tab">` receiving `keydown{key:" "}`
matches, is not skipped by `f()` (BUTTON), and gets `preventDefault()`ed. Calling `preventDefault` on a Space **keydown**
cancels the button's default activation behaviour, so the click never fires and `KfPillTabs.vue:30 @click="select(...)"`
never runs. Pressing Space on a tab plays/pauses the animation instead of activating the tab.

Same root cause as D-1, distinct consequence and distinct fix (D-1's `stopPropagation` on arrow/Home/End does **not**
cover Space, which `onKeydown` does not currently handle at all — `useKfPillTabs.ts:82 else return;`).

Severity is MAJOR, not BLOCKER, because keyboard operability survives: selection follows focus on the arrow keys, so no
tab is unreachable. What breaks is the **native button contract** a user is entitled to expect from a `<button>`.

**Falsifier**: show that `preventDefault` on Space keydown does not suppress button activation (it does, per UI Events),
or that the registry skips BUTTON targets (it does not, `f()` above), or that `KfPillTabs` intercepts Space before the
bubble (it does not — `useKfPillTabs.ts:64–82` returns early for any key outside {axis arrows, Home, End}).

---

## 3. **D-3 — MAJOR** · the fork's rationale is void in **both** halves

`KfPillTabs.vue:2–12` is a 11-line justification block. Against the **installed** glass-ui 7.0.0 it is false twice over.

**Half one — the `aria-orientation` emission** (already established by the corpus: lane-frontend **F-2 / S-1**, RED).
`dist/tabs.js` emits `"aria-orientation": W.value ? (B.value ? "vertical" : "horizontal") : void 0` — conditional, omitted
entirely outside tablist semantics. Confirmed; no new work needed.

**Half two — the `role=tablist` design argument. This is where I CONTRADICT the corpus.**
`lane-frontend.md:613` records:

> "the fork's *secondary* claim (that a panel-switcher wants `role=tablist`, not `role=group`) is a **design** argument
> that the 7.0.0 aria fix does not by itself answer."

The tree disagrees. 7.0.0 ships a first-class prop for exactly this, and the runtime derives the roles from it:

```
node_modules/@mkbabb/glass-ui/dist/components/tabs/SegmentedTabs.vue.d.ts
  /** The interaction semantic, independent of material. `toggle` exposes a
   *  group of pressed buttons; `tabs` exposes a tablist with selected tabs. */
  export type SegmentedTabsSemantics = "toggle" | "tabs";
  semantics?: SegmentedTabsSemantics;

node_modules/@mkbabb/glass-ui/dist/tabs.js
  W = computed(() => p.semantics === "tabs" || (!p.semantics && M.value))   // M = variant === "underline"
  role: W.value ? "tablist" : "group"
  role: W.value ? "tab" : void 0
  "aria-orientation": W.value ? (B.value ? "vertical" : "horizontal") : void 0
```

`<SegmentedTabs variant="pill" semantics="tabs">` yields, verbatim, the DOM this fork hand-rolls: a `role=tablist` of
`role=tab` buttons, pill material, with `aria-orientation` emitted **only** in the tablist case. The secondary claim is
answered by a dedicated, documented prop in the copy already on disk — not left open. lane-frontend's S-1 verdict
("replace") is therefore *stronger* than it stated, and the caveat attached to recommendation #613 should be struck.

The delta the fork **loses** by not being `SegmentedTabs` is not nothing, and is worth recording as the cost of the fork:
`activation: "automatic" | "manual"`, `responsive` (below-breakpoint collapse to a `<Select>` — which is precisely what
`useTabStripScroll.ts` hand-compensates for with an overflow-fade + scroll-into-view), `motion` (PRM-aware drag/indicator
axis), an `option` slot, `icon`, and `tooltip`.

**Falsifier**: this dies if the installed dist is not what the demo resolves at build (e.g. an alias or an override
repoints `@mkbabb/glass-ui`) — grep of `vite.config.ts` aliases would settle it; or if `semantics="tabs"` fails to produce
`role=tablist` at runtime, which the computed above rules out statically. Note the fork's ARIA *correctness* is not in
dispute — D-5 below shows it is incomplete, but it is not invalid. What is void is the *rationale for forking*.

---

## 4. **D-4 — MAJOR** · `glass-wash` on `glass-wash` — the material is welded in

`KfPillTabs.vue:17` hard-codes the material on its own root:

```
class="kf-pill-tabs glass-wash"
```

Its **only** consumer wraps it in a second plate of the *same rung* (`ChannelControls.vue:56`):

```
<div v-if="!tabsExternallyManaged" ref="tabsHeaderEl"
     class="relative w-fit flex items-center justify-center flex-shrink-0 glass-wash rounded-panel px-2 py-0.5 overflow-hidden">
  … <KfPillTabs … />
```

What `.glass-wash` actually costs, per plate (`dist/styles/glass/ladder.css`, `dist/styles/glass/material.css`):

```
.glass-wash { position: relative; --glass-bg-rung: var(--glass-bg-wash);
              background: var(--glass-plate-tinted);
              -webkit-backdrop-filter: var(--glass-blur-wash); backdrop-filter: var(--glass-blur-wash);
              border: 1px solid var(--glass-border-accent);
              box-shadow: var(--glass-material-rim), var(--glass-shadow-wash); }
.glass-wash { contain: paint; }
.glass-wash::before { content:""; position:absolute; inset:0; border-radius:inherit; … }
```

So the strip renders **two** tinted plates, **two** `backdrop-filter` passes (the inner one sampling the outer's already-
composited plate — wasted GPU work whose only visual effect is a doubled tint), **two** 1px accent borders ~2px + the
wrapper's `px-2 py-0.5` apart, **two** rim/shadow stacks, **two** `contain: paint` boxes and **two** `::before` overlays.
glass-ui's own naming (`wash < quiet < resting < floating < overlay`) is a *depth ladder*; stacking the same rung on
itself is a ladder violation by construction.

The library defect is not "it looks wrong" — it is that **the component offers no way to be right**. There is no
`variant`/`plain`/`bare` prop and no `:class`-only material; a host that already owns its surface (as this one does)
cannot opt out without a `:deep()` override reaching into a scoped child.

**Falsifier**: dies if `.glass-wash` on a nested element is a no-op (it is not — the rule is unconditional, `@layer components`,
no `:not()` nesting guard), or if `ChannelControls.vue:56` never renders while `KfPillTabs` does (the pill lives *inside*
that `v-if`, so they render together or not at all). The exact visual magnitude of the double tint/rim is
`UNPROVEN-NEEDS-LIVE` and belongs to the SS-13 visual pass; the structural duplication is source-proven here.

---

## 5. **D-5 — MAJOR** · the tab↔tabpanel association does not exist

The file's headline claim, `KfPillTabs.vue:8–11` and `:56`:

> "This strip is ARIA-correct BY CONSTRUCTION — a `role=tablist` of `role=tab` buttons (a panel switcher, the right
> pattern), where `aria-orientation` is a **VALID, complete contract** that needs no suppress."
> `/** Valid on `role=tablist` (default horizontal) — the complete WCAG contract. */`

The measurement:

```
$ grep -rn "aria-controls" demo/ | grep -v node_modules
→ (no output)          # zero occurrences in the ENTIRE demo tree
```

And the panels it switches carry no anchor to be pointed at — `ChannelControls.vue:97–102`, `:129–137`, `:149–154` each
render `role="tabpanel"` with `data-state` and `tabindex` but **no `id`** and **no `aria-labelledby`**.

So: no `aria-controls` on any tab, no `id` on any panel, no `aria-labelledby` on any panel. A screen-reader user on a tab
is told "tab, 1 of 3, selected" with no programmatic route to the panel it controls, and lands on an unlabelled tabpanel.
APG's tab pattern states both directions of the association ("Each element with role `tab` has the property
`aria-controls` referring to its associated `tabpanel`"; "Each element with role `tabpanel` has the property
`aria-labelledby` referring to its associated `tab`"). The contract is **half-built**, and the file asserts it is complete.

Note the specific irony for this axis: the component exists *because* an ARIA attribute was emitted where it did not
belong. It cured an over-emission and shipped an under-emission.

**Falsifier / severity caveat, stated honestly**: WAI-ARIA 1.2 lists `aria-controls` under *supported* (not *required*)
properties for `role=tab`, so a strict "no invalid attributes" bar is met and a reviewer applying that bar would grade
this MINOR, not MAJOR. I grade MAJOR because the file's own stated standard is "complete contract", and because the
`aria-labelledby` gap on the panels is an APG requirement the tree also misses. The factual core — zero `aria-controls`,
zero panel `id`s — is not contestable. AT behaviour is `UNPROVEN-NEEDS-LIVE`.

---

## 6. **D-6 — MAJOR** · the phantom dep (F-1) bites *here*, and the fork made the bite quieter

Every design value this component reads is glass-ui's, and none is the demo's:

| token, at | defined in | demo-owned? |
|---|---|---|
| `--radius-panel` `:84` | `glass-ui/dist/styles/…` (`--radius-panel: var(--radius-xl)`) | no |
| `--radius-lg` `:84,:94` | `glass-ui/dist/styles/…` | no |
| `--type-small` `:98` | `glass-ui/dist/styles/theme/bridges.css` → `--type-small: clamp(0.875rem, …)` | no |
| `--muted-foreground` `:100` | glass-ui theme | no |
| `--foreground` `:112,:113,:116,:118` | glass-ui theme | no |
| `--duration-fast` `:103–105` | `glass-ui/dist/styles/tokens/scheme-motion.css` → `0.2s` | no |
| `--ease-standard` `:103–105` | `glass-ui/dist/styles/tokens/scheme-spring.css` | no |
| `--color-progress` `:121` | **`demo/styles/style.css:163`** | **yes** |
| `.glass-wash` (class) `:17` | `glass-ui/dist/styles/glass/ladder.css` + `material.css` | no |

```
$ grep -rE -- "--(foreground|muted-foreground|radius-lg|type-small|duration-fast|ease-standard|radius-panel): *[^;]" demo/styles/*.css
→ (no output)
$ head -3 demo/styles/style.css
@import "tailwindcss";  @import "tw-animate-css";  @import "@mkbabb/glass-ui/styles";
```

7 of 8 custom properties plus the material class arrive from `@mkbabb/glass-ui` — the package lane-frontend **F-1** proves
is absent from both `package.json` and `package-lock.json` while sitting installed at 7.0.0.

**The library point, which is the interesting one**: the fork's stated purpose was to *stop depending* on glass-ui
(`:11–12` "No dependency on the glass-ui collapse-crossfade or its aria guard"). Narrowly true. But it converted a
**typed, versioned, build-time** dependency (`import { SegmentedTabs } from "@mkbabb/glass-ui/tabs"` — which fails
**loudly** at module resolution on a clean `npm ci`) into an **untyped, unversioned, runtime CSS** dependency on the same
missing package, which fails **silently**:

- `.glass-wash` missing → an unstyled transparent strip (no plate, no border, no rim);
- `--duration-fast` / `--ease-standard` missing → `transition: color var(--duration-fast) var(--ease-standard), …` becomes
  invalid-at-computed-value-time and the **whole** `transition` property is dropped;
- `--muted-foreground` / `--foreground` missing → `color` resolves to the guaranteed-invalid value → inherited/unset text
  colour, i.e. no active/inactive contrast at all;
- `--type-small` falls back cleanly (`, 0.875rem`), `--radius-panel` falls back to `--radius-lg` which is *also* glass-ui's.

Note the fallback posture is **inconsistent within the file**: `:84` `:98` `:121` supply fallbacks; `:100` `:103–105`
`:112–118` do not. Under F-1 the guarded three degrade and the unguarded five vanish.

**Falsifier**: dies if any of the seven tokens is in fact demo-defined (grep above says no), or if the demo pins glass-ui
somewhere the census missed (`package-lock.json` has zero glass-ui entries per F-1), or if a build-time CSS extraction
inlines the tokens (`style.css:3` is a plain `@import` of the package's `styles` index — a resolution, not an inline).

---

## 7. MINOR findings

### D-7 · `transition: font-weight` on a variable face — 200 ms of relayout per selection

```
KfPillTabs.vue:99         font-weight: 500;
KfPillTabs.vue:102–105    transition: color var(--duration-fast) var(--ease-standard),
                                      background var(--duration-fast) var(--ease-standard),
                                      font-weight var(--duration-fast) var(--ease-standard);
KfPillTabs.vue:117        .kf-pill-tab[data-state="active"] { font-weight: 600; }
```

The face is variable, so the weight genuinely interpolates rather than snapping:

```
$ grep -oE "font-weight: *[0-9]+ +[0-9]+" node_modules/@mkbabb/glass-ui/dist/styles/…
font-weight: 200 800
font-weight: 300 700
```

`font-weight` is a **layout-affecting** property: every interpolated frame changes glyph advance widths, so for 200 ms
(`--duration-fast: 0.2s`) each selection change re-lays-out the activated pill **and**, because `.kf-pill-tab` is
`flex-shrink: 0` inside an `inline-flex` track (`:81`, `:89`), shifts every sibling to its right. Under the roving-focus
contract selection follows focus, so this fires on **every arrow hop** — and `useTabStripScroll.scrollActiveTabIntoView()`
(`:46–56`) measures and smooth-scrolls to the active tab *during* that reflow window.

Compounding: there is no `prefers-reduced-motion` handling in this SFC's `<style scoped>`, and there is no global PRM
transition kill to inherit — glass-ui's PRM blocks zero `--motion-weight` and swap `--ease-cartoon-punch`/
`--transition-liquid-spatial`, but leave `--duration-fast` at `0.2s`. Eight sibling demo components *do* carry their own
`@media (prefers-reduced-motion: reduce)` blocks (`EasingTarget.css:48`, `SquareScene.css:136`, `SequenceTarget.css:238`,
`SquareInstrument.vue:207`, `SpringTarget.vue:462`, `StartingStyleTarget.vue:211`, …), so the omission departs from a live
house idiom. A colour/background fade under PRM is defensible; an animated **size** change is the class PRM exists for.

**Falsifier**: dies if the resolved face is static rather than variable (then the weight snaps at 50% — a jump instead of
a smear, still a layout shift, weaker claim), or if a global `*{transition-duration:…}` PRM rule exists (grep of
`demo/styles/*.css` and `glass-ui/dist/styles/accessibility.css` found none). Perceived jitter magnitude is
`UNPROVEN-NEEDS-LIVE`.

### D-8 · a documented re-export that cannot exist

```
KfPillTabs.vue:41–42   // …KfPillTabOption is re-exported
                       // so `import type { KfPillTabOption } from ".../KfPillTabs.vue"` keeps resolving.
KfPillTabs.vue:43–44   import { useKfPillTabs } from "./KfPillTabs/useKfPillTabs";
                       import type { KfPillTabOption } from "./KfPillTabs/useKfPillTabs";
```

There is no `export` statement — and there cannot be one: `<script setup>` rejects top-level ES exports at compile time.
The comment describes a mechanism the compiler forbids. It is also unused: the only type consumer imports through the
*shim* instead (`ChannelControls.vue:230`), so the path the comment promises to preserve has no caller.

**Falsifier**: dies if `<script setup>` permits re-exports (it does not; the SFC compiler errors) or if some file imports
`KfPillTabOption` from `KfPillTabs.vue` (`grep -rn "KfPillTabs" ` shows only `useKfPillTabs`-path and shim-path importers).

### D-9 · the selection guard written three times, and the SFC's own `select()` bypassed

```
KfPillTabs.vue:63–65   const select = (value: string) => { if (value !== modelValue) emit("update:modelValue", value); };
KfPillTabs.vue:30      @click="select(opt.value)"                       ← the only caller
KfPillTabs.vue:72      select: (value) => emit("update:modelValue", value),   ← raw emit, guard skipped
useKfPillTabs.ts:87    if (target.value !== params.modelValue()) params.select(target.value);   ← the guard, again
```

Two code paths, one guard duplicated, one guard bypassed. No behavioural bug today (the composable's own check at `:87`
covers the keyboard path), which is exactly why it is MINOR — but the invariant "never emit an idempotent update" is
enforced in two places and violable from a third, and a future caller wiring `params.select` differently loses it
silently. The honest single-authority shape is one guarded `select` passed to both the click handler and the composable.

**Falsifier**: dies if `:72` can ever emit a redundant value today — it cannot, because `:87` gates it. This is a
duplication/contract finding, not a behaviour finding, and is graded accordingly.

### D-10 · dead barrel export

```
transport/index.ts:12   export const KfPillTabs = defineAsyncComponent(() => import("./KfPillTabs.vue"));
ChannelControls.vue:229 import KfPillTabs from "../KfPillTabs.vue";      ← static, the ONLY real consumer
```

Zero importers of the barrel symbol (`grep -rn "KfPillTabs"` across `demo/`, `test/`, `scripts/`). The async wrapper's
code-split never applies — the SFC lands statically in `ChannelControls`' chunk regardless — while `instrument/index.ts:24`
(`export * from "./transport"`) keeps the dead factory reachable from the wider barrel.

**Falsifier**: dies if any consumer imports `KfPillTabs` from `@components/instrument` or `…/transport` (none does).

### D-11 · the re-export shim, and the split import — confirming §7.3, contradicting the F-5 headline

```
transport/composables/useKfPillTabs.ts   (4 lines)
    export { useKfPillTabs, type KfPillTabOption } from "../KfPillTabs/useKfPillTabs";

ChannelControls.vue:229   import KfPillTabs from "../KfPillTabs.vue";                        ← real path
ChannelControls.vue:230   import type { KfPillTabOption } from "../composables/useKfPillTabs"; ← shim path, adjacent line
```

This confirms lane-frontend **§7.3 (lines 537–553)** exactly. It **contradicts the F-5 headline** at
`lane-frontend.md:19` ("One **dead** backwards-compat re-export shim (**0 consumers**)"): this shim has exactly **one**
consumer and is therefore not dead — the lane's own body (`:547` "has exactly one consumer, and it is incoherent") is the
correct row and the headline undercounts. The tree agrees with the body. Violates the standing `feedback_no_backwards_compat`
law; also note `KfPillTabs/` (directory) sits beside `KfPillTabs.vue` (file), so `../KfPillTabs` is reader-ambiguous and
defeats grep-by-path (lane-frontend `:557`, confirmed).

### D-12 · `KfPillTabOption` silently narrows the option shape it is fed

```
useKfPillTabs.ts:23–27   export interface KfPillTabOption { label: string; value: string; disabled?: boolean; }

glass-ui SegmentedTabs.vue.d.ts   SegmentedTabOption { label; value; icon?; disabled?; tooltip?; }
@state/controlSurfaces.ts:134     ControlSurfaceTab  { value: ControlSurface; label: string; icon?: string; }
```

The feed, live on **every** built-in tab:

```
ChannelControls.vue:299–303  const builtInTabs = computed(() => BUILT_IN_SURFACES.filter(…).map(s => SURFACE_META[s]));
@state/controlSurfaces.ts:146  controls:  { value:"controls",  label:"Controls",  icon:"SlidersHorizontal" }
@state/controlSurfaces.ts:147  keyframes: { value:"keyframes", label:"Keyframes", icon:"Braces" }
@state/controlSurfaces.ts:148  timeline:  { value:"timeline",  label:"Timeline",  icon:"Clock" }
ChannelControls.vue:313–324  const stripOptions = computed<KfPillTabOption[]>(() => [...builtInTabs.value, ...extra]);
```

Spread elements are not fresh literals, so TypeScript's excess-property check never fires: `icon` rides the boundary and
is dropped by a renderer that emits only `{{ opt.label }}` (`KfPillTabs.vue:33`). The same registry's icons **are**
rendered by the other host — `ChromeDock.vue:19–21, :50` reads the map and `:292`, `:299`, `:313` render
`<component :is="TAB_ICONS[tab.icon]">` for the control-surface tabs — so the two tab surfaces built from "THE ONE
registry" diverge.
The three upstream hosts type the passthrough as the *wider* glass shape — `EditorShell.vue:169`,
`AnimationControlsGroup.vue:173`, `ControlsPaneWrapper.vue:198` all declare `extraTabs?: SegmentedTabOption[]` — which
`ChannelControls.vue:271` re-declares as `KfPillTabOption[]`, so `tooltip` is likewise accepted-then-discarded.
Note the asymmetry inside one computed: extras are *explicitly* projected (`:321 .map(t => ({ value: t.value, label: t.label }))`)
while built-ins are not — the same drop, once deliberate and once accidental.

**Falsifier**: dies if the design intends a strictly text-only in-panel strip. Even then the finding survives in reduced
form: the contract should say so (`Pick<ControlSurfaceTab, "value" | "label">`, or an explicit projection on both
branches) rather than accept richer objects and discard half of them silently. Whether icons *should* appear is a design
question for the D-axis; the **silent structural over-acceptance** is the library defect.

### D-13 · the `disabled` branch: unreachable in-tree, inconsistent when reached

No supplier sets `disabled`: `SURFACE_META` has no such key (`controlSurfaces.ts:145–160`), and the extras projection
constructs `{value,label}` only (`ChannelControls.vue:321`). So `KfPillTabs.vue:26` and `useKfPillTabs.ts:38`'s entire
`enabled()` filter are dead against the live tree — carried, tested (`KfPillTabs.test.ts:173–184`) and unexercised.

Worse, the one state the exported contract permits but nothing covers is internally inconsistent: when
`modelValue` names a **disabled** option, `rovingValue` (`useKfPillTabs.ts:46–50`) skips it and returns the first *enabled*
value. The DOM then carries `aria-selected="true"` on a `disabled` (non-focusable) button while `tabindex="0"` sits on a
*different* button whose `aria-selected` is `"false"` — a tablist with a selected tab that cannot be reached and a focus
anchor that is not the selection. `KfPillTabs.test.ts` covers *skipping* a disabled option but never *selecting* one.
(Secondary: using HTML `disabled` rather than `aria-disabled` removes the tab from keyboard discovery entirely, which APG
advises against for composite widgets.)

**Falsifier**: dies if a supplier sets `disabled` today (none does), or if the `selected ∧ disabled` state is
unreachable through the public prop contract — it is not: the prop pair `options`/`modelValue` is unconstrained.

### D-14 · an undocumented host-shape contract inside a publicly exported composable

```
useKfPillTabs.ts:52–62  const focusTab = (list: HTMLElement | null, value: string) => {
                          const btn = list && (Array.from(list.children).find(…dataset.value === value) ?? null);
                          nextTick(() => btn?.focus());
                        };
useKfPillTabs.ts:89     focusTab((e.currentTarget as HTMLElement).parentElement, target.value);
```

Two hard assumptions, neither stated in `UseKfPillTabsParams` (`:29–35`) nor in the 17-line docblock: (a) the tab buttons
are **direct children** (`list.children`, not `querySelectorAll`), and (b) the tablist is exactly `currentTarget.parentElement`
— i.e. the handler must be bound per-button, one level deep. Both hold for `KfPillTabs.vue:13–35`. Neither is enforced,
and the composable is exported from **two** public paths (`KfPillTabs/useKfPillTabs.ts` and the D-11 shim), so any host
that wraps its tabs (a tooltip trigger, a `<span>` for an icon+label, a `FadingScroll` inner track) gets a silent
no-focus-move — the *exact* regression the a12 F1 fix exists to prevent, re-openable by markup alone.

Cheap structural cure: take the tablist element as a param, or resolve via `e.currentTarget.closest('[role=tablist]')`
and `querySelectorAll('[role=tab]')`. Note this also makes the assumption testable; today the test harness
(`KfPillTabs.test.ts:70–90`) reproduces the flat shape by hand, so it *ratifies* the assumption rather than checking it.

**Falsifier**: dies if `list.children` were `querySelectorAll` (it is not) or if the composable were module-private (it is
exported twice).

---

## 8. INFO

### D-15 · the unconditional `aria-orientation`, three lines below the block condemning unconditional emission

`KfPillTabs.vue:15` binds `:aria-orientation="orientation"` with `orientation` defaulted to `"horizontal"` (`:51`), so the
attribute is **always** present — including at its own ARIA default. This is *valid* (`aria-orientation` is supported on
`role=tablist`), so there is nothing to fix. It is recorded only because `:5–7` condemns the sibling for emitting "the
orientation attribute UNCONDITIONALLY", and glass-ui 7.0.0's cure was to make it **conditional on the role**, not
unconditional-but-on-a-better-role. The two components now differ in which axis they made conditional. No action.

### D-16 · adjacency — two live `SURFACE_META` registries feed this strip

```
demo/state/controlSurfaces.ts:145                 SURFACE_META  ← ChannelControls.vue:248 (this strip's options)
demo/components/instrument/surfaceTabs.ts:12      SURFACE_META  ← ChromeDock.vue:19-21, TransportDock.vue:237
```

Byte-equivalent clones of the map, plus duplicated `extraTabsFrom` and `dockCardinality`. Both files' prose asserts
single-sourcing ("THE ONE SURFACE-METADATA REGISTRY", `controlSurfaces.ts:141`; "the ONE `SURFACE_META` registry",
`ChannelControls.vue:294`) while `ChromeDock` — the *other* tab host, the one this strip is required to stay "in lockstep"
with (`ChannelControls.vue:284–286`) — reads the other copy. Not `KfPillTabs`' file and outside this challenge's write
scope; flagged because it is the provenance of the options this component renders, and because it is the mechanism by
which D-12's icon divergence between the two hosts becomes invisible.

---

## 9. Superlatives (L-18, the other direction)

### S-A · getter-thunk composable params — the demo's own reference pattern

```
KfPillTabs.vue:68–73   const { rovingValue, onKeydown } = useKfPillTabs({
                           options:    () => options,
                           orientation:() => orientation,
                           modelValue: () => modelValue,
                           select:     (value) => emit("update:modelValue", value),
                       });
```

Vue 3.5 reactive props destructuring compiles bare `options` to `__props.options` *at the site of use* — so passing the
destructured binding **directly** into a composable would capture a snapshot and silently freeze it. Wrapping each in a
thunk preserves reactivity across the boundary without `toRef`/`computed` ceremony. This is not incidental competence:
value.js's own `lane-24` census names it the reference implementation for the entire demo —
`lane-24-design-restructure-system.md:96` *"cured by getter fns, exactly as KfPillTabs.vue:74–79 already does"* and `:331`
*"(KfPillTabs.vue:74–79 is the reference)"*. (Line numbers have since drifted to `:68–73`; the pattern is unchanged.)
**Falsifier**: would die if the composable read the params eagerly rather than per-call — `useKfPillTabs.ts:38,48,67,87`
all invoke the thunks inside computeds/handlers. It does not.

### S-B · `rovingValue` can never leave the strip Tab-unreachable

```
useKfPillTabs.ts:46–50   const rovingValue = computed<string | undefined>(() => {
                             const en = enabled();
                             const sel = en.find(o => o.value === params.modelValue());
                             return (sel ?? en[0])?.value;
                         });
```

The naive roving-tabindex implementation is `tabindex = value === modelValue ? 0 : -1`, which produces a strip where
**every** button is `-1` whenever `modelValue` is empty, cleared, or names a disabled/absent option — a composite widget
that Tab cannot enter at all, and that no amount of arrow-key handling can rescue. Four lines, one `??`, and the invariant
"exactly one tab stop, always" holds for empty string, stale values, and all-but-one-disabled alike; `undefined` is
returned only in the one genuinely tab-stop-less case (no enabled option). Explicitly tested
(`KfPillTabs.test.ts:195–200`). This is the kind of edge the hand-rolled forks in this census usually miss.

### S-C · a narrow, named transition list — `all` refused, on the record

```
KfPillTabs.vue:101–105   /* Narrow transition (no `all`) — only the activation channels change. */
                         transition: color …, background …, font-weight …;
```

`transition: all` is the default failure mode of a hand-rolled control and the source of a whole class of accidental
animations (width, transform, box-shadow, and anything a parent later adds). Three named channels, plus a comment stating
the intent so the next editor knows the narrowness is deliberate rather than incomplete. (D-7 disputes one of the three
channels, not the discipline.)

### S-D · zero teardown surface — the leak class does not exist here

Neither file registers an event listener, timer, `requestAnimationFrame`, `ResizeObserver`/`MutationObserver`,
`watch`/`watchEffect`, or module-level cache; nothing is retained across renders; the composable's return is one
`computed` and one pure handler; all DOM listeners are Vue template bindings torn down with the component. The single
deferred call — `nextTick(() => btn?.focus())` (`useKfPillTabs.ts:61`) — resolves its target *before* the tick and no-ops
safely on a detached node if the strip unmounts in between, so there is no post-unmount focus steal either. On an axis
whose first question is "what leaks", the correct answer here is "nothing, by construction" — verified by absence, not by
assertion. **Falsifier**: any `addEventListener`, `set(Timeout|Interval)`, `requestAnimationFrame`, `Observer`, `watch*`,
or `onMounted` in either file — grep returns none.

### S-E · a real interaction gate with a recorded BITE

`test/demo/instrument/KfPillTabs.test.ts` mounts a representative `role=tablist` host **attached to `document.body`** so
jsdom `focus()`/`activeElement` are live (`:94–96`), dispatches genuine `KeyboardEvent`s from the *currently focused*
element (`:108–113`), awaits the `nextTick` the focus move is queued on, and asserts focus **and** selection together
across ≥3 tabs — wrap at both ends (`:153`), Home/End (`:162`), disabled-skip (`:173`), vertical axis (`:186`), and the
empty-`modelValue` tab stop (`:195`). It documents its own kill condition (`:20–21` "BITE: revert the `focusTab` call →
the 'third tab reachable' assertion reds (recorded via revert)"). That is a falsifiable gate, not a shape assertion, and
it is the reason the a12 F1 regression cannot silently return.

**Its stated boundary, in fairness to D-1**: the harness constructs its own host with no glass-ui shortcut registry
mounted, so it verifies the widget in isolation and is structurally blind to the window-level collision. The superlative
stands for what it claims to cover; D-1 lives in the gap between the unit and the app.

---

## 10. Module size (Goldilocks) — no finding

| file | lines | verdict |
|---|---|---|
| `KfPillTabs.vue` | 124 (36 template / 37 script / 49 style, ~24 of which are comment) | in-band |
| `KfPillTabs/useKfPillTabs.ts` | 93 (≈30 doc-comment, ≈55 code) | in-band |

The SFC/composable split is the right cut and made for the right reason (`:39–42`: vitest carries no Vue-SFC plugin, so
the keyboard core must be drivable headless — the `useToolbarKeyboard` precedent). Colocation is correct
(`KfPillTabs/useKfPillTabs.ts` beside its sole consumer). The only colocation defect is the D-11 shim, which is
*additional* to the correct structure rather than a flaw in it.

---

## 11. Engine-consumption idiom — no misuse, and no missed opportunity

The demo dogfoods `@mkbabb/keyframes.js` in 68 files; `KfPillTabs` imports it in none. That is **correct**, not a gap: the
strip's activation is a two-state style change with no timeline, no scrub, no orchestration, and no keyframe list — a CSS
`transition` is the honest tool and reaching for the engine here would be contrivance (`feedback_kiss_no_contrivance`).
The component instead consumes the *design system's* motion tokens (`--duration-fast`, `--ease-standard`), which is the
right layer.

Recorded for completeness rather than as a defect: the one place the engine would have been apt is the
`SegmentedTabs` capability the fork forfeited (D-3) — glass-ui 7.0.0's `motion` axis drives the pill indicator through
`useDragMorph` with a PRM downgrade path. The fork has no indicator element at all (activation is a background
`color-mix`, `:118`), so there is nothing to animate and nothing was lost by not animating it. No finding.

---

## 12. Corpus reconciliation

| corpus row | this challenge |
|---|---|
| lane-frontend **F-1** (phantom `@mkbabb/glass-ui`) | **extended** → D-6: the exposure is not merely "the demo imports an undeclared package"; this component converted a loud build-time failure into a silent runtime one, and 7 of its 8 tokens plus its material class ride that dependency. |
| lane-frontend **F-2 / S-1** (fork rationale stale, RED, 217 lines) | **confirmed** → D-3. Line counts verified exactly: 124 + 93 = 217. |
| lane-frontend **:613** ("the fork's secondary `role=tablist` claim is a design argument the 7.0.0 aria fix does not by itself answer") | **CONTRADICTED** → D-3 half two. `SegmentedTabsSemantics = "toggle" \| "tabs"` with `role: W.value ? "tablist" : "group"` and `W = semantics === "tabs" \|\| (!semantics && variant === "underline")` answers it directly, in the installed dist. The caveat should be struck; S-1's "replace" verdict is stronger than stated. |
| lane-frontend **F-5** (headline: "one **dead** shim, **0 consumers**") | **contradicted in the headline, confirmed in the body** → D-11. `transport/composables/useKfPillTabs.ts` has exactly **one** consumer (`ChannelControls.vue:230`), as the lane's own §7.3 `:547` correctly states. The headline row undercounts. |
| lane-frontend **:557** (`useKfPillTabs` resolves at two paths; `KfPillTabs/` dir shadows `KfPillTabs.vue`) | **confirmed** → D-11. |
| lane-frontend **S-2** (type-only `/tabs` consumption at 3 sites) | **extended** → D-12: those three sites are the `extraTabs` chain, and the type they carry (`SegmentedTabOption`) is *wider* than what the renderer consumes, so `icon`/`tooltip` cross the boundary and die. |
| U-lane **lane-24 :96, :331** (KfPillTabs' getter-fn wiring = the demo's reference pattern) | **confirmed** → S-A. |
| U-lane **lane-24 :131 / U-24.4** (`KfPillTabs` emits `update:modelValue` manually rather than via `defineModel`) | **confirmed, not re-raised as its own row** — it is the mechanism behind D-9's triplicated guard; folded there rather than double-counted. |
| U-lane **lane-03 F-6** (the `Kf` vanity name the owner derided survives) | acknowledged, out of axis (naming is D/design). Noted only because D-3 makes the whole surface retirable, which resolves F-6 as a side effect. |
| lane-library (parse seams) | no overlap — this component touches no parser surface. |

---

## 13. Summary judgement

The component is **competently built and wrongly resident**. Its internals earn five genuine superlatives — the getter-
thunk boundary, the never-unreachable tab stop, the disciplined transition list, a zero-teardown surface, and a real
falsifiable interaction gate. What it does not survive is contact with its surroundings: it silently corrupts engine state
on every keyboard traversal (**D-1**), swallows `Space` (**D-2**), double-plates its own material (**D-4**), ships a
half-built ARIA contract while asserting a complete one (**D-5**), and rests its entire existence on a rationale that both
halves of the installed glass-ui 7.0.0 have already retired (**D-3**) — while binding itself, invisibly, to that same
undeclared package through CSS (**D-6**).

D-1 is fixable in one line and should be, independently and immediately, because it is a live data-corruption path and
because glass-ui's `useTabRovingFocus` may well carry the identical leak into whatever replaces this component. The other
fifteen are best discharged by D-3's retirement onto `<SegmentedTabs variant="pill" semantics="tabs">`, which deletes 217
lines, both the shim and the dead barrel export, the option-narrowing, the welded material, and the icon divergence — and
buys back `activation`, `responsive`, `motion`, the `option` slot, `icon` and `tooltip`. D-5's `aria-controls`/
`aria-labelledby` gap survives that swap (it lives in `ChannelControls`' panels, not in the strip) and must be closed
separately.

claude-opus-5[1m]

# CHALLENGE · EditorShell · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorShell.vue` (261 lines)
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser. Every livable-only claim is marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise — but a false defect is worse than a missed one, so §4 records four hypotheses I raised and then **killed against the tree**.

**Read whole (read-only), the full import closure:**

| file | why |
|---|---|
| `demo/components/instrument/shell/EditorShell.vue` | target |
| `demo/components/instrument/utils/iosTextEntry.ts` | `initIOSPlatformClass` (:115) |
| `demo/components/instrument/shell/SharePopover.vue` + `useShareState.ts` | :117 |
| `demo/components/instrument/shell/EditorStartScreen.vue` | :118 |
| `demo/components/instrument/shell/KeyboardShortcutsModal.vue` | :119 |
| `demo/components/instrument/transport/AnimationControlsGroup.vue` (+ `AnimationControlsGroup/useControlsKeyboardShortcuts.ts`) | :120 |
| `demo/styles/style.css` → `design-idioms.css` → `layout.css` | :131 (the whole cascade root) |
| `node_modules/@mkbabb/glass-ui/dist/header-ribbon.js` · `components/header-ribbon/{types.d.ts,styles.css}` | :116 |
| `.../dist/keyboard.{js,d.ts}` · `dark-mode-toggle.js` · `components/dark-mode-toggle/DarkModeToggle.vue.d.ts` · `components/button/Button.vue.d.ts` | :122–:127 |
| `.../dist/styles/{transitions.css,utilities/a11y-overrides.css,utilities/btn.css,tokens/*}` | motion + PRM + token resolution |
| context (host, not imported): `demo/app/App.vue`, `demo/app/dock/{ChromeDock,MbabbMenu}.vue`, `demo/components/instrument/shell/{HeroAurora,EditorHeader}.vue` | the only call-site + the duplication surface |

**Tally: 14 defects · 1 BLOCKER · 3 superlatives · 4 cleared hypotheses.**

---

## 0. Headline

| id | severity | claim |
|---|---|---|
| **D-1** | **BLOCKER** | The shell's three header controls are `inert` + `aria-hidden="true"` at rest with **no reachable reveal affordance**: keyboard ✗, touch ✗, AT ✗. `mode="persistent"` is not a HeaderRibbon prop in glass-ui 7.0.0. |
| D-2 | MAJOR | The graph-paper substrate is **7.5×–14× more perceptually present in dark mode than in light** from the same rule (ΔL* 4.3 vs 33.1 major; 1.1 vs 15.9 fine) — the component's comment asserts the single-rule retint is sufficient. |
| D-3 | MAJOR | `SharePopover` + `DarkModeToggle` in the ribbon are **exact duplicates** of two rows already in `MbabbMenu`, which carry visible text labels and descriptions. Two authorities, one command. |
| D-4 | MAJOR | Three adjacent controls, **three different affordance idioms**: bare `aria-label` / glass `<Tooltip>` / native `title=` (a non-prop falling through `useAttrs`). |
| D-5 | MINOR | The scoped block's fallbacks and its own prose both state values the tree does not have (5% vs 3%, 12% vs 11%) and mis-cite the token home (design-idioms.css vs layout.css). |
| D-6 | MINOR | The start-screen wrapper's `flex items-center justify-center` is **inert against its own default child** (that child is `absolute`). |
| D-7 | MINOR | 32px targets; the demo's own `.tap-floor` 44px idiom has **zero consumers demo-wide**. |
| D-8 | MINOR | `--z-header: 35` is absent from the shell's documented z-contract and sits **below** `--z-dock: 40` in the same block-start band. |
| D-9 | MINOR | **Zero** `forced-colors` rules anywhere in `demo/`; the shell's entire visual read is a decorative `background-image`. |
| D-10 | MINOR | `headerRibbonRef` is `defineExpose`d with **zero consumers** — dead public contract. |
| D-11 | MINOR | `:key="superKey"` hard-remounts the whole transport per scene switch while the subject cross-fades — asymmetric motion at the shell's most visible seam. |
| D-12 | MINOR | `--scale-hover` is a **live shadow** of a glass-ui token with a currently-zero delta (census §6.3 flat-namespace hazard, made concrete). |
| D-13 | INFO | `#backdrop` has no out-of-flow contract; an in-flow host backdrop displaces `<main>`. |
| D-14 | INFO | Four different names for one command across four surfaces. |
| **S-1** | SUPERLATIVE | The `<main>` landmark box over `display: contents` — correct reasoning, and the single-in-flow-grid-item precondition **verifies**. |
| **S-2** | SUPERLATIVE | The `@supports not (height: 100dvh)` fallback covers width as well as height, with the right cascade layer, for the right reason. |
| **S-3** | SUPERLATIVE | Backdrop layering by DOM order with zero `z-index` — verified against the actual host backdrop. |

---

## 1. BLOCKER

### D-1 · The header ribbon's actions are `inert` + `aria-hidden` with no reachable way to reveal them — **BLOCKER**

**Provenance.**

`EditorShell.vue:16`

```
<HeaderRibbon ref="headerRibbonRef" mode="persistent" placement="right">
```

The `mode` prop **does not exist**. `glass-ui@7.0.0` `components/header-ribbon/types.d.ts` declares exactly three props:

```
export interface HeaderRibbonProps {
    placement?: HeaderRibbonPlacement;   // "left" | "right"
    ariaLabel?: string;
    class?: HTMLAttributes["class"];
}
```

and the runtime confirms it — `dist/header-ribbon.js` props block is `{ placement: {default:"left"}, ariaLabel: {default:"Header actions"}, class: {...} }`. `grep -c "mode" dist/header-ribbon.js` → **0**. The component is `inheritAttrs: !1` and spreads `useAttrs()` onto its root, so `mode="persistent"` lands as a **literal non-conforming HTML attribute** `mode="persistent"` on `<div class="header-ribbon" role="toolbar">` and does nothing else. (The word "persistent" appears in glass-ui only as JSDoc prose — `types.d.ts`: *"Accessible name for the persistent action toolbar"* — which is plausibly where the mistaken prop name came from.)

**What the ribbon actually does.** `dist/header-ribbon.js` renders the items slot inside:

```js
i("div", { class: "header-ribbon__actions",
           inert: !w.value || void 0,
           "aria-hidden": !w.value }, [u(n.$slots, "items")], 8, _)
```

with `w = computed(() => x.value || S.value || C.value)` — `x` = pinned, `S` = hovered, `C` = focus-within, **all initialised `ref(!1)`**. And `components/header-ribbon/styles.css`:

```css
.header-ribbon:not([data-expanded]) .header-ribbon__actions {
    max-inline-size: 0; opacity: 0; pointer-events: none;
}
```

So at rest the slot content — `SharePopover` (`:20`), the keyboard-shortcuts `Button` (`:32–40`), `DarkModeToggle` (`:44–47`) — is simultaneously **`inert`** (unfocusable, unclickable, out of tab order), **`aria-hidden="true"`** (out of the a11y tree), **zero inline size**, and **`opacity: 0`**.

**Every reveal path is closed.**

1. **pin** — `onClick: k` (toggles `x`) is bound to `.header-ribbon__anchor`. EditorShell supplies **no `#anchor` slot content**, and `.header-ribbon__anchor { display: grid; flex: none; place-items: center; }` carries no min-size ⇒ a **0 × 0 px click target**. Unclickable by construction.
2. **hover** — `function T(e){ e.pointerType !== "touch" && (S.value = !0) }`. Touch pointers are explicitly excluded ⇒ **no touch device can ever expand it**.
3. **focus-within** — requires `focusin` inside the ribbon. The actions are `inert` (unfocusable); the anchor is empty (nothing focusable). **Circular: expansion requires focus, focus requires expansion.**

**The residual affordance, measured.** Collapsed band geometry from `styles.css` + `dist/styles/tokens/{sizing,offsets}.css`: `.header-ribbon__band { min-block-size: var(--size-icon-btn) /* 2.5rem = 40px */; padding: var(--panel-padding) /* 0.375rem = 6px */ }`, inner content = anchor (0) + actions (0), `margin-inline-end: 0` when collapsed. ⇒ the entire visible chrome is a **12 px × 40 px blank glass sliver** pinned to the top-inline-end corner, with `pointer-events: auto` on the band alone (`.header-ribbon { pointer-events: none }`). A fine-pointer user must discover that hovering a featureless 12 px sliver produces three controls. On `@media (pointer: coarse)` the ribbon padding even drops to `0.75rem`, tightening it further — for the exact class of device on which hover can never fire.

**Blast radius, App host.** `App.vue:28–102` mounts `<EditorShell>` and passes **neither** `#header-left` nor `#header-right`, so the `:19` slot **fallback content renders** — all three controls are the affected ones. Redundancy check: Share and Dark mode survive via `MbabbMenu` (`app/dock/MbabbMenu.vue:9, :19`) — see D-3. The keyboard-shortcuts trigger has **no second visible route**; only the `?` key (`EditorShell.vue:190`) reaches it. That is precisely the "discoverability paradox" the `:21–29` comment claims to break:

> *"F.W15.S3 — the **VISIBLE** shortcuts-discovery trigger. The 19-shortcut registry was discoverable ONLY via the `?` shortcut (the discoverability paradox); this breaks it with one control."*

The control is not visible, is not focusable, and is not announced. The comment's stated goal is unmet in every modality except fine-pointer hover-on-a-sliver.

**Falsifier.** Any of: (a) a demo-side CSS rule forcing `.header-ribbon__actions` open or setting `[data-expanded]` — I grepped: `grep -rn "header-ribbon" demo` returns **exactly one line**, the import at `EditorShell.vue:116`, no CSS at all; (b) a `[mode=...]` attribute selector in glass-ui — `grep -rno "\[mode=[^]]*\]" node_modules/@mkbabb/glass-ui/dist` → **empty**; (c) a HeaderRibbon `mode` prop in some other installed version — the installed `dist` is the one the demo resolves (census F-1); (d) a UA that ignores `inert` — Baseline since 2023, and `aria-hidden` closes the AT path independently. If any of (a)–(c) surfaces, this drops to INFO.
**Cross-ref:** census `lane-frontend.md` §3.1 records `/header-ribbon` at **1** consumption site — that site is this one, so nothing else in the tree can be relied on to have solved it.

---

## 2. MAJOR

### D-2 · The graph substrate is 7.5×–14× more present in dark mode than in light, from the same rule — MAJOR

**Provenance.** `EditorShell.vue:238–259` (scoped) with tokens from `demo/styles/layout.css:32–35`, foreground/background from `glass-ui/dist/styles/tokens/{color-radius,dark-arm}.css`.

The component's own justification, `EditorShell.vue:231–233`:

> *"The lines mix over `--foreground`, so the dark theme **retints from the SAME rules** — the duplicated dark data-URI is retired with its light twin."*

The rules are the same. The **result is not**, because an alpha fraction of `--foreground` composited over `--background` is wildly non-symmetric across the sRGB transfer curve near the two ends.

Resolved inputs: light `--foreground: hsl(24 10% 10%)` (Y ≈ 0.01005) over `--background: --neutral-0: hsl(40 30% 98%)` (Y ≈ 0.96016); dark `--foreground: hsl(30 14% 90%)` (Y ≈ 0.79141) over `--neutral-0: hsl(24 9% 4%)` (Y ≈ 0.00310). Composite at the two token alphas (`--graph-opacity: 3%`, `--graph-major-opacity: 11%`):

| tier | arm | line Y | contrast vs page | **ΔL\*** |
|---|---|---|---|---|
| fine (3%) | light | 0.93166 | **1.03 : 1** | **1.1** |
| fine (3%) | dark | 0.02675 | **1.45 : 1** | **15.9** |
| major (11%) | light | 0.85565 | **1.12 : 1** | **4.3** |
| major (11%) | dark | 0.08981 | **2.63 : 1** | **33.1** |

**Major lines are 7.5× the perceptual step in dark mode; fine lines 14×.** In light mode the fine tier is an 8-bit delta of ≈7/255 — at or under the display noise floor on a dim or glossy panel; the major tier at ΔL* 4.3 carries essentially the entire read alone, so the two-tier design the comment describes ("*a deliberate two-tier engineering graph paper*", `:228–230`) collapses to one tier in the light arm and reads as a strong two-tier grid in the dark arm.

This is **not** a WCAG finding — a graph-paper wash is pure decoration, exempt from 1.4.11 — it is a **design-parity** finding, and it directly contradicts the sufficiency claim at `:231–233`. It also strains the `:235–236` legibility assertion ("*the substrate is PRESENT and legible behind the glass plate — the §Hard-gate clause-g legibility assertion*"): at 1.12:1 the light arm's major line is legible only under favourable viewing conditions, and the assertion is stated once for both arms as if they were equivalent.

**Falsifier.** A `.dark`-scoped override of `--graph-opacity` / `--graph-major-opacity`. `layout.css` declares them once, in the single `:root` block at `:12–141`; `grep -rn "graph-" demo/styles` finds no `.dark` arm. If one is added, or if the substrate is intended to be dark-dominant by design, this drops to INFO. The *ranking* of the arms is decidable from tokens; the **absolute** perceived weight behind `HeroAurora`'s wash (`HeroAurora.vue:46`, ceiling 0.1) and the glass plates is **UNPROVEN-NEEDS-LIVE**.

---

### D-3 · The ribbon duplicates two commands that already exist, better labelled, in the dock menu — MAJOR

**Provenance.** `EditorShell.vue:20` (`<SharePopover />`) and `:44–47` (`<DarkModeToggle />`) versus `app/dock/MbabbMenu.vue:8–14` and `:18–24`:

```html
<DropdownMenuItem …>
    <SharePopover :on-scene-restore="onSceneRestore" />
    <div …><span>Share</span>
           <p …>Copy link or load shared state</p></div>
</DropdownMenuItem>
…
<DropdownMenuItem …>
    <DarkModeToggle title="Toggle dark mode" class="aspect-square w-5" />
    <span>Dark mode</span>
</DropdownMenuItem>
```

Both mount unconditionally in the App host (`App.vue:19–23` puts `MbabbMenu` in `ChromeDock`'s `#items`). So the running page carries **two live `SharePopover` instances and two live `DarkModeToggle` instances** at all times — and the dock copies are the *better* ones: visible text label, a supporting description line, a normal focus order, no `inert` wall. The ribbon copies are unlabelled 32 px icons behind D-1.

The `:21–29` rationale justifies exactly **one** control in the ribbon (the shortcuts trigger, which genuinely has no other home). Share and Dark mode ride in on its coat-tails as the slot's fallback content, splitting each command across two authorities in two chrome bands.

Corroborating: `EditorHeader.vue:23, :26` is a **third** copy of the same pair, and `grep -rn "EditorHeader" demo` finds it referenced only by the barrel (`shell/index.ts:2`) and a token comment (`layout.css:15`) — **zero mounting consumers**. The idiom has been copied three times and consolidated zero times.

**Falsifier.** A host that renders `EditorShell` without `ChromeDock`/`MbabbMenu` — none exists; `grep -rn "EditorShell" demo` gives exactly one mount site, `App.vue:28`. Or an explicit ruling that top-right chrome and dock-menu chrome are deliberate parallel affordances for the same commands, in which case this is a design intent I am contradicting rather than a defect.

---

### D-4 · Three adjacent controls, three affordance idioms — MAJOR

`EditorShell.vue:20`, `:30–43`, `:44–47` place three controls 8 px apart (`.header-ribbon__actions { gap: 0.5rem }`), each with a different disclosure mechanism:

| control | mechanism | provenance |
|---|---|---|
| `SharePopover` | **nothing** — bare `aria-label="Share animation"`, no tooltip at all | `SharePopover.vue:5` |
| shortcuts `Button` | glass `<Tooltip>` / `<TooltipContent>` → "Keyboard shortcuts (?)" | `EditorShell.vue:30–43` |
| `DarkModeToggle` | **native `title=` attribute** → "Toggle dark mode" | `EditorShell.vue:45` |

The third is unintentional: `DarkModeToggleProps` declares only `{ size?, disableTransitions? }` (`components/dark-mode-toggle/DarkModeToggle.vue.d.ts`), the component is `inheritAttrs: !1` and spreads attrs onto its `<button>`, so `title` becomes a **native browser tooltip** — different delay (~1 s vs the ribbon's `Tooltip` default), different typography, different placement, and **no touch equivalent whatsoever**. Same authorship mistake as D-1: a prop that does not exist, silently absorbed by `useAttrs`.

Secondary, at the same site: `dark-mode-toggle.js` computes `"aria-label": v.value ? "Switch to light mode" : "Switch to dark mode"`, so the accessible name is *"Switch to dark mode"* while the only visible label a sighted mouse user sees is *"Toggle dark mode"*. The same split recurs on the shortcuts button — accname *"Show keyboard shortcuts"* (`:35`) vs visible *"Keyboard shortcuts (?)"* (`:42`). Whether a `title`/tooltip counts as a "visible label" under WCAG 2.5.3 is genuinely contested, so I am **not** filing a 2.5.3 failure; I am filing the divergence as a copy-consistency defect (see D-14) and the three-mechanism split as the design defect.

**Falsifier.** A glass-ui `DarkModeToggle` version declaring `title` as a prop that renders it into a styled tooltip; or a demo rule suppressing native `title` rendering (impossible in CSS). Neither exists in `dist/`.

---

## 3. MINOR / INFO

### D-5 · The scoped block's fallbacks and prose both state values the tree does not have — MINOR

Three drifts in one comment/rule pair:

| site | states | tree says |
|---|---|---|
| `EditorShell.vue:241` | `var(--graph-opacity, 5%)` | `layout.css:34` → **3%** |
| `EditorShell.vue:246` | `var(--graph-major-opacity, 12%)` | `layout.css:35` → **11%** |
| `EditorShell.vue:234` | *"`--graph-major-opacity` **(12%)** deliberately resolves above the former 0.10α floor"* | 11% — a **1 pp** margin above the floor, not the 2 pp the prose implies |
| `EditorShell.vue:231` | *"all four layers reading the demo-owned `--graph-*` tokens **(design-idioms.css)**"* | the tokens are in **`layout.css:32–35`**; `design-idioms.css` contains no `--graph-*` at all (and `layout.css:1–6` says so explicitly) |

Both fallbacks are also **dead** — the component imports `@styles/style.css` itself (`:131`), which imports `layout.css`, so `--graph-opacity` / `--graph-major-opacity` are always defined. A dead fallback is harmless; a dead fallback that states a *different* number than the live token is a trap for the next reader, and the prose repeats the wrong one. Note the asymmetry: the opacity vars carry (wrong) fallbacks while `background-size` (`:254–258`) reads `var(--graph-major)` / `var(--graph-pitch)` **bare** — a missing length there invalidates the whole `background-size` declaration at computed-value time and silently drops the grid to `auto` sizing.

**Falsifier.** A second `--graph-*` declaration elsewhere in the cascade resolving to 5%/12%. `grep -rn "graph-opacity\|graph-major-opacity" demo` → two sites only: `layout.css:34–35` and this component's two `var()` reads.

### D-6 · The start-screen wrapper centres nothing — MINOR

`EditorShell.vue:60`

```html
<div v-if="showStartScreen" class="absolute inset-0 z-controls flex items-center justify-center pointer-events-none">
    <slot name="start-screen"><EditorStartScreen /></slot>
```

`EditorStartScreen.vue:17–19`'s root is `class="hero-band z-controls pointer-events-none absolute left-0 w-screen"` with `top: calc(--work-area-top-offset + --work-area-height * 0.45)` (`:88–94`). An **absolutely positioned child is removed from flex layout**, so `flex items-center justify-center` has no effect on the default slot content — the hero self-positions entirely. The classes advertise a centering contract the component does not honour, and a host filling `#start-screen` with in-flow content would get *different* geometry than the default it is replacing. `z-controls` and `pointer-events-none` are likewise doubled on wrapper and child.

**Falsifier.** A host that supplies in-flow `#start-screen` content — `App.vue:48–50` supplies `<EditorStartScreen hint="…">`, i.e. the same absolute component. No such host exists today, which is exactly why the classes have never been observed to be inert.

### D-7 · 32 px targets; the repo's own 44 px idiom has zero consumers — MINOR

`EditorShell.vue:36` and `:46` both set `class="aspect-square w-8 …"` → **32 × 32 px**. That passes WCAG 2.2 SC 2.5.8 (Target Size Minimum, AA, 24 px) and **fails** SC 2.5.5 (AAA, 44 px). The interesting fact is not the AAA miss but that the demo **defines the remedy and never uses it**:

```
demo/styles/design-idioms.css:81  /* .tap-floor — the WCAG 2.5.5 44px minimum touch-target floor (box only). */
demo/styles/design-idioms.css:82  .tap-floor { min-height: 44px; min-width: 44px; }
```

`grep -rn "tap-floor" demo` → **2 hits, both the definition itself. Zero call-sites.** The shell's icon cluster is the canonical call-site and does not use it. Separately, `w-8` also under-rides glass-ui's own icon-button geometry: `Button`'s `size` defaults to `"md"` and `--size-icon-btn` is `2.5rem` (40 px), so the shell hand-tunes a published primitive down 20% with a raw utility rather than passing `size="sm"`.

For completeness and against my own case: glass-ui ships `@utility touch-hit-area` (`dist/styles/utilities/a11y-overrides.css`) which expands a `::before` to `--touch-target: 2.75rem` under `pointer: coarse` — but that pseudo carries `pointer-events: none`, so it does **not** enlarge the hit region. It is not the remedy; `.tap-floor` is.

**Falsifier.** An ancestor setting a larger min-size on these buttons — `.header-ribbon__band` sets `min-block-size` only (height), not width, and no demo rule targets the ribbon at all (D-1 falsifier grep).

### D-8 · The ribbon rides a z rung the shell's own contract does not document — MINOR

`style.css:18–40` declares the demo's stacking order as a closed, enumerated contract — `--z-behind −10 · --z-content 10 · --z-controls 20 · --z-bar 30 · --z-dock 40 · --z-overlay 50 · --z-popover 130 · --z-modal 140` — with "*There is NO demo-local z-scale; the demo OWNS the ORDER as a documented contract, strictly ascending*". `.header-ribbon` sets `z-index: var(--z-header)`, and `glass-ui/dist/styles/tokens/scheme-motion.css` resolves `--z-header: 35`. **35 is not in the contract.** The shell's only fixed chrome therefore paints at an undocumented rung, and the contract's completeness claim is false for the shell's own header.

Consequence, partly live: 35 < `--z-dock` 40, and both bands anchor to block-start — the ribbon at `inset-block-start: 0` + `padding: 1rem`, `ChromeDock` at `top: var(--dock-top-anchor)` (`ChromeDock.vue:215–216`, `fixed left-1/2 -translate-x-1/2 z-dock`). At rest the dock is centred and `:start-collapsed="true" :fit-content="true"`, so no overlap; expanded on a narrow viewport (glass-ui caps the dock pill at viewport − inset, per `style.css:284–288`) it can reach the top-right corner and, at z 40, would paint **over** the ribbon. `EditorShell.vue:29` asserts the opposite: "*Sits in the header ribbon, not over the dock band → no occlusion (inv δ)*" — true of the bottom dock, unestablished for the top one.

**Falsifier.** Measure at 375 × 667 with `ChromeDock` expanded whether its rect intersects x ∈ [width−28 px, width−16 px], y ∈ [16 px, 56 px]. **UNPROVEN-NEEDS-LIVE** for the occlusion; the z fact and the shared band are decidable now.

### D-9 · Zero forced-colors coverage in the demo layer — MINOR

```
$ grep -rn "forced-colors" demo   →  (no output)
```

The shell's *entire* visual identity below the chrome is a decorative `background-image` (`:249–259`) on a `bg-background` field — the class of paint most at risk under Windows High Contrast / `forced-colors: active`, where UA forcing of `color`/`background-color` can leave the gradient stack either untouched over a forced background (grid at wrong contrast) or dropped (identity gone). glass-ui supplies exactly two relevant rules: `.header-ribbon__band { border: 1px solid CanvasText }` (which at least makes D-1's 12 px sliver *bordered*) and focus-visible outlines including `.dark-mode-toggle-button`. The demo layer supplies none, and the shell is the natural owner of a forced-colors decision for its own substrate.

**Falsifier.** A `@media (forced-colors: active)` block in `demo/` — grep is empty. The **paint outcome** under forced colors is **UNPROVEN-NEEDS-LIVE**; the **absence of any handling** is decidable and is what I am filing.

### D-10 · `headerRibbonRef` is exposed and unused — MINOR

`EditorShell.vue:187` `useTemplateRef(...)`, `:197` `defineExpose({ headerRibbonRef })`. Consumers:

```
$ grep -rn "headerRibbonRef" demo
demo/components/instrument/shell/EditorShell.vue:16
demo/components/instrument/shell/EditorShell.vue:187
demo/components/instrument/shell/EditorShell.vue:197
```

Three hits, all inside the file. The shell publishes a component-instance handle on its public contract that nothing consumes — and the exposed handle is to a component whose only public surface is `placement`/`ariaLabel`/`class`, i.e. there is nothing imperative to reach for. `App.vue:171–173`'s comment about a shared ref refers to `CONTROLS_PANE_HOVER_KEY`, not this.

**Falsifier.** A consumer outside `demo/` (an external embedder of the shell) — none exists in this repo; `shell/index.ts` re-exports the component only.

### D-11 · The transport hard-cuts while the subject cross-fades — MINOR

`EditorShell.vue:76` `:key="superKey"` on `<AnimationControlsGroup>`. `superKey` is per-scene (`app/scene/scenes.ts:131–184` — a distinct id per scene), so **every scene switch fully unmounts and remounts** the controls pane, the rail, and the transport dock with no exit or enter transition. Meanwhile the subject it sits beside cross-fades: `App.vue:88` binds `:style="sceneSwapStyle"` on the scene host, and `App.vue:357`/`useSceneTransition.ts:18` document the glass-owned view-transition look. One half of the frame dissolves; the other half pops. The shell owns both sides of that seam and chose different motion for each.

**Falsifier.** Observe a scene switch: if the controls region is visually static across the swap (identical geometry, no content shift), the remount is imperceptible and this is INFO. **UNPROVEN-NEEDS-LIVE** for the perceived severity; the remount itself is decidable from `:key` + the per-scene `superKey`.

### D-12 · `--scale-hover` is a live token shadow with a currently-zero delta — MINOR

Census `lane-frontend.md` §6.3 flags the flat namespace abstractly ("*98 unprefixed demo custom properties sharing a global namespace with glass-ui's — worth a dedicated collision audit*"; `--kf-*` count **0**). EditorShell is a concrete instance. `:36`/`:46` apply `scale-on-hover`, a glass `@utility` (`dist/styles/utilities/btn.css`) that reads `var(--scale-hover)`. Both sides declare that token at `:root`:

- `glass-ui/dist/styles/tokens/scale-paper.css` → `--scale-hover: 1.08`
- `demo/styles/design-idioms.css:41` → `--scale-hover: 1.08` (comment: "*mirrors glass-ui's `--scale-hover`*")

The demo copy wins by import order and the values are identical, so the shadow is **invisible today** — which is the hazard: a glass-ui retune of `--scale-hover` will silently not reach any demo call-site, including this one, and nothing will fail. The same shape holds for `--color-gold` (`design-idioms.css:36` vs `glass-ui/dist/styles/theme/bridges.css`). For contrast, the shell's *own* `--graph-*` family has **no** glass counterpart (`grep -rno "\-\-graph-[a-z-]*:" glass-ui/dist` → empty), so those four are latent-only.

Credit where due: the scoped `--graph-line-fine` / `--graph-line-major` (`:239, :244`) are declared **inside `.grid-background`**, not at `:root` — correctly scoped, and the right pattern the four `layout.css` tokens do not follow.

**Falsifier.** Remove `design-idioms.css:41` and observe no visual change today — which is the point, and confirms rather than refutes.

### D-13 · `#backdrop` has no out-of-flow contract — INFO

`EditorShell.vue:5–10` documents the slot as "*Empty by default (no layer, no cost)*" and relies on the host's content being out of flow. The root is `grid … place-items-center` (`:3`) and `<main>` is its **single in-flow item** (see S-1). An in-flow host backdrop would become a second auto row and displace `main`. The App's `HeroAurora` is `fixed inset-0` (`HeroAurora.vue:21`), so the contract holds today by the host's discipline, not the shell's construction. A one-line `position: absolute; inset: 0` wrapper (or `display: contents` on the slot host) would make it structural.

**Falsifier.** A second host supplying in-flow backdrop content — none exists.

### D-14 · One command, four names — INFO

| surface | string | provenance |
|---|---|---|
| accessible name | "Show keyboard shortcuts" | `EditorShell.vue:35` |
| visible tooltip | "Keyboard shortcuts (?)" | `EditorShell.vue:42` |
| shortcut-registry label | "Show shortcuts" | `EditorShell.vue:190` |
| modal title / description | "Keyboard Shortcuts" / "Press `?` to toggle this panel" | `KeyboardShortcutsModal.vue:5, :7` |

Nothing here is trite or cliché — the copy is short, concrete, and free of the "Effortlessly…/Seamlessly…" register; the dock menu's supporting lines ("Copy link or load shared state", "Reset every saved animation to defaults", `MbabbMenu.vue:12, :50`) are genuinely good microcopy. The defect is single-sourcing: the shortcuts modal renders `shortcut.options.label` (`KeyboardShortcutsModal.vue:22`), so the button that opens the modal will list itself in that modal under a **third** name that matches neither its accname nor its tooltip. Also redundant: the modal's `DialogDescription` "Press `?` to toggle this panel" duplicates the row the registry already renders for `?`.

**Falsifier.** A ruling that the registry label is deliberately terser for the modal's narrow (`max-w-md`) column. Plausible — hence INFO, not MINOR.

---

## 4. Cleared — hypotheses I raised and killed against the tree

Recorded because a false defect is worse than a missed one, and because each is a plausible-looking trap for the next auditor.

**C-1 · "The 19 shortcuts leak on every scene switch."** `AnimationControlsGroup` is `:key="superKey"`-remounted (D-11) and `useControlsKeyboardShortcuts` (`AnimationControlsGroup/useControlsKeyboardShortcuts.ts:50–71`) fires 18 bare `registerShortcut(...)` calls and returns `void`, discarding every unregister function — which looked like guaranteed duplicate rows in the shell's own shortcuts modal. **FALSIFIED.** `glass-ui/dist/keyboard.js`:

```js
function y(e, r, i = {}) { … a.add(s), o.value++;
    let l = () => { a.delete(s) && o.value++; };
    return t() && n(l), l; }        // t = getCurrentScope, n = onScopeDispose
```

`registerShortcut` **self-registers `onScopeDispose`** when called inside an active effect scope. Both this composable and `EditorShell.vue:190` are called from `<script setup>`, so cleanup is automatic. No leak, no duplicate modal rows. **No defect.**

**C-2 · "`<Transition name="fade" appear>` (`:52`) is dead — no `.fade-*` CSS."** **FALSIFIED.** `glass-ui/dist/styles/transitions.css` defines `.fade-enter-active/.fade-leave-active { transition: opacity var(--duration-fast) var(--ease-standard) }` + `.fade-enter-from/.fade-leave-to { opacity: 0 }`, **and** guards them under `@media (prefers-reduced-motion: reduce)`. The transition works and is PRM-honest.

**C-3 · "`scale-on-hover` is an unguarded transform under PRM."** **FALSIFIED, and better than expected.** `glass-ui/dist/styles/utilities/a11y-overrides.css` under `prefers-reduced-motion: reduce` sets `*:not([data-allow-motion]) { transition-duration: 0.1s !important; transition-property: opacity, color, background-color, border-color, box-shadow !important }` — the property list **excludes `scale`**, so the hover lift snaps with zero motion under PRM rather than animating faster. Correct behaviour, inherited. EditorShell carries **no local `@media (prefers-reduced-motion)` block and needs none**: it authors no animation of its own (census §6.5 lists 13 PRM sites; this file is correctly not among them, and the delegation — unverified in the census — **verifies here**).

**C-4 · "`<Tooltip>` at `:30` will throw without a `TooltipProvider` ancestor."** The nearest in-file provider is inside `AnimationControlsGroup` (`:2`), a *sibling* subtree, not an ancestor of the ribbon — and the tree contains a scar from exactly this failure mode (`CubeScene.vue:39–48`, orphaned reka context throwing "Injection … not found"). **FALSIFIED for every host that exists:** `App.vue:3` wraps the whole shell in `<TooltipProvider>` with the comment "*Shared shell tooltip triggers require one application-lifetime provider*", and `App.vue:28` is the only `EditorShell` mount site in the repo. The shell's dependence on an ancestor it does not provide is a real contract fragility, but with a single host that provides it, it is **not a defect** — noting it here rather than inflating the count.

---

## 5. Superlatives (L-18 runs both ways)

### S-1 · The `<main>` landmark box, and its precondition actually holds

`EditorShell.vue:67–74`:

> *"A REAL layout box — not `display:contents`, which strips the box AND the implicit `main` role from the a11y tree. `place-self-stretch` fills the grid's single center cell … byte-identical layout, real landmark box."*

Both halves are right, and the second half is the one that is usually wrong in this pattern. `display: contents` on an element with an implicit role has a documented history of dropping that element from the accessibility tree in shipping engines — choosing a real box is the correct fix, not a superstition. And the "single center cell" precondition **verifies against the tree**: enumerate the root grid's children — `#backdrop` (`HeroAurora`, `fixed`), `.grid-background` (`fixed`), `HeaderRibbon` (`position: fixed` per its own `styles.css`), the start-screen wrapper (`absolute`), `KeyboardShortcutsModal` (a portalled `Dialog` with no trigger ⇒ nothing in place) — **every one is out of flow**, leaving `<main>` as the sole in-flow grid item. With `grid-auto-rows: auto` and default `align-content: normal` (stretch) the single row fills `h-dvh`, and `place-self-stretch` fills it. The comment's layout-equivalence claim is not hand-waving; it is true for a checkable reason.
**Falsifier.** Any host that supplies in-flow `#backdrop`, `#header-left`, or `#header-right` content — see D-13; none does.

### S-2 · The `dvh` fallback covers width, in the right layer, for the right reason

`EditorShell.vue:208–221` guards `@supports not (height: 100dvh)` and supplies **both** `height/max-height: 100vh` **and** `width: 100vw`, with the reasoning made explicit at `:209–211`: "*A browser without `dvh` also lacks `dvw` (same spec)*". That inference is correct and it is the half practitioners routinely omit — `h-dvh` fallbacks that leave `w-dvw` to collapse are common. The cascade placement is also right by construction rather than by luck: the scoped block is **unlayered**, so it out-cascades Tailwind's `@layer utilities` `h-dvh`/`w-dvw` regardless of specificity, which is exactly what a fallback must do. `HeroAurora.vue:122–127` mirrors the same guard on the backdrop layer, so the two co-sized fixed layers degrade together.
**Falsifier.** A browser shipping `dvw` without `dvh` (none known), or a Tailwind build emitting `h-dvh` unlayered (v4 emits into `@layer utilities`).

### S-3 · Backdrop layering by DOM order, zero `z-index` — and it verifies

`EditorShell.vue:5–9` puts `#backdrop` **before** `.grid-background` and claims the wash therefore paints over `bg-background` but under the ink lines, "*no z-index games*". Checked end-to-end: `HeroAurora.vue:20–23` is `fixed inset-0` with **no `z-index`**, `.grid-background` (`:13`) is `fixed inset-0` with **no `z-index`** — two positioned, `z-index: auto` boxes, which CSS paints in document order. The claim is true, and `HeroAurora.vue:115–117` states the same contract from the other side, so the two files agree. Neither creates a containing block on `.editor-shell` (no `transform`/`filter`/`contain`), so both resolve against the viewport as intended despite the root's `overflow-hidden`. Restraint here is worth naming precisely because the file's neighbours reach for the z-scale for less (`style.css:18–40`), and because D-8 shows what happens when a layer *does* take a rung.
**Falsifier.** A `z-index` added to either layer, or a `transform`/`filter`/`will-change`/`contain: paint` landing on `.editor-shell` — at which point both `fixed` layers reparent to the shell box and the stacking argument needs re-deriving.

---

## 6. Census reconciliation

| census id | this challenge |
|---|---|
| **F-1** (glass-ui phantom dep, RED) | Not re-litigated. But note the dependency: **D-1's whole diagnosis rests on the version in `node_modules`** — an undeclared, unlocked `7.0.0`. If a lockfile fix pins a *different* version, `mode`/`inert` behaviour must be re-derived. F-1 is a precondition for auditing this component at all. |
| **S-2** (type-only `/tabs` consumption, AMBER) | `EditorShell.vue:126` is one of the three cited sites; the shell is a **carrier** of that seam — it imports `SegmentedTabOption` type-only and threads it as the `extraTabs` prop (`:169`) into a strip the demo re-implements. No contradiction; noted as scope. |
| **§6.3** (`--kf-*` = 0, flat namespace "worth a lane of its own") | **Made concrete — D-12.** `--scale-hover` and `--color-gold` are *live* shadows with zero current delta; `--graph-*` is latent-only (glass has no counterpart). Refines the census's abstract hazard into a two-class taxonomy. |
| **§6.5** (13 PRM sites; delegation "correct if it holds, unverified statically") | **Verified for this component — C-2/C-3.** EditorShell authors no animation and correctly carries no local PRM guard; the delegation to `transitions.css` + `a11y-overrides.css` holds, with the bonus that `transition-property` excludes `scale`. |
| **§4** (roster: EditorShell 261 L, "shell frame — HeaderRibbon, registerShortcut, DarkModeToggle, Button, Tooltip*") | Confirmed, no contradiction. |
| **§3.1** (`/header-ribbon` = 1 consumption) | Confirmed and load-bearing for D-1: nothing else in the tree exercises the ribbon, so the collapsed-and-inert default has never had a second chance to be caught. |

---

## 7. Recommended order (design axis only; no code was written)

1. **D-1** — supply an `#anchor` slot (a real, labelled, ≥44 px trigger), or move the three actions out of the collapsible ribbon entirely. Nothing else on this axis matters while three controls are `inert`. Delete `mode="persistent"`.
2. **D-3 / D-4** — decide the single home for Share and Dark mode (the `MbabbMenu` rows are the stronger candidates), leaving the shortcuts trigger as the ribbon's sole tenant with **one** disclosure idiom.
3. **D-2** — split `--graph-opacity` / `--graph-major-opacity` into per-arm values (light needs roughly 3–4× the alpha to match the dark arm's ΔL*), or accept the asymmetry and correct `:231–233`.
4. **D-5** — one-line truth pass on the scoped comment + fallbacks.
5. **D-7 / D-9** — adopt `.tap-floor` at the icon cluster; make one forced-colors decision for `.grid-background`.
6. **D-6, D-8, D-10, D-11, D-12** — cheap, independent, each a single edit or a single ruling.

## Provenance note

Every glass-ui fact is read from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — the copy the demo actually resolves — never from the producer repo. Contrast and ΔL* figures are computed from the token values quoted inline (sRGB → linear → WCAG relative luminance; L* via the CIE cube-root transfer), and are reproducible from this file alone. No file in `keyframes.js` was written, mutated, or executed; no installs, no dev server, no browser. The single write of this task is this document.

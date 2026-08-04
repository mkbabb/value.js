claude-opus-5[1m]

# CHALLENGE — `CollapsibleSection` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/CollapsibleSection.vue` (72 lines, verified `wc -l`)
**Posture** DEFECTIVE-until-proven. Static + source-derived only; no browser tooling. Livable-only claims are tagged `UNPROVEN-NEEDS-LIVE (SS-13)`.
**Repo law** `fourier-analysis` is READ-ONLY evidence; the only write in this task is this file.

**Verdict** — `13 defects / 1 blocker / 5 superlatives`. The wrapper's *markup* is close to exemplary (it delegates disclosure a11y wholesale and it gets the one thing most disclosure wrappers get wrong — actions outside the trigger — right). Its *script* is where the component fails: a 15-line `watch` that reaches out of its own subtree, probes ancestor DOM by literal Tailwind class string, and drives an ungated `behavior: "smooth"` scroll from an uncancelled timer. Its *style block* is 18 lines that the substrate already ships.

---

## 0. Read set (whole-file, read-only)

| File | Why |
|---|---|
| `web/src/components/ui/CollapsibleSection.vue` | target |
| `web/node_modules/@mkbabb/glass-ui/dist/CollapsibleContent-C_s6fG7r.js` | the three imported components, compiled (glass-ui ships no `src/`) |
| `.../glass-ui/dist/components/ui/collapsible/{Collapsible,CollapsibleTrigger,CollapsibleContent}.vue.d.ts` | the imported TYPE surface |
| `.../glass-ui/dist/styles/{index,animations}.css`, `.../styles/tokens/scheme-motion.css`, `.../styles/utilities/a11y-overrides.css` | the CSS names + tokens the `<style scoped>` block consumes |
| `web/node_modules/reka-ui/dist/Collapsible/{CollapsibleRoot,CollapsibleContent}.js`, `.../shared/useForwardProps{,Emits}.js` | what actually reaches the DOM through glass-ui's forwarding |
| `web/node_modules/tw-animate-css/dist/tw-animate.css` | `@keyframes collapsible-{down,up}` + the `--animate-*` theme vars glass-ui's Content class references |
| all 4 callsites: `visualization/ContourPreview.vue`, `equation/EqCoefficientsPanel.vue`, `equation/FunctionInput.vue` (×2) | consumer contract |
| `shared/CoefficientsSpectrum.vue`, `equation/EquationView.vue`, `visualization/{VisualizationView,ContourSettings}.vue`, `App.vue` | the state and the scroll ancestry the wrapper mutates |
| `web/e2e/*.spec.ts`, `web/package.json` | coverage |

`lucide-vue-next`'s `ChevronRight` and `vue`'s `ref`/`watch` are the remaining imports; nothing surprising in either.

---

## 1. BLOCKER

### L-1 · BLOCKER · a11y/motion contract — the JS scroll path is not reduced-motion gated, in a file that gates its CSS

`CollapsibleSection.vue:27`

```js
el.scrollIntoView({ behavior: 'smooth', block: 'end' });
```

The same file, 38 lines later, proves the author knows the contract:

```css
/* CollapsibleSection.vue:65-70 */
@media (prefers-reduced-motion: reduce) {
    .collapsible-content[data-state="open"],
    .collapsible-content[data-state="closed"] { animation: none; }
}
```

The CSS half of the motion contract is honoured; the JS half — a *spatial, page-level, user-triggered* animation, exactly the class WCAG 2.3.3 / the vestibular-safety guidance targets — is not. `grep -n "matchMedia" CollapsibleSection.vue` → **empty**; the file never consults `prefers-reduced-motion` from script. Nor does the substrate cover it: glass-ui's blanket at `dist/styles/utilities/a11y-overrides.css:6-10` is

```css
@media (prefers-reduced-motion: reduce) { *:not([data-allow-motion]) {
    animation-duration: .01ms !important; animation-iteration-count: 1 !important; } }
```

— `animation-*` only. CSS cannot reach a `ScrollIntoViewOptions.behavior` value, and `scroll-behavior: auto` on an ancestor does **not** override an explicit `behavior: "smooth"` argument (the CSS property is only the *fallback* for `behavior: "auto"`). So under `prefers-reduced-motion: reduce` this component still smooth-scrolls the page on every section open, in a build that ships 8 other `prefers-reduced-motion` blocks (lane-frontend.md:619 enumerates them, this file among them) — i.e. the project's own motion posture is violated by the one component that reaches for the scroller.

Aggravating: there is no opt-out. The prop surface is `{ title, subtitle?, defaultOpen? }` (lines 5-9); no `scrollOnOpen`, no `disableScroll`. All 4 callsites inherit the behaviour unconditionally.

**Falsifier (would kill this claim):** any of — (a) a `prefers-reduced-motion` query in the script block; (b) `behavior: "auto"` or a computed behavior; (c) a substrate rule that neutralises programmatic smooth scrolling; (d) an opt-out prop. Checked all four: (a) absent (`grep matchMedia` → ∅), (b) literal `'smooth'` at :27, (c) `a11y-overrides.css` touches `animation-duration`/`animation-iteration-count`/`transition-duration` only, (d) prop surface is 3 keys.

---

## 2. MAJOR

### L-2 · MAJOR · wrong types→wrong box — the scroll-parent probe matches on literal utility class *strings* and silently resolves the wrong ancestor

`CollapsibleSection.vue:24`

```js
const scrollParent = el.closest('.overflow-y-auto, .overflow-auto') ?? el.parentElement;
```

`closest()` matches the *class attribute*, not the computed style. Both real scroll containers under this component are declared where that string never lands:

| route | real clipping ancestor | how overflow is declared | literal class present? |
|---|---|---|---|
| equation | `.eq-panel-left` — `EquationView.vue:198` wraps `FunctionInput` + `EqCoefficientsPanel` | `EquationView.vue:373-375` → `@apply flex flex-col gap-3 w-full pb-8 overflow-y-auto min-h-0 flex-1;` inside `<style scoped>` | **no** — the element renders `class="eq-panel-left"` |
| visualization | `.viz-panel-left` — `VisualizationView.vue:255-257` wraps `ContourPreview` | `VisualizationView.vue:363-371` — `display/flex-direction/gap/width/padding/min-height/flex`, **no `overflow` at all** | **no** |

`@apply` inlines the *declarations*, never the class token. So `closest()` walks straight past both and matches the first literal occurrence upward, which is `App.vue:26`:

```html
<main class="flex-1 min-h-0 flex flex-col overflow-y-auto">
```

The predicate on the next line then compares the section's box against `<main>`:

```js
if (scrollParent && rect.bottom > scrollParent.getBoundingClientRect().bottom) { … }
```

`<main>` is `flex-1 min-h-0` inside a `h-dvh … overflow-hidden` shell (`App.vue:23`), and the *inner* panel is the one with `min-h-0 flex-1 overflow-y-auto` — so `<main>`'s bottom ≈ the inner scroller's bottom, and the guard is *accidentally* near-right in the equation route and structurally wrong in the visualization route (where `.viz-panel-left` never scrolls and the comparison is meaningless). The `?? el.parentElement` fallback is unreachable in both routes (there is always a `<main>` above), and would be wrong anyway: `el.parentElement` is `div.cartoon-card px-3 py-2` (`ContourPreview.vue:33`, `EqCoefficientsPanel.vue:12`, `FunctionInput.vue:93/175`), whose bottom is always ≥ the section's bottom by the `py-2` padding — so that branch can never satisfy `rect.bottom > parent.bottom` and the scroll would be dead code.

This is also a layering violation on the LIBRARY axis proper: a component in `ui/` — the shared-primitive folder — encodes knowledge of two route-specific layout shells by string-matching their utility classes. The coupling is invisible to both compilers: TypeScript sees a `string` selector, Tailwind sees a class it will happily tree-shake out of existence in a build where no element literally uses it.

**Falsifier:** show either scroll ancestor rendering `overflow-y-auto`/`overflow-auto` as a literal token in its `class` attribute, or show a `getComputedStyle`-based resolution. Neither exists — `grep -rn "overflow-y-auto\|overflow-auto" src/` returns 7 hits, and the only ones in the ancestor chain are `App.vue:26` (`<main>`) and `CoefficientsSpectrum.vue:78` (a *descendant*, so `closest()` cannot see it).

### L-3 · MAJOR · composable contract — the wrapper hard-swallows `unmountOnHide`, so collapsing destroys descendant state

The wrapper renders `<Collapsible ref="rootEl" v-model:open="open" class="collapsible-section">` (line 33) and forwards nothing else. Trace what reaches reka:

1. glass-ui's `Collapsible` declares `unmountOnHide: { type: Boolean }` with **no default** (`CollapsibleContent-C_s6fG7r.js`, the `p` component) and forwards via `useForwardPropsEmits`.
2. `reka-ui/dist/shared/useForwardProps.js` builds its output from `vm.vnode.props` (the keys *literally written at the callsite*) ∪ declared defaults, then keeps only keys whose resolved value `!== undefined`. The callsite writes `ref`, `open`, `onUpdate:open`, `class`; glass-ui declares no defaults. Net forwarded payload: **`{ open }`** plus the emit-as-prop.
3. `unmountOnHide` therefore never arrives, and `reka-ui/dist/Collapsible/CollapsibleRoot.js` applies its own declared `default: true`.
4. `CollapsibleContent.js` consumes it as `(unref(rootContext).unmountOnHide.value ? present : true) ? renderSlot(...) : createCommentVNode(...)` — i.e. **closed ⇒ the entire default slot is torn out of the tree**.

Concrete loss, `EqCoefficientsPanel.vue:13-15` → `CoefficientsSpectrum.vue:35`:

```js
const expanded = ref(false);           // CoefficientsSpectrum.vue:35
const topComponents = computed(() => props.components.slice(0, expanded.value ? 40 : 12));
```

**Failure scenario.** User opens "Coefficients", clicks "Show more (N total)" (`CoefficientsSpectrum.vue:124-133`) → 40 rows. User collapses the section to see the plot. User reopens → back to 12 rows, silently. Same reopen also remounts the `<TransitionGroup name="coeff-list">` (`:79`) so all 12-40 `coeff-list-enter-active` transitions replay, and every `AnimatedDigit` (`:98-102`) restarts its damped numeral ramp from scratch — a full re-animation storm on a control the user pressed to *reveal existing data*.

The wrapper offers no escape: `forceMount` is a real prop on glass-ui's `CollapsibleContent` (`.../CollapsibleContent.vue.d.ts` → `CollapsibleContentProps`) and `unmountOnHide` a real prop on `Collapsible`, and the wrapper exposes neither, has no `v-bind="$attrs"` passthrough on either child, and (see L-6) no `defineExpose`. A consumer that needs persistence must abandon the wrapper — which is precisely what `ContourSettings.vue` did (L-9).

**Falsifier:** show `unmountOnHide` or `forceMount` reaching the primitive, or show reka defaulting `unmountOnHide` to `false`. Both checked: `useForwardProps.js` reduce-body is `if (refProps.value[curr] !== void 0) prev[curr] = refProps.value[curr]` over `Object.keys({...defaultProps, ...preservedProps})`, and `CollapsibleRoot.js` declares `unmountOnHide: { type: Boolean, required: false, default: true }`.

### L-4 · MAJOR · unsound dead branch — the `?? rootEl.value` fallback would throw, and `$el: any` launders the error past `vue-tsc`

`CollapsibleSection.vue:19-21`

```js
const el = rootEl.value?.$el ?? rootEl.value;
if (!el) return;
const rect = el.getBoundingClientRect();
```

`rootEl` is declared `ref<InstanceType<typeof Collapsible> | null>(null)` (line 16) — a **component instance** type. The code then treats `el` as an **Element** (`getBoundingClientRect`, `closest`, `scrollIntoView`). The `?? rootEl.value` right-hand side hands the *component proxy* to those three Element methods. A component public instance has none of them; if that branch is ever taken the very next line is a `TypeError: el.getBoundingClientRect is not a function`.

TypeScript cannot catch it: Vue types `ComponentPublicInstance["$el"]` as `any`, so `any ?? Instance` widens to `any` and every subsequent member access is unchecked. I verified the surrounding type resolution rather than assume it — see S-5, where the ref's *declared* type turns out fine; the hole is `$el`, not `InstanceType`.

At runtime today the branch is unreachable — glass-ui's `Collapsible` has a single root (`createBlock(CollapsibleRoot, …)` → `Primitive`, default `as: "div"`), so `instance.vnode.el` is an `HTMLDivElement`. It becomes live the moment anyone passes `as-child`/`as` through, or the moment glass-ui's wrapper grows a second root node — at which point `vnode.el` is a fragment anchor `Text` node (no `getBoundingClientRect`) and the `??` never even fires because `$el` is truthy-but-wrong. Either way the expression is a guard that guards nothing: the honest form is `const el = rootEl.value?.$el; if (!(el instanceof HTMLElement)) return;`.

**Falsifier:** show a runtime path where `$el` is nullish *and* `rootEl.value` is Element-like. There is none — a component ref is never an Element in Vue 3.

### L-5 · MAJOR · leak/teardown — the timer is never cancelled, on unmount or on re-toggle

`CollapsibleSection.vue:19-29`

```js
watch(open, (isOpen) => { if (isOpen) { setTimeout(() => { … }, 250) } })
```

No handle is retained. `grep -n "onUnmounted\|clearTimeout" CollapsibleSection.vue` → **empty**; the imports are `{ ref, watch }` (line 3) only. Two consequences:

1. **Queued duplicate scrolls.** Toggling open→closed→open inside 250 ms leaves *two* pending callbacks; both survive, both re-read `rootEl.value`, both call `scrollIntoView({behavior:'smooth'})`. Smooth scrolls issued back-to-back on the same scroller cancel and restart each other, so the user gets a visible stutter. Nothing debounces or dedupes.
2. **Post-teardown work.** `EqCoefficientsPanel` lives behind `v-if="components.length"` inside a `<Transition name="slide-down">` (`EquationView.vue:212-214`); recomputing to an empty spectrum unmounts it. If that lands inside the 250 ms window the callback still runs after teardown. It does *not* crash — Vue nulls template refs on unmount and `if (!el) return` (line 21) catches it — but it is exactly the shape that surfaces as "an operation was scheduled after teardown" in a test runner, and it is a defect on the leaks/teardown criterion regardless of whether today's guard happens to absorb it.

The correct shape is one line: `watch(open, (isOpen, _o, onCleanup) => { … ; onCleanup(() => clearTimeout(t)) })`. Vue's `watch` cleanup handles both the unmount and the re-fire case; the component uses neither.

**Falsifier:** an `onUnmounted`, an `onCleanup`, a stored handle, or a `{ flush }`/`watchEffect` cleanup. All absent.

---

## 3. MINOR

### L-6 · MINOR · composable contract — `defaultOpen` is a one-shot copy and the open state is write-only

`CollapsibleSection.vue:15` — `const open = ref(props.defaultOpen)`. No `watch(() => props.defaultOpen, …)`; a parent that flips the prop after mount is ignored. That is defensible for a prop *named* `default*`, but the component pairs it with **no** `update:open` emit, **no** `v-model:open` support, and **no** `defineExpose` (`grep -n "defineEmits\|defineExpose\|defineSlots"` → empty). So the open state is neither controllable nor observable from outside: a parent cannot open a section programmatically (e.g. `VisualizationView` entering edit mode and wanting "Preview" open), cannot persist section state across the route swap at `VisualizationView.vue:254` (`<Transition name="panel-swap" mode="out-in">` remounts the whole panel → every section resets to its `defaultOpen`), and cannot even read which sections are open. glass-ui's `Collapsible` emits `update:open` (`Collapsible.vue.d.ts`) and the wrapper consumes it internally and drops it on the floor.

**Falsifier:** any emit, expose, or prop-watch. None.

### L-7 · MINOR · magic number, drifted from its own referent

`CollapsibleSection.vue:28` — `}, 250)`, commented "Scroll into view after the open animation completes". The animation this file declares is `0.2s` (lines 61 and 64). 250 ≠ 200, the 50 ms fudge is unexplained and untokenised, and neither number derives from the other — edit one and the pair drifts silently. Worse under `prefers-reduced-motion`, where lines 65-70 null the animation to 0 ms but the 250 ms delay still elapses: reduced-motion users get the *longest* dead wait before the (also ungated, L-1) scroll.

**Falsifier:** a shared token or a transition/animation-end listener. Neither; `250` is a literal.

### L-8 · MINOR · duplication — the whole `<style scoped>` block restates what the substrate already applies to that element

`CollapsibleSection.vue:53-70` (18 lines). Every rule is already on the element:

| local rule | already shipped by |
|---|---|
| `.collapsible-content { overflow: hidden }` (53-55) | glass-ui `CollapsibleContent` renders `class="overflow-hidden transition-collapse data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"` — `CollapsibleContent-C_s6fG7r.js`, component `h` |
| `[data-state="open"] { animation: collapsible-open .2s var(--ease-out) }` (60-62) | `data-[state=open]:animate-collapsible-down` → `--animate-collapsible-down` → `@keyframes collapsible-down { from{height:0} to{height:var(--reka-collapsible-content-height,…)} }` (`tw-animate-css/dist/tw-animate.css`) |
| `[data-state="closed"] { animation: collapsible-close … }` (63-65) | `data-[state=closed]:animate-collapsible-up`, ditto |
| the `prefers-reduced-motion` block (66-70) | glass-ui `dist/styles/utilities/a11y-overrides.css:6-10`, `*:not([data-allow-motion]) { animation-duration:.01ms !important; animation-iteration-count:1 !important }` |

The local rules do *win* the cascade (scoped `.collapsible-content[data-state="open"][data-v-…]` beats the Tailwind variant utility), so what ships is the wrapper's near-identical restatement of the substrate animation rather than the substrate's own — the difference being that `collapsible-open`/`collapsible-close` additionally cross-fade opacity. That is a legitimate design choice, but the header comment sells it as the opposite:

```
/* A.W3.d — `collapsible-open` / `collapsible-close` are canonical glass-ui
   animations …; the consumer-side shadow rules have been excised. */
```

The consumer-side rules were *not* excised — they are the six lines directly beneath the comment, and they shadow the substrate's own `animate-collapsible-{down,up}`. The comment is true about the *keyframe names* and false about the *rules*. (`UNPROVEN-NEEDS-LIVE (SS-13)` on one sub-point only: whether Vue's scope-id reaches the DOM element through reka's `<Presence>` scoped-slot boundary. If it does not, the local rules never match and the substrate utility paints instead — visually near-identical, and the reduced-motion blanket still holds, so no user-visible failure either way. The duplication claim itself is static and stands regardless.)

### L-9 · MINOR · duplication/colocation — a second, hand-rolled copy of this component lives in `ContourSettings.vue`

`ContourSettings.vue:8-12` imports `Collapsible`/`CollapsibleTrigger`/`CollapsibleContent` directly and re-implements the wrapper at `:255-307`, including a verbatim ChevronRight affordance (`:260` — `<ChevronRight class="h-3 w-3 … transition-transform duration-200" :class="{ 'rotate-90': advancedOpen }" />` vs `CollapsibleSection.vue:38`, identical but for `h-3 w-3`/`h-4 w-4`) and a verbatim 15-line CSS block (`:361-375`) that is a character-level copy of `CollapsibleSection.vue:53-70` with `.collapsible-content` → `.advanced-content`. Its comment even says so: *"the same substrate animation `CollapsibleSection` adopted at A.W3.d"* (`:358`). Two implementations, one idiom, and the fork is not gratuitous — it exists because the wrapper's API is too narrow (no trigger slot, so the divider-line-flanked "Advanced" affordance is unbuildable through it; L-3's missing `unmountOnHide` is the other axis). The census already flags this as one of exactly three bespoke glass-ui wrappers (`lane-frontend.md:368`); the duplicate raises the true count.

### L-10 · MINOR · dead code — `<slot name="actions" />` is unused, undocumented and untyped

`CollapsibleSection.vue:44`. `grep -rn "#actions\|v-slot:actions" src/` → **∅**. Zero of the four callsites fill it, there is no `defineSlots<…>()`, and there is no comment or prop-doc announcing it. It is not free: it forces the header into a `flex w-full` row wrapper (line 34) whose only job is to give the empty slot a place to sit. Either type it and use it or delete both it and the wrapper div.

### L-11 · MINOR · test posture — the component has no coverage of any kind

`web/package.json` scripts: `dev`, `build`, `preview`, `test:e2e`, `test:e2e:ui`. There is no vitest, no `@vue/test-utils`, no unit-test harness in `web/` at all. On the e2e side, the four section titles this component renders — "Preview", "Coefficients", "Function", "Controls" — appear in **zero** specs (`grep -rn "\"Preview\"\|Coefficients\|hasText: \"Function\"\|hasText: \"Controls\"" e2e/*.spec.ts` → ∅). The two specs that touch a collapsible reach `ContourSettings`' hand-rolled one instead (`contour-extraction.spec.ts:60-61` filters on `hasText: "Contour"`; `paper-performance.spec.ts:125-126` reads a raw `[data-state]`). So every defect above — the ungated scroll, the mis-resolved scroll parent, the state loss on collapse — is unguarded by any regression gate. That is the reason L-1..L-5 can co-exist in a 72-line file that has been through two documented reformation passes (`A.W3.d`, `B.W2.d`).

### L-12 · MINOR · document structure — the section title carries no heading semantics

`CollapsibleSection.vue:39-42` renders the title as `<span class="cm-serif text-sm font-semibold tracking-tight">` inside the trigger `<button>`. Four content sections on the two primary routes therefore contribute nothing to the heading outline. reka gives the disclosure semantics for free (`aria-expanded`/`aria-controls`, `type="button"`, keyboard) but cannot supply a heading level — the standard pattern is `<h3><CollapsibleTrigger>…</CollapsibleTrigger></h3>` with an `as`/level prop. Flagged here rather than on the A axis because it is a *prop-surface* gap: the component has no way to express it.

### L-13 · MINOR · derivation model (R5-7 class, inverted polarity) — this wrapper is a visibility gate on instance evidence

The intake lane's `R5-7` (`lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT, carry → F.W4) establishes that template-loop evidence keyed to *component* callsites is blind to native element loops, evidenced by `instance.loop.paper-sidebar` deriving `[]` while the populated sibling `instance.loop.presets` is keyed by `"callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0"`.

**Contribution, not restatement.** That exact `presets` callsite lives *inside a `CollapsibleSection` default slot*: `FunctionInput.vue:94` opens `<CollapsibleSection title="Function" …>`, `:157` is the `<Tooltip v-for="preset in PRESETS" :key="preset.name">` loop, `:171` closes the section. Combined with L-3 (`unmountOnHide` defaults `true`, slot torn out when closed) this makes `CollapsibleSection` a **conditional gate on the R5-7 evidence surface**, and the polarity is the *opposite* of the PaperSidebar case:

- PaperSidebar: source has 3 native `li v-for`s (lines 65/87/105, live-verified in R6-5) that the derivation **under**-counts to `[]`.
- CollapsibleSection: source has a registered `Tooltip` callsite the derivation counts once, but the DOM holds `PRESETS.length` instances **only while the section is open** — and for `EqCoefficientsPanel.vue:13` (`:default-open="false"`) the entire `CoefficientsSpectrum` subtree, including its own `Tooltip v-for` at `CoefficientsSpectrum.vue:80-83`, is **never in the DOM at boot at all**. Source-derived evidence **over**-counts what any live/DOM probe can see.

So a per-component D/L/C audit that reconciles derived-registry leaves against a live DOM census will read a false negative on every subtree behind a closed `CollapsibleSection` — the same *class* of defect as R5-7 (derived evidence and instance evidence disagreeing because the derivation's keying model does not match the runtime's), reached from the other side. **Carry:** F.W4's per-component loop count must record the enclosing disclosure state, or explicitly force-mount, before comparing derived to live. This does not contradict R5-7/R6-5; it extends the failure mode they opened.

`UNPROVEN-NEEDS-LIVE (SS-13)` on the DOM-census half (no browser tooling used); the source half — the nesting at `FunctionInput.vue:94/157/171`, the `:default-open="false"` at `EqCoefficientsPanel.vue:13`, and reka's `unmountOnHide` default — is fully static and verified above.

---

## 4. Viz render path — where this component touches it

Census `CENSUS-2026-08-03.md:85-86`: *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; …)"*, and `:96-97` on `BasisCanvas` + `canvas-drawing/` (1 311 LOC Canvas2D) vs glass-ui's GPU-backed `FourierField`.

**Negative result, stated so the next lane does not re-derive it:** none of the three canvases is under a `CollapsibleSection` today. The four callsites enclose an inline `<svg>` (`ContourPreview.vue:36-50`), a DOM bar-chart (`CoefficientsSpectrum`), and two forms. So L-3's unmount-on-collapse does **not** currently destroy and rebuild a 2D context, and no context-count ceiling is at risk.

Two live couplings remain:

1. **Forced synchronous layout on a rAF-driven route.** The timer body performs `el.getBoundingClientRect()` (line 22) and then `scrollParent.getBoundingClientRect()` (line 25) — two forced reflows over the full document — 250 ms after each open, on the same routes where a canvas instrument is redrawing off a store rAF clock. One-off per open, so a frame-budget nick rather than a stall; recorded as INFO under L-2's umbrella rather than as a separate defect. `UNPROVEN-NEEDS-LIVE (SS-13)` for the magnitude.
2. **A one-adoption-away hazard.** `CoefficientsSpectrum` exists precisely because the equation route's `EqCoefficientsPanel` and the visualization route's `CoefficientsPanel` were *"~95% identical"* (`CoefficientsSpectrum.vue:4-9`), the sole divergence being the visualization route's `FrequencyGraph`, hoisted to the `#graph` slot. The equation-route consumer wraps that shared component in a `CollapsibleSection`; the visualization-route one does not. The moment the remaining 5% is closed by giving `CoefficientsPanel` the same wrapper — the obvious next convergence step — the `#graph` payload enters the unmount-on-collapse path of L-3, and a canvas *does* start being destroyed and rebuilt on every toggle. L-3 should be fixed before that convergence, not after.

Also noted and **explicitly attributed elsewhere** (not counted against this component): `ContourPreview.vue:26-28` computes `const pad = (maxX - minX) * 0.1` and applies that X-derived padding to the Y extents of the viewBox, so tall-narrow contours are padded wrongly on the vertical axis. That is `ContourPreview`'s defect; it is inside a `CollapsibleSection` but not caused by it. Flagged for whoever holds the `ContourPreview` challenge.

---

## 5. Superlatives (L-18 runs both ways)

### S-1 · Goldilocks size, genuinely single-purpose
72 lines: 3 props, 1 ref, 1 watch, a 20-line template, an 18-line style block. It does one thing. Against the tree's own distribution — `ContourSettings.vue` ≥ 375 lines, `EquationView.vue` ≥ 380, `PaperSidebar.vue` 283 (`lane-frontend.md:156`) — this is the right size for the job and does not drift toward a god-module. `lane-frontend.md:182` already records it as *"Titled collapsible — thin wrapper over glass-ui `Collapsible`"*; the tree confirms the description is honest.

### S-2 · `#actions` is a sibling of the trigger, not a child — the a11y trap this component class usually falls into
`CollapsibleSection.vue:34-45`: the header is `<div class="flex w-full items-center">` containing `<CollapsibleTrigger …>` (flex-1) and then `<slot name="actions" />` **outside** it. The naive shape — dropping action buttons inside the trigger — nests interactive controls inside a `<button>`, which is invalid HTML, produces an unreachable inner control for keyboard and screen-reader users, and swallows the inner click into the toggle. This component gets it right by construction. (It costs L-10 — the slot is currently unused — but the *shape* is correct and should survive any refactor.)

### S-3 · Zero re-implemented disclosure a11y
The component contributes no `aria-*`, no `role`, no `tabindex`, no keydown handler, and no `type="button"` — because `CollapsibleTrigger`/`CollapsibleContent` supply all of it through reka (`CollapsibleContent.js` wires `id`, `hidden`/`until-found`, `data-state`, `data-disabled`, and the `beforematch` find-in-page integration; `CollapsibleRoot.js` provides the context and `onOpenToggle`). It also inherits reka's find-in-page support for free. Delegation this complete is rare and is the correct posture for a `ui/` wrapper.

### S-4 · The CSS it consumes is real, and reads the right channel — hypothesis FALSIFIED
I opened this challenge expecting the animation to be a no-op (a wrapper naming keyframes that shipped under different names, or reading an undefined easing token, would have been a clean blocker). It is not:
- `@keyframes collapsible-open` / `collapsible-close` **exist** at `@mkbabb/glass-ui/dist/styles/animations.css:18-38`, are reachable via `@import "@mkbabb/glass-ui/styles"` → `dist/styles/index.css` → `@import "./animations.css"`, which `src/style.css:3` performs.
- They animate `height: 0 ⇄ var(--reka-collapsible-content-height)` (plus opacity) — and that variable is genuinely supplied by the primitive: `reka-ui/dist/Collapsible/CollapsibleContent.js` sets `style: { "--reka-collapsible-content-height": `${height.value}px` }` from a measured `getBoundingClientRect()`.
- `--ease-out` **is** defined: `dist/styles/tokens/scheme-motion.css:217` → `--ease-out: var(--motion-ease-out)`, with `--motion-ease-out: cubic-bezier(0, 0, 0.2, 1)` at `:212`.

The comment at `:55-58` mis-describes the *rules* (L-8) but is accurate about the *names and the channel*. The animation works. Recording the falsified hypothesis because a later lane will otherwise re-run this exact search.

### S-5 · The template-ref type annotation is sound — second hypothesis FALSIFIED
`ref<InstanceType<typeof Collapsible> | null>(null)` (line 16) looked wrong: glass-ui's published type is `__VLS_WithSlots<Base, Slots> = Base & { new (): { $slots: S } }` (`Collapsible.vue.d.ts`), and `InstanceType<A & { new(): B }>` plausibly collapses to `B` — which would make `.$el` a hard `TS2339` under the repo's `vue-tsc -b` build. I probed it against the repo's own compiler (TypeScript 6.0.3, `web/node_modules/.bin/tsc`) with a standalone reconstruction of the exact declared shape, plus a control that asserts the probe is live:

```
probe  : `const x = inst.$el`                            → 0 errors
control: `const bad = inst.__definitely_not_a_member__`  → TS2339 "… does not exist on type
          '{ $: ComponentInternalInstance; $data: {}; $props: … }'"  (EXIT=2)
```

The control's error text shows the resolved type *is* the full `ComponentPublicInstance`, so the annotation is correct and `$el` is legitimately reachable. The real hole is narrower and different: `$el` is typed `any`, which is what lets L-4's unsound `?? rootEl.value` fallback through. Precision matters here — the fix for L-4 is a runtime `instanceof HTMLElement` narrowing, **not** a change to the ref's type annotation.

---

## 6. Provenance against the hitherto corpus

| Corpus row | This challenge |
|---|---|
| `lane-frontend.md:182` — *"Titled collapsible — thin wrapper over glass-ui `Collapsible`"* | **Confirmed and sharpened.** Thin in markup; the 15-line `watch` (L-1..L-5, L-7) and the 18-line style block (L-8) are not "thin", and the wrapper is thinner than it should be on the *prop* axis (L-3, L-6, L-12). |
| `lane-frontend.md:368` — 3 bespoke local `ui/` wrappers over glass-ui | **Contradicted in degree.** `ContourSettings.vue:255-307` + `:361-375` is a fourth, unregistered, hand-rolled instance of this same wrapper (L-9). The count of *wrapper files* is 3; the count of *wrapper implementations* is 4. |
| `lane-frontend.md:619` — 8 `prefers-reduced-motion` blocks, `ui/CollapsibleSection.vue:66` among them | **Confirmed, and turned against the file.** The CSS block exists at 66-70 exactly as inventoried; L-1's point is that its existence proves the contract was known while the JS path at :27 violates it. |
| `lane-fourier-r3-r6.md:125` — **R5-7** TRUE / ADOPT-AS-FACT + CARRY→F.W4; `:139` **R6-5**; `:184` the generalised statement | **Extended, not restated** (L-13). The `instance.loop.presets` callsite that row cites (`FunctionInput.vue:157:Tooltip`) is nested inside `CollapsibleSection` at `FunctionInput.vue:94-171`, and `unmountOnHide`'s `true` default makes this component a conditional gate on that evidence — the inverse polarity of the PaperSidebar under-count. Carry attaches to the same F.W4 slot. |
| `lane-fourier-r3-r6.md:152` — X-1, *"no authority, no admission, no slot — the structural census + the two model defects enter the substrate by adjudication"* | **Followed.** R5-7 is used as *measurement*, cited by row id, with the live-tree nesting re-derived here independently (`grep -n "v-for" FunctionInput.vue` → 157; section bounds 94/171). |
| `CENSUS-2026-08-03.md:85-86, 96-97` — Canvas2D throughout, WebGL absent, three canvases | **Confirmed and applied** (§4). No canvas is currently under this component; the `CoefficientsPanel`/`EqCoefficientsPanel` convergence is the one adoption that would put one there. |

---

## 7. Ledger

| id | sev | file:line | one-line |
|---|---|---|---|
| L-1 | **BLOCKER** | `ui/CollapsibleSection.vue:27` | `behavior:'smooth'` scroll with no `prefers-reduced-motion` gate and no opt-out, in a file whose CSS *is* gated (65-70) |
| L-2 | MAJOR | `ui/CollapsibleSection.vue:24` | scroll-parent probed by literal utility class; blind to `@apply` (`EquationView.vue:373-375`) and to `.viz-panel-left` (no overflow at all) → resolves `<main>` (`App.vue:26`) |
| L-3 | MAJOR | `ui/CollapsibleSection.vue:33` | `unmountOnHide` never forwarded → reka default `true` → collapse destroys `CoefficientsSpectrum.expanded` (`:35`) and replays every enter transition; no `forceMount` escape |
| L-4 | MAJOR | `ui/CollapsibleSection.vue:20` | `?? rootEl.value` hands a component proxy to `getBoundingClientRect`; `$el: any` hides it from `vue-tsc` |
| L-5 | MAJOR | `ui/CollapsibleSection.vue:19` | `setTimeout` never cleared — duplicate queued scrolls on fast toggle, post-teardown execution |
| L-6 | MINOR | `ui/CollapsibleSection.vue:15` | `defaultOpen` one-shot; no `update:open`, no `v-model`, no expose → state write-only |
| L-7 | MINOR | `ui/CollapsibleSection.vue:28` | `250` vs the file's own `0.2s`; unexplained fudge, and still elapses under reduced motion |
| L-8 | MINOR | `ui/CollapsibleSection.vue:53-70` | 18 lines restating what glass-ui's `CollapsibleContent` class + `a11y-overrides.css:6-10` already apply; header comment claims the opposite |
| L-9 | MINOR | `visualization/ContourSettings.vue:255-307, 361-375` | verbatim second implementation of this wrapper, forked because the API is too narrow |
| L-10 | MINOR | `ui/CollapsibleSection.vue:44` | `#actions` slot: 0 consumers, no `defineSlots`, no docs; forces a wrapper div |
| L-11 | MINOR | `web/package.json`, `web/e2e/*` | no unit-test harness at all; 0 e2e specs touch any of the 4 section titles |
| L-12 | MINOR | `ui/CollapsibleSection.vue:39-42` | title is a `<span>`; no heading level and no prop to supply one |
| L-13 | MINOR | `ui/CollapsibleSection.vue:33` ↔ `FunctionInput.vue:94/157/171` | R5-7-class derivation gate, inverted polarity: source over-counts what the DOM holds behind a closed section |
| S-1 | ★ | 72 lines | Goldilocks; single purpose; honest to its census row |
| S-2 | ★ | `:34-45` | `#actions` outside the trigger — avoids nested interactives inside `<button>` |
| S-3 | ★ | `:36-49` | zero re-implemented disclosure a11y; full reka delegation incl. `beforematch` |
| S-4 | ★ | `:61,64` | keyframes + `--ease-out` + `--reka-collapsible-content-height` all real — no-op-animation hypothesis FALSIFIED |
| S-5 | ★ | `:16` | `InstanceType<typeof Collapsible>` resolves correctly — tsc-6.0.3 probe with live control; wrong-type hypothesis FALSIFIED |

**Totals — defects 13 · blockers 1 · superlatives 5.**

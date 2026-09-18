claude-opus-5[1m]

# CHALLENGE · `KeyframesEditor` · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/KeyframesEditor.vue` (284 lines)
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser tooling. Colour ratios are COMPUTED from the token graph (sRGB/OKLab → WCAG relative luminance); the arithmetic is shown so it can be re-run and refuted.
**Read whole:** the component + every file it imports, transitively —
`components/KeyframeCardList.vue` · `components/KeyframesAddDialog.vue` · `KeyframeCard.vue` · `composables/{useKeyframesEditor,useKeyframesState,useKeyframesParsing,useKeyframeOps,useKeyframeBrushApply,useApplyCSS,useHighlightCSS,useToolbarKeyboard}.ts` · `utils/contenteditable.ts` · `@components/CopyButton.vue` · `@utils/keyframeSelector.ts` · the sole render site `scenes/spring/SpringPhysicsFacet.vue` · `demo/styles/{style,design-idioms}.css` · the installed `@mkbabb/glass-ui@7.0.0` token/utility cascade · `keyframes.js/src/animation/**` (engine PRM + `KeyframeSelector`) · `value.js/src/css/types.ts`.

**Hitherto corpus folded:** `formation/keyframes/lane-frontend.md` (S-1..S-8 shadow census, F-1 phantom dep, §6.3 flat-namespace hazard, §6.5 PRM sites). Overlaps cited by id. Two explicit contradictions of that lane are recorded at **§5**.

**Verdict:** the component is DEFECTIVE. Two of its three primary controls — the per-stop start field and the retiming slider — are **provably non-functional against the current `KeyframeSelector` contract**, and the demo tree contains the exact helpers (`selectorText`, `selectorPercent`, `percentSelector`) that two sibling files already use correctly. That is not an inference; it is a three-way source agreement.

| severity | count |
|---|---|
| **BLOCKER** | 4 (D-1 · D-2 · D-3 · D-4) |
| MAJOR | 19 (D-5 … D-23) |
| MINOR | 11 (D-24 … D-34) |
| INFO | 2 (D-35 · D-36) |
| **defects total** | **36** |
| superlatives (L-18 reverse) | 7 |

---

## 0. Headline

| # | finding | sev |
|---|---|---|
| D-1 | The per-stop start field renders **`[object Object]`** — `.toString()` on a plain-object `KeyframeSelector`, while `selectorText()` sits one file over and is used correctly there. | **BLOCKER** |
| D-2 | The retiming Slider reads `[0,1]` fractions into a `-10..110 step 1` track — every thumb collapses to the far left, and one drag writes a 100× out-of-domain offset. | **BLOCKER** |
| D-3 | The `f`/`s` stop annotation computes **1.72:1** (light) / **2.01:1** (dark) against 4.5:1 AA. | **BLOCKER** |
| D-4 | The destructive delete is a bare `<svg @click>` — unfocusable, unnamed, unconfirmed, and gated behind 700 ms of unskippable animation. | **BLOCKER** |
| D-5 | Three engine animations, one of them **infinite**, none passing `respectReducedMotion` (engine default `false`) — and the CSS-level PRM scaffold cannot reach JS/WAAPI-driven animation. | MAJOR |
| D-8 | `.text-small` binds `--font-text` (Plus Jakarta, **proportional**) onto the contenteditable CSS code surfaces; the 4-nbsp fake tab presupposes monospace. | MAJOR |
| D-10 | Every projection blanks `templateFrameStrings` first → **all cards unmount and remount on every edit**, destroying caret and focus. | MAJOR |
| D-19 | The `framed=true` default branch is **unreachable** — sole callsite passes `false`, the barrel has zero consumers. | MAJOR |

---

## 1. BLOCKERS

### D-1 · The start field displays `[object Object]` — BLOCKER

**Provenance**

```
demo/components/instrument/keyframes/components/KeyframeCardList.vue:11
    :frame-start="frames[i].start.toString()"

demo/components/instrument/keyframes/KeyframeCard.vue:5     :model-value="frameStart"      ← the visible <Input>
demo/components/instrument/keyframes/KeyframeCard.vue:38    >s {{ frameStart }}</Label     ← the ghost annotation
```

`frames` is `animation.templateFrames` (`KeyframesEditor.vue:14`, `:26`). Its element type:

```
keyframes.js/src/animation/constants/types.ts:64-66
    export interface TemplateAnimationFrame<V extends Vars> {
        id: number;
        start: KeyframeSelector;
```

and `KeyframeSelector` is a **plain readonly object union with no class and no prototype method**:

```
value.js/src/css/types.ts:42-44
    export type KeyframeSelector =
        | Readonly<{ kind: "percent"; value: number }>
        | Readonly<{ kind: "named"; name: "entry"|"exit"|"cover"|"contain"; offset?: number }>;
```

Every construction site produces an object literal — `keyframes.js/src/animation/engine/css/css-animation.ts:88` (`frame.start = { kind: "percent", value: fraction }`) and `src/animation/compile/frame-compiler.ts:146,150` (`parseKeyframeSelector(start)` → `result.value`, itself a literal). No `toString` anywhere. Therefore `Object.prototype.toString` runs: **`"[object Object]"`**.

**The smoking gun is in the same directory.** `demo/utils/keyframeSelector.ts:7-12` exists precisely for this:

```ts
export const selectorText = (selector: KeyframeSelector): string =>
    selector.kind === "percent" ? `${selector.value * 100}%` : …
```

and its sibling composable uses it correctly, three files away:

```
demo/components/instrument/keyframes/composables/useKeyframeOps.ts:111
    const wrapped = `${selectorText(start)} { ${keyframeString} }`;
```

So the surface the user *types into* shows `[object Object]`, the ghost label reads `s [object Object]`, and any edit round-trips that literal into `onUpdateStart` → `parseCssScalar("[object Object]")` → fails → `toast.error("Invalid keyframe offset")` (`KeyframesEditor.vue:189-193`). The field is **write-impossible and read-meaningless**.

**Falsifier.** Show that `animation.templateFrames[i].start` holds, at runtime, something other than a `KeyframeSelector` literal — e.g. a `ValueUnit` or any object carrying its own `toString`. That would require a construction site not among `css-animation.ts:88` / `frame-compiler.ts:146,150`; `grep -rn "\.start = \|start: parse" src/animation/` returns exactly those two. Alternatively, show a `Object.defineProperty`/prototype patch on the selector objects.

---

### D-2 · The Slider's domain is 100× wrong and its step cannot express any offset — BLOCKER

**Provenance** — `KeyframesEditor.vue:36-51`:

```
:model-value="animation.templateFrames.map((frame) => frame.start.value)"
@update:model-value="(starts) => { …frame.start.value = starts![i]… }"
:min="-10" :max="110" :step="1"
```

`start.value` is a **fraction in `[0,1]`**, established three independent ways:

1. `keyframes.js/src/animation/compile/selector.ts:19-21` — *"Value normalizes percentages to `[0,1]`…"*
2. `src/animation/compile/frame-compiler.ts:69` — `start: start.kind === "percent" ? start.value * duration : NaN` (a fraction times a duration yields ms; a 0–100 number would not).
3. This very component at `KeyframesEditor.vue:206-209` divides by 100 on the way in: `value: scalar.value / 100`.

Consequences, all decidable:

* **Read.** A 0 % stop maps to track position `(0 − (−10)) / 120 = 8.33 %`; a 100 % stop maps to `(1 + 10) / 120 = 9.17 %`. Every thumb in the multi-thumb slider lands inside a **0.83 % band at the far left**, mutually overlapping and individually ungrabbable. The control communicates nothing about keyframe distribution — which is its entire purpose.
* **Write.** One drag to the middle writes `50` into a `[0,1]` field; `updateAllStringsAndAnimation()` (`:45`) then reprojects it as a **5000 %** keyframe selector.
* **Resolution.** `:step="1"` means the smallest expressible change in the `[0,1]` domain is **100 percentage points**. Even with the domain fixed, this slider could never place a stop at 50 %.
* **Named selectors.** `frame.start.value` is `undefined` for `kind: "named"` (`value.js/src/css/types.ts:44` has no `value` on that arm), feeding `undefined` into the thumb array. `bindTimeline` (`css-animation.ts:82-90`) resolves named→percent *only when a timeline is bound*, so the unbound editor case is live.

Again the correct helpers exist and are unused here — `demo/utils/keyframeSelector.ts:28-30` `selectorPercent()` returns 0–100 **and handles the named arm**; `:23-26` `percentSelector()` is the inverse constructor.

The engine itself never mutates `.value` in place — it *replaces the whole selector* after narrowing on `.kind` (`css-animation.ts:87-88`), because the type is `Readonly`. `KeyframesEditor.vue:43` writes through that readonly barrier on an un-narrowed union.

**Falsifier.** Show `KeyframeSelector.value` is 0–100 for the `percent` arm. That contradicts `frame-compiler.ts:69`, `selector.ts:19-21`, and `KeyframesEditor.vue:208` simultaneously. Or show `reka`/glass-ui `Slider` normalises out-of-range model values into the track (it does not — out-of-range values clamp to `min`, which merely relocates the collapse, not the defect).

---

### D-3 · The stop annotation fails WCAG 1.4.3 by 2.6× — BLOCKER

**Provenance** — `KeyframeCard.vue:29-39`:

```html
<div class="italic opacity-25 z-0 pointer-events-none grid gap-1">
    <Label class="text-mono-small …">f {{ index }}</Label>
    <Label class="text-mono-small …">s {{ frameStart }}</Label>
```

The annotation sits absolutely (`:12` `absolute top-2 right-4`) inside the `.relative` wrapper that also holds the `<pre>`, so its backdrop is the highlight.js plate (see **D-9**): `#ffffff` light / `#0d1117` dark.

Text colour is inherited `--foreground` at 25 % alpha.
`--foreground: light-dark(hsl(24 10% 10%), hsl(30 14% 90%))` — `glass-ui/dist/styles/tokens/light-dark.css`.

**Light.** fg `hsl(24 10% 10%)` → sRGB `(28, 25, 23)`. Composited at α=0.25 over `#ffffff` → `(198.3, 197.5, 197.0)`.
Relative luminance `L = 0.2126·0.5664 + 0.7152·0.5614 + 0.0722·0.5583 = 0.5622`.
Contrast vs white (`L=1.0`) = `1.05 / 0.6122` = **1.72:1**.

**Dark.** fg `hsl(30 14% 90%)` → `(233, 229.5, 226)`; plate `#0d1117` → `(13, 17, 23)`, `L = 0.005468`. Composite → `(68.0, 70.1, 73.8)`, `L = 0.0612`.
Contrast = `0.1112 / 0.0555` = **2.01:1**.

Required: **4.5:1** — `--type-small` clamps to `max 1.25rem = 20px` regular, below the 24px large-text threshold, so no 3:1 exemption applies. Both themes fail; the light case fails by 2.6×.

**The falsifier partially bites, and I concede that half.** WCAG 1.4.3 exempts *decorative* text — text duplicated by an accessible equivalent. `s {{ frameStart }}` **is** redundant with the visible `<Input>` at `KeyframeCard.vue:5` (same value), so the `s` row is arguably decorative and exempt. `f {{ index }}` is **not**: the frame index appears nowhere else in the component — not in the `<pre>`'s `aria-label` (`:49` says `CSS for keyframe ${index}`, which is AT-only), not in the Input, not in the toolbar. It is the sole sighted correlation between a card, its slider thumb, and its position. The finding stands on the `f` row alone and drops to a single line, not two.

**Falsifier (remaining).** Show the frame index rendered elsewhere in the card at ≥4.5:1, or show a rule raising the effective opacity of `.opacity-25` in this subtree. `grep -rn "opacity-25\|opacity:" demo/components/instrument/keyframes/` finds no override.

---

### D-4 · The destructive delete is not a control — BLOCKER

**Provenance** — `KeyframeCard.vue:20-24`:

```html
<X @click="(e) => emit('remove', e)" data-destructive
   class="p-0 m-0 scale-on-hover cursor-pointer stroke-2 w-6 h-6 text-accent-red …" />
```

`X` is a `@lucide/vue` component; it renders an `<svg>`. Therefore:

* **not keyboard focusable** — `<svg>` has no default tabindex and none is set; the delete action is mouse/touch-only;
* **no role** — no `button`, so no Enter/Space activation and no AT exposure as an action;
* **no accessible name** — no `aria-label`, no `<title>`, no text node. A screen reader encounters an unlabelled graphic;
* **no confirmation and no undo** in this surface.

The tree proves the component *knows* the correct idiom: the sibling apply control at `KeyframesEditor.vue:87-95` is a real `<button type="button" aria-label="Apply CSS keyframes to the target">` wrapping a `pointer-events-none` icon, and `KeyframesAddDialog.vue:7-13` does the same. The one **destructive** affordance in the family is the one that skipped it.

Compounding, from `KeyframesEditor.vue:232-250`:

```ts
await AnimationGroup.of(presets.warpLeft().setTargets(el1),
                        presets.jumpUp().setTargets(el2)).play();
removeKeyframeData(frameIx);
```

Both presets are `duration: 700` (`src/animation/presets/catalog.ts:120-123`, `:267-270`). So deletion is blocked behind **700 ms** with no busy state, no disabled button, no progress affordance — well past Nielsen's 100 ms "instantaneous" threshold and inside the window where a user re-clicks. A second click during the wait enqueues a second `removeKeyframe` against **indices that are about to shift**. And `jumpUp` fires on the *neighbouring* card — gratuitous vestibular motion on a destructive action, with no PRM guard (**D-5**).

**Falsifier.** Show `@lucide/vue` renders a focusable, role-bearing host element by default (inspect `node_modules/@lucide/vue/dist/*` — the icons are `h("svg", …)` factories with no tabindex/role), or show a global rule granting `svg[data-destructive]` a role and tab stop. `grep -rn "data-destructive" demo/` finds the attribute referenced only by a red-census proof, never by behaviour.

---

## 2. MAJOR

### D-5 · `prefers-reduced-motion` dishonesty, including a perpetual animation

Three engine animations are constructed in this component's graph, **none** setting the opt-in flag:

| site | shape |
|---|---|
| `composables/useKeyframeBrushApply.ts:18-27` | `duration: 700`, `iterationCount: "infinite"`, `direction: "alternate"`, ±90° rotation — **runs forever** while CSS is applied |
| `KeyframesEditor.vue:254-258` | `duration: 1000` width sweep, fired from `onUpdateCSS` (`:215`) i.e. on edit |
| `KeyframesEditor.vue:244-247` | `warpLeft` + `jumpUp`, 700 ms each, on delete |

The engine's PRM support is **opt-in and defaults off**:

```
keyframes.js/src/animation/constants/types.ts:201
    /** When true, snap `play()` to the final frame under `prefers-reduced-motion: reduce`. Default false. */
    respectReducedMotion: boolean;
```

And the CSS scaffold cannot cover for it. glass-ui's global block —
`glass-ui/dist/styles/utilities/a11y-overrides.css`: `@media (prefers-reduced-motion: reduce) { *:not([data-allow-motion]) { animation-duration: 0.01ms !important; … } }` — constrains **CSS** animations and transitions. keyframes.js drives per-frame inline style writes or WAAPI (`useWAAPI` default `true`, `types.ts:198`); neither is reachable by `animation-duration`. So under an active `reduce` preference the brush rotates ±90° at 700 ms, indefinitely.

WCAG **2.2.2 Pause/Stop/Hide** applies: moving content that starts automatically and runs > 5 s must be pausable. The only stop is toggling apply *off*, which also un-applies the CSS the user asked for — pause and function are coupled.

This extends census §6.5 (13 PRM sites, "conscientious but inconsistent"): the census counted *CSS* guards. The engine-driven layer — the demo's dominant motion substrate by its own §6.4 admission — carries **zero** guards in this component.

**Falsifier.** Show `respectReducedMotion` defaults `true` (the doc comment says otherwise), or show `AnimationGroup`/`CSSKeyframesAnimation` consulting `src/animation/internal/reduced-motion.ts` unconditionally rather than behind the option, or show the demo setting a global default at construction. `grep -rn "respectReducedMotion" demo/` → no hits.

---

### D-6 · `z-modal` on a per-card number input — a direct breach of the demo's own written contract

`KeyframeCard.vue:4`: `class="sticky z-modal bg-transparent top-0 …"`.

`demo/styles/style.css:20-40` is an explicit, signed contract:

> `--z-modal : 140  modal dialogs — above everything` … *"Use the SEMANTIC z-\* utility for the rung"*

A percentage field inside a card claims the **top rung of the entire application**, above `--z-dock` (40), `--z-overlay` (50), `--z-popover` (130). Nothing in the component needs it: the field's only stacking requirement is to sit above its sibling `<pre>` — `z-content` (10) or no z-index at all would do, since it is the earlier sibling in a `grid` and is `position: sticky` (already painted in the positioned-descendant layer).

Today it does not visibly break the Add-Keyframes dialog only because reka portals `DialogContent` to the document end, so equal `z-index` resolves by DOM order in the dialog's favour. That is luck, not design.

**Falsifier.** Show a stacking context between the input and the root that traps `z:140` locally. `.keyframes-editor-scroll` (`SpringPhysicsFacet.vue:233-238`) sets `container-type: inline-size` + `overflow-y: auto` — `container-type` does establish containment, so the escape is bounded *in the spring facet*. It is not bounded for any other host, and the contract breach is unconditional.

---

### D-7 · The sticky start field is transparent over scrolling code

Same line: `sticky … bg-transparent top-0`. The scroll parent is real — `SpringPhysicsFacet.vue:233-235` `{ max-height: 26rem; overflow-y: auto }`. So while a card is in view, its start field pins to the top of a 26 rem scrollport with **no backing plate**, and the card's own `<pre>` content scrolls beneath it. Sticky-with-transparent-background over scrolling text is a guaranteed collision.

The fix vocabulary is already present in the file — the `<pre>` gets an opaque plate, the Card gets `tier="quiet"`; the field alone opts out.

**Falsifier.** Show the `<pre>`'s plate always occludes the scrolled text at the field's exact band — it cannot, because the plate scrolls *with* its text while the field does not.

---

### D-8 · A proportional font on the CSS code surfaces

`KeyframeCard.vue:45` and `KeyframesAddDialog.vue:37` both carry `text-small` on the contenteditable `<pre>`. That utility is not a size-only rung:

```
glass-ui/dist/styles/typography/semantic.css
    @utility text-small { font-family: var(--font-text); font-size: var(--type-small);
                          line-height: var(--type-leading-small); font-weight: 400; }
```

`--font-text → --font-stack-text: "Plus Jakarta Sans", …, sans-serif`
(`glass-ui/dist/styles/tokens/scheme-motion.css`) — **proportional**. An author-layer class beats the UA `pre { font-family: monospace }` unconditionally, so the CSS editors render in the body sans.

Three downstream costs, all decidable:

1. `utils/contenteditable.ts:16` inserts `    ` as a "tab". In a proportional face four nbsp are not one indent unit and do not align across lines — the indentation idiom is defeated at its root.
2. `tabular-nums` is applied to the ghost labels (`KeyframeCard.vue:32`) but not to the code, so numeric CSS values (`translateX(120px)`) jitter column-to-column.
3. `--type-small: clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` (`typography/scale.css`) makes code size **viewport-fluid** — 14 px at narrow, 17.6 px at 1920 px. Code size should be a user preference, not a function of window width.

The demo owns the correct token: `--font-mono: "Fira Code"`, and `style.css:4-9` calls its payload *"the AUTHORITATIVE Fira Code payload"*. Sibling code surfaces use it (`text-mono-small` at `KeyframeCard.vue:32`). The `<pre>`s do not.

**Falsifier.** Show a later un-layered rule binding `pre { font-family: var(--font-mono) }`. `grep -rn "\bpre\b" demo/styles/*.css` → no `pre` selector exists in the demo cascade. Or show `@utility text-small` is not compiled into the demo's Tailwind pass — but `glass-ui/dist/styles/index.css` imports `./typography.css` → `./typography/semantic.css`, which ships **uncompiled `@utility` source** precisely so the consumer's Tailwind processes it.

---

### D-9 · Hard-coded hex plates defeat `bg-transparent` and every surface token

`KeyframeCard.vue:45` and `KeyframesAddDialog.vue:37` declare `hljs css … bg-transparent`. The intent is a code surface that reads as part of the card. The runtime-injected theme overrides it:

```
highlight.js/styles/github.css        .hljs { color: #24292e; background: #ffffff }
highlight.js/styles/github-dark.css   .hljs { …            background: #0d1117 }
```

injected verbatim as the `textContent` of a `<style id="highlightjs-theme">` appended to `document.head` (`composables/useHighlightCSS.ts:94-105`, `:88-91`). That style is **un-layered**; Tailwind's `.bg-transparent` lives in `@layer utilities`. Un-layered always beats layered, and even discounting layers the injected node is appended after the app's stylesheet. `bg-transparent` never applies.

Result: the code surface is an opaque `#ffffff` / `#0d1117` rectangle inside a card whose surface is `--card: light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` — a warm cream / warm brown. In dark mode a near-black `(13,17,23)` plate sits on a `(53,42,34)` card: a 1.42:1 tonal step, i.e. a plainly visible cold rectangle in a warm surface. This is also the backdrop that makes **D-3** worse than it would be on `--card`.

The theme swap on dark-mode change *is* handled (`useHighlightCSS.ts:140`) — the defect is the palette's refusal to participate in the token system at all, not its theme-awareness.

**Falsifier.** Show `bg-transparent` emitted un-layered *and* after the injected node — impossible, since the node is appended at first `highlightAll()`, i.e. after stylesheet insertion in both dev (Vite runtime injection at module eval) and prod (`<link>` in head).

---

### D-10 · Every projection unmounts the entire card list

`composables/useKeyframesParsing.ts:48-54`:

```ts
const updateAllStrings = async () => {
    const { CSSKeyframesToStrings } = await loadAnimationEngine();
    templateFrameStrings.value = [];                     // ← blanks the list
    const cards = await CSSKeyframesToStrings(animation); // ← yields
    templateFrameStrings.value = await Promise.all(cards.map(formatEditorCSS…));
```

`KeyframeCardList.vue:4` iterates `frameStrings`; emptying it renders **zero** `KeyframeCard`s, so every card instance unmounts. The awaits on `:51` and `:52-54` (`formatEditorCSS` per card) guarantee at least one scheduler flush at the empty state.

`updateAllStrings` is on the hot path of every edit:

* `useKeyframeOps.ts:136` — `updateAnimationFromKeyframeString` (debounced 1000 ms) ends in `updateAllStringsAndAnimation()`;
* `useKeyframeOps.ts:181` — after adding keyframes;
* `useKeyframeOps.ts:207` — after removing;
* `KeyframesEditor.vue:45` — every slider commit;
* `KeyframesEditor.vue:210` — every start-field commit;
* `useKeyframesParsing.ts:96-103` — the structural watch.

So: type in a card, pause one second, and the card you are typing in is destroyed and rebuilt. **Caret position, selection, scroll offset, and focus are all lost**, and the `highlighted` marker attribute (**D-11**) resets. `v-for :key="frames[i]?.id ?? i"` does not help — the list is empty, so there is nothing to key against.

**Falsifier.** Show Vue never flushes between `:50` and `:54` — it must, because `:51` and `:52` are `await`s and Vue's scheduler flush is itself a microtask that interleaves; and `formatEditorCSS` (a formatter) is not synchronous. Or show `KeyframeCardList` uses `v-memo`/`KeepAlive` to survive an empty source (it does not).

---

### D-11 · Syntax highlighting is one-shot; live edits render mis-coloured

`composables/useHighlightCSS.ts:116-126`:

```ts
const highlight = (el) => {
    if (!el || el.getAttribute("highlighted")) return;   // ← permanent guard
    …  el.innerHTML = h.value; el.setAttribute("highlighted", "true");
```

Nothing ever removes the attribute (`grep -rn 'removeAttribute("highlighted")' demo/` → none). Therefore:

* `KeyframesEditor.vue:229` (`highlightAll()` on every keydown) and `:275-277` (`watch(cssKeyframesString, highlightAll)`) are **dead calls after the first pass**;
* text typed after the first highlight is inserted into whichever existing `<span class="hljs-*">` the caret sits in, so **new text inherits an arbitrary neighbouring token colour** — a property name typed inside a value span renders as a value, permanently;
* the guard also means the code never re-tokenises after a paste.

The idempotence guard is the right instinct (re-writing `innerHTML` under a live caret is destructive) — but the consequence is a code editor whose colours are a snapshot of its first render.

Second-order, flagged for the **C lane**: `highlight()` sets `innerHTML` on the `<pre>` that Vue owns (`KeyframeCard.vue:50` renders `<code>{{ formattedCSS }}</code>`), destroying Vue's vnode DOM. Subsequent reactive updates to `formattedCSS` patch a text node that no longer exists in the tree.

**Falsifier.** Show any code path clearing the marker, or show `setHighlightingString` (`useHighlightCSS.ts:108-113`, which *sets* `highlighted`) being used on the card `<pre>`s — it is called only from `KeyframesAddDialog.vue:103`, never for the card list.

---

### D-12 · Three focus affordances across three sibling controls; none is the codified one

| control | focus treatment |
|---|---|
| `KeyframesAddDialog.vue:10` trigger | *none declared* → UA default outline |
| `CopyButton.vue:5` | *none declared* → UA default outline |
| `KeyframesEditor.vue:91` apply | `outline-none focus-visible:ring-2 focus-visible:ring-accent` |
| `KeyframeCard.vue:45` `<pre>` | `focus-ring` (the codified idiom) |

`demo/styles/design-idioms.css:73-79` is unambiguous:

> *"The demo-owned `:focus-visible` contract — **the SINGLE keyboard-focus affordance**"*

Four controls, three treatments, and the one control that opted into a bespoke ring (`ring-accent`, a different hue *and* a different geometry from `--focus-ring-shadow`) is the only one that also suppressed the UA fallback with `outline-none`. Inside a 40 px toolbar the keyboard user sees the focus indicator change shape and colour as they arrow across it — which is exactly the discontinuity the single-affordance rule exists to prevent.

**Falsifier.** Show `.focus-ring` applied to the three toolbar buttons, or show glass-ui's `Button`/`.interactive-item` in the chain supplying `--focus-ring-shadow` to them — neither is used at these sites.

---

### D-13 · `.focus-ring` is a **class-name collision**, not just a token collision

Census §6.3 flagged the flat namespace at the *custom-property* level (98 unprefixed demo props, zero `--kf-*`). The hazard is worse than recorded: it reaches **class names**.

```
glass-ui/dist/styles/utilities/base.css   @layer components {
    .focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill);
                                box-shadow: var(--focus-ring-shadow); } }

demo/styles/design-idioms.css:76-79       (UN-LAYERED)
    .focus-ring:focus-visible { box-shadow: var(--focus-ring-shadow); outline: none; }
```

Two definitions of the same class. The demo's is un-layered, so it wins **globally** — including inside every glass-ui component that applies `.focus-ring` internally. The behavioural delta is real: glass-ui's copy forces `border-radius: var(--radius-pill)` on focus (a shape change); the demo's drops it. The demo may well be right on the merits, but it is silently reshaping a vendor primitive's focus behaviour across all 42 glass-consuming files.

`KeyframeCard.vue:45` is a live consumer of the ambiguous name.

**Contradiction of census §6.3:** the lane concluded the collision surface is custom properties and "worth a lane of its own". The collision is already *realised*, in class-name space, on a demo-declared idiom — not merely latent.

**Falsifier.** Show the demo's `design-idioms.css` rule is inside a `@layer` (it is not — `style.css:14` imports it plainly, and the file's own header at `:1-4` asserts un-layered status deliberately: *"OUTSIDE @layer so the demo's copy overrides glass-ui's"*).

---

### D-14 · Naked bespoke buttons where glass-ui `Button` is already imported

`KeyframesEditor.vue:87-95` and `KeyframesAddDialog.vue:7-13` hand-roll:

```
inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg
border-none bg-transparent p-0 outline-none scale-on-hover focus-visible:ring-2 …
```

`Button` is imported **in the same file** at `KeyframesAddDialog.vue:61` and used at `:42`. glass-ui also ships `.interactive-item` (`utilities/base.css`) which supplies exactly this recipe *plus* `:focus-visible`, `:hover`, `:active` scale-press and `disabled` handling — and `.tap-squish`, whose press feedback carries its own `@media (prefers-reduced-motion: reduce)` guard.

This is a new instance of the census shadow pattern (S-1/S-7): the primitive is installed, reachable, already imported, and bypassed.

**Falsifier.** Show glass-ui `Button` cannot render an icon-only ghost trigger at 24 px — `DialogTrigger as-child` accepts any child, and `Button` exposes variant/size props; the census records `Button` in use at 12 demo sites.

---

### D-15 · `useToolbarKeyboard` (111 lines) shadows glass-ui's `useTabRovingFocus`

`composables/useToolbarKeyboard.ts` reimplements roving tabindex + Arrow/Home/End. Census S-1 already located the primitive:

```
glass-ui/dist/components/tabs/composables/useTabRovingFocus.d.ts
    declare function useTabRovingFocus(params: UseTabRovingFocusParams): UseTabRovingFocusReturn
```

and S-1's verdict ("replace; rationale is 3 majors stale") was written against `useKfPillTabs`. This is the **second** local fork of the same core, in the same repo, written later (S.C3b · C-19). The census's shadow tally omits it.

**Contradiction of census §5:** the "replace-now" line is 217 lines (KfPillTabs + its composable). With `useToolbarKeyboard` folded in it is **328**.

I record the counterweight honestly: `useToolbarKeyboard`'s doc header (`:3-28`) argues the *toolbar* case, not the *tablist* case, and the two have different ARIA obligations (a toolbar is one tab stop; a tablist couples selection to focus). Whether `useTabRovingFocus` parameterises that is not decidable from a `.d.ts`. So this is **evaluate**, not mechanical-swap — same posture the census took for S-3.

**Falsifier.** Read `useTabRovingFocus`'s param type; if it hard-couples to `role="tab"` selection semantics, the fork is justified and this drops to INFO.

---

### D-16 · An icon-only toolbar with zero tooltips, in a demo where `/tooltip` is a six-site idiom

Four affordances (`KeyframesEditor.vue:73`, `:75`, `:82`, `:87`), each an unlabelled Lucide glyph, none carrying a `title`, a visible label, or a `Tooltip`. `FilePlus2` for "add keyframes" and `Paintbrush` for "apply CSS to the target" are not conventional; neither is discoverable without activation.

`aria-label` is present on three of them, so **AT users are better served than sighted users** — an inversion. Census §3.1 records `@mkbabb/glass-ui/tooltip` imported at 6 sites, and `SpringPhysicsFacet.vue:106` (the parent of this very editor) uses a plain `title=` on its re-sample button. The idiom exists at both altitudes; this toolbar uses neither.

**Falsifier.** Show a hover affordance I missed in the toolbar subtree — `grep -n "title=\|Tooltip" KeyframesEditor.vue components/KeyframesAddDialog.vue ../../CopyButton.vue` → no hits.

---

### D-17 · A decorative glyph in the control row, and controls diffused across the full width

`KeyframesEditor.vue:63-73`:

```html
<div role="toolbar" class="… flex h-10 w-full items-center justify-evenly gap-2 …">
    <WandSparkles aria-hidden="true" class="shrink-0 opacity-70" />
```

Two compounding proportion faults:

1. **False affordance.** The wand is the same 24 px Lucide glyph, in the same row, at the same baseline as the three real controls — differentiated only by `opacity-70`. Reduced opacity in a control bar is the *universal* signal for **disabled**, not for *decorative*. The comment at `:71-72` concedes it was formerly "a focusable no-op trigger"; demoting it to `aria-hidden` fixed the AT half and left the sighted half reading as a dead button. It also consumes a full slot of `justify-evenly`, so the three real controls are pushed off centre.
2. **Diffusion.** `justify-evenly` spreads 4 × 24 px = 96 px of content across a `w-full` bar. In the spring facet the container is the rail, `--rail-width: clamp(25rem, 33svi, 32rem)` (`design-idioms.css:47`) — up to 512 px. That is ~83 px of dead space between adjacent icons in a 40 px-tall strip. A toolbar is a *cluster*; `justify-evenly` is the anti-cluster.

**Falsifier.** Show `opacity-70` reads as decorative rather than disabled in this design system — glass-ui's own disabled recipe is `opacity: var(--opacity-disabled)` on `.interactive-item:disabled` (`utilities/base.css`), i.e. the same lever. Or show the toolbar is genuinely narrow at every breakpoint (it is `w-full` unconditionally).

---

### D-18 · `bg-background` painted over a `--card` surface

`KeyframesEditor.vue:35`: `sticky bottom-0 bg-background rounded-panel p-4 pt-4 m-4`.

The sole host mounts the editor **inside** `Card > CardContent` (`SpringPhysicsFacet.vue:113-123`), and `framed=false` explicitly drops the inner Card to honour *"the glass-ui 4.0.0 single-surface contract"* (`:116-118`). The sticky footer then paints the **page** background onto that single surface:

`--background → --neutral-0: light-dark(hsl(40 30% 98%), hsl(24 9% 4%))` vs `--card: light-dark(hsl(30 85% 96%), hsl(26 22% 17%))`.

* Light: `(252,250,245)` on `(253,245,236)` — a faint cool shift, ~1.02:1. Tolerable.
* Dark: `(11,10,9)` on `(53,42,34)` — **1.42:1**, a near-black rectangle on a warm brown card. Unmissable.

The component takes the trouble to drop a Card for surface unity and then reintroduces a second surface eight lines later.

**Falsifier.** Show `--background` and `--card` resolve identically in dark mode — `tokens/light-dark.css` gives `hsl(24 9% 4%)` and `hsl(26 22% 17%)`. Or show a host that is *not* a card; there is exactly one host.

---

### D-19 · The `framed=true` default branch is unreachable

`KeyframesEditor.vue:10-22` renders a `<Card cartoon tier="quiet">` wrapper when `framed` (default `true`, `:132`, `:138`). `:23-33` is the `v-else` — the *same* `KeyframeCardList` with the *same* six bindings, duplicated.

Reachability:

```
$ grep -rn "<KeyframesEditor" --include="*.vue" demo/
scenes/spring/SpringPhysicsFacet.vue:119:  <KeyframesEditor :animation="demo.springEditAnim" :framed="false" />

$ grep -rn 'instrument/keyframes"' --include="*.vue" --include="*.ts" demo/
(no output)          ← the barrel at components/instrument/keyframes/index.ts has ZERO consumers
```

One render site, passing `false`. The barrel's lazy re-export (`index.ts:7`) is dead. So the `true` branch never renders, and the 9-line doc comment at `:3-9` describes *"the default, standalone authoring surface"* — a surface that does not exist. Thirteen lines of duplicated template plus a prop, a default, and a paragraph of prose, all maintaining a phantom.

The `v-else` fork also carries a maintenance trap by construction: `:11` and `:23` must keep `p-2 m-0 mt-0 grid gap-4 relative` in sync by hand, and the six event bindings are transcribed twice.

**Falsifier.** Find a render site outside `demo/` (there is none — the demo is the only consumer tree), or a dynamic `<component :is>` resolving to it. `grep -rn "KeyframesEditor" demo/` returns only the definition, the barrel, the one render site, and prose.

---

### D-20 · No loading state, and the prose claims otherwise

`useKeyframesState.ts:25` initialises `templateFrameStrings = ref<string[]>([])`; it is populated only by `updateAllStrings()` from `onMounted` (`KeyframesEditor.vue:280`), which awaits `loadAnimationEngine()` plus a per-card async format. Until then the surface is: an empty card list, a Slider with zero thumbs, a toolbar, and a rainbow bar. No skeleton, no shimmer, no copy, no `aria-busy`.

The tree even ships the primitive — census S-6 records glass-ui's root-barrel `Skeleton`, and `app/App.skeleton.vue` is the demo's own shimmer plate.

The prose overclaims. `KeyframeCardList.vue:38-43`:

> *"…until then the raw frame string is shown — an honest pre-format frame, **never a blank**."*

That guarantee covers the **formatter** (`formatFn` null → fall back to `s`, `:50-52`) and is genuinely well built (see **SUP-6**). It does not cover `frameStrings` itself, which is empty at mount and re-emptied on every projection (**D-10**). A reader auditing this file would take the comment as a blanket no-blank guarantee; it is not.

**Falsifier.** Show `templateFrameStrings` seeded synchronously from `animation.templateFrames` before first paint — `useKeyframesState.ts:25` seeds `[]`.

---

### D-21 · Errors are exiled to a global toast; the failing field is unmarked

`KeyframesEditor.vue:189-203` routes both start-field rejections to `toast.error(…)` with a stable id. Nothing happens *at the field*: no `aria-invalid`, no `aria-describedby`, no border/tint change, no inline message. `KeyframeCard.vue:3-8`'s `<Input>` has no error contract at all.

For a per-stop authoring surface with N cards, a toast in the page corner cannot indicate **which** stop rejected — the toast body (`:191`) reports `${issue.code} at ${issue.start}-${issue.end}`, i.e. character offsets within the rejected string, not the card index. The user must guess.

Cost is compounded by forced-colors: glass-ui's `accessibility.css` forced-colors block keys specifically on `[aria-invalid="true"], :user-invalid` to paint `border-color: Mark` — a ready-made high-contrast error affordance the component never opts into.

**Falsifier.** Show an inline error region in `KeyframeCard.vue` (there is none), or show `LabeledField`'s `.labeled-field-error` idiom (`design-idioms.css:268-270`) applied here (it is not — that idiom has no consumer in this component family).

---

### D-22 · The retiming Slider has no name, no label, no readout, and an unexplained domain

Independently of **D-2**'s arithmetic: `KeyframesEditor.vue:36-52` renders a multi-thumb slider with no `aria-label`, no `<Label>`, no visible caption, no tick marks, and no value readout. Each thumb is announced as an unnamed `slider` with a bare `aria-valuenow`; with N thumbs, nothing distinguishes thumb 3 from thumb 4 to a screen reader.

The `-10 … 110` domain is stated nowhere. A user who drags past 0 or 100 gets no explanation of what a negative keyframe offset means, and there is no `aria-valuetext` to say "keyframe 2, 45%".

The demo owns the fix: `LabeledSlider` from `@mkbabb/glass-ui/labeled-field` is imported by the **parent component**, `SpringPhysicsFacet.vue:131`.

**Falsifier.** Show reka/glass-ui `Slider` auto-derives an accessible name from context (it does not — `aria-label`/`aria-labelledby` must be supplied), or show a visually-hidden label in the subtree (none).

---

### D-23 · `DialogDescription` nested **inside** `DialogTitle`

`KeyframesAddDialog.vue:24-31`:

```html
<DialogTitle>
    <CardTitle class="text-heading">Add keyframes</CardTitle>
    <DialogDescription class="text-subheading text-muted-foreground">
        Add keyframes to the animation
    </DialogDescription>
</DialogTitle>
```

`Dialog` wires `aria-labelledby` → the title node and `aria-describedby` → the description node. With the description *inside* the title, the dialog's **accessible name** becomes the concatenation — "Add keyframes Add keyframes to the animation" — and the description text is announced twice, once as name and once as description.

Structurally it also nests a `<p>` (DialogDescription) inside an `<h2>` (DialogTitle), and nests a **Card** primitive (`CardTitle`) inside a **Dialog** primitive — a cross-family composition that bypasses `DialogHeader` (which the demo imports elsewhere; census §3.2 lists `DialogHeader` in the named-import surface).

**Falsifier.** Show glass-ui's `DialogTitle`/`DialogDescription` do not participate in `aria-labelledby`/`aria-describedby` — that would make them decorative wrappers and void the primitive's contract, which the census's `Dialog*` usage across 4 files assumes.

---

## 3. MINOR

### D-24 · Dead and typo'd classes

| site | class | fact |
|---|---|---|
| `KeyframesEditor.vue:100` | `progress-bar sticky **bottom** mt-2` | `bottom` is not a Tailwind utility (`bottom-0`, `bottom-px`, `bottom-<n>`, `bottom-(--var)` are). It emits nothing → `position: sticky` with no inset → a no-op. |
| `KeyframesAddDialog.vue:50` | `progress-bar w-full **bottom** mt-2` | same dead token |
| `KeyframesAddDialog.vue:41` | `sticky bottom-0 **class** grid` | the literal word `class` as a class name |

Verified: `grep -rn "@utility bottom\b" demo/styles/ glass-ui/dist/styles/` → no definition. Individually trivial; collectively they are the signature of markup that has never been read back.

**Falsifier.** Show `bottom` or `class` defined as a utility anywhere in the compiled cascade.

---

### D-25 · `overflow-x-scroll` on a 40 px bar

`KeyframesEditor.vue:68` uses `overflow-x-scroll`, not `-auto`. `scroll` reserves the scrollbar gutter **unconditionally**; on Windows/Linux, and on macOS with "Show scroll bars: Always", a classic bar is painted inside a `h-10` (40 px) strip that holds 24 px glyphs. Content that can never overflow (4 small items, `justify-evenly`, `w-full`) gets a permanent chrome tax.

glass-ui ships both `.scrollbar-hidden` and `.scrollbar-thin` (`utilities/base.css`); neither is used.

**Falsifier.** Show a global `::-webkit-scrollbar { display:none }` / `scrollbar-width: none` reaching this element — `grep -rn "scrollbar" demo/styles/*.css` → no hits.

---

### D-26 · Contradictory and redundant spacing tokens

* `:10` `class="p-0 m-0"` on a `Card` that also gets padding from `CardContent`.
* `:11` / `:23` `p-2 m-0 mt-0` — `mt-0` after `m-0` is a no-op.
* `:35` `p-4 pt-4` — `pt-4` after `p-4` is a no-op.

Three no-op declarations in a 284-line file. Each is harmless; together they mean the spacing was tuned by accretion, and a reader cannot tell which values are load-bearing.

**Falsifier.** Show a Tailwind ordering in which `mt-0` after `m-0` or `pt-4` after `p-4` changes the computed value (it cannot; v4 emits both, the later wins, and both set the same value).

---

### D-27 · Asymmetric vertical rhythm inside the sticky footer

The footer is `grid gap-4` (`:35`), so siblings are 16 px apart. Then:

* the toolbar adds `mt-4` (`:68`) → **32 px** above it;
* the progress bar adds `mt-2` (`:100`) → **24 px** below it.

Three stacked elements with 32 / 24 px gaps and no stated reason. Aristotelian proportion asks that unequal intervals mean something; here the inequality is an artefact of stacking a margin on top of a gap in two different sizes.

**Falsifier.** Point to a design intent making the Slider→toolbar gap deliberately 4/3 the toolbar→bar gap.

---

### D-28 · The sticky footer floats 16 px above the scrollport floor

`:35` combines `sticky bottom-0` with `m-4`. Per CSS Position, the sticky view rectangle is inset by the element's margins, so `bottom: 0` places the **margin** edge at the floor and the border box 16 px above it. A 16 px band of scrolling card content stays visible **beneath** the opaque footer — content that appears to slide out of the container rather than under a shelf.

**Falsifier.** Show a UA that resolves sticky offsets against the border box rather than the margin box.

---

### D-29 · `border` picks up Tailwind v4's `currentColor` default

`:68` `rounded-xl border bg-background p-1`, with no border-colour utility. Tailwind v4's preflight is `*, ::before, ::after { border: 0 solid; }` — colour therefore inherits `currentColor`, i.e. full-strength `--foreground`, not the `--border` hairline used across the rest of the cascade. (v3's gray-200 default was removed in v4; that is the documented breaking change.)

Verified no override: `grep -n "border-color" demo/styles/style.css demo/styles/layout.css` → none; glass-ui's `utilities/base.css` / `base-misc.css` set none globally.

Result: the toolbar wears a 1 px near-black (light) / near-white (dark) frame, materially heavier than every neighbouring edge.

**Falsifier.** Find a `*`/`:where` border-colour reset in the demo or glass-ui cascade.

---

### D-30 · RTL: physical offsets only

`KeyframeCard.vue:12` `absolute top-2 right-4` pins the delete/copy cluster and the `f`/`s` annotation to the physical right edge. Under `dir="rtl"` the cluster stays right while the code (LTR by content) starts left — but the *card* mirrors, so the cluster lands over the code's natural gutter.

Demo-wide, logical-property usage is 3 hits total (`ms-*`/`me-*`/`ps-*`/`pe-*`), so this is a repo-level posture, not a local lapse. I record it as MINOR and repo-scoped rather than component-scoped.

**Falsifier.** Show the demo declares itself LTR-only (I find no `dir` policy document; the absence cuts both ways, which is why this is MINOR).

---

### D-31 · Forced-colors: exactly one control survives, by accident

`grep -rn "forced-colors" demo/` → **0**. Delegation to glass-ui covers very little of this component:

* `accessibility.css`'s forced-colors block keys on `[aria-pressed="true"]`, `[aria-selected]`, `[aria-checked]`, `[data-state]`, `[aria-invalid]`. Of this component's controls only the apply button (`:90` `:aria-pressed`) matches — so it is the **only** control that gets a `Highlight` border in forced-colors mode.
* `a11y-overrides.css`'s forced-colors block covers `.focus-ring:focus-visible` and `.glass-dock` — reaching the card `<pre>` but none of the toolbar buttons (**D-12**).

Everything else degrades: the hljs hex plate (**D-9**) is replaced by `Canvas`, erasing all token colouring; `.progress-bar`'s rainbow gradient (`design-idioms.css:132-144`) becomes a flat system colour, so the progress sweep is invisible; `opacity-25` (**D-3**) is not opacity-corrected by forced-colors and stays illegible.

**Falsifier.** Show a forced-colors rule reaching `.progress-bar` or the bespoke toolbar buttons.

---

### D-32 · Prose

* `KeyframesAddDialog.vue:29` — **"Add keyframes to the animation"** under the title **"Add keyframes"**. A description that restates its heading carries zero information and costs a line of vertical space plus (per **D-23**) a corrupted accessible name. Either say what format is accepted (`@keyframes`? bare stops? `from`/`to`?) or delete the row.
* `KeyframesEditor.vue:89` — `aria-label="Apply CSS keyframes to the target"`. **"the target"** is internal vocabulary (`animation.targets`, `useApplyCSS.ts:38`), never surfaced in the UI. An AT user hears a noun the interface never defines.
* `KeyframesAddDialog.vue:45` — `>Add Keyframes<FileIcon></FileIcon>` with no separator; label and icon abut with zero gap, and the button's sentence case ("Add Keyframes") disagrees with the dialog title's ("Add keyframes").

**Falsifier.** Show "the target" appearing as visible UI copy anywhere in the demo.

---

### D-33 · The demo's own 44 px touch floor is codified and never used

`design-idioms.css:81-85` declares `.tap-floor { min-height: 44px; min-width: 44px; }` with the comment *"the WCAG 2.5.5 44px minimum touch-target floor"*.

```
$ grep -rn "tap-floor" --include="*.vue" demo/ | wc -l
0
```

**Zero consumers, demo-wide.** This component's targets are 24 × 24 (`KeyframesEditor.vue:83`, `KeyframeCard.vue:23`, `:26`, and the `p-0` icon buttons). I state the standard honestly: 24 × 24 **meets** WCAG 2.5.8 Target Size (Minimum, AA); it fails 2.5.5 (AAA) and it fails the demo's own written floor. glass-ui even ships the non-invasive fix — `@utility touch-hit-area` (`utilities/a11y-overrides.css`) expands the hit box on `(pointer: coarse)` without changing layout.

Sharper sub-case: `KeyframeCard.vue:14` puts the **destructive** X and the benign CopyButton in a bare `<div class="flex">` — **no gap**, two 24 px targets flush against each other, one of which deletes data irreversibly with no confirmation (**D-4**).

**Falsifier.** Show `.tap-floor` consumed anywhere, or show a coarse-pointer expansion applied to these icons.

---

### D-34 · `onUpdateStart` hand-rolls a constructor that exists

`KeyframesEditor.vue:206-209` builds `{ kind: "percent", value: scalar.value / 100 }` inline. `demo/utils/keyframeSelector.ts:23-26` is exactly that function (`percentSelector`). Same file, same directory tree, already imported by `useKeyframeOps.ts:9`. Duplication of a two-line constructor is minor in itself — it is listed because it is the *third* place in this component where the selector helpers were available and skipped (with **D-1** and **D-2**), which is what makes those two blockers a pattern rather than an oversight.

**Falsifier.** Show `percentSelector` is not importable from this file's alias graph — `@utils` is a declared vite alias (`vite.config.ts:37-60`) and `KeyframesEditor.vue` already imports through it indirectly.

---

## 4. INFO

### D-35 · Dead emits

`KeyframesEditor.vue:141-150` declares `sliderUpdate` and `keyframesUpdate`. `sliderUpdate` is **never emitted** (`grep -n "sliderUpdate" demo/` → the declaration only); `useKeyframesEditor` narrows the emit parameter to `"keyframesUpdate"` alone (`composables/useKeyframesEditor.ts:17-20`). And the sole callsite binds **neither** (`SpringPhysicsFacet.vue:119`). The component's entire outbound interface is inert.

**Falsifier.** Find an emitter or a listener. Neither exists in `demo/`.

### D-36 · Shared `#highlightjs-theme` teardown is safe only by coincidence

`useCodeHighlight` is instantiated twice in one tree (`KeyframesEditor.vue:176` and `KeyframesAddDialog.vue:92`); both `ensureThemeStyle()` into the **same** `document.head` node, and both `onUnmounted` call `themeStyle.value?.remove()` (`useHighlightCSS.ts:142-145`). Today the two unmount together, so the second removal is a no-op. The moment two `KeyframesEditor`s coexist — which `framed`'s existence (**D-19**) anticipates — unmounting one strips syntax colouring from the other. Filed INFO, not MAJOR, because it is currently unreachable.

**Falsifier.** Show refcounting on the shared node (there is none), or a guarantee of single-instance mounting (`framed` implies the opposite intent).

---

## 5. Where I contradict the hitherto corpus

1. **Census §6.3 (flat-namespace hazard).** The lane scoped the collision surface to *custom properties* ("98 unprefixed… worth a dedicated collision audit"). **D-13** shows the collision is already realised in **class-name** space: `.focus-ring` is defined by both glass-ui (layered) and the demo (un-layered), and the demo's copy silently overrides the vendor primitive's focus behaviour repo-wide. The audit the lane deferred is already overdue in a namespace it did not enumerate.

2. **Census §5 shadow tally (217 "replace-now" lines).** **D-15** adds `useToolbarKeyboard` (111 lines) as a **second** local fork of `useTabRovingFocus`, written at S.C3b — after the KfPillTabs fork the lane catalogued. Replace-now/evaluate lines rise from 217 to **328**. **D-14** adds two more naked-button sites to the S-7 pattern.

3. **Census §6.5 (PRM coverage "conscientious").** The lane counted 13 enforcement sites, all CSS or `matchMedia`. **D-5** shows the assessment does not transfer to the engine layer: `respectReducedMotion` defaults `false`, this component sets it nowhere, and glass-ui's global CSS PRM block structurally cannot reach WAAPI/inline-style-driven animation. In a demo whose *own* §6.4 states "the dominant motion substrate is not CSS — it is the library itself", counting CSS guards measures the smaller half.

I found **no** contradiction of F-1 (glass-ui phantom dependency), S-8 (TypingDots justified), or §3.4 (zero direct reka imports). Those hold here: this component imports glass-ui only through its public barrel and subpaths.

---

## 6. Superlatives (L-18, run in reverse)

**SUP-1 · `useToolbarKeyboard` is a correct WAI-ARIA toolbar.** `composables/useToolbarKeyboard.ts:36-110` — one tab stop via roving tabindex, Arrow wrap by true modulo (`:61`, correct for negative deltas), Home/End, and the roving cohort filtered on both `[disabled]` and `aria-hidden="true"` (`:44-48`). Container-based, so it is agnostic to how each item renders its button. The `queueMicrotask(refresh)` at `:106-108` is the right seat for a set that is populated by child components. Most hand-rolled roving implementations get the negative-modulo wrap or the disabled filter wrong; this gets both. *(Held against **D-15**, which questions whether it should exist — not whether it is right.)*

**SUP-2 · The contenteditable carries real ARIA.** `KeyframeCard.vue:46-49`: `role="textbox"`, `aria-multiline="true"`, and a per-index `aria-label`. A bare `contenteditable` `<pre>` — the overwhelmingly common shape — announces as a generic group with no editable affordance. This one announces as a multi-line textbox with a name that identifies which keyframe it edits.

**SUP-3 · Decorative-vs-interactive hygiene at the icon layer.** `KeyframesEditor.vue:73` `WandSparkles aria-hidden="true"` and `:94` `Paintbrush class="pointer-events-none"` inside its button. The pointer-events suppression means the click target is the button, never the glyph — so the event target is stable for the roving-focus query and the brush's animation ref is never the click origin. Both details are usually missed. *(The wand's **visual** treatment is **D-17**; its ARIA treatment is right.)*

**SUP-4 · `aria-pressed` on a genuine toggle, with a payoff the author may not have intended.** `KeyframesEditor.vue:90` `:aria-pressed="cssApplied"`, correctly reflecting `useApplyCSS`'s `isApplied`. Because glass-ui's `accessibility.css` forced-colors block keys on `[aria-pressed="true"]`, this is — per **D-31** — the **only** control in the component that renders a state indicator under Windows High Contrast. Correct semantics bought a high-contrast affordance for free.

**SUP-5 · The destructive token clears 1.4.11 in both themes, under measurement.** `KeyframeCard.vue:23` `text-accent-red`, `--accent-red: light-dark(oklch(0.574 0.216 27.5), oklch(0.644 0.165 22.9))`. Converting OKLCh → linear sRGB → WCAG luminance: light `Y = 0.1645` → **4.89:1** vs the `#ffffff` plate and **4.53:1** vs `--card`; dark `Y = 0.2433` → **5.29:1** vs `#0d1117`. Requirement for a non-text UI component is 3:1; both themes clear it with margin. The T.D7 / OD-6 "red's ONE sanctioned home post-red-kill" discipline the comment at `:15-19` claims is not just documented — it **measures true**. *(The glyph's failure is structural — **D-4** — not chromatic.)*

**SUP-6 · The formatter's honest degradation.** `KeyframeCardList.vue:44-52`: `formatFn` is a `shallowRef` seeded `null`; `formattedStrings` falls back to the raw frame string until `loadAnimationEngine()` resolves. No blank, no flash, no spinner for a sub-frame wait, and the fallback is *semantically valid CSS* rather than a placeholder. The reasoning is written down at `:38-43`. This is the correct shape for a lazily-loaded pure transform — and it is why I confined **D-20** to `frameStrings` and explicitly exempted this mechanism.

**SUP-7 · `CopyButton`'s live region is right, twice over.** `CopyButton.vue:13-15` — a `sr-only` `role="status" aria-live="polite"` sink, so the copy is announced without a visual change; and `:57-60` clears then re-sets it inside `requestAnimationFrame`, so a **repeat** copy of identical text re-announces (an unchanged `aria-live` text node does not fire). The comment names both the mechanism and the reason. Also: it is a real `<button type="button">` with a state-dependent `aria-label` (`:4`) — the exact treatment the delete X (**D-4**) omits, in a file this component imports.

---

## 7. Standing to a live audit

Nothing above required a browser; every claim is source- or token-derived and falsifiable by reading the tree. Three claims would nonetheless benefit from SS-13 visual confirmation and are marked:

* **UNPROVEN-NEEDS-LIVE (a)** — **D-17**'s "83 px of dead space" assumes the rail at its `clamp` ceiling; the perceived diffusion at each real breakpoint wants a screenshot.
* **UNPROVEN-NEEDS-LIVE (b)** — **D-25**'s scrollbar gutter is platform- and OS-preference-dependent; the CSS fact (`scroll` ≠ `auto`) is decidable, the rendered gutter is not.
* **UNPROVEN-NEEDS-LIVE (c)** — **D-10**'s empty-list paint depends on how many microtask turns `formatEditorCSS` consumes; the *unmount* is certain from source, the visible flash is not.

Everything else — including all four BLOCKERs — stands on the tree alone.

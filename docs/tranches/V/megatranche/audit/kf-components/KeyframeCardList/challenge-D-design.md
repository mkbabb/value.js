claude-opus-5[1m]

# CHALLENGE · `KeyframeCardList.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/components/KeyframeCardList.vue` (82 lines)
**Posture** assumed DEFECTIVE until the tree proved otherwise. Every claim below carries a falsifier; three claims survived their falsifier as SUPERLATIVES (L-18 both ways). No browser was used — every ratio and every layer verdict is computed from source. One claim is marked `UNPROVEN-NEEDS-LIVE`.

**Read whole (read-only):** the target; `KeyframeCard.vue` (its only local import, and the list is its SOLE render site — verified by grep, so the list owns the composed result); glass-ui `Separator.vue` + `separator` tokens + `field-control.css` + `Input.vue` + `a11y-overrides.css` + `a11y-fallback.css`; reka `BaseSeparator`; `KeyframesEditor.vue` (sole consumer); `useKeyframesParsing.ts` / `useKeyframesState.ts` / `useKeyframeOps.ts` / `useHighlightCSS.ts`; `formatEditorCSS.ts`; `demo/utils/keyframeSelector.ts`; `demo/styles/style.css` + `design-idioms.css`; engine `frame-compiler.ts`, `group/group.ts`, `presets/catalog.ts`, `constants/types.ts`; value.js `src/css/types.ts` + `grammar.ts` AND the installed `node_modules/@mkbabb/value.js@4.0.0` dist (types + minified runtime).

**Corpus folded (not re-invented):**
- `formation/keyframes/lane-frontend.md:182-183` — the census rows for this pair (`KeyframeCardList` 82 L "card list — Separator"; `KeyframeCard` 81 L "Label + Input"). Both were counted, neither was audited; this challenge is the first read of their interior.
- **F-1** (`lane-frontend.md:15,54,612`) — glass-ui is a phantom dependency. Every glass-ui-conformance verdict below is therefore conditional on a `node_modules` state that `npm ci` cannot reproduce. F-1 must land before any of D-4/D-9/D-10 can be *regression-tested*.
- **S-6 / S-7** (`lane-frontend.md:365,383`) — `Skeleton` and `Button+Tooltip` named as available-but-unreached; both bear directly on D-5 and D-13.
- `lane-frontend.md:100` — "**Utilisation 21/73 ≈ 29%** … the unreached 52 include `/skeleton`". D-5 is a live instance of exactly that under-reach.
- **No contradiction of the lanes was found.** One extension: lane-frontend §3.4 records "the demo reaches *around* glass-ui at the CSS layer … a soft coupling, but not an import-boundary breach." D-4 shows the coupling is not merely soft — a demo utility class *defeats* a glass-ui accessibility contract through the cascade layer order.

---

## Verdict

| | count |
|---|---|
| BLOCKER | 2 |
| MAJOR | 6 |
| MINOR | 5 |
| INFO | 4 |
| **defects** | **17** |
| **superlatives** | **3** |

The 82-line file itself is disciplined — genuinely so (see §S). Its defects are almost all *composition* defects: what it renders (`KeyframeCard`), what it hands upward (`cardRefs`), what it declines to own (semantics, rhythm, empty state). The one defect that is unambiguously its own — D-1 — is the worst thing on this surface.

---

## BLOCKERS

### D-1 · BLOCKER · the per-keyframe offset renders as `[object Object]`

`KeyframeCardList.vue:11`
```
:frame-start="frames[i].start.toString()"
```

`start` is a `TemplateAnimationFrame.start: KeyframeSelector` (`keyframes.js/src/animation/constants/types.ts:64-66`). `KeyframeSelector` is a **plain readonly object union**, not a class:

- value.js source `src/css/types.ts:42-44` — `Readonly<{kind:"percent"; value:number}> | Readonly<{kind:"named"; …}>`
- installed `node_modules/@mkbabb/value.js@4.0.0/dist/subpaths/css.d.ts:210-216` — identical
- installed **runtime** (minified `dist/subpaths/css.js`, `parseKeyframeSelector`) — literally `b({ kind: "percent", value: t / 100 })`. Object literal. No prototype, no `toString`.
- the engine stores that object verbatim: `frame-compiler.ts:145-147` (`start: parsedStart`) → `:164`.
- the consumer confirms the shape twice: `KeyframesEditor.vue:38` reads `frame.start.value`, and `:206-209` assigns `{ kind: "percent", value: … }`.

Therefore `.toString()` is `Object.prototype.toString` and every card is handed the string **`"[object Object]"`**, which is then painted in two places:
- `KeyframeCard.vue:4-7` — the sticky 64×64 offset `<Input :model-value="frameStart">`, i.e. the primary per-stop authoring affordance;
- `KeyframeCard.vue:37` — the muted metadata line `s {{ frameStart }}`.

Worse, the demo already **owns the correct helper** and uses it elsewhere: `demo/utils/keyframeSelector.ts:7` `selectorText(selector)` → `"50%"`, imported by `useKeyframeOps.ts:9`. The list reached past it for `.toString()`.

Prose consequence (this axis): the copy shown to the user in the highest-salience slot of every row is a JavaScript internal.

**Falsifier** — any ONE of: (a) `KeyframeSelector` carrying a `toString` (refuted at source, at the shipped `.d.ts`, and in the shipped minified runtime); (b) `templateFrames[i].start` being a `number|string` at runtime (refuted twice by `KeyframesEditor.vue:38` and `:206`); (c) a Vue-level coercion intercepting the expression (there is none — `.toString()` is called explicitly *inside* the template expression, before the prop is bound). Produce any of those and this claim dies.

**Note for the typing lane:** a correct `TemplateAnimationFrame<any>[]` prop type would NOT have caught this — `toString` exists on every object in TS. Do not sell the `any[]` fix (D-15) as the cure for D-1.

### D-2 · BLOCKER · the only way to delete a keyframe is mouse-only

`KeyframeCard.vue:20-25`
```
<X @click="(e) => emit('remove', e)" data-destructive class="… w-6 h-6 text-accent-red …" />
```
`X` is a `@lucide/vue` icon component: it renders an `<svg>`. Attributes fall through, so this ships an `<svg>` with a click listener and **no `tabindex`, no `role="button"`, no accessible name, no Enter/Space handler**. It is not in the tab order and is not exposed as an actionable element.

It is also the *sole* removal path: the editor's toolbar (`KeyframesEditor.vue:63-96`) holds a decorative wand (`aria-hidden`), the add dialog, copy, and apply — **no delete**. The list forwards this affordance and nothing else (`KeyframeCardList.vue:15`).

WCAG 2.1.1 Keyboard (A) and 4.1.2 Name/Role/Value (A) — a destructive operation with no keyboard or AT route at all. The comment block at `KeyframeCard.vue:15-19` reasons carefully about the *colour* of this control (destructive register, red-census marking) while the control is not operable.

**Falsifier** — show that `@lucide/vue`'s `X` renders a `<button>` (or injects `tabindex`/`role`), OR find any other keyframe-removal affordance in the demo (a shortcut in `registerShortcut`, a context menu, a toolbar item). Either kills it.

---

## MAJOR

### D-3 · MAJOR · the offset field has no accessible name

`KeyframeCard.vue:3-8` — the `<Input>` carries 14 utility classes and **no `aria-label`, no `id`+`<label>` pair, no `placeholder`, no `aria-labelledby`**. glass-ui's `Input` adds none: `glass-ui/src/components/input/Input.vue:44-53` renders a bare `<input v-bind="{…forwardedAttrs, …nativeProps}">` — nothing is synthesised. The adjacent `s {{ frameStart }}` `Label` (`:36-38`) is a *sibling*, not a `for=`-bound label, and it sits inside a `pointer-events-none opacity-25` decoration block.

Result: a screen-reader user hears "edit text, [object Object]" (with D-1) or "edit text, 50%" (without) — never *what* it edits. WCAG 4.1.2 (A) + 3.3.2 Labels or Instructions (A). Note the sibling `<pre>` two lines down *does* carry `role="textbox" aria-multiline aria-label` (`:46-49`) — the author knew the idiom and applied it to the code block only.

**Falsifier** — a `useFieldControlState` path in glass-ui that derives a name from `data-slot`/`name`/context (I read `Input.vue` whole; it forwards attrs and sets only `data-*` + `aria-invalid`), or a `<label for>` elsewhere binding to this input.

### D-4 · MAJOR · the glass-ui focus contract is defeated from the utilities layer

`KeyframeCard.vue:4` includes `border-transparent … shadow-none focus:border-transparent focus:shadow-none border-none`.

glass-ui paints the field's entire keyboard-focus affordance as exactly those two properties:
```
glass-ui/src/components/_shared/field/field-control.css:56-59
.field-control:focus-visible { border-color: var(--color-accent-opaque, var(--focus-ring-color)); box-shadow: var(--focus-ring-shadow); }
```
…inside `@layer components` (`field-control.css:1`). The demo's layer order is declared by glass-ui's own index: `@layer theme, base, components, utilities;` (`glass-ui/src/styles/index.css:1`), imported after `@import "tailwindcss"` (`demo/styles/style.css:1,3`). Tailwind v4 emits utilities into `@layer utilities` — **later layer wins regardless of specificity** (CSS Cascade L5). `:focus-visible` always also matches `:focus`, so the `focus:` variants apply on keyboard focus too.

So the control renders at rest with transparent border, transparent background, no shadow — and on keyboard focus, *nothing changes*. This is also the sharper form of the bespoke-vs-glass question: the card imports a design-system form control and strips its border, background, padding, shadow, radius and focus state, i.e. uses `Input` as a naked `<input>` while paying its import cost.

**Falsifier** — evidence that this project's Tailwind build does not emit utilities into `@layer utilities` (v4 does by default), or a demo-side `@layer` re-declaration reordering components after utilities (I checked `demo/styles/style.css:1-16`: none). If an evaluator accepts the native text caret as a sufficient 2.4.7 indicator for a text input, the *a11y* half drops to MINOR — the design-system-conformance half stands either way.

### D-5 · MAJOR · no loading state, no empty state; the list blanks itself on every regeneration

The list has exactly one rendering mode: N rows. `frameStrings: []` produces zero elements — no skeleton, no placeholder, no "no keyframes" copy, no reserved height.

Two reachable blanks:

1. **Mount.** `templateFrameStrings` is seeded `[]` (`useKeyframesState.ts:25`) and only filled by `onMounted → updateAllStrings()` (`KeyframesEditor.vue:279-280`). That path awaits `loadAnimationEngine()`, then `formatEditorCSS()` per card — which is `await Promise.all([import("prettier"), import("prettier/plugins/postcss")])` (`demo/utils/formatEditorCSS.ts:5-8`). On first mount those are real chunk loads, so a paint with **zero rows** is certain, not theoretical.
2. **Every regeneration.** `useKeyframesParsing.ts:48-54` sets `templateFrameStrings.value = []` *before* awaiting, then refills. Every offset edit, slider drag, control change and removal re-enters the blank.

Visible consequence in the shipped configuration (`SpringPhysicsFacet.vue:119` mounts `:framed="false"`, so the wrapper is `KeyframesEditor.vue:23` `div.p-2.grid.gap-4`): the card region collapses from N×(≥128 px + rhythm) to 16 px of padding and the sticky slider/toolbar block jumps up, then jumps back. A layout jolt on every keystroke-driven regeneration.

glass-ui ships `Skeleton`, and lane-frontend §3.1 already recorded it among the 52 unreached exports (and S-6 as a landing candidate). This is the cost of that under-reach, in one component.

**Falsifier** — a `<Suspense>`/skeleton ancestor covering the editor until strings resolve (`KeyframesEditor`'s setup is synchronous — `kfEngine()` is the warm sync accessor per `:127-130` — so a Suspense boundary resolves *before* the prettier load), or a min-height/`grid-template-rows` reservation on the wrapper (there is none at `KeyframesEditor.vue:11,23`). The *per-edit* blank additionally depends on whether a paint occurs between the two awaits; the mount blank does not. See also D-17 — do not remove blank #2 before fixing the highlight/vdom divergence it currently masks.

### D-6 · MAJOR · removal announces nothing and destroys focus

`KeyframeCardList.vue:15` forwards `remove`; `:64-72` is the only place that knows the row order and holds the card elements. Nothing in the chain (`KeyframesEditor.vue:232-250` → `useKeyframeOps.ts:193-210`) restores focus or announces the change. The demo's only live region is `CopyButton.vue:15` (verified by an exhaustive `aria-live|role="status"|role="alert"` grep over `demo/`). So on delete:

- the element that received the click is removed from the DOM → focus falls to `<body>`; a keyboard/AT user is dumped to the top of the document with no anchor;
- nothing is announced — not the removal, not the new count, not the failure case. The failure case is announced only *visually*, as a toast (`useKeyframeOps.ts:195` "Cannot remove last keyframe").

The list is the correct owner: it already collects `cardRefs`, so "focus the successor row (or the predecessor when last)" is a two-line contract at the site that already computes the neighbour index — `KeyframesEditor.vue:239-240` computes exactly that neighbour, for the animation only.

**Falsifier** — a focus-restoration call or `aria-live` region anywhere in the remove path, or a `role="status"` in an ancestor shell that the toast library mirrors into (vue-sonner's toaster does provide one — if the "Cannot remove last keyframe" toast is announced, the *failure* half of this claim weakens; the success-path focus loss is untouched by that).

### D-7 · MAJOR · the removal motion is not reduced-motion-honest, and it gates the data change

`KeyframesEditor.vue:244-249` plays `warpLeft` on the removed card and `jumpUp` on its neighbour, `await`s the group, and only then mutates data.

- `warpLeft` = `{ duration: 700, timingFunction: "ease-in-bounce" }` (`presets/catalog.ts:120-123`) — a 700 ms bounce translate.
- `AnimationGroup.respectReducedMotion = false` by default (`group/group.ts:55-57`), and `AnimationGroup.of(...)` sets no options — the PRM snap at `group/lifecycle.ts:75-80` never fires.
- glass-ui's global PRM wildcard (`utilities/a11y-overrides.css:41-48`, `animation-duration: 0.01ms !important; transition-duration: 0s !important`) **structurally cannot** catch this: it is a JS rAF animation writing inline style values, not a CSS animation or transition. There is no `prefers-reduced-motion` rule anywhere in `demo/styles/` (verified).

So a user who has asked for reduced motion gets the full 700 ms bounce — *and* waits 700 ms for their delete to take effect, because the data removal is sequenced behind `await …play()`. The list is implicated by contract, not by accident: `KeyframeCardList.vue:69-72` exists specifically to hand these elements out ("derived for the remove animation").

**Falsifier** — a `respectReducedMotion` default of `true` on `AnimationGroup` (source says `= false`), a preset-level override in `presets/classic.ts`, or a demo-level PRM guard around `removeKeyframe`. Any of those kills it.

### D-8 · MAJOR · the row metadata is painted at ≤ 1.84 : 1

`KeyframeCard.vue:28-39` — the `f {index}` / `s {frameStart}` block is `italic opacity-25`, with `text-mono-small font-light` labels (`text-mono-small` = `--font-mono` at `--type-small`, `glass-ui/src/styles/typography/utilities.css:49-53`).

`opacity: 0.25` composites in sRGB, so the **theoretical ceiling** — pure black text on pure white — is:
`0.75×255 = 191` → `191/255 = 0.7490` → linearised `((0.7490+0.055)/1.055)^2.4 = 0.5209` → contrast `(1.0+0.05)/(0.5209+0.05) = ` **1.84 : 1**.

Every real token (`--foreground` over `--card`) lands *below* that. Required: 4.5 : 1 (WCAG 1.4.3 AA, small text); this is short by a factor of ~2.4 in the best imaginable case. And the content is not redundant — `f {index}` is the row's only visible identity, available nowhere else on the surface.

This one is token-independent, which is why it is decidable statically: no palette choice can rescue an `opacity-25` text layer.

**Falsifier** — mark the block `aria-hidden` *and* accept it as purely decorative (it is currently neither: it is exposed to AT and carries the only frame index), or show that `opacity` on this subtree is overridden at a higher layer.

---

## MINOR

### D-9 · MINOR · N−1 unnamed `role="separator"` nodes, over cards that carry no structure at all

`KeyframeCardList.vue:19-22` renders `<Separator class="w-full">` with no `decorative`. glass-ui defaults `decorative: false` (`Separator.vue:16-19`), and with no `label` prop the component takes the `v-else` branch into reka's `BaseSeparator`, whose `semanticProps` is `props.decorative ? {role:"none"} : {role:"separator", …}` (`node_modules/reka-ui/dist/component/BaseSeparator.js`, `semanticProps` computed). So the surface exposes N−1 unnamed structural separators.

Meanwhile the cards themselves have **zero** grouping semantics: `KeyframeCardList.vue:2` is `<div class="contents">` (no role — and `display:contents` forecloses giving it one without losing grid participation), each card root is a bare `div.grid` (`KeyframeCard.vue:2`), and there is no `role="list"`/`listitem`, no `role="group"` + per-card name, no `aria-setsize`/`aria-posinset`. The rendered a11y tree is a flat run of textboxes punctuated by anonymous separators — the divider carries the structure precisely because nothing else does.

Both readings are defective and they point at the same fix: name the rows (`role="group"` + `aria-label="Keyframe {i} at {offset}"`, or list semantics), then make the rules `decorative`.

**Falsifier** — a reka release where `decorative:false` yields `role="none"` (refuted in the installed dist), or an ancestor supplying the grouping semantics (`KeyframesEditor.vue:10-33` supplies `Card`/`CardContent`/`div` — none).

### D-10 · MINOR · the divider is 1.69 : 1 and disappears entirely under forced-colors

`--separator-ink: color-mix(in srgb, var(--foreground) 22%, transparent)` (`glass-ui/src/styles/tokens/color-radius.css:191`), painted as `background` on a 1 px box (`Separator.vue:100-108`).

- Contrast ceiling (black foreground, white ground): `0.78×255 = 199` → linear `0.5711` → `1.05/0.6211 =` **1.69 : 1**. Fine for decoration; short of the 3 : 1 that a *semantic* separator would want — and D-9 established it is currently declared semantic.
- Forced-colors: the element's only visual is `background-color`, which forced-colors mode overrides to the system Canvas colour. There is **no** `@media (forced-colors: active)` arm for `.separator` — glass-ui writes such arms deliberately elsewhere (`glass/a11y-fallback.css:68-88` restores `border: 1px solid CanvasText` for every glass rung; `StatusDot.vue:203`; `utilities/a11y-overrides.css:95`), so the idiom is house style and this component was missed. Under Windows High Contrast the row dividers vanish, leaving D-9's rhythm as the only separation cue.

Inherited from glass-ui — fix belongs upstream (relay per the standing BH/BI edict), not in the demo.

**Falsifier** — a forced-colors rule matching `.separator` anywhere in the glass-ui cascade (grepped: the matches are drawer/status-dot/glass-ladder/focus, none reach `.separator`), or a `border`-based separator variant in the shipped `dist` that differs from `src`.

### D-11 · MINOR · the rhythm is double-encoded and out of proportion with its frame

`KeyframeCardList.vue:2` is `display:contents`, so the cards **and the separators** become direct grid items of the parent (`KeyframesEditor.vue:11` `CardContent.p-2.grid.gap-4`, or `:23` for the shipped `framed="false"` path). With Tailwind's default scale that is `gap: 1rem` on both sides of the 1 px rule:

- card → card measures **16 + 1 + 16 = 33 px**;
- the container inset is `p-2` = **8 px**.

So the internal rhythm is **4.1×** the frame that is supposed to contain it — cards read as bleeding to the container edge while floating apart from each other, the inverse of the Aristotelian rule that a bounded whole's frame should be no tighter than its internal gutter. And the separation is stated twice: a 2 rem void *and* a hairline. A hairline exists to let a gutter be small; a 2 rem gutter exists to let the hairline be dropped. Pick one — either `gap-4` with no rule, or a `gap-2`-class gutter with the rule.

The mechanism is also an authority problem worth naming: by choosing `display:contents`, the *list* component owns no list layout at all. It cannot express a tighter rhythm around its own dividers even if it wanted to; all spacing authority sits in the parent's single `gap-4`.

**Falsifier** — a Tailwind theme override redefining the `4` spacing step (`demo/styles/style.css` imports `tailwindcss` bare; no `--spacing` override found), or a negative-margin/`gap-y-0` rule on the wrapper. Exact rendered pixel rhythm is `UNPROVEN-NEEDS-LIVE` for the SS-13 pass, but the CSS is decidable and the *ratio* is not in doubt.

### D-12 · MINOR · `class="w-full"` on `Separator` is dead code, and mixes a physical property into a logical contract

`KeyframeCardList.vue:20`. glass-ui already sets `inline-size: 100%` for horizontal orientation (`Separator.vue:105-108`), and as a grid item under `display:contents` the element stretches to the column by default (`justify-self: stretch`). The utility is redundant twice over. It also re-states a logical property (`inline-size`) with a physical one (`width`) on a component whose stylesheet is deliberately logical throughout — no behavioural RTL difference (both are the inline axis), but it erodes the convention that makes the RTL audit cheap.

**Falsifier** — a `cn()`/tailwind-merge interaction or a competing rule that makes the separator not stretch without `w-full`. `cn` merges classes only (`_shared/class-names`); the scoped rule is unconditional.

### D-13 · MINOR · 24 px destructive target, under the demo's own declared 44 px floor

`KeyframeCard.vue:23` (`w-6 h-6` = 24 px) and `:26` (`CopyButton class="h-6 w-6"`), sat side by side in a bare `flex` with no gap (`:14`). The demo defines and documents its own floor — `.tap-floor { min-height: 44px; min-width: 44px; }` "the WCAG 2.5.5 44px minimum touch-target floor" (`demo/styles/design-idioms.css:83-86`) — and neither control uses it. 24 × 24 exactly meets 2.5.8 (AA), so this is a house-standard miss rather than a conformance failure; the destructive control being the smaller-tolerance case, and being adjacent to a non-destructive one with zero separation, is what makes it worth fixing. Folds S-7 (`lane-frontend.md:383`): if `CopyButton` migrates to `Button`+`Tooltip`, it inherits a real hit area and this row's asymmetry gets worse, not better, unless `X` moves at the same time.

**Falsifier** — a `[data-destructive]` or icon-button rule elsewhere in the cascade applying a min-size (grepped `design-idioms.css`; none), or coarse-pointer arms in glass-ui reaching a bare `<svg>` (they key off `data-kind`/component classes, not raw SVG).

---

## INFO

### D-14 · INFO · `formattedStrings[i] ?? s` is provably dead

`KeyframeCardList.vue:10` guards against a short `formattedStrings`, but `formattedStrings` is `props.frameStrings.map(…)` (`:50-52`) — same array, same length, by construction, in the same computed. The fallback can never fire. Harmless, but it reads as a defended invariant where there is no exposure, which makes the *undefended* one (D-15) look intentional by contrast.
**Falsifier** — any path where `formattedStrings` is assigned from something other than a `map` over `frameStrings`.

### D-15 · INFO · the guard asymmetry: `frames[i]?.id` on line 5, `frames[i].start` on line 11

Line 5 treats `frames[i]` as possibly-undefined; line 11 dereferences it. The component never decides whether `frames` may be shorter than `frameStrings`, and `frames: any[]` (`:35`) documents nothing.

I attempted to reach the crash and **could not** — recording the negative result so the next lane does not re-run it: the removal path reassigns `animation.templateFrames` to an N−1 array *before* the strings update (`useKeyframeOps.ts:202-207`), which would desync the two props — but `animation` is `markRaw` (`demo/scenes/spring/useSpringKeyframesEditor.ts:57`), so that reassignment triggers no re-render. The list re-renders only when `templateFrameStrings` changes, and that ref is set to `[]` before it is set to the new length, so the v-for body never executes against a mismatched pair. **Latent, not live.**
**Falsifier** — make `animation` reactive (or pass `frames` through a reactive wrapper) and the crash becomes reachable; conversely, prove the two lengths are coupled by construction and line 5's guard is the thing that should go.

### D-16 · INFO · the comment asserts an invariant the surface does not hold

`KeyframeCardList.vue:38-43`: "…until then the raw frame string is shown — **an honest pre-format frame, never a blank**." That is true of the *formatter* fallback and it is a good design decision. It is false of the composed surface, which blanks completely for a different reason (D-5). A reader takes the sentence as a guarantee about what the user sees; it is a guarantee about one of the two blanking mechanisms. One clause ("never a blank *from the formatter*") repairs it.
**Falsifier** — show `templateFrameStrings` is never emptied while mounted (`useKeyframesParsing.ts:50` says otherwise).

### D-17 · INFO · D-5's blanking is currently masking a highlight/vdom divergence — fix order matters `UNPROVEN-NEEDS-LIVE`

`useHighlightCSS.ts:117-126` highlights by `el.innerHTML = h.value` on the very `<pre>` the list's cards hand it (`KeyframeCardList.vue:76-79` → `KeyframeCard.vue:41-50`), which detaches the `<code>{{ formattedCSS }}</code>` text node Vue holds a reference to; subsequent model-driven patches would then write to a detached node and never appear. What prevents that from being visible is D-5: `templateFrameStrings.value = []` unmounts every card and remounts it fresh, clearing the `highlighted` marker and rebuilding the DOM. Two defects currently cancel. **Consequence for the repair wave: do not land the D-5 fix (keep rows mounted, add a skeleton) before the highlight path stops replacing Vue-owned DOM** — doing so in the wrong order converts an invisible coupling into a visible stale-content bug.
**Falsifier** — a live check showing model-driven `formattedCSS` updates reaching a highlighted `<pre>` without a remount, or a `key`/`v-html` arrangement I misread. Marked UNPROVEN pending SS-13.

---

## §S · SUPERLATIVES (L-18, both ways)

### S-A · the child-ref contract — genuinely correct, and it retired a real bug

`KeyframeCardList.vue:61-79` collects each card's exposed `preEl` (`KeyframeCard.vue:78-80`) and hands the list upward via `getPreElements()`; `KeyframesEditor.vue:176-178` feeds it to `useCodeHighlight(getOwnedElements)`, whose driver highlights **only** what it is handed (`useHighlightCSS.ts:130-138`). The composable's own comment names the retired bug: "the global `document.querySelectorAll("pre")` was the bug (D.W3.S1)". This is the right ownership shape — the scope is per-editor, so two editors on one page cannot cross-highlight, and it survives portalling/teleport where a DOM query would not. Most 82-line list components in this position reach for a query; this one declared a contract and documented it.
**Falsifier (runs both ways)** — a `querySelectorAll` surviving anywhere in the highlight path (grepped `useHighlightCSS.ts` whole: the only queries are `document.head.querySelector('#'+styleId)` for the two owned `<style>` elements, which is the documented dynamic-stylesheet idiom, not a content sweep). None found — the superlative stands.

### S-B · id-keyed rows over a `contenteditable` list

`KeyframeCardList.vue:5` keys on `frames[i]?.id`, and those ids are per-animation monotonic and stable across removal: `frame-compiler.ts:164-167` pushes with `id: this.frameId` then `this.frameId += 1`, and `useKeyframeOps.ts:202-204` removes by `filter` without re-numbering survivors. For a list whose rows are `contenteditable` regions, index keys would migrate DOM — and with it the caret, the selection, the undo stack and the `highlighted` marker — onto a different keyframe after any mid-list delete. The correct choice was made and it is the non-obvious one.
Two hairlines on an otherwise clean call: the `?? i` fallback aliases a keyspace that *is* the index space (ids start at 0 and increment by 1), so in the D-15 desync the fallback key could collide with a live row's key; and it is unreachable today only because D-15 is unreachable today. Prefer a fallback that cannot alias (`` `i${i}` ``).
**Falsifier** — non-unique or re-numbered ids (refuted at `frame-compiler.ts:164-167` + `useKeyframeOps.ts:202`).

### S-C · zero bespoke CSS, zero `--kf-*`, no vendored primitives

The named `--kf-*` flat-namespace hazard **does not manifest here**: an exhaustive grep for `--kf-` across the whole of `demo/` returns **0** hits. The list ships no `<style>` block, no scoped CSS, no custom property, and no local design tokens; its only styling is one utility (`w-full`, itself dead — D-12) and a glass-ui component. It also inherits the clean half of lane-frontend §3.3: no `ui/` copies, no local `cn()`, no cva factories anywhere in this tree. Whatever else is wrong on this surface, none of it is a token-namespace problem, and the *list* contributes no styling debt whatsoever.
**Falsifier** — any `--kf-` declaration or any `<style>` block in this component or its imports. Zero found in `demo/`.

---

## Fix order (dependency-respecting, for the repair wave)

1. **D-1** — one line, `selectorText(frames[i].start)`; it is a shipping visible-garbage defect and it costs nothing.
2. **D-2 → D-3 → D-4** — the operability triad on `KeyframeCard`: promote `X` to a real named `<button>`, name the offset field, stop stripping the field's focus contract. D-13 rides along with D-2.
3. **D-6** — focus restoration + a live region; the neighbour index is already computed at `KeyframesEditor.vue:239-240`.
4. **D-7** — set `respectReducedMotion` on the removal group (and consider un-gating the data mutation from the animation).
5. **D-8, D-9, D-11** — the visual/semantic pass: retire `opacity-25` for a real muted token, name the rows and make the rules `decorative`, resolve the double-encoded rhythm.
6. **D-17 then D-5** — in that order, strictly. The skeleton/empty state must not land before the highlight path stops overwriting Vue-owned DOM.
7. **D-10** — relay upstream to glass-ui (forced-colors arm for `.separator`); **F-1** must land before any of this is regression-testable.

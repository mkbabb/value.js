claude-opus-5[1m]

# Challenge · KeyframeCard · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/KeyframeCard.vue` (81 lines)
**Axis** how this component consumes **keyframes.js** (the library under test) and **@mkbabb/glass-ui** (the design system) — subpath choices, shadow components, value.js transitive exposure, props/emits contract quality, integration seams with siblings.
**Mode** static, read-only. No installs, no dev servers, no browser tooling. Livable-only claims are marked `UNPROVEN-NEEDS-LIVE`.
**Substrate** keyframes.js `master`; glass-ui **7.0.0** as installed at `node_modules/@mkbabb/glass-ui`; value.js **4.0.0** (pinned exact, `package.json:69`); `@lucide/vue` **1.17.0** (`package.json:74`).

**Files read whole (read-only):** the target; `components/CopyButton.vue`; `keyframes/components/KeyframeCardList.vue`; `keyframes/KeyframesEditor.vue`; `keyframes/composables/useHighlightCSS.ts`; `keyframes/composables/useKeyframesEditor.ts`; `keyframes/composables/useKeyframeOps.ts` (relevant spans); `demo/utils/keyframeSelector.ts`; `demo/styles/style.css` (z-contract); `src/animation/constants/types.ts`; `src/css/types.ts` (value.js); `node_modules/@mkbabb/glass-ui/dist/components/input/{Input.vue.d.ts,types.d.ts}`, `dist/Input-DY7soIPd.js`, `dist/components/_shared/field-control.css`, `dist/components/label/Label.vue.d.ts`, `dist/forms.d.ts`; `node_modules/@lucide/vue/dist/esm/{Icon.mjs,defaultAttributes.mjs}`; `test/demo/instrument/value4-editor-boundary.test.ts`.

**Reachability (the card is LIVE, not dead code):** exactly one mount path — `scenes/spring/SpringPhysicsFacet.vue:119` `<KeyframesEditor :animation="demo.springEditAnim" :framed="false" />` → `KeyframesEditor.vue:24` `<KeyframeCardList>` → `KeyframeCardList.vue:7` `<KeyframeCard>`. Every defect below is on the shipping spring-scene path.

**Corpus fold.** `formation/keyframes/lane-frontend.md` is authoritative for the tree-wide picture and is **not** re-derived here. Cited where I overlap: **F-1** (glass-ui phantom dependency — undeclared in `package.json` *and* `package-lock.json`, 7.0.0 present in `node_modules` only), roster row for this file (lane-frontend §4, "81 · `KeyframeCard.vue` · G · single keyframe card — `Label` + `Input`"), **§3.1** (21/73 subpaths reached; `/metric`, `/chip`, `/timeline` among the 52 unreached), **§6.3** (z-index single-sourced from glass-ui; no `--kf-*` namespace). `lane-library.md` §1 is cited for the value.js dependency shape (exact `4.0.0`, rootless, 6-of-7 subpaths). **No contradiction of either lane was found** — lane-frontend's one-line roster entry is correct as far as it goes; this challenge goes underneath it.

---

## 0. Verdict table

| id | severity | claim | anchor |
|---|---|---|---|
| **C-1** | **BLOCKER** | `frameStart` is `"[object Object]"` at runtime — a value.js `KeyframeSelector` laundered through `.toString()` | `KeyframeCardList.vue:11` → `KeyframeCard.vue:5,37` |
| **C-2** | **BLOCKER** | the destructive delete is a click handler on a bare `<svg>` — no keyboard path, no accessible name, no role | `KeyframeCard.vue:20-25` |
| C-3 | MAJOR | three negating utilities destroy glass-ui's focus affordance on the only text field | `KeyframeCard.vue:4` vs `field-control.css` |
| C-4 | MAJOR | glass-ui's whole invalidity channel (`invalid` → `aria-invalid`/`data-state`, `useUserInvalidAria`) unused; the field has no accessible name, no `inputmode`, no `pattern` | `KeyframeCard.vue:3-8` vs `input/types.d.ts`, `forms.d.ts` |
| C-5 | MAJOR | `z-modal` (rung 140) applied to in-card content — breaches the demo's documented ordered-layer contract | `KeyframeCard.vue:4` vs `styles/style.css:19-38` |
| C-6 | MAJOR | dual DOM ownership of the `<pre>`: Vue owns `<code>{{ formattedCSS }}</code>`, highlight.js `innerHTML`-replaces it, and the `highlighted` marker makes it one-shot | `KeyframeCard.vue:41-50` vs `useHighlightCSS.ts:116-126` |
| C-7 | MAJOR | the emits contract has no commit seam — `updateCSS`/`updateStart` fire per keystroke; every consumer pays for it | `KeyframeCard.vue:6,43` → `KeyframesEditor.vue:182-216` |
| C-8 | MINOR | glass-ui `<Label>` (reka `<label>`) used twice as decorative text with no control; `/metric` and `/chip` unreached | `KeyframeCard.vue:31-38` |
| C-9 | MINOR | `CopyButton` is fed `frameString` — the unformatted, pre-edit string, not what the card displays | `KeyframeCard.vue:26` |
| C-10 | MINOR | `remove` emits an `Event` payload the sole consumer discards, and omits the index the consumer actually needs | `KeyframeCard.vue:72` vs `KeyframesEditor.vue:232` |
| C-11 | MINOR | `formattedCSS`/`updateCSS` hyphenate to `formatted-c-s-s` / `@update-c-s-s` at every call site | `KeyframeCard.vue:64,71` vs `KeyframeCardList.vue:10,14` |
| C-12 | MINOR | sibling seam: the editor's `Slider` reads/writes `frame.start.value` in units that disagree with the card's write path; `selectorPercent`/`percentSelector` exist and are bypassed at both seams | `KeyframesEditor.vue:38,43,206-209` vs `demo/utils/keyframeSelector.ts:23-31` |

**Superlatives** (L-18 runs both ways) — §3: **S★1** the `defineExpose({ preEl })` child-ref contract; **S★2** the ARIA textbox contract on the contenteditable; **S★3** zero raw type scale, zero local `cn()`/cva, zero `<style>` block.

Tally: **12 defects · 2 blockers · 3 superlatives.**

---

## 1. Blockers

### C-1 · BLOCKER — `frameStart` receives `"[object Object]"`: a value.js structured type laundered through `.toString()`

**Claim.** The card declares `frameStart: string` (`KeyframeCard.vue:66`) and renders it twice — as the `Input`'s `:model-value` (`:5`) and as the visible readout `s {{ frameStart }}` (`:37`). The sole producer of that prop is:

```
KeyframeCardList.vue:11:                :frame-start="frames[i].start.toString()"
```

`frames` is `animation.templateFrames` (`KeyframesEditor.vue:15,25`). Its element type is fixed by the library:

```
src/animation/constants/types.ts:64-66
export interface TemplateAnimationFrame<V extends Vars> {
    id: number;
    start: KeyframeSelector;
```

and `KeyframeSelector` is a **value.js type re-exported across the LIGHT-pure constants seam** (`constants/types.ts:17` `import type { KeyframeSelector } from "@mkbabb/value.js/css"`), defined as a plain readonly object union with **no `toString`**:

```
value.js src/css/types.ts:42-44
export type KeyframeSelector =
    | Readonly<{ kind: "percent"; value: number }>
    | Readonly<{ kind: "named"; name: "entry" | "exit" | "cover" | "contain"; offset?: number }>;
```

`Object.prototype.toString` therefore yields the literal string `"[object Object]"` for **every card, on first paint**.

**This is not an inference from types alone — the library never stringifies a selector that way.** Every internal site routes through a discriminator:

```
src/animation/compile/emit/format.ts:20-21     selectorText(selector) → selector.kind === "percent" ? …
src/animation/compile/emit/css-text.ts:59      if (selector.kind === "percent") return `${selector.value * 100}%`;
src/animation/compile/emit/densify.ts:21-22    percentOfStart(start) → start.kind === "percent" ? start.value * 100 …
src/animation/compile/emit/backward-color.ts:151-152   percentOf(start) → …
src/animation/compile/frame-compiler.ts:69-70  start.kind === "percent" ? start.value * duration : Number.NaN
```

**And the demo ships the correct helper, gated by its own test.** `demo/utils/keyframeSelector.ts:7-12` exports exactly the conversion this prop wants:

```ts
export const selectorText = (selector: KeyframeSelector): string =>
    selector.kind === "percent" ? `${selector.value * 100}%` : …
```

It is consumed by the sibling ops path (`composables/useKeyframeOps.ts:110-111` — `const start = animation.templateFrames[frameIx]!.start; const wrapped = \`${selectorText(start)} { … }\``) and by the timeline (`useTimelineBuild.ts:167` `selectorPercent(frame.start)`), and it is **asserted green in CI**:

```
test/demo/instrument/value4-editor-boundary.test.ts:26
    expect(selectorText(named)).toBe("entry 50%");
```

So the repo simultaneously (a) proves `selectorText` correct in a test and (b) ships `.toString()` at the card seam. There is no test on the card path — `grep -rln "KeyframeCard\|frameStart" test/` returns only `value4-editor-boundary.test.ts` (which imports the *helper*, never the component) and `test/engine/nan-frame.test.ts`. `e2e/` does not exist.

**Why this is the card's finding and not only the list's.** The launder is only *possible* because the card's props contract is stringly-typed. `frameStart: string` accepts anything `String()` produces, so TypeScript cannot see the mismatch; had the prop been `frameStart: KeyframeSelector` (the library's own exported type, already in the demo's graph via `demo/utils/keyframeSelector.ts:3`) the miss would be a compile error at `KeyframeCardList.vue:11`. This is the value.js transitive-exposure defect on this axis: a structured value.js type crosses two component boundaries as an untyped string, and it breaks at the crossing.

**Failure scenario (concrete, end to end).** Open the spring scene → `SpringPhysicsFacet` → the per-stop card list. Every card's start field shows `[object Object]` and the italic readout under the copy button reads `s [object Object]`. The user selects the field, types `50%`, and the field commits: `KeyframesEditor.vue:182-211` parses it green (`parseCssScalar("50%")` → `{type:"number", unit:"%"}`), writes `frame.start = { kind: "percent", value: 0.5 }` (`:206-209`), and calls `updateAllStringsAndAnimation()` (`:210`). That path runs `useKeyframesParsing.ts:50` `templateFrameStrings.value = []` — blanking the array unmounts every `KeyframeCard` — then refills it (`:52`), remounting them. The freshly mounted `Input` is constructed with `modelValue = frames[i].start.toString()` = `"[object Object]"`. **The user's `50%` is erased on screen roughly one animation frame after it was accepted by the model.** The model is right; the only view of it is `[object Object]`.

**Falsifier.** This claim dies if any of: (i) `KeyframeSelector` acquires a `toString` (it is a `Readonly<{}>` type alias — a type cannot carry a method implementation, so this would require the parser to emit class instances; `value.js src/css/types.ts:42` says otherwise); (ii) `animation.templateFrames[i].start` holds a primitive at runtime rather than the selector object (falsified by `frame-compiler.ts:69` `start.kind === "percent"` and by `KeyframesEditor.vue:38,43` reading/writing `frame.start.value`, both of which require an object); (iii) some CSS or a parent rule hides both the `Input` value and the `s` readout (the readout is `opacity-25 pointer-events-none` but rendered, `:29`; the `Input` is a real `<input>` with `display:block`). A one-line `console.log(String(anim.templateFrames[0].start))` in the spring scene is the decisive live probe.

---

### C-2 · BLOCKER — the destructive delete is a click handler on a bare `<svg>`

**Claim.** The keyframe-removal affordance is:

```vue
KeyframeCard.vue:20-25
<X
    @click="(e) => emit('remove', e)"
    data-destructive
    class="p-0 m-0 scale-on-hover cursor-pointer stroke-2 w-6 h-6 text-accent-red hover:opacity-80 …"
>
```

`X` is a `@lucide/vue` **functional component** that renders an `<svg>` and spreads its incoming props onto it:

```js
node_modules/@lucide/vue/dist/esm/Icon.mjs:16-25,41-57
const Icon = ({ name, iconNode, …, ...props }, { slots }) =>
  h("svg", { ...defaultAttributes, ...props, width: …, class: mergeClasses("lucide", …) }, …)
```

`defaultAttributes` (`defaultAttributes.mjs:8-17`) is `xmlns / width / height / viewBox / fill / stroke / stroke-width / stroke-linecap / stroke-linejoin` — **no `role`, no `tabindex`, no `aria-hidden`, no `focusable`.** So the rendered node is an `<svg class="lucide lucide-x-icon …" onclick=…>` that is:

- **not focusable** — SVG elements are not in the tab order without an explicit `tabindex`;
- **not keyboard-operable** — a `click` handler on a non-button element receives no synthetic Enter/Space activation;
- **anonymous to AT** — no `aria-label`, no `<title>`, and not `aria-hidden`, so it is exposed as an unnamed graphic.

**A keyboard-only or screen-reader user cannot delete a keyframe.** The delete is the card's only destructive operation and it has no non-pointer path.

**The contrast is inside the same flex row.** Six lines below, in the same `<div class="flex">` (`:14`), sits the correct idiom — a real button with an accessible name and a live status region:

```vue
components/CopyButton.vue:2-4
<button type="button" :aria-label="isCopied ? 'Copied to clipboard' : label" …>
```

And the card's own parent, three files up, demonstrates the exact lucide-inside-a-button pattern this component should have used:

```vue
KeyframesEditor.vue:87-95
<button type="button" aria-label="Apply CSS keyframes to the target" :aria-pressed="cssApplied" … @click="applyCSSStyles">
    <Paintbrush ref="brush" class="pointer-events-none" />
</button>
```

That call site even carries the comment (`:71-72`) recording a prior migration *away* from a focusable no-op toward correct semantics, and `KeyframesEditor` runs `useToolbarKeyboard` (`:271-272`) to give the toolbar roving tabindex "over the real button descendants". The card is the one node in this cluster that never got the treatment. The design system offers `Button` from the root barrel (lane-frontend §3.2 lists it as already-drawn) — nothing had to be built.

**Aggravating: the styling was audited, the semantics were not.** `:15-19` carries a five-line comment justifying `--accent-red` over a Tailwind literal and marking `data-destructive` so "`proof:accent-census`'s red-census recognizes the role". The gate that ran over this element checked its *colour*; no gate checked that the destructive role is reachable.

**Failure scenario.** Tab through the card. Focus goes: `Input` → (skips the `<svg>` entirely) → `CopyButton` → the contenteditable `<pre>`. The delete is never reachable. With VoiceOver/NVDA, the element is announced as an unlabelled graphic with no action; pressing Enter or Space on it does nothing at any point.

**Falsifier.** Dies if (i) some ancestor CSS or a global script injects `tabindex`/`role` onto `.lucide` icons — `grep -rn "lucide" demo/styles/*.css` shows no such rule and there is no icon wrapper plugin (`useLucideProps` context, `Icon.mjs:14`, carries only `size/color/strokeWidth/absoluteStrokeWidth/class`); (ii) `@lucide/vue@1.17.0` sets `role="img"`/`tabindex` in a build other than `dist/esm/Icon.mjs` — the CJS build is the same factory; (iii) a keyboard shortcut elsewhere removes a keyframe — `registerShortcut` is used at `shell/EditorShell.vue:122` only, and `grep -rn "removeKeyframe" demo/` shows the only callers are this emit chain and `useKeyframeOps.removeKeyframeData`. Live probe: tab the spring scene's card list and count stops.

---

## 2. Majors and minors

### C-3 · MAJOR — three negating utilities destroy the field's focus affordance

**Claim.** `KeyframeCard.vue:4` decorates the glass-ui `Input` with, among others: `border-transparent`, `shadow-none`, `border-none`, `focus:border-transparent`, `focus:shadow-none`, `bg-transparent`. glass-ui paints the *entire* focus indicator through exactly those two properties:

```css
node_modules/@mkbabb/glass-ui/dist/components/_shared/field-control.css
@layer components { …
  .field-control:focus-visible { outline: none; border-color: var(--color-accent-opaque, var(--focus-ring-color)); box-shadow: var(--focus-ring-shadow); }
```

Specificity is a tie — `.field-control:focus-visible` is (0,2,0); Tailwind's `.focus\:shadow-none:focus` is (0,2,0) — so **layer order decides**, and Tailwind v4's `@import "tailwindcss"` (`demo/styles/style.css:1`) declares `theme, base, components, utilities` with `utilities` last. glass-ui's rule is inside `@layer components`. The card's utilities therefore win: `outline` is already `none` (from glass), the border is `none` unconditionally, and the ring `box-shadow` is zeroed on `:focus`. **The result is a text input with no visible focus state.** WCAG 2.4.7 (AA).

This is also the standing-law breach: `feedback_root_styling` ("style changes at root component level, not per-instance overrides") and `feedback_glass_ui_first_class` ("add variants/primitives there"). `InputProps` (`dist/components/input/types.d.ts`) has **no `variant`/`ghost`/`bare`** — so the borderless field the card wants is *not expressible* through the API, which means the correct move was to request the variant in glass-ui, not to erase `field-control` with six utilities in a consumer. The override is also partly inert, which is the tell that it was written blind: `.field-control[data-kind="input"]` sets `block-size: var(--field-control-height)` and `border-radius: var(--radius-pill)`, so the card's `aspect-square` (`:4`) cannot take effect against an explicit block-size, and the pill radius survives on a box the card is trying to make square.

**Falsifier.** Dies if `field-control.css` is injected outside a cascade layer (it is not — the file's single line opens `@layer components {`), or if the demo re-declares layer order to put `components` last (`demo/styles/style.css:1-16` does not; it only adds `@custom-variant dark`), or if a later demo sheet re-paints a focus ring on `.field-control` (`grep -rn "focus-ring-shadow" demo/styles/` → `design-idioms.css:76-77` `.focus-ring:focus-visible`, a class the card puts on the `<pre>` at `:45` but **not** on the `Input`). Live probe: keyboard-focus the start field and screenshot.

### C-4 · MAJOR — glass-ui's invalidity channel is unused; the field is unnamed and untyped for input

**Claim.** The start field is a **percentage** field validated by value.js. glass-ui ships the whole affordance for that and the card uses none of it:

| available | evidence | used by the card |
|---|---|---|
| `invalid?: boolean` → `aria-invalid` + `data-state="invalid"` | `dist/components/input/types.d.ts`; `dist/Input-DY7soIPd.js` (`aria-invalid` in the patched-attrs array, `ariaInvalid` from the field-control helper); `field-control.css` `.field-control:is(:user-invalid,[data-state="invalid"]) { border-color: var(--destructive) }` + `:focus-visible { box-shadow: var(--invalid-ring) }` | **no** |
| `useUserInvalidAria` | exported from the very subpath the card imports — `dist/forms.d.ts:4` | **no** |
| `inputmode`, `pattern`, `enterkeyhint`, `maxlength` | `input/types.d.ts` | **no** |
| `name`, `form`, `placeholder`, `size` | `input/types.d.ts` | **no** |
| accessible name (`aria-label` via fallthrough; `Input` sets `inheritAttrs:false` and forwards attrs explicitly) | `dist/Input-DY7soIPd.js` `forwardedAttrs` | **no** |

Instead, invalidity is displaced to a **global toast** far from the field:

```ts
KeyframesEditor.vue:188-203
toast.error("Invalid keyframe offset", { id: startDiagnosticId(index), description: `${issue.code} at ${issue.start}-${issue.end}: expected …` });
```

with no `aria-invalid` on the control, no `aria-describedby` linking the diagnostic, and no accessible name on the input at all — so an AT user hears "edit text, blank" for the field and, separately, a toast about "keyframe offset" they cannot associate with it. `glass-ui/labeled-field` (`LabeledInput`) exists and is already consumed elsewhere in this same demo (`transport/channel-controls/ChannelOptions.vue:423`, per lane-frontend §3.2) — the naming primitive was one import away.

**Falsifier.** Dies if the `Input` synthesizes a name from context (it does not — `Input.vue` renders a bare `<input>` with `data-slot`/`data-kind`/`data-size`/`data-state`/`aria-invalid` and forwarded attrs, no label wiring), or if an ancestor `<label for>` targets it (the card's two `<Label>`s carry no `for`, `:31-38`, and the `Input` has no `id`).

### C-5 · MAJOR — `z-modal` on in-card content breaches the ordered-layer contract

**Claim.** `KeyframeCard.vue:4` puts `sticky z-modal` on the start `Input`. The demo's z-contract is explicit and single-sourced:

```
demo/styles/style.css:19-38
--z-modal : 140  modal dialogs — above everything
Use the SEMANTIC z-* utility for the rung; do NOT introduce a raw z-[N] bracket value…
```

The card obeyed the letter (a semantic utility, not `z-[140]`) and broke the spirit: a per-stop text field is content, not a modal. Repo-wide, `z-modal` has exactly **two** users — `app/dock/MbabbMenu.vue:6` (`DropdownMenuContent`, a genuine modal-tier surface) and this line. The rungs that fit are `--z-controls` (20, "in-scene controls layered over content") or `--z-bar` (30). Consequence: the sticky field is declared co-equal with every dialog and drawer in the app, including `KeyframesAddDialog` (`KeyframesEditor.vue:75`) and the `Drawer` at `controls-pane/ControlsPaneWrapper.vue:166`, which are exactly the surfaces most likely to open over the editor.

**Falsifier.** The *contract breach* is proven from source and dies only if `style.css` is edited. The **paint-order consequence** — whether the sticky field actually punches through an open drawer or dialog — depends on teleport targets and stacking contexts and is `UNPROVEN-NEEDS-LIVE` (SS-13): open the controls drawer over the spring facet's card list and look. If teleported overlays always append later in `<body>` at the same rung, the visual consequence is nil and only the contract violation stands.

### C-6 · MAJOR — dual DOM ownership of the `<pre>`, with a one-shot freeze marker

**Claim.** The card's editing surface is a Vue-rendered, Vue-owned subtree:

```vue
KeyframeCard.vue:41-50
<pre ref="preEl" @input="…" @keydown="…" contenteditable="true" …><code>{{ formattedCSS }}</code></pre>
```

The card then hands that exact element to a second writer via `defineExpose({ preEl })` (`:78-80`) → `KeyframeCardList.getPreElements()` (`:76-79`) → `useCodeHighlight(() => cardList.value?.getPreElements() ?? [])` (`KeyframesEditor.vue:176-178`), whose highlighter does:

```ts
useHighlightCSS.ts:116-126
const highlight = (el) => {
    if (!el || el.getAttribute("highlighted")) return;
    void bootHighlighter().then(({ hljs }) => {
        if (el.getAttribute("highlighted")) return;
        const h = hljs.highlight(el.innerText, { language: "css" });
        el.innerHTML = h.value;                 // ← destroys Vue's <code>
        el.setAttribute("highlighted", "true"); // ← and never runs again
    });
};
```

Two consequences, both real:

1. **Vue's patch target is destroyed.** `<code>{{ formattedCSS }}</code>` compiles to an element vnode with a TEXT patch flag; Vue patches it by writing text to the cached `<code>` DOM node. After `pre.innerHTML = …` that node is detached, so any subsequent `formattedCSS` patch is written to an orphan and never reaches the screen.
2. **The highlight is one-shot per element.** The `highlighted="true"` marker makes `highlight()` a no-op forever after, even though `highlightAll()` is invoked on **every keydown** (`KeyframesEditor.vue:229`) and on every `cssKeyframesString` change (`:275-277`). Everything the user types after the first highlight stays untokenized inside an hljs span tree.

**Honest scope limit (this is why it is MAJOR, not BLOCKER).** Consequence (1) is largely *masked* in practice, and I will not overstate it: the only producer of `formattedCSS` changes is `props.frameStrings` (`KeyframeCardList.vue:50-52`), and every write to it goes through `useKeyframesParsing.ts:50` `templateFrameStrings.value = []` before `:52` refills it — blanking the array unmounts all cards and remounts them with fresh, unmarked `<pre>` elements. So the detached-node write is usually pre-empted by a full remount. The residual, unmasked window is the `formatFn`-resolution flip (`KeyframeCardList.vue:44-52`: raw string → formatted string) landing *after* the highlight boot; that ordering is possible but unlikely, because `loadAnimationEngine()` is already warm at this call site (`KeyframesEditor.vue:130` `kfEngine()` resolves synchronously) while `bootHighlighter()` awaits four dynamic imports including two CSS chunks (`useHighlightCSS.ts:12-17`). What is **not** masked is consequence (2) and the architectural fact that the card publishes a Vue-owned, reactively-patched subtree to an `innerHTML`-writing consumer — the card's `defineExpose` contract makes no statement about who may write it.

**Falsifier.** Dies if hljs is changed to write into a child it created, or if the `highlighted` marker is cleared on content change, or if the `<pre>` were `v-html`/uncontrolled (it is not — `:50` is a mustache). Live probe: type into a card, wait for the debounce, and check whether newly typed CSS ever acquires hljs token colours within one card lifetime.

### C-7 · MAJOR — no commit seam in the emits contract

**Claim.** The card exposes only continuous emits:

```ts
KeyframeCard.vue:69-74
(e: "updateStart", val: string): void;
(e: "updateCSS", val: string): void;
```

`updateStart` fires from `@update:model-value` on every keystroke (`:6`); `updateCSS` fires from the contenteditable's `@input` on every keystroke (`:43`). There is no `commit`/`change`/`blur` event and no `debounce`/`lazy` prop, so **every consumer must build its own settling policy** — and the one consumer builds three different ones, inconsistently:

- `updateCSS` → `updateAnimationFromKeyframeString`, `debounce(…, 1000)` (`useKeyframeOps.ts:108,143`);
- `updateCSS` → `animateProgressBar(progressBarKeyframesEl.value!)` — **undebounced** (`KeyframesEditor.vue:215`), constructing a `new CSSKeyframesAnimation({duration:1000}, el).fromVars(…).play()` (`:255-257`) **per keystroke**, each one an independent engine allocation against the same element;
- `updateStart` → **undebounced** `parseCssScalar(val)` from `@mkbabb/value.js/css` plus a `toast.error(...)` / `toast.dismiss(...)` pair per keystroke (`KeyframesEditor.vue:186-205`).

The `updateStart` path is the sharpest: typing `50%` produces the intermediate strings `5` and `50`, each of which parses green as a number but fails the unit check (`:197`), firing "Invalid keyframe offset — Expected a percentage scalar such as 50%." twice before the third keystroke dismisses it. The toast carries a stable id (`startDiagnosticId`) so it updates rather than stacks, which softens but does not remove the churn.

**Value.js exposure, stated precisely.** The card does not import value.js. Its `updateStart` payload is nonetheless the *sole* feed into a value.js parser on this path. That parser is **result-typed, not throwing** — `parseCssScalar` returns `ParseResult<T>` (`value.js src/css/types.ts:25-27`) with a non-empty `diagnostics` tuple on failure, and the consumer reads `parsed.diagnostics[0]` under `if (!parsed.ok)` (`KeyframesEditor.vue:189-190`), which the tuple type makes safe. **The R1 shipping-crash class (`parseCssColor("oklch()")`) is therefore NOT reachable from this component** — no colour parse, no throwing entry point. I record this as a deliberate negative finding rather than silence.

**Falsifier.** Dies if glass-ui's `Input` debounces internally — it does not: `dist/Input-DY7soIPd.js` uses `useVModel(props, "modelValue", emit, { passive: true, defaultValue })` and a `vModelDynamic` directive, i.e. emit-on-`input`. Dies for the `@input` half if `contenteditable` fired `input` only on commit — it fires per mutation.

### C-8 · MINOR — `<Label>` used as decorative text

`KeyframeCard.vue:31-38` renders two glass-ui `<Label>`s inside a `pointer-events-none opacity-25` block, showing `f {{ index }}` and `s {{ frameStart }}`. glass-ui's `Label` is reka-ui's `Label` (`dist/components/label/Label.vue.d.ts:2` `import { type LabelProps as RekaLabelProps } from "reka-ui"`), i.e. a real `<label>` — a form primitive with a `requirement?: "required" | "optional"` prop. Neither carries `for`, and there is no associated control (the card's `Input` has no `id`). Two orphan `<label>`s used as badges. glass-ui ships `/metric` and `/chip` for exactly this readout shape; both subpaths exist in the installed package and neither is reached by this card (lane-frontend §3.1 lists `/metric` at 1 use — `scenes/sequence/SequenceTarget.vue:138` — and `/chip` at 2). **Falsifier:** dies if reka's `Label` renders a non-`<label>` root under some prop — `LabelProps` extends `RekaLabelProps` with only `class`/`requirement`/`disabled`, no `as`/`asChild` surfaced in the `.d.ts`.

### C-9 · MINOR — the copy button copies the wrong string

`KeyframeCard.vue:26` `<CopyButton class="h-6 w-6" :text="frameString" />` — `frameString`, not `formattedCSS`. The card *displays* `formattedCSS` (`:50`), which `KeyframeCardList.vue:44-52` derives by running the engine's `formatCSSKeyframeString` over `frameString`. So copy yields the unformatted twin of what is on screen. Sharper: because `updateCSS` is debounced 1000 ms before it reaches the model (`useKeyframeOps.ts:143`), clicking copy within a second of typing copies the **pre-edit** text. **Falsifier:** dies if `formatCSSKeyframeString` is an identity function for realistic inputs — `KeyframeCardList.vue:38-43` describes it as a "pure-string trim", so the divergence may be whitespace-only; the stale-by-one-debounce half stands regardless.

### C-10 · MINOR — the `remove` payload is dead and the useful datum is missing

`KeyframeCard.vue:72` declares `(e: "remove", event: Event): void` and `:21` forwards the raw click event. The sole consumer discards it: `KeyframesEditor.vue:232` `const removeKeyframe = async (_e: Event, frameIx: number)` — underscore-prefixed, never read in the body (`:232-250`). Meanwhile the datum the consumer actually needs, the card's index, is **not** in the emit; `KeyframeCardList.vue:15` has to close over `i` to supply it. The contract carries what nobody wants and omits what everybody reconstructs. **Falsifier:** dies if some consumer calls `preventDefault`/`stopPropagation` on the forwarded event — there is exactly one consumer and it does not.

### C-11 · MINOR — the prop/emit names hyphenate grotesquely

`formattedCSS` (`:64`) and `updateCSS` (`:71`) hyphenate to `formatted-c-s-s` and `update-c-s-s`, which is what the call site is forced to write:

```vue
KeyframeCardList.vue:10   :formatted-c-s-s="formattedStrings[i] ?? s"
KeyframeCardList.vue:14   @update-c-s-s="(value) => emit('updateCSS', { value, index: i })"
```

The list then re-exports the same broken name upward (`:56`), so the deformity has already propagated one boundary. `formattedCss`/`updateCss` would hyphenate cleanly. **Falsifier:** dies if Vue's `hyphenate` special-cases consecutive capitals — it does not; the call site above is the direct evidence that it does not.

### C-12 · MINOR — the sibling seam disagrees with itself about units

Not in the card, but it is the card's other half — the same `frame.start` rendered two ways in one editor:

```
KeyframesEditor.vue:38   :model-value="animation.templateFrames.map((frame) => frame.start.value)"   // fraction 0..1
KeyframesEditor.vue:43   frame.start.value = starts![i];                                             // writes 0..100 (slider :min="-10" :max="110")
KeyframesEditor.vue:206  frame.start = { kind: "percent", value: scalar.value / 100 };               // writes fraction 0..1
```

The `Slider` reads a fraction onto a `-10 … 110` track (so a 50% stop sits at `0.5` on a 120-wide rail) and writes percent back into a field the card's own commit path fills with a fraction. Both writes also mutate a `Readonly<{ kind: "percent"; value: number }>` in place, and `.value` does not exist on the `{ kind: "named" }` variant at all — a named selector (`entry 50%`, which `requireKeyframeSelector` produces and `value4-editor-boundary.test.ts:25` asserts) yields `undefined` into the slider array. The demo's own `selectorPercent` / `percentSelector` pair (`demo/utils/keyframeSelector.ts:23-31`) is the total, variant-safe conversion for both directions and is bypassed at both seams — the same bypass as **C-1**, which is why I read C-1 as a *class* of defect at this boundary rather than one typo. **Falsifier:** dies if `templateFrames` never contains a `named` selector on the spring path (plausible — `useSpringKeyframesEditor` may seed only percent stops; the unit mismatch stands either way). Slider-position claim is `UNPROVEN-NEEDS-LIVE`.

---

## 3. Superlatives (L-18 runs both ways)

### S★1 — the `defineExpose({ preEl })` child-ref contract is genuinely the right shape

`KeyframeCard.vue:76-80` publishes the card's own `<pre>` through `useTemplateRef` + `defineExpose`, with a comment naming the intent ("a declared child-ref contract, no querySelector"). This is not decorative: it is the mechanism that let the highlight driver stop sweeping the document. `useHighlightCSS.ts:73-76` records the bug it replaced — *"highlights ONLY the elements the caller hands it via `getOwnedElements` — never the whole document (D.W3.S1: the global `document.querySelectorAll("pre")` was the bug)."* The chain `KeyframeCard.preEl` → `KeyframeCardList.getPreElements()` (`:74-79`, with a null-filtering type guard) → `KeyframesEditor` (`:176-178`) is fully declared, statically greppable, and correctly typed at each hop. **Falsifier:** dies if any consumer still reaches for `<pre>` by selector — `grep -rn "querySelectorAll(\"pre\")" demo/` returns only the historical mention in the comment above. Survives.

### S★2 — the contenteditable carries a real ARIA textbox contract

`KeyframeCard.vue:45-49` gives the editing surface `role="textbox"`, `aria-multiline="true"`, a per-card `:aria-label="\`CSS for keyframe ${index}\`"`, and the demo's `focus-ring` idiom, which resolves to glass-ui's own token (`demo/styles/design-idioms.css:74-77` `.focus-ring:focus-visible { box-shadow: var(--focus-ring-shadow) }`). Hand-rolled contenteditable editors almost universally ship as unnamed, unroled `div`s; this one is named, roled, multiline-declared, natively focusable, and keyboard-ringed — and it does the ringing by *consuming* the design system's token rather than inventing a shadow ring. It is also the exact inverse of **C-3**: the same author put the ring on the `<pre>` and stripped it from the `Input` in the same 45-line span. **Falsifier:** dies if the `focus-ring` class were shadowed by a later utility on the same element — the `<pre>`'s only competing class is `outline-none`, which is what glass-ui itself sets before painting the shadow ring. Survives.

### S★3 — zero raw type scale, zero vendored primitives, zero `<style>`

Every typographic class in the file is a glass-ui **semantic rung**, not a raw Tailwind size: `text-subheading` (`:4`), `text-mono-small` (`:32,36`), `text-small` (`:45`) — all defined in `node_modules/@mkbabb/glass-ui/dist/styles/typography/{semantic,utilities}.css`. The one colour is `text-accent-red` (`:23`), which routes through the demo's declared `@theme` bridge (`demo/styles/style.css` `--color-accent-red: var(--accent-red)`) rather than a literal, and it is `data-destructive`-marked for the red census. There is **no `<style>` block**, no local `cn()`, no cva, no `reka-ui` import, and no hex literal (`grep -nE "#[0-9a-fA-F]{3,6}|z-\[" KeyframeCard.vue` → none). This is the clean half of lane-frontend §3.3/§3.4 holding at the leaf. **Falsifier:** dies on any raw `text-xs`/`text-[13px]`/hex/`z-[N]` in the file — the grep above finds none. Survives. (Note the tension: the same class attribute that gets the *type* right is the one that gets the *field control* wrong, C-3 — the file is disciplined about tokens and undisciplined about primitives.)

---

## 4. Consumption scorecard

| dimension | reading |
|---|---|
| glass-ui subpaths reached | 2 — root (`Label`) + `/forms` (`Input`). Both correct choices for what they import; `/labeled-field`, `/metric`, `/chip` were the better fits and were not reached (lane-frontend §3.1: 52 of 73 subpaths unreached). |
| glass-ui API depth | shallow and adversarial — `Input` is consumed for its `<input>` only, with six utilities erasing `field-control.css` (C-3) and its entire invalidity/typing/naming surface unused (C-4). |
| shadow components (S-1..S-8) | **none originate here.** The card builds no primitive glass-ui already ships; its bespoke surface is the contenteditable `<pre>`, for which no glass counterpart exists. It *touches* S-7 (`CopyButton`) as a consumer only. No new shadow to add to the census. |
| keyframes.js consumption | **zero direct imports** — correct. The card is a pure view over strings the engine produced upstream (`CSSKeyframesToStrings` / `formatCSSKeyframeString` at `useKeyframesParsing.ts:52` and `KeyframeCardList.vue:46-48`), which keeps the heavy engine chunk out of the card's graph. Good boundary discipline. |
| value.js transitive exposure | **the defect surface.** `KeyframeSelector` (`value.js src/css/types.ts:42`) crosses into the card as `frameStart: string` and breaks at the crossing (C-1); the `updateStart` payload is the sole feed into `parseCssScalar` (C-7). **R1 (the `parseCssColor` crash class) is not reachable here** — no colour parse on this path, and `parseCssScalar` is result-typed, not throwing. |
| props/emits contract | 4 props, all required, one stringly-typed where a library type existed (C-1); 4 emits, one with a dead payload and a missing index (C-10), none with a commit seam (C-7), two with names that hyphenate badly (C-11). |
| sibling seams | `KeyframeCardList` (launders C-1, blanks-and-remounts the card on every model sync), `KeyframesEditor` (undebounced parse/toast/animation per keystroke, C-7; unit-inconsistent slider, C-12), `useCodeHighlight` (writes `innerHTML` into a Vue-owned subtree, C-6), `CopyButton` (fed the wrong string, C-9). |
| test/gate coverage of this component | **none.** No component test, no e2e directory. The one adjacent test (`test/demo/instrument/value4-editor-boundary.test.ts`) asserts the *helper* the card's producer failed to call. |

## 5. Provenance and law

Every glass-ui claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — the copy already on disk in the audited tree — so no upgrade is presupposed by any remedy implied above. Note lane-frontend **F-1** stands underneath all of it: glass-ui is absent from both `package.json` and `package-lock.json`, so the `Input`/`Label` imports at `KeyframeCard.vue:57-58` resolve only by accident of the current `node_modules` state.

`/Users/mkbabb/Programming/keyframes.js` was read only. No file in any repo was written, mutated, or executed by this lane except this challenge document. No installs, no dev servers, no browser tooling. Claims that require a running page are marked `UNPROVEN-NEEDS-LIVE` and are deferred to the SS-13 visual audit: the C-5 paint-order consequence and the C-12 slider position.

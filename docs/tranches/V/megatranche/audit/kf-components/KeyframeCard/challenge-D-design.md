claude-opus-5[1m]

# CHALLENGE · `KeyframeCard.vue` · axis **D — DESIGN**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/KeyframeCard.vue` (81 lines)
**Mode:** static, read-only, source-derived. No browser, no dev server, no installs. Nothing in keyframes.js or glass-ui was written.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise; every claim below carries a falsifier and dies if the falsifier holds.
**Hitherto corpus folded:** `docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md` (F-1 phantom dep; S-1..S-8 shadow census; §6.3 the flat-token/`--kf-*`-zero finding; §6.5 PRM census). Contradictions to that lane are marked ⚠ and argued.

---

## 0. Read set (whole, in full)

| file | why |
|---|---|
| `demo/components/instrument/keyframes/KeyframeCard.vue` | target |
| `demo/components/CopyButton.vue` | imported (`:59`) |
| `@mkbabb/glass-ui` → `Label` (`label-DJA3eNLS.js`, `components/label/Label.vue.d.ts`) | imported (`:57`) |
| `@mkbabb/glass-ui/forms` → `Input` (`Input-DY7soIPd.js`, `components/input/Input.vue.d.ts`, `components/_shared/field-control.css`) | imported (`:58`) |
| `@lucide/vue` → `X` (`dist/esm/Icon.mjs`, `dist/esm/defaultAttributes.mjs`) | imported (`:60`) |
| `demo/styles/style.css`, `demo/styles/design-idioms.css` | the cascade root + the demo's owned idioms |
| glass-ui `dist/styles/{index,components,accessibility}.css`, `styles/typography/{semantic,utilities}.css`, `styles/tokens/{scheme-motion,color-radius,sizing,glass,light-dark,on-glass-fg}.css`, `styles/utilities/{a11y-overrides,btn}.css`, `dist/glass-ui.css` | to decide every utility-vs-component cascade contest by layer, not by guess |
| `tailwindcss/preflight.css`, `tailwindcss/theme.css` | base-layer `pre`/`code` mono rule |
| `highlight.js/styles/github.css`, `github-dark.css` | the injected theme |
| parents/collaborators (context, not target): `components/KeyframeCardList.vue`, `KeyframesEditor.vue`, `composables/useHighlightCSS.ts`, `composables/useKeyframesEditor.ts`, `composables/useKeyframesState.ts`, `utils/contenteditable.ts` | the props the card renders and the handlers it delegates to |
| `keyframes.js/src/animation/constants/types.ts`, `compile/frame-compiler.ts`, `compile/selector.ts`; `value.js/src/css/types.ts`, `src/css/grammar.ts` | to type the `frameStart` datum |

### 0.1 The cascade fact that decides half this audit

Three CSS "origins" reach this component and they do **not** rank the way the class strings assume:

| bucket | example | wins against |
|---|---|---|
| **unlayered** runtime `<style>` (hljs theme, injected by `useHighlightCSS.ts:96–104`) | `.hljs { background:#0d1117 }` | **everything** |
| **unlayered** `dist/glass-ui.css` tail (SFC-scoped styles), reached via `styles/index.css`'s last imports → demo `style.css:3` | `.glass-label[data-v-87831917] { … }` | **everything layered** |
| `@layer utilities` (Tailwind + glass `@utility`) | `text-mono-small`, `shadow-none`, `w-16` | `components`, `base` |
| `@layer components` (glass `field-control.css`, and the `@layer components{…}` block that occupies `glass-ui.css` **bytes 2531–18827**) | `.field-control:focus-visible { box-shadow: var(--focus-ring-shadow) }` | `base` only |
| `@layer base` (Tailwind preflight) | `pre, code { font-family: --theme(--default-mono-font-family, …) }` | — |

Verified by brace-scanning `dist/glass-ui.css`: exactly **one** `@layer` block (`@layer components{` at byte 2531, closing at 18827). `.field-control` sits at byte **4325 — inside** it. `.glass-label` sits at byte **21050 — outside** it, at net brace depth 0, i.e. genuinely unlayered.

Consequence: **utilities beat `.field-control`; `.glass-label` beats utilities.** The card's class strings win some contests they were written to win and silently lose others. Findings D-4, D-7, D-9, D-14 all fall out of this table.

---

## 1. Headline

| # | severity | finding | anchor |
|---|---|---|---|
| D-1 | **BLOCKER** | The card's primary datum renders as the literal string `[object Object]` | `KeyframeCard.vue:5,37` |
| D-2 | **BLOCKER** | The delete affordance is a bare `<svg>` — unfocusable, unnamed, roleless | `:20–25` |
| D-3 | **BLOCKER** | The offset `Input` has no accessible name at all | `:3–8` |
| D-4 | **BLOCKER** | The offset `Input` has **no visible focus indicator** outside forced-colors | `:4` |
| D-5 | **BLOCKER** | Ghost readout computes **1.70:1** (light) / **2.04:1** (dark) — WCAG 1.4.3 needs 4.5:1 | `:29` |
| D-6 | **BLOCKER** | `Tab` is trapped inside the contenteditable with no escape (WCAG 2.1.2) | `:44` → `KeyframesEditor.vue:224–227` |
| D-7 | MAJOR | An unlayered hljs `<style>` defeats `bg-transparent`: a hardcoded `#ffffff`/`#0d1117` GitHub plate inside the glass card | `:45` |
| D-8 | MAJOR | The code flips from mono to **proportional sans** the moment it is highlighted | `:45,50` |
| D-9 | MAJOR | Unlayered `.glass-label` defeats **3 of 4** typography utilities on the ghost readout | `:31–38` |
| D-10 | MAJOR | `z-modal` (140) enrolled on an inline sticky numeric field | `:4` |
| D-11 | MAJOR | `sticky` + `bg-transparent` → the pinned offset collides glyph-on-glyph with the code it scrolls over | `:4` |
| D-12 | MAJOR | Destructive X floats over the code's first line; no confirm, no undo, and it is **silently inert** at n=1 with no disabled state | `:20–25` |
| D-13 | MAJOR | No inline invalid state — glass `Input` ships `invalid`; the card never uses it; errors land in a detached toast | `:3–8` |
| D-14 | MAJOR | Every plate token is stripped but `backdrop-filter` survives → a pill-shaped blur smudge with zero "this is editable" affordance | `:4` |
| D-15 | MAJOR | `<pre>` has `white-space:pre`, no `overflow-x`, no `min-w-0` → long declarations expand the grid item and escape the card | `:41–50` |
| D-16 | MAJOR | RTL: the whole overlay is pinned with physical `right-4`; nothing mirrors | `:12` |
| D-17 | MAJOR | The root `grid` declares **no gap** — zero internal rhythm, against `gap-4`/`gap-1` everywhere around it | `:2` |
| D-18 | MAJOR | Two writers own the contenteditable subtree (Vue `{{ }}` + hljs `innerHTML`), guarded only by a one-shot attribute | `:50` ↔ `useHighlightCSS.ts:96–104` |
| D-19 | MAJOR | `CopyButton`'s engine-driven bounce is unreachable by CSS `prefers-reduced-motion` | `CopyButton.vue:40–101` |
| D-20 | MINOR | Seven dead / self-cancelling utility classes | `:4,23` |
| D-21 | MINOR | Two `<label>` elements that label nothing | `:31–38` |
| D-22 | MINOR | Cryptic `f`/`s` glyph labels; the offset datum is duplicated in two clashing registers | `:33,37` |
| D-23 | MINOR | 0-based index surfaced to AT: "CSS for keyframe 0" | `:49` |
| D-24 | MINOR | 24×24 destructive target vs the demo's own `.tap-floor` 44px idiom | `:23,26` |
| D-25 | MINOR | Hover-only affordance on the X, no focus/active counterpart | `:23` |
| D-26 | MINOR | `CopyButton`: name-change + live-region double announcement; not on the demo's single focus idiom | `CopyButton.vue:4,5,15` |
| S-1..S-5 | SUPERLATIVE | §4 | |

**Tally: 26 defects (6 BLOCKER · 13 MAJOR · 7 MINOR) · 5 superlatives · 3 INFO non-defects.**

---

## 2. BLOCKERS

### D-1 · The primary datum renders as `[object Object]` — BLOCKER

The card takes `frameStart: string` (`:65`) and renders it twice: into the editable `Input` (`:5`) and into the ghost readout (`:37`). The parent supplies it as:

```
KeyframeCardList.vue:11 :frame-start="frames[i].start.toString()"
```

`frames` is `animation.templateFrames` (`KeyframesEditor.vue:15`). Its element type is `TemplateAnimationFrame<V>` (`keyframes.js/src/animation/constants/types.ts:64–66`), whose `start` is `KeyframeSelector` — defined in value.js as a **plain object literal union**:

```
value.js/src/css/types.ts:42-44
export type KeyframeSelector =
    | Readonly<{ kind: "percent"; value: number }>
    | Readonly<{ kind: "named"; name: "entry"|"exit"|"cover"|"contain"; offset?: number }>;
```

and constructed as a bare object literal by the parser — `value.js/src/css/grammar.ts:409` `success({ kind: "percent", value: … })`, `:415` likewise. It is threaded to `templateFrames` unchanged (`keyframes.js/src/animation/compile/frame-compiler.ts:150,164`; `compile/selector.ts:23–25` returns `result.value` verbatim). No class, no prototype, **no `toString`**.

Therefore `frames[i].start.toString()` is `Object.prototype.toString.call(o)` → **`"[object Object]"`**, on every card, from first paint — not only after an edit.

Two independent call-sites in the *same file* corroborate that `start` is an object, not a scalar: `KeyframesEditor.vue:38` reads `frame.start.value` for the Slider, and `:206–209` writes `frame.start = { kind: "percent", value: … }`.

**Design consequence, all of it inside this component:** the 4rem-wide offset field is asked to display a 15-character debug string (hence `text-ellipsis`, `:4` — symptom management for a datum that is *never* a short number); and the ghost mirror at `:37` reads `s [object Object]`, a `grid gap-1` block anchored `right-4` that will run leftward across the code plate. The card's single most important number is never shown.

**Falsifier.** Any of: (a) `templateFrames[i].start` is at runtime a class instance or `ValueUnit` carrying a `toString` — killed by `types.ts:42–44` + `grammar.ts:409/415` + `frame-compiler.ts:164` + the two corroborating call-sites; (b) the demo overrides `Object.prototype.toString` — `grep -rn "prototype.toString" demo/` → no hits; (c) `KeyframeCardList.vue:11` reads differently in the tree — it does not.

**Fix site is the parent** (`KeyframeCardList.vue:11`) or the card's prop contract (accept `KeyframeSelector`, format it). Recorded here because this is the card's render surface and the card's `frameStart: string` type accepts the poison silently.
*Cross-axis: axis C owns the mechanism; this entry claims only the visual/typographic consequence.*

### D-2 · The delete affordance is a bare `<svg>` — BLOCKER

```
:20-25  <X @click="(e) => emit('remove', e)" data-destructive
           class="p-0 m-0 scale-on-hover cursor-pointer stroke-2 w-6 h-6 text-accent-red …" />
```

`@lucide/vue@1.17.0` renders a raw `<svg>` (`dist/esm/Icon.mjs` → `h("svg", {...defaultAttributes})`; `defaultAttributes.mjs:8–18` = `xmlns/width/height/viewBox/fill/stroke/stroke-width/linecap/linejoin` only). No `role`, no `tabindex`, no `button`, no accessible name is added by the card.

So the **only destructive control on the card** is: not in the tab order, not exposed to the accessibility tree as an interactive element, and has no name. WCAG 2.1.1 (Keyboard, A) and 4.1.2 (Name/Role/Value, A) both fail. A keyboard or screen-reader user cannot delete a keyframe at all.

The condemnation is self-authored: its own sibling on the very next line (`CopyButton.vue:2–4`) is a proper `<button type="button" :aria-label>`, and the editor's apply control (`KeyframesEditor.vue:87–95`) is a proper `<button type="button" aria-label :aria-pressed>`. The card knows the pattern and does not apply it to the one control that destroys data.

**Falsifier.** `@lucide/vue` renders a `<button>`, or injects `role`/`tabindex` — refuted by `Icon.mjs` + `defaultAttributes.mjs`. Or a global rule gives `svg[data-destructive]` a tabindex — `grep -rn "data-destructive" demo/styles/` → no styling hits; it is a census marker only (see S-2).

### D-3 · The offset `Input` has no accessible name — BLOCKER

`:3–8` passes no `aria-label`, no `aria-labelledby`, no `id`, no `placeholder`, and glass's `Input` forwards only the props it declares (`Input-DY7soIPd.js`: `autocomplete/disabled/enterkeyhint/form/inputmode/maxlength/minlength/name/pattern/placeholder/readonly/required/type`) plus `forwardedAttrs`. Nothing manufactures a name. The two `<Label>`s at `:31–38` are not associated with it (D-21). Result: an unnamed editable text field — WCAG 4.1.2 (A) and 1.3.1 (A).

**Falsifier.** glass `Input` derives a name from `data-slot`/`data-kind` (it does not — those are hooks, `Input-DY7soIPd.js`), or an ancestor supplies `aria-labelledby` (`KeyframeCardList.vue` / `KeyframesEditor.vue` supply none).

### D-4 · The offset `Input` has no visible focus indicator — BLOCKER

glass supplies one:

```
components/_shared/field-control.css  (@layer components)
.field-control:focus-visible { outline:none; border-color:var(--color-accent-opaque, var(--focus-ring-color)); box-shadow: var(--focus-ring-shadow); }
```

The card cancels all three legs from `@layer utilities`, which **out-ranks `@layer components` regardless of specificity** (§0.1):

```
:4  … border-transparent … shadow-none … focus:border-transparent focus:shadow-none border-none
```

- `shadow-none` → `box-shadow: … none` — kills the focus ring unconditionally, in every state.
- `border-none` → `border-style: none` — the focus `border-color` change paints nothing.
- `outline: none` from `field-control` survives (no utility competes) — so no UA outline either.

Net: **zero focus affordance** on a keyboard-reachable editable control. WCAG 2.4.7 (AA), 1.4.11 (AA).

The inconsistency is 40 lines wide: the `<pre>` on the same card *does* carry the demo's single sanctioned idiom (`focus-ring`, `:45` → `design-idioms.css:76–79`). The Input does not.

**Curiosity worth recording (INFO I-2):** glass's `dist/styles/utilities/a11y-overrides.css` is **unlayered** and contains `@media (forced-colors: active) { …, .field-control:focus-visible, … { outline: 2px solid Highlight; outline-offset: 2px } }`. So the focus indicator exists **only** in Windows High Contrast — the one mode most sighted users never enter — and is absent in ordinary light and dark.

**Falsifier.** glass-ui's `components` layer is declared *after* `utilities` in the demo's cascade — refuted: `demo/styles/style.css:1` `@import "tailwindcss"` declares `@layer theme, base, components, utilities;` first, and `:3` imports glass into that already-ordered `components` rung. Or `shadow-none`/`border-none` do not land on the `<input>` — refuted: `Input-DY7soIPd.js` merges `h.class` into `class: cn("field-control glass-defined", h.class)` on the `<input>` element itself. Or a demo rule re-adds an outline — `grep -rn "focus-visible" demo/styles/*.css` yields only `.focus-ring:focus-visible`, which the Input does not carry.

### D-5 · Ghost readout at 1.70:1 / 2.04:1 — BLOCKER

```
:28-39  <div class="italic opacity-25 z-0 pointer-events-none grid gap-1">
            <Label …>f {{ index }}</Label>
            <Label …>s {{ frameStart }}</Label>
```

The `<label>` color is `var(--foreground)` (`glass-ui.css` unlayered: `.glass-label[data-v-87831917]{color:var(--foreground);…}`). Compositing at `opacity: .25` against the card plate (`--card`, `styles/tokens/light-dark.css`):

| theme | fg | plate | composite @ α .25 | L_text | L_bg | **ratio** |
|---|---|---|---|---|---|---|
| light | `hsl(24 10% 10%)` = `#1C1917` | `hsl(30 85% 96%)` = `#FEF5EC` | `rgb(197,190,183)` | 0.5206 | 0.9223 | **1.70 : 1** |
| dark | `hsl(30 14% 90%)` = `#E9E6E2` | `hsl(26 22% 17%)` = `#352A22` | `rgb(98,89,82)` | 0.1035 | 0.0253 | **2.04 : 1** |

(WCAG relative-luminance formula; sRGB alpha compositing, which is what `opacity` does.) Required: **4.5:1** — this is informational text at `--type-small` (`clamp(.875rem, …)`, ≥14px), not decoration: `f {index}` is the only place the frame index appears anywhere in the UI. Both arms fail 4.5:1 and both fail even the 3:1 large-text floor by a wide margin.

Two aggravators: the text is also `italic` (`:29`), the least legible register at that size; and the computation is an **upper bound** — the demo neutralises the glass content-tier ink-darken (`style.css:203–208`, `--glass-tint-strength-aa: 0%`) so the real backdrop is a *translucent* quiet plate over the stage, which can only move the composite closer to the backdrop, never further.

**Falsifier.** Measure the live composite and find ≥4.5:1 — impossible for any backdrop, since 25% ink over *any* ground caps the achievable ratio near 1/0.25 ≈ 4:1 even in the best case and the ground here is close to the ink's own arm. Or: the labels are decorative and duplicated in an accessible sibling — `f {index}` is not duplicated anywhere (`grep -rn "keyframe.*index" demo/components/instrument/keyframes/` finds only the aria-label at `:49`). Marked `UNPROVEN-NEEDS-LIVE` only for the *exact* second decimal; the failure verdict is decidable from tokens.

### D-6 · Keyboard trap in the contenteditable — BLOCKER

```
KeyframeCard.vue:44  @keydown="(e) => emit('keydown', e)"
KeyframesEditor.vue:224-227
    if (e.key === "Tab") { e.preventDefault(); insertTabAtCursor(e.target as HTMLElement); }
utils/contenteditable.ts:9-24  inserts four NBSPs at the caret
```

Every `Tab` inside the `<pre role="textbox">` is swallowed and converted to indentation. There is no `Escape` handler, no `Ctrl+M` toggle, no documented exit, and no on-screen instruction. A keyboard user who reaches the code region **cannot leave it** — WCAG 2.1.2 *No Keyboard Trap*, Level A, and the SC explicitly requires that the exit method be advertised if it is not standard tabbing.

`Shift+Tab` is also caught (`e.key === "Tab"` is true for both), so the backward escape is closed too.

**Falsifier.** A document-level handler restores an escape — `grep -rn "Escape" demo/components/instrument/keyframes/` → no hit in this path; `registerShortcut` (`EditorShell.vue:122`) registers app shortcuts, not a focus-release for this region. Or `e.preventDefault()` on `keydown` does not suppress focus movement — it does, per UI Events.

---

## 3. MAJORS

### D-7 · An unlayered hljs theme defeats `bg-transparent` — MAJOR

`useHighlightCSS.ts:96–104` writes the raw theme text into a `document.createElement("style")` in `<head>` — **unlayered**, therefore above every `@layer utilities` declaration. The themes hardcode:

```
highlight.js/styles/github.css       .hljs { color:#24292e; background:#ffffff }
highlight.js/styles/github-dark.css  .hljs { color:#c9d1d9; background:#0d1117 }
```

The card writes `class="focus-ring hljs css … bg-transparent …"` (`:45`) — a declaration of intent that the cascade silently discards. The primary editing surface therefore paints a **cold `#ffffff` rectangle inside a warm `#FEF5EC` cream card** (light) or a **near-black `#0d1117` rectangle inside a `#352A22` warm-brown card** (dark) — two hardcoded hexes owed to neither the demo's tokens nor glass's, in the one component the demo's own idiom sheet describes as token-single-sourced (`style.css:18–40`, `design-idioms.css:1–4`).

That the author wrote `bg-transparent` is the proof this is unintended, not a design choice.

**Falsifier.** The `<style>` is emitted inside a layer (it is not — `textContent` of a bare `<style>`), or `bg-transparent` is also unlayered (Tailwind v4 emits utilities into `@layer utilities`), or the demo re-declares `.hljs` — `grep -rn "\.hljs" demo/` → 0 hits.

### D-8 · The code flips mono → proportional sans on highlight — MAJOR

Three facts compose:

1. Tailwind preflight (`@layer base`, `preflight.css:109–120`) gives `pre` **and** `code` the mono family (`--default-mono-font-family` → `--font-mono` → `"Fira Code", monospace`, `style.css:56`).
2. The card puts `text-small` on the `<pre>` (`:45`). glass defines it as `@utility text-small { font-family: var(--font-text); … }` (`styles/typography/semantic.css`) → `@layer utilities` **beats base** → the `<pre>` computes **Plus Jakarta Sans**.
3. Before highlight, the text lives in `<code>` (`:50`), which carries its *own* base-layer mono declaration and so stays mono. Then `useHighlightCSS.ts:99–102` runs `el.innerHTML = h.value` **on the `<pre>` itself** — `h.value` is bare `<span class="hljs-…">` markup with no `<code>` wrapper. `<code>` is destroyed; the spans inherit the `<pre>`'s sans.

Highlighting is not opt-in: `KeyframesEditor.vue:275–277` watches `cssKeyframesString` and calls `highlightAll()`, and `onMounted` (`:279–283`) mutates it via `updateAllStrings()`. So for essentially the whole session, **a CSS code editor renders CSS in a proportional sans**, with a visible reflow at the moment of the swap (proportional advance widths ≠ mono).

Inverted twice over: the two 11-px ghost captions were *asked* for mono (`text-mono-small`, `:32,36`) and lose it too (D-9), while the code block that needs it is the one that ends up sans.

**Falsifier.** Any winning rule sets `pre { font-family: var(--font-mono) }` — `grep -rn "pre\b" demo/styles/*.css` → no `pre` selector anywhere in the demo; the hljs themes set no `font-family` (verified in both files); glass's unlayered tail sets none for `pre`. Or `hljs.highlight` returns a `<code>`-wrapped string — it does not (`highlight()` returns token markup only).

### D-9 · Unlayered `.glass-label` defeats 3 of 4 utilities on the ghost readout — MAJOR

```
:31-38  <Label class="text-mono-small font-light leading-none tabular-nums">
```

vs. the unlayered rule shipped in `dist/glass-ui.css` (byte 21050, net brace depth 0 — outside the file's single `@layer components` block):

```
.glass-label[data-v-87831917]{color:var(--foreground);font-family:var(--font-text);font-size:var(--type-small);font-weight:500;line-height:var(--type-leading-small)}
```

| utility | intent | actual | verdict |
|---|---|---|---|
| `text-mono-small` | `--font-mono` (Fira Code) | `--font-text` (Plus Jakarta Sans) | **DEFEATED** |
| `font-light` | 300 | 500 | **DEFEATED** |
| `leading-none` | 1 | `--type-leading-small` = 1.4 | **DEFEATED** |
| `tabular-nums` | `font-variant-numeric` | survives (uncontested) | holds |

The scope attribute is real: `label-DJA3eNLS.js` closes with `[["__scopeId","data-v-87831917"]]`, so the rendered `<label>` carries it.

Design consequence: the intended *instrument readout* register — condensed mono, light, tight leading, digits that do not jitter — renders as an ordinary medium-weight sans body label at 1.4 leading. The `gap-1` stack the author sized against `leading-none` is 40% taller than drawn. And `tabular-nums`, the one survivor, is now doing tabular alignment on a proportional face where the neighbouring glyphs still shift.

**Falsifier.** `dist/glass-ui.css` is not reached by the demo — refuted: `dist/styles/index.css` ends `… @import "../glass-ui.css"; @import "./components.css"; @import "./accessibility.css";`, and the demo imports exactly that file at `style.css:3`. Or the rule is layered — refuted by the brace scan (§0.1). Or `text-mono-small` is unlayered — it is `@utility`, hence `@layer utilities`.
⚠ *This sharpens `lane-frontend.md §6.3`: the collision surface is not only the flat `--kf-*`-less token namespace; it is a whole unlayered stylesheet in the consumed package that outranks the consumer's utility layer.*

### D-10 · `z-modal` on an inline sticky numeric field — MAJOR

`:4` `class="sticky z-modal …"` → `z-index: var(--z-modal)` = **140** (`styles/tokens/scheme-motion.css`). The demo's own contract (`style.css:18–40`) reserves that rung: *"`--z-modal : 140 modal dialogs — above everything`"*, with `--z-popover: 130` and the dock band at 40 beneath it.

A per-keyframe offset field is not a modal. Positioned + `z-index` on a non-`isolate` ancestor chain (`CardContent` is `relative` with `z-index:auto`, `KeyframesEditor.vue:11` — which does **not** open a stacking context) means the field competes in the root stacking context at the dialog rung, above `SharePopover`/`Popover*` (130) and above the entire dock/overlay band. The card ships the highest z-index in the instrument for its smallest control.

The letter of the contract is honoured (a semantic `z-*` utility, no raw `z-[N]` bracket — §S-5); the intent is inverted.

**Falsifier.** An ancestor opens a stacking context that scopes 140 locally — `Card`/`CardContent` set no `transform`/`opacity<1`/`isolation`/`filter` (`KeyframesEditor.vue:10–11`; glass `components/card/styles.css` sets no `isolation`); the `<pre>`'s ancestors likewise. Or `--z-modal` is not 140 — it is.

### D-11 · `sticky` + `bg-transparent` → glyph-on-glyph collision — MAJOR

`:4` combines `sticky top-0` with `bg-transparent` and `shadow-none` and `border-none`. A sticky element with **no backing plate** pins over content that keeps scrolling beneath it. Here that content is the code plate in grid row 2 — dense monospaced (well, sans, per D-8) CSS text. The offset digits and the code glyphs occupy the same pixels with no separating surface.

The card had every option: the glass plate it explicitly removed, a `backdrop-blur` scrim, or simply not being sticky.

**Falsifier.** The card list never scrolls (it does — `KeyframesEditor.vue:35` pins a `sticky bottom-0` toolbar in the same container, which is only meaningful in a scroller; `ControlsPaneWrapper.css` bounds the pane), or the sticky element does keep a plate (D-14 shows it does not — `background-color: transparent` wins from utilities).
`UNPROVEN-NEEDS-LIVE` for the exact scroll geometry; the missing-plate half is fully decidable.

### D-12 · The destructive control: placement, confirmation, and a dead state — MAJOR

Three defects in one affordance.

**(a) It floats over the primary editing surface.** The overlay is `absolute top-2 right-4` (`:12`) inside the `div.relative` (`:10`) that also holds the `<pre>` (`p-2 min-h-32 cursor-text`, `:45`). The X's 24px box therefore sits directly over the code's first line, roughly 40–64px in from the card's right edge. Since the `<pre>` has no `overflow-x` (D-15), real declarations *do* reach that column. Clicking to place a caret near the end of line 1 hits **delete** instead.

**(b) No confirmation, no undo.** `emit('remove', e)` → `removeKeyframe` → `removeKeyframeData(frameIx)` (`KeyframesEditor.vue:232–250`). No dialog, no snackbar-undo, no re-add path. Meanwhile the *non*-destructive copy action next to it gets a 200 ms bounce animation and a polite live region (`CopyButton.vue:40–63`). The feedback budget is spent on the safe action and withheld from the irreversible one.

**(c) It is silently inert at n=1.** `KeyframesEditor.vue:233–235` returns early when `templateFrames.length <= 1`, but the card receives no `disabled`/`canRemove` prop and renders the X at full opacity with `cursor-pointer` and `scale-on-hover` regardless. A dead affordance that looks identical to a live one — the classic disabled-state omission, and the only state the card's prop surface (`:62–67`: `frameString/formattedCSS/frameStart/index`) cannot express.

**Falsifier.** (a) an ancestor clips the `<pre>` short of the overlay column — no `overflow` is set on `div.relative`, `CardContent`, or the card list; (b) an undo exists — `grep -rn "undo" demo/components/instrument/keyframes/` → no hits; (c) the guard is elsewhere or the card is told about it — `KeyframesEditor.vue:233` is the only guard and `KeyframeCard.vue:62–67` declares four props, none of them a state flag.

### D-13 · No inline invalid state — MAJOR

glass's `Input` declares `invalid: { type: Boolean, default: false }` and emits `aria-invalid` + `data-state`, and `field-control.css` ships the full visual: `.field-control:is(:user-invalid,[data-state="invalid"]) { --control-surface-bg: color-mix(… var(--destructive) 8% …); border-color: var(--destructive) }` and an `--invalid-ring` on focus.

The card passes none of it (`:3–8`). When `parseCssScalar` rejects the offset, `KeyframesEditor.vue:189–203` fires `toast.error(…)` — a transient overlay somewhere else on screen — while the field that produced the error keeps its invalid text with **no border change, no `aria-invalid`, no `aria-describedby`** pointing at the message. WCAG 3.3.1 (Error Identification, A) requires the error be identified *in text* and associated; a detached toast that auto-dismisses is neither.

Compounding: because `border-none`/`shadow-none` are unconditional (D-4), even if `invalid` were passed, **the destructive border and the invalid ring would still be cancelled** by the same two utilities.

**Falsifier.** The card renders an error slot elsewhere (it renders four elements total; none is an error region), or `toast` is anchored to the field (`toast.error` with an `id` for dedupe only, `:189–193`).

### D-14 · Everything that made it a control was stripped; the blur stayed — MAJOR

Utilities beat `@layer components` (§0.1), so on the `<input>`:

| `field-control` declares | card's utility | result |
|---|---|---|
| `background: var(--control-surface-bg)` | `bg-transparent` | **no plate** |
| `border: 1.5px solid var(--control-surface-border)` | `border-none` | **no border** |
| `box-shadow: var(--glass-rim-top), var(--glass-rim-bottom)` | `shadow-none` | **no rim** |
| `padding-inline: calc(1rem * var(--ui-scale))` | `p-0` | **no padding** |
| `backdrop-filter: var(--control-surface-blur)` (= `--glass-blur-quiet`) | *nothing* | **survives** |
| `border-radius: var(--radius-pill)` (9999px) | *nothing* | **survives** |

The residue is a **pill-shaped region of blurred backdrop with no plate, no edge, no shadow, no padding, and no focus ring** — visually a soft smudge over whatever is behind it, with no signal whatsoever that it is an editable field. Combined with D-3 (no name) and D-4 (no focus ring), the card's primary numeric editor is undiscoverable by sight, by keyboard, and by AT simultaneously.

`backdrop-filter` also establishes a containing block and a stacking context on the element — an unintended layout side-effect the author cannot have wanted, since every other glass token was deliberately removed.

**Falsifier.** `--control-surface-blur` resolves to `none` — it is `var(--glass-blur-quiet)` (`styles/tokens/glass.css`), a real blur. Or a utility cancels it — `backdrop-filter-none` is absent from `:4`. Or `.field-control` is unlayered and wins — refuted by the byte-4325-inside-the-layer scan (§0.1).
`UNPROVEN-NEEDS-LIVE` for the perceived strength of the smudge; the declaration set is decidable.

### D-15 · The `<pre>` cannot contain its own content — MAJOR

`:41–50` sets `p-2 min-h-32 rounded-lg text-small` and nothing about overflow or wrapping. `<pre>` keeps the UA `white-space: pre`. The element is a block inside `div.relative`, itself a grid item of the card's root `grid` (`:2`), itself inside `CardContent`'s `grid gap-4`. Grid items default to `min-width: auto`, i.e. they refuse to shrink below max-content — and a `white-space: pre` line has no soft break opportunities, so its min-content width **is** its longest line.

A single long declaration (`transform: translate3d(-50%, calc(100% - 2rem), 0) rotate(45deg);` is ordinary in this demo) therefore widens the grid track and pushes the card past its container. The hljs stylesheet's own containment rule does not help: it is scoped `pre code.hljs { overflow-x: auto }` — and the `<code>` is destroyed by the highlighter (D-8), leaving `.hljs` on the `<pre>` with no overflow rule at all.

Missing: `overflow-x-auto`, `min-w-0`, or `whitespace-pre-wrap`. Any one would fix it.

**Falsifier.** An ancestor sets `overflow:hidden`/`min-width:0` — none of `div.relative` (`:10`), the root `grid` (`:2`), `CardContent` (`KeyframesEditor.vue:11`) or glass `card/styles.css` does. Or the theme's `pre code.hljs` rule applies — it cannot, post-highlight.

### D-16 · RTL: nothing mirrors — MAJOR

`:12` `absolute top-2 right-4` — physical. In an RTL document the entire control cluster (delete, copy, and both readouts) stays pinned to the *right*, i.e. to the **end** of the line in LTR terms but the **start** in RTL, colliding with the beginning of the code rather than trailing it. The logical form (`end-4`) exists in Tailwind v4 and is used elsewhere in the consumed package (glass's own `.tags-input__delete { inset-inline-end: 0 }`, `glass-ui.css`).

Also physical, same line: `justify-center justify-items-center` are fine, but there is no `dir` awareness anywhere on the card, and the ghost stack's `grid gap-1` right-aligns implicitly by its anchor rather than by `text-align: end`.

**Falsifier.** The demo declares itself LTR-only — `grep -rn "dir=" demo/` → no `dir` attribute anywhere, so RTL is neither supported nor explicitly excluded; and glass-ui itself ships logical properties throughout, so the design system's posture is RTL-capable. Severity would drop to MINOR if a documented LTR-only scope exists; none was found.

### D-17 · The root grid declares no gap — MAJOR (Aristotelian proportion)

`:2` `<div class="grid">`. Two rows — the offset field and the code plate — abut at **0 px**. Every neighbouring surface has rhythm: `CardContent` is `grid gap-4` (`KeyframesEditor.vue:11`), the ghost stack is `grid gap-1` (`:12`), the toolbar is `gap-2` (`KeyframesEditor.vue:68`), and the list interleaves a `<Separator>` between cards (`KeyframeCardList.vue:19–22`). The card is the only member of the family with no internal interval, so the *inter*-card separation (a full `gap-4` + rule) is larger than the *intra*-card separation (zero) — the proportion is inverted, and the two rows read as one undifferentiated block rather than as label-and-body.

The mean is not hard to find: `gap-1` or `gap-2` would restate the same hierarchy the ghost stack already uses one nesting level down.

**Falsifier.** A `<style>` block or a global rule sets the gap — the SFC has **no** `<style>` block (S-5) and `grep -rn "\.grid\b" demo/styles/*.css` → no hit.

### D-18 · Two writers own the contenteditable subtree — MAJOR

Vue owns `<pre><code>{{ formattedCSS }}</code></pre>` (`:50`) as a reactive text vnode. `useHighlightCSS.ts:96–104` blows the same subtree away with `el.innerHTML = h.value` and marks it `highlighted` so it never runs again. The user is a third writer via `contenteditable`.

Visible design consequences (the mechanism is axis C's): highlighting is a **one-shot** — the marker attribute (`:97,101`) makes `highlight()` a no-op forever after the first pass, so newly typed text is never re-tokenised and drifts un-highlighted against the tokenised prefix; and Vue's cached text node is detached by the `innerHTML` write, so subsequent `formattedCSS` patches (`KeyframeCardList.vue:50–52` re-derives on every parent update) have no visible destination. The surface can present a *stale-formatted, half-highlighted* body with no state in the component that says so.

Nothing in the card acknowledges this: no `v-once`, no `key` to force re-mount, no `:key="formattedCSS"`, no ownership comment (the comment at `:76–78` documents the *ref* contract, not the DOM one).

**Falsifier.** Vue re-creates `<code>` on the next patch (it will not — the vnode is reused while `formattedCSS`'s identity as a text child is unchanged; only a keyed re-mount would rebuild it), or `highlight()` clears the marker (it never does — `useHighlightCSS.ts:96,101`). Marked partially `UNPROVEN-NEEDS-LIVE`: the *ordering* of Vue's patch vs. hljs's async `bootHighlighter().then()` is timing-dependent, so the exact visual is livable-only; the two-writers-one-guard structure is static fact.
*Cross-axis: axis C owns the mechanism; recorded here for the state/visual consequence only.*

### D-19 · The card's one animated affordance is unreachable by `prefers-reduced-motion` — MAJOR

The card imports `CopyButton` (`:59`), whose feedback is an engine-driven `scale(1) → scale(1.25) → scale(1)` bounce with `timingFunction: "bounceInEase"` over 200 ms (`CopyButton.vue:40–43,69–93`), played through `AnimationGroup` (`:62,95–101`). keyframes.js writes inline styles per animation frame — it does not use CSS `animation`, so glass's global guard cannot see it:

```
styles/utilities/a11y-overrides.css  (unlayered)
@media (prefers-reduced-motion: reduce) { *:not([data-allow-motion]) { animation-duration:.01ms !important; animation-iteration-count:1 !important } … }
```

`animation-duration` does nothing to an inline-style-driven transform. `CopyButton` has no `matchMedia` guard of its own (`grep -n "reduced-motion" demo/components/CopyButton.vue` → 0). So a 25% overshoot bounce plays at full amplitude for a user who asked for reduced motion. WCAG 2.3.3 (AAA) / the demo's own §6.5 posture.

⚠ **This is the gap `lane-frontend.md §6.5` did not enumerate.** That census counted 13 enforcement sites and named `TypingDots`/`KeyframeTimeline` as prose-only deferrals; `CopyButton` is listed at §6.4 as an animation site (`fade-in`/`fade-out`, "runtime JS string injection") but is **not** carried into the PRM gap list. It belongs there: it is the only *engine*-driven animation in the census whose amplitude no CSS rule can reduce.

**Contrast — and this is the honest half:** the card's *other* motion, `scale-on-hover` on the X (`:23`), **is** PRM-honest by delegation. glass defines it as a `transition` (`styles/utilities/btn.css`: `@utility scale-on-hover { scale:1; transition: scale var(--spring-smooth-duration) var(--spring-smooth); &:hover{ scale: var(--scale-hover) } }`) and the PRM block restricts `transition-property` to `opacity, color, background-color, border-color, box-shadow !important` — `scale` is excluded, so the transition is cancelled and the hover state becomes instantaneous. Verified, not assumed. (Recorded as INFO I-1, **not** a defect.)

**Falsifier.** keyframes.js emits CSS `@keyframes` for `fromString` groups rather than driving inline styles — `CopyButton.vue:69–101` constructs `CSSKeyframesAnimation(...).setTargets(el).play()`, the engine's rAF path; if the engine instead injected a stylesheet and set `animation-name`, the global guard would bite and this claim dies.

---

## 4. MINORS

### D-20 · Seven dead or self-cancelling utilities — MINOR

| class | site | why it does nothing |
|---|---|---|
| `aspect-square` | `:4` | `.field-control[data-kind="input"]{block-size:var(--field-control-height)}` sets height explicitly; `aspect-ratio` only sizes an `auto` axis. The box is **4rem × ~2.5rem**, never square. |
| `border-transparent` | `:4` | cancelled by `border-none` on the same line (`border-style:none` → no border to colour) |
| `focus:border-transparent` | `:4` | same, plus it targets `:focus` where the design system uses `:focus-visible` |
| `focus:shadow-none` | `:4` | redundant — the unconditional `shadow-none` already won |
| `font-semibold` | `:4` | `text-subheading` already declares `font-weight:600` (`typography/semantic.css`) |
| `bg-transparent hover:bg-transparent` | `:23` | on an `<svg>`; lucide sets `fill:none`, and SVG roots have no painted background here |
| `stroke-2` | `:23` | lucide's `defaultAttributes` already ship `stroke-width: 2` |
| `p-0 m-0` | `:4,23` | `m-0` on an input/svg with no inherited margin; `p-0` on the svg is inert |

Nine of the offset field's twenty classes and four of the X's twelve are inert. The signal-to-noise ratio of the class string is the design artefact here: a reader cannot tell which declarations are load-bearing, which is precisely how D-4 and D-14 survived review.

**Falsifier.** Any of these has a competing rule that makes it live — each row states the winning declaration and its file.

### D-21 · Two `<label>` elements that label nothing — MINOR

glass `Label` wraps reka-ui's `Label` → renders a real `<label>` (`components/label/Label.vue.d.ts`: `RekaLabelProps`; `label-DJA3eNLS.js` imports `{ Label as p } from "reka-ui"`). The card passes no `for`, and neither `<Label>` wraps a control (`:31–38`). A `<label>` with no associated form control is a semantic null: it contributes no name to anything (D-3 remains), and reka's `Label` installs a `mousedown` handler that suppresses selection on double-click — so the text is also harder to select than plain text would be, for no benefit. `<span>` is the correct element; `Label` is a glass-conformance reflex applied where the semantics do not fit.

**Falsifier.** reka `Label` renders a `<span>` when `for` is absent — it does not; `as`/`asChild` are the only escape and neither is passed.

### D-22 · Cryptic glyph labels; the datum duplicated in clashing registers — MINOR

`f {{ index }}` (`:33`) and `s {{ frameStart }}` (`:37`) — two bare single letters with no legend, no `title`, no tooltip, no `aria-label`, and no expansion anywhere in the tree (`grep -rn '"f "\|"s "' demo/components/instrument/keyframes/` → nothing). "f" for frame and "s" for start are guessable only by whoever wrote them.

Worse, `s` is a **verbatim mirror of the `Input` 4 rem away**, in a clashing typographic register: the editable primary is sans / semibold / `tracking-tight` / `text-subheading`; the ghost mirror is (intended) mono / light / tabular — i.e. the *instrument* register is spent on the read-only duplicate and the *body* register on the live control. Two voices for one datum, and the redundancy adds nothing the field does not already show. (Post-D-1 both currently read `[object Object]`, which is how the duplication became invisible.)

**Falsifier.** A legend exists — searched; none. Or the mirror shows a *derived* value (e.g. resolved percent vs. raw input) — it does not: both bind the same `frameStart` prop.

### D-23 · 0-based index surfaced to AT — MINOR

`:49` `:aria-label="`CSS for keyframe ${index}`"` and `:33` `f {{ index }}` both publish the raw array index. A screen-reader user hears "CSS for keyframe 0" for the first keyframe. Ordinal prose is 1-based; the card's own semantic identity for a stop is its offset (`0%`, `50%`), not its position. A truer name would be `CSS for the keyframe at ${frameStart}`.

**Falsifier.** `index` is 1-based upstream — `KeyframeCardList.vue:4` `v-for="(s, i) in frameStrings"` passes `:index="i"`, 0-based.

### D-24 · 24×24 destructive target vs the demo's own 44 px idiom — MINOR

`:23` `w-6 h-6` and `:26` `class="h-6 w-6"` — both 24 CSS px, adjacent in a `flex` with **no gap** (`:14`), so the delete and copy hit-boxes touch. That is exactly the WCAG 2.5.8 (AA) minimum and no more, on a control pair where the left member is irreversible and the right is not — a mis-tap costs a keyframe.

The demo already owns the stronger contract: `design-idioms.css:81–85` defines `.tap-floor { min-height:44px; min-width:44px }`, documented as "the WCAG 2.5.5 44px minimum touch-target floor". The card uses neither `.tap-floor` nor glass's own `touch-hit-area` utility (`styles/utilities/a11y-overrides.css`, which grows a coarse-pointer 2.75 rem pseudo-target without changing layout). Two ready idioms, neither reached, on the demo's only per-item destructive control.

**Falsifier.** A parent enlarges the target — `KeyframeCardList.vue`/`KeyframesEditor.vue` add no sizing to the cards. Or `.tap-floor` is dead across the demo (then it is a lane-level finding, not this card's) — it is defined and proof-anchored at `design-idioms.css:81`.

### D-25 · Hover-only affordance — MINOR

`:23` `scale-on-hover … hover:opacity-80`. Both state changes are `:hover`-gated. There is no `:focus-visible`, no `:active`, and (per D-2) no focus state to attach one to. Pointer users get two feedback channels; keyboard, touch, and AT users get zero. The fix is entailed by D-2's fix (wrap in a `<button class="focus-ring">`), so this is a rider rather than an independent repair.

**Falsifier.** A global rule adds `:focus-visible` styling for `[data-destructive]` — `grep -rn "data-destructive" demo/styles/` → no styling rule; the attribute is a census marker only.

### D-26 · `CopyButton`: double announcement, and off the demo's focus idiom — MINOR

`CopyButton.vue:4` swaps the **accessible name** on copy (`:aria-label="isCopied ? 'Copied to clipboard' : label"`) while `:15` *also* pushes "Copied to clipboard" into a `role="status" aria-live="polite"` sink. Screen readers announce a name change on a focused control **and** the live region — the same six words twice. The live region alone is the correct mechanism (and is well built — see the deliberate re-arm at `:57–60`); the name should stay stable.

Separately, its class string (`:5`) carries no `focus-ring`, so it falls back to the UA default outline rather than the demo's declared "SINGLE keyboard-focus affordance" (`design-idioms.css:73–79`) — an inconsistency the `<pre>` on the same card does not have.

**Falsifier.** AT does not announce accessible-name changes on a focused element (they do — this is the documented reason ARIA APG advises against dynamic name swaps on buttons). Or a demo rule gives every `<button>` the ring — `grep -rn "button:focus-visible" demo/styles/*.css` → no hit.

---

## 5. SUPERLATIVES (L-18 runs both ways)

### S-1 · The child-ref contract — genuinely excellent

```
:76-80  // The card's own contenteditable <pre> — surfaced for the parent's scoped
        // highlight collection (a declared child-ref contract, no querySelector).
        const preEl = useTemplateRef<HTMLElement>("preEl");
        defineExpose({ preEl });
```

This is the mechanism that lets `useCodeHighlight` be *scoped* — `KeyframesEditor.vue:176–178` hands it `cardList.getPreElements()`, which `KeyframeCardList.vue:76–79` builds from the exposed refs, "no querySelectorAll". The composable's own header records the bug this killed: *"highlights ONLY the elements the caller hands it … never the whole document (D.W3.S1: the global `document.querySelectorAll("pre")` was the bug)"*. Five lines of component surface eliminate an entire class of cross-component DOM reach, and the comment states the contract rather than the mechanism. This is the single best thing in the file.

**Falsifier (runs both ways).** A `querySelectorAll("pre")` path still exists — `grep -rn "querySelectorAll" demo/components/instrument/keyframes/` → 0 hits; the only `querySelector` calls in `useHighlightCSS.ts` (`:37,109`) target `document.head` by `#id` for the two `<style>` singletons, which is the documented idiom, not a component reach.

### S-2 · Destructive-register token conformance — correct and self-documenting

`:15–19,23` — the delete X rides `text-accent-red` (bridged in `@theme` at `style.css:58`) rather than a raw `red-500` literal, and carries `data-destructive` so the repo's red-census can *see* the role. `style.css:114–119` confirms `--accent-red` is "DESTRUCTIVE-ONLY … and NOTHING else", with a dark arm at `:187–188`. Colour is used as a *role*, tokenised, marked, and the comment explains why — the exact opposite of the `#0d1117` hardcode that the cascade forces on the same card three lines later (D-7).

**Falsifier.** `--accent-red` is not demo-owned or not destructive-scoped — `style.css:114–119` and `:187–188` say otherwise; or a raw Tailwind red survives on this card — none present.

### S-3 · The ARIA triad on the contenteditable — the part most hand-rolls omit

```
:45-50  contenteditable="true" role="textbox" aria-multiline="true" :aria-label="…"
```

All three legs of the correct pattern for a contenteditable text region, plus a per-instance name. The overwhelming majority of hand-rolled code editors ship `contenteditable` and nothing else. Undercut by D-6 (the Tab trap makes the region a one-way door) and D-23 (the 0-based ordinal), but the structure is right and those are repairs *on top of* a correct base, not a rebuild.

**Falsifier.** `role="textbox"` on a multiline contenteditable is wrong — it is the spec pattern when paired with `aria-multiline`; the alternative (`role="code"` or a bare contenteditable) is strictly worse for AT.

### S-4 · The `<pre>` uses the demo's single sanctioned focus idiom — and it survives forced-colors

`:45` `focus-ring` → `design-idioms.css:73–79`, the demo's declared *"SINGLE keyboard-focus affordance … keyboard/AT focus only, so pointer focus stays quiet"*. It then inherits, for free, glass's unlayered forced-colors fallback: `@media (forced-colors: active) { .focus-ring:focus-visible, … { outline: 2px solid Highlight; outline-offset: 2px } }` (`styles/utilities/a11y-overrides.css`). One class, three correct behaviours (`:focus-visible` gating, token-sourced ring, HCM fallback). It is also the direct proof that D-4 is an omission and not a house style.

**Falsifier.** `.focus-ring` is absent from the forced-colors selector list — it is the **first** selector in it, verbatim.

### S-5 · Zero bespoke CSS: no `<style>` block, no raw `z-[N]`, no local primitive

The SFC ships **no `<style>` block at all** — against `lane-frontend.md §1`'s count of **40 of 58** `.vue` files carrying one. It vendors no primitive (it consumes glass `Input`/`Label` rather than forking them — the opposite of the S-1/`KfPillTabs` pattern the census condemns), introduces no local token, and uses the semantic `z-modal` utility rather than the forbidden raw bracket (`style.css:37–39`). Every visual decision is expressed in the shared vocabulary and is therefore *auditable* — which is why this challenge could be written statically at all. That the shared vocabulary then loses several cascade contests (D-4, D-7, D-9, D-14) is a defect of the vocabulary's layering, not of the card's discipline.

**Falsifier.** A `<style>` block or a raw `z-[N]` exists — `grep -n "<style\|z-\[" KeyframeCard.vue` → 0 hits. Or the card forks a glass primitive — it imports `Label` and `Input` from the package.

---

## 6. INFO (verified non-defects)

**I-1 · `scale-on-hover` is PRM-honest by delegation.** Verified, not assumed: glass's unlayered PRM block restricts `transition-property` to `opacity, color, background-color, border-color, box-shadow !important`, and `scale-on-hover` transitions `scale` — excluded, therefore cancelled. The hover state becomes an instantaneous non-animated change, which is what WCAG 2.3.3 asks for. **No local guard is needed and none should be added.** (Contrast D-19, where delegation genuinely fails.)

**I-2 · The Input's focus indicator exists only under forced-colors.** `.field-control:focus-visible` appears in glass's unlayered `@media (forced-colors: active)` list. So D-4's failure is invisible to exactly the testing mode most likely to be used for an a11y sweep — worth noting for whoever verifies the fix.

**I-3 · `--kf-*` namespace (`lane-frontend.md §6.3`).** The card introduces **no** custom property and consumes only flat, unprefixed ones (`--accent-red` via `text-accent-red`; `--z-modal` via `z-modal`). It is a conforming instance of the repo-wide flat-namespace surface the census counted at 98 demo properties / **0** `--kf-*`, not an aggravator. ⚠ But §6.3 frames the hazard as *token-name collision*; this component demonstrates a second, sharper face of it — **layer** collision, where a consumed package's unlayered stylesheet silently outranks the consumer's utility layer (D-9). The token-namespace lane should be widened to a cascade-layer lane.

---

## 7. Repair order (smallest cut first)

1. **D-1** — one line in `KeyframeCardList.vue:11` (format the `KeyframeSelector`); everything downstream is currently rendering a debug string, so no visual judgement about this card is trustworthy until it lands.
2. **D-2 + D-3 + D-4 + D-25** — wrap the X in `<button type="button" class="focus-ring tap-floor" :aria-label>`; give the Input an `aria-label`; **delete** `border-none shadow-none border-transparent focus:border-transparent focus:shadow-none` (which also restores D-13's invalid ring and D-14's plate for free). Five deletions and two attributes retire four blockers and a minor.
3. **D-6** — add an `Escape`-releases-focus path (or `Ctrl+M`) and advertise it; Level A.
4. **D-5** — raise `opacity-25` to a token-sourced `text-muted-foreground` at full opacity, or drop the mirror entirely per D-22.
5. **D-9 + D-7 + D-8** — the layer contest. Either wrap the hljs injection and glass's unlayered tail in an explicit `@layer`, or stop fighting them: put the theme colours on tokens and set the mono family on the `<pre>` by a rule that can win.
6. **D-12(c)** — add a `canRemove` prop; the guard already exists at `KeyframesEditor.vue:233`, it is simply not told to the card.
7. Everything else is independently landable.

---

## Provenance

Every glass-ui claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` (7.0.0, the copy already installed in the target), so no upgrade is presumed by any repair above. Every cascade verdict was decided by locating the rule's byte offset relative to its file's `@layer` blocks, not by specificity intuition. Contrast ratios were computed from the token values in `dist/styles/tokens/light-dark.css` + `color-radius.css` + `dark-arm.css` using the WCAG relative-luminance formula with sRGB alpha compositing; they are stated as upper bounds and the arithmetic is shown. No file in keyframes.js, glass-ui, value.js, or highlight.js was written, mutated, or executed; no installs, no dev servers, no browser tooling. The sole write of this task is this file.

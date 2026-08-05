claude-opus-5[1m]

# CHALLENGE · `KeyframesAddDialog.vue` · axis **D — DESIGN**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/components/KeyframesAddDialog.vue` (161 lines)
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser tooling. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE`.
**Posture:** the component is presumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier and dies if the falsifier holds.

## Read set (whole-file, read-only)

| file | why |
|---|---|
| `demo/components/instrument/keyframes/components/KeyframesAddDialog.vue` | target |
| `demo/components/instrument/keyframes/composables/useHighlightCSS.ts` | `useCodeHighlight` — `setHighlightingString` / `highlightAll` |
| `demo/components/instrument/keyframes/utils/contenteditable.ts` | `insertTabAtCursor` |
| `demo/components/instrument/utils/toastGuard.ts` | `isInsideToaster` |
| `demo/components/instrument/keyframes/KeyframesEditor.vue` | the sole consumer (`:75–80`, `:118`) |
| `demo/components/instrument/keyframes/composables/useToolbarKeyboard.ts` | the roving-tabindex host the trigger lives in |
| `demo/components/instrument/keyframes/composables/useKeyframeOps.ts` | `updateAddKeyframesString` (`format` prop), `addKeyframesStringToAnimation` (`submit`), `withErrorToastAsync` |
| `demo/components/instrument/keyframes/KeyframeCard.vue` | **sibling contenteditable, fully instrumented** — the in-tree comparator |
| `demo/components/instrument/timeline/CSSPasteDialog.vue` | **sibling paste-CSS dialog, same idiom** — the second in-tree comparator |
| `demo/components/instrument/shell/KeyboardShortcutsModal.vue` | the shortcut registry surface + a third dialog comparator |
| `demo/styles/design-idioms.css` | `.progress-bar`, `.scale-on-hover`, `.focus-ring`, `.tap-floor`, `icon-*` |
| `node_modules/@mkbabb/glass-ui/dist/dialog-BKSTfmIQ.js` | `DialogContent` / `DialogTitle` / `DialogDescription` / `DialogHeader` / `DialogFooter` render contracts |
| `…/glass-ui/dist/card-Da665R8v.js`, `…/button-B7c944jy.js`, `…/class-names-Cpy5eaBk.js` | `CardTitle` tag, `Button` props/base, the `cn` merge groups |
| `…/glass-ui/dist/styles/typography/{scale,semantic}.css`, `theme/bridges.css`, `accessibility.css` | type rungs, `@utility` bodies, forced-colors coverage |
| `node_modules/reka-ui/dist/{Dialog/DialogTitle.js,Dialog/DialogDescription.js,FocusScope/FocusScope.js,FocusScope/utils.js}` | default tags, Tab-edge behavior |
| `node_modules/@vueuse/core/dist/index.js` | `useMagicKeys` key normalization |
| `src/animation/constants/types.ts` | `respectReducedMotion` default |
| `node_modules/highlight.js/styles/github{,-dark}.css` | the injected theme's own `background`/`color` |

## Hitherto corpus — folded, not re-invented

- **F-1** (`lane-frontend.md §2`) — glass-ui is a phantom dependency (installed 7.0.0, undeclared, unlocked). Every glass-ui claim below is read from the **installed** `node_modules/@mkbabb/glass-ui/dist/` copy, exactly as F-1's provenance note prescribes. This challenge does not re-litigate F-1.
- **Roster row** (`lane-frontend.md §4`, keyframes cluster) — "161 · `components/KeyframesAddDialog.vue` · G · add-keyframe dialog — `Dialog*` + `Button` + `CardTitle`". **Confirmed exactly.** The `CardTitle` in that row is itself a defect (D-4).
- **§3.1 utilisation** — the demo reaches 21 of 73 glass-ui subpaths. This file consumes only the root barrel. It leaves `DialogHeader` (present in the same barrel, used by `KeyboardShortcutsModal.vue:4`) unreached — a *within-barrel* under-consumption the subpath census could not see (D-4).
- **§6.3 token namespace** — "No `--kf-*` namespace exists… demo tokens are unprefixed and therefore share a flat global namespace." **Contradiction filed:** the hazard in this file is not custom properties (it declares zero) but *global class names*. It applies `hljs`, `css`, `progress-bar`, `scale-on-hover` — four unprefixed global class tokens, one of which (`css`) is defined by nothing on disk (D-14). The flat-namespace hazard has a class-selector arm the lane did not enumerate.
- **§6.5 PRM** — "13 enforcement sites across 12 files"; this file is not among them. Confirmed, and D-9 shows the omission is *load-bearing* here rather than delegable, because the engine's PRM gate is opt-in.
- **§5 shadow census S-1..S-8** — all eight are bespoke-vs-**glass-ui**. This file exposes a ninth shape the census did not cover: **bespoke-vs-bespoke** (D-11) — `CSSPasteDialog.vue` is an 80-line parameterized paste-CSS dialog in the same demo, and `KeyframesAddDialog` re-authors its shell from scratch at 161 lines, diverging on every design decision it re-makes.

---

## Verdict

| | count |
|---|---|
| **BLOCKER** | 3 |
| **MAJOR** | 8 |
| **MINOR** | 12 |
| **INFO** | 4 |
| **defects total** | **27** |
| **superlatives** | 4 |

---

# BLOCKERS

## D-1 · BLOCKER · the editing surface is unnamed, unroled, and has no focus affordance

`KeyframesAddDialog.vue:33–39`

```
<pre
    ref="addKeyframesEl"
    @keydown="onKeyDown"
    @input="onInput"
    class="hljs css min-h-[25vh] p-2 cursor-text rounded-lg text-small bg-transparent outline-none border-none relative"
    contenteditable="true"
><code>{{ text }}</code></pre>
```

The dialog's *entire reason to exist* is this control. It carries:

- **no accessible name** — no `aria-label`, no `aria-labelledby`, no associated `<label>`;
- **no role** — `contenteditable` on a `<pre>` confers no `textbox` role in HTML-AAM; the element is exposed as generic-with-editable-state;
- **no `aria-multiline`**;
- **`outline-none` with nothing put back** — no `.focus-ring`, no `focus-visible:*`.

The tree proves this is not house style. The sibling in the same feature folder, `KeyframeCard.vue:45–51`, is the *same idiom* fully instrumented:

```
class="focus-ring hljs css p-2 min-h-32 cursor-text rounded-lg text-small bg-transparent outline-none border-none relative"
contenteditable="true"
role="textbox"
aria-multiline="true"
:aria-label="`CSS for keyframe ${index}`"
```

And `design-idioms.css:73–79` names `.focus-ring` **"the demo-owned `:focus-visible` contract — the SINGLE keyboard-focus affordance"**. The add dialog suppresses the UA outline and then declines the one replacement the design system ships.

WCAG: **2.4.7 Focus Visible (AA)** — failed outright (`outline-none`, no substitute). **4.1.2 Name, Role, Value (A)** — failed (no name, no role).

*Honest scope note:* the third contenteditable in the demo, `CSSPasteDialog.vue:54`, shares the flaw (`outline-none border border-border`, no role, no name). So this is a 2-of-3 pattern defect, not a one-off — but `KeyframeCard.vue` proves the correct form exists, is achievable, and is already written in this exact folder.

**Falsifier:** a stylesheet rule that restores a visible `:focus-visible` indicator on `[contenteditable]` or on `.hljs`, or an ancestor supplying `aria-label`/`role` to this node. Probes run: `grep -rn "contenteditable\|white-space" demo/styles/*.css` → no output; `grep -o "pre[ ,{][^{]*{[^}]*}" glass-ui/dist/styles/utilities/base*.css` → no output; `.hljs` in `github{,-dark}.css` sets only `color`/`background`. None found — the claim stands.

## D-2 · BLOCKER · Tab is trapped in the editor; the primary action is keyboard-unreachable

`KeyframesAddDialog.vue:109–123`

```
function onKeyDown(e: KeyboardEvent) {
    const { key } = e;
    …
    if (key === "Tab") {
        e.preventDefault();
        insertTabAtCursor(e.target as HTMLElement);
    }
    …
}
```

`key === "Tab"` is true for **both** Tab and Shift+Tab; `preventDefault()` kills sequential focus navigation in both directions. There is no documented escape (no Esc-then-Tab arming, no `Ctrl+M`, no "press Escape then Tab" hint — WAI-ARIA's standard remedy for editors that consume Tab).

reka's focus trap does **not** rescue it. `reka-ui@2.9.9 FocusScope/FocusScope.js:118–137`:

```
const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
if (isTabKey && focusedElement) {
    const [first, last] = getTabbableEdges(container);
    …
    } else if (!event.shiftKey && focusedElement === last) { event.preventDefault(); if (props.loop) focus(first…) }
    else if (event.shiftKey && focusedElement === first) { … }
}
```

FocusScope only acts when the focused element **is** the first or last tabbable in the container; otherwise it defers to the browser's native Tab — which `onKeyDown` has already cancelled. The `<pre>` is neither edge: the tabbable order inside `DialogContent` is `[close ✕ (showClose default true), <pre>, Add-Keyframes <button>]`.

Consequence, exactly: a keyboard user opens the dialog, types their keyframes, and **cannot reach the "Add Keyframes" button**. There is no `<form>` (D-19), so Enter does not submit either. The only exit is Escape, which dismisses the dialog. The component's happy path — type, then commit — has no keyboard realization.

WCAG: **2.1.1 Keyboard (A)** — the primary control is not operable from the keyboard once focus enters the editor. **2.1.2 No Keyboard Trap (A)** — the standard exit method for a text field is Tab, and it is consumed; Escape exits only by destroying the interaction.

**Falsifier:** any keydown listener above the `<pre>` that restores sequential navigation (an Esc-arm, an `F6`/`Ctrl+M` handler, or a `tabindex` shuffle). `useToolbarKeyboard.ts:80–101` handles only `ArrowLeft/ArrowRight/Home/End` and lives on the toolbar container — the portalled dialog content is not its descendant. `EditorShell.vue` registers `?` only. No such listener exists. Also falsified if `DialogContent` rendered `showClose: false` *and* the `<pre>` were first — it does not; `showClose` defaults `!0` (`dialog-BKSTfmIQ.js`, `showClose: { type: Boolean, default: !0 }`).

## D-3 · BLOCKER · unbounded content in a non-scrolling fixed dialog — tall input goes off-screen and unreachable

`KeyframesAddDialog.vue:16–23` passes no `scroll` prop; `:37` sets `min-h-[25vh]` and no maximum.

glass-ui `DialogContent` (`dialog-BKSTfmIQ.js`):

```
scroll: { type: Boolean, default: !1 }
…
Y = a(() => d.scroll ? (g.value ? "max-h-[calc(100dvh-2rem)] overflow-y-auto" : "overflow-y-auto") : "")
K = "fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg gap-4 [--overlay-pad-inline:--spacing(6)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block)"
q = "-translate-x-1/2 -translate-y-1/2 glass-reveal"
```

With `scroll` unset, `Y` is the empty string: **no `max-height`, no `overflow-y`**. The panel is `position: fixed`, centred by `top-1/2` + `-translate-y-1/2`. A `contenteditable` grows without bound with its content. Paste a 40-line `@keyframes` block and the panel grows symmetrically past both viewport edges: the footer button leaves the bottom of the screen, the title leaves the top, and because the host is `fixed` there is nothing to scroll — not the panel (no overflow), not the page.

This is not a hypothetical input: the component *is* the paste-a-keyframes-block affordance, and `useKeyframeOps.ts:161–177` parses arbitrarily many `keyframes` entries out of it.

The author clearly intended a scrolling body — `:41` puts `sticky bottom-0` on the footer, which is the pin-the-actions idiom. It is inert here (D-12) precisely because `scroll` was never turned on. The intent and the wiring disagree.

**Falsifier:** a `max-height` or `overflow` reaching `[data-slot="dialog-content"]` from `glass.css` / `placement.css` / the demo cascade, or a `scroll` default of `true` in a newer glass-ui. Probes: the `scroll: {…default: !1}` literal above; `Y`'s ternary is the *only* producer of `max-h`/`overflow-y` in the chunk. Not falsified. **Pixel confirmation is `UNPROVEN-NEEDS-LIVE`** (SS-13) — the *mechanism* is fully decidable from source, the exact clipped height is not.

---

# MAJORS

## D-4 · MAJOR · `DialogDescription` nested inside `DialogTitle`; `<h3>` inside `<h2>`; `DialogHeader` skipped

`KeyframesAddDialog.vue:24–31`

```
<DialogTitle>
    <CardTitle class="text-heading">Add keyframes</CardTitle>
    <DialogDescription class="text-subheading text-muted-foreground">
        Add keyframes to the animation
    </DialogDescription>
</DialogTitle>
```

Resolved tags:

| authored | renders as | source |
|---|---|---|
| `DialogTitle` | reka `DialogTitle` → **`<h2>`** | `reka-ui/dist/Dialog/DialogTitle.js:14–17` `as: { default: "h2" }` |
| `CardTitle` | **`<h3>`** | `card-Da665R8v.js` `props: { as: { default: "h3" } }` |
| `DialogDescription` | reka `DialogDescription` → **`<p>`** | `reka-ui/dist/Dialog/DialogDescription.js:17` `default: "p"` |

So the DOM is `<h2 id=title><h3>Add keyframes</h3><p id=desc>Add keyframes to the animation</p></h2>`. Three distinct defects in one construct:

1. **Content-model violation.** `<h2>` accepts phrasing content; `<p>` and `<h3>` are flow content. Heading-inside-heading is nonsense in the a11y tree.
2. **Accessible-name pollution.** reka's `DialogContentImpl` wires `aria-labelledby={titleId}` and `aria-describedby={descriptionId}`. Name computation walks the labelling node's subtree, so the dialog's accessible name becomes **"Add keyframes Add keyframes to the animation"**, and the description — a *descendant* of the labelling node — is then announced a second time via `aria-describedby`.
3. **`DialogHeader` skipped.** It exists in the same barrel and renders `flex flex-col gap-y-1.5 text-center sm:text-left` (`dialog-BKSTfmIQ.js`). The sibling `KeyboardShortcutsModal.vue:4–8` uses it correctly. Skipping it means the title/description pair gets `DialogContent`'s `gap-4` (1rem) between *siblings* — except they aren't siblings here, so they get no gap at all, only the `<h2>`'s `leading-none`.

`CSSPasteDialog.vue:11–12` — same repo, same idiom — puts them as **siblings**:

```
<DialogTitle class="text-subheading">{{ title }}</DialogTitle>
<DialogDescription class="text-body text-muted-foreground">{{ description }}</DialogDescription>
```

**Falsifier:** a glass-ui `DialogTitle` that overrides `as` to a non-heading, or a reka version whose `DialogContent` omits `aria-labelledby`. Neither holds at the installed versions (7.0.0 / 2.9.9).

## D-5 · MAJOR · typographic rung inversion — the description is typeset as a heading

`:25` `text-heading` on the title; `:27` `text-subheading` on the description.

Resolved from `glass-ui/dist/styles/typography/{scale,semantic}.css`:

| utility | font-size | weight |
|---|---|---|
| `text-heading` | `--type-heading: 1.618rem` (φ) | `--type-weight-heading: 700` |
| `text-subheading` | `--type-subheading: 1.272rem` (√φ) | **600** (literal in the `@utility` body) |
| `text-body` | `clamp(1rem, 0.92rem + 0.27vw, 1.375rem)` | 400 |
| `text-small` | `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` | 400 |

The dialog's *supporting sentence* renders at **1.272rem / 600** — a heading rung at semibold. glass-ui's own `DialogDescription` base is `text-sm text-muted-foreground`; the `cn` merge (`class-names-Cpy5eaBk.js` — `text-sm` and `text-subheading` both map to the `"font-size"` group, later wins) drops `text-sm` entirely, so the override is total, not additive.

Both in-tree comparators disagree:

- `CSSPasteDialog.vue:11–12` — title `text-subheading` (1.272/600), description `text-body` (1rem–1.375/400).
- `KeyboardShortcutsModal.vue:5–6` — title `text-body font-medium`, description `text-small text-muted-foreground`.

The Aristotelian reading: title-to-description here is 1.618 → 1.272, a single √φ step with only a 700→600 weight drop. A supporting line one √φ step and one weight notch from its own title is not subordinate — it is a co-headline. The demo's own `CSSPasteDialog` typesets the *whole pair* one rung lower and puts three weight notches between them (600 vs 400). Same information architecture, opposite typographic answer.

**Falsifier:** a demo-side override that re-binds `--type-subheading` or the `text-subheading` utility. `grep -rn "text-heading\|text-subheading\|text-small" demo/ --include="*.css"` → **no output**; the rungs come from glass-ui unmodified.

## D-6 · MAJOR · the success affordance fires on failure

`:133–136`

```
const onSubmit = () => {
    emit("submit", props.text);
    animateProgressBar();
};
```

`animateProgressBar()` is unconditional and synchronous with the emit. The consumer's handler is `addKeyframesStringToAnimation` (`KeyframesEditor.vue:79` → `useKeyframeOps.ts:155–191`), which wraps the parse in `withErrorToastAsync` (`useKeyframeOps.ts:25–40`): on throw it emits a toast and **leaves `kfControls.dialogOpen` true**, leaves the draft text intact, and returns.

So on a parse failure the user sees the rainbow bar sweep 0→100% — the component's only in-dialog completion signal — while nothing was added. The bar cannot be read as "work started", either: it always runs exactly 1000ms regardless of the async parse, and never reverses.

Compounding: there is **no in-dialog error surface at all** — no `aria-live` region, no `aria-invalid` on the editor, no error text. The failure is reported by a portalled `vue-sonner` toast that this very component has to defend against (`:17–22` `isInsideToaster`). A screen-reader user gets a toast; a sighted user gets a green-flavoured progress sweep and a toast that may sit outside their focus.

**Falsifier:** an `await`/`.then` chain that gates `animateProgressBar()` on submit success, or an error region rendered by the parent inside the dialog. `onSubmit` (`:133–136`) is three statements with no gate; `KeyframesEditor.vue:75–80` passes only `@submit`. Not falsified.

## D-7 · MAJOR · async submit with no busy state — the primitive ships `loading`/`aria-busy` and it is unused

`:42–46` renders `<Button type="submit" @click="onSubmit">`.

glass-ui `Button` (`button-B7c944jy.js`) declares:

```
loading: { type: Boolean, default: !1 },
…
m = r(() => p.loading || p.disabled === !0 || …)
v = r(() => ({ type: …, disabled: h.value ? m.value : void 0, "aria-disabled": … }))
…"data-loading": a.loading || void 0, "aria-busy": a.loading || void 0
```

The submit path is genuinely asynchronous — `useKeyframeOps.ts:159–162` `await parseAnimationCSS(keyframesString)` inside `withErrorToastAsync`. For the duration of the parse the button is fully enabled: repeated clicks re-enter `addKeyframesStringToAnimation` and append the same stops again (`animation.addFrame` in a loop at `:172–177`). Nothing debounces it.

The design defect: a busy state, a disabled state, and `aria-busy` are all one prop away and none of them is used. The component has *no* pending representation.

**Falsifier:** a `:disabled`/`:loading` binding anywhere on the Button, or an in-flight guard in `addKeyframesStringToAnimation`. Neither exists (`:42–46`; `useKeyframeOps.ts:155–191`).

## D-8 · MAJOR · `prefers-reduced-motion` is not honored — and here the engine cannot honor it for you

`:125–131`

```
const { CSSKeyframesAnimation } = await loadAnimationEngine();
new CSSKeyframesAnimation({ duration: 1000 }, progressBarEl.value)
    .fromVars([{ width: "0%" }, { width: "100%" }])
    .play();
```

The engine's PRM gate is **opt-in**. `src/animation/constants/types.ts:196–201`:

> `respectReducedMotion: boolean` — "When true, honor `prefers-reduced-motion: reduce` by snapping the `Animation`/`AnimationGroup` `play()` path to the final frame in a single paint… **Default false (consumers opt in).**"

No option is passed. Under `prefers-reduced-motion: reduce` this runs the full 1000ms rAF/WAAPI width sweep.

This is not delegable to CSS. `lane-frontend.md §6.5` records 13 PRM enforcement sites, ten of them `@media` blocks — none of which can reach an engine-driven inline `width` animation, and this file appears in none of them. `KeyframeTimeline.vue:94`'s "defer to glass-ui's `transitions.css`" strategy is likewise unavailable: glass-ui's PRM blocks govern CSS transitions, not this JS write path. `useSceneSwap.ts:29`'s documented "spring snap to terminal in one emit under PRM" shows the demo knows the correct move and applies it elsewhere.

The identical omission exists at `KeyframesEditor.vue:254–258`, so the fix is a pair — but the site in this file is this file's own.

**Falsifier:** a global default flip of `respectReducedMotion`, or a PRM guard inside `CSSKeyframesAnimation.play()` that ignores the flag. `src/animation/internal/reduced-motion.ts` is the shared gate and `types.ts:201` states the default explicitly as false. Not falsified.

## D-9 · MAJOR · 24 px tap target on the trigger, in a repo that owns a `.tap-floor` utility

`:6–13`

```
<button type="button" aria-label="Add keyframes"
  class="inline-flex items-center justify-center cursor-pointer scale-on-hover rounded-lg bg-transparent border-none p-0">
    <FilePlus2 class="stroke-2"></FilePlus2>
</button>
```

`p-0`, no `size-*`, no `tap-floor`. The only content is a `@lucide/vue` glyph at its 24 px default (no `icon-*` class — D-17). The hit box is therefore ~24×24 px.

`design-idioms.css:81–85` defines exactly the remedy, with the criterion in the comment:

```
/* .tap-floor — the WCAG 2.5.5 44px minimum touch-target floor (box only). */
.tap-floor { min-height: 44px; min-width: 44px; }
```

24×24 sits at the exact boundary of **2.5.8 Target Size (Minimum), AA** and fails **2.5.5 Target Size, AAA** — the standard the demo itself wrote down. The host toolbar is `h-10` (`KeyframesEditor.vue:68`), so a full 44 px floor needs a container decision too; that is a reason to design it, not a reason to ship 24.

**Falsifier:** a `[data-slot]`/`.scale-on-hover` rule that inflates the box, or a pseudo-element hit expander. `@utility scale-on-hover` is a transform-only lift (`design-idioms.css:40` documents it as "the lift magnitude"); no size rule found in `demo/styles/*.css` or the glass-ui utilities.

## D-10 · MAJOR · long lines escape the panel — the `<pre>` has no `overflow-x` and the hljs rule that would supply it never matches

`:37` `class="hljs css min-h-[25vh] p-2 … relative"` — no `overflow-x`, no `whitespace-*`. `<pre>` defaults to `white-space: pre` (no wrapping).

highlight.js's stylesheet does ship the fix, but for a selector that is never satisfied here (`github-dark.css:1–5`):

```
pre code.hljs { display: block; overflow-x: auto; padding: 1em }
```

The `hljs` class is on the **`<pre>`** (`:37`), not on the `<code>` (`:39`). And after the first highlight pass the `<code>` element ceases to exist at all: `useHighlightCSS.ts:120–125` does `el.innerHTML = h.value`, where `h.value` is hljs's span-only markup — the `<code>` wrapper is destroyed, not re-created. So `pre code.hljs` matches at no point in the component's life.

Meanwhile `DialogContent` is `w-full max-w-lg` (32 rem) with `overflow` unset (D-3). A single long declaration — a `cubic-bezier(…)` timing function, a multi-stop `transform` — renders as an unwrapped line that paints outside the glass panel, over the scrim.

**Falsifier:** any `overflow`/`white-space` rule reaching `pre`, `.hljs`, or `[contenteditable]`. Probes: `grep -rn "^\s*pre\b|\bpre\s*{|contenteditable|white-space" demo/styles/*.css` → no output; `grep -o "pre[ ,{][^{]*{[^}]*}" glass-ui/dist/styles/utilities/base{,‑misc}.css` → no output. Not falsified. **Exact spill geometry is `UNPROVEN-NEEDS-LIVE`.**

## D-11 · MAJOR · a 161-line re-authoring of an 80-line parameterized sibling — and it diverges on every shared decision

`CSSPasteDialog.vue` (80 lines, `demo/components/instrument/timeline/`) is a *generic, already-parameterized* paste-CSS dialog: `title`, `description`, `buttonLabel`, `buttonIcon`, `initialText`, `preClass` props, a `footer-extra` slot, `defineExpose({ textEl })`, the same `<pre contenteditable><code>{{ text }}</code></pre>` idiom, the same `isInsideToaster` guard, the same `Dialog`/`DialogContent`/`DialogTitle`/`DialogDescription`/`DialogFooter`/`Button` set.

`KeyframesAddDialog` re-authors that shell instead of consuming it, and every design decision it re-makes comes out differently:

| decision | `CSSPasteDialog` | `KeyframesAddDialog` | defect |
|---|---|---|---|
| title/description | siblings (`:11–12`) | nested (`:24–31`) | D-4 |
| description rung | `text-body` (`:12`) | `text-subheading` (`:27`) | D-5 |
| `DialogFooter` | unstyled — keeps glass's `sm:justify-end sm:gap-x-2` (`:19`) | `class="sticky bottom-0 class grid"` (`:41`) | D-12 |
| button/icon gap | `class="gap-2"` (`:22`) | none (`:42–46`) | D-16 |
| icon size | `class="icon-md"` (`:24`) | none (`:45`) | D-17 |
| `<pre>` surface | `bg-muted/50 border border-border` (`:54`) | `bg-transparent border-none` (`:37`) | D-13 |
| min height | `min-h-[20vh]` (`:54`) | `min-h-[25vh]` (`:37`) | D-15 |

The genuine deltas that justify *some* bespoke code are four: the `DialogTrigger`, syntax highlighting, Tab-insert, and Shift+Alt+F reformat. None of them requires re-deciding the footer layout, the type rungs, or the heading nesting. This is a **bespoke-vs-bespoke shadow** — a shape `lane-frontend.md §5` (S-1..S-8, all bespoke-vs-glass) does not cover. Filed as an addition to that census, not a contradiction of it.

**Falsifier:** a capability in `KeyframesAddDialog` that `CSSPasteDialog`'s `preClass` + `footer-extra` + `defineExpose({ textEl })` surface genuinely cannot host. Highlighting and keydown both need a handle on the `<pre>`; `defineExpose({ textEl })` (`:79`) provides it, and `useCodeHighlight` already takes an element-getter (`useHighlightCSS.ts:78–80`). *Partially* falsifiable on the `DialogTrigger` and the `@keydown` binding, which `CSSPasteDialog` does not expose — so the honest verdict is **"evaluate / harmonize"**, not "mechanical swap". The divergence table stands regardless of that verdict.

---

# MINORS

## D-12 · MINOR · the footer's class string contains a literal `class` token, and `grid` destroys glass-ui's footer layout

`:41` `<DialogFooter class="sticky bottom-0 class grid">`

Three problems in eleven characters:

1. **`class` is a stray token.** No stylesheet on disk defines `.class`. It is copy-paste rot that survives because the `cn` helper (`class-names-Cpy5eaBk.js`, function `a`) drops only tokens it can group and passes unrecognized ones through verbatim.
2. **`grid` defeats the primitive.** `DialogFooter`'s base is `flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2`. `cn`'s `"display"` group matches `/^(block|inline-block|inline|flex|inline-flex|grid|…)$/`, unscoped, last-wins — so `grid` survives and `flex` is dropped. What remains is a grid carrying `flex-col-reverse` and `sm:flex-row` (both inert on a grid) and `sm:gap-x-2` (a column gap on a single-column grid). The right-aligned action row glass-ui ships becomes a full-bleed stacked button.
3. **`sticky bottom-0` is inert** — there is no scrolling ancestor (D-3), and the panel is `position: fixed`.

`CSSPasteDialog.vue:19` uses `<DialogFooter>` bare and gets the intended layout.

**Falsifier:** a `.class` rule anywhere, or a `cn` implementation that is additive rather than last-wins. `grep -rn "^\.class\b" demo/styles/*.css glass-ui/dist/styles/*.css` → no output; the merge is last-wins by construction (`a()` records `n.set(key, index)` and marks the earlier index `false`).

## D-13 · MINOR · `bg-transparent` on the `<pre>` is dead — and its death is what keeps the code readable

`:37` sets `bg-transparent`. The runtime-injected hljs theme sets `.hljs { color: #c9d1d9; background: #0d1117 }` (dark) via a `<style id="highlightjs-theme">` appended to `document.head` at runtime (`useHighlightCSS.ts:94–105`). Unlayered author CSS beats any `@layer utilities` rule regardless of order, and appended-last beats earlier unlayered rules — `bg-transparent` loses on both readings.

So the editor is an **opaque #0d1117 slab punched into a translucent glass dialog** (`data-surface="glass"`, `--glass-bg-rung: var(--glass-bg-dialog)`).

The interesting part is the inversion: this is the *good* outcome. Computed from the tokens, `#c9d1d9` on `#0d1117` is **12.3 : 1** and the comment token `#8b949e` on `#0d1117` is **6.2 : 1** — both comfortably AA/AAA. Had `bg-transparent` won, hljs's fixed foregrounds would sit on an unknown, backdrop-dependent glass tint and **no contrast ratio would be decidable at all**. The file's stated intent is the contrast hazard; only the defeated class saves it.

Filed as MINOR because the rendered result is correct and the defect is the dead intent. `CSSPasteDialog.vue:54` states the honest version: `bg-muted/50`.

**Falsifier:** a demo build that emits `bg-transparent` unlayered, or an hljs theme without a `background` declaration. `github-dark.css` line 1 of `.hljs` sets `background: #0d1117`. **Computed-style confirmation is `UNPROVEN-NEEDS-LIVE`.**

## D-14 · MINOR · four unprefixed global class tokens, one of which is defined by nothing

`:37` `class="hljs css …"`, `:10` `scale-on-hover`, `:50` `progress-bar`.

- **`css`** — no rule defines `.css` in `demo/styles/*.css`, the glass-ui cascade, or the hljs themes. It reads as a language hint, but `useHighlightCSS.ts:122` passes the language explicitly (`hljs.highlight(el.innerText, { language: "css" })`), so nothing consumes it. A dead token occupying one of the most collision-prone class names imaginable.
- **`hljs`**, **`progress-bar`**, **`scale-on-hover`** — all live, all unprefixed, all global.

This is the class-selector arm of the hazard `lane-frontend.md §6.3` filed for custom properties ("**No `--kf-*` namespace exists** … demo tokens are unprefixed and therefore share a flat global namespace with glass-ui's"). **Contradiction/extension:** the lane measured `--kf-*` at 0 and stopped at custom properties. This component declares zero custom properties (so it is clean on the lane's metric) while applying four unnamespaced global classes — the same hazard, a surface the census did not enumerate.

**Falsifier:** a `.css` definition anywhere on disk. `grep -rn "^\.css\b|[ ,]\.css[ ,{]" demo/styles/*.css glass-ui/dist/styles/*.css highlight.js/styles/github*.css` → no output.

## D-15 · MINOR · `min-h-[25vh]` — `vh` where the repo owns a `dvh` idiom, and an arbitrary bracket where a token exists

`:37`. `design-idioms.css:48` declares `--panel-max-h: 60dvh` and documents it as the mobile-panel cap; `KeyboardShortcutsModal.vue:9` consumes it (`max-h-[var(--panel-max-h)]`). `vh` is the *large* viewport unit — on mobile it does not shrink when the browser chrome expands, so the editor's floor and the surrounding chrome disagree exactly when space is scarcest.

Compounding: `min-h` with no `max-h` is the vertical half of D-3.

*Honest scope:* `CSSPasteDialog.vue:54` has the same `vh` (`min-h-[20vh]`), so this is a two-site pattern.

**Falsifier:** a project decision to prefer `vh` for editor floors. `grep -rn "dvh" demo/` shows `dvh` in the panel/height idioms; no such written preference for `vh` found.

## D-16 · MINOR · no gap between the button label and its icon

`:45` — `>Add Keyframes<FileIcon></FileIcon\n></Button>`. The closing bracket is deliberately split across lines to suppress the whitespace text node, so label and glyph are adjacent with **zero** separation. glass-ui `Button`'s base is `button tap-squish focus-ring` plus glass classes — no `gap` in the merged string.

`CSSPasteDialog.vue:22` gets this right on the identical construction: `<Button class="gap-2" …>{{ buttonLabel }}<component … /></Button>`.

**Falsifier:** a `gap` in `[data-slot="button"]`'s CSS. `grep -o "gap:[^;]*;" glass-ui/dist/styles/utilities/btn.css` → no output at the base slot. **Rendered spacing is `UNPROVEN-NEEDS-LIVE`**; the absence of the declaration is not.

## D-17 · MINOR · icons unsized and un-hidden, against the demo's own `icon-*` family

`:12` `<FilePlus2 class="stroke-2">` and `:45` `<FileIcon>` carry no size class and no `aria-hidden`.

`design-idioms.css:92–119` defines `icon-{xs,sm,md,lg}` and its comment records the exact failure mode this repeats:

> "61 call-sites used to resolve to nothing, all computing at Lucide's default 24px."

Both icons here are two more such call-sites. `CSSPasteDialog.vue:24` uses `class="icon-md"`.

Separately, `:45`'s `FileIcon` sits inside a button that already has a text label — it is decorative and should be `aria-hidden="true"`; `:12`'s `FilePlus2` is the sole content of a button already named by `aria-label` (`:9`), so it too should be hidden to avoid a second name source. (`KeyframesEditor.vue:73` shows the demo applying `aria-hidden="true"` to a decorative Lucide glyph, so the idiom is known.)

**Falsifier:** `@lucide/vue` emitting `aria-hidden="true"` by default, or a global `svg` sizing rule. Neither found in the installed package's rendered attribute set or in the demo cascade.

## D-18 · MINOR · `bottom` is not a utility — a dead class on the progress bar

`:50` `class="progress-bar w-full bottom mt-2"`.

Tailwind ships `bottom-0`, `bottom-auto`, `bottom-1/2`, … — never bare `bottom`. No stylesheet on disk defines `.bottom`. The token is inert. Mirrored at `KeyframesEditor.vue:100` (`class="progress-bar sticky bottom mt-2"`), where it is at least adjacent to a `sticky` that would have wanted an inset — here there is no `sticky` at all, so even the intent is unrecoverable.

**Falsifier:** a `.bottom` rule. `grep -o "\.bottom{[^}]*}" glass-ui/dist/styles/ demo/styles/` and `grep -n "^\.bottom\b|[ ,]\.bottom[ ,{]" demo/styles/*.css` → both empty.

## D-19 · MINOR · `type="submit"` with no `<form>` anywhere in the tree

`:43`. glass-ui `Button` forwards `type` verbatim to the `<button>` (`button-B7c944jy.js`: `type: h.value ? p.type ?? "button" : void 0`). There is no `<form>` in the template and `DialogContent` renders a `<div>`. A submit button outside a form is inert: no implicit submission, no Enter-to-submit, no `formnovalidate` semantics — only a misleading type attribute.

Because there is no form, the Tab trap (D-2) has no Enter-key workaround.

**Falsifier:** an ancestor `<form>` in `KeyframesEditor.vue` — but `DialogContent` is portalled to `document.body` via `DialogPortal`, so no consumer-side ancestor can reach it.

## D-20 · MINOR · the progress bar rests at 100 %

`:48–51` `class="progress-bar w-full bottom mt-2"`. `.progress-bar` (`design-idioms.css:131–144`) is `@apply h-2 rounded-md` plus a six-stop rainbow `linear-gradient` — it declares **no width**. `w-full` therefore paints the full bar at rest, before any interaction; `animateProgressBar` then snaps it to `0%` and sweeps back to `100%`, where it stays.

A progress affordance that reads "complete" before the user has acted, and is indistinguishable at rest from its own terminal state, communicates nothing in either state.

**Falsifier:** a `width: 0` initial in `.progress-bar` or an inline style seeding it. `design-idioms.css:132–144` has no width declaration; nothing sets one before first play.

## D-21 · MINOR · no empty state

When `text === ""` — the state the component is *always* in after a successful submit (`useKeyframeOps.ts:185` `addKeyframesString.value = ""`) and on first open — the dialog presents a 25vh blank slab with no placeholder, no prompt, no example, and (per D-1) no accessible name to fall back on. `contenteditable` has no `placeholder`; nothing substitutes for it (no `:empty::before`, no ghost text).

The description that could carry the burden instead restates the title (D-22).

**Falsifier:** a `:empty::before` rule on `[contenteditable]` or `.hljs`. `grep -rn "contenteditable" demo/styles/*.css` → no output.

## D-22 · MINOR · prose — the description restates the title; capitalization disagrees with itself

`:25` "Add keyframes" · `:29` "Add keyframes to the animation" · `:45` "Add Keyframes".

- The description is a tautology of the title with a prepositional phrase attached. It spends the dialog's one explanatory slot on zero information — at a moment when the user genuinely needs to know *what shape of input is accepted* (a full `@keyframes { … }` block? bare `0% { … }` stops? does it merge or replace?). `useKeyframeOps.ts:161–177` shows it accepts a block whose `options` are applied via `setOptions` and whose stops are **appended** to the live animation — none of which the user can infer. The error copy that does arrive on failure is "Could not add keyframes" (`:188`), equally uninformative.
- "Add keyframes" (sentence case) and "Add Keyframes" (title case) in the same dialog, 20 lines apart. `KeyboardShortcutsModal.vue:5` is title case; `:6`'s description is sentence case with a `<kbd>` — a consistent house rule exists and this file straddles it.

Not trite or clichéd — just empty. Filed on the "prose quality" arm.

**Falsifier:** a copy standard mandating title-case buttons and sentence-case headings; the two comparators (`KeyboardShortcutsModal`, `CSSPasteDialog`) are consistent with each other and not with this file.

## D-23 · MINOR · three focus idioms in one toolbar; the reformat shortcut is undiscoverable

Two separate consistency defects, both anchored in this file:

**(a) Focus.** Across the four affordances the user touches: the trigger (`:10`) has neither `.focus-ring` nor a `focus-visible:*` (it keeps the UA outline by accident, since it does not set `outline-none`); the `<pre>` (`:37`) sets `outline-none` and supplies nothing (D-1); the footer `Button` gets glass-ui's `focus-ring` for free; and the toolbar sibling at `KeyframesEditor.vue:91` uses a third form, `focus-visible:ring-2 focus-visible:ring-accent`. `design-idioms.css:73–79` calls `.focus-ring` "the **SINGLE** keyboard-focus affordance". Three forms and one absence.

**(b) Discoverability.** `:138–147` binds Shift+Alt+F (and its macOS `Ï` dead-key twin) to reformat, via a window-level `useMagicKeys` listener. The demo has a shortcut registry — `registerShortcut` from `@mkbabb/glass-ui/keyboard`, 16 bindings across `EditorShell.vue:190` and `useControlsKeyboardShortcuts.ts:50–64`, each with `label` and `group` — feeding `KeyboardShortcutsModal.vue`'s `useRegisteredShortcuts()`. This binding bypasses it entirely, so it appears in no shortcut list, and the dialog itself gives no hint. The only record of it is a source comment (`:138`).

The binding does *fire* on both platforms: `useMagicKeys`'s proxy lowercases the queried key and `updateRefs` stores `e.key.toLowerCase()` and `e.code.toLowerCase()` (`@vueuse/core@14.3.0 dist/index.js`), so `keys["Shift"]&&keys["Alt"]&&keys["F"]` resolves on layouts where `e.key === "F"`, and `keys["Ï"]` catches macOS US where Option+Shift+F yields `Ï`. That is why this is a discoverability defect, not a dead-code one.

**Falsifier:** a `registerShortcut("Shift+Alt+F", …)` call, or a visible hint in the dialog. `grep -rn "registerShortcut" demo/` returns 16 registrations, none for reformat; the dialog template has no hint node.

---

# INFO

## D-24 · INFO · the `Ï` guard makes the character untypeable, and fires unmodified

`:112–115` unconditionally `preventDefault()`s `key === "Ï"` inside the editor, so `Ï` can never be typed into a CSS block (it is legal in a `content:` string or a custom-property name). And `:141`'s `|| keys["Ï"]` triggers reformat on the bare character, without requiring modifiers — on any layout where `Ï` is a direct keypress, typing it reformats the document. Narrow blast radius; filed for completeness on the i18n/input-coverage arm.

**Falsifier:** a layout survey showing `Ï` is never a direct key. Not conducted; the claim is conditional and marked so.

## D-25 · INFO · forced-colors is unhandled, and glass-ui's coverage does not reach here

`glass-ui/dist/styles/accessibility.css` contains exactly one `@media (forced-colors: active)` block, scoped to `[aria-current]`, `[aria-selected]`, `[aria-pressed]`, `[aria-checked]`, `[data-state=checked|on]`. None of this component's elements carry any of those attributes, so none is covered.

Under forced colors: the hljs syntax palette flattens (acceptable degradation — but the code loses all token differentiation with no fallback such as weight or style); the `.progress-bar` rainbow is a `background-image` and survives as the only chromatic element on the panel; the `border-none` `<pre>` (`:37`) has no boundary at all once backgrounds are forced, so the editor becomes visually indistinguishable from the dialog body.

**Falsifier:** a demo-side forced-colors block. `grep -rn "forced-colors" demo/` → no output. Rendering is `UNPROVEN-NEEDS-LIVE`.

## D-26 · INFO · RTL — logical in the file, physical one layer down

The file's own geometry is direction-safe (`mt-2`, `bottom-0`, `p-2`, flex/grid alignment). The one physical dependency arrives through `.progress-bar`, whose gradient is `linear-gradient(to right, …)` (`design-idioms.css:134`) and whose animation drives `width` from `0%` to `100%` (`:129`) — both anchored to the inline start regardless of direction. Under RTL the bar would fill left-to-right against the reading direction. Provenance is out-of-file, so this is INFO against `KeyframesAddDialog`, and a referral to whoever owns `design-idioms.css`.

**Falsifier:** the demo declaring itself LTR-only. No `dir` attribute or RTL policy found; also no RTL support anywhere, so the exposure is theoretical today.

## D-27 · INFO · two cross-axis referrals (not claimed on axis D)

Raised here only so they are not lost; they belong to the correctness/security axes.

1. **`innerHTML` from user text.** `useHighlightCSS.ts:108–113` `setHighlightingString` assigns its argument as **markup**. `KeyframesAddDialog.vue:103` calls it with `await props.format(props.text)` — formatted, but not escaped, user input straight out of the contenteditable. `highlight()` (`:120–125`) is safe by contrast because `hljs.highlight()` escapes. The doc comment ("Replace an element's markup with a pre-built highlighted string") describes a contract the caller does not satisfy.
2. **Vue-owned node clobbered out of band.** `:39` renders `<code>{{ text }}</code>`; `highlight()` then replaces the `<pre>`'s entire subtree via `innerHTML`, detaching the `<code>` element Vue's vnode still points at. Subsequent `text`-prop patches write to a detached node. It is benign in practice *only* because reka unmounts `DialogContent` on close, so every open rebuilds the subtree — a correctness property held by an unrelated primitive's default (`unmountOnHide`), not by design.

---

# SUPERLATIVES (L-18, running the other way)

## S-1 · the toast-guard boundary is exemplary

`:17–22` guards `@interact-outside` through `isInsideToaster` rather than reaching for `data-sonner-toaster` inline. `toastGuard.ts` is 8 lines of code under 20 lines of comment that names the coupling ("vue-sonner **private** DOM contract"), pins the version (`^2.0.9`), states why no public predicate exists, states the single-file blast radius, and states the exit criterion ("If vue-sonner ships a public 'is inside toast' predicate, adopt it here"). This is precisely how a necessary violation should be booked. `CSSPasteDialog.vue:4–9` consumes it identically — one idiom, one owner.

**Falsifier (runs both ways):** a second site reaching `[data-sonner-toaster]` directly would collapse the "single-sourced" claim. `grep -rn "data-sonner-toaster" demo/` → one file. Superlative survives.

## S-2 · `insertTabAtCursor` gets the selection ownership right

`contenteditable.ts:8–23` resolves the selection through `target.ownerDocument.defaultView.getSelection()` rather than the global `document`, with the reason in the docblock ("so it works inside iframes or any owning window — no global `document` reach"). It null-guards both the view and `rangeCount === 0`, and uses `target.ownerDocument.createTextNode` so the node belongs to the right document. This is the correct discipline for a utility that will be called from a portalled subtree — the single most common source of silent selection bugs in dialog-hosted editors.

**Falsifier:** a global `document.getSelection()` elsewhere in the same call path. `KeyframesAddDialog.vue:106` uses `window.getSelection()?.collapseToEnd()` — a **partial** falsifier: the reformat path *does* reach the global window, undoing S-2's guarantee for that one call. The superlative is therefore awarded to `contenteditable.ts`, and `:106` is noted as the seam where the component fails to live up to its own utility. Honest split.

## S-3 · the highlight surface is scoped by explicit ownership

`:92–94` `useCodeHighlight(() => [addKeyframesEl.value])` hands the driver exactly one element — its own. `useHighlightCSS.ts:68–77` records why this shape exists: "highlights ONLY the elements the caller hands it via `getOwnedElements` — never the whole document (D.W3.S1: the global `document.querySelectorAll("pre")` was the bug)". The component honors the contract without leakage: the getter closes over a single `useTemplateRef`, so when the portalled content unmounts the ref nulls and the driver's owned set empties on its own. The shared `#highlightjs-theme` `<style>` is likewise de-duplicated by id and removed on unmount (`:94–105`, `:142–145`).

**Falsifier:** a `document.querySelectorAll` or unscoped selector in this file's highlight path. None; `highlightAll(el?)` takes an optional explicit element and the owned list, nothing more.

## S-4 · the icon-only trigger is correctly named

`:9` `aria-label="Add keyframes"` on a button whose only content is a glyph. This is the one a11y decision in the file that is right, and it is right for the right reason — an icon-only control with no text node needs an author-supplied name. The sharpness of the contrast is the point: the button that merely *opens* the editor is named; the editor itself is not (D-1).

**Falsifier:** the label being redundant with visible text (there is none) or duplicating the dialog title in a way that confuses (`aria-label` "Add keyframes" names the *trigger*; `DialogTitle` names the *dialog* — distinct nodes, no conflict). Superlative survives.

---

## Provenance

Every line reference is to the working tree at `/Users/mkbabb/Programming/keyframes.js` as read on 2026-08-05; glass-ui claims are read from the **installed** `node_modules/@mkbabb/glass-ui@7.0.0/dist/`, reka claims from `node_modules/reka-ui@2.9.9/dist/`, VueUse from `node_modules/@vueuse/core@14.3.0/dist/index.js`, highlight.js themes from `node_modules/highlight.js/styles/`. No file in `keyframes.js` — or in any other repo — was written, mutated, installed, or executed. No browser, no dev server, no Playwright, no DevTools. This challenge file is the sole write.

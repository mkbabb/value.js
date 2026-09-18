claude-opus-5[1m]

# CHALLENGE · `KeyframesAddDialog.vue` · axis **C — CONSUMPTION**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/components/KeyframesAddDialog.vue` (161 L)
**Axis** how this component consumes **keyframes.js** (the library under test) and **@mkbabb/glass-ui** (the design system): subpath choice, shadow primitives, value.js transitive exposure, props/emits contract, sibling seams.
**Mode** static, read-only. Zero writes to any product tree; zero installs; zero dev servers; **no browser tooling** (per lane law). Live-only claims are marked `UNPROVEN-NEEDS-LIVE`.
**Substrate** keyframes.js `master`, demo tree as installed; glass-ui **7.0.0** in `node_modules`; `@mkbabb/value.js` **4.0.0**.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise — but every claim below carries its own falsifier, and §5 records the five candidate defects I killed with those falsifiers.

**Files read whole (the import closure):**

| file | why |
|---|---|
| `components/instrument/keyframes/components/KeyframesAddDialog.vue` | target |
| `components/instrument/keyframes/composables/useHighlightCSS.ts` | `useCodeHighlight` |
| `components/instrument/keyframes/utils/contenteditable.ts` | `insertTabAtCursor` |
| `components/instrument/utils/toastGuard.ts` | `isInsideToaster` |
| `components/instrument/keyframes/KeyframesEditor.vue` | the sole parent |
| `composables/useKeyframesEditor.ts` · `useKeyframesParsing.ts` · `useKeyframeOps.ts` · `useKeyframesState.ts` | what the `text`/`format`/`submit` props actually bind to |
| `composables/useToolbarKeyboard.ts` | the trigger's sibling seam |
| `utils/parseAnimationCSS.ts` · `utils/formatEditorCSS.ts` | the value.js + prettier edges |
| `state/hashSharing.ts` · `state/controlOptionsStore.ts` · `app/scene/router.ts` | the provenance of `props.text` |
| `components/instrument/timeline/CSSPasteDialog.vue` · `shell/KeyboardShortcutsModal.vue` | the two sibling dialogs (the house idiom) |
| `demo/kf-engine.ts` · `src/animation/load-engine.ts` | the engine-access contract |
| glass-ui 7.0.0 `dist/`: `dialog-BKSTfmIQ.js`, `card-Da665R8v.js`, `keyboard.js`, `components/button/Button.vue.d.ts`, `composables/keyboard/useKeyboardShortcuts.d.ts`, `styles/utilities/btn.css` | the primitives it did and did not reach |
| `node_modules/reka-ui/src/Dialog/{DialogTitle,DialogDescription,DialogContentImpl}.vue` | what glass's Dialog actually renders |

**Hitherto corpus folded** — `formation/keyframes/lane-frontend.md` (F-1 phantom dep; shadow census S-1..S-8; §3.1 subpath utilisation) and `lane-library.md` (§4.1 Tier-A parse seams A2/A13; §4.6 the R1 demo blast radius). Overlaps are cited by id. One explicit **extension**: lane-frontend's census enumerated *component* shadows only; this component's dominant shadow is a **composable/registry** shadow (C-3), so I open **S-9** and **S-10** rather than re-using an existing id.

---

## 0. Headline

| # | finding | severity |
|---|---|---|
| **C-1** | Sole consumer, repo-wide, of `useCodeHighlight`'s raw-string `innerHTML` sink — and `props.text` is settable from a `?state=` share URL. | **BLOCKER** |
| C-2 | `DialogTitle` abused as a layout box: renders `<h3>` and `<p>` **inside** an `<h2>`, and the dialog's `aria-labelledby` swallows the description. `DialogHeader` is installed, exported, and used correctly by a sibling. | MAJOR |
| C-3 | **S-9** — the Shift+Alt+F shortcut shadows glass-ui `/keyboard`. Sole `useMagicKeys` site in a 206-file demo; invisible to the app's own shortcuts modal; layout-dependent. | MAJOR |
| C-4 | `reformat()` swallows a throwing `props.format` — an unhandled rejection where every sibling op routes through `withErrorToastAsync` + Retry. | MAJOR |
| C-5 | The `format` prop's JSDoc declares a pure formatter; the wired implementation mutates the parent's model. `reformat()` never emits `update:text`. | MAJOR |
| C-6 | Hand-rolled `open` v-model + wholesale duplication of `CSSPasteDialog.vue`, which is already the generic, parameterized version of this dialog. | MAJOR |
| C-7 | `highlightAll()` on every keydown re-installs the entire hljs theme stylesheet while highlighting nothing. | MINOR |
| C-8 | The reformat path works only because `setHighlightingString`'s marker is the **falsy** `""`. | MINOR |
| C-9 | Two `useCodeHighlight` instances in one subtree share `#highlightjs-theme`; the first to unmount removes it. | MINOR |
| C-10 | **S-10** — hand-rolled `<button>` trigger shadows glass `Button` `iconOnly`, in a file that already imports `Button`. | MINOR |
| C-11 | Two dead class tokens in the template (`class`, `bottom`). | MINOR |
| C-12 | `animateProgressBar` duplicated from the parent verbatim, on a *different* engine-access idiom, as a floating uncaught promise, driving a second redundant progress bar. | MINOR |
| C-13 | `reformat()` reaches global `window.getSelection()` — precisely what the util it imports exists to avoid. | INFO |
| C-14 | `preventDefault` on `"Ï"` makes that character untypeable in a CSS editor. | INFO |
| C-15 | Four icons in one toolbar cohort, four different sizing conventions. | INFO |

**Superlatives** — SUP-1..SUP-4 in §4. **Killed claims** — K-1..K-5 in §5.

---

## 1. BLOCKER

### C-1 · The component is the sole activator of an unsafe `innerHTML` sink, and its `text` prop is attacker-reachable

**Severity BLOCKER.**

`useHighlightCSS.ts:107-113` exposes two writers. One is safe, one is not:

```ts
108:    const setHighlightingString = (el: HTMLElement | null, s: string) => {
109:        if (el) {
110:            el.setAttribute("highlighted", "");
111:            el.innerHTML = s;          // ← RAW string, not escaped, not highlighted
112:        }
113:    };
...
122:            const h = hljs.highlight(el.innerText, { language: "css" });
123:            el.innerHTML = h.value;    // ← highlight.js escapes its output
```

`highlight()` (`:123`) writes highlight.js's own output, which is HTML-escaped — safe. `setHighlightingString` (`:111`) writes whatever the caller hands it.

**This component is the only caller in the repository.**

```
$ grep -rn "setHighlightingString" --include="*.vue" --include="*.ts" demo/
useHighlightCSS.ts:70   (prose)
useHighlightCSS.ts:108  (definition)
useHighlightCSS.ts:147  (export)
KeyframesAddDialog.vue:92    (destructure)
KeyframesAddDialog.vue:103   (THE ONLY CALL)
```

The argument at `KeyframesAddDialog.vue:100-107` is user text run through prettier:

```ts
100: const reformat = async () => {
101:     const formatted = await props.format(props.text);
103:     setHighlightingString(addKeyframesEl.value, formatted);
```

`props.format` is bound to `useKeyframeOps.ts:146` `updateAddKeyframesString`, which is `formatEditorCSS` → `prettier.format(css, { parser: "scss" })` (`demo/utils/formatEditorCSS.ts:11-14`). Prettier **preserves string literals verbatim**, so a payload that is *valid SCSS* survives formatting intact:

```css
a { content: "<img src=x onerror=alert(document.domain)>"; }
```

…lands at `el.innerHTML = …` and the browser instantiates a real `<img>` with a live `onerror`.

**And `props.text` is not merely self-supplied.** The full provenance chain, each link verified:

| # | link | provenance |
|---|---|---|
| 1 | `?state=<base64>` is read on first navigation | `app/scene/router.ts:47-50` — `restoreStateFromParam(to.query.state)` |
| 2 | decode is `atob` + `JSON.parse`, validation is shape-only | `state/hashSharing.ts:13-18`, `:31-44` (`isValidState` checks object-ness and nothing else) |
| 3 | `controls` are `Object.assign`ed wholesale — **no key whitelist, no value sanitation** | `state/controlOptionsStore.ts:59-64` |
| 4 | `keyframeControls.addKeyframes` **and** `keyframeControls.dialogOpen` are both in that bucket | `state/controlOptionsStore.ts:19-24`, `:38-43` |
| 5 | `addKeyframesString` is seeded from it | `composables/useKeyframesState.ts:24` — `ref(kfControls.addKeyframes)` |
| 6 | the parent binds both into this component | `KeyframesEditor.vue:75-80` — `v-model:open="kfControls.dialogOpen"` `v-model:text="addKeyframesString"` |
| 7 | the sink fires | `KeyframesAddDialog.vue:103` |

So a crafted share link opens this dialog, pre-filled with the payload, on page load. Rendering it is safe (`<code>{{ text }}</code>` is a text interpolation). **The gate is one keystroke** — Shift+Alt+F / Option+Shift+F — after which the payload is written as HTML. That is a stored-XSS shape with a one-gesture trigger, on a component whose entire purpose is to invite the user to press exactly that key (`:138` documents it as the affordance).

The remediation is one line inside the composable — highlight the string instead of injecting it (`hljs.highlight(s, {language:"css"}).value`), which is what the *other* writer already does — but the finding sits on this component because it is the only site that reaches the unsafe branch.

**Falsifier.** Any one of these kills it: (a) `applySharedControlState` gains a key whitelist or escapes strings; (b) `formatEditorCSS`/prettier HTML-escapes its output or throws on the payload class *(it does not — the payload is valid SCSS; see K-1's method)*; (c) a CSP with no `unsafe-inline`/no inline-event-handler execution is served for the gh-pages demo — I did not inspect deploy headers, so **the CSP leg is `UNPROVEN-NEEDS-LIVE`**; (d) `setHighlightingString` is shown to be unreachable because `props.format` cannot return attacker text. I tested (d) and it fails: the chain above is complete and every link is a code citation.

---

## 2. MAJOR

### C-2 · `DialogTitle` is used as a layout container — invalid heading content model, polluted accessible name

**Severity MAJOR.** `KeyframesAddDialog.vue:24-31`:

```vue
24: <DialogTitle>
25:     <CardTitle class="text-heading">Add keyframes</CardTitle>
26:     <DialogDescription class="text-subheading text-muted-foreground">
29:         Add keyframes to the animation
30:     </DialogDescription>
31: </DialogTitle>
```

What that renders, sourced from the installed 7.0.0 and its reka dependency:

- glass `DialogTitle` forwards to reka `DialogTitle` (`dist/dialog-BKSTfmIQ.js:@2637`, importing `DialogTitle as A` from `reka-ui` at `:@775`), whose default element is **`h2`** — `node_modules/reka-ui/src/Dialog/DialogTitle.vue:12` `withDefaults(defineProps<DialogTitleProps>(), { as: 'h2' })`.
- glass `DialogDescription` forwards to reka `DialogDescription` (`dialog-BKSTfmIQ.js:@3109`), default **`p`** — `reka-ui/src/Dialog/DialogDescription.vue:12`.
- glass `CardTitle` defaults `as: "h3"` — `dist/card-Da665R8v.js`, `props: { as: { default: "h3" } }`.

So the DOM is `<h2><h3>…</h3><p>…</p></h2>`.

Two distinct defects:

1. **Invalid content model.** `h2` accepts *phrasing* content; `h3` and `p` are flow content. Vue constructs these nodes via the DOM API, so the invalid nesting persists (an HTML *parser* would have force-closed the `h2`). Heading semantics are broken: two headings for one title, and a heading-level jump inside a heading.
2. **Polluted accessible name.** reka wires `aria-labelledby` to the title id and `aria-describedby` to the description id: `reka-ui/src/Dialog/DialogContentImpl.vue:88-89`. Because the description is a *descendant* of the title, accname computation over the `aria-labelledby` target's subtree includes the description text. The dialog's accessible name becomes "Add keyframes Add keyframes to the animation", and the description is then announced a second time via `aria-describedby`.

**The correct primitive is installed, exported, and already used correctly two directories away.** `DialogHeader` is in the same root barrel this file already imports from, and renders exactly the container being faked — `dialog-BKSTfmIQ.js:@2328`: `("div", { class: "flex flex-col gap-y-1.5 text-center sm:text-left" })`. The house exemplar is `components/instrument/shell/KeyboardShortcutsModal.vue:4-8`:

```vue
<DialogHeader>
    <DialogTitle class="text-body font-medium">Keyboard Shortcuts</DialogTitle>
    <DialogDescription class="text-small text-muted-foreground">…</DialogDescription>
</DialogHeader>
```

The other sibling, `CSSPasteDialog.vue:11-12`, also keeps them as siblings. **This file is the only one of the three that nests them.**

Secondary: `CardTitle` is a *card-family* primitive borrowed into a *dialog* purely for the `text-heading` type ramp — but `text-heading` is a standalone glass utility (`dist/styles/typography/semantic.css`), reachable without dragging `<h3 data-slot="card-title" class="card-title">` and its card-scoped rule into a dialog surface.

**Falsifier.** Show that glass's `DialogTitle` overrides reka's `as` default to a non-heading, or that `CardTitle` is invoked with an `as` that yields phrasing content, or that reka's `DialogContentImpl` points `aria-labelledby` somewhere other than the title id. All three were probed and all three hold as stated.

---

### C-3 · **S-9** — the reformat shortcut shadows glass-ui `/keyboard`

**Severity MAJOR.** `KeyframesAddDialog.vue:138-147`:

```ts
139: const keys = useMagicKeys({ reactive: true });
140: watch(
141:     () => (keys["Shift"] && keys["Alt"] && keys["F"]) || keys["Ï"],
142:     (v) => { if (v && props.open) { reformat(); } },
143: );
```

The demo has a **house-wide shortcut registry**, consumed from glass-ui, with a written law:

```
components/instrument/transport/AnimationControlsGroup/useControlsKeyboardShortcuts.ts:30
  * Every binding routes through the ONE existing glass-ui `registerShortcut`
:50-71  — 19 registrations, each with { label, group }
components/instrument/shell/EditorShell.vue:190 — registerShortcut("?", …, { label: "Show shortcuts", group: "General" })
```

…and a discoverability surface fed by it — `KeyboardShortcutsModal.vue:48-51` imports `useRegisteredShortcuts` + `formatComboParts` from `@mkbabb/glass-ui/keyboard` and renders every registered combo, grouped.

**This is the only `useMagicKeys` call site in the entire 206-file demo** (`grep -rn "useMagicKeys" demo/` → 2 hits, both in this file: `:59` import, `:139` call). It pulls a second, competing global keyboard mechanism into the tree for one shortcut.

Consequences, each provable:

1. **The shortcut is undiscoverable.** It never enters the registry, so it cannot appear in the app's own shortcuts modal. The dialog's only hint is the source comment at `:138`.
2. **glass-ui already shipped the option this needed.** `dist/composables/keyboard/useKeyboardShortcuts.d.ts:3-14`:
   `allowInInput?: boolean;` — *"Fire even when focus is in input/textarea/**contenteditable**. Default: false"*. The registry's input guard (`keyboard.js`, function `f`) explicitly tests `e.isContentEditable`. A contenteditable-scoped shortcut is precisely the case the registry was built for.
3. **The binding is keyboard-layout-dependent; the registry's is not.** vueuse's `useMagicKeys` populates its key set from `[e.code.toLowerCase(), e.key.toLowerCase()]` (`@vueuse/core/dist/index.iife.js`, `updateRefs`), and its proxy lowercases the lookup. On macOS, Option+Shift+F delivers `e.key === "Ï"`, `e.code === "KeyF"` — so **`keys["F"]` is false on macOS** and `keys["Ï"]` is false on Windows/Linux. Each disjunct covers exactly one platform, and the macOS disjunct is a hardcoded **US-layout** literal: on a layout where Option+Shift+F is not `Ï`, the shortcut silently does not exist. glass's matcher falls back to `e.code` — `keyboard.js`, function `d`: `… || e.code.toLowerCase() === a` — so `registerShortcut("Shift+Alt+KeyF", …)` matches layout-independently.
4. **No teardown ownership.** `registerShortcut` returns a disposer (`useKeyboardShortcuts.d.ts:32`). `useMagicKeys` binds `keydown`/`keyup`/`blur`/`focus` on `window` for the component's whole life, dialog open or closed.

The one-line replacement is exact:

```ts
registerShortcut("Shift+Alt+KeyF", reformat,
    { allowInInput: true, label: "Format keyframes", group: "Actions" });
```

This is a shadow of the same species as lane-frontend **S-1** (bespoke reimplementation of an available glass primitive) and **S-2** (adopting a glass contract while rejecting its mechanism) — but of a *composable/registry*, not a component, which is why lane-frontend's §5 census does not carry it. Opened here as **S-9**.

**Falsifier.** Show `registerShortcut` cannot express an Alt-bearing combo (its parser handles `alt`/`option` explicitly, `keyboard.js` function `c`), or cannot fire inside a contenteditable (`allowInInput` exists for that), or that `useRegisteredShortcuts` is not what feeds the modal (it is — `KeyboardShortcutsModal.vue:55`). The *ergonomics* of `"Shift+Alt+KeyF"` vs `"Shift+Alt+F"` is a legitimate counter-argument to the exact combo string, **not** to the shadow.

---

### C-4 · `reformat()` drops a rejection the whole file's neighbourhood is disciplined about

**Severity MAJOR.** `KeyframesAddDialog.vue:100-107`:

```ts
const reformat = async () => {
    const formatted = await props.format(props.text);   // ← can reject
    setHighlightingString(addKeyframesEl.value, formatted);
    highlightAll();
    window.getSelection()?.collapseToEnd();
};
```

Called from the watch at `:145` with no `.catch`, no `try`, and no `void` marker.

`props.format` resolves to `formatEditorCSS` → `prettier.format(css, { parser: "scss" })`. **Prettier throws on malformed input** — and the entire premise of this dialog is a free-text CSS box the user is mid-typing in, i.e. malformed most of the time it is open. On a throw: no reformat, no visual change, no message, and an unhandled promise rejection in the console.

The contrast is inside this component's own composable stack. `useKeyframeOps.ts:25-40` defines `withErrorToastAsync` — *"Run `fn`; on throw, surface a toast with a Retry action and re-log"* — and it wraps every other op: `updateAnimationFromKeyframesString` (`:97`), `updateAnimationFromKeyframeString` (`:113`), and the very handler this dialog's `@submit` lands in, `addKeyframesStringToAnimation` (`:159`), each with a `Retry` action. **The reformat path is the one authoring op in the editor with no error surface at all.**

**Falsifier.** Show `formatEditorCSS` cannot reject — it is a bare `return prettier.format(...)` with no catch (`utils/formatEditorCSS.ts:11-14`) — or show a global `unhandledrejection` handler that toasts. `grep -rn "unhandledrejection" demo/` returns nothing.

---

### C-5 · The `format` prop's declared contract contradicts its wiring, and `reformat()` never emits

**Severity MAJOR.** The declaration, `KeyframesAddDialog.vue:79-80`:

```ts
/** Formats the raw string; returns the formatted result for re-highlight. */
format: (raw: string) => Promise<string>;
```

A pure `string → Promise<string>`. What is actually passed (`KeyframesEditor.vue:78` → `useKeyframeOps.ts:146-153`):

```ts
const updateAddKeyframesString = async (keyframesString: string) => {
    const formatted = await formatEditorCSS(keyframesString, getFormatWidth());
    kfControls.addKeyframes = formatted;       // ← mutates persisted store
    addKeyframesString.value = formatted;      // ← mutates the parent's v-model source
    return formatted;
};
```

It is the parent's **model mutator**, wearing a pure formatter's type. Two consequences:

1. **The emit contract has a hole exactly where the JSDoc invites one.** The component declares `(e: "update:text", value: string)` at `:85` and honours it from `onInput` (`:96-98`) — but `reformat()` never emits it. The formatted text reaches the parent *only* via `props.format`'s hidden side effect. A future parent that supplies a genuinely pure formatter — which the JSDoc explicitly sanctions — silently desyncs: the DOM shows formatted CSS, `props.text` still holds the unformatted string, and `onSubmit` (`:133-136`) emits `props.text`, submitting the stale value.
2. **It is a v-model in disguise.** A `format` prop that writes `v-model:text`'s backing ref is a second, undeclared write channel running parallel to the declared one.

Correct shape: `const formatted = await props.format(props.text); emit("update:text", formatted);` with `format` genuinely pure.

**Falsifier.** Show `reformat()` does emit `update:text` (it does not — `:100-107` contains one `emit` call total in the file's reformat path: zero), or show the JSDoc documents the mutation (it does not — it says "returns the formatted result for re-highlight"), or show no other parent can exist (the prop is a public contract; the component is generic over it by construction).

---

### C-6 · Bespoke `open` plumbing + wholesale duplication of the generic sibling dialog

**Severity MAJOR.** Two halves.

**(a) The v-model idiom.** `:76-87` hand-rolls it:

```ts
const props = defineProps<{ open: boolean; … }>();
const emit  = defineEmits<{ (e: "update:open", value: boolean): void; … }>();
```
```vue
3:  :open="open"
4:  @update:open="(value) => emit('update:open', value)"
```

The house uses `defineModel`, in six places including **both** sibling dialogs:

```
components/instrument/timeline/CSSPasteDialog.vue:58      defineModel<boolean>("open", { required: true })
components/instrument/shell/KeyboardShortcutsModal.vue:53  defineModel<boolean>('open', { required: true })
app/dock/MbabbMenu.vue:96 · components/instrument/keyframes/CSSCodeEditor.vue:95 · scenes/cube/CubeTarget.vue:124 · scenes/cube/orbital-drag/OrbitalDrag.vue:43
```

Both siblings then write `<Dialog v-model:open="…">` directly; this file re-emits by hand through an inline arrow.

**(b) The whole dialog is a fork of `CSSPasteDialog.vue`.** Compare, side by side:

| concern | `CSSPasteDialog.vue` | `KeyframesAddDialog.vue` |
|---|---|---|
| toaster guard | `:4-9`, inline arrow | `:17-22`, **byte-identical inline arrow** |
| editable surface | `:13-18` `<pre ref @input :class contenteditable><code>{{ text }}</code></pre>` | `:33-39` same shape |
| title/description | `:11-12` siblings | `:24-31` nested (C-2) |
| footer | `:19-25` `DialogFooter` + `Button` + icon | `:41-52` same |
| open model | `defineModel` | hand-rolled (a) |
| parameterisation | `title` `description` `buttonLabel` `buttonIcon` `initialText` `preClass` + `footer-extra` slot + `defineExpose({textEl})` | none — everything inlined |

`CSSPasteDialog` is already the *generic* form and is already consumed twice (`KeyframeTimeline.vue:135`, `:145`). The honest divergence is small and nameable: this dialog adds syntax highlighting, a reformat shortcut, and a progress bar. Those are a `#surface` slot and one prop away.

I am **not** claiming a mechanical swap — `CSSPasteDialog` owns its own `text` ref (`:59`) while this one is a controlled component, and reconciling that is design work. The claim is that two near-identical CSS-paste dialogs, one generic and one not, is a consumption defect on the sibling-seam sub-axis, and that at minimum the toaster-guard wiring should be shared (the *predicate* is centralized — SUP-1 — the *wiring* is copy-pasted).

**Falsifier.** Show `CSSPasteDialog` post-dates this file and the duplication is unresolved-by-schedule rather than by omission (a `git log --follow` on both would settle it; I did not run it — **this leg is `UNPROVEN`**), or show a slot/prop shape that cannot express the highlight surface. The `defineModel` half (a) has no such defence: it is a straight deviation from a six-site house idiom that both sibling dialogs follow.

---

## 3. MINOR / INFO

### C-7 · `highlightAll()` per keystroke: highlights nothing, reinstalls the theme every time — MINOR

`:109-123` calls `highlightAll()` on **every** keydown in the editable `<pre>`. Trace it through `useHighlightCSS.ts:132-138`:

```ts
const highlightAll = (el?: HTMLElement) => {
    ensureThemeStyle();      // ← always
    highlight(el);
    for (const owned of getOwnedElements()) highlight(owned);
};
```

`highlight()` is idempotent by marker (`:117` `if (!el || el.getAttribute("highlighted")) return;`), and the element is marked on first mount (`:150-160`). **So after the first highlight, the highlighting half of every keydown call is a guaranteed no-op** — the visible consequence being that the editable surface never re-highlights as you type, which is the opposite of what `onKeyDown`'s call implies.

What is *not* a no-op is `ensureThemeStyle()` (`:94-105`): a `document.head.querySelector` plus `setCodeTheme()`, which awaits the highlighter boot and then unconditionally assigns `themeStyle.value.textContent = isDark ? githubDark : githubLight` — a full github-dark/github.css payload written into a `<style>` in `document.head`, per keystroke. Replacing a `<style>`'s text content forces a stylesheet reparse and a document-wide style invalidation.

The magnitude of the recalc is `UNPROVEN-NEEDS-LIVE` (no browser tooling permitted); the code path is provable statically.

**Falsifier.** Show `setCodeTheme` early-returns on unchanged content — it does not (`:84-92`, unconditional assignment) — or that `onKeyDown` needs `highlightAll` for a case the marker does not cover. The marker is cleared nowhere: `grep -n "highlighted" useHighlightCSS.ts` → `:111, :117, :121, :124`, all sets or reads.

### C-8 · The reformat path is load-bearing on a *falsy* attribute value — MINOR

`setHighlightingString` marks with `""` (`:110`); `highlight` marks with `"true"` (`:124`); the guard is truthiness (`:117`, `:121`). `""` is falsy, so `reformat()`'s `setHighlightingString(…)` → `highlightAll()` sequence (`:103-104`) re-highlights *only because the marker it just set does not count as set*. Normalising `""` → `"true"` — an obvious tidy-up — silently converts reformat into "inject raw text, never colourise".

**Falsifier.** Show `setHighlightingString` is intended as a terminal write with no re-highlight (then `:104`'s `highlightAll()` is dead code, which is its own defect), or that some other call clears the marker between `:103` and `:104` (nothing does).

### C-9 · Shared `#highlightjs-theme` singleton, per-instance teardown — MINOR

`useCodeHighlight` resolves `#highlightjs-theme` from `document.head` if present (`:95-97`) and unconditionally `remove()`s it on unmount (`:142-145`). Two instances live in this one subtree — `KeyframesEditor.vue:176` and `KeyframesAddDialog.vue:92` — and `KeyframesEditor` is itself mounted from at least two sites (`scenes/spring/SpringPhysicsFacet.vue:119`, plus the async barrel `components/instrument/keyframes/index.ts:7`). Whichever instance unmounts first deletes the theme every surviving instance is still rendering against.

It self-heals: the next `highlightAll()` re-runs `ensureThemeStyle()`, whose `querySelector` misses and recreates. So the observable is a transient flash of unthemed code, not a permanent break — hence MINOR, not MAJOR.

**Falsifier.** Show two `useCodeHighlight` instances can never have disjoint lifetimes (they can: one editor unmounting on a scene/facet switch while another is live), or show `onUnmounted` refcounts (it does not).

### C-10 · **S-10** — the trigger hand-rolls what glass `Button` ships — MINOR

`:6-14`:

```vue
<DialogTrigger as-child>
    <button type="button" aria-label="Add keyframes"
        class="inline-flex items-center justify-center cursor-pointer scale-on-hover rounded-lg bg-transparent border-none p-0">
        <FilePlus2 class="stroke-2" />
    </button>
</DialogTrigger>
```

Eight utility classes reconstructing an icon-only quiet button — in a file that **already imports glass `Button`** for the submit at `:61`. The primitive has the exact axis: `dist/components/button/Button.vue.d.ts:6-19` — `emphasis?: "primary"|"secondary"|"quiet"|"text"`, and **`iconOnly?: boolean` — *"Square geometry for an accessibly named icon command."*** `<Button emphasis="text" iconOnly aria-label="Add keyframes">` is the intended expression.

This is the same species as lane-frontend **S-7** (*"no copy-specific primitive exists … the shell should be glass `Button`"*, for `CopyButton.vue`), applied to a sibling in the same toolbar. Opened as **S-10** to keep S-7's scope honest.

**Falsifier.** Show `Button` with `emphasis="text" iconOnly` cannot render transparent/borderless at the toolbar's size, or that `DialogTrigger as-child` cannot forward onto a glass `Button` (it can: `Button` extends reka `PrimitiveProps`, so it accepts `asChild`/`as` and forwards attrs). **The visual-equivalence leg is `UNPROVEN-NEEDS-LIVE`.**

### C-11 · Two dead class tokens — MINOR

`:41` — `class="sticky bottom-0 class grid"`. The literal token **`class`** is not a Tailwind utility and not a rule anywhere: `grep -rn "^\s*\.class\b" demo/styles/*.css glass-ui/dist/styles/*.css` → no match. A copy-paste remnant.

`:50` — `class="progress-bar w-full bottom mt-2"`. Bare **`bottom`** is not a Tailwind utility (`bottom-0`, `bottom-auto`, … are) and the only `.bottom` rule in the tree is scoped to a different component (`scenes/cube/CubeTarget.css:95` `&.bottom`). The same dead token is present in the parent (`KeyframesEditor.vue:100`) — it was copied along with C-12.

**Falsifier.** A `@utility class` or `@utility bottom` in the glass cascade. `grep` over `node_modules/@mkbabb/glass-ui/dist/styles/**` for `@utility class`/`@utility bottom` → no match.

### C-12 · `animateProgressBar` duplicated across the parent boundary, on two engine idioms, uncaught — MINOR

Child, `:125-131`:
```ts
const { CSSKeyframesAnimation } = await loadAnimationEngine();
new CSSKeyframesAnimation({ duration: 1000 }, progressBarEl.value)
    .fromVars([{ width: "0%" }, { width: "100%" }]).play();
```
Parent, `KeyframesEditor.vue:254-258`:
```ts
new CSSKeyframesAnimation({ duration: 1000 }, el)
    .fromVars([{ width: "0%" }, { width: "100%" }]).play();
```

Same animation, same duration, same vars — but the parent reads the engine **synchronously** from the warmed accessor (`KeyframesEditor.vue:107,130` — `kfEngine()` from `@kf-engine`) while the child **awaits** `loadAnimationEngine()`. Both idioms are sanctioned (`demo/kf-engine.ts:12-13`: *"Most demo sites await `loadAnimationEngine()` directly at their point of need"*), so the *subpath* choice is not the defect — the **duplication across a parent/child boundary that already shares a warmed accessor** is.

Three riders: (i) `onSubmit` (`:133-136`) fires `animateProgressBar()` with no `void`, no `await`, no `catch` — a floating promise; (ii) the parent already renders a progress bar in the same sticky footer (`KeyframesEditor.vue:98-101`), so the dialog's bar (`:48-51`) is a second copy of the same affordance; (iii) the submit handler `addKeyframesStringToAnimation` closes the dialog on success (`useKeyframeOps.ts:183`), so the bar it just started animating is unmounted mid-flight in the happy path — the animation is only visible when the submit **fails**.

**Falsifier.** Show the two progress bars are semantically distinct (they carry the same `.progress-bar` class from `demo/styles/design-idioms.css:132` and the same 0→100% width sweep), or that the dialog does not close on success (`useKeyframeOps.ts:183` `kfControls.dialogOpen = false`). Rider (iii)'s *visible* outcome is `UNPROVEN-NEEDS-LIVE` — reka's exit `Presence` may keep the node mounted long enough to show part of the sweep.

### C-13 · Global `window.getSelection()` beside a util that exists to avoid it — INFO

`:106` — `window.getSelection()?.collapseToEnd();`. The util this same file imports, `insertTabAtCursor`, opens with a docblock stating the opposite policy (`utils/contenteditable.ts:4-7`): *"Uses the target's own document/selection so it works inside iframes or any owning window — **no global `document` reach** for the selection"*, implemented as `target.ownerDocument.defaultView.getSelection()` (`:9-10`). The dialog's own selection call violates the rule its dependency was written to enforce. Consistent form: `addKeyframesEl.value?.ownerDocument.defaultView?.getSelection()`.

**Falsifier.** Show reka's dialog portal guarantees same-window mounting (it teleports within the same document, so the practical risk is ~nil — hence INFO, not MINOR). The *inconsistency* stands regardless.

### C-14 · `Ï` is unconditionally swallowed in a CSS editor — INFO

`:112-115` `if (key === "Ï") { e.preventDefault(); return; }` — the character can never be typed into the add-keyframes surface, which is a legitimate CSS `content: "Ï"` value. Duplicated in the parent (`KeyframesEditor.vue:219-222`). Dissolves entirely under C-3's `e.code`-based registry, which needs no dead-key literal.

**Falsifier.** Show the browser inserts `Ï` on the macOS Option+Shift+F chord *and* that suppressing it is required (it is required only because the shortcut is `e.key`-matched — the cause C-3 removes).

### C-15 · Four icons, four sizing conventions, one toolbar — INFO

In the cohort `KeyframesEditor.vue:73-95` renders: `WandSparkles` → `shrink-0 opacity-70`; `KeyframesAddDialog`'s `FilePlus2` (`:12`) → `stroke-2`; `CopyButton` (`KeyframesEditor.vue:83`) → `w-6 h-6`; `Paintbrush` (`:94`) → bare. Meanwhile the sibling dialog uses the glass size token: `CSSPasteDialog.vue:24` → `class="icon-md"`. The submit `FileIcon` here (`:45`) carries no class at all.

**Falsifier.** Show `icon-md` is not a glass utility, or that the four sizes are intentionally distinct.

---

## 4. Superlatives (L-18, both ways)

**SUP-1 · `isInsideToaster` is exemplary boundary hygiene.** `components/instrument/utils/toastGuard.ts:1-28` isolates vue-sonner's *private* `data-sonner-toaster` attribute in one greppable module, with an explicit contract block (attribute, dep version) and a named adoption path (*"If vue-sonner ships a public 'is inside toast' predicate, adopt it here"*). This is exactly the right treatment for an unavoidable private-DOM coupling, and this component consumes it correctly (`:19`).
*Falsifier / limit:* the **predicate** is centralized but the **wiring** is not — the 5-line `@interact-outside` arrow is byte-duplicated between `KeyframesAddDialog.vue:17-22` and `CSSPasteDialog.vue:4-9`. Kill the superlative by finding a third divergent copy of the selector; I found none.

**SUP-2 · The heavy-engine edge honours the value.js firewall.** `:71` imports `loadAnimationEngine` from the LIGHT barrel `@mkbabb/keyframes.js` and awaits it at point of need (`:127`). Per `src/animation/load-engine.ts:1-10` and lane-library §3.3, that dynamic import is *the* value.js boundary — everything value.js-bearing sits behind it. A leaf dialog reaching for `CSSKeyframesAnimation` is exactly where that invariant usually gets broken by a convenience static import; it is not broken here.
*Falsifier:* a static `@mkbabb/value.js/*` or `@src/animation/engine/*` import in this file. There is none — the file's only library imports are `@mkbabb/keyframes.js` (`:71`) and `@mkbabb/glass-ui` (`:60-69`).

**SUP-3 · The trigger's DOM shape is what makes the parent's a11y seam work.** `:6-13` renders a real `<button type="button" aria-label="Add keyframes">` through `DialogTrigger as-child`. `useToolbarKeyboard.ts:23-27` documents the dependency explicitly — *"Container-based (it queries the container's `button` descendants) so it is agnostic to how each action renders its button — **KeyframesAddDialog's DialogTrigger**, CopyButton, the Apply-CSS button — with no per-item registration"* — and `:43` is the `querySelectorAll("button")` that relies on it. The dialog's own content is portalled (glass `DialogContent` → reka `DialogPortal`, `dialog-BKSTfmIQ.js:@775`), so the submit `<Button>` and reka's close `<button>` correctly stay **out** of the toolbar's roving cohort. Both halves of that seam are right.
*Falsifier:* if `as-child` were dropped, or the trigger rendered a `<div role="button">`, the roving tabindex would lose the item silently. It does not. (C-10 proposes glass `Button` here — which also renders a real `<button>`, so S-10 does not disturb SUP-3.)

**SUP-4 · The submit path is the hardened value.js edge.** The `@submit` payload reaches value.js's whole-stylesheet grammar via `parseAnimationCSS` → `resolveKeyframes` (lane-library §4.1 **A2**/**A13**). That path is the *defensive* one: `resolveKeyframes` returns `{ast, issues}` and never throws on a parse failure (lane-library A1/A2), `parseAnimationCSS.ts:29-34` converts a `PARSE_ERROR` diagnostic into a typed `TypeError`, and `useKeyframeOps.ts:159` wraps the whole thing in `withErrorToastAsync` with a Retry action. A malformed paste produces a toast, not a crash.
*Falsifier:* show `resolveKeyframes` can throw past the diagnostic check (lane-library A1 records `ast: []` + diagnostics, "never a throw"; A9/A12 are the *other* two failure postures and neither is on this path). This superlative is precisely the contrast that makes **C-4** a defect: the same component's *other* CSS edge has none of this.

---

## 5. Claims I killed with their own falsifiers

Recorded so the tally is honest — none of these count as defects.

**K-1 · "Tab inserts NBSP, which corrupts the CSS parse."** `insertTabAtCursor` inserts four U+00A0 (`utils/contenteditable.ts:16`), which `onInput` (`:97`) emits into `props.text` and thence into value.js. U+00A0 is a valid CSS *ident* code point, so the fear was a mangled property name. **Killed:** value.js's stylesheet parser tests whitespace with the JS regex class `\s` — `value.js/src/css/stylesheet.ts:436,530,534` and `src/css/grammar.ts:77,80,115` — and JS `\s` matches U+00A0. `String.prototype.trim()` (used at `stylesheet.ts:394`) also strips it. NBSP is absorbed as whitespace.

**K-2 · "`@lucide/vue` is a second phantom dep (lane-frontend F-1 echo)."** **Killed:** declared at `package.json:74` `"@lucide/vue": "^1.17.0"`, present 3× in `package-lock.json`, installed at 1.17.0. F-1's phantom is glass-ui specifically; the icon dep is clean. *(F-1 itself is unchallenged and still governs: `npm ci` cannot resolve `@mkbabb/glass-ui`, so every glass import in this file — `:60-69` — is reproducible only by accident of the current `node_modules`.)*

**K-3 · "`scale-on-hover` (`:10`) is an undefined class."** **Killed:** it is a glass-ui Tailwind v4 `@utility` — `node_modules/@mkbabb/glass-ui/dist/styles/utilities/btn.css:1` `@utility scale-on-hover { scale: 1; transition: scale var(--spring-smooth-duration) var(--spring-smooth); &:hover { scale: var(--scale-hover); } }`. Consuming it (rather than re-authoring the hover lift) is correct.

**K-4 · "Importing `loadAnimationEngine` directly bypasses the demo's `@kf-engine` accessor."** **Killed:** `demo/kf-engine.ts:12-13` sanctions it explicitly — the accessor exists only for the scene-machine's synchronous hot path, and per-site awaiting is the documented default. Reclassified as the *duplication* half of C-12.

**K-5 · "The R1 `parseCssColor` shipping-crash class is reachable here."** **Killed:** this component makes no value.js call, direct or transitive-at-render. Lane-library §4.6's R1 surface is `demo/scenes/square/useSquareTumble.ts:22` — a different tree. The value.js edge this component *does* own (submit → `resolveKeyframes`) is the diagnostics-returning path, not the throwing one — see SUP-4. **The R1 class does not touch this file; recording the negative so the megatranche's R1 map stays accurate.**

---

## 6. Tally

| | |
|---|--:|
| defects recorded (C-1 … C-15) | **15** |
| of which BLOCKER | **1** (C-1) |
| of which MAJOR | 5 (C-2 … C-6) |
| of which MINOR | 6 (C-7 … C-12) |
| of which INFO | 3 (C-13 … C-15) |
| superlatives (SUP-1 … SUP-4) | **4** |
| candidate defects killed by their falsifier (K-1 … K-5) | 5 |
| new shadow-census ids opened | 2 — **S-9** (`/keyboard` registry), **S-10** (`Button iconOnly`) |
| hitherto ids cited | F-1, S-1, S-2, S-7, A1/A2/A9/A12/A13, R1 (as a negative) |
| claims marked `UNPROVEN-NEEDS-LIVE` | 4 — C-1(c) CSP leg · C-7 recalc magnitude · C-10 visual equivalence · C-12(iii) exit-animation visibility |
| claims marked `UNPROVEN` (evidence obtainable, not gathered) | 1 — C-6 chronology (`git log --follow`) |

**One-line verdict.** The component's *library* consumption is disciplined — it rides the `loadAnimationEngine()` firewall correctly and its submit path is the best-hardened value.js edge in the editor (SUP-2, SUP-4). Its *design-system* consumption is not: it nests a `<p>` and an `<h3>` inside an `<h2>` because it used `DialogTitle` as a layout box while `DialogHeader` sat unused in the same barrel (C-2), it hand-rolled a second global keyboard mechanism next to a registry that already had `allowInInput` waiting for exactly this case (C-3, S-9), and it hand-rolled an icon button in a file that imports `Button` (C-10, S-10). And it is the sole site in the repository that activates `useCodeHighlight`'s unescaped-`innerHTML` writer, on a string a `?state=` share link can set (C-1).

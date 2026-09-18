claude-opus-5[1m]

# CHALLENGE — `KeyframesAddDialog.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/components/KeyframesAddDialog.vue` (161 lines)
**Date** 2026-08-05 · **Method** static, source-derived only. No browser tooling (SS-13 owns the live visual pass).
**Law** keyframes.js / glass-ui / value.js read as READ-ONLY evidence. This file is the only write.

## Read set (whole, read-only)

| File | Why |
|---|---|
| `demo/components/instrument/keyframes/components/KeyframesAddDialog.vue` | target |
| `demo/components/instrument/keyframes/composables/useHighlightCSS.ts` | `useCodeHighlight` (import) |
| `demo/components/instrument/keyframes/utils/contenteditable.ts` | `insertTabAtCursor` (import) |
| `demo/components/instrument/utils/toastGuard.ts` | `isInsideToaster` (import) |
| `demo/kf-engine.ts` + `src/animation/engine/animation.ts`, `engine/css/css-animation.ts`, `engine/play-lifecycle.ts` | `loadAnimationEngine` / `CSSKeyframesAnimation` (import) |
| `demo/components/instrument/keyframes/KeyframesEditor.vue` | the sole consumer — the prop/emit counterparty |
| `.../composables/useKeyframesEditor.ts`, `useKeyframesState.ts`, `useKeyframesParsing.ts`, `useKeyframeOps.ts`, `useToolbarKeyboard.ts` | the `format` / `submit` / `v-model` implementations |
| `demo/utils/formatEditorCSS.ts`, `.../utils/parseAnimationCSS.ts` | what `format` and `submit` actually do |
| `demo/state/controlOptionsStore.ts`, `demo/state/hashSharing.ts` | where `props.text` comes from |
| glass-ui `src/components/dialog/{Dialog,DialogContent,DialogTitle,DialogDescription,DialogFooter}.vue`, `card/CardTitle.vue`, `button/Button.vue`, `_shared/interaction.ts` | the composition contract |
| `node_modules/reka-ui/dist/Dialog/{DialogTitle,DialogDescription}.js`, `DismissableLayer/{DismissableLayer,utils}.js` | the rendered elements + `interactOutside` dispatch target |
| `node_modules/@vueuse/core/dist/index.js` §`useMagicKeys` (14.3.0) | the hotkey semantics |
| `node_modules/@mkbabb/value.js/dist/subpaths/css.js` | the CSS tokenizer's whitespace class |

**Tally — 17 graded findings: 1 BLOCKER · 5 MAJOR · 9 MINOR · 2 INFO. 5 superlatives.**

Two candidate BLOCKERS were **killed by their own falsifiers** and are recorded as such (§L-9-FALSIFIED, §L-16). That is the point of the exercise; they are reported so the arbiter does not re-derive them.

---

## BLOCKER

### L-1 · `innerHTML` DOM-XSS sink on the reformat path, reachable from a crafted share URL

**BLOCKER** · `KeyframesAddDialog.vue:103` (call site) → `useHighlightCSS.ts:108-113` (sink)

```ts
// KeyframesAddDialog.vue:100-107
const reformat = async () => {
    const formatted = await props.format(props.text);
    setHighlightingString(addKeyframesEl.value, formatted);   // ← :103
```
```ts
// useHighlightCSS.ts:107-113 — "Replace an element's markup with a pre-built highlighted string."
const setHighlightingString = (el: HTMLElement | null, s: string) => {
    if (el) { el.setAttribute("highlighted", ""); el.innerHTML = s; }   // ← :111
};
```

`s` is **not** a "pre-built highlighted string". `props.format` resolves to `updateAddKeyframesString` (`useKeyframeOps.ts:146-153`) → `formatEditorCSS` (`demo/utils/formatEditorCSS.ts`) → `prettier.format(css, { parser: "scss" })`. Prettier returns **plain CSS text, verbatim through comments** — never HTML-escaped. It is assigned straight to `innerHTML`.

The auto-highlight path is *safe* by contrast: `highlight()` (`useHighlightCSS.ts:116-126`) writes `hljs.highlight(el.innerText, …).value`, and highlight.js escapes `<`/`>`/`&`. **Only the reformat path bypasses the escaper.** The two writers to the same element disagree about whether the string is trusted markup.

**The content is attacker-supplied and remotely deliverable.** `props.text` ← `v-model:text="addKeyframesString"` (`KeyframesEditor.vue:77`) ← `ref(kfControls.addKeyframes)` (`useKeyframesState.ts:24`) ← `keyframeControls.addKeyframes: string` in the persisted control store (`controlOptionsStore.ts:19-24`). That whole store is **serialized into a lossless base64 share URL** (`hashSharing.ts:20-27 getAllState`) and restored with **no leaf validation**:

```ts
// hashSharing.ts:29-44 — isValidState checks ONLY that `options`/`controls` are objects
// controlOptionsStore.ts:59-64
export const applySharedControlState = (patch: object): void => {
    const entries = Object.entries(patch).filter(([key, value]) =>
        key !== "_storeTimestamp" && typeof value === "object" && value !== null);
    Object.assign(useAnimationGroupsControlOptionsStore().value, Object.fromEntries(entries));
};
```
Called from the router on load (`demo/app/scene/router.ts:50`) and `useShareState.ts:75`.

**Full chain (each hop cited, none inferred):**
1. Attacker encodes `controls["<scene>"].keyframeControls = { dialogOpen: true, addKeyframes: "/* <img src=x onerror=…> */\n0% { width: 0%; }" }` — note `dialogOpen` is *also* in the shared payload (`controlOptionsStore.ts:21`), so the dialog opens itself.
2. Victim opens the link → `restoreStateFromParam` → `Object.assign` → store patched → persisted to `localStorage` (`useStorage`, `controlOptionsStore.ts:47-49`).
3. Dialog renders the payload as **escaped text** (`{{ text }}`), then hljs re-renders it **escaped**. Still safe.
4. Victim presses **Shift+Alt+F** (or types `Ï`) → `reformat()` → prettier preserves the comment verbatim → `el.innerHTML = "<img src=x onerror=…>…"` → the `<img>` is constructed, `src=x` 404s, `onerror` **executes**.

**Severity call.** It is a multi-step chain and the final step needs one keystroke. It is still a BLOCKER: an unescaped `innerHTML` sink fed by URL-deliverable state on a public demo is not gradeable below "fix before adoption", and the fix is one property — `el.textContent = s` (which is also *semantically correct*, since `s` is plain text, and would make the sink strictly cheaper).

**Falsifier.** Any one of these kills L-1: (a) `formatEditorCSS` escapes or strips HTML — it does not, it is 14 lines and does nothing but call prettier; (b) `props.format` sanitizes — `useKeyframeOps.ts:146-153` does not; (c) the share payload excludes `keyframeControls` — `getAllState` spreads the *entire* control store; (d) `restoreStateFromParam` validates leaves — `isValidState` (`hashSharing.ts:29-44`) checks only two `typeof … === "object"` guards; (e) a CSP without `unsafe-inline`/with a strict `img-src` blocks it — **not checked**, marked `UNPROVEN-NEEDS-DEPLOY-HEADERS`; a meta-CSP was not found in the demo tree but I did not read the gh-pages deploy config, so (e) is the one live escape hatch and an arbiter should close it.

---

## MAJOR

### L-2 · Two floating promises: the reformat hotkey fails **silently** on the most common editor state

**MAJOR** · `KeyframesAddDialog.vue:143` (`reformat()`), `:135` (`animateProgressBar()`)

```ts
watch(() => (…), (v) => { if (v && props.open) { reformat(); } });   // :140-147 — bare call
const onSubmit = () => { emit("submit", props.text); animateProgressBar(); };  // :133-136 — bare call
```

Both callees are `async`. Neither is `await`ed, `void`-ed, or `.catch`-ed.

`reformat()` awaits `props.format` → `prettier.format(css, { parser: "scss" })`, which **throws on malformed CSS** — i.e. on the state a free-text `contenteditable` CSS editor is in for most of an authoring session. The rejection has nowhere to go:
- no `app.config.errorHandler` and no `unhandledrejection` listener anywhere in `demo/app/main.ts` / `App.vue` (grepped: zero hits);
- no eslint config exists in the repo at all (`eslint.config*` / `.eslintrc*` — no matches), so `no-floating-promises` never fired;
- the codebase **already owns the correct posture** — `withErrorToastAsync` (`useKeyframeOps.ts:25-40`, toast + `Retry` action) wraps *every* sibling parse/format op (`:97`, `:113`, `:159`). The reformat path is the one that skipped it.

User-visible result: press Shift+Alt+F, nothing happens, no toast, no explanation. `animateProgressBar()` has the same shape — a `loadAnimationEngine()` chunk-load failure (real after a deploy invalidates hashed chunks) rejects into the void.

**Falsifier.** A global `unhandledrejection` handler that toasts, or `prettier.format` resolving (not rejecting) on malformed input. Neither exists: the handler grep is empty and prettier's documented contract is to throw a `SyntaxError` on parse failure.

### L-3 · `<DialogDescription>` is nested **inside** `<DialogTitle>` — invalid content model, and the dialog's accessible name absorbs the description

**MAJOR** · `KeyframesAddDialog.vue:24-31`

```html
<DialogTitle>
    <CardTitle class="text-heading">Add keyframes</CardTitle>
    <DialogDescription class="text-subheading text-muted-foreground">
        Add keyframes to the animation
    </DialogDescription>
</DialogTitle>
```

Rendered elements, each verified against the installed artifacts:
- `reka-ui/dist/Dialog/DialogTitle.js:17` → `default: "h2"`
- `reka-ui/dist/Dialog/DialogDescription.js:17` → `default: "p"`
- glass-ui `card/CardTitle.vue` → `withDefaults(…, { as: "h3" })`
- glass-ui `DialogTitle.vue` / `DialogDescription.vue` are thin `cn()` wrappers that forward to reka unchanged.

So the DOM is `<h2><h3>…</h3><p>…</p></h2>`. `h1`–`h6` accept **phrasing content**; `<h3>` and `<p>` are flow content — both children are invalid. Worse, reka wires `aria-labelledby` → the title node and `aria-describedby` → the description node; nesting the description *inside* the label means the accname computation walks the whole subtree, so the dialog is named **"Add keyframes Add keyframes to the animation"** and the description is then announced a second time via `aria-describedby`. That is a component-composition contract error, not a styling choice.

Sub-note (INFO grade, folded here): `class="text-heading"` on the inner `CardTitle` overrides a size glass-ui explicitly reserves — `DialogTitle.vue`'s own comment: *"Size and leading are authored in `dialog/styles.css`, derived from the ONE fluid body value so the √φ interval with the description holds."* The consumer is fighting the system's authored interval. (`text-heading` **does** exist — `glass-ui/dist/styles/typography/semantic.css` — so this is a misuse claim, not a dead-class claim.)

**Falsifier.** If reka's `DialogTitle`/`DialogDescription` were passed `as="span"`/`as-child` here (they are not — no `as` prop at either call site), or if glass-ui overrode reka's default `as` (it does not — both wrappers forward only `class`), the nesting would be legal. Neither holds. The **rendered-DOM** half is fully static-provable; the *screen-reader utterance* is `UNPROVEN-NEEDS-LIVE` for the A-axis to confirm.

### L-4 · The `format` prop's documented contract is **insufficient for this component's own correctness**

**MAJOR** · `KeyframesAddDialog.vue:79-80` (contract) vs `:100-107` (use) vs `useKeyframeOps.ts:146-153` (impl)

```ts
/** Formats the raw string; returns the formatted result for re-highlight. */
format: (raw: string) => Promise<string>;
```

The JSDoc describes a **pure** formatter. `reformat()` consumes it as one — it writes the result to the DOM and **never emits `update:text`**. But `props.text` is the value `onSubmit` sends (`:134`), so with a genuinely pure formatter the user would reformat, see formatted CSS, hit *Add Keyframes*, and submit the **unformatted** string.

It works today only because the injected implementation has an **undocumented side effect**:
```ts
// useKeyframeOps.ts:146-153
const updateAddKeyframesString = async (keyframesString: string) => {
    const formatted = await formatEditorCSS(keyframesString, getFormatWidth());
    kfControls.addKeyframes = formatted;
    addKeyframesString.value = formatted;      // ← the hidden model write
    return formatted;
};
```

A prop whose declared type is honoured but whose *declared contract* is not sufficient is a latent break for the next consumer. Either the JSDoc must state "MUST also write the bound `text` model", or `reformat()` must `emit("update:text", formatted)` and the impl must stop double-writing. Today the component is correct by coincidence.

**Falsifier.** Show a second `format` implementation in the tree, or show `reformat()` emitting `update:text`. `KeyframesAddDialog` has exactly one consumer (`KeyframesEditor.vue:78`) and one formatter, and `grep "update:text"` in the component returns only `:97` (`onInput`).

### L-5 · Root-barrel glass-ui import — the F-1 phantom dependency bites here, and the subpaths that would soften it exist

**MAJOR** · `KeyframesAddDialog.vue:60-69`

```ts
import { Button, CardTitle, Dialog, DialogContent, DialogDescription,
         DialogFooter, DialogTitle, DialogTrigger } from "@mkbabb/glass-ui";
```

**F-1 re-verified against today's tree** (the census is 2026-08-03; this run is 08-05, unchanged):
- `package.json` — the only `@mkbabb` dependency is `"@mkbabb/value.js": "4.0.0"` (line 69). `@mkbabb/glass-ui` is **absent**.
- `package-lock.json` — `grep -c "glass-ui"` → **0**.
- `node_modules/@mkbabb/glass-ui/package.json` → `7.0.0`, present.

So this file's eight symbols resolve off a package with **no floor, no ceiling, no lock entry**; `npm ci` cannot reconstruct it. Confirms lane-frontend **F-1** verbatim.

The component-level aggravation the census did not name: the installed package publishes **73 subpath exports**, including `./dialog`, `./button`, `./card` (probed directly off the installed `package.json` `exports` map). The *sibling* module in this very directory already uses one — `useHighlightCSS.ts:2` `import { useGlobalDark } from "@mkbabb/glass-ui/dark"`. This file reaches the **root barrel** instead, dragging the full 73-export surface into whatever chunk it lands in — and it lands in a **static** graph, because its only consumer `KeyframesEditor.vue` is imported *directly* (`SpringPhysicsFacet.vue:135`), bypassing the deliberate `defineAsyncComponent` lazy seam that `keyframes/index.ts:7` was written to provide.

**Falsifier.** If glass-ui's root barrel is side-effect-free and per-subpath tree-shakes identically, the chunk cost vanishes and this collapses to MINOR-on-F-1-alone. I did not measure the built chunks (no build permitted) — the **declaration** half is proven, the **weight** half is `UNPROVEN-NEEDS-BUILD`.

### L-6 · The two highlight writers disagree on the idempotence marker — the reformat path re-highlights only by accident of `""` being falsy

**MAJOR** · `useHighlightCSS.ts:110` vs `:117`/`:124`, exercised at `KeyframesAddDialog.vue:103-104`

```ts
setHighlightingString: el.setAttribute("highlighted", "");     // :110 — EMPTY STRING
highlight:             if (!el || el.getAttribute("highlighted")) return;   // :117 — truthiness gate
                       el.setAttribute("highlighted", "true"); // :124 — "true"
```

`reformat()` calls `setHighlightingString` then `highlightAll()` (`:103-104`). The second call re-highlights **only because `""` is falsy** and therefore does not trip the `:117` gate. A maintainer normalizing the marker to `setAttribute("highlighted", "true")` — the obvious "consistency" cleanup — would make `highlight()` short-circuit and the reformat would leave **plain unhighlighted CSS** on screen forever after. The invariant is load-bearing, unstated, and expressed as an accident of DOM string coercion.

It also means `setHighlightingString`'s only real job in `reformat` is *"set the text so `highlight()` can read `innerText`"* — for which `textContent` is both correct and the L-1 fix.

**Falsifier.** Show that `highlight()` does not gate on that attribute, or that `""` is truthy. Both are decided by the quoted lines.

---

## MINOR

### L-7 · `window.getSelection()?.collapseToEnd()` is provably a no-op — it runs before the DOM it targets is replaced

**MINOR** · `KeyframesAddDialog.vue:104-106`

```ts
setHighlightingString(addKeyframesEl.value, formatted);
highlightAll();                       // → highlight() → void bootHighlighter().then(…) — ASYNC
window.getSelection()?.collapseToEnd();   // runs SYNCHRONOUSLY, first
```
`highlight()` (`useHighlightCSS.ts:120-125`) performs its `el.innerHTML = h.value` inside a `.then()`. Even with `highlighterBoot` already resolved, `.then` defers to a microtask — which runs **after** the synchronous `collapseToEnd()`. So the caret is collapsed into a node the very next microtask deletes.

**Falsifier.** If `bootHighlighter()` returned a non-promise or `highlight()` ran synchronously, the order would reverse. It does not (`:120`). The *ordering* is proven statically; the resulting **caret position** is `UNPROVEN-NEEDS-LIVE` (browsers differ in where a caret lands when its anchor node is removed) — but "the caret ends up where `collapseToEnd` put it" is excluded either way.

### L-8 · `insertTabAtCursor` fires no `input` event — a Tab as the last edit is dropped from the model

**MINOR** · `KeyframesAddDialog.vue:117-120` + `utils/contenteditable.ts:16-22`

`range.insertNode()` is a programmatic DOM mutation; it does **not** dispatch `beforeinput`/`input` (only user editing actions and `execCommand` do). `onInput` (`:96-98`) is the sole `update:text` emitter, and `onKeyDown` does not emit. So after Tab, the DOM holds the indent and `props.text` does not — and `onSubmit` sends `props.text` (`:134`).

**Correctly scoped**: the divergence self-heals on the *next* keystroke, because `onInput` reads `(e.target).innerText` of the whole `<pre>`, which includes the inserted node. The loss is real only when Tab is the **final** edit before submit. Hence MINOR, not MAJOR.

**Falsifier.** A second `update:text` emitter, or an `input` dispatch inside `insertTabAtCursor`. `contenteditable.ts` is 23 lines and dispatches nothing.

### L-9 · The tab is four U+00A0 — harmless to the engine, corrosive to the formatter

**MINOR** · `utils/contenteditable.ts:16`, consumed at `KeyframesAddDialog.vue:119`

```ts
const tabNode = target.ownerDocument.createTextNode("\u00a0\u00a0\u00a0\u00a0");  // four NON-BREAKING spaces
```

**`L-9-FALSIFIED` — the BLOCKER version of this claim is dead, recorded so nobody re-derives it.** I initially graded this a BLOCKER on the theory that U+00A0 is *not* CSS whitespace (per the CSS Syntax spec, whitespace is only U+0009/000A/000C/000D/0020), so an nbsp-indented declaration would tokenize as an identifier `    width` and the declaration would be silently dropped at submit. **The tree refutes it**: the submit path is `parseAnimationCSS` → `resolveKeyframes` (`src/animation/compile/adapter.ts:1-14`) → value.js `parseStylesheet`, and value.js's tokenizer uses the **JavaScript** `\s` class (`node_modules/@mkbabb/value.js/dist/subpaths/css.js:189,191,209,1048,1135,1138`), which **does** match U+00A0. The parse survives intact. No data loss at submit. Grep also confirms zero nbsp normalization anywhere in `demo/` or `src/` — the only occurrence in the tree is the insertion itself.

**What survives as MINOR**: postcss/prettier (`formatEditorCSS`) uses its own whitespace set (` \n\t\r\f`), which excludes U+00A0. So on Shift+Alt+F the nbsp run is absorbed into the declaration's prop token rather than its `raws.before`, and prettier re-indents *in front of* it — indentation compounds on every reformat. Cosmetic, deterministic, and one character-class away from a fix (four U+0020, or a real `\t`).

**Falsifier for the surviving claim.** Show postcss treating U+00A0 as whitespace, or show `innerText` normalizing U+00A0 → U+0020 before it reaches the model (the HTML `innerText` algorithm has no such step, and under `white-space: pre` no collapsing runs at all). Marked `UNPROVEN-NEEDS-LIVE` for the double-indent *observation*; the tokenizer asymmetry is static.

### L-10 · `Ï` cannot be typed into the editor, and the magic literal is triplicated

**MINOR** · `KeyframesAddDialog.vue:112-115`

```ts
if (key === "Ï") { e.preventDefault(); return; }
```
`preventDefault()` on `keydown` cancels the subsequent text insertion, so the character `Ï` is **unenterable** in this CSS editor — it cannot appear in a `content: "…"` string, a custom-property name, or a comment. It also `return`s before `highlightAll()`, unlike every other key.

The literal appears at three sites — `KeyframesEditor.vue:219`, `KeyframesStringControls.vue:91`, `KeyframesAddDialog.vue:112` — and is **explained at none of them**; the only explanation in the tree is the unrelated watch comment 26 lines below (`:138`, "the dead-key Ï variant"). Verified mechanism against `@vueuse/core` 14.3.0: `updateRefs` (`dist/index.js:4800-4820`) registers `e.key.toLowerCase()` and `e.code.toLowerCase()`, and the proxy lowercases lookups (`:4833`). On macOS `Shift+Alt+F` yields `key === "Ï"`, `code === "KeyF"` — so `keys["F"]` is never set and the `keys["Ï"]` arm is genuinely the macOS path; on Windows/Linux `key === "F"` and the first arm fires. The dual-arm hotkey is **correct**; the *swallow* and the *undocumented triplication* are the defect.

Second-order: `keys["Ï"]` alone (no modifier assertion, `:141`) means any layout that produces `Ï` as a plain character (dead-key `¨` + `I`) triggers a reformat mid-typing.

**Falsifier.** Show a layout-independent reason to block the key, or a fourth site that documents it. Grep returns exactly the three sites and zero rationale comments.

### L-11 · `animateProgressBar` retains no handle, has no unmount guard, and re-reads the ref **after** an `await` — against the codebase's own established idiom

**MINOR** · `KeyframesAddDialog.vue:125-131`

```ts
const animateProgressBar = async () => {
    if (!progressBarEl.value) return;                       // guard BEFORE the await
    const { CSSKeyframesAnimation } = await loadAnimationEngine();
    new CSSKeyframesAnimation({ duration: 1000 }, progressBarEl.value)   // re-read AFTER
        .fromVars([{ width: "0%" }, { width: "100%" }]).play();          // handle discarded
};
```

Three distinct problems, all measured against a comparator in the same demo:

1. **No handle → cannot be stopped.** `TypingDots.vue:65-108` is the codebase's canon: it collects `anims[]`, sets an `unmounted` flag *before* the `await`, re-checks it *after*, and `onBeforeUnmount` calls `anim.stop()` on each. `stop()` exists and cancels both the rAF loop and the WAAPI delegation (`src/animation/engine/play-lifecycle.ts:436-438`). This component keeps nothing, so nothing can be stopped. Bounded — `duration: 1000`, default finite iteration count — so it is a ≤1 s rAF over a possibly-detached node, not an unbounded leak. Hence MINOR.
2. **The teardown window is real**: the success path *closes the dialog* (`useKeyframeOps.ts:183 kfControls.dialogOpen = false`), and `progressBarEl` lives inside `DialogContent`, which glass-ui unmounts once the exit spring settles (`DialogContent.vue:97-99`).
3. **Unsound narrowing across `await`.** TypeScript keeps the `:126` narrowing of `progressBarEl.value` alive through the `await`, so `:128` typechecks as `HTMLElement`; at runtime `useTemplateRef` nulls it on unmount. `KeyframesAnimation`'s constructor (`src/animation/engine/animation.ts:198-199`) does `Array.isArray(targets) ? targets : …` — a `[null]` array passes through intact and reaches `transformTargetsStyle(vars, this.targets)` (`:156`), which dereferences it. One line fixes it: capture `const el = progressBarEl.value` before the `await`.

**Falsifier for (3) being live rather than latent.** The demo warms the engine at boot (`kf-engine.ts:38-42`, awaited before `app.mount()` in `main.ts`), so `loadAnimationEngine()` resolves in a microtask and no user gesture can close the dialog inside that window. I therefore claim it as **latent-only**, not a live crash. Show a cold-engine path reaching this handler and it upgrades.

### L-12 · Verbatim duplication with the parent — `animateProgressBar` and `onKeyDown` both exist twice

**MINOR** · `KeyframesAddDialog.vue:109-131` vs `KeyframesEditor.vue:218-230, 254-258`

- `onKeyDown` — the `Ï` guard, the `Tab`/`insertTabAtCursor` branch, the trailing `highlightAll()` — **byte-for-byte equivalent** in both files (only `const { key } = e` vs `e.key` differs).
- `animateProgressBar` — identical `{ duration: 1000 }` / `fromVars([{width:"0%"},{width:"100%"}])` recipe in both, differing **only** in engine access: the parent uses the synchronous warmed `kfEngine()` (`KeyframesEditor.vue:130`), the child the async `loadAnimationEngine()` (`:127`). Two idioms for one operation, six lines apart in the module graph.

The demo already extracted the *presentation* half of this pair — `.progress-bar` is a single shared definition in `demo/styles/design-idioms.css:131-132`, folded there by E.W3 §S4 precisely because it was duplicated across these same two files. The **animator** was left behind. The same E.W3 argument applies unchanged.

**Falsifier.** A behavioural difference between the two copies that justifies the split. None found: same duration, same vars, same target shape.

### L-13 · Three dead/incorrect attribute tokens

**MINOR** · `KeyframesAddDialog.vue:41, 43, 50`

- `:41` `class="sticky bottom-0 class grid"` — the literal token **`class`** is a stray. No `.class` rule exists in `demo/styles/*.css` (grepped) and Tailwind mints no such utility.
- `:50` `class="progress-bar w-full bottom mt-2"` — bare **`bottom`** is not a Tailwind utility (`bottom-0`, `bottom-auto`, `bottom-[…]` are; bare is not) and no `.bottom` rule exists in the demo styles. The same stray is duplicated at `KeyframesEditor.vue:100` — the token was copy-pasted along with the rest of L-12.
- `:43` `<Button type="submit">` — glass-ui forwards `type` to the native element (`Button.vue:66`), but there is **no `<form>` anywhere in the subtree**; a submit button outside a form has no submit behaviour, and the actual action is the `@click` handler. `type` should be omitted (glass-ui already defaults to `"button"`, `Button.vue:66`).

**Falsifier.** Produce a `.class`/`.bottom` rule from any stylesheet in the resolved cascade (demo styles + `@mkbabb/glass-ui/styles`), or an ancestor `<form>`. Neither grep returns a hit.

### L-14 · `onMounted` duplicates the `watch`, and `highlightAll(el)` passes an element the composable already owns

**MINOR** · `KeyframesAddDialog.vue:92-94, 149-160`

```ts
const { … } = useCodeHighlight(() => [addKeyframesEl.value]);   // :92-94 — el is ALREADY owned
watch(addKeyframesEl, () => { if (addKeyframesEl.value) highlightAll(addKeyframesEl.value); });  // :150-154
onMounted(()      => { if (addKeyframesEl.value) highlightAll(addKeyframesEl.value); });         // :156-160
```

Three redundancies in nine lines: (a) the explicit argument is already returned by `getOwnedElements`, so `highlightAll` calls `highlight()` on the same element twice (`useHighlightCSS.ts:133-137` — the second call short-circuits on the marker); (b) `onMounted` is a hand-rolled `{ immediate: true }` on the watch directly above it; (c) both bodies are identical. The whole block collapses to `watch(addKeyframesEl, (el) => el && highlightAll(), { immediate: true })`.

Harmless today only because `highlight()` is marker-idempotent — i.e. it depends on the same fragile invariant as L-6.

**Falsifier.** A mount ordering in which the `watch` does not fire but `onMounted` does. The `<pre>` lives inside a Presence-gated portal, so the ref transitions `null → el` *after* the watcher is created, which is exactly the case a non-immediate watcher catches.

### L-15 · The `#highlightjs-theme` singleton is still un-refcounted (T-lane-18 #6) — but the tree makes it latent-only

**MINOR** · `useHighlightCSS.ts:94-105, 142-145`

`ensureThemeStyle()` adopts-or-creates one shared `document.head` node; `onUnmounted` **unconditionally removes it**, with no reference count. `KeyframesAddDialog.vue:92` and `KeyframesEditor.vue:176` are the two live consumers — exactly the pair T-tranche `lane-18-brittle-selectors.md:37` named. **The finding stands verbatim in today's tree.**

**Where I refine the corpus.** Lane-18 frames the pair as "2 concurrent consumers", implying an interleaved-unmount hazard. The current tree closes it: `KeyframesAddDialog` is an unconditional child of `KeyframesEditor` (`KeyframesEditor.vue:75`, no `v-if`), Vue runs child unmount hooks before the parent's, and the parent's subsequent `.remove()` on an already-detached node is a no-op. `grep useCodeHighlight demo/` returns exactly those two sites, and `<KeyframesEditor>` has exactly one mount site (`SpringPhysicsFacet.vue:119`) — so there is **no independent-lifetime consumer today**. The hazard is real, latent, and one third consumer away from live; it also self-heals, since the next `highlightAll()` re-runs `ensureThemeStyle()`.

**Falsifier.** A third `useCodeHighlight` consumer with a lifetime independent of `KeyframesEditor`, or a second concurrent `<KeyframesEditor>` mount. Neither exists in the tree scanned.

---

## INFO

### L-16 · `L-16-FALSIFIED` — the contenteditable/`v-model` caret race is closed by the parent's pre-boot

**INFO (candidate BLOCKER, killed)** · `KeyframesAddDialog.vue:33-39, 96-98`

The template hands Vue ownership of the editable surface — `<pre …><code>{{ text }}</code></pre>` compiles to a `TEXT` patch flag, so a `props.text` change runs `el.textContent = next` on the `<code>`, replacing the text node the caret sits in. Since `onInput` (`:97`) echoes every keystroke out to the parent's `v-model` and straight back into `props.text`, **every keystroke would reset the caret** — until `hljs` blows the `<code>` away via `innerHTML` (`useHighlightCSS.ts:123`), after which Vue's patches land on an orphan and are silently inert. I graded this a BLOCKER on a text-entry surface.

**The tree kills it.** The window is only open before `bootHighlighter()` resolves — and the *parent* boots highlight.js at its own mount, long before this dialog can be opened: `KeyframesEditor.vue:279-283 onMounted → updateAllStrings()` → `cssKeyframesString` changes → `watch` at `:275-277` → `highlightAll()` → `ensureThemeStyle()` → `bootHighlighter()`. By the time the toolbar's Add button is clickable, `highlighterBoot` is resolved and `highlight()`'s `.then` fires within one microtask of the dialog's open flush. No realistic keystroke lands inside it.

Recorded because the **architecture** remains fragile and un-commented: the component's correctness rests on Vue *losing* DOM ownership to an `innerHTML` write it does not acknowledge anywhere in its source. Any change that makes the highlight lazier, or that re-renders `props.text` after the highlight, re-opens it. `UNPROVEN-NEEDS-LIVE` in both directions.

### L-17 · Colocation — the `components/` sub-shelf holds one single-owner child

**INFO** · `KeyframesAddDialog.vue` path

Confirms V-audit `R1-05-demo-colocation.md:118`: `keyframes/components/` contains `KeyframeCardList.vue` + `KeyframesAddDialog.vue`, both single-owner children of `KeyframesEditor.vue` → the shelf should dissolve into the flat `keyframes/` module. The only cross-shelf import this file makes is `../composables/useHighlightCSS` and `../utils/contenteditable` — i.e. it already reaches *up* out of its own shelf twice in 161 lines, which is the tell. Module size itself is **Goldilocks-clean**: 161 lines, one concern, no god-module pressure. Also confirms `U/loop/pass2` on `contenteditable.ts` — 2 consumers, correctly kept shared, not inlined.

---

## SUPERLATIVES (L-18, running the other way)

### S-1 · `toastGuard.ts` — the private-DOM-contract quarantine · **exemplary**
`demo/components/instrument/utils/toastGuard.ts` is 28 lines, 17 of them a comment that names the coupling exactly: the attribute (`data-sonner-toaster`), the dependency and version (`vue-sonner ^2.0.9`, which `package.json:111` confirms), why no public predicate exists, the single-file blast radius if it is renamed, and the exit condition ("if vue-sonner ships a public predicate, adopt it here"). This is how a reach into a third party's private DOM should be booked. `KeyframesAddDialog.vue:17-22` consumes it correctly, and the target it tests is right: reka dispatches the `interactOutside` CustomEvent **on the original click target** (`reka-ui/dist/DismissableLayer/utils.js:37,103` → `handleAndDispatchCustomEvent`), so `event.target` genuinely is the clicked node, and `preventDefault()` genuinely suppresses the dismiss (`DismissableLayer.js:61-63`).
**Falsifier (L-18 runs both ways).** If `interactOutside` were dispatched on the layer rather than the target, `isInsideToaster(event.target)` would always be false and the guard would be theatre. It is not — the dispatch site is quoted above.

### S-2 · `insertTabAtCursor` reaches the *owning* window, never global `document` · **exemplary**
`utils/contenteditable.ts:9` `const doc = target.ownerDocument.defaultView; const sel = doc?.getSelection();` — with the rationale stated ("so it works inside iframes or any owning window"). The correct instinct in a demo that portals content. Docked only by the fact that the *same component* then reaches global `window.getSelection()` seven lines later (`KeyframesAddDialog.vue:106`) — the discipline is in the util, not in the consumer.

### S-3 · `onSubmit` refuses to close its own dialog · **exemplary**
`:133-136` emits and animates; it does **not** set `open = false`. The close is owned exclusively by the parent's *success* branch (`useKeyframeOps.ts:183`), inside `withErrorToastAsync`. So a failed parse leaves the dialog open with the user's text intact and a `Retry` toast — the correct refusal of optimistic UI. Easy to get wrong; got right.

### S-4 · `useCodeHighlight(() => [addKeyframesEl.value])` — the scoped-ownership contract · **exemplary**
The composable takes a `getOwnedElements` thunk and highlights **only** what the caller hands it, with the bug it cures named in the source: *"never the whole document (D.W3.S1: the global `document.querySelectorAll("pre")` was the bug)"* (`useHighlightCSS.ts:71-76`). The dialog's call site (`:92-94`) is the minimal correct form. This is the right shape for a DOM-touching composable and the right way to record why.

### S-5 · `loadAnimationEngine()` at the point of need — a correct dogfood of the library's own boundary
`:71, :127` reach the heavy surface through the published barrel's documented dynamic accessor rather than a deep `@src/…` import. `demo/kf-engine.ts:12-13` explicitly sanctions this as the **default** idiom ("Most demo sites await `loadAnimationEngine()` directly at their point of need"), reserving the synchronous `kfEngine()` for the scene-machine hot path only. Sixteen other demo sites do the same. The call is idiomatic — L-12's complaint is that its *sibling* diverged, not that this one did.
**Falsifier.** If `kfEngine()` were the canonical accessor, this would be the deviation. `kf-engine.ts:12-13,17-20` says the opposite in prose.

---

## Provenance ledger

| id | severity | file:line | falsifier status |
|---|---|---|---|
| L-1 | BLOCKER | `useHighlightCSS.ts:111` ← `KeyframesAddDialog.vue:103` | survived (a)–(d); (e) CSP `UNPROVEN-NEEDS-DEPLOY-HEADERS` |
| L-2 | MAJOR | `KeyframesAddDialog.vue:135,143` | survived |
| L-3 | MAJOR | `KeyframesAddDialog.vue:24-31` | DOM half survived; utterance `UNPROVEN-NEEDS-LIVE` |
| L-4 | MAJOR | `KeyframesAddDialog.vue:79-80` vs `useKeyframeOps.ts:150` | survived |
| L-5 | MAJOR | `KeyframesAddDialog.vue:60-69` | declaration half survived; weight `UNPROVEN-NEEDS-BUILD` |
| L-6 | MAJOR | `useHighlightCSS.ts:110` vs `:117,124` | survived |
| L-7 | MINOR | `KeyframesAddDialog.vue:106` | ordering survived; caret `UNPROVEN-NEEDS-LIVE` |
| L-8 | MINOR | `KeyframesAddDialog.vue:117-120` | survived, scope narrowed to last-edit-only |
| L-9 | MINOR | `utils/contenteditable.ts:16` | **BLOCKER version FALSIFIED** by value.js `/\s/`; MINOR survives |
| L-10 | MINOR | `KeyframesAddDialog.vue:112-115` | survived |
| L-11 | MINOR | `KeyframesAddDialog.vue:125-131` | survived as latent; live-crash version falsified by boot warm |
| L-12 | MINOR | `KeyframesAddDialog.vue:109-131` vs `KeyframesEditor.vue:218-230,254-258` | survived |
| L-13 | MINOR | `KeyframesAddDialog.vue:41,43,50` | survived |
| L-14 | MINOR | `KeyframesAddDialog.vue:92-94,149-160` | survived |
| L-15 | MINOR | `useHighlightCSS.ts:142-145` | survived as latent; lane-18 framing refined |
| L-16 | INFO | `KeyframesAddDialog.vue:33-39,96-98` | **FALSIFIED** by parent pre-boot |
| L-17 | INFO | path / `R1-05:118` | survived |

**Corpus folded:** lane-frontend `F-1` (re-verified live, §L-5) · T `lane-18-brittle-selectors.md:37` #6 (re-verified, framing refined, §L-15) · V `R1-05-demo-colocation.md:118` (confirmed, §L-17) · E `waves/E.W3.md:259-264` + `audit/styling-findings.md:45` (the `.progress-bar` fold landed; the *animator* twin did not — §L-12) · U `loop/pass2-research-p1-p2.md:235` (`contenteditable.ts` KEEP — confirmed, §L-17).
**Corpus contradicted:** none outright; lane-18 #6's "2 concurrent consumers" hazard is refined to latent-only by the parent/child co-termination the tree now shows (§L-15).

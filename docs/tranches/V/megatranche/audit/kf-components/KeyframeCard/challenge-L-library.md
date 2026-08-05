claude-opus-5[1m]

# CHALLENGE · `KeyframeCard.vue` · axis **L — LIBRARY**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/KeyframeCard.vue` (81 lines)
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser tooling. Livable-only consequences are marked `UNPROVEN-NEEDS-LIVE` for the SS-13 visual audit.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries a falsifier; five hypotheses I raised were **killed by the tree** and are recorded in §4 rather than shipped as findings.

**Read whole (the import closure):**

| file | why |
|---|---|
| `demo/components/instrument/keyframes/KeyframeCard.vue` | the target |
| `demo/components/CopyButton.vue` (113) | `@components/CopyButton.vue` — direct import, `:59` |
| `demo/utils/clipboard.ts` (9) | CopyButton's only non-engine import |
| `node_modules/@mkbabb/glass-ui/dist/{forms,label}.{js,d.ts}`, `dist/components/input/*.d.ts` | `Label` `:57`, `Input` `:58` |
| `demo/components/instrument/keyframes/components/KeyframeCardList.vue` (82) | the sole caller — the prop/expose contract's other half |
| `demo/components/instrument/keyframes/KeyframesEditor.vue` (284) | the emit sink |
| `.../composables/{useKeyframesEditor,useKeyframesParsing,useKeyframeOps,useHighlightCSS}.ts` | co-owners of the card's DOM and lifetime |
| `.../utils/contenteditable.ts`, `demo/utils/formatEditorCSS.ts`, `demo/utils/keyframeSelector.ts`, `demo/components/instrument/utils/iosTextEntry.ts` | reached from the emit sink |
| `src/animation/compile/emit/format.ts`, `src/animation/constants/types.ts`, `/Users/mkbabb/Programming/value.js/src/css/types.ts` | engine contracts the props project from |

**Headline:** **15 defects · 3 BLOCKER · 6 superlatives.** The card is, in isolation, one of the best-shaped components in the demo — 81 lines, no state, no lifecycle, no teardown surface, an exemplary declared child-ref contract (§3 SUP-1/SUP-2). Its defects are almost entirely **contract defects at its two boundaries**: the props it accepts are too weak to catch the caller's blunder (L-1), and the DOM it declares is co-owned by three other modules that mutate and destroy it (L-3, L-4, L-7).

---

## 1. Defects

### L-1 · **BLOCKER** — the start-offset field renders `"[object Object]"`

**Provenance:** `KeyframeCard.vue:5` (`:model-value="frameStart"`), `:37` (`s {{ frameStart }}`), `:65` (`frameStart: string`) ← `KeyframeCardList.vue:11` (`:frame-start="frames[i].start.toString()"`) ← `KeyframeCardList.vue:35` (`frames: any[]`).

The chain, each link verified:

1. `frames` is `animation.templateFrames` (`KeyframesEditor.vue:14,26`).
2. `TemplateAnimationFrame.start` is typed `KeyframeSelector` — `src/animation/constants/types.ts:66`.
3. `KeyframeSelector` is a value.js **plain readonly object union**, not a class:
   `/Users/mkbabb/Programming/value.js/src/css/types.ts:42-44`
   ```ts
   export type KeyframeSelector =
       | Readonly<{ kind: "percent"; value: number }>
       | Readonly<{ kind: "named"; name: "entry"|"exit"|"cover"|"contain"; offset?: number }>;
   ```
   It declares no `toString`. The demo constructs it as an object literal too — `KeyframesEditor.vue:206-209` `frame.start = { kind: "percent", value: scalar.value / 100 }`.
4. `.toString()` therefore resolves to `Object.prototype.toString` → **`"[object Object]"`**.
5. That string is what the card puts in the sticky `<Input>` and in the `s …` gutter label.

The demo **already owns the correct renderer** and does not use it here: `demo/utils/keyframeSelector.ts:7-12` `selectorText(selector)` → `` `${selector.value * 100}%` ``, consumed correctly at `useKeyframeOps.ts:111`.

**Why `tsc --noEmit` is green on this:** `KeyframeCardList.vue:35` declares `frames: any[]`, so `frames[i].start` is `any` and `.toString()` is unchecked; the card then declares `frameStart: string`, which `"[object Object]"` satisfies. **The card's own prop type is the second half of the hole** — it accepts an opaque `string` for a value that has a domain type (`KeyframeSelector`) and a canonical renderer. A prop typed `frameStart: KeyframeSelector` (rendering via `selectorText` internally) or `frameStartLabel: string` fed by `selectorText(...)` makes this class of blunder unrepresentable.

**Card-attributable share:** the stringly-typed prop. **Upstream share:** the `any[]` and the `.toString()`. The fix must land on both.

**Falsifier:** produce a `toString` on the runtime object reaching `frames[i].start` — either a class-based `KeyframeSelector` from `parseKeyframeSelector`, or a `Object.defineProperty` on the literal. Neither exists: `grep -rn "toString" demo/utils/keyframeSelector.ts` → nothing; the type is a `type` alias. Also killed if some caller normalizes `frames` before passing — `KeyframesEditor.vue:14,26` passes `animation.templateFrames` raw.

**Cross-check (a second, independent corruption of the same field, upstream — recorded not counted):** `KeyframesEditor.vue:42-43` writes the raw Slider output into the same selector: `frame.start.value = starts![i]` with `:min="-10" :max="110"`. `selectorText` then multiplies by 100 → a stop authored at slider 50 serializes as `5000%`, while the `onUpdateStart` path (`:206-209`) writes `scalar.value / 100`. **Two different units are written to one field by two controls of the same card.** Falsifier: a normalization between the slider write and `selectorText` — `useKeyframesParsing.ts:64-67` shows none.

---

### L-2 · **BLOCKER** — both glass-ui imports are phantom; the card cannot build from the lockfile

**Provenance:** `KeyframeCard.vue:57` (`import { Label } from "@mkbabb/glass-ui"`), `:58` (`import { Input } from "@mkbabb/glass-ui/forms"`).

Folds **FE lane F-1** (`formation/keyframes/lane-frontend.md` §2) — confirmed independently at HEAD:

```
grep -c "glass-ui" package-lock.json              → 0
grep -n "mkbabb" package.json                     → only "@mkbabb/value.js": "4.0.0"
node_modules/@mkbabb/glass-ui/package.json        → "version": "7.0.0"   (real dir, not a symlink)
```

`npm ci` rebuilds `node_modules` strictly from the lockfile. With zero glass-ui entries, **both of this card's glass-ui specifiers fail to resolve** and `vite build --mode gh-pages` dies at the first import — the card is one of the 42 files that take the repo down. The working tree survives only on a stale `Jul 16 05:17` install.

This is a repo-level defect; it is listed here because the axis brief asks for the phantom-dep exposure **where it bites this component**, and this component's bite is total: two of its five imports, one of them the root barrel.

**Note the contradiction the lane flagged and I re-confirm:** `@lucide/vue` (`:60`) *is* declared — `package.json:74` `"@lucide/vue": "^1.17.0"`. So the card's dependency hygiene is not uniformly bad; the failure is specific to glass-ui.

**Falsifier:** a glass-ui entry appearing in `package-lock.json`, a workspace/`file:` link, an `overrides` block, or a `.npmrc` registry rule that installs it implicitly. `.npmrc` is one line — `legacy-peer-deps=true`. `.gitmodules` declares only `docs/precepts`. None exist.

---

### L-3 · **BLOCKER** — the card is unmounted mid-edit; focus, caret and selection are destroyed

**Provenance:** `KeyframeCard.vue:41-50` (the focus-bearing `contenteditable`), `useKeyframeOps.ts:108-144` (`debounce(…, 1000)` → `:136` `updateAllStringsAndAnimation()`), `useKeyframesParsing.ts:48-60`.

```ts
// useKeyframesParsing.ts:48-54
const updateAllStrings = async () => {
    const { CSSKeyframesToStrings } = await loadAnimationEngine();
    templateFrameStrings.value = [];                       // :50  ← empties the v-for source
    const cards = await CSSKeyframesToStrings(animation);  // :51  ← yields
    templateFrameStrings.value = await Promise.all(
        cards.map((card) => formatEditorCSS(card, getFormatWidth())),   // :52-54
    );
```

Microtask ordering (this is the load-bearing step, derived, not assumed):

- `:50` mutates a `ref` → Vue enqueues `flushJobs` via `resolvedPromise.then(...)` — **microtask M1**.
- `:51` `await` on the async `CSSKeyframesToStrings` enqueues its continuation — **microtask M2**, queued strictly after M1.
- M1 runs first → `KeyframeCardList`'s `v-for` over `frameStrings` (`KeyframeCardList.vue:4`) yields **zero rows** → **every `KeyframeCard` unmounts synchronously during that patch**.
- M2 then runs `:52-54`, which awaits **N dynamic-imported prettier `format()` calls** (`demo/utils/formatEditorCSS.ts:6-14`) before the list is repopulated.

So: type into a card's `<pre>` → stop for 1000 ms → the debounce fires → the whole list blinks empty for the duration of N prettier passes → fresh cards mount. **The `<pre>` the user was editing is torn out of the document.** Focus, caret offset and any selection go with it. The card mounts no `onBeforeUnmount`, saves no selection, and offers no `activeElement` restoration — it has no defense and (as a stateless row) cannot build one alone.

Note this also nullifies the `:key="frames[i]?.id ?? i"` stability work at `KeyframeCardList.vue:5`: keys cannot preserve a child across an *empty* render.

**Card-attributable share:** hosting a focus/caret-bearing editing surface in a component whose identity is derived from a transiently-emptied array, with no focus-preservation contract. **Upstream share:** `:50`, which could hold the old strings until the new ones are in hand (`templateFrameStrings.value = await Promise.all(...)` in one assignment) and delete the blink outright.

**Falsifier:** instrument `onBeforeUnmount` in `KeyframeCard` and type-then-pause; if it never fires between keystroke and repaint the claim is dead. Also killed if `:50`'s assignment were batched with `:52`'s into one flush — it cannot be, two `await`s separate them. `UNPROVEN-NEEDS-LIVE` on the *perceptual* blink duration only; the unmount itself is static.

---

### L-4 · **MAJOR** — Vue and highlight.js co-own one text node; after the first highlight, prop updates are silently swallowed

**Provenance:** `KeyframeCard.vue:41-50` — `<pre ref="preEl" contenteditable="true"><code>{{ formattedCSS }}</code></pre>`; `KeyframeCard.vue:78-80` hands `preEl` out; `KeyframeCardList.vue:76-79` collects it; `useHighlightCSS.ts:116-126`:

```ts
const h = hljs.highlight(el.innerText, { language: "css" });
el.innerHTML = h.value;                    // :123 — el IS the card's <pre>
el.setAttribute("highlighted", "true");    // :124 — one-shot marker
```

`el.innerHTML = …` **destroys the `<code>` element that Vue's vnode holds a reference to**. From that moment the vnode's `el` is an orphan. Every subsequent `formattedCSS` change patches text into a node that is not in the document — no throw, no warning, **no pixel changes**. Vue's virtual DOM and the real DOM are permanently desynchronized for that card's content until the card is remounted.

The two defects interlock in a way worth naming: **L-3's per-edit remount is the only reason L-4 is not permanently visible** — every remount hands the highlighter a fresh, unmarked `<pre>` with an intact Vue `<code>` inside. Fixing L-3 without fixing L-4 makes the card's body freeze at its first highlight.

The idiomatic repair is the one the codebase already uses next door: `CSSCodeEditor.vue` hosts Monaco, which owns its own DOM outright. A `contenteditable` whose content is a reactive interpolation is unsound by construction — the browser and Vue both claim write authority over the same text node.

**Falsifier:** show `highlight()` writing into a child element Vue does not own (it writes to `el` itself, `:123`), or show `formattedCSS` never changing after the first highlight for a given card instance (`KeyframeCardList.vue:50-52` recomputes it from `frameStrings` on every edit). Neither holds.

---

### L-5 · **MAJOR** — iOS Safari auto-zooms on focusing the editor; the sibling editor defends, this one does not

**Provenance:** `KeyframeCard.vue:45` — `class="… text-small …"` on the `contenteditable`.

Token resolution, fully static:

- `text-small` → `--text-small: var(--type-small)` — `node_modules/@mkbabb/glass-ui/dist/styles/theme/bridges.css:1`
- `--type-small: clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` — `node_modules/@mkbabb/glass-ui/dist/styles/typography/scale.css:1`
- At a 375 px viewport: `0.8rem + 0.25vw` = 12.8 + 0.94 = **13.74 px** → clamped to the floor **0.875rem = 14 px**.

Safari zooms the viewport on focus for any editable host — `input`, `textarea`, **or `contenteditable`** — computing below 16 px. 14 px < 16 px.

The repo knows this. `demo/components/instrument/utils/iosTextEntry.ts:10-11` exists for exactly this:

```ts
export const clampIOSNoZoomFontSize = (fontSize: number): number =>
    isIOSLikePlatform() ? Math.max(fontSize, 16) : fontSize;
```

Its **only** consumer is the other CSS editor in the same directory — `CSSCodeEditor.vue:39,137` (`fontSize: clampIOSNoZoomFontSize(props.fontSize)`). The card's `<pre>` is not routed through it, and there is no CSS escape hatch either: `grep -rn "\.ios" demo/styles/*.css` → **zero rules**, despite `initIOSPlatformClass` (`iosTextEntry.ts:14-17`) stamping `.ios` on `<html>` for CSS to scope against.

The card's `<Input>` (`:4`, `text-subheading` → `--type-subheading: 1.272rem` = 20.35 px) is safe. The bite is the `<pre>` alone.

**Falsifier:** `--type-small` resolving ≥ 16 px on a mobile viewport (it cannot — the clamp floor is 0.875rem), a `.ios` override raising it (none exist), or a `<meta name=viewport user-scalable=no>` suppressing the zoom. `UNPROVEN-NEEDS-LIVE` on the last one only — check `demo/index.html`'s viewport meta during SS-13.

---

### L-6 · **MAJOR** — the copy button announces a copy that may not have happened, and leaks an unhandled rejection

**Provenance:** `CopyButton.vue:51-63` (imported at `KeyframeCard.vue:59`, rendered at `:26`), `demo/utils/clipboard.ts:3-8`.

```ts
// CopyButton.vue:51-63
const handleClick = () => {
    copyText(text);                    // :52  no await, no .catch, no void
    isCopied.value = true;             // :54  unconditional
    liveStatus.value = "";
    requestAnimationFrame(() => {
        liveStatus.value = "Copied to clipboard";   // :59 unconditional AT announcement
    });
    void group.value?.play();          // :62  the check-mark animation, unconditional
};
```

```ts
// demo/utils/clipboard.ts:3-5
export async function copyText(text: string, ...): Promise<void> {
    await navigator.clipboard.writeText(text);   // no try/catch
```

`navigator.clipboard.writeText` rejects on an insecure context, a denied permission, or (Safari) a write not attributable to a user gesture. On rejection: an **unhandled promise rejection** propagates, *and* the UI has already flipped the icon, played the bounce, and told a screen-reader user "Copied to clipboard". A silent, confident lie.

The idiom failure is precise and self-evident inside the same function: `:62` marks its intentional fire-and-forget with `void`; `:52` — the one call that can actually reject — is not even marked. `withErrorToastAsync` (`useKeyframeOps.ts:25-40`) is the codebase's own established posture for exactly this shape and is not reached here.

**Falsifier:** a global `unhandledrejection` handler swallowing it (grep `demo` for `unhandledrejection` → none), or `copyText` gaining a `try/catch` (it has none, 9 lines total). The false-success half is unconditional control flow — unfalsifiable short of editing `:54-62`.

---

### L-7 · **MAJOR** — the `keydown` pass-through injects U+00A0 into CSS and bypasses the card's own change channel

**Provenance:** `KeyframeCard.vue:44` (`@keydown="(e) => emit('keydown', e)"`) → `KeyframesEditor.vue:224-227` → `demo/components/instrument/keyframes/utils/contenteditable.ts:8-22`.

```ts
// contenteditable.ts:16
const tabNode = target.ownerDocument.createTextNode("\u00a0\u00a0\u00a0\u00a0");
range.insertNode(tabNode);   // :17
```

Two consequences, both from the card's emit contract exporting raw keyboard authority without a matching write-back:

1. **The edit never reaches the model.** `range.insertNode` is a programmatic DOM mutation; it fires **no `input` event**. The card's `@input` (`:43`) — its only `updateCSS` channel — never runs. The tab exists in the DOM and nowhere else, and L-3's next remount erases it.
2. **The next real keystroke poisons the parser.** Once the user types again, `@input` reads `innerText` (`:43`), which now carries four **non-breaking spaces**. U+00A0 is **not CSS whitespace** — CSS Syntax defines whitespace as U+0009, U+000A, U+0020 only; U+00A0 is a valid ident code point. That string is wrapped at `useKeyframeOps.ts:111` and handed to `parseAnimationCSS` (`:116`), which will not tokenize it as separation.

Nothing normalizes it: `grep -rn '\\u00a0\|\\xa0\|nbsp' --include=*.ts --include=*.vue src demo` returns **exactly one hit — the insertion site itself**.

**Card-attributable share:** the card emits `keydown` with no reciprocal "the parent mutated my DOM, re-read it" path, so any parent-side edit is by construction invisible to the model. A `defineExpose`d `syncFromDOM()` (the card already exposes `preEl`) or a parent-side `dispatchEvent(new InputEvent("input", {bubbles:true}))` closes it.

**Falsifier:** show `parseAnimationCSS` tolerating U+00A0 as separation, or a normalization step between `innerText` and the parser. Neither found. Also killed if `insertNode` fired `input` in the target browsers — it does not (only user-agent-driven editing commands do).

---

### L-8 · **MINOR** — `CopyButton` has no teardown; two CSS parses + compiles per card, re-run on every L-3 remount

**Provenance:** `CopyButton.vue:65-102` — an `onMounted` that constructs two `CSSKeyframesAnimation` instances via `.fromString(...)` (`:69-93`), an `AnimationGroup` (`:95`), and binds both to DOM with `setTargets` (`:98-99`). There is **no `onUnmounted`** anywhere in the file.

Every `KeyframeCard` renders one `CopyButton` (`:26`). Under L-3, the entire card list is destroyed and rebuilt roughly once per second of editing, so an N-keyframe animation re-parses and re-compiles **2 × N runtime `@keyframes` strings per edit cycle**, in addition to the N prettier passes at `useKeyframesParsing.ts:52-54`.

**Scope discipline — what I am *not* claiming:** I searched for a module-level animation registry that would make these objects unreclaimable (`grep -rn "^const .*= new \(Set\|Map\)" src/animation/{group,engine/css,timing}` → nothing; the only `globalThis.Animation` references are WAAPI handle arrays local to a group instance, `src/animation/group/group.ts:91`). **I could not prove a retention leak.** The proven defect is unbounded allocation and parse *churn* plus a missing teardown contract, not unbounded memory.

Secondary, same file: `handleClick`'s `requestAnimationFrame` (`:58-60`) is never cancelled; if the card unmounts in that frame the callback writes to a dead ref. Harmless, but it is the same missing-`onUnmounted` root.

**Falsifier:** find a global registry retaining these instances (would *upgrade* this to a leak), or show the cards do not remount (L-3's falsifier). Folds FE lane **S-7**, extending it: the lane flagged CopyButton's runtime JS-string `@keyframes` injection at `:70,:83`; the *lifecycle* half is new here.

---

### L-9 · **MINOR** — dead `data-destructive` attribute justified by a gate that does not exist

**Provenance:** `KeyframeCard.vue:15-19` (the comment) and `:22` (the attribute).

> `…and is destructive-MARKED so proof:accent-census's red-census recognizes the role.`

Both halves of that justification fail:

- **`data-destructive` has exactly one occurrence in the repository.** `grep -rn "data-destructive" --include=*.{css,vue,ts,mjs} demo scripts` → `KeyframeCard.vue:22` only. No CSS rule selects it, no gate script reads it. It is inert markup.
- **`proof:accent-census` is not a script.** `package.json` scripts are `proof:publish` and `proof:owner-golden` only. The sole mention of `accent-census` in the tree is a historical verdict record, `docs/tranches/T/verdicts/APPEARANCE-WAVES.json:25,27`.

So the comment cites a consumer that was retired, and the attribute survives it. This also collides with the owner's standing retirement of the grep-based `proof:*` invariant idiom (memory: *feedback-proof-idiom-retired*, "overfit junk… never re-introduce"). Either the attribute earns a live consumer or both it and its 5-line justification go.

**Falsifier:** any CSS selector, gate script, or test reading `[data-destructive]`, or an `accent-census` runner anywhere outside `docs/`. Searched `demo/` and `scripts/` — none.

---

### L-10 · **MINOR** — a sticky in-card number field is stamped `z-modal`

**Provenance:** `KeyframeCard.vue:4` — `class="sticky z-modal …"` on the `<Input>`.

The demo single-sources its stacking order and documents each rung's meaning:

```
demo/styles/style.css:34-35
     --z-overlay  :  50  scrim / backdrop overlays
     --z-modal    : 140  modal dialogs — above everything
```

(the utility is real — `--z-index-modal: var(--z-modal)` at `glass-ui/dist/styles/theme/bridges.css:1`.)

The card's start-offset input is not a modal dialog. It is stamped above `z-overlay` (50, the scrim), above `z-popover` (130, `SharePopover`), and level with `z-modal` (140, `KeyframesAddDialog` — a `Dialog` rendered from the *same editor*, `KeyframesEditor.vue:75-80`). The only other `z-modal` in the demo is `MbabbMenu.vue:6`, a genuine `DropdownMenuContent`. `z-controls` (20) is the rung this control's role maps to.

**Provable statically:** the token-contract violation — a non-modal claiming the modal rung, against the file's own documented semantics.
**`UNPROVEN-NEEDS-LIVE`:** whether it actually paints through the Add-Keyframes dialog scrim. `position: sticky` + `z-index` creates a stacking context, but escape depends on ancestors; `Card` (`KeyframesEditor.vue:10`) and `CardContent` (`:11`, `relative` with `z-index: auto`) do not obviously trap it. Worth 30 seconds in SS-13: open the dialog with the card list scrolled.

---

### L-11 · **MINOR** — unchecked `e.target` cast while the typed element is already in hand

**Provenance:** `KeyframeCard.vue:43` — `@input="(e) => emit('updateCSS', (e.target as HTMLElement).innerText)"`, against `:42`/`:78` which declare and hold `preEl`.

`e.target` is `EventTarget | null`; the cast asserts past both the null and the interface. Meanwhile the component already owns `const preEl = useTemplateRef<HTMLElement>("preEl")` — a declared, typed, checkable reference to the very same element. `preEl.value?.innerText` (or `e.currentTarget`, which is typed and guaranteed to be the listener's element) is both correct and type-honest, and needs no assertion.

The same anti-pattern is repeated across the boundary at `KeyframesEditor.vue:226` (`insertTabAtCursor(e.target as HTMLElement)`), where it is materially worse because that function immediately dereferences `target.ownerDocument`.

Secondary, same line region: `useTemplateRef<HTMLElement>("preEl")` (`:78`) widens what is statically an `HTMLPreElement`. Costless here, but it is the generic that would have to narrow if anything ever wanted `<pre>`-specific API.

**Falsifier:** show that `input` on a `contenteditable` can target a descendant rather than the editing host (it cannot — the editing host is the event target), or that `preEl` is unavailable at handler time (it is bound before any user input).

---

### L-12 · **MINOR** — mixed glass-ui entry granularity inside one 81-line file

**Provenance:** `KeyframeCard.vue:57` (`import { Label } from "@mkbabb/glass-ui"` — the root barrel) vs `:58` (`import { Input } from "@mkbabb/glass-ui/forms"` — a subpath).

glass-ui 7.0.0 exposes **73** subpath exports, including a dedicated `./label`:

```
dist/glass-ui.js   23,938 B   ← what :57 pulls
dist/label.js           69 B   ← "import { t as e } from './label-DJA3eNLS.js'; export { e as Label };"
dist/forms.js       9,516 B
```

In a production Rollup build the barrel tree-shakes; **in `vite dev` it does not** — the whole 24 KB barrel and its transitive component graph enter this card's module chain to fetch one `<label>` wrapper. Two entry points for two primitives in one file is also just incoherent: the file demonstrates both idioms and picks the coarser one for the smaller need.

Folds FE lane §3.1 (21/73 subpaths reached, root barrel the top consumer at 31 sites) — this is one of those 31, and one of the cheapest to retire.

**Falsifier:** `./label` not existing (it does, listed in `package.json#exports`), or the root barrel being type-only (it is 24 KB of runtime).

---

### L-13 · **MINOR** — the destructive affordance is a bare `<svg>` with a click handler, where glass-ui ships `./button`

**Provenance:** `KeyframeCard.vue:20-25`.

```html
<X @click="(e) => emit('remove', e)" data-destructive class="… cursor-pointer …" />
```

`X` renders an `<svg>`. It carries `@click` and `cursor-pointer` but no `role`, no `tabindex`, no `type`, no keyboard handler and no accessible name. glass-ui exports `./button` (verified in the 73-subpath map) and the demo already uses `Button` from the root barrel at eight sites; `KeyframesEditor.vue:87-95` shows the demo's own correct fallback shape — a real `<button type="button">` with `aria-label` and `:aria-pressed` wrapping a `pointer-events-none` lucide glyph.

I am filing this on the **library axis** as a design-system-consumption defect (an available primitive bypassed for a raw element, in a file that already imports two other glass-ui primitives). The keyboard-and-screen-reader consequence — the only destructive action on the card is unreachable without a mouse — is the a11y axis's to price, and is **referred, not double-counted here**.

The internal inconsistency is the tell: the same 81 lines give the `<pre>` a careful, complete ARIA triple (`:47-49`, and see SUP-5) and give the delete control nothing.

**Falsifier:** `X` internally rendering a `<button>` or defaulting `role`/`tabindex` — lucide vue icons render a bare `<svg>` with `v-bind="$attrs"`; nothing in `:20-25` supplies them.

---

### L-14 · **INFO** — the clipboard gets something different from what the card displays, unannounced

**Provenance:** `KeyframeCard.vue:26` (`<CopyButton :text="frameString" />`) vs `:50` (`<code>{{ formattedCSS }}</code>`).

The two props are **not** the same string:

- `frameString` = `templateFrameStrings[i]` = `` `${selectorText(start)}\n${declaredKeyframeBody(...)}\n` `` (`src/animation/compile/emit/format.ts:131-133`) run through prettier (`useKeyframesParsing.ts:52-54`) — i.e. a complete `0% { … }` block.
- `formattedCSS` = that string with the selector and both braces stripped by `formatCSSKeyframeString` (`format.ts:136-147`: `.replace(/^[^{]*{/, "").replace(/}\s*$/, "")`), applied at `KeyframeCardList.vue:50-52` — i.e. the declaration body only.

Copying the whole pasteable block is a defensible choice, arguably the better one. But nothing communicates it: `CopyButton`'s accessible name is the generic default `"Copy to clipboard"` (`CopyButton.vue:4,28`), and the card passes no `label`, so a user copying "these three declarations" silently receives four lines including a selector. One `label="Copy keyframe block"` at `:26` resolves it.

**Falsifier:** `formatCSSKeyframeString` being an identity on these inputs — it is not; `CSSKeyframesToStrings` always emits the selector at `format.ts:132`.

---

### L-15 · **INFO** — zero test coverage, in a suite that tests its neighbours

**Provenance:** `grep -rln "KeyframeCard" --include=*.ts --include=*.vue --exclude-dir=node_modules .` → **two hits, both production source** (`KeyframesEditor.vue`, `KeyframeCardList.vue`). No test file references the card, and no test in `test/demo/` touches `useKeyframeOps`, `useKeyframesParsing`, `useHighlightCSS` or `CopyButton`.

This is not an absent capability: `vitest.config.ts:51-52` defines a real `demo` project with the aliases wired, and `test/demo/instrument/` already holds nine suites — including `KfPillTabs.test.ts` and `kf-toolbar-keyboard.test.ts`, i.e. sibling components of the same instrument. The keyframes card cluster is simply unclaimed.

L-1 in particular is a **three-line unit test** (`mount(KeyframeCardList, { props: { frames: [{ id: 0, start: { kind: "percent", value: 0.5 } }], frameStrings: ["0% { opacity: 0 }"] } })`, assert the input's value is `"50%"` and not `"[object Object]"`), which is the strongest argument that the gap is causal and not incidental.

**Falsifier:** a test reaching the card through a higher-level mount — none of the nine `test/demo/instrument/` suites mounts `KeyframesEditor`.

---

## 2. Severity roll-up

| id | severity | one-line |
|---|---|---|
| L-1 | **BLOCKER** | start-offset renders `"[object Object]"`; stringly-typed prop + `any[]` caller hides it from `tsc` |
| L-2 | **BLOCKER** | both glass-ui imports phantom; `npm ci` cannot resolve them (folds F-1) |
| L-3 | **BLOCKER** | list emptied mid-edit → the focused `contenteditable` is unmounted; focus/caret lost |
| L-4 | MAJOR | `innerHTML` highlight orphans the `<code>` vnode; later prop patches are invisible |
| L-5 | MAJOR | `text-small` = 14 px floor → iOS focus-zoom; the sibling editor uses the repo's own clamp, this does not |
| L-6 | MAJOR | floating `copyText` → unhandled rejection + unconditional false "Copied" announcement |
| L-7 | MAJOR | Tab injects U+00A0 (not CSS whitespace) and never reaches the model — no `input` event |
| L-8 | MINOR | `CopyButton` has no `onUnmounted`; 2 CSS parse+compiles per card per remount cycle |
| L-9 | MINOR | `data-destructive` has zero consumers; its justifying gate `proof:accent-census` does not exist |
| L-10 | MINOR | a sticky in-card `<Input>` claims `z-modal` (140), against style.css's documented rung meaning |
| L-11 | MINOR | `e.target as HTMLElement` while the typed `preEl` is already in hand |
| L-12 | MINOR | root barrel (24 KB) for `Label` beside a subpath import for `Input`, in one file |
| L-13 | MINOR | destructive control is a raw `<svg @click>`; glass-ui `./button` unreached |
| L-14 | INFO | clipboard content ≠ displayed content, with a generic accessible name |
| L-15 | INFO | zero tests, in a suite that already covers sibling instrument components |

**15 defects · 3 BLOCKER · 4 MAJOR · 6 MINOR · 2 INFO.**

---

## 3. Superlatives (L-18 runs both ways)

### SUP-1 — the declared child-ref contract, which killed a real prior bug

`KeyframeCard.vue:76-80`:
```ts
// The card's own contenteditable <pre> — surfaced for the parent's scoped
// highlight collection (a declared child-ref contract, no querySelector).
const preEl = useTemplateRef<HTMLElement>("preEl");
defineExpose({ preEl });
```
consumed at `KeyframeCardList.vue:74-81` (`getPreElements()`), consumed at `KeyframesEditor.vue:176-178`, honoured at `useHighlightCSS.ts:78-80,132-138`.

The composable's own docblock records what this replaced — `useHighlightCSS.ts:75-76`: *"highlights ONLY the elements the caller hands it via `getOwnedElements` — never the whole document (D.W3.S1: the global `document.querySelectorAll("pre")` was the bug)."* Every link in that chain is a *declared* ownership hand-off; the card publishes exactly one element and nothing reaches around it. This is the exemplary pattern for scoped DOM ownership in the demo and should be the cited template when the timeline cluster (FE lane S-3) is specced.

*(The `preEl` ref survives `defineExpose` unwrapping correctly — Vue's expose proxy runs `proxyRefs`, so `c?.preEl` at `KeyframeCardList.vue:78` yields the element, not a `Ref`. Verified by reading the consumer's type guard `(el): el is HTMLElement`. The contract is not just declared, it is correctly typed.)*

**Falsifier:** a surviving `querySelectorAll` on the highlight path, or a consumer reaching into the card's DOM directly. `grep -rn "querySelector" demo/components/instrument/keyframes/` → the only hits are `document.head.querySelector("#…")` for the `<style>` singletons (`useHighlightCSS.ts:31,95`), which is the documented head-stylesheet idiom, not a content reach.

### SUP-2 — Goldilocks: a list row with **zero teardown surface of its own**

81 lines. Four props, four emits, one expose, one template ref. **No `onMounted`, no `onUnmounted`, no watcher, no timer, no listener registration, no local state, no engine object.** Every mutation leaves through an emit; the card owns no model and therefore can leak nothing. This is the correct shape for a `v-for` row, and it is precisely why the card is *cheap* to unmount 60 times a minute (L-3) rather than catastrophic. Contrast its 229-line `CSSCodeEditor.vue` sibling and its 284-line `KeyframesEditor.vue` grandparent.

**Falsifier:** any lifecycle hook or subscription in the file. There is none — `:55-81` is the entire script block.

### SUP-3 — `innerText`, not `textContent`, is the correct read

`KeyframeCard.vue:43`. Under `contenteditable`, browsers materialise line breaks as `<div>`/`<br>` nodes; `textContent` would concatenate every line into one, silently destroying the user's CSS structure on the first Enter. `innerText` returns the rendered text with line breaks intact. It costs a forced reflow per keystroke — the correct trade here, and the non-obvious choice. A reviewer optimising this to `textContent` would introduce a data-loss bug.

### SUP-4 — `String(val)` is a necessary, type-honest boundary narrowing

`KeyframeCard.vue:6`. I raised this as a suspected nullish-laundering defect (`String(undefined)` → `"undefined"` reaching `parseCssScalar` at `KeyframesEditor.vue:186` and surfacing as a diagnostic about the demo's own coercion). **The tree killed it:** `node_modules/@mkbabb/glass-ui/dist/components/input/Input.vue.d.ts:4` declares `"update:modelValue": (value: string | number) => any` — never nullish. `String(val)` is exactly the narrowing required to satisfy the card's own `(e: "updateStart", val: string)` emit contract without an assertion. Correct, and correct for a reason.

### SUP-5 — a complete, correct ARIA triple on the editing host

`KeyframeCard.vue:46-49`: `contenteditable="true"` + `role="textbox"` + `aria-multiline="true"` + `:aria-label="\`CSS for keyframe ${index}\`"`. That is the full, specified pattern for a multiline custom editing host, including a per-instance name that disambiguates N identical cards in the a11y tree. Unprompted and unusual. (It makes L-13's naked `<svg>` all the more conspicuous — the same author clearly knew.)

### SUP-6 — the destructive colour routes through the token bridge, not a literal

`KeyframeCard.vue:23` uses `text-accent-red`, which resolves `--color-accent-red: var(--accent-red)` (`demo/styles/style.css:58`, mirrored in `glass-ui/dist/styles/theme/bridges.css:1`) to the demo's one sanctioned red home (`style.css:115-119`, `--accent-red: hsl(0 72% 63%)` / dark `:187`). I tried to kill this as a phantom utility and failed — the bridge exists in both themes. The *token* half of the `:15-19` comment is true and well executed; only its *gate* half is dead (L-9).

---

## 4. Hypotheses raised and killed by the tree

Recorded so the next reader does not re-run them, and as evidence the falsifiers were actually exercised.

| # | hypothesis | killed by |
|---|---|---|
| R-1 | `:key="frames[i]?.id ?? i"` collapses to index keys, so deleting a card patches the wrong content into a surviving instance | `TemplateAnimationFrame` declares `id: number` — `src/animation/constants/types.ts:65`. Keys are stable. *(L-3 makes the point moot anyway: an empty render unmounts everything regardless of keys.)* |
| R-2 | `text-accent-red` is a phantom utility — the token is `--accent-red`, not `--color-accent-red`, so Tailwind generates nothing | `demo/styles/style.css:58` and `glass-ui/dist/styles/theme/bridges.css:1` both declare `--color-accent-red`. → became SUP-6. |
| R-3 | `String(val)` (`:6`) launders `undefined`/`null` into `"undefined"` on a cleared field | glass-ui emits `string \| number` — `dist/components/input/Input.vue.d.ts:4`. → became SUP-4. |
| R-4 | `z-modal` (`:4`) is an undefined utility, so the `sticky` never actually stacks | `--z-index-modal: var(--z-modal)` — `bridges.css:1`. The utility is real; the *misuse* survives as L-10. |
| R-5 | `formattedCSS` never reaches first paint — L-4's highlight lands before `KeyframeCardList`'s async `formatFn` resolves, so cards permanently show the raw string | Ordering refutes it: `formatFn` resolves off `loadAnimationEngine()` (`KeyframeCardList.vue:46-48`), while the first render is gated behind `formatEditorCSS` → a **prettier + postcss dynamic import** (`useKeyframesParsing.ts:52-54`, `formatEditorCSS.ts:6-9`), which is far slower. Cards mount already-formatted. Downgraded to a note inside L-4. |

---

## 5. Corpus reconciliation

| hitherto id | this challenge |
|---|---|
| **FE F-1** (glass-ui phantom dep, RED) | **CONFIRMED at HEAD** and localised to this component's two import sites — **L-2**. Re-measured independently: lockfile hits 0, `node_modules` 7.0.0, `@lucide/vue` correctly declared at `package.json:74`. |
| **FE §3.1** (21/73 subpaths; root barrel = 31 sites) | **EXTENDED** — **L-12** shows one file consuming *both* granularities, with `./label` (69 B) available beside a 24 KB barrel import. One of the 31, and the cheapest to retire. |
| **FE §3.2** (cites `KeyframeCard.vue:58` for the `/forms` import) | Confirmed exact. The census recorded `:58` and missed `:57`'s root-barrel `Label` — noted, not a contradiction (the census counted files, not lines). |
| **FE §4 roster** (`KeyframeCard.vue`, 81 lines, `Label` + `Input`) | **CONFIRMED byte-for-byte** at HEAD: 81 lines, `Label` + `Input`, glass-consuming. |
| **FE S-7** (`CopyButton`, 113 lines, "independent defect: runtime JS-string `@keyframes` injection at `:70,:83`") | **CONFIRMED and EXTENDED.** The lane found the injection; **L-6** (unhandled rejection + false success, `:52-62`) and **L-8** (no `onUnmounted` for `:65-102`'s engine objects) are new, and L-8's cost is amplified by L-3's remount churn — a coupling neither lane could see, since it only appears through this card. |
| **FE S-8** (`TypingDots` = the justified engine-dogfood bespoke) | Consistent. This card's engine consumption is **indirect** — via `CopyButton` (`loadAnimationEngine`) and the parent's `formatCSSKeyframeString` — and the *lazy* posture (`loadAnimationEngine()` over deep `@src` imports, `CopyButton.vue:45-49`, `KeyframeCardList.vue:38-48`) is idiomatic and correctly commented. No engine misuse is attributable to this card. |
| **LIB lane** (parse seams) | Touched at one point: **L-7** puts U+00A0 into `parseAnimationCSS`'s input. That is a *demo-side* corruption of the parser's contract, not a parser defect — the engine is right to reject it. |
| **CENSUS SCH-2 / AGG-P2** | Untouched by this component; no contradiction. |

**Where I contradict the corpus:** nowhere. The census lanes measured breadth; the three BLOCKERs here (L-1, L-3, and L-2's local bite) are depth findings that a file-level census could not surface — L-1 in particular is invisible to `tsc` and to every grep, and only appears by resolving `KeyframeSelector` across the value.js boundary.

---

## 6. What SS-13 (visual, live) should carry forward

1. **L-1** — open the keyframes editor; read the sticky start field. If it says `[object Object]`, the top blocker is confirmed in one glance. *(Also check the `s …` gutter label, `:37`.)*
2. **L-3** — focus a card's `<pre>`, type, pause ~1.2 s. Watch for the list blink and for focus loss.
3. **L-5** — the same `<pre>` on a real iPhone: does Safari zoom on focus? Check `demo/index.html`'s viewport meta first (the one remaining falsifier).
4. **L-10** — open `KeyframesAddDialog` with the card list scrolled; does the sticky start `<Input>` paint over the scrim?
5. **L-6** — click copy over `http://` (insecure context) and watch the console for the unhandled rejection while the check-mark still plays.

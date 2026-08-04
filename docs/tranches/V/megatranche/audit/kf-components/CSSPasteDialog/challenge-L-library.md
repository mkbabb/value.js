claude-opus-5[1m]

# CHALLENGE · `CSSPasteDialog.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/timeline/CSSPasteDialog.vue` (80 lines)
**Mode** static, read-only. No installs, no dev server, no browser. Anything whose *visible symptom* needs a live page is tagged **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit; the *mechanism* behind each such tag is proven from the tree.
**Read whole** the component + every import: `@components/instrument/utils/toastGuard`, the six `@mkbabb/glass-ui` barrel symbols (resolved into `node_modules/@mkbabb/glass-ui/dist`), its sole consumer `KeyframeTimeline.vue`, its near-twin `KeyframesAddDialog.vue`, the reka-ui `DismissableLayer` seam, and the Vue 3.5 patch path in `node_modules/@vue/runtime-{core,dom}`.

**Counting convention.** `defects = BLOCKER + MAJOR + MINOR` = **12** (1 / 4 / 7). `INFO` rows are observations and are **not** counted. Cross-file defects whose fix lands in another component are recorded as INFO with an explicit hand-off, so they are not double-counted against that component's own challenge.

| | count |
|---|---|
| BLOCKER | 1 |
| MAJOR | 4 |
| MINOR | 7 |
| **defects** | **12** |
| INFO | 7 |
| superlatives | 4 |

---

## 0. Headline

| id | severity | claim |
|---|---|---|
| **L-1** | **BLOCKER** | The editable surface is a `contenteditable` `<pre>` whose text is *also* a Vue interpolation. Every `input` event provably drives `codeEl.textContent = <new string>`, destroying the DOM node the caret lives in; and Vue provably never reconciles nodes the browser inserts as siblings of `<code>`. At least one of {caret destruction, permanent content duplication} occurs on **every** keystroke. |
| **L-2** | MAJOR | `<DialogContent>` is mounted without `scroll` (glass-ui default `false`). The `<pre>` grows without bound and nothing in the chain owns overflow → a large paste pushes the Import button off-viewport with no scrollable ancestor. |
| **L-3** | MAJOR | `submit` has no acknowledgement channel. The consumer fires an un-awaited async import that toasts its own failures, closes the dialog synchronously, and the open-watch wipes `text` → **the user's paste is destroyed on parse failure with no retry**. A sixth failure posture on the parse seam (extends lane-library §7.5). |
| **L-4** | MAJOR | Near-twin duplication with `KeyframesAddDialog.vue`: byte-identical `@interact-outside` handler, identical `onInput` body, identical `<pre><code>{{ text }}</code></pre>` shape, identical 6-symbol glass-ui barrel import. The generic member even carries a `footer-extra` slot that exactly fits the specific member's progress bar — a merge that was designed and abandoned. |
| **L-5** | MAJOR | glass-ui ships **`Textarea`** on `@mkbabb/glass-ui/forms` — the *same subpath the sole consumer already imports* — and the demo uses it zero times. Shadow-census extension **S-9** (lane-frontend S-1..S-8 never asked this question). |
| L-6 | MINOR | `ref="textEl"` + `useTemplateRef` + `defineExpose({ textEl })` is a dead triple — unused internally, unread by any consumer, and it leaks a private DOM handle as public API. |
| L-7 | MINOR | Speculative generality: three of the component's configuration surfaces (`initialText`, `preClass`, slot `footer-extra`) are unused by **both** of its two mounts. |
| L-8 | MINOR | `preClass` **replaces** rather than merges the base class string, so any consumer that ever uses it silently loses `font-mono outline-none border`. Diverges from the house `cn()` idiom, which glass-ui exports from the barrel this file already imports. |
| L-9 | MINOR | `font-mono` and `text-small` are both single-class rules declaring `font-family`; equal specificity means source order decides whether the CSS box actually renders monospace. **UNPROVEN-NEEDS-LIVE.** |
| L-10 | MINOR | `toastGuard.ts:27` casts an `EventTarget` to `Element` unguarded and calls `.closest` on it — a `TypeError` posture in the one module whose doc-block sells it as the hardened seam. |
| L-11 | MINOR | Imports 6 symbols from the glass-ui **root barrel** (62-file / 215 KB static graph) where `./dialog` (11 files / 22 KB) and `./button` exist and the sole consumer already uses subpaths. Idiom drift only — I falsified the bundle-bloat version of this claim myself (see the finding). |
| L-12 | MINOR | `min-h-[20vh]` (line 54) is an arbitrary viewport bracket that `T.D.md:606` and `17-styles-idioms.md:345` already slated for `tokens.css`. Still here — an unfixed carry, not a new find. |

---

## 1. BLOCKER

### L-1 — the contenteditable ↔ VDOM contention: every keystroke rewrites the node the caret is in

**Severity** BLOCKER. **Provenance** `CSSPasteDialog.vue:13-18, 71-73` (+ Vue runtime, cited below).

```vue
<pre ref="textEl" @input="onInput" :class="preClass" contenteditable="true"
><code>{{ text }}</code></pre>
```
```ts
const onInput = (e: Event) => { text.value = (e.target as HTMLElement).innerText; };   // :71-73
```

The `<code>` element's text is **both** browser-owned (the user edits it) and Vue-owned (a `{{ text }}` interpolation). I compiled the SFC template with the repo's own `@vue/compiler-sfc` to remove all guesswork:

```
_createElementVNode("pre", { ref: "textEl", onInput: …, class: _normalizeClass(_ctx.preClass),
                             contenteditable: "true" },
  [ _createElementVNode("code", null, _toDisplayString(_ctx.text), 1 /* TEXT */) ],
  34 /* CLASS, NEED_HYDRATION */)
```

Two facts follow mechanically, both citable in the installed runtime:

1. **The `<code>` text node is replaced wholesale on every input.** `patchFlag 1 /* TEXT */` routes to
   `node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5823-5827`
   ```js
   if (patchFlag & 1) { if (n1.children !== n2.children) { hostSetElementText(el, n2.children); } }
   ```
   and `hostSetElementText` is `node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:48-50`
   ```js
   setElementText: (el, text) => { el.textContent = text; }
   ```
   `el.textContent = …` removes **all** children and appends one fresh `Text`. Per the DOM standard's removing-steps, a live range anchored in a removed node collapses onto the parent at the removed node's index — the caret ends at `(<code>, 0)`, i.e. the **start** of the box, on every keystroke. Typed characters therefore accumulate out of order.

2. **Vue never reconciles what the browser inserts into `<pre>`.** The `<pre>` carries `patchFlag 34` (CLASS | NEED_HYDRATION) and is not a block, so `n2.dynamicChildren` is null; `patchBlockChildren` re-enters `patch(..., optimized = true)` (`runtime-core.esm-bundler.js:5856-5866`), and `patchElement`'s children branches are guarded by exactly `if (dynamicChildren) … else if (!optimized) …` (`:5773`, `:5786`). Neither arm runs. Only the `class` prop is patched. Any node the browser creates as a **sibling** of `<code>` — the common case when `<code>` is empty, which is precisely the shipped default (`initialText: ""`, and neither mount overrides it) — is invisible to Vue forever, while its text is simultaneously mirrored into `codeEl.textContent`. That is permanent, compounding duplication.

So on each `input` the component lands in case (a) — insertion inside `<code>` → caret destroyed — or case (b) — insertion beside `<code>` → content duplicated *and* caret destroyed. There is no third case. The disjunction is proven statically; only *which* branch a given browser takes is a live question.

**Why BLOCKER and not MAJOR.** The component's whole purpose is text entry into a CSS box ("Paste CSS @keyframes to load into the timeline", `KeyframeTimeline.vue:138`). Editing after the paste — fixing a typo, deleting a stray brace, typing a short `@keyframes` by hand — is broken by construction, not by edge case. I considered downgrading on the grounds that the dominant flow is one paste + one click, which may survive; I am recording that caveat rather than hiding it, but a text-entry surface where the caret cannot survive a keystroke is not shippable.

**Falsifier.** Open either timeline dialog, click into the box, type `abc`. If the box reads `abc` with the caret after `c`, and a second character typed mid-string lands where the caret was, L-1 is dead. Equivalently: a live check showing `pre.childElementCount === 1` and `getSelection().anchorNode` still inside `<code>` after ten keystrokes kills it.

**Remedy** (also the L-5 remedy): `<Textarea v-model="text">` from `@mkbabb/glass-ui/forms`. A native form control's value channel is `value`, not `textContent`, so the VDOM never touches the node the caret is in — the entire defect class disappears rather than being patched around with caret-restoration code.

**Corpus note.** lane-frontend's shadow census (S-1..S-8) does not cover this component. This is an **extension, not a contradiction**: the census enumerated bespoke components with glass-ui analogues by *component family* (tabs, timeline, scrubber, text, skeleton, copy-button) and never reached the editable-code surface. See L-5 / S-9.

---

## 2. MAJOR

### L-2 — the dialog has no scroll owner around an unbounded `<pre>`

**Severity** MAJOR. **Provenance** `CSSPasteDialog.vue:3-10` (`<DialogContent>` with no `scroll`), `:54` (`min-h-[20vh]`, no `max-h`, no `overflow`).

glass-ui's `DialogContent` ships the exact prop for this, defaulted **off**:

```
node_modules/@mkbabb/glass-ui/dist/dialog-BKSTfmIQ.js
  scroll: { type: Boolean, default: !1 }
  … d.scroll ? (g.value ? "max-h-[calc(100dvh-2rem)] overflow-y-auto" : "overflow-y-auto") : ""
```

and the centered base class carries no height bound at all:

```
"fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg gap-4 …"
```

I checked for a bound anywhere else in the chain and found none: `grep -rn "dialog" demo/styles/*.css` returns only the z-index comment, and `scroll` appears on **zero** of the demo's three `<DialogContent>` mounts (`KeyboardShortcutsModal.vue:3`, `KeyframesAddDialog.vue:16`, `CSSPasteDialog.vue:3`). A `position: fixed` grid centred on `top-1/2` with `overflow: visible` and content taller than the viewport clips symmetrically off both edges, and the page cannot scroll it. The `DialogFooter` holding the Import button is the last grid row.

**Falsifier.** Paste a 300-line `@keyframes` block and find the Import button still clickable — e.g. because Tailwind preflight or a glass-ui rule I did not find bounds `[data-reka-dialog-content]`. **UNPROVEN-NEEDS-LIVE** for the visible symptom; the missing prop and the absent `max-h` are proven.

**Remedy** one token: `<DialogContent scroll …>`. (Bounding the `<pre>` instead — `max-h-[40vh] overflow-auto` — would scroll the box but leave the title/footer geometry to chance; the design system's own prop is the right seam.)

### L-3 — no submit acknowledgement: the user's paste is destroyed on parse failure

**Severity** MAJOR. **Provenance** `CSSPasteDialog.vue:61-63, 65-69, 75-77`; `KeyframeTimeline.vue:267-279`; `demo/components/instrument/timeline/composables/useTimelineBuild.ts:144-161`.

The chain, end to end:

```ts
// CSSPasteDialog.vue:75-77 — fire and forget, no result, no failure channel
const onSubmit = () => { emit("submit", text.value); };

// KeyframeTimeline.vue:267-272 — async call NOT awaited, dialog closed unconditionally
const doImport = (text: string) => {
    if (text.trim()) { importCSS(text); importDialogOpen.value = false; }
};

// useTimelineBuild.ts:144-161 — the error is consumed into a toast; nothing is returned
catch (e) { toast.error("Failed to parse CSS", { description: (e as Error).message }); }

// CSSPasteDialog.vue:65-69 — the next open wipes whatever was there
watch(modelOpen, (open) => { if (open) { text.value = props.initialText; } });   // initialText === ""
```

A malformed paste therefore: closes the dialog, flashes a toast, and discards the text. Reopening presents an empty box. The user must re-source the CSS from wherever they got it.

The contract defect is on **this** component, not only on the consumer: `submit` is `(e: "submit", text: string) => void`, so a consumer *cannot* keep the dialog open pending an async outcome without inventing its own busy/error props. And the component already owns the remedy channel — `initialText` — which no mount wires (L-7). The generalization needed to make failure recoverable was built and left unconnected.

**Corpus tie.** lane-library §7.5 enumerates five divergent failure postures on the parse seam (absorb / throw `TypeError` / swallow / throw `AnimationOptionError` / throw). This path is a **sixth**: *toast-and-destroy*. lane-library §4.6's demo parse-consumer list (five call sites) also omits `importCSSToTimeline` → `parseAnimationCSS` entirely (`demo/components/instrument/timeline/utils/timelineEngine.ts:78-104`) — a census gap worth folding, again an extension rather than a contradiction.

**Falsifier.** Show that `importCSS` cannot throw or toast for user-supplied text (it can: `useTimelineBuild.ts:148` toasts on zero keyframes, `:157` on parse throw), or show a consumer path that preserves the text across a failed import. Neither exists in the tree.

### L-4 — near-twin duplication with `KeyframesAddDialog.vue`

**Severity** MAJOR. **Provenance** side-by-side.

| concern | `CSSPasteDialog.vue` | `KeyframesAddDialog.vue` |
|---|---|---|
| outside-click guard | `:4-9` | `:17-22` — **byte-identical block** |
| input handler | `:71-73` | `:96-98` — same body, different sink (`text.value =` vs `emit("update:text", …)`) |
| editable surface | `:13-18` | `:33-39` — same `<pre …contenteditable><code>{{ text }}</code></pre>` |
| glass-ui import | `:33-40` | `:60-69` — same barrel, overlapping 6 symbols |
| footer | `DialogFooter` + `Button` | `DialogFooter` + `Button` + a progress-bar `div` (`:48-51`) |

`CSSPasteDialog` is the **generalized** member (title / description / buttonLabel / buttonIcon props, plus a `footer-extra` slot) and is instantiated twice; `KeyframesAddDialog` is the specialized member. The `footer-extra` slot at `:20` is shaped exactly to host `KeyframesAddDialog`'s progress bar, and every remaining difference (highlight.js decoration, the Tab handler, the Shift+Alt+F reformat) is expressible as slot content plus a `keydown` passthrough. The merge appears to have been designed and then abandoned mid-flight, leaving two divergent state-ownership contracts for one widget: internal `ref` + `submit` here, `props.text` + `update:text` there.

Note that L-1 afflicts **both** — `KeyframesEditor.vue:77` binds `v-model:text="addKeyframesString"`, so the round trip and the `textContent` rewrite are identical. The duplication is therefore not merely cosmetic: it doubles the blast radius of the blocker and doubled the chance that neither copy got tested.

If merged, the survivor no longer belongs under `timeline/`; `instrument/` (alongside `instrument/utils/`) is the honest home.

**Falsifier.** Show a behavioural requirement that cannot cross the `footer-extra` seam — e.g. `KeyframesAddDialog` needing to own the `<pre>` element identity for `useCodeHighlight` in a way a slot cannot express. (It receives the element via `useTemplateRef`, so a `pre-ref` expose would carry it; but I have not built the merge, so this falsifier is live.)

### L-5 — the design system ships `Textarea`; the demo hand-rolls `contenteditable` instead (census extension S-9)

**Severity** MAJOR. **Provenance** `node_modules/@mkbabb/glass-ui/dist/forms.d.ts:2` → `export * from "./components/textarea"`; `dist/components/textarea/Textarea.vue.d.ts` → `"update:modelValue": (value: string | number) => any` (a drop-in `v-model`, with `size` / `invalid` / `resize` props and the shared `field-control.css`).

The subpath is `@mkbabb/glass-ui/forms` — **already imported one file away**, at `KeyframeTimeline.vue:171` (`import { Input } from "@mkbabb/glass-ui/forms"`). Meanwhile `grep -rn "textarea\|Textarea" demo/` returns exactly one hit, and it is a CSS selector string inside `scenes/sequence/useTypedTrigger.ts:8`, not a usage. The demo has **zero** `<Textarea>` mounts and three `contenteditable` surfaces (`CSSPasteDialog.vue:17`, `KeyframesAddDialog.vue:38`, `KeyframeCard.vue:46`).

This is the row lane-frontend's shadow census would have filed had it reached this family. Recording it as **S-9**, in the census's own shape:

> **S-9 · `contenteditable <pre>` code-entry surfaces → glass-ui `Textarea` (`/forms`) — RED, 3 sites.** The bespoke surface is not merely redundant with the design system; it is the direct cause of a blocker-class VDOM contention (L-1) that a native form control cannot exhibit. Unlike S-8 (`TypingDots`, justified bespoke), there is no capability here the primitive lacks — no syntax highlighting is applied in `CSSPasteDialog` at all, and where highlighting *is* applied (`KeyframesAddDialog` via `useCodeHighlight`) the repo already owns a first-class code editor (`instrument/keyframes/CSSCodeEditor.vue`, Monaco, lazily booted, 229 lines) mounted by this component's own consumer at `KeyframeTimeline.vue:123-127`.

That last point sharpens the finding: the timeline renders a **Monaco editor** for editing one keyframe's CSS, and a **hand-rolled contenteditable** for pasting a whole `@keyframes` block. Two code-entry mechanisms, in one card, at two quality tiers.

**Falsifier.** `Textarea` turning out to be unusable here — e.g. if it forces a `size` geometry incompatible with a 20vh code box, or if `resize` cannot be pinned. The declared props (`size`, `invalid`, `resize`) suggest otherwise, but I have not mounted it.

---

## 3. MINOR

### L-6 — dead template-ref triple, exposed as public API
`:14` (`ref="textEl"`), `:60` (`useTemplateRef<HTMLElement>("textEl")`), `:79` (`defineExpose({ textEl })`). `textEl` is never read inside the component — `onInput` uses `e.target` (`:72`) — and neither mount attaches a `ref` to `<CSSPasteDialog>` (`KeyframeTimeline.vue:135-142, 145-152`), so nothing reads the expose either. Three lines of dead wiring that also publish an internal DOM handle. **Falsifier:** any `ref=` on a `CSSPasteDialog` mount, anywhere. `grep -rn "CSSPasteDialog" keyframes.js` finds only the two mounts and the import.

### L-7 — speculative generality: 3 unused configuration surfaces on an 80-line component
`initialText` (`:49`, `:54`), `preClass` (`:50`, `:54`), and slot `footer-extra` (`:20`) are passed by **neither** mount. That is three of the component's seven configuration surfaces inert. `initialText` is the load-bearing one — it is exactly the channel L-3 needs and never got wired. **Falsifier:** a third consumer. None exists. (Not a request to delete: wire `initialText`, keep `footer-extra` for the L-4 merge, drop `preClass` per L-8.)

### L-8 — `preClass` replaces instead of merging
`:54` hard-codes `"font-mono min-h-[20vh] p-3 cursor-text rounded-lg text-small bg-muted/50 outline-none border border-border"` as a prop default. A consumer passing `preClass="h-40"` gets *only* `h-40` — losing the mono face, the padding, the caret affordance, the border and the focus-outline suppression. The house idiom is a `class` prop merged with `cn()`, which glass-ui exports from the very barrel this file imports (`dist/index.d.ts:41`, `export { cn }`). **Falsifier:** a repo precept preferring full-replacement class props; the tree shows the opposite (glass-ui components all take `class?: HTMLAttributes['class']` and merge).

### L-9 — `font-mono` and `text-small` collide on `font-family` (UNPROVEN-NEEDS-LIVE)
Both live in `:54`. `text-small` is a glass-ui `@utility` that sets `font-family: var(--font-text)` (`node_modules/@mkbabb/glass-ui/dist/styles/typography/semantic.css`, `@utility text-small { font-family: var(--font-text); … }`), and Tailwind's `font-mono` sets `font-family: var(--font-mono)`. Two single-class selectors, equal specificity — source order in the generated sheet decides, and I cannot resolve Tailwind v4's ordering of custom `@utility` vs core utilities without running the build. If `text-small` wins, the CSS paste box renders in the proportional body face. **Falsifier:** computed `font-family` on the `<pre>` resolving to Fira Code kills it outright. Safe form either way: `text-[length:var(--type-small)]` (size only) or drop `font-mono` in favour of a mono rung.
*I explicitly did not claim the classes are dead.* I checked: `text-subheading`, `text-body` and `text-small` are all real, defined in glass-ui's `styles/typography/semantic.css`, reachable through `demo/styles/style.css:3` (`@import "@mkbabb/glass-ui/styles"`).

### L-10 — unchecked `EventTarget → Element` cast in the guard module
`toastGuard.ts:26-28`:
```ts
export function isInsideToaster(el: EventTarget | null): boolean {
    return (el as Element | null)?.closest(TOAST_ROOT_SELECTOR) != null;
}
```
For every event this module is fed today the target is an `Element`, so this does not currently throw. But the signature advertises `EventTarget`, and an `EventTarget` that is `window`/`document`/a `Text` node has no `.closest` → `TypeError`, thrown from inside a dialog dismissal handler. In the one module whose doc-block (`:1-17`) sells it as the *centralized, hardened* seam for a private third-party DOM contract, `el instanceof Element` is the cheaper and honest guard. **Falsifier:** proof that reka-ui can only ever dispatch with an `Element` target — true today (`handleAndDispatchCustomEvent` dispatches on `detail.originalEvent.target` of a `pointerdown`/`focusin`), which is why this is MINOR and not MAJOR.

### L-11 — root-barrel import where subpaths exist (idiom drift only)
`:33-40` pulls `Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle` from `@mkbabb/glass-ui`. glass-ui publishes 73 subpath exports including `./dialog` and `./button`, and the sole consumer already uses subpaths (`KeyframeTimeline.vue:171-172`: `/forms`, `/tooltip`). Static graph walk of the installed dist:

| entry | files | KB | bare edges |
|---|---|---|---|
| `glass-ui.js` (root) | 62 | 215 | `@lucide/vue`, `@mkbabb/keyframes.js`, `reka-ui`, `vue` |
| `dialog.js` | 11 | 22 | same set |
| `button.js` | 11 | 18 | `@mkbabb/keyframes.js`, `reka-ui`, `vue` |

**I falsified my own stronger version of this claim, twice, and am recording both.** (a) *Bundle bloat*: glass-ui declares `sideEffects: ["*.css"]` and its JS graph contains **zero** CSS import edges (measured: 0 files / 0 KB from every entry), so the root barrel is fully tree-shakable in a production rolldown build — no shipped-byte claim survives. (b) *Widened dependency cycle*: the `./dialog` subpath reaches `@mkbabb/keyframes.js` exactly as the root barrel does, so the subpath does **not** avoid the demo↔glass-ui cycle that `vite.config.ts:25-42` aliases shut. What remains is genuine but small: a ~10× larger dev/pre-bundle graph and an inconsistency with the file next door. **Falsifier:** a prod chunk report showing the barrel import pulling extra modules into CSSPasteDialog's chunk would *upgrade* this; I expect it will not.

### L-12 — `min-h-[20vh]` arbitrary bracket, a known unfixed carry
`:54`. Already recorded twice in the keyframes.js corpus — `docs/tranches/T/audit/lanes/17-styles-idioms.md:345` and `docs/tranches/T/waves/T.D.md:606` (slated for `tokens.css`), and earlier at `docs/tranches/J/audit/styling-design-system.md:93`. Filing it as a **carry, not a discovery**: three prior audits named it and it is still in the tree. **Falsifier:** a ruling that instrument-local viewport brackets are exempt.

---

## 4. INFO

- **I-1 · F-1 exposure is maximal here.** `@mkbabb/glass-ui` is absent from both `package.json` and `package-lock.json` (`grep -c "glass-ui" package-lock.json` → **0**) yet 7.0.0 sits in `node_modules` — lane-frontend **F-1**, RED, confirmed unchanged. Where it bites *this* file: **6 of its 6 component imports** come from the phantom package (`:33-40`). It is a 100 %-exposed leaf — under a clean `npm ci` this component does not type-check and renders nothing. F-1 must land before any wave touches it. *Falsifier:* `npm ci` followed by a successful demo typecheck.
- **I-2 · clean bill on leaks/teardown.** No `addEventListener`, no timer, no observer, no rAF, no engine handle. The single `watch` (`:65-69`) is scope-bound and auto-stopped. `DialogContent` unmounts on close (no `forceMount`), so the `<pre>` and its ref are released. Nothing to tear down, nothing leaked. Stated explicitly because the axis asks and the answer is genuinely clean.
- **I-3 · zero engine consumption — correctly.** The component touches no `keyframes.js` API; the engine seam is one hop away (`KeyframeTimeline.doImport` → `useTimelineBuild.importCSS` → `importCSSToTimeline` → `parseAnimationCSS`). That is the right altitude for a dialog. Contrast the twin, which reaches `loadAnimationEngine()` for a *decorative progress bar* (`KeyframesAddDialog.vue:127-131`) — a genuine engine-consumption smell, but it belongs to that component's challenge.
- **I-4 · this defect class is untestable under the current harness.** `vitest.config.ts:38-56` runs two jsdom projects and registers **no** `@vitejs/plugin-vue`; `test/demo/instrument/KfPillTabs.test.ts:19` states the constraint outright ("vitest has no Vue-SFC plugin — the composable is driven through a host"). jsdom also does not implement contenteditable editing or a real Selection. So L-1 cannot be caught by a repo test as the code stands. This is an argument *for* L-5, not merely a coverage gap: a `<textarea>` + `v-model` is trivially testable in jsdom, a contenteditable `<pre>` is not.
- **I-5 · the toast guard is inert for this consumer.** `doImport` closes the dialog synchronously *before* `importCSS`'s toast fires (`KeyframeTimeline.vue:267-272`), so the "user clicks a toast overlapping the open dialog" scenario the guard exists for cannot arise here. It is load-bearing in the twin, where the parent keeps the dialog open. Not a defect — correct defensive code at a site that happens not to need it.
- **I-6 · the Tab divergence reads in this component's favour (L-18 both ways).** `KeyframesAddDialog.vue:117-120` traps `Tab` and calls `insertTabAtCursor`; `CSSPasteDialog` does not. My first read filed that as a missing feature. It is the opposite: the twin installs a **keyboard trap** inside a modal, and this component's plain Tab-moves-focus is the accessible behaviour. Recording the near-miss because it is exactly the shape of false defect this challenge is supposed to refuse.
- **I-7 · CROSS-FILE, hand-off to the `KeyframeTimeline` challenge (not counted here).** The "Add CSS" mount is described as *"Paste CSS @keyframes to **merge** into the timeline"* (`KeyframeTimeline.vue:148`) but `doAddCSS` is byte-identical to `doImport` (`:267-279`) and `importCSS` does `state.value.keyframes = imported` (`useTimelineBuild.ts:152`) — a **replace**. The second dialog silently destroys the existing timeline. Surfaced through this component's `description` prop; the fix is entirely in the consumer, so it is that component's defect, not this one's.

---

## 5. Superlatives (4)

- **SUP-1 · the colocation ruling landed and encapsulation held.** The a24 census assigned `CSSPasteDialog` **ANIM-CONTROLS-PRIVATE** (`docs/tranches/S/audit/pass1/audit32/a24-demo-shared-partition.md:112`) and `S.D.md:175` scheduled the move. In the tree today it sits in `timeline/` beside its only consumer, and — the part that is easy to get wrong — it is **not** re-exported from `timeline/index.ts`, which publishes only the lazy `KeyframeTimeline` and the `TimelineKeyframe` type (`index.ts:1-8`). A private component that stayed private. *Falsifier:* a second consumer outside `timeline/`, or an `index.ts` re-export. Neither exists.
- **SUP-2 · the `data-sonner-toaster` coupling was discharged properly — and the `event.target` read is correct.** Tranche D filed it as brittleness **B3** ("two dialogs guard `@interact-outside` by reaching into the toast library's private DOM contract", `docs/tranches/D/audit/brittleness-findings.md:22`). It now lives in one module with an explicit contract block, the pinned dependency version, and a named upgrade path (`toastGuard.ts:1-17`) — textbook single-sourcing of an unavoidable private coupling. **I tried hard to falsify the call site as a blocker and failed**: I hypothesised that reka-ui dispatches `interactOutside` on the layer element, which would make `event.target` the dialog itself and the guard permanently false. The tree says otherwise — `node_modules/reka-ui/src/shared/handleAndDispatchCustomEvent.ts:11-20` dispatches on `detail.originalEvent.target`, and reka's own `DismissableLayer.vue:106-108` reads `event.target` the same way. The guard is correct, and `preventDefault()` is honoured (`DismissableLayer.vue:114-116`, `:128-129`; `cancelable: true`). Recorded as a superlative on the strength of a failed attack.
- **SUP-3 · Goldilocks.** 80 lines, one responsibility, one default export, one slot, no `<style>` block, no god-module drift, dependencies stated at the top and nowhere else. The U-tranche module census independently reached the same verdict (`docs/tranches/U/loop/pass1-research-demo-module-census.md:78` → `| CSSPasteDialog.vue (80) | — | KEEP |`). The C-tranche typography ruling also landed here — `typography-ladder.md:52` prescribed `.text-subheading` for dialog titles and `:11` uses it, against a utility that genuinely exists. The *shape* of this component is right; every finding above is about its editable surface and its contract edges, not its size or its home.
- **SUP-4 · no keyboard trap.** See I-6. In a modal with a monospace code box, resisting the urge to swallow `Tab` is the correct call, and this component is the only one of the pair that makes it.

---

## 6. Verdict

The file's *architecture* is good — right size, right home, right encapsulation, a properly discharged third-party coupling, and a guard I could not break. Its *editable surface* is the problem, and the problem is structural rather than incidental: painting a `contenteditable` over a Vue interpolation puts the browser and the VDOM in contention for the same text node, and the runtime resolves that contention against the user on every keystroke (L-1). Everything else clusters around that same seam — no scroll owner for the content it accepts (L-2), no way to hand back a failure (L-3), a twin carrying the identical mistake (L-4), and a design-system primitive one already-imported subpath away that dissolves the whole class (L-5).

**Recommended wave order:** F-1 (I-1) → L-5/L-1 (`Textarea`, which also retires L-8/L-9/L-12) → L-2 (`scroll`) → L-3 (submit acknowledgement + wire `initialText`) → L-4 (fold the twin onto the survivor) → the L-6/L-7/L-10/L-11 sweep.

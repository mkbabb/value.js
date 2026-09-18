claude-opus-5[1m]

# CSSPasteDialog — CHALLENGE, axis C (CONSUMPTION)

**Target** `keyframes.js/demo/components/instrument/timeline/CSSPasteDialog.vue` (80 L, HEAD 2026-08-04)
**Axis** how this component consumes keyframes.js (the library) and glass-ui 7.0.0 (the design system): subpath choices, shadow components, value.js transitive exposure, props/emits contract quality, sibling seams.
**Method** read-only. Component + every import read whole; glass-ui 7.0.0 `dist/` (types + the `dialog-BKSTfmIQ.js` / `forms.js` / `class-names-Cpy5eaBk.js` chunks) read as the contract of record; reka-ui `dist/DismissableLayer/` + `dist/shared/` read for the outside-interaction semantics; the template compiled with `@vue/compiler-sfc` for the patch-flag receipt. **No browser** — every livable-only consequence is marked `UNPROVEN-NEEDS-LIVE`.

**Tally** 1 BLOCKER · 8 defects (1 BLOCKER + 3 MAJOR + 4 MINOR) · 3 INFO (checked-and-cleared) · 4 superlatives.

---

## Files read

| file | why |
|---|---|
| `demo/components/instrument/timeline/CSSPasteDialog.vue` | target |
| `demo/components/instrument/timeline/index.ts` | the cluster barrel (export posture) |
| `demo/components/instrument/timeline/KeyframeTimeline.vue` | the sole consumer |
| `demo/components/instrument/utils/toastGuard.ts` | the only non-glass-ui import |
| `demo/components/instrument/utils/iosTextEntry.ts` | sibling util (not consumed here — checked) |
| `demo/components/instrument/keyframes/components/KeyframesAddDialog.vue` | the near-duplicate sibling dialog |
| `demo/components/instrument/keyframes/utils/contenteditable.ts` | `insertTabAtCursor` (sibling-only) |
| `demo/components/instrument/timeline/composables/useTimeline.ts`, `useTimelineBuild.ts` | the emit's downstream |
| `demo/components/instrument/timeline/utils/timelineEngine.ts`, `timelineTypes.ts` | the parse/serialize seam |
| `demo/components/instrument/keyframes/utils/parseAnimationCSS.ts` | value.js `/css` entry |
| `src/animation/compile/emit/css-text.ts` (§41-56) | `serializeCssValue` → value.js color throw |
| `node_modules/@mkbabb/glass-ui/{package.json,dist/…}` | the design-system contract |
| `node_modules/reka-ui/dist/DismissableLayer/{DismissableLayer,utils}.js`, `dist/shared/handleAndDispatchCustomEvent.js` | outside-interaction dispatch |
| `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js` :5774 | TEXT patch-flag behaviour |
| `vite.config.ts`, `package.json` | alias + dependency truth |

---

# BLOCKER

## C-1 — the dialog is unbounded: glass-ui publishes `scroll` for exactly this case and the consumer never passes it, so a paste taller than the viewport puts the Import button out of reach with no way to scroll to it

**Severity** BLOCKER · **Provenance** `CSSPasteDialog.vue:3` (`<DialogContent>` with no `scroll`), `:54` (`preClass` = `min-h-[20vh] …` — a *minimum*, no maximum, no overflow utility) · glass-ui `dist/components/dialog/DialogContent.vue.d.ts:52-56` ("Bound the dialog to the viewport and make its content the single vertical scroll owner") and `:85` (`scroll: boolean` in the resolved defaults) · `dist/dialog-BKSTfmIQ.js`, `DialogContent` props: `scroll: { type: Boolean, default: !1 }` · same chunk, the centred base class `K` = `"fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg gap-4 …"` composed with `q` = `"-translate-x-1/2 -translate-y-1/2 glass-reveal"` · the scroll class is gated: `Y = computed(() => props.scroll ? (isCenter ? "max-h-[calc(100dvh-2rem)] overflow-y-auto" : "overflow-y-auto") : "")`.

**Mechanism (source-proven, no browser needed).** `placement` defaults to `"center"`, so the content box is `position: fixed; top: 50%; translate: -50%`. Its height is `auto` (a CSS grid whose rows size to content). The only height bound glass-ui 7.0.0 offers is the `scroll` prop, which defaults **false**. I grepped every `.css` file shipped in `@mkbabb/glass-ui/dist` for a rule on `dialog` carrying `max-h`/`overflow`: the only hit is `.command-dialog__content{padding:0;overflow:hidden}` — nothing bounds `[data-slot="dialog-content"]` at `placement=center`. `placement.css` covers only the four edge placements. reka-ui portals the content straight into `<body>` under `ModalOverlay` (`fixed inset-0`) — there is no scroll wrapper anywhere in the chain (`dialog-BKSTfmIQ.js`, DialogContent render: `DialogPortal > ModalOverlay + DialogContent`). A `position: fixed` box taller than the viewport **cannot be scrolled into view**; the overflowing halves are simply unreachable, and `DialogFooter` — which holds the only submit affordance (`CSSPasteDialog.vue:19-25`) — is in the bottom half.

**Why this is the paste dialog's central case, not an edge.** The component's own description string is "Paste CSS @keyframes to load into the timeline" (`KeyframeTimeline.vue:138`). A real authored `@keyframes` with five stops × three declarations is ~25 lines; a bounce/spinner with ten stops is 40+. The `<pre>` renders at `text-small` with no max-height, so it grows one line at a time until the footer crosses the viewport edge.

**Failure scenario.** Open Import → paste a 60-line `@keyframes` → the `<pre>` grows past the viewport → "Import" sits below the fold of a fixed, unscrollable box → the only exit is Esc/outside-click, which (see C-4) discards the paste.

**Falsifier.** (a) Any CSS rule anywhere in the loaded sheet that gives `[data-slot="dialog-content"]` a `max-height` or `overflow` at `placement=center` — I grepped all of glass-ui's shipped CSS and `demo/styles/*.css` and found none; a demo-global or Tailwind-layer rule I missed would kill this. (b) A live measurement showing the footer stays reachable at, say, 200 pasted lines. The *threshold* (how many lines before the footer leaves the viewport) is `UNPROVEN-NEEDS-LIVE`; the *mechanism* — fixed + centred + no max-height + no overflow + `scroll` defaulting false — is proven from source.

**Fix shape (one attribute).** `<DialogContent scroll>` — and give the `<pre>` an `overflow-auto` + `max-h`, or replace it per C-2, which fixes this and C-3 together.

**Adjacent, same root, MAJOR in its own right:** the `<pre>` also has no horizontal bound. `preClass` (`:54`) contains no `overflow-x-*` and no `whitespace-*`; a `<pre>` is UA `white-space: pre`, so it does not wrap. `max-w-lg` clamps the *dialog*, not the `<pre>`'s content box, so a long declaration (`box-shadow: 0 0 0 1px …`, a multi-function `transform`) renders past the glass panel's right edge. Same falsifier: a `pre {}` global rule setting `white-space`/`overflow` — none exists in `demo/styles/`.

---

# MAJOR

## C-2 — S-9 (proposed): the `<pre contenteditable>` is a shadow of glass-ui's published `Textarea`, and the sibling that *justifies* contenteditable proves this one does not

**Severity** MAJOR · **Provenance** `CSSPasteDialog.vue:13-18` (the hand-rolled surface) · glass-ui `dist/forms.js` exports **`Textarea`** (a real `<textarea>`: `c("textarea", …, {"data-slot":"textarea","data-kind":"textarea","data-size":…})` with `modelValue`/`placeholder`/`rows`/`resize`/`invalid`/`disabled`/`maxlength`/`readonly`), decl at `dist/components/textarea/Textarea.vue.d.ts` · the parent **already imports that subpath**: `KeyframeTimeline.vue:171` `import { Input } from "@mkbabb/glass-ui/forms"`.

**The census fold.** lane-frontend's shadow census (`lane-frontend.md:264-395`) enumerates S-1…S-8 — tabs, the timeline cluster, scrubber, AnimatedText, skeleton, CopyButton, TypingDots. It has **no text-entry / dialog row**. This is a census *gap*, not a contradiction: `CSSPasteDialog` is 80 lines and never surfaced in the ≥100-line sweep the census ran. Propose **S-9 · `<pre contenteditable>` → `Textarea` (`/forms`)**, and note that its twin at `KeyframesAddDialog.vue:33-39` is the *justified* member of the same pair (see below), so S-9 is a one-site row, not a two-site one.

**The falsifier I went looking for, and what killed it.** The obvious defence of a contenteditable over a `<textarea>` is syntax highlighting — a `<textarea>` cannot hold markup. That defence is **real for the sibling and absent here**: `KeyframesAddDialog.vue` carries `class="hljs css …"` (`:37`), `useCodeHighlight` (`:73,92-94`), `highlightAll()` on mount/keydown (`:109-123,150-160`), and `insertTabAtCursor` for Tab-in-code (`:74,117-120`). `CSSPasteDialog` has **none** of it — no `hljs` class, no highlight composable, no keydown handler, no Tab handling. It pays the entire contenteditable cost and buys nothing. Falsifier: find a highlight/Tab/rich-text behaviour in `CSSPasteDialog.vue` — the file is 80 lines and there is none.

**What the shadow costs, concretely.**
- The caret defect C-3 (a `<textarea>`'s value binding is native and caret-safe).
- **No accessible name and no role.** `:13-18` has no `aria-label`, no `aria-labelledby`, no `role="textbox"`, no `aria-multiline`. `Textarea` is a native `<textarea>` — a labelled form control by construction, and glass-ui's wraps `aria-invalid` state for free.
- No `placeholder` (the empty box gives the user no hint what shape of CSS is wanted), no `maxlength`, no `disabled`, no `resize` control — all published props of the primitive.
- Paste sanitisation is currently a *side effect* of the Vue text rewrite (C-3): pasting from a syntax-highlighted web page inserts `<span style=…>` markup which the rewrite then strips. A `<textarea>` cannot hold markup at all, so the primitive gets the sanitisation for free without the rewrite that causes C-3.

## C-3 — the state→DOM text binding rewrites the editable text node on **every** `input`, and unlike its sibling this component makes no attempt to repair the selection

**Severity** MAJOR · **Provenance** `CSSPasteDialog.vue:18` (`<code>{{ text }}</code>` inside the contenteditable host), `:71-73` (`onInput` writes `text.value = e.target.innerText`).

**Static receipt (no browser).** Compiling the SFC template with `@vue/compiler-sfc` yields:

```js
_createElementVNode("code", null, _toDisplayString(_ctx.text), 1 /* TEXT */)
```

and `@vue/runtime-core/dist/runtime-core.cjs.js:5774-5778`:

```js
if (patchFlag & 1) {
  if (n1.children !== n2.children) {
    hostSetElementText(el, n2.children);
  }
}
```

with `hostSetElementText` = `runtime-dom`'s `setElementText: (el, text) => { el.textContent = text }` (`runtime-dom.cjs.js:51`). So: each `input` sets `text.value` to something that by construction differs from the previously rendered string (the user just changed the DOM), the render effect re-runs, and `code.textContent = …` **replaces the text node the caret lives in**. Per the `textContent` setter's "string replace all", the existing child node is removed and a fresh Text node appended.

**The tree's own corroboration.** The sibling dialog does the same DOM rewrite (via `setHighlightingString` + `highlightAll`) and then **explicitly repairs the selection**: `KeyframesAddDialog.vue:106` `window.getSelection()?.collapseToEnd();`. keyframes.js already knows this hazard and already carries the repair idiom — `CSSPasteDialog` has no equivalent line anywhere in its 80.

**Consequence, split by proof status.** *Proven*: the editable text node is destroyed and recreated on every keystroke and every paste. *`UNPROVEN-NEEDS-LIVE`*: the resulting caret position. The expected browser behaviour when the selection's anchor node is removed is collapse-to-start, i.e. character-by-character typing produces reversed text and a second paste lands at the head of the first. The **named** flow (one paste → one input → one rewrite → click Import) survives; *editing* does not.

**Falsifier.** Type `abc` one character at a time into the `<pre>`; if the box reads `abc` with the caret at the end, the caret half of this claim dies (the text-node replacement half stands regardless — it is compiler output). Also killed if a future Vue version stops emitting patchFlag 1 for a lone interpolation child, or if the component adds a `v-once`/uncontrolled-DOM guard.

## C-4 — the emit contract cannot express failure, so a rejected paste is silently destroyed

**Severity** MAJOR · **Provenance** `CSSPasteDialog.vue:61-63` (`(e: "submit", text: string): void` — fire-and-forget, no result, no `busy`/`error` prop, no `Promise` return), `:65-69` (`watch(modelOpen, open => { if (open) text.value = props.initialText })`, `initialText` defaulting `""` at `:53`), `:75-77` · consumer `KeyframeTimeline.vue:267-272` / `:274-279` — both handlers call `importCSS(text)` **without `await`** and set `…DialogOpen.value = false` unconditionally · `useTimelineBuild.ts:144-161` — `importCSS` is `async` and swallows every failure into `toast.error("Failed to parse CSS", { description: … })`.

**Failure scenario.** Paste 40 lines of CSS containing one malformed selector or one unserializable colour → click Import → the dialog closes **immediately** (the parent cannot await an emit) → ~a tick later a toast says the parse failed → the user reopens the dialog to fix it → `watch` has reset `text` to `""` → **the paste is gone** and must be re-fetched from wherever it came from. The same loss occurs on Esc/outside-click, with no confirm.

**This is the emit contract's fault, not only the consumer's.** A `submit` emit that returns nothing gives the consumer no way to keep the dialog open on failure short of a second round-trip prop; every consumer will therefore close optimistically. The correctable surfaces are all absent: no `busy`/`pending` prop to disable the button while `importCSS` runs, no `error` prop to render inline, no "close only on success" contract.

**Falsifier.** Show a consumer that awaits the result and re-opens with the text preserved, or a `text` write-back (`v-model:text`) that survives close — the sibling `KeyframesAddDialog` **does** hoist its text (`props.text` + `update:text`, `:76-87`), which is the shape that would kill this finding here. `CSSPasteDialog` owns its text internally instead: two opposite state-ownership models for the same widget across one facility.

**Reachability of the value.js R1 class — checked, and it is CONTAINED (do not file it here).** The seam from this component's emit is: `emit("submit")` → `doImport` → `importCSS` → `importCSSToTimeline` (`timelineEngine.ts:78-104`) → `parseAnimationCSS` (`parseAnimationCSS.ts:26-58`, value.js `/css` `collectStyleRules`/`collectAnimationOptions`) and `serializeCssValue` (`src/animation/compile/emit/css-text.ts:41-56`, which **throws** `TypeError("Value returned an unserializable CSS color.")` when value.js's `serializeCssColor` returns `!ok`, `:53-54`). `requireKeyframeSelector` also throws on a bad selector. All of it is `await`ed **inside** `importCSS`'s `try` (`useTimelineBuild.ts:145-146`), so an R1-class value.js parser/serializer throw on pasted text is caught and toasted — no unhandled rejection, no torn tree. The lane-library census's R1 crash surface (`lane-library.md:243`, `demo/scenes/square/useSquareTumble.ts:22 parseCssColor(css)`) is **not** on this component's path. Recording it as cleared so the next lane does not re-file it. What *is* left is the C-4 consequence: an R1-class throw is indistinguishable from a typo, arrives after the dialog is gone, and takes the paste with it.

---

# MINOR

## C-5 — three-quarters of the public surface is dead, and the dead slot was designed for a sibling that exists and never migrated

**Severity** MINOR · **Provenance** repo-wide grep (`demo/`, `src/`) for `footer-extra|footerExtra|initial-text|initialText|pre-class|preClass` returns **only** `CSSPasteDialog.vue` itself; the sole consumer (`KeyframeTimeline.vue:135-152`) passes exactly `open`, `title`, `description`, `button-label`, `:button-icon`, `@submit`.

Dead surfaces: `initialText` (`:49,53,59,68`), `preClass` (`:50,54,16` — a 130-character Tailwind string as a prop *default*, which also makes the paste surface's styling overridable per-instance, the inverse of the root-styling law), the `footer-extra` slot (`:20`), and `defineExpose({ textEl })` (`:79`) — no consumer puts a `ref` on the component, so this publishes an internal DOM node as API for nobody.

**The sharp part.** `footer-extra` is *precisely* the shape of `KeyframesAddDialog.vue:48-51` — a `<div ref="progressBarEl">` living in that dialog's `DialogFooter` beside its submit button. The generalisation was built for a consumer that **exists in the tree** and was never migrated onto it. What is left is a generic dialog with one caller and a bespoke twin 161 lines long.

**Falsifier.** Any consumer — including a test — that passes `initialText`, `pre-class`, fills `#footer-extra`, or reads the exposed `textEl`. There are no tests at all (C-10), and the grep above is exhaustive over `demo/` and `src/`.

## C-6 — two local class overrides are stale: glass-ui 7.0.0 now applies them itself

**Severity** MINOR · **Provenance** `CSSPasteDialog.vue:11` `class="text-subheading"` vs glass-ui `dist/dialog-BKSTfmIQ.js`, `DialogTitle` setup: `class: cn("text-subheading leading-none tracking-tight", props.class)` — byte-redundant. `CSSPasteDialog.vue:12` `class="text-body text-muted-foreground"` vs `DialogDescription`: `class: cn("text-sm text-muted-foreground", props.class)` — the `text-muted-foreground` half is byte-redundant.

**History.** The C-tranche typography ladder *prescribed* the consumer-level class (`keyframes.js/docs/tranches/C/audit/lanes/typography-ladder.md:52` — "`CSSPasteDialog.vue:12` … → **`.text-subheading`**"). That was correct against the glass-ui of the day. glass-ui 7.0.0 has since absorbed it into the primitive; the consumer-side copy is now dead weight that will silently diverge the next time glass-ui re-tunes its dialog scale.

**A tempting adjacent claim that the tree KILLED — do not file it.** `text-body` (consumer) against `text-sm` (default) *looks* like an unresolved font-size conflict whose winner depends on Tailwind layer order. It is not: glass-ui does not use `tailwind-merge`; it ships a bespoke resolver (`dist/class-names-Cpy5eaBk.js`) whose conflict table lists `["font-size", /^text-(micro|small|caption|body|prose|…)$/]` **explicitly**, and `a()` keeps the *last* class per `scope|group`. So `cn("text-sm text-muted-foreground", "text-body text-muted-foreground")` resolves to `"text-body text-muted-foreground"` — a clean, deterministic override. The `text-body` is a deliberate, working choice; only the two redundant tokens are the defect.

**Falsifier.** A glass-ui version where `DialogTitle`/`DialogDescription` drop those defaults, or a demo-level rule that makes the duplicate meaningful.

## C-7 — `DialogHeader` is published and unused, so the title/description pair renders as two unrelated grid rows

**Severity** MINOR · **Provenance** `CSSPasteDialog.vue:11-12` (Title and Description as direct children of `DialogContent`) · glass-ui `dist/components/dialog/index.d.ts:4` exports `DialogHeader`; `dist/dialog-BKSTfmIQ.js`, `DialogHeader` renders `div class=cn("flex flex-col gap-y-1.5 text-center sm:text-left", …)`; `DialogContent`'s centred base class is `… grid w-full max-w-lg gap-4 …`.

**Consequence.** Title and description become two independent `gap-4` (16 px) grid rows instead of a 6 px header group, and lose the header's `text-center sm:text-left` small-viewport centring. Purely presentational, and the a11y wiring is unaffected (see SUP-2), which is why this is MINOR rather than MAJOR. Exact visual delta `UNPROVEN-NEEDS-LIVE`; the class strings are receipts.

**Falsifier.** A deliberate design decision recorded anywhere that this dialog wants a loose header — I found none in `docs/tranches/{C,S,T,U}` for this component.

## C-8 — the submit button is never disabled, so an empty Import is a silent dead click

**Severity** MINOR · **Provenance** `CSSPasteDialog.vue:21-24` (`<Button @click="onSubmit">` — no `:disabled`), `:75-77` (`onSubmit` emits unconditionally) · consumer `KeyframeTimeline.vue:268` / `:275` — `if (text.trim()) { … }` with **no `else`**: an empty or whitespace-only submit does nothing at all. No toast, no inline error, no close.

**Failure scenario.** User opens Import, clicks Import before pasting (or pastes into the wrong window) → the button visibly depresses → nothing happens, ever. The user has no signal whether the app is broken or the paste failed.

**Falsifier.** Any guard I missed on the emit path — `onSubmit` is three lines and the consumer's two handlers are six; there is none. Fixed by `:disabled="!text.trim()"` on the Button, which is also the honest contract (the dialog knows the text; the consumer should not have to re-validate it).

---

# INFO — checked and cleared (recorded so the next lane does not re-file)

## C-9 — barrel-vs-subpath: conformant, and materially free here

`CSSPasteDialog.vue:33-40` pulls six symbols from the **root barrel** `@mkbabb/glass-ui` while glass-ui 7.0.0 publishes `./dialog` and `./button` (`package.json` `exports`, 73 keys). That reads like a subpath defect. It is not one for this component:

- The census records the root barrel as the demo's **standing pattern** for exactly these symbols: `lane-frontend.md:105` lists `Button`, `Dialog`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogTitle` under "Root barrel `@mkbabb/glass-ui` — components drawn". Deviating here would be the inconsistency.
- No production cost: glass-ui declares `sideEffects: ["*.css"]`, so its JS is tree-shakable and the barrel (`dist/glass-ui.js`, 23 938 B of pure re-export) collapses to the used bindings under Rollup/rolldown.
- No dev cost either: Vite pre-bundles the dependency the same way whether the entry is the barrel or the subpath.

The 21-of-73 (29 %) subpath utilisation figure (`lane-frontend.md:584-586`) is a repo-level finding, not this file's. *Falsifier:* a bundle report showing unused glass-ui components landing in the timeline chunk would flip this to a real defect.

## C-10 — zero test coverage for the component; the seam beneath it IS covered

`grep -rln CSSPasteDialog test/` → nothing. `test/demo/instrument/` holds nine specs (`KfPillTabs`, `timeline-undo`, `value4-editor-boundary`, …) — the facility is tested, this component is not, so C-3/C-4/C-8 have no regression net. Note the asymmetry: the *downstream* of the emit is well covered — `test/demo/instrument/value4-editor-boundary.test.ts:44` drives `importCSSToTimeline` directly, including the throwing-selector case. It is precisely the dialog's own contract (emit shape, reset-on-open, empty submit) that nothing pins.

## C-11 — F-1 (phantom dependency) is still live at HEAD, and every glass-ui symbol in this file rides it

`keyframes.js/package.json` at HEAD declares `dependencies: { "@mkbabb/value.js": "4.0.0" }` and **no `@mkbabb/glass-ui`** in either `dependencies` or `devDependencies`, yet 7.0.0 is installed. `vite.config.ts:37-59` aliases `@src`, `@mkbabb/keyframes.js`, `@styles`, `@state`, `@components`, `@utils`, `@kf-engine`, `@composables`, `@app`, `@assets` — **no glass-ui alias**, so the six imports at `CSSPasteDialog.vue:33-40` resolve bare out of `node_modules` and would not resolve at all after `npm ci`. This confirms lane-frontend **F-1** (`lane-frontend.md:15,54,569,612`) unchanged as of 2026-08-04. Not this component's defect; recorded because C-1/C-2/C-6 are all stated against a glass-ui version the manifest does not pin.

---

# Superlatives (L-18 runs both ways)

## SUP-1 — the `@interact-outside` toaster guard is correctly wired, and the obvious accusation against it is FALSE

`CSSPasteDialog.vue:4-9` reads `event.target` off reka-ui's `interactOutside` event and calls `preventDefault()`. The tempting finding — "reka dispatches a `CustomEvent` on the *layer*, so `event.target` is the dialog itself and the guard is a no-op" — is wrong, and the tree says so: `reka-ui/dist/shared/handleAndDispatchCustomEvent.js:2-9` does `const target = detail.originalEvent.target; … target.dispatchEvent(event)` — the custom event is dispatched **on the real outside element**, so `event.target` is exactly what the guard needs. Cancellation works too: the event is `cancelable: true`, and `DismissableLayer.js` gates dismissal on `if (!event.defaultPrevented) emits("dismiss")` for both the pointer and focus paths. The forwarding chain is intact: glass-ui's `DialogContent` sets `inheritAttrs: false` *and* declares `interactOutside` in `emits`, then re-forwards via `useForwardPropsEmits(props, emit)` (`dialog-BKSTfmIQ.js`, `H = P(m, f)`). Three links, all correct. *Falsifier of the superlative:* a reka-ui minor that moves dispatch to the layer element.

## SUP-2 — the dialog's a11y composition is right, and it is the *sibling* that gets it wrong

`DialogTitle` (`:11`) and `DialogDescription` (`:12`) are **siblings** under `DialogContent`, which is what reka-ui's `aria-labelledby`/`aria-describedby` wiring wants. Compare `KeyframesAddDialog.vue:24-31`, which nests `DialogDescription` (and a `CardTitle`) *inside* `DialogTitle` — folding the description into the dialog's accessible name. Of the two twins, the 80-line one is the correct one on this point.

## SUP-3 — the vue-sonner private-DOM coupling is as well-contained as it can be, and the U-tranche colocation has landed

`toastGuard.ts:1-28` isolates the `[data-sonner-toaster]` attribute behind one named predicate with an 17-line docblock naming the private contract, the pinned dependency (`vue-sonner ^2.0.9`, which **is** declared in `package.json`), and the adoption condition ("if vue-sonner ships a public predicate, adopt it here"). That discharges D-tranche brittleness finding **B3** (`docs/tranches/D/audit/brittleness-findings.md:22`) about as well as a library without a public predicate allows. Its placement is also the *landed* remediation of U lane-20 **F-5** (`docs/tranches/U/audit/lane-20-demo-app-shared-tier.md:138-155`, which proposed moving it out of the global tier into `instrument/utils/` — it is there now), consumed by exactly the two instrument dialogs the proposal named.

## SUP-4 — correct export posture: the component stays cluster-private

`demo/components/instrument/timeline/index.ts:1-8` re-exports **only** `KeyframeTimeline` (lazily, via `defineAsyncComponent`, to keep the Monaco chunk off the facility umbrella) plus the `TimelineKeyframe` type. `CSSPasteDialog` is deliberately **not** in the barrel and is reached only by a relative import from its one consumer (`KeyframeTimeline.vue:169`). Given C-5 (a half-dead generic API), keeping it unexported is exactly right — the speculative surface is at least not public.

---

# Repair order (dependency-sorted, for whoever picks this up)

1. **C-1** — add `scroll` to `<DialogContent>`. One attribute; unblocks the component.
2. **C-2 + C-3** — swap the `<pre contenteditable>` for `<Textarea v-model="text">` from `@mkbabb/glass-ui/forms` (a subpath the parent already imports). This retires the caret rewrite, the missing accessible name, the missing placeholder, and the horizontal-overflow half of C-1 in one move. File as census row **S-9**.
3. **C-4 + C-8** — give `submit` a failure channel (a `busy`/`error` prop pair, or let the consumer keep the dialog open) and disable the button on empty text. Then decide the state-ownership question against the sibling: one of the two dialogs is wrong about who owns `text`.
4. **C-5** — delete `initialText`, `preClass`, the `footer-extra` slot and `defineExpose` — **or** migrate `KeyframesAddDialog` onto this component, which is what `footer-extra` was built for. Do not leave it half-general.
5. **C-6 + C-7** — drop the two stale classes, wrap the title/description in `DialogHeader`.
6. **C-10** — a spec pinning: reset-on-open, empty-submit, and (post-fix) close-only-on-success.

**C-11 (F-1) gates all of it**: none of the above is reproducible until `@mkbabb/glass-ui` is declared and locked.

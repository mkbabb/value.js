claude-opus-5[1m]

# Challenge C · CONSUMPTION — `KeyboardShortcutsModal.vue`

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/KeyboardShortcutsModal.vue` (69 lines)
**Axis:** CONSUMPTION — how this component consumes keyframes.js the library and glass-ui the design system.
**Mode:** static, read-only. No installs, no dev servers, no browser tooling. Every claim carries file:line provenance and its own falsifier.
**Corpus folded (not re-derived):** `docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md` — F-1 (phantom dep), §3.1 (21/73 subpath utilisation), §3.2 (root-barrel roster), §5 (S-1..S-8 shadow census). This challenge **extends** the census with **S-9** (§C-9) and **contradicts nothing** in it.

**Sole write:** this file. No product source in any repo was touched.

---

## 0. Headline

| # | Finding | Severity |
|---|---|---|
| C-1 | Escape closes the modal **and** fires the global `Escape → Stop animation` shortcut. Both listeners are live; neither stops the other. | **MAJOR** |
| C-2 | `DialogContent` ships a `scroll` prop for exactly this job (`scroll?: boolean`, "make its content the single vertical scroll owner"). The component hand-rolls it on an inner div, capped by a **mobile-panel** token. | **MAJOR** |
| C-3 | The entire global shortcut registry stays live behind the open modal. `Space` (`preventDefault: true`) is the worst case — it hijacks the modal's own Close button. | **MAJOR** |
| C-4 | Missing the `@interact-outside` toaster guard that **both** sibling dialogs carry — and C-3 is what makes a toast appear over this modal in the first place. | **MAJOR** |
| C-5 | The `?` binding is rendered twice inside one dialog: hardcoded at `:7` and again as a registry row. | MINOR |
| C-6 | `{{ shortcut.options.label }}` is unguarded against an **optional** field; safety rests on an undocumented runtime filter. | MINOR |
| C-7 | `:key="shortcut.raw"` keys on a field the registry does not guarantee unique — glass-ui itself registers a second `"Escape"`. | MINOR |
| C-8 | `Dialog*` drawn from the 62-module root barrel while `@mkbabb/glass-ui/dialog` (11 modules) exists — in a file that already demonstrates subpath discipline two lines below. | MINOR |
| C-9 | **S-9 (new shadow):** glass-ui `/command` ships `CommandDialog`/`CommandList`/`CommandGroup(heading)`/`CommandItem`/`CommandShortcut` — the exact grouped-label-plus-keycap shape hand-rolled here. | MINOR |
| C-10 | Group render order is Map-insertion order = registration order. No explicit ordering authority. | INFO |
| C-11 | Props contract is a single required model with zero pass-through for `DialogContent`'s five documented presentation axes. | INFO |
| C-12 | Both import specifiers resolve to an **undeclared, unlocked** package (fold of F-1). | INFO |
| C-13 | `text-muted-foreground` on `DialogDescription` restates the primitive's own default. | MINOR |
| C-14 | Zero test / demo-roster coverage. | INFO |

**Defects: 14 · Blockers: 0 · Superlatives: 6.**

I record **zero blockers deliberately.** C-1/C-3 are ironic (a *keyboard* help surface with broken keyboard interaction) but the modal still opens, still closes on Escape and on the X, and Tab-then-Enter still activates Close. Nothing here fails a build or crashes a runtime. Inflating any of these to BLOCKER would be the false positive this lane is told to fear more than a miss.

---

## 1. What the component actually consumes

Two specifiers, three seams (`KeyboardShortcutsModal.vue:41–51`):

```
:41–47  import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@mkbabb/glass-ui";
:48–51  import { useRegisteredShortcuts, formatComboParts } from "@mkbabb/glass-ui/keyboard";
```

Static graph, measured against the installed 7.0.0 (`node_modules/@mkbabb/glass-ui/dist/`):

| entry | modules pulled | externals |
|---|---|---|
| `glass-ui.js` (root barrel) | **62** | `vue`, `reka-ui`, `@lucide/vue`, `@mkbabb/keyframes.js` |
| `dialog.js` (subpath) | **11** | `vue`, `reka-ui`, `@lucide/vue`, `@mkbabb/keyframes.js` |
| `keyboard.js` (subpath) | **1** | `vue`, `@vueuse/core` |

**keyframes.js the library is never imported here** — no `@kf-engine`, no `@mkbabb/keyframes.js`, no `@src`. The component touches the engine only transitively, through glass-ui's `useSpringMount-DrKU3wX2.js` (the one module in the dialog graph that imports `@mkbabb/keyframes.js`), which is the deliberate alias-held cycle documented at `demo/vite.config.ts:28–36` and folded into lane-frontend §8.

**value.js is not reachable from this component at all.** The chunks that import `@mkbabb/value.js` are `easing.js`, `dock.js`, `value-DMhh2R94.js`, `accent-tone-solve-Cw7WkRD9.js`, `color.js`, `aurora.js` — and **none** appears in the `dialog.js`, `keyboard.js`, or `glass-ui.js` transitive graphs. **The R1 parser-crash class (`parseCssColor("oklch()")`) is therefore NOT reachable from this slug.** I looked for it because the axis asks; it is not here, and I will not manufacture it.

> *Falsifier for the whole §1:* a module-graph trace showing `@mkbabb/value.js` reachable from `dialog.js`/`keyboard.js`/`glass-ui.js`, or a runtime dynamic `import()` inside those chunks that a static trace misses. My trace was static and followed `from "…"` / `import "…"` specifiers only.

---

## 2. Defects

### C-1 · Escape closes the modal **and** stops the animation — MAJOR

Two independent `keydown` listeners on `window` both see the same Escape:

1. **glass-ui's registry dispatcher.** `dist/keyboard.js:76–80` binds `useEventListener(window, "keydown", …)` once, lazily, via `createGlobalState`. The dispatcher (`:67–73`) skips a shortcut only when `!allowInInput && f(target)`, and `f` (`:48–52`) returns true **only** for `INPUT`/`TEXTAREA`/`SELECT`/`isContentEditable`/`.monaco-editor`. A `DialogContent` div is none of those. Escape gets a LIFO pass (`:68 — g(n) ? [...e].reverse() : e`) and fires the first match.
2. **reka's DismissableLayer.** `node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js:72–77` — `onKeyStroke("Escape", …)` → `emits("escapeKeyDown")` → `emits("dismiss")`. It calls neither `stopPropagation()` nor `preventDefault()`.

The registry's Escape entry is `registerShortcut("Escape", () => reset(), { label: "Stop animation", group: "Playback" })` at `demo/components/instrument/transport/AnimationControlsGroup/useControlsKeyboardShortcuts.ts:51`. `AnimationControlsGroup` is mounted at `EditorShell.vue:75`, the modal is its sibling at `EditorShell.vue:106` — both live simultaneously.

**Result:** pressing Escape to dismiss the shortcuts sheet also stops and resyncs the running animation. The component has no `@escape-key-down` handler, no `onMounted`/`onUnmounted`, no lifecycle surface of any kind — all 69 lines are template plus one computed.

The consumer is also **structurally unable** to fix this at its own seam: `dist/keyboard.d.ts` re-exports exactly five symbols (`isMac`, `formatComboParts`, `formatCombo`, `registerShortcut`, `useRegisteredShortcuts`). There is **no scope, no pause, no suspend, no priority** affordance in the published surface. The correct repair is a glass-ui `/keyboard` addition, relayed per the standing BH/BI law — not a demo-local hack.

> *Falsifier:* show reka calling `stopPropagation()` on the Escape keydown, or show `f()` (`keyboard.js:48–52`) returning true for a dialog-content element, or show any unregistration of the `Escape` binding while `open === true`. Any one kills this.

### C-2 · `DialogContent.scroll` is shadowed by a hand-rolled scroller on a borrowed token — MAJOR

`KeyboardShortcutsModal.vue:10`:

```html
<div class="grid gap-4 max-h-[var(--panel-max-h)] overflow-y-auto pr-1">
```

The primitive already owns this. `dist/components/dialog/DialogContent.vue.d.ts:52–56`:

```
/**
 * Bound the dialog to the viewport and make its content the single vertical
 * scroll owner.
 */
scroll?: boolean;
```

Implementation, `dist/dialog-BKSTfmIQ.js:244`:

```js
Y = a(() => d.scroll ? g.value ? "max-h-[calc(100dvh-2rem)] overflow-y-auto" : "overflow-y-auto" : "")
```

…plus a `data-scroll` attribute hook on the content element (`:279`). The prop defaults to `false` (`:186–189`) and the component never passes it.

Three consequences, each independently checkable:

**(a) The cap is a borrowed mobile token.** `--panel-max-h: 60dvh` is defined at `demo/styles/design-idioms.css:48` and documented at `:46` as *"`--panel-max-h` caps mobile panels"*. `demo/DESIGN.md:136` names it a geometry token; `demo/styles/layout.css:9` confirms the home. Its only other consumer is `demo/components/instrument/transport/AnimationControlsGroup.vue:85` — an actual mobile panel. Retuning the mobile panel cap silently resizes the desktop shortcuts dialog. Two unrelated surfaces, one knob.

**(b) The dialog has no height bound of its own.** `DialogContent`'s centered base class (`dialog-BKSTfmIQ.js:163`) is `fixed left-1/2 top-1/2 … max-w-lg gap-4 … py-(--overlay-pad-block)` — **no `max-height`**; that arrives only with `scroll`. So the dialog's total height is `60dvh + header + 2× --overlay-pad-block (≈1.9rem each) + gap-4`, i.e. `0.6·vh + ≈133px`. It exceeds the viewport when `vh < ≈332px`, at which point the centered, `-translate-y-1/2` box clips off both edges with **no** scroll owner. That is a narrow window (short landscape / split-screen), not a headline break — I flag it as arithmetic, not as an observed break. **UNPROVEN-NEEDS-LIVE** for the exact breakpoint; the absence of a max-height in the base class is source-certain.

**(c) The scroller is not keyboard-reachable.** The inner `<div>` holds zero focusable descendants — every row is `div`/`span`/`kbd`. `DialogContent`, by contrast, receives `tabindex="-1"` from reka's FocusScope (`node_modules/reka-ui/dist/FocusScope/FocusScope.js:142`) and is focused on open. Moving the overflow up to `DialogContent` via `scroll` makes the scroll owner the focused element and arrow-key scrolling works everywhere. As written it depends on the browser's keyboard-focusable-scrollers behaviour. **UNPROVEN-NEEDS-LIVE** per-engine; the DOM facts are static.

**(d) `pr-1` is a hand-rolled scrollbar gutter.** glass-ui ships `.scroll-gutter-stable { scrollbar-gutter: stable; }` at `dist/styles/utilities/base-misc.css` (`@layer components`), already in the cascade via `demo/styles/style.css:3`. Demo usage: `grep -rn "scroll-gutter-stable" demo/` → **zero**.

> *Falsifier:* show `--panel-max-h` documented as a general overlay cap rather than a mobile-panel cap; or show `DialogContent`'s base class carrying a max-height independent of `scroll`; or show `scroll: true` producing a visual regression the inner-div idiom avoids. The last is the only one I cannot rule out statically — it is the reason C-2 is MAJOR and not BLOCKER.

### C-3 · The whole registry stays live behind the open modal — MAJOR

Nineteen bindings are registered globally (`useControlsKeyboardShortcuts.ts:50–71` ×18, `EditorShell.vue:190` ×1). None is suppressed while this modal is open, because the dispatcher's only skip predicate is the editable-target test (C-1). Concretely, with the shortcuts sheet open:

| key | site | effect behind the modal |
|---|---|---|
| `Space` | `useControlsKeyboardShortcuts.ts:50`, `preventDefault: true` | plays/pauses the animation **and** cancels the keydown — which is how browsers cancel `<button>` Space-activation. The dialog's own Close button (`dialog-BKSTfmIQ.js:283–288`) is the first focusable and receives focus on open, so **the modal's Close cannot be activated with Space.** |
| `1` `2` `3` | `:61–63` | switches the control tab underneath |
| `[` `]` | `:59–60` | cycles the animation underneath |
| `Mod+S` | `:64` | copies CSS **and** raises a toast over the modal → see C-4 |
| `R` | `:52` | resets the animation |
| `←` `→` | `:53–56`, `preventDefault: true` | scrubs |

The Space case is the one that matters: a keyboard-help dialog whose own primary control is unreachable by the most common activation key. `Enter` still works, and the X is clickable, which is why this is MAJOR and not BLOCKER.

> *Falsifier:* demonstrate that `preventDefault()` on a Space **keydown** does not suppress `<button>` activation in the target engines (the click fires on keyup in some paths) — that would downgrade the Space row to INFO. The double-effect rows (`1`/`2`/`3`/`[`/`]`/`Mod+S`/`R`) stand regardless, and are source-certain. **The Space-activation half is UNPROVEN-NEEDS-LIVE.**

### C-4 · Missing the sibling dialogs' `@interact-outside` toaster guard — MAJOR

Both other `DialogContent` mounts in the demo carry the identical guard:

```
demo/components/instrument/keyframes/components/KeyframesAddDialog.vue:16–22
demo/components/instrument/timeline/CSSPasteDialog.vue:3–10
    @interact-outside="(event) => { if (isInsideToaster(event.target)) return event.preventDefault(); }"
```

`demo/components/instrument/utils/toastGuard.ts:26–28` exists solely to centralise the vue-sonner private-DOM coupling for this purpose. `KeyboardShortcutsModal.vue:3` passes **only** `class="max-w-md"` — no guard.

This is not hypothetical here, and the chain is entirely in-tree: C-3 leaves `Mod+S` live → `useControlsKeyboardShortcuts.ts:64` calls `copyCSS()` → `demo/components/instrument/keyframes/KeyframesStringControls.vue:173–176` calls `copyText(…, "CSS copied to clipboard")` → `demo/utils/clipboard.ts:1` raises a vue-sonner toast → the `<Toaster>` is a **document-level singleton** teleported out of the dialog subtree (`demo/components/instrument/transport/components/DemoGlobalChrome.vue:28,48`; the intent is stated at `AnimationControlsGroup.vue:114`). A click on that toast is therefore an interact-outside for this dialog → the shortcuts sheet dismisses itself.

The precedent is unambiguous: 2 of 3 dialogs guard; this one does not.

> *Falsifier:* show the `<Toaster>` rendering **inside** this dialog's DOM subtree (it does not — it is `<html>`-teleported), or show `Mod+S` being suppressed while a dialog is open (nothing does that — see C-3).

### C-5 · The `?` binding is rendered twice in one dialog — MINOR

`KeyboardShortcutsModal.vue:7` hardcodes:

```html
Press <kbd class="kbd">?</kbd> to toggle this panel
```

`EditorShell.vue:190` registers `registerShortcut("?", …, { label: "Show shortcuts", group: "General" })` — **with a label**, so it passes the `labeled` filter (`keyboard.js:83`) and is emitted by `useRegisteredShortcuts()`. The same dialog therefore shows the description line *and* a `General → Show shortcuts → ?` row.

Two smaller edges ride along: the `"?"` string is duplicated across two files with no link, so re-binding at `EditorShell.vue:190` leaves `:7` lying; and `:7` bypasses `formatComboParts`, the very helper the file imports at `:50` and uses at `:26`. (`formatComboParts("?")` returns `["?"]` — `keyboard.js:53–55` falls through to `e.trim()` — so today the two paths agree by luck, not by construction.)

> *Falsifier:* show `registerShortcut("?")` being called **without** a label (it is labelled), or show `useRegisteredShortcuts()` returning the unfiltered set (it returns `labeled`, `keyboard.js:99–102`).

### C-6 · Unguarded render of an optional field — MINOR

`:22` renders `{{ shortcut.options.label }}`. The published type says `label?: string` (`dist/composables/keyboard/useKeyboardShortcuts.d.ts:9`) and `useRegisteredShortcuts(): ComputedRef<RegisteredShortcut[]>` (`:33`) — **nothing in the type says the array is filtered.** The filter exists only in the minified runtime (`keyboard.js:83 — [...t].filter((e) => e.options.label)`).

So the component is safe today by an implementation detail the contract does not promise, and the file already proves it knows the difference: `:61` defensively handles the *other* optional field with `s.options.group ?? "General"`. The asymmetry is the tell — `group` is guarded, `label` is not.

> *Falsifier:* find a doc comment or type-level guarantee on `useRegisteredShortcuts` stating it returns only labelled entries. I read `keyboard.d.ts` and `useKeyboardShortcuts.d.ts` whole; there is none.

### C-7 · `:key="shortcut.raw"` keys on a non-unique field — MINOR (latent)

`:18` keys rows by `shortcut.raw`. `registerShortcut` (`keyboard.js:86–98`) pushes a **fresh object into a `Set`** with no de-duplication on `raw` — two live registrations of the same combo coexist by design.

This is not theoretical: glass-ui's own `dist/expandable-container.js` calls `registerShortcut("Escape", …, { label: "Exit fullscreen", group: "UI" })` plus two labelled expand/collapse bindings in `group: "UI"`. Mount an `ExpandableContainer` anywhere in the demo and the registry holds two labelled `"Escape"` entries → duplicate Vue keys in the `v-for` → the `Duplicate keys found during update` warning and unstable patching.

**Latent today:** `/expandable-container` is not among the 21 subpaths the demo consumes (lane-frontend §3.1), and `ExpandableContainer` is absent from the root-barrel named-import roster (§3.2). A composite key (`` `${group}:${raw}:${i}` ``) costs nothing.

I checked the other duplicate-registration path and it is **clean**: `AnimationControlsGroup` is mounted exactly once (`EditorShell.vue:75`), imported **statically** at `EditorShell.vue:120` — not through the `defineAsyncComponent` at `transport/index.ts:9` — so the `<Suspense :key="activeSceneKey">` at `App.vue:90` sits *below* it and cannot double-mount it. A keyed swap on `:key="superKey"` unmounts before it mounts. No concurrent duplicate from that path. Claim withdrawn.

> *Falsifier:* a uniqueness guarantee on `raw` in the registry. There is none — `keyboard.js:86–98` is a bare `Set.add`.

### C-8 · Root barrel for `Dialog*` where a subpath exists — MINOR

`:41–47` draws five Dialog symbols from `@mkbabb/glass-ui`. `./dialog` is a first-class export (`package.json` exports map, 73 entries) and `dist/dialog.js` re-exports the identical bindings. Cost measured above: 62 modules vs 11.

The **incremental** cost in this build is genuinely zero — `EditorShell.vue:124` already imports `Button` from the root barrel, so the 62-module graph is resident either way. That is the honest falsifier and it is why this is MINOR, not MAJOR. What survives is hygiene: the same 11-line import block reaches for the barrel on one line and the precise subpath on the next, and the demo has no stated subpath policy (lane-frontend §3.1: 31 root-barrel imports vs 21 subpaths, 29% utilisation). Pick one rule.

> *Falsifier:* the measurement above — if no other demo file imported the root barrel, this would be MAJOR; one does, so it is MINOR.

### C-9 · S-9 (new shadow): glass-ui `/command` already models a grouped shortcut sheet — MINOR / *evaluate*

Extending the S-1..S-8 census. `dist/components/command/index.d.ts` exports `Command`, `CommandDialog`, `CommandEmpty`, `CommandGroup`, `CommandInput`, `CommandItem`, `CommandList`, `CommandSeparator`, **`CommandShortcut`**. `CommandGroup` takes a `heading?: string` prop (`CommandGroup.vue.d.ts:5`) — the `<h3>{{ group }}</h3>` at `:12–14`. `CommandShortcut` is the trailing keycap slot — the `<kbd>` cluster at `:24–30`. `CommandList` is the scroll owner — the div at `:10`. `/command` is **never imported** by the demo (lane-frontend §3.1).

**This is `evaluate`, not `replace`.** `CommandDialog` is combobox-backed (`ComboboxRootProps`, `CommandDialog.vue.d.ts:3–6`) and would impose search/selection roles on a read-only reference sheet — arguably wrong semantics. And `components/command/styles.css` is **absent** from the `dist/styles/index.css` import chain, so adopting it needs a second style import. I flag the shadow so the census is complete, and I flag the reason not to take it mechanically in the same breath.

> *Falsifier:* show `CommandItem` usable without a `CommandInput`/combobox ancestor and without imposing `option`/`listbox` roles — that would promote this from *evaluate* to *replace*.

### C-10 · Group order is registration order — INFO

`:57–67` builds a `Map` and `:11` iterates it. `Map` preserves insertion order, and insertion order is registration order: `EditorShell`'s setup (`General`) runs before its child `AnimationControlsGroup` (`Playback`, `Navigation`, `Actions`). Deletion-plus-reinsertion moves a group to the tail, so any future scope teardown/rebind reorders the printed reference sheet with no code change at this file. There is no explicit ordering authority — no group-priority map, no sort.

> *Falsifier:* find an ordering authority (a sort, a canonical group list) anywhere in the chain. I found none in the component, the composable, or `keyboard.js`.

### C-11 · Props/emits contract: one required model, zero escape hatches — INFO

`:53` is the whole public surface: `defineModel<boolean>('open', { required: true })`. No `defineProps`, no `defineEmits`, no `defineOptions`.

- `required: true` forecloses the uncontrolled mode the primitive offers (`Dialog` accepts `defaultOpen`, `dialog-BKSTfmIQ.js:18`).
- `DialogContent`'s five documented presentation axes — `surface`, `placement`, `motion`/`springPreset`, `showClose`, `scroll`, `stage` (`DialogContent.vue.d.ts:7–64`) — are all hard-coded at their defaults with no pass-through. A second host (a docs page, an embedded shell) cannot retune any of them.
- Without `inheritAttrs: false`, fallthrough attrs would land on `<Dialog>`, whose reka `DialogRoot` renders a hidden `<span>` **plus** a slot — a multi-root fragment, so Vue drops them with a dev warning. `EditorShell.vue:106–108` passes none today.

All three are latent-single-consumer facts, hence INFO.

> *Falsifier:* a second mount site for this component. `grep -rn "KeyboardShortcutsModal" demo/` returns exactly one render (`EditorShell.vue:106`) and one import (`:119`).

### C-12 · Both specifiers resolve to an undeclared, unlocked package — INFO (fold of F-1)

Folding lane-frontend **F-1** rather than re-deriving it: `@mkbabb/glass-ui` appears in neither `package.json` nor `package-lock.json`, yet 7.0.0 sits in `node_modules`. Every claim in this challenge is therefore made against an artifact that `npm ci` cannot reproduce. Recorded so this slug's evidence is correctly caveated, not as a new finding.

### C-13 · Redundant tone class on `DialogDescription` — MINOR

`:6` passes `class="text-small text-muted-foreground"`. The primitive's own default is `cn("text-sm text-muted-foreground", props.class)` (`dialog-BKSTfmIQ.js:124`). The `text-small` override is deliberate and correct (see S+6); `text-muted-foreground` merely restates the default, so a future glass-ui change to the description tone is silently overridden at this one call site.

> *Falsifier:* show `DialogDescription` shipping without `text-muted-foreground` — it ships with it, `dialog-BKSTfmIQ.js:124`.

### C-14 · Zero coverage — INFO

`grep -rn "KeyboardShortcuts" test/ scripts/` → no output. `git log --oneline -- demo/components/instrument/shell/KeyboardShortcutsModal.vue` → one commit (`969990f6`, a mechanical relocation). Nothing exercises C-1 through C-7, and the `demo:correctness` roster (`package.json` scripts) does not name it.

---

## 3. Superlatives (L-18, both ways)

**S+1 — There is exactly one source of truth for the shortcut list.** The modal derives every row from the same registry `registerShortcut` writes to (`:55`, `:60`). It cannot drift from the bindings, because there is no second list. *Falsifier:* a hardcoded shortcut array in the component — `grep` shows none; the only literal in the file is the `?` at `:7`, which is C-5.

**S+2 — `/keyboard` is the leanest possible seam.** `dist/keyboard.js` is a **1-module, self-contained** chunk depending only on `vue` and `@vueuse/core`. Of the 21 subpaths the demo reaches, this is the cheapest, and it is the correct one for a registry read. *Falsifier:* a fatter graph on that entry — measured at 1 module, 2 externals.

**S+3 — `formatComboParts`, not `formatCombo`.** The file picks the *parts* API (`:26`) so each chord token becomes its own `<kbd>` — the semantically correct HTML for a key combination, and the reason platform glyphs (`⌘`/`⇧`/`⌥`/`⌫`) arrive for free from `keyboard.js:53–55` via the library's internal `isMac`. Choosing `formatCombo` would have produced one opaque string. *Falsifier:* a local platform check or symbol map in the demo — `grep -rn "isMac\|navigator.platform\|⌘" demo/` → **zero hits**. The component delegates platform knowledge entirely.

**S+4 — `DialogDescription` is used as a primitive, not as a `<p>`.** That is what wires `aria-describedby` on the content element (`reka-ui/dist/Dialog/DialogContentImpl.js:78`). The a11y association is earned by correct consumption, not hand-rolled. *Falsifier:* a raw `<p class="text-small">` at `:6` — there isn't one.

**S+5 — `.kbd` is consumed as-shipped, and it is sanctioned.** `.kbd` is a glass-ui-owned utility (`dist/styles/utilities/base-misc.css`, `@layer components`), in the cascade via `demo/styles/style.css:3`. `grep -rn "\.kbd" demo/**/*.css` → **zero** local definitions. It uses `var(--font-mono)`, which resolves only because `style.css:9` imports `/styles/fonts` — the consumer honoured the documented two-import contract. And `kbd` is an *explicitly enumerated* legal mono leaf in the demo's own T.D4 mono contract (`demo/styles/font-roles.json:68`). Three independent contracts, all honoured. *Falsifier:* a demo-local `.kbd` rule, or `kbd` absent from the sanctioned mono list.

**S+6 — The class overrides genuinely win.** glass-ui's `cn()` is bespoke (`dist/class-names-Cpy5eaBk.js`), and its font-size group regex at `:15` explicitly enumerates `body|small|subheading|admin-label|micro`. So `text-body` (`:5`) really does defeat `DialogTitle`'s `text-subheading`, `text-small` (`:6`) really does defeat `DialogDescription`'s `text-sm` (both map to the same `font-size` group key), and `max-w-md` (`:3`) really does defeat `DialogContent`'s `max-w-lg` via the `max-width` group. Nothing here is a specificity accident. *Falsifier:* if `:15`'s regex omitted the custom scale names they would fall through to the `text-color` catch-all at `:22` and **both** sizes would survive. It does not omit them — I read the regex.

---

## 4. Hypotheses I raised and killed

Recorded because a false defect is worse than a missed one.

| hypothesis | why it died |
|---|---|
| Unlabelled shortcuts render blank rows | `useRegisteredShortcuts` returns `labeled`, which filters on `options.label` (`keyboard.js:83, 99–102`). Downgraded to the *type-contract* point, C-6. |
| The modal can render empty | `EditorShell.vue:190` always registers a labelled `?`, and the modal is `EditorShell`'s own child. Never empty. Dropped. |
| Duplicate `raw` keys from concurrent `AnimationControlsGroup` mounts | Statically imported at `EditorShell.vue:120`, mounted once, keyed swap unmounts first, and the `<Suspense>` at `App.vue:90` is *below* it. Dropped; only the latent glass-ui-internal path survives as C-7. |
| `unmountOnHide` forced `false` by Vue Boolean casting, keeping the list mounted while closed | `reka-ui/dist/shared/useForwardProps.js` forwards only keys that are in `assignedProps` or carry a `default`. `unmountOnHide` has neither (`dialog-BKSTfmIQ.js:20`), so it is not forwarded and reka's own default stands. Dropped. |
| R1 (`parseCssColor("oklch()")`) reachable | value.js appears in `easing/dock/color/aurora/accent-tone-solve` chunks only; none is in this component's graph. Dropped — see §1. |
| `<h3>` breaks heading order under the dialog | reka `DialogTitle` renders `<h2>`; `h2 → h3` is correct. Dropped. |
| `max-w-md` loses to `max-w-lg` | `cn()` `max-width` group, last wins. Dropped — became superlative S+6. |

---

## 5. Wave order, if this slug is repaired

1. **C-1 + C-3 together** — they are one defect with two faces, and the fix is a glass-ui `/keyboard` scope/suspend affordance (relay to the active glass-ui BH inbox per standing law). Do not patch demo-locally.
2. **C-4** — one attribute, copied verbatim from `CSSPasteDialog.vue:4–9`. Independent of everything else.
3. **C-2** — `<DialogContent class="max-w-md" scroll>`, drop `max-h-[var(--panel-max-h)] overflow-y-auto pr-1` from `:10`. Wants one live check that the glass reveal still reads right at `scroll: true`.
4. **C-5, C-6, C-7, C-13** — four one-line edits, no risk.
5. **C-8** — only once the demo has a stated subpath policy; alone it is churn.
6. **C-9** — spec, not swap. Probably decline; record the decision either way so the census stops re-raising it.

---

## Provenance note

Every glass-ui claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` (the installed 7.0.0) and every reka claim from `/Users/mkbabb/Programming/keyframes.js/node_modules/reka-ui/dist/` — the copies the demo actually resolves against, so no upgrade is presumed by any finding. `/Users/mkbabb/Programming/glass-ui` was not read for this challenge. No file in keyframes.js was written, mutated, or executed; no installs, no dev servers, no browser tooling. Three claims are marked **UNPROVEN-NEEDS-LIVE** and are reserved for the SS-13 visual audit: C-2(b) the short-viewport clip breakpoint, C-2(c) per-engine focusable-scroller behaviour, and the Space-activation half of C-3.

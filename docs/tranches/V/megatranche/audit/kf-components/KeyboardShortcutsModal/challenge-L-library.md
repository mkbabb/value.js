claude-opus-5[1m]

# CHALLENGE · `KeyboardShortcutsModal` · axis L (LIBRARY)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/KeyboardShortcutsModal.vue` (69 lines)
**Tree HEAD:** `8281638c fix(demo-shell): provide tooltip context for the routed control group`
**File's last touch:** `969990f6 refactor(demo-home): dissolve the at-sign wrapper and custom component tier into canonical homes`
**Mode:** static, read-only. No installs, no dev server, no browser tooling. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Posture:** assumed DEFECTIVE until the tree proved otherwise. Four candidate defects were killed by their own falsifiers and are recorded in §4 — a false defect costs more than a missed one.

**Tally: 9 defects (1 BLOCKER · 1 MAJOR · 4 MINOR · 3 INFO) · 3 superlatives.**

---

## 0. What the component is

A 69-line **derived view** over glass-ui's global shortcut registry. It holds no shortcut data of its own: `useRegisteredShortcuts()` yields the registry's labeled entries, `groupedShortcuts` buckets them by `options.group`, and `formatComboParts()` renders each `raw` combo into `<kbd>` chips. Opened by `v-model:open` from `EditorShell.vue:106-108`; the `?` binding that toggles it lives at `EditorShell.vue:190`.

Read whole, plus every import: `@mkbabb/glass-ui` (`Dialog`/`DialogContent`/`DialogHeader`/`DialogTitle`/`DialogDescription` — `node_modules/@mkbabb/glass-ui/dist/dialog-BKSTfmIQ.js`), `@mkbabb/glass-ui/keyboard` (`node_modules/@mkbabb/glass-ui/dist/keyboard.js`, types at `dist/composables/keyboard/useKeyboardShortcuts.d.ts`), plus the transitive substrate that decides its behaviour: `reka-ui/dist/DismissableLayer/DismissableLayer.js`, `demo/components/instrument/transport/AnimationControlsGroup/useControlsKeyboardShortcuts.ts`, `.../useAnimationGroupActions.ts`, `demo/styles/design-idioms.css`, `demo/styles/layout.css`, `glass-ui/dist/styles/utilities/base-misc.css`.

---

## 1. Defects

### L-1 · BLOCKER · The whole component resolves from an undeclared package — and its CSS contract is a *second*, invisible edge that an import-only fix would miss

**Provenance.**
- `KeyboardShortcutsModal.vue:41-47` imports 5 components from `@mkbabb/glass-ui`.
- `KeyboardShortcutsModal.vue:48-51` imports 2 symbols from `@mkbabb/glass-ui/keyboard`.
- `keyframes.js/package.json` — `grep -c "glass-ui" package.json` → **0**.
- `keyframes.js/package-lock.json` — `grep -c "glass-ui" package-lock.json` → **0**.
- `node_modules/@mkbabb/glass-ui/package.json:version` → `7.0.0`, installed anyway.

This is census finding **F-1** (`formation/keyframes/lane-frontend.md`, headline row 1, RED), and I **confirm it without amendment at the import level**. `npm ci` on a clean checkout resolves neither specifier; the demo build dies before this file is ever evaluated.

**The extension F-1 does not carry.** F-1 censused *import specifiers*. This component has a **third** undeclared edge that no import-graph tool sees: **four Tailwind/CSS class names whose only definitions live inside glass-ui's stylesheet**, reached via `@import "@mkbabb/glass-ui/styles"` at `demo/styles/style.css:3`:

| class | site | sole definition |
|---|---|---|
| `.kbd` | `:7`, `:28` | `glass-ui/dist/styles/utilities/base-misc.css` (`@layer components`), reached via `dist/styles/index.css → utilities.css → utilities/base-misc.css` |
| `text-body` | `:5` | `glass-ui/dist/styles/typography/semantic.css` (`@utility text-body`) |
| `text-small` | `:6`, `:21` | same file (`@utility text-small`) |
| `text-admin-label` | `:12` | same file (`@utility text-admin-label`) |

`grep -rn "kbd" demo/ --include="*.css"` → **zero hits**. The demo owns no fallback. So a remediation that only vendored the five Dialog components and the keyboard composable would compile, ship, and **silently regress every `<kbd>` chip in this component to UA-default inline text** — the one visual element the component exists to render. That is the sharpest, component-specific bite of F-1 and it is not in the census.

**Falsifier.** Any of: (a) `@mkbabb/glass-ui` appearing in `package.json` dependencies/devDependencies or in `package-lock.json`; (b) a `.kbd` rule, or `@utility text-body|text-small|text-admin-label`, defined anywhere under `demo/`; (c) an npm/workspace alias or `overrides` block that resolves the specifier without a manifest entry (none exists — `package.json` has no `workspaces`, no `overrides`, no `resolutions`).

---

### L-2 · MAJOR · Dismissing the modal with `Escape` **hard-stops and rewinds the running animation**

The component mounts a modal layer over a shortcut registry that has **no concept of modality**. Pressing `Escape` to close the help panel runs *both* handlers.

**Chain, fully source-derived:**

1. `reka-ui/dist/DismissableLayer/DismissableLayer.js:72-77` — `onKeyStroke("Escape", (event) => { … emits("escapeKeyDown", event); if (!event.defaultPrevented) emits("dismiss") })`. `onKeyStroke` (vueuse) defaults to `window`/`keydown` and calls neither `stopPropagation()` nor `stopImmediatePropagation()`. → the dialog closes.
2. `glass-ui/dist/keyboard.js` — the `createGlobalState` singleton installs `useEventListener(window, "keydown", …)`; the dispatcher's *only* suppression is `isEditableTarget(e.target)`, which tests `INPUT|TEXTAREA|SELECT|isContentEditable|closest(".monaco-editor")`. At `Escape` time focus is inside `DialogContent` (reka focuses the content element or its close `<button>`) — **none of those predicates hold**, so no skip.
3. `useControlsKeyboardShortcuts.ts:51` — `registerShortcut("Escape", () => reset(), { label: "Stop animation", group: "Playback" })`. Registered unconditionally in `AnimationControlsGroup`'s setup, a live sibling of this modal under `EditorShell` (`EditorShell.vue:75, :106`).
4. `useAnimationGroupActions.ts:55-59` — `const reset = () => { getGroup().stop(); syncPlayState(false) }`, whose own comment reads *"`stop()` **rewinds + halts the draw loop** … it is the **hard reset**"*.

**Failure scenario.** User is scrubbed to t≈0.6 mid-animation. Presses `?` to check a binding. Presses `Escape` to dismiss. The panel closes **and** the keyframes `AnimationGroup` is rewound to t=0 and halted. The playhead position is destroyed by an action the user reads as "close this dialog".

This is also the component's **only** contact with the keyframes engine, and it is a reach-through: the modal never imports the engine, yet dismissing it invokes `AnimationGroup.stop()`. Same root cause, same keypress-window, additional manifestations: `Space` (`:50`, `preventDefault: true`) toggles playback while the help is open; `ArrowLeft`/`ArrowRight` (`:53-54`) scrub; `Home`/`End` (`:57-58`) jump the playhead.

**Locus + minimal cure.** Observable through this component, which is the only party that knows it is open. glass-ui's keyboard surface exports exactly `formatCombo, formatComboParts, isMac, registerShortcut, useRegisteredShortcuts` (`dist/keyboard.d.ts`) — **there is no pause/suspend API**, so the cure is a glass-ui addition (a registry `paused` flag, or a modality depth counter) relayed to the glass-ui BH inbox per the standing relay edict, with a demo-side guard as the interim. Not curable inside this file alone; that is part of the finding.

**Falsifier.** Any of: (a) reka calling `stopPropagation()`/`stopImmediatePropagation()` on the Escape keydown before the window listener — it does not (line 72-77 read in full); (b) glass-ui's `isEditableTarget` matching the focused dialog element — it cannot, the predicate list is closed; (c) `AnimationControlsGroup` not being mounted while the modal is open — it is unconditionally mounted at `EditorShell.vue:75` with only a `hide-controls` *prop*, not a `v-if`; (d) a second `Escape` registration later in the Set that short-circuits the dispatch — the LIFO reversal at `keyboard.js` (`isEscape ? [...set].reverse() : set`) still terminates on the *first* match, and enumeration finds exactly **one** `Escape` registration in the whole demo (`grep -rn 'registerShortcut(' demo/` → 20 calls, one Escape).
`UNPROVEN-NEEDS-LIVE`: only the *perceptual* severity (whether the rewind is visually obvious at the moment of dismissal) needs SS-13; the state transition itself is proven by source.

---

### L-3 · MINOR · The modal's own scroll region cannot be scrolled by keyboard — two independent causes

`:10` declares `max-h-[var(--panel-max-h)] overflow-y-auto`. `--panel-max-h: 60dvh` (`demo/styles/design-idioms.css:48`, on `:root`, so it inherits into the `DialogPortal` teleport — that part is correct). The container **will** overflow: 19 rows × ~2rem + 4 group headers × ~1.1rem + `gap-4`×3 + `gap-1`×15 ≈ **49rem ≈ 784px**, against 60dvh ≈ 540px on a 900px-tall viewport.

Two independent defects then make it keyboard-unreachable:

- **(a)** The scroller carries no `tabindex="0"`. In Chromium and WebKit a scrollable `<div>` with no focusable content path is not keyboard-focusable (Firefox auto-assigns; the other two do not). WCAG 2.1.1.
- **(b)** Even with focus, the three canonical scroll keys are globally intercepted **with `preventDefault: true`**: `Space` (`useControlsKeyboardShortcuts.ts:50`), `Home` (`:57`), `End` (`:58`). `PageUp`/`PageDown` are unbound and survive; `ArrowUp`/`ArrowDown` are unbound and survive — but arrow-scrolling requires (a) to be fixed first.

Net: on a laptop viewport, a keyboard-only user can open the shortcuts help and cannot reach the bottom group.

**Falsifier.** (a) dies if `DialogContent` itself becomes the scroller — it does not here: `scroll` defaults to `false` (`dist/dialog-BKSTfmIQ.js`, `scroll: { type: Boolean, default: !1 }`), so the content box does not scroll and the inner div is the only scroller. The whole finding dies on a viewport where `60dvh ≥ 49rem` (≈1310px tall) — real on a 4K/portrait display, not on the laptop/phone class the demo targets.
`UNPROVEN-NEEDS-LIVE`: the exact overflow threshold (my 49rem is arithmetic over `type-small` clamps, not measured).

---

### L-4 · MINOR · `:key="shortcut.raw"` leans on a uniqueness the registry does not guarantee

`:18` keys each row by `shortcut.raw`. But the registry is a `Set` **of objects** (`keyboard.js`: `let t = new Set()`; `registerShortcut` builds `{combo, raw, handler, options}` and `.add`s it). Two `registerShortcut("R", …)` calls from different components both survive as distinct members with identical `raw`. `RegisteredShortcut` (`dist/composables/keyboard/useKeyboardShortcuts.d.ts`) carries **no id field**, and nothing in glass-ui dedupes by `raw`.

**Honest status: latent contract, not a live bug.** I enumerated all 20 `registerShortcut` call sites (`useControlsKeyboardShortcuts.ts:50-71` ×19, `EditorShell.vue:190` ×1). Within each group the `raw` values are distinct — Playback {Space, Escape, R, ArrowLeft, ArrowRight, Shift+ArrowLeft, Shift+ArrowRight, Home, End}, Navigation {[, ], 1, 2, 3}, Actions {Mod+S, Delete, Mod+Z, Mod+Shift+Z}, General {?}. **Zero collisions today.** I also checked the obvious double-mount path — `<AnimationControlsGroup :key="superKey">` (`EditorShell.vue:76`) — and it is safe: Vue's `patch()` unmounts the old vnode *before* mounting the new one on a key change, and glass-ui's `getCurrentScope()`/`onScopeDispose(unregister)` fires synchronously in `scope.stop()`, so registrations never overlap.

The defect is that the key's safety is an accident of the current call-site census, not a property. A third registration site, or a `<Transition mode="default">` around the controls group, silently produces `Duplicate keys found during update` plus mis-patched rows.

**Falsifier.** A documented or enforced raw-uniqueness guarantee in glass-ui (there is none in `keyboard.d.ts` or `keyboard.js`), or a demo invariant test asserting it (`grep -rln "shortcut" test/ scripts/` → only `scripts/observe/demo/live-session.mjs`, which is an observation harness, not an assertion).

---

### L-5 · MINOR · `--panel-max-h` is the **mobile panel** cap, borrowed here as a desktop dialog cap

`:10` consumes `--panel-max-h`. Its definition site documents its meaning narrowly: `design-idioms.css:46-48` — *"`--panel-max-h` **caps mobile panels**"* — and `layout.css:9-11` re-anchors it there. Its only other consumer, `AnimationControlsGroup.vue:85`, uses it exactly as documented (the mobile controls pane). This component is a **centred desktop dialog** and takes the same token.

Consequence: retuning the mobile panel cap silently resizes an unrelated desktop dialog, with no comment at either end recording the coupling. This is a token-semantics defect, not a magic number — the fix is a distinct token (or an explicit note extending `--panel-max-h`'s charter), not a literal.

**Explicitly not a duplication finding.** glass-ui *does* ship a dialog-scroll posture — `<DialogContent scroll>` → `max-h-[calc(100dvh-2rem)] overflow-y-auto` on the content box (`dist/dialog-BKSTfmIQ.js`). The hand-roll declines it **for a reason**: `scroll` scrolls the *whole* content including the header, whereas the inner div pins `DialogHeader` and scrolls only the list. That is the better UX and I will not call it a fork (contrast **F-4**, where the hand-rolled timeline cluster has no such justification — that census finding stands; this is not another instance of it).

**Falsifier.** The definition-site comment saying "generic panel cap" rather than "mobile panels", or a third consumer establishing it as a general cap. Neither holds — the token has exactly two consumers and one documented meaning.

---

### L-6 · MINOR · One hardcoded shortcut string — the file's single drift seam

`:7` — `Press <kbd class="kbd">?</kbd> to toggle this panel`. This is the **only** shortcut literal in the file, and it restates `EditorShell.vue:190` (`registerShortcut("?", …, { label: "Show shortcuts", group: "General" })`) rather than deriving it. Rebind the toggle and the description lies; nothing typechecks, lints, or tests the pair.

Sharpened by irony: the same `?` binding **already renders one line lower** via the derived path, as the sole row of the "General" group. The literal is both a drift risk and redundant with the very list it introduces.

**Falsifier.** A test or type asserting the description tracks the registration (none), or the description text being derived from the registry (it is a static template literal).

---

### L-7 · INFO · Structural echo where glass-ui exports the nominal type

`:58` — `new Map<string, typeof shortcuts.value>()`. `typeof shortcuts.value` resolves to `RegisteredShortcut[]`, which glass-ui **exports by name** (`export interface RegisteredShortcut`, `dist/composables/keyboard/useKeyboardShortcuts.d.ts`). The echo is correct and costs nothing at runtime; it costs greppability — a rename or shape change in glass-ui's `RegisteredShortcut` produces no reference from this file. Taste-adjacent; recorded because the axis names "wrong types" explicitly, and this is the file's only type-surface choice.

**Falsifier.** `RegisteredShortcut` not being exported from `@mkbabb/glass-ui/keyboard` (it is, on the last line of the `.d.ts` re-export chain `keyboard.d.ts → composables/keyboard/index.d.ts → useKeyboardShortcuts.d.ts`).

---

### L-8 · INFO · The rendered label is `string | undefined`; the non-emptiness guarantee is undocumented and lives in another repo

`:22` renders `{{ shortcut.options.label }}`. The declared type is `label?: string` (`ShortcutOptions`, `useKeyboardShortcuts.d.ts`). The component does no filter and no fallback. Under `"strict": true` (`tsconfig.json:7`) a template interpolation of `string | undefined` is legal and renders `""`.

The guarantee is real but implicit: `useRegisteredShortcuts()` returns the `labeled` computed, which is `[...shortcuts].filter(s => s.options.label)` (`keyboard.js`). That filter is **not** reflected in the return type (`ComputedRef<RegisteredShortcut[]>`, unnarrowed) and carries **no doc comment** — `useRegisteredShortcuts` is the one export in the `.d.ts` with no JSDoc at all, while every `ShortcutOptions` field has one.

Failure mode if glass-ui ever widens `labeled`: silent blank rows with correctly-rendered key chips. No throw, no warning, no type error — the file's only error posture is "trust an undocumented upstream filter".

**Falsifier.** `useRegisteredShortcuts` returning a narrowed type (e.g. `RegisteredShortcut & { options: { label: string } }`) or documenting the filter. Neither is present in 7.0.0.

---

### L-9 · INFO · A term/description list rendered as bare `<div>`s (axis-boundary — may route to the a11y lane)

`:15-31` renders 19 action→keys pairs as nested `<div>`s. Semantically this is a description list: `<dl>` / `<dt>`{label} / `<dd>`<kbd>…</kbd>. As written there is no programmatic association between an action and its chips, no list role, and the group `<h3>` (`:12`) is not tied to its rows (`aria-labelledby` / `role="group"`). Screen-reader output degrades to an unstructured run of text. The `<h3>` *level* is correct (glass-ui's `DialogTitle` forwards reka's `<h2>`), so the heading hierarchy is sound — only the association is missing.

Flagged INFO and marked axis-boundary rather than claimed hard, since the SS-13/a11y lane may own it.

**Falsifier.** Screen-reader output already conveying the pairing via visual/DOM order alone — plausible for a simple two-column row, which is exactly why this is INFO and not MINOR. `UNPROVEN-NEEDS-LIVE` for the SR transcript.

---

## 2. Superlatives (L-18 runs both ways)

### S-1 · The zero-duplication derived view — the drift bug is *designed out*

The component contains **no shortcut table**. The single source of truth is the `options.label` / `options.group` passed at each `registerShortcut` call, and the modal is a pure projection: group (`:11, :61`), label (`:22`), chips (`:26`). The near-universal failure mode for a shortcuts panel — a hand-maintained list that silently diverges from the actual bindings — is structurally impossible here for 19 of 20 registrations.

The tree also shows the *upstream* half of the discipline: `useControlsKeyboardShortcuts.ts:29-34` states the contract in prose — *"Every binding routes through the ONE existing glass-ui `registerShortcut` registry (not a second window listener), so they inherit the editable-target skip **and surface in the KeyboardShortcutsModal**"* — and the newer bindings honour it (`:66-69`, the F.W14.S1 undo/redo pair, added through the registry rather than a fresh listener). The invariant held across at least one later change; that is the test that matters.

**Falsifier.** Any hardcoded shortcut string in the file beyond one. There is exactly one — `:7`, filed above as **L-6**. The superlative and its single blemish are the same observation seen from both ends.

### S-2 · Zero teardown surface — the component cannot leak

`:40` imports **only** `computed` from vue. No `onMounted`, no `watch`/`watchEffect`, no `addEventListener`, no `setInterval`/`requestAnimationFrame`, no template ref, no DOM handle. `useRegisteredShortcuts()` returns a `ComputedRef` belonging to a `createGlobalState` **detached** effect scope (`keyboard.js`: `createGlobalState(() => { … useEventListener(window, "keydown", …) … })`), so the window listeners it may instantiate are owned by that detached scope, never by this component — the modal cannot orphan them, and cannot cancel them for anyone else either. `groupedShortcuts` is lazy and, because `DialogContent` is inside reka's `Presence`, is not even evaluated while the dialog is closed.

For a repo whose own constellation audit found *"the PRM-RAF epidemic (~40 ungated loops)"*, a component with a literally empty teardown obligation is worth naming.

**Falsifier.** Any effect in the file outliving the component. `grep -nE "onMounted|onUnmounted|watch|addEventListener|setInterval|setTimeout|requestAnimationFrame|useTemplateRef" KeyboardShortcutsModal.vue` → zero hits.

### S-3 · Best-of-cohort two-way `open` contract, at Goldilocks size

`:53` — `defineModel<boolean>('open', { required: true })`. Consumed as `v-model:open` (`EditorShell.vue:106-108`). No `open` prop + `update:open` emit boilerplate, no local shadow `ref`, no sync `watch` — and therefore none of the stale-read hazards the project memory records for `defineModel` round-trips (no read-after-write path exists here at all).

It is the strongest of the demo's three dialog components on this axis: `KeyframesAddDialog.vue:77, :83-84, :3-4` still hand-rolls `open: boolean` + `defineEmits<{(e:"update:open", …)}>` + a manual `@update:open="(value) => emit('update:open', value)"` forward; `CSSPasteDialog.vue` sidesteps the question with an internal `DialogTrigger`. Only 6 files in the whole demo use `defineModel`; this is one of them.

At 69 lines with one computed and one template, it is squarely Goldilocks — the god-module pressure the project explicitly guards against is absent.

**Falsifier.** A sibling dialog using `defineModel` for `open` (none of the three does), or a hidden `open` shadow ref (`:53` is the only state declaration in the file).

---

## 3. Census reconciliation

| census id | source | this component |
|---|---|---|
| **F-1** (glass-ui phantom dep, RED) | `lane-frontend.md` §0 | **CONFIRMED and EXTENDED** → **L-1**. Import-level exposure = 2 specifiers / 7 symbols. New dimension not in F-1: a **CSS-class contract** (`.kbd`, `text-body`, `text-small`, `text-admin-label`) with no local fallback, which survives an import-only remediation and silently regresses the `<kbd>` chips. |
| **F-3** (glass-ui `/tabs` consumed type-only) | `lane-frontend.md` §0 | Not applicable — this file imports no tabs surface. Noted only because `EditorShell.vue:126` (its parent) is one of F-3's three sites; the modal is clean. |
| **F-4** (hand-rolled clusters where glass-ui ships a family) | `lane-frontend.md` §0 | **Deliberately NOT extended here.** The hand-rolled scroll container (`:10`) *looks* like an F-4 instance against `<DialogContent scroll>`, but the hand-roll buys a pinned `DialogHeader` that the shipped posture cannot give. Filed instead as the narrower, defensible **L-5** (token semantics). Contradicting a census pattern where the tree does not support it. |
| **F-6** (glass-ui boundary otherwise clean — no local `ui/` copies, no direct `reka-ui` imports) | `lane-frontend.md` §0 | **CONFIRMED.** Zero direct `reka-ui` imports here; all primitives arrive through glass-ui. The reka behaviour in **L-2** is transitive, not a boundary breach. |
| `lane-library.md` (parse seams) | — | No overlap. This component touches no parser surface. |

---

## 4. Candidate defects that died on their own falsifiers

Recorded because a false defect is worse than a missed one.

1. **"The modal has no visible dismiss affordance."** — **FALSE.** `DialogContent` renders a close `<button>` with an `sr-only` "Close" label by default: `showClose: { type: Boolean, default: !0 }` (`dist/dialog-BKSTfmIQ.js`). The component does not disable it.
2. **"The file is not prettier-clean"** (`:53` uses `'open'` against the repo's double-quote default; `npx prettier --check` on it FAILS). — **NOT THIS COMPONENT'S DEFECT.** `npx prettier --check "demo/**/*.vue"` fails on **51 of 58** files, all 6 in `shell/` included. Repo-wide condition; attributing it here would be noise.
3. **"`:key="i"` on the `<kbd>` chips is an index-key anti-pattern"** (`:27`). — **FALSE.** `formatComboParts(shortcut.raw)` is a pure function of `raw`, and `raw` is the parent row's key. The chip array is therefore invariant for the lifetime of the row; index keys are exactly correct.
4. **"The component should dogfood the keyframes engine instead of `transition-colors`"** (`:19`). — **FALSE.** A hover tint is a CSS concern; routing it through the animation engine would be contrivance, against the project's standing KISS feedback. The component's engine coupling problem is the opposite one — it reaches the engine when it should not (**L-2**).

Also verified sound, no finding: `--panel-max-h` resolves through the `DialogPortal` teleport (defined on `:root`, `design-idioms.css:12/48` — inherits to `<body>`); `v-for` over a `Map` is supported (Vue's `renderList` takes the `Symbol.iterator` branch); `?` matches despite requiring Shift on US layouts (`keyboard.js` `matches()`: `e.key.length === 1 && e.shiftKey && !combo.shift` waives the shift comparison); the `<h3>` heading level is correct beneath reka's `<h2>` `DialogTitle`; the barrel import at `:47` matches the demo's own dialog convention (all three dialog components import `Dialog*` from the root, not `/dialog`) and is not a deviation.

---

## 5. Verdict

The component is **exemplary in the small and defective in the seam**. Its internals are close to ideal for the LIBRARY axis — a 69-line derived view with zero duplication, zero teardown surface, and the cohort's best `defineModel` contract (S-1/S-2/S-3). Every defect of consequence lives at its boundary: an undeclared package that supplies its entire substrate down to the `.kbd` glyph (**L-1**, BLOCKER), and a global shortcut registry with no modality concept, so dismissing the help panel reaches through into `AnimationGroup.stop()` and rewinds the user's animation (**L-2**, MAJOR). Neither is fixable inside the file; both need a manifest entry and a glass-ui relay respectively.

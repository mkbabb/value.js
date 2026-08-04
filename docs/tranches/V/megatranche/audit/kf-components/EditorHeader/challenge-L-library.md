claude-opus-5[1m]

# CHALLENGE · `EditorHeader.vue` · axis **L — LIBRARY**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorHeader.vue` (108 lines)
**Mode** static, read-only. No installs, no dev server, no browser tooling. keyframes.js was read as evidence only; the single write of this lane is this file.
**Substrate** keyframes.js `master`; the file's last touch is `969990f6 2026-07-12 refactor(demo-home): dissolve the at-sign wrapper and custom component tier into canonical homes` — a **path move only**. No substantive commit since.

> **PASS 2 (amendment, same axis, same served model).** A second independent read of the same closure was run against this file. It **reproduced** L-B1, L-B2, L-M1, L-M2, L-M3, L-M5, L-m1, L-m3, L-m4, L-m5, L-m6, L-m7, L-i1, L-i2, N-1 and S-1/S-4 from the tree without consulting them, which is the strongest available evidence that those rows are not artefacts of a single reading. It **did not independently derive** L-M4, L-M6 or L-m2 — all three were then re-verified against the tree and **stand** (see the verification note at the head of §3). It adds **three findings** (`L-m8`, `L-m9`, `L-i3`) and issues **one correction against this document's own S-2**, which over-claimed. Amendments are marked *(pass 2)*; nothing from pass 1 was deleted.

**Read whole (the closure of this component's import graph):**

| file | why |
|---|---|
| `demo/components/instrument/shell/EditorHeader.vue` | the target |
| `demo/components/instrument/shell/SharePopover.vue` | direct import (`:45`) |
| `demo/components/instrument/shell/useShareState.ts` | SharePopover's composable |
| `demo/components/instrument/shell/index.ts` | the barrel that re-exports the target |
| `demo/components/instrument/shell/EditorShell.vue` | the sibling that carries the *live* copy of this component's job |
| `node_modules/@mkbabb/glass-ui/dist/components/header-ribbon/{index,types,HeaderRibbon.vue}.d.ts` | the published successor's contract |
| `node_modules/@mkbabb/glass-ui/dist/header-ribbon.js` | the successor's runtime (state machine) |
| `node_modules/@mkbabb/glass-ui/dist/components/header-ribbon/styles.css` | the successor's CSS |
| `node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css`, `scheme-spring.css`, `theme/bridges.css`, `transitions.css` | the tokens + the global PRM block this file relies on |
| `demo/styles/layout.css`, `demo/styles/style.css` | `--header-items-max-w`, the z-layer contract |

**Severity convention (stated so it can be attacked).** Severities are assessed **as-if-live**. The component is *dead* (L-B1) but it is **public API of the `shell/` module barrel** — any file may pick it up with one import — so "it never runs today" is not a defence, it is the remediation (delete). Every MAJOR/MINOR below is explicitly conditional on revival; L-B1 moots them all if it lands.

---

## 0. Headline

| id | severity | claim |
|---|---|---|
| **L-B1** | **BLOCKER** | The file is **wholly dead** — zero importers repo-wide — and has been **RULED DELETE** by U.B5, a wave that never landed. The barrel re-export is what hides it from `proof:no-dead-export`. |
| **L-B2** | **BLOCKER** *(inherited — F-1, not originated here)* | `:46` imports `@mkbabb/glass-ui/dark-mode-toggle`, a **phantom dependency** (absent from `package.json` **and** `package-lock.json`). The barrel drags this file into `App.vue`'s module graph, so the edge is real, not hypothetical. Its `<style>` block additionally depends on glass-ui-owned motion tokens. |
| **L-M1** | MAJOR | No hover **state** — only hover **edges**. Unpinning starts an unconditional 2 s collapse even with the pointer resting on the ribbon. |
| **L-M2** | MAJOR | Collapsed items keep focus **and** the a11y tree (`opacity:0` only — no `inert`, no `aria-hidden`, no `visibility`). Invisible tab stops. |
| **L-M3** | MAJOR | `@mouseenter` with no `pointerType` guard and **no `focusin`/`focusout`**: expands on touch tap, never expands for a keyboard user. |
| **L-M4** | MAJOR | The pin control is a bare `<div @click>` — no role, no `tabindex`, no `aria-pressed`, no Escape. |
| **L-M5** | MAJOR | The whole file is a **stale fork of glass-ui `HeaderRibbon`** — identical `items`/`anchor` slots, identical `pinned` slot prop — a primitive its own sibling `EditorShell.vue:16` already consumes. |
| **L-M6** | MAJOR | The default `#items` payload is **duplicated** into `EditorShell.vue` and has already **drifted** (`hover:opacity-50` present in one copy, absent in the other). |
| **L-m1** | MINOR | `overflow-hidden` at `:18` is **inert** — the unlayered scoped `overflow: visible` always beats Tailwind v4's `@layer utilities`. |
| **L-m2** | MINOR | Nothing clips during **expansion**: `overflow:visible` applies the instant `header-collapsed` is removed, for the whole 0.45 s `max-width` ramp. |
| **L-m3** | MINOR | **No `prefers-reduced-motion` guard**, and glass-ui's global PRM block does not reach this transition. |
| **L-m4** | MINOR | Untyped contract: no `defineSlots<>()`, no `defineEmits`, no `defineExpose`. `pinned` is observable only through a slot prop. |
| **L-m5** | MINOR | Animates `max-width` + `margin-right` — layout properties, non-compositable, 0.45 s. Already booked by the C-tranche audit at this exact line. |
| **L-m6** | MINOR | `<SharePopover />` is rendered with **no `onSceneRestore`** → the shared-scene switch silently no-ops (`useShareState.ts:79`). |
| **L-m7** | MINOR | Physical properties (`max-width`, `margin-right`) where the successor uses logical (`max-inline-size`, `margin-inline`) — RTL-broken. |
| **L-m8** *(pass 2)* | MINOR | `z-dock` (40) is the **wrong rung**: the demo's own written contract assigns `--z-bar` (30) to *"the editor bars (header / menubar chrome)"* and `--z-dock` (40) to *"the bottom dock band"*. **Corrects this document's S-2.** |
| **L-m9** *(pass 2)* | MINOR | `#anchor` is **required-but-optional**: no fallback content, and without it the group measures 0 wide — so the `mouseenter` that is the only non-pin expand route can never fire. The component renders nothing and cannot be opened. |
| **L-i1** | INFO | **Zero engine consumption** in a demo whose thesis is dogfooding the engine (census §1, S-8's inv-ζ seam). |
| **L-i2** | INFO *(adjacent)* | `EditorShell.vue:16` passes `mode="persistent"` — **not a `HeaderRibbonProps` member**. Any migration must not copy it. |
| **L-i3** *(pass 2)* | INFO | `var(--header-items-max-w)` carries **no fallback**; a token regression silently yields `max-width: none` instead of failing loudly. The successor writes `var(--header-ribbon-actions-width, 30rem)`. |
| **S-1, S-3, S-4** | SUPERLATIVE | vueuse timer discipline · the `pointer-events` island idiom · Goldilocks size. |
| **S-2** | SUPERLATIVE *(amended, pass 2)* | Token discipline — **narrowed** from "total" to *geometry + motion*; its z-index row was wrong (L-m8) and its fallback-less `var()` is a gap (L-i3). |

**Tally — defects 20 (blockers 2 · majors 6 · minors 9 · infos 3) · superlatives 4** (S-2 amended, not withdrawn). One non-defect note (N-1) is recorded outside the count.

---

## 1. BLOCKERS

### L-B1 · BLOCKER · dead code, already ruled DELETE, barrel-masked from its own gate

**Provenance.**

```
$ cd /Users/mkbabb/Programming/keyframes.js
$ grep -rn "EditorHeader" . --include=*.vue --include=*.ts --include=*.js --include=*.html \
    | grep -v node_modules | grep -v ".claude/worktrees"
demo/components/instrument/shell/index.ts:2:export { default as EditorHeader } from "./EditorHeader.vue";
```

**One hit. The barrel line. Nothing else in the tree.** The barrel's two consumers take other symbols:

```
demo/app/App.vue:138        import { EditorShell, EditorStartScreen } from "@components/instrument/shell";
demo/app/dock/MbabbMenu.vue:81  import { SharePopover } from "@components/instrument/shell";
```

This is not a new discovery and that is the aggravating fact. It was found, ruled, scheduled — and abandoned:

- `docs/tranches/U/audit/lane-18-demo-instrument-editors-shell-state.md:69–78` — *"**Fully dead:** **EditorHeader.vue** (108L) — **zero importers anywhere in the repo**… that barrel re-export is what hides it from `proof:no-dead-export` (the barrel is consumed for OTHER symbols, so the gate scores EditorHeader 'used')… **Delete EditorHeader.vue** and its barrel line — no legacy code."*
- `docs/tranches/U/waves/U.B.md:135` — **U.B5**: *"DELETE dead `EditorHeader.vue`"*, gate `proof:no-dead-export`.
- `docs/tranches/U/waves/U.B.md:389,402,407` — *"ZERO runtime importers (verified)"*, *"a **NO-DEFERRAL** row"*.
- `docs/tranches/U/waves/U.B.md:800` — the gate was to be **RE-ARMed** on this row.
- `docs/tranches/U/loop/pass1-research-demo-module-census.md:86,89` — **DELETE**, *"drop the EditorHeader line"*.

The row was declared NO-DEFERRAL and was deferred. The `2026-07-12` path-move commit carried it forward instead.

**Why it is a BLOCKER and not a MINOR tidy.** Three compounding facts:
1. It is **barrel-exported public API**. `shell/index.ts:2` is an invitation; the next person who needs a collapsible header takes the *stale fork* (L-M5) instead of the *published primitive* (`HeaderRibbon`), silently regressing touch, keyboard, a11y, PRM and RTL (L-M2/M3/M4/m3/m7).
2. It is **in the live module graph**, so it is not free: `App.vue:138` imports the barrel, the barrel imports this SFC, and this SFC carries both a phantom-dep import (L-B2) and a `<style scoped>` block. Vue SFC style blocks are side-effectful CSS imports, which is the classic case rollup/Vite refuse to tree-shake.
3. Its **own gate is blind to it** — `proof:no-dead-export` scores it "used" because a *sibling* symbol from the same barrel is consumed. The instrument that should have caught this is structurally incapable of it.

**Falsifier.** Produce a single importer of `EditorHeader` (a template tag, a dynamic `import()`, a route record, a test, a docs playground, a Storybook entry). Any one kills the claim. *Attempted and failed* — the grep above is repo-wide over `.vue/.ts/.js/.html`, excluding only `node_modules` and `.claude/worktrees`. The 16 worktree hits are agent scratch copies of the same orphan, not consumers.
**Sub-claim falsifier (bundle cost, marked UNPROVEN):** run `vite build --mode gh-pages` and `grep -c "header-items-wrapper" dist/assets/*.css`. `0` kills the "the dead CSS ships" half; the "dead source is in the graph" half stands regardless.

---

### L-B2 · BLOCKER *(inherited — census F-1)* · the phantom-dep edge, at this file

`EditorHeader.vue:46`:

```ts
import { DarkModeToggle } from "@mkbabb/glass-ui/dark-mode-toggle";
```

Census **F-1** (`lane-frontend.md §0, §2`) established the repo-level fact: `@mkbabb/glass-ui` is absent from `package.json` **and** `package-lock.json` (`grep -c "glass-ui" package-lock.json` → **0**) while `7.0.0` sits in `node_modules` from a `Jul 16 05:17` install. I confirm and **extend it to this component in two directions**:

1. **The JS edge is live despite the component being dead.** Because `shell/index.ts:2` is reached from `App.vue:138`, `npm ci` on a clean checkout leaves *this line* among the unresolvable imports. A dead component is still a build-graph liability.
2. **The CSS edge is also phantom — and it fails *silently*, not loudly.** `:96–98` reads four tokens that are **glass-ui-owned**, not demo-owned:

```
--duration-slow    → node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css   (0.45s)
--duration-normal  → …/scheme-motion.css                                                  (0.3s)
--ease-standard    → …/tokens/scheme-spring.css → var(--motion-ease-standard)
--ease-decelerate  → …/scheme-spring.css → var(--ease-out)
```

Only `--header-items-max-w` is demo-owned (`demo/styles/layout.css:15`). With the glass cascade absent (`style.css:3 @import "@mkbabb/glass-ui/styles"` unresolved), all four custom properties become invalid-at-computed-value-time, the whole `transition` shorthand at `:95–98` is dropped, and the accordion **snaps instantly with no error**. The JS failure is loud; the CSS failure is not.

**Contrast, and it is the honest one:** every *other* dependency this file touches is properly declared — `@vueuse/core ^14.3.0` (`package.json:80`), `vue ^3.5.35` (`:109`), and transitively via SharePopover `@lucide/vue ^1.17.0` (`:74`), `vue-router ^5.1.0` (`:110`), `vue-sonner ^2.0.9` (`:111`). glass-ui is the **sole** undeclared edge in this component's closure.

**Falsifier.** Show `@mkbabb/glass-ui` in `package.json` dependencies/devDependencies **or** any `node_modules/@mkbabb/glass-ui` entry in `package-lock.json`; or show a `vite.config.ts` alias / `resolve.dedupe` entry that resolves the specifier without a package declaration (the config declares 9 aliases, `vite.config.ts:37–60`, and glass-ui is **not** among them — the self-alias there points the *other* way, `@mkbabb/keyframes.js` → `src/animation/index.ts`).
**Not double-counted:** this is F-1's bite, not a second phantom dep. It is scored BLOCKER because the axis brief asks specifically where F-1 bites *this* component, and the answer is: both halves, one of them silently.

---

## 2. MAJORS

### L-M1 · MAJOR · the state machine tracks hover **edges**, never hover **state**

`:48–51`:

```ts
const isExpanded = ref(false);
const isPinned  = ref(false);
const isVisible = computed(() => isExpanded.value || isPinned.value);
```

There is no `isHovered`. `isExpanded` is a *latch* set by an enter edge and cleared by a timer. `onAnchorClick`'s unpin branch (`:76–78`) therefore cannot ask the question it needs to ask:

```ts
if (isPinned.value) {
    isPinned.value = false;
    startHideTimeout();          // ← unconditional. Pointer position is unknown here.
}
```

**Failure trace (deterministic from source):** hover the ribbon (`onRibbonMouseEnter` → timer stopped, `isExpanded=true`) → click the anchor (pin: `isPinned=true`, timer stopped) → click again (unpin: `isPinned=false`, **2 s timer started**) → *do not move the pointer*. At t+2 s `isExpanded=false`. The ribbon collapses out from under a pointer that never left it. No `mouseenter` can re-fire — the pointer is already inside — and the items wrapper collapses **leftward** (the group is right-aligned by `justify-between` at `:3`, the anchor is the rightmost child at `:32`), so the pointer is left hovering nothing. Recovery requires a deliberate re-entry gesture.

**The successor proves this is the wrong shape.** `glass-ui/dist/header-ribbon.js` carries three independent flags and ORs them:

```js
x = pinned, S = hovered, C = focus-within
w = computed(() => x.value || S.value || C.value)
```

`S` is a *state* (set on `pointerenter`, cleared on `pointerleave`), so unpinning while hovered simply falls back to `S` and the ribbon stays open. There is **no timer at all** in the published component — the 2 s latch exists only to paper over the missing flag.

**Falsifier.** Show a hover flag, a `startHideTimeout()` guard, or an intervening event that clears the timer on this path. Or show that browsers re-run hit-testing after the collapse layout change and synthesise a `mouseenter` on the group under a stationary pointer that lands on the anchor. *That last one is the only survivable defence and it fails on geometry* — the anchor does not move (right-aligned), the items area vanishes, so a pointer that was over the items ends over nothing. The **timer-fires-regardless** half is CONFIRMED from source; the **user-visible dead-end** half is marked **UNPROVEN-NEEDS-LIVE** for SS-13.

---

### L-M2 · MAJOR · collapsed items stay focusable and stay in the accessibility tree

`:101–107`:

```css
.header-collapsed {
    max-width: 0;
    margin-right: 0;
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
}
```

`opacity: 0` removes **paint**. It does not remove an element from the a11y tree and it does not remove it from sequential focus navigation — only `display:none`, `visibility:hidden`, `content-visibility:hidden`, `hidden`, or `inert` do. `pointer-events: none` kills the **mouse** only. So in the collapsed (default!) state:

- a keyboard user tabs into `SharePopover`'s trigger (`SharePopover.vue:4`, `aria-label="Share animation"`) and `DarkModeToggle` (`:24–27`) — **invisible, zero-width, unreachable-by-mouse controls**;
- a screen-reader user is read both controls unconditionally, with no expanded/collapsed relationship expressed anywhere (there is no `aria-expanded`, no `aria-controls`, no `role`);
- focusing a child inside a `max-width:0; overflow:hidden` box makes the UA scroll it into view, setting `scrollLeft` on a zero-width scroll container — a layout artefact with no visual affordance.

**Again the successor is the control.** `header-ribbon.js` renders the actions container with:

```js
{ class: "header-ribbon__actions", inert: !w.value || void 0, "aria-hidden": !w.value }
```

`inert` + `aria-hidden` — exactly the two mechanisms this file is missing — and its CSS uses `overflow: clip` unconditionally rather than the visible/hidden flip.

**Falsifier.** Find any rule that applies `visibility:hidden`, `display:none`, `content-visibility`, `inert` or `tabindex="-1"` to `.header-collapsed` or its descendants — in the component (there is none: `:87–107` is the whole `<style>`), in `demo/styles/*.css`, or in the glass cascade. Or demonstrate that this component's collapsed state is unreachable at runtime — which it is, but only because of L-B1.

---

### L-M3 · MAJOR · no touch guard on the expand edge; no focus path at all

`:13` `@mouseenter="onRibbonMouseEnter"` — a raw mouse event with no `pointerType` discrimination, on a component whose sibling scenes take `@media (pointer: coarse)` seriously (glass-ui's own `header-ribbon/styles.css` carries a `@media (pointer: coarse)` block).

Mobile browsers synthesise `mouseover`/`mouseenter` from a tap. A tap on the anchor therefore fires **both** `onRibbonMouseEnter` (expand) and `onAnchorClick` (pin) — two state transitions from one gesture, in an order the component never reasons about. The published component guards precisely this:

```js
function T(e) { e.pointerType !== "touch" && (S.value = !0); }   // pointerenter
```

Symmetrically there is **no keyboard expansion path**: no `@focusin`, no `@focusout`, no Escape handler. The successor has all three (`onFocusin: D`, `onFocusout: O` with a `relatedTarget`-containment check, `onKeydown` with `esc` → unpin + focus the anchor). A keyboard user of `EditorHeader` can only reach the items because they were never actually hidden (L-M2) — the two defects mask each other, which is why neither is visible from the outside.

**Falsifier.** Show a `pointerType`/`matchMedia("(pointer: coarse)")` guard, a `@focusin` handler, or a global keyboard registration that expands this ribbon (`registerShortcut` from `@mkbabb/glass-ui/keyboard` is used at `EditorShell.vue:190`, but **not** here — this file registers nothing). The double-fire ordering on real touch hardware is **UNPROVEN-NEEDS-LIVE**; the *absence of the guard* is CONFIRMED.

---

### L-M4 · MAJOR · the pin affordance is a bare `<div>` with a click handler

`:32–37`:

```html
<div class="shrink-0" @click="onAnchorClick">
    <slot name="anchor" :pinned="isPinned"></slot>
</div>
```

No `role`, no `tabindex`, no `aria-pressed`, no `keydown.enter`/`keydown.space`. Pinning is the component's only stateful user action and it is mouse-exclusive at this level.

The partial defence — *"the consumer's `anchor` slot content will be a `<button>`, and a keyboard activation of that button dispatches a `click` that bubbles to this wrapper"* — is real but **unverifiable here, because there is no consumer** (L-B1). The component ships an unenforced, undocumented obligation on a caller that does not exist. Worse, the wrapper swallows *every* click in the anchor region: a consumer who puts a menu trigger in `#anchor` gets a pin toggle they did not ask for, with no `@click.stop` escape documented.

Note the successor makes the identical structural choice (`onClick: k` on the anchor div) — so this is not a fork-vs-primitive win, it is a **shared** weakness. I flag it as MAJOR here and record that migrating to `HeaderRibbon` does **not** fix it; it should be raised against glass-ui via the standing BH/BI relay.

**Falsifier.** Find a keyboard handler, a `role="button"`/`aria-pressed` binding, or a documented slot contract requiring a focusable child (there is no `defineSlots`, no JSDoc, no README for this module — L-m4).

---

### L-M5 · MAJOR · the whole file is a stale fork of glass-ui `HeaderRibbon`

The slot contract is **identical**, down to the slot-prop name:

| | `EditorHeader.vue` | `glass-ui/header-ribbon` |
|---|---|---|
| items slot | `<slot name="items">` `:22` | `renderSlot($slots, "items")` |
| anchor slot | `<slot name="anchor" :pinned="isPinned">` `:36` | `renderSlot($slots, "anchor", { pinned: x.value })` |
| typed as | *(nothing)* | `{ anchor?: (props: { pinned: boolean }) => any; items?: (props: {}) => any }` (`HeaderRibbon.vue.d.ts`) |

This is not a coincidental convergence; it is the shape of an upstreaming. And the successor is **already consumed by this file's own sibling** — `EditorShell.vue:116` `import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon"`, rendered at `:16`. The two components sit in the same directory doing the same job, one against the published primitive and one against a private fork.

Enumerating what the fork lost relative to the primitive it forked from — every item sourced from `dist/header-ribbon.js` and `dist/components/header-ribbon/styles.css`:

| capability | `HeaderRibbon` 7.0.0 | `EditorHeader` |
|---|---|---|
| landmark | `role="toolbar"` + `aria-label` (default `"Header actions"`) | none |
| hover as state | `S` flag, `pointerenter`/`pointerleave` | edge + 2 s latch (L-M1) |
| touch guard | `e.pointerType !== "touch"` | none (L-M3) |
| focus-within | `focusin`/`focusout` + `relatedTarget` containment | none (L-M3) |
| Escape | unpin + focus first tabbable | none |
| collapsed a11y | `inert` + `aria-hidden` | none (L-M2) |
| clipping | `overflow: clip`, unconditional | `visible`↔`hidden` flip (L-m1/m2) |
| easing | `--spring-snappy` + `--spring-snappy-duration` | `--ease-standard` |
| reduced motion | `@media (prefers-reduced-motion: reduce) { transition: none }` | none (L-m3) |
| coarse pointer | `@media (pointer: coarse)` padding/width | none |
| forced colors | `@media (forced-colors: active)` border | none |
| writing mode | `max-inline-size` / `margin-inline` | `max-width` / `margin-right` (L-m7) |
| surface | `<Surface material="functional" surface="glass" specular="subtle">` | bare flex, no band |
| cascade layer | `@layer components` (consumer utilities can override) | unlayered scoped (silently beats utilities — L-m1) |
| styling hooks | `data-expanded` / `data-pinned` | none |
| placement | `left` / `right` prop | hard-coded |

**Explicit contradiction of the hitherto corpus.** `lane-frontend.md §5` (the commissioned shadow census, S-1..S-8) **does not contain this component**. Its roster row (`§4`, "editor chrome") describes `EditorHeader.vue` merely as *"header bar — `DarkModeToggle`"* and its §3.1 counts `/header-ribbon` at **1 import** — the `EditorShell` one — without noticing that the *other* file in the same directory is the un-migrated shadow. The census enumerated **live** bespoke and this component is dead, so it fell through the sieve. **The shadow list is `S-1..S-8` plus this: `EditorHeader` → `HeaderRibbon`, 108 lines, verdict DELETE (not "replace") because `EditorShell` already performed the migration.** This is a *stronger* verdict than any S-row: the replacement is not merely available, it is already in production ten files away.

**Falsifier.** Show a capability in `EditorHeader` that `HeaderRibbon` lacks and a consumer that needs it. The only candidate is the **`left` slot** (`:7–9`, the mobile sidebar toggle) which `HeaderRibbon` has no counterpart for — but `EditorShell` already solves that with a separate `#header-left` slot into `HeaderRibbon`'s `#items` (`EditorShell.vue:18`), and there is no consumer to need it (L-B1).

---

### L-M6 · MAJOR · duplicated default header content, already drifted

`EditorHeader.vue:22–28`:

```html
<slot name="items">
    <SharePopover />
    <DarkModeToggle title="Toggle dark mode" class="aspect-square w-8 scale-on-hover hover:opacity-50" />
</slot>
```

`EditorShell.vue:19–48` (the live one):

```html
<slot name="header-right">
    <SharePopover />
    …Tooltip-wrapped shortcuts Button…
    <DarkModeToggle title="Toggle dark mode" class="aspect-square w-8 scale-on-hover" />
</slot>
```

Same two controls, same `title`, same `aspect-square w-8 scale-on-hover` — and **already divergent**: `EditorHeader` carries `hover:opacity-50`, `EditorShell` does not; `EditorShell` gained the F.W15.S3 shortcuts trigger, `EditorHeader` never did. Two sources of truth for "what the header contains" is the classic duplication defect, and the drift is the evidence that it has already cost something: the dead copy is a *snapshot of an older design* that a future reader could mistake for the current one.

**Falsifier.** Show the two are intentionally different surfaces with different content contracts. They are not — `MbabbMenu.vue:81` pulls `SharePopover` from the same barrel for a third rendering site, which is the *correct* pattern (share the leaf, not the arrangement).

---

## 3. MINORS

> **Pass-2 verification of the three rows it did not independently derive.** A false defect is worse than a missed one, so the non-reproduced rows were re-checked against the tree before being carried:
> - **L-M4** (bare `<div @click>` pin affordance) — **stands.** `:32–37` has no `role`, no `tabindex`, no `aria-pressed`, no key handler; `grep` over the file confirms zero `keydown` bindings. Pass 1's honesty about the successor sharing the flaw (`header-ribbon.js` `onClick: k` on its anchor div) is also confirmed — this is correctly *not* scored as a fork-vs-primitive win.
> - **L-M6** (duplicated + drifted `#items` payload) — **stands, and the drift is exact.** `EditorHeader.vue:26` `class="aspect-square w-8 scale-on-hover hover:opacity-50"` vs `EditorShell.vue:46` `class="aspect-square w-8 scale-on-hover"`. Same `title="Toggle dark mode"` on both. `EditorShell.vue:30–43` additionally carries the F.W15.S3 shortcuts trigger that `EditorHeader` never received.
> - **L-m2** (nothing clips during expansion) — **stands.** `.header-items-wrapper` resolves to `overflow: visible` (`:99`) and `.header-collapsed`'s `overflow: hidden` (`:106`) is removed synchronously with the class, so the clip is absent for the whole `--duration-slow` ramp while the box is still narrow. The asymmetry is real: collapse clips, expand does not.

### L-m1 · MINOR · the `overflow-hidden` utility at `:18` is inert

`:16–21` puts `overflow-hidden` in the class list; `:99` puts `overflow: visible` in the scoped block on the same class. Two independent reasons the utility loses:

1. **Layers.** `demo/styles/style.css:1` is `@import "tailwindcss"` (v4 — confirmed by `@custom-variant` at `:16`), so `.overflow-hidden` lives in `@layer utilities`. Vue SFC `<style scoped>` is injected **unlayered**. Unlayered declarations beat *every* layer regardless of specificity.
2. **Specificity,** even ignoring layers: `.header-items-wrapper[data-v-…]` is (0,2,0) vs `.overflow-hidden` (0,1,0).

So `overflow-hidden` at `:18` never applies. It is dead source that actively misleads — it reads as "this is the accordion clip" when the clip actually comes from `.header-collapsed`'s `overflow: hidden` at `:106`.

**Falsifier.** Show Tailwind v4 emitting utilities unlayered in this build (check the generated CSS for `@layer utilities`), or show the demo wrapping SFC styles in a layer via a PostCSS plugin (`postcss.config.*` / `vite.config.ts` — neither does).

### L-m2 · MINOR · nothing clips during the **expand** transition

Because `.header-items-wrapper` resolves to `overflow: visible` (L-m1) and `.header-collapsed`'s `overflow: hidden` is removed **synchronously** when `isVisible` flips, the wrapper is unclipped for the entire 0.45 s `max-width: 0 → var(--header-items-max-w)` ramp (`:92`, `:95–98`). Its flex children — `SharePopover` + `DarkModeToggle`, intrinsically ~4 rem wide — paint outside a box that is momentarily 0 wide, in the +x direction, i.e. over the anchor.

The `overflow: visible` itself is almost certainly **deliberate** (SharePopover's `PopoverContent` at `SharePopover.vue:14` must not be clipped by the accordion). The defect is that it is bound to the *expanded class* rather than to *transition completion* — no `transitionend` deferral, no `@starting-style`. The successor sidesteps the whole question with unconditional `overflow: clip` and teleported popovers.

**Falsifier.** Confirm at runtime that no content paints outside the wrapper during expansion (SS-13 visual). Marked **UNPROVEN-NEEDS-LIVE** for the visual consequence; the cascade fact (visible-throughout-expansion) is CONFIRMED.

### L-m3 · MINOR · no `prefers-reduced-motion` guard, and no global block reaches it

`:95–98` animates three properties over `--duration-slow` (0.45 s) / `--duration-normal` (0.3 s). There is no `@media (prefers-reduced-motion: reduce)` in the file.

I checked the two plausible delegations and both fail:
- **glass-ui `transitions.css`** — its PRM block covers only named transition classes (`.fade-*`, `.tab-fade-*`, `.pane-swap-*`, `.metric-swap-*`, `.dock-in`). It does not touch arbitrary component transitions.
- **The motion tokens** — `scheme-motion.css`'s PRM block sets `--motion-weight: 0` and neutralises `--ease-cartoon-punch`; `scheme-spring.css`'s sets `--transition-liquid-spatial`. **`--duration-slow` stays a literal `0.45s`** under PRM. Consuming duration tokens directly buys no reduced-motion behaviour.

Census `§6.5` counts **13** PRM enforcement sites across 12 files in this demo — the tree is conscientious about this. `EditorHeader` is not among them, and unlike `TypingDots.vue:121` / `KeyframeTimeline.vue:94` it does not even carry a prose deferral. The successor has the guard explicitly: `@media (prefers-reduced-motion: reduce) { .header-ribbon__actions { transition: none; } }`.

**Falsifier.** Find a global rule that neutralises transitions repo-wide under PRM (`* { transition: none }` or similar) in `demo/styles/*.css` or the glass cascade. None exists.

### L-m4 · MINOR · the component's contract is entirely untyped

Zero `defineProps`, zero `defineEmits`, zero `defineExpose`, zero `defineSlots`. Three slots (`left`, `items`, `anchor`) and one slot prop (`pinned: boolean`) exist only as template text. In a repo where the sibling declares a 9-field `withDefaults(defineProps<…>())` plus typed emits plus `defineExpose` (`EditorShell.vue:135–197`), and where the *published successor ships generated slot types* (`HeaderRibbon.vue.d.ts` `__VLS_Slots`), this is a genuine gap: `vue-tsc` cannot check a consumer's `#anchor="{ pinned }"` destructure, and the pin state is unobservable to a host except through the slot (no `v-model:pinned`, no `@pin-change`).

**Falsifier.** Show `vue-tsc` inferring the slot contract from the template alone with useful errors at a call site, or show a project convention exempting slot-only components. `EditorShell` and `HeaderRibbon` are both counter-examples to such a convention.

### L-m5 · MINOR · animating layout properties, already booked

`:95–98` transitions `max-width` and `margin-right` — both trigger layout on every frame for 0.45 s, on the element that contains a Popover trigger and a toggle. Not compositable; no `will-change`; no `transform`/`translate` alternative.

This is a **known, recorded** finding at this exact site: `docs/tranches/C/audit/animation/ios-animation-general.md:217` names `EditorHeader.vue:101` in the "Demo UI chrome" row and `:281` says the *"header `max-width` morph … should be a `SpringProgress`-driven continuity"* candidate. The successor moved to spring easing (`--spring-snappy`) and added a `translate` companion; it still animates `max-inline-size`, so this is a **partially** shared weakness — the fork is worse (standard ease, no translate, no spring), the primitive is not perfect.

**Falsifier.** Measure and show no dropped frames on the expand (SS-13 / performance trace). Marked **UNPROVEN-NEEDS-LIVE** for the cost; the *property class* is CONFIRMED.

### L-m6 · MINOR · `<SharePopover />` with no `onSceneRestore` — a silent no-op path

`SharePopover.vue:56–61` declares an optional callback and threads it into `useShareState`:

```ts
const props = defineProps<{ onSceneRestore?: (sceneId: string) => void }>();
const { … } = useShareState(props.onSceneRestore);
```

`useShareState.ts:79–86`:

```ts
if (result.activeScene && onSceneRestore) { onSceneRestore(result.activeScene); }
toast.success("State restored!", { description: "Animation state loaded from shared URL." });
```

`EditorHeader.vue:23` renders `<SharePopover />` bare. So pasting a share URL for a *different scene* restores the state, **stays on the current scene**, and reports unqualified success. The error posture is "optional callback whose absence degrades silently, with a success toast on top" — the wrong default for a restore path.

Two honesty notes: (a) `EditorShell.vue:20` omits it too, so this is a **shared** contract weakness, not unique to the dead file; (b) `MbabbMenu.vue:81` is the third site and would need checking before any fix. Additionally, `props.onSceneRestore` is read **once at setup**, so a consumer changing the callback later is ignored — and naming a plain prop `onSceneRestore` makes it silently absorb a `@scene-restore` listener, an ambiguity worth retiring in favour of a real emit.

**Falsifier.** Show `restoreStateFromParam` performing the navigation itself (it does not — `useShareState.ts:75` takes its `result.activeScene` and hands it to the callback), or a router guard that reads the `state` query and switches scenes independently.

### L-m7 · MINOR · physical properties where the successor uses logical

`:92` `max-width`, `:93` `margin-right`, and `:97` transitions `margin-right`. The accordion is anchored to the **right** by `justify-between` (`:3`) with the anchor as the rightmost child — in an RTL writing mode the whole geometry inverts and `margin-right` becomes the wrong side. `header-ribbon/styles.css` uses `max-inline-size` and `margin-inline-start`/`margin-inline-end`, switched off `[data-placement]`, throughout.

**Falsifier.** Show the demo declares itself LTR-only (no `dir` handling anywhere would be *evidence of neglect*, not of a decision) — or show that no other demo CSS uses logical properties, making this consistent with house style. It is not: the successor it forked from is fully logical.

### L-m8 *(pass 2)* · MINOR · `z-dock` is the wrong rung — and it is wrong against a contract written in this repo

`EditorHeader.vue:3`:

```html
<div class="pointer-events-none absolute top-0 left-0 right-0 z-dock flex items-center justify-between px-4 py-2"
```

The demo's Z-INDEX ORDERED-LAYER CONTRACT is prose in the cascade root, and it names this component's category explicitly:

```
demo/styles/style.css:31      --z-bar      :  30  the editor bars (header / menubar chrome)
demo/styles/style.css:32      --z-dock     :  40  the bottom dock band
demo/styles/style.css:23      Use the SEMANTIC z-* utility for the rung
```

A top-anchored header bar is, by the contract's own words, `--z-bar` chrome. `z-dock` is the *bottom dock band* rung, and the real dock bands sit on it: `TransportDock.vue:7` `'fixed left-0 right-0 z-dock'`, `ChromeDock.vue:215` `z-dock`, `AnimationControlsGroup.vue:82` `z-dock`. So the header ties with three dock surfaces at 40 and the tie is broken by DOM order, not by the contract.

This is a **wrong choice, not a missing one** — `z-bar` is a live, resolvable utility (`glass-ui/dist/styles/theme/bridges.css` `--z-index-bar: var(--z-bar)`; in demo use at `demo/components/playback/AnimationVisualizer.vue:21`). And there is a purpose-built rung the demo's contract does not even enumerate: `--z-header: 35` (`glass-ui/dist/styles/tokens/scheme-motion.css`), bridged as `--z-index-header`, which is exactly what the successor takes — `header-ribbon/styles.css` `z-index: var(--z-header)`.

**This corrects S-2 of this document.** S-2's table asserts *"stacking → `z-dock` utility → `--z-index-dock` → `--z-dock: 40`"* and concludes *"The demo's z-index contract (`style.css:23,32`) is likewise honoured with a named utility."* Both halves of that resolution chain are correct and the citation is real — but it cites `style.css:32` (the `--z-dock` row) and **not `:31`** (the `--z-bar` row that assigns headers). Using a *semantic* utility satisfies the contract's anti-`z-[N]` clause while violating its ordering clause. Honouring the no-raw-brackets rule is a genuine merit; picking the dock rung for a header is a genuine defect. S-2 is narrowed accordingly, not withdrawn.

**Falsifier.** A comment anywhere justifying the dock rung for this header — `:3` is bare and the file's only two comments (`:53–55`, `:89–91`) concern the timer and the width token. Or `z-bar`/`z-header` being unresolvable (refuted: both bridged in `bridges.css`, `z-bar` in live demo use). Or the contract text assigning headers to `--z-dock` (it assigns them to `--z-bar`, verbatim, at `:31`). Whether any *visible* mis-occlusion results is **UNPROVEN-NEEDS-LIVE** — and moot under L-B1; the contract breach is textual and needs no browser.

### L-m9 *(pass 2)* · MINOR · `#anchor` is required-but-optional: without it the component renders nothing and cannot be opened

`:32–37`:

```html
<div class="shrink-0" @click="onAnchorClick">
    <slot name="anchor" :pinned="isPinned"></slot>
</div>
```

The slot has **no fallback content**, and it is the only always-visible element in the component. Trace the default mount (`:48–49` — both refs `false`, so `isVisible` is `false` and `header-collapsed` is applied from first paint):

- the items wrapper is `max-width: 0; margin-right: 0; overflow: hidden` (`:101–107`) → border-box width **0**;
- the anchor wrapper is an empty `<div class="shrink-0">` → width **0**;
- their flex parent (`:11–14`) is therefore **0 wide**, and it is the sole owner of `@mouseenter`.

A zero-width box has no hit area, so `onRibbonMouseEnter` can never fire; `onAnchorClick` can never fire either. The two state transitions that exist are both unreachable, and the component is a permanent no-op. The `pointer-events-none` root (`:3`, correct per N-1) guarantees the empty strip contributes nothing.

The obligation is real but unexpressed: no `defineSlots` marking `anchor` required (L-m4), no fallback, no README, no prop, no runtime warning. The successor is structurally immune — `header-ribbon/styles.css` gives `.header-ribbon__band` `min-block-size: var(--size-icon-btn)` and `padding: var(--panel-padding)`, and `.header-ribbon__anchor` is `display: grid; place-items: center`, so the band has presence independent of what the consumer supplies.

Scored MINOR rather than MAJOR for one honest reason: any plausible consumer *would* pass `#anchor`, so this is a latent API-shape defect rather than a live breakage — and per L-B1 there is no consumer at all.

**Falsifier.** Fallback content inside `:36` (the tag is empty: `<slot name="anchor" :pinned="isPinned"></slot>`), or any CSS giving the group or the anchor wrapper a minimum size — the entire scoped block is `:88–107` and neither rule targets them, and no unscoped demo rule matches `.shrink-0` alone. Or a consumer that omits `#anchor` and still works, which would require a hit area I have not accounted for.

---

## 4. INFO

### L-i1 · INFO · zero engine consumption in the engine's own proving ground

Census `§1`: **68** demo files import the library under test; `TypingDots.vue:1–9` names the *inv-ζ seam* — *"the demo's signature animation IS the library, not pure CSS"* — and census `S-8` rules `TypingDots` **JUSTIFIED BESPOKE** precisely because replacing it would remove library coverage.

`EditorHeader` imports nothing from `@kf-engine` / `@mkbabb/keyframes.js` and animates entirely with CSS transitions. That is *defensible* — chrome is legitimately CSS, and 21 of 58 demo `.vue` files carry no engine import — so I do **not** rate this a defect. I record it because (a) it is the one collapsible surface in the shell, (b) the C-tranche audit already nominated exactly this transition for the engine's spring path (`ios-animation-general.md:281`), and (c) it is the reason `lane-library.md` has nothing to say here: this component appears in **none** of that lane's parse-seam tiers (§4.1–4.6, the demo blast radius lists five files, none of them this one). Negative citation recorded so the absence is not mistaken for an oversight.

### L-i2 · INFO *(adjacent, not this file's defect)* · `mode="persistent"` is not a `HeaderRibbon` prop

`EditorShell.vue:16`:

```html
<HeaderRibbon ref="headerRibbonRef" mode="persistent" placement="right">
```

`HeaderRibbonProps` (`components/header-ribbon/types.d.ts`) is exactly `{ placement?, ariaLabel?, class? }` — **no `mode`**. The runtime sets `inheritAttrs: !1` and merges `useAttrs()` onto the root, so `mode="persistent"` lands as a literal, meaningless `mode` attribute on the `role="toolbar"` div. It is a leftover from an older ribbon contract.

Recorded here because it is the **migration hazard for L-M5/L-B1**: whoever deletes `EditorHeader` in favour of `HeaderRibbon` will copy `EditorShell`'s call site, and would carry the phantom prop forward. Also note `EditorShell.vue:187,197` takes a template ref on `HeaderRibbon` and `defineExpose`s it — the published component exposes nothing, so that ref's public surface is empty. Both belong to an `EditorShell` challenge, not this one.

### L-i3 *(pass 2)* · INFO · the width cap's `var()` has no fallback — a token regression would fail silently and in the wrong direction

`:92`:

```css
max-width: var(--header-items-max-w);
```

The token is defined today (`demo/styles/layout.css:15` `--header-items-max-w: 500px;`, inside that file's documented *"Recurring length homes (each routes a bracket-arbitrary literal to ONE token)"* block), so this is latent, not live. But `var()` with no fallback on an undefined custom property is invalid-at-computed-value-time, and `max-width` is not inherited, so the declaration resolves to its **initial value `none`** — the cap does not shrink or error, it *disappears*, and the collapse would animate from 0 to unbounded content width. The successor writes the fallback in-line: `header-ribbon/styles.css` `max-inline-size: var(--header-ribbon-actions-width, 30rem)`.

Corroborating how tightly this file is coupled to tokens nobody else uses: `--ease-decelerate` (`:98`) has **exactly one consumer in the entire demo** —

```
$ grep -rn -- "--ease-decelerate" demo/
demo/components/instrument/shell/EditorHeader.vue:98:        opacity var(--duration-normal) var(--ease-decelerate);
```

— this line. A token surface reached by one dead file is itself a small piece of evidence for L-B1.

This does **not** retract S-2, which is right that every constant here is named; it records that *named* and *robust* are different properties, and that pass 1's "total token discipline" conflated them.

**Falsifier.** An `@property` registration for `--header-items-max-w` supplying an initial value (which would make a fallback redundant) — `grep` finds no `@property` for it anywhere in `demo/styles/` or the glass cascade; the only definition is `layout.css:15`. Or a demo-wide convention of fallback-less `var()` that makes this consistent house style — which would demote it to a house-style note rather than kill it.

### N-1 · NON-DEFECT NOTE (excluded from the tally) · `@mouseleave` on a `pointer-events: none` root is **correct**

`:3–4` puts `@mouseleave` on a root that is `pointer-events-none`. This looks like a bug and is not. `pointer-events: none` removes the element from **hit-testing**, but the element remains in the **event path** of its hit-testable descendants (`:7` and `:12` are both `pointer-events-auto`), and `mouseenter`/`mouseleave` are computed over the ancestor chain of the `mouseover`/`mouseout` target. The root therefore receives `mouseleave` when the pointer leaves the auto islands for anything outside its subtree — and it fires *promptly*, because the pointer cannot rest on the transparent root region (it falls through to the scene beneath, which is outside the subtree). The design is subtle and right. Recorded so a future reader does not "fix" it into a regression.

The one real seam: moving from the ribbon (`:12`) to the `left`-slot island (`:7`) keeps the target inside the root subtree, so **no** `mouseleave` fires and the ribbon stays expanded while the pointer is on the mobile sidebar toggle. With no consumer supplying `#left`, this is currently unobservable. **UNPROVEN-NEEDS-LIVE**, and folded under L-M1's missing-hover-state root cause rather than counted separately.

***(pass 2) Two additions to this note, both folded rather than counted.*** (a) The **converse** of that seam: leaving the `#left` island for anything outside the root arms the 2 s collapse timer for a state that hover never entered (`onGroupMouseLeave` `:69–73` is unguarded except on `isPinned`, and `onRibbonMouseEnter` `:13` fires only on the *other* island). Harmless — it writes `isExpanded = false` over `false` — but it means the expand region and the collapse region are different DOM subtrees, which is the structural cause of the seam pass 1 identified. The successor puts `pointerenter` and `pointerleave` on the same element (`header-ribbon.js`, root `onPointerenter: T, onPointerleave: E`), which is why it has neither seam. (b) The handler **name** asserts a binding the code does not have: `onGroupMouseLeave` (`:69`) is bound to the root at `:4`, not to the group at `:11`. Pass 1 is right that the placement is deliberate and correct; the name is what would mislead the next reader into "fixing" it.

---

## 5. SUPERLATIVES (L-18 runs both ways)

### S-1 · EXEMPLARY · the timer is vueuse-owned, and it retired a named prior defect

`:53–62`:

```ts
// Hover-out collapse timer (W1.S4) — vueuse owns the handle + auto-cleanup on
// unmount (tryOnScopeDispose), replacing the hand-rolled setTimeout/clearTimeout
// bookkeeping. `immediate: false` so it only runs when started.
const { start: startHideTimeout, stop: clearHoverTimeout } = useTimeoutFn(
    () => { isExpanded.value = false; }, 2000, { immediate: false },
);
```

This is the correct answer to a defect **filed against this exact file**: `docs/tranches/D/audit/frontend-findings.md:27` — *"F8 · In-component `setTimeout` debounce/hover blobs — hand-rolled, should be `useTimeoutFn` … `editor-shell/EditorHeader.vue:50,56,63`"* — and `:122` names it again as "the hover-out timer". The fix landed and holds. Consequences worth stating plainly:

- **No leak.** `useTimeoutFn` registers `tryOnScopeDispose`; the pending timeout is cleared on unmount without a single line of `onBeforeUnmount` in this file. There is no `setTimeout`, no `clearTimeout`, no stored handle, no `null` sentinel, no teardown to get wrong.
- **No `immediate` foot-gun.** `{ immediate: false }` is the non-default and the *correct* default here; the comment says why. Getting this wrong would fire a collapse 2 s after mount.
- **Renamed at the destructure** (`start:`/`stop:` → `startHideTimeout`/`clearHoverTimeout`), so the three call sites read as intent, not as timer mechanics.
- It is also, per L-B2, the **only** import in this file whose package is actually declared.

**Counter-falsifier (the superlative must survive too).** Kill this by finding a path that leaves a timer armed across unmount, or by showing `useTimeoutFn` in `@vueuse/core@14` does not dispose on scope teardown. `tryOnScopeDispose` has been part of its contract since v9; the component creates the timer inside `<script setup>`, i.e. inside the component's effect scope. Claim stands.

### S-2 · EXEMPLARY *(amended, pass 2)* · token discipline — every geometry and motion constant is named

> **AMENDMENT (pass 2).** The heading's original word was **"total"**. It is narrowed to *geometry and motion*, and two of the claims below are corrected by findings in this same document. The superlative **survives** — L-18 runs both ways and this repair is real — but it was over-stated:
> - **The `z-dock` row of the table below is a defect, not a merit.** Using a semantic utility honours the contract's anti-`z-[N]` clause; choosing rung 40 ("the bottom dock band") for a header violates its ordering clause, which assigns headers to `--z-bar` at `style.css:31`. See **L-m8**. The row is retained verbatim for the audit trail, struck-through in effect.
> - **"Named" is not "robust."** `var(--header-items-max-w)` carries no fallback, so a token regression yields `max-width: none` silently. See **L-i3**.
> What stands unqualified: the STY-5 discharge (raw 500 px → token, wave id in the comment, value equivalence documented), the four motion tokens, the single-literal `<style>` block, and the honest flagging of the `2000` ms dwell constant as the file's whole magic-number surface.

`:92,96,97,98` and `:3` resolve, without exception:

| literal-free site | token | owner |
|---|---|---|
| `max-width` cap | `--header-items-max-w` | `demo/styles/layout.css:15` (demo) |
| max-width / margin duration | `--duration-slow` | glass-ui `scheme-motion.css` |
| opacity duration | `--duration-normal` | glass-ui `scheme-motion.css` |
| spatial easing | `--ease-standard` | glass-ui `scheme-spring.css` |
| opacity easing | `--ease-decelerate` | glass-ui `scheme-spring.css` |
| stacking | `z-dock` utility → `--z-index-dock` → `--z-dock: 40` | glass-ui `bridges.css` + `scheme-motion.css` |

This is **J.W7b STY-5 discharged and still holding**: the J-tranche styling audit found *"`max-w-[500px]` in `EditorHeader.vue:89` — raw pixel cap not backed by a token. One off-contract magic number"* (`docs/tranches/J/audit/styling-design-system.md:7,42,146`), and `J.W7b-impl.md:28` records the repair to `var(--header-items-max-w)`. The in-file comment at `:89–91` even carries the wave id and notes the token is the *same* 500 px — a repair that documents its own equivalence. The demo's z-index contract (`style.css:23,32`, no raw `z-[N]`) is likewise honoured with a named utility.

The **single** exception is the `2000` ms at `:60` — an unnamed dwell constant. That is the whole magic-number surface of the file, and it is in script where a token would not naturally reach.

**Counter-falsifier.** Find a raw literal in the `<style>` block or a bracket-arbitrary in the class lists. There are none: `:88–107` contains exactly one literal, `margin-right: 0.75rem` at `:93` — a spacing value, matching glass-ui's own `margin-inline-start: 0.75rem` for the same gap. Claim stands.

### S-3 · EXEMPLARY · the `pointer-events` island idiom

`:3` makes the full-bleed header strip `pointer-events-none`; `:7` and `:12` re-enable it on exactly the two interactive islands. The strip spans `left-0 right-0` so it has the hover geometry it needs, while every click in the empty middle falls through to the scene beneath — which matters here because the shell deliberately paints chrome over the subject (`EditorShell.vue:53–59` documents the same reasoning for the start screen). It is also what makes the root `mouseleave` fire promptly rather than latching on dead space (N-1). Two lines of class, one whole class of bug avoided.

**Counter-falsifier.** Show a click that should reach the header and does not — i.e. an interactive descendant outside the two `pointer-events-auto` wrappers. There is none; all three slots are inside them.

### S-4 · EXEMPLARY · Goldilocks size and a flat, honest state surface

108 lines: 39 template, 43 script, 21 style. Three refs, one computed, three handlers, one timer. No composable extraction (correct — a `useHeaderCollapse` for 3 refs would be ceremony), no god-module tendency, no premature abstraction, no props-vs-state confusion. Compare the sibling at 261 lines with 9 props. The scoped style block is two rules and does exactly one thing.

The irony is exact and worth stating: **this is a well-built component that should not exist.** The craft in S-1..S-4 is real, and it is the reason L-B1 is a BLOCKER rather than a shrug — good dead code is more dangerous than bad dead code, because it invites reuse.

**Counter-falsifier.** Show a responsibility here that wants its own module, or a duplication *within* the file. Neither exists; the duplication is external (L-M6).

---

## 6. Verdict

**DELETE.** `EditorHeader.vue` plus `shell/index.ts:2`. The wave already exists (U.B5), the ruling already exists ("no legacy code", NO-DEFERRAL), and the replacement already shipped and is already consumed ten files away (`EditorShell.vue:16` → `HeaderRibbon`). Every MAJOR and MINOR above is discharged by the deletion; none of them needs a repair of its own.

Three items **survive** the deletion and must be re-homed, or they are lost with the file:

1. **L-B2** — the glass-ui phantom dependency. Repo-level (census F-1), unaffected by deleting one importer. Must land **first**, before any migration wave: `npm ci` is currently broken.
2. **L-m6** — `SharePopover`'s silently-optional `onSceneRestore`. Belongs to `SharePopover`/`useShareState`, and `EditorShell.vue:20` carries the same omission.
3. **L-M4** — the anchor-as-bare-`div` pin affordance is a weakness the **successor shares**. Raise it against glass-ui through the standing BH/BI relay rather than losing it with the fork.

And one **correction to the hitherto corpus**: `lane-frontend.md §5`'s shadow census (S-1..S-8) is missing a row. `EditorHeader` → `HeaderRibbon` is the ninth shadow and the *most* clear-cut of them — 108 lines, verdict DELETE not REPLACE, because the migration was already performed by its own sibling and only this copy was left behind.

***(pass 2) Two further corpus corrections and one to this document.***

4. **`lane-frontend.md §4`'s roster carries a dead row as live.** Its editor-chrome table lists *"108 | `EditorHeader.vue` | G | header bar — `DarkModeToggle`"* alongside seven genuinely-mounted components, and §9's counts (58 `.vue`, 37 glass-consuming, 11 984 lines) include it. The census measured the tree as written, not as reachable; the "S-9" correction above is incomplete without this one, because a shadow census that omits a component and a roster that counts it as live are the same error seen from two sides.
5. **`lane-frontend.md §6.5` records the PRM absence without naming it a gap.** Its 13-site enumeration (10 CSS + 3 JS) correctly excludes this file, and correctly flags `TypingDots.vue:121` / `KeyframeTimeline.vue:94` as prose-only deferrals. `EditorHeader` is a *third* category the lane has no bucket for: motion with neither a guard nor a deferral. **L-m3** files it.
6. **Correction to this document (pass 1 → pass 2):** S-2's "total token discipline" over-claimed on two counts, one of which (`z-dock`) is a defect this document should have caught and instead scored as a merit. **L-m8** and **L-i3** carry the corrections; S-2 is narrowed and retained. Recorded here rather than silently edited, because an audit that quietly rewrites its own superlatives is worth less than one that shows the repair.

---

## Provenance note

Every glass-ui claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — the copy already installed in the target tree — so no upgrade is presupposed by any recommendation. `/Users/mkbabb/Programming/keyframes.js` was read only (`Read`, `grep`, `git log`); nothing was written, mutated, built, installed, or executed in that repo or any other. No browser tooling was used; every livable-only consequence is tagged **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit. The sole write of this lane is this file.

***(pass 2) Additional provenance.*** The amendment pass re-derived the closure independently before reading pass 1, then folded rather than replaced. New probes run for it, all read-only: `styles/theme/bridges.css` (the `--z-index-*` → `--z-*` Tailwind bridge, establishing that `z-bar` and `z-header` are both resolvable — L-m8); `demo/styles/style.css:23–33` read in full for the ordering clause; `node_modules/@vueuse/shared/dist/index.js` `useTimeoutFn` body read for `tryOnScopeDispose(stop)` (S-1's counter-falsifier discharged against the *installed* code rather than against documentation); `grep -rn -- "--ease-decelerate" demo/` (L-i3); `demo/app/dock/MbabbMenu.vue:9,81,87–93` (the one correct `SharePopover` call site, L-m6); and a targeted hunt for a blanket `@media (prefers-reduced-motion: reduce){ * { … } }` across every glass-ui sheet and every demo sheet — `scroll-chrome.css` and `view-transition.css` were the only candidates and both are scoped (to `.scroll-chrome` and `::view-transition-*` respectively), so **L-m3's falsifier was hunted and refuted**, not merely asserted. One pass-1 citation is stale and corrected in passing: `U.B.md:389` and `pass1-research-demo-module-census.md:86` count `demo/CLAUDE.md` among the file's references — that file no longer exists, so the reference count is *lower* than the wave recorded, which strengthens L-B1 rather than weakening it.

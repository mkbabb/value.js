claude-opus-5[1m]

# Challenge · `EditorHeader.vue` · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorHeader.vue` (108 lines)
**Mode:** static, read-only. No installs, no dev servers, no browser tooling. Every claim is source-derived; claims needing a live surface are marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Read whole:** the target + `SharePopover.vue` (62) + `useShareState.ts` + `EditorShell.vue` (261, the sibling that supersedes it) + `shell/index.ts` + `styles/style.css` + `styles/layout.css` + `styles/design-idioms.css` + the installed `@mkbabb/glass-ui@7.0.0` `header-ribbon` / `dark-mode-toggle` / token / a11y-override / `btn` / `glass-capsule` surfaces + `tailwindcss@4.3.0/index.css` + `@vueuse/shared@14.3.0`.

> **REVISION NOTE — this document supersedes an earlier same-path pass on the same axis.**
> The earlier pass (rows D-1…D-19, SUP-1…SUP-4) was independently re-derived from the tree. **Every one of its load-bearing probes reproduced** — including the `dist/gh-pages` bundle probe (§0.1), the `--dock-top-anchor` contract (D-8), the `layout.css:152` `.z-dock` prose (D-7), and `<html lang="en">` with no `dir` (D-16). That content is preserved verbatim in substance and numbering so prior citations stay valid.
> **What this revision changes:** five new rows (**D-20…D-24**), one new provenance section (**§1.0**), and **two arithmetic corrections to the prior text** — the dark-mode toggle is **32 × 36 px, not 32 × 32** (prior D-5b), and its rest-state contrast is **9.01 : 1, not 16.8 : 1** (prior D-14 table). Both corrections are flagged in place as **[CORRECTED]** and each carries its own falsifier.

---

## 0. Headline

| # | Finding | Severity |
|---|---|---|
| **D-1** | The component is **dead** (zero renderers, zero shipped bytes) **and wholly superseded** — glass-ui 7.0.0's `HeaderRibbon` is this component's own API, upstreamed and hardened, and is already the live path at `EditorShell.vue:16`. Verdict: **DELETE**, not remediate. | **BLOCKER** |
| D-2 | Collapsed items stay in the tab order **and** the a11y tree — no `inert`, no `aria-hidden`. | MAJOR |
| D-3 | No group role, no accessible name on the action strip. | MAJOR |
| D-4 | Keyboard can never open the ribbon: `mouseenter` only, no focus-within, no Esc. | MAJOR |
| D-5 | Mouse-only event model; no coarse-pointer path; targets under the design system's own `--touch-target`. | MAJOR |
| D-6 | **No surface.** The icons float directly on the scene — no plate, no border, no radius, no forced-colors fallback. | MAJOR |
| D-7 | z-rung violation: `z-dock` (40, *"the bottom dock band"*) worn by a **top** header. | MAJOR |
| D-8 | Bypasses the demo's own top-band anchor (`--dock-top-anchor`, which folds `env(safe-area-inset-top)` + the φ optical offset) for a raw `top-0 py-2`. | MAJOR |
| D-9 | Motion incoherence: the two transition channels are desynchronised by 150 ms and the width channel is **dead for ~60 % of its duration**. | MAJOR |
| D-10 | `title="Toggle dark mode"` collides with `DarkModeToggle`'s own state-aware `aria-label` → label-in-name mismatch. **Propagates to the live shell.** | MAJOR |
| **D-20** | **`aspect-square` is inert and the toggle renders 32 × 36.** `w-8` (layer `utilities`) overrides only *width*; the component's `height: 2.25rem` (layer `components`) survives. **Propagates to the live shell.** | **MAJOR** |
| D-11 … D-18 | Contradicted `overflow` utility · proximity inversion at `lg` · a renamed magic number · contradictory hover semantics · un-tokenised 2 s dwell · physical-axis properties (RTL) · undocumented layout/slot contract · comments-as-archaeology | MINOR ×8 |
| **D-21** | The STY-5 comment cites the **wrong stylesheet** for `--header-items-max-w` (`design-idioms.css`; it lives at `layout.css:15`). | MINOR |
| **D-22** | Hover-in and hover-out are bound to **different elements** — with a populated `#left` slot the collapse timer never arms. | MINOR |
| **D-23** | `hover:opacity-50` **overrides the primitive's own `:hover { opacity: 1 }`**, inverting the system's brighten-on-hover semantic. Rest state is α = 0.8 → **9.01 : 1**. | MINOR |
| D-19 | `icon-lg` namespace collision (demo 24 px vs glass-ui 20 px) — folds census §6.3. | INFO |
| **D-24** | **Producer relay:** `scale-on-hover` has no PRM `scale: 1` reset, though its sibling `glass-capsule-hover` does. | INFO |
| **SUP-1 … SUP-4** | The slot contract that **became** the design system's (now proven by commit) · a reduced-motion outcome that is *ideal* by construction · the correct overlay pointer idiom · a prior audit finding demonstrably discharged. | superlative ×4 |

**Tally: 24 defects (1 BLOCKER · 10 MAJOR · 11 MINOR · 2 INFO) · 4 superlatives.**

### 0.1 The honesty caveat that governs every severity below

The component **ships zero bytes.** Probe (re-run and reproduced this pass):

```
$ grep -rl "header-items-wrapper\|header-collapsed" dist/gh-pages   → (no output)
$ grep -rl "header-ribbon__actions"                 dist/gh-pages   → dist/gh-pages/assets/index-CL_QYCiO.css
                                                                       dist/gh-pages/assets/index-B2hcFaCm.js
```

The built demo bundle carries glass-ui's ribbon and **not** this one. So D-2…D-24 are stated **as-if-rendered** and are unobservable to any user today — with exactly three exceptions that are copied into the live `EditorShell.vue`: **D-10** (`:45`), **D-20** (`:46`), and, via `SharePopover.vue:7–8`, half of **D-5b**/**D-23**. This is why only D-1 carries BLOCKER: the design verdict for this file is deletion, and every other row is source-hygiene evidence *for* that verdict rather than a shipping defect.

I record this explicitly because two tempting claims are **false here**, and a false defect is worse than a missed one:

1. *"dead scoped CSS bloats the bundle"* — it does not; the probe above shows the fork is tree-shaken out entirely.
2. *"no local `prefers-reduced-motion` block ⇒ a PRM gap"* — it is not; see **SUP-2**. This component is PRM-correct by cascade-level delegation, verified.

**Severity convention.** D-2 would be BLOCKER-grade if rendered (WCAG 2.4.7 + 2.4.11 fail on first `Tab`). It is graded MAJOR because §0.1's probe proves it is unreachable. Severity here tracks *shipped* impact; the as-if-rendered grade is stated in-row.

---

## 1. D-1 — dead, and superseded by its own descendant (BLOCKER)

### 1.0 Primary evidence: the commit that did it *(new this revision)*

The prior pass established deadness from the tree and from three tranche documents. The tree also carries the primary record. `git log -S "<EditorHeader" --all -- demo/` returns exactly two commits:

```
05f29a42  refactor(demo): decompose cube App.vue into reusable editor shell + keyframe timeline   ← introduces the render site
3689c1ed  refactor(demo): replace EditorHeader with shared HeaderRibbon component                 ← removes it
```

`3689c1ed` (Mon Mar 9 2026), 4 files, +176/−17:

```
-        <EditorHeader>
+        <HeaderRibbon ref="headerRibbonRef" position="right">
-        </EditorHeader>
+        </HeaderRibbon>
-import EditorHeader from "./EditorHeader.vue";
+import { HeaderRibbon } from "@components/custom/header-ribbon";
+++ b/demo/@/components/custom/header-ribbon/HeaderRibbon.vue          (155 lines, new)
```

> *"Use the same HeaderRibbon component as value.js for cross-repo consistency."*

So the replacement is not a proposal, an evaluation, or an inference — **it executed five months ago**, and the file was simply not deleted. The single commit touching `EditorHeader.vue` since is `969990f6 refactor(demo-home): dissolve the at-sign wrapper and custom component tier into canonical homes` — a *relocation*. The corpse was carried to a new address rather than dropped.

Two consequences beyond D-1 itself:

- It **discharges SUP-1's falsifier**: the demo-local `HeaderRibbon.vue` was *created in the same commit* that stopped rendering `EditorHeader`, so the influence provably ran demo → design system, not the reverse.
- It **dates the debt**: 2026-03-09 → 2026-08-04, ~5 months, across at least three written verdicts (§1.2) and one relocation that had the file open.

### 1.1 Dead

```
$ grep -rn "EditorHeader" --include="*.vue" --include="*.ts" demo/
demo/components/instrument/shell/index.ts:2:export { default as EditorHeader } from "./EditorHeader.vue";
```

One reference in the entire demo tree, and it is the barrel's own re-export. The barrel *is* consumed — `demo/app/App.vue:138` (`EditorShell`, `EditorStartScreen`) and `demo/app/dock/MbabbMenu.vue:81` (`SharePopover`) — which is precisely what launders the deadness past a dead-export gate. `components/instrument/index.ts:27` re-exports `./shell` wholesale and nothing takes the name through it either. No dynamic import, no `defineAsyncComponent` by name, no template-string reference anywhere.

**Collateral.** `layout.css:15` — `--header-items-max-w: 500px; /* the EditorHeader expanded items-wrapper cap … */` — is a **dead token**; its sole consumer is `EditorHeader.vue:92`. Deletion is therefore 108 + 1 (barrel) + 1 (token) = **110 lines**, zero behavioural delta.

### 1.2 Superseded — the crosswalk

`EditorShell.vue:16` renders `<HeaderRibbon ref="headerRibbonRef" mode="persistent" placement="right">` with `#items`. glass-ui's component is not merely *similar*; its **slot contract is byte-for-byte this component's**:

```
node_modules/@mkbabb/glass-ui/dist/components/header-ribbon/HeaderRibbon.vue.d.ts
  declare var __VLS_7: { pinned: boolean; }
  type __VLS_Slots = {} & { anchor?: (props: typeof __VLS_7) => any; } & { items?: () => any; };
```

`EditorHeader.vue:36` — `<slot name="anchor" :pinned="isPinned">`; `:22` — `<slot name="items">`. Identical names, identical scoped prop. This component is the **origin design**; `HeaderRibbon` is it, upstreamed. Every axis-D row below is a line in the diff between the origin and the hardened descendant:

| concern | `EditorHeader.vue` | glass-ui `HeaderRibbon` (installed 7.0.0) |
|---|---|---|
| group semantics | none (bare `<div>`) | `role: "toolbar"`, `aria-label` (default `"Header actions"`) — `dist/header-ribbon.js` |
| collapsed region | `opacity:0; max-width:0; pointer-events:none` (`:101–107`) | `inert` + `aria-hidden` bound to `!expanded` — `dist/header-ribbon.js` |
| expand triggers | `mouseenter` only (`:13`) | `pointerenter` **with `e.pointerType !== "touch"` guard**, `focusin`/`focusout`, `Esc` → collapse + focus anchor |
| collapse | 2000 ms dwell timer (`:60`) | immediate on `pointerleave`; no magic dwell |
| stacking | `z-dock` = 40 (`:3`) | `z-index: var(--z-header)` = 35 — `components/header-ribbon/styles.css` |
| positioning | `absolute top-0 left-0 right-0` full-bleed (`:3`) | `position: fixed; width: max-content; inset-inline-start/end` per `placement` |
| axis | `margin-right` + `max-width` (`:92–93`) | `margin-inline-start/end` + `max-inline-size`, keyed to placement |
| cap token | `--header-items-max-w: 500px` (`layout.css:15`) | `--header-ribbon-actions-width, 30rem` (rem, consumer-overridable) |
| easing | `--duration-slow --ease-standard` (`:96–97`) | `--spring-snappy-duration --spring-snappy` (a real spring) |
| extra channel | none | `translate: ±0.375rem` — the collapse has **direction** |
| clipping | `overflow-hidden` utility **and** `overflow: visible` (`:18` vs `:99`) | `overflow: clip`, once |
| surface | none | `<Surface material="functional" surface="glass" specular="subtle">` + `radius-pill` + `--panel-padding` |
| reduced motion | delegated (see SUP-2) | explicit `@media (prefers-reduced-motion: reduce) { .header-ribbon__actions { transition: none } }` |
| forced colors | none | `@media (forced-colors: active) { .header-ribbon__band { border: 1px solid CanvasText } }` |
| coarse pointer | none | `@media (pointer: coarse) { padding: .75rem; max-inline-size: calc(100vw - 1.5rem) }` |

There is no column in which the local copy wins.

**Prior corpus.** This is the **third** time the verdict has been written. `keyframes.js/docs/tranches/U/audit/lane-18-demo-instrument-editors-shell-state.md:69–78` — *"**Fully dead:** EditorHeader.vue (108L) — zero importers anywhere in the repo … the barrel re-export is what hides it from `proof:no-dead-export`"*, proposal *"(a) **Delete EditorHeader.vue** and its barrel line — no legacy code."* Re-ratified as wave work at `docs/tranches/U/waves/U.B.md:389,402,407` (U.B5, "a NO-DEFERRAL row"). Neither executed. It also violates the standing `feedback_no_backwards_compat` and `feedback_glass_ui_first_class` laws: a demo-local fork sitting beside the published primitive it was promoted into.

**Falsifier.** Any of: a consumer outside `demo/` (the package `exports` map publishes only the library, not the demo); a dynamic/string-keyed registration; a documented external embed; a render site in a file type the `.vue`/`.ts` grep misses (`.md`/`.mdx`/`.html`); or a `HeaderRibbon` capability regression that only the fork covers (I found none — the fork is a strict subset).

**Contradicts the hitherto corpus.** `formation/keyframes/lane-frontend.md` §4 lists `| 108 | EditorHeader.vue | G | header bar — DarkModeToggle |` as a live roster row of "editor chrome" with no deadness mark, and §5's shadow census (S-1…S-8) has **no row for it** — even though §3.1 records `/header-ribbon` at exactly 1 import. The tree disagrees with both: this is the census's **missing S-row** (filed as **S-9** in §7), and it is the *strongest* one in the corpus, because unlike S-3/S-4/S-5 ("evaluate") there is nothing to evaluate — the replacement is already rendering, one file away. It is also the **only** census row that does not depend on **F-1** (the phantom glass-ui dependency): a deletion needs nothing to resolve.

---

## 2. Accessibility (D-2 … D-5)

### D-2 — the collapsed strip stays focusable and stays in the a11y tree (MAJOR; BLOCKER-grade as-if-rendered)

`:101–107` — `.header-collapsed { max-width: 0; margin-right: 0; opacity: 0; pointer-events: none; overflow: hidden; }`

None of those five declarations removes an element from sequential focus navigation or from the accessibility tree. Only `display:none`, `visibility:hidden`, `content-visibility:hidden`, the `hidden` attribute, or `inert` do; `pointer-events: none` suppresses *pointer* hit-testing only. So in the collapsed state — **which is the mount state** (`:48` `isExpanded = ref(false)`, `:49` `isPinned = ref(false)`, `:51` their `||`) — a `Tab` press lands on the SharePopover trigger (`SharePopover.vue:4`) and then the dark-mode button, both at effective `opacity: 0` inside a 0-width clipping box.

The ancestor `opacity: 0` composites the **entire subtree**, so `dark-mode-toggle.css`'s own `:focus-visible { box-shadow: var(--focus-ring-shadow…); opacity: 1 }` cannot recover the indicator. A screen-reader user hears "Share animation, button" for a control no sighted user can see; a sighted keyboard user's focus vanishes into a zero-width box with nothing to scroll into view; `Enter` on the second stop silently flips the site theme.

- **WCAG 2.4.7 Focus Visible (AA)** — fail (indicator composited to α = 0).
- **WCAG 2.4.11 Focus Not Obscured, Minimum (AA, 2.2)** — fail (focused control entirely clipped by an ancestor).
- **WCAG 2.4.3 / 4.1.2** — AT and sighted users get different UIs.

This is the single defect `HeaderRibbon` most conspicuously fixes: `inert: !expanded || void 0`, `"aria-hidden": !expanded` (`dist/header-ribbon.js`).

**Falsifier.** Show that `pointer-events: none` or `max-width: 0` removes an element from the tab order (they do not; the normative mechanisms are `inert` and CSS `visibility`), or that the two default items are themselves non-focusable (both render `<button>` — `SharePopover.vue:4`, `dark-mode-toggle.js` renders `i("button", …)`), or a `.header-collapsed * { visibility: hidden }` elsewhere in the cascade (`grep -rn "header-collapsed"` over `demo/` and `glass-ui/dist/styles/` → `EditorHeader.vue:19,101` only).

### D-3 — no group role, no accessible name (MAJOR)

`:2`, `:11`, `:16`, `:32` — four nested `<div>`s, zero `role`, zero `aria-label`, zero `aria-expanded`. The action strip is an unnamed generic container; the pin state (`:36`) is passed to a slot but never announced. `HeaderRibbon` ships `role="toolbar"` + `ariaLabel` with a default, and exports the type so consumers can rename it (`types.d.ts`: *"Accessible name for the persistent action toolbar"*).

**Caveat, stated so the remedy is not itself a defect:** ARIA APG's `toolbar` pattern expects arrow-key roving with a single tab stop; glass-ui's ribbon supplies the role and the name but **not** the roving (`dist/header-ribbon.js` binds only `keydown.esc`). So "adopt `role="toolbar"`" is the right direction and an *incomplete* remedy in both codebases — a **glass-ui BH relay candidate** under the standing relay edict, not a kf-side fix.

**Falsifier.** An ancestor supplying the name/role. `EditorHeader`'s root is the outermost node it owns and it has no consumer to supply one.

### D-4 — keyboard cannot open it (MAJOR)

Expansion has exactly one trigger: `@mouseenter="onRibbonMouseEnter"` (`:13` → `:64–67`). No `:focus-within` (`grep -rn "focus-within" demo/styles/` → nothing touching this class), no `focusin`. The alternative is the pin at `:32–35`, a `<div>` with `@click` and no `tabindex`, no `role`, no key handler — reachable only if the (never-supplied, see D-17) `#anchor` slot happens to contain a real button. Compose with D-2 and the failure is complete: the keyboard user cannot cause the strip to become visible, but *can* tab into it while it is invisible.

`HeaderRibbon` closes this with `onFocusin`/`onFocusout` feeding the same `expanded` computed, plus Esc-to-collapse-and-return-focus (`A()` → `b.value?.querySelector("button, a, [tabindex]:not([tabindex='-1'])")?.focus()`).

**Falsifier.** A consumer that passes a focusable `#anchor` whose focus/click path expands the strip — there is no consumer at all, so the contract is unsatisfiable rather than merely unsatisfied. (Honest scoping: the primitive shares half this hole, since its `inert` actions cannot receive `focusin` either; the difference is that it then gives Esc and a named toolbar to orient in.)

### D-5 — the touch path does not exist (MAJOR)

(a) **Event model.** `mouseenter`/`mouseleave` (`:4`, `:13`), not pointer events. On touch, browsers synthesise a `mouseenter` on tap and there is no reliable symmetric `mouseleave`, so a tap either expands-and-sticks until the 2 s dwell (`:60`) fires from an unrelated later event, or double-fires against the pin click. `HeaderRibbon` uses `pointerenter`/`pointerleave` and explicitly discards touch: `if (e.pointerType !== "touch") hovered = true`.

(b) **Target size. [CORRECTED]** `SharePopover.vue:7,11` — `p-0` around `<Share2 class="icon-lg">`; `icon-lg` is the demo's own `@utility icon-lg { @apply size-6 }` (`design-idioms.css:114–119`) = **24 × 24 px**. The dark-mode button is `aspect-square w-8` (`:26`) — *the prior pass recorded this as 32 × 32; it is **32 × 36**, see **D-20***. Both clear WCAG 2.5.8 AA (24 px) — the share glyph at 24 px exactly, with zero margin — and both fall short of the design system's **own** declared coarse-pointer target, `--touch-target: 2.75rem` (44 px, `glass-ui/dist/styles/tokens/sizing.css`), whose `touch-hit-area` utility (`styles/utilities/a11y-overrides.css`) exists for exactly this and is unused here. `DarkModeToggle` emits `data-size`/`data-press-armed` but **not** `data-control-target`, so `utilities/responsive.css`'s coarse-pointer `min-block-size` rule cannot reach it either.

(c) **Optical inconsistency.** A two-item strip whose items are 24 px and 32 × 36 px, unpadded vs padded — the share glyph reads visibly smaller than its neighbour at the same optical weight, and the neighbour is not square.

**Falsifier.** (a) dies if a coarse-pointer stylesheet or a `useTouchGate` wrapper covers this component — it imports neither (`:43–46`), and `grep -rn "pointer: coarse" demo/styles/` finds no rule reaching it. (b) dies if `icon-lg` resolves to ≥ 2.75 rem — it resolves to `size-6`.

---

## 3. Surface, stacking, proportion (D-6 … D-8, D-20)

### D-6 — there is no surface (MAJOR)

The component paints nothing: no background, no border, no radius, no shadow, no backdrop filter. Two icons sit directly on whatever the scene is rendering — the two-tier graph-paper substrate (`EditorShell.vue:238–260`), the Aurora hero wash (`HeroAurora.vue`), or an animating subject. glass-ui's ribbon wraps its items in `<Surface material="functional" surface="glass" specular="subtle">` with `border-radius: var(--radius-pill)` and `padding: var(--panel-padding)`, **and** supplies a `@media (forced-colors: active)` border so the band survives a forced-colors theme where glass backgrounds are dropped.

Three consequences:

1. **The icon contrast has no floor.** The computed ratios in D-14/D-23 hold only against the flat paper field; over the scene the backdrop is unbounded. Worked bound: `--foreground` at α = 0.5 over mid-grey `#808080` → **2.14 : 1** light / **1.89 : 1** dark; over the demo's own `--subject-teal #52e898` (`design-idioms.css:54`) → 3.02 : 1 light / **1.09 : 1** dark. All below WCAG 1.4.11's 3 : 1.
2. **Forced colors:** no border, no background ⇒ the control cluster has no visible boundary. (Focus itself survives — `a11y-overrides.css` supplies `.dark-mode-toggle-button:focus-visible { outline: 2px solid Highlight }` — the *grouping* does not.)
3. **`prefers-reduced-transparency`:** glass's `glass-specular-track.css` arm is a no-op here because there is no glass surface to reduce — vacuously satisfied rather than honoured.

**Falsifier.** A parent-supplied plate. There is no parent; `:3` is the component's outermost node. `UNPROVEN-NEEDS-LIVE` for which backdrop pixel actually sits behind the glyph — the *absence of any surface declaration* is source-decidable and is the claim; the specific failing ratio is conditional on the backdrop.

### D-7 — the wrong z-rung, and the one reserved for something else (MAJOR)

`:3` — `z-dock`. The demo's own ordered-layer contract (`styles/style.css:23–38`) reads:

```
--z-bar      :  30  the editor bars (header / menubar chrome)
--z-dock     :  40  the bottom dock band
```

A top header wearing the **bottom dock band's** rung. Three consequences: (i) it contradicts the contract's own gloss, which names `z-bar` for exactly this component class; (ii) it sits at the *same* rung as the real dock band (`TransportDock.vue:7`, `ChromeDock.vue:215`), so header-vs-dock paint order falls back to DOM order — the precise non-determinism the ordered-layer contract exists to abolish, and a direct breach of its stated invariant *"strictly ascending — a higher rung always paints over a lower one"*; (iii) `layout.css:152` warns in prose that dock geometry *"keys on an EXPLICIT `[data-dock-tether]` opt-in attribute on the two real dock bands, NOT a `:has()` test on a generic `.z-dock` utility class (proof:brittleness forbids keying layout on a z-* or pointer-events-* utility class)"* — i.e. the repo already knows `z-dock` is being worn by non-dock nodes, and this is one of them.

glass-ui resolves it with a rung the demo's contract **does not even enumerate**: `--z-header: 35` (`glass-ui/dist/styles/tokens/scheme-motion.css`), used by `.header-ribbon`. `grep -rn "z-header\|--z-header" demo/` → nothing. The contract that claims to be *"single-sourced from glass-ui's `--z-*` scale"* is a lossy transcription of its own upstream — a defect in `style.css` that this component's mis-rung exposes.

**Falsifier.** Evidence that this header is intended to paint above the bottom dock (nothing in the contract or the component says so), or that `z-bar`/`z-header` are unavailable (both are defined and Tailwind-bridged via `bridges.css`).

### D-8 — the top-band anchor and the φ ladder are bypassed (MAJOR)

`:3` — `top-0 … px-4 py-2`. Raw Tailwind rhythm: 0 px from the viewport edge, 16 px inline, 8 px block. Meanwhile `layout.css:112–118` defines the demo's top-band contract:

```css
--dock-top-anchor: calc(
    min(max(var(--work-area-top-offset, 0px), env(safe-area-inset-top, 0px)),
        var(--dock-anchor-ceiling)) + var(--dock-margin) / 4 );
```

— a golden-asymmetry anchor (top `+ margin/4`, bottom `+ margin/φ`) that folds the notch inset *and* the optical work-area offset, with a documented cap, and whose own comment records *"the min() is INSIDE the optical max() so a notched device's safe-area inset still wins when it exceeds the cap."* `EditorHeader` participates in none of it: no safe-area inset (on a notched device the strip lands under the status bar), no `--dock-margin`, no φ. The file's entire spacing vocabulary — `px-4`, `py-2`, `gap-2`, `lg:gap-4`, `0.75rem` — is default Tailwind rhythm in a demo that owns `--space-phi-5: 2.618rem` / `--space-phi-6: 4.236rem` and a `--phi` divisor. Aristotelian proportion is asserted everywhere around this component and nowhere inside it.

**Falsifier.** A global rule applying safe-area padding to `.z-dock`/`absolute top-0` nodes — `layout.css:152` explicitly forbids keying layout on the `z-*` utility class, so no such rule exists by policy.

### D-20 — `aspect-square` is inert; the toggle renders 32 × 36 (MAJOR · **propagates to the live shell**) *(new this revision)*

`:26` — `class="aspect-square w-8 scale-on-hover hover:opacity-50"`.

`glass-ui/dist/components/dark-mode-toggle/dark-mode-toggle.css`, inside `@layer components`:

```css
.dark-mode-toggle-button { --dark-mode-toggle-size: 2.25rem; --dark-mode-toggle-padding: 0.375rem;
    display: inline-grid; place-items: center; flex: none;
    width: var(--dark-mode-toggle-size); height: var(--dark-mode-toggle-size); … }
```

`data-size="md"` is the default (`dark-mode-toggle.js`, `props.size: { default: "md" }`) and has **no** size override — the `sm`/`lg`/`control`/`dock` arms do, `md` does not. So the intrinsic box is **36 × 36**.

Tailwind 4.3.0 declares `@layer theme, base, components, utilities;` (`node_modules/tailwindcss/index.css:1`), so `w-8` (layer `utilities`) beats the component rule at equal specificity — **on width only**. `height: 2.25rem` survives untouched. Net box: **32 wide × 36 tall.**

And `aspect-square` (`aspect-ratio: 1 / 1`) is therefore **inert**: `aspect-ratio` is ignored when both dimensions are definite. The class asserts an intent the box does not honour — it is decorative text, not a constraint. Composed with D-5c, the two-item strip is 24 × 24 beside 32 × 36: a **50 % height disparity** across a cluster of two on one `items-center` baseline. The primitive would have normalised it at the band (`min-block-size: var(--size-icon-btn)` = 2.5 rem = 40 px).

The glyph itself is not distorted: the SVG has a square `viewBox="0 0 472.39 472.39"` and default `preserveAspectRatio="xMidYMid meet"`, so it letterboxes to 20 × 20 inside the 20 × 24 content box rather than stretching. The *button* is the defect, not the icon.

**This outlives deletion:** `EditorShell.vue:46` carries the identical `class="aspect-square w-8 scale-on-hover"`. The 32 × 36 box and the inert `aspect-square` are **live in the shipping shell**.

**Falsifier.** (a) A `height`/`size-8` utility on `:26` — the class list is quoted in full above and contains none. (b) `.dark-mode-toggle-button` height arriving from a layer at or above `utilities` — it is `@layer components` (quoted). (c) `data-size` resolving to something other than `md` — no `size` prop is passed. (d) Exact rendered pixels: `UNPROVEN-NEEDS-LIVE`; the cascade resolution is decidable, the visual read is not.

---

## 4. Motion (D-9)

### D-9 — two channels describing two different events (MAJOR)

`:95–98`:

```css
transition:
    max-width   var(--duration-slow)   var(--ease-standard),      /* 0.45s cubic-bezier(.4,0,.2,1) */
    margin-right var(--duration-slow)  var(--ease-standard),
    opacity     var(--duration-normal) var(--ease-decelerate);    /* 0.30s cubic-bezier(0,0,.2,1) */
```

Token values resolved from `glass-ui/dist/styles/tokens/scheme-motion.css` + `theme/bridges.css`: `--duration-slow: 0.45s`, `--duration-normal: 0.3s`, `--ease-standard → --motion-ease-standard: cubic-bezier(0.4,0,0.2,1)`, `--ease-decelerate → --ease-out → --motion-ease-out`. (All four resolve — no IACVT; the transition is live, not silently dropped.)

**(a) The dead zone.** The animated cap is `--header-items-max-w: 500px` (`layout.css:15`). The strip's actual content is `24px (share) + 8px gap + 32px (toggle) = 64px`, or `72px` at `lg` (`gap-4`). Rendered width is `min(content, max-width)`, so **no visible width change occurs while `max-width > 72px`** — i.e. for the first ~86 % of the *value* range. Through `cubic-bezier(0.4,0,0.2,1)` that value is reached at roughly `t ≈ 0.60`, so **~270 ms of the 450 ms collapse produces no visible motion at all**; the whole geometric event is compressed into the last ~180 ms.

**(b) The desync.** The opacity channel finishes at 300 ms. The width channel *starts being visible* at ~270 ms. The user therefore sees: content fades to nothing over 300 ms at full width → then, after it is already gone, the empty space collapses. Two channels narrating two different events, 150 ms apart.

**(c) One ease for both directions.** A single declaration serves expand and collapse. `--ease-decelerate` is by definition the *entrance* ease (`bridges.css`: `--ease-decelerate: var(--ease-out)`; the sibling `--ease-accelerate: var(--ease-in)` exists and is unused here), so the exit runs fast-then-slow — the canonical "hesitant dismissal".

**(d) No carrier channel.** glass-ui's ribbon has the *same* structural cap problem (`--header-ribbon-actions-width` defaults to 30 rem ≈ 480 px against the same tiny content) — I flag that honestly rather than pretending the fork is uniquely wrong — but it survives it, because it adds `translate: ±0.375rem` (a channel with no dead zone), drives the width on `--spring-snappy` (a `linear()` spring that front-loads ~60 % of its travel in the first third), and shortens opacity to `--duration-fast` (0.2 s). EditorHeader has no third channel and back-loads the only geometric one.

**Prior corpus, unfolded.** `keyframes.js/docs/tranches/C/audit/animation/ios-animation-general.md:217` names this exact line: *"Header `max-width` morph (`:101`) is a continuity candidate begging for a spring"*, and `:281` prescribes `SpringProgress`-driven continuity. The prescription **landed** — in glass-ui's `HeaderRibbon`, on `--spring-snappy`. It never landed here. The C-tranche finding is discharged upstream and open downstream, which is the same fact as D-1 seen from the motion axis.

**Falsifier.** Measure the rendered width of `.header-items-wrapper` in a live tree; if it exceeds ~430 px (a consumer overriding `#items` with a much wider strip) the dead zone shrinks toward zero and (a)/(b) dissolve. With the default slot (`:22–28`) it cannot. Note also that under PRM the entire row is moot — SUP-2 strips both geometric channels — so D-9 is a no-preference-only defect.

---

## 5. Copy, tokens, contract (D-10 … D-19, D-21 … D-24)

### D-10 — the tooltip contradicts the accessible name (MAJOR · **propagates to the live shell**)

`:24–25` — `<DarkModeToggle title="Toggle dark mode" …>`. glass-ui's toggle computes its own name (`dist/dark-mode-toggle.js`):

```js
"aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
"aria-pressed": isDark,
...restAttrs                       // `title` lands here (only `class` and `type` are stripped), on the same <button>
```

Result: one button whose **accessible name** is "Switch to dark mode" (state-aware; `aria-label` outranks `title`) and whose **visible tooltip** is "Toggle dark mode" (static, stale). Voice-control users read the visible label and say "click Toggle dark mode", which does not match the accessible name (WCAG 2.5.3 Label in Name). Per HTML-AAM the `title` additionally degrades to the accessible *description*, so AT announces both halves of the inconsistency. The `title` is also redundant — the component is already named, already `aria-pressed` — and is the weakest available affordance (no touch exposure, no keyboard exposure, UA-controlled delay). The sibling shell knows this: `EditorShell.vue:30–43` wraps its Keyboard button in a glass `<Tooltip>`, then uses raw `title` for `DarkModeToggle` at `:45` anyway.

This is a row that outlives deletion: **`EditorShell.vue:45` carries the identical `title="Toggle dark mode"`**, and that file renders.

**Falsifier.** If `title` is judged not to be a "visible label" for 2.5.3, the claim degrades from a WCAG failure to a stale-copy/redundancy defect — it does not disappear, because the two strings are still inconsistent by inspection. Also dies if `DarkModeToggle` stripped `title` — the destructure strips only `class` and `type`.

### D-11 — `overflow-hidden` is dead, and the clip intent is stated twice, contradictorily (MINOR)

`:18` declares the utility `overflow-hidden`; `:99` declares `overflow: visible` on the same element. The scoped rule wins on two independent grounds: specificity (`.header-items-wrapper[data-v-…]` = 0-2-0 vs `.overflow-hidden` = 0-1-0) and cascade layers (Tailwind v4 emits utilities inside `@layer utilities` — confirmed at `tailwindcss/index.css:1`, `@layer theme, base, components, utilities;` — while Vue's scoped `<style>` is injected unlayered, and unlayered beats layered). Only `.header-collapsed { overflow: hidden }` (`:106`) restores clipping, and only while collapsed.

Secondary consequence on **expand**: `overflow` is not in the transition list, so `visible` applies at `t = 0` while the box is still ~0 px wide — the ~64–72 px of content spills its box for ~60 ms at rising opacity (~35 % by then). The spill paints *under* the anchor (DOM order, `:32` follows `:16`), so the visible artefact is limited to the overhang past the anchor's own box. The reveal is therefore **asymmetric**: collapse wipes (clipped), expand pops (unclipped). The primitive avoids both by using `overflow: clip` unconditionally — which, unlike `hidden`, does not create a scroll container, and so does not force the trade the fork makes (the `visible` at `:99` is almost certainly there so `SharePopover`'s `PopoverContent` can escape, `SharePopover.vue:14`).

**Falsifier.** Show Tailwind utilities emitted unlayered *and* at ≥ 0-2-0 specificity. Both would have to be true; `tailwindcss/index.css:1` refutes the first. `UNPROVEN-NEEDS-LIVE` for the perceived severity of the pop.

### D-12 — proximity inversion at `lg` (MINOR)

`:18` `gap-2 lg:gap-4` (0.5 rem → 1 rem intra-strip) against `:93` `margin-right: 0.75rem` (strip → anchor). Below `lg` the ordering is correct (0.5 < 0.75: items group, anchor separates). At `lg` it **inverts** — the anchor sits 0.75 rem from the strip while the strip's own members sit 1 rem apart, so Gestalt proximity binds the pin *more tightly* to the last item than the items bind to each other. glass-ui gets the ratio right and keeps it breakpoint-invariant (`gap: 0.5rem` + `margin-inline: 0.75rem`) — and additionally carries the grouping in a plate rather than in whitespace alone (D-6).

**Falsifier.** A design intent that the anchor read as a member of the strip rather than its handle — contradicted by `:31` ("Anchor — always visible") and by the anchor living outside the collapsible wrapper.

### D-13 — the token that renamed a magic number (MINOR)

`:89–92` claims the STY-5 improvement: *"reads the named layout token … instead of a magic pixel literal"* — and then, in the same comment, *"(same 500px value)"*. `layout.css:15` confirms: `--header-items-max-w: 500px`. The literal was moved, not derived. It is a `px` value in a `rem`/φ scale; it is ~7× the content it caps; nothing consumes it but this one rule; and its only functional role is to set the length of D-9's dead zone. As a design constraint it is inert. Cf. `keyframes.js/docs/tranches/J/audit/styling-design-system.md:21,42,146` and `docs/tranches/J/waves/J.W7b-impl.md:28`, which book the row as closed. glass-ui's equivalent is at least a rem and consumer-overridable (`--header-ribbon-actions-width, 30rem`).

**Falsifier.** A second consumer of `--header-items-max-w`, or a derivation (`calc`, `min()`, a container query) making 500 px a computed bound. `grep` finds one consumer and no derivation.

### D-14 — contradictory hover semantics; the contrast arithmetic (MINOR) **[CORRECTED]**

`:26` — `scale-on-hover hover:opacity-50`. `scale-on-hover` is glass-ui's `@utility` (`styles/utilities/btn.css`) scaling to `--scale-hover: 1.08` (`design-idioms.css:40–41`): *advance*. `hover:opacity-50`: *recede*. Two opposite affordance semantics on one control, fired by one event. **The live shell already resolved this** — `EditorShell.vue:46` is `aspect-square w-8 scale-on-hover`, with the opacity fade dropped. (`SharePopover.vue:8` still carries it and *is* live — see D-23.)

Computed, since the axis asks for ratios where decidable. Tokens: `--foreground: hsl(24 10% 10%)` / `--background: --neutral-0: hsl(40 30% 98%)` (light); `hsl(30 14% 90%)` / `hsl(24 9% 4%)` (dark). sRGB-space alpha compositing, WCAG 2.x relative-luminance formula.

| theme | α = 1.0 (unstyled) | **rest, α = 0.8** | hover, α = 0.5 |
|---|---|---|---|
| light | 16.82 : 1 | **9.01 : 1** | **3.32 : 1** |
| dark | 15.85 : 1 | **10.19 : 1** | **4.49 : 1** |

**[CORRECTED]** The prior pass listed rest as 16.8 : 1 / 15.9 : 1. That is the α = 1.0 column. `.dark-mode-toggle-button` ships `opacity: 0.8` at rest (`dark-mode-toggle.css`, quoted in D-23), so the true rest figures are the **9.01 / 10.19** column. The correction does not change the verdict — rest still clears every threshold with room — but it halves the apparent headroom the hover state is spending.

Both hover values clear WCAG 1.4.11 (3 : 1 non-text). So **this is not a contrast failure on the paper field**, and I decline to claim one. What it is: the hover state spends ~63 % of the light-theme rest contrast and lands 0.32 above the floor — and because of D-6 there is no plate guaranteeing that field, so the floor is not guaranteed either (D-6's worked bounds: 2.14 : 1 and 1.09 : 1 over plausible scene pixels, both failing). `UNPROVEN-NEEDS-LIVE` for the ratio over the animating scene.

**Falsifier.** Re-derive with a compositing model other than sRGB-space alpha blend, or with different theme tokens; the qualitative claim (a hover affordance that roughly thirds the control's contrast at the moment of targeting) survives either way.

### D-15 — the un-tokenised 2 s dwell (MINOR)

`:60` — `2000`. The only bare numeric literal in the file, in a repo whose durations are all tokens (`--duration-instant|control|fast|normal|slow|panel|xl|xxl`), with no rationale recorded. It is **4.4×** the slowest named duration (`--duration-slow: 0.45s`) and 1.3× the longest non-shimmer token (`--duration-xxl: 1.5s`). Two seconds is a long dismissal: the strip stays open across a deliberate pointer exit for eight frames past the 250 ms window a user reads as "responding to me", over chrome that occludes an animating stage. `HeaderRibbon` needs no dwell at all — it collapses on `pointerleave` and buys the forgiveness back with focus-within and Esc.

Note the local irony: `:89–91` congratulates the same `<style>` block for retiring a magic literal, while `:93`'s `margin-right: 0.75rem` sits beside it un-tokenised too.

**Falsifier.** A UX rationale in the ledger for a 2 s hover-out grace on this ribbon, or a `--header-hide-delay`-style token (`grep -rn "hide-delay\|2000" demo/styles/` → none); the comment (`:53–55`) documents only *which library owns the handle*, never the constant.

### D-16 — physical-axis properties; RTL (MINOR)

`:92–93` `max-width` / `margin-right`, `:3` `left-0 right-0`. Under `dir="rtl"` the flex main axis reverses, so within `:11` the strip renders to the right of the anchor — and `margin-right` then places its 0.75 rem gap on the **outer** edge while the strip↔anchor gap collapses to 0. `HeaderRibbon` is fully logical (`margin-inline-start`/`margin-inline-end` selected by `data-placement`, `max-inline-size`, `inset-inline-*`).

Scoped honestly: the demo is `<html lang="en">` (`demo/app/index.html:2`) with **no** `dir` attribute and no RTL machinery anywhere (`grep 'dir="rtl"|direction: *rtl|rtl:|useTextDirection' demo/` → nothing). So this is a portability/idiom defect with zero user impact today — MINOR, not MAJOR — recorded because the axis asks for RTL coverage and the answer is "absent and unexercised". The template's own `left-0 right-0` + `justify-between` are direction-agnostic; the wrapper's margin is the sole physical-axis dependency, a one-property fix.

**Falsifier.** Any RTL surface in the demo. There is none. The grade rises to MAJOR the moment one lands.

### D-17 — the layout and slot contracts are undeclared (MINOR)

(a) `:3` is `absolute` with no positioned-ancestor guarantee and no documentation of the requirement; dropped into a static container it positions against the initial containing block. `HeaderRibbon` is `position: fixed` — self-sufficient by construction.
(b) `#items` has default content (`:22–28`) but `#anchor` (`:36`) and `#left` (`:8`) have none, and nothing — no prop, no type, no comment — declares that `#anchor` is *required*. With no slot the anchor is an empty zero-size `<div>` carrying the only pin/unpin handler in the component, so the pin is unreachable and the ribbon degrades to hover-only. This makes the comment at `:31`, **"Anchor — always visible"**, false in the component's own default render.

**Falsifier.** A declared required-slot contract or a default anchor. Neither exists.

### D-18 — comments are edit-history, not design rationale (MINOR)

Nine comment lines (`:6, :15, :31, :53–55, :89–91`) — roughly 40 % of the non-template bytes. Their content is wave archaeology — "W1.S4", "J.W7b STY-5" — resolvable only against this repo's tranche ledger, with no decoder reachable from the file (`grep -rn "J.W7b" demo/` finds no definition site in the demo tree). What a reader needs and does not get: what the pin *means*, why 2 s, that `#anchor` is mandatory, that a positioned ancestor is required, why the cap is 500. One of the nine (`:31`) is false (D-17b), one (`:89–91`) overstates its own fix (D-13), and one (`:89–91` again) is factually wrong about where its token lives (D-21). A design surface should document its contract; this one documents its diffs, and is longest exactly where the code is least surprising while silent where it is most.

Note for completeness on the prose sub-axis: there is **no user-facing copy in this component** — the only strings are `title="Toggle dark mode"` and slot names. Nothing trite or cliché to flag; the copy defect is D-10's staleness, not tone.

**Falsifier.** Reader-facing rationale elsewhere — the barrel (`index.ts`) carries none and there is no `CLAUDE.md`/doc entry for the component.

### D-19 — `icon-lg` collides across the boundary (INFO · folds census §6.3)

The demo defines `@utility icon-lg { @apply size-6 }` = **24 px** (`design-idioms.css:114–119`). glass-ui defines `--icon-lg: 1.25rem` = **20 px** (`dist/styles/tokens/sizing.css`), bridged to Tailwind as `--spacing-icon-lg` (`theme/bridges.css`). Two "large icon" scales, differing by 20 %, live in one cascade under near-identical names: an author writing `size-icon-lg` gets 20 px, `icon-lg` gets 24 px — and the whole ladder is shifted one rung (demo 14/16/20/24 vs glass 12/14/16/20). Reached by this component transitively via `SharePopover.vue:11`.

This is the concrete instance of the hazard census `lane-frontend.md` §6.3 names abstractly — *"No `--kf-*` namespace exists … Demo tokens are unprefixed and therefore share a flat global namespace with glass-ui's — a collision surface worth a lane of its own."* **Corroborated, with a named collision.** The demo's own comment (`design-idioms.css:92–95`) records that these utilities *"used to resolve to nothing, all computing at Lucide's default 24px"* — the ladder has already silently no-op'd once.

Scoped honestly: this is a **semantic** collision, not a literal override. glass-ui defines no `@utility icon-*` (`grep '@utility icon-(xs|sm|md|lg|xl)' dist/styles/**/*.css` → no output), so nothing is being shadowed; two mechanisms with rhyming names simply disagree.

**Falsifier.** Show `icon-lg` and `--icon-lg` resolving to the same length, or that the demo utility shadows the glass token in a way that makes them one scale. They are separate mechanisms (a Tailwind `@utility` vs a `@theme` spacing bridge) and separate values.

### D-21 — the STY-5 comment cites the wrong stylesheet (MINOR) *(new this revision)*

`:89–91`:

```
/* J.W7b STY-5 — the expanded-state cap reads the named layout token
   (design-idioms.css --header-items-max-w, same 500px value) instead of a
   magic pixel literal; the collapse transition animates to/from it. */
```

`--header-items-max-w` is **not** in `design-idioms.css`. `grep -n "header" demo/styles/design-idioms.css` → **no output**. It lives at `demo/styles/layout.css:15`.

This is not an accidental near-miss: the two sheets have a *documented* split, and `layout.css:9–11` records it from the other side — *"NOTE: `--panel-max-h` / `--rail-width` / `--mask-fade` live in design-idioms.css (proof:idioms definition-anchors them there)"*. A reader following the citation lands in the wrong 300-line file, in a repo that took the trouble to write down which file owns what. Compounded by D-1: the token is now dead, and its own `layout.css:15` comment names its only (dead) consumer.

**Falsifier.** A second definition of `--header-items-max-w` in `design-idioms.css` — the grep is exhaustive over `demo/styles/*.css` and finds exactly one definition, in `layout.css`.

### D-22 — hover-in and hover-out are bound to different elements (MINOR) *(new this revision)*

`:4` binds `@mouseleave="onGroupMouseLeave"` to the **outer** bar — `absolute top-0 left-0 right-0`, the full viewport width, which also hosts the `#left` slot (`:7–9`, the mobile sidebar toggle). `:13` binds `@mouseenter="onRibbonMouseEnter"` to the **inner** group only.

The asymmetry has a concrete failure mode. `mouseleave` on the outer bar fires only when the pointer exits the bar's entire hover chain. So with a populated `#left` slot:

- hovering the `#left` toggle does **not** expand the ribbon (enter is bound to the inner group), yet
- moving the pointer *from* the ribbon *to* the `#left` toggle does **not** collapse it either — the pointer is still inside the outer bar's hover chain, so `onGroupMouseLeave` never fires and `startHideTimeout` (`:69–73`) never arms.

The ribbon can therefore stay expanded indefinitely while the pointer rests on an unrelated control at the opposite edge of the screen. Symmetric binding (both handlers on `:12`) is the obvious shape and is what the primitive does (`onPointerenter`/`onPointerleave` on one element).

This **refines SUP-3** rather than contradicting it: SUP-3's observation — that `pointer-events: none` shrinks the effective `mouseleave` region to the union of the `pointer-events-auto` children — is correct, and is exactly why the bug is currently invisible: with an **empty** `#left` slot the union is just the ribbon, and the two regions coincide. The defect is latent in the slot contract, not in today's (unrendered) default.

**Falsifier.** `pointer-events: none` on the outer bar preventing `mouseleave` from firing at all — it does not; ancestors of a hovered element are in the hover chain regardless of their own `pointer-events`, which is what makes the collapse work today. Also dies if `#left` is proven to be permanently empty — it is a public slot with no such declaration (cf. D-17b). `UNPROVEN-NEEDS-LIVE` for the exact chain behaviour with an occupied `#left`.

### D-23 — `hover:opacity-50` overrides the primitive's own hover rule (MINOR) *(new this revision)*

Beyond D-14's scale-vs-opacity contradiction, the utility is also **fighting the component it is applied to**. `dark-mode-toggle.css`, `@layer components`:

```css
.dark-mode-toggle-button { … opacity: 0.8; transition: opacity var(--duration-fast) var(--ease-standard), …; }
.dark-mode-toggle-button:hover { background: var(--surface-tint-10); opacity: 1; }
```

The design system's stated hover semantic is **brighten**: 0.8 → 1.0, plus a tint plate. `:26`'s `hover:opacity-50` sits in `@layer utilities`, which beats `components` at equal specificity, so the applied result is **0.8 → 0.5**. The control gets *quieter* the instant the user targets it, in direct contradiction of the primitive's own declared behaviour — and it silently discards the `--surface-tint-10` hover plate that was the primitive's way of raising the affordance without touching contrast.

Same class at `SharePopover.vue:8` (`sharePopoverOpen ? 'opacity-100' : 'hover:opacity-50'`) — **that one is live** (`EditorShell.vue:20`, `MbabbMenu.vue:81`) and survives D-1's deletion.

This row also supplies D-14's corrected rest figure: the α = 0.8 baseline is *why* rest is 9.01 : 1 rather than 16.82 : 1.

**Falsifier.** A rule neutralising `hover:opacity-50` (`grep -rn "hover:opacity-50" demo/` → `EditorHeader.vue:26`, `SharePopover.vue:8` only; no `!important` opacity in `dark-mode-toggle.css` or `a11y-overrides.css`), or Tailwind emitting utilities unlayered (refuted at `tailwindcss/index.css:1`). Also dies if the fade is a deliberate house idiom — but `EditorShell.vue:46` dropped it, so the house has already ruled.

### D-24 — producer relay: `scale-on-hover` has no reduced-motion reset (INFO) *(new this revision)*

`glass-ui/dist/styles/utilities/btn.css`:

```css
@utility scale-on-hover { scale: 1; transition: scale var(--spring-smooth-duration) var(--spring-smooth); &:hover { scale: var(--scale-hover); } }
```

Under `prefers-reduced-motion: reduce`, the global override (SUP-2) forces `transition-property: opacity, color, background-color, border-color, box-shadow !important`, which strips `scale` from the transition — but `&:hover { scale: 1.08 }` **still applies, instantly**. The control snaps 8 % larger on hover with no easing. glass-ui's sibling handles this correctly (`glass/glass-capsule.css`):

```css
@media (prefers-reduced-motion: reduce) { .glass-capsule-hover:hover, … { scale: 1; } }
```

`scale-on-hover` has no such arm. Reached here at `:26` and `SharePopover.vue:7`, and at ~10 further demo sites (`KeyframesEditor.vue:83,91`, `TransportDock.vue:65,201`, `MbabbMenu.vue:30`, `CubeScene.vue:124`, `KeyframeCard.vue:23`, `KeyframesAddDialog.vue:10`, `TimelineTrack.vue:72`, `EditorShell.vue:36,46`).

This is a **producer defect surfaced through a consumer** — filed here per the standing glass-ui BH/BI relay fond (owner edict 2026-07-12: every component/glass-ui-level finding relays to the active glass-ui BH inbox). It is INFO, not MINOR, because an untransitioned instant scale is arguably outside WCAG 2.3.3's scope.

**Falsifier.** A `@media (prefers-reduced-motion: reduce)` rule targeting `.scale-on-hover` anywhere in `glass-ui/dist/styles/**` or `demo/styles/**` — I enumerated every PRM block in the glass cascade (19 files, listed by probe); none names it.

---

## 6. Superlatives (L-18 runs both ways)

**SUP-1 — the API that became the design system's.** The slot contract at `:22` / `:36` — `items` with a sensible default, `anchor` exposing `{ pinned }` — is reproduced **exactly** in glass-ui 7.0.0's published types (`HeaderRibbon.vue.d.ts`: `anchor?: (props: { pinned: boolean }) => any`, `items?`). Separating the always-visible handle from the collapsible payload, and publishing the pin state to the handle's renderer rather than styling it internally, is a genuinely good factorisation: it lets the consumer own the affordance while the container owns the state machine. This design was correct enough to be promoted into the design system verbatim.
*Falsifier (previously open, now **discharged** — §1.0): "evidence that the glass component predates this file and the influence ran the other way." Commit `3689c1ed` creates `demo/@/components/custom/header-ribbon/HeaderRibbon.vue` (155 lines, new file) in the **same commit** that removes the `<EditorHeader>` render site, with the message "Use the same HeaderRibbon component as value.js for cross-repo consistency." The demo-local ribbon is the descendant; the promotion to glass-ui is downstream of both. Corroborated by `docs/tranches/H/glass-ui-AX-handoff.md:90` and `docs/tranches/F/audit/a-demo-post-e.md:189`, which discuss `EditorHeader` as the extant local surface being handed up.*

**SUP-2 — a reduced-motion outcome that is ideal, for free.** The component has no `@media (prefers-reduced-motion: reduce)` block, which reads as a gap — and is not one. glass-ui's global override (`dist/styles/utilities/a11y-overrides.css`, **unlayered**, opening the file at byte 0) fires:

```css
*:not([data-allow-motion]) { transition-duration: 0.1s !important;
  transition-property: opacity, color, background-color, border-color, box-shadow !important; }
```

Against `:95–98` that drops `max-width` and `margin-right` from the transition entirely and caps `opacity` at 100 ms — i.e. under PRM the accordion becomes an **instant collapse with a 100 ms fade**, which is precisely the correct reduced-motion behaviour for a disclosure. The property list happens to be exactly the partition the override wants, and because the block is unlayered `!important` while the component's scoped styles carry no `!important` at all, the delegation cannot be defeated. Reconciles census §6.5, which lists 13 PRM sites without EditorHeader: **the absence is not a gap** — and the same reasoning generalises to §6.5's two named "gaps" (`TypingDots.vue:121`, `KeyframeTimeline.vue:94`), whose delegation the census marked *"unverified statically"* and which this probe verifies.
*Falsifier / the caveat that keeps this from being unqualified: the component never imports the cascade that guarantees it (`EditorShell.vue:131` imports `@styles/style.css`, `EditorHeader` imports nothing), so the delegation is implicit and unowned — glass-ui's own ribbon states it locally (`transition: none` under PRM) rather than relying on the global. One comment would close it; `KeyframeTimeline.vue:94` shows the house knows how.*

**SUP-3 — the correct overlay pointer idiom.** `:3` `pointer-events-none` on the full-bleed root with `pointer-events-auto` restored on exactly the two interactive children (`:7`, `:12`). This is right, and non-obviously so: a full-width bar over an interactive scene must not swallow gestures headed for the cube. glass-ui reaches the identical construction independently (`.header-ribbon { pointer-events: none }` + `.header-ribbon__band { pointer-events: auto }`), corroborating it as the sanctioned idiom rather than a happy accident. There is no leakage: every `pointer-events-auto` sits on a wrapper with real content.
*Falsifier: a pointer-events model in which ancestors of a hovered `auto` descendant are excluded from the hover chain — they are not. Refinement, not refutation: the side-effect this idiom has on the `mouseleave` region is load-bearing and undeclared — see D-22.*

**SUP-4 — a prior audit finding, demonstrably discharged.** `keyframes.js/docs/tranches/D/audit/frontend-findings.md:27,122` flagged *"In-component `setTimeout` debounce/hover blobs — hand-rolled"* naming `EditorHeader.vue:50,56,63`. The current source (`:56–62`) is `useTimeoutFn(fn, 2000, { immediate: false })`. Verified in the installed `@vueuse/shared@14.3.0` (`dist/index.iife.js`): the factory ends `tryOnScopeDispose(stop);` — the leak class is provably gone, not merely refactored. `{ immediate: false }` is also exactly right (the default `immediate: true` would fire a hide on mount), and `start()` calls `clear()` before re-arming, so `:65`'s explicit `clearHoverTimeout()` is belt-and-braces rather than a fix for a bug. `start`/`stop` are renamed at the call site to say what they do, and the comment records why. A closed loop, verifiable against the cited finding — and the one place in the file where prose and code agree completely.
*Falsifier: a residual raw `setTimeout`/`clearTimeout` in the file — there is none (`:42–85`); or a vueuse build without `tryOnScopeDispose` in `useTimeoutFn` — the installed source is quoted.*

---

## 7. Verdict

**DELETE the file, its barrel line (`shell/index.ts:2`), and its dead token (`layout.css:15`)** — 110 lines, zero behavioural delta. Do not remediate: D-2…D-9, D-11…D-22 are each, individually, already fixed in the primitive that is already installed and already rendering one file away (§1.2 crosswalk), and repairing them locally would re-fork the design system in violation of `feedback_glass_ui_first_class`. This is the **fourth** writing of that verdict (`U/audit/lane-18` F2 → `U/waves/U.B.md` U.B5 → the prior pass at this path → here), against a replacement that executed on **2026-03-09** (`3689c1ed`). The correct wave action is execution, not re-adjudication.

**Four rows survive deletion and need separate homes:**

1. **D-10** — `title="Toggle dark mode"` on `DarkModeToggle` also sits at the live `EditorShell.vue:45`. Remove the `title`; the component names itself, state-aware.
2. **D-20** — `aspect-square w-8` also sits at the live `EditorShell.vue:46`, where it is inert on the aspect and yields a 32 × 36 box. Use `size-8`, or drop both and take the primitive's 36 × 36.
3. **D-23 / D-5b** — `SharePopover.vue:7–8` is live: a 24 × 24 unpadded trigger carrying `hover:opacity-50`. Both halves outlive `EditorHeader`.
4. **D-3's caveat and D-24** — two **glass-ui BH relay** items under the standing relay edict, not kf-side work: `HeaderRibbon` publishes `role="toolbar"` without APG arrow-key roving; `scale-on-hover` lacks the PRM `scale: 1` reset its sibling `glass-capsule-hover` has.

**Census reconciliation** (`formation/keyframes/lane-frontend.md`):

- **§4 roster — CONTRADICTED.** The `EditorHeader.vue` row is listed as live editor chrome. It renders nowhere and ships no bytes (§0.1).
- **§5 shadow census — EXTENDED** with the missing row:
  > **S-9 · `EditorHeader` → `HeaderRibbon` — RED, 110 lines. Not "replace": the replacement already shipped (`3689c1ed`, 2026-03-09). The verdict is `rm`.** Unlike S-1 (stale rationale to re-litigate) and S-3/S-4/S-5 (semantics that may exceed the primitive), S-9 carries **zero migration risk** — no consumer to migrate, the primitive already installed *and already rendering*, the slot contract identical. It is the cheapest row in the census and the only one that does **not** depend on **F-1**: a deletion needs nothing to resolve. It should sequence *before* F-1, not after.
- **§6.3 flat token namespace — CORROBORATED** with the concrete `icon-lg` 24 px / `--icon-lg` 20 px divergence (D-19), plus a second instance: `--header-items-max-w` unprefixed where the glass counterpart is namespaced `--header-ribbon-actions-width` (D-13/D-21).
- **§6.5 PRM sites — RECONCILED.** The absence of a local block is correct delegation, not a gap; the global unlayered `!important` override is verified (SUP-2), which also discharges the census's *"unverified statically"* caveat on its two named gaps.
- **F-5 dead re-export shims — EXTENDED.** `shell/index.ts:2` is a third instance and the worst species: F-5's shims re-export *live relocated* code; this one re-exports a *superseded* implementation retained beside its replacement, which is what launders it past a dead-export gate.

**Unresolved / `UNPROVEN-NEEDS-LIVE` for SS-13:** the perceived severity of D-11's expand pop; the actual backdrop pixels behind D-6/D-14's hover state; D-20's rendered box under the demo's font/zoom; D-22's hover-chain behaviour with an occupied `#left` slot. All are marked in place. Every one of these becomes moot if the §7 verdict executes.

---

### Provenance note

Every claim above is sourced from `/Users/mkbabb/Programming/keyframes.js` (source, `.git`, `docs/tranches/`, `dist/gh-pages/`, and `node_modules/@mkbabb/glass-ui@7.0.0`, `tailwindcss@4.3.0`, `@vueuse/shared@14.3.0`) read-only. No file in keyframes.js was written, mutated, or executed; no installs, no dev server, no browser tooling. Contrast ratios are computed from the resolved token values (sRGB relative luminance, WCAG 2.x formula, sRGB-space alpha compositing) and are marked `UNPROVEN-NEEDS-LIVE` wherever the backdrop is not the flat theme field. Cascade-order claims are resolved against `@layer theme, base, components, utilities;` (`tailwindcss/index.css:1`) plus the rule that unlayered declarations outrank layered ones at equal importance.

This revision preserves the prior same-path pass's rows D-1…D-19 and SUP-1…SUP-4 in substance and numbering; it adds D-20…D-24 and §1.0, and corrects two figures in the prior text (flagged **[CORRECTED]** at D-5b and D-14). No prior finding was deleted or downgraded — each was independently re-derived and reproduced.

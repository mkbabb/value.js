claude-opus-5[1m]

# CHALLENGE · `PaperSearchDropdown.vue` · axis **D — DESIGN**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/search/PaperSearchDropdown.vue` (70 lines)
**Mode** static + source-derived, read-only. No browser tooling. Livable-only claims carry `UNPROVEN-NEEDS-LIVE` for SS-13.
**Pin** `@mkbabb/glass-ui ^4.0.0` / installed `4.0.0`; producer latest `7.0.0`.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim carries severity · `file:line` · falsifier. Superlatives carry the same burden (L-18 runs both ways). Four of my own claims died to their own falsifiers and are recorded in §F.

**Tally** — 21 defects (**3 BLOCKER** · 8 MAJOR · 6 MINOR · 4 INFO) · 5 superlatives.

---

## §0 · The read

The component is 70 lines of template with **zero lines of style**. Its entire visual identity — position, elevation, scroll, row geometry, badge pills, truncation, selection highlight, enter/leave motion — is declared 355 lines away in `PaperSearch.vue:41-397`, inside a `<style scoped>` block whose elements no longer exist in `PaperSearch.vue`'s template.

That is not a stylistic observation. It is the finding. Everything else in this challenge is downstream of it, and roughly half the defects below are **latent** — unreachable in today's build because the rules that carry them never match, and armed the instant B-1 is cured. I flag latency explicitly on every such row, because a repair wave that fixes B-1 alone will ship four fresh regressions on the same day.

The file's *logic* is, by contrast, unusually careful. See §S.

---

## §B · BLOCKERS

### B-1 · The scoped block is orphaned from its elements. Every rule that styles this component is dead CSS.

**Severity** BLOCKER · **Provenance** `PaperSearch.vue:41-397` (the `<style scoped>` block) vs `PaperSearchDropdown.vue:36-67` (the elements)

Vue compiles `<style scoped>` selectors to `<selector>[data-v-<parent-hash>]`, and applies `data-v-<parent-hash>` to (a) elements in the component's **own** template and (b) the **single root element** of a child component. It is never applied to a child's inner elements. `PaperSearch.vue`'s template is 18 lines (`:22-39`) and contains exactly one styled element — `.paper-search`. Everything else the block styles lives inside `PaperSearchInput.vue`, `PaperSearchDropdown.vue`, `PaperSearchModal.vue` — **none of which declares a `<style>` block of its own**, so none carries a scope id to inherit through.

Compiled proof (`@vue/compiler-sfc.compileStyle` over the real block, `id: data-v-TEST`):

```
.paper-search[data-v-TEST]            { position: relative }          ← MATCHES (own template)
.paper-search-input-wrap[data-v-TEST] { … }                           ← MATCHES (Input's single root)
.paper-search-icon[data-v-TEST]       { width: .8rem; height: .8rem } ← DEAD (inside Input)
.paper-search-input[data-v-TEST]      { font-size: .78rem; … }        ← DEAD (inside Input)
.paper-search-results[data-v-TEST]    { position: absolute; z-index: var(--z-bar); max-height: 50vh; overflow-y: auto; … }  ← DEAD
.paper-search-result[data-v-TEST]     { display: flex; width: 100%; text-align: left; … }                                   ← DEAD
.paper-search-badge[data-v-TEST]      { … }  ← DEAD    .paper-search-number[data-v-TEST]  { … }  ← DEAD
.paper-search-label[data-v-TEST]      { … }  ← DEAD    .paper-search-backdrop[data-v-TEST] { … }  ← DEAD
.search-dropdown-enter-active[data-v-TEST] { … }       ← DEAD (the Transition never animates)
```

Runtime mechanism, verified in the installed engine: `@vue/runtime-core/dist/runtime-core.cjs.js:5676-5701` — `setScopeId` walks to the parent scope **only** when `vnode === parentComponent.subTree`. The result rows are `<Button>` roots inside `PaperSearchDropdown`; the walk reaches the `<Button>` vnode, finds `scopeId === undefined` (PaperSearchDropdown has no scoped style, so `@vitejs/plugin-vue` injects no `__scopeId`), tests `<Button> vnode === PaperSearchDropdown.subTree` — false, the subTree is a two-root Fragment — and stops. No `data-v-PaperSearch` is ever written to a result row, under any build mode.

**Provenance of the break — exact commit.** `6bbb291` (2026-03-14, *"add paper search with fuzzy index"*) created `PaperSearch.vue` as a **631-line monolith**: one `<template>` at `:123-273` carrying `.paper-search-results` (`:162`), both `.paper-search-badge` sites (`:172`, `:240`) and `.search-modal` (`:201`), with the `<style scoped>` block at `:275`. Every rule matched. `ffba307` (2026-05-26, *"A.W1.a.1 — land web migration cohort"*) split the template into the three child SFCs, shrinking `PaperSearch.vue` to **395 lines** (template `:22-39`, style `:41-395`) — **the markup moved out and the stylesheet stayed.** That commit's message enumerates twenty shadow-copy retirements and four module-folds; the scope-id consequence of the template extraction is not mentioned anywhere in it.

**What actually renders today.** With the scoped rules dead, the dropdown falls through to glass-ui's global layer and Tailwind Preflight:

| Element | Intended | Actual |
|---|---|---|
| `.paper-search-results` (`:39`) | `position:absolute; top:calc(100% + 4px); z-index:30; max-height:50vh; overflow-y:auto; border; radius; shadow; padding:.25rem` | a **static, in-flow, unbounded** `<div>` carrying only `glass-floating`. It does not overlay — it **pushes the sidebar TOC down** by up to 30 rows and cannot scroll or clip. |
| `.paper-search-result` (`:44`) | `display:flex; width:100%; align-items:baseline; text-align:left; padding:.35rem .5rem; radius` | glass-ui `Button` base + `btn-pill` (`glass-ui/dist/styles/glass/surfaces.css:119-136`): `inline-flex items-center **justify-center**`, `border-radius: var(--radius-pill)`, `padding: .5rem 1rem`, plus `whitespace-nowrap` from the CVA base (`dist/button-BNDWhAZb.js`). Rows render as **centre-aligned, fully-rounded, content-width pills**, not list rows. |
| `.is-selected` (`:46`) | `background: color-mix(--muted 50%, transparent)` | **nothing.** The ghost variant's `hover:bg-foreground/8` still fires, so the mouse works and **the keyboard has no visual selection at all** — `ArrowDown` moves an invisible cursor. |
| `.paper-search-label` (`:57`) | `flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap` | no truncation; combined with `whitespace-nowrap` on the pill, each row is as wide as its full 120-char label (`searchHelpers.ts:26-27`) and **overflows the 220px sidebar column**. |
| `.paper-search-badge` (`:50`) | 0.6rem uppercase pill, per-type background/colour | an unstyled inline `<span>` inheriting the Button's `text-foreground/70`. The whole `data-type` colour system (`PaperSearch.vue:150-166`) is inert. |
| `.paper-search-icon` (`PaperSearchInput.vue:36`) | `0.8rem` | lucide's default `width: 24, height: 24` (`lucide-vue-next/dist/esm/defaultAttributes.js:8-11`) — a **24 px** icon in a `padding: .3rem .5rem` pill. |
| `.search-dropdown-*` (`:37`) | 150 ms opacity + translateY | no transition. The panel pops. |

**Falsifiers, all discharged.** (i) *A global stylesheet defines these classes* — `grep -rn "paper-search-badge" web/src` returns only `PaperSearch.vue`'s scoped block and the two child templates; `grep -rn "paper-search\|search-modal\|search-dropdown" glass-ui/dist/styles/` → empty. (ii) *Vue applies the parent scope to fragment roots* — `runtime-core.cjs.js:5687-5688` attempts `filterSingleRoot` only under patchFlag `2048` (`DEV_ROOT_FRAGMENT`, dev-only), and here two element roots coexist whenever the floating backdrop renders, so even in dev it returns undefined. Deep descendants like the result rows are excluded in **every** case. (iii) *E2E would have caught it* — `web/e2e/` has 8 specs; `grep -rn "search" e2e/` hits only `gallery.spec.ts:4,19,43` (the gallery `GlassDock` search). **Paper search has zero e2e coverage.**

**Blast radius.** The same orphaned block owns `PaperSearchInput.vue`'s icon/input/action-button styling and **all 100 lines of `.search-modal-*`** (`PaperSearch.vue:238-396`). `PaperSearchModal.vue:41` teleports to `body`; with `.search-modal-overlay`'s `position:fixed; inset:0; z-index:var(--z-modal)` dead, the "modal" renders as an unstyled in-flow block appended to the end of `<body>`. Out of my axis-scope to adjudicate, but it is the same defect and the same cure.

---

### B-2 · The dismiss backdrop out-paints the dropdown it protects — equal `z-index`, later in tree order. `[LATENT — fires on B-1 cure]`

**Severity** BLOCKER · **Provenance** `PaperSearch.vue:108` (`.paper-search-results { z-index: var(--z-bar) }`) vs `PaperSearch.vue:195` (`.paper-search-backdrop { position: fixed; inset: 0; z-index: var(--z-bar) }`); DOM order `PaperSearchDropdown.vue:37-61` then `:62-67`

`--z-bar: 30` (`glass-ui/dist/styles/tokens/scheme-motion.css:337`). Both elements are positioned, both resolve to `z-index: 30`, both are siblings under `.paper-search` (`position: relative`, **no** `z-index` → not a stacking context). CSS 2.1 Appendix E step 9: positioned descendants sharing a z-index paint in **tree order**. The backdrop is emitted second, so it paints on top of the results and, at `inset: 0`, absorbs every pointer event over them.

Consequence in the `floating` variant (mobile — `MobileFloatingToc.vue:111`, the only floating consumer): tapping a result hits the backdrop's `@click="search.close()"` instead of `search.selectResult(r)`. **The mobile inline dropdown is un-selectable by touch**, and `@mouseenter` (`:48`) never fires either. Keyboard `Enter` still works because it is bound on the input.

**The correct idiom exists 100 lines away in the same feature.** `MobileFloatingToc.vue:294-312` — `.floating-toc-dropdown { z-index: 2 }` / `.floating-toc-backdrop { z-index: 1 }`. Same author, same wave, same pattern, strictly ordered. `PaperSearch.vue` reached for a shared token on both and produced a tie.

**Falsifier** — *the backdrop is `pointer-events: none`, or an ancestor lifts the results into their own stacking context.* Checked: `PaperSearch.vue:192-196` is the whole rule (four declarations, no `pointer-events`); `.paper-search` (`:43-45`) sets `position: relative` with no `z-index`, `opacity`, `filter`, `transform` or `will-change`; `glass-floating` contributes no `z-index` (`glass-ui/dist/styles/glass/ladder.css:83-101`) and its `position: relative` is overridden by the unlayered scoped `position: absolute`. The tie stands.

**Latency note** — with B-1 live neither rule matches, so today the backdrop is also static/in-flow and harmless. The moment the styles are re-homed, this is a P0 mobile break. Repair B-1 and B-2 in the same edit.

---

### B-3 · WCAG 1.4.3 AA failures manufactured by alpha-diluting an AA-calibrated token. `[LATENT — fires on B-1 cure]`

**Severity** BLOCKER · **Provenance** `PaperSearch.vue:146` · `:171` · `:81` · `:66` · `:91` · `:293` · `:324` · `:338`

The component's colour idiom is `color-mix(in srgb, var(--muted-foreground) N%, transparent)` — taking a token the design system has already tuned to the AA floor and thinning it with transparency. Computed against the shipped tokens (`glass-ui/dist/styles/tokens/color-radius.css:40-45,57-58,84-86` light arm; `tokens/dark-arm.css:42-47,60` dark arm), sRGB relative-luminance ratios:

| Rule | Declared | Light | Dark | AA (4.5:1, non-large) |
|---|---|---:|---:|---|
| `.paper-search-badge` `:146` | `--muted-foreground` @ 70% over `--muted` | **2.78:1** | **3.93:1** | ✗ ✗ |
| `.paper-search-number` `:171` | `--muted-foreground` @ 60% | **2.39:1** | **3.24:1** | ✗ ✗ |
| `.paper-search-input::placeholder` `:81` | @ 45% | **1.88:1** | **2.39:1** | ✗ ✗ |
| `.paper-search-action-btn` idle `:91` | @ 45% | **1.88:1** | **2.39:1** | ✗ ✗ (also < 3:1 non-text, 1.4.11) |
| `.paper-search-icon` `:66` | @ 50% | **2.04:1** | **2.69:1** | ✗ ✗ (1.4.11) |
| `.search-modal-empty` `:324` | @ 50% | **2.04:1** | **2.69:1** | ✗ ✗ |
| `.search-modal-hint` `:338` | @ 45% | **1.88:1** | **2.39:1** | ✗ ✗ |
| `.paper-search-label` `:178` | `--foreground` @ 85% over `--card` | 10.59:1 | 10.20:1 | ✓ ✓ |

The badge is the worst case in kind as well as in number: 0.6 rem — **9.6 px** at the ≥768 px root (`style.css:45-50` sets `html { font-size: 1rem }` there) — uppercase, `letter-spacing: .04em`, `font-weight: 700`, at 2.78:1. Nothing about it qualifies as WCAG "large text".

**The system already refuses this move, in writing.** `glass-ui/dist/styles/tokens/color-radius.css:86-90` ships `--muted-foreground-strong` with the comment: *"one rung less-faint than `--muted-foreground` for secondary text that reads too-faint at the muted rung over resting glass. **By-colour neutral step, not alpha.**"* And `--muted-foreground` itself is annotated AA-clean at source (`:45` — *"WCAG AA: 5.21:1 vs page / 4.90:1 vs muted"*; dark arm `:47` — *"7.64:1 vs page"*). The token is fine. **Eight local `color-mix(…, transparent)` calls destroy it.** The canonical seat is the `--neutral-*` ladder, not an alpha.

**Falsifier** — *`glass-floating`'s backdrop-filter or a forced-colors arm lifts the effective contrast.* No: `backdrop-filter` blurs what is *behind* the panel and cannot raise a foreground/background ratio computed within it; the panel background here is the `--muted`/`--card` family in both arms. `@media (forced-colors: active)` (`utilities/a11y-overrides.css:78+`) restores focus outlines only, not text colour. Both arms fail.

**Latency note** — today the badge and number inherit the Button's `text-foreground/70` (AA-passing), so the failure is not shipped. It is *authored*, and it lands the moment B-1 is cured. This is precisely why B-1 must not be repaired mechanically.

---

## §M · MAJOR

### M-1 · No combobox/listbox semantics anywhere in the search family.

**Severity** MAJOR · **Provenance** `PaperSearchDropdown.vue:37-61`; `PaperSearchInput.vue:37-46`; `usePaperSearch.ts:63-92`

`usePaperSearch` implements a full combobox interaction — `ArrowDown`/`ArrowUp` moving `selectedIndex`, `Enter` committing, `Escape` dismissing (`:65-90`) — and the markup exposes none of it. The panel has no `role="listbox"`; the rows have no `role="option"` and no `aria-selected`; the input (`PaperSearchInput.vue:38-46`) has no `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-autocomplete`, or `aria-haspopup`; the result count is announced by no `aria-live` region. A screen-reader user typing into this field is told nothing appeared and nothing is selected.

Compounding it: every row is a real `<button>` (`Button` renders `as: "button"`, `dist/button-BNDWhAZb.js`), so up to **30** results (`usePaperSearch.ts:36`, `maxResults = 30`) become 30 sequential tab stops between the search field and the rest of the sidebar — and `Tab` moves DOM focus without moving `selectedIndex`, so the visual cursor and the focus ring desynchronise immediately. The correct shape is a single-tab-stop listbox with `aria-activedescendant`.

**Falsifier** — *glass-ui's `Button` or `Primitive` injects listbox roles.* It does not: the rendered attribute set is `data-slot="button" data-variant data-size type disabled` (`dist/button-BNDWhAZb.js`, `Primitive` from reka-ui), no `role`. **The same author demonstrably knows this axis** — `EasingPicker.vue:9-15` carries `role="menuitemradio"` + `aria-checked` with a written rationale ("`aria-pressed` would mislabel a radio as a toggle"), per `lane-frontend.md §8`. The omission here is local, not systemic.

### M-2 · The sidebar dropdown is a positioned descendant of a scroll container. `[LATENT — fires on B-1 cure]`

**Severity** MAJOR · **Provenance** `PaperSidebar.vue:50-51` (`<nav class="sidebar-nav">` wrapping `<PaperSearch variant="sidebar">`) · `PaperSidebar.vue:151-166` · `PaperSearch.vue:103-116`

`.sidebar-nav` is `overflow-y: auto` with `max-height: calc(var(--paper-scroll-viewport-height, 100dvh) - 1rem - 1.5rem)`, `border-radius: .75rem`, `scrollbar-gutter: stable`. `.paper-search-results` is `position: absolute` with `max-height: 50vh` inside it. Overflow clipping applies to all descendants whose containing block is inside the clipper — and `.paper-search` is. So the panel is (a) **clipped, with a rounded corner, at the nav's edge**, (b) **added to the nav's scrollable overflow**, so opening it lengthens the sidebar scrollbar and the panel can be scrolled out from under its own input, and (c) unable to honour `50vh` whenever the nav is shorter than that.

An overlay anchored inside a scrollport is the canonical case for a portal/anchor-positioned surface. glass-ui ships exactly that (`popover-content` + the floating-tier recipe, `utilities/base.css:129-139`); this component reached for `position: absolute` instead.

**Falsifier** — *`.sidebar-nav` is `overflow: visible` at the breakpoint where the sidebar shows.* No: `PaperSidebar.vue:151-166` is unconditional; the `@media (min-width: 1024px)` block above it (`:138-149`) only toggles `display` and `position: sticky` on `.paper-sidebar`, never the nav's overflow.

### M-3 · The `sidebar` variant has no outside-dismiss at all.

**Severity** MAJOR · **Provenance** `PaperSearchDropdown.vue:62-67` (`v-if="variant === 'floating' && …"`)

The click-catching backdrop is gated to the floating variant. In the sidebar variant nothing closes the dropdown on outside interaction: there is no `@blur` on the input (`PaperSearchInput.vue:38-46` binds `@input`, `@keydown`, `@focus` only), no click-outside listener anywhere in the family (`grep -rn "onClickOutside\|click-outside\|document.addEventListener" PaperSidebar.vue PaperView.vue MobileFloatingToc.vue PaperSearch.vue` → empty), and `usePaperSearch` registers no global handler (`usePaperSearch.ts:14-106` — no `window`/`document` access). The panel stays open, occupying the TOC, until the user finds `Escape` or selects a row. The two variants therefore have **materially different dismissal contracts** from one prop, undocumented.

**Falsifier** — *`@vueuse/core`'s `onClickOutside` is applied by an ancestor.* `@vueuse/core ^14.3.0` is a dependency, but no call site exists in the paper tree.

### M-4 · The label box is ~14 characters wide. The fuzzy-highlight machinery is invisible in the sidebar. `[LATENT — fires on B-1 cure]`

**Severity** MAJOR · **Provenance** `PaperView.vue:562` (`grid-template-columns: 220px minmax(0, 48rem)`) · `PaperSidebar.vue:161-163` · `PaperSearch.vue:103-116,118-130,174-183` · `searchHelpers.ts:24-28`

Arithmetic from the tree, desktop (root `1rem` = 16 px):

```
sidebar grid column                             220 px
  − .sidebar-nav border 2px×2 + padding .625rem×2 + scrollbar-gutter ≈ −39 px
  − .paper-search-results border 1.5px×2 + padding .25rem×2               ≈ −11 px
  − .paper-search-result padding .5rem×2                                  ≈ −16 px
  − badge (≈30 px) + gap .375rem + number (≈20 px) + gap .375rem          ≈ −62 px
  ────────────────────────────────────────────────────────────────────────────────
  .paper-search-label available                                           ≈  92 px
```

At `@apply text-sm` (14 px, `PaperSearch.vue:177`), 92 px is roughly **13–15 characters**, and the rule is `white-space: nowrap; text-overflow: ellipsis` (`:179-181`). Meanwhile `resultLabel` supplies up to **120** characters (`searchHelpers.ts:26-27`) and `highlightFuzzy` carefully wraps matched runs anywhere in that string (`:56-67`). For every match beyond roughly the fourteenth character — which, for section titles and theorem names, is most of them — **the `<mark>` is clipped out of the viewport.** The component computes a highlight the user cannot see.

Three columns in 92 px of prose is also a plain proportion failure: the badge (a 4-letter uppercase pill) and the number consume ~40 % of the row's inline space to identify a result the label is not given room to name. The modal variant proves the design breathes at width (`PaperSearch.vue:253`, `min(36rem, 100dvw − 2rem)`); the sidebar variant needs the badge demoted (colour-coded rail, or a leading glyph) or the label given two lines.

**Falsifier** — *the sidebar is wider than 220 px at some breakpoint.* `PaperView.vue:555` is `grid-template-columns: 1fr` (no sidebar) and `:562` is the only two-column rule; 220 px is a fixed track, not a `minmax`.

### M-5 · The highlight is computed from the live query while the rows come from the debounced one — marks blink out on every keystroke.

**Severity** MAJOR · **Provenance** `PaperSearchDropdown.vue:59` (`highlightFuzzy(resultLabel(r), search.query.value)`) vs `usePaperSearch.ts:35-37` (`results = computed(() => searchIndex(index, debouncedQuery.value, 30))`)

`results` is scored against `debouncedQuery`; the highlight is re-rendered against `query`, which updates synchronously on input (`PaperSearchInput.vue:43`) and leads the debounce by 120 ms (`usePaperSearch.ts:28-33`). For that window the two disagree. `highlightFuzzy` requires every character of every token to fuzzy-match the *display label* (`searchHelpers.ts:42-49`) and returns bare escaped text when it cannot (`:49`). So typing one more character into a query whose rows still reflect the previous one causes any row whose label does not carry the new character to **drop all of its highlighting**, then regain it 120 ms later when the rows catch up. On sustained typing this is a per-keystroke flicker across the whole list — the most visually expensive failure mode a text-highlight surface has, and it is a one-word fix (`search.debouncedQuery`, which the composable does not currently return: `usePaperSearch.ts:94-105`).

**Falsifier** — *`highlightFuzzy` degrades gracefully rather than dropping marks.* `searchHelpers.ts:49` — `if (matchSet.size === 0) return escapeHtml(text)` — it drops them wholesale, not partially. Amplitude (how many rows flicker per keystroke) is corpus-dependent: `UNPROVEN-NEEDS-LIVE` for the rate; the mechanism is not.

### M-6 · Untokenized, dark-blind decoration that also overrides the glass tier it opted into.

**Severity** MAJOR · **Provenance** `PaperSearch.vue:112-114` · `:158-166` · `:185-190` · `:260-262` vs `PaperSearchDropdown.vue:40` (`class="paper-search-results glass-floating"`)

Two coupled problems.

**(a) The scoped block cancels `glass-floating`'s two signature properties.** `glass-floating` (`glass-ui/dist/styles/glass/ladder.css:83-101`) contributes `background`, `backdrop-filter`, `border: 1px solid var(--glass-border-floating)`, and a three-part `box-shadow` (`--glass-material-rim`, `--glass-under-shadow-vivid`, `--glass-shadow-floating`). That rule sits in `@layer components` (`ladder.css:6`); Vue's scoped CSS is **unlayered**, and unlayered always beats layered regardless of specificity. So `PaperSearch.vue:112` (`border: 1.5px solid var(--border)`) and `:114` (`box-shadow: 0 4px 16px rgba(0,0,0,.1)`) win outright, replacing the tokenized rim, catch-light and lift with a flat black drop. `rgba(0,0,0,.1)` has **no dark arm**; on the dark `--background` (`hsl(24 9% 4%)`) it is invisible, so in dark mode the panel loses its separation from the page entirely while still paying the `backdrop-filter` cost. Same pattern at `:260-262` for the modal.

**(b) Raw HSL literals where tokens exist, with no dark arm.** `:158-166` hardcodes `hsl(210 80% 55% / .12)` / `hsl(210 80% 45%)` for `definition` and `hsl(280 60% 55% / .12)` / `hsl(280 60% 45%)` for `equation`. Computed on the dark arm these are **3.05:1** and **2.28:1** — both AA failures, the equation badge severely. The `--primary`-based theorem/lemma/proposition/corollary badge (`:150-156`) collapses to **1.03:1** in dark mode, because dark `--primary` is not a foreground colour. `:186`'s `<mark>` background `hsl(50 100% 60% / .35)` is likewise unarmed; over the light `--card` it yields **1.10:1** of luminance separation, so the highlight — the component's whole reason to exist — distinguishes by hue alone in light mode and by a 2.69:1 wash in dark. The tree already knows the right seat: `style.css:113-127` carries a `--viz-amber` light/dark pair with a WCAG rationale, and `--section-color-N` is the shipped family.

**Falsifier** — *the literals are inside a `.dark` block I missed.* `PaperSearch.vue:150-190` and `:238-396` contain no `.dark` selector; `grep -n "\.dark" PaperSearch.vue` → empty. Only `style.css:123` carries a `.dark` arm, and it governs `--viz-amber`/`--section-color-5`, not these.

### M-7 · The glass tier and the scrollport are the same element, so the specular gleam scrolls away. `[LATENT — fires on B-1 cure]`

**Severity** MAJOR · **Provenance** `PaperSearchDropdown.vue:40` · `PaperSearch.vue:110-111` (`overflow-y: auto; overscroll-behavior: contain`) · `glass-ui/dist/styles/glass/material.css:66-90`

`glass-floating` paints its catch-light through `::before { position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 1 }` and its grain/rim through the companion `::after`. Absolutely positioned children of a scroll container are laid out against its padding box and **scroll with the content**. Once the result list exceeds `max-height: 50vh` and the user scrolls, the gleam and the inset rim translate out of the visible scrollport, leaving the lower portion of the panel bare while the top shows a rim floating mid-list. The glass tier belongs on an outer chassis with an inner `overflow-y: auto` child — the shape glass-ui itself uses (`FadingScroll` / `popover-content`).

**Falsifier** — *the pseudo-elements are `position: fixed` or the tier sets `contain`.* `material.css:69-90` is explicitly `position: absolute; inset: 0`; `ladder.css:83-101` sets no `contain`. (Visual magnitude at a given scroll offset: `UNPROVEN-NEEDS-LIVE`.)

### M-8 · The inline dropdown has no empty state; the modal does. No loading or error state exists at all.

**Severity** MAJOR · **Provenance** `PaperSearchDropdown.vue:39` (`v-if="… && search.results.value.length > 0"`) vs `PaperSearchModal.vue:104-106` (`<div v-else class="search-modal-empty">No results</div>`)

Two surfaces over one state machine, with divergent state coverage. Type a query that matches nothing in the sidebar and **the panel simply never appears** — indistinguishable from a broken field, a dropped keystroke, or a still-debouncing query. The modal, 40 lines away in a sibling file, renders the affordance the dropdown withholds. Worse, the `canExpand` gate that offers the modal is itself `!!search.query.value && search.results.value.length > 0` (`PaperSearch.vue:28`) — so on an empty result set the user cannot reach the surface that would have told them why.

Neither surface has a loading state (defensible: `searchIndex` is synchronous, `usePaperSearch.ts:35-37`) or an error state (`buildSearchIndex` at `:18` runs unguarded at composable construction over `PaperSectionData[]`; a malformed section throws into the parent's setup with no boundary). The 120 ms debounce plus a 30-row re-render is the one window where a user could perceive latency, and it is unnarrated.

**Falsifier** — *the parent renders an empty state around the dropdown.* `PaperSearch.vue:22-38` is three child components and nothing else.

---

## §N · MINOR

### N-1 · The result row exists twice, verbatim, and has already drifted.

MINOR · `PaperSearchDropdown.vue:41-61` ≡ `PaperSearchModal.vue:83-102` — identical badge/number/label structure, identical `@click`/`@mouseenter`, identical `highlightFuzzy` call; the only differences are the `:key` prefix and one extra class. Drift is already booked: `PaperSearch.vue:308-319` exists solely to re-tune the copy's badge, number and label sizes. Two components, three override rules, one row. `lane-frontend.md §4 🟡` books the whole family against producer `./search`; this is the intra-family half of the same debt.

### N-2 · Two declared public contracts are never honoured.

MINOR · `PaperSearchDropdown.vue:16-18` declares `defineEmits<{ select: [id: string] }>()` and the component **never emits it** — selection goes straight through `search.selectResult(r)` (`:47`), and the parent binds no `@select` (`PaperSearch.vue:31-34`). `:32` `defineExpose({ resultsRef })` is likewise consumed by nobody (`PaperSearch.vue:13` refs only the input). A consumer reading the type signature would wire `@select` and get silence. Identical dead emit in `PaperSearchModal.vue:12-14`.

### N-3 · Hover writes the keyboard cursor, and the keyboard scrolls the list under the hover.

MINOR · `PaperSearchDropdown.vue:48` (`@mouseenter="search.selectedIndex.value = i"`) + `:20-29` (the `scrollIntoView` watcher). Arrowing through results scrolls the panel; if the pointer is resting anywhere over the list, the new row arriving under it re-fires `mouseenter` and reassigns `selectedIndex`, fighting the arrow key. The child also mutates a prop's inner ref directly rather than going through the composable's API (`usePaperSearch.ts:94-105` exposes `selectResult`/`close`/`open`/`toggleExpanded`/`onKeydown` but no `selectIndex`) — the same bypass appears at `PaperSearchModal.vue:90`. Whether the watcher and the hover reach a sustained loop is browser-dependent: `UNPROVEN-NEEDS-LIVE`. The one-line prophylactic is the standard "ignore pointer events until the pointer actually moves" latch.

### N-4 · Nine type sizes and an ad-hoc decimal scale across one dropdown.

MINOR · `PaperSearch.vue` mixes Tailwind's ratio scale with raw decimals in the same block: `@apply text-sm` (`:177`), `@apply text-base` (`:212`, `:287`, `:318`, `:325`), and then `0.78rem` (`:75`), `0.72rem` (`:314`), `0.68rem` (`:170`), `0.65rem` (`:309`), `0.6rem` (`:139`, `:354`), plus icons at `0.8rem` (`:63-64`) and `1rem` (`:275-276`). Nine distinct sizes for a badge, a number, a label and a hint — none on a shared ratio, several separated by less than 0.04 rem (0.68 vs 0.65; 0.72 vs 0.78), i.e. differences below the threshold of perception that still cost a cascade rule each. Aristotelian proportion asks for a mean between excess and deficiency; this is neither, it is enumeration. glass-ui ships the register (`--control-text`, `--type-small`) that `btn-pill` itself reads (`glass/surfaces.css:136`).

### N-5 · `vh` inside a `dvh` codebase, on panels that live inside clipping ancestors.

MINOR · `PaperSearch.vue:109` (`max-height: 50vh`), `:220` (`60vh`), `:254` (`70vh`) — while the same stylesheet uses `100dvw` at `:253` and the app sets `min-height: 100dvh` (`style.css:21`) and `--paper-scroll-viewport-height, 100dvh` (`PaperSidebar.vue:145`). On mobile browsers with retracting toolbars `vh` overshoots the visual viewport, and the floating variant — the mobile one — uses the largest of the three (`60vh`). Mixed unit idiom in a single block, with the wrong member of the pair chosen for the mobile surface. (Compounded by M-2: in the sidebar the `50vh` is unreachable anyway.)

### N-6 · The highlight index model is UTF-16-naive and merges tokens without disambiguation.

MINOR · `searchHelpers.ts:34-70`. `fuzzyMatch` indexes by UTF-16 code unit over `text.toLowerCase()` (`paperSearchIndex.ts:84-119`), while the renderer walks `[...text]` — a **code-point** array (`searchHelpers.ts:52`). For any label containing an astral character the two index spaces diverge and the `<mark>` lands on the wrong glyphs; `toLowerCase()` can also change string length (e.g. `İ` → two code points), shifting every subsequent index. Labels are LaTeX-derived (`resultLabel` falls back to `rawTex`, `searchHelpers.ts:26`) and figure captions are HTML-stripped prose (`paperSearchIndex.ts:328`), so non-ASCII is plausible but not proven for *this* corpus: `UNPROVEN-NEEDS-LIVE` for occurrence, statically certain for the mechanism. Separately, `:42-47` merges every token's matches into one `matchSet` with each token scanning from index 0, so a two-token query highlights each token's *first* subsequence independently rather than the disjoint match the scorer actually used — visually scattered marks that do not correspond to why the row ranked.

---

## §I · INFO

### I-1 · The Transition name forfeits a shipped, PRM-carved canonical animation.

INFO · `PaperSearchDropdown.vue:37` names the transition `search-dropdown`, so it depends on `PaperSearch.vue:225-236` — which is scoped, hence dead (B-1). glass-ui ships **`dropdown`** as a global, unscoped transition (`dist/styles/transitions.css:83-97`: `opacity var(--duration-instant) var(--ease-out)` + `transform var(--spring-snappy-duration) var(--spring-snappy)`, from `scale(.96) translateY(4px)`) **with its own reduced-motion carve** at `:231-256`. Renaming the Vue transition to `name="dropdown"` would restore motion, tokenize the easing, and inherit the PRM handling — deleting 12 lines of scoped CSS. The local rule is not even a divergent design: it is a slower, less token-aware version of the same gesture.

### I-2 · Uplift break surface for this component — the census's five named rows all miss it; one unnamed row hits it hard.

INFO · Reconciling against `CENSUS-2026-08-03.md:102-104` and `lane-frontend.md §5`.

**Clean on the named surface.** This component imports exactly one producer symbol — `Button` from `@mkbabb/glass-ui/button` (`:3`). It touches none of `metric-badge` (×7 files), `hover-card` (×2), `hover-popover` (×2), `DockIconButton` (×2), `DockDropdownTrigger` (×1), or `ToastVariant`. It imports no lucide icons, so the `lucide-vue-next → @lucide/vue` rename (35 sites) does not reach it — though its sibling `PaperSearchInput.vue:4` carries four.

**Surviving across 4→7, verified against the producer tree:** `./button` subpath ✓ (`glass-ui/package.json` exports); `.glass-floating` ✓ (`src/styles/glass/ladder.css`); `--z-bar: 30` ✓ (`4.0.0 tokens/scheme-motion.css:337` → `7.0.0 tokens/scheme-motion.css:216`); `--ease-standard` / `--ease-out-expo` ✓ (`7.0.0 tokens/scheme-spring.css:158,161`).

**Breaking, and not in the census.** `glass-ui@7.0.0`'s `Button` **has no `variant` prop**. `src/components/button/index.ts` exports `Button`, `ButtonProps`, `ButtonEmphasis`, `ButtonSize`; `Button.vue:15-23` declares `emphasis?: "primary"|"secondary"|"quiet"|"text"`, `tone?: Tone`, `size?: Extract<Size,"xs"|"sm"|"md"|"lg">`. `buttonVariants` is no longer exported at all. So:

- `PaperSearchDropdown.vue:44` `variant="ghost"` → **hard typecheck break**, 1 site in this file.
- Tree-wide occurrence counts (`web/src`, measured): 35 files import `glass-ui/button`; **99 `<Button` tags**; `variant="ghost"` **×49**, `variant="outline"` **×30**, `variant="glass"` **×12**, `destructive` ×4, `default` ×4, `secondary` ×1, `link` ×1; `size="icon"` **×38** — and `icon` is absent from `ButtonSize`. `buttonVariants` is imported 0 times, so its removal is free.

This is not in `lane-frontend.md §5`'s "Rows that hit fourier-analysis TODAY" table, and `ToastVariant` (1 site) is currently the census's only named hard typecheck break. **The `Button` `variant`/`size` rename is one to two orders of magnitude larger** and belongs in the F.W1 budget. (Exact per-tag attribution of the 101 `variant=` occurrences — some belong to `Slider variant="standard"` ×14 and `SegmentedTabs variant="underline"` ×3 — is a mechanical count F.W1 should take; the ≥49 `ghost` + 38 `size="icon"` floor is Button-certain.)

**The convergence prize, sharpened.** `lane-frontend.md §4 🟡` books this family against producer `./search`. Confirmed and tightened: `glass-ui/src/components/search/index.ts` exports `SearchBar` with `variant: "inline" | "bare" | "floating"` (`searchVariants.ts`) — the *same two-variant chrome axis* this component hand-rolls as `"sidebar" | "floating"` — plus `useFuzzySearch`, and `fuzzySearchIndex` exporting **`buildIndex`, `searchIndex`, `fuzzyMatch`, `clearSearchCache`**. Three of those four names are byte-identical to the local fork (`paperSearchIndex.ts:70`, `:198`, `:397`). The fourth, `clearSearchCache`, is the API the fork *lacks*: `paperSearchIndex.ts:196` holds a module-level `let _cache = new Map()` shared across every instance and route, pruned only when it exceeds 200 entries (`:214`) or the query empties (`:206`), each entry retaining up to 30 spread copies of `SearchEntry` including a 500-char `plainText` and its duplicated `_lc` fields. Lifetime/leak adjudication belongs to the L/C lanes; I book the pointer here because the producer already solved it.

### I-3 · Baseline alignment across a 1.0 and a 1.4 line-height.

INFO · `PaperSearch.vue:120` sets `align-items: baseline` on a row whose badge is `line-height: 1` inside `padding: .1rem .3rem` (`:143,:147`) and whose label is `line-height: 1.4` (`:182`). Baseline-aligning a filled pill against body text puts the pill's text baseline on the row baseline, so the pill's box sits high relative to the label's optical centre — the classic badge-floats-up artifact. `baseline` is right for the number/label pair and wrong for the pill; `align-items: center` with the number given its own baseline, or a `flex-start` row with the badge vertically centred, is the usual resolution. Magnitude: `UNPROVEN-NEEDS-LIVE`.

### I-4 · `variant` is a two-valued string that controls one boolean.

INFO · `PaperSearchDropdown.vue:9` types `variant: "sidebar" | "floating"`, and the component reads it in exactly one place — the backdrop's `v-if` (`:64`). The panel's own variant-dependent chrome lives in the parent's stylesheet under `.paper-search--floating` (`PaperSearch.vue:204-221`), keyed off a class the parent applies (`PaperSearch.vue:23`). So the prop's only local job is "does this variant get a dismiss backdrop" — which, per M-3, is the undocumented contract split, not a styling axis. Either the backdrop becomes unconditional (fixing M-3) and the prop leaves this component entirely, or the prop earns its name by owning the chrome too.

---

## §S · SUPERLATIVES (L-18, both directions)

**S-1 · The scroll-into-view watcher is partitioned across two surfaces with no overlap and no leak.** `PaperSearchDropdown.vue:22-24` guards `if (props.search.isExpanded.value) return`; `PaperSearchModal.vue:30` guards the exact complement, `if (!props.search.isExpanded.value) return`. Both watch the same `selectedIndex`, both are mounted simultaneously, and exactly one acts for any state. The naive implementations of this — one watcher that queries whichever container happens to exist, or two that both fire and fight — are what one normally finds. *Falsifier: a state where both or neither fire.* `isExpanded` is a plain boolean ref (`usePaperSearch.ts:22`); the partition is total.

**S-2 · `block: "nearest"` with no `behavior`.** `PaperSearchDropdown.vue:27`. `"nearest"` is the minimum-movement scroll — it does nothing when the row is already visible, where `"center"` (the common choice) yanks the list on every arrow press. Omitting `behavior` leaves it resolving to the element's `scroll-behavior`, which nothing in this tree sets to `smooth` (`grep -rn "scroll-behavior" web/src` → only `overscroll-behavior` hits), so it is instant and needs no reduced-motion carve. Two correct defaults, both the unobvious one.

**S-3 · `highlightFuzzy` escapes before interpolating and coalesces runs into single `<mark>`s.** `searchHelpers.ts:34-70`. Every path returns escaped output — `:35`, `:49`, `:61`, `:64` — so the `v-html` at `PaperSearchDropdown.vue:59` is safe by construction, not by luck. And `:56-67` walks consecutive matched indices into one `<mark>` rather than emitting one per character. That second choice is purely typographic and almost universally skipped: per-character marks produce visible inter-letter seams from the element boundaries and shred the DOM. *Falsifier: the escape is incomplete for this sink.* `escapeHtml` (`:72-74`) omits `"` and `'`, which is sufficient and correct for element content and would not be for an attribute — the sink here is element content.

**S-4 · The `:key` acknowledges that `id` is not unique.** `PaperSearchDropdown.vue:43`, `` `${r.id}-${r.type}-${i}` ``. This is not defensive noise: `paperSearchIndex.ts:333`, `:341` and `:350` all push entries with `id: sectionId` for the code/proof/caption-less cases, so a single section legitimately yields several rows sharing an id. A bare `:key="r.id"` would be a live patch-reuse bug. The composite is deliberate and correct.

**S-5 · Both scrollports contain their scroll chaining.** `PaperSearch.vue:111` and `:300` carry `overscroll-behavior: contain`, matching the discipline the rest of the paper tree keeps (`PaperView.vue:463`, `PaperSidebar.vue:156-157`, `MobileFloatingToc.vue:303`). Scrolling to the end of the result list does not start scrolling the paper underneath. Consistently applied across a five-file feature.

---

## §F · CLAIMS THAT DIED TO THEIR OWN FALSIFIERS

Recorded because the challenge is only worth its falsifier discipline.

**F-1 · "The dropdown and modal transitions have no `prefers-reduced-motion` carve" — FALSIFIED.** `PaperSearch.vue:225-236` and `:359-396` animate `transform` with no local `@media (prefers-reduced-motion: reduce)`, and `lane-frontend.md §8` shows eight sibling files that do carry one — so the omission is real. But glass-ui ships a **universal `!important` blanket**: `dist/styles/utilities/a11y-overrides.css:6-16` sets `transition-property: opacity, color, background-color, border-color, box-shadow !important` on `*:not([data-allow-motion])`, masking `transform` out of the property list entirely. The `translateY(-4px)` and `scale(.96)` snap. Coverage is real; only its *authorship* is absent. **Residual, booked as MINOR-adjacent:** the coverage is incidental and its mechanism **changes at 7.0.0** — the producer rewrote the blanket to stop minting a `transition-property` list and instead force `transition-duration: 0s` (`glass-ui/src/styles/utilities/a11y-overrides.css:6-31`, *"the resurrection vector"*). Both suppress this component's motion, so the uplift is safe here, but a component relying on an undeclared library blanket across a semantic rewrite of that blanket is relying on luck twice.

**F-2 · "`scrollIntoView` animates under reduced motion" — FALSIFIED.** Requires an ancestor `scroll-behavior: smooth`; `grep -rn "scroll-behavior" web/src web/index.html` returns only `overscroll-behavior` hits. See S-2.

**F-3 · "`escapeHtml` under-escapes (no `"` / `'`)" — FALSIFIED for this sink.** The output is element content via `v-html`, never an attribute value. See S-3.

**F-4 · "`--z-bar`, `--z-modal` and `--ease-out-expo` are undefined at the 4.0.0 pin" — FALSIFIED.** My first probe scanned only `dist/*.css` (the flat root) and missed the partials. All three ship: `dist/styles/tokens/scheme-motion.css:337,345` and the `--ease-*` family. Recorded so the next reader does not repeat the mistake: **glass-ui's tokens live in `dist/styles/{tokens,glass,utilities}/**.css`, not in `dist/glass-ui.css`.**

---

## §X · Reconciliation with the hitherto corpus

- `lane-frontend.md:162` sizes this file at **70 LOC** — confirmed exactly. `:288` records its single glass-ui import — confirmed exactly.
- `lane-frontend.md §4 🟡` books the family (397 + 435 LOC) as a CANDIDATE SHADOW of producer `./search`. **CONFIRMED and sharpened** — see I-2: the fork duplicates three of four exported function names and lacks the fourth.
- `lane-frontend.md:378-382`'s glass-class census (`glass-floating` ×3 live) — this is one of the three. **CONFIRMED**, with the new finding that the class is applied and then half-cancelled (M-6a) and applied to the wrong element (M-7).
- `lane-frontend.md §5` "Rows that hit fourier-analysis TODAY" — **INCOMPLETE.** The `Button` `variant`→`emphasis`/`tone` and `size="icon"` removal is absent from the table and is materially larger than every row in it (I-2). Not a contradiction of a measured claim; a gap in enumeration, offered for F.W1.
- `CENSUS-2026-08-03.md:99` names the PaperSearch family (832 LOC) as a convergence candidate — **CONFIRMED**, and B-1 raises the stakes: a family whose styling has been dead since `ffba307` is a cheaper re-home than it looks, because there is no working local design to preserve.
- `lane-fourier-r3-r6.md` **R3-11 / R3-12 / X-6** — the adjudicated Teleport and open-family rows. R3-11's live-tree fact ("exactly two `<Teleport`, `PaperSearchModal.vue:41` and `FullscreenViewer.vue:105`") is re-confirmed here; R3-12's "both Paper-search callsites duplicated in the open-family registry" is consistent with what I find in the tree — `PaperSearch.vue` genuinely instantiates two distinct open surfaces (the inline dropdown at `PaperSearchDropdown.vue:38` and the modal at `PaperSearchModal.vue:44`) over one `isOpen`/`isExpanded` pair. No contradiction. I add the design consequence Codex's registry could not see: the two surfaces have **divergent empty-state and dismissal contracts** (M-3, M-8).
- `lane-frontend.md §9 ¶11` "no unit-test runner; 8 Playwright specs" — **CONFIRMED and localized**: paper search has **zero** e2e coverage (`grep -rn "search" web/e2e/` → gallery only). B-1 has been shipped since 2026-05-26 with no gate capable of seeing it.

---

## §R · Repair order (for the wave that takes this)

1. **B-1 first, but never alone.** Move the 355-line block into the three child SFCs it belongs to (or make it a global `paper-search.css`). Land B-2 (`--z-bar` on the panel, a strictly lower rung on the backdrop — copy `MobileFloatingToc.vue:298/312`) and B-3 (retire all eight `color-mix(…, transparent)` calls onto `--muted-foreground` / `--muted-foreground-strong`) **in the same commit**, because B-1's cure arms both.
2. Then M-6 (drop the local border/box-shadow, let `glass-floating` paint; tokenize the badge hues + the `<mark>` with dark arms), M-7 (chassis/scrollport split), M-2 (portal out of `.sidebar-nav`), M-8 (empty state), M-3 (unconditional backdrop), M-1 (listbox semantics), M-4 (give the label room), M-5 (highlight off the debounced query).
3. Add an e2e spec before any of it. The whole defect set survived two tranches because nothing looks at this surface.
4. **Do not repair and re-fork simultaneously.** If F.W1 re-homes the family onto producer `./search` + `useFuzzySearch`, items M-1, M-6, M-7, N-1, N-4, N-6 and I-1 are discharged by adoption rather than by edit. Sequence the decision before the work.

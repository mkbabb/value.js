claude-opus-5[1m]

# CHALLENGE · `MobileFloatingToc.vue` · axis C (CONSUMPTION)

**Subject** `fourier-analysis/web/src/components/paper/MobileFloatingToc.vue` (397 lines, working tree, branch `m/w1-bump-migration`, dirty — the file carries an uncommitted glass-ladder rename; see S-1).
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every row below carries severity + `file:line` + its own falsifier. Superlatives carry falsifiers too (L-18 runs both ways).
**Method** static + source-derived only. No browser. Third-party claims are read off the *installed* trees (`web/node_modules/@mkbabb/glass-ui@4.0.0`, `@mkbabb/value.js@0.13.0`, `@mkbabb/keyframes.js@4.3.0`, `@mkbabb/latex-paper@0.2.1`), not off docs.

**Tally** 18 defects · 2 BLOCKER · 6 superlatives.

---

## 0. What this component actually consumes (the axis, measured)

| Producer | Reachable from this component? | Evidence |
|---|---|---|
| **glass-ui `^4.0.0`** | **YES — the ONLY third-party runtime coupling.** `Button` (`@mkbabb/glass-ui/button`), `useSidebarState` (`@mkbabb/glass-ui/sidebar`), + 4 CSS-layer surfaces (`glass-resting` ×2, `glass-floating`, and the `.btn-pill/tap-squish/focus-ring` base the Button CVA composes) | `MobileFloatingToc.vue:3,4,110,117,133` |
| **value.js `0.13.0`** | **NO** | Exhaustive grep: the 5 live value.js import statements are `lib/easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5` — none in this closure. Agrees with `CENSUS-2026-08-03.md:38` and `lane-frontend.md:480`. |
| **keyframes.js `4.3.0`** | **NO** | Only `composables/useFourierMorph.ts:14` (+ a prose reference at `stores/animation.ts:47`). |
| **fourier API (45 ops)** | **NO** | Zero `lib/api` / `api-problem` / `fetch(` in *any* file under `src/components/paper/` (exhaustive grep). |
| **hand-rolled `lib/colors.ts` arms** | **NO** | `cssVarToHex`/`hslToHex`/`rgbToHex` (`lib/colors.ts:22-74`) are never imported here. |
| lucide-vue-next `^1.0.0` | YES (5 glyphs) | `MobileFloatingToc.vue:5` |

**Consequence for wave homing.** The intake lane's `R6-8` carry (operation identity entangled with client identity; `lane-fourier-r3-r6.md:142`) and the `45/30/13` API triple (`CENSUS-2026-08-03.md:344`) are **structurally unreachable** here. Any wave that budgets this component under **F.W5** is mis-homed. Its entire migration exposure is **F.W1's glass-ui `4→7` leg**, and *nothing* of F.W2's value.js leg. That is a finding about the plan, not only about the file.

---

## BLOCKERS

### C-1 · `renderTitle` is a required prop that is never called — mobile TOC prints raw LaTeX
**BLOCKER** · `MobileFloatingToc.vue:16` (declared) · `:119-121, :162-163, :173-174` (the three sites that should call it) · `PaperView.vue:38, :326` (supplied) · `PaperSidebar.vue:80, :100, :116` (the contrasting, correct consumption)

`renderTitle: (title: string) => string` is declared **required** and appears **exactly once in the file — the declaration**. Grep is exhaustive: `grep -n renderTitle MobileFloatingToc.vue` → `16:` only. All three title render sites use `{{ }}` interpolation of the raw field:

- `:119-121` `{{ currentSection?.title }}` (the always-visible bar)
- `:162-163` `{{ section.title }}` (root rows)
- `:173-174` `{{ sub.title }}` (subsection rows)

The desktop sidebar renders the *same* fields through `v-html="renderTitle(section.title)"`. `renderTitle` is `createRenderTitle(renderInline)` (`latex-paper/dist/vue.js:3-8`), a `$…$` → `<span class="math-inline">KaTeX</span>` substitution — which proves `PaperSectionData.title` stores **raw LaTeX source**.

Three live titles carry inline math (`paper/fourier_paper.tex:1201, :1440, :2560`), e.g.
`\subsection{Worked Example: $N = 30 = 2 \times 3 \times 5$}`.
On mobile that row reads literally `Worked Example: $N = 30 = 2 \times 3 \times 5$`; on desktop it reads as typeset math. Note the fix is *not* "call `renderTitle`" — `{{ }}` escapes HTML, so it must become `v-html="renderTitle(sub.title)"`, exactly as `PaperSidebar.vue:100` already does.

Two defects in one: a dead required prop the parent must forever thread, and a rendering divergence between the two TOC surfaces over the same data.

**Falsifier.** If `PaperSectionData.title` were pre-rendered by the build-time parser, `renderTitle` would be a no-op and this collapses to a lint nit. It is not: `createRenderTitle`'s regex exists precisely because titles are raw, and `PaperView.vue:34` registers a `\leftrightarrow` macro to service `fourier_paper.tex:1201`'s title. Also falsifiable by "3 of ~62 nodes is cosmetic" — an owner may demote to MAJOR on that ground; the dead-prop leg survives either way.

---

### C-2 · Root sections are unreachable as navigation targets on mobile
**BLOCKER** · `MobileFloatingToc.vue:150-156` vs `PaperSidebar.vue:71-81`

The mobile root row's only handler is
```
@click="sidebarState.toggleSection(section.id)"      MobileFloatingToc.vue:155
```
The desktop root row for the same node is
```
@click="scrollTo(section.id); sidebarState.toggleSection(section.id)"   PaperSidebar.vue:74
```
So on mobile a chapter heading can be **expanded but never navigated to**. This is not a hidden path: `PaperView.vue:320` gates this component on `v-if="!mobileTocVisible"`, and `mobileTocVisible` is driven by an IntersectionObserver over the inline mobile nav (`PaperView.vue:251`) — i.e. **once the reader scrolls past the inline TOC, this bar is the only persistent navigation surface on mobile**, and half its rows are inert as links.

It is worse for a root with no children: `:157-161` hides the chevron behind `v-if="section.subsections?.length"`, so such a row renders as a plain tappable label whose tap does *nothing observable* — no scroll, no chevron flip, no dropdown close. The paper has one such candidate: `\section{Introduction}` at `fourier_paper.tex:93` precedes the first `\chapter{}` at `:118`, and the shipped bundle carries **12** `sourceLevel:0` nodes against **11** `\chapter` macros (`dist/assets/PaperView-CS2UAWt8.js`; `grep -c '\\chapter{' paper/fourier_paper.tex` → 11) — consistent with that orphan being promoted to a childless root.

Note the wiring that makes this an *avoidable* defect: `props.scrollTo` **is** already handed to `useSidebarState` at `:71`, which returns `navigateTo` — and `navigateTo` is never called (see C-9).

**Falsifier.** If the intended contract were "root rows are expanders only, chapters are reached via their first subsection", the asymmetry with `PaperSidebar.vue:74` would be deliberate — but nothing in the file's comments (`:61-66` documents only the state delegation) says so, and the row is styled with the same `is-active` / section-tint link affordance as the navigable sub rows (`:153-154`). The childless-root sub-claim rests on the 12-vs-11 inference and is **PLAUSIBLE, needs a live `paperSections.length` read (SS-13)**; the main claim does not depend on it.

---

## MAJOR

### C-3 · Two live `PaperSearch` instances over one shared state → duplicated body-teleported modal
**MAJOR** · `MobileFloatingToc.vue:111` + `PaperSidebar.vue:51` + `PaperView.vue:111, :328, :347` + `PaperSearchModal.vue:41, :32`

`PaperView` builds **one** `usePaperSearch(...)` (`:111`) and passes the same object to both TOC surfaces. Each renders `<PaperSearch>`, and each `PaperSearch` unconditionally mounts a `PaperSearchModal` whose root is `<Teleport to="body">` (`PaperSearchModal.vue:41`). `PaperSidebar` is **never `v-if`-gated** (`PaperView.vue:335`) — it is merely `display: none` below 1024px (`PaperSidebar.vue:135-148`), and teleported content escapes a hidden ancestor. So when the mobile user expands search (`PaperSearch.vue:29-30` → `search.toggleExpanded()`), **two** `.search-modal-overlay` layers mount into `<body>`:

1. Both are `position: fixed; inset: 0` with `background: color-mix(… --background 55% …)` and `backdrop-filter: blur(6px)` (`PaperSearch.vue:239-250`) — the scrim and the blur composite **twice**.
2. `PaperSearchModal.vue:32` scrolls the selected result with `document.querySelector(".search-modal-results")` — a **document-global** query that returns the *first* match. The mobile instance mounts later (its `PaperSearch` is `v-if="searchActive"`, `MobileFloatingToc.vue:110`) so it teleports *after* the sidebar's and sits on top — meaning the **visible** modal's ↑/↓ keyboard selection scrolls the **invisible** one, and never scrolls itself into view.
3. Three `focus()` calls race on open: `MobileFloatingToc.vue:90`, `PaperSearchInput.vue:20-25` ×2 (one per instance).

**Corrects the census.** `CENSUS-2026-08-03.md:336` records "2 Teleports (`PaperSearchModal.vue:41`, `FullscreenViewer.vue:105`)". That is a *static site* count. The runtime **instance** count for `PaperSearchModal` is **2 by itself** whenever mobile search is open. The census figure is right and insufficient; this row extends it.

This is a consumption/integration-seam defect and not merely a PaperSearchModal bug: it is created by *this* component's choice to mount a second consumer of a state object it does not own (see C-13).

**Falsifier.** Collapses if `PaperSidebar` were `v-if`-gated off below `lg`, or if `PaperSearchModal` were hoisted to a single `PaperView`-level instance, or if `search.isExpanded` were unreachable from the floating variant. None hold: `PaperView.vue:335` has no `v-if`; `PaperSearch.vue:35-37` mounts the modal per instance; `PaperSearch.vue:28-30` wires `@expand` for **both** variants. The z-order leg (which modal is on top) is order-of-mount reasoning — **UNPROVEN-NEEDS-LIVE (SS-13)**; the duplication itself is not.

---

### C-4 · glass-ui `Button` pill geometry is never reset — the full-bleed bar renders at 9999px radius
**MAJOR** · `MobileFloatingToc.vue:117, :205-221` · `glass-ui/dist/styles/glass/surfaces.css:119, :135` · `glass-ui/dist/styles/theme/radius.css:25`

The trigger is a `<Button class="floating-toc-bar glass-resting">`. Every `Button` composes `.btn-pill` (CVA base string, `glass-ui/dist/button-BNDWhAZb.js:49`), and

```
.btn-pill { … border-radius: var(--radius-pill); … }      surfaces.css:135
--radius-pill: 9999px;                                     theme/radius.css:25
```

The scoped `.floating-toc-bar` block (`:205-221`) declares `display`, `width: 100%`, `border: none`, `border-bottom: 1px solid …`, padding, colour, `z-index` — **and no `border-radius`**. Scoped styles are unlayered and `.btn-pill` sits inside `@layer components` (`surfaces.css:6`), so scoped rules win *only where they declare*; radius is not declared, so 9999px stands. The result is a fully-rounded pill that is also 100% wide and carries a straight 1px bottom hairline, with a square-cornered `left:0;right:0` dropdown hanging off it (`:293-307`).

The author demonstrably knew this was needed — `.floating-toc-item { border-radius: 0.375rem }` (`:340`) resets exactly this inherited pill radius for the dropdown rows. The bar was missed.

**Falsifier.** Dies if any later unlayered rule sets a radius on `.floating-toc-bar`, or if `.glass-resting` supplies one. Neither: `glass/ladder.css:67-77` (`.glass-resting`) sets position/background/backdrop-filter/border/box-shadow only, and the sole `border-radius` in `ladder.css` is `:344` `border-radius: inherit` inside a pseudo-element rule. The app's `style.css` touches `.floating-toc-item:focus-visible` only (`:138-144`). **Precise visual outcome is UNPROVEN-NEEDS-LIVE (SS-13)**; the cascade derivation is not.

---

### C-5 · `whitespace-nowrap` inherited from the Button base, never reset on 60+ TOC rows
**MAJOR** · `MobileFloatingToc.vue:150, :166, :336-349` · `glass-ui/dist/button-BNDWhAZb.js:49` · `glass-ui/dist/styles/components.css` (`.whitespace-nowrap{white-space:nowrap}`) · `glass-ui/dist/styles/index.css:201`

The Button CVA base literally begins `"btn-pill tap-squish focus-ring whitespace-nowrap …"`. That utility is **shipped precompiled** by glass-ui (`dist/styles/components.css`, imported at `index.css:201`, which fourier pulls at `src/style.css:3`) — so it applies regardless of whether the app's Tailwind scans `node_modules`. Confirmed present in the app's own built CSS (`web/dist/assets/index-57FkGzlZ.css`).

Every dropdown row is a `<Button>` (`:150`, `:166`). `.floating-toc-item` (`:336-349`) sets display, padding, radius, border, background, cursor, text-align, font-size, colour, transition — **no `white-space`, no `overflow`, no `text-overflow`**. Contrast `.floating-toc-section` (`:223-229`) which *does* set `overflow:hidden; text-overflow:ellipsis; white-space:nowrap; min-width:0` for the bar's single line. The dropdown rows got none of it.

Longest live label: `\section{Complex Analysis of Orthogonal Polynomials and Green's Functions}` (`fourier_paper.tex:2187`, 63 chars). At the mobile root size (`src/style.css:40` → `html { font-size: 1.125rem }` below 768px) plus `padding-left: 2.25rem` on sub rows (`:365`), that line cannot fit a 360px viewport and cannot wrap. `.floating-toc-dropdown` declares `overflow-y: auto` (`:302`) with `overflow-x` unset, which per CSS Overflow computes `overflow-x` to `auto` — so the mobile TOC gains a horizontal scrollbar instead of wrapping.

**Falsifier.** Dies if anything resets `white-space` for these rows. Exhaustive: not in the scoped block, not in `src/style.css`'s `.floating-toc-item:focus-visible` rule, and `@apply text-base` (`:345`) emits `font-size`/`line-height` only. Also dies if section titles were short — falsified by `fourier_paper.tex:2187` and `:2261`.

---

### C-6 · The section-colour ramp this component paints as text fails AA at 3 of 13 indices in light mode
**MAJOR** · `MobileFloatingToc.vue:154` · `glass-ui/dist/styles/tokens/light-dark.css:126-138` · `glass-ui/dist/styles/tokens/dark-arm.css:95-107` · `web/src/style.css:118-127`

`:style="activeRootId === section.id ? { color: \`var(--section-color-${si})\` } : {}"` paints ramp entries as **text colour**, at `@apply text-base` size and `font-weight: 600` (`:345`, `:376-378`) — i.e. normal text, WCAG AA floor 4.5:1.

Computed contrast of the shipped ramp against `--background` (`--neutral-0: hsl(40 30% 98%)` light / `hsl(24 9% 4%)` dark, `tokens/color-radius.css:40`, `dark-arm.css:42`), oklch→sRGB→WCAG:

| idx | light | | dark | |
|---|---|---|---|---|
| 0 | 5.15 | PASS | 7.46 | PASS |
| 1 | 6.21 | PASS | 8.02 | PASS |
| 2 | 6.40 | PASS | 7.83 | PASS |
| 3 | 4.70 | PASS | 9.69 | PASS |
| **4** | **4.44** | **FAIL** | 10.20 | PASS |
| 5 | 3.55 → **4.71** after fourier's override | PASS | 10.95 | PASS |
| 6 | 4.56 | PASS | 6.75 | PASS |
| 7 | 5.54 | PASS | 8.08 | PASS |
| 8 | 5.84 | PASS | 7.15 | PASS |
| 9 | 5.93 | PASS | 9.36 | PASS |
| **10** | **4.40** | **FAIL** | 10.70 | PASS |
| **11** | **3.64** | **FAIL** | 11.13 | PASS |
| 12 | 5.84 | PASS | 7.67 | PASS |

fourier's `D.W4.d` remediation (`src/style.css:118-127`) rebased **only index 5**, and only because it doubles as `--viz-amber`. Indices **4, 10, 11** were never audited — and with ~12 roots, indices 10 and 11 are the paper's last two chapters, both live.

Two second-order notes: (a) the override swaps index 5 from the ramp's OKLCH register to sRGB HSL, so one entry of a perceptually-uniform ramp is now off-model; (b) `.glass-floating` self-declares `--glass-backdrop: light` and, on `contrast-color()`-capable engines, re-points `--foreground`/`--muted-foreground` inside the plate (`glass/ladder.css:83-93, :232-260`) — the inline section colour bypasses that mechanism entirely, so it is the one ink in the dropdown that is *not* backdrop-adaptive.

**Falsifier.** The numbers are exact against `--background`; the rows actually sit on a translucent `.glass-resting`/`.glass-floating` plate whose composited backdrop is not literally `--background`. **The composited value is UNPROVEN-NEEDS-LIVE (SS-13).** The plate is a light wash over the page white, so the true ratios sit near these; a materially darker composite would rescue 4/10/11 and endanger the passing entries instead. The claim that survives regardless: **the ramp was contrast-remediated at exactly one of thirteen indices, and this component is a text consumer of all of them.**

---

### C-7 · The child mutates a DOM node owned by the parent, with no save/restore and no re-target
**MAJOR** · `MobileFloatingToc.vue:17, :45-52, :55-59`

`scrollContainer: HTMLElement | null` is a raw DOM node passed down as a prop, and the child writes to it:

```
props.scrollContainer.style.overflow = open ? 'hidden' : '';     :47
props.scrollContainer.style.overflow = '';                       :57
```

Three seam defects:

1. **Unconditional clobber on release.** `''` is written, not the value that was there. If anything ever sets an inline `overflow` on that node, this component silently erases it.
2. **No re-target on identity change.** The `watch` is on `floatingTocOpen`, not on `props.scrollContainer`. If the parent's `scrollContainer` ref swaps while the dropdown is open, the *old* node stays `overflow: hidden` forever and the new one is never locked. `PaperView.vue:276` already watches `[scrollContainer, sectionWindowRoot]` for exactly this reason — the parent knows the ref can change; the child assumes it cannot.
3. **No protocol.** Nothing marks the lock as owned. A second locker (a future modal, a drawer) would fight it silently.

**Falsifier.** Leg 3's "second writer exists today" is **FALSE** — exhaustive grep over `web/src/` finds `style.overflow` written at exactly these two lines and nowhere else. Legs 1 and 2 stand on the code as written; leg 2 additionally requires the parent ref to actually swap, which is **UNPROVEN-NEEDS-LIVE (SS-13)** but is the exact hazard `PaperView.vue:276` guards.

---

### C-8 · Teardown is asymmetric: the scroll lock is released on unmount, the shared search state is not
**MAJOR** · `MobileFloatingToc.vue:55-59, :86-96` · `PaperView.vue:320, :251`

`onUnmounted` (`:55`) restores `overflow`. It does **not** call `props.search.close()`, even though `openMobileSearch()` (`:89`) called `props.search.open()` on a state object shared with `PaperSidebar`.

This is not hypothetical: the component is `v-if="!mobileTocVisible"` (`PaperView.vue:320`) with `mobileTocVisible` flipped by an IntersectionObserver (`PaperView.vue:251`). A reader who opens mobile search and then scrolls up past the inline nav destroys this component mid-search. The local `searchActive` dies with it; the shared `isOpen`/`query` do not. On remount, `watch(() => props.search.isOpen.value, …)` (`:99-103`) has no `immediate` flag and so never fires — leaving `searchActive === false` while the shared state believes search is open, with the sidebar's (hidden) inline dropdown still rendered against the stale query.

**Falsifier.** Dies if `mobileTocVisible` cannot flip while search is active — but search is opened *from* the floating bar, which only exists while `!mobileTocVisible`, and scrolling up is the ordinary way back. Also dies if `<Transition name="slide-down">` (`PaperView.vue:318`) kept the instance alive — it does not; a leave transition defers unmount, it does not prevent it.

---

## MINOR

### C-9 · `useSidebarState` is over-consumed: 6 options in, 2 members out, a whole tree index built for nothing
**MINOR** · `MobileFloatingToc.vue:67-84` · `glass-ui/dist/composables/sidebar/useSidebarState.d.ts:3-39` · `glass-ui/dist/sidebar.js:271-303`

Supplied: `sections`, `activeId`, `activeRootId`, `scrollTo`, `scrollToTop`, `getChildren`. Consumed from the return: `isExpanded` (`:155, :158, :165`) and `toggleSection` (`:155`) — **two of ten** members.

- `scrollTo`/`scrollToTop` are wired at `:71-72` and then **bypassed**: the component calls `props.scrollTo(id)` directly at `:78` and `props.scrollToTop()` at `:83`, so `sidebarState.navigateTo` and `sidebarState.scrollToTop` are dead wiring. (This is the same `navigateTo` whose absence produces C-2.)
- `activeId` is a documented stand-in (`:64-66`: "`activeId` is unused on mobile … pass `activeRootId` as a stand-in"), which makes `isActive`/`isInActiveChain` **wrong by construction**. Latent only because they are unused — a live landmine for anyone who later reaches for them.
- The composable's first act is `useTreeIndex(t.sections, {getChildren})` (`sidebar.js:273`), a full recursive walk over all ~62 nodes, producing a `treeIndex` nothing here reads.

The surface actually needed is a two-function expand-set. **Falsifier.** If the intent is "structural symmetry with `PaperSidebar` even at the cost of dead wiring" (the stated rationale at `:61-63`), this demotes to INFO — but the symmetry argument is undercut by C-2, where the *behaviour* diverges from the sidebar at the one point that matters.

### C-10 · `sections` crosses the seam by value; `activeId`/`activeRootId` cross by getter
**MINOR** · `MobileFloatingToc.vue:68` · `useSidebarState.d.ts:4 vs :10, :12`

glass-ui types `sections: T[]` (plain) while `activeId`/`activeRootId` are `MaybeRefOrGetter` with `toValue` applied internally and an explicit comment about cross-package Vue skew (`:5-12`). Line 68 therefore snapshots `props.sections` at setup; the template meanwhile iterates the *live* prop (`:149`). The two can drift.

**Falsifier.** Benign today: `PaperView.vue:120` is `const sections = computed(() => paperSections)` over a build-time virtual module — a constant. This is a latent-contract row, not a live bug. The producer-side asymmetry (one option by value, two by getter) is the real defect and belongs upstream.

### C-11 · Unguarded index into a 13-slot ramp
**MINOR** · `MobileFloatingToc.vue:154` (also `PaperSidebar.vue:77, :96, :112`)

`var(--section-color-${si})` interpolates the *array index*. glass-ui defines exactly `--section-color-0 … -12` (`tokens/light-dark.css:126-138`, `tokens/dark-arm.css:95-107`; confirmed 0–12 and no more in the app's built CSS). The paper has 11 `\chapter` + 1 promoted pre-chapter `\section` ≈ **12** roots — one away from the ceiling. A 13th chapter yields `var(--section-color-13)`, which is invalid-at-computed-value-time: an inherited property, so `color` silently falls back to the inherited value with no console diagnostic and no visual signal that the ramp ran out. No `% 13`, no producer-side accessor.

**Falsifier.** Dies if glass-ui ships a documented modulo helper — it does not (no `sectionColor` in any subpath of the exports map). Dies if the paper is frozen at ≤13 roots — nothing enforces that.

### C-12 · A nested, unlabelled, keyboard-unreachable control inside the trigger `<Button>`
**MINOR** · `MobileFloatingToc.vue:117, :123-125, :238-247`

The search affordance is `<span class="floating-toc-search-btn" @click.stop="openMobileSearch" title="Search paper">` **inside** the trigger `<Button>`. No `role`, no `tabindex`, no accessible name beyond `title`. Keyboard and AT users can reach only the outer toggle — search is pointer-only on the surface that is mobile's sole navigation.

Tap target: `Search` glyph is `h-3.5 w-3.5` = 0.875rem, span padding `0.25rem` (`:242`), mobile root `font-size: 1.125rem` (`src/style.css:40`) ⇒ **24.75 × 24.75 CSS px**. That **clears** WCAG 2.5.8 (24×24) by 0.75px and **fails** 2.5.5 AAA / Apple HIG 44pt.

**Falsifier — and one non-defect I checked and am withdrawing:** glass-ui's Button base carries `[&_svg]:pointer-events-none` (`button-BNDWhAZb.js:49`), which looks like it would kill the handler. It does not — `pointer-events: none` removes the `<svg>` from hit testing, so the hit falls to the enclosing span, which is the listener. No defect there. The 24.75px figure is arithmetic, falsifiable only by a different root font-size; note the AA margin is 0.75px, so any `--ui-scale < 1` or root-size change breaks it.

### C-13 · Prop contract: 8 props, 0 emits, 3 callback props, 1 unwrapped composable bag
**MINOR** · `MobileFloatingToc.vue:10-19`

- **Zero `defineEmits`.** All parent communication is downward callbacks: `scrollTo`, `scrollToTop`, `renderTitle` (`:14-16`). Anti-idiomatic Vue, and it defeats the emits type surface entirely.
- **`search: PaperSearchState`** (`:18`) is `ReturnType<typeof usePaperSearch>` — a plain record of `Ref`s (`usePaperSearch.ts:94-108`). Props do not deep-unwrap, so every consumer must write `.value` in *templates* (`PaperSearch.vue:28`, `PaperSearchInput.vue:42,53,59`, `PaperSearchDropdown.vue:37,42,46,58`, `PaperSearchModal.vue:44,57,82,84,88,100`, and `MobileFloatingToc.vue:99`). It also hands this child **mutation authority over a state object it does not own** — the proximate cause of C-3 and C-8.
- **`scrollContainer: HTMLElement | null`** (`:17`) passes a raw DOM node as a prop — see C-7.
- **No `defineExpose`**, so the parent cannot dismiss the dropdown it can unmount.

**Falsifier.** Callback props are legitimate when the child is a pure render slot; this child is stateful (three local refs, two watchers, an unmount hook) and mutates shared state, so the "presentational component" defence does not apply.

### C-14 · Two different template-ref idioms in one 104-line script block
**MINOR** · `MobileFloatingToc.vue:23-24, :28, :111, :132`

`useTemplateRef<…>("tocTrigger")` (`:28`) for one ref; legacy string-ref → same-named `ref()` binding for `dropdownRef` (`:23`/`:132`) and `mobileSearchRef` (`:24`/`:111`). Both work under Vue `^3.5.38`, but the file documents `useTemplateRef` as the deliberate choice (`:25-28`) and then does not apply it twice more.

**Falsifier.** Purely stylistic under 3.5 — no behavioural difference today. Rises if the implicit string-ref binding is ever deprecated.

### C-15 · Focus return discharges 2 of 6 dismissal paths, while the comments claim the discharge
**MINOR** · `MobileFloatingToc.vue:25-27, :36-40, :76-84, :86-91, :117, :135, :186`

`dismissDropdown()` returns focus to the trigger and is bound on Esc (`:135`) and backdrop tap (`:186`). The other four paths set `floatingTocOpen.value = false` bare, with no focus management: `selectSection` (`:77`), `handleScrollToTop` (`:82`), `openMobileSearch` (`:87`), and the trigger's own toggle (`:117`). The comments at `:25-27` and `:36` present this as the "A4 MED a11y discharge"; it is a partial one.

**Falsifier.** `:117` needs no return — focus is already on the trigger. `:87` hands focus to the search input (`:90`), which is correct. That leaves `:77` and `:82`, which move the *page* but strand keyboard focus on a button that has just been removed from the DOM — a genuine focus-loss-to-`<body>`. **The resulting focus location is UNPROVEN-NEEDS-LIVE (SS-13).**

### C-16 · Subsection rows carry no active state and no section tint
**MINOR** · `MobileFloatingToc.vue:166-175` vs `PaperSidebar.vue:94-97, :111-113`

Desktop tints active sub and sub-sub rows with `--section-color-${si}` plus weight and background. The mobile sub row (`:166-175`) has **no `:class`, no `:style`** — a reader who opens the dropdown mid-section cannot see which subsection they are in, even though `activeRootId` is in hand and `sidebarState.isActive` exists (unused, and mis-parameterised per C-9).

**Falsifier.** Justifiable as a deliberate mobile simplification — the file says as much for `activeId` at `:64-66` ("no nested highlighting"). It remains a divergence between two surfaces over one dataset, and it is *why* `activeId` had to be faked.

### C-17 · Under-consumption of glass-ui: the sibling animates expand/collapse, this one jumps
**INFO** · `MobileFloatingToc.vue:165-176` vs `PaperSidebar.vue:7, :66-69, :85`

`PaperSidebar` drives expansion through `Collapsible`/`CollapsibleContent` from `@mkbabb/glass-ui/collapsible`, riding reka-ui's `--reka-collapsible-content-height` (documented at `PaperSidebar.vue:255-257` as the deliberate retirement of a hand-rolled `grid-template-rows` shim). `MobileFloatingToc` uses a bare `<template v-if="sidebarState.isExpanded(…)">` — instant, unanimated. The subpath export exists (`./collapsible` in the glass-ui exports map). The component animates its *own* open/close (`toc-expand`, `:380-396`) but not its rows.

**Falsifier.** Reasonable to skip an animation inside an already-animating overlay, and reasonable on a `max-height: 60vh` scroller. Filed INFO, not MINOR, on that ground.

### C-18 · The inline active colour defeats the hover rule
**INFO** · `MobileFloatingToc.vue:154, :370-374`

`:style` is an inline declaration and outranks `.floating-toc-item:hover { color: var(--foreground) }`. The active root row therefore changes background but never colour on hover/press, while every other row changes both — a small, avoidable state-feedback inconsistency created by choosing inline style over a CSS custom property.

**Falsifier.** Arguably intended (keep the section identity colour under the finger). Filed INFO.

---

## SUPERLATIVES (L-18, both ways)

### S-1 · The glass 4.0.0 ladder rename is correctly and completely applied — this file was born-dead at HEAD and is alive in the working tree
`MobileFloatingToc.vue:110, :117, :133` · `git diff` on the file

The uncommitted diff is exactly `glass-medium → glass-resting` (×2, the two bar states) and `glass-medium → glass-floating` (the dropdown). Verified against the installed producer: `.glass-resting` (`glass/ladder.css:67`) and `.glass-floating` (`:83`) both exist at 4.0.0; **`glass-medium` exists nowhere in glass-ui 4.0.0's shipped CSS** (exhaustive grep over `dist/styles/`). Had the rename not landed, all three surfaces would have rendered as unstyled transparent plates — the born-RED-blank pattern. The mapping matches the census prescription byte-for-byte (`lane-frontend.md:504-505`: `glass-elevated → glass-floating`, `glass-medium → glass-resting`), and the tier *choice* is right too — resting for the docked bar, floating for the overlay.

**Falsifier.** Dies if `glass-medium` still resolved via a compat shim — it does not. Dies if the rename is uncommitted and therefore not shipped — **it is uncommitted**, so this superlative is conditional on the branch landing. Flagged.

### S-2 · Provably zero fourier-API coupling — this component is outside R6-8's blast radius
Exhaustive grep: no file under `src/components/paper/` imports `@/lib/api`, `api-problem`, or calls `fetch(`. The intake lane's `R6-8` root cause (`lane-fourier-r3-r6.md:142` — `web/src/lib/api.ts:420` `updateVisualization` ↔ `api/routers/visualizations.py:350`) and the `45/30/13` operation triple (`CENSUS-2026-08-03.md:344`) have **no reachable edge** here. A pure content/navigation leaf with zero network surface is the correct shape for this component, and it is worth recording that the shared-provenance contract lesson does not apply.

**Falsifier.** Dies if `virtual:paper-content` were runtime-fetched — it is not; `lib/paperContent.ts:6-7` re-exports a build-time virtual module.

### S-3 · Provably zero value.js and zero keyframes.js coupling — the F.W2 surface does not touch this file, and the file already models the idiom F.W2 should generalise
The census's 5-site value.js surface (`CENSUS-2026-08-03.md:38`, `lane-frontend.md:480`) is `easings.ts:9,16` + `ConvergencePlot.vue:5` + `useCurveTransition.ts:8` + `harmonics.ts:5`; keyframes is `useFourierMorph.ts:14`. **None in this closure.** So the F.W1 atomic tri-package bump (`glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0`, `CENSUS:184`, `lane-frontend.md:492`) reaches this component through **glass-ui alone** — a bounded, two-symbol migration surface (`Button`, `useSidebarState`).

More pointedly: the hand-rolled `lib/colors.ts` arms that F.W2 targets (`cssVarToHex`/`hslToHex`/`rgbToHex`, `lib/colors.ts:22-74` — a regex-based CSS colour parser plus two manual space conversions) are **not reachable here**. This component consumes colour *purely as CSS custom properties* (`:154`, `:213`, `:218`, `:244`, `:251`, and the whole `color-mix(in srgb, …)` family) and never parses a colour in JavaScript. That is the correct idiom — the browser is the colour engine — and it is the pattern F.W2 should generalise **from**, not the one it should port **to** a library call.

**Falsifier.** Dies if a transitive import pulls value.js in — checked: the closure is `vue`, `glass-ui/{button,sidebar}`, `lucide-vue-next`, `PaperSearch.vue` (→ 3 SFCs + `usePaperSearch` → `paperSearchIndex` → `searchHelpers`), `@/lib/paperContent` (→ `@mkbabb/latex-paper` + the virtual module). No value.js, no keyframes.

### S-4 · The `triggerEl()` shim is correct engineering, not defensive superstition
`MobileFloatingToc.vue:25-34` · `glass-ui/dist/button-BNDWhAZb.js:22, :30-45`

The comment hedges "glass-ui `Button` forwards its root element ref; fall back to querying the focusable child if the instance exposes `$el`." The tree ratifies the fallback as the live branch: `Button` is a single-root reka-ui `Primitive` with `as: { default: "button" }`, so `useTemplateRef` yields a `ComponentPublicInstance`, `instanceof HTMLElement` is false, and `r.$el` resolves to the real `<button>`. Single root ⇒ `$el` is an element, not a fragment anchor, so `.focus()` is safe. The dead `instanceof` branch costs nothing and documents the intent.

**Falsifier.** Would break if a consumer ever passed `as-child` or a multi-root `as` — neither is done here, and `Button` does not forward `asChild` from this call site.

### S-5 · The iOS-WebKit scroll-chaining discharge is complete, not partial
`MobileFloatingToc.vue:47, :302-305`

`overflow-y: auto` + `overscroll-behavior: contain` + `-webkit-overflow-scrolling: touch` + `touch-action: pan-y` on the dropdown, **plus** the ancestor scroll lock (`:47`), **plus** an unmount-time release (`:55-59`). Most consumers ship one or two of those five and then chase rubber-banding bugs; this ships all five, with the rationale recorded inline (`:42-44`). C-7 challenges *how* the lock is written, not *that* it is right to write it.

**Falsifier.** iOS behaviour itself is **UNPROVEN-NEEDS-LIVE (SS-13)**; what is proven is the completeness of the declaration set.

### S-6 · Motion tokens consumed canonically at every one of four sites, with no `transition: all`
`MobileFloatingToc.vue:246, :348, :384-385, :287`

`--ease-standard` and `--ease-out-expo` are both live glass-ui tokens (`tokens/scheme-motion.css:216, :219`; bridged at `theme/bridges.css:325, :328`) — not phantom vars. Every transition names its properties explicitly (`color`, `background-color`, `opacity`, `transform`), and the `A.W3.d` discipline (named properties, canonical tokens, no `transition: all`, no raw bezier) held at all four sites, each annotated with its provenance. Compare `PaperSearch.vue:94` (`transition: color 0.12s, background 0.12s` — untokenised) in the sibling file: this component is the better citizen.

**Falsifier.** `:287` `transition: transform 0.2s ease` uses the CSS keyword `ease` rather than a token — one site out of four is off-doctrine. Recorded here rather than as a separate defect row because it is a chevron rotation, not a surface leg; a strict reading would file it MINOR.

---

## Corpus reconciliation

| Corpus row | This challenge |
|---|---|
| `lane-frontend.md:155` — inventory row, `MobileFloatingToc.vue` / 397 / "Mobile floating ToC bar" | Line count confirmed at 397 (working tree). |
| `lane-frontend.md:282-283` — the two glass-ui import statements | Confirmed verbatim at `:3` and `:4`. |
| `lane-frontend.md:378, :504-505` — the live tier classes are the post-4.0.0 names; `glass-medium → glass-resting`, `glass-elevated → glass-floating` | **Confirmed and extended (S-1):** this file's three tier sites are the uncommitted half of that migration. Census counted the post-migration state; the branch has not landed. |
| `lane-fourier-r3-r6.md:84` (R3-10) — dynamic `:is` family at `MobileFloatingToc:157` | **Confirmed at HEAD-of-branch:** `:157-161` `<component :is="sidebarState.isExpanded(section.id) ? ChevronDown : ChevronRight" v-if="section.subsections?.length">`. Note the `v-if` gate is the mechanism behind C-2's childless-root dead row. |
| `lane-fourier-r3-r6.md:142` (R6-8) — operation↔client leaf non-isolability, carry → F.W5 | **Not applicable here (S-2).** Zero API coupling in the whole `src/components/paper/` subtree. Homing this component under F.W5 would be an error. |
| `CENSUS-2026-08-03.md:38` — value.js surface = 5 statements / 4 files / 6 symbols, easing-only | **Confirmed and localised (S-3):** none of the 4 files is in this closure. |
| `CENSUS-2026-08-03.md:336` — "2 Teleports (`PaperSearchModal.vue:41`, `FullscreenViewer.vue:105`)" | **CONTRADICTED as a runtime figure (C-3).** That is a static *site* count. `PaperSearchModal.vue:41` is instantiated **twice** whenever mobile search is open, because `PaperSidebar` is never `v-if`-gated (`PaperView.vue:335`). The census figure is correct for sites and misleading for instances. |
| `CENSUS-2026-08-03.md:184, :187` — F.W1 atomic tri-package uplift; F.W2 value.js consumption to spec | **Scoping correction:** this component's exposure to F.W1 is the glass-ui leg only, and its exposure to F.W2 is **nil**. |

---

## Summary

| ID | Sev | One line |
|---|---|---|
| C-1 | BLOCKER | `renderTitle` required but never called — mobile TOC prints raw `$…$` LaTeX where desktop typesets it |
| C-2 | BLOCKER | Root rows only toggle, never navigate — on mobile's sole persistent nav surface |
| C-3 | MAJOR | Two `PaperSearch` instances on one state → duplicate body-teleported modal; `document.querySelector` scrolls the wrong one |
| C-4 | MAJOR | `.btn-pill`'s 9999px radius never reset on the full-bleed bar |
| C-5 | MAJOR | Button-base `whitespace-nowrap` never reset on 60+ TOC rows → sideways-scrolling dropdown |
| C-6 | MAJOR | Section-colour ramp fails light-mode AA at idx 4/10/11; only idx 5 was ever remediated |
| C-7 | MAJOR | Mutates the parent's DOM node: no save/restore, no re-target on identity change |
| C-8 | MAJOR | Unmount releases the scroll lock but not the shared search state it opened |
| C-9 | MINOR | `useSidebarState` over-consumed: 2 of 10 members used, `navigateTo`/`scrollToTop` dead, `activeId` faked |
| C-10 | MINOR | `sections` crosses the seam by value while the sibling options cross by getter |
| C-11 | MINOR | Unguarded index into a 13-slot ramp; paper sits at ~12 roots |
| C-12 | MINOR | Nested unlabelled keyboard-unreachable search control; 24.75px target clears AA by 0.75px |
| C-13 | MINOR | 8 props / 0 emits / 3 callbacks / a raw DOM node / an unwrapped composable bag |
| C-14 | MINOR | `useTemplateRef` and legacy string refs mixed in one 104-line script |
| C-15 | MINOR | Focus return discharged on 2 of 6 dismissal paths despite the comments |
| C-16 | MINOR | Subsection rows carry no active state and no tint, unlike the sidebar |
| C-17 | INFO | Sibling animates expand/collapse via glass-ui `Collapsible`; this one jumps |
| C-18 | INFO | Inline active colour defeats the hover colour rule |
| S-1 | ★ | glass 4.0.0 ladder rename correct and complete (conditional on the branch landing) |
| S-2 | ★ | Provably zero API coupling — outside R6-8's blast radius |
| S-3 | ★ | Provably zero value.js/keyframes coupling; already models the colour idiom F.W2 should generalise from |
| S-4 | ★ | `triggerEl()` shim ratified by the producer's single-root `Primitive` |
| S-5 | ★ | Complete five-part iOS scroll-chaining discharge |
| S-6 | ★ | Canonical motion-token consumption, no `transition: all` (one keyword-`ease` blemish noted) |

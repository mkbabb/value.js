claude-opus-5[1m]

# CHALLENGE · `MobileFloatingToc.vue` · axis **L** (LIBRARY)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/MobileFloatingToc.vue` (397 lines; census `lane-frontend.md:155` books 397 — exact).
**Posture** Component assumed DEFECTIVE until the tree proves otherwise. Every claim carries severity + `file:line` + its falsifier.
**Method** Static + source-derived only. No browser tooling. Read whole: the target, every direct import, the transitive Vue surface it mounts, the two glass-ui dist modules it consumes, the `@mkbabb/latex-paper` parser that produces its data, the sole consumer (`PaperView.vue`), the desktop twin (`PaperSidebar.vue`), and — decisively — the **shipped build output** at `web/dist/assets/` (`PaperView-FJog9X2r.css`, `index-57FkGzlZ.css`, both `Jun 12 18:13`, post-dating the component's `Jun 11 11:19` mtime), which settles three claims that would otherwise be UNPROVEN.

**Tally — 18 defects · 2 BLOCKER · 6 MAJOR · 7 MINOR · 3 INFO · 4 superlatives.**

---

## §0 — Files read (read-only)

| file | why |
|---|---|
| `web/src/components/paper/MobileFloatingToc.vue` | target |
| `web/src/components/paper/PaperSearch.vue` | direct import (`:6`) |
| `web/src/components/paper/search/usePaperSearch.ts` | direct type import (`:8`); `PaperSearchState` contract |
| `web/src/lib/paperContent.ts` | direct type import (`:7`) → re-export of `@mkbabb/latex-paper` |
| `web/node_modules/@mkbabb/glass-ui/dist/sidebar.js` + `composables/sidebar/{useSidebarState,types}.d.ts` | direct import (`:4`) — the *implementation*, not the types |
| `web/node_modules/@mkbabb/glass-ui/dist/{button.js,button-BNDWhAZb.js}` | direct import (`:3`) — cva base + reka `Primitive` root |
| `web/src/components/paper/search/{PaperSearchInput,PaperSearchDropdown,PaperSearchModal}.vue`, `searchHelpers.ts`, `index.ts` | transitive mount surface of `:111` |
| `web/src/components/paper/PaperView.vue` (685) | sole consumer; prop provenance |
| `web/src/components/paper/PaperSidebar.vue` (283) | the desktop twin — the differential oracle |
| `web/src/components/paper/useScrollNavigation.ts` (246) | reaches *into* this component by class name |
| `@mkbabb/latex-paper/dist/{vue.js,chunk-A7GY23HR.js,types/output.d.ts}` | `renderTitle` + `title`/`number` production |
| `paper/fourier_paper.tex` | the actual data (51 roots, 4 starred subsections, 4 math-bearing titles) |
| `web/src/style.css`, glass-ui `tokens/{color-radius,dark-arm,light-dark}.css` | the `--section-color-N` ramp |
| `web/dist/assets/{PaperView-FJog9X2r,index-57FkGzlZ}.css` | shipped CSS — settles L-3, L-4, L-15 |

Corpus folded (not re-derived): `formation/fourier/CENSUS-2026-08-03.md` §3a + [FE §6]; `formation/fourier/lane-frontend.md` §`components/paper/` (:148-165) and the glass import census (:282-290); `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R3-10**, **R3-11**, **R5-7**, **R6-5**.

---

## §1 — BLOCKERS

### L-1 · BLOCKER · the `renderTitle` prop is declared, passed, and never called — raw LaTeX ships to the mobile reader

`MobileFloatingToc.vue:16` declares `renderTitle: (title: string) => string;`. `PaperView.vue:326` passes it. **The template never invokes it.** Titles are emitted as raw mustache interpolation at three sites:

- `:121` `{{ currentSection?.title }}` (the bar label)
- `:163` `{{ section.title }}` (root rows)
- `:174` `{{ sub.title }}` (subsection rows)

Every other title surface in the app renders through it:
- `PaperSidebar.vue:80,100,116` — `<span v-html="renderTitle(section.title)" />` ×3
- `PaperView.vue:373` — the *mobile inline* nav, `<span v-html="renderTitle(section.title)" />`

What `renderTitle` does (`@mkbabb/latex-paper/dist/vue.js:3-8`):

```js
function createRenderTitle(renderInline) {
  return (text) => text.replace(/\$([^$]+)\$/g,
    (_, tex) => `<span class="math-inline">${renderInline(tex)}</span>`);
}
```

…and the parser **deliberately preserves `$…$` verbatim in `title`** — `chunk-A7GY23HR.js:84-91`:

```js
function cleanRawLatex(text, labelResolver) {
  const parts = text.split(/(\$[^$]*\$)/g);
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) continue;                    // ← math segments passed through untouched
    parts[i] = cleanProseSegment(parts[i], labelResolver);
  }
  ...
}
```
consumed at `chunk-A7GY23HR.js:719` `title: cleanRawLatex(astToText(node.title), …)`.

**Concrete failure.** Four `\subsection` titles in `paper/fourier_paper.tex` carry inline math, and all four are level-2 nodes — i.e. exactly the `sub` rows rendered at `:174`:

| tex line | title as stored in `sub.title` | mobile floating ToC shows |
|---|---|---|
| 1201 | `The Transform Pipeline: Fourier $\leftrightarrow$ Chebyshev $\leftrightarrow$ Legendre` | literal `$\leftrightarrow$` ×2 |
| 1440 | `Extending the Result to $\mathbf{L^2}[-L, L]$` | literal `$\mathbf{L^2}[-L, L]$` |
| 1603 | `$\mathbf{L}^2$ Convergence` | literal `$\mathbf{L}^2$` |
| 2560 | `Worked Example: $N = 30 = 2 \times 3 \times 5$` | literal `$N = 30 = 2 \times 3 \times 5$` |

The desktop sidebar renders these as typeset KaTeX. The mobile floating ToC — the *only* mid-document navigation surface below `lg` — renders LaTeX source to the reader of a mathematics paper.

**Falsifier.** (a) If `PaperSectionData.title` were pre-rendered, `PaperSidebar.vue:80` calling `renderTitle` on it would double-render — it does not; and `cleanRawLatex` is explicit that math is skipped. (b) If a global CSS/JS pass rewrote `$…$` in the DOM, this would be moot — `grep -rn "math-inline\|renderTitle" web/src` finds only the four call sites listed and no post-processor. (c) If no section title contained `$`, the prop would be merely dead — four do. The claim survives all three.

**Consequence for the axis.** This is simultaneously a *dead-prop* defect (unused declared surface), a *duplication* defect (three sibling call sites got it right), and a *correctness* defect. Cheapest cure: `v-html="renderTitle(x.title)"` at `:121,:163,:174`, matching `PaperSidebar.vue:80`. The `v-html` is safe here — the input is build-time-parsed LaTeX from a repo-owned `.tex`, identical to the trust boundary the sidebar already accepts.

---

### L-2 · BLOCKER · root sections are unreachable — the root row toggles and never navigates

`MobileFloatingToc.vue:155`:

```html
@click="sidebarState.toggleSection(section.id)"
```

The desktop twin, `PaperSidebar.vue:74`:

```html
@click="scrollTo(section.id); sidebarState.toggleSection(section.id)"
```

`toggleSection` is pure Set mutation — glass-ui `dist/sidebar.js`, function `d` inside `useSidebarState`:

```js
function d(e) { l(e) ? (s.delete(e), c.add(e)) : (c.delete(e), s.add(e)); }
```
No scroll. The composable's navigating member is `navigateTo` (`f(e){ t.scrollTo(e); }`), which this component **never calls** — see L-12.

Now the data. `paper/fourier_paper.tex` has **51 top-level `\section`** and **zero `\chapter`**, so `buildSections` (`chunk-A7GY23HR.js:816-819`) pushes all 51 to `topLevel`. Of those, **41 have no subsections** (computed by walking the heading sequence: a root is a leaf iff the next heading is also level-1 — Introduction:93, Fourier's Problem:134, Metric Spaces:651, Hilbert Space:789, … Chebyshev and Legendre Series via Polynomial Fitting:3370).

For those 41 rows, `:159` `v-if="section.subsections?.length"` suppresses the chevron, so there is **no affordance and no visible state change**: the tap flips a reactive Set that renders nothing, the dropdown stays open, the reader stays put. For the other 10, the row still cannot take you to the section's own start — only to its children.

**Net: the mobile floating ToC cannot navigate to any of the paper's 51 sections; 41 of its 51 primary rows are inert.**

**Falsifier.** (a) *"Root reachability lives in `PaperView`'s inline nav (`:363-375`, `navigateTo(section.id)`)."* — True, and it is why this is a BLOCKER rather than a total loss: that nav is `lg:hidden` **and** the floating ToC exists precisely because it has scrolled out of view (`PaperView.vue:320` `v-if="!mobileTocVisible"`). Mid-document on mobile the only remaining path to a root section is full-text search. (b) *"A default-expansion rule makes the toggle visible."* — `isExpanded` (glass-ui `sidebar.js`, `l`) returns `userCollapsed ? false : userExpanded ? true : toValue(activeRootId) === id`; for a childless section every branch renders an empty fragment. (c) *"`scrollTo` fires via a parent handler."* — `:150-164` has exactly one `@click`; nothing delegates on `.floating-toc-root` (`grep -rn "floating-toc-root" web/src` → this file only).

---

## §2 — MAJOR

### L-3 · MAJOR · `--section-color-${si}` indexes a 13-stop ramp with a 51-element loop — the active-section colour dies for 38 of 51 sections

`:154` `:style="activeRootId === section.id ? { color: \`var(--section-color-${si})\` } : {}"` where `si` is the `v-for` index at `:149`, ranging `0..50`.

The ramp is **13 stops, 0..12** — glass-ui `src/styles/tokens/color-radius.css:241-253` (light), `dark-arm.css:95-107` (dark), `light-dark.css:126-138`; fourier's `web/src/style.css:121,126` overrides only stop `5`. **Confirmed in the shipped build**: `grep -oh -- "--section-color-[0-9]*:" web/dist/assets/*.css | sort -u` → exactly `0…12`, nothing above.

For `si ≥ 13` the `var()` has no fallback and the custom property is unregistered, so the declaration is *invalid at computed-value time*; `color` being inherited, it resolves to `inherit` — the `.is-active` row silently renders in `var(--foreground)` (from `:371-374`) with no section tint. **38 of 51 root sections (74.5 %) lose the highlight.**

Same bug, same expression, in the desktop twin at `PaperSidebar.vue:77,96,112` — so this is a shared-idiom defect, not a mobile typo; but `:154` is this component's own line and this component's own regression.

**Falsifier.** (a) A `% 13` wrap anywhere would kill it — `grep -rn "section-color\|% 13\|SECTION_COLOR" web/src` returns only the four raw-`si` template sites. (b) A 51-stop ramp shipped by a newer glass-ui would kill it — the *installed* 4.0.0 and the *built* CSS both stop at 12. (c) If `sections` were shorter than 13 at runtime it would be latent — the tex has 51 roots and `PaperView.vue:120` passes `computed(() => paperSections)` unfiltered.

### L-4 · MAJOR · dropdown rows inherit `whitespace-nowrap` with no ellipsis, inside a container whose horizontal recovery is disabled

Three shipped facts, all from `web/dist/assets/`:

1. glass-ui `Button`'s cva base includes `whitespace-nowrap` (`button-BNDWhAZb.js`), and the utility **is emitted** — `index-57FkGzlZ.css` contains `.whitespace-nowrap{white-space:nowrap}`.
2. The scoped item rule sets no `white-space` and no `text-overflow` — `PaperView-FJog9X2r.css`:
   `.floating-toc-item[data-v-e92b0ff4]{cursor:pointer;text-align:left;width:100%;font-size:var(--text-base,1rem);…;display:block}` (source `:336-349`), with `.floating-toc-sub[data-v-e92b0ff4]{…padding-left:2.25rem;font-size:.8125rem}` (source `:364-368`) eating a further 36 px.
3. The container blocks the only recovery path — `.floating-toc-dropdown[data-v-e92b0ff4]{…overscroll-behavior:contain;touch-action:pan-y;max-height:60vh;…;overflow-y:auto}` (source `:293-307`). `overflow-y:auto` with unspecified `overflow-x` computes `overflow-x:auto` (CSS Overflow §3), so the box *can* scroll sideways — but `touch-action: pan-y` (`:305`) forbids a horizontal touch pan. Overflowing title text is therefore clipped and, on touch, unreachable.

The author already knows the idiom and applied it **one element away**: `.floating-toc-section[data-v-e92b0ff4]{text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;overflow:hidden}` (source `:223-229`) — the *bar* label is handled; the *dropdown rows*, which carry the same 51 titles, are not.

Worst offenders are unambiguous: `Complex Analysis of Orthogonal Polynomials and Green's Functions` (63 chars, tex:2187) at `1rem` in a ~360 px viewport minus 0.5 rem dropdown padding minus 0.75 rem item padding.

**Falsifier.** (a) If `whitespace-nowrap` were tree-shaken out of the build the rows would wrap and this dies — the built CSS shows it emitted. (b) If glass-ui reset `white-space` at higher precedence — `grep -rn "white-space" node_modules/@mkbabb/glass-ui/src/styles/*.css` → only `hover-popover.css:29` and `segmented-tabs.css:197`, neither on the button path. (c) The scoped rule is unlayered (`grep -c "@layer" PaperView-FJog9X2r.css` → `0`) at specificity (0,2,0) and simply never mentions `white-space`, so the (0,1,0) utility applies uncontested. — **The visual clipping itself is UNPROVEN-NEEDS-LIVE (SS-13); the cascade is proven.**

### L-5 · MAJOR · the search affordance is a bare `<span>` nested inside the trigger `<button>` — no role, no focus, no keyboard path

`:122-127`:

```html
<span class="floating-toc-actions">
  <span class="floating-toc-search-btn" @click.stop="openMobileSearch" title="Search paper">
    <Search class="h-3.5 w-3.5" />
  </span>
  <ChevronDown class="floating-toc-chevron" :class="{ 'rotate-180': floatingTocOpen }" />
</span>
```

The enclosing `Button` (`:117`) renders reka-ui `Primitive` with `as: "button"` default (`button-BNDWhAZb.js`, props `as: { default: "button" }`) — a native `<button>`. The whole bar is therefore **one focus stop**, and `Enter`/`Space` on it fires the bar's `@click` (toggle ToC), never the span's. The span is not focusable (no `tabindex`), carries no `role`, and its `title` supplies no accessible name to a non-interactive element. **Search is pointer-only on mobile.**

Every sibling in the paper subtree does this correctly with `<Button>`: `PaperSearchInput.vue:47,57`, `PaperSearchModal.vue:63,70`, `PaperSidebar.vue:54`, this same file at `:112` and `:138`.

**Falsifier.** (a) If glass-ui `Button` rendered a non-interactive root the nesting would be moot — `as` defaults to `"button"` and no `as`/`asChild` is passed at `:117`. (b) If a global handler bound `.floating-toc-search-btn` to a keyboard event — `grep -rn "floating-toc-search-btn" web/src` → this file only, style + template. (c) `@click.stop` handles the *pointer* propagation correctly; it does nothing for keyboards.

### L-6 · MAJOR · a second `PaperSearch` instance duplicates a body-`Teleport`ed modal against shared state; the mobile copy's scroll-into-view targets the desktop copy

`:111` mounts `<PaperSearch ref="mobileSearchRef" :search="search" variant="floating" />`. `PaperSearch.vue` renders **unconditionally** `PaperSearchInput` + `PaperSearchDropdown` + `PaperSearchModal` (`:24,31,35`), and `PaperSearchModal.vue:41` is `<Teleport to="body">` whose inner `v-if="search.isExpanded.value"` reads the *shared* `PaperSearchState` handed down from `PaperView.vue:111,328,347`.

`PaperSidebar.vue:51` mounts the other `<PaperSearch :search="search" variant="sidebar" />`, and `PaperSidebar` is hidden by **CSS only** (`PaperSidebar.vue:136` `display:none` + `:138-148` `@media (min-width:1024px)`), with no `v-if` at `PaperView.vue:335`. Both hosts are mounted at all viewports.

Therefore, whenever the mobile user opens search (`:86-91`) and then expands, **two identical `.search-modal-overlay` subtrees are teleported into `<body>`**. Consequences, all source-derived:

- Two `modalInputRef` watchers race to `.focus()` (`PaperSearchModal.vue:19-24`); last-mounted wins by accident of order.
- `PaperSearchModal.vue:29-35` resolves its scroll target with a **global** `document.querySelector(".search-modal-results")` — which returns the *first* match in document order, i.e. the desktop-origin modal. The visible mobile modal's keyboard-selected result therefore never scrolls into view.
- Two `<div class="search-modal-overlay">` at `z-index: var(--z-modal)` stack; `@click.self` on the top one toggles, leaving the lower one to be dismissed by the same state flip — benign today, but it is a second stacking-context participant nobody accounts for.

**Explicit contradiction of the adjudicated intake.** Row **R3-11** (`lane-fourier-r3-r6.md:85`) found the Codex instance registry "duplicates `PaperSearchModal`… (identical `callsiteId F.CS3.d06624ce…`, `PaperSearchModal.vue:41`)" and resolved it as a **registry join defect**, on the ground that the live tree has "exactly two `<Teleport` — `PaperSearchModal.vue:41` and `FullscreenViewer.vue:105`". I re-derived that grep and confirm the two `<Teleport` *declarations*. **But the duplicate is real at the level the registry claimed to model.** `PaperSearchModal` has **two mounted callsites** by way of two `PaperSearch` hosts — `PaperSidebar.vue:51` and `MobileFloatingToc.vue:111` — so a *mounted-instance* registry recording two `PaperSearchModal` teleports was closer to runtime truth than the module-level dedup that R3-11 preferred. R3-11's *join* diagnosis (identical `callsiteId` on both rows) still stands as a defect; its corollary — that the second row is spurious — does not. **F.W4 should count teleport instances per mounted host, not per `<Teleport>` declaration**, or it will under-count exactly this class.

**Falsifier.** (a) If `PaperSearchModal` were `v-if`-gated per variant, only one would exist — `PaperSearch.vue:35-37` passes only `:search`, no variant gate. (b) If `PaperSidebar` were `v-if`-mounted, the desktop copy would be absent below `lg` — `PaperView.vue:335-348` has no `v-if`; the hiding is `display:none`. (c) If `.search-modal-results` were queried within the component's own subtree the cross-talk would die — `PaperSearchModal.vue:31` uses `document.querySelector`, not a template ref, even though the sibling `PaperSearchDropdown.vue:24-28` correctly scopes its query to `resultsRef`.

### L-7 · MAJOR · two independent, permanently-divergent `useSidebarState` stores over the same tree

`:67-74` and `PaperSidebar.vue:38-45` each call `useSidebarState<PaperSectionData>({...})`. Each call constructs its **own** `reactive(new Set())` pair (glass-ui `sidebar.js`, `h`: `s = i(new Set()), c = i(new Set())`) and its **own** full `useTreeIndex` walk over all 51 roots + their subsections.

Because both hosts are mounted at every viewport (L-6 (b) above for `PaperSidebar`; `PaperView.vue:320` + `mobileNavRef`'s `lg:hidden` for this component — see L-9), the two expansion states run in parallel and never reconcile. A reader who expands §14 on a wide window and then narrows past `1024px` finds the mobile ToC collapsed, and vice versa. The composable exists — per this file's own comment at `:61-63` — to "discharge the user-expanded/user-collapsed reactive Sets that previously lived locally; symmetric with the desktop sidebar". It moved the duplication from *code* into *state*: two copies of the same logic became two copies of the same state.

The correct shape for a shared-tree UI is one `useSidebarState` instantiated by `PaperView` (which already owns `treeIndex`, `isActive`, `isInActiveChain` at `:48` and prop-drills them to `PaperSidebar` at `:343-345`) and passed to both ToCs — exactly the pattern already used for `search`.

**Falsifier.** If either host were `v-if`-gated on viewport, the divergence would collapse to "state resets on breakpoint crossing" (still a defect, one grade lower). Neither is: both are CSS-hidden. If glass-ui's composable used a module-level store, the two calls would share — `sidebar.js` allocates the Sets inside `h`, per call.

### L-8 · MAJOR · focus is dropped to `<body>` on every successful navigation

`:37-40` implements the correct restore:

```js
function dismissDropdown() { floatingTocOpen.value = false; nextTick(() => triggerEl()?.focus()); }
```
…and it is wired to exactly two paths: `@keydown.esc` (`:135`) and the backdrop click (`:186`).

The three paths that a reader actually uses do **not** restore focus:

- `:76-79` `selectSection(id)` — `floatingTocOpen = false; props.scrollTo(id)`
- `:81-84` `handleScrollToTop()` — `floatingTocOpen = false; props.scrollToTop()`
- `:93-96` `closeMobileSearch()` — `searchActive = false; props.search.close()`

In all three the focused element (the tapped dropdown `Button`, or the search-mode close `Button` at `:112`) is unmounted while focused, so focus reverts to `<body>`. Subsequent `Tab` restarts from the top of the document — the classic dismissal regression the `:36` comment ("A4 MED a11y discharge") was written to close. The discharge covered the two paths a keyboard tester exercises and missed the three a reader exercises.

**Falsifier.** (a) If `props.scrollTo` moved focus to the target heading, the loss would be intentional — `useScrollNavigation.ts:169-212` only calls `scrollTo({top,behavior})`; no `focus()`, no `tabindex` management anywhere in the file. (b) If Vue restored focus on unmount — it does not. (c) `dismissDropdown` is a one-line call away at all three sites, which is what makes the omission a defect rather than a design choice.

---

## §3 — MINOR

### L-9 · MINOR · `useScrollNavigation` reaches into this component's private scoped class; at `≥1024px` it reads `offsetHeight === 0` and every scroll target shifts 8 px

`useScrollNavigation.ts:23-26`:

```js
function getScrollOffset(): number {
    const bar = document.querySelector(".floating-toc-bar") as HTMLElement | null;
    return bar ? bar.offsetHeight + 8 : 16;
}
```

`.floating-toc-bar` is declared **only** in this file's `<style scoped>` (`:205-221`) and applied at `:110` and `:117`. A sibling module 246 lines away performs a global DOM query against a scoped class it does not own, with no contract, no data attribute, and no fallback for the class being renamed.

The measurable consequence: `MobileFloatingToc` is **mounted at desktop widths**. `PaperView.vue:320` gates it on `v-if="!mobileTocVisible"`; `mobileTocVisible` is driven by an `IntersectionObserver` (`:248-255`) on `mobileNavRef` — the `<nav>` at `:361`, which itself carries `lg:hidden`. A `display:none` target has no box; per the IntersectionObserver spec an initial observation is still queued, with `isIntersecting: false`. So at `≥1024px` `mobileTocVisible` latches `false` and this component mounts, hidden by its own `lg:hidden` (`:107`). Its `<button class="floating-toc-bar">` is then a descendant of a `display:none` box → `offsetHeight === 0` → `getScrollOffset()` returns **8**, not the intended **16** fallback. Every desktop ToC click, cross-reference click, and session restore lands 8 px nearer the viewport top than designed.

Also note the coupling is load-bearing in a way that reads as accidental: the search-mode bar at `:110` re-uses `floating-toc-bar` in its class list alongside `floating-toc-bar--search`, which is the only reason the offset survives the search swap.

**Falsifier.** (a) If IO delivered no initial record for a `display:none` target, `mobileTocVisible` would stay at its `ref(true)` initial (`PaperView.vue:146`), this component would never mount on desktop, and `getScrollOffset()` would correctly return 16 — the 8 px claim dies while the coupling claim survives. The spec requires the initial observation; **the desktop mount is UNPROVEN-NEEDS-LIVE (SS-13)** and is the single cheapest live probe in this challenge (`document.querySelector('.floating-toc-bar')` at ≥1024px). (b) If `.floating-toc-bar` also existed elsewhere, `querySelector` order would matter — it does not (`grep -rn "floating-toc-bar" web/src` → this file only).

### L-10 · MINOR · unguarded `{{ number }}.` renders a bare `.` for starred subsections and for the null bar state

`:173` `<span class="fira-code text-xs opacity-40">{{ sub.number }}.</span>` and `:162` (roots) and `:119` (bar) all emit the trailing `.` unconditionally. `PaperSidebar.vue:99,115` guards with `v-if="sub.number"`.

`PaperSectionData.number` is `string` (required — `latex-paper/dist/types/output.d.ts:63`), and the parser assigns the **empty string** to starred headings: `chunk-A7GY23HR.js:774`

```js
const number = (range.starred && !range.compiledEntry ? "" : range.compiledEntry?.number)
               ?? deps.counters.fallbackSectionNumber(range.level, fallbackCounters);
```
(`""` short-circuits `??`, so the fallback never fires.) The paper has **4** `\subsection*` — tex:1592, 1603, 1629, 1680, all under `\section{Convergence of Fourier Series}` (1587). Those four mobile rows render a naked leading `.`.

At `:119`, `currentSection` is `null` until the scroll tracker resolves (`PaperView.vue:240-245` returns `null` when `!activeRootId.value`), so the bar's first paint is a lone `.` with an empty title.

**Falsifier.** If `compiledEntry` existed for starred headings the branch would not fire — starred headings are absent from LaTeX's `.toc`, which is precisely why the ternary special-cases them. If `number` were optional, `{{ }}` would print `undefined` instead of empty — the type says required and the assignment says `""`.

### L-11 · MINOR · the scroll lock is a non-reentrant, cross-ownership inline-style write

`:45-52` and `:55-59` write `props.scrollContainer.style.overflow` on a DOM node owned by `PaperView` (`PaperView.vue:302` `ref="scrollContainer"`). Three separate problems, all latent today:

1. **Non-reentrant.** Restore is `= ''` (unconditional erase), not a saved-value restore and not a counter. Any second locker on `.paper-scroll` loses its lock when this one closes.
2. **Unconditional teardown.** `onUnmounted` (`:55-59`) clears `overflow` even when this component never locked. Because `PaperView.vue:318-330` mounts/unmounts this component on every scroll past the inline nav, that erase runs constantly.
3. **Ownership.** A child mutating a parent-owned element's inline style is the inverse of the pattern this same file uses correctly for everything else (props in, callbacks out). The parent has no way to know the lock exists — and `PaperView.vue:224-229` has a `ResizeObserver` on that exact element that will re-run `recalculate()` when the scrollbar gutter disappears under classic scrollbars.

**Falsifier.** `grep -rn "style.overflow" web/src` returns only `:47` and `:57` — no second writer exists today, which is why this is MINOR and not MAJOR. It becomes MAJOR the moment any modal adds a body/scroller lock.

### L-12 · MINOR · 3 of 5 `useSidebarState` inputs and 6 of 10 outputs are dead, and one input is knowingly wrong

Of the options passed at `:67-74`:
- `scrollTo` (`:71`) and `scrollToTop` (`:72`) feed only `navigateTo`/`scrollToTop` on the returned object — **never called**; `:78` and `:83` call `props.scrollTo`/`props.scrollToTop` directly, bypassing the composable.
- `activeId` (`:68`) is deliberately fed `props.activeRootId` — the comment at `:64-66` says so. That makes the returned `isActive`/`isInActiveChain`/`activeId` semantically wrong; they are never used, so the wrongness is inert but shipped.

The component consumes exactly `isExpanded` and `toggleSection`. Everything else — a full recursive `useTreeIndex` build over 51 roots plus every subsection, four closures, two computeds — is constructed on every mount and discarded.

**Falsifier.** `grep -n "sidebarState\." MobileFloatingToc.vue` → `:155` (`toggleSection`), `:158` and `:165` (`isExpanded`). Three uses, two members. If a future edit calls `sidebarState.isActive`, it will silently compare against the root id.

### L-13 · MINOR · three template-ref idioms in 104 script lines, plus a hand-rolled `$el` unwrapper whose declared type never matches the runtime value

- `:28` `useTemplateRef<HTMLElement | { $el?: HTMLElement }>("tocTrigger")` (Vue 3.5 idiom)
- `:23` `const dropdownRef = ref<HTMLElement | null>(null)` + string ref `:132` (legacy idiom)
- `:24` `const mobileSearchRef = ref<InstanceType<typeof PaperSearch> | null>(null)` + string ref `:111` (legacy idiom, component flavour)

`useTemplateRef`'s type parameter is an unchecked assertion. The runtime value at `:31` is a **`ComponentPublicInstance`** (glass-ui `Button` is a `<script setup>` SFC with no `defineExpose`), so `r instanceof HTMLElement` at `:33` is always `false` and the `.$el` branch always taken. The cast on `:31` (`as HTMLElement | { $el?: HTMLElement } | null`) re-asserts the type the ref already declares — pure noise.

It works only because glass-ui `Button` happens to render a single native root (`Primitive` with `as: "button"`). A future `Button` with a fragment root would make `$el` a text node and `focus()` would silently vanish — no type error, no runtime error.

**Falsifier.** If `Button` called `defineExpose({ $el })` or forwarded a real element ref the declared union would be honest — `button-BNDWhAZb.js` shows neither; the component body is `setup(r){ … return () => createBlock(Primitive, …) }`. Vue 3.5.38 (`node_modules/vue/package.json`) still supports the legacy string-ref-to-`ref`-variable binding, so all three idioms function; the defect is uniformity and type honesty, not breakage.

### L-14 · MINOR · `dismissDropdown` targets a trigger that `v-else` can have removed

`:117` is `<Button v-else ref="tocTrigger" …>` — it does not exist while `searchActive` is `true` (`:110-115` renders instead). `dismissDropdown` (`:37-40`) then resolves `triggerEl()` to `null` and the optional chain swallows it: focus is lost silently.

Unreachable today (`openMobileSearch` at `:87` closes the dropdown before entering search mode), so this is a latent guard, not a live bug — but the failure mode is *silent focus loss*, the same class L-8 documents as live.

**Falsifier.** If `tocTrigger` sat on a persistent wrapper rather than the `v-else` branch it would always resolve. If the two modes were mutually reachable with the dropdown open, this would be MAJOR — `:87` forecloses that, so MINOR.

### L-15 · MINOR · glass-ui `Button` is re-laid-out from consumer scoped CSS — used as an unstyled `<button>` shim

`:336-349` overrides twelve declarations on `.floating-toc-item`: `display`, `width`, `padding`, `border-radius`, `border`, `background`, `cursor`, `text-align`, `font-size` (`@apply text-base`, `:345`), `color`, and the full `transition`. The shipped rule confirms the override lands and is unlayered:

`.floating-toc-item[data-v-e92b0ff4]{…font-size:var(--text-base,1rem);…background:0 0;border:none;border-radius:.375rem;padding:.5rem .75rem;display:block}`

This defeats `btn-pill`'s entire geometry contract — `inline-flex`, `gap: calc(0.375rem * var(--ui-scale))`, `border-radius: var(--radius-pill)`, `padding: calc(0.5rem * --ui-scale) calc(1rem * --ui-scale)`, `font-size: var(--control-text)` (glass-ui `src/styles/glass/surfaces.css:118-135`) — including the `--ui-scale` comfort axis, which the component silently opts out of. `.floating-toc-bar` (`:205-221`) does the same to the trigger.

If the element is not a design-system button, it should be a `<button>`; if it is, the overrides belong upstream as a `Button` variant. This is the `feedback_glass_ui_first_class` / `feedback_root_styling` line, and it is also the mechanism behind L-4 (the override resets everything *except* `white-space`).

**Falsifier.** If the overrides were inert the rows would render as pills — the built CSS shows the scoped rule at (0,2,0), unlayered, so it wins outright. If glass-ui already shipped a full-width list variant this would be a missing-variant report rather than an override report; `button-BNDWhAZb.js`'s cva `variant` set (`default|solid|primary-audacious|gold-audacious|destructive|outline|secondary|accent|ghost|glass|glass-wash|…`) has none.

---

## §4 — INFO

### L-16 · INFO · zero `aria-*` and zero `role` in 397 lines; no landmark

`grep -n "aria-\|role=" MobileFloatingToc.vue` → **no matches**. The desktop twin has `PaperSidebar.vue:50` `<nav … aria-label="Table of contents">`.

Missing, concretely: `<nav>` (or `role="navigation"`) on `:107`; `aria-expanded` / `aria-controls` / `aria-haspopup` on the trigger `:117`; `aria-current="location"` on the active row `:153`; `aria-hidden="true"` on the backdrop `:182-186` (a click-only `<div>` with no keyboard equivalent — `Esc` covers dismissal, so this is a labelling gap rather than a trap).

**Falsifier.** If glass-ui `Button` injected ARIA it would partly cover the trigger — `button-BNDWhAZb.js` emits only `data-slot`/`data-variant`/`data-size` plus `type`/`disabled`. This is INFO rather than MAJOR because the A axis owns a11y; it is recorded here because the *code* surface (attributes absent from source) is a library-axis fact.

### L-17 · INFO · `useSidebarState`'s `sections` is a setup-time snapshot while its sibling options are reactivity-aware — an asymmetric contract

`UseSidebarStateOptions` (`useSidebarState.d.ts:3-21`) types `activeId` and `activeRootId` as `MaybeRefOrGetter<string | null>` with an explicit rationale comment, but `sections` as a bare `T[]`. The implementation builds `useTreeIndex(t.sections, …)` **once** (`sidebar.js`, `h`) and returns the same array as `sections`. Passing `props.sections` (`:68`) therefore pins the tree index to the array identity present at setup, while the template at `:149` iterates the *live* prop.

Latent only: `PaperView.vue:120` passes `computed(() => paperSections)` over a build-time module export (`paperContent.ts:7`), whose identity never changes. It becomes live the moment fourier gains a second paper, a filtered ToC, or an async content load.

**Falsifier.** If `useTreeIndex` were wrapped in a `computed` or the option accepted `MaybeRefOrGetter`, the snapshot would refresh — the minified `h` calls `u(t.sections, …)` eagerly at construction. If `paperSections` were reactive today this would be MAJOR; it is a frozen module export.

### L-18 · INFO · `<template v-for>` is a **third** loop-host kind — invisible to both R5-7's model *and* R6-5's cure

Intake **R5-7** (`lane-fourier-r3-r6.md:125`, verdict TRUE, ADOPT-AS-FACT) establishes that loop evidence keyed to *component* callsites is blind to native element loops, with `PaperSidebar.vue:65,87,105` as the exhibit; **R6-5** (`:139`) cures it with a `NATIVE_TEMPLATE_LOOP` family keyed to native elements.

This component has two loops, and they straddle the cure:

- `:167` `<Button v-for="sub in section.subsections" :key="sub.id" …>` — the `v-for` sits **on a component**, so R5-7's original component-callsite keying sees it.
- `:149` `<template v-for="(section, si) in sections" :key="section.id">` — the `v-for` sits on a **`<template>`**, which is neither a registered component callsite (R5-7's key) nor a native HTML element (R6-5's `NATIVE_TEMPLATE_LOOP` key). **It falls through both.**

That matters here specifically: `:149` is the loop that produces all 51 root rows and, through its nested `<template v-if>` at `:165`, gates the subsection loop. An instance denominator that misses it drops the entire mobile ToC subtree — the exact failure R5-7 described for the desktop sidebar, one abstraction over. **F.W4's per-component D/L/C audit must enumerate three loop-host kinds: component, native element, and `<template>`.**

Positive corroboration in the same breath: intake **R3-10** (`:84`) books `MobileFloatingToc:157` as one of the four surviving `dynamic-:is` families. The live tree confirms it exactly — `:157-161` is `<component :is="sidebarState.isExpanded(section.id) ? ChevronDown : ChevronRight" v-if="section.subsections?.length" class="floating-toc-collapse-icon" />`. R3-10 is re-verified at this coordinate.

---

## §5 — Viz render path: NOT TOUCHED (scope finding, no defect)

The axis asks for the canvas/WebGL path where this component touches it. **It does not touch it, and the negative is provable:**

- Census `CENSUS-2026-08-03.md` §3a [FE §6]: *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; `ConvergencePlot` with its own ungated rAF; `FrequencyGraph` watch-driven) + 12 SVG surfaces."* All three named surfaces live under `components/equation/` and `components/visualization/`, on the `/v/:slug`, `/equation`, `/morph` routes (`lane-frontend.md:42`).
- `grep -rn "canvas\|Canvas" web/src/components/paper/` → **zero hits**.
- `grep -c "canvas" node_modules/@mkbabb/latex-paper/dist/vue.js` → **0**; the paper renderer is HTML + KaTeX only.
- This component's own import list (`:2-8`) is: `vue`, glass-ui `button`, glass-ui `sidebar`, `lucide-vue-next`, `PaperSearch.vue`, and two type-only imports. No renderer, no rAF, no observer.

The **one** indirect coupling worth booking for F.W4: `:47`'s `overflow: hidden` on `.paper-scroll` is observed by `PaperView.vue:224-229`'s `ResizeObserver`, which fires `updateScrollViewportHeight() / updateSectionStartOffset() / recalculate()` on the virtual section window. Under classic (non-overlay) scrollbars, opening the ToC dropdown removes the gutter, changes the content box width, and triggers a full virtual-window recalculation mid-interaction. That is a layout path, not a viz path, and its live cost is **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Falsifier.** Any `<canvas>`, WebGL context, or `requestAnimationFrame` reachable from the `/paper` route through this component would break the claim. `grep -rn "requestAnimationFrame" web/src/components/paper/` returns only `useScrollNavigation.ts` (scroll correction, `:89,106,138,159,163,187,171`) and `PaperView.vue:171` (the reading-progress JS floor) — both scroll instrumentation, neither a render loop.

---

## §6 — Superlatives (L-18 runs both ways)

**S-1 · The unmount failsafe on the scroll lock is present and correctly shaped.** `:55-59` restores `overflow` on teardown — the single most-omitted line in every hand-rolled scroll-lock. Paired with the `watch` at `:45-52` it makes the close path idempotent. *Falsifier:* delete `onUnmounted` and any unmount-while-open (PaperView remounts this component on every scroll past the inline nav, `:318-330`) strands the paper unscrollable. The handler forecloses exactly that. The lock's *reentrancy* is separately defective (L-11) — the failsafe itself is right.

**S-2 · The iOS scroll-containment triad on the dropdown is complete, not partial.** `:303-305` ships `overscroll-behavior: contain` **+** `-webkit-overflow-scrolling: touch` **+** `touch-action: pan-y` together, and the shipped CSS confirms all three survive the build. Most implementations ship one. *Falsifier:* drop `overscroll-behavior` and the dropdown's scroll chains to `.paper-scroll` the instant it hits an end stop — which is the precise scenario the `:42` lock exists to prevent, meaning the CSS and the JS lock are two independent defenses of the same invariant. (`touch-action: pan-y` is also the mechanism in L-4 — correct for the vertical case, and the reason the horizontal overflow has no escape hatch.)

**S-3 · The transition discipline is genuinely token-clean.** `:246`, `:348`, `:384-385` all name their properties explicitly and use `--ease-standard` / `--ease-out-expo`. `grep -c "transition: all\|cubic-bezier" MobileFloatingToc.vue` → **0** — no `transition: all`, no raw beziers, in a 205-line style block. *Falsifier, honestly stated:* `:287` `transition: transform 0.2s ease;` is one residual raw `ease` keyword on `.floating-toc-chevron`, missed by the A.W3.d sweep that annotated its three neighbours. One exception in four sites; the superlative stands with the exception recorded.

**S-4 · The sticky root is zero-layout-cost by construction.** `:193-199` — `position: sticky; top: 0; height: 0; overflow: visible` with `.floating-toc-anchor` (`:201-203`) as the `position: relative` hook. The bar overlays content instead of reserving space, so the mount/unmount driven by `PaperView.vue:320` produces **no cumulative layout shift** — a real hazard for a component that mounts and unmounts on every scroll direction change. *Falsifier:* give `.floating-toc` any nonzero height and every mount pushes the article down by the bar height, mid-read. The `height: 0` is load-bearing and deliberate.

---

## §7 — Verdict

**DEFECTIVE.** The component fails at its stated purpose twice over:

- it is the mobile reader's only mid-document navigation surface, and **it cannot navigate to a section** (L-2 — 41 of 51 rows inert, 51 of 51 roots unreachable);
- it is the mobile reader's only mid-document view of the ToC of a *mathematics paper*, and **it renders the mathematics as LaTeX source** (L-1), while its desktop twin and its own parent's inline nav both render it typeset.

Both are one-line differentials against `PaperSidebar.vue` (`:74` and `:80`), which makes them regressions of an existing, correct pattern rather than unsolved problems. The six MAJORs beneath them are structural: a colour ramp indexed 4× past its length (L-3), a text-overflow contract that stops one element short of where it is needed (L-4), a pointer-only affordance (L-5), a duplicated body-teleported modal whose scroll query cross-talks (L-6), duplicated navigation state that diverges across the breakpoint (L-7), and focus dropped on every real interaction (L-8).

The component is not careless — S-1 through S-4 show genuine care in exactly the places that are hard (scroll locking, iOS containment, layout stability, motion tokens). The defects cluster where it *diverges* from its twin: every BLOCKER and three of six MAJORs are cases where `PaperSidebar.vue` does the right thing 200 lines away. **The cure and the audit lesson are the same: the two ToCs should share one state object and one row template, as they already share one `PaperSearchState`.**

**For the megatranche:** L-6 explicitly refines intake row **R3-11** (mounted-instance teleport duplication is real; count per host, not per declaration); L-18 explicitly extends **R5-7** / **R6-5** with a third loop-host kind (`<template v-for>`) that both the defect model and its cure miss; **R3-10**'s `MobileFloatingToc:157` row is re-verified exactly against the live tree.

**Live-probe queue for SS-13** (2 items only): (1) `document.querySelector('.floating-toc-bar')` non-null at ≥1024px — settles L-9's 8 px consequence; (2) horizontal clipping of a long dropdown row at 360 px — settles L-4's visible symptom. Everything else in this challenge is source- or build-artifact-derived.

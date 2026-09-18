claude-opus-5[1m]

# CHALLENGE · `PaperView` · axis **D** (DESIGN)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/PaperView.vue` (685 lines)
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every row below carries
severity · `file:line` · a falsifier. Superlatives carry the same burden (L-18 runs both ways).
**Tooling** static + source-derived only. No browser. Claims that only a live render can settle are
marked **UNPROVEN-NEEDS-LIVE (SS-13)**; everything else is decided off the tree, the installed
substrate, or the Vue runtime source.

---

## §0 · Method, closure, and the pin

### 0.1 The read closure (every file, read whole, read-only)

| Layer | Files |
|---|---|
| Target | `PaperView.vue` (685) |
| Direct children | `PaperSidebar.vue` (283) · `MobileFloatingToc.vue` (397) · `PaperArticleWindow.vue` (212) |
| Local modules | `paperTree.ts` (21) · `useScrollNavigation.ts` (246) · `lib/paperContent.ts` (7) |
| Search subtree (transitive) | `PaperSearch.vue` (397) · `search/usePaperSearch.ts` (108) · `search/PaperSearchInput.vue` (69) · `search/PaperSearchDropdown.vue` (70) · `search/PaperSearchModal.vue` (124) · `search/searchHelpers.ts` (74) |
| Substrate (installed) | `@mkbabb/glass-ui@4.0.0` — `dist/button-BNDWhAZb.js`, `dist/styles/{scroll-driven,tokens/*,utilities/*,glass/*}.css` |
| Substrate (producer, read-only evidence) | `/Users/mkbabb/Programming/glass-ui` @ `7.0.0` — `CHANGELOG.md`, `src/components/button/*`, `src/styles/scroll-driven.css`, `src/styles/utilities/responsive.css` |
| Substrate (upstream) | `@mkbabb/latex-paper@0.2.1` — `dist/vue.js` (`useVirtualSectionWindow`, `PaperSection`) |
| Cascade entry | `web/src/style.css` (143) |
| Vue runtime | `@vue/runtime-core/dist/runtime-core.esm-bundler.js` (`setScopeId`, `createBaseVNode`) |

### 0.2 The pin, and what the census break surface actually touches here

`web/package.json:14` pins `"@mkbabb/glass-ui": "^4.0.0"`; installed `4.0.0`; producer `7.0.0`.

The census's named break surface — **`metric-badge` ×7, `hover-card` ×2, `hover-popover` ×2, dock
members ×3, `ToastVariant`** (`CENSUS-2026-08-03.md:102-104`; `lane-frontend.md §9 ¶3-4`) — is
**measured absent from this entire closure**:

```
$ grep -rn "metric-badge|hover-card|hover-popover|glass-ui/dock|ToastVariant|glass-ui/toast" \
    web/src/components/paper/ web/src/lib/paperContent.ts
(no output)
```

The closure imports exactly three glass subpaths — `./button`, `./collapsible`, `./sidebar`
(`PaperView.vue:22`, `PaperSidebar.vue:6-8`, `MobileFloatingToc.vue:3-4`,
`PaperSearch{Input,Dropdown,Modal}.vue:3`) — **all three survive the 7.0.0 export-map cut** (producer
`package.json.exports` keyset). So the census's *export-map* risk for `PaperView` is **nil**.

**The real uplift break here is one the census does not book at all: the `Button` prop API is rewritten
whole at 7.0.0.** See §5 · B-3. This is a larger break surface for `PaperView` than every census row
combined, and it is invisible to an `exports`-keyset diff — precisely the failure mode the producer's
own CHANGELOG warns about for *member*-level removals (`CHANGELOG.md:44-48`), generalised one level
further to *props*.

### 0.3 Corpus rows folded (not re-derived)

- `lane-frontend.md:152` — PaperView at 685 LOC, `/paper` route shell. **AGREE**, live `wc -l` = 685.
- `lane-frontend.md:282-290` — the glass import inventory for the paper family. **AGREE**, line-exact.
- `lane-frontend.md:438` — `PaperSearch.vue` + `search/` as a 🟡 CANDIDATE SHADOW against glass's
  `./search`. **AGREE, and I raise it**: §1 B-1/B-2 show the local fork is not merely redundant, it is
  *broken*. The shadow disposition is no longer a tidiness question.
- `lane-fourier-r3-r6.md:R6-5` / `:139` — the three native `<li v-for>` rows at `PaperSidebar.vue:65,
  87, 105`. **AGREE**, verified live; those exact three loops are where §2 M-10's `whitespace-nowrap`
  overflow lands.
- `lane-fourier-r3-r6.md:R3-7a` / `:79` — 35 `Tooltip` callsites / 9 consumers, `PaperSidebar` = 2.
  **AGREE**, live `PaperSidebar.vue:70, 88`. Both sit on `@/components/ui/tooltip/Tooltip.vue`, the
  local adapter booked to F.W3.
- `lane-fourier-r3-r6.md:X-6` / `:157` — exactly two `<Teleport>` in the tree, one of them
  `PaperSearchModal.vue:41`. **AGREE on the count; I CONTRADICT the implicit reading that one source
  Teleport means one runtime Teleport** — §1 B-2 shows this source site instantiates **twice** at
  runtime off one shared state object.
- `lane-frontend.md:617` — *"JS gate · `paper/PaperView.vue:176` · `window.matchMedia?.(…)` —
  **smooth-scroll opt-out**"*. **CONTRADICTED, explicitly.** See §2 M-1.

---

## §1 · BLOCKERS (4)

### B-1 · BLOCKER · The expanded search modal is rendered with **no scope attribute**, so every one of its 26 scoped rules fails to match

**Where** `PaperSearch.vue:41` (`<style scoped>`) declares `.search-modal-overlay` (:239-250),
`.search-modal` (:252-264), `.search-modal-header` (:266-272), `-icon` (:274-279), `-input` (:281-290),
`-results` (:296-302), `-result` (:304-319), `-empty` (:321-326), `-footer` (:328-334), `-hint` +
`kbd` (:336-356), and the five `search-modal-*` transition classes (:359-396).
The markup those rules target lives in **`PaperSearchModal.vue:41-123`**, a file with **no `<style>`
block at all** (124 lines, `<script setup>` + `<template>` only).

**Why it fails.** Vue's scoped CSS reaches a child component's **root node only** — a documented,
single-node exception. `PaperSearchModal`'s root vnode is a `<Teleport>`, not an element. The Vue
runtime is explicit:

- `runtime-core.esm-bundler.js` · `createBaseVNode` sets `scopeId: currentScopeId`, and
  `currentScopeId = instance && instance.type.__scopeId || null`. `PaperSearchModal` has no `<style>`
  block ⇒ **no `__scopeId`** ⇒ every element it renders gets `scopeId = null`.
- `runtime-core.esm-bundler.js` · `setScopeId(el, vnode, scopeId, slotScopeIds, parentComponent)`
  walks the *parent's* id onto `el` **only** when `vnode === parentComponent.subTree`. For
  `.search-modal-overlay`, `parentComponent` is the `PaperSearchModal` instance and its `subTree` is
  the `Teleport` vnode — the div is a grandchild, never `=== subTree`.

Net: `.search-modal-overlay` and its whole subtree carry **no `data-v-*` attribute**, and
`.search-modal-overlay[data-v-<PaperSearch>]` matches nothing.

**Consequence.** `position: fixed; inset: 0; z-index: var(--z-modal)` is gone; the "modal" renders as
an ordinary in-flow block appended to `<body>` **after** `#app`, below a `min-height: 100dvh` app shell
(`style.css:18-23`). `<body>` is not the scroll container (`.paper-scroll` is, `PaperView.vue:458-465`),
so the content is unreachable: clicking **Expand** appears to do nothing.

**Failure scenario.** Desktop, light mode → focus the sidebar search → type `hilbert` → click the
`Maximize2` expand button (`PaperSearchInput.vue:47-57`) → `isExpanded` flips
(`usePaperSearch.ts:59-61`) → the modal mounts unstyled off-screen. The user sees the inline dropdown
vanish and nothing replace it.

**Falsifier** — inspect the live DOM for `.search-modal-overlay`. If it carries a `data-v-*` attribute
equal to `PaperSearch.vue`'s scope hash, this claim is dead. Static mechanism is CONFIRMED from the
runtime source; the exact painted result is **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Blast radius (same mechanism, same file).** The identical argument voids:
- `PaperSearchInput.vue`'s children — `.paper-search-icon` (:36), `.paper-search-input` (:37-46),
  `.paper-search-action-btn` (:51, :62). Only its **root** `.paper-search-input-wrap` (:35) is styled,
  by the child-root exception. So the sidebar search paints a bordered pill containing a **lucide
  default 24 px** icon and a **UA-default `<input>`** with no `font-family: inherit`, no `font-size:
  0.78rem`, no `border: none` — inside a 220 px rail (`PaperView.vue:562`).
- `PaperSearchDropdown.vue`'s roots — its template root is a **fragment** (`<Transition>` at :35 plus
  the backdrop `<div>` at :65), and `filterSingleRoot` rejects a two-element fragment, so no walk-up
  occurs either. `.paper-search-results` loses `position: absolute; top: calc(100% + 4px)`,
  `max-height: 50vh`, `overflow-y: auto`, its border and padding; `.paper-search-badge` /
  `-number` / `-label` / `-result` all lose their rules.

**Ownership** `PaperSearch.vue` (census 🟡 SHADOW, `lane-frontend.md:438`). Reached from `PaperView`
via `PaperSidebar.vue:51` **and** `MobileFloatingToc.vue:111`, and armed from `PaperView.vue:113-118`
(`⌘K` → `search.open()`).

---

### B-2 · BLOCKER · Two `PaperSearch` instances share one state object and each teleports its own modal to `<body>` — the expanded search renders **twice**

**Where** `PaperView.vue:111` constructs a single `usePaperSearch(...)` and passes the **same object**
to two consumers: `PaperSidebar` (`:347`) and `MobileFloatingToc` (`:328`). Each mounts
`PaperSearch.vue`, which unconditionally mounts `PaperSearchModal` (`PaperSearch.vue:35-37`), whose
root is `<Teleport to="body">` with `v-if="search.isExpanded.value"` **inside** the Teleport
(`PaperSearchModal.vue:41-44`).

**Why hiding does not help.** `PaperSidebar` has **no `v-if`** at `PaperView.vue:335` — it is always
mounted and hidden purely by CSS (`PaperSidebar.vue:135` `display: none`, lifted only at `≥1024px`,
`:138-149`). A `<Teleport to="body">` **physically relocates the node out of that subtree**, so the
ancestor's `display: none` no longer applies to it.

**Failure scenario (mobile, unambiguous).** Phone (`<1024px`) → scroll past the inline nav so
`mobileTocVisible` flips false (`PaperView.vue:145-147, 248-255`) and `MobileFloatingToc` mounts
(`:318-330`) → tap search (`MobileFloatingToc.vue:123`) → type → tap expand → `isExpanded` is
**shared**, so *both* the floating instance's modal **and** the display-none sidebar instance's modal
render into `<body>`. Two overlays, two `backdrop-filter: blur(6px)` composited on top of each other,
two `<input>`s racing `nextTick(() => modalInputRef.value?.focus())`
(`PaperSearchModal.vue:19-24`), and two copies of the ≤30-row result list
(`usePaperSearch.ts:35-37`).

**Desktop variant.** `MobileFloatingToc`'s only desktop suppressor is the child-owned `lg:hidden` on
its own root (`MobileFloatingToc.vue:107`) — `PaperView` applies **no viewport gate** to the mount at
`:319-320`. Whether it mounts on desktop depends on what `IntersectionObserver` reports for a
`display: none` target (`mobileNavRef` sits on the `lg:hidden` nav, `PaperView.vue:361`), which the
spec's edge-adjacency clause leaves genuinely ambiguous. **UNPROVEN-NEEDS-LIVE (SS-13)** for the
desktop arm; the mobile arm needs no observer at all and is certain.

**The structural defect is certain regardless:** a viewport-conditional component is mounted
unconditionally, its suppression is delegated to a CSS class it owns, and its `<Teleport>` defeats that
class.

**Falsifier** — count `.search-modal-overlay` in `document.body` with the search expanded on a
`<1024px` viewport. If the count is 1, this claim is dead.

---

### B-3 · BLOCKER (uplift) · glass 7.0.0 rewrites the `Button` API whole — **17 callsites** in this closure break, and the coarse-pointer 44 px floor silently detaches

**4.0.0 (installed)** — `dist/button-BNDWhAZb.js`: props `variant` (13 values incl. `glass`, `ghost`,
`link`) and `size` (incl. **`icon`**); reflects `data-variant` / `data-size`.
**7.0.0 (producer)** — `src/components/button/Button.vue:15-31`:

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // ← replaces `variant`
    tone?: Tone;
    size?: ButtonSize;           // ← "icon" is GONE
    iconOnly?: boolean;          // ← replaces size="icon"
    ...
}
```

`variant` no longer exists. `size="icon"` no longer exists. `data-variant` → `data-emphasis`
(`Button.vue:88`), and `data-size="icon"` → `data-size="md"` + `data-icon-only` (`:90-91`).

**Every callsite in the closure breaks (17):**

| File | Lines | `variant` | `size="icon"` |
|---|---|---|---|
| `PaperView.vue` | 364-368 (`link`, `sm`), 398-405 (`glass`, `icon`) | 2 | 1 |
| `PaperSidebar.vue` | 54-59, 71-78, 89-98, 106-114 | 4 (`ghost`) | 1 |
| `MobileFloatingToc.vue` | 112, 117, 138-142, 150-156, 166-172 | 5 (`ghost`) | 2 |
| `PaperSearchInput.vue` | 47-57, 58-67 | 2 (`ghost`) | 2 |
| `PaperSearchDropdown.vue` | 41-49 | 1 (`ghost`) | 0 |
| `PaperSearchModal.vue` | 61-69, 70-78, 83-91 | 3 (`ghost`) | 2 |
| **Total** | | **17** | **8** |

**Three compounding hazards, in ascending nastiness:**

1. **Hard typecheck break.** `variant` and `size="icon"` are not on `ButtonProps`. `vue-tsc -b` is the
   only automated gate in CI (`lane-frontend.md §9 ¶11`), so this at least *fails loudly*.
2. **The naive migration inverts the design.** Dropping `variant="ghost"` lands the 7.0.0 default
   `emphasis="secondary"` + `tone="neutral"`, and `Button.vue:47-51` makes that combination
   `glassMaterial === true` → `glass-wash glass-capsule` (`:67-71`). **Every table-of-contents row
   would become a glass capsule.** The correct mapping is `emphasis="quiet"`; `variant="link"`
   (`PaperView.vue:365`) maps to `emphasis="text"`; `variant="glass"` (`PaperView.vue:400`) maps to the
   *default*, not to any named value.
3. **Silent a11y regression.** The coarse-pointer 44 px floor moved selector:
   - 4.0.0 · `dist/styles/utilities/a11y-overrides.css:115-121` → `@media (pointer: coarse) {
     [data-size="icon"] { min-block-size: var(--touch-target, 2.75rem); min-inline-size: … } }`
   - 7.0.0 · `src/styles/utilities/responsive.css:3-7` → the same block keyed on
     **`[data-control-target]`**, which `Button.vue:92` emits **only when `iconOnly` is true**.

   Migrating `size="icon"` → `size="md"` **without** adding `iconOnly` drops `data-control-target`,
   and the floor evaporates. `.overlay-btn`'s hard `width/height: 2rem` (`PaperView.vue:588-589`) and
   `.sidebar-top-btn`'s `1.25rem` (`PaperSidebar.vue:188-189`) would then paint at 36 px and 22 px on
   touch. **WCAG 2.5.5 regresses as a side effect of a prop rename.**

**Fourth-order geometry break.** 7.0.0's `.button` uses `min-block-size: var(--button-size)`
(`src/components/button/styles.css:5-7`) rather than a `height` utility. `min-*-size` clamps upward and
is not defeated by specificity, so `.overlay-btn { width: 2rem; height: 2rem; border-radius: 50% }`
becomes **32 × 40 px — an oval, not a circle** — on desktop after the uplift.

**Falsifier** — read `glass-ui@7.0.0`'s published `dist/button.d.ts`. If `ButtonProps` still carries
`variant` or `size: "icon"`, every row above dies. (Source read: `src/components/button/index.ts:1-6`
exports only `ButtonProps` / `ButtonEmphasis` / `ButtonSize`; `CHANGELOG.md:47` books
`/button: ButtonVariants → ButtonProps / ButtonEmphasis / ButtonSize`.)

---

### B-4 · BLOCKER · The mobile search control is a click-only `<span>` nested inside a `<button>` — no keyboard path, no role, no name

**Where** `MobileFloatingToc.vue:117` opens a glass `Button` (a real `<button>`), and `:123-125` places
inside it:

```html
<span class="floating-toc-search-btn" @click.stop="openMobileSearch" title="Search paper">
    <Search class="h-3.5 w-3.5" />
</span>
```

**Four distinct failures in five lines:**

1. **WCAG 2.1.1 (Level A) — no keyboard operation.** No `tabindex`, no `role="button"`, no `@keydown`.
   A keyboard or switch user cannot reach it. `⌘K` (`PaperView.vue:113-118`) is a *different*
   affordance with no visible relationship to this icon and no hint anywhere in the mobile UI.
2. **Interactive-in-interactive.** A clickable region inside a `<button>` is a control-in-a-control;
   `@click.stop` means the *only* way to reach `openMobileSearch` is a pointer landing precisely on the
   span, while `Enter` on the focused parent runs `floatingTocOpen = !floatingTocOpen` instead.
3. **Accessible-name pollution.** For a `role=button` host, name-from-content beats `title`. The parent
   button's content is `"{number}. {title}"` (`:118-121`) **plus** this span, whose own name resolves
   from its `title` — so the trigger announces roughly **"3. Hilbert Space Search paper"**.
4. **Contrast.** `color: color-mix(in srgb, var(--muted-foreground) 50%, transparent)` (`:244`) — see
   M-9's method; ≈ **2.0 : 1** against the resting glass bar, failing WCAG 1.4.11 (3 : 1) for a
   meaningful UI glyph.

**Failure scenario.** iPad with a Magic Keyboard, Tab-only navigation: the user can reach the TOC
trigger and the dropdown rows, and can never reach search except by discovering an unadvertised `⌘K`.

**Falsifier** — Tab through the mobile floating bar. If focus ever lands on `.floating-toc-search-btn`,
row 1 dies (rows 2-4 stand independently).

---

## §2 · MAJOR (15)

### M-1 · MAJOR · Smooth scrolling — the largest motion in the component — is **never** `prefers-reduced-motion`-gated. *This contradicts the corpus.*

`lane-frontend.md:617` records:

> | JS gate | `paper/PaperView.vue:176` | `window.matchMedia?.(…)` — **smooth-scroll opt-out** |

**That characterisation is wrong.** `PaperView.vue:173-182` is `armProgressFallback()`; its `prm` read
at `:175-177` decides only whether to attach the **progress-bar** scroll listener. It has no
relationship to scrolling behaviour.

The actual smooth scrolls are in `useScrollNavigation.ts` and are **ungated**:

- `:191` — `s.scrollTo({ top, behavior: "smooth" })` on every short-jump navigation.
- `:242` — `scroller.scrollTo({ top: 0, behavior: "smooth" })` on every near "scroll to top".

Both animate the **entire viewport** across up to `max(clientHeight × 1.5, 1200)` px (`:64`) —
categorically larger motion than any of the 0.2 s opacity fades the file *does* annotate. Every TOC
click, every cross-reference click (`PaperView.vue:87-97`), every search result selection
(`usePaperSearch.ts:43-46`) triggers it.

**Falsifier** — grep `useScrollNavigation.ts` for `prefers-reduced-motion` / `matchMedia`: zero hits.
If a `scroll-behavior` media override exists globally, it would not help — an explicit
`behavior: "smooth"` argument **overrides** the CSS `scroll-behavior` property. Confirmed absent from
`style.css` (143 lines, read whole) regardless.

**Corpus disposition** — CONTRADICT `lane-frontend.md:617`; the PRM coverage table over-credits
`PaperView`. The real gap list is `stores/animation.ts` + `ConvergencePlot.vue` (already booked,
`lane-frontend.md §9 ¶9`) **plus `useScrollNavigation.ts:191, 242`**.

### M-2 · MAJOR · `PaperView` ships four motion recipes and **zero** `@media (prefers-reduced-motion: reduce)` blocks

`:511-513` (`.teleport-overlay` opacity), `:598-604` + `:607-616` (`.overlay-btn` — `transform: scale(1.05)` /
`scale(0.95)`), `:651-667` (`slide-down`, a `translateY(-100%)`), `:669-684` (`fade-scale`, a
`scale(0.8)`). Two of the four are **spatial**.

`lane-frontend.md §8` enumerates the tree's 8 CSS `reduce` blocks — `PaperView.vue` is **not** among
them. Its `<style scoped>` (`:414-685`, 271 lines) contains no `@media` other than the two
`min-width`/`max-width` layout blocks at `:531`/`:540`.

**Partial mitigation, honestly stated:** glass ships a blanket PRM clamp at
`dist/styles/utilities/a11y-overrides.css:6-17` which forces `transition-duration: 0.1s` and narrows
`transition-property` to `opacity, color, background-color, border-color, box-shadow` — so `transform`
transitions *are* dropped library-wide. **This is why the severity is MAJOR and not BLOCKER.** But the
component is then relying on an undeclared substrate behaviour it never cites, while every other motion
line in the file carries an explicit `A.W3.d` provenance comment. The reliance is accidental, not
designed — and it evaporates for anything the clamp does not reach (the `scrollTo` calls of M-1, the
`requestAnimationFrame` correction loop of `useScrollNavigation.ts:133-163`).

**Falsifier** — if `PaperView.vue` acquires a `reduce` block, or if the file's comments cite the glass
blanket clamp as the intended mechanism, this row narrows to INFO.

### M-3 · MAJOR · Session restore fires an **unrequested** animated scroll on page load

`PaperView.vue:264-270` (inside `onMounted` → `nextTick`):

```js
const saved = sessionStorage.getItem(SCROLL_POS_KEY);
if (saved && saved !== flatSections[0]?.id && flatSections.some(s => s.id === saved))
    performScroll(saved);
```

`performScroll` (`useScrollNavigation.ts:169-200`) picks `behavior: "smooth"` whenever
`distance < max(clientHeight × 1.5, 1200)` (`:183`). At mount `scrollTop === 0`, so any saved section
inside the first ~1200 px takes the **animated** path — an autoplaying viewport translation the user
did not initiate, un-gated by PRM (M-1), starting the moment the page paints.

Beyond motion: the restore is **section-granular only**. A reader who left mid-section is returned to
that section's *top*, potentially thousands of pixels from where they were. The state persisted at
`:137-138` is an `id`, never an offset.

**Falsifier** — set `SCROLL_POS_KEY` to a far section (`> 1200 px`) and the teleport path is taken
instead (instant, behind the overlay). The defect is specific to *near* restores, which are the common
case for a reader who left in the first chapter.

### M-4 · MAJOR · Under `prefers-reduced-motion`, the reading-progress bar is not *reduced* — it is **deleted**

Both writers are disarmed under PRM by construction:

- Native — `dist/styles/scroll-driven.css:36` wraps the whole `.scroll-progress` recipe in
  `@media (prefers-reduced-motion: no-preference)`.
- JS floor — `PaperView.vue:173-177` returns early when `prm`.

The element's terminal state is then its own author declaration, `transform: scaleX(0)`
(`PaperView.vue:491`). The bar is **permanently empty for the entire 47-page read**.

The file's comment (`:150-155`) argues *"a JS bar would defeat PRM"*. That reasoning does not hold: a
direct, non-interpolated `scaleX` write driven by the user's own scroll is a *response to direct
manipulation*, the same category as a scrollbar thumb — it is not the animation WCAG 2.3.3 asks to
reduce. The current design trades a non-violation for the loss of the only continuous progress
affordance, and it leaves a visibly broken-looking zero-width bar in place rather than hiding it.

**Falsifier** — with `prefers-reduced-motion: reduce`, scroll `.paper-scroll` to the bottom and read
`getComputedStyle(progressBar).transform`. If it is not `matrix(0, 0, 0, 1, 0, 0)`, this claim dies.
Mechanism is CONFIRMED-STATIC; the paint is **UNPROVEN-NEEDS-LIVE (SS-13)**. Minimum honest fix if the
current reading is kept: `visibility: hidden` the track under PRM so the bar does not read as broken.

### M-5 · MAJOR · The `slide-down` transition is a **no-op** — a percentage translate on a zero-height root

`PaperView.vue:659-666` animates `transform: translateY(-100%)` on the `<Transition name="slide-down">`
child. That child is `MobileFloatingToc`, whose root is `.floating-toc` with
**`height: 0`** (`MobileFloatingToc.vue:193-199`, `position: sticky; top: 0; height: 0; overflow:
visible`).

A percentage `translateY` resolves against the element's own border-box **height**. `-100%` of `0` is
`0px`. The named "slide" moves nothing; only the co-declared `opacity` (`:661, :666`) is visible. The
bar the user actually sees is the child `.floating-toc-bar` (`:205-221`), which is never transformed.

**Falsifier** — give `.floating-toc` a non-zero height, or measure the transition: if the visible bar
translates during enter/leave, the claim dies. Both facts are single-line and static.

### M-6 · MAJOR · The back button's accessible name is the **history digit**, not "Back"

`PaperView.vue:398-408`:

```html
<Button variant="glass" size="icon" class="overlay-btn overlay-back"
        @click="navigateBack" :title="`Back (${navStack.length} in history)`">
    <Undo2 class="h-3.5 w-3.5" />
    <span v-if="navStack.length > 1" class="overlay-badge">{{ navStack.length }}</span>
</Button>
```

`role=button` supports name-from-content, and content **outranks `title`** in the accessible-name
computation. Once `navStack.length > 1` the badge span renders text into the button, so the computed
name becomes **`"3"`**. The carefully-written `title` is used only in the `length === 1` case (where it
reads "Back (1 in history)" — itself odd, since the badge is deliberately suppressed at 1).

There is no `aria-label`. The same `title`-only pattern (without the name-clobbering badge) is at
`PaperSidebar.vue:59` and `MobileFloatingToc.vue:112, 123`.

**Falsifier** — compute the accessible name with any AOM inspector while `navStack.length ≥ 2`. If it
is not `"3"`, the claim dies. Fix is one attribute: `:aria-label="\`Back (${navStack.length} in history)\`"`
plus `aria-hidden="true"` on the badge.

### M-7 · MAJOR · In light mode the mobile TOC links have **no link affordance at all** — `--primary` is byte-identical to `--foreground`

`PaperView.vue:364-368` uses `<Button variant="link" size="sm">` for every mobile TOC row. At 4.0.0
that variant is exactly (`dist/button-BNDWhAZb.js`):

```
link: "text-primary underline-offset-4 hover:underline active:opacity-80 active:scale-100"
```

— colour `--primary`, underline **only on hover**. And in the light scheme
(`dist/styles/tokens/light-dark.css`):

```
:92   --foreground: light-dark(hsl(24 10% 10%), hsl(48 10% 90%));
:104  --primary:    light-dark(hsl(24 10% 10%), oklch(0.739 0.134 318.1));
```

**`hsl(24 10% 10%)` in both.** So in light mode `text-primary` paints ordinary body-black, on a
container the file already set to `text-muted-foreground` (`:361`) — the links are the *darkest* text
in the block with **no hue, no underline, no weight, no icon**. Nothing but position distinguishes 12
interactive rows from static prose. **WCAG 1.4.1 (Use of Color) — and there is not even a colour
difference to lean on.** Dark mode is fine (violet `oklch(0.739 0.134 318.1)`), so this is a
light-mode-only, always-on defect.

**Falsifier** — if `--primary` and `--foreground` ever diverge in light mode, or a static
`text-decoration: underline` is added, the claim dies.

**Upstream relay (BH/BI standing law).** `variant="link"`'s "colour + hover-underline" recipe is
*globally* non-conformant in glass-ui's light scheme for exactly this reason. Book as a glass-ui
coordination ask, not a fourier-local patch.

### M-8 · MAJOR · The page-position readout fails WCAG 1.4.3 at ≈ 2.9 : 1

`PaperView.vue:636-644` — `.overlay-page { @apply text-sm; color: color-mix(in srgb, var(--muted-foreground) 70%, transparent) }`.

Token chain: `--muted-foreground` = `--neutral-5` = `hsl(30 22% 40%)`
(`tokens/color-radius.css:45, 85`); page ground `--background` = `--neutral-0` = `hsl(40 30% 98%)`
(`:40, 57`).

Computed (sRGB alpha composite, then WCAG relative luminance):

| | sRGB | Y | contrast vs page |
|---|---|---|---|
| `--muted-foreground` @ 100 % | `#7c6650` | 0.1440 | **5.21 : 1** — matches the token's own comment at `:45` ✓ |
| same @ **70 %** over `--neutral-0` | `#a39282` | 0.3008 | **2.88 : 1** |

`text-sm` here is 14 px (desktop root 1 rem) or 15.75 px (mobile root 1.125 rem, `style.css:41-49`) —
normal text either way, so the floor is **4.5 : 1**. It fails even the 3 : 1 large-text floor.

This is the **only** surface in the product that reports the printed-page position of a 47-page paper.
The separator makes it worse: `.overlay-page-sep { opacity: 0.4 }` (`:646-649`) multiplies to an
effective 0.28 alpha ⇒ ≈ **1.5 : 1** for the `/` glyph.

**Falsifier** — the arithmetic above is fully reproducible from the two token values. If `.glass-wash`
on the same element (`:393`) darkens the local backdrop enough to lift the ratio past 4.5 : 1, the row
softens — but `.glass-wash` is the *lightest* rung of the glass ladder
(`dist/styles/glass/ladder.css:36`), a translucent light plate, so it moves the ratio the **wrong**
way. Exact painted ratio **UNPROVEN-NEEDS-LIVE (SS-13)**; the direction is certain.

**Fix that is already in the tree:** `--muted-foreground-strong` (= `--neutral-6`,
`hsl(28 24% 30%)`, **7.88 : 1**) exists at `tokens/color-radius.css:55, 89` precisely for "secondary
text that reads too-faint at the muted rung". Drop the alpha mix, use the rung.

### M-9 · MAJOR · Three more alpha-muted tokens fall below their floors (same method)

| Site | Declaration | Ground | Computed | Floor | Verdict |
|---|---|---|---|---|---|
| `PaperSidebar.vue:181` `.sidebar-label` ("Contents", 700, uppercase, 0.08em) | `color-mix(--muted-foreground 60%, transparent)` | `--card` `hsl(36 48% 97%)` (`light-dark.css:98`) | **2.39 : 1** | 4.5 : 1 (14 px bold is *not* large text) | **FAIL** |
| `PaperSidebar.vue:195` `.sidebar-top-btn` (the only scroll-to-top glyph in the sidebar) | `color-mix(--muted-foreground 45%, transparent)` | `--card` | **1.87 : 1** | 3 : 1 (WCAG 1.4.11) | **FAIL** |
| `MobileFloatingToc.vue:244` `.floating-toc-search-btn` | `color-mix(--muted-foreground 50%, transparent)` | `.glass-resting` bar | ≈ **2.0 : 1** | 3 : 1 | **FAIL** |

Plus, in the closure: `PaperSearch.vue:81` `::placeholder` at `color-mix(--muted-foreground 45%)`
(≈ 1.9 : 1) — placeholder text is text.

**Pattern, not incident.** Ten sites across the closure mute an *already-muted* token by alpha. glass
ships a **by-colour** rung for exactly this (`--muted-foreground-strong`, `tokens/color-radius.css:46-55`),
and its comment names the anti-pattern verbatim: *"By-COLOUR per the canon (a neutral step, not an
alpha mute)."* The component tree does the thing the substrate documents as wrong.

**Falsifier** — recompute any row from the two hsl values; the arithmetic is the whole claim. If a
consumer override of `--muted-foreground` exists, all four move together (none exists: `style.css`
overrides only `--viz-amber` and `--section-color-5`, `:119-131`).

### M-10 · MAJOR · `whitespace-nowrap` from the `Button` base is never reset — TOC titles cannot wrap in a 220 px rail

The 4.0.0 CVA base string (`dist/button-BNDWhAZb.js`) opens:

```
btn-pill tap-squish focus-ring whitespace-nowrap text-[length:var(--control-text)] …
```

`.sidebar-link` (`PaperSidebar.vue:216-233`) overrides `display`, `width`, `text-align`, `background`,
`border`, font-size, padding, radius, colour — **but never `white-space`**. Scoped rules cannot win a
property they do not declare, so `white-space: nowrap` stands on all three nesting levels
(`PaperSidebar.vue:71, 89, 106` — the exact `<li v-for>` rows the corpus authenticates at
`lane-fourier-r3-r6.md:R6-5`).

The column is **220 px** (`PaperView.vue:562`), less `0.625rem × 2` padding (`:161`) less a stable
scrollbar gutter (`:158`) ≈ **185 px** of text width. Live root titles include
*"Eigentheory Applied: SVD, PCA, and Compression"* and *"The Web Companion: Computational Pipeline"*;
live subsection titles include *"Complex Analysis of Orthogonal Polynomials and Green's Functions"*
(≈ 62 chars at `font-size: 0.78rem`, `:269`).

Because `.sidebar-nav` sets `overflow-y: auto` without an `overflow-x` (`:155`), the CSS overflow
rules compute `overflow-x` to `auto` — so the TOC gains a **horizontal scrollbar** and every long
chapter name is clipped at ~185 px.

**Corroboration from the file itself:** `:157` declares `overscroll-behavior-x: contain`. That property
is meaningful *only* on an element that scrolls horizontally — the author has already met this
overflow and patched a symptom of it.

**Falsifier** — set `white-space: normal` on `.sidebar-link` and the rail wraps. Or: if `.btn-pill`
(unread in this pass) declares `white-space: normal` at higher specificity than `.whitespace-nowrap`,
the claim dies — but both are single-class utilities, and the CVA emits them on the same element, so
source order in `@layer utilities` decides and Tailwind emits the explicit `whitespace-nowrap` for the
class actually present.

### M-11 · MAJOR · Every authored icon size in the closure is **inert** — `h-*`/`w-*` is not the documented escape hatch

The 4.0.0 CVA base ends with `[&_svg:not([class*=size-])]:size-(--ui-glyph)`, compiling to a
`(0,2,1)`-specificity descendant rule. Every authored size here is a `(0,1,0)` pair and **loses**:

| Site | Authored | Painted |
|---|---|---|
| `PaperView.vue:406` `<Undo2 class="h-3.5 w-3.5">` | 14 px | `--ui-glyph` = **16 px** |
| `PaperSidebar.vue:61` `<ChevronUp class="h-3 w-3">` | 12 px | **16 px** |
| `MobileFloatingToc.vue:113` `<X class="h-4 w-4">` | 16 px | 16 px (coincidence) |
| `MobileFloatingToc.vue:124` `<Search class="h-3.5 w-3.5">` | 14 px | **16 px** |
| `PaperSearchInput.vue:55, 56, 66` `h-3 w-3` ×3 | 12 px | **16 px** |
| `PaperSearchModal.vue:68, 77` `h-3.5 w-3.5` ×2 | 14 px | **16 px** |

The substrate documents the escape explicitly — `tokens/offsets-sizing.css:175-178`: *"KEEPING the
`:not([class*=size-])` host-sized-icon escape intact (an explicit `size-9` still wins)"*. The correct
spelling is `size-3.5`, not `h-3.5 w-3.5`. **8 of 9 icon sizings in this closure are dead code.**

The visible consequence is concentrated at `PaperSidebar.vue:185-189`, where a **16 px** glyph sits in
a **20 px** box with a 1 px border — 1.5 px of optical clearance per side.

**Falsifier** — read `getComputedStyle(svg).width` on any listed icon. If it is the authored value, the
specificity analysis is wrong. (7.0.0 keeps the same trap with a `>` combinator:
`src/components/button/styles.css:47-50`.)

### M-12 · MAJOR · Under `pointer: coarse` the sidebar header inflates ~3.5× and its glyph overflows its box

Two substrate blocks fire together on any touch-capable device at `≥1024px` (touch laptop, tablet in
landscape, convertible):

- `dist/styles/tokens/light-dark.css:17-21` → `:root { --ui-scale: 1.5; --control-floor: 2.75rem }`
- `dist/styles/utilities/a11y-overrides.css:115-121` → `[data-size="icon"] { min-block-size: 2.75rem;
  min-inline-size: 2.75rem }`

`PaperSidebar.vue:54-57` passes `size="icon"`, so `Button` reflects `data-size="icon"`
(`dist/button-BNDWhAZb.js`). `min-*-size` clamps **upward** and is not a specificity contest, so the
scoped `width/height: 1.25rem` (`:188-189`) is overridden: the scroll-to-top button becomes
**44 × 44 px inside a `display: flex; justify-content: space-between` header** (`:168-174`) whose
sibling is a 14 px label, in a 220 px column. And `--ui-glyph` becomes `1.5rem` = **24 px**, i.e. the
`ChevronUp` is **larger than the 20 px box the author drew for it**.

This is not a substrate bug — the floor is correct and desirable. It is a **conformance** defect: the
component hard-codes sub-rung geometry (`1.25rem`, vs `--control-h-xs` = `1.75rem` at minimum) and
therefore was never designed against the scale it opted into.

`PaperView.vue`'s own `.overlay-btn` (`:588-589`, `2rem`) is rescued by the same floor — see S-5.

**Falsifier** — emulate a coarse pointer and measure `.sidebar-top-btn`. If it stays 20 px, either the
`data-size` reflection or the media block is absent. Both are read directly from the installed dist.
Painted layout is **UNPROVEN-NEEDS-LIVE (SS-13)**; the computed box is certain.

### M-13 · MAJOR · The mobile TOC dropdown declares no relationship, no role, and no focus containment

`MobileFloatingToc.vue:117` — the trigger carries **no** `aria-expanded`, **no** `aria-controls`,
**no** `aria-haspopup`, despite `floatingTocOpen` being its entire purpose.
`:129-136` — the panel is a bare `<div tabindex="-1">` with **no** `role` (`menu` / `listbox` /
`dialog`), so its 12+ rows are announced as loose buttons in the document flow.
`:182-186` — the outside-click dismisser is an empty `<div>` with no `aria-hidden`.

Focus handling is half-built and its half is the wrong half: `:45-52` moves focus **into** the panel on
open and `:37-40` returns it to the trigger on Escape (both annotated "A4 MED a11y discharge") — but
nothing **contains** `Tab`, so the second Tab press lands in the page *behind* an overlay that is
covering it, with the scroll container frozen at `overflow: hidden` (`:47`).

**Falsifier** — open the dropdown, press Tab twice, read `document.activeElement`. If it stays inside
`.floating-toc-dropdown`, the containment half of this row dies; the four missing ARIA attributes are
static and stand regardless.

### M-14 · MAJOR · The component orders a glass control and then overrides **every** glass property of it

`PaperView.vue:398-400` asks for `variant="glass" size="icon"`. `:582-616` then re-declares, at
scoped `(0,2,0)` / `(0,3,0)` specificity, the entire surface the variant exists to provide: `width`,
`height`, `border-radius`, `border`, `background`, `backdrop-filter`, `color`, `box-shadow`, and both
`:hover` and `:active` treatments.

What survives from glass is `focus-ring`, `tap-squish`, the `<button>` element, and the coarse floor
of S-5. `glass-wash btn-glass`, the `--glass-bg-resting` / `--glass-bg-floating` hover-active pair, and
`btn-pill` are all defeated. This is a hand-rolled control wearing a design-system label — the exact
pattern `feedback_glass_ui_first_class` forbids.

Same shape, less completely, at `PaperSidebar.vue:185-205` and `MobileFloatingToc.vue:205-221, 336-349`.

**Cost is not aesthetic.** It is the whole of B-3: because the visual contract lives in 271 lines of
scoped CSS instead of in props, the uplift's prop rename cannot be a mechanical edit — every override
must be re-adjudicated against 7.0.0's `emphasis`/`tone`/`iconOnly` axes.

**Falsifier** — delete `variant="glass"` and diff the render. If anything changes beyond the focus ring
and the press squish, the claim is overstated.

### M-15 · MAJOR · Every shadow in the closure re-types a token by hand, losing dark-mode awareness

| Site | Literal | Token that already exists |
|---|---|---|
| `PaperView.vue:525` `.paper-article` | `3px 3px 0px 0px color-mix(in srgb, var(--foreground) 8%, transparent)` | **`--shadow-cartoon`, byte-identical** (`tokens/shadow.css:9`) |
| `PaperSidebar.vue:165` `.sidebar-nav` | the same string again | same token |
| `PaperView.vue:597` `.overlay-btn` | `0 2px 8px rgba(0,0,0,0.08)` | `--shadow-sm` = `0 2px 8px color-mix(--shadow-color 6%)` (`:26`) |
| `PaperView.vue:610` `.overlay-btn:hover` | `0 4px 12px rgba(0,0,0,0.12)` | `--shadow-soft` = `0 4px 12px rgba(0,0,0,0.1)` (`:11`) |
| `MobileFloatingToc.vue:300` | `0 4px 16px rgba(0,0,0,0.1)` | `--shadow-md` = `0 4px 16px color-mix(--shadow-color 8%)` (`:27`) |
| `PaperSearch.vue:114, 260-262` | `0 4px 16px rgba(0,0,0,0.1)`, `0 8px 40px…` | `--shadow-md`, `--shadow-modal` (`:13`) |

Two distinct harms:

1. **Dark mode.** The `rgba(0,0,0,…)` literals are pure black. Over the dark `--card`
   (`hsl(24 8% 16%)`, `light-dark.css:98`) a black shadow is invisible — the back button, the floating
   TOC panel and the search dropdown all **lose their elevation entirely in dark mode**, while the
   token forms resolve through `--shadow-color` and stay legible.
2. **The cartoon stamp is doubly re-forked.** `style.css:99-117` already carries a `@utility
   cartoon-card` shim (border + `cartoon-surface` stamp + `--border`/`--card`) written expressly to
   restore this recipe, and both paper plates hand-inline the underlying shadow instead of using
   either the shim or `--shadow-cartoon`. Three spellings of one idea in one product.

**Falsifier** — compare the literals to `tokens/shadow.css:9-13, 26-28`; row 1 is an exact string
match. If `--shadow-color` is undefined in this consumer the token forms would degrade — it is defined
(`tokens/shadow.css`, read whole).

---

## §3 · MINOR (18)

**m-1 · The `h1` type ramp *shrinks* across the `md` breakpoint.** `PaperView.vue:353-355` steps
`text-4xl → sm:text-5xl → md:text-[3.25rem]`, while `style.css:41-49` drops the root from `1.125rem`
to `1rem` at exactly `768px`. Painted: **40.5 px** (<640), **54 px** (640-767), **52 px** (≥768). The
title gets *smaller* as the viewport gets larger. *Falsifier:* if the root sizing breakpoint moves off
768 px, or the `md:` step becomes `text-6xl` (3.75 rem ⇒ 60 px), the inversion clears.

**m-2 · Two off-ramp arbitrary values on the one hero element.** `md:text-[3.25rem]` and
`leading-[1.15]` (`:354`). `3.25rem` sits between `text-5xl` (3) and `text-6xl` (3.75) with no scale
membership; glass ships a φ-display ladder (`--type-display-*`, `tokens/offsets-sizing.css:121-124`)
that is deliberately excluded from `--ui-scale` for exactly this role. *Falsifier:* name the rung
`3.25rem` belongs to.

**m-3 · The masthead is top-crowded.** `PaperView.vue:352` gives the header `mb-10 lg:mb-20`; the plate
gives it `2rem` of top padding at ≥640 px (`:533`). Optical ratio **1 : 2.5** (2 rem above, 5 rem
below) — the title floats against the plate edge. *Falsifier:* measure; if the intended reading is a
deliberate top-anchored masthead, the row is INFO.

**m-4 · `.mobile-toc-link` is a dead class.** Applied at `PaperView.vue:367`; zero rules in the SFC,
zero in `src/`, zero in glass's 40 stylesheets. *Falsifier:* `grep -rn "mobile-toc-link"` → one hit,
the application site.

**m-5 · The article column's declared `48rem` maximum is unreachable.** `:562` sets
`minmax(0, 48rem)`; the container is `max-w-5xl` (64 rem) with `sm:px-6` (`:332`), so free width is
`64 − 3 − 13.75 (220px) − 2 (gap)` = **45.25 rem**. The `48rem` bound never binds; the real measure is
2.75 rem narrower than the number the file states. *Falsifier:* if `max-w-5xl` is retuned above
66.75 rem the bound engages.

**m-6 · One of two `<nav>` landmarks is unnamed.** `PaperSidebar.vue:50` carries
`aria-label="Table of contents"`; its mobile twin at `PaperView.vue:361` carries none. *Falsifier:*
add the label; the asymmetry is the whole claim.

**m-7 · Radius discipline is half-applied.** `.sidebar-link` correctly reads
`calc(var(--radius) - 2px)` (`PaperSidebar.vue:227`), while `.paper-article` (`:522`), `.sidebar-nav`
(`:162`), `.overlay-page` (`:641`), `.overlay-badge` (`:622`) and `.paper-progress-bar` (`:497`) use
`0.75rem` / `0.375rem` / `8px` / `1px` literals. glass ships a `--radius-*` ladder
(`tokens/color-radius.css §4`). *Falsifier:* one file, six declarations, trivially enumerable.

**m-8 · Relative type inside a fixed-pixel pill.** `.overlay-badge` (`:618-634`) sets `height: 16px`,
`min-width: 16px`, `line-height: 1` and `@apply text-sm`. On mobile (root 1.125 rem) `text-sm` is
**15.75 px** in a **16 px** box — 0.25 px of total vertical slack, before any fallback face with taller
metrics. *Falsifier:* if `--text-sm` is retuned, or the box goes relative, it clears.

**m-9 · `text-rendering: optimizeLegibility` over a virtualised 47-page tree.** `:518`. The property
forces full ligature/kerning shaping and is the documented CLS/perf hazard for long documents — set on
the exact subtree `PaperArticleWindow.vue:141-168` spends 26 comment lines deferring with
`content-visibility: auto`. The two decisions pull opposite ways. *Falsifier:* measure shaping cost on
a section mount; **UNPROVEN-NEEDS-LIVE (SS-13)**.

**m-10 · `--section-color-${si}` has no fallback and one stop of headroom.** `PaperSidebar.vue:77, 96,
112` and `latex-paper`'s `PaperSection` (`--_section-color`) index the palette by root index. glass
ships **13** stops, `--section-color-0..12` (`tokens/color-radius.css:241-253`). The source has 11
`\chapter` plus pre-chapter sections (`paper/fourier_paper.tex`) ⇒ ~12 roots. A 14th root makes
`var(--section-color-13)` invalid-at-computed-value-time, so `color` silently **inherits** and the
active row loses its identity with no error. *Falsifier:* today `roots ≤ 13`, so this is fragility, not
a live defect — stated as such.

**m-11 · There is no empty state.** With zero sections: `currentPage` falls to `1` and `totalPages` to
whatever the virtual module emits ⇒ the pill reads **`pg 1/0`** (`:394`); the sidebar renders a
"Contents" heading over an empty `<ol>`; the article renders a titled plate with nothing in it; and
`MobileFloatingToc.vue:118-121` renders a **lone `"."`** (`{{ currentSection?.number }}.` with a null
section). The author's own optional chaining at `PaperView.vue:121, 137, 267` shows emptiness was
contemplated; nothing handles it. *Falsifier:* if the build hard-fails on an empty corpus this is
unreachable — nothing in `lib/paperContent.ts` (7 lines) asserts non-emptiness.

**m-12 · A child mutates the parent's DOM node.** `MobileFloatingToc.vue:45-52` writes
`props.scrollContainer.style.overflow` directly on `PaperView`'s `.paper-scroll` element, and
`:55-59` restores it. Correct today, but the ownership is inverted and the restore is `''` (stylesheet
value), which silently assumes no other writer. *Falsifier:* an `overflow` prop or an emitted
lock/unlock event removes the coupling without changing behaviour.

**m-13 · The edge fades are double-attenuated.** `:436-456` composes a `linear-gradient(… 55%,
transparent 70%)` **and** a `mask-image: linear-gradient(black, transparent)` over the same 2 rem band.
The two ramps multiply, so the effective wash collapses to a much shorter hard-ish edge than either
curve alone describes. *Falsifier:* drop either the mask or the gradient's own `transparent 70%` stop
and compare; the redundancy is visible in the two declarations.

**m-14 · The A.W3.d easing sweep left five holdouts.** `PaperView.vue` is clean (every transition names
its properties and a canonical token), but the closure still carries raw beziers:
`PaperArticleWindow.vue:199` (`transform 0.2s ease, box-shadow 0.2s ease`),
`MobileFloatingToc.vue:287` (`transform 0.2s ease`), `PaperSearch.vue:55` (`border-color 0.15s ease`),
`:94` (`color 0.12s, background 0.12s` — also two unnamed-duration shorthands), `:130`
(`background 0.1s ease`). *Falsifier:* grep the closure for `s ease` → five hits.

**m-15 · The heading outline flattens below depth 1.** `latex-paper`'s `PaperSection` renders
`depth > 0 ? "h3" : "h2"` (`dist/vue.js`, `PaperSection` render). `PaperView` feeds it a
three-level tree (`PaperArticleWindow.vue:80`; the sidebar renders all three at
`PaperSidebar.vue:65/87/105`), so sub-subsections announce as **peers** of subsections. Upstream-owned;
`PaperView` is the consumer that supplies the depth. *Falsifier:* if `depth ≥ 2` never occurs in this
corpus, the flattening is unreachable — the sidebar's third `v-for` level proves it does.

**m-16 · PRM is sampled once, at mount, with no change listener.** `PaperView.vue:174-177` reads
`matchMedia(...).matches` inside `armProgressFallback()` and never subscribes. A user who turns
reduce-motion **off** mid-session on a non-`scroll()`-timeline engine never gets the bar back. (The
inverse direction self-heals, since the native recipe's media query is live.) *Falsifier:* narrow
window; INFO-adjacent by design.

**m-17 · `title` is the sole label on four icon-only controls.** `PaperView.vue:404`,
`PaperSidebar.vue:59`, `MobileFloatingToc.vue:112, 123`. `title` is the last-resort accname source, is
not surfaced on touch, and (per M-6) is clobbered by any text content. *Falsifier:* replace with
`aria-label`; behaviour identical, exposure fixed.

**m-18 · The dropdown backdrop does not cover the bottom overlay.** `.floating-toc-backdrop` is `z: 1`
inside `.floating-toc`'s `z: var(--z-controls)` = 20 stacking context
(`MobileFloatingToc.vue:196, 309-313`), while `.paper-bottom-overlay` is a **later sibling** also at
`z: 20` (`PaperView.vue:573`). Later sibling at equal z wins, so the back button and page pill stay
live and clickable *under* an open modal-ish dropdown, and clicking them does **not** dismiss it.
*Falsifier:* tap the back button with the TOC open; if it dismisses, the claim dies.

---

## §4 · INFO (5)

**i-1 · The search surface has zero automated coverage.** `web/e2e/` holds 8 specs; none references
`search-modal`, `paper-search`, or the search flow (`grep -rln` → no hits). There is no vitest runner
(`lane-frontend.md §9 ¶11`). B-1 and B-2 are both silently shippable as a direct consequence.

**i-2 · The progress-bar comment out-runs the 4.0.0 recipe it cites.** `PaperView.vue:303-312` and
`:467-473` describe a sticky host; the installed recipe's own comment sanctions
`position: fixed/absolute` only (`dist/styles/scroll-driven.css:34-35`). Harmless — 7.0.0 amends the
comment to *"fixed/absolute/**sticky**"* (`src/styles/scroll-driven.css:48`), i.e. the producer
ratified this consumer's usage.

**i-3 · `sections` is a constant wrapped in a `computed`.** `PaperView.vue:120` —
`computed(() => paperSections)` over a module-level import that never changes.

**i-4 · `.paper-scroll { max-width: 100dvw }`** (`:464`) is inert under `flex: 1` in a column flex
parent with `overflow-x: hidden`.

**i-5 · The mobile TOC hangs 0.75 rem right of the text block.** `Button size="sm"` carries `px-3`
(`dist/button-BNDWhAZb.js`) inside an `<ol class="pl-0">` (`:362`), so every TOC row's left edge sits
12 px inboard of the body measure that begins immediately below it.

---

## §5 · The `4.0.0 → 7.0.0` uplift ledger for this component

| # | Surface | Under the pin (4.0.0) | After F.W1 (7.0.0) | Verdict |
|---|---|---|---|---|
| U-1 | `Button` props · 17 callsites | `variant` + `size="icon"` | both **removed** → `emphasis`/`tone`/`iconOnly` (`src/components/button/Button.vue:15-31`) | **BREAKS — BLOCKER, §1 B-3.** Not booked by the census. |
| U-2 | Coarse 44 px floor | `[data-size="icon"]` (`utilities/a11y-overrides.css:115`) | `[data-control-target]`, emitted only when `iconOnly` (`Button.vue:92`, `utilities/responsive.css:3-7`) | **BREAKS silently** if `size="icon"` → `size="md"` without `iconOnly`. |
| U-3 | `.overlay-btn` geometry | scoped `width/height: 2rem` wins | 7.0.0 `.button` uses `min-block-size: var(--button-size)` (`styles.css:5-7`) → clamps to 2.5 rem | **BREAKS visually** — the 50 % circle becomes a **32 × 40 oval**. |
| U-4 | `--scroll-progress-scroller: nearest` (`PaperView.vue:499`) | required — 4.0.0 defaults the scroller to `root` (`scroll-driven.css:45`) | **property no longer read**; 7.0.0 takes a full-value `--scroll-progress-timeline` and defaults to `scroll(nearest block)` (`src/styles/scroll-driven.css:74`) | **IMPROVES** — the override becomes dead but the default is already what this component wants. Delete the line at uplift. |
| U-5 | `.scroll-progress` resting state | recipe has **no** unconditional rest; the component supplies its own `transform: scaleX(0)` (`:491`) | 7.0.0 **hoists** `transform-origin` + `scaleX(0)` unconditional (`src/styles/scroll-driven.css:63-66`) | **IMPROVES** — the local guard becomes redundant. See S-1. |
| U-6 | `./button`, `./collapsible`, `./sidebar` | present | **all three survive** the 11-key cut (producer `exports`) | **NO CHANGE.** |
| U-7 | Census break rows (`metric-badge` ×7, `hover-card` ×2, `hover-popover` ×2, dock ×3, `ToastVariant`) | — | — | **DOES NOT TOUCH THIS COMPONENT** (measured, §0.2). |
| U-8 | `.deferred-section` + `--deferred-section-size` | present (`utilities/base.css:477-480`) | present (`src/styles/utilities/base-misc.css:174-177`) | **NO CHANGE.** |
| U-9 | `ui/tooltip` adapter ×2 (`PaperSidebar.vue:70, 88`) | local adapter | `./tooltip` survives at 7.0.0 | **NO CHANGE**; F.W3 migration budget per `lane-fourier-r3-r6.md:R3-7a`. |
| U-10 | `PaperSearch` family (832 LOC) | local fork | `./search` at both versions; 7.0.0 adds `useDockSearch`/`useFuzzySearch` | **DISPOSITION FORCED** — B-1 makes "keep the fork" a repair obligation, not a preference. |

**Sequencing consequence.** U-1 + U-2 mean the uplift cannot be a mechanical prop rename for this
component: 17 callsites and 271 lines of surface-overriding scoped CSS (M-14) must be re-adjudicated
together, and the `iconOnly` flag must be carried on all 8 icon buttons or WCAG 2.5.5 regresses. Budget
`PaperView` as a **named unit of F.W1**, not as a leaf of a global find-and-replace.

---

## §6 · SUPERLATIVES (6) — held to the same burden

**S-1 · The consumer shipped the producer's fix first.** `PaperView.vue:485-491` declares
`transform-origin: 0 50%` **and** `transform: scaleX(0)` unconditionally on the bar. Under 4.0.0 the
glass recipe declares neither outside its `@supports`/PRM guards
(`dist/styles/scroll-driven.css:36-48`) — so an unguarded consumer paints a **full-width** bar on any
unsupported/PRM path. glass 7.0.0 hoists exactly these two declarations and its comment names the
hazard: *"HOISTED UNCONDITIONAL so the rest is INVISIBLE (scaleX 0) on ANY unsupported / invalid / PRM
path"* (`src/styles/scroll-driven.css:52-56, 63-66`). This component had it right one major version
early. *Falsifier:* if 4.0.0's recipe carries an unconditional rest, the local guard is redundant
rather than prescient — it does not (`scroll-driven.css` read whole, 4.0.0).

**S-2 · A cross-repo comment that is verifiable line-for-line.** `PaperArticleWindow.vue:144-166`
claims the `content-visibility` recipe "comes from glass-ui's canonical `.deferred-section` utility …
the glass-ui rule even names fourier γ as a consumer," and argues the `auto` prefix on
`contain-intrinsic-size` is what keeps `offsetHeight` measurement honest. All three check out:
`dist/styles/utilities/base.css:462-480` declares the rule, literally names *"(fourier γ, muster,
speedtest, words)"*, and states the same measurement-safety argument — and `useVirtualSectionWindow`
does measure via `el.offsetHeight` (`latex-paper/dist/vue.js`, `measureSection`). A consumer comment
that survives a substrate audit is rare. *Falsifier:* any of the three citations failing.

**S-3 · The dual-path/single-writer discipline is real, not decorative.** `PaperView.vue:157-158`
feature-detects with `CSS.supports("animation-timeline", "scroll()")` — the **exact** predicate of the
recipe's `@supports (animation-timeline: scroll())` (`scroll-driven.css:37`) — and
`armProgressFallback` (`:173-182`) refuses to attach when it holds. There is provably no frame in which
both writers touch `transform`. *Falsifier:* a predicate mismatch (e.g. detecting `view()` instead)
would admit a double-write; there is none.

**S-4 · Motion tokens are near-total in the target file.** All four transitions in `PaperView.vue`
(`:511-513, 598-604, 654-657, 671-674`) name their properties explicitly, carry a canonical easing
token (`--ease-out-expo` / `--ease-standard`), and cite their provenance (`A.W3.d`). **Zero
`transition: all`** in 685 lines. *Falsifier:* m-14 shows five raw-bezier holdouts survive in the
**closure** — so the discipline is complete in the target and incomplete one level down. Both halves
stated.

**S-5 · The substrate's coarse floor rescues the hand-rolled geometry — and I checked before
accusing.** `.overlay-btn` hard-codes `2rem` (`:588-589`), 36 px at the mobile root — which *looks*
like a WCAG 2.5.5 failure. It is not: `Button` reflects `data-size="icon"`, and
`utilities/a11y-overrides.css:115-121` clamps it to `2.75rem` under `pointer: coarse` via
`min-*-size`, which is a used-value clamp, not a specificity contest. The claim I would have made is
**false**, and is recorded here as such. (The *sidebar* twin at `1.25rem` is rescued the same way and
is a defect for the opposite reason — M-12.)

**S-6 · Scroll containment is complete and deliberate.** `overscroll-behavior-y: contain` on both
scrollers (`PaperView.vue:463`, `PaperSidebar.vue:156`), `touch-action: pan-y` +
`scroll-padding-bottom` + **`scrollbar-gutter: stable`** on the sidebar (`:158-160`), and
`overscroll-behavior: contain` on all three overlay scrollers
(`MobileFloatingToc.vue:303`, `PaperSearch.vue:109, 299`). Neither scroller chains to the document, and
the sidebar cannot shift layout when its scrollbar appears. *Falsifier:* remove `scrollbar-gutter` and
the rail jumps on scroll; the declaration is present and load-bearing.

---

## §7 · Corpus reconciliation

| Corpus row | Disposition |
|---|---|
| `lane-frontend.md:152` (685 LOC, route shell) | **AGREE**, verified. |
| `lane-frontend.md:282-290` (glass import inventory) | **AGREE**, line-exact. |
| `lane-frontend.md:438` (`PaperSearch` 🟡 CANDIDATE SHADOW) | **AGREE + ESCALATE** — B-1 makes the fork defective, not merely redundant. Re-rank toward HARD. |
| `lane-frontend.md:617` (`PaperView.vue:176` = "smooth-scroll opt-out") | **CONTRADICT** — that line is the progress-bar fallback gate; smooth scroll is at `useScrollNavigation.ts:191, 242` and is **ungated** (M-1). Amend the PRM coverage table. |
| `lane-frontend.md §9 ¶9` (reduced-motion gap = `stores/animation.ts` + `ConvergencePlot.vue`) | **EXTEND** — add `useScrollNavigation.ts:191, 242` and `PaperView.vue`'s four un-gated CSS recipes (M-2). |
| `CENSUS-2026-08-03.md:102-104, 184-186` (uplift break surface) | **AGREE the rows; CONTRADICT the completeness.** None of the five named rows touches this closure; the actual break here is the `Button` **prop API** (B-3), which an `exports`-keyset diff cannot see. The census's own recurrence rule ("the keyset is load-bearing and wins") is *insufficient* at prop granularity. |
| `lane-fourier-r3-r6.md:R6-5 / :139` (3 native `li v-for`, lines 65/87/105) | **AGREE**, verified live — and those are exactly the rows M-10's `whitespace-nowrap` clips. |
| `lane-fourier-r3-r6.md:R3-7a / :79` (35 Tooltip / 9 consumers; PaperSidebar = 2) | **AGREE**, `PaperSidebar.vue:70, 88`. |
| `lane-fourier-r3-r6.md:X-6 / :157` (exactly 2 `<Teleport>` source sites) | **AGREE on source count; CONTRADICT the runtime inference** — `PaperSearchModal.vue:41` instantiates twice off one shared state (B-2). One source Teleport ≠ one runtime Teleport. |

---

## §8 · Tally

| Severity | Count |
|---|---|
| **BLOCKER** | 4 (B-1 · B-2 · B-3 · B-4) |
| **MAJOR** | 15 (M-1 … M-15) |
| **MINOR** | 18 (m-1 … m-18) |
| **INFO** | 5 (i-1 … i-5) |
| **Defects total** | **42** |
| **Superlatives** | **6** (S-1 … S-6) |

**Claims requiring a live render before they are closed (SS-13):** B-1 (painted result), B-2 (desktop
arm only), M-4 (painted `scaleX`), M-8 (painted ratio under `.glass-wash`), M-12 (painted layout),
M-13 (Tab containment), m-9 (shaping cost). Every one of them has its **mechanism** decided statically
from the tree, the installed substrate, or the Vue runtime source; only the pixels are outstanding.

**One-line verdict.** The reading-instrument core of `PaperView` — the virtualisation, the scroll
containment, the compositor-owned progress axis — is genuinely well made and in two places ahead of its
own substrate. Everything bolted onto it is not: the search subtree is unstyled by a scoping mistake
and duplicated by a composition mistake, the whole motion surface is ungated in the one direction that
matters, four token-decidable contrast floors are breached, and the component has hand-rolled enough
glass surface that the imminent `4→7` uplift cannot be applied to it mechanically.

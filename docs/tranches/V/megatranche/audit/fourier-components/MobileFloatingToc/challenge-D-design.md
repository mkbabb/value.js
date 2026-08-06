claude-opus-5[1m]

# CHALLENGE — `MobileFloatingToc.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/MobileFloatingToc.vue` (397 lines)
**Date** 2026-08-06 · **Pin** `@mkbabb/glass-ui@^4.0.0` installed (`web/package.json:13`, `node_modules/@mkbabb/glass-ui/package.json` → `4.0.0`), producer latest **7.0.0**
**Method** static + source-derived only. No browser. Contrast computed by hand from resolved token values (HSL→sRGB→WCAG 2.x relative luminance); every number carries its arithmetic. Cascade outcomes derived from the actual shipped stylesheets (layer membership + specificity), not from intent. Livable-only claims marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture** component assumed DEFECTIVE until the tree proves otherwise. Every claim carries its own falsifier; superlatives carry theirs too (L-18 runs both ways).

**Read whole (read-only).** The target; every file it imports — `PaperSearch.vue`, `search/PaperSearchInput.vue`, `search/PaperSearchDropdown.vue`, `search/PaperSearchModal.vue`, `search/usePaperSearch.ts`, `lib/paperContent.ts`; the mount site `PaperView.vue` and its sibling `PaperSidebar.vue`; `useScrollNavigation.ts`; `src/style.css`; and the installed `@mkbabb/glass-ui@4.0.0` surface — `dist/button-BNDWhAZb.js`, `dist/sidebar.js`, `dist/composables/sidebar/useSidebarState.d.ts`, `dist/styles/index.css`, `dist/styles/components.css`, `dist/styles/glass/{ladder,surfaces}.css`, `dist/styles/tokens/{scheme-motion,offsets-sizing,light-dark,color-radius}.css`, `dist/styles/theme/{radius,bridges}.css`, `dist/styles/utilities/a11y-overrides.css`. Plus `tailwindcss@4.3.1` `dist/lib.js` (the `rotate` utility compiler), `@vue/runtime-core@3.5.38` `dist/runtime-core.cjs.js` (`setScopeId`), `lucide-vue-next@1.0.0`, and producer `glass-ui@7.0.0` `src/components/button/{Button.vue,styles.css}` + `src/composables/sidebar/useSidebarState.ts`.

**Tally** 31 defects (4 BLOCKER · 11 MAJOR · 12 MINOR · 4 INFO) · 6 superlatives.

---

## 0. Corpus fold (hitherto — cited, not re-derived)

| Corpus row | Where it lands here |
|---|---|
| `lane-frontend.md:155` — `MobileFloatingToc.vue` 397 LOC, "Mobile floating ToC bar" | Inventory confirmed byte-exact (397 lines). |
| `lane-frontend.md:282-283` — this file's two glass-ui imports: `./button`, `./sidebar` | Confirmed at `:3` and `:4`. Both subpaths **survive at 7.0.0** (`glass-ui/package.json` exports carry `./button` and `./sidebar`), so this component sits **off** the removed-subpath half of the break surface. §6 records the negative so F.W1 does not budget it. |
| `CENSUS-2026-08-03.md:102-106` — the uplift break surface: `metric-badge` ×7, `hover-card`/`hover-popover` ×4, dock members ×3, `ToastVariant`, `lucide-vue-next → @lucide/vue` ×35, pencil-boil | This component touches **exactly one** row: `lucide-vue-next` (`:5`, five icons). `metric-badge` / `hover-card` / `hover-popover` / `DockIconButton` / `DockDropdownTrigger` / `ToastVariant` are **absent** — verified by grep over the SFC. §6 U-1..U-5. |
| `CENSUS-2026-08-03.md` §"RESOLUTION DEADLOCK" — glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0 is ONE atomic transaction | Every §6 item is gated behind that transaction; none is separately landable. |
| `lane-frontend.md:154, 438` — the PaperSearch family (397 + 435 LOC) is a **SHADOW candidate** against 7.0.0's `./search` + `useFuzzySearch` | Sharpened, not merely cited: §2 D-B2 shows the family's floating variant is **not rendering its own stylesheet at all**, which changes the shadow calculus from "duplicated capability" to "duplicated capability, one arm of which is visually broken today". |
| intake `lane-fourier-r3-r6.md` **R3-10** (TRUE) — six live dynamic `:is` families; the registry carries four, one of which is **`MobileFloatingToc:157`** | Re-verified live at `:157-161`: `<component :is="sidebarState.isExpanded(section.id) ? ChevronDown : ChevronRight" v-if="section.subsections?.length">`. **No contradiction.** Design consequence recorded at D-M6 (this is the glyph measured at 1.88:1) and D-B1 (its `v-if` is what makes a childless root row a silent no-op). |
| `lane-frontend.md` §"Hygiene banked" — 18 reduced-motion references; **vitest ABSENT**, gates are `vue-tsc` + 29 Playwright tests on one chromium project | MobileFloatingToc declares **no** PRM block and needs none (S-2, a withdrawn claim), and is referenced by **zero** e2e specs (D-i1). |
| `lane-frontend.md:602-604` / `style.css:113-143` — the `--viz-amber` WCAG darken and the `:focus-visible` ring block that **names `MobileFloatingToc.vue` explicitly** | S-4 (the ring reaches the rows) and D-m5 (the same rule's `border-radius: inherit` squares those rows on focus). |

**Contradictions with the corpus: none.** Everything below is a fresh find or a sharpening of a cited row.

---

## 1. Aristotelian reading — what the component is *for*, and whether its proportions serve it

A mobile table of contents does three things: it *tells you where you are*, it *lets you go anywhere else*, and it *stays out of the way of the text*. This component attempts all three and is defeated on the middle one by a single line.

- **Where you are** — works, and is the component's best limb: a sticky bar carrying the numbered section title, ellipsised, with the trigger's own height fed back into the scroll-anchor arithmetic (S-1).
- **Go anywhere else** — the root rows do not navigate. `@click="sidebarState.toggleSection(section.id)"` (`:155`) toggles an expansion set and nothing else, while the desktop twin two files over calls **both** `scrollTo` and `toggleSection` on the same gesture (`PaperSidebar.vue:74`). The paper has **51** `\section{}` roots. On a phone, none of them is reachable from the table of contents (D-B1).
- **Stay out of the way** — inverted. Each row is locked to `--control-h-md`, which on a coarse pointer resolves to `3.75rem` = **67.5px** (D-M2). Fifty-one roots at 67.5px is a **3.4k-pixel** list presented through a `max-height: 60vh` window: on an 844px viewport, 7.5 rows — **14.7%** of the contents visible at once, opening at row 1 regardless of whether you are at §1 or §47 (D-M4).

The proportional system is the second story, and it is not the author's. The file declares a coherent small rhythm — `padding: 0.5rem 0.75rem`, `border-radius: 0.375rem`, `gap: 0.25/0.375/0.5rem`, `text-align: left` — and then imports a control primitive whose layered rules quietly replace three of the four: the height (67.5px, not the ~45px the padding implies), the radius (a 9999px stadium on a full-bleed bar, D-M1), and the horizontal alignment (`justify-content: center` on the flex rows, so root rows centre while sub rows stay left, D-M3). The mean here is not a midpoint; it is the size appropriate to a list of 51 things read with a thumb. What ships is a button ladder wearing a list's clothes.

The typography compounds it: the component is handed `renderTitle` — the KaTeX title renderer every sibling uses — and never calls it (D-M7). In a treatise whose entire visual thesis is the typeset page, the mobile contents is the one surface that shows the LaTeX source.

---

## 2. Findings

### BLOCKER

---

**D-B1 — Root sections cannot be navigated to. The tap toggles an expansion set and returns.**

`MobileFloatingToc.vue:150-156`:

```html
<Button
    variant="ghost"
    class="floating-toc-item floating-toc-root cm-serif"
    :class="{ 'is-active': activeRootId === section.id }"
    :style="activeRootId === section.id ? { color: `var(--section-color-${si})` } : {}"
    @click="sidebarState.toggleSection(section.id)"
>
```

`toggleSection` is glass-ui's, and it does exactly one thing. From `dist/sidebar.js` (`useSidebarState`, minified — `s` = userExpanded, `c` = userCollapsed, `l` = isExpanded):

```js
function d(e) { l(e) ? (s.delete(e), c.add(e)) : (c.delete(e), s.add(e)); }
```

No `scrollTo`. The composable ships a *separate* `navigateTo(id) { t.scrollTo(e) }` (`f` in the same closure, exported as `navigateTo`) which this component never calls. The typed surface confirms both are present and distinct: `dist/composables/sidebar/useSidebarState.d.ts` → `toggleSection(id: string): void;` and `navigateTo(id: string): void;`.

The desktop sibling, consuming the *same composable* with the *same tree*, does both on one gesture — `PaperSidebar.vue:74`:

```html
@click="scrollTo(section.id); sidebarState.toggleSection(section.id)"
```

Consequences, in order of severity:

1. For a root section **with** subsections, the tap expands the row. You can then reach `§N.1` — but never `§N` itself, whose prose (the section's opening paragraphs) is unreachable from the ToC.
2. For a root section **with no** subsections, `:157-161` withholds the chevron (`v-if="section.subsections?.length"`), so the tap flips a hidden boolean, renders nothing, closes nothing, and navigates nowhere. **The control is a visual no-op.**
3. `selectSection` (`:76-79`) — the function that closes the dropdown and navigates — is bound **only** to subsection rows (`:171`). It is the only navigating path in the component besides "Scroll to top".

*Provenance*: `MobileFloatingToc.vue:76-79`, `:150-156`, `:157-161`, `:166-175`; `PaperSidebar.vue:74`; `glass-ui/dist/sidebar.js` (`useSidebarState` body); `dist/composables/sidebar/useSidebarState.d.ts:46-48`.
*Falsifier*: a click handler on an ancestor that navigates. Refuted by enumeration — the only other handlers in the subtree are `@click="handleScrollToTop"` (`:141`), `@click="selectSection(sub.id)"` (`:171`), `@click.stop="openMobileSearch"` (`:123`), `@click="dismissDropdown"` (`:185`) and the trigger's own toggle (`:117`); the dropdown div (`:130-136`) binds only `@keydown.esc`. Second falsifier: `toggleSection` navigating as a side effect at *this* pin — refuted by the quoted body, and by the 7.0.0 source (`glass-ui/src/composables/sidebar/useSidebarState.ts`), which is shape-identical. **The uplift does not fix this.**
*Severity rationale*: BLOCKER. The component's stated job is navigation; 51 of its ~51-plus-children targets are unreachable, and an unknown subset of taps produce no observable effect at all.

---

**D-B2 — The mobile search-results surface renders with none of its stylesheet. Vue's scope hash never reaches it.**

`MobileFloatingToc.vue:110-115` is the component's second mode:

```html
<div v-if="searchActive" class="floating-toc-bar floating-toc-bar--search glass-resting">
    <PaperSearch ref="mobileSearchRef" :search="search" variant="floating" />
```

`variant="floating"` is served **only** from here (`grep -rn 'variant="floating"' web/src/` → this line alone). All of its styling lives in `PaperSearch.vue`'s `<style scoped>` (`:41-397`). Vue 3 propagates a parent's scope id to a child component's **root element only**, and only when that root is a single node. `@vue/runtime-core@3.5.38` `dist/runtime-core.cjs.js:5676-5698`:

```js
const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) hostSetScopeId(el, scopeId);
    …
    let subTree = parentComponent.subTree;
    if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) subTree = filterSingleRoot(subTree.children) || subTree;
    if (vnode === subTree || …) { /* recurse to the parent's scopeId */ }
};
```

Apply it to the tree as built:

- **`PaperSearchInput.vue`** — single root `<div class="paper-search-input-wrap">` (`:35`) ⇒ `vnode === subTree` ⇒ inherits `data-v-<PaperSearch>`. Its rules **do** apply. Its **children** do not: `.paper-search-icon` (`:36`), `.paper-search-input` (`:40`), `.paper-search-action-btn` (`:51`, `:62`) are created inside a component with no `__scopeId` of its own, so they carry no attribute at all. `PaperSearch.vue:62-100` and `:204-213` are therefore inert on them.
- **`PaperSearchDropdown.vue`** — the template has **two** element roots, `<Transition>` (`:35`) and `<div v-if="variant === 'floating' && …">` (`:65`) ⇒ a real multi-root Fragment (not the dev comment-fragment that `patchFlag & 2048` rescues) ⇒ `vnode !== subTree` for every element inside. **Nothing** in that subtree carries the hash.
- **`PaperSearchModal.vue`** — root is `<Teleport to="body">` (`:41`); its children are patched into `document.body` and are likewise never `=== subTree`.

So the following declarations in `PaperSearch.vue` are dead for every consumer, and this component is the only consumer of the variant they were written for:

| Dead rule | Lines | What is lost on the mobile search |
|---|---|---|
| `.paper-search-results` | `:103-116` | `position:absolute`, `top: calc(100% + 4px)`, `left/right:0`, `z-index`, `max-height:50vh`, `overflow-y:auto`, `overscroll-behavior:contain`, border, radius, shadow, padding |
| `.paper-search--floating .paper-search-results` | `:215-221` | the floating override (`max-height:60vh`, edge-to-edge) |
| `.paper-search-result` | `:118-135` | `display:flex`, `padding`, `align-items:baseline`, radius, the `.is-selected` plate |
| `.paper-search-badge` / `-number` / `-label` (+ `:deep(mark)`) | `:137-190` | badge plate + type colours, the label's `flex:1` / `overflow:hidden` / `text-overflow:ellipsis`, the highlight `<mark>` |
| `.paper-search-backdrop` | `:192-196` | `position:fixed; inset:0` — the tap-outside-to-dismiss layer becomes a zero-height static div |
| `.search-dropdown-*` | `:225-236` | the enter/leave transition |
| `.paper-search-icon` / `-input` / `-action-btn` | `:62-100`, `:211-213` | icon size + colour; the input's `flex:1`, `min-width:0`, `outline:none`; the placeholder colour |

What renders instead, derived: the results container keeps only `glass-floating` (`PaperSearchDropdown.vue:39`), i.e. a plate with no position, no clip and no ceiling, laid out **in normal flow inside the search bar**, growing it — inside `.floating-toc { height: 0; overflow: visible }` (`:193-199`), so it is unclipped over the article. Its rows are glass-ui `Button`s at their default size arm, i.e. `--control-h-md` = 67.5px on touch (see D-M2), pill-radiused and centre-justified (D-M1, D-M3), up to **30** of them (`usePaperSearch.ts:36` caps at 30) — a ~2 000px column. `whitespace-nowrap` from the Button base survives while the label's `overflow:hidden`/ellipsis does not, so long titles run off-screen. The search icon (`PaperSearchInput.vue:36`) falls back to lucide's default `width/height: 24` (`lucide-vue-next.js` `defaultAttributes`) instead of `0.8rem`, at full `currentColor` instead of 50% muted.

The author *knew* about scope boundaries — `PaperSearch.vue:185` reaches for `:deep(mark)` to style the `v-html` highlight — without noticing that the element hosting that `:deep()` was already outside the scope.

*Provenance*: `MobileFloatingToc.vue:110-115`; `PaperSearch.vue:41-397` (esp. `:62-100`, `:103-116`, `:118-196`, `:204-236`); `PaperSearchInput.vue:35-68`; `PaperSearchDropdown.vue:33-70`; `PaperSearchModal.vue:41`; `@vue/runtime-core/dist/runtime-core.cjs.js:5676-5698`; `usePaperSearch.ts:35-37`.
*Falsifier* (two, both must fail): (a) an unscoped stylesheet redeclaring these classes — refuted by enumeration: `grep -rn "paper-search-results\|paper-search-input\|paper-search-icon\|paper-search-action-btn\|paper-search-label\|paper-search-badge" web/src/` returns **only** the twelve application sites in the three search SFCs plus the declarations inside `PaperSearch.vue`'s scoped block; no `.css` file in `web/src/` declares any of them. (b) Vue propagating the hash past a child root — refuted by the runtime source quoted above.
*Not claimed*: the raw-UA-input horror. Tailwind preflight (`@import "tailwindcss"`, `style.css:1`) resets `input` to `border:0; background-color:transparent; font:inherit; color:inherit`, so the input's *chrome* survives the loss; what is actually lost there is `flex:1`/`min-width:0` (the field no longer grows to the bar) and the placeholder colour. Stated narrowly on purpose.
*Severity rationale*: BLOCKER. One of the component's two mutually exclusive modes renders a control surface with its layout stylesheet absent, on the only device class the component exists for.

---

**D-B3 — The search affordance is a bare `<span>` nested inside a `<button>`: keyboard-inoperable, unnamed, and it pollutes the trigger's accessible name.**

`MobileFloatingToc.vue:117-128`:

```html
<Button v-else ref="tocTrigger" variant="ghost" class="floating-toc-bar glass-resting" @click="floatingTocOpen = !floatingTocOpen">
    <span class="floating-toc-section cm-serif">…</span>
    <span class="floating-toc-actions">
        <span class="floating-toc-search-btn" @click.stop="openMobileSearch" title="Search paper">
            <Search class="h-3.5 w-3.5" />
        </span>
        <ChevronDown class="floating-toc-chevron" :class="{ 'rotate-180': floatingTocOpen }" />
    </span>
</Button>
```

The search control has **no `tabindex`**, **no `role`**, and is a descendant of a `<button>` (glass-ui `Button` renders `as: "button"` by default — `dist/button-BNDWhAZb.js`, `as: { default: "button" }`). Therefore:

1. **WCAG 2.1.1 (Keyboard).** It cannot receive focus. Tab reaches the enclosing button; Enter/Space fire the *button's* handler (open the ToC), never `openMobileSearch`. There is no other entry point to search on mobile — `PaperView.vue` binds a global keydown (`handleGlobalKeydown`, defined `:113`, bound `:273`), but that is a keyboard path on a component that exists only below `lg`, i.e. for touch. Search is reachable **only** by tap.
2. **WCAG 4.1.2 (Name, Role, Value).** Its only label is `title`, and `title` does not surface on touch — the sole pointer type this component serves. The `Search` glyph carries `aria-hidden="true"` (lucide v1 adds it whenever there are no slots and no a11y props — `lucide-vue-next.js`, `...!slots.default && !hasA11yProp(props) && { "aria-hidden": "true" }`), so the span has no accessible content either. To assistive tech it is decorative text.
3. **Name pollution.** The trigger button is named from content. Under the accname algorithm a descendant with no content but a tooltip attribute contributes that attribute (step 2I), so the button announces approximately *"1. Introduction Search paper, button"* — the section label the user is trying to hear, suffixed with an unrelated command. (Exact browser behaviour for `title` on a nameless generic descendant varies — that specific string is **UNPROVEN-NEEDS-LIVE, SS-13**; the missing role/tabindex is not.)
4. **Content model.** A click-bearing control nested inside a button is also the shape that makes `@click.stop` (`:123`) load-bearing — remove it and one tap does both things.

The fix is one element: the sibling `X` in search mode is already a real `<Button variant="ghost" size="icon">` (`:112`). The two halves of the same bar disagree about what a control is.

*Provenance*: `MobileFloatingToc.vue:112-114`, `:117-128` (esp. `:123-125`); `glass-ui/dist/button-BNDWhAZb.js` (`as` default, `data-size` reflection); `lucide-vue-next@1.0.0` `dist/cjs/lucide-vue-next.js` (`hasA11yProp` + the `aria-hidden` spread); `PaperView.vue:113`, `:273`.
*Falsifier*: `Button` rendering something other than a native `<button>` here — refuted, no `as`/`as-child` is passed, and the CVA host is `Primitive` with `as: "button"`. Second falsifier: a global handler binding this span — refuted by grep (`floating-toc-search-btn` appears at `:123` and `:238` only).
*Severity rationale*: BLOCKER. A primary, unlabelled, keyboard-inoperable control is a Level A failure on two success criteria at once, and it is the only escape from the 3.4k-pixel list D-M2 describes.

---

**D-B4 — Sub-section rows sit at 2.89:1 at 14.6px. They are the ToC's primary navigation targets.**

`MobileFloatingToc.vue:364-368`:

```css
.floating-toc-sub {
    padding-left: 2.25rem;
    font-size: 0.8125rem;
    color: color-mix(in srgb, var(--muted-foreground) 70%, transparent);
}
```

Resolution and arithmetic (light arm, the app default — `style.css` has no forced `.dark`):

- `--muted-foreground: var(--neutral-5)` (`glass-ui/dist/styles/tokens/color-radius.css:85`) = `hsl(30 22% 40%)` (`:45`) → **rgb(124, 102, 80)**, Y = 0.2126·0.2016 + 0.7152·0.1330 + 0.0722·0.0802 = **0.1438**.
- Substrate `--background: var(--neutral-0)` = `hsl(40 30% 98%)` (`:57`, `:40`) → **rgb(251, 250, 248)**, Y = **0.9566**.
- 70% alpha composite: 0.7·(124,102,80) + 0.3·(251,250,248) = **rgb(162, 146, 130)**, Y = 0.2126·0.3614 + 0.7152·0.2873 + 0.0722·0.2233 = **0.2984**.

**Contrast = (0.9566 + 0.05) / (0.2984 + 0.05) = 1.0066 / 0.3484 = 2.889 : 1.**

At `0.8125rem` against an 18px root (`style.css:40-43`, `html { font-size: 1.125rem }` below 768px) that is **14.6px** — not large text under WCAG 1.4.3, which requires **4.5:1**. It clears 64% of the requirement.

The damning half: `--neutral-5` ships **already computed for this**. Its own declaration comment reads `/* L 40 — muted text (warm, C≈0.043; WCAG AA: 5.21:1 vs page / 4.90:1 vs muted) */`, and my arithmetic reproduces it (1.0066/0.1938 = **5.195:1**) — so `.floating-toc-item { color: var(--muted-foreground) }` (`:346`) **passes**. The component then spends the entire AA margin on a `color-mix(…, transparent)` for its *deepest* level, the one with the smallest type. The same 70% mix is on `.floating-toc-top` (`:319`) at `font-size: 0.75rem` = 13.5px — the same 2.889:1, at a smaller size.

*Provenance*: `MobileFloatingToc.vue:315-322`, `:336-349`, `:364-368`; `glass-ui/dist/styles/tokens/color-radius.css:40`, `:45`, `:57`, `:85`; `web/src/style.css:40-43`.
*Falsifier* (three): (a) a lighter substrate — the rows sit on `.glass-floating` (`:133`), whose background is `color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) var(--glass-tint-strength))` (`glass/ladder.css:83-98`), a translucent light wash over the page; the composite is at most marginally lighter than the page, which moves the ratio by well under the 1.6× needed to clear 4.5:1. The exact plate resolution is **UNPROVEN-NEEDS-LIVE (SS-13)**; the direction is not, and the failure margin is 36%. (b) the hover/active arm rescuing it — refuted, `:370-374` raises those states to `var(--foreground)`; the failure is the **resting** state, which is what 100% of rows show. (c) the dark arm — passes comfortably (light ink on `hsl(24 9% 4%)`), so this is a **light-mode-only** failure, invisible to a dark-mode-only review.
*Severity rationale*: BLOCKER. Every leaf navigation target in the mobile contents fails AA in the default theme.

---

### MAJOR

---

**D-M1 — The full-bleed sticky bar renders as a 9999px stadium, with a hairline border arcing across its bottom.**

`.floating-toc-bar` (`:205-221`) declares `width: 100%`, `border: none`, `border-bottom: 1px solid …` — and **no `border-radius`**. It is a glass-ui `Button`, whose base string composes `btn-pill` (`dist/button-BNDWhAZb.js`), and `btn-pill` declares (`glass/surfaces.css:119-135`, inside `@layer components` opened at `:6`):

```css
.btn-pill { @apply inline-flex items-center justify-center …; border-radius: var(--radius-pill); … }
```

`--radius-pill: 9999px` (`theme/radius.css:25`). Nothing in the component, and nothing in the `size: "default"` arm (`h-(--control-h-md) px-4 py-2 has-[>svg]:px-3` — no `rounded-*`), overrides it. The engine clamps 9999px to half the block-size, so at the 67.5px height of D-M2 the bar acquires **~34px** end radii on a 100%-wide element, and the 1px `border-bottom` follows that curve rather than ruling a line. The dropdown directly beneath is a plain `<div>` at `left: 0; right: 0` with square corners (`:293-307`) — the two edges cannot meet.

*Provenance*: `MobileFloatingToc.vue:205-221`, `:293-307`; `glass-ui/dist/button-BNDWhAZb.js`; `dist/styles/glass/surfaces.css:6`, `:119-135`; `dist/styles/theme/radius.css:25`.
*Falsifier*: an unlayered `rounded-none` reaching the element. Refuted — the only classes on it are `floating-toc-bar glass-resting` plus the CVA's own output; `grep -n "rounded" MobileFloatingToc.vue` returns nothing. Second falsifier: `.btn-pill` losing to something — nothing else declares `border-radius` for this element, and a layered rule with no competitor wins by default.
*Uplift note*: **NOT fixed at 7.0.0.** `glass-ui/src/components/button/styles.css:24` replaces the stadium with `border-radius: calc(var(--button-size) / 2)` — same visual result for a single-line control.

---

**D-M2 — Every row is height-locked to a control rung: 67.5px on touch, against an authored ~45px. The list is 3 442px tall.**

The CVA's default size arm emits `h-(--control-h-md)` (`dist/button-BNDWhAZb.js`, `defaultVariants: { size: "default" }`), and that utility is **shipped pre-generated and unlayered** — `dist/styles/components.css` (imported at `dist/styles/index.css:201`, and containing zero `@layer` blocks) carries verbatim:

```css
.h-\(--control-h-md\){height:var(--control-h-md)}
```

No scoped rule in the component declares `height`, so it applies unopposed. Resolution:

- `--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor))` (`tokens/offsets-sizing.css:151`)
- `@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5); --control-floor: var(--touch-target, 2.75rem) } }` (`tokens/light-dark.css:18-22`)
- ⇒ on touch: `max(3.75rem, 2.75rem)` = **3.75rem**; root font-size 18px below 768px (`style.css:40-43`) ⇒ **67.5px**.

The authored intent is visible two lines away: `.floating-toc-item { padding: 0.5rem 0.75rem }` (`:339`) over `@apply text-base` (`:345`) computes to ≈ 9 + 27 + 9 = **45px**. The delivered row is **50% taller**, and the discrepancy appears nowhere in the source.

Aggregate, from the tree: `web/../paper/fourier_paper.tex` carries **51** `\section{}` roots (`grep -c '^\\section{'` → 51). Collapsed, the dropdown is 51 × 67.5 + one 67.5px "Scroll to top" row + a 1px divider + 2 × 8px padding ≈ **3 528px**, inside `max-height: 60vh` (`:301`). On an 844px viewport that is 506px — **7.5 rows, 14.7% of the contents**.

*Provenance*: `MobileFloatingToc.vue:205-221`, `:336-349`, `:293-307`; `glass-ui/dist/button-BNDWhAZb.js`; `dist/styles/components.css` (`.h-\(--control-h-md\)`, unlayered); `dist/styles/index.css:201`; `dist/styles/tokens/offsets-sizing.css:136`, `:151`; `dist/styles/tokens/light-dark.css:18-22`; `web/src/style.css:40-43`; `paper/fourier_paper.tex`.
*Falsifier* (two): (a) the utility not reaching the app — refuted, `style.css:3` is `@import "@mkbabb/glass-ui/styles"`, whose entry `@import`s `components.css` at `:201`; the app's own Tailwind pass never sees `node_modules`, which is precisely why the pre-generated file exists. (b) the scoped padding winning — it does win for *padding* (unlayered `.floating-toc-item[data-v]` at 0-2-0 beats `.px-4`/`.py-2` at 0-1-0), which is exactly why the height and the padding now disagree instead of composing.
*Note*: 67.5px is generously above the 44px WCAG 2.5.5 floor — the finding is not "too small". It is that the row rhythm of a 51-item list is being set by a button-height token the author never named, at 1.5× the size they wrote.
*Uplift note*: **fixed at 7.0.0** — `glass-ui/src/components/button/styles.css:8` switches to `min-block-size: var(--button-size)`, so authored padding composes instead of being clipped.

---

**D-M3 — Root rows and "Scroll to top" are centre-justified; sub rows are left-aligned. `text-align: left` is inert on both.**

`.floating-toc-item` declares `display: block` and `text-align: left` (`:336-349`). `.floating-toc-root` (`:351-355`) and `.floating-toc-top` (`:315-322`) then re-declare `display: flex` — at which point `text-align` no longer governs the main axis, and `justify-content` does. Neither re-declares it, so `btn-pill`'s `justify-center` (`glass/surfaces.css:120`) applies unopposed.

Result, in one vertical list:

| Row | display | main-axis alignment | source |
|---|---|---|---|
| "Scroll to top" | flex | **centre** | `.btn-pill` `justify-center` |
| Root section | flex | **centre** | `.btn-pill` `justify-center` |
| Sub-section | block | **left** (2.25rem indent) | `.floating-toc-sub:364` |

A table of contents whose top-level entries float in the middle of the row and whose children hang off the left margin has no reading edge. The numbering (`§N.` at `:162`, `:173`) — the one thing a scan-down gesture tracks — is centred at one level and indented at the next.

*Provenance*: `MobileFloatingToc.vue:315-322`, `:336-349`, `:351-355`, `:364-368`; `glass-ui/dist/styles/glass/surfaces.css:6`, `:120`.
*Falsifier*: an unlayered `justify-*` utility on the element. Refuted — the CVA's default arm emits no justify utility, and `grep -n "justify" MobileFloatingToc.vue` returns only `:208` (`justify-content: space-between`, on the bar, which is why the bar looks right) and `:240`/`:268` (the two icon boxes). Second falsifier: `display: block` surviving on the root rows, making `text-align` govern — refuted, `.floating-toc-root` (`:351`) is later in the same scoped block at equal specificity.

---

**D-M4 — The dropdown always opens at row 1. There is no active-item follow, and the desktop twin has one.**

`watch(floatingTocOpen, …)` (`:45-52`) locks the page scroll and focuses the dropdown container. It does not scroll the container. `isExpanded` (glass-ui) default-expands the active root, so the correct row is *rendered* — 40 rows and ~2 700px below the fold.

The desktop path has the missing mechanism and the app already imports it: `PaperView.vue:8` imports `useSidebarFollow` from glass-ui and drives it at `:233`, `:261`, `:287` (`queueSidebarFollow`), bound to the sidebar element. Nothing equivalent is wired for the mobile dropdown; `MobileFloatingToc.vue` imports only `useSidebarState`.

The `dropdownRef.value?.focus()` on open (`:50`) does not help: focusing a `tabindex="-1"` container scrolls that container into view, not its descendant.

*Provenance*: `MobileFloatingToc.vue:45-52`, `:130-136`, `:165-176`; `glass-ui/dist/sidebar.js` (`isExpanded` default-expansion arm); `PaperView.vue:8`, `:233`, `:261`, `:287`.
*Falsifier*: browser scroll anchoring landing on the active row — refuted in principle: the container is freshly mounted inside a `<Transition>` each time (`:129-136`), so it has no prior scroll position to anchor to, and its `scrollTop` initialises at 0. Whether any engine does something cleverer is **UNPROVEN-NEEDS-LIVE (SS-13)**; the absent code is not.

---

**D-M5 — Focus is returned on dismissal and dropped on activation. The dropdown has no name, no role, no containment.**

The component discharges half of a focus contract, carefully and with a comment (`:25-40`, "A4 MED a11y discharge"), then abandons the other half:

- `dismissDropdown()` (`:37-40`) restores focus to the trigger. ✔
- `selectSection(id)` (`:76-79`) and `handleScrollToTop()` (`:81-84`) set `floatingTocOpen = false` and **do not**. The activated `<Button>` unmounts with focus on it, so focus resets to `<body>` and the next Tab restarts at the top of the document — WCAG 2.4.3.
- `closeMobileSearch()` (`:93-96`) likewise unmounts the search bar (`v-if`/`v-else` at `:110`/`:117`) without returning focus to the trigger it replaced.

Alongside that:
- **No `aria-expanded` / `aria-controls`** on the trigger (`:117`). The dropdown's open state is announced to nobody.
- **No name or role on the dropdown** (`:130-136`): a `tabindex="-1"` `<div>`. Not a `menu`, not a `dialog`, not a `listbox`, no `aria-label`.
- **No containment and no `inert`.** The backdrop (`:182-186`) is a `position: fixed; inset: 0` div at `z-index: 1` — visual only. Tabbing past the last item walks into the article underneath, which the user cannot see and cannot dismiss with a tap (the backdrop is above it).
- **No `<nav>` landmark.** `PaperSidebar.vue:50` is `<nav … aria-label="Table of contents">`; the mobile ToC — the *same* content, the *same* job — is a bare `div`.

*Provenance*: `MobileFloatingToc.vue:25-40`, `:45-52`, `:76-84`, `:93-96`, `:107-136`, `:182-186`; `PaperSidebar.vue:50`.
*Falsifier*: reka-ui supplying the disclosure semantics. Refuted — this is a hand-rolled `v-if` disclosure; the only reka surface in play is `Primitive` inside `Button`, which forwards attributes and adds none. Second falsifier: `@keydown.esc` (`:135`) covering dismissal — it covers it only while focus is *inside* the container, which the open-watcher arranges (S-5) but the activation paths destroy.

---

**D-M6 — Non-text contrast: the expand affordance at 1.88:1, the search glyph at 2.04:1, the close glyph at 2.41:1. The floor is 3:1.**

All three are graphical objects required to understand or operate content (WCAG 1.4.11). Same substrate and method as D-B4 (`--muted-foreground` = rgb(124,102,80), page rgb(251,250,248), Y_page = 0.9566):

| Element | Declaration | Effective ink | Y | Contrast | Floor |
|---|---|---|---|---|---|
| `.floating-toc-collapse-icon` — the *only* signal a section has children and that the row toggles | `opacity: 0.45` on inherited `--muted-foreground` (`:357-362`) | rgb(194,183,172) | 0.4848 | **1.88 : 1** | 3:1 |
| `.floating-toc-search-btn` — the only search entry point | `color-mix(--muted-foreground 50%, transparent)` (`:244`) | rgb(188,176,164) | 0.4436 | **2.04 : 1** | 3:1 |
| `.floating-toc-search-close` | `color-mix(--muted-foreground 60%, transparent)` (`:273`) | rgb(175,161,147) | 0.3677 | **2.41 : 1** | 3:1 |
| `.floating-toc-chevron` | `opacity: 0.6` (`:286`) on `--foreground` (inherited from `:218`) | rgb(103,100,98) | 0.1290 | 5.63 : 1 ✔ | 3:1 |

The last row is the tell: the one glyph that inherits full `--foreground` and takes a modest opacity **passes with margin**. The three that fail are the three that were re-tinted through a mix of an already-muted token.

The collapse chevron is the worst and the most consequential: at 1.88:1 the user cannot see which of 51 rows are expandable, which is the only thing that distinguishes a row that does something (D-B1) from a row that does nothing.

*Provenance*: `MobileFloatingToc.vue:238-247`, `:266-280`, `:282-291`, `:357-362`; `glass-ui/dist/styles/tokens/color-radius.css:40`, `:45`, `:57-58`, `:85`.
*Falsifier*: hover states rescuing them — `.floating-toc-search-btn:hover` (`:249-252`) and `.floating-toc-search-close:hover` (`:278-280`) do raise to `--foreground`, but there is no hover on a touch device, which is the only device this component serves; and `.floating-toc-collapse-icon` has no hover arm at all. Second falsifier: the `glass-floating` plate — see D-B4's falsifier (a) — directionally neutral, magnitudes too large to close.

---

**D-M7 — `renderTitle` is a required prop, is passed, and is never called. The mobile contents shows raw LaTeX.**

`MobileFloatingToc.vue:16` declares `renderTitle: (title: string) => string;` in `defineProps`. `PaperView.vue:326` passes it. `grep -n "renderTitle" MobileFloatingToc.vue` returns **exactly one line — the declaration**. The two title sites interpolate the raw string:

- `:120` — `{{ currentSection?.title }}` (the sticky bar)
- `:163`, `:174` — `{{ section.title }}` / `{{ sub.title }}` (every row)

Every other consumer of the same function renders through it: `PaperSidebar.vue:80`, `:100`, `:116` (`<span v-html="renderTitle(section.title)" />`) and `PaperView.vue:373`. `renderTitle` is one third of `useKatex(macros)` (`PaperView.vue:38`), the app's KaTeX renderer, wired with the paper's own extracted macros (`:26-37`).

So any section or subsection whose TeX title carries inline math renders as source in the mobile ToC and in the sticky bar, and as typeset math everywhere else in the app. In a product whose thesis is the typeset treatise, the mobile navigation is the one surface showing the markup.

*Provenance*: `MobileFloatingToc.vue:16`, `:118-121`, `:162-163`, `:173-174`; `PaperView.vue:38`, `:326`, `:373`; `PaperSidebar.vue:19`, `:80`, `:100`, `:116`.
*Falsifier*: no paper section title containing math, making the prop moot. Not refuted for the 51 root titles specifically (they are prose — "Introduction", "Hilbert Space", "The Basis Vectors", …), so the *visible* damage is concentrated in subsection titles, which are generated from the same `.tex` and are not enumerable without the build's virtual module (`paperContent.ts:7`, `virtual:paper-content`) — **UNPROVEN-NEEDS-LIVE (SS-13)** for the exact count. The dead required prop, and the divergence from three sibling call sites, are not.

---

**D-M8 — The chevron never animates. It transitions `transform`; Tailwind v4 rotates with `rotate`.**

`MobileFloatingToc.vue:126` and `:282-291`:

```html
<ChevronDown class="floating-toc-chevron" :class="{ 'rotate-180': floatingTocOpen }" />
```
```css
.floating-toc-chevron { … opacity: 0.6; transition: transform 0.2s ease; }
.floating-toc-chevron.rotate-180 { opacity: 0.8; }
```

`tailwindcss@4.3.1` compiles the `rotate` functional utility to the **independent transform property**, not the `transform` shorthand. From `node_modules/tailwindcss/dist/lib.js` (the `rotate` utility factory, offset ≈ 58460):

```js
else if (k = e.resolve(g.value.value, ["--rotate"]), !k && O(g.value.value) && (k = `${g.value.value}deg`), !k) return;
return [l("rotate", a ? `calc(${k} * -1)` : k)]
```

— i.e. `.rotate-180 { rotate: 180deg }`. The same file's property-ordering table (offset ≈ 207102) lists `"rotate"` and `"transform"` as separate entries. `transform` never changes value on this element, so the declared transition animates nothing: the glyph **snaps** 0°→180°. `opacity` snaps too — it changes (0.6→0.8) but is absent from the transition list.

The library's own doctrine is the other half of the evidence: `btn-pill` deliberately animates the `scale` **longhand** and its comment retires "the DEAD `transform` leg" (`glass/surfaces.css:141-144`). The component's chevron is the file's one motion declaration that did not get the memo — and note it also kept a raw `0.2s ease` while the two neighbouring transitions were canonicalised to `var(--ease-standard)` under an "A.W3.d" comment (`:246`, `:348`).

*Provenance*: `MobileFloatingToc.vue:126`, `:282-291`; `tailwindcss@4.3.1` `dist/lib.js` (rotate utility factory; property-order table); `glass-ui/dist/styles/glass/surfaces.css:135-150`.
*Falsifier*: `rotate-180` not being generated at all (which would also mean no rotation). Refuted — Tailwind v4 scans `.vue` source text and the literal `'rotate-180'` appears in the `:class` object at `:126`; the scoped rule `.floating-toc-chevron.rotate-180` (`:289`) also proves the author expects the class to land. Second falsifier: a `transform` on the element from elsewhere — none; `grep -n "transform" MobileFloatingToc.vue` returns only the two `toc-expand` keyframe states (`:390`, `:395`).

---

**D-M9 — Both glass rungs are adopted and then partly destroyed: the resting plate loses its background and border, the floating plate loses its entire material shadow stack.**

`dist/styles/components.css` is **unlayered** (zero `@layer` blocks in the file), while the glass ladder and `btn-pill` live in `@layer components` (`glass/ladder.css:6`, `glass/surfaces.css:6`). Unlayered declarations beat every layer (CSS Cascade 5 §6.4.4). Therefore:

**The trigger (`:117`, `floating-toc-bar glass-resting`, `variant="ghost"`).** The ghost arm's first class is `bg-transparent` (`dist/button-BNDWhAZb.js`), shipped unlayered as `.bg-transparent{background-color:#0000}` in `components.css` — so it **wins** over `.glass-resting { background: color-mix(in oklab, var(--glass-bg-resting), …) }` (`glass/ladder.css:67-79`). The scoped `border: none` (`:212`) then removes `.glass-resting`'s `1px solid var(--glass-border-resting)`. What survives of the rung is `backdrop-filter` and the box-shadow — a blur with no plate and no edge. The bar reads as a smear over the article rather than a resting surface, and there is nothing to override in `dark`.

**The dropdown (`:133`, `glass-floating`).** `:299-300` declares, unlayered:

```css
border-bottom: 1px solid var(--border);
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
```

`.glass-floating` (`glass/ladder.css:83-107`) composes its material out of **three** shadow layers — `var(--glass-material-rim), var(--glass-under-shadow-vivid), var(--glass-shadow-floating)`. The scoped shorthand replaces all three with one flat 10%-black drop, i.e. the rim (the "catch-light that defines the silhouette", per the rule's own comment) is deleted. In dark mode a 10% black shadow over a near-black page is invisible, so the overlay loses its only separation from the article. The `border-bottom` override is half a job: the other three edges keep `--glass-border-floating` while the bottom switches to `--border`, so the plate is bounded by two different systems.

*Provenance*: `MobileFloatingToc.vue:110`, `:117`, `:133`, `:205-221`, `:293-307`; `glass-ui/dist/styles/components.css` (unlayered; `.bg-transparent`); `dist/styles/glass/ladder.css:6`, `:67-79`, `:83-107`; `dist/styles/glass/surfaces.css:6`; `dist/button-BNDWhAZb.js` (ghost arm).
*Falsifier*: `components.css` being layered after all — refuted by direct scan (`@layer` count 0). Second falsifier: the bar's background coming from elsewhere — refuted, `grep -n "background" MobileFloatingToc.vue` returns `:251`, `:274`, `:332`, `:342`, `:372` and none targets `.floating-toc-bar`.

---

**D-M10 — "Clear search" exits search mode entirely, and two identical X glyphs sit 6px apart meaning different things.**

In search mode the bar hosts two `X` controls:

1. `PaperSearchInput.vue:58-67` — `<Button … @click="search.close()" title="Clear search">` `<X class="h-3 w-3" />`, rendered whenever `search.query.value` is non-empty.
2. `MobileFloatingToc.vue:112-114` — `<Button … class="floating-toc-search-close" @click="closeMobileSearch" title="Close search">` `<X class="h-4 w-4" />`.

They are adjacent (`gap: 0.375rem` inside the input wrap, then `gap: 0.5rem` to the outer close, `:255-258`), visually identical bar a 1-step size difference, and labelled only by `title` — which does not appear on touch (D-B3). Worse, they are not actually distinct: `search.close()` (`usePaperSearch.ts:48-53`) sets `isOpen = false`, which trips this component's own watcher —

```js
watch(() => props.search.isOpen.value, (open) => { if (!open && searchActive.value) searchActive.value = false; });   // :99-103
```

— so **"Clear search" also closes search mode**. The user who taps the left X to erase a typo is returned to the section-title bar and must re-open search and re-focus. The two controls differ only in whether the query is blanked on the way out.

*Provenance*: `MobileFloatingToc.vue:93-103`, `:110-115`; `PaperSearchInput.vue:58-67`; `usePaperSearch.ts:48-53`.
*Falsifier*: the watcher being guarded so this path is excluded — refuted, its only guard is `searchActive.value`, which is `true` throughout search mode. Second falsifier: the clear button being hidden while the input has focus — refuted, its `v-if` is `search.query.value` alone.

---

**D-M11 — Search has no empty state. A no-match query on mobile shows nothing at all.**

`PaperSearchDropdown.vue:37` gates the whole results surface on `search.results.value.length > 0`. There is no `v-else`. The modal — the *other* presentation of the same state — does have one: `PaperSearchModal.vue:105-107`, `<div v-else class="search-modal-empty">No results</div>`.

So in the floating variant that this component alone mounts, typing a query with no matches produces: no list, no message, no change to the bar. The user cannot distinguish "no results" from "search is broken" from "still typing" — and there is no loading affordance either, though `usePaperSearch.ts:28-33` debounces the query by 120ms, during which the previous results remain on screen.

State coverage for this component overall: **empty** — absent (this row, plus the ToC's own `v-for` over `sections` with no `v-else`, which would show a dropdown containing only "Scroll to top" and a divider); **loading** — absent (nothing in the component is async; the 120ms debounce is unsignalled); **error** — absent, and no error is possible to reach it (the search index is built synchronously at `usePaperSearch.ts:18`).

*Provenance*: `MobileFloatingToc.vue:110-115`, `:149-177`; `PaperSearchDropdown.vue:33-70`; `PaperSearchModal.vue:81-107`; `usePaperSearch.ts:18`, `:28-33`, `:35-37`.
*Falsifier*: the modal covering the case on mobile — it does, but only if the user first taps Expand, whose control (`PaperSearchInput.vue:47-57`) is itself gated on `canExpand` = `!!query && results.length > 0` (`PaperSearch.vue:28`). With zero results the escape hatch is hidden by the same condition that hides the results.

---

### MINOR

---

**D-m1 — Three radii, none of them a rung.**
`:340` `border-radius: 0.375rem` and `:243` `0.25rem`. `theme/radius.css:15-47` publishes the ladder in **px** — `--radius-xs/sm: 4px`, `--radius-md: 6px`, `--radius: 0.625rem`, `--radius-xl: 12px`, `--radius-pill: 9999px` — so against the 18px mobile root these compute to **6.75px** and **4.5px**: near-misses on `--radius-md` and `--radius-xs`, off by enough to read as a different corner beside any library-radiused neighbour. `--radius-control` / `--radius-button` aliases exist for exactly this. (The bar's own radius is a separate defect — D-M1.)
*Falsifier*: the app re-basing the radius scale in rem — refuted, `grep -n "radius" web/src/style.css` returns nothing.

**D-m2 — Three left edges in one list.**
Root row **without** children: text starts at `padding-left: 0.75rem` (`:339`). Root row **with** children: `0.75 + 0.875 (icon) + 0.25 (gap)` = **1.875rem** (`:339`, `:353`, `:358-359`). Sub row: **2.25rem** (`:365`). So sibling roots do not share a left edge with each other, and children do not hang from their parent's text. (Under D-M3 the root rows are centred anyway, which makes the indent arithmetic moot until D-M3 is fixed — the two must be repaired together.)

**D-m3 — A dead iOS declaration.**
`:304` `-webkit-overflow-scrolling: touch`. Removed from WebKit in iOS 13 (momentum scrolling is unconditional since). Inert everywhere the component runs.

**D-m4 — Raw motion values in a file whose comments claim canonicalisation.**
`:246` and `:348` carry `/* A.W3.d — named properties + canonical token, no 'transition: all' */` and use `var(--ease-standard)`. `:287` uses `transition: transform 0.2s ease` — raw keyword, raw duration (`--duration-fast: 0.2s` exists at `tokens/scheme-motion.css:67`). `:300` uses `box-shadow: 0 4px 16px rgba(0,0,0,0.1)` — a raw rgba where the glass ladder ships `--glass-shadow-floating`. Two conformant sites and two unconverted ones in 60 lines.

**D-m5 — The focus ring squares the row it rings.**
`style.css:136-143` (the block that names this file at `:132`) ends with `border-radius: inherit`. `border-radius` is not inherited, so `inherit` takes the **parent's** computed value — the parent is `.floating-toc-dropdown`, which declares none (`:293-307`) and gets none from `.glass-floating`. So on keyboard focus a `.floating-toc-item` drops from its 0.375rem corners to **0**, then restores on blur. The intent (match the ring to the element's radius) needed `border-radius: 0.375rem` or a shared token.
*Falsifier*: `.glass-floating` supplying a radius — refuted, `glass/ladder.css:83-107` declares background / backdrop-filter / border / box-shadow only.

**D-m6 — The bar can render as a bare period.**
`:118-121` interpolates `{{ currentSection?.number }}` **and a literal `.`** outside the optional chain, then `{{ currentSection?.title }}`. `currentSection` is `PaperSectionData | null` (`:13`) and `PaperView.vue:240-245` returns `null` whenever `activeRootId` is null. The window is real: `PaperView.vue:146` initialises `mobileTocVisible = ref(true)` (so the component is normally unmounted at boot), but `onMounted` restores a saved scroll position from `sessionStorage` (`:65`, `:265-270`) before the scroll tracker resolves, which can flip the observer to `false` while `activeRootId` is still null. Whether that transient is ever painted is **UNPROVEN-NEEDS-LIVE (SS-13)**; the unguarded literal is not.

**D-m7 — 51 sections, 13 colours.**
`:154` `:style="… { color: \`var(--section-color-${si})\` } …"` indexes by array position. `tokens/color-radius.css:241-253` publishes **`--section-color-0` … `--section-color-12`** — thirteen stops. `si ≥ 13` yields an undefined custom property, which makes the declaration invalid at computed-value time; `color` being inherited, the row computes to its inherited value (`--foreground`). Net: **13 of 51** active rows are colour-coded and **38** are plain foreground — an active-state affordance that works for the first quarter of the paper. Shared with `PaperSidebar.vue:77`, `:96`, `:112`, so this is a family defect, not a mobile regression.

**D-m8 — `title` is the only label on both icon controls, on a touch-only component.**
`:112` (`title="Close search"`), `:123` (`title="Search paper"`). `title` renders as a hover tooltip; this component is `lg:hidden` (`:107`) and its coarse-pointer sizing (D-M2) confirms the intended device. Neither control has a visible label or an `aria-label`. (For `:123` this compounds D-B3; for `:112` it is the sole defect, since that one *is* a real button.)

**D-m9 — The divider is below the threshold of visibility.**
`:330-334` `background: color-mix(in srgb, var(--border) 50%, transparent)` at `height: 1px`. `--border: var(--neutral-4)` = `hsl(32 26% 70%)` → rgb(198,180,159); at 50% over the page → rgb(225,215,203), Y = 0.6883 ⇒ **1.36:1**. Decorative separators are WCAG-exempt, so this is a design finding: the only structural break between "Scroll to top" and 51 rows does not read. `--border` at full strength is 1.99:1 and would at least be perceptible.

**D-m10 — The scroll lock writes a foreign element's inline style and restores it to the empty string.**
`:45-52` and `:55-59` set `props.scrollContainer.style.overflow = open ? 'hidden' : ''`. Three consequences: (a) it mutates a DOM node owned by `PaperView.vue` (`:302`, `ref="scrollContainer"`), where `.paper-scroll { overflow-y: auto; overflow-x: hidden }` (`:458-465`) — restoring to `''` removes the inline value and returns to the sheet, which happens to be correct today and would silently break any future inline author value; (b) the watcher captures whichever element the prop holds at the time, so a changed `scrollContainer` identity leaves the previous one locked; (c) the unlock fires on `floatingTocOpen = false`, i.e. immediately, while the `toc-expand` leave transition (`:383-396`) is still running — the page becomes scrollable under a still-visible dropdown.

**D-m11 — No `type="button"`.**
At 4.0.0 `Button` forwards `type: u.type` (`dist/button-BNDWhAZb.js`), which is `undefined` when the prop is omitted — as it is at all five call sites (`:112`, `:117`, `:138`, `:150`, `:166`). The rendered `<button>` therefore has no `type` and defaults to `submit`. Harmless today (no ancestor `<form>`), latent otherwise. **Fixed at 7.0.0** — `glass-ui/src/components/button/Button.vue:55` defaults `type` to `"button"` for native hosts.

**D-m12 — Wrong z-rung: the navigation bar takes the in-canvas controls rung, and a 2px decoration outranks it.**
`:196` `z-index: var(--z-controls)`. The registry (`tokens/scheme-motion.css:333-350`) publishes `--z-content: 10`, **`--z-controls: 20`**, **`--z-bar: 30`**, `--z-header: 35`, `--z-overlay: 50`. The component's own class is `floating-toc-**bar**`; the rung named `--z-bar` exists and is bridged to a `z-bar` utility (`theme/bridges.css:237`). Because `:193-199` (`position: sticky` + a numeric `z-index`) opens a stacking context at 20, everything inside is capped there — including `PaperSearch`'s own `.paper-search-results { z-index: var(--z-bar) }` (`PaperSearch.vue:108`), whose 30 is contained and therefore decorative. Against the page, the ToC and its dropdown lose to two live siblings inside the same scroller: `.paper-progress-track` (`PaperView.vue:474-483`, `position: sticky; top: 0; z-index: var(--z-overlay)`) and `.teleport-overlay` (`:502-514`, `position: fixed; inset: 0; z-index: var(--z-overlay)`). The 2px reading-progress hairline paints **over** the top edge of the navigation bar.
*Falsifier*: `--z-controls` not existing (which would make the rule inert and the finding different) — refuted, `tokens/scheme-motion.css:336` declares `--z-controls: 20`. Second falsifier: the overlap being invisible — the track is `height: 2px; margin-bottom: -2px; pointer-events: none`, so the consequence is cosmetic; hence MINOR, not MAJOR.

---

### INFO

---

**D-i1 — Zero test coverage.**
`grep -rn "floating-toc\|MobileFloatingToc" web/e2e/` returns nothing across the nine specs. `CENSUS-2026-08-03.md` / `lane-frontend.md §0,§9` record **vitest ABSENT** and the only frontend gates as `vue-tsc` + 29 Playwright tests on a single chromium project — and a desktop chromium project cannot mount this component at all (`lg:hidden`, `:107`) nor trigger its coarse-pointer sizing. Every finding above is therefore un-gated: D-B1 (a no-op tap), D-M8 (a snap instead of a spin) and D-B2 (an unstyled results list) would all pass every check the repo runs today.

**D-i2 — Three legs of the 4.0.0 `Button` base are inert for every consumer, which is why the authored icon sizes survive.**
The CVA base string includes `[&_svg:not([class*=size-])]:size-(--ui-glyph)`, `[&_svg]:shrink-0`, `[&_svg]:pointer-events-none` (`dist/button-BNDWhAZb.js`). None of the three is emitted anywhere in the shipped CSS: a scan of every `.css` under `node_modules/@mkbabb/glass-ui/dist/` finds `ui-glyph)` only in the token declaration (`tokens/offsets-sizing.css:177`) and `_svg` only inside the SFC bundle `dist/glass-ui.css` (unrelated rules), while the sibling legs of the same string (`whitespace-nowrap`, `text-[length:var(--control-text)]`, `active:scale-(--scale-press-btn)`, `h-(--control-h-md)`) **are** present in `components.css`. The consumer's own Tailwind pass cannot supply them (v4 auto-detection excludes `node_modules`, and `style.css` declares no `@source`). Consequence for this component: `h-3.5 w-3.5` (`:124`) and `h-4 w-4` (`:113`) render as authored rather than being lifted to `--ui-glyph` (1.5rem on touch) — a proportion defect avoided by a library gap, not by design. Worth booking because it is load-bearing for the *absence* of a finding, and because the gap is a producer-side report.

**D-i3 — "Scroll to top" is pinned to the top of a 3 442px list.**
`:138-147` places the escape hatch as the first row of the scroller, above the divider. Once the user scrolls the dropdown to reach §30, the only affordance for returning to the head of the paper has scrolled away with it. Neither the row nor the divider is `position: sticky`. Consistent with `PaperSidebar.vue:58`'s placement, so this is inherited convention rather than local invention — but the desktop sidebar's list is not clipped to 60vh with 67.5px rows.

**D-i4 — Two levels of numbering, one typeface decision, and an opacity that undoes it.**
`:119`, `:162`, `:173` set the section number in `fira-code text-xs` at `opacity-50` (root/bar) and `opacity-40` (sub). The mono numeral against a `cm-serif` title is a deliberate and good idea (S-6) — but at 40% the sub-row numeral composites to roughly rgb(178,164,152) over the page (≈2.5:1), on top of the row text's own 70% mix (D-B4). Two multiplicative fades on the smallest text in the component. Filed INFO because it is a judgement about compounding, not a separate threshold failure.

---

## 3. Superlatives (L-18 runs both ways — each carries its falsifier)

**S-1 — The scroll anchor measures the bar instead of assuming it.**
`useScrollNavigation.ts:23-26`:

```ts
function getScrollOffset(): number {
    const bar = document.querySelector(".floating-toc-bar") as HTMLElement | null;
    return bar ? bar.offsetHeight + 8 : 16;
}
```

Both `computeAbsoluteTop` (`:46`) and `estimateAbsoluteTop` (`:59`) subtract it. This is the correct shape and it is *why* D-M2's 67.5px surprise does not also produce headings hidden under the bar: the arithmetic tracks whatever height the cascade actually delivers, in both modes (the search-mode host at `:110` keeps the `.floating-toc-bar` class deliberately), and degrades to a sane 16px when the component is unmounted.
*Falsifier*: two `.floating-toc-bar` elements racing the `querySelector` — impossible, `v-if`/`v-else` at `:110`/`:117` make them mutually exclusive, and the component itself is singly mounted (`PaperView.vue:319`).

**S-2 — Reduced motion is correct *by absence*. A claim I withdrew.**
The component declares no `@media (prefers-reduced-motion: reduce)` block, which reads as an omission against the 18 PRM references the frontend lane counts. It is not. `glass-ui/dist/styles/utilities/a11y-overrides.css:6-16` ships a library-wide kill that reaches this component's unlayered scoped transitions through `!important`:

```css
*:not([data-allow-motion]) { transition-duration: 0.1s !important;
    transition-property: opacity, color, background-color, border-color, box-shadow !important; }
```

`transform` is **not** in that list, so the `toc-expand` slide (`:383-396`) and the chevron's rotation both lose their spatial leg under PRM while the opacity fade survives — precisely the nuanced behaviour the block documents. The hypothesis "MobileFloatingToc has no PRM handling" was formed and refuted before it was written.
*Falsifier*: the override not reaching an unlayered scoped rule — `!important` in an author-origin rule outranks every normal author declaration regardless of layer, so it does.

**S-3 — The iOS scroll-chaining trio is assembled correctly, and completely.**
`:302-305` (`overscroll-behavior: contain` + `touch-action: pan-y` on the dropdown) plus the container lock at `:45-52` plus the unmount restore at `:55-59`. Three mechanisms are needed on WebKit — the dropdown must not chain, the page must not scroll behind it, and an unmount mid-open must not leave the article frozen — and all three are present, with the third (`onUnmounted`) being the one most components forget. The lock's *manner* is criticised at D-m10; its *presence* is right.
*Falsifier*: a fourth requirement (`position: fixed` body-lock) being needed — not here; the scroller is an element, not the document, so setting `overflow` on it is the correct and less destructive instrument.

**S-4 — The focus-return has a real fallback, written against an uncertainty in the dependency.**
`:25-34`:

```ts
const tocTriggerRef = useTemplateRef<HTMLElement | { $el?: HTMLElement }>("tocTrigger");
function triggerEl(): HTMLElement | null {
    const r = tocTriggerRef.value as HTMLElement | { $el?: HTMLElement } | null;
    if (!r) return null;
    return r instanceof HTMLElement ? r : (r.$el ?? null);
}
```

`Button` is a `<script setup>` SFC with no `defineExpose`, so a template ref yields the instance proxy rather than the element — the author handled both shapes rather than guessing, typed the union honestly, and used `useTemplateRef` (the Vue 3.5 idiom) rather than the legacy same-name binding used three lines below for `dropdownRef` (`:23`). The app-wide focus ring that makes the return visible is also wired, and `style.css:132` names this file as one of its four targets.
*Falsifier*: `$el` being unavailable on a `<script setup>` instance — it is available; `$el` is a public-instance property independent of `expose`.

**S-5 — Opening the dropdown moves focus into it, which is what makes the Esc handler work.**
`:45-52` focuses the `tabindex="-1"` container on open, and `:135` binds `@keydown.esc="dismissDropdown"` on that same container. A `@keydown` on a non-focused div receives nothing; the pairing is deliberate and the inline comment says so ("Also move focus into the dropdown on open so the `@keydown.esc` handler receives the key event"). The mechanism is right even though its coverage is incomplete (D-M5).
*Falsifier*: Esc working via a document-level listener instead — refuted, `PaperView.vue:113`'s `handleGlobalKeydown` (bound to `window` at `:273`) is the paper's own shortcut handler and does not close this dropdown (`grep -n "floatingTocOpen" web/src/` returns only sites inside this file).

**S-6 — The library composable is consumed rather than re-forked, and the choice survives the uplift intact.**
`:61-74` delegates expand/collapse to `useSidebarState` with an explicit `getChildren: (n) => n.subsections` and a documented rationale for the `activeId` stand-in, replacing what the comment records as local reactive `Set`s. The producer's 7.0.0 source (`glass-ui/src/composables/sidebar/useSidebarState.ts`) is shape-identical — same options interface, same `MaybeRefOrGetter` tolerance for cross-package Vue skew, same return surface — so this is the one glass-ui seam in the component that the F.W1 transaction costs **nothing** to carry across. The typographic pairing at `:119`/`:162`/`:173` (mono numeral, serif title) is a second, smaller instance of taste: it is exactly how the printed paper sets its own contents.
*Falsifier*: 7.0.0 having renamed or re-scoped `./sidebar` — refuted, `glass-ui@7.0.0` `package.json` exports carry `./sidebar`, and the source file above resolves under it.

---

## 4. Aggregate — what the component is, measured

| Axis | Reading |
|---|---|
| **Spacing / proportion** | Authored rhythm (45px rows, 0.375rem radius, left edge) is overridden on three of four dimensions by a control primitive the source never names. 51 roots × 67.5px inside a 60vh window = 14.7% visible. Three different left edges (D-m2), two different alignments (D-M3). |
| **glass-ui conformance (old pin)** | Two rungs adopted, both partly destroyed (D-M9). Wrong z-rung with the right one published (D-m12). Radii off the ladder (D-m1). The one seam consumed cleanly is `useSidebarState` (S-6). |
| **Typography** | The KaTeX renderer is required, passed, and never called (D-M7). Numeral/title pairing is good (S-6) and then double-faded (D-i4). |
| **Motion** | PRM correct by inheritance (S-2). The one bespoke transition animates a property that never changes (D-M8). Two of four declarations tokenised, two not (D-m4). |
| **a11y** | Two Level-A failures on one element (D-B3). AA text-contrast failure on every leaf target (D-B4). Three 1.4.11 failures (D-M6). No `aria-expanded`, no landmark, no containment, focus dropped on activation (D-M5). Focus ring present and correctly targeted (S-4) but geometrically wrong (D-m5). |
| **Prose / register** | Comments are unusually good — they cite wave IDs, name the discharged findings, and explain the `activeId` stand-in. Three of them describe work that is now wrong (`A.W3.d` at `:246`/`:348` beside the unconverted `:287`; the A4 focus discharge at `:36` beside three paths that drop focus). |
| **State coverage** | empty ✗ · loading ✗ · error ✗ (D-M11). One guarded transient renders a bare `.` (D-m6). |

---

## 5. Repair ordering (for F.W-*, not a work order)

1. **D-B1** — one line: `@click="props.scrollTo(section.id); sidebarState.toggleSection(section.id)"`, matching `PaperSidebar.vue:74`. Everything else in §2 is cosmetic beside a ToC that cannot navigate.
2. **D-B3** — promote the search span to `<Button variant="ghost" size="icon" aria-label="Search paper">` and lift it **out** of the trigger button (a sibling in `.floating-toc-actions`, with the trigger no longer wrapping it). Retires D-m8's first half and the `@click.stop` at the same stroke.
3. **D-B2** — the structural choice: either give `PaperSearchDropdown`/`PaperSearchInput` their own `<style scoped>` blocks (the KISS repair, no API change), or take the `lane-frontend.md:438` shadow verdict and fold the family onto 7.0.0's `./search`. The second is the F.W1-coupled option.
4. **D-B4 + D-M6** — drop the `color-mix(…, transparent)` wrappers; `--muted-foreground` already ships at 5.195:1 and `--muted-foreground-strong` (`color-radius.css:89`) exists for the level below.
5. **D-M2 + D-M1 + D-M3** — one repair: stop rendering list rows as `<Button>`. `:138`, `:150`, `:166` want a `<button class="floating-toc-item">` (or `size` + explicit `justify-start`/`rounded-*`), at which point the authored padding, radius and alignment all take effect and D-m2's indent arithmetic becomes meaningful.
6. **D-M7, D-M8, D-M4, D-M5, D-M10, D-M11** — independent, each local.

---

## 6. F.W1 uplift ledger — what the tri-package transaction does to *this* component

**Break surface touched: 1 of 6 census rows.** `lucide-vue-next` (`:5`, five icons: `ChevronDown`, `ChevronRight`, `ChevronUp`, `Search`, `X`) is one of the `×35` sites the census books for the `→ @lucide/vue` rename. **Absent from this component:** `metric-badge`, `hover-card`, `hover-popover`, `DockIconButton`, `DockDropdownTrigger`, `ToastVariant` — recorded as a negative so F.W1 budgets none of them here. Both glass-ui subpaths it *does* import (`./button`, `./sidebar`) survive at 7.0.0.

| # | Surface | 4.0.0 (today) | 7.0.0 | Verdict |
|---|---|---|---|---|
| **U-1** | `variant="ghost"` ×5 (`:112`, `:117`, `:138`, `:150`, `:166`) | CVA `variant` prop | **`variant` removed.** `ButtonProps` is `{ emphasis: "primary"\|"secondary"\|"quiet"\|"text", tone, size, iconOnly, loading }` (`glass-ui/src/components/button/Button.vue:15-31`), defaulting to `emphasis: "secondary"`, `tone: "neutral"` — which composes `glass-wash glass-capsule` (`:66-71`). | **BREAKS.** Five transparent ghost rows become opaque glass capsules; `variant="ghost"` falls through to the DOM as a stray attribute. Target is `emphasis="text"`. |
| **U-2** | `size="icon"` (`:112`) | `size` arm `icon` → `h/w-(--control-h-md) p-0` | **`ButtonSize` is `"xs"\|"sm"\|"md"\|"lg"`;** icon geometry moved to a boolean `iconOnly` (`Button.vue:25`). | **BREAKS** — hard `vue-tsc` failure plus a lost size arm. Target is `size="sm" icon-only`. |
| **U-3** | Row height (D-M2) | `height: var(--control-h-md)` via an unlayered utility | `.button { min-block-size: var(--button-size) }` (`button/styles.css:8`) — a floor, not a lock | **IMPROVES.** The authored `padding: 0.5rem 0.75rem` starts composing; rows shrink toward the intended rhythm. Re-measure D-M2's 3 442px after the hop. |
| **U-4** | Bar radius (D-M1) | `btn-pill` → `--radius-pill` | `.button { border-radius: calc(var(--button-size) / 2) }` (`button/styles.css:24`) | **UNCHANGED.** Still a stadium on a 100%-wide bar; the repair must be local either way. |
| **U-5** | Alignment (D-M3) | `btn-pill` `justify-center`, `@layer components` | `.button { justify-content: center; text-align: center }` (`button/styles.css:12`, `:35`) — now explicit *and* in plain CSS | **UNCHANGED / slightly worse** — `text-align: center` is now declared outright, so the local `text-align: left` (`:344`) is defeated on the block rows too, not just the flex ones. |
| **U-6** | `useSidebarState` (`:4`, `:67-74`) | present | shape-identical (`glass-ui/src/composables/sidebar/useSidebarState.ts:19-37`, `:59-80`) | **FREE.** No migration. Note it also means the uplift does **not** repair D-B1. |
| **U-7** | Icon sizes (`h-3.5 w-3.5`, `h-4 w-4`) | the `[&_svg…]` legs are never emitted (D-i2) | real CSS: `.button > svg:not([class*="size-"]) { inline-size: var(--ui-glyph) }` (`button/styles.css:50-53`), `@layer components` | **NEUTRAL** — Tailwind utilities sit in `@layer utilities`, which outranks `components`, so the authored `h-4`/`h-3.5` still win. Worth re-verifying live post-hop (**SS-13**). |
| **U-8** | `type` attribute (D-m11) | absent (`type: undefined`) | `type: nativeButton ? (props.type ?? "button") : undefined` (`Button.vue:55`) | **IMPROVES.** |
| **U-9** | `lucide-vue-next` (`:5`) | 5 icons | `@lucide/vue` (glass-ui 7 deps `^1.16.0`/`^1.20.0`) | **BREAKS** (import specifier only). One of the census's 35 sites. |
| **U-10** | `PaperSearch` family | local, 832 LOC, floating variant unstyled (D-B2) | `./search` + `useFuzzySearch` (`lane-frontend.md:438`) | **DECISION POINT** — D-B2 changes the shadow calculus: the local arm is not merely duplicative, it is visually broken in the exact variant only this component mounts. |

All ten are gated behind the census's atomic `glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0` transaction; none is separately landable.

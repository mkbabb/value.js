claude-opus-5[1m]

# CHALLENGE — `PaperSearchModal.vue` · axis **D (DESIGN)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/search/PaperSearchModal.vue` (124 lines)
**Axis** spacing/proportion · glass-ui conformance under the old pin · typography · motion + reduced-motion · a11y · prose · state coverage
**Posture** component assumed DEFECTIVE until the tree proves otherwise; every claim carries severity + `file:line` + its falsifier (L-18: superlatives too)
**Tooling** static + source-derived only. No browser. Two claims are marked **UNPROVEN-NEEDS-LIVE** and reserved for SS-13.

**VERDICT — the component does not render as designed.** Its entire authored visual contract is dead CSS. This is not an inference: it is legible in the shipped build artifact, and it is derivable from three independent source facts (compiler, bundler plugin, runtime). Everything else in this file is downstream of that.

---

## §0 · Files read (whole, read-only)

| File | Why |
|---|---|
| `web/src/components/paper/search/PaperSearchModal.vue` | subject |
| `web/src/components/paper/PaperSearch.vue` (397) | **the sole owner of every class the subject emits**; `<style scoped>` at :41 |
| `web/src/components/paper/search/usePaperSearch.ts` (108) | `PaperSearchState` (prop type) |
| `web/src/components/paper/search/searchHelpers.ts` (74) | `TYPE_LABELS`, `resultLabel`, `highlightFuzzy` |
| `web/src/components/paper/search/paperSearchIndex.ts` (401) | `fuzzyMatch`, `searchIndex` (empty-query contract) |
| `web/src/components/paper/search/PaperSearchInput.vue` (69), `PaperSearchDropdown.vue` (70), `index.ts` | siblings — the house idiom the subject must answer to |
| `web/src/components/paper/PaperView.vue` (search wiring, ⌘K), `MobileFloatingToc.vue` (focus-restore idiom) | consumers |
| `web/src/style.css` (143) | the only global stylesheet |
| `@mkbabb/glass-ui@4.0.0` — `button-BNDWhAZb.js`, `ModalOverlay-CkPRRgl_.js`, `search.js` + `components/custom/search/**.d.ts`, `styles/glass/surfaces.css`, `styles/tokens/{color-radius,dark-arm,light-dark,offsets-sizing,scheme-motion}.css`, `styles/typography/utilities.css`, `styles/utilities/a11y-overrides.css`, `package.json` exports map | the installed pin |
| `@vitejs/plugin-vue/dist/index.mjs`, `@vue/runtime-core/dist/runtime-core.cjs.js`, `@vue/compiler-sfc` | the scope-id mechanism |
| `web/dist/assets/*.{css,js}` (build 2026-06-12 18:13) | shipped artifact — **exact-source** for both subject and style owner (see D-1 falsifier) |

**Corpus folded** (not re-derived): `formation/fourier/CENSUS-2026-08-03.md:99,336`; `formation/fourier/lane-frontend.md:159-165,290,438,§5`; `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R3-11** and **X-6**.

---

## §1 · Epistemic tiering — read this before the findings

D-1 kills every CSS rule the component depends on. That has a consequence the audit must state honestly rather than double-count:

- **LIVE** findings hold at HEAD as the code runs today.
- **LATENT** findings are defects in the *authored* CSS that D-1 currently masks. They are not hypothetical: the repair wave's cure for D-1 is to make those rules apply, and the instant it does, each LATENT finding becomes LIVE. A LATENT BLOCKER is still a BLOCKER for the wave that fixes D-1 — it must be fixed *in the same wave*, or the wave ships a regression.

Every finding below is tagged **[LIVE]** or **[LATENT]**.

---

## §2 · BLOCKERS

### D-1 · **[LIVE] BLOCKER** — the modal's entire stylesheet is orphaned by Vue scoping; the "modal" is an unstyled block appended to the end of `<body>`

`PaperSearchModal.vue` declares **no `<style>` block**. Every class it emits — `.search-modal-overlay` (:45), `.search-modal` (:48), `.search-modal-header` (:50), `.search-modal-icon` (:51), `.search-modal-input` (:55), `.search-modal-results` (:82), `.search-modal-result` / `.paper-search-result` (:87), `.paper-search-badge` (:92), `.paper-search-number` (:95), `.paper-search-label` (:99), `.search-modal-empty` (:104), `.search-modal-footer` (:109), `.search-modal-hint` (:110,113,116), `.paper-search-action-btn` (:64,73), and the six `search-modal-*` Transition classes on `<Transition name="search-modal">` (:42) — is defined **only** inside `PaperSearch.vue`'s `<style scoped>` (PaperSearch.vue:41-397).

Four independent facts close this:

1. **Compiler.** `compileStyle({scoped:true})` over PaperSearch.vue's block appends the scope attribute to *every* selector: `.search-modal-overlay[data-v-…]`, `.paper-search-result[data-v-…]`, `.paper-search-label[data-v-…]::…`, and `:deep(mark)` → `.paper-search-label[data-v-…] mark` (PaperSearch.vue:185).
2. **Bundler.** `@vitejs/plugin-vue/dist/index.mjs:1326` — `if (hasScoped) attachedProps.push(['__scopeId', …])`. No scoped style ⇒ **no `__scopeId`** on the subject's component object.
3. **Runtime.** `@vue/runtime-core/dist/runtime-core.cjs.js:677` — `currentScopeId = instance && instance.type.__scopeId || null`; `:7631` — every vnode is created with `scopeId: currentScopeId`. So every element the subject renders is born with `scopeId: null`. The *only* path by which a parent's scope id reaches a child is `setScopeId` at `:5685-5700`, gated on `vnode === parentComponent.subTree` — i.e. **the child's root node, and nothing deeper**. The subject's root subtree is the `<Teleport>` vnode at `:41`; `.search-modal-overlay` is a grandchild (Teleport → Transition → div). The gate never fires.
4. **Shipped artifact.** `web/dist/assets/*.css`:
   `.search-modal-overlay[data-v-a7d16b8c]{z-index:var(--z-modal);…display:flex;position:fixed;inset:0}`
   `web/dist/assets/PaperView-CS2UAWt8.js`:
   `…B(Hr,{search:e.search},null,8,["search"])],2))}}),ei=lt(jr,[["__scopeId","data-v-a7d16b8c"]])…`
   — the id is attached to `jr` (**PaperSearch.vue**) and to nothing else; `a7d16b8c` occurs **exactly once** in all emitted JS. And the subject's overlay is emitted as
   `p("div",{key:0,class:"search-modal-overlay",onClick:…})` — **no scope attribute in the props object**.

**What actually renders.** `.search-modal-overlay` never receives `position:fixed; inset:0`. The teleported subtree is therefore a plain static block at the end of `<body>`, *below the whole document*, with no overlay, no scrim, no backdrop blur, no z-index, no panel, no scroll containment, no transition. The result rows are `<Button>` (glass-ui), so they keep only the producer's own base: `btn-pill tap-squish focus-ring whitespace-nowrap …` (`button-BNDWhAZb.js`) → `.btn-pill { inline-flex; justify-content:center; border-radius:var(--radius-pill); padding: calc(.5rem*--ui-scale) calc(1rem*--ui-scale) }` and `.btn-pill > * { flex-shrink:0 }` (`glass/surfaces.css:119-158`). The authored `width:100%; display:flex; align-items:baseline; text-align:left` (PaperSearch.vue:118-130, verbatim in the built CSS as `.paper-search-result[data-v-a7d16b8c]{…width:100%;…display:flex}`) is dead. So up to 30 results render as **content-width, centre-justified, non-shrinking, nowrap pills wrapping across a block container** — not a list. On a coarse pointer each header icon button is `h-(--control-h-md) w-(--control-h-md)` = `max(2.5rem×1.5, 2.75rem)` = **3.75rem/60px** (`offsets-sizing.css:151`, `light-dark.css:17-22`), because `.paper-search-action-btn{padding:.15rem}` (PaperSearch.vue:84-95) is dead too.

**Provenance of the break.** It is a refactor casualty, not an original sin. At `ffba307^` (before `feat(A.W1.a.1)`, 2026-05-26) `PaperSearch.vue` was a monolith: `<Teleport to="body">` at :194, `.search-modal-overlay` at :198, `<style scoped>` at :275 — same SFC, so the scope id reached the teleported subtree and the styles applied. `ffba307` moved the markup out and left the CSS behind.

**Falsifier (run it).** `grep -rn "search-modal\|paper-search-result\|paper-search-badge\|paper-search-label\|paper-search-action-btn" web/src web/node_modules/@mkbabb/ web/index.html` filtered to exclude `PaperSearch.vue` and `search/` → **empty**. No global, no glass-ui, no `latex-paper`/`pencil-boil` rule defines any of them. The claim dies if any unscoped definition exists, or if the subject gains a `<style>` block, or if `PaperSearch.vue:41` loses `scoped`.
**Dist-freshness falsifier.** The dist is 2026-06-12; `git diff --stat 262c3d0 -- PaperSearchModal.vue PaperSearch.vue` (last touch 2026-06-02) is **empty** — the build is an exact-source build of both files at HEAD. Only a later edit to either file would stale it.

**Scope note (out-of-file, reported for the wave).** The same mechanism partially orphans both siblings: `PaperSearchInput.vue`'s root `.paper-search-input-wrap` *does* inherit the id (single element root ⇒ the `setScopeId` gate fires), but `.paper-search-icon` / `.paper-search-input` / `.paper-search-action-btn` beneath it do not; `PaperSearchDropdown.vue` has a two-node fragment root, so `filterSingleRoot` returns undefined (`runtime-core.cjs.js:5687-5689`) and **nothing** in it is scoped. The repair is one wave, not three.

---

### D-2 · **[LIVE] BLOCKER** — it is not a dialog: no role, no name, no focus trap, no focus restore, no inert background, no scroll lock

`grep -rn "aria-\|role=" web/src/components/paper/search/ web/src/components/paper/PaperSearch.vue` → **zero matches across the entire search family**.

- `.search-modal` (:48) has no `role="dialog"`, no `aria-modal="true"`, no `aria-label`/`aria-labelledby`. To AT it is an anonymous `<div>`.
- **No focus trap.** Focus is placed on the input (:20-26) and then free. Tab → Collapse (:61) → Close (:70) → up to 30 result buttons (:83-102) → **out of the teleported subtree into the page behind**, which is neither `inert` nor `aria-hidden`.
- **No focus restore.** Neither `close()` nor `toggleExpanded()` (usePaperSearch.ts:48-61) records or returns focus; the subtree unmounts with focus inside it, dropping focus to `<body>`. This is a deviation from the house's own idiom **in the same directory tree**: `MobileFloatingToc.vue:39` does `nextTick(() => triggerEl()?.focus())`.
- **No scroll lock.** Nothing touches `body`/`documentElement` overflow (`grep -rn "body.style\|scroll-lock\|overflow: hidden" web/src/components/paper/**` → only unrelated scoped rules).

WCAG 2.4.3 (Focus Order), 4.1.2 (Name/Role/Value), 2.1.2 (No Keyboard Trap — inverse: no *containment*), 1.3.1.

**Conformance aggravation.** glass-ui **4.0.0 — the installed pin** ships `ModalOverlay` built on reka-ui `DialogOverlay` (`ModalOverlay-CkPRRgl_.js`: `fixed inset-0 z-overlay [backdrop-filter:var(--glass-blur-wash)]` + `bg-overlay-scrim` + `sheet-animate`) and exports `./dialog`, `./command`, `./keyboard`. reka-ui's Dialog supplies role, `aria-modal`, focus trap, focus restore, scroll lock and Escape — **all six missing behaviours, free, at the current pin**. Nothing here needed to be hand-rolled.

**Falsifier.** Find a single `role`/`aria-*`/`inert`/focus-trap/scroll-lock in the subject or its composable, or an ancestor supplying dialog semantics to a `Teleport to="body"` subtree (structurally impossible — it is a direct child of `<body>`).

---

### D-3 · **[LATENT] BLOCKER** — the modal's chrome text fails WCAG 1.4.3 in **both** themes, by a factor of ~2.4×

The authored colours dilute an **already-muted** token with alpha. `color-mix(in srgb, C p%, transparent)` is `C` at alpha `p` (premultiplied interpolation: `transparent` contributes zero to the colour channels), composited over `--background`.

Tokens (`tokens/color-radius.css:57,85`; `tokens/dark-arm.css:42,47`; `tokens/light-dark.css:83,88`):
`--background = --neutral-0` = `hsl(40 30% 98%)` light / `hsl(24 9% 4%)` dark; `--muted-foreground = --neutral-5` = `hsl(30 22% 40%)` light / `hsl(34 14% 62%)` dark. Undiluted these are **5.21 : 1** and **7.70 : 1** — the producer's own comments at those lines say 5.21 and 7.64, so the method reproduces glass-ui's numbers.

| Surface | Rule | Size | Light | Dark | AA needs |
|---|---|---|---|---|---|
| `.search-modal-hint` (footer prose + the three `<kbd>` legends, :110/:113/:116) | PaperSearch.vue:336-338 — `--muted-foreground` @ **45%** | `@apply text-sm` (0.875rem) | **1.88 : 1** | **2.39 : 1** | 4.5 : 1 |
| `.search-modal-empty` ("No results", :104) | PaperSearch.vue:321-326 — @ **50%** | `@apply text-base` (1rem) | **2.04 : 1** | — | 4.5 : 1 |
| `.search-modal-input::placeholder` ("Search paper…", :56) | PaperSearch.vue:292-294 — @ **40%** | `text-base` | **1.74 : 1** | — | 4.5 : 1 |
| `.search-modal-icon` (:51) | PaperSearch.vue:274-279 — @ **50%** | glyph | **2.04 : 1** | — | 3 : 1 (1.4.11) |

Every one of the modal's four non-result surfaces fails. The footer legend is the *only* prose teaching the keyboard model, and it is the worst offender. This is not a borderline call for this repo: `style.css:113-122` already carries a hand-written darken of `--viz-amber` because glass-ui shipped it at **3.54 : 1** — the house treats 3.54 as unshippable, and this file ships **1.74**.

**Falsifier.** Recompute with WCAG 2.x relative luminance over the two `--neutral-0` values. The claim dies if (a) `color-mix(… , transparent)` is shown not to yield the source colour at alpha *p*, or (b) `--muted-foreground` is re-bound above `--neutral-5` somewhere in the fourier cascade (`grep -rn -- "--muted-foreground" web/src/` → empty), or (c) these spans are proven to inherit a different colour. Note (c) is exactly what D-1 does *today* — with the rules dead the spans inherit `text-foreground` and pass. That is why this is LATENT, and why it must be repaired **in the same wave** as D-1.

---

## §3 · MAJOR

### D-4 · **[LIVE] MAJOR** — no combobox/listbox semantics: `selectedIndex` is a purely visual fiction
`selectedIndex` (:88) drives only the `is-selected` class. There is no `role="combobox"` / `aria-expanded` / `aria-controls` / `aria-activedescendant` on the input (:52-60), no `role="listbox"` on the container (:82), no `role="option"` / `aria-selected` on the rows (:83-102), and no `aria-live` region announcing the result count or the "No results" transition (:104). A screen-reader user pressing ↓ hears nothing change; pressing Enter navigates the paper with no prior announcement of the target.
**Falsifier.** Any `aria-activedescendant`/`role=option` in the subtree, or an ancestor `role="listbox"`. `grep` over the family → none (D-2).

### D-5 · **[LIVE] MAJOR** — the keyboard model dies the moment focus leaves the input
`@keydown="search.onKeydown"` is bound **only** to the `<input>` (:59). Each of the up-to-30 results is a real `<button>` (glass-ui `Button` defaults `as: "button"`, `button-BNDWhAZb.js`), hence tabbable. Once the user Tabs to a result — a natural move once they can see the list — ↑/↓/Enter/**Escape** all stop working (`usePaperSearch.ts:63-92` is never invoked), and the only exit is a mouse click on the (unstyled, off-screen) overlay. Compounding: 30 tabbable buttons is itself a Tab-order defect; the canonical palette pattern keeps the list non-tabbable and drives it from the input.
**Falsifier.** A document-level keydown listener while expanded (`PaperView.vue:113-118,273` binds ⌘K only), or `tabindex="-1"` on the rows.

### D-6 · **[LIVE] MAJOR** — hover hijacks keyboard selection, and the scroll-into-view watcher can re-arm it
`@mouseenter="search.selectedIndex.value = i"` (:90) mutates the same state the arrow keys own, with no "pointer has moved" guard. Two consequences: (a) a stationary cursor resting anywhere over the list silently overrides every arrow-key press the moment the list re-renders; (b) the `selectedIndex` watcher (:28-37) calls `scrollIntoView`, which moves rows under the stationary pointer — and a UA that re-hit-tests on programmatic scroll will fire `mouseenter`, writing `selectedIndex` again. (a) is source-certain. (b) is **UNPROVEN-NEEDS-LIVE (SS-13)** — it dies if the UA does not re-dispatch `mouseenter` on programmatic scroll.
**Falsifier for (a).** Any pointer-movement guard, or `@mousemove` in place of `@mouseenter`.

### D-7 · **[LIVE] MAJOR** — false empty state; zero loading state; zero error state
`searchIndex(index, query, 30)` returns `[]` for an empty/whitespace query (`paperSearchIndex.ts:203-207`). `results.value.length > 0` (:82) is therefore false whenever the query is empty, so the `v-else` branch paints **"No results"** (:104-106) for the *idle* case. The user clears the input inside the modal and is told the paper contains nothing. The correct third state — an idle prompt / recent / scoped hint — does not exist. There is likewise no busy affordance across the 120 ms debounce (`usePaperSearch.ts:26-33`) and no error branch anywhere in the family.
**Falsifier.** Show `searchIndex` returning a non-empty list for `""`, or an idle branch distinct from the no-match branch.

### D-8 · **[LIVE] MAJOR** — the component's declared public API is dead
`const emit = defineEmits<{ select: [id: string] }>()` (:14-16) is **never called**; the parent binds no `@select` (`PaperSearch.vue:35-37`). Selection actually flows through the injected `search.selectResult` → `options.navigateTo` (`usePaperSearch.ts:43-46`). The component advertises an event contract it does not honour — a reader wiring `@select` gets silence. (The identical dead emit exists at `PaperSearchDropdown.vue:12-14`.)
**Falsifier.** Any `emit("select", …)` in the subject, or an `@select` binding on it.

### D-9 · **[LIVE] MAJOR** — glass-ui shadow at the *installed* pin, not merely at 7.0.0
The census files this family as a **🟡 CANDIDATE** shadow (`CENSUS-2026-08-03.md:99`; `lane-frontend.md:438` — "`./search` … present at 4.0.0 AND 7.0.0"). **I elevate that grading.** The installed `@mkbabb/glass-ui@4.0.0` ships, under `./search`:

```
FuzzySearch.vue · SearchBar.vue · useFuzzySearch · buildIndex/searchIndex/fuzzyMatch/clearSearchCache
types: SearchableItem · SearchResult · FuzzySearchState { query, results, selectedIndex, isOpen,
       isExpanded, onKeydown, selectResult, toggleExpanded, close, open }
```
`FuzzySearchState` is **member-for-member identical** to fourier's `PaperSearchState` (`usePaperSearch.ts:94-105`), `UseFuzzySearchOptions` defaults are `debounceMs: 120` / `maxResults: 30` — the exact constants at `usePaperSearch.ts:32,36` — and `fuzzySearchIndex.d.ts`'s scoring docstring (`+8 / +7 / +6 / +5 / +3 / +1 / −0.1`) is **byte-equivalent prose** to `paperSearchIndex.ts:61-68`. `FuzzySearch.vue` even takes the same `variant?: "sidebar" | "floating"` union as `PaperSearchDropdown.vue:9`. This is not a candidate convergence; it is a verbatim fork of a shipping producer primitive, and `./search` is imported **0 times** in fourier. Add `./dialog` + `ModalOverlay` (D-2) and `./command`, and the subject's remaining original content is ~0.
**Falsifier.** Show a capability in the subject that `FuzzySearch` + `ModalOverlay`/`Dialog` cannot express at 4.0.0 — or show `./search` imported anywhere in `web/src`.

### D-18 · **[LATENT] MAJOR** — the modal transition has no `prefers-reduced-motion` guard
`PaperSearch.vue:359-396` animates opacity + `scale(0.96) translateY(-8px)` over 0.25 s on enter and `scale(0.97) translateY(-4px)` over 0.15 s on leave, on a full-viewport surface, atop a `backdrop-filter: blur(6px)` scrim (:248). `grep -c "prefers-reduced-motion" PaperSearch.vue` → **0**, against **12 files** in `web/src` that carry the guard, with the canonical seat two files away at `style.css:92-96`. A scale-plus-translate entrance of a viewport-sized panel is precisely the vestibular trigger 2.3.3/`reduce` exists for.
**Falsifier.** A guard in the file, or an ancestor `@media (prefers-reduced-motion: reduce) *{animation:none}` reset — `grep -rn "prefers-reduced-motion" web/src/style.css` shows only the tab-panel-scoped block at :92.
**Interaction note.** At HEAD, D-1 means the Transition classes are inert and Vue resolves the hooks immediately — no animation runs. The defect is in the CSS as authored and goes live with D-1's cure.

### D-19 · **[LATENT] MAJOR** — dark-mode figure/ground collapse: the panel is invisible against its own scrim
Three separations are specified and all three vanish on the dark arm:
- panel fill `background: var(--background)` (PaperSearch.vue:259) is **the same token as the page** — zero fill delta;
- `box-shadow: 0 8px 40px rgba(0,0,0,.14), 0 2px 8px rgba(0,0,0,.06)` (:260-262) is hardcoded black, invisible over `hsl(24 9% 4%)`, and bypasses the token system entirely;
- the scrim `color-mix(in srgb, var(--background) 55%, transparent)` (:247) is the page colour over the page colour — in dark mode it darkens essentially nothing, leaving only the 6 px blur.

What remains to say "this is a modal" is a single 1.5 px `--border` = `--neutral-4` = `hsl(30 16% 34%)` hairline. In light mode the same three specs read correctly, so the surface was designed on one arm only.
**Falsifier.** A `.dark` override for `.search-modal`'s background or shadow — `grep -n "\.dark" PaperSearch.vue` → none.

### D-20 · **[LATENT] MAJOR** — viewport-unit incoherence across the same box
`padding-top: min(12vh, 6rem)` (:246) and `max-height: 70vh` (:254) use the **static** viewport, while `width: min(36rem, calc(100dvw - 2rem))` (:253) uses the **dynamic** one. On iOS with a retracting URL bar the panel's vertical budget and offset are computed against a viewport its own width does not agree with: the height ceiling over-reports by the toolbar band while the width is honest, so the panel can exceed the visible area exactly when the software keyboard (which this modal always raises — it autofocuses at :20-26) has shrunk it most.
**Falsifier.** Show `vh == dvh` on the target device matrix, or that the `dvw` choice at :253 was arbitrary rather than deliberate (the `calc(… - 2rem)` gutter argues deliberate).

---

## §4 · MINOR

### D-10 · **[LIVE] MINOR** — `title=` where the house uses `aria-label=`
`title="Collapse"` (:66) and `title="Close"` (:75) on two icon-only Buttons. `title` *does* reach the accessible-name computation as last resort, so this is not nameless — but it is the weakest rung, it renders a native tooltip that is unreachable by keyboard and absent on touch, and it deviates from a firmly established house idiom: **60** `aria-label` occurrences in `web/src` vs 42 `title`, with the paper tree's own seats at `PaperSidebar.vue:50`, `AppHeader.vue:63,115`, `DarkModeToggle.vue:5`.
**Falsifier.** Show `aria-label` is *not* the house idiom, or that these two buttons carry text content (they do not — `<Minimize2/>`, `<X/>` only).

### D-11 · **[LIVE] MINOR** — global `document.querySelector` where the sibling uses a ref
`:32` — `document.querySelector(".search-modal-results")`, then `container?.querySelector(".is-selected")`. The sibling solves the identical problem with a template ref (`PaperSearchDropdown.vue:16,24`). The subject reaches into global DOM for an element it itself renders, and couples the JS to a class name that (per D-1) has no styling contract to justify it.
**Falsifier.** A reason a ref cannot be used through `Teleport` — there is none; refs resolve through Teleport normally.

### D-12 · **[LIVE] MINOR** — 20 lines of result-row markup duplicated verbatim
`:83-102` vs `PaperSearchDropdown.vue:41-60` differ only in the extra `search-modal-result` class and a `modal-` key prefix. Two sources of truth for one visual atom; the row's badge/number/label proportion must now be edited in two places, and the fact that they *have* already drifted (`.search-modal-result .paper-search-badge` re-tunes the badge at PaperSearch.vue:308-319) proves the drift is live.
**Falsifier.** Diff the two blocks.

### D-13 · **[LIVE] MINOR** — the modal has no keyboard entry point
⌘/Ctrl+K (`PaperView.vue:113-118`) calls `search.open()`, which sets `isOpen` — the **inline dropdown**, never `isExpanded`. The only route into the modal is a mouse click on the expand button, which itself only exists when `canExpand` (`PaperSearch.vue:28` — non-empty query *and* ≥1 result). A keyboard-only user cannot reach the expanded view at all, and the footer legend (:109-119) teaches ↑↓/↵/esc while omitting the one key that got the user here and any route to the surface they are looking at.
**Falsifier.** Any binding that sets `isExpanded` from the keyboard.

### D-14 · **[LIVE] MINOR** — the icon size props are inert
`<Minimize2 class="h-3.5 w-3.5"/>` (:68) and `<X class="h-3.5 w-3.5"/>` (:77). glass-ui's Button base applies `[&_svg:not([class*=size-])]:size-(--ui-glyph)` (`button-BNDWhAZb.js`); `h-3.5 w-3.5` contains no `size-`, so the guard does not exempt it, and the producer's compound selector out-specifies the bare utilities. The icons render at `--ui-glyph` = `calc(1rem × --ui-scale)`, not 14 px. The sibling's visually distinct `h-3 w-3` (`PaperSearchInput.vue:55-56`) is inert for the same reason — the two surfaces the author intended to differentiate are byte-identical in output.
**Falsifier.** Rank the specificity: `.btn-pill svg:not([class*=size-])` (0,2,1) vs `.h-3\.5` (0,1,0). Dies if the utility is emitted in a later cascade layer that wins regardless — check the layer order in the built CSS.

### D-15 · **[LIVE] MINOR** — prose
- **"No results"** (:105) — bare, no query echo, no recovery ("No results for *foo* — try a section number or theorem name"). It is also wrong half the time (D-7).
- **"Search paper…"** (:56) — verb+noun ambiguity ("search *the* paper" vs "search-paper"); the gallery's own placeholder is the clearer `"Search by slug..."` (`e2e/gallery.spec.ts:19`).
- **Register clash** in the footer: `<kbd>esc</kbd>` lowercase (:117) beside Title-Case tooltips "Collapse"/"Close" (:66,:75); the convention is `Esc`.
- **`&crarr;` (↵) "select"** (:114) — a bare glyph carrying the primary action, with no textual `Enter`. Combined with D-3 this is the least legible, lowest-contrast, least-announced string in the component and it is the one that teaches the primary interaction.

### D-21 · **[LATENT] MINOR** — the dominant vertical axis is optically misaligned
Content insets from the panel edge: header `0.875rem` (PaperSearch.vue:270), footer `0.875rem` (:332), but a result row = container `0.375rem` (:301) + row `0.625rem` (:305) = **1.0rem**. The search glyph, the result badges and the footer legend are the three things stacked on the modal's strongest vertical line, and the middle one is off by `0.125rem` (2 px @16). Aristotelian proportion is not violated by the *values* — 0.75/0.875/0.5/0.375/0.625 rem is a defensible progression — it is violated by the **alignment those values happen to produce**, which no one computed.
**Falsifier.** Arithmetic: 0.375 + 0.625 ≠ 0.875.

### D-22 · **[LATENT] MINOR** — two radius systems and two hairline scales in one box
`.search-modal { border-radius: 0.75rem; border: 1.5px }` (:257-258) is hardcoded, while every child derives from the token: `calc(var(--radius) - 2px)` (:113), `calc(var(--radius) - 4px)` (:128), `3px` (:144,:351). The panel is the one surface that should *define* the radius relationship and it opts out. Likewise the panel border is `1.5px` while its own header/footer dividers are `1px` (:271,:333) — two hairline weights, no rule distinguishing them.
**Falsifier.** Show `--radius` resolves to a value making `0.75rem` the correct outer term of the same series (`--radius` is glass-ui-owned; the file never reads it for the panel).

### D-23 · **[LATENT] MINOR** — sub-legible type
`.search-modal-hint kbd { font-size: 0.6rem }` (:354) = **9.6 px** at the desktop root (`style.css:45-50` sets `html{font-size:1rem}` ≥768px). `.paper-search-badge` is also `0.6rem` (:140), uppercase, `letter-spacing:.04em`, `line-height:1`. Keycap glyphs (↑ ↓ ↵) at 9.6 px inside a 1.125rem×1.25rem box, at 1.88 : 1 contrast (D-3), are decorative rather than readable. The producer's own control register is `--control-text = calc(--type-small × --ui-scale)` (`offsets-sizing.css:170`) — the file bypasses it.
**Falsifier.** Measure: `0.6 × 16 = 9.6`.

### D-24 · **[LATENT] MINOR** — non-token colour literals with no dark arm
`.paper-search-badge[data-type="definition"] { background: hsl(210 80% 55% / .12); color: hsl(210 80% 45%) }` (:158-161) and the equation badge `hsl(280 …)` (:163-166) and `mark { background: hsl(50 100% 60% / .35) }` (:186). Three hardcoded hues, none from the palette, none re-bound under `.dark`. `hsl(210 80% 45%)` over a 12 %-alpha wash on `hsl(24 9% 4%)` is a dark-on-dark badge. The house has a token for exactly this (`--section-color-*`, `--viz-*`, `style.css:119-127`).
**Falsifier.** A `.dark` arm for these three; `grep -n "\.dark" PaperSearch.vue` → none.

---

## §5 · INFO

### D-16 · **[LIVE] INFO** — raw TeX is the display label for equations
`resultLabel` (`searchHelpers.ts:24-28`) falls through to `r.rawTex.slice(0, 120)`. Equation and math-block results therefore show raw source — `\frac{1}{2\pi}\int_{-\pi}^{\pi}f(x)e^{-inx}\,dx` — hard-cut at 120 chars, mid-token, then ellipsised by CSS that is dead (D-1) while `whitespace-nowrap` from `btn-pill` is not. For a paper-reading audience this is arguably correct (searching by TeX is a real workflow); it is flagged as INFO, not a defect, because the 120-char cut is a *rendering* decision made in a *label* helper with no awareness of the box it lands in.

### D-17 · **[LIVE] INFO** — the file's only F.W1 uplift exposure
`import { Search, X, Minimize2 } from "lucide-vue-next"` (:4) is 1 of the **35** sites the 4→7 hop renames to `@lucide/vue` (`lane-frontend.md §5`). **Negative result, reported honestly:** the census's named break surface — `metric-badge` ×7, `hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `ToastVariant` — touches this file **zero** times. Its only glass-ui import is `./button` (:2), which survives 4→7 intact. See §6 for what the uplift *improves* here rather than breaks.

---

## §6 · Glass-ui ledger under the old pin (F.W1)

**What the uplift BREAKS in this file: nothing but the lucide rename (D-17).** One import, `./button`, both present at 4.0.0 and 7.0.0. The tri-package resolution deadlock (`glass-ui 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0`, `lane-frontend.md §5 🔴`) gates the file but does not itemise against it.

**What the uplift IMPROVES — and what is already available at 4.0.0:**

| Lever | 4.0.0 (installed) | 7.0.0 | Effect on this file |
|---|---|---|---|
| `./search` — `FuzzySearch`, `SearchBar`, `useFuzzySearch`, `fuzzySearchIndex` | **present** | present, **plus** `useDockSearch` composing `useFuzzySearch` (`dock/index.ts`: "the VSCode subsequence scorer — NO re-fork") | D-9. Adoptable **today**; the uplift only widens the case. |
| `ModalOverlay` (reka-ui `DialogOverlay`) + `./dialog` + `./command` | **present** | present | D-2 — role, `aria-modal`, focus trap, focus restore, scroll lock, Escape, all free at the current pin. |
| `.btn-pill` / `--ui-scale` comfort axis (`glass/surfaces.css:119-158`, `light-dark.css:17-22`) | present | present | Currently *causes* the D-1 render (content-width centred pills, 60 px touch controls) because the local overrides are orphaned. A conforming rewrite inherits the WCAG-2.5.5 44 px floor instead of fighting it. |
| `@media (forced-colors: active)` focus survival for `.btn-pill` (`utilities/a11y-overrides.css:68-90`) | present | present | The hand-rolled surface gets none of this for its own chrome. |
| `--ease-standard` / `--ease-out-expo` / `--ease-in` (`tokens/scheme-motion.css:216-219`) | present | present | Already correctly consumed — see **S-3**. |
| `./scrolling-text`, `./metric-badge`, `./hover-*`, `./toggle-chip` retirements | n/a | removed | **Not consumed here.** No exposure. |

**Grading correction to the corpus.** `CENSUS-2026-08-03.md:99` and `lane-frontend.md:438` file the PaperSearch family as 🟡 **CANDIDATE**. On the evidence in §D-9 — identical state interface, identical `120`/`30` defaults, byte-equivalent scoring docstring, identical `variant` union — this is a **HARD** shadow by the census's own definition ("a producer subpath exists and is unimported" understates it; the local code is a *fork*, not an alternative). I do not contradict the census's facts; I re-grade its severity, and the re-grading is falsifiable by the four correspondences above.

---

## §7 · Corpus reconciliation

| Corpus row | Claim | This challenge |
|---|---|---|
| `lane-fourier-r3-r6.md` **R3-11** | "`PaperSearchModal.vue:41`" is one of exactly two `<Teleport` sites | **CONFIRMED.** Line 41 is `<Teleport to="body">`. Adopted as the anchor for D-1 (the Teleport root is precisely why the `setScopeId` gate cannot fire). |
| `lane-fourier-r3-r6.md` **X-6** | Codex fills a census gap: 2 Teleports, `PaperSearchModal.vue:41` + `FullscreenViewer.vue:105` | **CONFIRMED** for the subject's half. |
| `CENSUS-2026-08-03.md:336` | "2 Teleports (`PaperSearchModal.vue:41`, …)" | **CONFIRMED.** |
| `lane-frontend.md:159` | `PaperSearchModal.vue` = 124 LOC | **CONFIRMED** (`wc -l` = 124). |
| `lane-frontend.md:290` | `PaperSearchModal.vue:3` imports `Button` from `@mkbabb/glass-ui/button` | **CONFIRMED**; it is the file's *only* glass-ui import (D-17). |
| `CENSUS-2026-08-03.md:99` / `lane-frontend.md:438` | PaperSearch family = 🟡 CANDIDATE shadow vs `./search` | **RE-GRADED to HARD** (§6). Facts agreed; severity contested with evidence. |
| `CENSUS-2026-08-03.md` §3a hygiene | "18 reduced-motion references" | **NOT a contradiction, unit note:** I measure **12 *files*** containing the guard (`grep -rln … \| wc -l`); references ≥ files. Either way `PaperSearch.vue` contains **0** (D-18). |
| Whole corpus | — | **No corpus row is contradicted.** The corpus never audited this file on the design axis; D-1, D-2 and D-3 are new. |

---

## §8 · Superlatives (L-18 runs both ways)

Each is a decision the author got *right* and that a competent rewrite must preserve. Each carries its falsifier.

**S-1 · `scrollIntoView({ block: "nearest" })`** (:34). The naive choices — `"center"`, or `behavior:"smooth"` — recentre the list on every arrow key and fight `prefers-reduced-motion`. `"nearest"` scrolls only when the row is actually out of view. This is the correct answer and it is the less obvious one. *Falsifier:* show `"center"`/`"smooth"` would be preferable for a 30-row palette.

**S-2 · Textbook scroll containment.** `.search-modal{overflow:hidden}` (PaperSearch.vue:263) + `.search-modal-results{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain}` (:296-302). The `min-height:0` defeats the flex-item min-content floor that breaks most modal scroll regions, and `overscroll-behavior:contain` stops scroll-chaining to the page behind — which matters *more* here than usual because there is no scroll lock (D-2), so this line is the only thing standing between the user and the page scrolling out from under the palette. Expert, and load-bearing. *Falsifier:* remove `min-height:0` and the region stops scrolling.

**S-3 · Asymmetric, token-native motion.** Enter `0.25s --ease-out-expo` from `scale(.96) translateY(-8px)`; leave `0.15s --ease-in` to a **shallower** `scale(.97) translateY(-4px)` (:359-396). Faster, shallower exit than entrance is the correct idiom, and the A.W3.d migration comment (:224, :363) is **truthful** — all three tokens resolve at the installed pin (`tokens/scheme-motion.css:216-219`, `theme/bridges.css:325-328`). No phantom tokens. *Falsifier:* `grep -- "--ease-out-expo:" node_modules/@mkbabb/glass-ui/dist/styles/` → present; the claim dies if any of the three were undefined.

**S-4 · Dismissal without a backdrop element.** `@click.self` on the overlay (:46) + `@click.stop` on the panel (:48). The sibling needed a whole extra `.paper-search-backdrop` div plus a duplicated four-clause `v-if` to achieve less (`PaperSearchDropdown.vue:64-69`). The modal's version is strictly smaller and strictly more correct. *Falsifier:* find a click path that dismisses when it should not.

**S-5 · `width: min(36rem, calc(100dvw - 2rem))`** (:253). `dvw`, not `vw` — so it does not overflow under a classic scrollbar — plus an explicit, honest 1 rem gutter per side. 36 rem is also a defensible measure for a single-line result label. *Falsifier:* show `vw` would be equivalent on the target matrix. (Note D-20 faults the *inconsistency* with the `vh` siblings, not this line, which is the one that is right.)

**S-6 · Top-anchored, not centred.** `align-items: flex-start` + `padding-top: min(12vh, 6rem)` (:244-246). A centred palette jumps vertically every time the result count changes; a top-anchored one grows downward from a fixed input. Correct, and the `min()` keeps it from stranding on short viewports. *Falsifier:* show centring would be stable under a changing result count.

**S-7 · A defensible `v-html`.** `highlightFuzzy` (`searchHelpers.ts:34-70`) escapes **every** byte it does not itself wrap — both the matched run (`escapeHtml(chars.slice(i,j).join(""))`, :61) and every unmatched char (:64) — so the only unescaped markup in the output is the `<mark>` the function authored. The `v-html` at :100 renders paper-derived TeX, the highest-risk string in the app, safely. Most fuzzy-highlight implementations escape the input once and then splice, which breaks on entity boundaries; this one does not. *Falsifier:* find an input producing unescaped `<`/`&` outside a `<mark>`.

**S-8 · Correct async sequencing.** `nextTick` before the autofocus (:22) and before the scroll query (:31), both inside watchers on reactive state that has not yet flushed to DOM. Two places, both right. *Falsifier:* remove either `nextTick` and the ref/query resolves against the pre-patch DOM.

---

## §9 · Tally

| | Count |
|---|---|
| **Defects (D-1 … D-24)** | **24** |
| — of which **BLOCKER** | **3** (D-1, D-2 LIVE; D-3 LATENT-behind-D-1) |
| — of which **MAJOR** | 9 (D-4…D-9 LIVE; D-18, D-19, D-20 LATENT) |
| — of which **MINOR** | 10 (D-10…D-15 LIVE; D-21…D-24 LATENT) |
| — of which **INFO** | 2 (D-16, D-17) |
| **Superlatives (S-1 … S-8)** | **8** |
| Marked **UNPROVEN-NEEDS-LIVE** (SS-13) | 1 (D-6 clause (b) — the scroll↔`mouseenter` feedback loop) |

**Repair-order constraint for the wave.** D-1's cure *activates* D-3, D-18, D-19, D-20 and D-21…D-24. They must land in the same wave, or restoring the stylesheet ships a WCAG regression the tree currently does not have. The cheapest cure for D-1, D-2, D-9 and most of the MAJOR block is the same single move: **retire the fork and adopt `@mkbabb/glass-ui/search` + `ModalOverlay`/`Dialog` at the installed 4.0.0 pin**, which is available today and does not wait on the tri-package deadlock.

served model id: `claude-opus-5[1m]`

# PaperView — Challenge C (CONSUMPTION axis)

**Target** `fourier-analysis/web/src/components/paper/PaperView.vue` (685 lines)
**Axis** how this component consumes value.js 0.13 · keyframes 4.3 · glass-ui ^4.0.0 · latex-paper 0.2.1 · the fourier API; props/emits contract quality; integration seams.
**Method** static + source-derived only. No browser tooling. Read whole: the target plus its full import closure —
`PaperSidebar.vue` (283) · `MobileFloatingToc.vue` (397) · `PaperArticleWindow.vue` (212) · `paperTree.ts` (21) · `useScrollNavigation.ts` (246) · `search/usePaperSearch.ts` (108) · `PaperSearch.vue` (397) · `search/PaperSearchInput.vue` (69) · `search/PaperSearchDropdown.vue` (70) · `search/PaperSearchModal.vue` (124) · `search/paperSearchIndex.ts` (401) · `search/searchHelpers.ts` (74) · `lib/paperContent.ts` (7) · `ui/tooltip/Tooltip.vue` — plus the producer trees they bind to (`node_modules/@mkbabb/{glass-ui,latex-paper,value.js}`), `vite.config.ts`, `src/style.css`, `package.json`, `package-lock.json`.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries a falsifier; the superlatives carry them too (L-18 runs both ways).

**Tally — 21 defects (2 BLOCKER · 7 MAJOR · 10 MINOR · 2 INFO) · 5 superlatives.**
BLOCKER `C-01`, `C-01b` · MAJOR `C-02`–`C-08` · MINOR `C-09`–`C-18` · INFO `C-19`, `C-20` · superlatives `S-1`–`S-5`.

---

## 0. Fold of the hitherto corpus

These are established; I do not re-derive them, and I cite where I extend or contradict.

| Corpus row | Status here |
|---|---|
| `formation/fourier/lane-frontend.md:152` — PaperView 685 lines, `/paper` shell | AGREE, line-exact against the live tree. |
| `lane-frontend.md:287` — `PaperView.vue:22 import { Button } from "@mkbabb/glass-ui/button"` | AGREE; I extend the enumeration to the **full 9-site glass-ui subpath surface** of this subtree (§C-13). |
| `lane-frontend.md:480,492` + `CENSUS-2026-08-03.md:109,184` — the atomic tri-package bump `glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0` | AGREE. **I add a fact the rows do not state**: the glass-ui@4.0.0 ↔ value.js@0.13.0 breach is *already live today*, not merely latent, and it is silent because glass-ui declares the peer `optional` (§C-03). |
| `CENSUS-2026-08-03.md:38` — value.js live import surface = 5 statements / 4 files, easing-only | AGREE and **narrow it**: **zero** of the 5 sites is reachable from PaperView. PaperView's value.js coupling is 100 % transitive (§C-04, §C-15). |
| `CENSUS-2026-08-03.md:174,187-188` — F.W2: `colors.ts` is a 117-line hand-rolled regex arm with no `oklch()` | AGREE, and **PaperView never touches `colors.ts`** — the F.W2 colour work does not reach this component. Its colour defect is a different one: 50 `color-mix(in srgb …)` against glass-ui's `in oklab` material standard (§C-08). |
| `intakes/lane-fourier-r3-r6.md` R6-5 / R5-7 — 3 native `li v-for` at PaperSidebar 65/87/105 | AGREE, line-exact. I extend the same blind-spot argument to the **teleport** boundary (§C-01): a registry keyed to DOM position also loses `PaperSearchModal`, which renders into `<body>`. |
| `intakes/lane-fourier-r3-r6.md` R3-7a — 35 Tooltip callsites / `ui/tooltip` thin-adapter disposition; PaperSidebar contributes 2 | AGREE, line-exact (`PaperSidebar.vue:70,88`). The adapter is sound; see superlative **S-4**. |
| `lane-frontend.md:70` — dead devDeps `class-variance-authority` / `clsx` / `tailwind-merge`, 0 import sites | AGREE. **I contradict the implied completeness**: `lucide-vue-next` is *also* a devDependency but has **6 runtime import sites in this subtree alone** — a different and worse class of the same declaration defect (§C-14). |
| `fourier-analysis/docs/audits/runs/2026-06-17-M-critique-audit/raw-findings.json:3685` — PaperSearch hand-rolls what `glass-ui/search` ships; live critique shows "a square, offset focus ring" on `.paper-search-input` | AGREE on the hand-roll. **I contradict the diagnosis**: that audit read the raw UA outline as "a missing conformant replacement". It is not. `.paper-search-input { outline: none }` **never applies at all** — the rule is orphaned (§C-01b). The screenshot is corroborating evidence for a defect that audit misfiled. |

---

## 1. What PaperView actually consumes

Measured, not estimated.

| Producer | Surface reached from PaperView | Sites |
|---|---|---|
| `@mkbabb/latex-paper@0.2.1` | `/vue`: `useKatex`, `PAPER_CONTEXT`, `PaperContext`, `flattenPaperSections`, `useClickDelegate`, `useSidebarFollow`, `useTreeIndex`, `useVirtualSectionWindow`, `PaperSection`, `PaperSectionBlocks`, `TreeNode`, `FlatPaperSection`; `/theme` (CSS side-effect); root: `PaperSectionData` et al.; `/vite` (build) | 6 files |
| `@mkbabb/glass-ui@4.0.0` | `/button` ×6, `/sidebar` ×2, `/collapsible` ×1, `/tooltip` ×1 (via local adapter); `/styles` globally via `style.css:3` | 9 JS + 1 CSS |
| `@mkbabb/value.js@0.13.0` | **ZERO direct symbols.** Transitive only, through glass-ui's `aurora.js` / `motion-curves.js` / `color-DweYl7pE.js`, and through `vendor-math` chunk welding (§C-15) | 0 |
| `@mkbabb/keyframes.js@4.3.0` | **ZERO.** All motion in this subtree is CSS `transition` + glass-ui `--ease-*` tokens + `requestAnimationFrame` | 0 |
| fourier API (31 FastAPI routes / 33 client operations in `lib/api.ts` + `lib/equation/api.ts`) | **ZERO.** No `apiFetch`, no store, no fetch | 0 |
| `lucide-vue-next@1.0.0` | `Undo2`, `ChevronUp/Down/Right`, `Search`, `X`, `Maximize2`, `Minimize2`, `ArrowRight` | 6 files |

**The R6-8 operation↔client leaf coupling for PaperView is the empty set.** That is *correct* — a static typeset-paper reader should not touch a CRUD surface — and it is the single cleanest boundary in the component. But it means the CONSUMPTION axis here is entirely a **design-system + build-graph + producer-typing** story, and on all three the component is worse than it looks.

---

## 2. Defects

### BLOCKER

---

#### C-01 · The mobile TOC subtree mounts on desktop, and its teleported search modal escapes the `lg:hidden` guard — two stacked modals in `<body>`

**Severity** BLOCKER
**Provenance** `PaperView.vue:145-147, 247-255, 318-330, 335-348, 361, 111` · `MobileFloatingToc.vue:6, 111` · `PaperSidebar.vue:51` · `PaperSearch.vue:35-37` · `PaperSearchModal.vue:39-44`

The chain, each link statically forced:

1. `PaperView.vue:361` — the mobile inline TOC nav carries Tailwind `lg:hidden`, i.e. `display: none` at ≥1024 px.
2. `PaperView.vue:248-257` — an `IntersectionObserver` observes exactly that element and writes `mobileTocVisible.value = entry.isIntersecting`.
3. A `display: none` element generates no box; per the Intersection Observer spec its initial (always-delivered) observation reports `isIntersecting: false`. ⇒ on **desktop**, `mobileTocVisible` latches to `false`.
4. `PaperView.vue:319-320` — `<MobileFloatingToc v-if="!mobileTocVisible" …>` ⇒ **MobileFloatingToc MOUNTS on desktop.** Its root `.floating-toc lg:hidden` hides it visually; it does not unmount it.
5. `MobileFloatingToc.vue:111` renders `<PaperSearch :search="search" variant="floating" />`; `PaperSearch.vue:35-37` unconditionally renders `<PaperSearchModal :search="search" />`; `PaperSearchModal.vue:39-44` is `<Teleport to="body"><Transition><div v-if="search.isExpanded.value" class="search-modal-overlay">`.
6. `PaperView.vue:111` mints **one** `usePaperSearch(...)` and fans the same state object into both `MobileFloatingToc` (`:search`, line 328) and `PaperSidebar` (`:search`, line 347). `PaperSidebar.vue:51` renders `<PaperSearch … variant="sidebar" />` — a **second** `PaperSearchModal`.

⇒ Both modals are `v-if`-gated on the *same* `search.isExpanded` ref and both teleport to `<body>` — **outside** the `lg:hidden` and `display:none` ancestors that were supposed to suppress the mobile arm. Pressing the expand control (`PaperSearchInput.vue:47-56`, reachable from the desktop sidebar) renders **two identical, stacked, full-viewport search modals**. `@click.self` on the overlay (`PaperSearchModal.vue:46`) dismisses via shared state, so both close together — but until then the user is looking at doubled markup, doubled `v-html` highlight work over up to 30 results, and doubled `document.querySelector(".search-modal-results")` in the selection-scroll watcher (`PaperSearchModal.vue:31`) which resolves to *whichever modal the document happens to yield first*, i.e. the invisible one is as likely to be scrolled as the visible one.

A second consequence on the same mount: `PaperSearchInput.vue:19-25` auto-focuses on `isOpen`. Two inputs now race in the same `nextTick` flush. Focus on a `display:none` element is a no-op, so the visible one wins **only** because `MobileFloatingToc` is declared at `PaperView.vue:319`, *before* `PaperSidebar` at `:335`, making the sidebar's watcher fire last. Reorder those two template blocks and ⌘K silently stops focusing the search box.

**Falsifier** Any of: (a) `IntersectionObserver` reporting `isIntersecting: true` for a `display:none` target — contradicted by CSS Display §1 (no box) + IO §3.2 (empty intersection rect); (b) `MobileFloatingToc` gated on a viewport query rather than intersection — it is not, `PaperView.vue:320`; (c) `PaperSearchModal` rendered once at the `PaperView` level rather than per-`PaperSearch` — it is not, `PaperSearch.vue:35`; (d) `<Teleport>` honouring an ancestor's `display:none` — it does not, teleport reparents into `<body>`.
**Live consequence** UNPROVEN-NEEDS-LIVE for SS-13: the exact visual stacking (two overlays, second scrim doubling the dim). The mount and the double render are static facts.
**Corpus tie** This is the teleport analogue of R5-7/R6-5: evidence keyed to structural position loses subtrees that relocate. A per-component D/L/C audit that walks the template tree will count `PaperSearchModal` **once** and miss that it instantiates twice and lands somewhere else entirely.

---

#### C-01b · 26 of 41 scoped selector groups in `PaperSearch.vue` are orphaned — the search chrome and the entire expanded modal render with zero authored styling

**Severity** BLOCKER
**Provenance** `PaperSearch.vue:41-240+` (`<style scoped>`) · `PaperSearchInput.vue:34-68` · `PaperSearchDropdown.vue:34-73` · `PaperSearchModal.vue:39-124` · git `ffba307` (2026-05-26)

`PaperSearch.vue`'s own template (`:22-39`) renders exactly three elements: `.paper-search` and its `--sidebar` / `--floating` modifier, plus three child components. Its `<style scoped>` declares **41 selector groups**, of which only **`.paper-search`, `.paper-search--sidebar`, `.paper-search--floating`, `.paper-search-input-wrap`** (a child *root*) and the four `search-dropdown-*` transition classes can match.

Vue's scoped-CSS mechanic (`runtime-core` `setScopeId`): the `data-v-<hash>` attribute is stamped on every element rendered by *that* component's template, plus a child component's **root** element only. Anything deeper needs `:deep()`. Neither `PaperSearchInput.vue`, `PaperSearchDropdown.vue` nor `PaperSearchModal.vue` carries a `<style>` block, so their inner elements carry **no** `data-v-*` attribute at all.

Certainly dead (non-root descendants of `PaperSearchInput`, root = `.paper-search-input-wrap`):
`:62 .paper-search-icon` · `:69 .paper-search-input` · `:80 .paper-search-input::placeholder` · `:84 .paper-search-action-btn` · `:97 .paper-search-action-btn:hover` · `:211 .paper-search--floating .paper-search-input` — **6**.

Certainly dead (non-root descendants of `PaperSearchDropdown`):
`:118 .paper-search-result` · `:132/133 :hover/.is-selected` · `:137 .paper-search-badge` · `:150-153` · `:158` · `:163 .paper-search-badge[data-type=…]` ×3 · `:168 .paper-search-number` · `:174 .paper-search-label` · `:185 .paper-search-label :deep(mark)` — **9**.

Certainly dead (teleported out of the component subtree — the `<Teleport>` is `PaperSearchModal`'s root vnode, so `vnode === subTree` fails and the parent scope id is never propagated):
`:239 .search-modal-overlay` · `:252 .search-modal` · `:266 .search-modal-header` · `:274 .search-modal-icon` · `:281 .search-modal-input` · `:292 ::placeholder` · `:296 .search-modal-results` · `:304 .search-modal-result` · `:308/:313/:317 .search-modal-result .paper-search-*` — **11**.

**Total 26 / 41.** Nothing in the repo re-declares them: `grep -rn "search-modal-overlay|paper-search-icon|paper-search-result" --exclude-dir=node_modules` outside `PaperSearch.vue` returns only the *class attributes* in the three children. `style.css` has zero `paper-search` / `search-modal` hits.

⇒ The expanded search modal renders as an **unpositioned, unscrimmed, unbounded block in normal `<body>` flow**: no `position: fixed`, no backdrop, no panel border/background, no `max-height`, no result-row padding or badge colours. The inline dropdown loses every result-row style. The search input loses `outline: none`, its font size, its placeholder colour, and both action buttons lose their sizing.

**Origin, from git.** The `search/` children were extracted at `ffba307` (2026-05-26, "A.W1.a.1 — land web migration cohort"). At `ffba307^`, `PaperSearch.vue` contained `search-modal-overlay` **twice** — once as a `class=` in its own template, once in its scoped style. The extraction moved the markup out and left the stylesheet behind. This is a mechanical refactor residue, not a design choice.

**Falsifier** Any of: (a) a `<style>` block in one of the three children — `grep -c "<style" search/PaperSearch{Input,Dropdown,Modal}.vue` → 0, 0, 0; (b) a global declaration of these classes — none in `style.css`, `glass-ui/dist/styles/**`, or `latex-paper/src/vue/theme.css`; (c) Vue propagating the parent scope id past the child root — contradicted by `setScopeId`'s `vnode === parentComponent.subTree` guard; (d) `:deep()` wrapping — used exactly once in the file, at `:185`, and on a selector that is *itself* already dead.
**Corroboration** `docs/audits/runs/2026-06-17-M-critique-audit/raw-findings.json:3685` reports the live critique showing "the search field with a square, offset focus ring". That is the UA default `outline: auto` — precisely what paints when `.paper-search-input { outline: none }` (`PaperSearch.vue:73`) does not apply. That audit filed it as a missing conformant focus ring; the tree says the rule is orphaned. **I contradict that diagnosis explicitly.**
**Note** The line numbers quoted by the 2026-06-17 audit (`239-264`, `252-264`, `47-56`) match the live tree exactly ⇒ the file is unchanged since. The defect has been shipping for ~2.5 months.

---

### MAJOR

---

#### C-02 · Desktop scroll landings are mis-offset by 8 px because `.floating-toc-bar` exists-but-is-hidden

**Severity** MAJOR
**Provenance** `useScrollNavigation.ts:23-26` · `MobileFloatingToc.vue:110, 117` · `PaperView.vue:99-106, 319-320`

```ts
function getScrollOffset(): number {
    const bar = document.querySelector(".floating-toc-bar") as HTMLElement | null;
    return bar ? bar.offsetHeight + 8 : 16;
}
```

The `: 16` arm is plainly the intended desktop path — there is no floating bar on desktop. But by C-01 the bar **is** in the DOM on desktop, inside a `display: none` ancestor. `offsetHeight` of a non-rendered element is `0` per CSSOM-View. ⇒ `getScrollOffset()` returns **8**, never 16, on every desktop viewport.

That 8 px propagates into `computeAbsoluteTop` (`:46`), `estimateAbsoluteTop` (`:59`), every `navigateTo` landing, the teleport correction loop's target (`:135`), and the session-restore `performScroll` at `PaperView.vue:268`. It is also *silent*: `STABILITY_PX = 6` (`:18`) means the correction loop converges happily on the wrong number.

**Falsifier** `offsetHeight` returning non-zero for a `display:none` element (contradicted by CSSOM-View §"offsetHeight ... if the element does not have an associated CSS layout box, return zero"), or `MobileFloatingToc` not mounting on desktop (refuted in C-01).
**Why it is a consumption defect** `useScrollNavigation` is the adapter PaperView wires between latex-paper's `useVirtualSectionWindow` offsets (`PaperView.vue:99-106`) and the DOM. A `document.querySelector` reaching *outside* that adapter's ownership for a sibling component's chrome is the seam failure; the 8 px is the symptom.

---

#### C-03 · glass-ui@4.0.0's declared `value.js` peer range excludes the installed 0.13.0 — and the breach is silent because the peer is `optional`

**Severity** MAJOR
**Provenance** `node_modules/@mkbabb/glass-ui/package.json` peerDependencies + `peerDependenciesMeta` · `package-lock.json:334-372` · `web/package.json:18` · glass-ui `dist/{aurora,motion-curves,color-DweYl7pE}.js`

glass-ui@4.0.0 peers `"@mkbabb/value.js": "^0.10.0 || ^0.11.0"`. Installed: **0.13.0**. Under pre-1.0 semver, `0.11 → 0.13` is two breaking steps. The install nevertheless succeeds with no ERESOLVE and no warning because glass-ui's own `peerDependenciesMeta` marks `@mkbabb/value.js` `optional: true` (`package-lock.json:357-359`).

Three glass-ui runtime modules import value.js (`aurora.js`, `motion-curves.js`, `color-DweYl7pE.js`), so this is not a phantom peer — it is a live, unversioned binding that npm has been instructed not to police.

**Reachability from PaperView**: PaperView loads `@mkbabb/glass-ui/button` (`:22`) and, through `style.css:3`, glass-ui's whole `@layer components` stylesheet. It does not itself pull `aurora`/`motion-curves`, so the *runtime* breach is one hop away — but the **declaration** breach is on the path PaperView installs.

**Falsifier** glass-ui@4.0.0 declaring `^0.13.0`, or shipping no runtime import of value.js. Both refuted above by direct file read.
**Corpus** Extends `lane-frontend.md:480,492` and `CENSUS-2026-08-03.md:109,184` (the atomic tri-package bump). Those rows read the mismatch as *latent, pending the 4→7 uplift*. It is not latent: it is live at 4.0.0, today, and the `optional` flag is why nobody's install ever complained. That fact belongs in F.W1's risk statement.
**Sibling breach, same class** `@mkbabb/latex-paper@0.2.1` peers `"katex": "^0.16"`; installed katex is **0.17.0** (`node_modules/katex/package.json`). PaperView reaches this one directly — `useKatex(macros)` at `:38` is latex-paper calling katex. Filed as C-19 (INFO) for severity but it is the same failure mode.

---

#### C-04 · `variant="glass"` is requested and then painted over — the scoped `.overlay-btn` rule overrides all four of `.glass-wash`'s declarations, and wins unconditionally on cascade layers

**Severity** MAJOR
**Provenance** `PaperView.vue:398-405` (`<Button variant="glass" size="icon" class="overlay-btn overlay-back">`) · `PaperView.vue:582-605` (scoped `.overlay-btn`) · glass-ui `dist/styles/glass/ladder.css:6, 36-42` · `dist/styles/glass/surfaces.css:182-184` · `dist/button-BNDWhAZb.js` (`glass: "glass-wash btn-glass text-foreground …"`)

glass-ui's `glass` button variant resolves to `glass-wash btn-glass …`, and:

```css
/* glass/ladder.css — inside @layer components */
.glass-wash {
  position: relative;
  background: color-mix(in oklab, var(--glass-bg-wash), var(--glass-tint-source) var(--glass-tint-strength));
  backdrop-filter: var(--glass-blur-wash);
  border: 1px solid var(--glass-border-wash);
  box-shadow: var(--glass-material-rim), var(--glass-shadow-wash);
}
/* glass/surfaces.css */
.btn-glass { backdrop-filter: var(--glass-blur-btn); }
```

PaperView's scoped rule re-declares **every one of them** with hand-rolled literals:

```css
.overlay-btn {
  position: relative;                                            /* dup */
  border: 1.5px solid var(--border);                             /* overrides --glass-border-wash */
  background: color-mix(in srgb, var(--background) 92%, transparent);  /* overrides the oklab tint */
  backdrop-filter: blur(8px);                                    /* overrides --glass-blur-btn */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);                     /* overrides rim + --glass-shadow-wash */
}
```

`ladder.css` opens `@layer components` (`:6`). Vue scoped styles are **unlayered**. In the CSS cascade, unlayered author styles beat *every* layer regardless of specificity — so this is not a close call: the variant's material is fully neutralised. What survives is only the `::before` specular pseudo (`glass/material.css:66-80`) and the hover/active token bindings, now compositing over a foreign background. The consumer asked the design system for glass, then repainted it in sRGB with a raw `rgba()` shadow.

Same pattern, same file, adjacent: `.overlay-page` (`:636`) correctly *uses* `glass-wash` as a bare utility (`:393`) with no override — proving the author knows the recipe works. The two sit 200 lines apart in one stylesheet with opposite postures.

**Falsifier** `.glass-wash` declared unlayered or `!important` — refuted (`ladder.css:6` `@layer components`, no `!important`); or `.overlay-btn` never applied to a `variant="glass"` Button — refuted (`PaperView.vue:399, 402`).
**Corpus** Independently identified by `docs/audits/runs/2026-06-17-M-critique-audit/findings-index.txt:385` ("hand-rolled glass CSS cluster … `PaperView.vue` `.overlay-btn`"). I add the *mechanism* (cascade layers, not specificity) and the exact four-declaration overlap, which that audit did not establish.

---

#### C-05 · glass-ui `Button`'s layout contract is overridden at 6 class sites across the subtree

**Severity** MAJOR
**Provenance** `PaperSidebar.vue:216-233` (`.sidebar-link`) · `MobileFloatingToc.vue:205-221` (`.floating-toc-bar`), `:336-349` (`.floating-toc-item`) · `PaperSearch.vue:118-130` (`.paper-search-result`), `:84-95` (`.paper-search-action-btn`) · `PaperView.vue:582-605` (`.overlay-btn`)

glass-ui's `Button` cva base is an `inline-flex items-center justify-center` control with its own background, border and text-colour tokens. Every one of the six classes above is applied to a `<Button>` and then re-specifies that contract by hand:

- `.sidebar-link` → `display: block; width: 100%; text-align: left; background: none; border: none; cursor: pointer` — turns the flex control into a block, then re-adds `cursor: pointer` that `Button` already carries.
- `.floating-toc-item` → `display: block; border: none; background: none; text-align: left`.
- `.floating-toc-bar` → `display: flex; justify-content: space-between; border: none; border-bottom: 1px solid …`.
- `.paper-search-result` → `display: flex; align-items: baseline; border: none; background: none; text-align: left` (and is itself dead per C-01b — the override is *aspirational*).
- `.overlay-btn` → per C-04.

This is the `feedback_glass_ui_first_class` inversion: the design system supplies the primitive, the consumer strips it back to a bare `<button>` and re-authors it. The migration at `6b7a12c` ("A.W3.a: migrate native `<button>` to `<Button>` across equation/morph/paper/layout") swapped the *tag* and kept the *stylesheet*, which is the worst of both — the component's payload ships and its behaviour is discarded.

**Falsifier** Show that `Button`'s base classes are not overridden — refuted by cascade-layer precedence (glass-ui utilities are layered; scoped styles are not) at every one of the six sites; or show that the overrides are additive rather than contradictory — `display: block` against `inline-flex` and `background: none` against the variant background are direct contradictions.
**Not a defect** The variant/size *vocabulary* is correct and shipped — see superlative **S-3**.

---

#### C-06 · latex-paper 0.2.1 types `activeId` / `activeRootId` as `ComputedRef<any>`; PaperView threads them into six downstream contracts, all of which are consequently vacuous

**Severity** MAJOR
**Provenance** `node_modules/@mkbabb/latex-paper/dist/vue/composables/useVirtualSectionWindow.d.ts` (`activeId: ComputedRef<any>; activeRootId: ComputedRef<any>`) · `PaperView.vue:74-75, 102, 129, 235-236, 321-322, 338-339` · `useScrollNavigation.ts:7` · `PaperSidebar.vue:15-16` · `MobileFloatingToc.vue:12-13`

The producer's public `.d.ts` widens both tracking outputs to `any`. PaperView destructures them (`:74-75`) and then feeds them into six typed contracts, every one of which silently accepts `any`:

| Consumer | Declared type | Actual |
|---|---|---|
| `useScrollNavigation.ts:7` | `activeId: Ref<string \| null>` | `any` |
| `useSidebarFollow` (`.d.ts`) | `activeId: Ref<string\|null>`, `activeRootId?: Ref<string\|null>` | `any` |
| `PaperSidebar` props `:15-16` | `activeRootId: string \| null; activeId: string \| null` | `any` |
| `MobileFloatingToc` props `:11-12` | `activeRootId: string \| null` | `any` |
| `PaperView.vue:129` watcher | `(id) => …` inferred | `any` |
| `PaperView.vue:241-244` `currentSection` | `treeIndex.get(activeRootId.value)` | `any` key into `Map<string, TreeIndexEntry<T>>` |

`vue-tsc -b` (`package.json:8`) therefore proves **nothing** about the paper's active-section plumbing. The `pageMap[id]` lookup at `:132`, the `sessionStorage.setItem(SCROLL_POS_KEY, id)` at `:138`, and the `--section-color-${si}` interpolations all sit downstream of an unchecked `any`.

**Falsifier** The producer declaring `ComputedRef<string | null>` — it does not; direct read of `dist/vue/composables/useVirtualSectionWindow.d.ts`. Or the consumer annotating at the boundary — it does not; `PaperView.vue:67-85` destructures bare.
**The fix is a producer ask, not a consumer patch** — which is exactly why it belongs on the CONSUMPTION axis: PaperView is the largest consumer of a producer type surface that does not type.

---

#### C-07 · `MobileFloatingToc` mutates the parent-owned scroller's inline `style.overflow` through a prop

**Severity** MAJOR
**Provenance** `PaperView.vue:327` (`:scroll-container="scrollContainer"`) · `MobileFloatingToc.vue:17, 45-52, 55-59`

```ts
watch(floatingTocOpen, (open) => {
    if (props.scrollContainer) props.scrollContainer.style.overflow = open ? 'hidden' : '';
});
```

The prop is typed `scrollContainer: HTMLElement | null` — a raw DOM handle, passed **down** as a prop and **written** by the child. That element is PaperView's `.paper-scroll` (`:302`), and it is simultaneously:
- the `scrollContainer` of latex-paper's `useVirtualSectionWindow` (`PaperView.vue:79`) which reads `scrollTop`/`clientHeight` for its spacer math;
- the target of a `ResizeObserver` PaperView owns (`:220-230`) whose callback runs `recalculate()`;
- the scroll source for `useSidebarFollow` (`:237`);
- the element `writeProgress()` measures (`:165-166`) as `scrollHeight - clientHeight`;
- the element `useScrollNavigation` calls `scrollTo` on (`:122, 143, 191`).

Five owners, one of which is a child mutating via prop. While `overflow: hidden` is set, `scrollHeight - clientHeight` collapses ⇒ `writeProgress()`'s `max` can reach 0 ⇒ `p = 0` ⇒ the reading-progress bar snaps to `scaleX(0)` and stays there until the dropdown closes (JS-floor path only). The `ResizeObserver` also fires on the clientHeight change and re-runs `recalculate()` under a state the window's math does not model.

The cleanup is *almost* right — `onUnmounted` restores `''` (`:55-59`) — but restoration to `''` reverts to the *stylesheet* value, which means the child is also silently asserting that `.paper-scroll`'s stylesheet overflow is the correct resting state. It is (`PaperView.vue:461-462`), by coincidence of the two files agreeing.

**Falsifier** A `scroll-lock` prop/emit contract, an emitted event, or a shared composable owning the lock — none exists; `grep -n "emit" MobileFloatingToc.vue` → 0 hits. Or PaperView never re-reading the scroller while locked — refuted by the five owners above.
**Live consequence** UNPROVEN-NEEDS-LIVE for SS-13: whether the progress bar visibly resets during a mobile TOC open. The ownership violation and the `max → 0` arithmetic are static.

---

#### C-08 · 50 `color-mix(in srgb …)` and zero `in oklab` across the subtree, against glass-ui 4.0.0's oklab material standard

**Severity** MAJOR
**Provenance** `PaperView.vue` ×10 · `PaperSidebar.vue` ×9 · `MobileFloatingToc.vue` ×8 · `PaperArticleWindow.vue` ×3 · `PaperSearch.vue` ×19 = **50**; `in oklab` = **0** · glass-ui `dist/styles/glass/ladder.css:34-42` (`color-mix(in oklab, …)`, with the comment "oklab is the mwg-preferred tint space")

Every tint, scrim, edge-fade and hover wash in this subtree interpolates in **sRGB**. glass-ui 4.0.0 standardised its own material on **oklab** and says so in-source. sRGB mixing of a token pair that differ in lightness darkens through the middle (the classic grey-out); the design system moved off it deliberately, and this subtree — which is the app's largest single reading surface — did not follow.

Concrete pairs where the two spaces disagree visibly: `PaperView.vue:440` and `:452` (the top/bottom edge fades, `--background` → transparent), `:507` (the teleport overlay's two-stop radial), `:523` (`--foreground` 15 % as a border), `:595` (`--foreground` 70 % as icon colour).

Additionally, three hard-coded `hsl()` literals bypass tokens entirely: `PaperSearch.vue:159-160` (`hsl(210 80% 55% / .12)`, `hsl(210 80% 45%)`), `:164-165` (`hsl(280 …)`), `:186` (`hsl(50 100% 60% / .35)` for the search `<mark>`). Those are dark-mode-blind — no `.dark` arm exists for any of them — and they are *also* dead per C-01b, so they are simultaneously wrong and unreachable.

**Falsifier** glass-ui 4.0.0 mixing in sRGB — refuted, `ladder.css:38` is `in oklab`; or the 50 sites all being cases where the two spaces coincide — refuted, several mix across a lightness gap.
**Corpus tie** This is the *actual* colour-consumption defect for PaperView. `CENSUS-2026-08-03.md:174,187-188` books F.W2's colour work as "delete the `colors.ts` hand-rolled arms" — but `colors.ts` is **not reachable from PaperView** (`grep -rn "colors" components/paper/` → 0). F.W2's colour scope, as written, does not touch this component at all. Flagged as a scope gap.

---

### MINOR

---

#### C-09 · `.mobile-toc-link` is applied but defined nowhere in the repository

**Severity** MINOR
**Provenance** `PaperView.vue:367`

```html
<Button variant="link" size="sm" class="mobile-toc-link" @click="navigateTo(section.id)">
```

`grep -rn "mobile-toc-link" .` across the entire fourier-analysis repo (excluding `.git`) returns **exactly one hit: the class attribute itself.** Not in PaperView's own `<style scoped>`, not in `style.css`, not in glass-ui's `dist/styles/**`, not in `latex-paper/src/vue/theme.css`.

The mobile inline TOC (`:361-377`, the `lg:hidden` `<nav>` that also drives C-01's observer) therefore renders 11 chapter links as bare glass-ui `variant="link"` buttons — `text-primary underline-offset-4 hover:underline` — inside an `<ol class="list-none space-y-1.5 pl-0">` with no per-item layout, no left alignment, and no width. Given `Button`'s `inline-flex justify-center` base, they centre.

**Falsifier** Produce any CSS rule matching `.mobile-toc-link`. The repo-wide grep is the falsifier and it comes back empty.

---

#### C-10 · `resolveFigure()` is invoked 7× per figure per render

**Severity** MINOR
**Provenance** `PaperArticleWindow.vue:44-59, 87, 88, 92, 93, 97, 99, 100`

```html
<source v-if="resolveFigure(figure.filename).avif" :srcset="resolveFigure(figure.filename).avif!" …/>
<source v-if="resolveFigure(figure.filename).webp" :srcset="resolveFigure(figure.filename).webp!" …/>
<img :src="resolveFigure(figure.filename).png" … :width="resolveFigure(figure.filename).width" :height="resolveFigure(figure.filename).height" …/>
```

Seven calls, each running two `String.replace` with regexes, a `FIGURE_DIMENSIONS` lookup and a `hasModernVariants` test, and each allocating a fresh object — inside a `v-for` over `visibleItems` that re-renders on every window recalculation (which `useScrollNavigation`'s teleport correction loop fires up to 10× per navigation, `useScrollNavigation.ts:16, 134`). One `computed`/`v-memo`, or hoisting into the `v-for` binding, collapses it to one.

**Falsifier** Vue caching identical function calls within a render — it does not; template expressions are re-evaluated per interpolation.

---

#### C-11 · `treeIndex` is passed to `PaperSidebar`, typed `Map<string, any>`, and never read

**Severity** MINOR
**Provenance** `PaperView.vue:48, 343` · `PaperSidebar.vue:20`

`useTreeIndex` returns `Map<string, TreeIndexEntry<T>>` (`latex-paper/dist/vue/tracking/useTreeIndex.d.ts`) — a precisely-typed producer value. `PaperView.vue:343` passes it down; `PaperSidebar.vue:20` declares `treeIndex: Map<string, any>`, **widening a good type to `any` at the boundary**, and then never uses it: `grep -n "treeIndex" PaperSidebar.vue` → line 20 only. A dead prop that also launders a type.

**Falsifier** A `treeIndex` reference in `PaperSidebar`'s template or script — the grep returns the declaration alone.

---

#### C-12 · `PaperSectionData` imported and unused in the target

**Severity** MINOR
**Provenance** `PaperView.vue:20`

`import type { PaperSectionData } from "@/lib/paperContent";` — the identifier appears nowhere else in the file. `tsconfig.json` sets neither `noUnusedLocals` nor `noUnusedParameters`, so `vue-tsc -b` does not catch it. Erased at build under `verbatimModuleSyntax`, so no runtime cost — but it is the only import in the file that does nothing, in a component whose import block is otherwise the densest part of its consumption story.

**Falsifier** Any use of `PaperSectionData` in `PaperView.vue` — there is none.

---

#### C-13 · One type, three specifier conventions across the subtree

**Severity** MINOR
**Provenance** `PaperView.vue:20` · `paperTree.ts:2` · `PaperSidebar.vue:4` · `MobileFloatingToc.vue:7` — all `@/lib/paperContent`; versus `search/usePaperSearch.ts:6` · `search/paperSearchIndex.ts:12` — both `@mkbabb/latex-paper` directly. `lib/paperContent.ts:6` is a pure re-export of the same symbols.

Six files, one type, two paths, with a 7-line re-export module in between whose only job is to unify them and which half the subtree bypasses. This is the F.W2 "bare specifiers" surface in miniature: when the producer's export map moves (glass 4→7 / value 0.13→4.0 will move `latex-paper` too), the migration has to find both spellings.

**Falsifier** A lint rule or `paths` mapping enforcing one form — `tsconfig.json:14-16` maps only `@/*`; no `no-restricted-imports` config exists (`grep -rn "no-restricted-imports" web/` → 0).

---

#### C-14 · `lucide-vue-next` is a devDependency with 6 runtime import sites here; `@lucide/vue` — glass-ui's declared non-optional peer — is undeclared but installed

**Severity** MINOR
**Provenance** `web/package.json:32` (`devDependencies.lucide-vue-next: ^1.0.0`) · `PaperView.vue:23` · `PaperSidebar.vue:9` · `MobileFloatingToc.vue:5` · `PaperArticleWindow.vue:8` · `search/PaperSearchInput.vue:4` · `search/PaperSearchModal.vue:4` · glass-ui@4.0.0 peerDependencies (`"@lucide/vue": "^1.16.0"`, **not** in `peerDependenciesMeta` ⇒ required) · `node_modules/@lucide/vue@1.20.0`, `node_modules/lucide-vue-next@1.0.0` both present

Two icon libraries are installed. The app imports from `lucide-vue-next`; glass-ui imports from `@lucide/vue` (`dist/createLucideIcon-DydS2qgk.js`). `@lucide/vue` appears in **no** fourier manifest — it exists only because npm auto-installs required peers. Meanwhile the package the app actually imports at runtime is declared as a *dev* dependency.

For a `private: true` Vite app this builds. It still means: (a) two `createLucideIcon` runtimes and two icon module graphs in the bundle; (b) a required peer that no manifest records, so `npm prune`/lockfile regeneration can move it without review; (c) the 35-site `lucide-vue-next → @lucide/vue` migration booked at `lane-frontend.md:636` is understated for this subtree — 6 of those 35 sites are here.

**Falsifier** `grep -rn "lucide-vue-next" web/src | wc -l` returning 0 (it returns 6 in `components/paper/` alone), or `@lucide/vue` appearing in `web/package.json` (it does not).
**Contradicts** `lane-frontend.md:70`'s dead-devDeps row, which correctly names `cva`/`clsx`/`tailwind-merge` at 0 sites but does not flag the inverse case sitting in the same block.

---

#### C-15 · `vendor-math` welds value.js to katex — the /paper route pays 146 KB of a library it never calls

**Severity** MINOR
**Provenance** `vite.config.ts:57` (`"vendor-math": ["@mkbabb/value.js", "katex"]`) · `PaperView.vue:38` (`useKatex(macros)`) · `node_modules/@mkbabb/value.js/dist/value.js` = 145 809 bytes raw

PaperView's only member of `vendor-math` is katex — reached transitively through `useKatex`. value.js is in the same chunk and is **not consumed anywhere in this subtree** (§1). Loading `/paper` therefore downloads and parses the value.js entry graph for nothing.

Same shape, adjacent line: `"vendor-paper": ["@mkbabb/latex-paper", "@mkbabb/pencil-boil"]` (`vite.config.ts:59`). `pencil-boil`'s three consumers are `morph/FourierShapeExtractor.vue:144`, `decorative/SvgFilters.vue:3`, `lib/svg-fourier.ts:11` — none reachable from `/paper`. The chunk comment claims the split is "by load-cadence"; the two chunks the paper route needs each carry a package the paper route does not.

**Falsifier** value.js or pencil-boil appearing in PaperView's import closure — enumerated in §1 and they do not; or Rollup tree-shaking a package out of a chunk it was explicitly assigned to — object-form `manualChunks` assigns the module graph, it does not prune it.
**Note** `web/dist/` is a stale 2026-06-12 build (pre-dating the current source by ~2 months) and is not authoritative for measurement. Byte-exact chunk figures: UNPROVEN-NEEDS-LIVE (requires a fresh `npm run build`).

---

#### C-16 · `vendor-ui` names the glass-ui **barrel** while every consumption site uses subpaths, and omits the icon package glass-ui actually imports

**Severity** MINOR
**Provenance** `vite.config.ts:50-54` · glass-ui `package.json` `exports["."] → ./dist/glass-ui.js` · the 9 subpath import sites enumerated in §1

`manualChunks.vendor-ui = ["@mkbabb/glass-ui", "reka-ui", "lucide-vue-next"]`. `@mkbabb/glass-ui` resolves to `dist/glass-ui.js` — the barrel — which **no file in this repo imports**; all 9 sites in this subtree (and per `lane-frontend.md:282-287`, the wider app) use `@mkbabb/glass-ui/button`, `/sidebar`, `/collapsible`, `/tooltip`. Either the entry is a no-op (and the stated cache-split intent for glass-ui is unrealised, the subpath modules landing wherever Rollup puts them) or Rollup's object-form `manualChunks` force-includes the barrel's graph (and the subpath tree-shaking win is discarded). Both are defects; the disjunction is the honest claim.

Independently: the list names `lucide-vue-next` but not `@lucide/vue`, which is the icon package glass-ui's own components import (C-14). Whichever branch of the disjunction holds, glass-ui's icons are not being split with glass-ui.

**Falsifier** Build and inspect: if `vendor-ui` contains modules for components the app never imports (`DataTable`, `Toaster`, `InstrumentChassis`, …) the force-include branch holds; if `vendor-ui` is small and the glass-ui subpaths appear in route chunks, the no-op branch holds. UNPROVEN-NEEDS-LIVE for *which* branch; that one of them holds is static.

---

#### C-17 · Reduced-motion is sampled once at mount and never re-armed; under PRM the progress bar is permanently dead chrome

**Severity** MINOR
**Provenance** `PaperView.vue:157-158, 173-182, 262` · glass-ui `dist/styles/scroll-driven.css:36-48`

```ts
function armProgressFallback() {
    const prm = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (NATIVE_SCROLL_TIMELINE || prm) return;
    …
}
```

Called exactly once, from the `onMounted` `nextTick` (`:262`). No `matchMedia(...).addEventListener("change", …)`. Two consequences:

1. A user who toggles OS reduced-motion mid-session on a `scroll()`-timeline-less engine never gets the bar (or never loses it) until reload.
2. **Under PRM the bar is dead on every engine.** glass-ui's native recipe sits under `@media (prefers-reduced-motion: no-preference)` (`scroll-driven.css:36`) so it never binds; and the JS floor refuses to arm under PRM by design (`:177`, with the reasoning at `:150-155`: "a JS bar would defeat PRM"). The element still renders — `.paper-progress-track` is a 2 px sticky bar (`:474-483`) with `.paper-progress-bar { transform: scaleX(0) }` (`:493`) — so PRM users get a permanently empty 2 px strip and **lose the reading-progress affordance entirely** on a 51-section, 11-chapter document.

That reasoning is defensible for *animation*; a progress indicator is a state readout, not motion. The correct PRM arm is a discrete, non-animated `scaleX` write — which is exactly what `writeProgress()` already does (a single style write per rAF, no transition on the property).

**Falsifier** A `change` listener on the PRM query, or a PRM arm in glass-ui's recipe — `grep -n "addEventListener" PaperView.vue` returns only `resize`, `keydown`, and the progress `scroll`; `scroll-driven.css:36` is the outer `no-preference` gate.
**Not a defect** The dual-path single-writer discipline itself is correct — see superlative **S-1**. This is a gap *inside* an otherwise excellent mechanism.

---

#### C-18 · `usePaperSearch`'s debounce timer is never cleared on unmount

**Severity** MINOR
**Provenance** `search/usePaperSearch.ts:27-33` · `PaperView.vue:111` · `PaperView.vue:291-297`

```ts
let debounceTimer: ReturnType<typeof setTimeout> | undefined;
watch(query, (val) => { clearTimeout(debounceTimer); debounceTimer = setTimeout(() => { debouncedQuery.value = val; }, 120); });
```

No `onScopeDispose` / `onUnmounted`. `usePaperSearch` is instantiated in `PaperView`'s setup (`:111`); `/paper` is a lazily-imported route (`router/index.ts`), so navigating away within 120 ms of a keystroke leaves a pending timer that writes to a ref belonging to a torn-down scope. Harmless in effect (the ref is garbage after), but it is the one composable in the closure that does not clean up — contrast `PaperView.vue:291-297`, which disconnects two observers, disarms the scroll listener and removes two window listeners.

**Falsifier** An `onScopeDispose`/`onUnmounted` in `usePaperSearch.ts` — the file is 108 lines and contains neither.

---

### INFO

---

#### C-19 · latex-paper 0.2.1 peers `katex: ^0.16`; installed 0.17.0

**Severity** INFO
**Provenance** `node_modules/@mkbabb/latex-paper/package.json` peerDependencies · `node_modules/katex/package.json` (0.17.0) · `web/package.json:21` (`"katex": "^0.17.0"`)

Reached directly by PaperView: `useKatex(macros)` at `:38` is latex-paper driving katex. Same failure mode as C-03, one major out of range, no install-time complaint. Booked INFO rather than MAJOR because katex 0.16→0.17 has no known break on the `renderToString` surface latex-paper uses — but the *declaration* is out of contract and the tri-package uplift (F.W1) will have to move it.

**Falsifier** latex-paper declaring `^0.16 || ^0.17`. It declares `"katex": "^0.16"`.

---

#### C-20 · `hsl(var(--section-heading))` in the theme PaperView imports is invalid against glass-ui 4.0.0's oklch token — the section-colour fallback can never paint

**Severity** INFO (latent — the fallback is currently shadowed)
**Provenance** `PaperView.vue:12` (`import "@mkbabb/latex-paper/theme"`) · `latex-paper/src/vue/theme.css:476, 481, 493, 498, 511-512` · glass-ui `dist/styles/tokens/color-radius.css:257` (`--section-heading: oklch(0.545 0.189 352.8)`), `dark-arm.css:110`, `light-dark.css:141`

latex-paper writes `var(--_section-color, hsl(var(--section-heading)))` at six sites. glass-ui 4.0.0 defines `--section-heading` as a **complete colour function**, not a bare `H S% L%` triple ⇒ the fallback substitutes to `hsl(oklch(0.545 0.189 352.8))` ⇒ invalid at computed-value time ⇒ the declaration is dropped and `color` falls back to `inherit`. This is exactly the double-wrap trap glass-ui documents in its own source (`tokens/scale-paper.css:338-343`: "`hsl(var(--background) / α)` double-wraps to `hsl(hsl(…) / α)` — invalid, never paints (the modal dim was silently dead)").

Currently shadowed because `PaperArticleWindow.vue:81` always passes `:section-index="item.rootIndex"`, so latex-paper's `PaperSection` always sets `--_section-color` (`latex-paper/dist/vue.js:1404`). The fallback fires only if `rootIndex` is ever nullish. Booked INFO for that reason — but it is a live producer↔producer token-contract break sitting on PaperView's import line 12, and it becomes visible the moment either side changes.

**Related, and clean**: `--section-color-0..12` are all defined by glass-ui (`color-radius.css:241-253`); the paper has **11** `\chapter{}` roots (`paper/fourier_paper.tex`), so `PaperSidebar.vue:77,96,112` and `MobileFloatingToc.vue:154` index `--section-color-${si}` for `si ∈ 0..10` — inside the range, with 2 slots of headroom. **No defect today.** But none of the four interpolations supplies a `var()` fallback, so a 14th chapter silently loses its accent colour. Flagged as a fragility, not a finding.
**One local override worth naming**: `style.css:121,126` redefine `--section-color-5` (to fix `--viz-amber`'s AA contrast) in **hsl**, overwriting glass-ui's oklch identity token — and `--viz-amber` already derives from it (`color-radius.css:266`), so overriding `--viz-amber` alone would have sufficed. The extra line changes chapter 6's sidebar accent as a side effect.

**Falsifier for the main claim** `--section-heading` declared as a bare triple anywhere in the loaded cascade — `grep -rn -- "--section-heading" glass-ui/dist/styles/ src/style.css` returns four definitions, all `oklch(…)` or `light-dark(oklch, oklch)`.

---

## 3. Superlatives (L-18 — these carry falsifiers too)

---

#### S-1 · The reading-progress bar is a genuinely correct dual-path single-writer

**Provenance** `PaperView.vue:149-187, 303-315, 467-500` · glass-ui `dist/styles/scroll-driven.css:33-48` · `dist/styles/tokens/scale-paper.css:347`

Three things are right at once, and each is the *hard* choice:

1. **No double-run.** `armProgressFallback` refuses to attach when `CSS.supports("animation-timeline", "scroll()")` is true (`:157-158, 177`). The native recipe and the JS floor are provably mutually exclusive, so the bar has exactly one writer in every engine. The overwhelming majority of "progressive enhancement" progress bars run both and fight over `transform`.
2. **The scroller binding is retuned, not re-authored.** glass-ui defaults `--scroll-progress-scroller: root` (`scale-paper.css:347`); this paper scrolls in `.paper-scroll`, not the document. `PaperView.vue:499` sets `--scroll-progress-scroller: nearest` on the bar and places the bar *inside* the scroller it tracks (`:313-315`) so `scroll(nearest block)` resolves correctly. The consumer changed a token; it did not fork the recipe.
3. **The rAF is coalesced.** `onProgressScroll` (`:169-172`) guards on `progressRaf`, so a burst of scroll events produces one write per frame, and `disarmProgressFallback` (`:183-187`) cancels the pending frame *and* removes the listener.

**Falsifier** Find an engine where `CSS.supports("animation-timeline","scroll()")` returns true but `@supports (animation-timeline: scroll())` does not match, producing a silent no-bar state — the two are defined against the same grammar check, so no such engine exists. Or find a second writer of `.paper-progress-bar`'s transform — `grep -n "progressBar" PaperView.vue` yields `:156` (decl), `:162` (read), `:167` (the sole write), `:314` (ref).
**Caveat** C-17 is a real gap *inside* this mechanism (PRM leaves the bar dead). The mechanism is still the best-engineered thing in the file.

---

#### S-2 · `content-visibility` deferral is delegated to the producer utility, and the one dangerous interaction is correctly identified

**Provenance** `PaperArticleWindow.vue:74, 144-167` · glass-ui `dist/styles/utilities/base.css:469-483`

The `.deferred-section` class comes from glass-ui (`contain-intrinsic-size: auto var(--deferred-section-size, 30rem)`); the consumer supplies **only** `--deferred-section-size: 1200px`. That is the correct division: recipe upstream, tuning downstream.

More impressively, the in-source comment (`:152-161`) correctly identifies the non-obvious hazard and verifies it: `useVirtualSectionWindow` measures every section by `offsetHeight` to build spacer math, and a **non-`auto`** `contain-intrinsic-size` would feed it the *estimate* rather than the *remembered rendered size* for skipped sections, corrupting scroll positioning. The utility ships the `auto` prefix (`base.css:479`, verified), and latex-paper measures on a post-first-paint rAF, so the remembered size is always real. This is a consumer reasoning about a producer's internals *correctly* and writing down the invariant.

**Falsifier** glass-ui shipping `contain-intrinsic-size: var(--deferred-section-size, 30rem)` without `auto` — direct read of `base.css:479, 483` shows `auto var(--deferred-section-size, 30rem)` in both arms. Or `measureSection` running before first paint — `PaperArticleWindow.vue:31-36` binds it as a template ref callback, i.e. post-patch.

---

#### S-3 · `useSidebarState` is adopted by pushing the shape-adapter INTO the producer's API rather than forking the composable

**Provenance** `PaperSidebar.vue:30-45` · `MobileFloatingToc.vue:61-74` · glass-ui `dist/sidebar.js`

Both TOC hosts call glass-ui's `useSidebarState<PaperSectionData>({ … getChildren: (n) => n.subsections })`. `PaperSectionData` stores children under `subsections`, not the canonical `children`; rather than re-implement the composable locally (which is what the two files did before), the consumer got glass-ui to accept a `getChildren` override — "symmetric with `useTreeIndex` / `useScrollTracker`", per the in-source note (`PaperSidebar.vue:34-37`). Two hosts now share one implementation, the divergence risk between desktop and mobile expand/collapse is gone, and the change landed in the **producer**, where every future consumer benefits.

**Falsifier** A surviving local `userExpanded`/`userCollapsed` reactive `Set` in either file — `grep -n "userExpanded\|userCollapsed\|new Set" PaperSidebar.vue MobileFloatingToc.vue` → 0 hits in both. Or `getChildren` not existing in glass-ui's API — it is in `dist/sidebar.d.ts` → `composables/sidebar`.
**Caveat** The adoption is *correct*; C-01 means it runs twice on desktop over an invisible subtree.

---

#### S-4 · Zero hand-rolled `<button>`; the glass-ui variant/size vocabulary used is real, not invented

**Provenance** `PaperView.vue:364-374, 398-408` · `PaperSidebar.vue:54, 71, 89, 106` · `MobileFloatingToc.vue:112, 117, 138, 150, 166` · `search/*.vue` · glass-ui `dist/button-BNDWhAZb.js`

Every interactive control in the subtree is a glass-ui `<Button>`. The variants used — `link`, `glass`, `ghost` — and the sizes — `sm`, `icon` — **all exist** in glass-ui@4.0.0's cva table (verified: variants `default, solid, primary-audacious, gold-audacious, destructive, outline, secondary, accent, ghost, glass, glass-wash, ai, link`; sizes `default, xs, sm, lg, icon, icon-sm`). No invented variant string, no silent fallthrough to `default`. Likewise the local `ui/tooltip/Tooltip.vue` is a genuine 20-line thin adapter over `@mkbabb/glass-ui/tooltip`'s decomposed primitives — no shadow copy — with `TooltipProvider` correctly mounted once at `App.vue:23` rather than per-instance.

**Falsifier** Any `variant="…"` or `size="…"` in the subtree absent from the cva table — enumerated above and all present; or a native `<button>` — `grep -n "<button" components/paper/**` → 0. (The one remaining raw element is `<input>` in `PaperSearchInput.vue:36`, which is the C-01b/`glass-ui/search` story, not a button.)
**Caveat** C-05: the vocabulary is right, the stylesheet then overrides what it buys.

---

#### S-5 · Contract-v2 resolution posture is clean — zero `@mkbabb/*` dist aliases, all producer access through `exports` maps

**Provenance** `vite.config.ts:20-31, 63-69` · the 15 producer import sites enumerated in §1

`resolve.alias` carries `@` only; there is no `@mkbabb/*` → `dist/` path, no `development` export condition, and no `server.fs.allow` widening for sibling `src/`. Every one of the 15 producer imports in this subtree is a **bare specifier through the package's own `exports` map** — including the 9 glass-ui *subpath* imports, which is the strictest form (the barrel is never touched from source). The config cites `docs/precepts/cross-repo-dev-resolution.md §2.2/§2.4` in-line for both strikes.

This matters more than it reads: it is precisely what makes the F.W1 tri-package uplift a *manifest* change rather than an archaeology project. The 15 sites will move when the export maps move, and nothing else will.

**Falsifier** Any `@mkbabb/*` entry in `resolve.alias`, any `"development"` condition, or any deep `node_modules/.../dist/...` import in the subtree — `grep -rn "node_modules\|/dist/" components/paper/` → 0; `vite.config.ts:26-29` declares `alias: { "@": … }` and nothing more.
**Corroborates** `lane-frontend.md:45`.

---

## 4. Verdict

PaperView's **API** coupling is exemplary by absence — 0 of 33 client operations, correctly. Its **build-graph** consumption is loose but survivable (C-15, C-16). Its **producer-typing** consumption is unsound at the one place it matters (C-06: the whole active-section contract rides an `any`). Its **design-system** consumption is the real story: the vocabulary is adopted (S-3, S-4) and then systematically overridden (C-04, C-05, C-08), and two structural defects — a mobile subtree that mounts on desktop and teleports past its own guard (C-01), and 26 orphaned selector groups left behind by a component split (C-01b) — mean the search surface this component owns is both **doubled** and **unstyled** in production today.

The component is DEFECTIVE. The two BLOCKERs are independent of the F.W1 tri-package uplift and can be cured without it; C-03/C-19 must ride with it.

---

*Read-only pass over `/Users/mkbabb/Programming/fourier-analysis` (evidence) and `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche` (corpus). No product source touched in any repo. This file is the single write.*

claude-opus-5[1m]

# Challenge C · CONSUMPTION — `PaperSearch` (fourier-analysis)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/PaperSearch.vue` (397 lines)
**Axis** C — consumption of value.js 0.13 · keyframes.js 4.3 · glass-ui ^4.0.0 · the fourier API surface; props/emits contract quality; integration seams.
**Mode** static + source-derived, read-only. No browser tooling. Two non-mutating oracles were run against the *installed* toolchain inside `web/` (`@vue/compiler-sfc` scoped-CSS compile; a Vue 3.5.38 SSR scope-id semantics probe) — neither wrote to the fourier tree.
**Date** 2026-08-06. Repo state as read: branch `m/w1-bump-migration`, working tree as described in `formation/fourier/lane-frontend.md` §0.

**Prior posture: DEFECTIVE until proven otherwise.** The tree does not clear it.

---

## §0 · Read set

Whole-file reads: `PaperSearch.vue`; `search/PaperSearchInput.vue` (69); `search/PaperSearchDropdown.vue` (70); `search/PaperSearchModal.vue` (124); `search/usePaperSearch.ts` (108); `search/searchHelpers.ts` (74); `search/paperSearchIndex.ts` (401); `search/index.ts` (4). Partial reads for seam evidence: `PaperView.vue`, `PaperSidebar.vue`, `MobileFloatingToc.vue`, `lib/colors.ts`, `style.css`, `tsconfig.json`, and glass-ui 4.0.0's installed `package.json` / `dist/styles/**`.

---

## §1 · Verdict and tally

| Severity | Count |
|---|---|
| BLOCKER | **3** |
| MAJOR | **7** |
| MINOR | **8** |
| INFO (defect-asserting) | **2** |
| **Total defects** | **20** |
| Superlatives | **4** |
| Measured zeros (no defect asserted) | 2 |

**Headline.** The component's single largest artefact — a 356-line `<style scoped>` block occupying 90 % of the file — is **43/48 dead by construction**. Commit `ffba307` extracted every element the block styles into three child SFCs and left the block behind; because the children carry no `<style>` of their own, they carry no scope id, and Vue's parent-scope inheritance reaches only a single-root child's root element. The dropdown, the backdrop, the badges, the highlight marks, both transition pairs and the *entire* modal are unstyled. This is not a design opinion; it is a compile-time fact reproduced below.

Secondarily, the leaf's consumption of value.js and keyframes.js is **exactly zero** (measured, not estimated) — a clean result for the F.W2 break budget — while its consumption of glass-ui is *correct in specifier posture and wrong in altitude*: it hand-rolls a modal dialog and a VSCode-style fuzzy scorer that glass-ui **4.0.0, the installed pin**, already exports as `./dialog`, `./search` and `./command`, with `./dialog` already imported five times elsewhere in the same repo.

---

## §2 · BLOCKERS

### C-B1 — 43 of 48 compiled scoped rules can never match; the dropdown, the backdrop and the whole modal are unstyled

**Severity** BLOCKER
**Provenance** `web/src/components/paper/PaperSearch.vue:41-397` (the `<style scoped>` block); `search/PaperSearchInput.vue:34-69`; `search/PaperSearchDropdown.vue:33-70`; `search/PaperSearchModal.vue:40-124`.

**The mechanism, in four proven steps.**

1. **The block is scoped and compiles to attribute selectors.** `PaperSearch.vue:41` is `<style scoped>`. Compiling it with the repo's own `@vue/compiler-sfc` yields 48 rules, every one of which gains `[data-v-…]` on its last compound — e.g. `.search-modal[data-v-…]`, `.paper-search-results[data-v-…]`, `.paper-search-badge[data-type="definition"][data-v-…]`.

2. **The three children have no `<style>` block at all.** `grep -c '<style' search/*.vue` → `0`, `0`, `0`. A component with no scoped style has no `__scopeId`, so none of its own vnodes stamps an attribute.

3. **Vue's parent-scope inheritance reaches only a *single-root* child's root element.** Probed against the installed `vue@3.5.38`, a parent with `__scopeId: "data-v-PARENT"` rendering three children produced:

   ```
   <div class="paper-search" data-v-PARENT>
     <div class="wrap" data-v-PARENT><span class="icon"></span></div>   ← single-root: root stamped, descendant NOT
     <!--[--><div class="results">…</div><div class="backdrop"></div><!--]-->  ← multi-root: NOTHING stamped
     <!--teleport start--><!--teleport end-->
   </div>
   teleports.body = '<div class="overlay"><div class="modal"></div></div>'   ← NOTHING stamped
   ```

4. **Each child falls into a losing bucket.**
   - `PaperSearchInput.vue` is single-root (`:35` `<div class="paper-search-input-wrap">`) → **only that div** inherits. Its descendants `.paper-search-icon` (`:36`), `.paper-search-input` (`:37-46`), `.paper-search-action-btn` (`:51`, `:62`) inherit nothing.
   - `PaperSearchDropdown.vue` is **multi-root**: a `<Transition>` (`:35`) *and* a sibling backdrop `<div>` (`:65`). Fragment root → no inheritance at all → `.paper-search-results`, `.paper-search-result`, `.paper-search-badge`, `.paper-search-number`, `.paper-search-label`, `.paper-search-backdrop` are all unreachable.
   - `PaperSearchModal.vue`'s root is `<Teleport to="body">` (`:41`). The overlay is a *child* of the Teleport, not the component's subtree root → no inheritance → all 22 `.search-modal-*` rules unreachable.

**The tally.** Reachable: `.paper-search`, `.paper-search--sidebar`, `.paper-search-input-wrap`, `.paper-search-input-wrap:focus-within`, `.paper-search--floating .paper-search-input-wrap` — **5**. Unreachable — **43**. (My first automated pass reported 4/44; it mis-bucketed `.paper-search--sidebar`, which *is* on the div `PaperSearch.vue:23` renders itself. Corrected here in the open.)

**No global fallback exists.** Every class in the block was grepped across all of `web/src/` excluding `components/paper/`: `paper-search-input-wrap`, `paper-search-icon`, `paper-search-action-btn`, `paper-search-results`, `paper-search-badge`, `paper-search-label`, `paper-search-backdrop`, `search-modal-overlay`, `search-modal-header`, `search-modal-results`, `search-modal-empty`, `search-modal-footer`, `search-modal-hint` → **0 occurrences each**. There is no unscoped declaration anywhere.

**Provenance of the regression.** `git show ffba307 -- web/src/components/paper/PaperSearch.vue` is the split: `-274 +40` lines of `<script setup>`, the markup relocated into `search/*.vue`, and the style block untouched. The commit body asserts *"Every deletion has its glass-ui or in-tree replacement wired and rendering — verified via vue-tsc -b --force (exit 0) and npm run build (exit 0)"*. Both gates are structurally blind to dead scoped CSS: the selectors compile, the bundle builds, nothing matches at runtime.

**Consequences, each independently falsifiable.**

| Lost rule | Line | Runtime consequence |
|---|---|---|
| `.search-modal-overlay { position:fixed; inset:0; z-index:var(--z-modal); display:flex; … backdrop-filter }` | `:239-250` | The expanded modal is **not an overlay**. It teleports to `body` as an in-flow block appended after the app root. |
| `.search-modal { width:min(36rem,…); max-height:70vh; background; border; box-shadow; overflow:hidden }` | `:252-264` | No panel. No width constraint, no chrome, no clipping. |
| `.search-modal-results { flex:1; min-height:0; overflow-y:auto }` | `:296-302` | 30 result rows render as an unbounded list; no scroll container. |
| `.paper-search-results { position:absolute; top:calc(100%+4px); z-index; max-height:50vh; overflow-y:auto; border; radius; shadow }` | `:103-116` | The inline dropdown renders **in flow**, displacing sidebar / floating-bar content instead of overlaying it. It retains only the global `glass-floating` plate applied at `PaperSearchDropdown.vue:39` (declared `@mkbabb/glass-ui/dist/styles/glass/ladder.css:83`), so it has a surface but no geometry. |
| `.paper-search-backdrop { position:fixed; inset:0; z-index }` | `:192-196` | The click-catcher is an empty in-flow div. **Outside-click-to-close is non-functional** in the `floating` variant — the only variant that renders it (`PaperSearchDropdown.vue:66`). |
| `.paper-search-result { display:flex; width:100%; text-align:left; padding; background:none }` + `.is-selected` | `:118-135` | Result rows keep glass-ui `Button variant="ghost"` default geometry (centred, fixed height) instead of full-width left-aligned rows; the keyboard-selection highlight has no styling. |
| `.paper-search-badge[data-type=…]` type colours | `:150-166` | All badges render in the neutral default; theorem/definition/equation are visually indistinguishable. |
| `.paper-search-label :deep(mark)` | `:185-190` | Fuzzy highlights fall back to the UA default yellow `<mark>`. |
| `.paper-search-input { border:none; outline:none; background:transparent }` | `:69-78` | A UA-chrome `<input>` (border + background) nests inside the bordered `.paper-search-input-wrap`, which *is* styled — a double-bordered field. |
| `.search-dropdown-*` and `.search-modal-*` transition classes | `:225-236`, `:359-395` | All six enter/leave transitions are inert. |

**Falsifier.** Mount `/paper`, open the search, and find `data-v-*` on `.search-modal` or `.paper-search-results` in the live DOM; *or* find any of these class names declared in a non-scoped stylesheet. Both were checked statically and both are negative. The specific *visual* end-state (e.g. "the modal appears at the bottom of the page") is **UNPROVEN-NEEDS-LIVE → SS-13**; the *rule-matching* claim is proven at compile time and needs no browser.

**Cheapest correct repair** (not a mandate, a bound): move the block into the three children unscoped-per-child, or lift it to a non-scoped module — *not* a `:deep()` sprinkle, which cannot reach the Teleport contents at all.

---

### C-B2 — Two `PaperSearch` trees share one `usePaperSearch` state; expanding teleports two modals into `<body>`

**Severity** BLOCKER
**Provenance** `PaperView.vue:111`, `:320`, `:328`, `:335`, `:347`, `:361`; `PaperSidebar.vue:51`, `:132-139`; `MobileFloatingToc.vue:107`, `:110-111`; `PaperSearchModal.vue:19-24`, `:27-37`, `:41`; `PaperSearchInput.vue:20-25`.

`PaperView.vue:111` constructs **one** `search = usePaperSearch({…})` and passes the same object to `MobileFloatingToc` (`:328`) and `PaperSidebar` (`:347`). Each renders its own `<PaperSearch>` — `MobileFloatingToc.vue:111` (`variant="floating"`), `PaperSidebar.vue:51` (`variant="sidebar"`).

**Both are mounted at the same time, at every viewport.**
- `PaperSidebar` has **no `v-if`** (`PaperView.vue:335`); it is hidden below 1024 px purely by CSS (`PaperSidebar.vue:132-139`: `.paper-sidebar { display:none }` + `@media (min-width:1024px)`). CSS-hidden ≠ unmounted.
- `MobileFloatingToc` is `v-if="!mobileTocVisible"` (`PaperView.vue:320`), where `mobileTocVisible` is driven by an `IntersectionObserver` on `mobileNavRef` (`PaperView.vue:146`, `:248-257`) — and `mobileNavRef` is the `lg:hidden` inline nav at `PaperView.vue:361`. On desktop that element is `display:none`, so the observer reports `isIntersecting:false`, so `mobileTocVisible` becomes `false`, so **the mobile bar mounts on desktop** (hidden only by the `lg:hidden` class at `MobileFloatingToc.vue:107`).

**Consequences.**
1. `isExpanded === true` mounts **two** `PaperSearchModal` roots, each `Teleport`-ing to `body` (`PaperSearchModal.vue:41`) — two inputs bound to the same `query`, two 30-row result lists.
2. Two auto-focus watchers race on the same flip (`PaperSearchModal.vue:19-24`).
3. `document.querySelector(".search-modal-results")` (`PaperSearchModal.vue:32`) is a **global** query, not a template ref; it resolves the *first* match in document order, so keyboard scroll-into-view can drive the wrong modal.
4. Both `PaperSearchInput` instances watch `isOpen` and call `focus()` (`PaperSearchInput.vue:20-25`). The sidebar instance mounts second, so its `focus()` runs last; below 1024 px it is inside a `display:none` subtree, where `HTMLElement.focus()` is a no-op. **Cmd/Ctrl-K** (`PaperView.vue:113-118` → `search.open()`, listener bound at `:273`) therefore lands focus nowhere on narrow viewports.
5. The mobile branch additionally sits behind `v-if="searchActive"` (`MobileFloatingToc.vue:110`), a *second*, independent open-state that the shared composable knows nothing about — `MobileFloatingToc.vue:99-103` has to reconcile it with a watcher on `search.isOpen`.

**Corpus reconciliation — extends, does not contradict, intake rows R3-11 / R3-12 / X-6.** The adjudicated intake (`audit/codex-provenance/intakes/lane-fourier-r3-r6.md`) records at **X-6** that the tree contains exactly two `<Teleport>` sites, `PaperSearchModal.vue:41` and `FullscreenViewer.vue:105` — re-verified here. **R3-11** records that Codex's instance registry carried the `PaperSearchModal.vue:41` record *twice* with an identical `callsiteId`, adjudicated a registry-join defect; **R3-12** lists "both Paper-search callsites" among the 7 rows that collapse 35 open-family records to 28.

This challenge adds the product fact behind those rows: **the cardinality of 2 is real.** There genuinely are two mounted `PaperSearch` trees over one state object. The registry was right about the count and wrong about the key — it duplicated a *module* callsite where it should have distinguished two *instances*. The F.W4 carry filed at R3-11 should therefore be widened: the join defect is not only a serialization bug, it is masking a live duplicate-mount.

**Falsifier.** Show that only one of `PaperSidebar` / `MobileFloatingToc` is ever mounted at a time — this requires a `v-if` on the sidebar (absent at `PaperView.vue:335`) or `mobileTocVisible` staying `true` on desktop (contradicted by `IntersectionObserver` semantics on a `display:none` target). A live `document.querySelectorAll('.search-modal').length === 2` check is **UNPROVEN-NEEDS-LIVE → SS-13**; the mount analysis is static and complete.

---

### C-B3 — The modal hand-rolls `glass-ui/dialog` (already imported 5× in this repo) and ships zero dialog semantics

**Severity** BLOCKER (a11y consequence, not mere duplication)
**Provenance** `PaperSearchModal.vue:40-124`; installed `node_modules/@mkbabb/glass-ui/package.json` exports; `formation/fourier/lane-frontend.md` §3 import census; `formation/fourier/CENSUS-2026-08-03.md` / lane-frontend §4 candidate-shadow row.

`PaperSearchModal.vue` builds a modal from primitives: `Teleport` (`:41`) → `Transition` (`:42`) → overlay with `@click.self` (`:46`) → panel with `@click.stop` (`:48`). What it does **not** build:

- `role="dialog"` / `aria-modal="true"` / accessible name — **`aria-*` + `role=` + `tabindex` count across `PaperSearch.vue` and the whole `search/` directory is `0`.**
- Focus trap. Tab from the last footer element escapes to the page behind.
- Return-focus on close.
- Background scroll lock or `inert`.
- Dialog-level Escape (see C-M1 — Escape only fires while an `<input>` holds focus).

**The primitive is present at the pinned version, not the uplift target.** A node probe of the *installed* `@mkbabb/glass-ui@4.0.0` `exports` map returns `./search`, `./confirm-dialog`, `./dialog`, `./command`. `Dialog` / `DialogContent` are already consumed five times in this same repo — `ExportModal.vue:11`, `GalleryView.vue:22`, `AdminFlaggedPanel.vue:11`, `AdminUserList.vue:12`, `GalleryCardModal.vue:5` (lane-frontend §3 full import listing). This is not an "upstream might have it someday" flag; it is a primitive the codebase demonstrably knows how to use, declined in exactly one place.

**Upgrade to the corpus.** lane-frontend §4 books `PaperSearch.vue + search/` (397 + 435 LOC) as a **🟡 CANDIDATE SHADOW** against `./search`, noting 7.0.0 additionally ships `useDockSearch` composing `useFuzzySearch` — "the VSCode subsequence scorer — NO re-fork". This challenge upgrades that row on two counts:
1. The shadow is not only `./search`. The modal shadows **`./dialog`**, an already-consumed subpath — which moves the finding from "convergence opportunity" to "inconsistency inside one repo".
2. The re-fork the producer forbids is **literal here**: `paperSearchIndex.ts:54` is headed *"Fuzzy matching (VSCode-style subsequence scorer)"* and `:56-68` documents a bonus table (+8 start, +7 word-separator, +6 camelCase, +5 run, +3 prefix-align) that is the same shape as the primitive it duplicates. The census called it a candidate; the source names itself.

**Falsifier.** Find `role="dialog"`, focus-trap code, or a scroll lock anywhere in the search tree (grep → 0); or show `./dialog` absent from the installed 4.0.0 export map (the probe says present). The *behavioural* severity of the missing trap is **UNPROVEN-NEEDS-LIVE → SS-13**; the absence of the attributes and of the import is proven statically.

---

## §3 · MAJOR

### C-M1 — Keyboard handling is bound only to the two `<input>`s; there is no dialog- or document-level handler

**Provenance** `PaperSearchInput.vue:44`; `PaperSearchModal.vue:59`; `usePaperSearch.ts:63-92`; `PaperView.vue:113-118`, `:273`.

`@keydown="search.onKeydown"` appears exactly twice, both on `<input>` elements. The only `window.addEventListener("keydown", …)` in `components/paper/` is `PaperView.vue:273` → `handleGlobalKeydown`, which handles **only** `Cmd/Ctrl+K` (`:113-118`). Consequently, the moment the user clicks or tabs onto a result `<Button>` inside the modal, Escape, ArrowUp, ArrowDown and Enter all stop working. A modal with no focus trap (C-B3) and no dialog-level Escape is unclosable by keyboard from any focus position other than the input.

**Falsifier.** Any additional keydown listener inside `search/` — `grep -rn addEventListener search/` → 0.

### C-M2 — Children mutate parent state through the props object; the declared `select` emit is dead

**Provenance** `PaperSearchInput.vue:43`, `:45`; `PaperSearchDropdown.vue:12-14`, `:48`; `PaperSearchModal.vue:12-14`, `:58`, `:90`; `PaperSearch.vue:31-37`.

Writes travelling *up* through a prop: `search.query.value = …` (Input `:43`, Modal `:58`), `search.isOpen.value = true` (Input `:45`), `search.selectedIndex.value = i` (Dropdown `:48`, Modal `:90`). Vue's `props are readonly` dev warning never fires, because the mutation targets a nested `Ref` rather than the prop binding — the guardrail is bypassed silently.

The correct channel exists and is unused: **both** `PaperSearchDropdown.vue:12-14` and `PaperSearchModal.vue:12-14` declare `defineEmits<{ select: [id: string] }>()` and **never call `emit`** (grep for `emit("select"` → 0). `PaperSearch.vue:31-37` binds no `@select`. The contract advertises an event that does not exist while the real data flow runs backwards through the prop.

**Falsifier.** One `emit("select", …)` call anywhere — zero found.

### C-M3 — `PaperSearchState` is an inferred structural type, so a composable's private shape is six components' public prop contract

**Provenance** `usePaperSearch.ts:108`; `PaperSearch.vue:5`, `:9`; `PaperSearchInput.vue:5`, `:8`; `PaperSearchDropdown.vue:4`, `:8`; `PaperSearchModal.vue:5`, `:9`; `PaperSidebar.vue:5`; `MobileFloatingToc.vue:8`.

`export type PaperSearchState = ReturnType<typeof usePaperSearch>` makes the entire return object — refs, functions and all — the prop type of six components. Renaming any key inside `usePaperSearch`'s `return {…}` block (`:94-105`) rewrites six prop contracts with no declaration site to review.

Two observable symptoms confirm the shape is wrong, not merely unusual:
- Refs nested in a props object are **not** unwrapped in templates, so every access pays `.value` — 22 sites across the four SFCs (`PaperSearch.vue:28` ×2; `PaperSearchInput.vue:21,42,53,55,59`; `PaperSearchDropdown.vue:20,22,37,42,46,48,58`; `PaperSearchModal.vue:20,30,44,57,82,84,88,90,100`). That is the tax of the state-bag.
- The composable already has two competing entry points for one transition: `open()` (`usePaperSearch.ts:102`) is called only from `PaperView.vue:116`, while the search components set `isOpen` directly (`PaperSearchInput.vue:45`).

**Falsifier.** An explicit `interface PaperSearchState { … }` — absent; `search/index.ts:1` re-exports the inferred alias verbatim.

### C-M4 — Prefix-narrowing silently truncates the candidate set to the previous query's top-30

**Provenance** `paperSearchIndex.ts:219-228`, `:239`; `usePaperSearch.ts:35-37`.

```
let candidates = index;
if (q.length > 1) {
    const prefix = q.slice(0, -1);
    const prefixResults = _cache.get(prefix);
    if (prefixResults) candidates = prefixResults;   // :226
}
```
`prefixResults` was already truncated by `scored.slice(0, maxResults)` at `:239`, with `maxResults = 30` supplied at `usePaperSearch.ts:36`. So for every query longer than one character whose prefix is cached, the corpus searched is **the previous query's top 30 rows**, not the index. An entry ranked #45 for `"fo"` can never appear for `"fou"` — even if it would rank #1 — because it was evicted one keystroke earlier. Rank inversions across a one-character extension are not hypothetical: `scoreEntry:171-177` weights five fields differently (18/12/10/6/3) and `fuzzyMatch:124` applies a length penalty, so extending a token routinely reorders.

**Falsifier.** Show `searchIndex` re-scores the full `index` for extended queries. It does not; `candidates` is reassigned at `:226` and the loop at `:231` iterates `candidates`.

### C-M5 — Module-singleton result cache, keyed only by query string, never disposed, never invalidated against the index

**Provenance** `paperSearchIndex.ts:196`, `:205`, `:210`, `:214`, `:234`, `:240`; `usePaperSearch.ts:18`, `:44`.

`let _cache: Map<string, SearchResult[]> = new Map()` lives at module scope (`:196`). `buildSearchIndex` runs **per `usePaperSearch()` call** (`usePaperSearch.ts:18`), but `_cache` outlives every component and route. Entries are keyed on the lowercased query alone (`:210`, `:240`) — there is no index identity in the key. Because results are `{ ...entry, … }` spreads of `SearchEntry` objects (`:234`), a cache hit after a remount returns rows whose `id`s came from the *previous* index; those `id`s are fed straight to `navigateTo` (`usePaperSearch.ts:44`) and thence to scroll anchors. The only clears are an empty query (`:205`) and a >200-entry prune (`:214`) — neither is ownership-aware, and nothing runs on unmount.

**Falsifier.** A dispose hook or an index-identity component in the cache key — `grep -rn "onScopeDispose\|onUnmounted" search/` → 0.

### C-M6 — `SearchResult.matches` is computed and shipped on every result but never read; the highlighter re-runs the scorer per row per render

**Provenance** `paperSearchIndex.ts:48-52`, `:184-185`, `:234`; `searchHelpers.ts:34-47`; `PaperSearchDropdown.vue:58`; `PaperSearchModal.vue:100`.

`SearchResult.matches` is declared at `:50-51` with the JSDoc *"Matched character indices into the display label, for highlighting."* `scoreEntry:184-185` even special-cases retaining them only for the label field. Nothing consumes them: `grep -rn "\.matches" web/src/` outside `paperSearchIndex.ts` returns `searchHelpers.ts:45` (its own local `m.matches`) and three `window.matchMedia(...).matches` hits. `highlightFuzzy` explicitly re-derives them — `searchHelpers.ts:37` *"Re-run fuzzy match on the display text to get precise indices"*.

The re-derivation is invoked **inline from `v-html` inside the `v-for`** (`Dropdown:58`, `Modal:100`), so it re-executes for all 30 rows on **every** re-render — including each `@mouseenter` write to `selectedIndex` (`Dropdown:48`, `Modal:90`) and each arrow key. With both trees mounted (C-B2) that is up to 60 full fuzzy scans per keypress, plus 30 dead `matches` arrays materialised per query.

**Falsifier.** One consumer of `r.matches` — zero found.

### C-M7 — Zero combobox / listbox semantics

**Provenance** `PaperSearchInput.vue:37-46`; `PaperSearchDropdown.vue:36-60`; `PaperSearchModal.vue:52-102`; grep.

`aria-*` + `role=` + `tabindex` across `PaperSearch.vue` and all of `search/` → **0**. No `role="combobox"`, `aria-expanded`, `aria-controls` or `aria-activedescendant` on either input; no `role="listbox"` on either results container; no `role="option"` / `aria-selected` on the rows. The rows are glass-ui `Button variant="ghost"` (`Dropdown:41-45`, `Modal:83-88`), so assistive tech announces "30 buttons" with no relationship to the field and no result count. The selected state is carried entirely by the CSS class `is-selected` — whose styling is itself dead (C-B1), so it is invisible *and* inaudible.

The inputs also omit `type="search"`, `autocomplete="off"`, `spellcheck="false"` and `enterkeyhint` (`Input:37-46`, `Modal:52-60`).

**Falsifier.** Any aria attribute in the tree — zero.

---

## §4 · MINOR

### C-N1 — `highlightFuzzy` mixes UTF-16 code-unit indices with code-point iteration

`fuzzyMatch` compares `pattern[pi] !== text[ti]` and pushes `ti` (`paperSearchIndex.ts:84-87`) — **code-unit** indices. `highlightFuzzy` then iterates `const chars = [...text]` (`searchHelpers.ts:52`) — **code-point** units — and tests `matchSet.has(i)` against that index. The two spaces diverge for any astral character. Labels come from `stripHtml(section.title)` and `thm.name` (`paperSearchIndex.ts:318`, `:384`) in a Fourier-analysis treatise, where math-alphanumerics (`𝔽 U+1D53D`, `𝜋 U+1D70B`) are routine. Separately, `matchSet` is built against `text.toLowerCase()` (`:39`, `:43`) whose length can differ from `text` (`'İ'.toLowerCase().length === 2`). Result: `<mark>` lands on the wrong characters or splits a pair. Data-dependent, hence MINOR. The index-space mismatch is proven statically; an astral-label instance in the shipped paper is **UNPROVEN-NEEDS-LIVE → SS-13**.

### C-N2 — The "Clear search" control performs a full close, and Escape wipes the query

`PaperSearchInput.vue:58-67`: `title="Clear search"` → `@click="search.close()"`, and `close()` (`usePaperSearch.ts:48-53`) sets `isOpen=false`, `isExpanded=false`, `query=""`, `selectedIndex=0`. Since `title` is the only accessible name on that icon button, the label is a lie to both sighted and AT users. Same asymmetry on Escape: `onKeydown:83-90` collapses the modal when expanded but calls `close()` otherwise — wiping the query, which is non-standard for a search field (Escape conventionally dismisses the popup and retains the text).

### C-N3 — `canExpand` diverges from the dropdown's own visibility condition and is 120 ms out of phase

`PaperSearch.vue:28` computes `!!search.query.value && search.results.value.length > 0`; `PaperSearchDropdown.vue:37` gates on `isOpen && !isExpanded && results.length > 0`. The expand affordance therefore appears while `isOpen` is `false` — a control for a panel that is not showing. Worse, `query` is the raw ref while `results` derives from `debouncedQuery` (`usePaperSearch.ts:28-37`, 120 ms), so the two conjuncts describe different instants.

### C-N4 — Dead exposure

`PaperSearchDropdown.vue:30` `defineExpose({ resultsRef })`; `PaperSearch.vue:31-34` attaches no `ref` to the dropdown and nothing reads it. The expose is unreachable API surface.

### C-N5 — `const props = defineProps<…>()` is unused, and the repo's typecheck cannot see it

`PaperSearch.vue:8` binds `props`; `<script setup>` never references it (the template resolves `search` / `variant` through binding metadata). `tsconfig.json:8` sets `"strict": true` but **neither `noUnusedLocals` nor `noUnusedParameters`** (grep over `tsconfig*.json` returns only the `strict` line), so `vue-tsc -b` cannot flag it — which is precisely why it survived the gate `ffba307`'s commit body cites.

### C-N6 — The debounce timer is never cancelled

`usePaperSearch.ts:27-33` holds `debounceTimer` in closure scope with no `onScopeDispose(() => clearTimeout(debounceTimer))`. Tearing `/paper` down within 120 ms of a keystroke still fires the callback into a detached ref. Harmless today; a leak by construction, and it will stop being harmless the moment the callback does anything but assign.

### C-N7 — Three independent redeclarations of the `variant` union

`PaperSearch.vue:10`, `PaperSearchInput.vue:9`, `PaperSearchDropdown.vue:9` each spell `variant: "sidebar" | "floating"` as a literal. `search/index.ts:1-4` exports no shared type. Adding a variant requires three synchronised edits with no compiler linkage between them.

### C-N8 — Verbatim duplication produced by the split

`PaperSearchDropdown.vue:41-60` and `PaperSearchModal.vue:83-102` are the same 20-line result row modulo the `:key` prefix and one extra class. The two `selectedIndex` scroll-into-view watchers (`Dropdown:19-28`, `Modal:27-37`) are one watcher split by an `isExpanded` guard — `git show ffba307` shows the pre-split single watcher that switched containers internally. The split traded one cohesive watcher for two, and introduced the global `document.querySelector` of C-B2 §3.

---

## §5 · INFO (defect-asserting)

### C-I2 — Hardcoded absolute colours that cannot dark-adapt

`PaperSearch.vue:159` `hsl(210 80% 55% / 0.12)`, `:160` `hsl(210 80% 45%)`, `:164-165` `hsl(280 60% …)`, `:186` `hsl(50 100% 60% / 0.35)`, plus `rgba(0,0,0,0.1)` at `:114` and `rgba(0,0,0,0.14)` / `rgba(0,0,0,0.06)` at `:261-262`. The sibling badge rule two lines up routes through `var(--primary)` (`:154-156`), so the file is internally inconsistent. No `.dark` override exists for any of the absolute values, and none goes through `lib/colors.ts` — the tree's 117-line CSS-var→hex resolver whose `cssVarToHex` (`lib/colors.ts:22-40`) exists exactly to keep colour derivation on the token system. Currently moot only because these rules are dead (C-B1); they are the rows that will surface a dark-mode regression the instant C-B1 is repaired. Flagged now so the repair does not ship one.

### C-I3 — One surface, two mechanisms, forty lines apart

The dropdown adopts the glass-ui tier class `glass-floating` (`PaperSearchDropdown.vue:39`; declared at `@mkbabb/glass-ui/dist/styles/glass/ladder.css:83`) — the correct post-4.0.0 name, matching lane-frontend §3's live-tier finding. The modal, in the same feature, hand-rolls the equivalent plate in CSS: `background: var(--background)` + `border` + two `rgba` shadows (`PaperSearch.vue:258-263`) and a separate `backdrop-filter: blur(6px)` on the overlay (`:248-249`). One primitive, two mechanisms, no comment explaining the divergence.

---

## §6 · Measured zeros (facts, no defect asserted)

### C-Z1 — value.js and keyframes.js consumption is exactly zero

`grep -rn "value.js\|keyframes" web/src/components/paper/` → **0 hits**. The six transitions are declarative CSS on glass-ui motion tokens; `--ease-standard`, `--ease-out-expo`, `--ease-in`, `--z-bar` and `--z-modal` all resolve (`@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css:218`, `:345` and siblings), reaching the app via `style.css:3` `@import "@mkbabb/glass-ui/styles"`.

**Consequence for F.W2.** `PaperSearch` contributes **nothing** to the value.js 0.13 → 4.0 break budget. It is not among lane-frontend §5's five value.js sites (`easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`), and it holds no `keyframes.js` engine reference (contrast `useFourierMorph.ts:14`). The `keyframes 4.3.0 → glass-ui ~4.0.0` tilde deadlock recorded at lane-frontend §5 does not bind through this leaf. The bare-specifier posture is clean: the only package imports in the whole feature are `@mkbabb/glass-ui/button` ×3 (`Input:3`, `Dropdown:3`, `Modal:3`), `lucide-vue-next` ×2, `vue` ×4 and `@mkbabb/latex-paper` ×2 — no dist paths, no `development` condition, consistent with the precept posture recorded at lane-frontend §1 (`vite.config.ts:22-25`).

### C-Z2 — R6-8 does not reach this leaf

`grep -rn "lib/api" web/src/components/paper/` → **0**. The index is built entirely from `@mkbabb/latex-paper` `PaperSectionData` (`paperSearchIndex.ts:5-12`; `usePaperSearch.ts:6`, `:18`), which the build-time `@mkbabb/latex-paper/vite` plugin compiles from `../paper/fourier_paper.tex` (lane-frontend §1). None of the 45 operations (the R4–R6 count the intake adopts at X-10) is reachable from this component, so the operation↔client back-reference hazard adjudicated **TRUE at R6-8** — *"an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam"* — is **structurally absent** here. Recorded as a measured zero so the F.W5 keystone can exclude this leaf by evidence rather than by silence.

---

## §7 · Superlatives (L-18 runs both ways)

### C-S1 — `highlightFuzzy`'s escaping is correct in the non-obvious way

`searchHelpers.ts:34-70` escapes on **both** early-return paths (`:35` empty query, `:49` no matches) **and** per-segment inside the loop — matched runs at `:61`, unmatched characters at `:64`. The only unescaped bytes in the returned string are the `<mark>` tags the function itself emits. The sink is a text position (`v-html` on a bare `<span>`, `Dropdown:56-59` / `Modal:98-101`) with no attribute derived from the value, so `escapeHtml`'s omission of `"` and `'` (`:73`) is not a gap. This is the correct discipline applied at every exit, and it should be carried verbatim through any re-home onto `useFuzzySearch`.
**Falsifier** (run): an attribute-position `v-html` sink, or a return path that skips `escapeHtml`. Neither exists — all four returns are covered.

### C-S2 — The specifier posture is contract-v2 clean

Three bare subpath imports of `@mkbabb/glass-ui/button`, zero root-barrel imports, zero `dist/` or `src/` specifiers, zero `reka-ui`, zero local shadcn copies, and the one glass class in use (`glass-floating`, `Dropdown:39`) is the **post-4.0.0 name**, not a stale pre-4.0.0 one. This is the posture lane-frontend §3 calls *"the cleanest glass-ui consumer posture in the constellation"*, and this leaf honours it exactly.
**Falsifier** (run): any `@mkbabb/glass-ui/dist/…` or `/src/…` specifier, or a pre-4.0.0 tier name (`glass-scrubber` et al.) used as a live selector rather than prose. Zero of each.

### C-S3 — Declining `keyframes.js` here was the right call, and the A.W3.d token migration was done properly

All six enter/leave transitions (`:225-236`, `:359-395`) are declarative CSS on tokenised easings — no JS animation engine imported for a leaf that needs none, and interruptible by construction. The migration from raw cubic-bezier to canonical tokens is recorded **at the site**, three times (`:224`, `:363`, and the matching pattern at `PaperView.vue:511`, `MobileFloatingToc.vue:381`, `FullscreenViewer.vue:230`) — source-resident provenance, which is the standard the rest of the tree follows.
**Falsifier** (run): a token that does not resolve — all five resolve in `scheme-motion.css`. **Blunted, and I say so:** every one of these six transitions currently sits inside a dead rule (C-B1), so the *design* is right and the *effect* is nil. The superlative is for the choice, not the current behaviour.

### C-S4 — The search index is genuinely well-built

`paperSearchIndex.ts:38-45` and `:271-283` pre-lowercase every searchable field **once** at index-build time into `_lc`, and `scoreEntry:171-177` reads only `_lc` — so no per-keystroke `toLowerCase()` ever touches the corpus (the only two `toLowerCase()` calls on a hot path are on the *query*: `searchIndex:203`, `highlightFuzzy:38`, both O(query)). Field weights are explicit and ordered (18/12/10/6/3, `:171-177`); the scorer's bonus table is documented at `:61-68` and matches the implementation line-for-line at `:88-114`; multi-token AND semantics are stated at `:136-140` and implemented exactly at `:149-153`. The whole module is pure and Vue-free by declaration (`:3`) and in fact.
**Falsifier** (run): a per-query `toLowerCase()` or `stripLatex()` over index text — none; both strip functions are build-time only (`:249-255`, called from `:305`, `:328`, `:339`, `:364`, `:384`). This is the part of the leaf that deserves to survive a re-home onto `useFuzzySearch` — carry the weights and the bonus table, not the container.

---

## §8 · Falsifier index — what is proven where

| Claim class | Proven by | Residual |
|---|---|---|
| C-B1 rule-matching | `@vue/compiler-sfc` compile of the actual file + `vue@3.5.38` scope-id probe + child `<style>` count + cross-tree class grep + `git show ffba307` | Visual end-state → SS-13 |
| C-B2 mount analysis | Template + CSS + IntersectionObserver-target reading across 4 files | Live `.search-modal` DOM count → SS-13 |
| C-B3 primitive availability | Node probe of installed `glass-ui@4.0.0` `exports`; lane-frontend §3 import census; aria grep = 0 | Focus-trap behaviour → SS-13 |
| C-M1..M7, C-N1..N8 | Direct source reading + grep, all with line provenance | C-N1 astral instance → SS-13 |
| C-I2, C-I3 | Direct source reading | — |
| C-Z1, C-Z2 | Exhaustive greps over `components/paper/` | — |
| C-S1..S4 | Each falsifier run and reported above | C-S3 blunted by C-B1 (stated) |

**Corpus rows cited:** lane-frontend §1 (build/pins), §3 (glass-ui import census, tier-class census), §4 (`PaperSearch` 🟡 candidate-shadow row — **upgraded** here), §5 (value.js/keyframes break surface, the tilde deadlock); intake `lane-fourier-r3-r6.md` **R3-11**, **R3-12**, **X-6** (Teleport sites and the duplicated instance record — **extended**, not contradicted), **R6-8** and **X-10** (45-operation surface — recorded as a measured zero for this leaf).

**No contradiction of the hitherto corpus was found.** Two rows are widened: lane-frontend §4's candidate-shadow row (C-B3) and the intake's R3-11 registry-join carry (C-B2).

claude-opus-5[1m] (served model id)

# Challenge · `PaperSearchDropdown` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/search/PaperSearchDropdown.vue` (70 lines)

**Read whole, read-only — the complete import closure:**
`search/usePaperSearch.ts` (108, type-only import at :4 but the runtime prop is its return value) ·
`search/searchHelpers.ts` (74, value import at :5) ·
`search/paperSearchIndex.ts` (401, transitive via searchHelpers:8-9) ·
`@mkbabb/glass-ui/button` (:3, resolved 4.0.0) ·
`@mkbabb/latex-paper` type surface (`dist/flattenPaperSections-CN98CCOQ.d.ts:92-98`).

**Read for consumer/contract context (not challenged here):** `paper/PaperSearch.vue` (397 — the host, and the owner of every style hook this component names) · `paper/PaperView.vue:111,113,320,335` (the sole `usePaperSearch()` call and both mount sites) · `paper/PaperSidebar.vue:51,63-110,130-150` · `paper/MobileFloatingToc.vue:107,111` · `search/PaperSearchModal.vue` (the duplicate).

**Pins** `vue` `^3.5.38` → resolved **3.5.38** (`web/node_modules/vue/package.json`) · `@mkbabb/glass-ui` `^4.0.0` → resolved 4.0.0 · fourier HEAD `cd26c65` per CENSUS §2 C-1.

**Version audited: the WORKING TREE, not HEAD.** This file is one of the 28 pre-existing dirty paths (CENSUS §1). `git diff` on it is exactly one line — `:39` `glass-elevated` → `glass-floating`, the M.W1 rename sweep. Line numbering is unchanged from HEAD (1 insertion, 1 deletion, same line). The dirty state predates this lane (mtime `Jun 17 22:07`); **this lane wrote nothing to `fourier-analysis`** — `git status --porcelain | wc -l` → 28 before and after.

**No browser tooling.** Every claim below is static, source-derived, or **executed against the real transpiled module**. Three findings carry machine-produced falsifier output (§A). Livable-only consequences are marked `UNPROVEN-NEEDS-LIVE` (SS-13).

**Ledger — 28 defects · 3 BLOCKER · 9 MAJOR · 13 MINOR · 3 INFO · 5 superlatives.**

---

## §0 · Verdict

The component is **DEFECTIVE**, and the tree does not exculpate it.

Its 70 lines are, in isolation, close to well-made — the watcher guard is right, the DOM query is instance-local, the `v-html` sink is genuinely safe. But it fails on three structural counts that the LIBRARY axis owns:

1. **It cannot be styled by the only stylesheet that describes it.** Its root is a two-element Fragment, and Vue 3.5's `setScopeId` inherits a parent scope id **only** into a child's *single* root vnode. Six class hooks — `paper-search-results`, `-result`, `-badge`, `-number`, `-label`, `-backdrop` — name rules that exist in `PaperSearch.vue`'s `<style scoped>` and match **nothing in the DOM**. The D lane found the stylesheet-side crater (`PaperSearch/challenge-D-design.md` D-1, BLOCKER, "330 of 356 style lines are dead code"). **The L axis owns the cause: the fragment root is this component's code, and it is gratuitous.** I re-proved the mechanism independently and more strongly — by running `@vue/compiler-sfc` over the file (§A.1) — because a claim this large should not rest on prose.
2. **The data it renders is silently wrong.** Its sole data source, `search.results`, is produced by a module-global cache that narrows each query from the previous query's *truncated* top-30. I executed the real module: **typing `c` before `co` deletes the only entry that matches `co`** (§A.2). That is live, today, one paper, one user, no concurrency.
3. **It renders where it cannot be seen.** `PaperView.vue:335` mounts `PaperSidebar` unconditionally, and `PaperSidebar.vue:132-135` hides it with `display: none` below 1024 px. Vue still renders. Every mobile keystroke therefore instantiates 30 glass-ui `Button` components and runs 30 `highlightFuzzy` passes into a subtree with no layout box.

The three superlatives in §8 are real and I want them on the record: this component does two things *better* than its own sibling, and the escaping discipline in `highlightFuzzy` survived a deliberate attempt to break it.

**Overlap discipline.** L-1 corroborates D-1 (same mechanism, independent proof, different owner). Everything else in this file is disjoint from the D lane. Where I touch the adjudicated Codex intake I cite the row id; §6 **contradicts** a naive application of **R5-7**.

---

## §A · Executed falsifiers

Three claims below are not arguments — they are program output. Method: `web/node_modules/.bin/tsc` transpiled `paperSearchIndex.ts` and `searchHelpers.ts` (unmodified sources) into a scratch directory; probes imported the emitted modules. **No file in `fourier-analysis` was written, moved, or modified.**

### A.1 · The scope-id proof (`@vue/compiler-sfc` output)

`sfc.parse()` on the target reports `styles: 0, scoped: false` → the SFC emits **no `__scopeId`**, so `currentScopeId` is `null` for every vnode it creates (`runtime-core.cjs.js:677`, `:7631`). The compiled render function's root is:

```
return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createCommentVNode(" Inline dropdown (non-expanded) "),
    _createVNode(_Transition, { name: "search-dropdown" }, { … }),
    _createCommentVNode(" Backdrop for inline dropdown (floating variant only) "),
    (_ctx.variant === 'floating' && …) ? (_openBlock(), _createElementBlock("div", { … })) : …
], 64 /* STABLE_FRAGMENT */))
```

Patch flag **64**, not 2048. `setScopeId` (`web/node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:5676-5701`) only walks up to the parent when `subTree.patchFlag & 2048` (dev single-root-plus-comments) *or* `vnode === subTree`. `64 & 2048 === 0`, and neither element vnode **is** the Fragment. Parent scope id: **not inherited, by either route.**

Contrast, same probe, `PaperSearchInput.vue` → `_createElementBlock("div", _hoisted_1 /* class: "paper-search-input-wrap" */, …)` — a **single** root, so it *does* inherit, which is exactly why `.paper-search-input-wrap` (PaperSearch.vue:47-60) is one of the few surviving rules. The difference between the two siblings is root arity and nothing else.

### A.2 · Recall destruction (real `searchIndex`, real cache)

36 synthetic entries: 35 decoys labelled `ca…c9` (all match `c`, none contains `o`), plus one entry `X` labelled `co` — the **only** entry that can match `co`. `X` is appended last so it loses every score tie (all 36 tie at 11.9 for `c`; `Array.prototype.sort` is stable; `slice(0, 30)` drops it).

```
index size: 36
TRUTH  (cold 'co')      -> [ 'X' ]
TYPED  'c' n= 30  X present? false
TYPED  'c' then 'co'    -> []
RECALL LOSS: CONFIRMED
```

Searching `co` cold returns the right answer. Typing `c` first returns **nothing**. `paperSearchIndex.ts:220-227` narrows `candidates` to `_cache.get(prefix)` — a set already truncated to 30 at `:239` — so any entry outside the previous prefix's top-30 is unreachable forever, and the loss compounds per keystroke.

### A.3 · Cross-index contamination + highlight index-space

```
C indexA 'co' -> [ 'X' ] | indexB 'co' -> [ 'X' ] | contaminated: CONFIRMED
```

`_cache` (`paperSearchIndex.ts:196`) is module-global and keyed by the query string alone; `searchIndex(otherIndex, "co")` returned the *first* index's row.

```
ASCII control                       q="our"  marked="our"   ok=YES
astral char (𝓕, 2 UTF-16 units)     q="our"  marked="uri"   ok=NO
astral char, later match            q="ser"  marked="eri"   ok=NO
U+0130 (lowercases to 2 units)      q="stan" marked="tanb"  ok=NO
emoji before match                  q="bc"   marked="c"     ok=NO
```

`highlightFuzzy` marks the **wrong characters** whenever the label leaves the length-stable BMP subset (§L-16 — and see its falsifier: today's paper contains **zero** astral code points, so this is latent, not live).

---

## §1 · BLOCKERS

### L-1 · BLOCKER · The two-root Fragment makes the component un-styleable by the only stylesheet that describes it

**Provenance** `PaperSearchDropdown.vue:35` (root 1, `<Transition>`) and `:65` (root 2, `div.paper-search-backdrop`); zero `<style>` blocks in the file; against `PaperSearch.vue:41` `<style scoped>` and its rules at `:103-116` (`.paper-search-results`), `:118-135` (`.paper-search-result`), `:137-166` (`.paper-search-badge`), `:168-172` (`.paper-search-number`), `:174-190` (`.paper-search-label` + `:deep(mark)`), `:192-196` (`.paper-search-backdrop`), `:215-221` (`.paper-search--floating .paper-search-results`).

**Mechanism** §A.1 — proven by compiling the SFC and by reading `setScopeId` in the *installed* runtime, not from memory.

**Consequence, live.** All six classes named in this file are inert. Concretely, today, on a ≥1024 px viewport: `.paper-search-results` loses `position:absolute` / `top` / `left` / `right` / `z-index` / `max-height:50vh` / `overflow-y:auto` / border / shadow / padding, so the dropdown renders as a **static, in-flow block inside the sticky TOC `<nav>`** (`PaperSidebar.vue:50-51`) and shoves the entire table of contents down by up to 30 unstyled rows. `.paper-search-backdrop` loses `position:fixed; inset:0` and becomes a zero-height empty div — the click-away shim at `:68` **cannot be hit**. `.paper-search-label :deep(mark)` never matches, so highlight runs render with the UA default `mark` styling.

**Falsifier (discharged).** (a) *Is the CSS supplied globally instead?* No — `grep -rn "paper-search"` across the whole repo excluding `web/src/components/paper/` returns **zero** matches; `web/src/style.css` is the only global sheet and contains none of these selectors. (b) *Does `filterSingleRoot` rescue it in dev?* No — that path needs patch flag 2048, which the compiler emits only when exactly one non-comment root exists; here there are two, and the emitted flag is 64 (§A.1). (c) *Does `glass-floating` (`:39`) cover the gap?* Partially and misleadingly — it is a real global glass-ui utility (also used at `MobileFloatingToc.vue:133`, `EquationView.vue:261`) and it supplies surface/blur, but it supplies **no positioning, no `max-height`, no `overflow`**, which are the load-bearing rules.

**Ownership note.** `PaperSearch/challenge-D-design.md` **D-1** reports the same mechanism from the stylesheet side and is correct. The L-axis contribution is (i) an independent, machine-produced proof, and (ii) the assignment of cause: the parent's stylesheet is not "orphaned by accident" — **this file's root arity is what orphans it**, and the arity is discretionary. The backdrop does not need to be a second root (it can sit inside the transitioned wrapper, or `Teleport` to body — which it arguably should, see L-3).

---

### L-2 · BLOCKER · Prefix narrowing from a truncated result set silently destroys recall

**Provenance** `paperSearchIndex.ts:220-227` (`candidates = prefixResults`) against `:239` (`scored.slice(0, maxResults)`) and `:240` (`_cache.set(q, results)` — the *truncated* list is what gets cached). Reached from this component at `PaperSearchDropdown.vue:42` (`v-for … in search.results.value`) via `usePaperSearch.ts:35-36`.

**Failure scenario (executed, §A.2).** A 36-entry index in which exactly one entry matches `co`. `searchIndex(index,"co")` cold → `['X']`. `searchIndex(index,"c")` then `searchIndex(index,"co")` → `[]`. The user typed one more character and the answer vanished.

**Why it is live and not theoretical.** The AND-token subsequence filter *is* monotone in query length (anything matching `co` also matches `c`), which is presumably the intuition behind the optimisation — but the **ranking is not**. A row that is rank 200 for `c` can be rank 1 for `co`. The cache stores rank-truncated output and feeds it back as the candidate pool, so the truncation is applied recursively, once per keystroke. On a 401-line index over a 244 KB paper the real index is far larger than 30, so the effect is not an edge case; it is the normal typing path.

**Falsifier (discharged).** (a) *Does the 120 ms debounce skip intermediate prefixes?* It skips *some*, but `usePaperSearch.ts:28-33` fires on every pause > 120 ms, and human typing produces many such pauses; more decisively, the very first character always caches a truncated set, so **any** two-character query already narrows from a 30-row pool. (b) *Does multi-word input disengage it?* Yes, accidentally — `q` is trimmed at `:203`, so after a space the prefix key misses and `candidates` falls back to the full index. That narrows the blast radius to single-token queries, which are the common case. (c) *Could a larger `maxResults` hide it?* The call site passes 30 (`usePaperSearch.ts:36`); the defect scales with the gap between the true match set and 30, so a larger cap reduces frequency without curing the mechanism.

---

### L-3 · BLOCKER (LATENT-ON-REPAIR) · The backdrop is a stacking trap: curing L-1 makes every result click dismiss instead of select

**Provenance** `PaperSearchDropdown.vue:65-69` (backdrop, DOM-order **after** the results at `:36-61`) against `PaperSearch.vue:108` (`.paper-search-results { z-index: var(--z-bar) }`) and `:192-196` (`.paper-search-backdrop { position: fixed; inset: 0; z-index: var(--z-bar) }`) — **identical** z-index — inside `.paper-search { position: relative }` (`:43-45`) which sets **no** `z-index` and therefore creates **no stacking context**.

**Failure scenario.** The instant someone repairs L-1 the obvious way (give this file its own `<style scoped>`, or wrap the rules in `:deep()`), both roots become positioned participants in the *same* stacking context at the *same* z-index. Painting order then falls to tree order, and the backdrop is later. A full-viewport `position:fixed` element paints over the dropdown; `@click="search.close()"` (`:68`) swallows every click intended for `@click="search.selectResult(r)"` (`:47`). Result: on `variant="floating"`, the search becomes **unusable by mouse/touch** — precisely the variant that is mobile-only (`MobileFloatingToc.vue:107` `.floating-toc lg:hidden`, `:111`).

**Why BLOCKER and not MINOR.** The D lane already identified two repair traps (D-16 focus indicator, D-8 highlight) where the naïve fix regresses. This is the third and the most severe, because it converts a cosmetic failure into a functional one, and because L-1's repair is the *first* thing F.W1 will do. It must be repaired *together* with L-1, never after.

**Falsifier (discharged).** (a) *Is `--z-bar` maybe unequal at the two sites?* Both sites read the same custom property with no local override anywhere in `PaperSearch.vue`; the token is used identically at `GallerySearchBar.vue:169` and `EquationView.vue:396`. (b) *Does `.paper-search` establish a stacking context after all?* `position: relative` with `z-index: auto` does not; the file sets no `opacity`, `transform`, `filter`, `isolation`, `will-change`, or `contain` on `.paper-search`. (c) *Does the sibling `MobileFloatingToc` precedent contradict me?* No — it **confirms** the correct pattern: `MobileFloatingToc.vue:293-298` gives its dropdown `z-index: 2` and `:309-312` gives its backdrop `z-index: 1` (recorded in `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:3090`). The same author solved the same problem correctly one file away. `UNPROVEN-NEEDS-LIVE` for the exact hit-test only; the stacking rule itself is CSS spec, not observation.

---

## §2 · MAJOR

### L-4 · MAJOR · `variant="sidebar"` has no dismissal path at all

**Provenance** `:66` — the backdrop's predicate opens with `variant === 'floating'`. `usePaperSearch.ts:48-53` (`close()`) is reachable only from `Escape` (`:83-89`), from selecting a result (`:43-46`), from the clear button (`PaperSearchInput.vue:63`), and from the mobile close button. `PaperSearchInput.vue:45` sets `search.isOpen.value = true` on `@focus`; **nothing anywhere sets it false on blur.**

**Failure scenario.** Desktop user clicks the sidebar search box, types `f`, then clicks into the paper to read. The dropdown stays open — permanently, until Escape — and (per L-1) it is an in-flow block, so it keeps the table of contents pushed down while the user reads. There is no pointer gesture that dismisses it.

**Falsifier (discharged).** *Does something else close it — a global listener, `onClickOutside`, a route guard?* `grep` for `onClickOutside` / `@blur` / `document.addEventListener("click"` across `paper/` returns nothing that touches `search.isOpen`; `PaperView.vue:113-118`'s only global key handler *opens*. The single `@vueuse/core` composable in the family is unrelated.

### L-5 · MAJOR · The component renders its full result list into a `display:none` subtree on every mobile keystroke

**Provenance** `PaperView.vue:335` mounts `PaperSidebar` with **no** `v-if`; `PaperSidebar.vue:132-135` `.paper-sidebar { display: none }` with `display:block` restored only at `@media (min-width: 1024px)` (`:138-140`). `PaperSidebar.vue:51` renders `<PaperSearch variant="sidebar">` → this component. `isOpen`/`results` are the *shared* state from the single `usePaperSearch()` at `PaperView.vue:111`, also handed to `MobileFloatingToc` (`PaperView.vue:328`).

**Failure scenario.** Below 1024 px the user opens the mobile floating search and types. `search.isOpen` is global, so **this** instance's `v-if` at `:37` is also true: Vue instantiates up to 30 glass-ui `Button` components (`:41`, each a full SFC with its own setup + slot), evaluates 30 `highlightFuzzy` calls (`:58`) and 30 `TYPE_LABELS` lookups, then runs the `:19-28` watcher and calls `scrollIntoView` on an element with no layout box — all inside a `display:none` ancestor, all discarded. `display:none` suppresses layout and paint; it does **not** suppress Vue rendering.

**Second head.** `PaperView.vue:113-118` binds ⌘/Ctrl-K to `search.open()`. Below 1024 px that sets `isOpen` while the mobile host's `PaperSearch` is behind `v-if="searchActive"` (`MobileFloatingToc.vue:108-111`), which ⌘K does not set. **The documented shortcut opens a dropdown that only the hidden sidebar instance renders** — visible result: nothing happens.

**Falsifier (discharged).** (a) *Is the sidebar `v-if`'d off on mobile?* No — I read `PaperView.vue:335` and its enclosing `.paper-grid` block (`:553-565`); the grid changes `grid-template-columns` at 1024 px, the sidebar's own scoped rule does the hiding, and hiding is `display:none`, not unmounting. (b) *Does `MobileFloatingToc` double this on desktop?* Not usually — it is `v-if="!mobileTocVisible"` (`PaperView.vue:320`) *and* `lg:hidden` *and* its `PaperSearch` is behind `searchActive`; so the second live instance is the mobile-only case. The waste is one-directional (sidebar renders on mobile), not symmetric. (c) *Is 30 the real ceiling?* Yes — `usePaperSearch.ts:36` passes `30`.

### L-6 · MAJOR · `_cache` is module-global mutable state with no owner, no disposal, and no index identity

**Provenance** `paperSearchIndex.ts:196` (`let _cache: Map<string, SearchResult[]> = new Map()`), `:205` (cleared only on an empty query), `:214` (cleared only above 200 entries), `:240` (written on every query).

**Failure scenario — retention (live).** Route away from `/paper` to `/gallery`. Nothing calls `close()`, so no empty-query clear runs; the component and the composable are disposed but the module is not. The map retains up to 200 × 30 = 6 000 `SearchResult` objects, each a full spread of a `SearchEntry` (`:234`) carrying `plainText` up to 500 chars *and* a `_lc.plain` lowercase copy — a multi-megabyte ceiling held for the process lifetime, referencing an index that has been rebuilt (`usePaperSearch.ts:18` runs again on remount).

**Failure scenario — contamination (latent, executed §A.3).** The key is the query string alone. Two indices, same query → the second caller receives the first's rows.

**Falsifier (discharged).** (a) *Is contamination reachable today?* **No.** `grep -rn "usePaperSearch"` finds exactly one call (`PaperView.vue:111`), so there is one index per page. I am reporting the mechanism as proven and the trigger as absent — the retention half is live regardless. (b) *Does the 200-entry cap make retention immaterial?* It bounds it; it does not release it, and the bound is reached by ~20 ordinary searches. (c) *Is 200 ever hit in one session?* Each debounced prefix writes a key, so a 10-character query writes up to 10.

### L-7 · MAJOR · The debounce timer is never cleared on scope disposal

**Provenance** `usePaperSearch.ts:27-33` — `let debounceTimer` + `setTimeout` inside a `watch`, with `clearTimeout` only on the *next* keystroke. No `onScopeDispose`, no `onUnmounted`, no `useTimeoutFn`/`refDebounced` from `@vueuse/core` (which **is** a direct dependency, `web/package.json:19`).

**Failure scenario.** Unmount the paper route within 120 ms of a keystroke — routine, because `close()` (`:48-53`) *writes* `query.value = ""` and that write itself schedules a timer. The pending callback fires after disposal, writes `debouncedQuery`, and keeps the closure — hence `query`, `results`, and the entire `index` — alive until it runs.

**Falsifier (discharged).** *Is a post-dispose ref write harmful in Vue 3?* Not in itself — Vue 3 tolerates it silently, which is exactly why this is MAJOR-not-BLOCKER and exactly why it will never be noticed. The teardown omission is the defect; the escaped retention window is the consequence.

### L-8 · MAJOR · `@mouseenter` writes selection and the watcher scrolls — the two fight each other

**Provenance** `:48` (`@mouseenter="search.selectedIndex.value = i"`) against `:19-27` (watch `selectedIndex` → `nextTick` → `scrollIntoView`).

**Failure scenario.** ArrowDown scrolls the list under a stationary cursor; the element under the pointer changes; the browser dispatches `mouseenter` on the newly-arrived row; that write sets `selectedIndex` back to the hovered index; the watcher fires again and scrolls again. Keyboard navigation is captured by a stationary mouse. The canonical cure is a pointer-moved latch (ignore hover until a real `pointermove`); none exists here.

**Falsifier (partially discharged).** The write-and-rescroll cycle is proven by reading the two sites. Whether a given engine dispatches `mouseenter` on scroll-without-pointer-movement is engine- and compositor-dependent — `UNPROVEN-NEEDS-LIVE` (SS-13). Note also that this is currently masked by L-1: with `overflow-y` dead the container does not scroll at all, so this is a second **latent-on-repair** finding, sequenced with L-1/L-3.

### L-9 · MAJOR · Container scroll position is never reset when the query changes

**Provenance** `:19-20` — the watcher's source is `selectedIndex` **only**. `usePaperSearch.ts:39-41` resets `selectedIndex.value = 0` when `results` change; if it was already 0, the ref does not change and the watcher does not fire.

**Failure scenario.** User arrows down to row 25 (container scrolled), then edits the query. New results arrive, `selectedIndex` is already 0 so no watcher fires, and the container keeps its old `scrollTop` — the selected row 0 sits off-screen above the fold and the user sees an arbitrary middle slice of the new results. Watching `results` (or `[results, selectedIndex]`) is the fix.

**Falsifier (partially discharged).** Reading the two sources proves the watcher cannot fire. Whether the browser's scroll anchoring masks it depends on how far the content height moves — `UNPROVEN-NEEDS-LIVE`. Latent behind L-1 (no scroll container today).

### L-10 · MAJOR · The highlight is recomputed per row per render, and the `matches` the index already produced is dead payload

**Provenance** `:58` `v-html="highlightFuzzy(resultLabel(r), search.query.value)"` — an unmemoised call in the render function. `searchHelpers.ts:38-47` re-tokenises the query and re-runs `fuzzyMatch` per token per row. Meanwhile `paperSearchIndex.ts:49-51` declares `SearchResult.matches` — *"Matched character indices into the display label, for highlighting"* — populated at `:185` and `:234`.

**Failure scenario.** Every mutation of `selectedIndex` — i.e. **every arrow key and every mouse move across the list** — re-renders the `v-for` and re-runs 30 × *tokens* fuzzy matches plus 30 full string rebuilds, on the main thread. On mobile it is 60 (L-5). This competes directly with the paper's reactive-redraw work and with the two rAF canvas paths documented in the census (§7).

**Second head — the field is dead app-wide.** `bestMatches` is assigned only when the winning field is `_lc.label` (`:185`), so it is `[]` for every equation, proof, code, and section-body hit; and `grep -rn "\.matches\b" web/src` shows **no consumer anywhere** reads `r.matches` (the only other hits are `window.matchMedia(...).matches`). The index computes, spreads, and ships a documented field that nothing consumes, while the component pays to recompute the same thing at render time.

**Falsifier (discharged).** (a) *Could Vue's caching skip it?* No — `_hoisted_4 = ["innerHTML"]` with patch flag 8 in the compiled output (§A.1): `innerHTML` is a dynamic prop, re-evaluated each patch. (b) *Would consuming `r.matches` actually work?* Only after fixing `:185` to key on the *display* label rather than `_lc.label`, which is the real repair; I am not claiming a one-line swap.

### L-11 · MAJOR · The result row is duplicated verbatim in `PaperSearchModal.vue`

**Provenance** `PaperSearchDropdown.vue:41-60` against `PaperSearchModal.vue:83-102` — 18 lines, byte-identical except the `:key` prefix (`modal-`) and one extra class. Both files also duplicate the same import triple (`Dropdown:5` / `Modal:6`) and the same `selectedIndex → nextTick → scrollIntoView` watcher (`Dropdown:19-28` / `Modal:27-33`) with inverted `isExpanded` guards.

**Failure scenario.** The badge/number/label contract now has two authorities. Any change — a new `TYPE_LABELS` key, an `aria` attribute, the L-10 memoisation, the L-16 highlight fix — must be made twice or the two views of the *same state object* diverge. They already diverge on the empty state (L-22).

**Falsifier (discharged).** *Is the divergence intentional (different affordances)?* The only differences are cosmetic and already expressed in CSS (`PaperSearch.vue:304-319` `.search-modal-result`), so a shared `PaperSearchResultRow.vue` taking `(result, selected)` and emitting `select`/`hover` loses nothing. Colocation is right (`search/`), granularity is wrong.

### L-12 · MAJOR · The declared `select` emit can never fire — a false public contract in three components

**Provenance** `:12-14` `const emit = defineEmits<{ select: [id: string] }>()` — `emit` is referenced **nowhere** in the file. Identical dead declaration at `PaperSearchModal.vue:12-14`. The host does not bind it (`PaperSearch.vue:31-34` passes only `:search` and `:variant`) and does not re-emit it.

**Failure scenario.** A consumer reads the component's public surface, writes `<PaperSearchDropdown @select="onSelect">`, and the handler never fires — because selection is routed by side-effect through `search.selectResult(r)` (`:47`) into the composable's `navigateTo`. The declared interface and the real one disagree, silently, in the direction that costs a debugging session.

**Falsifier (discharged).** *Does any gate catch it?* No. `web/package.json:6-12` has no lint script and the repo has **no** eslint config; the only static gate is `vue-tsc -b`, and `web/tsconfig.json` sets neither `noUnusedLocals` nor `noUnusedParameters`. This ships.

---

## §3 · MINOR

**L-13 · `defineExpose({ resultsRef })` (`:30`) is never consumed.** `PaperSearch.vue:13-19` exposes only `focus` and holds a ref to `PaperSearchInput` alone; no ancestor reads `resultsRef`. It also exposes a value that is `null` for most of the component's life (`v-if` at `:37`), so any future consumer inherits a nullable contract with no documentation. *Falsifier:* `grep -rn "resultsRef" web/src` → declaration and use inside this file only.

**L-14 · `TYPE_LABELS: Record<string, string>` (`searchHelpers.ts:8`) is the wrong type.** `SearchEntry["type"]` is a closed 13-member union (`paperSearchIndex.ts:19-33`) and `TYPE_LABELS` currently supplies exactly those 13 keys — so `Record<SearchEntry["type"], string>` would compile today *and* would force the compiler to demand a label whenever the union grows. The widened form makes `TYPE_LABELS[r.type]` type as `string` (no `noUncheckedIndexedAccess` in `web/tsconfig.json`), which renders the `?? r.type` guard at `:51` **typed-dead** while leaving it **runtime-live** — see L-15. *Falsifier:* I counted both lists; they match at 13/13 today, so nothing is broken now — the defect is that nothing will *report* it when it breaks.

**L-15 · The `as SearchEntry["type"]` cast (`paperSearchIndex.ts:316`) is a no-op whose only effect is to disable a future error.** `PaperTheoremData["type"]` is `"theorem" | "definition" | "lemma" | "proposition" | "corollary" | "aside" | "example"` (`latex-paper/dist/flattenPaperSections-CN98CCOQ.d.ts:93`) — a strict subset of the target union, so the assignment is already legal without the assertion. If latex-paper adds `"remark"`, the cast swallows it, `TYPE_LABELS["remark"]` returns `undefined` at runtime (contra L-14's type), `?? r.type` renders the raw lowercase word in the badge, and `[data-type="remark"]` matches no colour rule. Delete the cast and the compiler catches it at upgrade time. *Falsifier:* I read the producer `.d.ts` to confirm the subset relation rather than assuming it.

**L-16 · `highlightFuzzy` mixes two index spaces.** `searchHelpers.ts:39-47` computes `matchSet` from `text.toLowerCase()` using `fuzzyMatch`'s **UTF-16 code-unit** indices; `:52-65` applies those indices to `[...text]`, a **code-point** array. Executed output in §A.3: astral characters shift every mark, and a length-changing case mapping (U+0130) shifts them too. *Falsifier (discharged, and it cuts against me):* I checked the actual corpus — `paper/fourier_paper.tex` (243 983 bytes) contains **0** astral code points and only `é`, `–`, `—`, all length-stable under `toLowerCase()`. **This defect is latent, not live.** It is reported because the census marks this family as a shadow of glass-ui `./search` + `useFuzzySearch` (`lane-frontend.md:438`), i.e. it is on a path to being reused against arbitrary text, and because `escapeHtml`/`highlightFuzzy` are exported from the public barrel (`index.ts:4`).

**L-17 · `:key` contains the loop index (`:43`), which defeats keying.** `` `${r.id}-${r.type}-${i}` `` guarantees a fresh key for every position, so no DOM node is ever reused across queries — 30 glass-ui `Button` components are destroyed and recreated per debounced keystroke. The index is there to paper over a real root cause: `paperSearchIndex.ts` mints duplicate ids by design (`:335` and `:350` both `id: sectionId` for code and proof entries; `:301` `id: block.id ?? block.anchorId ?? sectionId`). *Falsifier:* removing `i` without first making ids unique would produce genuine duplicate-key warnings — so the workaround is defensible; the **root cause** is the defect and it is not booked anywhere.

**L-18 · The three-clause predicate is duplicated between `:37` and `:66`** (the second adds a fourth clause). Two 100-character inline expressions that must stay in lockstep; a single `computed(() => …)` is the obvious cure and would also let L-3's repair gate both roots consistently.

**L-19 · `escapeHtml` (`searchHelpers.ts:72-74`) is exported from the barrel (`index.ts:4`) but is not attribute-safe** — it escapes `&`, `<`, `>` and not `"` or `'`. Correct for its one internal caller (element content only); a trap for the public name. *Falsifier:* I traced every call site — `searchHelpers.ts:35,49,61,64`, all content-position. No live defect; a mis-shaped public API.

**L-20 · `let _cache` (`paperSearchIndex.ts:196`) is never reassigned** — only `.clear()`, `.get()`, `.set()`, `.size`. `const` with the same annotation is correct and removes a false signal that the map is swappable (which is what a proper per-index cache would need).

**L-21 · `.is-selected` is queried out of the DOM (`:24`) for state Vue already owns.** The selected index is `props.search.selectedIndex.value`; the code round-trips through a class name it sets itself at `:46` and then finds by `querySelector`. This silently depends on glass-ui's `Button` forwarding `class` to a single root element; if that ever changes (or a wrapper appears), the query returns `null`, `?.` swallows it, and scroll-into-view stops working with **no error**. A `ref` array or `:data-index` lookup is both cheaper and observable.

**L-22 · No empty state.** `PaperSearchModal.vue:104-106` renders "No results"; this component renders nothing (`:37` requires `results.length > 0`) and, on `floating`, simultaneously drops its backdrop (`:66`). Two views of one state object disagree on what "zero results" means.

**L-23 · `buildSearchIndex` runs synchronously in setup** (`usePaperSearch.ts:18`, called at `PaperView.vue:111`). The full recursive walk of the paper (`paperSearchIndex.ts:369-401`) — including `stripHtml`/`stripLatex` regex passes and a `toLowerCase()` copy per entry (`:283-291`) — blocks the route's first render. The repo *has* a yield primitive for exactly this (`lib/scheduler.ts`, census `lane-frontend.md:568`) and does not use it here. *Falsifier:* size unmeasured without a live run — `UNPROVEN-NEEDS-LIVE` for the magnitude; the synchronicity is proven by reading.

**L-24 · `resultLabel` shows raw LaTeX for equations** (`searchHelpers.ts:26`, `r.rawTex.slice(0, 120)`), so an equation hit renders a `\frac{...}` blob in the dropdown label at `:58` — and every `slice(0, n)` in the index (`:120`/`:200`/`:300`/`:500`) is a UTF-16 slice that can bisect a surrogate pair.

**L-25 · Zero unit coverage for anything §A broke.** `web/package.json:6-12` has no `test` script and no vitest; the only gates are `vue-tsc -b` and 29 Playwright specs on one chromium project (census `lane-frontend.md` §0/§9). Both executed falsifiers (L-2, L-16) are ~15-line unit tests that would have failed on the day the code landed.

---

## §4 · INFO

**L-26 · Module size is Goldilocks-correct; the *family* is not.** 70 lines, one job, colocated with its state and helpers in `search/`. But the family is 832 LOC (`lane-frontend.md:153-165`) shadowing glass-ui's `./search` (present at both 4.0.0 and 7.0.0) plus `useFuzzySearch` — which the producer README explicitly labels *"the VSCode subsequence scorer — NO re-fork"* (`lane-frontend.md:438`). The scorer at `paperSearchIndex.ts:70-125` is that fork, and §A.2/§A.3 are the cost of having forked it.

**L-27 · The `fuzzyMatch` doc comment overstates the algorithm.** `paperSearchIndex.ts:55-69` advertises "VSCode-style"; the implementation is single-pass greedy first-occurrence (`:84-120`) with no backtracking, so it cannot find the higher-scoring alignment when an early match blocks a later run. Documentation/implementation mismatch, not a bug.

**L-28 · Prop shape: the component takes the whole composable return as a required prop.** `PaperSearchState = ReturnType<typeof usePaperSearch>` (`usePaperSearch.ts:108`) is a structural type derived from an implementation, so the prop contract silently changes whenever the composable changes; the component consumes 7 of its 11 members and forces `.value` at nine template sites because nested refs do not auto-unwrap inside a props object. `provide`/`inject` (the pattern this repo already uses for `CSS_COLOR_KEY`-style seams) or a narrowed prop set would make the dependency legible.

---

## §5 · The viz render path

The census is unambiguous: **WebGL/WebGPU are ABSENT from fourier** — `lane-frontend.md:27` (`grep -rn "webgl\|WebGL\|WEBGL" src/` → empty), corroborated at `:514` and folded into `CENSUS-2026-08-03.md §3a`. There are three Canvas2D surfaces (`lane-frontend.md:28`): `BasisCanvas.vue` (547) driven by *reactive* redraw off a store rAF clock (`:556`), `ConvergencePlot.vue` (410) with its own ungated rAF (`:558`), and `FrequencyGraph.vue` (247), watch-driven.

**This component touches none of them.** `/paper` mounts `PaperSidebar` → `PaperArticleWindow` (`PaperView.vue:13-15`); no canvas component appears in its import list. The dropdown's only contact with the viz architecture is **contention**, not coupling:

- L-10's per-render highlight (30–60 × tokens fuzzy passes per selection change) and L-23's synchronous index build occupy the same main thread as the reactive-redraw path. The census specifically notes that `lib/scheduler.ts` **excludes** the render loop from yielding because it is "already rAF-paced AND off-screen-gated" (`lane-frontend.md:568`) — that exclusion assumes the *non*-render work is chunked. This component's work is not.
- The dropdown is the one surface that must paint **above** whatever is beneath it, and it does so with `z-index: var(--z-bar)` — the same rung `EquationView.vue:396,433` uses for canvas-overlay popovers. Once L-1 is repaired the two will be peers on the same rung with no ordering law, which is the generalised form of L-3.

No canvas/WebGL defect is charged to this component. Recording the negative result explicitly so the F.W4 roll-up does not have to re-derive it.

---

## §6 · R5-7 (native-template-loop invisibility) — **does not apply here**

The adjudicated intake (`audit/codex-provenance/intakes/lane-fourier-r3-r6.md`, row **R5-7**, verdict *TRUE / ADOPT-AS-FACT + CARRY → F.W4*) establishes that the Codex deriver formed loop evidence only from **registered component callsites**, so `instance.loop.paper-sidebar` derived to a literally empty `[]` while `PaperSidebar.vue`'s three nested native `<li v-for>` loops (live: `:65`, `:87`, `:105`) rendered the entire table of contents. R6-5/R6-6 cured it with a `NATIVE_TEMPLATE_LOOP` family.

**I checked whether this component sits inside that blind spot. It does not, on two independent counts:**

1. **Its own loop is over a component.** `:41-42` is `v-for` on `<Button>` — a resolved component vnode (`_createBlock(_component_Button, …)` in the §A.1 output), which is exactly the callsite kind the R5-7-era deriver *did* register (contrast the populated sibling leaf `instance.loop.presets`, keyed `callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0`). This loop was always visible.
2. **It is not nested inside the sidebar's native loops.** `PaperSidebar.vue:51` places `<PaperSearch>` as a sibling **above** the `<ol class="sidebar-list">` that opens at `:64`; the `<li v-for>`s begin at `:65`. Nothing in this component's ancestry passes through an `<li v-for>`.

**The inverse blind spot, however, does apply, and is worth carrying to F.W4.** Each iteration of this loop contains **three native `<span>` elements** (`:50`, `:53`, `:56`). A denominator keyed to component callsites counts *one* `Button` callsite (fanning to N instances) and **zero** of the 3N spans — including the `v-html` sink at `:58`, which is the single most audit-relevant element in the file. R6's `NATIVE_TEMPLATE_LOOP` family cures the *loop* case; it does not obviously cure *native elements inside a component loop*. Any per-component element census that reports "3 native elements" for this file will be wrong by a factor of 30.

**Falsifier (discharged).** I read `PaperSidebar.vue:40-110` in full to establish the sibling relationship rather than inferring it from line numbers, and I read the compiled render output to establish that `Button` resolves as a component rather than being inlined.

---

## §7 · Corpus reconciliation

| Corpus row | This challenge |
|---|---|
| `PaperSearch/challenge-D-design.md` **D-1** (BLOCKER, "330 of 356 style lines are dead code"; child-root table) | **CORROBORATED, independently and more strongly** (§A.1 compiles the SFC and reads the installed `setScopeId`). L-1 re-homes the **cause** on the L axis: the fragment root is this file's discretionary code. |
| D lane's repair-trap discipline (D-16, D-8: "a naïve repair is a regression") | **EXTENDED** — L-3 (backdrop stacking), L-8 (hover/scroll loop) and L-9 (stale scrollTop) are three further latent-on-repair defects that fire the moment L-1 is cured. |
| `lane-frontend.md:153-165` — file inventory, `PaperSearchDropdown.vue` at 70 lines | **AGREE, exact.** |
| `lane-frontend.md:438` — PaperSearch family (832 LOC) a **CANDIDATE shadow** of glass-ui `./search` + `useFuzzySearch` ("NO re-fork") | **STRENGTHENED from candidate to evidenced.** §A.2 and §A.3 are two independent correctness defects inside the fork. The convergence case no longer rests on LOC alone. |
| `lane-frontend.md:27-28`, `:514`, CENSUS §3a — WebGL/WebGPU ABSENT, three Canvas2D surfaces | **AGREE**; §5 records the negative result for this component. |
| `lane-frontend.md:568` — `scheduler.ts` deliberately excludes the render loop from yielding | **CONSISTENT**, and §5 notes L-10/L-23 violate that exclusion's premise. |
| `lane-frontend.md` §0/§9 — vitest ABSENT, gates = `vue-tsc` + 29 Playwright | **AGREE, and load-bearing** — L-25; both executed falsifiers are trivial unit tests. |
| intake **R5-7** (TRUE / ADOPT-AS-FACT, carry F.W4) — component-callsite loop evidence blind to native element loops | **DOES NOT APPLY to this component** (§6, two independent grounds). **Contradiction stated explicitly** so F.W4 does not tag it. The *inverse* case (native `<span>`s inside a component loop) does apply and is newly booked. |
| CENSUS §2 C-1 — fourier substrate is `cd26c65`, not `14d83356` | **ADOPTED** as this file's pin. |

---

## §8 · Superlatives (L-18 runs both ways)

**S-1 · `highlightFuzzy` escapes on every return path — I tried to break it and could not.** All four exits escape: `searchHelpers.ts:35` (empty query / empty text), `:49` (no matches), `:61` (matched run), `:64` (unmatched char). Combined with the `stripHtml` pre-pass on titles and captions (`paperSearchIndex.ts:329`, `:339`, `:384`), the `v-html` sink at `:58` has no injection path through the label. For a `v-html` in a search dropdown — the classic XSS shape — this is disciplined work, and it is the *only* `v-html` in the family with that property (`PaperSidebar.vue:80,100` render `renderTitle(...)` unescaped). *Falsifier attempted:* a `<script>` in a section title survives `stripHtml` as inert text and is escaped again on output; `&` is replaced before `<` and `>`, so no double-unescape window.

**S-2 · The DOM query is instance-local, and the sibling's is not.** `:24` scopes to `resultsRef.value?.querySelector(...)`. `PaperSearchModal.vue:32` uses `document.querySelector(".search-modal-results")`. Because `PaperSearch` is mounted twice against one state object (`PaperSidebar.vue:51`, `MobileFloatingToc.vue:111`) and the modal `Teleport`s to `body`, the modal's global query resolves to whichever overlay is first in `body` — so one of the two modals scrolls the *other's* list. **This component is structurally immune to a bug its sibling has.** Same author, same session, better choice here.

**S-3 · The `isExpanded` guard is the correct half of a two-component mutual exclusion.** `:22` returns early when the modal owns selection; `PaperSearchModal.vue:30` returns early when it does not. Two independent watchers on one shared ref, partitioned exactly, no overlap and no gap. Easy to get wrong; got right.

**S-4 · `SearchEntry._lc` — precomputed lowercase fields, built once at index time.** `paperSearchIndex.ts:38-45` + `:271-280`. The scorer never allocates a lowercase copy per query per entry, which is why a 30-row re-score is cheap enough that L-2's caching "optimisation" was never needed in the first place. The comment (`:38`, *"built once, reused every query"*) states the intent precisely.

**S-5 · Run-grouped `<mark>` emission.** `searchHelpers.ts:56-68` collects consecutive matched characters into a single `<mark>` rather than one per character — minimal DOM, correct semantics, and it is the reason the §A.3 output is legible enough to diagnose. Small, deliberate, right.

---

## §9 · Repair sequencing (advisory — no code was written)

The three BLOCKERs are **coupled** and must land together or the middle state is worse than today:

1. **L-1 + L-3 together.** Collapse to a single root (backdrop inside the transitioned wrapper, or `Teleport`ed to `body` with an explicitly *lower* z-index rung), *and* give this file its own `<style scoped>` owning the six rules currently stranded in `PaperSearch.vue:103-196`. Re-check L-8 and L-9 in the same change — they go live the moment `overflow-y` starts working.
2. **L-2 alone, first, and independently testable.** Either key `_cache` by index identity and stop narrowing from truncated sets, or delete the cache (S-4 is why it is affordable). §A.2 is the regression test.
3. **L-5 / L-12 / L-4** are cheap and independent: `v-if` the sidebar host, delete the dead `defineEmits`, give `sidebar` a dismissal path.

Everything in §3 is safe to batch afterwards. **Do not** land L-1 without L-3.

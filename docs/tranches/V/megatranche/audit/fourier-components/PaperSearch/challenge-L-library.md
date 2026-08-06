claude-opus-5[1m]

# CHALLENGE — `PaperSearch` · axis L (LIBRARY)

**Target** `fourier-analysis/web/src/components/paper/PaperSearch.vue` (397 lines)
**Family read whole (read-only)** `search/PaperSearchInput.vue` (69) · `search/PaperSearchDropdown.vue` (70) ·
`search/PaperSearchModal.vue` (124) · `search/usePaperSearch.ts` (108) · `search/searchHelpers.ts` (74) ·
`search/paperSearchIndex.ts` (401) · `search/index.ts` (4) — 832 LOC, the census FE §4 CANDIDATE aggregate.
**Consumers read** `PaperView.vue` (686) · `PaperSidebar.vue` (283) · `MobileFloatingToc.vue` (head) ·
`lib/paperContent.ts` · `App.vue` root · `src/style.css` · `index.html`.
**Posture** DEFECTIVE-until-proven. **No browser tooling** — every claim is static or compiled-artifact-derived;
livable-only consequences are tagged `UNPROVEN-NEEDS-LIVE (SS-13)`.

**Verdict — 20 defects · 2 BLOCKER · 6 MAJOR · 8 MINOR · 4 INFO · 5 superlatives.**
The component is a 20-line pass-through shell hosting a 355-line scoped style block. **43 of its 48 rule blocks
match nothing.** The modal search is unstyled and renders below the fold; the ranking pipeline silently destroys
relevance for the ordinary typing path. Both are regressions of the *same* extraction commit, and both survived
because no per-component derivation sees the loop and its style owner at once (the R5-7 class, §7).

---

## 0. Method + the falsifier apparatus

Static-only, so every load-bearing claim carries a mechanical falsifier I actually ran:

| # | Probe | Command / site | Result |
|---|---|---|---|
| P-1 | Is any search class defined outside `PaperSearch.vue`? | `grep -rln 'search-modal-overlay\|paper-search-badge\|paper-search-action-btn' web/src` | 4 files, **all `.vue`, all consumers of the class, zero definitions** |
| P-2 | Do the 3 child SFCs carry a scope id? | read whole: `PaperSearchInput.vue` ends `</template>` L69; `Dropdown` L70; `Modal` L124 | **no `<style>` block in any of the three** |
| P-3 | Compiled ground truth | `dist/assets/PaperView-CS2UAWt8.js` — `grep -o '\[\["__scopeId"…'` | exactly **5** bindings for the 5 SFCs that *do* have `<style scoped>`; PaperSearch's is `data-v-a7d16b8c`, and `grep -c a7d16b8c` = **1** |
| P-4 | Compiled selectors | `dist/assets/PaperView-FJog9X2r.css` | **every** `.paper-search-*` / `.search-modal-*` selector is emitted as `…[data-v-a7d16b8c]` |
| P-5 | Dropdown root shape | compiled: `…)],64))}}),zr={class:"search-modal-header"}` | `p(oe,null,[…],64)` = `Fragment` + `STABLE_FRAGMENT` ⇒ **multi-root** |
| P-6 | Modal root shape | source `PaperSearchModal.vue:41` `<Teleport to="body">`; compiled overlay sits *inside* the teleport child list | overlay is **not** the component subTree root |
| P-7 | Was this always so? | `git show 6bbb291:…/PaperSearch.vue` → Teleport at L194, `.search-modal-overlay` at L198, `<style scoped>` at L275 | **originally monolithic**; `git ls-tree 6bbb291 -- …/paper/` shows **no `search/*.vue`** |
| P-8 | Astral reachability | `paper/fourier_paper.tex`, 3421 lines / 244 267 bytes | **0 non-BMP code points** ⇒ demotes L-19 to LATENT |
| P-9 | Async-staleness hypothesis | `lib/paperContent.ts:7` re-exports from `virtual:paper-content` | **hypothesis FALSIFIED** — build-time constant, see S-5 |
| P-10 | Compiler-level guards | `web/tsconfig.json` | `strict:true` but **no `noUnusedLocals` / `noUnusedParameters`** ⇒ L-12 invisible to CI |
| P-11 | Test coverage | `find web -name '*.test.ts' -o -name '*.spec.ts'` | **8 e2e specs, 0 unit tests**; `grep -rn search e2e/*.spec.ts` hits only `gallery.spec.ts` (a different search bar) |

**Staleness caveat, stated up front.** `dist/` is a 2026-06-12 artifact; `PaperSearchDropdown.vue` was edited
2026-06-17 (`glass-elevated` → `glass-floating`, a real fix — `glass-elevated` does **not** exist in the installed
`@mkbabb/glass-ui@4.0.0`, `glass-floating` does). P-3/P-4/P-5/P-6 therefore corroborate the **mechanism**
(scope-id topology, fragment root, teleport root), all of which I re-verified by reading the 06-17 source directly.
No claim below rests on `dist/` alone.

---

## 1. BLOCKERS

### L-1 · BLOCKER · The extraction orphaned the stylesheet: 43 of 48 rule blocks are dead, and the modal renders off-screen
`PaperSearch.vue:41-397` (the whole `<style scoped>` block) · `PaperSearchModal.vue:41` · `PaperSearchDropdown.vue:33-70`

At `6bbb291` `PaperSearch.vue` was one component: template L~150-271 (results list *and* `<Teleport>`), style L275+
(P-7). Every styled element was rendered by that component, so every element carried its scope id. Commit
`ffba307` ("A.W1.a.1 — land web migration cohort") **added** `search/PaperSearchInput.vue`,
`search/PaperSearchDropdown.vue`, `search/PaperSearchModal.vue` (`git show --name-status ffba307` → three `A` rows)
and moved the markup out. **The 355-line style block did not move and was not converted.** None of the three
children declares a `<style>` block, so none has a `__scopeId` (P-2, P-3).

Vue 3.5 propagates a parent's scope id to a child's elements in exactly one case: the element vnode **is** the
child's `subTree` root (`runtime-core` `setScopeId`, guard `vnode === subTree`). That case holds for
`PaperSearchInput` (single root `<div class="paper-search-input-wrap">`, compiled as the hoisted `br` props object)
and for nothing else here:

* `PaperSearchDropdown` is a **two-root fragment** — `<Transition>` plus the `v-if` backdrop `<div>` (`:35` and `:65`),
  compiled to `Fragment` with patchFlag `64` (P-5). A fragment child is never `=== subTree`.
* `PaperSearchModal` is a **`<Teleport>`** root (`:41`). Its overlay is a teleport *child*, mounted through
  `mountChildren`, never `=== subTree` (P-6). And with no `__scopeId` of its own it receives **no** `data-v-*` at all.

Enumerated (script over the style block, classifying by which element actually carries `data-v-a7d16b8c`):

| Status | Count | Rule blocks |
|---|---|---|
| **ALIVE** | **5** | `.paper-search` (L43) · `.paper-search-input-wrap` (L47) · `…:focus-within` (L58) · `.paper-search--sidebar` (L199) · `.paper-search--floating .paper-search-input-wrap` (L204) |
| **DEAD** | **43** | everything else — icon/input/placeholder/action-btn (L62-100) · results/result/badge×4/number/label/`:deep(mark)`/backdrop (L103-196) · floating overrides (L211-221) · `search-dropdown-*` (L225-236) · **the entire modal block L239-396** |

Consequences, in descending confidence:

1. **`.search-modal-overlay` (L239) is dead ⇒ the expand/modal search is invisible.** No `position:fixed`, no
   `inset:0`, no `z-index`, no flex centering. `Teleport to="body"` appends it as body's **last** child, after
   `#app`. `App.vue:24` renders `<div class="h-dvh flex flex-col … overflow-hidden">`, so `#app` is 100 dvh tall and
   `src/style.css:19-22` gives `body { min-height:100dvh }` with no overflow rule. An unpositioned block appended
   after a 100-dvh sibling **starts at y = 100 dvh** — below the fold, outside the `overflow-hidden` app shell.
   The user clicks Maximize (`PaperSearchInput.vue:47-57`), the inline dropdown disappears (its `v-if` requires
   `!isExpanded`, `Dropdown:37`), and nothing appears. *Mechanism CONFIRMED-STATIC; the pixel outcome is
   `UNPROVEN-NEEDS-LIVE (SS-13)`.*
2. **`.paper-search-results` (L103) is dead ⇒ the inline dropdown is an in-flow block.** No `position:absolute`,
   no `top`, no `max-height:50vh`, no `overflow-y:auto`, no `overscroll-behavior:contain`. Up to 30 rows are
   injected **into the sidebar flow**, displacing the "Contents" header and the whole TOC (`PaperSidebar.vue:51-64`).
   It keeps `glass-floating`, a global glass-ui utility, so it gets a plate but no geometry.
3. **`.paper-search-backdrop` (L192) is dead ⇒ the floating variant has no outside-click dismissal.** The div
   renders as an empty zero-height in-flow block instead of `position:fixed; inset:0`, so its `@click="search.close()"`
   (`Dropdown:68`) is unreachable. Compounds L-7.
4. `.paper-search-badge[data-type=…]` (L150-166), `.paper-search-label :deep(mark)` (L185), `.paper-search-number`,
   `.search-modal-hint kbd` — all the semantic affordances of the result row (type colouring, highlight ink,
   monospace numbering) are gone. The `<mark>` from `highlightFuzzy` falls back to the UA default yellow.
5. All eight transition blocks (`search-dropdown-*`, `search-modal-*`) are dead, so both `<Transition>`s resolve
   on the next frame with no animation. Cosmetic, but it means the A.W3.d motion-token migration commented at
   L224 / L363 ("bezier→`--ease-out-expo`") edited **dead CSS** — the tranche-A motion work never shipped here.

**Falsifier — and why it fails.** *"Some global stylesheet defines these."* Ran P-1: repo-wide, the only files
mentioning these classes are `PaperSearch.vue` (definition) and the three children (usage). `web/src/style.css`
does not contain them. *"Vue propagates through Fragment/Teleport."* The compiled artifact settles it: the
selectors demand `[data-v-a7d16b8c]` (P-4) and that token appears **once** in the entire chunk, as
`__scopeId` on `PaperSearch` itself (P-3). Were the children receiving it, the string would recur.

**Cheapest cure (not a patch — the challenge's obligation is to name it):** the style block belongs *with its
markup* — three unscoped-or-scoped blocks in the three children — or, if it must stay central, `:deep()` around
every descendant selector. The colocation inversion is L-11.

---

### L-2 · BLOCKER · Prefix-narrowing over a 30-truncated cache silently destroys relevance on the ordinary typing path
`paperSearchIndex.ts:195-242` (esp. `:214`, `:219-228`, `:239-240`) · driven from `usePaperSearch.ts:26-37`

```ts
_cache.set(q, results);              // :240 — `results` is scored.slice(0, maxResults) → ≤30
…
const prefixResults = _cache.get(prefix);
if (prefixResults) candidates = prefixResults;   // :223-226 — re-score the TRUNCATED set
```

The narrowing optimisation assumes `matches(q) ⊆ matches(prefix)`. That containment is true for the *unbounded*
match set (subsequence matching is monotone under pattern extension, and adding a whitespace token only
restricts). It is **false for the cached set**, because what is cached is the top-30 *by score for the prefix*,
not the match set. Every keystroke therefore narrows from a 30-element window chosen by a strictly shorter,
strictly less discriminating query.

**Failure scenario — concrete, and it is the default path.**
`fuzzyMatch("f", …)` succeeds against essentially every entry (a single character, subsequence semantics), and
`scoreEntry` weights `_lc.number` ×18 and `_lc.label` ×12 (`:171-177`), so the top-30 for `"f"` is dominated by
short-number/short-label entries — arbitrary with respect to any real query. A user types **`fourier transform`**
at a normal search-box cadence (~200-300 ms/char). The debounce is 120 ms (`usePaperSearch.ts:32`), so **each
character produces its own debounced query**:

`"f"` → full index, cached (≤30) → `"fo"` → narrows within those 30 → `"fou"` → … → `"fourier transform"`.

The final result set is a subset of the top-30-for-`"f"`. The paper has **51 `\section` + 31 `\subsection` +
88 theorem-like environments + 263 `equation`/`align` environments** (measured over `paper/fourier_paper.tex`),
so the true best matches for `"fourier transform"` are, with near-certainty, not among the top 30 for `"f"`.
**The search returns junk or nothing.**

The asymmetry is the tell, and it is testable without a browser: a typist **faster** than 120 ms/char produces a
single debounced query, `_cache.get("fourier transfor")` misses, `candidates = index`, and the results are
**correct**. Slow typists get degraded results; fast typists get correct ones. That is precisely the shape of a
defect that ships unnoticed by its author.

State is sticky, too: the chain only resets when the query empties (`:205-207` is the sole `clear()` on the
narrowing path). Backspacing to `"fourier transfor"` hits the *already-degraded* cache entry.

**Falsifier.** *"`maxResults` is only a display cap, so the truncation is harmless."* No — `:239-240` stores the
sliced array and `:226` feeds that same array back in as the candidate universe. Had the code cached
`scored` (untruncated) and sliced only at the return, the optimisation would be sound. *"Two tokens break the
prefix relation."* Checked: `q.slice(0,-1)` on a lowercased/trimmed `q` only ever removes one trailing character,
and token-set extension is monotone; containment holds — the truncation, not the tokenisation, is the bug.

---

## 2. MAJOR

### L-3 · MAJOR · Dual mount ⇒ two teleported modals; `document.querySelector` then drives the wrong one
`PaperSearchModal.vue:32` · `PaperSidebar.vue:51` · `MobileFloatingToc.vue:111` · `PaperView.vue:111,328,347`

One `usePaperSearch` state object (`PaperView.vue:111`) is passed to **two** `PaperSearch` hosts:
`PaperSidebar` (always mounted — hidden by CSS `display:none` at `PaperSidebar.vue:132-136`, never `v-if`) and
`MobileFloatingToc` (`PaperView.vue:319-329`, `v-if="!mobileTocVisible"`, whose inner `PaperSearch` is behind
`v-if="searchActive"`). Tapping the mobile search button (`MobileFloatingToc.vue` `openMobileSearch`) makes both
live simultaneously ⇒ **two `PaperSearchModal` instances ⇒ two `Teleport to="body"`**.

Both mount `.search-modal-overlay` (once L-1 is cured: two full-viewport `backdrop-filter: blur(6px)` layers
stacked at the same `--z-modal`, compounding the blur and the tint, and doubling the compositor cost). Both watch
`isExpanded` and both call `nextTick(() => modalInputRef.value?.focus())` (`:19-24`) — a focus race.

The sharper defect is `:32`:

```ts
const container = document.querySelector(".search-modal-results");
```

A **document-global** query from inside a component instance. With two modals it returns the **first** in document
order — the sidebar's, which is the one the mobile user cannot see. Arrow-key navigation then scrolls the hidden
modal's list while the visible modal's selection walks off screen. The sibling `PaperSearchDropdown.vue:24` does
the identical job **correctly** via its own `resultsRef`; the Modal regressed the same operation to a global
selector. Divergent duplication of one behaviour across two files.

**Falsifier.** *"Only one PaperSearch is ever mounted."* Refuted: `PaperSidebar` has no `v-if` (`PaperView.vue:335`),
it is hidden by `display:none`, and `MobileFloatingToc` mounts on the scroll-driven `!mobileTocVisible` predicate,
independent of width. *"`document.querySelector` is fine with one instance."* Fine today by accident, and it makes
the component unmountable-twice — a contract the tree already violates.
*Cross-instance visual outcome `UNPROVEN-NEEDS-LIVE (SS-13)`; the selector semantics are CONFIRMED-STATIC.*

### L-4 · MAJOR · Module-level result cache: never torn down, and keyed without the index it was built from
`paperSearchIndex.ts:196` · `:210` · `:214` · `:240`

```ts
let _cache: Map<string, SearchResult[]> = new Map();   // module scope
```

Two distinct problems from one line.

**(a) Leak — live.** The only `clear()` calls are `:206` (empty query) and `:214` (size > 200). Nothing runs on
component unmount; the module outlives every `PaperView` route transition. At the ceiling the map retains
200 × 30 = **6 000 `SearchResult` objects**, each a `{...entry}` spread (`:234`) pinning the entry's `_lc` strings
(up to 500 chars of section plaintext, 300 for theorems/proofs — `:319,:354,:385`) plus a fresh `matches: number[]`.
Bounded, but permanently resident and unreachable from any teardown path. `usePaperSearch` has no
`onScopeDispose`/`onUnmounted` at all (see L-8).

**(b) Index-agnostic key — latent.** `searchIndex(index, query, max)` takes `index` as a parameter and then, on a
cache hit (`:210-211`), **returns without consulting it**. Two indices, one key space. Today there is exactly one
(`buildSearchIndex` is called once, `usePaperSearch.ts:18`, from one site, `PaperView.vue:111`, over the build-time
constant `paperSections`), so no live cross-contamination — but the function's signature promises per-index
results and its implementation does not honour it. A second paper, a preview pane, or an SSR worker turns this
into wrong-answers-for-the-wrong-document.

**Falsifier.** *"It's a pure function, module state is fine."* The file's own header claims "Pure functions, no Vue
reactivity" (`:3`) — the cache makes `searchIndex` impure *and* stateful across callers, contradicting the
docblock. *"The prune bounds it."* Bounds it; never releases it.

### L-5 · MAJOR · `Cmd/Ctrl-K` is a no-op below 1024 px — it focuses a `display:none` input
`PaperView.vue:113-118, 273` · `PaperSearchInput.vue:20-25` · `PaperSidebar.vue:132-136` · `MobileFloatingToc.vue` `openMobileSearch`

`handleGlobalKeydown` calls `search.open()`, which sets **only** `isOpen` (`usePaperSearch.ts:55-57`). The sole
consumer of that transition is `PaperSearchInput`'s watcher, which focuses its own input. Below the `lg`
breakpoint the only mounted `PaperSearchInput` is the sidebar's, and `.paper-sidebar { display: none }` is the
default (the `display:block` is inside `@media (min-width:1024px)`). `HTMLElement.focus()` on a
`display:none` subtree is a **no-op** — no focus, no `@focus` handler, no visible change. The mobile path cannot
rescue it either: the floating `PaperSearch` is gated on `searchActive`, a `MobileFloatingToc`-local ref that
`search.open()` does not and cannot set. The listener is registered unconditionally on `window` (`:273`), so the
shortcut also swallows the browser's own ⌘K via `e.preventDefault()` (`:115`) while doing nothing.

**Falsifier.** *"The floating input catches it."* It is not mounted until the user taps the search button — and
once it is, `isOpen` is already `true` (`openMobileSearch` calls `props.search.open()`), so the watcher does not
re-fire. Both branches fail.

### L-6 · MAJOR · The loop index in the `:key` defeats reconciliation — ≤30 `Button` instances torn down and remounted per keystroke
`PaperSearchDropdown.vue:43` · `PaperSearchModal.vue:85`

```vue
:key="`${r.id}-${r.type}-${i}`"          <!-- Dropdown -->
:key="`modal-${r.id}-${r.type}-${i}`"    <!-- Modal -->
```

`i` is the loop index. Results are re-sorted by score on every debounced query (`paperSearchIndex.ts:238`), so a
row that merely moves from rank 3 to rank 5 gets a **different key** — Vue treats it as a removal plus an
insertion. Every keystroke therefore unmounts and remounts up to 30 glass-ui `Button` component instances (each
with its own setup scope, attrs, and slot children: badge span, number span, `v-html` label span) instead of
patching three text nodes. The `r.id`/`r.type` prefix was clearly intended to be the identity; `i` was appended to
paper over collisions — and there *are* collisions, because `processContentBlocks` assigns `id: sectionId` to
every `code` and `proof` entry (`:335`, `:351`). The right fix is a genuinely unique entry id at index-build time,
not an index suffix.

Compounding: the label binding is `v-html="highlightFuzzy(resultLabel(r), search.query.value)"` — a **function call
in the template**, re-evaluated for all 30 rows on every render, each call re-running the full multi-token fuzzy
matcher over the label (L-9).

**Falsifier.** *"Without `i` the keys collide and Vue warns."* True and irrelevant — that is an argument for fixing
the ids, not for making every key unstable. *"30 rows is small."* 30 component teardown/mount cycles per
keystroke, against a `<Button>` that A.W3.a (`6b7a12c`) upgraded from a native `<button>`, is not free; and it is
strictly avoidable. *Frame-cost `UNPROVEN-NEEDS-LIVE (SS-13)`; the key instability is CONFIRMED-STATIC.*

### L-7 · MAJOR · No dismissal path for the sidebar variant, and `isOpen` has no falling edge
`PaperSearchDropdown.vue:65-69` · `PaperSearchInput.vue:45` · `usePaperSearch.ts:48-53`

`isOpen` is raised by `@focus="search.isOpen.value = true"` and lowered only by `close()` (X button, Escape,
result selection). There is **no blur handler and no outside-click handler**. The one outside-click affordance is
the backdrop, and it is gated `v-if="variant === 'floating' && …"` — so on desktop (`variant="sidebar"`) clicking
anywhere else leaves the dropdown open indefinitely, occupying the sidebar. For `floating` the backdrop exists in
the vnode tree but is geometrically inert because `.paper-search-backdrop` is dead (L-1 ¶3), so **neither variant
has a working outside-click dismissal.** Additionally the button labelled *"Clear search"* (`PaperSearchInput:64`)
invokes `close()`, which also collapses the modal and drops `isOpen` — the affordance's label under-describes its
effect.

**Falsifier.** *"Escape covers it."* `onKeydown` is bound to the inputs only (`Input:44`, `Modal:59`); once focus
has left the input, Escape reaches nobody. Ran the grep — there is no `window`-level keydown for this state
(`PaperView.vue:273` handles ⌘K exclusively).

### L-8 · MAJOR · The debounce timer has no teardown
`usePaperSearch.ts:26-33`

```ts
let debounceTimer: ReturnType<typeof setTimeout> | undefined;
watch(query, (val) => { clearTimeout(debounceTimer); debounceTimer = setTimeout(…, 120); });
```

No `onScopeDispose`, no `onUnmounted`, no `getCurrentScope()` guard — the composable has **zero teardown code**.
Unmounting the host within 120 ms of a keystroke (route change, `searchActive` flip, `mobileTocVisible` flip)
leaves a live timer whose closure pins `debouncedQuery` and the enclosing scope; it fires post-dispose and writes
to a ref whose dependents are already stopped. Harmless in effect, incorrect in contract — and it is the same
omission that leaves `_cache` unbounded across mounts (L-4a). A composable that owns a timer owns its disposal.

**Falsifier.** *"Vue stops the effect scope, so the write is inert."* The *write* is inert; the *timer and its
retained closure* are not, and the composable is exported from a barrel (`index.ts:1`) as a general-purpose unit
with no documented lifetime constraint.

---

## 3. MINOR

### L-9 · MINOR · `SearchResult.matches` is computed, allocated per result, and never read — and the docblock describes a fallback that does not exist
`paperSearchIndex.ts:50-51, 182-186, 234` · `searchHelpers.ts:30-49`

`scoreEntry` carefully preserves match indices for the label field (`:185`) and `searchIndex` spreads them into
every result (`:234`). Grep for readers of `.matches` across `web/src`: the only hits are the two *producer* sites
inside `paperSearchIndex.ts` and the *independent* re-derivation inside `highlightFuzzy`. **No consumer ever reads
`SearchResult.matches`.** `highlightFuzzy` re-runs `fuzzyMatch` per token per row (`searchHelpers.ts:42-47`), so
the work is done twice: once at rank time and thrown away, once at render time for all 30 rows on every render
(L-6). The docblock at `searchHelpers.ts:32` — *"Falls back to re-running fuzzyMatch on the display label"* —
describes a fallback; the code has no branch that consults `r.matches` at all. Dead field, dead allocation,
misleading contract.

*(There is also a real reason the field could never have been used as-is: its indices are into `entry._lc.label`,
the lowercased string, whereas `highlightFuzzy` must index the display text. The re-derivation is the correct
behaviour; the stored field is the residue of the abandoned approach and should be deleted from the type.)*

### L-10 · MINOR · The camelCase bonus in `fuzzyMatch` is unreachable
`paperSearchIndex.ts:103-110`, documented at `:66`

```ts
else if (text[ti] >= "A" && text[ti] <= "Z" && prev >= "a" && prev <= "z") cs += 6;
```

`fuzzyMatch` has exactly two in-tree call sites (`grep -rn fuzzyMatch web/src`): `multiTokenFuzzy` (`:150`), which
receives `entry._lc.*` — every field lowercased by `makeLc` (`:271-279`) — and `highlightFuzzy` (`searchHelpers.ts:43`),
which passes `textLc = text.toLowerCase()`. **`text[ti]` can never be in `[A-Z]` at any live call site**, so the
`+6` branch is dead and the documented scoring model (`:66`) overstates what the ranker does. The function is
exported publicly (`index.ts:2`), so this is unreachable-in-tree rather than provably-unreachable — but nothing in
the tree exercises it and no test pins it (P-11).

### L-11 · MINOR · Goldilocks/colocation inversion — 20 lines of logic hosting 355 lines of someone else's CSS
`PaperSearch.vue:1-20` vs `:41-397`

Script + template = 39 lines, of which the only behaviour is `focus()` forwarding (`:15-19`) and one derived prop
(`:28`). The remaining **90 % of the file is a stylesheet for markup that lives in three other files.** The module
is simultaneously too small (no reason to exist beyond CSS hosting and a focus proxy) and too large (the largest
style block in the paper family). This inversion is not merely aesthetic: it is the *mechanism* by which L-1
survived review — the reviewer of `ffba307` saw three tidy new components and an untouched style block, and
nothing in the diff connected them. Either fold the styles down to their markup, or fold the three children back
up; the current split has the worst property of both.

### L-12 · MINOR · Four dead declarations, invisible to CI
`PaperSearch.vue:8` · `PaperSearchDropdown.vue:12-14, 30` · `PaperSearchModal.vue:12-14` · `usePaperSearch.ts:10`

* `PaperSearch.vue:8` `const props = defineProps<…>()` — `props` is never referenced in `<script>`; the template
  uses the `search`/`variant` bindings directly. Dead local.
* `PaperSearchDropdown.vue:12-14` and `PaperSearchModal.vue:12-14` both declare `emits: { select: [id: string] }`
  and **never call `emit`**; `PaperSearch.vue:31-37` never listens for `@select`. A dead contract that **ships** —
  the compiled chunk contains `__name:"PaperSearchModal",props:{search:{}},emits:["sele…`.
* `PaperSearchDropdown.vue:30` `defineExpose({ resultsRef })` — no parent holds a ref to the Dropdown.
* `usePaperSearch.ts:10` imports `type SearchEntry` and never uses it.

`web/tsconfig.json` sets `strict:true` but omits `noUnusedLocals`/`noUnusedParameters` (P-10), so none of this is
caught. Falsifier — *"lint catches it"*: there is no lint step wired that flags these (the dead emit reaching the
production bundle is the proof).

### L-13 · MINOR · `flattenNestedBlocks` and `collectParagraphText` are near-duplicates; one is typed with `any` and silently drops content
`paperSearchIndex.ts:257-269` vs `:361-367`

`collectParagraphText` = "keep strings". `flattenNestedBlocks` = "keep strings, plus `.tex`". The second is a
strict superset of the first with the same normalisation tail (`.replace(/\s+/g," ").trim()` in both). Its
parameter type is hand-rolled — `(string | { tex?: string } | { figure?: any } | { code?: any })[]` — with **two
`any`s**, and it is called with `thm.content` / `proof.content`, i.e. `ContentBlock[]`, so the declared union is a
fiction that structurally admits the real type by accident. Worse, the `figure`/`code` arms are declared and then
**never handled** in the body (`:260-267` handles only `string` and `tex`), so figure captions and code inside a
theorem or proof are silently absent from that entry's `plainText` — searchable content the index claims to cover
and does not.

### L-14 · MINOR · `_lc.type` escapes the lowercasing pass; `thm.type` is an unchecked cast
`paperSearchIndex.ts:271-279` (`:275`) · `:315`

`makeLc` lowercases `number`, `label`, `rawTex`, `plain` — and passes `type: entry.type` through raw (`:275`). Safe
only because the union literals happen to be lowercase. The value reaching it, however, is
`thm.type as SearchEntry["type"]` (`:315`) — an unchecked assertion over whatever `@mkbabb/latex-paper` parsed out
of the `.tex`. A `\newtheorem{Remark}` yields `_lc.type = "Remark"`, which then (a) fails every lowercased pattern
in `fuzzyMatch`, silently removing the type field from ranking for that entry, and (b) falls through
`TYPE_LABELS[r.type] ?? r.type` (`Dropdown:51`) to render a raw badge. Either validate at the boundary or lowercase
uniformly; doing neither hides the failure.

### L-15 · MINOR · The `selectedIndex` reset misses cache-hit identity
`usePaperSearch.ts:35-41`

`watch(results, () => { selectedIndex.value = 0 })` fires on reference change. On a cache hit `searchIndex`
returns the **same array instance** (`paperSearchIndex.ts:211`), so a `debouncedQuery` transition that maps to an
already-cached normalised `q` — e.g. `"Foo"` → `"foo"`, differing only by case, both normalising to `q = "foo"` at
`:203` — changes the watched source without changing the value. The watcher does not fire and `selectedIndex`
survives from the previous result set. Narrow, but it is the same reference-identity assumption the cache quietly
breaks elsewhere (L-4b).

### L-16 · MINOR · Field attribution by string value, not identity
`paperSearchIndex.ts:182-186`

```ts
bestMatches = text === entry._lc.label ? m.matches : [];
```

`text` is the loop variable over the `fields` tuple array; the intent is "was this the label field?", the
implementation is "does this string equal the label string?". When `_lc.number === _lc.label` (a section whose
title is its number, an equation labelled with its own tag) the number field's indices are attributed to the
label. Currently harmless only because the attributed value is never read (L-9) — two defects cancelling is not
the same as correctness. Index the `fields` array or tag the tuples.

---

## 4. INFO

### L-17 · INFO · Docblock drift in the word-separator set
`paperSearchIndex.ts:65` documents *"(space, -, _, ., /, \, :)"*; `:99` implements `" -_./\\:()"` — parentheses
included, undocumented. Small, but this file's docblock is the only specification the ranker has.

### L-18 · INFO · Zero unit tests for an 832-LOC family, and the type checker is configured not to notice
P-11: eight Playwright specs, **no** `*.test.ts`; the only `search` hits in e2e are `gallery.spec.ts` (a different
search bar with `placeholder="Search by slug..."`). `fuzzyMatch`, `scoreEntry`, `searchIndex`'s cache/narrowing,
`highlightFuzzy`'s escaping, and `buildSearchIndex`'s walker are all pure, trivially unit-testable, and untested —
L-2 and L-10 would each be caught by a five-line test. Combined with P-10 (`noUnusedLocals` off), nothing in CI
observes this module's behaviour or its dead surface.

### L-19 · INFO (LATENT) · Code-unit vs code-point index mismatch in `highlightFuzzy`
`searchHelpers.ts:39-67`
`matchSet` holds indices produced by `fuzzyMatch`, which indexes **UTF-16 code units** (`text[ti]`, `ti < text.length`,
`paperSearchIndex.ts:84-85`). The highlighter then walks `const chars = [...text]` (`:52`) — an iterator over
**code points**. For any astral character the two index spaces diverge and `<mark>` lands on the wrong
characters or splits a surrogate pair. Separately, `textLc = text.toLowerCase()` (`:39`) can change length for
some code points, so indices derived from `textLc` are applied to `text` without a mapping.
**Falsifier run (P-8): `paper/fourier_paper.tex` contains 0 non-BMP code points**, so this is unreachable against
the shipped corpus — LATENT, recorded so a future corpus (𝔽, 𝓕, emoji in a caption) does not rediscover it as a
mystery. Honest disclosure: I raised this expecting MAJOR and the falsifier demoted it.

### L-20 · INFO · Local re-fork of a producer capability the census already flagged
`@mkbabb/glass-ui@4.0.0` (installed) exports **`./search`** (`package.json` exports map; `dist/search.d.ts` →
`export * from "./components/custom/search"`). CENSUS-2026-08-03 FE §4 lists *"CANDIDATES — PaperSearch family
(832 LOC) vs `./search`+`useFuzzySearch`"* and lane-frontend.md:438 records that 7.0.0's `dock/index.ts` ships
`useDockSearch` composing `useFuzzySearch` — annotated **"the VSCode subsequence scorer — NO re-fork."**
`paperSearchIndex.ts:54` names its own scorer *"VSCode-style"*. This is the re-fork the producer README forbids,
and it is where L-2 and L-10 live. I do **not** upgrade this beyond INFO: convergence is gated behind the FE §5
resolution deadlock (glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0 as one atomic transaction), so it is not
actionable in this tranche. Recorded as the disposition input, not as a defect of this component's authorship.

---

## 5. Superlatives (L-18 runs both ways)

### S-1 · The `v-html` sink is genuinely safe, and non-obviously so
`searchHelpers.ts:34-74` · sinks at `Dropdown:58`, `Modal:100`
`escapeHtml` escapes `&` **first**, then `<` and `>` (`:73`) — the correct order; the common inversion
double-escapes. Every branch of `highlightFuzzy` escapes: the empty-query early return (`:35`), the no-match
return (`:49`), the matched run (`:61`), and the unmatched char (`:64`). `"` and `'` are unescaped, which is
correct and sufficient — the output is inserted as element **content**, never as an attribute value, and the only
markup the function emits is its own `<mark>`. Crucially, the **query is never interpolated into the output at
all**; only indices derived from it are. I attacked this from the attacker's side (query-borne injection,
attribute-context escape, unescaped fallback path) and found no vector. For a `v-html` binding fed by
user-controlled input, this is better than most.

### S-2 · The four-component prop contract is derived, not declared
`usePaperSearch.ts:108` `export type PaperSearchState = ReturnType<typeof usePaperSearch>`, consumed identically at
`PaperSearch.vue:9`, `Input:8`, `Dropdown:8`, `Modal:9`, `PaperSidebar.vue:24`, `MobileFloatingToc.vue:18`,
`PaperView.vue:111`. Seven declaration sites, **one** source of truth, structurally incapable of drifting from the
composable. Adding a member to the returned object propagates everywhere for free. This is the right idiom and it
is applied without exception.

### S-3 · Index-time normalisation is correctly placed
`paperSearchIndex.ts:38-45, 271-283`. The `_lc` bundle is built once per entry inside `pushEntry` and reused by
every subsequent query, with the intent documented at `:38` ("built once, reused every query"). The alternative —
lowercasing inside the hot scoring loop — would allocate per entry per token per keystroke. The optimisation is
real, is at the right layer, and is the one performance decision in this family that is unambiguously correct.

### S-4 · The module-level regexes avoid the `lastIndex` trap
`paperSearchIndex.ts:246-255`. `HTML_TAG_RE` and `LATEX_CMD_RE` are hoisted **with the `/g` flag** and used
exclusively through `String.prototype.replace`, which resets `lastIndex` — unlike `.test()`/`.exec()`, where a
hoisted global regex is a classic every-other-call-fails bug. Given that this file *does* carry module state that
bites (L-4), the fact that its regex hoisting does not is worth recording as deliberate rather than lucky.

### S-5 · A falsifier I ran and lost — the eager index build cannot go stale
I predicted a BLOCKER: `buildSearchIndex(options.sections)` runs once at `usePaperSearch.ts:18` against a
**non-reactive** captured array, so async-loaded sections would produce a permanently empty index and a silently
dead search. **Refuted (P-9):** `lib/paperContent.ts:7` re-exports `paperSections` from `virtual:paper-content`, a
Vite virtual module generated from `paper/fourier_paper.tex` at build time — a module-scope constant that is fully
resolved before any component setup runs. The non-reactive capture is therefore *correct by construction*, and the
`const sections = computed(() => paperSections)` wrapper at `PaperView.vue:120` is the redundant one. Recorded so
the next auditor does not spend the same cycles.
*(Residual, INFO-grade and folded into no defect row: the build is synchronous in `setup`, walking 51 sections +
31 subsections + 88 theorem environments + 263 numbered-equation environments before first paint, whether or not
the user ever searches. The magnitude is `UNPROVEN-NEEDS-LIVE (SS-13)` and `e2e/paper-performance.spec.ts` is the
only extant guard.)*

---

## 6. Viz render path — the honest answer

CENSUS-2026-08-03 FE §6 records the fourier viz architecture as **Canvas2D throughout, WebGL/WebGPU ABSENT**,
with three independent canvases (epicycle instrument on a store rAF clock; `ConvergencePlot` with its own ungated
rAF; `FrequencyGraph` watch-driven) plus 12 SVG surfaces, and FE §4 flags the `BasisCanvas` + `canvas-drawing/`
(1 311 LOC) ↔ glass-ui `FourierField` convergence as the highest-value/highest-risk study.

**PaperSearch touches none of it.** No canvas, no WebGL context, no rAF, no `BasisComponent`. I checked rather than
assumed: the family's entire imports are Vue, `lucide-vue-next`, `@mkbabb/glass-ui/button`, and
`@mkbabb/latex-paper` types. Manufacturing a viz finding here would be the L-18 failure in the other direction.

Its **only** compositor-adjacent surface is `.search-modal-overlay { backdrop-filter: blur(6px) }`
(`PaperSearch.vue:248-249`), which is dead today (L-1). Two consequences worth carrying:

1. Reviving that rule under the dual-mount condition (L-3) stacks **two** full-viewport `backdrop-filter` layers at
   the same `--z-modal`, over `PaperView.vue:502-514`'s `.teleport-overlay` (`position:fixed; inset:0;
   will-change:opacity`) — three promoted full-viewport layers on a page whose scroller already carries a
   `scroll()`-timeline progress bar (`PaperView.vue:485-500`). The L-1 cure and the L-3 cure must land together, or
   the fix is a compositor regression.
2. The dead `.paper-search-results { max-height: 50vh; overflow-y: auto; overscroll-behavior: contain }`
   (`:105-111`) is exactly the right recipe for a 30-row list inside a scroll-locked paper view — it is correct CSS
   that has simply never applied. Reviving it is a scroll-containment fix as much as a visual one.

---

## 7. The R5-7 template-loop invisibility class, as it applies here

Intake row **R5-7** (`lane-fourier-r3-r6.md:125`, adjudicated **TRUE / ADOPT-AS-FACT + CARRY→F.W4`): *template-loop
evidence keyed to component callsites is blind to native HTML element loops* — `instance.loop.paper-sidebar` derived
to a literally empty `[]` because `PaperSidebar.vue`'s three nested loops (live: `:65`, `:87`, `:105`) are on native
`<li>`. R6-5 cured it with a `NATIVE_TEMPLATE_LOOP` family (`nativeTemplateLoops: 16`).

Three findings for this component, one of which is the *mechanism* behind L-1.

**(a) The direct form does not apply — verified, not assumed.** Both result loops iterate `<Button>`, a glass-ui
component (`Dropdown:42`, `Modal:84`), so they register as component callsites and are visible to a
callsite-keyed deriver. `PaperSearch.vue` itself contains **zero** `v-for`. The `<li v-for>` that R5-7 names lives
in `PaperSidebar.vue` and `PaperView.vue:363` — adjacent files, not this one. The family's only native-element
loop-adjacent markup is the three `<kbd>` hints (`Modal:110-118`), which are static.

**(b) A phantom delta straddles `6b7a12c`.** `refactor(A.W3.a): migrate native <button> to <Button> across
equation/morph/paper/layout` converted this family's result rows from native `<button v-for>` to `<Button v-for>`.
Under the pre-R6 deriver those rows were **invisible** (native, per R5-7) and after the migration they are
**visible** (component callsites) — so any instance-count baseline spanning that commit shows up to +30 instances
per open dropdown with **zero behavioural change**. F.W4's D/L/C audit must pin its baseline on one side of
`6b7a12c` or it will read a refactor as growth.

**(c) The generalisation this component demonstrates — invisibility by *delegation*.** R5-7's blind spot is
nativeness; `PaperSearch` exhibits the same failure through a different mechanism. A per-component view of
`PaperSearch.vue` reports **0 loops, 3 child callsites, 48 CSS rule blocks**. A per-component view of
`PaperSearchDropdown.vue`/`PaperSearchModal.vue` reports **1 unbounded loop each (≤30 rows × 4 nodes), 0 CSS rules**.
**No single per-component row contains both the loop and the styles that govern it** — the extraction split the
element from its rule, and the derivation preserves that split. That is precisely why a 43-of-48-rules-dead
regression (L-1) survived a tranche-A motion-token pass that *edited two of the dead blocks* (`:224`, `:363`).

The generalisable rule, offered for F.W4: **loop evidence and style-ownership evidence must be joined on the
rendered element, not on the declaring module.** R6's `NATIVE_TEMPLATE_LOOP` family fixes the native-element
half of the blind spot; the delegation half — a component whose CSS governs a subtree it does not render — is
still uncounted, and this component is the cleanest specimen of it in the tree. Concrete acceptance test for the
cure: a derivation that joins correctly must be able to report *"`PaperSearch.vue` declares 43 rule blocks with
zero matching elements"* without a human reading the file.

---

## 8. Ledger

| id | sev | site | one line | falsifier status |
|---|---|---|---|---|
| L-1 | **BLOCKER** | `PaperSearch.vue:41-397` | 43/48 scoped rule blocks dead post-`ffba307`; modal renders below the fold | CONFIRMED-STATIC (P-1..P-7); pixel outcome SS-13 |
| L-2 | **BLOCKER** | `paperSearchIndex.ts:219-240` | prefix-narrowing over a 30-truncated cache destroys relevance on the slow-typist path | CONFIRMED-STATIC |
| L-3 | MAJOR | `PaperSearchModal.vue:32` | dual mount ⇒ two Teleported modals; `document.querySelector` drives the hidden one | CONFIRMED-STATIC; visual SS-13 |
| L-4 | MAJOR | `paperSearchIndex.ts:196` | module cache never torn down (leak, live) + index-agnostic key (latent) | CONFIRMED-STATIC |
| L-5 | MAJOR | `PaperView.vue:113` | ⌘K focuses a `display:none` input below 1024 px — no-op that also eats the browser shortcut | CONFIRMED-STATIC |
| L-6 | MAJOR | `Dropdown:43`, `Modal:85` | loop index in `:key` ⇒ ≤30 `Button` remounts per keystroke | CONFIRMED-STATIC; cost SS-13 |
| L-7 | MAJOR | `Dropdown:65`, `Input:45` | no outside-click or blur dismissal in either variant | CONFIRMED-STATIC |
| L-8 | MAJOR | `usePaperSearch.ts:26-33` | debounce timer has no teardown; composable has zero disposal code | CONFIRMED-STATIC |
| L-9 | MINOR | `paperSearchIndex.ts:234` | `SearchResult.matches` never read; docblock describes a nonexistent fallback | CONFIRMED-STATIC |
| L-10 | MINOR | `paperSearchIndex.ts:103-110` | camelCase bonus unreachable — both call sites lowercase | CONFIRMED-STATIC |
| L-11 | MINOR | `PaperSearch.vue` whole | Goldilocks/colocation inversion: 20 lines of logic, 355 of others' CSS | CONFIRMED-STATIC |
| L-12 | MINOR | 4 sites | dead `props`, 2 dead `emits` (one reaches the bundle), dead expose, dead type import | CONFIRMED-STATIC (P-10) |
| L-13 | MINOR | `paperSearchIndex.ts:257-269` | duplicate of `collectParagraphText`; 2×`any`; figure/code arms declared, never handled | CONFIRMED-STATIC |
| L-14 | MINOR | `paperSearchIndex.ts:275, 315` | `_lc.type` unlowercased + unchecked `thm.type` cast | CONFIRMED-STATIC |
| L-15 | MINOR | `usePaperSearch.ts:39-41` | `selectedIndex` reset misses cache-hit array identity | CONFIRMED-STATIC |
| L-16 | MINOR | `paperSearchIndex.ts:185` | field attribution by string value, not index | CONFIRMED-STATIC |
| L-17 | INFO | `paperSearchIndex.ts:65` vs `:99` | separator-set docblock drift | CONFIRMED-STATIC |
| L-18 | INFO | family-wide | 0 unit tests over 832 LOC; `noUnusedLocals` off | CONFIRMED-STATIC (P-10, P-11) |
| L-19 | INFO | `searchHelpers.ts:39-67` | code-unit/code-point index mismatch — **LATENT** | falsifier P-8 DEMOTED it |
| L-20 | INFO | `index.ts` vs glass-ui `./search` | re-fork of the producer's VSCode scorer; gated behind the FE §5 deadlock | CONFIRMED-STATIC |
| S-1 | ★ | `searchHelpers.ts:34-74` | `v-html` sink is genuinely injection-safe, non-obviously | attacked, held |
| S-2 | ★ | `usePaperSearch.ts:108` | 7 declaration sites, 1 derived contract — cannot drift | — |
| S-3 | ★ | `paperSearchIndex.ts:38-45` | `_lc` normalisation at index time, the correct layer | — |
| S-4 | ★ | `paperSearchIndex.ts:246-255` | hoisted `/g` regexes used only via `replace` — no `lastIndex` trap | — |
| S-5 | ★ | `lib/paperContent.ts:7` | my own BLOCKER hypothesis, falsified: the eager index cannot go stale | falsifier P-9 LOST |

**Overlap with the adjudicated intake lane.** R3-11 / X-6 (`lane-fourier-r3-r6.md:85,157`) established
`PaperSearchModal.vue:41` as one of exactly two `<Teleport>` sites in the tree — I re-derived that line
independently and it is load-bearing for **L-1 ¶1** and **L-3**. No contradiction with the tree. **R5-7 / R6-5**
(`:125,:140`) is folded and *extended* in §7(c) rather than restated: I contradict nothing in the row, and add the
delegation variant of the same blind spot, which R6's `NATIVE_TEMPLATE_LOOP` cure does not cover.
Census FE §4's "PaperSearch family (832 LOC) vs `./search`+`useFuzzySearch`" CANDIDATE row is confirmed by tree
measurement (`CENSUS-2026-08-03.md:99`, `lane-frontend.md:153-165,438`) and carried as **L-20**, deliberately not
escalated — the FE §5 resolution deadlock makes it non-actionable this tranche.

claude-opus-5[1m] (served model id)

# CHALLENGE C · CONSUMPTION — `PaperSearchDropdown.vue`

**Subject.** `fourier-analysis/web/src/components/paper/search/PaperSearchDropdown.vue` (70 lines),
at fourier HEAD `cd26c65` + the 24-path working-tree bump sweep (the file is **dirty**: `git status
--porcelain` → ` M web/src/components/paper/search/PaperSearchDropdown.vue`).

**Axis.** How this component consumes its producers — `@mkbabb/value.js@0.13.0`,
`@mkbabb/keyframes.js@4.3.0`, `@mkbabb/glass-ui@^4.0.0` (installed 4.0.0),
`@mkbabb/latex-paper@0.2.1`, and the 45-operation fourier API — plus the props/emits contract and
every integration seam it opens.

**Method.** Read-only. Component read whole; every direct import read whole
(`usePaperSearch.ts` 108, `searchHelpers.ts` 74, `paperSearchIndex.ts` 401, glass-ui `./button`);
every transitive producer contract read from the **installed** `web/node_modules/@mkbabb/*` dist
(not from the producer repos — the consumer resolves what is installed). Two mechanical receipts
were produced by running the repo's own `@vue/compiler-sfc` over the SFCs into the scratchpad; no
product source in any repo was written. **The only write is this file.** No browser tooling; every
livable-only claim is marked `UNPROVEN-NEEDS-LIVE`.

**Prior corpus folded** (cited inline, not re-derived): `formation/fourier/lane-frontend.md`
(§4 candidate shadows :438, §5 uplift break surface + the tri-package deadlock, §5 prior-art WT diff
:504), `formation/fourier/CENSUS-2026-08-03.md` (§1 pins, §2 C-3/C-7), and the adjudicated intake
`audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (R3-11 · R3-12 · R6-8 · X-3 — see §5).

**Posture.** The component was assumed DEFECTIVE until the tree proved otherwise. It is. Two
findings survived a deliberate falsification attempt and became superlatives instead (§4 S-1, S-3).

---

## §0 — Verdict

**3 BLOCKER · 8 MAJOR · 11 MINOR · 3 INFO = 25 defects; 5 superlatives.**

The headline is not a style nit. **Every CSS rule that dresses this component is dead**, and has
been since `ffba307` (2026-05-26). The component renders 30 producer-default pill buttons, stacked
inline, in normal document flow, with no plate, no clipping, no truncation, no selection highlight
and no transition. The cure is not one line: curing the scope defect immediately arms a second
BLOCKER (the backdrop out-paints the results it is meant to sit behind).

Underneath that, the consumption story is a **1:1 producer shadow**: glass-ui **4.0.0 — the version
already installed** — exports `./search`, whose `FuzzySearch.vue` takes
`{ state: FuzzySearchState; variant?: "sidebar" | "floating"; typeLabel? }` and whose
`fuzzySearchIndex` ships the *same VSCode subsequence scorer with a character-identical docblock*.
It is imported **zero** times.

---

## §1 — BLOCKERS

### C-1 · BLOCKER · The component's entire stylesheet is unreachable — parent-owned `<style scoped>` cannot cross into a multi-root child

`PaperSearchDropdown.vue` ships **no `<style>` block**. Every class it paints —
`paper-search-results` (:39), `paper-search-result` (:45), `is-selected` (:46), `paper-search-badge`
(:50), `paper-search-number` (:53), `paper-search-label` (:57), `paper-search-backdrop` (:67) — is
defined **only** in the parent `PaperSearch.vue`'s `<style scoped>` (`PaperSearch.vue:41`,
rules at :103–:196, :215–:236). Nowhere else in `web/src`:

```
$ grep -rn "paper-search-results|paper-search-badge|paper-search-backdrop|search-dropdown" web/src
   → PaperSearch.vue (definitions) · PaperSearchDropdown.vue + PaperSearchModal.vue (uses) only
```
`web/src/style.css` imports exactly three sheets (`tailwindcss`, `tw-animate-css`,
`@mkbabb/glass-ui/styles`) — none defines a `paper-search-*` class.

**Receipt 1 — the selectors are scope-gated.** Running the repo's own `@vue/compiler-sfc`
`compileStyle({scoped:true})` over `PaperSearch.vue`'s style block emits:

```css
.paper-search-results[data-v-PARENT] { position:absolute; top:calc(100% + 4px); left:0; right:0;
    z-index:var(--z-bar); max-height:50vh; overflow-y:auto; overscroll-behavior:contain;
    border:1.5px solid var(--border); border-radius:calc(var(--radius) - 2px);
    box-shadow:0 4px 16px rgba(0,0,0,.1); padding:.25rem }
.paper-search-result[data-v-PARENT] { display:flex; align-items:baseline; gap:.375rem; width:100%;
    padding:.35rem .5rem; border:none; background:none; text-align:left; … }
```

**Receipt 2 — the child is multi-root, so it never receives `data-v-PARENT`.** `compileTemplate`
over `PaperSearchDropdown.vue` returns:

```js
return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createCommentVNode(" Inline dropdown (non-expanded) "),
    _createVNode(_Transition, { name: "search-dropdown" }, { … }),
    _createCommentVNode(" Backdrop for inline dropdown (floating variant only) "),
    (…) ? (_openBlock(), _createElementBlock("div", { key:0, class:"paper-search-backdrop", … }))
        : _createCommentVNode("v-if", true)
  ], 64 /* STABLE_FRAGMENT */))
```

Patch flag **64 (`STABLE_FRAGMENT`)**, *not* 2048 (`DEV_ROOT_FRAGMENT`).

**Receipt 3 — the runtime gate.** `web/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js`,
`const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {…}`:

```js
let subTree = parentComponent.subTree;
if (DEV && subTree.patchFlag > 0 && subTree.patchFlag & 2048) subTree = filterSingleRoot(subTree.children) || subTree;
if (vnode === subTree || …) { /* only here does the parent's scopeId propagate */ }
```
The parent's scope id reaches a child **only when the mounted element vnode *is* the child's
subTree**. Here the subTree is the `STABLE_FRAGMENT`; the plate `<div>` sits one level below it
(and inside `<Transition>` besides). The 2048 escape hatch is dev-only *and* requires a single
element root, which `filterSingleRoot` cannot find among two. **`data-v-PARENT` is never applied, in
dev or in prod.**

**Receipt 4 — the control.** The sibling `PaperSearchInput.vue` *is* single-root
(`<div class="paper-search-input-wrap">`, :35) and therefore *does* receive the parent scope id —
which is why `.paper-search-input-wrap[data-v-PARENT]` (`PaperSearch.vue:47`) works while
`.paper-search-input[data-v-PARENT]` (:69, one level deeper) does not. The asymmetry is the
mechanism, visible inside one feature.

**Receipt 5 — the regression event, dated.** `PaperSearch.vue` was born a monolith at `6bbb291`
(2026-03-14): markup `class="paper-search-results"` at **:162**, the matching rule at **:336**, one
SFC, scope satisfied. `ffba307` (2026-05-26, *feat(A.W1.a.1): land web migration cohort — deletions
+ rewires*) added `search/PaperSearchDropdown.vue` and moved the markup out — **and left the
`<style scoped>` block behind.** `git show ffba307^:…/PaperSearch.vue | grep -c paper-search-results`
→ 3 (still colocated). The split is the defect.

**Blast radius (same mechanism, same commit).** `PaperSearchModal.vue`'s single root is
`<Teleport>` (:41) — its children are likewise not `=== subTree`, so **every `.search-modal-*` rule
in `PaperSearch.vue:239–:396` is dead too.** Of the ~50 rules in that block, only `.paper-search`,
`.paper-search--sidebar`, `.paper-search--floating`, and `.paper-search-input-wrap` still match.
(This independently corroborates intake **R3-11**, which flags `PaperSearchModal.vue:41` as one of
the tree's two `<Teleport>` sites — the registry defect and this style defect share a root cause:
the Teleport boundary is invisible to naive tree walks.)

**Falsifier (offered and failed).** *"A global stylesheet also defines these classes."* Refuted:
the grep above returns definitions in exactly one file, and that file's block is `scoped`.
*"Vue applies the parent's scope id to all roots of a fragment child."* Refuted by Receipt 3's
`vnode === subTree` gate + Receipt 2's patch flag. *"It only breaks in production builds."* Refuted:
the 2048 branch is dev-only **and** needs a single element root; there are two.

**Falsifier that would overturn this:** a rendered DOM node carrying both `class="paper-search-results"`
and a `data-v-*` attribute matching `PaperSearch.vue`'s scope hash. `UNPROVEN-NEEDS-LIVE` for the
screenshot; the static chain is closed.

---

### C-2 · BLOCKER · Consequence: the results plate renders **in normal flow**, ≥1200 px tall, unclipped

With C-1, the plate `<div>` (:36–:40) keeps exactly two class sources: nothing (dead scoped rules)
and `glass-floating`. `glass-ui/dist/styles/glass/material.css:40` places `.glass-floating` in the
material selector group whose sole geometry declaration is:

```css
.glass-material, .glass-wash, .glass-quiet, .glass-resting, .glass-floating, … { position: relative; }
```

So instead of `position:absolute; top:calc(100% + 4px); max-height:50vh; overflow-y:auto`, the plate
is **`position: relative`, auto height, no clipping** — an in-flow block that pushes the sidebar /
mobile bar content down.

Row height is producer-determined. `Button` (`dist/button-BNDWhAZb.js`) has
`defaultVariants: { variant:"default", size:"default" }`; the component passes `variant="ghost"`
(:44) and **no `size`**, so every row gets `size:"default"` → `h-(--control-h-md) px-4 py-2`, over
the base `btn-pill …whitespace-nowrap…`. Tokens:

```
--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor))
--control-floor: var(--touch-target, 2.75rem)   /* coarse pointer */ | 0px /* fine */
```
→ **40 px** fine-pointer, **44 px** coarse. `usePaperSearch.ts:36` requests `maxResults = 30`.

**30 × 40 px = 1 200 px desktop / 1 320 px mobile of in-flow content**, inside `PaperSidebar.vue:51`
(`<PaperSearch … variant="sidebar" />`) and `MobileFloatingToc.vue:111` (`variant="floating"`).

`.btn-pill` (`glass-ui/dist/styles/glass/surfaces.css:119-120`) further applies
`@apply inline-flex items-center justify-center …; border-radius: var(--radius-pill);
padding: calc(.5rem*var(--ui-scale)) calc(1rem*var(--ui-scale))`. `inline-flex` inside a plain block
container means the 30 rows **flow inline and wrap**, not stack; `justify-center` centres each
label; `whitespace-nowrap` with no `overflow:hidden`/`text-overflow` (the truncation rule at
`PaperSearch.vue:174-183` is dead) lets a 120-char label (`searchHelpers.ts:26-27`) run off-axis.

**Falsifier:** any producer rule giving `.glass-floating` `position:absolute`/`fixed` or an
`overflow` value, or a `--ui-scale` small enough to drop `--control-h-md` below the flow budget.
Checked: `grep -rn "glass-floating" dist/styles/**` returns the material group (`position:relative`),
the specular `::before` (`glass-specular-track.css:39,60`), and prose comments — nothing positional.
`--control-h-md` is a `max()` with a floor, so it cannot shrink below `--control-floor`.
`UNPROVEN-NEEDS-LIVE`: the exact rendered height.

---

### C-3 · BLOCKER (latent — armed by the C-1 cure) · The backdrop out-paints the results and swallows every click

Once C-1 is cured, `PaperSearch.vue:192-196` and `:103-116` both take effect:

```css
.paper-search-results  { position:absolute; …; z-index: var(--z-bar); }   /* :108 */
.paper-search-backdrop { position:fixed; inset:0;  z-index: var(--z-bar); } /* :195 */
```
`--z-bar: 30` (`glass-ui/dist/styles/tokens*`), i.e. **the two are equal**. In Receipt 2's compiled
fragment the backdrop (`PaperSearchDropdown.vue:65-69`) is emitted **after** the `<Transition>`
carrying the results. `.paper-search` is `position:relative` with `z-index:auto`
(`PaperSearch.vue:43-45`) — no stacking context — so both positioned boxes resolve into the same
ancestor stacking context at z-index 30, where **paint order is tree order**: the backdrop paints on
top. Result: in the `floating` variant, `@click="search.selectResult(r)"` (:47) is unreachable —
the pointer lands on `@click="search.close()"` (:68) and the dropdown dismisses instead of
navigating. `@mouseenter` (:48) is likewise dead, and with it the hover highlight.

**Why this is worth a blocker slot now:** it is invisible today (C-1 masks it) and will be
*introduced* by the obvious fix. Any repair that only moves the styles into the child ships a
regression from "ugly but clickable" to "unclickable".

**Falsifier:** an ancestor of `.paper-search` establishing a stacking context that contains the
absolute plate but not the fixed backdrop — impossible, since a `transform`/`filter`/`contain`
ancestor captures fixed descendants too; or a differing `--z-bar` resolution between the two rules —
both read the same custom property on the same element tree. `UNPROVEN-NEEDS-LIVE` for the click
trace after the cure.

---

## §2 — MAJOR

### C-4 · MAJOR · `is-selected` has no visual: keyboard navigation is invisible

`:46` binds `is-selected`, `usePaperSearch.ts:63-92` drives it with ArrowUp/ArrowDown, and the only
rule that paints it — `PaperSearch.vue:132-135`
(`.paper-search-result:hover, .paper-search-result.is-selected { background: color-mix(…) }`) — is
dead per C-1. The `ghost` CVA arm supplies `hover:bg-foreground/8`
(`button-BNDWhAZb.js`, `variants.variant.ghost`) but **nothing keyed to a selected state**: glass-ui
paints selection off `aria-pressed:*`, which this component never sets. A user arrowing through 30
results sees no cursor at all; only `Enter` reveals where they were.
**Falsifier:** any producer rule matching `.is-selected` — `grep -rn "is-selected" glass-ui/dist` →
no hits. `UNPROVEN-NEEDS-LIVE` for the screenshot.

### C-5 · MAJOR · The declared `<Transition>` never runs

`:35` names `search-dropdown`; the enter/leave rules live at `PaperSearch.vue:225-236` and are
scoped, so `.search-dropdown-enter-active[data-v-PARENT]` cannot match the plate. Vue's Transition
probes computed style after applying the enter class, finds zero duration, and resolves
immediately — the plate pops in and out. The wave comment on those very rules
(`PaperSearch.vue:224`: *"A.W3.d — bezier→`--ease-out-expo`"*) records a motion-tokenisation pass
that was applied to rules that had already stopped matching.
**Falsifier:** a global `search-dropdown-*` definition — none exists (§1 grep).

### C-6 · MAJOR · A 1:1 producer shadow: glass-ui **4.0.0, already installed**, ships this exact component and this exact scorer

`web/node_modules/@mkbabb/glass-ui/package.json` (v4.0.0) exports `./search`:

| producer (`dist/components/custom/search/`) | consumer |
|---|---|
| `FuzzySearch.vue.d.ts` → `{ state: FuzzySearchState; variant?: "sidebar" \| "floating"; placeholder?: string; typeLabel?: (item) => string }`, exposes `focus()` | `PaperSearch.vue:8-19` → `{ search: PaperSearchState; variant: "sidebar" \| "floating" }`, `defineExpose({ focus })` — **same union, same expose** |
| `composables/types.d.ts` → `FuzzySearchState { query, results, selectedIndex, isOpen, isExpanded, onKeydown, selectResult, toggleExpanded, close, open }` | `usePaperSearch.ts:94-105` returns **the same ten members**, same names |
| `useFuzzySearch.d.ts` → `debounceMs?` *(default 120)*, `maxResults?` *(default 30)*, `onSelect?` | `usePaperSearch.ts:32` `120`, `:36` `30`, `:43-46` `selectResult` |
| `fuzzySearchIndex.d.ts` docblock: `+8 … +7 … +6 … +5 … +3 … +1 … -0.1 per excess character in text (prefer tighter matches)` | `paperSearchIndex.ts:61-68` — **character-identical bonus table and closing phrase** |
| `buildIndex` / `searchIndex` / `fuzzyMatch` / **`clearSearchCache(index?)`** | `buildSearchIndex` / `searchIndex` / `fuzzyMatch` / **absent** |
| `SearchBar.vue.d.ts` | `PaperSearchInput.vue` |
| `composables/motion/useTextHighlight.d.ts` — CSS Custom Highlight API, `setFromMatches(container, query, matcher)`, worked example `useTextHighlight("fuzzy-search")` | `searchHelpers.ts:34-70` `highlightFuzzy` + `v-html` (:58) |

Live import count: `grep -rn "glass-ui/search\|glass-ui/command" web/src` → **0**. This sharpens
lane-frontend §4's candidate row (":438 — `./search` present at 4.0.0 AND 7.0.0") from *"a producer
subpath exists"* to *"the producer ships the same scorer, the same state interface, the same variant
union, the same defaults, and the cure for two of this file's defects (C-9 `clearSearchCache`,
C-16 `useTextHighlight`)"*. Lane-frontend's 7.0.0 note — `useDockSearch` composing `useFuzzySearch`,
*"the VSCode subsequence scorer — NO re-fork"* — is a producer-side prohibition this consumer is on
the wrong side of at 4.0.0 already.

**Falsifier:** a capability in the local implementation absent from the producer. The one real
candidate is fourier's per-field weighting (`paperSearchIndex.ts:171-177` — number 18 / label 12 /
type 10 / rawTex 6 / plain 3) against the producer's fixed `{label, text, type}` triple
(`fuzzySearchIndex.d.ts` `IndexEntry._lc`). That is a genuine delta and it means adoption is a
*port*, not a swap — but it justifies keeping ~40 lines of weighting, not 435 lines across six files.

### C-7 · MAJOR · `<Button>` is mis-consumed: a content-width pill used as a full-width list row

The producer documents the primitive's shape in its own stylesheet
(`glass-ui/dist/styles/glass/surfaces.css:47-52`):

> *"`.glass-btn` is the FIXED-square icon primitive … **`.btn-pill` is the CONTENT-WIDTH text
> pill**. … Machine-locked by `proof:demo-affordances`."*

`:41-49` uses it for 30 full-width, left-aligned, baseline-aligned, truncating list rows. To get
there the author CSS must override six producer declarations (`inline-flex` → `flex`,
`justify-center` → default, `radius-pill` → `calc(var(--radius) - 4px)`, `h-(--control-h-md)` →
auto, `px-4 py-2` → `.35rem .5rem`, `whitespace-nowrap` → nowrap+ellipsis). glass-ui 4.0.0 exports
`./command` (`CommandItem`) and `./dropdown-menu` — both list-row primitives — and `./search`'s
`FuzzySearch` renders the rows outright. Introduced by `6b7a12c` *(refactor(A.W3.a): migrate native
`<button>` to `<Button>` across equation/morph/paper/layout)* — a sweep that swapped the element
without checking whether the primitive's geometry contract matched the call site.
**Falsifier:** a `size` or `variant` arm producing a full-width auto-height row — the CVA
(`button-BNDWhAZb.js`) has 13 variants × 6 sizes and none sets `width`, `display:flex`, or
`text-align:left`.

### C-8 · MAJOR · The `select` emit is dead; the component mutates its parent's state instead

`:12-14` declares `const emit = defineEmits<{ select: [id: string] }>()`. `emit` is **never called**;
`PaperSearch.vue:31-34` renders `<PaperSearchDropdown :search :variant />` with **no `@select`
listener**. Selection instead flows by direct mutation of the prop's internals:
`:47 search.selectResult(r)` → `usePaperSearch.ts:44` `options.navigateTo(r.id)`;
`:48 search.selectedIndex.value = i`; `:68 search.close()`. The published contract advertises an
event-based seam the implementation bypasses, so a consumer that wires `@select` gets silence and a
consumer that wants to veto navigation cannot. `tsconfig.json` sets `strict:true` but **not**
`noUnusedLocals`, so nothing catches the dead binding. Identical dead emit at
`PaperSearchModal.vue:12-14`, and `PaperSearchInput.vue:12-15` shows the correct shape
(`emit('expand')` at :52, consumed at `PaperSearch.vue:29`) — the pattern is understood and simply
not applied here.
**Falsifier:** any `@select` / `onSelect` binding on this component — `grep -rn "PaperSearchDropdown"
web/src` returns exactly two lines, both in `PaperSearch.vue`, neither a listener.

### C-9 · MAJOR · Module-global, instance-blind, unclearable result cache

`paperSearchIndex.ts:196`: `let _cache: Map<string, SearchResult[]> = new Map()` — module scope,
keyed by **query string alone**, never keyed by index identity, never cleared on unmount, pruned
only by `if (_cache.size > 200) _cache.clear()` (:214). Each cached row is a full spread copy of the
entry (`:234 { ...entry, score, matches }`) carrying `plainText` up to 500 chars (:385) plus the
duplicate `_lc` block (:271-279). Worst case ~200 queries × 30 rows of ~1 KB retained for the page's
lifetime. The producer's answer is in the export list: `clearSearchCache(index?)`
(`fuzzySearchIndex.d.ts`), *"Pass an index to clear only that instance."*
**Falsifier:** a second `buildSearchIndex` call site would make cross-instance poisoning live —
there is exactly one (`usePaperSearch.ts:18`, from a single static `paperSections`), so today the
defect is *retention + un-cleanability*, not cross-talk. Stated at that strength.

### C-10 · MAJOR · Prefix-narrowing silently truncates recall

`paperSearchIndex.ts:219-228`:

```ts
let candidates = index;
if (q.length > 1) {
    const prefixResults = _cache.get(q.slice(0, -1));
    if (prefixResults) candidates = prefixResults;   // already .slice(0, maxResults)
}
```
The cached prefix entry is the **top-30** (`:239 scored.slice(0, maxResults)`), so any entry that
ranked 31st or worse for the prefix can never re-enter for the longer query — even when the longer
query is precisely what it matches best. The failure is sharpest exactly where multi-token AND
semantics change the field that wins (`:179-187 scoreEntry` picks the best-weighted field per
query): typing `"thm 3"` narrows inside the top-30 of `"thm "`, dropping every theorem whose *number*
field would have scored 18× on the new token.
**Falsifier:** results are re-scored, not merely filtered (`:231-236` does re-score) — true, but
re-scoring a truncated candidate set cannot recover a dropped row. A corpus small enough that
fewer than 30 entries ever match any prefix would mask it; `paperSections` is the whole paper.
`UNPROVEN-NEEDS-LIVE` for a concrete query pair.

### C-11 · MAJOR · No listbox semantics: the popup is 30 anonymous buttons

The plate carries no `role="listbox"`, the rows no `role="option"` / `aria-selected`, the input no
`aria-expanded` / `aria-controls` / `aria-activedescendant` (`PaperSearchInput.vue:37-46`), and
nothing is announced when `selectedIndex` moves. `Button` renders a real `<button>`
(`button-BNDWhAZb.js`, `as: { default: "button" }`), so assistive tech hears "button" thirty times
inside a generic div while the arrow keys move an invisible cursor (C-4). `@axe-core/playwright` is
a declared devDependency and is used at `e2e/visualization-ux.spec.ts` and
`e2e/visualization-crud.spec.ts` — **but the paper search has no e2e spec at all**
(`grep -rln search web/e2e` → `gallery.spec.ts` only, and that is the gallery slug filter). The
producer's `FuzzySearch.vue` is the pre-built alternative (C-6); glass-ui also exports `./command`,
a reka-ui `Command` with listbox roles built in.
**Falsifier:** an `aria-*` attribute anywhere in the four search SFCs — `grep -rn "aria-\|role=" 
web/src/components/paper/search/` → no hits.

---

## §3 — MINOR

| id | sev | claim | provenance | falsifier |
|---|---|---|---|---|
| **C-12** | MINOR | `highlightFuzzy` re-runs the full tokenised fuzzy matcher for **every row on every render**, including every hover. The compiled render emits `innerHTML: _ctx.highlightFuzzy(_ctx.resultLabel(r), …)` inside `_renderList` with patchFlag `8 /* PROPS */` — the call happens during render, before diffing, so Vue's patch skip cannot elide it. `@mouseenter` (:48) writes `selectedIndex`, which re-renders the list ⇒ 30 highlight recomputations per hovered row. | `:58`; compiled render (Receipt 2); `searchHelpers.ts:34-70` | Memoisation via `computed` per row, or a `v-memo`, would break the claim — neither is present. `UNPROVEN-NEEDS-LIVE` for the wall-clock cost. |
| **C-13** | MINOR | Highlights are computed from the **live** query while rows come from the **debounced** query — for 120 ms after each keystroke the marks disagree with the list. | `:58` uses `search.query.value`; `usePaperSearch.ts:24-37` feeds `results` from `debouncedQuery` | Pass `debouncedQuery` instead. The window is exactly the `120` at `usePaperSearch.ts:32`. |
| **C-14** | MINOR | `SearchResult.matches` — computed (`paperSearchIndex.ts:185, 234`), documented (`:50-51 "Matched character indices into the display label"`), shipped on every row — is **read by nothing**. `grep -rn "\.matches\b" web/src` finds only the producer-internal uses at `paperSearchIndex.ts:153,185` and `searchHelpers.ts:45` (its own re-run) plus three unrelated `matchMedia().matches`. `searchHelpers.ts:33` calls itself *"Falls back to re-running fuzzyMatch"* — there is no primary path to fall back from. | `paperSearchIndex.ts:48-52,185,234`; `searchHelpers.ts:33-47` | The field is only *usable* when `resultLabel` returns `r.label`; it returns `rawTex`/`plainText` otherwise (`searchHelpers.ts:25-28`) — which is why the re-run exists. The fix is to key the payload to the display string, not to keep both. |
| **C-15** | MINOR | Index-space mismatch in `highlightFuzzy`: `matchSet` holds **UTF-16** indices from `fuzzyMatch(token, textLc)` (`paperSearchIndex.ts:84-87` indexes `text[ti]`) but they are applied to `chars = [...text]`, a **code-point** array (`searchHelpers.ts:52`); and they are derived from `text.toLowerCase()` (:39), which can change length. Astral math alphanumerics (𝔉, 𝓕) are plausible in a Fourier paper's `rawTex` labels. | `searchHelpers.ts:38-67` vs `paperSearchIndex.ts:84-87` | For BMP-only, length-preserving text `[...text].length === text.length` and the two spaces coincide exactly — so the defect is latent on ASCII labels. |
| **C-16** | MINOR | `v-html` is used where the producer ships a no-innerHTML alternative: `useTextHighlight("fuzzy-search")` paints via the CSS Custom Highlight API and takes a `HighlightMatcher` of exactly this shape. | `:58`; `glass-ui/dist/composables/motion/useTextHighlight.d.ts` | The escaping is sound (see S-4) — this is an idiom claim, not a security claim. |
| **C-17** | MINOR | The `:key` embeds the array index (`` `${r.id}-${r.type}-${i}` ``), defeating keyed reuse: any reordering re-creates every row. It is also an admission that `r.id` collides — `paperSearchIndex.ts:335` and `:351` both push `id: sectionId` for *code* and *proof* entries, so one section with two code blocks yields duplicate `(id,type)` pairs. | `:43`; `paperSearchIndex.ts:334-356` | Dropping `i` without first making ids unique would produce duplicate-key warnings — so the fix is upstream, in `pushEntry`. |
| **C-18** | MINOR | `defineExpose({ resultsRef })` has no consumer. `grep -rn resultsRef web/src` → four hits, all inside this file; `PaperSearch.vue:31-34` renders the component without a `ref`. | `:30`; `PaperSearch.vue:31-34` | — |
| **C-19** | MINOR | The `"sidebar" \| "floating"` union is re-declared inline in four places instead of being exported once — and the producer names the identical union in `FuzzySearch.vue.d.ts`. | `:9`; `PaperSearch.vue:10`; `PaperSearchInput.vue:10`; `glass-ui/.../FuzzySearch.vue.d.ts` | — |
| **C-20** | MINOR | The result-row markup (badge + number + label, `:50-59`) is duplicated **verbatim** in `PaperSearchModal.vue:92-101`, with only the key prefix and one extra class differing. Two copies of a 10-line block that must stay in sync across a badge-type change. | `:50-59` vs `PaperSearchModal.vue:92-101` | The modal adds `search-modal-result` (`:87`) — a real difference, curable by one prop. |
| **C-21** | MINOR | Motion half-tokenised: `PaperSearch.vue:227-229` reads `--ease-standard` / `--ease-out-expo` (the A.W3.d pass) but hardcodes `0.15s` twice, while glass-ui ships `--duration-instant: 0.1s` / `--duration-fast: 0.2s` / `--duration-normal: 0.3s`. `keyframes.js@4.3.0` is installed and used at `useFourierMorph.ts:14` — this transition consumes neither. | `:35`; `PaperSearch.vue:225-236`; `glass-ui/dist/styles/**` duration tokens | Durations may be deliberately off-token; no producer rule forbids a literal. Filed MINOR. |
| **C-22** | MINOR | Badge typing and colour arms are both under-specified. `TYPE_LABELS: Record<string, string>` (`searchHelpers.ts:8`) is not keyed to `SearchEntry["type"]`, so a typo'd key type-checks. `bibliography` (`:19`) is **never emitted** — no branch in `processContentBlocks` (`paperSearchIndex.ts:289-358`) or `walkSections` (`:369-395`) produces it: dead label + dead union member (`:30`). Only 6 of 13 types get a `data-type` colour arm (`PaperSearch.vue:150-166`); the other 7 fall to neutral `--muted`. Those arms hardcode `hsl(210 80% 45%)` / `hsl(280 60% 45%)` with **no dark-mode arm** — the one place in this seam where a producer colour token (or `value.js`, pinned at 0.13.0 and consumed 0 times here) is actually owed. `paperSearchIndex.ts:317`'s `thm.type as SearchEntry["type"]` is sound today (latex-paper's 7 members ⊂ the local 13) but the pin is `^0.2.1` — a producer widening lands an unstyled badge silently. | `:50-51`; `searchHelpers.ts:8-22`; `paperSearchIndex.ts:19-32,317`; `PaperSearch.vue:137-166`; `latex-paper/dist/flattenPaperSections-CN98CCOQ.d.ts` `PaperTheoremData.type` | The arms are dead anyway under C-1 — but they are what the cure will restore, so the dark-mode gap is a pre-existing bug the repair must not re-ship. |

---

## §4 — SUPERLATIVES (L-18 runs both ways)

- **S-1 · The `class` seam through `<Button>` is correct — I tried to break it and could not.**
  I expected `class="paper-search-result"` + `:class="{ 'is-selected': … }"` (:45-46) to be dropped
  by a component that declares a `class` prop. It is not: `button-BNDWhAZb.js` declares
  `class: { type: [Boolean, null, String, Object, Array] }` and renders
  `class: cn(buttonVariants({variant, size}), props.class)`, so Vue's normalised class string lands
  on the root `<button>`. `resultsRef.value?.querySelector(".is-selected")` (:24) therefore **cannot**
  fail for a fallthrough reason. Falsifier that would have made this a second blocker —
  `inheritAttrs:false` without a class merge — is absent from the dist.
- **S-2 · The dirty-tree edit is right, and the committed state is worse.** The sole WT change is
  `class="… glass-elevated"` → `class="… glass-floating"` (:39) — lane-frontend §5 :504 books it in
  the 3.1.0→4.0.0 rename sweep. `grep -rn "glass-elevated" glass-ui/dist` → **0 hits**;
  `glass-floating` is a real member of the material selector group. The uncommitted line is the
  correct one; HEAD `cd26c65` paints a class that does not exist.
- **S-3 · The index walk is exhaustive against what the parser actually emits.** `walkSections`
  (`paperSearchIndex.ts:369-395`) reads only `section.content` + `section.subsections`, never the
  `theorems?` / `figures?` / `codeBlocks?` / `proofs?` arrays that `PaperSectionData` also declares —
  which looked like a coverage hole. It is not: the producer derives them,
  `latex-paper/dist/chunk-A7GY23HR.js:782`
  `const theorems = content.filter(b => … "theorem" in b).map(b => b.theorem)`, emitted only via
  `…(theorems.length > 0 && { theorems })`. Walking `content` misses nothing.
- **S-4 · The `v-html` seam is closed by construction.** `highlightFuzzy` routes **every** emitted
  segment through `escapeHtml` — the `<mark>` interiors (`searchHelpers.ts:61`), the unmatched runs
  (:64), and both early returns (:35, :49). `<`/`>`/`&` are escaped, which is exactly the element-content
  requirement (attribute-context quoting is not needed here). The payload is additionally a
  build-time artifact (`virtual:paper-content`, `lib/paperContent.ts:7`), not user input. The
  highlighter cannot be used to inject markup.
- **S-5 · `usePaperSearch` matches the producer's defaults on every tunable it shares.** 120 ms
  debounce (`:32`) = `UseFuzzySearchOptions.debounceMs` default 120; `maxResults` 30 (`:36`) =
  producer default 30; `watch(results, () => selectedIndex.value = 0)` (`:39-41`) is the correct
  invalidation that a hand-rolled list usually forgets. Whoever wrote this knew the shape — which is
  precisely why C-6's shadow reads as a fork rather than an accident.

---

## §5 — Corpus reconciliation

| corpus row | this challenge |
|---|---|
| intake **R3-11** (TRUE) — the instance registry duplicates `PaperSearchModal.vue:41` and omits `FullscreenViewer.vue:105`; 2 live `<Teleport>` | **EXTENDS.** The same Teleport boundary that broke the registry join also severs the parent scope id: `PaperSearch.vue:239-396`'s ~30 `.search-modal-*` rules are dead by the identical mechanism as C-1. The registry defect and the style defect are the same blind spot in two tools. |
| intake **R3-12** (TRUE) — "35 open-family records collapse to 28 unique; duplicated rows per R3-HA-004 include **both Paper-search callsites**" | **CORROBORATES from the other side.** The duplication R3 saw in the registry is real in the tree: C-20 shows the result-row markup is genuinely duplicated between `PaperSearchDropdown.vue:50-59` and `PaperSearchModal.vue:92-101`, and C-8 shows both copies carry the same dead `select` emit. The 7 over-counted rows are not a pure join artifact — at least two of them mirror a real code clone. |
| intake **R6-8** (TRUE, +root cause) — an API-operation record that embeds derived client back-references cannot attribute a defect to one side of the seam | **NOT REACHED — verified negative.** This component has zero API coupling (C-24). Its data is the build-time virtual module `virtual:paper-content` (`lib/paperContent.ts:7`); `grep -rn "lib/api" web/src/components/paper/search/` → no hits. None of the 45 operations (intake §0; X-3's 45 total / 30 public / 13 admin) is reachable from this file, so the operation↔client entanglement cannot be exercised here. Recorded so F.W5 does not budget this component. |
| **CENSUS §1** — value.js live surface = 5 statements / 4 files / 6 symbols, easing-only | **AGREES, and this file is outside it.** `grep -rn "@mkbabb/value.js" web/src` → `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`, `easings.ts:9,16`. `PaperSearchDropdown.vue` consumes **zero** value.js and **zero** keyframes.js — it is inert to the tri-package deadlock (lane-frontend §5). Its *entire* producer exposure is glass-ui `./button` (:3) and, transitively, `@mkbabb/latex-paper` types. |
| **lane-frontend §4 :438** — `PaperSearch.vue` + `search/` (6 files, 397+435 LOC) vs unimported `./search` | **SHARPENED, not repeated.** C-6 supplies the interface-level proof (identical state members, identical variant union, identical defaults, character-identical scorer docblock) plus two producer cures the census did not name: `clearSearchCache` (C-9) and `useTextHighlight` (C-16). |
| **lane-frontend §5 :504** — the WT diff line `glass-elevated` → `glass-floating` | **CONFIRMED at the call site** (S-2), with the added fact that `glass-elevated` has zero occurrences in installed 4.0.0 — i.e. HEAD is broken and the dirty tree is the repair. |
| **CENSUS §2 C-3** — "≈51 files, 95 glass-ui import statements; re-measure at wave-open" | No contradiction; this file is one of the three `@mkbabb/glass-ui/button` sites the lane lists at :288-290. |

**No corpus row is contradicted.**

---

## §6 — INFO / verified negatives

- **C-23 · INFO · Zero fourier-API surface.** See §5, R6-8 row. Falsifier: any `lib/api` import in
  the search subtree — none.
- **C-24 · INFO · Bump-inert on value.js and keyframes.js.** Zero imports of either. The tri-package
  atomic transaction (`glass-ui 4→7 ∧ keyframes 4.3→6 ∧ value.js 0.13→4.0`, lane-frontend §5) costs
  this file nothing *directly* — but glass-ui 7.0.0 keeps `./search` (lane-frontend :438), so the
  uplift is the natural moment to retire the fork (C-6) rather than re-port dead CSS.
- **C-25 · INFO · The one producer-shape risk that is real but not yet live.** `latex-paper` is
  pinned `^0.2.1`; `PaperTheoremData.type` is a 7-member union today, all 7 inside the local 13
  (`paperSearchIndex.ts:19-32`), so `:317`'s cast is sound. A caret bump adding `remark` /
  `conjecture` widens it silently into an unlabelled, uncoloured badge. See C-22.

---

## §7 — Repair order (so the cure does not ship the regression)

1. **C-1 + C-3 together.** Move the `.paper-search-*` / `.search-dropdown-*` rules into
   `PaperSearchDropdown.vue`'s own `<style scoped>` **and** raise the backdrop/plate z-order apart in
   the same edit — the plate above the backdrop, not equal to it. Do the identical move for
   `.search-modal-*` → `PaperSearchModal.vue` (the Teleport case). Landing the move alone converts a
   cosmetic blocker into a functional one.
2. **C-7 before C-2.** Decide whether the rows are `<Button>` at all. If they stay, the override set
   is six declarations and must be written against the CVA, not against a native `<button>`.
3. **C-4 + C-11 together.** Selection state should be one thing: `aria-selected` / `role="option"`
   *is* the styling hook, and glass-ui paints off aria state already.
4. **C-6 last, as its own wave.** Port the field weighting (`paperSearchIndex.ts:171-177`) onto
   `useFuzzySearch`, then delete the fork. Doing this first would make 1–3 wasted work; doing it
   never leaves `clearSearchCache` (C-9) and `useTextHighlight` (C-16) permanently re-invented.

---

## §8 — Method and limits

- **Read-only** in `/Users/mkbabb/Programming/fourier-analysis` throughout; the only write anywhere
  is this file. No product source in any repo was modified. `scripts/dev/dev.sh` untouched.
- Tools: `grep` / `find` / `git log|show|status|diff` / `python3` (JSON + `.d.ts` reads) / `node`
  with the repo's own `@vue/compiler-sfc` and `@vue/runtime-core` (both read from
  `web/node_modules`, output written only to the session scratchpad).
- **No browser tooling.** Nine claims carry a rendered-DOM component and are marked
  `UNPROVEN-NEEDS-LIVE` at the point of use (C-1 screenshot, C-2 measured height, C-3 click trace,
  C-4 screenshot, C-10 query pair, C-12 wall-clock). Every *mechanism* behind them is closed
  statically.
- Producer contracts were read from **installed** dist under `web/node_modules/@mkbabb/`, never from
  the sibling producer repos — the consumer resolves what is installed (glass-ui **4.0.0**,
  value.js **0.13.0**, keyframes.js **4.3.0**, latex-paper **0.2.1**), matching CENSUS §1.
- Substrate: fourier HEAD `cd26c65` with the 24 in-scope dirty `web/src` paths — identical to the
  coordinate the intake §0 certifies as *"not stale-at-HEAD."*

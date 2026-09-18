claude-opus-5[1m]

# CHALLENGE · `PaperSearchModal` · axis C (CONSUMPTION)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/search/PaperSearchModal.vue` (124 lines)
**Axis** how this component consumes value.js 0.13 / keyframes 4.3 / glass-ui ^4.0.0 / the 45-operation fourier API; props+emits contract quality; integration seams.
**Method** static + source-derived only. No browser tooling. Producer contracts read from `web/node_modules/@mkbabb/*` (the *installed* tree, which is the tree that ships). Vue semantics re-derived from `@vue/runtime-core@3.5.38` and `@vitejs/plugin-vue@6` source, not from memory. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture** component assumed DEFECTIVE until the tree proves otherwise. Every claim carries a falsifier; the superlatives carry them too (L-18 runs both ways). One probe is recorded as **CLEARED** — the falsifier killed it, and that is reported rather than buried.

**Tally — defects 14 (blockers 2) · superlatives 5 · cleared probes 1.**

---

## §0 · The import closure actually read

| File | LOC | Why in closure |
|---|---|---|
| `search/PaperSearchModal.vue` | 124 | subject |
| `search/usePaperSearch.ts` | 108 | `:5` type import, and the *sole* runtime contract (every behaviour is `props.search.*`) |
| `search/searchHelpers.ts` | 74 | `:6` value import |
| `search/paperSearchIndex.ts` | 401 | transitive via both of the above |
| `search/index.ts` | 4 | barrel (subject is **not** exported from it — see C-14 note) |
| `paper/PaperSearch.vue` | 397 | the only mount site (`:35`) **and the physical owner of every CSS rule this component names** |
| `paper/PaperSearchInput.vue` / `PaperSearchDropdown.vue` | 69 / 70 | siblings sharing the same state prop + the same dead rules |
| `paper/PaperView.vue` | ~600 | constructs the single `usePaperSearch` (`:111`) |
| `paper/PaperSidebar.vue:51`, `paper/MobileFloatingToc.vue:111` | — | the **two** `PaperSearch` hosts (C-2) |
| `@mkbabb/glass-ui@4.0.0` — `button`, `search`, `command`, `dialog`, `styles/tokens/*` | — | the consumed and the *unconsumed-but-shipping* producer surface |
| `@mkbabb/latex-paper@0.2.1` `flattenPaperSections-CN98CCOQ.d.ts` | — | the upstream union behind `SearchEntry["type"]` |

---

## §1 · Findings

### C-1 · **BLOCKER** · Every style rule this component names is unreachable. The modal ships unstyled.

`PaperSearchModal.vue` has **zero `<style>` blocks** (verified: `@vue/compiler-sfc.parse(...).descriptor.styles.length === 0`). All 31 rules it depends on live in `PaperSearch.vue`'s single `<style scoped>` (`PaperSearch.vue:39-386`). Compiling that block with `compileStyle({scoped:true})` emits, verbatim:

```
.search-modal-overlay[data-v-Z] { … }   .search-modal[data-v-Z] { … }
.search-modal-header[data-v-Z] { … }    .search-modal-input[data-v-Z] { … }
.search-modal-results[data-v-Z] { … }   .search-modal-result[data-v-Z] { … }
.search-modal-empty[data-v-Z] { … }     .search-modal-footer[data-v-Z] { … }
.search-modal-hint kbd[data-v-Z] { … }  … + the 8 .search-modal-{enter,leave}-* transition rules
```

The attribute lands on the **subject element itself**, so a match requires `data-v-<PaperSearch>` to be present on `div.search-modal-overlay` (`:45`), `div.search-modal` (`:48`), `input.search-modal-input` (`:55`), … . It is not, and cannot be:

1. `@vitejs/plugin-vue/dist/index.mjs:1326` — `if (hasScoped) attachedProps.push(['__scopeId', …])`. `PaperSearchModal.vue` has no scoped block ⇒ **no `__scopeId`** ⇒ none of its own vnodes carries a scope id.
2. `@vue/runtime-core/dist/runtime-core.cjs.js:5676-5700` (`setScopeId`) — the parent's scope id is re-applied to a child's DOM **only** when `vnode === parentComponent.subTree`, i.e. only to the child component's *root* element.
3. This component's `subTree` is a **`Teleport` vnode**, not an element. Compiled root: `return (_openBlock(), _createBlock(_Teleport, { to: "body" }, [ … ]))`. The overlay div is a *child* of the Teleport, never `=== subTree`, and `TeleportImpl.process` threads `slotScopeIds` but never a `scopeId` to its mounted children.
4. The `filterSingleRoot` escape hatch at `:5687` is gated on `patchFlag & 2048` (`DEV_ROOT_FRAGMENT`) and on the subtree being a *Fragment*. A single `Teleport` root is neither. **Dead in dev and in prod alike** — no dev/prod asymmetry to hide behind.

Classification of the whole 48-rule scoped block by the same compile: **5 live, 43 dead.** Live = `.paper-search`, `.paper-search-input-wrap`, `.paper-search-input-wrap:focus-within`, `.paper-search--sidebar`, `.paper-search--floating .paper-search-input-wrap` — i.e. exactly `PaperSearch.vue`'s own root plus `PaperSearchInput.vue`'s root element, precisely as the runtime rule predicts. Everything else, including all 31 rules this component consumes, matches nothing.

**Consequence, source-derived.** `Teleport to="body"` (`:41`) appends the overlay as the last child of `<body>`, *outside* the app root. With `position:fixed / inset:0 / z-index:var(--z-modal) / backdrop-filter` all dead, the "overlay" is a static block-flow div rendered **below the entire page**, the panel has no width/border/background, the results list has no `max-height`/`overflow-y`, the `<kbd>` hints are unboxed, and both the enter and leave transitions are inert (Vue still adds `.search-modal-enter-active` etc.; no rule answers).

**Independent LIVE corroboration, from fourier's own corpus.** `docs/audits/runs/2026-06-17-M-critique-audit/raw-findings.json` records the *sibling* prediction six times over from six independent lanes — `A2-08`, `A4-03` (severity **critical**), `CHR-07`, `B1-PAPER-03`, `B6H-01`, `C2-R1-search-focus-square-offset` — all citing `user-critique/11-search-offset-square.png`: *"a BLUE SQUARE ring sits OUTSIDE the rounded search field, mis-positioned."* That is the exact predicted artifact: `.paper-search-input-wrap` (child **root** ⇒ scoped, rounded, bordered ✓) surrounding an `<input>` whose `outline: none` (`PaperSearch.vue:73`) is a **descendant** rule that never applied ⇒ native UA ring, square, offset. The A4 verdict text is self-refuting on its own terms — *"the `outline: none` is on the `<input>` element itself, NOT on the wrapper — so the blue outline on the `<input>` is offset"* — an `outline:none` that applied could not leave an outline. **I contradict all six adjudications explicitly: the root cause is scope-id unreachability, not an unadopted focus-ring primitive.** The primitive gap (C-4) is real and separate; adopting `.input-pill` would have *masked* this by moving the rule to a global layer.

**Falsifier (and it held).** Any of these would kill the finding: (a) a `<style>` block in `PaperSearchModal.vue` — there is none; (b) a global (non-scoped) definition of `search-modal*` — `grep -rln "search-modal" web/src` returns exactly `PaperSearch.vue` and `PaperSearchModal.vue`, and glass-ui's own family is `fuzzy-search-*`; (c) `:deep()` on the parent rules — the block uses `:deep()` once only, at `.paper-search-label :deep(mark)`, and even that is anchored on an unreachable ancestor; (d) a Vue path that pushes scope ids through Teleport — read the renderer, there is none.
**Gate that should have caught it and did not:** `web/e2e/` has 8 specs and **zero** touch the paper search (`grep -rn "search" web/e2e/*.spec.ts` → only `gallery.spec.ts`, a different Search-by-slug dock). Corpus: vitest is ABSENT (`CENSUS-2026-08-03.md` "§ Hygiene banked / gaps").
**UNPROVEN-NEEDS-LIVE (SS-13):** the exact rendered appearance / scroll position of the unstyled panel.

---

### C-2 · **BLOCKER** · Two `PaperSearchModal` instances are mounted against one shared `isExpanded` ⇒ two modals, and `document.querySelector` drives the wrong one.

`PaperView.vue:111` builds **one** state: `const search = usePaperSearch({ sections: paperSections, navigateTo })`. It is then handed to **two** `PaperSearch` hosts:

- `PaperSidebar.vue:51` — `<PaperSearch :search="search" variant="sidebar" />`, mounted **unconditionally** (`PaperView.vue:335`). `PaperSidebar.vue:132-136`: `.paper-sidebar { display: none }`, lifted to `display:block` only at `@media (min-width:1024px)`. **CSS-hidden, not unmounted.**
- `MobileFloatingToc.vue:111` — `<PaperSearch :search="search" variant="floating" />`, inside `v-if="searchActive"` under a root carrying `lg:hidden` (`:107`); the host itself is `v-if="!mobileTocVisible"` (`PaperView.vue:320`), a *scroll* condition, not a viewport one.

Each `PaperSearch` unconditionally renders one `PaperSearchModal` (`PaperSearch.vue:35`), and each modal unconditionally `Teleport`s to `body` (`:41`) with `v-if="search.isExpanded.value"` (`:44`) — **the same ref**. `display:none` on `.paper-sidebar` cannot suppress the sidebar modal, because teleported content is relocated out of that subtree by construction.

**Failure scenario (concrete).** Viewport < 1024px. Scroll past the TOC sentinel ⇒ `mobileTocVisible=false` ⇒ `MobileFloatingToc` mounts. Tap the mobile search icon ⇒ `searchActive=true` ⇒ the *second* `PaperSearch` mounts. Type a query, tap Expand ⇒ `isExpanded=true` ⇒ **two** `.search-modal-overlay` subtrees now sit in `document.body`. Both `watch`ers at `:19-24` fire `modalInputRef.value?.focus()` in the same `nextTick` — the second silently steals focus from the first. Then `:32`, `document.querySelector(".search-modal-results")`, returns the **first in document order** — the *sidebar's* modal, the one the user is not looking at — so every ↑/↓ scroll-into-view is applied to the wrong list while the visible list never scrolls.

**Falsifier.** Killed if either host unmounted the other, or if `isExpanded` were per-instance. Neither: one `usePaperSearch` call site (`grep -rn "usePaperSearch(" web/src` → `PaperView.vue:111` only), two `<PaperSearch` sites (`PaperSidebar.vue:51`, `MobileFloatingToc.vue:111`), zero `v-if` gating either modal on viewport.
**Corpus fold.** `intakes/lane-fourier-r3-r6.md` R3-11 / X-6 adjudicated the Codex registry as carrying `PaperSearchModal.vue:41` **twice** and called it a registry-*join* defect (identical `callsiteId F.CS3.d06624ce…`). That adjudication is correct about the join. I add — **without contradicting it** — that the duplicate is also independently true of the *tree*: one callsite, **two mounted instances**. The census's mounted-instance model (`CENSUS-2026-08-03.md §2`, "1,105 mounted subjects", "mounted-instance denominator OPEN") should count 2 here.
**UNPROVEN-NEEDS-LIVE (SS-13):** whether a real mobile run reaches `searchActive ∧ !mobileTocVisible ∧ isExpanded` simultaneously (it is reachable by construction; the ordering is a UI sequence, not a proof obligation).

---

### C-3 · **MAJOR** · glass-ui ships `Dialog`/`DialogContent`; this modal hand-rolls one and inherits none of the dialog contract.

`@mkbabb/glass-ui/dialog` is a published subpath of the installed 4.0.0 (`node_modules/@mkbabb/glass-ui/package.json exports["./dialog"]` → `components/ui/dialog`, reka-ui-backed, chunk `DialogContent-DDE6pQBU.js`). It is imported **zero** times by fourier. The hand-rolled replacement (`:41-123`) therefore lacks, item by item:

| Contract | glass-ui `DialogContent` | `PaperSearchModal.vue` |
|---|---|---|
| `role="dialog"` + `aria-modal="true"` | reka-ui `DialogContent` | absent (`:43-47` bare div) |
| accessible name | `DialogTitle` required | absent |
| focus trap | reka-ui `FocusScope` | absent — Tab from `:52` walks straight into the page behind |
| focus restore on close | reka-ui | absent |
| background `inert` / scroll lock | reka-ui `DismissableLayer` + `body` lock | absent (and `position:fixed` is dead per C-1) |
| Escape-to-dismiss | layer-level, focus-independent | **input-only** — `@keydown="search.onKeydown"` is bound solely to `:59`. Move focus to either action `Button` (`:61`, `:70`) by Tab and Escape is dead; `usePaperSearch.ts:80-88` never registers a document listener. |
| listbox semantics | — | rows are `<Button>`s, not `role="option"`; the input is not `role="combobox"`, has no `aria-expanded`, no `aria-activedescendant`, no `aria-controls`, and the selected row (`:88`) is announced by nothing |

`@axe-core/playwright` is a devDependency (`web/package.json`) but no spec opens this modal, so the a11y gate is structurally blind to all of the above.
**Falsifier.** Killed if any of these were provided elsewhere. `grep -n "role=\|aria-" PaperSearchModal.vue` → **0 hits**; `grep -rn "@mkbabb/glass-ui/dialog\|DialogContent" web/src` → **0 hits**; `usePaperSearch.ts` has no `onMounted`/`addEventListener`.

---

### C-4 · **MAJOR** · HARD SHADOW (escalation): `@mkbabb/glass-ui/search` is a *verbatim superset* of the whole PaperSearch family, and it is not merely "a similar primitive".

The corpus files this as a 🟡 **CANDIDATE** shadow (`formation/fourier/lane-frontend.md:438`; `CENSUS-2026-08-03.md:99` "PaperSearch family (832 LOC) vs `./search`+`useFuzzySearch`"). Reading the installed producer chunk `node_modules/@mkbabb/glass-ui/dist/search.js` **escalates this to HARD** — the producer is not an analogue, it is the same code generalised:

| Evidence | fourier fork | glass-ui 4.0.0 `./search` |
|---|---|---|
| scorer doc-comment | `paperSearchIndex.ts:52-62`: `+8 / +7 / +6 / +5 / +3 / +1 / −0.1` | `composables/fuzzySearchIndex.d.ts`: **the same seven lines, identical prose** |
| separator set | `" -_./\\:()"` (`:96`) | `" -_./\\:()"` (compiled `search.js`) |
| state shape | `PaperSearchState` = `{query, results, isOpen, isExpanded, selectedIndex, selectResult, close, open, toggleExpanded, onKeydown}` (`usePaperSearch.ts:95-107`) | `FuzzySearchState` — **the same ten members, same names, same order** |
| debounce / cap | hard-coded `120` (`:32`), hard-coded `30` (`:35`) | `debounceMs ?? 120`, `maxResults ?? 30` — the fork's constants are the producer's *defaults* |
| host component | `PaperSearch.vue` (`variant:"sidebar"\|"floating"`, `defineExpose({focus})`) | `FuzzySearch.vue.d.ts`: `{state, variant?: "sidebar"\|"floating", placeholder?, typeLabel?}`, `expose {focus}` — **prop-for-prop** |
| modal geometry | `width:min(36rem,…)`, `padding-top:min(12vh,6rem)`, `max-height:70vh` (`PaperSearch.vue:242-262`) | `!max-w-[36rem] !top-[12vh] max-h-[70vh]` |
| modal strings | `"No results"` (`:105`); `↑↓ navigate / ↵ select / esc close` (`:110-118`) | byte-identical, same three `<kbd>` groups, same order |
| row `:key` | `` `modal-${r.id}-${r.type}-${i}` `` (`:85`) | `` `modal-${t.item.id}-${t.item.type}-${n}` `` |
| collapse icon | `Minimize2` (`:68`) | `Minimize2` |

The producer additionally ships what the fork lacks: `useTextHighlight` (CSS Custom Highlight API — no `v-html`), `clearSearchCache` + `onScopeDispose` teardown, per-index `WeakMap` caching, `type="button"` on every button, reka-ui `Popover` for the dropdown and reka-ui `Dialog` for the modal (⇒ C-3 discharged for free), and a `flush:"post"` highlight watcher. `grep -rn "@mkbabb/glass-ui/search\|useFuzzySearch" web/src` → **0**.

fourier's own audit corpus already reached this conclusion once and it did not land: `docs/audits/runs/2026-06-17-M-critique-audit/raw-findings.json` **D4-05**, severity *high* — *"PaperSearch hand-rolled modal overlay + search input — glass-ui SearchBar / FuzzySearch unadopted."* Six weeks stale at the time of this challenge.

**Falsifier.** Killed if the fork carried capability the producer lacks. Two candidates, both examined: (i) badge `data-type` colouring — the producer's `typeLabel` hook plus a `Badge variant` covers the label, though the per-type *palette* is fork-local (and dead per C-1, and hard-coded per C-12); (ii) `number` as a distinct rendered column (`:95-97`) — the producer folds it into `label`. Both are ~10-line reconciliations against a 391-LOC fork; neither survives as a reason to keep the fork.
**Migration note.** `SearchableItem` is `{id, label, text, type?}` — a strictly *flatter* shape than `SearchEntry` (which carries `sectionId`, `number`, `rawTex`, `depth`, `_lc`). Adoption is a projection at `buildSearchIndex`, not a rewrite. Field-weight parity check: fork weights `number 18 / label 12 / type 10 / rawTex 6 / plain 3`; producer `label 12 / type 10 / text 3` — the `number`-first weighting is the one behaviour that must be preserved by folding the number into `label`.

---

### C-5 · **MAJOR** · The prefix cache stores the **truncated** result list, so typing a query and pasting it return different results.

`paperSearchIndex.ts:186-232`:

```ts
let _cache: Map<string, SearchResult[]> = new Map();           // :186 — module-global
…
if (q.length > 1) { const prefixResults = _cache.get(q.slice(0, -1));
                    if (prefixResults) candidates = prefixResults; }   // :212-217
…
const results = scored.slice(0, maxResults);                    // :228
_cache.set(q, results);                                         // :229  ← the SLICED list is cached
```

The cached value is post-`slice`. The next keystroke's candidate set is therefore capped at 30 **entries**, not 30 *displayed* results. A row that is 31st for a prefix is deleted from the search space permanently, for every longer query.

**Failure scenario.** The paper index (`buildSearchIndex`, `:389-393`) emits one entry per section + theorem + equation + figure + code + proof, comfortably in the hundreds. Take an entry whose display label is "Fourier transform". For `q = "f"` it competes against every other `f`-bearing entry on `_lc.number` (weight 18) and lands, say, 45th ⇒ dropped at `:228`. For `q = "fo"`, `"fou"`, … the candidate set is that truncated 30 ⇒ it is never re-scored. Final state at `q="fourier"`: **absent**. Now reload and *paste* `"fourier"` in one input event: `_cache` has no `"fourie"` key ⇒ `candidates = index` (`:211`) ⇒ full scan ⇒ **present, rank 1**. Same query, same index, two different result sets, decided by input modality. `PaperSearchModal.vue:82-102` renders `search.results.value` directly, so the modal is the visible face of this.

**The producer does not have this bug** — `search.js`: `i.set(r, c)` caches the **full** scored array `c`, and only the *return* is `c.slice(0, n)`. The fork diverged by moving one `.slice()` above the `.set()`.
**Falsifier.** Killed if `_cache.set` stored the unsliced array, or if `results.length < maxResults` always. Neither holds; and the 120 ms debounce (`usePaperSearch.ts:28-33`) makes per-keystroke prefix population the *normal* path for anything typed slower than ~8 chars/sec, i.e. all human typing.
**Related, MINOR-in-place:** `_cache` is module-global and keyed on the query string alone — no index identity, no teardown. Latent cross-contamination if a second index ever exists, plus up to 200 entries × 30 spread-copied `SearchEntry` objects (each carrying `plainText` ≤ 500 chars) retained past unmount. The producer scopes it `WeakMap<index, Map>` and clears it in `onScopeDispose` (`search.js`, `V()` / `clearSearchCache`).

---

### C-6 · **MAJOR** · `document.querySelector(".search-modal-results")` — a global DOM query where the sibling uses a template ref.

`:31-35` reaches into the document by class name. Three separate defects ride on it:

1. **Wrong instance.** Per C-2, two modals can be live; `querySelector` takes the first in document order, deterministically the sidebar's (mounted first).
2. **Coupled to a dead class.** `.search-modal-results` has exactly one definition, and it is unreachable (C-1). The *selector* is the only live consumer of the name, so any rename made while fixing C-1 silently breaks scroll-into-view with no type error and no gate.
3. **Inconsistent with its own sibling.** `PaperSearchDropdown.vue:18` solves the identical problem correctly: `const resultsRef = ref<HTMLElement|null>(null)` … `resultsRef.value?.querySelector(".is-selected")` (`:26`). The subject already imports `ref` (`:2`) and already uses one for the input (`:16`, `:53`). This is a one-line divergence from the pattern the file next door establishes.

**Falsifier.** Killed if a ref were unavailable in a Teleport — it is not; refs work identically inside `<Teleport>`, and `modalInputRef` (`:53`) proves it in this very file.

---

### C-7 · **MINOR** · Dead emits contract: `select` is declared, never emitted, never listened.

`:12-14` declares `const emit = defineEmits<{ select: [id: string] }>()`. `grep -n "emit" PaperSearchModal.vue` → **line 12 only**. `grep -rn "@select\|onSelect" web/src/components/paper/` → **0 hits**; the mount site `PaperSearch.vue:35-37` binds only `:search`. Selection is instead performed by a direct child→parent state mutation, `search.selectResult(r)` (`:89`), so the declared contract is not merely unused but *contradicted* by the actual data path. Identical dead declaration in `PaperSearchDropdown.vue:13-15`.

**Why nothing catches it.** `web/tsconfig.json` sets `strict: true` but **not** `noUnusedLocals`/`noUnusedParameters`, and vue-tsc does not flag an unused `defineEmits` binding. `npm run build` is `vue-tsc -b && vite build` — green.
**Falsifier.** Killed by any `emit("select", …)` call or any `@select` listener anywhere. Neither exists.

---

### C-8 · **MINOR** · No `type="button"` on any glass-ui `Button`; the producer sets it on every one of its own.

`Button.vue.d.ts` declares `type?: ButtonHTMLAttributes['type']`, and the compiled component (`button-BNDWhAZb.js`) shows `props: { …, type: {}, … , as: { default: "button" } }` — **`as` has a default, `type` does not.** With `type` undefined, reka-ui `Primitive` renders `<button>` with no `type` attribute ⇒ HTML default `submit`. The subject omits it at `:61`, `:70`, and on every result row `:83`. glass-ui's own `FuzzySearch.vue` passes `type: "button"` on **all five** of its Buttons (visible in `search.js`) — the producer treats it as part of the idiom.

**Falsifier — and it constrains the severity.** Killed as a live bug if the modal ever sits inside a `<form>`. It does not: it teleports to `body` (`:41`) and `grep -rn "<form" web/src/components/paper/` → 0. So this is contract hygiene against the producer's own usage, not a live submit, and is filed MINOR accordingly.

---

### C-9 · **MINOR** · The modal opts out of the glass depth ladder that its own sibling opts into.

`PaperSearchModal.vue` carries **no** glass-ui surface class — `grep -n "glass-" PaperSearchModal.vue` matches only the `import` on `:3`. The overlay (`:45`) and panel (`:48`) are bare divs backed by hand-rolled `background: var(--background)` + `backdrop-filter: blur(6px)` + a literal `box-shadow: 0 8px 40px rgba(0,0,0,.14)` (`PaperSearch.vue:242-273`). Meanwhile `PaperSearchDropdown.vue:38` **does** consume the ladder (`class="paper-search-results glass-floating"`), as does `MobileFloatingToc.vue:110` (`glass-resting`) and `PaperView.vue:393` (`glass-wash`). glass-ui 4.0.0 ships `ModalOverlay` (chunk `ModalOverlay-CkPRRgl_.js`, reachable through `./dialog`) for exactly this seat. So within one four-file feature the design system is adopted for the dropdown surface and hand-rolled for the modal surface — and per C-1 the hand-rolled half paints nothing at all.

**Falsifier.** Killed if `glass-floating` were inappropriate for a modal plate — but the producer's own modal composes `DialogContent surface="opaque"`, i.e. the ladder has a designated rung for this. Also killed if the raw literals were tokens — they are not (`rgba(0,0,0,0.14)`, `rgba(0,0,0,0.06)` are literal, versus glass-ui's `--shadow-*` family).

---

### C-10 · **MINOR** · `TYPE_LABELS` is untyped against the union it labels, and the `??` fallback is type-dead.

`searchHelpers.ts:8` — `export const TYPE_LABELS: Record<string, string>`. `SearchEntry["type"]` (`paperSearchIndex.ts:18-31`) is a closed 13-member union, and `TYPE_LABELS` happens to carry all 13 today (verified member-by-member). But the declared type creates no link: adding a 14th member to the union compiles clean and the badge silently renders the raw discriminant.

Two compounding facts:
- `:93` `{{ TYPE_LABELS[r.type] ?? r.type }}` — under `Record<string,string>` **without** `noUncheckedIndexedAccess` (absent from `tsconfig.json`), the index expression is typed `string`, so TS considers the `??` right operand unreachable. The guard is real at runtime and invisible to the compiler — the worst of both.
- `paperSearchIndex.ts` `type: thm.type as SearchEntry["type"]` — the cast is *currently unnecessary*: `PaperTheoremData["type"]` is `"theorem"|"definition"|"lemma"|"proposition"|"corollary"|"aside"|"example"` (`@mkbabb/latex-paper/dist/flattenPaperSections-CN98CCOQ.d.ts:93`), a strict subset that assigns without a cast. Its only effect is to **suppress the diagnostic** if `@mkbabb/latex-paper` widens the union in a future release — precisely the cross-package signal the megatranche needs. `Record<SearchEntry["type"], string>` + deleting the cast makes both breakages compile errors.

**Falsifier.** Killed if `TYPE_LABELS` were already keyed to the union, or if the cast were load-bearing. Neither: the declaration is `Record<string, string>`, and the source union is provably a subset of the target.

---

### C-11 · **MINOR** · `v-html` + hand-rolled `<mark>` string building where glass-ui 4.0.0 exports `useTextHighlight`.

`:98-101` sinks `highlightFuzzy(resultLabel(r), search.query.value)` into `v-html`. `searchHelpers.ts:33-70` re-runs `fuzzyMatch` per token per row, builds a `Set<number>`, spreads the label to a char array, and concatenates `<mark>`-wrapped escaped segments — i.e. it re-derives at render time the `matches: number[]` that `SearchResult` already carries (`paperSearchIndex.ts:35`), and then discards it. `scoreEntry` only populates `matches` for the *label* field (`:172`), so for a `number`- or `rawTex`-scored hit the highlighter re-runs against a different string than the one that scored — the second reason it re-derives.

glass-ui 4.0.0 exports `useTextHighlight` from the package root (`dist/index.d.ts:48`), and `FuzzySearch.vue` uses it to paint via the **CSS Custom Highlight API** on a named registry (`glass-search-mark`) — no `innerHTML`, no per-render string building, no escaping obligation. Cost profile: current path is O(rows × tokens × |label|) string work on **every render** of an up-to-30-row list, re-entered on every `selectedIndex` change (`:88` re-renders the list) and every `mouseenter` (`:90`).

**Falsifier.** Killed if `v-html` were unsafe here — it is not (see S-4), so this is efficiency + producer-adoption, not security, and is filed MINOR rather than MAJOR on that basis.

---

### C-12 · **MINOR** · Badge palette hard-codes HSL literals with no dark-scheme variant, bypassing `--viz-*` and the project's own precedent.

`PaperSearch.vue:151-160` (the rules the subject's `:92` `data-type` attribute exists to trigger):

```css
.paper-search-badge[data-type="definition"] { background: hsl(210 80% 55% / 0.12); color: hsl(210 80% 45%); }
.paper-search-badge[data-type="equation"]   { background: hsl(280 60% 55% / 0.12); color: hsl(280 60% 45%); }
```

Literal, scheme-invariant, and with **no `.dark` counterpart** (`grep -n "\.dark" PaperSearch.vue` → 0). The adjacent theorem/lemma/proposition/corollary rule does it correctly (`color-mix(in srgb, var(--primary) 12%, transparent)`), so the inconsistency is internal. glass-ui ships the `--viz-*` family for exactly this (`styles/tokens/color-radius.css:266` — `--viz-amber: var(--section-color-5)`), fourier's own `lib/colors.ts:1-6` documents the house rule (*"Primary viz colors are derived from CSS custom properties (--viz-*) so they automatically adapt to light/dark mode"*), and `src/style.css` already carries a `--viz-amber` WCAG darken override — the project demonstrably knows these must be scheme-aware tokens. Doubly moot in place: per C-1 neither rule paints. `data-type` on `:92` is therefore, today, a pure no-op attribute.

**Falsifier.** Killed if a global rule re-established the badge colours — none exists (`grep -rln "paper-search-badge" web/src` → `PaperSearch.vue`, `PaperSearchModal.vue`, `PaperSearchDropdown.vue` only).
**Axis note (value.js).** These literals are the closest this component comes to a colour-computation seat. They are not value.js consumers today, and a `color-mix`/`--viz-*` fix keeps them out of value.js — correctly (see S-2).

---

### C-13 · **INFO** · Runtime import from a `devDependencies` package.

`:4` — `import { Search, X, Minimize2 } from "lucide-vue-next"`. `web/package.json` lists `lucide-vue-next: ^1.0.0` under **`devDependencies`**, alongside four other runtime-critical entries (`reka-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`) that glass-ui's `Button` requires transitively.

**Falsifier — held it to INFO.** Killed as a live break if any install path omitted dev deps. `web/Dockerfile:11` is a bare `RUN npm ci` (no `--omit=dev`, no `NODE_ENV=production`), so the current build is unaffected. It is a latent manifest defect that converts to a hard build break the moment anyone adds `--omit=dev`.
**Corpus fold.** `CENSUS-2026-08-03.md` books `lucide-vue-next → @lucide/vue` × 35 sites as part of the glass 4→7 uplift; this file is 1 of those 35, and the specifier should move to `dependencies` in the same touch rather than being re-migrated in the wrong section.

---

### C-14 · **INFO** · Two small contract asymmetries against the file's own siblings.

- **Backdrop click collapses rather than closes.** `:46` `@click.self="search.toggleExpanded()"` returns the user to the inline dropdown, while the footer hint (`:116-118`) advertises *"esc close"* and the adjacent `X` button (`:74`) calls `search.close()`. Three affordances on one surface, two dismissal semantics. The producer's modal routes backdrop dismissal through `Dialog`'s single `open` model, so adoption (C-4) collapses this by construction.
- **No `variant` prop.** `PaperSearchInput` and `PaperSearchDropdown` both take `variant: "sidebar" | "floating"`; the modal takes only `search`. Defensible (a centred overlay has no sidebar/floating distinction) — but it means the two hosts of C-2 are *indistinguishable* from inside the modal, so the component cannot even self-arbitrate the duplicate.
- **Not exported from the barrel.** `search/index.ts` re-exports `usePaperSearch`, the index functions and the helpers, but none of the three `.vue` files. Consumers import the SFC by deep relative path (`PaperSearch.vue:4`). Harmless internally; noted because the module boundary the barrel implies is not the one the tree uses.

---

## §2 · Cleared probe (falsifier ran, finding died)

**CLEARED · "Passing the whole composable state as one prop is an anti-pattern."**
The subject takes `search: PaperSearchState` (`:8-10`) — 10 members, refs unwrapped manually in the template (`search.isExpanded.value`, `:44`), and the child mutates the parent's state directly (`:90` `search.selectedIndex.value = i`). That reads as a props-contract smell. It is not chargeable: **glass-ui's own `FuzzySearch.vue` declares the identical contract** — `props: { state: FuzzySearchState, … }` with `e.state.selectedIndex.value = n` in its row handler (`search.js`) — so this is the producer-sanctioned idiom for this component family, not a fourier deviation. Reported rather than dropped, because the challenge is only as trustworthy as the probes it lets die.

---

## §3 · Superlatives (L-18, falsifiers attached)

**S-1 · Zero API coupling, by construction — correct.**
Paper content is parsed at **build** time: `lib/paperContent.ts:1-7` re-exports `paperSections` from `virtual:paper-content` ("auto-parsed from fourier_paper.tex at build time"), and `PaperView.vue:111` feeds that array straight into `usePaperSearch`. The entire search path — index build, scoring, render — issues no network call. On the operation↔client-leaf axis (R6-8) this component's incidence is **zero**, and that is the right answer: a full-text index over static prose has no business on the 45-operation surface.
*Falsifier:* `grep -rn "lib/api\|fetch(\|axios" web/src/components/paper/search/` → empty; `grep -rn "search" web/src/lib/api.ts` → empty (no search operation exists to have been missed).

**S-2 · Zero value.js coupling across the whole paper tree — which is why the atomic-transaction risk misses this component entirely.**
`grep -rn "value.js" web/src/components/paper/` → **empty**. The census records the hard deadlock — `keyframes@4.3.0` tilde-locks `glass-ui ~4.0.0` while `glass-ui@7` peers `keyframes ^6` and `keyframes@6` pins `value.js 4.0.0` exactly, so *glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0 is one atomic transaction* (`CENSUS-2026-08-03.md`). This component's exposure to the value.js leg of that transaction is nil, and its exposure to the keyframes leg is nil too (all motion is CSS `transition`, no `keyframes.js` import anywhere in the family). The migration blast radius here is **glass-ui only** — a genuinely favourable position, and worth recording as such rather than assuming the worst.
*Falsifier:* would die on any `@mkbabb/value.js` or `@mkbabb/keyframes.js` import in the closure. There are none.

**S-3 · The one class that survives is a correctly-consumed producer utility.**
`fira-code` (`:95`, `:110`, `:113`, `:116`) resolves to glass-ui's `@utility fira-code` (`styles/typography/utilities.css:69`), a Tailwind-v4 global utility, not a scoped rule — so it is the *only* styling on this component that actually paints (C-1). The alternative (a local `font-family: "Fira Code", monospace`) would have missed glass-ui's self-hosted, Capsize-calibrated, zero-CLS face. Right call, and it holds through the 4→7 uplift (the utility is not in the removed-subpath set).
*Falsifier:* would die if `fira-code` were undefined or fourier-local — it is neither.

**S-4 · The `v-html` sink is genuinely safe, and by construction rather than by luck.**
`highlightFuzzy` (`searchHelpers.ts:33-70`) escapes on **every** return path — the empty-query early return, the no-match early return, each `<mark>`-wrapped run, and each unmatched character. There is no path that concatenates unescaped input. Upstream of that, `buildSearchIndex` runs `stripHtml` over section titles, figure captions and code captions before they ever become labels (`paperSearchIndex.ts`), so the sink is defended twice. Given `v-html` is the single highest-risk construct in the file, getting it right unremarkably is worth naming.
*Falsifier:* a label of `<img src=x onerror=alert(1)>` is stripped at index time; a residual bare `<` reaching `highlightFuzzy` still emits `&lt;`. Attribute-context escaping (`"`/`'`) is absent from `escapeHtml` — correctly, since the output is only ever inserted as element content.

**S-5 · The row `:key` is exactly right, and non-obviously so.**
`:85` — `` :key="`modal-${r.id}-${r.type}-${i}`" ``. `SearchEntry.id` is **not unique**: `paperSearchIndex.ts` assigns `id: sectionId` for every `code` and `proof` entry, `id: thm.label ?? sectionId` for theorems, and `id: block.id ?? block.anchorId ?? sectionId` for equations — so a section containing two code blocks yields two entries with the same `id`. A naive `:key="r.id"` would collide and mis-patch rows during incremental search; the `type`+index composite defuses it, and the `modal-` prefix keeps it distinct from the dropdown's key namespace when both lists are alive. This matches the producer's key byte-for-byte, which is evidence the producer hit the same collision.
*Falsifier:* would die if `id` were unique per entry — it demonstrably is not (three fallback-to-`sectionId` sites).

---

## §4 · Corpus ledger — folded, extended, contradicted

| Corpus row | Disposition here |
|---|---|
| `lane-frontend.md:159-163` — file inventory, `PaperSearchModal.vue` 124 LOC | **FOLD** (exact, re-verified at HEAD) |
| `lane-frontend.md:290` — `import { Button } from "@mkbabb/glass-ui/button"` | **FOLD**, extended by C-8 (the `type` gap) and C-9 (the surface-class gap) |
| `lane-frontend.md:438` / `CENSUS:99` — 🟡 CANDIDATE shadow, PaperSearch family vs `./search`+`useFuzzySearch` | **ESCALATE 🟡→🔴 HARD** (C-4): the producer is a verbatim superset with identical scoring prose, state shape, strings, geometry and `:key`; and it fixes three defects the fork carries (C-3, C-5, C-11) |
| `CENSUS:336` / intake `R3-11`, `X-6` — 2 Teleports; instance registry duplicates `PaperSearchModal`, adjudicated a registry-**join** defect | **FOLD, and ADD without contradiction** (C-2): the duplicate is *also* true of the tree — one callsite (`PaperSearch.vue:35`), **two mounted instances** (`PaperSidebar.vue:51` + `MobileFloatingToc.vue:111`) sharing one `isExpanded`. Feeds the census's OPEN mounted-instance denominator |
| `CENSUS` — glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0 atomic transaction | **FOLD**, and **bound** by S-2: this component's exposure is glass-ui-only |
| `CENSUS` — `lucide-vue-next → @lucide/vue` × 35 | **FOLD**, extended by C-13 (the specifier is also in the wrong manifest section) |
| `CENSUS` — vitest ABSENT; 29 Playwright tests, one chromium project | **FOLD, sharpened**: zero of the 8 specs touch the paper search, so C-1/C-2/C-5 are all outside every existing gate |
| fourier `M-critique-audit` **A2-08 / A4-03(critical) / CHR-07 / B1-PAPER-03 / B6H-01 / C2-R1** — "square offset focus ring ⇒ glass-ui `Input`/`.focus-ring` unadopted" | **CONTRADICT, explicitly** (C-1): six lanes recorded the live symptom and all six mis-rooted it. The root cause is scoped-CSS unreachability — `.paper-search-input[data-v-*]{outline:none}` never matches a *descendant* of a child component's root. Adopting the primitive would have masked the defect by relocating the rule to a global layer, leaving the other 42 dead rules in place |
| fourier `M-critique-audit` **D4-05** — "PaperSearch hand-rolled modal overlay — glass-ui SearchBar/FuzzySearch unadopted" (high, 2026-06-17) | **FOLD + corroborate C-4**; unactioned for six weeks |

---

## §5 · SS-13 live queue (nothing below is claimed as proven)

1. Rendered appearance and document position of the unstyled modal (C-1) — proven dead at the selector level; the visual is a capture, not an inference.
2. A mobile-width run reaching `searchActive ∧ !mobileTocVisible ∧ isExpanded` to observe both overlays and the misdirected scroll (C-2).
3. Type-vs-paste divergence for a chosen query against the live index (C-5) — deterministic from source, but the specific label that falls out of a prefix's top-30 is index-dependent.
4. Whether the Vue **dev** server's `DEV_ROOT_FRAGMENT` path alters the *sibling* `PaperSearchDropdown`'s scope-id outcome (fragment root: `Transition` + a `v-if` backdrop that degrades to a comment vnode in the sidebar variant). Immaterial to the subject — a `Teleport` root is dead in both modes — but a dev/prod styling asymmetry next door would matter to whoever repairs C-1.

---

## §6 · Verdict

The component is **DEFECTIVE** on the consumption axis, and the two blockers are not stylistic. Its entire visual contract is written in a stylesheet that cannot reach it (C-1), and it instantiates itself twice against a single shared expansion flag (C-2) — a state it then arbitrates with a global `document.querySelector` (C-6). Underneath that, the producer it declines to consume — `@mkbabb/glass-ui/search`, installed and shipping at 4.0.0 — is not an alternative implementation but a generalisation of this exact code, one that already fixes the dialog contract (C-3), the prefix-cache truncation (C-5) and the `v-html` highlighter (C-11) that the fork still carries (C-4).

The component is not careless everywhere: the `v-html` escaping is disciplined (S-4), the composite `:key` defuses a real id collision (S-5), the typography utility is the producer's (S-3), and the deliberate absence of value.js, keyframes and API coupling (S-1, S-2) means the whole 4→7 / 4.3→6 / 0.13→4.0 atomic transaction touches it through exactly one leg. That is what makes the disposition clean rather than fraught: **adopt `FuzzySearch` and the four-file, 391-LOC fork plus 43 dead CSS rules leaves with it** — no value.js hop, no keyframes hop, one projection from `SearchEntry` to `SearchableItem`, and the `number`-first field weighting to preserve.

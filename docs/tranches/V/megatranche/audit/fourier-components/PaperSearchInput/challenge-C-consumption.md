claude-opus-5[1m]

# CHALLENGE C · CONSUMPTION — `PaperSearchInput.vue`

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/search/PaperSearchInput.vue` (69 lines)
**Axis** CONSUMPTION — value.js 0.13 · keyframes 4.3 · glass-ui ^4.0.0 · the 45-operation fourier API · props/emits contract · integration seams
**Posture** component assumed DEFECTIVE until the tree proves otherwise; every claim carries severity + `file:line` + its own falsifier.
**Method** static + source-derived only. No browser. Two executable receipts (Vue SSR scope-id proof; producer-bundle greps) are reproduced inline. Livable-only consequences are marked `UNPROVEN-NEEDS-LIVE` for SS-13.

**Tally** — 14 defects (3 BLOCKER · 4 MAJOR · 5 MINOR · 2 INFO) · 5 superlatives.

---

## §0 · The whole consumption surface, enumerated

`PaperSearchInput.vue` has exactly four import statements (`:2`–`:5`):

| Line | Specifier | Kind | Package pin | Verdict |
|---|---|---|---|---|
| `:2` | `vue` (`ref`, `watch`, `nextTick`) | runtime | `^3.5.38` | clean |
| `:3` | `@mkbabb/glass-ui/button` (`Button`) | runtime | `^4.0.0` / inst 4.0.0 | subpath ✓ — but see C-2, C-3 |
| `:4` | `lucide-vue-next` (`Search`, `X`, `Maximize2`, `Minimize2`) | runtime | `^1.0.0`, **devDependencies** | C-8 |
| `:5` | `./usePaperSearch` (`PaperSearchState`) | **type-only** | local | superlative S-1 |

**value.js import count: 0. keyframes.js import count: 0. fourier-API import count: 0.**
Falsifier for all three: `grep -n "value\.js\|keyframes\.js\|lib/api" PaperSearchInput.vue` → empty. See C-13 / C-14 — these are load-bearing *negative* findings, not omissions.

The class hooks the component emits into the DOM: `paper-search-input-wrap` (`:35`), `paper-search-icon` (`:36`), `paper-search-input` (`:40`), `paper-search-action-btn` (`:51`, `:62`). **It ships no `<style>` block of its own.** All four are styled in the *parent's* scoped block, `PaperSearch.vue:47-100`. §1 is what that costs.

---

## §1 · BLOCKERS

### C-1 · [BLOCKER] Three of the four class contracts this component emits can never be matched — the parent's scoped CSS does not cross the component boundary

**Provenance.** `PaperSearchInput.vue:36`, `:40`, `:51`, `:62` emit `paper-search-icon` / `paper-search-input` / `paper-search-action-btn`. The only rules for those selectors in the entire tree are inside `PaperSearch.vue`'s `<style scoped>` — `PaperSearch.vue:62-67` (icon), `:69-82` (input + `::placeholder`), `:84-100` (action button), plus the floating-variant override `:211-213`. Falsifier run: `grep -rn "paper-search-icon" web/src/` → exactly two hits, `PaperSearchInput.vue:36` (the consumer) and `PaperSearch.vue:62` (the scoped producer). No global layer, no `:deep()`.

**The mechanism, proven executably.** Vue applies a scope id to (a) every element in the template of the component that owns the `<style scoped>`, and (b) the *root* element of each child component — and nothing deeper. The built bundle confirms only `PaperSearch.vue` carries an id:

```
$ grep -o 'data-v-[a-z0-9]\{8\}' web/dist/assets/PaperView-CS2UAWt8.js | sort -u
data-v-08f0e133  data-v-2074668b  data-v-a7d16b8c  data-v-e92b0ff4  data-v-f4833a22
$ # …a7d16b8c is attached by exactly one wrapper:
ei = lt(jr, [["__scopeId","data-v-a7d16b8c"]])          # ← PaperSearch.vue
_r = ve({ __name:"PaperSearchInput", … })                # ← NO __scopeId wrapper
br = { class:"paper-search-input-wrap" }                  # ← static hoist, NO data-v baked in
```

Rendered with the repo's own installed Vue, same topology:

```
$ node scopeproof.mjs   # Parent{__scopeId:"data-v-a7d16b8c"} → Child{no scopeId}
<div class="paper-search" data-v-a7d16b8c>
  <div class="paper-search-input-wrap" data-v-a7d16b8c>   ← root: id INHERITED ✓
    <span  class="paper-search-icon"></span>              ← NO data-v ✗
    <input class="paper-search-input" type="text">        ← NO data-v ✗
    <button class="paper-search-action-btn"></button>     ← NO data-v ✗
  </div>
</div>
```

So `.paper-search-input-wrap[data-v-a7d16b8c]` matches; `.paper-search-icon[data-v-a7d16b8c]`, `.paper-search-input[data-v-a7d16b8c]`, `.paper-search-action-btn[data-v-a7d16b8c]` and `.paper-search--floating .paper-search-input[data-v-a7d16b8c]` **cannot ever match**.

**What is actually lost.** Tailwind v4 preflight (`style.css:1`) already supplies `border:0`, `background:transparent`, `font:inherit`, `color:inherit` to `input`, so the surviving loss set is exact and small — and one member of it is structural:

| Declaration | Source | Recovered by preflight? | Consequence |
|---|---|---|---|
| `flex: 1` | `PaperSearch.vue:70` | **no** | the `<input>` keeps its intrinsic `size=20` width and does not grow to fill the flex row |
| `min-width: 0` | `:71` | no | no shrink-below-content |
| `font-size: 0.78rem` | `:75` | no | input text renders at the inherited root size (`1.125rem` < 768 px, `1rem` ≥ 768 px per `style.css:41-51`) instead of 0.78 rem |
| `::placeholder` colour | `:80-82` | no | UA placeholder grey |
| `.paper-search--floating … { @apply text-base }` | `:211-213` | no | the floating variant's type-scale override is inert |
| icon `0.8rem` box + `flex-shrink:0` | `:62-67` | no | lucide's default 24 px icon, shrinkable |
| action-btn colour / `border-radius:3px` / hover | `:84-100` | partly — glass-ui `ghost` supplies bg/hover | pill radius instead of 3 px, producer colour instead of the 45 %-muted local tone |

`flex: 1` and the two font-size losses are the load-bearing ones: the search input is laid out at its default content width inside a `display:flex` row, at ~1.4× the intended type size.

**Why this is a *consumption*-axis blocker and not merely a style bug.** The component's entire styling contract is an unwritten dependency on a sibling file's scope hash. It publishes four hooks and can honour one. The repo already knows this failure mode and cured it elsewhere: `style.css:130-137` reads *"Because Vue's scoped styles add a data-attribute selector, the ring lives at the global layer so it applies regardless of the component scope hash"* — and then lists `.sidebar-link`, `.floating-toc-item`, `.callout-btn`, `.gallery-card`. `.paper-search-input` and `.paper-search-action-btn` are absent from that list. The D.W4.d wave diagnosed the exact mechanism and skipped this component.

**Falsifier.** Show a `data-v-*` attribute on the `<input>` at runtime, or a rule for `.paper-search-input` outside a scoped block, or a `:deep()` wrapper in `PaperSearch.vue`. Any one kills this finding. None exists. *(The pixel magnitude — how wrong the row looks — is `UNPROVEN-NEEDS-LIVE`; the selector-match failure is proven.)*
**Corpus.** Not in `lane-frontend.md`, not in `CENSUS-2026-08-03.md`, not in `lane-fourier-r3-r6.md`. New.

---

### C-2 · [BLOCKER] The pinned glass-ui already ships this component — `@mkbabb/glass-ui/search`, imported 0 times

The census books this as a CANDIDATE shadow (`CENSUS-2026-08-03.md:99` — *"CANDIDATES — PaperSearch family (832 LOC) vs `./search`+`useFuzzySearch`"*; `lane-frontend.md:438` — *"`./search` (`SearchBar.vue`, `composables/`, `searchVariants.ts`) — present at 4.0.0 AND 7.0.0"*). **I adopt that row and escalate it**, because the parity is not "similar", it is member-for-member identical at the *installed* version, which no prior row measured.

Receipts, all from `web/node_modules/@mkbabb/glass-ui@4.0.0`:

**(a) The state interface is a 10-for-10 match.**
`dist/components/custom/search/composables/types.d.ts` → `FuzzySearchState` = `{ query, results, selectedIndex, isOpen, isExpanded, onKeydown, selectResult, toggleExpanded, close, open }`.
`usePaperSearch.ts:94-105` returns `{ query, results, isOpen, isExpanded, selectedIndex, selectResult, close, open, toggleExpanded, onKeydown }`.
Same ten members, same types, differing only in declaration order.

**(b) The component props are the same union, same expose.**
`dist/components/custom/search/FuzzySearch.vue.d.ts` → props `{ state, variant?: "sidebar" | "floating", placeholder?, typeLabel? }`, exposes `focus(): void`.
`PaperSearchInput.vue:7-11` → `{ search, variant: "sidebar" | "floating", canExpand }`, `defineExpose({ focus })` at `:31`.
The variant union `"sidebar" | "floating"` is **character-identical** to the producer's. This is not convergent evolution at the literal-string level.

**(c) The tuning constants are identical.**
```
$ grep -o 'debounceMs[^,;)]\{0,30\}\|maxResults[^,;)]\{0,30\}' dist/search.js
debounceMs ?? 120
maxResults ?? 30
```
`usePaperSearch.ts:32` → `}, 120);` · `usePaperSearch.ts:36` → `searchIndex(index, debouncedQuery.value, 30)`.

**(d) The scorer is the one the producer explicitly forbids re-forking.**
`paperSearchIndex.ts:2-3` header: *"scores queries with **VSCode-style fuzzy matching**"*; `:51` section banner *"Fuzzy matching (VSCode-style subsequence scorer)"*. `lane-frontend.md:438` quotes the producer's own 7.0.0 `dock/index.ts`: *"the VSCode subsequence scorer — **NO re-fork**"*. The producer names the fork by name and names it forbidden.

**(e) The bare-input half also exists.** `SearchBar.vue.d.ts` → `{ modelValue?, placeholder?, icon?: Component, tag? }`, exposes `inputRef` — i.e. `PaperSearchInput`'s exact job (icon + input + focusable ref) minus the two action buttons.

**(f) It is live code, not a stub.** `dist/search.js` is 13,664 B and exports both `SearchBar` and `FuzzySearch`; the subpath `./search` is in the 4.0.0 export map.

So: the component imports **one** symbol from glass-ui (`Button`, `:3`) while the same installed package exports a purpose-built replacement for the component as a whole. Against the standing owner precept (glass-ui is the design system; add to it, do not re-implement it), a component that is 100 % shadow surface is not a partial-credit finding.

**Falsifier.** Name one capability of `PaperSearchInput` + `usePaperSearch` that `FuzzySearch`/`SearchBar`/`useFuzzySearch` at 4.0.0 cannot express. The only candidate I found is `SearchResult`'s domain payload — the local index carries paper-specific fields (`number`, `rawTex`, `depth`, `type` over a 13-member union, `paperSearchIndex.ts:16-46`) whereas the producer's `SearchableItem` is `{id,label,text,type?}` with a generic `<T extends SearchableItem>` escape hatch. That is a genuine adaptation cost, and it is a cost in `paperSearchIndex.ts`/`searchHelpers.ts` — **not in this file**, which touches none of those fields.
**Corpus.** ADOPT + ESCALATE `CENSUS:99` / `lane-frontend.md:438`. New material: (a)–(e).

---

### C-3 · [BLOCKER] `lucide-vue-next`'s neighbours in `devDependencies` are *live runtime peers* of the `Button` this file imports — and the corpus books them for deletion

**I contradict the hitherto corpus here.** `lane-frontend.md:69` states, under a "measured, not estimated" banner:

> **Dead devDeps (measured, not estimated):** `class-variance-authority`, `clsx`, `tailwind-merge` all have **0 import sites** in `src/` … `reka-ui` also has **0 direct imports** …

and notes `DESIGN.md:32` already books *"Remove unused CVA dependency"*.

The measurement is a `grep` of first-party `src/` and is blind to peer-dependency reach. Three of those four packages are declared **peers of `@mkbabb/glass-ui@4.0.0`** and are imported at runtime by the exact chunk `PaperSearchInput.vue:3` resolves to:

```
$ grep -o '^import[^;]*;' node_modules/@mkbabb/glass-ui/dist/button-BNDWhAZb.js
import { t as e } from "./cn-DJXf4yaB.js";
import { … } from "vue";
import { Primitive as l } from "reka-ui";                    ← peer
import { cva as u } from "class-variance-authority";         ← peer
$ grep -o '^import[^;]*;' node_modules/@mkbabb/glass-ui/dist/cn-DJXf4yaB.js
import { clsx as e } from "clsx";                            ← peer
$ node -e 'console.log(require("@mkbabb/glass-ui/package.json").peerDependencies)'
{ …, "class-variance-authority":"^0.7", "clsx":"^2.0", "reka-ui":"^2.0", … }
```

Executing `DESIGN.md:32` — or any sweep acting on the "dead devDeps" row — removes `class-variance-authority` and breaks `PaperSearchInput.vue:3` at module-eval time, together with the census's 95 glass-ui import statements across 21 subpaths. This is a live foot-gun sitting in an adjudicated formation document.

**Precision owed back to the corpus:** the row is right about exactly one member. `tailwind-merge` appears in glass-ui only inside a *doc comment* in `dist/utils/cn.d.ts` explaining that glass-ui **replaced** `twMerge` with a hand-rolled deduplicator ("paying ~0.5 KB gzipped instead"). No runtime or type reference. `tailwind-merge` is genuinely dead; `cva`/`clsx`/`reka-ui` are not.

**Falsifier.** `npm rm class-variance-authority && npm run build` in `web/`. If it builds, I am wrong.
**Corpus.** **CONTRADICTS** `lane-frontend.md:69` (3 of its 4 named dead devDeps) and the `DESIGN.md:32` book it cites.

---

## §2 · MAJORS

### C-4 · [MAJOR] `variant` is a required prop that is never read

`PaperSearchInput.vue:9` declares `variant: "sidebar" | "floating"` as a **required** member of `defineProps`. It is read nowhere.

```
$ grep -n variant web/src/components/paper/search/PaperSearchInput.vue
9:    variant: "sidebar" | "floating";
49:            variant="ghost"      ← glass-ui Button's own prop
60:            variant="ghost"      ← glass-ui Button's own prop
```

Every call site pays for it (`PaperSearch.vue:27` forwards `:variant="variant"`, itself forwarded from `PaperSidebar.vue:51` / `MobileFloatingToc.vue:111`). The variant behaviour it implies is delivered entirely by the parent's descendant selectors (`PaperSearch.vue:204-213`), which reach the wrap but not the input (C-1) — so the prop is both unread *and* the styling it stands for is half-inert.

No gate catches this: there is no ESLint in `web/package.json`, and `vue-tsc` does not flag unread props.
**Falsifier.** Any `props.variant` / `variant` interpolation in the SFC. There is none.

---

### C-5 · [MAJOR] The component writes into its own props object — one-way data flow inverted, and inconsistently so within 69 lines

`PaperSearchInput.vue` receives the entire `usePaperSearch` return by reference and mutates it from the template:

- `:43` `@input="search.query.value = ($event.target as HTMLInputElement).value"`
- `:45` `@focus="search.isOpen.value = true"`
- `:63` `@click="search.close()"`

Vue's prop immutability rule is not *technically* violated (the prop binding itself is not reassigned; the refs inside it are), which is precisely why no gate fires. But the contract consequence is real: the component cannot be mounted, tested, or reused without constructing a full `PaperSearchState`, and its writes are invisible to the parent that owns the state.

The inconsistency is the sharper point. The component **does** own a correct upward channel — `defineEmits<{ expand: [] }>` at `:13-15`, emitted at `:52`, handled at `PaperSearch.vue:29` (`@expand="search.toggleExpanded()"`). So `expand` travels up as an event while `query`, `isOpen` and `close` are written down through the prop. Two opposite disciplines, one file. Note that `toggleExpanded` is a member of the very object at `:8` — the emit exists to reach a method the component is already holding.

**Falsifier.** A `v-model` / `update:*` emit for `query`, or a comment/spec sanctioning the prop-write idiom. Neither exists. *(Producer contrast: `FuzzySearch.vue` takes the same `state` object — so the idiom is upstream-blessed at the family level; what is unjustifiable is running both disciplines simultaneously for the same state.)*

---

### C-6 · [MAJOR] The button labelled "Clear search" does not clear the search — it destroys the whole search session

`PaperSearchInput.vue:58-67`: `v-if="search.query.value"`, `title="Clear search"` (`:64`), `@click="search.close()"` (`:63`).

`usePaperSearch.ts:48-53`:
```ts
function close() {
    isOpen.value = false;
    isExpanded.value = false;
    query.value = "";
    selectedIndex.value = 0;
}
```

Four state writes where the label promises one. The visible consequence: pressing "Clear search" **while the expanded modal is open** sets `isExpanded = false`, and `PaperSearchModal.vue:44` (`v-if="search.isExpanded.value"`) tears the modal out of the `<Teleport>` — the user asked to clear a field and lost the dialog. The composable exposes no `clear()`; the correct call (`query.value = ""`) is one the component already knows how to make (`:43`).

`title` is also the only accessible name on this control (see C-7), so a screen-reader user is told "Clear search" and gets a session teardown.

**Falsifier.** A `clear()` in `usePaperSearch.ts`, or evidence that `isExpanded` cannot be true while this button is mounted. Neither holds: the button's guard is `query.value` truthy, and `PaperSearch.vue:28` makes `canExpand` require exactly that — the two buttons are co-mounted by construction.
**Corpus.** New.

---

### C-7 · [MAJOR] A hand-rolled combobox with zero ARIA, and icon buttons named only by `title` — while glass-ui ships the seats and the repo uses them 35× elsewhere

The `<input>` at `:37-46` is the text entry of a listbox-navigating search: `@keydown="search.onKeydown"` (`:44`) routes `ArrowDown`/`ArrowUp`/`Enter`/`Escape` (`usePaperSearch.ts:63-92`) against a rendered result list (`PaperSearchDropdown.vue:41-60`). It carries **no** `aria-label`, `role="combobox"`, `aria-expanded`, `aria-controls`, or `aria-activedescendant`. Keyboard users move a selection they are never told about; the selected row is marked only by the visual class `is-selected` (`PaperSearchDropdown.vue:46`).

The two icon-only `Button`s (`:47-57`, `:58-67`) contain a single lucide `<svg>` each and take their accessible name from `title` alone (`:53`, `:64`) — the weakest of the naming mechanisms, and one that surfaces no affordance on touch.

Consumption angle: glass-ui 4.0.0 exports `./tooltip` and `./icon-tooltip`, and the fourier tree already runs **35 Tooltip callsites across 9 consumers** (`lane-fourier-r3-r6.md` row **R3-7a**, adjudicated TRUE and carried to F.W3). The search cluster is outside that set — it opted for raw `title` while the rest of the app consumed the producer primitive. `@axe-core/playwright ^4.11.3` is installed (`web/package.json:24`) and no spec exercises this component (C-12), so nothing measures the gap.

**Falsifier.** An `aria-*` attribute anywhere in the file (`grep -c 'aria-' PaperSearchInput.vue` → 0), or a wrapper supplying the combobox role (`PaperSearch.vue:22-38` supplies none; `PaperSidebar.vue:50` labels the surrounding `<nav>` "Table of contents", which is not it).
**Corpus.** Extends R3-7a's consumer set by naming the cluster it omits.

---

## §3 · MINORS

### C-8 · [MINOR] Runtime import from `devDependencies`
`:4` imports four runtime symbols from `lucide-vue-next`, declared in **`devDependencies`** (`web/package.json:35`), not `dependencies`. Survivable — `private: true`, Vite-bundled, CI installs dev — but it means `npm ci --omit=dev && npm run build` cannot produce this component. Same class as C-3, opposite direction: C-3 is a live peer wrongly *called* dead; this is a live runtime dep wrongly *filed* as dev.
This file is 1 of the **35 sites** in the `lucide-vue-next → @lucide/vue` rename that the 4→7 uplift forces (`lane-frontend.md:478`, `CENSUS:105`) — 4 symbols, single line, trivially migratable.
**Falsifier.** Move it to `dependencies` and the finding evaporates; or show a `--omit=dev` build in CI that succeeds today.

### C-9 · [MINOR] The cluster's barrel is dead and this file bypasses it
`search/index.ts` re-exports 4 lines of public surface. Import sites: **zero** — every consumer deep-imports, including `PaperSearchInput.vue:5` (`from "./usePaperSearch"`), `PaperSearchDropdown.vue:4`, `PaperSearchModal.vue:5`, `PaperSearch.vue:5`, `PaperView.vue:18`, `PaperSidebar.vue:5`, `MobileFloatingToc.vue:8`.
**Falsifier.** `grep -rn 'from "./search"\|search/index' web/src/` → empty.

### C-10 · [MINOR] Two competing focus mechanisms; the declarative one fires into `display:none` subtrees
The component ships both a watcher (`:20-25`, `watch(() => props.search.isOpen.value, open => open && nextTick(() => inputRef.value?.focus()))`) and an imperative expose (`:27-31`, `focus()`).
Every real caller uses the imperative path: `MobileFloatingToc.vue:85-90` calls `props.search.open()` **and** `nextTick(() => mobileSearchRef.value?.focus())` → `PaperSearch.vue:15-19` → `:31`. The belt is redundant with the braces.
Worse, the watcher keys on **shared** state: one `usePaperSearch` (`PaperView.vue:111`) feeds two hosts (`PaperSidebar.vue:51` variant `sidebar`, `MobileFloatingToc.vue:111` variant `floating`), so every `isOpen` false→true transition fires the watcher in every mounted instance. `PaperSidebar.vue:132-137` sets `.paper-sidebar { display: none }` below 1024 px, where `HTMLElement.focus()` is a documented no-op — so `search.open()` on a phone issues a wasted focus into a hidden subtree before the imperative call lands. Correctness here rests on nextTick ordering that nothing asserts.
**Falsifier.** Delete `:20-25` and show a caller that regresses. `PaperSearch.vue`, `PaperSidebar.vue`, `MobileFloatingToc.vue` — the only three — all reach focus through `:31`.
**Corpus.** New. (Structurally adjacent to R3-12's "both Paper-search callsites" duplicate rows.)

### C-11 · [MINOR] The component can open the shared state but never closes it
`:45` sets `search.isOpen.value = true` on focus. There is no `@blur`, and `close()` is reachable only from the "Clear" button (`:63`), `Escape` (`usePaperSearch.ts:83-90`), or result selection (`:43-46`). Dismissal-by-clicking-away is delegated to `PaperSearchDropdown.vue:65-69`, whose backdrop is `v-if="variant === 'floating' && …"` — **so the `sidebar` variant has no click-away path at all**, and `isOpen` latches true until Escape or a selection. The component owns the open edge and none of the close edges.
**Falsifier.** A blur handler in this file, or a sidebar-variant backdrop. Neither exists.

### C-12 · [MINOR] Zero automated coverage
No vitest in the repo (`CENSUS:105`, *"vitest ABSENT"*). Of the 8 Playwright specs in `web/e2e/`, **none** references paper search — `grep -rln 'paper-search\|Search paper' web/e2e/` → empty (`gallery.spec.ts` matches "search", but that is `GallerySearchBar.vue`, a different component). `paper-performance.spec.ts` does not touch it. The sole gate is `vue-tsc -b`, which cannot see C-1, C-4, C-5 or C-6.
**Falsifier.** Name a spec that mounts this component.

---

## §4 · INFO — the load-bearing negatives

### C-13 · [INFO] Zero value.js coupling: this component is outside the F.W2 migration surface
The census fixes fourier's live value.js surface at **5 import statements / 4 files / 6 symbols, easing-only** (`CENSUS:38`) — `lib/easings.ts` ×2, `ConvergencePlot.vue`, `useCurveTransition.ts`, `harmonics.ts` — all bare-root specifiers that 4.0.0 no longer exports, "latent, not live" while 0.13.0 stays installed. **`PaperSearchInput.vue` is in none of the four files and contributes none of the five specifiers.** It likewise touches none of the hand-rolled `lib/colors.ts` arms (`CENSUS:174`, the 117-line regex file with no `oklch()` arm) — the one colour decision in its blast radius is `.paper-search-badge`'s raw `hsl()` literals at `PaperSearch.vue:159-166`, which live in the parent and are token-bypassing but not value.js-bearing.
Consequence for F.W2: this component needs **zero** value.js work. Its only exposure to the tri-package atomic transaction (`CENSUS:107-109` — glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0) is the one-line lucide rename (C-8) and whatever `Button`'s CVA does across the hop.
**Falsifier.** Any value.js specifier in the file or its import closure (`usePaperSearch.ts` → `@mkbabb/latex-paper` types + `paperSearchIndex.ts`; `paperSearchIndex.ts` → `@mkbabb/latex-paper` types only). Closed and clean.

### C-14 · [INFO] Zero keyframes coupling, zero fourier-API coupling — R6-8's operation↔client leaf join is provably N/A here
**keyframes 4.3:** 0 imports. The cluster's motion is pure CSS transition using `--ease-out-expo` / `--ease-standard` / `--ease-in` (`PaperSearch.vue:224-236`, `:358-378`), and those tokens resolve — they are defined in `@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css`, reached via `style.css:3` (`@import "@mkbabb/glass-ui/styles"`). Same file supplies `--z-bar: 30` (`:337`) and `--z-modal: 140` (`:345`) used at `PaperSearch.vue:108,195,242`. All four token families verified present; no dangling `var()`.
**API:** the search corpus is a **build-time Vite virtual module** — `lib/paperContent.ts:7` re-exports `paperSections` from `virtual:paper-content` (`src/virtual-paper.d.ts:3`), consumed at `PaperView.vue:19,111`. `grep -rn 'lib/api' web/src/components/paper/search/ PaperSearch.vue` → empty. **0 of the 45 operations** (`lane-fourier-r3-r6.md` R3-7, `operationCount 45 / paths 41`) are reachable from this component's closure, so **R6-8** ("the API operation leaf is not client-independent") has no join to make here, and this component contributes nothing to R3-7c's 36-edge / 9-gap client ledger.
**Falsifier.** Any network call in the closure. None.

---

## §5 · SUPERLATIVES (L-18 runs both ways — each carries its falsifier)

**S-1 · Type-only import discipline is exact.** `:5` `import type { PaperSearchState } from "./usePaperSearch"` — correct under `verbatimModuleSyntax`, contributes zero runtime bytes, and severs what would otherwise be a runtime edge into the composable. The sibling files hold the same line (`PaperSearchDropdown.vue:4`, `PaperSearchModal.vue:5`, `PaperSearch.vue:5`, `PaperSidebar.vue:5`, `MobileFloatingToc.vue:8`) — a consistent 6-file discipline, unbroken.
*Falsifier:* one value import of `PaperSearchState`. None.

**S-2 · glass-ui is consumed the way the producer intends: subpath, real members, no shadowing.** `:3` imports from `@mkbabb/glass-ui/button` — a declared 4.0.0 export-map subpath, not the root barrel; `variant="ghost"` (`:49`, `:60`) and `size="icon"` (`:50`, `:61`) are both verified members of the shipped CVA union (`dist/button-BNDWhAZb.js`: `ghost: "bg-transparent text-foreground/70 hover:bg-foreground/8 …"`, `icon: "h-(--control-h-md) w-(--control-h-md) p-0"`), and `title` lands correctly by attr fallthrough (Button declares no `title` prop and does not set `inheritAttrs:false`; `mergeProps` forwards to reka-ui `Primitive as="button"`). Zero direct `reka-ui`, zero shadcn copies — the posture `CENSUS:89-91` calls *"deepest, cleanest consumer in the constellation"*.
*Falsifier:* a variant/size string outside the union, or a root-barrel import. Neither.

**S-3 · The imperative surface is minimal, typed, and — unknowingly — the producer's own contract.** `defineExpose({ focus })` (`:31`) exposes exactly one method; the parent types the handle as `InstanceType<typeof PaperSearchInput>` (`PaperSearch.vue:13`) and re-exposes the same single method (`:15-19`). glass-ui's `FuzzySearch.vue` exposes precisely `focus(): void` and `SearchBar.vue` exposes `inputRef`. The local component independently landed on the producer's narrower, better choice.
*Falsifier:* a second member on the expose, or a producer expose that is narrower. Neither.

**S-4 · The smallest possible uplift blast radius in the paper cluster.** Zero value.js (C-13), zero keyframes, zero API (C-14), one lucide line (C-8), one glass-ui subpath (S-2). Under the tri-package atomic transaction this 69-line file costs one import rewrite. Contrast the family it sits in: `PaperSearch.vue` + `search/` is 832 LOC of shadow (C-2).
*Falsifier:* any additional producer specifier in the file. Four imports total, all enumerated in §0.

**S-5 · The one place C-1's failure helps.** Because `.paper-search-input { outline: none }` (`PaperSearch.vue:73`) never matches, the `<input>` keeps its user-agent focus ring — the only keyboard-focus affordance the component has, given that it is absent from `style.css:133-137`'s global `:focus-visible` list. Curing C-1 naïvely (re-scoping the rule) would *remove* that ring and regress a11y; the fix must drop `outline: none` or add the input to the global focus-ring block.
*Falsifier:* a `:focus-visible` rule reaching `.paper-search-input`. `style.css:133-137` names four classes and this is not one of them.

---

## §6 · Disposition

| # | Severity | Claim | Corpus relation |
|---|---|---|---|
| C-1 | BLOCKER | 3 of 4 emitted class hooks are unstyleable across the scoped boundary | **new** |
| C-2 | BLOCKER | `@mkbabb/glass-ui/search` ships at the pinned 4.0.0, imported 0×; 10/10 state parity, identical variant union, identical 120/30 constants, producer's "NO re-fork" | adopt+escalate `CENSUS:99`, `lane-frontend.md:438` |
| C-3 | BLOCKER | `cva`/`clsx`/`reka-ui` are live glass-ui runtime peers reached from `:3`, booked for deletion as "dead devDeps" | **contradicts `lane-frontend.md:69`** |
| C-4 | MAJOR | required prop `variant` never read | **new** |
| C-5 | MAJOR | writes into the props object; emits upward for `expand` only — two disciplines, one file | **new** |
| C-6 | MAJOR | "Clear search" calls `close()` — 4 state writes, tears down the modal | **new** |
| C-7 | MAJOR | hand-rolled combobox, 0 ARIA; icon buttons named by `title` while the repo runs 35 Tooltip callsites | extends R3-7a |
| C-8 | MINOR | runtime import from `devDependencies`; 1 of 35 lucide rename sites | folds `lane-frontend.md:478` |
| C-9 | MINOR | dead barrel `search/index.ts`, bypassed at `:5` | **new** |
| C-10 | MINOR | duplicate focus mechanisms; watcher fires into `display:none` instances | **new** |
| C-11 | MINOR | opens shared state, owns no close edge; sidebar variant has no click-away | **new** |
| C-12 | MINOR | zero coverage — 0/8 e2e specs, no vitest | folds `CENSUS:105` |
| C-13 | INFO | zero value.js — outside the 5-specifier F.W2 surface | corroborates `CENSUS:38` |
| C-14 | INFO | zero keyframes, zero API; R6-8 join provably N/A; all CSS tokens resolve | corroborates R3-7/R6-8 |

**Order of operations if this component is repaired rather than replaced:** C-3 first (it can break the tree while unattended), then C-1 + S-5 together (they share a fix surface), then C-6 (a one-line correctness fix with a user-visible consequence), then C-4/C-5/C-9/C-10 as a single contract pass. **But C-2 argues the whole ladder is wasted motion** — the producer surface at the *installed* version subsumes every one of these except C-3, and adopting it deletes C-1, C-4, C-5, C-9, C-10, C-11 outright and moves C-6/C-7 upstream where 35 other callsites already benefit.

*Evidence written outside this file: none. Read-only over `/Users/mkbabb/Programming/fourier-analysis` (source, `web/dist` build artifact dated 2026-06-12, `web/node_modules/@mkbabb/glass-ui@4.0.0`, `@mkbabb/latex-paper@0.2.1`) and the value.js megatranche corpus. One scratchpad script (`scopeproof/proof.mjs`, §1) executed against the fourier tree's own installed Vue; it imports nothing from the product source and wrote nothing into either repo.*

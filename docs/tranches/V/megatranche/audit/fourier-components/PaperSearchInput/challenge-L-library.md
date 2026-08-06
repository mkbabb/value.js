claude-opus-5[1m]

# CHALLENGE — `PaperSearchInput.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/search/PaperSearchInput.vue` (69 LOC)
**Axis** code correctness · leaks/teardown · wrong types · duplication · colocation · module size (Goldilocks) · composable contracts · error postures · dead code · the viz render path · the R5-7 template-loop invisibility class
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every row below carries severity + `file:line` + its own falsifier and the falsifier's outcome.
**Method** static + source-derived only. No browser tooling. One executable probe (§1.2) run under the project's own installed `@vue/compiler-sfc` 3.5.38 and `@vue/runtime-core` 3.5.38 with a synthetic renderer — this is compilation and runtime instrumentation, not a browser. Claims that need a live paint are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Read whole** subject + `usePaperSearch.ts` (108) + `paperSearchIndex.ts` (401) + `searchHelpers.ts` (74) + `index.ts` (4) + `PaperSearchDropdown.vue` (70) + `PaperSearchModal.vue` (124) + `PaperSearch.vue` (397, the style host) + the three consumers `PaperView.vue`, `PaperSidebar.vue`, `MobileFloatingToc.vue` + `@mkbabb/glass-ui/button` dist + `lucide-vue-next` dist defaults. All read-only.

---

## §0 · Verdict and counts

**DEFECTIVE — and the principal defect is not a style nit; it is a proven, mechanically reproducible break in which the component's entire declared appearance never reaches the DOM, and two of its three sibling surfaces lose their layout, their z-index and their click-outside affordance with it.**

| | count |
|---|---|
| **defects** (BLOCKER + MAJOR + MINOR rows) | **14** |
| **blockers** | **3** |
| **superlatives** (L-18, falsifier-survived) | **3** |
| INFO / discharge rows (not counted as defects) | 4 |
| candidate claims raised and then **killed by their own falsifier** (§5) | 4 |

The 69-LOC "Goldilocks" reading in `lane-frontend.md:163` is an artifact. This component is small **because its stylesheet was left in its parent**, where — provably — it does not apply. Size without self-containment is not right-sizing; it is a colocation defect wearing a good LOC number.

---

## §1 · BLOCKER 1 — the component's own styles are compiled into selectors that can never match

### 1.1 The claim

`PaperSearchInput.vue` renders four styled elements:

```
PaperSearchInput.vue:35   <div class="paper-search-input-wrap">
PaperSearchInput.vue:36     <Search class="paper-search-icon" />
PaperSearchInput.vue:40     <input class="paper-search-input" …>
PaperSearchInput.vue:51/62  <Button class="paper-search-action-btn" …>
```

The file has **no `<style>` block**. Every rule for those classes is declared exactly once, in the **parent's** scoped block:

```
PaperSearch.vue:41   <style scoped>
PaperSearch.vue:47   .paper-search-input-wrap { … }
PaperSearch.vue:62   .paper-search-icon { width:.8rem; height:.8rem; flex-shrink:0; color:… }
PaperSearch.vue:69   .paper-search-input { flex:1; min-width:0; border:none; outline:none;
                                           background:transparent; font-size:.78rem; color:… }
PaperSearch.vue:80   .paper-search-input::placeholder { … }
PaperSearch.vue:84   .paper-search-action-btn { … }
PaperSearch.vue:211  .paper-search--floating .paper-search-input { @apply text-base }
```

Exhaustive grep over `web/src` for `*.css` + `*.vue` returns **exactly one definition site** for all four classes — `PaperSearch.vue` — and no global stylesheet declares them (`web/src/style.css` is 143 lines and contains none).

Vue scoped CSS stamps the host's `data-v-*` on the elements of **that SFC's own template**, plus — via `setScopeId`'s single-root inheritance rule — the **root node** of a child component. Descendants of a `<style>`-less child get nothing. Therefore only `.paper-search-input-wrap` is styled; **`.paper-search-icon`, `.paper-search-input`, `.paper-search-input::placeholder`, `.paper-search-action-btn` and the `--floating` input override are dead rules.**

### 1.2 The probe (reproducible, self-contained)

Run from `/Users/mkbabb/Programming/fourier-analysis/web` (resolves the project's own Vue 3.5.38):

```js
// probe.mjs — (a) what compiler-sfc emits, (b) what the runtime actually stamps
import { readFileSync } from "node:fs";
import { parse, compileStyle } from "@vue/compiler-sfc";
import { createRenderer, h, defineComponent } from "@vue/runtime-core";

const SRC = "src/components/paper/PaperSearch.vue";
const { descriptor } = parse(readFileSync(SRC, "utf8"), { filename: SRC });
const style = descriptor.styles[0];                       // scoped === true
const out = compileStyle({
  source: style.content.replace(/@reference[^\n]*\n/, "").replace(/@apply[^;]*;/g, ""),
  filename: SRC, id: "data-v-PARENT", scoped: true,
});
console.log(out.code);                                     // → §1.3

const stamped = [];
const nodeOps = {
  createElement: (tag) => ({ tag, cls: null, scopes: [], children: [] }),
  createText: () => ({ tag: "#text", scopes: [] }),
  createComment: () => ({ tag: "#comment", scopes: [] }),
  setText(){}, setElementText(){},
  insert(c,p){ p?.children?.push(c); }, remove(){},
  parentNode: () => null, nextSibling: () => null, querySelector: () => null,
  setScopeId(el,id){ el.scopes.push(id); stamped.push([el,id]); },
  patchProp(el,k,_p,n){ if (k === "class") el.cls = n; },
};
const { createApp } = createRenderer(nodeOps);
const Btn   = defineComponent({ name:"GlassButton", render: () => h("button") });
const Child = defineComponent({ name:"PaperSearchInput",              // no <style>, SINGLE root
  render: () => h("div",{class:"paper-search-input-wrap"},[
    h("svg",{class:"paper-search-icon"}), h("input",{class:"paper-search-input"}),
    h(Btn,{class:"paper-search-action-btn"})]) });
const Frag  = defineComponent({ name:"PaperSearchDropdown",           // no <style>, MULTI root
  render: () => [h("div",{class:"paper-search-results"}), h("div",{class:"paper-search-backdrop"})] });
const Parent= defineComponent({ name:"PaperSearch", __scopeId:"data-v-PARENT",
  render: () => h("div",{class:"paper-search"},[h(Child), h(Frag)]) });
const ROOT = nodeOps.createElement("root");
createApp(Parent).mount(ROOT);
(function walk(n,d){ console.log(" ".repeat(d*2)+(n.cls??n.tag)+"  scopes="+JSON.stringify(n.scopes));
  (n.children||[]).forEach(c=>walk(c,d+1)); })(ROOT,0);
```

### 1.3 Probe output — compiler

```
### style block scoped?  true   lang: css
.paper-search-input-wrap[data-v-PARENT] { … }
.paper-search-input-wrap[data-v-PARENT]:focus-within { … }
.paper-search-icon[data-v-PARENT] { … }
.paper-search-input[data-v-PARENT] { … }
.paper-search-input[data-v-PARENT]::placeholder { … }
.paper-search-action-btn[data-v-PARENT] { … }
.paper-search-action-btn[data-v-PARENT]:hover { … }
.paper-search-results[data-v-PARENT] { … }
.paper-search-result[data-v-PARENT] { … }
.paper-search-badge[data-v-PARENT] { … }
.paper-search-label[data-v-PARENT] { … }
.paper-search-backdrop[data-v-PARENT] { … }
.paper-search--floating .paper-search-input-wrap[data-v-PARENT] { … }
.paper-search--floating .paper-search-input[data-v-PARENT] { … }
.paper-search--floating .paper-search-results[data-v-PARENT] { … }
.search-modal-overlay[data-v-PARENT] { … }
.search-modal-result .paper-search-badge[data-v-PARENT] { … }
```

The attribute lands on the **subject** compound of every selector. So every rule is gated on its subject element carrying `data-v-PARENT`.

### 1.4 Probe output — runtime

```
### elements that received data-v-PARENT
    paper-search-input-wrap  <- data-v-PARENT
    paper-search             <- data-v-PARENT

### tree
root  scopes=[]
  paper-search             scopes=["data-v-PARENT"]
    paper-search-input-wrap scopes=["data-v-PARENT"]
      paper-search-icon      scopes=[]      ← rule dead
      paper-search-input     scopes=[]      ← rule dead
      paper-search-action-btn scopes=[]     ← rule dead
    paper-search-results     scopes=[]      ← rule dead
    paper-search-backdrop    scopes=[]      ← rule dead
```

Runtime provenance for the single-root-only inheritance rule, in the installed copy:
`web/node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:5685-5698` —

```js
if (parentComponent) {
  let subTree = parentComponent.subTree;
  if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) subTree = filterSingleRoot(subTree.children) || subTree;
  if (vnode === subTree || …) {                       //  ← only the component's ROOT vnode
    const parentVNode = parentComponent.vnode;
    setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
  }
}
```

### 1.5 What actually changes on screen

Honest scoping — not all four dead rule groups matter equally:

| dead rule | consequence | grade |
|---|---|---|
| `.paper-search-icon` (`PaperSearch.vue:62-67`) | the leading `<Search>` is the **only** icon in the file without a Tailwind size utility (contrast `h-3 w-3` on `Maximize2`/`Minimize2`/`X` at `:55,:56,:66`, which are global utilities and **do** apply). `lucide-vue-next@1.0.0` ships `width:24 height:24` presentation attributes (`node_modules/lucide-vue-next/dist/esm/defaultAttributes.js`), so the icon paints at **24 px instead of 0.8 rem**, loses `flex-shrink:0`, and loses its muted colour. | **consequential** |
| `.paper-search-input` (`:69-78`) | loses `flex:1; min-width:0` → the `<input>` is no longer the flexing member; it keeps its intrinsic `size`-derived width (~20ch) and cannot be compressed below it. Also loses `font-size:.78rem` and `color:var(--foreground)`. In a `lg` sidebar column this pushes 24 px icon + ~20ch input + 2 × `--control-h-md` buttons past the column width. | **consequential** |
| `.paper-search-input::placeholder` (`:80-82`), `.paper-search--floating .paper-search-input` (`:211-213`) | placeholder colour and the mobile `text-base` bump never apply. | minor |
| `.paper-search-action-btn` (`:84-100`) | **largely redundant even if alive** — glass-ui `Button variant=ghost size=icon` already supplies `h-(--control-h-md) w-(--control-h-md) p-0` (`node_modules/@mkbabb/glass-ui/dist/button-BNDWhAZb.js:71`) plus a ghost hover. The dead `padding:.15rem` could never have beaten a fixed `h/w` anyway. | **cosmetic — declared honestly** |

Exact pixel outcome: **UNPROVEN-NEEDS-LIVE (SS-13)**. The rule death itself is proven above and needs no browser.

**Severity BLOCKER.**
**Falsifiers tried, all failed to save the code:** (a) a global definition of the four classes — `grep -rn` over `web/src` `*.css`/`*.vue` returns only `PaperSearch.vue` as definer; (b) a `<style>` block in `PaperSearchInput.vue` — the file is 69 lines and ends at `</template>:69`; (c) a `:deep()` wrapper in the parent — none of the six rules uses it; (d) descendants inheriting the scope id — refuted by the runtime probe **and** by the installed runtime source; (e) Tailwind v4 preflight covering the loss — preflight does zero the input's border/background and inherit its font, which is why the input is *legible*, but preflight supplies no `flex:1`, no `min-width:0`, and cannot resize a 24 px SVG.

---

## §2 · BLOCKER 2 — the same mechanism kills the dropdown and the modal outright, and that break is functional, not cosmetic

`PaperSearchDropdown.vue` has **two root nodes** (`:35` `<Transition>` and `:65` the backdrop `<div>`), so its subtree is a Fragment and the `vnode === subTree` test at `runtime-core.cjs.js:5690` fails for both. `PaperSearchModal.vue`'s root is a `<Teleport>` (`:41`) — same failure, confirmed by a second probe:

```
### teleport target tree
body  scopes=[]
  search-modal-overlay  scopes=[]        ← rule dead
    search-modal        scopes=[]        ← rule dead
```

Consequences that are **not** cosmetic:

| dead rule | functional loss | provenance |
|---|---|---|
| `.paper-search-results { position:absolute; top:calc(100% + 4px); z-index:var(--z-bar); max-height:50vh; overflow-y:auto }` | the 30-row result list renders **in normal flow inside the sidebar nav**, unbounded, with no scroll container — it displaces the "Contents" tree instead of overlaying it. *Falsifier tested:* the element also carries the **global** glass-ui class `glass-floating`, which does survive — but `node_modules/@mkbabb/glass-ui/dist/styles/glass/ladder.css:83-102` supplies only `position:**relative**`, background, `backdrop-filter`, border and shadow. It grants the surface **no** `position:absolute`, no offsets, no `z-index`, no `max-height`, no `overflow-y`; its `position:relative` is in fact what pins the list *into* the flow once the scoped `absolute` dies. The loss stands. | `PaperSearch.vue:103-116` vs `PaperSearchDropdown.vue:36-40` |
| `.paper-search-backdrop { position:fixed; inset:0 }` | the click-outside-to-dismiss surface collapses to a zero-height flow div → **the floating variant loses its only dismiss affordance** | `PaperSearch.vue:192-196` vs `PaperSearchDropdown.vue:65-69` |
| `.search-modal-overlay { position:fixed; inset:0; z-index:var(--z-modal); display:flex; backdrop-filter:blur(6px) }` + the whole `.search-modal*` set (`PaperSearch.vue:239-396`, ~160 lines) | the expand/`Maximize2` feature this component emits (`PaperSearchInput.vue:52 @click="emit('expand')"`) teleports an **unstyled static block to the end of `<body>`**, below `#app`, with no fixed positioning, no z-index and no width constraint | `PaperSearch.vue:239-396` vs `PaperSearchModal.vue:41-48` |
| `.search-dropdown-*` / `.search-modal-*` transition classes (`PaperSearch.vue:225-236, 359-396`) | every `<Transition>` in the family animates nothing | same |

Of the 356-line style block (`PaperSearch.vue:41-397`) the **only** rules whose subject provably carries the scope attribute are `.paper-search` (`:43`), `.paper-search-input-wrap` + `:focus-within` (`:47,:58`), `.paper-search--sidebar` (`:199`) and `.paper-search--floating .paper-search-input-wrap` (`:204`). Everything else is compiled dead weight shipped in the bundle.

`PaperSearchInput` is the emitter of the `expand` event whose entire destination surface is unstyled; it is therefore a participant, not a bystander.

Neither `.search-modal-overlay` nor `.search-modal` carries any global glass-ui class to fall back on (`PaperSearchModal.vue:43-48` — bare bespoke classes only), so unlike the dropdown the modal keeps nothing at all.

**Severity BLOCKER.** **Falsifier:** if Teleported or multi-root content did inherit the host scope id, `.search-modal-overlay[data-v-*]` would match — the probe shows `scopes=[]` on both. Live confirmation of where the modal block lands: **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Working-tree provenance note.** `fourier-analysis` is dirty at read time from a concurrent tri-tranche run (28 modified paths; `docs/constellation/tri-tranche-run/RUN-BOARD.md` among them). Of the files cited in this challenge, exactly three are modified: `PaperView.vue`, `MobileFloatingToc.vue`, and `PaperSearchDropdown.vue` — the last by a **single line**, `class="paper-search-results glass-elevated"` → `glass-floating` (`git diff` at `:39`), which is the very class the falsifier above tests. **The subject file `PaperSearchInput.vue` is clean**, as are `PaperSearch.vue`, `usePaperSearch.ts`, `paperSearchIndex.ts`, `searchHelpers.ts`, `PaperSearchModal.vue`, `index.ts` and `PaperSidebar.vue`. Every citation above is against the live working tree, per the read-only-evidence law. Zero writes were made to that repository by this lane.

---

## §3 · BLOCKER 3 — the search contract this component feeds returns different results for the same query depending on typing cadence

`PaperSearchInput.vue:43` is the sole ingress for every keystroke:

```
@input="search.query.value = ($event.target as HTMLInputElement).value"
```

→ `usePaperSearch.ts:29-33` (120 ms debounce) → `usePaperSearch.ts:35-37` `computed(() => searchIndex(index, debouncedQuery.value, 30))` → `paperSearchIndex.ts:198-242`:

```js
// paperSearchIndex.ts:219-228
let candidates = index;
if (q.length > 1) {
  const prefix = q.slice(0, -1);
  const prefixResults = _cache.get(prefix);
  if (prefixResults) candidates = prefixResults;   // ← narrow from the PREVIOUS result set
}
…
// paperSearchIndex.ts:238-240
scored.sort((a,b) => b.score - a.score);
const results = scored.slice(0, maxResults);       // ← the cache stores the TRUNCATED top-30
_cache.set(q, results);
```

Two independent defects compose:

1. **Truncated narrowing.** The cached prefix entry is already `slice(0, 30)`. Narrowing from it means any entry outside the top 30 for `"th"` can never appear for `"theo"`, `"theor"`, … however strongly it scores. Truncation compounds one character at a time.
2. **Unsound narrowing.** `scoreEntry` (`paperSearchIndex.ts:163-191`) takes the **best of five differently weighted fields** — `number ×18`, `label ×12`, `type ×10`, `rawTex ×6`, `plain ×3`. A longer query can promote a field a shorter query barely touched (e.g. an entry that ranks #45 on `plain` for `"th"` but would rank #1 on `number ×18` for `"thm 3.2"`). Narrowing assumes monotonicity that the scorer does not provide.

**The failure scenario, stated so it can be falsified:** open the search and type `f`, wait ≥120 ms, then type `o`, `u`, `r`, `i`, `e`, `r` at ≥120 ms intervals → each step narrows from a 30-row truncation. Now reload and **paste** `fourier` → no prefix key was ever cached, `candidates = index` (the full array from `buildSearchIndex`, `paperSearchIndex.ts:397-401`), full-corpus scoring. Same query string, two different result sets. The discriminator is human typing speed against a 120 ms debounce.

**Fix site is `paperSearchIndex.ts:219-228`, not this component** — but the component owns the contract's only ingress and ships no guard, no `maxResults` awareness, and no way for a consumer to opt out. Severity is graded on the defect, not on ownership.

**Severity BLOCKER.**
**Falsifier tried:** "the prefix is rarely cached, so the branch is cold." Partly true — and that is exactly the defect: the branch's reachability is a function of typing cadence, which makes the feature **non-deterministic** rather than merely truncated. Reproduction is static (no browser required): call `searchIndex(idx, "th")` then `searchIndex(idx, "the")`, versus `searchIndex(idx, "the")` on a fresh module, and diff.

---

## §4 · MAJOR

### M-1 · Duplication — this component and `PaperSearchModal.vue` are the same component twice

| duplicated unit | here | there |
|---|---|---|
| `ref<HTMLInputElement \| null>(null)` + a `watch(flag) → nextTick → ref?.focus()` auto-focus block | `:17-25` | `PaperSearchModal.vue:16-24` |
| `:value` / `@input` with an inline `($event.target as HTMLInputElement).value` cast | `:42-43` | `PaperSearchModal.vue:57-58` |
| `<Search class="…-icon" />` + `@keydown="search.onKeydown"` | `:36,:44` | `PaperSearchModal.vue:51,:59` |
| a `Button variant=ghost size=icon class="paper-search-action-btn"` calling `search.close()` with an `<X class="h-3 w-3">` | `:58-67` | `PaperSearchModal.vue:70-78` |

A third near-copy of the `watch → nextTick → scrollIntoView/focus` idiom sits at `PaperSearchDropdown.vue:19-28`. Three files, one extractable `useDeferredFocus(flag, elRef)`.
**Severity MAJOR.** **Falsifier:** "the modal input differs materially" — it differs only in class names and one absent `@focus` handler; the logic is character-identical.

### M-2 · The open→focus contract this component solely implements fails silently below 1024 px, so ⌘K/Ctrl-K is inert there

`PaperView.vue:103-108` binds a global `⌘/Ctrl+K` → `search.open()` → `isOpen = true`. The **only** code that turns `isOpen` into focus is `PaperSearchInput.vue:20-25`. Below 1024 px:

* the sidebar host is `display:none` (`PaperSidebar.vue:132-136`; `display:block` only inside `@media (min-width:1024px)` at `:138-148`) — and per the HTML focusing steps a non-rendered element is not focusable, so `inputRef.value?.focus()` is a **spec no-op that reports nothing**;
* the mobile host mounts its `PaperSearch` only under `v-if="searchActive"` (`MobileFloatingToc.vue:110-111`), and `searchActive` is set **only** by `openMobileSearch()` (`:88`) — never by `isOpen`.

So `⌘K` opens invisible state and focuses nothing. The optional-chained `?.focus()` at `:23` and `:28` is precisely the error posture that makes this undetectable: the component cannot distinguish "focused" from "silently refused".
**Severity MAJOR.** **Falsifier tried:** "some other watcher answers `isOpen`" — `grep -n "isOpen" web/src` yields `usePaperSearch.ts:20,46,52,57`, `PaperSearchInput.vue:21,45`, `PaperSearchDropdown.vue:37,66`, `MobileFloatingToc.vue:99`. `MobileFloatingToc.vue:99-102` reacts only to `isOpen → false`. No other opener exists. Live confirmation of the no-op: **UNPROVEN-NEEDS-LIVE (SS-13)**; the spec basis is static.

### M-3 · No focus restoration when the modal collapses — keyboard navigation dies

The watch keys on `isOpen` only (`:21`). Collapsing the modal flips `isExpanded` `true → false` (`usePaperSearch.ts:60-62`, or `onKeydown`'s Escape branch at `:79-85`) while `isOpen` stays `true`. `PaperSearchModal.vue:19-24` focuses only on `expanded === true`, and its input then unmounts. Nothing refocuses this component's input, and `onKeydown` is bound **only** to the two `<input>` elements (`PaperSearchInput.vue:44`, `PaperSearchModal.vue:59`) — so after a collapse, ↑/↓/Enter/Escape are dead until the user clicks back into the field.
**Severity MAJOR.** **Falsifier tried:** the exposed `focus()` (`:27-31`) could restore it — its only caller is `MobileFloatingToc.vue:90` inside `openMobileSearch()`, never on collapse (`PaperSearch.vue:15-19` merely forwards it).

### M-4 · Composable-contract bypass: the template writes the composable's refs directly, past its own API

`usePaperSearch` exports `open()` (`usePaperSearch.ts:56-58`) and returns every ref **unwrapped and writable** (`:88-100` — no `readonly()`, no `shallowReadonly()`). The template ignores the API:

```
PaperSearchInput.vue:43   @input="search.query.value = …"        // not a setter
PaperSearchInput.vue:45   @focus="search.isOpen.value = true"    // open() exists and is bypassed
```

(`PaperSearchDropdown.vue:48,:90` does the same to `selectedIndex`.) Two ways to perform one state transition, and the component picks the one that cannot be instrumented: any invariant later added to `open()` — analytics, a "don't open while expanded" guard, a focus trap — is silently skipped at `:45`. Compounding this, `PaperSearchState = ReturnType<typeof usePaperSearch>` (`usePaperSearch.ts:103`) is prop-drilled **two levels** (`PaperView.vue:111` → `PaperSidebar.vue:51` / `MobileFloatingToc.vue:111` → `PaperSearch.vue:26` → here), so a child mutates a grandparent's state through a `props` object — legal JS, but it defeats one-way-data-flow attribution and forces the `search.x.value` idiom through every template because nested refs in a props object are not unwrapped.
**Severity MAJOR.** **Falsifier tried:** "these are refs, mutating them through a prop is idiomatic" — idiomatic *when there is no alternative API*. Here there is one, in the same file, unused.

### M-5 · The entire 832-LOC search family has zero automated coverage — which is why §1–§3 could ship

* `web/` has **no vitest config** (`ls vitest.config*` → no match) and **no** `*.test.ts` / `*.spec.ts` outside `e2e/` (`find web -name '*.test.ts' -not -path '*/node_modules/*'` → empty).
* `grep -rn "paper-search" web/e2e/` → **empty**. The nine Playwright specs (`contour-extraction`, `gallery`, `paper-performance`, `settings-persistence`, `visual-baseline`, `visualization-crud`, `visualization-ux`, `workspace-flow`) never touch a `paper-search*` selector, including `paper-performance.spec.ts`.
* `build` is `vue-tsc -b && vite build` (`web/package.json:8`) — a typechecker, which by construction cannot see a CSS selector that fails to match.

**Severity MAJOR.** **Falsifier tried:** `visual-baseline.spec.ts` might screenshot the sidebar with search open — it contains no `search` reference at all.

---

## §5 · MINOR

| # | defect | provenance | falsifier (outcome) |
|---|---|---|---|
| m-1 | **Dead prop.** `variant: "sidebar" \| "floating"` is declared and passed (`PaperSearch.vue:27`) but never read. The only `variant` tokens in the template are glass-ui `Button`'s own `variant="ghost"` (`:49,:60`). The sibling `PaperSearchDropdown.vue:66` *does* consume its `variant`, so the prop was copied without its purpose. `tsconfig` sets `strict:true` but no `noUnusedLocals`, so `vue-tsc` will not flag it. | `PaperSearchInput.vue:9` | grep `variant` in the file → `:9, :49, :60` only. **stands** |
| m-2 | **Dead barrel.** `search/index.ts` re-exports 4 symbol groups; **zero** importers — every consumer reaches past it (`./search/usePaperSearch`, `./searchHelpers`, …). A module that exists only to be bypassed. | `search/index.ts:1-4` | `grep -rn 'from "./search"\|@/components/paper/search"' web/src` → empty. **stands** |
| m-3 | **Label/behaviour mismatch, and no `clear()` in the contract.** The button is titled `"Clear search"` but calls `search.close()` (`usePaperSearch.ts:48-53`), which additionally sets `isOpen=false`, `isExpanded=false`, `selectedIndex=0` — collapsing the modal and dismissing the dropdown. The composable exposes no `clear()`. The button is also `v-if="search.query.value"`, so it **unmounts under the pointer** the instant it is used. | `:58-67` | is `close()` the intended semantic? `usePaperSearch.ts:48-53` sets four fields; a clear sets one. **stands** |
| m-4 | **Hand-rolled `v-model` loses the IME composition guard.** `:value` + raw `@input` bypasses Vue's `vModelText`, whose `composing` flag suppresses `input` between `compositionstart`/`compositionend`. Every intermediate composition keystroke therefore enters the 120 ms debounce and scores a partial string. | `:42-43` (dup at `PaperSearchModal.vue:57-58`) | corpus is English LaTeX, so impact is low — the defect is real, the blast radius is small. **stands, downgraded** |
| m-5 | **The collapse affordance is gated on a predicate that can go false while expanded.** `canExpand = !!query && results.length > 0` (`PaperSearch.vue:28`). Clearing the query inside the modal drives `canExpand → false` while `isExpanded` remains `true`, unmounting the `Minimize2` branch (`:56`) exactly when it is the collapse control. Also: `canExpand` is re-derived in the parent although the child already holds `search` — a redundant prop. | `:48, :53-57` | does anything else recompute `canExpand`? Single site, `PaperSearch.vue:28`. **stands** |
| m-6 | **Debounce timer is not disposed.** `let debounceTimer` (`usePaperSearch.ts:27`) is cleared only on the next keystroke; there is no `onScopeDispose(() => clearTimeout(debounceTimer))`. On unmount with a pending timer the callback still fires and writes `debouncedQuery.value` on a disposed scope. | `usePaperSearch.ts:27-33` | bounded to ≤120 ms and writes to a ref whose only reader (`computed` at `:35`) is already stopped → harmless, but uncleaned. **stands as MINOR, impact declared** |

---

## §6 · Superlatives (L-18 runs both ways — each survived its own falsifier)

**S-1 · Teardown posture is clean, and unusually so for a focus-managing component.** The file adds **zero** listeners, timers, observers or global handlers; the single `watch` (`:20-25`) is instance-bound and auto-disposed; and the deferred continuation is null-guarded (`inputRef.value?.focus()`, `:23`) so an open→unmount inside one tick cannot throw.
*Falsifier:* `grep -nE "addEventListener|setInterval|setTimeout|new (Resize|Intersection|Mutation)Observer|document\.|window\." PaperSearchInput.vue` → **no matches**. Contrast `MobileFloatingToc.vue:44-56`, which mutates `props.scrollContainer.style.overflow` and needs an `onUnmounted` to undo it, and `PaperSearchModal.vue:32`, which reaches for `document.querySelector(".search-modal-results")` from a child. **Survives.**

**S-2 · The imperative surface is minimal, honest, and actually consumed.** `defineExpose({ focus })` (`:31`) publishes exactly one method — not the instance, not the input ref — and it has a real caller chain: `MobileFloatingToc.vue:90` → `PaperSearch.vue:15-19` → here. It exists because the mobile mount order makes the declarative watch unreachable (`searchActive` and `isOpen` flip in the same tick, so a non-immediate watcher created during that mount never fires), and it is the correct escape hatch for exactly that case.
*Falsifier:* an exposed method with no caller would be dead API — this one has one, and the reason for its existence is structural rather than lazy. **Survives.**

**S-3 · The emit contract is minimal, correctly typed, and — unlike both siblings — actually fired.** `defineEmits<{ expand: [] }>()` (`:13-15`) declares one payload-free event and `:52` fires it. `PaperSearchDropdown.vue:12-14` and `PaperSearchModal.vue:12-14` each declare `select: [id: string]` and **never emit it** — two dead emit contracts and two unused `const emit` bindings that `strict:true`-without-`noUnusedLocals` lets through.
*Falsifier:* `grep -n "emit(" PaperSearchInput.vue` → one call, matching the one declaration. **Survives.**

---

## §7 · Axis rows discharged with proof (INFO — not counted as defects)

**i-1 · Viz render path: N/A, proven.** This component has **no** contact with the canvas/WebGL render path. Census provenance: `CENSUS-2026-08-03.md:85-88` — *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven) + 12 SVG surfaces"*. All three live under `components/visualization/`; the paper route mounts none — `grep -rn "canvas" web/src/components/paper/*.vue` → **empty**, and `PaperArticleWindow.vue` renders figures through `@/lib/figureDimensions` images, not canvases. The only path from this component into anything expensive is `selectResult → navigateTo` (`usePaperSearch.ts:43-46` → `PaperView.vue:111` → `useScrollNavigation.ts:202-212 performScroll`), which re-drives the virtual section window — DOM/scroll work, not raster work. **I decline to manufacture a viz-contention claim here; the honest row is a negative.** One adjacent observation worth booking: `web/src/lib/scheduler.ts` ships `yieldToMain()`/`processInChunks()` (`lane-frontend.md:568`) and the per-keystroke `searchIndex` scoring loop (`paperSearchIndex.ts:230-236`) does **not** use it — a main-thread scoring pass over the full index with only a 120 ms debounce between it and the user. Cost magnitude: **UNPROVEN-NEEDS-LIVE (SS-13)**.

**i-2 · R5-7 template-loop invisibility: N/A, proven — with an adjacent class this component *does* sit in.** `PaperSearchInput.vue` contains **zero** `v-for` (grep → no match), so it contributes nothing to the R5-7 blind spot adjudicated TRUE at `lane-fourier-r3-r6.md:125` (*"template-loop evidence keyed to component callsites is blind to native HTML element loops"*; locus = `PaperSidebar.vue`'s three native `<li v-for>` at `:65,:87,:105`, cured by R6's `NATIVE_TEMPLATE_LOOP` family, `lane-fourier-r3-r6.md:140`). Note further that the family's two loops — `PaperSearchDropdown.vue:42` and `PaperSearchModal.vue:84` — iterate a **`<Button>` component**, i.e. exactly the *registered component callsite* shape the deriver already counts, so the whole search family is R5-7-clean. What this component *does* contribute is two **conditional** component callsites (`v-if="canExpand"` `:48`, `v-if="search.query.value"` `:59`) — callsite-stable but instance-variable, which is unresolvable while the **mounted-instance denominator remains OPEN** (`CENSUS-2026-08-03.md:336` adopted fact 2; scope-law conflict at `lane-fourier-r3-r6.md:160` X-9, carried to F.W4). Any per-component instance figure for this file must publish which of the two Buttons it counted.

**i-3 · The module-level result cache is *not* a leak — claim withdrawn, recorded for the record.** `let _cache = new Map()` at `paperSearchIndex.ts:196` is a module singleton shared by every `usePaperSearch`. It is bounded (`if (_cache.size > 200) _cache.clear()`, `:214`) **and** cleared on every close, because `close()` sets `query=""` (`usePaperSearch.ts:51`) → debounce → `searchIndex(index, "")` → `_cache.clear()` (`:204-207`). The residual hazard is cross-index contamination — the key is the query string with no index identity — which is **unreachable today**: `grep -rn "usePaperSearch(" web/src` → exactly one call site, `PaperView.vue:111`. Reachable the moment a second paper is indexed.

**i-4 · One accidental benefit, noted so the fix does not surprise anyone.** `.search-modal-overlay`'s `backdrop-filter: blur(6px)` / `-webkit-backdrop-filter` (`PaperSearch.vue:248-249`) is currently dead, so the modal ships without a compositor-expensive backdrop blur. Repairing §2 **re-introduces** that cost on every expand. Budget it.

**Out of axis, routed not adjudicated:** the `<input>` at `:37-46` has no `<label>`, no `aria-label`, and no `role="combobox"` / `aria-expanded` / `aria-controls` / `aria-activedescendant` wiring to the dropdown it drives — the ↑/↓ selection model is invisible to assistive tech. That belongs to the A/D-axis challenger for this slug; it is recorded here only so it is not lost.

---

## §8 · Candidate claims raised and killed by their own falsifier

Recorded because a challenge that only reports survivors cannot be trusted on the ones it kept.

1. **"Two mounted `PaperSearchInput` instances race for focus."** Both hosts share one `PaperSearchState`, and both `nextTick` continuations chain off the same flush promise (`MobileFloatingToc.vue:90` registers before the watcher's callback at `PaperSearchInput.vue:23`, so the watcher's would land last and win). **Killed:** the hosts are mutually exclusive by breakpoint — `.paper-sidebar` is `display:none` below 1024 px (`PaperSidebar.vue:132-136`) and `.floating-toc` carries `lg:hidden` (`MobileFloatingToc.vue:106`). Whenever the mobile input is visible the sidebar input is unrendered, so the "winning" `focus()` is a no-op that does not blur anything. **Unreachable.**
2. **"`@focus` → `isOpen = true` → the watcher refocuses → infinite loop."** **Killed:** `focus()` on an already-focused element fires no `focus` event; the cycle cannot re-enter.
3. **"The `nextTick` at `:23` is unnecessary."** The `<input>` is unconditional inside the always-rendered wrap, so `inputRef` is non-null for the entire mounted lifetime and the deferral guards nothing reachable. **Killed as a defect** — it costs one microtask, harms nothing, and (S-1) is what makes the callback null-safe. Redundant, not wrong.
4. **"`.paper-search-action-btn` dying is a visible break."** **Killed / downgraded** — glass-ui's `size="icon"` already fixes the button box (`button-BNDWhAZb.js:71`) and its ghost variant already supplies the hover; the dead rule's `padding:.15rem` could never have overridden a fixed `h`/`w` even if it had matched. Reported at cosmetic grade in §1.5 rather than inflated into §1's blocker.

---

## §9 · Reconciliation with the hitherto corpus

**Contradicted, explicitly.** `lane-frontend.md:600` records the post-A.W2 styling posture as *"`web/src/styles/` no longer exists … Everything now lives at the entry or in scoped SFC blocks."* That is true as a **location** statement and false as a **correctness** statement for this family: the styles do live in a scoped SFC block — the **wrong** SFC — and §1–§2 prove that ~317 of the 356 lines in `PaperSearch.vue:41-397` are compiled into selectors that no element in the shipped tree carries. The lane's audit of the styling migration measured *where files went*, not *whether the rules match*. **Amendment proposed:** the "scoped SFC blocks" posture needs a per-SFC ownership check — a scoped rule whose subject element is rendered by a `<style>`-less child, a multi-root child, or a Teleport is dead by construction.

**Extended, not contradicted.**
* `lane-frontend.md:163` counts this file as `69 | Input + Button`. Accurate as a count; §0 shows the 69 is purchased by the colocation defect, so it should not be read as a Goldilocks pass.
* `lane-frontend.md:154` marks `PaperSearch.vue` (397) a **SHADOW candidate**; `lane-frontend.md:438` and `CENSUS-2026-08-03.md:99-101` book the family (832 LOC) against glass-ui's `./search` + `useDockSearch`/`useFuzzySearch` (*"the VSCode subsequence scorer — NO re-fork"*). This challenge **strengthens** that recommendation with three independent arguments the shadow rows did not have: the fork's scorer carries the §3 non-determinism, the fork's styling is structurally broken (§1–§2), and the fork has zero tests (M-5). Adopting the producer's `useFuzzySearch` retires §3 and M-5 at once.
* `CENSUS-2026-08-03.md:336` (adopted fact 2) counts *"2 Teleports (`PaperSearchModal.vue:41`, `FullscreenViewer.vue:105` — fills a census gap)"* as a structural fact. §2 gives that row a **defect meaning**: a Teleport is also a scoped-style boundary, and `PaperSearchModal.vue:41` is precisely where ~160 CSS lines die. `FullscreenViewer.vue:105` should be checked for the same class before F.W4 closes.
* `lane-fourier-r3-r6.md:125` (**R5-7, adjudicated TRUE / ADOPT-AS-FACT**) and `:140` (**R6-5/R6-6**) are cited in i-2 and are **not** contradicted; this component simply does not sit in that class, and i-2 says why with a grep.
* `lane-fourier-r3-r6.md:160` (**X-9**, denominator scope law OPEN, carried to F.W4) is the reason i-2 refuses to publish an instance figure for this file.

**No overlap and therefore no position on** R3-1/R4-x authority rows, the `TERMINAL-RED` identity rows (R4-3), or the intake's 38/52 tally.

---

## §10 · Fix order (dependency-correct)

1. **§1 + §2 together, one edit shape.** Move each rule to the SFC that renders its subject: `.paper-search-icon` / `.paper-search-input*` / `.paper-search-action-btn` → a `<style scoped>` in `PaperSearchInput.vue`; the `.paper-search-result*` / `.paper-search-badge` / `.paper-search-label` / `.paper-search-backdrop` / `.search-dropdown-*` set → `PaperSearchDropdown.vue`; the whole `.search-modal-*` set → `PaperSearchModal.vue`. `.paper-search`, `.paper-search--sidebar/--floating` and `.paper-search-input-wrap` stay in `PaperSearch.vue`. The `--floating` descendant overrides (`:211-221`) must be re-expressed as a prop/class on the child, since a parent scope id cannot reach a grandchild — **which is exactly what m-1's dead `variant` prop was for.** Fixing §1 gives `variant` its job back and retires m-1 in the same edit. Re-budget the restored `backdrop-filter` (i-4).
2. **M-5 before anything else lands** — one Playwright spec asserting the search row's computed height, the dropdown's `position`, and the modal overlay's `position: fixed`. Without it, §1/§2 regress invisibly again.
3. **§3** at `paperSearchIndex.ts:219-228`: delete the prefix-narrowing branch (correct and simplest), or key the cache on `(indexIdentity, query)` and cache the **untruncated** scored set with the slice applied at read time.
4. **M-2, M-3, M-4** — hoist the open/focus contract into `usePaperSearch` as an explicit `requestFocus()` signal that a host answers, make `open()`/`close()`/`clear()` the sole mutators, return the refs `readonly`, and add a viewport-aware host so ⌘K reaches the mobile surface.
5. **M-1, m-2, m-3, m-4, m-5, m-6** — the deduplication (`useDeferredFocus`), the dead barrel, the real `clear()`, `v-model`, the `canExpand` gate, and `onScopeDispose(() => clearTimeout(debounceTimer))`.
6. Only then re-open the `lane-frontend.md:438` shadow question. Repairing a fork you intend to retire is waste; the ordering above is written so steps 3–5 are precisely the work that **disappears** if the producer's `./search` + `useFuzzySearch` is adopted instead.

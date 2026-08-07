claude-opus-5[1m]

# CHALLENGE — `PaperSidebar.vue` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/PaperSidebar.vue` (283 lines: 46 script / 82 template / 155 style)
**Posture** DEFECTIVE-until-proven. Static + source-derived only; no browser tooling. Every claim carries severity + `file:line` + its falsifier. Superlatives carry the same burden (L-18 runs both ways).
**Authority for third-party behaviour** = the **INSTALLED** trees under `web/node_modules/`, never the sibling working repos. `/Users/mkbabb/Programming/glass-ui` is a *divergent unreleased* tree (component layout `src/components/button/`, `emphasis`/`tone` axes) whereas the installed `@mkbabb/glass-ui@4.0.0` is the cva layout (`dist/components/ui/button/`, `variant`/`size`). Auditing against the working repo would have manufactured four false positives; all four are recorded as REFUTED in §5.

**Tally** — 16 defects · **0 BLOCKERS** · 5 superlatives · 4 refuted candidates.

---

## §0 · Import closure actually read

| File | Why |
|---|---|
| `web/src/components/paper/PaperSidebar.vue` | target |
| `web/src/components/ui/tooltip/Tooltip.vue` | `:2` local shim |
| `web/src/components/paper/PaperSearch.vue` | `:3` |
| `web/src/components/paper/search/{PaperSearchInput,PaperSearchDropdown,PaperSearchModal}.vue` | PaperSearch's children |
| `web/src/components/paper/search/usePaperSearch.ts` | `:5` type + state |
| `web/src/lib/paperContent.ts` | `:4` — re-export of `@mkbabb/latex-paper` |
| `node_modules/@mkbabb/glass-ui/dist/components/ui/button/Button.vue.d.ts` | `:6` installed contract |
| `node_modules/@mkbabb/glass-ui/dist/CollapsibleContent-C_s6fG7r.js` + `dist/components/ui/collapsible/*.d.ts` | `:7` installed impl |
| `node_modules/@mkbabb/glass-ui/dist/TooltipProvider-B3MkB_8P.js`, `dist/tooltip.js` | installed tooltip impl |
| `node_modules/@mkbabb/glass-ui/dist/sidebar.js` + `dist/composables/sidebar/*.d.ts` | `:8` `useSidebarState` |
| `node_modules/reka-ui/src/Collapsible/{CollapsibleRoot,CollapsibleContent}.vue` | disclosure semantics |
| `node_modules/reka-ui/src/shared/{useForwardProps,useForwardPropsEmits}.ts` | prop-forwarding semantics |
| `node_modules/@mkbabb/glass-ui/dist/styles/tokens/light-dark.css` | `--section-color-*` |
| `web/src/components/paper/{PaperView,MobileFloatingToc}.vue`, `paperTree.ts`, `useScrollNavigation.ts` | the caller + the sibling consumer |
| `latex-paper/src/vue/composables/{useKatex,useVirtualSectionWindow}.ts`, `src/vue/tracking/useTreeIndex.ts`, `src/transform/sections.ts`, `src/vue/context.ts` | `renderTitle` / `activeId` / tree shape |
| `web/src/App.vue`, `web/src/style.css`, `web/vite.config.ts`, `paper/fourier_paper.tex` | provider, tokens, build, content |

---

## §1 · Fold of the hitherto corpus (cited, not re-derived)

- **R5-7 / R6-5** (`audit/codex-provenance/intakes/lane-fourier-r3-r6.md:125,139`) — ADOPTED-AS-FACT: three native `<li v-for>` at **65 / 87 / 105**, expressions `(section, si) in sections` / `sub in section.subsections` / `subsub in sub.subsections`; `DERIVED-REGISTRIES.leafValues["instance.loop.paper-sidebar"]` was `[]` under callsite-keyed derivation. Re-confirmed line-for-line against the live tree. **This challenge does not re-litigate R5-7; it supplies the denominator R5-7 was blind to** (§3, L-10).
- **R3-7a** (`…:79`) — PaperSidebar contributes **2 of the 35** `Tooltip` callsites over nine consumers (live: `:70`, `:88`); the migration budget for retiring `ui/tooltip/Tooltip.vue` is booked to **F.W3**. L-10's per-row stack is exactly this indirection measured.
- **CENSUS §3a** (`formation/fourier/CENSUS-2026-08-03.md:85-101`) + **lane-frontend §6** (`lane-frontend.md:512-570`) — viz architecture: **Canvas2D throughout, WebGL/WebGPU ABSENT**; three independent canvases (Path A epicycle instrument off `stores/animation.ts:56` with the I.γ off-screen gate at `:48-53`; Path B `ConvergencePlot.vue:67-69` own **ungated** rAF; Path C `FrequencyGraph.vue:157` watch-driven) + 12 SVG surfaces; INP floor `lib/scheduler.ts` explicitly scoped away from the render loop.
- **lane-frontend §2** (`:156`) — PaperSidebar 283 LOC, "Desktop ToC sidebar (`useSidebarState` + `Collapsible`)". Confirmed.
- **lane-frontend §3/§8** (`:91`, `:594-604`) — the `--viz-amber` WCAG darken is a held glass-BH carry. **Corpus correction, §4.**

---

## §2 · Where this component meets the viz render path

**It does not enter it.** `grep -rn "canvas\|getContext\|webgl" web/src/components/paper/` returns nothing; none of Paths A/B/C nor the 12 SVG surfaces enumerated at `lane-frontend.md:564` live under `components/paper/`. Falsifier: any canvas/WebGL handle reachable from PaperSidebar's import closure — none exists across the 30 files in §0.

Two real contacts remain, and both matter to findings below:

1. **Palette.** `PaperSidebar.vue:77,96,112` consume `var(--section-color-${si})`, defined at `glass-ui/dist/styles/tokens/light-dark.css:126-138` — the same token family the viz palette draws from. `web/src/style.css:119-127` (the census's "`--viz-amber` WCAG darken", `lane-frontend.md:604`) rewrites **both** `--viz-amber` *and* `--section-color-5`, in both light and dark arms. See L-9 and §4.
2. **Main-thread budget.** The sidebar's render work sits **outside both** disciplines the census banks: it is not registered with the `stores/animation.ts:95 setCanvasVisible` off-screen gate (correctly — no canvas), and it is not routed through `lib/scheduler.ts`'s `yieldToMain()` floor, whose header (`scheduler.ts:14-19`) scopes itself to gallery infinite-scroll. It is a small unbudgeted consumer that fires on every section-boundary crossing (L-8).

---

## §3 · Defects

### L-1 · MAJOR · The search-modal singleton is mounted from a viewport-conditional presentational component; two `Teleport`-to-`body` modals coexist

`PaperSidebar.vue:51` renders `<PaperSearch :search="search" variant="sidebar" />` **unconditionally**. `PaperSearch.vue:31-33` renders `<PaperSearchModal :search="search" />` unconditionally. `PaperSearchModal.vue:41` is `<Teleport to="body">` gated on the *shared* `search.isExpanded` (`:44`). `MobileFloatingToc.vue:110-111` mounts a **second** `<PaperSearch>` off the same `PaperSearchState` object, which `PaperView.vue:111` creates once and passes to both (`PaperView.vue:328`, `:347`).

Concurrency is real: `MobileFloatingToc` is gated `v-if="!mobileTocVisible"` (`PaperView.vue:319-320`), and `mobileTocVisible` is written by an `IntersectionObserver` (`PaperView.vue:248-255`) observing `<nav ref="mobileNavRef" class="… lg:hidden">` (`PaperView.vue:361`). Below `lg` the mobile-search path (`MobileFloatingToc.vue:86-91 openMobileSearch`) sets `searchActive = true`, mounting its `PaperSearch` while PaperSidebar's is already mounted. Expanding then puts **two identical `.search-modal-overlay` subtrees in `<body>`**.

Three concrete consequences, all source-derived:

- `PaperSearchModal.vue:32` scrolls the selected result with `document.querySelector(".search-modal-results")` — a **document-global** selector. Both instances' watchers resolve to the *first* match in document order, so the visible modal's ↑/↓ keyboard navigation never scrolls its own list into view.
- Both instances run `nextTick(() => modalInputRef.value?.focus())` (`PaperSearchModal.vue:22`) on the same `isExpanded` flip — a focus race decided by mount order, not by which modal the user sees.
- Two stacked `position:fixed; inset:0` overlays each carrying `backdrop-filter: blur(6px)` and `background: color-mix(in srgb, var(--background) 55%, transparent)` (`PaperSearch.vue` style block, `.search-modal-overlay`) composite to ≈80% and double-blur. **UNPROVEN-NEEDS-LIVE (SS-13)** for the visual magnitude; the double mount itself is static.

The ownership error is PaperSidebar's: a *desktop ToC skin* mounts a global, body-teleported, state-singleton-shaped surface. The modal belongs to the state's owner (`PaperView`), rendered once.

**Falsifier** — dies if any of: PaperSidebar's `<PaperSearch>` is `v-if`-gated on viewport; `PaperSearchModal` is hoisted to `PaperView`; the modal is not teleported; or `MobileFloatingToc` cannot be mounted while PaperSidebar is. None hold at `PaperSidebar.vue:51` / `PaperSearch.vue:31` / `PaperSearchModal.vue:41` / `PaperView.vue:319,335`.

---

### L-2 · MAJOR · `treeIndex` — a dead prop, `any`-typed, in the public contract

`PaperSidebar.vue:20` declares `treeIndex: Map<string, any>;`. `PaperView.vue:343` passes `:tree-index="treeIndex"`. **The identifier appears nowhere else in the SFC** — not in the template, not in the script body.

Two defects in one line:
- **Dead surface.** A prop that costs the parent a `useTreeIndex` result it must keep alive, consumed by nobody.
- **`any` in a declared contract.** The precise type exists and is exported: `TreeIndexEntry<PaperSectionData>` / `SidebarIndexEntry` (`glass-ui/dist/composables/sidebar/types.d.ts`), and `latex-paper`'s equivalent. `Map<string, any>` defeats `vue-tsc -b` (`web/package.json:8`) at exactly the seam where the two packages' `TreeIndexEntry` shapes must agree.

**Falsifier** — `grep -n "treeIndex" web/src/components/paper/PaperSidebar.vue` → **line 20 only**. Any second occurrence kills the dead-surface half; any absence of a nameable entry type kills the `any` half (both exist).

---

### L-3 · MAJOR · `useSidebarState` is consumed for 2 of its 10 members and builds the third redundant tree index over the same tree

`PaperSidebar.vue:38-45` calls `useSidebarState<PaperSectionData>({…, getChildren: (n) => n.subsections })`. The installed implementation (`glass-ui/dist/sidebar.js`, `function h(t)`) begins `let { index: n, isActive: r, isInActiveChain: a } = u(t.sections, { getChildren: t.getChildren })` — i.e. it walks the whole tree and builds a `Map` at setup.

The template consumes **`isExpanded` (`:67`) and `toggleSection` (`:68`, `:74`) only**. Dead members returned and retained: `sections`, `activeId`, `activeRootId`, `treeIndex`, `navigateTo`, `scrollToTop`, `isActive`, `isInActiveChain`. Notably the template calls the **props** `isActive`/`isInActiveChain` (`:94`, `:95`, `:104`, `:111`) rather than the composable's identically-named members — so both exist side by side over two different representations of one tree.

The tree is therefore indexed **three times**:
1. `PaperView.vue:47-48` — `paperSections.map(paperSectionToTreeNode)` (a full structural copy, `paperTree.ts:4-9`) then `useTreeIndex(treeNodes)` from `@mkbabb/latex-paper/vue`.
2. Passed into PaperSidebar as `treeIndex` — **never read** (L-2).
3. Rebuilt inside `useSidebarState` from the *raw* `PaperSectionData` via `getChildren`.

Compounding this: `latex-paper/src/vue/tracking/useTreeIndex.ts` and `glass-ui/src/composables/sidebar/useTreeIndex.ts` are **byte-equivalent implementations modulo formatting** (compare `latex-paper` `:6-66` with the compiled `glass-ui/dist/sidebar.js` `function u(e,t)` — same `LEVEL`-less walk, same `roots.indexOf(node)` at depth 0, same `isActive`/`isInActiveChain`/`isDescendant` triple). Two packages ship the same algorithm; this one component pulls both into one render tree.

**Falsifier** — dies if the composable's `treeIndex`/`isActive`/`isInActiveChain` are read in the SFC (they are not: the only `sidebarState.` accesses are `:67`, `:68`, `:74`), or if `useSidebarState` did not build an index (`dist/sidebar.js` shows it does), or if the two `useTreeIndex` bodies diverge (they do not).

---

### L-4 · MAJOR · A disclosure primitive used with no trigger: dead `@update:open` wiring and forfeited a11y

`PaperSidebar.vue:66-69` mounts `<Collapsible :open="…" @update:open="sidebarState.toggleSection(section.id)">` with **no `CollapsibleTrigger`** anywhere in the subtree (`grep -n "CollapsibleTrigger" PaperSidebar.vue` → none; the import at `:7` pulls only `Collapsible, CollapsibleContent`).

`@update:open` at `:68` is **unreachable**. Tracing the installed chain: glass-ui `Collapsible` forwards to reka `CollapsibleRoot` (`dist/CollapsibleContent-C_s6fG7r.js`, `var p`). `CollapsibleRoot.vue:54-57` uses `useVModel(props,'open',emit,{ passive: (props.open === undefined) as false })`; `:open` at `:67` is always a boolean (`isExpanded` returns `boolean`), so `passive === false` — fully controlled, no self-write. The only other emitter is `onOpenToggle` (`CollapsibleRoot.vue:66-71`), called from (a) `CollapsibleTrigger` — absent — and (b) the `beforematch` listener at `CollapsibleContent.vue:88-93`, which requires `hidden="until-found"`; but `CollapsibleContent.vue:109` emits `until-found` **only when `unmountOnHide` is false**, and it is `true` here (see §5 R-B). Both paths are closed.

The visible toggle is therefore the inline handler at `:74`, on a plain `Button` that carries **no `aria-expanded`, no `aria-controls`**. reka assigns the content region an id (`CollapsibleContent.vue:35`, `:id="rootContext.contentId"`) that nothing references. Adopting a disclosure primitive and then bypassing its trigger buys the animation (`--reka-collapsible-content-height`, documented at `:83-84` and `:255-258`) at the cost of the entire accessibility contract the primitive exists to supply.

**Falsifier** — dies if a `CollapsibleTrigger` exists, if `:open` can ever be `undefined` (it cannot — `isExpanded` is `(id: string) => boolean`), or if `unmountOnHide` resolves false (refuted in §5 R-B).

---

### L-5 · MAJOR · Navigate-and-toggle conflated on one control, contradicting the sibling consumer of the same composable

`PaperSidebar.vue:74` — `@click="scrollTo(section.id); sidebarState.toggleSection(section.id)"`.
`MobileFloatingToc.vue:155` — `@click="sidebarState.toggleSection(section.id)"` (toggle only; navigation is a *separate* control at `:171`, `selectSection(sub.id)`).

Two consumers of one composable disagree on what a root row *is*. The desktop path's failure mode is concrete. `isExpanded` (`glass-ui/dist/sidebar.js`, `function l(e)`) reads `userCollapsed → userExpanded → activeRootId === id`. `scrollTo` is `navigateTo` (`PaperView.vue:340` → `useScrollNavigation.ts:202`), which does **not** update `activeRootId` synchronously — it schedules through `performScroll` (`:169-200`, rAF/`nextTick`), and `activeRootId` is a computed over the virtual window's `activeItem` (`latex-paper/src/vue/composables/useVirtualSectionWindow.ts:248`). So `toggleSection` at `:74` always observes the pre-navigation state:

1. Click chapter A while elsewhere → `isExpanded(A)` false → `userExpanded.add(A)`. Navigates and expands. Correct.
2. Scroll away to chapter B. `A` stays in `userExpanded` (never cleared).
3. Click chapter A again to return → `isExpanded(A)` now **true** → `userExpanded.delete(A); userCollapsed.add(A)`. **The click navigates to A and simultaneously collapses it.** A is now pinned collapsed until clicked again, and the default-expansion rule (`activeRootId === id`) can never re-open it.

Because `useSidebarFollow` (`PaperView.vue:233-238`) locates the active row by `[data-toc-id]` (see the installed `dist/sidebar.js` `closest("[data-toc-id], .sidebar-top-btn")`), and sub-rows only exist inside an *open* `CollapsibleContent`, the auto-follow silently loses its target for every chapter the user has re-visited.

**Falsifier** — dies if `navigateTo` mutates `activeRootId` synchronously before the second statement (`useScrollNavigation.ts:202-212` shows it does not — every write path is rAF/`nextTick`-deferred), or if `userExpanded` is cleared on navigation (`dist/sidebar.js` `function d(e)` shows only the two-set swap). Visual confirmation of the collapse is **UNPROVEN-NEEDS-LIVE (SS-13)**; the state machine is fully static.

---

### L-6 · MINOR · Dead class `is-active-sub`, and the wasted recursive walk that computes it

`PaperSidebar.vue:94` — `:class="{ 'is-active-sub': isActive(sub.id, activeId) || isInActiveChain(sub.id, activeId) }"`.

`grep -rn "is-active-sub" web/src/` → **one hit: PaperSidebar.vue:94**. There is no `.is-active-sub` rule in this file's scoped block (which does define `.sidebar-link.is-active` at `:240` and `.sidebar-link.is-active .sidebar-number` at `:251`) nor anywhere in `web/src/style.css`. The class is written and never read.

The waste is not just the class. `isInActiveChain` (the prop, from `latex-paper/src/vue/tracking/useTreeIndex.ts:42-51`) falls through to `isDescendant` (`:53-63`), a **recursive subtree walk, not an index lookup** — it re-walks `sub`'s entire subtree on every call. `:94` invokes it once per sub-row purely to set a class that styles nothing; `:104` invokes it again for the same `sub.id` on the same render to gate the sub-sub `<ol>`. Two walks where the gate needs one, and one of the two is unconditionally discarded.

**Falsifier** — a `.is-active-sub` declaration anywhere in the cascade (glass-ui's `dist/styles/` included) kills the dead-class half; an index-based `isInActiveChain` kills the cost half. Neither exists.

---

### L-7 · MINOR · Two competing active-state mechanisms, the weaker one unreachable

Root rows express "active" through a **CSS class**: `:76` `:class="{ 'is-active': … }"` → `:240-243` `.sidebar-link.is-active { background: none; font-weight: 600 }`.
Sub and sub-sub rows express the same thing through **inline styles**: `:95-97` and `:111-113` write `{ color, fontWeight: '600', background: 'color-mix(in srgb, var(--muted) 40%, transparent)' }`.

Inline styles win every specificity contest, so no scoped rule can ever adjust sub-row active state — including `.sidebar-link:hover` (`:235-238`), whose `background` is dead on an active sub-row. One component, two mechanisms, and the class-based one is structurally the loser wherever both apply. A fresh object literal is also allocated per row per render at `:77`, `:95`, `:111` (and `{}` on the false branch, which Vue must still diff).

**Falsifier** — dies if the inline branches only set properties no rule targets (they set `background`, which `.sidebar-link:hover:238` also sets) or if the class mechanism does not exist for the same concept (`:240` shows it does).

---

### L-8 · MINOR · `getPreview` is unmemoized and regexes the whole section body before slicing to 100 chars

`PaperSidebar.vue:70` and `:88` call `getPreview(section)` / `getPreview(sub)` **inside the render function**, once per rendered row. The implementation is `getPaperPreview` (`paperTree.ts:11-21`):

```
const text  = section.content?.find((block): block is string => typeof block === "string") ?? "";
const clean = text.replace(/\$[^$]+\$/g, "…").replace(/<[^>]+>/g, "");
const preview = clean.length > 100 ? `${clean.slice(0, 100)}…` : clean;
```

Two global regexes sweep the **entire** first content block — a full LaTeX-derived paragraph — and allocate two full intermediate strings, only for the result to be truncated to 100 characters on the next line. Slicing first (with a margin for the substitutions) makes the work O(1) in section length. Nothing caches: the function is pure over a build-time-frozen object (`virtual:paper-content`, `web/src/virtual-paper.d.ts`), so a `WeakMap` memo is exact.

Re-render frequency, measured honestly: the render function reads `props.activeId` (`:94`, `:95`, `:104`, `:111`) and `props.activeRootId` (`:67` via `isExpanded`, `:76`, `:77`), and both are **`computed`s over a string** (`useVirtualSectionWindow.ts:247-248`). Vue's computed `hasChanged` gate means the sidebar re-renders on **section-boundary crossings**, not per scroll frame. So this is a MINOR, not a MAJOR — but it is unbudgeted: it is outside the I.γ off-screen gate (`stores/animation.ts:48-53`, canvas-scoped) and outside the `yieldToMain()` floor (`lib/scheduler.ts:14-19`, explicitly gallery-scoped), the two disciplines `lane-frontend.md:512-570` banks for this app.

`renderTitle` (`:80`, `:100`, `:116`) is the honest counter-example and is *not* charged here: `latex-paper/src/vue/composables/useKatex.ts:8` holds a module-level KaTeX cache, so only the outer `.replace` scan (`context.ts:20-24`) repeats.

**Falsifier** — dies if `getPaperPreview` memoizes (it does not, `paperTree.ts:11`), if the regexes ran on the sliced prefix (they run on `text`, `:13`), or if the sidebar's render never re-runs on `activeId` change (it does — `:94` reads it).

---

### L-9 · MINOR · `--section-color-${si}` has zero headroom and no `var()` fallback

`:77`, `:96`, `:112` interpolate the **raw root-array index** `si` into a token name with no modulo and no fallback: `` `var(--section-color-${si})` ``.

The token set is finite and exactly 13: `--section-color-0` … `--section-color-12` (`glass-ui/dist/styles/tokens/light-dark.css:126-138`). The root count derives from `latex-paper/src/transform/sections.ts:186-192`, where level-0 (`\chapter`, `LEVEL_MAP` at `:37`) and any level-1 preceding the first chapter go to `topLevel`, plus one synthetic bibliography root (`:109-115`). Live source `paper/fourier_paper.tex`: **11 `\chapter`** + **1 pre-chapter `\section{Introduction}`** (line 93, before `\chapter` at line 118) + bibliography (`\bibliography` line 3119) → **12 or 13 roots**. Exact count is **UNPROVEN-NEEDS-BUILD** (`compiledMetadata.bibliography.length` gates the 13th, `sections.ts:110`).

So the range is exactly saturated with **zero slack**. Adding a 14th `\chapter` — a *content* edit to a `.tex` file, by an author who will never read this template — silently yields `color: var(--section-color-13)`, an unresolvable custom property. The declaration becomes invalid-at-computed-value-time and `color` resolves to `unset` → inherits, so the active chapter simply stops being coloured, with no error anywhere. A fallback (`var(--section-color-13, var(--foreground))`) or a modulo (`si % 13`) costs one expression.

**Falsifier** — dies if a 14th token exists (`grep -c -- "--section-color-[0-9]*:" light-dark.css` → 13), if the template supplies a fallback (`:77` shows none), or if `si` is bounded below 13 by construction (it is `v-for` over the raw prop array, `:65`).

---

### L-10 · MINOR · The whole aside mounts at every viewport — the denominator R5-7 was blind to

`PaperView.vue:335` renders `<PaperSidebar>` with **no `v-if`**. Visibility is CSS-only: `:132-136` `.paper-sidebar { display: none }` and `:138-149` `@media (min-width: 1024px) { display: block }`. Every phone therefore constructs and retains the entire ToC component tree it can never see, and pays its setup cost (including the `useSidebarState` tree walk, L-3).

**The denominator.** R5-7 (intake `:125`) established that callsite-keyed loop derivation reported `instance.loop.paper-sidebar` as `[]`. Here is what that `[]` concealed, per root `<li>` — every layer opened and read:

| # | Instance | Source read |
|---|---|---|
| 1 | local `Tooltip` shim | `web/src/components/ui/tooltip/Tooltip.vue:26-38` |
| 2 | glass-ui `Tooltip` | `dist/TooltipProvider-B3MkB_8P.js` `var v` |
| 3 | reka `TooltipRoot` | imported as `h`, ibid. |
| 4 | glass-ui `TooltipTrigger` | ibid. `t` |
| 5 | reka `TooltipTrigger` | imported as `g`, ibid. |
| 6 | glass-ui `Button` | `dist/components/ui/button/Button.vue.d.ts` |
| 7 | reka `Primitive` (button root) | ibid. |
| 8 | glass-ui `TooltipContent` | `dist/TooltipProvider-B3MkB_8P.js` `var y` |
| 9 | reka `TooltipPortal` | rendered unconditionally, ibid. (`n(u(p), null, …)`) |
| 10 | reka `TooltipContent` | ibid. (`r(u(f), …)`) |
| 11 | glass-ui `Collapsible` | `dist/CollapsibleContent-C_s6fG7r.js` `var p` |
| 12 | reka `CollapsibleRoot` | `reka-ui/src/Collapsible/CollapsibleRoot.vue` |
| 13 | reka `Primitive` (collapsible root) | ibid. `:79` |
| 14 | glass-ui `CollapsibleContent` | `dist/CollapsibleContent-C_s6fG7r.js` `var h` |
| 15 | reka `CollapsibleContent` | `reka-ui/src/Collapsible/CollapsibleContent.vue` |
| 16 | reka `Presence` | ibid. `:97` (`:force-mount="true"` → always instantiated) |
| 17 | reka `Primitive` (content root) | ibid. `:103` |

**≥17 verified component instances per root row**, unconditional, ×12–13 rows ⇒ **≥204–221 instances always mounted**, at every viewport. reka's internal Popper layers inside `TooltipRoot`/`TooltipTrigger` were not opened and are **not** counted — the figure is a floor, not an estimate. Sub-rows add on top and *are* correctly bounded (see §5 R-B: reka's `unmountOnHide` default keeps closed sections' `<li>`s unmounted), which is why this is MINOR rather than MAJOR — the root loop is the whole unconditional cost.

For **F.W4**'s per-component D/L/C audit this is the number to carry: the native-`<li>` blindness hid ~17× amplification per row, because each row's real cost lives in the *component* stack the loop instantiates, not in the loop element itself.

**Falsifier** — dies if PaperSidebar is `v-if`-gated (`PaperView.vue:335` shows it is not), if `.paper-sidebar` is not `display:none` below 1024px (`:135`), or if any of the 17 layers is conditional at mount (each cited line shows unconditional instantiation; #9/#10/#16 gate their *children*, not themselves).

---

### L-11 · INFO · Asymmetric composable contract: reactive `activeId`, snapshot `sections`

`useSidebarState`'s options accept `activeId`/`activeRootId` as `MaybeRefOrGetter<string | null>` (`glass-ui/dist/composables/sidebar/useSidebarState.d.ts`) — and `PaperSidebar.vue:40-41` correctly supplies getters. But `sections: T[]` is a **plain array**, captured once at setup (`:39`, `sections: props.sections`) and walked immediately into a `Map`. Meanwhile the template iterates the *reactive* prop (`:65`, `v-for="… in sections"`).

Benign today — `PaperView.vue:120` is `computed(() => paperSections)` over a build-frozen constant. But the two halves of the same component now read the tree through two channels with different reactivity, and the failure is silent: a `sections` change would render rows whose ids are absent from `sidebarState`'s index, so `isExpanded` would fall through to the `activeRootId === id` default forever and `toggleSection` would write into sets nothing consults.

**Falsifier** — dies if `sections` is declared `MaybeRefOrGetter` upstream (the `.d.ts` says `sections: T[]`) or if the composable re-walks on change (`dist/sidebar.js` `function h(t)` walks once, unwatched).

---

### L-12 · INFO · Duplicated `max-height` calc across parent and child

`:145-147` (`.paper-sidebar`) and `:152-154` (`.sidebar-nav`) carry the byte-identical `calc(var(--paper-scroll-viewport-height, 100dvh) - var(--sidebar-top-inset) - var(--sidebar-bottom-inset))`. The nav is the aside's only child. The nav additionally carries `padding-bottom: var(--sidebar-bottom-inset)` (`:161`) **inside** that height plus `scroll-padding-bottom: var(--sidebar-bottom-inset)` (`:159`), so the bottom inset is applied up to three times along one axis. Two edits required for one change; the compounding's visual magnitude is **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Falsifier** — dies if the aside has siblings inside it or its own padding (`:132-136`, `:138-149` show neither).

---

### L-13 · INFO · Goldilocks: the file is 55% stylesheet and the template carries the logic

283 lines: script `1-46` (46), template `48-128` (81), style `130-283` (154). The template reaches **six** nesting levels (`aside → nav → ol → li → Collapsible → Tooltip → Button`) and holds multi-line ternary style objects at `:95-97` and `:111-113` — presentation logic that is neither CSS (which cannot see it, L-7) nor script (which cannot be tested). The three loop bodies at `:65`, `:87`, `:105` are near-identical modulo the tooltip and the class binding; a single recursive row component would collapse them and make the sub/sub-sub asymmetries (L-15) impossible to introduce.

**Falsifier** — dies if the three bodies differ structurally (they differ only in: Tooltip present/absent, `is-active` vs `is-active-sub` vs none, and the `isActive` argument).

---

### L-14 · INFO · A reactive singleton prop-drilled four levels, in a tree that already uses `provide`

`search: PaperSearchState` (`:24`) — a bag of ten refs/computeds (`usePaperSearch.ts:92-104`) — travels `PaperView.vue:111` → `PaperSidebar:24` → `PaperSearch.vue:8` → `PaperSearchInput/Dropdown/Modal:8-10`, and separately to `MobileFloatingToc.vue:18`. PaperSidebar itself never touches it (`:51` forwards it verbatim); it is pure pass-through in a component that declares it as part of its contract. `PaperView.vue:63` already establishes the idiom in this exact tree — `provide(PAPER_CONTEXT, paperContext)`. Making `search` an injection removes the prop from PaperSidebar's contract entirely and removes L-1's structural precondition.

**Falsifier** — dies if PaperSidebar reads any member of `search` (it does not — `:51` is the only occurrence after the declaration).

---

### L-15 · INFO · Sub-subsection rows are second-class

Sub-sub rows (`:105-118`) have **no `Tooltip`** (sub rows do, `:88`) and **no `:class`** (sub rows have one, `:94`), only the inline `:style` at `:111-113`. So the deepest rows show no preview on hover and cannot be targeted by any rule — three rows of the same list styled by three different mechanisms. This is the visible cost of L-13's copy-paste template.

**Falsifier** — dies if a `Tooltip` or `:class` binding exists at `:106-114` (it does not).

---

### L-16 · INFO · Dead declarations in the immediate import closure

Reached only through `PaperSidebar.vue:51`, and therefore part of what this component drags in:
- `PaperSearch.vue:9` — `const props = defineProps<…>()`; `props` is never referenced (the template reads `search`/`variant` directly).
- `PaperSearchDropdown.vue:12-14` and `PaperSearchModal.vue:12-14` — both declare `defineEmits<{ select: [id: string] }>()` and assign it to `emit`; **neither ever emits**, and no parent listens (`PaperSearch.vue:22-34` binds no `@select`). Selection is instead performed by direct mutation of the shared state (`search.selectResult(r)`, `PaperSearchDropdown.vue:47`, `PaperSearchModal.vue:89`).

**Falsifier** — `grep -n "emit(" PaperSearchDropdown.vue PaperSearchModal.vue` → no call sites; `grep -n "props\." PaperSearch.vue` → none.

---

## §4 · Corpus correction

`lane-frontend.md:604` and `CENSUS-2026-08-03.md:91` describe `web/src/style.css:119-131` as "the light-mode `--viz-amber` WCAG darken". The live block rewrites **two** tokens, in both arms:

```
web/src/style.css:119  :root { --viz-amber: hsl(35 76% 35%); --section-color-5: hsl(35 76% 35%); }
web/src/style.css:124  .dark { --viz-amber: hsl(37 73% 67%); --section-color-5: hsl(37 73% 67%); }
```

The second line matters here because `--section-color-5` is what `PaperSidebar.vue:77` reads for the sixth root section, and glass-ui ships it as an `oklch()` `light-dark()` pair (`light-dark.css:131`) that the override replaces with a flat `hsl()` in each arm. **The held glass-BH carry is therefore two tokens wide, not one** — the relay text should say so, or the `--section-color-5` half will be dropped when the upstream `--viz-amber` rebaseline lands and the sidebar will silently diverge from the other twelve section colours (which stay `oklch`/`light-dark`). Everything else in the corpus checked out; no corpus row is contradicted.

---

## §5 · Refuted candidates (recorded so they are not re-raised)

| # | Candidate | Verdict | Evidence |
|---|---|---|---|
| **R-A** | `variant="ghost"` / `size="icon"` (`:55-56`, `:72`, `:90`, `:107`) are not on glass-ui's `Button`, which takes `emphasis`/`tone`/`iconOnly` — so ghost styling silently never applies. | **REFUTED** | That API is the *unreleased* sibling repo (`/Users/mkbabb/Programming/glass-ui/src/components/button/Button.vue:18-31`). The **installed** `@mkbabb/glass-ui@4.0.0` Button is the cva API: `variant?: ButtonVariants['variant']; size?: ButtonVariants['size']` (`dist/components/ui/button/Button.vue.d.ts`). Both props are valid. |
| **R-B** | glass-ui's `Collapsible` re-declares `unmountOnHide: { type: Boolean }` with no default; Vue boolean-casting makes it `false`, defeating reka's `unmountOnHide: true` — so every collapsed chapter's sub-rows stay mounted. | **REFUTED** | `useForwardProps` (`reka-ui/src/shared/useForwardProps.ts:31-52`) forwards only keys that are (a) declared **with** a `default` or (b) present on `vm.vnode.props`. `unmountOnHide` has neither (`dist/CollapsibleContent-C_s6fG7r.js` `var p`; PaperSidebar never passes it), so it is not forwarded and reka's `withDefaults(… unmountOnHide: true)` (`CollapsibleRoot.vue:39-43`) stands. Closed sub-rows **do** unmount (`CollapsibleContent.vue:117`). |
| **R-C** | `<CollapsibleContent v-if="section.subsections">` (`:85`) is an array-truthiness test; `[]` is truthy, so childless sections render an empty `<ol>`. | **REFUTED** | `latex-paper/src/transform/sections.ts:325-332` `cleanEmpty` **deletes** `subsections` when length is 0. The property is either absent or non-empty. |
| **R-D** | reka assigns the content region `aria-labelledby` pointing at a trigger id that does not exist → dangling IDREF on every row. | **REFUTED** for the installed build | The `aria-labelledby`/`provideDisclosureIds` wiring exists only in the unreleased repo (`glass-ui/src/components/collapsible/CollapsibleContent.vue:48`). The installed wrapper is a thin cva pass-through with no ARIA (`dist/CollapsibleContent-C_s6fG7r.js` `var h`). The *absence* of that wiring is charged instead, at L-4. |

---

## §6 · Superlatives (L-18, same burden of proof)

**S-1 · Nothing to leak.** `grep -nE "onMounted|onUnmounted|addEventListener|setTimeout|setInterval|new (Resize|Intersection|Mutation)Observer|requestAnimationFrame|watch\(" PaperSidebar.vue` → **no matches**. Zero lifecycle hooks, zero listeners, zero timers, zero observers. The single reference that escapes (`sidebarNav`, `:27-28`) is consumed by `useSidebarFollow` (`PaperView.vue:233-238`), whose installed implementation registers five listeners on that element and removes **all five** plus two rAF handles and the window `resize` in its `onUnmounted` (`glass-ui/dist/sidebar.js`, the `r(() => { … removeEventListener … })` block). In a file that renders a stateful, scroll-tracked, virtualised ToC, the teardown surface is empty by construction — this is the correct shape. *Falsifier:* any of the grepped constructs appearing in the SFC, or a listener registered on `sidebarNav` without a matching removal; neither holds.

**S-2 · The de-duplication is real, and the extension point was earned.** `:30-37` claims the `userExpanded`/`userCollapsed` model was hoisted out of both `PaperSidebar` and `MobileFloatingToc` into `useSidebarState`. Verified: `MobileFloatingToc.vue:67-74` calls the **same** composable with the **same** `getChildren: (n) => n.subsections`, and neither file contains a local `Set`. The two-set model itself is correct in a way a single boolean map is not — it distinguishes *never touched* (fall through to `activeRootId === id`) from *explicitly opened* from *explicitly closed* (`dist/sidebar.js` `function l(e)`), which is exactly what a ToC with scroll-driven default expansion needs. And the `getChildren` override is a genuine upstream extension, not a local hack: `useTreeIndex`, `useScrollTracker` and `useSidebarState` all accept it (`useSidebarState.d.ts`), so `PaperSectionData`'s `subsections` key never had to be coerced. *Falsifier:* a residual local expand/collapse `Set` in either consumer, or a `getChildren` that only `useSidebarState` honours; neither holds.

**S-3 · Scroll containment done properly.** `:155-160` — `overflow-y: auto` + `overscroll-behavior-y: contain` + `overscroll-behavior-x: contain` + `scrollbar-gutter: stable` + `scroll-padding-bottom` + `touch-action: pan-y`. Six declarations that together mean: the sidebar cannot chain-scroll the article when it bottoms out, cannot rubber-band horizontally, does not reflow when the scrollbar appears, does not park the last row under its own padding, and does not fight the browser over horizontal pan on touch. Each is the correct property for its failure mode, and `overscroll-behavior` is specified on **both** axes — the axis most authors forget. *Falsifier:* a missing containment axis or a `transition: all`; neither present.

**S-4 · The height binding tracks the real scroller, with a real fallback.** `:146` and `:153` bind to `var(--paper-scroll-viewport-height, 100dvh)`, a variable written by `PaperView.vue:122-126` from `scroller.clientHeight` (`:199-202`) and kept fresh by a `ResizeObserver` on the scroll container (`:224-229`) plus a window `resize` handler (`:272`). The sidebar therefore sizes to the element it actually sits beside, not to the viewport — correct under mobile URL-bar collapse and any future chrome — and the `100dvh` fallback covers the pre-measurement frame where `paperRootStyle` returns `{}` (`:125`). *Falsifier:* an unconditional `100dvh`, or a variable with no writer; neither holds.

**S-5 · Motion hygiene, and it is annotated with its provenance.** `:197-198` and `:230-233` enumerate the exact properties they animate (`color`, `border-color`, `background-color`, `font-weight`) against tokenised easings (`--ease-standard`, `--ease-out-expo`) — no `transition: all` **declaration** anywhere in the file (`grep -nE "^\s*transition:\s*all" PaperSidebar.vue` → no matches; the sole textual hit at `:197` is the annotation *saying so*, which `grep -c "transition: all"` would miscount as 1 — the falsifier must be anchored to the declaration form), and each carries its `A.W3.d` wave citation inline. `:255-258` does the same for the retired hand-rolled `grid-template-rows: 0fr → 1fr` shim, naming the reka variable that replaced it. This is the discipline `lane-frontend.md:626` books as "motion / a11y hygiene already banked", and it holds under inspection. *Falsifier:* one `transition: all` declaration or one raw `cubic-bezier()` literal (`grep -c "cubic-bezier" PaperSidebar.vue` → 0); neither present.

---

## §7 · Disposition

- **F.W3** — L-1 and L-14 land together with the `ui/tooltip` thin-adapter disposition already carried there by intake **R3-7a** (35 callsites / 9 consumers). Hoisting `PaperSearchModal` to `PaperView` and converting `search` to an injection is the single edit that discharges both.
- **F.W4** — L-10's **≥17 instances × 12–13 unconditional rows** is the concrete denominator for the per-component D/L/C audit, and the direct continuation of intake **R5-7 / R6-5**. L-2, L-3, L-6, L-16 are the dead-surface sweep for the same wave.
- **Glass-BH inbox** (standing relay law) — §4's two-token correction to the `--viz-amber` carry, plus L-4: `Collapsible` currently ships no way to drive a *controlled* disclosure from a foreign trigger without forfeiting `aria-expanded`/`aria-controls`. That is a producer-side gap, not a consumer defect, and it is what pushed this component into the bypass.
- **Local, cheap, no coordination** — L-6 (delete the class and the walk), L-7 (move the inline branches to `.is-active-sub` / `.is-active-subsub` rules), L-8 (slice-then-clean + `WeakMap`), L-9 (`si % 13` or a `var()` fallback), L-12 (drop one `max-height`).
- **Owner ruling wanted** — L-5. Whether a root row navigates, toggles, or both is a product decision; the defect is that the two consumers of one composable currently answer differently and the desktop answer is order-dependent.

claude-opus-5[1m]

# CHALLENGE — `PaperView.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/PaperView.vue` (685 lines: script 1–298, template 300–412, style 414–685)
**Axis** L — correctness · leaks/teardown · wrong types · duplication · colocation · module size (Goldilocks) · composable contracts · error postures · dead code · the viz/render path this component touches · the **R5-7 template-loop invisibility class**
**Posture** DEFECTIVE-until-proven. Every claim carries severity + `file:line` + its own falsifier. Superlatives carry the same burden (L-18 runs both ways).
**Method** static + source-derived only. No browser tooling. Runtime-only claims are tagged `UNPROVEN-NEEDS-LIVE` for SS-13.
**Read whole** `PaperView.vue` and every file it imports, transitively where the contract mattered:

| Import | Resolved |
|---|---|
| `@mkbabb/latex-paper/vue` | `web/node_modules/@mkbabb/latex-paper` **0.2.1**; contracts read from `dist/vue/**/*.d.ts`, implementations from the version-matched source repo `/Users/mkbabb/Programming/latex-paper/src/vue/**` (`package.json` version `0.2.1` on both sides; dist re-checked at `dist/vue.js:389,397,410,429,1087…` for the two claims where dist-vs-src drift would change a verdict) |
| `@mkbabb/latex-paper/theme` | `src/vue/theme.css` (CSS only) |
| `./PaperSidebar.vue` · `./MobileFloatingToc.vue` · `./PaperArticleWindow.vue` · `./paperTree` · `./useScrollNavigation` · `./search/usePaperSearch` | live tree |
| `@/lib/paperContent` → `virtual:paper-content` | `web/src/virtual-paper.d.ts` (ambient) + producer `latex-paper/src/vite.ts:23-83` |
| `@mkbabb/glass-ui/button` | glass-ui **4.0.0**; the `.scroll-progress` recipe at `dist/styles/scroll-driven.css:36-48`, imported via `dist/styles/index.css:163` ← `src/style.css:3` |
| `lucide-vue-next` | icon only |
| Vue runtime semantics | `web/node_modules/@vue/runtime-core/dist/runtime-core.cjs.js` (vue **3.5.38**) — cited by line for the three ordering claims that depend on it |

**Hitherto corpus folded, not re-invented**
`formation/fourier/CENSUS-2026-08-03.md` (viz architecture §:85-87; `PaperView.vue` **685** LOC row) · `formation/fourier/lane-frontend.md:152-165, 287, 617` · `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R5-7** (ADOPT-AS-FACT + CARRY→F.W4), **R6-5/R6-6** (the `NATIVE_TEMPLATE_LOOP` cure), **X-9** (member-scope denominator OPEN). Overlaps are cited by row id below; one census row is **contradicted by the tree** (§6).

---

## §0 · Verdict

| | |
|---|---|
| **Defects** | **24** (1 BLOCKER · 7 MAJOR · 12 MINOR · 4 INFO) |
| **Blockers** | **1** — D1, the session scroll-restore is dead 100% of the time |
| **Superlatives** | **7** |
| **Goldilocks** | **TOO BIG** — 685 lines, ~11 concerns in one setup block; two extractable units named in D23 |
| **Net** | The component is *well-reasoned* and *badly sequenced*. Its design comments are unusually honest and mostly correct (see §5). Its failures are almost all **ordering and ownership** failures: a watcher that runs before the reader it feeds, a teardown that reads a ref Vue already nulled, one un-reentrant navigator behind six entry points, one shared search state behind two independently-mounted UIs. None of the 24 are "the author didn't know" — all 24 are "the author didn't check the order". |

---

## §1 · BLOCKER

### **D1 · BLOCKER · The session scroll-restore is dead code — the persistence watcher destroys the key during setup, before `onMounted` reads it.**

**Provenance**

- `PaperView.vue:65` — `const SCROLL_POS_KEY = "paper-active-section";`
- `PaperView.vue:67-85` — `useVirtualSectionWindow({ items: flatSections, … })` is constructed at **setup line 77**.
- `PaperView.vue:129-142` — the persistence watcher, **`{ immediate: true }`**:
  ```ts
  watch(activeId, (id) => {
      if (!id) return;
      …
      try {
          if (id === flatSections[0]?.id) sessionStorage.removeItem(SCROLL_POS_KEY);
          else sessionStorage.setItem(SCROLL_POS_KEY, id);
      } catch {}
  }, { immediate: true });
  ```
- `PaperView.vue:247, 256-271` — the reader, inside `onMounted` → `nextTick`:
  ```ts
  const saved = sessionStorage.getItem(SCROLL_POS_KEY);
  if (saved && saved !== flatSections[0]?.id && flatSections.some(s => s.id === saved)) performScroll(saved);
  ```

**The chain, each link independently verified**

1. `useVirtualSectionWindow`'s own `watch(items, …, { immediate: true })` — `latex-paper/src/vue/composables/useVirtualSectionWindow.ts:205-220` — calls `recalculate()` **synchronously at construction**, i.e. at `PaperView.vue:77`.
2. `recalculate()` → `computeWindowState()` → `activeItem.value = resolveActiveSection(layout.value, normalizedScrollTop + viewportHeight * 0.2)` (`useVirtualSectionWindow.ts:100-103`). With `scrollContainer.value` still `null`, `getViewportHeight()` falls back to `window.innerHeight` (`:59-64`) and `normalizedScrollTop` is `0`, so the probe offset is `≈ 0.2 × innerHeight`.
3. `resolveActiveSection` (`virtualSectionLayout.ts:126-142`) **cannot return null on a non-empty layout**: the binary search converges to `low ∈ [0, len-1]` and `entries[0].top === 0 ≤ activeOffsetPx` always holds. Layout is non-empty — `paper/fourier_paper.tex` carries **51 `\section` + 35 `\subsection` = 86 flat sections** (`grep -c '^\\section' → 51`, `'^\\subsection' → 35`).
4. Therefore `activeId.value` is **non-null before `PaperView.vue:129` executes**, so the `if (!id) return` guard does not fire.
5. `{ immediate: true }` with the default (`pre`) flush runs the callback **synchronously at watcher creation** — `runtime-core.cjs.js:868` `const runsImmediately = cb && immediate || …`, and `:889-896` `scheduler = (job, isFirstRun) => { if (isFirstRun) { job(); } else { queueJob(job); } }`. Not queued. Executed inline at setup line 129.
6. Both branches destroy the persisted value:
   - `id === flatSections[0].id` → `removeItem` → reader gets `null`.
   - otherwise → `setItem(key, id)` → reader gets the **freshly-computed initial section**, which passes the `saved !== flatSections[0]?.id` and `flatSections.some(...)` tests and drives `performScroll` to *that* section rather than the user's saved one.
7. `onMounted` (line 247) and its `nextTick` (256) both run strictly after the setup body. The reader at line 266 can never see the pre-navigation value.

**Failure scenario (concrete)** — Reader is at §7 "Gibbs Phenomenon". `activeId` watcher has stored `sec-7-gibbs`. Reader clicks a callout → `/v/:slug` → browser Back → `/paper` remounts. Setup line 77 computes `activeId = <first section>`; setup line 129 fires and calls `removeItem("paper-active-section")`. Mounted `nextTick` line 266 reads `null`. The reader lands at the top of the paper. Every time. The `catch {}` at line 270 guarantees no diagnostic even if `performScroll` had been reached and thrown.

**Falsifier (and why it fails)** — this claim dies if any one of: (a) `activeId` were `null` at setup — killed by link 3 + the 86-section count; (b) `{ immediate: true }` were deferred to the pre-flush queue — killed by `runtime-core.cjs.js:889-896`; (c) `onMounted`'s `nextTick` ran before the setup body — impossible; (d) an e2e test asserted the restore works — `grep -rn "paper-active-section|sessionStorage" web/e2e/` returns **no hit in any paper spec** (`paper-performance.spec.ts` included), so the feature is entirely unguarded.

**Not a perf claim, not a heuristic** — the restore *mechanism* is sound: `updateSectionStartOffset()` runs at line 259 before the read, so `estimateAbsoluteTop` (`useScrollNavigation.ts:54-61`) has a valid `contentStartOffsetPx`. The **only** thing killing the feature is watcher ordering. Minimal repair: drop `{ immediate: true }` (line 141), or hoist `const savedOnEntry = sessionStorage.getItem(SCROLL_POS_KEY)` above line 129 and read *that* at 266.

---

## §2 · MAJOR

### **D2 · MAJOR · `useScrollNavigation` has zero teardown; PaperView has no handle on its resources.**

`useScrollNavigation.ts:1` imports exactly `{ reactive, nextTick }` — **no `onUnmounted`, no `onScopeDispose`, no `getCurrentScope`** anywhere in the 246-line file. It owns:

- a self-perpetuating `requestAnimationFrame` correction chain, up to `MAX_CORRECTIONS = 10` plus a 20-frame retry arm (`:133-163`, recursive `requestAnimationFrame(correct)` at `:138` and `:159`);
- `setTimeout(hide, remaining)` up to `MIN_OVERLAY_MS = 200` ms (`:94-99`);
- `setTimeout(() => { isBackNavigation = false }, 500)` (`:219-221`);
- an inner `requestAnimationFrame` in `withProgrammaticScroll`-style overlay hide (`:89-92`).

**Failure scenario** — user clicks a far TOC entry, then immediately navigates away from `/paper` (the header nav is always live). `teleportTo`'s `correct()` chain keeps running for up to 10 more frames against a detached scroller, each iteration calling `opts.recalculate()` — the library's `recalculate` still executes (its reactive scope is stopped, but `layout.value = buildSectionLayout(...)` is a plain ref write) — i.e. up to 10 full O(86) layout rebuilds after unmount, then `overlay.style.opacity = "0"` on a detached node.

**Contrast, same repo, same element** — `useSidebarFollow` (`latex-paper/src/vue/composables/useSidebarFollow.ts:219-227`) tears down *both* rAFs, all five sidebar listeners, the scroll-source listener and the window listener, and does so by holding its own `currentScrollSource`/`currentSidebar` locals (`:15-17`) rather than re-reading refs. The correct pattern is one directory away from the defective one.

**Falsifier** — dies if PaperView disposes the navigator. `PaperView.vue:291-297` tears down `mobileTocObserver`, `scrollContainerResizeObserver`, the progress fallback, and the two window listeners — and touches nothing from `useScrollNavigation`. The composable returns only `{ navigateTo, navigateBack, scrollToTop, performScroll, navStack }` (`:245`); there is no dispose handle to call.

### **D3 · MAJOR · The teleport overlay is not reentrant, and PaperView multiplexes six entry points into it.**

`withOverlay` (`useScrollNavigation.ts:69-107`) mutates one shared DOM node (`scroller.querySelector(".teleport-overlay")`) with no in-flight guard, no cancellation of a prior correction chain, and a per-invocation `finished` flag that is **local to the invocation** (`:81`) — so a second call cannot see the first.

PaperView wires **six** independent user-reachable paths into the same `navigateTo`:

| # | Site | Path |
|---|---|---|
| 1 | `PaperView.vue:60` + `:109` | `PAPER_CONTEXT.scrollToId` → every `<PaperSection>` descendant |
| 2 | `PaperView.vue:96` | `useClickDelegate.scrollTo` → every `.paper-ref` cross-reference in the body |
| 3 | `PaperView.vue:111` | `usePaperSearch({ navigateTo })` → every search result (`usePaperSearch.ts:43-46`) |
| 4 | `PaperView.vue:324` | `MobileFloatingToc :scroll-to` |
| 5 | `PaperView.vue:340` | `PaperSidebar :scroll-to` (three nested levels) |
| 6 | `PaperView.vue:368` | the inline mobile TOC's own `@click="navigateTo(section.id)"` |

**Failure scenario** — a far jump is in flight (overlay opaque, `correct()` chain running). The reader clicks a second TOC row within the ~200-400 ms window. `withOverlay` B sets `opacity = "1"` on the already-opaque overlay and starts a *second* `correct()` chain. A's chain reaches `stableFrames >= 2` first and calls its `finish()`, which — after `MIN_OVERLAY_MS` — sets `opacity = "0"` while B is still issuing `scroller.scrollTo({ behavior: "instant" })` per frame. The reader watches the mount-and-correct thrash the overlay was built to hide, and the two chains fight over `scrollTop` for up to 10 frames. `UNPROVEN-NEEDS-LIVE` for the visual; the **structural** claim (two concurrent chains, one shared node, no guard) is static and complete.

**Falsifier** — dies if any caller serialises. None does: `navigateTo` (`:202-212`) does no in-flight check, and the only state guard in the file (`isBackNavigation`) governs stack pushes, not overlay ownership.

### **D4 · MAJOR · One `usePaperSearch` instance is fanned to two independently-mounted search UIs; on mobile this puts two `PaperSearchModal`s in `document.body` at once.**

`PaperView.vue:111` constructs a single `search` object and passes the whole composable return as a prop to **two** subtrees: `MobileFloatingToc` (`:328`) and `PaperSidebar` (`:347`). Each renders a full `PaperSearch` (`PaperSidebar.vue:51`, `MobileFloatingToc.vue:111`), and each `PaperSearch` mounts an input, a dropdown **and a modal** (`PaperSearch.vue:24-35`).

The modal escapes the CSS that was supposed to isolate the desktop sidebar:

- `PaperSidebar.vue:132-136` — `.paper-sidebar { display: none }`, `display: block` only at `@media (min-width: 1024px)`. **CSS-only. Never `v-if`-gated.** The sidebar subtree is *mounted at every viewport*.
- `PaperSearchModal.vue:41` — `<Teleport to="body">`. The teleported node is a child of `document.body`, **not** a DOM descendant of `.paper-sidebar`, so `display:none` does not reach it.
- `PaperSearchModal.vue:44` — `v-if="search.isExpanded.value"` on shared state.

**Reachable chain** — viewport < 1024 px → scroll past the inline nav (`mobileTocVisible` false) → `MobileFloatingToc` mounts → tap the search glyph (`MobileFloatingToc.vue:123` → `openMobileSearch`) → `searchActive` true → the *floating* `PaperSearch` mounts (modal #2) → type a query → tap Expand (`PaperSearchInput.vue:47-57`, gated on `canExpand`) → `isExpanded = true` → **both** modals render into `body`.

Consequences, each statically provable: two stacked `.search-modal-overlay`s; two `<input>`s both racing `modalInputRef.focus()` on the same `nextTick` (`PaperSearchModal.vue:19-24`), so the input the reader sees may not be the one with focus; and `PaperSearchModal.vue:32` `document.querySelector(".search-modal-results")` — an unscoped global query — resolves to whichever modal teleported first, so the arrow-key `scrollIntoView` can drive the *hidden* list. Visual stacking is `UNPROVEN-NEEDS-LIVE`; the double-mount and the global-selector aliasing are static.

**Falsifier** — dies if the sidebar is viewport-gated in the DOM (it is not: `PaperSidebar.vue:135` is `display:none`), or if the modal did not teleport (it does: `PaperSearchModal.vue:41`), or if `isExpanded` were per-instance (it is not: one `ref` in `usePaperSearch.ts:22`, shared by construction at `PaperView.vue:111`).

This is a **composable-contract** defect owned by PaperView, not by the search files: `usePaperSearch` is a singleton-shaped composable (one `isOpen`, one `isExpanded`, one `selectedIndex`) and PaperView hands it to N mounted renderers with no ownership discipline.

### **D5 · MAJOR · `disarmProgressFallback` is a guaranteed no-op — it reads `scrollContainer.value` after Vue has already nulled it.**

```ts
// PaperView.vue:183-187
function disarmProgressFallback() {
    scrollContainer.value?.removeEventListener("scroll", onProgressScroll);
    if (progressRaf) cancelAnimationFrame(progressRaf);
    progressRaf = 0;
}
```
Called only from `onUnmounted` (`PaperView.vue:294`).

**Vue 3.5.38 unmount order, verified in the installed runtime:**

1. `unmountComponent` (`runtime-core.cjs.js:6723-6746`): `bum` hooks → `scope.stop()` → `unmount(subTree, …)` → **then** `queuePostRenderEffect(um)`. The `onUnmounted` hooks are queued *after* the subtree unmount.
2. `unmount` (`:6608-6612`) unsets the vnode ref **before** descending: `if (ref != null) { pauseTracking(); setRef(ref, null, parentSuspense, vnode, true); resetTracking(); }`.
3. `setRef` with `isUnmount` (`:1762`) computes `value = null`, and at `:1857-1864` takes the **synchronous** branch: `if (value) { queuePostRenderEffect(job) } else { invalidatePendingSetRef(rawRef); doSet(); }` — `doSet` runs inline, executing `setupState["scrollContainer"] = null` (`:1843-1846`).

So by the time line 184 executes, `scrollContainer.value === null` and the `?.` short-circuits. **The `scroll` listener is never removed.**

**Blast radius, stated honestly** — the element is being discarded, so this is not an unbounded leak; the rAF *is* correctly cancelled at `:185-186`, and `writeProgress` re-guards on `!s || !bar` (`:164`). What the defect actually costs: (a) the disarm is **dead code that reads as live teardown**, so a future change that re-mounts the scroller (a `v-if`, a `<KeepAlive>`) silently accumulates listeners; (b) it is a **latent double-arm** — `armProgressFallback` is called once from `onMounted`'s `nextTick` (`:262`) and never re-armed, so the arm/disarm pair is already asymmetric.

**Falsifier** — dies if `onUnmounted` ran before the subtree unmount (killed by `:6736-6740` hook ordering) or if template refs survived unmount (killed by `:6610` + `:1857-1864`). The correct pattern is in `useSidebarFollow.ts:15-17, 219-227`: hold the bound element in a module-local, never re-read the ref at teardown.

### **D6 · MAJOR · PaperView duplicates a ResizeObserver the library already owns, and its copy is the only *uncoalesced* one.**

`.paper-scroll` ends up carrying, all wired by PaperView:

| Kind | Owner | Site | Coalesced? |
|---|---|---|---|
| `scroll` | `useVirtualSectionWindow` | `useVirtualSectionWindow.ts:200` | rAF (`:187-193`) |
| `scroll` | `useSidebarFollow` | `useSidebarFollow.ts:181-184` | rAF (`:120-127`) |
| `scroll` | **PaperView** | `PaperView.vue:180` | rAF (`:169-172`) — conditional |
| `ResizeObserver` | `useVirtualSectionWindow` | `useVirtualSectionWindow.ts:181-184` → `scheduleRecalculate()` | **yes**, rAF |
| `ResizeObserver` | **PaperView** | `PaperView.vue:224-229` → `recalculate()` | **no — synchronous** |
| `window resize` | `useSidebarFollow` | `useSidebarFollow.ts:195` | rAF |
| `window resize` | **PaperView** | `PaperView.vue:272` → `recalculate()` | **no — synchronous** |

Worse, PaperView's handlers call `updateSectionStartOffset()` (`:217`, `:226`), which writes `sectionStartOffsetPx` — the very ref passed as `leadingOffsetPx` (`:82`) — and `useVirtualSectionWindow.ts:228-231` **already** watches it: `watch(() => toValue(options.leadingOffsetPx), () => scheduleRecalculate())`.

**Failure scenario** — a single desktop window drag-resize fires `ResizeObserver` once per frame. Each frame: PaperView's RO runs `recalculate()` synchronously (full `buildSectionLayout` over 86 entries + `computeWindowState`), then writes `sectionStartOffsetPx`, which schedules a *second* recalculate via the library's `leadingOffsetPx` watcher, while the library's own RO schedules a *third*. Up to **3 layout rebuilds per resize frame**, one of them on the synchronous path, plus PaperView's `window resize` handler adding a fourth on the same event. Cost is bounded and small (86 entries), so this is duplication/altitude, not a perf blocker — but PaperView's RO is **strictly redundant** with the library's: the library cannot compute `sectionStartOffsetPx`, so PaperView must keep `updateSectionStartOffset()`; it must **not** keep the `recalculate()` at `:227` and `:217`.

**Falsifier** — dies if the library's `leadingOffsetPx` watcher did not exist (it does, `:228-231`) or if the library did not observe the container (it does, `:177-185`, bound from `watch(options.scrollContainer, …, { immediate: true })` at `:222-226`).

### **D7 · MAJOR · R5-7 class — PaperView's own TOC loop, and the entire article body it mounts, are native-element `v-for`s and are therefore invisible to component-callsite-keyed instance derivations.**

Folding **R5-7** (`lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT + CARRY→F.W4) and **R6-5/R6-6** (`:140`, the `NATIVE_TEMPLATE_LOOP` cure, `nativeTemplateLoops: 16`): *template-loop evidence keyed to component callsites is blind to native HTML element loops.* R5's `leafValues["instance.loop.paper-sidebar"]` was literally `[]`.

R5-7 named `PaperSidebar.vue` (lines 65, 87, 105 — three nested `<li v-for>`). **The blind spot is wider than the row records, and PaperView is inside it.** Enumerated over the whole `components/paper/` subtree from the live tree:

| Site | Loop host | Visible to a component-callsite deriver? |
|---|---|---|
| `PaperView.vue:363` | `<li v-for="section in sections">` — the mobile inline TOC | **NO** |
| `PaperArticleWindow.vue:71` | `<div v-for="item in visibleItems">` — **the entire virtualised article body** | **NO** |
| `PaperSidebar.vue:65` | `<li v-for>` (root) | **NO** — R5-7 |
| `PaperSidebar.vue:87` | `<li v-for>` (sub) | **NO** — R5-7 |
| `PaperSidebar.vue:105` | `<li v-for>` (sub-sub) | **NO** — R5-7 |
| `MobileFloatingToc.vue:149` | `<template v-for>` — no element, no component | **NO** (third kind; neither R5-7's `li` case nor a callsite) |
| `MobileFloatingToc.vue:167` | `<Button v-for>` | yes |
| `PaperSearchDropdown.vue:42` | `<Button v-for>` | yes |
| `PaperSearchModal.vue:84` | `<Button v-for>` | yes |

**6 of 9 loops in the paper subtree are invisible**, and the two invisible ones the census never named are the two that matter most: `PaperArticleWindow.vue:71` is the loop that renders **every section of the paper**, and `PaperView.vue:363` is a complete third table of contents (see D15). Any per-component D/L/C denominator built on component callsites drops the paper's entire body, not merely its sidebar.

**Carry** — this sharpens `CENSUS-2026-08-03.md:362` F.W4 ("count native element loops or inherit the blind spot"): the F.W4 counter must recognise **three** loop hosts — native element, `<template v-for>`, and component callsite — because R6's cure family is named `NATIVE_TEMPLATE_LOOP` and `<template v-for>` is neither native-element nor callsite. Falsifier: dies if R6's `nativeTemplateLoops: 16` already admits `<template v-for>`; the R6 registry lives under the withdrawn Codex root (`lane-fourier-r3-r6.md:122` — `Operation not permitted`), so this stays **UNPROVEN against R6's registry** and is asserted only against the live tree.

### **D8 · MAJOR · `measureSection` forces a synchronous layout read per visible section on every patch — the function-ref is re-invoked unconditionally.**

`PaperView.vue:384` passes the library's `measureSection` down as `:measure-section`. `PaperArticleWindow.vue:73` binds it through a **fresh inline arrow per render**: `:ref="(el) => bindSection(item.id, el)"`.

Vue invokes function refs on **every patch**, not only on change:

- `runtime-core.cjs.js:5495-5497` — at the end of `patch()`: `if (ref != null && parentComponent) { setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2); }` — unconditional.
- `runtime-core.cjs.js:1814-1815` — inside `setRef`: `if (isFunction(ref)) { callWithErrorHandling(ref, owner, 12, [value, refs]); }` — **no equality guard**, unlike the string/ref branch below it which at least dedupes via `oldRef !== ref`.

Downstream, `useVirtualSectionWindow.ts:140-158`:
```ts
const current = elementMap.get(id);
if (current === el) { syncMeasuredHeight(id, el.offsetHeight); return; }
```
The dedupe guard inside `syncMeasuredHeight` is `if (measuredHeights.get(id) === normalized) return;` (`:129`) — but `el.offsetHeight` is the **argument**, evaluated *before* the guard. So the layout read is unconditional.

**Failure scenario** — the reader scrolls; `visibleItems` changes; `PaperArticleWindow` patches its keyed `v-for` fragment; for each of the ~8-15 mounted sections the ref callback fires and reads `offsetHeight`, forcing a style/layout flush inside the render effect — and these are `.deferred-section` elements under `content-visibility: auto` (`PaperArticleWindow.vue:141-168`), so each read must also resolve the containment box. N forced reflows per window change, every window change.

**Falsifier** — dies if Vue skipped identical function refs (`runtime-core.cjs.js:1814` shows no such guard) or if the arrow were hoisted (it is not — `PaperArticleWindow.vue:73` allocates per render, so even a hypothetical `oldRef !== ref` guard would not help). Contrast `registerWindowRoot`, which **is** correctly guarded — see superlative S1; the correct idiom exists 300 lines away in the same component.

---

## §3 · MINOR

### **D9 · MINOR · `navigateBack`'s 500 ms `isBackNavigation` window silently drops history pushes.**

`useScrollNavigation.ts:214-222` sets `isBackNavigation = true`, pops, scrolls, and clears the flag on a bare `setTimeout(…, 500)`. `navigateTo` (`:202-212`) refuses to push while the flag is set. **Failure scenario**: reader clicks Back, then within 500 ms clicks a sidebar entry — that jump is never recorded, so the next Back returns to the wrong place. The window is time-based rather than tied to the completion of `performScroll`, which is itself variable-length (`teleportTo` runs up to 10 correction frames; a smooth scroll has no completion signal at all). Falsifier: dies if `performScroll` completed synchronously — it does not (`:186-193` defers through `nextTick` + rAF, `:120-165` through the overlay).

### **D10 · MINOR · Partial maps are typed as total `Record<K,V>`; TypeScript believes five live runtime guards are dead.**

`web/tsconfig.json` sets `"strict": true` but **not** `noUncheckedIndexedAccess`, so every index signature returns a non-nullable. Sites inside PaperView's import closure:

| Site | Declared | Runtime guard TS thinks is unreachable |
|---|---|---|
| `PaperView.vue:92-93` | `labelMap: Record<string, PaperLabelInfo>` (`virtual-paper.d.ts:4`) | `const info = labelMap[refKey]; if (!info) return null;` |
| `PaperView.vue:121` | `pageMap: Record<string, number>` (`virtual-paper.d.ts:6`) | `pageMap[flatSections[0]?.id] ?? 1` |
| `PaperView.vue:133-134` | same | `if (page !== undefined) currentPage.value = page;` |
| `PaperArticleWindow.vue:47, 55-58` | `FIGURE_DIMENSIONS: Record<string, readonly [number, number]>` (`figureDimensions.ts:22`) | `dims?.[0]`, `dims?.[1]` |
| `PaperSearchDropdown.vue:51`, `PaperSearchModal.vue:93` | `TYPE_LABELS: Record<string, string>` (`searchHelpers.ts:8`) | `TYPE_LABELS[r.type] ?? r.type` |

The **`labelMap` site is genuinely live**: `refKey` comes from a `data-ref` attribute in rendered paper HTML via `useClickDelegate` (`useClickDelegate.ts:15-18`), so a `\ref{}` to a label the parser did not emit reaches `labelMap[refKey] === undefined`. The type is actively lying about a reachable path, and the author's guard is the only thing standing there.

**Falsifier, applied honestly, kills two of the five**: `latex-paper/src/vite.ts:49-81` assigns `pageMap[section.id]` on **all three** branches (`starred`, `!number`, mapped), over the same `flattenPaperSections(sections)` PaperView re-derives at `:46`. `pageMap` is therefore **total** over `flatSections`, and the guards at `:121` and `:133-134` are genuinely dead. That is still the same defect — the type and the code disagree about which of the five are live, and neither the reader nor the compiler can tell them apart. Repair is one tsconfig flag plus five honest `| undefined`s.

### **D11 · MINOR · Dead `treeIndex` prop, `any`-typed; and `currentSection`'s index round-trip is a provable no-op.**

- `PaperSidebar.vue:20` declares `treeIndex: Map<string, any>` — `grep -n treeIndex PaperSidebar.vue` returns **only line 20**. The prop is never referenced in the template or script. PaperView computes it (`:48`) and passes it (`:343`).
- The `any` also discards the real type: `useTreeIndex` returns `Map<string, TreeIndexEntry<T>>` (`useTreeIndex.d.ts`, `tracking/types.ts:10-19`).
- `PaperView.vue:240-245`:
  ```ts
  const entry = treeIndex.get(activeRootId.value);
  if (!entry) return null;
  return paperSections.find((s) => s.id === entry.node.id) ?? null;
  ```
  `useTreeIndex.ts:24` does `index.set(node.id, { node, … })`, so `index.get(x).node.id === x` **by construction**. The whole block reduces to `paperSections.find(s => s.id === activeRootId.value) ?? null`.

After removing both, the only surviving consumer of `useTreeIndex` is `isInActiveChain` — `isActive` is literally `id === activeId` (`useTreeIndex.ts:38-40`) yet is passed down as a function-valued prop (`PaperView.vue:344`). The parallel tree built by `paperTree.ts:4-9` + `PaperView.vue:47` exists to feed one predicate. Falsifier: dies if `treeIndex` were used anywhere in `PaperSidebar` — grep says it is not.

### **D12 · MINOR · Two empty `catch {}` blocks; the second swallows navigation, not storage.**

- `PaperView.vue:136-139` — `try { …sessionStorage… } catch {}`. Scope is correct (storage only), posture is silent.
- `PaperView.vue:264-270` — the `try` wraps `sessionStorage.getItem` **and** `performScroll(saved)`. `performScroll` reaches `document.getElementById`, `getOffsetFor`, `scroller.scrollTo` and the whole teleport machinery (`useScrollNavigation.ts:169-200`). Any throw in navigation is attributed to storage and discarded. The intended guard is one line; the actual guard is the feature.

Falsifier: dies if `performScroll` were total. It is not — `computeAbsoluteTop` dereferences `scroller` and `getScrollOffset()` queries the DOM (`:24-26`), and `teleportTo` schedules callbacks whose throws land outside the `try` anyway, so the block is simultaneously **too wide** for its purpose and **too narrow** to actually catch the async failures.

### **D13 · MINOR · `const sections = computed(() => paperSections)` (`PaperView.vue:120`) is a constant computed over a module constant.**

`paperSections` is a build-time-frozen module export (`lib/paperContent.ts:7` ← `virtual:paper-content`), never reassigned. The computed creates a reactive effect, a dep set and a dirty-flag for a value that cannot change, then is passed as `:sections` to two children (`:337`, `:321`) whose props are `PaperSectionData[]`. Falsifier: dies if `paperSections` were reactive or reassigned — it is a `const` re-export of a virtual module.

### **D14 · MINOR · The `let _scrollTo` late-bind is an artificial cycle.**

`PaperView.vue:51` `let _scrollTo: (id: string) => void = () => {};`, indirected at `:60` (`scrollToId`), `:96` (`useClickDelegate.scrollTo`), and finally assigned at `:109`. Between `:63` (`provide`) and `:109`, `PAPER_CONTEXT.scrollToId` is a silent no-op.

**There is no real cycle.** `useVirtualSectionWindow` (`:77`) depends only on `flatSections`, `scrollContainer`, `sectionStartOffsetPx`. `useScrollNavigation` (`:99`) depends only on that plus `scrollContainer`. Neither needs `paperContext`. The correct order — `useKatex` → `useVirtualSectionWindow` → `useScrollNavigation` → build `paperContext` with `scrollToId: navigateTo` → `provide` → `useClickDelegate({ scrollTo: navigateTo })` — removes the mutable and all three indirections. Falsifier: dies if any of the three composables needed `paperContext`; none injects or receives it.

### **D15 · MINOR · Three table-of-contents implementations for one data set, one of them hand-rolled inline in PaperView.**

| Impl | Site | Mechanism |
|---|---|---|
| Desktop sidebar | `PaperSidebar.vue:64-125` | glass-ui `useSidebarState` + `Collapsible`, 3 nested `<li v-for>`, tooltips, previews, active-chain styling |
| Mobile floating | `MobileFloatingToc.vue:149-177` | glass-ui `useSidebarState`, `<template v-for>` + `<Button v-for>`, expand/collapse |
| **Mobile inline** | **`PaperView.vue:361-377`** | **hand-rolled `<ol>`/`<li v-for>` + `Button`, no expand/collapse, no subsections, no active state** |

The third renders only root sections and drops the entire subsection level that the other two expose. It exists solely to be the IntersectionObserver sentinel for the second (`:361` `ref="mobileNavRef"`, observed at `:257`) — i.e. a full TOC is rendered as a scroll tripwire. Both `PaperSidebar` and `MobileFloatingToc` already consumed the shared `useSidebarState` recipe (their comments at `PaperSidebar.vue:30-37` and `MobileFloatingToc.vue:61-66` name the de-duplication explicitly); PaperView's copy is the one that was left behind. Falsifier: dies if the inline list carried behaviour the others lack — it carries strictly less.

### **D16 · MINOR · Mixed provide/inject and prop-drilling of the same values.**

`PaperView.vue:63` provides `PAPER_CONTEXT` (which carries `renderTitle`, `renderInline`, `renderDisplay`, `sections`, `labelMap`, `scrollToId`) — and then *also* prop-drills the same data to descendants of that very provide: `:render-title` at `:326` and `:342`, `:sections` at `:321` and `:337`, `:scroll-to` at `:324` and `:340`, `:search` at `:328` and `:347`. `PaperSidebar` and `MobileFloatingToc` are both inside the provide's subtree and could inject. Two contracts for one dependency graph; a change to `renderTitle` must be made in two places. Falsifier: dies if either component were rendered outside the provide (both are inside `.paper-root`, `:301`).

### **D17 · MINOR · `MobileFloatingToc` mounts on desktop and stays mounted forever.**

`PaperView.vue:361` — the observed sentinel is `<nav ref="mobileNavRef" class="… lg:hidden">`, i.e. `display: none` at ≥1024 px. `PaperView.vue:248-255` observes it with `{ threshold: 0 }` and sets `mobileTocVisible.value = entry.isIntersecting`. A `display:none` element has no box and reports `isIntersecting: false` on the initial observation, so on desktop `mobileTocVisible` flips `true → false` and `v-if="!mobileTocVisible"` (`:320`) mounts `MobileFloatingToc` permanently — where it is then hidden by its own `lg:hidden` (`MobileFloatingToc.vue:107`). Cost: a wasted `useSidebarState` (reactive Sets over all 51 root sections), two watchers, and a `<Transition name="slide-down">` enter cycle on every desktop `/paper` load. `UNPROVEN-NEEDS-LIVE` for the `isIntersecting: false` report; the CSS gating and the `v-if` polarity are static.

**Falsifier note (a near-miss I checked and rejected):** the observer passes no `root`, so one might claim it wrongly measures against the document viewport rather than `.paper-scroll`. That claim is **wrong** — the Intersection Observer algorithm clips the target rect by the clip rect of every intervening ancestor, including a scrollable ancestor's overflow clip, so an implicit-root observer inside `.paper-scroll` reports correctly. Not filed.

### **D18 · MINOR · `usePaperSearch`'s debounce timer has no dispose.**

`usePaperSearch.ts:27-33` — `let debounceTimer` set inside `watch(query, …)`, cleared only by the next keystroke. No `onUnmounted`/`onScopeDispose` in the file. If `/paper` unmounts within 120 ms of a keystroke the timer fires post-unmount and writes `debouncedQuery.value`. Bounded and near-harmless (the `results` computed is lazy and unread), but it is a missing teardown in a composable that is otherwise disciplined.

### **D19 · MINOR · The reduced-motion arm decision is a one-shot snapshot.**

`PaperView.vue:173-182` reads `window.matchMedia("(prefers-reduced-motion: reduce)").matches` once, at arm time, and never subscribes to `change`. **Failure scenario**: on an engine without `scroll()` timelines (so `NATIVE_SCROLL_TIMELINE` is false and the JS floor *is* armed), the reader enables OS "Reduce motion" mid-session. The CSS recipe re-evaluates live and stays off; the JS floor keeps writing `scaleX` because its decision was frozen. The two paths' gates are also not complements: glass-ui's outer gate is `@media (prefers-reduced-motion: no-preference)` (`scroll-driven.css:36`), PaperView's is `(prefers-reduced-motion: reduce)` — on a UA supporting neither value, both evaluate false and both paths run their "off" branch. Falsifier: the second half is theoretical (no engine ships `scroll()` timelines without `prefers-reduced-motion`); the first half is reachable on current Firefox.

### **D20 · MINOR · A synchronous `sessionStorage` write on every section crossing.**

`PaperView.vue:136-139` runs inside a `pre`-flush watcher job on **every** `activeId` change — i.e. every time the scroll spy crosses one of the 86 flat-section boundaries. `sessionStorage.setItem` is a synchronous, main-thread, disk-backed write executed inside the render scheduler flush. A full read-through of the paper issues ~86 of them; a fast flick-scroll issues them in bursts. Trivially fixed by writing on a debounce or on `visibilitychange`. Falsifier: dies if the watcher were `flush: "post"` off the main path or debounced — it is neither.

---

## §4 · INFO

### **D21 · INFO · `useKatex`'s module cache omits macros from the key, and its doc comment describes a fallback the code does not implement.**

`latex-paper/src/vue/composables/useKatex.ts:8` — `const cache = new Map<string, string>()`, module-level, keyed `i:${tex}` / `d:${tex}` (`:18`, `:30`). **The macro table is not in the key.** PaperView supplies an app-specific table (`PaperView.vue:26-36`) that redefines two KaTeX **built-ins** — `\leftrightarrow` and `\Leftrightarrow` (`:34-35`) — so a second `useKatex()` caller with different macros would silently inherit or poison PaperView's rendering for identical tex strings, first-writer-wins, for the page lifetime.

Additionally the docblock claims *"If no macros are provided, attempts to use macros from injected PaperContext"* — the code does `const resolvedMacros = macros ?? {}` (`:15`) and **never reads `PAPER_CONTEXT`**; the `inject` and `PAPER_CONTEXT` imports at `:2-3` are dead. Confirmed in the shipped dist (`dist/vue.js:389` — `const resolvedMacros = macros ?? {}`, with no `inject` in that function).

**Latent, not live** — `grep -rn useKatex web/src/` returns exactly one hit (`PaperView.vue:3, 38`), and every latex-paper renderer goes through `inject(PAPER_CONTEXT)` instead (`MathBlock.vue:11`, `MathInline.vue:6`, `PaperSection.vue:13`, `CodeBlock.vue:13`, `Theorem.vue:19`, `PaperSectionBlocks.vue:23`; `dist/vue.js:1087,1137,1172,1328,1380,1468`). Filed as INFO because PaperView is the sole caller **today** and the contract it relies on is undocumented-and-wrongly-documented.

### **D22 · INFO · Under reduced motion, both progress-bar paths are gated off.**

glass-ui's recipe sits under `@media (prefers-reduced-motion: no-preference)` (`scroll-driven.css:36`); PaperView's JS floor refuses to arm under `reduce` (`PaperView.vue:177`). A PRM reader therefore gets `.paper-progress-track` in the DOM permanently (`:313-315`, sticky, 2 px, always rendered) with `.paper-progress-bar` frozen at `transform: scaleX(0)` (`:490`). **Benign** — and provably so: `.paper-progress-track` (`:474-483`) declares no `background`, so a zero-width bar is fully invisible rather than an empty-looking affordance. Filed INFO rather than MINOR *because* the falsifier held.

### **D23 · INFO · Goldilocks — 685 lines, ~11 concerns in one setup block.**

Concern inventory of `<script setup>` (1–298): KaTeX macro table · `PAPER_CONTEXT` construction + provide · virtual-window wiring · click delegation · scroll navigation · search construction · global keyboard · session persistence · mobile-TOC IntersectionObserver · reading-progress bar (native + JS floor) · offset/viewport measurement · ResizeObserver lifecycle · sidebar-follow wiring · `currentSection` derivation. The census books the file at **685** (`lane-frontend.md:152`), the largest in `components/paper/`.

Two units extract cleanly and are the honest Goldilocks repair:

1. **`useReadingProgress(scrollContainer, barRef)`** — `PaperView.vue:149-187` (39 lines of script) + `:474-500` (27 lines of CSS) + the 10-line template comment at `:303-312`. Fully self-contained, zero coupling to the rest of the component, and it *re-implements* the scroll-listener + rAF-coalesce pattern already present twice in the composables it sits beside (`useVirtualSectionWindow.ts:187-193`, `useSidebarFollow.ts:120-127`).
2. **`usePaperViewport({ scrollContainer, sectionWindowRoot, recalculate })`** — `PaperView.vue:127, 189-230, 276-289`, the offset/viewport/ResizeObserver cluster, which is exactly where D5 and D6 live.

That would take the file to ≈ 560 lines and the setup block from ~11 concerns to ~7. Filed INFO because size alone is not a defect; the *coupling* it hides is, and that is filed separately.

### **D24 · INFO · `onMounted`'s `nextTick` body is not unmount-guarded.**

`PaperView.vue:256-271` — `nextTick` callbacks are not cancelled on unmount. If the route is left before the first flush, the body still runs: `mobileTocObserver!.observe(...)` on a disconnected observer, `recalculate()`, `queueSidebarFollow(true)`, `armProgressFallback()` (which no-ops on a null `scrollContainer`) and `performScroll(saved)`. Practically unreachable for a route-level component; recorded for completeness and because it interacts with D2 (the navigator would then start an rAF chain against a detached tree with nothing to stop it).

---

## §5 · Superlatives (7) — L-18 runs both ways

### **S1 · The `registerWindowRoot` identity guard is exactly right, and the reason is non-obvious.**

`PaperView.vue:204-212`:
```ts
function registerWindowRoot(el: HTMLElement | null) {
    if (sectionWindowRoot.value === el) return;      // ← the guard
    …
}
```
Vue invokes function refs **on every patch** with no equality check (`runtime-core.cjs.js:5495-5497` + `:1814-1815`). Without this guard, every re-render of `PaperArticleWindow` would re-enter `nextTick(() => { updateSectionStartOffset(); recalculate(); })` and schedule an unbounded recalculate cascade. The idiomatic mistake was avoided here — and D8 shows the *unguarded* form of the same idiom one file over, which is precisely what makes this line worth banking rather than assuming.

### **S2 · The dual-path single-writer progress bar is correct on every axis I could check.**

`PaperView.vue:149-187` + `:303-315` + `:474-500`, against glass-ui `dist/styles/scroll-driven.css:36-48`:

- The JS feature test is the **same predicate** as the CSS `@supports`: `CSS.supports("animation-timeline", "scroll()")` (`:158`) vs `@supports (animation-timeline: scroll())` (`scroll-driven.css:37`). Not an approximation — the identical condition, so the two paths cannot both fire.
- `--scroll-progress-scroller: nearest` is set on `.paper-progress-bar` (`:499`), i.e. on the *same element* that carries `.scroll-progress`, which is where the recipe resolves `var(--scroll-progress-scroller, root)` (`scroll-driven.css:47`). Getting this on the wrong element is the standard failure and it is not made here.
- The bar is placed **inside** the scroller it measures (`:302` → `:313-315`), so `scroll(nearest block)` resolves to `.paper-scroll` rather than the document root.
- The JS floor coalesces to one rAF (`:169-172`), registers `{ passive: true }` (`:180`), and writes **only `transform`** (`:167`) — compositor-only, no layout, no paint.

Four independent ways to get this wrong; none taken. (D5 and D19 are ordering/lifecycle faults *around* this block, not faults *in* it.)

### **S3 · The search-highlight `v-html` sink is closed on every branch.**

`searchHelpers.ts:34-70` is the one place in the paper subtree where **user input** meets `v-html` (sinks at `PaperSearchDropdown.vue:58` and `PaperSearchModal.vue:100`). It escapes on the empty-query path (`:35`), the no-match path (`:49`), the matched-run path (`:61`) **and** the per-character path (`:64`), and it never emits the query itself — the query is used only to compute match *indices* into the display text. The classic defect here (interpolating the query into the highlight markup) is structurally impossible. Falsifier applied: I looked for an unescaped path and there is none.

### **S4 · The vite virtual module has a real typed contract.**

`web/src/virtual-paper.d.ts:1-8` declares `virtual:paper-content` with concrete types (`PaperSectionData[]`, `Record<string, PaperLabelInfo>`, `number`, two `Record`s) rather than leaving it implicitly `any`. This is uncommon — most `virtual:*` consumers ship untyped — and it means PaperView's **entire content surface** is checked by `vue-tsc -b` (`package.json` build script). I opened this specifically expecting to file a MAJOR "content contract is `any`" defect; the tree refuted it. (D10's index-signature critique is a different, narrower point and does not touch this.)

### **S5 · `PaperArticleWindow`'s function-ref narrowing is the correct shape.**

`PaperArticleWindow.vue:21-25` — `value instanceof HTMLElement ? value : null` over `Element | ComponentPublicInstance | null`. Vue's function-ref value type genuinely is that union (component refs yield the public instance), and the near-universal shortcut is `as HTMLElement`. Here it is a real narrowing with a real `null` branch, feeding `measureSection`'s own `if (!el) { disconnectSection(id); return; }` (`useVirtualSectionWindow.ts:141-144`).

### **S6 · The `<picture>` 404 trap is identified and structurally enforced.**

`PaperArticleWindow.vue:38-43` + `figureDimensions.ts:52-58`: *"`<picture>` does NOT fall back on a 404 — only on an unsupported format — so the AVIF/WebP `<source>`s are emitted ONLY for figures we know carry variants."* That is a genuine and frequently-missed HTML trap, and it is enforced by a real set derived from the dimension table (`TRANSCODED_FIGURES = new Set(Object.keys(FIGURE_DIMENSIONS))`), not by convention. The same table supplies intrinsic `width`/`height` (`:99-100`) specifically because a virtualised window mounts figures mid-scroll and un-dimensioned `<img>` is a CLS generator (`figureDimensions.ts:6-13`).

### **S7 · The `content-visibility` ↔ virtualizer interaction is correctly reasoned.**

`PaperArticleWindow.vue:144-166` identifies the exact hazard: the JS window measures every section via `offsetHeight` for its spacer math, and a plain (non-`auto`) `contain-intrinsic-size` would feed it the *estimate* instead of the real size and corrupt scroll positioning. The `auto` prefix makes the browser remember the real painted size, and `measureSection` reads on a **post-mount rAF** (`useVirtualSectionWindow.ts:154-157`) so the remembered value is always the real one. That is a subtle three-way interaction — CSS containment, a JS virtualizer, and rAF ordering — reasoned correctly and written down. (D8 is a *frequency* defect on this path, not a correctness one; the containment reasoning stands.)

---

## §6 · Corpus reconciliation

**Folded and confirmed**

- **R5-7 / R6-5 / R6-6** (`lane-fourier-r3-r6.md:125, 140`) — adopted whole and **extended**: see D7. The blind spot reaches `PaperView.vue:363` and `PaperArticleWindow.vue:71`, and a third loop host (`<template v-for>`, `MobileFloatingToc.vue:149`) exists that is neither R5-7's native-`li` case nor a component callsite.
- `CENSUS-2026-08-03.md:362` (F.W4: "count native element loops or inherit the blind spot") — sharpened to a three-way host taxonomy.
- `lane-frontend.md:152` — `PaperView.vue` **685** LOC: exact (`wc -l` → 685).
- `lane-frontend.md:287` — the sole glass-ui import at `PaperView.vue:22`: exact.
- `CENSUS-2026-08-03.md:85-87` — *"Canvas2D throughout, WebGL/WebGPU ABSENT; three independent canvases … + 12 SVG surfaces"*: **confirmed for this component's relationship to the viz path.** PaperView touches **none** of the three canvases. Its figures are pre-rasterized PNG/AVIF/WebP (`PaperArticleWindow.vue:44-59`, `figureDimensions.ts`), and the live visualizers are reached only by `router-link` from the callout slot (`PaperArticleWindow.vue:112-119`). What PaperView *does* own on the render path is compositor-adjacent, not canvas: the `scroll()`-timeline progress bar (S2, D19, D22), the `content-visibility: auto` deferred-section measurement contract (S7, D8), and the permanently-promoted overlay layer noted immediately below.
- `lane-fourier-r3-r6.md:159` **X-9** (member-scope denominator OPEN) — D7's enumeration is scoped explicitly to `web/src/components/paper/**` (9 loops / 6 invisible) so it composes with whichever scope law F.W4 publishes.

**Contradicted**

- `lane-frontend.md:617` books the PRM gate as *"`paper/PaperView.vue:176` — `window.matchMedia?.(…)` — **smooth-scroll opt-out**"*. **The tree disagrees.** Line 176 sits inside `armProgressFallback` (`:173-182`), and its sole effect is to suppress the **reading-progress-bar JS fallback listener** (`:180`). It has no relationship to smooth scrolling: the two `behavior: "smooth"` sites live in `useScrollNavigation.ts:191` and `:242` and are **completely ungated by reduced motion**. Correct census row: *`PaperView.vue:176` — progress-bar JS-floor opt-out*; and the PRM coverage table should gain a new **gap** row — `useScrollNavigation.ts:191, 242` issue `scrollTo({ behavior: "smooth" })` with no PRM check, which is a WCAG 2.3.3 surface of exactly the kind `GalleryMarquee.vue:126-128` was already booked for. (Filed here as a census correction rather than as a numbered defect, since motion posture is the D-axis, not L.)

**Noted for a sibling axis (not filed as L defects)**

- `PaperView.vue:513` — `.teleport-overlay` carries `will-change: opacity` **permanently in a stylesheet** on a `position: fixed; inset: 0` element with a radial-gradient background. That is a standing full-viewport compositor layer held for the entire life of the `/paper` route, for an overlay used only during far jumps. MDN's explicit guidance is not to set `will-change` permanently in CSS. Memory impact is `UNPROVEN-NEEDS-LIVE`; the permanent-promotion hint is static. → D-axis / SS-13.
- `PaperView.vue:363-374` — the inline mobile TOC wraps each `<Button variant="link">` in an `<li>` inside an `<ol>`, i.e. a list of buttons presented as a navigation index, and the `<nav>` at `:361` carries no `aria-label` (contrast `PaperSidebar.vue:50`, which does). → A-axis.

---

## §7 · Checked and rejected (falsifier discipline)

Recorded so the next auditor does not re-spend the reads:

| Hypothesis | Verdict | Killed by |
|---|---|---|
| The `virtual:paper-content` content surface is untyped `any` | **REJECTED** | `web/src/virtual-paper.d.ts:1-8` — fully typed (→ S4) |
| The mobile-TOC IntersectionObserver measures the wrong root (no `root` option, target inside `.paper-scroll`) | **REJECTED** | IO clips the target rect by every intervening ancestor's clip rect, including a scroll container's overflow clip; implicit-root is correct here |
| `useKatex`'s module cache is an unbounded leak | **REJECTED** | Keyed by tex string; the corpus is the build-frozen paper, so the cache is bounded by content, not by session (the *macro-key* defect is real and separate → D21) |
| `highlightFuzzy` injects the user's query into `v-html` | **REJECTED** | `searchHelpers.ts:34-70` escapes on all four branches and never emits the query (→ S3) |
| `--scroll-progress-scroller: nearest` is set on the wrong element / resolves to the document root | **REJECTED** | Declared on `.paper-progress-bar` (`:499`), the same element carrying `.scroll-progress`; recipe reads the var on that element (`scroll-driven.css:47`) (→ S2) |
| `useClickDelegate` leaks its listener (binds at mount, never rebinds on container change) | **REJECTED as live** | `scrollContainer` is a static `<div>` (`PaperView.vue:302`), never `v-if`-gated; `useClickDelegate.ts:21-29` binds and unbinds symmetrically. Latent only, not filed |
| `pageMap` can miss a flat-section id (making `PaperView.vue:133-134`'s guard live) | **REJECTED** | `latex-paper/src/vite.ts:49-81` assigns on all three branches over the same `flattenPaperSections(sections)` — the map is total (this *strengthened* D10 rather than creating a separate defect) |
| `MobileFloatingToc`'s `onUnmounted` restores `overflow` on a stale/null element | **REJECTED** | `props.scrollContainer` holds the element value from the last render, not a live ref read; the element is non-null at unmount |
| `useTreeIndex`'s `roots.indexOf(node)` inside `walk` is O(n²) | **REJECTED as material** | 51 roots → ~2.6k comparisons, once, at setup. Real but immaterial; not filed |

---

## §8 · Repair order (cheapest-first, each independently landable)

1. **D1** — delete `{ immediate: true }` at `PaperView.vue:141`, or hoist the `getItem` above line 129. One line. Restores a dead feature.
2. **D5 / D6** — hold the bound scroller in a module-local (mirroring `useSidebarFollow.ts:15-17`); delete PaperView's `ResizeObserver` and the `recalculate()` calls at `:217`/`:227`, relying on `useVirtualSectionWindow.ts:228-231`. Removes a no-op teardown and two redundant O(n) rebuild paths.
3. **D14 / D13 / D11** — reorder setup to kill `_scrollTo`; drop `sections` computed; drop the dead `treeIndex` prop and collapse `currentSection` to one `find`. ~15 lines net removed, zero behaviour change.
4. **D2 / D3 / D9** — give `useScrollNavigation` an `onScopeDispose` that cancels the correction chain and both timers, plus an in-flight token so a new `navigateTo` cancels the previous chain and the `isBackNavigation` window closes on completion rather than on a 500 ms clock.
5. **D4** — one owner for the search UI: either `v-if`-gate the sidebar's `PaperSearch` on viewport, or hoist the modal to a single PaperView-level instance and pass only `variant` down.
6. **D8** — hoist the section ref binder out of the `v-for` and move the `offsetHeight` read behind the dedupe (`useVirtualSectionWindow.ts:127-134`) — an upstream latex-paper change, so book it as a cross-repo carry.
7. **D23** — extract `useReadingProgress` + `usePaperViewport`; this is also where the D5/D6/D19 repairs naturally land.

---

*Every claim above is static or source-derived. No browser tooling was used. Claims marked `UNPROVEN-NEEDS-LIVE` — D3's visual overlap, D4's visual stacking, D17's `isIntersecting: false` report, and §6's `will-change` memory cost — are the complete set requiring SS-13 confirmation; each is stated so that its structural half stands independently of the live half.*

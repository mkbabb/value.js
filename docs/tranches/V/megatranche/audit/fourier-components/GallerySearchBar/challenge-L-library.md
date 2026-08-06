claude-opus-5[1m]

# CHALLENGE — `GallerySearchBar.vue` — axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GallerySearchBar.vue` (223 lines)
**Posture** Assumed DEFECTIVE until the tree proved otherwise. Static + source-derived only; no browser tooling. Every row carries severity, `file:line` provenance, and the falsifier it survived.
**Corpus folded** `formation/fourier/lane-frontend.md:106` (census inventory row) · `formation/fourier/CENSUS-2026-08-03.md` · `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R5-7** (`:125`) and **R6-5** (`:139`) · fourier's own `docs/audits/runs/2026-06-16-M-deep-audit/findings-index.txt:395` (D4-10).

**Verdict — 14 defects (1 BLOCKER · 4 MAJOR · 7 MINOR · 2 INFO), 4 superlatives, 4 candidate findings killed by their own falsifiers.**

The component is a *well-built facade over a feature that does not exist*. Its craft is genuinely high — the glass-ui consumption, the transition tokens, the teardown surface are all exemplary and are recorded as superlatives below. Three of its four outputs are inert end-to-end, and the fourth actively destroys pagination state.

---

## Files read whole (read-only)

| File | Why |
| --- | --- |
| `web/src/components/visualization/gallery/GallerySearchBar.vue` | target |
| `web/src/components/visualization/lib/basis-display.ts` | direct import (line 4) |
| `web/src/lib/colors.ts` | transitive import via `basis-display.ts:1` |
| `web/node_modules/@mkbabb/glass-ui/dist/…/{Select*,Button}*` | direct imports (lines 5–12) |
| `web/node_modules/reka-ui/dist/Select/{SelectRoot,SelectContent,SelectValue,SelectItemText,SelectItem}.js` | the primitives glass-ui wraps |
| `web/src/components/visualization/GalleryView.vue` | sole consumer (`:23`, `:228-238`) |
| `web/src/stores/gallery.ts`, `web/src/lib/api.ts`, `api/routers/visualizations.py` | the emit sink, wire, and server |
| `web/src/components/visualization/{BasisSelector,BasisCanvas}.vue`, `…/lib/canvas-drawing/labels.ts` | the viz render path sharing `basisDisplay` |
| `web/src/App.vue`, `web/src/style.css`, glass-ui token CSS | the colour-resolution chain |
| `web/e2e/gallery.spec.ts`, `web/tsconfig.json`, `web/package.json` | coverage + strictness posture |

---

## BLOCKER

### L-1 — Three of the four controls are inert end-to-end; the fourth destroys accumulated pagination

**Severity BLOCKER** · `GallerySearchBar.vue:14-26`, `GalleryView.vue:94-114`, `stores/gallery.ts:84-95`, `lib/api.ts:397-413`, `api/routers/visualizations.py:288-294`

The component declares four two-way controls (`searchQuery`, `sort`, `tierFilter`, `basisFilter`). Only `sort` reaches the server. The other three are consumed by nothing.

The full trace, exhaustively enumerated by grep over `web/src` (every occurrence, no elisions):

- `searchQuery` — `stores/gallery.ts:37` (declaration), `:271` (export), `GalleryView.vue:95` (a watcher that only calls `resetAndFetch()`), `:230`/`:234` (the binding), and this component. **Never a query parameter; never an argument to a `.filter()`.**
- `tierFilter` — `stores/gallery.ts:33`, `:269`, `GalleryView.vue:112` (watch → `resetAndFetch()`), `:232`/`:236`, and this component's `hasActiveFilters` + Select model. **Never sent, never filtered.**
- `basisFilter` — `stores/gallery.ts:38`, `:272`, `GalleryView.vue:112`, `:233`/`:237`, and this component's pill state. **Never sent, never filtered.**

The sink confirms it. `resetAndFetch` (`stores/gallery.ts:84`) calls `api.listVisualizations({ limit: 20, sort: sort.value, owner: ownerParam() })` at `:90-94` — three keys, none of them a filter. `listVisualizations` (`lib/api.ts:397-413`) accepts exactly `{limit, sort, cursor, owner}` and serialises exactly those four. The server agrees: `list_visualizations` (`api/routers/visualizations.py:288-294`) declares exactly `limit, sort, cursor, owner`. There is no `q`, no `tier`, no `basis` at any layer.

Nor is there a client-side fallback. `GalleryView.vue:64-70` derives `featuredEntries`/`nonFeaturedEntries` by `e.tier === "featured"` alone; `GalleryInfiniteGrid` receives `nonFeaturedEntries` unfiltered (`:289-303`).

**The active harm, beyond the no-op.** `GalleryView.vue:94-98` debounces `searchQuery` at 300 ms into `resetAndFetch()`, and `resetAndFetch` opens with `entries.value = []; nextCursor.value = null; hasMore.value = true` (`stores/gallery.ts:85-87`). So typing one character into a search box that cannot search **discards every infinite-scroll page the user has accumulated and refetches page 1**. The same holds for `GalleryView.vue:111-114`: toggling a tier or a basis pill wipes the list and refetches it identically. The controls are worse than inert — they are a destructive reset dressed as a filter.

**Falsifier, and why it fails.** *"Some layer filters that I did not read."* The grep above is exhaustive over `web/src` for all three identifiers — every hit is accounted for. The API client and the FastAPI signature are both closed enumerations of their query params. A filter would have to exist in one of those places; it exists in none.

**Contrast that indicts the tree, not just the component.** `AdminUserList.vue:61` — in the *same directory* — sends `q: searchQuery.value || undefined` to its list endpoint. The codebase knows the idiom, implements it correctly 200 lines away, and did not wire it here.

**Why it shipped green:** see L-11. No test asserts that any control changes any result.

**Correct disposition** is a ruling, not a patch: either wire `q`/`tier`/`basis` through `listVisualizations` → the router (the honest fix, and it must be paired with cursor-invalidation semantics so a filter change does not silently look like the reset it currently is), or remove the three dead controls. Shipping a facade is the one option the audit should refuse.

---

## MAJOR

### L-2 — `basisOptions` is a `computed` with zero reactive dependencies over a frozen snapshot of a `reactive()` object; the basis pills are theme-invariant

**Severity MAJOR** · `GallerySearchBar.vue:30-37`, `:121` · `lib/basis-display.ts:3-7` · `lib/colors.ts:77-96`

`basis-display.ts:3-7` builds a **plain object literal** at module-evaluation time, reading `VIZ_COLORS.fourier` / `.chebyshev` / `.legendre` into `string` fields. `VIZ_COLORS` is `reactive(...)` (`colors.ts:77-87`) and is *mutated later* by `resolveVizColors()` (`colors.ts:90-96`), which `App.vue:10-18` calls `onMounted` **and again on every `documentElement` class mutation** — i.e. on every dark-mode toggle.

Two consequences compound:

1. `basisDisplay[k].color` captured a `string` at import time. Reassigning `VIZ_COLORS.fourier` cannot propagate into a `string` that was already copied out. The snapshot is permanent.
2. `basisOptions` (`:30-37`) wraps that plain object in `computed()`. A `computed` over a non-reactive source registers **no dependency**, evaluates once, and caches forever. The `computed` is not merely useless — it is load-bearing camouflage, because it *looks* like the colour is tracked.

So `:style="{ '--pill-c': b.color }"` (`:121`) paints hard-coded `#bf4040` / `#3d72b8` / `#9545b8` in **both** themes. Meanwhile the sibling surfaces that consume the same brand hue through CSS — `EditorControlsDock.vue:200-208`, `FunctionInput.vue:236-247` — use `var(--viz-fourier)` directly, and glass-ui ships **distinct dark values** for it (`tokens/dark-arm.css:113-115`: `oklch(0.693 0.151 28.1)` vs light `oklch(0.579 0.201 30.4)` at `tokens/color-radius.css:263`; also `tokens/light-dark.css:145-147`). In dark mode the search bar's basis pills therefore disagree with every CSS-driven basis surface in the app.

**Falsifier, and why it fails.** *"Light and dark `--viz-*` are the same, so nothing drifts."* Read directly: `dark-arm.css:113-115` and `light-dark.css:145-147` give three visibly lighter dark-mode values. *"`basisDisplay` is reactive because `VIZ_COLORS` is."* No — `reactive()` proxies property **access**, and the access already happened at `basis-display.ts:4-6`; what survives is a detached primitive.

**Do not repair this the obvious way.** See L-3 — making `basisOptions` reactive turns all three pills grey.

### L-3 — `cssVarToHex` cannot parse `oklch()` or `light-dark()`; `resolveVizColors()` collapses all three basis hues to `#888888` on every boot — so the naive repair of L-2 is worse than L-2

**Severity MAJOR** · `lib/colors.ts:22-54`, `:90-96` · glass-ui `tokens/color-radius.css:263-265`, `tokens/dark-arm.css:113-115`, `tokens/light-dark.css:145-147`, `tokens/light-dark.css:52-56`

`cssVarToHex` (`colors.ts:22-54`) recognises exactly four shapes: a `#` prefix (`:27`), `hsl(...)` (`:32-38`), a bare Tailwind HSL triplet (`:40-43`), and `rgb(...)` (`:46-51`). Anything else falls through to `return "#888888"` (`:53`).

glass-ui ships `--viz-fourier`, `--viz-chebyshev`, `--viz-legendre` as **`oklch(...)`** (`color-radius.css:263-265`), or as `light-dark(oklch(…), oklch(…))` under the light-dark arm (`light-dark.css:145-147`). These are unregistered custom properties — glass-ui's own comment at `light-dark.css:52-56` states its only `@property` registrations are progress/phase/ripple/specular/glass-level/ui-scale and that there is **no colour `@property`** — so `getPropertyValue` (`colors.ts:23-25`) returns the raw token stream, `oklch(…)` / `light-dark(…)`. Neither matches any of the four branches.

Therefore, at `App.vue:11` on every boot, and again on every theme toggle:

```
VIZ_COLORS.fourier === VIZ_COLORS.chebyshev === VIZ_COLORS.legendre === "#888888"
```

Three distinct brand hues collapse to one identical grey. (`--viz-amber` escapes only because fourier overrides it locally in `hsl()` at `style.css:120`/`:125`, which the `hsl` branch does parse — a coincidence, not a design.)

**This is the finding that makes L-2 dangerous to fix.** The obvious repair — make `basisDisplay`/`basisOptions` reactive so the pills track `VIZ_COLORS` — would replace three *stale but correct-looking* colours with three *live and identical grey* ones. The frozen snapshot at `basis-display.ts:4-6` is currently the only reason the basis pills, and the canvas, render distinguishable colours at all. **The repair order is forced: `cssVarToHex` must learn `oklch()`/`light-dark()` (or `resolveVizColors` must resolve through a computed style on a probe element) *before* anything is made reactive.**

**Falsifier, and why it fails.** *"`@property` registration makes `getPropertyValue` return a resolved `rgb()`."* Checked — glass-ui declares no colour `@property` (`property-regs.css` registers progress/phase/ripple/specular/glass-level/ui-scale only; `light-dark.css:52-56` says so explicitly). And even a registered `<color>` would serialise as `oklch(…)`, which still matches no branch. *"The tokens aren't loaded."* They are: `web/src/style.css:3` is `@import "@mkbabb/glass-ui/styles"`.

**Viz render path.** This is where the component touches canvas rendering, which the axis asks for explicitly. The same `basisDisplay[k].color` string is the canvas paint: `lib/canvas-drawing/labels.ts:30`+`:39` sets `ctx.fillStyle = … : cfg.color` for the basis labels, and `BasisCanvas.vue:251`+`:257` sets `ctx.strokeStyle = … : cfg.color` for the basis curves. So GallerySearchBar's pills and the 2D-canvas curve strokes are guaranteed to agree with each other (a real, if accidental, virtue) and are guaranteed to disagree with every `var(--viz-*)` CSS surface in dark mode. There is no WebGL on this path — `BasisCanvas` is 2D `CanvasRenderingContext2D` — so no context-loss or GL-resource class applies here.

### L-4 — The search input hand-rolls `v-model` without Vue's IME composition guards

**Severity MAJOR** · `GallerySearchBar.vue:48-54` (esp. `:50`, `:53`) · `@vue/runtime-dom` `runtime-dom.esm-bundler.js:1559`, `:1575-1599`, `:644-668`

The input is a manual `:value="searchQuery"` (`:50`) + `@input="emit(...)"` (`:53`) pair. That is a reimplementation of `v-model` that omits the half of `v-model` that exists specifically to survive IME composition. Proved against the installed runtime:

- `vModelText.created` registers `compositionstart`/`compositionend` (`:1588-1590`, helper at `:1559`) and its input handler opens with `if (e.target.composing) return;` (`:1580`) — no model write mid-composition.
- `vModelText.beforeUpdate` opens with `if (el.composing) return;` (`:1599`) — **no DOM write-back mid-composition**.
- The plain-prop path has neither guard: `patchDOMProp` (`:644-668`) reaches the `key === "value"` branch (`:652`) and assigns `el.value = newValue` whenever `oldValue !== newValue` (`:660-661`), unconditionally.

So for a CJK/IME user: (a) every composition keystroke emits partial romaji/pinyin up into the store, and (b) the value round-trips back and is written into the element while the composition buffer is live. Composition-buffer corruption on write-back is the exact failure `:1599` exists to prevent.

**Falsifier, and why it fails.** *"Vue guards all `value` patches."* It does not — the guard lives in the `vModelText` directive, not in `patchDOMProp`; the two code paths are cited above and differ. *"The parent debounces so nothing round-trips fast."* The debounce (`GalleryView.vue:97`) delays the *refetch*, not the prop: `gallery.searchQuery = $event` at `GalleryView.vue:234` is synchronous, so the `:value` patch lands on the very next flush.

**Live-observable component marked** `UNPROVEN-NEEDS-LIVE` **for SS-13**: the visible glyph corruption requires an IME session. The missing guard, and the asymmetry between the two Vue code paths, are statically proved above and need no browser.

### L-5 — `searchTimer` is never cleared on unmount, and the debounce is decolocated from the input that produces the events

**Severity MAJOR** · `GalleryView.vue:94-98`, `:228-229`

```js
let searchTimer: ReturnType<typeof setTimeout> | null = null;
watch(() => gallery.searchQuery, () => {
    if (searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(() => gallery.resetAndFetch(), 300);
});
```

There is no `onUnmounted`/`onScopeDispose` clearing `searchTimer` anywhere in the file. Vue stops the *watcher* on unmount; it does not cancel a `setTimeout` the watcher already scheduled. So a keystroke followed within 300 ms by a route change away from `/gallery` fires `gallery.resetAndFetch()` **after the view is gone** — a network request plus a store mutation against a dead surface, and (given L-1) one that cannot even have been meaningful. The Pinia store outlives the component, so the wiped `entries` persist into the next mount.

Reachability is not theoretical: `GallerySearchBar` is itself behind `v-if="activeTab === 'gallery'"` (`GalleryView.vue:229`), so a tab switch mid-debounce leaves the same orphaned timer.

**Colocation (the second half of this finding).** The debounce for GallerySearchBar's input lives 130+ lines away, in a different file, in the parent. The component that owns the keystroke owns neither its rate-limiting nor its cancellation, and the parent that owns the timer has no lifecycle relationship to the input. Either the component debounces its own emit (and disposes its own timer), or the pair moves into a `useGallerySearch()` composable that owns both. The present split is precisely the arrangement in which a teardown gets forgotten — and it was.

**Falsifier, and why it fails.** *"The watcher's own teardown cancels it."* Vue's watcher stop removes the effect; it does not reach into a pending macrotask. The idiomatic cancellation (`onCleanup`, `onScopeDispose`, or `useDebounceFn` from the already-installed `@vueuse/core ^14.3.0`) is used at none of these lines. *"`@vueuse/core` isn't available."* It is — `web/package.json` dependencies.

---

## MINOR

### L-6 — `:class="{ active: … }"` is a dead binding; nothing in the tree matches `.active` here

**Severity MINOR** · `GallerySearchBar.vue:119` vs `:218`

Line 119 binds `active`. The scoped stylesheet contains no `.active` rule — the live hook is `[aria-pressed="true"]` (`:218-222`), driven by the *separate* binding at `:120`. So `:119` is inert markup. Its sibling at `:69` gets this right (`'is-active'`, matched by `.filter-toggle.is-active` at `:159`), which is what makes `:119` a slip rather than a convention.

**Falsifier, checked and survived.** A global `.active` could match a scoped element (scoping constrains the *selector's* origin, not the class's visibility). Grep of `web/src/style.css` + `web/src/styles/` → no `.active` rule. Grep of glass-ui's shipped CSS → every `.active` occurrence is compounded under a dock-control ancestor (`dock-controls/triggers.css:99-110` under `.dock-select-trigger`/`.dock-dropdown-trigger`; `dock-controls/icon-button.css:109`; `dock-controls/tab-button.css:89`; `glass/material.css:231` under `.dock-icon-button`). `.basis-pill-btn` is a plain `<Button variant="outline" size="sm">` and carries none of those ancestors. The binding cannot match.

### L-7 — `@click.stop` guards against an outside-click dismisser that does not exist; the drawer has no dismiss affordance

**Severity MINOR** · `GallerySearchBar.vue:71`, `:78-79`

`@click.stop` on the filter toggle stops propagation — the canonical shape for coexisting with a document-level outside-click closer. No such listener exists: the component registers zero lifecycle hooks and zero document listeners (whole-file read). So `.stop` is dead, *and* it is dead in a way that documents a missing feature: the drawer (`:78-130`) can only be closed by re-clicking the same toggle. No Escape handler, no outside-click, no focus return.

**Corpus fold — this is a re-finding, and the earlier ruling stands.** fourier's own M-deep-audit already booked it: `docs/audits/runs/2026-06-16-M-deep-audit/findings-index.txt:395` — *"[medium] D4-10 MobileFloatingToc dropdown + GallerySearchBar filter panel: bespoke absolutely-positioned overlays vs. native popover (wave:M.W3)."* It is still bespoke and still absolutely positioned (`:165-173`) two months on. I do not re-derive the remedy; I record that D4-10 is **unaddressed in the live tree** and that the orphaned `.stop` is fresh evidence the dismisser was intended and never landed.

**Falsifier, and why it fails.** *"`Transition` or glass-ui adds a dismisser."* `Transition` is presence-only. The drawer is a bare `<div>` (`:79-80`), not a glass-ui `Popover`/`DropdownMenu` — no vendor dismiss behaviour is inherited. *"The `.stop` prevents a parent handler."* No ancestor in `GalleryView.vue:220-239` binds `@click`.

### L-8 — `$event as any` (×2) discards a genuine type incompatibility, and composes with the placeholder-less `SelectValue` into a permanently blank trigger

**Severity MINOR** · `GallerySearchBar.vue:84`, `:99`, `:87`, `:102`

glass-ui's `Select` emits `"update:modelValue": (value: AcceptableValue) => any` (`glass-ui/dist/components/ui/select/Select.vue.d.ts`), and `AcceptableValue = string | number | bigint | Record<string, any> | null` (`reka-ui/dist/index3.d.cts:231`). The component's own emits are the 4- and 3-member string-literal unions (`:23-25`). Those types are genuinely incompatible; `as any` (`:84`, `:99`) does not narrow the mismatch, it deletes it — under `"strict": true` (`web/tsconfig.json`), the one check that would have caught a future reka widening.

It composes badly with the placeholder-less triggers. `reka-ui/dist/Select/SelectValue.js:41-43`: `slotText = selectedLabel.length ? join(", ") : props.placeholder`, and `placeholder` defaults to `""` (`:11-15`). Both call sites are bare `<SelectValue />` (`:87`, `:102`). So **any** model value that matches no `SelectItem` renders a *permanently empty* trigger with no fallback text and no error. `as any` is exactly the hole such a value would come through.

**Honest severity ceiling.** I checked whether `null` is currently reachable: `SelectItem.handleSelect` calls `rootContext.onValueChange(props.value)` (`reka-ui/dist/Select/SelectItem.js:66`) and `handleValueChange` assigns `modelValue.value = value` (`SelectRoot.js:105-106`) — always one of the literal `value=` strings in single-select mode. **`null` is not emitted today.** This is a latent hole plus a missing fallback, not a live crash, and is graded MINOR accordingly. The cheap correct forms are a narrowing cast (`$event as GalleryTierFilter`) or a type-guard, plus `placeholder="All tiers"` / `placeholder="Newest"`.

### L-9 — `basisFilter: string` is wider than its domain

**Severity MINOR** · `GallerySearchBar.vue:18`, `:25`, `:40`, `:119-122` · `stores/gallery.ts:38`

Its three siblings are exact string-literal unions (`:16-17`). `basisFilter` is bare `string`, though its domain is exactly `keyof typeof basisDisplay | ""` — `"fourier" | "chebyshev" | "legendre" | ""` (`basis-display.ts:3-7`). Every comparison (`:40`, `:119`, `:120`, `:122`) is therefore unchecked: a typo'd key type-checks and silently deactivates the pill row. The store repeats the weakening (`ref("")` → `Ref<string>`, `stores/gallery.ts:38`). Note this is a *narrowing* opportunity that costs nothing: the key set is a closed literal already.

**Falsifier, and why it fails.** *"The basis set is open/extensible, so `string` is right."* `basisDisplay` is a closed 3-entry literal; every consumer (`labels.ts:30`, `BasisCanvas.vue:251`, `GalleryCard.vue:40`, `GalleryCardModal.vue:45`, `GalleryDraftsSection.vue:44`) does a fallible lookup against exactly those three. `Record<string, …>` at `basis-display.ts:3` is itself the upstream over-widening.

### L-10 — `basisOptions` is an identity re-wrap duplicating an idiom a sibling does directly

**Severity MINOR** · `GallerySearchBar.vue:30-37` vs `BasisSelector.vue:139`

`Object.entries(basisDisplay).map(([key, cfg]) => ({ key, icon: cfg.icon, label: cfg.label, color: cfg.color }))` reproduces the source shape field-for-field, adding nothing but a `key` that `Object.entries` already yields. `BasisSelector.vue:139` iterates the same object with the one-line idiom the template supports natively — `v-for="(info, key) in basisDisplay"` — and reads `info.color` / `info.icon` directly (`:141-145`). Two components, one data source, two shapes. The wrapper's only effect is the false impression of reactivity flagged in L-2.

### L-11 — The e2e coverage for this component is vacuous by construction

**Severity MINOR** · `web/e2e/gallery.spec.ts:43-62`, `:19-22`

The one test named for this component — `"search bar filter drawer toggles"` (`:43`) — wraps **every assertion it owns** in a truthiness guard:

```ts
const filterToggle = page.locator(".filter-toggle");   // :57
if (await filterToggle.isVisible()) {                  // :58
    await filterToggle.click();
    const filterPanel = page.locator(".filter-panel");
    await expect(filterPanel).toBeVisible({ timeout: 3_000 });  // :63
}
```

If `.filter-toggle` ever stops rendering — the exact regression the test exists to catch — the block is skipped and the test **passes with zero assertions executed**. It is also preceded by a dead `.glass-dock` expand branch (`:47-51`); `.glass-dock` appears nowhere in `web/src` (grep: no hits), so that branch can never run and its stale comment misdescribes the component.

More consequentially: **no test in the suite asserts that any control changes any result.** Nothing types into the input and checks the grid; nothing clicks a basis pill and checks the entries. That is precisely why L-1 could ship and stay shipped — the suite tests that a drawer opens, never that a filter filters.

**Falsifier, and why it fails.** *"Test `:4` covers the search bar."* It asserts `expect(glassDock.or(searchInput)).toBeVisible()` (`:19-22`). On `/gallery` the `.or()` does collapse to the real input (`.glass-dock` never renders), so that assertion is sound — which is why L-11 is scoped to `:43-62` and to the absence of behavioural coverage, not to `:4`.

### L-12 — Four hand-written prop/emit pairs where `defineModel` collapses them

**Severity MINOR** · `GallerySearchBar.vue:14-26`

Eight declarations (four props, four `update:*` emits) encode four two-way bindings, with the two literal unions written out twice each (`:16`/`:23-24` vs `:17`/`:24`) — a duplication that can drift. `vue ^3.5.38` (`web/package.json`) has had `defineModel` stable since 3.4; it collapses each pair to one line and derives the emit type from the model type, removing the drift surface. This is a house-idiom gap, not a bug.

---

## INFO

### L-13 — `hasActiveFilters` ignores `searchQuery`

**Severity INFO** · `GallerySearchBar.vue:39-41`, `:69-70`

`tierFilter !== "all" || sort !== "newest" || basisFilter !== ""` — an active search query does not count as an active filter, so the toggle's affordance under-reports state. Defensible (search has its own visible `X` at `:55-63`); recorded because the predicate's name claims more than it delivers, and a reader will assume otherwise.

### L-14 — The emitted query is neither trimmed nor normalised

**Severity INFO** · `GallerySearchBar.vue:53`

`($event.target as HTMLInputElement).value` goes to the store verbatim. Leading/trailing whitespace becomes a distinct query and a distinct debounce fire. Currently costless because of L-1; it becomes a real cache-key and request-count defect the moment L-1 is wired.

---

## Candidate findings KILLED by their own falsifiers

Recorded in full so the next auditor does not re-derive them. L-18 runs both ways; so does the burden of proof.

| # | The tempting claim | Why it is FALSE |
| --- | --- | --- |
| **F-1** | `z-index: var(--z-bar)` (`:169`) references an undefined token — no `--z-*` definition exists anywhere in `web/src`, so the declaration is invalid-at-computed-value-time and the drawer does not stack. | **Falsified.** glass-ui defines the whole ladder: `tokens/scheme-motion.css:333-350`, with `--z-bar: 30` at `:337`. It is imported via `web/src/style.css:3`. The drawer stacks at 30; the portalled `SelectContent` sits at `z-popover` (130) above it. Correct by construction. Four sibling files use the same token (`PaperSearch.vue:108`/`:195`, `EquationView.vue:396`/`:433`) — a consistent house convention, not an orphan. |
| **F-2** | `glass-resting` (`:80`) is an undefined class. | **Falsified.** Defined by glass-ui: `styles/glass/material.css:39`, `:68`, `:154`, plus `glass-specular-track.css:38`, `:59`. |
| **F-3** | Both `<SelectValue />` (`:87`, `:102`) render **blank** until the user first opens the dropdown, because `selectedLabel` reads `rootContext.optionsSet` (`SelectValue.js:33-40`), which is populated only by `SelectItemText`'s `onMounted → onOptionAdd` (`SelectItemText.js:36-41`) and emptied by its `onUnmounted → onOptionRemove` (`:42-44`); and `SelectContent` is presence-gated on `present = props.forceMount \|\| rootContext.open.value` (`SelectContent.js:126`) with `forceMount` defaulting false in glass-ui's wrapper (`SelectScrollDownButton-C1jb3b3K.js:97`) and unset by this component. | **Falsified — and this is the single most convincing false positive in the component.** `reka-ui/dist/Select/SelectContent.js:159` carries a **fragment fallback**: when `present` is false it renders the default slot through `<Teleport to="fragment">` inside `SelectProvider`, where `fragment` is a `DocumentFragment` assigned in `onMounted` (`:121-124`). The items therefore *do* mount while closed, into a detached fragment, and *do* register via `onOptionAdd`. The genuine residue is a **one-tick** blank (first paint has `fragment === undefined` → comment node; the next flush mounts and registers), fully covered by the 0.3 s enter transition at `:186-190`. Not a defect. The *related* claim that does survive — a value matching no `SelectItem` renders permanently blank because `placeholder` defaults to `""` — is filed at L-8 with its reachability honestly capped. |
| **F-4** | The **R5-7** native-template-loop invisibility class applies here (intake `lane-fourier-r3-r6.md:125`: *"template-loop evidence keyed to component callsites is blind to native HTML element loops"*, cured by R6's `NATIVE_TEMPLATE_LOOP` family, `:139`). | **Not applicable — proved, not assumed.** The component contains exactly **one** `v-for`, at `:114`, and it is on `<Button>` — a *component* callsite, precisely the shape R5's deriver already counts (contrast the populated `instance.loop.presets` leaf keyed `callsite:…FunctionInput.vue:157:Tooltip:…`, cited at intake `:125`). There is no native-element loop in this file, so the `PaperSidebar.vue:65/87/105` blind spot cannot bite. **One adjacent caution for F.W4**, offered rather than claimed: the loop's denominator `basisOptions` is derived from a *non-reactive module object* (L-2), so an instance-count derivation here will record a permanently static 3 and can never witness drift — an invisibility of a different kind (frozen denominator, not uncounted node) that the R6 cure does not address. |

---

## Superlatives (L-18, the other direction)

Each is stated with the same evidentiary burden as a defect, and each was tested against a falsifier.

### S-1 — An exemplary teardown surface: there is nothing to leak

`GallerySearchBar.vue` holds exactly one piece of state (`showFilters`, `:28`) and — across the whole 223-line file — **zero** lifecycle hooks, zero `watch`, zero timers/intervals, zero `addEventListener`, zero `MutationObserver`/`ResizeObserver`, zero `requestAnimationFrame`, zero async work, zero refs to DOM nodes. Unmount is a no-op by construction; there is no disposal to forget. This is the correct shape for a controlled input, and it is exactly the discipline the *parent* failed to keep (L-5) — the contrast is the proof that the shape is deliberate, not accidental. **Falsifier tested:** the imports (`:2-12`) pull only `ref`/`computed`, three lucide icons, `basisDisplay`, and glass-ui components — no composable that could register a hidden effect on the component's behalf.

### S-2 — Goldilocks module size and a clean single responsibility

223 lines: ~29 of script, ~89 of template, ~89 of scoped style. One job — render four controls and emit their changes — with no store import, no router import, no API import, no async, and no god-module accretion. Corroborated by the census inventory row `formation/fourier/lane-frontend.md:106` (*"223 | Search + filter `Select`s"*). Set against its own directory — `AdminUserList.vue` at 19.8 KB, `GalleryCardModal.vue` at 11.3 KB — this is the sibling that stayed the right size. It is also, notably, *purely presentational*: every piece of policy lives in the parent, which is why L-1's remedy is a wiring decision and touches almost nothing here.

### S-3 — Textbook glass-ui-first consumption

Every control is a vendor primitive (`Button` `:5`, the `Select` cohort `:6-12`); nothing is re-implemented locally. The one local style hook is disciplined to the letter: `.basis-pill-btn` (`:209-222`) projects a **single CSS custom property** (`--pill-c`, set per-instance at `:121`) onto the vendor chassis rather than restyling it, and the comment at `:205-208` names both what the vendor still owns (*"ships the focus-ring + press-scale + rounded-pill chassis"*) and the sibling recipe it deliberately matches (*"matching BasisSelector's `.basis-toggle` recipe"* — live at `BasisSelector.vue:141-148`). That is the documented `feedback_glass_ui_first_class` posture executed correctly, with the cross-reference a future editor needs. Corroborated as adopted by fourier's own `docs/audits/runs/2026-05-26-B-audit-wave-1/L4-glass-ui-usage.md:45` (Select cohort, root barrel, **ADOPTED**).

### S-4 — The drawer transition is the canonical form, not the lazy one

`:186-203` transitions **named properties** (`opacity`, `transform`) — never `transition: all` — at asymmetric durations with the canonical easing tokens (`--ease-apple-spring` entering at 0.3 s, `--ease-standard` leaving at 0.2 s), and the comment cites the wave that ratified the idiom (`A.W3.d`). Enter-from and leave-to are distinct (`:196-203`), which is the detail most implementations skip. Compositor-only properties throughout: no layout-thrashing property is animated.

---

## Ranked disposition

| Rank | Row | Severity | What it needs |
| --- | --- | --- | --- |
| 1 | **L-1** | BLOCKER | Owner ruling: wire `q`/`tier`/`basis` through client + router (with cursor-invalidation semantics), or delete the three dead controls. Not a patch. |
| 2 | **L-3** | MAJOR | Teach `cssVarToHex` `oklch()`/`light-dark()` — or resolve via computed style on a probe element. **Must land before L-2.** |
| 3 | **L-2** | MAJOR | Only after L-3: make `basisDisplay.color` a getter/`computed` so the pills track the theme. |
| 4 | **L-4** | MAJOR | `v-model` (with `.lazy`/`useDebounceFn`) instead of the hand-rolled `:value`+`@input`. |
| 5 | **L-5** | MAJOR | Dispose the timer (`onScopeDispose`/`useDebounceFn`) and colocate the debounce with the input. |
| 6–12 | L-6…L-12 | MINOR | Mechanical; L-11 (behavioural coverage) should land *with* L-1 so the fix is provable. |
| 13–14 | L-13, L-14 | INFO | Fold into the L-1 wiring. |

**Marked `UNPROVEN-NEEDS-LIVE` for SS-13:** only L-4's *visible* IME symptom. Every other row above is source-derived and reproducible from the file:line citations without a browser.

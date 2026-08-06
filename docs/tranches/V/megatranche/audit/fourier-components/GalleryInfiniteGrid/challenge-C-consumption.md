claude-opus-5[1m]

# CHALLENGE · `GalleryInfiniteGrid.vue` · axis C (CONSUMPTION)

**Target** `fourier-analysis/web/src/components/visualization/gallery/GalleryInfiniteGrid.vue` (54 lines)
**Axis** how this component consumes value.js 0.13 · keyframes 4.3 · glass-ui ^4.0.0 · the fourier API operation surface; props/emits contract quality; integration seams.
**Posture** DEFECTIVE-until-proven. Static + source-derived only (no browser tooling); live-only claims tagged `UNPROVEN-NEEDS-LIVE` for SS-13.
**Read-set (read-only, whole)** the target; `@/lib/types` (`Visualization`, `GalleryTier`); `@mkbabb/glass-ui/infinite-scroll` (`dist/infinite-scroll.js`, `dist/infinite-scroll.d.ts`, `dist/components/custom/infinite-scroll/*.d.ts`, exports map, v4.0.0); `./GalleryCard.vue` and its transitive imports (`@/lib/api` `thumbnailUrl`, `../lib/basis-display`, `@/lib/colors`, glass-ui `button`/`badge`/barrel `Checkbox`, `lucide-vue-next`); the sole consumer `GalleryView.vue`; the sole data source `stores/gallery.ts`; `lib/scheduler.ts`; `lib/api.ts` (abort registry, `listVisualizations`); `web/package.json`; `web/src/style.css`; glass-ui token CSS; `api/routers/visualizations.py` + `api/routers/gallery.py` route tables; `web/e2e/gallery.spec.ts`.

**Corpus folded (not re-invented)**
- `formation/fourier/lane-frontend.md:113` (the census row: "`InfiniteScroll` wrapper", 54 lines), `:223`, `:245`, `:346` — inventory only; the lane never opened the primitive. Extended here.
- `formation/fourier/lane-frontend.md:568` — **CONTRADICTED** below (C-11).
- `formation/fourier/lane-frontend.md:554` — the `resolveVizColors()` boot/MutationObserver claim; **narrowed** below (C-5: it never reaches this component).
- `formation/fourier/CENSUS-2026-08-03.md:174` ("117-line hand-rolled regex file … no `oklch()` arm") and `:188` (F.W2 scope) — **folded and escalated** (C-6): the missing arm is not latent debt, the tokens it is pointed at are oklch *today*.
- `audit/codex-provenance/intakes/lane-fourier-r3-r6.md:142` (**R6-8**, ADOPT-AS-FACT: operation↔client leaves are structurally non-isolable because the operation record embeds derived client back-references) — **inverted here** (C-3): this seam has a client leaf with *no operation at all*, the degenerate case R6-8's contract lesson does not cover.

Verdict counts: **18 defects (2 BLOCKER · 7 MAJOR · 7 MINOR · 2 INFO) · 5 superlatives.**

---

## §0 — What the component actually is

54 lines, `<script setup>`, zero local state, zero store import, zero lifecycle. It declares 6 props and 6 emits, renders a count label, delegates paging to `glass-ui/infinite-scroll`, and fans `entries` into `GalleryCard` while forwarding five child emits verbatim. It is a **pure adapter over one library primitive**. Its entire consumption surface is therefore: (a) the `InfiniteScroll` contract, (b) the `Visualization` contract, (c) the emit contract it re-publishes upward. Two of those three are broken, and the third lies about its own vocabulary.

Its whole render, from the compiler (`@vue/compiler-sfc` `compileTemplate` on the SFC — reproduce with the one-liner in C-9):

```
onLoadMore: _cache[4] || (_cache[4] = $event => (_ctx.emit('load-more')))
…
onClick: $event => (_ctx.emit('card-click', entry)),          // NOT cached
onLike: _cache[0] || …, onSetTier: _cache[1] || …,            // cached
…}, null, 8 /* PROPS */, ["entry","admin-mode","liked-hashes","selected","onClick"])
```

---

## §1 — BLOCKERS

### C-1 · BLOCKER · the paging primitive auto-drains the entire corpus; the consumer adds no guard
**Provenance** `GalleryInfiniteGrid.vue:28` (`:has-more="hasMore" :is-loading="loading" @load-more="emit('load-more')"`) → `node_modules/@mkbabb/glass-ui/dist/infinite-scroll.js:20-22, 25-26` → `GalleryView.vue:296` (`@load-more="gallery.fetchNextPage()"`) → `stores/gallery.ts:62`.

glass-ui's `useInfiniteScroll` installs a second, non-observational trigger next to the IntersectionObserver:

```js
function h() {                                   // dist/infinite-scroll.js:20-22  — exported as `check`
    s.value && d() && a();                       // s = sentinelRef, d() = hasMore && !isLoading, a() = onLoadMore
}
…
u(() => l(r), (e) => {                           // :25-26 — watch(isLoading)
    !e && s.value && requestAnimationFrame(h);   // on every load COMPLETION, re-fire
});
```

`h()` (`check`) never consults intersection, never reads a rect, never re-queries the observer. It fires `onLoadMore` on the sole condition that a sentinel exists and `hasMore` is true. Because the *consumer* wires `load-more` straight into `fetchNextPage()`, and `fetchNextPage` sets `loadingMore = true → false` around each round trip (`gallery.ts:63, 79`), and the grid's `loading` prop is `gallery.loading || gallery.loadingMore` (`GalleryView.vue:292`), **each completed page synchronously arms the next one**. The loop terminates only when the server returns `has_more: false`.

Net: one page-1 fetch ⇒ the client drains the whole public gallery at 20 rows per round trip (`gallery.ts:66` `limit: 20`), with no scroll input, no viewport gate, and no cap. Every fetched row is materialised as a mounted `GalleryCard` in this component's `v-for` (`:31`).

**The consumer's own contribution to the defect:** the grid publishes `hasMore: boolean` (`:9`) and forwards `load-more` with *no debounce, no page cap, no in-view assertion, and no `threshold` tuning* (`:28` passes neither). A 54-line adapter whose single job is to consume a paging primitive is exactly the layer that must bound it. It does not. There is also no `error` prop in the contract (`:6-13`), so a failing endpoint — `fetchNextPage` swallows non-abort errors into a toast and leaves `hasMore` true (`gallery.ts:76-78`) — converts the cascade into an unbounded retry loop against a failing API.

**Falsifier** Any one of these kills the finding: (i) `check()` consults intersection state — it does not, `dist/infinite-scroll.js:20-22` is the whole body; (ii) the store's guard stops re-entry — `gallery.ts:62` is `if (!hasMore.value || loadingMore.value) return`, a *concurrency* guard that is false by construction at the moment `check` runs (rAF fires after `loadingMore` is already back to `false`); (iii) the grid caps pages — it holds no state at all; (iv) `has_more` is falsy after page 1 — then the defect is invisible on a small corpus and re-appears at scale, which is the same defect.
**Live confirmation available** count `GET /api/visualizations` requests on `/gallery` load — expect ⌈N/20⌉ back-to-back, not 1. `UNPROVEN-NEEDS-LIVE` for the request count only; the code path above is fully static.

### C-2 (nested, MAJOR — ignition for C-1) · the observer root is a non-scrolling element, so the sentinel is intersecting from mount
`dist/infinite-scroll.js:12-15` builds `new IntersectionObserver(f, { root: e.scrollContainer?.value ?? null, … })`, and `scrollContainer` is the component's **own root `<div>`** (`dist/infinite-scroll.js` setup: `h = o(null)` bound `ref_key:"scrollContainer"` on the root element). The consumer renders that root inside `<div class="flex flex-col gap-2 px-4">` (`GalleryInfiniteGrid.vue:26`) — no `overflow`, no height constraint; the page scrolls, not the container. Per the IntersectionObserver spec, when `root` is an element the root intersection rectangle is that element's content box, clipped only by ancestors **between target and root** — the viewport does not clip. The sentinel (`class="h-px w-full"`, rendered as the last child of that same root) is therefore inside the root rect unconditionally, i.e. `isIntersecting: true` at `observe()` time regardless of scroll position.
**Falsifier** if the root were a scroll container (`overflow-y:auto` + bounded height) the geometry would be correct — grep the consumer chain: neither `GalleryInfiniteGrid.vue:26` nor `GalleryView.vue:288-301` establishes overflow. Alternatively, if the UA clipped the element root by the viewport, ignition would require a real scroll — `UNPROVEN-NEEDS-LIVE`. Either way C-1 stands: one user scroll to the bottom is sufficient ignition.

### C-3 · BLOCKER · the `like` emit terminates in nothing — no operation exists on the 45-operation surface
**Provenance** `GalleryInfiniteGrid.vue:18` (`like: [hash: string]`) → `:38` (`@like="emit('like', $event)"`) → `GalleryView.vue:124-130` (`handleLike`) → `stores/gallery.ts:180-190` → `api/routers/visualizations.py` route table.

The visualization router exposes exactly 13 routes — `POST ""`, `GET /{slug}`, `GET ""`, `PATCH /{slug}`, `DELETE /{slug}`, `POST /{slug}/restore`, `POST /{slug}/remix`, `POST /{slug}/{publish,unpublish}`, `GET /{slug}/{forks,provenance,diff,versions}` (`visualizations.py:164, 244, 287, 350, 400, 430, 488, 669, 675, 686, 733, 799, 860`). **There is no like route.** `web/src/lib/api.ts` contains no like client either (the only `like` token in 672 lines is the word "Like" in a doc comment at `:228`). The store says so in its own prose and then ships the consequence:

```ts
// gallery.ts:181-189
// … (no dedicated toggle endpoint under the CRUD shape — optimistic local bump).
const liked = true;                                     // never false
const likes = (entries.value[idx].likes ?? 0) + 1;
entries.value[idx] = { ...entries.value[idx], likes };
```

Consequences, all statically provable:
1. `handleLike` (`GalleryView.vue:128`) branches on `result.liked`, which is the literal `true` — **un-like is unreachable**; the heart is a one-way latch.
2. Nothing is persisted. The server's `likes` column is real and read back (`visualizations.py` list projection; `GalleryCard.vue` renders `entry.likes`), and the DB even carries a `liked_ips` set (`api/routers/gallery.py:34, 58`) — a vestige of an operation that no longer exists — so the counter *visibly reverts* on the next `resetAndFetch()`.
3. `GalleryCard.vue:141` renders `:aria-pressed="isLiked"` on the button. An ARIA toggle state that never persists and cannot be un-set is an accessibility falsehood, not merely a dead feature.

**Relation to R6-8** (`intakes/lane-fourier-r3-r6.md:142`, ADOPT-AS-FACT): R6-8 established that an operation record embedding derived client back-references makes the two leaves non-isolable. This seam is the *degenerate* case R6-8's remedy does not address — `client:like` exists with **no** operation counterpart, so the client↔operation join is not merely entangled, it is empty. Carry to **F.W5**: the shared-provenance contract needs an explicit *orphan-client* class, or a conformance gate that fails when a published emit contract has no reachable operation.
**Falsifier** produce a like route (any method) in `api/routers/` or a like client in `web/src/lib/api.ts`. `grep -rn "like" api/routers/*.py` returns only `liked_ips` projections and admin aggregation (`admin.py:135-155`).

---

## §2 — MAJOR

### C-4 · MAJOR · `set-tier` / `delete` destroy the loaded window, and (with C-1) re-drain the corpus
`GalleryInfiniteGrid.vue:39-40` forwards `set-tier` and `delete` upward; `GalleryView.vue:133, 139` route them to `gallery.setTier` / `gallery.deleteEntry`, both of which end in `await resetAndFetch()` (`gallery.ts:138, 150`). `resetAndFetch` clears `entries`, nulls the cursor, and re-fetches page 1 (`gallery.ts:84-89`). An admin who has accumulated the corpus (which, per C-1, happens automatically) and toggles one card's tier loses the entire window and snaps to 20 rows — and because the grid stays mounted with `hasMore` true, C-1's cascade immediately re-drains everything. Cost per tier click ≈ ⌈N/20⌉ round trips + a full unmount/remount of N cards.
**Falsifier** if `setTier` patched the row in place (`entries.value[idx] = {...}`, exactly the idiom the store already uses at `gallery.ts:186` and `:206`) the finding dies. It does not; both admin mutators take the full-reset path.

### C-5 · MAJOR · the basis-pill palette snapshots a `reactive` object at module-eval — theme reactivity is dead on arrival
**Provenance** `web/src/components/visualization/lib/basis-display.ts:3-7`, `web/src/lib/colors.ts:80-88`, `web/src/App.vue:11-13`.

`colors.ts:81` exports `VIZ_COLORS` as `reactive({...})` precisely so consumers stay live across the theme toggle (`App.vue:11` `resolveVizColors()` + `App.vue:13` a `MutationObserver` re-resolving on `.dark` flips). `basis-display.ts` then does:

```ts
export const basisDisplay: Record<string, {icon;label;color}> = {
    fourier:   { …, color: VIZ_COLORS.fourier },     // :4 — a plain read, at module evaluation
    chebyshev: { …, color: VIZ_COLORS.chebyshev },   // :5
    legendre:  { …, color: VIZ_COLORS.legendre },    // :6
};
```

This copies three strings out of the proxy once, into a plain frozen-in-practice object. `GalleryCard.vue:37-38, 44-48` reads `cfg.color` and projects it as `--pill-c` (`:120`), consumed by `.basis-tint` (`:238-242`). Therefore **every basis pill in every card this grid renders is painted with the hardcoded literals `#bf4040` / `#3d72b8` / `#9545b8`** (`colors.ts:82-84`) forever — the light/dark token values never arrive. This narrows `lane-frontend.md:554`'s claim ("Palette resolved once at app boot … re-resolved on `.dark` toggle"): the resolution runs, but the gallery is not downstream of it.
**Falsifier** make `basisDisplay` a `computed`/getter and the pills would track. Or show a re-read of `VIZ_COLORS` inside `GalleryCard`'s `basisLabels` computed — `GalleryCard.vue:36-51` reads only `basisDisplay[key]`, never `VIZ_COLORS`. (`GalleryCard.vue:8` imports `VIZ_COLORS` and **never uses it** — an unused import that is itself the fossil of the intended live read.)

### C-6 · MAJOR · `cssVarToHex` has no `oklch()` arm and the three basis tokens are oklch — the resolver yields `#888888`
**Provenance** `web/src/lib/colors.ts:23-58` vs `node_modules/@mkbabb/glass-ui/dist/styles/tokens/*.css`.

glass-ui 4.0.0 ships:

```css
--viz-fourier:   light-dark(oklch(0.579 0.201 30.4), oklch(0.693 0.151 28.1));
--viz-chebyshev: light-dark(oklch(0.484 0.163 265.5), oklch(0.718 0.107 268.4));
--viz-legendre:  light-dark(oklch(0.532 0.180 317.5), oklch(0.739 0.134 318.1));
```

`cssVarToHex` (`colors.ts:24-58`) matches exactly four shapes: leading `#`, `hsl(…)`, a bare Tailwind HSL triplet, `rgb(…)`. `oklch(…)` and `light-dark(…)` match none → `return "#888888"` (`:57`). These are **unregistered** custom properties (zero `@property` declarations for `--viz-*` anywhere in glass-ui's dist), so `getComputedStyle().getPropertyValue()` returns the token stream verbatim, not a resolved `rgb()` serialization. `resolveVizColors()` (`colors.ts:90-96`) therefore *overwrites* the three good literals with grey on the first mount.

Only `--viz-amber` / `--viz-green` survive, and only because they resolve through `var(--section-color-N)` into fourier's own `hsl()` overrides (`web/src/style.css:120, 125`) — i.e. the two tokens that work do so by accident of fourier having locally re-authored them for an unrelated axe-contrast carry.

**This folds and escalates `CENSUS-2026-08-03.md:174`** ("no `oklch()` arm"), which recorded the gap as a deletion target. The gap is *live*: the file's only three real consumers are pointed at oklch tokens. **F.W2's "delete the `colors.ts` hand-rolled arms" is a bug fix, not a hygiene item.**

**Cross-cutting note (state it precisely):** C-5 currently *masks* C-6 for this component — the pills use the module-eval snapshot, so they render the pre-`resolveVizColors` literals rather than grey. Two defects cancelling. Fixing C-5 alone (the obvious "make it reactive" repair) turns every basis pill grey. Fix C-6 first, or fix both in one change.
**Falsifier** register `--viz-*` with `@property syntax:"<color>"` (then `getPropertyValue` serialises resolved) — `grep -rn "@property" node_modules/@mkbabb/glass-ui/dist/styles/tokens/` returns zero `--viz-*` registrations. Or point `resolveVizColors` at a token that is not oklch — the three basis tokens are the ones `basis-display.ts` consumes.

### C-7 · MAJOR · the entire props/emits vocabulary says `hash` and carries `slug`
**Provenance** `GalleryInfiniteGrid.vue:11, 12, 18, 20, 21` vs `:32, 36` and `types.ts:207-213`.

The contract declares `likedHashes: Set<string>`, `selectedHashes?: Set<string>`, `like: [hash: string]`, `delete: [hash: string]`, `toggle-select: [hash: string, checked]`. Every value flowing through them is `entry.slug` — the grid keys on `entry.slug` (`:32`), tests membership with `selectedHashes?.has(entry.slug)` (`:36`), and `GalleryCard.vue:34, 96, 143, 155, 165, 174` emits `entry.slug` into every `hash`-named payload. `types.ts:212-213` is explicit that this is a category error:

```ts
content_hash: string;  // dedup key, never identity (§1)
```

and the store spends three comment blocks correcting the naming it inherited (`gallery.ts:14-19, 21-24, 132-133, 144-147`). Because both `slug` and `content_hash` are bare `string`, **the type system cannot catch a future crossing** — someone wiring `content_hash` into `likedHashes` gets a clean `vue-tsc` and a silently-wrong gallery. This is a live, uncorrected mis-naming across a 6-member public contract, not cosmetics.
**Falsifier** show one call site where a `hash`-named parameter receives an actual hash. `grep -n "Hashes\|hash" GalleryView.vue` → `likedHashes`/`selectedHashes`/`pendingBatch.hashes`, all populated from `entry.slug`; `askBatchGallery` (`GalleryView.vue:167`) forwards them to `api.batchGallery`, whose server side keys on slug.

### C-8 · MAJOR · both slot overrides re-implement glass-ui's own defaults *inside* glass-ui's wrappers
**Provenance** `GalleryInfiniteGrid.vue:44-51` vs `dist/infinite-scroll.js:35-40` and the render body.

The primitive already renders its own wrappers and its own defaults:

```js
var f = { key: 0, class: "flex justify-center py-4" },              // :35-37  loading wrapper
    p = { key: 1, class: "py-4 text-center text-sm text-muted-foreground" };  // :38-40  end wrapper
…
r.isLoading ? t("div", f, [ s(i.$slots,"loading", {}, () => [ /* default: */
    n("div",{class:"h-5 w-5 animate-spin rounded-pill border-2 border-muted-foreground border-t-transparent"}) ]) ])
  : r.hasMore ? … : t("div", p, [ s(i.$slots,"end") ])
```

The consumer's `#loading` (`:45-47`) is `<div class="flex justify-center py-4"><div class="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent"/></div>` — **byte-for-byte the library default** except `h-6 w-6` for `h-5 w-5` and `rounded-full` for `rounded-pill`. It lands *inside* `f`, so the layout is `div.flex.justify-center.py-4 > div.flex.justify-center.py-4 > spinner`: doubled block padding, doubled flex centring, and a hand-written `rounded-full` where the design system ships a `rounded-pill` **token**. Identical story for `#end` (`:50`): `p.py-4.text-xs` nested inside `div.py-4.text-sm` — doubled padding again plus an unexplained type-scale demotion.

This is the archetypal design-system consumption defect: the consumer overrode a slot to change nothing, and in doing so left the token system (`rounded-pill`), duplicated the chassis, and pinned itself to a private detail of the library's DOM. Deleting both `<template>` blocks (`:44-51`) yields a *better* result in 8 fewer lines.
**Falsifier** name one visual requirement the overrides satisfy that the defaults do not. `h-6` vs `h-5` (1.5rem vs 1.25rem) with no comment is not a requirement; and if it were, `threshold`-style props or a token override is the design-system-correct route.

### C-9 · MAJOR · the fan-out is O(N)-per-interaction by construction — and N is unbounded by C-1
**Provenance** compiled render (reproduce: `node -e "const{parse,compileTemplate}=require('@vue/compiler-sfc');const s=require('fs').readFileSync('src/components/visualization/gallery/GalleryInfiniteGrid.vue','utf8');console.log(compileTemplate({source:parse(s).descriptor.template.content,filename:'G.vue',id:'x'}).code)"` from `web/`).

Two facts from the compiler output:
1. `onClick: $event => (_ctx.emit('card-click', entry))` is **not** in the `_cache` array — it closes over the `v-for` scope variable `entry` — while `onLike`/`onSetTier`/`onDelete`/`onToggleSelect` are cached as `_cache[0..3]`. `"onClick"` therefore appears in the dynamic-props array `["entry","admin-mode","liked-hashes","selected","onClick"]`, so **no `GalleryCard` can ever bail out of a patch**: a fresh handler identity is manufactured for every card on every parent render.
2. `:liked-hashes` (`:35`) ships the whole `Set` to every card, and `GalleryView.vue:127-129` *replaces the Set by identity* on every like (`const s = new Set(...); likedHashes.value = s`). One like ⇒ prop change on all N cards ⇒ N re-renders ⇒ N `isLiked` computeds invalidated (`GalleryCard.vue:34`).

Neither is fatal at 20 cards. Both are fatal at the N that C-1 produces automatically. The fix is already written one line below: see C-10.
**Falsifier** if Vue cached the `onClick` inside `v-for` the first half dies — the compiler output above shows it does not. If `handleLike` mutated the Set in place rather than replacing it, the second half would still stand for the *added* member but not for all N — and `GalleryView.vue:127` demonstrably replaces.

---

## §3 — MINOR

### C-10 · MINOR · two opposite prop idioms on the same element
`:selected="selectedHashes?.has(entry.slug) ?? false"` (`:36`) narrows the set to a per-card boolean at the boundary — correct, patch-stable, and the exact remedy for C-9's second half. The line immediately above, `:liked-hashes="likedHashes"` (`:35`), ships the whole collection. Same element, same shape of data, opposite idioms, no comment. One of them is wrong and the file itself demonstrates which.
**Falsifier** a reason `liked` must be re-derivable inside the card — `GalleryCard.vue:34` derives exactly `props.likedHashes?.has(props.entry.slug)`, i.e. the identical expression, so `:liked="likedHashes.has(entry.slug)"` is behaviour-preserving.

### C-11 · MINOR · the `scheduler.yield` floor never yields on the gallery path — **CONTRADICTS `lane-frontend.md:568`**
`gallery.ts:66` requests `limit: 20`; `gallery.ts:70` accumulates via `processInChunks(fresh, …, { chunkSize: 24 })`; `scheduler.ts:47-52` yields only when `(i + 1) % chunkSize === 0 && i + 1 < items.length`. With `items.length ≤ 20 < 24` that predicate is **never true**: zero yields, ever, on the only path `scheduler.ts:14-19` names as its motivating consumer ("the genuine unbounded consumer is the gallery infinite-scroll accumulation"). The lane recorded this as "Good hygiene, correctly scoped" (`lane-frontend.md:568`). It is correctly *scoped* and **inert as configured** — a documented INP remedy that cannot fire.
**Falsifier** raise `limit` above 24 or lower `chunkSize` below the page size and the yield fires. Neither has been done; `limit: 20` is hardcoded at both call sites (`gallery.ts:66, 86`).
*(Second-order, stated without over-claiming: this inertness also collapses the interleaving window in which a concurrent `resetAndFetch` — triggered by the search debounce `GalleryView.vue:118` or the filter watch `:128` — could interleave with an in-flight page's pushes and produce duplicate `:key="entry.slug"` values in this grid. Since `listVisualizations` shares one abort key (`api.ts:411` + the per-key registry at `api.ts:54-59`), the reset also aborts the in-flight page. The duplicate-key exposure is therefore narrow but real; `UNPROVEN-NEEDS-LIVE`.)*

### C-12 · MINOR · the paging surface is silent to assistive technology
`:27` renders `{{ entries.length }} loaded` in a plain `<p>` — no `aria-live`, so the count that is this component's only progress signal never announces. `:45-47`'s spinner has no `role="status"`, no `aria-label`, no text alternative — an SR user gets nothing during a page load. The `grid` container (`:29`) carries no list semantics while its children are `role="button"` (`GalleryCard.vue:74`), so there is no group, no set size, no position-in-set. glass-ui does the right thing on its side (`aria-hidden="true"` on the sentinel, `dist/infinite-scroll.js` render) — the gap is entirely in the consumer's slots.
**Falsifier** an axe rule covering it — `web/e2e/gallery.spec.ts` never scrolls, never asserts on live regions, and `@axe-core/playwright` (`package.json:27`) is not invoked in that spec at all. SR announcement itself is `UNPROVEN-NEEDS-LIVE`; the absence of the attributes is static fact.

### C-13 · MINOR · the tier union is hand-inlined instead of imported
`:19` spells `tier: "featured" | "saved" | "normal"` literally; `types.ts:96` exports `export type GalleryTier = "featured" | "saved" | "normal"`. The same literal is re-spelled a third time in `GalleryCard.vue:29` and a fourth in `GalleryView.vue:132`. Four hand-copies of a domain union that has a name. Adding a tier changes the API and three of four call sites compile clean.
**Falsifier** an import cycle forbidding it — `GalleryInfiniteGrid.vue:2` already imports from `@/lib/types`, so the import is free.

### C-14 · MINOR · runtime imports resolved from `devDependencies`
`GalleryCard.vue:11-17` imports `lucide-vue-next` at runtime; `package.json:35` declares it under `devDependencies` (as it does `reka-ui:36`, `class-variance-authority`, `clsx`, `tailwind-merge`). A `npm ci --omit=dev` build of `web/` cannot resolve them. This is the grid's only child and therefore squarely inside its consumption closure.
**Falsifier** show a build path that never installs prod-only — the Dockerfile/CI path is the falsifier to run; the declaration itself is unambiguous.

### C-15 · MINOR · the count label is wrong and the `loading` prop is fused
`:27` prints `entries.length`, but `GalleryView.vue:291` passes `nonFeaturedEntries` (`GalleryView.vue:67-69`, `tier !== "featured"`). After a 20-row page containing 6 featured rows the label reads "14 loaded" for 20 fetched — the label describes the grid, the pagination it sits above describes the corpus. Separately, `:8 loading` is fed `gallery.loading || gallery.loadingMore` (`GalleryView.vue:292`), collapsing "first load, nothing on screen" and "appending page N" into one flag the component cannot distinguish — which is why a cold gallery renders "0 loaded" above a spinner.
**Falsifier** rename the label ("N shown") or pass `gallery.entries.length`; either resolves. Both are the consumer's call, and the contract as written offers no way to make it right.

### C-16 · MINOR · empty `#end` wrapper
`:50` guards the copy with `v-if="entries.length"`, but glass-ui unconditionally renders the wrapper `<div class="py-4 text-center text-sm text-muted-foreground">` whenever `!hasMore` (`dist/infinite-scroll.js:38-40`). An all-featured corpus (grid empty, `has_more:false`) leaves a bare 2rem gap. Guard belongs one level up, or the slot should be omitted.
**Falsifier** show the wrapper suppressed when the slot renders nothing — the compiled `t("div", p, [s(i.$slots,"end")])` is unconditional on slot content.

---

## §4 — INFO

### C-17 · INFO · `threshold` is never tuned
`InfiniteScroll` exposes `threshold?: number` (default 200px root-margin; `dist/infinite-scroll.d.ts` `__VLS_Props`). The grid never sets it (`:28`), while its own cells are `minmax(14rem, 1fr)` ≈ 224px tall plus `gap-3` — i.e. the prefetch runway is *less than one row*. Moot while C-1 stands; a real tuning gap once C-1 is fixed.
**Falsifier** a measured scroll-jank baseline showing 200px sufficient — none exists (`lane-frontend.md:568` defers all measurement to "W6").

### C-18 · INFO · value.js ^0.13.0 and keyframes ^4.3.0 are declared and wholly unconsumed in this subtree
`package.json:22-23` declare both. This component and its full transitive closure import **zero** symbols from either: the grid's only motion is Tailwind's `animate-spin` (`:46`), the card's only motion is three hand-written CSS transitions plus a locally-authored `@keyframes like-bounce` (`GalleryCard.vue:255-266`, flagged in its own comment as "a fourier-local keyframe (no glass-ui shadow); CONSTELLATION carry candidate"), and its only colour work is the broken hand-rolled path of C-5/C-6. The repo's five real value.js imports (`ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`, `easings.ts:9,16`) are all bare-specifier `@mkbabb/value.js` root imports — the F.W2 migration surface (`CENSUS:188`) — and none of them are here. So on the value.js axis this component's grade is not "misuses value.js" but "**has a colour problem value.js 0.13 already solves and does not reach for it**": `colors.ts`'s 117 hand-rolled lines exist to do what the dependency does correctly, including the oklch case that breaks C-6.
**Falsifier** a value.js/keyframes import anywhere in the closure — `grep -rn "@mkbabb/value.js\|keyframes.js" ` over the grid, the card, `basis-display.ts`, `colors.ts`, `api.ts`, `types.ts` returns nothing.

---

## §5 — SUPERLATIVES (L-18 both ways)

### S-1 · the identity choice is exactly right
`:key="entry.slug"` (`:32`) and `:selected="selectedHashes?.has(entry.slug)"` (`:36`) key on the converged single-slug identity mandated by CRUD-CONTRACT §1 and re-stated at `types.ts:207-213` — not on `content_hash` (explicitly "never identity"), not on array index. The store's `entrySlug()` helper (`gallery.ts:22-24`) agrees. Under C-1's unbounded accumulation, an index key would have been catastrophic; the slug key means list patches stay correct.
**Falsifier (runs both ways)** two rows sharing a slug would break it — the slug is the server-side unique handle, and the only duplication path is the narrow reset race in C-11's parenthetical.

### S-2 · granular subpath consumption
`:3` imports `{ InfiniteScroll } from "@mkbabb/glass-ui/infinite-scroll"` — the declared subpath export, not the barrel. This is the correct tree-shaking-safe idiom against glass-ui 4.0.0's ~40-entry export map. **Its own child regresses**: `GalleryCard.vue:5` pulls `Checkbox` from the barrel `"@mkbabb/glass-ui"` while importing `Button`/`Badge` from subpaths two lines away (`:3-4`) — and there is no `./checkbox` subpath in the export map, so the regression is the library's gap, not the card's laziness. Worth a glass-ui BH relay: **`Checkbox` has no granular export**, forcing a barrel import into an otherwise clean file.
**Falsifier** a `./checkbox` key in glass-ui's exports — enumerated: `./metric-badge`, `./button`, `./badge`; no checkbox.

### S-3 · a genuinely thin, store-agnostic adapter
No store import, no `onMounted`, no fetch, no local `ref`, no `watch`, 54 lines, one primitive. The component is trivially unit-testable and reusable against any list source. Contrast `GalleryView.vue` (300+ lines, five concerns). Every defect above lives at its *seams* — the primitive it trusts (C-1/C-2/C-8), the vocabulary it inherits (C-7), the colour path its child reaches through (C-5/C-6) — and almost none in its own body. That is the correct failure distribution for an adapter, and it means the repairs are cheap and local.
**Falsifier** hidden state — `defineProps`/`defineEmits` are the entire `<script setup>` (`:6-22`).

### S-4 · boundary narrowing, done once, correctly
`:36` collapses a `Set` to a boolean at the prop boundary rather than passing the collection. It is the right pattern, it is already in the file, and it is the one-line template for fixing C-9/C-10. Credit where due: whoever wrote line 36 knew the rule; whoever wrote line 35 did not.
**Falsifier** none — the compiled output shows `selected` as a plain boolean in the patch list.

### S-5 · fully typed tuple emits
`:15-22` uses the type-literal `defineEmits` form with named tuple payloads throughout, including the two-argument `set-tier` and `toggle-select` signatures — so the forwarding closures at `:39` and `:41` are checked end-to-end, and `GalleryCard.vue:26-32` declares a structurally compatible contract. Undercut only by C-13 (the inlined union) and hollowed by C-3 (a perfectly-typed emit with no operation behind it) — but the typing discipline itself is sound and above the repo median.
**Falsifier** an `any` or an untyped emit in the block — there is none.

---

## §6 — Repair order (dependency-correct)

1. **C-6 before C-5.** Fixing the snapshot without fixing the oklch arm turns every basis pill grey. Land the value.js-backed parse (F.W2) first, then make `basisDisplay` derived.
2. **C-1 + C-2 as one glass-ui carry.** `check()` must consult intersection (or be deleted); the observer root must be `null` unless a real scroll container is supplied. Relay to the glass-ui BH inbox per the standing formation invariant — this is a library defect with a fourier ignition site, and every other `InfiniteScroll` consumer in the constellation inherits it.
3. **C-3 to F.W5** as the orphan-client class alongside R6-8's entangled-leaf class; until an operation exists, the honest local move is to remove the heart's `aria-pressed` (`GalleryCard.vue:141`) rather than ship a lying toggle.
4. **C-8, C-10, C-13, C-16** are single-line deletions/edits in this file, net **−8 lines**.
5. **C-7** is a rename across three files, mechanical, and should ride whichever wave touches the batch-action path.

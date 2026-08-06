claude-opus-5[1m]

# CHALLENGE — `GalleryInfiniteGrid.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GalleryInfiniteGrid.vue` (54 lines)
**Census row** `formation/fourier/lane-frontend.md:113` — “`GalleryInfiniteGrid.vue` | 54 | `InfiniteScroll` wrapper”.
**Posture** Assumed DEFECTIVE until the tree proved otherwise. No browser was driven; every claim below is
static or source-derived, and the two claims whose *observed* form needs a live page carry
**UNPROVEN-NEEDS-LIVE (SS-13)** inline. `/Users/mkbabb/Programming/fourier-analysis` was read-only throughout;
the only write of this task is this file.

**Read set (whole, read-only).** The component; its three imports —
`web/src/lib/types.ts` (`Visualization`, `GalleryTier`), `@mkbabb/glass-ui/infinite-scroll` (**installed 4.0.0**,
`node_modules/@mkbabb/glass-ui/dist/infinite-scroll.js`, 73 lines), `./GalleryCard.vue` (309) — and, transitively,
`GalleryCard`’s imports (`lib/api.ts` `thumbnailUrl`, `visualization/lib/basis-display.ts`, `lib/colors`,
`components/ui/PathPreview.vue`). For provenance of the contracts the component consumes: the sole caller
`components/visualization/GalleryView.vue`, `stores/gallery.ts`, the producer source at
`/Users/mkbabb/Programming/glass-ui/src/components/infinite-scroll/**` (**7.0.0**), and the API truth at
`fourier-analysis/api/models/visualization.py` + `api/routers/{visualizations,admin}.py`.

**Verdict** 12 defects — **1 BLOCKER**, 2 MAJOR, 6 MINOR, 3 INFO — and **4 superlatives**. The component itself is
small, honest and nearly right; its defect mass is concentrated in **the contract it inherits from a
three-majors-stale dependency** and in **the half of its own prop contract that it forgot to hoist**. The
BLOCKER is not a style opinion: at the installed version, this component paginates the **entire** gallery on
mount without a single scroll event.

---

## §1 · The blocker

### D-1 · BLOCKER — the grid drains the whole collection on mount; “infinite scroll” never gates on visibility

**Provenance (the load path, end to end)**

| # | site | fact |
|---|---|---|
| 1 | `GalleryInfiniteGrid.vue:28` | `<InfiniteScroll :has-more="hasMore" :is-loading="loading" @load-more="emit('load-more')">` |
| 2 | `GalleryView.vue:292` | `:loading="gallery.loading \|\| gallery.loadingMore"` — the two store flags are collapsed into the one `isLoading` input |
| 3 | `GalleryView.vue:297` | `@load-more="gallery.fetchNextPage()"` |
| 4 | `node_modules/@mkbabb/glass-ui/dist/infinite-scroll.js:20-22` | `function h() { s.value && d() && a(); }` — the composable’s `check()`. `s` = sentinel ref, `d()` = `shouldLoad()` = `hasMore && !isLoading`, `a()` = `onLoadMore`. **`check()` never consults the observer, the sentinel’s position, or any intersection record.** |
| 5 | `…/infinite-scroll.js:26` | `u(() => l(r), (e) => { !e && s.value && requestAnimationFrame(h); })` — a watch on `isLoading`: **every** true→false edge schedules `check()` on the next frame |
| 6 | `stores/gallery.ts:61` | `if (!hasMore.value \|\| loadingMore.value) return;` — a **re-entrancy** guard, not a rate guard |
| 7 | `stores/gallery.ts:76,80` | `hasMore.value = result.has_more` … `finally { loadingMore.value = false }` — the false edge that re-arms (5) |

**The failure, deterministically.** `GalleryView.vue:290` mounts the grid the moment `gallery.loading` flips true, so
`InfiniteScroll` mounts with `isLoading === true` and `shouldLoad()` false — no fire yet. `resetAndFetch`
(`gallery.ts:84-103`) lands page 1 and clears `loading` → edge (5) → rAF → `check()` → `hasMore && !isLoading` → **emit
`load-more`** → `fetchNextPage()` → `loadingMore` true → page 2 lands → `loadingMore` false → edge (5) again → page 3 …
The cycle terminates only when the server returns `has_more: false`. At `limit: 20` (`gallery.ts:65`) a 1 000-row
gallery costs **50 sequential round trips, 1 000 `GalleryCard` instances (~20 native nodes each ⇒ ~20 k DOM nodes),
and 1 000 `<img>` elements**, with **zero** user scrolling. Infinite scroll degrades to eager full-collection load.

**Second, independent leg (weaker, and not needed).** `…/infinite-scroll.js:13` sets
`root: e.scrollContainer?.value ?? null`, and `scrollContainer` is `InfiniteScroll`’s *own* wrapper `<div>`
(`…/infinite-scroll.js:56-58`, `ref_key: "scrollContainer"` at `:58`), which has no `overflow` and is not a scroll port. Per
the IntersectionObserver root-intersection-rectangle rule, the root bounds are that element’s own box — nothing
above the root clips it — and the sentinel is a DOM child of it, so `isIntersecting` is true from the first
observation regardless of scroll position. This makes the *first* fire unconditional too. **Leg B (rows 4-5) does not
depend on leg A at all**, which is why the finding survives even if a reader disputes the spec reading.

**Falsifiers, stated and run.**
- *“`check()` re-observes rather than firing.”* It does — **at 7.0.0**: `/Users/mkbabb/Programming/glass-ui/src/components/infinite-scroll/composables/useInfiniteScroll.ts:47-49` is `function check() { if (sentinelRef.value) setupObserver(sentinelRef.value); }`, and `:23` adds `observer?.unobserve(entry.target)` before `onLoadMore()`. The producer already cured exactly this. The **installed 4.0.0 dist does not have the cure** — it is the naive form quoted at row 4. Fourier pins `"@mkbabb/glass-ui": "^4.0.0"` (`web/package.json:14`) and `node_modules/@mkbabb/glass-ui/package.json` resolves **4.0.0**. Confirms rather than refutes.
- *“The store’s guard stops it.”* `gallery.ts:61` returns early only while a fetch is **in flight**; the re-arm at row 5 fires strictly *after* `loadingMore` clears. No overlap, no suppression.
- *“Something upstream throttles.”* `web/` ships **no** debounce/backoff on this path and **no** ESLint config or `lint` script (`package.json` scripts = `dev`/`build`/`preview`/`test:e2e`/`test:e2e:ui`); nothing exists to have flagged it.
- *“It would have been noticed.”* Three real mitigations mask the symptom and explain the survival — `loading="lazy"` on the thumbnail (`GalleryCard.vue:103`) defers the image bytes, `.deferred-section` `content-visibility` with `--deferred-section-size: 17rem` (`GalleryCard.vue:71,206`) defers off-screen paint, and `processInChunks(..., {chunkSize:24})` (`gallery.ts:74`) keeps any single accumulation task short. **Honest bound: this is a network/DOM/memory amplification and a broken interaction contract, not a visible hang.**

**The fold.** `lane-frontend.md:568` praises `lib/scheduler.ts` and quotes its own header — *“the genuine unbounded
consumer is the gallery infinite-scroll accumulation”* — calling it *“good hygiene, correctly scoped.”* It is: but the
yield floor is **dosed for a scroll-paced drip and is being fed an uninterrupted drain**. D-1 is the reason that
mitigation is load-bearing rather than belt-and-braces, and the census could not see it because the census read the
consumer, not the installed dist. The cure is **not** a local edit: `lane-frontend.md:490` shows
`@mkbabb/keyframes.js@4.3.0` optional-depends `"@mkbabb/glass-ui": "~4.0.0"` — a tilde that hard-locks the 4.0.x line —
so the fix rides `lane-frontend.md:636`’s **[P0] tri-package atomic bump** (`glass-ui 4→7` ∧ `keyframes 4.3→6` ∧
`value.js 0.13→4.0`). **This finding gives that P0 a live behavioural cost it did not previously carry**: the corpus
framed the bump as break-surface and shadow economics; staying at 4.0.0 also keeps a pagination runaway in production.

**UNPROVEN-NEEDS-LIVE (SS-13).** The *observed* request count. One `page.goto('/gallery')` with a network-request
count and a `document.querySelectorAll('.gallery-card').length` reading, with no scrolling, settles it: >1 page ⇒
CONFIRMED. Predicted: every page until `has_more` is false.

---

## §2 · Major

### D-2 · MAJOR — no error posture anywhere on the load path; on a failing endpoint D-1 becomes a retry storm

`stores/gallery.ts:77-79` — `catch (e) { if (!api.isAbortError(e)) toast(...) }` — swallows the failure, leaves
`hasMore` **true**, and `finally` clears `loadingMore` (`:80`). That is exactly the false edge D-1 row 5 re-arms on. So
a failing `GET /api/visualizations` yields: request → reject → toast → rAF → request → … at frame cadence, until the
user leaves. The component contributes the missing brake: `GalleryInfiniteGrid.vue:28-52` exposes only `#loading` and
`#end`; there is **no error slot, no error prop, no retry affordance**, so nothing in the grid can interrupt or even
show the state. The failure is silent-but-loud: a toast per iteration.

*Falsifier.* If `catch` set `hasMore = false`, or if any backoff existed, or if `InfiniteScroll` gated on a distinct
error input — none do (`gallery.ts:77-79`; `dist/infinite-scroll.js` has no error concept; component has no error
prop). Graded MAJOR, not BLOCKER, because it has **no independent life**: cure D-1 and this collapses to “one failed
page, one toast, silent stall.” **UNPROVEN-NEEDS-LIVE (SS-13)** for the observed request rate.

### D-3 · MAJOR — `likedHashes` is forwarded whole; the file resolves the *identical* problem correctly one line later

```
35:                    :liked-hashes="likedHashes"                             ← the Set, forwarded
36:                    :selected="selectedHashes?.has(entry.slug) ?? false"    ← resolved to a boolean
```

`GalleryCard.vue:34` derives `isLiked = computed(() => props.likedHashes?.has(props.entry.slug) ?? false)`, so every
card takes a reactive dependency on the whole collection. `GalleryView.vue:127-129` **replaces the Set identity on
every like** (`const s = new Set(likedHashes.value); …; likedHashes.value = s`) ⇒ the `likedHashes` prop changes for
**all N cards** ⇒ N child re-renders for a one-card state change. The `selected` path costs N vnodes in the parent but
only one child re-render, because Vue’s prop diff sees an unchanged boolean for the other N-1. With D-1 unfixed, N is
the entire collection, so a single heart click is O(collection).

*Falsifier.* If the child ignored the prop, or the parent mutated in place. Neither: `GalleryCard.vue:34` reads it;
`GalleryView.vue:127-129` re-allocates. The correct shape is proven in-file at line 36 — a one-line hoist
(`:liked="likedHashes.has(entry.slug)"`) with no new concept.
*Scope note (systemic, not local):* the same whole-Set forwarding appears at `GalleryFeaturedCarousel.vue:35` and
twice in `GalleryMarquee.vue:43,60`. The grid is merely the highest-N instance.

---

## §3 · Minor

### D-4 · MINOR — `Visualization.tier` is a phantom on every never-curated row, and `GalleryCard` takes the wrong branch for it
`web/src/lib/types.ts:232` declares `tier?: GalleryTier`. The API **never writes it on create**: the Pydantic
`Visualization` (`api/models/visualization.py:109-170`) has **no `tier` field** under
`model_config = ConfigDict(extra="forbid")`, and the insert is `insert_doc = viz.model_dump()`
(`api/routers/visualizations.py:210`). The **only** writer is admin curation —
`api/routers/admin.py:181-184` `$set: {"tier": body.tier, …}`. Reads pass the raw doc through
`_public_doc` (`visualizations.py:78-80`, strips only `_id`/`liked_ips`), so an uncurated row reaches the client with
`tier === undefined`. Then `GalleryCard.vue:149` — `v-if="entry.tier !== 'normal'"` — is **true** for it, while both
inner branches (`:150` `=== 'featured'`, `:151` `=== 'saved'`) are false: an empty `w-6 h-6 rounded-full` box on
essentially every card. The default case takes the exceptional branch; the guard is inverted for `undefined`.
*Falsifier.* If the create path defaulted `tier` server-side, or if the TS type were required. Neither
(`api/models/visualization.py` has no `tier` token at all; `types.ts:232` is `?`). Harm is a dead 24 px box, hence
MINOR — but the **contract** defect is the one to carry: an optional field the writer never populates, guarded by
`!== 'normal'` rather than `=== 'featured' || === 'saved'`.

### D-5 · MINOR — both slot overrides re-implement the producer’s own wrapper, doubling its padding
The installed dist already wraps each slot: `dist/infinite-scroll.js:35-38` `f = { key: 0, class: "flex justify-center py-4" }`
for loading, `:38-41` `p = { key: 1, class: "py-4 text-center text-sm text-muted-foreground" }` for end, and the render fn
nests the slot **inside** them (`:68`). The component then supplies, *inside* those wrappers:
`:45` `<div class="flex justify-center py-4">` (an exact duplicate ⇒ nested flex + `2rem + 2rem`) and
`:50` `<p class="text-center text-xs text-muted-foreground py-4">` (three classes restated, `py-4` doubled ⇒ **4 rem** of
vertical space for one line of text, plus a `text-xs`-over-`text-sm` override). The spinner at `:46`
(`h-6 w-6 … rounded-full border-2 border-muted-foreground border-t-transparent`) is a one-size-off copy of the
producer default (`h-5 w-5 … rounded-pill …`, `dist:68`) — the glass-ui-first law says extend the producer, not fork
its default. **Forward hazard:** at 7.0.0 that default becomes the house `DotRing` mark inside a `<Transition>`
(`glass-ui/src/components/infinite-scroll/InfiniteScroll.vue:66-70`), so after the P0 bump this local copy will be the
one surface in the app still spinning a hand-rolled ring.
*Falsifier.* If the slot replaced the wrapper instead of nesting inside it — the compiled render fn shows nesting.

### D-6 · MINOR — “N loaded” under-reports, by construction
`:27` `{{ entries.length }} loaded`. The prop is bound to `nonFeaturedEntries` (`GalleryView.vue:291`), i.e.
`gallery.entries.filter(e => e.tier !== "featured")` (`GalleryView.vue:68-70`). Featured rows *are* loaded — they are
rendered by `GalleryFeaturedCarousel` from the same array (`GalleryView.vue:250-251`) — so the counter is short by the
featured count and the word “loaded” is false. *Falsifier.* If featured rows were excluded from `gallery.entries`;
they are not (both computeds derive from it).

### D-7 · MINOR — the tier union is hand-copied three times past an exported alias
`:19` `"set-tier": [hash: string, tier: "featured" | "saved" | "normal"]`. The canonical alias exists and is already
the type of the field: `web/src/lib/types.ts:96` `export type GalleryTier = "featured" | "saved" | "normal";`, used at
`:232`. The literal is re-spelled at `GalleryInfiniteGrid.vue:19`, `GalleryCard.vue:29` and `GalleryView.vue:132` —
three hand-copies of an exported alias that is itself mirrored server-side (`api/models/gallery.py:25`). Any future
tier gains four edit sites and three of them typecheck fine while disagreeing.
*Falsifier.* If `GalleryTier` were unexported or divergent — it is exported and character-identical.

### D-8 · MINOR — two dead imports in the read set, undetectable by this repo’s toolchain
`GalleryCard.vue:9` `import { VIZ_COLORS } from "@/lib/colors";` and `:10`
`import PathPreview from "@/components/ui/PathPreview.vue";` — each occurs **exactly once** in the file (the import
itself); neither appears in template, script or style. `<script setup>` exposes every binding to the template, so TS
cannot mark them unused, `tsconfig.json` sets no `noUnusedLocals`, and `web/` has **no** ESLint config and no `lint`
script — nothing in the build (`vue-tsc -b && vite build`) can catch them. Consequence: `PathPreview.vue` (69 LOC, an
SVG path renderer) is statically pulled into the gallery chunk for nothing.
*Falsifier.* A single template/style reference to either symbol — `grep -c` = 1 for both, i.e. the import line alone.

### D-9 · MINOR — the pair’s prop contract disagrees with itself across one import boundary
Grid: `:10` `adminMode: boolean` and `:11` `likedHashes: Set<string>` — **required**. Card: `GalleryCard.vue:21-22`
`adminMode?` / `likedHashes?` — **optional**, forcing defensive `?.`/`?? false` at `:34` and `:91`. All three live
callers always bind both (`GalleryInfiniteGrid.vue:34-35`, `GalleryFeaturedCarousel.vue:34-35`,
`GalleryMarquee.vue:42-43,59-60`), so the optionality is unexercised and the defensiveness is dead. Precision, since
L-18 cuts both ways: `selected?` (`GalleryCard.vue:23`) **is** correctly optional — Carousel and Marquee genuinely
omit it. The defect is the two that are not.

---

## §4 · Info

- **D-10 · INFO — no dedup on append; key uniqueness rests entirely on server invariants.** `:32 :key="entry.slug"` is
  the right key (see S-3), but the store has two independent append sites that never cross-check —
  `gallery.ts:74` (`push` per page) and `gallery.ts:182` (`entries.value.unshift(data)` on restore). I could **not**
  construct a live duplicate: `softDelete` splices the row out first (`gallery.ts:170-171`) and soft-deleted rows are
  filtered from list results (`gallery.ts:73`, `:95`). Recorded as a residual, not a defect claim: were a duplicate
  slug ever to land, this loop is where it surfaces (dev-mode duplicate-key warning + patch misbehaviour).
- **D-11 · INFO — an inline `style` magic number outside the token system.** `:29`
  `style="grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr))"` is the **only** `auto-fill` in the entire
  `web/src` tree (`grep -rn "auto-fill" --include="*.vue" src/` ⇒ 1 hit). Ungoverned `14rem`, and an inline style is
  the one form a future `style-src` CSP cannot allow.
- **D-12 · INFO — D-1 … D-6 are all invisible to CI.** `e2e/gallery.spec.ts` (139 lines) asserts tabs, search bar and
  the drafts empty state only; `grep -n "scroll\|load more\|loaded\|No more entries\|gallery-card"` over it returns
  **nothing**. There is no unit test runner in `web/` at all (no vitest in `package.json` scripts). The suite cannot
  refute a single finding above, which is also why none of them were caught.

---

## §5 · Superlatives (L-18 both ways)

- **S-1 · Goldilocks, exactly.** 54 lines; the script block holds a props decl and an emits decl and **nothing else** —
  zero store imports, zero API imports, zero `computed`, zero lifecycle. The census’ own one-word characterisation
  (`lane-frontend.md:113`, “`InfiniteScroll` wrapper”) is the whole truth about it, which is rare. *Falsifier:* any
  business logic or fetch in the file — there is none.
- **S-2 · Structurally incapable of leaking.** No `addEventListener`, `setInterval`, `setTimeout`, `ResizeObserver`,
  `IntersectionObserver` or manual `watch` in the file. The one observer on the path is owned by the composable and
  torn down on scope dispose — `dist/infinite-scroll.js:27` `i(m)` (`onScopeDispose(teardown)`), matching
  `glass-ui/src/components/infinite-scroll/composables/useInfiniteScroll.ts:71`. Teardown is *proven*, not assumed.
  Note the asymmetry worth carrying: the dependency’s **lifetime** contract is right; only its **trigger** contract
  (D-1) is wrong.
- **S-3 · The key is the identity, and the wrong choice was available.** `:32 :key="entry.slug"`. `types.ts:207-211`
  states it outright — *“`slug` is the one user-facing identity (the URL handle, per §1 single-slug rule);
  `content_hash` is a non-identity dedup key”* — and `content_hash` is right there on the same object, non-unique by
  design. Sibling loops agree (`GalleryFeaturedCarousel.vue:29`, `GalleryMarquee.vue:37`). Qualified only by D-10.
- **S-4 · Half of the membership contract is already hoisted correctly.** `:36`
  `:selected="selectedHashes?.has(entry.slug) ?? false"` resolves Set membership in the parent and hands the child a
  boolean — the correct shape, in this file, one line below the wrong one. This is what makes D-3 a defect rather than
  a preference: the component already knows the answer.

---

## §6 · The viz render path (canvas/WebGL) — a bounded negative, stated because the axis asks

**This component does not touch the canvas/WebGL render path, and the corpus predicts why.** `CENSUS-2026-08-03.md`
§3a (`:85-88`) fixes the architecture: *“Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases
(epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF; FrequencyGraph
watch-driven) + 12 SVG surfaces.”* None of the three is in the gallery:
`grep -rn "canvas\|Canvas" --include="*.vue" src/components/visualization/gallery/` returns **zero hits**. The grid’s
only pixel surface is a server-rendered raster — `GalleryCard.vue:99-104` `<img :src="thumbnailUrl(entry.image_slug)"
… loading="lazy">` (`:100` src, `:103` lazy) → `lib/api.ts:292-294` `${BASE}/api/images/${imageSlug}/thumbnail`.

Two things follow, both load-bearing:

1. **The gallery tile’s one would-be viz-render coupling is dead code.** `PathPreview.vue` — a pure-SVG contour
   renderer (`computed` → `M …L…` path string, `:21-44`) — is imported by `GalleryCard.vue:10` and never rendered
   (D-8). Whatever design intent once put a live contour on the tile, the tree today ships the import and not the
   organ.
2. **The contact is a main-thread one, and D-1 is what makes it matter.** The gallery is the *named* consumer of the
   repo’s yield floor: `lane-frontend.md:568` quotes `lib/scheduler.ts:14-19` — the render loop is excluded because it
   is *“already rAF-paced AND off-screen-gated (I.γ)”*, and *“the genuine unbounded consumer is the gallery
   infinite-scroll accumulation.”* `processInChunks(fresh, …, {chunkSize:24})` (`gallery.ts:74`) is the mitigation.
   D-1 converts the drip it was sized for into a continuous drain, so the yield floor is doing far more work than its
   author budgeted — and the one place a competing rAF loop *could* be co-resident is the same tab after navigation
   (`ConvergencePlot`’s ungated rAF, per the census row above). **UNPROVEN-NEEDS-LIVE (SS-13):** long-task attribution
   during the drain.

---

## §7 · R5-7 (template-loop invisibility) — NOT APPLICABLE as stated, with the adjacent hazard named

**Not applicable, and the tree says so plainly.** R5-7 (`intakes/lane-fourier-r3-r6.md:125`, adjudicated **TRUE**,
ADOPT-AS-FACT + CARRY→F.W4) is: *“template-loop evidence keyed to **component** callsites is blind to native HTML
element loops”* — the leaf `instance.loop.paper-sidebar` derived **`[]`** because `PaperSidebar.vue`’s three loops sit
on native `<li>`; R6-5 (`:139`) cured it with a `NATIVE_TEMPLATE_LOOP` family and re-derived rows at lines 65/87/105.
`GalleryInfiniteGrid.vue` has **exactly one** `v-for` (`:31`) and it sits on `<GalleryCard>` — a **registered component
callsite**, precisely the form the deriver *can* see. One hop down, `GalleryCard.vue:116` `v-for="b in basisLabels"`
likewise sits on `<Badge>` (opened at `:115`), a component. **There is no native-element loop anywhere in this
component’s subtree**, so the R5-7 blind spot does not touch it. *Falsifier:* a `v-for` on a native tag in either file —
`grep -n "v-for"` gives `GalleryInfiniteGrid.vue:31` (`<GalleryCard>`) and `GalleryCard.vue:116` (`<Badge>`) only.

**The adjacent hazard, which does apply, and which cuts the other way.** R5-7’s deeper lesson is that a denominator
keyed to component callsites mis-measures rendered cost. Here the visibility is fine but the **magnitude** is not:
this loop’s per-row cost is one callsite that expands to **~18 native elements plus ~6 component instances** — counted
from `GalleryCard.vue:62-190`: 11 `<div>`, 6 `<span>`, 1 `<img>`, plus `Checkbox` ×1, `Badge` ×n, `Button` ×4 and five
lucide `<svg>` icons in admin mode. Any per-component D/L/C figure that reads “1 loop” for this file under-states its
DOM contribution by roughly **20-40×**, and D-1 multiplies the row count by the size of the collection. F.W4’s audit
should carry R5-7’s cure *and* the dual: **count native loops, and weight component-callsite loops by their expansion.**

**No contradiction with the intake lane.** Nothing in this challenge disputes any of the 38/52 TRUE rows; D-1 lives in
a dependency none of R3–R6 examined, and this section corroborates R5-7/R6-5 by supplying a clean negative case
alongside the sidebar’s positive one.

---

## §8 · Carry

| id | severity | one-line | fix site | rides |
|---|---|---|---|---|
| D-1 | **BLOCKER** | whole-collection drain; `check()` fires without consulting visibility (glass-ui 4.0.0) | **producer** — cured at 7.0.0 | `lane-frontend.md:636` **[P0] tri-package atomic bump**; blocked by the `keyframes@4.3.0 → glass-ui ~4.0.0` tilde (`:490`) |
| D-2 | MAJOR | no error posture; failing endpoint ⇒ frame-cadence retry + toast storm | `stores/gallery.ts:77-80` + an error slot on the grid | collapses once D-1 lands |
| D-3 | MAJOR | `likedHashes` Set forwarded whole ⇒ O(N) re-render per like | `GalleryInfiniteGrid.vue:35` (+ Carousel `:35`, Marquee `:43,60`) | one-line hoist, pattern already present at `:36` |
| D-4 | MINOR | `tier` never written on create; `!== 'normal'` inverts for `undefined` | `GalleryCard.vue:149` and/or the API default | contract row, pairs with `lane-crud.md:375` |
| D-5 | MINOR | slot chrome duplicates the producer wrapper ⇒ doubled padding, forked spinner | `GalleryInfiniteGrid.vue:44-51` | worsens at 7.0.0 (`DotRing`) |
| D-6 | MINOR | “N loaded” counts the non-featured subset | `:27` | |
| D-7 | MINOR | tier union hand-copied ×3 past exported `GalleryTier` | `:19`, `GalleryCard.vue:29`, `GalleryView.vue:132` | |
| D-8 | MINOR | dead `VIZ_COLORS` + `PathPreview` imports; no lint can see them | `GalleryCard.vue:9-10`; repo needs a lint gate | |
| D-9 | MINOR | required-vs-optional prop drift across one import boundary | `GalleryCard.vue:21-22` | |
| D-10 | INFO | no dedup on append (2 sites); no live duplicate constructible | `stores/gallery.ts:74,182` | residual |
| D-11 | INFO | inline `auto-fill` magic number, sole occurrence in `src/` | `:29` | |
| D-12 | INFO | zero test coverage of the paging contract; no unit runner in `web/` | `e2e/gallery.spec.ts` | why none of the above was caught |

**Live-probe queue (SS-13), 2 items, both one page-load:** (a) request count + `.gallery-card` count after
`goto('/gallery')` with no scroll ⇒ settles D-1; (b) the same with the API forced to 500 ⇒ settles D-2.

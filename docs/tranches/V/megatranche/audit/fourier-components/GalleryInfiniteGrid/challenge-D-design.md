claude-opus-5[1m]

# CHALLENGE · GalleryInfiniteGrid · axis D (DESIGN)

**Target** `fourier-analysis/web/src/components/visualization/gallery/GalleryInfiniteGrid.vue` (54 lines)
**Method** static + source-derived only. No browser tooling. Read whole: the target, its three imports
(`@/lib/types`, `@mkbabb/glass-ui/infinite-scroll` @ **installed 4.0.0**, `./GalleryCard.vue`), the sole
consumer (`GalleryView.vue`), the store it is driven by (`stores/gallery.ts`), the API it ultimately
calls (`lib/api.ts`), fourier's `src/style.css`, glass-ui **4.0.0 dist** (`node_modules/@mkbabb/glass-ui/dist/`)
and glass-ui **7.0.0 producer source** (`/Users/mkbabb/Programming/glass-ui/src/`).
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim below carries
its own falsifier and dies if the falsifier holds.
**Writes** this file only. No product source touched in any repo.

**Tally — defects 14 (1 BLOCKER · 7 MAJOR · 4 MINOR · 2 INFO) · superlatives 5.**

---

## §0 · What the component is

54 lines. Six props in, six events out, zero local state, zero store imports, zero fetch. A caption, a
`glass-ui` `InfiniteScroll` wrapper, one CSS grid, a `v-for` of `GalleryCard`, and two slot overrides.
It is a presentational shell and it is right to be one (see S-1). Everything below is about the ~15
decisions it does make.

---

## §1 · BLOCKER

### D-1 · The type ladder dies at F.W1: `text-xs` ×2 — and this is a **new break-surface row the census missed, 117 occurrences wide**

- **Where** `GalleryInfiniteGrid.vue:27` (`class="text-xs text-muted-foreground"`) and `:50`
  (`class="text-center text-xs text-muted-foreground py-4"`).
- **Today (glass 4.0.0) it resolves.** `node_modules/@mkbabb/glass-ui/dist/styles/theme/bridges.css:12-24`
  bridges `--text-admin-label/-micro/-caption/-small/-body/…` and **clears nothing**; Tailwind's own static
  rung is live, emitted at `dist/styles/components.css:44-45` (`--text-xs: 0.75rem`).
- **After the uplift it does not.** glass-ui 7.0.0 `src/styles/theme/bridges.css:35-36` declares
  `--text-sm: initial; --text-xs: initial;` — deliberately, with the reason written in the file at
  `:17-24`: *"Tailwind v4 ships STATIC `text-sm` (0.875rem) / `text-xs` (0.75rem) rungs that silently
  bypass the fluid √φ clamps … Clearing exactly these two namespace keys makes a residual
  `text-sm`/`text-xs` a BUILD-VISIBLE unknown utility (not a silent bypass); the codemod migrated every
  call-site onto the named √φ rungs."* The producer performed that codemod on itself; fourier never did.
- **Rendered consequence.** Both captions lose their size declaration and inherit the body cascade.
  fourier sets `html { font-size: 1.125rem }` below 768px and `1rem` at/above (`web/src/style.css:41-49`),
  so the "N loaded" caption and the "No more entries" end-cap go **13.5px → 18px on mobile** and
  **12px → 16px on desktop**. A caption becomes body text; the grid header's whole vertical rhythm reflows;
  the end-cap stops reading as a terminator and starts reading as content.
- **Scope — this is the finding.** `grep -ro "text-xs" web/src | wc -l` → **40** across **16 files**;
  `text-sm` → **77** across **31 files**; union **36 files / 117 occurrences**. The census's enumerated
  uplift break surface
  (`CENSUS-2026-08-03.md:102-105`, restated as the F.W1 work order at `:185-186`) is
  *`metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1,
  `ToastVariant`* — **11 subpath sites + 3 dock members + 1 type**. A grep of `CENSUS-2026-08-03.md` and
  `lane-frontend.md` for `text-xs` / `text-sm` / "type ladder" / `BJ.W-TYPE` returns **zero hits**. The type
  ladder is not on the census's list at all, and it is ~7× the enumerated surface.
- **Why it is a BLOCKER and not a MAJOR.** The break is in CSS class names, so `vue-tsc` — one of only two
  gates fourier has (`CENSUS:256-258`: *"vitest is ABSENT; the only gates are `vue-tsc` and 29
  single-chromium Playwright tests"*) — **cannot see it**. F.W1 as currently scoped will land green and
  ship a typography regression across 36 files. The census's own risk note ("the break surface is an order
  of magnitude above the 46-line 3.1→4.0 prior-art") is itself an under-estimate by this row.
- **Falsifier (tested, does not hold).** The break dies if (a) 7.0.0 kept `--text-xs` bridged — it does not,
  `bridges.css:36`; or (b) fourier re-declares it in its own `@theme` — `web/src/style.css:13-15` declares
  only `--font-sans`; or (c) Tailwind falls back to its built-in when a `@theme` key is cleared — `initial`
  in a `@theme` block removes the namespace key and the utility ceases to be generated, which is precisely
  the producer's stated intent ("BUILD-VISIBLE unknown utility").
- **Cure, available TODAY and zero-regression.** `text-xs` → `text-caption`. `--text-caption` is already
  bridged in **4.0.0** (`dist/styles/theme/bridges.css:18`) and in 7.0.0 (`bridges.css:38`), resolving to
  `--type-caption: clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` (`typography/scale.css:100-104`). Its floor is
  0.75rem — **byte-identical at narrow viewports**, per the scale file's own comment at `:92-93`
  (4.0.0 bridge at `theme/bridges.css:18`; 7.0.0 bridge at `theme/bridges.css:28`)
  (*"The <min> of every clamp is the rung's prior fixed rem — byte-identical at narrow/mobile"*) — and it
  gains the fluid growth to 16px on a wide display. Migrating before F.W1 de-risks the wave; migrating the
  other 115 occurrences is the F.W1 row that does not yet exist.
- **Carry** → new F.W1 sub-row: **"type-ladder codemod, 36 files / 117 occurrences, gate-invisible."**

---

## §2 · MAJOR

### D-2 · Both slot overrides re-apply the wrapper's own chassis — the loading and end bands are double-padded, 4rem each, against a 0.75rem gutter

- **Where** `:44-48` (`#loading` → `<div class="flex justify-center py-4">`) and `:49-51`
  (`#end` → `<p class="text-center text-xs text-muted-foreground py-4">`).
- **The wrapper already is that.** Installed 4.0.0, `dist/infinite-scroll.js`: the loading branch renders
  `renderSlot($slots,"loading")` **inside** `f = { class: "flex justify-center py-4" }`; the end branch
  renders `renderSlot($slots,"end")` **inside** `p = { class: "py-4 text-center text-sm text-muted-foreground" }`.
  Both classes are on the wrapper, not the slot.
- **Consequence — proportion.** Vertical padding is applied twice: `py-4` + `py-4` = **2rem top + 2rem
  bottom = 4rem** of empty band around a 1.5rem spinner, and the same 4rem around a one-line end-cap.
  The grid's own gutter is `gap-3` = 0.75rem (`:29`) and the page frame is `px-4` = 1rem (`:26`). The two
  largest vertical intervals in the entire component — **5.3× the gutter, 4× the frame** — are spent on
  chrome, not content. On a phone the exhausted-list end-cap alone occupies ~72px of a ~700px viewport.
- **Consequence — dead declarations.** `text-center` and `text-muted-foreground` are declared twice
  (wrapper + child), and the wrapper's `text-sm` is silently defeated by the child's `text-xs`. Three of the
  four classes on the 4.0.0 end wrapper are inert; a reader of either file alone cannot tell which one wins.
- **Falsifier (does not hold).** The claim dies if Vue slots were unwrapped, or if only one version wraps.
  Both wrap: the 4.0.0 compiled output above, and 7.0.0's source `InfiniteScroll.vue`
  (`<div v-if="isLoading" class="flex justify-center py-4"><slot name="loading">` and
  `<div v-if="!isLoading && !hasMore" class="py-4 text-center text-small text-muted-foreground"><slot name="end" />`).
  **The doubling survives the uplift** — and 7.0.0 additionally wraps the loading row in
  `<Transition name="glass-dot-ring">`, so the doubled band will also fade in and out.
- **Cure** delete both wrappers; put the content directly in the slot. Two lines net.

### D-3 · The `#loading` override reimplements the house spinner to change 4px — and in doing so opts out of the reduced-motion guard, before and after the uplift

- **Where** `:46` — `<div class="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />`.
- **It is a near-copy of the default it replaces.** 4.0.0's built-in fallback (`dist/infinite-scroll.js`) is
  `h-5 w-5 animate-spin rounded-pill border-2 border-muted-foreground border-t-transparent`. The override
  differs in exactly two tokens: `h-5 w-5 → h-6 w-6`, and `rounded-pill → rounded-full` — trading a house
  radius token (`--radius-pill: 9999px`, glass-ui `styles/theme/radius.css:110`) for the stock Tailwind
  utility at the identical computed value. The entire delta bought by 3 lines of override is **4 pixels of
  diameter and a token regression**.
- **`animate-spin` has no `prefers-reduced-motion` guard.** Verified exhaustively: every PRM block in the
  4.0.0 cascade is target-scoped — `drawer.css:190`, `view-transition.css:27`, `glass-specular-track.css:34`,
  `paper.css:62`, `animations.css:239/279/369`, `transitions.css:212`, `icon-chip.css:142`,
  `instrument-chassis.css:235` — none matches `.animate-spin`; the only generic arms Tailwind emits are the
  opt-in `motion-safe:` / `motion-reduce:` variants (`components.css`), which this line does not use. fourier's
  sole PRM block (`web/src/style.css:92-96`) covers `[data-state="active"][role="tabpanel"]` only. **A
  reduced-motion user gets an unbounded 360°/s rotation for the full duration of every page fetch.**
- **The omission is local, not systemic — which is what makes it a defect rather than a house gap.**
  `GalleryCard.vue:281-285`, in the same feature, ships an explicit
  `@media (prefers-reduced-motion: reduce) { .like-btn.liked :deep(svg) { animation: none } }` for a 300ms
  bounce. The 300ms bounce is guarded; the indefinite spin is not.
- **The uplift hands fourier the fix, and this override refuses it.** 7.0.0 replaces the default with
  `DotRing` (`src/components/_shared/feedback/DotRing.vue` — the library's declared single work-in-flight
  affordance, BK #28), whose stylesheet carries the carve at
  `_shared/feedback/dot-ring.css:239-251` (`.glass-dot-ring { animation: none; transition: none }` plus
  explicit silencing of the leave arms). Because a `#loading` slot **shadows** the default, F.W1 will land a
  PRM-correct house indicator and this file will keep opting out of it — while inheriting the
  `glass-dot-ring` `<Transition>` register that was tuned for a component it is not rendering.
- **Falsifier (does not hold).** Dies if a global `.animate-spin` PRM carve exists (grep: none in glass-ui
  4.0.0 `dist/styles/**`, none in `web/src/style.css`), or if the override changed something the default
  cannot express (it changes 4px and a radius alias).
- **Cure** delete `:44-48` entirely. Pre-uplift you lose 4px; post-uplift you gain the house mark, its
  transition, and its PRM guard for free.

### D-4 · No error state exists in the component's vocabulary — failure is a toast fired outside the scroll region, and the sentinel immediately re-arms

- **Where** the prop surface, `:12-19`: `entries · loading · hasMore · adminMode · likedHashes · selectedHashes`.
  There is **no `error` prop, no `#error` slot, no retry affordance, no `aria-busy`**. State coverage:
  loading ✓, exhausted ✓, empty ✗ (D-7), first-load ✗ (D-8), **error ✗**.
- **Failure is real and silent here.** `stores/gallery.ts:78-80`: `fetchNextPage` catches, calls
  `toast(e.message ?? "Failed to load gallery", "error")`, and **leaves `hasMore` at `true`**.
- **What the user sees.** They are 200px from the bottom of a long grid. The spinner appears, disappears,
  reappears. The only signal that anything failed is a toast in a screen corner — spatially divorced from the
  point of failure, transient, and stacking. There is no place in the grid that can say *"couldn't load more"*
  and no control that can retry. This is the design half of the defect and it is squarely on this axis: the
  component's failure affordance is **absent by construction**.
- **The re-arm (correctness half, handed off).** 4.0.0's composable (`dist/infinite-scroll.js`) watches
  `isLoading` and on the true→false edge runs `requestAnimationFrame(check)`, where
  `check = () => sentinelRef.value && shouldLoad() && onLoadMore()`; `shouldLoad = hasMore && !isLoading`.
  With `hasMore` still true and the sentinel still intersecting, a failed page re-requests immediately, and
  again, and again. **This survives the uplift**: 7.0.0's `useInfiniteScroll.ts:64-74` replaces rAF with
  `nextTick(() => { if (!toValue(isLoading)) check() })` and `check()` re-runs `setupObserver` — the same
  loop through a different door. → **CROSS-AXIS: correctness / CRUD lane.**
- **Falsifier (does not hold).** Dies if the store set `hasMore = false` on error (`gallery.ts:78-80` only
  toasts), or if the grid accepted an error prop (`:12-19` — it does not), or if the observer were one-shot
  (7.0.0's `unobserve` at `useInfiniteScroll.ts:24` is undone by `check()`'s re-`setupObserver`).
- **Cure** an `error?: string | null` prop + a slot that renders the message and a retry button **in the flow,
  at the bottom of the list, where the failure happened**; store sets `hasMore = false` on catch so the
  sentinel disarms.

### D-5 · The caption counts the wrong set, in the wrong register, with the wrong noun

- **Where** `:27` — `<p class="text-xs text-muted-foreground">{{ entries.length }} loaded</p>`.
- **Wrong set.** The parent binds `:entries="nonFeaturedEntries"` (`GalleryView.vue:291`), which is
  `gallery.entries.filter(e => e.tier !== "featured")` (`GalleryView.vue:68-70`). The featured rows are on
  screen **directly above**, in `GalleryFeaturedCarousel` (`GalleryView.vue:249-251`). So the caption reports
  a strict subset of what is loaded and of what is visible.
  **Falsifier:** fetch any page containing ≥1 featured row — the caption under-reports by exactly the featured
  count. Under the shipped seeding pattern (an admin features the good ones; `setTier` at `gallery.ts:135-145`),
  a 20-row first page with 5 featured reads **"15 loaded"** while 20 are loaded and all 20 are on screen.
- **Wrong register.** "loaded" names an implementation event, not a thing. It is telemetry the developer left
  in the UI. It carries **no denominator** ("15 loaded" — of how many?), **no noun**, and **no pluralization
  branch** (at one row it reads "1 loaded").
- **Wrong noun — three names for one object across three adjacent surfaces.**
  `GalleryView.vue:281` "No **visualizations** yet." · `GalleryInfiniteGrid.vue:50` "No more **entries**" ·
  `GalleryView.vue:315` "N **entr(ies)** selected" (and `:406/:409/:412`, and `GalleryView.vue:188` in a toast).
  `entr(ies)` is a parenthetical-plural hack shipped six times; `entry` is the store's internal word
  (`gallery.ts:22 entrySlug`); the domain word the user is given at the empty state is `visualization`, which
  is also the API's noun (`/api/visualizations`, `api.ts:410`). One of these is user language. It is not the
  one this file chose.
- **Cure** count the true loaded set (or drop the count for a range), name the thing, branch the plural:
  `{{ n }} visualization{{ n === 1 ? "" : "s" }}`; end-cap → "That's everything" or "No more visualizations".

### D-6 · The grid has no list semantics and no live region: an infinite feed that never announces anything it does

- **Where** `:29` is a bare `<div class="grid" style="…">`. Its children are `role="button"` divs
  (`GalleryCard.vue:70-72`). `:27` is a plain `<p>`.
- **What AT receives.** An undifferentiated run of buttons with **no container role, no accessible name, no
  set size, no position**. A screen-reader user cannot learn that this is a list, how long it is, or where
  they are in it. The one piece of structural information that *is* rendered — the count at `:27` — is a
  static `<p>` with **no `aria-live`**, so the defining behaviour of infinite scroll (content arriving with no
  navigation event) is announced **nowhere** under the installed 4.0.0: verified, `dist/infinite-scroll.js`
  emits only the `aria-hidden="true"` sentinel and has no status region at all.
- **The codebase knows the idiom.** `GalleryView.vue:309-310` carries `role="toolbar"` +
  `aria-label="Batch gallery actions"` on the batch bar, and `GalleryCard.vue:70-76` was explicitly lifted to
  the ARIA button-on-non-button pattern with a documented provenance comment. The grid container was skipped.
- **Uplift = PARTIAL fix, and the residue matters.** 7.0.0's `InfiniteScroll.vue:84-86` adds
  `<span class="sr-only" role="status" aria-live="polite" aria-atomic="true">` announcing *"Loading more items"* /
  *"All items loaded"* (comment at `:38-39` names exactly this gap: *"The loading/exhausted state flips silently
  to AT (the sentinel is aria-hidden). A polite live region announces the transitions"*). That closes the
  **transition** announcements. It does **not** add the
  list role, the count announcement, or per-card position — those remain absent after F.W1, and they are this
  component's to add, not the library's.
- **Falsifier (does not hold).** Dies if `role="list"` / `role="feed"` / `aria-setsize` / `aria-posinset` /
  `aria-live` appears anywhere in the chain. Grep across `GalleryInfiniteGrid.vue` + `GalleryCard.vue`:
  **zero**.
- **Cure, stated honestly.** `role="feed"` carries obligations this component cannot currently meet (focus
  management across appends, `aria-busy` on the feed). The minimum correct shape is `role="list"` on `:29`
  with `role="listitem"` on each child — which requires moving `GalleryCard`'s `role="button"` off its root
  onto an inner element, since `listitem` must be the direct child of `list`. Plus `aria-live="polite"` on the
  fixed caption at `:27`. Note the interaction with D-1: the fix is a two-file change, not a one-liner.

### D-7 · The empty grid renders "0 loaded" and a 2rem band of nothing — because the parent's empty-state guard is computed on a different set than the grid's

- **The mismatch.** Parent mount guard: `v-if="gallery.entries.length || gallery.loading"` (`GalleryView.vue:290`).
  Parent empty state: `v-if="!gallery.entries.length && !gallery.loading"` (`GalleryView.vue:266`). Both on
  **all** entries. The grid receives **`nonFeaturedEntries`** (`GalleryView.vue:291`). When every fetched row
  is featured, `gallery.entries.length > 0` → the parent's empty state is suppressed → the grid mounts with
  `entries.length === 0`.
- **What renders in that state.** `:27` → `<p>0 loaded</p>`. `:29` → an empty grid, zero children, zero height.
  `hasMore` false → 4.0.0's end wrapper renders its `py-4 text-center …` box, but the slot's only child is
  guarded `v-if="entries.length"` (`:50`) → **a 2rem-tall empty padded band**. Net: the string "0 loaded" and
  dead space. No message, no explanation, no exit.
- **`:50`'s `v-if` is the file's only acknowledgement that the set can be empty** — and it handles the case by
  rendering nothing inside a box that still takes space. That is the worst of both branches: the guard was
  written, and it made the state less legible rather than more.
- **Falsifier / reachability, stated honestly.** Dies for any page whose rows are not all featured — so this is
  not a one-click state. It is reachable exactly in the young-gallery seeding pattern this app ships with (an
  admin curating a small gallery features what is there; `setTier` → `resetAndFetch`, `gallery.ts:135-145`).
  It is **not** reachable via the "Featured" tier filter, contrary to the obvious guess: `resetAndFetch`
  (`gallery.ts:87-91`) forwards only `{limit, sort, owner}` and `api.listVisualizations` (`lib/api.ts:397-401`)
  accepts only those four — see D-13.
- **Cure** move the empty-state decision inside the grid, computed on the set the grid actually renders, or
  bind the parent's guard to `nonFeaturedEntries`.

### D-8 · There is no first-load state: the primary route's first paint is "0 loaded" over an empty rectangle with a spinner nailed to the bottom

- **The state.** `GalleryView.vue:290,292` mount the grid while `gallery.loading` is true with `entries === []`.
  The grid then paints: caption "0 loaded" (`:27`), an empty grid (`:29`), and the loading band (`:44-48`) —
  a **bottom-anchored spinner beneath nothing**, at the one moment when there is no content for it to be
  "below". The spinner's position is meaningful ("more is coming after what you're reading") and here it is
  meaningless.
- **The house idiom is a skeleton grid, and the geometry is already written down.** The card is
  `aspect-[4/3]` (`GalleryCard.vue:100`) over a ~5rem meta block, and its own scoped style already declares
  the intrinsic height: `--deferred-section-size: 17rem` (`GalleryCard.vue:206`). A skeleton needs the track
  width and that number — both already exist in the tree.
- **Today vs. after F.W1.** glass-ui 4.0.0 ships **no** Skeleton: its exports map has no `./skeleton` among 80
  subpaths and `dist/` contains no skeleton file — so pre-uplift the honest cure is a local placeholder.
  **7.0.0 ships one** (`src/components/skeleton/`, exported from the root barrel at `src/index.ts:295` and
  `src/components/index.ts:26` — note: barrel only, *not* a subpath, so the import is
  `import { Skeleton } from "@mkbabb/glass-ui"`). This is a genuine uplift **improvement** available to this
  component and worth a line in the F.W1 follow-on.
- **Falsifier (does not hold).** Dies if the parent covers first-load. It does not: its empty state is gated on
  `!gallery.loading` (`GalleryView.vue:266`) and it has no other loading affordance — the grid's own bottom
  spinner is the app's entire first-load story for `/gallery`.
- **Severity.** MAJOR: this is the first thing every visitor to the gallery route sees, and the fix is
  ~10 lines.

---

## §3 · MINOR

### D-9 · The grid track is an untokenized inline magic number, silently rem-coupled to a root font-size that changes at 768px

- **Where** `:29` — `style="grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr))"`. The **only** inline
  style in the file. It bypasses Tailwind, bypasses the token layer, cannot be overridden by a media query,
  cannot be themed, and cannot be read by the card that has to estimate its own height from it (D-10).
- **The accidental coupling.** `web/src/style.css:41-49` sets `html { font-size: 1.125rem }` below 768px and
  `1rem` at/above — with the comment at `:38-40` scoping it to *"mobile-first responsive root font sizing"*,
  i.e. **text**. Because the track is expressed in `rem`, the minimum cell is **252px on mobile and 224px on
  desktop**: the card is **12.5% larger on the smaller screen**. Nothing decided that; the layout inherited a
  typographic rule.
- **Falsifier / why MINOR not MAJOR.** Dies if the value were `px`, `ch`, or a custom property — it is `rem`,
  so the coupling is real. But the *direction* is arguably benign (larger touch targets on the smaller screen),
  and no overflow results: at a 320px viewport, 320 − 32 (`px-4`) = 288px > 252px, one column, no scroll.
  So: undocumented and unintended, not harmful. MINOR.
- **Cure** `--gallery-track: 14rem` in the app token layer, consumed by the grid and by D-10's card estimate.

### D-10 · The card's `contain-intrinsic-size` and the grid's track width are set in two files that cannot see each other

- **The joint.** `GalleryCard.vue:206` declares `--deferred-section-size: 17rem`, derived in its own comment
  from *"an aspect-[4/3] thumbnail (~11rem at a ~15rem cell) + a meta footer"*. The grid's track is
  `minmax(14rem, 1fr)` (`:29`) — and the **`1fr` grows without bound**: in a 1600px container, five tracks land
  at ~19rem, whose card is ~19.5rem tall, roughly **2.5rem past the declared estimate**.
- **Consequence.** On a wide display each off-screen card's first reveal corrects the reserved box by ~2.5rem.
- **Falsifier, and why MINOR.** The card's own comment states the mitigation: `contain-intrinsic-size: auto …`
  *"caches the real size after first paint (no scroll-jump)"* — so the correction is **once per card**, not per
  scroll, and where `content-visibility` is unsupported the card renders as before. The visible magnitude of
  the first-reveal correction is **UNPROVEN-NEEDS-LIVE (SS-13)**.
- **The design fault is the joint, not either number.** The track width is the grid's private inline literal,
  so the card can only guess. One shared token closes it — the same token as D-9.

### D-11 · The grid gutter equals the card's inner padding, collapsing the inside/outside distinction

- **The measurements.** Gutter `gap-3` = 0.75rem (`:29`). Card content padding `px-3` = 0.75rem
  (`GalleryCard.vue:108, 114, 129` — every content row). The space **between** two cards and the space
  **inside** a card's content field are metrically identical, so the eye gets no dimensional cue for the card
  boundary.
- **What *is* correct, and worth saying.** The outer frame is `px-4` = 1rem (`:26`) — strictly greater than the
  gutter. Frame > gutter is right. It is the gutter-vs-padding rung that is degenerate; the ladder has three
  positions and only two distinct values.
- **Falsifier / why MINOR.** The separation is carried on *value* instead of *space*:
  `border-2 border-foreground/15` (`GalleryCard.vue:71`) plus `box-shadow: var(--shadow-cartoon)` (`:193`) plus
  a `bg-card` fill distinct from the page. That is a legitimate substitution and it works. The defect is that
  the metric ladder no longer states the hierarchy on its own — remove the border and the grid reads as one
  undifferentiated field.
- **Cure** gutter to 1rem (`gap-4`) or card padding to 0.5rem; either restores three distinct rungs.

### D-12 · The end-cap is a dead end, not a resolution

- **Where** `:50` — "No more entries".
- Negatively framed, addressed to the machine's state rather than the reader's, and terminal: the user has
  scrolled to the bottom of the whole gallery and the app's response is a refusal. There is no next action —
  no "back to top", no CTA to the visualizer (which the *empty* state does offer, `GalleryView.vue:282-284`),
  no total. Compare the empty state, which was clearly designed (icon + line + CTA, `GalleryView.vue:279-285`);
  the exhausted state got a negation in 12px grey.
- **Falsifier** dies if the string is never reached — it is reached on every full scroll of a finite gallery,
  which for a young gallery is one screen.
- **MINOR** because nothing breaks; this is a quality-of-prose and quality-of-ending judgement.

---

## §4 · INFO

### D-13 · Three of this component's would-be empty states are unreachable because the controls that produce them are inert — which is why their absence went unnoticed [CROSS-AXIS · CRUD lane]

`searchQuery`, `tierFilter`, and `basisFilter` all trigger `resetAndFetch()` (`GalleryView.vue:92-96` debounced,
`:110-113` immediate). `resetAndFetch` (`gallery.ts:87-91`) sends `{ limit, sort, owner }`.
`api.listVisualizations` (`lib/api.ts:397-413`) *accepts* only `{ limit, sort, cursor, owner }` and serialises
exactly those. **No search term, tier, or basis filter ever reaches the API.** Consequence for this axis: the
state *"no results for your search"* is one the grid will never be asked to render, so the fact that it has no
way to render it has never surfaced. Recorded here only because it explains the shape of D-7 and completes the
state-coverage picture; the defect itself belongs to the CRUD lane. Overlaps nothing in
`intakes/lane-fourier-r3-r6.md` (whose fourier-frontend rows are R3-12 basis-label duplication, X-2 route count,
X-3 API operation count — none touches the gallery grid).

### D-14 · `hasMore` is optimistic from mount

`gallery.ts:44` initialises `hasMore = ref(true)`, so between mount and the first response the grid asserts more
data exists and arms the sentinel against an empty list. Harmless in practice (the `#end` branch correctly cannot
render during first load, which is what you want), and the sentinel's `shouldLoad` is re-gated by `loadingMore`
(`gallery.ts:63`). Noted for completeness of the state matrix, not as a defect to fix.

---

## §5 · SUPERLATIVES (L-18 runs both ways — each with its own falsifier)

### S-1 · A genuinely pure presentational shell — 54 lines, six props in, six events out, zero policy

Zero imports from `@/stores`, zero `fetch`, zero local `ref`, zero computed. Every decision — what to load, what
counts as featured, what a click means — is the parent's. **Falsifier:** any store import or self-fetch would
sink this; `grep "stores\|api\|ref(\|computed(" GalleryInfiniteGrid.vue` → nothing but the type import. This is
the correct factoring for a grid, it makes the component trivially testable in isolation, and it is why every
defect above is a *surface* defect rather than an architectural one. Credit where it is due: someone drew the
seam in the right place.

### S-2 · Perfect colour-token discipline in 54 lines

Every colour is a semantic token — `text-muted-foreground` ×3, `border-muted-foreground`, `border-t-transparent`.
**Zero** hex literals, zero raw `hsl()`/`rgb()`, zero arbitrary-value colour classes.
**Falsifier:** `grep -E '#[0-9a-f]{3,6}|rgb\(|hsl\(|\[--' GalleryInfiniteGrid.vue` → no matches. And the token is
documented AA-clear at source: `--muted-foreground → --neutral-5`
(`dist/styles/tokens/color-radius.css:85, 45` — *"WCAG AA: 5.21:1 vs page / 4.90:1 vs muted"*; dark arm
`tokens/dark-arm.css:47` — *"7.64:1 vs page"*). So the 12px caption clears AA for normal text on both arms, and
the spinner's `border-muted-foreground` ring clears 1.4.11's 3:1 for non-text. **Contrast is not a defect here,
and I looked for one.**

### S-3 · The proximity ladder is correct in direction

Caption→grid `gap-2` (0.5rem, `:26`) is *tighter* than card→card `gap-3` (0.75rem, `:29`), which is tighter than
the page frame `px-4` (1rem, `:26`). The caption therefore binds to the group it labels rather than floating
between the carousel above and the grid below — textbook gestalt proximity, and the parent's own `gap-4`
(`GalleryView.vue:220`) sits outside all three, so the nesting reads correctly from the outside in.
**Falsifier:** if the caption gap were ≥ the grid gap the grouping would invert; it is not. Honest caveat: the
differential is 4px, so the hierarchy is *asserted* more than it is *felt* — but the direction is right, which
is the part that is hard to get right.

### S-4 · `auto-fill` + `minmax(_, 1fr)` is the right density primitive, and it was chosen over the obvious wrong one

No `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` staircase, no JS measurement, no `ResizeObserver`. One declaration
that degrades continuously to a single column and needs no breakpoints. **Falsifier:** a breakpoint staircase
would be strictly worse (fixed columns at container widths the author never measured, and it would fight the
`1fr` growth the card's `content-visibility` estimate depends on). The *primitive* is right; only its delivery
(inline, untokenized, D-9) and its unshared literal (D-10) are at fault. Worth separating those.

### S-5 · The uplift **import** surface is clean — this component is off the census's entire break list

Its sole glass-ui specifier is `@mkbabb/glass-ui/infinite-scroll` (`:3`), and `./infinite-scroll` is present in
**both** exports maps — 4.0.0 (80 subpaths) and 7.0.0 (68 subpaths), verified directly. Of the census's named
break surface (`CENSUS-2026-08-03.md:102-105`: `metric-badge`, `hover-card`, `hover-popover`, `DockIconButton`,
`DockDropdownTrigger`, `ToastVariant`) this component touches **none** — and it imports no `lucide-vue-next`,
so it is also off the 35-site `@lucide/vue` rename. **Falsifier:** any of those six specifiers appearing in the
file, or the `./infinite-scroll` subpath being retired at 7.0.0 — neither holds. The uplift will not break this
file's *imports*. It will break its *typography* (D-1), which is exactly the point: the census enumerated the
surface it could see with a grep for import specifiers, and this component is the proof that the real surface is
larger and lives in the stylesheet.

---

## §6 · Corpus reconciliation

- **`formation/fourier/lane-frontend.md:113`** rows this component as *"54 | `InfiniteScroll` wrapper"* — an
  inventory line, no findings. **Extended, not contradicted.**
- **`formation/fourier/lane-frontend.md:223, 245, 346`** record the single `/infinite-scroll` import. **Confirmed
  verbatim against the tree** (`GalleryInfiniteGrid.vue:3`).
- **`formation/fourier/CENSUS-2026-08-03.md:102-105, 185-186`** — the uplift break surface and the F.W1 work
  order. **CONTRADICTED BY OMISSION, and this is D-1**: the enumerated surface (11 removed-subpath sites +
  3 dock members + `ToastVariant`) omits the type-ladder clear at glass-ui 7.0.0
  `src/styles/theme/bridges.css:35-36`, which is **36 files / 117 occurrences** in `web/src` and is invisible to
  `vue-tsc`. F.W1 as scoped is under-scoped by roughly 7×. A grep of the census and of `lane-frontend.md` for
  `text-xs` / `text-sm` / "type ladder" returns zero. **New row, carry to F.W1.**
- **`CENSUS-2026-08-03.md:256-258` ([P2] "uplift lands with no unit-test net")** — **CORROBORATED and sharpened**:
  the gate gap is worse than stated, because D-1's break class is one that `vue-tsc` categorically cannot detect.
- **`CENSUS-2026-08-03.md:186` (18 reduced-motion references banked as hygiene)** — **QUALIFIED**: the count is
  real (`GalleryCard.vue:281-285` is one of them) but coverage is not uniform. D-3 shows the same feature guarding
  a 300ms bounce while leaving an indefinite spinner unguarded. Reference counts are not coverage.
- **`audit/codex-provenance/intakes/lane-fourier-r3-r6.md`** — the adjudicated intake's fourier-frontend rows are
  **R3-12** (35→28 open-family collapse; names `GalleryCard` basisLabels as one of the 7 duplicated rows),
  **X-2** (9 route records), **X-3** (45/30/13 API operations). **None overlaps this component**; nothing here
  contradicts them. R3-12's duplication row touches `GalleryCard.vue:38-56`, a sibling of this file, not this file.

---

## §7 · Ordered repair list

| # | Severity | Repair | Files | Cost |
|---|---|---|---|---|
| D-1 | BLOCKER | `text-xs` → `text-caption` here (2 sites); open the F.W1 codemod row for the other 115 | this + 35 | 2 lines here |
| D-3 | MAJOR | delete the `#loading` override (`:44-48`) | this | −5 lines |
| D-2 | MAJOR | drop the duplicated wrapper chassis from `#end` (`:50`) | this | −1 class set |
| D-8 | MAJOR | first-load skeleton grid (local now; `Skeleton` from the 7.0.0 root barrel after F.W1) | this | ~10 lines |
| D-7 | MAJOR | empty state computed on the set actually rendered | this / `GalleryView` | ~8 lines |
| D-4 | MAJOR | `error` prop + in-flow retry; store sets `hasMore=false` on catch | this / `gallery.ts` | ~12 lines |
| D-5 | MAJOR | count the real set; name the noun; branch the plural; unify `entry`/`entr(ies)`/`visualization` | this / `GalleryView` | ~6 lines |
| D-6 | MAJOR | `role="list"` + `role="listitem"` (needs the card's `role="button"` moved inward) + `aria-live` on the caption | this / `GalleryCard` | ~6 lines, 2 files |
| D-9/D-10 | MINOR | one `--gallery-track` token, consumed by the grid and by the card's intrinsic-size estimate | this / `GalleryCard` / tokens | ~4 lines |
| D-11 | MINOR | gutter → `gap-4` (or card padding → `px-2`) to restore three distinct rungs | this | 1 class |
| D-12 | MINOR | rewrite the end-cap as a resolution with an action | this | 1 line |

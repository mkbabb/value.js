claude-opus-5[1m]

# CHALLENGE · `GalleryFeaturedCarousel` · axis **C — CONSUMPTION**

**Target** `fourier:web/src/components/visualization/gallery/GalleryFeaturedCarousel.vue` (91 lines)
**Read whole, plus every file it imports** (direct: `@/lib/types`, `./GalleryCard.vue`, `lucide-vue-next`;
transitive through its sole child: `@/lib/api`, `@/lib/colors`, `../lib/basis-display`,
`@/components/ui/PathPreview.vue`, `@mkbabb/glass-ui/{button,badge,·}`), plus the parent seam
(`GalleryView.vue`), the store (`stores/gallery.ts`), the sibling relay (`GalleryInfiniteGrid.vue`),
the installed producer (`node_modules/@mkbabb/glass-ui@4.0.0`), and the server operations
(`api/routers/{visualizations,gallery}.py`, `api/lib/crud/cursors.py`).

**Roots.** `fourier:` = `/Users/mkbabb/Programming/fourier-analysis` (READ-ONLY evidence; not written).
`vjs:` = `/Users/mkbabb/Programming/value.js`. The single write of this lane is this file.

**No browser tooling.** Every claim below is static or source-derived. The two claims that need a live
frame to close are marked **UNPROVEN-NEEDS-LIVE (SS-13)** and are excluded from the defect count's
"proven" reading only where stated.

**Prior** — this component is DEFECTIVE until the tree proves otherwise. It largely does not.

**Verdict in one line.** The carousel's *own* code is a clean, honest, 18-line presentational relay —
among the best-behaved leaves in the gallery family (§5). Its **consumption** is the problem: it is the
sole render surface for a **like operation that does not exist on either side of the wire** (C-1), it
renders a **featured strip that is a client-side filter over page 1 of a cursor stream with no tier
operation anywhere in the surface** (C-2), it **hand-rolls a producer utility that the producer itself
retired by defect-id** while the cure ships in the already-imported bundle (C-6), and it **forwards
`adminMode` into a child whose admin controls it does not wire** (C-4). Count: **16 defects · 2 blockers ·
4 superlatives.**

---

## §0 · What this component actually consumes

| Surface | Direct | Via `GalleryCard` (its only child) |
|---|---|---|
| `@mkbabb/value.js@0.13.0` | **none** | none (the hand-rolled `colors.ts` arms stand in — C-5) |
| `@mkbabb/keyframes.js@4.3.0` | **none** | none (`like-bounce` is a local `@keyframes`, `GalleryCard.vue:298-302`) |
| `@mkbabb/glass-ui@^4.0.0` | **none** (imports zero subpaths) | `./button`, `./badge`, root `·` (`Checkbox`) |
| fourier API (45-op surface) | **none** | `thumbnailUrl` (`api.ts:292`) — the only op reachable from the subtree |
| Third-party | `lucide-vue-next` (`:4`, one icon) | `lucide-vue-next` (5 icons) |

That table is itself the headline. A 91-line component whose entire job is "a horizontally
scroll-snapped, edge-feathered strip of cards" imports **zero** subpaths from a design system that ships
`./carousel`, `./fading-scroll`, `./pager-dots`, `./motion` and a `.fading-scroll--x` utility class **in
the stylesheet the app already imports** (`fourier:web/src/style.css:3` → `@import "@mkbabb/glass-ui/styles"`).

Corpus fold: `vjs:…/formation/fourier/lane-frontend.md:439` books this file as a CANDIDATE SHADOW
against `./carousel` (present at 4.0.0, "0 imports"). **I confirm that row and extend it** — lane-frontend
names only `./carousel`; the tree shows the *closer* shadow is `./fading-scroll` + the
`.fading-scroll--x` utility, and that the hand-rolled substitute reproduces a defect the producer has
already named and fixed (C-6).

---

## §1 · BLOCKERS

### C-1 · BLOCKER · The `like` emit couples to no operation. The heart lies.

`GalleryFeaturedCarousel.vue:14` declares `like: [hash: string]` and `:37` relays it up from every card.
Follow the wire down:

| Hop | Provenance | What is there |
|---|---|---|
| leaf | `GalleryCard.vue:141` | `@click.stop="emit('like', entry.slug)"` |
| relay | `GalleryFeaturedCarousel.vue:37` | `@like="emit('like', $event)"` |
| parent | `GalleryView.vue:123-129` | `handleLike` → `gallery.like(hash)` → mutates `likedHashes` |
| store | `stores/gallery.ts:188-199` | **no `api.*` call at all.** `const liked = true;` `entries.value[idx] = {…, likes: likes+1}` |
| client | `web/src/lib/api.ts` | `grep -n "like" web/src/lib/api.ts` → **no match**. No wrapper exists. |
| server | `api/routers/visualizations.py` | `grep -n "like"` → 3 hits, **all** `liked_ips` projection-exclusions (`:80`, `:318`, `:705`). No route. |
| server | `api/routers/gallery.py:34, :58` | same — `liked_ips` stripped/excluded. No route. |

And the carve-out record contradicts the tree: `api/routers/gallery.py:3-5` states *"The identity-bearing
publish / CRUD / **like** / flag endpoints were carved out at fourier-B.W3: publishing, reading, updating
and soft-deleting now live in `api/routers/visualizations.py`."* The destination has publish, read, update
and soft-delete. **It does not have like.** The operation was lost in the carve-out and the docstring still
asserts it landed.

Three user-visible lies follow, all rendered inside this carousel:

1. **The counter inflates without bound and never persists.** `like()` is `likes + 1` with no ceiling, no
   idempotence key and no request. Ten clicks → `+10` locally; the next `resetAndFetch()` (which every tier
   toggle and every delete triggers — C-3) silently reverts it.
2. **Un-like is unreachable.** `liked` is the literal `true` (`gallery.ts:194`), so `handleLike`'s
   `result.liked ? s.add : s.delete` (`GalleryView.vue:127`) can only ever take the `add` branch.
3. **`aria-pressed` reports a state the server never learned** (`GalleryCard.vue:140`) — the assistive-tech
   contract is falsified, not merely cosmetic.

The document model was *designed* for this: `liked_ips` is a real field on the visualization document
(excluded from every serializer at `visualizations.py:80`), and `cursors.py:22` ships `"likes": "likes"` as
a valid `SORT_KEYS` entry — **the server can sort a gallery by a counter no endpoint can increment.**

**Falsifier (run it):** `grep -rn "def .*like\|/like" fourier:api/` → the only hits are `liked_ips`
projections; **and** `grep -n "like" fourier:web/src/lib/api.ts` → empty. If either produced a route or a
wrapper, this finding dies. Neither does. A second falsifier — "maybe the store comment is right and this
is intentionally local" — is answered by the comment itself (`gallery.ts:189-191`) claiming *"no dedicated
toggle endpoint under the CRUD shape"* while `gallery.py:3` claims the endpoint **was carved out to**
`visualizations.py`. Two source comments in the same tree disagree; the code sides with neither, because it
ships a control that persists nothing.

**Attribution.** The missing operation is not the carousel's fault. Rendering it as a live, pressed-state,
counting affordance is the leaf layer's, and this carousel is one of exactly **two** surfaces that do so
(the other is `GalleryInfiniteGrid.vue:38`).

---

### C-2 · BLOCKER · "Featured" is a client-side filter over page 1 of a 20-row cursor page. There is no tier operation.

The `entries` prop (`GalleryFeaturedCarousel.vue:7`) is fed from `GalleryView.vue:64-66`:

```
const featuredEntries = computed(() => gallery.entries.filter((e) => e.tier === "featured"));
```

`gallery.entries` is **one cursor page**: `stores/gallery.ts:86-95` — `resetAndFetch()` calls
`api.listVisualizations({ limit: 20, sort: sort.value, owner })`. Now walk the operation surface for a way
to ask the server for featured rows:

| Layer | Provenance | Params accepted |
|---|---|---|
| client wrapper | `api.ts:397-402` | `limit`, `sort`, `cursor`, `owner` — **no tier** |
| canonical route | `api/routers/visualizations.py:288-294` | `limit`, `sort`, `cursor`, `owner` — **no tier** |
| alias route | `api/routers/gallery.py:38-41` | `limit`, `sort`, `cursor` — **no tier** |
| sort vocabulary | `api/lib/crud/cursors.py:20-23` | `newest · popular · most-forked · views · likes` — **no tier/featured key** |

So the featured strip has **no server-side source**, and no sort clusters featured rows toward page 1.

**Failure scenario (concrete).** A gallery with 25 public rows whose 3 featured rows were created earliest.
Default sort is `newest` (`gallery.ts:32`). Page 1 = the 20 newest → contains zero featured rows →
`featuredEntries.length === 0` → the parent's `v-if` (`GalleryView.vue:250`) hides the carousel entirely.
The user sees **no Featured section on a gallery that has three featured items**. Then they scroll; page 2
lands via `fetchNextPage()` (`gallery.ts:60-80`, which *appends* to `entries`); `featuredEntries` recomputes
non-empty; the carousel **materialises above the grid mid-scroll** and shoves ~14rem of content downward
under the reader's cursor.

**Falsifiers, all dead.** (a) *"Maybe `tierFilter` covers it."* `gallery.tierFilter` exists
(`gallery.ts:33`), is surfaced as a `Select` (`GallerySearchBar.vue:83-84`), and is **watched into a
refetch** (`GalleryView.vue:110-113`) — but `grep -rn "tierFilter" fourier:web/src` shows it is **never read
by any query builder or any `.filter()`**. Choosing "Featured" fires a network round-trip that returns the
identical page and changes nothing. It is a dead control, and its deadness is why the carousel is the only
featured surface. (b) *"Maybe limit is high enough."* `limit: 20` is hardcoded at `gallery.ts:89`; the
server caps it at 100 (`visualizations.py:290`) — the bound is real either way. (c) *"Maybe featured rows
are pinned by the sort."* `cursors.py:60-71` sorts strictly on the `SORT_KEYS` field then `_id`; tier is not
in the ordering.

---

## §2 · MAJOR

### C-3 · MAJOR · Every admin action the carousel emits destroys the carousel.

`resetAndFetch()` **synchronously empties the list before awaiting**:

```
stores/gallery.ts:83-86
async function resetAndFetch() {
    entries.value = [];        // ← synchronous, before the network call
    …
```

`setTier` (`gallery.ts:138-148`) and `deleteEntry` (`gallery.ts:150-160`) both `await api…` then
`await resetAndFetch()`. Both are reachable **from inside this carousel** — `adminMode` is forwarded at
`GalleryFeaturedCarousel.vue:34`, which renders `GalleryCard`'s admin overlay (`GalleryCard.vue:156-184`:
crown, bookmark, trash). Chain: card crown → `set-tier` → `:38` → `handleSetTier` (`GalleryView.vue:130`) →
`gallery.setTier` → `resetAndFetch` → `entries.value = []` → `featuredEntries` → `[]` → the parent's
`v-if="featuredEntries.length"` (`GalleryView.vue:250`) goes false → **the whole carousel unmounts for the
duration of the network round-trip, then remounts.**

Consequences: the scroll port is destroyed, so horizontal scroll position is lost unconditionally (not
merely clamped); the strip's full height collapses and re-expands, shifting the entire grid below it twice
per action; and `GalleryAdminBanner` above it is doing the same thing at the same moment
(`GalleryView.vue:134` fires `refreshAdminStats()` on the same handler — see the sibling lane
`…/GalleryAdminBanner/challenge-L-library.md:108`, which independently books that half).

**A local patch was available and was thrown away.** `api.setVisualizationTier` is typed
`Promise<Visualization>` (`api.ts:506-516`) and returns the updated entity; the store discards the return
value entirely (`gallery.ts:142` — bare `await`, no assignment) in favour of a full list reset. The
codebase already knows this idiom: `recordView` patches one row in place (`gallery.ts:207-208`) and
`restore` unshifts the returned entity (`gallery.ts:182`).

**Falsifier.** If `resetAndFetch` set `loading` first and preserved `entries` until the response landed,
`featuredEntries` would stay non-empty and the component would survive (Vue would patch by `:key`). Line 84
is unambiguous: the assignment precedes the `try`.

---

### C-4 · MAJOR · The carousel forwards `adminMode` but wires none of the admin selection contract. The checkboxes are inert.

Diff the two relays that wrap the same child:

| | `GalleryFeaturedCarousel.vue` | `GalleryInfiniteGrid.vue` |
|---|---|---|
| `:selected` passed to `GalleryCard` | **absent** | `:36` `:selected="selectedHashes?.has(entry.slug) ?? false"` |
| `@toggle-select` relayed | **absent** | `:41` `@toggle-select="(hash, checked) => emit('toggle-select', hash, checked)"` |
| `toggle-select` in `defineEmits` | **absent** (`:12-17`) | `:21` present |
| `adminMode` forwarded to the child | `:34` **yes** | `:34` yes |

Because `adminMode` *is* forwarded, `GalleryCard.vue:85-96` renders its selection checkbox on every
featured card. That checkbox is **controlled** — `:model-value="selected ?? false"` (`GalleryCard.vue:91`)
with `selected` always undefined here — and its `@update:model-value` emits `toggle-select`
(`GalleryCard.vue:94`) into a parent that declares no such emit and binds no listener. Clicking it
therefore does nothing at all: the box never ticks, no selection registers, and no error surfaces.

Downstream: `selectedHashes` (`GalleryView.vue:151`) can never gain a featured slug by the intended route,
while the grid deliberately excludes featured rows (`nonFeaturedEntries`, `GalleryView.vue:68-70`). So the
batch toolbar's **"Unfeature"** button (`GalleryView.vue:~300`) has no intended path to a target.

**Falsifier, honoured.** There *is* an unintended path, and I will not overstate the claim: select a normal
card in the grid → click that card's own crown → `handleSetTier` runs and **never reconciles
`selectedHashes`** → the now-featured slug stays selected → "Unfeature" becomes live. That path does not
rescue the design; it produces a worse state — a **phantom selection**, where the toolbar reads
"1 entr(ies) selected" while no ticked checkbox exists anywhere on screen (the card has moved into the
carousel, whose checkbox is hardwired to `false`). Severity stays MAJOR on both readings.

---

### C-5 · MAJOR · The basis pills in every carousel card are frozen at module-eval and can never reach the theme tokens.

`fourier:web/src/components/visualization/lib/basis-display.ts:1-7`:

```
import { VIZ_COLORS } from "@/lib/colors";
export const basisDisplay: Record<string, {icon;label;color}> = {
    fourier:   { …, color: VIZ_COLORS.fourier },   // ← read ONCE, at module init
```

`VIZ_COLORS` is `reactive({ fourier: "#bf4040", … })` (`lib/colors.ts:77-87`) whose real values are written
by `resolveVizColors()` (`colors.ts:90-96`), called from `App.vue:11` `onMounted` and re-called on theme
toggle by a `MutationObserver` (`App.vue:13`). `basisDisplay` copies the **string** out of the proxy into a
plain object literal during module evaluation — i.e. before `App.vue`'s mount and outside any reactive
effect. Later mutations of `VIZ_COLORS` cannot retro-write a literal. `GalleryCard.vue:36-51` reads
`cfg.color` from that frozen map and projects it at `:121` `:style="{ '--pill-c': b.color }"`, which
`.basis-tint` (`GalleryCard.vue:270-274`) uses for background, border **and** text.

**Therefore every basis pill on every card in this carousel renders the hardcoded fallback hex
(`#bf4040` / `#3d72b8` / `#9545b8`) in both light and dark mode, forever** — bypassing the `--viz-*` token
layer entirely, including the deliberate `D.W4.d` light-mode contrast repair recorded three lines away at
`style.css:113-120` (*"glass-ui ships light `--viz-amber` at hsl(35 70% 42%) ≈ 3.54:1"* → darkened to
`hsl(35 76% 35%)`). The pills are exactly the surface that repair existed to protect.

**The correct idiom is in the same repo, three files away.** `useCoeffHover.ts:64` reads
`VIZ_COLORS.amber` **at render time inside a `computed`**, with a comment naming the hazard —
*"the canonical fallback used when `resolveVizColors` has not yet run (mounted before paint)"*. The author
of that file understood the timing; the author of `basis-display.ts` did not.

**Falsifier.** If `basisDisplay` were a `computed`, a getter map, or re-derived per render, this dies. It is
a module-scope `const` object literal (`basis-display.ts:3-7`) — provably evaluated once.

**Corpus.** `vjs:…/formation/fourier/CENSUS-2026-08-03.md:174` books `colors.ts` as a *"117-line hand-rolled
regex file … no `oklch()` arm"* and the W.L5 deletion target. **I agree and extend:** the census argues the
arms are the wrong *mechanism*; the tree shows that for this component they are additionally **never
executed** — the F.W2 migration must therefore fix the *snapshot*, not merely swap `cssVarToHex` for
value.js's parser, or the pills will stay frozen after the migration lands green.

---

### C-6 · MAJOR · The hand-rolled edge mask is the producer's own **retired** utility, reproducing a defect the producer catalogues by id — while the cure ships in the already-imported bundle.

The component (`:68-74`):

```css
mask-image: linear-gradient(to right, transparent, black 0.5rem,
                            black calc(100% - 0.5rem), transparent);
```

The producer, at the **pinned** 4.0.0, in a stylesheet the app already imports
(`fourier:web/src/style.css:3` → `@import "@mkbabb/glass-ui/styles"`):

```css
/* node_modules/@mkbabb/glass-ui/dist/styles/utilities/base.css:326-328 */
.scroll-fade-mask {
    mask-image: linear-gradient(to right, transparent, black var(--mask-fade-width),
                                black calc(100% - var(--mask-fade-width)), transparent);
}
```

Structurally identical, stop for stop. The only differences: the producer tokenises the ramp
(`--mask-fade-width: 1rem`, `tokens/offsets-sizing.css:26`) where the component hardcodes `0.5rem` — **half
the design-system ramp**, twice, untokenised.

And the producer has **deprecated that recipe by name**:

> `base.css:343-346` — *"`<FadingScroll>`'s recipe. **SUPERSEDES the scroll-BLIND `.scroll-fade-*` masks
> above** (which feathered both edges unconditionally — **the R8-08 "Shy" defect**)."*
>
> `base.css:18-21` — *"`initial-value: 0px` = the SHARP floor: an at-rest, no-overflow edge has NO feather
> (the R8-08 "Shy" defect — the static `.scroll-fade-*` mask **half-erased the first card's chrome at rest**
> — is structurally impossible because the default is sharp and the timeline OPENS the feather only on real
> scroll)."*
>
> `tokens/offsets-sizing.css:18-19` — *"SUPERSEDES `--mask-fade-width` (the scroll-BLIND `.scroll-fade-*`
> static masks' knob). `--mask-fade-width` is RETIRE-COORDINATED."*

This component reproduces R8-08 **exactly and literally**: at `scrollLeft: 0` the leftmost 8px of the first
card is half-erased, and that card carries `border-2` (`GalleryCard.vue:71`) plus — because this is the
*featured* strip, so 100% of its cards match — `border-color: var(--tier-featured)` and
`box-shadow: 0 0 12px …` (`GalleryCard.vue:228-231`). The producer's phrase "half-erased the first card's
chrome" describes this render precisely. Symmetrically the trailing edge stays feathered when fully scrolled
and when there is **no overflow at all** (≤3 featured cards in a wide viewport: nothing to scroll to, both
edges still faded).

The cure is three characters of class list away, already parsed and shipped:
`.fading-scroll--x[data-fade-start][data-fade-end]` (`base.css:366-374`, `:421-439`) drives per-edge
registered `@property` customs off `animation-timeline: scroll(self inline)` — **compositor-side, zero JS on
a supporting engine**, with a documented `useFadingScroll` fallback and a deliberate non-gating under
`prefers-reduced-motion` because *"the fade is a LEGIBILITY cue, not motion"* (`base.css:388-392`). The
component-level wrapper `<FadingScroll axis fadeStart fadeEnd>` is exported at
`@mkbabb/glass-ui/fading-scroll` (`package.json exports`, verified), and its
`constants.d.ts` even ships `SNAP_TOLERANCE = 12` documented as *"absorbing scroll-snap jitter —
`snap-mandatory` parks the active card a few px off the true start"* — i.e. the producer has already solved
the interaction between the mask and `scroll-snap-type: x mandatory`, which this component sets at `:67`
and does not compensate for.

**Falsifier.** "The producer utility isn't available at the pin." It is: measured
`@mkbabb/glass-ui@4.0.0`, `exports["./fading-scroll"] = { types: ./dist/fading-scroll.d.ts, import:
./dist/fading-scroll.js }`, and the `.fading-scroll--*` classes are in
`dist/styles/utilities/base.css`, reached by the app's own `@import` at `style.css:3` — **the bytes are
already in the shipped CSS bundle and are being paid for and not used.**

---

### C-7 · MAJOR · The scroll port clips the focus ring, the hover lift, and the tier glow of every card it contains.

`.featured-scroll` sets `overflow-x: auto` (`:64`) and `padding-bottom: 0.5rem` (`:65`) — **no padding-top,
no horizontal padding**. Per CSS Overflow §3 ("if one of `overflow-x`/`overflow-y` is `visible` and the
other is not, `visible` computes to `auto`"), the port's computed `overflow-y` is `auto` too. So the box
clips vertically at the top with zero slack. What is drawn above the card's border box:

| Effect | Provenance | Overshoot above the card box |
|---|---|---|
| focus indicator | `style.css:139-142` `outline: 2px solid var(--ring); outline-offset: 2px` | 4px |
| hover lift | `GalleryCard.vue:210` `transform: translateY(-4px) scale(1.02)` | 4px + ~1% of height |
| featured tier glow | `GalleryCard.vue:228-231` `box-shadow: 0 0 12px …` | up to 12px |

All three are clipped at the top edge, and the tier glow is the identity signal of the *only* tier this
carousel renders. Horizontally, the first and last cards' outlines fall inside the 8px mask ramp (C-6) and
are feathered toward transparent — the D.W4.c keyboard-accessibility work at `GalleryCard.vue:65-79`
(role/tabindex/keydown/aria-label, explicitly *"Focus ring lands globally via `.gallery-card:focus-visible`
in style.css"*) is therefore delivered into a container that partially erases the ring it depends on. WCAG
2.4.11 *Focus Not Obscured (Minimum)* is at risk at the strip's two ends; 2.4.13 *Focus Appearance* is
degraded throughout by the top clip.

**Falsifier.** Add `padding-block: 4px` (or `padding-top`) and the vertical half dies; the producer's
`.fading-scroll--x` sets only the overflow and leaves padding to the consumer, so the horizontal half needs
the scroll-conditional mask of C-6 to die. Neither mitigation is present.
**UNPROVEN-NEEDS-LIVE (SS-13):** the *pixel* magnitude of the clip needs a rendered frame; the geometry
above is fully static-derivable and is what is claimed.

---

### C-8 · MAJOR · `@mkbabb/glass-ui/carousel` exists at the pin, its peer is already installed, and this file is the shadow.

`lane-frontend.md:439` books the row; I confirm it against the installed tree and remove its only cost
objection.

- `exports["./carousel"]` present at 4.0.0 (measured), exporting
  `Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselPager,
  GlassCarouselPager, useCarousel` + `CarouselApi` (`dist/carousel.d.ts`).
- The implementation is Embla-backed with an `init-api` emit and a `canScrollPrev/canScrollNext/
  scrollPrev/scrollNext/orientation` slot contract (`dist/components/ui/carousel/Carousel.vue.d.ts`,
  `interface.d.ts`).
- **The peer is already installed**: `embla-carousel-vue@8.6.0`, `embla-carousel`, and
  `embla-carousel-reactive-utils` are all present in `fourier:web/node_modules` (hoisted to satisfy
  glass-ui's `peerDependencies["embla-carousel-vue"]: "^8.0"`). Adopting `./carousel` costs **zero new
  dependencies**.

What the hand-roll gives up, concretely, against 91 lines of maintenance: prev/next affordances (the strip
has **no** non-drag, non-wheel way to advance — a trackpad-less mouse user gets only the 4px-tall
`::-webkit-scrollbar` at `:77-79`), pager dots (`./pager-dots` also unimported), `canScrollPrev/Next`
edge-state (the exact state C-6's mask needs and does not have), and Embla's keyboard/RTL/resize handling.

**Falsifier, honoured and partly conceded.** `embla-carousel-vue` is *not* declared in
`fourier:web/package.json` — it resolves only by hoisting, so a strict/pnpm-isolated install would break an
adoption until it is declared. That is a one-line cost, not an objection. Second falsifier: the component's
free-scroll + `scroll-snap` model is not identical to Embla's transform-driven track, so adoption is a
behaviour change, not a drop-in — which is why this is MAJOR and not BLOCKER, and why the *narrower*
`./fading-scroll` adoption (C-6) is the higher-confidence recommendation.

---

## §3 · MINOR

### C-9 · MINOR · A carousel-initiated delete leaves a stale slug in the parent's batch selection.

`handleDelete` (`GalleryView.vue:136-140`) removes the entry and clears `selectedEntry`, but never touches
`selectedHashes`. The only reconcilers are `adminMode → false` and a tab change
(`GalleryView.vue:200-201`), plus `performBatchGallery`'s own clear (`:190`). So: select rows in the grid →
delete a card **from the carousel** → the deleted slug (if it was selected before being featured, per C-4's
unintended path) or simply the surviving selection persists across a list identity that has changed
underneath it. `performBatchGallery` then posts slugs from a stale set (`:180`) and surfaces per-row
`result.errors` as toasts (`:186-188`) rather than preventing the send.
**Falsifier:** a `watch(() => gallery.entries, …)` pruning `selectedHashes` would close it; `grep -n
"selectedHashes" GalleryView.vue` shows five sites, none of which prune.

### C-10 · MINOR · A runtime import declared as a devDependency, on the package glass-ui 7 renames.

`GalleryFeaturedCarousel.vue:4` imports `Crown` from `lucide-vue-next`, which is declared in
`fourier:web/package.json` **devDependencies** (`"lucide-vue-next": "^1.0.0"`), not dependencies. The app is
`private: true` and always bundled, so nothing breaks today — but the declaration is false, and it is false
about the exact package the uplift renames: `lane-frontend.md:478` measures **35 `lucide-vue-next` import
sites** against glass-ui 7's `peerDependencies: {"@lucide/vue": "^1.16.0"}`. This file is one of the 35 (and
`GalleryCard.vue:11-17` is another, with 5 icons). Installed today: `lucide-vue-next@1.0.0` **and**
`@lucide/vue` (present in `node_modules/@lucide/`) — two icon packages resolved side by side.
**Falsifier:** move it to `dependencies`; or if the repo's convention is deliberately dev-only for bundled
apps, note that `reka-ui`, `clsx`, `class-variance-authority` and `tailwind-merge` sit there too — in which
case the finding is a convention note, which is why it is MINOR.

### C-11 · MINOR · The emits still speak the retired vocabulary: `hash` for what is a `slug`.

`:14-16` — `like: [hash: string]`, `"set-tier": [hash: string, …]`, `delete: [hash: string]`. Every payload
is `entry.slug` (`GalleryCard.vue:141, 162, 171, 180`). The tree is otherwise converged: `types.ts:211`
annotates `content_hash` as *"dedup key, **never identity** (§1)"*; `gallery.ts:22-24` defines
`entrySlug()`; the store's own signatures are `setTier(slug: string, …)` (`:138`),
`deleteEntry(slug: string)` (`:150`), `like(slug: string)` (`:188`), `recordView(slug: string)` (`:201`);
and `gallery.ts:16-19` states *"Card identity (`:key`, like/view/delete handlers) routes through `slug` —
the single user-facing handle (§1)."* The leaf/relay layer is the last place the pre-convergence noun
survives — here, in `GalleryInfiniteGrid.vue:18-21`, in `GalleryCard.vue:28-31`, and in `GalleryView`'s
handler params and its four `*Hashes` refs (`:45, :46, :151`, `:72`), none of which hold hashes.
**Falsifier:** if any emit ever carried `content_hash`, the name would be right. None does.

### C-12 · MINOR · Prop optionality diverges from the sibling relay for the same downstream props.

`GalleryFeaturedCarousel.vue:8-9` declares `adminMode?: boolean` and `likedHashes?: Set<string>` **optional**;
`GalleryInfiniteGrid.vue:10-11` declares both **required** — for the identical `GalleryCard` props. Two
relays over one child disagreeing on their contract means the strictness of a card's behaviour depends on
which container it is in. The failure is silent: omit `likedHashes` and `GalleryCard.vue:34`
(`props.likedHashes?.has(…) ?? false`) makes `isLiked` permanently false, so the heart never fills and
`aria-pressed` is permanently `false` — no warning, no type error. (Today `GalleryView.vue:252-253` passes
both, so it is latent.)
**Falsifier:** if the carousel were used elsewhere with a deliberately unauthenticated variant, optionality
would be justified. `grep -rn "FeaturedCarousel" fourier:web/src` → exactly two hits, both
`GalleryView.vue` (`:24` import, `:249` use). There is one call site and it always passes both.

### C-13 · MINOR · The child's `content-visibility` estimate was sized for a vertical grid cell and is imposed on a horizontal port.

`GalleryCard.vue:206` sets `--deferred-section-size: 17rem`, and its own comment (`:199-205`) scopes the
estimate to *"an aspect-[4/3] thumbnail (~11rem **at a ~15rem cell**)"* in the grid. The producer utility is
`content-visibility: auto; contain-intrinsic-size: auto var(--deferred-section-size, 30rem)`
(`glass-ui base.css:477-479`) — a **single** value, applying to both axes. This carousel makes the cell
16rem (`:88`) inside a `display: flex` row (`:62`) whose default `align-items: stretch` couples every item's
height to the tallest. Off-screen-x cards are render-skipped and stand in at 17rem until first paint;
`auto` then caches the real size, so the effect is bounded to the first pass — but during it the strip's
height is driven by placeholders sized for a different layout.
**Falsifier / limit:** the `auto` prefix is explicitly the anti-jump mechanism (`base.css:466-470`:
*"makes the engine REMEMBER the last-rendered size (no scroll-jump on re-entry); plain `<estimate>` freezes
the section + thrashes the scrollbar — the trap this closes"*), so this is a first-paint transient, not a
steady-state defect — hence MINOR. **UNPROVEN-NEEDS-LIVE (SS-13)** for the visible magnitude; the size
mismatch and the axis coupling are static.

---

## §4 · INFO

### C-14 · INFO · The value.js peer range is violated at the pinned pair — latent for this subtree.

Measured: `@mkbabb/glass-ui@4.0.0` declares `peerDependencies["@mkbabb/value.js"] = "^0.10.0 || ^0.11.0"`;
`fourier:web/package.json` declares `^0.13.0` and `0.13.0` is installed. **0.13.0 satisfies neither
disjunct.** This refines `lane-frontend.md:59`, which records the producer peer as `^0.10.0` only — the
installed manifest carries the two-clause range, so the row's conclusion holds and its evidence widens.
Kept at INFO because it is *latent for this component*: I grepped the producer's dist chunks and
`@mkbabb/value.js` appears in exactly three (`aurora.js`, `color-DweYl7pE.js`, `motion-curves.js`) — none of
which are reached by `badge.js`, `button.js`, `checkbox.js` or the root entry that this subtree imports.
That agrees with `CENSUS-2026-08-03.md:73` (*"the 'latent, not live' cross-check holds"*) and with
`:38` (value.js's live surface is 5 easing-only imports in 4 files, none in this subtree).
**Falsifier:** if `Button`/`Badge`/`Checkbox` pulled the color or motion-curves chunk, this would promote to
MAJOR. `grep -o '"@mkbabb/[a-z.]*"' dist/{badge,button,checkbox,index}.js` → empty for all four.

### C-15 · INFO · Redundant double guard.

`:21` `v-if="entries.length > 0"` duplicates the call site's `v-if="featuredEntries.length"`
(`GalleryView.vue:250`). Harmless, and defensible as a self-contained-component habit; noted because it
means the component's empty behaviour is untested from the only call site — the inner guard can never be the
one that fires.

### C-16 · INFO · The carousel's sole child ships two dead imports into every render path.

`GalleryCard.vue:9` imports `VIZ_COLORS` and `:10` imports `PathPreview` — `grep -n "VIZ_COLORS\|PathPreview"
GalleryCard.vue` returns **only those two lines**. Neither is referenced in script or template. `PathPreview`
is a whole SFC dragged into the gallery chunk. The build cannot catch it: `fourier:web/tsconfig.json` sets
`strict: true` but **not** `noUnusedLocals`, and `verbatimModuleSyntax: true` means both value imports are
emitted verbatim. Attributed to `GalleryCard`, inherited by this carousel because it is 100% of what the
carousel renders.
**Falsifier:** enable `noUnusedLocals` (or run `vue-tsc` with it) and both surface; a template reference
anywhere in the file would kill the finding — there is none.

---

## §5 · SUPERLATIVES (L-18 runs both ways — each carries its own falsifier)

### S-1 · Contract-correct identity, first time, no drift.

`:29` `:key="entry.slug"`. Under CRUD-CONTRACT §1 as the tree states it (`types.ts:211` *"dedup key, never
identity"*; `gallery.ts:16-19`), this is the one right answer, and the component reaches it without
comment or ceremony. **Falsifier:** an index key (`v-for="(e, i)"`), a `content_hash` key, or an
`image_slug` key would each break card identity across the refetch that C-3 triggers on every admin action —
and given how often this list is replaced wholesale, an index key here would be a genuine data-corruption
vector (likes and tier badges attaching to the wrong card). None present. This is the *specific* defect that
C-3's churn would have weaponised, and it is absent.

### S-2 · The two-argument emit is relayed correctly, avoiding the shorthand that silently drops data.

`:38` `@set-tier="(h, t) => emit('set-tier', h, t)"`. The neighbouring one-argument relays use the terse
`$event` form (`:37`, `:39`) — correct there — and the author *did not* reflexively write
`@set-tier="emit('set-tier', $event)"`, which type-checks against a loosely-typed emit and drops `tier`
entirely, sending `undefined` into `api.setVisualizationTier`'s `PUT` body (`api.ts:506-516`). The emits are
fully tuple-typed (`:12-17`) including the two-arg case and the `"featured" | "saved" | "normal"` literal
union, which is what makes the mistake catchable at all. **Falsifier:** the sibling
`GalleryInfiniteGrid.vue:39` writes the same arrow — so this is house style, not a one-off. That
strengthens it rather than weakening it: the house style is the correct one.

### S-3 · A genuinely pure presentational relay — the cleanest consumption boundary in the gallery family.

18 lines of script with **zero** store imports, **zero** `api` imports, zero lifecycle hooks, zero refs, zero
`watch`, and one third-party symbol. Contrast the family: `GalleryView.vue` imports the store, the router,
the auth store, the toast composable and `* as api`; `GalleryCard.vue` imports `thumbnailUrl` directly.
This component can be mounted in a test with a literal array and asserted on without a Pinia instance, a
router, or a fetch mock. **Falsifier:** `grep -n "useGalleryStore\|api\.\|onMounted\|ref(" ` over the file →
empty. It is worth saying plainly: **none of the sixteen defects above are in this file's 18 lines of
logic.** Ten are inherited through its child or its data seam; six are in its 45 lines of CSS and its props
declaration.

### S-4 · Scoped styles that never reach into the child.

`:46-91` is `<style scoped>` with `@reference "tailwindcss"` (`:47`), no `!important`, and — notably — **no
`:deep()`**. The component styles its own three boxes and stops at the child's boundary, leaving
`GalleryCard`'s glass-ui-variant contracts (`Button variant="ghost"|"glass"`, `Badge variant="outline"`)
untouched. **Falsifier:** `GalleryCard.vue:292` itself uses `:deep(svg)` to reach into a glass-ui `Button`,
and `.admin-overlay-btn` (`:257-265`) / `.like-btn` (`:279-290`) / `.basis-tint` (`:270-274`) are all scoped
overrides projected over producer variants — so the idiom is available and used one level down, and this
component declined it. `grep -n ":deep\|!important" GalleryFeaturedCarousel.vue` → empty.

---

## §6 · Falsifiers considered and rejected (claims I will *not* make)

1. **"The scroll container is keyboard-inaccessible (WCAG 2.1.1)."** Rejected. A scrollable region needs
   either `tabindex="0"` or focusable descendants; `GalleryCard.vue:70-79` gives every card
   `role="button"` + `tabindex="0"`, so tabbing scrolls the port natively. The real focus defect is C-7
   (the ring is clipped/masked), not reachability.
2. **"The refetch resets `scrollLeft` by remounting card DOM."** Rejected as stated — `:key="entry.slug"`
   (S-1) means Vue patches surviving cards in place. The scroll loss in C-3 comes from the *parent's*
   `v-if` unmounting the port itself, which is a different and provable mechanism.
3. **"`mask-image` clips the cards' hover lift."** Rejected as stated — the gradient is horizontal only and
   uniform vertically, so it cannot clip a vertical translate. The vertical clip in C-7 is the computed
   `overflow-y: auto`, a separate mechanism.
4. **"The component should consume keyframes.js 4.3."** Rejected. It declares no motion at all, so there is
   nothing to migrate; the correct producer target for its one dynamic behaviour is the CSS
   `scroll(self inline)` timeline in C-6, which is deliberately *not* motion-gated
   (`glass-ui base.css:388-392`). Booked as the §0 absence, not as a defect.
5. **"`entries: Visualization[]` is an over-wide prop (30+ fields for a relay)."** Rejected. It relays the
   entity whole to a child that consumes seven of its fields, and `gallery.ts:16-17` states the design
   intent explicitly: *"The gallery presentation components consume the converged `Visualization` entity
   directly — no projection."* Introducing a view-model here would contradict a stated §1 decision.

---

## §7 · What the F.W2 / F.W3 waves must not miss here

1. **C-1 and C-2 are operation-surface holes, not component bugs.** No amount of component work fixes them.
   F.W5 (the shared-provenance API contract) is the natural home for `POST /{slug}/like` + a `tier` filter
   or a dedicated featured operation; until then this component renders two lies. If the mega-tranche
   declines to add the operations, the honest repair is to *remove* the heart from the card and *derive* the
   strip from a bounded, explicitly-fetched set — not to keep shipping both.
2. **C-5 must be fixed as a snapshot bug, not a parser bug.** F.W2's stated plan (`CENSUS:188`, *"delete the
   `colors.ts` hand-rolled arms"*) swaps the *mechanism*. If `basis-display.ts:1-7` still reads the proxy at
   module scope afterwards, the pills stay frozen and the wave will close green on a surface that never
   changed colour.
3. **C-6 is the cheapest real win in the file** and is available **at the pinned 4.0.0** — no uplift, no new
   dependency, no atomic tri-package transaction (`lane-frontend.md:492`). It also removes a hardcoded
   `0.5rem` × 2 in favour of `--fade-scroll-width`, and it retires a pattern the producer has marked
   RETIRE-COORDINATED, which is exactly the relay the standing glass-ui BH/BI edict wants reported upstream.
4. **C-4 is a one-line-plus-one-prop repair** (mirror `GalleryInfiniteGrid.vue:36, 41`) and closes a
   phantom-state class of bug, not merely a dead control.

---

### Tally

| Severity | Ids | Count |
|---|---|---|
| BLOCKER | C-1, C-2 | **2** |
| MAJOR | C-3, C-4, C-5, C-6, C-7, C-8 | 6 |
| MINOR | C-9, C-10, C-11, C-12, C-13 | 5 |
| INFO | C-14, C-15, C-16 | 3 |
| **Defects total** | | **16** |
| SUPERLATIVE | S-1, S-2, S-3, S-4 | **4** |

Corpus rows folded and confirmed: `lane-frontend.md:439` (carousel shadow — confirmed, extended to
`./fading-scroll`), `:478` (lucide rename, 35 sites — this file is one), `:59` (value.js peer — refined to
the two-clause range), `:492` (tri-package atomicity — noted as *not* blocking C-6),
`CENSUS-2026-08-03.md:174` (colors.ts deletion target — confirmed, extended by C-5's freeze),
`:73`/`:38` ("latent, not live" — confirmed by chunk-level measurement, C-14),
`…/GalleryAdminBanner/challenge-L-library.md:108` (the same `refreshAdminStats` churn, from the banner's
side — corroborates C-3 from an independent lane).
No row of `…/intakes/lane-fourier-r3-r6.md` overlaps this component: its 52 adjudicated rows (38 TRUE) are
the R3–R6 harness/control-closure lane (R4-6, R4-7, R5-4 …), with no frontend-leaf coordinates. Nothing to
cite, nothing to contradict.

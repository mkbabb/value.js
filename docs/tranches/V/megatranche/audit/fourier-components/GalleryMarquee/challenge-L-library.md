claude-opus-5[1m]

# CHALLENGE — `GalleryMarquee.vue` · axis **L (LIBRARY)**

**Subject** `fourier-analysis/web/src/components/visualization/gallery/GalleryMarquee.vue` (134 lines, 3 953 bytes)
**Posture** DEFECTIVE-until-proven. Every claim carries severity + `file:line` + its falsifier.
**Method** static + source-derived only. No browser. Live-only claims are tagged **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Import closure read whole** (read-only): `vue` (`computed`), `@/lib/types` (`Visualization`, `GalleryTier`, `Visibility`), `./GalleryCard.vue` → and *its* closure: `@mkbabb/glass-ui/{button,badge}`, `@mkbabb/glass-ui` (`Checkbox`), `@/lib/api` (`thumbnailUrl`), `../lib/basis-display`, `@/lib/colors` (`VIZ_COLORS`), `@/components/ui/PathPreview.vue`, `lucide-vue-next`, and glass-ui's `.deferred-section` utility (`dist/styles/utilities/base.css:477-480`).
**Sole consumer read whole**: `web/src/components/visualization/GalleryView.vue`; sibling hosts `GalleryFeaturedCarousel.vue`, `GalleryInfiniteGrid.vue`; store `web/src/stores/gallery.ts`.

**Tally — defects 22 (BLOCKER 2 · MAJOR 7 · MINOR 11 · INFO 2) · superlatives 4.**

---

## §0 — Corpus fold (hitherto; not re-invented)

| Corpus row | What it said | This challenge |
|---|---|---|
| `formation/fourier/lane-frontend.md:109` | `GalleryMarquee.vue` 134 lines — "SHADOW candidate, §4" | **Confirmed local-forever**, but for a reason the lane did not reach: the component is *unreachable* (L-1). A shadow-vs-local ruling on dead surface is premature. |
| `formation/fourier/lane-frontend.md:440` | `./scrolling-text` (glass-ui 4.0.0) **RETIRED at 5.0.0** ⇒ "uplift makes this permanently local; keep + book" | **Agree on the verdict, contradict the disposition.** "Keep" presumes the code runs. It does not (L-1). The row should read *keep-or-delete pending the L-1 ruling*. |
| `formation/fourier/lane-frontend.md:619,622` | Counts `GalleryMarquee.vue:126-129` as 1 of 8 `prefers-reduced-motion` blocks; quotes its D.W4.c provenance | **Confirmed present** (lines 126-133) and credited as **S-1** — but the guard is *incomplete* (L-6): `animation: none` under `overflow: clip` strands content. |
| `CENSUS-2026-08-03.md:85-86` | "Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock …)" | **Corroborated and extended.** `GalleryMarquee` touches **none** of the three canvases. Its only viz-render-path coupling is `2n` raster `<img>` GETs at `${BASE}/api/images/{image_slug}/thumbnail` (`GalleryCard.vue:100-105` → `lib/api.ts:292-294`). It adds **zero** JS animation clocks — see **S-2**. |
| `CENSUS-2026-08-03.md:100` | "…GalleryMarquee stays local" | Agree; see the two rows above for the qualification. |
| intake `lane-fourier-r3-r6.md` **R5-7** (ADOPT-AS-FACT + CARRY→F.W4) | "template-loop evidence keyed to *component* callsites is blind to native HTML element loops" | **Extended with a second, independently measured subject: `GalleryMarquee` is a 100 %-native-loop component.** See **L-9**. |
| intake `lane-fourier-r3-r6.md` **R6-5/R6-6** | R6 cured R5-7 with a `NATIVE_TEMPLATE_LOOP` family; registry `counts.nativeTemplateLoops: 16` | **Live-tree corroboration of the count, independently derived here: exactly 16.** Classifier walks each `v-for` line back to its nearest opening tag; `web/src/**/*.vue` → **16 native / 16 component / 1 `<template>` = 33 total**. R6's `16` is exact. **GalleryMarquee owns 3 of the 16** (lines 29, 36, 52) — tying `PaperSidebar.vue` (65, 87, 105) as the largest single-file contributor. |
| M-deep-audit `A8-no-legacy-sweep.md:26` (A8-11) / M-critique `A8-06` | `!important` on `animation-play-state` | **Still present, unfixed** — `GalleryMarquee.vue:99`. Re-raised as **L-13**. |
| M-critique `E5-12` | "`will-change: transform` without containment — compositor layer leak" | **Still present, unfixed** — line 95. Re-raised as **L-12** with the added observation that it is also *redundant*. |
| D-audit `DA-design-A3-gallery-admin.md:40` (#1, P1) | "Two orphan components ship dead … **Do not leave shipped-but-unreachable.**" | **THE CENTRAL CONTRADICTION.** `docs/tranches/D/FINAL.md:18` records this as **Met** ("`GalleryMarquee` mounted as empty-state band + CTA"). It is **not** met: the mount D.W4 added (`2e4a452`) is logically unreachable. The finding it claims to close is still open, now disguised as a live mount. **L-1.** |
| D-audit `DA-design-A3` #9 (P3) | marquee has no PRM guard | **Cured** (S-1). |

---

## §1 — BLOCKERS

### L-1 · BLOCKER · The mount is logically unreachable — the component is dead surface, and the close-record that claims otherwise is false

**Provenance**

- `GalleryView.vue:64-66` — `const featuredEntries = computed(() => gallery.entries.filter((e) => e.tier === "featured"));`
- `GalleryView.vue:266` — outer empty-state guard: `v-if="!gallery.entries.length && !gallery.loading"`
- `GalleryView.vue:269-271` — the *only* mount: `<GalleryMarquee v-if="featuredEntries.length >= 4" :entries="featuredEntries" …>`
- `GalleryMarquee.vue:27` — the component's own second guard: `v-if="entries.length >= 4"`

**The proof.** `featuredEntries` is a strict filter of `gallery.entries`, so `featuredEntries.length ≤ gallery.entries.length` — unconditionally. The outer guard admits the subtree only when `gallery.entries.length === 0`. Therefore inside that subtree `featuredEntries.length === 0`, and `0 >= 4` is false. **`GalleryMarquee` has zero reachable mounts in the shipped tree.** Both guards then fire redundantly: even were `v-if` at :270 removed, :27 would reject the empty array.

**Single-source check (closes the obvious escape).** `web/src/stores/gallery.ts` exposes exactly one entry list — `entries = ref<Visualization[]>([])` (:30), assigned only at :95 (`entries.value = result.items.filter(v => v.deleted_at == null)`) and :74/:85/:170-171/:182. `grep -n featured web/src/stores/gallery.ts` returns **one** line (:33, the unrelated `tierFilter` union). There is no separate featured fetch, no second list, no route-level injection.

**Failure scenario.** A visitor loads `/gallery` on a database with 40 featured visualizations. `gallery.entries.length === 40` ⇒ the empty-state `<div>` at :266 never renders ⇒ the marquee never renders. A visitor loads `/gallery` on an empty database ⇒ `featuredEntries.length === 0` ⇒ the marquee never renders. There is no third case.

**Git provenance.** `2e4a452 feat(D.W4): design refinement — … gallery orphans …` added the import (`GalleryView.vue:26`) and the mount; the diff shows the enclosing `<div v-if="!gallery.entries.length && !gallery.loading">` was **pre-existing context**, unchanged. The wave inserted a `featuredEntries.length >= 4` gate inside an `entries.length === 0` region and shipped. The wave's own comment (`GalleryView.vue:259-264`) reasons carefully about the cold-empty case — *"a true cold-empty DB renders the CTA alone"* — without noticing that cold-empty is the **only** case.

**Falsifier (and why it fails).** This claim dies if any of: (a) a second mount exists — `grep -rn GalleryMarquee` over the whole repo returns exactly 3 hits, all in `GalleryView.vue` (import :26, comment :259, mount :269); (b) `featuredEntries` draws from a source other than `gallery.entries` — it does not (:64-66); (c) `gallery.entries` can be non-empty while `.length` is falsy — it is a plain `ref<Visualization[]>`; (d) the outer `<div>` is rendered by something other than its `v-if` — it is not. None hold.

**Consequence for the axis.** Every finding below is *latent*: it cannot injure a live user today, and it survived four audit passes (D, G, M, M-critique) precisely because no reviewer ever saw the thing move. L-2 is what a cure of L-1 would ship.

---

### L-2 · BLOCKER · The seamless-loop invariant is unsatisfiable — the `-50%` travel is 8 px short of the tiling period, *and* the root's shrink-to-fit sizing guarantees a blank gutter of exactly half the band

**Provenance** — `GalleryMarquee.vue:91-96` (`.marquee-inner { display:flex; gap:1rem; width:max-content }`), `:110-114` (`.marquee-item { width:220px }`), `:116-124` (`translateX(0) → translateX(-50%)`), `:34-66` (two sibling `v-for` blocks flattening into the **same** flex container), `GalleryView.vue:265-268` (parent: `class="flex flex-col items-center …"`).

**(a) The 8 px shortfall — exact, `n`-independent.** Let `n` = per-track length, `w = 220px`, `g = 16px`. The two `v-for` blocks at :36 and :52 emit **`2n` sibling `.marquee-item` elements into one flex row** (a `v-for` fragment creates no element), so:

```
W  = inner border-box width = 2n·w + (2n−1)·g = 472n − 16
travel(−50 %)                = W/2            = 236n − 8      ← % resolves against the element's own border-box
true tiling period           = n·(w + g)      = 236n
shortfall                    = 236n − (236n − 8) = 8 px, for every n
```

The `gap` between item `n−1` (last of copy 1) and item `n` (first of copy 2) belongs to the row, not to either copy, so `W/2` bisects that gap instead of spanning it. Every 45 s / 50 s the strip **snaps 8 px**. Cure shape: `translateX(calc(-50% - 0.5rem))`, or wrap each copy in its own flex child so the seam gap lives inside a copy, or `gap: 0` + per-item margin.

**(b) The blank gutter — structural, not a tuning miss.** The seamless illusion additionally requires that the *second* copy still cover the viewport at end-of-cycle: `V ≤ 236n − 8`, where `V` is `.marquee-track`'s content width. The component root `.marquee-container` (:27, :73-78) is a flex item of a parent carrying `items-center` (`GalleryView.vue:267`), so it receives `align-self: center` ⇒ **shrink-to-fit**: `V = min(max-content, available) = min(472n − 16, A)`.

- If `A ≥ 472n − 16` (any desktop): `V = 472n − 16`, and `472n − 16 > 236n − 8 ⟺ 236n > 8`, true for every `n ≥ 1`. The band goes blank across **`236n − 8` px — exactly half its own width — at the end of every cycle.** At the shipped threshold (`entries = 4`, `n = 2`): band 928 px, 464 px blank.
- If `A < 472n − 16` (narrow viewports): `V = A`; broken iff `A > 236n − 8`. At `n = 2` that is any viewport wider than 464 px.

So the marquee tiles only on a ≤464 px-wide viewport at the minimum entry count — and even there it still snaps 8 px (a).

**(c) The `>= 4` threshold is provably the wrong constant.** Should a cure of L-1 also give the root `width: 100%` (making `V = A`), seamlessness would need `n ≥ (A + 8)/236` — at `A = 1400 px`, `n ≥ 6`, i.e. **`entries.length ≥ 12`**, three times the shipped gate at :27 and `GalleryView.vue:270`.

**(d) Corollary — the 3 rem mask fade eats the end cards.** Under shrink-to-fit the mask (`:85-88`) has its `black 3rem … calc(100% − 3rem)` stops landing on the first/last **content**, not on empty gutter, so the outermost cards render permanently at partial alpha.

**Falsifier.** Dies if: `translateX` percentages resolved against the *containing block* rather than the element's own border box (CSS Transforms §3: they resolve against the element's own border box — they do not); or if the two `v-for` blocks produced separate flex children (Vue fragments do not); or if `.marquee-item` widths were content-derived and unequal (they are a fixed `220px`, :112); or if the parent were `items-stretch`/the root had an explicit width (it is `items-center`, `GalleryView.vue:267`, and the root sets none). Marked **PROVEN-BY-CONSTRUCTION** for the arithmetic; the visual reading of (b)/(d) is **UNPROVEN-NEEDS-LIVE (SS-13)** only in the sense that no one has watched it.

---

## §2 — MAJOR

### L-3 · MAJOR · Fixed durations over variable content width ⇒ scroll speed scales linearly with entry count; at the shipped minimum the marquee is functionally static

`:103` `45s` / `:107` `50s`, `linear`, against a travel of `236n − 8` px (L-2a).

```
speed(left)  = (236n − 8)/45  px/s      n=2 → 10.1 px/s   n=25 → 130.9 px/s
speed(right) = (236n − 8)/50  px/s      n=2 →  9.1 px/s   n=25 → 117.8 px/s
```

At the component's own admission threshold (`entries = 4` ⇒ `n = 2`), the "living preview band" advances **≈10 px per second** — one 220 px card takes 23 s to pass. The stated purpose (`GalleryView.vue:259-261`, *"a living preview of what the gallery becomes"*) is not met at the only entry count the guard admits. At 50 featured entries it is a blur. **Falsifier:** dies if the durations were `calc()`-derived from content width or set from JS — they are two hard-coded literals with no `--` token indirection (`:102-108`). Speed is a *distance/time* ratio and the distance is `n`-dependent by construction.

### L-4 · MAJOR · `aria-hidden="true"` over a subtree of focusable controls — `n` phantom tab stops per track

`:55` puts `aria-hidden="true"` on the duplicate `.marquee-item`, whose subtree is a full `GalleryCard`: root `role="button" tabindex="0"` (`GalleryCard.vue:71-79`) plus a `<Button class="like-btn">` (`:138-148`) and, in admin mode, three more `<Button>`s (`:167-192`) and a `Checkbox` (`:91-96`). ARIA 1.2 forbids `aria-hidden="true"` on an element that is focusable **or an ancestor of one**; axe-core `aria-hidden-focus` fails on exactly this shape. **Failure scenario:** a keyboard user tabs through the marquee; every second card is a stop that AT announces as nothing, on content that (per L-6) may not even be scrolled into view. Correct mechanism is `inert` (which removes focusability and is what the author's instinct wanted), not `aria-hidden`. **Falsifier:** dies if the duplicate subtree contained no focusable element — `GalleryCard.vue:71-79` sets `tabindex="0"` unconditionally.

### L-5 · MAJOR · Admin multi-select renders in the marquee and is structurally inert — the drift the copy-paste at L-10 produced

`GalleryCard` declares `selected?: boolean` (`:23`) and `"toggle-select": [hash: string, checked: boolean]` (`:31`), and renders the checkbox on `v-if="adminMode"` (`:86-97`) with `:model-value="selected ?? false"` and `@update:model-value="(v) => emit('toggle-select', entry.slug, v === true)"`.

`GalleryMarquee` binds **neither** — `:40-48` and `:57-65` forward only `entry`, `admin-mode`, `liked-hashes`, and four listeners. `GalleryView.vue:272` passes `:admin-mode="gallery.adminMode"`, so in admin mode the marquee renders a fully-styled checkbox that (i) is controlled by an always-`false` prop and (ii) emits into a declared-but-unlistened event that Vue drops (declared in `defineEmits`, so it does not even fall through as an attribute). The wrapper's `@click.stop` (`GalleryCard.vue:90`) additionally suppresses the card-open, so the click does *literally nothing*. Contrast `GalleryInfiniteGrid.vue:34,39` which forwards both correctly. **Falsifier:** dies if `adminMode` could never be true here (`GalleryView.vue:272` passes the live store flag) or if Vue propagated undeclared-listener emits (it does not for events in `defineEmits`).

### L-6 · MAJOR · The reduced-motion branch strands content permanently — `animation: none` under `overflow: clip`

`:129-133` sets `.marquee-inner { animation: none }`; `:81` sets `.marquee-track { overflow: clip }`. Per CSS Overflow 3, `clip` — unlike `hidden` — **does not create a scroll container**: the box is not programmatically scrollable, and a focused descendant cannot be scrolled into view because there is no scrollport. With the animation removed, everything beyond the first `V` px of a `472n − 16` px row is **unreachable by any means** — no scroll, no drag, no keyboard, no `scrollIntoView`. Simultaneously the `aria-hidden` duplicate copy (:51-66) remains *visually* present, so a sighted reduced-motion user sees each card twice while reaching roughly half of them.

**Failure scenario.** `prefers-reduced-motion: reduce`, 20 featured entries, 1400 px viewport: the row is 4 704 px wide, clipped at 1400 px; cards 7…20 of track 0 exist in the DOM, are tab-reachable (L-4), and can never be seen. Cure shape: under the PRM media block also `display: none` the `[aria-hidden]` copy and swap `overflow: clip` → `overflow-x: auto` (the exact idiom the sibling `GalleryFeaturedCarousel.vue:57-59` already ships). **Falsifier:** dies if `overflow: clip` were scrollable (spec says no) or if the PRM block hid the duplicate (it does not — it touches only `animation`).

### L-7 · MAJOR · `GalleryTier` re-declared inline — a named `inv-26` "one contract source of truth" violation

`:15` — `"set-tier": [hash: string, tier: "featured" | "saved" | "normal"]`. The alias exists and is exported: `web/src/lib/types.ts:96` `export type GalleryTier = "featured" | "saved" | "normal";`, and `Visualization.tier?: GalleryTier` (`:232`). `types.ts:197-203` states the governing rule in its own words: *"(Folded here from `api.ts` under **inv-26: one contract source of truth**…)"*.

Repo-wide the literal is re-typed **9 times** outside its definition: `GalleryMarquee:15`, `GalleryCard:29`, `GalleryFeaturedCarousel:15`, `GalleryInfiniteGrid:19`, `GalleryCardModal:28`, `GalleryView:132`, `GallerySearchBar:17,24`, `stores/gallery.ts:33`. **Failure scenario:** the backend adds a `pinned` tier (`Visualization.pinned?: boolean` at `types.ts:233` shows the axis is already growing); `GalleryTier` is widened in one place and **nine** call sites silently keep the stale narrow union — the type system reports success while the emit contract lies. **Falsifier:** dies if the inline union and `GalleryTier` were not identical, or if `GalleryTier` were unexported — both false.

### L-8 · MAJOR · The whole emit/prop surface names slugs "hash", contradicting the identity contract it is derived from

`:9` `likedHashes?: Set<string>`, `:14` `like: [hash: string]`, `:15` `"set-tier": [hash: string, …]`, `:16` `delete: [hash: string]`. Every payload is in fact a **slug**: `GalleryCard.vue:143,153,163,173` all emit `entry.slug`; `GalleryCard.vue:51` computes `likedHashes?.has(props.entry.slug)`; `stores/gallery.ts:170,193,207` all resolve by `entrySlug(e) === slug`. `types.ts:210-213` states the rule the naming violates verbatim: *"`slug` is the one user-facing identity (the URL handle, per §1 single-slug rule); `content_hash` is a non-identity dedup key … `content_hash: string; // dedup key, never identity (§1)`"*.

**Failure scenario.** A future contributor reads `like: [hash: string]`, wires `entry.content_hash`, and the emit type-checks (both `string`) while the store's `findIndex(e => entrySlug(e) === slug)` silently misses — a no-op like with no error. The type is `string` in both roles, so nothing catches it. Cure shape: rename to `slug`, or brand (`type VisualizationSlug = string & { __slug: true }`) — value.js's own L-tranche `SessionToken`/`UserSlug` brands are the precedent. **Falsifier:** dies if any consumer actually passes a hash — none do; `grep` for `content_hash` across `web/src/components/visualization/gallery/` returns zero hits.

### L-9 · MAJOR (audit-model) · R5-7 class: `GalleryMarquee` is a **100 %-native-loop** component — zero component-callsite loops, three native `div v-for`s, 3 of the repo's 16

Intake row **R5-7** (ADOPT-AS-FACT, CARRY→F.W4): *"template-loop evidence keyed to component callsites is blind to native HTML element loops"*; **R6-5/R6-6** cured it with `NATIVE_TEMPLATE_LOOP` and `counts.nativeTemplateLoops: 16`.

**Independent live-tree re-derivation (this challenge).** Classifying every `v-for` in `web/src/**/*.vue` by walking back to the nearest opening tag: **16 native · 16 component · 1 `<template>` · 33 total** — R6's `16` is **exact**, corroborated a second time and on a second subject.

`GalleryMarquee`'s three loops are all native `<div>` (`:29` `(track, tIdx) in tracks`, `:36` `entry in track`, `:52` `entry in track`) and it has **no** component-hosted loop at all. Under the R5-era deriver its `instance.loop.*` leaf would be literally `[]` — the identical pathology as `instance.loop.paper-sidebar`. It ties `PaperSidebar.vue` (65, 87, 105) as the largest single-file share of the 16 (18.8 % each).

**The extension R5-7 did not reach — the *instance* denominator, not just the loop leaf.** `GalleryMarquee` mounts `GalleryCard` at exactly **two** static callsites (`:40`, `:57`). At runtime those two expand to **`2n`** live instances. Any instance derivation keyed to component callsites therefore reports `2` where the DOM holds `2n` (n = ⌈entries/2⌉ per track ⇒ `2·entries` cards total across both tracks). **Failure scenario for F.W4:** a per-component D/L/C audit that sizes render cost, a11y surface, or image-request count from callsite counts will size this component at 2 cards when it mounts 2·`entries` — and will therefore never surface L-4 (n phantom tab stops), L-6 (unreachable card population), or the `2n` thumbnail `<img>` count. **Falsifier:** dies if a Vue `v-for` on a component tag were present here (`grep -n "v-for" GalleryMarquee.vue` → 29, 36, 52, all `<div>`), or if the repo native count were ≠ 16 (measured: 16).

---

## §3 — MINOR

### L-10 · MINOR · A 20-line card invocation duplicated verbatim — the mechanism that produced L-5

`:35-49` and `:51-66` are byte-identical but for `:key` and `aria-hidden`. That block is ~44 % of the template. Every future `GalleryCard` prop or emit must be added twice — and demonstrably was not: `selected` / `toggle-select` reached `GalleryInfiniteGrid` and neither copy here (**L-5**). Cure shape: one loop over `[...track, ...track]` keyed `` `${i}-${entry.slug}` `` with `:inert="i >= track.length || undefined"` (which also cures L-4). **Falsifier:** dies if the two blocks differed materially — a diff of :40-48 vs :57-65 is empty.

### L-11 · MINOR · The mask's position/size geometry is inert, and its rationale comment is false

`:84-88` — `mask: linear-gradient(to right, …) 0 -50% / 100% 200%` under the comment *"Horizontal-only fade: tall vertical extent keeps top/bottom unclipped."* The `mask` **shorthand** resets `mask-repeat` to its initial `repeat`; with a repeating tile the box is fully covered regardless of position, and because the gradient varies only along `x`, every tile row is identical — the `0 -50%` offset and the `200%` height are **no-ops**. Rendering is bit-identical to `mask: linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent)`. Worse, the comment attributes vertical *clipping* to the mask; the actual clipper is `overflow: clip` at `:81`, which the mask cannot influence. Dead declaration + a false rationale that will mislead the next reader. **Falsifier:** dies under `mask-repeat: no-repeat`, where the geometry becomes load-bearing — the shorthand at :85 and :87 sets no repeat value, so the initial `repeat` applies.

### L-12 · MINOR · `will-change: transform` is permanent, uncontained **and redundant** (folds M-critique E5-12)

`:95` on `.marquee-inner`, an element of `width: max-content` = `472n − 16` px with no `contain`. E5-12 flagged the unbounded composited layer; the addition here is that the declaration is also **unnecessary**: `.marquee-inner` is the target of a running `transform` animation (:103, :107), and UAs promote animated transforms automatically for the animation's lifetime — `will-change` only extends the promotion to the idle state, which for an `infinite` animation never occurs. It is pure cost. At 50 featured entries the layer is ~11.8 k px wide. **UNPROVEN-NEEDS-LIVE (SS-13)** for the VRAM figure; the width arithmetic is exact. **Falsifier:** dies if the element were not continuously animated — `:103`/`:107` are `infinite`.

### L-13 · MINOR · `!important` cascade hammer, unfixed since M (folds A8-11 / A8-06)

`:98-99` `.marquee-track:hover .marquee-inner { animation-play-state: paused !important; }` — needed only because `.marquee-left .marquee-inner` (:102) and `.marquee-right .marquee-inner` (:106) tie it on specificity (0,2,0). Two audits proposed the same cure (specificity lift, or a `--play` custom property read by `animation-play-state: var(--play)`); neither landed. **Falsifier:** dies if the hover rule out-specified the direction rules — both are class-class, identical specificity, and the direction rules come later in source order.

### L-14 · MINOR · Pause on `:hover` only — no `:focus-within`

`:98`. A keyboard user who tabs onto a card gets a focus ring that slides out from under them at 10–130 px/s (L-3) while the pointer-user gets a stable pause. Cure is one selector: `.marquee-track:hover .marquee-inner, .marquee-track:focus-within .marquee-inner`. **Falsifier:** dies if the cards were not focusable — `GalleryCard.vue:73` sets `tabindex="0"`.

### L-15 · MINOR · Index-parity distribution makes every delete re-parity the tail across track containers

`:19-23` — `props.entries.forEach((e, i) => result[i % 2].push(e))`. Removing entry `k` shifts every later entry's parity, so all `entries.length − k` following cards **swap tracks**. Because the two tracks are different DOM parents with different `v-for` fragments, slug keys cannot move nodes across them: Vue unmounts and remounts each. **Failure scenario:** an admin deletes the second of 30 featured entries (`GalleryView.vue:137-141` → `stores/gallery.ts:170-171 splice`); 28 `GalleryCard` instances are destroyed and recreated, 56 counting the duplicate copy, each re-issuing its thumbnail `<img>`; both tracks' widths change, so the in-flight `-50%` animations retarget mid-cycle. Cure shape: split by halves (`slice`) or derive parity from a stable per-entry key. **Falsifier:** dies if the tracks shared a parent fragment (they do not — `:28-33` is the per-track element) or if entries were append-only (`stores/gallery.ts:171` splices, `:182` unshifts).

### L-16 · MINOR · Inline arrow listeners recreated per card per render

`:46` and `:63` — `@set-tier="(h, t) => emit('set-tier', h, t)"` allocates a fresh closure for each of the `2n` cards on every re-render, defeating VNode listener caching and forcing a props patch on each card. The sibling handlers at `:45,47,62,64` use the `$event` form for the same purpose, so the file carries two idioms for one job. `GalleryInfiniteGrid.vue:38-40` carries a third spelling (`(hash, tier) =>`). Cure: a single named `forward` helper in `<script setup>`, or `v-bind` of a memoised handler map. **Falsifier:** dies if Vue hoisted these — inline arrows referencing loop-scoped `emit` are not static-hoistable; only cache-able via `cacheHandlers`, which arrow-with-args defeats.

### L-17 · MINOR · Dead generality around a hardcoded 2, spelled three ways

`:20` `const result: Visualization[][] = [[], []]` fixes the track count at 2; `:21` `i % 2`; `:32` `tIdx % 2 === 0 ? 'marquee-left' : 'marquee-right'` — over an array whose length is *known* to be 2, so `tIdx % 2 === 0` is exactly `tIdx === 0`. The magic `2` appears in three places with no shared constant; changing to 3 tracks requires editing all three plus adding a keyframe pair. `:30` `:key="tIdx"` is an index key (harmless only because the collection is fixed-length and positional). **Falsifier:** dies if `tracks` could vary in length — `:20` allocates a 2-element literal and never grows it.

### L-18 · MINOR · The `>= 4` threshold is a magic number duplicated across a module boundary

`GalleryMarquee.vue:27` and `GalleryView.vue:270` both encode `>= 4`, and `GalleryView.vue:262-264` documents its belief about the *other* file's guard. Neither is exported; both are wrong (L-2c). Cure: export one `MIN_MARQUEE_ENTRIES` (or drop the caller's copy entirely and let the component self-guard). **Falsifier:** dies if the two were intentionally different thresholds — the comment at `GalleryView.vue:262-264` states they are meant to be the same rule.

### L-19 · MINOR · Two dead imports in the sole imported component — and a lint gate that did not catch them

`GalleryCard.vue:9` `import { VIZ_COLORS } from "@/lib/colors";` and `:10` `import PathPreview from "@/components/ui/PathPreview.vue";` — `grep -n "VIZ_COLORS\|PathPreview"` over the file returns **only those two lines**. Neither symbol appears in the template or script. `PathPreview.vue` is a whole SFC held alive by a stale edge. That both survive means `noUnusedLocals`/`eslint no-unused-vars` is not enforced over `<script setup>` in this project — a gate hole worth more than the two lines. **Falsifier:** dies if either symbol were referenced (it is not) or if `<script setup>` exposed imports to the template implicitly *and* the template used them (it does expose, and does not use).

### L-20 · MINOR · Relative timestamps in the card are computed once per render with no ticker

`GalleryCard.vue:53-61` — `timeAgo(iso)` reads `Date.now()` inside a plain function invoked from the template (`:110`). It is not reactive and no interval refreshes it. In the marquee a card can live for an entire session; "just now" stays "just now" indefinitely, and only an unrelated re-render (a like, an admin action) corrects it. This is the *absence* of a leak-producing timer, so the trade is defensible — but it is undocumented and silently wrong. **Falsifier:** dies if a clock ref existed — `grep -n "setInterval\|useNow\|useTimeAgo" GalleryCard.vue` returns nothing.

---

## §4 — INFO

### L-21 · INFO · `content-visibility: auto` cards inside a continuously translating row — first-cycle height wobble + per-cycle relevance churn

`GalleryCard.vue:71` applies glass-ui's `.deferred-section` (`base.css:477-480`: `content-visibility:auto; contain-intrinsic-size: auto var(--deferred-section-size, 30rem)`) with `--deferred-section-size: 17rem` (`GalleryCard.vue:206`). Inside the marquee this is a different regime from the grid it was tuned for (`GalleryCard.vue:198-205` cites "the gallery grid item"):

- Width is safe: `.marquee-item { width: 220px }` (`:112`) makes `.marquee-inner`'s `max-content` deterministic, so a skipped card cannot perturb the row width (and therefore cannot perturb the `-50%` travel).
- Height is not: while skipped, size containment substitutes 17 rem = 272 px; the rendered card is ≈250 px (4∶3 thumbnail at 220 px ≈ 165 px + header/pills/footer). The `auto` prefix makes the engine remember the real size after first paint, so the wobble is first-cycle only — as glass-ui's own comment promises (`base.css:465-469`).
- Every card crosses the viewport boundary twice per cycle, so relevance toggles continuously for the life of the page. glass-ui documents the `contentvisibilityautostatechange` hook for exactly this (`base.css:473-477`); nothing here wires it (the component has no lifecycle at all — see S-4).

**UNPROVEN-NEEDS-LIVE (SS-13)** for the wobble magnitude and any jank. **Falsifier:** dies if `contain-intrinsic-size` used the non-`auto` form (it does not) or if `.marquee-item` sized from content (it does not).

### L-22 · INFO · Off the canvas render path entirely; `2n` raster GETs

Per `CENSUS-2026-08-03.md:85-86` (Canvas2D ×3, WebGL/WebGPU absent), `GalleryMarquee` touches none of the three canvases. Its only viz coupling is `GalleryCard.vue:100-105` → `lib/api.ts:292-294` `${BASE}/api/images/{image_slug}/thumbnail`, instantiated **`2n` times** (the duplicate copy doubles the `<img>` count; UAs share the decoded bitmap for identical URLs, so the cost is DOM/layout, not network). `loading="lazy"` is set (`GalleryCard.vue:104`) but is largely defeated inside `width: max-content` — all `2n` images are laid out at mount, and lazy-load relevance is then driven by the transform. **Falsifier:** dies if any `getContext`/WebGL call existed in the import closure — `grep -rln "getContext\|WebGL" web/src` returns four files, none of them in this closure.

---

## §5 — SUPERLATIVES (L-18 runs both ways)

### S-1 · The reduced-motion guard is correct, minimal, and carries its own provenance

`:126-133`. Three lines of CSS, `animation: none`, in a `@media (prefers-reduced-motion: reduce)` block, above a comment that names the wave, the WCAG criterion, and the audit finding it discharges: *"D.W4.c — prefers-reduced-motion guard. WCAG 2.3.3 / A3 #9 finding."* It is one of only 8 PRM blocks in the repo (`lane-frontend.md:619`) and was cited by `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:3563` as, at the time, *the only* PRM handling in the codebase — the seed the rest grew from. **Falsifier (honoured):** it is incomplete — L-6 shows `animation: none` under `overflow: clip` strands content, and the duplicate copy stays visible. The superlative is the discipline and the citation, not the completeness.

### S-2 · The animation shape is the compositor-safe recipe, and it adds no fourth clock to the viz render path

`:98-124`. Only `transform` is animated — no `left`, no `margin`, no layout-affecting property — so the two loops run entirely off the main thread; hover-pause is a pure CSS state change; the direction split (45 s left / 50 s right) uses coprime-ish durations so the two tracks never phase-lock. Cited as an exemplar in `docs/audits/runs/2026-06-01-modern-web/fourier.md:38` (*"CSS containment carousel marquee with prefers-reduced-motion + hover-pause — transform-only keyframes"*). Structurally important on this axis: `CENSUS-2026-08-03.md:85-86` records three independent Canvas2D surfaces, one driven by *a store rAF clock*; this component introduces **zero** rAF loops, timers, or observers, so it cannot contend with them. **Falsifier (honoured):** `will-change` (L-12) and `content-visibility` churn (L-21) each re-import main-thread cost the recipe was chosen to avoid.

### S-3 · Two correct instincts, both reached for with the wrong tool

`:27` is a genuine self-defending render precondition — the component refuses to render a degenerate marquee rather than trusting its caller (and the caller's own guard at `GalleryView.vue:270` is therefore redundant, not necessary). `:55` `aria-hidden="true"` shows the author correctly identified the second copy as decorative and reasoned about screen-reader duplication *before* anyone asked. **Falsifier (honoured):** the threshold is provably the wrong constant (L-2c) and `aria-hidden` is the wrong mechanism for a focusable subtree — `inert` is (L-4). Both defects are one token from correct, which is the strongest possible statement about the author's model of the problem.

### S-4 · Nothing to leak — Goldilocks size, zero lifecycle, zero teardown surface

134 lines: 24 script / 45 template / 63 style. The entire script is one `defineProps`, one `defineEmits`, and one 5-line `computed`. **`grep` for `onMounted|onUnmounted|onBeforeUnmount|addEventListener|requestAnimationFrame|setInterval|setTimeout|IntersectionObserver|ResizeObserver|watch(` over the file returns nothing** — the component registers no listener, no observer, no timer, no animation frame, and therefore has **no teardown obligation to get wrong**. The distributor at `:19-23` is a single O(n) pass with two allocations, and it reads `props.entries` *inside* the `computed` rather than destructuring, so no reactivity is lost. On the leaks/teardown and module-size sub-axes this component is clean by construction — which is exactly why every defect above is a *contract* or *arithmetic* defect and not a lifecycle one. **Falsifier (honoured):** clean teardown is cheap when the component does nothing; the permanent `will-change` layer (L-12) is the one resource it does hold, and it holds it for the document's lifetime.

---

## §6 — Disposition

1. **L-1 is a ruling, not a fix.** Either the marquee earns a reachable mount (the `GalleryFeaturedCarousel` already occupies the non-empty featured band, so the marquee needs a distinct home) **or** it is deleted and `D/FINAL.md:18` is corrected. Shipping a third state — an unreachable mount that reads as live — is precisely what `DA-design-A3` #1 forbade.
2. **L-2 gates any revive.** Curing L-1 without L-2 ships a band that goes half-blank every 45 s and snaps 8 px per cycle. The two must land together.
3. **L-9 gates F.W4's method, not this component.** Per-component instance denominators must count native template loops *and* multiply callsites by loop cardinality, or the marquee's `2·entries`-card population reports as 2.
4. **L-7 / L-8 are repo-wide and cheap.** One `GalleryTier` import across 9 sites; one `hash`→`slug` rename across the four gallery hosts. Both are mechanical and both close a stated precept (`inv-26`, CRUD-CONTRACT §1).
5. **L-13 / L-12 are third-time-of-asking.** A8-11 (M-deep) and E5-12 (M-critique) both proposed cures; neither landed. If the megatranche does not either fix or formally decline them, they will appear a fourth time.

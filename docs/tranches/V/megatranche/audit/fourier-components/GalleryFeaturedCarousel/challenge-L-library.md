served-model-id: `claude-opus-5[1m]`

# CHALLENGE — `GalleryFeaturedCarousel.vue` · axis **L (LIBRARY)**

- **Subject**: `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GalleryFeaturedCarousel.vue` (91 lines: 18 script · 25 template · 45 style)
- **Substrate**: fourier-analysis `HEAD = cd26c6533adc32dfe1453d74117d3cb73b89ea16`. `git status --porcelain` on the subject and on its one component import (`GalleryCard.vue`) → **clean** (neither is among the 24 in-scope dirty paths of intake row `R4-9`). Every line number below is HEAD-true.
- **Method**: static + source-derived only. No browser. Three measurements were *executed* (they are not readings): (a) the SFC template was compiled with the repo's own `@vue/compiler-sfc` to settle handler-caching, (b) all 33 `v-for` sites in `web/src` were classified native-element vs component-hosted for the R5-7 test, (c) all 35 `@reference`-carrying SFCs were partitioned by whether their style block uses a Tailwind feature. Claims that need a live engine are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
- **Import closure read whole** (read-only): `GalleryCard.vue` (309) → `@/lib/types` (`Visualization`), `@/lib/api` (`thumbnailUrl`), `../lib/basis-display` → `@/lib/colors`, `@/components/ui/PathPreview.vue`, glass-ui `./button` `./badge` root `Checkbox`, `lucide-vue-next`. Consumer read whole: `GalleryView.vue` (442) + `stores/gallery.ts`. Siblings read for contract comparison: `GalleryInfiniteGrid.vue` (54), `GalleryMarquee.vue` (134). Producer read: `@mkbabb/glass-ui@4.0.0` `dist/…/FadingScroll.vue.d.ts`, `dist/carousel.d.ts`, `dist/styles/utilities/base.css`, `dist/styles/tokens/shadow.css`.
- **Corpus folded** (not re-invented): `formation/fourier/lane-frontend.md` (§4 candidate-shadow table :439; component table :112), `formation/fourier/CENSUS-2026-08-03.md` §3a (FE §4/§5/§6), `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R5-7**, **R6-5**, **R6-6**, **R3-12**, **R4-9**. Fourier's own prior audits are cited where this challenge *sharpens* or *contradicts* them.

---

## §0 — Verdict

**DEFECTIVE.** 16 defects · **1 BLOCKER** · 5 MAJOR · 8 MINOR · 2 INFO · 5 superlatives · 5 falsified hypotheses.

The component is small, leak-free and correctly keyed — and it is the **only one of `GalleryCard`'s three consumers that severed the selection seam**, which puts a live, clickable, permanently-inert `<Checkbox>` on every card an admin sees in the featured strip and renders the "Unfeature" batch button dead by construction. The presentation layer is a hand-rolled static copy of two producer primitives that are **already installed** at 4.0.0, and the copy is behaviourally worse than the original in a way the producer's own prop doc names.

| # | severity | one line |
|---|---|---|
| L-1 | **BLOCKER** | `toggle-select` unlistened + `selected` unbound ⇒ inert admin checkbox on every featured card |
| L-2 | MAJOR | consequence: the "Unfeature" batch button can never receive a featured slug |
| L-3 | MAJOR | `entries` is *featured ∩ loaded-page-window*, not "the featured set" |
| L-4 | MAJOR | the strip clips its own cards' ink (tier glow + hover lift) — the sibling marquee documents the cure it lacks |
| L-5 | MAJOR | static edge-fade duplicates installed `./fading-scroll` **and is worse**: it feathers the start edge at `scrollLeft = 0` |
| L-6 | MAJOR | the card fan-out is triplicated with divergent contracts — the root cause of L-1 |
| L-7 | MINOR | `scrollbar-width: thin` co-declared with `::-webkit-scrollbar` ⇒ the webkit rules are inert in Chromium ≥121 |
| L-8 | MINOR | dead `@reference "tailwindcss"` (measured: 9 of 35) |
| L-9 | MINOR | `--deferred-section-size: 17rem` is calibrated for the grid cell, not this 16rem cell |
| L-10 | MINOR | no `overscroll-behavior-x: contain` on a nested horizontal scroller (`PaperSidebar` sets both axes) |
| L-11 | MINOR | all four emit signatures say `hash`; the payload is a `slug` (C.W4 rename residue) |
| L-12 | MINOR | prop optionality drifts across the three consumers of the same card |
| L-13 | MINOR | `onClick` escapes `_cache` (compiled proof) while its three siblings are cached |
| L-14 | MINOR | `v-if="entries.length > 0"` is dead — the sole mount site already guards |
| L-15 | INFO | zero test coverage: 0 e2e references to the featured strip; vitest absent repo-wide |
| L-16 | INFO | R5-7 class member: the loop is native-element ⇒ invisible to callsite-keyed instance derivation |

---

## §1 — What the component actually is

18 lines of script that declare 3 props and 4 emits and hold **no state**; a template that guards on `entries.length`, prints a `Crown` + "Featured" header, and fans `entries` into `GalleryCard` through a fixed-width wrapper; 45 lines of scoped CSS that build a `scroll-snap` strip with a masked edge fade. It is mounted exactly once — `GalleryView.vue:249-258`, guarded by `v-if="featuredEntries.length"` — and imported nowhere else (`grep -rn FeaturedCarousel web/src` → one import, one usage).

That is the whole surface. Everything below is either a seam it fails to carry, a primitive it re-implements, or a geometry it gets wrong.

---

## §2 — Defects

### L-1 · **BLOCKER** — the selection seam is severed: every featured card ships an inert admin checkbox

**Provenance.**
- `GalleryCard.vue:19-24` declares `selected?: boolean`; `:26-32` declares `"toggle-select": [hash: string, checked: boolean]`.
- `GalleryCard.vue:85-96` renders a `<Checkbox>` gated **only** on `v-if="adminMode"`, whose `@update:model-value` (`:94`) emits `toggle-select`, and whose `:model-value` is `selected ?? false` (`:91`).
- `GalleryFeaturedCarousel.vue:12-17` — the emits block has **no** `toggle-select`.
- `GalleryFeaturedCarousel.vue:32-40` — the `<GalleryCard>` callsite binds `entry`, `admin-mode`, `liked-hashes` and four listeners; it binds **neither `:selected` nor `@toggle-select`**.
- `GalleryView.vue:249-258` passes `:admin-mode="gallery.adminMode"` to the carousel but passes `:selected-hashes` / `@toggle-select` **only** to the grid (`:296`, `:302`).

**The failure.** Admin mode on. `featuredEntries` is non-empty. Each featured card paints a real, focusable, clickable `<Checkbox>` at top-left. Clicking it flips reka-ui's internal state, emits `toggle-select` into a component that declared no such emit and attached no listener — the event is dropped. `selected` is `undefined` forever, so `:model-value` is pinned to `false`; on the next parent render the checkbox visually snaps back. A destructive-adjacent admin control that accepts input and does nothing.

**Falsifier (survived).** This claim dies if any one of: (a) `GalleryCard` gated the checkbox on `selected !== undefined` rather than `adminMode` — it does not (`:86`); (b) the carousel declared `toggle-select` so the emission fell through as an attr — it does not, and a declared-emit-on-the-child with no listener on the parent cannot fall through in either direction; (c) `GalleryView` supplied the selection props to the carousel — `grep -n "toggle-select" GalleryView.vue` → **one** hit, line 302, the grid. All three checked; none hold.

**Cure (2 lines + 1 prop).** Add `"toggle-select": [hash: string, checked: boolean]` to the emits, and `:selected="selectedHashes?.has(entry.slug) ?? false"` + `@toggle-select="(h, c) => emit('toggle-select', h, c)"` at `:32-40`, with a `selectedHashes?: Set<string>` prop — i.e. make the carousel's callsite identical to `GalleryInfiniteGrid.vue:36` + `:41`, which already does exactly this.

### L-2 · MAJOR — "Unfeature" is a batch button that can never act

**Provenance.** `GalleryView.vue:326-333` renders an `Unfeature` button calling `askBatchGallery('unfeature')`; `:154-159` shows `selectedHashes` is populated *only* by `toggleEntrySelected`; `:302` shows the only wire into it is the grid; `:291` shows the grid is fed `nonFeaturedEntries` (`:68-70`, `tier !== "featured"`). Featured entries appear in exactly one place — the carousel (`:250-251`) — and the carousel cannot select (L-1).

**The failure.** No featured slug can ever enter `selectedHashes`, so every `unfeature` batch runs against rows that are already not featured. The button, its confirm-dialog branch (`GalleryView.vue:~405`) and its toast copy are dead by construction. Note the single-entry path still works (the card's Crown overlay, `GalleryCard.vue:162`, is wired by the carousel at `:38`) — the defect is the batch path only, which is precisely the path A.W5.c was built for.

**Falsifier (survived).** Any second writer to `selectedHashes`, or any surface that renders a featured entry inside the grid. `grep -n "selectedHashes" GalleryView.vue` → declaration, `toggleEntrySelected`, `clearGallerySelection`, `askBatchGallery`, the toolbar `v-if`/count, and the grid binding. No other writer. `nonFeaturedEntries` excludes `tier === "featured"` unconditionally.

### L-3 · MAJOR — `entries` is not "the featured set"; it is featured ∩ the loaded page window

**Provenance.** `GalleryView.vue:64-66` — `featuredEntries = gallery.entries.filter(e => e.tier === "featured")`. `stores/gallery.ts:60-80` — `fetchNextPage` **appends** 20-row pages into the same `entries` array (`processInChunks(fresh, v => entries.value.push(v))`). `stores/gallery.ts:82-100` — `resetAndFetch` seeds it with page 1. `lib/api.ts:397-407` — `listVisualizations` accepts **only** `{limit, sort, cursor, owner}`; there is no `tier` (nor `search`, nor `basis`) query parameter.

**The failure, three ways.** (1) *The strip grows while you scroll the grid* — every `fetchNextPage` can append featured rows, so the horizontal strip silently gains cards during vertical infinite scroll, mutating a surface the user is not looking at. (2) *Featured rows outside the window are invisible* — with `sort: "newest"` and 20-row pages, an old featured entry never appears until the user pages down to it; the "Featured" header therefore asserts a set it does not show. (3) *The tier filter cannot help* — `GalleryView.vue:111-114` watches `gallery.tierFilter` and refetches, but the refetch (`gallery.ts:87-91`) sends no tier param, so selecting "featured" in `GallerySearchBar` costs a round trip and changes nothing.

This is a *contract* defect at the carousel's own prop boundary: `entries: Visualization[]` is documented by its name and its `Crown`/"Featured" chrome as the featured set, and is supplied with a pagination artifact.

**Falsifier (survived).** A dedicated featured fetch, or a `tier` param anywhere on the list path. Neither exists: `grep -n "tier" web/src/lib/api.ts` returns only the `setTier` mutation endpoint, not the list.

**Contradiction filed.** Fourier's own `docs/audits/runs/2026-05-27-D-audit/design/DA-design-A3-gallery-admin.md:18` describes the carousel as rendering "when `featuredEntries.length`" and treats the set as given. It is not given; it is a window artifact. The A3 read is incomplete, not wrong.

### L-4 · MAJOR — the strip clips its own cards' ink; the sibling marquee documents the exact cure it lacks

**Provenance.** `GalleryFeaturedCarousel.vue:61-75` — `.featured-scroll { display:flex; overflow-x:auto; padding-bottom:0.5rem; … }`, **no `padding-top`**. Per CSS Overflow §3, when one axis is not `visible` the other computes to `auto`; the strip therefore clips vertically at its padding box. `GalleryCard.vue:228-231` — `.gallery-card[data-tier="featured"] { box-shadow: 0 0 12px … }`, a **symmetric** 12px glow, and *every* card in this strip is `data-tier="featured"` by construction (`GalleryView.vue:64-66`). `GalleryCard.vue:209-213` — hover is `translateY(-4px) scale(1.02)`; at a 16rem-wide card (`:88`) the real height is ≈18rem ⇒ the scale adds ≈2.9px above the top edge, so ≈6.9px of lift plus the 12px glow sit above a padding-box with 0px of room.

**The contrast that makes it a defect rather than a taste call.** `GalleryMarquee.vue:81-83` — *"Generous vertical padding so hover scale/translate stays inside the mask"* — with `padding: 0.75rem 0` and a mask deliberately sized `0 -50% / 100% 200%` for horizontal-only fade. The same team, in the same directory, solved this for the strip that is *not* mounted and left it unsolved in the strip that is.

**Falsifier (partially survived, and it narrowed the claim).** I first suspected the base/hover shadows were clipped too. They are not: `--shadow-cartoon` / `--shadow-cartoon-hover` resolve to `3px 3px 0 0` / `4px 4px 0 0` (glass-ui 4.0.0 `dist/styles/tokens/shadow.css:9-10`) — down-right, zero blur, so they fall into the 8px bottom padding. The surviving claim is the **symmetric tier glow above the top edge** and the **upward hover lift**, both of which are ink overflow in the block-start direction, which is clipped and *not* reachable by scrolling. Exact clipped pixel count: **UNPROVEN-NEEDS-LIVE (SS-13)**; the clipping mechanism is proven from the cascade.

### L-5 · MAJOR — the edge fade is a static hand-roll of an installed producer primitive, and the hand-roll is behaviourally worse

**Provenance.** `GalleryFeaturedCarousel.vue:68-75` — an unconditional `mask-image: linear-gradient(to right, transparent, black 0.5rem, black calc(100% - 0.5rem), transparent)`. Producer, **at the installed version**: `@mkbabb/glass-ui@4.0.0` exports `./fading-scroll`; `dist/components/custom/fading-scroll/FadingScroll.vue.d.ts` documents `fadeStart?: boolean` as *"Feather the start edge **once scrolled past the start**"* and `fadeEnd?: boolean` as *"…while trailing overflow remains"*, driven (per `dist/styles/utilities/base.css:6-14`) by registered `@property <length-percentage>` customs interpolating off a `scroll(self)` timeline.

**The failure.** The local mask is state-blind. At `scrollLeft = 0` — the state every user arrives in — the leading 8px of the **first** card is feathered to transparent although nothing is hidden to its left: the card's 2px border, its rounded corner and its featured glow are eaten on the side facing the reader. Same at the far end. The producer primitive exists precisely to not do this, ships in the installed tree, and requires **no part of the 4→7 uplift** that CENSUS §3a [FE §5 🔴] books as an atomic three-package transaction.

**Corpus fold + extension.** `lane-frontend.md:439` already books this file as a candidate shadow of `./carousel` ("present at 4.0.0 · 0 imports"). This challenge adds the second, cheaper half: the fade is `./fading-scroll`, adoptable independently of any carousel decision, and the local copy is not merely redundant but *inferior*. The same directory already proves the idiom is live — `GalleryInfiniteGrid.vue:3` imports `@mkbabb/glass-ui/infinite-scroll`.

**Falsifier (survived).** The claim dies if the mask were scroll-driven. The whole `<style scoped>` block is 45 lines and contains no `animation-timeline`, no `scroll(`, no `@property`, no JS. Read whole.

### L-6 · MAJOR — the card fan-out is triplicated with divergent contracts (root cause of L-1)

**Provenance.** Three copies of the same six-line block:
- `GalleryFeaturedCarousel.vue:32-40` — 3 props, 4 listeners, **no selection**
- `GalleryMarquee.vue:40-48` **and** `:57-65` — byte-identical to the carousel's, twice (real track + `aria-hidden` duplicate)
- `GalleryInfiniteGrid.vue:30-42` — 4 props, 5 listeners, **selection wired**

Four callsites, two contracts. When A.W5.c added multi-select it landed in one of the four. That is L-1, and it will recur on the next `GalleryCard` emit.

**Falsifier (survived).** "The marquee is dead, so it is two not four." Not true at HEAD: the D.W4.c cure *mounted* the marquee as the empty-state band — `GalleryView.vue:269-278`, guarded `featuredEntries.length >= 4` — contradicting `docs/tranches/D/waves/W4.md:82` and `D/audit/challenge-P4.md:272-274`, which record it as an orphan. The orphan finding is **stale at HEAD**; the marquee is live and carries the same severed seam. Filed as an explicit contradiction of the D corpus.

**Cure (KISS).** Give the carousel and the marquee the grid's callsite verbatim. Do **not** invent a shared `<GalleryCardList>` wrapper — three callsites of a 6-line block do not earn a component, and the house rule is explicit about contrived wrappers.

### L-7 · MINOR — the scrollbar rules are inert where they matter

**Provenance.** `:66` `scrollbar-width: thin` and `:77-84` `::-webkit-scrollbar { height: 4px }` + `::-webkit-scrollbar-thumb { background: color-mix(…) }` in the same rule set. Chromium ≥121 ships the standard `scrollbar-width`/`scrollbar-color` properties and **ignores the `::-webkit-scrollbar` pseudo-elements when either standard property is declared**. So in Chrome the 4px height and the tinted thumb never apply (`thin` wins); in Firefox `scrollbar-width: thin` applies and the thumb tint is simply absent (no `scrollbar-color`); only in Safari do the webkit rules do anything.

**Corpus fold + sharpening.** `docs/audits/runs/2026-06-01-modern-web-audit/fourier.md:58` books this file (P3) for *missing* `scrollbar-color` across 6 files. The sharper statement: the fallback it is missing is also the one that has **disabled the existing rules** on the majority engine. Engine-precedence half: **UNPROVEN-NEEDS-LIVE (SS-13)** — it is a documented Chromium behaviour, not something I can execute here.

### L-8 · MINOR — dead `@reference "tailwindcss"`

**Provenance.** `:47`. The block below it (`:49-90`) uses zero Tailwind features — no `@apply`, no `theme()`, no `@variant`; `var(--foreground)` at `:82` is a plain custom property resolved by the engine, not by Tailwind. `@reference` exists solely to give a scoped block the Tailwind context for those features, and costs a context load per style block at build.

**Measured class size.** Of 53 SFCs with `<style scoped>`, 35 carry `@reference`; **9 of those 35 use no Tailwind feature at all** — `EquationResult.vue`, `CoefficientsSpectrum.vue`, `AdminAuditLog.vue`, `AdminFlaggedPanel.vue`, `AdminUserList.vue`, `GalleryAdminBanner.vue`, `GalleryCardModal.vue`, `GalleryDraftsSection.vue`, and this file. A directory-shaped copy-paste (7 of the 9 are `gallery/`).

**Falsifier (survived).** A single `@apply`/`theme()` in the block would kill it. Parsed programmatically across all 35, not eyeballed.

### L-9 · MINOR — the deferred-section estimate is calibrated for the other consumer

**Provenance.** `GalleryCard.vue:199-206` sets `--deferred-section-size: 17rem` and its comment states the calibration explicitly: *"The card is an aspect-[4/3] thumbnail (~11rem at a ~15rem cell) + a meta footer, so the never-painted estimate is ~17rem."* glass-ui `dist/styles/utilities/base.css:477-480` expands `.deferred-section` to `content-visibility: auto; contain-intrinsic-size: auto var(--deferred-section-size, 30rem)`. The carousel fixes its cell at **16rem** (`:88`), not ~15rem: thumbnail 16 × ¾ = **12rem** + ≈6rem of chrome ⇒ **≈18rem** actual. The carousel never overrides the token.

**The failure.** ~1rem (≈6%) of block-axis estimate error on every skipped card in this consumer, resolving to a settle on first paint. Bounded and transient because the value is `auto <length>` — the engine caches the real size after first render — which is why this is MINOR and not MAJOR. Snap geometry is unaffected (see superlative S-2).

### L-10 · MINOR — a nested horizontal scroller with no `overscroll-behavior`

**Provenance.** `.featured-scroll` (`:61-75`) is an `overflow-x: auto` scroller nested inside `GalleryView`'s `overflow-y-auto h-full` page (`:220`), and declares no `overscroll-behavior`. The repo's own convention says otherwise: `PaperSidebar.vue:156-157` sets **both** `overscroll-behavior-y: contain` and `overscroll-behavior-x: contain`; `PaperView.vue:463`, `PaperSearch.vue:111,300`, `MobileFloatingToc.vue:303` all contain their scroll chaining.

**The failure.** Horizontal scroll chains past the strip's ends — trackpad/touch back-swipe navigation on WebKit, and rubber-band chaining to the page. Gesture outcome per engine: **UNPROVEN-NEEDS-LIVE (SS-13)**; the omission against the in-repo convention is proven.

### L-11 · MINOR — four emit signatures say `hash`; the payload is a `slug`

**Provenance.** `:13-16` — `like: [hash: string]`, `"set-tier": [hash: string, …]`, `delete: [hash: string]`. What actually flows: `GalleryCard.vue:141` `emit('like', entry.slug)`, `:162`/`:171` `emit('set-tier', entry.slug, …)`, `:180` `emit('delete', entry.slug)`. `types.ts:208-211` makes the distinction load-bearing: `slug` is identity and `content_hash` is annotated *"dedup key, **never identity** (§1)"*; `stores/gallery.ts:22-24` names the identity function `entrySlug`. The prop `likedHashes: Set<string>` (`:9`) likewise holds slugs — `GalleryCard.vue:34` tests `likedHashes?.has(props.entry.slug)`.

**Provenance of the debt.** `docs/tranches/C/waves/W4.md:59` lists this file (`:29`) in the R3 `.snapshot_hash → .slug` migration. The values were renamed; the parameter names were not. A reader who trusts the signature will reach for `content_hash` — the one field the contract forbids as identity.

### L-12 · MINOR — prop optionality drifts across consumers of the same card

`GalleryFeaturedCarousel.vue:6-10` and `GalleryMarquee.vue:6-10` declare `adminMode?` / `likedHashes?` optional; `GalleryInfiniteGrid.vue:6-13` declares both required. The single parent supplies both to all three (`GalleryView.vue:252-253`, `272-273`, `294-295`). The optionality is unexercised, and it costs `GalleryCard` a defensive `?.` at `:34`. Pick one — required, since the only caller always passes them.

### L-13 · MINOR — `onClick` escapes the handler cache (compiled proof)

Compiled with the repo's own `@vue/compiler-sfc` (`cacheHandlers: true`, setup bindings supplied):

```
onClick:   $event => ($setup.emit('card-click', entry)),          // NOT cached
onLike:    _cache[0] || (_cache[0] = $event => …),
onSetTier: _cache[1] || (_cache[1] = (h, t) => …),
onDelete:  _cache[2] || (_cache[2] = $event => …)
}, null, 8 /* PROPS */, ["entry", "admin-mode", "liked-hashes", "onClick"])
```

`onClick` references the `v-for` scope variable `entry`, so `hasScopeRef` blocks caching; it lands in the dynamic-props list and a fresh closure is minted per card per parent render, so every `GalleryCard` fails the props-identity fast path on any `GalleryView` re-render (tab switch, admin toggle, a like round-trip, each appended page). Its three siblings *are* cached — the asymmetry is invisible at the source and only shows in the compiled output. **Cure**: change `GalleryCard`'s emit to `click: [entry: Visualization]` (it owns `entry` already) and let all three consumers write the cacheable `@click="emit('card-click', $event)"`. Identical wart at `GalleryInfiniteGrid.vue:37` and `GalleryMarquee.vue:44,60`, cured by the same one-line change.

### L-14 · MINOR — dead guard

`:21` `v-if="entries.length > 0"` can never be false: the sole mount site already guards with `v-if="featuredEntries.length"` (`GalleryView.vue:250`), and the component is imported nowhere else. The compiled render carries the whole `key: 0` branch plus a `createCommentVNode` for the impossible else. Cheap, but it is dead code in a 91-line file, and it is the kind of double-guard that makes the *real* guard's removal look safe later. Keep exactly one — the child's, since it is the reusable half.

### L-15 · INFO — the surface is untested, at every level available

`grep -rn "featured" web/e2e/` → **0**. `grep -rn "GalleryCard" web/e2e/` → **0**. `e2e/gallery.spec.ts` has six tests (tabs/search-drawer/drafts/login/dock/console-errors); none reaches a card. CENSUS §3a [FE §0, §9] books the repo-wide floor: **vitest absent**, the only frontend gates are `vue-tsc` + 29 Playwright tests on a single chromium project. L-1 and L-2 are exactly the class of defect a single admin-mode component test would have caught, and nothing in the tree could have caught them.

### L-16 · INFO — R5-7 class membership, measured

The loop is `v-for="entry in entries"` on a **native `<div class="featured-card-wrapper">`** (`:28`), with the `<GalleryCard>` component *inside* it (`:32`). Intake row **R5-7** (ADOPT-AS-FACT, CARRY-TO-WAVE → F.W4) establishes the derivation defect: loop evidence keyed to *component* callsites is blind to native element loops — `instance.loop.paper-sidebar` derived literally `[]` while the sibling `instance.loop.presets` was populated because its loop sat on a `<Tooltip>`. This file is a member of that blind class, and the contrast is unusually clean because its own sibling is the control:

| | loop host | visible to a callsite-keyed deriver? |
|---|---|---|
| `GalleryFeaturedCarousel.vue:28` | native `<div>` | **no** |
| `GalleryInfiniteGrid.vue:31` | `<GalleryCard>` component | yes |

The same fan-out, written two ways, one of which vanishes from the instance denominator. **Live measurement executed here** (all 33 `v-for` sites in `web/src`, owning tag resolved): **17 native-element loops · 16 component-hosted**. Four of the 17 are gallery-family (`GalleryFeaturedCarousel:28`, `GalleryMarquee:29,36,52`); five are the Paper TOC family that R5-7/R6-5 already pin (`PaperSidebar:65,87,105`, `PaperView:363`, `MobileFloatingToc:149`). Intake row **R6-6** records R6's cured registry as `nativeTemplateLoops: 16` / `nativeTemplateLoopDiagnostics: 17`; my 17/16 split is the mirror pair, and the likeliest reconciliation is that R6 classifies the one `<template v-for>` (`MobileFloatingToc.vue:149`) apart from the 16 element-hosted loops. **UNPROVEN** — the R6 `DERIVED-REGISTRIES.json` is not reachable from this checkout (`find` → nothing), consistent with the access withdrawal the intake records. F.W4's per-component audit must count native loops or it drops this component's N entirely.

**Second fold — R3-12.** That row books 35 open-family records collapsing to 28 unique, with `GalleryCard` `basisLabels` among the 7 duplicates. The duplication is structural and this component is one of its two causes: `GalleryCard.vue:116` (`v-for="b in basisLabels"` on `<Badge>`) is reached from two live callsites — this carousel (`:32`) and the grid (`:31`) — so a callsite-keyed deriver books the same source loop twice. Any instance denominator over these rows over-counts by 20% *and* under-counts the native loops of L-16: the two errors run in opposite directions and do not cancel.

---

## §3 — Superlatives (L-18 runs both ways)

**S-1 · Zero teardown surface — nothing here can leak.** No `ref`, no `computed`, no `watch`, no lifecycle hook, no `addEventListener`, no timer, no `requestAnimationFrame`, no `ResizeObserver`/`IntersectionObserver`, no `provide`/`inject`. The scroller is CSS; the fade is CSS; the snapping is CSS. *Falsifier*: any of the above in the file or reachable through its imports — the file's three imports are a type, `GalleryCard`, and a lucide icon; grepped, none present. In a repo whose census books three independent canvas surfaces and *"two rAF clocks ungated under `prefers-reduced-motion`"* (CENSUS §3a [FE §8]), a component with a nil teardown contract is worth naming.

**S-2 · The fixed-width wrapper immunizes snap geometry against `content-visibility`.** `scroll-snap-align: start` sits on `.featured-card-wrapper` (`:86-90`, `width: 16rem; flex-shrink: 0`), **not** on the `.deferred-section` card. Snap positions are therefore content-independent: whatever `contain-intrinsic-size` guesses (L-9), the inline-axis snap points cannot drift as cards skip and un-skip. Had the `v-for` been hoisted onto `GalleryCard` — the naive fix for L-16 — the snap child would have become the deferred element and mandatory snapping would ride a guessed width. *Falsifier*: `scroll-snap-align` on the card, or a card width that is not fully determined by the wrapper — neither holds (`GalleryCard.vue:71` root is `w-full`, i.e. 100% of the 16rem wrapper). The wrapper div is not superfluous DOM; it is load-bearing.

**S-3 · Correct identity keying, against a contract that punishes the alternatives.** `:key="entry.slug"` (`:29`) uses the CRUD contract's single user-facing handle (`types.ts:208`; `stores/gallery.ts:22-24` `entrySlug`) — not the array index (which would mis-recycle cards across the `resetAndFetch` that follows every tier mutation, `GalleryView.vue:132-135`) and not `content_hash`, which `types.ts:211` marks *"dedup key, never identity"* and which genuinely collides across remixes. *Falsifier*: an index key or a `content_hash` key — absent.

**S-4 · The featured path never touches the viz render path.** N featured cards = N `<img :src="thumbnailUrl(entry.image_slug)" loading="lazy">` (`GalleryCard.vue:99-104`; `lib/api.ts:292-294` — a plain server URL), zero renderer instances. CENSUS §3a [FE §6] books fourier as *"Canvas2D throughout, WebGL/WebGPU ABSENT; three independent canvases … + 12 SVG surfaces"*; the featured strip adds none of them and cannot contend with the epicycle instrument's rAF clock. `PathPreview.vue` — the one SVG path renderer in the card's import closure — is imported at `GalleryCard.vue:10` and **never rendered** (0 template hits), so even the SVG cost is dead weight rather than live work (a `GalleryCard`-owned dead import, booked here only because this component is one of its two live consumers; lane-frontend :439 correctly marks `PathPreview` itself as *"genuinely bespoke — no flag"*). *Falsifier*: any canvas/WebGL/rAF reachable from the strip — grepped through `GalleryCard` and its closure; none.

**S-5 · Goldilocks as a file.** 18 script / 25 template / 45 style. One responsibility, no store reach-in (props down, events up, no `useGalleryStore()` in a leaf), no god-module drift, no composable with a hidden contract. The duplication charge of L-6 is against the *family*, not against this file's size — splitting it further would be contrivance. *Falsifier*: a store import, a second responsibility, or a composable — none.

---

## §4 — Hypotheses I could not sustain (recorded so the next auditor does not re-run them)

- **F-1 · "`--shadow-cartoon` / `--shadow-cartoon-hover` are undefined ⇒ shadowless cards."** FALSE. Neither token is declared in `web/src`, which is what made it look live, but glass-ui 4.0.0 declares both at `dist/styles/tokens/shadow.css:9-10` (`3px 3px 0 0 …` / `4px 4px 0 0 …`, with `theme/bridges.css:287-288` aliasing). Killing this hypothesis is what narrowed L-4 to the symmetric tier glow.
- **F-2 · "Missing `-webkit-mask-image` breaks Safari."** NOT SUSTAINED. `:68` ships unprefixed `mask-image` only while `GalleryMarquee.vue:85-88` ships both — but unprefixed `mask-image` is supported from Safari 15.4, and the build has neither `browserslist` nor `autoprefixer` (`web/package.json`, whole file read; `css.postcss.plugins` is `@tailwindcss/postcss` alone, `vite.config.ts:33-37`). The marquee's prefix is the redundancy, not the carousel's omission. Downgraded to a consistency note, not counted as a defect.
- **F-3 · "The wrapper `<div>` is superfluous DOM (N extra nodes)."** NOT SUSTAINED — it owns the 16rem width against the card's `w-full` root and is the snap child. See S-2. Removing it would be a regression.
- **F-4 · "The `Set` prop breaks reactivity."** NOT SUSTAINED. `GalleryView.vue:127-129` replaces the Set by identity (`const s = new Set(...); likedHashes.value = s`), so `GalleryCard.vue:34`'s computed re-evaluates. Mutation-in-place would also have tracked (Vue 3 proxies collections), so the pattern is safe twice over.
- **F-5 · "Duplicate slugs across cursor pages ⇒ duplicate `:key`."** UNPROVEN, not claimed. `fetchNextPage` appends without de-duplication (`stores/gallery.ts:73`), so a repeated row at a cursor boundary would produce a duplicate key in both the carousel and the grid — but nothing in the tree evidences that the backend can repeat a row, and I will not manufacture a defect from a possibility.

---

## §5 — Cure sketch (minimum diff, KISS)

1. **L-1/L-2** — copy `GalleryInfiniteGrid.vue:36,41` into `GalleryFeaturedCarousel.vue:32-40`, add the `selectedHashes?: Set<string>` prop and the `toggle-select` emit, and bind them at `GalleryView.vue:249-258`. Do the same for `GalleryMarquee.vue:40-48,57-65` (with the `aria-hidden` duplicate track excluded from selection). ~8 lines total; kills both defects and closes L-6's contract split.
2. **L-13** — `GalleryCard` emits `click: [entry: Visualization]`; all four callsites become the cacheable `@click="emit('card-click', $event)"`. 5 lines.
3. **L-4/L-5** — adopt `@mkbabb/glass-ui/fading-scroll` (`axis="x"`) in place of `:68-75`, and add `padding-block: 0.75rem` per `GalleryMarquee.vue:81-83`. Deletes 8 CSS lines, fixes the `scrollLeft = 0` fade lie and the clipped glow, requires **no** version bump. The `./carousel` question (lane-frontend :439) stays open behind it and should be decided *after* the uplift transaction, not inside this fix.
4. **L-7/L-8/L-10/L-14** — delete `:47`, delete `:77-84` or add `scrollbar-color`, add `overscroll-behavior-x: contain`, delete the `v-if` at `:21`. 4 one-line edits.
5. **L-3** — a real fix needs a `tier` parameter on `GET /api/visualizations` and a dedicated featured fetch; that is a cross-seam change (FE + Python router) and belongs in the wave that owns the list contract, not in a component patch. Book it, do not bodge it.
6. **L-11** — rename the emit parameters `hash → slug` across `GalleryCard` and its three consumers; type-only, caught by `vue-tsc`.

---

## §6 — Corpus crosswalk

| corpus row | this challenge |
|---|---|
| `lane-frontend.md:439` — carousel is a `./carousel` candidate shadow, 0 imports | **FOLDED + EXTENDED** → L-5 adds `./fading-scroll` as the cheaper, uplift-free half, and shows the local copy is behaviourally inferior, not merely redundant |
| `lane-frontend.md:112` — 91 LOC, shadow candidate | confirmed line-exact |
| CENSUS §3a [FE §5 🔴] — glass 4→7 is one atomic transaction | **respected**: every producer primitive I recommend (`./fading-scroll`) is verified present at the **installed** 4.0.0 |
| CENSUS §3a [FE §6] — Canvas2D ×3, WebGL absent | **FOLDED** → S-4: the featured path adds zero renderer instances |
| CENSUS §3a [FE §0/§9] — vitest absent, 29 Playwright tests | **FOLDED** → L-15: 0 of them reach this surface |
| intake **R5-7** (ADOPT-AS-FACT → F.W4) — callsite-keyed loop derivation is blind to native loops | **FOLDED + MEASURED** → L-16: this file is a member; live count 17 native / 16 component |
| intake **R6-5 / R6-6** — `NATIVE_TEMPLATE_LOOP` cure, 16/17 | cross-checked against my mirror pair; reconciliation hypothesis stated and marked **UNPROVEN** (artifacts unreachable) |
| intake **R3-12** — 35→28 open families, `GalleryCard` basisLabels duplicated | **FOLDED** → L-16 names this component as one of the two callsites causing that duplicate |
| intake **R4-9** — audited scope byte-identical to HEAD | verified for the two subject files (`git status` clean at `cd26c653`) |
| `docs/tranches/D/waves/W4.md:82`, `D/audit/challenge-P4.md:272-274` — `GalleryMarquee` is an unmounted orphan | **CONTRADICTED at HEAD** → `GalleryView.vue:269-278` mounts it as the empty-state band; the orphan finding is stale, and the live marquee carries the same severed selection seam (L-6) |
| `2026-06-01-modern-web-audit/fourier.md:58` — P3, missing `scrollbar-color` | **FOLDED + SHARPENED** → L-7: the missing standard property is also what disabled the existing webkit rules |
| `2026-05-27-D-audit/…/DA-design-A3-gallery-admin.md:18` — carousel renders when `featuredEntries.length` | **INCOMPLETE** → L-3: that set is a pagination window, not the featured set |
| `2026-06-16-M-deep-audit/raw-findings.json:1126,2307,2798` — `text-amber-400` off-token, `cm-serif` header idiom | **out of axis** (D/design owns them); not double-counted here |

**Counts**: defects **16** · blockers **1** · superlatives **5**.

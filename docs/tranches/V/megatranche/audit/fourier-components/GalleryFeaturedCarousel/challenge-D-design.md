claude-opus-5[1m] (served model id)

# CHALLENGE · `GalleryFeaturedCarousel.vue` · axis D (DESIGN)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GalleryFeaturedCarousel.vue` (91 lines)
**Sole call site** `web/src/components/visualization/GalleryView.vue:249-258`
**Pin under audit** `@mkbabb/glass-ui ^4.0.0` installed 4.0.0 · producer latest 7.0.0 (`/Users/mkbabb/Programming/glass-ui/package.json`)
**Method** static + source-derived only. No browser. Livable-only claims carry `UNPROVEN-NEEDS-LIVE (SS-13)`.
**Posture** assumed DEFECTIVE until the tree proved otherwise. Four candidate findings were killed against the tree and are recorded in §5 rather than deleted — L-18 runs both ways, and so does the falsifier.

**Tally** — 16 defects (2 BLOCKER · 5 MAJOR · 6 MINOR · 3 INFO) · 4 superlatives · 4 withdrawn.

**Read whole (read-only):** the subject; `gallery/GalleryCard.vue` (its only child); `gallery/GalleryInfiniteGrid.vue`, `gallery/GalleryMarquee.vue`, `gallery/GalleryDraftsSection.vue` (the three sibling hosts of the same card); `visualization/GalleryView.vue` (the parent); `stores/gallery.ts`; `src/style.css`; `public/fonts.css`; `index.html`; and in `node_modules/@mkbabb/glass-ui@4.0.0`: `dist/styles/utilities/base.css`, `dist/styles/typography/utilities.css`, `dist/styles/tokens/{color-radius,dark-arm,light-dark,offsets-sizing}.css`, `dist/styles/theme/bridges.css`, `dist/carousel.js`, `dist/components/ui/carousel/*.d.ts`.

---

## §0 · The shape of the thing

91 lines. Four props in, four events out, one child. It renders a labelled horizontal strip of `GalleryCard`s above the main gallery grid. It imports **zero** glass-ui — one lucide icon and one local SFC — and hand-rolls, in 45 lines of scoped CSS, four things the installed design system already ships as named, documented, tokenized utilities: a thin scrollbar, an edge-fade mask, a snap-scroller, and a carousel.

That is the through-line of this challenge. The component is not badly written. It is written *beside* the system rather than *in* it, and every one of the five MAJORs below is a place where the hand-rolled version is measurably worse than the primitive it declined — in two cases reproducing a defect the producer has already named, diagnosed, and superseded upstream.

**Corpus fold.** lane-frontend booked this file once, at `formation/fourier/lane-frontend.md:112` ("Featured carousel — **SHADOW candidate, §4**") and `:439` (`| gallery/GalleryFeaturedCarousel.vue | 91 | ./carousel (present at 4.0.0) | 0 imports |`). **I confirm the row and sharpen it**: the shadow is not merely 91 duplicated lines, it is an accessibility and interaction *regression* against the primitive it shadows (D-6, D-7), and its cure survives the uplift intact (S-1). The intake lane's `R3-12` (ADOPT-AS-FACT) touches this file transitively; see D-16.

---

## §1 · BLOCKERS

### D-1 · BLOCKER · The section destroys itself on two of its own four actions

**Claim.** `set-tier` and `delete` — two of the four events this component emits — cause the component to be unmounted mid-flight, for the whole duration of a network round trip. Focus, horizontal scroll position, and ~17rem of layout are destroyed and then restored. There is no loading state, no reserved height, and no `v-show`.

**Provenance — the full chain, every link source-decidable:**

| Step | File:line | Fact |
|---|---|---|
| 1 | subject `:38`, `:39` | emits `set-tier` / `delete` upward |
| 2 | `GalleryView.vue:255`, `:257` | bound to `handleSetTier` / `handleDelete` |
| 3 | `GalleryView.vue:132-135`, `:137-141` | both `await gallery.setTier(...)` / `gallery.deleteEntry(...)` |
| 4 | `stores/gallery.ts:143`, `:155` | both `await resetAndFetch()` |
| 5 | `stores/gallery.ts:85` | **`entries.value = []`** — the clear happens **before** the `await` at `:90` |
| 6 | `GalleryView.vue:64-66` | `featuredEntries = gallery.entries.filter(e => e.tier === "featured")` → `[]` |
| 7 | `GalleryView.vue:250` | `v-if="featuredEntries.length"` → false → **the carousel unmounts** |
| 8 | `stores/gallery.ts:95` | entries repopulate only after the network resolves |

**Failure scenario.** An admin scrolls the featured strip to the ninth card, tabs to its Crown button (`GalleryCard.vue:157-165`) and presses Enter to un-feature it. The store clears `entries` synchronously; the section vanishes; focus falls to `<body>`; the strip's scroll offset is gone; the grid below jumps up by the strip's full height. When the fetch resolves the section reappears, scrolled back to card #1, and the grid jumps back down. The admin's next Tab starts from the top of the document. Two layout shifts and a focus loss per toggle.

**Why this is the component's defect and not only the store's.** The sibling under the identical store churn does *not* do this: `GalleryInfiniteGrid` accepts `loading: boolean` (`GalleryInfiniteGrid.vue:11`), renders a `#loading` slot (`:44-48`), and its parent guard carries the survival arm — `v-if="gallery.entries.length || gallery.loading"` (`GalleryView.vue:290`). The carousel's props (`:6-10`) have **no `loading` member**, so its parent guard *cannot* carry that arm. The asymmetry is authored into the prop signature.

**Falsifier (three ways this could have been wrong; all three checked and closed).**
1. *If `resetAndFetch` repopulated without clearing* — it clears at `gallery.ts:85`, three statements before the `await`.
2. *If the parent used `v-show`* — it uses `v-if` (`GalleryView.vue:250`).
3. *If the component accepted a `loading` prop and reserved height* — its `defineProps` (`:6-10`) declares exactly `entries`, `adminMode`, `likedHashes`, and its scoped CSS declares no `min-height` anywhere (`:49-90`).

**Honest bound.** The *count* of shifted pixels is `UNPROVEN-NEEDS-LIVE (SS-13)`. The unmount, the focus loss, and the absence of any reserved height are all source-decidable and are the blocking part.

**Cure shape (not a patch — for the wave to spec).** Add `loading?: boolean`; change `:21` to `v-if="entries.length > 0 || loading"`; render a skeleton row of `.featured-card-wrapper` ghosts at the same 16rem width when `loading && !entries.length`; delete the parent guard (see D-12). Independently, `setTier`/`deleteEntry` should patch the entry in place the way `like` already does (`gallery.ts:189-199`) rather than `resetAndFetch` — but that is a store finding, booked here only as the upstream half.

---

### D-2 · BLOCKER · Admin mode renders a focusable, labelled checkbox on every featured card that can never be checked

**Claim.** The carousel forwards `adminMode` but forwards **neither** `selected` **nor** `toggle-select`. `GalleryCard` gates its multi-select checkbox on `adminMode` alone. So in admin mode every card in the featured strip renders a Checkbox that is focusable, is announced as a checkbox with the accessible name "Select entry {slug}", is permanently `false`, and whose activation is discarded.

**Provenance.**
- subject `:32-40` — the `<GalleryCard>` binding. `:34` passes `:admin-mode="adminMode"`. There is **no** `:selected` and **no** `@toggle-select`.
- `GalleryCard.vue:85-97` — `<div v-if="adminMode" …><Checkbox :model-value="selected ?? false" :aria-label="\`Select entry ${entry.image_slug}\`" @update:model-value="(v) => emit('toggle-select', entry.slug, v === true)" /></div>`. Gated on `adminMode`; value bound to a prop the carousel never passes; emit routed to a listener the carousel never binds.
- `GalleryCard.vue:31` — `"toggle-select"` is a **declared** emit, therefore excluded from `$attrs` fallthrough. Vue will not silently relay it up through the carousel. The event terminates.
- `GalleryInfiniteGrid.vue:31` (`:selected="selectedHashes?.has(entry.slug) ?? false"`) and `:37` (`@toggle-select=…`) — the sibling wires both.
- `GalleryView.vue:296`, `:302` — the parent wires `selected-hashes` and `toggle-select` **to the grid only**.
- `GalleryView.vue:150`, `:309`, `:315` — `selectedHashes` drives the batch toolbar and its `{{ selectedHashes.size }} entr(ies) selected` count.

**Failure scenario.** An admin wants to batch-unpublish three featured pieces. They click the checkbox on each of the three featured cards. Nothing happens: no check mark, no toolbar, no count. A screen-reader user gets "Select entry sunflower-3, checkbox, not checked" and, after Space, "not checked" again. The three items are unreachable by the batch path entirely; the only way to act on them is one at a time.

**WCAG.** 4.1.2 Name, Role, Value (A) — the programmatically-determined state never changes in response to user action. The control is operable but inert, which is the worse failure mode: it advertises a capability the surface does not have.

**Falsifier.** *If `GalleryCard` gated the checkbox on the presence of a `toggle-select` listener, or on a `selectable` prop, the carousel's omission would be harmless.* It does not — `GalleryCard.vue:85` gates on `adminMode`, full stop, and the carousel passes `adminMode` through unconditionally at `:34`. *If Vue relayed the unlistened emit* — it does not, per the declared-emits rule and `GalleryCard.vue:31`. Both closed.

**Note on scope.** `GalleryMarquee.vue:37-45` and `:53-61` have the identical omission, so the cure is one shared decision across the three card hosts, not a one-off. That does not reduce the severity here: this is the host that renders in admin mode on the default gallery tab.

---

## §2 · MAJOR

### D-3 · MAJOR · `overflow-x: auto` silently clips the top of every card — the lift, the hover shadow, the featured glow, and the focus ring

**Claim.** `overflow-x: auto` with no explicit `overflow-y` makes `overflow-y` compute to `auto` (CSS Overflow 3 §3.1: where one axis is `visible` and the other is not, `visible` computes to `auto`). Overflow in the block-**start** direction of a scroll container is clipped and is *not* reachable by scrolling. `.featured-scroll` has `padding-bottom: 0.5rem` and **no top padding**; `.featured-section` supplies `padding: 0 1rem` — inline only. Therefore everything the card paints above its own border box is cut.

**What is cut, with provenance:**

| Ink | Extent | Source |
|---|---|---|
| hover lift | `translateY(-4px) scale(1.02)` over `0.25s var(--ease-apple-spring)` | `GalleryCard.vue:209-213`, easing at `:195-198` |
| hover shadow | `var(--shadow-cartoon-hover)` | `GalleryCard.vue:212` |
| **featured glow** | `box-shadow: 0 0 12px color-mix(in srgb, var(--tier-featured) 30%, transparent)` | `GalleryCard.vue:228-231` |
| focus ring | `outline: 2px solid var(--ring); outline-offset: 2px` → 4px beyond the border box | `src/style.css:139-143` |

Subject provenance: `:64` `overflow-x: auto`; `:65` `padding-bottom: 0.5rem` (bottom only); `:49-51` `.featured-section { padding: 0 1rem }`.

**Why the glow row is not an edge case.** Membership in this strip *is* `tier === "featured"` (`GalleryView.vue:64-66`). So `[data-tier="featured"]` matches **100 %** of the cards here, and the 12px glow — the single visual signature the tier owns — is fully clipped at the top and clipped to 8px of 12px at the bottom. The section whose entire purpose is to distinguish featured work is the one section that cannot render the distinction.

**The team already knows this failure mode.** `GalleryMarquee.vue:77-79` carries the comment *"Generous vertical padding so hover scale/translate stays inside the mask"* with `padding: 0.75rem 0`, and `:81-84` uses a `0 -50% / 100% 200%` mask so that *"tall vertical extent keeps top/bottom unclipped."* The marquee — same card, same hover, same author — solved it. The carousel got neither the padding nor the tall mask.

**Falsifier.** *If some ancestor re-established `overflow: visible`, or if the padding were symmetric, or if the card's ink stayed inside its border box.* Checked: the scoped CSS block `:49-90` sets no `overflow-y` and no top padding; the parent wrapper at `GalleryView.vue:249` adds no padding; and all four ink sources above paint outside the border box by construction. Also checked and rejected: *the focus ring might be `box-shadow`-based and therefore also clipped-but-visible* — it is `outline` (`style.css:140`), which is clipped identically.

**WCAG.** 2.4.11 Focus Not Obscured (Minimum, AA) — the focus indicator of a card in the first visual row is partially obscured by the ancestor's clip. 2.4.13 Focus Appearance (AAA) — the indicator's required area is reduced.

**Bound.** The exact clipped pixel count and whether a vertical scrollbar appears in any engine: `UNPROVEN-NEEDS-LIVE (SS-13)`. The computed-value rule and the absence of top padding: source- and spec-decidable.

**Cure.** `padding: 0.75rem 0 1rem;` on `.featured-scroll` (matching the marquee's precedent), or adopt `.fading-scroll--x` (D-5) which owns the axis floor explicitly.

---

### D-4 · MAJOR · The scrollbar styling is dead code in every modern engine — and glass-ui ships the tokenized cure with the reason written on it

**Claim.** Setting `scrollbar-width: thin` *without* `scrollbar-color`, alongside an **ungated** `::-webkit-scrollbar` block, produces the exact "live + dead alias" the producer's own utility is written to prevent. Modern Chromium honours the standard properties and ignores `::-webkit-scrollbar` on the same element; Firefox honours `scrollbar-width: thin` with **UA default colours** because no `scrollbar-color` is given. Net: the 4px height and the `--foreground @ 15 %` thumb never paint anywhere, and the one declaration that does take effect renders an untokenized, theme-blind scrollbar.

**Provenance.**
- subject `:66` — `scrollbar-width: thin;` (no `scrollbar-color`)
- subject `:77-79` — `.featured-scroll::-webkit-scrollbar { height: 4px; }` — ungated
- subject `:81-84` — `::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--foreground) 15%, transparent); border-radius: 2px; }` — ungated
- **glass-ui 4.0.0 `dist/styles/utilities/base.css:149-170`** — `.scrollbar-thin`, with the producer's adjudication in the comment, verbatim:

  > *"AQ.W3 §W3.4 — tokenized thin scrollbar. Standard `scrollbar-width` + `scrollbar-color` (Baseline Widely, Chromium 121+) is the primary path, reading `--scrollbar-{thumb,track}` (auto-dark via `--muted-foreground`). The legacy `::-webkit-scrollbar` family is the SOLE fallback for older WebKit/Blink, **gated on `@supports not (scrollbar-color: auto)` so modern engines never paint it — not a live+dead alias.**"*

  The utility body: `scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);` then `@supports not (scrollbar-color: auto) { … ::-webkit-scrollbar { width: 8px; height: 8px } … }`.
- token: `dist/styles/tokens/color-radius.css:131` — `--scrollbar-thumb: color-mix(in srgb, var(--muted-foreground) 25%, transparent)`.

**Two further deltas beyond the deadness.** (a) The hand-rolled thumb is `--foreground @ 15 %`; the system's is `--muted-foreground @ 25 %` — the hand-rolled one is materially fainter than the design system's already-restrained floor. (b) The hand-rolled bar is 4px; the system's fallback is 8px. So even the intent, had it rendered, sits below the system's optical minimum.

**Falsifier.** *If `scrollbar-width` were absent, the `::-webkit-scrollbar` rules would be live and the finding collapses to "untokenized colour".* It is present at `:66`. *If the producer's comment were aspirational rather than describing engine behaviour* — it names the engine and version (Chromium 121+) and encodes the conclusion structurally in the `@supports` gate, which is the strongest form of evidence available without a browser. **The Chromium precedence behaviour itself is marked `UNPROVEN-NEEDS-LIVE (SS-13)`**; the `@supports`-gated-vs-ungated authoring divergence from the DS is source-decidable and stands on its own.

**Uplift note.** `.scrollbar-thin` is a plain utility in the always-imported `@mkbabb/glass-ui/styles` bundle (`src/style.css:3`) — available *today*, at the old pin, with no import change. This is an F.W1-independent cure.

---

### D-5 · MAJOR · The edge-fade is a verbatim instance of the producer's named **R8-08 "Shy" defect**, and it fights the snap alignment

**Claim.** `.featured-scroll`'s `mask-image` is a static, scroll-blind gradient that feathers **both** edges **unconditionally**. glass-ui 4.0.0 documents this precise construction as a named defect and ships its supersession.

**Provenance.**
- subject `:68-74` — `mask-image: linear-gradient(to right, transparent, black 0.5rem, black calc(100% - 0.5rem), transparent);`
- **glass-ui `dist/styles/utilities/base.css:17-20`** — *"`initial-value: 0px` = the SHARP floor: an at-rest, no-overflow edge has NO feather (**the R8-08 'Shy' defect — the static `.scroll-fade-*` mask half-erased the first card's chrome at rest** — is structurally impossible because the default is sharp and the timeline OPENS the feather only on real scroll)."*
- **`base.css:346-352`** — `.fading-scroll` *"SUPERSEDES the scroll-BLIND `.scroll-fade-*` masks above (**which feathered both edges unconditionally — the R8-08 'Shy' defect**)."*
- `.fading-scroll--x` (`base.css:366-375`) sets `overflow-x: auto` **and** owns the other axis explicitly (`base.css:353-356`: *"the axis floor below sets the OTHER axis"*) — i.e. it also cures D-3.
- Subpath `./fading-scroll` verified present at **both** 4.0.0 and 7.0.0.

**Three concrete consequences, all source-decidable:**
1. **At rest, the first card is half-erased.** `scroll-left = 0` and the leading 8px are still transparent. This is R8-08 stated exactly.
2. **With a single featured entry there is no overflow at all** — and both ends are still feathered. The strip advertises scrollability it does not have.
3. **The mask fights `scroll-snap-align: start`.** `:89` snaps each card's leading edge to the port's leading edge — which `:68-74` makes transparent. So the snapped card, the one the user just navigated to, is always the faded one. There is no compensating `scroll-padding`: `grep -rn "scroll-padding" web/src` → **zero hits**.

**Magic-number check.** The fade is `0.5rem`. The DS tokens are `--mask-fade-width: 1rem` and `--fade-scroll-width: 1rem` (`dist/styles/tokens/offsets-sizing.css:25-26`). The sibling marquee uses `3rem` (`GalleryMarquee.vue:81`). So the strip's feather is half the system's optical floor and one-sixth of its own sibling's — three different fade widths across two adjacent horizontal strips in the same view.

**Falsifier.** *If the fade were scroll-state driven, or if `scroll-padding-inline-start ≥ 0.5rem` existed, consequences 1 and 3 evaporate.* Neither exists: `:68-74` is a static declaration and the `scroll-padding` grep is empty. *If `.scroll-fade-mask` and `.fading-scroll` were 7.0.0-only, the cure would be uplift-gated* — both are in the installed 4.0.0 `base.css`, so the cure is available now.

---

### D-6 · MAJOR · No landmark, no heading, no carousel semantics — while the shadowed primitive ships all three

**Claim.** Structurally the component is four nested anonymous `<div>`s. The word "Featured" is a `<span>` styled to look like a heading. The scroll port has no `role`, no accessible name, and no `aria-roledescription`. The item wrappers are not slides.

**Provenance.** subject `:21` `<div class="featured-section">`; `:22-25` `<div class="featured-header">` + `<span class="cm-serif text-sm font-semibold tracking-tight">Featured</span>`; `:26` `<div class="featured-scroll">`; `:27-31` `<div class="featured-card-wrapper">`. No `role`, no `aria-*`, no heading element anywhere in the file.

**What the shadowed primitive ships.** `@mkbabb/glass-ui/carousel` — present at **4.0.0 and 7.0.0** — emits `aria-roledescription: "carousel"` on the root and `aria-roledescription: "slide"` on each item (verified in `dist/carousel.js`), handles `ArrowLeft`/`ArrowRight` via an `onKeydown` on the root (verified same file), and ships `CarouselPrevious` / `CarouselNext` positioned off `--carousel-nav-offset` (`dist/styles/components.css`). The component family is `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`, `CarouselPager`, `GlassCarouselPager`, `useCarousel` (`dist/components/ui/carousel/`).

**Falsifier.** *If an ancestor heading named this strip, the missing local heading would be a style question, not a defect.* `GalleryView.vue:249-258` wraps the component in nothing; and the sibling sections are equally headless (`GalleryDraftsSection.vue:60` is a `<span>` inside a `<Button>`; `GalleryInfiniteGrid.vue:23` is a `<p>`). There is no structure to inherit — a screen-reader user's heading list for the entire gallery view is empty, and this component contributes the most visually-heading-like text in it. *If the strip were decorative* — it is the primary surface for curated content and hosts destructive admin controls. Closed.

**Fold.** This is `lane-frontend.md:439`'s candidate-shadow row, confirmed and upgraded: the row records "0 imports"; the *cost* of those zero imports is the a11y contract above.

---

### D-7 · MAJOR · No pointer affordance for horizontal scrolling, and the only pointer target is a 4px scrollbar the author authored

**Claim.** The strip offers no prev/next control. The two signals that content continues are (a) a 0.5rem mask feather that is present even when there is nothing to scroll to (D-5) and (b) a scrollbar that per D-4 renders untokenized or not at all. On a desktop mouse without a horizontal wheel, reaching card #9 requires shift+wheel or dragging a nominally 4px-tall thumb.

**Provenance.** subject `:61-90` — the whole style block; no button, no control, no `::before`/`::after` chevron. `:77-79` — the author sets `::-webkit-scrollbar { height: 4px }`.

**WCAG 2.5.8 Target Size (Minimum, AA).** The criterion's exception is *"the target is determined by the user agent and is not modified by the author."* `:77-79` modifies it, so the exception is forfeited. The "Equivalent" exception also fails: there is no alternative control on the page achieving the same function — precisely because `CarouselPrevious`/`CarouselNext` were never adopted (D-6).

**Falsifier — and an honest concession.** *If keyboard reach were the standard being applied, this would be a non-finding.* It would: each card is `role="button" tabindex="0"` (`GalleryCard.vue:72-73`), so Tab moves focus into the port and the UA scrolls it into view. **I checked 2.1.1 Keyboard specifically and this component PASSES it.** 2.5.8 is a distinct, pointer-only criterion and is the one that bites. *If the 4px were merely nominal because the rule is dead (D-4)* — then the rendered target is whatever the UA chose, and the author-modification that forfeits the exception has still occurred; the finding survives either branch of D-4, which is why the two are booked separately.

---

## §3 · MINOR

### D-8 · MINOR · `.cm-serif` cannot produce Computer Modern — the token it reads is defined nowhere

**Claim.** The section label's font class resolves to the generic `serif` keyword, not to the Computer Modern face the repo self-hosts.

**Provenance.**
- subject `:24` — `class="cm-serif text-sm font-semibold tracking-tight"`
- glass-ui `dist/styles/typography/utilities.css:65-67` — `@utility cm-serif { font-family: var(--font-serif-math, serif); }`
- `--font-serif-math` is **defined nowhere.** `grep -rn "font-serif-math" node_modules/@mkbabb/glass-ui/dist/` → exactly **one** hit, the reference above. `grep -rn "font-serif-math"` over the whole fourier repo excluding `node_modules` → **zero** hits. Not in `src/style.css`, not in `public/fonts.css`, not in `index.html`.
- The real face **is** available: `public/fonts.css:15,22,29,36` declare `@font-face { font-family: "Computer Modern Serif" }` over four self-hosted woff files, preloaded at `index.html:12-14`.
- `src/style.css:13-15` binds that family to `--font-sans`; `src/style.css:19-21` sets the body to `font-serif` (Tailwind's `ui-serif, Georgia, …`).

So the view carries **three distinct serif stacks** — body ≈ Georgia, `font-sans` = Computer Modern, `.cm-serif` = generic `serif` (Times/Liberation) — and the single class that *names* Computer Modern is the only one that cannot resolve it.

**The producer conceded the contract and fourier never performed its half.** `utilities.css:60-64`: *"it resolves to the consumer-supplied serif (system serif by default; **a math consumer maps Computer Modern / KaTeX over it**)."* fourier is the math consumer. The map was never written.

**Falsifier.** *If any loaded stylesheet defined `--font-serif-math`.* Every loaded sheet was searched: the three `@import`s at `src/style.css:1-3` (tailwindcss, tw-animate-css, glass-ui/styles → all of `dist/styles/`), `/fonts.css`, `katex.min.css`, and every scoped block in `src/`. Zero definitions. The *rendered* face is `UNPROVEN-NEEDS-LIVE (SS-13)`; the cascade is source-decidable.

**Scope.** 17 files use `cm-serif`. The cure is one line in `src/style.css`'s `@theme`: `--font-serif-math: "Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif;` — which would repair all 17 at once and is the highest value-per-byte fix in this challenge.

### D-9 · MINOR · Palette escape: `text-amber-400` where the theme-aware semantic token exists and is used for the identical icon

**Claim.** The header Crown is painted with a raw Tailwind palette value; the identical Crown, meaning the identical thing, is painted with the semantic token 126 lines away in the child.

**Provenance.** subject `:23` `<Crown :size="16" class="text-amber-400" />` · `GalleryCard.vue:150` `<Crown :size="12" class="text-tier-featured" />` · `GalleryAdminBanner.vue:57` `color="var(--tier-featured, #fbbf24)"` · `AppHeader.vue:268-269` also uses the token. Token: `glass-ui/dist/styles/tokens/color-radius.css:270` light `oklch(0.841 0.173 84.2)`, `dark-arm.css:141` dark `oklch(0.867 0.165 88.7)`, `light-dark.css:156`; Tailwind bridge `theme/bridges.css:198` `--color-tier-featured: var(--tier-featured)` — so `text-tier-featured` is already a first-class utility.

**Measured divergence** (oklch→sRGB computed, D65, WCAG relative luminance):

| | light | dark | Y (light) |
|---|---|---|---|
| `amber-400` = `oklch(82.8% 0.189 84.429)` | `#ffb900` | `#ffb900` (theme-blind) | 0.5615 |
| `--tier-featured` | `#ffbf00` | `#ffcc32` | 0.5864 / 0.6474 |

Light mode: near-identical, invisible. **Dark mode: the header crown is measurably dimmer and more orange than the card crowns it labels** (ΔY = 0.086).

**HONEST COUNTER — I decline to inflate this into a contrast finding.** Against `--background` light (`--neutral-0: hsl(40 30% 98%)`), `amber-400` is **1.72:1** and `--tier-featured` is **1.65:1**. Both are far below the 3:1 non-text floor, so **adopting the token would make contrast marginally *worse*, not better.** And WCAG 1.4.11 does not bite here at all, because the adjacent word "Featured" (`:24`) carries the meaning and the icon is redundant. This is a theming/conformance defect and nothing more. (The same is *not* true at `GalleryCard.vue:150`, where the tier Crown is the sole carrier with no adjacent text and no accessible name — out of scope for this file, flagged for the card's own challenge.)

**Second-order.** fourier already darkened `--viz-amber` from `hsl(35 70% 42%)` to `hsl(35 76% 35%)` for exactly this class of hazard (`src/style.css:113-127`, D.W4.d, *"axe contrast carry"*). A hard-coded `text-amber-400` is structurally unreachable by that remedy — the escape hatch defeats the repair the team already paid for.

### D-10 · MINOR · The section label is misaligned with the content it labels by 0.25rem

**Provenance.** subject `:49-51` `.featured-section { padding: 0 1rem }` → the first card's left edge is at 1rem. subject `:53-59` `.featured-header { … padding-left: 0.25rem }` → the label's optical left edge is at **1.25rem**. A 4px stagger between a label and the row it names, on an Aristotelian reading: the two elements assert a relationship the geometry then denies.

**Counter-evidence from the sibling.** `GalleryInfiniteGrid.vue:22-23` puts its "N loaded" label and its grid in the same `px-4` box — flush, no stagger.

**Falsifier.** *If the 0.25rem were optical compensation for the Crown glyph's sidebearing.* Rejected on mechanism: the padding sits on the flex **container** (`:53-59`), so it displaces the icon and the text equally; a sidebearing correction would be a negative inline-start margin on the icon alone. The stagger is unmotivated.

### D-11 · MINOR · The inherited hover motion is unguarded under `prefers-reduced-motion: reduce`

**Claim.** Every card in this strip animates `translateY(-4px) scale(1.02)` over `0.25s var(--ease-apple-spring)` — a deliberate **overshoot** easing — on hover, with no reduced-motion guard anywhere in the cascade.

**Provenance.** `GalleryCard.vue:195-198` (the transition, on the overshoot easing) + `:209-213` (the hover transform). `GalleryCard.vue:304-308` — its **only** PRM block, covering `.like-btn.liked :deep(svg) { animation: none }` and nothing else. `src/style.css:92-96` — fourier's only global PRM block, covering `[data-state="active"][role="tabpanel"]` and nothing else. glass-ui ships no universal PRM reset.

**Contrast.** The sibling *does* guard: `GalleryMarquee.vue:126-134`, *"D.W4.c — prefers-reduced-motion guard. WCAG 2.3.3 / A3 #9 finding."* The D.W4.c sweep reached the marquee's autoplay and the card's like-bounce; it did not reach the card's hover transform, which is the motion this strip renders most of.

**Scope honesty.** The declaration lives in `GalleryCard`, not in this file; the carousel is a *host*, and the cure belongs in the card or in a global reset. Booked here because this is the densest host — 100 % featured cards, every one of them also carrying the glow — and because a per-component audit that skipped it would leave the strip's dominant motion unrecorded.

### D-12 · MINOR · Redundant guard: the component's own `v-if` is unreachable-false

**Provenance.** subject `:21` `v-if="entries.length > 0"` · `GalleryView.vue:250` `v-if="featuredEntries.length"`. The sole call site already guards on the same predicate, so the inner branch never evaluates false with a mounted component. Dead code — and the *wrong* one survived: the parent's guard is the one that unmounts under D-1. The correct disposition is to delete the parent's guard and give the component's own the `|| loading` arm.

### D-13 · MINOR · Physical properties where the design system is logical

**Provenance.** subject `:68-74` `linear-gradient(to right, …)`, `:58` `padding-left`, `:50` `padding: 0 1rem`. glass-ui's equivalents are axis-logical: `.fading-scroll--x` drives edge-relative `--fade-start`/`--fade-end` (`base.css:366-375`), and its layout utilities use `inset-inline` (`dist/styles/components.css`). **Severity capped at MINOR on purpose**: `index.html` has no `dir` attribute and the repo has no i18n layer, so this is drift from the system's authoring idiom, not a live bug. It becomes a real bug the day an RTL locale ships, and it is cheap to fix now (`to inline-end`, `padding-inline-start`, `padding-inline`).

---

## §4 · INFO

### D-14 · INFO · No count, no orienting prose

The strip tells the user nothing about its own extent. `GalleryDraftsSection.vue:59-64` gives its section header a `<MetricBadge :value="sortedDrafts.length" size="sm" />`; the Featured strip gives one word. A user cannot tell whether there are 3 featured pieces or 30, nor — given D-5 and D-7 — that the strip scrolls at all. Asymmetric with its own peer in the same view.

*Uplift interaction:* `MetricBadge` is on the census REMOVED list (`./metric-badge` → `./metric` at 7.0.0), 7 files affected. So the honest recommendation is **not** "add a MetricBadge now" — it is "add the count during F.W1, in the `./metric` idiom, as one of the 7+1 sites". Adding it today would enlarge the break surface by one file for no benefit.

### D-15 · INFO · `--deferred-section-size: 17rem` is tuned for the grid cell, not this one

`GalleryCard.vue:199-206` documents the estimate: *"The card is an aspect-[4/3] thumbnail (~11rem **at a ~15rem cell**) + a meta footer, so the never-painted estimate is ~17rem."* This carousel's cell is **16rem** (subject `:86-89`) and the card is `w-full` inside it (`GalleryCard.vue:72`) — at 16rem the 4:3 thumbnail alone is 12rem, so the estimate runs ~1rem short here. Because `contain-intrinsic-size: auto` (glass `base.css:479`) caches the measured size after first paint, the error is first-paint-only and self-correcting. The constant/cell mismatch is source-decidable; any observable jitter is `UNPROVEN-NEEDS-LIVE (SS-13)`. Booked so the F.W4 measurement pass knows the constant was never re-derived for the horizontal host.

### D-16 · INFO · Third render host of the R3-12 duplicated open family

Intake row **`R3-12`** (`intakes/lane-fourier-r3-r6.md:86`, verdict **TRUE / ADOPT-AS-FACT**) names `GalleryCard` `basisLabels` among the 7 duplicated open-family records that make "35 open-family records collapse to 28 unique" — *"any instance denominator built on these rows over-counts by 7 (20 %)."* This carousel (`:32-40`) is one of **three** render hosts of that family, alongside `GalleryInfiniteGrid.vue:26-38` and `GalleryMarquee.vue:37-45`/`:53-61` (the marquee counting twice, since it duplicates its own track for the seamless loop). Any per-instance denominator over gallery cards must dedupe across all three hosts *and* the marquee's internal duplication — a stricter constraint than R3-12 states, because R3-12 counted at the *family* level, not the *host* level.

---

## §5 · Falsified and withdrawn — candidates the tree killed

L-18 runs both ways. These were pursued and abandoned; recording them prevents a later lane from re-raising them.

**F-1 · "Featured entries render twice — once in the carousel, once in the grid below."** **FALSE.** `GalleryView.vue:291` passes `nonFeaturedEntries`, defined at `:68-70` as `gallery.entries.filter(e => e.tier !== "featured")` — an exact disjoint partition against `featuredEntries` at `:64-66`. No double render. The partition is clean and is, quietly, correct design.

**F-2 · "`--tier-featured` is undefined, so the featured border and glow silently die."** **FALSE.** Initially plausible because the token appears nowhere in `web/src` and `GalleryAdminBanner.vue:57` defensively writes `var(--tier-featured, #fbbf24)`. But glass-ui defines it in all three arms: `tokens/color-radius.css:270`, `tokens/dark-arm.css:141`, `tokens/light-dark.css:156`, plus the Tailwind bridge at `theme/bridges.css:198`. The tier styling works. The banner's fallback is belt-and-braces, not a symptom.

**F-3 · "The scroll port is keyboard-unreachable (WCAG 2.1.1)."** **FALSE.** `GalleryCard.vue:72-73` gives every card `role="button" tabindex="0"` (the D.W4.c cure, documented at `:66-70`), so Tab moves focus into the port and the UA scrolls it into view. This component passes 2.1.1. D-3's *clipping* of the focus ring and D-7's *pointer*-target failure are different criteria and survive independently.

**F-4 · "The mask needs a `-webkit-mask-image` companion (the sibling marquee writes both)."** **WITHDRAWN as weak.** glass-ui `base.css:318-326` records the producer's ruling that the `-webkit-` companion is *"dropped — Tailwind v4's Lightning CSS build pipeline auto-prefixes per the browserslist targets"*, and fourier is on Tailwind v4 (`web/package.json:38` `tailwindcss ^4.3.1`) with the Lightning pipeline (`:29` `@tailwindcss/postcss ^4.3.1`). The build supplies the prefix. The divergence from `GalleryMarquee.vue:81-84` (which hand-writes both) is the **marquee's** redundancy, not the carousel's omission. If anything, the carousel is on the right side of this one.

---

## §6 · Superlatives (L-18, both ways)

### S-1 · SUPERLATIVE · Zero uplift break surface, and its cure gets *cheaper* after the uplift

Against the census break list — `metric-badge` ×7 files, `hover-card` ×2, `hover-popover` ×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `ToastVariant` definition-absent (`CENSUS-2026-08-03.md §3a`, `lane-frontend.md §5`) — this file touches **none**. It imports exactly one non-local symbol: `Crown` from `lucide-vue-next` (`:4`). Its entire F.W1 cost is **one import-specifier rename**, 1 of the 35 `@lucide/vue` sites.

Verified by direct comparison of both `package.json` export maps (installed 4.0.0 vs producer 7.0.0): `.`, `./button`, `./badge`, `./carousel`, `./fading-scroll`, `./infinite-scroll` all **survive** to 7.0.0. So the transitive surface is clean too — `GalleryCard`'s `Button`/`Badge`/`Checkbox` all live.

The sharper point: `./carousel` exists at **both** pins. Contrast `GalleryMarquee`, whose `./scrolling-text` was **RETIRED at 5.0.0** (`lane-frontend.md:441`, *"uplift makes this permanently local; keep + book"*). The marquee's shadow becomes permanent; **this one's becomes cheaper**, because 7.0.0 additionally ships `./chip`, `./surface`, `./metric` and a matured `./fading-scroll` around it. This is a pure-improve surface — the rare F.W1 row with upside and no downside.

**Falsifier.** *If a transitively imported child broke, the "zero" would be false.* Checked the full child closure: `GalleryCard` imports `Button` (`./button`), `Badge` (`./badge`), `Checkbox` (bare root `.`) — all three present at 7.0.0; `lucide-vue-next` icons (the same rename); and three local modules. Nothing on the REMOVED list. Closed.

### S-2 · SUPERLATIVE · The scroll-snap wiring is textbook-correct

`scroll-snap-type: x mandatory` on the **port** (`:67`) with `scroll-snap-align: start` on each **item** (`:89`) is the canonical pairing and the one most hand-rolled carousels invert. `flex-shrink: 0` (`:87`) is the correct guard against the flex default that would otherwise crush the 16rem cells into the available width and destroy the snap geometry entirely. Three small decisions, all right.

**Falsifier.** *If `scroll-snap-align` sat on the port, or the shrink guard were missing, or the axis were `y`.* All three checked at `:67`, `:87`, `:89` — correct. The missing `scroll-padding` (D-5) is an *additive* defect on top of correct wiring, not evidence against it; I separate them deliberately so a refactor preserves what works.

### S-3 · SUPERLATIVE · Emit typing and key discipline are better than the idiom requires

`defineEmits` (`:12-17`) is fully typed with tuple signatures, including the discriminated union `tier: "featured" | "saved" | "normal"` — so a typo'd tier is a `vue-tsc` error, which matters in a repo whose *only* frontend gates are `vue-tsc` and 29 chromium Playwright tests (`lane-frontend.md §0, §9` — **vitest ABSENT**). With no unit tests, the type signature is the sole gate this event crosses, and it is a real one.

The forwarder at `:38` — `@set-tier="(h, t) => emit('set-tier', h, t)"` — preserves **both** positional arguments. The naive `@set-tier="emit('set-tier', $event)"` would silently drop the tier and land every admin toggle on `undefined`; the author avoided it here and at `GalleryInfiniteGrid.vue:37`, consistently.

`:key="entry.slug"` (`:29`) uses the stable server identity rather than the loop index, so Vue's keyed diff reuses DOM for surviving cards across the `resetAndFetch` churn of D-1. It does not save the acting card — but without it, D-1 would destroy *every* card's DOM on every action instead of one.

### S-4 · SUPERLATIVE · Typographic register consistency with its true peer

The section-label recipe `cm-serif text-sm font-semibold tracking-tight` (`:24`) is **byte-identical** to `GalleryDraftsSection.vue:60`. The two "collection strip with a titled header" sections in the gallery speak with one voice — including the tracking, which is the detail such pairs usually lose first.

**Falsifier, and the honest bound.** `GalleryInfiniteGrid.vue:23` uses `text-xs text-muted-foreground` instead — so the register is **2 of 3**, not 3 of 3. I credit the carousel for being on the majority side and book the grid as the outlier. And note the recipe itself is broken (D-8): but the *consistency* is real, it is the thing a refactor must preserve, and fixing D-8 fixes both peers at once precisely because they agree.

---

## §7 · Disposition for the wave board

| Finding | Severity | Cure available at 4.0.0? | Wave |
|---|---|---|---|
| D-1 self-destroying section | BLOCKER | n/a (local + store) | **F.W4**, store half **F.W6** |
| D-2 dead admin checkbox | BLOCKER | n/a (local) | **F.W4** — one decision across 3 card hosts |
| D-3 top-edge clip | MAJOR | yes (`.fading-scroll--x` owns the axis floor) | **F.W3/F.W4** |
| D-4 dead scrollbar CSS | MAJOR | **yes — `.scrollbar-thin`, no import change** | **F.W3** (do now) |
| D-5 R8-08 "Shy" mask | MAJOR | **yes — `./fading-scroll`** | **F.W3** |
| D-6 no landmark/heading/carousel semantics | MAJOR | **yes — `./carousel`, survives to 7.0.0** | **F.W3** shadow retirement |
| D-7 no pointer affordance | MAJOR | yes (`CarouselPrevious`/`Next`) | **F.W3**, with D-6 |
| D-8 `.cm-serif` unresolvable | MINOR | **yes — one `@theme` line, fixes 17 files** | **F.W3** (highest value/byte) |
| D-9 `text-amber-400` escape | MINOR | yes (`text-tier-featured`) | **F.W3** |
| D-10 label misalignment 0.25rem | MINOR | n/a | **F.W4** |
| D-11 unguarded hover motion | MINOR | n/a | **F.W4** reduced-motion sweep |
| D-12 redundant guard | MINOR | n/a | fold into D-1 |
| D-13 physical vs logical props | MINOR | yes | **F.W3**, with D-5 |
| D-14 no count | INFO | deferred — `MetricBadge` is on the REMOVED list | **F.W1** (`./metric`) |
| D-15 deferred-size constant | INFO | n/a | **F.W4** measurement |
| D-16 R3-12 third host | INFO | n/a | **F.W4** denominator |

**Six of sixteen — including three of the five MAJORs — are curable today at the old pin with utilities already loaded via `src/style.css:3`, needing no import and no uplift.** That is the headline for the board: this component does not need F.W1 to get materially better. Its two BLOCKERs need neither glass-ui nor the uplift at all.

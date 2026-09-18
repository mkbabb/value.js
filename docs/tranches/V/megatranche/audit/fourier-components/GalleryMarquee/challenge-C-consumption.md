claude-opus-5[1m]

# CHALLENGE · `GalleryMarquee.vue` · axis C — CONSUMPTION

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GalleryMarquee.vue` (134 lines)
**Tree state** `fourier-analysis` @ `cd26c65`, branch `m/w1-bump-migration`, **working tree dirty** — `web/package.json` is one of the 28 uncommitted bump paths (corpus carry #2). The audited dependency set is therefore the *uncommitted* one: `@mkbabb/glass-ui ^4.0.0`, `@mkbabb/keyframes.js ^4.3.0`, `@mkbabb/value.js ^0.13.0` (`web/package.json:14-19`). Committed HEAD still declares `^3.1.0` / `^2.2.0` / `^0.10.0` (`git diff web/package.json`). Every claim below is against the working tree + `web/node_modules` as installed (`@mkbabb/value.js` 0.13.0, `@mkbabb/glass-ui` 4.0.0, `@mkbabb/keyframes.js` 4.3.0 — verified from the installed `package.json`s).
**Method** static + source-derived only. No browser. Livable-only claims carry `UNPROVEN-NEEDS-LIVE` for SS-13.
**Read set (whole)** the component; its direct imports `vue`, `@/lib/types` (`Visualization`, `GalleryTier`), `./GalleryCard.vue`; and transitively `@/lib/api` (`thumbnailUrl`), `../lib/basis-display`, `@/lib/colors`, `@mkbabb/glass-ui/{button,badge}` + root `Checkbox`, `@/components/ui/PathPreview.vue` (import-only, unrendered on this path), plus the sole mount site `GalleryView.vue` and the two sibling hosts `GalleryFeaturedCarousel.vue` / `GalleryInfiniteGrid.vue` as contract controls.

**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. The tree does not exonerate it: its consumption surface is *thin by construction* (it imports no producer package at all), and the thinness is where the defects live — every producer contract it needs, it re-implements or drops. **18 defects, 2 BLOCKER. 3 superlatives** (L-18 both ways).

---

## §0 · The consumption fingerprint (measured)

| Producer | Declared | **Direct** imports in `GalleryMarquee.vue` | Transitive via `GalleryCard.vue` |
|---|---|---|---|
| `@mkbabb/value.js` | `^0.13.0` | **0** | 0 (repo-wide: 5 sites, `easeInOutSine` ×3 + `timingFunctions` ×1 — corpus §9.5) |
| `@mkbabb/keyframes.js` | `^4.3.0` | **0** | 0 |
| `@mkbabb/glass-ui` | `^4.0.0` | **0** | 3 (`/button`, `/badge`, root `Checkbox` — `GalleryCard.vue:3-5`) |
| fourier API (45 ops) | — | **0** | 1 URL-builder, `thumbnailUrl` (`web/src/lib/api.ts:292`) — **not** an operation |

The marquee's *entire* coupling to the constellation is (a) the `Visualization` structural type as an opaque prop, and (b) four re-emitted verbs that land on gallery write operations it does not own. Per intake `X-3` the denominator is **45 total / 30 public-non-admin / 13 admin**; two of the marquee's four emits (`set-tier`, `delete`) terminate in the **admin** arm (`stores/gallery.ts:138 setTier`, `api.ts:509 tier: GalleryTier`). This is precisely the shape intake **R6-8** names: a client leaf that re-emits an operation's verb while owning neither the operation identity nor its authorization. The marquee's only authorization awareness is the boolean `adminMode` prop it forwards without reading (`:41-43`, `:59-61`).

---

## §1 · BLOCKERS

### C-1 · BLOCKER · The component is dead code: its two mount guards are mutually exclusive
**Provenance**
- `GalleryView.vue:64-66` — `const featuredEntries = computed(() => gallery.entries.filter((e) => e.tier === "featured"));`
- `GalleryView.vue:266` — outer guard `v-if="!gallery.entries.length && !gallery.loading"`
- `GalleryView.vue:269-271` — `<GalleryMarquee v-if="featuredEntries.length >= 4" :entries="featuredEntries" …>`
- `GalleryMarquee.vue:27` — internal guard `v-if="entries.length >= 4"`
- `stores/gallery.ts:30` — `const entries = ref<Visualization[]>([])` (the sole source; `:95` `entries.value = result.items.filter(…)`)

**The proof.** `featuredEntries` is `gallery.entries.filter(…)`, so `featuredEntries ⊆ gallery.entries` and `|featuredEntries| ≤ |gallery.entries|`. The outer guard requires `|gallery.entries| === 0`. The inner guard requires `|featuredEntries| ≥ 4`. `Array.prototype.filter` on a zero-length array returns a zero-length array. `0 ≥ 4` is false. **`GalleryMarquee` cannot render on any state of the store.** `grep -rn "GalleryMarquee" web/src/` returns exactly one mount (`GalleryView.vue:269`) — there is no second host to rescue it.

**The false belief is written down.** `GalleryView.vue:259-264`: *"option A: the GalleryMarquee earns the empty state as a living preview band … The marquee gracefully hides itself when entries.length < 4 (its own template guard), so a true cold-empty DB renders the CTA alone."* The author reasoned about the `< 4` case and about the cold-empty case, and never noticed that inside `!gallery.entries.length` **every** case is the cold-empty case. The comment also concedes the inner guard is the operative one — yet the outer `v-if="featuredEntries.length >= 4"` was added anyway (C-12).

**Falsifier.** If `featuredEntries` were sourced from a store field independent of `gallery.entries` (a dedicated `/api/visualizations?tier=featured` fetch, a `gallery.featured` ref, a prefetched hero set), the two guards would be simultaneously satisfiable and this collapses to a MINOR redundancy. It is not: `GalleryView.vue:64-66` filters `gallery.entries` directly and `stores/gallery.ts` exposes no separate featured collection (`:266` returns `entries` as the only list). **Second falsifier:** if `gallery.loading` could be false while `entries` is empty *and* a stale `featuredEntries` persisted — impossible, both derive from the same `ref` in the same tick.

**Consequence for this axis.** Every consumption finding below is *latent*: none of it is currently reaching a user. That does not downgrade them — C-1 is a one-line fix (hoist the marquee out of the empty-state block, or feed it a real featured fetch), and the moment it lands, C-2 through C-18 ship. The correct reading is: **this component has never been exercised**, which is why its producer contracts are all approximations.

---

### C-2 · BLOCKER · The duplicate track puts focusable, event-emitting controls inside `aria-hidden="true"`
**Provenance**
- `GalleryMarquee.vue:51-56` — the dup wrapper: `<div v-for="entry in track" :key="'dup-' + entry.slug" class="marquee-item" aria-hidden="true">`
- `GalleryMarquee.vue:57-65` — a full `<GalleryCard>` inside it, with live `@click`/`@like`/`@set-tier`/`@delete` handlers
- `GalleryCard.vue:70-80` — the card root is `role="button"` **`tabindex="0"`** with `@keydown.enter`/`@keydown.space`
- `GalleryCard.vue:135-145`, `:156-184` — additional focusable glass-ui `<Button>`s (like, crown, bookmark, trash) inside that same subtree
- `GalleryCard.vue:90-95` — a focusable glass-ui `<Checkbox>` when `adminMode` (forwarded at `GalleryMarquee.vue:59`)

**The proof.** `aria-hidden="true"` on an ancestor removes the subtree from the accessibility tree but does **not** remove it from the sequential focus navigation order — that requires `inert` (or `tabindex="-1"` on every focusable descendant). Neither appears anywhere in `GalleryMarquee.vue` (`grep -n "inert\|tabindex" GalleryMarquee.vue` → no match). So for a track of N entries the marquee contributes **N phantom tab stops** (plus 1–4 nested button stops each) that announce nothing to a screen reader and, when activated, fire real `like` / `set-tier` / `delete` emits against real slugs.

**This repo already classifies this exact rule as serious and books it.** `web/e2e/visualization-crud.spec.ts:616-628`: *"glass-ui `ConfiguratorLayer`s collapsed (`aria-hidden="true"`) while keeping their focusable triggers inside (glass-ui omits `inert`) — an axe `aria-hidden-focus` **serious** violation."* That one is vendored and therefore `test.fixme`'d. **This one is app-owned** — fourier wrote both the `aria-hidden` and the `tabindex="0"` — so it has no such excuse, and it would fail the repo's own `checkA11y` helper (`visualization-crud.spec.ts:83-96`, asserts zero serious/critical).

**Falsifier.** Add `inert` to the dup wrapper, or render the dup with `:admin-mode="false"` and a non-interactive card variant, and the finding dies. Alternatively: if `@axe-core/playwright` ^4.11.3 no longer flags `aria-hidden-focus` when the node is `visibility: hidden`/`display:none` — it is not; the dup track is fully painted (it is the visual half of the loop). **Verification gap:** the assertion that axe *reports* it is `UNPROVEN-NEEDS-LIVE` (no browser this pass); the structural fact — focusable descendants under `aria-hidden` — is proven from source at the four line refs above.

**Coupling to C-1.** Fixing C-1 alone ships C-2 into the gallery's empty state. They must land together.

---

## §2 · MAJOR

### C-3 · MAJOR · The seamless loop is not seamless: `translateX(-50%)` is short by exactly `gap/2`
**Provenance** `GalleryMarquee.vue:91-96` (`display:flex; gap: 1rem; width: max-content`), `:110-114` (`.marquee-item { width: 220px }`), `:116-124` (`from translateX(0) → to translateX(-50%)`), `:34-66` (the strip is the N originals **plus** N duplicates in one flex container).

**The arithmetic.** One `.marquee-inner` holds `2N` items of width `w = 220px` in a flex box with gap `g`. Flex gap applies **between** items: `W = 2N·w + (2N − 1)·g`. A seamless tile requires translating by exactly one period `P = N·(w + g)`. The rule translates by `W/2 = N·w + N·g − g/2 = P − g/2`. **The animation is short by `g/2` every cycle.**

`g = 1rem`, and the root font-size is inverted-responsive: `style.css:40-42` sets `html { font-size: 1.125rem }` as the mobile-first base, `style.css:45-50` narrows it to `1rem` at `min-width: 768px`. So `g = 18px` below 768px and `16px` at/above it ⇒ **a 9px (mobile) / 8px (desktop) horizontal snap at every loop restart**, once per 45s on the left track and once per 50s on the right (`:103`, `:107`).

**The producer does this correctly, and the contrast is the point.** glass-ui 4.0.0's own scroller measures instead of assuming: `node_modules/@mkbabb/glass-ui/dist/ScrollingText-CUVFTWk2.js` — `let n = t.scrollWidth - e.clientWidth; … e.style.setProperty("--scroll-distance", \`${y.value}px\`)`, recomputed under two `useResizeObserver` subscriptions. The marquee hard-codes a percentage that is only correct when `gap: 0`.

**Falsifier.** Set `gap: 0` on `.marquee-inner` and move the spacing into `.marquee-item { margin-right }` (margins are per-item, so `W = 2N(w+m)` and `W/2 = N(w+m) = P` exactly) — the defect vanishes and the claim is confirmed by its own cure. Or: if the browser resolved flex `gap` as trailing-inclusive (`2N` gaps), `W/2` would equal `P` and the claim is false — CSS Box Alignment §8 is explicit that `column-gap` is placed *between* items only, and `width: max-content` on a flex container sums exactly `Σw + (n−1)g`. **UNPROVEN-NEEDS-LIVE:** the perceptual magnitude of an 8–9px snap (whether users notice) — the geometric deficit itself is proven.

### C-4 · MAJOR · Scroll velocity is proportional to entry count — a fixed duration over a content-proportional distance
**Provenance** `GalleryMarquee.vue:102-108` — `animation: marquee-scroll-left 45s linear infinite` / `marquee-scroll-right 50s`; `:19-23` — `tracks` splits `entries` round-robin into 2.

**The arithmetic.** Distance travelled per cycle is `W/2 ≈ N·(w+g)`; duration is a constant 45s. Velocity `v = N·(220+16)/45 ≈ 5.24·N px/s` (desktop). At the minimum admissible input (`entries.length ≥ 4` ⇒ `N = 2`): **10.5 px/s** — a card crosses in ~21s, essentially static. At a plausible featured set of 40 (`N = 20`): **105 px/s** — 10× faster, a blur. The component's *feel* is a function of how many rows the admin has starred, which is not a design parameter anyone chose.

**Again the producer normalizes and the local does not:** `ScrollingText-CUVFTWk2.js` computes `--scroll-duration` as `Math.max(4, distance/80 + 4)` — i.e. it pins **px/s**, not seconds. That is the canonical idiom in this constellation; the marquee ignores it.

**Falsifier.** If `entries` were bounded to a fixed count upstream (e.g. `featuredEntries.slice(0, 8)`), the velocity spread collapses and this is MINOR. It is not bounded — `GalleryView.vue:271` passes `featuredEntries` whole, and `stores/gallery.ts:95` fills `entries` from a paged `result.items` with no featured cap. Second falsifier: bind `animation-duration` to a `--marquee-duration` custom property computed from `tracks[i].length` — the fix confirms the diagnosis.

### C-5 · MAJOR · The reduced-motion guard strands the content it stops moving
**Provenance** `GalleryMarquee.vue:126-133` (`@media (prefers-reduced-motion: reduce) { .marquee-inner { animation: none; } }`), `:80-89` (`.marquee-track { overflow: clip; … }`), `:94` (`width: max-content`).

**The proof.** Under `reduce` the strip stops at `translateX(0)` while still being `max-content` wide — for `N = 20` that is ~9.4× the viewport. The container is `overflow: clip`. Per CSS Overflow 3 §3, `clip` — unlike `hidden` — establishes **no scroll container**: the box is not scrollable by the user *and* not programmatically scrollable (`scrollLeft` is inert, `scrollIntoView` cannot reach it). There is no pagination, no arrows, no drag. **Every card past the first viewport width is unreachable by any input modality** for a reduced-motion user. The guard converts an accessibility accommodation into a content amputation.

**The sibling proves the correct shape exists in-repo.** `GalleryFeaturedCarousel.vue:61-75` renders the same `GalleryCard` strip with `overflow-x: auto` + `scroll-snap-type: x mandatory` + a styled thin scrollbar — fully reachable, motion-free, and it needs no reduced-motion guard at all because nothing auto-moves.

**Falsifier.** Change `.marquee-track` to `overflow-x: auto` inside the `reduce` block (or unconditionally) and the content is reachable — the fix is one declaration, which is itself evidence the omission was not a considered trade. Conversely the claim dies if some ancestor provides horizontal scrolling: it does not — `GalleryView.vue:266-268` wraps the marquee in `flex flex-col items-center justify-center`, and `App.vue:26` sets `overflow-y-auto` (vertical only) on `<main>`. **UNPROVEN-NEEDS-LIVE:** the exact card count visible at a given viewport.

### C-6 · MAJOR · Pause is pointer-only — the WCAG 2.2.2 mechanism is unreachable by keyboard, and it fights the tab order
**Provenance** `GalleryMarquee.vue:98-100` — `.marquee-track:hover .marquee-inner { animation-play-state: paused !important; }`. `grep -n "focus" GalleryMarquee.vue` → **no match.**

**The proof.** The only pause affordance is `:hover`. A keyboard user tabbing into the marquee lands on a `GalleryCard` (`GalleryCard.vue:70-80`, `tabindex="0"`) inside a strip translating at 10–105 px/s (C-4) that does not stop, because `:hover` never matched. The focus ring (`style.css:139 .gallery-card:focus-visible`) tracks a moving target; activating it is a moving-target hit. `:focus-within` on `.marquee-track` is the one-selector cure and is absent. Corpus `lane-frontend.md:622` records this file as the site that *names* its WCAG provenance ("WCAG 2.3.3 / A3 #9") — the 2.3.3 (animation-from-interaction) reading was satisfied; **2.2.2 (Pause, Stop, Hide) was not**, and 2.2.2 is the criterion that actually governs a >5s auto-scrolling region.

**This compounds C-2:** with the dup track focusable, the tab order through the marquee is `2N` stops long, all of them moving, half of them invisible to AT.

**Falsifier.** `.marquee-track:hover, .marquee-track:focus-within { … paused }` kills it. The claim is false only if some global rule already pauses on focus — `grep -rn "animation-play-state" web/src/` returns this line as the sole occurrence in the gallery tree.

### C-7 · MAJOR · Props/emits contract truncation: `selected` / `toggle-select` are dropped while `admin-mode` is forwarded — the admin checkbox renders inert
**Provenance**
- `GalleryMarquee.vue:6-10` — props are `{ entries, adminMode?, likedHashes? }`; **no `selectedHashes`**
- `GalleryMarquee.vue:12-17` — emits are 4; **no `toggle-select`**
- `GalleryMarquee.vue:42`, `:60` — `:admin-mode="adminMode"` **is** forwarded to both tracks
- `GalleryCard.vue:19-24` — the child accepts `selected?: boolean`; `:26-32` — it emits `"toggle-select": [hash, checked]`
- `GalleryCard.vue:86-96` — `v-if="adminMode"` renders a glass-ui `<Checkbox :model-value="selected ?? false" @update:model-value="… emit('toggle-select', …)">`
- **Control:** `GalleryInfiniteGrid.vue:11` (`selectedHashes?: Set<string>`), `:20` (`"toggle-select"` emit), `:34` (`:selected="selectedHashes?.has(entry.slug) ?? false"`), `:40` (forwards it) — the sibling implements the full contract
- **Sink:** `GalleryView.vue:150-163` (`selectedHashes` ref, `toggleEntrySelected`), `:165-169` (`askBatchGallery` gated on `selectedHashes.value.size`)

**The proof.** Because `adminMode` is forwarded but `selected` is not, every card in the marquee renders a checkbox whose `model-value` is permanently `false` (`selected` is `undefined` ⇒ `?? false`) and whose `update:model-value` reaches a `toggle-select` emit that **has no listener anywhere** — the marquee neither declares it nor re-emits it, so Vue drops it (it is not in `emits`, so it also does not fall through as a native `on-toggle-select` attr on a component root). In admin mode the marquee therefore paints a control that is uncheckable and unbatched, adjacent to crown/bookmark/trash buttons that *do* work (`:44-47`, `:62-65`). That is a worse failure than omitting admin mode: it advertises a capability the seam cannot deliver.

**Falsifier.** Either (a) accept + forward `selectedHashes` / `toggle-select` as `GalleryInfiniteGrid` does, or (b) hard-pin `:admin-mode="false"` on the marquee's cards (defensible — a decorative empty-state band has no business being a batch-selection surface). Either fix confirms the finding. The claim would be false if `GalleryCard` guarded the checkbox on `selected !== undefined` — it does not (`GalleryCard.vue:87` guards on `adminMode` alone).

### C-8 · MAJOR · value.js under-consumption: the hand-rolled `cssVarToHex` cannot parse the tokens glass-ui 4.0.0 actually ships, so the whole viz palette resolves to `#888888`
**Provenance**
- `web/src/lib/colors.ts:20-53` — `cssVarToHex()`: arms for `#hex`, `hsl(h s% l%)`, a bare Tailwind triplet, and `rgb(r,g,b)`; **`return "#888888"`** on every other input (`:52`), plus `if (!raw) return "#888888"` (`:24`)
- `web/src/lib/colors.ts:89-96` — `resolveVizColors()` overwrites `VIZ_COLORS.fourier/chebyshev/legendre/amber/green` from `--viz-*`
- `web/src/App.vue:10-18` — called `onMounted` + on every `class` mutation of `<html>` (dark-mode flip)
- **What the tokens actually are:** `node_modules/@mkbabb/glass-ui/src/styles/tokens/color-radius.css:263-265` — `--viz-fourier: oklch(0.579 0.201 30.4);` `--viz-chebyshev: oklch(0.484 0.163 265.5);` `--viz-legendre: oklch(0.532 0.180 317.5);`; dark arm at `tokens/dark-arm.css:113-115`; and the `light-dark()` arm at `tokens/light-dark.css:145-147` — `--viz-fourier: light-dark(oklch(…), oklch(…));`
- **They are producer-owned, not app-owned:** `grep -rn -- "--viz-[a-z]*:" web/src/` → only `style.css:120,125` (`--viz-amber`, the D.W4.d contrast override). `--viz-fourier/chebyshev/legendre/green` are declared **nowhere** in the app; they arrive via `style.css:3 @import "@mkbabb/glass-ui/styles"`.
- **The library that solves this is already installed and already imported:** `node_modules/@mkbabb/value.js/dist/index.d.ts:42` exports `parseCSSColor` (+ `CSSColor`, `registerColorNames`); `:10` exports `OKLCHColor`; `:16` exports `color2` (the space-dispatch converter); `grep -c oklch dist/value.js` → **31**.

**The proof.** For an unregistered custom property, `getComputedStyle(el).getPropertyValue("--viz-fourier")` returns the specified token stream with `var()` substituted — i.e. the literal string `oklch(0.579 0.201 30.4)` (or `light-dark(oklch(…), oklch(…))` where that arm wins). Neither matches the `#`-prefix test, the `hsl(` regex (`colors.ts:31-34`), the bare-triplet regex (`:39`), or the `rgb(` regex (`:45-47`). **`resolveVizColors()` therefore writes `#888888` over the three basis colours on mount and on every theme flip.** `--viz-amber` survives only by accident — it is `var(--section-color-5)` upstream (`color-radius.css:266`) and the app overrides it to `hsl(35 76% 35%)` (`style.css:120`), which the `hsl(` arm happens to match. `--viz-green` (`--section-color-4`, `color-radius.css:267`) has no such override and greys out too.

This is the F.W2 migration surface stated exactly: fourier depends on a CSS-colour library whose entire purpose is this parse, imports it at 5 sites for *easings only*, and hand-rolls a strictly weaker four-arm parser for colour. The producer moved its token vocabulary to OKLCH; the consumer's regex did not follow, and the failure mode is silent (a plausible grey, not a throw).

**Falsifier.** Replace `cssVarToHex` with `parseCSSColor(raw)` + `color2(…, "rgb")` and the greys become the intended hues — the fix is the proof. The claim dies if (a) `getPropertyValue` returned a browser-resolved `rgb()` for custom properties — it does not for unregistered props, and none of these are `@property`-registered (`grep -rn "@property" node_modules/@mkbabb/glass-ui/src/styles/ web/src/style.css` → no `--viz-*` registration); or (b) some later assignment restores the hues — `grep -rn "VIZ_COLORS\." web/src/` shows `colors.ts:91-95` as the only writers. **UNPROVEN-NEEDS-LIVE:** the rendered pixel value; the parse-arm mismatch is proven from both source trees.

### C-9 · MAJOR · `basisDisplay` snapshots the reactive palette at module-eval — the marquee's basis pills are frozen and theme-blind
**Provenance** `web/src/components/visualization/lib/basis-display.ts:1-7` — a plain module-level `Record` whose three `color:` fields read `VIZ_COLORS.fourier` / `.chebyshev` / `.legendre` **at import time**; `web/src/lib/colors.ts:78-87` — `VIZ_COLORS = reactive({ fourier: "#bf4040", chebyshev: "#3d72b8", legendre: "#9545b8", … })`; `GalleryCard.vue:36-51` — `basisLabels` computed reads `basisDisplay[key].color`; `GalleryCard.vue:115-125` — the value lands as `:style="{ '--pill-c': b.color }"` on a glass-ui `<Badge>`, consumed by `.basis-tint` (`GalleryCard.vue:270-274`).

**The proof.** Module evaluation of `basis-display.ts` reads the reactive proxy once and stores three **plain strings**. `App.vue:11` calls `resolveVizColors()` in `onMounted`, strictly after all module evaluation. So `basisDisplay.fourier.color` is `"#bf4040"` forever. Worse for reactivity: because `basisDisplay` is a non-reactive plain object, `basisLabels` (`GalleryCard.vue:36`) never registers a dependency on `VIZ_COLORS` and **cannot re-run on the dark-mode `MutationObserver` flip** (`App.vue:12-17`). The pills are both wrong-valued and theme-locked.

**The two defects mask each other.** C-8 would paint the pills `#888888`; C-9 prevents C-8's write from ever reaching them, so they stay at the hardcoded `#bf4040` / `#3d72b8` / `#9545b8` — which are *also* not glass-ui's `oklch(0.579 0.201 30.4)` family. On this surface the observable symptom is "slightly off-brand, never adapts", which is why neither has been caught. The marquee renders these pills **2N times** (original + dup track).

**Corpus fold.** Intake `lane-fourier-r3-r6.md` row **R3-12** names `GalleryCard` `basisLabels` explicitly as one of the 7 duplicated open-family rows (`R3-HA-004`). That row establishes the *derivation-model* duplication; this finding establishes the *runtime* defect underneath it. No contradiction — an extension.

**Falsifier.** Make `basisDisplay` a `computed`/getter over `VIZ_COLORS` (or move the `color` read into `basisLabels`) and the pills track theme — the fix is the proof. The claim is false if `reactive()` deep-tracked the *destructured string* — it cannot; primitives copied out of a proxy carry no reactivity.

### C-10 · MAJOR · glass-ui 4.0.0 declares `value.js ^0.10.0 || ^0.11.0`; the tree installs 0.13.0 — the producer runs against an undeclared minor
**Provenance** `web/package-lock.json:334-338` — the `@mkbabb/glass-ui@4.0.0` node's `peerDependencies` include `"@mkbabb/value.js": "^0.10.0 || ^0.11.0"` (marked `optional` at `:357-359`); `web/package.json:18` — the app declares `^0.13.0`; `web/package-lock.json:381` — `@mkbabb/keyframes.js@4.3.0` **hard-depends** `"@mkbabb/value.js": "^0.13.0"`; `find web/node_modules -name package.json -path "*value.js*"` → exactly **one** copy, version **0.13.0**.

**The proof.** For `0.x` ranges, `^0.10.0 || ^0.11.0` admits `0.10.x` and `0.11.x` only. The single hoisted copy is `0.13.0`, so glass-ui's declared range is unsatisfied — and it cannot be satisfied while keyframes 4.3.0 hard-requires `^0.13.0`, because a nested duplicate would fork the `Color`/`ValueUnit` identity. glass-ui's value.js-bearing chunks are real, not vestigial: `grep -rl "@mkbabb/value.js" node_modules/@mkbabb/glass-ui/dist/*.js` → `aurora.js`, `color-DweYl7pE.js`, `motion-curves.js`. `motion-curves` is the token substrate under the `--ease-*` vocabulary `GalleryCard.vue:194-198` consumes, which the marquee's cards paint on every hover.

This is the same knot the corpus names as `[P0]` (`lane-frontend.md` §9.1: keyframes `~4.0.0`-locks glass-ui while glass-ui 7 peers keyframes `^6` and value `^4`) — measured **one hop earlier**: the deadlock is already *live at 4.0.0*, not only at the 4→7 hop. The uncommitted bump on `m/w1-bump-migration` did not create a clean state; it created a differently-broken one.

**Falsifier.** `npm ls @mkbabb/value.js` / a clean `npm ci` — if npm resolves without `ERESOLVE`, npm is declining to check an *optional* peer that is nonetheless present, which would downgrade this from "install-blocking" to "silent version drift" but not eliminate it (glass-ui still executes against an API two minors ahead of its contract). If glass-ui 4.0.0's value.js imports are type-only, downgrade to MINOR — they are not; the three `dist/*.js` runtime chunks above import it. **UNPROVEN-NEEDS-LIVE:** whether any 0.12/0.13 breaking change actually reaches those chunks at runtime.

### C-11 · MAJOR · The tier union is re-inlined instead of imported — from a module the component already imports
**Provenance** `GalleryMarquee.vue:15` — `"set-tier": [hash: string, tier: "featured" | "saved" | "normal"]`; `GalleryMarquee.vue:3` — `import type { Visualization } from "@/lib/types"`; `web/src/lib/types.ts:96` — `export type GalleryTier = "featured" | "saved" | "normal";`.

**The proof.** The canonical type exists, is exported from the exact module the component already imports on line 3, and is used correctly by the non-view layer (`api.ts:8,509`; `stores/gallery.ts:3,138`; `types.ts:232 tier?: GalleryTier`). The literal is nonetheless hand-retyped at **8 sites**: `GalleryMarquee.vue:15`, `GalleryCard.vue:29`, `GalleryFeaturedCarousel.vue:15`, `GalleryInfiniteGrid.vue:19`, `GalleryCardModal.vue:28`, `GalleryView.vue:132`, plus two `"all" | …` variants at `GallerySearchBar.vue:17,24` and `stores/gallery.ts:33`. A widened `GalleryTier` (a fourth tier) type-checks green at all 8 while silently narrowing every gallery emit.

**Why this is a consumption defect, not a style nit.** It is the client-side twin of intake **R6-8**: an operation whose identity is re-declared at each client leaf cannot be attributed to one side of the seam. `set-tier` here is a *client* leaf for the admin operation `PATCH /api/visualizations/{slug}/tier` (`api.ts:509`); R6-8's carry to F.W5 — *"keep operation identity independent of client identity"* — presupposes that the client leaf has **one** type. It has eight.

**Falsifier.** `import type { Visualization, GalleryTier } from "@/lib/types"` and use it — a two-token change, which is exactly the measure of how gratuitous the duplication is. The claim is false only if `GalleryTier` were declared *after* the SFCs needed it (import cycle) — `types.ts` imports nothing from the component tree (`head -10 web/src/lib/types.ts` — no component imports).

---

## §3 · MINOR

### C-12 · MINOR · The `>= 4` threshold is duplicated across the seam, and the mount-site comment asserts the duplication is unnecessary
`GalleryMarquee.vue:27` and `GalleryView.vue:270` both encode `>= 4`, while `GalleryView.vue:262-264` states the internal guard is what handles the case. Two owners for one policy constant, with a comment claiming there is one. Directly implicated in C-1: had the threshold lived in exactly one place, the contradiction with the outer `!gallery.entries.length` would have been visible in a single expression. **Falsifier:** hoist to a shared `MARQUEE_MIN_ENTRIES`, or drop the outer guard.

### C-13 · MINOR · `width: 220px` — the only px card width among three hosts, in a system with an inverted responsive root
`GalleryMarquee.vue:112` `width: 220px` vs `GalleryFeaturedCarousel.vue:88` `width: 16rem` vs `GalleryInfiniteGrid.vue` `minmax(14rem, 1fr)`. Under `style.css:40-50` the root is **18px below 768px** and 16px at/above — so the two rem hosts render the same `GalleryCard` at 288px/252px on mobile and 256px/224px on desktop, while the marquee is frozen at 220px on both. On mobile the card's rem/em-scaled interior (`GalleryCard.vue:109` `text-sm` + `:123` `text-[1.1em]`) is 12.5% larger inside a box that is 24% narrower than the carousel's — the truncation pressure (`truncate` at `:109`, `whitespace-nowrap` at `:110`,`:120`) peaks exactly where space is scarcest. **Falsifier:** switch to `width: 14rem` and the three hosts agree; or if the marquee is intentionally the "small" variant, the ratio should still be expressed in rem. **UNPROVEN-NEEDS-LIVE:** actual overflow/ellipsis.

### C-14 · MINOR · `will-change: transform` is unconditional and survives the reduced-motion opt-out
`GalleryMarquee.vue:95`. Two tracks × `2N` cards, each card carrying a lazily-loaded `<img>` (`GalleryCard.vue:99-104`), are promoted to permanent compositor layers for the component's whole lifetime — including under `prefers-reduced-motion: reduce`, where `:130-132` sets `animation: none` and there is nothing left to hint. The MDN/`will-change` contract is "apply shortly before, remove after"; a static declaration is the documented anti-pattern. **Falsifier:** move `will-change` inside the animated selectors and add `will-change: auto` to the `reduce` block; or if the card subtree is already promoted for other reasons (it is not — `GalleryCard.vue` declares no `transform` at rest, only on `:hover`/`:active` at `:209-217`).

### C-15 · MINOR · `!important` on the pause rule with no competing declaration
`GalleryMarquee.vue:99` — `animation-play-state: paused !important;`. The only other `animation-play-state` in the gallery tree is this line (`grep -rn "animation-play-state" web/src/`); the specificity of `.marquee-track:hover .marquee-inner` (0,2,0 + pseudo) already exceeds `.marquee-left .marquee-inner` (0,2,0, earlier in source). The `!important` is cargo — and it will suppress any future legitimate override (e.g. a JS-driven pause control, which C-6 will require). **Falsifier:** delete it; the pause still applies.

### C-16 · MINOR · Odd `entries.length` yields unequal tracks under hardcoded asymmetric durations
`GalleryMarquee.vue:19-23` — round-robin gives track 0 `⌈N/2⌉` and track 1 `⌊N/2⌋`. With 5 entries the tracks hold 3 and 2, travel `3(w+g)` and `2(w+g)`, over a *fixed* 45s and 50s — so the top track runs 1.67× the bottom track's px/s, an asymmetry that is a side effect of parity rather than the intended 45/50 (1.11×) contrast. Compounds C-4. **Falsifier:** even entry counts, or duration derived from track length.

---

## §4 · INFO

### C-17 · INFO · Index key on the track loop
`GalleryMarquee.vue:30` `:key="tIdx"` over a fixed 2-tuple. Harmless here (the array identity and order never change), but it is the wrong idiom in a file whose other two loops correctly key on `entry.slug` (`:38`) and `'dup-' + entry.slug` (`:54`). **Falsifier:** none needed — the array is length-2 and constant; recorded as idiom drift only.

### C-18 · INFO · Zero direct API consumption; the dup track doubles thumbnail DOM and decode
The only fourier-API touch on this path is `thumbnailUrl(entry.image_slug)` (`web/src/lib/api.ts:292-294`, a pure string builder → `${BASE}/api/images/${imageSlug}/thumbnail`) called from `GalleryCard.vue:100`. The duplicate track (C-2) doubles the `<img>` count to `2N` per track. HTTP caching dedups the *bytes* (identical URLs), and `loading="lazy"` (`GalleryCard.vue:103`) bounds what decodes — so the cost is DOM nodes and decoded bitmaps for whatever is on-screen, not network. Recorded because it is the marquee's whole API footprint. **Falsifier / UNPROVEN-NEEDS-LIVE:** measure decoded-image memory with the dup track present vs a CSS-`clone`d (`element()`/pseudo) alternative; not measurable statically.

---

## §5 · SUPERLATIVES (L-18 both ways)

### S-1 · The horizontal-only fade mask is genuinely well-reasoned, and the reasoning is written down
`GalleryMarquee.vue:84-88` — `mask: linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent) 0 -50% / 100% 200%;` with the comment *"Horizontal-only fade: tall vertical extent keeps top/bottom unclipped."* The naive version of this rule (`mask: linear-gradient(to right, …)` at default `0 0 / 100% 100%`) is a well-known trap: a single-axis mask still composites over the full box, so a card's `:hover` lift (`GalleryCard.vue:210` `translateY(-4px) scale(1.02)`) fades at the top edge. Sizing the mask to `200%` height and offsetting it `-50%` places the gradient's vertical midband over the content, so only the horizontal stops bite. It is paired with `padding: 0.75rem 0` on `.marquee-track` (`:83`) — 12px of headroom against a ~4px translate + ~1% scale — so the lift also clears the `overflow: clip` edge. Two coupled details, both correct, both explained. **Falsifier:** set the mask to `0 0 / 100% 100%` and the hover lift fades at the track's top edge; remove the `0.75rem` padding and it clips instead. Both regressions confirm the current values are load-bearing rather than incidental.

### S-2 · Correctly declines to consume keyframes.js and value.js here — and the corpus's "stays local" ruling re-derives from the tree
An infinite constant-velocity translate is precisely the case where a JS animation engine is the wrong substrate: CSS `animation … linear infinite` runs off the main thread on the compositor, survives long-task jank, and costs zero JS. Importing `loadAnimationEngine` (as `composables/useFourierMorph.ts:14` correctly does for *interpolated, interruptible* morphs) would have been the cargo-cult choice. Independently of the corpus I re-derived its shadow ruling: glass-ui 4.0.0's `./scrolling-text` takes `props: { text, class }` and scrolls **overflowing text** inside a `<span>` (`dist/ScrollingText-CUVFTWk2.js`) — it accepts a default slot but is measured, sized and named for text, not for a two-track duplicated card strip; and `./carousel` is the paged/snap idiom the *sibling* wants (`GalleryFeaturedCarousel`), not this one. This corroborates `formation/fourier/lane-frontend.md:440` ("`./scrolling-text` RETIRED at 5.0.0 … uplift makes this permanently local; keep + book") and `CENSUS-2026-08-03.md:100` ("GalleryMarquee stays local") from the installed tree rather than from the CHANGELOG. **Falsifier:** if `./scrolling-text` or `./carousel` at 4.0.0 exposed an infinite-loop mode over arbitrary slot children, this becomes a shadow-component finding — neither does; `ScrollingText`'s loop distance is `scrollWidth - clientWidth` (a *finite* overflow), which cannot express a seamless tile.
*(Caveat, not a retraction: declining the engine was right; declining the producer's **measurement idiom** was not — see C-3/C-4, which fault the hand-roll for ignoring `ScrollingText`'s runtime-measured `--scroll-distance` / normalized `--scroll-duration`, not for choosing CSS.)*

### S-3 · The reduced-motion guard exists at all, with its WCAG provenance in-line
`GalleryMarquee.vue:126-133`. This is 1 of only 8 CSS `reduce` blocks in the entire frontend (corpus `lane-frontend.md:619` enumerates them), it names the wave and the finding that produced it (*"D.W4.c … WCAG 2.3.3 / A3 #9 finding"*), and it correctly identifies the marquee as non-essential motion. Against a tree where the two *primary* animation clocks (`stores/animation.ts`, `ConvergencePlot.vue`'s rAF) remain ungated under `reduce` (corpus `lane-frontend.md` §8 ⚠ COVERAGE GAP), a decorative band that stops itself is above the median. **Falsifier — and it bites:** the *implementation* is defective (C-5 — `animation: none` under `overflow: clip` strands the content) and it addresses the wrong success criterion for an auto-scrolling region (C-6 — 2.3.3 is about interaction-triggered motion; 2.2.2 Pause/Stop/Hide is the governing one, and the hover-only pause does not satisfy it). The superlative is the *instinct and the documentation habit*, not the result.

---

## §6 · Corpus reconciliation

| Corpus row | This challenge |
|---|---|
| `lane-frontend.md:109` — "Horizontal auto-scroll strip — SHADOW candidate, §4" | **Agrees, and resolves it:** §4 concluded "keep local"; I re-derive that from the installed `ScrollingText` implementation (S-2). |
| `lane-frontend.md:440` — "`./scrolling-text` (4.0.0) — RETIRED at 5.0.0 … permanently local; keep + book" | **Agrees.** Adds: the producer's *idiom* (runtime-measured distance, normalized px/s) should have been carried even though its *component* should not (C-3, C-4). |
| `lane-frontend.md:619,622` — the file listed among 8 CSS `reduce` blocks; "names the provenance" | **Agrees on the fact, contradicts the implied credit.** The block is present and documented (S-3) but strands content (C-5) and misses 2.2.2 (C-6). The corpus counted *presence*; this counts *effect*. |
| `CENSUS-2026-08-03.md:100` — "GalleryMarquee stays local (producer retired `./scrolling-text` at 5.0.0)" | **Agrees.** |
| `lane-frontend.md` §9.1 `[P0]` — the tri-package deadlock is a 4→7 problem | **Extends / partially contradicts:** the deadlock is already live **at 4.0.0** — glass-ui 4.0.0 peers `value.js ^0.10.0 \|\| ^0.11.0` against an installed 0.13.0 (C-10). The uncommitted bump did not reach a consistent state. |
| `lane-frontend.md` §9.5 — "value.js 0.13 → 4.0 consumer surface is tiny (5 sites, `easeInOutSine` + `timingFunctions`) — the cheapest leg" | **Contradicts the framing.** The surface is small because it is *under-consumed*: `lib/colors.ts` hand-rolls a colour parser that value.js already exports and that fails on the producer's own OKLCH tokens (C-8). The correct post-migration surface is **larger**, and the migration is the moment to close it. |
| intake `R3-12` — `GalleryCard` `basisLabels` named as a duplicated open-family row | **Agrees; supplies the runtime root cause** — `basisDisplay` snapshots the reactive palette at module-eval (C-9). |
| intake `R6-8` — an operation record embedding client back-references cannot attribute a defect to one side | **Agrees; supplies a client-side instance** — the `set-tier` client leaf's type is re-declared at 8 sites (C-11), so the client identity is not even single-valued before the join is attempted. |
| intake `R5-7` / `R6-5` — template-loop evidence keyed to *component* callsites is blind to native element loops | **Direct hit.** All three of this component's `v-for`s are on native `<div>`s (`:29`, `:36`, `:52`); the `GalleryCard` inside is a component but the *loop* is not. Under the pre-`NATIVE_TEMPLATE_LOOP` model this file's entire structure registers nowhere. F.W4's per-component D/L/C audit must count these three. |
| intake `X-3` — 45 ops / 30 public-non-admin / 13 admin | **Adopted as the denominator.** Direct consumption from this component: **0 of 45**; transitive: 1 URL-builder (not an operation); re-emitted verbs terminating in the admin arm: 2 (`set-tier`, `delete`). |

---

## §7 · Verdict

**DEFECTIVE — and never once exercised.** The headline is C-1: the component's two mount guards are mutually exclusive, so 134 lines, four emits and an admin surface have shipped unrendered since `2e4a452 feat(D.W4)`. That single fact explains the rest of the file's character: an unexercised component accumulates *approximations* of its producer contracts, and every finding here is one — a `-50%` that assumes `gap: 0` (C-3) where the producer measures (`ScrollingText`); a fixed duration where the producer normalizes px/s (C-4); a reduced-motion guard that stops motion and strands content (C-5); a pause the keyboard cannot reach (C-6); a forwarded `adminMode` without the `selected`/`toggle-select` half of the contract its sibling implements (C-7); a hand-rolled colour parser that cannot read the producer's own OKLCH tokens while `parseCSSColor` sits installed and unused (C-8/C-9); a peer range already violated at 4.0.0 (C-10); a tier union retyped at 8 sites (C-11).

**Landing order is forced.** C-1 and C-2 must land together — curing the dead mount alone ships an `aria-hidden`-with-focusable-descendants violation (a rule this repo already grades *serious* at `visualization-crud.spec.ts:621`) into the gallery's empty state. C-8 and C-9 must land together — C-9 currently masks C-8's symptom, so fixing either alone changes the palette to the *other* wrong value. C-10 belongs to the tri-package `[P0]`, not to this component.

**What the component earns.** The mask geometry (S-1) and the decision to stay on CSS rather than import an animation engine (S-2) are both correct and both reasoned in writing; the reduced-motion instinct (S-3) is above the tree's median even though its execution fails. This is not a careless file. It is an un-run one.

**Counts** — defects **18** (BLOCKER 2 · MAJOR 9 · MINOR 5 · INFO 2) · blockers **2** · superlatives **3**.

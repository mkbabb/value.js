claude-opus-5[1m]

# CHALLENGE · `GalleryView` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/GalleryView.vue` (442 lines)
**Substrate** fourier-analysis working tree as of this read; `@mkbabb/glass-ui` **4.0.0 installed** (`web/package.json:13`, `web/node_modules/@mkbabb/glass-ui/package.json` → `"version": "4.0.0"`), producer latest **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json`).
**Method** static + source-derived only. Contrast figures are computed from the resolved token cascade (WCAG 2.x relative-luminance, sRGB) — reproduction script and inputs are in §7. No browser was driven; every claim that would need a live paint to settle is marked **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Read whole (read-only):** the target; all 7 statically-imported children + 3 async-imported admin panels; `gallery/GalleryCard.vue` (the leaf every child renders); `stores/gallery.ts`; `stores/workspace.ts` (`refreshDrafts`); `composables/useToast.ts`; `src/style.css` (the sole CSS entry); the resolved glass-ui 4.0.0 token cascade (`dist/styles/**`) and the 4.0.0 `SegmentedTabs` / `MetricBadge` / `DialogContent` compiled surfaces; the producer 7.0.0 counterparts.

**Corpus folded (not re-invented):** `formation/fourier/lane-frontend.md` §3–§5, §8–§9 · `formation/fourier/CENSUS-2026-08-03.md` §1–§3a and its C-4/C-5/C-7 challenge marks · `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (R3-12 cited at D-30). Two corpus rows are **corrected** here on tree evidence — S-5 and D-13.

**Verdict.** `GalleryView` is a competently-composed shell whose *authored* design is materially better than its *shipped* design. Three of its most-reasoned surfaces — the card's motion vocabulary, the empty state's "living preview band", and the tab-panel entry animation — do not execute at all, each for a different and independently-provable reason. The a11y layer is attentive in patches (D-S2, D-S1) and absent in structure (no headings, no accessible name on the only text input, tier state hidden from AT). The light-mode arm carries four token-decidable contrast failures, one of which (`--tier-featured`, 1.56:1) is the sole visual carrier of the product's own tiering concept.

| Severity | Count |
|---|---|
| BLOCKER | 4 |
| MAJOR | 12 |
| MINOR | 13 |
| INFO | 2 |
| **defects total** | **31** |
| SUPERLATIVE | 7 |

---

## §0 · The three dead designs (read this first)

Everything in §1 elaborates. The headline is that three separately-authored, separately-commented design intentions in this component are inert:

| # | Authored intent | Why it does not execute | Finding |
|---|---|---|---|
| 1 | The gallery card's hover-lift, tier/selection border cross-fade, and like-bounce (`GalleryCard.vue:194-198, 292-296`) | `var(--ease-apple-spring)` is an **undefined custom property** → the whole `transition` / `animation` declaration is invalid-at-computed-value-time → computes to initial | **D-1 (BLOCKER)** |
| 2 | The empty state as "a living preview band" (`GalleryView.vue:259-278`, 6-line rationale comment) | `featuredEntries ⊆ gallery.entries`; the outer guard demands `entries.length === 0` and the inner demands `featuredEntries.length >= 4`. Unsatisfiable | **D-5 (MAJOR)** |
| 3 | The tab-panel entry animation, whose comment *names GalleryView as a cited consumer* (`style.css:79-90`) | selector is `[data-state="active"][role="tabpanel"]`; `grep -rn 'tabpanel' web/src/` matches only that comment + rule. Zero elements | **D-6 (MAJOR)** |

Each carries a written rationale. In all three cases the prose is the only surviving artefact of the design.

---

## §1 · BLOCKERS

### D-1 · BLOCKER · The card and drawer motion layer is dead: `--ease-apple-spring` is undefined

**Provenance**
- `gallery/GalleryCard.vue:194-198` — `transition: transform 0.25s var(--ease-apple-spring), box-shadow 0.2s var(--ease-standard), border-color 0.2s var(--ease-standard);`
- `gallery/GalleryCard.vue:293-296` — `animation: like-bounce 0.3s var(--ease-apple-spring);`
- `gallery/GallerySearchBar.vue:186-190` — `.filter-drawer-enter-active { transition: opacity 0.3s var(--ease-apple-spring), transform 0.3s var(--ease-apple-spring); }`

**The defect.** `--ease-apple-spring` is defined nowhere in the resolved cascade:

```
$ grep -rn "ease-apple-spring" web/src/                        → 9 hits, ALL consumers (6 refs + 3 comments), 0 definitions
$ grep -rln "ease-apple-spring" web/node_modules/@mkbabb/       → README.md only (prose)
$ grep -rn "ease-apple-spring" /Users/mkbabb/Programming/glass-ui/src/   → (empty)
```

glass-ui 4.0.0 ships `--ease-standard`, `--ease-out`, `--ease-in`, `--ease-out-expo`, `--ease-apple`, `--ease-spring`, `--ease-decelerate`, `--ease-accelerate` (`dist/styles/tokens/scheme-motion.css:211-227`). `--ease-apple-spring` is not among them; the closest names are `--ease-apple` (documented at `:178` as *"the ambient-only register (consumed solely by the Pulse …)"*) and `--ease-spring`. The `A.W3.d` comment at `GalleryCard.vue:194` asserts *"bezier→`--ease-apple-spring` (closest canonical overshoot)"* — the migration substituted a token that has never existed.

Per CSS Custom Properties L1 §3, a `var()` reference to an undefined custom property substitutes the guaranteed-invalid value, making the **entire declaration** invalid at computed-value time; `transition-*` and `animation-*` are non-inherited, so both compute to `initial`. Consequences:

1. `.gallery-card` loses **all three** transitions — including `box-shadow` and `border-color`, whose own `var(--ease-standard)` is perfectly valid but dies with the shared declaration. Hover-lift (`:209-213`), press-scale (`:215-217`), the batch-selection ring (`:221-225`) and the tier border/glow (`:228-236`) all snap instantaneously.
2. `like-bounce` never runs. `GalleryCard.vue:298-302` defines the keyframes and `:304-308` guards them under `prefers-reduced-motion` — a reduced-motion guard on an animation that cannot play.
3. The filter drawer has **no enter transition but a working leave transition** — `.filter-drawer-leave-active` (`GallerySearchBar.vue:191-195`) references only `--ease-standard` and survives. The panel therefore *snaps* in over 0ms and *fades* out over 200ms. Vue's `<Transition>` reads `getComputedStyle().transitionDuration`; at `0s` it resolves the enter on the next frame, so the asymmetry is deterministic, not a race.

**Not cured by the uplift.** `--ease-apple-spring` is absent from producer 7.0.0 as well. This is a fourier-local phantom, not a version-pin casualty — F.W1 must author or re-point it.

**Falsifier.** Define `--ease-apple-spring` anywhere that reaches `:root` (or the element) in the shipped cascade. `web/src/style.css` is the sole CSS entry (`main.ts:6`) and its 143 lines are fully enumerated in §8 of lane-frontend; there is no other injection point. A second falsifier: if any engine performed *per-list-item* fallback rather than whole-declaration invalidation, items 1 and 3 above would partially survive — the spec forbids it, and the box-shadow/border-color collateral is the observable discriminator. Confirm live by hovering a card with DevTools open and reading the computed `transition-duration` (expect `0s`).

---

### D-2 · BLOCKER · The search field has no accessible name, and its only label is a 2.04:1 placeholder

**Provenance** `gallery/GallerySearchBar.vue:48-54`:

```html
<input type="text" :value="searchQuery" placeholder="Search by slug..."
       class="search-input fira-code flex-1 min-w-0 … placeholder:text-muted-foreground/50" … />
```

No `<label>`, no `aria-label`, no `aria-labelledby`, no `id`, no `title`, no `role="searchbox"`. `grep -n 'label\|aria-' GallerySearchBar.vue` → the only ARIA in the file is `aria-pressed` on two buttons (`:70`, `:120`).

Two conformance failures compound:

1. **WCAG 4.1.2 / 3.3.2 — no programmatic name.** The accessible-name computation for `<input type="text">` falls through to `placeholder` only as a last resort; assistive tech announces "edit text, Search by slug" with no persistent label, and the name vanishes the instant the user types. This is the primary control of the primary tab of a public gallery route.
2. **WCAG 1.4.3 — the placeholder is at 2.04:1.** Two independent declarations set 50% alpha on `--muted-foreground`: the Tailwind utility `placeholder:text-muted-foreground/50` (`:52`) and the scoped rule `.search-input::placeholder { color: color-mix(in srgb, var(--muted-foreground) 50%, transparent); }` (`:155-157`). Light arm: `--muted-foreground` = `--neutral-5` = `hsl(30 22% 40%)`, `--background` = `--neutral-0` = `hsl(40 30% 98%)` (`dist/styles/tokens/color-radius.css:40,45,57,85`). Full-strength = **5.21:1** (the token's own comment claims 5.21:1 — exact). At α=0.50 over the page surface = **2.04:1**. Required: 4.5:1.

The compounding is what makes this a blocker rather than two minors: the field's *only* label is text that fails contrast by more than half.

**Falsifier.** Show an ancestor `<label for>` or an `aria-labelledby` reaching this input (searched: the file is 223 lines and self-contained; its only consumer is `GalleryView.vue:228-238`, which passes no attrs). Or show that WCAG 1.4.3 exempts placeholder text — it does not; SC 1.4.3 scopes "text and images of text", and placeholder is neither incidental nor decorative here because it carries the field's semantics.

---

### D-3 · BLOCKER · `--tier-featured` is 1.56:1 in the light arm, and it is the sole carrier of the tier concept

**Provenance** — every visual expression of "featured" resolves to this one token:

| Site | Use |
|---|---|
| `gallery/GalleryCard.vue:228-231` | `.gallery-card[data-tier="featured"] { border-color: var(--tier-featured); box-shadow: 0 0 12px color-mix(…30%…); }` — the card's entire tier signal |
| `gallery/GalleryCard.vue:150` | `<Crown :size="12" class="text-tier-featured" />` — 12px icon |
| `gallery/GalleryCard.vue:159` | `.admin-overlay-btn text-tier-featured` — 14px icon in a `variant="glass"` button |
| `gallery/GalleryCardModal.vue:215` | `.modal-tier-badge[data-tier="featured"] { color: var(--tier-featured); }` over `bg-background/70` |

Token: `--tier-featured: oklch(0.841 0.173 84.2)` light / `oklch(0.867 0.165 88.7)` dark (`dist/styles/tokens/color-radius.css:270`, `tokens/dark-arm.css:141`, `tokens/light-dark.css:156`).

**Computed (§7 script):**

| Pair | Ratio | Required | Verdict |
|---|---|---|---|
| `--tier-featured` vs `--card` (light `hsl(36 48% 97%)`) | **1.56:1** | 3:1 (WCAG 1.4.11 non-text) | **FAIL — by 1.9×** |
| `--tier-featured` vs `--background` (light) | **1.59:1** | 3:1 | **FAIL** |
| `--tier-featured` vs `--card` (dark `hsl(24 8% 16%)`) | 9.68:1 | 3:1 | pass |
| `--tier-saved` vs `--card` (light `oklch(0.676 0.176 252.3)`) | **2.77:1** | 3:1 | **FAIL (marginal)** |

The light arm is the default arm (`index.html:22-32` bootstraps from `theme` ∥ `vueuse-color-scheme`; absent a stored preference the light arm paints). A featured card in light mode is visually indistinguishable from a normal card at any realistic viewing distance — the 12px Crown is a 1.56:1 amber glyph, the border is a 1.56:1 hairline, and the `0 0 12px` glow is that colour at 30% alpha.

**The team has already solved this exact problem once and stopped one token short.** `style.css:113-127` darkens `--viz-amber` from glass-ui's `hsl(35 70% 42%)` to `hsl(35 76% 35%)`, with a comment computing "≈3.54:1 → ≈4.6:1 (clears AA)". My recomputation: **3.56:1 → 4.71:1** — the authored figures are right. That override sits 8 lines above nothing at all for `--tier-featured`, whose failure is *worse* (1.56 vs 3.56) and whose role is *more* load-bearing (it is state, not decoration).

**Not cured by the uplift.** Producer 7.0.0 ships the identical light value (`glass-ui/src/styles/tokens/color-radius.css:333`, `tokens/light-dark.css:177`). F.W1 changes nothing here; this needs either a fourier-local darken alongside the `--viz-amber` precedent or a glass-BH relay (standing law: every glass-level change relays to the BH inbox).

**Falsifier.** Show that the Crown/border are *supplementary* to a non-colour tier signal — they are not: `GalleryCard.vue:149-152` renders the tier glyph only when `entry.tier !== 'normal'`, and there is no text, shape, or position difference. Or show the app forces the dark arm — `index.html:22-32` does not. Or recompute: the script in §7 is 30 lines and takes the raw token strings.

---

### D-4 · BLOCKER · A failed gallery fetch renders as "No visualizations yet."

**Provenance**
- `stores/gallery.ts:84-103` `resetAndFetch()`: on throw → `toast(e.message ?? "Failed to load gallery", "error")`, `finally { loading.value = false }`. `entries.value` was zeroed at `:85` and is never restored; `hasMore` stays `true` from `:87`.
- `GalleryView.vue:266` — empty state renders on `!gallery.entries.length && !gallery.loading`.
- `GalleryView.vue:290` — the grid renders on `gallery.entries.length || gallery.loading`.

The two guards are exhaustive and mutually exclusive, so *every* terminal state with zero entries funnels into one surface (`:265-286`):

> **No visualizations yet.** · [Open the Visualizer →]

There is no error state in this component. `grep -n 'error' GalleryView.vue` → the string appears only as the `toast(..., "error")` severity argument. A network partition, a 500, a CORS failure, an expired session — all present to the user as *"the gallery is empty, go make something"*, with the only contradicting signal a transient toast that has already begun dismissing.

Two aggravators:
1. **No retry affordance.** The one action offered navigates *away* (`router.push('/visualize')`, `:282`). The user cannot re-attempt the failed read without a full reload.
2. **The toast itself is on the F.W1 break path.** `composables/useToast.ts:3,9` imports `type ToastVariant` from `@mkbabb/glass-ui/toast`; the census records it **definition-absent at 7.0.0** — *"`grep -rn "ToastVariant" glass-ui/src/` → (empty)"* (`lane-frontend.md` §5, `CENSUS-2026-08-03.md` §3a, carry #3). Five `toast()` calls inside `GalleryView.vue` alone (`:177, :188, :190, :196, :212`) plus every store toast route through it. So the *only* error channel this view has is also the surface that hard-breaks typecheck at uplift.

**Falsifier.** Show a third render branch keyed on an error ref, or an error ref on the store — `stores/gallery.ts` exposes `entries, loading, sort, tierFilter, visibilityFilter, searchQuery, basisFilter, adminMode, adminStats, adminStatsLoading, nextCursor, hasMore, loadingMore` (`:265-292`): no `error`. Or argue the toast suffices — it cannot, because the toast auto-dismisses while the false empty state persists indefinitely; and `useToast.ts:21-29` passes no `duration` through to `glassToast`, so the dismissal is the library default and outside this view's control.

---

## §2 · MAJOR

### D-5 · MAJOR · The empty-state marquee is provably unreachable, and its 6-line rationale asserts otherwise

**Provenance** `GalleryView.vue:259-278`. The comment (`:259-264`) reads:

> *"Empty state (D.W4.c — option A: the GalleryMarquee earns the empty state as a living preview band … The marquee gracefully hides itself when entries.length < 4 (its own template guard), so a true cold-empty DB renders the CTA alone."*

**Proof of unreachability**, from three lines in the same file:

```
:64-66   featuredEntries = computed(() => gallery.entries.filter(e => e.tier === "featured"))
:266     outer guard   →  gallery.entries.length === 0
:270     inner guard   →  featuredEntries.length >= 4
```

`featuredEntries` is a filter of `gallery.entries`, so `|featuredEntries| ≤ |gallery.entries|`. The outer guard forces `|gallery.entries| = 0`, hence `|featuredEntries| = 0`, hence `0 ≥ 4` — contradiction. `<GalleryMarquee>` (`:269-278`) can never render, in any state, for any data. Its own third guard (`GalleryMarquee.vue:27`, `v-if="entries.length >= 4"`) is a redundant gate on an unreachable branch.

The comment's reasoning is subtly wrong in a specific way worth recording: it treats the marquee's `< 4` self-guard as the *only* thing standing between the empty state and a rendered band, when the containing guard has already forced the input to zero. The author reasoned about the marquee's contract but not about the set relation.

**Collateral.** `GalleryMarquee.vue` (134 lines) has exactly one consumer (`grep -rn "GalleryMarquee" web/src/` → `GalleryView.vue:26` import, `:259` comment, `:269` use). The whole file is dead. This intersects `lane-frontend.md` §4, which books GalleryMarquee as a CANDIDATE SHADOW that *"stays local (producer retired `./scrolling-text` at 5.0.0)"* — correct on the producer facts, but the disposition should be **delete, not keep**: there is nothing to converge.

**Falsifier.** Produce a state where `gallery.entries.length === 0` and `featuredEntries.length >= 4`. Requires `featuredEntries` to stop deriving from `gallery.entries` — i.e. a source change, not a data state.

---

### D-6 · MAJOR · `role="tablist"`/`role="tab"` with zero tabpanels and no `aria-controls`; the cited tab animation matches nothing

**Provenance**
- `GalleryView.vue:223-227` — `<SegmentedTabs variant="underline" :options="tabOptions" :model-value="activeTab" …>`
- `GalleryView.vue:242, 356, 375, 380, 385` — the five panels are bare `<template v-if="activeTab === '…'">`, carrying no `role`, no `id`, no `aria-labelledby`.

**The primitive does emit full tab semantics — conditionally on this exact variant.** Decompiled from the installed 4.0.0 bundle (`dist/tabs.js`):

```js
V = f(() => b.variant === "underline")        // isTabsSemantic
…  role: V.value ? "tablist" : "group",  "aria-orientation": …
…  role: V.value ? "tab" : void 0
…  V.value ? { "aria-selected": … } : { "aria-pressed": … }
```

`GalleryView` passes `variant="underline"` ⇒ the strip renders `role="tablist"` with `role="tab"` + `aria-selected` children. And:

```
$ grep -c 'aria-controls' dist/tabs.js   → 0
$ grep -rn 'tabpanel\|role="tab"' web/src/   → style.css:10,83,93 only (a comment + the dead rule)
```

`SegmentedTabOption` at 4.0.0 is `{ label, value, icon?, disabled?, tooltip? }` (`dist/components/custom/tabs/SegmentedTabs.vue.d.ts:3-9`) — **there is no `controls` field**, so `aria-controls` is not expressible at this pin even if the consumer wanted it.

Result: an incomplete WAI-ARIA Tabs pattern. AT announces "Gallery, tab, 1 of 5, selected", then the user tabs into content with no programmatic relationship to the tab, no `role="tabpanel"`, and no `aria-labelledby` back-reference. The `tabOptions` computed (`:49-62`) also mutates its own length 2→5 on `gallery.adminMode` with no `aria-live` on the strip, so the "1 of 5" changes silently.

**Second, independent consequence.** `style.css:79-90`:

```css
/* Tab-panel entry animation — local carry pending glass-ui's Tabs
   primitive shipping this on its own. Selector targets the data-attribute
   the upstream UnderlineTabs primitive sets; cite `EquationView`,
   `VisualizationView`, `GalleryView`. */
[data-state="active"][role="tabpanel"] { animation: tab-slide-in 0.18s ease-out; }
```

Zero elements match, in this view or anywhere (grep above). The comment cites `GalleryView` by name. `:92-96` then guards the dead rule under `prefers-reduced-motion`. This is the tab-motion twin of D-1: a written design that never paints.

**The uplift IMPROVES this.** Producer 7.0.0 `src/components/tabs/SegmentedTabs.vue:52` documents *"…it is emitted as the tab's `aria-controls`, completing the APG"*, and `src/composables/motion/morph/useSelectionGroup.ts:236-238` centralises `role: "tab" / aria-selected`. F.W1 gains the ability to express `controls`; the fourier side must supply `role="tabpanel"` + `id` on the five panels for it to mean anything. **Book as an uplift-enabled cure, not an uplift-automatic one.**

**Falsifier.** Show a `role="tabpanel"` in the rendered tree (the five panels are literal `<template v-if>` fragments with no wrapper element to carry it) or show `V.value` is false here (`variant="underline"` is explicit at `:223`).

---

### D-7 · MAJOR · The view has zero headings

```
$ grep -rn "<h[1-6]" GalleryView.vue gallery/   → (empty)
```

Nine section titles in this family are all `<span>`:

| Text | Site |
|---|---|
| "Featured" | `GalleryFeaturedCarousel.vue:24` — `<span class="cm-serif text-sm font-semibold tracking-tight">` |
| "Admin Mode" | `GalleryAdminBanner.vue:31` — same recipe |
| "My Drafts" | `GalleryDraftsSection.vue:57` — same recipe |
| "Decomposition" | `GalleryCardModal.vue:126` — same recipe |
| "Parameters" | `GalleryCardModal.vue:146` — same recipe |

The recipe `cm-serif text-sm font-semibold tracking-tight` is *visually* a heading, repeated verbatim five times, and *semantically* nothing. A screen-reader user cannot navigate this route by heading; the document outline for `/gallery` is empty. Aristotelian reading: the design has a clear hierarchy of parts and refuses to say so in the markup — the visual and the semantic have been allowed to diverge, and the divergence is systematic (one recipe, five sites), so it is a decision, not an oversight.

**Falsifier.** Show a heading contributed by an ancestor for this route (`App.vue` / `AppHeader.vue` are out of this component's scope; even a page `<h1>` there would not supply the five section levels). Or argue `aria-label` on the two labelled regions substitutes — it does not: a region label is not a heading and does not appear in the heading rotor.

---

### D-8 · MAJOR · Tier, view-count and like-count are hidden from assistive tech

**Provenance**
- `gallery/GalleryCard.vue:71-80` — the card's accessible name is `:aria-label="\`Open ${entry.image_slug}\`"`. Nothing else.
- `gallery/GalleryCard.vue:149-152` — the tier glyph: `<Crown :size="12" class="text-tier-featured" />` / `<Bookmark :size="12" class="text-tier-saved" />`, inside a `<div>` with no text.
- `gallery/GalleryCard.vue:131-134` — `<Eye :size="14" /><span class="font-mono">{{ entry.views }}</span>` — a bare number with no unit and no label.
- `gallery/GalleryCard.vue:143-144` — `<Heart :size="14" …/><span class="font-mono">{{ entry.likes }}</span>` — same.

`lucide-vue-next@1.0.0` auto-applies `aria-hidden="true"` to every icon that carries no a11y prop and no default slot (`node_modules/lucide-vue-next/dist/esm/Icon.js:41` — `...!slots.default && !hasA11yProp(props) && { "aria-hidden": "true" }`; `hasA11yProp` matches `aria-*`, `role`, `title`). None of the four icons above passes any. So AT hears, for a featured card with 412 views and 37 likes:

> *"Open bright-copper-fox-quill, button. 412 37"*

— tier absent, and the two counters reduced to naked integers whose meaning lived entirely in the hidden glyph. This is the failure mode of an otherwise-good default: lucide's automatic hiding is right for decoration and wrong for the four sites where the icon *is* the label.

The evidence that the team does not know this contract is three lines away: `GalleryView.vue:323, 340, 350` add an explicit `aria-hidden="true"` to three lucide icons that already had it — belt-and-braces on the decorative ones, nothing on the semantic ones.

**Falsifier.** Show an `aria-label`/`title`/`role` on any of the four icons, or accompanying visually-hidden text (there is none: `grep -n 'sr-only\|visually-hidden' gallery/` → empty). Or show `likedHashes`/tier surfaced via `aria-pressed` — `:141` does set `:aria-pressed="isLiked"` on the like *button*, which correctly conveys the toggle state but not the count's meaning, and does nothing for tier.

---

### D-9 · MAJOR · The one un-migrated native `confirm()`, in a family that migrated the other three

**Provenance** `GalleryView.vue:137-141`:

```js
async function handleDelete(hash: string) {
    if (!confirm("Delete this gallery entry?")) return;
    await gallery.deleteEntry(hash);
```

The same file ships a fully-styled destructive-confirm `<Dialog>` 262 lines later (`:400-440`) for the *batch* path. Both sibling admin panels migrated theirs and wrote it down:

```
AdminFlaggedPanel.vue:75    // Destructive-confirm dialog state — supplants native `confirm()`.
AdminFlaggedPanel.vue:263   <!-- Destructive-confirm dialog — replaces native `confirm()`. -->
AdminUserList.vue:80        // Destructive-confirm dialog state — supplants native `confirm()`.
AdminUserList.vue:459       <!-- Destructive-confirm dialog — replaces native `confirm()`. -->
```

`grep -rn "confirm(" web/src/components/visualization/` returns exactly these plus `GalleryView.vue:138`. So the migration was deliberate, documented, and 3-of-4 complete — and the survivor is on the *single-entry* delete, which is the higher-frequency path.

Design cost: `window.confirm` is un-themable (ignores the dark arm entirely), un-styleable (no glass surface, no `cartoon-card`), renders in the OS chrome font rather than Computer Modern Serif, blocks the main thread, and its prose ("Delete this gallery entry?") cannot carry the irrevocability warning the batch dialog does (`:417-419`).

**Falsifier.** Show `handleDelete` is unreachable — it is wired at `:257` (featured carousel), `:277` (marquee, itself dead per D-5) and `:301` (grid), all admin-mode paths that are live. Or show a project convention permitting `confirm()` — the four sibling comments establish the opposite convention explicitly.

**Uplift note.** glass-ui 4.0.0 exports `./confirm-dialog`; 7.0.0 **removes it** (verified: `node -e "Object.keys(exports).includes('./confirm-dialog')"` → 4.0.0 `true`, 7.0.0 `false`; matches `lane-frontend.md` §5 REMOVED list). So the cure target is the in-file `<Dialog>` pattern, not `./confirm-dialog` — do not migrate onto a subpath that dies at F.W1.

---

### D-10 · MAJOR · The featured rail clips the card's hover-lift and tier glow — a bug its own sibling already solved

**Provenance** `gallery/GalleryFeaturedCarousel.vue:61-90`:

```css
.featured-scroll { display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 0.5rem; … }
.featured-card-wrapper { flex-shrink: 0; width: 16rem; scroll-snap-align: start; }
```

Per CSS Overflow L3, when one axis is `visible` and the other is not, the `visible` axis computes to `auto`. `overflow-x: auto` with `overflow-y: visible` therefore yields `overflow-y: auto` — the rail **clips vertically**. Into that clipped box the cards paint:

- `GalleryCard.vue:209-213` — `transform: translateY(-4px) scale(1.02)` on hover → the 4px lift plus ~2.6px of top-edge scale growth is clipped, with **zero top padding** to absorb it.
- `GalleryCard.vue:228-231` — `box-shadow: 0 0 12px …` on the featured tier → clipped on all four edges.
- `GalleryCard.vue:192` — `box-shadow: var(--shadow-cartoon)` → the offset stamp is clipped below by the 0.5rem `padding-bottom` only partially.

Every card in this rail is by definition `tier === "featured"` (`GalleryView.vue:64-66, 249-251`), so the glow this rail exists to showcase is exactly the thing it clips.

**`GalleryMarquee.vue:80-89` solves this precisely, and says so:**

```css
.marquee-track {
    overflow: clip;
    /* Generous vertical padding so hover scale/translate stays inside the mask */
    padding: 0.75rem 0;
    /* Horizontal-only fade: tall vertical extent keeps top/bottom unclipped */
    mask: linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent)
          0 -50% / 100% 200%;
}
```

The `0 -50% / 100% 200%` trick — a mask twice as tall as the box, offset up half — fades horizontally while leaving the vertical extent fully opaque. That is the correct idiom, it is written down with its rationale, it lives in a sibling file in the same directory, and the rail did not adopt it. (Compounding irony: per D-5 the file that holds the fix is unreachable.)

**Falsifier.** Show `overflow-y` explicitly set to `visible` on `.featured-scroll` (it is not; only `overflow-x: auto` at `:64`) or show the UA does not apply the blockification rule (it is normative and universally implemented). Live confirmation is a hover screenshot of a featured card's top edge — **UNPROVEN-NEEDS-LIVE (SS-13)** for the exact pixel extent; the clipping itself is spec-determined.

---

### D-11 · MAJOR · `opacity-70` over `text-muted-foreground` = 2.88:1 (light) / 4.24:1 (dark) — fails AA in both arms

**Provenance** `GalleryView.vue:357-364`:

```html
<div … class="flex flex-col items-center justify-center flex-1 gap-3 text-muted-foreground">
    <Layers class="h-12 w-12 opacity-30" />
    <p class="text-base font-medium">No drafts yet.</p>
    <p class="text-sm opacity-70">Upload an image in the Visualizer to create a draft.</p>
</div>
```

`opacity` composites the element against its backdrop, so the effective foreground is `--muted-foreground` at α=0.70 over `--background`:

| Arm | Full strength | At α=0.70 | Required (14–16px normal text) |
|---|---|---|---|
| light | 5.21:1 | **2.88:1** | 4.5:1 — **FAIL** |
| dark | 7.70:1 | **4.24:1** | 4.5:1 — **FAIL (marginal)** |

Text size: `text-sm` = `0.875rem`; root is `1.125rem` below 768px and `1rem` at/above (`style.css:40-50`), so 15.75px mobile / 14px desktop — normal text on both, never the 18.66px large-text threshold.

This is the *only* instructional sentence in the drafts empty state — the sentence that tells a new user what to do next — and it is the least legible text on the page. The design intent (a quiet secondary line) is right; the mechanism (stacking `opacity` on an already-muted token) is the wrong lever. `--muted-foreground` is *already* the muted rung; the token comment at `dist/styles/tokens/color-radius.css:45` records it as calibrated to "WCAG AA: 5.21:1 vs page" — the 0.70 multiplier spends the entire margin and 1.6:1 more.

**Falsifier.** Recompute with a different backdrop — the empty state's ancestors set no background (`GalleryView.vue:220` is `flex flex-col gap-4 overflow-y-auto h-full py-4`), so `--background` from `@layer base` (`style.css:20`) is the composite target. Or show `--muted-foreground` is overridden locally — `grep -n 'muted-foreground' web/src/style.css` → no override.

---

### D-12 · MAJOR · Three amber systems in one view; the raw-Tailwind one is 1.65:1

**Provenance**

| Site | Colour source | Light contrast vs `--background` |
|---|---|---|
| `GalleryAdminBanner.vue:30` | `text-amber-400` (Tailwind palette) — the Shield icon carrying "Admin Mode" | **1.65:1** |
| `GalleryAdminBanner.vue:26` | `border-amber-500/30` + `bg-amber-500/[0.04]` — the banner's whole surface | amber-500 solid = 2.06:1; at 30%/4% alpha, far below |
| `GalleryFeaturedCarousel.vue:23` | `text-amber-400` — the Crown marking the "Featured" section | **1.65:1** |
| `GalleryCard.vue:150` etc. | `--tier-featured` (glass token) | 1.56:1 (D-3) |
| `style.css:119-127` | `--viz-amber` (glass token, **locally darkened for WCAG**) | 4.71:1 |

Compile-probed the installed Tailwind 4.3.1: `.text-amber-400 { color: var(--color-amber-400) }` with `--color-amber-400: oklch(82.8% 0.189 84.429)` — confirming the 1.65:1 figure.

Two defects in one:

1. **Token-system escape.** `lane-frontend.md` §3 and `CENSUS` §3a both certify fourier as *"the deepest, cleanest consumer in the constellation — 95 named-import statements / 21 subpaths / 49 symbols; 0 direct reka-ui; 0 shadcn copies."* That certification is about *component* imports. On the *colour* axis this view breaks the token discipline in two files, and the escapes are the same hue family as two governed tokens — so the design system now has three ambers with a 2.9× contrast spread between them, sitting within 40px of each other on screen (the banner's Shield at 1.65:1 immediately above six `MetricBadge`s, two of which are tinted `--tier-featured` at 1.56:1).
2. **The local WCAG darken is defeated in its own neighbourhood.** `style.css:113-118` explains the `--viz-amber` correction as an "axe contrast carry". The correction is real (3.56 → 4.71) and it is undone by `text-amber-400` painting 1.65:1 amber two components over.

**Falsifier.** Show these two icons are decorative and paired with adjacent text — they *are* adjacent to "Admin Mode" (`:31`) and "Featured" (`GalleryFeaturedCarousel.vue:24`) respectively, which is the correct mitigation for **1.4.11**. Accepting that mitigation, the residue is still the token-escape half, which stands independently: severity drops from a11y-fail to design-system-conformance. I keep MAJOR on the conformance ground and note the a11y half is defensible-if-argued.

---

### D-13 · MAJOR · The `MetricBadge → Metric` uplift is a **silent** regression, not a typecheck break — and it drops a capability

Two of the seven census-counted `metric-badge` sites are in this subtree (`CENSUS-2026-08-03.md` §2 C-4 corrects lane-frontend's "6 files" to **7 files**; I confirm both of mine are in that seven):

- `gallery/GalleryAdminBanner.vue:5` → six `<MetricBadge>` at `:45-88`
- `gallery/GalleryDraftsSection.vue:8` → one `<MetricBadge>` at `:58`

Measured prop-surface diff (4.0.0 `dist/components/custom/metric-badge/MetricBadge.vue.d.ts:5-36` vs 7.0.0 `src/components/metric/types.ts:8-24`):

| 4.0.0 `MetricBadgeProps` | 7.0.0 `MetricProps` | Consequence at fourier's call sites |
|---|---|---|
| `labelPosition?: 'inline' \| 'stacked'` | `orientation?: 'inline' \| 'stacked'` | **RENAME.** `label-position="stacked"` at `GalleryAdminBanner.vue:48,55,62,69,76,85` becomes an unknown prop → Vue fallthrough attr on the root `<span>` → the six-tile grid **silently reverts to `orientation: "inline"`** (the 7.0.0 default, `Metric.vue:11`). Vue does not error on excess attrs, and `vue-tsc` does not flag component fallthrough attributes. **No build signal.** |
| `color?: string` | **ABSENT** | **CAPABILITY DROP.** `color="var(--tier-featured, #fbbf24)"` (`:65`) and `color="var(--tier-saved, #60a5fa)"` (`:72`) fall through as a legacy presentational `color=` attribute on a `<span>` — inert. The featured/saved tiles lose their tint, silently. |
| `abbreviation?` | absent (slot-based) | unused here |
| — | `context?`, `unit?`, `placeholder?`, `loading?` + `aria-busy` | net gain |

DOM order also flips: 7.0.0 `Metric.vue:28-38` emits `metric__label` **before** `metric__reading`, so the label lands above the value regardless of the consumer's `.admin-stat { flex-direction: column }` (`GalleryAdminBanner.vue:99-106`).

**This sharpens the corpus.** `lane-frontend.md` §5 lists `./metric-badge` removal as a path swap ("→ `./metric` (`Metric`)") and carry #4 files it under "11 removed-subpath import sites". It is worse than a path swap and *better* than a typecheck break — it is the dangerous middle: an import error that a rename fixes, followed by two silent visual regressions that no gate catches. Given fourier has **no vitest** and only 29 Playwright tests on one chromium project (`lane-frontend.md` §0, §9 carry #11) and `e2e/visual-baseline.spec.ts` is the only visual gate, the probability of this landing unnoticed is high. **F.W1 must diff the rendered `MetricBadge` sites visually, not just compile them.**

**Falsifier.** Show `vue-tsc` rejects unknown attrs on components (it does not — fallthrough attrs are typed as `Record<string, unknown>` on the public props by design), or show `MetricProps` carries `color`/`labelPosition` under another name (full interface quoted above from `src/components/metric/types.ts:8-24`; `MetricCellProps`/`MetricRowProps`/`MetricStackProps` add `icon`/`density` only).

---

### D-14 · MAJOR · "N loaded" reports the wrong N

**Provenance**
- `GalleryView.vue:291` — `<GalleryInfiniteGrid :entries="nonFeaturedEntries" …>`
- `GalleryView.vue:68-70` — `nonFeaturedEntries = gallery.entries.filter(e => e.tier !== "featured")`
- `gallery/GalleryInfiniteGrid.vue:27` — `<p class="text-xs text-muted-foreground">{{ entries.length }} loaded</p>`

The counter reads the *filtered* array, but "loaded" names the pagination state, which lives on `gallery.entries` (accumulated 20 at a time by `fetchNextPage`, `stores/gallery.ts:60-82`). With 20 fetched of which 5 are featured, the UI says **"15 loaded"** while the featured rail above displays the other 5. The one number the user is given to reason about the infinite scroll is wrong by exactly the count of what is visible elsewhere on the same screen.

Secondary: the string is an unlabelled bare integer at `text-xs` `--muted-foreground` with no `aria-live`, so its updates during infinite scroll are silent to AT.

**Falsifier.** Show `gallery.entries` never contains featured rows in this view — `resetAndFetch` (`:90-95`) lists with `sort`/`owner` only, no tier filter, and `GalleryView.vue:64-66` proves featured rows are present in `gallery.entries` (it filters them *out* of the grid at `:68-70`). Or show "loaded" is intended to mean "shown in this grid" — then the word is wrong and the defect is prose rather than arithmetic; either way it is a defect.

---

### D-15 · MAJOR · The 1rem gutter is authored nine times and the empty state authors it zero times

**Provenance** — the root (`GalleryView.vue:220`) sets `py-4` and **no horizontal padding**, delegating the gutter to each child:

| Site | Mechanism |
|---|---|
| `GalleryView.vue:222` | `px-4` (tabs + search group) |
| `GalleryView.vue:312` | `mx-4` (batch toolbar) |
| `gallery/GalleryFeaturedCarousel.vue:50` | `padding: 0 1rem` (scoped CSS) |
| `gallery/GalleryInfiniteGrid.vue:26` | `px-4` |
| `gallery/GalleryAdminBanner.vue:26` | `mx-4` |
| `gallery/GalleryDraftsSection.vue:51` | `mx-4` |
| `gallery/AdminUserList.vue:235` | `px-4 py-2` |
| `gallery/AdminFlaggedPanel.vue:150` | `px-4 py-2` |
| `gallery/AdminAuditLog.vue:85` | `px-4 py-2` |
| **`GalleryView.vue:265-286` (empty state)** | **none** — `py-6` only |

Three mechanisms (`px-*`, `mx-*`, raw `padding`) express one measure, in nine places, with one omission. Aristotelian reading: the gutter is a *property of the page*, and it has been dissolved into nine properties of nine parts, so no single edit can change it and one part has already drifted. The three admin panels additionally add `py-2` on top of the root's `py-4`, so vertical rhythm differs by tab.

The omission is the live consequence: the empty state's `<p>` and `<Button>` are `items-center`-justified so they read as fine at desktop width, but at narrow viewports the CTA and the sentence run to the viewport edge while every neighbouring section holds a 1rem margin. Combined with the mobile root-size bump to `1.125rem` (`style.css:40-43`) the text is at its widest exactly where the gutter is absent.

**Falsifier.** Show the empty state inherits a gutter — its ancestor chain is `GalleryView.vue:242` (`<template>`, no element) → `:220` (`px`-free). Or show a media query supplying it (none; the file has no scoped `<style>` at all).

---

### D-16 · MAJOR · The batch toolbar's surface depends on a resurrection shim whose relocation the corpus mis-books

**Provenance** `GalleryView.vue:308-313`:

```html
<div v-if="gallery.adminMode && selectedHashes.size > 0" role="toolbar"
     aria-label="Batch gallery actions"
     class="cartoon-card sticky bottom-2 z-20 mx-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
```

`cartoon-card` is not a glass-ui class at this pin. It is a fourier-local `@utility` shim (`style.css:98-111`) resurrecting a recipe glass-ui removed at C.W5, re-binding onto `cartoon-surface` + `--border` + `--card`. It supplies this toolbar's **entire** surface — 2px border, offset-stamp shadow, and card background. Without it the toolbar is a transparent flex row floating over the scrolling grid it is meant to sit above.

Two design observations:

1. **z-order is undocumented and non-obvious.** The toolbar takes `z-20`; the search bar's filter drawer takes `z-index: var(--z-bar)` = **30** (`GallerySearchBar.vue:169`; `dist/styles/tokens/scheme-motion.css:337`). So the drawer paints *over* the sticky toolbar. That is probably right (the drawer is transient, the toolbar persistent) but it is expressed in two different vocabularies — a raw Tailwind rung and a glass token — with nothing recording the relationship. The card's admin overlay uses a third (`z-5`, `GalleryCard.vue:87,156`; verified valid — Tailwind 4.3.1 compile-probe emits `.z-5 { z-index: 5 }`).
2. **`sticky bottom-2` inside `overflow-y-auto`.** The root (`:220`) is the scroll container, so the sticky works — but the toolbar is a *sibling of the grid inside the scroller*, so it sticks to the bottom of the scroll viewport, which is also where the safe-area inset lands (`style.css:24-26`, `padding-bottom: env(safe-area-inset-bottom)` is on `body`, outside the scroller). On a notched device the toolbar's `bottom-2` = 0.5rem may sit under the home indicator. **UNPROVEN-NEEDS-LIVE (SS-13).**

**Corpus correction (favourable).** `lane-frontend.md` §9 carry #8 books the `cartoon-card` shim as *"resurrecting a C.W5 removal… want[ing] glass-ui-side resolution"*, implying uplift exposure. **The shim survives the uplift.** At 7.0.0, `cartoon-surface` moved out of `src/styles/cards.css` (deleted — `ls src/styles/cards.css` → no such file) into `src/components/card/styles.css:98`, and `src/styles/index.css:192` `@import`s that file into the same `@mkbabb/glass-ui/styles` cascade fourier consumes at `style.css:3`. So the shim's `@apply cartoon-surface` still resolves at 7.0.0. **Lower carry #8's priority for the shim half** (the `--viz-amber` half stands, and D-3 argues it should grow).

**Falsifier for the correction.** Build fourier against glass-ui 7.0.0 and grep the emitted CSS for `.cartoon-surface`. The `@utility` is inside a component partial that the cascade root imports, so Tailwind's utility registration should reach it — but `@utility` registration across an `@import` boundary in a *consumer's* build is the exact class of failure glass-ui's own `index.css` comment documents twice (the dead `../components` glob, the `@source "../*.js"` backstop). **Mark the correction UNPROVEN-NEEDS-LIVE (SS-13) on the emission half; the relocation itself is proven by file read.**

---

## §3 · MINOR

### D-17 · MINOR · "entr(ies)" — five sites
`GalleryView.vue:315` (`{{ selectedHashes.size }} entr(ies) selected`), `:188` (`` `${verb} ${result.affected} entr(ies)` ``), `:406`, `:409`, `:412` (dialog titles). Renders "1 entr(ies) selected". A parenthetical-plural is a placeholder that shipped; every other string in the file is written prose. **Falsifier:** show a project style guide adopting `entr(ies)` — the file's own neighbouring strings ("No visualizations yet.", "Open the Visualizer", "No more entries" at `GalleryInfiniteGrid.vue:50`) use natural plurals.

### D-18 · MINOR · Register break: "shall" three times in the confirm dialog
`GalleryView.vue:417-425` — *"This **shall** permanently delete…"*, *"…**shall** be promoted…"*, *"…**shall** be returned…"*. The app's voice elsewhere is plain and warm ("No drafts yet.", "Upload an image in the Visualizer to create a draft.", "Published!"). Legal-register "shall" in a destructive confirm reads as machine-generated. "This will permanently delete…" is both plainer and more urgent. **Falsifier:** find "shall" in the app's other user-facing prose (`grep -rn '>shall\| shall ' web/src/components/` — this dialog is the concentration).

### D-19 · MINOR · Two arrow idioms for one affordance, one of them inside the accessible name
`GalleryView.vue:283` — `Open the Visualizer →` (literal U+2192 inside the button's text, so the computed accessible name is *"Open the Visualizer right arrow"* or *"…→"* depending on the AT's punctuation verbosity). `GalleryCardModal.vue:186-190` — the same affordance built from `<ArrowRight class="h-4 w-4" />`, which lucide auto-hides. Pick one; the icon form is the one that does not pollute the name.

### D-20 · MINOR · The card has three canonical widths and a units mix
`GalleryInfiniteGrid.vue:29` `minmax(14rem, 1fr)` · `GalleryFeaturedCarousel.vue:88` `width: 16rem` · `GalleryMarquee.vue:112` `width: 220px`. One component, three sizes, and the third is the only raw-px measure in the family (13.75rem desktop / 12.2rem-equivalent mobile, since it does *not* track the `1.125rem` root bump the other two do — so the marquee card is proportionally *smaller* on mobile while everything around it grows). **Falsifier:** show each context has a reason the others don't; the rail and grid differ by 2rem with no comment.

### D-21 · MINOR · `role="toolbar"` without roving tabindex or a live count
`GalleryView.vue:309-311`. WAI-ARIA APG for `toolbar` specifies a single tab stop with arrow-key navigation among the controls; this renders four independently-tabbable buttons. Also `{{ selectedHashes.size }} entr(ies) selected` (`:314-316`) is a `<span>` with no `aria-live`, so checking cards in admin mode announces nothing and the toolbar's appearance is silent. **Falsifier:** APG roving-tabindex is a recommendation, not a normative SC — so this is a pattern-fidelity defect, not a conformance failure. The silent count is the harder half.

### D-22 · MINOR · The infinite-scroll spinner has no accessible name
`GalleryInfiniteGrid.vue:44-48` — a bare `<div class="h-6 w-6 animate-spin rounded-full border-2 …" />` with no `role="status"`, `aria-label`, or `aria-live`. Loading is invisible to AT; combined with D-14's silent count, the entire pagination affordance is non-announcing. **Falsifier:** show `<InfiniteScroll>` supplies a live region around the slot (`dist/infinite-scroll.js` is a scroll-sentinel wrapper; the slot content is passed through verbatim).

### D-23 · MINOR · The confirm dialog can render with an empty accessible name
`GalleryView.vue:404-427` — `DialogTitle` and `DialogDescription` are `v-if`/`v-else-if` chains over `pendingBatch?.action` with **no `v-else`**. `performBatchGallery` sets `batchDialogOpen = false` at `:173` and nulls `pendingBatch` in `finally` at `:198`. `DialogContent` at 4.0.0 composes `popover-animate` → `data-[state=closed]:animate-out fade-out-0 zoom-out-95` with `duration-normal` (`dist/DialogContent-DDE6pQBU.js`; `dist/styles/utilities/animate.css:10-14`), so reka-ui keeps the content mounted through the exit. On the missing-token path (`:175-179`) the `finally` runs *synchronously* in the same tick as the close, and the dialog plays its whole exit animation with a blank title and blank description — i.e. a `role="dialog"` whose `aria-labelledby` target is empty. **Falsifier:** the path requires `gallery.adminMode === true` while `auth.getAdminToken()` returns null; `deactivateAdmin()` (`stores/gallery.ts:117-121`) clears both together, so this needs a storage-desync. Rate it low-probability, but the structural fix (a `v-else` fallback, or nulling `pendingBatch` only after the exit) is one line.

### D-24 · MINOR · The drafts empty state states the wrong cause
`GalleryView.vue:357-364` renders *"No drafts yet. / Upload an image in the Visualizer to create a draft."* whenever `unpublishedDrafts` is empty — which is true in three distinct situations:
1. genuinely no drafts;
2. **still loading** — `workspace.refreshDrafts()` is awaited in `onMounted` (`:89`) and `stores/workspace.ts:408-410` is `drafts.value = await listDrafts().catch(() => [])`, so the empty state paints first and the drafts pop in;
3. **logged out** — `:101-106` clears `workspace.drafts = []` on logout, so a signed-out user is told to go upload an image rather than to sign in.

Case 3 also swallows the error: `.catch(() => [])` converts any failure into "no drafts". Same shape as D-4, one severity lower because drafts are a secondary surface.

### D-25 · MINOR · `-webkit-mask` present in one rail, absent in the other
`GalleryMarquee.vue:85-88` ships both `mask` and `-webkit-mask`; `GalleryFeaturedCarousel.vue:68-75` ships only `mask-image`. Unprefixed `mask-image` is supported from Safari 15.4, so the prefix is now redundant rather than the omission being fatal — but the pair is inconsistent within one directory, and whichever is right the other is wrong.

### D-26 · MINOR · `scroll-snap-type: x mandatory` on a masked rail
`GalleryFeaturedCarousel.vue:67` + `:89`. `mandatory` forbids resting between snap points; on a rail whose edges are already mask-faded (D-10's other half) the user cannot nudge to see a partially-faded card, and a final card narrower than the remaining scroll space can be hard to bring fully into view. `proximity` is the gentler idiom for a browse rail. **Falsifier:** with 16rem cards and `scroll-snap-align: start`, the last snap position is reachable in all current engines; so this is an interaction-feel defect, not a reachability bug.

### D-27 · MINOR · `--deferred-section-size: 17rem` is authored for one of the card's three widths
`GalleryCard.vue:200-206`. The comment reasons the estimate from *"a ~15rem cell"*, which matches the grid (`minmax(14rem, 1fr)`) and not the rail (16rem) or the marquee (220px). Since `contain-intrinsic-size: auto …` (`dist/styles/utilities/base.css:479`) caches the real size after first paint, the mis-estimate costs at most one pre-paint scroll-height error per context. INFO-adjacent; kept at MINOR because it is a third symptom of D-20's missing canonical card size.

### D-28 · MINOR · Two mono idioms for the same datum
The visualization slug renders as `font-mono` at `GalleryCard.vue:109` and `GalleryCardModal.vue:98`, and as `.fira-code` at `GalleryDraftsSection.vue:84` and `GallerySearchBar.vue:52`. Both resolve to `var(--font-mono)` (`dist/styles/typography/utilities.css:69-72`; `dist/styles/theme/bridges.css:70`), but `.fira-code` additionally sets `font-feature-settings: "liga", "calt"`. So the same 4-word slug renders with programming ligatures active in two places and inactive in two others. Ligatures in an identifier display are the wrong default in both directions — pick one, and prefer the non-ligated one for slugs.

### D-29 · MINOR · One bare-root glass-ui import among twenty subpath imports
`GalleryCard.vue:5` — `import { Checkbox } from "@mkbabb/glass-ui";` while all twenty other glass-ui imports in this subtree use subpaths (`/button`, `/badge`, `/dialog`, `/tabs`, `/select`, `/metric-badge`, `/infinite-scroll`). Verified the root *does* export `Checkbox` at both pins (4.0.0: `import('./dist/glass-ui.js')` → `'Checkbox' in m === true`, 205 exports; 7.0.0: `src/index.ts:124`), so this is not a break — it is a tree-shaking and consistency defect: the bare root pulls the 205-export barrel into the card's module graph for one component. Relevant because `GalleryCard` is the leaf rendered by all three list surfaces and is the `content-visibility` deferral target.

---

## §4 · INFO

### D-30 · INFO · `basisLabels` is duplicated verbatim between card and modal — a corpus-recorded row
`GalleryCard.vue:36-51` and `GalleryCardModal.vue:41-56` are byte-identical 16-line computeds (same `fourier-epicycles`→"Epicycles" / `fourier-series`→"Series" special-casing, same `basisDisplay` lookup, same `.filter(Boolean) as …` cast). The adjudicated intake **R3-12** (`lane-fourier-r3-r6.md:86`, verdict **TRUE / ADOPT-AS-FACT**) names *"`GalleryCard` basisLabels"* as one of the seven duplicate rows collapsing 35 open-family records to 28. Recorded here on the design axis because the duplication is *presentational* — the label vocabulary of the product's core concept (which bases decompose this image) lives in two places, so they can drift apart in the UI. Also duplicated in the same two files: `timeAgo` (`GalleryCard.vue:53-61`, `GalleryCardModal.vue:58-66`, `GalleryDraftsSection.vue:28-36`) — three identical copies, and the `basis-tint` CSS recipe (`GalleryCard.vue:270-274`, `GalleryCardModal.vue:208-212`) makes four.

### D-31 · INFO · Redundant `aria-hidden` on already-hidden icons
`GalleryView.vue:323, 340, 350` add `aria-hidden="true"` to `<Crown>`, `<Trash2>`, `<X>`. lucide already applies it (`Icon.js:41`). Harmless and defensively correct — recorded only because it is the direct evidence that the primitive's auto-hiding contract is not understood in this file, which is the root cause of D-8.

---

## §5 · SUPERLATIVES (L-18 runs both ways)

### D-S1 · The keyboard-accessible card is the canonical pattern, done correctly, with its provenance written down
`GalleryCard.vue:64-80` lifts a former bare `<div @click>` to `role="button"` + `tabindex="0"` + `@keydown.enter.prevent` + `@keydown.space.prevent` + a computed `aria-label` — the complete ARIA-button-on-non-button contract, including the `.prevent` that stops Space from scrolling the page. The comment names the finding it cures (*"per A3 #4 — unreachable by keyboard, no Enter/Space activation, no focus ring"*). And the focus ring is placed at the **global** layer (`style.css:129-143`) with the correct reason recorded: *"Because Vue's scoped styles add a data-attribute selector, the ring lives at the global layer so it applies regardless of the component scope hash."* That is a genuinely non-obvious cascade fact, correctly diagnosed, correctly sited, and documented for the next reader. **Falsifier:** show the ring does not reach the card — `.gallery-card:focus-visible` is unscoped and `.gallery-card` is on the element itself (`:71`).

### D-S2 · Event-boundary discipline inside a clickable card
`GalleryCard.vue:85-96` wraps the admin checkbox in a `@click.stop` container and `:156` does the same for the three-button admin overlay, while `:141` stops the like button — so five interactive controls nest inside a `role="button"` without any of them triggering card-open. The comment at `:82-84` even explains the checkbox's *placement* choice ("anchored top-left so it does not collide with the top-right admin overlay"). Nested interactive controls are the classic source of accidental-navigation bugs; this one got them all.

### D-S3 · The marquee's mask geometry is a small piece of real craft
`GalleryMarquee.vue:83-88` — `mask: linear-gradient(to right, …) 0 -50% / 100% 200%`. A mask sized to twice the box height and offset up half, so the gradient fades on the inline axis while the block axis stays fully opaque and the hover lift survives. Two comment lines state exactly why. This is the correct answer to a problem its sibling rail still has (D-10). That it sits inside unreachable markup (D-5) is the tragedy of this component in one artefact.

### D-S4 · `GalleryAdminBanner` is a correctly-labelled region
`GalleryAdminBanner.vue:25-28` — `<section aria-label="Admin mode banner">`, and `:34-37` gives the logout button an explicit `aria-label="Log out of admin mode"` distinct from its visible "Logout" text. It is the only labelled landmark in the family, and it is right.

### D-S5 · The `cartoon-card` shim survives the uplift — corpus carry #8 can be de-scoped
Established at D-16: `cartoon-surface` relocates at 7.0.0 (`src/styles/cards.css` deleted → `src/components/card/styles.css:98`) but stays inside the `@mkbabb/glass-ui/styles` cascade (`src/styles/index.css:192`). `lane-frontend.md` §9 carry #8 and `CENSUS` §3a both imply exposure; the tree says the shim's 25 sites are safe. A favourable correction, offered with its own falsifier at D-16.

### D-S6 · Real a11y literacy is present in this tree — the failures are gaps in an attentive surface
Three independent pieces of evidence: the `--viz-amber` WCAG darken with a correct hand-computed ratio (`style.css:113-122`; my recomputation confirms 3.56→4.71); the reduced-motion guards at `GalleryCard.vue:304-308`, `GalleryMarquee.vue:126-133` and `style.css:92-96`, each with a cited SC (*"WCAG 2.3.3 / A3 #9"*); and `@axe-core/playwright ^4.11.3` in devDeps. The a11y defects above (D-2, D-3, D-7, D-8, D-11) are not indifference — they are the specific classes an axe run does not catch (missing name on an unlabelled input *is* caught, which makes D-2 the one that should have been; but hidden-semantic-icons, absent headings on a non-`<main>` fragment, and compounded `opacity` are all axe blind spots). Worth stating because it changes the wave's framing from "teach a11y" to "close five known gap classes".

### D-S7 · INP-conscious substrate under the list
`stores/gallery.ts:70-74` accumulates each page through `processInChunks(…, { chunkSize: 24 })` over the `scheduler.yield()` floor (`lib/scheduler.ts`), with the reasoning recorded (*"so a long infinite-scroll never monopolises the thread"*); `GalleryCard.vue:200-206` applies glass-ui's `.deferred-section` (`content-visibility: auto`) to the grid item with a token-driven intrinsic size and an explicit no-support floor (*"where content-visibility is absent the card renders as before (inv-29)"*). Two different performance levers, both correctly chosen for a paginated image grid, both documented. `lane-frontend.md` §8 books these as "hygiene already banked" — concur.

---

## §6 · Uplift ledger for F.W1 (this component only)

Per the axis brief, every surface the 4.0.0→7.0.0 tri-package uplift breaks or improves, cross-referenced to the census break surface.

| Census break row | Site in this subtree | Effect | Finding |
|---|---|---|---|
| `./metric-badge` removed → `./metric` | `GalleryAdminBanner.vue:5` (6 uses), `GalleryDraftsSection.vue:8` (1 use) | import error, then **two silent visual regressions**: `labelPosition`→`orientation` rename, `color` prop dropped | **D-13** |
| `type ToastVariant` definition-absent | `composables/useToast.ts:3,9` — reached by 5 `toast()` calls in `GalleryView.vue` + every gallery-store toast | hard typecheck break on this view's **only** error channel | **D-4** |
| `./confirm-dialog` removed | *not imported* — but it is the obvious cure target for `confirm()` at `:138` | do **not** migrate onto it; cure is the in-file `<Dialog>` | **D-9** |
| `./scrolling-text` removed | `GalleryMarquee.vue` (booked as "stays local") | moot — the file is unreachable; disposition should be **delete** | **D-5** |
| `./carousel` present, unimported | `GalleryFeaturedCarousel.vue` (91 LOC) | converging would also fix the clipping bug | **D-10** |
| `./hover-card`, `./hover-popover`, `DockIconButton`, `DockDropdownTrigger` | **none in this subtree** | no exposure here | — |
| `lucide-vue-next` → `@lucide/vue` | 5 files in this subtree (`GalleryView.vue:11`, `GalleryCard.vue:11-17`, `GalleryCardModal.vue:10-16`, `GallerySearchBar.vue:3`, `GalleryAdminBanner.vue:3`, `GalleryDraftsSection.vue:6`, `GalleryFeaturedCarousel.vue:4`) | **verify the auto-`aria-hidden` behaviour is preserved** — D-8's severity depends on it in both directions | **D-8** |
| **IMPROVES** — `SegmentedTabs` gains `controls`→`aria-controls` | `GalleryView.vue:223` | enables the APG cure; fourier must still add `role="tabpanel"`+`id` to the five panels | **D-6** |
| **NEUTRAL** — `cartoon-surface` relocates but stays in cascade | `GalleryView.vue:312` via `style.css:107-111` | carry #8 can be de-scoped for the shim half | **D-S5, D-16** |
| **UNCHANGED** — `--tier-featured` light value identical at 7.0.0 | `GalleryCard.vue:150,228-236` etc. | the 1.56:1 failure is **not** cured by uplift | **D-3** |
| **UNCHANGED** — `--ease-apple-spring` absent at 7.0.0 too | 3 declarations in this subtree | the dead motion is **not** cured by uplift | **D-1** |

---

## §7 · Contrast reproduction

Inputs are the raw token strings as read; the script does oklch→sRGB (Björn Ottosson's matrices), HSL→sRGB, alpha compositing, and WCAG relative luminance.

```
--background  (light)  = --neutral-0      = hsl(40 30% 98%)      [tokens/color-radius.css:40,57]
--card        (light)  =                    hsl(36 48% 97%)      [tokens/color-radius.css:72]
--muted-foreground (l) = --neutral-5      = hsl(30 22% 40%)      [tokens/color-radius.css:45,85]
--background  (dark)   = --neutral-0      = hsl(24 9% 4%)        [tokens/dark-arm.css:42]
--card        (dark)   =                    hsl(24 8% 16%)       [tokens/dark-arm.css:64]
--muted-foreground (d) = --neutral-5      = hsl(34 14% 62%)      [tokens/dark-arm.css:47]
--tier-featured        = light-dark(oklch(0.841 0.173 84.2), oklch(0.867 0.165 88.7))
--tier-saved           = light-dark(oklch(0.676 0.176 252.3), oklch(0.748 0.135 250.1))
--like                 = light-dark(oklch(0.633 0.200 24.9), oklch(0.690 0.162 22.2))
--delete               = light-dark(oklch(0.597 0.198 25.5), oklch(0.644 0.170 23.1))
                                                        [tokens/light-dark.css:156-162]
amber-400 = oklch(82.8% 0.189 84.429)   [Tailwind 4.3.1 compile-probe of `text-amber-400`]
amber-500 = oklch(76.9% 0.188 70.08)
```

| Pair | Ratio | Gate | Finding |
|---|---|---|---|
| muted-foreground vs background (light) | 5.21:1 | AA 4.5 ✓ | (token comment self-certifies 5.21 — exact) |
| muted-foreground **@ α .70** vs background (light) | **2.88:1** | AA 4.5 ✗ | D-11 |
| muted-foreground **@ α .70** vs background (dark) | **4.24:1** | AA 4.5 ✗ | D-11 |
| muted-foreground **@ α .50** (placeholder) vs bg (light) | **2.04:1** | AA 4.5 ✗ | D-2 |
| tier-featured vs card (light) | **1.56:1** | 1.4.11 3.0 ✗ | D-3 |
| tier-featured vs background (light) | **1.59:1** | 1.4.11 3.0 ✗ | D-3 |
| tier-featured vs card (dark) | 9.68:1 | ✓ | — |
| tier-saved vs card (light) | **2.77:1** | 1.4.11 3.0 ✗ | D-3 |
| `--like` vs card (light) | **3.60:1** | 1.4.11 ✓ / AA-text 4.5 ✗ | D-3 note¹ |
| `--delete` vs card (light) | 4.16:1 | 1.4.11 ✓ / AA-text ✗ | — (icon-only use at `GalleryCard.vue:178`) |
| amber-400 vs background (light) | **1.65:1** | 1.4.11 3.0 ✗ | D-12 |
| amber-500 vs background (light) | 2.06:1 | (used at 30%/4% α) | D-12 |
| viz-amber OLD `hsl(35 70% 42%)` | 3.56:1 | AA ✗ | corroborates `style.css:115` |
| viz-amber NEW `hsl(35 76% 35%)` | 4.71:1 | AA ✓ | corroborates `style.css:117` |

¹ `--like` is applied to **text** — `GalleryCard.vue:286-290` sets `.like-btn.liked { color: var(--like) }` on a chassis whose `font-size: 0.875rem` (`:283`) carries `{{ entry.likes }}` (`:144`). At 3.60:1 it clears the 3:1 graphic threshold and fails the 4.5:1 text threshold. Folded into D-3 rather than listed separately.

Script: `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/contrast.mjs` (session-scratch; re-derivable from the inputs above in ~30 lines).

---

## §8 · Falsification summary

Every finding above carries its own falsifier inline. The three that would most change the picture if falsified:

1. **D-1** — if any stylesheet in the shipped bundle defines `--ease-apple-spring`, three findings collapse to zero and the component's motion layer is fine. Searched: fourier `src/` (9 hits, all consumers), all of `node_modules/@mkbabb/` (README prose only), producer 7.0.0 `src/` (empty). `main.ts:5-6` establishes `katex.min.css` + `style.css` as the only CSS entries.
2. **D-3 / D-11 / D-2 / D-12** — all four contrast findings fall together if the light arm is not the default. `index.html:22-32` bootstraps from `theme` ∥ `vueuse-color-scheme`; with neither stored, the light arm paints. A live check of the first paint on a clean profile would settle it — **UNPROVEN-NEEDS-LIVE (SS-13)** for the default-arm claim only; the ratios themselves are token-arithmetic.
3. **D-13** — if `vue-tsc` does flag component fallthrough attributes under this project's config (`web/tsconfig*.json`, `vue-tsc -b` in `package.json:8`), the MetricBadge migration becomes a loud break rather than a silent one, and its severity drops. Vue's public-props typing admits excess attrs by design, so I expect it does not; the probe is one `label-position="x"` on a `Metric` in a scratch SFC.

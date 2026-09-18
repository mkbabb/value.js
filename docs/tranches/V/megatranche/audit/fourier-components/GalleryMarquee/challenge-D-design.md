claude-opus-5[1m] (served model id)

# CHALLENGE — `GalleryMarquee.vue` · axis **D** (DESIGN)

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GalleryMarquee.vue` — 134 lines, 4 script imports, 0 producer imports.
**Substrate.** fourier `cd26c653` / tree `9a66411d` (X-4, thrice-agreed). Working tree unchanged for this file since `b7f639c` (G.W4); authored at `eefa318`, last design-touched at `2e4a452` (D.W4).
**Pin.** `@mkbabb/glass-ui ^4.0.0`, installed **4.0.0**; producer at **7.0.0** (verified: `web/package.json:14`; `web/node_modules/@mkbabb/glass-ui/package.json.version` = `4.0.0`; `/Users/mkbabb/Programming/glass-ui/package.json.version` = `7.0.0`).
**Method.** Static + source-derived only. No browser tooling. Read whole: the subject, `GalleryCard.vue` (its sole child), `GalleryView.vue` (its sole consumer), the two sibling gallery surfaces, `web/src/style.css`, `web/src/lib/types.ts`, `web/src/stores/gallery.ts`, and — read-only, as evidence — glass-ui 4.0.0's installed export map, glass-ui 7.0.0's `src/`, `CHANGELOG.md`, `MIGRATION.md`, and `dist/styles/{tokens/shadow.css,utilities/base.css}`. Two claims that require a running browser are marked **UNPROVEN-NEEDS-LIVE (SS-13)** and are excluded from the defect count's load-bearing arithmetic.
**Posture.** Assumed defective until the tree proved otherwise. Every row carries a falsifier; five rows survived their own falsifier as *superlatives* (L-18 runs both ways) and two rows are recorded as **not** defects.

**Corpus folded, not re-invented.** `formation/fourier/lane-frontend.md:109` (LOC + shadow candidacy), `:440` (the `./scrolling-text` disposition), `:619` and `:622` (the reduced-motion inventory row and its provenance quote), `:644` (the P3 reduced-motion carry); `CENSUS-2026-08-03.md §3a` ("GalleryMarquee stays local — producer retired `./scrolling-text` at 5.0.0"), `§5` risk 10 (no unit-test net); intake `lane-fourier-r3-r6.md` — **no R3–R6 row touches this component** (the 52 claims are archaeology/registry/API-seam rows; `grep -i marquee` over the intake and over all four formation lane files → zero hits). Where I extend the corpus I say so; where I contradict it I say so (see **D-11**, **L-1**, **L-2**).

**Severity assignment, disclosed.** Severities are assigned **as-if-live**. The component does not currently render (**D-1**) — that is itself the top blocker, and it is the mechanical reason none of D-2..D-17 has ever been observed. Census §4 routes this surface into **F.W4** ("per-component D/L/C audit on the uplifted tree"), so the revival is scheduled, and the defects below are what revival ships.

---

## Verdict

**18 defects — 4 BLOCKER · 7 MAJOR · 6 MINOR · 1 INFO. 5 superlatives. 2 non-defect ledger rows.**

The component is a well-intentioned 134-line hand-roll whose *ideas* are mostly right (dual-track parallax, `overflow: clip`, an exemplary reduced-motion guard) and whose *arithmetic* is mostly wrong. Three independent geometry errors — a half-gap seam drift, a hard-coded duplication factor, and a hard-pixel item width under a fluid root — mean the design does not hold at any of the three sizes it must hold at. Two a11y errors (an `aria-hidden` subtree containing a Delete button; a mouse-only pause) are Level-A/axe-detectable and would fail the repo's own already-installed `@axe-core/playwright`. And the whole thing is gated behind a condition that is false by construction, so nothing has ever been measured.

The single most useful design fact this challenge establishes: **glass-ui retired `./scrolling-text` at 5.0.0 with the rationale "render accessible text"** (`glass-ui/CHANGELOG.md:229`) — the producer deleted this exact mechanism as an accessibility liability. Keeping the local fork does not merely make it "permanently local" (lane-frontend `:440`); it re-imports the defect class the producer removed. D-3 and D-4 are that defect class, concretely.

---

## BLOCKERS

### D-1 · [BLOCKER] The component is unreachable by construction — its sole call site is gated on a proposition that is false for all inputs

**Provenance.** `GalleryView.vue:265-278` (the empty-state block), `GalleryView.vue:266` (`v-if="!gallery.entries.length && !gallery.loading"`), `GalleryView.vue:270` (`v-if="featuredEntries.length >= 4"`), `GalleryView.vue:64-66` (`featuredEntries = computed(() => gallery.entries.filter(e => e.tier === "featured"))`), `stores/gallery.ts:30` (`const entries = ref<Visualization[]>([])` — a plain array).

**The claim.** The outer guard admits the block only when `|gallery.entries| === 0`. The inner guard admits the marquee only when `|featuredEntries| ≥ 4`. But `featuredEntries` is `Array.prototype.filter` over `gallery.entries`, and `|filter(S)| ≤ |S|` for every `S`. Therefore the inner guard requires `0 ≥ 4`. **`<GalleryMarquee>` has never rendered and cannot render.** The component's own second guard (`GalleryMarquee.vue:27`, `v-if="entries.length >= 4"`) is a redundant copy of the same impossible test.

The design intent is stated explicitly at `GalleryView.vue:259-264`: *"the GalleryMarquee earns the empty state as a living preview band; a CTA Button routes to /visualize so the empty surface becomes actionable rather than inert."* That intent is architecturally unachievable in the position chosen for it: a "living preview band" needs living entries, and the surface it was placed on is defined by their absence. The comment's own closing clause — *"so a true cold-empty DB renders the CTA alone"* — describes what always happens, believing it to be the edge case.

**Falsifier.** (a) Exhibit any reachable state where `gallery.entries.length === 0` and `gallery.entries.filter(e => e.tier === "featured").length >= 4` hold simultaneously; or (b) exhibit a second consumer. For (a) this requires a subset larger than its superset. For (b): `grep -rn "GalleryMarquee" web/src` → exactly 3 hits, all in `GalleryView.vue` (`:26` import, `:259` comment, `:269` tag). **Neither branch is satisfiable. Claim survives.**

**Design consequence, not just a bug.** The empty state as shipped is: a `Layers` glyph at `opacity-30`, one 16px sentence, one outline Button (`GalleryView.vue:279-285`). That is a competent, if unremarkable, empty state — but it is *not the one that was designed*, and no one has seen the one that was. Every D-row below is unmeasured for the same reason.

---

### D-2 · [BLOCKER] The "seamless loop" is not seamless: `translateX(-50%)` against a gapped flex row drifts by half a gap every cycle

**Provenance.** `GalleryMarquee.vue:50` (`<!-- Duplicate for seamless loop -->`), `:91-96` (`.marquee-inner { display: flex; gap: 1rem; width: max-content }`), `:35-49` + `:51-66` (the two `v-for` passes over the same `track`), `:116-124` (both keyframe pairs, `translateX(0) ↔ translateX(-50%)`).

**The arithmetic.** Let `k = track.length`, item width `w = 220px` (`:112`), gap `G`. `.marquee-inner` holds `2k` items, so

- rendered width `W = 2k·w + (2k − 1)·G`
- the true copy period (item 0's left edge → item k's left edge) `P = k·w + k·G`
- the animation travels `0.5·W = k·w + k·G − G/2 = P − G/2`

Every cycle under-translates by exactly **`G/2`**. `G = 1rem`, and the root is fluid (`style.css:41-51`), so the discontinuity is **8 px at ≥768px and 9 px below 768px** — independent of `k`, independent of duration, present at every entry count. At the loop boundary the content snaps forward by that amount: a visible hitch every 45 s on the left track and every 50 s on the right.

This is the canonical `gap`-plus-`-50%` marquee pitfall. Either cure is one line: move the gutter onto the item (`.marquee-item { padding-right: 1rem }`, dropping `gap`), or translate by `calc(-50% - 0.5rem)`.

**Falsifier.** (a) `.marquee-inner` has no `gap` — it does, `:93`; (b) the gutter is absorbed by the item — it is not, `.marquee-item` declares `padding: 0.25rem 0`, **vertical only** (`:113`); (c) `width: max-content` on a gapped flex row excludes gaps from the used width — it does not (max-content sizing sums item contributions *and* gaps); (d) the two copies are separate elements each measuring 50% — they are not, they are `2k` siblings of one flex container. **All four branches fail. Claim survives.**

---

### D-3 · [BLOCKER] `aria-hidden="true"` wraps a focusable subtree containing a destructive control — the axe `aria-hidden-focus` violation, with Delete inside it

**Provenance.** `GalleryMarquee.vue:51-66` (the duplicate `.marquee-item` carrying `aria-hidden="true"` at `:55`, wrapping `<GalleryCard>` at `:57-65`). Inside that card: `GalleryCard.vue:72-73` (`role="button"` + `tabindex="0"` on the card root), `:90-95` (`<Checkbox>` when `adminMode`), `:136-144` (the like `<Button>`), `:156-184` (three `<Button variant="glass" size="icon">` — featured, saved, and **`Trash2` Delete** at `:178-183`).

**The claim.** `aria-hidden="true"` removes a subtree from the accessibility tree but does **not** remove it from the tab order. A focusable element inside an `aria-hidden` subtree is the textbook `aria-hidden-focus` failure (WCAG 4.1.2 Name/Role/Value): keyboard focus lands on something assistive technology reports as nonexistent. Here the subtree contains, per duplicated card, between **2 and 6 focusable nodes** (card root + like button; plus checkbox and three admin buttons when `adminMode`) — and one of them fires `emit('delete', entry.slug)` (`GalleryMarquee.vue:64` → `GalleryView`'s `handleDelete`). An AT user can tab to, and activate, a Delete button on an element AT has been told does not exist, on a card that is a *duplicate* of one that does.

The correct instrument for "visually present, decorative, and non-interactive" is **`inert`**, which removes the subtree from *both* trees. The author's diagnosis was right (see **S-4**); the instrument is wrong.

**Falsifier.** (a) `<GalleryCard>` renders no focusable descendants — it renders `tabindex="0"` at `GalleryCard.vue:73` plus 1–5 `<Button>`/`<Checkbox>` elements; (b) the duplicate carries `inert` — `grep -n "inert" GalleryMarquee.vue` → no match; (c) `aria-hidden` removes focusability — it does not, by definition; (d) the wrapper's `aria-hidden` does not inherit to the child component's root — `aria-hidden` is inherited down the subtree by every AT implementation. **All four branches fail. Claim survives.**

**Gate note.** `@axe-core/playwright ^4.11.3` is already in devDeps (lane-frontend §8) and `aria-hidden-focus` is a default-enabled axe rule. This defect fails a gate the repo already owns and has never pointed at this surface (see **D-18**).

---

### D-4 · [BLOCKER] WCAG 2.2.2 (Level A) — the only pause mechanism is `:hover`, which excludes keyboard, touch, and AT users

**Provenance.** `GalleryMarquee.vue:98-100` (`.marquee-track:hover .marquee-inner { animation-play-state: paused !important }`), `:102-108` (`45s`/`50s linear infinite`), `:126-133` (the reduced-motion block).

**The claim.** SC 2.2.2 (Pause, Stop, Hide, **Level A**) applies to content that (i) moves automatically, (ii) starts automatically, (iii) lasts more than five seconds, and (iv) is presented in parallel with other content. This marquee satisfies all four (`infinite`, autostart, alongside the empty-state CTA). The required mechanism is one the user *can* reach. `:hover` is reachable by a mouse and by nothing else: a touch user has no hover state at all, a keyboard user tabbing into a card gets no pause and watches the focused card scroll out from under its own focus ring, and there is no global control anywhere in the gallery (`grep -rn "animation-play-state\|paused" web/src/components/visualization/gallery/` → this file only).

The one-token cure is `:focus-within` alongside `:hover`. Note the two SCs are distinct: the reduced-motion guard at `:129-133` discharges **2.3.3 (Level AAA)** — its own comment says so — and does **nothing** for **2.2.2 (Level A)**. A user who has not set `prefers-reduced-motion` (the overwhelming majority) is served no pause unless they own a mouse.

**Falsifier.** (a) a global pause control exists elsewhere — grep above returns nothing outside this file, and the census's own reduced-motion carry (lane-frontend `:644`, "glass-ui 7 `DockBackgroundToggle` is the canonical seat") is booked as *future* work, not shipped; (b) the reduced-motion guard satisfies 2.2.2 — it satisfies 2.3.3, a different and higher-level SC, and only for users who set the preference; (c) `:hover` fires on touch — modern touch UAs synthesize at most a sticky hover on tap, which is not a pause affordance. **All three branches fail. Claim survives.**

---

## MAJOR

### D-5 · [MAJOR] Scroll velocity is a function of the entry count — the design has no invariant speed

**Provenance.** `:102-108` (fixed `45s` / `50s`), `:94` (`width: max-content`), `:19-23` (`tracks`, which feeds no style binding).

**The claim.** Duration is constant while distance is `0.5·W ∝ k`. Velocity is therefore `≈ 236k/45` px/s and scales **linearly and without bound** with `|entries|`:

| featured entries | k per track | travel (px) | left-track velocity |
|---|---|---|---|
| 4 (the component's own admitted minimum, `:27`) | 2 | 464 | **10.3 px/s** — glacial; a card takes 21 s to advance its own width |
| 20 | 10 | 2 352 | 52 px/s |
| 100 | 50 | 11 792 | **262 px/s** — a 220px card crosses in 0.84 s; unreadable |

A 25× velocity swing across the component's own operating range is a proportion failure in the Aristotelian sense: the motion has no *measure*. The parent passes `featuredEntries` (`GalleryView.vue:271`), which is unbounded — nothing caps `k`. The cure is one binding: `:style="{ '--dur': track.length * SEC_PER_CARD + 's' }"`.

**Falsifier.** A computed duration exists — `grep -n "style\|:style\|--dur" GalleryMarquee.vue` → no match; `tracks` (`:19-23`) is consumed only by `v-for` at `:29`. **Claim survives.**

---

### D-6 · [MAJOR — blocker-adjacent] The duplication factor is hard-coded ×2, so at the component's own minimum the strip is narrower than its container and the loop shows a void

**Provenance.** `:27` (`entries.length >= 4`), `:35-49` and `:51-66` (exactly two passes), `:91-96` (`width: max-content`).

**The claim.** The duplicate-and-translate-50% idiom is only seamless when **one copy is at least as wide as the visible track**. One copy is `P = k·(220 + G)`. At the guard minimum (`entries.length = 4` ⇒ `k = 2`), `P = 472 px`; the whole inner is `944 px`. The gallery pane is the full content column of `GalleryView` (`GalleryView.vue:220`, `flex flex-col … h-full`), i.e. ≥ ~900 px on any desktop. So at `k = 2` the strip is narrower than its own track from `t = 0`, and as it translates left the trailing edge exposes bare background — the loop reads as a strip that slides away and teleports back, which is precisely what the duplication exists to prevent.

The threshold is exact: a void is visible whenever `trackWidth > k·236 px` (desktop). At `k = 2` that is any viewport above ~500 px. **The guard at `:27` explicitly admits the broken case.** A correct implementation computes the repeat count from the container width (`ceil(port/P) + 1`) or raises the guard to a width-derived minimum.

**Falsifier.** (a) `flex` items stretch to fill — they cannot; `.marquee-item` is `flex-shrink: 0` at a fixed `220px` (`:110-114`) inside `width: max-content` (`:94`), so the row is content-sized, never port-sized; (b) the void is masked — the 3rem edge fade (`:85-88`) attenuates 48 px per side; the void at `k = 2` on a 1000 px track reaches 528 px; (c) the container is narrow — true only below ~500 px viewport, i.e. mobile only. **Claim survives on desktop, which is where the gallery lives.**

*Downgraded from BLOCKER only because it self-heals as `k` grows; it is deterministic at the admitted minimum and should be treated as blocking by F.W4.*

---

### D-7 · [MAJOR] `width: 220px` is the only hard-pixel dimension in the gallery family, under a root font-size that changes at 768 px — the intended proportions invert on mobile

**Provenance.** `:112` (`width: 220px`), `style.css:40-51` (`html { font-size: 1.125rem }` → `1rem` at `min-width: 768px`), `GalleryFeaturedCarousel.vue` `.featured-card-wrapper { width: 16rem }`, `GalleryInfiniteGrid.vue:27` (`minmax(14rem, 1fr)`).

**The claim.** fourier is deliberately mobile-first-fluid: every rem grows 12.5% below 768 px. The three gallery card widths therefore resolve as

| surface | declared | ≥768px | <768px |
|---|---|---|---|
| InfiniteGrid cell | `14rem` | 224 px | 252 px |
| FeaturedCarousel card | `16rem` | 256 px | 288 px |
| **Marquee item** | **`220px`** | **220 px** | **220 px** |

The marquee is the only one that does not participate. Its designed relationship to the grid cell (0.98×, essentially parity) becomes 0.87× on mobile, and to the featured card 0.86× → 0.76×. The card *shrinks relative to everything around it* exactly where space is scarcest.

**Typographic consequence, source-derivable.** `GalleryCard`'s header row (`GalleryCard.vue:108-111`) is `px-3` + `gap-1.5` holding a `truncate font-mono` slug beside a `whitespace-nowrap shrink-0` timestamp, both `text-sm`. `text-sm` = `0.875rem`, which grows to **15.75 px** on mobile while the well stays at `220 − 24 − 6 = 190 px`. The fixed-width timestamp ("999d ago", 8 mono glyphs) claims ~9 px more, so the slug's budget falls from ~14 mono characters to ~12 — **the marquee truncates image slugs harder on small screens than on large ones**, inverting the normal responsive contract. `:112` is a one-token fix (`13.75rem`), which also makes the whole family commensurable on one modular scale.

**Falsifier.** (a) the root scale is fixed — `style.css:41-51` says otherwise, and the block is annotated as a deliberate A.W2.c carry from `ios-fixes.css`; (b) some other rule overrides the width — `grep -n "marquee-item" web/src` → declared once, `:110`; the scoped-style data attribute makes external override impossible. **Claim survives.**

---

### D-8 · [MAJOR] The 3rem edge fade is 6× its sibling's and consumes 29% of a 375px viewport — and guarantees sub-AA text contrast inside the ramp at all times

**Provenance.** `:85-88` (`transparent → black 3rem … black calc(100% − 3rem) → transparent`), vs `GalleryFeaturedCarousel.vue` (`mask-image: linear-gradient(to right, transparent, black 0.5rem, black calc(100% − 0.5rem), transparent)`).

**The claim, part 1 — proportion.** `3rem` resolves to 48 px desktop / **54 px mobile**, per side. On a 375 px viewport that is **108 px = 28.8%** of the width consumed by ramp, leaving a 267 px fully-opaque window — only 47 px wider than one 220 px card. On mobile essentially every card is partially transparent at every instant. The sibling carousel, doing the same job on the same page, uses `0.5rem`. Two edge-fade widths differing by 6× on adjacent surfaces is not a variation, it is an absence of a rule.

**The claim, part 2 — contrast, and it needs no token lookup.** A `mask` multiplies the element's composited alpha, so text inside the ramp is blended toward the page background by factor `α ∈ (0, 1)`. Contrast ratio is monotonically decreasing in that blend and tends to **1:1** as `α → 0`. Whatever `--muted-foreground`'s at-rest ratio against `--background` is, there necessarily exists a sub-band of each 48–54 px ramp where the ratio is below 4.5:1 (SC 1.4.3, normal text) and a further sub-band below 3:1 (SC 1.4.11, the icon/border floor). Because the content is *continuously moving through the ramp*, every glyph and every icon spends part of every cycle below AA. This is decidable from the mask geometry alone — no token value required, which makes it stronger than a token-dependent contrast claim, not weaker.

**Falsifier.** (a) the mask excludes text — it applies to the whole `.marquee-track` subtree (`:80-89`); (b) the ramp is narrower than a glyph — 48 px holds ~6 mono characters at `text-sm`; (c) contrast is evaluated only at rest and the content is never at rest inside the ramp — under `prefers-reduced-motion: reduce` the animation stops (`:129-133`) and whatever card is parked in the ramp stays sub-AA *permanently*, which is worse. **Claim survives, and the reduced-motion path makes it strictly worse.**

**Producer cross-reference.** glass-ui's `FadingScroll.vue:4-8` names this exact failure by name — *"the 'Shy' defect, where the static `.scroll-fade-*` mask half-erased the first card's chrome at rest"* — and ships a structural cure: the ramp width is scroll-state-driven, so the at-rest no-overflow edge is **sharp**. `./fading-scroll` is exported at **the installed 4.0.0** (verified in the 4.0.0 export map) and at 7.0.0. See **L-1** for the honest scope of that cross-reference.

---

### D-9 · [MAJOR] A destructive, irreversible control on auto-moving content

**Provenance.** `GalleryMarquee.vue:42` and `:59` (`:admin-mode="adminMode"` forwarded to both the real and the duplicate card), `GalleryView.vue:272` (`:admin-mode="gallery.adminMode"`), `GalleryCard.vue:156-184` (the overlay; `Trash2` / `emit('delete', …)` at `:178-183`), `GalleryCard.vue:257-258` (`.admin-overlay-btn { @apply h-7 w-7 rounded-full … }` = 28 px).

**The claim.** In admin mode the marquee renders, on every card and on every duplicate, three 28 px circular icon buttons — one of which deletes the visualization — on content translating at 10–260 px/s (**D-5**), pausable only by a mouse (**D-4**), and half of which is `aria-hidden` (**D-3**). Fitts's law on a moving target is a design error independent of any WCAG rule; 28 px clears SC 2.5.8 (24×24, AA) *at rest*, but the effective acquisition target of a control moving at 260 px/s is not 28 px. On touch, where hover-pause does not exist, the user must hit a moving 28 px circle whose neighbour deletes.

The correct design decision is that a decorative auto-scrolling preview band does not host destructive administration. The component already knows how to drop a capability it does not want — it silently drops `toggle-select` (**D-10**) — so this is a deliberate-looking forward of exactly the wrong one.

**Falsifier.** The marquee suppresses `adminMode` — it does not; it is in the props (`:8`) and bound on both cards (`:42`, `:59`), and the sole consumer passes the live store value (`GalleryView.vue:272`). **Claim survives.**

---

### D-10 · [MAJOR] The admin multi-select checkbox renders inside the marquee as a dead control that also blocks the primary action

**Provenance.** `GalleryCard.vue:84-96` (the checkbox, `v-if="adminMode"`, wrapper carries `@click.stop` at `:88`), `GalleryCard.vue:31` (`"toggle-select"` emit), `GalleryCard.vue:94` (`@update:model-value` → `emit('toggle-select', …)`), `GalleryCard.vue:221-224` (`.gallery-card[data-selected]` ring) — against `GalleryMarquee.vue:12-17` (emits list: **no `toggle-select`**) and `:40-48` / `:57-65` (listener list: **no `@toggle-select`**, and no `:selected` binding).

**The claim.** In admin mode `GalleryCard` unconditionally renders the selection checkbox. The marquee never binds `:selected`, so the prop is `undefined`, so `:data-selected="selected || undefined"` (`GalleryCard.vue:79`) never lands and the `[data-selected]` ring can never apply. And the marquee declares no `toggle-select` emit and attaches no listener, so the checkbox's emission terminates at the card boundary — Vue's fallthrough carries *attributes*, not *custom emits*, and `GalleryView` binds `@toggle-select` only on `GalleryInfiniteGrid`. The result is a control that renders, accepts a click, changes nothing — **and, because its wrapper carries `@click.stop`, silently swallows the card-open in a ~28 px region of the top-left corner.** A dead affordance that is also a dead zone over the primary action.

**Falsifier.** (a) attribute fallthrough delivers the emit — custom emits declared in `defineEmits` on the child are not attributes and do not fall through to an unlisted parent handler; the marquee's `<GalleryCard>` tags carry no `@toggle-select` at all, so there is nothing to fall through *to*; (b) `GalleryView` handles it globally — `grep -n "toggle-select" GalleryView.vue` binds it on the grid only; (c) the checkbox is hidden in the marquee — `GalleryCard.vue:86`'s guard is `adminMode` alone, with no context discriminator. **All three branches fail. Claim survives.**

---

### D-11 · [MAJOR] No accessible name, no region, no heading — the surface is anonymous, and it is the only gallery band that is

**Provenance.** `:27-69` — the root is a bare `<div class="marquee-container">`; `grep -n "role=\|aria-label\|aria-labelledby\|<h[1-6]" GalleryMarquee.vue` → **no match**. Contrast `GalleryFeaturedCarousel.vue` (`.featured-header` with a `Crown` glyph + a `cm-serif text-sm font-semibold` "Featured" label) and `GalleryInfiniteGrid.vue:23` (`<p class="text-xs text-muted-foreground">{{ entries.length }} loaded</p>`).

**The claim.** Both siblings name themselves; the marquee names nothing. To a screen-reader user it is an unannounced run of `role="button"` elements with no container semantics, no count, and no explanation of why the same slugs appear twice (the second run is `aria-hidden`, which is the right intent — **S-4** — but wrongly implemented, **D-3**). Visually it is equally unlabelled: it is the only gallery band with no header, so a user cannot tell whether they are looking at "Featured", "Recent", or a sample.

**Corpus extension (explicit).** lane-frontend `:440` books this component solely against `./scrolling-text`. The tree supports a second, *stronger* row the corpus does not carry: glass-ui's `FadingScroll` takes `ariaLabel` / `ariaLabelledby` props and, when either is set, **"expose[s] the scroll port as a region"** (`glass-ui/src/components/fading-scroll/FadingScroll.vue:32-36`, and `namedRegion` at `:39`). The producer makes naming a first-class prop on precisely this genre of surface; the local hand-roll has no seat for it.

**Falsifier.** (a) an ancestor supplies the name — the parent wrapper is `GalleryView.vue:265-268`, an unlabelled flex `<div>` whose only text is "No visualizations yet."; (b) the cards are self-naming so a container name is redundant — each card has `aria-label="Open <image_slug>"` (`GalleryCard.vue:74`), which names the *item*, never the *set*. **Claim survives.**

---

## MINOR

### D-12 · [MINOR] `will-change: transform` is unconditional and permanent, and survives `prefers-reduced-motion: reduce`

**Provenance.** `:95` (inside `.marquee-inner`, no media query), `:129-133` (the reduced-motion block unsets `animation` **only**).

**The claim.** `will-change` is documented by MDN as a last-resort hint not to be declared statically; here it is declared statically on two elements each roughly `2 × k × 236 px` wide, promoting both to permanent composited layers for the document's lifetime. Under `prefers-reduced-motion: reduce` the animation is removed but the promotion is not, so a user who asked for *less* work pays for two GPU layers that will never move. Adding `will-change: auto` to the reduce block, or scoping the hint to `:hover`, closes it.

**Falsifier.** The reduce block resets it — `:129-133` contains exactly `animation: none`. **Claim survives.**

### D-13 · [MINOR] The mask shorthand's stated rationale is false, and its geometry is load-bearing only by accident

**Provenance.** `:84` (the comment: *"Horizontal-only fade: tall vertical extent keeps top/bottom unclipped"*), `:85-88` (`… 0 -50% / 100% 200%`, duplicated for `-webkit-mask`).

**The claim, two parts.** (a) `linear-gradient(to right, …)` is invariant along Y. No vertical mask-size or mask-position can affect what it clips vertically. The `200%` height and `-50%` offset are **inert with respect to the stated purpose**, and the comment therefore documents a mechanism that does not exist. (b) Worse, they are not inert with respect to *correctness*. `mask-position: 0 -50%` with `mask-size: 100% 200%` resolves the vertical offset as `(H − 2H) × (−0.5) = +0.5H`, so the single tile occupies `y ∈ [0.5H, 2.5H]` — **the top half of each track is covered only by the repeat tile**, which exists solely because the `mask` shorthand resets `mask-repeat` to `repeat`. Introduce `mask-repeat: no-repeat` anywhere in the cascade (a plausible future tidy-up, or a shorthand rewrite) and the top half of both tracks silently disappears. The whole clause should be deleted: `mask: linear-gradient(to right, …)` alone does exactly what is wanted.

**Falsifier.** The offset resolves differently — CSS resolves `<percentage>` mask-position against `(positioning area − image size)`; substituting `H` and `2H` gives `+0.5H`, as above. **Claim survives.**

### D-14 · [MINOR] One state, no empty/loading/error surface, and the `>= 4` invariant is duplicated across the component seam

**Provenance.** `:27` (`v-if="entries.length >= 4"` — the component's entire state machine), `GalleryView.vue:270` (`v-if="featuredEntries.length >= 4"` — the same literal, again).

**The claim.** For `0 ≤ |entries| ≤ 3` the component renders nothing, silently: no skeleton, no message, no reduced layout. There is no `loading` or `error` prop at all (`:6-10`), so a slow or failed fetch renders identically to a healthy 3-entry set. Delegating the empty case upward is defensible for a decorative band — but the threshold is then a *shared* invariant, and it is written twice as a bare `4` with no constant, no comment linking the two, and nothing to keep them aligned. `GalleryView.vue:262-264` even documents the delegation while re-implementing the test.

**Falsifier.** A shared constant exists — `grep -rn "MIN_MARQUEE\|>= 4" web/src/components/visualization/` → two independent literals. **Claim survives.**

### D-15 · [MINOR] Phantom hit targets: the mask hides paint, not pointer events

**Provenance.** `:85-88` (`mask`, not `clip-path`), `:98-100` (`:hover` on the whole track), `GalleryCard.vue:70-81` (`role="button"` + `@click`).

**The claim.** CSS `mask` affects compositing only; hit-testing is unaffected (unlike `clip-path`, which *does* clip hit-testing). A card sitting at `α = 0.05` inside the leading ramp is visually absent and fully clickable. On mobile, where the ramps consume 28.8% of the viewport (**D-8**), a tap on what reads as empty background opens a modal for a visualization the user could not see they were touching. It also means `:hover` fires — and pauses the track — from a region the user perceives as outside the component.

**Falsifier.** `mask` clips hit-testing — it does not; only `clip-path` and `overflow` do, and `overflow: clip` here (`:81`) bounds the *track*, not the ramp. **Claim survives.**

### D-16 · [MINOR] Prose quality: three of the file's four comments misstate their own mechanism

**Provenance.** `:50` (*"Duplicate for seamless loop"* — falsified by **D-2**); `:82` (*"Generous vertical padding so hover scale/translate stays inside the mask"* — the padding keeps the transform inside the **clip** (`:81`); the mask is a paint operation and has no inside); `:84` (*"tall vertical extent keeps top/bottom unclipped"* — false mechanism, **D-13**); `:126-128` (the reduced-motion block — **exact**, see **S-1**). And `GalleryView.vue:262-264` describes the marquee's self-hiding guard as an edge case when it is the only case (**D-1**).

**The claim.** In a tree whose annotation discipline is otherwise a genuine asset (every block here names its wave), a 3-of-4 inaccuracy rate is a maintenance hazard: the next reader trusts `:50` and does not check the arithmetic, which is presumably how **D-2** survived four commits.

*Sub-finding, verified sound and recorded so it is not re-flagged:* `:82`'s **arithmetic** is correct even though its vocabulary is not. Needed headroom above the card on hover = `4 px` (`translateY(-4px)`) + `≈2.6 px` (half of `scale(1.02)` on a ~259 px card) = **≈6.6 px**; available = `0.25rem` item + `0.75rem` track = **16 px** desktop / **18 px** mobile. Below, `--shadow-cartoon-hover` is `4px 4px 0 0` with no blur or spread (`glass-ui/dist/styles/tokens/shadow.css:10`), so the lowest painted extent is `≈2.6 px` below the layout box against the same 16 px. **The clip geometry holds with ~2.4× margin.** No defect.

### D-17 · [MINOR] Hosting the card in perpetually-moving clipped content violates the `deferred-section` contract it inherits, and mis-calibrates its own size hint

**Provenance.** `GalleryCard.vue:78` (`class="gallery-card deferred-section …"`), `GalleryCard.vue:196-206` (the J.W4 annotation and `--deferred-section-size: 17rem`, explicitly calibrated *"at a ~15rem cell"*), `glass-ui/dist/styles/utilities/base.css:477-480` (`.deferred-section { content-visibility: auto; contain-intrinsic-size: auto var(--deferred-section-size, 30rem) }`) and `:473-476` (the producer's usage note), against `GalleryMarquee.vue:81` (`overflow: clip`), `:110-114` (`width: 220px`), `:102-108` (`infinite`).

**The claim, two parts.** (a) **Calibration.** The card's intrinsic-size hint is annotated for a "~15rem cell"; the marquee's cell is `220px` = **13.75rem** desktop and **12.2rem** mobile (**D-7**), so the estimate over-reserves against a card that is materially narrower — and, being `contain-intrinsic-size: auto`, only until first paint, after which the remembered size takes over. (b) **Contract.** `content-visibility: auto` is a *relevance* mechanism designed for content that crosses the viewport boundary rarely — the J.W4 annotation says so, naming "the gallery grid item" and "the CWV/scroll win". Inside an `infinite`-animating strip under `overflow: clip`, every card crosses the relevance boundary **every cycle, forever**, converting a one-time saving into permanent style/layout churn. The producer's own utility docs anticipate exactly this and prescribe the pairing: *"the engine fires `contentvisibilityautostatechange` { skipped } at the render-skip boundary — pair with `useRAFLoop` pause/resume"* (`base.css:473-476`). The marquee subscribes to nothing.

**Falsifier.** (a) the marquee's cards never leave the relevance boundary — they translate up to `0.5·W` (up to ~11 800 px at `k = 50`, **D-5**) inside a clipped track; (b) `.deferred-section` is inert here — it is applied unconditionally on the card root and the utility is present in the installed 4.0.0 dist; (c) the size hint is fine because `auto` remembers — true after first paint, which is the point: the *declared* estimate is calibrated for a cell this component does not use. **Claim survives on the contract; the calibration half is minor.** The visible consequence — first-cycle row-height jitter as skipped cards report the hint rather than their real height into a `align-items: stretch` flex row — is **UNPROVEN-NEEDS-LIVE (SS-13)**; the mechanism is source-derivable, the magnitude is not.

### D-18 · [INFO] Zero automated coverage of any kind — the mechanical reason D-1..D-17 are unmeasured

**Provenance.** `grep -rni "marquee" web/e2e/` → **no match** across all 8 specs; vitest is ABSENT repo-wide (lane-frontend §9 item 11; census §5 risk 10).

**The claim.** The component has no unit test (no runner exists), no e2e reference (`gallery.spec.ts` never mentions it), and no visual baseline (`visual-baseline.spec.ts` does not reach a state where it renders — it cannot, per **D-1**). Its only gate is `vue-tsc`, which type-checks `tracks` and the emit signatures and is blind to every geometric and accessibility claim above. The `@axe-core/playwright` dependency the repo already carries would catch **D-3** the moment any spec reached the surface.

**Falsifier.** A spec reaches it — the grep is exhaustive over `web/e2e/`, and **D-1** independently proves no spec *could* reach it. **Claim survives.**

---

## Ledger — rows that are NOT defects (recorded so F.W1/F.W4 do not re-litigate them)

### L-1 · Glass conformance under the old pin: **zero first-order break-surface rows**; exposure is entirely second-order via `GalleryCard`

`grep -n "@mkbabb/glass-ui\|lucide" GalleryMarquee.vue` → **no match**. The component imports `vue`, a local type, and one local SFC (`:1-4`). Measured against the census's five named break rows (`CENSUS §3a` "the uplift break surface"; lane-frontend §5):

| census break row | GalleryMarquee | via `GalleryCard` |
|---|---|---|
| `./metric-badge` removed (7 files) | **absent** | absent |
| `./hover-card` removed (×2) | **absent** | absent |
| `./hover-popover` removed (×2) | **absent** | absent |
| dock members `DockIconButton`/`DockDropdownTrigger` (×3) | **absent** | absent |
| `ToastVariant` definition-absent (hard typecheck break) | **absent** | absent |
| `lucide-vue-next → @lucide/vue` (35 sites) | absent | **present** — `GalleryCard.vue:14-20`, 5 symbols |

`GalleryCard`'s three producer surfaces all survive the uplift: `Button` (`./button`, present at 7.0.0), `Badge` (`./badge`, present), and `Checkbox` off the **root barrel** (`@mkbabb/glass-ui`, `.` still exported; `glass-ui/src/index.ts:124` re-exports `Checkbox`). The `--shadow-cartoon*` tokens the card leans on remain in `dist/styles/tokens/shadow.css`.

**So F.W1 neither breaks nor improves this component directly.** What F.W1 *does* change is its status: `./scrolling-text` exists at the installed 4.0.0 and is gone at 7.0.0 (`CHANGELOG.md:229`), so the shadow the corpus books at lane-frontend `:440` is resolved by attrition rather than by migration — the file becomes legitimately local. **This is where I extend the corpus rather than contradict it:** the retirement rationale is *"retired; render accessible text"*, i.e. the producer deleted the mechanism as an accessibility liability. Inheriting the mechanism inherits the liability, and **D-3**/**D-4**/**D-8** are that liability, itemised. lane-frontend's disposition — *"uplift makes this permanently local; keep + book"* — should be read as *keep the file, fix the mechanism*, not *keep as-is*.

One further genuine candidate the corpus does not carry, stated with its limits: `./fading-scroll` is present at **both** 4.0.0 and 7.0.0 and is "the library's single scroll-state-driven edge-fade primitive" with region-naming props (`FadingScroll.vue:1-8, 32-39`). It is **not** a drop-in for a marquee — it is a *scroll-port* wrapper and the marquee has no scroll port — so I explicitly do **not** claim a shadow. It is the drop-in for the sibling `GalleryFeaturedCarousel`, which *is* an `overflow-x: auto` port carrying a static mask, i.e. exactly the "Shy" defect the producer names. That is a sibling row for F.W3/F.W4; it is cited here only because the family should end up with **one** fade mechanism, and the producer already ships it at the installed version.

### L-2 · glass-ui's 5.0.0 `/scrolling-text` retire-relocation probe omits fourier-analysis from its roster — verdict unchanged, roster incomplete (BH relay)

`glass-ui/MIGRATION.md:753-758` records the consumer-truth probe behind the retirement: *"reads its ONLY binary consumers as speedtest, 2 sites … **0** across muster · sci-report · atlas · slides · value.js · keyframes.js · words · bbnf-buddy."* Eight repos are named; **fourier-analysis is not among them**, and fourier carries a hand-rolled instance of exactly the retired mechanism.

**The verdict is unchanged and I do not claim otherwise:** the probe counted *binary consumers* (imports), fourier's import count for `./scrolling-text` is **0** (lane-frontend `:440`, re-verified: `grep -rn "scrolling-text\|ScrollingText" web/src` → no match), and the re-entry trigger is "a real ≥2-repo cross-repo binary consume". Adding fourier to the roster would not have changed the outcome. What is incomplete is the *roster*, and the standing law (feedback-glassui-bhbi-relay: every component/glass-ui-level change relayed to the active glass-ui BH inbox) makes roster completeness a real obligation. One line for the relay: fourier-analysis should be enumerated in the constellation probe list, with its `0` recorded explicitly.

---

## Superlatives (L-18 runs both ways)

### S-1 · The reduced-motion guard is the best-documented block in the file, and it is correct

`:126-133`. It names the wave (`D.W4.c`), the success criterion (`WCAG 2.3.3`), the originating audit row (`A3 #9`), and the *reason* (*"the auto-scrolling marquee is non-essential motion"*). It is scoped to `.marquee-inner` — the element that actually carries `animation` — rather than a blunt universal reset, so it disables exactly the motion in question and nothing else. lane-frontend `:622` singles this block out as the one site in the whole 18-reference reduced-motion inventory that names its provenance. **Falsifier:** the guard is absent, mis-scoped, or targets a non-animated selector — it is present, and `.marquee-inner` is the sole `animation` host (`:102-108`). Survives.

### S-2 · `overflow: clip` rather than `overflow: hidden` — the correct and non-obvious primitive

`:81`. `overflow: hidden` creates a scroll container, so a programmatic or keyboard focus landing on an off-screen card scrolls the "hidden" box and permanently desynchronises the transform from the layout — the classic marquee-eats-your-layout bug. `overflow: clip` does not create a scroll container and cannot be scrolled at all. Choosing `clip` here is a deliberate, modern, correct call that most hand-rolled marquees get wrong. **Falsifier:** the track needs to be scrollable, or `hidden` would behave identically — it does not; the scroll-container distinction is normative. Survives. (That the component then fails to add the focus-pause that would make this matter — **D-4** — does not diminish the choice.)

### S-3 · The dual-track parallax is genuinely elegant: opposite directions, near-coprime durations, one shared source

`:19-23` splits the entries even/odd into two tracks; `:32` alternates the direction class; `:102-108` gives them `45s` and `50s`. The ratio is 9:10, so the two bands do not return to their initial phase relationship for **`lcm(45, 50) = 450 s` = 7.5 minutes** — long past any session's dwell on an empty state. The eye therefore never resolves the pair into a repeating grid, which is precisely the failure mode of the naive two-identical-rows marquee. Achieved with three declarations and no JS. **Falsifier:** equal durations, same direction, or duplicated data across tracks — all three are false (`:21`'s `i % 2` partitions rather than duplicates). Survives.

### S-4 · The `aria-hidden` diagnosis is right, even though the instrument is wrong

`:55`. The author correctly identified that the duplicated half of the strip is decorative and must not be announced twice — a distinction most hand-rolled marquees never draw at all, announcing 2N cards to every screen-reader user. The reasoning is sound; only the mechanism is wrong (`inert`, not `aria-hidden`, per **D-3**). Recorded as a superlative because the *design thinking* is what is scarce; the fix is one attribute. **Falsifier:** the duplicate should be announced — it is a byte-identical repeat of content already in the tree. Survives.

### S-5 · Zero producer coupling gives it the smallest F.W1 blast radius of any gallery surface

Four imports (`:1-4`), none from `@mkbabb/glass-ui` or `lucide-vue-next`. Against a tri-package uplift whose break surface the census sizes as "an order of magnitude above" the 46-line 3.1→4.0 hop, this file's first-order exposure is **zero rows of five** (**L-1**). In the middle of a P0 resolution deadlock, a 134-line component with no producer surface is a real asset — it can be redesigned at any point in the wave order without waiting on glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0. **Falsifier:** a transitive producer dependency that breaks — `GalleryCard`'s three surfaces (`Button`, `Badge`, root-barrel `Checkbox`) all survive at 7.0.0, verified against the producer's export map and `src/index.ts:124`. Survives.

---

## Recommended disposition (for F.W4; not a work order)

1. **Rule D-1 first.** Either give the marquee a reachable home (a "Featured" band above the grid, where `featuredEntries` is non-empty by definition — which is what its content argues for) or delete it and keep the CTA-only empty state. Every other row is conditional on this ruling. If deleted, **D-2..D-17 close with it** and the `./scrolling-text` book (lane-frontend `:440`) closes as *retired both sides*.
2. **If kept, fix the arithmetic before the ornament**: D-2 (half-gap seam), D-6 (duplication factor), D-7 (`13.75rem`), D-5 (velocity binding). These are four one-line changes and they are the whole difference between a design that holds and one that does not.
3. **Then the a11y floor**: D-3 (`inert`), D-4 (`:focus-within`), D-11 (`aria-label` on the container), D-9/D-10 (drop `adminMode` from a decorative band entirely — it also closes D-10 for free).
4. **Reconcile the family onto one scale** (D-7, D-8): one card width, one gutter, one edge-fade mechanism — and route `GalleryFeaturedCarousel` onto `./fading-scroll`, which is available at the *installed* pin and needs no uplift (**L-1**).
5. **Relay L-2** to the glass-ui BH inbox per standing law.

---

*Read-only throughout. `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui` were treated as evidence and not written. The only file this challenge wrote is itself. No browser tooling was used; the two live-only claims (the exact perceived seam hitch of D-2, and any measured contrast value inside D-8's ramp) are marked **UNPROVEN-NEEDS-LIVE (SS-13)** — both are derived here from geometry and cascade rules alone, and neither is load-bearing for its row's verdict.*
